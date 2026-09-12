# ROOT — aviso único de compatibilidade, 13:49 SP

Foram distribuídos dois nomes para o mesmo contrato. Não reconstruir nada. ROOT (fork8) integra ambos.

- `shared/rehearsal.types.ts` reexporta `shared/rehearsal-types.ts`: ambos imports válidos. Perfil aceita os campos adicionais opcionais `isFictional`/`synthetic`, `sourceIds`, `limitations`; lente aceita `limitation` e `confidence`. Backend normaliza e valida, nenhuma UI precisa trocar imports.
- `/api/rehearsals/*` e `/api/rehearsal/*` são aliases das mesmas rotas e mesma persistência. `api()` já acrescenta `/api`; não duplicar prefixo.
- Protocolo de responsabilidades, design e exports é o mesmo nos dois documentos. A1/CORE, A2/SALA, A3/AUDIENCIA, A4/MESA, A5/QA, A6/MARCA, A7/VIDEO são os mesmos papéis, não equipes duplicadas.
- Handoffs podem usar A1.md ou CORE.md (etc.); ROOT consulta ambos. QA aceita escopos dos dois documentos para seus próprios testes/evidências. VIDEO aceita `demo/**` e `artifacts/demo/**`/`docs/demo/**`, sem editar aplicação.
- Só ROOT altera shell, rotas, store, configs e contratos. Não abrir mais integrador. `server/rehearsal/service.ts` mantém os três exports combinados.

Esta compatibilidade é a decisão vigente de integração e vence divergências de nome entre COORDINATION.md e SWARM_PROTOCOL.md. Nenhuma mudança de tese: ensaio de apresentações, não previsão de comportamento.
