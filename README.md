# Support Queue Sandbox

Support Queue Sandbox is a deliberately unfinished TypeScript support dashboard built to exercise DevDive against a believable codebase. It is small enough for fast iteration, but it contains enough product context, backend surface area, shared contracts, and test coverage to generate useful tasks and to trigger commit-analysis, CI, and design-review behavior.

## Product overview

The app models a support operations queue for B2B customers. Agents can inspect incoming tickets, review ticket detail, and understand which issues are currently triaged, under investigation, or still new.

This baseline intentionally stops short of operational workflows. Ticket assignment, saved queue views, SQLite persistence, and an admin-only audit log are all planned but not built. Those gaps are the primary follow-up work DevDive should plan.

## Current architecture

- `client/`: React + Vite dashboard for browsing tickets and viewing placeholders for planned features.
- `server/`: Express API with seeded in-memory ticket data and a stubbed assignment endpoint.
- `shared/`: common TypeScript contracts and a shared browser API client.
- `tests/`: Vitest + Supertest coverage for the server read flows and the intentional `501` assignment stub.
- `.github/workflows/ci.yml`: CI fixture that runs install, typecheck, lint, and test.

The server exposes a `TicketStore` interface plus two adapters:

- `MemoryTicketStore` is the only adapter wired into the running app.
- `SQLiteTicketStore` exists only as a placeholder to make future persistence work concrete.

Admin auth also exists only as scaffolding. The middleware is present, but it currently bypasses authorization so the follow-up feature has a clear starting point.

## What works today

- `GET /api/health`
- `GET /api/tickets`
- `GET /api/tickets/:id`
- Responsive frontend for browsing seeded tickets
- Shared contracts between client and server
- Passing tests around the current read-only flows

## Known missing pieces

- `PATCH /api/tickets/:id/assignee` validates input but always returns `501 Not implemented`
- Saved views panel is placeholder UI only
- Audit log panel is placeholder UI only
- No SQLite database or migrations
- No real authentication or admin-only access control
- No write-path tests yet

## Recommended DevDive prompt

Run DevDive with this exact feature prompt:

```text
Add ticket assignment, saved views, SQLite persistence, and an admin-only audit log.
```

That prompt should naturally produce work across `frontend`, `backend`, `api`, `testing`, and likely `database` and `auth`.

## Why this repo is a good sandbox

This repo is designed to exercise the parts of DevDive that matter:

- The README gives the planner concrete product and architecture context.
- The file tree is shallow and easy for the scanner to summarize.
- The app already has realistic seams for follow-up implementation.
- CI can stay green on the baseline and later be intentionally broken for watcher testing.
- Design review can detect architectural drift if future commits bypass shared contracts or bolt state into the wrong layer.

## Local run instructions

1. Copy `.env.example` to `.env` if you want to override the API URL or server port.
2. Install dependencies with `npm install`.
3. Start the API in one terminal: `npm run dev:server`
4. Start the frontend in another terminal: `npm run dev`
5. Open the Vite URL shown in the terminal, usually [http://localhost:5173](http://localhost:5173)

To run the validation suite:

```bash
npm run typecheck
npm run lint
npm run test
```

## Planned but intentionally absent

SQLite persistence and admin authentication are not built yet. The baseline exposes those concepts only as stubs and placeholders so DevDive can decompose them into concrete implementation work instead of reading a finished solution.

## Suggested first follow-up commits

- Implement the assignment write path in the server and memory store.
- Add assignment controls to the frontend using the shared API client.
- Break a contract or a test to trigger CI watcher behavior.
- Introduce an architectural shortcut to test DevDive design review output.

