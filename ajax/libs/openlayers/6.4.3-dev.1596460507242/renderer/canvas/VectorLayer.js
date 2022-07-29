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
 * @module ol/renderer/canvas/VectorLayer
 */
import CanvasBuilderGroup from '../../render/canvas/BuilderGroup.js';
import CanvasLayerRenderer from './Layer.js';
import ExecutorGroup, { replayDeclutter, } from '../../render/canvas/ExecutorGroup.js';
import ViewHint from '../../ViewHint.js';
import { apply, makeInverse, makeScale, toString as transformToString, } from '../../transform.js';
import { buffer, containsExtent, createEmpty, getWidth, intersects as intersectsExtent, wrapX as wrapExtentX, } from '../../extent.js';
import { createHitDetectionImageData, hitDetect, } from '../../render/canvas/hitdetect.js';
import { defaultOrder as defaultRenderOrder, getTolerance as getRenderTolerance, getSquaredTolerance as getSquaredRenderTolerance, renderFeature, } from '../vector.js';
import { fromUserExtent, getTransformFromProjections, getUserProjection, toUserExtent, } from '../../proj.js';
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
        if (!replayGroup || replayGroup.isEmpty()) {
            if (!this.containerReused && canvas.width > 0) {
                canvas.width = 0;
            }
            return this.container;
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
        var extent = frameState.extent;
        var viewState = frameState.viewState;
        var center = viewState.center;
        var resolution = viewState.resolution;
        var projection = viewState.projection;
        var rotation = viewState.rotation;
        var projectionExtent = projection.getExtent();
        var vectorSource = this.getLayer().getSource();
        // clipped rendering if layer extent is set
        var clipped = false;
        if (layerState.extent && this.clipping) {
            var layerExtent = fromUserExtent(layerState.extent, projection);
            clipped =
                !containsExtent(layerExtent, frameState.extent) &&
                    intersectsExtent(layerExtent, frameState.extent);
            if (clipped) {
                this.clipUnrotated(context, frameState, layerExtent);
            }
        }
        var viewHints = frameState.viewHints;
        var snapToPixel = !(viewHints[ViewHint.ANIMATING] || viewHints[ViewHint.INTERACTING]);
        var transform = this.getRenderTransform(center, resolution, rotation, pixelRatio, width, height, 0);
        var declutterReplays = this.getLayer().getDeclutter() ? {} : null;
        replayGroup.execute(context, 1, transform, rotation, snapToPixel, undefined, declutterReplays);
        if (vectorSource.getWrapX() &&
            projection.canWrapX() &&
            !containsExtent(projectionExtent, extent)) {
            var startX = extent[0];
            var worldWidth = getWidth(projectionExtent);
            var world = 0;
            var offsetX = void 0;
            while (startX < projectionExtent[0]) {
                --world;
                offsetX = worldWidth * world;
                var transform_1 = this.getRenderTransform(center, resolution, rotation, pixelRatio, width, height, offsetX);
                replayGroup.execute(context, 1, transform_1, rotation, snapToPixel, undefined, declutterReplays);
                startX += worldWidth;
            }
            world = 0;
            startX = extent[2];
            while (startX > projectionExtent[2]) {
                ++world;
                offsetX = worldWidth * world;
                var transform_2 = this.getRenderTransform(center, resolution, rotation, pixelRatio, width, height, offsetX);
                replayGroup.execute(context, 1, transform_2, rotation, snapToPixel, undefined, declutterReplays);
                startX -= worldWidth;
            }
        }
        if (declutterReplays) {
            var viewHints_1 = frameState.viewHints;
            var hifi = !(viewHints_1[ViewHint.ANIMATING] || viewHints_1[ViewHint.INTERACTING]);
            replayDeclutter(declutterReplays, context, rotation, 1, hifi, frameState.declutterItems);
        }
        if (clipped) {
            context.restore();
        }
        this.postRender(context, frameState);
        var opacity = layerState.opacity;
        var container = this.container;
        if (opacity !== parseFloat(container.style.opacity)) {
            container.style.opacity = opacity === 1 ? '' : String(opacity);
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
        return new Promise(function (resolve, reject) {
            if (!this.hitDetectionImageData_ && !this.animatingOrInteracting_) {
                var size = [this.context.canvas.width, this.context.canvas.height];
                apply(this.pixelTransform, size);
                var center = this.renderedCenter_;
                var resolution = this.renderedResolution_;
                var rotation = this.renderedRotation_;
                var projection = this.renderedProjection_;
                var extent = this.renderedExtent_;
                var layer = this.getLayer();
                var transforms = [];
                var width = size[0] / 2;
                var height = size[1] / 2;
                transforms.push(this.getRenderTransform(center, resolution, rotation, 0.5, width, height, 0).slice());
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
                        transforms.push(this.getRenderTransform(center, resolution, rotation, 0.5, width, height, offsetX).slice());
                        startX += worldWidth;
                    }
                    world = 0;
                    startX = extent[2];
                    while (startX > projectionExtent[2]) {
                        ++world;
                        offsetX = worldWidth * world;
                        transforms.push(this.getRenderTransform(center, resolution, rotation, 0.5, width, height, offsetX).slice());
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
     * @param {function(import("../../Feature.js").FeatureLike, import("../../layer/Layer.js").default): T} callback Feature callback.
     * @param {Array<import("../../Feature.js").FeatureLike>} declutteredFeatures Decluttered features.
     * @return {T|void} Callback result.
     * @template T
     */
    CanvasVectorLayerRenderer.prototype.forEachFeatureAtCoordinate = function (coordinate, frameState, hitTolerance, callback, declutteredFeatures) {
        if (!this.replayGroup_) {
            return undefined;
        }
        else {
            var resolution = frameState.viewState.resolution;
            var rotation = frameState.viewState.rotation;
            var layer_1 = this.getLayer();
            /** @type {!Object<string, boolean>} */
            var features_1 = {};
            var result = this.replayGroup_.forEachFeatureAtCoordinate(coordinate, resolution, rotation, hitTolerance, 
            /**
             * @param {import("../../Feature.js").FeatureLike} feature Feature.
             * @return {?} Callback result.
             */
            function (feature) {
                var key = getUid(feature);
                if (!(key in features_1)) {
                    features_1[key] = true;
                    return callback(feature, layer_1);
                }
            }, layer_1.getDeclutter() ? declutteredFeatures : null);
            return result;
        }
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
            containsExtent(this.renderedExtent_, extent)) {
            this.replayGroupChanged = false;
            return true;
        }
        this.replayGroup_ = null;
        this.dirty_ = false;
        var replayGroup = new CanvasBuilderGroup(getRenderTolerance(resolution, pixelRatio), extent, resolution, pixelRatio, vectorLayer.getDeclutter());
        var userProjection = getUserProjection();
        var userTransform;
        if (userProjection) {
            for (var i = 0, ii = loadExtents.length; i < ii; ++i) {
                vectorSource.loadFeatures(toUserExtent(loadExtents[i], projection), resolution, userProjection);
            }
            userTransform = getTransformFromProjections(userProjection, projection);
        }
        else {
            for (var i = 0, ii = loadExtents.length; i < ii; ++i) {
                vectorSource.loadFeatures(loadExtents[i], resolution, projection);
            }
        }
        var squaredTolerance = getSquaredRenderTolerance(resolution, pixelRatio);
        /**
         * @param {import("../../Feature.js").default} feature Feature.
         * @this {CanvasVectorLayerRenderer}
         */
        var render = function (feature) {
            var styles;
            var styleFunction = feature.getStyleFunction() || vectorLayer.getStyleFunction();
            if (styleFunction) {
                styles = styleFunction(feature, resolution);
            }
            if (styles) {
                var dirty = this.renderFeature(feature, squaredTolerance, styles, replayGroup, userTransform);
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
        this.renderedResolution_ = resolution;
        this.renderedRevision_ = vectorLayerRevision;
        this.renderedRenderOrder_ = vectorLayerRenderOrder;
        this.renderedExtent_ = extent;
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
     * @param {import("../../proj.js").TransformFunction=} opt_transform Transform from user to view projection.
     * @return {boolean} `true` if an image is loading.
     */
    CanvasVectorLayerRenderer.prototype.renderFeature = function (feature, squaredTolerance, styles, builderGroup, opt_transform) {
        if (!styles) {
            return false;
        }
        var loading = false;
        if (Array.isArray(styles)) {
            for (var i = 0, ii = styles.length; i < ii; ++i) {
                loading =
                    renderFeature(builderGroup, feature, styles[i], squaredTolerance, this.boundHandleStyleImageChange_, opt_transform) || loading;
            }
        }
        else {
            loading = renderFeature(builderGroup, feature, styles, squaredTolerance, this.boundHandleStyleImageChange_, opt_transform);
        }
        return loading;
    };
    return CanvasVectorLayerRenderer;
}(CanvasLayerRenderer));
export default CanvasVectorLayerRenderer;
//# sourceMappingURL=VectorLayer.js.map