# AutoPilot-CRM

Full-stack CRM starter with:
- **Backend**: Node.js + Express + TypeScript + Postgres + Auth0 JWT middleware
- **Frontend**: Next.js (App Router) + Tailwind

## Repo structure
- `backend/`: API server
- `frontend/`: Web app

## Prerequisites
- Node.js (LTS recommended)
- npm
- (Optional) Postgres database
- (Optional) Auth0 tenant/app (for protected routes)

## Backend (API)
From `backend/`:

```bash
npm install
npm run dev
```

Scripts:
- `npm run dev`: start dev server (ts-node + nodemon)
- `npm run build`: compile to `dist/`
- `npm start`: run compiled server

## Frontend (Web)
From `frontend/`:

```bash
npm install
npm run dev
```

## Environment variables
This repo ignores `.env` files by default. Create them locally as needed:
- `backend/.env`
- `frontend/.env.local`

## Git ignore notes
Dependencies and build outputs are ignored:
- `backend/node_modules`, `backend/dist`
- `frontend/node_modules`, `frontend/.next`, `frontend/out`