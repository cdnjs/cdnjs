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
 * @module ol/interaction/DragBox
 */
// FIXME draw drag box
import Event from '../events/Event.js';
import PointerInteraction from './Pointer.js';
import RenderBox from '../render/Box.js';
import { mouseActionButton } from '../events/condition.js';
/**
 * A function that takes a {@link module:ol/MapBrowserEvent} and two
 * {@link module:ol/pixel~Pixel}s and returns a `{boolean}`. If the condition is met,
 * true should be returned.
 * @typedef {function(this: ?, import("../MapBrowserEvent.js").default, import("../pixel.js").Pixel, import("../pixel.js").Pixel):boolean} EndCondition
 */
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-dragbox'] CSS class name for styling the box.
 * @property {import("../events/condition.js").Condition} [condition] A function that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a boolean
 * to indicate whether that event should be handled.
 * Default is {@link ol/events/condition~mouseActionButton}.
 * @property {number} [minArea=64] The minimum area of the box in pixel, this value is used by the default
 * `boxEndCondition` function.
 * @property {EndCondition} [boxEndCondition] A function that takes a {@link module:ol/MapBrowserEvent~MapBrowserEvent} and two
 * {@link module:ol/pixel~Pixel}s to indicate whether a `boxend` event should be fired.
 * Default is `true` if the area of the box is bigger than the `minArea` option.
 * @property {function(this:DragBox, import("../MapBrowserEvent.js").default):void} [onBoxEnd] Code to execute just
 * before `boxend` is fired.
 */
/**
 * @enum {string}
 */
var DragBoxEventType = {
    /**
     * Triggered upon drag box start.
     * @event DragBoxEvent#boxstart
     * @api
     */
    BOXSTART: 'boxstart',
    /**
     * Triggered on drag when box is active.
     * @event DragBoxEvent#boxdrag
     * @api
     */
    BOXDRAG: 'boxdrag',
    /**
     * Triggered upon drag box end.
     * @event DragBoxEvent#boxend
     * @api
     */
    BOXEND: 'boxend',
    /**
     * Triggered upon drag box canceled.
     * @event DragBoxEvent#boxcancel
     * @api
     */
    BOXCANCEL: 'boxcancel',
};
/**
 * @classdesc
 * Events emitted by {@link module:ol/interaction/DragBox~DragBox} instances are instances of
 * this type.
 */
var DragBoxEvent = /** @class */ (function (_super) {
    __extends(DragBoxEvent, _super);
    /**
     * @param {string} type The event type.
     * @param {import("../coordinate.js").Coordinate} coordinate The event coordinate.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Originating event.
     */
    function DragBoxEvent(type, coordinate, mapBrowserEvent) {
        var _this = _super.call(this, type) || this;
        /**
         * The coordinate of the drag event.
         * @const
         * @type {import("../coordinate.js").Coordinate}
         * @api
         */
        _this.coordinate = coordinate;
        /**
         * @const
         * @type {import("../MapBrowserEvent.js").default}
         * @api
         */
        _this.mapBrowserEvent = mapBrowserEvent;
        return _this;
    }
    return DragBoxEvent;
}(Event));
export { DragBoxEvent };
/**
 * @classdesc
 * Allows the user to draw a vector box by clicking and dragging on the map,
 * normally combined with an {@link module:ol/events/condition} that limits
 * it to when the shift or other key is held down. This is used, for example,
 * for zooming to a specific area of the map
 * (see {@link module:ol/interaction/DragZoom~DragZoom} and
 * {@link module:ol/interaction/DragRotateAndZoom}).
 *
 * @fires DragBoxEvent
 * @api
 */
var DragBox = /** @class */ (function (_super) {
    __extends(DragBox, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function DragBox(opt_options) {
        var _this = _super.call(this) || this;
        var options = opt_options ? opt_options : {};
        /**
         * @type {import("../render/Box.js").default}
         * @private
         */
        _this.box_ = new RenderBox(options.className || 'ol-dragbox');
        /**
         * @type {number}
         * @private
         */
        _this.minArea_ = options.minArea !== undefined ? options.minArea : 64;
        if (options.onBoxEnd) {
            _this.onBoxEnd = options.onBoxEnd;
        }
        /**
         * @type {import("../pixel.js").Pixel}
         * @private
         */
        _this.startPixel_ = null;
        /**
         * @private
         * @type {import("../events/condition.js").Condition}
         */
        _this.condition_ = options.condition ? options.condition : mouseActionButton;
        /**
         * @private
         * @type {EndCondition}
         */
        _this.boxEndCondition_ = options.boxEndCondition
            ? options.boxEndCondition
            : _this.defaultBoxEndCondition;
        return _this;
    }
    /**
     * The default condition for determining whether the boxend event
     * should fire.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent The originating MapBrowserEvent
     *     leading to the box end.
     * @param {import("../pixel.js").Pixel} startPixel The starting pixel of the box.
     * @param {import("../pixel.js").Pixel} endPixel The end pixel of the box.
     * @return {boolean} Whether or not the boxend condition should be fired.
     */
    DragBox.prototype.defaultBoxEndCondition = function (mapBrowserEvent, startPixel, endPixel) {
        var width = endPixel[0] - startPixel[0];
        var height = endPixel[1] - startPixel[1];
        return width * width + height * height >= this.minArea_;
    };
    /**
     * Returns geometry of last drawn box.
     * @return {import("../geom/Polygon.js").default} Geometry.
     * @api
     */
    DragBox.prototype.getGeometry = function () {
        return this.box_.getGeometry();
    };
    /**
     * Handle pointer drag events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     */
    DragBox.prototype.handleDragEvent = function (mapBrowserEvent) {
        this.box_.setPixels(this.startPixel_, mapBrowserEvent.pixel);
        this.dispatchEvent(new DragBoxEvent(DragBoxEventType.BOXDRAG, mapBrowserEvent.coordinate, mapBrowserEvent));
    };
    /**
     * Handle pointer up events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     */
    DragBox.prototype.handleUpEvent = function (mapBrowserEvent) {
        this.box_.setMap(null);
        var completeBox = this.boxEndCondition_(mapBrowserEvent, this.startPixel_, mapBrowserEvent.pixel);
        if (completeBox) {
            this.onBoxEnd(mapBrowserEvent);
        }
        this.dispatchEvent(new DragBoxEvent(completeBox ? DragBoxEventType.BOXEND : DragBoxEventType.BOXCANCEL, mapBrowserEvent.coordinate, mapBrowserEvent));
        return false;
    };
    /**
     * Handle pointer down events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     */
    DragBox.prototype.handleDownEvent = function (mapBrowserEvent) {
        if (this.condition_(mapBrowserEvent)) {
            this.startPixel_ = mapBrowserEvent.pixel;
            this.box_.setMap(mapBrowserEvent.map);
            this.box_.setPixels(this.startPixel_, this.startPixel_);
            this.dispatchEvent(new DragBoxEvent(DragBoxEventType.BOXSTART, mapBrowserEvent.coordinate, mapBrowserEvent));
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Function to execute just before `onboxend` is fired
     * @param {import("../MapBrowserEvent.js").default} event Event.
     */
    DragBox.prototype.onBoxEnd = function (event) { };
    return DragBox;
}(PointerInteraction));
export default DragBox;
//# sourceMappingURL=DragBox.js.map