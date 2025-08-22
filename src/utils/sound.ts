export function playPokemonCry(name: string): void {
  const cry = new Audio(`https://play.pokemonshowdown.com/audio/cries/${name.replace("-", "")}.mp3`)
  cry.play()
}
