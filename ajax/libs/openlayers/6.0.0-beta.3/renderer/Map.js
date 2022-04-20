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
 * @module ol/renderer/Map
 */
import { abstract, getUid } from '../util.js';
import Disposable from '../Disposable.js';
import { listen, unlistenByKey } from '../events.js';
import EventType from '../events/EventType.js';
import { getWidth } from '../extent.js';
import { TRUE } from '../functions.js';
import { visibleAtResolution } from '../layer/Layer.js';
import { shared as iconImageCache } from '../style/IconImageCache.js';
import { compose as composeTransform, makeInverse } from '../transform.js';
/**
 * @abstract
 */
var MapRenderer = /** @class */ (function (_super) {
    __extends(MapRenderer, _super);
    /**
     * @param {import("../PluggableMap.js").default} map Map.
     */
    function MapRenderer(map) {
        var _this = _super.call(this) || this;
        /**
         * @private
         * @type {import("../PluggableMap.js").default}
         */
        _this.map_ = map;
        /**
         * @private
         * @type {!Object<string, import("./Layer.js").default>}
         */
        _this.layerRenderers_ = {};
        /**
         * @private
         * @type {Object<string, import("../events.js").EventsKey>}
         */
        _this.layerRendererListeners_ = {};
        return _this;
    }
    /**
     * @abstract
     * @param {import("../render/EventType.js").default} type Event type.
     * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
     */
    MapRenderer.prototype.dispatchRenderEvent = function (type, frameState) {
        abstract();
    };
    /**
     * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
     * @protected
     */
    MapRenderer.prototype.calculateMatrices2D = function (frameState) {
        var viewState = frameState.viewState;
        var coordinateToPixelTransform = frameState.coordinateToPixelTransform;
        var pixelToCoordinateTransform = frameState.pixelToCoordinateTransform;
        composeTransform(coordinateToPixelTransform, frameState.size[0] / 2, frameState.size[1] / 2, 1 / viewState.resolution, -1 / viewState.resolution, -viewState.rotation, -viewState.center[0], -viewState.center[1]);
        makeInverse(pixelToCoordinateTransform, coordinateToPixelTransform);
    };
    /**
     * Removes all layer renderers.
     */
    MapRenderer.prototype.removeLayerRenderers = function () {
        for (var key in this.layerRenderers_) {
            this.removeLayerRendererByKey_(key).dispose();
        }
    };
    /**
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @param {function(this: S, import("../Feature.js").FeatureLike,
     *     import("../layer/Layer.js").default): T} callback Feature callback.
     * @param {S} thisArg Value to use as `this` when executing `callback`.
     * @param {function(this: U, import("../layer/Layer.js").default): boolean} layerFilter Layer filter
     *     function, only layers which are visible and for which this function
     *     returns `true` will be tested for features.  By default, all visible
     *     layers will be tested.
     * @param {U} thisArg2 Value to use as `this` when executing `layerFilter`.
     * @return {T|undefined} Callback result.
     * @template S,T,U
     */
    MapRenderer.prototype.forEachFeatureAtCoordinate = function (coordinate, frameState, hitTolerance, callback, thisArg, layerFilter, thisArg2) {
        var result;
        var viewState = frameState.viewState;
        var viewResolution = viewState.resolution;
        /**
         * @param {boolean} managed Managed layer.
         * @param {import("../Feature.js").FeatureLike} feature Feature.
         * @param {import("../layer/Layer.js").default} layer Layer.
         * @return {?} Callback result.
         */
        function forEachFeatureAtCoordinate(managed, feature, layer) {
            if (!(getUid(feature) in frameState.skippedFeatureUids && !managed)) {
                return callback.call(thisArg, feature, managed ? layer : null);
            }
        }
        var projection = viewState.projection;
        var translatedCoordinate = coordinate;
        if (projection.canWrapX()) {
            var projectionExtent = projection.getExtent();
            var worldWidth = getWidth(projectionExtent);
            var x = coordinate[0];
            if (x < projectionExtent[0] || x > projectionExtent[2]) {
                var worldsAway = Math.ceil((projectionExtent[0] - x) / worldWidth);
                translatedCoordinate = [x + worldWidth * worldsAway, coordinate[1]];
            }
        }
        var layerStates = frameState.layerStatesArray;
        var numLayers = layerStates.length;
        var i;
        for (i = numLayers - 1; i >= 0; --i) {
            var layerState = layerStates[i];
            var layer = /** @type {import("../layer/Layer.js").default} */ (layerState.layer);
            if (visibleAtResolution(layerState, viewResolution) && layerFilter.call(thisArg2, layer)) {
                var layerRenderer = this.getLayerRenderer(layer);
                var source = layer.getSource();
                if (layerRenderer && source) {
                    var callback_1 = forEachFeatureAtCoordinate.bind(null, layerState.managed);
                    result = layerRenderer.forEachFeatureAtCoordinate(source.getWrapX() ? translatedCoordinate : coordinate, frameState, hitTolerance, callback_1);
                }
                if (result) {
                    return result;
                }
            }
        }
        return undefined;
    };
    /**
     * @abstract
     * @param {import("../pixel.js").Pixel} pixel Pixel.
     * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @param {function(this: S, import("../layer/Layer.js").default, (Uint8ClampedArray|Uint8Array)): T} callback Layer
     *     callback.
     * @param {function(this: U, import("../layer/Layer.js").default): boolean} layerFilter Layer filter
     *     function, only layers which are visible and for which this function
     *     returns `true` will be tested for features.  By default, all visible
     *     layers will be tested.
     * @return {T|undefined} Callback result.
     * @template S,T,U
     */
    MapRenderer.prototype.forEachLayerAtPixel = function (pixel, frameState, hitTolerance, callback, layerFilter) {
        return abstract();
    };
    /**
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @param {function(this: U, import("../layer/Layer.js").default): boolean} layerFilter Layer filter
     *     function, only layers which are visible and for which this function
     *     returns `true` will be tested for features.  By default, all visible
     *     layers will be tested.
     * @param {U} thisArg Value to use as `this` when executing `layerFilter`.
     * @return {boolean} Is there a feature at the given coordinate?
     * @template U
     */
    MapRenderer.prototype.hasFeatureAtCoordinate = function (coordinate, frameState, hitTolerance, layerFilter, thisArg) {
        var hasFeature = this.forEachFeatureAtCoordinate(coordinate, frameState, hitTolerance, TRUE, this, layerFilter, thisArg);
        return hasFeature !== undefined;
    };
    /**
     * @param {import("../layer/Layer.js").default} layer Layer.
     * @protected
     * @return {import("./Layer.js").default} Layer renderer. May return null.
     */
    MapRenderer.prototype.getLayerRenderer = function (layer) {
        var layerKey = getUid(layer);
        if (layerKey in this.layerRenderers_) {
            return this.layerRenderers_[layerKey];
        }
        var renderer = layer.getRenderer();
        if (!renderer) {
            return null;
        }
        this.layerRenderers_[layerKey] = renderer;
        this.layerRendererListeners_[layerKey] = listen(renderer, EventType.CHANGE, this.handleLayerRendererChange_, this);
        return renderer;
    };
    /**
     * @protected
     * @return {Object<string, import("./Layer.js").default>} Layer renderers.
     */
    MapRenderer.prototype.getLayerRenderers = function () {
        return this.layerRenderers_;
    };
    /**
     * @return {import("../PluggableMap.js").default} Map.
     */
    MapRenderer.prototype.getMap = function () {
        return this.map_;
    };
    /**
     * Handle changes in a layer renderer.
     * @private
     */
    MapRenderer.prototype.handleLayerRendererChange_ = function () {
        this.map_.render();
    };
    /**
     * @param {string} layerKey Layer key.
     * @return {import("./Layer.js").default} Layer renderer.
     * @private
     */
    MapRenderer.prototype.removeLayerRendererByKey_ = function (layerKey) {
        var layerRenderer = this.layerRenderers_[layerKey];
        delete this.layerRenderers_[layerKey];
        unlistenByKey(this.layerRendererListeners_[layerKey]);
        delete this.layerRendererListeners_[layerKey];
        return layerRenderer;
    };
    /**
     * Render.
     * @abstract
     * @param {?import("../PluggableMap.js").FrameState} frameState Frame state.
     */
    MapRenderer.prototype.renderFrame = function (frameState) {
        abstract();
    };
    /**
     * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
     * @protected
     */
    MapRenderer.prototype.scheduleExpireIconCache = function (frameState) {
        if (iconImageCache.canExpireCache()) {
            frameState.postRenderFunctions.push(expireIconCache);
        }
    };
    /**
     * @param {!import("../PluggableMap.js").FrameState} frameState Frame state.
     * @protected
     */
    MapRenderer.prototype.scheduleRemoveUnusedLayerRenderers = function (frameState) {
        var layerStatesMap = getLayerStatesMap(frameState.layerStatesArray);
        var _loop_1 = function (layerKey) {
            if (!(layerKey in layerStatesMap)) {
                frameState.postRenderFunctions.push(function () {
                    this.removeLayerRendererByKey_(layerKey).dispose();
                }.bind(this_1));
            }
        };
        var this_1 = this;
        for (var layerKey in this.layerRenderers_) {
            _loop_1(layerKey);
        }
    };
    return MapRenderer;
}(Disposable));
/**
 * @param {import("../PluggableMap.js").default} map Map.
 * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
 */
function expireIconCache(map, frameState) {
    iconImageCache.expire();
}
/**
 * @param {Array<import("../layer/Layer.js").State>} layerStatesArray Layer states array.
 * @return {Object<string, import("../layer/Layer.js").State>} States mapped by layer uid.
 */
function getLayerStatesMap(layerStatesArray) {
    return layerStatesArray.reduce(function (acc, state) {
        acc[getUid(state.layer)] = state;
        return acc;
    }, {});
}
export default MapRenderer;
//# sourceMappingURL=Map.js.map