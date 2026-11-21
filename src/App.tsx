import { Provider } from 'react-redux';
import { store } from './store';
import { ServiceForm } from './components/ServiceForm';
import { SearchFilter } from './components/SearchFilter';
import { ServiceList } from './components/ServiceList';
import './App.css';

export default function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <ServiceForm />
        <SearchFilter />
        <ServiceList />
      </div>
    </Provider>
  );
}
