# CONTRIBUTING

Este é um projeto de estudo pessoal de propriedade única — não recebe
contribuições externas via pull request. Este documento existe para que
qualquer edição futura (do dono, ou de quem ele autorizar) siga o mesmo
padrão que gerou os 31 módulos já construídos, em vez de divergir dele.

**A fonte canônica de todas as regras é [CLAUDE.md](CLAUDE.md).** Este
arquivo é um resumo de processo; em qualquer conflito, `CLAUDE.md` vence.

## Status atual: verifique antes de editar

A plataforma está em **RELEASE FINAL v1.0.0** (declarado pelo dono em
2026-07-20, "nenhuma ação restante"). Antes de tocar em qualquer coisa, leia
o topo de `CLAUDE.md` para confirmar o status vigente — as regras abaixo
mudam dependendo da fase:

- **Estado atual (pós-RELEASE FINAL)**: nenhum trabalho pendente. O
  **Feature Freeze** (vigente 2026-07-18 → RELEASE FINAL) atingiu sua
  condição de encerramento por definição própria, mas isso não é uma
  liberação automática para novidade — qualquer trabalho futuro (novo
  módulo, componente, mudança de arquitetura) exige autorização explícita
  do dono antes de começar, não presunção de que o freeze "acabou sozinho".
  Correções de erro real (estrutural, referência, acessibilidade, glossário)
  continuam sempre permitidas, com ou sem freeze.
- Qualquer ideia nova, autorizada ou não, vai primeiro para
  [ROADMAP-POS-RELEASE.md](ROADMAP-POS-RELEASE.md) — registrar antes de
  implementar.

## Regras de conteúdo (todo módulo novo ou editado)

1. **Objetivo único**: todo conteúdo serve a criar/executar/otimizar/escalar
   campanhas de Meta Ads para os dois protocolos do dono (melasma, estrias).
   Se um assunto não aumenta conversão, reduz CAC, melhora posicionamento ou
   aumenta faturamento, resuma ou corte.
2. **Estrutura obrigatória por seção**: (1) O que é? (2) Por que importa?
   (3) Como aplico no meu negócio? (4) Como isso melhora minhas campanhas?
   (5) Quais erros evitar? (6) Checklist de execução.
3. **Regra 80/20**: ensine os 20% dos conceitos que geram 80% do resultado
   prático. Não aprofunde além disso no corpo principal — o que for
   aprofundamento genuíno vai num bloco isolado **"Leitura Avançada"**.
4. **Anti-repetição**: se um conceito já foi explicado em outro módulo, não
   reexplique — referencie (`.modref[data-mod="id"]` + menção tipo "ver
   C2.M3 §4"). Consulte `manifest.js` (campo `deps`) e `glossario.js` (campo
   `onde`) antes de reintroduzir um conceito.
5. **Densidade**: ~45–60 min de leitura por módulo (exceções documentadas em
   `CLAUDE.md`, como o C1.M4-âncora, precisam de aprovação explícita do
   dono). Se um assunto crescer além disso: resuma → mova para Leitura
   Avançada → use referência cruzada → transforme lista longa em catálogo
   curado, nessa ordem de preferência.
6. **Gate de aplicação prática**: ao final, o leitor precisa responder sem
   esforço "o que aprendi / como aplico hoje / que resultado espero / que
   erros evitar" — normalmente no resumo executivo e no checklist.
7. **Regra da simplicidade**: entre duas formas corretas de explicar algo,
   use a mais simples — sem sacrificar correção.
8. **Curso 1 (Sistema Comercial) tem uma camada extra**: cenário de negócio
   fixo (Biomédica · Estética Integrativa · Consulta Online · Melasma ·
   Estrias · Instagram · Meta Ads · Landing Page · WhatsApp · Pixel · CAPI ·
   CRM), e um bloco de fechamento obrigatório "Implementação no meu
   negócio" com 6 perguntas específicas — ver `CLAUDE.md` para o texto
   exato.
