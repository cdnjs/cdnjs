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
 * @module ol/renderer/canvas/VectorLayer
 */
import CanvasBuilderGroup from '../../render/canvas/BuilderGroup.js';
import CanvasLayerRenderer from './Layer.js';
import ExecutorGroup from '../../render/canvas/ExecutorGroup.js';
import ViewHint from '../../ViewHint.js';
import { HIT_DETECT_RESOLUTION, createHitDetectionImageData, hitDetect, } from '../../render/canvas/hitdetect.js';
import { apply, makeInverse, makeScale, toString as transformToString, } from '../../transform.js';
import { buffer, containsExtent, createEmpty, getWidth, intersects as intersectsExtent, wrapX as wrapExtentX, } from '../../extent.js';
import { cssOpacity } from '../../css.js';
import { defaultOrder as defaultRenderOrder, getTolerance as getRenderTolerance, getSquaredTolerance as getSquaredRenderTolerance, renderFeature, } from '../vector.js';
import { equals } from '../../array.js';
import { fromUserExtent, getTransformFromProjections, getUserProjection, toUserExtent, toUserResolution, } from '../../proj.js';
import { getUid } from '../../util.js';
import { wrapX as wrapCoordinateX } from '../../coordinate.js';
/**
 * @classdesc
 * Canvas renderer for vector layers.
 * @api
 */
