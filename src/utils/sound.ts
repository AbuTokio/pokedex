export function playPokemonCry(name: string): void {
  const cry = new Audio(`https://play.pokemonshowdown.com/audio/cries/${name}.mp3`)
  cry.play()
}
