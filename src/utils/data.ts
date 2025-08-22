import { POKEMON_URL } from "../constants/APIUrls"
import { TYPE_COLORS } from "../constants/TypeColors"
import type { PokemonType } from "../enums/PokemonType"
import type { Pokemon } from "../interfaces/Pokemon"
import type { PokemonResponse } from "../interfaces/PokemonResponse"
import { capitalizeString, formatNumber } from "./format"
import { playPokemonCry } from "./sound"

async function fetchData<T>(url: string, save: boolean = false): Promise<T> {
  const resp: Response = await fetch(url)
  const data = (await resp.json()) as T
  if (data && save) {
    localStorage.setItem(url, JSON.stringify(data))
  }
  return data
}

async function getData<T>(key: string, save: boolean = false): Promise<T> {
  const data: string | null = localStorage.getItem(key)
  if (data) {
    try {
      console.log("Getting data from Local Storage...") // debug
      return JSON.parse(data) as T
    } catch (error) {
      console.error(error)
      console.log("Getting data from API...") // debug
      return (await fetchData<T>(key, save)) as T
    }
  } else {
    console.log("Getting data from API...") // debug
    return (await fetchData<T>(key, save)) as T
  }
}

export async function getPokemon(): Promise<Pokemon[]> {
  const pokemonResult = await getData<PokemonResponse>(POKEMON_URL, true)
  const pokemon: Pokemon[] = await Promise.all(
    pokemonResult.results.map(async (result) => {
      const { id, name, sprites, types } = await getData<Pokemon>(result.url)
      const data = { id, name, sprites, types }

      localStorage.setItem(result.url, JSON.stringify(data))
      return data
    })
  )
  return pokemon
}

export async function displayPokemon(pokemon: Pokemon): Promise<HTMLDivElement> {
  const pokemonCard = document.createElement("div") as HTMLDivElement
  pokemonCard.innerHTML = `
  <div class="pokemon-card">
    <div class="pokemon-img-wrapper" style="background: linear-gradient(45deg, #fff, ${
      TYPE_COLORS[pokemon.types[0].type.name as PokemonType]
    });">
    <img src="${pokemon.sprites.other?.showdown.front_default}" alt="${pokemon.name}" />
    </div>
    <div class="pokemon-info">
      <div class="pokemon-types">
        <p style="background-color: ${TYPE_COLORS[pokemon.types[0].type.name as PokemonType]}">${
    pokemon.types[0].type.name
  }</p>
        ${
          pokemon.types.length > 1
            ? `
        <p style="background-color: ${TYPE_COLORS[pokemon.types[1].type.name as PokemonType]}">${
                pokemon.types[1].type.name
              }</p>
        `
            : ``
        }
      </div>
      <div class="pokemon-name-id">
        <p class="pokemon-name">${capitalizeString(pokemon.name)}</p>
        <p class="pokemon-id">${formatNumber(pokemon.id, 3)}</p>
      </div>
    </div>
  </div>
  `

  pokemonCard.addEventListener("click", (e) => {
    if (e.target === pokemonCard.querySelector("img")) {
      playPokemonCry(pokemon.name)
    }
  })

  return pokemonCard
}

export function createButton(name: string, color: string): HTMLButtonElement {
  const btn = document.createElement("button") as HTMLButtonElement
  btn.textContent = name.toUpperCase()
  btn.id = `${name}-btn`
  btn.style.backgroundColor = color
  return btn
}
