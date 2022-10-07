var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/format/filter/GreaterThan
 */
import ComparisonBinary from './ComparisonBinary.js';
/**
 * @classdesc
 * Represents a `<PropertyIsGreaterThan>` comparison operator.
 * @api
 */
var GreaterThan = /** @class */ (function (_super) {
    __extends(GreaterThan, _super);
    /**
     * @param {!string} propertyName Name of the context property to compare.
     * @param {!number} expression The value to compare.
     */
    function GreaterThan(propertyName, expression) {
        return _super.call(this, 'PropertyIsGreaterThan', propertyName, expression) || this;
    }
    return GreaterThan;
}(ComparisonBinary));
export default GreaterThan;
//# sourceMappingURL=GreaterThan.js.map