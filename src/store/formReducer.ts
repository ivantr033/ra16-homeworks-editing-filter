import { FormState, FormAction } from './types';

const initialState: FormState = {
    name: '',
    price: '',
    editingId: null,
    errors: {},
};

export function formReducer(
    state = initialState,
    action: FormAction
): FormState {
    switch (action.type) {
        case 'SET_FORM_FIELD':
            return {
                ...state,
                [action.payload.field]: action.payload.value,
                // Clear the error for that field as soon as the user begins making corrections
                errors: {
                    ...state.errors,
                    [action.payload.field]: undefined,
                },
            };

        case 'START_EDITING':
            return {
                name: action.payload.service.name,
                price: String(action.payload.service.price),
                editingId: action.payload.service.id,
                errors: {},
            };

        case 'CANCEL_EDITING':
        case 'CLEAR_FORM':
            return initialState;

        case 'SET_VALIDATION_ERROR':
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.payload.field]: action.payload.error,
                },
            };

        case 'DELETE_SERVICE':
            // Reset the form if the user deleted the very service he was editing
            if (state.editingId === action.payload.id) {
                return initialState;
            }
            return state;

        default:
            return state;
    }
}
