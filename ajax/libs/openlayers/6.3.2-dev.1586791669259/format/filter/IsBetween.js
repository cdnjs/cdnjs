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
 * @module ol/format/filter/IsBetween
 */
import Comparison from './Comparison.js';
/**
 * @classdesc
 * Represents a `<PropertyIsBetween>` comparison operator.
 * @api
 */
var IsBetween = /** @class */ (function (_super) {
    __extends(IsBetween, _super);
    /**
     * @param {!string} propertyName Name of the context property to compare.
     * @param {!number} lowerBoundary The lower bound of the range.
     * @param {!number} upperBoundary The upper bound of the range.
     */
    function IsBetween(propertyName, lowerBoundary, upperBoundary) {
        var _this = _super.call(this, 'PropertyIsBetween', propertyName) || this;
        /**
         * @type {!number}
         */
        _this.lowerBoundary = lowerBoundary;
        /**
         * @type {!number}
         */
        _this.upperBoundary = upperBoundary;
        return _this;
    }
    return IsBetween;
}(Comparison));
export default IsBetween;
//# sourceMappingURL=IsBetween.js.map