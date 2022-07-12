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
 * @module ol/format/filter/Bbox
 */
import Filter from './Filter.js';
/**
 * @classdesc
 * Represents a `<BBOX>` operator to test whether a geometry-valued property
 * intersects a fixed bounding box
 *
 * @api
 */
var Bbox = /** @class */ (function (_super) {
    __extends(Bbox, _super);
    /**
     * @param {!string} geometryName Geometry name to use.
     * @param {!import("../../extent.js").Extent} extent Extent.
     * @param {string=} opt_srsName SRS name. No srsName attribute will be set
     * on geometries when this is not provided.
     */
    function Bbox(geometryName, extent, opt_srsName) {
        var _this = _super.call(this, 'BBOX') || this;
        /**
         * @type {!string}
         */
        _this.geometryName = geometryName;
        /**
         * @type {import("../../extent.js").Extent}
         */
        _this.extent = extent;
        if (extent.length !== 4) {
            throw new Error('Expected an extent with four values ([minX, minY, maxX, maxY])');
        }
        /**
         * @type {string|undefined}
         */
        _this.srsName = opt_srsName;
        return _this;
    }
    return Bbox;
}(Filter));
export default Bbox;
//# sourceMappingURL=Bbox.js.map