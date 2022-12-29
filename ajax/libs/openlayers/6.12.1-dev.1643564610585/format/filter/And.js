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
 * @module ol/format/filter/And
 */
import LogicalNary from './LogicalNary.js';
/**
 * @classdesc
 * Represents a logical `<And>` operator between two or more filter conditions.
 *
 * @abstract
 */
var And = /** @class */ (function (_super) {
    __extends(And, _super);
    /**
     * @param {...import("./Filter.js").default} conditions Conditions.
     */
    function And(conditions) {
        return _super.call(this, 'And', Array.prototype.slice.call(arguments)) || this;
    }
    return And;
}(LogicalNary));
export default And;
//# sourceMappingURL=And.js.map