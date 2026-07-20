# DEPLOY

A plataforma é um site 100% estático (HTML/CSS/JS puro, 0 recursos externos,
sem build step) — qualquer host de arquivos estáticos serve. Não há variável
de ambiente, não há secret, não há backend, não há banco de dados: o único
estado é `localStorage` no navegador de quem acessa.

## Checklist antes de publicar

1. Confirme o status em [CLAUDE.md](CLAUDE.md) — a plataforma está em
   **RELEASE FINAL v1.0.0**; idealmente rode os validadores reais antes de
   qualquer novo deploy, se houver Python disponível (ver [INSTALL.md](INSTALL.md)):
   ```bash
   python3 build_index.py   # regenera searchindex.js com todos os módulos
   python3 validate.py      # precisa terminar em "✅ APROVADO"
   ```
   Publicar com `searchindex.js` desatualizado só degrada a busca — não quebra
   a plataforma, mas evite se possível.
2. Confira que não há nenhum arquivo de progresso pessoal ou dado sensível no
   diretório (a plataforma não grava nada em disco — todo estado é
   `localStorage` do navegador de quem acessa — mas confirme antes de publicar
   qualquer coisa fora do controle de versão).
3. Decida a visibilidade: este é conteúdo de negócio proprietário (protocolos
   próprios, estratégia comercial). Se o host permitir, prefira um deploy
   **privado** (repositório privado + Netlify/Vercel com proteção de acesso,
   ou GitHub Pages num repo privado com plano que suporte isso) em vez de um
   site público indexável.

## Opção 1 — GitHub Pages

```bash
# a partir da branch principal, sem pasta build:
# Settings → Pages → Deploy from a branch → main → / (root)
```

Como não há passo de build, aponte o Pages direto para a raiz do repositório.
Funciona em `https://<usuario>.github.io/<repo>/index.html`. Para domínio
próprio, adicione um arquivo `CNAME` na raiz (não incluído por padrão).

## Opção 2 — Netlify / Vercel

Ambos suportam "sem framework detectado" — configure:

- **Build command**: (vazio — não há build)
- **Publish directory**: `.` (raiz do repositório)

Deploy por conexão direta ao repositório Git (deploy automático a cada push)
ou por upload manual da pasta.

## Opção 3 — Qualquer servidor de arquivos estáticos

Nginx, Apache, Caddy, S3 + CloudFront, um VPS qualquer com `python3 -m
http.server`, etc. — basta servir a raiz do repositório como document root.
Não há regra de rewrite necessária: toda navegação é por link `.html` direto
(`index.html`, `c1-m1-arquitetura.html`, etc.), não há client-side routing.

## Cache

Os arquivos versionam pelo conteúdo? Não — não há hash no nome dos arquivos.
Se o host aplicar cache agressivo em `.js`/`.css`, configure um TTL curto (ou
invalidação manual no deploy) para `platform.js`, `platform.css`,
`manifest.js`, `glossario.js` e `searchindex.js`, já que qualquer atualização
de conteúdo os modifica diretamente.

## HTTPS

Sem requisito específico da aplicação (não usa Service Worker, não usa API
que exija contexto seguro), mas use HTTPS de qualquer forma — todos os hosts
acima oferecem por padrão.

## Pós-deploy

Verifique manualmente, numa aba anônima:
- `index.html` carrega e mostra as estatísticas corretas (31 módulos).
- Um módulo qualquer abre, o botão de tema alterna claro/escuro sem flash.
- O atalho `G` abre o glossário; a busca (Cmd/Ctrl+K, se aplicável) retorna
  resultado para um termo conhecido.
- Console do navegador sem erros.

Não há verificação automatizada de deploy (sem CI configurado neste
repositório) — esse checklist é manual até que uma pipeline seja adicionada.
