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
 * @module ol/format/filter/LessThanOrEqualTo
 */
import ComparisonBinary from './ComparisonBinary.js';
/**
 * @classdesc
 * Represents a `<PropertyIsLessThanOrEqualTo>` comparison operator.
 * @api
 */
var LessThanOrEqualTo = /** @class */ (function (_super) {
    __extends(LessThanOrEqualTo, _super);
    /**
     * @param {!string} propertyName Name of the context property to compare.
     * @param {!number} expression The value to compare.
     */
    function LessThanOrEqualTo(propertyName, expression) {
        return _super.call(this, 'PropertyIsLessThanOrEqualTo', propertyName, expression) || this;
    }
    return LessThanOrEqualTo;
}(ComparisonBinary));
export default LessThanOrEqualTo;
//# sourceMappingURL=LessThanOrEqualTo.js.map