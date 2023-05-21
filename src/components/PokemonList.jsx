import React, { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import { PokemonCard } from './PokemonCard';

export const PokemonList = () => {

    const { limitPokemons } = useContext(PokemonContext);

  return (
    <>
        <div className='pokemonsContainer'>
            {limitPokemons.map(pokemon => (
            <PokemonCard pokemon={pokemon} key={pokemon.id} />
            ))}
        </div>
    </>
  );
};
