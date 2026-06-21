import { useState, useEffect, useRef } from "react";

// ── Language strings ──────────────────────────────────────────────────────────
const T = {
  en: {
    appName: "Smart Pantry Chef",
    tagline: "Transform Your Pantry Into Meals",
    nav: {
      dashboard: "Dashboard",
      pantry: "My Pantry",
      recipes: "Recipes",
      shopping: "Shopping",
      planner: "Meal Planner",
      waste: "Waste Score",
    },
    dashboard: {
      title: "Good morning! 👋",
      subtitle: "Here's what's happening in your kitchen today.",
      expiring: "Expiring Soon",
      recipes_ready: "Recipes Ready",
      pantry_value: "Pantry Value",
      waste_score: "Waste Score",
      urgent: "Urgent",
      cook_before: "Cook Before They Expire",
      view_all: "View All",
      days: "days",
      expires_tomorrow: "Expires tomorrow",
      expires_in: "Expires in",
    },
    pantry: {
      title: "My Pantry",
      subtitle: "Track everything you have at home",
      add: "Add Item",
      search: "Search ingredients…",
      categories: ["All", "Fridge", "Freezer", "Pantry", "Spices"],
      expires: "Expires",
      qty: "Qty",
      location: "Location",
      add_modal_title: "Add Ingredient",
      name: "Name",
      quantity: "Quantity",
      unit: "Unit",
      category: "Category",
      exp_date: "Expiration Date",
      save: "Save",
      cancel: "Cancel",
      import_receipt: "📷 Scan Receipt",
      voice: "🎙️ Voice Input",
      barcode: "📊 Barcode",
    },
    recipes: {
      title: "Recipes For You",
      subtitle: "Based on what you already have",
      can_cook: "Can Cook Now",
      almost: "Almost Ready",
      shopping_needed: "Need Shopping",
      match: "match",
      missing: "Missing",
      ingredients: "ingredients",
      minutes: "min",
      servings: "servings",
      difficulty: ["Easy", "Medium", "Hard"],
      filter_cuisine: "Cuisine",
      filter_time: "Time",
      filter_diet: "Diet",
      watch_video: "▶ Watch Recipe Video",
      cook_now: "Start Cooking",
      save: "Save Recipe",
    },
    shopping: {
      title: "Shopping List",
      subtitle: "What you need to buy",
      add_item: "Add Item",
      clear: "Clear All",
      generate: "Generate From Recipe",
      organize: "Organize by Category",
      total_est: "Estimated Total",
      items: "items",
    },
    planner: {
      title: "Meal Planner",
      subtitle: "Plan your week ahead",
      today: "Today",
      week: "This Week",
      month: "Month View",
      add_meal: "+ Add Meal",
      breakfast: "Breakfast",
      lunch: "Lunch",
      dinner: "Dinner",
      snack: "Snack",
    },
    waste: {
      title: "Food Waste Score",
      subtitle: "Track your impact on the environment & wallet",
      score_label: "Your Score",
      this_month: "This Month",
      money_saved: "Money Saved",
      rescued: "Items Rescued",
      cooked: "Recipes Cooked",
      reduction: "Waste Reduced",
      excellent: "Excellent! Keep it up 🌱",
      good: "Good job! Small improvements ahead 👍",
      average: "Room to improve — let's reduce waste 💪",
    },
    ai: {
      title: "AI Chef Assistant",
      placeholder: "Tell me what you have and I'll suggest recipes…",
      send: "Ask",
      thinking: "Thinking…",
      greeting: "Hi! I'm your AI Chef. Tell me what ingredients you have at home and I'll suggest the best recipes for you!",
    },
    lang: "PT",
  },
  pt: {
    appName: "Smart Pantry Chef",
    tagline: "Transforme Sua Despensa em Refeições",
    nav: {
      dashboard: "Início",
      pantry: "Minha Despensa",
      recipes: "Receitas",
      shopping: "Compras",
      planner: "Cardápio",
      waste: "Desperdício",
    },
    dashboard: {
      title: "Bom dia! 👋",
      subtitle: "Veja o que está acontecendo na sua cozinha hoje.",
      expiring: "Vencendo em Breve",
      recipes_ready: "Receitas Prontas",
      pantry_value: "Valor da Despensa",
      waste_score: "Score de Desperdício",
      urgent: "Urgente",
      cook_before: "Cozinhe Antes que Vença",
      view_all: "Ver Tudo",
      days: "dias",
      expires_tomorrow: "Vence amanhã",
      expires_in: "Vence em",
    },
    pantry: {
      title: "Minha Despensa",
      subtitle: "Acompanhe tudo que você tem em casa",
      add: "Adicionar",
      search: "Buscar ingredientes…",
      categories: ["Todos", "Geladeira", "Freezer", "Despensa", "Temperos"],
      expires: "Vence",
      qty: "Qtd",
      location: "Local",
      add_modal_title: "Adicionar Ingrediente",
      name: "Nome",
      quantity: "Quantidade",
      unit: "Unidade",
      category: "Categoria",
      exp_date: "Data de Validade",
      save: "Salvar",
      cancel: "Cancelar",
      import_receipt: "📷 Escanear Nota",
      voice: "🎙️ Voz",
      barcode: "📊 Código de Barras",
    },
    recipes: {
      title: "Receitas Para Você",
      subtitle: "Com base no que você já tem",
      can_cook: "Pode Cozinhar Agora",
      almost: "Quase Pronto",
      shopping_needed: "Precisa Comprar",
      match: "compatível",
      missing: "Faltando",
      ingredients: "ingredientes",
      minutes: "min",
      servings: "porções",
      difficulty: ["Fácil", "Médio", "Difícil"],
      filter_cuisine: "Culinária",
      filter_time: "Tempo",
      filter_diet: "Dieta",
      watch_video: "▶ Ver Vídeo da Receita",
      cook_now: "Começar a Cozinhar",
      save: "Salvar Receita",
    },
    shopping: {
      title: "Lista de Compras",
      subtitle: "O que você precisa comprar",
      add_item: "Adicionar Item",
      clear: "Limpar Tudo",
      generate: "Gerar da Receita",
      organize: "Organizar por Categoria",
      total_est: "Total Estimado",
      items: "itens",
    },
    planner: {
      title: "Cardápio Semanal",
      subtitle: "Planeje sua semana com antecedência",
      today: "Hoje",
      week: "Esta Semana",
      month: "Mês",
      add_meal: "+ Adicionar",
      breakfast: "Café da manhã",
      lunch: "Almoço",
      dinner: "Jantar",
      snack: "Lanche",
    },
    waste: {
      title: "Score de Desperdício",
      subtitle: "Acompanhe seu impacto no ambiente e na carteira",
      score_label: "Seu Score",
      this_month: "Este Mês",
      money_saved: "Dinheiro Economizado",
      rescued: "Itens Resgatados",
      cooked: "Receitas Cozidas",
      reduction: "Desperdício Evitado",
      excellent: "Excelente! Continue assim 🌱",
      good: "Bom trabalho! Pequenas melhorias à frente 👍",
      average: "Dá para melhorar — vamos reduzir o desperdício 💪",
    },
    ai: {
      title: "Assistente Chef IA",
      placeholder: "Me diga o que você tem e eu sugiro receitas…",
      send: "Perguntar",
      thinking: "Pensando…",
      greeting: "Olá! Sou seu Chef IA. Me diga quais ingredientes você tem em casa e eu sugiro as melhores receitas!",
    },
    lang: "EN",
  },
};

