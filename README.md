# Web Art-thérapie

[GitHub - ZEDIUM-Off/WebArtTherapy](https://github.com/ZEDIUM-Off/WebArtTherapy)

[![GitHub latest commit](https://badgen.net/github/last-commit/ZEDIUM-Off/WebArtTherapy/main)](https://github.com/ZEDIUM-Off/WebArtTherapy/commit/main)
![Main Language](https://badgen.net/badge/icon/typescript?icon=typescript&label)
## Description :

Ce projet est une démonstration de ce que pourrait être l’art thérapie numérique selon l’art thérapeute **Cécile CHENAVAS**.

> *La rencontre avec l’éphémère est une forme de réactualisation de l’expérience subjectivante, pouvant faire écho à l’état de virtualité que nous avons évoqué précédemment.
C’est un espace-temps en rupture avec la vie ordinaire, un passage à la transformation. Une transformation pour permettre au sujet d’apporter un regard nouveau sur sa façon d’interpréter le monde, et d’anticiper de nouvelles manières d’exister. Par son caractère évanescent le numérique est en rupture avec la matière, et tout comme le dispositif art thérapeutique traditionnel, il ne cède pas à la durabilité, ni à la permanence. Il est de l’ordre de la discontinuité, et ouvre à une expérience nouvelle, non orientée vers la production.
Il m’est apparu ainsi possible d’envisager un support numérique à l’outil de l’art-thérapeute.  
***Cécile CHENAVAS.***
> 

Afin de permettre à toutes et tous de saisir ce que pourrait être une forme d’art thérapie numérique, j’ai commencé le développement d’une démonstration fonctionnant sur navigateur.

---
## Principe :

Grace à la webcam de votre ordinateur liée à celle d’un smartphone (obligatoirement nécessaire pour le fonctionnement de l’expérience), vous pourrez interagir avec un environnement 3D éphémère.  

## Technologies utilisée :


- Tracking de mains en temps réel : [Mediapipe Hands](https://github.com/google/mediapipe).
- Environnement 3D : [BabylonJS](https://github.com/BabylonJS/Babylon.js).
- Backend : [NestJS](https://github.com/nestjs/nest).

## Installation :


```bash
git clone https://github.com/ZEDIUM-Off/WebArtTherapy.git
cd .\WebArtTherapy\
npm install
```

## Lancer l’application :


```bash
npm run build        #construire les fichier .js
npm run start:dev    #watch mode
```
---