import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabaseClient";

// ── Language strings ──────────────────────────────────────────────────────────
const T = {
  en: {
    appName: "Smart Pantry Chef",
    tagline: "Transform Your Pantry Into Meals",
    nav: { dashboard: "Dashboard", pantry: "My Pantry", recipes: "Recipes", shopping: "Shopping", planner: "Meal Planner", waste: "Waste Score" },
    auth: { welcome: "Welcome to Smart Pantry Chef", subtitle: "Sign in to save your pantry and recipes", email: "Email address", password: "Password", signin: "Sign In", signup: "Create Account", toggle_signin: "Already have an account? Sign in", toggle_signup: "No account yet? Create one", or: "or", google: "Continue with Google", loading: "Loading…", error: "Something went wrong. Try again." },
    dashboard: { title: "Good morning! 👋", subtitle: "Here's what's happening in your kitchen today.", expiring: "Expiring Soon", recipes_ready: "Recipes Ready", pantry_value: "Pantry Value", waste_score: "Waste Score", urgent: "Urgent", cook_before: "Cook Before They Expire", view_all: "View All", days: "days", expires_tomorrow: "Expires tomorrow", expires_in: "Expires in" },
    pantry: { title: "My Pantry", subtitle: "Track everything you have at home", add: "Add Item", search: "Search ingredients…", categories: ["All", "Fridge", "Freezer", "Pantry", "Spices"], expires: "Expires", qty: "Qty", location: "Location", add_modal_title: "Add Ingredient", name: "Name", quantity: "Quantity", unit: "Unit", category: "Category", exp_date: "Expiration Date", save: "Save", cancel: "Cancel", import_receipt: "📷 Scan Receipt", voice: "🎙️ Voice", barcode: "📊 Barcode", empty: "Your pantry is empty. Add your first ingredient!", deleting: "Removing…" },
    recipes: { title: "Recipes For You", subtitle: "Based on what you already have", can_cook: "Can Cook Now", almost: "Almost Ready", shopping_needed: "Need Shopping", match: "match", missing: "Missing", ingredients: "ingredients", minutes: "min", servings: "servings", difficulty: ["Easy", "Medium", "Hard"], watch_video: "▶ Watch Recipe Video", cook_now: "Start Cooking", save: "Save Recipe" },
    shopping: { title: "Shopping List", subtitle: "What you need to buy", add_item: "Add Item", clear: "Clear Checked", generate: "From Recipe", total_est: "Estimated Total", items: "items", empty: "Your shopping list is empty." },
    waste: { title: "Food Waste Score", subtitle: "Track your impact on the environment & wallet", score_label: "Your Score", this_month: "This Month", money_saved: "Money Saved", rescued: "Items Rescued", cooked: "Recipes Cooked", reduction: "Waste Reduced", excellent: "Excellent! Keep it up 🌱", good: "Good job! Small improvements ahead 👍", average: "Room to improve — let's reduce waste 💪" },
    ai: { title: "AI Chef Assistant", placeholder: "Tell me what you have…", send: "Ask", thinking: "Thinking…", greeting: "Hi! I'm your AI Chef. Tell me what ingredients you have and I'll suggest recipes!" },
    lang: "PT", signout: "Sign Out",
  },
  pt: {
    appName: "Smart Pantry Chef",
    tagline: "Transforme Sua Despensa em Refeições",
    nav: { dashboard: "Início", pantry: "Minha Despensa", recipes: "Receitas", shopping: "Compras", planner: "Cardápio", waste: "Desperdício" },
    auth: { welcome: "Bem-vindo ao Smart Pantry Chef", subtitle: "Entre para salvar sua despensa e receitas", email: "Endereço de e-mail", password: "Senha", signin: "Entrar", signup: "Criar Conta", toggle_signin: "Já tem conta? Entrar", toggle_signup: "Não tem conta? Criar agora", or: "ou", google: "Continuar com Google", loading: "Carregando…", error: "Algo deu errado. Tente novamente." },
    dashboard: { title: "Bom dia! 👋", subtitle: "Veja o que está acontecendo na sua cozinha hoje.", expiring: "Vencendo em Breve", recipes_ready: "Receitas Prontas", pantry_value: "Valor da Despensa", waste_score: "Score de Desperdício", urgent: "Urgente", cook_before: "Cozinhe Antes que Vença", view_all: "Ver Tudo", days: "dias", expires_tomorrow: "Vence amanhã", expires_in: "Vence em" },
    pantry: { title: "Minha Despensa", subtitle: "Acompanhe tudo que você tem em casa", add: "Adicionar", search: "Buscar ingredientes…", categories: ["Todos", "Geladeira", "Freezer", "Despensa", "Temperos"], expires: "Vence", qty: "Qtd", location: "Local", add_modal_title: "Adicionar Ingrediente", name: "Nome", quantity: "Quantidade", unit: "Unidade", category: "Categoria", exp_date: "Data de Validade", save: "Salvar", cancel: "Cancelar", import_receipt: "📷 Escanear Nota", voice: "🎙️ Voz", barcode: "📊 Código de Barras", empty: "Sua despensa está vazia. Adicione seu primeiro ingrediente!", deleting: "Removendo…" },
    recipes: { title: "Receitas Para Você", subtitle: "Com base no que você já tem", can_cook: "Pode Cozinhar Agora", almost: "Quase Pronto", shopping_needed: "Precisa Comprar", match: "compatível", missing: "Faltando", ingredients: "ingredientes", minutes: "min", servings: "porções", difficulty: ["Fácil", "Médio", "Difícil"], watch_video: "▶ Ver Vídeo da Receita", cook_now: "Começar a Cozinhar", save: "Salvar Receita" },
    shopping: { title: "Lista de Compras", subtitle: "O que você precisa comprar", add_item: "Adicionar Item", clear: "Limpar Marcados", generate: "Da Receita", total_est: "Total Estimado", items: "itens", empty: "Sua lista de compras está vazia." },
    waste: { title: "Score de Desperdício", subtitle: "Acompanhe seu impacto no ambiente e na carteira", score_label: "Seu Score", this_month: "Este Mês", money_saved: "Dinheiro Economizado", rescued: "Itens Resgatados", cooked: "Receitas Cozidas", reduction: "Desperdício Evitado", excellent: "Excelente! Continue assim 🌱", good: "Bom trabalho! Pequenas melhorias à frente 👍", average: "Dá para melhorar — vamos reduzir o desperdício 💪" },
    ai: { title: "Assistente Chef IA", placeholder: "Me diga o que você tem…", send: "Perguntar", thinking: "Pensando…", greeting: "Olá! Sou seu Chef IA. Me diga quais ingredientes você tem e eu sugiro as melhores receitas!" },
    lang: "EN", signout: "Sair",
  },
};

