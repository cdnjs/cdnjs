export default Comparison;
/**
 * @classdesc
 * Abstract class; normally only used for creating subclasses and not instantiated in apps.
 * Base class for WFS GetFeature property comparison filters.
 *
 * @abstract
 */
declare class Comparison extends Filter {
    /**
     * @param {!string} tagName The XML tag name for this filter.
     * @param {!string} propertyName Name of the context property to compare.
     */
    constructor(tagName: string, propertyName: string);
    /**
     * @type {!string}
     */
    propertyName: string;
}
import Filter from "./Filter.js";
//# sourceMappingURL=Comparison.d.ts.map