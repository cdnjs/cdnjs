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
 * @module ol/control/FullScreen
 */
import Control from './Control.js';
import EventType from '../events/EventType.js';
import { CLASS_CONTROL, CLASS_UNSELECTABLE, CLASS_UNSUPPORTED } from '../css.js';
import { listen } from '../events.js';
import { replaceNode } from '../dom.js';
var events = [
    'fullscreenchange',
    'webkitfullscreenchange',
    'MSFullscreenChange',
];
/**
 * @enum {string}
 */
var FullScreenEventType = {
    /**
     * Triggered after the map entered fullscreen.
     * @event FullScreenEventType#enterfullscreen
     * @api
     */
    ENTERFULLSCREEN: 'enterfullscreen',
    /**
     * Triggered after the map leave fullscreen.
     * @event FullScreenEventType#leavefullscreen
     * @api
     */
    LEAVEFULLSCREEN: 'leavefullscreen',
};
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes|
 *     'enterfullscreen'|'leavefullscreen', import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types, import("../Object").ObjectEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|
 *     'enterfullscreen'|'leavefullscreen'|import("../ObjectEventType").Types, Return>} FullScreenOnSignature
 */
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-full-screen'] CSS class name.
 * @property {string|Text|HTMLElement} [label='\u2922'] Text label to use for the button.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string|Text|HTMLElement} [labelActive='\u00d7'] Text label to use for the
 * button when full-screen is active.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string} [activeClassName=className + '-true'] CSS class name for the button
 * when full-screen is active.
 * @property {string} [inactiveClassName=className + '-false'] CSS class name for the button
 * when full-screen is inactive.
 * @property {string} [tipLabel='Toggle full-screen'] Text label to use for the button tip.
 * @property {boolean} [keys=false] Full keyboard access.
 * @property {HTMLElement|string} [target] Specify a target if you want the
 * control to be rendered outside of the map's viewport.
 * @property {HTMLElement|string} [source] The element to be displayed
 * fullscreen. When not provided, the element containing the map viewport will
 * be displayed fullscreen.
 */
/**
 * @classdesc
 * Provides a button that when clicked fills up the full screen with the map.
 * The full screen source element is by default the element containing the map viewport unless
 * overridden by providing the `source` option. In which case, the dom
 * element introduced using this parameter will be displayed in full screen.
 *
 * When in full screen mode, a close button is shown to exit full screen mode.
 * The [Fullscreen API](https://www.w3.org/TR/fullscreen/) is used to
 * toggle the map in full screen mode.
 *
 * @fires FullScreenEventType#enterfullscreen
 * @fires FullScreenEventType#leavefullscreen
 * @api
 */
