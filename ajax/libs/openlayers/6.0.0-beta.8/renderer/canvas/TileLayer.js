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
 * @module ol/renderer/canvas/TileLayer
 */
import { getUid } from '../../util.js';
import TileRange from '../../TileRange.js';
import TileState from '../../TileState.js';
import { createEmpty, equals, getIntersection, getTopLeft } from '../../extent.js';
import CanvasLayerRenderer from './Layer.js';
import { apply as applyTransform, compose as composeTransform, makeInverse, toString as transformToString } from '../../transform.js';
/**
 * @classdesc
 * Canvas renderer for tile layers.
 * @api
 */
var CanvasTileLayerRenderer = /** @class */ (function (_super) {
    __extends(CanvasTileLayerRenderer, _super);
    /**
     * @param {import("../../layer/Tile.js").default|import("../../layer/VectorTile.js").default} tileLayer Tile layer.
     */
    function CanvasTileLayerRenderer(tileLayer) {
        var _this = _super.call(this, tileLayer) || this;
        /**
         * Rendered extent has changed since the previous `renderFrame()` call
         * @type {boolean}
         */
        _this.extentChanged = true;
        /**
         * @private
         * @type {import("../../extent.js").Extent}
         */
        _this.renderedExtent_ = null;
        /**
         * @protected
         * @type {number}
         */
        _this.renderedRevision;
        /**
         * @protected
         * @type {!Array<import("../../Tile.js").default>}
         */
        _this.renderedTiles = [];
        /**
         * @private
         * @type {boolean}
         */
        _this.newTiles_ = false;
        /**
         * @protected
         * @type {import("../../extent.js").Extent}
         */
        _this.tmpExtent = createEmpty();
        /**
         * @private
         * @type {import("../../TileRange.js").default}
         */
        _this.tmpTileRange_ = new TileRange(0, 0, 0, 0);
        /**
         * @protected
         * @type {number}
         */
        _this.zDirection = 0;
        return _this;
    }
    /**
     * @protected
     * @param {import("../../Tile.js").default} tile Tile.
     * @return {boolean} Tile is drawable.
     */
    CanvasTileLayerRenderer.prototype.isDrawableTile = function (tile) {
        var tileLayer = /** @type {import("../../layer/Tile.js").default} */ (this.getLayer());
        var tileState = tile.getState();
        var useInterimTilesOnError = tileLayer.getUseInterimTilesOnError();
        return tileState == TileState.LOADED ||
            tileState == TileState.EMPTY ||
            tileState == TileState.ERROR && !useInterimTilesOnError;
    };
    /**
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @return {!import("../../Tile.js").default} Tile.
     */
    CanvasTileLayerRenderer.prototype.getTile = function (z, x, y, frameState) {
        var pixelRatio = frameState.pixelRatio;
        var projection = frameState.viewState.projection;
        var tileLayer = /** @type {import("../../layer/Tile.js").default} */ (this.getLayer());
        var tileSource = tileLayer.getSource();
        var tile = tileSource.getTile(z, x, y, pixelRatio, projection);
        if (tile.getState() == TileState.ERROR) {
            if (!tileLayer.getUseInterimTilesOnError()) {
                // When useInterimTilesOnError is false, we consider the error tile as loaded.
                tile.setState(TileState.LOADED);
            }
            else if (tileLayer.getPreload() > 0) {
                // Preloaded tiles for lower resolutions might have finished loading.
                this.newTiles_ = true;
            }
        }
        if (!this.isDrawableTile(tile)) {
            tile = tile.getInterimTile();
        }
        return tile;
    };
    /**
     * @inheritDoc
     */
    CanvasTileLayerRenderer.prototype.loadedTileCallback = function (tiles, zoom, tile) {
        if (this.isDrawableTile(tile)) {
            return _super.prototype.loadedTileCallback.call(this, tiles, zoom, tile);
        }
        return false;
    };
    /**
     * @inheritDoc
     */
    CanvasTileLayerRenderer.prototype.prepareFrame = function (frameState, layerState) {
        return true;
    };
    /**
     * TODO: File a TypeScript issue about inheritDoc not being followed
     * all the way.  Without this explicit return type, the VectorTileLayer
     * renderFrame function does not pass.
     *
     * @inheritDoc
     * @returns {HTMLElement} The rendered element.
     */
    CanvasTileLayerRenderer.prototype.renderFrame = function (frameState, layerState) {
        var context = this.context;
        var viewState = frameState.viewState;
        var projection = viewState.projection;
        var viewResolution = viewState.resolution;
        var viewCenter = viewState.center;
        var rotation = viewState.rotation;
        var pixelRatio = frameState.pixelRatio;
        var tileLayer = /** @type {import("../../layer/Tile.js").default} */ (this.getLayer());
        var tileSource = tileLayer.getSource();
        var sourceRevision = tileSource.getRevision();
        var tileGrid = tileSource.getTileGridForProjection(projection);
        var zDirection = tileSource.zDirection === undefined ? this.zDirection : tileSource.zDirection;
        var z = tileGrid.getZForResolution(viewResolution, zDirection);
        var tileResolution = tileGrid.getResolution(z);
        var extent = frameState.extent;
        if (layerState.extent) {
            extent = getIntersection(extent, layerState.extent);
        }
        var tilePixelRatio = tileSource.getTilePixelRatio(pixelRatio);
        // desired dimensions of the canvas in pixels
        var width = Math.round(frameState.size[0] * tilePixelRatio);
        var height = Math.round(frameState.size[1] * tilePixelRatio);
        if (rotation) {
            var size = Math.round(Math.sqrt(width * width + height * height));
            width = height = size;
        }
        var dx = tileResolution * width / 2 / tilePixelRatio;
        var dy = tileResolution * height / 2 / tilePixelRatio;
        var canvasExtent = [
            viewCenter[0] - dx,
            viewCenter[1] - dy,
            viewCenter[0] + dx,
            viewCenter[1] + dy
        ];
        var tileRange = tileGrid.getTileRangeForExtentAndZ(extent, z);
        /**
         * @type {Object<number, Object<string, import("../../Tile.js").default>>}
         */
        var tilesToDrawByZ = {};
        tilesToDrawByZ[z] = {};
        var findLoadedTiles = this.createLoadedTileFinder(tileSource, projection, tilesToDrawByZ);
        var tmpExtent = this.tmpExtent;
        var tmpTileRange = this.tmpTileRange_;
        this.newTiles_ = false;
        for (var x = tileRange.minX; x <= tileRange.maxX; ++x) {
            for (var y = tileRange.minY; y <= tileRange.maxY; ++y) {
                var tile = this.getTile(z, x, y, frameState);
                if (this.isDrawableTile(tile)) {
                    var uid = getUid(this);
                    if (tile.getState() == TileState.LOADED) {
                        tilesToDrawByZ[z][tile.tileCoord.toString()] = tile;
                        var inTransition = tile.inTransition(uid);
                        if (!this.newTiles_ && (inTransition || this.renderedTiles.indexOf(tile) === -1)) {
                            this.newTiles_ = true;
                        }
                    }
                    if (tile.getAlpha(uid, frameState.time) === 1) {
                        // don't look for alt tiles if alpha is 1
                        continue;
                    }
                }
                var childTileRange = tileGrid.getTileCoordChildTileRange(tile.tileCoord, tmpTileRange, tmpExtent);
                var covered = false;
                if (childTileRange) {
                    covered = findLoadedTiles(z + 1, childTileRange);
                }
                if (!covered) {
                    tileGrid.forEachTileCoordParentTileRange(tile.tileCoord, findLoadedTiles, tmpTileRange, tmpExtent);
                }
            }
        }
        var canvas = context.canvas;
        var canvasScale = tileResolution / viewResolution;
        // set forward and inverse pixel transforms
        composeTransform(this.pixelTransform_, frameState.size[0] / 2, frameState.size[1] / 2, 1 / tilePixelRatio, 1 / tilePixelRatio, rotation, -width / 2, -height / 2);
        makeInverse(this.inversePixelTransform_, this.pixelTransform_);
        // set scale transform for calculating tile positions on the canvas
        composeTransform(this.tempTransform_, width / 2, height / 2, canvasScale, canvasScale, 0, -width / 2, -height / 2);
        if (canvas.width != width || canvas.height != height) {
            canvas.width = width;
            canvas.height = height;
        }
        else {
            context.clearRect(0, 0, width, height);
        }
        if (layerState.extent) {
            this.clipUnrotated(context, frameState, layerState.extent);
        }
        this.preRender(context, frameState);
        this.renderedTiles.length = 0;
        /** @type {Array<number>} */
        var zs = Object.keys(tilesToDrawByZ).map(Number);
        zs.sort(function (a, b) {
            if (a === z) {
                return 1;
            }
            else if (b === z) {
                return -1;
            }
            else {
                return a > b ? 1 : a < b ? -1 : 0;
            }
        });
        for (var i = 0, ii = zs.length; i < ii; ++i) {
            var currentZ = zs[i];
            var currentTilePixelSize = tileSource.getTilePixelSize(currentZ, pixelRatio, projection);
            var currentResolution = tileGrid.getResolution(currentZ);
            var currentScale = currentResolution / tileResolution;
            var dx_1 = currentTilePixelSize[0] * currentScale * canvasScale;
            var dy_1 = currentTilePixelSize[1] * currentScale * canvasScale;
            var originTileCoord = tileGrid.getTileCoordForCoordAndZ(getTopLeft(canvasExtent), currentZ);
            var originTileExtent = tileGrid.getTileCoordExtent(originTileCoord);
            var origin_1 = applyTransform(this.tempTransform_, [
                tilePixelRatio * (originTileExtent[0] - canvasExtent[0]) / tileResolution,
                tilePixelRatio * (canvasExtent[3] - originTileExtent[3]) / tileResolution
            ]);
            var tileGutter = tilePixelRatio * tileSource.getGutterForProjection(projection);
            var tilesToDraw = tilesToDrawByZ[currentZ];
            for (var tileCoordKey in tilesToDraw) {
                var tile = tilesToDraw[tileCoordKey];
                var tileCoord = tile.tileCoord;
                // Calculate integer positions and sizes so that tiles align
                var floatX = (origin_1[0] - (originTileCoord[1] - tileCoord[1]) * dx_1);
                var nextX = Math.round(floatX + dx_1);
                var floatY = (origin_1[1] - (originTileCoord[2] - tileCoord[2]) * dy_1);
                var nextY = Math.round(floatY + dy_1);
                var x = Math.round(floatX);
                var y = Math.round(floatY);
                var w = nextX - x;
                var h = nextY - y;
                this.drawTileImage(tile, frameState, x, y, w, h, tileGutter, z === currentZ);
                this.renderedTiles.push(tile);
                this.updateUsedTiles(frameState.usedTiles, tileSource, tile);
            }
        }
        this.renderedRevision = sourceRevision;
        this.renderedResolution = tileResolution;
        this.extentChanged = !this.renderedExtent_ || !equals(this.renderedExtent_, canvasExtent);
        this.renderedExtent_ = canvasExtent;
        this.manageTilePyramid(frameState, tileSource, tileGrid, pixelRatio, projection, extent, z, tileLayer.getPreload());
        this.updateCacheSize_(frameState, tileSource);
        this.scheduleExpireCache(frameState, tileSource);
        this.postRender(context, frameState);
        if (layerState.extent) {
            context.restore();
        }
        var opacity = layerState.opacity;
        if (opacity !== parseFloat(canvas.style.opacity)) {
            canvas.style.opacity = opacity;
        }
        var canvasTransform = transformToString(this.pixelTransform_);
        if (canvasTransform !== canvas.style.transform) {
            canvas.style.transform = canvasTransform;
        }
        return canvas;
    };
    /**
     * @param {import("../../Tile.js").default} tile Tile.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @param {number} x Left of the tile.
     * @param {number} y Top of the tile.
     * @param {number} w Width of the tile.
     * @param {number} h Height of the tile.
     * @param {number} gutter Tile gutter.
     * @param {boolean} transition Apply an alpha transition.
     */
    CanvasTileLayerRenderer.prototype.drawTileImage = function (tile, frameState, x, y, w, h, gutter, transition) {
        var image = this.getTileImage(tile);
        if (!image) {
            return;
        }
        var uid = getUid(this);
        var alpha = transition ? tile.getAlpha(uid, frameState.time) : 1;
        var tileLayer = /** @type {import("../../layer/Tile.js").default} */ (this.getLayer());
        var tileSource = tileLayer.getSource();
        if (alpha === 1 && !tileSource.getOpaque(frameState.viewState.projection)) {
            this.context.clearRect(x, y, w, h);
        }
        var alphaChanged = alpha !== this.context.globalAlpha;
        if (alphaChanged) {
            this.context.save();
            this.context.globalAlpha = alpha;
        }
        this.context.drawImage(image, gutter, gutter, image.width - 2 * gutter, image.height - 2 * gutter, x, y, w, h);
        if (alphaChanged) {
            this.context.restore();
        }
        if (alpha !== 1) {
            frameState.animate = true;
        }
        else if (transition) {
            tile.endTransition(uid);
        }
    };
    /**
     * @inheritDoc
     */
    CanvasTileLayerRenderer.prototype.getImage = function () {
        var context = this.context;
        return context ? context.canvas : null;
    };
    /**
     * Get the image from a tile.
     * @param {import("../../Tile.js").default} tile Tile.
     * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
     * @protected
     */
    CanvasTileLayerRenderer.prototype.getTileImage = function (tile) {
        return /** @type {import("../../ImageTile.js").default} */ (tile).getImage();
    };
    /**
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @param {import("../../source/Tile.js").default} tileSource Tile source.
     * @protected
     */
    CanvasTileLayerRenderer.prototype.scheduleExpireCache = function (frameState, tileSource) {
        if (tileSource.canExpireCache()) {
            /**
             * @param {import("../../source/Tile.js").default} tileSource Tile source.
             * @param {import("../../PluggableMap.js").default} map Map.
             * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
             */
            var postRenderFunction = function (tileSource, map, frameState) {
                var tileSourceKey = getUid(tileSource);
                if (tileSourceKey in frameState.usedTiles) {
                    tileSource.expireCache(frameState.viewState.projection, frameState.usedTiles[tileSourceKey]);
                }
            }.bind(null, tileSource);
            frameState.postRenderFunctions.push(
            /** @type {import("../../PluggableMap.js").PostRenderFunction} */ (postRenderFunction));
        }
    };
    /**
     * @param {!Object<string, !Object<string, boolean>>} usedTiles Used tiles.
     * @param {import("../../source/Tile.js").default} tileSource Tile source.
     * @param {import('../../Tile.js').default} tile Tile.
     * @protected
     */
    CanvasTileLayerRenderer.prototype.updateUsedTiles = function (usedTiles, tileSource, tile) {
        // FIXME should we use tilesToDrawByZ instead?
        var tileSourceKey = getUid(tileSource);
        if (!(tileSourceKey in usedTiles)) {
            usedTiles[tileSourceKey] = {};
        }
        usedTiles[tileSourceKey][tile.getKey()] = true;
    };
    /**
     * Check if the cache is big enough, and increase its size if necessary.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @param {import("../../source/Tile.js").default} tileSource Tile source.
     * @private
     */
    CanvasTileLayerRenderer.prototype.updateCacheSize_ = function (frameState, tileSource) {
        var tileSourceKey = getUid(tileSource);
        var size = 0;
        if (tileSourceKey in frameState.usedTiles) {
            size += Object.keys(frameState.usedTiles[tileSourceKey]).length;
        }
        if (tileSourceKey in frameState.wantedTiles) {
            size += Object.keys(frameState.wantedTiles[tileSourceKey]).length;
        }
        var tileCache = tileSource.tileCache;
        if (tileCache.highWaterMark < size) {
            tileCache.highWaterMark = size;
        }
    };
    /**
     * Manage tile pyramid.
     * This function performs a number of functions related to the tiles at the
     * current zoom and lower zoom levels:
     * - registers idle tiles in frameState.wantedTiles so that they are not
     *   discarded by the tile queue
     * - enqueues missing tiles
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @param {import("../../source/Tile.js").default} tileSource Tile source.
     * @param {import("../../tilegrid/TileGrid.js").default} tileGrid Tile grid.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../../proj/Projection.js").default} projection Projection.
     * @param {import("../../extent.js").Extent} extent Extent.
     * @param {number} currentZ Current Z.
     * @param {number} preload Load low resolution tiles up to 'preload' levels.
     * @param {function(import("../../Tile.js").default)=} opt_tileCallback Tile callback.
     * @protected
     */
    CanvasTileLayerRenderer.prototype.manageTilePyramid = function (frameState, tileSource, tileGrid, pixelRatio, projection, extent, currentZ, preload, opt_tileCallback) {
        var tileSourceKey = getUid(tileSource);
        if (!(tileSourceKey in frameState.wantedTiles)) {
            frameState.wantedTiles[tileSourceKey] = {};
        }
        var wantedTiles = frameState.wantedTiles[tileSourceKey];
        var tileQueue = frameState.tileQueue;
        var minZoom = tileGrid.getMinZoom();
        var tile, tileRange, tileResolution, x, y, z;
        for (z = minZoom; z <= currentZ; ++z) {
            tileRange = tileGrid.getTileRangeForExtentAndZ(extent, z, tileRange);
            tileResolution = tileGrid.getResolution(z);
            for (x = tileRange.minX; x <= tileRange.maxX; ++x) {
                for (y = tileRange.minY; y <= tileRange.maxY; ++y) {
                    if (currentZ - z <= preload) {
                        tile = tileSource.getTile(z, x, y, pixelRatio, projection);
                        if (tile.getState() == TileState.IDLE) {
                            wantedTiles[tile.getKey()] = true;
                            if (!tileQueue.isKeyQueued(tile.getKey())) {
                                tileQueue.enqueue([tile, tileSourceKey,
                                    tileGrid.getTileCoordCenter(tile.tileCoord), tileResolution]);
                            }
                        }
                        if (opt_tileCallback !== undefined) {
                            opt_tileCallback(tile);
                        }
                    }
                    else {
                        tileSource.useTile(z, x, y, projection);
                    }
                }
            }
        }
    };
    return CanvasTileLayerRenderer;
}(CanvasLayerRenderer));
/**
 * @function
 * @return {import("../../layer/Tile.js").default|import("../../layer/VectorTile.js").default}
 */
CanvasTileLayerRenderer.prototype.getLayer;
export default CanvasTileLayerRenderer;
//# sourceMappingURL=TileLayer.js.map