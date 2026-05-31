# Zenbit Orange — Frontend

Zenbit Orange is the frontend for the Orange Anonymization platform. It provides the UI for login, dashboard analytics, de-identification workflows, synthetic data generation, and analyses review.

## Quick Start

### Prerequisites

- Node.js 18 or newer
- npm
- Docker, if you want to run the full backend + Presidio demo locally

### Install

```bash
git clone <your-repo-url>
cd orange_anonymization_fe
npm install
```

### Environment

Create a `.env.local` file if you need to override the backend base URL or force chart demo data:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_DASHBOARD_DEMO_DATA=true
```

The dashboard chart can also use demo data automatically in development mode.

### Run

```bash
npm run dev
```

Open the app at the local Vite URL shown in the terminal.

### Build and preview

```bash
npm run build
npm run preview
```

## Full Demo Setup

For de-identification and synthetic data flows, the backend and Presidio services must be running.

From the backend repository root:

```bash
cd ../orange_anonymization_be
docker compose up -d
```

That starts the backend plus the Presidio analyzer and anonymizer services defined in the backend `docker-compose.yml`.

## Project Layout

```text
src/
├── App.tsx
├── main.tsx
├── assets/
├── components/
├── constants/
├── features/
├── i18n.ts
├── pages/
├── routes/
├── services/
├── store/
├── test/
├── theme.ts
└── utils/
```

## Scripts

- `npm run dev` - start the Vite dev server
- `npm run build` - type-check and build for production
- `npm run preview` - preview the production build
- `npm run lint` - run ESLint
- `npm run format` - format the codebase with Prettier
- `npm run test` - run Vitest in watch mode
- `npm run test:run` - run Vitest once
- `npm run test:ui` - open the Vitest UI

## Notes

- I removed `pdfjs-dist` because it was not imported anywhere in `src/`.
- The frontend expects the backend API at `VITE_API_BASE_URL` and uses `/api` by default.
- Demo chart data is controlled by `VITE_DASHBOARD_DEMO_DATA`.
