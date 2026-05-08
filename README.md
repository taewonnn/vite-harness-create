# vite-harness-create

Harness 엔지니어링 표준을 적용한 React/Next.js 프로젝트 생성 CLI

## 설치

```bash
npm create vite-harness-create@latest my-project
```

## 사용법

프로젝트명을 입력한 후 다음을 선택합니다:

- **프레임워크**: React + Vite 또는 Next.js
- **TypeScript**: 사용 여부
- **스타일링**: Tailwind CSS, CSS Modules, 또는 None

```bash
cd my-project
npm install
npm run dev
```

## 생성되는 파일 구조

```
my-project/
├── CLAUDE.md              # 프로젝트 개요 + 기술스택
├── docs/
│   ├── ADR.md            # 아키텍처 결정 기록
│   ├── ARCHITECTURE.md   # 디렉토리 구조 + 패턴
│   ├── PRD.md            # 제품 요구사항 정의
│   └── UI_GUIDE.md       # UI 디자인 가이드
├── src/                   # 소스 코드
├── package.json          # 프레임워크별 의존성 자동 설정
├── tsconfig.json         # TypeScript 설정
├── tailwind.config.js    # Tailwind CSS 설정 (선택 시)
├── vite.config.ts        # Vite 설정 (React 선택 시)
└── .eslintrc.json        # ESLint 설정
```

## 명령어

```bash
npm run dev      # 개발 서버 시작
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 실행
npm run format   # Prettier 포맷팅
```

## 특징

✅ **하네스 엔지니어링 표준** - CLAUDE.md, ADR, PRD, UI Guide 자동 생성  
✅ **완전한 설정** - TypeScript, ESLint, Prettier 미리 설정  
✅ **선택적 스타일링** - Tailwind CSS, CSS Modules 지원  
✅ **빠른 시작** - 설치 후 바로 개발 시작 가능

## License

MIT
# vite-harness-create
