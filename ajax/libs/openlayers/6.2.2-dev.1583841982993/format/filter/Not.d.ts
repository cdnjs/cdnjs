export default Not;
/**
 * @classdesc
 * Represents a logical `<Not>` operator for a filter condition.
 * @api
 */
declare class Not extends Filter {
    /**
     * @param {!import("./Filter.js").default} condition Filter condition.
     */
    constructor(condition: Filter);
    /**
     * @type {!import("./Filter.js").default}
     */
    condition: import("./Filter.js").default;
}
import Filter from "./Filter.js";
//# sourceMappingURL=Not.d.ts.map