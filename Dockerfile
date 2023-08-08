# Utilisez une image de base Node.js
FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tous les fichiers du répertoire actuel vers le répertoire de travail dans le conteneur
COPY . .

# Exposer le port 10001
EXPOSE 10001

# Démarrer l'application lorsque le conteneur est lancé
CMD ["node", "app.js"]
