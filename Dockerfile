# Utiliser une image Node.js officielle comme image de base
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier tout le reste des fichiers de l'application dans le répertoire de travail
COPY . .

# Exposer le port que l'application utilisera
EXPOSE 8080

# Démarrer l'application
CMD ["npm", "start"]
