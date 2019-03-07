import * as redux from 'redux';
import logger from 'redux-logger';
import questionnaire from '../reducers/questionnaire';
import { Store } from '../interfaces/Store';
import application from '../reducers/application'


export const createStore = (initialState?: Store) => redux.createStore(
    redux.combineReducers({
        questionnaire,
        application
    }),
    initialState,
    redux.applyMiddleware(logger),
);

export const store = createStore();