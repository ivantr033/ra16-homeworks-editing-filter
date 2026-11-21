import { nanoid } from 'nanoid';
import { ServicesState, ServicesAction } from './types';

const initialState: ServicesState = {
    items: [
        { id: nanoid(), name: 'Замена стекла', price: 21000 },
        { id: nanoid(), name: 'Замена дисплея', price: 25000 },
    ],
};

export function servicesReducer(
    state = initialState,
    action: ServicesAction
): ServicesState {
    switch (action.type) {
        case 'ADD_SERVICE': {
            const newService = {
                id: nanoid(),
                name: action.payload.name,
                price: action.payload.price,
            };
            return { ...state, items: [...state.items, newService] };
        }

        case 'UPDATE_SERVICE':
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, name: action.payload.name, price: action.payload.price }
                        : item
                ),
            };

        case 'DELETE_SERVICE':
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload.id),
            };

        default:
            return state;
    }
}
