/**
 * @module ol/source/Raster
 */
import {getUid} from '../util.js';
import ImageCanvas from '../ImageCanvas.js';
import TileQueue from '../TileQueue.js';
import {createCanvasContext2D} from '../dom.js';
import {listen} from '../events.js';
import Event from '../events/Event.js';
import EventType from '../events/EventType.js';
import {Processor} from 'pixelworks/lib/index';
import {equals, getCenter, getHeight, getWidth} from '../extent.js';
import LayerType from '../LayerType.js';
import ImageLayer from '../layer/Image.js';
import TileLayer from '../layer/Tile.js';
import {assign} from '../obj.js';
import CanvasImageLayerRenderer from '../renderer/canvas/ImageLayer.js';
import CanvasTileLayerRenderer from '../renderer/canvas/TileLayer.js';
import ImageSource from './Image.js';
import SourceState from './State.js';
import {create as createTransform} from '../transform.js';


/**
 * A function that takes an array of input data, performs some operation, and
 * returns an array of output data.
 * For `pixel` type operations, the function will be called with an array of
 * pixels, where each pixel is an array of four numbers (`[r, g, b, a]`) in the
 * range of 0 - 255. It should return a single pixel array.
 * For `'image'` type operations, functions will be called with an array of
 * {@link ImageData https://developer.mozilla.org/en-US/docs/Web/API/ImageData}
 * and should return a single {@link ImageData
 * https://developer.mozilla.org/en-US/docs/Web/API/ImageData}.  The operations
 * are called with a second "data" argument, which can be used for storage.  The
 * data object is accessible from raster events, where it can be initialized in
 * "beforeoperations" and accessed again in "afteroperations".
 *
 * @typedef {function((Array<Array<number>>|Array<ImageData>), Object):
 *     (Array<number>|ImageData)} Operation
 */


/**
 * @enum {string}
 */
var RasterEventType = {
  /**
   * Triggered before operations are run.
   * @event ol/source/Raster~RasterSourceEvent#beforeoperations
   * @api
   */
  BEFOREOPERATIONS: 'beforeoperations',

  /**
   * Triggered after operations are run.
   * @event ol/source/Raster~RasterSourceEvent#afteroperations
   * @api
   */
  AFTEROPERATIONS: 'afteroperations'
};


/**
 * Raster operation type. Supported values are `'pixel'` and `'image'`.
 * @enum {string}
 */
var RasterOperationType = {
  PIXEL: 'pixel',
  IMAGE: 'image'
};


/**
 * @classdesc
 * Events emitted by {@link module:ol/source/Raster} instances are instances of this
 * type.
 */
var RasterSourceEvent = /*@__PURE__*/(function (Event) {
  function RasterSourceEvent(type, frameState, data) {
    Event.call(this, type);

    /**
     * The raster extent.
     * @type {import("../extent.js").Extent}
     * @api
     */
    this.extent = frameState.extent;

    /**
     * The pixel resolution (map units per pixel).
     * @type {number}
     * @api
     */
    this.resolution = frameState.viewState.resolution / frameState.pixelRatio;

    /**
     * An object made available to all operations.  This can be used by operations
     * as a storage object (e.g. for calculating statistics).
     * @type {Object}
     * @api
     */
    this.data = data;

  }

  if ( Event ) RasterSourceEvent.__proto__ = Event;
  RasterSourceEvent.prototype = Object.create( Event && Event.prototype );
  RasterSourceEvent.prototype.constructor = RasterSourceEvent;

  return RasterSourceEvent;
}(Event));

/**
 * @typedef {Object} Options
 * @property {Array<import("./Source.js").default|import("../layer/Layer.js").default>} sources Input
 * sources or layers. Vector layers must be configured with `renderMode: 'image'`.
 * @property {Operation} [operation] Raster operation.
 * The operation will be called with data from input sources
 * and the output will be assigned to the raster source.
 * @property {Object} [lib] Functions that will be made available to operations run in a worker.
 * @property {number} [threads] By default, operations will be run in a single worker thread.
 * To avoid using workers altogether, set `threads: 0`.  For pixel operations, operations can
 * be run in multiple worker threads.  Note that there is additional overhead in
 * transferring data to multiple workers, and that depending on the user's
 * system, it may not be possible to parallelize the work.
 * @property {RasterOperationType} [operationType='pixel'] Operation type.
 * Supported values are `'pixel'` and `'image'`.  By default,
 * `'pixel'` operations are assumed, and operations will be called with an
 * array of pixels from input sources.  If set to `'image'`, operations will
 * be called with an array of ImageData objects from input sources.
 */


