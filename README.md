# Projet de Gestion des Annonces

Ce projet est une application web permettant de gérer et de visualiser des annonces classées par catégories. Les utilisateurs peuvent filtrer et trier les annonces selon différents critères.

## Prérequis

- Node.js
- npm ou yarn

## Installation

1. Clonez le dépôt :
    ```bash
    git clone https://github.com/votre-utilisateur/votre-projet.git
    cd votre-projet
    ```

2. Installez les dépendances :
    ```bash
    npm install
    ```
    ou
    ```bash
    yarn install
    ```

## Démarrage

Pour démarrer l'application en mode développement :
```bash
npm start

Composants
Category
Chaque fichier dans le dossier Category représente une catégorie d'annonces spécifique. Les composants suivants sont disponibles :

mode-femme.jsx : Affiche les annonces de la catégorie "mode-femme".
mode-homme.jsx : Affiche les annonces de la catégorie "mode-homme".
mode-enfant.jsx : Affiche les annonces de la catégorie "mode-enfant".
electronique.jsx : Affiche les annonces de la catégorie "electronique".
electromenager.jsx : Affiche les annonces de la catégorie "electromenager".
Chaque composant utilise les hooks useState et useEffect pour gérer l'état local et les effets secondaires. Les annonces peuvent être triées par date (récentes ou anciennes) et par prix (croissant ou décroissant).

Detail
Le composant detail.jsx affiche les détails d'une annonce spécifique lorsque l'utilisateur clique sur une annonce dans une des catégories.

Fonctionnalités
Filtrage : Les annonces sont filtrées par catégorie.
Tri : Les annonces peuvent être triées par date (récentes ou anciennes) et par prix (croissant ou décroissant).
Navigation : Les utilisateurs peuvent naviguer vers les détails d'une annonce en cliquant dessus.
Contribution
Les contributions sont les bienvenues ! Veuillez suivre les étapes suivantes pour contribuer :

Forkez le dépôt.
Créez une branche pour votre fonctionnalité (git checkout -b feature/ma-fonctionnalité).
Commitez vos modifications (git commit -am 'Ajoute ma fonctionnalité').
Poussez votre branche (git push origin feature/ma-fonctionnalité).
Créez une Pull Request.
Licence
Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.


Ce README fournit une vue d'ensemble
