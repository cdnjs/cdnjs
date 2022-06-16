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
 * @module ol/format/filter/Comparison
 */
import Filter from './Filter.js';
/**
 * @classdesc
 * Abstract class; normally only used for creating subclasses and not instantiated in apps.
 * Base class for WFS GetFeature property comparison filters.
 *
 * @abstract
 */
var Comparison = /** @class */ (function (_super) {
    __extends(Comparison, _super);
    /**
     * @param {!string} tagName The XML tag name for this filter.
     * @param {!string} propertyName Name of the context property to compare.
     */
    function Comparison(tagName, propertyName) {
        var _this = _super.call(this, tagName) || this;
        /**
         * @type {!string}
         */
        _this.propertyName = propertyName;
        return _this;
    }
    return Comparison;
}(Filter));
export default Comparison;
//# sourceMappingURL=Comparison.js.map