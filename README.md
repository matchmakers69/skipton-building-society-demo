# Skipton Building Society Blog Demo (Recruitment Task + Bonus Feature)

This project is a **Next.js v15** demo blog using data from [JSONPlaceholder.org](https://jsonplaceholder.org).
It showcases best practices for SSR/ISR, error handling, testing, and clean component structure.

---

## 🚀 Features

- Fetches blog posts from **JSONPlaceholder API**.
- Displays posts in **card format** with title, category, date, and preview.
- Includes **loading** and **error handling** states.
- Uses `next/image` optimization with configured remote domains.
- Styled using **Tailwind CSS** and **shadcn/ui** components.
- Includes **Vitest** testing setup with mocks.
- Implements **E2E testing** with Playwright.
- Implements **bonus functionality** for post details page.

---

## 📝 Bonus: Post Details Page

Although not required by the recruitment test, a **post details page** was added.

Because JSONPlaceholder is limited:

- Only **post with `id=1`** is available from the API.
- Any other `id` returns an error.

To demonstrate this behavior:

- The **first post button** → `"View more"` → navigates to details page (`/posts/1`) ✅ works fine.
- The **second post button** → `"Show error"` → intentionally navigates to `/posts/2` to trigger the `error.tsx` component.
- All other posts have their buttons **disabled** (`"Not available"`).

This way, you can easily verify error handling in the UI.

---

## 🛠 Getting Started

### Clone Repository

```bash
git clone https://github.com/matchmakers69/skipton-building-society-demo.git
cd skipton-building-society-demo
```

### Install Dependencies

```bash
npm install
```

### ⚙️ Configure environment variables

Create a `.env` file in the root of your project and add the following:

#### Local base URL (used for testing and redirects)

```env
BASE_URL=http://localhost:3000
```

### Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📦 Available Scripts

| Command                 | Description                              |
| ----------------------- | ---------------------------------------- |
| `npm run dev`           | Start development server with Turbopack  |
| `npm run build`         | Build for production with Turbopack      |
| `npm run lint`          | Run ESLint and format code with Prettier |
| `npm run lint:fix`      | Fix linting issues automatically         |
| `npm run format`        | Format all files with Prettier           |
| `npm run format:check`  | Check if files are properly formatted    |
| `npm test`              | Run unit tests with Vitest               |
| `npm run test:coverage` | Run tests with coverage report           |
| `npm run e2e`           | Run E2E tests with Playwright            |

---

## 🧪 Testing

### Unit Tests (Vitest)

```bash
npm test
```

### E2E Tests (Playwright)

```bash
# Run E2E tests
npm run e2e

```

---

## 🏗 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Date handling**: date-fns
- **Testing**: Vitest + Testing Library + Playwright
- **Code quality**: ESLint + Prettier

---

## 🌐 API Integration

This project uses [JSONPlaceholder API](https://jsonplaceholder.org) for demo data:

- **Posts endpoint**: `https://jsonplaceholder.org/posts`
- **Single post**: `https://jsonplaceholder.org/posts/{id}`

Note: Only post with `id=1` returns valid data. Other IDs are used to demonstrate error handling.

---

## 🚀 Deployment

The app is optimized for deployment on Vercel:

```bash
npm run build
```

The build uses Turbopack for faster compilation times.

---

## 📸 Screenshots

The application features:

- **Blog listing page** with card layout
- **Post details page** with full content
- **Error handling** for invalid post IDs
- **Loading states** and smooth navigation
- **Responsive design** for all screen sizes

---

## 🌐 Live Demo

**[View Live Application →](https://skipton-building-society-demo-8apsehwcu.vercel.app/)**

---
