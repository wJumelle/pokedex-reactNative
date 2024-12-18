export function getPokemonId(url: string): number {
  return parseInt(url.split('/').at(-2)!, 10)
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getPokemonArtwork(id: number | string) : string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function formatWeight(weight?: number) : string {
  if(!weight) {
    return "";
  }

  return (weight / 10).toString().replace('.', ',') + "kg";
}

export function formatHeight(height?: number) : string {
  if(!height) {
    return "";
  }

  return (height / 10).toString().replace('.', ',') + "m";
}

export const pokemonBaseStats = [
  {
    "base_stat": 1,
    "stat": {
      "name": "hp"
    }
  },
  {
    "base_stat": 1,
    "stat": {
      "name": "attack"
    }
  },
  {
    "base_stat": 1,
    "stat": {
      "name": "defense"
    }
  },
  {
    "base_stat": 1,
    "stat": {
      "name": "special-attack"
    }
  },
  {
    "base_stat": 1,
    "stat": {
      "name": "special-defense"
    }
  },
  {
    "base_stat": 1,
    "stat": {
      "name": "speed"
    }
  }
];
