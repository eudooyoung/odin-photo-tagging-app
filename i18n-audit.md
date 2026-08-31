# 프론트엔드 i18n 번역 대상 조사

## 조사 기준 및 범위

- 조사일: 2026-08-31
- 기준 코드: 현재 `frontend` 소스와, 프론트 화면에 데이터를 공급하는 `backend`의 API/DB 코드
- 생성 결과물(`frontend/dist`), 테스트 문구, 개발용 로그와 주석은 실제 사용자 UI가 아니므로 번역 목록에서 제외했다.
- 접근성 전용 텍스트(`aria-label`, `alt`, visually hidden label/title)도 사용자에게 전달되는 문구로 보고 포함했다.
- 아래 위치는 현재 파일의 대략적인 줄 번호다.
- i18n key 구조는 제안하지 않는다.

## 요약

현재 번역 대상은 크게 다음과 같다.

1. **UI 고정 문자열**: 페이지/컴포넌트에 직접 작성된 제목, 버튼, 안내, 상태, 오류, 접근성 문구. 번역 리소스로 이동할 수 있다.
2. **콘텐츠 데이터**: DB의 `Geek.name`에서 API의 `game.targets[].name`으로 전달되어 두 화면에 표시되는 찾기 대상 이름. 번역 리소스만으로 처리하기보다 DB/API의 다국어 콘텐츠 구조 또는 안정적인 콘텐츠 식별자가 필요하다.

현재 데이터 모델/API에는 별도의 게임 제목이나 설명이 없다. 리더보드의 플레이어 이름은 사용자 입력 데이터이므로 번역하지 않는다.

---

## 1. UI 고정 문자열

### 공통 브랜드, 문서 제목, 푸터

| 문자열 | 용도 | 위치 | 비고 |
|---|---|---|---|
| `Find Geeks` | 랜딩 제목, 헤더 브랜드, 브라우저 탭 제목, 저작권 표기 | `frontend/src/pages/landing-page/LandingPage.tsx:21`; `frontend/src/components/header/Header.tsx:8`; `frontend/index.html:9`; `frontend/src/components/footer/Footer.tsx:6` | 동일 문구로 묶어 관리할 후보. 제품명으로 번역하지 않을 정책이라도 모든 노출 위치의 일관성은 필요하다. |
| `Built by` | 제작자 안내 | `frontend/src/components/footer/Footer.tsx:8` | 뒤의 `Dooyoung`은 고유명사이므로 번역 대상이 아니다. |
| `Github` | 외부 링크 표시명 | `frontend/src/components/footer/Footer.tsx:21` | 서비스 고유명사로 유지 가능하다. 공식 표기인 `GitHub` 여부는 번역과 별개의 문제다. |
| `The Odin Project` | 외부 링크 표시명 | `frontend/src/components/footer/Footer.tsx:28` | 고유명사로 유지 가능하다. |
| `© 2026 Find Geeks` | 저작권 문구 | `frontend/src/components/footer/Footer.tsx:6` | 브랜드명 번역 정책과 함께 처리. 연도는 문자열 번역보다는 별도 값으로 취급할 수 있다. |

### 랜딩 페이지

| 문자열 | 용도 | 위치 | 비고 |
|---|---|---|---|
| `Start` | 게임 시작 버튼 | `frontend/src/pages/landing-page/LandingPage.tsx:26` | 버튼 기본 상태. |
| `Creating Game...` | 게임 생성 중 상태/버튼 | `frontend/src/pages/landing-page/LandingPage.tsx:26` | 로딩 상태 문구. |
| `See Leaderboard` | 리더보드 이동 링크 | `frontend/src/pages/landing-page/LandingPage.tsx:31-33` | 결과 다이얼로그의 `See leaderboard`와 대소문자만 다르므로 함께 관리할 후보. |

### 게임 페이지: 진입 및 상태

