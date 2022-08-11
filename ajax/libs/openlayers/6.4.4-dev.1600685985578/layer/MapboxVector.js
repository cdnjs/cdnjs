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
/**
 * @module ol/layer/MapboxVector
 */
import BaseEvent from '../events/Event.js';
import EventType from '../events/EventType.js';
import MVT from '../format/MVT.js';
import SourceState from '../source/State.js';
import VectorTileLayer from '../layer/VectorTile.js';
import VectorTileSource from '../source/VectorTile.js';
import { applyStyle } from 'ol-mapbox-style';
var mapboxBaseUrl = 'https://api.mapbox.com';
/**
 * Gets the path from a mapbox:// URL.
 * @param {string} url The Mapbox URL.
 * @return {string} The path.
 * @private
 */
export function getMapboxPath(url) {
    var startsWith = 'mapbox://';
    if (url.indexOf(startsWith) !== 0) {
        return '';
    }
    return url.slice(startsWith.length);
}
/**
 * Turns mapbox:// sprite URLs into resolvable URLs.
 * @param {string} url The sprite URL.
 * @param {string} token The access token.
 * @return {string} A resolvable URL.
 * @private
 */
export function normalizeSpriteUrl(url, token) {
    var mapboxPath = getMapboxPath(url);
    if (!mapboxPath) {
        return url;
    }
    var startsWith = 'sprites/';
    if (mapboxPath.indexOf(startsWith) !== 0) {
        throw new Error("unexpected sprites url: " + url);
    }
    var sprite = mapboxPath.slice(startsWith.length);
    return mapboxBaseUrl + "/styles/v1/" + sprite + "/sprite?access_token=" + token;
}
/**
 * Turns mapbox:// glyphs URLs into resolvable URLs.
 * @param {string} url The glyphs URL.
 * @param {string} token The access token.
 * @return {string} A resolvable URL.
 * @private
 */
export function normalizeGlyphsUrl(url, token) {
    var mapboxPath = getMapboxPath(url);
    if (!mapboxPath) {
        return url;
    }
    var startsWith = 'fonts/';
    if (mapboxPath.indexOf(startsWith) !== 0) {
        throw new Error("unexpected fonts url: " + url);
    }
    var font = mapboxPath.slice(startsWith.length);
    return mapboxBaseUrl + "/fonts/v1/" + font + "/0-255.pbf?access_token=" + token;
}
/**
 * Turns mapbox:// style URLs into resolvable URLs.
 * @param {string} url The style URL.
 * @param {string} token The access token.
 * @return {string} A resolvable URL.
 * @private
 */
export function normalizeStyleUrl(url, token) {
    var mapboxPath = getMapboxPath(url);
    if (!mapboxPath) {
        return url;
    }
    var startsWith = 'styles/';
    if (mapboxPath.indexOf(startsWith) !== 0) {
        throw new Error("unexpected style url: " + url);
    }
    var style = mapboxPath.slice(startsWith.length);
    return mapboxBaseUrl + "/styles/v1/" + style + "?&access_token=" + token;
}
/**
 * Turns mapbox:// source URLs into vector tile URL templates.
 * @param {string} url The source URL.
 * @param {string} token The access token.
 * @return {string} A vector tile template.
 * @private
 */
export function normalizeSourceUrl(url, token) {
    var mapboxPath = getMapboxPath(url);
    if (!mapboxPath) {
        return url;
    }
    return "https://{a-d}.tiles.mapbox.com/v4/" + mapboxPath + "/{z}/{x}/{y}.vector.pbf?access_token=" + token;
}
/**
 * @classdesc
 * Event emitted on configuration or loading error.
 */
var ErrorEvent = /** @class */ (function (_super) {
    __extends(ErrorEvent, _super);
    /**
     * @param {Error} error error object.
     */
    function ErrorEvent(error) {
        var _this = _super.call(this, EventType.ERROR) || this;
        /**
         * @type {Error}
         */
        _this.error = error;
        return _this;
    }
    return ErrorEvent;
}(BaseEvent));
/**
 * @typedef {Object} StyleObject
 * @property {Object<string, SourceObject>} sources The style sources.
 * @property {string} sprite The sprite URL.
 * @property {string} glyphs The glyphs URL.
 * @property {Array<LayerObject>} layers The style layers.
 */
/**
 * @typedef {Object} SourceObject
 * @property {string} url The source URL.
 * @property {SourceType} type The source type.
 */
/**
 * The Mapbox source type.
 * @enum {string}
 */
var SourceType = {
    VECTOR: 'vector',
};
/**
 * @typedef {Object} LayerObject
 * @property {string} id The layer id.
 * @property {string} source The source id.
 */
