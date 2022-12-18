export default EqualTo;
/**
 * @classdesc
 * Represents a `<PropertyIsEqualTo>` comparison operator.
 * @api
 */
declare class EqualTo extends ComparisonBinary {
    /**
     * @param {!string} propertyName Name of the context property to compare.
     * @param {!(string|number)} expression The value to compare.
     * @param {boolean} [opt_matchCase] Case-sensitive?
     */
    constructor(propertyName: string, expression: string | number, opt_matchCase?: boolean | undefined);
}
import ComparisonBinary from "./ComparisonBinary.js";
//# sourceMappingURL=EqualTo.d.ts.map