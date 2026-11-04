# Design.md — 신풍제약 리뉴얼

이 문서는 완성된 메인 페이지(`Shinpoong/index.html`, `Shinpoong/css/main.css`)를 분석해서, 앞으로 만들 **서브페이지가 같은 브랜드 정체성과 UI 규칙을 따르도록** 정리한 설계서입니다.

- 기준은 언제나 **현재 메인 페이지 코드**입니다. 이 문서에 적힌 값은 모두 실제 코드에 있는 값입니다.
- 메인 페이지에 없는 색과 수치를 새로 만들지 않습니다. 새 값이 꼭 필요하면 먼저 사람에게 묻습니다.
- CSS 변수로 정의된 값은 항상 변수명으로 씁니다.
- 이 문서는 메인 페이지를 바꾸기 위한 문서가 아닙니다. 메인 페이지 디자인은 변경하지 않습니다.

---

## 1. Project Overview — 사이트 목적 및 디자인 방향

| 항목 | 내용 |
|---|---|
| 프로젝트 | 신풍제약(SHIN POONG PHARM.) 기업 사이트 리뉴얼 포트폴리오 |
| 제작 방식 | HTML + CSS + JS (빌드 도구 없음), Swiper 14 |
| 디자인 원본 | Figma 파일 "신풍2" 의 `메인` 프레임 (1920px 기준) |
| 메인 구성 | 헤더 → 히어로 → R&D → 제품 슬라이더 → 회사 소개 → 입찰/채용 공고 → 푸터 |

**디자인 방향**

- 제약회사다운 **깨끗하고 신뢰감 있는** 인상: 흰 바탕, 넓은 여백, 짙은 초록빛 검정 글자.
- 강조색은 **초록 하나**입니다 (선생님 피드백: 초록·파랑 두 색 → 하나로 통일). 로고·메뉴 줄·소제목·링크·버튼·탭·화살표 모두 초록 계열을 씁니다.
- 큰 사진(연구실, 공장, 제품)을 크게 보여 주고, 그 위나 옆에 짧고 굵은 문구를 둡니다.
- 모서리가 둥근 카드와 알약(pill) 모양 버튼으로 부드러운 느낌을 줍니다.

### 파일 구조

```text
Shinpoong/
├─ index.html        메인 페이지 (JS는 문서 맨 아래 <script> 안에 작성)
├─ product.html      서브: 제품정보
├─ rnd.html          서브: R&D
├─ ir.html           서브: 투자정보
├─ recruit.html      서브: 채용정보
├─ company.html      서브: 기업정보
├─ news.html         서브: 뉴스
├─ css/main.css      이 프로젝트 전용 스타일 (색 변수 :root 포함)
├─ img/              이 프로젝트 이미지
└─ Design.md         이 문서
../css/default.css   저장소 공통 reset (box-sizing, 여백 0, ul 점 제거, a 밑줄 제거 등)
../font/css/pretendardvariable.css   Pretendard 폰트
../npm/swiper/       Swiper 14 (CSS, JS)
```

서브페이지도 같은 `<head>` 연결 순서를 그대로 씁니다.

```html
<link rel="stylesheet" href="../css/default.css">
<link rel="stylesheet" href="../npm/swiper/swiper-bundle.min.css">
<link rel="stylesheet" href="../font/css/pretendardvariable.css">
<link rel="stylesheet" href="css/main.css">
<script src="../npm/swiper/swiper-bundle.min.js"></script>
```

---

## 2. Brand Identity — 브랜드 특성과 시각적 정체성

- **로고**: `img/logo.png` (초록 S 심볼 + "신풍제약주식회사 / SHIN POONG PHARM. CO., LTD.").
  헤더 가운데에 `width: 160px` 로 둡니다. `<h1 class="logo">` 안의 링크로 감싸고, `alt` 에 회사 이름을 씁니다.
