import { POKEMON } from '../actions/types';

const initialState = {
    pokemonList: [],
    filteredPokemonList: []
}

const pokedexReducer = (state = initialState, actions) => {
    switch(actions.type) {
        case POKEMON.GET_POKEMON_LIST_SUCCESS:
            return {
                ...state,
                pokemonList: [...actions.payload.pokemonList],
                filteredPokemonList: [...actions.payload.pokemonList]
            }
        case POKEMON.POKEMON_FILTER_SUCCESS: 
            return {
                ...state,
                filteredPokemonList: [...actions.payload.filteredPokemonList]
            }
        default:
            return {
                ...state
            }
    }
}

export default pokedexReducer;