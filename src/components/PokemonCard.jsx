import React from 'react';
import { Link } from 'react-router-dom';
import { PokemonTypeIcon } from './PokemonTypeIcon';
import keygen from 'keygenerator';

export const PokemonCard = ({ pokemon }) => {

  return (
    <article className='pokemonCard'>
        <div className='infoNameType'>
          <div className='pokemonHeader-info'>
            <h1>{pokemon.id}</h1>
            <h2 className='pokemonInfo-name'>{pokemon.name}</h2>
          </div>
          <div className='containerTypes'>
          {pokemon.types && pokemon.types.map( type => <PokemonTypeIcon key={keygen._()} type={type.type.name} />)}
          </div>
        </div>
        <Link to={`/pokemon/${pokemon.id}`} className='card-pokemon'>
          <div className='imgContainer'>
            <img 
            src={pokemon.sprites.other["official-artwork"].front_default} 
            alt={`Pokemon ${pokemon.name}`} 
            />
          </div>
        </Link>
    </article>
  ) 
}
