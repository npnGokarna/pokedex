import axios from 'axios';
import { POKEMON } from './types';

const configRequest = (method) => {
    return (url) => {
        return {
            method, url
        }
    }
}

const pokemonFetchSuccess = (pokemonList) => {
    return {
        type: POKEMON.GET_POKEMON_LIST_SUCCESS,
        payload: {
            pokemonList: pokemonList || []
        }
    }
}

const pokemonFetchError = (err) => {
    console.log(err);
}

export const getPokemonList = () => {
    return async (dispatch) => {
        try {
            const request = configRequest('get')('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json');
            const response = await axios(request);
            const data = ((response || {}).data || {}).pokemon;
            return dispatch(pokemonFetchSuccess(data));
        }
        catch(e) {
            pokemonFetchError(e);
        }
    }
}

export const filterPokemonList = (list, types, weakness) => {
    return dispatch => {
        let finalFilteredList;
        if (!types.length && !weakness.length) {
            finalFilteredList = [...list];
        } else {
            finalFilteredList = list.filter(item => 
                types.every(value => item.type.includes(value)) &&
                weakness.every(value => item.weaknesses.includes(value))
            )
        }
        return dispatch({
            type: POKEMON.POKEMON_FILTER_SUCCESS,
            payload: {
                filteredPokemonList: finalFilteredList
            }
        })
    }
}