FROM node:20.14.0 AS build-stage
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN npm run build


FROM node:20.14.0 AS production-stage
WORKDIR /app

COPY --from=build-stage /app/.output /app/.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