/**
 * @classdesc
 * A source that transforms data from any number of input sources using an
 * {@link module:ol/source/Raster~Operation} function to transform input pixel values into
 * output pixel values.
 *
 * @fires ol/source/Raster~RasterSourceEvent
 * @api
 */
var RasterSource = /*@__PURE__*/(function (ImageSource) {
  function RasterSource(options) {
    ImageSource.call(this, {
      projection: null
    });

    /**
     * @private
     * @type {*}
     */
    this.worker_ = null;

    /**
     * @private
     * @type {RasterOperationType}
     */
    this.operationType_ = options.operationType !== undefined ?
      options.operationType : RasterOperationType.PIXEL;

    /**
     * @private
     * @type {number}
     */
    this.threads_ = options.threads !== undefined ? options.threads : 1;

    /**
     * @private
     * @type {Array<import("../renderer/canvas/Layer.js").default>}
     */
    this.renderers_ = createRenderers(options.sources);

    for (var r = 0, rr = this.renderers_.length; r < rr; ++r) {
      listen(this.renderers_[r], EventType.CHANGE,
        this.changed, this);
    }

    /**
     * @private
     * @type {import("../TileQueue.js").default}
     */
    this.tileQueue_ = new TileQueue(
      function() {
        return 1;
      },
      this.changed.bind(this));

    var layerStatesArray = getLayerStatesArray(this.renderers_);

    /**
     * @type {Object<string, import("../layer/Layer.js").State>}
     */
    var layerStates = {};
    for (var i = 0, ii = layerStatesArray.length; i < ii; ++i) {
      layerStates[getUid(layerStatesArray[i].layer)] = layerStatesArray[i];
    }

    /**
     * The most recently requested frame state.
     * @type {import("../PluggableMap.js").FrameState}
     * @private
     */
    this.requestedFrameState_;

    /**
     * The most recently rendered image canvas.
     * @type {import("../ImageCanvas.js").default}
     * @private
     */
    this.renderedImageCanvas_ = null;

    /**
     * The most recently rendered revision.
     * @type {number}
     */
    this.renderedRevision_;

    /**
     * @private
     * @type {import("../PluggableMap.js").FrameState}
     */
    this.frameState_ = {
      animate: false,
      coordinateToPixelTransform: createTransform(),
      extent: null,
      focus: null,
      index: 0,
      layerStates: layerStates,
      layerStatesArray: layerStatesArray,
      pixelRatio: 1,
      pixelToCoordinateTransform: createTransform(),
      postRenderFunctions: [],
      size: [0, 0],
      skippedFeatureUids: {},
      tileQueue: this.tileQueue_,
      time: Date.now(),
      usedTiles: {},
      viewState: /** @type {import("../View.js").State} */ ({
        rotation: 0
      }),
      viewHints: [],
      wantedTiles: {}
    };

    if (options.operation !== undefined) {
      this.setOperation(options.operation, options.lib);
    }

  }

  if ( ImageSource ) RasterSource.__proto__ = ImageSource;
  RasterSource.prototype = Object.create( ImageSource && ImageSource.prototype );
  RasterSource.prototype.constructor = RasterSource;

  /**
   * Set the operation.
   * @param {Operation} operation New operation.
   * @param {Object=} opt_lib Functions that will be available to operations run
   *     in a worker.
   * @api
   */
  RasterSource.prototype.setOperation = function setOperation (operation, opt_lib) {
    this.worker_ = new Processor({
      operation: operation,
      imageOps: this.operationType_ === RasterOperationType.IMAGE,
      queue: 1,
      lib: opt_lib,
      threads: this.threads_
    });
    this.changed();
  };

  /**
   * Update the stored frame state.
   * @param {import("../extent.js").Extent} extent The view extent (in map units).
   * @param {number} resolution The view resolution.
   * @param {import("../proj/Projection.js").default} projection The view projection.
   * @return {import("../PluggableMap.js").FrameState} The updated frame state.
   * @private
   */
  RasterSource.prototype.updateFrameState_ = function updateFrameState_ (extent, resolution, projection) {

    var frameState = /** @type {import("../PluggableMap.js").FrameState} */ (assign({}, this.frameState_));

    frameState.viewState = /** @type {import("../View.js").State} */ (assign({}, frameState.viewState));

    var center = getCenter(extent);

    frameState.extent = extent.slice();
    frameState.focus = center;
    frameState.size[0] = Math.round(getWidth(extent) / resolution);
    frameState.size[1] = Math.round(getHeight(extent) / resolution);
    frameState.time = Date.now();
    frameState.animate = false;

    var viewState = frameState.viewState;
    viewState.center = center;
    viewState.projection = projection;
    viewState.resolution = resolution;
    return frameState;
  };

  /**
   * Determine if all sources are ready.
   * @return {boolean} All sources are ready.
   * @private
   */
  RasterSource.prototype.allSourcesReady_ = function allSourcesReady_ () {
    var ready = true;
    var source;
    for (var i = 0, ii = this.renderers_.length; i < ii; ++i) {
      source = this.renderers_[i].getLayer().getSource();
      if (source.getState() !== SourceState.READY) {
        ready = false;
        break;
      }
    }
    return ready;
  };

  /**
   * @inheritDoc
   */
  RasterSource.prototype.getImage = function getImage (extent, resolution, pixelRatio, projection) {
    if (!this.allSourcesReady_()) {
      return null;
    }

    var frameState = this.updateFrameState_(extent, resolution, projection);
    this.requestedFrameState_ = frameState;

    // check if we can't reuse the existing ol/ImageCanvas
    if (this.renderedImageCanvas_) {
      var renderedResolution = this.renderedImageCanvas_.getResolution();
      var renderedExtent = this.renderedImageCanvas_.getExtent();
      if (resolution !== renderedResolution || !equals(extent, renderedExtent)) {
        this.renderedImageCanvas_ = null;
      }
    }

    if (!this.renderedImageCanvas_ || this.getRevision() !== this.renderedRevision_) {
      this.processSources_();
    }

    frameState.tileQueue.loadMoreTiles(16, 16);

    if (frameState.animate) {
      requestAnimationFrame(this.changed.bind(this));
    }

    return this.renderedImageCanvas_;
  };

  /**
   * Start processing source data.
   * @private
   */
  RasterSource.prototype.processSources_ = function processSources_ () {
    var frameState = this.requestedFrameState_;
    var len = this.renderers_.length;
    var imageDatas = new Array(len);
    for (var i = 0; i < len; ++i) {
      var imageData = getImageData(
        this.renderers_[i], frameState, frameState.layerStatesArray[i]);
      if (imageData) {
        imageDatas[i] = imageData;
      } else {
        return;
      }
    }

    var data = {};
    this.dispatchEvent(new RasterSourceEvent(RasterEventType.BEFOREOPERATIONS, frameState, data));
    this.worker_.process(imageDatas, data, this.onWorkerComplete_.bind(this, frameState));
  };

  /**
   * Called when pixel processing is complete.
   * @param {import("../PluggableMap.js").FrameState} frameState The frame state.
   * @param {Error} err Any error during processing.
   * @param {ImageData} output The output image data.
   * @param {Object} data The user data.
   * @private
   */
  RasterSource.prototype.onWorkerComplete_ = function onWorkerComplete_ (frameState, err, output, data) {
    if (err || !output) {
      return;
    }

    // do nothing if extent or resolution changed
    var extent = frameState.extent;
    var resolution = frameState.viewState.resolution;
    if (resolution !== this.requestedFrameState_.viewState.resolution ||
        !equals(extent, this.requestedFrameState_.extent)) {
      return;
    }

    var context;
    if (this.renderedImageCanvas_) {
      context = this.renderedImageCanvas_.getImage().getContext('2d');
    } else {
      var width = Math.round(getWidth(extent) / resolution);
      var height = Math.round(getHeight(extent) / resolution);
      context = createCanvasContext2D(width, height);
      this.renderedImageCanvas_ = new ImageCanvas(extent, resolution, 1, context.canvas);
    }
    context.putImageData(output, 0, 0);

    this.changed();
    this.renderedRevision_ = this.getRevision();

    this.dispatchEvent(new RasterSourceEvent(RasterEventType.AFTEROPERATIONS, frameState, data));
  };

  /**
   * @override
   */
  RasterSource.prototype.getImageInternal = function getImageInternal () {
    return null; // not implemented
  };

  return RasterSource;
}(ImageSource));


