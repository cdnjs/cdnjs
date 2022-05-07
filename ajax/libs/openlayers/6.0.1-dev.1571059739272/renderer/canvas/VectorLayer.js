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
import { getUid } from '../../util.js';
import ViewHint from '../../ViewHint.js';
import { buffer, createEmpty, containsExtent, getWidth, intersects as intersectsExtent } from '../../extent.js';
import { fromUserExtent, toUserExtent, getUserProjection, getTransformFromProjections } from '../../proj.js';
import CanvasBuilderGroup from '../../render/canvas/BuilderGroup.js';
import ExecutorGroup, { replayDeclutter } from '../../render/canvas/ExecutorGroup.js';
import CanvasLayerRenderer from './Layer.js';
import { defaultOrder as defaultRenderOrder, getTolerance as getRenderTolerance, getSquaredTolerance as getSquaredRenderTolerance, renderFeature } from '../vector.js';
import { toString as transformToString, makeScale, makeInverse } from '../../transform.js';
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
         * @private
         * @type {boolean}
         */
        _this.dirty_ = false;
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
        return _this;
    }
    /**
     * @inheritDoc
     */
    CanvasVectorLayerRenderer.prototype.useContainer = function (target, transform, opacity) {
        if (opacity < 1) {
            target = null;
        }
        _super.prototype.useContainer.call(this, target, transform, opacity);
    };
    /**
     * @inheritDoc
     */
    CanvasVectorLayerRenderer.prototype.renderFrame = function (frameState, target) {
        var pixelRatio = frameState.pixelRatio;
        var layerState = frameState.layerStatesArray[frameState.layerIndex];
        // set forward and inverse pixel transforms
        makeScale(this.pixelTransform, 1 / pixelRatio, 1 / pixelRatio);
        makeInverse(this.inversePixelTransform, this.pixelTransform);
        this.useContainer(target, this.pixelTransform, layerState.opacity);
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
            var canvasTransform = transformToString(this.pixelTransform);
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
        var projection = viewState.projection;
        var rotation = viewState.rotation;
        var projectionExtent = projection.getExtent();
        var vectorSource = this.getLayer().getSource();
        // clipped rendering if layer extent is set
        var clipped = false;
        if (layerState.extent) {
            var layerExtent = fromUserExtent(layerState.extent, projection);
            clipped = !containsExtent(layerExtent, frameState.extent) && intersectsExtent(layerExtent, frameState.extent);
            if (clipped) {
                this.clip(context, frameState, layerExtent);
            }
        }
        var viewHints = frameState.viewHints;
        var snapToPixel = !(viewHints[ViewHint.ANIMATING] || viewHints[ViewHint.INTERACTING]);
        var transform = this.getRenderTransform(frameState, width, height, 0);
        var declutterReplays = this.getLayer().getDeclutter() ? {} : null;
        replayGroup.execute(context, transform, rotation, snapToPixel, undefined, declutterReplays);
        if (vectorSource.getWrapX() && projection.canWrapX() && !containsExtent(projectionExtent, extent)) {
            var startX = extent[0];
            var worldWidth = getWidth(projectionExtent);
            var world = 0;
            var offsetX = void 0;
            while (startX < projectionExtent[0]) {
                --world;
                offsetX = worldWidth * world;
                var transform_1 = this.getRenderTransform(frameState, width, height, offsetX);
                replayGroup.execute(context, transform_1, rotation, snapToPixel, undefined, declutterReplays);
                startX += worldWidth;
            }
            world = 0;
            startX = extent[2];
            while (startX > projectionExtent[2]) {
                ++world;
                offsetX = worldWidth * world;
                var transform_2 = this.getRenderTransform(frameState, width, height, offsetX);
                replayGroup.execute(context, transform_2, rotation, snapToPixel, undefined, declutterReplays);
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
            container.style.opacity = opacity === 1 ? '' : opacity;
        }
        return this.container;
    };
    /**
     * @inheritDoc
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
     * @inheritDoc
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
     * @inheritDoc
     */
    CanvasVectorLayerRenderer.prototype.prepareFrame = function (frameState) {
        var vectorLayer = this.getLayer();
        var vectorSource = vectorLayer.getSource();
        var animating = frameState.viewHints[ViewHint.ANIMATING];
        var interacting = frameState.viewHints[ViewHint.INTERACTING];
        var updateWhileAnimating = vectorLayer.getUpdateWhileAnimating();
        var updateWhileInteracting = vectorLayer.getUpdateWhileInteracting();
        if (!this.dirty_ && (!updateWhileAnimating && animating) ||
            (!updateWhileInteracting && interacting)) {
            return true;
        }
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
        var extent = buffer(frameStateExtent, vectorLayerRenderBuffer * resolution);
        var projectionExtent = viewState.projection.getExtent();
        if (vectorSource.getWrapX() && viewState.projection.canWrapX() &&
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
        }
        if (!this.dirty_ &&
            this.renderedResolution_ == resolution &&
            this.renderedRevision_ == vectorLayerRevision &&
            this.renderedRenderOrder_ == vectorLayerRenderOrder &&
            containsExtent(this.renderedExtent_, extent)) {
            this.replayGroupChanged = false;
            return true;
        }
        if (this.replayGroup_) {
            this.replayGroup_.dispose();
        }
        this.replayGroup_ = null;
        this.dirty_ = false;
        var replayGroup = new CanvasBuilderGroup(getRenderTolerance(resolution, pixelRatio), extent, resolution, pixelRatio, vectorLayer.getDeclutter());
        var userProjection = getUserProjection();
        var userTransform;
        if (userProjection) {
            vectorSource.loadFeatures(toUserExtent(extent, projection), resolution, userProjection);
            userTransform = getTransformFromProjections(userProjection, projection);
        }
        else {
            vectorSource.loadFeatures(extent, resolution, projection);
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
        if (vectorLayerRenderOrder) {
            /** @type {Array<import("../../Feature.js").default>} */
            var features_2 = [];
            vectorSource.forEachFeatureInExtent(userExtent, 
            /**
             * @param {import("../../Feature.js").default} feature Feature.
             */
            function (feature) {
                features_2.push(feature);
            });
            features_2.sort(vectorLayerRenderOrder);
            for (var i = 0, ii = features_2.length; i < ii; ++i) {
                render(features_2[i]);
            }
        }
        else {
            vectorSource.forEachFeatureInExtent(userExtent, render);
        }
        var replayGroupInstructions = replayGroup.finish();
        var executorGroup = new ExecutorGroup(extent, resolution, pixelRatio, vectorSource.getOverlaps(), replayGroupInstructions, vectorLayer.getRenderBuffer());
        this.renderedResolution_ = resolution;
        this.renderedRevision_ = vectorLayerRevision;
        this.renderedRenderOrder_ = vectorLayerRenderOrder;
        this.renderedExtent_ = extent;
        this.replayGroup_ = executorGroup;
        this.replayGroupChanged = true;
        return true;
    };
    /**
     * @param {import("../../Feature.js").default} feature Feature.
     * @param {number} squaredTolerance Squared render tolerance.
     * @param {import("../../style/Style.js").default|Array<import("../../style/Style.js").default>} styles The style or array of styles.
     * @param {import("../../render/canvas/BuilderGroup.js").default} builderGroup Builder group.
     * @param {import("../../proj.js").TransformFunction} opt_transform Transform from user to view projection.
     * @return {boolean} `true` if an image is loading.
     */
    CanvasVectorLayerRenderer.prototype.renderFeature = function (feature, squaredTolerance, styles, builderGroup, opt_transform) {
        if (!styles) {
            return false;
        }
        var loading = false;
        if (Array.isArray(styles)) {
            for (var i = 0, ii = styles.length; i < ii; ++i) {
                loading = renderFeature(builderGroup, feature, styles[i], squaredTolerance, this.boundHandleStyleImageChange_, opt_transform) || loading;
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