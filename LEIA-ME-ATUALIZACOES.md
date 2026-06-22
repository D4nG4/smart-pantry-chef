# 🥗 Smart Pantry Chef — Atualizações desta versão

Resumo das 3 mudanças pedidas, o que já está pronto e o que **você** ainda
precisa fazer (chaves/links de afiliado, porque isso depende da sua conta).

---

## 1) Despensa com ingredientes padronizados (✅ pronto)

- Criei um banco mestre com **~120 ingredientes** (`INGREDIENTS_DB` no topo
  do `App.jsx`), cobrindo Geladeira, Freezer, Despensa e Temperos.
- O campo "Nome" da Despensa agora é um **buscador com clique obrigatório**:
  a pessoa digita, vê sugestões da lista e *clica* para escolher. Não é mais
  possível salvar texto livre — isso elimina "pcanha", "piranha" etc.
- As receitas usam os **mesmos IDs** de ingrediente, então a compatibilidade
  entre Despensa ↔ Receitas agora é automática e em tempo real.
- Quer adicionar mais itens depois? Basta adicionar uma linha no array
  `INGREDIENTS_DB` (id, nome, emoji, unidade padrão, categoria).

## 2) Receitas (parcialmente pronto — leia o porquê)

- Expandi de 6 para **24 receitas** (escritas originalmente para o app),
  cada uma já ligada ao banco de ingredientes — então o % de compatibilidade
  e a lista de "faltando" são calculados **dinamicamente** com base na
  despensa real do usuário (antes eram números fixos).
- Botão "Adicionar à lista" agora funciona de verdade: envia os ingredientes
  faltantes direto para a Lista de Compras.
- **Sobre o TudoGostoso:** pesquisei e não encontrei uma API oficial deles
  para desenvolvedores — o que existe é um projeto de terceiros no GitHub
  que faz scraping (extração não autorizada) do site. Não posso construir
  esse tipo de integração, porque seria acessar e reproduzir o banco de
  receitas deles sem autorização — risco real de violação de termos de uso
  e direitos autorais (fotos, textos e receitas têm dono).
  **Alternativas legítimas**, se quiser uma base de receitas bem maior:
  - Falar direto com o TudoGostoso sobre uma parceria/licenciamento de
    conteúdo (é o caminho correto se você realmente quiser o catálogo deles).
  - Usar uma API de receitas com licença aberta para desenvolvedores, como
    **TheMealDB** (gratuita, catálogo internacional) ou **Spoonacular**
    (paga acima de um limite, catálogo grande e com tradução).
  - Eu continuar escrevendo receitas originais em lote (consigo gerar mais
    facilmente, 20, 50, 100 — é só pedir) já no formato compatível com o
    banco de ingredientes do app.
- Troquei também o botão de vídeo: antes mostrava um canal e um número de
  visualizações **fictícios** (dado de demonstração). Agora ele abre uma
  busca real no YouTube pelo nome da receita — honesto e funcional.

## 3) Lista de Compras com link de afiliado (✅ estrutura pronta — falta só sua chave)

Cada item da lista agora tem dois botões: **🛒 Amazon** e **🛒 Mercado Livre**.
A lógica de link já está implementada no topo do `App.jsx`, no bloco
`AFFILIATE_CONFIG`. Veja o que fazer em cada uma:

### Amazon (simples)
1. Crie sua conta em **associados.amazon.com.br** (Amazon Associados).
2. Eles te dão uma "tag" de afiliado (ex: `meusite0a-20`).
3. Substitua no código:
   ```js
   const AFFILIATE_CONFIG = {
     amazonTag: "SEUTAG-20",   // <- troque aqui pela sua tag
   ```
4. Pronto — todo link de busca da Amazon já sai rastreado e gera comissão.

### Mercado Livre (atenção: precisa de um passo manual)
O Mercado Livre **não permite gerar link de afiliado rastreado só com a URL
de busca**, como a Amazon. Cada link precisa ser criado um a um:
1. Acesse `mercadolivre.com.br/l/afiliados-home` e entre com sua conta
   aprovada no programa de afiliados.
2. Clique em **"Criar link"**, cole a URL do produto específico que você
   quer indicar, e clique em **"Gerar link"**.
3. Cole o link gerado no `AFFILIATE_CONFIG.mercadoLivreLinks`, associando ao
   ID do ingrediente, por exemplo:
   ```js
   mercadoLivreLinks: {
     arroz: "https://mercadolivre.com/sec/SEU-LINK-GERADO",
     azeite: "https://mercadolivre.com/sec/OUTRO-LINK-GERADO",
   }
   ```
4. Para os itens que **ainda não têm** link gerado, o botão abre uma busca
   normal no Mercado Livre (sem comissão) — então você nunca perde uma venda,
   só não ganha comissão até gerar o link daquele produto específico.
5. Se sua lista de afiliados crescer muito (500+ cliques/dia, segundo o
   próprio programa), o Mercado Livre tem uma **API de afiliados** que gera
   links automaticamente — aí vale a pena migrar para ela.

Também adicionei um aviso visível na tela de Compras avisando o usuário que
os botões são links de afiliado — isso é exigido tanto pelas regras dos
programas quanto pelo Código de Defesa do Consumidor (transparência em
publicidade).

---

## Como subir as mudanças
Mesmo processo de sempre: suba os arquivos da pasta `src/` (principalmente
o `App.jsx`) para o GitHub e o Vercel republica automaticamente.
