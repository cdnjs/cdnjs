/**
 * @module ol/renderer/webgl/VectorLayer
 */
import {getUid} from '../../util.js';
import LayerType from '../../LayerType.js';
import ViewHint from '../../ViewHint.js';
import {buffer, containsExtent, createEmpty} from '../../extent.js';
import WebGLReplayGroup from '../../render/webgl/ReplayGroup.js';
import {defaultOrder as defaultRenderOrder, getTolerance as getRenderTolerance, getSquaredTolerance as getSquaredRenderTolerance, renderFeature} from '../vector.js';
import WebGLLayerRenderer from './Layer.js';
import {apply as applyTransform} from '../../transform.js';


/**
 * @classdesc
 * WebGL renderer for vector layers.
 * @api
 */
var WebGLVectorLayerRenderer = /*@__PURE__*/(function (WebGLLayerRenderer) {
  function WebGLVectorLayerRenderer(mapRenderer, vectorLayer) {

    WebGLLayerRenderer.call(this, mapRenderer, vectorLayer);

    /**
     * @private
     * @type {boolean}
     */
    this.dirty_ = false;

    /**
     * @private
     * @type {number}
     */
    this.renderedRevision_ = -1;

    /**
     * @private
     * @type {number}
     */
    this.renderedResolution_ = NaN;

    /**
     * @private
     * @type {import("../../extent.js").Extent}
     */
    this.renderedExtent_ = createEmpty();

    /**
     * @private
     * @type {function(import("../../Feature.js").default, import("../../Feature.js").default): number|null}
     */
    this.renderedRenderOrder_ = null;

    /**
     * @private
     * @type {import("../../render/webgl/ReplayGroup.js").default}
     */
    this.replayGroup_ = null;

    /**
     * The last layer state.
     * @private
     * @type {?import("../../layer/Layer.js").State}
     */
    this.layerState_ = null;

  }

  if ( WebGLLayerRenderer ) WebGLVectorLayerRenderer.__proto__ = WebGLLayerRenderer;
  WebGLVectorLayerRenderer.prototype = Object.create( WebGLLayerRenderer && WebGLLayerRenderer.prototype );
  WebGLVectorLayerRenderer.prototype.constructor = WebGLVectorLayerRenderer;

  /**
   * @inheritDoc
   */
  WebGLVectorLayerRenderer.prototype.composeFrame = function composeFrame (frameState, layerState, context) {
    this.layerState_ = layerState;
    var viewState = frameState.viewState;
    var replayGroup = this.replayGroup_;
    var size = frameState.size;
    var pixelRatio = frameState.pixelRatio;
    var gl = this.mapRenderer.getGL();
    if (replayGroup && !replayGroup.isEmpty()) {
      gl.enable(gl.SCISSOR_TEST);
      gl.scissor(0, 0, size[0] * pixelRatio, size[1] * pixelRatio);
      replayGroup.replay(context,
        viewState.center, viewState.resolution, viewState.rotation,
        size, pixelRatio, layerState.opacity,
        layerState.managed ? frameState.skippedFeatureUids : {});
      gl.disable(gl.SCISSOR_TEST);
    }

  };

  /**
   * @inheritDoc
   */
  WebGLVectorLayerRenderer.prototype.disposeInternal = function disposeInternal () {
    var replayGroup = this.replayGroup_;
    if (replayGroup) {
      var context = this.mapRenderer.getContext();
      replayGroup.getDeleteResourcesFunction(context)();
      this.replayGroup_ = null;
    }
    WebGLLayerRenderer.prototype.disposeInternal.call(this);
  };

  /**
   * @inheritDoc
   */
  WebGLVectorLayerRenderer.prototype.forEachFeatureAtCoordinate = function forEachFeatureAtCoordinate (coordinate, frameState, hitTolerance, callback, thisArg) {
    if (!this.replayGroup_ || !this.layerState_) {
      return undefined;
    } else {
      var context = this.mapRenderer.getContext();
      var viewState = frameState.viewState;
      var layer = this.getLayer();
      var layerState = this.layerState_;
      /** @type {!Object<string, boolean>} */
      var features = {};
      return this.replayGroup_.forEachFeatureAtCoordinate(coordinate,
        context, viewState.center, viewState.resolution, viewState.rotation,
        frameState.size, frameState.pixelRatio, layerState.opacity,
        {},
        /**
         * @param {import("../../Feature.js").FeatureLike} feature Feature.
         * @return {?} Callback result.
         */
        function(feature) {
          var key = getUid(feature);
          if (!(key in features)) {
            features[key] = true;
            return callback.call(thisArg, feature, layer);
          }
        });
    }
  };

  /**
   * @inheritDoc
   */
  WebGLVectorLayerRenderer.prototype.hasFeatureAtCoordinate = function hasFeatureAtCoordinate (coordinate, frameState) {
    if (!this.replayGroup_ || !this.layerState_) {
      return false;
    } else {
      var context = this.mapRenderer.getContext();
      var viewState = frameState.viewState;
      var layerState = this.layerState_;
      return this.replayGroup_.hasFeatureAtCoordinate(coordinate,
        context, viewState.center, viewState.resolution, viewState.rotation,
        frameState.size, frameState.pixelRatio, layerState.opacity,
        frameState.skippedFeatureUids);
    }
  };

  /**
   * @inheritDoc
   */
  WebGLVectorLayerRenderer.prototype.forEachLayerAtPixel = function forEachLayerAtPixel (pixel, frameState, callback, thisArg) {
    var coordinate = applyTransform(
      frameState.pixelToCoordinateTransform, pixel.slice());
    var hasFeature = this.hasFeatureAtCoordinate(coordinate, frameState);

    if (hasFeature) {
      return callback.call(thisArg, this.getLayer(), null);
    } else {
      return undefined;
    }
  };

  /**
   * Handle changes in image style state.
   * @param {import("../../events/Event.js").default} event Image style change event.
   * @private
   */
  WebGLVectorLayerRenderer.prototype.handleStyleImageChange_ = function handleStyleImageChange_ (event) {
    this.renderIfReadyAndVisible();
  };

  /**
   * @inheritDoc
   */
  WebGLVectorLayerRenderer.prototype.prepareFrame = function prepareFrame (frameState, layerState, context) {
    var vectorLayer = /** @type {import("../../layer/Vector.js").default} */ (this.getLayer());
    var vectorSource = /** @type {import("../../source/Vector.js").default} */ (vectorLayer.getSource());

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

    var extent = buffer(frameStateExtent,
      vectorLayerRenderBuffer * resolution);

    if (!this.dirty_ &&
        this.renderedResolution_ == resolution &&
        this.renderedRevision_ == vectorLayerRevision &&
        this.renderedRenderOrder_ == vectorLayerRenderOrder &&
        containsExtent(this.renderedExtent_, extent)) {
      return true;
    }

    if (this.replayGroup_) {
      frameState.postRenderFunctions.push(
        this.replayGroup_.getDeleteResourcesFunction(context));
    }

    this.dirty_ = false;

    var replayGroup = new WebGLReplayGroup(
      getRenderTolerance(resolution, pixelRatio),
      extent, vectorLayer.getRenderBuffer());
    vectorSource.loadFeatures(extent, resolution, projection);
    /**
     * @param {import("../../Feature.js").default} feature Feature.
     * @this {WebGLVectorLayerRenderer}
     */
    var render = function(feature) {
      var styles;
      var styleFunction = feature.getStyleFunction() || vectorLayer.getStyleFunction();
      if (styleFunction) {
        styles = styleFunction(feature, resolution);
      }
      if (styles) {
        var dirty = this.renderFeature(
          feature, resolution, pixelRatio, styles, replayGroup);
        this.dirty_ = this.dirty_ || dirty;
      }
    }.bind(this);
    if (vectorLayerRenderOrder) {
      /** @type {Array<import("../../Feature.js").default>} */
      var features = [];
      vectorSource.forEachFeatureInExtent(extent,
        /**
         * @param {import("../../Feature.js").default} feature Feature.
         */
        function(feature) {
          features.push(feature);
        });
      features.sort(vectorLayerRenderOrder);
      features.forEach(render.bind(this));
    } else {
      vectorSource.forEachFeatureInExtent(extent, render);
    }
    replayGroup.finish(context);

    this.renderedResolution_ = resolution;
    this.renderedRevision_ = vectorLayerRevision;
    this.renderedRenderOrder_ = vectorLayerRenderOrder;
    this.renderedExtent_ = extent;
    this.replayGroup_ = replayGroup;

    return true;
  };

  /**
   * @param {import("../../Feature.js").default} feature Feature.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../../style/Style.js").default|Array<import("../../style/Style.js").default>} styles The style or array of
   *     styles.
   * @param {import("../../render/webgl/ReplayGroup.js").default} replayGroup Replay group.
   * @return {boolean} `true` if an image is loading.
   */
  WebGLVectorLayerRenderer.prototype.renderFeature = function renderFeature$1 (feature, resolution, pixelRatio, styles, replayGroup) {
    if (!styles) {
      return false;
    }
    var loading = false;
    if (Array.isArray(styles)) {
      for (var i = styles.length - 1, ii = 0; i >= ii; --i) {
        loading = renderFeature(
          replayGroup, feature, styles[i],
          getSquaredRenderTolerance(resolution, pixelRatio),
          this.handleStyleImageChange_, this) || loading;
      }
    } else {
      loading = renderFeature(
        replayGroup, feature, styles,
        getSquaredRenderTolerance(resolution, pixelRatio),
        this.handleStyleImageChange_, this) || loading;
    }
    return loading;
  };

  return WebGLVectorLayerRenderer;
}(WebGLLayerRenderer));


/**
 * Determine if this renderer handles the provided layer.
 * @param {import("../../layer/Layer.js").default} layer The candidate layer.
 * @return {boolean} The renderer can render the layer.
 */
WebGLVectorLayerRenderer['handles'] = function(layer) {
  return layer.getType() === LayerType.VECTOR;
};


/**
 * Create a layer renderer.
 * @param {import("../Map.js").default} mapRenderer The map renderer.
 * @param {import("../../layer/Layer.js").default} layer The layer to be rendererd.
 * @return {WebGLVectorLayerRenderer} The layer renderer.
 */
WebGLVectorLayerRenderer['create'] = function(mapRenderer, layer) {
  return new WebGLVectorLayerRenderer(
    /** @type {import("./Map.js").default} */ (mapRenderer),
    /** @type {import("../../layer/Vector.js").default} */ (layer)
  );
};


export default WebGLVectorLayerRenderer;

//# sourceMappingURL=VectorLayer.js.map