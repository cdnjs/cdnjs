export default IsLike;
/**
 * @classdesc
 * Represents a `<PropertyIsLike>` comparison operator.
 * @api
 */
declare class IsLike extends Comparison {
    /**
     * [constructor description]
     * @param {!string} propertyName Name of the context property to compare.
     * @param {!string} pattern Text pattern.
     * @param {string} [wildCard] Pattern character which matches any sequence of
     *    zero or more string characters. Default is '*'.
     * @param {string} [singleChar] pattern character which matches any single
     *    string character. Default is '.'.
     * @param {string} [escapeChar] Escape character which can be used to escape
     *    the pattern characters. Default is '!'.
     * @param {boolean} [matchCase] Case-sensitive?
     */
    constructor(propertyName: string, pattern: string, wildCard?: string | undefined, singleChar?: string | undefined, escapeChar?: string | undefined, matchCase?: boolean | undefined);
    /**
     * @type {!string}
     */
    pattern: string;
    /**
     * @type {!string}
     */
    wildCard: string;
    /**
     * @type {!string}
     */
    singleChar: string;
    /**
     * @type {!string}
     */
    escapeChar: string;
    /**
     * @type {boolean|undefined}
     */
    matchCase: boolean | undefined;
}
import Comparison from "./Comparison.js";
//# sourceMappingURL=IsLike.d.ts.map