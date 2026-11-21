import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

export function SearchFilter() {
    const dispatch = useDispatch();
    const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClear = () => {
        dispatch({ type: 'CLEAR_SEARCH' });
        inputRef.current?.focus(); // Maintains focus on the input when clearing
    };

    return (
        <div className="search-wrapper">
            <input
                ref={inputRef}
                type="text"
                placeholder="Поиск услуг..."
                value={searchTerm}
                onChange={(e) =>
                    dispatch({
                        type: 'SET_SEARCH_TERM',
                        payload: { searchTerm: e.target.value },
                    })
                }
            />
            {searchTerm && (
                <button
                    type="button"
                    className="clear-search-btn"
                    title="Очистить поиск"
                    onClick={handleClear}
                >
                    ✕
                </button>
            )}
        </div>
    );
}