9. **Módulos-catálogo** (bibliotecas de ganchos/roteiros/erros): curar por
   retorno prático real por categoria, não truncar cegamente para ~20% —
   cada entrada deve ser extremamente enxuta (sem selo-box, sem teoria por
   item).
10. **Tópicos `vol:"high"` no manifest** (mudam rápido — Meta Ads, Pixel/
    CAPI, GA4, SEO, Instagram): pesquisa (`WebSearch`) obrigatória antes de
    escrever, fontes primárias preferidas sobre blogs de terceiros, data da
    pesquisa registrada em `CLAUDE.md`, revisão trimestral recomendada.

## Regras de código

- **Nenhuma dependência nova** — sem CDN, sem biblioteca de terceiros, sem
  build step. Se algo parecer exigir uma, é sinal de que não deveria ser
  feito neste projeto (registre no ROADMAP em vez de adicionar).
- **CSS só via token**: qualquer cor é `var(--token)`. `#hex`/`rgba(...)`
  fixo é proibido fora de `:root{}` e `[data-theme="light"]{}` em
  `platform.css`. Todo novo token de cor precisa de contraparte no bloco
  claro.
- **Um `<style>` por módulo, no máximo**, e só para o que é genuinamente
  exclusivo daquele módulo — nunca redeclare token ou seletor do shell
  (`.card{`, `--gold:`, etc.).
- **JS de módulo é sempre isolado**: IIFE, sem depender de nada além do que
  `platform.js` já expõe, chamado via `onReady` do `Platform.init()`.
- **Siglas do glossário**: toda sigla usada em prosa precisa de pelo menos
  uma ocorrência em `<abbr data-t="Sigla">Sigla</abbr>` no arquivo.
  Ocorrências dentro de `<code>` são isentas (são notação técnica, não
  prosa).
- **Sem `console.log`** de depuração esquecido — `console.warn` só para
  avisos defensivos intencionais (estado inválido detectado em runtime), como
  já existe em `platform.js`.
- **Sem comentário de rascunho/placeholder esquecido** — se algo é
  temporário, não deve chegar a ser commitado.

## Processo para editar ou adicionar um módulo

1. Confira `manifest.js` — o módulo já está planejado ali (`status:"todo"`)
   ou você está propondo algo novo? Algo novo, fora do Feature Freeze, vai
   para o ROADMAP, não direto para o código.
2. Escreva seguindo as regras de conteúdo acima e a anatomia descrita em
   [ARCHITECTURE.md](ARCHITECTURE.md).
3. Atualize `manifest.js` (`status`, `secs`, `min`, `deps` reais) e
   `glossario.js` (campo `onde` de cada termo usado).
4. Rode os validadores (ver [INSTALL.md](INSTALL.md)):
   ```bash
   python3 build_index.py
   python3 validate.py      # precisa terminar em "✅ APROVADO"
   ```
   Se Python real não estiver disponível no seu ambiente, replique
   manualmente as checagens que der (ver o histórico de sessões em
   `CLAUDE.md` para os scripts Node usados como substituto) e **registre
   explicitamente a pendência** — nunca presuma que passaria no validador
   real sem checar.
5. Teste ao vivo no navegador qualquer coisa interativa (não confie só na
   estrutura HTML) — abra o módulo, interaja, confira o console sem erros.
6. Documente a decisão em `CLAUDE.md` (o que mudou, por quê, qualquer
   pesquisa feita para tópicos `vol:"high"`, qualquer desvio das regras
   padrão e a justificativa).
7. Atualize [CHANGELOG.md](CHANGELOG.md).

## O que nunca fazer

- Retrofit de conteúdo dos módulos de padrão antigo (`c1-m1`, `c2-m1`,
  `c2-m2`, `c2-m3`) fora da etapa dedicada de Auditoria Final — correção
  estrutural pontual é permitida, reescrita de conteúdo não.
- Editar `searchindex.js` à mão — sempre via `build_index.py`.
- Presumir que uma verificação manual substitui o validador real quando
  houver dúvida — registre a pendência.
- Adicionar componente visual, página ou dependência nova durante o Feature
  Freeze sem aprovação explícita do dono.
