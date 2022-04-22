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
 * @module ol/interaction/DragZoom
 */
import { easeOut } from '../easing.js';
import { shiftKeyOnly } from '../events/condition.js';
import { createOrUpdateFromCoordinates, getBottomLeft, getCenter, getTopRight, scaleFromCenter } from '../extent.js';
import DragBox from './DragBox.js';
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-dragzoom'] CSS class name for styling the
 * box.
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled.
 * Default is {@link module:ol/events/condition~shiftKeyOnly}.
 * @property {number} [duration=200] Animation duration in milliseconds.
 * @property {boolean} [out=false] Use interaction for zooming out.
 */
/**
 * @classdesc
 * Allows the user to zoom the map by clicking and dragging on the map,
 * normally combined with an {@link module:ol/events/condition} that limits
 * it to when a key, shift by default, is held down.
 *
 * To change the style of the box, use CSS and the `.ol-dragzoom` selector, or
 * your custom one configured with `className`.
 * @api
 */
var DragZoom = /** @class */ (function (_super) {
    __extends(DragZoom, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function DragZoom(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        var condition = options.condition ? options.condition : shiftKeyOnly;
        _this = _super.call(this, {
            condition: condition,
            className: options.className || 'ol-dragzoom',
            onBoxEnd: onBoxEnd
        }) || this;
        /**
         * @private
         * @type {number}
         */
        _this.duration_ = options.duration !== undefined ? options.duration : 200;
        /**
         * @private
         * @type {boolean}
         */
        _this.out_ = options.out !== undefined ? options.out : false;
        return _this;
    }
    return DragZoom;
}(DragBox));
/**
 * @this {DragZoom}
 */
function onBoxEnd() {
    var map = this.getMap();
    var view = /** @type {!import("../View.js").default} */ (map.getView());
    var size = /** @type {!import("../size.js").Size} */ (map.getSize());
    var extent = this.getGeometry().getExtent();
    if (this.out_) {
        var mapExtent = view.calculateExtent(size);
        var boxPixelExtent = createOrUpdateFromCoordinates([
            map.getPixelFromCoordinate(getBottomLeft(extent)),
            map.getPixelFromCoordinate(getTopRight(extent))
        ]);
        var factor = view.getResolutionForExtent(boxPixelExtent, size);
        scaleFromCenter(mapExtent, 1 / factor);
        extent = mapExtent;
    }
    var resolution = view.getConstrainedResolution(view.getResolutionForExtent(extent, size));
    var center = view.getConstrainedCenter(getCenter(extent), resolution);
    view.animate({
        resolution: resolution,
        center: center,
        duration: this.duration_,
        easing: easeOut
    });
}
export default DragZoom;
//# sourceMappingURL=DragZoom.js.map