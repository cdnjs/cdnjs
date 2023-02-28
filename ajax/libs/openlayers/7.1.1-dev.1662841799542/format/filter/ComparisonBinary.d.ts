export default ComparisonBinary;
/**
 * @classdesc
 * Abstract class; normally only used for creating subclasses and not instantiated in apps.
 * Base class for WFS GetFeature property binary comparison filters.
 *
 * @abstract
 */
declare class ComparisonBinary extends Comparison {
    /**
     * @param {!string} tagName The XML tag name for this filter.
     * @param {!string} propertyName Name of the context property to compare.
     * @param {!(string|number)} expression The value to compare.
     * @param {boolean} [matchCase] Case-sensitive?
     */
    constructor(tagName: string, propertyName: string, expression: (string | number), matchCase?: boolean | undefined);
    /**
     * @type {!(string|number)}
     */
    expression: (string | number);
    /**
     * @type {boolean|undefined}
     */
    matchCase: boolean | undefined;
}
import Comparison from "./Comparison.js";
//# sourceMappingURL=ComparisonBinary.d.ts.map