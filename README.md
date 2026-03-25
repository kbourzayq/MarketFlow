# DotCraft

An interactive, browser-based training plan for building the **MarketFlow API** from scratch — from a clean Git repo all the way to a production-ready ASP.NET Core 10 application.

## What is this?

DotCraft is a static single-page application that guides developers through 6 progressive phases of building MarketFlow, a real-world REST API. Each phase has dedicated course content, step-by-step guides, hands-on exercises, and a project state tracker showing which use cases are done.

## Training path

| Phase | Title | Key topics |
| ------- | ------- | ------------ |
| 00 | Git & Conventional Commits | Git workflow, commit conventions, repository setup |
| 01 | .NET Foundations | Clean Architecture, Vertical Slice, MediatR, CQRS, DI |
| 02 | Aspire & Data | .NET Aspire orchestration, SQL Server, EF Core 10, migrations |
| 03 | TDD | xUnit, NSubstitute, FluentAssertions, Red-Green-Refactor |
| 04 | Complete Features | 4 Vertical Slice use cases, FluentValidation, pagination |
| 05 | Authentication | Google OAuth2, JWT Bearer, PBAC (WIP) |

## Tech stack covered

`ASP.NET Core 10` · `EF Core 10` · `.NET Aspire` · `MediatR` · `FluentValidation` · `xUnit` · `NSubstitute` · `FluentAssertions` · `JWT Bearer` · `Google OAuth2` · `PBAC` · `Vertical Slice` · `Clean Architecture` · `Conventional Commits`

## The MarketFlow API

The project built throughout the training is **MarketFlow**, a product & cart management API with:

- 4 use cases: `CreateProduct`, `GetProducts`, `AddToCart`, `GetCart`
- Clean Architecture (Domain / Application / Infrastructure / API)
- Vertical Slice organization per use case
- Permission-Based Access Control (PBAC)

## App structure

```text
index.html   — shell layout and topbar
app.js       — rendering engine and navigation logic (ES module)
data.js      — all course content, exercises, and phase data
style.css    — dark theme UI
```

## Running locally

No build step required. Serve the files with any static HTTP server:

```bash
# Using Node.js
npx serve .

# Using Python
python -m http.server 8080

# Using the VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Then open `http://localhost:<port>` in your browser.

> Opening `index.html` directly via `file://` will not work because `app.js` uses ES module imports.

## Navigation

- Click any **phase** in the sidebar to open it.
- Use the **tabs** inside a phase to switch between Cours, Guide, Exercices, and Projet.
- Use **← →** arrow keys to move between sections.
- Click **MarketFlow** in the sidebar header to return to the intro page.

## Adding or updating content

All course content lives in [`data.js`](data.js). The schema is documented at the top of that file. To add a new phase, append an object to the `PHASES` array following the documented schema — no changes to `app.js` or `index.html` are needed.