/**
 * A reusable canvas context.
 * @type {CanvasRenderingContext2D}
 * @private
 */
var sharedContext = null;


/**
 * Get image data from a renderer.
 * @param {import("../renderer/canvas/Layer.js").default} renderer Layer renderer.
 * @param {import("../PluggableMap.js").FrameState} frameState The frame state.
 * @param {import("../layer/Layer.js").State} layerState The layer state.
 * @return {ImageData} The image data.
 */
function getImageData(renderer, frameState, layerState) {
  if (!renderer.prepareFrame(frameState, layerState)) {
    return null;
  }
  var width = frameState.size[0];
  var height = frameState.size[1];
  if (!sharedContext) {
    sharedContext = createCanvasContext2D(width, height);
  } else {
    var canvas = sharedContext.canvas;
    if (canvas.width !== width || canvas.height !== height) {
      sharedContext = createCanvasContext2D(width, height);
    } else {
      sharedContext.clearRect(0, 0, width, height);
    }
  }
  renderer.composeFrame(frameState, layerState, sharedContext);
  return sharedContext.getImageData(0, 0, width, height);
}


/**
 * Get a list of layer states from a list of renderers.
 * @param {Array<import("../renderer/canvas/Layer.js").default>} renderers Layer renderers.
 * @return {Array<import("../layer/Layer.js").State>} The layer states.
 */