/**
 * @typedef {Object} Options
 * @property {string} styleUrl The URL of the Mapbox style object to use for this layer.  For a
 * style created with Mapbox Studio and hosted on Mapbox, this will look like
 * 'mapbox://styles/you/your-style'.
 * @property {string} accessToken The access token for your Mapbox style.
 * @property {string} [source] If your style uses more than one source, you need to use either the
 * `source` property or the `layers` property to limit rendering to a single vector source.  The
 * `source` property corresponds to the id of a vector source in your Mapbox style.
 * @property {Array<string>} [layers] Limit rendering to the list of included layers.  All layers
 * must share the same vector soource.  If your style uses more than one source, you need to use
 * either the `source` property or the `layers` property to limit rendering to a single vector
 * source.
 * @property {boolean} [declutter=true] Declutter images and text. Decluttering is applied to all
 * image and text styles of all Vector and VectorTile layers that have set this to `true`. The priority
 * is defined by the z-index of the layer, the `zIndex` of the style and the render order of features.
 * Higher z-index means higher priority. Within the same z-index, a feature rendered before another has
 * higher priority.
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
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
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {import("../render.js").OrderFunction} [renderOrder] Render order. Function to be used when sorting
 * features before rendering. By default features are drawn in the order that they are created. Use
 * `null` to avoid the sort, but get an undefined draw order.
 * @property {number} [renderBuffer=100] The buffer in pixels around the tile extent used by the
 * renderer when getting features from the vector tile for the rendering or hit-detection.
 * Recommended value: Vector tiles are usually generated with a buffer, so this value should match
 * the largest possible buffer of the used tiles. It should be at least the size of the largest
 * point symbol or line width.
 * @property {import("./VectorTileRenderType.js").default|string} [renderMode='hybrid'] Render mode for vector tiles:
 *  * `'image'`: Vector tiles are rendered as images. Great performance, but point symbols and texts
 *    are always rotated with the view and pixels are scaled during zoom animations. When `declutter`
 *    is set to `true`, the decluttering is done per tile resulting in labels and point symbols getting
 *    cut off at tile boundaries.
 *  * `'hybrid'`: Polygon and line elements are rendered as images, so pixels are scaled during zoom
 *    animations. Point symbols and texts are accurately rendered as vectors and can stay upright on
 *    rotated views.
 *  * `'vector'`: Everything is rendered as vectors. Use this mode for improved performance on vector
 *    tile layers with only a few rendered features (e.g. for highlighting a subset of features of
 *    another layer with the same source).
 * @property {import("../PluggableMap.js").default} [map] Sets the layer as overlay on a map. The map will not manage
 * this layer in its layers collection, and the layer will be rendered on top. This is useful for
 * temporary layers. The standard way to add a layer to a map and have it managed by the map is to
 * use {@link module:ol/Map#addLayer}.
 * @property {boolean} [updateWhileAnimating=false] When set to `true`, feature batches will be
 * recreated during animations. This means that no vectors will be shown clipped, but the setting
 * will have a performance impact for large amounts of vector data. When set to `false`, batches
 * will be recreated when no animation is active.
 * @property {boolean} [updateWhileInteracting=false] When set to `true`, feature batches will be
 * recreated during interactions. See also `updateWhileAnimating`.
 * @property {number} [preload=0] Preload. Load low-resolution tiles up to `preload` levels. `0`
 * means no preloading.
 * @property {boolean} [useInterimTilesOnError=true] Use interim tiles on error.
 */
/**
 * @classdesc
 * A vector tile layer based on a Mapbox style that uses a single vector source.  Configure
 * the layer with the `styleUrl` and `accessToken` shown in Mapbox Studio's share panel.
 * If the style uses more than one source, use the `source` property to choose a single
 * vector source.  If you want to render a subset of the layers in the style, use the `layers`
 * property (all layers must share the same vector source).  See the constructor options for
 * more detail.
 *
 *     var map = new Map({
 *       view: new View({
 *         center: [0, 0],
 *         zoom: 1
 *       }),
 *       layers: [
 *         new MapboxVector({
 *           styleUrl: 'mapbox://styles/mapbox/bright-v9',
 *           accessToken: 'your-mapbox-access-token-here'
 *         })
 *       ],
 *       target: 'map'
 *     });
 *
 * On configuration or loading error, the layer will trigger an `'error'` event.  Listeners
 * will receive an object with an `error` property that can be used to diagnose the problem.
 *
 * @param {Options} options Options.
 * @extends {VectorTileLayer}
 * @fires module:ol/events/Event~BaseEvent#event:error
 * @api
 */
