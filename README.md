# PrepPilot

AI interview prep: pick a role, level and topics, answer AI-generated questions by text or voice, and get scored feedback.

> 🚧 Work in progress. Built in public, phase by phase.

## Tech stack

- **Framework:** Next.js (App Router), TypeScript (strict)
- **API:** oRPC + Zod
- **Database:** PostgreSQL (Neon) + Prisma 7
- **Auth:** Better Auth
- **AI:** Vercel AI SDK (Gemini, Groq)
- **Rate limiting:** Upstash Redis
- **Testing:** Vitest, Playwright, GitHub Actions
- **Hosting:** Vercel

## Features

_Coming soon._

## Architecture

_Coming soon._

## Live demo

_Coming soon._

## Setup

Requires Node 20+ and pnpm.

```bash
git clone https://github.com/jeetgr/prep-pilot.git
cd prep-pilot
pnpm install
cp .env.example .env.local   # fill in values
pnpm dev
```

## Scripts

| Script        | Does                                 |
| ------------- | ------------------------------------ |
| `pnpm dev`    | Start the dev server                 |
| `pnpm check`  | Typecheck, lint and check formatting |
| `pnpm format` | Format all files with Prettier       |
