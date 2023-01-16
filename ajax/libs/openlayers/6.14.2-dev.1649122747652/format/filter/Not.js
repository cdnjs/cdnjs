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
 * @module ol/format/filter/Not
 */
import Filter from './Filter.js';
/**
 * @classdesc
 * Represents a logical `<Not>` operator for a filter condition.
 * @api
 */
var Not = /** @class */ (function (_super) {
    __extends(Not, _super);
    /**
     * @param {!import("./Filter.js").default} condition Filter condition.
     */
    function Not(condition) {
        var _this = _super.call(this, 'Not') || this;
        /**
         * @type {!import("./Filter.js").default}
         */
        _this.condition = condition;
        return _this;
    }
    return Not;
}(Filter));
export default Not;
//# sourceMappingURL=Not.js.map