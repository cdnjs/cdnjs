var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/format/filter/IsLike
 */
import Comparison from './Comparison.js';
/**
 * @classdesc
 * Represents a `<PropertyIsLike>` comparison operator.
 * @api
 */
var IsLike = /** @class */ (function (_super) {
    __extends(IsLike, _super);
    /**
     * [constructor description]
     * @param {!string} propertyName Name of the context property to compare.
     * @param {!string} pattern Text pattern.
     * @param {string=} opt_wildCard Pattern character which matches any sequence of
     *    zero or more string characters. Default is '*'.
     * @param {string=} opt_singleChar pattern character which matches any single
     *    string character. Default is '.'.
     * @param {string=} opt_escapeChar Escape character which can be used to escape
     *    the pattern characters. Default is '!'.
     * @param {boolean=} opt_matchCase Case-sensitive?
     */
    function IsLike(propertyName, pattern, opt_wildCard, opt_singleChar, opt_escapeChar, opt_matchCase) {
        var _this = _super.call(this, 'PropertyIsLike', propertyName) || this;
        /**
         * @type {!string}
         */
        _this.pattern = pattern;
        /**
         * @type {!string}
         */
        _this.wildCard = (opt_wildCard !== undefined) ? opt_wildCard : '*';
        /**
         * @type {!string}
         */
        _this.singleChar = (opt_singleChar !== undefined) ? opt_singleChar : '.';
        /**
         * @type {!string}
         */
        _this.escapeChar = (opt_escapeChar !== undefined) ? opt_escapeChar : '!';
        /**
         * @type {boolean|undefined}
         */
        _this.matchCase = opt_matchCase;
        return _this;
    }
    return IsLike;
}(Comparison));
export default IsLike;
//# sourceMappingURL=IsLike.js.map