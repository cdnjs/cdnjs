export default During;
/**
 * @classdesc
 * Represents a `<During>` comparison operator.
 * @api
 */
declare class During extends Comparison {
    /**
     * @param {!string} propertyName Name of the context property to compare.
     * @param {!string} begin The begin date in ISO-8601 format.
     * @param {!string} end The end date in ISO-8601 format.
     */
    constructor(propertyName: string, begin: string, end: string);
    /**
     * @type {!string}
     */
    begin: string;
    /**
     * @type {!string}
     */
    end: string;
}
import Comparison from './Comparison.js';
//# sourceMappingURL=During.d.ts.map