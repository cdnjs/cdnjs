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
 * @module ol/format/filter/Spatial
 */
import Filter from './Filter.js';
/**
 * @classdesc
 * Abstract class; normally only used for creating subclasses and not instantiated in apps.
 * Represents a spatial operator to test whether a geometry-valued property
 * relates to a given geometry.
 *
 * @abstract
 */
var Spatial = /** @class */ (function (_super) {
    __extends(Spatial, _super);
    /**
     * @param {!string} tagName The XML tag name for this filter.
     * @param {!string} geometryName Geometry name to use.
     * @param {!import("../../geom/Geometry.js").default} geometry Geometry.
     * @param {string} [opt_srsName] SRS name. No srsName attribute will be
     *    set on geometries when this is not provided.
     */
    function Spatial(tagName, geometryName, geometry, opt_srsName) {
        var _this = _super.call(this, tagName) || this;
        /**
         * @type {!string}
         */
        _this.geometryName = geometryName || 'the_geom';
        /**
         * @type {import("../../geom/Geometry.js").default}
         */
        _this.geometry = geometry;
        /**
         * @type {string|undefined}
         */
        _this.srsName = opt_srsName;
        return _this;
    }
    return Spatial;
}(Filter));
export default Spatial;
//# sourceMappingURL=Spatial.js.map