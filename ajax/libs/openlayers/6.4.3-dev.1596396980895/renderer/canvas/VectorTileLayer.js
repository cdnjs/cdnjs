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
 * @module ol/renderer/canvas/VectorTileLayer
 */
import CanvasBuilderGroup from '../../render/canvas/BuilderGroup.js';
import CanvasExecutorGroup, { replayDeclutter, } from '../../render/canvas/ExecutorGroup.js';
import CanvasTileLayerRenderer from './TileLayer.js';
import EventType from '../../events/EventType.js';
import ReplayType from '../../render/canvas/BuilderType.js';
import TileState from '../../TileState.js';
import VectorTileRenderType from '../../layer/VectorTileRenderType.js';
import ViewHint from '../../ViewHint.js';
import { apply as applyTransform, create as createTransform, multiply, reset as resetTransform, scale, scale as scaleTransform, translate as translateTransform, } from '../../transform.js';
import { buffer, containsCoordinate, containsExtent, equals, getIntersection, getTopLeft, intersects, } from '../../extent.js';
import { clear } from '../../obj.js';
import { createHitDetectionImageData, hitDetect, } from '../../render/canvas/hitdetect.js';
import { getSquaredTolerance as getSquaredRenderTolerance, renderFeature, } from '../vector.js';
import { getUid } from '../../util.js';
import { listen, unlistenByKey } from '../../events.js';
import { toSize } from '../../size.js';
import { wrapX } from '../../coordinate.js';
/**
 * @type {!Object<string, Array<import("../../render/canvas/BuilderType.js").default>>}
 */
var IMAGE_REPLAYS = {
    'image': [
        ReplayType.POLYGON,
        ReplayType.CIRCLE,
        ReplayType.LINE_STRING,
        ReplayType.IMAGE,
        ReplayType.TEXT,
    ],
    'hybrid': [ReplayType.POLYGON, ReplayType.LINE_STRING],
    'vector': [],
};
/**
 * @type {!Object<string, Array<import("../../render/canvas/BuilderType.js").default>>}
 */
var VECTOR_REPLAYS = {
    'image': [ReplayType.DEFAULT],
    'hybrid': [ReplayType.IMAGE, ReplayType.TEXT, ReplayType.DEFAULT],
    'vector': [
        ReplayType.POLYGON,
        ReplayType.CIRCLE,
        ReplayType.LINE_STRING,
        ReplayType.IMAGE,
        ReplayType.TEXT,
        ReplayType.DEFAULT,
    ],
};
/**
 * @classdesc
 * Canvas renderer for vector tile layers.
 * @api
 */