var MapboxVectorLayer = /** @class */ (function (_super) {
    __extends(MapboxVectorLayer, _super);
    /**
     * @param {Options} options Layer options.  At a minimum, `styleUrl` and `accessToken`
     * must be provided.
     */
    function MapboxVectorLayer(options) {
        var _this = this;
        var declutter = 'declutter' in options ? options.declutter : true;
        var source = new VectorTileSource({
            state: SourceState.LOADING,
            format: new MVT(),
        });
        _this = _super.call(this, {
            source: source,
            declutter: declutter,
            className: options.className,
            opacity: options.opacity,
            visible: options.visible,
            zIndex: options.zIndex,
            minResolution: options.minResolution,
            maxResolution: options.maxResolution,
            minZoom: options.minZoom,
            maxZoom: options.maxZoom,
            renderOrder: options.renderOrder,
            renderBuffer: options.renderBuffer,
            renderMode: options.renderMode,
            map: options.map,
            updateWhileAnimating: options.updateWhileAnimating,
            updateWhileInteracting: options.updateWhileInteracting,
            preload: options.preload,
            useInterimTilesOnError: options.useInterimTilesOnError,
        }) || this;
        _this.sourceId = options.source;
        _this.layers = options.layers;
        _this.accessToken = options.accessToken;
        _this.fetchStyle(options.styleUrl);
        return _this;
    }
    /**
     * Fetch the style object.
     * @param {string} styleUrl The URL of the style to load.
     * @protected
     */
    MapboxVectorLayer.prototype.fetchStyle = function (styleUrl) {
        var _this = this;
        var url = normalizeStyleUrl(styleUrl, this.accessToken);
        fetch(url)
            .then(function (response) {
            if (!response.ok) {
                throw new Error("unexpected response when fetching style: " + response.status);
            }
            return response.json();
        })
            .then(function (style) {
            _this.onStyleLoad(style);
        })
            .catch(function (error) {
            _this.handleError(error);
        });
    };
    /**
     * Handle the loaded style object.
     * @param {StyleObject} style The loaded style.
     * @protected
     */
    MapboxVectorLayer.prototype.onStyleLoad = function (style) {
        var _this = this;
        var sourceId;
        var sourceIdOrLayersList;
        if (this.layers) {
            // confirm all layers share the same source
            var lookup = {};
            for (var i = 0; i < style.layers.length; ++i) {
                var layer = style.layers[i];
                if (layer.source) {
                    lookup[layer.id] = layer.source;
                }
            }
            var firstSource = void 0;
            for (var i = 0; i < this.layers.length; ++i) {
                var candidate = lookup[this.layers[i]];
                if (!candidate) {
                    this.handleError(new Error("could not find source for " + this.layers[i]));
                    return;
                }
                if (!firstSource) {
                    firstSource = candidate;
                }
                else if (firstSource !== candidate) {
                    this.handleError(new Error("layers can only use a single source, found " + firstSource + " and " + candidate));
                    return;
                }
            }
            sourceId = firstSource;
            sourceIdOrLayersList = this.layers;
        }
        else {
            sourceId = this.sourceId;
            sourceIdOrLayersList = sourceId;
        }
        if (!sourceIdOrLayersList) {
            // default to the first source in the style
            sourceId = Object.keys(style.sources)[0];
            sourceIdOrLayersList = sourceId;
        }
        if (style.sprite) {
            style.sprite = normalizeSpriteUrl(style.sprite, this.accessToken);
        }
        if (style.glyphs) {
            style.glyphs = normalizeGlyphsUrl(style.glyphs, this.accessToken);
        }
        var styleSource = style.sources[sourceId];
        if (styleSource.type !== SourceType.VECTOR) {
            this.handleError(new Error("only works for vector sources, found " + styleSource.type));
            return;
        }
        var source = this.getSource();
        source.setUrl(normalizeSourceUrl(styleSource.url, this.accessToken));
        applyStyle(this, style, sourceIdOrLayersList)
            .then(function () {
            source.setState(SourceState.READY);
        })
            .catch(function (error) {
            _this.handleError(error);
        });
    };
    /**
     * Handle configuration or loading error.
     * @param {Error} error The error.
     * @protected
     */
    MapboxVectorLayer.prototype.handleError = function (error) {
        this.dispatchEvent(new ErrorEvent(error));
        var source = this.getSource();
        source.setState(SourceState.ERROR);
    };
    return MapboxVectorLayer;
}(VectorTileLayer));
export default MapboxVectorLayer;
//# sourceMappingURL=MapboxVector.js.map