import { type FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

export function ServiceForm() {
    const dispatch = useDispatch();
    const { name, price, editingId, errors } = useSelector((state: RootState) => state.form);

    // Locate the current service in the list to display its original name while it is being edited.
    const editingService = useSelector((state: RootState) =>
        editingId ? state.services.items.find((item) => item.id === editingId) : null
    );

    // Validation function
    const validateForm = (): boolean => {
        let isValid = true;
        const trimmedName = name.trim();
        const numericPrice = Number(price);

        if (trimmedName.length < 2) {
            dispatch({
                type: 'SET_VALIDATION_ERROR',
                payload: { field: 'name', error: 'Название услуги должно состоять как минимум из 2 символов' },
            });
            isValid = false;
        }

        if (!price.trim() || isNaN(numericPrice) || numericPrice <= 0) {
            dispatch({
                type: 'SET_VALIDATION_ERROR',
                payload: { field: 'price', error: 'Цена должна быть числом больше 0' },
            });
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (editingId) {
            // Edit Mode: update the existing record
            dispatch({
                type: 'UPDATE_SERVICE',
                payload: { id: editingId, name: name.trim(), price: Number(price) },
            });
        } else {
            // Creation Mode: add a new one
            dispatch({
                type: 'ADD_SERVICE',
                payload: { name: name.trim(), price: Number(price) },
            });
        }

        dispatch({ type: 'CLEAR_FORM' });
    };

    return (
        <div className={`form-wrapper ${editingId ? 'editing-mode' : 'adding-mode'}`}>
            <div className="mode-badge">
                {editingService ? (
                    <span>✏️ Редактирование: <strong>{editingService.name}</strong></span>
                ) : (
                        <span>➕ Добавить новую услугу</span>
                )}
            </div>

            <form onSubmit={handleSubmit} className="service-form">
                <div className="input-name">
                    <input
                        type="text"
                        placeholder="Название услуги"
                        value={name}
                        onChange={(e) =>
                            dispatch({
                                type: 'SET_FORM_FIELD',
                                payload: { field: 'name', value: e.target.value },
                            })
                        }
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="input-price">
                    <input
                        type="number"
                        placeholder="Цена"
                        value={price}
                        onChange={(e) =>
                            dispatch({
                                type: 'SET_FORM_FIELD',
                                payload: { field: 'price', value: e.target.value },
                            })
                        }
                    />
                    {errors.price && <span className="error-text">{errors.price}</span>}
                </div>

                <div className="button-group">
                    <button type="submit">Save</button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={() => dispatch({ type: 'CANCEL_EDITING' })}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
