/**
 * PHASES DATA — MarketFlow Formation
 *
 * Phase schema:
 *   code:     string        — "00"–"05" (display code)
 *   name:     string        — display name
 *   color:    string        — hex accent color for that phase
 *   desc:     string        — one-line description shown on intro card
 *   badges:   string[]      — tech tags shown in the phase header
 *   tabs:     string[]      — tab labels in display order (maps to sections keys)
 *   sections: {
 *     cours?:        { title: string, blocks: Block[] }
 *     architecture?: { title: string, blocks: Block[] }
 *     oopdi?:        { title: string, blocks: Block[] }
 *     guide?:        { title: string, steps: Step[] }
 *     exercices:     Exercise[]
 *     proj:          { kpis: Record<string,string>, files: string, uc: UC[], milestone: string }
 *     liens?:        { categories: LienCategory[] }
 *   }
 *
 * Block:        { type: 'concept'|'alert', num?: string, title?: string, text: string, code?: string }
 * Step:         { num: number, title: string, desc: string, code?: string }
 * Exercise:     { n: number, title: string, desc: string, hint?: string, commit?: string }
 * UC:           { f: string, color: string, items: { l: string, s: 'todo'|'active'|'done' }[] }
 * LienCategory: { title: string, color: string, items: { label, url, desc }[] }
 *
 * To add a new phase: append a new object to this array following the schema above.
 * To update content: edit only this file — app.js and index.html need no changes.
 */