| 문자열 | 용도 | 위치 | 비고 |
|---|---|---|---|
| `game loading...` | 게임 데이터 로딩 상태 | `frontend/src/pages/game-page/GamePage.tsx:21-23` | 게임 진행 전 상태 문구. |
| `game not found` | 게임이 없을 때 오류 | `frontend/src/pages/game-page/GamePage.tsx:25-29` | 현재는 초기 조회가 실패해도 상태 코드와 무관하게 이 문구가 표시될 수 있다. |
| `Game Page` | 화면 제목(시각적으로 숨김) | `frontend/src/pages/game-page/GamePage.tsx:35` | 스크린 리더/문서 구조용이므로 번역 대상이다. |

### 게임 페이지: 조작 안내 및 버튼

| 문자열 | 용도 | 위치 | 비고 |
|---|---|---|---|
| `game sidebar` | 왼쪽 사이드바 접근성 이름 | `frontend/src/components/left-panel/LeftPanel.tsx:35` | `aria-label`. |
| `Click the image and choose the target you found` | 찾기 시도 안내 | `frontend/src/components/left-panel/LeftPanel.tsx:37-39` | 조작 안내. |
| `Press Space key to drag the image` | 이미지 드래그 안내 | `frontend/src/components/left-panel/LeftPanel.tsx:40-42` | 키 이름 `Space`를 문장과 함께 현지화해야 한다. |
| `Press + or - keys buttons to Zoom in or out` | 확대/축소 단축키 안내 | `frontend/src/components/left-panel/LeftPanel.tsx:43-45` | `+`, `-` 기호는 유지하되 문장은 번역 대상이다. |
| `New Game` | 새 게임 버튼 | `frontend/src/components/left-panel/LeftPanel.tsx:49-54`; `frontend/src/components/result-dialog/ResultDialog.tsx:78-80` | 동일 동작/문구가 두 곳에 반복된다. |
| `Quit Game` | 게임 종료 버튼 | `frontend/src/components/left-panel/LeftPanel.tsx:55-60` | 버튼 문구. |
| `Zoom in` / `Zoom out` | 확대/축소 버튼 | `frontend/src/components/right-panel/RightPanel.tsx:21-26` | 서로 연관된 조작 문구로 묶을 수 있다. |
| `puzzle image` | 퍼즐 이미지 대체 텍스트 | `frontend/src/components/puzzle-board/PuzzleBoard.tsx:204-207` | 현재 이미지는 정적 import라 UI 고정 문자열로 분류했다. 향후 게임별 이미지가 API 콘텐츠가 되면 이미지 설명도 콘텐츠 데이터로 옮겨야 한다. |

### 찾기 시도 다이얼로그

다이얼로그 자체에 고정 제목이나 안내/성공/실패 문구는 없다. 버튼 텍스트는 모두 API에서 받은 `target.name`이며 **콘텐츠 데이터** 항목에서 다룬다.

- 로딩 중에는 대상 버튼이 비활성화될 뿐 별도 상태 문구가 없다: `frontend/src/components/attempt-dialog/AttemptDialog.tsx:56-61`.
- 정답/오답 결과도 `isAttemptValid` 응답을 화면 문구로 표시하지 않는다: `frontend/src/components/attempt-dialog/AttemptDialog.tsx:24-30`, `frontend/src/hooks/useAttempt.ts:24-27`.

따라서 현재 번역할 고정 문자열은 없지만, 나중에 다이얼로그 제목, 선택 안내, 시도 중, 정답/오답 피드백을 추가하면 모두 UI 번역 리소스 대상이다.

### 게임 결과 다이얼로그

