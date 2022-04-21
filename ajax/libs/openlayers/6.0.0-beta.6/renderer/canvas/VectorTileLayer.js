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
import { getUid } from '../../util.js';
import { createCanvasContext2D } from '../../dom.js';
import TileState from '../../TileState.js';
import ViewHint from '../../ViewHint.js';
import { listen, unlisten, unlistenByKey } from '../../events.js';
import EventType from '../../events/EventType.js';
import rbush from 'rbush';
import { buffer, containsCoordinate, equals, getIntersection, getTopLeft, intersects } from '../../extent.js';
import VectorTileRenderType from '../../layer/VectorTileRenderType.js';
import ReplayType from '../../render/canvas/BuilderType.js';
import { labelCache } from '../../render/canvas.js';
import CanvasBuilderGroup from '../../render/canvas/BuilderGroup.js';
import CanvasTileLayerRenderer from './TileLayer.js';
import { getSquaredTolerance as getSquaredRenderTolerance, renderFeature } from '../vector.js';
import { apply as applyTransform, create as createTransform, compose as composeTransform, reset as resetTransform, scale as scaleTransform, translate as translateTransform, toString as transformToString, makeScale, makeInverse } from '../../transform.js';
import CanvasExecutorGroup, { replayDeclutter } from '../../render/canvas/ExecutorGroup.js';
import { clear, isEmpty } from '../../obj.js';
/**
 * @type {!Object<string, Array<import("../../render/canvas/BuilderType.js").default>>}
 */
var IMAGE_REPLAYS = {
    'image': [ReplayType.POLYGON, ReplayType.CIRCLE,
        ReplayType.LINE_STRING, ReplayType.IMAGE, ReplayType.TEXT],
    'hybrid': [ReplayType.POLYGON, ReplayType.LINE_STRING]
};
/**
 * @type {!Object<string, Array<import("../../render/canvas/BuilderType.js").default>>}
 */
