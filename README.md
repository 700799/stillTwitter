# stillTwitter — Claude Code Tweet Dashboard

A full-stack Next.js dashboard for posting and scheduling **150 Claude Code AI agent tips** to Twitter/X.

## Features

- Browse 150 pre-written Claude Code tips across 10 categories
- Search by keyword, filter by category or status (pending / scheduled / posted)
- **Post Now** — posts immediately via Twitter API v2
- **Schedule** — pick a date & time; the background scheduler auto-posts at the right moment
- Stats bar showing total / posted / pending / scheduled counts
- SQLite database seeded automatically on first run

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Get Twitter API credentials

You need a [Twitter Developer account](https://developer.twitter.com/) with a project and app configured for **Read and Write** permissions.

From the Twitter Developer Portal, collect these four values:

| Variable | Where to find it |
|---|---|
| `TWITTER_API_KEY` | App → Keys and Tokens → Consumer Keys |
| `TWITTER_API_SECRET` | App → Keys and Tokens → Consumer Keys |
| `TWITTER_ACCESS_TOKEN` | App → Keys and Tokens → Authentication Tokens |
| `TWITTER_ACCESS_SECRET` | App → Keys and Tokens → Authentication Tokens |

> **Important:** Access tokens must be generated with the app set to **Read and Write**. Read-only tokens will fail when posting.

### 3. Set credentials

```bash
cp .env.local.example .env.local
# Edit .env.local and fill in the four values above
```

### 4. Run

```bash
npm run dev
# → http://localhost:3000
```

The dev server starts a custom Node.js server that also runs the background scheduler (checks every minute for tweets due to post).

## Production

```bash
npm run build
npm start
```

Set the four `TWITTER_*` environment variables in your hosting environment — `.env.local` is not loaded in production.

## Project Structure

```
app/               Next.js App Router pages and API routes
components/        React UI components
data/tweets.ts     150 Claude Code tips (seeded into SQLite on first run)
lib/db.ts          SQLite singleton, schema, and query functions
lib/twitter.ts     Twitter API v2 client wrapper
server.js          Custom server: Next.js + node-cron scheduler
types/index.ts     Shared TypeScript types
twitter_agent.db   SQLite database (created automatically, gitignored)
```

## Tweet Categories

1. Getting Started
2. Slash Commands
3. Tool Use & Permissions
4. Hooks & Automation
5. MCP Servers
6. IDE Integration
7. Multi-Agent & Subagents
8. Productivity Tips
9. Advanced Features
10. Troubleshooting & Best Practices