- **브랜드 초록**: `--accent-emphasis`(#007a3d)가 사이트 전체의 대표 색입니다. GNB 배경, R&D 라벨, 버튼 테두리, 카드 hover 테두리에 쓰입니다.
- **누를 수 있는 것도 초록**: 텍스트 링크, 선택된 탭, 슬라이더 화살표, 버튼 hover는 `--action-primary-background`(green-700)를 씁니다. `--blue-600` 은 변수로만 남아 있고 **쓰지 않습니다.**
- **사진 톤**: 실제 연구실·공장·제품 사진을 씁니다. 사진 위에 글자를 올릴 때는 어두운 막을 깔고 흰 글자를 씁니다.
- **말투**: 짧은 두세 줄 제목에 `<br>` 로 줄을 직접 나눕니다. (예: "끊임 없는 연구와 혁신으로,<br>인류의 건강한 미래를 만들어 갑니다.")

---

## 3. Design Principles — 디자인 설계 의도 및 핵심 원칙

1. **변수 우선**: 색은 `:root` 의 Figma variables만 씁니다. 쓰임새 이름(Semantic, 예: `--text-primary`)이 있으면 기본 색 이름(Primitive, 예: `--neutral-900`)보다 쓰임새 이름을 먼저 씁니다.
2. **섹션 = 바깥 여백, `.inner` = 너비**: 섹션에는 padding만 주고, 안쪽 내용은 `.inner`(최대 1530px, 가운데 정렬)로 감쌉니다. 섹션에 왼쪽 padding 을 크게 줘서 위치를 맞추지 않습니다.
3. **가운데 정렬 기본**: 흰 바탕 섹션의 제목·버튼은 가운데 정렬(`text-align: center`)이 기본입니다. 사진 배경 섹션의 글자는 왼쪽 정렬입니다.
4. **둥근 모서리**: 큰 카드는 25px, 버튼과 탭은 알약 모양(92px)이 기본입니다.
5. **한 섹션 = 한 메시지**: 섹션마다 제목 하나, 짧은 설명, 버튼 하나를 넘지 않게 구성합니다.
6. **모바일은 같은 내용을 작게**: 1024px 이하에서 내용을 빼지 않고 글자·여백·카드만 줄이고 세로로 쌓습니다.

---

## 4. Color System — 실제 사용된 컬러 코드와 용도

### 4-1. 기본 색 (Primitive) — Figma `Primitives`

| 변수 | 값 | 비고 |
|---|---|---|
| `--green-500` | #00ab51 | `--accent-brand` 로만 연결됨 |
| `--green-700` | #007a3d | 브랜드 대표 초록 |
| `--blue-600` | #0056b8 | (색 통일 후 쓰지 않음 — 새로 쓰지 말 것) |
| `--neutral-0` | #ffffff | 흰색 |
| `--neutral-50` | #f5f8f7 | 아주 연한 회녹색 배경 |
| `--neutral-200` | #d7e1dc | 연한 선 |
| `--neutral-600` | #576861 | 보조 글자, 카드 테두리 |
| `--neutral-900` | #172b25 | 기본 글자 (초록빛 검정) |

### 4-2. 쓰임새별 색 (Semantic) — Figma `Sementic`

| 변수 | 연결 | 이럴 때 씁니다 | 메인 페이지 사용 예 |
|---|---|---|---|
| `--text-primary` | neutral-900 | 제목, 본문의 기본 글자 | body, 섹션 제목, 카드 제목, 푸터 메뉴 |
| `--text-secondary` | neutral-600 | 설명·날짜·주소 같은 보조 글자 | `.rnd-desc`, `.ntc-card`, `.ft-info` |
| `--text-link` | green-700 | 누를 수 있는 글자 | 버튼(`.rnd-btn` `.prd-btn`), 선택 안 된 `.ntc-tab`, `.cmp-btn:hover` 글자 |
| `--text-inverse` | neutral-0 | 어두운 바탕 위 흰 글자 | GNB 메뉴, 히어로·회사 소개 문구, 선택된 탭 |
| `--background-default` | neutral-0 | 페이지·섹션 기본 바탕 | body, `.rnd-sec`, `.prd-sec`, `.ntc-sec` |
| `--background-subtle` | neutral-50 | 한 단계 연한 바탕 | 푸터, 버튼(`.rnd-btn` `.prd-btn`), 선택 안 된 탭 |
| `--surface-default` | neutral-0 | 카드·헤더 같은 면 | header, `.prd-card` |
| `--surface-subtle` | neutral-50 | 연한 면 | (정의만 됨, 메인 미사용) |
| `--border-subtle` | neutral-200 | 연한 구분선 | 푸터 `|` 구분선, 이미지 자리 바탕 |
| `--border-input` | neutral-600 | 진한 테두리 | `.ntc-card` 테두리 |
| `--border-focus` | green-700 | 포커스 테두리 | 제품 검색창 입력 중 |
| `--action-primary-background` | green-700 | 주요 버튼 바탕 | (버튼 통일 후 지금은 안 씀) |
| `--action-primary-hover` | neutral-900 | 주요 버튼 hover 바탕 | (정의만 됨, 메인 미사용) |
| `--action-primary-text` | neutral-0 | 주요 버튼 글자 | (버튼 통일 후 지금은 안 씀) |
| `--action-secondary-background` | neutral-0 | 보조 버튼 바탕 | (버튼 통일 후 지금은 안 씀) |
| `--action-secondary-text` | green-700 | 보조 버튼 글자 | (버튼 통일 후 지금은 안 씀) |
| `--action-secondary-border` | green-700 | 보조 버튼 테두리 | (버튼 통일 후 지금은 안 씀) |
| `--accent-brand` | green-500 | 밝은 브랜드 강조 | (정의만 됨, 메인 미사용) |
| `--accent-emphasis` | green-700 | 브랜드 강조 | GNB 배경, `.rnd-label`, 카드 hover 테두리 |

**"정의만 됨"인 변수**는 Figma에 있지만 메인에서 아직 쓰지 않은 값입니다. 서브페이지에서 필요하면 **변수 이름의 뜻 그대로만** 씁니다. (예: 입력창 포커스 테두리 → `--border-focus`)

### 4-3. 변수가 아닌 색 (메인에서 그대로 쓰인 값)

아래 값은 Figma variables 에 없는 반투명 값입니다. 같은 상황에서만 같은 값을 다시 씁니다.

| 값 | 쓰이는 곳 | 상황 |
|---|---|---|
| `rgba(0, 0, 0, 0.7)` | `.prd-card::after` | 사진 카드 hover 시 검은 막 |
| `linear-gradient(90deg, rgba(5, 25, 60, 0.8), rgba(5, 25, 60, 0.4) 40%, rgba(5, 25, 60, 0) 65%)` | `.hero-sec .dark::after` | 어두운 사진 왼쪽에 흰 글자를 올릴 때 |
| `linear-gradient(90deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.6) 40%, rgba(255, 255, 255, 0) 65%)` | `.hero-sec .light::after` | 밝은 사진 왼쪽에 검은 글자를 올릴 때 |
| `text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3)` | `.hero-sec .dark .hero-txt` | 사진 위 흰 글자 가독성 |
| `drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15))` | `.rnd-stack img` | 떠 있는 사진 카드 그림자 |

회사 소개 배경(`img/company-bg.png`)은 **검은 막(35%)이 이미 사진에 들어 있어서** CSS로 막을 또 덮지 않습니다.

### 4-4. 색 조합 규칙

- 흰 바탕 섹션: 제목 `--text-primary`, 설명 `--text-secondary`.
- 사진·초록 바탕: 글자는 모두 `--text-inverse`.
- 선택된 것(탭 등): 바탕 `--action-primary-background`(초록) + 글자 `--text-inverse`.
- 선택 안 된 것: 바탕 `--background-subtle` + 글자 `--text-link`.

---

## 5. Typography — 글꼴 크기, 굵기, 행간 규칙

- **글꼴**: `"Pretendard Variable", sans-serif` 하나만 씁니다. (`body` 에 지정, 버튼은 `font: inherit` 로 따라옴)
- 기본 행간: `default.css` 의 `body { line-height: 1.5; }`
- 한국어 줄바꿈: `default.css` 의 `word-break: keep-all` (h1~h6, p)

### 5-1. 제목 (데스크톱 / 1024px 이하)

| 용도 | 쓰이는 곳 | 크기 | 굵기 | 행간 | 모바일 크기 |
|---|---|---|---|---|---|
| 페이지 대표 제목 (목록·게시판형) | `.ntc-title` | 62px | 900 | 79px | 30px / 1.3 |
| 섹션 제목 (흰 바탕, 가운데) | `.prd-title` | 54px | 700 | 1.45 | 24px |
| 섹션 제목 (사진 배경, 왼쪽) | `.cmp-txt h2` | 54px | 800 | 1.15 | 28px |
| 히어로 제목 | `.hero-txt h2` | 48px | 700 | 1.3 | 30px |
| 소개형 제목 (라벨 아래) | `.rnd-txt h2` | 36px | 700 | 1.4 | 24px |
| 카드 제목 | `.ntc-name` | 30px | 700 | 1.5 | 20px |
| 사진 카드 위 이름 | `.prd-name` | 24px | 700 | — | 18px |

**어떤 제목을 쓸까?**

- 서브페이지 맨 위의 큰 제목(예: "입찰/채용 공고" 같은 목록 페이지) → `.ntc-title` 규칙.
- 흰 바탕에서 섹션을 여는 제목 → `.prd-title` 규칙.
- 사진 배경 위 제목 → `.cmp-txt h2` 규칙 (흰 글자, 800).
- 영어 라벨과 함께 쓰는 소개 문단 → `.rnd-label` + `.rnd-txt h2` 규칙.
- **모든 섹션 제목은 "소제목(영어 라벨) + 큰제목"** 입니다 (선생님 피드백: 제목 방식 통일). 메인은 R&D `Research & Development`, 제품 `Products`, 회사 소개 `Company`, 공고 `Notice`. 서브페이지는 `.sub-label` + `.sub-title`. 소제목 → 큰제목 간격 16px. 사진 위 소제목만 밝은 초록 `--accent-brand`.

### 5-2. 본문·라벨

| 용도 | 쓰이는 곳 | 크기 | 굵기 | 행간 | 색 | 모바일 |
|---|---|---|---|---|---|---|
| 큰 본문 (사진 위·카드) | `.cmp-txt p`, `.ntc-card` | 20px | 400 | 1.5 | inverse / secondary | 15px |
| 히어로 설명 | `.hero-txt p` | 18px | 400 | 1.6 | inverse | 14px |
| 소개 설명 | `.rnd-desc` | 16px | 400 | 1.7 | secondary | 14px |
| 영어 섹션 라벨 | `.rnd-label` | 16px | 600 | 1.5 | `--accent-emphasis` | — |
| 카드 분류 라벨 | `.ntc-label` | 20px | 400 | 1.5 | secondary | 15px |
| 푸터 글자 | `footer` | 16px | 500~800 | 1.5 | 아래 7-6 참고 | 13px |
| GNB 메뉴 | `.gnb a` | 16px | 400 | 1.5 | inverse | (모바일 숨김) |

### 5-3. 굵기 사용 범위

400(본문) · 500(푸터 정보) · 600(버튼·탭·라벨·푸터 메뉴) · 700(제목) · 800(사진 위 제목, 강조 메뉴) · 900(페이지 대표 제목). 이 밖의 굵기는 쓰지 않습니다.

---

## 6. Layout & Spacing — 컨테이너, 간격, 정렬 규칙

### 6-1. 컨테이너

| 클래스 | 최대 너비 | 이럴 때 씁니다 |
|---|---|---|
| `.inner` | 1530px, `margin: 0 auto` | **모든 일반 섹션과 푸터의 안쪽 내용** |
| `.gnb ul` | 1200px | GNB 메뉴 줄 |
| `.prd-wrap` | 1350px | 420px 카드 3장 + 간격 45px 2개 (슬라이더 영역) |

### 6-2. 섹션 구조 (필수 패턴)

```html
<section class="xxx-sec">
    <div class="inner">
        <!-- 제목, 내용, 버튼 -->
    </div>
</section>
```

```css
.xxx-sec {
    padding: 110px 20px;   /* 위아래 110, 좌우 20 */
}
```

- 섹션 위아래 여백: **110px** (데스크톱), 좌우: **20px**.
- 1024px 이하: 위아래 **60px** (아래쪽을 더 두고 싶으면 `60px 20px 80px`), 좌우 20px.
- 섹션 높이를 고정하는 경우는 사진 배경 섹션뿐입니다. (`.cmp-sec { height: 700px; }`, 모바일은 `height: auto; min-height: 480px;`)
- 히어로 슬라이더 높이: `.hero-sec .swiper { height: 680px; }` (선생님 피드백: 680px 이상). 모바일은 `calc(100dvh - 56px)`.
- 예외: 히어로(사진이 화면 전체)와 R&D(스크롤 고정, `height: 300vh`)는 `.inner` 패턴을 쓰지 않습니다.

### 6-3. 섹션 안 간격

| 간격 | 값 (데스크톱) | 모바일 | 예 |
|---|---|---|---|
| 섹션 제목 → 내용 | 60px | 32px | `.prd-wrap { margin-top: 60px; }` |
| 내용 → 하단 버튼 | 60px | 32px | `.prd-btn { margin-top: 60px; }` |
| 큰 제목 → 탭 | 81px | 32px | `.ntc-tabs` |
| 탭 → 카드 목록 | 65px | 32px | `.ntc-list` |
| 라벨 → 제목 | 16px (소개형) / 12px (카드) | 8px (카드) | `.rnd-txt h2`, `.ntc-name` |
| 제목 → 설명 | 20px (소개형) / 16px (카드) / 54px (사진 배경) | 12px / 24px | `.rnd-desc`, `.ntc-desc`, `.cmp-txt p` |
| 설명 → 버튼 | 60px (모든 버튼 같음) | 32px | `.rnd-btn`, `.cmp-btn` |

### 6-4. 정렬과 배치

- **CSS Grid 는 메인 페이지에서 쓰지 않았습니다.** 가로 배치는 모두 `display: flex` 입니다.
  - 가로 나열 + 가운데: `display: flex; justify-content: center; gap: …;` (`.ntc-tabs` gap 21px, `.ntc-list` gap 53px)
  - 메뉴 고르게 퍼뜨리기: `justify-content: space-around;` (`.gnb ul`)
  - 카드 안 세로 배치 + 맨 아래 붙이기: `display: flex; flex-direction: column;` + 마지막 요소 `margin-top: auto;` (`.ntc-card` 의 날짜)
- 흰 바탕 섹션은 `text-align: center`, 카드 안 글자는 `text-align: left`.
- 사진 위에 글자 겹치기: 부모 `position: relative`, 글자 `position: absolute` + `z-index: 1`, 막은 `::after` + `inset: 0`.

### 6-5. 모서리 (border-radius)

| 값 | 쓰이는 곳 |
|---|---|
| 25px | 큰 카드(`.prd-card`, `.ntc-card`), 슬라이더 화살표 |
| 92px | 버튼·탭 (`.rnd-btn` `.prd-btn` `.cmp-btn` `.ntc-tab`, 높이 70px 알약) |
| 16px / 14px | 모바일 카드 / 모바일 화살표 |
| 4px | 히어로 페이지 표시 활성 점 (CSS만 있고, 지금 HTML에는 페이지 표시 요소가 없음) |

---

## 7. Components — 공통 UI 컴포넌트 및 사용방법

### 7-1. Header

```html
<header>
    <div class="top-bar">
        <h1 class="logo"><a href="index.html"><img src="img/logo.png" alt="신풍제약주식회사 SHIN POONG PHARM. CO., LTD."></a></h1>
    </div>
    <nav class="gnb">
        <ul>
            <li><a href="product.html">제품정보</a></li>
            <li><a href="rnd.html">R&amp;D</a></li>
            <li><a href="ir.html">투자정보</a></li>
            <li><a href="recruit.html">채용정보</a></li>
            <li><a href="company.html">기업정보</a></li>
            <li><a href="news.html">뉴스</a></li>
        </ul>
    </nav>
</header>
```

- 두 줄 구조: 흰 로고 줄(`--surface-default`, 위아래 padding 10px, 로고 가운데) + 초록 메뉴 줄(`--accent-emphasis`).
- 메뉴: 흰 글자 16px, `padding: 10px 20px`. hover 시 **아래 테두리 2px 흰색** (밑줄 `text-decoration` 은 쓰지 않음). 평소에도 투명 테두리를 깔아 두어 높이가 변하지 않게 합니다.
- 메뉴 6개와 순서는 모든 페이지에서 똑같이 유지합니다. 각 메뉴는 같은 폴더의 서브페이지로 연결합니다.
- 서브페이지에서는 지금 보고 있는 메뉴의 `<li>` 에 `.on` 을 붙입니다. (hover와 같은 아래 테두리로 표시)
- 1024px 이하: header 가 `position: fixed` (z-index 10), 로고 줄 높이 56px, **GNB 는 숨김**. 고정 헤더 때문에 첫 섹션에 `padding-top: 56px` 를 줍니다. (메인에는 모바일 메뉴 버튼이 아직 없습니다.)

### 7-2. 버튼

| 종류 | 클래스 | 모양 | 기본 | hover | 이럴 때 |
|---|---|---|---|---|---|
**모든 링크 버튼은 한 규칙**입니다 (선생님 피드백: 버튼이 각자도생하지 않게). 크기·여백·글자는 공고 탭과 같고, 끝에 화살표(→, `::after`)가 붙습니다.

- 공통: `inline-flex`, 높이 70px, 최소 너비 225px, `padding: 0 36px`, 글자와 화살표 사이 12px, 22px / 600 (선생님 조언: 높이 70 정도, 글자 20~22), radius 92px, `margin-top: 60px`, 색 바뀜 0.3s
- 모바일: 높이 44px, `padding: 0 20px`, 15px, `margin-top: 32px` (모바일 탭과 같음)

| 종류 | 클래스 | 기본 | hover | 이럴 때 |
|---|---|---|---|---|
| 기본 버튼 | `.rnd-btn`, `.prd-btn` | `--background-subtle` + `--text-link` (= 선택 안 된 탭) | `--action-primary-background`(초록) + 흰 글자 (= 선택된 탭) | 흰 바탕 위 "더보기", "자세히 보기" |
| 사진 위 버튼 | `.cmp-btn` | 투명 + 흰 테두리 2px + 흰 글자 | 흰 바탕 + `--text-link` 글자 | 사진·어두운 배경 위 "자세히 보기" |

| 종류 | 클래스 | 모양 | 기본 | hover | 이럴 때 |
|---|---|---|---|---|---|
| 탭 버튼 | `.ntc-tab` | 225×70, 22px / 600, radius 92px (링크 버튼과 같은 크기, 화살표 없음) | `--background-subtle` + `--text-link` | `--action-primary-background`(초록) + 흰 글자 (= `.on`), 0.3s | 목록 분류 전환. 선택은 `.on`. **메인·서브페이지(공고, 뉴스, 제품 분류, 파이프라인) 모두 같은 탭** |
| 화살표 버튼 | `.prd-prev`, `.prd-next` | 67×67, radius 25px, 글자 `&larr;` `&rarr;` 27px | `--action-primary-background`(초록) + 흰 글자 | (없음) | 슬라이더 이전/다음. 끝이면 `opacity: 0.35` |

- 버튼 글자: "더보기", "자세히 보기", "자세히 보기 →" 중에서 고릅니다.
- 이동하는 링크는 `<a>`, 화면 안에서 동작만 하는 것(탭, 화살표)은 `<button type="button">` 을 씁니다.

### 7-3. 카드

**사진 카드 (`.prd-card`)** — 제품·사진 목록

```html
<a href="#" class="prd-card">
    <img src="img/product1.png" alt="칸데암로">
    <span class="prd-name">칸데암로</span>
</a>
```

- 정사각형(`aspect-ratio: 1 / 1`), radius 25px, 사진 `object-fit: cover`. 잘리면 안 되는 사진은 `.fit` 추가(`contain`).
- 평소에는 사진만, hover 시 검은 막(0.7)과 가운데 흰 이름이 0.3초 동안 나타납니다.

**글 카드 (`.ntc-card`)** — 공고·소식 목록

```html
<a href="#" class="ntc-card">
    <span class="ntc-label">채용공고</span>
    <strong class="ntc-name">제목</strong>
    <p class="ntc-desc">설명</p>
    <span class="ntc-date">2026.10.23 ~ 2026.11.08</span>
</a>
```

- 475×400, `padding: 36px 35px`, 테두리 2px `--border-input`, radius 25px.
- 순서: 분류 라벨 → 제목 → 설명 → 날짜(맨 아래 고정).
- hover 시 테두리가 `--accent-emphasis` 로 바뀝니다.
- 날짜 형식: `YYYY.MM.DD ~ YYYY.MM.DD`

### 7-4. 탭 + 목록

- 탭은 `data-type` 값(`all`, `bid`, `job` …)을 갖고, 목록의 `<li data-type="…">` 와 짝을 이룹니다.
- 선택된 탭에 `.on` 클래스, 안 맞는 목록은 `hidden` 속성으로 숨깁니다.
- 보여 줄 항목이 없으면 `.ntc-empty`("등록된 공고가 없습니다.")를 보여 줍니다.

### 7-5. 슬라이더 (Swiper)

- Swiper 기본 HTML 구조(`.swiper` > `.swiper-wrapper` > `.swiper-slide`)를 그대로 쓰고, 스크립트로 실행합니다.
- 실행할 때는 **반드시 고유 클래스**로 선택합니다. (히어로 `'.visual'`, 제품 `'.prd-slider'`) `'.swiper'` 로 선택하면 페이지의 모든 슬라이더가 같이 잡힙니다.
- 카드 슬라이더 설정: `slidesPerView: 'auto'`(카드 너비는 CSS), `spaceBetween: 16`, `breakpoints: { 1024: { spaceBetween: 45 } }`, `navigation` 은 직접 만든 화살표 버튼.

### 7-6. Footer

```html
<footer>
    <div class="inner">
        <ul class="ft-links">…</ul>
        <address class="ft-info">…</address>
        <p class="ft-copy"><b>&copy;</b>SHINPOONG.CO,.LTD ALL RIGHTS RESERVED.</p>
    </div>
</footer>
```

- 바탕 `--background-subtle`, `min-height: 325px`, `padding: 65px 20px 40px`, 글자 16px / 행간 1.5.
- 메뉴: `--text-primary`, 600. "개인정보처리방침"만 800(`.ft-privacy`). 사이 구분선 `|` 는 `--border-subtle`, 좌우 10px.
- 회사 정보: `<address>`, `--text-secondary`, 500, 메뉴 아래 33px. 저작권 줄은 24px 아래.
- 1024px 이하: `padding: 40px 20px`, 13px, 간격 20px / 16px.
- 회사 정보 문구는 모든 페이지에서 똑같이 씁니다.

### 7-7. 이름 규칙 (클래스)

- 섹션은 3글자 약어 + `-sec`: `rnd-sec`, `prd-sec`, `cmp-sec`, `ntc-sec`. 안쪽 요소는 같은 약어로 시작합니다(`prd-title`, `ntc-card`).
- 푸터는 `ft-`, 공통 너비는 `.inner`, 선택 상태는 `.on`, PC/모바일 전용은 `.pc` / `.mo`.
- CSS 규칙 위에는 한국어 주석으로 "무엇을 왜" 하는지 적습니다.

---

## 8. Interaction — Hover, Focus, Transition 등

| 대상 | 상태 | 변화 | 전환 |
|---|---|---|---|
| `.gnb a` | hover | 아래 테두리 2px 흰색 | 0.3s |
| `.rnd-btn` `.prd-btn` | hover | 연한 바탕 → 초록 바탕 + 흰 글자 | 0.3s |
| `.cmp-btn` | hover | 흰 바탕 + 초록 글자 | 0.3s |
| `.ntc-tab` | hover | 선택된 탭(`.on`)과 같은 초록 바탕 + 흰 글자 | 0.3s |
| `.prd-card` | hover | 검은 막 + 이름 나타남 | `opacity 0.3s` |
| `.ntc-card` | hover | 테두리 `--accent-emphasis` | 즉시 |
| `.ntc-tab` | 선택(`.on`) | 초록 바탕 + 흰 글자 | 즉시 |
| `.prd-prev/next` | 끝(`.swiper-button-disabled`) | `opacity: 0.35`, 기본 커서 | — |
| 모든 요소 | focus | `default.css` 의 `:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }` | — |
| R&D 사진 | 스크롤 | 양옆 사진 3장이 차례로 앞으로 나옴 (JS, sticky) | 스크롤 연동 |

- **전환(transition)은 사진 카드 hover 의 `opacity 0.3s` 하나뿐입니다.** 새 전환을 넣을 때도 `0.3s` 를 씁니다.
- `:active` 스타일은 메인 페이지에 없습니다. 만들지 않습니다.
- `default.css` 가 `prefers-reduced-motion` 에서 전환을 끄므로 따로 처리하지 않습니다.

---

## 9. Responsive Rules — 반응형 레이아웃 기준

- **기준점은 하나**: `@media (max-width: 1024px)` (CSS). Swiper 는 `breakpoints: { 1024: … }` (1024px 이상).
- 데스크톱 디자인 기준 폭: 1920px (Figma).

| 항목 | 데스크톱 | 1024px 이하 |
|---|---|---|
| 헤더 | 로고 줄 + GNB | 고정 헤더 56px, GNB 숨김 |
| 섹션 여백 | 110px 20px | 60px 20px (또는 60px 20px 80px) |
| 가로 카드 목록 | flex 가로 나열 | `flex-direction: column`, 카드 `width: 100%; max-width: 475px` |
| 슬라이더 카드 | 420px | 60vw, 간격 16px |
| 고정 높이 섹션 | 700px | `height: auto; min-height: 480px` |
| 글 카드 | 400px 고정 | `height: auto; min-height: 240px; padding: 24px` |
| 탭 | 225×70, 22px | `width: auto; height: 44px; padding: 0 20px`, 15px |
| 버튼 | 225×70, 22px | `min-width: 0; height: 44px; padding: 0 20px`, 15px |

- 모바일 글자 크기는 5장의 표에 적힌 값을 씁니다.
- 가로 스크롤이 생기면 안 됩니다. `html, body { overflow-x: clip; }` 을 유지합니다. (`hidden` 으로 바꾸면 sticky 가 깨집니다.)
- 모바일 화면 높이는 `100dvh` 를 씁니다. (고정 헤더가 있으면 `calc(100dvh - 56px)`)

---

## 10. Do & Don't — 반드시 지킬 규칙과 금기사항

### Do

- 색은 `:root` 변수로만 씁니다. 쓰임새 이름(`--text-*`, `--background-*` …)을 먼저 고릅니다.
- 새 섹션은 `section.xxx-sec > div.inner` 구조, `padding: 110px 20px` 로 만듭니다.
- 글꼴은 Pretendard Variable 하나, 굵기는 400~900 중 5장에 적힌 것만 씁니다.
- 헤더·GNB·푸터는 메인과 같은 HTML 과 문구를 그대로 씁니다.
- 1024px 기준 모바일 스타일을 같은 `@media` 블록 안에 함께 작성합니다.
- 사진 위 글자에는 어두운 막(또는 막이 들어간 사진)과 흰 글자를 씁니다.
- 이미지는 `Shinpoong/img/` 에 두고, `alt` 를 꼭 씁니다.
- Swiper 는 고유 클래스로 실행합니다.

### Don't

- **링크를 기존 신풍제약 사이트(shinpoong.co.kr 등)로 연결하지 않습니다.** 프로젝트 안 페이지(`product.html` 등)로만 연결하고, 아직 없는 페이지는 `href="#"` 으로 둡니다.
- 메인 페이지(`index.html`, `main.css` 의 기존 규칙)의 디자인을 바꾸지 않습니다.
- 메인에 없는 색 코드, 글자 크기, 여백, 모서리 값을 새로 만들지 않습니다. 필요하면 먼저 묻습니다.
- 변수가 있는 색을 `#007a3d` 처럼 코드로 직접 쓰지 않습니다.
- 섹션에 큰 왼쪽 padding(예: 171px, 205px)을 줘서 위치를 맞추지 않습니다. `.inner` 로 맞춥니다.
- `html, body` 에 `overflow-x: hidden` 을 다시 넣지 않습니다.
- 실행 코드에서 `new Swiper('.swiper')` 처럼 공통 클래스로 선택하지 않습니다.
- 사용자가 요청하지 않으면 CSS/JS 파일을 새로 나누지 않습니다. (스타일은 `css/main.css`, 스크립트는 HTML 맨 아래 `<script>`)
- 사진 배경 섹션에 막이 이미 들어간 사진(`company-bg.png`)이면 CSS 막을 또 덮지 않습니다.

---

## 11. Subpages — 서브페이지 확장 규칙

헤더 메뉴 6개마다 서브페이지가 하나씩 있습니다. 모두 메인과 **같은 헤더, 같은 푸터, 같은 `main.css`** 를 씁니다.
서브페이지 전용 규칙은 `main.css` 의 "서브페이지 공통" 주석 아래에 모여 있고, 메인의 기존 규칙은 고치지 않았습니다.

### 11-1. 페이지 순서 (정보 구조)

모든 서브페이지는 아래 순서를 지킵니다.

1. 헤더 (현재 메뉴 `.on`)
2. 상단 비주얼 `.sub-visual` — 영어 라벨, 두 줄 제목, 한두 줄 설명
3. 현재 위치 `.sub-path` — `HOME > 메뉴명`
4. 내용 섹션 `.sub-sec` 여러 개 — 가장 중요한 내용을 맨 위에 둡니다. 섹션을 번갈아 구분할 때만 `.sub-sec.subtle`(연한 바탕)
5. 푸터

| 페이지 | 파일 | 섹션 순서 |
|---|---|---|
| 제품정보 | `product.html` | 대표 제품(Swiper, 메인 제품 슬라이더 그대로) → 전체 제품(검색 + 분류 탭 5개: 전체 / 의약품 / 전문의약품 / 의료기기 / 건강기능식품 + 사진 카드 목록) → 제품 문의 |
| R&D | `rnd.html` | 연구개발 소개(사진+글) → R&D 스토리(글 카드 5개) → 파이프라인(분야 탭 + 단계 막대) → 연구 현장(Swiper) → 파트너십(가운데 글 + 버튼) |
| 투자정보 | `ir.html` | 투자정보(글 카드 3개) → IR 자료실 |
| 채용정보 | `recruit.html` | 인재상(글 카드) → 채용 절차(단계 박스) → 채용 공고(탭 + 글 카드) |
| 기업정보 | `company.html` | 회사소개(사진+글) → 핵심가치(글 카드) → 연혁 |
| 뉴스 | `news.html` | 뉴스(탭 + 글 카드 여러 줄) |

### 11-2. 서브페이지 공통 부품

| 부품 | 클래스 | 규칙 (메인의 어떤 값을 따랐는지) |
|---|---|---|
| 상단 비주얼 | `.sub-visual` | 회사 소개 섹션처럼 사진 배경 + 왼쪽 흰 글자. padding `110px 20px`, 제목 54px / 800 / 1.45, 설명 20px / 1.5. 라벨은 어두운 바탕이라 `--accent-brand` |
| 이미지 자리 | `.img-box` | 아직 사진이 없는 곳. 바탕 `--border-subtle`, 글자 `--text-secondary` 16px. 비주얼 안에서는 바탕 `--neutral-600` + 흰 글자. **사진이 준비되면 `<img>` 로 바꿉니다.** |
| 현재 위치 | `.sub-path` | 16px, 아래 선 1px `--border-subtle`, 구분 기호 `>` 는 푸터 구분선처럼 `--border-subtle` / 700, 마지막 항목만 `--text-primary` / 600 |
| 섹션 머리 | `.sub-label` + `.sub-title` + `.sub-desc` | 라벨 = `.rnd-label`, 제목 = `.prd-title`(54px / 700), 설명 = `.rnd-desc`(16px / 1.7) |
| 섹션 내용 | `.sub-body` | 제목 아래 60px (모바일 32px) |
| 사진 + 글 | `.sub-intro` | flex 두 칸, gap 53px, 사진 비율 513 / 414, 모서리 25px. 글 제목 = `.rnd-txt h2`(36px / 700 / 1.4). 모바일은 위아래로 |
| 사진 카드 목록 | `.prd-list` + `.prd-card` | 한 줄에 4개(`width: calc((100% - 135px) / 4)`), gap 45px, 줄바꿈. 모바일은 한 줄에 1개(최대 420px). 아래 `.prd-info` 에 분류(`span`, 16px / 600 `--accent-emphasis`), 이름(24px / 700), 설명(16px / 1.7). 제품 사진(`img/product/`, 약 282×173px)은 `.prd-card.thumb` — 상자를 사진 비율(282 / 173)로 만들어 사진이 꽉 차게(`object-fit: cover`) |
| 제품 검색 | `.prd-filter` + `.prd-search` | 위 검색창(가운데, 475px), 아래 분류 탭(`.ntc-tab`), 사이 36px. 검색창 = 탭과 같은 높이 70px · 모서리 92px, 테두리 2px `--border-input`, 입력 중 `--border-focus`, 글자 20px. 검색 버튼 = 선택된 탭과 같은 `--action-primary-background`(초록) + 흰 22px / 600. 결과 개수 `.prd-count`(20px, 숫자 `--accent-emphasis`), 결과가 없으면 `.ntc-empty`. 화면이 좁아지면 탭이 줄바꿈 없이 함께 줄어듭니다. 모바일은 탭 2개씩(마지막은 한 줄 전체), 높이 44px |
| 글 카드 목록 | `.ntc-list` + `.ntc-card` | 메인 공고 카드 그대로. 여러 줄이면 `.ntc-list.wrap` |
| 탭 | `.ntc-tabs` + `.ntc-tab` | 메인 공고 탭 그대로. 탭 아래 목록은 65px (모바일 32px) |
| 연혁 | `.hist-list` | 위 선 2px `--border-input`, 항목 사이 1px `--border-subtle`, 연도 30px / 700 `--accent-emphasis`, 너비 225px |
| 파이프라인 | `.pipe` (`.pipe-head` + `.pipe-list`) | 왼쪽 과제 이름 칸 475px(공고 카드 너비, 분류·이름·설명은 `.prd-info` 와 같은 글자), 오른쪽 단계 막대. 막대 칸 = 높이 44px · 모서리 92px · 바탕 `--background-subtle`, 막대 = `--action-primary-background`(초록) + 흰 16px / 600, 5단계라 한 단계 20%(`.s1`~`.s5`). **시판(`.s5`)만 밝은 초록 `--accent-brand`**. 선은 연혁과 같음. 위에 분야 탭(`.pipe-filter`), 탭 아래 65px. 모바일은 이름 아래 막대, 탭 3개씩 |
| 서브 버튼 | `.prd-btn` | 메인 버튼 그대로. `.sub-body` 안에서는 위 간격 0, 연한 바탕 섹션(`.subtle`)에서는 바탕을 `--background-default`(흰색)로 |
| 단계 박스 | `.step-list` | flex, gap 21px, 박스 padding `36px 35px`, 모서리 25px, 단계 번호 = `.rnd-label`, 제목 24px / 700 |

### 11-3. 서브페이지 스크립트

- 탭: 메인 공고 탭과 같은 동작. 단, 한 페이지에 카드 목록이 여러 개일 수 있으므로 **탭이 있는 `.sub-body` 안에서만** 카드를 찾습니다.
- 파이프라인 탭: 고른 분야(`data-type`)의 과제만 보여 줍니다.
- 제품 검색: 고른 분류 탭(`data-type`)과 검색어(제품명·성분명) **둘 다 맞는** 카드만 보여 주고, 개수를 `.prd-count` 에 씁니다. 글자를 칠 때마다 바로 거르고, 검색 버튼은 페이지 이동을 막습니다.
- 슬라이더: Swiper 로 만들고, 고유 클래스(`.lab-slider`, `.best-slider` 등)로 실행합니다. 설정은 메인 제품 슬라이더와 같습니다.

### 11-4. 내용을 채울 때

- `연혁 내용이 들어갈 자리입니다.`, `제목이 들어갈 자리입니다.` 같은 문구와 `.img-box` 는 **실제 내용·사진으로 바꿀 자리**입니다.
- 사실 확인이 안 된 숫자(매출, 주가, 연도 등)를 지어내서 넣지 않습니다.
