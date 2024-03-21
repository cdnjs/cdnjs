export class FilterHandler {
    constructor() {
        this._filters = []; // TODO: find better types
    }
    get filters() {
        return this._filters;
    }
    set filters(value) {
        this._filters = value;
    }
    /**
     * Check whether any active filter or a specific filter is associated.
     */
    hasFilter(filter) {
        if (filter === null || typeof filter === 'undefined') {
            return this.filters.length > 0;
        }
        return this.filters.some(f => filter <= f && filter >= f);
    }
    /**
     * Different data backends will implement it differently.
     * Crossfilter version will apply the filter onto the corresponding dimension.
     */
    applyFilters() {
        // do nothing at this level, derived classes will actually implement it
    }
    /**
     * This will notify charts that filters have changed.
     * It will be implemented in one of derived classes.
     */
    notifyListeners(filter) { }
    filter(filter) {
        if (!arguments.length) {
            return this.filters.length > 0 ? this.filters[0] : null;
        }
        if (filter === null) {
            this.resetFilters();
        }
        else if (filter instanceof Array &&
            filter[0] instanceof Array &&
            !filter.isFiltered) {
            // list of filters
            filter[0].forEach(f => this.toggleFilter(f));
        }
        else {
            this.toggleFilter(filter);
        }
        this.applyFilters();
        this.notifyListeners(filter);
        return this;
    }
    toggleFilter(filter) {
        if (this.hasFilter(filter)) {
            this.removeFilter(filter);
        }
        else {
            this.addFilter(filter);
        }
    }
    /**
     * Add this filter to existing filters.
     *
     * Override this if you need to alter the default behaviour of this filter to be just appended to the current list.
     *
     * TODO: link to example
     */
    addFilter(f) {
        this.filters.push(f);
    }
    /**
     * Remove this filter from existing filters.
     *
     * Override this if you need to alter the default behaviour of this filter to be just removed from the current list.
     *
     * TODO: link to example
     */
    removeFilter(filter) {
        this.filters = this.filters.filter(f => !(filter <= f && filter >= f));
    }
    /**
     * Clear current filters.
     */
    resetFilters() {
        this.filters = [];
    }
    /**
     * An opportunity to cleanup.
     */
    dispose() {
        // use this to cleanup before discarding
    }
}
//# sourceMappingURL=filter-handler.js.map