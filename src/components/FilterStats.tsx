import { useSelector } from 'react-redux';
import { selectFilterStats } from '../store/selectors';

export function FilterStats() {
    const { found, total } = useSelector(selectFilterStats);

    return (
        <p className="total-count">
            Найдено: <strong>{found}</strong> из <strong>{total}</strong> услуг
        </p>
    );
}
