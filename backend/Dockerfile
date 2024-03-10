# meine erste Dockerfile

# wir definieren mit FROM das "base image" oder "parent image"
FROM node:18.18.0-alpine3.18

# arbeitsverzeichnis definieren - hier kommen alle apps hinein
WORKDIR /app

# copy package  (* = alles, was mit "package" anfängt und mit ".json" aufhört)
COPY package*.json ./

# mit RUN kann man shell befehle ausführen z. B. intall node modules and dependancies
RUN npm install

# den rest der app hinüber kopieren z.B. hier: alles im aktuellen Verzeichnis 
# . = lokal mein backend-verzeichnis (wo sich mein dockerfile gerade befindet)
# ./ = WORKDIR im image
COPY . ./

# Auf welchem Port läuft die App?
EXPOSE 3001

# env variablen definieren
ENV PORT=3001

# CMD um die App zu starten
CMD [ "npm", "start"]