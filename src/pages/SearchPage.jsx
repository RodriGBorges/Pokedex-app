import React, { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import { useLocation } from 'react-router-dom';
import { PokemonCard } from '../components/PokemonCard';

export const SearchPage = () => {

  //recibimos de location el state que enviamos en navigation
  const location = useLocation();

  //pedido de todos los pokemons
  const { allPokemons } = useContext(PokemonContext);

  //filtrado por params
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
