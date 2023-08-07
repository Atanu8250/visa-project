import thunk from "redux-thunk";
import { legacy_createStore, applyMiddleware, compose, combineReducers } from "redux";

declare global {
     interface Window {
          __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
     }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const RootReducers = {
}

export const store = legacy_createStore(combineReducers(RootReducers), composeEnhancers(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;