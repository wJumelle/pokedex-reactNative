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

Comme pour les routeurs de React, l'utilsiation de la librairie **React query** nécessite la mise en place d'un **Provider** à l'aide de la classe [**QueryClientProvider**](https://tanstack.com/query/latest/docs/framework/react/reference/QueryClientProvider).
Encore une fois, comme pour les routeurs nous allons positionner ce provider au plus haut niveau de notre application, le **fichier de gestion des layouts**.
Nous allons donc importer la classe [**QueryClient**](https://tanstack.com/query/latest/docs/reference/QueryClient#queryclient) qui sera passée en paramètre du provider.

```
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false
        }}
      />
    </QueryClientProvider>
  );
}
```

#### 04 - Mise en place du loader pendant le chargement des données de l'API

Pour réaliser ce tour de force c'est en vérité assez simple !
Nous allons utiliser l'attribut [**ListFooterComponent**](https://reactnative.dev/docs/flatlist#listfootercomponent) de notre composant `<FlatList />`, cet attribut prend en valeur un composant que l'on souhaite insérer en fin de liste.
Le tricks maintenant est de faire disparaitre ce composant lorsque les datas sont chargées et pour cela nous allons avoir besoin de l'information de si l'on est en train de charger les données ou non. Le hook **useQuery** de la libraire **react query** nous délivre une variable d'état à travers notre hook personnalisé **useFetchQuery**. Cette variable d'état s'intitule **isFetching**.
En vérifiant **isFetching** nous pouvons afficher ou non un composant `<ActivityIndicator />`.
C'est un composant issue de react native qui nous permettra d'afficher un loader fonctionnel pour tous les environnements.

```
<FlatList
  data={pokemons}
  numColumns={3}
  contentContainerStyle={[styles.gridGap, styles.grid]}
  columnWrapperStyle={styles.gridGap}
  ListFooterComponent={
    isFetching ? <ActivityIndicator color={colors.tint} size="large"/> : null
  }
  renderItem={({item}) => <PokemonCard id={getPokemonId(item.url)} name={item.name} style={{flex: 1/3}} />} keyExtractor={(item) => item.url}
/>
```

#### 04 - Mise en place de l'infinite scrolling avec useQuery

Si nous désirons faire en sorte que lorsque l'utilisateur scroll dans la liste la suite des pokémons se charge, cela n'est actuellement pas possible avec notre
hook **useFetchQuery**. Nous allons donc créer un deuxième hook, qui prendra lui aussi en paramètre le chemin d'appel, et qui utilisera [**useInfiniteQuery**](https://tanstack.com/query/latest/docs/framework/react/reference/useInfiniteQuery) de react-query.

Ce nouveau hook aura deux paramètres que nous avons déjà vu chez **useQuery** : **queryKey** et **queryFn**.
Encore une fois **queryKey** aura comme référence le chemin utilisé pour le call de l'API, alors que **queryFn** sera la fonction qui effectuera l'appel.
Deux nouveau paramètres font leur apparition :
* **initialPageParam** qui nous permet simplement de spécifier la page par laquelle nous commençons la réception de nos données ; dans l'API PokeApi nous ne possédons pas d'indication de la page en cours / du numéro de la page suivante, nous avons directement l'URL à appeler pour récupérer les données suivantes en valeur de la propriété **next**. Donc notre point d'entrée sera simplement notre chemin d'appel, soit `endpoint + path`.
* pour que le hook fonctionne nous avons besoin d'un dernier paramètre : **getNextPageParam**. C'est la fonction qui va nous permettre de récupérer le chemin vers la prochaine page.

```
export function useInfiniteFetchQuery(path: string) {
  return useInfiniteQuery({
    queryKey: [path],
    initialPageParam: endpoint + path,
    queryFn: async ({pageParam}) => {
      await wait(1);
      return fetch(pageParam, {
        headers: {
          Accept: 'application/json'
        }
      }).then(r => r.json())
    },
    getNextPageParam: (lastPage) => {
      if("next" in lastPage) {
        return lastPage.next
      }
      return null
    }
  })
}
```

Nous pouvons observer que **queryFn** retourne le résultat au format json de l'appel de **pageParam**, **pageParam** représentant le chemin de l'API en fonction de la position dans la profondeur du tableau.
La fonction **getNextPageParam** prend en paramètre **lastPage** qui représente le dernier résultat de l'appel de **queryFn**. Si on peut retrouver dans ce résultat l'entrée **next** alors c'est qu'une page suivante peut être chargée et donc on la retourne, sinon on retour null.

Maintenant le problème que nous rencontrons en appelant **useInfiniteFetchQuery** à la place de **useFetchQuery** c'est qu'il nous envoie pas le même type de data.
Nous allons donc revoir nos codes pour la lecture du résultat.

```
// Avant
const pokemons = data?.results ?? [];

// Après
// data?.pages contient l'ensemble des données des pages déjà chargées, lors de la première itération ce sera donc un tableau
// qui contiendra les données des 21 premiers pokémons mais aussi toutes les données de navigation (next, prev)
// la méthode flatMap() nous permet d'aplatir le tableau et d'en extraire que les données qui nous intéressent soit page.results
const pokemons = data?.pages.flatMap(page => page.results) ?? [];
```

Voici la [**documentation autour de flatMap()**](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap). C'est une fonction qui combine l'usage des méthodes **map()** et **flat()** mais en étant plus optimisée.

#### 05 - Typage autour du hook useFetchQuery

Typscript permet d'améliorer l'autocomplétion des IDE et surtout de créer toute une validation autour des éléments qui sont transmis.
Nous allons donc mettre en place un nouveau type à l'intérieur du fichier **useFetchQuery** que nous allons nommer **API**.
Ce nouveau type prendra en entrée les chemins d'appel à l'API, donc pour le moment nous allons définir le point d'entrée **/pokemon?limit=21**.
Ensuite nous devons lister les éléments que nous renvoie l'API ainsi que le type associé, ici l'écriture la plus complexe est au niveau de la propriété
**results**.
`results: { name: string, url: string }[]` indique que nous allons recevoir plusieurs fois (donc un tableau) des objets contenant les propriétés **name** et **url**.

```
type API = {
  "/pokemon?limit=21": {
    count: number,
    next: string | null,
    previous: string | null,
    results: { name: string, url: string }[]
  }
}
```

Ensuite, du coté de la déclaration des hooks nous allons pouvoir effectuer quelques modifications. Cela va consister nottamment en la mise en place de **generic**
qui vont permettre toute la modularité de notre code.
Un **generic** (ou générique en français) est une fonctionnalité qui permet de créer des composant réutilisables (donc nos hooks) pouvant fonctionner avec différents types sans pour autant sacrifier la sécurité du type. Donc on garde tout l'intérêt de la définition des types mais en gagnant en souplesse.

```
export function useFetchQuery<T extends keyof API>(path: T) {
  return useQuery({
    queryKey: [path],
    queryFn: async () => {
      // La fonction est un timer qui va nous permettre de simuler un périphèrique ou une connexion lente
      await wait(1);

      // Une fois le timer passer on retourne le résultat de l'appel API
      return fetch(endpoint + path).then(r => r.json() as Promise<API[T]>)
    }
  })
}
```

`<T extends keyof API>(path: T)` indique que nous créons un paramètre de type **T** qui aura comme héritage les clés du type **API**.
Ensuite nous précisons que le paramètre **path** est de type **T**.
`r => r.json() as Promise<API[T]>` indique que le hook nous retournera une pormise de type **API**.

#### 05 - Création du lien pour accéder à la page du pokemon

Pour la mise en place de cette navigation, nous allons nous resservir du composant `<Link />` d'expo-router, mais aussi d'un nouveau composant
`<Pressable />` qui nous permettra d'inclure ce que l'on veut rendre cliquable.
Voir la documentation autour de [**<Link>**](https://docs.expo.dev/router/navigating-pages/#buttons).
Voir la documentation autour de [**<Pressable>**](https://reactnative.dev/docs/pressable).

```
function PokemonCard({style, id, name}: Props) {
  const colors = useThemeColors();

  return <Link href={{ pathname: "/pokemons/[id]", params: { id: id } }} asChild>
    <Pressable>
      <Card style={[style, styles.cardPokemon]}>
        <ThemedText variant="caption" color="grayMedium" style={{alignSelf: 'flex-end'}}>#{id.toString().padStart(3, '0')}</ThemedText>
        <Image source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}} style={styles.imgPokemon} />
        <ThemedText color="grayDark">{capitalizeFirstLetter(name)}</ThemedText>
        <View style={[styles.boxShadow, {backgroundColor: colors.grayBackground}]} />
      </Card>
    </Pressable>
  </Link>
}
```

La prop **asChild** nous permettre de transmettre l'intégralité des props reçu par le composant `<Link>` à son premier enfant, donc `<Pressable>`.
La prop [**android_ripple**](https://reactnative.dev/docs/pressable#android_ripple-android) pourrait nous permettre de styliser l'intéraction avec l'élément intéractif.
Elle prend en paramètre une couleur (avec **color**) et on peut spécifier si l'on souhaite voir l'intérieur en fond d'élément où devant (**foreground**). Nous dans notre cas il nous faudrait choisir **foreground: true** puisque nous avons un background défini sur nos cards.

Nous constatons que l'affichage de notre grille est légèrement affectée par ces évolutions, cela s'explique par le fait que le `flex: 1/3` se joue actuellement sur
le composant `<Card />` et non sur notre composant `<Link />` nous devons donc faire migrer notre **style** vers ce nouveau composant.

```
function PokemonCard({style, id, name}: Props) {
  const colors = useThemeColors();

  return <Link href={{ pathname: "/pokemons/[id]", params: { id: id } }} asChild style={style}>
    [...]
      <Card style={[styles.cardPokemon]}>
        [...]
      </Card>
    </Pressable>
  </Link>
}
```

#### 05 - Mise en place du formulaire sur la page de listing

Pour ne pas noyer le code de notre page dans du code brut nous allons créer un nouveau composant `<SearchBar />` que l'on va venir intégrer dans une `<View />` de la page **index.tsx**.
`<SearchBar />` est un composant qui aura deux props que l'on va typer à l'aide de Typescript : **value** et **onChange**.
* **value** est la props qui correspondra à la valeur du champ de recherche
* **onChange** sera la fonction qui sera exécuté lorsque le périphérique détectera un changement au niveau de notre champ

Ces deux éléments ne sont pas sans nous rappeler quelque chose de très commun en React : les variables d'états.
En effet, dans React native comme dans React nous allons nous servir du hook **useState** pour définir un état de notre composant. Cet état sera définit au niveau de la page **index** et sera transmis au composant à l'aide des props que l'on a cité plus haut.

```
//page index.tsx
export default function Index() {
  [...]
  const [ search, setSearch ] = useState('');

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.tint}]}>
        [...]
        <View>
          <SearchBar value={search} onChange={setSearch}></SearchBar>
        </View>
        [...]
    </SafeAreaView>
  );
}

// composant SearchBar
type Props = {
  value: string,
  onChange: (s: string) => void
}

function SearchBar({value, onChange}: Props) {
  return (
    <View>
      <TextInput onChangeText={onChange} value={value}></TextInput>
    </View>
  )
}
```

A la différence du web, les composants de type champ de formulaire arrive totalement nu, sans aucun style.
Nous devons donc tout faire en partant de zéro.

Dans la maquette nous observons que nous avons besoin d'encapsuler différents éléments pour les aligner de manière horizontal. Afin d'éviter d'imbriquer des `<View />` les uns dans les autres nous allons créer un composant `<Row />` qui nous permettra tout simplement l'affichage de plusieurs éléments en ligne. Ce composant `<Row />` servira aussi d'ailleurs à revoir l'intégration du **header**. Ce nouveau composant acceptera donc en props **style**, **gap** et autres props de type **ViewProps**.

```
function Row({style, gap, ...rest}: Props) {
  return (
    <View style={[rowStyle, style, gap ? {gap: gap} : undefined]} {...rest}></View>
  )
}
```

Pour la stylisation du composant `<SearchBar />` nous allons devoir faire malheureusement sans le composant `<ThemedText />` qui nous permettait jusque-là de styliser nos textes. Nous allons devoir créer donc des nouveaux styles nous permettant d'afficher notre input correctement.

```
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderRadius: 16,
    height: 32,
    paddingHorizontal: 12
  },
  input: {
    flex: 1,
    height: 16,
    lineHeight: 16
  }
})
```

A la fin notre composant `<SearchBar />` ressemble donc à ceci.

```
function SearchBar({value, onChange}: Props) {
  const colors = useThemeColors();

  return (
    <Row style={[styles.wrapper, { backgroundColor: colors.grayWhite }]} gap={8}>
      <Image source={require("@/assets/images/search.png")} width={16} height={16} />
      <TextInput onChangeText={onChange} value={value} placeholder="Search..." placeholderTextColor={colors.grayMedium} style={[styles.input, {color: colors.grayDark}]}></TextInput>
    </Row>
  )
}
```

Nous allons maintenant chercher à rendre fonctionnel notre relation entre le formulaire et l'affichage de notre liste.
Et pour cela rien de plus simple, il suffit de créer une nouvelle variable **filteredPokemons** qui va venir filtrer notre liste de pokemons que l'on passera à notre composant `<FlatList />`.

```
// Si search existe (donc non null ou '') alors on filtre
// sinon on affiche l'ensemble de la liste chargée
const filteredPokemons = search ? pokemons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || getPokemonId(p.url).toString() === search) : pokemons;
```

Lorsque l'on filtre on accède à un nombre restreint des pokémons et donc on déclenche l'événement **onEndReached** du composant `<FlatList />` automatiquement, ce qui exécute en boucle la query vers l'API afin de rechercher d'avantage de pokémon. Cela peut être l'effet voulu, personnelement je ne trouve pas cela déconnant.
Dans le tutoriel suivi Grafikart bloque cette option tout simplement en modifiant la props **onEndReached** en précisant que si une recherche existe alors il ne faut rien faire `onEndReached={search ? undefined : () => fetchNextPage()}`.

#### 06 - Mise en place du tri

En général les APIs mettent en place ce genre de tri dans le paramétrage de leurs requêtes, ici nous sommes limités par l'API donc nous allons devoir les développer nous même.

Nous allons donc créer le nouveau composant `<SortButton />` dans lequel nous allons gérer deux props **value** et **onChange**.

```
// Fichier SortButton.tsx
type Props = {
  value: "id" | "name",
  onChange: (v: "id" | "name") => void
}

function SortButton({ value, onChange }: Props) {
  return (
    <View>
      <Text>{value}</Text>
    </View>
  )
}
```

Les props **value** et **onChange** correspondront à un état transmis au composant via la page **index.tsx**.
Lors de la définition de cet état, nous devons de nouveau préciser les deux cas attendus possibles : `const [ sortKey, setSortKey ] = useState<"id" | "name">("id");`.
Si on ne définit pas ces deux cas spécifiques nous risquons de nous retrouver avec une erreur dans notre logiciel de programmation, aucune erreur en Front.

Maintenant nous allons chercher à rendre fonctionnel notre système de tri.
Pour cela dans un premier temps on va venir modifier le tableau des pokémons afin d'obtenir directement l'**id** en temps que propriété de chaque pokémon, plutot que d'appeler à chaque fois la fonction **getPokemonId()**.
```
const pokemons = data?.pages.flatMap(page => page.results.map(r => ({ name: r.name, id: getPokemonId(r.url) }))) ?? [];

// Ce qui nous permet de changer la propriété renderItem de notre FlatList
// Au niveau de notre keyExtractor, c'est une chaine de caractère qui est attendue, donc nous devons convertir l'id en string.
<FlatList
  [...]
  renderItem={({item}) => <PokemonCard id={item.id} name={item.name} style={{flex: 1/3}} />} keyExtractor={(item) => item.id.toString()}
/>
```

Ensuite nous nous attaquons à la refactorisation du tableau **filteredPokemons[]**.
Nous précision donc que notre tableau contiendra à chaque fois un nouveau tableau conçu à partir des données filtrées via **search** ou bien **pokemons** si rien n'a été saisi dans le champ de recherche. Et que sur ce tableau nous appliquerons la méthode **sort()** en nous basant sur **sortKey**.
```
const filteredPokemons = [
  ...(search
    ? pokemons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toString() === search)
    : pokemons)
].sort((a, b) => (a[sortKey] < b[sortKey] ? -1 : 1));
```

Pour gérer le switch entre les deux icons différentes à afficher, nous alons surveiller la propriété **value** en fonction de laquelle nous allons faire évoluer notre require.
```
function SortButton({ value, onChange }: Props) {
  const colors = useThemeColors();

  return (
    <View style={[styles.button, { backgroundColor: colors.grayWhite }]}>
      <Image source={
        value === "id" ?
        require("@/assets/images/number--red.png") :
        require("@/assets/images/alpha--red.png")
      } width={16} height={16} />
    </View>
  )
}
```

Maintenant nous voulons rendre notre composant cliquable, nous allons donc utiliser le même composant que pour les cards pokémons : [`<Pressable />`](https://reactnative.dev/docs/pressable).
Ce dernier écoute la propriété **onPress** qui nous permettra de lui passer une fonction à exécuter.
Lors du clic nous souhaitons faire apparaitre une fenêtre permettant de choisir entre les options : "number" ou "name". Dans React native il existe un composant pour cela qui s'appelle [`<Modal />`](https://reactnative.dev/docs/modal).

Plusieurs propriétés nous intéressent :
* la propriété **transparent** permet d'indiquer que lon souhaite une modale sur font transparent
* la propriété **visible** sera une propriété qui devra évoluer en fonction d'un état du composant `<SortButton />`
* la propriété **onRequestClose** est obligatoire
* la prorpéité **animationType** permet de gérer la façon dont va s'afficher la modal
```
function SortButton({ value, onChange }: Props) {
  const colors = useThemeColors();
  const [ isModalVisible, setModalVisibility ] = useState(false);
  const onButtonPress = () => {
    setModalVisibility(true);
  }
  const onClose = () => {
    setModalVisibility(false);
  }

  return (
    <>
      <Pressable onPress={onButtonPress}>
        [...]
      </Pressable>
      <Modal transparent visible={isModalVisible} onRequestClose={onClose} animationType="fade">
        <Text>Hello World</Text>
      </Modal>
    </>
  )
}
```

Nous cherchons maintenant à mettre en forme notre modale.
Première étape, la mise en place d'un backdrop permettant de fermer la modale au clic.

```
<Modal transparent visible={isModalVisible} onRequestClose={onClose} animationType="fade">
  <Pressable style={styles.backdrop} onPress={onClose}></Pressable>
  [...]
</Modal>
```

Ensuite nous allons définir une `<View />` sous ce backdrop qui viendra se positionner par-dessus.
Cette vue est composée du titre de la popup et d'un composant `<Card />` qui contiendra les boutons radios **number** et **name**.
```
<Modal transparent visible={isModalVisible} onRequestClose={onClose} animationType="fade">
  <Pressable style={styles.backdrop} onPress={onClose}></Pressable>
  <View style={[styles.popup, { backgroundColor: colors.tint }]}>
    <ThemedText variant="subtitle2" color="grayWhite" style={styles.popupTitle}>Sort by: </ThemedText>
    <Card style={styles.popupCard}></Card>
  </View>
</Modal>
```

Pour mettre en place la liste des boutons radios nous allons concevoir en amont un tableau listant toutes les options que l'on utilisera ensuite à l'aide de la méthode **map()** pour concevoir la liste des choix.
```
const options = [
  { label: "Number", value: "id" },
  { label: "Name", value: "name" },
]

function SortButton({ value, onChange }: Props) {
  [...]

  return (
    <>
      [...]
      <Modal transparent visible={isModalVisible} onRequestClose={onClose} animationType="fade">
        [...]
        <View style={[styles.popup, { backgroundColor: colors.tint }]}>
          [...]
          <Card style={styles.popupCard}>
            {options.map((o) => <Row key={o.value}>
              <View />
              <ThemedText color="grayDark">{o.label}</ThemedText>
            </Row>)}
          </Card>
        </View>
      </Modal>
    </>
  )
}
```

Malheureusement en react native il n'y a pas de composant radio pré-existant. Nous allons donc devoir le créer.
Un radio button c'est rien de bien compliqué : un cercle avec une bordure contenant un deuxième plus petit cercle, et ça on sait déjà le faire !

```
import useThemeColors from "@/hooks/useThemeColors";
import { StyleSheet, View } from "react-native";

type Props = {
  checked: boolean
}

function Radio({ checked }: Readonly<Props>) {
  const colors = useThemeColors();

  return (
    <View style={[styles.radio, { borderColor: colors.tint }]}>
      {checked && <View style={[styles.radioInner, { backgroundColor: colors.tint }]}/>}
    </View>
  )
}

const styles = StyleSheet.create({
  radio: {
    width: 14,
    height: 14,
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center"
  },
  radioInner: {
   width: 5,
   height: 5,
   borderRadius: 5
  }
});

export default Radio;
```

Ici la petite subtilité va se jouer au niveaud du composant `<SortButton />`.
Nous souhaitons rendre l'intégralité de la ligne cliquable, donc le composant `<Pressable />` va se trouver autour de la `<Row />` rendue par la méthode **map()**.
Pour définir l'état du radio button nous nous servons de l'égalité `o.value === value` ce qui implique que si l'état **sortKey** est égale à la valeur du bouton radio alors celui-ci apparait coché.
C'est la propriété **onPress** qui va nous permettre d'appeler **onChange** qui n'est rien d'autre que **setSortKey** transmis à `<SortButton />`.

```
function SortButton({ value, onChange }: Props) {
  [...]

  return (
    <>
      [...]
      <Modal transparent visible={isModalVisible} onRequestClose={onClose} animationType="fade">
        <Pressable style={styles.backdrop} onPress={onClose}></Pressable>
        <View style={[styles.popup, { backgroundColor: colors.tint }]}>
          [...]
          <Card style={styles.popupCard}>
            {options.map((o) => <Pressable onPress={() => onChange(o.value)} key={o.value}>
              <Row gap={8}>
                <Radio checked={o.value === value} />
                <ThemedText color="grayDark">{o.label}</ThemedText>
              </Row>
            </Pressable>)}
          </Card>
        </View>
      </Modal>
    </>
  )
}
```
