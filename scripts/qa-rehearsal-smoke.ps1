param(
  [string]$BaseUrl = 'http://localhost:4173',
  [switch]$Full
)

$ErrorActionPreference = 'Stop'
$checks = [System.Collections.Generic.List[object]]::new()

function Add-Check([string]$Name, [bool]$Passed, [string]$Detail) {
  $checks.Add([pscustomobject]@{ check = $Name; passed = $Passed; detail = $Detail })
  if (-not $Passed) { throw "${Name}: ${Detail}" }
}

function Invoke-Json {
  param(
    [Microsoft.PowerShell.Commands.WebRequestSession]$Session,
    [string]$Method,
    [string]$Path,
    [object]$Body
  )
  $params = @{
    Uri = "$BaseUrl$Path"
    Method = $Method
    WebSession = $Session
    UseBasicParsing = $true
    TimeoutSec = 90
  }
  if ($null -ne $Body) {
    $params.ContentType = 'application/json'
    $params.Body = ($Body | ConvertTo-Json -Depth 12 -Compress)
  }
  $response = Invoke-WebRequest @params
  $contentType = [string]$response.Headers['Content-Type']
  Add-Check "$Method $Path retorna JSON" ($contentType -match '^application/json') "status=$($response.StatusCode); content-type=$contentType"
  return $response.Content | ConvertFrom-Json -Depth 30
}

