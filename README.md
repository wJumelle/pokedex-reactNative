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

### Installation de Android Studio

Lors de l'installation d'**Android Studio** bien veiller à laisser coché l'option **Android Virtual Device** qui est l'option de virtualisation et donc qui nous intéresse.

**Android Studio** est un logiciel permettant la création de projet Android, nous ce qui nous intéresse est la partie virtualisation et donc nous devons cliquer sur **More actions** > **Virtual Device Manager**

On supprime le device enregistré par défaut et on choisis notre propre support de développememnt en cliquant sur **Create virtual device**.

Pour le projet nous allons choisir un **Pixel 7**.

Attention, lors de l'utilisation de ce genre de technologie il faut veiller à activer la **virtualisation de son processeur**.
Pour ce faire et en fonction du type de processeur dans la machine, il est possible de suivre le [guide autour de BlueStack](https://support.bluestacks.com/hc/fr-fr/articles/360058102252-Comment-activer-la-Virtualisation-VT-pour-BlueStacks-5-sur-Windows-10#:~:text=Pour%20les%20processeurs%20AMD,Enabled%22%20dans%20le%20menu%20d%C3%A9roulant.).

Une fois le device démarré, si la commande `npm run start` est toujours enclenché nous pouvons appuyer sur la touche `a` qui nous permet de lancer  l'émulation sur Android.

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