// ── Mock Data ─────────────────────────────────────────────────────────────────
const PANTRY_ITEMS = [
  { id: 1, name: "Ovos / Eggs", qty: 12, unit: "un", location: "Fridge", category: "Proteínas", daysLeft: 10, emoji: "🥚" },
  { id: 2, name: "Leite / Milk", qty: 1, unit: "L", location: "Fridge", category: "Laticínios", daysLeft: 2, emoji: "🥛" },
  { id: 3, name: "Mussarela / Mozzarella", qty: 500, unit: "g", location: "Fridge", category: "Laticínios", daysLeft: 5, emoji: "🧀" },
  { id: 4, name: "Tomate / Tomato", qty: 3, unit: "un", location: "Fridge", category: "Vegetais", daysLeft: 3, emoji: "🍅" },
  { id: 5, name: "Cebola / Onion", qty: 2, unit: "un", location: "Pantry", category: "Vegetais", daysLeft: 21, emoji: "🧅" },
  { id: 6, name: "Alho / Garlic", qty: 1, unit: "cabeça", location: "Pantry", category: "Temperos", daysLeft: 30, emoji: "🧄" },
  { id: 7, name: "Frango / Chicken", qty: 600, unit: "g", location: "Freezer", category: "Proteínas", daysLeft: 60, emoji: "🍗" },
  { id: 8, name: "Arroz / Rice", qty: 2, unit: "kg", location: "Pantry", category: "Grãos", daysLeft: 180, emoji: "🍚" },
  { id: 9, name: "Feijão / Beans", qty: 1, unit: "kg", location: "Pantry", category: "Grãos", daysLeft: 180, emoji: "🫘" },
  { id: 10, name: "Espinafre / Spinach", qty: 200, unit: "g", location: "Fridge", category: "Vegetais", daysLeft: 1, emoji: "🥬" },
  { id: 11, name: "Cogumelos / Mushrooms", qty: 250, unit: "g", location: "Fridge", category: "Vegetais", daysLeft: 2, emoji: "🍄" },
  { id: 12, name: "Azeite / Olive Oil", qty: 500, unit: "ml", location: "Pantry", category: "Óleos", daysLeft: 365, emoji: "🫙" },
];

const RECIPES = [
  {
    id: 1,
    title: "Omelete de Queijo / Cheese Omelette",
    cuisine: "Brazilian",
    time: 15,
    servings: 2,
    difficulty: 0,
    match: 100,
    missing: [],
    calories: 320,
    protein: 24,
    category: "Breakfast",
    emoji: "🍳",
    description: "Fluffy omelette packed with melted mozzarella and fresh herbs.",
    ingredients: ["Eggs", "Mozzarella", "Salt", "Olive Oil"],
    steps: [
      "Beat 3 eggs with a pinch of salt.",
      "Heat olive oil in a non-stick pan over medium heat.",
      "Pour eggs and cook until edges are set.",
      "Add mozzarella, fold and serve."
    ],
    videoThumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    videoChannel: "Chef João",
    videoDuration: "8:32",
    videoViews: "2.4M",
  },
  {
    id: 2,
    title: "Risoto de Cogumelos / Mushroom Risotto",
    cuisine: "Italian",
    time: 35,
    servings: 4,
    difficulty: 1,
    match: 85,
    missing: ["Arborio Rice", "White Wine"],
    calories: 480,
    protein: 12,
    category: "Dinner",
    emoji: "🍲",
    description: "Creamy Italian risotto with sautéed mushrooms and parmesan.",
    ingredients: ["Mushrooms", "Onion", "Garlic", "Olive Oil", "Butter", "Parmesan"],
    steps: [
      "Sauté onion and garlic in olive oil.",
      "Add mushrooms and cook until golden.",
      "Add arborio rice and toast for 2 min.",
      "Gradually add warm broth, stirring constantly.",
      "Finish with butter and parmesan."
    ],
    videoThumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    videoChannel: "Cucina Italia",
    videoDuration: "12:15",
    videoViews: "890K",
  },
  {
    id: 3,
    title: "Frango ao Alho / Garlic Chicken",
    cuisine: "Brazilian",
    time: 45,
    servings: 4,
    difficulty: 1,
    match: 95,
    missing: ["Lemon"],
    calories: 520,
    protein: 48,
    category: "Dinner",
    emoji: "🍗",
    description: "Juicy chicken breast with crispy garlic crust and herbs.",
    ingredients: ["Chicken", "Garlic", "Olive Oil", "Salt", "Pepper"],
    steps: [
      "Season chicken with salt, pepper and minced garlic.",
      "Marinate for 30 min.",
      "Sear in olive oil on high heat 4 min each side.",
      "Finish in oven at 180°C for 15 min."
    ],
    videoThumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    videoChannel: "Sabores do Brasil",
    videoDuration: "18:40",
    videoViews: "3.1M",
  },
  {
    id: 4,
    title: "Arroz com Feijão / Rice & Beans",
    cuisine: "Brazilian",
    time: 40,
    servings: 6,
    difficulty: 0,
    match: 100,
    missing: [],
    calories: 380,
    protein: 14,
    category: "Lunch",
    emoji: "🍚",
    description: "The classic Brazilian comfort food duo, perfectly seasoned.",
    ingredients: ["Rice", "Beans", "Garlic", "Onion", "Olive Oil"],
    steps: [
      "Cook beans in pressure cooker for 20 min.",
      "Sauté garlic and onion in oil.",
      "Add beans and season to taste.",
      "Cook rice separately and serve together."
    ],
    videoThumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    videoChannel: "Receitas Brasileiras",
    videoDuration: "22:10",
    videoViews: "5.7M",
  },
  {
    id: 5,
    title: "Salada Caprese / Caprese Salad",
    cuisine: "Italian",
    time: 10,
    servings: 2,
    difficulty: 0,
    match: 100,
    missing: [],
    calories: 220,
    protein: 14,
    category: "Lunch",
    emoji: "🥗",
    description: "Fresh tomato and mozzarella with basil and olive oil drizzle.",
    ingredients: ["Tomato", "Mozzarella", "Olive Oil", "Salt"],
    steps: [
      "Slice tomatoes and mozzarella evenly.",
      "Layer alternating on a plate.",
      "Drizzle with olive oil.",
      "Season with salt and add fresh basil."
    ],
    videoThumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    videoChannel: "Italian Kitchen",
    videoDuration: "6:20",
    videoViews: "1.2M",
  },
  {
    id: 6,
    title: "Macarrão ao Sugo / Tomato Pasta",
    cuisine: "Italian",
    time: 25,
    servings: 4,
    difficulty: 0,
    match: 70,
    missing: ["Pasta", "Basil"],
    calories: 420,
    protein: 16,
    category: "Dinner",
    emoji: "🍝",
    description: "Simple classic tomato sauce pasta with garlic and fresh herbs.",
    ingredients: ["Pasta", "Tomato", "Garlic", "Onion", "Olive Oil"],
    steps: [
      "Cook pasta in salted boiling water.",
      "Sauté garlic and onion in olive oil.",
      "Add crushed tomatoes and simmer 15 min.",
      "Toss pasta in sauce and serve with parmesan."
    ],
    videoThumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    videoChannel: "Pasta Masters",
    videoDuration: "14:55",
    videoViews: "4.3M",
  },
];

