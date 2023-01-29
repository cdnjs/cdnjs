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
 * @module ol/interaction/Link
 */
import EventType from '../events/EventType.js';
import Interaction from './Interaction.js';
import MapEventType from '../MapEventType.js';
import { assign } from '../obj.js';
import { listen, unlistenByKey } from '../events.js';
import { toFixed } from '../math.js';
/**
 * @param {number} number A number.
 * @return {number} A number with at most 5 decimal places.
 */
function to5(number) {
    return toFixed(number, 5);
}
/**
 * @param {string} string A string.
 * @return {number} A number representing the string.
 */
function readNumber(string) {
    return parseFloat(string);
}
/**
 * @param {number} number A number.
 * @return {string} A string representing the number.
 */
function writeNumber(number) {
    return to5(number).toString();
}
/**
 * @param {number} a A number.
 * @param {number} b A number.
 * @return {boolean} The numbers are different.
 */
function differentNumber(a, b) {
    if (isNaN(a)) {
        return false;
    }
    return a !== readNumber(writeNumber(b));
}
/**
 * @param {Array<number>} a An array of two numbers.
 * @param {Array<number>} b An array of two numbers.
 * @return {boolean} The arrays are different.
 */
function differentArray(a, b) {
    return differentNumber(a[0], b[0]) || differentNumber(a[1], b[1]);
}
/**
 * @typedef {Object} Options
 * @property {boolean|import('../View.js').AnimationOptions} [animate=true] Animate view transitions.
 * @property {boolean} [replace=false] Replace the current URL without creating the new entry in browser history.
 * By default, changes in the map state result in a new entry being added to the browser history.
 * @property {string} [prefix=''] By default, the URL will be updated with search parameters x, y, z, and r.  To
 * avoid collisions with existing search parameters that your application uses, you can supply a custom prefix for
 * the ones used by this interaction (e.g. 'ol:').
 */
/**
 * @classdesc
 * An interaction that synchronizes the map state with the URL.
 *
 * @api
 */
