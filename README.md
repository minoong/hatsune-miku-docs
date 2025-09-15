# Hatsune Miku Docs

하츠네 미쿠를 테마로 한 React 컴포넌트 라이브러리 및 문서화 프로젝트입니다.

## 📱 서비스 링크

- **웹앱**: [https://hatsune-miku-docs.vercel.app/](https://hatsune-miku-docs.vercel.app/)
- **스토리북**: [https://minoong.github.io/hatsune-miku-docs/](https://minoong.github.io/hatsune-miku-docs/)

## 🏗️ 아키텍처

이 프로젝트는 **Feature-Sliced Design (FSD)** 아키텍처를 기반으로 구성되어 있습니다.

```
src/
├── app/           # 애플리케이션 설정 및 글로벌 로직
├── pages/         # 페이지 레벨 컴포넌트
├── widgets/       # 독립적인 UI 블록
├── features/      # 비즈니스 기능별 모듈
│   ├── carousel/     # 무한 스크롤 캐러셀
│   ├── flip-card/    # 3D 플립 카드
│   ├── photo-capture/ # 사진 촬영 기능
│   ├── film-recipe/   # 필름 시뮬레이션
│   ├── photo-edit/    # 사진 편집
│   ├── photo-select/  # 사진 선택
│   └── tabs/         # 탭 내비게이션
├── entities/      # 비즈니스 엔티티
├── shared/        # 공통 유틸리티 및 UI 컴포넌트
└── stories/       # Storybook 스토리
```

### Feature 구조

각 feature는 다음과 같은 구조를 따릅니다:

```
features/{domain}/
├── model/          # 비즈니스 로직, hooks, 타입
├── ui/             # React 컴포넌트
└── *.stories.tsx   # Storybook 스토리
```

## 🛠️ 기술 스택

### 핵심 기술

- **React 19** - 최신 React 기능 활용
- **TypeScript** - 타입 안전성 보장
- **Vite** - 빠른 빌드 도구 (SWC 사용)
- **Tailwind CSS v4** - 유틸리티 기반 스타일링

### 애니메이션 & UI

- **Framer Motion** - 부드러운 애니메이션
- **React Router DOM** - 클라이언트 사이드 라우팅

### 개발 도구 & 문서화

- **Storybook** - 컴포넌트 문서화 및 개발 환경
- **Vitest + Playwright** - 브라우저 테스트
- **ESLint + Prettier** - 코드 품질 관리

### 배포

- **Vercel** - 웹앱 배포
- **GitHub Pages** - 스토리북 배포

## 🎨 주요 기능

### 웹앱 기능

1. **사진 촬영 시뮬레이션**
   - 웹캠을 활용한 실시간 사진 촬영
   - 필름 카메라 느낌의 UI/UX

2. **필름 레시피 시스템**
   - 다양한 필름 시뮬레이션 효과
   - 커스텀 필터 적용 기능

3. **사진 편집 도구**
   - 밝기, 대비, 채도 조절
   - 실시간 프리뷰

4. **인터랙티브 UI 컴포넌트**
   - 3D 플립 카드 애니메이션
   - 무한 스크롤 캐러셀
   - 부드러운 탭 내비게이션

### 스토리북 기능

1. **컴포넌트 문서화**
   - 모든 UI 컴포넌트의 상세 문서
   - 인터랙티브 예제 및 사용법

2. **접근성 테스트**
   - a11y 애드온을 통한 접근성 검증
   - WCAG 가이드라인 준수

3. **반응형 테스트**
   - 다양한 화면 크기에서의 동작 확인
   - 모바일/데스크톱 최적화

4. **실시간 개발 환경**
   - 컴포넌트 변경 사항 즉시 반영
   - 격리된 환경에서의 개발

## 🚀 개발 환경 설정

### 필수 요구사항

- Node.js (버전은 `.nvmrc` 파일 참조)
- npm

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 스토리북 실행
npm run storybook

# 빌드
npm run build

# 코드 품질 검사
npm run lint
npm run prettier:fix
```

## 🔧 설정 파일

### TypeScript

- `tsconfig.app.json` - 애플리케이션 TypeScript 설정
- `~/*` 경로 별칭을 `src/*`로 매핑

### Tailwind CSS

- Tailwind CSS v4 with Vite 플러그인 사용
- 커스텀 그라데이션 및 애니메이션 설정

### Storybook

- React Vite 기반 설정
- a11y, docs, vitest 애드온 활성화
- 정적 파일은 `public/` 폴더에서 제공

## 🏗️ 빌드 및 배포

### 웹앱 (Vercel)

- `main` 브랜치 자동 배포
- TypeScript 체크 + Vite 빌드

### 스토리북 (GitHub Pages)

GitHub Actions 워크플로우를 통한 자동 배포:

**트리거 조건:**

- PR이 `main` 브랜치에 머지되고 `storybook` 라벨이 있을 때
- 수동 워크플로우 실행 (`workflow_dispatch`)

**배포 프로세스:**

1. 코드 체크아웃
2. Node.js 환경 설정 (`.nvmrc` 버전 사용)
3. 의존성 설치 (`npm ci`)
4. Storybook 빌드 (`npm run build-storybook`)
5. GitHub Pages 배포 (`gh-pages` 브랜치)

**워크플로우 파일:** `.github/workflows/storybook.yml`
