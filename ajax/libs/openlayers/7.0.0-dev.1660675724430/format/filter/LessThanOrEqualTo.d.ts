export default LessThanOrEqualTo;
/**
 * @classdesc
 * Represents a `<PropertyIsLessThanOrEqualTo>` comparison operator.
 * @api
 */
declare class LessThanOrEqualTo extends ComparisonBinary {
    /**
     * @param {!string} propertyName Name of the context property to compare.
     * @param {!number} expression The value to compare.
     */
    constructor(propertyName: string, expression: number);
}
import ComparisonBinary from "./ComparisonBinary.js";
//# sourceMappingURL=LessThanOrEqualTo.d.ts.map