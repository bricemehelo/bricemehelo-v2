# 1. Initial architecture

## Status

Proposed

## Context

This repo is my personal portfolio site. It needs to showcase two
interactive AI features:

1. **AI concierge** — a chat panel (hero section) that answers visitor questions about
   Brice's background, skills, and projects.
2. **Pro-bono problem triage** — a form/chat flow where visitors describe a problem and
   get a structured response on whether/how it fits Brice's pro-bono criteria.

The site doubles as a learning project: Brice is building it himself, feature by
feature, under mentorship, to practice the same engineering discipline used on his
other projects (Nestio stack conventions, tests, commit hygiene). A design has already
been produced in Claude Design (split-hero layout, chat panel, animated visual, full
token/component spec) but is explicitly out of scope for this document — it is a visual
reference to build toward once the architecture below is settled, not an input to it.

## Decision

### Frontend: Next.js (App Router), hybrid rendering — not static export

- Every page is static content for v1 (hero, about, projects, etc.). But sections
  like Problems Solved and Speak are expected to become database/CMS-backed and
  admin-managed later. Deploying in Next.js's default **hybrid** mode on Vercel
  (server rendering available per-route, static where nothing changes) rather than
  `next export` (fully static) keeps that door open: adding a dynamic, DB-backed route
  or per-page ISR later is a new route, not a re-platform. Static export would lock the
  whole app to build-time content and force a hosting/build migration the day one
  section needs a database.
- TypeScript throughout.
- **Next.js is scoped to pages/frontend only.** It does not host the AI concierge or
  triage backend — see below. Keeping the frontend framework choice decoupled from the
  backend's runtime and lifecycle means a frontend-only change (a new static page, a
  rendering tweak) never touches the backend's deploy, and vice versa.

### Backend: one serverless function, two system prompts

- The AI concierge and triage flow are served by a single Vercel Serverless Function,
  `api/assistant.ts` at the project root — **not** a Next.js Route Handler. Vercel
  deploys a top-level `/api` directory as standalone serverless functions alongside a
  Next.js app in the same project, so this still ships as one Vercel deployment without
  folding the backend into Next.js's own routing, build, or runtime. Both AI features
  are "send a user message to Claude, get a structured answer back" — same
  request/response shape, same Anthropic SDK call, same error handling and rate
  limiting. Duplicating that scaffolding into two functions would be copy-paste for no
  benefit.
- The request body carries a `mode: "concierge" | "triage"` discriminator. The handler
  selects the system prompt and (for triage) the output schema based on `mode`; it does
  not branch on anything else. If the two modes ever need materially different
  infrastructure (different model, different auth, different rate limits), that's the
  trigger to split them — not before.
- Runtime: **Node.js** (not Edge). Full compatibility with the Anthropic Node SDK and
  npm ecosystem, simpler debugging, and headroom for future work (WebSocket or email
  integrations) that would be awkward or unsupported on the Edge runtime. Cold-start
  latency is a non-issue for a chat reply.
- Model: **Claude Haiku 4.5**, set via an environment variable
  (`ANTHROPIC_MODEL`) with the Haiku 4.5 model ID as the default — not hardcoded, so it
  can be bumped without a code change. Right-sized for portfolio Q&A and triage traffic;
  no reason to pay for a larger model here.
- **No backend persistence in v1.** Conversation history lives client-side only (in
  memory for the session); each request sends the relevant recent turns as context.
  There is no database and no server-side session store. This keeps the backend to
  "one small function" honestly, at the cost of: no cross-device history, no
  usage analytics beyond whatever the function logs, and history resets on page
  reload. If that turns out to matter (e.g., wanting to review triage submissions
  later), the fix is additive — a storage module behind the same function — not a
  rearchitecture. This is separate from the frontend's hybrid-mode choice above: that
  keeps the door open for DB-backed *content pages* later; it says nothing about the
  AI function, which has no persistence of its own either way.
