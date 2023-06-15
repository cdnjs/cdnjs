export default GreaterThan;
/**
 * @classdesc
 * Represents a `<PropertyIsGreaterThan>` comparison operator.
 * @api
 */
declare class GreaterThan extends ComparisonBinary {
    /**
     * @param {!string} propertyName Name of the context property to compare.
     * @param {!number} expression The value to compare.
     */
    constructor(propertyName: string, expression: number);
}
import ComparisonBinary from "./ComparisonBinary.js";
//# sourceMappingURL=GreaterThan.d.ts.map