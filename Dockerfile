# Stage 1: Build Angular app
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

# Stage 2: Runtime image
FROM node:20-alpine AS runtime

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --production

COPY --from=build /app/dist/deploy-project-app ./dist/deploy-project-app
COPY --from=build /app/server ./server
COPY --from=build /app/.env ./

EXPOSE 3000

CMD ["node", "server/app.js"]