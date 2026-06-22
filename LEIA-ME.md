# 🥗 Smart Pantry Chef — v2.0 Premium

Design escuro premium com fotos reais de comida, tipografia elegante e visual de app profissional.

## 📁 Arquivos

```
smart-pantry-chef/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx          ← App completo v2 (design premium)
    └── supabaseClient.js
```

## 🚀 Como subir no GitHub e publicar

### Passo 1 — GitHub
1. Abra seu repositório `smart-pantry-chef` no GitHub
2. Clique em **"Add file" → "Upload files"**
3. Arraste TODOS os arquivos desta pasta (incluindo a pasta `src`)
4. Se já tem arquivos antigos: substitua — os novos são a versão atualizada
5. Clique em **"Commit changes"**

### Passo 2 — Vercel (redeploy automático)
Se você já conectou o repositório ao Vercel antes:
- O Vercel vai detectar a mudança automaticamente e publicar a nova versão
- Em ~2 minutos seu link estará com o novo design

Se ainda não conectou ao Vercel:
1. Acesse vercel.com → "Add New Project"
2. Selecione o repositório `smart-pantry-chef`
3. Clique "Deploy"

### Passo 3 — Ativar Google Login
No Supabase: Authentication → Sign In / Providers → Google → Ativar

## ✨ O que mudou no v2.0

- Tema escuro premium (fundo verde-floresta profundo)
- Tipografia: Playfair Display + DM Sans
- Cards de receita com fotos reais (Unsplash)
- Efeito glow verde nos destaques
- Sidebar elegante com chip do usuário
- Tela de login com gradiente ambiente
- Animações e micro-interações refinadas
- Totalmente bilíngue PT/EN

## 🔌 Funcionalidades com Supabase

Para conectar a despensa ao banco real, substitua as funções
de `addItem` e `deleteItem` na seção Pantry para usar `supabase.from("pantry_items")`.
O arquivo `supabaseClient.js` já está configurado com suas chaves.