| 문자열 | 용도 | 위치 | 비고 |
|---|---|---|---|
| `Game result` | 결과 다이얼로그 제목 및 접근성 이름 | `frontend/src/components/result-dialog/ResultDialog.tsx:49,52-54` | `aria-labelledby`가 이 제목을 참조한다. |
| `Record:` | 완료 기록 레이블 | `frontend/src/components/result-dialog/ResultDialog.tsx:55-59` | 뒤의 시간 값과 결합된다. |
| `player` | 플레이어 입력의 숨김 레이블 | `frontend/src/components/result-dialog/ResultDialog.tsx:63-65` | 접근성 이름이므로 번역 대상이다. |
| `Enter player name` | 플레이어 입력 placeholder | `frontend/src/components/result-dialog/ResultDialog.tsx:66-73` | placeholder. |
| `Submit` | 플레이어 이름 제출 버튼 | `frontend/src/components/result-dialog/ResultDialog.tsx:75` | 버튼 문구. |
| `New Game` | 새 게임 버튼 | `frontend/src/components/result-dialog/ResultDialog.tsx:78-80` | 왼쪽 패널과 중복. |
| `See leaderboard` | 리더보드 이동 링크 | `frontend/src/components/result-dialog/ResultDialog.tsx:85-87` | 랜딩 페이지의 `See Leaderboard`와 같은 의미. |

### 리더보드

| 문자열 | 용도 | 위치 | 비고 |
|---|---|---|---|
| `Loading...` | 리더보드 로딩 상태 | `frontend/src/pages/leaderboard-page/LeaderboardPage.tsx:19` | 게임 로딩 문구와 유사하지만 문맥이 다르다. |
| `Leaderboard` | 테이블 caption/화면 제목 | `frontend/src/pages/leaderboard-page/LeaderboardPage.tsx:22` | 스크린 리더가 테이블 이름으로도 사용한다. |
| `Ranking` | 순위 열 제목 | `frontend/src/pages/leaderboard-page/LeaderboardPage.tsx:29-32` | 테이블 헤더. |
| `Player` | 플레이어 열 제목 | `frontend/src/pages/leaderboard-page/LeaderboardPage.tsx:33-35` | 테이블 헤더. |
| `Record` | 기록 열 제목 | `frontend/src/pages/leaderboard-page/LeaderboardPage.tsx:36-38` | 결과 다이얼로그의 `Record:`와 같은 개념. |

빈 리더보드 전용 안내 문구는 현재 없다. 데이터가 없으면 1~10위의 빈 행만 표시된다.

### 프론트엔드에서 생성되어 노출되는 오류 문구

모든 API 훅이 HTTP 실패 시 같은 형식의 오류를 생성한다.

| 문자열 | 표시 경로 | 생성 위치 |
|---|---|---|
| `Server error: {status}` | 랜딩의 게임 생성 오류, 게임 화면의 조회/시도/삭제/새 게임 오류, 결과 다이얼로그의 플레이어/새 게임 오류, 리더보드 오류 | `frontend/src/hooks/useCreateGame.ts:18-20`; `useGame.ts:17-19`; `useAttempt.ts:24-26`; `usePlayer.ts:23-25`; `useDeleteGame.ts:21-23`; `useLeaderboard.ts:24-26` |

실제 렌더 위치는 다음과 같다.

- 랜딩 생성 오류: `frontend/src/pages/landing-page/LandingPage.tsx:28-30`
- 게임 조회 오류: `frontend/src/pages/game-page/GamePage.tsx:25-29,36`
- 찾기 시도 오류: `frontend/src/components/attempt-dialog/AttemptDialog.tsx:48-50`
- 삭제/새 게임 오류: `frontend/src/components/left-panel/LeftPanel.tsx:62-64`
- 플레이어 등록/새 게임 오류: `frontend/src/components/result-dialog/ResultDialog.tsx:81-83`
- 리더보드 오류: `frontend/src/pages/leaderboard-page/LeaderboardPage.tsx:58-66`

`Error.message`를 그대로 출력하는 구조이므로, 단순히 JSX 문자열만 옮기는 것으로는 오류 현지화가 끝나지 않는다. 현재의 고정 오류 템플릿은 번역 리소스에서 상태/문맥별 문구를 선택하는 방식이 필요하다.

### 백엔드 API의 고정 오류/validation 문구

