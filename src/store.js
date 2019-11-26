import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {createLogger} from 'redux-logger'
import mainSaga from './saga';
import {entitiesReducer} from './ducks/entities'

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(createLogger({collapsed: true}), sagaMiddleware),
);


const store = createStore(
    combineReducers({
        entities: entitiesReducer,
    }),
    enhancer,
);

sagaMiddleware.run(mainSaga);
window.store = store;

export default store;
