# 빌드 스테이지
FROM node:18 AS builder
ARG appname
WORKDIR /app
COPY . .

# 루트 package.json 및 yarn.lock 복사
# COPY tsconfig.json package*.json yarn.lock nest-cli.json ./

# 공통 라이브러리 복사
# COPY libs/common ./libs/common
# COPY apps/${appname} ./apps/${appname}
# 의존성 설치
RUN yarn install --frozen-lockfile
# 빌드
RUN yarn build:${appname}
# 프로덕션 스테이지
FROM node:22-alpine
ARG appname
WORKDIR /app

# 빌드된 파일과 필요한 파일들만 복사
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist/apps/${appname} ./dist

# 환경 변수 설정
ENV NODE_ENV production

# 애플리케이션 실행
CMD node dist/main.js