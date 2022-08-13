/**
 * @module ol/control/MousePosition
 */
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
import Control from './Control.js';
import EventType from '../pointer/EventType.js';
import { getChangeEventType } from '../Object.js';
import { get as getProjection, getTransformFromProjections, getUserProjection, identityTransform, } from '../proj.js';
import { listen } from '../events.js';
/**
 * @type {string}
 */
var PROJECTION = 'projection';
/**
 * @type {string}
 */
var COORDINATE_FORMAT = 'coordinateFormat';
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-mouse-position'] CSS class name.
 * @property {import("../coordinate.js").CoordinateFormat} [coordinateFormat] Coordinate format.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {function(import("../MapEvent.js").default):void} [render] Function called when the
 * control should be re-rendered. This is called in a `requestAnimationFrame`
 * callback.
 * @property {HTMLElement|string} [target] Specify a target if you want the
 * control to be rendered outside of the map's viewport.
 * @property {string} [undefinedHTML='&#160;'] Markup to show when coordinates are not
 * available (e.g. when the pointer leaves the map viewport).  By default, the last position
 * will be replaced with `'&#160;'` (`&nbsp;`) when the pointer leaves the viewport.  To
 * retain the last rendered position, set this option to something falsey (like an empty
 * string `''`).
 */
/**
 * @classdesc
 * A control to show the 2D coordinates of the mouse cursor. By default, these
 * are in the view projection, but can be in any supported projection.
 * By default the control is shown in the top right corner of the map, but this
 * can be changed by using the css selector `.ol-mouse-position`.
 *
 * On touch devices, which usually do not have a mouse cursor, the coordinates
 * of the currently touched position are shown.
 *
 * @api
 */
var MousePosition = /** @class */ (function (_super) {
    __extends(MousePosition, _super);
    /**
     * @param {Options=} opt_options Mouse position options.
     */
    function MousePosition(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        var element = document.createElement('div');
        element.className =
            options.className !== undefined ? options.className : 'ol-mouse-position';
        _this = _super.call(this, {
            element: element,
            render: options.render,
            target: options.target,
        }) || this;
        _this.addEventListener(getChangeEventType(PROJECTION), _this.handleProjectionChanged_);
        if (options.coordinateFormat) {
            _this.setCoordinateFormat(options.coordinateFormat);
        }
        if (options.projection) {
            _this.setProjection(options.projection);
        }
        /**
         * @private
         * @type {string}
         */
        _this.undefinedHTML_ =
            options.undefinedHTML !== undefined ? options.undefinedHTML : '&#160;';
        /**
         * @private
         * @type {boolean}
         */
        _this.renderOnMouseOut_ = !!_this.undefinedHTML_;
        /**
         * @private
         * @type {string}
         */
        _this.renderedHTML_ = element.innerHTML;
        /**
         * @private
         * @type {?import("../proj/Projection.js").default}
         */
        _this.mapProjection_ = null;
        /**
         * @private
         * @type {?import("../proj.js").TransformFunction}
         */
        _this.transform_ = null;
        return _this;
    }
    /**
     * @private
     */
    MousePosition.prototype.handleProjectionChanged_ = function () {
        this.transform_ = null;
    };
    /**
     * Return the coordinate format type used to render the current position or
     * undefined.
     * @return {import("../coordinate.js").CoordinateFormat|undefined} The format to render the current
     *     position in.
     * @observable
     * @api
     */
    MousePosition.prototype.getCoordinateFormat = function () {
        return /** @type {import("../coordinate.js").CoordinateFormat|undefined} */ (this.get(COORDINATE_FORMAT));
    };
    /**
     * Return the projection that is used to report the mouse position.
     * @return {import("../proj/Projection.js").default|undefined} The projection to report mouse
     *     position in.
     * @observable
     * @api
     */
    MousePosition.prototype.getProjection = function () {
        return /** @type {import("../proj/Projection.js").default|undefined} */ (this.get(PROJECTION));
    };
    /**
     * @param {MouseEvent} event Browser event.
     * @protected
     */
    MousePosition.prototype.handleMouseMove = function (event) {
        var map = this.getMap();
        this.updateHTML_(map.getEventPixel(event));
    };
    /**
     * @param {Event} event Browser event.
     * @protected
     */
    MousePosition.prototype.handleMouseOut = function (event) {
        this.updateHTML_(null);
    };
    /**
     * Remove the control from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     * @param {import("../PluggableMap.js").default} map Map.
     * @api
     */
    MousePosition.prototype.setMap = function (map) {
        _super.prototype.setMap.call(this, map);
        if (map) {
            var viewport = map.getViewport();
            this.listenerKeys.push(listen(viewport, EventType.POINTERMOVE, this.handleMouseMove, this));
            if (this.renderOnMouseOut_) {
                this.listenerKeys.push(listen(viewport, EventType.POINTEROUT, this.handleMouseOut, this));
            }
        }
    };
    /**
     * Set the coordinate format type used to render the current position.
     * @param {import("../coordinate.js").CoordinateFormat} format The format to render the current
     *     position in.
     * @observable
     * @api
     */
    MousePosition.prototype.setCoordinateFormat = function (format) {
        this.set(COORDINATE_FORMAT, format);
    };
    /**
     * Set the projection that is used to report the mouse position.
     * @param {import("../proj.js").ProjectionLike} projection The projection to report mouse
     *     position in.
     * @observable
     * @api
     */
    MousePosition.prototype.setProjection = function (projection) {
        this.set(PROJECTION, getProjection(projection));
    };
    /**
     * @param {?import("../pixel.js").Pixel} pixel Pixel.
     * @private
     */
    MousePosition.prototype.updateHTML_ = function (pixel) {
        var html = this.undefinedHTML_;
        if (pixel && this.mapProjection_) {
            if (!this.transform_) {
                var projection = this.getProjection();
                if (projection) {
                    this.transform_ = getTransformFromProjections(this.mapProjection_, projection);
                }
                else {
                    this.transform_ = identityTransform;
                }
            }
            var map = this.getMap();
            var coordinate = map.getCoordinateFromPixelInternal(pixel);
            if (coordinate) {
                var userProjection = getUserProjection();
                if (userProjection) {
                    this.transform_ = getTransformFromProjections(this.mapProjection_, userProjection);
                }
                this.transform_(coordinate, coordinate);
                var coordinateFormat = this.getCoordinateFormat();
                if (coordinateFormat) {
                    html = coordinateFormat(coordinate);
                }
                else {
                    html = coordinate.toString();
                }
            }
        }
        if (!this.renderedHTML_ || html !== this.renderedHTML_) {
            this.element.innerHTML = html;
            this.renderedHTML_ = html;
        }
    };
    /**
     * Update the projection. Rendering of the coordinates is done in
     * `handleMouseMove` and `handleMouseUp`.
     * @param {import("../MapEvent.js").default} mapEvent Map event.
     * @override
     */
    MousePosition.prototype.render = function (mapEvent) {
        var frameState = mapEvent.frameState;
        if (!frameState) {
            this.mapProjection_ = null;
        }
        else {
            if (this.mapProjection_ != frameState.viewState.projection) {
                this.mapProjection_ = frameState.viewState.projection;
                this.transform_ = null;
            }
        }
    };
    return MousePosition;
}(Control));
export default MousePosition;
//# sourceMappingURL=MousePosition.js.map