export const PHASES = [
// ══ PHASE 00 ══════════════════════════════════════════════════
{ code:'00', name:'Conventional Commits', color:'#6b82a8',
  desc:'Format standard, types, scopes, exemples par type',
  badges:['Conventional Commits','Git','feat','fix','refactor','test','docs','chore'],
  tabs:['Cours','Exercices','Projet'],
  sections:{
    cours: {
      title:'Cours — Conventional Commits',
      blocks:[
        { type:'concept', num:'01', title:'Pourquoi les Conventional Commits ?',
          text:`Quand on travaille sur un projet, l'historique Git est souvent illisible : <code>wip</code>, <code>fix</code>, <code>ajout truc</code>... Ces messages ne disent rien sur <strong>l'intention</strong>, <strong>la portée</strong> ou <strong>l'impact</strong> d'un changement.
<br><br>Les <strong>Conventional Commits</strong> imposent un format simple qui rend l'historique <em>auto-documenté</em>. Un développeur qui rejoint le projet peut comprendre ce qui a changé, pourquoi, et dans quelle zone — rien qu'en lisant <code>git log</code>.`,
          code:`# ❌ Ce qu'on voit sans convention — illisible, inexploitable
3a8f01  fix
29cd4e  wip
71ab22  ajout cart
b002f1  correction
a3f112  modif

# ✅ Avec Conventional Commits — chaque ligne raconte une histoire
3a8f01  feat(cart): add AddToCart with duplicate merge logic
29cd4e  test(cart): add unit tests for AddToCart handler
71ab22  fix(products): prevent negative stock on DecrementStock
b002f1  docs(readme): add Aspire local setup instructions
a3f112  refactor(domain): extract BaseEntity<TId> abstract class

# L'historique devient un journal de bord lisible par les humains ET les outils.`
        },
        { type:'concept', num:'02', title:'Anatomie d\'un commit',
          text:`Le format est <code>type(scope): description</code>. Trois parties obligatoires — le <strong>type</strong> décrit l'intention, le <strong>scope</strong> précise la zone d'impact, la <strong>description</strong> est au présent impératif en minuscules (jamais une majuscule, jamais un point final).
<br><br>La règle courte : si vous lisez le message comme une phrase qui complète <em>"ce commit va..."</em>, il est probablement bien écrit.`,
          code:`feat(products): add CreateProduct endpoint
↑     ↑           ↑
│     │           └ description : présent impératif, minuscules, max 72 caractères
│     └─────────── scope : zone d'impact entre parenthèses
└───────────────── type : intention du commit

# ✅ Bons messages — lisibles comme une phrase d'action
feat(cart): add AddToCart endpoint with quantity validation
fix(products): prevent stock going negative on DecrementStock
refactor(domain): extract shared BaseEntity<TId> class
test(cart): add unit tests for AddToCart handler
docs(readme): add Aspire local setup instructions
chore(deps): update EF Core to 10.0.1

# ❌ Mauvais messages — à éviter
Fix bug                    ← pas de type ni scope
feat(Cart): Add endpoint.  ← majuscule, point final
feat : add stuff           ← espace avant les deux-points, vague
wip                        ← pas de format du tout`
        },
        { type:'concept', num:'03', title:'Les types — exemples pour chaque catégorie',
          text:`Il existe 9 types standards. Retenir les <strong>6 du quotidien</strong> suffit pour démarrer : <code>feat</code>, <code>fix</code>, <code>refactor</code>, <code>test</code>, <code>docs</code>, <code>chore</code>. Les trois autres (<code>perf</code>, <code>build</code>, <code>ci</code>) s'ajoutent naturellement avec la pratique.`,
          code:`# ─── feat : nouvelle fonctionnalité visible par l'utilisateur ──────────
feat(products): add CreateProduct endpoint
feat(cart): add AddToCart with duplicate merge logic
feat(auth): add Google OAuth2 login flow
feat(products): add pagination to GetProducts endpoint
feat(cart): expose computed Total on CartDto

# ─── fix : correction d'un bug ──────────────────────────────────────
fix(products): prevent negative stock on DecrementStock
fix(cart): handle empty cart on GetCart endpoint
fix(auth): return 401 instead of 500 on invalid token
fix(domain): correct Price validation allowing zero in Product.Create
fix(infra): add missing Include(Items) on CartRepository.GetById

# ─── refactor : restructuration sans changement de comportement ──────
refactor(domain): extract shared BaseEntity<TId> abstract class
refactor(products): move Product-to-DTO mapping into ProductMapper
refactor(cart): rename CartLine to CartItem for clarity
refactor(infra): split DependencyInjection into per-layer extensions
refactor(api): move health endpoint into dedicated HealthEndpoint class

# ─── test : ajout ou modification de tests ──────────────────────────
test(cart): add unit tests for AddToCart handler
test(products): add GetProductsHandler test with paged result
test(domain): add Cart.Total invariant tests
test(auth): add OwnCartHandler PBAC authorization tests
test(infra): add CartRepository integration test with in-memory db

# ─── docs : documentation uniquement ────────────────────────────────
docs(readme): add Aspire local setup instructions
docs(readme): document required Google OAuth2 environment variables
docs(api): add OpenAPI descriptions on CreateProduct endpoint
docs(contributing): add conventional commits guide for contributors

# ─── chore : tâches de maintenance, pas de code métier ──────────────
chore(deps): update EF Core to 10.0.1
chore(deps): add NSubstitute and FluentAssertions to test project
chore(git): add .gitignore for .NET projects
chore(editor): add .editorconfig with 4-space indent and UTF-8

# ─── perf : amélioration de performance ─────────────────────────────
perf(products): replace GetAll with GetPaged to avoid full table scan
perf(cart): add index on cart.customer_id column

# ─── build : système de build, scripts ──────────────────────────────
build(ci): add GitHub Actions workflow for dotnet test
build(docker): add Dockerfile for MarketFlow.API

# ─── ci : intégration continue ──────────────────────────────────────
ci(github): add pull-request lint check on commit messages`
        },
        { type:'concept', num:'04', title:'Les scopes — délimiter la zone d\'impact',
          text:`Le scope est <strong>facultatif</strong> mais vivement recommandé sur un projet multi-domaines. Il permet de filtrer l'historique par zone : <code>git log --oneline --grep "feat(cart)"</code>. Pour MarketFlow, on utilise les scopes suivants — cohérents avec les couches Clean Architecture.
<br><br>Règle pratique : si vous ne savez pas quel scope utiliser, c'est souvent le signe que le commit touche trop de choses à la fois.`,
          code:`# Scopes MarketFlow — couvrent les deux features et l'infrastructure
products  ← tout ce qui concerne les produits (entité, handler, endpoint, repository)
cart      ← tout ce qui concerne le panier (agrégat, handlers, endpoint)
auth      ← authentification Google, PBAC, middleware
domain    ← code transversal du Domain (BaseEntity, DomainException, value objects)
infra     ← infrastructure technique (DbContext, Aspire AppHost, migrations)
deps      ← dépendances NuGet ou npm
api       ← configuration ASP.NET Core, Program.cs, middleware global
ci        ← GitHub Actions, pipelines

# Exemples de filtrage par scope dans git :
git log --oneline --grep "cart"      # → tous les commits qui touchent le panier
git log --oneline --grep "fix(cart)" # → uniquement les bugs corrigés sur le panier
git log --oneline --grep "feat"      # → uniquement les nouvelles features`
        },
        { type:'concept', num:'05', title:'Breaking changes — quand l\'API change de contrat',
          text:`Un <strong>breaking change</strong> est une modification qui casse la compatibilité avec les clients existants. On le signale avec <code>!</code> après le type, ou avec un footer <code>BREAKING CHANGE:</code>. Dans un historique Conventional Commits, cela correspond à un bump de version <em>major</em> (v1.x.x → v2.0.0) si vous utilisez le versioning sémantique automatique.`,
          code:`# Deux façons de déclarer un breaking change :

# 1. Le ! après le type — forme courte, suffisant pour les cas simples
feat(auth)!: require authentication on all product endpoints

# 2. Le footer BREAKING CHANGE — pour décrire l'impact en détail
feat(cart): change Cart.CustomerId from Guid to string

BREAKING CHANGE: Cart.CustomerId is now a string (Google sub) instead of Guid.
Existing cart records must be migrated. Run CartCustomerIdToString migration.

# Exemples courants dans MarketFlow :
feat(api)!: rename /api/products/list to /api/products
feat(domain)!: remove Product.IsAvailable — use Stock > 0 instead
feat(cart)!: GetCart now returns CartDto instead of Cart entity directly

# Règle : si un client qui consomme votre API doit changer son code → c'est un breaking change.`
        }
      ]
    },
    exercices:[
      { n:1, title:'Initialiser le repo Git avec un README',
        desc:'Créer un dossier <code>market-flow/</code>, initialiser Git, créer un <code>README.md</code> qui décrit le projet, et faire un premier commit en respectant la convention.',
        hint:'Le README doit contenir au minimum : le nom du projet, la stack technique (ASP.NET Core 10, EF Core, .NET Aspire), et une ligne décrivant ce que fait l\'application. Le commit doit utiliser le type <code>docs</code> car on ajoute de la documentation.',
        commit:'"docs(readme): initialize README with project description and tech stack"'
      },
      { n:2, title:'Créer un .gitignore et commiter',
        desc:'Ajouter un <code>.gitignore</code> adapté aux projets .NET (Visual Studio gitignore). Commiter avec le type approprié.',
        hint:'Le type <code>chore</code> est approprié pour les fichiers de configuration qui ne touchent pas au code métier. Le scope <code>git</code> décrit la zone d\'impact.',
        commit:'"chore(git): add .gitignore for .NET and Visual Studio"'
      },
      { n:3, title:'Pratiquer les 6 types sur des fichiers fictifs',
        desc:'Créer des fichiers vides ou minimaux et faire un commit de chaque type : <code>feat</code>, <code>fix</code>, <code>refactor</code>, <code>test</code>, <code>docs</code>, <code>chore</code>. Utiliser les scopes MarketFlow (<code>products</code>, <code>cart</code>, <code>domain</code>...) même si les fichiers sont encore vides.',
        hint:'Exemples de fichiers à créer : <code>Product.cs</code> (feat), <code>README update</code> (docs), <code>.editorconfig</code> (chore). L\'objectif est de pratiquer le format, pas d\'implémenter la logique.',
        commit:'"chore(git): practice conventional commits — 6 types covered"'
      },
      { n:4, title:'Vérifier l\'historique — git log lisible',
        desc:'Après les 3 exercices précédents, exécuter <code>git log --oneline</code>. L\'historique doit être lisible comme un journal : chaque ligne raconte ce qui a changé et pourquoi.',
        hint:'Si un message ne satisfait pas le format <code>type(scope): description</code>, utilisez <code>git commit --amend</code> pour le corriger (uniquement sur des commits locaux non poussés).'
      }
    ],
    proj:{
      kpis:{ 'Use cases':'0/4', 'Tests':'0', 'Endpoints':'0', 'Sécurité':'✗' },
      files:`📁 market-flow/
  📄 .gitignore     <span class="f-new">[NEW]</span> Visual Studio + .NET
  📄 README.md      <span class="f-new">[NEW]</span> description du projet`,
      uc:[
        { f:'Product Management', color:'#5ba8ff', items:[{l:'CreateProduct',s:'todo'},{l:'GetProducts',s:'todo'}] },
        { f:'Cart Management',    color:'#2dd4a0', items:[{l:'AddToCart',s:'todo'},{l:'GetCart',s:'todo'}] },
      ],
      milestone:'Le repo existe. <code>git log --oneline</code> montre un historique propre avec des messages au format <code>type(scope): description</code>. Le format est acquis — prêt pour la Phase 01.'
    }
  }
},
// ══ PHASE 01 ══════════════════════════════════════════════════
{ code:'01', name:'Fondations .NET', color:'#5ba8ff',
  desc:'Clean Architecture, Vertical Slice, OOP encapsulé, DI',
  badges:['Clean Architecture','Vertical Slice','OOP','DI','Minimal API','ASP.NET Core 10'],
  tabs:['Architecture','OOP & DI','Guide Solution','Exercices','Projet'],
  sections:{
    architecture:{
      title:'Architecture — Clean Architecture, Vertical Slice & Organisation des endpoints',
      blocks:[
        { type:'concept', num:'01', title:'Qu\'est-ce que la Clean Architecture ?',
          text:`La <strong>Clean Architecture</strong> (Robert C. Martin, 2012) est un modèle d'organisation qui place la <strong>logique métier au centre</strong> de l'application, indépendante de tout framework, base de données ou interface utilisateur. L'idée fondatrice : le code qui décrit <em>ce que fait votre application</em> (les règles métier) ne doit jamais dépendre du code qui décrit <em>comment c'est fait</em> (EF Core 10, HTTP, SQL Server).
<br><br>Le résultat concret : <code>Product.Create()</code> et <code>Cart.AddItem()</code> sont testables <strong>sans lancer une base de données</strong>. Vous pouvez remplacer SQL Server par PostgreSQL, ou EF Core par Dapper, sans modifier une ligne de logique métier.`,
          code:`// Votre application n'est pas "une application ASP.NET Core 10".
// C'est une application de DOMAINE qui s'expose via HTTP.

// La règle unique : les dépendances pointent vers le centre.
// Domain est au centre — il ne référence absolument rien d'autre.

//        ┌─────────────────────────────┐
//        │         Domain              │  ← ne référence rien
//        │   Product, Cart, Rules      │
//        └─────────────┬───────────────┘
//                      │ (référencé par)
//        ┌─────────────┴───────────────┐
//        │        Application          │  ← référence Domain seulement
//        │   Handlers, Queries, DTOs   │
//        └──────┬───────────┬──────────┘
//               │           │ (référencent Application + Domain)
//    ┌──────────┴──┐   ┌────┴──────────┐
//    │Infrastructure│   │     API       │
//    │ EF Core, DB  │   │   Endpoints   │
//    └─────────────┘   └───────────────┘`
        },
        { type:'concept', num:'02', title:'Les 4 couches de MarketFlow — rôles et frontières',
          text:`Chaque couche a une responsabilité précise. Les références de projet (<code>.csproj</code>) matérialisent physiquement la règle de dépendance — si Domain référence Infrastructure, le compilateur vous le dit. C'est une contrainte intentionnelle, pas un détail de configuration.`,
          code:`MarketFlow.sln
├── src/
│   ├── MarketFlow.Domain/
│   │   ← Entités, agrégats, value objects, DomainException
│   │   ← Références .csproj : AUCUNE
│   │   ← Règle : zéro using vers EF Core, ASP.NET, System.Text.Json...
│   │
│   ├── MarketFlow.Application/
│   │   ← Use cases (handlers), interfaces de repositories, DTOs, mappers
│   │   ← Références .csproj : Domain seulement
│   │   ← Règle : UI-agnostique — pas de HttpContext, pas de IResult
│   │
│   ├── MarketFlow.Infrastructure/
│   │   ← EF Core 10, DbContext, repositories réels, auth transformers
│   │   ← Références .csproj : Application + Domain
│   │   ← Règle : implémente les interfaces déclarées dans Application
│   │
│   └── MarketFlow.API/
│       ← Endpoints Minimal API, Program.cs, middlewares, filtres
│       ← Références .csproj : tous les projets
│       ← Règle : point d'entrée uniquement — zéro logique métier
└── tests/
    └── MarketFlow.UnitTests/
        ← Références : Application + Domain
        ← Objectif : tester les handlers sans DB, sans HTTP, sans réseau`
        },
        { type:'concept', num:'03', title:'Quand utiliser la Clean Architecture',
          text:`La Clean Architecture est un <strong>investissement</strong> : elle ajoute du code au départ pour protéger la maintenabilité à long terme. Cet investissement est rentable dans certains contextes — et pas dans d'autres.`,
          code:`// ✅ Bon fit — Clean Architecture justifiée
// → Codebase qui vivra 2+ ans avec plusieurs développeurs
// → Logique métier réelle (règles, invariants, agrégats, DomainException)
// → Testabilité en priorité — TDD sur les handlers
// → Plusieurs features métier interconnectées
// → Éventuellement exposé via plusieurs interfaces (HTTP, CLI, worker)

// ⚠️ Overhead potentiellement non justifié
// → CRUD pur sans règle métier — 3 tables, 3 endpoints, 0 logique
// → Prototype ou MVP jetable avec un horizon de 2 semaines
// → Microservice mono-responsabilité très ciblé
// → Équipe solo, horizon court, pas de tests

// 👉 MarketFlow : 2 features avec de vraies règles métier
//    (invariants sur Product, agrégat Cart avec fusion, PBAC)
//    → Clean Architecture est justifiée ici`
        },
        { type:'concept', num:'04', title:'Limites et compromis — soyons honnêtes',
          text:`La Clean Architecture n'est pas gratuite. Ces coûts sont réels et doivent être connus pour éviter l'over-engineering là où ce n'est pas nécessaire :`,
          code:`// 1. Volume de fichiers
//    Une feature simple = 4-6 fichiers au lieu de 1-2
//    Sur 20 features → 80-120 fichiers à maintenir et tracer

// 2. Mapping et boilerplate
//    Product → ProductDto doit être maintenu en synchronisation
//    Risque : oublier de propager un champ lors d'un refactor

// 3. Tracabilité pour les nouveaux développeurs
//    Pour comprendre un endpoint : API → Application → Domain → Infrastructure
//    Un nouveau développeur peut se perdre dans les 4 couches

// 4. Over-abstraction — le piège le plus courant
// ❌ interface IProductNameValidator { bool IsValid(string name); }
//    → 2 fichiers pour une règle qui tient en une ligne dans l'entité

// ✅ La règle directement dans Product.Create() :
//    if (string.IsNullOrWhiteSpace(name)) throw new DomainException(...)

// 5. Coût initial de scaffolding
//    La première feature prend plus de temps à livrer
//    Le ROI arrive sur les features 2, 3, 4...

// Règle d'or : une interface n'est justifiée que si :
// a) vous avez (ou aurez) plusieurs implémentations, OU
// b) vous devez mocker la dépendance dans les tests unitaires`
        },
        { type:'concept', num:'05', title:'Vertical Slice Architecture — le pattern choisi pour MarketFlow',
          text:`<strong>Pour MarketFlow, nous appliquons Vertical Slice à l'intérieur des couches Clean Architecture — c'est le seul pattern d'organisation que nous utiliserons.</strong>
<br><br>La <strong>Vertical Slice Architecture</strong> (Jimmy Bogard, 2018) organise le code par <strong>feature</strong> plutôt que par sous-type technique. Chaque use case est un <em>silo autonome</em> : command, handler, validator, endpoint et tests cohabitent dans un seul dossier. Ajouter une feature = créer un dossier. Supprimer une feature = <code>rm -rf Features/ProductManagement/CreateProduct</code> — rien d'autre n'est touché.
<br><br>Clean Architecture définit les <em>couches macro</em> de la solution (Domain, Application, Infrastructure, API). Vertical Slice définit comment les features sont organisées <em>à l'intérieur</em> de ces couches. Les deux travaillent ensemble : la règle de dépendance de CA protège le Domain ; VS protège la cohésion de chaque use case.`,
          code:`// Organisation des features dans MarketFlow — Vertical Slice
// Chaque use case vit dans son propre dossier : command, handler, validator au même endroit.
// Modifier une feature → travailler dans un seul dossier. Jamais besoin de sauter entre
// Commands/, Handlers/, Validators/ en parallèle.

Application/
  Features/
    ProductManagement/
      CreateProduct/
        CreateProductCommand.cs    ← command + règles de validation
        CreateProductHandler.cs    ← logique métier du use case
        CreateProductValidator.cs  ← FluentValidation
      GetProducts/
        GetProductsQuery.cs
        GetProductsHandler.cs
    CartManagement/
      AddToCart/
        AddToCartCommand.cs
        AddToCartHandler.cs
      GetCart/
        GetCartQuery.cs
        GetCartHandler.cs

// Même logique côté API — chaque endpoint dans son feature folder
API/
  Features/
    ProductManagement/
      CreateProduct/
        CreateProductEndpoint.cs   ← MapPost("/api/products")
      GetProducts/
        GetProductsEndpoint.cs     ← MapGet("/api/products")
    CartManagement/
      AddToCart/
        AddToCartEndpoint.cs
      GetCart/
        GetCartEndpoint.cs`
        },
        { type:'concept', num:'06', title:'À quel niveau appliquer Vertical Slice ?',
          text:`Vertical Slice s'applique à différentes granularités selon la taille et l'évolution prévue du projet. Pour MarketFlow (Round 1→2), on l'applique au <strong>niveau use case</strong> — le niveau le plus fin, le plus adapté à notre périmètre de 4 use cases.`,
          code:`// Niveau use case (MarketFlow — Round 1→2)
// Granularité fine, idéal pour 5-30 use cases
Features/
  ProductManagement/
    CreateProduct/   ← command + handler + validator + endpoint
    GetProducts/     ← query + handler + endpoint
  CartManagement/
    AddToCart/       ← command + handler + endpoint
    GetCart/         ← query + handler + endpoint

// Niveau module (évolution future — Round 3+)
// Utile quand les features d'un domaine partagent beaucoup de code
// ou qu'on envisage une séparation en services
Modules/
  Products/
    Domain/      ← entités Products
    Application/ ← handlers Products
    Data/        ← ProductsDbContext séparé (optionnel)
  Cart/
    Domain/
    Application/
    Data/

// Niveau microservice (hors périmètre Round 1→2)
// Chaque bounded context est un projet/service autonome déployable`
        },
        { type:'concept', num:'07', title:'Pourquoi les endpoints ne vont pas dans Application',
          text:`La couche Application doit être <em>UI-agnostique</em>. Un handler doit pouvoir être appelé depuis HTTP, un background job, une CLI, ou un test unitaire — <strong>sans modification</strong>. Si vous mettez <code>Results.Ok()</code>, <code>HttpContext</code> ou <code>StatusCodes.*</code> dans un handler, vous couplez la logique métier à ASP.NET Core 10.
<br><br><strong>Conséquences concrètes :</strong> vos tests unitaires doivent mocker ASP.NET, vous ne pouvez pas appeler le handler depuis un background service, ajouter une CLI d'import en masse devient impossible sans dupliquer le code.`,
          code:`// ❌ Mauvais — HttpContext et IResult dans Application
public class CreateProductHandler
{
    public async Task<IResult> Handle(CreateProductCommand cmd, ...)
    {
        var product = Product.Create(cmd.Name, cmd.Price, cmd.Stock);
        await _repo.AddAsync(product);
        return Results.Created($"/api/products/{product.Id}", product);
        // ↑ impossible à appeler depuis une CLI ou un BackgroundService
    }
}

// ✅ Correct — handler UI-agnostique, retourne une valeur métier
public class CreateProductHandler : IRequestHandler<CreateProductCommand, Guid>
{
    public async Task<Guid> Handle(CreateProductCommand cmd, CancellationToken ct)
    {
        var product = Product.Create(cmd.Name, cmd.Price, cmd.Stock);
        await _repo.AddAsync(product, ct);
        return product.Id;  // ← valeur métier pure, rien d'ASP.NET
    }
}

// ✅ L'endpoint dans API — responsable de la traduction HTTP
app.MapPost("/api/products", async (CreateProductCommand cmd, ISender s) =>
{
    var id = await s.Send(cmd);
    return Results.Created($"/api/products/{id}", new { id });
    // ↑ la couche API traduit la valeur métier en réponse HTTP
});`
        },
        { type:'concept', num:'08', title:'Le même handler, plusieurs types d\'UI',
          text:`La séparation Application / API rend la logique métier <strong>réutilisable</strong> à travers n'importe quel type d'interface. Que MarketFlow ajoute un frontend Blazor, une MVC admin, une CLI d'import, ou expose ses données via gRPC — le handler ne change pas. Seul le point d'entrée change.`,
          code:`// Le MÊME CreateProductHandler — appelé depuis trois contextes différents

// ── 1. Minimal API (MarketFlow actuel) ─────────────────────
app.MapPost("/api/products",
    async (CreateProductCommand cmd, ISender s) => {
        var id = await s.Send(cmd);
        return Results.Created($"/api/products/{id}", new { id });
    });

// ── 2. MVC Controller (si routing complexe ou conventions Razor) ─
[ApiController, Route("api/[controller]")]
public class ProductsController(ISender sender) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Create(CreateProductCommand cmd)
    {
        var id = await sender.Send(cmd);
        return CreatedAtAction(nameof(GetById), new { id }, new { id });
    }
}

// ── 3. CLI / BackgroundService (import en masse) ────────────
var sender = host.Services.GetRequiredService<ISender>();
foreach (var row in csvRows)
    await sender.Send(new CreateProductCommand(row.Name, row.Price, row.Stock));

// CreateProductHandler est identique dans les trois cas.`
        },
        { type:'concept', num:'09', title:'Organisation finale des endpoints dans MarketFlow',
          text:`Pour MarketFlow on utilise Minimal API avec des <strong>classes d'extension par feature</strong>. Chaque feature expose une méthode <code>MapXxx(this IEndpointRouteBuilder)</code>. <code>Program.cs</code> chaîne les extensions — il orchestre sans connaître les détails de chaque endpoint.`,
          code:`// MarketFlow.API — structure finale
📁 Features/
  📁 ProductManagement/
    📁 CreateProduct/
      📄 CreateProductEndpoint.cs   ← MapPost("/api/products")
    📁 GetProducts/
      📄 GetProductsEndpoint.cs     ← MapGet("/api/products")
  📁 CartManagement/
    📁 AddToCart/
      📄 AddToCartEndpoint.cs       ← MapPost("/api/cart/items")
    📁 GetCart/
      📄 GetCartEndpoint.cs         ← MapGet("/api/cart")
📄 Program.cs

// CreateProductEndpoint.cs
public static class CreateProductEndpoint
{
    public static IEndpointRouteBuilder MapCreateProduct(
        this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/products",
            async (CreateProductCommand cmd, ISender s) =>
            {
                var id = await s.Send(cmd);
                return Results.Created($"/api/products/{id}", new { id });
            })
           .RequireAuthorization()              // endpoint protégé — token valide requis
           .WithName("CreateProduct")
           .Produces<Guid>(StatusCodes.Status201Created)
           .ProducesValidationProblem();
        return app;
    }
}

// Program.cs — orchestration uniquement
app.MapCreateProduct()
   .MapGetProducts()
   .MapAddToCart()
   .MapGetCart();`
        },
        { type:'concept', num:'10', title:'MediatR — le bus de commandes CQRS',
          text:`<strong>MediatR</strong> (Jimmy Bogard, même auteur que AutoMapper) est le bus qui connecte les endpoints aux handlers. Il implémente le pattern <strong>CQRS</strong> : on distingue les <em>Commands</em> (mutations) des <em>Queries</em> (lectures) — chacun implémente <code>IRequest&lt;TResponse&gt;</code>. L'endpoint appelle <code>ISender.Send()</code> sans connaître le handler concret ; MediatR résout le bon handler via le DI.
<br><br><strong>Avantage clé :</strong> le pipeline MediatR (via <code>IPipelineBehavior&lt;TRequest,TResponse&gt;</code>) permet d'injecter des comportements transversaux — validation FluentValidation, logging, gestion des exceptions — <em>entre</em> l'endpoint et le handler, sans modifier ni l'un ni l'autre.`,
          code:`// Les trois interfaces MediatR à connaître :
// 1. IRequest<TResponse> — marque un message (command ou query)
// 2. IRequestHandler<TRequest,TResponse> — traite un message
// 3. ISender — dispatche le message au bon handler (injecter dans les endpoints)

// COMMAND (mutation — retourne un résultat)
public record CreateProductCommand(string Name, decimal Price, int Stock)
    : IRequest<Guid>;

// QUERY (lecture — retourne des données)
public record GetProductsQuery(int Page = 1, int PageSize = 20)
    : IRequest<PagedResult<ProductDto>>;

// HANDLER via IRequestHandler<TRequest, TResponse>
public class CreateProductHandler(IProductRepository repo)
    : IRequestHandler<CreateProductCommand, Guid>
{
    public async Task<Guid> Handle(CreateProductCommand cmd, CancellationToken ct)
    {
        var p = Product.Create(cmd.Name, cmd.Price, cmd.Stock);
        await repo.AddAsync(p, ct);
        return p.Id;
    }
}

// ENDPOINT — ISender comme seule dépendance sur MediatR
app.MapPost("/api/products",
    async (CreateProductCommand cmd, ISender sender) =>
    {
        var id = await sender.Send(cmd);   // MediatR résout CreateProductHandler
        return Results.Created(\$"/api/products/{id}", new { id });
    });

// Enregistrement dans DI (ApplicationAssemblyMarker = classe vide dans Application)
services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssembly(typeof(ApplicationAssemblyMarker).Assembly));

// Pipeline Behavior — traitement transversal AVANT le handler
// Exemple : ValidationBehavior vérifie la command avant de l'envoyer au handler
public class ValidationBehavior<TRequest, TResponse>(IValidator<TRequest>? validator = null)
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    public async Task<TResponse> Handle(
        TRequest req, RequestHandlerDelegate<TResponse> next, CancellationToken ct)
    {
        if (validator is null) return await next();  // pas de validator → passer directement
        var result = await validator.ValidateAsync(req, ct);
        if (!result.IsValid)
            throw new ValidationException(result.Errors);
        return await next();  // validation OK → handler
    }
}

// Enregistrement du behavior dans DI :
services.AddMediatR(cfg => {
    cfg.RegisterServicesFromAssembly(typeof(ApplicationAssemblyMarker).Assembly);
    cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
});`
        }
      ]
    },
    oopdi:{
      title:'OOP & DI — Entités encapsulées et injection de dépendances',
      blocks:[
        { type:'concept', num:'01', title:'OOP — Entité Product encapsulée',
          text:`Une entité sans encapsulation est une structure C déguisée en objet. On protège les données avec des <strong>setters privés</strong>, on valide les invariants dans une <strong>factory method statique</strong>, et on expose le comportement via des <strong>méthodes publiques</strong>. Le constructeur privé est requis par EF Core 10 pour reconstituer l'objet depuis la base sans passer par la factory.`,
          code:`public sealed class Product : BaseEntity<Guid>
{
    public string Name    { get; private set; }
    public decimal Price  { get; private set; }
    public int Stock      { get; private set; }

    private Product() { } // EF Core 10 — reconstitution depuis la DB

    public static Product Create(string name, decimal price, int stock)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new DomainException("Name is required");
        if (price <= 0)
            throw new DomainException("Price must be positive");
        if (stock < 0)
            throw new DomainException("Stock cannot be negative");

        return new() { Id = Guid.NewGuid(), Name = name, Price = price, Stock = stock };
    }

    public void UpdatePrice(decimal newPrice)
    {
        if (newPrice <= 0) throw new DomainException("Price must be positive");
        Price = newPrice;
    }

    public void DecrementStock(int quantity)
    {
        if (quantity > Stock) throw new DomainException("Insufficient stock");
        Stock -= quantity;
    }
}`
        },
        { type:'concept', num:'02', title:'OOP — Agrégat Cart',
          text:`<code>Cart</code> est un <strong>agrégat</strong> : il contrôle ses <code>CartItem</code>s. On ne manipule jamais un <code>CartItem</code> directement depuis l'extérieur — toujours via les méthodes de <code>Cart</code>. La règle de fusion (si le produit existe déjà, on augmente la quantité) est centralisée dans <code>AddItem()</code>. <code>Total</code> est une propriété calculée — elle ne peut pas être désynchronisée des données réelles.`,
          code:`public sealed class Cart : BaseEntity<Guid>
{
    public Guid CustomerId { get; private set; }
    private readonly List<CartItem> _items = new();
    public IReadOnlyList<CartItem> Items => _items.AsReadOnly();

    // Calculé dynamiquement — jamais stocké en base
    public decimal Total => _items.Sum(i => i.Quantity * i.UnitPrice);

    private Cart() { }

    public static Cart Create(Guid customerId)
        => new() { Id = Guid.NewGuid(), CustomerId = customerId };

    public void AddItem(Guid productId, string name, decimal price, int qty)
    {
        if (qty <= 0) throw new DomainException("Quantity must be positive");

        // Règle métier : fusionner si le produit existe déjà
        var existing = _items.FirstOrDefault(i => i.ProductId == productId);
        if (existing is not null)
            existing.IncreaseQuantity(qty);
        else
            _items.Add(CartItem.Create(productId, name, price, qty));
    }

    public void RemoveItem(Guid productId)
        => _items.RemoveAll(i => i.ProductId == productId);
}`
        },
        { type:'concept', num:'03', title:'BaseEntity&lt;TId&gt; et DomainException — fondations du Domain',
          text:`Toutes les entités héritent de <strong>BaseEntity&lt;TId&gt;</strong> qui centralise l\'identifiant typé et l\'horodatage de création. On utilise un générique pour <code>TId</code> afin de ne pas forcer <code>Guid</code> partout (certaines entités peuvent préférer <code>int</code> ou <code>string</code>).
<br><br><strong>DomainException</strong> est une exception <em>métier</em>, distincte des exceptions techniques du framework. Elle traverse les couches jusqu\'à l\'API qui la convertit en réponse 400. Les handlers interceptent les <code>DomainException</code> pour les retourner proprement ; les vraies exceptions techniques (<code>NullReferenceException</code>, timeout DB) remontent normalement et produisent un 500.`,
          code:`// Domain/Common/BaseEntity.cs
public abstract class BaseEntity<TId>
{
    public TId    Id        { get; protected set; } = default!;
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

    // EF Core compare les entités par Id de base (pas de référence)
    public override bool Equals(object? obj)
        => obj is BaseEntity<TId> other && EqualityComparer<TId>.Default.Equals(Id, other.Id);
    public override int GetHashCode() => Id!.GetHashCode();
}

// Domain/Exceptions/DomainException.cs
public sealed class DomainException : Exception
{
    public DomainException(string message) : base(message) { }
}

// Application/Exceptions/NotFoundException.cs  (exception applicative — pas métier)
public sealed class NotFoundException : Exception
{
    public NotFoundException(string entity, object id)
        : base(\$"{entity} '{id}' was not found.") { }
}

// API — middleware global qui traduit les exceptions en réponses HTTP
// Dans Program.cs, après builder.Build() :
app.UseExceptionHandler(err => err.Run(async ctx =>
{
    var ex = ctx.Features.Get<IExceptionHandlerFeature>()?.Error;
    ctx.Response.StatusCode = ex switch
    {
        DomainException    => 400,
        NotFoundException  => 404,
        UnauthorizedAccessException => 401,
        _ => 500
    };
    await ctx.Response.WriteAsJsonAsync(new { error = ex?.Message });
}));`
        },
        { type:'concept', num:'04', title:'DI — Injection de dépendances par couche',
          text:`Chaque couche expose une méthode d'extension <code>AddXxxLayer(this IServiceCollection)</code> qui enregistre ses propres services. <code>Program.cs</code> les chaîne sans connaître les détails d'implémentation. Les <strong>interfaces</strong> sont définies dans Application, les <strong>implémentations</strong> dans Infrastructure. Cette séparation permet de substituer les implémentations (InMemory pour les tests, EF Core 10 en production) sans toucher à la couche Application.`,
          code:`// Program.cs — orchestre sans connaître les détails
builder.Services
    .AddApplicationLayer()
    .AddInfrastructureLayer(builder.Configuration);

// Application/DependencyInjection.cs
// ApplicationAssemblyMarker : classe vide qui sert de repère pour Assembly.GetExecutingAssembly()
// Elle évite de dépendre d'un type concret de handler pour trouver l'assembly.
public sealed class ApplicationAssemblyMarker { }

public static IServiceCollection AddApplicationLayer(this IServiceCollection s)
    => s.AddMediatR(cfg =>
           cfg.RegisterServicesFromAssembly(typeof(ApplicationAssemblyMarker).Assembly));

// Infrastructure/DependencyInjection.cs
public static IServiceCollection AddInfrastructureLayer(
    this IServiceCollection s, IConfiguration cfg)
    => s.AddScoped<IProductRepository, ProductRepository>()
        .AddScoped<ICartRepository, CartRepository>();

// Application/Interfaces/IProductRepository.cs — dans Application, pas Infrastructure
public interface IProductRepository
{
    Task<IEnumerable<Product>> GetAllAsync(CancellationToken ct = default);
    Task<Product?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task AddAsync(Product product, CancellationToken ct = default);
    Task<int> CountAsync(CancellationToken ct = default);                           // ← pagination
    Task<IEnumerable<Product>> GetPagedAsync(int page, int size, CancellationToken ct = default); // ← pagination
}`
        }
      ]
    },
    guide:{
      title:'Guide Solution — Scaffolding de la solution 4 couches',
      steps:[
        { num:1, title:'Créer la solution et les 4 projets',
          desc:'On crée un fichier <code>.sln</code> à la racine, puis les 4 projets. Domain et Application sont des <code>classlib</code> purs. Infrastructure et API reçoivent leurs références ensuite.',
          code:`mkdir MarketFlow && cd MarketFlow
dotnet new sln -n MarketFlow

dotnet new classlib -n MarketFlow.Domain
dotnet new classlib -n MarketFlow.Application
dotnet new classlib -n MarketFlow.Infrastructure
dotnet new webapi   -n MarketFlow.API

dotnet sln add MarketFlow.Domain/MarketFlow.Domain.csproj
dotnet sln add MarketFlow.Application/MarketFlow.Application.csproj
dotnet sln add MarketFlow.Infrastructure/MarketFlow.Infrastructure.csproj
dotnet sln add MarketFlow.API/MarketFlow.API.csproj`
        },
        { num:2, title:'Configurer les références de projet (.csproj)',
          desc:'La règle de dépendance se traduit en références <code>.csproj</code>. Domain n\'a aucune référence. Le compilateur empêche tout cycle.',
          code:`# Application → Domain seulement
dotnet add MarketFlow.Application reference MarketFlow.Domain

# Infrastructure → Application + Domain
dotnet add MarketFlow.Infrastructure reference MarketFlow.Application
dotnet add MarketFlow.Infrastructure reference MarketFlow.Domain

# API → tous
dotnet add MarketFlow.API reference MarketFlow.Application
dotnet add MarketFlow.API reference MarketFlow.Infrastructure
dotnet add MarketFlow.API reference MarketFlow.Domain

# Vérifier que Domain ne référence RIEN :
dotnet list MarketFlow.Domain reference
# → "There are no Project to Project references"`
        },
        { num:3, title:'Installer les packages NuGet par couche',
          desc:'Chaque couche reçoit uniquement les packages dont elle a besoin. Domain : aucun. Application : MediatR + FluentValidation. Infrastructure : EF Core. API : OpenAPI.',
          code:`# Application
cd MarketFlow.Application
dotnet add package MediatR
dotnet add package FluentValidation

# Infrastructure — EF Core (SQL Server ajouté en Phase 02)
cd ../MarketFlow.Infrastructure
dotnet add package Microsoft.EntityFrameworkCore

# API
cd ../MarketFlow.API
dotnet add package Microsoft.AspNetCore.OpenApi`
        },
        { num:4, title:'Créer la structure Domain',
          desc:'Trois dossiers dans Domain : <code>Common/</code>, <code>Entities/</code>, <code>Exceptions/</code>. Aucun <code>using</code> vers EF Core, ASP.NET ou System.Text.Json ne doit apparaître dans ces fichiers.',
          code:`# MarketFlow.Domain/
mkdir Common      # → BaseEntity<TId>
mkdir Entities    # → Product.cs, Cart.cs, CartItem.cs
mkdir Exceptions  # → DomainException.cs`
        },
        { num:5, title:'Créer la structure Application — Vertical Slice',
          desc:'Organisation Vertical Slice : chaque use case dans son propre dossier. Les interfaces des repositories sont déclarées ici — jamais dans Infrastructure.',
          code:`# MarketFlow.Application/
mkdir -p Features/ProductManagement/CreateProduct
mkdir -p Features/ProductManagement/GetProducts
mkdir -p Features/CartManagement/AddToCart
mkdir -p Features/CartManagement/GetCart
mkdir Interfaces   # IProductRepository, ICartRepository
mkdir Exceptions   # NotFoundException (404 applicatif)

# DependencyInjection.cs + ApplicationAssemblyMarker.cs à la racine`
        },
        { num:6, title:'Créer la structure API — Features + Program.cs minimal',
          desc:'Supprimer le WeatherForecast par défaut. Program.cs délègue au DI par couche et reste sous 30 lignes.',
          code:`# Supprimer le boilerplate webapi
rm MarketFlow.API/WeatherForecast.cs

# Dossiers Vertical Slice côté API
mkdir -p MarketFlow.API/Features/ProductManagement/CreateProduct
mkdir -p MarketFlow.API/Features/ProductManagement/GetProducts
mkdir -p MarketFlow.API/Features/CartManagement/AddToCart
mkdir -p MarketFlow.API/Features/CartManagement/GetCart

// Program.cs de départ (< 20 lignes)
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddApplicationLayer()         // MediatR, behaviors
    .AddInfrastructureLayer(builder.Configuration)  // repos
    .AddOpenApi();
var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();
app.MapOpenApi();
app.MapHealth();
app.Run();`
        },
        { num:7, title:'Vérifier dotnet build sans erreurs',
          desc:'Avant d\'écrire de la logique métier, la solution doit compiler proprement. Pas de warning de référence circulaire, pas de type manquant.',
          code:`# Depuis la racine de la solution
dotnet build

# Attendu : BUILD SUCCEEDED
# Si "circular dependency" → Domain référence quelque chose en trop
# Si CS0246 dans Application → référence vers Domain manquante

# Créer aussi le projet de tests :
dotnet new xunit -n MarketFlow.UnitTests
dotnet sln add MarketFlow.UnitTests/MarketFlow.UnitTests.csproj
dotnet add MarketFlow.UnitTests reference MarketFlow.Application
dotnet add MarketFlow.UnitTests reference MarketFlow.Domain
cd MarketFlow.UnitTests
dotnet add package NSubstitute
dotnet add package FluentAssertions`
        }
      ]
    },
    exercices:[
      { n:1, title:'Scaffolder la solution 4 couches',
        desc:'Créer le fichier <code>.sln</code> et les 4 projets avec les références croisées correctes. Vérifier que Domain ne référence aucun autre projet avec <code>dotnet list reference</code>.',
        hint:'dotnet new sln -n MarketFlow && dotnet new classlib -n MarketFlow.Domain — répéter pour les 3 autres, puis dotnet sln add pour chacun.',
        commit:'"feat(infra): scaffold MarketFlow 4-layer clean architecture solution"'
      },
      { n:2, title:'Créer BaseEntity et l\'entité Product',
        desc:'Implémenter <code>BaseEntity&lt;TId&gt;</code> avec <code>Id</code> et <code>CreatedAt</code>. Puis <code>Product</code> avec factory method, setters privés, <code>UpdatePrice()</code> et <code>DecrementStock()</code>. Vérifier que les invariants lèvent bien <code>DomainException</code>.',
        commit:'"feat(products): add Product domain entity with factory method and invariants"'
      },
      { n:3, title:'Créer l\'agrégat Cart',
        desc:'Implémenter <code>Cart</code> avec <code>AddItem()</code> (fusion si doublon), <code>RemoveItem()</code> et la propriété calculée <code>Total</code>. Implémenter aussi <code>CartItem</code> avec <code>IncreaseQuantity()</code>.',
        commit:'"feat(cart): add Cart aggregate with merge-on-duplicate AddItem logic"'
      },
      { n:4, title:'Interfaces, stubs InMemory et DI par couche',
        desc:'Créer <code>IProductRepository</code> et <code>ICartRepository</code> dans Application. Créer les stubs InMemory dans Infrastructure. Configurer les méthodes <code>AddApplicationLayer()</code> et <code>AddInfrastructureLayer()</code>.',
        commit:'"feat(infra): add repository interfaces, in-memory stubs and layered DI"'
      },
      { n:5, title:'Organisation des endpoints — GET /health et structure Vertical Slice',
        desc:'Créer l\'endpoint <code>GET /health</code> en suivant le pattern extension : une classe <code>HealthEndpoint</code> avec <code>MapHealth(this IEndpointRouteBuilder)</code>. Créer la structure de dossiers <code>Features/ProductManagement/</code> et <code>Features/CartManagement/</code> dans MarketFlow.API.',
        hint:'app.MapGet("/health", () => Results.Ok(new { project = "MarketFlow", status = "healthy" })) — dans une méthode extension sur IEndpointRouteBuilder.',
        commit:'"feat(infra): add health endpoint with extension pattern and vertical slice structure"'
      }
    ],
    proj:{
      kpis:{ 'Use cases':'0/4', 'Tests':'0', 'Endpoints':'1', 'Sécurité':'✗' },
      files:`📁 src/
  📁 MarketFlow.Domain/                 <span class="f-new">[NEW]</span>
    📄 Entities/Product.cs              <span class="f-new">[NEW]</span> factory, setters privés
    📄 Entities/Cart.cs                 <span class="f-new">[NEW]</span> agrégat, AddItem() merge
    📄 Entities/CartItem.cs             <span class="f-new">[NEW]</span>
    📄 Common/BaseEntity.cs             <span class="f-new">[NEW]</span>
    📄 Exceptions/DomainException.cs    <span class="f-new">[NEW]</span>
  📁 MarketFlow.Application/            <span class="f-new">[NEW]</span>
    📄 Interfaces/IProductRepository.cs <span class="f-new">[NEW]</span>
    📄 Interfaces/ICartRepository.cs    <span class="f-new">[NEW]</span>
    📄 DependencyInjection.cs           <span class="f-new">[NEW]</span>
  📁 MarketFlow.Infrastructure/         <span class="f-new">[NEW]</span>
    📄 Repositories/InMemory*.cs        <span class="f-new">[NEW]</span> stubs
    📄 DependencyInjection.cs           <span class="f-new">[NEW]</span>
  📁 MarketFlow.API/                    <span class="f-new">[NEW]</span>
    📁 Features/                        <span class="f-new">[NEW]</span> structure Vertical Slice
      📁 ProductManagement/             <span class="f-new">[NEW]</span>
      📁 CartManagement/                <span class="f-new">[NEW]</span>
    📄 Endpoints/HealthEndpoint.cs      <span class="f-new">[NEW]</span> extension pattern
    📄 Program.cs                       <span class="f-new">[NEW]</span>`,
      uc:[
        { f:'Product Management', color:'#5ba8ff', items:[{l:'CreateProduct',s:'todo'},{l:'GetProducts',s:'todo'}] },
        { f:'Cart Management',    color:'#2dd4a0', items:[{l:'AddToCart',s:'todo'},{l:'GetCart',s:'todo'}] },
      ],
      milestone:'<code>dotnet build</code> passe. Structure Vertical Slice en place dans API. <code>GET /health</code> → 200 via extension endpoint. Entités rejettent les données invalides via <code>DomainException</code>.'
    }
  }
},
// ══ PHASE 02 ══════════════════════════════════════════════════
{ code:'02', name:'Aspire + Data', color:'#2dd4a0',
  desc:'.NET Aspire orchestration, SQL Server avec volume, EF Core',
  badges:['.NET Aspire','SQL Server','EF Core','Migrations','Volume'],
  tabs:['Cours','Guide Aspire','Exercices','Projet','Liens utiles'],
  sections:{
    cours:{
      title:'Cours — .NET Aspire et EF Core',
      blocks:[
        { type:'concept', num:'01', title:'Qu\'est-ce que .NET Aspire ?',
          text:`<strong>.NET Aspire</strong> est un stack d'orchestration pour applications distribuées .NET. Il remplace la configuration manuelle de SQL Server, Redis, etc. par du code C#. Vous déclarez vos ressources dans un projet <em>AppHost</em>, et Aspire s'occupe de les lancer (en Docker), d'injecter les connection strings, et de les surveiller via son dashboard intégré.
Pour MarketFlow, Aspire lance SQL Server dans Docker et injecte automatiquement la connection string dans l'API — sans fichier <code>appsettings.Development.json</code> à modifier.`,
          code:`# Sans Aspire : 3 étapes manuelles avant de coder
docker run -e ACCEPT_EULA=Y -e SA_PASSWORD=... -p 1433:1433 mcr.microsoft.com/mssql/server
# modifier appsettings.json avec la connection string
# espérer que tout le monde l'a fait pareil

# Avec Aspire : une seule commande
dotnet run --project AppHost
# → SQL Server démarre, connection string injectée, dashboard ouvert`
        },
        { type:'concept', num:'02', title:'AppHost — orchestration en C#',
          text:`L'AppHost est un projet console normal qui référence <code>Aspire.Hosting</code>. On y déclare les ressources et leurs relations. <code>WithReference()</code> dit à l'API "tu connais cette base de données". <code>WithDataVolume()</code> persiste les données SQL Server entre les redémarrages — sans ça, la base repart de zéro à chaque fois.`,
          code:`// AppHost/Program.cs
var builder = DistributedApplication.CreateBuilder(args);

// SQL Server avec un volume Docker nommé
// Les données survivent aux redémarrages de l'AppHost
var sql = builder.AddSqlServer("sqlserver")
                 .WithDataVolume("marketflow-sqldata")   // ← persistance
                 .AddDatabase("marketflowdb");

builder.AddProject<Projects.MarketFlow_API>("api")
       .WithReference(sql)    // injecte ConnectionStrings__marketflowdb
       .WaitFor(sql);         // attend que SQL Server soit healthy

builder.Build().Run();`
        },
        { type:'concept', num:'03', title:'EF Core — Fluent API sans polluer le Domain',
          text:`On n'utilise pas les annotations (<code>[Required]</code>, <code>[MaxLength]</code>) sur les entités Domain — cela créerait une dépendance vers EF Core dans le Domain. On utilise la <strong>Fluent API</strong> dans des classes <code>IEntityTypeConfiguration&lt;T&gt;</code> dans Infrastructure. EF Core accède aux champs privés (<code>_items</code>) via <code>UsePropertyAccessMode(PropertyAccessMode.Field)</code>.`,
          code:`public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> b)
    {
        b.ToTable("products");
        b.HasKey(p => p.Id);
        b.Property(p => p.Name).HasMaxLength(200).IsRequired();
        b.Property(p => p.Price).HasColumnType("decimal(18,2)");
        b.Property(p => p.Stock).IsRequired();
    }
}

public class CartConfiguration : IEntityTypeConfiguration<Cart>
{
    public void Configure(EntityTypeBuilder<Cart> b)
    {
        b.ToTable("carts");
        b.HasKey(c => c.Id);
        b.Ignore(c => c.Total); // propriété calculée, pas de colonne

        // Accès au champ privé _items de l'agrégat
        b.HasMany(c => c.Items)
         .WithOne()
         .HasForeignKey("CartId")
         .OnDelete(DeleteBehavior.Cascade);
        b.Navigation(c => c.Items)
         .UsePropertyAccessMode(PropertyAccessMode.Field);
    }
}

public class CartItemConfiguration : IEntityTypeConfiguration<CartItem>
{
    public void Configure(EntityTypeBuilder<CartItem> b)
    {
        b.ToTable("cart_items");
        b.HasKey(i => i.Id);
        b.Property(i => i.ProductName).HasMaxLength(200).IsRequired();
        b.Property(i => i.UnitPrice).HasColumnType("decimal(18,2)");
        b.Property(i => i.Quantity).IsRequired();
        // CartId est une shadow property (FK vers carts)
    }
}`
        },
        { type:'concept', num:'04', title:'Migrations — appliquées automatiquement',
          text:`On crée un <code>MigrationService</code> qui s'exécute au démarrage de l'API et applique les migrations en attente. Aspire marque le projet comme <em>healthy</em> une fois ce service terminé — les premières requêtes HTTP arrivent donc toujours sur une base à jour.`,
          code:`// Infrastructure/Data/MigrationService.cs
public class MigrationService(IServiceScopeFactory scopeFactory)
    : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        using var scope = scopeFactory.CreateScope();
        var db = scope.ServiceProvider
                      .GetRequiredService<MarketFlowDbContext>();

        // Applique toutes les migrations non encore appliquées
        await db.Database.MigrateAsync(ct);
    }
}

// API/Program.cs
builder.Services.AddHostedService<MigrationService>();`
        },
        { type:'concept', num:'05', title:'ICartRepository complet — GetByCustomerIdAsync et UpsertAsync',
          text:`Les interfaces des repositories sont déclarées dans <strong>Application</strong>. Voici les deux interfaces complètes pour MarketFlow. <code>ICartRepository</code> expose un <code>UpsertAsync</code> — pas un <code>AddAsync</code> + <code>UpdateAsync</code> séparés — parce que le handler ne distingue pas "panier existant" (mise à jour) de "nouveau panier" (création) : c\'est la responsabilité du repository. <code>GetByCustomerIdAsync</code> retourne <code>null</code> si le client n\'a pas encore de panier.`,
          code:`// Application/Interfaces/IProductRepository.cs
public interface IProductRepository
{
    Task<Product?>           GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<IEnumerable<Product>> GetAllAsync(CancellationToken ct = default);
    Task<IEnumerable<Product>> GetPagedAsync(int page, int size, CancellationToken ct = default);
    Task<int>                CountAsync(CancellationToken ct = default);
    Task                     AddAsync(Product p, CancellationToken ct = default);
}

// Application/Interfaces/ICartRepository.cs
public interface ICartRepository
{
    // Retourne null si le client n'a pas encore de panier
    Task<Cart?> GetByCustomerIdAsync(string customerId, CancellationToken ct = default);

    // Retourne null si l'ID n'existe pas
    Task<Cart?> GetByIdAsync(Guid id, CancellationToken ct = default);

    // Upsert : crée si nouveau, met à jour si existant
    // Le handler ne distingue pas les deux cas — c'est la responsabilité du repo
    Task UpsertAsync(Cart cart, CancellationToken ct = default);
}

// Infrastructure/Repositories/CartRepository.cs — implémentation EF Core
public class CartRepository(MarketFlowDbContext db) : ICartRepository
{
    public async Task<Cart?> GetByCustomerIdAsync(string customerId, CancellationToken ct)
        => await db.Carts
            .Include(c => c.Items)
            .FirstOrDefaultAsync(c => c.CustomerId == customerId, ct);

    public async Task<Cart?> GetByIdAsync(Guid id, CancellationToken ct)
        => await db.Carts
            .Include(c => c.Items)
            .FirstOrDefaultAsync(c => c.Id == id, ct);

    public async Task UpsertAsync(Cart cart, CancellationToken ct)
    {
        // EF Core détermine automatiquement Insert vs Update via le tracking
        db.Carts.Update(cart);  // Update ajoute si non tracké, met à jour sinon
        await db.SaveChangesAsync(ct);
    }
}`
        }
      ]
    },
    guide:{
      title:'Guide — Installation Aspire & SQL Server pas à pas',
      steps:[
        { num:1, title:'Prérequis : Docker Desktop installé',
          desc:'Aspire lance SQL Server dans un container Docker. Docker Desktop doit être en cours d\'exécution.',
          code:`docker --version  # Docker version 24+ recommandé
# Vérifier que Docker est démarré :
docker ps  # doit afficher la liste des containers (vide est OK)`
        },
        { num:2, title:'Installer le CLI Aspire (Linux & Windows)',
          desc:'Le CLI Aspire remplace l\'ancien workload <code>dotnet workload install aspire</code>. Il s\'installe en une commande et gère les templates, la création de projets, et le lancement des applications.',
          code:`# Linux / macOS
curl -sSL https://aspire.dev/install.sh | bash

# Windows (PowerShell)
irm https://aspire.dev/install.ps1 | iex

# Valider l'installation (redémarrer le terminal si la commande n'est pas trouvée) :
aspire --version
# → 13.x.x+SHA (ex: 13.2.0+1465179b…)`
        },
        { num:3, title:'Installer l\'extension VS Code Aspire',
          desc:'L\'extension officielle Aspire (Microsoft) intègre le CLI dans VS Code : lancement F5 multi-services, dashboard intégré, débogage C#/Python/Node.js, et scaffolding de projets.',
          code:`# Dans VS Code :
# 1. Ouvrir la vue Extensions (Ctrl+Shift+X)
# 2. Rechercher "Aspire" → installer l'extension publiée par Microsoft
# 3. Ou directement depuis le Marketplace : https://aka.ms/aspire/vscode

# Prérequis : Aspire CLI + .NET 10+ + VS Code 1.98+

# Installer le CLI depuis VS Code (si pas encore fait) :
# Ctrl+Shift+P → "Aspire: Install Aspire CLI (stable)"

# Configurer le lancement (après création de l'AppHost) :
# Ctrl+Shift+P → "Aspire: Configure launch.json file"
# → F5 : démarre tous les services, attache les débogueurs, ouvre le dashboard`
        },
        { num:4, title:'Créer le projet AppHost',
          desc:'Deux approches : <strong>nouveau projet complet</strong> avec <code>aspire new</code> (CLI officiel, recommandé), ou <strong>ajout à une solution existante</strong> avec <code>dotnet new aspire-apphost</code>.',
          code:`# ─── Option A : Nouveau projet Aspire complet (template starter) ───
# Crée une solution avec AppHost, ApiService, Web frontend, ServiceDefaults
aspire new aspire-starter -n MarketFlow -o MarketFlow
cd ./MarketFlow

# L'AppHost généré (AppHost.cs) :
# var builder = DistributedApplication.CreateBuilder(args);
# var apiService = builder.AddProject<Projects.MarketFlow_ApiService>("apiservice")
#     .WithHttpHealthCheck("/health");
# builder.AddProject<Projects.MarketFlow_Web>("webfrontend")
#     .WithExternalHttpEndpoints()
#     .WithHttpHealthCheck("/health")
#     .WithReference(apiService)
#     .WaitFor(apiService);
# builder.Build().Run();

# Lancer immédiatement :
aspire run
# → 🔍 Finding apphosts...
# → Dashboard: https://localhost:17068/login?t=<token>
# → Ctrl+C pour arrêter

# ─── Option B : Ajouter un AppHost à une solution existante (MarketFlow) ───
# À la racine de la solution :
dotnet new aspire-apphost -n MarketFlow.AppHost
dotnet sln add MarketFlow.AppHost/MarketFlow.AppHost.csproj

# Ajouter la référence vers le projet API dans AppHost.csproj :
<ProjectReference Include="../MarketFlow.API/MarketFlow.API.csproj"
                  IsAspireProjectResource="true" />`
        },
        { num:5, title:'Ajouter le package SQL Server dans AppHost',
          desc:'Ce package ajoute la méthode <code>AddSqlServer()</code> au builder Aspire.',
          code:`cd MarketFlow.AppHost
dotnet add package Aspire.Hosting.SqlServer`
        },
        { num:6, title:'Configurer l\'AppHost avec le volume',
          desc:'Configurer SQL Server avec un volume Docker nommé pour persister les données. Sans <code>WithDataVolume()</code>, la base repart de zéro à chaque démarrage.',
          code:`// MarketFlow.AppHost/Program.cs
var builder = DistributedApplication.CreateBuilder(args);

var sql = builder.AddSqlServer("sqlserver")
    .WithDataVolume("marketflow-sqldata")  // ← données persistées
    .AddDatabase("marketflowdb");

builder.AddProject<Projects.MarketFlow_API>("api")
       .WithReference(sql)
       .WaitFor(sql);

builder.Build().Run();`
        },
        { num:7, title:'Ajouter EF Core dans Infrastructure',
          desc:'Installer les packages EF Core SQL Server dans le projet Infrastructure.',
          code:`cd ../MarketFlow.Infrastructure
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Design

# Dans l'API aussi (pour les migrations) :
cd ../MarketFlow.API
dotnet add package Microsoft.EntityFrameworkCore.Design`
        },
        { num:8, title:'Créer le DbContext et les configurations',
          desc:'Le DbContext utilise <code>ApplyConfigurationsFromAssembly()</code> pour découvrir automatiquement les classes <code>IEntityTypeConfiguration&lt;T&gt;</code>.',
          code:`// Infrastructure/Data/MarketFlowDbContext.cs
public class MarketFlowDbContext(DbContextOptions<MarketFlowDbContext> options)
    : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Cart> Carts => Set<Cart>();

    protected override void OnModelCreating(ModelBuilder model)
        => model.ApplyConfigurationsFromAssembly(typeof(MarketFlowDbContext).Assembly);
}

// Infrastructure/DependencyInjection.cs — enregistrer le DbContext
services.AddDbContext<MarketFlowDbContext>(options =>
    options.UseSqlServer(configuration.GetConnectionString("marketflowdb")));`
        },
        { num:9, title:'Générer la première migration',
          desc:'Les migrations sont générées depuis la racine de la solution avec les flags <code>--project</code> et <code>--startup-project</code>.',
          code:`# Depuis la racine de la solution
dotnet ef migrations add InitialSchema \
  --project MarketFlow.Infrastructure \
  --startup-project MarketFlow.API \
  --output-dir Data/Migrations

# Vérifier le SQL généré (fichier *_InitialSchema.cs) :
# → doit contenir CREATE TABLE [products] et CREATE TABLE [carts]`
        },
        { num:10, title:'Lancer l\'AppHost et vérifier',
          desc:'Le dashboard Aspire s\'ouvre automatiquement. <code>aspire run</code> (CLI, recommandé) trouve l\'AppHost automatiquement depuis la racine de la solution. Les deux ressources doivent être en état <em>Running</em> / <em>Healthy</em>.',
          code:`# ─── Méthode 1 : CLI Aspire (recommandé) ───
# Depuis la racine de la solution — trouve l'AppHost automatiquement
aspire run
# → 🔍 Finding apphosts...
#    AspireApp.AppHost/MarketFlow.AppHost.csproj
# → Dashboard: https://localhost:17068/login?t=<token>
# → Ctrl+C pour arrêter et fermer le dashboard

# ─── Méthode 2 : dotnet run classique ───
cd MarketFlow.AppHost
dotnet run
# → ouvre http://localhost:15000 (dashboard Aspire)

# ─── Résultats attendus ───
# → SQL Server démarre dans Docker
# → migrations appliquées au démarrage de l'API
# → GET http://localhost:5000/health → 200 OK
# → Données persistées entre redémarrages (WithDataVolume)`
        }
      ]
    },
    exercices:[
      { n:1, title:'Créer l\'AppHost et le configurer',
        desc:'Créer le projet <code>MarketFlow.AppHost</code>, ajouter le package SQL Server, et configurer SQL Server avec <code>WithDataVolume("marketflow-sqldata")</code>. Vérifier que le dashboard Aspire s\'ouvre.',
        hint:'Si Docker Desktop n\'est pas démarré, l\'AppHost échoue avec une erreur de connexion Docker.',
        commit:'"feat(infra): add Aspire AppHost with persistent SQL Server volume"'
      },
      { n:2, title:'Créer le DbContext et les configurations Fluent API',
        desc:'Implémenter <code>MarketFlowDbContext</code>, et les classes <code>ProductConfiguration</code> et <code>CartConfiguration</code>. Ne pas oublier <code>b.Ignore(c => c.Total)</code> sur Cart.',
        commit:'"feat(infra): add MarketFlowDbContext with EF Core Fluent API configurations"'
      },
      { n:3, title:'Générer la migration InitialSchema',
        desc:'Générer la première migration et inspecter le SQL généré. Vérifier que les tables <code>products</code>, <code>carts</code> et <code>cart_items</code> sont créées avec les bons types.',
        commit:'"feat(infra): add InitialSchema EF Core migration"'
      },
      { n:4, title:'Créer MigrationService et tester la persistance',
        desc:'Implémenter <code>MigrationService</code> et l\'enregistrer dans <code>Program.cs</code>. Lancer l\'AppHost, créer des données manuellement en SQL, redémarrer l\'AppHost, vérifier que les données sont toujours là.',
        hint:'Connexion directe à SQL Server : host=localhost,1433 avec les credentials Aspire (vérifiables dans le dashboard)',
        commit:'"feat(infra): add auto-migration service with Aspire lifecycle"'
      },
      { n:5, title:'Remplacer les stubs InMemory par EF Core',
        desc:'Implémenter <code>ProductRepository</code> et <code>CartRepository</code> avec EF Core. Remplacer les stubs InMemory dans le DI. Tester que <code>GET /health</code> répond toujours.',
        commit:'"feat(infra): implement EF Core repositories replacing in-memory stubs"'
      }
    ],
    proj:{
      kpis:{ 'Use cases':'0/4', 'Tests':'0', 'Endpoints':'1', 'Sécurité':'✗' },
      files:`📁 src/
  📁 MarketFlow.AppHost/                <span class="f-new">[NEW]</span>
    📄 Program.cs                        <span class="f-new">[NEW]</span> SQL Server + volume
  📁 MarketFlow.Infrastructure/         <span class="f-mod">[MOD]</span>
    📄 Data/MarketFlowDbContext.cs       <span class="f-new">[NEW]</span>
    📄 Data/Config/ProductConfig.cs      <span class="f-new">[NEW]</span> Fluent API
    📄 Data/Config/CartConfig.cs         <span class="f-new">[NEW]</span> Fluent API
    📄 Data/Migrations/InitialSchema     <span class="f-new">[NEW]</span>
    📄 Data/MigrationService.cs          <span class="f-new">[NEW]</span>
    📄 Repositories/ProductRepository.cs <span class="f-new">[NEW]</span> EF Core
    📄 Repositories/CartRepository.cs    <span class="f-new">[NEW]</span> EF Core`,
      uc:[
        { f:'Product Management', color:'#5ba8ff', items:[{l:'CreateProduct',s:'todo'},{l:'GetProducts',s:'todo'}] },
        { f:'Cart Management',    color:'#2dd4a0', items:[{l:'AddToCart',s:'todo'},{l:'GetCart',s:'todo'}] },
      ],
      milestone:'<code>aspire run</code> depuis la racine lance tout. Dashboard Aspire : deux ressources <em>healthy</em>. Données persistées entre redémarrages.'
    },
    liens:{
      categories:[
        { title:'Démarrage rapide', color:'#5ba8ff', items:[
          { label:'Documentation Aspire', url:'https://aspire.dev/docs/', desc:'Vue d\'ensemble officielle et guides' },
          { label:'Prérequis', url:'https://aspire.dev/get-started/prerequisites/', desc:'.NET 10+, Docker Desktop, VS Code 1.98+' },
          { label:'Installer le CLI', url:'https://aspire.dev/get-started/install-cli/', desc:'Script d\'installation Linux & Windows' },
          { label:'Extension VS Code', url:'https://aspire.dev/get-started/aspire-vscode-extension/', desc:'Run, debug, deploy sans quitter VS Code' },
          { label:'Créer sa première app (C# AppHost)', url:'https://aspire.dev/get-started/first-app-csharp-apphost/', desc:'aspire new + aspire run — guide officiel' },
        ]},
        { title:'AppHost & Intégrations', color:'#2dd4a0', items:[
          { label:'AppHost & Orchestration', url:'https://aspire.dev/get-started/app-host/', desc:'AddProject, WithReference, WaitFor' },
          { label:'Intégrations disponibles', url:'https://aspire.dev/integrations/', desc:'SQL Server, Redis, RabbitMQ, Azure...' },
          { label:'Service Defaults (C#)', url:'https://aspire.dev/get-started/csharp-service-defaults/', desc:'Observabilité et résilience partagées' },
          { label:'Ajouter Aspire à un projet existant', url:'https://aspire.dev/get-started/add-aspire-existing-app/', desc:'Intégration dans une solution .NET existante' },
        ]},
        { title:'Dashboard & Déploiement', color:'#fbbf24', items:[
          { label:'Dashboard Aspire', url:'https://aspire.dev/dashboard/overview/', desc:'Ressources, logs, traces, métriques en temps réel' },
          { label:'Déploiement — Vue d\'ensemble', url:'https://aspire.dev/deployment/overview/', desc:'Manifests, Bicep, Azure Container Apps' },
          { label:'Déployer sa première app', url:'https://aspire.dev/get-started/deploy-first-app/', desc:'aspire publish + aspire deploy' },
        ]},
        { title:'Référence CLI & Aide', color:'#a78bfa', items:[
          { label:'Référence CLI complète', url:'https://aspire.dev/reference/cli/overview/', desc:'Toutes les commandes aspire' },
          { label:'aspire new', url:'https://aspire.dev/reference/cli/commands/aspire-new/', desc:'Créer un projet depuis un template' },
          { label:'aspire run', url:'https://aspire.dev/reference/cli/commands/aspire-run/', desc:'Lancer l\'orchestration locale' },
          { label:'Troubleshooting', url:'https://aspire.dev/get-started/troubleshooting/', desc:'Problèmes courants et solutions' },
        ]},
        { title:'Communauté', color:'#f472a8', items:[
          { label:'GitHub microsoft/aspire', url:'https://github.com/microsoft/aspire', desc:'Code source, issues, discussions' },
          { label:'Discord Aspire', url:'https://discord.com/invite/raNPcaaSj8', desc:'Communauté en temps réel' },
          { label:'Blog .NET Aspire', url:'https://devblogs.microsoft.com/aspire', desc:'Articles et annonces officielles' },
          { label:'YouTube @aspiredotdev', url:'https://www.youtube.com/@aspiredotdev', desc:'Vidéos, démos, conférences' },
        ]},
      ]
    }
  }
},
// ══ PHASE 03 ══════════════════════════════════════════════════
{ code:'03', name:'TDD', color:'#fbbf24',
  desc:'Red → Green → Refactor, xUnit, NSubstitute, couverture 80%',
  badges:['TDD','xUnit','NSubstitute','FluentAssertions','Coverage'],
  tabs:['Cours','Exercices','Projet'],
  sections:{
    cours:{
      title:'Cours — Test-Driven Development',
      blocks:[
        { type:'concept', num:'01', title:'Mettre en place le projet de tests',
          text:`Avant d\'écrire le premier test, le projet de tests doit être configuré correctement. Il référence uniquement <strong>Application</strong> et <strong>Domain</strong> — jamais Infrastructure ni API. On utilise trois packages qui forment le trio standard : <code>xUnit</code> (runner), <code>NSubstitute</code> (mocks), <code>FluentAssertions</code> (assertions lisibles). <code>coverlet.collector</code> permet de mesurer la couverture de code.`,
          code:`# Créer le projet de tests unitaires
dotnet new xunit -n MarketFlow.UnitTests
dotnet sln add MarketFlow.UnitTests/MarketFlow.UnitTests.csproj

# Références — Application + Domain seulement (pas Infrastructure, pas API)
dotnet add MarketFlow.UnitTests reference MarketFlow.Application
dotnet add MarketFlow.UnitTests reference MarketFlow.Domain

# Packages de tests
cd MarketFlow.UnitTests
dotnet add package NSubstitute
dotnet add package FluentAssertions
dotnet add package coverlet.collector  # couverture de code

# Structure des dossiers — en miroir des features
mkdir -p Products
mkdir -p Cart
# → Products/GetProductsHandlerTests.cs
# → Cart/AddToCartHandlerTests.cs

# Lancer les tests :
dotnet test
# Mesurer la couverture :
dotnet test --collect:"XPlat Code Coverage"
# → génère coverage.cobertura.xml dans TestResults/

# Convention de nommage — lisible comme une spec :
# [ClassUnderTest]_[Method]_[Scenario]_[ExpectedBehavior]
# GetProductsHandler_Handle_WhenRepositoryHasData_ReturnsAllProducts
# AddToCartHandler_Handle_WhenProductNotFound_ThrowsNotFoundException`
        },
        { type:'concept', num:'02', title:'Le cycle Red → Green → Refactor',
          text:`TDD n'est pas "écrire des tests après le code". C'est un <strong>outil de conception</strong>. Le cycle est strict : on écrit d'abord un test qui échoue (<em>Red</em>), on écrit le minimum de code pour le faire passer (<em>Green</em>), puis on nettoie sans casser (<em>Refactor</em>). Chaque Green est un commit. Le Refactor n'est jamais sur du code non testé.
L'avantage caché : si tu ne peux pas écrire le test avant le code, tu ne sais pas encore exactement ce que ton code doit faire.`,
          code:`// Itération complète en TDD sur GetProductsHandler

// ── STEP 1 : RED ──────────────────────────────────────
// Écrire le test AVANT que la classe existe
[Fact]
public async Task Handle_ReturnsAllProducts_WhenRepositoryHasData()
{
    var repo = Substitute.For<IProductRepository>();
    repo.GetAllAsync(default).Returns([
        Product.Create("T-Shirt", 29.99m, 100),
        Product.Create("Hoodie",  59.99m, 50)
    ]);
    var handler = new GetProductsHandler(repo); // ← COMPILE ERROR → RED
    var result = await handler.Handle(new GetProductsQuery(), default);
    result.Should().HaveCount(2);
}

// ── STEP 2 : GREEN ─────────────────────────────────────
// Minimum de code pour compiler + passer le test
public class GetProductsHandler(IProductRepository repo)
    : IRequestHandler<GetProductsQuery, IEnumerable<ProductDto>>
{
    public async Task<IEnumerable<ProductDto>> Handle(
        GetProductsQuery q, CancellationToken ct)
        => (await repo.GetAllAsync(ct)).Select(p =>
               new ProductDto(p.Id, p.Name, p.Price, p.Stock));
}

// ── STEP 3 : REFACTOR ──────────────────────────────────
// Extraire la projection dans ProductMapper — test reste vert
// git commit -m "refactor(products): extract Product-to-DTO mapper"`
        },
        { type:'concept', num:'03', title:'Mocks avec NSubstitute — IProductRepository',
          text:`On teste le handler en isolation : on substitue le repository avec un faux qui retourne des données contrôlées. NSubstitute crée des substituts via <code>Substitute.For&lt;T&gt;()</code>. On peut vérifier que des méthodes ont été appelées avec <code>Received()</code>.`,
          code:`public class AddToCartHandlerTests
{
    private readonly IProductRepository _productRepo;
    private readonly ICartRepository    _cartRepo;
    private readonly AddToCartHandler   _handler;

    public AddToCartHandlerTests()
    {
        _productRepo = Substitute.For<IProductRepository>();
        _cartRepo    = Substitute.For<ICartRepository>();
        _handler     = new AddToCartHandler(_productRepo, _cartRepo);
    }

    [Fact]
    public async Task Handle_Throws_WhenProductNotFound()
    {
        // Arrange — le produit n'existe pas
        _productRepo.GetByIdAsync(Arg.Any<Guid>(), default)
                    .Returns((Product?)null);

        var cmd = new AddToCartCommand(Guid.NewGuid(), Guid.NewGuid(), 2);

        // Act + Assert
        await Assert.ThrowsAsync<NotFoundException>(
            () => _handler.Handle(cmd, default));

        // Vérifier qu'on n'a pas persisté de panier
        await _cartRepo.DidNotReceiveWithAnyArgs().UpsertAsync(default!, default);
    }
}`
        },
        { type:'concept', num:'04', title:'Tests d\'intégration — WebApplicationFactory avec DB de test',
          text:`Les tests unitaires testent les handlers en isolation. Les tests d'intégration testent le pipeline complet : HTTP → middleware → endpoint → handler → DB. On utilise <code>WebApplicationFactory&lt;Program&gt;</code> qui démarre l'API en mémoire. <strong>Important :</strong> on override le DbContext pour remplacer SQL Server par une base InMemory — indépendante, rapide et propre pour chaque test.`,
          code:`// Factory personnalisée — remplace SQL Server par InMemory
public class TestWebApplicationFactory : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            // Retirer le DbContext SQL Server configuré en Program.cs
            var descriptor = services.SingleOrDefault(d =>
                d.ServiceType == typeof(DbContextOptions<MarketFlowDbContext>));
            if (descriptor is not null) services.Remove(descriptor);

            // Ajouter un DbContext InMemory isolé par test
            services.AddDbContext<MarketFlowDbContext>(options =>
                options.UseInMemoryDatabase("TestDb_" + Guid.NewGuid()));
        });
    }
}

// Test qui utilise la factory personnalisée
public class ProductsIntegrationTests : IClassFixture<TestWebApplicationFactory>
{
    private readonly HttpClient _client;

    public ProductsIntegrationTests(TestWebApplicationFactory factory)
        => _client = factory.CreateClient();

    [Fact]
    public async Task GET_products_Returns200_WithEmptyList()
    {
        var response = await _client.GetAsync("/api/products");

        response.EnsureSuccessStatusCode();
        var body = await response.Content
            .ReadFromJsonAsync<PagedResult<ProductDto>>();
        body.Should().NotBeNull();
        body!.Items.Should().BeEmpty(); // DB fraîche = liste vide
    }
}`
        },
        { type:'concept', num:'05', title:'F.I.R.S.T. — les cinq règles d\'un bon test unitaire',
          text:`Un test unitaire qui ne respecte pas ces règles devient un fardeau plutôt qu\'un actif. Ces cinq règles (Robert C. Martin) sont une check-list rapide à appliquer après chaque test écrit.`,
          code:`// F — FAST       : millisecondes — pas de DB, pas de réseau, pas de fichier
// I — INDEPENDENT : l'ordre d'exécution ne change pas le résultat
// R — REPEATABLE  : même résultat à chaque run (pas de DateTime.Now non mocké)
// S — SELF-VALIDATING : passe ou échoue — pas d'inspection manuelle du résultat
// T — TIMELY      : écrit AVANT le code de production (TDD)

// ❌ Viole INDEPENDENT — état statique partagé entre tests :
private static List<Product> _sharedProducts = new();
[Fact] public void Test1() { _sharedProducts.Add(...); }   // modifie l'état
[Fact] public void Test2() { _sharedProducts.Clear(); }    // peut casser Test1

// ✅ Indépendant — chaque test crée son propre contexte :
[Fact]
public async Task Handle_ReturnsAllProducts_WhenRepositoryHasData()
{
    // Arrange — contexte local, isolé
    var repo = Substitute.For<IProductRepository>();
    repo.GetAllAsync(Arg.Any<CancellationToken>()).Returns([
        Product.Create("T-Shirt", 29.99m, 100),
        Product.Create("Hoodie",  59.99m,  50)
    ]);
    var handler = new GetProductsHandler(repo);

    // Act
    var result = await handler.Handle(new GetProductsQuery(), CancellationToken.None);

    // Assert — FluentAssertions : lisible + message d'erreur détaillé
    result.Should().HaveCount(2);
    result.First().Name.Should().Be("T-Shirt");
    result.First().Price.Should().Be(29.99m);
}`
        }
      ]
    },
    exercices:[
      { n:1, title:'Écrire le test de GetProductsHandler (RED)',
        desc:'Écrire le test complet avec NSubstitute avant que <code>GetProductsHandler</code> existe. Le test doit échouer avec une erreur de compilation — c\'est le RED attendu.',
        hint:'NSubstitute : var repo = Substitute.For<IProductRepository>(); repo.GetAllAsync(default).Returns([Product.Create("T-Shirt", 29.99m, 100)])',
        commit:'"test(products): add GetProductsHandler unit test spec (RED)"'
      },
      { n:2, title:'Implémenter GetProductsHandler (GREEN)',
        desc:'Écrire le minimum de code pour faire passer le test. Créer <code>GetProductsQuery</code>, <code>GetProductsHandler</code> et <code>ProductDto</code>.',
        commit:'"feat(products): implement GetProductsHandler (GREEN)"'
      },
      { n:3, title:'Tester AddToCartHandler — cas d\'erreur d\'abord (RED)',
        desc:'Écrire le test qui vérifie que <code>AddToCartHandler</code> lève <code>NotFoundException</code> quand le produit n\'existe pas. RED car le handler n\'existe pas encore.',
        commit:'"test(cart): add AddToCartHandler product-not-found test (RED)"'
      },
      { n:4, title:'Implémenter AddToCartHandler (GREEN)',
        desc:'Implémenter <code>AddToCartHandler</code> : guard clause pour le produit manquant, récupération ou création du panier, délégation à <code>cart.AddItem()</code>.',
        commit:'"feat(cart): implement AddToCartHandler with product validation (GREEN)"'
      },
      { n:5, title:'Refactorer le mapper (REFACTOR)',
        desc:'Extraire la projection <code>Product → ProductDto</code> dans une classe <code>ProductMapper</code> statique. Vérifier que les tests restent verts après le refactor.',
        commit:'"refactor(products): extract Product-to-DTO projection into ProductMapper"'
      }
    ],
    proj:{
      kpis:{ 'Use cases':'2/4', 'Tests':'6+', 'Endpoints':'1', 'Sécurité':'✗' },
      files:`📁 src/
  📁 MarketFlow.Application/             <span class="f-mod">[MOD]</span>
    📁 Features/ProductManagement/        <span class="f-new">[NEW]</span>
      📁 GetProducts/
        📄 GetProductsQuery.cs            <span class="f-new">[NEW]</span>
        📄 GetProductsHandler.cs          <span class="f-new">[NEW]</span> ← TDD Green
        📄 ProductDto.cs                  <span class="f-new">[NEW]</span>
        📄 ProductMapper.cs               <span class="f-new">[NEW]</span> ← Refactor
    📁 Features/CartManagement/           <span class="f-new">[NEW]</span>
      📁 AddToCart/
        📄 AddToCartCommand.cs            <span class="f-new">[NEW]</span>
        📄 AddToCartHandler.cs            <span class="f-new">[NEW]</span> ← TDD Green
📁 tests/
  📁 MarketFlow.UnitTests/                <span class="f-new">[NEW]</span>
    📄 Products/GetProductsHandlerTests   <span class="f-new">[NEW]</span>
    📄 Cart/AddToCartHandlerTests         <span class="f-new">[NEW]</span>`,
      uc:[
        { f:'Product Management', color:'#5ba8ff', items:[{l:'CreateProduct',s:'todo'},{l:'GetProducts',s:'active'}] },
        { f:'Cart Management',    color:'#2dd4a0', items:[{l:'AddToCart',s:'active'},{l:'GetCart',s:'todo'}] },
      ],
      milestone:'<code>dotnet test</code> passe en vert. Les 2 handlers ont leurs tests. Les tests documentent le comportement attendu.'
    }
  }
},
// ══ PHASE 04 ══════════════════════════════════════════════════
{ code:'04', name:'Features complètes', color:'#a78bfa',
  desc:'4 use cases vertical slice, synthèse de toutes les phases',
  badges:['Vertical Slice','CQRS','FluentValidation','Pagination','Round 2'],
  tabs:['Cours','Exercices','Projet'],
  sections:{
    cours:{
      title:'Cours — Vertical Slice Architecture & Features complètes',
      blocks:[
        { type:'concept', num:'01', title:'Synthèse — ce que chaque phase a apporté',
          text:`Chaque phase a posé une brique sur le même projet. Cette dernière phase assemble tout en 4 use cases complets. L'architecture Vertical Slice (détaillée en <strong>Phase 01 — Architecture</strong>) s'applique ici à leur forme finale : chaque use case est un silo autonome avec son command/query, handler, validator, endpoint et tests.<br><br>Supprimer une feature = <code>rm -rf Features/ProductManagement/CreateProduct</code>. Aucune autre feature n’est touchée.`,
          code:`// Bilan des phases sur la même base de code
// Phase 00 → Conventional Commits : chaque use case a un historique lisible
// Phase 01 → Clean Architecture + Vertical Slice : structure en place
// Phase 02 → Aspire + EF Core : les handlers persistent vraiment en base
// Phase 03 → TDD : GetProductsHandler et AddToCartHandler étaient RED avant GREEN
// Phase 05 → Sécurité (Google OAuth2 / JWT) — à venir

// Structure finale dans MarketFlow.API
Features/
  ProductManagement/
    CreateProduct/   ← UC1 : authentifié requis (RequireAuthorization())
    GetProducts/     ← UC2 : public, pagination SQL
  CartManagement/
    AddToCart/       ← UC3 : ICurrentUserService + CanManageOwnCart
    GetCart/         ← UC4 : total calculé par l\'agrégat + CanManageOwnCart`
        },
        { type:'concept', num:'02', title:'Types partagés — PagedResult&lt;T&gt; et DTOs',
          text:`<strong>PagedResult&lt;T&gt;</strong> est défini dans <code>Application/Common/</code> et utilisé par toutes les queries paginées. Les <strong>DTOs</strong> sont définis dans le dossier de leur use case — ils font partie du silo Vertical Slice, pas d\'une couche partagée générique.`,
          code:`// Application/Common/PagedResult.cs — défini une seule fois, utilisé partout
public record PagedResult<T>(
    IEnumerable<T> Items,
    int            TotalCount,
    int            Page,
    int            PageSize)
{
    public int  TotalPages      => (int)Math.Ceiling(TotalCount / (double)PageSize);
    public bool HasNextPage     => Page < TotalPages;
    public bool HasPreviousPage => Page > 1;
}

// Application/Features/ProductManagement/GetProducts/ProductDto.cs
// — dans le dossier du use case, pas dans un "Shared" ou "Common" global
public record ProductDto(Guid Id, string Name, decimal Price, int Stock);

// Application/Features/CartManagement/GetCart/CartDto.cs
public record CartItemDto(Guid ProductId, string ProductName,
                          int Quantity, decimal UnitPrice, decimal SubTotal);
public record CartDto(Guid Id, string CustomerId,
                      IEnumerable<CartItemDto> Items, decimal Total);`
        },
        { type:'concept', num:'03', title:'UC1 — CreateProduct complet',
          text:`Le command est validé par FluentValidation avant d'atteindre le handler. Si la validation échoue, une exception est levée automatiquement (via <code>ValidateAndThrowAsync</code>) et l'endpoint retourne 400. Le handler crée le produit via la factory method du Domain. L'endpoint retourne 201 Created avec l'ID.`,
          code:`// FluentValidation
public class CreateProductValidator : AbstractValidator<CreateProductCommand>
{
    public CreateProductValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Price).GreaterThan(0);
        RuleFor(x => x.Stock).GreaterThanOrEqualTo(0);
    }
}

// Handler
public async Task<Guid> Handle(CreateProductCommand cmd, CancellationToken ct)
{
    await _validator.ValidateAndThrowAsync(cmd, ct);  // 400 si invalide
    var product = Product.Create(cmd.Name, cmd.Price, cmd.Stock);
    await _repo.AddAsync(product, ct);
    return product.Id;
}

// Endpoint
app.MapPost("/api/products",
    async (CreateProductCommand cmd, ISender s) => {
        var id = await s.Send(cmd);
        return Results.Created($"/api/products/{id}", new { id });
    })
   .RequireAuthorization();  // token valide requis`
        },
        { type:'concept', num:'04', title:'UC2 — GetProducts avec pagination SQL',

          text:`La pagination se fait côté SQL — pas en mémoire. Le repository expose <code>GetPagedAsync()</code> qui utilise <code>Skip()</code> et <code>Take()</code> avant d'exécuter la requête. La réponse inclut les métadonnées de pagination pour que le client sache combien de pages existent.`,
          code:`public record GetProductsQuery(int Page = 1, int PageSize = 20)
    : IRequest<PagedResult<ProductDto>>;

public async Task<PagedResult<ProductDto>> Handle(
    GetProductsQuery q, CancellationToken ct)
{
    var total = await _repo.CountAsync(ct);
    var items = await _repo.GetPagedAsync(q.Page, q.PageSize, ct);
    return new PagedResult<ProductDto>(
        items.Select(ProductMapper.ToDto), total, q.Page, q.PageSize);
}

// Repository
public async Task<IEnumerable<Product>> GetPagedAsync(
    int page, int size, CancellationToken ct = default)
    => await _ctx.Products
        .AsNoTracking()
        .OrderBy(p => p.Name)
        .Skip((page - 1) * size)
        .Take(size)
        .ToListAsync(ct);

// Endpoint : GET /api/products?page=1&pageSize=20
app.MapGet("/api/products",
    async ([AsParameters] GetProductsQuery q, ISender s) => await s.Send(q));`
        },
        { type:'concept', num:'05', title:'UC3+UC4 — AddToCart et GetCart',
          text:`AddToCart utilise <code>ICurrentUserService</code> pour récupérer le Google sub — le handler reste UI-agnostique et testable sans mock ASP.NET. Il crée le panier s'il n'existe pas, puis délègue à <code>cart.AddItem()</code> qui applique la règle de fusion. GetCart retourne le panier avec <code>Total</code> calculé par l'agrégat — jamais stocké.`,
          code:`// AddToCartHandler — ICurrentUserService → pas de ClaimsPrincipal dans Application
var customerId = _currentUser.UserId
    ?? throw new UnauthorizedAccessException("User not authenticated.");

var cart = await _cartRepo.GetByCustomerIdAsync(customerId, ct)
           ?? Cart.Create(customerId);  // Cart.CustomerId est string (Google sub)

var product = await _productRepo.GetByIdAsync(cmd.ProductId, ct)
              ?? throw new NotFoundException(nameof(Product), cmd.ProductId);

cart.AddItem(product.Id, product.Name, product.Price, cmd.Quantity);
await _cartRepo.UpsertAsync(cart, ct);

// GetCartHandler — Total calculé par l'agrégat
return new CartDto(
    cart.Id,
    cart.CustomerId,
    cart.Items.Select(i => new CartItemDto(
        i.ProductId, i.ProductName, i.Quantity, i.UnitPrice,
        i.Quantity * i.UnitPrice)),
    cart.Total  // ← propriété calculée du Domain, jamais stockée
);`
        }
      ]
    },
    exercices:[
      { n:1, title:'UC1 — CreateProduct en TDD',
        desc:'Écrire les tests pour <code>CreateProductHandler</code> : cas nominal (product créé), validation échouée (400), puis implémenter le handler, le validator et l\'endpoint.',
        commit:'"feat(products): complete CreateProduct vertical slice with TDD"'
      },
      { n:2, title:'UC2 — GetProducts avec pagination',
        desc:'Ajouter <code>GetPagedAsync(page, size)</code> dans <code>ProductRepository</code> avec <code>Skip()</code> / <code>Take()</code>. Implémenter le handler avec <code>PagedResult&lt;T&gt;</code> et l\'endpoint.',
        commit:'"feat(products): complete GetProducts with SQL-level pagination"'
      },
      { n:3, title:'UC3 — AddToCart avec Google sub',
        desc:'Implémenter <code>AddToCartHandler</code> en extrayant le <code>customerId</code> depuis <code>ClaimTypes.NameIdentifier</code> (le Google sub string). Protéger l\'endpoint avec <code>CanManageOwnCart</code>.',
        commit:'"feat(cart): complete AddToCart with Google sub and cart creation"'
      },
      { n:4, title:'UC4 — GetCart avec total calculé',
        desc:'Implémenter <code>GetCartHandler</code> qui retourne le panier avec les items et le <code>Total</code> de l\'agrégat. Protéger avec <code>CanManageOwnCart</code>.',
        commit:'"feat(cart): complete GetCart with computed total and PBAC protection"'
      },
      { n:5, title:'Demo de bout en bout — Round 2',
        desc:'Lancer l\'AppHost, s\'authentifier avec Google, créer un produit (avec un compte Admin), lister les produits (public), ajouter au panier (Customer), voir le panier. Préparer une courte présentation des choix d\'architecture.',
        hint:'Utiliser Scalar (documentation API intégrée dans ASP.NET Core 10) pour tester les endpoints avec le token Google.'
      }
    ],
    proj:{
      kpis:{ 'Use cases':'4/4', 'Tests':'20+', 'Endpoints':'5', 'Sécurité':'✗' },
      files:`📁 src/
  📁 MarketFlow.API/
    📁 Features/
      📁 ProductManagement/
        📁 CreateProduct/              <span class="f-new">[NEW]</span> UC1 complet
          📄 CreateProductCommand.cs
          📄 CreateProductHandler.cs
          📄 CreateProductValidator.cs
          📄 CreateProductEndpoint.cs
          📄 CreateProductTests.cs
        📁 GetProducts/                <span class="f-mod">[MOD]</span> UC2 + pagination
          📄 GetProductsEndpoint.cs    <span class="f-new">[NEW]</span>
          📄 GetProductsTests.cs       <span class="f-new">[NEW]</span>
      📁 CartManagement/
        📁 AddToCart/                  <span class="f-mod">[MOD]</span> UC3 + endpoint
          📄 AddToCartEndpoint.cs      <span class="f-new">[NEW]</span>
          📄 AddToCartTests.cs         <span class="f-new">[NEW]</span>
        📁 GetCart/                    <span class="f-new">[NEW]</span> UC4 complet
          📄 GetCartQuery.cs
          📄 GetCartHandler.cs
          📄 GetCartEndpoint.cs
          📄 GetCartTests.cs`,
      uc:[
        { f:'Product Management', color:'#5ba8ff', items:[{l:'CreateProduct',s:'done'},{l:'GetProducts',s:'done'}] },
        { f:'Cart Management',    color:'#2dd4a0', items:[{l:'AddToCart',s:'done'},{l:'GetCart',s:'done'}] },
      ],
      milestone:'Demo live réussie. 4 use cases verts. Commits conventionnels sur tout l\'historique. Round 2 validé.'
    }
  }
}
];
