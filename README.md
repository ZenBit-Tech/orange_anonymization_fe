# De- Identification Studio Orange — Frontend

Orange Anonymization is a sophisticated web platform designed for secure PII (Personally Identifiable Information) and PHI (Protected Health Information) detection and anonymization. It empowers organizations to handle sensitive data responsibly by identifying, masking, and generating synthetic alternatives to private information.

## 🚀 Features

- **Landing and auth flows:** Public landing, contact, login, token, and inactivity pages.
- **Protected dashboard:** Analytics overview with metrics, activity chart, filters, and recent activity table.
- **De-identification workflow:** UI for running anonymization jobs and reviewing results.
- **Synthetic data workflow:** Create synthetic datasets and inspect generated output.
- **Analyses view:** Browse, filter, and export analysis history.
- **Internationalization:** Locale-aware UI with `i18next`.
- **Responsive interface:** Built with Material UI, custom styling, and reusable layout components.

Note: during a quick audit I found one dependency installed but not referenced in source files: `pdfjs-dist`. If you want, I can remove it from `package.json` and `package-lock.json`.

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Components:** [Material UI (MUI) v7](https://mui.com/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Emotion](https://emotion.sh/)
- **Data Fetching:** [Axios](https://axios-http.com/)
- **Charts:** [Recharts](https://recharts.org/)
- **Forms:** [React Hook Form](https://react-hook-form.com/) with [Yup](https://github.com/jquense/yup) validation
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Internationalization:** [i18next](https://www.i18next.com/)

## 📋 Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## ⚙️ Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <your-repo-url>
    cd orange_anonymization_fe
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables (optional for local development):**
    Create a `.env.local` file in the root directory to override the API base URL:

    ````env
    # Zenbit Orange — Frontend

    Zenbit Orange is the frontend for the De-Identification Studio — a web UI for running PII/PHI detection, anonymization jobs, and generating synthetic data. This README is a concise developer-facing guide focused on getting a demo running locally.

    Key points
    - Built with React (Vite + TypeScript) and Material UI.
    - Requires the backend and Presidio services for full de-identification/synthetic functionality.

    Quickstart (developer)

    Prerequisites:
    - Node.js (18+ recommended)
    - npm (or yarn)
    - Docker (to run Presidio services when needed)

    1. Clone and enter the frontend folder:

    ```bash
    git clone <your-repo-url>
    cd orange_anonymization_fe
    ````

    2. Install dependencies:

    ```bash
    npm install
    ```

    3. Optional: create `.env.local` to override the backend base URL and enable demo data:

    ```env
    VITE_API_BASE_URL=http://localhost:3000/api
    VITE_DASHBOARD_DEMO_DATA=true  # optional: forces chart demo data
    ```

    4. Start the dev server:

    ```bash
    npm run dev
    ```

    Build for production:

    ```bash
    npm run build
    npm run preview   # preview the production build locally
    ```

    Running the full demo (backend + Presidio)
    - The frontend supports full workflows (de-identification, synthetic data) only when the backend and Presidio analyzer/anonymizer are running.
    - From the backend root (repo sibling `orange_anonymization_be`) you can bring up the backend and Presidio with Docker Compose:

    ```bash
    cd ../orange_anonymization_be
    docker compose up -d
    ```

    - That will start the backend and the Presidio services defined in the backend `docker-compose.yml`. Ensure the backend is reachable (default `http://localhost:3000`) and that `VITE_API_BASE_URL` matches.

    Project structure (high level)

    ```text
    src/
    ├── App.tsx
    ├── main.tsx
    ├── assets/
    ├── components/     # shared UI and layout components
    ├── pages/          # route-level pages (Dashboard, Analyses, DeIdentify, SyntheticData, etc.)
    ├── services/       # API client and domain services
    ├── store/          # Redux slices and store
    ├── routes/         # router + guards
    ├── test/           # vitest helpers and tests
    └── i18n.ts         # i18next setup
    ```

    Scripts
    - `npm run dev` — start Vite dev server
    - `npm run build` — typecheck and build for production
    - `npm run preview` — preview production build
    - `npm run lint` — run ESLint
    - `npm run format` — Prettier format
    - `npm run test` / `npm run test:run` / `npm run test:ui` — run Vitest

    Notes & maintenance
    - I removed one unused dependency from `package.json` (`pdfjs-dist`) after a code audit — it wasn't imported in `src/`. If you want me to prune or tidy additional dependencies I can do a deeper pass (I won't remove anything that looks like a peer/runtime requirement for MUI or build plugins).
    - Demo chart data is gated by `import.meta.env.DEV` or the `VITE_DASHBOARD_DEMO_DATA` flag. Use the flag for demo builds when `DEV` is false.

    If you want, I can also produce a one-page handoff summary for the demo call listing the exact commands and flags to set up the local demo environment. What would you like next?
