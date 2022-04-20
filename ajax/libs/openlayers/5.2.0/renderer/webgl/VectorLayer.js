/**
 * @module ol/renderer/webgl/VectorLayer
 */
import {getUid} from '../../util.js';
import LayerType from '../../LayerType.js';
import ViewHint from '../../ViewHint.js';
import {buffer, containsExtent, createEmpty} from '../../extent.js';
import WebGLReplayGroup from '../../render/webgl/ReplayGroup.js';
import {defaultOrder as defaultRenderOrder, getTolerance as getRenderTolerance, getSquaredTolerance as getSquaredRenderTolerance, renderFeature} from '../vector.js';
import WebGLLayerRenderer from '../webgl/Layer.js';
import {apply as applyTransform} from '../../transform.js';


/**
 * @classdesc
 * WebGL renderer for vector layers.
 * @api
 */
var WebGLVectorLayerRenderer = (function (WebGLLayerRenderer) {
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
     * @type {module:ol/extent~Extent}
     */
    this.renderedExtent_ = createEmpty();

    /**
     * @private
     * @type {function(module:ol/Feature, module:ol/Feature): number|null}
     */
    this.renderedRenderOrder_ = null;

    /**
     * @private
     * @type {module:ol/render/webgl/ReplayGroup}
     */
    this.replayGroup_ = null;

    /**
     * The last layer state.
     * @private
     * @type {?module:ol/layer/Layer~State}
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
         * @param {module:ol/Feature|module:ol/render/Feature} feature Feature.
         * @return {?} Callback result.
         */
        function(feature) {
          var key = getUid(feature).toString();
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
   * @param {module:ol/events/Event} event Image style change event.
   * @private
   */
  WebGLVectorLayerRenderer.prototype.handleStyleImageChange_ = function handleStyleImageChange_ (event) {
    this.renderIfReadyAndVisible();
  };

  /**
   * @inheritDoc
   */
  WebGLVectorLayerRenderer.prototype.prepareFrame = function prepareFrame (frameState, layerState, context) {
    var vectorLayer = /** @type {module:ol/layer/Vector} */ (this.getLayer());
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
     * @param {module:ol/Feature} feature Feature.
     * @this {module:ol/renderer/webgl/VectorLayer}
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
    };
    if (vectorLayerRenderOrder) {
      /** @type {Array<module:ol/Feature>} */
      var features = [];
      vectorSource.forEachFeatureInExtent(extent,
        /**
         * @param {module:ol/Feature} feature Feature.
         */
        function(feature) {
          features.push(feature);
        }, this);
      features.sort(vectorLayerRenderOrder);
      features.forEach(render.bind(this));
    } else {
      vectorSource.forEachFeatureInExtent(extent, render, this);
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
   * @param {module:ol/Feature} feature Feature.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {module:ol/style/Style|Array<module:ol/style/Style>} styles The style or array of
   *     styles.
   * @param {module:ol/render/webgl/ReplayGroup} replayGroup Replay group.
   * @return {boolean} `true` if an image is loading.
   */
  WebGLVectorLayerRenderer.prototype.renderFeature = function renderFeature$1 (feature, resolution, pixelRatio, styles, replayGroup) {
    var this$1 = this;

    if (!styles) {
      return false;
    }
    var loading = false;
    if (Array.isArray(styles)) {
      for (var i = styles.length - 1, ii = 0; i >= ii; --i) {
        loading = renderFeature(
          replayGroup, feature, styles[i],
          getSquaredRenderTolerance(resolution, pixelRatio),
          this$1.handleStyleImageChange_, this$1) || loading;
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
 * @param {module:ol/layer/Layer} layer The candidate layer.
 * @return {boolean} The renderer can render the layer.
 */
WebGLVectorLayerRenderer['handles'] = function(layer) {
  return layer.getType() === LayerType.VECTOR;
};


/**
 * Create a layer renderer.
 * @param {module:ol/renderer/Map} mapRenderer The map renderer.
 * @param {module:ol/layer/Layer} layer The layer to be rendererd.
 * @return {module:ol/renderer/webgl/VectorLayer} The layer renderer.
 */
WebGLVectorLayerRenderer['create'] = function(mapRenderer, layer) {
  return new WebGLVectorLayerRenderer(
    /** @type {module:ol/renderer/webgl/Map} */ (mapRenderer),
    /** @type {module:ol/layer/Vector} */ (layer)
  );
};


export default WebGLVectorLayerRenderer;

//# sourceMappingURL=VectorLayer.js.map