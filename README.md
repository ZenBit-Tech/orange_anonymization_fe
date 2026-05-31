# Orange Anonymization Front-End

Orange Anonymization is a sophisticated web platform designed for secure PII (Personally Identifiable Information) and PHI (Protected Health Information) detection and anonymization. It empowers organizations to handle sensitive data responsibly by identifying, masking, and generating synthetic alternatives to private information.

## 🚀 Features

- **Landing and auth flows:** Public landing, contact, login, token, and inactivity pages.
- **Protected dashboard:** Analytics overview with metrics, activity chart, filters, and recent activity table.
- **De-identification workflow:** UI for running anonymization jobs and reviewing results.
- **Synthetic data workflow:** Create synthetic datasets and inspect generated output.
- **Analyses view:** Browse, filter, and export analysis history.
- **Internationalization:** Locale-aware UI with `i18next`.
- **Responsive interface:** Built with Material UI, custom styling, and reusable layout components.

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

    ```env
    VITE_API_BASE_URL=http://localhost:3000/api
    ```

    In production, API calls default to `/api` (same-origin relative path), so no env var is needed when the frontend is served from the same origin as the backend. In local development, the Vite dev server proxies `/api` requests to `http://localhost:3000` automatically.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Project Structure

```text
src/
├── App.tsx
├── assets/
├── components/
│   ├── business/
│   ├── common/
│   ├── layouts/
│   ├── popups/
│   └── UI/
├── constants/
├── features/
├── i18n.ts
├── index.css
├── main.tsx
├── pages/
├── routes/
├── services/
├── store/
├── test/
├── theme.ts
└── utils/
```

## 📜 Available Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Type-checks and builds the app for production.
- `npm run lint`: Runs ESLint.
- `npm run format`: Formats the codebase with Prettier.
- `npm run preview`: Locally previews the production build.
- `npm run test`: Runs Vitest in watch mode.
- `npm run test:run`: Runs Vitest once.
- `npm run test:ui`: Opens the Vitest UI.

## 📄 License

This project is private and confidential.
