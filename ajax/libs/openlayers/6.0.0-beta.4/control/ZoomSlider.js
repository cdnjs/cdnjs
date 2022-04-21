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
 * @module ol/control/ZoomSlider
 */
import Control from './Control.js';
import { CLASS_CONTROL, CLASS_UNSELECTABLE } from '../css.js';
import { easeOut } from '../easing.js';
import { listen, unlistenByKey } from '../events.js';
import { stopPropagation } from '../events/Event.js';
import EventType from '../events/EventType.js';
import { clamp } from '../math.js';
import PointerEventType from '../pointer/EventType.js';
import PointerEventHandler from '../pointer/PointerEventHandler.js';
/**
 * The enum for available directions.
 *
 * @enum {number}
 */
var Direction = {
    VERTICAL: 0,
    HORIZONTAL: 1
};
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-zoomslider'] CSS class name.
 * @property {number} [duration=200] Animation duration in milliseconds.
 * @property {function(import("../MapEvent.js").default)} [render] Function called when the control
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
     * @param {Options=} opt_options Zoom slider options.
     */
    function ZoomSlider(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        _this = _super.call(this, {
            element: document.createElement('div'),
            render: options.render || render
        }) || this;
        /**
          * @type {!Array.<import("../events.js").EventsKey>}
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
        containerElement.className = className + ' ' + CLASS_UNSELECTABLE + ' ' + CLASS_CONTROL;
        containerElement.appendChild(thumbElement);
        /**
         * @type {PointerEventHandler}
         * @private
         */
        _this.dragger_ = new PointerEventHandler(containerElement);
        listen(_this.dragger_, PointerEventType.POINTERDOWN, _this.handleDraggerStart_, _this);
        listen(_this.dragger_, PointerEventType.POINTERMOVE, _this.handleDraggerDrag_, _this);
        listen(_this.dragger_, PointerEventType.POINTERUP, _this.handleDraggerEnd_, _this);
        listen(containerElement, EventType.CLICK, _this.handleContainerClick_, _this);
        listen(thumbElement, EventType.CLICK, stopPropagation);
        return _this;
    }
    /**
     * @inheritDoc
     */
    ZoomSlider.prototype.disposeInternal = function () {
        this.dragger_.dispose();
        _super.prototype.disposeInternal.call(this);
    };
    /**
     * @inheritDoc
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
     * @private
     */
    ZoomSlider.prototype.initSlider_ = function () {
        var container = this.element;
        var containerSize = {
            width: container.offsetWidth, height: container.offsetHeight
        };
        var thumb = /** @type {HTMLElement} */ (container.firstElementChild);
        var computedStyle = getComputedStyle(thumb);
        var thumbWidth = thumb.offsetWidth +
            parseFloat(computedStyle['marginRight']) +
            parseFloat(computedStyle['marginLeft']);
        var thumbHeight = thumb.offsetHeight +
            parseFloat(computedStyle['marginTop']) +
            parseFloat(computedStyle['marginBottom']);
        this.thumbSize_ = [thumbWidth, thumbHeight];
        if (containerSize.width > containerSize.height) {
            this.direction_ = Direction.HORIZONTAL;
            this.widthLimit_ = containerSize.width - thumbWidth;
        }
        else {
            this.direction_ = Direction.VERTICAL;
            this.heightLimit_ = containerSize.height - thumbHeight;
        }
        this.sliderInitialized_ = true;
    };
    /**
     * @param {MouseEvent} event The browser event to handle.
     * @private
     */
    ZoomSlider.prototype.handleContainerClick_ = function (event) {
        var view = this.getMap().getView();
        var relativePosition = this.getRelativePosition_(event.offsetX - this.thumbSize_[0] / 2, event.offsetY - this.thumbSize_[1] / 2);
        var resolution = this.getResolutionForPosition_(relativePosition);
        var zoom = view.getConstrainedZoom(view.getZoomForResolution(resolution));
        view.animate({
            zoom: zoom,
            duration: this.duration_,
            easing: easeOut
        });
    };
    /**
     * Handle dragger start events.
     * @param {import("../pointer/PointerEvent.js").default} event The drag event.
     * @private
     */
    ZoomSlider.prototype.handleDraggerStart_ = function (event) {
        if (!this.dragging_ && event.originalEvent.target === this.element.firstElementChild) {
            var element = /** @type {HTMLElement} */ (this.element.firstElementChild);
            this.getMap().getView().beginInteraction();
            this.startX_ = event.clientX - parseFloat(element.style.left);
            this.startY_ = event.clientY - parseFloat(element.style.top);
            this.dragging_ = true;
            if (this.dragListenerKeys_.length === 0) {
                var drag = this.handleDraggerDrag_;
                var end = this.handleDraggerEnd_;
                this.dragListenerKeys_.push(listen(document, EventType.MOUSEMOVE, drag, this), listen(document, PointerEventType.POINTERMOVE, drag, this), listen(document, EventType.MOUSEUP, end, this), listen(document, PointerEventType.POINTERUP, end, this));
            }
        }
    };
    /**
     * Handle dragger drag events.
     *
     * @param {import("../pointer/PointerEvent.js").default} event The drag event.
     * @private
     */
    ZoomSlider.prototype.handleDraggerDrag_ = function (event) {
        if (this.dragging_) {
            var deltaX = event.clientX - this.startX_;
            var deltaY = event.clientY - this.startY_;
            var relativePosition = this.getRelativePosition_(deltaX, deltaY);
            this.currentResolution_ = this.getResolutionForPosition_(relativePosition);
            this.getMap().getView().setResolution(this.currentResolution_);
        }
    };
    /**
     * Handle dragger end events.
     * @param {import("../pointer/PointerEvent.js").default} event The drag event.
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
    return ZoomSlider;
}(Control));
/**
 * Update the zoomslider element.
 * @param {import("../MapEvent.js").default} mapEvent Map event.
 * @this {ZoomSlider}
 * @api
 */
export function render(mapEvent) {
    if (!mapEvent.frameState) {
        return;
    }
    if (!this.sliderInitialized_) {
        this.initSlider_();
    }
    var res = mapEvent.frameState.viewState.resolution;
    this.currentResolution_ = res;
    this.setThumbPosition_(res);
}
export default ZoomSlider;
//# sourceMappingURL=ZoomSlider.js.map