function getLayerStatesArray(renderers) {
  return renderers.map(function(renderer) {
    return renderer.getLayer().getLayerState();
  });
}


/**
 * Create renderers for all sources.
 * @param {Array<import("./Source.js").default|import("../layer/Layer.js").default>} sources The sources.
 * @return {Array<import("../renderer/canvas/Layer.js").default>} Array of layer renderers.
 */
function createRenderers(sources) {
  var len = sources.length;
  var renderers = new Array(len);
  for (var i = 0; i < len; ++i) {
    renderers[i] = createRenderer(sources[i]);
  }
  return renderers;
}


/**
 * Create a renderer for the provided source.
 * @param {import("./Source.js").default|import("../layer/Layer.js").default} layerOrSource The layer or source.
 * @return {import("../renderer/canvas/Layer.js").default} The renderer.
 */
function createRenderer(layerOrSource) {
  var tileSource = /** @type {import("./Tile.js").default} */ (layerOrSource);
  var imageSource = /** @type {import("./Image.js").default} */ (layerOrSource);
  var layer = /** @type {import("../layer/Layer.js").default} */ (layerOrSource);
  var renderer = null;
  if (typeof tileSource.getTile === 'function') {
    renderer = createTileRenderer(tileSource);
  } else if (typeof imageSource.getImage === 'function') {
    renderer = createImageRenderer(imageSource);
  } else if (layer.getType() === LayerType.TILE) {
    renderer = new CanvasTileLayerRenderer(/** @type {import("../layer/Tile.js").default} */ (layer));
  } else if (layer.getType() == LayerType.IMAGE || layer.getType() == LayerType.VECTOR) {
    renderer = new CanvasImageLayerRenderer(/** @type {import("../layer/Image.js").default} */ (layer));
  }
  return renderer;
}


/**
 * Create an image renderer for the provided source.
 * @param {import("./Image.js").default} source The source.
 * @return {import("../renderer/canvas/Layer.js").default} The renderer.
 */
function createImageRenderer(source) {
  var layer = new ImageLayer({source: source});
  return new CanvasImageLayerRenderer(layer);
}


/**
 * Create a tile renderer for the provided source.
 * @param {import("./Tile.js").default} source The source.
 * @return {import("../renderer/canvas/Layer.js").default} The renderer.
 */
function createTileRenderer(source) {
  var layer = new TileLayer({source: source});
  return new CanvasTileLayerRenderer(layer);
}


export default RasterSource;

//# sourceMappingURL=Raster.js.map