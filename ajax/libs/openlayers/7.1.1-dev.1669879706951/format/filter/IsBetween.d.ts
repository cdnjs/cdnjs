export default IsBetween;
/**
 * @classdesc
 * Represents a `<PropertyIsBetween>` comparison operator.
 * @api
 */
declare class IsBetween extends Comparison {
    /**
     * @param {!string} propertyName Name of the context property to compare.
     * @param {!number} lowerBoundary The lower bound of the range.
     * @param {!number} upperBoundary The upper bound of the range.
     */
    constructor(propertyName: string, lowerBoundary: number, upperBoundary: number);
    /**
     * @type {!number}
     */
    lowerBoundary: number;
    /**
     * @type {!number}
     */
    upperBoundary: number;
}
import Comparison from "./Comparison.js";
//# sourceMappingURL=IsBetween.d.ts.map