# CampusBites

A React single page application for students to discover recipes, save favorites, and plan one meal per day. It does not calculate nutrition, grocery costs, or allergy suitability.

**Live app:** https://campusbites-psi.vercel.app

**Repository:** https://github.com/andreamforcina-cpu/campusbites

## Run

Requires Node.js 20.19+ or 22.12+ and npm.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

## Routes

| URL | Purpose |
| --- | --- |
| `/recipes?q=pasta&category=Pasta` | Name search, optional category filter, recipe cards |
| `/recipes/:recipeId` | Dynamic recipe details, ingredients, instructions |
| `/saved` | Shared saved collection |
| `/plan` | Assign a saved recipe to a weekday; replace or remove it |
| Other paths | Accessible not-found screen |

The root redirects to `/recipes`. React Router provides client navigation. Query and category live in URL parameters, so discovery filters survive browser Back navigation. Use the browser Back button to return from detail to the exact previous search; the All recipes link intentionally opens default discovery.

## Architecture

`components/RecipeCard.jsx` is reusable and receives meal data through props. `RecipeContext` owns saved recipes and plan entries; both use immutable updates. Component state handles form inputs, API results, status, and errors. The context is available across routes and persists locally under `campusbites-v1`; no account sync is implemented. Corrupt storage resets safely and unavailable storage displays a message.

API requests use AbortController to avoid obsolete results after navigation or query changes. The service handles HTTP failure and malformed response shape. Search supports loading, empty, error, and retry states. No HTML from the API is injected into the DOM.

## API

Provider: TheMealDB, https://www.themealdb.com/api.php

Base URL: `https://www.themealdb.com/api/json/v1/1`

- `search.php?s=pasta` searches names and returns full meal objects.
- `lookup.php?i=52772` retrieves a recipe by ID.
- `meals: null` is handled as no results.
- Ingredient and measurement fields are paired and empty items removed.

The provider documents key `1` for development or educational use. This is an educational MVP, not a commercial release. Reassess provider conditions before expanding the audience. The public key is not a secret. No private environment variables or credentials are required.

## Testing and verification

Nine Vitest / Testing Library tests passed on November 15, 2026. Tests cover loading, saving and unsaving across routes, encoded searches, empty results, error and retry, dynamic details, unknown recipes, planning replacement/removal, corrupt storage recovery, 404 rendering, HTTP failure, and malformed responses. API calls are mocked in the tests.

`npm run build` passed. Live API behavior was additionally checked in the production deployment.

The deployed Vercel application was checked in Chrome: live recipe search, recipe details, saved recipes, meal planning, and a direct refresh on a dynamic recipe route worked. Layouts were inspected at 390px and 768px and at the normal desktop viewport. The checked phone/tablet pages had no horizontal overflow.

## Vercel deployment

1. Create a public GitHub repository in your own account and push this directory.
2. Import the repository into Vercel with framework preset Vite, build command `npm run build`, output directory `dist`.
3. `vercel.json` provides SPA fallback routing for direct visits to detail/saved/plan pages.
4. Verify every route, API success/failure, saved state, and mobile/tablet/desktop layout in the deployed site.
5. Add the actual repository URL and deployment URL to the submission document.

The public repository is connected to Vercel for automatic deployments from main. The live production URL is https://campusbites-psi.vercel.app.

## Accessibility and responsive design

Mobile-first grid, 44px controls, visible focus outlines, semantic headings, labeled forms, a skip link, descriptive link text, live status messages, and error alerts. At 640px the recipe grid becomes two columns and at 1000px three columns. Details switch to two columns on large screens. Phone, tablet, and desktop views were inspected during deployment verification.

## Known limits and next steps

- No user login, authorization, backend, collaboration, or account synchronization in this MVP.
- Saved recipes and plans are stored per browser, not private account data.
- Plan contains one meal per weekday; selecting another replaces it with an explanatory message.
- Category filtering applies to the current name search, not the entire API catalog.
- Google Fonts and recipe images require internet access; system fonts are the fallback.
- Review the code and test with your own recipe searches before submission.
- Later work: secure backend authentication, protected routes, roles, broader tests, and collaboration.

## Screenshots

Live recipe discovery in the deployed application:

<img width="960" height="454" alt="CampusBites deployed recipe discovery page" src="https://github.com/user-attachments/assets/6b8545d5-163c-40d6-8bf6-5a6b2b2ea2ec" />
