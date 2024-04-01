export class RangedFilter extends Array {
    constructor(low, high) {
        super();
        this.filterType = 'RangedFilter';
        this[0] = low;
        this[1] = high;
    }
    isFiltered(value) {
        return value >= this[0] && value < this[1];
    }
    serialize() {
        return [...this];
    }
}
//# sourceMappingURL=ranged-filter.js.map