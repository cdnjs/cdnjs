export default LessThan;
/**
 * @classdesc
 * Represents a `<PropertyIsLessThan>` comparison operator.
 * @api
 */
declare class LessThan extends ComparisonBinary {
    /**
     * @param {!string} propertyName Name of the context property to compare.
     * @param {!number} expression The value to compare.
     */
    constructor(propertyName: string, expression: number);
}
import ComparisonBinary from "./ComparisonBinary.js";
//# sourceMappingURL=LessThan.d.ts.map