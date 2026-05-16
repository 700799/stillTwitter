export type TweetSeed = {
  category: string;
  content: string;
};

export const tweetData: TweetSeed[] = [
  // Getting Started (15)
  {
    category: 'Getting Started',
    content: 'Claude Code is an AI coding agent that lives in your terminal. Run `claude` to start a session, describe what you want to build, and watch it read, write, and run code in your project. No IDE plugin needed.',
  },
  {
    category: 'Getting Started',
    content: "First time using Claude Code? Run `claude` in any project directory. It reads your file structure automatically. Start with: 'Explain this codebase' to get an instant overview of what you're working with.",
  },
  {
    category: 'Getting Started',
    content: "Claude Code operates in your actual repo — it can read files, write code, run terminal commands, and search the web. Think of it as a pair programmer who never sleeps and already knows your whole codebase.",
  },
  {
    category: 'Getting Started',
    content: "Set up Claude Code in 2 minutes: `npm install -g @anthropic-ai/claude-code` then `claude`. It'll ask for your Anthropic API key once. After that, just describe tasks in plain English and it executes them.",
  },
  {
    category: 'Getting Started',
    content: "Claude Code's default mode is cautious — it asks before running commands. As you build trust with your workflow, you can expand permissions. Start conservative, you can always do more later.",
  },
  {
    category: 'Getting Started',
    content: "You can run Claude Code non-interactively with `claude -p 'your task here'`. Perfect for CI pipelines or scripting repetitive tasks without any back-and-forth dialogue.",
  },
  {
    category: 'Getting Started',
    content: "Claude Code reads your `.gitignore` and understands project structure from the start. It won't touch ignored files and respects your existing layout. Point it at any repo and ask questions immediately.",
  },
  {
    category: 'Getting Started',
    content: "Stuck on an error? Just paste the error message directly into Claude Code. Don't explain it — let Claude read the surrounding code and figure out the fix. Often resolves issues in one turn.",
  },
  {
    category: 'Getting Started',
    content: "Claude Code works with any language — Python, TypeScript, Go, Rust, Ruby, SQL. It doesn't need a language server or special setup. If it can be read as text, Claude Code can understand and modify it.",
  },
  {
    category: 'Getting Started',
    content: "When starting a new session, be specific: 'Add a login form to app/login.tsx using the existing Button from components/ui' beats 'add login'. Context = speed.",
  },
  {
    category: 'Getting Started',
    content: "Claude Code keeps session history within one terminal session. Reference earlier work: 'Now do the same refactor for the other 3 files we discussed'. No need to re-explain everything.",
  },
  {
    category: 'Getting Started',
    content: "Run `claude --help` to see all available flags. Key ones: `--model` to pick a Claude version, `--output-format json` for scripted pipelines, and `--max-turns` to cap agent iterations.",
  },
  {
    category: 'Getting Started',
    content: "Claude Code can explain ANY part of your codebase on demand. Ask: 'How does authentication work in this app?' and get a clear, accurate narrative — better than reading docs that may be outdated.",
  },
  {
    category: 'Getting Started',
    content: "Use Claude Code on existing projects too, not just greenfield. `git clone` a repo, `cd` into it, run `claude`, and ask 'what does this codebase do?' Onboarding time goes from hours to minutes.",
  },
  {
    category: 'Getting Started',
    content: "Create a CLAUDE.md file at your repo root. Claude Code reads it automatically every session. Document commands, conventions, and project-specific context there — it becomes your agent's standing instructions.",
  },

  // Slash Commands (15)
  {
    category: 'Slash Commands',
    content: "Type `/help` inside a Claude Code session to see all available slash commands. These are built-in shortcuts for clearing context, compacting memory, or changing settings on the fly.",
  },
  {
    category: 'Slash Commands',
    content: "`/clear` wipes the current conversation history. Use it when context has drifted from the task. Fresh context = more focused, accurate responses. Don't be afraid to reset and re-brief Claude.",
  },
  {
    category: 'Slash Commands',
    content: "`/compact` summarizes the current conversation and replaces it with a compressed version. Use this when your session is long and getting sluggish. Preserves key decisions without burning token budget.",
  },
  {
    category: 'Slash Commands',
    content: "`/memory` shows what Claude Code has loaded into its working memory — files read, tasks completed, notes taken. It's a live audit of what the agent thinks it knows right now.",
  },
  {
    category: 'Slash Commands',
    content: "`/init` creates a CLAUDE.md file in your project root based on Claude's analysis of your repo. Run it once on any new project to auto-generate persistent context for future sessions.",
  },
  {
    category: 'Slash Commands',
    content: "`/review` triggers Claude Code to review the diff of your recent changes. Think of it as an on-demand code review from an agent who already knows your codebase's conventions and style.",
  },
  {
    category: 'Slash Commands',
    content: "The `/bug` command opens a quick path to report unexpected behavior in Claude Code itself. Use it when the agent does something surprising — your feedback helps Anthropic improve the tool.",
  },
  {
    category: 'Slash Commands',
    content: "`/model` lets you switch Claude models mid-session. Drop to a faster model for simple tasks, then bump back up to claude-opus for complex reasoning. No need to restart the session.",
  },
  {
    category: 'Slash Commands',
    content: "Prefix messages with `/` to access slash commands, but you can also use natural language equivalents. 'Reset our conversation' works like `/clear`. The agent understands intent either way.",
  },
  {
    category: 'Slash Commands',
    content: "`/config` displays or edits local and global Claude Code settings. Adjust auto-confirm, preferred model, and context behavior without touching config files manually.",
  },
  {
    category: 'Slash Commands',
    content: "`/cost` shows a token usage and cost breakdown for the current session. Use this to understand your API spend and decide when to use `/compact` to trim context and reduce future costs.",
  },
  {
    category: 'Slash Commands',
    content: "Claude Code slash commands are extensible. Define custom slash commands in CLAUDE.md using the `#` heading format. Your team can share a standard set of project-specific shortcuts.",
  },
  {
    category: 'Slash Commands',
    content: "`/status` gives a snapshot of the current session — which model is active, how many turns have elapsed, and what permissions are granted. Useful for debugging agent behavior.",
  },
  {
    category: 'Slash Commands',
    content: "Chain slash commands with natural language. 'Compact the session then summarize what's left to do' — Claude runs `/compact` and then answers with the fresh context.",
  },
  {
    category: 'Slash Commands',
    content: "`/permissions` shows exactly what tools Claude Code has access to in the current session. If the agent can't do something you expect, check here first before troubleshooting anything else.",
  },

  // Tool Use & Permissions (15)
  {
    category: 'Tool Use & Permissions',
    content: "Claude Code uses tools under the hood: file read/write, bash commands, web search, and more. Each tool requires permission. You control the blast radius of what the agent can affect.",
  },
  {
    category: 'Tool Use & Permissions',
    content: "The `--allowedTools` flag specifies which tools Claude Code can use. `claude --allowedTools read,write` restricts to file I/O only. Perfect for read-only audit sessions.",
  },
  {
    category: 'Tool Use & Permissions',
    content: "Use `--disallowedTools bash` when you want Claude to suggest commands but not execute them. Great for learning mode: get the exact commands you need, then run them yourself.",
  },
  {
    category: 'Tool Use & Permissions',
    content: "Claude Code prompts before running bash commands by default. This is a safety feature, not a bug. Each confirmation is a checkpoint — you're supervising an AI making real changes to your system.",
  },
  {
    category: 'Tool Use & Permissions',
    content: "The `Bash` tool in Claude Code can chain commands with `&&`, use pipes, and run scripts. It executes in your current shell environment with your existing PATH, aliases, and env variables.",
  },
  {
    category: 'Tool Use & Permissions',
    content: "File editing in Claude Code is atomic — it reads the full file, makes targeted changes, and writes back. It doesn't stream partial writes. Interrupted edits don't corrupt files.",
  },
  {
    category: 'Tool Use & Permissions',
    content: "Claude Code's `WebSearch` tool fetches live data. Ask it to look up the latest API docs, check a package version, or research a library — then integrate what it finds directly into code.",
  },
  {
    category: 'Tool Use & Permissions',
    content: "Use `--allowedTools 'bash(git log:git diff:git status)'` to lock bash to read-only git commands only. Powerful for review-focused sessions with zero risk of accidental changes.",
  },
  {
    category: 'Tool Use & Permissions',
    content: "When Claude Code writes code, it uses a patch-based approach — edits specific ranges rather than rewriting whole files. This minimizes diffs and keeps your git history clean and reviewable.",
  },
  {
    category: 'Tool Use & Permissions',
    content: "The `computer_use` capability (where available) lets Claude interact with GUI applications. Combined with terminal access, this creates an agent that can navigate both CLI and desktop environments.",
  },
  {
    category: 'Tool Use & Permissions',
    content: "Worried about Claude Code touching sensitive files? Add them to `.claudeignore` at your project root. Same syntax as `.gitignore`. The agent will not read or write anything you've ignored.",
  },
  {
    category: 'Tool Use & Permissions',
    content: "Tool permission prompts show the exact command before running. Read them carefully. The prompt is your last line of defense before the agent makes changes. Always read before approving.",
  },
  {
    category: 'Tool Use & Permissions',
    content: "Claude Code can use multiple tools in a single turn: read a file, search the web for docs, and write new code all in one agent step. Multi-tool turns are faster than sequential ones.",
  },
  {
    category: 'Tool Use & Permissions',
    content: "Use `--output-format json` to get structured JSON output from Claude Code, including which tools were called and what they returned. Useful for logging, auditing, or feeding results to another system.",
  },
  {
    category: 'Tool Use & Permissions',
    content: "The principle of least privilege applies to AI agents too. Start every Claude Code session with minimal permissions and expand only when needed. Safer, and teaches you what the agent actually requires.",
  },

  // Hooks & Automation (15)
  {
    category: 'Hooks & Automation',
    content: "Claude Code hooks let you run custom scripts at specific points in the agent's lifecycle — before a tool call, after a response, or when the session ends. This is how you add guardrails and side effects.",
  },
  {
    category: 'Hooks & Automation',
    content: "Add a `pre-tool-use` hook to log every bash command Claude Code runs before execution. Pipe it to a file or monitoring system. You get a full audit trail of every action the agent takes.",
  },
  {
    category: 'Hooks & Automation',
    content: "Use a `post-tool-use` hook to validate outputs. After Claude writes a file, automatically run your linter or test suite. If checks fail, pass the error back — Claude will fix it in the next turn.",
  },
  {
    category: 'Hooks & Automation',
    content: "Hooks are defined in your CLAUDE.md or in a `.claude/hooks/` directory. Write them in any language — bash scripts, Python, Node — as long as the executable is in your PATH.",
  },
  {
    category: 'Hooks & Automation',
    content: "A `stop` hook runs when Claude Code ends a session. Use it to commit changes, send a Slack notification, or update a task tracker. Automate the handoff between AI work and human review.",
  },
  {
    category: 'Hooks & Automation',
    content: "Use hooks to enforce coding standards automatically. On every file write, run ESLint or Prettier. Claude Code will see the errors in the next tool call and self-correct to match your style guide.",
  },
  {
    category: 'Hooks & Automation',
    content: "The `pre-bash` hook can block dangerous commands before they run. Parse the command string and exit with non-zero to cancel it. Claude Code sees the rejection and tries a safer approach.",
  },
  {
    category: 'Hooks & Automation',
    content: "Pipe Claude Code output through a hook to a dashboard. Log turn counts, token usage, and tool calls in real time. Build operational visibility into your AI coding workflows without custom tooling.",
  },
  {
    category: 'Hooks & Automation',
    content: "Hooks enable multi-system workflows. After Claude modifies a file, a hook can call a webhook to trigger a CI build, update a Jira ticket, or sync to a staging environment automatically.",
  },
  {
    category: 'Hooks & Automation',
    content: "Test your hooks in isolation before attaching them to Claude Code. Run the hook script manually with sample input and verify exit codes. Buggy hooks cause confusing agent behavior.",
  },
  {
    category: 'Hooks & Automation',
    content: "Use a `pre-session` hook to inject dynamic context into CLAUDE.md. Pull in the latest sprint ticket, current branch name, or recent git log — so Claude always starts with fresh, relevant context.",
  },
  {
    category: 'Hooks & Automation',
    content: "Hooks can be conditional. Check environment variables inside your hook script to enable or disable behavior based on context — different rules for dev vs. staging vs. production environments.",
  },
  {
    category: 'Hooks & Automation',
    content: "The output of a hook gets passed back to Claude Code as tool feedback. Return a structured JSON message with `status`, `message`, and `data` fields to give the agent actionable information.",
  },
  {
    category: 'Hooks & Automation',
    content: "Use hooks to rate-limit expensive operations. Track how many web searches or bash commands ran in a session. Halt or warn when thresholds are hit to keep API costs predictable.",
  },
  {
    category: 'Hooks & Automation',
    content: "Hooks turn Claude Code from a standalone tool into a node in your engineering system. Connect it to monitoring, alerting, CI/CD, and project management — the agent becomes part of your infrastructure.",
  },

  // MCP Servers (15)
  {
    category: 'MCP Servers',
    content: "MCP (Model Context Protocol) servers extend Claude Code with new tools. Connect Claude to databases, APIs, browsers, and internal services by running an MCP server and pointing Claude at it.",
  },
  {
    category: 'MCP Servers',
    content: "Run `claude mcp add <server-name> <command>` to register an MCP server with Claude Code. It starts the server as a subprocess and Claude gets its tools automatically. No restart required.",
  },
  {
    category: 'MCP Servers',
    content: "The `@modelcontextprotocol/server-filesystem` MCP server gives Claude Code fine-grained control over which directories it can access. Use it to sandbox the agent to specific parts of your system.",
  },
  {
    category: 'MCP Servers',
    content: "Use `claude mcp add github npx @modelcontextprotocol/server-github` to give Claude Code GitHub integration. It can read issues, PRs, and repo data — enabling full PR-driven development workflows.",
  },
  {
    category: 'MCP Servers',
    content: "MCP servers expose tools as JSON schemas. Claude Code reads those schemas and knows exactly how to call each tool. You can build custom MCP servers for any internal API your team uses.",
  },
  {
    category: 'MCP Servers',
    content: "Use `claude mcp list` to see all registered MCP servers and their status. If a server fails to start, Claude Code shows an error and continues without it — sessions aren't blocked by MCP failures.",
  },
  {
    category: 'MCP Servers',
    content: "`claude mcp remove <name>` unregisters an MCP server. Changes take effect next session. Use this to rotate out servers you no longer need without editing config files manually.",
  },
  {
    category: 'MCP Servers',
    content: "The PostgreSQL MCP server (`@modelcontextprotocol/server-postgres`) lets Claude Code query your database directly. Useful for debugging data issues, generating reports, or writing data migrations.",
  },
  {
    category: 'MCP Servers',
    content: "MCP servers can be scoped to a project with `--scope project` or globally with `--scope user`. Project-scoped configs live in `.mcp.json` at your repo root — version control them with your team.",
  },
  {
    category: 'MCP Servers',
    content: "Build an MCP server for your internal API in 15 minutes using the `@modelcontextprotocol/sdk`. Define tool names, input schemas, and handler functions. Claude Code discovers them automatically.",
  },
  {
    category: 'MCP Servers',
    content: "The Puppeteer MCP server gives Claude Code a headless browser. It can navigate to URLs, click elements, and extract content — turning Claude into an end-to-end test runner or web scraper.",
  },
  {
    category: 'MCP Servers',
    content: "MCP servers run as separate processes communicating over stdio. This isolation means a crashing MCP server doesn't take down Claude Code. Failures are logged and handled gracefully.",
  },
  {
    category: 'MCP Servers',
    content: "Use the memory MCP server to give Claude Code persistent storage across sessions. Save task state, project notes, and decisions. The next session picks up exactly where you left off.",
  },
  {
    category: 'MCP Servers',
    content: "Claude Code's MCP support follows the open MCP specification. Any MCP-compatible server works — not just Anthropic-built ones. The community is rapidly publishing servers for popular services.",
  },
  {
    category: 'MCP Servers',
    content: "Combine multiple MCP servers in one session. Claude Code sees all their tools simultaneously. A single session can use GitHub + Postgres + Filesystem tools all at once without any extra setup.",
  },

  // IDE Integration (15)
  {
    category: 'IDE Integration',
    content: "Claude Code integrates directly with VS Code and JetBrains IDEs. Run it in the IDE terminal for the tightest coupling: the agent edits files that are live-reloading in your editor simultaneously.",
  },
  {
    category: 'IDE Integration',
    content: "Use Claude Code in VS Code with the split-terminal layout. Agent output on the left, file explorer on the right. Watch Claude write code and see changes appear in real time without switching windows.",
  },
  {
    category: 'IDE Integration',
    content: "JetBrains Toolbox users: Claude Code works natively in the built-in terminal of IntelliJ, PyCharm, WebStorm, and all JetBrains IDEs. Your project context is already there — just run `claude`.",
  },
  {
    category: 'IDE Integration',
    content: "Set `EDITOR=code` in your environment so when Claude Code needs you to review a file, it opens VS Code automatically. Tight integration between the agent and your preferred editor reduces friction.",
  },
  {
    category: 'IDE Integration',
    content: "Claude Code can read your IDE's open tabs if you tell it what's open. Start sessions with: 'I have auth.ts and db.ts open in VS Code, here's the error...' to anchor context immediately.",
  },
  {
    category: 'IDE Integration',
    content: "VS Code's GitLens + Claude Code is a powerful combo. Use GitLens to understand who changed what, then ask Claude to explain the change rationale and suggest improvements in the same terminal session.",
  },
  {
    category: 'IDE Integration',
    content: "Use Claude Code with VS Code tasks. Define a task in `.vscode/tasks.json` that runs `claude -p 'run the test suite and fix any failing tests'`. Trigger AI-powered automation from the IDE.",
  },
  {
    category: 'IDE Integration',
    content: "Claude Code respects your IDE's .editorconfig settings — indentation, line endings, charset — because it reads the file directly. Style consistency is maintained automatically across agent-written code.",
  },
  {
    category: 'IDE Integration',
    content: "Run Claude Code from the integrated terminal in your IDE while keeping Copilot active for inline completions. They complement each other: Copilot for small completions, Claude for complex reasoning.",
  },
  {
    category: 'IDE Integration',
    content: "Neovim users: Claude Code works perfectly in the Neovim terminal (`:terminal`). Combine with telescope.nvim for file navigation. The agent edits files that reload instantly via your autoread settings.",
  },
  {
    category: 'IDE Integration',
    content: "With the Claude VS Code extension, you get inline diff views when Claude edits a file — you can accept, reject, or modify each change with a click. Smoother review flow than raw terminal output.",
  },
  {
    category: 'IDE Integration',
    content: "Use Claude Code with your IDE's debugger. Set a breakpoint, copy the variable state, paste into Claude. Ask: 'Given this runtime state, what's the bug in this function?' Get a pinpoint diagnosis.",
  },
  {
    category: 'IDE Integration',
    content: "Configure VS Code keybindings to open a new terminal and run `claude` in one keystroke. A fast shortcut turns AI-assisted coding from a deliberate decision into a natural, low-friction reflex.",
  },
  {
    category: 'IDE Integration',
    content: "Claude Code works in remote development environments: VS Code Remote, GitHub Codespaces, and SSH sessions. The agent runs server-side — same experience whether local, remote, or cloud-hosted.",
  },
  {
    category: 'IDE Integration',
    content: "Cursor IDE users get an extra layer: Cursor's composer + Claude Code in terminal = multi-modal AI development. Use Cursor for quick inline edits, Claude Code for multi-file reasoning tasks.",
  },

  // Multi-Agent & Subagents (15)
  {
    category: 'Multi-Agent & Subagents',
    content: "Claude Code can spawn subagents — separate Claude instances that handle parallel subtasks. One agent writes tests while another refactors the implementation. Results merge back into the main session.",
  },
  {
    category: 'Multi-Agent & Subagents',
    content: "Use the `--max-turns` flag to control how long a subagent runs. `claude -p 'write unit tests for auth.ts' --max-turns 10` caps the agent at 10 steps and returns results automatically.",
  },
  {
    category: 'Multi-Agent & Subagents',
    content: "Multi-agent patterns shine for large codebases. Split work by domain: one agent per service, or per layer (API, DB, frontend). Each agent stays focused; a coordinator integrates the output.",
  },
  {
    category: 'Multi-Agent & Subagents',
    content: "The orchestrator pattern: one Claude Code session drives multiple subagents via `--output-format json`. Parse the JSON, feed results to the next agent, and build complex pipelines from simple tasks.",
  },
  {
    category: 'Multi-Agent & Subagents',
    content: "Use `claude -p` in parallel shell jobs for multi-agent parallelism. Run 4 agents simultaneously with `&` and `wait` in bash. Each writes to a different file. Then a final agent merges the work.",
  },
  {
    category: 'Multi-Agent & Subagents',
    content: "Subagents can call other subagents. A top-level agent breaks a feature into subtasks, delegates each, reviews the output, and synthesizes the final result. This is agentic software engineering.",
  },
  {
    category: 'Multi-Agent & Subagents',
    content: "When running multiple Claude Code agents, use separate working directories or branches per agent to avoid file conflicts. Merge via git after each agent completes its isolated task.",
  },
  {
    category: 'Multi-Agent & Subagents',
    content: "Multi-agent systems need coordination points. Use a shared JSON file as a message bus: agent 1 writes its output, agent 2 reads it as input. No fancy infrastructure — just the filesystem.",
  },
  {
    category: 'Multi-Agent & Subagents',
    content: "Rate limits apply per API key. When running multiple Claude Code agents, consider token budget per agent. Use cheaper models for subtasks and reserve Claude Opus for the orchestrator.",
  },
  {
    category: 'Multi-Agent & Subagents',
    content: "Subagent isolation is a security feature. Each subagent only knows what you pass to it. Sensitive context stays in the orchestrator. The subagent does its task without seeing the full picture.",
  },
  {
    category: 'Multi-Agent & Subagents',
    content: "Use multi-agent workflows for code review at scale. Agent 1 writes a PR description. Agent 2 reviews the diff for bugs. Agent 3 checks style. A final summarizer agent synthesizes all 3 reports.",
  },
  {
    category: 'Multi-Agent & Subagents',
    content: "Build a self-healing pipeline: deploy code, run tests with one agent, if tests fail spawn a second agent with the error log to write a fix, then re-run. Autonomous bug-fix loop in bash.",
  },
  {
    category: 'Multi-Agent & Subagents',
    content: "Subagents work well for repetitive transformations. Convert 50 API routes from Express to Fastify by spawning one agent per file in parallel. Faster than one agent doing them sequentially.",
  },
  {
    category: 'Multi-Agent & Subagents',
    content: "The Claude Code SDK lets you control subagents programmatically in Python or TypeScript. Define tasks, spawn agents, await results, and chain them in typed code instead of shell scripts.",
  },
  {
    category: 'Multi-Agent & Subagents',
    content: "Log every subagent's output with timestamps. When multi-agent pipelines go wrong, the logs tell you which agent produced bad output. Debugging distributed AI work is like debugging distributed systems.",
  },

  // Productivity Tips (15)
  {
    category: 'Productivity Tips',
    content: "Keep a scratch.md file in your project root. Use it as a running log of tasks, ideas, and decisions during Claude Code sessions. Ask Claude to update it — you get a session journal automatically.",
  },
  {
    category: 'Productivity Tips',
    content: "Describe the desired outcome, not the implementation steps. 'Make the login form accessible' outperforms 'add aria-label to the email input and tabindex to the button'. Let Claude decide the how.",
  },
  {
    category: 'Productivity Tips',
    content: "Use Claude Code for documentation as a first-class task. 'Write JSDoc for every function in utils/formatting.ts' — and it will. Accurate docs generated from code, not from memory or guessing.",
  },
  {
    category: 'Productivity Tips',
    content: "Break large tasks into checkpoints. After each checkpoint, ask Claude to commit with a descriptive message. Small, meaningful commits make review easier and give you rollback points if needed.",
  },
  {
    category: 'Productivity Tips',
    content: "When debugging, tell Claude exactly what you expected vs. what happened. 'Clicking Save should call /api/save but the network tab shows no request' is much better than 'save is broken'.",
  },
  {
    category: 'Productivity Tips',
    content: "Use Claude Code to write migration scripts. 'Write a SQL migration to add a nullable email_verified column to the users table' — gets you tested, reversible SQL in seconds.",
  },
  {
    category: 'Productivity Tips',
    content: "Claude Code is great for refactoring. 'Extract the database logic from userController.ts into a new userRepository.ts file, update all imports' — it handles the full rename-and-refactor atomically.",
  },
  {
    category: 'Productivity Tips',
    content: "Leverage Claude Code for dependency updates. 'Update all packages to their latest compatible versions, check for breaking changes, and update the code where needed.' One command, full upgrade cycle.",
  },
  {
    category: 'Productivity Tips',
    content: "Ask Claude Code to write the test first. 'Write a failing test for a function that validates email addresses, then implement the function to make it pass.' TDD mode unlocks better design automatically.",
  },
  {
    category: 'Productivity Tips',
    content: "Use Claude Code as your PR description writer. Run `git diff main` and paste the output: 'Here's my diff. Write a clear PR description with a summary, motivation, and testing steps.'",
  },
  {
    category: 'Productivity Tips',
    content: "Tell Claude Code your time constraint: 'I have 20 minutes. What's the quickest path to making the auth flow work, even if it's not perfect?' It will prioritize ruthlessly. Useful before demos.",
  },
  {
    category: 'Productivity Tips',
    content: "Use Claude Code for one-off data processing: 'Read orders.csv, find all orders over $500 from Q1 2024, and write a summary report to report.txt'. Faster than writing a throwaway script yourself.",
  },
  {
    category: 'Productivity Tips',
    content: "When Claude Code gives you a solution you don't fully understand, ask it to explain. 'Walk me through how this regex works, step by step.' You ship the code AND learn the pattern. Double value.",
  },
  {
    category: 'Productivity Tips',
    content: "Use `claude` inside a Docker container for sandboxed execution. Claude Code's bash commands run inside the container, not your host. Experiment freely — the container is disposable.",
  },
  {
    category: 'Productivity Tips',
    content: "Keep common prompts in a `prompts/` directory in your repo. `cat prompts/add-api-route.md | claude` gives you consistent, repeatable tasks. Version your prompts like you version your code.",
  },

  // Advanced Features (15)
  {
    category: 'Advanced Features',
    content: "Claude Code supports streaming responses in SDK mode. Hook into the token stream to build real-time displays of agent activity — like a live terminal output in a web dashboard.",
  },
  {
    category: 'Advanced Features',
    content: "Use `claude --output-format stream-json` for newline-delimited JSON streaming. Each line is an event: text delta, tool call start, tool result, or session end. Build rich observability on top.",
  },
  {
    category: 'Advanced Features',
    content: "The Claude Code SDK (`@anthropic-ai/claude-code`) lets you embed the agent in your own applications. Build internal tools that use Claude for reasoning while your app handles the UI and persistence.",
  },
  {
    category: 'Advanced Features',
    content: "Claude Code can generate and execute code dynamically. 'Write a script that parses this log format, run it on server.log, and tell me the top 10 error types.' It writes, runs, and reports in one flow.",
  },
  {
    category: 'Advanced Features',
    content: "Use Claude Code with `--system` to inject a custom system prompt. Override the default persona for specialized workflows: a security reviewer, a performance engineer, or a domain expert.",
  },
  {
    category: 'Advanced Features',
    content: "Claude Code's context window is large but not infinite. For very large codebases, be selective about what you include. Reference specific files by path rather than asking Claude to read the whole repo.",
  },
  {
    category: 'Advanced Features',
    content: "Advanced agents use tool result caching. Expensive tool calls — big file reads, web fetches — can be cached and reused within a session. This cuts latency and cost on repeated operations.",
  },
  {
    category: 'Advanced Features',
    content: "Use Claude Code to generate TypeScript types from JSON API responses. Paste the raw JSON: 'Generate a TypeScript interface that matches this response shape.' Instant, accurate types from real data.",
  },
  {
    category: 'Advanced Features',
    content: "Claude Code handles multi-file refactors atomically in one turn. 'Rename the User type to Account across all files in src/' — it reads all files, makes all changes, and reports a unified diff.",
  },
  {
    category: 'Advanced Features',
    content: "Use the `--resume` flag to continue a previous Claude Code session by ID. Useful for long-running tasks that span multiple terminal sessions without losing conversation history.",
  },
  {
    category: 'Advanced Features',
    content: "Claude Code can interface with vector databases via MCP. Load your codebase embeddings into a vector store, connect via MCP, and give Claude semantic search over millions of lines of code.",
  },
  {
    category: 'Advanced Features',
    content: "Build approval workflows with Claude Code's non-interactive mode. Use `--allowedTools none` to get a plan, then programmatically re-invoke with approvals granted. Human-in-the-loop AI pipelines.",
  },
  {
    category: 'Advanced Features',
    content: "Claude Code's tool call history is inspectable. Use `--output-format json` and parse the `tool_calls` array to build dashboards, cost trackers, or anomaly detectors for your AI workflows.",
  },
  {
    category: 'Advanced Features',
    content: "Use Claude Code for API mocking. 'Read the OpenAPI spec in openapi.yaml and generate a complete mock server using msw that handles all defined routes.' Instant test infrastructure from spec.",
  },
  {
    category: 'Advanced Features',
    content: "Combine Claude Code with `make`. Define Makefile targets that invoke `claude -p` with specific prompts. Run `make fix-lint` and have an AI fix lint errors automatically as part of your dev workflow.",
  },

  // Troubleshooting & Best Practices (15)
  {
    category: 'Troubleshooting & Best Practices',
    content: "If Claude Code keeps making the same mistake, stop and re-brief. Don't just say 'try again' — add new context. 'The issue is that X assumes Y, but in this project Z is always true' resets the frame.",
  },
  {
    category: 'Troubleshooting & Best Practices',
    content: "Claude Code drifting off track? Use `/compact` to compress context, then re-state your goal clearly. Long sessions accumulate noise. Periodic resets keep the agent focused on what matters.",
  },
  {
    category: 'Troubleshooting & Best Practices',
    content: "Getting bad code? Check what Claude is reading. Ask: 'What files are you using to inform this implementation?' If it's missing key files, tell it explicitly what to read first.",
  },
  {
    category: 'Troubleshooting & Best Practices',
    content: "API rate limit errors in Claude Code usually mean your context is too large. Use `/compact` then retry. Or use `--model claude-haiku-4-5` for tasks where speed matters more than raw reasoning power.",
  },
  {
    category: 'Troubleshooting & Best Practices',
    content: "Always review Claude Code's git commits before pushing. Use `git diff HEAD~1` to inspect what the agent changed. AI-written commits can contain subtle logic changes beyond what was discussed.",
  },
  {
    category: 'Troubleshooting & Best Practices',
    content: "Claude Code hallucinating APIs? Ask it to search the web or read the actual source code. 'Before writing this, fetch the official docs for this library' prevents confidently wrong implementations.",
  },
  {
    category: 'Troubleshooting & Best Practices',
    content: "When Claude Code gets into a loop — running the same command repeatedly — use Ctrl+C to interrupt. Then reframe: 'Stop trying X, instead let's approach this by doing Y.' Break the loop with new direction.",
  },
  {
    category: 'Troubleshooting & Best Practices',
    content: "Track token usage across sessions using `--output-format json` and parsing the `usage` field. High token counts mean long context. Prune it regularly to keep quality high and costs predictable.",
  },
  {
    category: 'Troubleshooting & Best Practices',
    content: "If a Claude Code session produces broken code, don't start over — ask Claude to diagnose it. 'The code you wrote causes this runtime error. Here's the stack trace. What went wrong and how do we fix it?'",
  },
  {
    category: 'Troubleshooting & Best Practices',
    content: "Never let Claude Code directly push to main. Always work on a branch. Use hooks to enforce this: a `pre-bash` hook that blocks `git push origin main` protects you from accidental production deploys.",
  },
  {
    category: 'Troubleshooting & Best Practices',
    content: "Claude Code is a probability engine — it produces the most likely code given your context. Likely isn't always correct. Treat output as a smart first draft. Review it. Test it. Ship it deliberately.",
  },
  {
    category: 'Troubleshooting & Best Practices',
    content: "For production-critical code, ask Claude to review its own output. 'Review what you just wrote for edge cases, security issues, and error handling. List anything you're uncertain about.' Forces self-critique.",
  },
  {
    category: 'Troubleshooting & Best Practices',
    content: "Context poisoning happens when an earlier wrong assumption carries forward. If Claude keeps hitting the same conceptual wall, start a new session and re-explain the problem from scratch.",
  },
  {
    category: 'Troubleshooting & Best Practices',
    content: "Build a CLAUDE.md 'Do Not Do' section. List anti-patterns specific to your project: 'No class components', 'Never use `any` in TypeScript', 'All DB calls must go through the repository layer'.",
  },
  {
    category: 'Troubleshooting & Best Practices',
    content: "The best Claude Code sessions have a human in the loop at every decision point. The agent proposes, you approve. Review permission prompts, read diffs, run your tests. AI speeds you up — it doesn't replace your judgment.",
  },
];
