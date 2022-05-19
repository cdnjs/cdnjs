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
 * @module ol/format/filter/Or
 */
import LogicalNary from './LogicalNary.js';
/**
 * @classdesc
 * Represents a logical `<Or>` operator between two ore more filter conditions.
 * @api
 */
var Or = /** @class */ (function (_super) {
    __extends(Or, _super);
    /**
     * @param {...import("./Filter.js").default} conditions Conditions.
     */
    function Or(conditions) {
        return _super.call(this, 'Or', Array.prototype.slice.call(arguments)) || this;
    }
    return Or;
}(LogicalNary));
export default Or;
//# sourceMappingURL=Or.js.map