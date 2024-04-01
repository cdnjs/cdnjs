export class HierarchyFilter extends Array {
    constructor(path) {
        super();
        this.filterType = 'HierarchyFilter';
        for (let i = 0; i < path.length; i++) {
            this[i] = path[i];
        }
    }
    isFiltered(value) {
        const filter = this;
        if (!(filter.length && value && value.length && value.length >= filter.length)) {
            return false;
        }
        for (let i = 0; i < filter.length; i++) {
            if (value[i] !== filter[i]) {
                return false;
            }
        }
        return true;
    }
    serialize() {
        return [...this];
    }
}
//# sourceMappingURL=hierarchy-filter.js.map