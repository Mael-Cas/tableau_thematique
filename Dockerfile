# Utilisez une image de base Node.js
FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY api/package*.json ./api/

# Installer les dépendances pour le dossier api
RUN cd api && npm install

# Copier tous les fichiers du répertoire actuel vers le répertoire de travail dans le conteneur
COPY . .

# Exposer le port 10001
EXPOSE 10001

# Démarrer l'application lorsque le conteneur est lancé
CMD ["node", "app.js"]
