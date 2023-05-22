import { bug, dark, dragon, electric, fairy, fighting, fire, flying, ghost, grass, ground, ice, nature, normal, poison, psychic, rock, steel, water } from "../assets/icons";

export const PokemonTypeIcon = (props) => {

  //iconos de los tipos
  const icons = {electric: electric(), flying: flying(), nature: nature(), fire: fire(), ground: ground(), water: water(), bug: bug(), poison: poison(), normal: normal(), fairy: fairy(), psychic: psychic(), fighting: fighting(), rock: rock(), dark: dark(), steel: steel(), dragon:dragon(), ice: ice(), ghost:ghost(), grass:grass()}

  return (
    <div className={"type-icon "+props.type}>
      <svg width="25" height="25" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      {icons[props.type]}
      </svg>
    </div>
  )
}
