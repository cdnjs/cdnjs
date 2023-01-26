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
 * @module ol/source/Raster
 */
import Disposable from '../Disposable.js';
import Event from '../events/Event.js';
import EventType from '../events/EventType.js';
import ImageCanvas from '../ImageCanvas.js';
import ImageLayer from '../layer/Image.js';
import ImageSource from './Image.js';
import Source from './Source.js';
import SourceState from './State.js';
import TileLayer from '../layer/Tile.js';
import TileQueue from '../TileQueue.js';
import TileSource from './Tile.js';
import { assign } from '../obj.js';
import { createCanvasContext2D } from '../dom.js';
import { create as createTransform } from '../transform.js';
import { equals, getCenter, getHeight, getWidth } from '../extent.js';
import { getUid } from '../util.js';
var hasImageData = true;
try {
    new ImageData(10, 10);
}
catch (_) {
    hasImageData = false;
}
/** @type {CanvasRenderingContext2D} */
var context;
/**
 * @param {Uint8ClampedArray} data Image data.
 * @param {number} width Number of columns.
 * @param {number} height Number of rows.
 * @return {ImageData} Image data.
 */
export function newImageData(data, width, height) {
    if (hasImageData) {
        return new ImageData(data, width, height);
    }
    if (!context) {
        context = document.createElement('canvas').getContext('2d');
    }
    var imageData = context.createImageData(width, height);
    imageData.data.set(data);
    return imageData;
}
/**
 * @typedef {Object} MinionData
 * @property {Array<ArrayBuffer>} buffers Array of buffers.
 * @property {Object} meta Operation metadata.
 * @property {boolean} imageOps The operation is an image operation.
 * @property {number} width The width of the image.
 * @property {number} height The height of the image.
 */
/* istanbul ignore next */
/**
 * Create a function for running operations.  This function is serialized for
 * use in a worker.
 * @param {function(Array, Object):*} operation The operation.
 * @return {function(MinionData):ArrayBuffer} A function that takes an object with
 * buffers, meta, imageOps, width, and height properties and returns an array
 * buffer.
 */
function createMinion(operation) {
    var workerHasImageData = true;
    try {
        new ImageData(10, 10);
    }
    catch (_) {
        workerHasImageData = false;
    }
    function newWorkerImageData(data, width, height) {
        if (workerHasImageData) {
            return new ImageData(data, width, height);
        }
        else {
            return { data: data, width: width, height: height };
        }
    }
    return function (data) {
        // bracket notation for minification support
        var buffers = data['buffers'];
        var meta = data['meta'];
        var imageOps = data['imageOps'];
        var width = data['width'];
        var height = data['height'];
        var numBuffers = buffers.length;
        var numBytes = buffers[0].byteLength;
        if (imageOps) {
            var images = new Array(numBuffers);
            for (var b = 0; b < numBuffers; ++b) {
                images[b] = newWorkerImageData(new Uint8ClampedArray(buffers[b]), width, height);
            }
            var output_1 = operation(images, meta).data;
            return output_1.buffer;
        }
        var output = new Uint8ClampedArray(numBytes);
        var arrays = new Array(numBuffers);
        var pixels = new Array(numBuffers);
        for (var b = 0; b < numBuffers; ++b) {
            arrays[b] = new Uint8ClampedArray(buffers[b]);
            pixels[b] = [0, 0, 0, 0];
        }
        for (var i = 0; i < numBytes; i += 4) {
            for (var j = 0; j < numBuffers; ++j) {
                var array = arrays[j];
                pixels[j][0] = array[i];
                pixels[j][1] = array[i + 1];
                pixels[j][2] = array[i + 2];
                pixels[j][3] = array[i + 3];
            }
            var pixel = operation(pixels, meta);
            output[i] = pixel[0];
            output[i + 1] = pixel[1];
            output[i + 2] = pixel[2];
            output[i + 3] = pixel[3];
        }
        return output.buffer;
    };
}
/**
 * Create a worker for running operations.
 * @param {ProcessorOptions} config Processor options.
 * @param {function(MessageEvent): void} onMessage Called with a message event.
 * @return {Worker} The worker.
 */