var Link = /** @class */ (function (_super) {
    __extends(Link, _super);
    /**
     * @param {Options} [opt_options] Link options.
     */
    function Link(opt_options) {
        var _this = _super.call(this) || this;
        var options = assign({ animate: true, replace: false, prefix: '' }, opt_options || {});
        var animationOptions;
        if (options.animate === true) {
            animationOptions = { duration: 250 };
        }
        else if (!options.animate) {
            animationOptions = null;
        }
        else {
            animationOptions = options.animate;
        }
        /**
         * @type {import('../View.js').AnimationOptions|null}
         * @private
         */
        _this.animationOptions_ = animationOptions;
        /**
         * @private
         * @type {boolean}
         */
        _this.replace_ = options.replace;
        /**
         * @private
         * @type {string}
         */
        _this.prefix_ = options.prefix;
        /**
         * @private
         * @type {!Array<import("../events.js").EventsKey>}
         */
        _this.listenerKeys_ = [];
        /**
         * @private
         * @type {boolean}
         */
        _this.initial_ = true;
        _this.updateState_ = _this.updateState_.bind(_this);
        return _this;
    }
    /**
     * @private
     * @param {string} name A parameter name.
     * @return {string} A name with the prefix applied.
     */
    Link.prototype.getParamName_ = function (name) {
        if (!this.prefix_) {
            return name;
        }
        return this.prefix_ + name;
    };
    /**
     * @private
     * @param {URLSearchParams} params The search params.
     * @param {string} name The unprefixed parameter name.
     * @return {string|null} The parameter value.
     */
    Link.prototype.get_ = function (params, name) {
        return params.get(this.getParamName_(name));
    };
    /**
     * @private
     * @param {URLSearchParams} params The search params.
     * @param {string} name The unprefixed parameter name.
     * @param {string} value The param value.
     */
    Link.prototype.set_ = function (params, name, value) {
        params.set(this.getParamName_(name), value);
    };
    /**
     * @private
     * @param {URLSearchParams} params The search params.
     * @param {string} name The unprefixed parameter name.
     */
    Link.prototype.delete_ = function (params, name) {
        params.delete(this.getParamName_(name));
    };
    /**
     * @param {import("../PluggableMap.js").default|null} map Map.
     */
    Link.prototype.setMap = function (map) {
        var oldMap = this.getMap();
        _super.prototype.setMap.call(this, map);
        if (map === oldMap) {
            return;
        }
        if (oldMap) {
            this.unregisterListeners_(oldMap);
        }
        if (map) {
            this.initial_ = true;
            this.updateState_();
            this.registerListeners_(map);
        }
    };
    /**
     * @param {import("../PluggableMap.js").default} map Map.
     * @private
     */
    Link.prototype.registerListeners_ = function (map) {
        this.listenerKeys_.push(listen(map, MapEventType.MOVEEND, this.updateUrl_, this), listen(map.getLayerGroup(), EventType.CHANGE, this.updateUrl_, this), listen(map, 'change:layergroup', this.handleChangeLayerGroup_, this));
        if (!this.replace_) {
            addEventListener('popstate', this.updateState_);
        }
    };
    /**
     * @param {import("../PluggableMap.js").default} map Map.
     * @private
     */
    Link.prototype.unregisterListeners_ = function (map) {
        for (var i = 0, ii = this.listenerKeys_.length; i < ii; ++i) {
            unlistenByKey(this.listenerKeys_[i]);
        }
        this.listenerKeys_.length = 0;
        if (!this.replace_) {
            removeEventListener('popstate', this.updateState_);
        }
        var url = new URL(window.location.href);
        var params = url.searchParams;
        this.delete_(params, 'x');
        this.delete_(params, 'y');
        this.delete_(params, 'z');
        this.delete_(params, 'r');
        this.delete_(params, 'l');
        window.history.replaceState(null, '', url);
    };
    /**
     * @private
     */
    Link.prototype.handleChangeLayerGroup_ = function () {
        var map = this.getMap();
        if (!map) {
            return;
        }
        this.unregisterListeners_(map);
        this.registerListeners_(map);
        this.initial_ = true;
        this.updateUrl_();
    };
    /**
     * @private
     */
    Link.prototype.updateState_ = function () {
        var map = this.getMap();
        if (!map) {
            return;
        }
        var view = map.getView();
        if (!view) {
            return;
        }
        var url = new URL(window.location.href);
        var params = url.searchParams;
        var updateView = false;
        /**
         * @type {import('../View.js').AnimationOptions}
         */
        var viewProperties = {};
        var zoom = readNumber(this.get_(params, 'z'));
        if (differentNumber(zoom, view.getZoom())) {
            updateView = true;
            viewProperties.zoom = zoom;
        }
        var rotation = readNumber(this.get_(params, 'r'));
        if (differentNumber(rotation, view.getRotation())) {
            updateView = true;
            viewProperties.rotation = rotation;
        }
        var center = [
            readNumber(this.get_(params, 'x')),
            readNumber(this.get_(params, 'y')),
        ];
        if (differentArray(center, view.getCenter())) {
            updateView = true;
            viewProperties.center = center;
        }
        if (updateView) {
            if (!this.initial_ && this.animationOptions_) {
                view.animate(assign(viewProperties, this.animationOptions_));
            }
            else {
                if (viewProperties.center) {
                    view.setCenter(viewProperties.center);
                }
                if ('zoom' in viewProperties) {
                    view.setZoom(viewProperties.zoom);
                }
                if ('rotation' in viewProperties) {
                    view.setRotation(viewProperties.rotation);
                }
            }
        }
        var layers = map.getAllLayers();
        var layersParam = this.get_(params, 'l');
        if (layersParam && layersParam.length === layers.length) {
            for (var i = 0, ii = layers.length; i < ii; ++i) {
                var value = parseInt(layersParam[i]);
                if (!isNaN(value)) {
                    var visible = Boolean(value);
                    var layer = layers[i];
                    if (layer.getVisible() !== visible) {
                        layer.setVisible(visible);
                    }
                }
            }
        }
    };
    /**
     * @private
     */
    Link.prototype.updateUrl_ = function () {
        var map = this.getMap();
        if (!map) {
            return;
        }
        var view = map.getView();
        if (!view) {
            return;
        }
        var initial = this.initial_;
        this.initial_ = false;
        var center = view.getCenter();
        var zoom = view.getZoom();
        var rotation = view.getRotation();
        var layers = map.getAllLayers();
        var visibilities = new Array(layers.length);
        for (var i = 0, ii = layers.length; i < ii; ++i) {
            visibilities[i] = layers[i].getVisible() ? '1' : '0';
        }
        var url = new URL(window.location.href);
        var params = url.searchParams;
        this.set_(params, 'x', writeNumber(center[0]));
        this.set_(params, 'y', writeNumber(center[1]));
        this.set_(params, 'z', writeNumber(zoom));
        this.set_(params, 'r', writeNumber(rotation));
        this.set_(params, 'l', visibilities.join(''));
        if (url.href !== window.location.href) {
            if (initial || this.replace_) {
                window.history.replaceState(null, '', url);
            }
            else {
                window.history.pushState(null, '', url);
            }
        }
    };
    return Link;
}(Interaction));
export default Link;
//# sourceMappingURL=Link.js.map