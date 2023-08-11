FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY api/package*.json ./api/

# Installer les dépendances pour le dossier api
RUN cd api && npm install

RUN cd /app

# Copier tous les fichiers du répertoire actuel vers le répertoire de travail dans le conteneur
#copy api/* ./api/
COPY . .

# Exposer le port 10001
EXPOSE 10001


# Démarrer l'application lorsque le conteneur est lancé
CMD ["node", "api/index.js"]
