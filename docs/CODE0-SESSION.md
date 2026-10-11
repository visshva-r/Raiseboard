# Code0 session (StartupMeu requirement)

Use **Visual Studio Code** (not Cursor) — Code0 extension `frigga.code0` is installed there.

1. Open VS Code → **File → Open Folder** → this `Project` folder.
2. Open the **Code0** side panel / command (see extension docs).
3. Run the five prompts below **in order**. Accept or edit suggestions, then save files.
4. After each task, run a quick smoke test (`server` + `client` `npm run dev`).
5. Commit with message prefix `code0:` when a task changes code.

## Task 1 — API 404 handler

**Prompt:**

> In `server/src/app.js`, add a catch-all middleware for unknown `/api/*` routes that returns JSON `{ message: 'Not found' }` with status 404, placed after all routes and before the error handler.

## Task 2 — Interest button UX

**Prompt:**

> In `client/src/pages/RaiseDetail.jsx`, add a loading state while the express-interest POST is in flight: disable the button and show "Saving…". Handle errors without clearing the startup data.

## Task 3 — Auth route validation

**Prompt:**

> Review `server/src/routes/auth.routes.js`. Add clear 400 validation for missing fields and trim email on register/login. Keep responses as `{ message }`.

## Task 4 — API client 401 handling

**Prompt:**

> In `client/src/api/client.js`, if the API returns 401, clear the stored token and throw an error with message "Session expired — please log in again."

## Task 5 — README polish

**Prompt:**

> Read `README.md`. Under "AI Development Experience", ensure it states Code0 was used in VS Code, lists exactly these five tasks, and mentions one bug or edge case fixed during Code0-assisted review (e.g. duplicate interest 409 or proxy setup).

After Task 5, copy the final AI section wording into README if Code0 improved it.
