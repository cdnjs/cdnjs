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
 * @module ol/format/filter/During
 */
import Comparison from './Comparison.js';
/**
 * @classdesc
 * Represents a `<During>` comparison operator.
 * @api
 */
var During = /** @class */ (function (_super) {
    __extends(During, _super);
    /**
     * @param {!string} propertyName Name of the context property to compare.
     * @param {!string} begin The begin date in ISO-8601 format.
     * @param {!string} end The end date in ISO-8601 format.
     */
    function During(propertyName, begin, end) {
        var _this = _super.call(this, 'During', propertyName) || this;
        /**
         * @type {!string}
         */
        _this.begin = begin;
        /**
         * @type {!string}
         */
        _this.end = end;
        return _this;
    }
    return During;
}(Comparison));
export default During;
//# sourceMappingURL=During.js.map