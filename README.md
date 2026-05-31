# Custom Game Engine — Docs Site

DX11 기반 2D 게임 엔진 프로젝트의 소개 사이트.
- 게임 룰 설명 (흐름도)
- 오브젝트 인스턴스 맵
- 클래스 다이어그램 — 특이한 부분
- 게임 실행 데모

## 로컬 실행

```bash
npm install
npm run dev
# → http://localhost:3000
```

## 콘텐츠 편집

전체 페이지는 `src/app/page.tsx` 한 파일. 4개 section이 anchor 링크로 묶여 있음.
- 텍스트/표/코드블록 직접 수정
- 이미지/영상 자리는 `public/` 폴더에 파일 넣고 `<Image>` 또는 `<video>`로 교체

## Vercel 배포 (가장 단순한 방법)

1. 이 폴더를 GitHub 저장소로 push (별도 repo 또는 기존 모노레포)
2. https://vercel.com 로그인 → **Add New Project**
3. GitHub 저장소 선택 → **Import**
4. Framework Preset이 자동으로 **Next.js**로 감지됨 → **Deploy** 클릭
5. 1-2분 후 `https://<project-name>.vercel.app` URL 받음
6. 이후 git push할 때마다 자동 재배포

### 또는 Vercel CLI

```bash
npm i -g vercel
vercel              # 첫 배포 (질문 몇 개에 답)
vercel --prod       # 프로덕션 배포
```

## 폴더 구조

```
src/app/
├── layout.tsx     # 전역 layout + metadata
├── page.tsx       # 단일 페이지에 4 section
└── globals.css    # Tailwind 기본 + 전역 스타일
public/             # 정적 자산 (이미지/영상) 위치
```
