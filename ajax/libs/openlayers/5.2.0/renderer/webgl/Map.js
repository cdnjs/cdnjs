/**
 * @module ol/renderer/webgl/Map
 */

import {stableSort} from '../../array.js';
import {CLASS_UNSELECTABLE} from '../../css.js';
import {createCanvasContext2D} from '../../dom.js';
import {listen} from '../../events.js';
import {visibleAtResolution} from '../../layer/Layer.js';
import RenderEvent from '../../render/Event.js';
import RenderEventType from '../../render/EventType.js';
import WebGLImmediateRenderer from '../../render/webgl/Immediate.js';
import MapRenderer, {sortByZIndex} from '../Map.js';
import SourceState from '../../source/State.js';
import LRUCache from '../../structs/LRUCache.js';
import PriorityQueue from '../../structs/PriorityQueue.js';
import {BLEND, CLAMP_TO_EDGE, COLOR_BUFFER_BIT, CULL_FACE, DEPTH_TEST, FRAMEBUFFER,
  getContext, LINEAR, ONE, ONE_MINUS_SRC_ALPHA, RGBA, SCISSOR_TEST, SRC_ALPHA,
  STENCIL_TEST, TEXTURE0, TEXTURE_2D, TEXTURE_MAG_FILTER, TEXTURE_MIN_FILTER,
  TEXTURE_WRAP_S, TEXTURE_WRAP_T, UNSIGNED_BYTE} from '../../webgl.js';
import WebGLContext from '../../webgl/Context.js';
import ContextEventType from '../../webgl/ContextEventType.js';


/**
 * @typedef {Object} TextureCacheEntry
 * @property {number} magFilter
 * @property {number} minFilter
 * @property {WebGLTexture} texture
 */


/**
 * Texture cache high water mark.
 * @type {number}
 */
var WEBGL_TEXTURE_CACHE_HIGH_WATER_MARK = 1024;


/**
 * @classdesc
 * WebGL map renderer.
 * @api
 */
