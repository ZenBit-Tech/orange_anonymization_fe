# syntax=docker/dockerfile:1

# ---------- Stage 1: build ----------
FROM node:20-alpine AS build

WORKDIR /app

# Build-time configuration. Vite inlines `import.meta.env.VITE_*` at build,
# so the backend URL must be available before `npm run build`.
# Pass via `docker build --build-arg VITE_API_BASE_URL=...`.
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Stage 2: serve ----------
FROM nginx:alpine AS production

# Heroku injects $PORT at runtime; we render it into the config on startup.
RUN rm -f /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

CMD ["/bin/sh", "-c", "sed \"s/PORT_PLACEHOLDER/${PORT}/g\" /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