function createWorker(config, onMessage) {
    var lib = Object.keys(config.lib || {}).map(function (name) {
        return 'var ' + name + ' = ' + config.lib[name].toString() + ';';
    });
    var lines = lib.concat([
        'var __minion__ = (' + createMinion.toString() + ')(',
        config.operation.toString(),
        ');',
        'self.addEventListener("message", function(event) {',
        '  var buffer = __minion__(event.data);',
        '  self.postMessage({buffer: buffer, meta: event.data.meta}, [buffer]);',
        '});',
    ]);
    var worker = new Worker(typeof Blob === 'undefined'
        ? 'data:text/javascript;base64,' +
            Buffer.from(lines.join('\n'), 'binary').toString('base64')
        : URL.createObjectURL(new Blob(lines, { type: 'text/javascript' })));
    worker.addEventListener('message', onMessage);
    return worker;
}
/**
 * @typedef {Object} FauxMessageEvent
 * @property {Object} data Message data.
 */
/**
 * Create a faux worker for running operations.
 * @param {ProcessorOptions} config Configuration.
 * @param {function(FauxMessageEvent): void} onMessage Called with a message event.
 * @return {Object} The faux worker.
 */
function createFauxWorker(config, onMessage) {
    var minion = createMinion(config.operation);
    var terminated = false;
    return {
        postMessage: function (data) {
            setTimeout(function () {
                if (terminated) {
                    return;
                }
                onMessage({ data: { buffer: minion(data), meta: data['meta'] } });
            }, 0);
        },
        terminate: function () {
            terminated = true;
        },
    };
}
/**
 * @typedef {function(Error, ImageData, (Object|Array<Object>)): void} JobCallback
 */
/**
 * @typedef {Object} Job
 * @property {Object} meta Job metadata.
 * @property {Array<ImageData>} inputs Array of input data.
 * @property {JobCallback} callback Called when the job is complete.
 */
/**
 * @typedef {Object} ProcessorOptions
 * @property {number} threads Number of workers to spawn.
 * @property {Operation} operation The operation.
 * @property {Object<string, Function>} [lib] Functions that will be made available to operations run in a worker.
 * @property {number} queue The number of queued jobs to allow.
 * @property {boolean} [imageOps=false] Pass all the image data to the operation instead of a single pixel.
 */
/**
 * @classdesc
 * A processor runs pixel or image operations in workers.
 */
