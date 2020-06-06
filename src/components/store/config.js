import { createStore, compose, applyMiddleware } from "redux";
import promiseMiddleware from 'redux-promise';
import Reducers from "./reducers";

let reduxCompose = compose;

//for dev enviroment use reduxCompose
if (__DEV__) {
    reduxCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

//for the redux store
const configureStore = () => {
    return createStore(Reducers, reduxCompose(applyMiddleware(promiseMiddleware)))
}

export default configureStore;

