---
name: review-codex
description: "Aciona o revisor Devin somente leitura depois de um checkpoint do Codex do David e devolve achados priorizados, verificacoes e handoff para correcao."
argument-hint: "[base..head | commit | arquivos]"
permissions:
  deny:
    - write
    - edit
triggers:
  - user
  - model
---

Coordene uma revisao independente do checkpoint produzido pelo Codex do David. O Codex implementa; esta skill apenas encaminha o alvo e devolve o parecer do revisor. A primeira ferramenta apos ativar esta skill deve ser `run_subagent`: nao execute Git nem colete arquivos no agente pai; delegue essas consultas ao revisor.

1. Extraia da mensagem que acionou a skill o commit, intervalo, arquivos ou handoff informado. Preserve o alvo literalmente ao montar a tarefa, sem depender de interpolacao de placeholders.
2. Use `run_subagent` com `profile: codex-reviewer` e `is_background: false`. Inclua na tarefa o diretorio absoluto do repositorio, o alvo, o objetivo, os criterios de aceite e as evidencias disponiveis do Codex. Nao invoque esta skill novamente dentro do subagente.
3. Sem alvo explicito, instrua o subagente a inspecionar staged, unstaged e arquivos novos do working tree. Se estiver limpo, use o diff da branch contra o merge-base de `origin/main`. Nao peca confirmacao antes dessa inspecao; sem diff ou referencia verificavel, retorne `BLOCKED`.
4. Instrua o revisor a ler as fontes de verdade aplicaveis, verificar os stop gates, executar apenas checks nao destrutivos documentados e nao editar, instalar, commitar ou publicar nada.
5. Devolva os achados priorizados, o verdict, as verificacoes realmente executadas, os riscos residuais e o handoff para o Codex. Nao transforme falha de ferramenta ou revisao incompleta em aprovacao. Se o perfil nao estiver disponivel, informe `BLOCKED` e solicite uma nova sessao Devin aberta na raiz do repositorio.

## Uso e contrato

- `/review-codex`: revisa o working tree ou a branch atual.
- `/review-codex origin/main..HEAD`: passa o intervalo explicitamente ao revisor.
- `/review-codex .devin`: revisa os arquivos de configuracao e seus pontos de uso.
- O Codex entrega objetivo, alvo, criterios, checks e limites; o Devin devolve achados; o Codex corrige; o humano decide a integracao. Novas revisoes devem identificar o SHA ou estado revisado, sem editar o checkout em uso pelo Codex.

## Verificacao desta configuracao

- Descoberta: `devin skills list` e `devin skills show review-codex`, na raiz do projeto.
- Smoke test: `devin --permission-mode auto -p "/review-codex .devin"` em uma sessao autenticada. Deve delegar ao perfil `codex-reviewer`, manter o alvo `.devin` e produzir parecer, verificacoes e handoff sem alterar arquivos.
- Um smoke test comprova o acionamento observado; nao prova isolamento de shell, qualidade de todas as revisoes futuras nem cria um bot automatico de PR no GitHub.
