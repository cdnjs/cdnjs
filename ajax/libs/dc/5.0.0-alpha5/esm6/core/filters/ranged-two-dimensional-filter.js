export class RangedTwoDimensionalFilter extends Array {
    constructor(filter) {
        super();
        this.filterType = 'RangedTwoDimensionalFilter';
        for (let i = 0; i < filter.length; i++) {
            this[i] = filter[i];
        }
        if (filter[0] instanceof Array) {
            this.fromBottomLeft = [
                [Math.min(filter[0][0], filter[1][0]), Math.min(filter[0][1], filter[1][1])],
                [Math.max(filter[0][0], filter[1][0]), Math.max(filter[0][1], filter[1][1])],
            ];
        }
        else {
            this.fromBottomLeft = [
                [filter[0], -Infinity],
                [filter[1], Infinity],
            ];
        }
    }
    isFiltered(value) {
        let x;
        let y;
        if (value instanceof Array) {
            x = value[0];
            y = value[1];
        }
        else {
            x = value;
            y = this.fromBottomLeft[0][1];
        }
        return (x >= this.fromBottomLeft[0][0] &&
            x < this.fromBottomLeft[1][0] &&
            y >= this.fromBottomLeft[0][1] &&
            y < this.fromBottomLeft[1][1]);
    }
    serialize() {
        return [...this];
    }
}
//# sourceMappingURL=ranged-two-dimensional-filter.js.map