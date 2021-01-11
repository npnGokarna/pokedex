import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import  { history, store } from './dataLayer/store';
import PokemonList from './screens/PokemonList';
import PokemonDetails from './screens/PokemonDetails';

function AppRouter() {
  return (
    <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route exact path={["/"]} component={PokemonList} />
          <Route exact path={["/:pokemonName"]} component={PokemonDetails}/>
        </ConnectedRouter>
    </Provider>
  );
}

export default AppRouter;
