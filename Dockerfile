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

# Le build sort dans /app/docs (config GitHub Pages).
# On determine le dossier contenant index.html et on le copie dans /dist-final.
RUN if [ -f /app/docs/index.html ]; then \
        cp -r /app/docs /dist-final; \
    elif [ -f /app/docs/browser/index.html ]; then \
        cp -r /app/docs/browser /dist-final; \
    elif [ -f /app/dist/first-app/browser/index.html ]; then \
        cp -r /app/dist/first-app/browser /dist-final; \
    else \
        echo "ERREUR: index.html introuvable" && find /app -name index.html && exit 1; \
    fi

# ===== Etape 2 : service via Nginx =====
FROM nginx:stable-alpine

# Config Nginx pour une SPA Angular (routes -> index.html)
COPY nginx-spa.conf /etc/nginx/conf.d/default.conf

# Le build Angular (dossier determine a l'etape precedente)
COPY --from=build /dist-final /usr/share/nginx/html

EXPOSE 80