var VECTOR_REPLAYS = {
    'image': [ReplayType.DEFAULT],
    'hybrid': [ReplayType.IMAGE, ReplayType.TEXT, ReplayType.DEFAULT]
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
        var baseCanvas = _this.context.canvas;
        /**
         * @private
         * @type {CanvasRenderingContext2D}
         */
        _this.overlayContext_ = createCanvasContext2D();
        var overlayCanvas = _this.overlayContext_.canvas;
        overlayCanvas.style.position = 'absolute';
        overlayCanvas.style.transformOrigin = 'top left';
        var container = document.createElement('div');
        var style = container.style;
        style.position = 'absolute';
        style.width = '100%';
        style.height = '100%';
        container.appendChild(baseCanvas);
        container.appendChild(overlayCanvas);
        /**
         * @private
         * @type {HTMLElement}
         */
        _this.container_ = container;
        /**
         * The transform for rendered pixels to viewport CSS pixels for the overlay canvas.
         * @private
         * @type {import("../../transform.js").Transform}
         */
        _this.overlayPixelTransform_ = createTransform();
        /**
         * The transform for viewport CSS pixels to rendered pixels for the overlay canvas.
         * @private
         * @type {import("../../transform.js").Transform}
         */
        _this.inverseOverlayPixelTransform_ = createTransform();
        /**
         * Declutter tree.
         * @private
         */
        _this.declutterTree_ = layer.getDeclutter() ? rbush(9, undefined) : null;
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
        // Use closest resolution.
        _this.zDirection = 0;
        listen(labelCache, EventType.CLEAR, _this.handleFontsChanged_, _this);
        return _this;
    }
    /**
     * @inheritDoc
     */
    CanvasVectorTileLayerRenderer.prototype.disposeInternal = function () {
        unlisten(labelCache, EventType.CLEAR, this.handleFontsChanged_, this);
        this.overlayContext_.canvas.width = this.overlayContext_.canvas.height = 0;
        _super.prototype.disposeInternal.call(this);
    };
    /**
     * @param {import("../../VectorRenderTile.js").default} tile Tile.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../../proj/Projection").default} projection Projection.
     */
    CanvasVectorTileLayerRenderer.prototype.prepareTile = function (tile, pixelRatio, projection) {
        var tileUid = getUid(tile);
        var state = tile.getState();
        if (((state === TileState.LOADED && tile.hifi) ||
            state === TileState.ERROR || state === TileState.ABORT) &&
            tileUid in this.tileListenerKeys_) {
            unlistenByKey(this.tileListenerKeys_[tileUid]);
            delete this.tileListenerKeys_[tileUid];
        }
        if (state === TileState.LOADED || state === TileState.ERROR) {
            this.updateExecutorGroup_(tile, pixelRatio, projection);
            if (this.tileImageNeedsRender_(tile, pixelRatio, projection)) {
                this.renderTileImageQueue_[tileUid] = tile;
            }
        }
    };
    /**
     * @inheritDoc
     */
    CanvasVectorTileLayerRenderer.prototype.getTile = function (z, x, y, frameState) {
        var tile = /** @type {import("../../VectorRenderTile.js").default} */ (_super.prototype.getTile.call(this, z, x, y, frameState));
        var pixelRatio = frameState.pixelRatio;
        var viewState = frameState.viewState;
        var resolution = viewState.resolution;
        var projection = viewState.projection;
        if (tile.getState() < TileState.LOADED) {
            tile.wantedResolution = resolution;
            var tileUid = getUid(tile);
            if (!(tileUid in this.tileListenerKeys_)) {
                var listenerKey = listen(tile, EventType.CHANGE, this.prepareTile.bind(this, tile, pixelRatio, projection));
                this.tileListenerKeys_[tileUid] = listenerKey;
            }
        }
        else {
            var viewHints = frameState.viewHints;
            var hifi = !(viewHints[ViewHint.ANIMATING] || viewHints[ViewHint.INTERACTING]);
            if (hifi || !tile.wantedResolution) {
                tile.wantedResolution = resolution;
            }
            this.prepareTile(tile, pixelRatio, projection);
        }
        return tile;
    };
    /**
     * @inheritdoc
     */
    CanvasVectorTileLayerRenderer.prototype.isDrawableTile = function (tile) {
        return _super.prototype.isDrawableTile.call(this, tile) && tile.hasContext(this.getLayer());
    };
    /**
     * @inheritDoc
     */
    CanvasVectorTileLayerRenderer.prototype.getTileImage = function (tile) {
        return tile.getImage(this.getLayer());
    };
    /**
     * @inheritDoc
     */
    CanvasVectorTileLayerRenderer.prototype.prepareFrame = function (frameState, layerState) {
        var layerRevision = this.getLayer().getRevision();
        if (this.renderedLayerRevision_ != layerRevision) {
            this.renderedTiles.length = 0;
        }
        this.renderedLayerRevision_ = layerRevision;
        return _super.prototype.prepareFrame.call(this, frameState, layerState);
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
        if (!builderState.dirty && builderState.renderedResolution === resolution &&
            builderState.renderedRevision == revision &&
            builderState.renderedRenderOrder == renderOrder && builderState.renderedZ === tile.sourceZ) {
            return;
        }
        var source = layer.getSource();
        var sourceTileGrid = source.getTileGrid();
        var tileGrid = source.getTileGridForProjection(projection);
        var tileExtent = tileGrid.getTileCoordExtent(tile.wrappedTileCoord);
        var sourceTiles = source.getSourceTiles(pixelRatio, projection, tile);
        var layerUid = getUid(layer);
        var executorGroups = tile.executorGroups[layerUid];
        if (executorGroups) {
            for (var i = 0, ii = executorGroups.length; i < ii; ++i) {
                executorGroups[i].dispose();
            }
        }
        tile.executorGroups[layerUid] = [];
        var _loop_1 = function (t, tt) {
            var sourceTile = sourceTiles[t];
            if (sourceTile.getState() != TileState.LOADED) {
                return "continue";
            }
            var sourceTileCoord = sourceTile.tileCoord;
            var sourceTileExtent = sourceTileGrid.getTileCoordExtent(sourceTileCoord);
            var sharedExtent = getIntersection(tileExtent, sourceTileExtent);
            var bufferedExtent = equals(sourceTileExtent, sharedExtent) ? null :
                buffer(sharedExtent, layer.getRenderBuffer() * resolution, this_1.tmpExtent);
            builderState.dirty = false;
            var builderGroup = new CanvasBuilderGroup(0, sharedExtent, resolution, pixelRatio, !!this_1.declutterTree_);
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
                if (!bufferedExtent || intersects(bufferedExtent, feature.getGeometry().getExtent())) {
                    render.call(this_1, feature);
                }
            }
            var executorGroupInstructions = builderGroup.finish();
            // no need to clip when the render tile is covered by a single source tile
            var replayExtent = layer.getDeclutter() && sourceTiles.length === 1 ?
                null :
                sharedExtent;
            var renderingReplayGroup = new CanvasExecutorGroup(replayExtent, resolution, pixelRatio, source.getOverlaps(), this_1.declutterTree_, executorGroupInstructions, layer.getRenderBuffer());
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
     * @inheritDoc
     */
    CanvasVectorTileLayerRenderer.prototype.forEachFeatureAtCoordinate = function (coordinate, frameState, hitTolerance, callback, thisArg) {
        var resolution = frameState.viewState.resolution;
        var rotation = frameState.viewState.rotation;
        hitTolerance = hitTolerance == undefined ? 0 : hitTolerance;
        var layer = this.getLayer();
        var source = layer.getSource();
        var tileGrid = source.getTileGridForProjection(frameState.viewState.projection);
        /** @type {!Object<string, boolean>} */
        var features = {};
        var renderedTiles = /** @type {Array<import("../../VectorRenderTile.js").default>} */ (this.renderedTiles);
        var found;
        var i, ii;
        for (i = 0, ii = renderedTiles.length; i < ii; ++i) {
            var tile = renderedTiles[i];
            if (!this.declutterTree_) {
                // When not decluttering, we only need to consider the tile that contains the given
                // coordinate, because each feature will be rendered for each tile that contains it.
                var tileExtent = tileGrid.getTileCoordExtent(tile.wrappedTileCoord);
                if (!containsCoordinate(tileExtent, coordinate)) {
                    continue;
                }
            }
            var executorGroups = tile.executorGroups[getUid(layer)];
            for (var t = 0, tt = executorGroups.length; t < tt; ++t) {
                var executorGroup = executorGroups[t];
                found = found || executorGroup.forEachFeatureAtCoordinate(coordinate, resolution, rotation, hitTolerance, {}, 
                /**
                 * @param {import("../../Feature.js").FeatureLike} feature Feature.
                 * @return {?} Callback result.
                 */
                function (feature) {
                    var key = feature.getId();
                    if (key === undefined) {
                        key = getUid(feature);
                    }
                    if (!(key in features)) {
                        features[key] = true;
                        return callback.call(thisArg, feature, layer);
                    }
                }, null);
            }
        }
        return found;
    };
    /**
     * @param {import("../../VectorTile.js").default} tile Tile.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @return {import("../../transform.js").Transform} transform Transform.
     * @private
     */
    CanvasVectorTileLayerRenderer.prototype.getReplayTransform_ = function (tile, frameState) {
        var layer = this.getLayer();
        var source = layer.getSource();
        var tileGrid = source.getTileGrid();
        var tileCoord = tile.tileCoord;
        var tileResolution = tileGrid.getResolution(tileCoord[0]);
        var viewState = frameState.viewState;
        var pixelRatio = frameState.pixelRatio;
        var renderResolution = viewState.resolution / pixelRatio;
        var tileExtent = tileGrid.getTileCoordExtent(tileCoord, this.tmpExtent);
        var center = viewState.center;
        var origin = getTopLeft(tileExtent);
        var size = frameState.size;
        var offsetX = Math.round(pixelRatio * size[0] / 2);
        var offsetY = Math.round(pixelRatio * size[1] / 2);
        return composeTransform(this.tmpTransform_, offsetX, offsetY, tileResolution / renderResolution, tileResolution / renderResolution, viewState.rotation, (origin[0] - center[0]) / tileResolution, (center[1] - origin[1]) / tileResolution);
    };
    /**
     * @param {import("../../events/Event.js").default} event Event.
     */
    CanvasVectorTileLayerRenderer.prototype.handleFontsChanged_ = function (event) {
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
     * @inheritDoc
     */
    CanvasVectorTileLayerRenderer.prototype.renderFrame = function (frameState, layerState) {
        _super.prototype.renderFrame.call(this, frameState, layerState);
        var layer = /** @type {import("../../layer/VectorTile.js").default} */ (this.getLayer());
        var viewHints = frameState.viewHints;
        var hifi = !(viewHints[ViewHint.ANIMATING] || viewHints[ViewHint.INTERACTING]);
        var renderMode = layer.getRenderMode();
        if (renderMode === VectorTileRenderType.IMAGE) {
            this.renderTileImages_(hifi, frameState);
            return this.container_;
        }
        if (!isEmpty(this.renderTileImageQueue_) && !this.extentChanged) {
            this.renderTileImages_(hifi, frameState);
            return this.container_;
        }
        var context = this.overlayContext_;
        var declutterReplays = layer.getDeclutter() ? {} : null;
        var source = layer.getSource();
        var replayTypes = VECTOR_REPLAYS[renderMode];
        var pixelRatio = frameState.pixelRatio;
        var rotation = frameState.viewState.rotation;
        var size = frameState.size;
        // set forward and inverse pixel transforms
        makeScale(this.overlayPixelTransform_, 1 / pixelRatio, 1 / pixelRatio);
        makeInverse(this.inverseOverlayPixelTransform_, this.overlayPixelTransform_);
        // resize and clear
        var canvas = context.canvas;
        var width = Math.round(size[0] * pixelRatio);
        var height = Math.round(size[1] * pixelRatio);
        if (canvas.width != width || canvas.height != height) {
            canvas.width = width;
            canvas.height = height;
            var canvasTransform = transformToString(this.overlayPixelTransform_);
            if (canvas.style.transform !== canvasTransform) {
                canvas.style.transform = canvasTransform;
            }
        }
        else {
            context.clearRect(0, 0, width, height);
        }
        if (declutterReplays) {
            this.declutterTree_.clear();
        }
        var tiles = this.renderedTiles;
        var tileGrid = source.getTileGridForProjection(frameState.viewState.projection);
        var clips = [];
        for (var i = tiles.length - 1; i >= 0; --i) {
            var tile = /** @type {import("../../VectorRenderTile.js").default} */ (tiles[i]);
            if (tile.getState() == TileState.ABORT) {
                continue;
            }
            var tileCoord = tile.tileCoord;
            var tileExtent = tileGrid.getTileCoordExtent(tile.wrappedTileCoord);
            var worldOffset = tileGrid.getTileCoordExtent(tileCoord, this.tmpExtent)[0] - tileExtent[0];
            var transform = this.getRenderTransform(frameState, width, height, worldOffset);
            var executorGroups = tile.executorGroups[getUid(layer)];
            for (var t = 0, tt = executorGroups.length; t < tt; ++t) {
                var executorGroup = executorGroups[t];
                if (!executorGroup.hasExecutors(replayTypes)) {
                    // sourceTile has no instructions of the types we want to render
                    continue;
                }
                var currentZ = tile.tileCoord[0];
                var zs = void 0, currentClip = void 0;
                if (!declutterReplays) {
                    zs = [];
                    currentClip = executorGroup.getClipCoords(transform);
                    context.save();
                    // Create a clip mask for regions in this low resolution tile that are
                    // already filled by a higher resolution tile
                    for (var j = 0, jj = clips.length; j < jj; ++j) {
                        var clip = clips[j];
                        if (currentZ < zs[j]) {
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
                executorGroup.execute(context, transform, rotation, {}, hifi, replayTypes, declutterReplays);
                if (!declutterReplays) {
                    context.restore();
                    clips.push(currentClip);
                    zs.push(currentZ);
                }
            }
        }
        if (declutterReplays) {
            replayDeclutter(declutterReplays, context, rotation, hifi);
        }
        var opacity = layerState.opacity;
        if (opacity !== parseFloat(canvas.style.opacity)) {
            canvas.style.opacity = opacity;
        }
        // Now that we have rendered the tiles we have already, let's prepare new tile images
        // for the next frame
        this.renderTileImages_(hifi, frameState);
        return this.container_;
    };
    /**
     * @param {boolean} hifi We have time to render a high fidelity map image.
     * @param {import('../../PluggableMap.js').FrameState} frameState Frame state.
     */
    CanvasVectorTileLayerRenderer.prototype.renderTileImages_ = function (hifi, frameState) {
        // When we don't have time to render hifi, only render tiles until we have used up
        // half of the frame budget of 16 ms
        for (var uid in this.renderTileImageQueue_) {
            if (!hifi && Date.now() - frameState.time > 8) {
                break;
            }
            var tile = this.renderTileImageQueue_[uid];
            frameState.animate = true;
            delete this.renderTileImageQueue_[uid];
            var layer = /** @type {import("../../layer/VectorTile.js").default} */ (this.getLayer());
            if (this.declutterTree_ && layer.getRenderMode() === VectorTileRenderType.IMAGE) {
                this.declutterTree_.clear();
            }
            var viewState = frameState.viewState;
            var tileGrid = layer.getSource().getTileGridForProjection(viewState.projection);
            var tileResolution = tileGrid.getResolution(tile.tileCoord[0]);
            var renderPixelRatio = frameState.pixelRatio / tile.wantedResolution * tileResolution;
            this.renderTileImage_(tile, frameState.pixelRatio, renderPixelRatio, viewState.projection);
        }
        clear(this.renderTileImageQueue_);
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
                loading = renderFeature(executorGroup, feature, styles[i], squaredTolerance, this.handleStyleImageChange_, this) || loading;
            }
        }
        else {
            loading = renderFeature(executorGroup, feature, styles, squaredTolerance, this.handleStyleImageChange_, this);
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
        return replayState.renderedTileResolution !== resolution || replayState.renderedTileRevision !== revision || replayState.renderedTileZ !== sourceZ;
    };
    /**
     * @param {import("../../VectorRenderTile.js").default} tile Tile.
     * @param {number} pixelRatio Pixel ratio.
     * @param {number} renderPixelRatio Render pixel ratio.
     * @param {import("../../proj/Projection.js").default} projection Projection.
     * @private
     */
    CanvasVectorTileLayerRenderer.prototype.renderTileImage_ = function (tile, pixelRatio, renderPixelRatio, projection) {
        var layer = /** @type {import("../../layer/VectorTile.js").default} */ (this.getLayer());
        var replayState = tile.getReplayState(layer);
        var revision = layer.getRevision();
        var executorGroups = tile.executorGroups[getUid(layer)];
        replayState.renderedTileRevision = revision;
        replayState.renderedTileZ = tile.sourceZ;
        var tileCoord = tile.wrappedTileCoord;
        var z = tileCoord[0];
        var source = layer.getSource();
        var tileGrid = source.getTileGridForProjection(projection);
        var resolution = tileGrid.getResolution(z);
        var context = tile.getContext(layer);
        var size = source.getTilePixelSize(z, pixelRatio, projection);
        context.canvas.width = size[0];
        context.canvas.height = size[1];
        var canvasTransform = resetTransform(this.tmpTransform_);
        var renderScale = pixelRatio / renderPixelRatio;
        scaleTransform(canvasTransform, renderScale, renderScale);
        context.setTransform.apply(context, canvasTransform);
        var tileExtent = tileGrid.getTileCoordExtent(tileCoord, this.tmpExtent);
        for (var i = 0, ii = executorGroups.length; i < ii; ++i) {
            var executorGroup = executorGroups[i];
            var pixelScale = renderPixelRatio / resolution;
            var transform = resetTransform(this.tmpTransform_);
            scaleTransform(transform, pixelScale, -pixelScale);
            translateTransform(transform, -tileExtent[0], -tileExtent[3]);
            executorGroup.execute(context, transform, 0, {}, true, IMAGE_REPLAYS[layer.getRenderMode()]);
        }
        replayState.renderedTileResolution = tile.wantedResolution;
    };
    /**
     * @inheritDoc
     */
    CanvasVectorTileLayerRenderer.prototype.getDataAtPixel = function (pixel, frameState, hitTolerance) {
        var data = _super.prototype.getDataAtPixel.call(this, pixel, frameState, hitTolerance);
        if (data) {
            return data;
        }
        var renderPixel = applyTransform(this.inverseOverlayPixelTransform_, pixel.slice());
        var context = this.overlayContext_;
        try {
            data = context.getImageData(Math.round(renderPixel[0]), Math.round(renderPixel[1]), 1, 1).data;
        }
        catch (err) {
            if (err.name === 'SecurityError') {
                // tainted canvas, we assume there is data at the given pixel (although there might not be)
                return new Uint8Array();
            }
            return data;
        }
        if (data[3] === 0) {
            return null;
        }
        return data;
    };
    return CanvasVectorTileLayerRenderer;
}(CanvasTileLayerRenderer));
export default CanvasVectorTileLayerRenderer;
//# sourceMappingURL=VectorTileLayer.js.map