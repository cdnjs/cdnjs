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
 * @module ol/control/Zoom
 */
import Control from './Control.js';
import EventType from '../events/EventType.js';
import { CLASS_CONTROL, CLASS_UNSELECTABLE } from '../css.js';
import { easeOut } from '../easing.js';
/**
 * @typedef {Object} Options
 * @property {number} [duration=250] Animation duration in milliseconds.
 * @property {string} [className='ol-zoom'] CSS class name.
 * @property {string|HTMLElement} [zoomInLabel='+'] Text label to use for the zoom-in
 * button. Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string|HTMLElement} [zoomOutLabel='-'] Text label to use for the zoom-out button.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string} [zoomInTipLabel='Zoom in'] Text label to use for the button tip.
 * @property {string} [zoomOutTipLabel='Zoom out'] Text label to use for the button tip.
 * @property {number} [delta=1] The zoom delta applied on each click.
 * @property {HTMLElement|string} [target] Specify a target if you want the control to be
 * rendered outside of the map's viewport.
 */
/**
 * @classdesc
 * A control with 2 buttons, one for zoom in and one for zoom out.
 * This control is one of the default controls of a map. To style this control
 * use css selectors `.ol-zoom-in` and `.ol-zoom-out`.
 *
 * @api
 */
var Zoom = /** @class */ (function (_super) {
    __extends(Zoom, _super);
    /**
     * @param {Options=} opt_options Zoom options.
     */
    function Zoom(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        _this = _super.call(this, {
            element: document.createElement('div'),
            target: options.target,
        }) || this;
        var className = options.className !== undefined ? options.className : 'ol-zoom';
        var delta = options.delta !== undefined ? options.delta : 1;
        var zoomInLabel = options.zoomInLabel !== undefined ? options.zoomInLabel : '+';
        var zoomOutLabel = options.zoomOutLabel !== undefined ? options.zoomOutLabel : '\u2212';
        var zoomInTipLabel = options.zoomInTipLabel !== undefined ? options.zoomInTipLabel : 'Zoom in';
        var zoomOutTipLabel = options.zoomOutTipLabel !== undefined
            ? options.zoomOutTipLabel
            : 'Zoom out';
        var inElement = document.createElement('button');
        inElement.className = className + '-in';
        inElement.setAttribute('type', 'button');
        inElement.title = zoomInTipLabel;
        inElement.appendChild(typeof zoomInLabel === 'string'
            ? document.createTextNode(zoomInLabel)
            : zoomInLabel);
        inElement.addEventListener(EventType.CLICK, _this.handleClick_.bind(_this, delta), false);
        var outElement = document.createElement('button');
        outElement.className = className + '-out';
        outElement.setAttribute('type', 'button');
        outElement.title = zoomOutTipLabel;
        outElement.appendChild(typeof zoomOutLabel === 'string'
            ? document.createTextNode(zoomOutLabel)
            : zoomOutLabel);
        outElement.addEventListener(EventType.CLICK, _this.handleClick_.bind(_this, -delta), false);
        var cssClasses = className + ' ' + CLASS_UNSELECTABLE + ' ' + CLASS_CONTROL;
        var element = _this.element;
        element.className = cssClasses;
        element.appendChild(inElement);
        element.appendChild(outElement);
        /**
         * @type {number}
         * @private
         */
        _this.duration_ = options.duration !== undefined ? options.duration : 250;
        return _this;
    }
    /**
     * @param {number} delta Zoom delta.
     * @param {MouseEvent} event The event to handle
     * @private
     */
    Zoom.prototype.handleClick_ = function (delta, event) {
        event.preventDefault();
        this.zoomByDelta_(delta);
    };
    /**
     * @param {number} delta Zoom delta.
     * @private
     */
    Zoom.prototype.zoomByDelta_ = function (delta) {
        var map = this.getMap();
        var view = map.getView();
        if (!view) {
            // the map does not have a view, so we can't act
            // upon it
            return;
        }
        var currentZoom = view.getZoom();
        if (currentZoom !== undefined) {
            var newZoom = view.getConstrainedZoom(currentZoom + delta);
            if (this.duration_ > 0) {
                if (view.getAnimating()) {
                    view.cancelAnimations();
                }
                view.animate({
                    zoom: newZoom,
                    duration: this.duration_,
                    easing: easeOut,
                });
            }
            else {
                view.setZoom(newZoom);
            }
        }
    };
    return Zoom;
}(Control));
export default Zoom;
//# sourceMappingURL=Zoom.js.map