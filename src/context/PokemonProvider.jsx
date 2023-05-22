import { useEffect, useState } from "react";
import { PokemonContext } from "./PokemonContext";
import { useForm } from "../hooks/useForm";

export const PokemonProvider = ({children}) => {

    //states con los arrays de pokemones y offset para ir de 50 en 50
    const [allPokemons, setAllPokemons] = useState([]);
    const [limitPokemons, setLimitPokemons] = useState([]);
    const [offset, setOffset] = useState(0);

    //Hook useForm => reset de form
    const {valueSearch, onResetForm, onInputChange} = useForm({
        valueSearch: ''
    })

    //states de loading de data y filtrado
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(false);

    let baseUrl = 'https://pokeapi.co/api/v2/';
    //Conectamos a la API => pedido de 50 pokemons
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
        //Se van a ir cargando y agregando de 50 en 50 con spread operator
        setLimitPokemons([
            ...limitPokemons,
            ...results
        ]);
        //termina de cargar todos los pedidos
        setLoading(false);
    };

    //pedido de TODOS los pokemons
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

    //pedido de pokemon por ID
    const getPokemonById = async(id) => {
        const res = await fetch(`${baseUrl}pokemon/${id}`);
        const data = await res.json();
        return data;
    };

    //funcion de cargar más pokemons en home
    const loadMore = () => {
        setOffset(offset + 50)
    };

    //vuelve a hacer un pedido con +50 pokemons 
    useEffect(() => {
        getLimitPokemons();
    }, [offset]);

    useEffect(() => {
        getAllPokemons();
    }, []);

    //Filtrados y state
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [typeSelected, setTypeSelected] = useState({
        grass: false,
		normal: false,
		fighting: false,
		flying: false,
		poison: false,
		ground: false,
		rock: false,
		bug: false,
		ghost: false,
		steel: false,
		fire: false,
		water: false,
		electric: false,
		psychic: false,
		ice: false,
		dragon: false,
		dark: false,
		fairy: false,
		unknow: false,
		shadow: false,
    });

    //Manejador checkboxs de filtrado por tipo
    const handleCheckbox = (e) => {
        //e.target.name => name de los checkboxs (water, fire, ice...) / e.target.checked => true o false si son o no clickeados
        setTypeSelected({
            ...typeSelected,
            [e.target.name]: e.target.checked
        });

        //Si se filtra por tipo envía al home los pokemons sino los quita y actualiza
        if(e.target.checked) {
            const filteredResults = allPokemons.filter(pokemon => pokemon.types.map(type => type.type.name).includes(e.target.name));
            setFilteredPokemons([...filteredPokemons, ...filteredResults]);
        } else {
            const filteredResults = filteredPokemons.filter(pokemon => !pokemon.types.map(type => type.type.name).includes(e.target.name));
            setFilteredPokemons([...filteredResults]);
        }
    };

  return (
    <PokemonContext.Provider
    value={{
        valueSearch,
        onInputChange,
        onResetForm,
        allPokemons,
        limitPokemons,
        getPokemonById,
        loadMore,
        loading,
        setLoading,
        active,
        setActive,
        handleCheckbox,
        filteredPokemons
    }}>
        {children}
    </PokemonContext.Provider>
  );
};
