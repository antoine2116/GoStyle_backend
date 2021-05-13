# API GoStyle (Node JS)

## Instructions d'installation

1. Installation des packages: `npm install`
1. Crée la base de données nommée :  `gostyle`
1. Modifier la configuration de connexion à la base de données dans : `app/config/database.js`
1. Lancer le serveur: `node server.js`
1. API accessible à l'adresse : `http://localhost:8080`

## Endpoints

### Authentifcation

- #### `POST /signup`: Création d'un utilisateur
    Paramètres : username, password

- #### `POST /login`: Connexion
    Paramètres : username, password

- #### `GET /logout`: Déconnexion
    Paramètres : aucun 

- #### `GET /profile`: Obtenir l'utilisateur connecté
    Paramètres : aucun

### Coupons

- #### `GET /couponsUtilisateurs`: Liste des coupons de l'utilisateur
  Paramètres : aucun

- #### `GET /checkCoupon`: Vérifie si le coupon existe, si oui, l'ajoute à la liste de l'utilisateur
  Paramètres : qrCode

- #### `GET /coupon`: Détails d'un coupon
  Paramètres : id (coupon)