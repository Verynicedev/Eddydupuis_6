# Hot Takes

## *Projet de formation n°6 du parcours Développeur Web - Openclassrooms*
### Construisez une API sécurisée pour une application web de critiques de sauces piquantes.

-----------------

## Mission

Réaliser le MVP backend d'une application d’évaluation des sauces piquantes de *Hot Takes*.

* Implémenter un modèle logique de données conformément à la réglementation.
* Mettre en œuvre des opérations CRUD de manière sécurisée.
* Stocker des données de manière sécurisée.

***

## :wrench: Prérequis

### 1. Installation

Use **node version 14.0** 

:file_folder: **frontend** :

* frameworks : <kbd>**angular version 7.0.2**</kbd> / <kbd>**node-sass version 4.14.1**</kbd>


:file_folder: **backend** :

* frameworks :  <kbd>**Express**</kbd>
* packages : <kbd>**mongoose**</kbd> / <kbd>**mongoose-unique-validator**</kbd> / <kbd>**bcrypt**</kbd> / <kbd>**body-parser**</kbd> / <kbd>**jsonwebtoken**</kbd> / <kbd>**multer**</kbd>
* modules: <kbd>**dotenv**</kbd>

> Sur Windows, ces installations nécessitent d'utiliser PowerShell en tant qu'administrateur.

dans les deux dossiers pour une installation rapide :
```
npm install
```

### 2. Paramétrer dotenv

Créer un fichier <kbd> :page_facing_up: .env </kbd> dans le dossier <kbd> :file_folder: backend </kbd> & Changer les variables d’environnement

[See the sample](/backend/.env_sample)

```
Créer un fichier .env 
Mettre ce code ci dessous et remplacer INFO_DE_CONNEXION par les vôtres

MONGO_ENV = "mongodb+srv://INFO_DE_CONNEXION@cluster0.dmrqb.mongodb.net/Cluster0?retryWrites=true&w=majority"

Dans ce même fichier 
Mettre ce code ci dessous et remplacer CODE TOKEN_SECRET par le token de votre choix

TOKEN_SECRET = "CODE TOKEN_SECRET"```

### 3. Lancer le projet

Dans le dossier <kbd> :file_folder: frontend </kbd>
- Lancer le serveur front : `npm run start`

Dans le dossier <kbd> :file_folder: backend </kbd>
- Lancer le serveur back : `nodemon server`

## :package: Made with

* Javascript 
    * Express
* Database : MongoDb
* VsCode

## Auteur

Verynicedev - Eddy DUPUIS - 2022

