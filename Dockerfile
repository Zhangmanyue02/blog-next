FROM node:20-bookworm-slim AS build-stage

WORKDIR /app

ARG NEXT_PUBLIC_API_BASE_URL=http://alviny.me
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

RUN npm config set registry https://registry.npmmirror.com/ \
  && corepack enable \
  && corepack prepare pnpm@10.29.3 --activate \
  && pnpm config set registry https://registry.npmmirror.com/

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile || pnpm install

COPY . .
RUN pnpm run build

FROM node:20-bookworm-slim AS production-stage

WORKDIR /app

ENV NODE_ENV=production
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

RUN npm config set registry https://registry.npmmirror.com/ \
  && corepack enable \
  && corepack prepare pnpm@10.29.3 --activate \
  && pnpm config set registry https://registry.npmmirror.com/

COPY --from=build-stage /app/package.json ./package.json
COPY --from=build-stage /app/pnpm-lock.yaml* ./
COPY --from=build-stage /app/.next ./.next
COPY --from=build-stage /app/public ./public
COPY --from=build-stage /app/node_modules ./node_modules

EXPOSE 3000

CMD ["pnpm", "start"]