try {
  $sessionA = [Microsoft.PowerShell.Commands.WebRequestSession]::new()
  $sessionB = [Microsoft.PowerShell.Commands.WebRequestSession]::new()
  $health = Invoke-Json $sessionA GET '/api/health' $null
  Add-Check 'health operacional' ($health.ok -eq $true) "storage=$($health.storage); aiConfigured=$($health.aiConfigured)"

  $stateA = Invoke-Json $sessionA GET '/api/rehearsal/state' $null
  $stateB = Invoke-Json $sessionB GET '/api/rehearsal/state' $null
  Add-Check 'contrato de workspace de ensaio' ($null -ne $stateA.audiences -and $null -ne $stateA.sessions) 'audiences e sessions presentes'

  $invalidResponse = Invoke-WebRequest -Uri "$BaseUrl/api/rehearsal/generate" -Method POST -WebSession $sessionA -UseBasicParsing -SkipHttpErrorCheck -ContentType 'application/json' -Body '{"pitch":"curto","audienceIds":[]}' -TimeoutSec 30
  $invalidBody = $invalidResponse.Content | ConvertFrom-Json
  Add-Check 'erro de validacao e JSON visivel' ($invalidResponse.StatusCode -eq 400 -and [string]$invalidResponse.Headers['Content-Type'] -match '^application/json' -and -not [string]::IsNullOrWhiteSpace([string]$invalidBody.error)) "status=$($invalidResponse.StatusCode); error presente"

  $cookieA = $sessionA.Cookies.GetCookies($BaseUrl)['rebobina_session']
  $cookieB = $sessionB.Cookies.GetCookies($BaseUrl)['rebobina_session']
  Add-Check 'cookies de sessao isolados' ($cookieA -and $cookieB -and $cookieA.Value -ne $cookieB.Value) 'duas sessoes receberam identificadores distintos'

  $marker = "QA-$(Get-Date -Format 'yyyyMMdd-HHmmssfff')"
  $quote = "O comite exige evidencias verificaveis e limita a apresentacao a cinco minutos."
  $materialResponse = Invoke-Json $sessionA POST '/api/materials' @{ title = "Fonte $marker"; content = "$quote Marcador: $marker" }
  $sourceId = [string]$materialResponse.material.id
  Add-Check 'fonte criada na sessao A' (![string]::IsNullOrWhiteSpace($sourceId)) "sourceId presente"

  $legacyA = Invoke-Json $sessionA GET '/api/state' $null
  $legacyB = Invoke-Json $sessionB GET '/api/state' $null
  $aHasMarker = @($legacyA.materials | Where-Object { $_.content -like "*$marker*" }).Count -eq 1
  $bHasMarker = @($legacyB.materials | Where-Object { $_.content -like "*$marker*" }).Count -gt 0
  Add-Check 'material persiste na sessao A' $aHasMarker 'fonte reapareceu no readback'
  Add-Check 'material nao vaza para sessao B' (-not $bHasMarker) 'marcador ausente na segunda sessao'

  if ($Full) {
    $audienceResponse = Invoke-Json $sessionA POST '/api/rehearsal/audience' @{ name = 'Jurada QA'; role = 'Avaliadora de produto'; sourceIds = @($sourceId) }
    $profile = $audienceResponse.profile
    Add-Check 'lentes geradas' (@($profile.lenses).Count -gt 0) "lenses=$(@($profile.lenses).Count)"
    $badLensRefs = @($profile.lenses.evidence | Where-Object { $_.sourceId -ne $sourceId -or -not ("$quote Marcador: $marker").Contains([string]$_.quote) })
    Add-Check 'citacoes das lentes sao literais' ($badLensRefs.Count -eq 0) "invalidRefs=$($badLensRefs.Count)"

    $pitch = 'O Rebobina permite ensaiar apresentacoes com perguntas fundamentadas em fontes, feedback rastreavel e replay que preserva a resposta original.'
    $generateResponse = Invoke-Json $sessionA POST '/api/rehearsal/generate' @{ pitch = $pitch; audienceIds = @([string]$profile.id) }
    $original = $generateResponse.session
    Add-Check 'perguntas geradas' (@($original.questions).Count -ge 1 -and @($original.questions).Count -le 3) "questions=$(@($original.questions).Count)"
    $question = $original.questions[0]
    $answerResponse = Invoke-Json $sessionA POST '/api/rehearsal/answer' @{ sessionId = [string]$original.id; questionId = [string]$question.id; answer = 'A demonstracao mostra o fluxo completo e a persistencia, mas ainda nao mede eficacia educacional.' }
    Add-Check 'feedback retornado' (![string]::IsNullOrWhiteSpace([string]$answerResponse.turn.feedback.suggestion)) 'sugestao presente'

    $rewindResponse = Invoke-Json $sessionA POST '/api/rehearsal/rewind' @{ sessionId = [string]$original.id; keepTurns = 0 }
    $branch = $rewindResponse.session
    Add-Check 'replay cria ramificacao' ($branch.id -ne $original.id -and $branch.parentSessionId -eq $original.id) 'id novo e parentSessionId preservado'
    Add-Check 'ramificacao volta ao ponto solicitado' (@($branch.turns).Count -eq 0) "turns=$(@($branch.turns).Count)"

    $reloadState = Invoke-Json $sessionA GET '/api/rehearsal/state' $null
    $savedOriginal = $reloadState.sessions | Where-Object id -eq $original.id
    $savedBranch = $reloadState.sessions | Where-Object id -eq $branch.id
    Add-Check 'original preservado apos replay e reload' ($null -ne $savedOriginal -and @($savedOriginal.turns).Count -eq 1) 'sessao original manteve a resposta'
    Add-Check 'ramificacao persistente apos reload' ($null -ne $savedBranch -and $savedBranch.parentSessionId -eq $original.id) 'branch reapareceu no estado'
  }

  if (Test-Path '.\dist\assets') {
    $bundleHits = Get-ChildItem '.\dist\assets' -File | Select-String -Pattern 'OPENAI_API_KEY|DATABASE_URL|postgres(?:ql)?://|sk-[A-Za-z0-9_-]{16,}' -AllMatches
    Add-Check 'bundle sem assinatura obvia de segredo' (@($bundleHits).Count -eq 0) "matches=$(@($bundleHits).Count)"
  }

  $checks | ConvertTo-Json -Depth 5
  exit 0
}
catch {
  $checks.Add([pscustomobject]@{ check = 'fatal'; passed = $false; detail = $_.Exception.Message })
  $checks | ConvertTo-Json -Depth 5
  exit 1
}
