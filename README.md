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

**Kiro** — used for initial feature specification and task breakdown (Quick Spec / plan). Implementation and debugging were done locally with AI assistance (Cursor Composer) under the submission deadline.

### AI tasks (3–5)

1. **Specification** — Defined models, REST routes, and React pages before coding.
2. **Database layer** — Mongoose schemas and unique compound index on `Interest` (`user` + `startup`).
3. **Auth API** — Register/login, JWT middleware, protected routes.
4. **Startups & interest API** — List/detail/create raises; interest endpoint with duplicate handling; founder-only interested user list.
5. **React UI** — Auth context, routing, forms, and wiring to the API (including fixing proxy/CORS during local dev).

## Prerequisites

- Node.js 18+
- MongoDB Atlas connection string

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
