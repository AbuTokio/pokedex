import { TYPE_COLORS } from "./constants/TypeColors"
import { Element } from "./enums/Element"
import { PokemonType } from "./enums/PokemonType"
import { createButton, displayPokemon, getPokemon } from "./utils/data"
import "./styles/main.scss"
import type { Pokemon } from "./interfaces/Pokemon"

const TYPES: PokemonType[] = Object.values(PokemonType)

const html = {
  searchInput: document.querySelector("#search-input") as HTMLInputElement,
  buttons: {
    typeButtons: [document.querySelector("#type-buttons"), {}] as [HTMLDivElement, Record<string, HTMLButtonElement>],
  },
  main: [document.querySelector("main"), {}] as [HTMLDivElement, Record<string, HTMLButtonElement>],
}

const pokemon: Pokemon[] = await getPokemon()

function showAllPokemon(): void {
  pokemon.forEach(async (pokemon) => {
    html.main[Element.THIS].appendChild(await displayPokemon(pokemon))
  })
}

function addButtons(): void {
  const btn = createButton("all", "#000")
  html.buttons.typeButtons[Element.CHILD]["all"] = btn
  html.buttons.typeButtons[Element.THIS].appendChild(btn)
  btn.addEventListener("click", () => {
    html.main[Element.THIS].innerHTML = ""
    pokemon.forEach(async (pokemon) => {
      html.main[Element.THIS].appendChild(await displayPokemon(pokemon))
    })
  })

  TYPES.forEach((type: PokemonType) => {
    const typeButton = createButton(type, TYPE_COLORS[type])
    html.buttons.typeButtons[Element.CHILD][type] = typeButton
    html.buttons.typeButtons[Element.THIS].appendChild(typeButton)

    typeButton.addEventListener("click", async () => {
      html.main[Element.THIS].innerHTML = ""
      const filteredPokemonType1: Pokemon[] = pokemon.filter((pok) => {
        return pok.types[0].type.name === type
      })

      const filteredPokemonType2: Pokemon[] = pokemon.filter((pok) => {
        if (pok.types[1]) return pok.types[1].type.name === type
      })

      const filteredPokemon: Pokemon[] = [...filteredPokemonType1, ...filteredPokemonType2]

      filteredPokemon.forEach(async (pokemon) => {
        html.main[Element.THIS].appendChild(await displayPokemon(pokemon))
      })
    })
  })
}

html.searchInput.addEventListener("keyup", () => {
  html.main[Element.THIS].innerHTML = ""
  const value: string = html.searchInput.value.startsWith("#")
    ? html.searchInput.value.slice(1)
    : html.searchInput.value
  const isNumber: boolean = !isNaN(Number(value))
  let filteredPokemon: Pokemon[]

  if (isNumber) {
    filteredPokemon = pokemon.filter((pok) => {
      return pok.id === Number(value)
    })
  } else {
    filteredPokemon = pokemon.filter((pok) => {
      return pok.name.includes(value)
    })
  }

  if (value) {
    filteredPokemon.forEach(async (pokemon) => {
      html.main[Element.THIS].appendChild(await displayPokemon(pokemon))
    })
  } else {
    showAllPokemon()
  }
})

addButtons()
showAllPokemon()
