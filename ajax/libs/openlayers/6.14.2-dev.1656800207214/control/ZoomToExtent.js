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
/**
 * @module ol/control/ZoomToExtent
 */
import Control from './Control.js';
import EventType from '../events/EventType.js';
import { CLASS_CONTROL, CLASS_UNSELECTABLE } from '../css.js';
import { fromExtent as polygonFromExtent } from '../geom/Polygon.js';
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-zoom-extent'] Class name.
 * @property {HTMLElement|string} [target] Specify a target if you want the control
 * to be rendered outside of the map's viewport.
 * @property {string|HTMLElement} [label='E'] Text label to use for the button.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string} [tipLabel='Fit to extent'] Text label to use for the button tip.
 * @property {import("../extent.js").Extent} [extent] The extent to zoom to. If undefined the validity
 * extent of the view projection is used.
 */
/**
 * @classdesc
 * A button control which, when pressed, changes the map view to a specific
 * extent. To style this control use the css selector `.ol-zoom-extent`.
 *
 * @api
 */
var ZoomToExtent = /** @class */ (function (_super) {
    __extends(ZoomToExtent, _super);
    /**
     * @param {Options} [opt_options] Options.
     */
    function ZoomToExtent(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        _this = _super.call(this, {
            element: document.createElement('div'),
            target: options.target,
        }) || this;
        /**
         * @type {?import("../extent.js").Extent|null}
         * @protected
         */
        _this.extent = options.extent ? options.extent : null;
        var className = options.className !== undefined ? options.className : 'ol-zoom-extent';
        var label = options.label !== undefined ? options.label : 'E';
        var tipLabel = options.tipLabel !== undefined ? options.tipLabel : 'Fit to extent';
        var button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.title = tipLabel;
        button.appendChild(typeof label === 'string' ? document.createTextNode(label) : label);
        button.addEventListener(EventType.CLICK, _this.handleClick_.bind(_this), false);
        var cssClasses = className + ' ' + CLASS_UNSELECTABLE + ' ' + CLASS_CONTROL;
        var element = _this.element;
        element.className = cssClasses;
        element.appendChild(button);
        return _this;
    }
    /**
     * @param {MouseEvent} event The event to handle
     * @private
     */
    ZoomToExtent.prototype.handleClick_ = function (event) {
        event.preventDefault();
        this.handleZoomToExtent();
    };
    /**
     * @protected
     */
    ZoomToExtent.prototype.handleZoomToExtent = function () {
        var map = this.getMap();
        var view = map.getView();
        var extent = !this.extent
            ? view.getProjection().getExtent()
            : this.extent;
        view.fitInternal(polygonFromExtent(extent));
    };
    return ZoomToExtent;
}(Control));
export default ZoomToExtent;
//# sourceMappingURL=ZoomToExtent.js.map