// ── Static Recipes (local) ────────────────────────────────────────────────────
const RECIPES = [
  { id: 1, title: "Omelete de Queijo / Cheese Omelette", cuisine: "Brazilian", time: 15, servings: 2, difficulty: 0, match: 100, missing: [], calories: 320, protein: 24, category: "Breakfast", emoji: "🍳", description: "Fluffy omelette packed with melted mozzarella.", ingredients: ["Eggs", "Mozzarella", "Salt", "Olive Oil"], steps: ["Beat 3 eggs with a pinch of salt.", "Heat olive oil in a non-stick pan.", "Pour eggs and cook until edges set.", "Add mozzarella, fold and serve."], videoChannel: "Chef João", videoDuration: "8:32", videoViews: "2.4M" },
  { id: 2, title: "Risoto de Cogumelos / Mushroom Risotto", cuisine: "Italian", time: 35, servings: 4, difficulty: 1, match: 85, missing: ["Arborio Rice", "White Wine"], calories: 480, protein: 12, category: "Dinner", emoji: "🍲", description: "Creamy Italian risotto with sautéed mushrooms.", ingredients: ["Mushrooms", "Onion", "Garlic", "Olive Oil"], steps: ["Sauté onion and garlic.", "Add mushrooms, cook until golden.", "Add rice and broth gradually.", "Finish with parmesan."], videoChannel: "Cucina Italia", videoDuration: "12:15", videoViews: "890K" },
  { id: 3, title: "Frango ao Alho / Garlic Chicken", cuisine: "Brazilian", time: 45, servings: 4, difficulty: 1, match: 95, missing: ["Lemon"], calories: 520, protein: 48, category: "Dinner", emoji: "🍗", description: "Juicy chicken with crispy garlic crust.", ingredients: ["Chicken", "Garlic", "Olive Oil", "Salt"], steps: ["Season chicken with garlic and salt.", "Marinate 30 min.", "Sear in olive oil 4 min each side.", "Finish in oven 180°C for 15 min."], videoChannel: "Sabores do Brasil", videoDuration: "18:40", videoViews: "3.1M" },
  { id: 4, title: "Arroz com Feijão / Rice & Beans", cuisine: "Brazilian", time: 40, servings: 6, difficulty: 0, match: 100, missing: [], calories: 380, protein: 14, category: "Lunch", emoji: "🍚", description: "The classic Brazilian comfort food duo.", ingredients: ["Rice", "Beans", "Garlic", "Onion"], steps: ["Cook beans in pressure cooker 20 min.", "Sauté garlic and onion.", "Season beans to taste.", "Cook rice and serve together."], videoChannel: "Receitas Brasileiras", videoDuration: "22:10", videoViews: "5.7M" },
  { id: 5, title: "Salada Caprese / Caprese Salad", cuisine: "Italian", time: 10, servings: 2, difficulty: 0, match: 100, missing: [], calories: 220, protein: 14, category: "Lunch", emoji: "🥗", description: "Fresh tomato and mozzarella with olive oil.", ingredients: ["Tomato", "Mozzarella", "Olive Oil", "Salt"], steps: ["Slice tomatoes and mozzarella.", "Layer on a plate.", "Drizzle with olive oil.", "Add salt and fresh basil."], videoChannel: "Italian Kitchen", videoDuration: "6:20", videoViews: "1.2M" },
  { id: 6, title: "Macarrão ao Sugo / Tomato Pasta", cuisine: "Italian", time: 25, servings: 4, difficulty: 0, match: 70, missing: ["Pasta", "Basil"], calories: 420, protein: 16, category: "Dinner", emoji: "🍝", description: "Simple classic tomato sauce pasta.", ingredients: ["Tomato", "Garlic", "Onion", "Olive Oil"], steps: ["Cook pasta in salted water.", "Sauté garlic and onion.", "Add tomatoes, simmer 15 min.", "Toss pasta in sauce."], videoChannel: "Pasta Masters", videoDuration: "14:55", videoViews: "4.3M" },
];

