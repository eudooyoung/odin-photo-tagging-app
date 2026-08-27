# Find Geeks

[한국어](#한국어) · [English](#english) · Live Demo: [Find Geeks](https://find-geeks.netlify.app/)

## 한국어

큰 이미지 속에서 지정된 인물 5명을 찾는 사진 태깅 게임입니다. 이미지를 클릭한 뒤 찾았다고 생각한 인물을 선택하며, 모든 인물을 찾는 데 걸린 시간으로 leaderboard 순위를 정합니다.

### 주요 기능

- 게임마다 16명의 후보 중 중복 없이 5명의 타깃을 무작위 선택
- 발견 전에는 타깃의 이름만 공개하고, 정답 좌표는 서버에서만 판정
- 클릭 위치를 보여 주는 attempt marker와 발견한 인물을 둘러싸는 target marker
- 버튼과 `+` / `-` 키를 이용한 이미지 확대·축소
- 마우스에서는 Space를 누른 채 드래그하고, 터치·펜 입력에서는 바로 드래그하여 확대된 이미지 탐색
- 화면 크기와 모바일 가로 방향에 맞춰 보드, 사이드 패널, 다이얼로그를 재배치하는 반응형 UI
- 게임 완료 시간 기록, 플레이어 이름 등록, 기록이 빠른 순서의 상위 10개 leaderboard
- 새 게임 시작, 진행 중인 게임 종료 및 24시간이 지난 미완료 게임 정리

### Tech Stack

#### Frontend

- React 19, React Router 8
- TypeScript, Vite 8
- CSS Modules, SVGR
- Vitest, Testing Library, jsdom

#### Backend

- Node.js, Express 5, TypeScript
- PostgreSQL, Prisma 7, `@prisma/adapter-pg`
- express-validator, CORS
- Vitest, Supertest

### 프로젝트 구조

```text
.
├── frontend/
│   ├── public/               # 정적 호스팅용 SPA redirect 설정
│   └── src/
│       ├── assets/           # 게임 이미지와 marker SVG
│       ├── components/       # 보드, 패널, 다이얼로그, marker
│       ├── hooks/            # API 요청과 상태 관리
│       ├── layouts/          # 공통 페이지 레이아웃
│       ├── lib/              # 좌표 변환, 기록 및 다이얼로그 계산
│       ├── pages/            # 랜딩, 게임, leaderboard
│       ├── routes/           # 브라우저 라우트
│       └── tests/            # 컴포넌트, 훅, 유틸리티 테스트
└── backend/
    ├── prisma/               # 스키마, migration, seed
    └── src/
        ├── controllers/      # 게임 요청 처리
        ├── middlewares/      # publicId 기반 게임 조회
        ├── repositories/     # Prisma 데이터 접근
        ├── lib/              # 타깃 데이터와 좌표 판정
        ├── routes/           # `/games` API 라우트
        └── tests/            # API와 게임 로직 테스트
```

### 게임 흐름

1. 랜딩 페이지에서 게임을 시작하면 서버가 16명 중 5명을 선택하고 UUID 형식의 `publicId`를 반환합니다. 새 게임 생성 시 생성 후 24시간이 지난 미완료 게임도 함께 삭제합니다.
2. 프론트엔드는 `/games/:gameId`에서 게임을 조회합니다. 아직 찾지 못한 타깃은 `id`와 `name`만 받고, 좌표와 크기는 받지 않습니다.
3. 이미지를 클릭하면 화면 좌표를 이미지의 원본 크기(2500×1775) 기준 좌표로 변환합니다. 클릭 지점에는 attempt marker가 표시되고, 다이얼로그에서 아직 찾지 못한 타깃 하나를 선택합니다.
4. 서버는 선택한 타깃의 사각 영역에 클릭 좌표가 포함되는지 확인합니다. 판정 범위는 `x <= clickX <= x + width`, `y <= clickY <= y + height`입니다.
5. 정답이면 해당 게임과 타깃의 `isFound`를 갱신합니다. 이후 응답부터 좌표와 크기가 공개되며, 프론트엔드는 타깃 영역의 중심에 손그림 원형 SVG marker를 표시합니다.
6. 5명을 모두 찾으면 서버가 `finishedAt`과 `finishedAt - createdAt`으로 계산한 밀리초 단위 `record`를 저장합니다.
7. 결과 다이얼로그에서 최대 20자의 고유한 플레이어 이름을 등록할 수 있습니다. Leaderboard는 완료된 게임을 기록 오름차순으로 최대 10개까지 보여 줍니다.

확대·축소는 이미지 wrapper 너비를 매번 1.1배로 변경합니다. 넘친 영역은 scroll viewport 안에서 드래그하며, marker 위치는 원본 이미지 좌표를 백분율로 변환하므로 확대와 화면 크기 변화에도 이미지 위의 같은 위치를 유지합니다.

### API 요약

모든 API의 기본 경로는 `/games`입니다.

| Method   | Path                      | 설명                                                      |
| -------- | ------------------------- | --------------------------------------------------------- |
| `POST`   | `/games`                  | 새 게임을 만들고 `{ publicId }` 반환                      |
| `GET`    | `/games/:gameId`          | 게임 상태와 공개 가능한 타깃 정보 조회                    |
| `POST`   | `/games/:gameId/attempts` | `{ targetId, x, y }`를 판정하고 `{ isAttemptValid }` 반환 |
| `PATCH`  | `/games/:gameId/player`   | `{ player }`로 플레이어 이름 등록                         |
| `DELETE` | `/games/:gameId`          | 게임 삭제                                                 |
| `GET`    | `/games/leaderboard`      | 순위, 플레이어 이름, 밀리초 기록을 포함한 상위 10개 조회  |

#### Database

- `Geek`: 인물의 이름과 원본 이미지 기준 `x`, `y`, `width`, `height`를 저장합니다. Seed에는 16명이 등록됩니다.
- `Game`: 내부 ID, 공개 UUID, 플레이어 이름, 생성·완료 시각과 기록을 저장합니다. 플레이어 이름은 고유값입니다.
- `GeeksOnGames`: `Game`과 `Geek`의 다대다 연결 및 게임별 `isFound` 상태를 저장합니다. 복합 기본 키를 사용하며 게임 삭제 시 함께 삭제됩니다.

### 로컬 실행 방법

PostgreSQL 데이터베이스와 Node.js가 필요합니다. 루트에는 통합 script가 없으므로 backend와 frontend에서 각각 명령을 실행합니다.

#### 1. Backend

```bash
cd backend
npm ci
```

`backend/.env`를 만들고 다음 값을 설정합니다.

```dotenv
PORT=3000
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<database>?schema=public"
TEST_DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<test_database>?schema=public"
```

`TEST_DATABASE_URL`은 테스트를 실행할 때만 필요합니다. 개발 데이터베이스를 준비하고 서버를 실행합니다.

```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

#### 2. Frontend

다른 터미널에서 실행합니다.

```bash
cd frontend
npm ci
```

`frontend/.env`에 backend 주소를 설정합니다.

```dotenv
VITE_API_BASE=http://localhost:3000
```

```bash
npm run dev
```

### 테스트

Frontend 테스트는 jsdom과 Testing Library로 페이지, 컴포넌트, API 훅, 좌표 및 다이얼로그 계산을 확인합니다.

```bash
cd frontend
npm test -- --run
```

Backend 테스트는 별도의 PostgreSQL 테스트 데이터베이스를 사용하며, API 통합 테스트 과정에서 `Game`과 `GeeksOnGames` 데이터를 정리합니다. 먼저 `backend/.env`의 `TEST_DATABASE_URL`에 migration과 seed를 적용합니다.

```bash
cd backend
NODE_ENV=test npx prisma migrate deploy
NODE_ENV=test npx prisma db seed
npm test -- --run
```

`npm test`만 실행하면 Vitest watch mode로 동작합니다.

### Build / Deployment

Frontend production build는 `frontend/dist`에 생성됩니다.

```bash
cd frontend
npm run build
npm run preview
```

Backend build는 Prisma Client를 생성한 뒤 TypeScript 결과를 `backend/dist`에 만들며, `npm start`로 빌드된 서버를 실행합니다. 배포 데이터베이스에는 migration과 seed를 별도로 적용해야 합니다.

```bash
cd backend
npm run build
npx prisma migrate deploy
npx prisma db seed
npm start
```

저장소에는 frontend의 모든 브라우저 경로를 `/index.html`로 보내는 `frontend/public/_redirects`가 포함되어 있어 이 형식을 지원하는 정적 호스팅에서 SPA routing을 유지할 수 있습니다. Backend용 플랫폼 설정 파일은 따로 없으므로 서버와 PostgreSQL을 별도로 배포하고, build 시 `VITE_API_BASE`를 해당 API 주소로 지정해야 합니다.

## English

Find Geeks is a photo-tagging game where the player searches a large image for five specified people. The player clicks the image, selects the person they believe they found, and is ranked on the leaderboard by the time taken to find all five targets.

### Features

- Selects 5 unique targets at random from a pool of 16 for each game
- Reveals only target names before they are found and validates target coordinates on the server
- Shows an attempt marker at the clicked position and a target marker around each discovered person
- Supports image zoom with buttons or the `+` / `-` keys
- Supports panning an enlarged image by holding Space while dragging with a mouse, or by dragging directly with touch and pen input
- Rearranges the board, side panels, and dialogs for different screen sizes and mobile landscape orientation
- Records completion time, accepts a player name, and displays the 10 fastest records on the leaderboard
- Supports starting a new game, quitting an active game, and cleaning up unfinished games older than 24 hours

### Tech Stack

#### Frontend

- React 19, React Router 8
- TypeScript, Vite 8
- CSS Modules, SVGR
- Vitest, Testing Library, jsdom

#### Backend

- Node.js, Express 5, TypeScript
- PostgreSQL, Prisma 7, `@prisma/adapter-pg`
- express-validator, CORS
- Vitest, Supertest

### Project Structure

```text
.
├── frontend/
│   ├── public/               # SPA redirect configuration for static hosting
│   └── src/
│       ├── assets/           # Game image and marker SVG
│       ├── components/       # Board, panels, dialogs, and markers
│       ├── hooks/            # API requests and state management
│       ├── layouts/          # Shared page layouts
│       ├── lib/              # Coordinates, record formatting, and dialog calculations
│       ├── pages/            # Landing, game, and leaderboard pages
│       ├── routes/           # Browser routes
│       └── tests/            # Component, hook, and utility tests
└── backend/
    ├── prisma/               # Schema, migrations, and seed data
    └── src/
        ├── controllers/      # Game request handlers
        ├── middlewares/      # Game lookup by publicId
        ├── repositories/     # Prisma data access
        ├── lib/              # Target data and coordinate validation
        ├── routes/           # `/games` API routes
        └── tests/            # API and game logic tests
```

### Game Flow

1. Starting a game from the landing page makes the server select 5 of the 16 targets and return a UUID `publicId`. When a new game is created, unfinished games older than 24 hours are also deleted.
2. The frontend fetches the game at `/games/:gameId`. Targets that have not been found include only `id` and `name`; their coordinates and dimensions are omitted.
3. Clicking the image converts the screen position into coordinates based on the original image size of 2500×1775. An attempt marker appears at that position, and the player selects one of the remaining targets from a dialog.
4. The server checks whether the click falls inside the selected target's rectangular area. The accepted range is `x <= clickX <= x + width` and `y <= clickY <= y + height`.
5. A correct attempt updates `isFound` for that game and target. Subsequent responses include the target's coordinates and dimensions, allowing the frontend to draw a hand-drawn circular SVG marker centered on the target area.
6. After all 5 targets are found, the server stores `finishedAt` and a millisecond `record` calculated as `finishedAt - createdAt`.
7. The result dialog accepts a unique player name of up to 20 characters. The leaderboard displays up to 10 completed games in ascending record order.

Zooming changes the image wrapper width by a factor of 1.1 each time. Overflow is explored by dragging within the scroll viewport. Marker coordinates are converted from original image coordinates to percentages, so they stay aligned with the image while zooming or resizing the screen.

### API Summary

All API endpoints use `/games` as their base path.

| Method   | Path                      | Description                                                                 |
| -------- | ------------------------- | --------------------------------------------------------------------------- |
| `POST`   | `/games`                  | Creates a game and returns `{ publicId }`                                   |
| `GET`    | `/games/:gameId`          | Returns game state and the target information that may be revealed          |
| `POST`   | `/games/:gameId/attempts` | Validates `{ targetId, x, y }` and returns `{ isAttemptValid }`             |
| `PATCH`  | `/games/:gameId/player`   | Registers a player name with `{ player }`                                   |
| `DELETE` | `/games/:gameId`          | Deletes a game                                                              |
| `GET`    | `/games/leaderboard`      | Returns up to 10 entries with rank, player name, and record in milliseconds |

#### Database

- `Geek`: Stores each person's name and original-image `x`, `y`, `width`, and `height`. The seed data contains 16 entries.
- `Game`: Stores an internal ID, public UUID, player name, creation and completion timestamps, and record. Player names are unique.
- `GeeksOnGames`: Stores the many-to-many relationship between `Game` and `Geek`, along with each game's `isFound` state. It uses a composite primary key and is deleted with its game.

### Local Development

PostgreSQL and Node.js are required. There is no shared script at the repository root, so the backend and frontend commands are run separately.

#### 1. Backend

```bash
cd backend
npm ci
```

Create `backend/.env` with the following values:

```dotenv
PORT=3000
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<database>?schema=public"
TEST_DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<test_database>?schema=public"
```

`TEST_DATABASE_URL` is only required when running tests. Prepare the development database and start the server:

```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

#### 2. Frontend

Run the following commands in another terminal:

```bash
cd frontend
npm ci
```

Set the backend URL in `frontend/.env`:

```dotenv
VITE_API_BASE=http://localhost:3000
```

```bash
npm run dev
```

### Tests

The frontend tests use jsdom and Testing Library to cover pages, components, API hooks, coordinate conversion, and dialog calculations.

```bash
cd frontend
npm test -- --run
```

The backend tests use a separate PostgreSQL test database and clear `Game` and `GeeksOnGames` data during API integration tests. Apply migrations and seed data to the `TEST_DATABASE_URL` configured in `backend/.env` first.

```bash
cd backend
NODE_ENV=test npx prisma migrate deploy
NODE_ENV=test npx prisma db seed
npm test -- --run
```

Running only `npm test` starts Vitest in watch mode.

### Build / Deployment

The frontend production build is written to `frontend/dist`.

```bash
cd frontend
npm run build
npm run preview
```

The backend build generates Prisma Client and writes the compiled TypeScript output to `backend/dist`. Run the built server with `npm start`. Database migrations and seed data must be applied separately in the deployment environment.

```bash
cd backend
npm run build
npx prisma migrate deploy
npx prisma db seed
npm start
```

The repository includes `frontend/public/_redirects`, which sends every frontend browser route to `/index.html` so SPA routing works on static hosts that support this format. There is no platform-specific backend configuration file, so the server and PostgreSQL database must be deployed separately, with `VITE_API_BASE` set to the deployed API URL at build time.

## Assets / Credits

- Game image: [Wimmelbild mit Koordinaten](https://commons.wikimedia.org/wiki/File:31c3-Wimmelbild_mit_Koordinaten.png)
- Hand-drawn circle SVG: [Handwritten circle in yellow](https://freesvg.org/handwritten-circle-in-yellow)
