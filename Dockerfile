# ===== Etape 1 : build Angular =====
# Node 20 LTS (stable, compatible Angular 19), existe en arm64 pour le DS218.
FROM node:20-alpine AS build

WORKDIR /app

# Dependances d'abord (cache Docker : refait seulement si package.json change)
COPY package*.json ./
RUN npm install

# Puis le code, et build de production
COPY . .
RUN npm run build -- --configuration production

# ===== Etape 2 : service via Nginx =====
FROM nginx:stable-alpine

# Config Nginx pour une SPA Angular (routes -> index.html)
COPY nginx-spa.conf /etc/nginx/conf.d/default.conf

# Le build Angular sort dans dist/first-app/browser (cf angular.json)
COPY --from=build /app/dist/first-app/browser /usr/share/nginx/html

EXPOSE 80