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
 * @module ol/format/filter/Within
 */
import Spatial from './Spatial.js';
/**
 * @classdesc
 * Represents a `<Within>` operator to test whether a geometry-valued property
 * is within a given geometry.
 * @api
 */
var Within = /** @class */ (function (_super) {
    __extends(Within, _super);
    /**
     * @param {!string} geometryName Geometry name to use.
     * @param {!import("../../geom/Geometry.js").default} geometry Geometry.
     * @param {string=} opt_srsName SRS name. No srsName attribute will be
     *    set on geometries when this is not provided.
     */
    function Within(geometryName, geometry, opt_srsName) {
        return _super.call(this, 'Within', geometryName, geometry, opt_srsName) || this;
    }
    return Within;
}(Spatial));
export default Within;
//# sourceMappingURL=Within.js.map