다음은 API가 문자열로 보낼 수 있는 고정 메시지다. 성격상 사용자 피드백용 **UI 고정 문자열**이며 콘텐츠 데이터는 아니다.

| 문자열 | 위치 | 현재 프론트 노출 여부 |
|---|---|---|
| `Game not found` | `backend/src/repositories/game.repository.ts:46-48` | 직접 노출 안 됨 |
| `Record not found` | `backend/src/errors/recordNotFoundError.ts:3-5` | 기본값이나, 현재 게임 조회는 위의 구체 문구를 사용함 |
| `Bad request` | `backend/src/errors/badRequestError.ts:3-5` | 현재 확인한 게임 라우트에서는 직접 사용되지 않음 |
| `Internal Server Error` | `backend/src/errors/errorHandler.ts:23-26` | 직접 노출 안 됨 |
| `player must be present` | `backend/src/validates/player.validate.ts:6-10` | 직접 노출 안 됨 |
| `player must be 20 or less characaters` | `backend/src/validates/player.validate.ts:11-12` | 직접 노출 안 됨 |
| `player already in use` | `backend/src/validates/player.validate.ts:13-17` | 직접 노출 안 됨 |

현재 프론트 훅은 실패 응답의 JSON 본문을 파싱하지 않고 HTTP status로 새 `Error`를 만들기 때문에 위 서버 메시지는 화면에 그대로 나오지 않는다. 향후 서버 validation 내용을 표시하려면, 서버의 영어 문장을 그대로 번역 대상으로 삼기보다 안정적인 오류 코드/validation 식별자를 API가 보내고 프론트 번역 리소스에서 사용자 문구로 매핑하는 방식을 검토해야 한다. 이 문서에서는 key 구조를 설계하지 않는다.

---

## 2. 콘텐츠 데이터

### 찾을 대상 이름 (`Geek.name` / `game.targets[].name`)

현재 확인된 유일한 번역 필요 DB/API 콘텐츠다.

데이터 흐름:

`backend/src/lib/geeks.ts`의 영문 `name` → `backend/prisma/seed.ts:15-23`에서 `Geek` 테이블 저장 → `backend/src/repositories/game.repository.ts:35-54`에서 조회 → `backend/src/controllers/game.controller.ts:45-59`의 `GET /games/:gameId` 응답 → 프론트 `Game.targets[].name` (`frontend/src/types/game.types.ts:8-16`)

화면 노출 위치:

- 찾기 시도 다이얼로그의 대상 선택 버튼: `frontend/src/components/attempt-dialog/AttemptDialog.tsx:51-63`
- 오른쪽 패널의 전체 대상 목록/찾은 상태 목록: `frontend/src/components/right-panel/RightPanel.tsx:11-18`

현재 원본 데이터 16건은 `backend/src/lib/geeks.ts:1-131`에 있다.

1. `Geek in burgundy playing Super Mario` (`:4`)
2. `Geek in light green giving a presentation about binary to other geeks` (`:12`)
3. `Geek in blue looking into a portal` (`:21`)
4. `Geek in blue looking out through a portal` (`:29`)
5. `Geek in purple wearing a hat watching a robot battle` (`:37`)
6. `Geek in purple with blue hair bowling with beer bottles` (`:45`)
7. `Geek in white watching a beer-bottle bowling` (`:53`)
8. `Geek in a black top with a lambda symbol` (`:61`)
9. `Geek in a black T-shirt with a bagua symbol` (`:69`)
10. `Geek in light green sorting rubber balls by color` (`:77`)
11. `Geek in green watching another geek soldering` (`:85`)
12. `Geek in orange soldering a circuit board` (`:93`)
13. `Geek in pink cycling with AR glasses on` (`:101`)
14. `Geek in olive green working on a laptop in a ball pit` (`:109`)
15. `Geek taking a nap in a green sleeping bag` (`:117`)
16. `Geek in gray looking sad at a laptop` (`:125`)

