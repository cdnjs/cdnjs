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
 * @module ol/format/filter/IsNull
 */
import Comparison from './Comparison.js';
/**
 * @classdesc
 * Represents a `<PropertyIsNull>` comparison operator.
 * @api
 */
var IsNull = /** @class */ (function (_super) {
    __extends(IsNull, _super);
    /**
     * @param {!string} propertyName Name of the context property to compare.
     */
    function IsNull(propertyName) {
        return _super.call(this, 'PropertyIsNull', propertyName) || this;
    }
    return IsNull;
}(Comparison));
export default IsNull;
//# sourceMappingURL=IsNull.js.map