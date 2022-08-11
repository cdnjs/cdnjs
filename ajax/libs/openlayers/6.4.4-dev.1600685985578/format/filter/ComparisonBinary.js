var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/format/filter/ComparisonBinary
 */
import Comparison from './Comparison.js';
/**
 * @classdesc
 * Abstract class; normally only used for creating subclasses and not instantiated in apps.
 * Base class for WFS GetFeature property binary comparison filters.
 *
 * @abstract
 */
var ComparisonBinary = /** @class */ (function (_super) {
    __extends(ComparisonBinary, _super);
    /**
     * @param {!string} tagName The XML tag name for this filter.
     * @param {!string} propertyName Name of the context property to compare.
     * @param {!(string|number)} expression The value to compare.
     * @param {boolean=} opt_matchCase Case-sensitive?
     */
    function ComparisonBinary(tagName, propertyName, expression, opt_matchCase) {
        var _this = _super.call(this, tagName, propertyName) || this;
        /**
         * @type {!(string|number)}
         */
        _this.expression = expression;
        /**
         * @type {boolean|undefined}
         */
        _this.matchCase = opt_matchCase;
        return _this;
    }
    return ComparisonBinary;
}(Comparison));
export default ComparisonBinary;
//# sourceMappingURL=ComparisonBinary.js.map