import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import pokedexReducer from './pokedexReducer';

const reducer = (history) => combineReducers({
    router: connectRouter(history),
    pokedexReducer
});

export default reducer;