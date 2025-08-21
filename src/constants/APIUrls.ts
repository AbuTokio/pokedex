export const BASE_URL: string = "https://pokeapi.co/api/v2"
export const POKEMON_URL: string = `${BASE_URL}/pokemon?limit=151`
export const TYPES_URL: string = `${BASE_URL}/type?limit=100`
export const GIF_URL = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`
