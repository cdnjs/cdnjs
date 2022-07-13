/**
 * @module ol/render/Box
 */
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
import Disposable from '../Disposable.js';
import Polygon from '../geom/Polygon.js';
var RenderBox = /** @class */ (function (_super) {
    __extends(RenderBox, _super);
    /**
     * @param {string} className CSS class name.
     */
    function RenderBox(className) {
        var _this = _super.call(this) || this;
        /**
         * @type {import("../geom/Polygon.js").default}
         * @private
         */
        _this.geometry_ = null;
        /**
         * @type {HTMLDivElement}
         * @private
         */
        _this.element_ = document.createElement('div');
        _this.element_.style.position = 'absolute';
        _this.element_.style.pointerEvents = 'auto';
        _this.element_.className = 'ol-box ' + className;
        /**
         * @private
         * @type {import("../PluggableMap.js").default}
         */
        _this.map_ = null;
        /**
         * @private
         * @type {import("../pixel.js").Pixel}
         */
        _this.startPixel_ = null;
        /**
         * @private
         * @type {import("../pixel.js").Pixel}
         */
        _this.endPixel_ = null;
        return _this;
    }
    /**
     * Clean up.
     */
    RenderBox.prototype.disposeInternal = function () {
        this.setMap(null);
    };
    /**
     * @private
     */
    RenderBox.prototype.render_ = function () {
        var startPixel = this.startPixel_;
        var endPixel = this.endPixel_;
        var px = 'px';
        var style = this.element_.style;
        style.left = Math.min(startPixel[0], endPixel[0]) + px;
        style.top = Math.min(startPixel[1], endPixel[1]) + px;
        style.width = Math.abs(endPixel[0] - startPixel[0]) + px;
        style.height = Math.abs(endPixel[1] - startPixel[1]) + px;
    };
    /**
     * @param {import("../PluggableMap.js").default} map Map.
     */
    RenderBox.prototype.setMap = function (map) {
        if (this.map_) {
            this.map_.getOverlayContainer().removeChild(this.element_);
            var style = this.element_.style;
            style.left = 'inherit';
            style.top = 'inherit';
            style.width = 'inherit';
            style.height = 'inherit';
        }
        this.map_ = map;
        if (this.map_) {
            this.map_.getOverlayContainer().appendChild(this.element_);
        }
    };
    /**
     * @param {import("../pixel.js").Pixel} startPixel Start pixel.
     * @param {import("../pixel.js").Pixel} endPixel End pixel.
     */
    RenderBox.prototype.setPixels = function (startPixel, endPixel) {
        this.startPixel_ = startPixel;
        this.endPixel_ = endPixel;
        this.createOrUpdateGeometry();
        this.render_();
    };
    /**
     * Creates or updates the cached geometry.
     */
    RenderBox.prototype.createOrUpdateGeometry = function () {
        var startPixel = this.startPixel_;
        var endPixel = this.endPixel_;
        var pixels = [
            startPixel,
            [startPixel[0], endPixel[1]],
            endPixel,
            [endPixel[0], startPixel[1]],
        ];
        var coordinates = pixels.map(this.map_.getCoordinateFromPixelInternal, this.map_);
        // close the polygon
        coordinates[4] = coordinates[0].slice();
        if (!this.geometry_) {
            this.geometry_ = new Polygon([coordinates]);
        }
        else {
            this.geometry_.setCoordinates([coordinates]);
        }
    };
    /**
     * @return {import("../geom/Polygon.js").default} Geometry.
     */
    RenderBox.prototype.getGeometry = function () {
        return this.geometry_;
    };
    return RenderBox;
}(Disposable));
export default RenderBox;
//# sourceMappingURL=Box.js.map