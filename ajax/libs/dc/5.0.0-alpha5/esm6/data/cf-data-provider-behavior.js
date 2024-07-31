export const cfDataProviderBehavior = {
    applyFilters: (dimension, filters) => {
        if (!(dimension && dimension.filter)) {
            return;
        }
        if (filters.length === 0) {
            dimension.filter(null);
        }
        else if (filters.length === 1 && !filters[0].isFiltered) {
            // single value and not a function-based filter
            dimension.filterExact(filters[0]);
        }
        else if (filters.length === 1 && filters[0].filterType === 'RangedFilter') {
            // single range-based filter
            dimension.filterRange(filters[0]);
        }
        else {
            dimension.filterFunction(d => {
                for (let i = 0; i < filters.length; i++) {
                    const filter = filters[i];
                    if (filter.isFiltered) {
                        if (filter.isFiltered(d)) {
                            return true;
                        }
                    }
                    else if (filter <= d && filter >= d) {
                        return true;
                    }
                }
                return false;
            });
        }
    },
    storageKey: (provider) => {
        const { shareFilters, dimension } = provider.conf();
        if (shareFilters) {
            return dimension;
        }
        else {
            return provider;
        }
    },
    getGroupings: (dimension, group, chartId) => {
        return group.all();
    },
};
//# sourceMappingURL=cf-data-provider-behavior.js.map