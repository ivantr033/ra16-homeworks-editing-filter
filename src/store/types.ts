export interface Service {
    id: string;
    name: string;
    price: number;
}

export interface FormErrors {
    name?: string;
    price?: string;
}

export interface ServicesState {
    items: Service[];
}

export interface FormState {
    name: string;
    price: string;
    editingId: string | null;
    errors: FormErrors;
}

// Actions for the services list
export type ServicesAction =
    | { type: 'ADD_SERVICE'; payload: { name: string; price: number } }
    | { type: 'UPDATE_SERVICE'; payload: { id: string; name: string; price: number } }
    | { type: 'DELETE_SERVICE'; payload: { id: string } };

// Actions for the form
export type FormAction =
    | { type: 'SET_FORM_FIELD'; payload: { field: 'name' | 'price'; value: string } }
    | { type: 'START_EDITING'; payload: { service: Service } }
    | { type: 'CANCEL_EDITING' }
    | { type: 'CLEAR_FORM' }

    | { type: 'SET_VALIDATION_ERROR'; payload: { field: 'name' | 'price'; error: string } }
    | { type: 'DELETE_SERVICE'; payload: { id: string } }; // Listen for whether the item being edited is deleted

// ********** HOMEWORK 2 **********
export interface FilterState {
    searchTerm: string;
}

export type FilterAction =
    | { type: 'SET_SEARCH_TERM'; payload: { searchTerm: string } }
    | { type: 'CLEAR_SEARCH' };
