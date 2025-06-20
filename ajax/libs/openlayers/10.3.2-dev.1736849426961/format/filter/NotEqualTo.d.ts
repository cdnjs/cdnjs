export default NotEqualTo;
/**
 * @classdesc
 * Represents a `<PropertyIsNotEqualTo>` comparison operator.
 * @api
 */
declare class NotEqualTo extends ComparisonBinary {
    /**
     * @param {!string} propertyName Name of the context property to compare.
     * @param {!(string|number)} expression The value to compare.
     * @param {boolean} [matchCase] Case-sensitive?
     */
    constructor(propertyName: string, expression: (string | number), matchCase?: boolean);
}
import ComparisonBinary from './ComparisonBinary.js';
//# sourceMappingURL=NotEqualTo.d.ts.map