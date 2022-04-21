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
 * @module ol/source/Zoomify
 */
import { DEFAULT_TILE_SIZE } from '../tilegrid/common.js';
import ImageTile from '../ImageTile.js';
import TileState from '../TileState.js';
import { expandUrl, createFromTileUrlFunctions } from '../tileurlfunction.js';
import { assert } from '../asserts.js';
import { createCanvasContext2D } from '../dom.js';
import { getTopLeft } from '../extent.js';
import { toSize } from '../size.js';
import TileImage from './TileImage.js';
import TileGrid from '../tilegrid/TileGrid.js';
/**
 * @enum {string}
 */
var TierSizeCalculation = {
    DEFAULT: 'default',
    TRUNCATED: 'truncated'
};
var CustomTile = /** @class */ (function (_super) {
    __extends(CustomTile, _super);
    /**
     * @param {import("../tilegrid/TileGrid.js").default} tileGrid TileGrid that the tile belongs to.
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {TileState} state State.
     * @param {string} src Image source URI.
     * @param {?string} crossOrigin Cross origin.
     * @param {import("../Tile.js").LoadFunction} tileLoadFunction Tile load function.
     * @param {import("../Tile.js").Options=} opt_options Tile options.
     */
    function CustomTile(tileGrid, tileCoord, state, src, crossOrigin, tileLoadFunction, opt_options) {
        var _this = _super.call(this, tileCoord, state, src, crossOrigin, tileLoadFunction, opt_options) || this;
        /**
         * @private
         * @type {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement}
         */
        _this.zoomifyImage_ = null;
        /**
         * @private
         * @type {import("../size.js").Size}
         */
        _this.tileSize_ = toSize(tileGrid.getTileSize(tileCoord[0]));
        return _this;
    }
    /**
     * @inheritDoc
     */
    CustomTile.prototype.getImage = function () {
        if (this.zoomifyImage_) {
            return this.zoomifyImage_;
        }
        var image = _super.prototype.getImage.call(this);
        if (this.state == TileState.LOADED) {
            var tileSize = this.tileSize_;
            if (image.width == tileSize[0] && image.height == tileSize[1]) {
                this.zoomifyImage_ = image;
                return image;
            }
            else {
                var context = createCanvasContext2D(tileSize[0], tileSize[1]);
                context.drawImage(image, 0, 0);
                this.zoomifyImage_ = context.canvas;
                return context.canvas;
            }
        }
        else {
            return image;
        }
    };
    return CustomTile;
}(ImageTile));
export { CustomTile };
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {number} [cacheSize] Tile cache size. The default depends on the screen size. Will increase if too small.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value  you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection.
 * @property {number} [tilePixelRatio] The pixel ratio used by the tile service. For example, if the tile service advertizes 256px by 256px tiles but actually sends 512px by 512px images (for retina/hidpi devices) then `tilePixelRatio` should be set to `2`
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {string} [url] URL template or base URL of the Zoomify service.
 * A base URL is the fixed part
 * of the URL, excluding the tile group, z, x, and y folder structure, e.g.
 * `http://my.zoomify.info/IMAGE.TIF/`. A URL template must include
 * `{TileGroup}`, `{x}`, `{y}`, and `{z}` placeholders, e.g.
 * `http://my.zoomify.info/IMAGE.TIF/{TileGroup}/{z}-{x}-{y}.jpg`.
 * Internet Imaging Protocol (IIP) with JTL extension can be also used with
 * `{tileIndex}` and `{z}` placeholders, e.g.
 * `http://my.zoomify.info?FIF=IMAGE.TIF&JTL={z},{tileIndex}`.
 * A `{?-?}` template pattern, for example `subdomain{a-f}.domain.com`, may be
 * used instead of defining each one separately in the `urls` option.
 * @property {string} [tierSizeCalculation] Tier size calculation method: `default` or `truncated`.
 * @property {import("../size.js").Size} [size] Size of the image.
 * @property {import("../extent.js").Extent} [extent] Extent for the TileGrid that is created.
 * Default sets the TileGrid in the
 * fourth quadrant, meaning extent is `[0, -height, width, 0]`. To change the
 * extent to the first quadrant (the default for OpenLayers 2) set the extent
 * as `[0, 0, width, height]`.
 * @property {number} [transition] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {number} [tileSize=256] Tile size. Same tile size is used for all zoom levels.
 * @property {number} [zDirection] Indicate which resolution should be used
 * by a renderer if the views resolution does not match any resolution of the tile source.
 * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
 * will be used. If -1, the nearest higher resolution will be used.
 */
/**
 * @classdesc
 * Layer source for tile data in Zoomify format (both Zoomify and Internet
 * Imaging Protocol are supported).
 * @api
 */