const SHOPPING_LIST = [
  { id: 1, name: "Arborio Rice", qty: "500g", category: "Grains", checked: false, price: 8.90 },
  { id: 2, name: "White Wine", qty: "1 bottle", category: "Drinks", checked: false, price: 22.00 },
  { id: 3, name: "Lemon", qty: "3 un", category: "Fruits", checked: true, price: 3.50 },
  { id: 4, name: "Pasta", qty: "500g", category: "Grains", checked: false, price: 5.90 },
  { id: 5, name: "Basil", qty: "1 bunch", category: "Herbs", checked: false, price: 4.00 },
  { id: 6, name: "Butter", qty: "200g", category: "Dairy", checked: false, price: 9.50 },
];

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const WEEK_DAYS_PT = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const MEAL_PLAN = {
  Mon: { breakfast: "Cheese Omelette 🍳", lunch: "Rice & Beans 🍚", dinner: null, snack: null },
  Tue: { breakfast: null, lunch: "Caprese Salad 🥗", dinner: "Garlic Chicken 🍗", snack: null },
  Wed: { breakfast: null, lunch: null, dinner: "Mushroom Risotto 🍲", snack: null },
  Thu: { breakfast: "Cheese Omelette 🍳", lunch: "Rice & Beans 🍚", dinner: null, snack: null },
  Fri: { breakfast: null, lunch: null, dinner: "Tomato Pasta 🍝", snack: null },
  Sat: { breakfast: null, lunch: "Caprese Salad 🥗", dinner: "Garlic Chicken 🍗", snack: null },
  Sun: { breakfast: null, lunch: "Rice & Beans 🍚", dinner: null, snack: null },
};

