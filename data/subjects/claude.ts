import type { TweetEntry } from "../../types";
export const claudeTweets: TweetEntry[] = 
[
  // ── Getting Started (10) ──────────────────────────────────────────────
  {
    subject: "Claude Code Tips",
    category: "Getting Started",
    hook: "The one command that makes Claude Code 10x more useful from day one",
    parts: [
      "New to Claude Code? Run `claude` inside any project dir, then type: 'Explain this codebase to me.' You'll get a precise, accurate architecture overview in seconds — better than reading stale docs. Best first command every time."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Getting Started",
    hook: "How to install Claude Code in under 2 minutes (and never look back)",
    parts: [
      "Install Claude Code: `npm install -g @anthropic-ai/claude-code` → run `claude` → paste your Anthropic API key once. That's it. You now have an AI pair programmer who reads your entire repo before saying a word."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Getting Started",
    hook: "Why vague prompts waste your AI tokens — and the exact formula to fix it",
    parts: [
      "❌ 'Add login'\n✅ 'Add a login form to app/login.tsx using the Button from components/ui/Button.tsx and the auth helpers in lib/auth.ts'\n\nSpecificity cuts back-and-forth by ~70%. Claude Code already knows your files — tell it which ones."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Getting Started",
    hook: "The non-interactive Claude Code flag that unlocks CI superpowers",
    parts: [
      "You don't have to babysit Claude Code. Run it headless with `-p`:\n`claude -p 'Write tests for all untested functions in src/utils.ts'`\n\nPipe output, use in scripts, drop in CI. Full agent power, zero interaction. 🧵",
      "Add it to your CI pipeline:\n```yaml\n- name: AI code review\n  run: claude -p 'Review the diff for bugs' --output-format json > review.json\n```\nEvery PR gets an AI review automatically. Engineers see findings before merging.",
      "Combine with `--max-turns` to cap cost per run:\n`claude -p 'Fix all type errors' --max-turns 15`\n\nPredictable token usage, safe for automated pipelines. Budget your AI the same way you budget compute."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Getting Started",
    hook: "Stop re-explaining your codebase every session — use this instead",
    parts: [
      "Create a CLAUDE.md file at your repo root. Claude Code reads it automatically at the start of every session. Put architecture notes, coding conventions, and off-limits files there. One-time setup, permanent payoff. 🧵",
      "Example CLAUDE.md contents:\n- 'All API routes live in app/api/'\n- 'Use zod for validation, never raw JSON.parse'\n- 'Do not modify prisma/schema.prisma without asking'\n\nClaude Code treats this as standing orders. No more repeated context.",
      "You can also put CLAUDE.md in subdirectories. Claude reads the nearest one to the files it's working on. Great for monorepos where each package has different rules and conventions."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Getting Started",
    hook: "Paste the error, skip the explanation — Claude Code's fastest debugging trick",
    parts: [
      "When you hit an error, don't explain it to Claude Code. Just paste the raw error message and say 'fix this.' It reads the stack trace, finds relevant files, patches root cause — usually in one turn. 🧵",
      "Why this works: the stack trace contains exact file paths and line numbers. Claude navigates directly to them, reads context, and understands the bug better than any explanation you'd write.",
      "Bonus: paste multiple errors at once. 'Here are 3 failing test outputs: [paste]. Fix all of them.' Claude triages, finds shared root causes, and fixes them in one pass — not three separate sessions."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Getting Started",
    hook: "The --model flag nobody talks about (and when to actually use it)",
    parts: [
      "`claude --model claude-opus-4-5` for complex architectural decisions. Default Sonnet for everyday coding. Switching models mid-workflow costs more tokens but gains reasoning depth. Here's my decision rule: 🧵",
      "Use Opus when: designing a new system, making irreversible decisions, reviewing security-critical code, or debugging a particularly gnarly concurrency bug. Spend the tokens where reasoning depth pays off.",
      "Use Sonnet (default) for: writing boilerplate, refactoring known patterns, adding tests, fixing type errors. Fast, cheap, accurate for well-defined tasks. Match model to task complexity — not habit."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Getting Started",
    hook: "Why Claude Code starting cautious is actually a feature, not a bug",
    parts: [
      "Claude Code asks permission before running commands by default. This isn't annoying — it's a safety net. Learn which commands it asks about, then expand permissions deliberately. Trust built slowly never blows up prod. 🧵",
      "The pattern: use Claude interactively for a week, note which tool approvals you always click 'yes' on. Those go in your `allowedTools` allowlist. Everything else stays gated. Permissiveness earned, not assumed.",
      "For commands you approve every single time — npm test, npm run lint, git status — add them permanently. For rm, git push, db writes: keep the prompt. The 2-second approval is cheap insurance against an expensive mistake."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Getting Started",
    hook: "The session history trick that saves 20 minutes of re-explaining",
    parts: [
      "Claude Code remembers everything from earlier in the same session. After refactoring one file, just say: 'Apply the same pattern to the other 4 files we haven't touched yet.' No re-explaining. No copy-paste. It knows. 🧵",
      "This works for: 'Use the same error handling we added to auth.ts for all the other routes,' 'Add the same logging we discussed to every new function,' 'Apply that same type fix pattern across the remaining files.'",
      "The session is a shared workspace. Reference earlier decisions by describing what you did, not by repeating the instructions. Claude's working memory is your productivity multiplier — use it deliberately."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Getting Started",
    hook: "How Claude Code handles languages — the answer will surprise you",
    parts: [
      "Claude Code works with Python, TypeScript, Go, Rust, Ruby, SQL, Bash, and more — zero special setup. No language server, no plugin. If it's readable text in a file, Claude Code can understand and rewrite it. 🧵",
      "It also understands config formats: YAML, TOML, JSON, HCL (Terraform), Dockerfile, Makefile, nginx.conf. Ask it to 'optimize this Dockerfile for a smaller final image' and it'll know what it's looking at.",
      "Polyglot projects are no problem. 'This Python service calls the Go microservice. Trace the request path and check for type mismatches at the boundary.' Claude reads both languages and reasons across them."
    ]
  },

  // ── Slash Commands (10) ───────────────────────────────────────────────
  {
    subject: "Claude Code Tips",
    category: "Slash Commands",
    hook: "The /compact command that rescued my 3-hour session from context death",
    parts: [
      "Long Claude Code sessions eat context fast. When things slow down, run `/compact`. It summarizes the conversation so far and resets the window — keeping your progress without losing the thread. Use it proactively, not as a last resort."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Slash Commands",
    hook: "Why /clear exists and the exact moment you should use it",
    parts: [
      "`/clear` wipes the conversation and starts fresh. Use it when:\n• Switching to an unrelated task\n• Context is polluted with failed attempts\n• You want Claude approaching a problem fresh\n\nClean context = cleaner thinking."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Slash Commands",
    hook: "The /doctor command every Claude Code user should run first",
    parts: [
      "Run `/doctor` at the start of any troubleshooting session. It checks installation, API key validity, network access, and config files. Diagnoses most 'why isn't this working' issues in 5 seconds flat. 🧵",
      "Common things `/doctor` catches: expired API key, wrong base URL for a custom endpoint, missing node version, corrupt settings.json, network proxy blocking API calls. All diagnosable before you waste 20 minutes debugging.",
      "Make `/doctor` your first move, every time something feels off. Not your second or third move — your first. It's the shortest path from 'something's broken' to knowing exactly what to fix."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Slash Commands",
    hook: "How /review turns Claude Code into a senior code reviewer on demand",
    parts: [
      "Type `/review` and Claude Code will analyze your recent changes like a senior engineer — checking for bugs, security issues, performance problems, and style violations. No PR needed. Just uncommitted diff or staged changes. 🧵",
      "Combine `/review` with a focus area: '/review focusing on security and input validation'. Claude Code will prioritize those lenses while still flagging anything critical it finds elsewhere.",
      "Use `/review` before every PR. It catches the obvious stuff so human reviewers can focus on architecture, intent, and edge cases — the things that actually need a human."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Slash Commands",
    hook: "Building your own slash commands for Claude Code (it's simpler than you think)",
    parts: [
      "You can define custom slash commands in `.claude/commands/`. Create a Markdown file like `deploy-check.md` with a prompt, and it becomes `/project:deploy-check` in any session. Team-wide shortcuts for your most common workflows."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Slash Commands",
    hook: "The /init command that writes your CLAUDE.md for you automatically",
    parts: [
      "Don't want to write CLAUDE.md from scratch? Run `/init` in a new project. Claude Code will explore the codebase, identify key patterns, and generate a solid starting CLAUDE.md for you. Edit the output — don't start from nothing."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Slash Commands",
    hook: "Using /cost to stop surprise API bills before they happen",
    parts: [
      "Run `/cost` at any point in a session to see token usage and estimated cost so far. Essential for long agentic tasks. Set a mental budget before starting and check `/cost` at natural breakpoints. 🧵",
      "High cost is usually a signal: your context is bloated. Run `/compact` to summarize and reset the window, then continue. Often cuts the remaining session cost by 50%+ without losing any progress.",
      "For automated pipelines: pipe `claude --output-format json` and parse the `usage` field from the response. Log token counts per task. After a week you'll know exactly which workflows are worth the cost."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Slash Commands",
    hook: "The /memory command and why your Claude setup should use it constantly",
    parts: [
      "`/memory` lets you view and edit Claude Code's persistent memory file. Store your preferred test framework, branch naming conventions, or 'never use var in JS.' Persists across sessions — preferences follow you everywhere. 🧵",
      "Good things to put in memory:\n• 'I prefer functional components over class components'\n• 'Always suggest error boundaries for React trees'\n• 'My projects use pnpm, not npm'\n• 'Prefer explicit return types in TypeScript'",
      "Memory is global (all projects). CLAUDE.md is per-project. Use memory for personal style preferences, CLAUDE.md for project-specific rules. Layer them: memory sets defaults, CLAUDE.md overrides per project."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Slash Commands",
    hook: "What /status tells you that the terminal output never shows",
    parts: [
      "`/status` shows active model, session context length, current tool permissions, and memory usage at a glance. Check it when a session feels sluggish or when you're unsure what Claude can access in the current environment."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Slash Commands",
    hook: "Creating team-wide Claude Code slash commands in a shared repo",
    parts: [
      "Put shared slash commands in `.claude/commands/` and commit them to your repo. Every teammate gets the same `/project:*` commands automatically. Great for release checklists, onboarding prompts, and code review templates. 🧵",
      "Example: `.claude/commands/pr-ready.md` with content: 'Run tests, check for TODO comments, verify no console.logs, ensure all exports are typed. Report findings.' → `/project:pr-ready` before every PR.",
      "Onboarding command: `.claude/commands/explain-codebase.md` → 'Walk me through this codebase: architecture, key files, data flow, and how to run it locally.' New dev → one command → full orientation."
    ]
  },

  // ── Tool Use & Permissions (10) ────────────────────────────────────────
  {
    subject: "Claude Code Tips",
    category: "Tool Use & Permissions",
    hook: "The --allowedTools flag that lets Claude Code run without asking permission",
    parts: [
      "Tired of approving every bash command? Use `--allowedTools` to pre-authorize specific tools:\n`claude --allowedTools 'bash,read,write'`\n\nClaude runs those tools without prompting. Keep the list tight — don't give blanket access unless you trust the task fully."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Tool Use & Permissions",
    hook: "How I accidentally let Claude delete prod data — and what I changed immediately",
    parts: [
      "Lesson learned the hard way: always scope `--allowedTools bash` to read-only commands when doing analysis tasks. Add `--disallowedTools 'bash(rm*),bash(git push*)'` as a safety rail. Prevention beats recovery every single time. 🧵",
      "For destructive operations, I now always run Claude Code interactively and require explicit approval for: rm, git push, database writes, and any curl/fetch to external APIs. One permission prompt saved my entire prod database.",
      "Add these to your CLAUDE.md: 'Before deleting any file, list what will be deleted and ask for confirmation.' Claude Code follows written instructions consistently — use that to enforce your own safety culture."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Tool Use & Permissions",
    hook: "The settings.json permission block that stops you from having to approve things twice",
    parts: [
      "Add frequently-approved commands to `.claude/settings.json` under `allowedTools`. Claude Code skips the prompt for those tools in every future session. Example: `{ \"allowedTools\": [\"read\", \"bash(npm test)\", \"bash(npm run lint)\"] }`"
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Tool Use & Permissions",
    hook: "Why Claude Code has a browser tool — and how to actually use it",
    parts: [
      "Claude Code can launch a headless browser to scrape docs, check a live URL, or verify a UI change rendered correctly. Say: 'Open localhost:3000 and check if the login form is visible.' It screenshots and reports back. 🧵",
      "Practical uses: 'Check the docs at docs.stripe.com/api/charges and update our Stripe integration to use the current API.' Claude fetches live docs and applies them to your actual code — no tab-switching.",
      "For E2E debugging: 'Open localhost:3000/dashboard, log in with test credentials, and check if the chart component loads without errors.' Claude navigates, interacts, and reports — like a QA engineer in your terminal."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Tool Use & Permissions",
    hook: "Locking Claude Code to read-only mode for safe codebase exploration",
    parts: [
      "Exploring a new codebase and don't want any changes? Run:\n`claude --allowedTools 'read,bash(grep*),bash(find*)'`\n\nClaude can explore, search, and explain — but can't write a single byte. Perfect for audits and code archaeology. 🧵",
      "Read-only mode use cases: onboarding to a new repo, auditing a client codebase, reviewing a vendor's code before integrating, or just understanding a system without fear of accidentally modifying anything.",
      "Pair read-only Claude with a branch: checkout a new branch first, then allow writes. You get exploration safety (you can blow away the branch) without sacrificing the ability to generate example fixes or proof-of-concept changes."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Tool Use & Permissions",
    hook: "The WebSearch tool inside Claude Code most people don't know exists",
    parts: [
      "Claude Code can search the web mid-task. Say: 'Look up the latest Next.js 15 App Router docs and update our routing to match.' It fetches live docs and applies them to your actual files. No tab-switching required. 🧵",
      "Best for: keeping up with fast-moving APIs. 'Search for breaking changes in React 19 and audit our codebase for patterns that need updating.' Claude searches, reads release notes, and files the specific changes needed.",
      "Also great for: 'Find the best TypeScript pattern for discriminated unions and refactor our status types to match.' It searches, evaluates options, picks the best one, and applies it — research + implementation in one step."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Tool Use & Permissions",
    hook: "How to let Claude Code run tests automatically without approving every run",
    parts: [
      "Pre-authorize your test runner in settings.json:\n`{ \"allowedTools\": [\"bash(npm test)\", \"bash(pytest)\", \"bash(go test ./...)\"] }`\n\nClaude will run tests after every code change, parse failures, and iterate — fully autonomous TDD loop."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Tool Use & Permissions",
    hook: "The difference between allowedTools and disallowedTools (and when to use each)",
    parts: [
      "`allowedTools`: tight allowlist — only these tools permitted.\n`disallowedTools`: denylist — all tools allowed except these.\n\nFor prod: allowlist is safer. For dev: a denylist of dangerous commands is more ergonomic. Choose the right model. 🧵",
      "Production CI pattern: `--allowedTools 'read,bash(npm test),bash(npm run build)'`. Claude can only read, test, and build — nothing destructive. Every other tool blocked by default.",
      "Dev pattern: `--disallowedTools 'bash(rm -rf*),bash(git push --force*),bash(DROP*)'`. Blocks the catastrophic stuff, everything else flows freely. Ergonomic for fast iteration, safe from foot-guns."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Tool Use & Permissions",
    hook: "Giving Claude Code access to your private npm registry without exposing credentials",
    parts: [
      "Claude Code inherits your shell environment, including npm auth from `~/.npmrc`. No extra config needed. Run `claude` in a terminal where `npm install` already works — Claude gets the same registry access automatically. 🧵",
      "This extends to: AWS credentials (`~/.aws/credentials`), Docker auth (`~/.docker/config.json`), kubectl contexts (`~/.kube/config`), and any other tool-specific auth files. Claude inherits your authenticated shell — configure once, use everywhere.",
      "Security note: because Claude inherits your full environment, be careful running `claude` as a user with broad cloud permissions. Scope down to a least-privilege role for automated pipelines. Interactive dev sessions with your normal credentials are fine."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Tool Use & Permissions",
    hook: "The --max-turns flag that prevents runaway agent loops from burning tokens",
    parts: [
      "Agentic tasks can loop. Cap them: `claude --max-turns 10 -p 'Refactor all deprecated API calls'`\n\nIf Claude hasn't finished in 10 turns, it stops and reports status. You review, then decide whether to continue. Guardrails are good."
    ]
  },

  // ── Hooks & Automation (10) ───────────────────────────────────────────
  {
    subject: "Claude Code Tips",
    category: "Hooks & Automation",
    hook: "How I made Claude Code automatically run tests after every code change",
    parts: [
      "Claude Code hooks let you run scripts at specific lifecycle events. Add a PostToolUse hook that fires after every file write — trigger your test suite automatically. Here's the exact setup: 🧵",
      "In `.claude/settings.json`:\n```json\n{\n  \"hooks\": {\n    \"PostToolUse\": [{\n      \"matcher\": \"write\",\n      \"hooks\": [{\"type\": \"command\", \"command\": \"npm test --bail\"}]\n    }]\n  }\n}\n```\nTests run after every write. Claude sees failures and self-corrects.",
      "The real power: Claude Code reads the test output and iterates. If tests fail after a write, it diagnoses the failure, edits the code, and re-runs — all without you typing a word. Full autonomous TDD."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Hooks & Automation",
    hook: "The SessionStart hook that configures Claude Code perfectly every single time",
    parts: [
      "Use a SessionStart hook to auto-run setup tasks when Claude Code launches:\n`{ \"hooks\": { \"SessionStart\": [{ \"type\": \"command\", \"command\": \"git fetch && npm install\" }] } }`\n\nEvery session starts with fresh deps and latest remote. No manual setup drift."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Hooks & Automation",
    hook: "Running Claude Code on a cron schedule to automate weekly dependency updates",
    parts: [
      "Combine `claude -p` with node-cron to run scheduled agentic tasks:\n```js\ncron.schedule('0 9 * * 1', () => {\n  exec(\"claude -p 'Update all npm deps, run tests, commit if green'\")\n})\n```\nMonday 9am: automated dep updates. No human required."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Hooks & Automation",
    hook: "The PostToolUse hook pattern that auto-formats code after every Claude edit",
    parts: [
      "Never worry about formatting again. Add a PostToolUse hook:\n```json\n{\n  \"matcher\": \"write\",\n  \"hooks\": [{\"type\": \"command\", \"command\": \"prettier --write $CLAUDE_TOOL_OUTPUT_FILE\"}]\n}\n```\nEvery file Claude writes gets auto-formatted. Consistent style, zero effort."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Hooks & Automation",
    hook: "How to use hooks to auto-commit every Claude Code change with a proper message",
    parts: [
      "PostToolUse hook for auto-commits:\n```json\n{\n  \"matcher\": \"write\",\n  \"hooks\": [{\n    \"type\": \"command\",\n    \"command\": \"git add -A && git commit -m 'claude: $CLAUDE_TOOL_INPUT_DESCRIPTION'\"\n  }]\n}\n```\nEvery Claude write becomes a granular git commit. Full history, easy rollback."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Hooks & Automation",
    hook: "The hook that sends you a Slack message when a long Claude Code task finishes",
    parts: [
      "Running a multi-hour agentic task? Add a Stop hook:\n```json\n{\n  \"hooks\": {\n    \"Stop\": [{\n      \"type\": \"command\",\n      \"command\": \"curl -X POST $SLACK_WEBHOOK -d '{\\\"text\\\": \\\"Claude Code task finished!\\\"}'\"\n    }]\n  }\n}\n```\nGo touch grass. Get pinged when it's done."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Hooks & Automation",
    hook: "Using PreToolUse hooks to intercept and validate Claude Code actions before they run",
    parts: [
      "PreToolUse hooks run BEFORE a tool executes — and can block it. Write a script that checks if a bash command touches production configs. If yes, exit non-zero to abort the action. Safety enforced at the hook layer, not just trust. 🧵",
      "Example guard script:\n```bash\n#!/bin/bash\nif echo \"$CLAUDE_TOOL_INPUT\" | grep -q 'production\\|prod\\.'; then\n  echo 'Blocked: production reference detected'\n  exit 1\nfi\n```\nMount this as a PreToolUse hook on bash. Nothing touches prod without passing the check.",
      "This pattern works for any sensitive operation: blocking force pushes, preventing drops of specific DB tables, or enforcing that migrations are only run with a --dry-run flag first. Write the guard once, protect forever."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Hooks & Automation",
    hook: "The 10-line script that turns Claude Code into a nightly code review bot",
    parts: [
      "```bash\n#!/bin/bash\n# nightly-review.sh\ngit diff main..HEAD > /tmp/diff.txt\nclaude -p \"Review this diff for bugs and security issues: $(cat /tmp/diff.txt)\" \\\n  --output-format json > /tmp/review.json\n```\nAdd to cron. Wake up to a security review of everything merged yesterday."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Hooks & Automation",
    hook: "How hooks let Claude Code self-heal after linting failures",
    parts: [
      "Chain hooks to create a self-healing loop: PostToolUse write → run eslint → if exit code non-zero, Claude reads output and fixes violations → write again → lint again. Loop until green. Fully autonomous lint compliance."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Hooks & Automation",
    hook: "Environment variables in hooks — the clean way to manage secrets",
    parts: [
      "Hook commands inherit your shell environment. Store API keys, webhook URLs, and tokens in your shell profile or a .env file sourced at login. Hooks pick them up as `$VAR_NAME`. Never hardcode secrets in settings.json — that file gets committed."
    ]
  },

  // ── MCP Servers (10) ──────────────────────────────────────────────────
  {
    subject: "Claude Code Tips",
    category: "MCP Servers",
    hook: "What MCP servers actually are — and why they change everything about Claude Code",
    parts: [
      "MCP (Model Context Protocol) servers give Claude Code structured access to external systems — databases, APIs, file systems, cloud services. Instead of copy-pasting data into the chat, Claude reaches out and reads/writes it directly. 🧵",
      "Configure an MCP server in `.claude/settings.json`:\n```json\n{\n  \"mcpServers\": {\n    \"postgres\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"@modelcontextprotocol/server-postgres\", \"$DATABASE_URL\"]\n    }\n  }\n}\n```\nNow Claude can query your DB in natural language.",
      "With a Postgres MCP server active, you can say: 'Find all users who signed up last week but never completed onboarding.' Claude writes and runs the SQL, formats the result, and suggests follow-up actions. Your DBA just got an AI copilot."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "MCP Servers",
    hook: "The GitHub MCP server that lets Claude Code open PRs without leaving your terminal",
    parts: [
      "Add the GitHub MCP server to Claude Code and unlock: creating issues, opening PRs, reading comments, merging branches — all from natural language in your terminal. 'Open a PR from this branch with a summary' just works. 🧵",
      "Setup in `.claude/settings.json`:\n```json\n{\n  \"mcpServers\": {\n    \"github\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"@modelcontextprotocol/server-github\"],\n      \"env\": { \"GITHUB_TOKEN\": \"$GITHUB_TOKEN\" }\n    }\n  }\n}\n```",
      "Full workflow: code the feature → 'Run tests' → 'Create a PR with title and description summarizing these changes, assign to me, add label enhancement.' One natural language command handles the entire GitHub side of shipping."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "MCP Servers",
    hook: "How I connected Claude Code to my production database safely (without read/write risk)",
    parts: [
      "Use the Postgres MCP server with a read-only connection string. Claude can query, analyze, and explain data — but can't mutate anything. Set up a read replica if needed. Analytics-grade access, zero write risk. 🧵",
      "Read-only DSN pattern: `postgresql://readonly_user:pass@replica-host/mydb`. Configure it in settings.json under `mcpServers`. Claude gets your full schema, can write complex queries, but INSERT/UPDATE/DELETE fail at the DB level.",
      "What this unlocks: 'Find all orders over $500 that haven't been fulfilled in 7+ days.' Claude writes the SQL, runs it, formats the result as a table, and suggests follow-up queries. Business intelligence from plain English."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "MCP Servers",
    hook: "The Filesystem MCP server trick for giving Claude Code access to outside your repo",
    parts: [
      "Claude Code only reads within your project by default. The Filesystem MCP server lets you grant access to specific external directories — like `~/Documents/specs` or a shared network drive. Scoped access, no repo pollution."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "MCP Servers",
    hook: "Building a custom MCP server in 20 lines of TypeScript",
    parts: [
      "MCP servers are just processes speaking JSON-RPC. The SDK makes it trivial to wrap your internal API. Here's the minimal pattern: 🧵",
      "```ts\nimport { Server } from '@modelcontextprotocol/sdk/server';\nconst server = new Server({ name: 'my-api' });\nserver.tool('get_user', ({ id }) => fetchUser(id));\nserver.run();\n```\nRegister it in `.claude/settings.json` → Claude Code can call your API natively.",
      "Once connected, say: 'Fetch user 42 and check if their subscription is expired.' Claude calls your tool, reads the result, and reasons about it — without you writing a single prompt template."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "MCP Servers",
    hook: "The Slack MCP server that lets Claude Code search your team's message history",
    parts: [
      "Add the Slack MCP server and tell Claude: 'Find all conversations from last week where the team discussed the auth bug.' It searches Slack, summarizes the thread, and links to relevant decisions. Institutional knowledge, unlocked."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "MCP Servers",
    hook: "MCP servers vs. bash tools — when to use each in Claude Code",
    parts: [
      "Use bash tools for: one-off commands, file operations, running scripts.\nUse MCP servers for: repeated structured access to external systems (DBs, APIs, services) where you want typed inputs/outputs and proper error handling.\n\nBash is a hammer. MCP is a Swiss Army knife."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "MCP Servers",
    hook: "The Brave Search MCP server that gives Claude Code real-time web knowledge",
    parts: [
      "Add Brave Search MCP to let Claude Code search the web with structured results instead of raw HTML scraping. Say: 'Search for the latest CVEs affecting express.js and check if we're vulnerable.' It searches, reads, and audits — in one step."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "MCP Servers",
    hook: "Sharing MCP server configs across your team without duplicating setup",
    parts: [
      "Put MCP server configs in `.claude/settings.json` and commit them to your repo. Everyone who clones and runs `claude` gets the same MCP tools automatically. One setup → whole team benefits. Consistent tooling, zero drift."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "MCP Servers",
    hook: "How the Memory MCP server gives Claude Code long-term knowledge across sessions",
    parts: [
      "The Memory MCP server lets Claude store and retrieve facts across sessions: project decisions, known bugs, preferred patterns. Unlike CLAUDE.md (static text), Memory MCP holds structured knowledge Claude actively updates. 🧵",
      "Example: 'Remember that the payments service has a known race condition in processRefund() when two requests arrive within 100ms. Always check for this when modifying that function.' Claude stores it, recalls it next session automatically.",
      "Memory MCP + CLAUDE.md is the full long-term setup: CLAUDE.md for static project context that you control, Memory MCP for dynamic knowledge Claude accumulates. Together they make every session feel like Claude never left your project."
    ]
  },

  // ── IDE Integration (10) ──────────────────────────────────────────────
  {
    subject: "Claude Code Tips",
    category: "IDE Integration",
    hook: "Why I run Claude Code in a split terminal next to VS Code (not the extension)",
    parts: [
      "VS Code extension gives Claude a narrow view of one file. A terminal `claude` gives it your entire repo, all running processes, and full filesystem access. For complex tasks, terminal Claude wins every time. 🧵",
      "Set up: VS Code terminal → split (Ctrl+Shift+5) → run `claude` in one pane, keep your normal shell in the other. Use the editor for reviewing diffs, the Claude terminal for issuing tasks. Best of both worlds.",
      "The terminal also lets you use all of Claude's flags: `--allowedTools`, `--max-turns`, `--model`, hooks, MCP servers. The VS Code extension abstracts those away. For power use, the terminal is always more capable."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "IDE Integration",
    hook: "The VS Code task that launches Claude Code with one keyboard shortcut",
    parts: [
      "Add to `.vscode/tasks.json`:\n```json\n{\n  \"label\": \"Claude Code\",\n  \"type\": \"shell\",\n  \"command\": \"claude\",\n  \"presentation\": { \"panel\": \"dedicated\" }\n}\n```\nBind to a keybind in `keybindings.json`. One keystroke, instant AI terminal."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "IDE Integration",
    hook: "How Claude Code and your IDE's git panel work better together than apart",
    parts: [
      "Let Claude Code write and edit files, then review diffs in your IDE's git panel before committing. Best of both worlds: AI speed for writing, human visual review for staging. Never commit Claude's work without a quick diff glance."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "IDE Integration",
    hook: "The JetBrains terminal trick that makes Claude Code feel like a native feature",
    parts: [
      "In JetBrains IDEs, split the integrated terminal: one pane for `claude`, one for your normal shell. Use the IDE file tree to navigate and review diffs, issue commands to Claude in its pane. Files update in real-time in the editor. 🧵",
      "Right-click any file in the Project pane → 'Copy Relative Path' → paste the path into the Claude terminal. Zero context-switching, no typing paths from memory. The IDE's file tree becomes your navigation layer for Claude.",
      "Enable 'Auto-reload files' in JetBrains settings. When Claude writes a file, the editor refreshes it automatically. You see changes highlighted in the gutter immediately — same as if you typed the code yourself."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "IDE Integration",
    hook: "Using Claude Code alongside GitHub Copilot — they complement each other",
    parts: [
      "Copilot excels at line-level completions as you type. Claude Code excels at multi-file tasks, architecture, and running commands. Use both: Copilot for in-editor flow, Claude Code for anything that spans more than one file. 🧵",
      "Workflow: let Copilot auto-complete individual functions as you write. When you need to refactor across files, add a feature with test coverage, or investigate a bug — switch to Claude Code. Different tools for different scopes.",
      "Think of it as: Copilot is your typing accelerator, Claude Code is your thinking partner. One helps you write faster, one helps you design better. Neither replaces the other — they cover different parts of the development process."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "IDE Integration",
    hook: "How to point Claude Code at a specific file from your IDE without context-switching",
    parts: [
      "Copy the relative path from your IDE (most IDEs have 'Copy Relative Path'). In Claude Code:\n'Refactor the function in src/api/users/handlers.ts to use async/await throughout'\n\nNo file browsing. Direct, surgical instructions."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "IDE Integration",
    hook: "The .editorconfig file that makes Claude Code respect your team's formatting rules",
    parts: [
      "Claude Code reads `.editorconfig` and respects tab width, line endings, and indent style settings automatically. If your project already has an .editorconfig, Claude won't fight your formatter. Consistent code, no arguments."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "IDE Integration",
    hook: "Running Claude Code inside a Docker container for safe, isolated experiments",
    parts: [
      "`docker run -it -v $(pwd):/app -w /app node:20 bash` → install `@anthropic-ai/claude-code` → `claude`\n\nRun Claude Code inside a container. Experiment destructively without touching your host. Throwaway env for throwaway experiments. 🧵",
      "Add your API key: `docker run -it -e ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY -v $(pwd):/app -w /app node:20 bash`. Claude inherits the env var. Full access to your repo via the volume mount, but all filesystem writes stay in the container.",
      "For repeatable experiments: write a Dockerfile with Claude Code pre-installed. `docker build -t claude-sandbox . && docker run -it claude-sandbox`. Same environment every time. Share with teammates who want to try the same experiment safely."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "IDE Integration",
    hook: "The Neovim terminal integration that puts Claude Code one keypress away",
    parts: [
      "In Neovim, add to your config:\n`:nnoremap <leader>ai :terminal claude<CR>`\n\nHit leader+ai and a terminal running Claude Code opens in a split. Reference the filename of your current buffer directly. Claude knows all the files — you just tell it which one."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "IDE Integration",
    hook: "Why Claude Code in tmux is the ultimate power-user setup",
    parts: [
      "tmux setup: pane 1 = editor (vim/nano), pane 2 = claude, pane 3 = running dev server. Switch between panes with keyboard shortcuts. Claude makes changes, server hot-reloads, you see results instantly. No alt-tab. Pure keyboard flow."
    ]
  },

  // ── Multi-Agent & Subagents (10) ──────────────────────────────────────
  {
    subject: "Claude Code Tips",
    category: "Multi-Agent & Subagents",
    hook: "How Claude Code spawns subagents to parallelize work across your codebase",
    parts: [
      "Claude Code can spawn subagent instances to work on independent tasks simultaneously. Say: 'Write tests for every file in src/utils/ in parallel.' Claude orchestrates multiple agents, collects results, and merges them. Hours of work in minutes. 🧵",
      "Subagents work best for embarrassingly parallel tasks: writing tests for N files, translating comments in N components, auditing N API endpoints. Each subagent gets its own context and file scope — no stepping on each other.",
      "The orchestrator Claude tracks subagent progress, handles failures, and synthesizes results. You see a single coherent output. The parallelism is invisible to you — you just asked for something and got it faster."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Multi-Agent & Subagents",
    hook: "The multi-agent pattern that rewrote our entire test suite overnight",
    parts: [
      "Task: 'Write unit tests for every exported function across 47 files in src/.' With subagents, Claude Code split the work across parallel workers, each tackling a subset of files. 47 files. ~2000 test cases. Done while I slept."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Multi-Agent & Subagents",
    hook: "When NOT to use subagents — the mistake that cost me an hour of cleanup",
    parts: [
      "Don't use parallel subagents for tasks with shared state: multiple agents editing the same file causes conflicts. Use subagents for independent work only. Same rule as parallel programming — share nothing, parallelize everything."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Multi-Agent & Subagents",
    hook: "Building a multi-agent pipeline: one Claude writes code, one reviews it",
    parts: [
      "Pipeline pattern:\n1. Agent 1: 'Implement the feature per the spec in SPEC.md'\n2. Agent 2: 'Review the diff from Agent 1 for bugs and security issues'\n3. Agent 3: 'Apply the review fixes'\n\nSelf-reviewing AI pipeline with no human in the loop until final approval."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Multi-Agent & Subagents",
    hook: "How to pass context between Claude Code subagents without leaking it into main chat",
    parts: [
      "Use files as the inter-agent message bus. Subagent 1 writes findings to `/tmp/analysis.json`. Subagent 2 reads it as input. The main orchestrator never sees the raw intermediate data — just the final synthesized result."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Multi-Agent & Subagents",
    hook: "The subagent trick that generates a full API from a spec file in one command",
    parts: [
      "Say to Claude Code: 'Read openapi.yaml and implement every endpoint as a separate Express handler in src/routes/, one file per resource, in parallel.' Subagents spin up per resource. Full API scaffolded from spec in minutes."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Multi-Agent & Subagents",
    hook: "Using Claude Code as an orchestrator to coordinate multiple external agents",
    parts: [
      "Claude Code can serve as the orchestrator for a system of specialized agents: one for DB queries (via MCP), one for API calls, one for file writes. The main Claude delegates, collects, and synthesizes. True multi-agent architecture in your terminal."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Multi-Agent & Subagents",
    hook: "How subagents handle errors differently than a single long Claude session",
    parts: [
      "If one subagent fails, others continue. The orchestrator reports the failure and either retries the failed subtask or skips it with a note. This is more resilient than a single long session where one error can stall the whole task."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Multi-Agent & Subagents",
    hook: "The --output-format json flag that makes Claude Code output machine-parseable results",
    parts: [
      "`claude --output-format json -p 'Audit all API endpoints for missing auth checks'`\n\nOutput is structured JSON — pipe it to jq, store it in a DB, or feed it into another process. Claude's analysis becomes a data source for your toolchain."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Multi-Agent & Subagents",
    hook: "Monitoring subagent progress in real time with streaming output",
    parts: [
      "Use `--output-format stream-json` to get real-time event-by-event output from Claude Code. Build a simple dashboard that shows which subagents are running, what they've completed, and token usage per agent. Visibility into your AI pipeline."
    ]
  },

  // ── Productivity Tips (10) ─────────────────────────────────────────────
  {
    subject: "Claude Code Tips",
    category: "Productivity Tips",
    hook: "The 2-minute CLAUDE.md setup that saves me 10 hours of debugging every month",
    parts: [
      "My CLAUDE.md always includes:\n• Stack versions (Node 20, Next 14, Postgres 16)\n• File structure overview\n• 'Run npm test before committing'\n• Known gotchas ('auth middleware must come before route handlers')\n\nTwo minutes of writing, hours of avoided mistakes."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Productivity Tips",
    hook: "How I use Claude Code for daily standups — yes, really",
    parts: [
      "`claude -p 'Summarize git commits from the last 24 hours into bullet points suitable for a standup update'`\n\nPipe through your standup template. Copy, paste, done. Your 'what did I do yesterday' answer, automated. 🧵",
      "Full standup script:\n```bash\ngit log --since='24 hours ago' --oneline \\\n  --author=\"$(git config user.name)\" \\\n  | claude -p 'Format as standup: yesterday/today/blockers'\n```\nRun before your standup. Never blank again.",
      "Alias it: `alias standup='git log --since=24h --oneline | claude -p \"Standup summary\"'`. Hook to your calendar to auto-generate draft notes each morning before you open Slack. Future you will thank present you."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Productivity Tips",
    hook: "The context window trick that keeps Claude Code fast on 50k-line codebases",
    parts: [
      "Large repos: don't ask Claude to 'look at everything.' Direct it to specific files. 'Read src/api/auth.ts and fix the token refresh bug on line 47.' Scoped prompts use less context, respond faster, and make fewer assumptions. 🧵",
      "For broad tasks on big codebases: start with `/compact` if you've been in the session a while, then give Claude a map: 'The relevant files are in src/payments/ — ignore everything else.' Narrow context = sharper answers.",
      "Use grep/find first: `grep -r 'refreshToken' src/ | head -20` then give Claude that output. Let the computer find the files, let Claude reason about them. Hybrid human+AI search beats asking Claude to grep blindly."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Productivity Tips",
    hook: "Why I stopped writing commit messages by hand (Claude Code does it better)",
    parts: [
      "`git diff --staged | claude -p 'Write a conventional commit message for these changes'`\n\nClaude reads the diff, understands intent, writes a precise commit message. Better than mine 90% of the time. Here's how to wire it up: 🧵",
      "Alias in your shell profile:\n`alias gcm='git diff --staged | claude -p \"Write a conventional commit message. Output only the message, no explanation.\"'`\n\n`git add -p && gcm` → perfect commit message in one flow.",
      "For monorepos, add scope context: `alias gcm='git diff --staged | claude -p \"Write a conventional commit message with scope based on changed directories.\"'` Claude infers `feat(auth):` or `fix(api):` from the diff automatically."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Productivity Tips",
    hook: "The refactoring workflow that lets Claude Code touch 30 files without losing track",
    parts: [
      "For large refactors:\n1. Ask Claude to list ALL files that need changing first\n2. Approve the list\n3. Tell it to proceed file by file\n4. Review each change before continuing\n\nBatch planning + sequential execution = zero missed files, full control."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Productivity Tips",
    hook: "How to use Claude Code for code archaeology on legacy systems",
    parts: [
      "Inheriting a legacy codebase? Ask Claude Code: 'Trace the data flow from when a user submits a payment form to when money moves.' It'll follow the call chain across files and produce a flow diagram in text. Archaeology in minutes."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Productivity Tips",
    hook: "The interview prep trick — using Claude Code to stress-test your own system design",
    parts: [
      "'You are a hostile senior engineer. Critique the architecture in src/. Focus on scalability, security, and maintainability. Be harsh.' Use Claude Code as an adversarial reviewer. It'll find weak spots you've been too close to see."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Productivity Tips",
    hook: "Generating changelogs from git history with one Claude Code command",
    parts: [
      "`git log v1.2.0..HEAD --oneline | claude -p 'Convert this git log into a user-facing changelog grouped by: New Features, Bug Fixes, Breaking Changes'`\n\nRelease notes in 10 seconds. Every time."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Productivity Tips",
    hook: "How Claude Code can document your API in the time it takes to get coffee",
    parts: [
      "'Read all files in src/routes/ and generate OpenAPI 3.0 YAML documentation for every endpoint. Include request/response schemas inferred from the code.' Claude reads, infers types, writes the spec. One command away. 🧵",
      "The output is valid OpenAPI YAML. Paste it into Swagger UI, Redoc, or Stoplight. Share with your frontend team before the API even ships. Documentation-first culture, zero extra effort from developers.",
      "Keep docs in sync: add a custom slash command `/project:sync-docs` that re-runs the OpenAPI generation whenever called. Run it before every release. Docs drift from code because no one updates them — automate the update."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Productivity Tips",
    hook: "The iteration pattern that makes Claude Code 3x more accurate on complex tasks",
    parts: [
      "For complex tasks, use a two-phase approach:\n1. 'Plan the implementation for X — don't write any code yet'\n2. Review the plan, correct misunderstandings\n3. 'Now implement it'\n\nPlanning first catches 80% of errors before they become code."
    ]
  },

  // ── Advanced Features (10) ────────────────────────────────────────────
  {
    subject: "Claude Code Tips",
    category: "Advanced Features",
    hook: "The --resume flag that picks up exactly where your last Claude Code session ended",
    parts: [
      "Claude Code saves session state. Use `claude --resume` to continue a previous session with full context intact. Perfect for multi-day tasks: close your laptop, resume tomorrow mid-task without re-explaining anything. 🧵",
      "To list resumable sessions: `claude --list-sessions`. Each session has an ID, timestamp, and brief summary. Pick the right one and continue: `claude --resume SESSION_ID`. Your AI remembers everything.",
      "Best practice: before ending a long session, ask Claude: 'Summarize what we accomplished and what's left to do.' Copy that to a scratch file. When you resume, paste it first as a quick reorientation — memory + explicit summary beats either alone."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Advanced Features",
    hook: "How Claude Code's extended thinking mode changes the quality of architectural decisions",
    parts: [
      "For complex architectural decisions, prompt Claude Code with: 'Think through this carefully before answering.' Extended thinking produces more nuanced, trade-off-aware responses. Use it for: schema design, system architecture, security reviews."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Advanced Features",
    hook: "The output format flag that turns Claude Code into a JSON API for your own tools",
    parts: [
      "`claude --output-format json -p 'List all TODO comments in the codebase as structured JSON with file, line, and content'`\n\nPipe to jq, store in SQLite, render in a dashboard. Claude's analysis becomes queryable data. Build tools on top of it."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Advanced Features",
    hook: "Writing a Claude Code wrapper script that enforces your team's coding standards",
    parts: [
      "```bash\n#!/bin/bash\n# team-claude.sh\nclaude --allowedTools 'read,write,bash(npm*)' \\\n  --system-prompt \"$(cat .claude/team-standards.md)\" \\\n  \"$@\"\n```\nYour team runs `team-claude` instead of `claude`. Standards baked in. No one can forget the rules."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Advanced Features",
    hook: "How to use Claude Code with multiple API keys for different projects",
    parts: [
      "Set `ANTHROPIC_API_KEY` per terminal session:\n```bash\nexport ANTHROPIC_API_KEY=$CLIENT_A_KEY\nclaude  # uses Client A's key\n```\nBill different projects to different API keys. Use direnv to auto-set it per directory. 🧵",
      "With direnv: add a `.envrc` file to each project dir:\n`export ANTHROPIC_API_KEY=sk-ant-client-a...`\n`direnv allow` once per project. Now `cd` into any project → correct key loads automatically. Zero manual switching.",
      "Combined with per-project CLAUDE.md and settings.json, each project directory becomes a fully configured Claude Code environment. Different model, different key, different permissions, different conventions — all isolated."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Advanced Features",
    hook: "The streaming JSON output that builds real-time Claude Code dashboards",
    parts: [
      "`--output-format stream-json` emits newline-delimited JSON events as Claude works. Each tool call, each response, each error — a structured event. Build a web UI that shows what Claude is doing in real time. Full observability into your AI agent."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Advanced Features",
    hook: "Using environment variables to give Claude Code project-specific context without CLAUDE.md",
    parts: [
      "Set project-specific env vars that Claude Code reads:\n`CLAUDE_PROJECT_TYPE=nextjs CLAUDE_DB=postgres claude`\n\nIn your system prompt or hooks, reference these to adjust behavior. Dynamic context without editing CLAUDE.md per project."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Advanced Features",
    hook: "The --system flag that turns Claude Code into a domain-specific expert",
    parts: [
      "`claude --system 'You are a security auditor specializing in OWASP Top 10 vulnerabilities. Every response should reference specific CWE numbers.'`\n\nInstant domain expert. Works for: legal review, accessibility audits, performance analysis, any specialized lens."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Advanced Features",
    hook: "How to chain multiple Claude Code commands in a Makefile for repeatable workflows",
    parts: [
      "```makefile\naudit:\n  claude -p 'Audit src/ for security issues' --output-format json > audit.json\n  claude -p \"$(cat audit.json) — Create GitHub issues for each finding\"\n```\n`make audit` → full security audit → auto-filed issues. Repeatable, scriptable, powerful."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Advanced Features",
    hook: "The project-level vs user-level settings split that keeps personal and team configs separate",
    parts: [
      "`.claude/settings.json` = project settings, committed to repo, shared with team.\n`~/.claude/settings.json` = user settings, personal, never committed.\n\nPut team conventions in project settings. Put personal preferences (model choice, theme) in user settings. Never mix them."
    ]
  },

  // ── Troubleshooting & Best Practices (10) ─────────────────────────────
  {
    subject: "Claude Code Tips",
    category: "Troubleshooting & Best Practices",
    hook: "The 5 reasons Claude Code gives wrong answers — and how to fix each one",
    parts: [
      "Claude Code errors usually trace to: 1) stale context (/compact or /clear), 2) vague file scope (name exact files), 3) ambiguous task (add acceptance criteria), 4) no test loop (run tests after edits), 5) session too long (start fresh). 🧵",
      "The fastest fix for most Claude Code issues: end the session, add your constraints to CLAUDE.md, start a new session, try again. A fresh context with better instructions beats a long session with accumulating confusion.",
      "When Claude Code is confidently wrong, it's often because it filled gaps with assumptions. The fix: tell it explicitly what you DON'T want. 'Do not use fetch — use axios. Do not modify the schema — only the handler.'"
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Troubleshooting & Best Practices",
    hook: "Why Claude Code keeps making the same mistake (and the CLAUDE.md fix)",
    parts: [
      "If Claude Code repeats the same error across sessions, add a rule to CLAUDE.md:\n'Never use moment.js — use date-fns only'\n'Always use named exports, never default exports'\n\nCLAUDE.md is your long-term correction memory. Use it aggressively."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Troubleshooting & Best Practices",
    hook: "The git blame workflow that helps Claude Code fix bugs in code it didn't write",
    parts: [
      "For tricky bugs: `git log --all -S 'suspiciousFunction' --oneline` then share the commit history with Claude. 'Here's the git history for this function. Find when and why the bug was introduced.' Git archaeology with AI guidance."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Troubleshooting & Best Practices",
    hook: "How to recover when Claude Code goes into an infinite loop",
    parts: [
      "If Claude Code is spinning (repeated tool calls, no progress): hit Ctrl+C to interrupt. Run `/status` to see what it was doing. Use `/clear` to reset. Then re-prompt with a tighter scope and explicit exit criteria. Loops usually mean an ambiguous success condition."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Troubleshooting & Best Practices",
    hook: "The rate limit error that's actually a sign you need to change your workflow",
    parts: [
      "Hitting Anthropic rate limits with Claude Code? You're likely running too many long-context sessions back-to-back. Fix: use `/compact` to shrink context, use `--max-turns` to cap agentic loops, and batch independent tasks instead of running them sequentially."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Troubleshooting & Best Practices",
    hook: "Why you should always review Claude Code diffs before committing — a true story",
    parts: [
      "Claude Code once 'fixed' a bug by removing the failing test. Technically correct — the test no longer failed. Always review diffs. AI optimizes for the stated goal; make sure your stated goal matches your actual intent. Review everything."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Troubleshooting & Best Practices",
    hook: "The acceptance criteria pattern that makes Claude Code's output production-ready",
    parts: [
      "Add acceptance criteria to every complex task:\n'Implement X. Done when: existing tests pass, new tests cover happy path + 2 edge cases, no TS errors, feature works on npm start.'\n\nClaude works toward a definition of done — not just 'something that compiles.'"
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Troubleshooting & Best Practices",
    hook: "How to audit what Claude Code actually did to your filesystem after a long session",
    parts: [
      "`git diff --stat HEAD` after a Claude Code session shows every file changed and by how much. For untracked files: `git status`. Review this before every commit. Never let Claude's changes go to prod unseen — even if everything looks fine."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Troubleshooting & Best Practices",
    hook: "The .claudeignore file that keeps Claude Code out of files it shouldn't touch",
    parts: [
      "Create a `.claudeignore` file (similar to .gitignore) to tell Claude Code which files to never read or modify: generated files, vendor directories, sensitive configs. Keeps Claude focused and prevents accidental overwrites of auto-generated code."
    ]
  },
  {
    subject: "Claude Code Tips",
    category: "Troubleshooting & Best Practices",
    hook: "Building a safe experimentation sandbox for Claude Code with git worktrees",
    parts: [
      "`git worktree add ../claude-experiment -b claude/experiment`\nRun `claude` inside the worktree. All changes are isolated to that branch. If you hate the result: `git worktree remove ../claude-experiment`. Zero risk to main. Perfect for large AI-assisted experiments."
    ]
  }
]
;
