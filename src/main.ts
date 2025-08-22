import { TYPE_COLORS } from "./constants/TypeColors"
import { Element } from "./enums/Element"
import { PokemonType } from "./enums/PokemonType"
import { createButton, displayPokemon, getPokemon } from "./utils/data"
import "./styles/main.scss"
import type { Pokemon } from "./interfaces/Pokemon"

const TYPES: PokemonType[] = Object.values(PokemonType)

const html = {
  buttons: {
    typeButtons: [document.querySelector("#type-buttons"), {}] as [HTMLDivElement, Record<string, HTMLButtonElement>],
  },
  main: document.querySelector("main") as HTMLDivElement,
}

const pokemon: Pokemon[] = await getPokemon()

pokemon.forEach(async (pokemon) => {
  html.main.appendChild(await displayPokemon(pokemon))
})

TYPES.forEach((type: PokemonType) => {
  const typeButton = createButton(type, TYPE_COLORS[type])
  html.buttons.typeButtons[Element.CHILD][type] = typeButton
  html.buttons.typeButtons[Element.THIS].appendChild(typeButton)

  typeButton.addEventListener("click", async () => {
    btn.style.display = "initial"
    html.main.innerHTML = ""
    const filteredPokemon1: Pokemon[] = pokemon.filter((pok) => {
      return pok.types[0].type.name === type
    })

    const filteredPokemon2: Pokemon[] = pokemon.filter((pok) => {
      if (pok.types[1]) return pok.types[1].type.name === type
    })

    const filteredPokemon: Pokemon[] = [...filteredPokemon1, ...filteredPokemon2]

    filteredPokemon.forEach(async (pokemon) => {
      html.main.appendChild(await displayPokemon(pokemon))
    })
  })
})

const btn = createButton("X", "#000")
html.buttons.typeButtons[Element.CHILD]["X"] = btn
html.buttons.typeButtons[Element.THIS].appendChild(btn)
btn.addEventListener("click", () => {
  html.main.innerHTML = ""
  pokemon.forEach(async (pokemon) => {
    html.main.appendChild(await displayPokemon(pokemon))
  })
  btn.style.display = "none"
})

btn.style.display = "none"
