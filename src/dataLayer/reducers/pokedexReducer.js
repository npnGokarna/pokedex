import { POKEMON } from '../actions/types';

const initialState = {
    pokemonList: []
}

const pokedexReducer = (state = initialState, actions) => {
    if(actions.type === POKEMON.GET_POKEMON_LIST_SUCCESS) {
        return {
            ...state,
            pokemonList: [...actions.payload.pokemonList]
        }
    } else {
        return state;
    }
}

export default pokedexReducer;