# pokedex-reactNative
Initiation à React Native autour d'un projet fun : objectif création d'un Pokedex basé sur l'API PokeAPI. On suit la vidéo découverte de React Native de [**Grafikart**](https://www.youtube.com/watch?v=0EOucUY_F0c&t=351s).

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

Il est possible de continuer à rencontrer une erreur lors du lancement de la simulation, pour cela faire le combo `s` puis `a` permet de bypass l'erreur en passant par **Expo Go**.
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

### 01 - Stylisation des composants

Pour styliser des composants nous passerons par l'attribut **style** au niveau des composants.
Cet attribut attends un objet contenant des paramètres CSS.

Pour simplifier la lecture de nos composants, une bonne pratique est de déclarer à l'extérieur du composant une constante **styles** contenant la définition de tous les
styles de la page.
Au niveau de la complétion nous allons passer par une classe **StyleSheet** et sa méthode **create** afin d'avoir de l'aide lors de la saisie.

```
[...]
<View style={styles.container}>
  <Text>Test.</Text>
</View>
[...]

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF0000',
    padding: 24
  }
});
```

### 01 - Fichier Layout

Si on observe notre fichier **./app/_layout.tsx** on peut voir que c'est une
**Stack**.

Dans le fichier d'exemple, on peut voir que le projet était monté avec un système de stack mais aussi d'onglet **Tabs**. C'est pour cette raison que l'on retrouvait nos pages dans le dossier **(tabs)**.
Dans le cas de cet exercice nous allons simplement utiliser le système de stack sans une navigation par onglet, raison pour laquelle ce dossier a été lui aussi supprimé.

Le sous-élément `<Stack.Screen name="index" />` de l'élément `<Stack>`, présent dans l'exemple, permet de spécifier des particularités pour chaque écrans en y ajoutant des [**options**](https://reactnavigation.org/docs/native-stack-navigator#options).

Lorsque l'on créé une page, une route va être immédiatement créé par le **router Expo** sans que l'on ait besoin de faire quoi que ce soit. Ainsi, si on utilise un élément `<Link href="" /></Link>` nous aurons à renseigner le nom du fichier de la page préfixé d'un '/'.

Dans notre cas de figure nous allons jouer avec l'id des pokemons pour créer des routes. Pour se faire nous pouvons créer un dossier **./app/pokemons** dans lequel nous allons créer un fichier **[id].tsx**.

Au niveau du fichier **[id].tsx** nous allons nous servir du hook de Expo-router : **useLocalSearchParams**. Ce hook va nous permettre de récupérer
les paramètres compris dans notre URL.

Au niveau du fichier **index.tsx** nous pouvons écrire les liens de deux façons différentes :
```
<Link href="/pokemons/25">Pikachu</Link>
<Link href={{pathname: '/pokemons[id]', params: {id: 25}}}>Pikachu</Link>
```

Au niveau du fichier **_layout.tsx** nous ne pouvons malheureusement pas styliser la barre de titrage de l'app (cette dernière affiche le titre de la vue), cependant grace à des options nous pouvons informer React que nous souhaitons la masquer.
```
export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    />
  );
}
```

Cela a un impact, c'est que l'espace alloué à la zone du titre est maintenant utilisé pour afficher le design de notre app et donc ce dernier passe sous les éléments de
l'UI (ou l'appareil photo) du téléphone. Pour contrer cela nous allons devoir changer l'élément `<View />` en élément `<SafeAreaView />` à l'intérieur du fichier **index.tsx**. Ce qui va ajouter automatiquement des padding à notre vue pour que la lisibilité soit optimale.

Les Vues dans React Native fonctionne comme des éléments en **display flex**, pour faire en sorte que notre App occupe donc 100% de l'espace visible en hauteur de notre périphérique il suffit donc d'utiliser la propriétés `flex: 1`.

### 02 - Traduction du design system

Pour cela nous allons créer un nouveau dossier **components** à la racine de notre projet, à l'intérieur duquel nous allons créer le fichier **ThemedText.tsx**.
Ce nouveau composant va nous permettre de créer les différents styles de texte dont nous avons besoin pour l'app.

