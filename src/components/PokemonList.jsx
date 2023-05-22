import React, { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import { PokemonCard } from './PokemonCard';
import { LoadingSpin } from '../layouts/LoadingSpin';

export const PokemonList = () => {

    const { limitPokemons, loading } = useContext(PokemonContext);


  return (
    <>
      {
        loading ? (
          <LoadingSpin />
          ) : (
          <div className='pokemonsContainer'>
              {limitPokemons.map(pokemon => (
              <PokemonCard pokemon={pokemon} key={pokemon.id} />
              ))}
          </div>
          )}
    </>
  );
};
