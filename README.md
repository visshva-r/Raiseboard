# Raiseboard

Small MERN app for the StartupMeu internship task. Founders post a funding raise; signed-in users can express interest once; founders see who is interested.

## Features

- User registration and login (JWT + bcrypt)
- Create startup raise (name, one-liner, sector, funding ask in INR)
- Public list and detail pages
- Express interest once per user per raise (409 on duplicate)
- Founder-only list of interested users on the raise detail page

## Technologies

- **MongoDB** (Atlas) + Mongoose
- **Express.js** (REST API)
- **React** (Vite)
- **Node.js**

## AI development tool

**Code0** ([VS Code extension](https://marketplace.visualstudio.com/items?itemName=frigga.code0)) — used in **Visual Studio Code** during the final development pass on this repository. See [docs/CODE0-SESSION.md](docs/CODE0-SESSION.md) for the exact prompts and workflow.

### AI Development Experience

I used Code0 as an pair-programming assistant: I selected the relevant file, described the change in natural language, reviewed the diff, and ran the app locally before committing. When Code0’s suggestion was wrong (e.g. route order or stale state after interest), I fixed it manually — that matches how I use AI tools on real tasks.

### Five Code0 tasks

1. **API hardening** — Added a JSON 404 handler for unknown `/api/*` routes in `server/src/app.js`.
2. **Component UX** — Improved `RaiseDetail.jsx` with a loading/disabled state on “I’m interested”.
3. **Auth validation** — Reviewed and tightened validation messages in `server/src/routes/auth.routes.js` (required fields, trimmed email).
4. **Client error handling** — Updated `client/src/api/client.js` to clear JWT on 401 and show a session-expired message.
5. **Documentation** — Refined this README and the Code0 session log so setup and AI usage match what was built.

## Prerequisites

- Node.js 18+
- MongoDB Atlas connection string
- VS Code with Code0 extension (for reproducing the AI workflow above)

## Setup

```bash
cd server
cp ../.env.example .env
# Edit .env: MONGODB_URI, JWT_SECRET, PORT, CLIENT_URL

npm install
npm run dev
```

Second terminal:

```bash
cd client
npm install
npm run dev
```

Open **http://localhost:5173**. API runs on **http://localhost:5000** (Vite proxies `/api`).

## How to run (quick test)

1. Register user A → **Create raise**
2. Logout → Register user B → open the raise → **I'm interested**
3. Log in as A → open the same raise → see B under **Interested users**

## Repository

https://github.com/visshva-r/Raiseboard