var CanvasVectorTileLayerRenderer = /** @class */ (function (_super) {
    __extends(CanvasVectorTileLayerRenderer, _super);
    /**
     * @param {import("../../layer/VectorTile.js").default} layer VectorTile layer.
     */
    function CanvasVectorTileLayerRenderer(layer) {
        var _this = _super.call(this, layer) || this;
        /** @private */
        _this.boundHandleStyleImageChange_ = _this.handleStyleImageChange_.bind(_this);
        /**
         * @private
         * @type {boolean}
         */
        _this.dirty_ = false;
        /**
         * @private
         * @type {number}
         */
        _this.renderedLayerRevision_;
        /**
         * @private
         * @type {import("../../transform").Transform}
         */
        _this.renderedPixelToCoordinateTransform_ = null;
        /**
         * @private
         * @type {number}
         */
        _this.renderedRotation_;
        /**
         * @private
         * @type {!Object<string, import("../../VectorRenderTile.js").default>}
         */
        _this.renderTileImageQueue_ = {};
        /**
         * @type {Object<string, import("../../events.js").EventsKey>}
         */
        _this.tileListenerKeys_ = {};
        /**
         * @private
         * @type {import("../../transform.js").Transform}
         */
        _this.tmpTransform_ = createTransform();
        return _this;
    }
    /**
     * @param {import("../../VectorRenderTile.js").default} tile Tile.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../../proj/Projection").default} projection Projection.
     * @param {boolean} queue Queue tile for rendering.
     * @return {boolean|undefined} Tile needs to be rendered.
     */
    CanvasVectorTileLayerRenderer.prototype.prepareTile = function (tile, pixelRatio, projection, queue) {
        var render;
        var tileUid = getUid(tile);
        var state = tile.getState();
        if (((state === TileState.LOADED && tile.hifi) ||
            state === TileState.ERROR) &&
            tileUid in this.tileListenerKeys_) {
            unlistenByKey(this.tileListenerKeys_[tileUid]);
            delete this.tileListenerKeys_[tileUid];
        }
        if (state === TileState.LOADED || state === TileState.ERROR) {
            this.updateExecutorGroup_(tile, pixelRatio, projection);
            if (this.tileImageNeedsRender_(tile, pixelRatio, projection)) {
                render = true;
                if (queue) {
                    this.renderTileImageQueue_[tileUid] = tile;
                }
            }
        }
        return render;
    };
    /**
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @return {!import("../../Tile.js").default} Tile.
     */
    CanvasVectorTileLayerRenderer.prototype.getTile = function (z, x, y, frameState) {
        var pixelRatio = frameState.pixelRatio;
        var viewState = frameState.viewState;
        var resolution = viewState.resolution;
        var projection = viewState.projection;
        var layer = this.getLayer();
        var tile = layer.getSource().getTile(z, x, y, pixelRatio, projection);
        if (tile.getState() < TileState.LOADED) {
            tile.wantedResolution = resolution;
            var tileUid = getUid(tile);
            if (!(tileUid in this.tileListenerKeys_)) {
                var listenerKey = listen(tile, EventType.CHANGE, this.prepareTile.bind(this, tile, pixelRatio, projection, true));
                this.tileListenerKeys_[tileUid] = listenerKey;
            }
        }
        else {
            var viewHints = frameState.viewHints;
            var hifi = !(viewHints[ViewHint.ANIMATING] || viewHints[ViewHint.INTERACTING]);
            if (hifi || !tile.wantedResolution) {
                tile.wantedResolution = resolution;
            }
            var render = this.prepareTile(tile, pixelRatio, projection, false);
            if (render && layer.getRenderMode() !== VectorTileRenderType.VECTOR) {
                this.renderTileImage_(tile, frameState);
            }
        }
        return _super.prototype.getTile.call(this, z, x, y, frameState);
    };
    /**
     * @param {import("../../VectorRenderTile.js").default} tile Tile.
     * @return {boolean} Tile is drawable.
     */
    CanvasVectorTileLayerRenderer.prototype.isDrawableTile = function (tile) {
        var layer = this.getLayer();
        return (_super.prototype.isDrawableTile.call(this, tile) &&
            (layer.getRenderMode() === VectorTileRenderType.VECTOR
                ? getUid(layer) in tile.executorGroups
                : tile.hasContext(layer)));
    };
    /**
     * @inheritDoc
     */
    CanvasVectorTileLayerRenderer.prototype.getTileImage = function (tile) {
        return tile.getImage(this.getLayer());
    };
    /**
     * Determine whether render should be called.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @return {boolean} Layer is ready to be rendered.
     */
    CanvasVectorTileLayerRenderer.prototype.prepareFrame = function (frameState) {
        var layerRevision = this.getLayer().getRevision();
        if (this.renderedLayerRevision_ != layerRevision) {
            this.renderedTiles.length = 0;
        }
        this.renderedLayerRevision_ = layerRevision;
        return _super.prototype.prepareFrame.call(this, frameState);
    };
    /**
     * @param {import("../../VectorRenderTile.js").default} tile Tile.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../../proj/Projection.js").default} projection Projection.
     * @private
     */
    CanvasVectorTileLayerRenderer.prototype.updateExecutorGroup_ = function (tile, pixelRatio, projection) {
        var layer = /** @type {import("../../layer/VectorTile.js").default} */ (this.getLayer());
        var revision = layer.getRevision();
        var renderOrder = layer.getRenderOrder() || null;
        var resolution = tile.wantedResolution;
        var builderState = tile.getReplayState(layer);
        if (!builderState.dirty &&
            builderState.renderedResolution === resolution &&
            builderState.renderedRevision == revision &&
            builderState.renderedRenderOrder == renderOrder &&
            builderState.renderedZ === tile.sourceZ) {
            return;
        }
        var source = layer.getSource();
        var sourceTileGrid = source.getTileGrid();
        var tileGrid = source.getTileGridForProjection(projection);
        var tileExtent = tileGrid.getTileCoordExtent(tile.wrappedTileCoord);
        var sourceTiles = source.getSourceTiles(pixelRatio, projection, tile);
        var layerUid = getUid(layer);
        delete tile.hitDetectionImageData[layerUid];
        tile.executorGroups[layerUid] = [];
        var _loop_1 = function (t, tt) {
            var sourceTile = sourceTiles[t];
            if (sourceTile.getState() != TileState.LOADED) {
                return "continue";
            }
            var sourceTileCoord = sourceTile.tileCoord;
            var sourceTileExtent = sourceTileGrid.getTileCoordExtent(sourceTileCoord);
            var sharedExtent = getIntersection(tileExtent, sourceTileExtent);
            var bufferedExtent = equals(sourceTileExtent, sharedExtent)
                ? null
                : buffer(sharedExtent, layer.getRenderBuffer() * resolution, this_1.tmpExtent);
            builderState.dirty = false;
            var builderGroup = new CanvasBuilderGroup(0, sharedExtent, resolution, pixelRatio, layer.getDeclutter());
            var squaredTolerance = getSquaredRenderTolerance(resolution, pixelRatio);
            /**
             * @param {import("../../Feature.js").FeatureLike} feature Feature.
             * @this {CanvasVectorTileLayerRenderer}
             */
            var render = function (feature) {
                var styles;
                var styleFunction = feature.getStyleFunction() || layer.getStyleFunction();
                if (styleFunction) {
                    styles = styleFunction(feature, resolution);
                }
                if (styles) {
                    var dirty = this.renderFeature(feature, squaredTolerance, styles, builderGroup);
                    this.dirty_ = this.dirty_ || dirty;
                    builderState.dirty = builderState.dirty || dirty;
                }
            };
            var features = sourceTile.getFeatures();
            if (renderOrder && renderOrder !== builderState.renderedRenderOrder) {
                features.sort(renderOrder);
            }
            for (var i = 0, ii = features.length; i < ii; ++i) {
                var feature = features[i];
                if (!bufferedExtent ||
                    intersects(bufferedExtent, feature.getGeometry().getExtent())) {
                    render.call(this_1, feature);
                }
            }
            var executorGroupInstructions = builderGroup.finish();
            // no need to clip when the render tile is covered by a single source tile
            var replayExtent = layer.getRenderMode() !== VectorTileRenderType.VECTOR &&
                layer.getDeclutter() &&
                sourceTiles.length === 1
                ? null
                : sharedExtent;
            var renderingReplayGroup = new CanvasExecutorGroup(replayExtent, resolution, pixelRatio, source.getOverlaps(), executorGroupInstructions, layer.getRenderBuffer());
            tile.executorGroups[layerUid].push(renderingReplayGroup);
        };
        var this_1 = this;
        for (var t = 0, tt = sourceTiles.length; t < tt; ++t) {
            _loop_1(t, tt);
        }
        builderState.renderedRevision = revision;
        builderState.renderedZ = tile.sourceZ;
        builderState.renderedRenderOrder = renderOrder;
        builderState.renderedResolution = resolution;
    };
    /**
     * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @param {function(import("../../Feature.js").FeatureLike, import("../../layer/Layer.js").default): T} callback Feature callback.
     * @param {Array<import("../../Feature.js").FeatureLike>} declutteredFeatures Decluttered features.
     * @return {T|void} Callback result.
     * @template T
     */
    CanvasVectorTileLayerRenderer.prototype.forEachFeatureAtCoordinate = function (coordinate, frameState, hitTolerance, callback, declutteredFeatures) {
        var resolution = frameState.viewState.resolution;
        var rotation = frameState.viewState.rotation;
        hitTolerance = hitTolerance == undefined ? 0 : hitTolerance;
        var layer = this.getLayer();
        var declutter = layer.getDeclutter();
        var source = layer.getSource();
        var tileGrid = source.getTileGridForProjection(frameState.viewState.projection);
        /** @type {!Object<string, boolean>} */
        var features = {};
        var renderedTiles = /** @type {Array<import("../../VectorRenderTile.js").default>} */ (this
            .renderedTiles);
        var found;
        var i, ii;
        var _loop_2 = function () {
            var tile = renderedTiles[i];
            var tileExtent = tileGrid.getTileCoordExtent(tile.wrappedTileCoord);
            var tileContainsCoordinate = containsCoordinate(tileExtent, coordinate);
            if (!declutter) {
                // When not decluttering, we only need to consider the tile that contains the given
                // coordinate, because each feature will be rendered for each tile that contains it.
                if (!tileContainsCoordinate) {
                    return "continue";
                }
            }
            var executorGroups = tile.executorGroups[getUid(layer)];
            for (var t = 0, tt = executorGroups.length; t < tt; ++t) {
                var executorGroup = executorGroups[t];
                found =
                    found ||
                        executorGroup.forEachFeatureAtCoordinate(coordinate, resolution, rotation, hitTolerance, 
                        /**
                         * @param {import("../../Feature.js").FeatureLike} feature Feature.
                         * @return {?} Callback result.
                         */
                        function (feature) {
                            if (tileContainsCoordinate ||
                                (declutteredFeatures &&
                                    declutteredFeatures.indexOf(feature) !== -1)) {
                                var key = feature.getId();
                                if (key === undefined) {
                                    key = getUid(feature);
                                }
                                if (!(key in features)) {
                                    features[key] = true;
                                    return callback(feature, layer);
                                }
                            }
                        }, layer.getDeclutter() ? declutteredFeatures : null);
            }
        };
        for (i = 0, ii = renderedTiles.length; i < ii; ++i) {
            _loop_2();
        }
        return found;
    };
    /**
     * Asynchronous layer level hit detection.
     * @param {import("../../pixel.js").Pixel} pixel Pixel.
     * @return {Promise<Array<import("../../Feature").default>>} Promise that resolves with an array of features.
     */
    CanvasVectorTileLayerRenderer.prototype.getFeatures = function (pixel) {
        return new Promise(function (resolve, reject) {
            var layer = /** @type {import("../../layer/VectorTile.js").default} */ (this.getLayer());
            var layerUid = getUid(layer);
            var source = layer.getSource();
            var projection = this.renderedProjection;
            var projectionExtent = projection.getExtent();
            var resolution = this.renderedResolution;
            var tileGrid = source.getTileGridForProjection(projection);
            var coordinate = applyTransform(this.renderedPixelToCoordinateTransform_, pixel.slice());
            var tileCoord = tileGrid.getTileCoordForCoordAndResolution(coordinate, resolution);
            var tile;
            for (var i = 0, ii = this.renderedTiles.length; i < ii; ++i) {
                if (tileCoord.toString() === this.renderedTiles[i].tileCoord.toString()) {
                    tile = this.renderedTiles[i];
                    if (tile.getState() === TileState.LOADED && tile.hifi) {
                        var extent_1 = tileGrid.getTileCoordExtent(tile.tileCoord);
                        if (source.getWrapX() &&
                            projection.canWrapX() &&
                            !containsExtent(projectionExtent, extent_1)) {
                            wrapX(coordinate, projection);
                        }
                        break;
                    }
                    tile = undefined;
                }
            }
            if (!tile || tile.loadingSourceTiles > 0) {
                resolve([]);
                return;
            }
            var extent = tileGrid.getTileCoordExtent(tile.wrappedTileCoord);
            var corner = getTopLeft(extent);
            var tilePixel = [
                (coordinate[0] - corner[0]) / resolution,
                (corner[1] - coordinate[1]) / resolution,
            ];
            var features = tile
                .getSourceTiles()
                .reduce(function (accumulator, sourceTile) {
                return accumulator.concat(sourceTile.getFeatures());
            }, []);
            var hitDetectionImageData = tile.hitDetectionImageData[layerUid];
            if (!hitDetectionImageData && !this.animatingOrInteracting_) {
                var tileSize = toSize(tileGrid.getTileSize(tileGrid.getZForResolution(resolution)));
                var size = [tileSize[0] / 2, tileSize[1] / 2];
                var rotation = this.renderedRotation_;
                var transforms = [
                    this.getRenderTransform(tileGrid.getTileCoordCenter(tile.wrappedTileCoord), resolution, 0, 0.5, size[0], size[1], 0),
                ];
                hitDetectionImageData = createHitDetectionImageData(tileSize, transforms, features, layer.getStyleFunction(), tileGrid.getTileCoordExtent(tile.wrappedTileCoord), tile.getReplayState(layer).renderedResolution, rotation);
                tile.hitDetectionImageData[layerUid] = hitDetectionImageData;
            }
            resolve(hitDetect(tilePixel, features, hitDetectionImageData));
        }.bind(this));
    };
    /**
     * Perform action necessary to get the layer rendered after new fonts have loaded
     */
    CanvasVectorTileLayerRenderer.prototype.handleFontsChanged = function () {
        clear(this.renderTileImageQueue_);
        var layer = this.getLayer();
        if (layer.getVisible() && this.renderedLayerRevision_ !== undefined) {
            layer.changed();
        }
    };
    /**
     * Handle changes in image style state.
     * @param {import("../../events/Event.js").default} event Image style change event.
     * @private
     */
    CanvasVectorTileLayerRenderer.prototype.handleStyleImageChange_ = function (event) {
        this.renderIfReadyAndVisible();
    };
    /**
     * Render the layer.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @param {HTMLElement} target Target that may be used to render content to.
     * @return {HTMLElement} The rendered element.
     */
    CanvasVectorTileLayerRenderer.prototype.renderFrame = function (frameState, target) {
        var viewHints = frameState.viewHints;
        var hifi = !(viewHints[ViewHint.ANIMATING] || viewHints[ViewHint.INTERACTING]);
        this.renderQueuedTileImages_(hifi, frameState);
        _super.prototype.renderFrame.call(this, frameState, target);
        this.renderedPixelToCoordinateTransform_ = frameState.pixelToCoordinateTransform.slice();
        this.renderedRotation_ = frameState.viewState.rotation;
        var layer = /** @type {import("../../layer/VectorTile.js").default} */ (this.getLayer());
        var renderMode = layer.getRenderMode();
        if (renderMode === VectorTileRenderType.IMAGE) {
            return this.container;
        }
        var source = layer.getSource();
        // Unqueue tiles from the image queue when we don't need any more
        var usedTiles = frameState.usedTiles[getUid(source)];
        for (var tileUid in this.renderTileImageQueue_) {
            if (!usedTiles || !(tileUid in usedTiles)) {
                delete this.renderTileImageQueue_[tileUid];
            }
        }
        var context = this.context;
        var declutterReplays = layer.getDeclutter() ? {} : null;
        var replayTypes = VECTOR_REPLAYS[renderMode];
        var pixelRatio = frameState.pixelRatio;
        var viewState = frameState.viewState;
        var center = viewState.center;
        var resolution = viewState.resolution;
        var rotation = viewState.rotation;
        var size = frameState.size;
        var width = Math.round(size[0] * pixelRatio);
        var height = Math.round(size[1] * pixelRatio);
        var tiles = this.renderedTiles;
        var tileGrid = source.getTileGridForProjection(frameState.viewState.projection);
        var clips = [];
        var clipZs = [];
        for (var i = tiles.length - 1; i >= 0; --i) {
            var tile = /** @type {import("../../VectorRenderTile.js").default} */ (tiles[i]);
            var tileCoord = tile.tileCoord;
            var tileExtent = tileGrid.getTileCoordExtent(tile.wrappedTileCoord);
            var worldOffset = tileGrid.getTileCoordExtent(tileCoord, this.tmpExtent)[0] -
                tileExtent[0];
            var transform = multiply(scale(this.inversePixelTransform.slice(), 1 / pixelRatio, 1 / pixelRatio), this.getRenderTransform(center, resolution, rotation, pixelRatio, width, height, worldOffset));
            var executorGroups = tile.executorGroups[getUid(layer)];
            var clipped = false;
            for (var t = 0, tt = executorGroups.length; t < tt; ++t) {
                var executorGroup = executorGroups[t];
                if (!executorGroup.hasExecutors(replayTypes)) {
                    // sourceTile has no instructions of the types we want to render
                    continue;
                }
                var currentZ = tile.tileCoord[0];
                var currentClip = void 0;
                if (!declutterReplays && !clipped) {
                    currentClip = executorGroup.getClipCoords(transform);
                    context.save();
                    // Create a clip mask for regions in this low resolution tile that are
                    // already filled by a higher resolution tile
                    for (var j = 0, jj = clips.length; j < jj; ++j) {
                        var clip = clips[j];
                        if (currentZ < clipZs[j]) {
                            context.beginPath();
                            // counter-clockwise (outer ring) for current tile
                            context.moveTo(currentClip[0], currentClip[1]);
                            context.lineTo(currentClip[2], currentClip[3]);
                            context.lineTo(currentClip[4], currentClip[5]);
                            context.lineTo(currentClip[6], currentClip[7]);
                            // clockwise (inner ring) for higher resolution tile
                            context.moveTo(clip[6], clip[7]);
                            context.lineTo(clip[4], clip[5]);
                            context.lineTo(clip[2], clip[3]);
                            context.lineTo(clip[0], clip[1]);
                            context.clip();
                        }
                    }
                }
                executorGroup.execute(context, 1, transform, rotation, hifi, replayTypes, declutterReplays);
                if (!declutterReplays && !clipped) {
                    context.restore();
                    clips.push(currentClip);
                    clipZs.push(currentZ);
                    clipped = true;
                }
            }
        }
        if (declutterReplays) {
            var layerState = frameState.layerStatesArray[frameState.layerIndex];
            replayDeclutter(declutterReplays, context, rotation, layerState.opacity, hifi, frameState.declutterItems);
        }
        return this.container;
    };
    /**
     * @param {boolean} hifi We have time to render a high fidelity map image.
     * @param {import('../../PluggableMap.js').FrameState} frameState Frame state.
     */
    CanvasVectorTileLayerRenderer.prototype.renderQueuedTileImages_ = function (hifi, frameState) {
        // When we don't have time to render hifi, only render tiles until we have used up
        // half of the frame budget of 16 ms
        for (var uid in this.renderTileImageQueue_) {
            if (!hifi && Date.now() - frameState.time > 8) {
                frameState.animate = true;
                break;
            }
            var tile = this.renderTileImageQueue_[uid];
            delete this.renderTileImageQueue_[uid];
            this.renderTileImage_(tile, frameState);
        }
    };
    /**
     * @param {import("../../Feature.js").FeatureLike} feature Feature.
     * @param {number} squaredTolerance Squared tolerance.
     * @param {import("../../style/Style.js").default|Array<import("../../style/Style.js").default>} styles The style or array of styles.
     * @param {import("../../render/canvas/BuilderGroup.js").default} executorGroup Replay group.
     * @return {boolean} `true` if an image is loading.
     */
    CanvasVectorTileLayerRenderer.prototype.renderFeature = function (feature, squaredTolerance, styles, executorGroup) {
        if (!styles) {
            return false;
        }
        var loading = false;
        if (Array.isArray(styles)) {
            for (var i = 0, ii = styles.length; i < ii; ++i) {
                loading =
                    renderFeature(executorGroup, feature, styles[i], squaredTolerance, this.boundHandleStyleImageChange_) || loading;
            }
        }
        else {
            loading = renderFeature(executorGroup, feature, styles, squaredTolerance, this.boundHandleStyleImageChange_);
        }
        return loading;
    };
    /**
     * @param {import("../../VectorRenderTile.js").default} tile Tile.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../../proj/Projection.js").default} projection Projection.
     * @return {boolean} A new tile image was rendered.
     * @private
     */
    CanvasVectorTileLayerRenderer.prototype.tileImageNeedsRender_ = function (tile, pixelRatio, projection) {
        var layer = /** @type {import("../../layer/VectorTile.js").default} */ (this.getLayer());
        var replayState = tile.getReplayState(layer);
        var revision = layer.getRevision();
        var sourceZ = tile.sourceZ;
        var resolution = tile.wantedResolution;
        return (replayState.renderedTileResolution !== resolution ||
            replayState.renderedTileRevision !== revision ||
            replayState.renderedTileZ !== sourceZ);
    };
    /**
     * @param {import("../../VectorRenderTile.js").default} tile Tile.
     * @param {import("../../PluggableMap").FrameState} frameState Frame state.
     * @private
     */
    CanvasVectorTileLayerRenderer.prototype.renderTileImage_ = function (tile, frameState) {
        var layer = /** @type {import("../../layer/VectorTile.js").default} */ (this.getLayer());
        var replayState = tile.getReplayState(layer);
        var revision = layer.getRevision();
        var executorGroups = tile.executorGroups[getUid(layer)];
        replayState.renderedTileRevision = revision;
        replayState.renderedTileZ = tile.sourceZ;
        var tileCoord = tile.wrappedTileCoord;
        var z = tileCoord[0];
        var source = layer.getSource();
        var pixelRatio = frameState.pixelRatio;
        var viewState = frameState.viewState;
        var projection = viewState.projection;
        var tileGrid = source.getTileGridForProjection(projection);
        var tileResolution = tileGrid.getResolution(tile.tileCoord[0]);
        var renderPixelRatio = (frameState.pixelRatio / tile.wantedResolution) * tileResolution;
        var resolution = tileGrid.getResolution(z);
        var context = tile.getContext(layer);
        // Increase tile size when overzooming for low pixel ratio, to avoid blurry tiles
        pixelRatio = Math.max(pixelRatio, renderPixelRatio / pixelRatio);
        var size = source.getTilePixelSize(z, pixelRatio, projection);
        context.canvas.width = size[0];
        context.canvas.height = size[1];
        var renderScale = pixelRatio / renderPixelRatio;
        if (renderScale !== 1) {
            var canvasTransform = resetTransform(this.tmpTransform_);
            scaleTransform(canvasTransform, renderScale, renderScale);
            context.setTransform.apply(context, canvasTransform);
        }
        var tileExtent = tileGrid.getTileCoordExtent(tileCoord, this.tmpExtent);
        var pixelScale = renderPixelRatio / resolution;
        var transform = resetTransform(this.tmpTransform_);
        scaleTransform(transform, pixelScale, -pixelScale);
        translateTransform(transform, -tileExtent[0], -tileExtent[3]);
        for (var i = 0, ii = executorGroups.length; i < ii; ++i) {
            var executorGroup = executorGroups[i];
            executorGroup.execute(context, renderScale, transform, 0, true, IMAGE_REPLAYS[layer.getRenderMode()]);
        }
        replayState.renderedTileResolution = tile.wantedResolution;
    };
    return CanvasVectorTileLayerRenderer;
}(CanvasTileLayerRenderer));
export default CanvasVectorTileLayerRenderer;
//# sourceMappingURL=VectorTileLayer.js.map