# Imagen base oficial Node para ARM64
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .


# Construimos el frontend con las variables definidas
RUN npm run build

EXPOSE 4321

# Ejecutar preview escuchando en todas las interfaces
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
