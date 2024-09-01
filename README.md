# pokedex-reactNative
Initiation à React Native autour d'un projet fun : objectif création d'un Pokedex basé sur l'API PokeAPI. On suit la formation de Grafikart.

## Step by step

### Initialisation du projet

On initialise le projet grace au framework **Expo** qui va nous permettre d'ajouter tout un tas d'outil basique
pour le développement d'api native. Il intègre une solution de test sur un smartphone, des routers etc.

```
npx create-expo-app@latest
```

Une fois le projet initialisé nous pouvons bundler le projet à l'aide des commandes suivantes, en fonction de l'environnement de prévisualisation choisis :
* `npm run android`
* `npm run ios`
* `npm run web`

Cela nécessite d'avoir un émulateur de lancé sur notre environnement de développement.

Pour le développement sous Android nous avons donc [**Android Studio**](https://developer.android.com/studio?hl=fr) et pour le développement pour iOs nous avons l'émulateur [**XCode**](https://developer.apple.com/xcode/) qui n'est disponible que sur l'environnement Apple (lel).

Sinon on peut se permettre de lancer la commande `npm run start` qui démarrera le serveur **Metro** et affichera un QR Code. Ce QR code sera à lire via l'application Expo Go (disponible sur Android et iOs) afin de visualiser le dév directement sur le smartphone.

L'app **Expo Go** (qui est elle-même une app en React Native) est capable d'émuler à distance le code présent dans notre projet.
