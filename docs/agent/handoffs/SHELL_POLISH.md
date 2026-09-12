# SHELL / POLISH — READY / FREEZE

Data: 2026-09-12.

## Entrega

- `src/App.tsx`: navegação com rótulos visuais curtos e nomes acessíveis completos, ícones consistentes, rodapé mais compacto, quatro responsabilidades da equipe com hierarquia visual, retorno de foco ao fechar o modal da equipe.
- `src/shell-polish.css`: acabamento isolado da navegação, botões, foco visível, estados hover/disabled, modais, campos dos modais, avisos e responsividade. Mantém a paleta existente e não altera a composição das páginas nem o motor 3D.
- Sem alterações em páginas, router, backend, dependências, Git ou deploy por este executor.

## Evidências verificadas

- `npm test`: 16 testes aprovados, zero falhas.
- `npm run build`: aprovado, 1881 módulos; aviso não bloqueante do chunk Three de 693,13 kB, separado do bundle principal.
- CUA, `http://localhost:4173/materiais`, viewport desktop padrão: sidebar, controles e modal da equipe inspecionados visualmente.
- Modal equipe: abertura focaliza Fechar; Tab permanece contido; Escape fecha e devolve foco a Sua equipe. Confirmado também pelo coordenador de engine/deploy em passe independente.
- Modal Adicionar fonte: desktop e 390×844 inspecionados; campos, botão e fechamento dentro da tela. Medição em 390×844: modal 366 px de largura, margem lateral 12 px, altura aproximada 718 px. Shift+Tab manteve o foco no modal; Escape fechou. Nenhum dado foi salvo nesta validação.
- Navegação principal preserva nomes acessíveis em 390 px e 820 px; viewport restaurado depois dos testes.
- Console da aba durante o passe: zero mensagens warn/error retornadas.
- Screenshots apresentados diretamente na conversa deste executor; não foi criada captura em arquivo nesta etapa.

## Limites / repasse

- O modal de Materiais retornava foco ao documento ao fechar; reportado ao ROOT para o dono de MaterialsPage corrigir, sem escrita concorrente neste arquivo.
- Os acessos secundários Equipe/Atendimento continuam ocultos abaixo de 950 px, comportamento anterior preservado; as quatro rotas principais continuam acessíveis. Não foi criado um novo menu móvel nesta entrega.
- A validação não representa uma certificação completa de acessibilidade nem verifica publicação em produção.

## Próximo passo

ROOT integrar o estado atual, QA realizar o passe consolidado e o executor de deploy publicar quando os demais donos congelarem seus arquivos. App e shell-polish estão congelados para commits atômicos pelo executor exclusivo de Git.
