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
 * @module ol/format/filter/LogicalNary
 */
import Filter from './Filter.js';
import { assert } from '../../asserts.js';
/**
 * @classdesc
 * Abstract class; normally only used for creating subclasses and not instantiated in apps.
 * Base class for WFS GetFeature n-ary logical filters.
 *
 * @abstract
 */
var LogicalNary = /** @class */ (function (_super) {
    __extends(LogicalNary, _super);
    /**
     * @param {!string} tagName The XML tag name for this filter.
     * @param {Array<import("./Filter.js").default>} conditions Conditions.
     */
    function LogicalNary(tagName, conditions) {
        var _this = _super.call(this, tagName) || this;
        /**
         * @type {Array<import("./Filter.js").default>}
         */
        _this.conditions = conditions;
        assert(_this.conditions.length >= 2, 57); // At least 2 conditions are required.
        return _this;
    }
    return LogicalNary;
}(Filter));
export default LogicalNary;
//# sourceMappingURL=LogicalNary.js.map