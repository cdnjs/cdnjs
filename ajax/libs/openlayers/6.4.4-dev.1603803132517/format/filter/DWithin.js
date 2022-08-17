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
 * @module ol/format/filter/DWithin
 */
import Spatial from './Spatial.js';
/**
 * @classdesc
 * Represents a `<DWithin>` operator to test whether a geometry-valued property
 * is within a distance to a given geometry.
 * @api
 */
var DWithin = /** @class */ (function (_super) {
    __extends(DWithin, _super);
    /**
     * @param {!string} geometryName Geometry name to use.
     * @param {!import("../../geom/Geometry.js").default} geometry Geometry.
     * @param {!number} distance Distance.
     * @param {!string} unit Unit.
     * @param {string=} opt_srsName SRS name. No srsName attribute will be
     *    set on geometries when this is not provided.
     */
    function DWithin(geometryName, geometry, distance, unit, opt_srsName) {
        var _this = _super.call(this, 'DWithin', geometryName, geometry, opt_srsName) || this;
        /**
         * @public
         * @type {!number}
         */
        _this.distance = distance;
        /**
         * @public
         * @type {!string}
         */
        _this.unit = unit;
        return _this;
    }
    return DWithin;
}(Spatial));
export default DWithin;
//# sourceMappingURL=DWithin.js.map