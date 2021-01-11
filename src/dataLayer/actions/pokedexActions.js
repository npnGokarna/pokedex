import axios from 'axios';
import { POKEMON } from './types';


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

const configRequest = (method) => {
    return (url) => {
        return {
            method, url
        }
    }
}