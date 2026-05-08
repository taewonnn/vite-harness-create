import fs from 'fs';
import path from 'path';

export function generateTsConfigJson(framework, typescript) {
  if (!typescript) return null;

  return {
    compilerOptions: {
      target: 'ES2020',
      useDefineForClassFields: true,
      lib: ['ES2020', 'DOM', 'DOM.Iterable'],
      module: 'ESNext',
      skipLibCheck: true,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      strict: true,
      noImplicitAny: true,
      strictNullChecks: true,
      strictFunctionTypes: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      noImplicitReturns: true,
      paths: {
        '@/*': ['./src/*']
      },
      ...(framework === 'next' && {
        jsx: 'preserve',
        incremental: true,
        plugins: [{ name: 'next' }]
      }),
      ...(framework === 'react' && {
        jsx: 'react-jsx'
      })
    },
    include: ['src'],
    references: [{ path: './tsconfig.node.json' }]
  };
}

export function generateViteConfig(typescript) {
  if (typescript) {
    return `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})`;
  } else {
    return `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})`;
  }
}

export function generateTailwindConfig() {
  return {
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
}

export function generatePostCSSConfig() {
  return {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  };
}

export function generateNextConfig() {
  return `/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig`;
}

export function generateJSXPage() {
  return `export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome</h1>
        <p className="mt-4 text-lg text-gray-600">
          Start editing to see changes
        </p>
      </div>
    </main>
  )
}`;
}

export function generateTSXPage() {
  return `export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome</h1>
        <p className="mt-4 text-lg text-gray-600">
          Start editing to see changes
        </p>
      </div>
    </main>
  )
}`;
}

export function generateAppTSX() {
  return `function App() {
  return (
    <div>
      <h1>Welcome to React</h1>
      <p>Start editing to see changes</p>
    </div>
  )
}

export default App`;
}

export function generateMainTSX() {
  return `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`;
}

export function generateIndexHTML() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Harness Package</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
}

export function generateGlobalCSS(styling) {
  if (styling === 'tailwind') {
    return `@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

body {
  background: #ffffff;
  color: #000000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`;
  } else {
    return `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

body {
  background: #ffffff;
  color: #000000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`;
  }
}

export function generateESLintConfig(framework, typescript) {
  const baseConfig = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      ...(typescript ? ['plugin:@typescript-eslint/recommended'] : []),
      ...(framework === 'react' ? ['plugin:react/recommended', 'plugin:react-hooks/recommended'] : []),
    ],
    parser: typescript ? '@typescript-eslint/parser' : 'espree',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: [
      ...(typescript ? ['@typescript-eslint'] : []),
      ...(framework === 'react' ? ['react', 'react-hooks'] : []),
    ],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-unused-vars': typescript ? 'off' : 'warn',
      '@typescript-eslint/no-unused-vars': typescript ? 'warn' : 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };

  return baseConfig;
}
