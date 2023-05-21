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
        <div className='pokemonStat'>
          <div className='weightContainer'>
            <h3>Peso: {pokemon.weight} KG</h3>
          </div>
          <div className='abilitiesContainer'>
            <h3>Habilidades: </h3>
            <div>
              {pokemon.abilities && pokemon.abilities.map(ability => <h3 key={keygen._()}>{ability.ability.name.toUpperCase()}</h3>)}
            </div>
          </div>
        </div>
    </article>
  ) 
}
