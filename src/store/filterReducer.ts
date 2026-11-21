import { FilterState, FilterAction } from './types';

const initialState: FilterState = {
    searchTerm: '',
};

export function filterReducer(
    state = initialState,
    action: FilterAction
): FilterState {
    switch (action.type) {
        case 'SET_SEARCH_TERM':
            return { ...state, searchTerm: action.payload.searchTerm };
        case 'CLEAR_SEARCH':
            return { ...state, searchTerm: '' };
        default:
            return state;
    }
}
