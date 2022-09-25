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
 * @module ol/format/filter/ResourceId
 */
import Filter from './Filter.js';
/**
 * @classdesc
 *
 * @abstract
 */
var ResourceId = /** @class */ (function (_super) {
    __extends(ResourceId, _super);
    /**
     * @param {!string} rid Resource ID.
     */
    function ResourceId(rid) {
        var _this = _super.call(this, 'ResourceId') || this;
        /**
         * @type {!string}
         */
        _this.rid = rid;
        return _this;
    }
    return ResourceId;
}(Filter));
export default ResourceId;
//# sourceMappingURL=ResourceId.js.map