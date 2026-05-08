# vite-harness-create

A project scaffolding CLI that generates React/Next.js starter apps with Harness engineering documentation and standards.

## Installation

```bash
npm create vite-harness-create@latest my-project
```

## Usage

Run the command with your project name and choose the options for your new app:

- **Framework**: React + Vite or Next.js
- **TypeScript**: enable or disable
- **Styling**: Tailwind CSS, CSS Modules, or None

```bash
cd my-project
npm install
npm run dev
```

## What is generated

This CLI creates a starter project with the following files and structure:

```
my-project/
├── CLAUDE.md              # project overview, tech stack, and workflow
├── docs/
│   ├── ADR.md            # architecture decision records
│   ├── ARCHITECTURE.md   # architecture and directory layout
│   ├── PRD.md            # product requirements document
│   └── UI_GUIDE.md       # design guidelines and anti-patterns
├── src/                   # source code
├── package.json          # dependencies and scripts
├── tsconfig.json         # TypeScript config (if selected)
├── tailwind.config.js    # Tailwind config (if selected)
├── vite.config.ts        # Vite config (for React)
└── .eslintrc.json        # ESLint config
```

## Scripts

```bash
npm run dev      # start development server
npm run build    # build production bundle
npm run lint     # run ESLint
npm run format   # format code with Prettier
```

## Features

- ✅ Generates Harness-style documentation for engineering teams
- ✅ Supports React + Vite and Next.js starter projects
- ✅ Optional TypeScript setup
- ✅ Optional Tailwind CSS or CSS Modules support
- ✅ Includes ESLint and Prettier configuration

## License

MIT