var Processor = /** @class */ (function (_super) {
    __extends(Processor, _super);
    /**
     * @param {ProcessorOptions} config Configuration.
     */
    function Processor(config) {
        var _this = _super.call(this) || this;
        _this._imageOps = !!config.imageOps;
        var threads;
        if (config.threads === 0) {
            threads = 0;
        }
        else if (_this._imageOps) {
            threads = 1;
        }
        else {
            threads = config.threads || 1;
        }
        /**
         * @type {Array<Worker>}
         */
        var workers = new Array(threads);
        if (threads) {
            for (var i = 0; i < threads; ++i) {
                workers[i] = createWorker(config, _this._onWorkerMessage.bind(_this, i));
            }
        }
        else {
            workers[0] = createFauxWorker(config, _this._onWorkerMessage.bind(_this, 0));
        }
        _this._workers = workers;
        /**
         * @type {Array<Job>}
         * @private
         */
        _this._queue = [];
        _this._maxQueueLength = config.queue || Infinity;
        _this._running = 0;
        /**
         * @type {Object<number, any>}
         * @private
         */
        _this._dataLookup = {};
        /**
         * @type {Job}
         * @private
         */
        _this._job = null;
        return _this;
    }
    /**
     * Run operation on input data.
     * @param {Array<ImageData>} inputs Array of image data.
     * @param {Object} meta A user data object.  This is passed to all operations
     *     and must be serializable.
     * @param {function(Error, ImageData, Object): void} callback Called when work
     *     completes.  The first argument is any error.  The second is the ImageData
     *     generated by operations.  The third is the user data object.
     */
    Processor.prototype.process = function (inputs, meta, callback) {
        this._enqueue({
            inputs: inputs,
            meta: meta,
            callback: callback,
        });
        this._dispatch();
    };
    /**
     * Add a job to the queue.
     * @param {Job} job The job.
     */
    Processor.prototype._enqueue = function (job) {
        this._queue.push(job);
        while (this._queue.length > this._maxQueueLength) {
            this._queue.shift().callback(null, null);
        }
    };
    /**
     * Dispatch a job.
     */
    Processor.prototype._dispatch = function () {
        if (this._running || this._queue.length === 0) {
            return;
        }
        var job = this._queue.shift();
        this._job = job;
        var width = job.inputs[0].width;
        var height = job.inputs[0].height;
        var buffers = job.inputs.map(function (input) {
            return input.data.buffer;
        });
        var threads = this._workers.length;
        this._running = threads;
        if (threads === 1) {
            this._workers[0].postMessage({
                buffers: buffers,
                meta: job.meta,
                imageOps: this._imageOps,
                width: width,
                height: height,
            }, buffers);
            return;
        }
        var length = job.inputs[0].data.length;
        var segmentLength = 4 * Math.ceil(length / 4 / threads);
        for (var i = 0; i < threads; ++i) {
            var offset = i * segmentLength;
            var slices = [];
            for (var j = 0, jj = buffers.length; j < jj; ++j) {
                slices.push(buffers[j].slice(offset, offset + segmentLength));
            }
            this._workers[i].postMessage({
                buffers: slices,
                meta: job.meta,
                imageOps: this._imageOps,
                width: width,
                height: height,
            }, slices);
        }
    };
    /**
     * Handle messages from the worker.
     * @param {number} index The worker index.
     * @param {MessageEvent} event The message event.
     */
    Processor.prototype._onWorkerMessage = function (index, event) {
        if (this.disposed) {
            return;
        }
        this._dataLookup[index] = event.data;
        --this._running;
        if (this._running === 0) {
            this._resolveJob();
        }
    };
    /**
     * Resolve a job.  If there are no more worker threads, the processor callback
     * will be called.
     */
    Processor.prototype._resolveJob = function () {
        var job = this._job;
        var threads = this._workers.length;
        var data, meta;
        if (threads === 1) {
            data = new Uint8ClampedArray(this._dataLookup[0]['buffer']);
            meta = this._dataLookup[0]['meta'];
        }
        else {
            var length_1 = job.inputs[0].data.length;
            data = new Uint8ClampedArray(length_1);
            meta = new Array(threads);
            var segmentLength = 4 * Math.ceil(length_1 / 4 / threads);
            for (var i = 0; i < threads; ++i) {
                var buffer = this._dataLookup[i]['buffer'];
                var offset = i * segmentLength;
                data.set(new Uint8ClampedArray(buffer), offset);
                meta[i] = this._dataLookup[i]['meta'];
            }
        }
        this._job = null;
        this._dataLookup = {};
        job.callback(null, newImageData(data, job.inputs[0].width, job.inputs[0].height), meta);
        this._dispatch();
    };
    /**
     * Terminate all workers associated with the processor.
     */
    Processor.prototype.disposeInternal = function () {
        for (var i = 0; i < this._workers.length; ++i) {
            this._workers[i].terminate();
        }
        this._workers.length = 0;
    };
    return Processor;
}(Disposable));
export { Processor };
/**
 * A function that takes an array of input data, performs some operation, and
 * returns an array of output data.
 * For `pixel` type operations, the function will be called with an array of
 * pixels, where each pixel is an array of four numbers (`[r, g, b, a]`) in the
 * range of 0 - 255. It should return a single pixel array.
 * For `'image'` type operations, functions will be called with an array of
 * [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData)
 * and should return a single
 * [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData).
 * The operations
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
     * Triggered before operations are run.  Listeners will receive an event object with
     * a `data` property that can be used to make data available to operations.
     * @event module:ol/source/Raster.RasterSourceEvent#beforeoperations
     * @api
     */
    BEFOREOPERATIONS: 'beforeoperations',
    /**
     * Triggered after operations are run.  Listeners will receive an event object with
     * a `data` property.  If more than one thread is used, `data` will be an array of
     * objects.  If a single thread is used, `data` will be a single object.
     * @event module:ol/source/Raster.RasterSourceEvent#afteroperations
     * @api
     */
    AFTEROPERATIONS: 'afteroperations',
};
/**
 * Raster operation type. Supported values are `'pixel'` and `'image'`.
 * @enum {string}
 */
var RasterOperationType = {
    PIXEL: 'pixel',
    IMAGE: 'image',
};
/**
 * @typedef {import("./Image.js").ImageSourceEventTypes|'beforeoperations'|'afteroperations'} RasterSourceEventTypes
 */