A l'intérieur de ce dernier nous allons définir des **Props** à l'aide de Typescript. Lorsque les **Props** ne sont pas obligatoire (par exemple car on a définit une valeur par défault) on peut faire suivre son nom d'un **?**.

```
type Props = {
  variant?: string,
  color?: string
}
```

Maintenant si nous souhaitons ajouter les propriétés par défaut le l'élément `<Text />` de React native nous pouvons les définir de la façon suivante.
Ci-dessous on hérite des **Props** de React native et on définit les deux qui vont nous intéresser.
```
type Props = TextProps & {
  variant?: string,
  color?: string
}
```

Au niveau du composant `<ThemedText />` nous allons passer les **Props** de cette manière. Ici **...rest** correspond l'ensemble des Props héritées de
`<Text />`.
```
function ThemedText({variant, color, ...rest}: Props) {
  return <Text {...rest} />
}
```

Maintenant si l'on regarde le Design System (page Style Guide) nous allons trouver tous les styles de texte qui nous intéresse.
Ces styles de textes nous allons les définir à l'aide de la méthode **StyleSheet.create()** de React Native.
Ce sont ces styles que nous allons ensuite passer en props à l'aide de `variant?: keyof typeof styles` au niveau de la définition des Props.
```
const styles = StyleSheet.create({
  headline: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold"
  },
  [...],
  caption: {
    fontSize: 8,
    lineHeight: 12
  }
});
```

Au niveau du composant nous obtenons donc ceci, avec **body3** la valeur par défaut de nos textes stylisés.
```
// Composant ThemedText
function ThemedText({variant, color, ...rest}: Props) {
  return <Text style={styles[variant ?? 'body3']} {...rest} />
}

// Utilisation du composant dans le fichier **index.tsx**
<ThemedText variant="headline">Pokedex</ThemedText>
```

Nous faisons maintenant les mêmes choses pour les couleurs. Et là, ça se corse car pour les téléphones nous avons la possibilité d'être en **dark/lightmode**.
Nous devons donc prendre en considération cette option.
Nous allons donc créer un nouveau dossier **constants** à la racine du projet à l'intérieur duquel nous allons définir le fichier **Colors.ts**.

A l'intérieur de ce fichier nous allons exporter une grosse constante **Colors** qui contiendra deux clés qui auront le même nombre de propriétés (**light** et **dark**) et surtout où l'on pourra retrouver à chaque fois des propriétés portant le même nom !
Si aucune différence n'est précisé entre le light / dark mode alors **nous devons définir deux fois les mêmes couleurs**.
Un troisième clé nous permettra de définir les couleurs des types de pokémons, ces couleurs ne devant pas varier en fonction du mode elles sont définis en dehors des deux premières.
```
export const Colors = {
  light: {
    tint: "#DC0A2D",
    grayDark: "#212121",
    grayMedium: "#666666",
    grayLight: "#E0E0E0",
    grayBackground: "#EFEFEF",
    white: "#FFFFFF"
  },
  dark: {
    tint: "#DC0A2D",
    grayDark: "#212121",
    grayMedium: "#666666",
    grayLight: "#E0E0E0",
    grayBackground: "#EFEFEF",
    white: "#FFFFFF"
  },
  types: {
    bug: "#A7B723",
    dark: "#75574C",
    [...]
  }
}

```

Au niveau de l'app, pour aller automatiquement chercher la couleur que l'on souhaite entre le thème **light** ou le thème **dark** nous aurons besoin d'un hook.
Nous créons donc un nouveau dossier **hooks** à la racine du projet, dans lequel nous créons le fichier **useThemeColors.ts**.

Dans ce fichier nous allons utiliser le hook **useColorScheme()** qui va nous donner l'information de la configuration de l'utilisateur (soit light soit dark).
Si nous ne recevons aucune donnée nous pouvons définir une valeur par défaut `const theme = useColorScheme() ?? "light";`, ici **light**.

