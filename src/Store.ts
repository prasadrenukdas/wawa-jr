import * as reduxModule from 'redux';
const { combineReducers, createStore, applyMiddleware, compose } = reduxModule;
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { default as reduxImmutableStateInvariant } from 'redux-immutable-state-invariant';
import { logger } from 'redux-logger';

declare const window: any;
declare const module: any;

export interface RootState {}

export const rootReducer = combineReducers<RootState>({
  example: (state = {}) => state,
});

export const rootEpic = combineEpics();

let middleware = [createEpicMiddleware(rootEpic)];
let composeEnhancers = compose;

if (__DEV__) {
  // Currently required to use Redux v4 with redux devtools
  (reduxModule as any).__DO_NOT_USE__ActionTypes.INIT = '@@redux/INIT';
  (reduxModule as any).__DO_NOT_USE__ActionTypes.REPLACE = '@@redux/REPLACE';

  middleware = [...middleware, reduxImmutableStateInvariant(), logger];
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ serialize: true })
    : compose;
}

export const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(...middleware)),
);

// Allow for hot reloading with redux. See:
// https://github.com/reactjs/react-redux/releases/tag/v2.0.0
if (module.hot) {
  store.replaceReducer(rootReducer);
}
