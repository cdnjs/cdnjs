export class TwoDimensionalFilter extends Array {
    constructor(filter) {
        super();
        this.filterType = 'TwoDimensionalFilter';
        this[0] = filter[0];
        this[1] = filter[1];
    }
    isFiltered(value) {
        return (value.length &&
            value.length === this.length &&
            value[0] === this[0] &&
            value[1] === this[1]);
    }
    serialize() {
        return [...this];
    }
}
//# sourceMappingURL=two-dimensional-filter.js.map