# SALA

STATUS: READY / FREEZE — refinamento visual e fluxo local conferidos; integração pública com autenticação é do coordenador

## Entrega atual

- Preparação com palco 3D e formulário separados, títulos curtos, sequência em duas etapas e estado vazio com caminho para audiência.
- O palco recebe os perfis selecionados. Nomes e papéis no seletor quebram linha; perfis sintéticos têm identificação explícita.
- Painel de ensaio com progresso da rodada. Pergunta e fontes usam uma região rolável; compositor e ações ficam separados dela, sem sobreposição.
- Rationale fechado por padrão; fontes e resposta original acessíveis por details. Tipografia adaptativa mantém pergunta longa legível.
- Feedback com força, lacuna e sugestão retornadas pela API; última pergunta leva a Concluir a rodada.
- Atalho mobile Ir para a pergunta, foco de teclado na troca de etapa, controles maiores e campo de resposta com fonte de 16 px no celular.
- Guard síncrono impede chamadas simultâneas e bloqueia Novo ensaio/avanço/rebobinar durante operação.
- Novo ensaio preserva pitch e seleção em estado React. Falha de envio mantém a resposta.
- Não persistir draft em chave global de sessionStorage: a integração de autenticação exige escopo por usuário. Draft anterior ao envio pode se perder em reload/navegação; somente ensaio salvo é restaurado pela API.

## Arquivos próprios alterados

- src/pages/RehearsalPage.tsx
- src/components/rehearsal/RehearsalSetup.tsx
- src/components/rehearsal/RehearsalRoom.tsx
- src/components/rehearsal/rehearsal-reset.css

SpatialStage, engine, App, backend e contratos não foram alterados nesta rodada.

## Evidências

Pasta de QA desta rodada:
C:/Users/lucas/AppData/Local/Temp/rebobina-sala-qa-0827fe76a7554accba7372a0d2da05f7/

- setup-empty-desktop.png: primeira visita real, sem perfis cadastrados, canvas 3D presente.
- setup-selected-desktop.png e setup-mobile.png: fixtures sintéticas isoladas para layout de seleção.
- room-desktop.png, room-expanded-desktop.png e room-mobile.png: stress visual com pergunta/rationale longos e fontes.
- feedback-desktop.png: layout de feedback e resposta original.
- report.json: QA de interface com fixtures; não prova geração real.
- live-local-feedback.png, live-local-room.png, live-local-mobile.png e live-local-report.json: fluxo real local com entradas sintéticas explicitamente identificadas.

## Verificações

- Desktop 1280×720 e mobile 390×844: sem overflow horizontal; zero erros de console e runtime nos percursos testados.
- Desktop: botão de envio y=618–664, viewport 720. Geometria não muda ao abrir rationale longo e fontes. Região de leitura termina em y=457 e footer começa em y=457; textarea termina antes do CTA.
- Dois Ctrl+Enter consecutivos: um único POST na prova de UI; Novo ensaio desabilitado durante pending.
- Novo ensaio preservou pitch; passar à próxima pergunta limpou a resposta anterior; resposta original disponível no feedback.
- 16 testes de projeto passaram.
- Build TypeScript/Vite passou após o refinamento: 1.881 módulos. Aviso residual do chunk Three ~693 KB.
- Build repetido após remoção do draft global: passou, 1.881 módulos, bundle index-DkzjjL5y.js.
- Uma reexecução posterior das fixtures, concorrente às alterações de draft, terminou em timeout buscando Próxima pergunta. Não conta como PASS; a suíte completa de UI anterior e o fluxo real concluído acima são as evidências de aceite. Reexecutar no snapshot estabilizado se a integração exigir.
- Fluxo real em http://localhost:4173: fonte sintética salva → perfil real via API → geração IA → resposta e feedback via API → citações conferidas contra fonte → rewind com original preservado → reload da nova tentativa. Zero erros.
- Nenhuma chamada adicional de IA será feita após freeze.

## Limites e integração

- A prova real acima ocorreu antes da nova integração de login/avatar. Revalidar isolamento/autenticação e URL pública no snapshot do coordenador.
- Não alegar publicação desta rodada com base no localhost.
- Estado de draft somente em memória por orientação explícita do coordenador; persistência futura deve ser por usuário autenticado.
- Sem nova ideação ou rodada cosmética. Próximo dono: coordenador, para integrar e publicar; SALA só atende regressão de integração.
