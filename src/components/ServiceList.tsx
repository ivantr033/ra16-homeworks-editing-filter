import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredServices } from '../store/selectors';
import { FilterStats } from './FilterStats';

export function ServiceList() {
    const dispatch = useDispatch();
    const items = useSelector(selectFilteredServices);

    return (
        <div className="list-wrapper">
            <FilterStats />

            {items.length === 0 ? (
                <p className="no-results">Услуги не найдены</p>
            ) : (
                <ul className="service-list">
                    {items.map((service) => (
                        <li key={service.id} className="service-item">
                            <span>
                                {service.name} <strong>{service.price}</strong>
                            </span>
                            <div className="item-actions">
                                <button
                                    type="button"
                                    title="Редактировать"
                                    onClick={() => dispatch({ type: 'START_EDITING', payload: { service } })}
                                >
                                    ✎
                                </button>
                                <button
                                    type="button"
                                    title="Удалить"
                                    onClick={() => dispatch({ type: 'DELETE_SERVICE', payload: { id: service.id } })}
                                >
                                    ✕
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
