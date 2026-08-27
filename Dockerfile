FROM node:20-alpine AS build-stage

WORKDIR /app

ARG NEXT_PUBLIC_API_BASE_URL=http://106.53.132.125
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

RUN npm config set registry https://registry.npmmirror.com/ \
  && npm install -g pnpm \
  && pnpm config set registry https://registry.npmmirror.com/

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile || pnpm install

COPY . .
RUN pnpm run build

FROM node:20-alpine AS production-stage

WORKDIR /app

ENV NODE_ENV=production

RUN npm config set registry https://registry.npmmirror.com/ \
  && npm install -g pnpm \
  && pnpm config set registry https://registry.npmmirror.com/

COPY --from=build-stage /app/package.json ./package.json
COPY --from=build-stage /app/pnpm-lock.yaml* ./
COPY --from=build-stage /app/.next ./.next
COPY --from=build-stage /app/public ./public
COPY --from=build-stage /app/node_modules ./node_modules

EXPOSE 3000

CMD ["pnpm", "start"]