Nous obtenons ainsi le hook suivant qui retourne les couleurs en fonction du thème de l'utilisateur.
```
// Fichier ./hooks/useThemeColors.ts
function useThemeColors() {
  const theme = useColorScheme() ?? "light";
  return Colors[theme];
}

// Fichier ./app/index.tsx, on vient définir la props **color**
export default function Index() {
  return (
    [...]
      <ThemedText variant="headline" color="grayWhite">Pokedex</ThemedText>
    [...]
  );
}
```

Toutes ces modifications entrainent des changements obligatoires du coté du fichier du composant **ThemedText.tsx**.

```
// Au niveau des Props nous allons indiquer qu'il s'agit d'un string qui est attendu à l'aide du combo keyof typeof autours
// de la constante définit dans le projet, on prend par défaut "light" afin d'entrer dans l'une des deux possibilité pour paramétrer
// la props
type Props = TextProps & {
  variant?: keyof typeof styles,
  color?: keyof typeof Colors['light']
}

function ThemedText({variant, color, ...rest}: Props) {
  // On récupère les couleurs définit dans le fichier de constantes Colors en fonction du thème dark ou light de l'utilisateur
  const colors = useThemeColors();

  // On retourne le texte stylisé à l'aide d'un tableau contenant les styles de texte
  // Et les styles de couleurs
  return <Text style={[ styles[variant ?? 'body3'], {color: colors[color ?? "grayDark"]} ]} {...rest} />
}
```

Nous pouvons même faire évoluer la vue dans le fichier **index.tsx** en passant la couleur **tint** en paramètre à la vue.
De la même façon que pour l'élément `<Text />` retourné ci-dessous nous allons éditer l'attribut style en passant de `<SafeAreaView style={styles.container}>` à `<SafeAreaView style={[styles.container, {backgroundColor: colors.tint}]}>`.
Nous créons un tableau dans lequel nous passons en premier élément les styles définit pour le container et en deuxième élément un objet contenant la personnalisation du background de notre composant `<SafeAreaView />`.
```
export default function Index() {
  const colors = useThemeColors();

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.tint}]}>
      <ThemedText variant="headline" color="grayWhite">Pokedex</ThemedText>
      <Link href="/about">About</Link>
      <Link href="/pokemons/25">Pikachu</Link>
      <Link href={{pathname: '/pokemons/[id]', params: {id: 25}}}>Pikachu</Link>
    </SafeAreaView>
  );
}
```

### 02 - Création des cards

Pour la créaion du composant **Card** on va modifier le code présent sur **index.tsx** afin d'intégrer `<ThemedText />` à l'intérieur du nouveau composant.
Ce nouveau composant possédera des **Props** qui nous permettront de passer les styles mais aussi d'hériter des Props de  **ViewProps**.

```
type Props = ViewProps;

function Card({style, ...rest}: Props) {
  return (
    <View style={[style, styles]} {...rest} />
  )
}

const styles = {
  backgroundColor: "#FFF",
  borderRadius: 8,
} satisfies ViewStyle
```

On va s'attarder sur le passage `satisfies ViewStyle`, ce petit bout de code permet d'indiquer à l'IDE que l'on cherche à obtenir une
vérification du code en fonction de ce qu'il connait autour de **ViewStyle**.
Ainsi, si l'on rate l'écriture d'une propriété CSS, alors cette dernière sera souligné en rouge.

Nouveau problème, si l'on se réfère à la documentation autour des [**shadow-props**](https://reactnative.dev/docs/shadow-props#props) pour gérer les ombres portées dans React Native nous avons deux façon de faire, une pour iOs et une pour Android.
Afin de gérer les deux cas de figure nous allons devoir créer un nouveau fichier de constantes **Shadows.ts**.

