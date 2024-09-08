export function getPokemonId(url: string): number {
  return parseInt(url.split('/').at(-2)!, 10)
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
