FROM registry.gitlab.com/vigigloo/tools/pnpm:latest as build
ARG REGISTRY_TOKEN
WORKDIR /app
COPY package.json pnpm-lock.yaml .npmrc /app
RUN if [ -n "$REGISTRY_TOKEN" ]; then echo "//gitlab.com/api/v4/projects/19761904/packages/npm/:_authToken=$REGISTRY_TOKEN" >> .npmrc ; fi
RUN pnpm install --frozen-lockfile --prefer-offline
COPY . .
RUN npm run build

FROM gcr.io/distroless/nodejs:18
WORKDIR /app
COPY --from=build /app/.output /app/

EXPOSE 3000
ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["server/index.mjs"]