* [**Shadow Props**](https://reactnative.dev/docs/shadow-props#props) pour iOs
* [**elevation View Style Props**](https://reactnative.dev/docs/view-style-props#elevation-android) pour Android

```
// Fichier ./constants/Shadows.ts
import { ViewStyle } from "react-native";

export const Shadows = {
  dp2: {
    shadowColor: '#000',
    shadowOpacity: 0.2, //iOs
    shadowOffset: {width: 0, height: 1}, //iOs
    shadowRadius: 3, //iOs
    elevation: 2 //Android
  }
} satisfies Record<string, ViewStyle>

// Fichier Card.tsx
const styles = {
  backgroundColor: "#FFF",
  borderRadius: 8,
  ...Shadows.dp2
} satisfies ViewStyle
```

### 02 - Création de la page de listing de tous les pokémons

#### 02 - Mise en place du body

> ❗ React Native n'aime pas les fichiers au format .svg. Pour cet exercice nous allons donc utiliser exclusivement des .png.
> Pour Android il n'aime pas non plus les ombres portées vers l'intérieur, nous ne pouvons donc réaliser l'effet du body dans la section listing.

Pour charger une image dans React Native il existe un composant [`<Image />`]((https://reactnative.dev/docs/image)). A l'intérieur de ce composant nous retrouvons
un attribut **source** qui nous permet d'effectuer un **require** de notre élément présent en local dans notre projet `<Image source={require("@/assets/images/pokeball-white.png")} style={styles.tinyLogo} />`.
Comme toujours nous pouvons spécifier un attribut **style** afin de lui définir des proprpiétés CSS.
Le **@** devant le début du chemin est l'écriture qui permet de cibler un élément en local.

Pour le listing nous allons nous servir d'un composant qui existe déjà dans React Native, les [**FlatList**](https://reactnative.dev/docs/flatlist).
Ce composant est directement géré par le système d'exploitation qui exécutera notre code, ce qui permet de grandement optimiser l'application.

Pour débuter la mise en place de l'affichage de la liste des pokémons nous allons simuler un faux tableau de pokemon, avant de réaaliser la connexion en API.
Nous créons donc un tableau en précisant la taille voulu en référence `{length: 35}` puis nous passons une fonction qui permettra de prendre l'index du pokémon en référence.
```
const pokemons = Array.from({length: 35}, (_, index) => ({
  name: 'Pokemon name',
  id: index + 1
}));
```

Au niveau du composant `<FlatList />` que l'on intègre à la `<Card />` nous retrouvons deux attributs différents : **data** et **renderItem**.
**data** prend en entrée un tableau, ici ce sera notre tableau de pokémons.
**renderItem** prend en entrée une fonction qui parcours l'ensemble des **items** afin d'en créer les éléments du react DOM.
A l'intérieur de **renderItem** nous pouvons voir l'usage de [**keyExtractor**](https://reactnative.dev/docs/sectionlist#keyextractor) qui permet d'utiliser l'id du pokemon en tant que clé de l'élément de la liste. **keyExtractor** attend une chaine de caractère donc nous transformons l'id de pokémon en string à l'aide de la fonction **toString()**.

Pour coller à la maquette, nous pouvons ajouter l'attribut **numColumns** afin d'indiquer que l'on souhaite afficher notre liste sur 3 colonnes. Cette modification génère une erreur, ce n'est pas une modification qui peut se faire de manière dynamique avec l'autoreload d'activé sur les apps. Il faut donc recharger les apps !

On se sert des attributs **contentContainerStyle** et **columnWrapperStyle** afin de gérer les gap entre les cards des pokémons.
**contentContainerStyle** nous permet aussi de préciser le padding autour du container.
```
<FlatList
  data={pokemons}
  numColumns={3}
  contentContainerStyle={[styles.gridGap, styles.grid]}
  columnWrapperStyle={styles.gridGap}
  renderItem={({item}) => <Card style={{flex: 1/3}}>
  <Text>{item.name}</Text>
  </Card>} keyExtractor={(item) => item.id.toString()}
/>
```

#### 03 - Mise en place du composant pour l'affichage des pokémons dans la liste

Création du composant `<PokemonCard />` qui va reposer autour de 3 props : **id**, **name** et **style**.
**Style** étant une props optionnelle.

```
type Props = {
  style?: ViewStyle,
  id: number,
  name: string
}

function PokemonCard({style, id, name}: Props) {
  const colors = useThemeColors();

  return <Card style={[style, styles.cardPokemon]}>
    <ThemedText variant="caption" color="grayMedium" style={{alignSelf: 'flex-end'}}>#{id.toString().padStart(3, '0')}</ThemedText>
    <Image source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}} style={styles.imgPokemon} />
    <ThemedText color="grayDark">{name}</ThemedText>
    <View style={[styles.boxShadow, {backgroundColor: colors.grayBackground}]} />
  </Card>
}
```

Dans ce composant nous utilisons l'API **pokeapi** pour récupérer les images avec l'aide de l'attribut **id** pour rendre dynamique le fichier.
Maintenant nous avons conçu la liste de pokémon en fonction d'un tableau, il faudrait maintenant la rendre dynamique en attaquant l'API.

Pour gérer cet appel nous allons utiliser **fetch** mais surtout la librairie [**React query**](https://tanstack.com/query/latest) (qui permet de gérer le cache etc).
Au niveau de l'API nous allons call l'URL `https://pokeapi.co/api/v2/pokemon?limit=21`, la limite de 21 provient du fait de faire 7 lignes de 3.

Il est déconseillé généralement d'utiliser directement une librairie, nous allons donc créer un hook **useFetchQuery** qui utilisera cette librairie.
La librairie utilise une méthode **useQuery** qui prend en entrée deux paramètres **queryKey**, qui nous permettra de gérer notamment le cache pour ne pas effectuer plusieurs fois le même appel, et **queryFn** une fonction asynchrone à l'intérieur de laquelle on va simuler un waiting screen et l'appel de **fetch**.
```
function useFetchQuery(path: string) {
  return useQuery({
    queryKey: [path],
    queryFn: async () => {
      // La fonction est un timer qui va nous permettre de simuler un périphèrique ou une connexion lente
      await wait(1);

      // Une fois le timer passer on retourne le résultat de l'appel API
      return fetch(endpoint + path).then(r => r.json())
    }
  })
}
```

Au niveau de la page **Index** nous récupérons les datas de l'API et créons le tableau qui contiendra les résultats.
Pendant le temps de chargement des données nous n'avons aucune donnée à afficher autour des pokémons, c'est la raison pour laquelle nous passons un tableau vide par défaut à notre constante **pokemons**.
```
const { data } = useFetchQuery('/v2/pokemon?limit=21');
const pokemons = data?.results ?? [];
```

Nous avons un maintenant un problème en plus, au niveau de l'API nous récupérons les données suivantes, **name** et **url**.
```
{
  "name": "bulbasaur",
  "url": "https://pokeapi.co/api/v2/pokemon/1/"
}
```

Nous n'avons donc pas les **ids** des pokémons, c'est la raison pour laquelle nous allons créer une fonction permettant de parser l'URL afin d'en extraire l'id.
**parseInt** est une fonction qui prend deux paramètres, la chaine de caractère à traduire et la **base**. Ici, nous choisissons la base 10 qui est la base par défaut du décimale.
Les URLs étant de la forme `https://pokeapi.co/api/v2/pokemon/1/` l'id se situe à -2 dans le tableau (le moins indique que l'on part de la fin).
Le **!** après `at(-2)` permet de préciser que l'on sait pertinemment que cela va se produire, les URLs de l'API étant composé essentiellement de **/**.
```
export function getPokemonId(url: string): number {
  return parseInt(url.split('/').at(-2)!, 10)
}
```

Maintenant nous faisons évoluter la transmission de l'id du pokemon au niveau du composant `<PokemonCard />` nous pouvons transmettre l'id à l'aide de la fonction créé ci-dessus.
```
<FlatList
  data={pokemons}
  numColumns={3}
  contentContainerStyle={[styles.gridGap, styles.grid]}
  columnWrapperStyle={styles.gridGap}
  renderItem={({item}) => <PokemonCard id={getPokemonId(item.url)} name={item.name} style={{flex: 1/3}} />} keyExtractor={(item) => item.url}
/>
```
