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
 * @module ol/format/filter/EqualTo
 */
import ComparisonBinary from './ComparisonBinary.js';
/**
 * @classdesc
 * Represents a `<PropertyIsEqualTo>` comparison operator.
 * @api
 */
var EqualTo = /** @class */ (function (_super) {
    __extends(EqualTo, _super);
    /**
     * @param {!string} propertyName Name of the context property to compare.
     * @param {!(string|number)} expression The value to compare.
     * @param {boolean=} opt_matchCase Case-sensitive?
     */
    function EqualTo(propertyName, expression, opt_matchCase) {
        return _super.call(this, 'PropertyIsEqualTo', propertyName, expression, opt_matchCase) || this;
    }
    return EqualTo;
}(ComparisonBinary));
export default EqualTo;
//# sourceMappingURL=EqualTo.js.map