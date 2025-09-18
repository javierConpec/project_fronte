# Etapa 1: build
FROM node:20-alpine AS build
WORKDIR /app

# Configuramos npm para que aguante reintentos y timeouts largos
RUN npm config set fetch-retries 5 \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2: runtime (solo lo necesario para preview)
FROM node:20-alpine
WORKDIR /app

# Configuración de npm igual que en build
RUN npm config set fetch-retries 5 \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000

# Copiamos solo el resultado del build y package.json
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

# Instalamos solo dependencias necesarias para preview
RUN npm ci --omit=dev

EXPOSE 4321
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
