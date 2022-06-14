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
 * @module ol/format/filter/GreaterThanOrEqualTo
 */
import ComparisonBinary from './ComparisonBinary.js';
/**
 * @classdesc
 * Represents a `<PropertyIsGreaterThanOrEqualTo>` comparison operator.
 * @api
 */
var GreaterThanOrEqualTo = /** @class */ (function (_super) {
    __extends(GreaterThanOrEqualTo, _super);
    /**
     * @param {!string} propertyName Name of the context property to compare.
     * @param {!number} expression The value to compare.
     */
    function GreaterThanOrEqualTo(propertyName, expression) {
        return _super.call(this, 'PropertyIsGreaterThanOrEqualTo', propertyName, expression) || this;
    }
    return GreaterThanOrEqualTo;
}(ComparisonBinary));
export default GreaterThanOrEqualTo;
//# sourceMappingURL=GreaterThanOrEqualTo.js.map