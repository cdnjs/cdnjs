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
 * @module ol/reproj/Tile
 */
import { ERROR_THRESHOLD } from './common.js';
import EventType from '../events/EventType.js';
import Tile from '../Tile.js';
import TileState from '../TileState.js';
import Triangulation from './Triangulation.js';
import { calculateSourceExtentResolution, canvasPool, render as renderReprojected, } from '../reproj.js';
import { clamp } from '../math.js';
import { getArea, getIntersection } from '../extent.js';
import { listen, unlistenByKey } from '../events.js';
import { releaseCanvas } from '../dom.js';
/**
 * @typedef {function(number, number, number, number) : import("../Tile.js").default} FunctionType
 */
/**
 * @classdesc
 * Class encapsulating single reprojected tile.
 * See {@link module:ol/source/TileImage~TileImage}.
 *
 */
var ReprojTile = /** @class */ (function (_super) {
    __extends(ReprojTile, _super);
    /**
     * @param {import("../proj/Projection.js").default} sourceProj Source projection.
     * @param {import("../tilegrid/TileGrid.js").default} sourceTileGrid Source tile grid.
     * @param {import("../proj/Projection.js").default} targetProj Target projection.
     * @param {import("../tilegrid/TileGrid.js").default} targetTileGrid Target tile grid.
     * @param {import("../tilecoord.js").TileCoord} tileCoord Coordinate of the tile.
     * @param {import("../tilecoord.js").TileCoord} wrappedTileCoord Coordinate of the tile wrapped in X.
     * @param {number} pixelRatio Pixel ratio.
     * @param {number} gutter Gutter of the source tiles.
     * @param {FunctionType} getTileFunction
     *     Function returning source tiles (z, x, y, pixelRatio).
     * @param {number} [opt_errorThreshold] Acceptable reprojection error (in px).
     * @param {boolean} [opt_renderEdges] Render reprojection edges.
     * @param {boolean} [opt_interpolate] Use linear interpolation when resampling.
     */
    function ReprojTile(sourceProj, sourceTileGrid, targetProj, targetTileGrid, tileCoord, wrappedTileCoord, pixelRatio, gutter, getTileFunction, opt_errorThreshold, opt_renderEdges, opt_interpolate) {
        var _this = _super.call(this, tileCoord, TileState.IDLE, { interpolate: !!opt_interpolate }) || this;
        /**
         * @private
         * @type {boolean}
         */
        _this.renderEdges_ = opt_renderEdges !== undefined ? opt_renderEdges : false;
        /**
         * @private
         * @type {number}
         */
        _this.pixelRatio_ = pixelRatio;
        /**
         * @private
         * @type {number}
         */
        _this.gutter_ = gutter;
        /**
         * @private
         * @type {HTMLCanvasElement}
         */
        _this.canvas_ = null;
        /**
         * @private
         * @type {import("../tilegrid/TileGrid.js").default}
         */
        _this.sourceTileGrid_ = sourceTileGrid;
        /**
         * @private
         * @type {import("../tilegrid/TileGrid.js").default}
         */
        _this.targetTileGrid_ = targetTileGrid;
        /**
         * @private
         * @type {import("../tilecoord.js").TileCoord}
         */
        _this.wrappedTileCoord_ = wrappedTileCoord ? wrappedTileCoord : tileCoord;
        /**
         * @private
         * @type {!Array<import("../Tile.js").default>}
         */
        _this.sourceTiles_ = [];
        /**
         * @private
         * @type {?Array<import("../events.js").EventsKey>}
         */
        _this.sourcesListenerKeys_ = null;
        /**
         * @private
         * @type {number}
         */
        _this.sourceZ_ = 0;
        var targetExtent = targetTileGrid.getTileCoordExtent(_this.wrappedTileCoord_);
        var maxTargetExtent = _this.targetTileGrid_.getExtent();
        var maxSourceExtent = _this.sourceTileGrid_.getExtent();
        var limitedTargetExtent = maxTargetExtent
            ? getIntersection(targetExtent, maxTargetExtent)
            : targetExtent;
        if (getArea(limitedTargetExtent) === 0) {
            // Tile is completely outside range -> EMPTY
            // TODO: is it actually correct that the source even creates the tile ?
            _this.state = TileState.EMPTY;
            return _this;
        }
        var sourceProjExtent = sourceProj.getExtent();
        if (sourceProjExtent) {
            if (!maxSourceExtent) {
                maxSourceExtent = sourceProjExtent;
            }
            else {
                maxSourceExtent = getIntersection(maxSourceExtent, sourceProjExtent);
            }
        }
        var targetResolution = targetTileGrid.getResolution(_this.wrappedTileCoord_[0]);
        var sourceResolution = calculateSourceExtentResolution(sourceProj, targetProj, limitedTargetExtent, targetResolution);
        if (!isFinite(sourceResolution) || sourceResolution <= 0) {
            // invalid sourceResolution -> EMPTY
            // probably edges of the projections when no extent is defined
            _this.state = TileState.EMPTY;
            return _this;
        }
        var errorThresholdInPixels = opt_errorThreshold !== undefined ? opt_errorThreshold : ERROR_THRESHOLD;
        /**
         * @private
         * @type {!import("./Triangulation.js").default}
         */
        _this.triangulation_ = new Triangulation(sourceProj, targetProj, limitedTargetExtent, maxSourceExtent, sourceResolution * errorThresholdInPixels, targetResolution);
        if (_this.triangulation_.getTriangles().length === 0) {
            // no valid triangles -> EMPTY
            _this.state = TileState.EMPTY;
            return _this;
        }
        _this.sourceZ_ = sourceTileGrid.getZForResolution(sourceResolution);
        var sourceExtent = _this.triangulation_.calculateSourceExtent();
        if (maxSourceExtent) {
            if (sourceProj.canWrapX()) {
                sourceExtent[1] = clamp(sourceExtent[1], maxSourceExtent[1], maxSourceExtent[3]);
                sourceExtent[3] = clamp(sourceExtent[3], maxSourceExtent[1], maxSourceExtent[3]);
            }
            else {
                sourceExtent = getIntersection(sourceExtent, maxSourceExtent);
            }
        }
        if (!getArea(sourceExtent)) {
            _this.state = TileState.EMPTY;
        }
        else {
            var sourceRange = sourceTileGrid.getTileRangeForExtentAndZ(sourceExtent, _this.sourceZ_);
            for (var srcX = sourceRange.minX; srcX <= sourceRange.maxX; srcX++) {
                for (var srcY = sourceRange.minY; srcY <= sourceRange.maxY; srcY++) {
                    var tile = getTileFunction(_this.sourceZ_, srcX, srcY, pixelRatio);
                    if (tile) {
                        _this.sourceTiles_.push(tile);
                    }
                }
            }
            if (_this.sourceTiles_.length === 0) {
                _this.state = TileState.EMPTY;
            }
        }
        return _this;
    }
    /**
     * Get the HTML Canvas element for this tile.
     * @return {HTMLCanvasElement} Canvas.
     */
    ReprojTile.prototype.getImage = function () {
        return this.canvas_;
    };
    /**
     * @private
     */
    ReprojTile.prototype.reproject_ = function () {
        var sources = [];
        this.sourceTiles_.forEach(function (tile, i, arr) {
            if (tile && tile.getState() == TileState.LOADED) {
                sources.push({
                    extent: this.sourceTileGrid_.getTileCoordExtent(tile.tileCoord),
                    image: tile.getImage(),
                });
            }
        }.bind(this));
        this.sourceTiles_.length = 0;
        if (sources.length === 0) {
            this.state = TileState.ERROR;
        }
        else {
            var z = this.wrappedTileCoord_[0];
            var size = this.targetTileGrid_.getTileSize(z);
            var width = typeof size === 'number' ? size : size[0];
            var height = typeof size === 'number' ? size : size[1];
            var targetResolution = this.targetTileGrid_.getResolution(z);
            var sourceResolution = this.sourceTileGrid_.getResolution(this.sourceZ_);
            var targetExtent = this.targetTileGrid_.getTileCoordExtent(this.wrappedTileCoord_);
            this.canvas_ = renderReprojected(width, height, this.pixelRatio_, sourceResolution, this.sourceTileGrid_.getExtent(), targetResolution, targetExtent, this.triangulation_, sources, this.gutter_, this.renderEdges_, this.interpolate);
            this.state = TileState.LOADED;
        }
        this.changed();
    };
    /**
     * Load not yet loaded URI.
     */
    ReprojTile.prototype.load = function () {
        if (this.state == TileState.IDLE) {
            this.state = TileState.LOADING;
            this.changed();
            var leftToLoad_1 = 0;
            this.sourcesListenerKeys_ = [];
            this.sourceTiles_.forEach(function (tile, i, arr) {
                var state = tile.getState();
                if (state == TileState.IDLE || state == TileState.LOADING) {
                    leftToLoad_1++;
                    var sourceListenKey_1 = listen(tile, EventType.CHANGE, function (e) {
                        var state = tile.getState();
                        if (state == TileState.LOADED ||
                            state == TileState.ERROR ||
                            state == TileState.EMPTY) {
                            unlistenByKey(sourceListenKey_1);
                            leftToLoad_1--;
                            if (leftToLoad_1 === 0) {
                                this.unlistenSources_();
                                this.reproject_();
                            }
                        }
                    }, this);
                    this.sourcesListenerKeys_.push(sourceListenKey_1);
                }
            }.bind(this));
            if (leftToLoad_1 === 0) {
                setTimeout(this.reproject_.bind(this), 0);
            }
            else {
                this.sourceTiles_.forEach(function (tile, i, arr) {
                    var state = tile.getState();
                    if (state == TileState.IDLE) {
                        tile.load();
                    }
                });
            }
        }
    };
    /**
     * @private
     */
    ReprojTile.prototype.unlistenSources_ = function () {
        this.sourcesListenerKeys_.forEach(unlistenByKey);
        this.sourcesListenerKeys_ = null;
    };
    /**
     * Remove from the cache due to expiry
     */
    ReprojTile.prototype.release = function () {
        if (this.canvas_) {
            releaseCanvas(this.canvas_.getContext('2d'));
            canvasPool.push(this.canvas_);
            this.canvas_ = null;
        }
        _super.prototype.release.call(this);
    };
    return ReprojTile;
}(Tile));
export default ReprojTile;
//# sourceMappingURL=Tile.js.map