var FullScreen = /** @class */ (function (_super) {
    __extends(FullScreen, _super);
    /**
     * @param {Options} [opt_options] Options.
     */
    function FullScreen(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        _this = _super.call(this, {
            element: document.createElement('div'),
            target: options.target,
        }) || this;
        /***
         * @type {FullScreenOnSignature<import("../events").EventsKey>}
         */
        _this.on;
        /***
         * @type {FullScreenOnSignature<import("../events").EventsKey>}
         */
        _this.once;
        /***
         * @type {FullScreenOnSignature<void>}
         */
        _this.un;
        /**
         * @private
         * @type {string}
         */
        _this.cssClassName_ =
            options.className !== undefined ? options.className : 'ol-full-screen';
        /**
         * @private
         * @type {Array<string>}
         */
        _this.activeClassName_ =
            options.activeClassName !== undefined
                ? options.activeClassName.split(' ')
                : [_this.cssClassName_ + '-true'];
        /**
         * @private
         * @type {Array<string>}
         */
        _this.inactiveClassName_ =
            options.inactiveClassName !== undefined
                ? options.inactiveClassName.split(' ')
                : [_this.cssClassName_ + '-false'];
        var label = options.label !== undefined ? options.label : '\u2922';
        /**
         * @private
         * @type {Text|HTMLElement}
         */
        _this.labelNode_ =
            typeof label === 'string' ? document.createTextNode(label) : label;
        var labelActive = options.labelActive !== undefined ? options.labelActive : '\u00d7';
        /**
         * @private
         * @type {Text|HTMLElement}
         */
        _this.labelActiveNode_ =
            typeof labelActive === 'string'
                ? document.createTextNode(labelActive)
                : labelActive;
        /**
         * @private
         * @type {HTMLElement}
         */
        _this.button_ = document.createElement('button');
        var tipLabel = options.tipLabel ? options.tipLabel : 'Toggle full-screen';
        _this.setClassName_(_this.button_, isFullScreen());
        _this.button_.setAttribute('type', 'button');
        _this.button_.title = tipLabel;
        _this.button_.appendChild(_this.labelNode_);
        _this.button_.addEventListener(EventType.CLICK, _this.handleClick_.bind(_this), false);
        var cssClasses = _this.cssClassName_ +
            ' ' +
            CLASS_UNSELECTABLE +
            ' ' +
            CLASS_CONTROL +
            ' ' +
            (!isFullScreenSupported() ? CLASS_UNSUPPORTED : '');
        var element = _this.element;
        element.className = cssClasses;
        element.appendChild(_this.button_);
        /**
         * @private
         * @type {boolean}
         */
        _this.keys_ = options.keys !== undefined ? options.keys : false;
        /**
         * @private
         * @type {HTMLElement|string|undefined}
         */
        _this.source_ = options.source;
        return _this;
    }
    /**
     * @param {MouseEvent} event The event to handle
     * @private
     */
    FullScreen.prototype.handleClick_ = function (event) {
        event.preventDefault();
        this.handleFullScreen_();
    };
    /**
     * @private
     */
    FullScreen.prototype.handleFullScreen_ = function () {
        if (!isFullScreenSupported()) {
            return;
        }
        var map = this.getMap();
        if (!map) {
            return;
        }
        if (isFullScreen()) {
            exitFullScreen();
        }
        else {
            var element = void 0;
            if (this.source_) {
                element =
                    typeof this.source_ === 'string'
                        ? document.getElementById(this.source_)
                        : this.source_;
            }
            else {
                element = map.getTargetElement();
            }
            if (this.keys_) {
                requestFullScreenWithKeys(element);
            }
            else {
                requestFullScreen(element);
            }
        }
    };
    /**
     * @private
     */
    FullScreen.prototype.handleFullScreenChange_ = function () {
        var map = this.getMap();
        if (isFullScreen()) {
            this.setClassName_(this.button_, true);
            replaceNode(this.labelActiveNode_, this.labelNode_);
            this.dispatchEvent(FullScreenEventType.ENTERFULLSCREEN);
        }
        else {
            this.setClassName_(this.button_, false);
            replaceNode(this.labelNode_, this.labelActiveNode_);
            this.dispatchEvent(FullScreenEventType.LEAVEFULLSCREEN);
        }
        if (map) {
            map.updateSize();
        }
    };
    /**
     * @param {HTMLElement} element Target element
     * @param {boolean} fullscreen True if fullscreen class name should be active
     * @private
     */
    FullScreen.prototype.setClassName_ = function (element, fullscreen) {
        var _a, _b, _c;
        var activeClassName = this.activeClassName_;
        var inactiveClassName = this.inactiveClassName_;
        var nextClassName = fullscreen ? activeClassName : inactiveClassName;
        (_a = element.classList).remove.apply(_a, activeClassName);
        (_b = element.classList).remove.apply(_b, inactiveClassName);
        (_c = element.classList).add.apply(_c, nextClassName);
    };
    /**
     * Remove the control from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     * @param {import("../PluggableMap.js").default} map Map.
     * @api
     */
    FullScreen.prototype.setMap = function (map) {
        _super.prototype.setMap.call(this, map);
        if (map) {
            for (var i = 0, ii = events.length; i < ii; ++i) {
                this.listenerKeys.push(listen(document, events[i], this.handleFullScreenChange_, this));
            }
        }
    };
    return FullScreen;
}(Control));
/**
 * @return {boolean} Fullscreen is supported by the current platform.
 */
function isFullScreenSupported() {
    var body = document.body;
    return !!(body['webkitRequestFullscreen'] ||
        (body['msRequestFullscreen'] && document['msFullscreenEnabled']) ||
        (body.requestFullscreen && document.fullscreenEnabled));
}
/**
 * @return {boolean} Element is currently in fullscreen.
 */
function isFullScreen() {
    return !!(document['webkitIsFullScreen'] ||
        document['msFullscreenElement'] ||
        document.fullscreenElement);
}
/**
 * Request to fullscreen an element.
 * @param {HTMLElement} element Element to request fullscreen
 */
function requestFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    }
    else if (element['msRequestFullscreen']) {
        element['msRequestFullscreen']();
    }
    else if (element['webkitRequestFullscreen']) {
        element['webkitRequestFullscreen']();
    }
}
/**
 * Request to fullscreen an element with keyboard input.
 * @param {HTMLElement} element Element to request fullscreen
 */
function requestFullScreenWithKeys(element) {
    if (element['webkitRequestFullscreen']) {
        element['webkitRequestFullscreen']();
    }
    else {
        requestFullScreen(element);
    }
}
/**
 * Exit fullscreen.
 */
function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document['msExitFullscreen']) {
        document['msExitFullscreen']();
    }
    else if (document['webkitExitFullscreen']) {
        document['webkitExitFullscreen']();
    }
}
export default FullScreen;
//# sourceMappingURL=FullScreen.js.map