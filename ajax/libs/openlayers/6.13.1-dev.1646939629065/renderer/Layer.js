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
 * @module ol/renderer/Layer
 */
import EventType from '../events/EventType.js';
import ImageState from '../ImageState.js';
import Observable from '../Observable.js';
import SourceState from '../source/State.js';
import { abstract } from '../util.js';
/**
 * @template {import("../layer/Layer.js").default} LayerType
 */
var LayerRenderer = /** @class */ (function (_super) {
    __extends(LayerRenderer, _super);
    /**
     * @param {LayerType} layer Layer.
     */
    function LayerRenderer(layer) {
        var _this = _super.call(this) || this;
        /**
         * The renderer is initialized and ready to render.
         * @type {boolean}
         */
        _this.ready = true;
        /** @private */
        _this.boundHandleImageChange_ = _this.handleImageChange_.bind(_this);
        /**
         * @protected
         * @type {LayerType}
         */
        _this.layer_ = layer;
        /**
         * @type {import("../render/canvas/ExecutorGroup").default}
         */
        _this.declutterExecutorGroup = null;
        return _this;
    }
    /**
     * Asynchronous layer level hit detection.
     * @param {import("../pixel.js").Pixel} pixel Pixel.
     * @return {Promise<Array<import("../Feature").default>>} Promise that resolves with
     * an array of features.
     */
    LayerRenderer.prototype.getFeatures = function (pixel) {
        return abstract();
    };
    /**
     * @param {import("../pixel.js").Pixel} pixel Pixel.
     * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
     */
    LayerRenderer.prototype.getData = function (pixel) {
        return null;
    };
    /**
     * Determine whether render should be called.
     * @abstract
     * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
     * @return {boolean} Layer is ready to be rendered.
     */
    LayerRenderer.prototype.prepareFrame = function (frameState) {
        return abstract();
    };
    /**
     * Render the layer.
     * @abstract
     * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
     * @param {HTMLElement} target Target that may be used to render content to.
     * @return {HTMLElement} The rendered element.
     */
    LayerRenderer.prototype.renderFrame = function (frameState, target) {
        return abstract();
    };
    /**
     * @param {Object<number, Object<string, import("../Tile.js").default>>} tiles Lookup of loaded tiles by zoom level.
     * @param {number} zoom Zoom level.
     * @param {import("../Tile.js").default} tile Tile.
     * @return {boolean|void} If `false`, the tile will not be considered loaded.
     */
    LayerRenderer.prototype.loadedTileCallback = function (tiles, zoom, tile) {
        if (!tiles[zoom]) {
            tiles[zoom] = {};
        }
        tiles[zoom][tile.tileCoord.toString()] = tile;
        return undefined;
    };
    /**
     * Create a function that adds loaded tiles to the tile lookup.
     * @param {import("../source/Tile.js").default} source Tile source.
     * @param {import("../proj/Projection.js").default} projection Projection of the tiles.
     * @param {Object<number, Object<string, import("../Tile.js").default>>} tiles Lookup of loaded tiles by zoom level.
     * @return {function(number, import("../TileRange.js").default):boolean} A function that can be
     *     called with a zoom level and a tile range to add loaded tiles to the lookup.
     * @protected
     */
    LayerRenderer.prototype.createLoadedTileFinder = function (source, projection, tiles) {
        return (
        /**
         * @param {number} zoom Zoom level.
         * @param {import("../TileRange.js").default} tileRange Tile range.
         * @return {boolean} The tile range is fully loaded.
         * @this {LayerRenderer}
         */
        function (zoom, tileRange) {
            var callback = this.loadedTileCallback.bind(this, tiles, zoom);
            return source.forEachLoadedTile(projection, zoom, tileRange, callback);
        }.bind(this));
    };
    /**
     * @abstract
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @param {import("./vector.js").FeatureCallback<T>} callback Feature callback.
     * @param {Array<import("./Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
     * @return {T|undefined} Callback result.
     * @template T
     */
    LayerRenderer.prototype.forEachFeatureAtCoordinate = function (coordinate, frameState, hitTolerance, callback, matches) {
        return undefined;
    };
    /**
     * @abstract
     * @param {import("../pixel.js").Pixel} pixel Pixel.
     * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @return {Uint8ClampedArray|Uint8Array} The result.  If there is no data at the pixel
     *    location, null will be returned.  If there is data, but pixel values cannot be
     *    returned, and empty array will be returned.
     */
    LayerRenderer.prototype.getDataAtPixel = function (pixel, frameState, hitTolerance) {
        return null;
    };
    /**
     * @return {LayerType} Layer.
     */
    LayerRenderer.prototype.getLayer = function () {
        return this.layer_;
    };
    /**
     * Perform action necessary to get the layer rendered after new fonts have loaded
     * @abstract
     */
    LayerRenderer.prototype.handleFontsChanged = function () { };
    /**
     * Handle changes in image state.
     * @param {import("../events/Event.js").default} event Image change event.
     * @private
     */
    LayerRenderer.prototype.handleImageChange_ = function (event) {
        var image = /** @type {import("../Image.js").default} */ (event.target);
        if (image.getState() === ImageState.LOADED) {
            this.renderIfReadyAndVisible();
        }
    };
    /**
     * Load the image if not already loaded, and register the image change
     * listener if needed.
     * @param {import("../ImageBase.js").default} image Image.
     * @return {boolean} `true` if the image is already loaded, `false` otherwise.
     * @protected
     */
    LayerRenderer.prototype.loadImage = function (image) {
        var imageState = image.getState();
        if (imageState != ImageState.LOADED && imageState != ImageState.ERROR) {
            image.addEventListener(EventType.CHANGE, this.boundHandleImageChange_);
        }
        if (imageState == ImageState.IDLE) {
            image.load();
            imageState = image.getState();
        }
        return imageState == ImageState.LOADED;
    };
    /**
     * @protected
     */
    LayerRenderer.prototype.renderIfReadyAndVisible = function () {
        var layer = this.getLayer();
        if (layer.getVisible() && layer.getSourceState() == SourceState.READY) {
            layer.changed();
        }
    };
    /**
     * Clean up.
     */
    LayerRenderer.prototype.disposeInternal = function () {
        delete this.layer_;
        _super.prototype.disposeInternal.call(this);
    };
    return LayerRenderer;
}(Observable));
export default LayerRenderer;
//# sourceMappingURL=Layer.js.map