// ── Color / Token System ──────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,600;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green-50: #f0faf4;
    --green-100: #dcf4e6;
    --green-400: #48bb78;
    --green-500: #38a169;
    --green-600: #2f855a;
    --orange-100: #fff3e0;
    --orange-400: #f6a623;
    --orange-500: #ed8936;
    --orange-600: #dd6b20;
    --red-100: #fff5f5;
    --red-400: #f56565;
    --red-500: #e53e3e;
    --gray-50: #f8fafc;
    --gray-100: #f1f5f9;
    --gray-200: #e2e8f0;
    --gray-300: #cbd5e1;
    --gray-400: #94a3b8;
    --gray-500: #64748b;
    --gray-600: #475569;
    --gray-700: #334155;
    --gray-800: #1e293b;
    --gray-900: #0f172a;
    --white: #ffffff;
    --shadow-sm: 0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04);
    --shadow-md: 0 4px 12px rgba(0,0,0,.08), 0 2px 6px rgba(0,0,0,.05);
    --shadow-lg: 0 10px 30px rgba(0,0,0,.10), 0 4px 10px rgba(0,0,0,.06);
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 18px;
    --radius-xl: 24px;
    --font-body: 'Plus Jakarta Sans', system-ui, sans-serif;
    --font-display: 'Lora', Georgia, serif;
  }

  html, body { height: 100%; font-family: var(--font-body); background: var(--gray-50); color: var(--gray-800); }
  #root { height: 100%; }

  /* ── Layout ── */
  .app-shell { display: flex; height: 100vh; overflow: hidden; }

  .sidebar {
    width: 240px; min-width: 240px; background: var(--white);
    border-right: 1px solid var(--gray-100);
    display: flex; flex-direction: column;
    padding: 0 0 24px; box-shadow: var(--shadow-sm);
    z-index: 10;
  }
  .sidebar-logo {
    padding: 28px 24px 20px;
    border-bottom: 1px solid var(--gray-100);
  }
  .logo-mark { display: flex; align-items: center; gap: 10px; }
  .logo-icon {
    width: 38px; height: 38px; background: linear-gradient(135deg, var(--green-500), var(--orange-400));
    border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px;
  }
  .logo-text { font-size: 14px; font-weight: 700; color: var(--gray-800); line-height: 1.2; }
  .logo-sub { font-size: 11px; color: var(--gray-400); font-weight: 400; }

  .nav-section { padding: 16px 12px 0; flex: 1; }
  .nav-item {
    display: flex; align-items: center; gap: 10px; padding: 10px 12px;
    border-radius: var(--radius-sm); cursor: pointer; margin-bottom: 2px;
    transition: all .15s; font-size: 13.5px; font-weight: 500; color: var(--gray-600);
    border: none; background: none; width: 100%; text-align: left;
  }
  .nav-item:hover { background: var(--gray-50); color: var(--gray-800); }
  .nav-item.active { background: var(--green-50); color: var(--green-600); font-weight: 600; }
  .nav-item .nav-emoji { font-size: 16px; width: 20px; text-align: center; }

  .lang-btn {
    margin: 0 12px; padding: 8px 12px; border-radius: var(--radius-sm);
    border: 1px solid var(--gray-200); background: var(--white); cursor: pointer;
    font-size: 12px; font-weight: 600; color: var(--gray-500);
    transition: all .15s; display: flex; align-items: center; gap: 6px;
  }
  .lang-btn:hover { border-color: var(--green-400); color: var(--green-600); }

  .main-content { flex: 1; overflow-y: auto; background: var(--gray-50); }
  .page { padding: 32px 36px; max-width: 1100px; }

  .page-header { margin-bottom: 28px; }
  .page-title { font-family: var(--font-display); font-size: 26px; font-weight: 600; color: var(--gray-900); }
  .page-subtitle { font-size: 14px; color: var(--gray-400); margin-top: 4px; }

  /* ── Cards ── */
  .card {
    background: var(--white); border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm); border: 1px solid var(--gray-100);
    overflow: hidden;
  }
  .card-pad { padding: 20px 24px; }
  .card-title { font-size: 14px; font-weight: 600; color: var(--gray-700); margin-bottom: 4px; }
  .card-value { font-size: 28px; font-weight: 800; color: var(--gray-900); }
  .card-sub { font-size: 12px; color: var(--gray-400); margin-top: 2px; }

  /* ── Stat Grid ── */
  .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
  .stat-card { background: var(--white); border-radius: var(--radius-lg); padding: 20px 24px; border: 1px solid var(--gray-100); box-shadow: var(--shadow-sm); }
  .stat-icon { font-size: 22px; margin-bottom: 10px; }
  .stat-label { font-size: 12px; color: var(--gray-400); font-weight: 500; text-transform: uppercase; letter-spacing: .5px; }
  .stat-number { font-size: 30px; font-weight: 800; color: var(--gray-900); line-height: 1; margin: 4px 0; }
  .stat-badge { display: inline-flex; align-items: center; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 20px; }
  .badge-red { background: var(--red-100); color: var(--red-500); }
  .badge-orange { background: var(--orange-100); color: var(--orange-600); }
  .badge-green { background: var(--green-100); color: var(--green-600); }

  /* ── Expiry Alert ── */
  .expiry-section { margin-bottom: 28px; }
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
  .section-title { font-size: 16px; font-weight: 700; color: var(--gray-800); }
  .view-all-btn { font-size: 13px; color: var(--green-600); font-weight: 600; cursor: pointer; background: none; border: none; }
  .view-all-btn:hover { text-decoration: underline; }

  .expiry-list { display: flex; flex-direction: column; gap: 10px; }
  .expiry-item {
    background: var(--white); border-radius: var(--radius-md); padding: 14px 18px;
    display: flex; align-items: center; gap: 14px;
    border: 1px solid var(--gray-100); box-shadow: var(--shadow-sm);
  }
  .expiry-item.urgent { border-left: 3px solid var(--red-400); }
  .expiry-item.soon { border-left: 3px solid var(--orange-400); }
  .expiry-emoji { font-size: 24px; }
  .expiry-name { font-size: 14px; font-weight: 600; color: var(--gray-800); }
  .expiry-days { font-size: 12px; margin-top: 2px; }
  .expiry-days.urgent { color: var(--red-500); font-weight: 600; }
  .expiry-days.soon { color: var(--orange-500); font-weight: 600; }
  .expiry-recipe-btn {
    margin-left: auto; font-size: 12px; font-weight: 600;
    background: var(--green-50); color: var(--green-600);
    border: 1px solid var(--green-100); border-radius: 20px;
    padding: 4px 12px; cursor: pointer; white-space: nowrap;
    transition: all .15s;
  }
  .expiry-recipe-btn:hover { background: var(--green-500); color: var(--white); }

  /* ── Pantry ── */
  .pantry-toolbar { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
  .search-input {
    flex: 1; min-width: 200px; padding: 10px 16px;
    border: 1px solid var(--gray-200); border-radius: var(--radius-md);
    font-size: 14px; font-family: var(--font-body); outline: none;
    background: var(--white); transition: border-color .15s;
  }
  .search-input:focus { border-color: var(--green-400); box-shadow: 0 0 0 3px rgba(72,187,120,.15); }

  .btn {
    padding: 10px 18px; border-radius: var(--radius-md); border: none;
    font-size: 13.5px; font-weight: 600; cursor: pointer; transition: all .15s;
    font-family: var(--font-body); display: inline-flex; align-items: center; gap: 6px;
  }
  .btn-primary { background: var(--green-500); color: var(--white); }
  .btn-primary:hover { background: var(--green-600); transform: translateY(-1px); box-shadow: var(--shadow-md); }
  .btn-secondary { background: var(--white); color: var(--gray-700); border: 1px solid var(--gray-200); }
  .btn-secondary:hover { background: var(--gray-50); border-color: var(--gray-300); }
  .btn-orange { background: var(--orange-500); color: var(--white); }
  .btn-orange:hover { background: var(--orange-600); }
  .btn-sm { padding: 6px 12px; font-size: 12px; }

  .cat-tabs { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 20px; }
  .cat-tab {
    padding: 6px 14px; border-radius: 20px; font-size: 12.5px; font-weight: 600;
    cursor: pointer; transition: all .15s; border: 1px solid var(--gray-200);
    background: var(--white); color: var(--gray-500);
  }
  .cat-tab.active { background: var(--green-500); color: var(--white); border-color: var(--green-500); }
  .cat-tab:hover:not(.active) { border-color: var(--green-400); color: var(--green-600); }

  .pantry-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px; }
  .pantry-card {
    background: var(--white); border-radius: var(--radius-md); padding: 16px;
    border: 1px solid var(--gray-100); box-shadow: var(--shadow-sm);
    transition: transform .15s, box-shadow .15s; cursor: default;
  }
  .pantry-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
  .pantry-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 10px; }
  .pantry-emoji-circle {
    width: 44px; height: 44px; background: var(--green-50);
    border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px;
  }
  .days-badge { font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 20px; }
  .days-urgent { background: var(--red-100); color: var(--red-500); }
  .days-soon { background: var(--orange-100); color: var(--orange-600); }
  .days-ok { background: var(--green-100); color: var(--green-600); }
  .pantry-name { font-size: 14px; font-weight: 700; color: var(--gray-800); }
  .pantry-details { display: flex; gap: 10px; margin-top: 8px; }
  .pantry-detail-item { font-size: 12px; color: var(--gray-400); }
  .pantry-detail-item span { font-weight: 600; color: var(--gray-600); }

  /* ── Recipes ── */
  .recipe-tabs { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
  .recipe-tab {
    padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 600;
    cursor: pointer; border: 1.5px solid var(--gray-200); background: var(--white); color: var(--gray-500);
    transition: all .15s; display: flex; align-items: center; gap: 6px;
  }
  .recipe-tab.active { background: var(--green-500); color: var(--white); border-color: var(--green-500); }
  .recipe-count { font-size: 11px; background: rgba(255,255,255,.3); border-radius: 10px; padding: 1px 6px; }
  .recipe-tab:not(.active) .recipe-count { background: var(--gray-100); color: var(--gray-400); }

  .recipes-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 18px; }
  .recipe-card {
    background: var(--white); border-radius: var(--radius-lg); overflow: hidden;
    border: 1px solid var(--gray-100); box-shadow: var(--shadow-sm);
    transition: transform .15s, box-shadow .15s; cursor: pointer;
  }
  .recipe-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }
  .recipe-banner {
    height: 120px; display: flex; align-items: center; justify-content: center;
    font-size: 52px; position: relative;
  }
  .recipe-banner-100 { background: linear-gradient(135deg, #dcf4e6, #f0faf4); }
  .recipe-banner-95 { background: linear-gradient(135deg, #e8f5e9, #f1f8e9); }
  .recipe-banner-85 { background: linear-gradient(135deg, #fff3e0, #fff8f0); }
  .recipe-banner-70 { background: linear-gradient(135deg, #fff9f0, #fffdf0); }
  .match-pill {
    position: absolute; top: 10px; right: 10px;
    font-size: 11px; font-weight: 800; padding: 3px 10px; border-radius: 20px;
  }
  .match-100 { background: var(--green-500); color: var(--white); }
  .match-95 { background: var(--green-400); color: var(--white); }
  .match-85 { background: var(--orange-400); color: var(--white); }
  .match-70 { background: var(--gray-400); color: var(--white); }
  .recipe-body { padding: 16px; }
  .recipe-title { font-size: 15px; font-weight: 700; color: var(--gray-800); margin-bottom: 6px; line-height: 1.3; }
  .recipe-desc { font-size: 12.5px; color: var(--gray-400); line-height: 1.5; margin-bottom: 12px; }
  .recipe-meta { display: flex; gap: 12px; font-size: 12px; color: var(--gray-500); margin-bottom: 12px; }
  .recipe-meta-item { display: flex; align-items: center; gap: 4px; }
  .recipe-missing { background: var(--orange-100); border-radius: var(--radius-sm); padding: 8px 12px; margin-bottom: 12px; }
  .recipe-missing-title { font-size: 11px; font-weight: 700; color: var(--orange-600); margin-bottom: 4px; }
  .recipe-missing-items { font-size: 12px; color: var(--orange-500); }
  .recipe-actions { display: flex; gap: 8px; }

  /* ── Recipe Modal ── */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,.45);
    display: flex; align-items: center; justify-content: center; z-index: 100;
    padding: 20px;
  }
  .modal {
    background: var(--white); border-radius: var(--radius-xl);
    max-width: 580px; width: 100%; max-height: 88vh; overflow-y: auto;
    box-shadow: 0 25px 60px rgba(0,0,0,.2);
  }
  .modal-header {
    padding: 24px 24px 16px; border-bottom: 1px solid var(--gray-100);
    display: flex; align-items: flex-start; gap: 16px;
  }
  .modal-emoji { font-size: 40px; }
  .modal-title { font-family: var(--font-display); font-size: 20px; font-weight: 600; color: var(--gray-900); }
  .modal-subtitle { font-size: 13px; color: var(--gray-400); margin-top: 4px; }
  .modal-close { margin-left: auto; background: none; border: none; font-size: 20px; cursor: pointer; color: var(--gray-400); padding: 4px 8px; }
  .modal-body { padding: 20px 24px; }
  .modal-section { margin-bottom: 20px; }
  .modal-section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: .5px; color: var(--gray-400); margin-bottom: 12px; }
  .steps-list { display: flex; flex-direction: column; gap: 10px; }
  .step-item { display: flex; gap: 12px; align-items: flex-start; }
  .step-num {
    width: 26px; height: 26px; min-width: 26px; background: var(--green-500); color: var(--white);
    border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700;
  }
  .step-text { font-size: 14px; color: var(--gray-700); padding-top: 3px; line-height: 1.5; }
  .video-card {
    background: var(--gray-50); border-radius: var(--radius-md); padding: 14px;
    display: flex; gap: 14px; align-items: center; border: 1px solid var(--gray-200); cursor: pointer;
    transition: all .15s;
  }
  .video-card:hover { background: var(--green-50); border-color: var(--green-200); }
  .video-thumb {
    width: 90px; height: 58px; background: var(--gray-200);
    border-radius: var(--radius-sm); object-fit: cover; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; font-size: 24px;
  }
  .video-title { font-size: 13px; font-weight: 600; color: var(--gray-800); }
  .video-meta { font-size: 12px; color: var(--gray-400); margin-top: 4px; }
  .nutrition-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
  .nutrition-item { background: var(--gray-50); border-radius: var(--radius-sm); padding: 10px 12px; text-align: center; }
  .nutrition-value { font-size: 18px; font-weight: 800; color: var(--gray-800); }
  .nutrition-label { font-size: 11px; color: var(--gray-400); margin-top: 2px; }

  /* ── Shopping ── */
  .shopping-toolbar { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
  .shopping-list { display: flex; flex-direction: column; gap: 8px; }
  .shopping-item {
    background: var(--white); border-radius: var(--radius-md); padding: 14px 18px;
    display: flex; align-items: center; gap: 14px;
    border: 1px solid var(--gray-100); box-shadow: var(--shadow-sm);
    transition: all .15s;
  }
  .shopping-item.checked { opacity: .5; }
  .checkbox {
    width: 20px; height: 20px; border-radius: 6px;
    border: 2px solid var(--gray-300); background: var(--white);
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: all .15s; flex-shrink: 0;
  }
  .checkbox.checked { background: var(--green-500); border-color: var(--green-500); }
  .shopping-name { font-size: 14px; font-weight: 600; color: var(--gray-800); }
  .shopping-qty { font-size: 12px; color: var(--gray-400); margin-top: 2px; }
  .shopping-category { margin-left: auto; font-size: 11px; color: var(--gray-400); background: var(--gray-100); padding: 3px 8px; border-radius: 10px; }
  .shopping-price { font-size: 14px; font-weight: 700; color: var(--green-600); margin-left: 10px; }
  .shopping-total { background: var(--green-50); border: 1px solid var(--green-100); border-radius: var(--radius-md); padding: 16px 20px; margin-top: 20px; display: flex; justify-content: space-between; align-items: center; }
  .shopping-total-label { font-size: 14px; font-weight: 600; color: var(--gray-600); }
  .shopping-total-value { font-size: 22px; font-weight: 800; color: var(--green-600); }

  /* ── Meal Planner ── */
  .planner-tabs { display: flex; gap: 6px; margin-bottom: 20px; }
  .planner-tab {
    padding: 7px 16px; border-radius: 20px; font-size: 13px; font-weight: 600;
    cursor: pointer; border: 1.5px solid var(--gray-200); background: var(--white); color: var(--gray-500);
    transition: all .15s;
  }
  .planner-tab.active { background: var(--green-500); color: var(--white); border-color: var(--green-500); }
  .week-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; }
  .day-col { display: flex; flex-direction: column; gap: 8px; }
  .day-label { font-size: 12px; font-weight: 700; color: var(--gray-500); text-align: center; padding: 6px 0; }
  .day-label.today { color: var(--green-600); }
  .meal-slot {
    background: var(--white); border-radius: var(--radius-sm); padding: 8px 10px;
    border: 1px solid var(--gray-100); min-height: 60px;
    font-size: 11.5px; color: var(--gray-700); line-height: 1.4;
  }
  .meal-slot.empty {
    background: var(--gray-50); color: var(--gray-300); display: flex; align-items: center;
    justify-content: center; cursor: pointer; border: 1.5px dashed var(--gray-200);
  }
  .meal-slot.empty:hover { border-color: var(--green-300); color: var(--green-400); background: var(--green-50); }
  .meal-type-label { font-size: 10px; font-weight: 700; color: var(--gray-400); text-transform: uppercase; margin-bottom: 3px; letter-spacing: .4px; }

  /* ── Waste Score ── */
  .score-hero { text-align: center; padding: 32px 24px; }
  .score-ring-wrap { display: inline-block; position: relative; margin: 20px auto; }
  .score-ring { transform: rotate(-90deg); }
  .score-center {
    position: absolute; inset: 0; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
  }
  .score-number { font-size: 44px; font-weight: 900; color: var(--gray-900); line-height: 1; }
  .score-denom { font-size: 16px; color: var(--gray-400); }
  .score-label { font-size: 14px; color: var(--gray-500); margin-top: 4px; }
  .score-message { font-size: 15px; font-weight: 600; color: var(--green-600); margin-top: 8px; }
  .impact-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-top: 24px; }
  .impact-card { background: var(--white); border-radius: var(--radius-md); padding: 18px 20px; border: 1px solid var(--gray-100); box-shadow: var(--shadow-sm); }
  .impact-emoji { font-size: 26px; margin-bottom: 8px; }
  .impact-value { font-size: 24px; font-weight: 800; color: var(--gray-900); }
  .impact-label { font-size: 12px; color: var(--gray-400); margin-top: 2px; }

  /* ── AI Chat ── */
  .ai-fab {
    position: fixed; bottom: 28px; right: 28px; z-index: 50;
    width: 56px; height: 56px; border-radius: 50%;
    background: linear-gradient(135deg, var(--green-500), var(--orange-400));
    border: none; cursor: pointer; box-shadow: var(--shadow-lg);
    font-size: 26px; display: flex; align-items: center; justify-content: center;
    transition: transform .15s;
  }
  .ai-fab:hover { transform: scale(1.08); }

  .ai-panel {
    position: fixed; bottom: 96px; right: 28px; z-index: 50;
    width: 360px; background: var(--white); border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg); border: 1px solid var(--gray-100);
    display: flex; flex-direction: column; overflow: hidden;
    max-height: 480px;
  }
  .ai-panel-header {
    padding: 16px 18px; background: linear-gradient(135deg, var(--green-500), var(--orange-400));
    color: var(--white); display: flex; align-items: center; justify-content: space-between;
  }
  .ai-panel-title { font-size: 14px; font-weight: 700; }
  .ai-panel-close { background: none; border: none; color: rgba(255,255,255,.8); cursor: pointer; font-size: 18px; }
  .ai-messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px; }
  .ai-msg { display: flex; gap: 8px; }
  .ai-msg.user { flex-direction: row-reverse; }
  .ai-avatar {
    width: 30px; height: 30px; min-width: 30px; border-radius: 50%; background: var(--green-100);
    display: flex; align-items: center; justify-content: center; font-size: 14px;
  }
  .ai-bubble {
    background: var(--gray-100); border-radius: 14px; border-top-left-radius: 4px;
    padding: 10px 14px; font-size: 13px; color: var(--gray-700); max-width: 80%; line-height: 1.5;
  }
  .ai-msg.user .ai-bubble { background: var(--green-500); color: var(--white); border-radius: 14px; border-top-right-radius: 4px; }
  .ai-input-row { padding: 12px 14px; border-top: 1px solid var(--gray-100); display: flex; gap: 8px; }
  .ai-input {
    flex: 1; border: 1px solid var(--gray-200); border-radius: var(--radius-md); padding: 9px 14px;
    font-size: 13px; font-family: var(--font-body); outline: none; resize: none; height: 38px;
    transition: border-color .15s;
  }
  .ai-input:focus { border-color: var(--green-400); }
  .ai-send { background: var(--green-500); color: var(--white); border: none; border-radius: var(--radius-md); padding: 0 14px; cursor: pointer; font-size: 13px; font-weight: 600; }
  .ai-send:hover { background: var(--green-600); }

  /* ── Add Modal ── */
  .form-group { margin-bottom: 16px; }
  .form-label { font-size: 13px; font-weight: 600; color: var(--gray-600); margin-bottom: 6px; display: block; }
  .form-input {
    width: 100%; padding: 10px 14px; border: 1px solid var(--gray-200); border-radius: var(--radius-md);
    font-size: 14px; font-family: var(--font-body); outline: none; transition: border-color .15s;
  }
  .form-input:focus { border-color: var(--green-400); box-shadow: 0 0 0 3px rgba(72,187,120,.12); }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .form-select { width: 100%; padding: 10px 14px; border: 1px solid var(--gray-200); border-radius: var(--radius-md); font-size: 14px; font-family: var(--font-body); outline: none; background: var(--white); }
  .modal-footer { padding: 16px 24px; border-top: 1px solid var(--gray-100); display: flex; gap: 10px; justify-content: flex-end; }

  /* ── Toast ── */
  .toast {
    position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%);
    background: var(--gray-900); color: var(--white); padding: 12px 20px;
    border-radius: var(--radius-md); font-size: 14px; font-weight: 500;
    box-shadow: var(--shadow-lg); z-index: 200; animation: fadeInUp .3s ease;
  }
  @keyframes fadeInUp { from { opacity:0; transform: translateX(-50%) translateY(10px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .sidebar { display: none; }
    .page { padding: 20px 16px; }
    .stat-grid { grid-template-columns: repeat(2, 1fr); }
    .week-grid { grid-template-columns: repeat(4, 1fr); }
    .ai-panel { width: calc(100vw - 32px); right: 16px; }
  }
  @media (max-width: 600px) {
    .stat-grid { grid-template-columns: 1fr 1fr; }
    .recipes-grid { grid-template-columns: 1fr; }
    .pantry-grid { grid-template-columns: repeat(2, 1fr); }
    .week-grid { grid-template-columns: repeat(3, 1fr); }
    .impact-grid { grid-template-columns: 1fr 1fr; }
  }
`;

// ── Utilities ─────────────────────────────────────────────────────────────────
function daysBadgeClass(d) {
  if (d <= 1) return "days-urgent";
  if (d <= 3) return "days-soon";
  return "days-ok";
}
function expiryClass(d) { return d <= 1 ? "urgent" : "soon"; }
function matchBannerClass(m) { return `recipe-banner recipe-banner-${m}`; }
function matchPillClass(m) { return `match-pill match-${m}`; }

// ── ScoreRing SVG ─────────────────────────────────────────────────────────────
function ScoreRing({ score }) {
  const r = 70, cx = 80, cy = 80;
  const circ = 2 * Math.PI * r;
  const pct = score / 100;
  const fill = circ * (1 - pct);
  const color = score >= 80 ? "#38a169" : score >= 60 ? "#ed8936" : "#f56565";
  return (
    <div className="score-ring-wrap">
      <svg width="160" height="160" className="score-ring">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth="12" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="12"
          strokeDasharray={circ} strokeDashoffset={fill}
          strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s ease" }} />
      </svg>
      <div className="score-center">
        <div className="score-number" style={{ color }}>{score}</div>
        <div className="score-denom">/100</div>
      </div>
    </div>
  );
}

// ── AI Chat ───────────────────────────────────────────────────────────────────
function AIChat({ lang }) {
  const t = T[lang].ai;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", text: t.greeting }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;
    const newMsgs = [...messages, { role: "user", text }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);

    try {
      const systemPrompt = lang === "pt"
        ? `Você é um chef assistente de cozinha chamado "Chef IA" do aplicativo Smart Pantry Chef. 
           Seu papel é sugerir receitas com base nos ingredientes que o usuário tem em casa.
           Seja prático, animado e conciso. Sugira 2-3 receitas quando o usuário listar ingredientes.
           Mencione o tempo de preparo, dificuldade e se os ingredientes fazem 100%, 85% ou apenas 70% de match.
           Use emojis de comida para deixar a resposta mais visual.`
        : `You are a cooking assistant called "AI Chef" from the Smart Pantry Chef app.
           Your role is to suggest recipes based on ingredients the user has at home.
           Be practical, enthusiastic and concise. Suggest 2-3 recipes when the user lists ingredients.
           Mention prep time, difficulty and whether the ingredients are a 100%, 85% or 70% match.
           Use food emojis to make the response more visual.`;

      const apiMessages = newMsgs.map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }));

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: systemPrompt,
          messages: apiMessages,
        }),
      });
      const data = await res.json();
      const reply = data.content?.find(b => b.type === "text")?.text || "...";
      setMessages(prev => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: lang === "pt" ? "Erro ao conectar com a IA. Tente novamente." : "Error connecting to AI. Please try again." }]);
    }
    setLoading(false);
  }

  return (
    <>
      <button className="ai-fab" onClick={() => setOpen(o => !o)} title="AI Chef">👨‍🍳</button>
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
            {loading && (
              <div className="ai-msg">
                <div className="ai-avatar">👨‍🍳</div>
                <div className="ai-bubble" style={{ color: "#94a3b8" }}>{t.thinking}</div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="ai-input-row">
            <input className="ai-input" value={input} placeholder={t.placeholder}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()} />
            <button className="ai-send" onClick={sendMessage} disabled={loading}>{t.send}</button>
          </div>
        </div>
      )}
    </>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ lang, onNav }) {
  const t = T[lang].dashboard;
  const expiring = PANTRY_ITEMS.filter(i => i.daysLeft <= 3).sort((a, b) => a.daysLeft - b.daysLeft);
  const ready = RECIPES.filter(r => r.match === 100).length;
  const pantryValue = "R$ 148,50";
  const score = 87;

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title" style={{ fontFamily: "var(--font-display)" }}>{t.title}</div>
        <div className="page-subtitle">{t.subtitle}</div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-icon">⚠️</div>
          <div className="stat-label">{t.expiring}</div>
          <div className="stat-number">{expiring.length}</div>
          <span className="stat-badge badge-red">{t.urgent}</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🍳</div>
          <div className="stat-label">{t.recipes_ready}</div>
          <div className="stat-number">{ready}</div>
          <span className="stat-badge badge-green">100% match</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-label">{t.pantry_value}</div>
          <div className="stat-number" style={{ fontSize: "22px" }}>{pantryValue}</div>
          <span className="stat-badge badge-orange">Est.</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🌱</div>
          <div className="stat-label">{t.waste_score}</div>
          <div className="stat-number">{score}</div>
          <span className="stat-badge badge-green">/100</span>
        </div>
      </div>

      <div className="expiry-section">
        <div className="section-header">
          <div className="section-title">🔥 {t.cook_before}</div>
          <button className="view-all-btn" onClick={() => onNav("pantry")}>{t.view_all} →</button>
        </div>
        <div className="expiry-list">
          {expiring.map(item => (
            <div key={item.id} className={`expiry-item ${expiryClass(item.daysLeft)}`}>
              <div className="expiry-emoji">{item.emoji}</div>
              <div>
                <div className="expiry-name">{item.name}</div>
                <div className={`expiry-days ${expiryClass(item.daysLeft)}`}>
                  {item.daysLeft === 1 ? t.expires_tomorrow : `${t.expires_in} ${item.daysLeft} ${t.days}`}
                </div>
              </div>
              <button className="expiry-recipe-btn" onClick={() => onNav("recipes")}>
                {lang === "pt" ? "Ver receitas" : "Find recipes"} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Pantry ────────────────────────────────────────────────────────────────────
function Pantry({ lang }) {
  const t = T[lang].pantry;
  const [items, setItems] = useState(PANTRY_ITEMS);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ name: "", qty: "", unit: "un", category: "Fridge", exp: "" });

  const cats = t.categories;
  const catMap = { 1: "Fridge", 2: "Freezer", 3: "Pantry", 4: "Spices" };

  const filtered = items.filter(i => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = cat === 0 || i.location === catMap[cat];
    return matchSearch && matchCat;
  });

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(null), 2500); }

  function addItem() {
    if (!form.name) return;
    const newItem = {
      id: Date.now(), name: form.name, qty: Number(form.qty) || 1,
      unit: form.unit, location: form.category, category: form.category,
      daysLeft: form.exp ? Math.ceil((new Date(form.exp) - new Date()) / 86400000) : 14,
      emoji: "🥘"
    };
    setItems(prev => [newItem, ...prev]);
    setShowAdd(false);
    setForm({ name: "", qty: "", unit: "un", category: "Fridge", exp: "" });
    showToast(lang === "pt" ? `✅ ${form.name} adicionado!` : `✅ ${form.name} added!`);
  }

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">{t.title}</div>
        <div className="page-subtitle">{t.subtitle}</div>
      </div>

      <div className="pantry-toolbar">
        <input className="search-input" placeholder={t.search} value={search} onChange={e => setSearch(e.target.value)} />
        <button className="btn btn-secondary btn-sm" onClick={() => showToast(lang === "pt" ? "📷 Scanner de recibo em breve!" : "📷 Receipt scanner coming soon!")}>
          {t.import_receipt}
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => showToast(lang === "pt" ? "🎙️ Entrada de voz em breve!" : "🎙️ Voice input coming soon!")}>
          {t.voice}
        </button>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>+ {t.add}</button>
      </div>

      <div className="cat-tabs">
        {cats.map((c, i) => (
          <button key={i} className={`cat-tab ${cat === i ? "active" : ""}`} onClick={() => setCat(i)}>{c}</button>
        ))}
      </div>

      <div className="pantry-grid">
        {filtered.map(item => (
          <div key={item.id} className="pantry-card">
            <div className="pantry-card-top">
              <div className="pantry-emoji-circle">{item.emoji}</div>
              <span className={`days-badge ${daysBadgeClass(item.daysLeft)}`}>
                {item.daysLeft <= 1 ? (lang === "pt" ? "Amanhã!" : "Tomorrow!") : `${item.daysLeft}d`}
              </span>
            </div>
            <div className="pantry-name">{item.name}</div>
            <div className="pantry-details">
              <div className="pantry-detail-item">{t.qty}: <span>{item.qty} {item.unit}</span></div>
              <div className="pantry-detail-item">{t.location}: <span>{item.location}</span></div>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowAdd(false)}>
          <div className="modal">
            <div className="modal-header">
              <div>
                <div className="modal-title">{t.add_modal_title}</div>
              </div>
              <button className="modal-close" onClick={() => setShowAdd(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">{t.name}</label>
                <input className="form-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder={lang === "pt" ? "Ex: Ovos" : "Ex: Eggs"} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">{t.quantity}</label>
                  <input className="form-input" type="number" value={form.qty} onChange={e => setForm(f => ({ ...f, qty: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">{t.unit}</label>
                  <select className="form-select form-input" value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))}>
                    <option>un</option><option>g</option><option>kg</option><option>ml</option><option>L</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">{t.category}</label>
                <select className="form-select form-input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  <option>Fridge</option><option>Freezer</option><option>Pantry</option><option>Spices</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">{t.exp_date}</label>
                <input className="form-input" type="date" value={form.exp} onChange={e => setForm(f => ({ ...f, exp: e.target.value }))} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowAdd(false)}>{t.cancel}</button>
              <button className="btn btn-primary" onClick={addItem}>{t.save}</button>
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
  const [toast, setToast] = useState(null);

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(null), 2500); }

  const tabs = [
    { key: "all", label: lang === "pt" ? "Todas" : "All", count: RECIPES.length },
    { key: "100", label: t.can_cook, count: RECIPES.filter(r => r.match === 100).length },
    { key: "95", label: t.almost, count: RECIPES.filter(r => r.match >= 85 && r.match < 100).length },
    { key: "70", label: t.shopping_needed, count: RECIPES.filter(r => r.match < 85).length },
  ];

  const filtered = RECIPES.filter(r => {
    if (tab === "all") return true;
    if (tab === "100") return r.match === 100;
    if (tab === "95") return r.match >= 85 && r.match < 100;
    if (tab === "70") return r.match < 85;
    return true;
  });

  const diffLabels = t.difficulty;

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">{t.title}</div>
        <div className="page-subtitle">{t.subtitle}</div>
      </div>

      <div className="recipe-tabs">
        {tabs.map(tb => (
          <button key={tb.key} className={`recipe-tab ${tab === tb.key ? "active" : ""}`} onClick={() => setTab(tb.key)}>
            {tb.label} <span className="recipe-count">{tb.count}</span>
          </button>
        ))}
      </div>

      <div className="recipes-grid">
        {filtered.map(recipe => (
          <div key={recipe.id} className="recipe-card" onClick={() => setSelected(recipe)}>
            <div className={matchBannerClass(recipe.match)}>
              <span style={{ fontSize: 52 }}>{recipe.emoji}</span>
              <span className={matchPillClass(recipe.match)}>{recipe.match}% {t.match}</span>
            </div>
            <div className="recipe-body">
              <div className="recipe-title">{recipe.title}</div>
              <div className="recipe-desc">{recipe.description}</div>
              <div className="recipe-meta">
                <span className="recipe-meta-item">⏱ {recipe.time} {t.minutes}</span>
                <span className="recipe-meta-item">👤 {recipe.servings} {t.servings}</span>
                <span className="recipe-meta-item">⭐ {diffLabels[recipe.difficulty]}</span>
              </div>
              {recipe.missing.length > 0 && (
                <div className="recipe-missing">
                  <div className="recipe-missing-title">⚠️ {t.missing} {recipe.missing.length} {t.ingredients}:</div>
                  <div className="recipe-missing-items">{recipe.missing.join(", ")}</div>
                </div>
              )}
              <div className="recipe-actions">
                <button className="btn btn-primary btn-sm" onClick={e => { e.stopPropagation(); setSelected(recipe); }}>
                  {t.cook_now}
                </button>
                <button className="btn btn-secondary btn-sm" onClick={e => { e.stopPropagation(); showToast(lang === "pt" ? `❤️ ${recipe.title} salva!` : `❤️ ${recipe.title} saved!`); }}>
                  ♡ {t.save}
                </button>
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
              <div>
                <div className="modal-title">{selected.title}</div>
                <div className="modal-subtitle">{selected.cuisine} · {selected.time} {t.minutes} · {diffLabels[selected.difficulty]}</div>
              </div>
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <div className="modal-section-title">{lang === "pt" ? "Informações Nutricionais" : "Nutrition"}</div>
                <div className="nutrition-grid">
                  <div className="nutrition-item"><div className="nutrition-value">{selected.calories}</div><div className="nutrition-label">kcal</div></div>
                  <div className="nutrition-item"><div className="nutrition-value">{selected.protein}g</div><div className="nutrition-label">{lang === "pt" ? "Proteína" : "Protein"}</div></div>
                  <div className="nutrition-item"><div className="nutrition-value">{selected.servings}</div><div className="nutrition-label">{t.servings}</div></div>
                </div>
              </div>

              <div className="modal-section">
                <div className="modal-section-title">{lang === "pt" ? "Modo de Preparo" : "Instructions"}</div>
                <div className="steps-list">
                  {selected.steps.map((s, i) => (
                    <div key={i} className="step-item">
                      <div className="step-num">{i + 1}</div>
                      <div className="step-text">{s}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-section">
                <div className="modal-section-title">{lang === "pt" ? "Vídeo de Receita" : "Recipe Video"}</div>
                <div className="video-card" onClick={() => showToast(lang === "pt" ? "🎥 Abrindo YouTube..." : "🎥 Opening YouTube...")}>
                  <div className="video-thumb">▶️</div>
                  <div>
                    <div className="video-title">{selected.title}</div>
                    <div className="video-meta">📺 {selected.videoChannel} · {selected.videoDuration} · 👁 {selected.videoViews} views</div>
                    <div style={{ marginTop: 6 }}>
                      <span style={{ fontSize: 12, color: "var(--green-600)", fontWeight: 700 }}>{t.watch_video}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelected(null)}>{lang === "pt" ? "Fechar" : "Close"}</button>
              <button className="btn btn-orange" onClick={() => { showToast(lang === "pt" ? `🛒 Adicionando à lista de compras...` : "🛒 Adding to shopping list..."); setSelected(null); }}>
                🛒 {lang === "pt" ? "Adicionar faltantes" : "Add missing items"}
              </button>
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
function Shopping({ lang }) {
  const t = T[lang].shopping;
  const [items, setItems] = useState(SHOPPING_LIST);
  const [toast, setToast] = useState(null);

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(null), 2500); }
  function toggle(id) { setItems(prev => prev.map(i => i.id === id ? { ...i, checked: !i.checked } : i)); }
  function clearChecked() { setItems(prev => prev.filter(i => !i.checked)); showToast(lang === "pt" ? "✅ Itens marcados removidos!" : "✅ Checked items removed!"); }

  const total = items.filter(i => !i.checked).reduce((s, i) => s + i.price, 0).toFixed(2);
  const pendingCount = items.filter(i => !i.checked).length;

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">{t.title}</div>
        <div className="page-subtitle">{t.subtitle} — {pendingCount} {t.items}</div>
      </div>

      <div className="shopping-toolbar">
        <button className="btn btn-primary" onClick={() => showToast(lang === "pt" ? "➕ Adicionar item em breve!" : "➕ Add item coming soon!")}>+ {t.add_item}</button>
        <button className="btn btn-secondary" onClick={() => showToast(lang === "pt" ? "📋 Gerar da receita..." : "📋 Generate from recipe...")}>📋 {t.generate}</button>
        <button className="btn btn-secondary" onClick={clearChecked}>🗑 {t.clear}</button>
        <button className="btn btn-secondary" onClick={() => showToast(lang === "pt" ? "🛒 Abrindo Mercado Livre..." : "🛒 Opening store...")}>🛒 {lang === "pt" ? "Comprar Online" : "Buy Online"}</button>
      </div>

      <div className="shopping-list">
        {items.map(item => (
          <div key={item.id} className={`shopping-item ${item.checked ? "checked" : ""}`}>
            <div className={`checkbox ${item.checked ? "checked" : ""}`} onClick={() => toggle(item.id)}>
              {item.checked && <span style={{ color: "white", fontSize: 13 }}>✓</span>}
            </div>
            <div>
              <div className="shopping-name" style={{ textDecoration: item.checked ? "line-through" : "none" }}>{item.name}</div>
              <div className="shopping-qty">{item.qty}</div>
            </div>
            <div className="shopping-category">{item.category}</div>
            <div className="shopping-price">R$ {item.price.toFixed(2)}</div>
          </div>
        ))}
      </div>

      <div className="shopping-total">
        <div className="shopping-total-label">💰 {t.total_est}</div>
        <div className="shopping-total-value">R$ {total}</div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

// ── Meal Planner ──────────────────────────────────────────────────────────────
function MealPlanner({ lang }) {
  const t = T[lang].planner;
  const [view, setView] = useState("week");
  const [toast, setToast] = useState(null);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2200); };

  const days = lang === "pt" ? WEEK_DAYS_PT : WEEK_DAYS;
  const dayKeys = WEEK_DAYS;
  const mealTypes = [
    { key: "breakfast", label: t.breakfast, emoji: "☀️" },
    { key: "lunch", label: t.lunch, emoji: "🌤" },
    { key: "dinner", label: t.dinner, emoji: "🌙" },
    { key: "snack", label: t.snack, emoji: "🍎" },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">{t.title}</div>
        <div className="page-subtitle">{t.subtitle}</div>
      </div>

      <div className="planner-tabs" style={{ marginBottom: 20 }}>
        {[{ key: "week", label: t.week }, { key: "month", label: t.month }].map(v => (
          <button key={v.key} className={`planner-tab ${view === v.key ? "active" : ""}`} onClick={() => setView(v.key)}>{v.label}</button>
        ))}
      </div>

      <div className="week-grid">
        {dayKeys.map((dayKey, di) => (
          <div key={dayKey} className="day-col">
            <div className={`day-label ${di === 0 ? "today" : ""}`}>{days[di]}</div>
            {mealTypes.map(meal => {
              const planned = MEAL_PLAN[dayKey]?.[meal.key];
              return (
                <div key={meal.key}>
                  <div className="meal-type-label">{meal.emoji} {meal.label}</div>
                  {planned ? (
                    <div className="meal-slot">{planned}</div>
                  ) : (
                    <div className="meal-slot empty" onClick={() => showToast(lang === "pt" ? `➕ Adicionar ${meal.label}...` : `➕ Add ${meal.label}...`)}>+</div>
                  )}
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
  const message = score >= 80 ? t.excellent : score >= 60 ? t.good : t.average;

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">{t.title}</div>
        <div className="page-subtitle">{t.subtitle}</div>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <div className="score-hero">
          <ScoreRing score={score} />
          <div className="score-label">{t.score_label}</div>
          <div className="score-message">{message}</div>
        </div>
      </div>

      <div style={{ fontWeight: 700, fontSize: 16, color: "var(--gray-800)", marginBottom: 14 }}>📊 {t.this_month}</div>
      <div className="impact-grid">
        {[
          { emoji: "💰", value: "R$ 87,50", label: t.money_saved },
          { emoji: "🦸", value: "14", label: t.rescued },
          { emoji: "👨‍🍳", value: "23", label: t.cooked },
          { emoji: "🌱", value: "2.3 kg", label: t.reduction },
        ].map((item, i) => (
          <div key={i} className="impact-card">
            <div className="impact-emoji">{item.emoji}</div>
            <div className="impact-value">{item.value}</div>
            <div className="impact-label">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-pad">
          <div style={{ fontWeight: 700, color: "var(--gray-700)", marginBottom: 12 }}>
            📈 {lang === "pt" ? "Histórico Mensal" : "Monthly History"}
          </div>
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => {
            const vals = [62, 68, 74, 79, 83, 87];
            const v = vals[i];
            return (
              <div key={m} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div style={{ width: 32, fontSize: 12, color: "var(--gray-400)", fontWeight: 600 }}>{m}</div>
                <div style={{ flex: 1, background: "var(--gray-100)", borderRadius: 6, height: 10, overflow: "hidden" }}>
                  <div style={{ width: `${v}%`, height: "100%", background: `hsl(${100 + v}, 60%, 45%)`, borderRadius: 6, transition: "width 1s ease" }} />
                </div>
                <div style={{ width: 32, fontSize: 12, fontWeight: 700, color: "var(--gray-700)" }}>{v}</div>
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
  const [lang, setLang] = useState("pt");
  const [page, setPage] = useState("dashboard");
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
    dashboard: <Dashboard lang={lang} onNav={setPage} />,
    pantry: <Pantry lang={lang} />,
    recipes: <Recipes lang={lang} />,
    shopping: <Shopping lang={lang} />,
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
              <div>
                <div className="logo-text">Smart Pantry</div>
                <div className="logo-sub">Chef</div>
              </div>
            </div>
          </div>
          <nav className="nav-section">
            {navItems.map(item => (
              <button key={item.key} className={`nav-item ${page === item.key ? "active" : ""}`}
                onClick={() => setPage(item.key)}>
                <span className="nav-emoji">{item.emoji}</span>
                {item.label}
              </button>
            ))}
          </nav>
          <button className="lang-btn" onClick={() => setLang(l => l === "pt" ? "en" : "pt")}>
            🌐 {t.lang === "EN" ? "Switch to English" : "Mudar para EN"}
          </button>
        </aside>

        <main className="main-content">
          {pages[page]}
        </main>
      </div>

      <AIChat lang={lang} />
    </>
  );
}
