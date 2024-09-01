# pokedex-reactNative
Initiation à React Native autour d'un projet fun : objectif création d'un Pokedex basé sur l'API PokeAPI. On suit la formation de Grafikart.

## Step by step

### Initialisation du projet

On commence par vérifier que nous sommes bien dans une version stable (LTS) de Node.js.
Pour cela ouvrir **PowerShell** et checker la version de node à l'aide de la commande `node -v`.
En version non-LTS beaucoup de problèmes s'ajoutent et rendent le développement complexe.
Il est possible et recommandé d'utiliser **fnm** (Fast Node Manager) afin de gérer vos versions de Node.
[**Téléchargement de Node**](https://nodejs.org/en/download/package-manager/current)

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

Sinon on peut se permettre de lancer la commande `npm run start --reset-cache` qui démarrera le serveur **Metro** et affichera un QR Code. Ce QR code sera à lire via l'application Expo Go (disponible sur Android et iOs) afin de visualiser le dév directement sur le smartphone.

L'app **Expo Go** (qui est elle-même une app en React Native) est capable d'émuler à distance le code présent dans notre projet.

### Installation de Android Studio

Il est intéressant de suivre ce [**step-by-step**](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated) fourni dans la documentation d'Expo.

Lors de l'installation d'**Android Studio** bien veiller à laisser coché l'option **Android Virtual Device** qui est l'option de virtualisation et donc qui nous intéresse.

**Android Studio** est un logiciel permettant la création de projet Android, nous ce qui nous intéresse est la partie virtualisation et donc nous devons cliquer sur **More actions** > **Virtual Device Manager**

On supprime le device enregistré par défaut et on choisis notre propre support de développememnt en cliquant sur **Create virtual device**.

Pour le projet nous allons choisir un **Pixel 7**.

Attention, lors de l'utilisation de ce genre de technologie il faut veiller à activer la **virtualisation de son processeur**.
Pour ce faire et en fonction du type de processeur dans la machine, il est possible de suivre le [guide autour de BlueStack](https://support.bluestacks.com/hc/fr-fr/articles/360058102252-Comment-activer-la-Virtualisation-VT-pour-BlueStacks-5-sur-Windows-10#:~:text=Pour%20les%20processeurs%20AMD,Enabled%22%20dans%20le%20menu%20d%C3%A9roulant.).

Une fois le device démarré, si la commande `npm run start --reset-cache` est toujours enclenché nous pouvons appuyer sur la touche `a` qui nous permet de lancer  l'émulation sur Android.

Il se peut qu'un message d'erreur apparaisse alors autour de la configuration de
**android.package**. Pour corriger ce problème nous devons ajouter les lignes suivantes dans le fichier de configuration **app.json**.

```
"android": {
  "package": "com.yourcompany.yourappname",
  "versionCode": 1
}
```

Une fois cela fait, un simple apppuie sur la touche `a` permet de relancer l'exécution. Un message indiquant alors le périphérique créé dans Android Studio devrait apparaitre.

> Opening exp://192.168.1.22:8081 on Pixel_7_API_35

### Passage en direct via le smartphone

Pour que cela fonctionne sur smartphone il faut ajouter la librairie **expo-dev-client** au projet via la commande `npm install expo-dev-client`.
Un appuie sur la touche `s` permettra de reload le QR Code qui deviendra alors fonctionnel sur l'app **Expo Go**.

Lors du démarrage l'app vous demande de choisir entre un **Development Build** ou **Expo Go**, choisir la deuxième option.

Il est possible de continuer à rencontrer une erreur lors du lancement de la simulation, pour cela faire le combo `s` puis `a` permet de bypass l'erreur.
Afin de la solutionner il faudrait créer un build EAS pour le projet. Voici le warning qui apparait :

> The expo-dev-client package is installed, but a development build is not installed on Pixel_7_API_35.
Launching in Expo Go. If you want to use a development build, you need to create and install one first.
Learn more: https://docs.expo.dev/development/build/

### Nettoyage du projet d'initialisation

Lorsque l'on créé un projet à l'aide d'Expo, une structure est générée automatiquement avec quelques pages.

Cette structure est basé sur le **router d'Expo**, on retrouve donc un dossier **app** à l'intérieur duquel nous retrouvons un dossier **(tabs)** qui est composé de 3 fichiers Typescript :
* _layout.tsx
* explore.tsx (qui correspond à la page Explore de l'app)
* index.tsx (qui correspond à la page d'accueil de l'app)

On aura aussi un dossier **components** qui va regrouper l'ensemble des composants développés pour notre application et un dossier **assets** qui regroupera les différents ressources utiles au bon fonctionnement de l'application.

Le fichier **app.json** est le fichier qui va contenir l'ensemble de la configuration de notre application, c'est un fichier très important pour la gestion de cette dernière.

Pour réinitialiser le projet nous allons exécuter la commande `npm run reset-project` qui aura pour objectif de déplacer le dossier **app** à l'intérieur d'un dossier **app-example** afin d'archiver les anciennes pages. Il faudra ensuite nettoyer les dossiers **assets**, **constants**, **hooks** et **components** (en les déplaçant dans le nouveau dossier **app-example** créé) si nous désirons repartir de zéro.

Il faut bien sur s'assurer que le projet n'est pas en cours de virtualisation, si c'est le cas (et sur Microsoft + VSC) appuyer sur le combo `Ctrl + C` afin de stopper le serveur Metro.
