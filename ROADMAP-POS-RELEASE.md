# Roadmap Pós-Release

Registro de melhorias **que não são correções**. Nada aqui é implementado antes da
RELEASE FINAL. Arquitetura congelada em 16/07/2026 (v1.1).

Regra: durante a construção dos 31 módulos, só entram no código correções de bug e
inconsistências apontadas pelo validador. Toda ideia nova vem parar aqui.

---

## R-01 · Interface de exportar/importar progresso
**Origem:** requisito 6 da Fase 0.1 — arquitetura entregue, UI adiada por decisão sua.
**Estado:** `Platform.exportData()` e `Platform.importData()` prontos e testados.
Envelope v2 versionado, com migração automática de schema.
**Falta:** botão em `painel.html`, download de `.json`, input de upload, confirmação de merge vs substituição.
**Esforço:** ~2h. **Risco:** baixo.

## R-02 · Índice de busca em texto integral
**Estado hoje:** `searchindex.js` cobre seções, subtítulos, figuras, tabelas, checklists e callouts (206 itens em 3 módulos).
**Ideia:** indexar o corpo dos parágrafos, com stemming em português.
**Contra:** o índice cresceria de ~25 KB para vários MB em 31 módulos, carregado em toda página. Precisaria de indexação invertida ou de servir por HTTP com fetch sob demanda — o que quebraria o funcionamento em `file://`.
**Decisão:** avaliar só depois de medir o peso real com 31 módulos.

## R-03 · Modo de impressão / PDF por módulo
`@media print` existe e é funcional. Faltaria: quebras de página controladas, expansão automática de accordions, sumário impresso, numeração.
**Nota:** você pediu explicitamente "nunca gere PDF" nos briefings. Isto é só para impressão local pelo navegador, não geração de PDF por mim.

## R-04 · Anotações livres por seção
Hoje só os exercícios têm campo de texto (`data-ex`). Uma anotação por seção usaria a mesma infra de `notes{}` no envelope.
**Contra:** aumenta o peso do storage e não foi pedido.

## R-05 · Marcadores de leitura (continuar de onde parou)
O histórico já registra o último módulo visitado. Faltaria guardar a posição de scroll e oferecer "retomar".

## R-06 · Painel de gaps do glossário
Um relatório de quais termos aparecem em quantos módulos e quais nunca foram usados — ajudaria a podar verbetes mortos na auditoria final.

## R-07 · Verificação automática de contraste (WCAG)
O validador checa paridade de tokens dark/light, mas **não calcula contraste**. Um teste de razão de contraste automatizado pegaria regressões de acessibilidade que hoje dependem de olho.
**Prioridade sugerida:** alta, entre as daqui.

## R-08 · Teste de renderização headless
O validador é estático (parseia HTML/CSS/JS). Não abre a página. Um smoke test com navegador headless pegaria erros de runtime que só aparecem em execução.
**Contra:** exige navegador no ambiente.

---

## Itens rejeitados — registrados para não voltarem

| Ideia | Por que não |
|---|---|
| Curso 4 (Analytics/CRO/Growth), 12 módulos | ~87% redundante com os Cursos 1 e 3. Dissolvido: M4 virou C3.M6, o SOG virou o capstone, o resto já existia. |
| Módulos auto-contidos (arquivo único) | 73.780 linhas de duplicação em 31 módulos. Substituído pelo Platform Shell. |
| Busca global em runtime, sem índice | `fetch()` não funciona em `file://`. Impossível sem build step. |
