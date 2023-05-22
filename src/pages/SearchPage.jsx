import React, { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import { useLocation } from 'react-router-dom';
import { PokemonCard } from '../components/PokemonCard';

export const SearchPage = () => {

  const location = useLocation();

  const { allPokemons } = useContext(PokemonContext);

  const pokemons = allPokemons.filter(pokemon => pokemon.name.includes(location.state.toLowerCase()));

  return (
    <div className='titleSearchContainer'>
      <h2 className="found">
        Se encontraron <span className='numberResult'>{pokemons.length}</span> Pokemons con <span>{`"${location.state.toLowerCase()}"`}</span>:
      </h2>
      <section>
        <div className='pokemonsContainer'>
              {pokemons.map(pokemon => (
              <PokemonCard pokemon={pokemon} key={pokemon.id} />
              ))}
          </div>
      </section>
    </div>
  );
};
