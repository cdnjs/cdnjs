export default LogicalNary;
/**
 * @classdesc
 * Abstract class; normally only used for creating subclasses and not instantiated in apps.
 * Base class for WFS GetFeature n-ary logical filters.
 *
 * @abstract
 */
declare class LogicalNary extends Filter {
    /**
     * @param {!string} tagName The XML tag name for this filter.
     * @param {Array<import("./Filter.js").default>} conditions Conditions.
     */
    constructor(tagName: string, conditions: Filter[]);
    /**
     * @type {Array<import("./Filter.js").default>}
     */
    conditions: Array<import("./Filter.js").default>;
}
import Filter from "./Filter.js";
//# sourceMappingURL=LogicalNary.d.ts.map