/**
 * @classdesc
 * Events emitted by {@link module:ol/source/Raster~RasterSource} instances are instances of this
 * type.
 */
var RasterSourceEvent = /** @class */ (function (_super) {
    __extends(RasterSourceEvent, _super);
    /**
     * @param {string} type Type.
     * @param {import("../PluggableMap.js").FrameState} frameState The frame state.
     * @param {Object|Array<Object>} data An object made available to operations.  For "afteroperations" evenets
     * this will be an array of objects if more than one thread is used.
     */
    function RasterSourceEvent(type, frameState, data) {
        var _this = _super.call(this, type) || this;
        /**
         * The raster extent.
         * @type {import("../extent.js").Extent}
         * @api
         */
        _this.extent = frameState.extent;
        /**
         * The pixel resolution (map units per pixel).
         * @type {number}
         * @api
         */
        _this.resolution = frameState.viewState.resolution / frameState.pixelRatio;
        /**
         * An object made available to all operations.  This can be used by operations
         * as a storage object (e.g. for calculating statistics).
         * @type {Object}
         * @api
         */
        _this.data = data;
        return _this;
    }
    return RasterSourceEvent;
}(Event));
export { RasterSourceEvent };
/**
 * @typedef {Object} Options
 * @property {Array<import("./Source.js").default|import("../layer/Layer.js").default>} sources Input
 * sources or layers.  For vector data, use an VectorImage layer.
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
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types, import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<import("./Image.js").ImageSourceEventTypes, import("./Image.js").ImageSourceEvent, Return> &
 *   import("../Observable").OnSignature<RasterSourceEventTypes, RasterSourceEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types
 *     |RasterSourceEventTypes, Return>} RasterSourceOnSignature
 */
/**
 * @classdesc
 * A source that transforms data from any number of input sources using an
 * {@link module:ol/source/Raster~Operation} function to transform input pixel values into
 * output pixel values.
 *
 * @fires module:ol/source/Raster.RasterSourceEvent
 * @api
 */