var Zoomify = /** @class */ (function (_super) {
    __extends(Zoomify, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function Zoomify(opt_options) {
        var _this = this;
        var options = opt_options || {};
        var size = options.size;
        var tierSizeCalculation = options.tierSizeCalculation !== undefined ?
            options.tierSizeCalculation :
            TierSizeCalculation.DEFAULT;
        var imageWidth = size[0];
        var imageHeight = size[1];
        var extent = options.extent || [0, -size[1], size[0], 0];
        var tierSizeInTiles = [];
        var tileSize = options.tileSize || DEFAULT_TILE_SIZE;
        var tileSizeForTierSizeCalculation = tileSize;
        switch (tierSizeCalculation) {
            case TierSizeCalculation.DEFAULT:
                while (imageWidth > tileSizeForTierSizeCalculation || imageHeight > tileSizeForTierSizeCalculation) {
                    tierSizeInTiles.push([
                        Math.ceil(imageWidth / tileSizeForTierSizeCalculation),
                        Math.ceil(imageHeight / tileSizeForTierSizeCalculation)
                    ]);
                    tileSizeForTierSizeCalculation += tileSizeForTierSizeCalculation;
                }
                break;
            case TierSizeCalculation.TRUNCATED:
                var width = imageWidth;
                var height = imageHeight;
                while (width > tileSizeForTierSizeCalculation || height > tileSizeForTierSizeCalculation) {
                    tierSizeInTiles.push([
                        Math.ceil(width / tileSizeForTierSizeCalculation),
                        Math.ceil(height / tileSizeForTierSizeCalculation)
                    ]);
                    width >>= 1;
                    height >>= 1;
                }
                break;
            default:
                assert(false, 53); // Unknown `tierSizeCalculation` configured
                break;
        }
        tierSizeInTiles.push([1, 1]);
        tierSizeInTiles.reverse();
        var resolutions = [1];
        var tileCountUpToTier = [0];
        for (var i = 1, ii = tierSizeInTiles.length; i < ii; i++) {
            resolutions.push(1 << i);
            tileCountUpToTier.push(tierSizeInTiles[i - 1][0] * tierSizeInTiles[i - 1][1] +
                tileCountUpToTier[i - 1]);
        }
        resolutions.reverse();
        var tileGrid = new TileGrid({
            tileSize: tileSize,
            extent: extent,
            origin: getTopLeft(extent),
            resolutions: resolutions
        });
        var url = options.url;
        if (url && url.indexOf('{TileGroup}') == -1 && url.indexOf('{tileIndex}') == -1) {
            url += '{TileGroup}/{z}-{x}-{y}.jpg';
        }
        var urls = expandUrl(url);
        /**
         * @param {string} template Template.
         * @return {import("../Tile.js").UrlFunction} Tile URL function.
         */
        function createFromTemplate(template) {
            return (
            /**
             * @param {import("../tilecoord.js").TileCoord} tileCoord Tile Coordinate.
             * @param {number} pixelRatio Pixel ratio.
             * @param {import("../proj/Projection.js").default} projection Projection.
             * @return {string|undefined} Tile URL.
             */
            function (tileCoord, pixelRatio, projection) {
                if (!tileCoord) {
                    return undefined;
                }
                else {
                    var tileCoordZ = tileCoord[0];
                    var tileCoordX = tileCoord[1];
                    var tileCoordY = tileCoord[2];
                    var tileIndex = tileCoordX +
                        tileCoordY * tierSizeInTiles[tileCoordZ][0];
                    var tileSize_1 = tileGrid.getTileSize(tileCoordZ);
                    var tileWidth = Array.isArray(tileSize_1) ? tileSize_1[0] : tileSize_1;
                    var tileGroup = ((tileIndex + tileCountUpToTier[tileCoordZ]) / tileWidth) | 0;
                    var localContext_1 = {
                        'z': tileCoordZ,
                        'x': tileCoordX,
                        'y': tileCoordY,
                        'tileIndex': tileIndex,
                        'TileGroup': 'TileGroup' + tileGroup
                    };
                    return template.replace(/\{(\w+?)\}/g, function (m, p) {
                        return localContext_1[p];
                    });
                }
            });
        }
        var tileUrlFunction = createFromTileUrlFunctions(urls.map(createFromTemplate));
        var ZoomifyTileClass = CustomTile.bind(null, tileGrid);
        _this = _super.call(this, {
            attributions: options.attributions,
            cacheSize: options.cacheSize,
            crossOrigin: options.crossOrigin,
            projection: options.projection,
            tilePixelRatio: options.tilePixelRatio,
            reprojectionErrorThreshold: options.reprojectionErrorThreshold,
            tileClass: ZoomifyTileClass,
            tileGrid: tileGrid,
            tileUrlFunction: tileUrlFunction,
            transition: options.transition
        }) || this;
        /**
         * @inheritDoc
         */
        _this.zDirection = options.zDirection;
        return _this;
    }
    return Zoomify;
}(TileImage));
export default Zoomify;
//# sourceMappingURL=Zoomify.js.map