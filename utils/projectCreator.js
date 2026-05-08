import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  generateTsConfigJson,
  generateViteConfig,
  generateTailwindConfig,
  generatePostCSSConfig,
  generateNextConfig,
  generateJSXPage,
  generateTSXPage,
  generateAppTSX,
  generateMainTSX,
  generateIndexHTML,
  generateGlobalCSS,
  generateESLintConfig
} from './configGenerator.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function copyTemplate(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);

  files.forEach(file => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);

    if (fs.statSync(srcFile).isDirectory()) {
      copyTemplate(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
}

function createProjectStructure(projectPath, projectName) {
  const dirs = [
    'src',
    'docs',
    'scripts',
    'public'
  ];

  dirs.forEach(dir => {
    const dirPath = path.join(projectPath, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
}

function generatePackageJson(projectName, framework, typescript, styling) {
  const dependencies = {};
  const devDependencies = {
    "prettier": "^3.0.0",
    "eslint": "^8.50.0"
  };

  // 프레임워크별 기본 의존성
  if (framework === 'react') {
    dependencies['react'] = '^18.2.0';
    dependencies['react-dom'] = '^18.2.0';
    devDependencies['vite'] = '^5.0.0';
    devDependencies['@vitejs/plugin-react'] = '^4.0.0';
    devDependencies['eslint-plugin-react'] = '^7.33.0';
    devDependencies['eslint-plugin-react-hooks'] = '^4.6.0';
  } else if (framework === 'next') {
    dependencies['next'] = '^14.0.0';
    dependencies['react'] = '^18.2.0';
    dependencies['react-dom'] = '^18.2.0';
  }

  // TypeScript
  if (typescript) {
    devDependencies['typescript'] = '^5.2.0';
    devDependencies['@types/react'] = '^18.2.0';
    devDependencies['@types/react-dom'] = '^18.2.0';
    devDependencies['@types/node'] = '^20.0.0';
  }

  // 스타일링
  if (styling === 'tailwind') {
    dependencies['tailwindcss'] = '^3.3.0';
    dependencies['postcss'] = '^8.4.0';
    dependencies['autoprefixer'] = '^10.4.0';
    devDependencies['tailwindcss'] = '^3.3.0';
    devDependencies['postcss'] = '^8.4.0';
    devDependencies['autoprefixer'] = '^10.4.0';
  }

  return {
    name: projectName,
    version: '0.1.0',
    description: `${projectName} - 하네스 엔지니어링 표준 적용`,
    type: 'module',
    scripts: {
      dev: framework === 'next' ? 'next dev' : 'vite',
      build: framework === 'next' ? 'next build' : 'vite build',
      preview: framework === 'next' ? 'next start' : 'vite preview',
      lint: 'eslint src --ext .ts,.tsx',
      format: 'prettier --write "src/**/*.{ts,tsx,css}"'
    },
    dependencies,
    devDependencies
  };
}

function generateCLAUDEmd(projectName, framework, typescript, styling) {
  const frameworkText = framework === 'next' ? 'Next.js 14' : 'React 18 + Vite';
  const tsText = typescript ? 'TypeScript strict mode' : 'JavaScript';
  const stylingText = styling === 'tailwind' ? 'Tailwind CSS' : styling === 'cssModules' ? 'CSS Modules' : 'CSS';

  return `# 프로젝트: ${projectName}

## 기술 스택
- ${frameworkText}
- ${tsText}
- ${stylingText}

## 아키텍처 규칙
- CRITICAL: {절대 지켜야 할 규칙 1}
- CRITICAL: {절대 지켜야 할 규칙 2}
- {일반 규칙}

## 개발 프로세스
- CRITICAL: 새 기능 구현 시 반드시 테스트를 먼저 작성하고, 테스트가 통과하는 구현을 작성할 것 (TDD)
- 커밋 메시지는 conventional commits 형식을 따를 것 (feat:, fix:, docs:, refactor:)

## 명령어
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
npm run lint     # ESLint
npm run format   # Prettier
`;
}

function generateADRmd() {
  return `# Architecture Decision Records

## 철학
{프로젝트의 핵심 가치관 (예: MVP 속도 최우선. 외부 의존성 최소화. 작동하는 최소 구현을 선택.)}

---

### ADR-001: {결정 사항}
**결정**: {뭘 선택했는지}
**이유**: {왜 선택했는지}
**트레이드오프**: {뭘 포기했는지}

### ADR-002: {결정 사항}
**결정**: {뭘 선택했는지}
**이유**: {왜 선택했는지}
**트레이드오프**: {뭘 포기했는지}
`;
}

function generateARCHITECTUREmd(framework) {
  const srcPath = framework === 'next' 
    ? `src/
├── app/               # 페이지 + API 라우트
├── components/        # UI 컴포넌트
├── types/             # TypeScript 타입 정의
├── lib/               # 유틸리티 + 헬퍼
└── services/          # 외부 API 래퍼`
    : `src/
├── pages/             # 페이지 컴포넌트
├── components/        # UI 컴포넌트
├── types/             # TypeScript 타입 정의
├── lib/               # 유틸리티 + 헬퍼
├── services/          # 외부 API 래퍼
├── styles/            # 전역 스타일
└── App.tsx            # 메인 앱 컴포넌트`;

  return `# 아키텍처

## 디렉토리 구조
\`\`\`
${srcPath}
\`\`\`

## 패턴
{사용하는 디자인 패턴}

## 데이터 흐름
\`\`\`
{데이터가 어떻게 흐르는지}
\`\`\`

## 상태 관리
{상태 관리 방식}
`;
}

function generatePRDmd(projectName) {
  return `# PRD: ${projectName}

## 목표
{이 프로젝트가 해결하려는 문제를 한 줄로 요약}

## 사용자
{누가 이 제품을 쓰는지}

## 핵심 기능
1. {기능 1}
2. {기능 2}
3. {기능 3}

## MVP 제외 사항
- {안 만들 것 1}
- {안 만들 것 2}

## 디자인
- {디자인 방향}
- {색상 팔레트}
`;
}

function generateUIGuidemd() {
  return `# UI 디자인 가이드

## 디자인 원칙
1. {원칙 1}
2. {원칙 2}
3. {원칙 3}

## AI 슬롭 안티패턴 — 하지 마라
| 금지 사항 | 이유 |
|-----------|------|
| backdrop-filter: blur() | glass morphism은 AI 템플릿의 가장 흔한 징후 |
| gradient-text | AI가 만든 SaaS 랜딩의 1번 특징 |

## 색상
### 배경
| 용도 | 값 |
|------|------|
| 페이지 | {예: #0a0a0a} |

### 텍스트
| 용도 | 값 |
|------|------|
| 주 텍스트 | {예: text-white} |
`;
}

export async function createProject(projectName, projectPath, options) {
  const { framework, typescript, styling } = options;

  // 프로젝트 디렉토리 생성
  fs.mkdirSync(projectPath, { recursive: true });

  // 프로젝트 구조 생성
  createProjectStructure(projectPath, projectName);

  // package.json 생성
  const packageJson = generatePackageJson(projectName, framework, typescript, styling);
  fs.writeFileSync(
    path.join(projectPath, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  // 문서 파일 생성
  fs.writeFileSync(
    path.join(projectPath, 'CLAUDE.md'),
    generateCLAUDEmd(projectName, framework, typescript, styling)
  );

  const docsPath = path.join(projectPath, 'docs');
  fs.writeFileSync(path.join(docsPath, 'ADR.md'), generateADRmd());
  fs.writeFileSync(path.join(docsPath, 'ARCHITECTURE.md'), generateARCHITECTUREmd(framework));
  fs.writeFileSync(path.join(docsPath, 'PRD.md'), generatePRDmd(projectName));
  fs.writeFileSync(path.join(docsPath, 'UI_GUIDE.md'), generateUIGuidemd());

  // .gitignore 생성
  const gitignore = `node_modules/
.env
.env.local
.env.*.local
dist/
build/
.next/
.turbo/
*.log
.DS_Store
`;
  fs.writeFileSync(path.join(projectPath, '.gitignore'), gitignore);

  // .prettierrc 생성
  const prettierrc = {
    semi: true,
    trailingComma: 'es5',
    singleQuote: true,
    printWidth: 80,
    tabWidth: 2
  };
  fs.writeFileSync(
    path.join(projectPath, '.prettierrc'),
    JSON.stringify(prettierrc, null, 2)
  );

  // TypeScript 설정
  if (typescript) {
    const tsConfig = generateTsConfigJson(framework, typescript);
    fs.writeFileSync(
      path.join(projectPath, 'tsconfig.json'),
      JSON.stringify(tsConfig, null, 2)
    );
  }

  // 프레임워크별 설정
  if (framework === 'next') {
    // Next.js 설정
    fs.writeFileSync(
      path.join(projectPath, 'next.config.js'),
      generateNextConfig()
    );

    const appDir = path.join(projectPath, 'src', 'app');
    fs.mkdirSync(appDir, { recursive: true });
    
    const ext = typescript ? 'tsx' : 'jsx';
    fs.writeFileSync(
      path.join(appDir, `page.${ext}`),
      typescript ? generateTSXPage() : generateJSXPage()
    );

    // app/layout.tsx
    const layoutContent = `${typescript ? "import type { Metadata } from 'next'\n" : ""}
import './globals.css'

${typescript ? "export const metadata: Metadata = {\n  title: '${projectName}',\n  description: 'Generated by create-harness-package',\n}\n" : ""}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}`;
    fs.writeFileSync(
      path.join(appDir, `layout.${ext}`),
      layoutContent
    );

    fs.writeFileSync(
      path.join(appDir, 'globals.css'),
      generateGlobalCSS(styling)
    );
  } else if (framework === 'react') {
    // React + Vite 설정
    fs.writeFileSync(
      path.join(projectPath, 'vite.config.ts'),
      generateViteConfig(typescript)
    );

    fs.writeFileSync(
      path.join(projectPath, 'index.html'),
      generateIndexHTML()
    );

    const srcDir = path.join(projectPath, 'src');
    const ext = typescript ? 'tsx' : 'jsx';

    fs.writeFileSync(
      path.join(srcDir, `App.${ext}`),
      generateAppTSX()
    );

    fs.writeFileSync(
      path.join(srcDir, `main.${ext}`),
      generateMainTSX()
    );

    fs.writeFileSync(
      path.join(srcDir, 'index.css'),
      generateGlobalCSS(styling)
    );
  }

  // Tailwind CSS 설정
  if (styling === 'tailwind') {
    fs.writeFileSync(
      path.join(projectPath, 'tailwind.config.js'),
      `export default ${JSON.stringify(generateTailwindConfig(), null, 2)}`
    );

    fs.writeFileSync(
      path.join(projectPath, 'postcss.config.js'),
      `export default ${JSON.stringify(generatePostCSSConfig(), null, 2)}`
    );
  }

  // ESLint 설정
  const eslintConfig = generateESLintConfig(framework, typescript);
  fs.writeFileSync(
    path.join(projectPath, '.eslintrc.json'),
    JSON.stringify(eslintConfig, null, 2)
  );

  // README 생성
  const readme = `# ${projectName}

${projectName} - 하네스 엔지니어링 표준을 적용한 프로젝트

## 시작하기

\`\`\`bash
npm install
npm run dev
\`\`\`

## 명령어

- \`npm run dev\` - 개발 서버 시작
- \`npm run build\` - 프로덕션 빌드
- \`npm run lint\` - ESLint 실행
- \`npm run format\` - Prettier 포맷팅

## 문서

- [CLAUDE.md](./CLAUDE.md) - 프로젝트 개요
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) - 아키텍처 설계
- [docs/ADR.md](./docs/ADR.md) - 아키텍처 결정 기록
- [docs/PRD.md](./docs/PRD.md) - 제품 요구사항 정의
- [docs/UI_GUIDE.md](./docs/UI_GUIDE.md) - UI 디자인 가이드
`;
  fs.writeFileSync(path.join(projectPath, 'README.md'), readme);
}