var CanvasVectorLayerRenderer = /** @class */ (function (_super) {
    __extends(CanvasVectorLayerRenderer, _super);
    /**
     * @param {import("../../layer/Vector.js").default} vectorLayer Vector layer.
     */
    function CanvasVectorLayerRenderer(vectorLayer) {
        var _this = _super.call(this, vectorLayer) || this;
        /** @private */
        _this.boundHandleStyleImageChange_ = _this.handleStyleImageChange_.bind(_this);
        /**
         * @type {boolean}
         */
        _this.animatingOrInteracting_;
        /**
         * @private
         * @type {boolean}
         */
        _this.dirty_ = false;
        /**
         * @type {ImageData}
         */
        _this.hitDetectionImageData_ = null;
        /**
         * @type {Array<import("../../Feature.js").default>}
         */
        _this.renderedFeatures_ = null;
        /**
         * @private
         * @type {number}
         */
        _this.renderedRevision_ = -1;
        /**
         * @private
         * @type {number}
         */
        _this.renderedResolution_ = NaN;
        /**
         * @private
         * @type {import("../../extent.js").Extent}
         */
        _this.renderedExtent_ = createEmpty();
        /**
         * @private
         * @type {import("../../extent.js").Extent}
         */
        _this.wrappedRenderedExtent_ = createEmpty();
        /**
         * @private
         * @type {number}
         */
        _this.renderedRotation_;
        /**
         * @private
         * @type {import("../../coordinate").Coordinate}
         */
        _this.renderedCenter_ = null;
        /**
         * @private
         * @type {import("../../proj/Projection").default}
         */
        _this.renderedProjection_ = null;
        /**
         * @private
         * @type {function(import("../../Feature.js").default, import("../../Feature.js").default): number|null}
         */
        _this.renderedRenderOrder_ = null;
        /**
         * @private
         * @type {import("../../render/canvas/ExecutorGroup").default}
         */
        _this.replayGroup_ = null;
        /**
         * A new replay group had to be created by `prepareFrame()`
         * @type {boolean}
         */
        _this.replayGroupChanged = true;
        /**
         * @type {import("../../render/canvas/ExecutorGroup").default}
         */
        _this.declutterExecutorGroup = null;
        /**
         * Clipping to be performed by `renderFrame()`
         * @type {boolean}
         */
        _this.clipping = true;
        return _this;
    }
    /**
     * Get a rendering container from an existing target, if compatible.
     * @param {HTMLElement} target Potential render target.
     * @param {string} transform CSS Transform.
     * @param {number} opacity Opacity.
     */
    CanvasVectorLayerRenderer.prototype.useContainer = function (target, transform, opacity) {
        if (opacity < 1) {
            target = null;
        }
        _super.prototype.useContainer.call(this, target, transform, opacity);
    };
    /**
     * @param {ExecutorGroup} executorGroup Executor group.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @param {import("rbush").default} [opt_declutterTree] Declutter tree.
     */
    CanvasVectorLayerRenderer.prototype.renderWorlds = function (executorGroup, frameState, opt_declutterTree) {
        var extent = frameState.extent;
        var viewState = frameState.viewState;
        var center = viewState.center;
        var resolution = viewState.resolution;
        var projection = viewState.projection;
        var rotation = viewState.rotation;
        var projectionExtent = projection.getExtent();
        var vectorSource = this.getLayer().getSource();
        var pixelRatio = frameState.pixelRatio;
        var viewHints = frameState.viewHints;
        var snapToPixel = !(viewHints[ViewHint.ANIMATING] || viewHints[ViewHint.INTERACTING]);
        var context = this.context;
        var width = Math.round(frameState.size[0] * pixelRatio);
        var height = Math.round(frameState.size[1] * pixelRatio);
        var multiWorld = vectorSource.getWrapX() && projection.canWrapX();
        var worldWidth = multiWorld ? getWidth(projectionExtent) : null;
        var endWorld = multiWorld
            ? Math.ceil((extent[2] - projectionExtent[2]) / worldWidth) + 1
            : 1;
        var world = multiWorld
            ? Math.floor((extent[0] - projectionExtent[0]) / worldWidth)
            : 0;
        do {
            var transform = this.getRenderTransform(center, resolution, rotation, pixelRatio, width, height, world * worldWidth);
            executorGroup.execute(context, 1, transform, rotation, snapToPixel, undefined, opt_declutterTree);
        } while (++world < endWorld);
    };
    /**
     * Render declutter items for this layer
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     */
    CanvasVectorLayerRenderer.prototype.renderDeclutter = function (frameState) {
        if (this.declutterExecutorGroup) {
            this.renderWorlds(this.declutterExecutorGroup, frameState, frameState.declutterTree);
        }
    };
    /**
     * Render the layer.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @param {HTMLElement} target Target that may be used to render content to.
     * @return {HTMLElement} The rendered element.
     */
    CanvasVectorLayerRenderer.prototype.renderFrame = function (frameState, target) {
        var pixelRatio = frameState.pixelRatio;
        var layerState = frameState.layerStatesArray[frameState.layerIndex];
        // set forward and inverse pixel transforms
        makeScale(this.pixelTransform, 1 / pixelRatio, 1 / pixelRatio);
        makeInverse(this.inversePixelTransform, this.pixelTransform);
        var canvasTransform = transformToString(this.pixelTransform);
        this.useContainer(target, canvasTransform, layerState.opacity);
        var context = this.context;
        var canvas = context.canvas;
        var replayGroup = this.replayGroup_;
        var declutterExecutorGroup = this.declutterExecutorGroup;
        if ((!replayGroup || replayGroup.isEmpty()) &&
            (!declutterExecutorGroup || declutterExecutorGroup.isEmpty())) {
            return null;
        }
        // resize and clear
        var width = Math.round(frameState.size[0] * pixelRatio);
        var height = Math.round(frameState.size[1] * pixelRatio);
        if (canvas.width != width || canvas.height != height) {
            canvas.width = width;
            canvas.height = height;
            if (canvas.style.transform !== canvasTransform) {
                canvas.style.transform = canvasTransform;
            }
        }
        else if (!this.containerReused) {
            context.clearRect(0, 0, width, height);
        }
        this.preRender(context, frameState);
        var viewState = frameState.viewState;
        var projection = viewState.projection;
        // clipped rendering if layer extent is set
        var clipped = false;
        var render = true;
        if (layerState.extent && this.clipping) {
            var layerExtent = fromUserExtent(layerState.extent, projection);
            render = intersectsExtent(layerExtent, frameState.extent);
            clipped = render && !containsExtent(layerExtent, frameState.extent);
            if (clipped) {
                this.clipUnrotated(context, frameState, layerExtent);
            }
        }
        if (render) {
            this.renderWorlds(replayGroup, frameState);
        }
        if (clipped) {
            context.restore();
        }
        this.postRender(context, frameState);
        var opacity = cssOpacity(layerState.opacity);
        var container = this.container;
        if (opacity !== container.style.opacity) {
            container.style.opacity = opacity;
        }
        if (this.renderedRotation_ !== viewState.rotation) {
            this.renderedRotation_ = viewState.rotation;
            this.hitDetectionImageData_ = null;
        }
        return this.container;
    };
    /**
     * Asynchronous layer level hit detection.
     * @param {import("../../pixel.js").Pixel} pixel Pixel.
     * @return {Promise<Array<import("../../Feature").default>>} Promise that resolves with an array of features.
     */
    CanvasVectorLayerRenderer.prototype.getFeatures = function (pixel) {
        return new Promise(
        /**
         * @param {function(Array<import("../../Feature").default|import("../../render/Feature").default>): void} resolve Resolver function.
         * @this {CanvasVectorLayerRenderer}
         */
        function (resolve) {
            if (!this.hitDetectionImageData_ && !this.animatingOrInteracting_) {
                var size = [this.context.canvas.width, this.context.canvas.height];
                apply(this.pixelTransform, size);
                var center = this.renderedCenter_;
                var resolution = this.renderedResolution_;
                var rotation = this.renderedRotation_;
                var projection = this.renderedProjection_;
                var extent = this.wrappedRenderedExtent_;
                var layer = this.getLayer();
                var transforms = [];
                var width = size[0] * HIT_DETECT_RESOLUTION;
                var height = size[1] * HIT_DETECT_RESOLUTION;
                transforms.push(this.getRenderTransform(center, resolution, rotation, HIT_DETECT_RESOLUTION, width, height, 0).slice());
                var source = layer.getSource();
                var projectionExtent = projection.getExtent();
                if (source.getWrapX() &&
                    projection.canWrapX() &&
                    !containsExtent(projectionExtent, extent)) {
                    var startX = extent[0];
                    var worldWidth = getWidth(projectionExtent);
                    var world = 0;
                    var offsetX = void 0;
                    while (startX < projectionExtent[0]) {
                        --world;
                        offsetX = worldWidth * world;
                        transforms.push(this.getRenderTransform(center, resolution, rotation, HIT_DETECT_RESOLUTION, width, height, offsetX).slice());
                        startX += worldWidth;
                    }
                    world = 0;
                    startX = extent[2];
                    while (startX > projectionExtent[2]) {
                        ++world;
                        offsetX = worldWidth * world;
                        transforms.push(this.getRenderTransform(center, resolution, rotation, HIT_DETECT_RESOLUTION, width, height, offsetX).slice());
                        startX -= worldWidth;
                    }
                }
                this.hitDetectionImageData_ = createHitDetectionImageData(size, transforms, this.renderedFeatures_, layer.getStyleFunction(), extent, resolution, rotation);
            }
            resolve(hitDetect(pixel, this.renderedFeatures_, this.hitDetectionImageData_));
        }.bind(this));
    };
    /**
     * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @param {import("../vector.js").FeatureCallback<T>} callback Feature callback.
     * @param {Array<import("../Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
     * @return {T|undefined} Callback result.
     * @template T
     */
    CanvasVectorLayerRenderer.prototype.forEachFeatureAtCoordinate = function (coordinate, frameState, hitTolerance, callback, matches) {
        var _this = this;
        if (!this.replayGroup_) {
            return undefined;
        }
        var resolution = frameState.viewState.resolution;
        var rotation = frameState.viewState.rotation;
        var layer = this.getLayer();
        /** @type {!Object<string, import("../Map.js").HitMatch<T>|true>} */
        var features = {};
        /**
         * @param {import("../../Feature.js").FeatureLike} feature Feature.
         * @param {import("../../geom/SimpleGeometry.js").default} geometry Geometry.
         * @param {number} distanceSq The squared distance to the click position
         * @return {T|undefined} Callback result.
         */
        var featureCallback = function (feature, geometry, distanceSq) {
            var key = getUid(feature);
            var match = features[key];
            if (!match) {
                if (distanceSq === 0) {
                    features[key] = true;
                    return callback(feature, layer, geometry);
                }
                matches.push((features[key] = {
                    feature: feature,
                    layer: layer,
                    geometry: geometry,
                    distanceSq: distanceSq,
                    callback: callback,
                }));
            }
            else if (match !== true && distanceSq < match.distanceSq) {
                if (distanceSq === 0) {
                    features[key] = true;
                    matches.splice(matches.lastIndexOf(match), 1);
                    return callback(feature, layer, geometry);
                }
                match.geometry = geometry;
                match.distanceSq = distanceSq;
            }
            return undefined;
        };
        var result;
        var executorGroups = [this.replayGroup_];
        if (this.declutterExecutorGroup) {
            executorGroups.push(this.declutterExecutorGroup);
        }
        executorGroups.some(function (executorGroup) {
            return (result = executorGroup.forEachFeatureAtCoordinate(coordinate, resolution, rotation, hitTolerance, featureCallback, executorGroup === _this.declutterExecutorGroup
                ? frameState.declutterTree.all().map(function (item) { return item.value; })
                : null));
        });
        return result;
    };
    /**
     * Perform action necessary to get the layer rendered after new fonts have loaded
     */
    CanvasVectorLayerRenderer.prototype.handleFontsChanged = function () {
        var layer = this.getLayer();
        if (layer.getVisible() && this.replayGroup_) {
            layer.changed();
        }
    };
    /**
     * Handle changes in image style state.
     * @param {import("../../events/Event.js").default} event Image style change event.
     * @private
     */
    CanvasVectorLayerRenderer.prototype.handleStyleImageChange_ = function (event) {
        this.renderIfReadyAndVisible();
    };
    /**
     * Determine whether render should be called.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @return {boolean} Layer is ready to be rendered.
     */
    CanvasVectorLayerRenderer.prototype.prepareFrame = function (frameState) {
        var vectorLayer = this.getLayer();
        var vectorSource = vectorLayer.getSource();
        if (!vectorSource) {
            return false;
        }
        var animating = frameState.viewHints[ViewHint.ANIMATING];
        var interacting = frameState.viewHints[ViewHint.INTERACTING];
        var updateWhileAnimating = vectorLayer.getUpdateWhileAnimating();
        var updateWhileInteracting = vectorLayer.getUpdateWhileInteracting();
        if ((!this.dirty_ && !updateWhileAnimating && animating) ||
            (!updateWhileInteracting && interacting)) {
            this.animatingOrInteracting_ = true;
            return true;
        }
        this.animatingOrInteracting_ = false;
        var frameStateExtent = frameState.extent;
        var viewState = frameState.viewState;
        var projection = viewState.projection;
        var resolution = viewState.resolution;
        var pixelRatio = frameState.pixelRatio;
        var vectorLayerRevision = vectorLayer.getRevision();
        var vectorLayerRenderBuffer = vectorLayer.getRenderBuffer();
        var vectorLayerRenderOrder = vectorLayer.getRenderOrder();
        if (vectorLayerRenderOrder === undefined) {
            vectorLayerRenderOrder = defaultRenderOrder;
        }
        var center = viewState.center.slice();
        var extent = buffer(frameStateExtent, vectorLayerRenderBuffer * resolution);
        var renderedExtent = extent.slice();
        var loadExtents = [extent.slice()];
        var projectionExtent = projection.getExtent();
        if (vectorSource.getWrapX() &&
            projection.canWrapX() &&
            !containsExtent(projectionExtent, frameState.extent)) {
            // For the replay group, we need an extent that intersects the real world
            // (-180° to +180°). To support geometries in a coordinate range from -540°
            // to +540°, we add at least 1 world width on each side of the projection
            // extent. If the viewport is wider than the world, we need to add half of
            // the viewport width to make sure we cover the whole viewport.
            var worldWidth = getWidth(projectionExtent);
            var gutter = Math.max(getWidth(extent) / 2, worldWidth);
            extent[0] = projectionExtent[0] - gutter;
            extent[2] = projectionExtent[2] + gutter;
            wrapCoordinateX(center, projection);
            var loadExtent = wrapExtentX(loadExtents[0], projection);
            // If the extent crosses the date line, we load data for both edges of the worlds
            if (loadExtent[0] < projectionExtent[0] &&
                loadExtent[2] < projectionExtent[2]) {
                loadExtents.push([
                    loadExtent[0] + worldWidth,
                    loadExtent[1],
                    loadExtent[2] + worldWidth,
                    loadExtent[3],
                ]);
            }
            else if (loadExtent[0] > projectionExtent[0] &&
                loadExtent[2] > projectionExtent[2]) {
                loadExtents.push([
                    loadExtent[0] - worldWidth,
                    loadExtent[1],
                    loadExtent[2] - worldWidth,
                    loadExtent[3],
                ]);
            }
        }
        if (!this.dirty_ &&
            this.renderedResolution_ == resolution &&
            this.renderedRevision_ == vectorLayerRevision &&
            this.renderedRenderOrder_ == vectorLayerRenderOrder &&
            containsExtent(this.wrappedRenderedExtent_, extent)) {
            if (!equals(this.renderedExtent_, renderedExtent)) {
                this.hitDetectionImageData_ = null;
                this.renderedExtent_ = renderedExtent;
            }
            this.renderedCenter_ = center;
            this.replayGroupChanged = false;
            return true;
        }
        this.replayGroup_ = null;
        this.dirty_ = false;
        var replayGroup = new CanvasBuilderGroup(getRenderTolerance(resolution, pixelRatio), extent, resolution, pixelRatio);
        var declutterBuilderGroup;
        if (this.getLayer().getDeclutter()) {
            declutterBuilderGroup = new CanvasBuilderGroup(getRenderTolerance(resolution, pixelRatio), extent, resolution, pixelRatio);
        }
        var userProjection = getUserProjection();
        var userTransform;
        if (userProjection) {
            for (var i = 0, ii = loadExtents.length; i < ii; ++i) {
                var extent_1 = loadExtents[i];
                var userExtent_1 = toUserExtent(extent_1, projection);
                vectorSource.loadFeatures(userExtent_1, toUserResolution(resolution, projection), userProjection);
            }
            userTransform = getTransformFromProjections(userProjection, projection);
        }
        else {
            for (var i = 0, ii = loadExtents.length; i < ii; ++i) {
                vectorSource.loadFeatures(loadExtents[i], resolution, projection);
            }
        }
        var squaredTolerance = getSquaredRenderTolerance(resolution, pixelRatio);
        var render = 
        /**
         * @param {import("../../Feature.js").default} feature Feature.
         * @this {CanvasVectorLayerRenderer}
         */
        function (feature) {
            var styles;
            var styleFunction = feature.getStyleFunction() || vectorLayer.getStyleFunction();
            if (styleFunction) {
                styles = styleFunction(feature, resolution);
            }
            if (styles) {
                var dirty = this.renderFeature(feature, squaredTolerance, styles, replayGroup, userTransform, declutterBuilderGroup);
                this.dirty_ = this.dirty_ || dirty;
            }
        }.bind(this);
        var userExtent = toUserExtent(extent, projection);
        /** @type {Array<import("../../Feature.js").default>} */
        var features = vectorSource.getFeaturesInExtent(userExtent);
        if (vectorLayerRenderOrder) {
            features.sort(vectorLayerRenderOrder);
        }
        for (var i = 0, ii = features.length; i < ii; ++i) {
            render(features[i]);
        }
        this.renderedFeatures_ = features;
        var replayGroupInstructions = replayGroup.finish();
        var executorGroup = new ExecutorGroup(extent, resolution, pixelRatio, vectorSource.getOverlaps(), replayGroupInstructions, vectorLayer.getRenderBuffer());
        if (declutterBuilderGroup) {
            this.declutterExecutorGroup = new ExecutorGroup(extent, resolution, pixelRatio, vectorSource.getOverlaps(), declutterBuilderGroup.finish(), vectorLayer.getRenderBuffer());
        }
        this.renderedResolution_ = resolution;
        this.renderedRevision_ = vectorLayerRevision;
        this.renderedRenderOrder_ = vectorLayerRenderOrder;
        this.renderedExtent_ = renderedExtent;
        this.wrappedRenderedExtent_ = extent;
        this.renderedCenter_ = center;
        this.renderedProjection_ = projection;
        this.replayGroup_ = executorGroup;
        this.hitDetectionImageData_ = null;
        this.replayGroupChanged = true;
        return true;
    };
    /**
     * @param {import("../../Feature.js").default} feature Feature.
     * @param {number} squaredTolerance Squared render tolerance.
     * @param {import("../../style/Style.js").default|Array<import("../../style/Style.js").default>} styles The style or array of styles.
     * @param {import("../../render/canvas/BuilderGroup.js").default} builderGroup Builder group.
     * @param {import("../../proj.js").TransformFunction} [opt_transform] Transform from user to view projection.
     * @param {import("../../render/canvas/BuilderGroup.js").default} [opt_declutterBuilderGroup] Builder for decluttering.
     * @return {boolean} `true` if an image is loading.
     */
    CanvasVectorLayerRenderer.prototype.renderFeature = function (feature, squaredTolerance, styles, builderGroup, opt_transform, opt_declutterBuilderGroup) {
        if (!styles) {
            return false;
        }
        var loading = false;
        if (Array.isArray(styles)) {
            for (var i = 0, ii = styles.length; i < ii; ++i) {
                loading =
                    renderFeature(builderGroup, feature, styles[i], squaredTolerance, this.boundHandleStyleImageChange_, opt_transform, opt_declutterBuilderGroup) || loading;
            }
        }
        else {
            loading = renderFeature(builderGroup, feature, styles, squaredTolerance, this.boundHandleStyleImageChange_, opt_transform, opt_declutterBuilderGroup);
        }
        return loading;
    };
    return CanvasVectorLayerRenderer;
}(CanvasLayerRenderer));
export default CanvasVectorLayerRenderer;
//# sourceMappingURL=VectorLayer.js.map