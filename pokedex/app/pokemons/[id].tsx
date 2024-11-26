import Card from "@/components/Card";
import PokemonSpec from "@/components/pokemon/PokemonSpec";
import PokemonStat from "@/components/pokemon/PokemonStat";
import PokemonType from "@/components/pokemon/PokemonType";
import RootView from "@/components/RootView";
import Row from "@/components/Row";
import ThemedText from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { capitalizeFirstLetter, formatWeight, getPokemonArtwork, pokemonBaseStats } from "@/functions/pokemons";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import useThemeColors from "@/hooks/useThemeColors";
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Audio } from "expo-av";
import PagerView from 'react-native-pager-view';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    flex: 1
  },
  artwork_container: {
    position: 'absolute',
    top: -144,
    left: 0,
    right: 0,
    zIndex: 5,
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  artwork: {
    alignSelf: "center",
    width: 200,
    height: 200,
  },
  navigation_button: {
    width: 24,
    height: 24
  },
  pokeball_bkg: {
    position: "absolute",
    top: 8,
    right: 8,
    opacity: .1,
    width: 206,
    height: 208
  },
  card: {
    flex: 1,
    gap: 16,
    alignItems: 'center',
    marginTop: 144,
    padding: 20,
    paddingTop: 56,
  },
  card_row: {
    justifyContent: 'center',
    height: 20
  },
  bio: {
    alignSelf: 'flex-start'
  },
  bars: {
    alignSelf: 'stretch'
  }
});

function Pokemon() {
  const params = useLocalSearchParams() as {id: string};
  // L'id n'est pas une donnée statique, car au swipe nous allons modifier le pokémon que l'on observe donc l'id doit varier
  const [ id, setId ] = useState(parseInt(params.id, 10));
  // on initialise useRef avec la valeur 1 car c'est la valeur par défaut de la page que l'on visite (initialPage)
  const offset = useRef(0);
  const pager = useRef<PagerView>(null);

  const onPageSelected = (e: {nativeEvent: {position: number}}) => {
    // par défaut position renvoi 0 / 1 ou 2, on souhaite pour nous simplifier la vie d'avoir -1 / 0 / 1 donc on enlève 1 à la position
    console.log('onPageSelected', e.nativeEvent.position, offset.current);
    offset.current = e.nativeEvent.position - 1;
    console.log('onPageSelected', e.nativeEvent.position, offset.current);
    console.log('---------------------');
  }

  const onPageScrollStateChanged = (e: {nativeEvent: {pageScrollState: string}}) => {
    const state = e.nativeEvent.pageScrollState;

    if(state !== 'idle') {
      return;
    }

    if(offset.current === -1 && id === 2) {
      return;
    }

    if(offset.current === 1 && id === 1025) {
      return;
    }

    // on teste si l'app est "inactive" et que l'on est plus sur la page initiale (1)
    if(offset.current !== 0) {
      // on met à jour l'id en fonction de la nouvelle position
      setId(id + offset.current);

      // une fois l'id mis à jour on réinitialise l'offset à 0 pour permettre de simuler qu'on est sur la page initiale
      offset.current = 0;
    }
  }

  const onPrevious = () => {
    pager.current?.setPage(0);
  }

  const onNext = () => {
    pager.current?.setPage(2 + offset.current);
  }

  return (
    <PagerView
      ref={pager}
      onPageSelected={onPageSelected}
      onPageScrollStateChanged={onPageScrollStateChanged}
      initialPage={0}
      style={{flex: 1}}>
      <PokemonView key= {id - 1} id={id - 1} onPrevious={onPrevious} onNext={onNext} />
      <PokemonView key= {id} id={id} onPrevious={onPrevious} onNext={onNext} />
      <PokemonView key= {id + 1} id={id + 1} onPrevious={onPrevious} onNext={onNext} />
    </PagerView>
  )
}

type Props = {
  id: number,
  onPrevious: () => void,
  onNext: () => void
}

function PokemonView({id, onPrevious, onNext}: Props) {
  const colors = useThemeColors();
  const { data: pokemon } = useFetchQuery('/pokemon/[id]', {id: id});
  const { data: species } = useFetchQuery('/pokemon-species/[id]', {id: id});
  const mainType = pokemon?.types?.[0].type.name;
  const colorType = mainType ? Colors.types[mainType] : colors.tint;
  const types = pokemon?.types ?? [];
  const bio = species?.flavor_text_entries?.find(({language}) => language.name === "en")?.flavor_text.replaceAll("\n", " ").replaceAll("\f", "\n");
  const stats = pokemon?.stats ?? pokemonBaseStats;

  const onArtworkPress = async () => {
    const cry = pokemon?.cries.latest;

    if(!cry) {
      return;
    }

    const { sound } = await Audio.Sound.createAsync(
      { uri: cry },
      { shouldPlay: true }
    );
    sound.playAsync();
  }

  const isFirst = id === 1;
  const isLast = id === 1025;

  return (
    <RootView backgroundColor={colorType}>
      <View style={styles.container}>
        <Image source={require("@/assets/images/pokeball_big.png")} style={styles.pokeball_bkg} />
        <Row style={styles.headerBar} gap={8}>
          <Pressable onPress={router.back}>
            <Image source={require("@/assets/images/arrow_back-white.png")} width={32} height={32} />
          </Pressable>
          <ThemedText variant="headline" color="grayWhite" style={styles.title}>{pokemon?.name ? capitalizeFirstLetter(pokemon.name) : ''}</ThemedText>
          <ThemedText variant="subtitle2" color="grayWhite">#{id.toString().padStart(3, '0')}</ThemedText>
        </Row>
        <Card style={styles.card}>
          {/* Artwork et navigation */}
          <Row style={styles.artwork_container}>
            {isFirst ? <View style={styles.navigation_button}></View> : <Pressable onPress={onPrevious}>
              <Image source={require("@/assets/images/chevron_left--white.png")} style={styles.navigation_button} />
            </Pressable>}
            <Pressable onPress={onArtworkPress}>
              <Image source={{uri: getPokemonArtwork(id)}} style={styles.artwork} />
            </Pressable>
            {isLast ? <View style={styles.navigation_button}></View> : <Pressable onPress={onNext}>
              <Image source={require("@/assets/images/chevron_right--white.png")} style={styles.navigation_button} />
            </Pressable>}
          </Row>


          <Row style={styles.card_row} gap={16}>
            {types.map( type => <PokemonType name={type.type.name} key={type.type.name} />)}
          </Row>

          {/* About */}
          <ThemedText variant="subtitle1" style={{color: colorType}}>About</ThemedText>
          <Row>
            <PokemonSpec title={formatWeight(pokemon?.weight)} description="Weight" image={require("@/assets/images/weight.png")} style={{borderStyle: "solid", borderRightWidth: 1, borderColor: colors.grayLight}}/>
            <PokemonSpec title={formatWeight(pokemon?.height)} description="Height" image={require("@/assets/images/straighten.png")} style={{borderStyle: "solid", borderRightWidth: 1, borderColor: colors.grayLight}}/>
            <PokemonSpec title={pokemon?.moves.slice(0,2).map(m => m.move.name).join("\n")} description="Moves" />
          </Row>
          <ThemedText style={styles.bio}>{bio}</ThemedText>

          {/* Base stats */}
          <ThemedText variant="subtitle1" style={{color: colorType}}>Base stats</ThemedText>
          <View style={styles.bars}>
            {stats.map((stat) => <PokemonStat name={stat.stat.name} key={stat.stat.name} value={stat.base_stat} color={colorType} />)}
          </View>
        </Card>
      </View>
    </RootView>
  )
}

export default Pokemon;