var RasterSource = /** @class */ (function (_super) {
    __extends(RasterSource, _super);
    /**
     * @param {Options} options Options.
     */
    function RasterSource(options) {
        var _this = _super.call(this, {
            projection: null,
        }) || this;
        /***
         * @type {RasterSourceOnSignature<import("../events").EventsKey>}
         */
        _this.on;
        /***
         * @type {RasterSourceOnSignature<import("../events").EventsKey>}
         */
        _this.once;
        /***
         * @type {RasterSourceOnSignature<void>}
         */
        _this.un;
        /**
         * @private
         * @type {Processor}
         */
        _this.processor_ = null;
        /**
         * @private
         * @type {RasterOperationType}
         */
        _this.operationType_ =
            options.operationType !== undefined
                ? options.operationType
                : RasterOperationType.PIXEL;
        /**
         * @private
         * @type {number}
         */
        _this.threads_ = options.threads !== undefined ? options.threads : 1;
        /**
         * @private
         * @type {Array<import("../layer/Layer.js").default>}
         */
        _this.layers_ = createLayers(options.sources);
        var changed = _this.changed.bind(_this);
        for (var i = 0, ii = _this.layers_.length; i < ii; ++i) {
            _this.layers_[i].addEventListener(EventType.CHANGE, changed);
        }
        /**
         * @private
         * @type {import("../TileQueue.js").default}
         */
        _this.tileQueue_ = new TileQueue(function () {
            return 1;
        }, _this.changed.bind(_this));
        /**
         * The most recently requested frame state.
         * @type {import("../PluggableMap.js").FrameState}
         * @private
         */
        _this.requestedFrameState_;
        /**
         * The most recently rendered image canvas.
         * @type {import("../ImageCanvas.js").default}
         * @private
         */
        _this.renderedImageCanvas_ = null;
        /**
         * The most recently rendered revision.
         * @type {number}
         */
        _this.renderedRevision_;
        /**
         * @private
         * @type {import("../PluggableMap.js").FrameState}
         */
        _this.frameState_ = {
            animate: false,
            coordinateToPixelTransform: createTransform(),
            declutterTree: null,
            extent: null,
            index: 0,
            layerIndex: 0,
            layerStatesArray: getLayerStatesArray(_this.layers_),
            pixelRatio: 1,
            pixelToCoordinateTransform: createTransform(),
            postRenderFunctions: [],
            size: [0, 0],
            tileQueue: _this.tileQueue_,
            time: Date.now(),
            usedTiles: {},
            viewState: /** @type {import("../View.js").State} */ ({
                rotation: 0,
            }),
            viewHints: [],
            wantedTiles: {},
            mapId: getUid(_this),
            renderTargets: {},
        };
        _this.setAttributions(function (frameState) {
            var attributions = [];
            for (var index = 0, iMax = options.sources.length; index < iMax; ++index) {
                var sourceOrLayer = options.sources[index];
                var source = sourceOrLayer instanceof Source
                    ? sourceOrLayer
                    : sourceOrLayer.getSource();
                var attributionGetter = source.getAttributions();
                if (typeof attributionGetter === 'function') {
                    var sourceAttribution = attributionGetter(frameState);
                    attributions.push.apply(attributions, sourceAttribution);
                }
            }
            return attributions.length !== 0 ? attributions : null;
        });
        if (options.operation !== undefined) {
            _this.setOperation(options.operation, options.lib);
        }
        return _this;
    }
    /**
     * Set the operation.
     * @param {Operation} operation New operation.
     * @param {Object} [opt_lib] Functions that will be available to operations run
     *     in a worker.
     * @api
     */
    RasterSource.prototype.setOperation = function (operation, opt_lib) {
        if (this.processor_) {
            this.processor_.dispose();
        }
        this.processor_ = new Processor({
            operation: operation,
            imageOps: this.operationType_ === RasterOperationType.IMAGE,
            queue: 1,
            lib: opt_lib,
            threads: this.threads_,
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
    RasterSource.prototype.updateFrameState_ = function (extent, resolution, projection) {
        var frameState = /** @type {import("../PluggableMap.js").FrameState} */ (assign({}, this.frameState_));
        frameState.viewState = /** @type {import("../View.js").State} */ (assign({}, frameState.viewState));
        var center = getCenter(extent);
        frameState.extent = extent.slice();
        frameState.size[0] = Math.round(getWidth(extent) / resolution);
        frameState.size[1] = Math.round(getHeight(extent) / resolution);
        frameState.time = Date.now();
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
    RasterSource.prototype.allSourcesReady_ = function () {
        var ready = true;
        var source;
        for (var i = 0, ii = this.layers_.length; i < ii; ++i) {
            source = this.layers_[i].getSource();
            if (source.getState() !== SourceState.READY) {
                ready = false;
                break;
            }
        }
        return ready;
    };
    /**
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {import("../ImageCanvas.js").default} Single image.
     */
    RasterSource.prototype.getImage = function (extent, resolution, pixelRatio, projection) {
        if (!this.allSourcesReady_()) {
            return null;
        }
        var frameState = this.updateFrameState_(extent, resolution, projection);
        this.requestedFrameState_ = frameState;
        // check if we can't reuse the existing ol/ImageCanvas
        if (this.renderedImageCanvas_) {
            var renderedResolution = this.renderedImageCanvas_.getResolution();
            var renderedExtent = this.renderedImageCanvas_.getExtent();
            if (resolution !== renderedResolution ||
                !equals(extent, renderedExtent)) {
                this.renderedImageCanvas_ = null;
            }
        }
        if (!this.renderedImageCanvas_ ||
            this.getRevision() !== this.renderedRevision_) {
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
    RasterSource.prototype.processSources_ = function () {
        var frameState = this.requestedFrameState_;
        var len = this.layers_.length;
        var imageDatas = new Array(len);
        for (var i = 0; i < len; ++i) {
            frameState.layerIndex = i;
            var imageData = getImageData(this.layers_[i], frameState);
            if (imageData) {
                imageDatas[i] = imageData;
            }
            else {
                return;
            }
        }
        var data = {};
        this.dispatchEvent(new RasterSourceEvent(RasterEventType.BEFOREOPERATIONS, frameState, data));
        this.processor_.process(imageDatas, data, this.onWorkerComplete_.bind(this, frameState));
    };
    /**
     * Called when pixel processing is complete.
     * @param {import("../PluggableMap.js").FrameState} frameState The frame state.
     * @param {Error} err Any error during processing.
     * @param {ImageData} output The output image data.
     * @param {Object|Array<Object>} data The user data (or an array if more than one thread).
     * @private
     */
    RasterSource.prototype.onWorkerComplete_ = function (frameState, err, output, data) {
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
        }
        else {
            var width = Math.round(getWidth(extent) / resolution);
            var height = Math.round(getHeight(extent) / resolution);
            context = createCanvasContext2D(width, height);
            this.renderedImageCanvas_ = new ImageCanvas(extent, resolution, 1, context.canvas);
        }
        context.putImageData(output, 0, 0);
        this.changed();
        this.renderedRevision_ = this.getRevision();
        this.dispatchEvent(new RasterSourceEvent(RasterEventType.AFTEROPERATIONS, frameState, data));
        if (frameState.animate) {
            requestAnimationFrame(this.changed.bind(this));
        }
    };
    RasterSource.prototype.disposeInternal = function () {
        if (this.processor_) {
            this.processor_.dispose();
        }
        _super.prototype.disposeInternal.call(this);
    };
    return RasterSource;
}(ImageSource));
/**
 * Clean up and unregister the worker.
 * @function
 * @api
 */
RasterSource.prototype.dispose;
/**
 * A reusable canvas context.
 * @type {CanvasRenderingContext2D}
 * @private
 */
var sharedContext = null;
/**
 * Get image data from a layer.
 * @param {import("../layer/Layer.js").default} layer Layer to render.
 * @param {import("../PluggableMap.js").FrameState} frameState The frame state.
 * @return {ImageData} The image data.
 */
function getImageData(layer, frameState) {
    var renderer = layer.getRenderer();
    if (!renderer) {
        throw new Error('Unsupported layer type: ' + layer);
    }
    if (!renderer.prepareFrame(frameState)) {
        return null;
    }
    var width = frameState.size[0];
    var height = frameState.size[1];
    if (width === 0 || height === 0) {
        return null;
    }
    var container = renderer.renderFrame(frameState, null);
    var element;
    if (container instanceof HTMLCanvasElement) {
        element = container;
    }
    else {
        if (container) {
            element = container.firstElementChild;
        }
        if (!(element instanceof HTMLCanvasElement)) {
            throw new Error('Unsupported rendered element: ' + element);
        }
        if (element.width === width && element.height === height) {
            var context_1 = element.getContext('2d');
            return context_1.getImageData(0, 0, width, height);
        }
    }
    if (!sharedContext) {
        sharedContext = createCanvasContext2D(width, height);
    }
    else {
        var canvas = sharedContext.canvas;
        if (canvas.width !== width || canvas.height !== height) {
            sharedContext = createCanvasContext2D(width, height);
        }
        else {
            sharedContext.clearRect(0, 0, width, height);
        }
    }
    sharedContext.drawImage(element, 0, 0, width, height);
    return sharedContext.getImageData(0, 0, width, height);
}
/**
 * Get a list of layer states from a list of layers.
 * @param {Array<import("../layer/Layer.js").default>} layers Layers.
 * @return {Array<import("../layer/Layer.js").State>} The layer states.
 */
function getLayerStatesArray(layers) {
    return layers.map(function (layer) {
        return layer.getLayerState();
    });
}
/**
 * Create layers for all sources.
 * @param {Array<import("./Source.js").default|import("../layer/Layer.js").default>} sources The sources.
 * @return {Array<import("../layer/Layer.js").default>} Array of layers.
 */
function createLayers(sources) {
    var len = sources.length;
    var layers = new Array(len);
    for (var i = 0; i < len; ++i) {
        layers[i] = createLayer(sources[i]);
    }
    return layers;
}
/**
 * Create a layer for the provided source.
 * @param {import("./Source.js").default|import("../layer/Layer.js").default} layerOrSource The layer or source.
 * @return {import("../layer/Layer.js").default} The layer.
 */
function createLayer(layerOrSource) {
    // @type {import("../layer/Layer.js").default}
    var layer;
    if (layerOrSource instanceof Source) {
        if (layerOrSource instanceof TileSource) {
            layer = new TileLayer({ source: layerOrSource });
        }
        else if (layerOrSource instanceof ImageSource) {
            layer = new ImageLayer({ source: layerOrSource });
        }
    }
    else {
        layer = layerOrSource;
    }
    return layer;
}
export default RasterSource;
//# sourceMappingURL=Raster.js.map