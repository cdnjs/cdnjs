import { filterFactory } from './filters/filter-factory.js';
import { dispatch } from 'd3-dispatch';
export class FilterStorage {
    constructor() {
        this._filters = new Map();
        this._listenerChains = new Map();
        this._filterChangeListener = dispatch('filter-changed');
    }
    onFilterChange(key, callback) {
        this._filterChangeListener.on(`filter-changed.${key}`, callback);
    }
    registerFilterListener(params) {
        const storageKey = params.storageKey;
        if (!this._listenerChains.get(storageKey)) {
            this._listenerChains.set(storageKey, []);
        }
        const listener = Object.assign({}, params);
        this._listenerChains.get(storageKey).push(listener);
        return listener;
    }
    deRegisterFilterListener(storageKey, listener) {
        // exclude this listener and retain the rest
        let listenerChain = this._listenerChains.get(storageKey);
        listenerChain = listenerChain.filter(l => l !== listener);
        this._listenerChains.set(storageKey, listenerChain);
    }
    deRegisterAll() {
        this._filters = new Map();
        this._listenerChains = new Map();
    }
    notifyListeners(storageKey, filters) {
        const listenerChain = this._listenerChains.get(storageKey);
        listenerChain
            .filter(l => typeof l.onFiltersChanged === 'function')
            .forEach(l => {
            l.onFiltersChanged(filters);
        });
        const chartIds = listenerChain.map(lsnr => lsnr.dimId);
        this._filterChangeListener.call('filter-changed', this, {
            chartIds,
            filters: this._filters.get(storageKey),
        });
    }
    setFiltersFor(storageKey, filters) {
        this._filters.set(storageKey, filters);
    }
    getFiltersFor(storageKey) {
        if (!this._filters.get(storageKey)) {
            this._filters.set(storageKey, []);
        }
        return this._filters.get(storageKey);
    }
    resetFiltersAndNotify(storageKey) {
        this.setFiltersAndNotify(storageKey, []);
    }
    setFiltersAndNotify(storageKey, filters) {
        // Update filters in the storage
        this.setFiltersFor(storageKey, filters);
        // Apply filters with the DataProvider - it will update CrossFilter
        // Applying it to just first entry is sufficient as these share the underlying dimension
        const listenerChain = this._listenerChains.get(storageKey);
        if (listenerChain && listenerChain[0]) {
            listenerChain[0].applyFilters(filters);
        }
        // Notify charts that filter has been updated
        this.notifyListeners(storageKey, filters);
    }
    deserializeFiltersSetAndNotify(storageKey, entry) {
        const filters = this._deSerializeFilters(entry.filterType, entry.values);
        this.setFiltersAndNotify(storageKey, filters);
    }
    serialize() {
        // Include items that have active filters
        // In case of Composite charts, include only the parent chart
        return Array.from(this._listenerChains.values())
            .map(listenersList => {
            // check if any item in the list corresponds to a non-child chart
            const listener = listenersList.find(l => l.primaryChart);
            if (listener) {
                const filters = this._filters.get(listener.storageKey);
                if (filters && filters.length > 0) {
                    return this._serializeFilters(listener.dimId, listener.dimLabel, filters);
                }
            }
            return undefined;
        })
            .filter(o => o); // Exclude all undefined
    }
    restore(entries) {
        const listenerChains = Array.from(this._listenerChains.values());
        const filtersToRestore = new Map(entries.map(entry => {
            // Find a listenerChain that has the same dimId registered
            const listenerChain = listenerChains.find((l) => l.find(listener => listener.dimId === entry.dimId));
            // convert to appropriate dc IFilter objects
            const filters = this._deSerializeFilters(entry.filterType, entry.values);
            // pickup storageKey from first entry - all entries will have the same storage key
            const storageKey = listenerChain[0].storageKey;
            return [storageKey, filters];
        }));
        for (const storageKey of this._listenerChains.keys()) {
            // reset a filter if it is not getting restored
            const filters = filtersToRestore.has(storageKey)
                ? filtersToRestore.get(storageKey)
                : [];
            this.setFiltersAndNotify(storageKey, filters);
        }
    }
    _serializeFilters(dimId, dimLabel, filters) {
        if (typeof filters[0].isFiltered !== 'function') {
            return {
                dimId,
                dimLabel,
                filterType: 'Simple',
                values: [...filters], // defensively clone
            };
        }
        const filtersWithType = filters;
        return {
            dimId,
            dimLabel,
            filterType: filtersWithType[0].filterType,
            values: filtersWithType.map(f => f.serialize()),
        };
    }
    _deSerializeFilters(filterType, values) {
        // Simple filters are simple list of items, not need to any additional instantiation
        if (filterType === 'Simple') {
            return values;
        }
        // Lookup filter factory based on the filter type
        const filterCreator = filterFactory[filterType];
        return values.map(f => filterCreator(f));
    }
}
//# sourceMappingURL=filter-storage.js.map