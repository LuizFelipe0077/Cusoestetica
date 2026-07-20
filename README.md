# Cusoestetica — Universidade Premium

Plataforma de estudo pessoal sobre aquisição de pacientes para estética
integrativa, construída como um **Platform Shell** (motor único em JavaScript +
um arquivo HTML por módulo). Existe para que o dono consiga criar, executar,
otimizar e escalar campanhas de Meta Ads para dois protocolos próprios
(**melasma** e **estrias**) — não é uma enciclopédia de marketing, é um manual
de execução.

> Status: **RELEASE FINAL v1.0.0** (2026-07-20). Ver [CHANGELOG.md](CHANGELOG.md)
> e "DECLARAÇÃO OFICIAL — RELEASE FINAL v1.0.0" em [CLAUDE.md](CLAUDE.md).

## O que é

31 módulos em 3 cursos + 1 capstone, ~31h de conteúdo:

| Curso | Foco | Módulos |
|---|---|---|
| **C1 — Sistema Comercial** | Por onde entra o dinheiro: arquitetura, posicionamento, oferta, Meta Ads, WhatsApp, consulta, remarketing, pós-venda | 8 |
| **C2 — Psicologia e Conteúdo** | Como decidir e persuadir: atenção, identificação, confiança, Reels, ganchos, roteiros, Instagram, planejamento, erros fatais | 9 |
| **C3 — Engenharia e Dados** | A infraestrutura de mensuração: Pixel/CAPI, GTM, GA4, Clarity, experimentação, CRO, performance, SEO, segurança/LGPD, dashboard, plano, engenharia de excelência | 13 |
| **Capstone — SOG** | Sistema Operacional de Crescimento: os 3 motores + 2 ciclos que integram tudo numa rotina operacional | 1 |

A fonte única de verdade da estrutura de cursos é [manifest.js](manifest.js) —
nenhum outro arquivo lista os módulos. Ver [ARCHITECTURE.md](ARCHITECTURE.md)
para como o shell funciona.

## Como usar

Não há build, não há servidor, não há dependência externa. Abra
[index.html](index.html) em qualquer navegador — funciona direto de
`file://`, sem internet. Detalhes em [INSTALL.md](INSTALL.md).

## Estrutura do repositório

```
index.html              Portal — estatísticas e índice de cursos
mapa.html                Grafo de dependências entre módulos
painel.html               Painel de progresso
favoritos.html              Módulos e termos marcados
historico.html                Histórico de módulos visitados
glossario.html                  Página de busca do glossário
c{1,2,3}-m*.html / sog.html       31 módulos de conteúdo

manifest.js              Fonte única de verdade: cursos, módulos, deps
glossario.js              61 termos técnicos (nome/simples/técnica/exemplo/onde)
searchindex.js              Índice de busca (gerado por build_index.py)
platform.js                   Motor do shell: sidebar, nav, progresso, busca
theme.js                        Bootstrap de tema claro/escuro
platform.css                      Design system: ~70 tokens CSS, 0 cor fixa

validate.py               Validador estrutural (Python — ver INSTALL.md)
build_index.py              Gerador do índice de busca (Python)

CLAUDE.md                 Diretrizes de conteúdo e histórico de decisões
ROADMAP-POS-RELEASE.md      Ideias adiadas — nada entra no código antes daqui
```

## Documentação

| Arquivo | Conteúdo |
|---|---|
| [INSTALL.md](INSTALL.md) | Como rodar localmente e (opcionalmente) os validadores Python |
| [DEPLOY.md](DEPLOY.md) | Como publicar num host estático |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Como o Platform Shell funciona por dentro |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Regras de conteúdo e processo para editar módulos |
| [CHANGELOG.md](CHANGELOG.md) | Histórico de versões |
| [CLAUDE.md](CLAUDE.md) | Diretrizes completas de conteúdo e decisões arquiteturais (fonte canônica) |

## Licença

MIT — ver [LICENSE](LICENSE).
