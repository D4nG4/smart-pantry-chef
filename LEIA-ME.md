# 🥗 Smart Pantry Chef

Aplicativo de gestão inteligente de despensa com IA.

---

## 📁 Estrutura de arquivos

```
smart-pantry-chef/
├── index.html              ← Página principal
├── package.json            ← Lista de dependências
├── vite.config.js          ← Configuração do projeto
└── src/
    ├── main.jsx            ← Ponto de entrada do React
    ├── App.jsx             ← App completo (todas as telas)
    └── supabaseClient.js   ← Conexão com o banco de dados
```

---

## 🚀 Como publicar no GitHub e Vercel

### PASSO 1 — Subir no GitHub

1. Acesse github.com e abra o repositório `smart-pantry-chef`
2. Clique em **"uploading an existing file"**
3. Arraste TODOS os arquivos desta pasta
4. Clique em **"Commit changes"**

> ⚠️ Importante: suba a pasta `src` como uma pasta, não arquivos soltos.
> No GitHub, você pode criar a pasta clicando em "Add file" → "Create new file"
> e digitando `src/main.jsx` no nome — ele cria a pasta automaticamente.

### PASSO 2 — Publicar com Vercel (GRATUITO)

1. Acesse **vercel.com**
2. Clique em **"Sign up"** e entre com sua conta do **GitHub**
3. Clique em **"Add New Project"**
4. Selecione o repositório **smart-pantry-chef**
5. Deixe todas as configurações no padrão
6. Clique em **"Deploy"**

Aguarde ~2 minutos. Você receberá um link tipo:
`https://smart-pantry-chef.vercel.app`

✅ Pronto! Seu app está no ar!

### PASSO 3 — Ativar login com Google no Supabase

1. Acesse supabase.com → seu projeto
2. Vá em **Authentication → Providers**
3. Clique em **Google** e ative
4. Você vai precisar criar credenciais no Google Cloud Console
   (o Supabase tem um guia passo a passo ao ativar)

---

## 🔧 Funcionalidades implementadas

- ✅ Login com email/senha
- ✅ Login com Google
- ✅ Despensa com dados salvos no banco
- ✅ Adicionar e remover ingredientes
- ✅ Alertas de validade
- ✅ Receitas com % de compatibilidade
- ✅ Lista de compras salva no banco
- ✅ Cardápio semanal
- ✅ Score de desperdício
- ✅ Chat com IA (Chef IA)
- ✅ Bilíngue PT/EN

---

## 📞 Suporte

Se travar em qualquer etapa, volte ao Claude e descreva
exatamente onde parou. Estarei aqui para ajudar!
