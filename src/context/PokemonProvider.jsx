import { useEffect, useState } from "react";
import { PokemonContext } from "./PokemonContext";
import { useForm } from "../hooks/useForm";

export const PokemonProvider = ({children}) => {

    const [allPokemons, setAllPokemons] = useState([]);
    const [limitPokemons, setLimitPokemons] = useState([]);
    const [offset, setOffset] = useState(0);

    //Hook useForm
    const {valueSearch, onResetForm, onInputChange} = useForm({
        valueSearch: ''
    })

    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(false);

    let baseUrl = 'https://pokeapi.co/api/v2/';
    //Conectamos a la API
    const getLimitPokemons = async(limit = 50) => {

        //Pokemons data
        const res = await fetch(`${baseUrl}pokemon?limit=${limit}&offset=${offset}`);
        const data = await res.json();

        //Pokemons stats
        const promises = data.results.map(async(pokemon) => {
            const res = await fetch(pokemon.url);
            const data = await res.json();
            return data;
        });

        const results = await Promise.all(promises);
        //Se van a ir cargando y agregando de 50 en 50
        setLimitPokemons([
            ...limitPokemons,
            ...results
        ]);
        setLoading(false);
    };

    const getAllPokemons = async() => {
        //Pokemons data
        const res = await fetch(`${baseUrl}pokemon?limit=100000&offset=0`);
        const data = await res.json();

        //Pokemons stats
        const promises = data.results.map(async(pokemon) => {
            const res = await fetch(pokemon.url);
            const data = await res.json();
            return data;
        });

        const results = await Promise.all(promises);
        setAllPokemons(results);
        setLoading(false);
    };

    const getPokemonById = async(id) => {
        const res = await fetch(`${baseUrl}pokemon/${id}`);
        const data = await res.json();
        return data;
    };

    useEffect(() => {
        getLimitPokemons();
    }, []);

    useEffect(() => {
        getAllPokemons();
    }, [])

  return (
    <PokemonContext.Provider
    value={{
        valueSearch,
        onInputChange,
        onResetForm,
        allPokemons,
        limitPokemons,
        getPokemonById
    }}>
        {children}
    </PokemonContext.Provider>
  );
};
