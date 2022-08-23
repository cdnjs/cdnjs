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
 * @module ol/format/filter/Contains
 */
import Spatial from './Spatial.js';
/**
 * @classdesc
 * Represents a `<Contains>` operator to test whether a geometry-valued property
 * contains a given geometry.
 * @api
 */
var Contains = /** @class */ (function (_super) {
    __extends(Contains, _super);
    /**
     * @param {!string} geometryName Geometry name to use.
     * @param {!import("../../geom/Geometry.js").default} geometry Geometry.
     * @param {string=} opt_srsName SRS name. No srsName attribute will be
     *    set on geometries when this is not provided.
     */
    function Contains(geometryName, geometry, opt_srsName) {
        return _super.call(this, 'Contains', geometryName, geometry, opt_srsName) || this;
    }
    return Contains;
}(Spatial));
export default Contains;
//# sourceMappingURL=Contains.js.map