/**
 * Sets up the state/store for the app. This combines the reducers, composes
 * with epics (for redux-observable / side effects) and middleware, and
 * creates and exports the store
 */

import * as reduxModule from 'redux';
const { combineReducers, createStore, applyMiddleware, compose } = reduxModule;
import { combineEpics, createEpicMiddleware } from 'redux-observable';

// For development
import { default as reduxImmutableStateInvariant } from 'redux-immutable-state-invariant';
import { logger } from 'redux-logger';

declare const window: any;
declare const module: any;

// Store rerquires at least one reducer function. Remove/replace.
export interface RootState {
  example: {};
}

export const rootReducer = combineReducers<RootState>({
  example: (state = {}) => state,
});

export const rootEpic = combineEpics();

let middleware = [createEpicMiddleware(rootEpic)];
let composeEnhancers = compose;

// Set up debugging, especially for redux
if (__DEV__) {
  // Currently required to use Redux v4 with redux devtools
  // See: https://github.com/gaearon/redux-devtools/issues/391
  // TODO remove once redux-devtools supports Redux v4
  (reduxModule as any).__DO_NOT_USE__ActionTypes.INIT = '@@redux/INIT';
  (reduxModule as any).__DO_NOT_USE__ActionTypes.REPLACE = '@@redux/REPLACE';

  // Force immutable state for redux during dev and add additional logging
  middleware = [...middleware, reduxImmutableStateInvariant(), logger];

  // tslint:disable-next-line:max-line-length
  // See: https://github.com/jhen0409/react-native-debugger/blob/master/docs/redux-devtools-integration.md
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ serialize: true })
    : compose;
}

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);

// Allow for hot reloading with redux. See:
// https://github.com/reactjs/react-redux/releases/tag/v2.0.0
if (module.hot) {
  store.replaceReducer(rootReducer);
}
