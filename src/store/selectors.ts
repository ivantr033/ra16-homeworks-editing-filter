import { createSelector } from 'reselect';
import { RootState } from './index';

// Selector that returns only the services that match the search
export const selectFilteredServices = createSelector(
    [
        (state: RootState) => state.services.items,
        (state: RootState) => state.filter.searchTerm,
    ],
    (services, searchTerm) => {
        if (!searchTerm.trim()) {
            return services;
        }
        return services.filter((service) =>
            service.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
);

// Selector that calculates the number of services found versus the total
export const selectFilterStats = createSelector(
    [selectFilteredServices, (state: RootState) => state.services.items],
    (filteredServices, allServices) => ({
        found: filteredServices.length,
        total: allServices.length,
    })
);
