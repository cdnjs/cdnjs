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
 * @module ol/layer/BaseTile
 */
import Layer from './Layer.js';
import TileProperty from './TileProperty.js';
import { assign } from '../obj.js';
/**
 * @typedef {Object} Options
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [preload=0] Preload. Load low-resolution tiles up to `preload` levels. `0`
 * means no preloading.
 * @property {import("../source/Tile.js").default} [source] Source for this layer.
 * @property {import("../PluggableMap.js").default} [map] Sets the layer as overlay on a map. The map will not manage
 * this layer in its layers collection, and the layer will be rendered on top. This is useful for
 * temporary layers. The standard way to add a layer to a map and have it managed by the map is to
 * use {@link module:ol/Map#addLayer}.
 * @property {boolean} [useInterimTilesOnError=true] Use interim tiles on error.
 */
/**
 * @classdesc
 * For layer sources that provide pre-rendered, tiled images in grids that are
 * organized by zoom levels for specific resolutions.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @extends {Layer<import("../source/Tile.js").default>}
 * @api
 */
var BaseTileLayer = /** @class */ (function (_super) {
    __extends(BaseTileLayer, _super);
    /**
     * @param {Options=} opt_options Tile layer options.
     */
    function BaseTileLayer(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        var baseOptions = assign({}, options);
        delete baseOptions.preload;
        delete baseOptions.useInterimTilesOnError;
        _this = _super.call(this, baseOptions) || this;
        _this.setPreload(options.preload !== undefined ? options.preload : 0);
        _this.setUseInterimTilesOnError(options.useInterimTilesOnError !== undefined ?
            options.useInterimTilesOnError : true);
        return _this;
    }
    /**
    * Return the level as number to which we will preload tiles up to.
    * @return {number} The level to preload tiles up to.
    * @observable
    * @api
    */
    BaseTileLayer.prototype.getPreload = function () {
        return /** @type {number} */ (this.get(TileProperty.PRELOAD));
    };
    /**
    * Set the level as number to which we will preload tiles up to.
    * @param {number} preload The level to preload tiles up to.
    * @observable
    * @api
    */
    BaseTileLayer.prototype.setPreload = function (preload) {
        this.set(TileProperty.PRELOAD, preload);
    };
    /**
    * Whether we use interim tiles on error.
    * @return {boolean} Use interim tiles on error.
    * @observable
    * @api
    */
    BaseTileLayer.prototype.getUseInterimTilesOnError = function () {
        return /** @type {boolean} */ (this.get(TileProperty.USE_INTERIM_TILES_ON_ERROR));
    };
    /**
    * Set whether we use interim tiles on error.
    * @param {boolean} useInterimTilesOnError Use interim tiles on error.
    * @observable
    * @api
    */
    BaseTileLayer.prototype.setUseInterimTilesOnError = function (useInterimTilesOnError) {
        this.set(TileProperty.USE_INTERIM_TILES_ON_ERROR, useInterimTilesOnError);
    };
    return BaseTileLayer;
}(Layer));
export default BaseTileLayer;
//# sourceMappingURL=BaseTile.js.map