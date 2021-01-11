import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import reducer from '../reducers';


export const history = createBrowserHistory();

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
export const store = createStore(
    reducer(history),
    composeEnhancers(
        applyMiddleware(
            thunk,
            routerMiddleware(history)
        )
    ),
);