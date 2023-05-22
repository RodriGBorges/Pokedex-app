import React, { useContext } from 'react';
import { PokemonList } from '../components';
import { PokemonContext } from '../context/PokemonContext';

export const HomePage = () => {

  //cargar +50 pokemons
  const { loadMore } = useContext(PokemonContext);

  return (
    <section className='section-home'>
					<PokemonList />
          <div className='loadMoreContainer'>
            <button className='btnLoadMore' onClick={loadMore}>
              Más
            </button>
          </div>
		</section>
  )
}
