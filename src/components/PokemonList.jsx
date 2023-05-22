import React, { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import { PokemonCard } from './PokemonCard';
import { LoadingSpin } from '../layouts/LoadingSpin';

export const PokemonList = () => {
    //Pokemones con límite(50), loading de cargando data y pokemones filtrados de los checkboxs
    const { limitPokemons, loading, filteredPokemons } = useContext(PokemonContext);
    //loading => desde que hace el pedido de la data hasta que termina aparece el cargando...
  return (
    <>
      {
        loading ? (
          <LoadingSpin />
          ) : (
          <div className='pokemonsContainer'>
            {
              filteredPokemons.length ? (
                <>
                  {filteredPokemons.map(pokemon => (
                    <PokemonCard pokemon={pokemon} key={pokemon.id} />
                    ))}
                </>
              ) : (
                <>
                  {limitPokemons.map(pokemon => (
                  <PokemonCard pokemon={pokemon} key={pokemon.id} />
                  ))}
                </>
              )
            }
          </div>
          )}
    </>
  );
};