현재 Prisma 모델은 `Geek.name String @unique` 한 필드만 가진다: `backend/prisma/schema.prisma:15-24`. 따라서 한국어를 추가하려면 단일 `name`을 번역 리소스로 옮기는 것만으로는 데이터의 언어별 표현을 저장/조회할 수 없다. 언어별 이름 컬럼/번역 테이블/별도 콘텐츠 번역 저장소, 또는 프론트에서 번역을 찾을 수 있는 안정적인 콘텐츠 식별자 중 하나가 필요하다.

### 번역하지 않을 API/DB 데이터

| 데이터 | 위치 | 판단 |
|---|---|---|
| 플레이어 이름 `game.player`, `leaderboard[].player` | `frontend/src/types/game.types.ts:3,32-36`; `backend/prisma/schema.prisma:26-35` | 사용자가 직접 입력한 고유 문자열이므로 번역하지 않는다. |
| 순위 `rank`, 기록 `record` | `frontend/src/types/game.types.ts:32-36` | 언어 콘텐츠가 아니라 숫자 데이터다. 표시 형식만 로케일 검토 대상이다. |
| 좌표/크기, `isFound`, ID, 날짜 | `frontend/src/types/game.types.ts:1-16`; `backend/prisma/schema.prisma:15-45` | UI 언어 콘텐츠가 아니다. |

### 현재 존재하지 않는 콘텐츠 항목

- 게임 제목/퍼즐 제목: DB 모델, 게임 API 응답, 프론트 타입에 없음.
- 게임 설명/스토리/힌트: 없음.
- 게임별 이미지 URL 및 이미지 설명: 없음. 퍼즐 이미지는 `frontend/src/components/puzzle-board/PuzzleBoard.tsx:1`에서 정적 자산으로 import한다.
- 리더보드에 서버가 내려주는 고정 설명/상태 문구: 없음. `rank`, `player`, `record`만 반환한다 (`backend/src/controllers/game.controller.ts:91-97`).

---

## 문자열 외 로케일 대응 확인 사항

번역 문자열은 아니지만 한글 i18n 적용 시 함께 확인해야 하는 항목이다.

| 항목 | 위치 | 확인 내용 |
|---|---|---|
| 문서 언어 `lang="en"` | `frontend/index.html:2` | 선택된 언어에 맞게 `ko` 등으로 반영할 필요가 있다. |
| 기록 표시 `HH:MM:SS.mmm` | `frontend/src/lib/formatRecord.ts:1-11`; `ResultDialog.tsx:55-59`; `LeaderboardPage.tsx:44-54` | 현재 고정 숫자 포맷이다. 한국어에서도 사용할 수 있지만, 언어별 시간 단위 문구나 로케일 포맷을 도입할지 정책 결정이 필요하다. |
| 외부 폰트 | `frontend/index.html:10-14` | 현재 불러오는 글꼴이 한글 글리프를 제공하는지 확인이 필요하다. 번역 문자열 자체는 아니다. |

## 전체 확인 결과

- 사용자에게 보이는 TSX 텍스트, 버튼, 링크, placeholder, `alt`, `aria-label`, visually hidden 텍스트를 확인했다.
- 랜딩, 게임 진행, 찾기 시도, 결과 다이얼로그, 리더보드의 로딩/오류 흐름을 확인했다.
- CSS의 `content:`로 생성되는 사용자 문구는 없다.
- API 응답 타입, 컨트롤러, repository, Prisma schema와 seed 원본까지 추적했다.
- 현재 게임 중 별도의 타이머 문구, 남은 대상 수 문구, 정답/오답 토스트, 성공 상태 문구는 없다. 찾은 대상은 오른쪽 목록의 스타일과 이미지 마커로만 표현된다.
- 따라서 현재 코드 기준 콘텐츠 데이터 번역의 핵심 누락 위험은 `Geek.name`이며, UI 고정 문자열의 핵심 누락 위험은 여러 훅에서 생성한 `Error.message`를 그대로 렌더링하는 경로다.