var WebGLMapRenderer = (function (MapRenderer) {
  function WebGLMapRenderer(map) {
    MapRenderer.call(this, map);

    var container = map.getViewport();

    /**
     * @private
     * @type {HTMLCanvasElement}
     */
    this.canvas_ = /** @type {HTMLCanvasElement} */
      (document.createElement('canvas'));
    this.canvas_.style.width = '100%';
    this.canvas_.style.height = '100%';
    this.canvas_.style.display = 'block';
    this.canvas_.className = CLASS_UNSELECTABLE;
    container.insertBefore(this.canvas_, container.childNodes[0] || null);

    /**
     * @private
     * @type {number}
     */
    this.clipTileCanvasWidth_ = 0;

    /**
     * @private
     * @type {number}
     */
    this.clipTileCanvasHeight_ = 0;

    /**
     * @private
     * @type {CanvasRenderingContext2D}
     */
    this.clipTileContext_ = createCanvasContext2D();

    /**
     * @private
     * @type {boolean}
     */
    this.renderedVisible_ = true;

    /**
     * @private
     * @type {WebGLRenderingContext}
     */
    this.gl_ = getContext(this.canvas_, {
      antialias: true,
      depth: true,
      failIfMajorPerformanceCaveat: true,
      preserveDrawingBuffer: false,
      stencil: true
    });

    /**
     * @private
     * @type {module:ol/webgl/Context}
     */
    this.context_ = new WebGLContext(this.canvas_, this.gl_);

    listen(this.canvas_, ContextEventType.LOST,
      this.handleWebGLContextLost, this);
    listen(this.canvas_, ContextEventType.RESTORED,
      this.handleWebGLContextRestored, this);

    /**
     * @private
     * @type {module:ol/structs/LRUCache<module:ol/renderer/webgl/Map~TextureCacheEntry|null>}
     */
    this.textureCache_ = new LRUCache();

    /**
     * @private
     * @type {module:ol/coordinate~Coordinate}
     */
    this.focus_ = null;

    /**
     * @private
     * @type {module:ol/structs/PriorityQueue<Array>}
     */
    this.tileTextureQueue_ = new PriorityQueue(
      /**
       * @param {Array<*>} element Element.
       * @return {number} Priority.
       * @this {module:ol/renderer/webgl/Map}
       */
      (function(element) {
        var tileCenter = /** @type {module:ol/coordinate~Coordinate} */ (element[1]);
        var tileResolution = /** @type {number} */ (element[2]);
        var deltaX = tileCenter[0] - this.focus_[0];
        var deltaY = tileCenter[1] - this.focus_[1];
        return 65536 * Math.log(tileResolution) +
              Math.sqrt(deltaX * deltaX + deltaY * deltaY) / tileResolution;
      }).bind(this),
      /**
       * @param {Array<*>} element Element.
       * @return {string} Key.
       */
      function(element) {
        return (
          /** @type {module:ol/Tile} */ (element[0]).getKey()
        );
      });


    /**
     * @param {module:ol/PluggableMap} map Map.
     * @param {?module:ol/PluggableMap~FrameState} frameState Frame state.
     * @return {boolean} false.
     * @this {module:ol/renderer/webgl/Map}
     */
    this.loadNextTileTexture_ =
        function(map, frameState) {
          if (!this.tileTextureQueue_.isEmpty()) {
            this.tileTextureQueue_.reprioritize();
            var element = this.tileTextureQueue_.dequeue();
            var tile = /** @type {module:ol/Tile} */ (element[0]);
            var tileSize = /** @type {module:ol/size~Size} */ (element[3]);
            var tileGutter = /** @type {number} */ (element[4]);
            this.bindTileTexture(
              tile, tileSize, tileGutter, LINEAR, LINEAR);
          }
          return false;
        }.bind(this);


    /**
     * @private
     * @type {number}
     */
    this.textureCacheFrameMarkerCount_ = 0;

    this.initializeGL_();
  }

  if ( MapRenderer ) WebGLMapRenderer.__proto__ = MapRenderer;
  WebGLMapRenderer.prototype = Object.create( MapRenderer && MapRenderer.prototype );
  WebGLMapRenderer.prototype.constructor = WebGLMapRenderer;

  /**
   * @param {module:ol/Tile} tile Tile.
   * @param {module:ol/size~Size} tileSize Tile size.
   * @param {number} tileGutter Tile gutter.
   * @param {number} magFilter Mag filter.
   * @param {number} minFilter Min filter.
   */
  WebGLMapRenderer.prototype.bindTileTexture = function bindTileTexture (tile, tileSize, tileGutter, magFilter, minFilter) {
    var gl = this.getGL();
    var tileKey = tile.getKey();
    if (this.textureCache_.containsKey(tileKey)) {
      var textureCacheEntry = this.textureCache_.get(tileKey);
      gl.bindTexture(TEXTURE_2D, textureCacheEntry.texture);
      if (textureCacheEntry.magFilter != magFilter) {
        gl.texParameteri(
          TEXTURE_2D, TEXTURE_MAG_FILTER, magFilter);
        textureCacheEntry.magFilter = magFilter;
      }
      if (textureCacheEntry.minFilter != minFilter) {
        gl.texParameteri(
          TEXTURE_2D, TEXTURE_MIN_FILTER, minFilter);
        textureCacheEntry.minFilter = minFilter;
      }
    } else {
      var texture = gl.createTexture();
      gl.bindTexture(TEXTURE_2D, texture);
      if (tileGutter > 0) {
        var clipTileCanvas = this.clipTileContext_.canvas;
        var clipTileContext = this.clipTileContext_;
        if (this.clipTileCanvasWidth_ !== tileSize[0] ||
            this.clipTileCanvasHeight_ !== tileSize[1]) {
          clipTileCanvas.width = tileSize[0];
          clipTileCanvas.height = tileSize[1];
          this.clipTileCanvasWidth_ = tileSize[0];
          this.clipTileCanvasHeight_ = tileSize[1];
        } else {
          clipTileContext.clearRect(0, 0, tileSize[0], tileSize[1]);
        }
        clipTileContext.drawImage(tile.getImage(), tileGutter, tileGutter,
          tileSize[0], tileSize[1], 0, 0, tileSize[0], tileSize[1]);
        gl.texImage2D(TEXTURE_2D, 0,
          RGBA, RGBA,
          UNSIGNED_BYTE, clipTileCanvas);
      } else {
        gl.texImage2D(TEXTURE_2D, 0,
          RGBA, RGBA,
          UNSIGNED_BYTE, tile.getImage());
      }
      gl.texParameteri(
        TEXTURE_2D, TEXTURE_MAG_FILTER, magFilter);
      gl.texParameteri(
        TEXTURE_2D, TEXTURE_MIN_FILTER, minFilter);
      gl.texParameteri(TEXTURE_2D, TEXTURE_WRAP_S,
        CLAMP_TO_EDGE);
      gl.texParameteri(TEXTURE_2D, TEXTURE_WRAP_T,
        CLAMP_TO_EDGE);
      this.textureCache_.set(tileKey, {
        texture: texture,
        magFilter: magFilter,
        minFilter: minFilter
      });
    }
  };

  /**
   * @param {module:ol/render/EventType} type Event type.
   * @param {module:ol/PluggableMap~FrameState} frameState Frame state.
   */
  WebGLMapRenderer.prototype.dispatchRenderEvent = function dispatchRenderEvent (type, frameState) {
    var map = this.getMap();
    if (map.hasListener(type)) {
      var context = this.context_;

      var extent = frameState.extent;
      var size = frameState.size;
      var viewState = frameState.viewState;
      var pixelRatio = frameState.pixelRatio;

      var resolution = viewState.resolution;
      var center = viewState.center;
      var rotation = viewState.rotation;

      var vectorContext = new WebGLImmediateRenderer(context,
        center, resolution, rotation, size, extent, pixelRatio);
      var composeEvent = new RenderEvent(type, vectorContext,
        frameState, null, context);
      map.dispatchEvent(composeEvent);
    }
  };

  /**
   * @inheritDoc
   */
  WebGLMapRenderer.prototype.disposeInternal = function disposeInternal () {
    var gl = this.getGL();
    if (!gl.isContextLost()) {
      this.textureCache_.forEach(
        /**
         * @param {?module:ol/renderer/webgl/Map~TextureCacheEntry} textureCacheEntry
         *     Texture cache entry.
         */
        function(textureCacheEntry) {
          if (textureCacheEntry) {
            gl.deleteTexture(textureCacheEntry.texture);
          }
        });
    }
    this.context_.dispose();
    MapRenderer.prototype.disposeInternal.call(this);
  };

  /**
   * @param {module:ol/PluggableMap} map Map.
   * @param {module:ol/PluggableMap~FrameState} frameState Frame state.
   * @private
   */
  WebGLMapRenderer.prototype.expireCache_ = function expireCache_ (map, frameState) {
    var this$1 = this;

    var gl = this.getGL();
    var textureCacheEntry;
    while (this.textureCache_.getCount() - this.textureCacheFrameMarkerCount_ >
        WEBGL_TEXTURE_CACHE_HIGH_WATER_MARK) {
      textureCacheEntry = this$1.textureCache_.peekLast();
      if (!textureCacheEntry) {
        if (+this$1.textureCache_.peekLastKey() == frameState.index) {
          break;
        } else {
          --this$1.textureCacheFrameMarkerCount_;
        }
      } else {
        gl.deleteTexture(textureCacheEntry.texture);
      }
      this$1.textureCache_.pop();
    }
  };

  /**
   * @return {module:ol/webgl/Context} The context.
   */
  WebGLMapRenderer.prototype.getContext = function getContext () {
    return this.context_;
  };

  /**
   * @return {WebGLRenderingContext} GL.
   */
  WebGLMapRenderer.prototype.getGL = function getGL () {
    return this.gl_;
  };

  /**
   * @return {module:ol/structs/PriorityQueue<Array>} Tile texture queue.
   */
  WebGLMapRenderer.prototype.getTileTextureQueue = function getTileTextureQueue () {
    return this.tileTextureQueue_;
  };

  /**
   * @param {module:ol/events/Event} event Event.
   * @protected
   */
  WebGLMapRenderer.prototype.handleWebGLContextLost = function handleWebGLContextLost (event) {
    event.preventDefault();
    this.textureCache_.clear();
    this.textureCacheFrameMarkerCount_ = 0;

    var renderers = this.getLayerRenderers();
    for (var id in renderers) {
      var renderer = /** @type {module:ol/renderer/webgl/Layer} */ (renderers[id]);
      renderer.handleWebGLContextLost();
    }
  };

  /**
   * @protected
   */
  WebGLMapRenderer.prototype.handleWebGLContextRestored = function handleWebGLContextRestored () {
    this.initializeGL_();
    this.getMap().render();
  };

  /**
   * @private
   */
  WebGLMapRenderer.prototype.initializeGL_ = function initializeGL_ () {
    var gl = this.gl_;
    gl.activeTexture(TEXTURE0);
    gl.blendFuncSeparate(
      SRC_ALPHA, ONE_MINUS_SRC_ALPHA,
      ONE, ONE_MINUS_SRC_ALPHA);
    gl.disable(CULL_FACE);
    gl.disable(DEPTH_TEST);
    gl.disable(SCISSOR_TEST);
    gl.disable(STENCIL_TEST);
  };

  /**
   * @param {module:ol/Tile} tile Tile.
   * @return {boolean} Is tile texture loaded.
   */
  WebGLMapRenderer.prototype.isTileTextureLoaded = function isTileTextureLoaded (tile) {
    return this.textureCache_.containsKey(tile.getKey());
  };

  /**
   * @inheritDoc
   */
  WebGLMapRenderer.prototype.renderFrame = function renderFrame (frameState) {
    var this$1 = this;


    var context = this.getContext();
    var gl = this.getGL();

    if (gl.isContextLost()) {
      return false;
    }

    if (!frameState) {
      if (this.renderedVisible_) {
        this.canvas_.style.display = 'none';
        this.renderedVisible_ = false;
      }
      return false;
    }

    this.focus_ = frameState.focus;

    this.textureCache_.set((-frameState.index).toString(), null);
    ++this.textureCacheFrameMarkerCount_;

    this.dispatchRenderEvent(RenderEventType.PRECOMPOSE, frameState);

    /** @type {Array<module:ol/layer/Layer~State>} */
    var layerStatesToDraw = [];
    var layerStatesArray = frameState.layerStatesArray;
    stableSort(layerStatesArray, sortByZIndex);

    var viewResolution = frameState.viewState.resolution;
    var i, ii, layerRenderer, layerState;
    for (i = 0, ii = layerStatesArray.length; i < ii; ++i) {
      layerState = layerStatesArray[i];
      if (visibleAtResolution(layerState, viewResolution) &&
          layerState.sourceState == SourceState.READY) {
        layerRenderer = /** @type {module:ol/renderer/webgl/Layer} */ (this$1.getLayerRenderer(layerState.layer));
        if (layerRenderer.prepareFrame(frameState, layerState, context)) {
          layerStatesToDraw.push(layerState);
        }
      }
    }

    var width = frameState.size[0] * frameState.pixelRatio;
    var height = frameState.size[1] * frameState.pixelRatio;
    if (this.canvas_.width != width || this.canvas_.height != height) {
      this.canvas_.width = width;
      this.canvas_.height = height;
    }

    gl.bindFramebuffer(FRAMEBUFFER, null);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(COLOR_BUFFER_BIT);
    gl.enable(BLEND);
    gl.viewport(0, 0, this.canvas_.width, this.canvas_.height);

    for (i = 0, ii = layerStatesToDraw.length; i < ii; ++i) {
      layerState = layerStatesToDraw[i];
      layerRenderer = /** @type {module:ol/renderer/webgl/Layer} */ (this$1.getLayerRenderer(layerState.layer));
      layerRenderer.composeFrame(frameState, layerState, context);
    }

    if (!this.renderedVisible_) {
      this.canvas_.style.display = '';
      this.renderedVisible_ = true;
    }

    this.calculateMatrices2D(frameState);

    if (this.textureCache_.getCount() - this.textureCacheFrameMarkerCount_ >
        WEBGL_TEXTURE_CACHE_HIGH_WATER_MARK) {
      frameState.postRenderFunctions.push(
        /** @type {module:ol/PluggableMap~PostRenderFunction} */ (this.expireCache_.bind(this))
      );
    }

    if (!this.tileTextureQueue_.isEmpty()) {
      frameState.postRenderFunctions.push(this.loadNextTileTexture_);
      frameState.animate = true;
    }

    this.dispatchRenderEvent(RenderEventType.POSTCOMPOSE, frameState);

    this.scheduleRemoveUnusedLayerRenderers(frameState);
    this.scheduleExpireIconCache(frameState);

  };

  /**
   * @inheritDoc
   */
  WebGLMapRenderer.prototype.forEachFeatureAtCoordinate = function forEachFeatureAtCoordinate (
    coordinate,
    frameState,
    hitTolerance,
    callback,
    thisArg,
    layerFilter,
    thisArg2
  ) {
    var this$1 = this;

    var result;

    if (this.getGL().isContextLost()) {
      return false;
    }

    var viewState = frameState.viewState;

    var layerStates = frameState.layerStatesArray;
    var numLayers = layerStates.length;
    var i;
    for (i = numLayers - 1; i >= 0; --i) {
      var layerState = layerStates[i];
      var layer = layerState.layer;
      if (visibleAtResolution(layerState, viewState.resolution) &&
          layerFilter.call(thisArg2, layer)) {
        var layerRenderer = this$1.getLayerRenderer(layer);
        result = layerRenderer.forEachFeatureAtCoordinate(
          coordinate, frameState, hitTolerance, callback, thisArg);
        if (result) {
          return result;
        }
      }
    }
    return undefined;
  };

  /**
   * @inheritDoc
   */
  WebGLMapRenderer.prototype.hasFeatureAtCoordinate = function hasFeatureAtCoordinate (coordinate, frameState, hitTolerance, layerFilter, thisArg) {
    var this$1 = this;

    var hasFeature = false;

    if (this.getGL().isContextLost()) {
      return false;
    }

    var viewState = frameState.viewState;

    var layerStates = frameState.layerStatesArray;
    var numLayers = layerStates.length;
    var i;
    for (i = numLayers - 1; i >= 0; --i) {
      var layerState = layerStates[i];
      var layer = layerState.layer;
      if (visibleAtResolution(layerState, viewState.resolution) &&
          layerFilter.call(thisArg, layer)) {
        var layerRenderer = this$1.getLayerRenderer(layer);
        hasFeature =
            layerRenderer.hasFeatureAtCoordinate(coordinate, frameState);
        if (hasFeature) {
          return true;
        }
      }
    }
    return hasFeature;
  };

  /**
   * @inheritDoc
   */
  WebGLMapRenderer.prototype.forEachLayerAtPixel = function forEachLayerAtPixel (pixel, frameState, hitTolerance, callback, thisArg, layerFilter, thisArg2) {
    var this$1 = this;

    if (this.getGL().isContextLost()) {
      return false;
    }

    var viewState = frameState.viewState;
    var result;

    var layerStates = frameState.layerStatesArray;
    var numLayers = layerStates.length;
    var i;
    for (i = numLayers - 1; i >= 0; --i) {
      var layerState = layerStates[i];
      var layer = layerState.layer;
      if (visibleAtResolution(layerState, viewState.resolution) &&
          layerFilter.call(thisArg, layer)) {
        var layerRenderer = /** @type {module:ol/renderer/webgl/Layer} */ (this$1.getLayerRenderer(layer));
        result = layerRenderer.forEachLayerAtPixel(
          pixel, frameState, callback, thisArg);
        if (result) {
          return result;
        }
      }
    }
    return undefined;
  };

  return WebGLMapRenderer;
}(MapRenderer));


export default WebGLMapRenderer;

//# sourceMappingURL=Map.js.map