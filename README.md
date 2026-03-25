# DotCraft

> An interactive, browser-based training plan for building the **MarketFlow API** — from a clean Git repo to a production-ready ASP.NET Core 10 application.

[![Live App](https://img.shields.io/badge/Live%20App-MarketFlow%20Course-5ba8ff?style=for-the-badge&logo=github)](https://kbourzayq.github.io/MarketFlow/)
![Stack](https://img.shields.io/badge/stack-ASP.NET%20Core%2010%20%7C%20EF%20Core%20%7C%20Aspire-2dd4a0?style=for-the-badge)
![No build](https://img.shields.io/badge/build-none%20required-fbbf24?style=for-the-badge)

---

## Overview

DotCraft is a **zero-dependency, static single-page application** that turns a structured `.js` data file into a fully navigable training plan. It guides developers through 6 progressive phases of building **MarketFlow**, a real-world REST API.

Each phase includes:
- **Cours** — annotated theory with code samples
- **Guide** — numbered step-by-step instructions
- **Exercices** — hands-on tasks with hints and expected commit messages
- **Projet** — live use-case tracker and milestone for that phase

---

## Training path

| Phase | Title | Key topics |
|:-----:|-------|------------|
| `00` | **Git & Conventional Commits** | Git workflow, commit conventions, repository setup |
| `01` | **.NET Foundations** | Clean Architecture, Vertical Slice, MediatR, CQRS, DI |
| `02` | **Aspire & Data** | .NET Aspire orchestration, SQL Server, EF Core 10, migrations |
| `03` | **TDD** | xUnit, NSubstitute, FluentAssertions, Red-Green-Refactor |
| `04` | **Complete Features** | 4 Vertical Slice use cases, FluentValidation, pagination |
| `05` | **Authentication** _(WIP)_ | Google OAuth2, JWT Bearer, PBAC |

---

## Tech stack covered

| Category | Technologies |
|----------|-------------|
| **Backend** | ASP.NET Core 10, EF Core 10, .NET Aspire |
| **Architecture** | Clean Architecture, Vertical Slice, CQRS |
| **Libraries** | MediatR, FluentValidation, FluentAssertions |
| **Testing** | xUnit, NSubstitute |
| **Auth** | JWT Bearer, Google OAuth2, PBAC |
| **Tooling** | Conventional Commits |

---

## The MarketFlow API

The project built throughout the training is a **product & cart management API** with:

| Use case | Method | Route |
|----------|--------|-------|
| `CreateProduct` | `POST` | `/api/products` |
| `GetProducts` | `GET` | `/api/products` |
| `AddToCart` | `POST` | `/api/cart/items` |
| `GetCart` | `GET` | `/api/cart` |

The solution follows **Clean Architecture** (Domain / Application / Infrastructure / API) with **Vertical Slice** organization: each use case is a self-contained folder with its command, handler, validator, endpoint, and tests.

---

## Repository structure

```
index.html   — shell layout, topbar, and Google Fonts
app.js       — rendering engine and navigation logic (ES module)
data.js      — all course content, exercises, guides, and phase data
style.css    — dark theme UI (dot-grid background, sidebar, tabs)
```

> **To add or update content:** edit only [`data.js`](data.js). The schema is documented at the top of that file. Adding a new phase means appending one object to the `PHASES` array — `app.js` and `index.html` need no changes.

---

## Running locally

No build step or package installation needed. Serve with any static HTTP server:

```bash
# Node.js (npx — no install)
npx serve .

# Python
python -m http.server 8080

# VS Code — Live Server extension
# Right-click index.html → "Open with Live Server"
```

Then open `http://localhost:<port>` in your browser.

> **Note:** `file://` won't work — `app.js` uses ES module imports which require an HTTP origin.

---

## Navigation

| Action | How |
|--------|-----|
| Open a phase | Click it in the sidebar |
| Switch tabs | Click a tab, or use **← →** arrow keys |
| Return to intro | Click **MarketFlow** in the sidebar header |