- **Abuse/cost protection is in scope for the function, not deferred.** A public
  endpoint calling a paid LLM API needs basic rate limiting (e.g., IP-based, via a
  lightweight external store like Upstash, or Vercel's own Edge Config/Firewall)
  before it ships, not after. Exact mechanism is an implementation detail for that
  module, but the requirement is fixed here: no unrate-limited path to the Anthropic
  API.

### Deployment: Vercel

- One Vercel project hosts both artifacts: the Next.js app (hybrid rendering) for
  pages, and the standalone `api/assistant.ts` serverless function for the AI backend.
  Same deploy, same environment variables, zero separate infra to manage — but the two
  stay architecturally independent: Next.js has no special knowledge of the assistant
  function beyond the frontend calling its URL over HTTP.
- Environment variables (`ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`) are configured in
  Vercel's project settings for preview/production, and via `.env.local` (gitignored)
  for local dev.

### Standards

- **Conventional commits** (`feat:`, `fix:`, `chore:`, `docs:`, `test:`, etc.) for
  every commit, including this one (`docs:`).
- **Tests from the start**, not bolted on later:
  - **Vitest** for unit and component tests, from day one.
  - **React Testing Library** for component behavior (chat panel renders messages,
    triage form validates input, etc.), from day one.
  - **Playwright** added once the pro-bono triage and booking flows exist — that's
    when there's an actual multi-step, critical user path worth guarding end-to-end.
    Introducing it before those flows exist would mean testing scaffolding rather than
    behavior.
  - New sections/components land with their unit/component tests in the same commit,
    not as a follow-up.
- **Comments explain what and why** — including the "what" where the code alone
  doesn't make intent obvious (this is a personal-standard choice, broader than the
  default "why-only" convention).
- **Secrets in `.env`** — `.env.local` gitignored from the first commit;
  `.env.example` checked in with placeholder keys so the required variables are
  documented.
- **OWASP checklist per module** — each module (the assistant function, the chat
  panel, the triage form) gets a short review against the relevant OWASP Top 10 /
  API Security Top 10 items before it's considered done. For the assistant function in
  particular, that means at minimum: input validation on `mode` and message length,
  rate limiting (API4: Unrestricted Resource Consumption), no secrets reaching the
  client bundle, and treating the system prompt as needing to withstand prompt
  injection from untrusted user input.

## Consequences

- Frontend (Next.js) and backend (a standalone serverless function) deploy together
  as one Vercel project but stay architecturally separate — simplest possible ops
  setup for a solo learning project, without coupling the AI function's lifecycle,
  scaling, or redeploys to the frontend app's build.
- Choosing hybrid rendering over static export means the Next.js app carries a little
  more runtime surface (an SSR path exists) even though every page is static content
  today — accepted specifically to avoid a re-platform when Problems Solved / Speak
  become DB-backed.
- One function serving two modes means a bug in shared scaffolding (e.g., rate
  limiting) affects both features at once — mitigated by testing that scaffolding
  directly rather than only through each mode's happy path.
- No persistence means no durable record of triage submissions out of the box; this
  is a conscious v1 trade-off, not an oversight, and is called out above.
- Locking the model to Haiku 4.5 via env var (not hardcoded) means a future model
  swap is a config change, not a code change.
- Deferring Playwright until the triage/booking flows exist means the concierge chat
  ships v1 without end-to-end coverage, relying on unit/component tests alone until
  then — acceptable since there's no multi-step flow yet to regress.

## Alternatives considered

- **React + Vite SPA** for the frontend (the original decision in this ADR):
  superseded — Vite has no built-in story for the hybrid rendering / ISR this project
  wants once content sections go DB-backed; Next.js provides that natively without a
  frontend rewrite when the time comes.
- **Static export (`next export`)**: rejected — every page is static today, but
  Problems Solved and Speak are expected to become DB-backed and admin-managed;
  static export would force a hosting/build re-platform at that point instead of
  just adding a dynamic route.
- **Folding the AI backend into a Next.js Route Handler** (an intermediate revision
  of this ADR): superseded — it coupled the assistant function's deploys and scaling
  to the frontend app's build, and Vercel already deploys a standalone `/api` function
  alongside a Next.js app in the same project at no extra operational cost, so there
  was no real benefit to merging them.
- **Two separate serverless functions** (one per mode): rejected — the two features
  share their entire request/response/error/rate-limit shape, so splitting them would
  duplicate that scaffolding for no isolation benefit at this scale.
- **Edge runtime** for the function: rejected for v1 — Node's SDK compatibility,
  simpler debugging, and compatibility with future WebSocket/email work outweigh
  Edge's latency edge for a chat reply; revisit if latency becomes a real complaint.
- **Separate frontend/backend repos or services**: rejected — unnecessary operational
  overhead for a single-developer portfolio site; one Vercel project comfortably fits
  a Next.js frontend plus one small serverless function at this scale.
