/**
 * @module ol/control/ZoomSlider
 */
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
import Control from './Control.js';
import EventType from '../events/EventType.js';
import PointerEventType from '../pointer/EventType.js';
import { CLASS_CONTROL, CLASS_UNSELECTABLE } from '../css.js';
import { clamp } from '../math.js';
import { easeOut } from '../easing.js';
import { listen, unlistenByKey } from '../events.js';
import { stopPropagation } from '../events/Event.js';
/**
 * The enum for available directions.
 *
 * @enum {number}
 */
var Direction = {
    VERTICAL: 0,
    HORIZONTAL: 1,
};
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-zoomslider'] CSS class name.
 * @property {number} [duration=200] Animation duration in milliseconds.
 * @property {function(import("../MapEvent.js").default):void} [render] Function called when the control
 * should be re-rendered. This is called in a `requestAnimationFrame` callback.
 */
/**
 * @classdesc
 * A slider type of control for zooming.
 *
 * Example:
 *
 *     map.addControl(new ZoomSlider());
 *
 * @api
 */
var ZoomSlider = /** @class */ (function (_super) {
    __extends(ZoomSlider, _super);
    /**
     * @param {Options} [opt_options] Zoom slider options.
     */
    function ZoomSlider(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        _this = _super.call(this, {
            element: document.createElement('div'),
            render: options.render,
        }) || this;
        /**
         * @type {!Array<import("../events.js").EventsKey>}
         * @private
         */
        _this.dragListenerKeys_ = [];
        /**
         * Will hold the current resolution of the view.
         *
         * @type {number|undefined}
         * @private
         */
        _this.currentResolution_ = undefined;
        /**
         * The direction of the slider. Will be determined from actual display of the
         * container and defaults to Direction.VERTICAL.
         *
         * @type {Direction}
         * @private
         */
        _this.direction_ = Direction.VERTICAL;
        /**
         * @type {boolean}
         * @private
         */
        _this.dragging_;
        /**
         * @type {number}
         * @private
         */
        _this.heightLimit_ = 0;
        /**
         * @type {number}
         * @private
         */
        _this.widthLimit_ = 0;
        /**
         * @type {number|undefined}
         * @private
         */
        _this.startX_;
        /**
         * @type {number|undefined}
         * @private
         */
        _this.startY_;
        /**
         * The calculated thumb size (border box plus margins).  Set when initSlider_
         * is called.
         * @type {import("../size.js").Size}
         * @private
         */
        _this.thumbSize_ = null;
        /**
         * Whether the slider is initialized.
         * @type {boolean}
         * @private
         */
        _this.sliderInitialized_ = false;
        /**
         * @type {number}
         * @private
         */
        _this.duration_ = options.duration !== undefined ? options.duration : 200;
        var className = options.className !== undefined ? options.className : 'ol-zoomslider';
        var thumbElement = document.createElement('button');
        thumbElement.setAttribute('type', 'button');
        thumbElement.className = className + '-thumb ' + CLASS_UNSELECTABLE;
        var containerElement = _this.element;
        containerElement.className =
            className + ' ' + CLASS_UNSELECTABLE + ' ' + CLASS_CONTROL;
        containerElement.appendChild(thumbElement);
        containerElement.addEventListener(PointerEventType.POINTERDOWN, _this.handleDraggerStart_.bind(_this), false);
        containerElement.addEventListener(PointerEventType.POINTERMOVE, _this.handleDraggerDrag_.bind(_this), false);
        containerElement.addEventListener(PointerEventType.POINTERUP, _this.handleDraggerEnd_.bind(_this), false);
        containerElement.addEventListener(EventType.CLICK, _this.handleContainerClick_.bind(_this), false);
        thumbElement.addEventListener(EventType.CLICK, stopPropagation, false);
        return _this;
    }
    /**
     * Remove the control from its current map and attach it to the new map.
     * Pass `null` to just remove the control from the current map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     * @param {import("../PluggableMap.js").default|null} map Map.
     * @api
     */
    ZoomSlider.prototype.setMap = function (map) {
        _super.prototype.setMap.call(this, map);
        if (map) {
            map.render();
        }
    };
    /**
     * Initializes the slider element. This will determine and set this controls
     * direction_ and also constrain the dragging of the thumb to always be within
     * the bounds of the container.
     *
     * @return {boolean} Initialization successful
     * @private
     */
    ZoomSlider.prototype.initSlider_ = function () {
        var container = this.element;
        var containerWidth = container.offsetWidth;
        var containerHeight = container.offsetHeight;
        if (containerWidth === 0 && containerHeight === 0) {
            return (this.sliderInitialized_ = false);
        }
        var containerStyle = getComputedStyle(container);
        containerWidth -=
            parseFloat(containerStyle['paddingRight']) +
                parseFloat(containerStyle['paddingLeft']);
        containerHeight -=
            parseFloat(containerStyle['paddingTop']) +
                parseFloat(containerStyle['paddingBottom']);
        var thumb = /** @type {HTMLElement} */ (container.firstElementChild);
        var thumbStyle = getComputedStyle(thumb);
        var thumbWidth = thumb.offsetWidth +
            parseFloat(thumbStyle['marginRight']) +
            parseFloat(thumbStyle['marginLeft']);
        var thumbHeight = thumb.offsetHeight +
            parseFloat(thumbStyle['marginTop']) +
            parseFloat(thumbStyle['marginBottom']);
        this.thumbSize_ = [thumbWidth, thumbHeight];
        if (containerWidth > containerHeight) {
            this.direction_ = Direction.HORIZONTAL;
            this.widthLimit_ = containerWidth - thumbWidth;
        }
        else {
            this.direction_ = Direction.VERTICAL;
            this.heightLimit_ = containerHeight - thumbHeight;
        }
        return (this.sliderInitialized_ = true);
    };
    /**
     * @param {PointerEvent} event The browser event to handle.
     * @private
     */
    ZoomSlider.prototype.handleContainerClick_ = function (event) {
        var view = this.getMap().getView();
        var relativePosition = this.getRelativePosition_(event.offsetX - this.thumbSize_[0] / 2, event.offsetY - this.thumbSize_[1] / 2);
        var resolution = this.getResolutionForPosition_(relativePosition);
        var zoom = view.getConstrainedZoom(view.getZoomForResolution(resolution));
        view.animateInternal({
            zoom: zoom,
            duration: this.duration_,
            easing: easeOut,
        });
    };
    /**
     * Handle dragger start events.
     * @param {PointerEvent} event The drag event.
     * @private
     */
    ZoomSlider.prototype.handleDraggerStart_ = function (event) {
        if (!this.dragging_ && event.target === this.element.firstElementChild) {
            var element = /** @type {HTMLElement} */ (this.element.firstElementChild);
            this.getMap().getView().beginInteraction();
            this.startX_ = event.clientX - parseFloat(element.style.left);
            this.startY_ = event.clientY - parseFloat(element.style.top);
            this.dragging_ = true;
            if (this.dragListenerKeys_.length === 0) {
                var drag = this.handleDraggerDrag_;
                var end = this.handleDraggerEnd_;
                var doc = this.getMap().getOwnerDocument();
                this.dragListenerKeys_.push(listen(doc, PointerEventType.POINTERMOVE, drag, this), listen(doc, PointerEventType.POINTERUP, end, this));
            }
        }
    };
    /**
     * Handle dragger drag events.
     *
     * @param {PointerEvent} event The drag event.
     * @private
     */
    ZoomSlider.prototype.handleDraggerDrag_ = function (event) {
        if (this.dragging_) {
            var deltaX = event.clientX - this.startX_;
            var deltaY = event.clientY - this.startY_;
            var relativePosition = this.getRelativePosition_(deltaX, deltaY);
            this.currentResolution_ =
                this.getResolutionForPosition_(relativePosition);
            this.getMap().getView().setResolution(this.currentResolution_);
        }
    };
    /**
     * Handle dragger end events.
     * @param {PointerEvent} event The drag event.
     * @private
     */
    ZoomSlider.prototype.handleDraggerEnd_ = function (event) {
        if (this.dragging_) {
            var view = this.getMap().getView();
            view.endInteraction();
            this.dragging_ = false;
            this.startX_ = undefined;
            this.startY_ = undefined;
            this.dragListenerKeys_.forEach(unlistenByKey);
            this.dragListenerKeys_.length = 0;
        }
    };
    /**
     * Positions the thumb inside its container according to the given resolution.
     *
     * @param {number} res The res.
     * @private
     */
    ZoomSlider.prototype.setThumbPosition_ = function (res) {
        var position = this.getPositionForResolution_(res);
        var thumb = /** @type {HTMLElement} */ (this.element.firstElementChild);
        if (this.direction_ == Direction.HORIZONTAL) {
            thumb.style.left = this.widthLimit_ * position + 'px';
        }
        else {
            thumb.style.top = this.heightLimit_ * position + 'px';
        }
    };
    /**
     * Calculates the relative position of the thumb given x and y offsets.  The
     * relative position scales from 0 to 1.  The x and y offsets are assumed to be
     * in pixel units within the dragger limits.
     *
     * @param {number} x Pixel position relative to the left of the slider.
     * @param {number} y Pixel position relative to the top of the slider.
     * @return {number} The relative position of the thumb.
     * @private
     */
    ZoomSlider.prototype.getRelativePosition_ = function (x, y) {
        var amount;
        if (this.direction_ === Direction.HORIZONTAL) {
            amount = x / this.widthLimit_;
        }
        else {
            amount = y / this.heightLimit_;
        }
        return clamp(amount, 0, 1);
    };
    /**
     * Calculates the corresponding resolution of the thumb given its relative
     * position (where 0 is the minimum and 1 is the maximum).
     *
     * @param {number} position The relative position of the thumb.
     * @return {number} The corresponding resolution.
     * @private
     */
    ZoomSlider.prototype.getResolutionForPosition_ = function (position) {
        var fn = this.getMap().getView().getResolutionForValueFunction();
        return fn(1 - position);
    };
    /**
     * Determines the relative position of the slider for the given resolution.  A
     * relative position of 0 corresponds to the minimum view resolution.  A
     * relative position of 1 corresponds to the maximum view resolution.
     *
     * @param {number} res The resolution.
     * @return {number} The relative position value (between 0 and 1).
     * @private
     */
    ZoomSlider.prototype.getPositionForResolution_ = function (res) {
        var fn = this.getMap().getView().getValueForResolutionFunction();
        return clamp(1 - fn(res), 0, 1);
    };
    /**
     * Update the zoomslider element.
     * @param {import("../MapEvent.js").default} mapEvent Map event.
     * @override
     */
    ZoomSlider.prototype.render = function (mapEvent) {
        if (!mapEvent.frameState) {
            return;
        }
        if (!this.sliderInitialized_ && !this.initSlider_()) {
            return;
        }
        var res = mapEvent.frameState.viewState.resolution;
        this.currentResolution_ = res;
        this.setThumbPosition_(res);
    };
    return ZoomSlider;
}(Control));
export default ZoomSlider;
//# sourceMappingURL=ZoomSlider.js.map