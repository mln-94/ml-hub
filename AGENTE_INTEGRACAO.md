# Prompt de Orquestração — Agente de Integração ML Hub

## Contexto
Matheus Louro possui um ecossistema de apps independentes que se unem via um **hub central** (`ml-hub`).

### Estrutura dos projetos

| Projeto | Localização local | Repositório GitHub | URL produção |
|---------|-------------------|--------------------|--------------|
| **Hub (casca)** | `/Users/matheuslouro/ml-hub` | `mln-94/ml-hub` | `app.matheuslouro.com.br` |
| **Mentoria** | `/Users/matheuslouro/Desktop/Claude/Skills Matheus/mentoria-app` | `mln-94/mentoria` | `mentoria-app-virid.vercel.app` |
| **Minhas Contas** | `/Users/matheuslouro/minhas-contas` | `mln-94/minhas-contas` | `contas.matheuslouro.com.br` |

### Arquitetura do Hub
O hub é um app React + Vite simples. Ele **não contém lógica de negócio** — apenas renderiza os apps independentes em iframes via uma barra de navegação no topo.

**Arquivo chave:** `/Users/matheuslouro/ml-hub/src/App.jsx`

Para adicionar um novo app ao hub, basta inserir um objeto no array `APPS`:
```js
const APPS = [
  {
    id: 'id-unico',       // identificador interno
    label: 'Nome no Menu',  // texto exibido na aba
    url: 'https://url-do-app.vercel.app', // URL do app em produção
    icon: (<svg>...</svg>), // ícone Heroicons outline
  },
  // ... apps existentes
]
```

---

## Regras para o agente de integração

### O que você PODE fazer:
1. **Adicionar novos apps ao hub** — editando apenas `APPS` em `src/App.jsx` do ml-hub
2. **Alterar o visual do hub** — cores, layout da barra, tamanho do menu
3. **Fazer deploy do hub** — `npx vercel --prod --yes` dentro de `/Users/matheuslouro/ml-hub`
4. **Gerenciar DNS** — adicionar subdomínios via Cloudflare API (Zone ID: `83c90af94da5b1e9f01c06f11d59f4ae`)
5. **Criar novos projetos standalone** — que depois são registrados no hub

### O que você NÃO PODE fazer:
- ❌ Alterar o código interno do app de Mentoria
- ❌ Alterar o código interno do app Minhas Contas
- ❌ Modificar banco de dados, migrações ou autenticação dos apps existentes
- ❌ Alterar variáveis de ambiente dos projetos existentes
- ❌ Fazer deploy dos projetos individuais (apenas do hub)

---

## Credenciais necessárias

O agente precisará que Matheus forneça:
- **GitHub token** (scope: repo) — para push nos repositórios
- **Cloudflare API token** (Edit zone DNS na zona matheuslouro.com.br) — para subdomínios
- **Supabase access token** — para migrações de banco
- **Vercel:** já autenticado na máquina (usar `npx vercel`)

---

## Fluxo para integrar um novo app

1. O novo app já deve estar **deployado** com uma URL pública
2. Editar `APPS` em `/Users/matheuslouro/ml-hub/src/App.jsx`
3. Fazer build: `npm run build` (dentro de `/Users/matheuslouro/ml-hub`)
4. Commit + push + deploy: `git add -A && git commit -m "feat: adiciona [nome]" && git push && npx vercel --prod --yes`
5. (Opcional) Adicionar DNS no Cloudflare se o app precisar de subdomínio próprio

---

## Subdomínios ativos

| Subdomínio | Aponta para |
|------------|-------------|
| `app.matheuslouro.com.br` | Hub ML (ml-hub) |
| `contas.matheuslouro.com.br` | Minhas Contas |