const WEEK_DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const WEEK_DAYS_PT = ["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"];
const MEAL_PLAN = {
  Mon: { breakfast: "Cheese Omelette 🍳", lunch: "Rice & Beans 🍚", dinner: null, snack: null },
  Tue: { breakfast: null, lunch: "Caprese Salad 🥗", dinner: "Garlic Chicken 🍗", snack: null },
  Wed: { breakfast: null, lunch: null, dinner: "Mushroom Risotto 🍲", snack: null },
  Thu: { breakfast: "Cheese Omelette 🍳", lunch: "Rice & Beans 🍚", dinner: null, snack: null },
  Fri: { breakfast: null, lunch: null, dinner: "Tomato Pasta 🍝", snack: null },
  Sat: { breakfast: null, lunch: "Caprese Salad 🥗", dinner: "Garlic Chicken 🍗", snack: null },
  Sun: { breakfast: null, lunch: "Rice & Beans 🍚", dinner: null, snack: null },
};

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,600;1,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --g50:#f0faf4;--g100:#dcf4e6;--g400:#48bb78;--g500:#38a169;--g600:#2f855a;
    --o100:#fff3e0;--o400:#f6a623;--o500:#ed8936;--o600:#dd6b20;
    --r100:#fff5f5;--r400:#f56565;--r500:#e53e3e;
    --gray50:#f8fafc;--gray100:#f1f5f9;--gray200:#e2e8f0;--gray300:#cbd5e1;
    --gray400:#94a3b8;--gray500:#64748b;--gray600:#475569;--gray700:#334155;
    --gray800:#1e293b;--gray900:#0f172a;--white:#fff;
    --shadow-sm:0 1px 3px rgba(0,0,0,.06);
    --shadow-md:0 4px 12px rgba(0,0,0,.08);
    --shadow-lg:0 10px 30px rgba(0,0,0,.10);
    --r-sm:8px;--r-md:12px;--r-lg:18px;--r-xl:24px;
    --font:'Plus Jakarta Sans',system-ui,sans-serif;
    --display:'Lora',Georgia,serif;
  }
  html,body{height:100%;font-family:var(--font);background:var(--gray50);color:var(--gray800);}
  #root{height:100%;}

  /* Auth */
  .auth-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--g50) 0%,var(--o100) 100%);padding:20px;}
  .auth-card{background:var(--white);border-radius:var(--r-xl);padding:40px;max-width:420px;width:100%;box-shadow:var(--shadow-lg);border:1px solid var(--gray100);}
  .auth-logo{display:flex;align-items:center;gap:12px;justify-content:center;margin-bottom:28px;}
  .auth-logo-icon{width:48px;height:48px;background:linear-gradient(135deg,var(--g500),var(--o400));border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:26px;}
  .auth-logo-name{font-family:var(--display);font-size:20px;font-weight:600;color:var(--gray900);}
  .auth-title{font-size:22px;font-weight:800;color:var(--gray900);text-align:center;margin-bottom:6px;}
  .auth-sub{font-size:14px;color:var(--gray400);text-align:center;margin-bottom:28px;}
  .auth-google{width:100%;padding:12px;border:1.5px solid var(--gray200);border-radius:var(--r-md);background:var(--white);cursor:pointer;font-size:14px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:10px;transition:all .15s;color:var(--gray700);}
  .auth-google:hover{border-color:var(--g400);color:var(--g600);background:var(--g50);}
  .auth-divider{display:flex;align-items:center;gap:12px;margin:20px 0;}
  .auth-divider-line{flex:1;height:1px;background:var(--gray200);}
  .auth-divider-text{font-size:12px;color:var(--gray400);font-weight:500;}
  .auth-field{margin-bottom:16px;}
  .auth-label{font-size:13px;font-weight:600;color:var(--gray600);margin-bottom:6px;display:block;}
  .auth-input{width:100%;padding:11px 14px;border:1.5px solid var(--gray200);border-radius:var(--r-md);font-size:14px;font-family:var(--font);outline:none;transition:border-color .15s;}
  .auth-input:focus{border-color:var(--g400);box-shadow:0 0 0 3px rgba(72,187,120,.12);}
  .auth-btn{width:100%;padding:13px;background:var(--g500);color:var(--white);border:none;border-radius:var(--r-md);font-size:15px;font-weight:700;cursor:pointer;transition:all .15s;font-family:var(--font);}
  .auth-btn:hover{background:var(--g600);}
  .auth-btn:disabled{opacity:.6;cursor:not-allowed;}
  .auth-toggle{text-align:center;margin-top:20px;font-size:13px;color:var(--gray500);}
  .auth-toggle button{color:var(--g600);font-weight:700;background:none;border:none;cursor:pointer;}
  .auth-error{background:var(--r100);color:var(--r500);padding:10px 14px;border-radius:var(--r-sm);font-size:13px;margin-bottom:16px;font-weight:500;}

  /* Shell */
  .app-shell{display:flex;height:100vh;overflow:hidden;}
  .sidebar{width:240px;min-width:240px;background:var(--white);border-right:1px solid var(--gray100);display:flex;flex-direction:column;padding:0 0 24px;z-index:10;}
  .sidebar-logo{padding:28px 24px 20px;border-bottom:1px solid var(--gray100);}
  .logo-mark{display:flex;align-items:center;gap:10px;}
  .logo-icon{width:38px;height:38px;background:linear-gradient(135deg,var(--g500),var(--o400));border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;}
  .logo-text{font-size:14px;font-weight:700;color:var(--gray800);line-height:1.2;}
  .logo-sub{font-size:11px;color:var(--gray400);}
  .nav-section{padding:16px 12px 0;flex:1;}
  .nav-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:var(--r-sm);cursor:pointer;margin-bottom:2px;transition:all .15s;font-size:13.5px;font-weight:500;color:var(--gray600);border:none;background:none;width:100%;text-align:left;}
  .nav-item:hover{background:var(--gray50);color:var(--gray800);}
  .nav-item.active{background:var(--g50);color:var(--g600);font-weight:600;}
  .nav-emoji{font-size:16px;width:20px;text-align:center;}
  .sidebar-footer{padding:0 12px;display:flex;flex-direction:column;gap:6px;}
  .lang-btn{padding:8px 12px;border-radius:var(--r-sm);border:1px solid var(--gray200);background:var(--white);cursor:pointer;font-size:12px;font-weight:600;color:var(--gray500);transition:all .15s;display:flex;align-items:center;gap:6px;}
  .lang-btn:hover{border-color:var(--g400);color:var(--g600);}
  .signout-btn{padding:8px 12px;border-radius:var(--r-sm);border:1px solid var(--r100);background:var(--white);cursor:pointer;font-size:12px;font-weight:600;color:var(--r500);transition:all .15s;display:flex;align-items:center;gap:6px;}
  .signout-btn:hover{background:var(--r100);}
  .main-content{flex:1;overflow-y:auto;background:var(--gray50);}
  .page{padding:32px 36px;max-width:1100px;}
  .page-header{margin-bottom:28px;}
  .page-title{font-family:var(--display);font-size:26px;font-weight:600;color:var(--gray900);}
  .page-subtitle{font-size:14px;color:var(--gray400);margin-top:4px;}

  /* Stats */
  .stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px;}
  .stat-card{background:var(--white);border-radius:var(--r-lg);padding:20px 24px;border:1px solid var(--gray100);box-shadow:var(--shadow-sm);}
  .stat-icon{font-size:22px;margin-bottom:10px;}
  .stat-label{font-size:12px;color:var(--gray400);font-weight:500;text-transform:uppercase;letter-spacing:.5px;}
  .stat-number{font-size:30px;font-weight:800;color:var(--gray900);line-height:1;margin:4px 0;}
  .stat-badge{display:inline-flex;align-items:center;font-size:11px;font-weight:600;padding:2px 8px;border-radius:20px;}
  .badge-red{background:var(--r100);color:var(--r500);}
  .badge-orange{background:var(--o100);color:var(--o600);}
  .badge-green{background:var(--g100);color:var(--g600);}

  /* Expiry */
  .section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
  .section-title{font-size:16px;font-weight:700;color:var(--gray800);}
  .view-all-btn{font-size:13px;color:var(--g600);font-weight:600;cursor:pointer;background:none;border:none;}
  .expiry-list{display:flex;flex-direction:column;gap:10px;}
  .expiry-item{background:var(--white);border-radius:var(--r-md);padding:14px 18px;display:flex;align-items:center;gap:14px;border:1px solid var(--gray100);box-shadow:var(--shadow-sm);}
  .expiry-item.urgent{border-left:3px solid var(--r400);}
  .expiry-item.soon{border-left:3px solid var(--o400);}
  .expiry-emoji{font-size:24px;}
  .expiry-name{font-size:14px;font-weight:600;color:var(--gray800);}
  .expiry-days{font-size:12px;margin-top:2px;}
  .expiry-days.urgent{color:var(--r500);font-weight:600;}
  .expiry-days.soon{color:var(--o500);font-weight:600;}
  .expiry-recipe-btn{margin-left:auto;font-size:12px;font-weight:600;background:var(--g50);color:var(--g600);border:1px solid var(--g100);border-radius:20px;padding:4px 12px;cursor:pointer;white-space:nowrap;transition:all .15s;}
  .expiry-recipe-btn:hover{background:var(--g500);color:var(--white);}

  /* Buttons */
  .btn{padding:10px 18px;border-radius:var(--r-md);border:none;font-size:13.5px;font-weight:600;cursor:pointer;transition:all .15s;font-family:var(--font);display:inline-flex;align-items:center;gap:6px;}
  .btn-primary{background:var(--g500);color:var(--white);}
  .btn-primary:hover{background:var(--g600);transform:translateY(-1px);box-shadow:var(--shadow-md);}
  .btn-secondary{background:var(--white);color:var(--gray700);border:1px solid var(--gray200);}
  .btn-secondary:hover{background:var(--gray50);border-color:var(--gray300);}
  .btn-orange{background:var(--o500);color:var(--white);}
  .btn-orange:hover{background:var(--o600);}
  .btn-sm{padding:6px 12px;font-size:12px;}
  .btn:disabled{opacity:.5;cursor:not-allowed;transform:none;}

  /* Pantry */
  .pantry-toolbar{display:flex;align-items:center;gap:12px;margin-bottom:20px;flex-wrap:wrap;}
  .search-input{flex:1;min-width:200px;padding:10px 16px;border:1px solid var(--gray200);border-radius:var(--r-md);font-size:14px;font-family:var(--font);outline:none;background:var(--white);transition:border-color .15s;}
  .search-input:focus{border-color:var(--g400);box-shadow:0 0 0 3px rgba(72,187,120,.15);}
  .cat-tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:20px;}
  .cat-tab{padding:6px 14px;border-radius:20px;font-size:12.5px;font-weight:600;cursor:pointer;transition:all .15s;border:1px solid var(--gray200);background:var(--white);color:var(--gray500);}
  .cat-tab.active{background:var(--g500);color:var(--white);border-color:var(--g500);}
  .pantry-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px;}
  .pantry-card{background:var(--white);border-radius:var(--r-md);padding:16px;border:1px solid var(--gray100);box-shadow:var(--shadow-sm);transition:transform .15s,box-shadow .15s;position:relative;}
  .pantry-card:hover{transform:translateY(-2px);box-shadow:var(--shadow-md);}
  .pantry-card-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px;}
  .pantry-emoji-circle{width:44px;height:44px;background:var(--g50);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;}
  .days-badge{font-size:11px;font-weight:700;padding:3px 8px;border-radius:20px;}
  .days-urgent{background:var(--r100);color:var(--r500);}
  .days-soon{background:var(--o100);color:var(--o600);}
  .days-ok{background:var(--g100);color:var(--g600);}
  .pantry-name{font-size:14px;font-weight:700;color:var(--gray800);}
  .pantry-details{display:flex;gap:10px;margin-top:8px;flex-wrap:wrap;}
  .pantry-detail-item{font-size:12px;color:var(--gray400);}
  .pantry-detail-item span{font-weight:600;color:var(--gray600);}
  .delete-btn{position:absolute;top:10px;right:10px;background:none;border:none;font-size:14px;cursor:pointer;color:var(--gray300);opacity:0;transition:opacity .15s;}
  .pantry-card:hover .delete-btn{opacity:1;}
  .delete-btn:hover{color:var(--r500);}
  .empty-state{text-align:center;padding:60px 20px;color:var(--gray400);}
  .empty-state-emoji{font-size:52px;margin-bottom:16px;}
  .empty-state-text{font-size:15px;}

  /* Modal */
  .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;z-index:100;padding:20px;}
  .modal{background:var(--white);border-radius:var(--r-xl);max-width:560px;width:100%;max-height:88vh;overflow-y:auto;box-shadow:0 25px 60px rgba(0,0,0,.2);}
  .modal-header{padding:24px 24px 16px;border-bottom:1px solid var(--gray100);display:flex;align-items:flex-start;gap:16px;}
  .modal-emoji{font-size:40px;}
  .modal-title{font-family:var(--display);font-size:20px;font-weight:600;color:var(--gray900);}
  .modal-subtitle{font-size:13px;color:var(--gray400);margin-top:4px;}
  .modal-close{margin-left:auto;background:none;border:none;font-size:20px;cursor:pointer;color:var(--gray400);padding:4px 8px;}
  .modal-body{padding:20px 24px;}
  .modal-section{margin-bottom:20px;}
  .modal-section-title{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--gray400);margin-bottom:12px;}
  .modal-footer{padding:16px 24px;border-top:1px solid var(--gray100);display:flex;gap:10px;justify-content:flex-end;}
  .form-group{margin-bottom:16px;}
  .form-label{font-size:13px;font-weight:600;color:var(--gray600);margin-bottom:6px;display:block;}
  .form-input{width:100%;padding:10px 14px;border:1px solid var(--gray200);border-radius:var(--r-md);font-size:14px;font-family:var(--font);outline:none;transition:border-color .15s;}
  .form-input:focus{border-color:var(--g400);box-shadow:0 0 0 3px rgba(72,187,120,.12);}
  .form-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}

  /* Recipes */
  .recipe-tabs{display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap;}
  .recipe-tab{padding:8px 16px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid var(--gray200);background:var(--white);color:var(--gray500);transition:all .15s;display:flex;align-items:center;gap:6px;}
  .recipe-tab.active{background:var(--g500);color:var(--white);border-color:var(--g500);}
  .recipe-count{font-size:11px;background:var(--gray100);color:var(--gray400);border-radius:10px;padding:1px 6px;}
  .recipe-tab.active .recipe-count{background:rgba(255,255,255,.3);color:var(--white);}
  .recipes-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:18px;}
  .recipe-card{background:var(--white);border-radius:var(--r-lg);overflow:hidden;border:1px solid var(--gray100);box-shadow:var(--shadow-sm);transition:transform .15s,box-shadow .15s;cursor:pointer;}
  .recipe-card:hover{transform:translateY(-3px);box-shadow:var(--shadow-lg);}
  .recipe-banner{height:120px;display:flex;align-items:center;justify-content:center;font-size:52px;position:relative;}
  .recipe-banner-100{background:linear-gradient(135deg,#dcf4e6,#f0faf4);}
  .recipe-banner-95{background:linear-gradient(135deg,#e8f5e9,#f1f8e9);}
  .recipe-banner-85{background:linear-gradient(135deg,#fff3e0,#fff8f0);}
  .recipe-banner-70{background:linear-gradient(135deg,#fff9f0,#fffdf0);}
  .match-pill{position:absolute;top:10px;right:10px;font-size:11px;font-weight:800;padding:3px 10px;border-radius:20px;}
  .match-100{background:var(--g500);color:var(--white);}
  .match-95{background:var(--g400);color:var(--white);}
  .match-85{background:var(--o400);color:var(--white);}
  .match-70{background:var(--gray400);color:var(--white);}
  .recipe-body{padding:16px;}
  .recipe-title{font-size:15px;font-weight:700;color:var(--gray800);margin-bottom:6px;line-height:1.3;}
  .recipe-desc{font-size:12.5px;color:var(--gray400);line-height:1.5;margin-bottom:12px;}
  .recipe-meta{display:flex;gap:12px;font-size:12px;color:var(--gray500);margin-bottom:12px;}
  .recipe-missing{background:var(--o100);border-radius:var(--r-sm);padding:8px 12px;margin-bottom:12px;}
  .recipe-missing-title{font-size:11px;font-weight:700;color:var(--o600);margin-bottom:4px;}
  .recipe-missing-items{font-size:12px;color:var(--o500);}
  .recipe-actions{display:flex;gap:8px;}
  .steps-list{display:flex;flex-direction:column;gap:10px;}
  .step-item{display:flex;gap:12px;align-items:flex-start;}
  .step-num{width:26px;height:26px;min-width:26px;background:var(--g500);color:var(--white);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;}
  .step-text{font-size:14px;color:var(--gray700);padding-top:3px;line-height:1.5;}
  .nutrition-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
  .nutrition-item{background:var(--gray50);border-radius:var(--r-sm);padding:10px 12px;text-align:center;}
  .nutrition-value{font-size:18px;font-weight:800;color:var(--gray800);}
  .nutrition-label{font-size:11px;color:var(--gray400);margin-top:2px;}
  .video-card{background:var(--gray50);border-radius:var(--r-md);padding:14px;display:flex;gap:14px;align-items:center;border:1px solid var(--gray200);cursor:pointer;transition:all .15s;}
  .video-card:hover{background:var(--g50);border-color:var(--g200);}
  .video-thumb{width:90px;height:58px;background:var(--gray200);border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0;}
  .video-title{font-size:13px;font-weight:600;color:var(--gray800);}
  .video-meta{font-size:12px;color:var(--gray400);margin-top:4px;}

  /* Shopping */
  .shopping-toolbar{display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;}
  .shopping-list-items{display:flex;flex-direction:column;gap:8px;}
  .shopping-item{background:var(--white);border-radius:var(--r-md);padding:14px 18px;display:flex;align-items:center;gap:14px;border:1px solid var(--gray100);box-shadow:var(--shadow-sm);transition:opacity .15s;}
  .shopping-item.checked{opacity:.45;}
  .checkbox{width:20px;height:20px;border-radius:6px;border:2px solid var(--gray300);background:var(--white);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;flex-shrink:0;}
  .checkbox.checked{background:var(--g500);border-color:var(--g500);}
  .shopping-name{font-size:14px;font-weight:600;color:var(--gray800);}
  .shopping-qty{font-size:12px;color:var(--gray400);margin-top:2px;}
  .shopping-category{margin-left:auto;font-size:11px;color:var(--gray400);background:var(--gray100);padding:3px 8px;border-radius:10px;}
  .shopping-price{font-size:14px;font-weight:700;color:var(--g600);margin-left:10px;}
  .shopping-total{background:var(--g50);border:1px solid var(--g100);border-radius:var(--r-md);padding:16px 20px;margin-top:20px;display:flex;justify-content:space-between;align-items:center;}
  .shopping-total-label{font-size:14px;font-weight:600;color:var(--gray600);}
  .shopping-total-value{font-size:22px;font-weight:800;color:var(--g600);}

  /* Planner */
  .planner-tabs{display:flex;gap:6px;margin-bottom:20px;}
  .planner-tab{padding:7px 16px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid var(--gray200);background:var(--white);color:var(--gray500);transition:all .15s;}
  .planner-tab.active{background:var(--g500);color:var(--white);border-color:var(--g500);}
  .week-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:10px;}
  .day-col{display:flex;flex-direction:column;gap:8px;}
  .day-label{font-size:12px;font-weight:700;color:var(--gray500);text-align:center;padding:6px 0;}
  .day-label.today{color:var(--g600);}
  .meal-slot{background:var(--white);border-radius:var(--r-sm);padding:8px 10px;border:1px solid var(--gray100);min-height:60px;font-size:11.5px;color:var(--gray700);line-height:1.4;}
  .meal-slot.empty{background:var(--gray50);color:var(--gray300);display:flex;align-items:center;justify-content:center;cursor:pointer;border:1.5px dashed var(--gray200);}
  .meal-slot.empty:hover{border-color:var(--g300);color:var(--g400);background:var(--g50);}
  .meal-type-label{font-size:10px;font-weight:700;color:var(--gray400);text-transform:uppercase;margin-bottom:3px;letter-spacing:.4px;}

  /* Waste */
  .score-hero{text-align:center;padding:32px 24px;}
  .score-ring-wrap{display:inline-block;position:relative;margin:20px auto;}
  .score-ring{transform:rotate(-90deg);}
  .score-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}
  .score-number{font-size:44px;font-weight:900;color:var(--gray900);line-height:1;}
  .score-denom{font-size:16px;color:var(--gray400);}
  .score-label{font-size:14px;color:var(--gray500);margin-top:4px;}
  .score-message{font-size:15px;font-weight:600;color:var(--g600);margin-top:8px;}
  .impact-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-top:24px;}
  .impact-card{background:var(--white);border-radius:var(--r-md);padding:18px 20px;border:1px solid var(--gray100);box-shadow:var(--shadow-sm);}
  .impact-emoji{font-size:26px;margin-bottom:8px;}
  .impact-value{font-size:24px;font-weight:800;color:var(--gray900);}
  .impact-label{font-size:12px;color:var(--gray400);margin-top:2px;}
  .card{background:var(--white);border-radius:var(--r-lg);box-shadow:var(--shadow-sm);border:1px solid var(--gray100);}
  .card-pad{padding:20px 24px;}

  /* AI */
  .ai-fab{position:fixed;bottom:28px;right:28px;z-index:50;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--g500),var(--o400));border:none;cursor:pointer;box-shadow:var(--shadow-lg);font-size:26px;display:flex;align-items:center;justify-content:center;transition:transform .15s;}
  .ai-fab:hover{transform:scale(1.08);}
  .ai-panel{position:fixed;bottom:96px;right:28px;z-index:50;width:360px;background:var(--white);border-radius:var(--r-xl);box-shadow:var(--shadow-lg);border:1px solid var(--gray100);display:flex;flex-direction:column;overflow:hidden;max-height:480px;}
  .ai-panel-header{padding:16px 18px;background:linear-gradient(135deg,var(--g500),var(--o400));color:var(--white);display:flex;align-items:center;justify-content:space-between;}
  .ai-panel-title{font-size:14px;font-weight:700;}
  .ai-panel-close{background:none;border:none;color:rgba(255,255,255,.8);cursor:pointer;font-size:18px;}
  .ai-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;}
  .ai-msg{display:flex;gap:8px;}
  .ai-msg.user{flex-direction:row-reverse;}
  .ai-avatar{width:30px;height:30px;min-width:30px;border-radius:50%;background:var(--g100);display:flex;align-items:center;justify-content:center;font-size:14px;}
  .ai-bubble{background:var(--gray100);border-radius:14px;border-top-left-radius:4px;padding:10px 14px;font-size:13px;color:var(--gray700);max-width:80%;line-height:1.5;white-space:pre-wrap;}
  .ai-msg.user .ai-bubble{background:var(--g500);color:var(--white);border-radius:14px;border-top-right-radius:4px;}
  .ai-input-row{padding:12px 14px;border-top:1px solid var(--gray100);display:flex;gap:8px;}
  .ai-input{flex:1;border:1px solid var(--gray200);border-radius:var(--r-md);padding:9px 14px;font-size:13px;font-family:var(--font);outline:none;transition:border-color .15s;}
  .ai-input:focus{border-color:var(--g400);}
  .ai-send{background:var(--g500);color:var(--white);border:none;border-radius:var(--r-md);padding:0 14px;cursor:pointer;font-size:13px;font-weight:600;}
  .ai-send:hover{background:var(--g600);}

  /* Toast */
  .toast{position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:var(--gray900);color:var(--white);padding:12px 20px;border-radius:var(--r-md);font-size:14px;font-weight:500;box-shadow:var(--shadow-lg);z-index:200;animation:fadeUp .3s ease;}
  @keyframes fadeUp{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

  /* Spinner */
  .spinner{width:20px;height:20px;border:2px solid rgba(255,255,255,.3);border-top-color:white;border-radius:50%;animation:spin .7s linear infinite;display:inline-block;}
  @keyframes spin{to{transform:rotate(360deg)}}

  @media(max-width:900px){.sidebar{display:none;}.page{padding:20px 16px;}.stat-grid{grid-template-columns:repeat(2,1fr);}.week-grid{grid-template-columns:repeat(4,1fr);}.ai-panel{width:calc(100vw - 32px);right:16px;}}
  @media(max-width:600px){.recipes-grid{grid-template-columns:1fr;}.pantry-grid{grid-template-columns:repeat(2,1fr);}.week-grid{grid-template-columns:repeat(3,1fr);}.impact-grid{grid-template-columns:1fr 1fr;}}
`;

// ── Helpers ───────────────────────────────────────────────────────────────────
function useToast() {
  const [toast, setToast] = useState(null);
  const show = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2600); };
  return [toast, show];
}

function daysBadgeClass(d) { return d <= 1 ? "days-urgent" : d <= 3 ? "days-soon" : "days-ok"; }
function expiryClass(d) { return d <= 1 ? "urgent" : "soon"; }

// ── Score Ring ────────────────────────────────────────────────────────────────
function ScoreRing({ score }) {
  const r = 70, circ = 2 * Math.PI * r;
  const color = score >= 80 ? "#38a169" : score >= 60 ? "#ed8936" : "#f56565";
  return (
    <div className="score-ring-wrap">
      <svg width="160" height="160" className="score-ring">
        <circle cx="80" cy="80" r={r} fill="none" stroke="#f1f5f9" strokeWidth="12" />
        <circle cx="80" cy="80" r={r} fill="none" stroke={color} strokeWidth="12"
          strokeDasharray={circ} strokeDashoffset={circ * (1 - score / 100)}
          strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s ease" }} />
      </svg>
      <div className="score-center">
        <div className="score-number" style={{ color }}>{score}</div>
        <div className="score-denom">/100</div>
      </div>
    </div>
  );
}

// ── Auth Screen ───────────────────────────────────────────────────────────────
function AuthScreen({ lang, setLang }) {
  const t = T[lang].auth;
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleGoogle() {
    setLoading(true); setError(null);
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) { setError(t.error); setLoading(false); }
  }

  async function handleEmail() {
    if (!email || !password) return;
    setLoading(true); setError(null);
    const fn = mode === "signin" ? supabase.auth.signInWithPassword : supabase.auth.signUp;
    const { error } = await fn.call(supabase.auth, { email, password });
    if (error) { setError(error.message); }
    setLoading(false);
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">🥗</div>
          <div className="auth-logo-name">Smart Pantry Chef</div>
        </div>
        <div className="auth-title">{t.welcome}</div>
        <div className="auth-sub">{t.subtitle}</div>

        {error && <div className="auth-error">⚠️ {error}</div>}

        <button className="auth-google" onClick={handleGoogle} disabled={loading}>
          <span>🇬</span> {t.google}
        </button>

        <div className="auth-divider">
          <div className="auth-divider-line" />
          <div className="auth-divider-text">{t.or}</div>
          <div className="auth-divider-line" />
        </div>

        <div className="auth-field">
          <label className="auth-label">{t.email}</label>
          <input className="auth-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" />
        </div>
        <div className="auth-field">
          <label className="auth-label">{t.password}</label>
          <input className="auth-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === "Enter" && handleEmail()} />
        </div>

        <button className="auth-btn" onClick={handleEmail} disabled={loading}>
          {loading ? <span className="spinner" /> : (mode === "signin" ? t.signin : t.signup)}
        </button>

        <div className="auth-toggle">
          <button onClick={() => setMode(m => m === "signin" ? "signup" : "signin")}>
            {mode === "signin" ? t.toggle_signup : t.toggle_signin}
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button className="lang-btn" style={{ display: "inline-flex", margin: "0 auto" }} onClick={() => setLang(l => l === "pt" ? "en" : "pt")}>
            🌐 {lang === "pt" ? "Switch to English" : "Mudar para PT"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── AI Chat ───────────────────────────────────────────────────────────────────
function AIChat({ lang, pantryItems }) {
  const t = T[lang].ai;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", text: t.greeting }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const pantryContext = pantryItems.length > 0
    ? pantryItems.map(i => `${i.name} (${i.qty} ${i.unit})`).join(", ")
    : (lang === "pt" ? "despensa vazia" : "empty pantry");

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const newMsgs = [...messages, { role: "user", text }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);
    try {
      const system = lang === "pt"
        ? `Você é Chef IA do Smart Pantry Chef. O usuário tem: ${pantryContext}. Sugira receitas práticas com esses ingredientes. Seja animado e use emojis de comida. Máximo 3 receitas por resposta.`
        : `You are AI Chef of Smart Pantry Chef. The user has: ${pantryContext}. Suggest practical recipes using these. Be enthusiastic and use food emojis. Max 3 recipes per answer.`;
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system, messages: newMsgs.map(m => ({ role: m.role, content: m.text })) }),
      });
      const data = await res.json();
      const reply = data.content?.find(b => b.type === "text")?.text || "...";
      setMessages(prev => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: lang === "pt" ? "Erro de conexão. Tente novamente." : "Connection error. Please try again." }]);
    }
    setLoading(false);
  }

  return (
    <>
      <button className="ai-fab" onClick={() => setOpen(o => !o)}>👨‍🍳</button>
      {open && (
        <div className="ai-panel">
          <div className="ai-panel-header">
            <span className="ai-panel-title">👨‍🍳 {t.title}</span>
            <button className="ai-panel-close" onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="ai-messages">
            {messages.map((m, i) => (
              <div key={i} className={`ai-msg ${m.role === "user" ? "user" : ""}`}>
                {m.role === "assistant" && <div className="ai-avatar">👨‍🍳</div>}
                <div className="ai-bubble">{m.text}</div>
                {m.role === "user" && <div className="ai-avatar">🙋</div>}
              </div>
            ))}
            {loading && <div className="ai-msg"><div className="ai-avatar">👨‍🍳</div><div className="ai-bubble" style={{ color: "#94a3b8" }}>{t.thinking}</div></div>}
            <div ref={bottomRef} />
          </div>
          <div className="ai-input-row">
            <input className="ai-input" value={input} placeholder={t.placeholder} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} />
            <button className="ai-send" onClick={send} disabled={loading}>{t.send}</button>
          </div>
        </div>
      )}
    </>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ lang, pantryItems, onNav }) {
  const t = T[lang].dashboard;
  const expiring = pantryItems.filter(i => i.days_left <= 3).sort((a, b) => a.days_left - b.days_left);
  const ready = RECIPES.filter(r => r.match === 100).length;

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">{t.title}</div>
        <div className="page-subtitle">{t.subtitle}</div>
      </div>
      <div className="stat-grid">
        <div className="stat-card"><div className="stat-icon">⚠️</div><div className="stat-label">{t.expiring}</div><div className="stat-number">{expiring.length}</div><span className="stat-badge badge-red">{t.urgent}</span></div>
        <div className="stat-card"><div className="stat-icon">🍳</div><div className="stat-label">{t.recipes_ready}</div><div className="stat-number">{ready}</div><span className="stat-badge badge-green">100% match</span></div>
        <div className="stat-card"><div className="stat-icon">🗄️</div><div className="stat-label">{lang === "pt" ? "Itens na Despensa" : "Pantry Items"}</div><div className="stat-number">{pantryItems.length}</div><span className="stat-badge badge-orange">{lang === "pt" ? "itens" : "items"}</span></div>
        <div className="stat-card"><div className="stat-icon">🌱</div><div className="stat-label">{t.waste_score}</div><div className="stat-number">87</div><span className="stat-badge badge-green">/100</span></div>
      </div>
      {expiring.length > 0 && (
        <div>
          <div className="section-header">
            <div className="section-title">🔥 {t.cook_before}</div>
            <button className="view-all-btn" onClick={() => onNav("pantry")}>{t.view_all} →</button>
          </div>
          <div className="expiry-list">
            {expiring.map(item => (
              <div key={item.id} className={`expiry-item ${expiryClass(item.days_left)}`}>
                <div className="expiry-emoji">{item.emoji}</div>
                <div>
                  <div className="expiry-name">{item.name}</div>
                  <div className={`expiry-days ${expiryClass(item.days_left)}`}>
                    {item.days_left <= 1 ? t.expires_tomorrow : `${t.expires_in} ${item.days_left} ${t.days}`}
                  </div>
                </div>
                <button className="expiry-recipe-btn" onClick={() => onNav("recipes")}>{lang === "pt" ? "Ver receitas" : "Find recipes"} →</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Pantry ────────────────────────────────────────────────────────────────────
function Pantry({ lang, user, items, setItems }) {
  const t = T[lang].pantry;
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, showToast] = useToast();
  const [form, setForm] = useState({ name: "", qty: "1", unit: "un", category: "Fridge", exp: "", emoji: "🥘" });
  const catMap = { 1: "Fridge", 2: "Freezer", 3: "Pantry", 4: "Spices" };

  const filtered = items.filter(i => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = cat === 0 || i.location === catMap[cat];
    return matchSearch && matchCat;
  });

  async function addItem() {
    if (!form.name.trim()) return;
    setSaving(true);
    const newItem = { user_id: user.id, name: form.name, qty: Number(form.qty) || 1, unit: form.unit, location: form.category, category: form.category, days_left: form.exp ? Math.max(0, Math.ceil((new Date(form.exp) - new Date()) / 86400000)) : 14, emoji: form.emoji };
    const { data, error } = await supabase.from("pantry_items").insert(newItem).select().single();
    if (!error && data) { setItems(prev => [data, ...prev]); showToast(`✅ ${form.name} ${lang === "pt" ? "adicionado!" : "added!"}`); }
    else showToast("❌ " + (error?.message || "Error"));
    setShowAdd(false); setSaving(false);
    setForm({ name: "", qty: "1", unit: "un", category: "Fridge", exp: "", emoji: "🥘" });
  }

  async function deleteItem(id) {
    await supabase.from("pantry_items").delete().eq("id", id);
    setItems(prev => prev.filter(i => i.id !== id));
    showToast(lang === "pt" ? "🗑️ Item removido" : "🗑️ Item removed");
  }

  const EMOJIS = ["🥚","🥛","🧀","🍅","🧅","🧄","🍗","🍚","🫘","🥬","🍄","🫙","🥩","🐟","🥕","🌽","🍋","🫐","🧈","🥦"];

  return (
    <div className="page">
      <div className="page-header"><div className="page-title">{t.title}</div><div className="page-subtitle">{t.subtitle}</div></div>
      <div className="pantry-toolbar">
        <input className="search-input" placeholder={t.search} value={search} onChange={e => setSearch(e.target.value)} />
        <button className="btn btn-secondary btn-sm" onClick={() => showToast(lang === "pt" ? "📷 Em breve!" : "📷 Coming soon!")}>{t.import_receipt}</button>
        <button className="btn btn-secondary btn-sm" onClick={() => showToast(lang === "pt" ? "🎙️ Em breve!" : "🎙️ Coming soon!")}>{t.voice}</button>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>+ {t.add}</button>
      </div>
      <div className="cat-tabs">{t.categories.map((c, i) => <button key={i} className={`cat-tab ${cat === i ? "active" : ""}`} onClick={() => setCat(i)}>{c}</button>)}</div>

      {filtered.length === 0 ? (
        <div className="empty-state"><div className="empty-state-emoji">🗄️</div><div className="empty-state-text">{t.empty}</div></div>
      ) : (
        <div className="pantry-grid">
          {filtered.map(item => (
            <div key={item.id} className="pantry-card">
              <button className="delete-btn" onClick={() => deleteItem(item.id)}>✕</button>
              <div className="pantry-card-top">
                <div className="pantry-emoji-circle">{item.emoji}</div>
                <span className={`days-badge ${daysBadgeClass(item.days_left)}`}>{item.days_left <= 1 ? (lang === "pt" ? "Amanhã!" : "Tomorrow!") : `${item.days_left}d`}</span>
              </div>
              <div className="pantry-name">{item.name}</div>
              <div className="pantry-details">
                <div className="pantry-detail-item">{t.qty}: <span>{item.qty} {item.unit}</span></div>
                <div className="pantry-detail-item">{t.location}: <span>{item.location}</span></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAdd && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowAdd(false)}>
          <div className="modal">
            <div className="modal-header">
              <div><div className="modal-title">{t.add_modal_title}</div></div>
              <button className="modal-close" onClick={() => setShowAdd(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">{lang === "pt" ? "Emoji" : "Emoji"}</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {EMOJIS.map(e => <button key={e} onClick={() => setForm(f => ({ ...f, emoji: e }))} style={{ fontSize: 22, background: form.emoji === e ? "var(--g100)" : "var(--gray50)", border: form.emoji === e ? "2px solid var(--g500)" : "1px solid var(--gray200)", borderRadius: 8, padding: "4px 8px", cursor: "pointer" }}>{e}</button>)}
                </div>
              </div>
              <div className="form-group"><label className="form-label">{t.name}</label><input className="form-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder={lang === "pt" ? "Ex: Ovos" : "Ex: Eggs"} /></div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">{t.quantity}</label><input className="form-input" type="number" value={form.qty} onChange={e => setForm(f => ({ ...f, qty: e.target.value }))} /></div>
                <div className="form-group"><label className="form-label">{t.unit}</label><select className="form-input" value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))}><option>un</option><option>g</option><option>kg</option><option>ml</option><option>L</option></select></div>
              </div>
              <div className="form-group"><label className="form-label">{t.category}</label><select className="form-input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}><option>Fridge</option><option>Freezer</option><option>Pantry</option><option>Spices</option></select></div>
              <div className="form-group"><label className="form-label">{t.exp_date}</label><input className="form-input" type="date" value={form.exp} onChange={e => setForm(f => ({ ...f, exp: e.target.value }))} /></div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowAdd(false)}>{t.cancel}</button>
              <button className="btn btn-primary" onClick={addItem} disabled={saving}>{saving ? <span className="spinner" /> : t.save}</button>
            </div>
          </div>
        </div>
      )}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

// ── Recipes ───────────────────────────────────────────────────────────────────
function Recipes({ lang }) {
  const t = T[lang].recipes;
  const [tab, setTab] = useState("all");
  const [selected, setSelected] = useState(null);
  const [toast, showToast] = useToast();
  const tabs = [{ key: "all", label: lang === "pt" ? "Todas" : "All", count: RECIPES.length }, { key: "100", label: t.can_cook, count: RECIPES.filter(r => r.match === 100).length }, { key: "95", label: t.almost, count: RECIPES.filter(r => r.match >= 85 && r.match < 100).length }, { key: "70", label: t.shopping_needed, count: RECIPES.filter(r => r.match < 85).length }];
  const filtered = RECIPES.filter(r => tab === "all" ? true : tab === "100" ? r.match === 100 : tab === "95" ? r.match >= 85 && r.match < 100 : r.match < 85);

  return (
    <div className="page">
      <div className="page-header"><div className="page-title">{t.title}</div><div className="page-subtitle">{t.subtitle}</div></div>
      <div className="recipe-tabs">{tabs.map(tb => <button key={tb.key} className={`recipe-tab ${tab === tb.key ? "active" : ""}`} onClick={() => setTab(tb.key)}>{tb.label} <span className="recipe-count">{tb.count}</span></button>)}</div>
      <div className="recipes-grid">
        {filtered.map(recipe => (
          <div key={recipe.id} className="recipe-card" onClick={() => setSelected(recipe)}>
            <div className={`recipe-banner recipe-banner-${recipe.match}`}><span style={{ fontSize: 52 }}>{recipe.emoji}</span><span className={`match-pill match-${recipe.match}`}>{recipe.match}% {t.match}</span></div>
            <div className="recipe-body">
              <div className="recipe-title">{recipe.title}</div>
              <div className="recipe-desc">{recipe.description}</div>
              <div className="recipe-meta"><span>⏱ {recipe.time} {t.minutes}</span><span>👤 {recipe.servings} {t.servings}</span><span>⭐ {t.difficulty[recipe.difficulty]}</span></div>
              {recipe.missing.length > 0 && <div className="recipe-missing"><div className="recipe-missing-title">⚠️ {t.missing} {recipe.missing.length}:</div><div className="recipe-missing-items">{recipe.missing.join(", ")}</div></div>}
              <div className="recipe-actions">
                <button className="btn btn-primary btn-sm" onClick={e => { e.stopPropagation(); setSelected(recipe); }}>{t.cook_now}</button>
                <button className="btn btn-secondary btn-sm" onClick={e => { e.stopPropagation(); showToast(`❤️ ${recipe.title} ${lang === "pt" ? "salva!" : "saved!"}`); }}>♡ {t.save}</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setSelected(null)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-emoji">{selected.emoji}</div>
              <div><div className="modal-title">{selected.title}</div><div className="modal-subtitle">{selected.cuisine} · {selected.time} {t.minutes}</div></div>
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <div className="modal-section-title">{lang === "pt" ? "Nutrição" : "Nutrition"}</div>
                <div className="nutrition-grid">
                  <div className="nutrition-item"><div className="nutrition-value">{selected.calories}</div><div className="nutrition-label">kcal</div></div>
                  <div className="nutrition-item"><div className="nutrition-value">{selected.protein}g</div><div className="nutrition-label">{lang === "pt" ? "Proteína" : "Protein"}</div></div>
                  <div className="nutrition-item"><div className="nutrition-value">{selected.servings}</div><div className="nutrition-label">{t.servings}</div></div>
                </div>
              </div>
              <div className="modal-section">
                <div className="modal-section-title">{lang === "pt" ? "Modo de Preparo" : "Instructions"}</div>
                <div className="steps-list">{selected.steps.map((s, i) => <div key={i} className="step-item"><div className="step-num">{i + 1}</div><div className="step-text">{s}</div></div>)}</div>
              </div>
              <div className="modal-section">
                <div className="modal-section-title">{lang === "pt" ? "Vídeo da Receita" : "Recipe Video"}</div>
                <div className="video-card" onClick={() => showToast("🎥 YouTube...")}>
                  <div className="video-thumb">▶️</div>
                  <div><div className="video-title">{selected.title}</div><div className="video-meta">📺 {selected.videoChannel} · {selected.videoDuration} · 👁 {selected.videoViews}</div><div style={{ marginTop: 6 }}><span style={{ fontSize: 12, color: "var(--g600)", fontWeight: 700 }}>{t.watch_video}</span></div></div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelected(null)}>{lang === "pt" ? "Fechar" : "Close"}</button>
              <button className="btn btn-primary">{t.cook_now} 👨‍🍳</button>
            </div>
          </div>
        </div>
      )}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

// ── Shopping ──────────────────────────────────────────────────────────────────
function Shopping({ lang, user }) {
  const t = T[lang].shopping;
  const [items, setItems] = useState([]);
  const [toast, showToast] = useToast();
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    if (!user) return;
    supabase.from("shopping_items").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => { if (data) setItems(data); });
  }, [user]);

  async function toggle(id, checked) {
    await supabase.from("shopping_items").update({ checked: !checked }).eq("id", id);
    setItems(prev => prev.map(i => i.id === id ? { ...i, checked: !i.checked } : i));
  }

  async function addItem() {
    if (!newItem.trim()) return;
    const item = { user_id: user.id, name: newItem, qty: "1 un", category: "General", checked: false, price: 0 };
    const { data } = await supabase.from("shopping_items").insert(item).select().single();
    if (data) { setItems(prev => [data, ...prev]); setNewItem(""); }
  }

  async function clearChecked() {
    const ids = items.filter(i => i.checked).map(i => i.id);
    if (!ids.length) return;
    await supabase.from("shopping_items").delete().in("id", ids);
    setItems(prev => prev.filter(i => !i.checked));
    showToast(lang === "pt" ? "✅ Itens marcados removidos!" : "✅ Checked items removed!");
  }

  const total = items.filter(i => !i.checked).reduce((s, i) => s + (i.price || 0), 0).toFixed(2);

  return (
    <div className="page">
      <div className="page-header"><div className="page-title">{t.title}</div><div className="page-subtitle">{t.subtitle} — {items.filter(i => !i.checked).length} {t.items}</div></div>
      <div className="shopping-toolbar">
        <input className="search-input" placeholder={lang === "pt" ? "Adicionar item..." : "Add item..."} value={newItem} onChange={e => setNewItem(e.target.value)} onKeyDown={e => e.key === "Enter" && addItem()} style={{ flex: 1 }} />
        <button className="btn btn-primary" onClick={addItem}>+ {t.add_item}</button>
        <button className="btn btn-secondary" onClick={clearChecked}>🗑 {t.clear}</button>
      </div>
      {items.length === 0 ? (
        <div className="empty-state"><div className="empty-state-emoji">🛒</div><div className="empty-state-text">{t.empty}</div></div>
      ) : (
        <div className="shopping-list-items">
          {items.map(item => (
            <div key={item.id} className={`shopping-item ${item.checked ? "checked" : ""}`}>
              <div className={`checkbox ${item.checked ? "checked" : ""}`} onClick={() => toggle(item.id, item.checked)}>{item.checked && <span style={{ color: "white", fontSize: 13 }}>✓</span>}</div>
              <div><div className="shopping-name" style={{ textDecoration: item.checked ? "line-through" : "none" }}>{item.name}</div><div className="shopping-qty">{item.qty}</div></div>
              <div className="shopping-category">{item.category}</div>
              {item.price > 0 && <div className="shopping-price">R$ {item.price.toFixed(2)}</div>}
            </div>
          ))}
        </div>
      )}
      {items.length > 0 && <div className="shopping-total"><div className="shopping-total-label">💰 {t.total_est}</div><div className="shopping-total-value">R$ {total}</div></div>}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

// ── Meal Planner ──────────────────────────────────────────────────────────────
function MealPlanner({ lang }) {
  const t = T[lang].planner;
  const [toast, showToast] = useToast();
  const days = lang === "pt" ? WEEK_DAYS_PT : WEEK_DAYS;
  const meals = [{ key: "breakfast", label: t.breakfast, emoji: "☀️" }, { key: "lunch", label: t.lunch, emoji: "🌤" }, { key: "dinner", label: t.dinner, emoji: "🌙" }, { key: "snack", label: t.snack, emoji: "🍎" }];
  return (
    <div className="page">
      <div className="page-header"><div className="page-title">{t.title}</div><div className="page-subtitle">{t.subtitle}</div></div>
      <div className="week-grid">
        {WEEK_DAYS.map((dk, di) => (
          <div key={dk} className="day-col">
            <div className={`day-label ${di === 0 ? "today" : ""}`}>{days[di]}</div>
            {meals.map(meal => {
              const planned = MEAL_PLAN[dk]?.[meal.key];
              return (
                <div key={meal.key}>
                  <div className="meal-type-label">{meal.emoji} {meal.label}</div>
                  {planned ? <div className="meal-slot">{planned}</div> : <div className="meal-slot empty" onClick={() => showToast(`➕ ${meal.label}`)}>+</div>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

// ── Waste Score ───────────────────────────────────────────────────────────────
function WasteScore({ lang }) {
  const t = T[lang].waste;
  const score = 87;
  return (
    <div className="page">
      <div className="page-header"><div className="page-title">{t.title}</div><div className="page-subtitle">{t.subtitle}</div></div>
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="score-hero">
          <ScoreRing score={score} />
          <div className="score-label">{t.score_label}</div>
          <div className="score-message">{t.excellent}</div>
        </div>
      </div>
      <div style={{ fontWeight: 700, fontSize: 16, color: "var(--gray800)", marginBottom: 14 }}>📊 {t.this_month}</div>
      <div className="impact-grid">
        {[{ emoji: "💰", value: "R$ 87,50", label: t.money_saved }, { emoji: "🦸", value: "14", label: t.rescued }, { emoji: "👨‍🍳", value: "23", label: t.cooked }, { emoji: "🌱", value: "2.3 kg", label: t.reduction }].map((item, i) => (
          <div key={i} className="impact-card"><div className="impact-emoji">{item.emoji}</div><div className="impact-value">{item.value}</div><div className="impact-label">{item.label}</div></div>
        ))}
      </div>
      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-pad">
          <div style={{ fontWeight: 700, color: "var(--gray700)", marginBottom: 12 }}>📈 {lang === "pt" ? "Histórico Mensal" : "Monthly History"}</div>
          {["Jan","Feb","Mar","Apr","May","Jun"].map((m, i) => {
            const v = [62,68,74,79,83,87][i];
            return (
              <div key={m} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div style={{ width: 32, fontSize: 12, color: "var(--gray400)", fontWeight: 600 }}>{m}</div>
                <div style={{ flex: 1, background: "var(--gray100)", borderRadius: 6, height: 10, overflow: "hidden" }}>
                  <div style={{ width: `${v}%`, height: "100%", background: `hsl(${100 + v},60%,45%)`, borderRadius: 6 }} />
                </div>
                <div style={{ width: 32, fontSize: 12, fontWeight: 700, color: "var(--gray700)" }}>{v}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── App Shell ─────────────────────────────────────────────────────────────────
export default function App() {
  const [session, setSession] = useState(undefined);
  const [lang, setLang] = useState("pt");
  const [page, setPage] = useState("dashboard");
  const [pantryItems, setPantryItems] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session?.user) return;
    supabase.from("pantry_items").select("*").eq("user_id", session.user.id).order("days_left", { ascending: true })
      .then(({ data }) => { if (data) setPantryItems(data); });
  }, [session]);

  if (session === undefined) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--gray50)", fontFamily: "var(--font)" }}><div style={{ textAlign: "center" }}><div style={{ fontSize: 48, marginBottom: 16 }}>🥗</div><div style={{ color: "var(--gray400)" }}>Carregando…</div></div></div>;
  if (!session) return <AuthScreen lang={lang} setLang={setLang} />;

  const t = T[lang];
  const navItems = [
    { key: "dashboard", emoji: "🏠", label: t.nav.dashboard },
    { key: "pantry", emoji: "🗄️", label: t.nav.pantry },
    { key: "recipes", emoji: "🍳", label: t.nav.recipes },
    { key: "shopping", emoji: "🛒", label: t.nav.shopping },
    { key: "planner", emoji: "📅", label: t.nav.planner },
    { key: "waste", emoji: "🌱", label: t.nav.waste },
  ];

  const pages = {
    dashboard: <Dashboard lang={lang} pantryItems={pantryItems} onNav={setPage} />,
    pantry: <Pantry lang={lang} user={session.user} items={pantryItems} setItems={setPantryItems} />,
    recipes: <Recipes lang={lang} />,
    shopping: <Shopping lang={lang} user={session.user} />,
    planner: <MealPlanner lang={lang} />,
    waste: <WasteScore lang={lang} />,
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="app-shell">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-mark">
              <div className="logo-icon">🥗</div>
              <div><div className="logo-text">Smart Pantry</div><div className="logo-sub">Chef</div></div>
            </div>
          </div>
          <nav className="nav-section">
            {navItems.map(item => (
              <button key={item.key} className={`nav-item ${page === item.key ? "active" : ""}`} onClick={() => setPage(item.key)}>
                <span className="nav-emoji">{item.emoji}</span>{item.label}
              </button>
            ))}
          </nav>
          <div className="sidebar-footer">
            <div style={{ fontSize: 11, color: "var(--gray400)", padding: "0 12px 4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {session.user.email}
            </div>
            <button className="lang-btn" onClick={() => setLang(l => l === "pt" ? "en" : "pt")}>
              🌐 {t.lang === "EN" ? "Switch to EN" : "Mudar para PT"}
            </button>
            <button className="signout-btn" onClick={() => supabase.auth.signOut()}>
              🚪 {t.signout}
            </button>
          </div>
        </aside>
        <main className="main-content">{pages[page]}</main>
      </div>
      <AIChat lang={lang} pantryItems={pantryItems} />
    </>
  );
}
