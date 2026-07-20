# INSTALL

A plataforma é HTML/CSS/JS estático — **zero dependências, zero build, zero
servidor obrigatório**. "Instalar" é só ter os arquivos localmente.

## Requisitos

- Um navegador moderno (qualquer um com suporte a `localStorage`, CSS custom
  properties e `prefers-color-scheme` — Chrome/Edge/Firefox/Safari recentes).
- Nada mais para uso normal. Não precisa de Node, não precisa de Python, não
  precisa de internet depois de baixar os arquivos (0 recursos externos —
  nenhum `http(s)://` em `href`/`src` em nenhum dos 37 arquivos HTML).

Python real é necessário **só** para rodar os dois scripts de validação
(`validate.py` e `build_index.py`) — ver seção própria abaixo. Eles não são
necessários pra estudar na plataforma, só pra quem for editar módulos.

## 1. Obter os arquivos

```bash
git clone <url-do-repositorio>
cd Cusoestetica
```

Ou baixe o ZIP e extraia — não há passo de instalação de pacotes.

## 2. Abrir a plataforma

Abra `index.html` diretamente no navegador (duplo clique, ou arraste pra uma
aba). O motor (`platform.js`) detecta que está rodando em `file://` e usa o
índice de busca pré-construído (`searchindex.js`) em vez de `fetch()`, que não
funciona nesse protocolo — por isso não precisa de servidor.

Se preferir servir por HTTP local (opcional, útil para testar como ficaria
hospedado — ver [DEPLOY.md](DEPLOY.md)):

```bash
# qualquer servidor estático simples funciona, por exemplo:
npx serve .
# ou, com Python real disponível:
python3 -m http.server 8000
```

## 3. Progresso e dados salvos

O progresso (seções concluídas, favoritos, histórico, tema) é salvo em
`localStorage` sob a chave `up_progress_v1`. Se o navegador bloquear
`localStorage` (comum em alguns modos restritivos de `file://`), o
`platform.js` cai automaticamente para um fallback em memória — a sessão
funciona normalmente, só não persiste entre recarregamentos.

Use os atalhos de teclado `G` (glossário), `I` (índice), `M` (mapa), `F`
(favoritos), `H` (histórico), `P` (painel) para navegar rápido, ou exporte/
importe o progresso via `Platform.exportData()` / `Platform.importData()` no
console do navegador.

## 4. Validadores Python (opcional — só para quem for editar módulos)

Dois scripts fazem a validação estrutural completa e a geração do índice de
busca. Eles exigem **Python real com `beautifulsoup4`** — não rodam com o
stub de alias do Microsoft Store no Windows.

```bash
python3 -m pip install beautifulsoup4
python3 validate.py          # valida as 11 dimensões (ver ARCHITECTURE.md)
python3 build_index.py       # regenera searchindex.js
```

`validate.py` sai com código 1 se houver qualquer falha — rode antes de dar
qualquer alteração como concluída. `build_index.py` deve rodar sempre depois
de criar ou editar um módulo (o próprio `validate.py` reprova se
`searchindex.js` estiver dessincronizado do disco).

> **Nota de ambiente**: no ambiente onde a maior parte desta plataforma foi
> construída, só existe o stub do Microsoft Store para `python`/`python3`/`py`
> — nenhum interpretador real. Os dois validadores nunca rodaram de verdade
> ali, só uma réplica manual em Node.js (documentada em [CLAUDE.md](CLAUDE.md)).
> A plataforma está em **RELEASE FINAL v1.0.0** mesmo assim, por decisão
> explícita do dono — mas rodar os dois scripts com Python real continua
> recomendado como manutenção, sempre que houver ambiente disponível.

## Windows — instalar Python real

Se `python`/`python3` abrirem a Microsoft Store em vez de rodar, o alias de
execução está interceptando o comando:

1. Instale o Python real em [python.org/downloads](https://python.org/downloads)
   (marque "Add python.exe to PATH" no instalador), **ou**
2. Desative os aliases em Configurações → Aplicativos → Recursos avançados de
   aplicativo → Aliases de execução de aplicativo → desligue `python.exe` e
   `python3.exe` (aí um Python já instalado por outro meio passa a responder).

## Estrutura de pastas

Não há subpastas — todos os arquivos vivem na raiz do repositório
(ver [README.md](README.md) para a lista completa). Isso é deliberado: o
projeto roda de `file://` sem nenhuma resolução de caminho relativo complexa.
