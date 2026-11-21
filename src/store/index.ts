import { legacy_createStore as createStore, combineReducers } from 'redux';
import { servicesReducer } from './servicesReducer';
import { formReducer } from './formReducer';
import { filterReducer } from './filterReducer';

const rootReducer = combineReducers({
    services: servicesReducer,
    form: formReducer,
    filter: filterReducer, // HOMEWORK 2
});

// Automatically extract the type of our entire global state
export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
