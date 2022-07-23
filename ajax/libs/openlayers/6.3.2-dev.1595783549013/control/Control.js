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
 * @module ol/control/Control
 */
import BaseObject from '../Object.js';
import MapEventType from '../MapEventType.js';
import { VOID } from '../functions.js';
import { listen, unlistenByKey } from '../events.js';
import { removeNode } from '../dom.js';
/**
 * @typedef {Object} Options
 * @property {HTMLElement} [element] The element is the control's
 * container element. This only needs to be specified if you're developing
 * a custom control.
 * @property {function(import("../MapEvent.js").default):void} [render] Function called when
 * the control should be re-rendered. This is called in a `requestAnimationFrame`
 * callback.
 * @property {HTMLElement|string} [target] Specify a target if you want
 * the control to be rendered outside of the map's viewport.
 */
/**
 * @classdesc
 * A control is a visible widget with a DOM element in a fixed position on the
 * screen. They can involve user input (buttons), or be informational only;
 * the position is determined using CSS. By default these are placed in the
 * container with CSS class name `ol-overlaycontainer-stopevent`, but can use
 * any outside DOM element.
 *
 * This is the base class for controls. You can use it for simple custom
 * controls by creating the element with listeners, creating an instance:
 * ```js
 * var myControl = new Control({element: myElement});
 * ```
 * and then adding this to the map.
 *
 * The main advantage of having this as a control rather than a simple separate
 * DOM element is that preventing propagation is handled for you. Controls
 * will also be objects in a {@link module:ol/Collection~Collection}, so you can use their methods.
 *
 * You can also extend this base for your own control class. See
 * examples/custom-controls for an example of how to do this.
 *
 * @api
 */
var Control = /** @class */ (function (_super) {
    __extends(Control, _super);
    /**
     * @param {Options} options Control options.
     */
    function Control(options) {
        var _this = _super.call(this) || this;
        var element = options.element;
        if (element && !options.target && !element.style.pointerEvents) {
            element.style.pointerEvents = 'auto';
        }
        /**
         * @protected
         * @type {HTMLElement}
         */
        _this.element = element ? element : null;
        /**
         * @private
         * @type {HTMLElement}
         */
        _this.target_ = null;
        /**
         * @private
         * @type {import("../PluggableMap.js").default}
         */
        _this.map_ = null;
        /**
         * @protected
         * @type {!Array<import("../events.js").EventsKey>}
         */
        _this.listenerKeys = [];
        if (options.render) {
            _this.render = options.render;
        }
        if (options.target) {
            _this.setTarget(options.target);
        }
        return _this;
    }
    /**
     * Clean up.
     */
    Control.prototype.disposeInternal = function () {
        removeNode(this.element);
        _super.prototype.disposeInternal.call(this);
    };
    /**
     * Get the map associated with this control.
     * @return {import("../PluggableMap.js").default} Map.
     * @api
     */
    Control.prototype.getMap = function () {
        return this.map_;
    };
    /**
     * Remove the control from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     * @param {import("../PluggableMap.js").default} map Map.
     * @api
     */
    Control.prototype.setMap = function (map) {
        if (this.map_) {
            removeNode(this.element);
        }
        for (var i = 0, ii = this.listenerKeys.length; i < ii; ++i) {
            unlistenByKey(this.listenerKeys[i]);
        }
        this.listenerKeys.length = 0;
        this.map_ = map;
        if (this.map_) {
            var target = this.target_
                ? this.target_
                : map.getOverlayContainerStopEvent();
            target.appendChild(this.element);
            if (this.render !== VOID) {
                this.listenerKeys.push(listen(map, MapEventType.POSTRENDER, this.render, this));
            }
            map.render();
        }
    };
    /**
     * Renders the control.
     * @param {import("../MapEvent.js").default} mapEvent Map event.
     * @api
     */
    Control.prototype.render = function (mapEvent) { };
    /**
     * This function is used to set a target element for the control. It has no
     * effect if it is called after the control has been added to the map (i.e.
     * after `setMap` is called on the control). If no `target` is set in the
     * options passed to the control constructor and if `setTarget` is not called
     * then the control is added to the map's overlay container.
     * @param {HTMLElement|string} target Target.
     * @api
     */
    Control.prototype.setTarget = function (target) {
        this.target_ =
            typeof target === 'string' ? document.getElementById(target) : target;
    };
    return Control;
}(BaseObject));
export default Control;
//# sourceMappingURL=Control.js.map