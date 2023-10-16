export default GreaterThanOrEqualTo;
/**
 * @classdesc
 * Represents a `<PropertyIsGreaterThanOrEqualTo>` comparison operator.
 * @api
 */
declare class GreaterThanOrEqualTo extends ComparisonBinary {
    /**
     * @param {!string} propertyName Name of the context property to compare.
     * @param {!number} expression The value to compare.
     */
    constructor(propertyName: string, expression: number);
}
import ComparisonBinary from './ComparisonBinary.js';
//# sourceMappingURL=GreaterThanOrEqualTo.d.ts.map