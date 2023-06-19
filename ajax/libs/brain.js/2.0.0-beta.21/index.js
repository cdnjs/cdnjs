'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var gpu_js = require('gpu.js');

/**
 * Relu Activation, aka Rectified Linear Unit Activation
 * @description https://en.wikipedia.org/wiki/Rectifier_(neural_networks)
 */
function activate$3(weight) {
    return Math.max(0, weight);
}
/**
 * Relu derivative
 */
function measure$3(weight, delta) {
    if (weight <= 0) {
        return 0;
    }
    return delta;
}

var relu$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    activate: activate$3,
    measure: measure$3
});

/**
 * sigmoid activation
 */
function activate$2(value) {
    return 1 / (1 + Math.exp(-value));
}
/**
 * sigmoid derivative
 */
function measure$2(weight, error) {
    return weight * (1 - weight) * error;
}

var sigmoid$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    activate: activate$2,
    measure: measure$2
});

/**
 * Hyperbolic tan
 */
function activate$1(weight) {
    return Math.tanh(weight);
}
/**
 * @description grad for z = tanh(x) is (1 - z^2)
 */
function measure$1(weight, error) {
    return (1 - weight * weight) * error;
}

var tanh$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    activate: activate$1,
    measure: measure$1
});

/**
 * Leaky Relu Activation, aka Leaky Rectified Linear Unit Activation
 * @description https://en.wikipedia.org/wiki/Rectifier_(neural_networks)
 */
function activate(weight) {
    return weight > 0 ? weight : 0.01 * weight;
}
/**
 * Leaky Relu derivative
 */
function measure(weight, error) {
    return weight > 0 ? error : 0.01 * error;
}

var leakyRelu$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    activate: activate,
    measure: measure
});

var index$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    relu: relu$2,
    sigmoid: sigmoid$2,
    tanh: tanh$2,
    leakyRelu: leakyRelu$1
});

class CrossValidate {
    constructor(initClassifier) {
        this.json = {
            avgs: {
                error: 0,
                iterations: 0,
                testTime: 0,
                trainTime: 0,
            },
            stats: {
                total: 0,
                testSize: 0,
                trainSize: 0,
            },
            sets: [],
        };
        this.initClassifier = initClassifier;
    }
    testPartition(trainOpts, trainSet, testSet) {
        const classifier = this.initClassifier();
        const beginTrain = Date.now();
        const trainingStats = classifier.train(trainSet, trainOpts);
        const beginTest = Date.now();
        const testStats = classifier.test(testSet);
        const endTest = Date.now();
        return {
            ...testStats,
            trainTime: beginTest - beginTrain,
            testTime: endTest - beginTest,
            iterations: trainingStats.iterations,
            error: trainingStats.error,
            total: testStats.total,
            network: classifier.toJSON(),
        };
    }
    /**
     * Randomize array element order in-place.
     * Using Durstenfeld shuffle algorithm.
     * source: http://stackoverflow.com/a/12646864/1324039
     */
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    train(data, trainOpts = {}, k = 4) {
        if (data.length < k) {
            throw new Error(`Training set size is too small for ${data.length} k folds of ${k}`);
        }
        this.shuffleArray(data);
        const size = data.length / k;
        const avgs = {
            trainTime: 0,
            testTime: 0,
            iterations: 0,
            error: 0,
        };
        const stats = {
            total: 0,
            testSize: 0,
            trainSize: 0,
        };
        const binaryStats = {
            total: 0,
            testSize: 0,
            trainSize: 0,
            truePos: 0,
            trueNeg: 0,
            falsePos: 0,
            falseNeg: 0,
            precision: 0,
            recall: 0,
            accuracy: 0,
        };
        const results = [];
        let isBinary = null;
        for (let i = 0; i < k; i++) {
            const dclone = data.slice(0);
            const testSet = dclone.splice(i * size, size);
            const trainSet = dclone;
            const result = this.testPartition(trainOpts, trainSet, testSet);
            if (isBinary === null) {
                isBinary =
                    result.hasOwnProperty('falseNeg') &&
                        result.hasOwnProperty('falsePos') &&
                        result.hasOwnProperty('trueNeg') &&
                        result.hasOwnProperty('truePos');
                if (isBinary) {
                    Object.assign(stats, binaryStats);
                }
            }
            avgs.iterations += result.iterations;
            avgs.testTime += result.testTime;
            avgs.trainTime += result.trainTime;
            avgs.error += result.error;
            stats.total += result.total;
            if (CrossValidate.isBinaryStats(stats) &&
                CrossValidate.isBinaryPartitionResults(result)) {
                stats.accuracy += result.accuracy;
                stats.falseNeg += result.falseNeg;
                stats.falsePos += result.falsePos;
                stats.precision += result.precision;
                stats.recall += result.recall;
                stats.trueNeg += result.trueNeg;
                stats.truePos += result.truePos;
            }
            results.push(result);
        }
        avgs.error /= k;
        avgs.iterations /= k;
        avgs.testTime /= k;
        avgs.trainTime /= k;
        if (CrossValidate.isBinaryStats(stats)) {
            stats.precision = stats.truePos / (stats.truePos + stats.falsePos);
            stats.recall = stats.truePos / (stats.truePos + stats.falseNeg);
            stats.accuracy = (stats.trueNeg + stats.truePos) / stats.total;
        }
        stats.testSize = size;
        stats.trainSize = data.length - size;
        this.json = {
            avgs: avgs,
            stats: stats,
            sets: results,
        };
        return this.json;
    }
    toNeuralNetwork() {
        return this.fromJSON(this.json);
    }
    toJSON() {
        return this.json;
    }
    fromJSON(crossValidateJson) {
        const winningJSON = crossValidateJson.sets.reduce((prev, cur) => (prev.error < cur.error ? prev : cur));
        return this.initClassifier().fromJSON(winningJSON.network);
    }
}
CrossValidate.isBinaryStats = (stats) => {
    return (stats.accuracy !== undefined);
};
CrossValidate.isBinaryResults = (stats) => stats.stats.accuracy !== undefined;
CrossValidate.isBinaryPartitionResults = (stats) => stats.accuracy !==
    undefined;

let gpuInstance = null;
/**
 * Sets up the gpu.js instance
 */
function setup(value) {
    gpuInstance = value;
}
function makeKernel(fn, settings) {
    let _gpuInstance = gpuInstance;
    if (_gpuInstance === null) {
        _gpuInstance = new gpu_js.GPU({ mode: 'gpu' });
        setup(_gpuInstance);
    }
    return _gpuInstance
        .createKernel(fn, settings)
        .setPipeline(true);
}
function makeKernelMap(map, fn, settings) {
    let _gpuInstance = gpuInstance;
    if (_gpuInstance === null) {
        _gpuInstance = new gpu_js.GPU({ mode: 'gpu' });
        setup(_gpuInstance);
    }
    return _gpuInstance
        .createKernelMap(map, fn, settings)
        .setPipeline(true);
}
/**
 * Compiles a function into a gpu.js dev mode kernel
 */
// export function makeDevKernel(
//   fn: ThreadFunction,
//   settings: makeKernelSettings
// ): IKernelRunShortcut {
//   if ('map' in settings) {
//     throw new Error('map kernels are not supported by dev kernels');
//   }
//   const gpu = new GPU({ mode: 'dev' });
//   return gpu.createKernel(fn, settings);
// }
function kernelInput(value, size) {
    return new gpu_js.Input(value, size);
}
/**
 * Deletes a gpu.js texture and frees VRAM
 */
function release(possibleTexture) {
    if (possibleTexture instanceof gpu_js.Texture) {
        possibleTexture.delete();
    }
}
/**
 * Cleans ie sets all elements to 0 of a Texture or a js array
 */
function clear(value) {
    if (value instanceof gpu_js.Texture) {
        value.clear();
        return;
    }
    // array
    if (Array.isArray(value)) {
        if (typeof value[0] === 'number') {
            value.fill(0);
        }
        else if (typeof value[0][0] === 'number') {
            for (let x = 0; x < value.length; x++) {
                value[x].fill(0);
            }
            return;
        }
        else if (typeof value[0][0][0] === 'number') {
            // cube
            for (let y = 0; y < value.length; y++) {
                const row = value[y];
                for (let x = 0; x < row.length; x++) {
                    row[x].fill(0);
                }
            }
            return;
        }
    }
    if (value instanceof Float32Array) {
        value.fill(0);
        return;
    }
    throw new Error('unhandled value');
}
/**
 * Clones a value
 */
function clone(value) {
    if (value instanceof gpu_js.Texture) {
        return value.clone();
    }
    if (value instanceof Float32Array) {
        return value.slice(0);
    }
    if (Array.isArray(value)) {
        if (typeof value[0] === 'number') {
            return value.slice(0);
        }
        else if (typeof value[0][0] === 'number') {
            const matrix = new Array(value.length);
            for (let x = 0; x < value.length; x++) {
                matrix[x] = value[x].slice(0);
            }
            return matrix;
        }
        else if (typeof value[0][0][0] === 'number') {
            const cube = new Array(value.length);
            for (let y = 0; y < value.length; y++) {
                const row = value[y];
                const matrix = new Array(row.length);
                for (let x = 0; x < row.length; x++) {
                    matrix[x] = row[x].slice(0);
                }
            }
            return cube;
        }
    }
    throw new Error('unhandled value');
}

/**
 * 2D Mean Squared Error
 */
function mse2d(errors) {
    let sum = 0;
    for (let y = 0; y < this.constants.height; y++) {
        for (let x = 0; x < this.constants.width; x++) {
            sum += errors[y][x] ** 2;
        }
    }
    return sum / this.constants.length;
}
class MeanSquaredError {
    constructor({ width, height }) {
        this.calculate = makeKernel(mse2d, {
            output: [1],
            constants: {
                width,
                height,
                length: width * height,
            },
            immutable: true,
        });
        this.addAbsolute = makeKernel(function (prevError, prevLayerErrors) {
            return prevError[0] + Math.abs(prevLayerErrors[0][0]);
        }, {
            output: [1],
            immutable: true,
        });
        this.add = makeKernel(function (value1, value2) {
            return value1[0] + value2[0];
        }, {
            output: [1],
            immutable: true,
        });
        this.divide = makeKernel(function (length, mseSum) {
            const value = mseSum[0];
            if (value > 0) {
                return value / length;
            }
            return 0;
        }, {
            output: [1],
            immutable: true,
        });
    }
}

const baseLayerDefaultSettings = {
    width: 1,
    height: 1,
    depth: null,
    weights: null,
    deltas: null,
    praxis: null,
    praxisOpts: null,
    cleanupDeltas: true,
};
class BaseLayer {
    constructor(settings) {
        this.praxis = null;
        this.predictKernel = null;
        this.compareKernel = null;
        if (settings) {
            this.settings = { ...baseLayerDefaultSettings, ...settings };
        }
        else {
            this.settings = { ...baseLayerDefaultSettings };
        }
        this.setupPraxis();
    }
    get width() {
        var _a;
        return (_a = this.settings.width) !== null && _a !== void 0 ? _a : 0;
    }
    get height() {
        var _a;
        return (_a = this.settings.height) !== null && _a !== void 0 ? _a : 0;
    }
    get depth() {
        var _a;
        return (_a = this.settings.depth) !== null && _a !== void 0 ? _a : 0;
    }
    get weights() {
        return this.settings.weights;
    }
    set weights(weights) {
        this.settings.weights = weights;
        if (this.settings.cleanupDeltas && this.deltas) {
            clear(this.deltas);
        }
    }
    get deltas() {
        return this.settings.deltas;
    }
    set deltas(deltas) {
        this.settings.deltas = deltas;
    }
    get id() {
        var _a;
        return (_a = this.settings.id) !== null && _a !== void 0 ? _a : '';
    }
    set id(title) {
        this.settings.id = title;
    }
    setupPraxis() {
        const { initPraxis, praxis, praxisOpts } = this.settings;
        if (!this.praxis) {
            if (initPraxis) {
                if (praxisOpts) {
                    this.praxis = initPraxis(this, praxisOpts);
                }
                else {
                    this.praxis = initPraxis(this);
                }
            }
            else if (praxis) {
                this.praxis = praxis;
            }
        }
    }
    /*
    get weights() {
      return this._weights;
    }
  
    set weights(value) {
      if (value) {
        if (value.dimensions) {
          if (value.dimensions[0] !== this.width) {
            throw new Error(`${this.constructor.name}.weights being set with improper value width`);
          }
          if (value.dimensions[1] !== this.height) {
            throw new Error(`${this.constructor.name}.weights being set with improper value height`);
          }
        } else {
          if (value[0].length !== this.width) {
            throw new Error(`${this.constructor.name}.weights being set with improper value width`);
          }
          if (value.length !== this.height) {
            throw new Error(`${this.constructor.name}.weights being set with improper value height`);
          }
        }
      }
      this._weights = value;
    }
  
    get deltas() {
      return this._deltas;
    }
  
    set deltas(value) {
      if (value) {
        if (value.dimensions) {
          if (value.dimensions[0] !== this.width) {
            throw new Error(`${this.constructor.name}.deltas being set with improper value width`);
          }
          if (value.dimensions[1] !== this.height) {
            throw new Error(`${this.constructor.name}.deltas being set with improper value height`);
          }
        } else {
          if (value[0].length !== this.width) {
            throw new Error(`${this.constructor.name}.deltas being set with improper value width`);
          }
          if (value.length !== this.height) {
            throw new Error(`${this.constructor.name}.deltas being set with improper value height`);
          }
        }
      }
      this._deltas = value;
    } */
    validate() {
        if (Number.isNaN(this.height)) {
            throw new Error(`${this.constructor.name} layer height is not a number`);
        }
        if (Number.isNaN(this.width)) {
            throw new Error(`${this.constructor.name} layer width is not a number`);
        }
        if (this.height < 1) {
            throw new Error(`${this.constructor.name} layer height is less than 1`);
        }
        if (this.width < 1) {
            throw new Error(`${this.constructor.name} layer width is less than 1`);
        }
    }
    setupKernels(isTraining) { }
    reuseKernels(layer) {
        if (layer.width !== this.width) {
            throw new Error(`${this.constructor.name} kernel width mismatch ${layer.width} is not ${this.width}`);
        }
        if (layer.height !== this.height) {
            throw new Error(`${this.constructor.name} kernel width mismatch ${layer.height} is not ${this.height}`);
        }
        if (layer.hasOwnProperty('predictKernel') && layer.predictKernel !== null) {
            if (!layer.predictKernel.immutable) {
                throw new Error(`${layer.constructor.name}.predictKernel is not reusable, set kernel.immutable = true`);
            }
            this.predictKernel = layer.predictKernel;
        }
        if (layer.hasOwnProperty('compareKernel') && layer.compareKernel !== null) {
            if (!layer.compareKernel.immutable) {
                throw new Error(`${layer.constructor.name}.compareKernel is not reusable, set kernel.immutable = true`);
            }
            this.compareKernel = layer.compareKernel;
        }
        this.praxis = layer.praxis;
    }
    predict(inputs) { }
    compare(targetValues) { }
    learn(learningRate) { }
    toArray() {
        return Array.isArray(this.weights)
            ? this.weights
            : this.weights.toArray();
    }
    toJSON() {
        return BaseLayer.toJSON(this);
    }
    static toJSON(layer) {
        const { weights } = layer;
        return {
            width: layer.width,
            height: layer.height,
            depth: layer.depth,
            weights: toUntypedArray((weights && weights instanceof gpu_js.Texture
                ? weights.toArray()
                : weights)),
            type: layer.constructor.name,
            praxisOpts: layer.praxis ? layer.praxis.toJSON() : null,
        };
    }
}
function toUntypedArray(weights) {
    if (weights === null)
        return null;
    if (Array.isArray(weights)) {
        if (typeof weights[0] === 'number') {
            return weights;
        }
        else if (Array.isArray(weights[0]) && typeof weights[0][0] === 'number') {
            return weights;
        }
        else if (Array.isArray(weights[0][0]) &&
            typeof weights[0][0][0] === 'number') {
            return weights;
        }
        else if (weights[0] instanceof Float32Array) {
            const matrix = weights;
            return matrix.map((row) => {
                return Array.from(row);
            });
        }
        else if (weights[0][0] instanceof Float32Array) {
            const cube = weights;
            return cube.map((matrix) => {
                return matrix.map((row) => {
                    return Array.from(row);
                });
            });
        }
    }
    else if (weights) {
        return Array.from(weights);
    }
    throw new Error('unexpected value');
}

/**
 * Returns an array of zeros
 */
function zeros$1(size) {
    return new Float32Array(size);
}

/**
 * Returns a 2D tensor(matrix) of zeros
 */
function zeros2D(width, height) {
    const result = new Array(height);
    for (let y = 0; y < height; y++) {
        result[y] = zeros$1(width);
    }
    return result;
}

/**
 * Returns a 3D tensor of arrays
 */
function zeros3D(width, height, depth) {
    const result = new Array(depth);
    for (let z = 0; z < depth; z++) {
        result[z] = zeros2D(width, height);
    }
    return result;
}

class Activation extends BaseLayer {
    constructor(inputLayer, settings) {
        super(settings);
        this.inputLayer = inputLayer;
        const { width, height, depth } = this;
        this.predictKernel = null;
        this.compareKernel = null;
        this.validate();
        if (depth > 0) {
            this.weights = zeros3D(width, height, depth);
            this.deltas = zeros3D(width, height, depth);
        }
        else if (height > 0) {
            this.weights = zeros2D(width, height);
            this.deltas = zeros2D(width, height);
        }
        this.setupPraxis();
    }
    get width() {
        return this.inputLayer.width;
    }
    get height() {
        return this.inputLayer.height;
    }
    get depth() {
        return this.inputLayer.depth;
    }
}

class Filter extends BaseLayer {
    constructor(settings, inputLayer) {
        super();
        this.settings = settings;
        this.inputLayer = inputLayer;
    }
    get width() {
        return this.inputLayer.width;
    }
    get height() {
        return this.inputLayer.height;
    }
    get depth() {
        return this.inputLayer.depth;
    }
    get filterCount() {
        return this.settings.filterCount;
    }
    get filterWidth() {
        return this.settings.filterWidth;
    }
    get filterHeight() {
        return this.settings.filterHeight;
    }
    get filters() {
        return this.settings.filters;
    }
    set filters(filters) {
        this.settings.filters = filters;
    }
    get filterDeltas() {
        return this.settings.filterDeltas;
    }
    set filterDeltas(filterDeltas) {
        this.settings.filterDeltas = filterDeltas;
    }
}

class Internal {
    constructor() {
        this.predictKernel = null;
        this.compareKernel = null;
        this.praxis = null;
    }
    get width() {
        return this.settings.width;
    }
    get height() {
        return this.settings.height;
    }
    get depth() {
        return this.settings.depth;
    }
    get weights() {
        return this.settings.weights;
    }
    set weights(weights) {
        this.settings.weights = weights;
    }
    get deltas() {
        return this.settings.deltas;
    }
    set deltas(deltas) {
        this.settings.deltas = deltas;
    }
    toJSON() {
        return BaseLayer.toJSON(this);
    }
}

class Modifier extends BaseLayer {
    constructor(inputLayer, settings) {
        super({
            ...settings,
            width: inputLayer.width,
            height: inputLayer.height,
            depth: inputLayer.depth,
        });
        this.inputLayer = inputLayer;
    }
    validate() {
        var _a;
        super.validate();
        if (this.width !== this.inputLayer.width) {
            throw new Error(`width of ${this.width} does not match inputLayer.width of ${this.inputLayer.width}`);
        }
        if (this.height !== this.inputLayer.height) {
            throw new Error(`height of ${this.height} does not match inputLayer.height of ${this.inputLayer.height}`);
        }
        if (this.depth !== ((_a = this.inputLayer.depth) !== null && _a !== void 0 ? _a : 0)) {
            throw new Error(`depth of ${this.depth} does not match inputLayer.depth of ${this.inputLayer.depth}`);
        }
    }
}

class Operator extends BaseLayer {
    constructor(inputLayer1, inputLayer2, settings) {
        super(settings);
        this.inputLayer1 = inputLayer1;
        this.inputLayer2 = inputLayer2;
        this.validate();
        this.weights = zeros2D(this.width, this.height);
        this.deltas = zeros2D(this.width, this.height);
        this.setupPraxis();
    }
}

function compare1D(weights, targetValues) {
    return weights[this.thread.y][this.thread.x] - targetValues[this.thread.x];
}
function compare2D$5(weights, targetValues) {
    return (weights[this.thread.y][this.thread.x] -
        targetValues[this.thread.y][this.thread.x]);
}
class Target extends BaseLayer {
    constructor(settings, inputLayer) {
        super(settings);
        this.inputLayer = inputLayer;
        this.validate();
        if (this.depth) {
            throw new Error('Target layer not implemented for depth');
        }
        else if (this.height) {
            this.weights = zeros2D(this.width, this.height);
            this.deltas = zeros2D(this.width, this.height);
            this.errors = zeros2D(this.width, this.height);
        }
        else {
            this.weights = zeros$1(this.width);
            this.deltas = zeros$1(this.width);
            this.errors = zeros$1(this.width);
        }
    }
    setupKernels() {
        if (this.width === 1) {
            this.compareKernel = makeKernel(compare1D, {
                output: [this.width, this.height],
                immutable: true,
            });
        }
        else {
            this.compareKernel = makeKernel(compare2D$5, {
                output: [this.width, this.height],
                immutable: true,
            });
        }
    }
    predict() {
        // TODO: should we clone here?
        // NOTE: this looks like it shouldn't be, but the weights are immutable, and this is where they are reused.
        release(this.weights);
        this.weights = clone(this.inputLayer.weights);
    }
    compare(targetValues) {
        // this is where weights attach to deltas
        // deltas will be zero on learn, so save it in error for comparing to mse later
        release(this.deltas);
        release(this.errors);
        release(this.inputLayer.deltas);
        this.deltas = this.compareKernel(this.weights, targetValues);
        this.inputLayer.deltas = clone(this.deltas);
        this.errors = clone(this.deltas);
    }
    setupPraxis() { }
}
function target(settings, inputLayer) {
    return new Target(settings, inputLayer);
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class InternalModel {
}
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class EntryPoint extends BaseLayer {
}
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class Model extends BaseLayer {
    learn(learningRate) {
        // TODO: do we need to release here?
        const { weights: oldWeights } = this;
        if (!this.praxis)
            throw new Error('this.praxis not defined');
        this.weights = this.praxis.run(this, learningRate);
        release(oldWeights);
    }
}

/* Functions for turning sparse hashes into arrays and vice versa */
const lookup = {
    /**
     * Performs `[{a: 1}, {b: 6, c: 7}] -> {a: 0, b: 1, c: 2}`
     * @param {Object} hashes
     * @returns {Object}
     */
    toTable(hashes) {
        const hash = hashes.reduce((memo, hash) => {
            return Object.assign(memo, hash);
        }, {});
        return lookup.toHash(hash);
    },
    /**
     * Performs `[{a: 1}, {b: 6, c: 7}] -> {a: 0, b: 1, c: 2}`
     */
    toTable2D(objects2D) {
        const table = {};
        let valueIndex = 0;
        for (let i = 0; i < objects2D.length; i++) {
            const objects = objects2D[i];
            for (let j = 0; j < objects.length; j++) {
                const object = objects[j];
                for (const p in object) {
                    if (object.hasOwnProperty(p) && !table.hasOwnProperty(p)) {
                        table[p] = valueIndex++;
                    }
                }
            }
        }
        return table;
    },
    toInputTable2D(data) {
        const table = {};
        let tableIndex = 0;
        for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
            const input = data[dataIndex].input;
            for (let i = 0; i < input.length; i++) {
                const object = input[i];
                for (const p in object) {
                    if (!object.hasOwnProperty(p))
                        continue;
                    if (!table.hasOwnProperty(p)) {
                        table[p] = tableIndex++;
                    }
                }
            }
        }
        return table;
    },
    toOutputTable2D(data) {
        const table = {};
        let tableIndex = 0;
        for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
            const output = data[dataIndex].output;
            for (let i = 0; i < output.length; i++) {
                const object = output[i];
                for (const p in object) {
                    if (!object.hasOwnProperty(p))
                        continue;
                    if (!table.hasOwnProperty(p)) {
                        table[p] = tableIndex++;
                    }
                }
            }
        }
        return table;
    },
    /**
     * performs `{a: 6, b: 7} -> {a: 0, b: 1}`
     */
    toHash(hash) {
        const lookup = {};
        let index = 0;
        const keys = Object.keys(hash);
        for (let i = 0; i < keys.length; i++) {
            lookup[keys[i]] = index++;
        }
        return lookup;
    },
    /**
     * performs `{a: 0, b: 1}, {a: 6} -> [6, 0]`
     */
    toArray(lookup, object, arrayLength) {
        const result = new Float32Array(arrayLength);
        for (const p in lookup) {
            if (!lookup.hasOwnProperty(p))
                continue;
            result[lookup[p]] = object.hasOwnProperty(p) ? object[p] : 0;
        }
        return result;
    },
    toArrayShort(lookup, object) {
        const result = [];
        for (const p in lookup) {
            if (!lookup.hasOwnProperty(p))
                continue;
            if (!object.hasOwnProperty(p))
                break;
            result[lookup[p]] = object[p];
        }
        return Float32Array.from(result);
    },
    toArrays(lookup, objects, arrayLength) {
        const result = [];
        for (let i = 0; i < objects.length; i++) {
            result.push(this.toArray(lookup, objects[i], arrayLength));
        }
        return result;
    },
    /**
     * performs `{a: 0, b: 1}, [6, 7] -> {a: 6, b: 7}`
     * @param {Object} lookup
     * @param {Array} array
     * @returns {Object}
     */
    toObject(lookup, array) {
        const object = {};
        for (const p in lookup) {
            if (!lookup.hasOwnProperty(p))
                continue;
            object[p] = array[lookup[p]];
        }
        return object;
    },
    toObjectPartial(lookup, array, offset = 0, limit = 0) {
        const object = {};
        let i = 0;
        for (const p in lookup) {
            if (!lookup.hasOwnProperty(p))
                continue;
            if (offset > 0) {
                if (i++ < offset)
                    continue;
            }
            if (limit > 0) {
                if (i++ >= limit)
                    continue;
            }
            object[p] = array[lookup[p] - offset];
        }
        return object;
    },
    dataShape(data) {
        const shape = [];
        let lastData;
        if (data.hasOwnProperty('input')) {
            shape.push('datum');
            lastData = data.input;
        }
        else if (Array.isArray(data)) {
            if (data[0] &&
                data[0].input) {
                shape.push('array', 'datum');
                lastData = data[0].input;
            }
            else if (Array.isArray(data[0])) {
                shape.push('array');
                lastData = data[0];
            }
            else {
                lastData = data;
            }
        }
        else {
            lastData = data;
        }
        let p;
        while (lastData) {
            p = Object.keys(lastData)[0];
            if (Array.isArray(lastData) ||
                typeof lastData.buffer === 'object') {
                shape.push('array');
                const possibleNumber = lastData[parseInt(p)];
                if (typeof possibleNumber === 'number') {
                    shape.push('number');
                    break;
                }
                else {
                    lastData = possibleNumber;
                }
            }
            else if (typeof lastData === 'object' &&
                typeof lastData.buffer !== 'object') {
                shape.push('object');
                const possibleNumber = lastData[p];
                if (typeof possibleNumber === 'number') {
                    shape.push('number');
                    break;
                }
                else {
                    lastData = possibleNumber;
                }
            }
            else {
                throw new Error('unhandled signature');
            }
        }
        return shape;
    },
    addKeys(value, table) {
        if (Array.isArray(value))
            return table;
        let i = Object.keys(table).length;
        for (const p in value) {
            if (!value.hasOwnProperty(p))
                continue;
            if (table.hasOwnProperty(p))
                continue;
            table[p] = i++;
        }
        return table;
    },
};

class BasePraxis {
    constructor(layerTemplate, settings = {}) {
        this.layerTemplate = layerTemplate;
        this.settings = { ...settings };
        this.kernel = null;
    }
    get width() {
        return this.layerTemplate.width;
    }
    get height() {
        return this.layerTemplate.height;
    }
    get depth() {
        return this.layerTemplate.depth;
    }
    setupKernels() { }
    reuseKernels(praxis) {
        if (praxis.width !== this.width) {
            throw new Error(`${this.constructor.name} kernel width mismatch ${praxis.width} is not ${this.width}`);
        }
        if (praxis.height !== this.height) {
            throw new Error(`${this.constructor.name} kernel width mismatch ${praxis.height} is not ${this.height}`);
        }
        if (praxis.hasOwnProperty('kernel')) {
            this.kernel = praxis.kernel;
        }
    }
    toJSON() {
        return { ...this.settings };
    }
}

function update$2(weights, deltas) {
    return (weights[this.thread.y][this.thread.x] +
        this.constants.learningRate * deltas[this.thread.y][this.thread.x]);
}
const defaultSettings$1 = {
    learningRate: 0.3,
};
class ArthurDeviationBiases extends BasePraxis {
    constructor(layer, settings) {
        super(layer);
        this.settings = { ...defaultSettings$1, ...settings };
        this.kernel = null;
    }
    run(layer) {
        return this.kernel(layer.weights, layer.deltas);
    }
    setupKernels() {
        var _a;
        this.kernel = makeKernel(update$2, {
            output: [this.width, this.height],
            constants: {
                learningRate: (_a = this.settings.learningRate) !== null && _a !== void 0 ? _a : 0.01,
            },
        });
    }
}
function arthurDeviationBiases(layer, settings) {
    return new ArthurDeviationBiases(layer, settings);
}

function updateChange(value) {
    return value;
}
function update$1(changes, weights, incomingWeights, inputDeltas) {
    const lastChange = changes[this.thread.y][this.thread.x];
    const inputDelta = inputDeltas[this.thread.y][0];
    const weight = weights[this.thread.y][this.thread.x];
    const incoming = incomingWeights[this.thread.x][0];
    const change = this.constants.learningRate * inputDelta * incoming +
        this.constants.momentum * lastChange;
    return weight + change;
}
const defaultSettings = {
    learningRate: 0.3,
    momentum: 0.1,
    weightsLayer: null,
    incomingLayer: null,
    deltaLayer: null,
};
class ArthurDeviationWeights extends BasePraxis {
    constructor(layer, settings) {
        super(layer);
        this.kernelMap = null;
        this.settings = { ...defaultSettings, ...settings };
        this.changes = zeros2D(layer.width, layer.height);
    }
    get learningRate() {
        return this.settings.learningRate;
    }
    get momentum() {
        return this.settings.momentum;
    }
    get weightsLayer() {
        return this.settings.weightsLayer;
    }
    set weightsLayer(layer) {
        this.settings.weightsLayer = layer;
    }
    get deltaLayer() {
        return this.settings.deltaLayer;
    }
    set deltaLayer(layer) {
        this.settings.deltaLayer = layer;
    }
    get incomingLayer() {
        return this.settings.incomingLayer;
    }
    set incomingLayer(layer) {
        this.settings.incomingLayer = layer;
    }
    run() {
        const output = this.kernelMap(this.changes, this.weightsLayer.weights, this.incomingLayer.weights, this.deltaLayer.deltas);
        this.changes = output.changes;
        return output.result;
    }
    setupKernels() {
        this.kernelMap = makeKernelMap({
            changes: updateChange,
        }, update$1, {
            output: [this.width, this.height],
            constants: {
                learningRate: this.learningRate,
                momentum: this.momentum,
            },
        });
    }
}
function arthurDeviationWeights(layer, settings) {
    return new ArthurDeviationWeights(layer, settings);
}

function getMomentum(delta, decay, previousMomentum) {
    return previousMomentum * decay + (1 - decay) * delta * delta;
}
function clipByValue(value, max, min) {
    if (value > max) {
        return max;
    }
    if (value < min) {
        return min;
    }
    return value;
}
/**
 * @description Momentum Root Mean Square Propagation Function
 */
function update(weights, deltas, previousMomenta) {
    const delta = deltas[this.thread.y][this.thread.x];
    const clippedDelta = clipByValue(delta, this.constants.clipValue, -this.constants.clipValue);
    const weight = weights[this.thread.y][this.thread.x];
    const previousMomentum = previousMomenta[this.thread.y][this.thread.x];
    const momentum = getMomentum(delta, this.constants.decayRate, previousMomentum);
    return (weight +
        (-this.constants.learningRate * clippedDelta) /
            Math.sqrt(momentum + this.constants.smoothEps) -
        this.constants.regularizationStrength * weight);
}
const defaults$8 = {
    decayRate: 0.999,
    regularizationStrength: 0.000001,
    learningRate: 0.01,
    smoothEps: 1e-8,
    clipValue: 5,
};
class MomentumRootMeanSquaredPropagation extends BasePraxis {
    constructor(layerTemplate, settings = {}) {
        super(layerTemplate);
        this.kernelMap = null;
        this.settings = { ...defaults$8, ...settings };
        this.momenta = zeros2D(layerTemplate.width, layerTemplate.height);
    }
    get clipValue() {
        return this.settings.clipValue;
    }
    get decayRate() {
        return this.settings.decayRate;
    }
    get learningRate() {
        return this.settings.learningRate;
    }
    get regularizationStrength() {
        return this.settings.regularizationStrength;
    }
    get smoothEps() {
        return this.settings.smoothEps;
    }
    run(layer) {
        const { momenta, result } = this.kernelMap(layer.weights, layer.deltas, this.momenta);
        release(this.momenta);
        this.momenta = momenta;
        return result;
    }
    setupKernels() {
        this.kernelMap = makeKernelMap({
            momenta: getMomentum,
        }, update, {
            output: [this.width, this.height],
            constants: {
                clipValue: this.clipValue,
                decayRate: this.decayRate,
                learningRate: this.learningRate,
                regularizationStrength: this.regularizationStrength,
                smoothEps: this.smoothEps,
            },
            functions: [clipByValue],
            immutable: true,
        });
    }
}
function momentumRootMeanSquaredPropagation(layer, settings) {
    return new MomentumRootMeanSquaredPropagation(layer, settings);
}
/**
 * @description Mathematician friendly name of MomentumRootMeanSquaredPropagation class. For those that are not mere mortals
 */
const MRmsProp = MomentumRootMeanSquaredPropagation;
const mRmsProp = momentumRootMeanSquaredPropagation;

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ArthurDeviationBiases: ArthurDeviationBiases,
    arthurDeviationBiases: arthurDeviationBiases,
    ArthurDeviationWeights: ArthurDeviationWeights,
    arthurDeviationWeights: arthurDeviationWeights,
    MomentumRootMeanSquaredPropagation: MomentumRootMeanSquaredPropagation,
    momentumRootMeanSquaredPropagation: momentumRootMeanSquaredPropagation,
    MRmsProp: MRmsProp,
    mRmsProp: mRmsProp
});

function traverseLayersFrom(layer, cb) {
    if (layer.hasOwnProperty('inputLayer')) {
        traverseLayersFrom(layer.inputLayer, cb);
    }
    else {
        if (layer.hasOwnProperty('inputLayer1')) {
            traverseLayersFrom(layer.inputLayer1, cb);
        }
        if (layer.hasOwnProperty('inputLayer2')) {
            traverseLayersFrom(layer.inputLayer2, cb);
        }
    }
    cb(layer);
}

function flattenLayers(layers) {
    const result = layers.slice(0);
    for (let i = 0; i < result.length; i++) {
        let offset = 0;
        traverseLayersFrom(result[i], (layer) => {
            if (!result.includes(layer)) {
                result.splice(i + offset, 0, layer);
                offset++;
            }
        });
    }
    return result;
}

function checkSameSize(layer1, layer2) {
    if (layer1.width !== layer2.width) {
        throw new Error(`Layer width mismatch of ${layer1.width} and ${layer2.width}`);
    }
    if (layer1.height !== layer2.height) {
        throw new Error(`Layer height mismatch of ${layer1.height} and ${layer2.height}`);
    }
}

function predict$8(inputWeights1, inputWeights2) {
    return (inputWeights1[this.thread.y][this.thread.x] +
        inputWeights2[this.thread.y][this.thread.x]);
}
class Add extends Operator {
    get width() {
        return this.inputLayer1.width;
    }
    get height() {
        return this.inputLayer1.height;
    }
    get depth() {
        return this.inputLayer1.depth;
    }
    validate() {
        super.validate();
        checkSameSize(this.inputLayer1, this.inputLayer2);
    }
    setupKernels() {
        this.predictKernel = makeKernel(predict$8, {
            output: [this.width, this.height],
            immutable: true,
        });
    }
    predict() {
        release(this.weights);
        this.weights = this.predictKernel(this.inputLayer1.weights, this.inputLayer2.weights);
    }
    compare() {
        // TODO: Do we need release and clone here?
        release(this.inputLayer1.deltas);
        release(this.inputLayer2.deltas);
        this.inputLayer1.deltas = clone(this.deltas);
        this.inputLayer2.deltas = clone(this.deltas);
    }
}
function add$1(inputLayer1, inputLayer2, settings) {
    return new Add(inputLayer1, inputLayer2, settings);
}

function randomWeight() {
    return Math.random() * 0.4 - 0.2;
}

/**
 * Returns a random float between given min and max bounds (inclusive)
 * @param min Minimum value of the ranfom float
 * @param max Maximum value of the random float
 */
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
/**
 * Complicated math. All you need to know is that it returns a random number.
 * More info: https://en.wikipedia.org/wiki/Normal_distribution
 */
function gaussRandom() {
    if (gaussRandom.returnV) {
        gaussRandom.returnV = false;
        return gaussRandom.vVal;
    }
    const u = 2 * Math.random() - 1;
    const v = 2 * Math.random() - 1;
    const r = u * u + v * v;
    if (r === 0 || r > 1) {
        return gaussRandom();
    }
    const c = Math.sqrt((-2 * Math.log(r)) / r);
    gaussRandom.vVal = v * c; // cache this
    gaussRandom.returnV = true;
    return u * c;
}
/**
 * Returns a random integer between given min and max bounds
 * @param min Minimum value of the random integer
 * @param max Maximum value of the random integer
 */
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
/**
 * If you know what this is: https://en.wikipedia.org/wiki/Normal_distribution
 * @param mu
 * @param std
 */
function randomN(mu, std) {
    return mu + gaussRandom() * std;
}
gaussRandom.returnV = false;
gaussRandom.vVal = 0;

var random$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    randomFloat: randomFloat,
    gaussRandom: gaussRandom,
    randomInteger: randomInteger,
    randomN: randomN
});

/**
 * Returns an array of given size, full of randomness
 */
function randos(size, std = null) {
    const array = new Float32Array(size);
    if (std === null) {
        for (let i = 0; i < size; i++) {
            array[i] = randomWeight();
        }
    }
    else {
        for (let i = 0; i < size; i++) {
            array[i] = randomFloat(-std, std);
        }
    }
    return array;
}
/**
 * Returns a 2D matrix of given size, full of randomness
 */
function randos2D(width, height, std) {
    const result = new Array(height);
    for (let y = 0; y < height; y++) {
        result[y] = randos(width, std);
    }
    return result;
}
/**
 * Returns a 3D tensor of given size, full of randomness
 */
function randos3D(width, height, depth, std) {
    const result = new Array(depth);
    for (let z = 0; z < depth; z++) {
        result[z] = randos2D(width, height, std);
    }
    return result;
}

const defaults$7 = {
    ...baseLayerDefaultSettings,
    std: null,
};
class Random extends Model {
    constructor(settings) {
        super();
        this.settings = { ...defaults$7, ...settings };
        this.setupPraxis();
        this.validate();
        if (!this.weights) {
            this.weights = randos2D(this.width, this.height, settings.std);
        }
        if (!this.deltas) {
            this.deltas = zeros2D(this.width, this.height);
        }
    }
    predict() { }
    compare() { }
}
function random(settings) {
    return new Random(settings);
}

function predict$7(weights1, weights2) {
    let sum = 0;
    for (let i = 0; i < this.constants.size; i++) {
        sum += weights1[this.thread.y][i] * weights2[i][this.thread.x];
    }
    return sum;
}
function compareFromX(deltas, inputDeltas, inputWeights) {
    let sum = inputDeltas[this.thread.y][this.thread.x];
    for (let i = 0; i < this.constants.size; i++) {
        sum += deltas[this.thread.y][i] * inputWeights[this.thread.x][i];
    }
    return sum;
}
function compareFromY(deltas, inputDeltas, inputWeights) {
    let sum = inputDeltas[this.thread.y][this.thread.x];
    for (let i = 0; i < this.constants.size; i++) {
        sum += deltas[i][this.thread.x] * inputWeights[i][this.thread.y];
    }
    return sum;
}
class Multiply extends Operator {
    constructor() {
        super(...arguments);
        this.compareKernel1 = null;
        this.compareKernel2 = null;
    }
    get width() {
        return this.inputLayer2.width;
    }
    set width(width) {
        throw new Error('Cannot set width on Multiply');
    }
    get height() {
        return this.inputLayer1.height;
    }
    set height(height) {
        throw new Error('Cannot set height on Multiply');
    }
    get depth() {
        return this.inputLayer1.depth;
    }
    set depth(depth) {
        throw new Error('Cannot set depth on Multiply');
    }
    validate() {
        super.validate();
        if (this.inputLayer1.width !== this.inputLayer2.height) {
            throw new Error(`Layer width mismatch of ${this.inputLayer1.width} and ${this.inputLayer2.height}`);
        }
    }
    setupKernels() {
        this.predictKernel = makeKernel(predict$7, {
            output: [this.width, this.height],
            constants: {
                size: this.inputLayer2.height,
            },
            immutable: true,
        });
        this.compareKernel1 = makeKernel(compareFromX, {
            output: [this.inputLayer1.width, this.inputLayer1.height],
            constants: {
                size: this.inputLayer2.width,
            },
            immutable: true,
        });
        this.compareKernel2 = makeKernel(compareFromY, {
            output: [this.inputLayer2.width, this.inputLayer2.height],
            constants: {
                size: this.inputLayer1.height,
            },
            immutable: true,
        });
    }
    reuseKernels(layer) {
        super.reuseKernels(layer);
        this.compareKernel1 = layer.compareKernel1;
        this.compareKernel2 = layer.compareKernel2;
    }
    predict() {
        release(this.weights);
        if (!this.predictKernel)
            throw new Error('this.predictKernel is not set');
        this.weights = this.predictKernel(this.inputLayer1.weights, this.inputLayer2.weights);
    }
    compare() {
        if (!this.compareKernel1)
            throw new Error('this.compareKernel1 not set');
        if (!this.compareKernel2)
            throw new Error('this.compareKernel2 not set');
        const inputLayer1Deltas = this.inputLayer1.deltas;
        const inputLayer2Deltas = this.inputLayer2.deltas;
        const newDeltas1 = this.compareKernel1(this.deltas, this.inputLayer1.deltas, this.inputLayer2.weights);
        const newDeltas2 = this.compareKernel2(this.deltas, this.inputLayer2.deltas, this.inputLayer1.weights);
        this.inputLayer2.deltas = newDeltas2;
        this.inputLayer1.deltas = newDeltas1;
        release(inputLayer1Deltas);
        release(inputLayer2Deltas);
    }
    setupPraxis() { }
    toJSON() {
        return {
            ...super.toJSON(),
            width: this.width,
            height: this.height,
        };
    }
}
function multiply$1(inputLayer1, inputLayer2, settings) {
    return new Multiply(inputLayer1, inputLayer2, settings);
}

function predict2D$4(inputs) {
    return 1 / (1 + Math.exp(-inputs[this.thread.y][this.thread.x]));
}
function predict3D$5(inputs) {
    return (1 / (1 + Math.exp(-inputs[this.thread.z][this.thread.y][this.thread.x])));
}
function compare2D$4(weights, deltas) {
    const weight = weights[this.thread.y][this.thread.x];
    const delta = deltas[this.thread.y][this.thread.x];
    return weight * (1 - weight) * delta;
}
function compare3D$4(weights, deltas) {
    const weight = weights[this.thread.z][this.thread.y][this.thread.x];
    const delta = deltas[this.thread.z][this.thread.y][this.thread.x];
    return weight * (1 - weight) * delta;
}
class Sigmoid extends Activation {
    setupKernels() {
        if (this.depth > 0) {
            this.predictKernel = makeKernel(predict3D$5, {
                output: [this.width, this.height, this.depth],
                functions: [activate$2],
                immutable: true,
            });
            this.compareKernel = makeKernel(compare3D$4, {
                output: [this.width, this.height, this.depth],
                functions: [measure$2],
                immutable: true,
            });
        }
        else {
            this.predictKernel = makeKernel(predict2D$4, {
                output: [this.width, this.height],
                functions: [activate$2],
                immutable: true,
            });
            this.compareKernel = makeKernel(compare2D$4, {
                output: [this.width, this.height],
                functions: [measure$2],
                immutable: true,
            });
        }
    }
    predict() {
        release(this.weights);
        this.weights = this.predictKernel(this.inputLayer.weights);
    }
    compare() {
        release(this.inputLayer.deltas);
        this.inputLayer.deltas = this.compareKernel(this.weights, this.deltas);
    }
    learn(learningRate) { }
}
function sigmoid$1(inputLayer, settings) {
    return new Sigmoid(inputLayer, settings);
}

function arthurFeedForward(settings, inputLayer) {
    const { height } = settings;
    function initWeightsPraxis(layerTemplate, settings) {
        const praxis = arthurDeviationWeights(layerTemplate, settings);
        praxis.setupKernels();
        return praxis;
    }
    function initBiasesPraxis(layerTemplate, settings) {
        const praxis = arthurDeviationBiases(layerTemplate, settings);
        praxis.setupKernels();
        return praxis;
    }
    const weightsLayer = random({
        id: 'weights',
        height,
        width: inputLayer.height,
        initPraxis: initWeightsPraxis,
    });
    const biasesLayer = random({
        id: 'biases',
        height,
        initPraxis: initBiasesPraxis,
    });
    const multiplyLayer = multiply$1(weightsLayer, inputLayer);
    const addLayer = add$1(multiplyLayer, biasesLayer);
    const sigmoidLayer = sigmoid$1(addLayer);
    const weightsPraxis = weightsLayer.praxis;
    weightsPraxis.weightsLayer = weightsLayer;
    weightsPraxis.incomingLayer = inputLayer;
    weightsPraxis.deltaLayer = sigmoidLayer;
    return sigmoidLayer;
}

function getStride(settings, defaults) {
    if (typeof settings.stride === 'number') {
        return { strideX: settings.stride, strideY: settings.stride };
    }
    else {
        let strideX = defaults.stride;
        let strideY = defaults.stride;
        if (typeof settings.strideX === 'number') {
            strideX = settings.strideX;
        }
        if (typeof settings.strideY === 'number') {
            strideY = settings.strideY;
        }
        return { strideX, strideY };
    }
}
function getPadding(settings, defaults) {
    if (typeof settings.padding === 'number') {
        return { paddingX: settings.padding, paddingY: settings.padding };
    }
    else {
        let paddingX = defaults.padding;
        let paddingY = defaults.padding;
        if (typeof settings.paddingX === 'number') {
            paddingX = settings.paddingX;
        }
        if (typeof settings.paddingY === 'number') {
            paddingY = settings.paddingY;
        }
        return { paddingX, paddingY };
    }
}

/**
 * Returns an array of a given size with each element filled with a single value
 */
function values(size, value) {
    return new Float32Array(size).fill(value);
}

function predict$6(inputs, filters, biases) {
    const startFilterX = this.constants.paddingX - this.thread.x * this.constants.strideX;
    const startInputX = this.thread.x * this.constants.strideX - this.constants.paddingX;
    const endFilterX = Math.min(this.constants.filterWidth, startFilterX + this.constants.inputWidth);
    const startFilterY = this.constants.paddingY - this.thread.y * this.constants.strideY;
    const startInputY = this.thread.y * this.constants.strideY - this.constants.paddingY;
    const endFilterY = Math.min(this.constants.filterHeight, startFilterY + this.constants.inputHeight);
    let sum = 0;
    for (let z = 0; z < this.constants.inputDepth; z++) {
        for (let filterY = Math.max(0, startFilterY), inputY = Math.max(0, startInputY); filterY < endFilterY; filterY++, inputY++) {
            for (let filterX = Math.max(0, startFilterX), inputX = Math.max(0, startInputX); filterX < endFilterX; filterX++, inputX++) {
                sum += filters[z][filterY][filterX] * inputs[z][inputY][inputX];
            }
        }
    }
    return sum + biases[this.thread.z];
}
function compareFilterDeltas$1(filterDeltas, inputs, deltas) {
    const startDeltaX = Math.max(0, Math.ceil((this.constants.paddingX - this.thread.x) / this.constants.strideX));
    const startInputX = startDeltaX * this.constants.strideX +
        this.thread.x -
        this.constants.paddingX;
    const endDeltaX = Math.min(this.constants.deltaWidth, Math.floor((this.constants.inputWidth -
        1 -
        this.thread.x +
        this.constants.paddingX) /
        this.constants.strideX) + 1);
    const startDeltaY = Math.max(0, Math.ceil((this.constants.paddingY - this.thread.y) / this.constants.strideY));
    const startInputY = startDeltaY * this.constants.strideY +
        this.thread.y -
        this.constants.paddingY;
    const endDeltaY = Math.min(this.constants.deltaHeight, Math.floor((this.constants.inputHeight -
        1 -
        this.thread.y +
        this.constants.paddingY) /
        this.constants.strideY) + 1);
    let sum = filterDeltas[this.thread.z][this.thread.y][this.thread.x];
    for (let deltaY = startDeltaY, inputY = startInputY; deltaY < endDeltaY; deltaY++, inputY += this.constants.strideY) {
        for (let deltaX = startDeltaX, inputX = startInputX; deltaX < endDeltaX; deltaX++, inputX += this.constants.strideX) {
            sum +=
                inputs[this.thread.z][inputY][inputX] *
                    deltas[this.constants.deltaZ][deltaY][deltaX];
        }
    }
    return sum;
}
function compareInputDeltas$1(inputDeltas, filters, deltas) {
    const x = this.thread.x + this.constants.paddingX;
    const startDeltaX = x < this.constants.filterWidth
        ? 0
        : Math.floor((x - this.constants.filterWidth + this.constants.strideX) /
            this.constants.strideX);
    const startFilterX = x - startDeltaX * this.constants.strideX;
    const endDeltaX = Math.min(startDeltaX + Math.floor(startFilterX / this.constants.strideX) + 1, this.constants.deltaWidth);
    const y = this.thread.y + this.constants.paddingY;
    const startDeltaY = y < this.constants.filterHeight
        ? 0
        : Math.floor((y - this.constants.filterHeight + this.constants.strideY) /
            this.constants.strideY);
    const startFilterY = y - startDeltaY * this.constants.strideY;
    const endDeltaY = Math.min(startDeltaY + Math.floor(startFilterY / this.constants.strideY) + 1, this.constants.deltaHeight);
    let sum = inputDeltas[this.thread.z][this.thread.y][this.thread.x];
    let deltaY = startDeltaY;
    for (let filterY = startFilterY; deltaY < endDeltaY; filterY -= this.constants.strideY, deltaY++) {
        let deltaX = startDeltaX;
        for (let filterX = startFilterX; deltaX < endDeltaX; filterX -= this.constants.strideX, deltaX++) {
            sum +=
                filters[this.thread.z][filterY][filterX] *
                    deltas[this.constants.deltaZ][deltaY][deltaX];
        }
    }
    return sum;
}
function compareBiases$1(biasDeltas, deltas) {
    let sum = 0;
    for (let y = 0; y < this.constants.deltaHeight; y++) {
        for (let x = 0; x < this.constants.deltaWidth; x++) {
            sum += deltas[this.thread.z][y][x];
        }
    }
    return biasDeltas[this.thread.z][this.thread.y][this.thread.x] + sum;
}
const defaults$6 = {
    stride: 0,
    padding: 0,
    bias: 0.1,
    filterCount: 1,
    filterWidth: 0,
    filterHeight: 0,
};
class Convolution extends Filter {
    constructor(settings, inputLayer) {
        var _a, _b, _c;
        super(settings, inputLayer);
        this.compareFilterDeltasKernel = null;
        this.compareInputDeltasKernel = null;
        this.compareBiasesKernel = null;
        this.settings = {
            ...defaults$6,
            ...settings,
            ...getPadding(settings, defaults$6),
            ...getStride(settings, defaults$6),
        };
        this.weights = (_a = settings.weights) !== null && _a !== void 0 ? _a : randos3D(this.width, this.height, this.depth);
        this.deltas = zeros3D(this.width, this.height, this.depth);
        this.biases = values(this.depth, this.bias);
        this.biasDeltas = (_b = settings.biasDeltas) !== null && _b !== void 0 ? _b : randos(this.depth);
        this.filters = (_c = settings.filters) !== null && _c !== void 0 ? _c : randos3D(this.filterWidth, this.filterHeight, this.filterCount);
        this.filterDeltas = zeros3D(this.filterWidth, this.filterHeight, this.filterCount);
        this.validate();
    }
    get strideX() {
        return this.settings.strideX;
    }
    get strideY() {
        return this.settings.strideY;
    }
    get paddingX() {
        return this.settings.paddingX;
    }
    get paddingY() {
        return this.settings.paddingX;
    }
    get width() {
        return Math.floor((this.inputLayer.width + this.paddingX * 2 - this.filterWidth) /
            this.strideX +
            1);
    }
    get height() {
        return Math.floor((this.inputLayer.height + this.paddingY * 2 - this.filterHeight) /
            this.strideY +
            1);
    }
    get bias() {
        return this.settings.bias;
    }
    get depth() {
        return this.filterCount;
    }
    get biases() {
        return this.settings.biases;
    }
    set biases(biases) {
        this.settings.biases = biases;
    }
    get biasDeltas() {
        return this.settings.biasDeltas;
    }
    set biasDeltas(weights) {
        this.settings.biasDeltas = weights;
    }
    get filters() {
        return this.settings.filters;
    }
    set filters(filters) {
        this.settings.filters = filters;
    }
    get filterDeltas() {
        return this.settings.filterDeltas;
    }
    set filterDeltas(filterDeltas) {
        this.settings.filterDeltas = filterDeltas;
    }
    setupKernels() {
        this.predictKernel = makeKernel(predict$6, {
            constants: {
                inputWidth: this.inputLayer.width,
                inputHeight: this.inputLayer.height,
                inputDepth: this.inputLayer.depth,
                strideX: this.strideX,
                strideY: this.strideY,
                paddingX: this.paddingX,
                paddingY: this.paddingY,
                filterWidth: this.filterWidth,
                filterHeight: this.filterHeight,
            },
            output: [this.width, this.height, this.depth],
            immutable: true,
        });
        this.compareFilterDeltasKernel = makeKernel(compareFilterDeltas$1, {
            constants: {
                deltaWidth: this.width,
                deltaHeight: this.height,
                deltaZ: this.depth,
                inputWidth: this.inputLayer.width,
                inputHeight: this.inputLayer.height,
                inputDepth: this.inputLayer.depth,
                strideX: this.strideX,
                strideY: this.strideY,
                paddingX: this.paddingX,
                paddingY: this.paddingY,
                filterWidth: this.filterWidth,
                filterHeight: this.filterHeight,
            },
            output: [this.width, this.height, this.depth],
            immutable: true,
        });
        this.compareInputDeltasKernel = makeKernel(compareInputDeltas$1, {
            constants: {
                deltaWidth: this.width,
                deltaHeight: this.height,
                deltaZ: this.depth,
                strideX: this.strideX,
                strideY: this.strideY,
                paddingX: this.paddingX,
                paddingY: this.paddingY,
                filterWidth: this.filterWidth,
                filterHeight: this.filterHeight,
                filterCount: this.filterCount,
            },
            output: [
                this.inputLayer.width,
                this.inputLayer.height,
                this.inputLayer.depth,
            ],
            immutable: true,
        });
        this.compareBiasesKernel = makeKernel(compareBiases$1, {
            output: [1, 1, this.depth],
            constants: {
                deltaWidth: this.width,
                deltaHeight: this.height,
            },
            immutable: true,
        });
    }
    predict() {
        this.weights = this.predictKernel(this.inputLayer.weights, this.filters, this.biases);
    }
    compare() {
        const { filterDeltas, biasDeltas } = this;
        this.filterDeltas = this.compareFilterDeltasKernel(filterDeltas, this.inputLayer.weights, this.deltas);
        release(filterDeltas);
        this.biasDeltas = this.compareBiasesKernel(biasDeltas, this.deltas);
        release(biasDeltas);
        release(this.deltas);
        this.deltas = this.compareInputDeltasKernel(this.filters, this.inputLayer.deltas);
        release(this.inputLayer.deltas);
        // TODO: do we need to clone here?
        this.inputLayer.deltas = clone(this.deltas);
    }
    learn(learningRate) {
        // TODO: handle filters
        // TODO: do we need to release here?
        const { weights: oldWeights } = this;
        this.weights = this.praxis.run(this, learningRate);
        release(oldWeights);
    }
}
function convolution(settings, inputLayer) {
    return new Convolution(settings, inputLayer);
}

function setDropout(dropout) {
    return dropout;
}
function trainingPredict(inputs) {
    if (setDropout(Math.random()) < this.constants.probability) {
        return 0;
    }
    return inputs[this.thread.y][this.thread.x];
}
function predict$5(inputs) {
    return inputs[this.thread.y][this.thread.x] * this.constants.probability;
}
function compare$3(dropouts, deltas) {
    if (dropouts[this.thread.y][this.thread.x] === 0) {
        return 0;
    }
    return deltas[this.thread.y][this.thread.x];
}
const dropoutDefaults = {
    ...baseLayerDefaultSettings,
    probability: 0.5,
};
class Dropout extends Filter {
    constructor(inputLayer, settings) {
        super(settings, inputLayer);
        this.predictKernelMap = null;
        this.settings = { ...dropoutDefaults, ...settings };
        this.dropouts = null;
        this.validate();
    }
    setupKernels(isTraining) {
        const output = [this.width, this.height];
        if (isTraining) {
            this.predictKernelMap = makeKernelMap({ dropouts: setDropout }, trainingPredict, {
                output,
                immutable: true,
            });
            this.compareKernel = makeKernel(compare$3, { output, immutable: true });
        }
        else {
            this.predictKernelMap = makeKernelMap({}, predict$5, { output, immutable: true });
        }
    }
    predict() {
        release(this.weights);
        if (this.dropouts) {
            release(this.dropouts);
        }
        const { result, dropouts } = this
            .predictKernelMap(this.inputLayer.weights);
        this.weights = result;
        this.dropouts = dropouts;
    }
    compare() {
        release(this.deltas);
        this.deltas = this.compareKernel(this.dropouts, this.inputLayer.deltas);
    }
}
function dropout(inputLayer, settings) {
    return new Dropout(inputLayer, settings);
}

function feedForward(settings, input) {
    const { height, praxisOpts = null } = settings;
    const weights = random({
        id: 'weights',
        height,
        width: input.height,
        praxisOpts,
    });
    const biases = random({ id: 'biases', height, praxisOpts });
    return sigmoid$1(add$1(multiply$1(weights, input, { praxisOpts }), biases, { praxisOpts }), { praxisOpts });
}

function predict$4(inputs, filters, biases) {
    let output = 0;
    let i = 0;
    for (let y = 0; y < this.constants.inputHeight; y++) {
        for (let x = 0; x < this.constants.inputWidth; x++) {
            output += inputs[y][x] * filters[this.thread.x][i];
            i++;
        }
    }
    return output + biases[this.thread.x];
}
function predict3D$4(inputs, filters, biases) {
    let output = 0;
    let i = 0;
    for (let z = 0; z < this.constants.inputDepth; z++) {
        for (let y = 0; y < this.constants.inputHeight; y++) {
            for (let x = 0; x < this.constants.inputWidth; x++) {
                output += inputs[z][y][x] * filters[this.thread.x][i];
                i++;
            }
        }
    }
    return output + biases[this.thread.x];
}
function compareInputDeltas(inputDeltas, deltas, filters) {
    let sum = 0;
    const filterX = this.thread.x + this.thread.y * this.output.x;
    for (let filterY = 0; filterY < this.constants.filterCount; filterY++) {
        sum += filters[filterY][filterX] * deltas[0][filterY];
    }
    return sum + inputDeltas[this.thread.y][this.thread.x];
}
function compareInputDeltas3D(inputDeltas, deltas, filters) {
    let sum = 0;
    const filterX = this.thread.x + this.thread.y * this.output.x;
    for (let filterY = 0; filterY < this.constants.filterCount; filterY++) {
        sum += filters[filterY][filterX] * deltas[0][filterY];
    }
    return sum + inputDeltas[this.thread.z][this.thread.y][this.thread.x];
}
function compareBiases(biases, deltas) {
    return biases[this.thread.x] + deltas[this.thread.y][this.thread.x];
}
function compareFilterDeltas(filterDeltas, inputWeights, deltas) {
    return (filterDeltas[this.thread.y][this.thread.x] +
        inputWeights[this.thread.y][this.thread.x] *
            deltas[this.constants.deltaY][this.constants.deltaX]);
}
function compareFilterDeltas3D(filterDeltas, inputWeights, deltas) {
    const inputZ = Math.floor(this.thread.x / (this.constants.inputWidth * this.constants.inputHeight));
    const inputY = Math.floor((this.thread.x -
        inputZ * this.constants.inputWidth * this.constants.inputHeight) /
        this.constants.inputWidth);
    const inputX = this.thread.x -
        this.constants.inputWidth * (inputY + this.constants.inputHeight * inputZ);
    return (filterDeltas[this.thread.y][this.thread.x] +
        inputWeights[inputZ][inputY][inputX] * deltas[0][this.thread.y]);
}
class FullyConnected extends Filter {
    constructor(settings, inputLayer) {
        super(settings, inputLayer);
        this.compareFilterDeltasKernel = null;
        this.compareInputDeltasKernel = null;
        this.compareBiasesKernel = null;
        this.settings = { ...settings };
        this.validate();
        const connectionCount = inputLayer.width * inputLayer.height * inputLayer.depth;
        this.biases = values(this.height, this.bias);
        this.biasDeltas = zeros$1(this.height);
        this.filters = randos2D(connectionCount, this.height);
        this.filterDeltas = zeros2D(connectionCount, this.height);
        if (this.depth > 0) {
            this.weights = randos3D(this.width, this.height, this.depth);
            this.deltas = zeros3D(this.width, this.height, this.depth);
        }
        else if (this.height > 0) {
            this.weights = randos2D(this.width, this.height);
            this.deltas = zeros2D(this.width, this.height);
        }
    }
    get bias() {
        return this.settings.bias;
    }
    get biases() {
        return this.settings.biases;
    }
    set biases(biases) {
        this.settings.biases = biases;
    }
    get biasDeltas() {
        return this.settings.biases;
    }
    set biasDeltas(biasDeltas) {
        this.settings.biasDeltas = biasDeltas;
    }
    validate() {
        super.validate();
        if (this.depth > 0)
            throw new Error('depth not supported');
    }
    setupKernels() {
        const { inputLayer } = this;
        const connectionCount = inputLayer.width * inputLayer.height * inputLayer.depth;
        if (inputLayer.depth > 0) {
            this.predictKernel = makeKernel(predict3D$4, {
                output: [this.width, this.height],
                constants: {
                    inputHeight: inputLayer.height,
                    inputWidth: inputLayer.width,
                    inputDepth: inputLayer.depth,
                },
            });
            this.compareFilterDeltasKernel = makeKernel(compareFilterDeltas3D, {
                output: [connectionCount, this.height],
                constants: {
                    deltaX: 0,
                    deltaY: 0,
                    inputWidth: inputLayer.width,
                    inputHeight: inputLayer.height,
                },
                immutable: true,
            });
            this.compareInputDeltasKernel = makeKernel(compareInputDeltas3D, {
                output: [inputLayer.width, inputLayer.height, inputLayer.depth],
                constants: {
                    filterCount: this.height,
                },
                immutable: true,
            });
        }
        else {
            this.predictKernel = makeKernel(predict$4, {
                output: [this.width, this.height],
                constants: {
                    inputHeight: inputLayer.height,
                    inputWidth: inputLayer.width,
                },
            });
            this.compareFilterDeltasKernel = makeKernel(compareFilterDeltas, {
                output: [connectionCount, this.height],
                constants: {
                    deltaX: 0,
                    deltaY: 0,
                    inputWidth: inputLayer.width,
                    inputHeight: inputLayer.height,
                },
            });
            this.compareInputDeltasKernel = makeKernel(compareInputDeltas, {
                output: [inputLayer.width, inputLayer.height],
                constants: {
                    filterCount: this.height,
                },
            });
        }
        this.compareBiasesKernel = makeKernel(compareBiases, {
            output: [this.width, this.height],
        });
    }
    predict() {
        this.weights = this.predictKernel(this.inputLayer.weights, this.filters, this.biases);
    }
    compare() {
        const inputLayerDeltas = this.inputLayer.deltas;
        this.inputLayer.deltas = this
            .compareInputDeltasKernel(inputLayerDeltas, this.deltas, this.filters);
        release(inputLayerDeltas);
        const { biasDeltas, filterDeltas } = this;
        // TODO: handle biasDeltas learn
        this.biasDeltas = this.compareBiasesKernel(this.biases, this.deltas);
        // TODO: handle filterDeltas learn
        this.filterDeltas = this.compareFilterDeltasKernel(filterDeltas, this.inputLayer.weights, this.deltas);
        release(biasDeltas);
        release(filterDeltas);
    }
}
function fullyConnected(settings, inputLayer) {
    return new FullyConnected(settings, inputLayer);
}

function predict$3(weights) {
    return -weights[this.thread.y][this.thread.x];
}
class Negative extends Modifier {
    constructor(inputLayer, settings) {
        super(inputLayer, settings);
        this.validate();
    }
    setupKernels() {
        this.predictKernel = makeKernel(predict$3, {
            output: [this.width, this.height],
        });
    }
    predict() {
        this.weights = this.predictKernel(this.inputLayer.weights);
    }
}
function negative(inputLayer, settings) {
    return new Negative(inputLayer, settings);
}

function predict$2(inputLayerWeights1, inputLayerWeights2) {
    return (inputLayerWeights1[this.thread.y][this.thread.x] *
        inputLayerWeights2[this.thread.y][this.thread.x]);
}
function compare$2(weights, deltas) {
    return (weights[this.thread.y][this.thread.x] * deltas[this.thread.y][this.thread.x]);
}
class MultiplyElement extends Operator {
    get width() {
        return this.inputLayer1.width;
    }
    get height() {
        return this.inputLayer1.height;
    }
    get depth() {
        return this.inputLayer1.depth;
    }
    validate() {
        super.validate();
        checkSameSize(this.inputLayer1, this.inputLayer2);
    }
    setupKernels() {
        this.predictKernel = makeKernel(predict$2, {
            output: [this.width, this.height],
            immutable: true,
        });
        this.compareKernel = makeKernel(compare$2, {
            output: [this.width, this.height],
            immutable: true,
        });
    }
    predict() {
        release(this.weights);
        this.weights = this.predictKernel(this.inputLayer1.weights, this.inputLayer2.weights);
    }
    compare() {
        release(this.inputLayer1.deltas);
        release(this.inputLayer2.deltas);
        this.inputLayer1.deltas = this.compareKernel(this.inputLayer2.weights, this.deltas);
        this.inputLayer2.deltas = this.compareKernel(this.inputLayer1.weights, this.deltas);
    }
}
function multiplyElement$1(inputLayer1, inputLayer2, settings) {
    return new MultiplyElement(inputLayer1, inputLayer2, settings);
}

function ones$1(size) {
    return new Float32Array(size).fill(1);
}
function ones2D(width, height) {
    const result = new Array(height);
    for (let y = 0; y < height; y++) {
        result[y] = ones$1(width);
    }
    return result;
}

class Ones extends Model {
    constructor(settings) {
        super(settings);
        this.validate();
        this.weights = ones2D(this.width, this.height);
        this.deltas = zeros2D(this.width, this.height);
    }
}
function ones(settings) {
    return new Ones(settings);
}

function predict2D$3(inputs) {
    return activate$1(inputs[this.thread.y][this.thread.x]);
}
function predict3D$3(inputs) {
    return activate$1(inputs[this.thread.z][this.thread.y][this.thread.x]);
}
function compare2D$3(weights, errors) {
    return measure$1(weights[this.thread.y][this.thread.x], errors[this.thread.y][this.thread.x]);
}
function compare3D$3(weights, errors) {
    return measure$1(weights[this.thread.z][this.thread.y][this.thread.x], errors[this.thread.z][this.thread.y][this.thread.x]);
}
class Tanh extends Activation {
    setupKernels() {
        if (this.depth > 0) {
            this.predictKernel = makeKernel(predict3D$3, {
                output: [this.width, this.height, this.depth],
                functions: [activate$1],
                immutable: true,
            });
            this.compareKernel = makeKernel(compare3D$3, {
                output: [this.width, this.height, this.depth],
                functions: [measure$1],
                immutable: true,
            });
        }
        else {
            this.predictKernel = makeKernel(predict2D$3, {
                output: [this.width, this.height],
                functions: [activate$1],
                immutable: true,
            });
            this.compareKernel = makeKernel(compare2D$3, {
                output: [this.width, this.height],
                functions: [measure$1],
                immutable: true,
            });
        }
    }
    predict() {
        release(this.weights);
        this.weights = this.predictKernel(this.inputLayer.weights);
    }
    compare() {
        release(this.inputLayer.deltas);
        this.inputLayer.deltas = this.compareKernel(this.weights, this.deltas);
    }
}
function tanh$1(inputLayer, settings) {
    return new Tanh(inputLayer, settings);
}

class Zeros extends Model {
    constructor(settings) {
        super(settings);
        this.validate();
        this.weights = zeros2D(this.width, this.height);
        this.deltas = zeros2D(this.width, this.height);
    }
    predict() {
        // throw new Error(`${this.constructor.name}-predict is not yet implemented`)
    }
    compare() {
        // throw new Error(`${this.constructor.name}-compare is not yet implemented`)
    }
}
function zeros(settings) {
    return new Zeros(settings);
}

function gru(settings, recurrentInput, input) {
    const { height } = settings;
    const updateGateWeights = random({ height, width: input.height });
    const updateGatePeepholes = random({ width: height, height });
    const updateGateBias = zeros({ height });
    const updateGate = sigmoid$1(add$1(add$1(multiply$1(updateGateWeights, input), multiply$1(updateGatePeepholes, recurrentInput)), updateGateBias));
    const resetGateWeights = random({ height, width: input.height });
    const resetGatePeepholes = random({ width: height, height });
    const resetGateBias = zeros({ height });
    const resetGate = sigmoid$1(add$1(add$1(multiply$1(resetGateWeights, input), multiply$1(resetGatePeepholes, recurrentInput)), resetGateBias));
    const cellWeights = random({ height, width: input.height });
    const cellPeepholes = random({ width: height, height });
    const cellBias = zeros({ height });
    const cell = tanh$1(add$1(add$1(multiply$1(cellWeights, input), multiply$1(cellPeepholes, multiplyElement$1(resetGate, recurrentInput))), cellBias));
    // compute hidden state as gated, saturated cell activations
    // negate updateGate
    return add$1(multiplyElement$1(add$1(ones({ width: updateGate.width, height: updateGate.height }), negative(updateGate)), cell), multiplyElement$1(recurrentInput, updateGate));
}

const defaults$5 = {
    weights: null,
};
class Input extends EntryPoint {
    constructor(settings) {
        super({ ...defaults$5, ...settings });
        this.reshapeInput = null;
        this.validate();
        this.reshapeInput = null;
        this.deltas = zeros2D(this.width, this.height);
    }
    setupKernels() {
        if (this.width === 1) {
            this.predict = this.predict1D;
            this.reshapeInput = makeKernel(function (value) {
                return value[this.thread.y];
            }, {
                output: [1, this.height],
                immutable: true,
            });
        }
    }
    reuseKernels(layer) {
        // super.reuseKernels(layer);
        this.reshapeInput = layer.reshapeInput;
    }
    predict(inputs) {
        if ((Array.isArray(inputs) || inputs instanceof Float32Array) &&
            typeof inputs[0] === 'number' &&
            inputs.length === this.height * this.width) {
            release(this.weights);
            this.weights = kernelInput(inputs, [this.width, this.height]);
        }
        else if (Array.isArray(inputs) &&
            inputs.length === this.height &&
            (Array.isArray(inputs[0]) || inputs[0] instanceof Float32Array) &&
            inputs[0].length === this.width) {
            this.weights = clone(inputs);
        }
        else {
            throw new Error('Inputs are not of sized correctly');
        }
    }
    predict1D(inputs) {
        if (this.weights)
            release(this.weights);
        if (this.reshapeInput) {
            this.weights = this.reshapeInput(inputs);
        }
        else {
            this.weights = inputs;
        }
    }
    compare() {
        // throw new Error(`${this.constructor.name}-compare is not yet implemented`)
    }
    learn() { }
}
function input(settings) {
    return new Input(settings);
}

function predict2D$2(inputs) {
    return activate(inputs[this.thread.y][this.thread.x]);
}
function predict3D$2(inputs) {
    return activate(inputs[this.thread.z][this.thread.y][this.thread.x]);
}
function compare2D$2(weights, deltas) {
    return measure(weights[this.thread.y][this.thread.x], deltas[this.thread.y][this.thread.x]);
}
function compare3D$2(weights, deltas) {
    return measure(weights[this.thread.z][this.thread.y][this.thread.x], deltas[this.thread.z][this.thread.y][this.thread.x]);
}
class LeakyRelu extends Activation {
    setupKernels() {
        const { width, height, depth } = this.inputLayer;
        if (this.depth > 0) {
            this.predictKernel = makeKernel(predict3D$2, {
                output: [width, height, depth],
                functions: [activate],
                immutable: true,
            });
            this.compareKernel = makeKernel(compare3D$2, {
                output: [width, height, depth],
                functions: [measure],
                immutable: true,
            });
        }
        else {
            this.predictKernel = makeKernel(predict2D$2, {
                output: [width, height],
                functions: [activate],
                immutable: true,
            });
            this.compareKernel = makeKernel(compare2D$2, {
                output: [width, height],
                functions: [measure],
                immutable: true,
            });
        }
    }
    predict() {
        release(this.weights);
        this.weights = this.predictKernel(this.inputLayer.weights);
    }
    compare() {
        const { deltas } = this;
        this.deltas = this.compareKernel(this.weights, deltas);
        release(deltas);
    }
}
function leakyRelu(inputLayer, settings) {
    return new LeakyRelu(inputLayer, settings);
}

function lstmCell(settings, input, recurrentInput) {
    const { height } = settings;
    if (typeof height !== 'number') {
        throw new Error('no settings.height given');
    }
    if (recurrentInput.setDimensions) {
        recurrentInput.setDimensions(1, height);
    }
    const inputGateWeights = random({
        width: input.height,
        height,
        std: 0.08,
        id: 'inputGateWeights',
    });
    const inputGatePeepholes = random({
        width: height,
        height,
        std: 0.08,
        id: 'inputGatePeepholes',
    });
    const inputGateBias = zeros({ width: 1, height, id: 'inputGateBias' });
    const inputGate = sigmoid$1(add$1(add$1(multiply$1(inputGateWeights, input), multiply$1(inputGatePeepholes, recurrentInput)), inputGateBias), { id: 'inputGate' });
    const forgetGateWeights = random({
        width: input.height,
        height,
        std: 0.08,
        id: 'forgetGateWeights',
    });
    const forgetGatePeepholes = random({
        width: height,
        height,
        std: 0.08,
        id: 'forgetGatePeepholes',
    });
    const forgetGateBias = zeros({ width: 1, height, id: 'forgetGateBias' });
    const forgetGate = sigmoid$1(add$1(add$1(multiply$1(forgetGateWeights, input), multiply$1(forgetGatePeepholes, recurrentInput)), forgetGateBias), { id: 'forgetGate' });
    const outputGateWeights = random({
        width: input.height,
        height,
        std: 0.08,
        id: 'outputGateWeights',
    });
    const outputGatePeepholes = random({
        width: height,
        height,
        std: 0.08,
        id: 'outputGatePeepholes',
    });
    const outputGateBias = zeros({ width: 1, height, id: 'outputGateBias' });
    const outputGate = sigmoid$1(add$1(add$1(multiply$1(outputGateWeights, input), multiply$1(outputGatePeepholes, recurrentInput)), outputGateBias), { id: 'outputGate' });
    const memoryWeights = random({
        width: input.height,
        height,
        std: 0.08,
        id: 'memoryWeights',
    });
    const memoryPeepholes = random({
        width: height,
        height,
        std: 0.08,
        id: 'memoryPeepholes',
    });
    const memoryBias = zeros({ width: 1, height, id: 'memoryBias' });
    const memory = tanh$1(add$1(add$1(multiply$1(memoryWeights, input), multiply$1(memoryPeepholes, recurrentInput)), memoryBias), { id: 'memory' });
    // compute new cell activation
    const retainCell = multiplyElement$1(forgetGate, recurrentInput, {
        id: 'retainCell',
    }); // what do we keep from cell
    const writeCell = multiplyElement$1(inputGate, memory, { id: 'writeCell' }); // what do we write to cell
    const cell = add$1(retainCell, writeCell, { id: 'cell' }); // new cell contents
    // compute hidden state as gated, saturated cell activations
    return multiplyElement$1(outputGate, tanh$1(cell), { id: 'activations' });
}

function output(settings, inputLayer) {
    const { height } = settings;
    const outputGate = random({
        height,
        width: inputLayer.height,
        id: 'outputGate',
        std: 0.08,
    });
    const output = random({ height, id: 'output', std: 0.08 });
    const outputGateConnector = multiply$1(outputGate, inputLayer, {
        id: 'outputGateConnected',
    });
    return target({ id: 'target', ...settings }, add$1(outputGateConnector, output));
}

function setSwitchY(value) {
    return value;
}
function setSwitchX(value) {
    return value;
}
function predict$1(inputs) {
    // Ends are exclusive, that is if end=4, the last item is 3
    const unclippedStartInputX = this.thread.x * this.constants.strideX - this.constants.paddingX;
    const unclippedStartInputY = this.thread.y * this.constants.strideY - this.constants.paddingY;
    const unclippedEndInputX = unclippedStartInputX + this.constants.filterWidth;
    const unclippedEndInputY = unclippedStartInputY + this.constants.filterHeight;
    const startInputX = Math.max(unclippedStartInputX, 0);
    const startInputY = Math.max(unclippedStartInputY, 0);
    const endInputX = Math.min(unclippedEndInputX, this.constants.inputWidth);
    const endInputY = Math.min(unclippedEndInputY, this.constants.inputHeight);
    let largestValue = inputs[this.thread.z][startInputY][startInputX];
    for (let y = startInputY; y < endInputY; y++) {
        for (let x = startInputX; x < endInputX; x++) {
            const input = inputs[this.thread.z][y][x];
            if (input > largestValue) {
                largestValue = input;
            }
        }
    }
    return largestValue;
}
function compare$1(deltas, switchX, switchY) {
    const xCenter = this.thread.x + 0.5;
    const yCenter = this.thread.y + 0.5;
    const invStrideX = 1 / this.constants.strideX;
    const invStrideY = 1 / this.constants.strideY;
    const startSourceX = Math.max(0, Math.ceil((xCenter - this.constants.filterWidth + this.constants.paddingX) *
        invStrideX));
    const startSourceY = Math.max(0, Math.ceil((yCenter - this.constants.filterHeight + this.constants.paddingY) *
        invStrideY));
    const endSourceX = Math.min(Math.ceil((xCenter + this.constants.paddingX) * invStrideX), this.constants.outputWidth);
    const endSourceY = Math.min(Math.ceil((yCenter + this.constants.paddingY) * invStrideY), this.constants.outputHeight);
    let result = 0;
    for (let backY = startSourceY; backY < endSourceY; backY++) {
        for (let backX = startSourceX; backX < endSourceX; backX++) {
            const switchXValue = switchX[backY][backX];
            const switchYValue = switchY[backY][backX];
            if (Math.abs(switchXValue - this.thread.x) < 0.1 &&
                Math.abs(switchYValue - this.thread.y) < 0.1) {
                result += deltas[backY][backX];
            }
        }
    }
    return result;
}
const defaults$4 = {
    padding: 0,
    stride: 0,
    filterWidth: 0,
    filterHeight: 0,
    filterCount: 0,
};
class Pool extends Filter {
    constructor(settings, inputLayer) {
        super(settings, inputLayer);
        this.predictKernelMap = null;
        this.settings = {
            ...settings,
            ...getStride(settings, defaults$4),
            ...getPadding(settings, defaults$4),
        };
        this.weights = randos3D(this.width, this.height, this.depth);
        this.deltas = zeros3D(this.width, this.height, this.depth);
        this.validate();
    }
    get strideX() {
        return this.settings.strideX;
    }
    get strideY() {
        return this.settings.strideY;
    }
    get paddingX() {
        return this.settings.paddingX;
    }
    get paddingY() {
        return this.settings.paddingY;
    }
    get width() {
        // Using floor prefers to pad less (or use negative padding) on the right
        // using ceil prefers to pad more
        return Math.ceil((this.inputLayer.width + this.paddingX * 2 - this.filterWidth) /
            this.strideX +
            1);
    }
    get height() {
        // Using floor prefers to pad less (or use negative padding) on the bottom
        // using ceil prefers to pad more
        return Math.floor((this.inputLayer.height + this.paddingY * 2 - this.filterHeight) /
            this.strideY +
            1);
    }
    get depth() {
        return this.settings.filterCount;
    }
    get filterCount() {
        // TODO: handle 1 depth?
        return this.settings.filterCount;
    }
    get switchX() {
        return this.settings.switchX;
    }
    set switchX(switchX) {
        this.settings.switchX = switchX;
    }
    get switchY() {
        return this.settings.switchY;
    }
    set switchY(switchY) {
        this.settings.switchY = switchY;
    }
    setupKernels() {
        this.predictKernelMap = makeKernelMap({
            switchX: setSwitchX,
            switchY: setSwitchY,
        }, predict$1, {
            output: [this.width, this.height, this.depth],
            constants: {
                inputWidth: this.inputLayer.width,
                inputHeight: this.inputLayer.height,
                paddingX: this.paddingX,
                paddingY: this.paddingY,
                filterHeight: this.filterHeight,
                filterWidth: this.filterWidth,
                strideX: this.strideX,
                strideY: this.strideY,
            },
        });
        this.compareKernel = makeKernel(compare$1, {
            output: [
                this.inputLayer.width,
                this.inputLayer.height,
                this.inputLayer.depth,
            ],
            constants: {
                inputWidth: this.inputLayer.width,
                inputHeight: this.inputLayer.height,
                outputWidth: this.width,
                outputHeight: this.height,
                filterWidth: this.filterWidth,
                filterHeight: this.filterHeight,
                paddingX: this.paddingX,
                paddingY: this.paddingY,
                strideX: this.strideX,
                strideY: this.strideY,
            },
        });
    }
    predict() {
        const { result: weights, switchX, switchY } = this
            .predictKernelMap(this.inputLayer.weights);
        this.switchX = switchX;
        this.switchY = switchY;
        this.weights = weights;
    }
    compare() {
        // debugger;
        // const depth = this.inputLayer.deltas.length;
        // const height = this.inputLayer.deltas[0].length;
        // const width = this.inputLayer.deltas[0][0].length;
        // const type = typeof this.inputLayer.deltas[0][0][0];
        const inputLayerDeltas = this.inputLayer.deltas;
        this.inputLayer.deltas = this.compareKernel(this.deltas, this.switchX, this.switchY);
        release(inputLayerDeltas);
        // debugger;
        // if (depth !== this.inputLayer.deltas.length) debugger;
        // if (height !== this.inputLayer.deltas[0].length) debugger;
        // if (width !== this.inputLayer.deltas[0][0].length) debugger;
        // if (type !== typeof this.inputLayer.deltas[0][0][0]) debugger;
    }
}
function pool(settings, inputLayer) {
    return new Pool(settings, inputLayer);
}

class RecurrentInput extends Internal {
    constructor(recurrentInput) {
        super();
        this.praxis = null;
        this.predictKernel = null;
        this.compareKernel = null;
        this.settings = {};
        this.recurrentInput = recurrentInput;
        this.validate();
    }
    get width() {
        return this.recurrentInput.width;
    }
    get height() {
        return this.recurrentInput.height;
    }
    get depth() {
        return this.recurrentInput.depth;
    }
    get deltas() {
        return this.recurrentInput.deltas;
    }
    set deltas(deltas) {
        const recurrentInputDeltas = this.recurrentInput.deltas;
        this.recurrentInput.deltas = deltas;
        release(recurrentInputDeltas);
    }
    get weights() {
        return this.recurrentInput.weights;
    }
    set weights(weights) {
        const recurrentInputWeights = this.recurrentInput.weights;
        this.recurrentInput.weights = weights;
        release(recurrentInputWeights);
    }
    validate() {
        BaseLayer.prototype.validate.call(this);
        if (this.width !== this.recurrentInput.width) {
            throw new Error(`${this.constructor.name} layer width ${this.width} and ${this.recurrentInput.constructor.name} width (${this.recurrentInput.width}) are not same`);
        }
        if (this.height !== this.recurrentInput.height) {
            throw new Error(`${this.constructor.name} layer height ${this.height} and ${this.recurrentInput.constructor.name} width (${this.recurrentInput.height}) are not same`);
        }
    }
    setDimensions(width, height) {
        this.recurrentInput.width = width;
        this.recurrentInput.height = height;
    }
    predict() {
        // throw new Error(`${this.constructor.name}-predict is not yet implemented`)
    }
    compare() {
        // throw new Error(`${this.constructor.name}-compare is not yet implemented`)
    }
    learn() {
        // throw new Error(`${this.constructor.name}-learn is not yet implemented`)
    }
    setupKernels() {
        // throw new Error(
        //   `${this.constructor.name}-setupKernels is not yet implemented`
        // )
    }
    reuseKernels() {
        // throw new Error(
        //   `${this.constructor.name}-reuseKernels is not yet implemented`
        // )
    }
}

class RecurrentZeros extends Internal {
    constructor(settings) {
        super();
        this.praxis = null;
        this.settings = {};
        this.predictKernel = null;
        this.compareKernel = null;
        if (settings) {
            this.settings = { ...settings };
        }
    }
    setDimensions(width, height) {
        this.praxis = null;
        this.settings = {
            ...this.settings,
            width,
            height,
            weights: zeros2D(width, height),
            deltas: zeros2D(width, height),
        };
    }
    setupKernels() {
        // throw new Error(
        //   `${this.constructor.name}-setupKernels is not yet implemented`
        // )
    }
    reuseKernels() {
        // throw new Error(
        //   `${this.constructor.name}-reuseKernels is not yet implemented`
        // )
    }
    predict() {
        // throw new Error(`${this.constructor.name}-predict is not yet implemented`)
    }
    compare() {
        // throw new Error(`${this.constructor.name}-compare is not yet implemented`)
    }
    learn(learningRate) {
        const { weights: oldWeights } = this;
        this.weights = this.praxis.run(this, learningRate);
        // this.deltas = deltas;
        release(oldWeights);
    }
}
function recurrentZeros() {
    return new RecurrentZeros();
}

function predict2D$1(inputs) {
    return activate$3(inputs[this.thread.y][this.thread.x]);
}
function compare2D$1(weights, deltas) {
    return measure$3(weights[this.thread.y][this.thread.x], deltas[this.thread.y][this.thread.x]);
}
function predict3D$1(inputs) {
    return activate$3(inputs[this.thread.z][this.thread.y][this.thread.x]);
}
function compare3D$1(weights, deltas) {
    return measure$3(weights[this.thread.z][this.thread.y][this.thread.x], deltas[this.thread.z][this.thread.y][this.thread.x]);
}
class Relu extends Activation {
    setupKernels() {
        const { width, height, depth } = this.inputLayer;
        if (depth > 0) {
            this.predictKernel = makeKernel(predict3D$1, {
                output: [width, height, depth],
                functions: [activate$3],
                immutable: true,
            });
            this.compareKernel = makeKernel(compare3D$1, {
                output: [width, height, depth],
                functions: [measure$3],
                immutable: true,
            });
        }
        else {
            this.predictKernel = makeKernel(predict2D$1, {
                output: [width, height],
                functions: [activate$3],
                immutable: true,
            });
            this.compareKernel = makeKernel(compare2D$1, {
                output: [width, height],
                functions: [measure$3],
                immutable: true,
            });
        }
    }
    predict() {
        release(this.weights);
        this.weights = this.predictKernel(this.inputLayer.weights);
    }
    compare() {
        release(this.inputLayer.deltas);
        this.inputLayer.deltas = this.compareKernel(this.weights, this.deltas);
    }
}
function relu$1(inputLayer, settings) {
    return new Relu(inputLayer, settings);
}

function rnnCell(settings, input, recurrentInput) {
    const { height } = settings;
    if (typeof height !== 'number')
        throw new Error('height not set');
    if (recurrentInput.setDimensions) {
        recurrentInput.setDimensions(1, height);
    }
    // wxh
    const weight = random({
        id: 'weight',
        height,
        width: input.height,
        std: 0.08,
    });
    // whh
    const transition = random({
        id: 'transition',
        height,
        width: height,
        std: 0.08,
    });
    // bhh
    const bias = zeros({ id: 'bias', height });
    return relu$1(add$1(add$1(multiply$1(weight, input), multiply$1(transition, recurrentInput)), bias));
}

class Regression extends BaseLayer {
    constructor(settings, inputLayer) {
        super(settings);
        this.inputLayer = inputLayer;
        this.validate();
    }
    predict() {
        release(this.weights);
        this.weights = clone(this.inputLayer.weights);
    }
    learn() {
        // throw new Error(`${this.constructor.name}-learn is not yet implemented`)
    }
}
// TODO: handle `loss += 0.5*dy*dy;` total and sum in learn
function regression(settings, inputLayer) {
    return new Regression(settings, inputLayer);
}

function getMaxValue2D(inputs) {
    let maxInput = -Infinity;
    for (let y = 0; y < this.constants.inputHeight; y++) {
        for (let x = 0; x < this.constants.inputWidth; x++) {
            const input = inputs[y][x];
            if (input > maxInput) {
                maxInput = input;
            }
        }
    }
    return maxInput;
}
function getMaxValue3D(inputs) {
    let maxInput = -Infinity;
    for (let z = 0; z < this.constants.inputDepth; z++) {
        for (let y = 0; y < this.constants.inputHeight; y++) {
            for (let x = 0; x < this.constants.inputWidth; x++) {
                const input = inputs[z][y][x];
                if (input > maxInput) {
                    maxInput = input;
                }
            }
        }
    }
    return maxInput;
}
function getSum2D(inputs) {
    let sum = 0;
    for (let y = 0; y < this.constants.inputHeight; y++) {
        for (let x = 0; x < this.constants.inputWidth; x++) {
            sum += inputs[y][x];
        }
    }
    return sum;
}
function getSum3D(inputs) {
    let sum = 0;
    for (let z = 0; z < this.constants.inputDepth; z++) {
        for (let y = 0; y < this.constants.inputHeight; y++) {
            for (let x = 0; x < this.constants.inputWidth; x++) {
                sum += inputs[z][y][x];
            }
        }
    }
    return sum;
}
function getExponentials(inputs, maxInput) {
    return Math.exp(inputs[this.thread.x] - maxInput[0]);
}
function getExponentials3D(inputs, maxInput) {
    return Math.exp(inputs[this.thread.z][this.thread.y][this.thread.x] - maxInput[0]);
}
function predict2D(exponentials, exponentialsSum) {
    return exponentials[this.thread.y][this.thread.x] / exponentialsSum[0];
}
function predict3D(exponentials, exponentialsSum) {
    return (exponentials[this.thread.z][this.thread.y][this.thread.x] /
        exponentialsSum[0]);
}
function compare2D(target, exponentials) {
    let indicator = 0;
    const index = this.thread.x + this.thread.y * this.output.x;
    if (index === target) {
        indicator = 1;
    }
    return -(indicator - exponentials[this.thread.y][this.thread.x]);
}
function compare3D(target, exponentials) {
    let indicator = 0;
    const index = this.thread.x +
        this.thread.y * this.output.x +
        this.thread.z * this.output.x * this.output.y;
    if (index === target) {
        indicator = 1;
    }
    return -(indicator - exponentials[this.thread.z][this.thread.y][this.thread.x]);
}
// TODO: handle: `return -Math.log(this.es[y]);` in learn
class SoftMax extends Modifier {
    constructor(inputLayer, settings) {
        super(inputLayer, settings);
        this.errors = null;
        this.getExponentialsKernel = null;
        this.getMaxValueKernel = null;
        this.getSumKernel = null;
        this.validate();
        if (this.depth > 0) {
            this.weights = randos3D(this.width, this.height, this.depth);
            this.deltas = zeros3D(this.width, this.height, this.depth);
        }
        else if (this.height > 0) {
            this.weights = randos2D(this.width, this.height);
            this.deltas = zeros2D(this.width, this.height);
        }
        else {
            this.weights = randos(this.width);
            this.deltas = zeros$1(this.width);
        }
    }
    setupKernels() {
        const { width, height, depth } = this;
        if (depth > 0) {
            this.getExponentialsKernel = makeKernel(getExponentials3D, {
                output: [width, height, depth],
            });
            this.getMaxValueKernel = makeKernel(getMaxValue3D, {
                output: [1, 1, 1],
                constants: {
                    inputWidth: width,
                    inputHeight: height,
                    inputDepth: depth,
                },
            });
            this.getSumKernel = makeKernel(getSum3D, {
                output: [1, 1, 1],
                constants: {
                    inputWidth: width,
                    inputHeight: height,
                    inputDepth: depth,
                },
            });
            this.predictKernel = makeKernel(predict3D, {
                output: [width, height, depth],
            });
            this.compareKernel = makeKernel(compare3D, {
                output: [width, height, depth],
                immutable: true,
            });
        }
        else {
            this.getExponentialsKernel = makeKernel(getExponentials, {
                output: [width, height],
            });
            this.getMaxValueKernel = makeKernel(getMaxValue2D, {
                output: [1, 1],
                constants: {
                    inputWidth: width,
                    inputHeight: height,
                },
            });
            this.getSumKernel = makeKernel(getSum2D, {
                output: [1, 1],
                constants: {
                    inputWidth: width,
                    inputHeight: height,
                },
            });
            this.predictKernel = makeKernel(predict2D, {
                output: [width, height],
            });
            this.compareKernel = makeKernel(compare2D, {
                output: [width, height],
                immutable: true,
            });
        }
    }
    predict() {
        const maxValue = this.getMaxValueKernel(this.inputLayer.weights);
        const exponentials = this.getExponentialsKernel(this.inputLayer.weights, maxValue);
        const exponentialsSum = this.getSumKernel(exponentials);
        this.weights = this.predictKernel(exponentials, exponentialsSum);
    }
    compare(targetValues) {
        const { deltas, errors } = this;
        this.errors = this.compareKernel(targetValues[0], deltas);
        this.deltas = clone(this.errors);
        release(deltas);
        release(errors);
        const inputLayerDeltas = this.inputLayer.deltas;
        this.inputLayer.deltas = clone(this.deltas);
        release(inputLayerDeltas);
    }
}
function softMax(inputLayer, settings) {
    return new SoftMax(inputLayer, settings);
}

class SVM extends BaseLayer {
    constructor(inputLayer, settings) {
        super(settings);
        this.inputLayer = inputLayer;
    }
    predict() {
        release(this.weights);
        this.weights = clone(this.inputLayer.weights);
        this.validate();
    }
    learn() {
        // throw new Error(`${this.constructor.name}-learn is not yet implemented`)
    }
}
// function learn(target) {
//   if (y === i) {
//     continue;
//   }
//   const ydiff = -yscore + x.w[i] + margin;
//   if (ydiff > 0) {
//     // violating dimension, apply loss
//     x.dw[i] += 1;
//     x.dw[y] -= 1;
//     loss += ydiff;
//   }
// }
function svm(inputLayer, settings) {
    return new SVM(inputLayer, settings);
}

function predict(value) {
    return value[this.thread.x][this.thread.y];
}
const compare = predict;
class Transpose extends Modifier {
    get width() {
        return this.inputLayer.height;
    }
    get height() {
        return this.inputLayer.width;
    }
    constructor(inputLayer) {
        super(inputLayer);
        this.validate();
    }
    setupKernels() {
        this.predictKernel = makeKernel(predict, {
            output: [this.height, this.width],
        });
        this.compareKernel = makeKernel(compare, {
            output: [this.width, this.height],
        });
    }
    predict() {
        this.weights = this.predictKernel(this.inputLayer.weights);
    }
    compare() {
        this.inputLayer.deltas = this.compareKernel(this.deltas);
    }
}
function transpose(inputLayer) {
    return new Transpose(inputLayer);
}

const layerTypes = {
    Activation,
    Internal,
    InternalModel,
    EntryPoint,
    Filter,
    Model,
    Modifier,
    Operator,
    Target,
};

var layer = /*#__PURE__*/Object.freeze({
    __proto__: null,
    layerTypes: layerTypes,
    Add: Add,
    add: add$1,
    arthurFeedForward: arthurFeedForward,
    BaseLayer: BaseLayer,
    baseLayerDefaultSettings: baseLayerDefaultSettings,
    Convolution: Convolution,
    convolution: convolution,
    Dropout: Dropout,
    dropout: dropout,
    feedForward: feedForward,
    FullyConnected: FullyConnected,
    fullyConnected: fullyConnected,
    gru: gru,
    Input: Input,
    input: input,
    LeakyRelu: LeakyRelu,
    leakyRelu: leakyRelu,
    lstmCell: lstmCell,
    Multiply: Multiply,
    multiply: multiply$1,
    MultiplyElement: MultiplyElement,
    multiplyElement: multiplyElement$1,
    Negative: Negative,
    negative: negative,
    Ones: Ones,
    ones: ones,
    output: output,
    Pool: Pool,
    pool: pool,
    Random: Random,
    random: random,
    RecurrentInput: RecurrentInput,
    RecurrentZeros: RecurrentZeros,
    rnnCell: rnnCell,
    Regression: Regression,
    regression: regression,
    Relu: Relu,
    relu: relu$1,
    Sigmoid: Sigmoid,
    sigmoid: sigmoid$1,
    SoftMax: SoftMax,
    softMax: softMax,
    SVM: SVM,
    svm: svm,
    Tanh: Tanh,
    tanh: tanh$1,
    Target: Target,
    target: target,
    Transpose: Transpose,
    transpose: transpose,
    Zeros: Zeros,
    zeros: zeros
});

const layerNameTypes = Object.keys(layer);
function layerFromJSON(jsonLayer, inputLayer1, inputLayer2) {
    if (!layerNameTypes.find((layerNameType) => layerNameType === jsonLayer.type)) {
        return null;
    }
    const Layer = layer[jsonLayer.type];
    if (Layer.prototype instanceof layerTypes.Filter) {
        if (!inputLayer1)
            throw new Error('inputLayer missing');
        return new Layer(jsonLayer, inputLayer1);
    }
    else if (Layer.prototype instanceof layerTypes.Activation ||
        Layer.prototype instanceof layerTypes.Modifier) {
        if (!inputLayer1)
            throw new Error('inputLayer missing');
        return new Layer(inputLayer1, jsonLayer);
    }
    else if (Layer.prototype instanceof layerTypes.Internal) {
        return new Layer(jsonLayer);
    }
    else if (Layer.prototype instanceof layerTypes.Operator) {
        if (!inputLayer1)
            throw new Error('inputLayer1 missing');
        if (!inputLayer2)
            throw new Error('inputLayer2 missing');
        return new Layer(inputLayer1, inputLayer2, jsonLayer);
    }
    else if (Layer.prototype instanceof layerTypes.InternalModel ||
        Layer.prototype instanceof layerTypes.EntryPoint ||
        Layer.prototype instanceof layerTypes.Model) {
        return new Layer(jsonLayer);
    }
    else if (Layer === Target) {
        if (!inputLayer1)
            throw new Error('inputLayer missing');
        return new Layer(jsonLayer, inputLayer1);
    }
    return null;
}

class LookupTable {
    constructor(data, prop) {
        this.prop = null;
        this.table = {};
        this.length = 0;
        const table = this.table;
        if (prop) {
            this.prop = prop;
            for (let i = 0; i < data.length; i++) {
                const datum = data[i];
                const object = datum[prop];
                for (const p in object) {
                    if (!object.hasOwnProperty(p))
                        continue;
                    if (table.hasOwnProperty(p))
                        continue;
                    table[p] = this.length++;
                }
            }
        }
        else if (Array.isArray(data) && Array.isArray(data[0])) {
            for (let i = 0; i < data.length; i++) {
                const array = data[i];
                for (let j = 0; j < array.length; j++) {
                    const object = array[j];
                    for (const p in object) {
                        if (!object.hasOwnProperty(p))
                            continue;
                        if (table.hasOwnProperty(p))
                            continue;
                        table[p] = this.length++;
                    }
                }
            }
        }
        else {
            for (let i = 0; i < data.length; i++) {
                const object = data[i];
                for (const p in object) {
                    if (!object.hasOwnProperty(p))
                        continue;
                    if (table.hasOwnProperty(p))
                        continue;
                    table[p] = this.length++;
                }
            }
        }
    }
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var thaw_1 = createCommonjsModule(function (module, exports) {
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.thaw = exports.Thaw = void 0;
/**
 * thaw an array of items
 */
var Thaw = /** @class */ (function () {
    function Thaw(items, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var _a = __assign(__assign({}, Thaw.defaultSettings), options), each = _a.each, done = _a.done;
        this.i = 0;
        this.isStopped = false;
        this.items = items;
        this.options = options;
        this.tick = function () {
            if (_this.isStopped)
                return;
            _this.timeout = setTimeout(_this.tick, 0);
            if (Thaw.thawing)
                return;
            var item = _this.items[_this.i];
            if (_this.i >= _this.items.length) {
                if (done !== null) {
                    Thaw.thawing = true;
                    done();
                    Thaw.thawing = false;
                }
                _this.isStopped = true;
                clearTimeout(_this.timeout);
                return;
            }
            if (each !== null) {
                Thaw.thawing = true;
                each(item, _this.i);
                Thaw.thawing = false;
            }
            else if (item !== undefined) {
                item();
            }
            _this.i++;
        };
        Thaw.thaws.push(this);
        if (!options.delay) {
            this.tick();
        }
    }
    Object.defineProperty(Thaw, "isThawing", {
        /**
         * returns if Thaw.js is thawing
         */
        get: function () {
            return Thaw.thawing;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Stops all Thaw instances
     */
    Thaw.stopAll = function () {
        for (var i = 0; i < Thaw.thaws.length; i++) {
            Thaw.thaws[i].stop();
        }
    };
    /**
     * readies thaw to continue
     */
    Thaw.prototype.makeReady = function () {
        if (this.isStopped) {
            this.isStopped = false;
            return true;
        }
        return false;
    };
    /**
     * Adds an item to the end of this instance of Thaw and readies Thaw to process it
     */
    Thaw.prototype.add = function (item) {
        this.items.push(item);
        if (this.makeReady()) {
            this.tick();
        }
        return this;
    };
    /**
     * Inserts an item just after the current item being processed in Thaw and readies Thaw to process it
     */
    Thaw.prototype.insert = function (item) {
        this.items.splice(this.i, 0, item);
        if (this.makeReady()) {
            this.tick();
        }
        return this;
    };
    /**
     * Adds an Array to the end of this instance of Thaw and readies Thaw to process it
     */
    Thaw.prototype.addArray = function (items) {
        this.items = this.items.concat(items);
        if (this.makeReady()) {
            this.tick();
        }
        return this;
    };
    /**
     * Inserts an Array just after the current item being processed in Thaw and readies Thaw to process them
     */
    Thaw.prototype.insertArray = function (items) {
        var before = this.items.splice(0, this.i);
        var after = this.items;
        this.items = before.concat(items, after);
        if (this.makeReady()) {
            this.tick();
        }
        return this;
    };
    /**
     * Stops this instance of Thaw
     */
    Thaw.prototype.stop = function () {
        this.isStopped = true;
        clearTimeout(this.timeout);
        if (this.options.done) {
            this.options.done();
        }
        return this;
    };
    Thaw.thawing = false;
    Thaw.thaws = [];
    Thaw.defaultSettings = {
        each: null,
        done: null
    };
    return Thaw;
}());
exports.Thaw = Thaw;
/**
 * simple thaw
 */
function thaw(items, options) {
    return new Thaw(items, options);
}
exports.thaw = thaw;

});

var block = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;

var Block = /** @class */ (function () {
    function Block(options, count) {
        if (count === void 0) { count = 200; }
        this.index = 0;
        this.thaws = [];
        this.count = count;
        this.options = options;
    }
    /**
     * add an item to the end of items
     */
    Block.prototype.add = function (item) {
        var next = this.next();
        next.add(item);
        return this;
    };
    /**
     * add an Array to the end of items
     */
    Block.prototype.addArray = function (items) {
        var next = this.next();
        next.addArray(items);
        return this;
    };
    /**
     * insert an item into items @ current position
     */
    Block.prototype.insert = function (item) {
        var next = this.next();
        next.insert(item);
        return this;
    };
    /**
     * insert and array into items @ current position
     */
    Block.prototype.insertArray = function (items) {
        var next = this.next();
        next.insertArray(items);
        return this;
    };
    /**
     * Stops all thaws in this block
     */
    Block.prototype.stop = function () {
        for (var i = 0; i < this.thaws.length; i++) {
            this.thaws[i].stop();
        }
        return this;
    };
    /**
     * Get next available in block
     */
    Block.prototype.next = function () {
        var thaw;
        var thaws = this.thaws;
        if (thaws.length < this.count) {
            thaw = new thaw_1.Thaw([], this.options);
            thaws.push(thaw);
        }
        else {
            thaw = thaws[this.index] || null;
        }
        this.index++;
        if (this.index >= this.count) {
            this.index = 0;
        }
        return thaw;
    };
    return Block;
}());
exports.Block = Block;

});

var dist = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = exports.thaw = exports.Thaw = void 0;

Object.defineProperty(exports, "Thaw", { enumerable: true, get: function () { return thaw_1.Thaw; } });
Object.defineProperty(exports, "thaw", { enumerable: true, get: function () { return thaw_1.thaw; } });

Object.defineProperty(exports, "Block", { enumerable: true, get: function () { return block.Block; } });
if (typeof window !== 'undefined') {
    // @ts-ignore
    window.Thaw = thaw_1.Thaw;
    // @ts-ignore
    window.thaw = thaw_1.thaw;
    // @ts-ignore
    window.Thaw.Block = block.Block;
}

});

const defaults$3 = {
    learningRate: 0.3,
    binaryThresh: 0.5,
    initPraxis: (layerTemplate, settings) => {
        var _a;
        return momentumRootMeanSquaredPropagation(layerTemplate, (_a = layerTemplate.settings.praxisOpts) !== null && _a !== void 0 ? _a : settings);
    },
};
const trainDefaults$3 = {
    iterations: 20000,
    errorThresh: 0.005,
    log: false,
    logPeriod: 10,
    learningRate: 0.3,
    callbackPeriod: 10,
    errorCheckInterval: 100,
    timeout: Infinity,
};
class FeedForward {
    constructor(options = {}) {
        this.trainOpts = {};
        this.layers = null;
        this._inputLayer = null;
        this._hiddenLayers = null;
        this._outputLayer = null;
        this._model = null;
        this.meanSquaredError = null;
        this.inputLookup = null;
        this.inputLookupLength = null;
        this.outputLookup = null;
        this.outputLookupLength = null;
        this.options = { ...defaults$3, ...options };
        this._updateTrainingOptions({
            ...trainDefaults$3,
            ...options,
        });
    }
    static _validateTrainingOptions(options) {
        const { iterations, errorThresh, log, logPeriod, learningRate, callback, callbackPeriod, timeout, } = options;
        const validations = {
            iterations: () => typeof iterations === 'number' && iterations > 0,
            errorThresh: () => typeof errorThresh === 'number' && errorThresh > 0 && errorThresh < 1,
            log: () => typeof log === 'function' || typeof log === 'boolean',
            logPeriod: () => typeof logPeriod === 'number' && logPeriod > 0,
            learningRate: () => typeof learningRate === 'number' &&
                learningRate > 0 &&
                learningRate < 1,
            callback: () => typeof callback === 'function' || callback === null,
            callbackPeriod: () => typeof callbackPeriod === 'number' && callbackPeriod > 0,
            timeout: () => typeof timeout === 'number' && timeout > 0,
        };
        Object.keys(trainDefaults$3).forEach((key) => {
            if (validations.hasOwnProperty(key) && !validations[key]()) {
                const val = options[key];
                throw new Error(`[${key}, ${(val !== null && val !== void 0 ? val : 'undefined').toString()}] is out of normal training range, your network will probably not train.`);
            }
        });
    }
    /**
     * if a method is passed in method is used
     * if false passed in nothing is logged
     */
    _setLogMethod(log) {
        if (typeof log === 'function') {
            this.trainOpts.log = log;
        }
        else if (log) {
            // eslint-disable-next-line
            this.trainOpts.log = console.log;
        }
        else {
            this.trainOpts.log = false;
        }
    }
    _updateTrainingOptions(opts) {
        var _a;
        this.trainOpts = { ...trainDefaults$3, ...this.trainOpts, ...opts };
        FeedForward._validateTrainingOptions(this.trainOpts);
        this._setLogMethod((_a = opts.log) !== null && _a !== void 0 ? _a : this.trainOpts.log);
        const { callback, callbackPeriod, errorCheckInterval } = this.trainOpts;
        if (callback && callbackPeriod !== errorCheckInterval) {
            console.warn(`options.callbackPeriod with value of ${(callbackPeriod !== null && callbackPeriod !== void 0 ? callbackPeriod : 'undefined').toString()} does not match options.errorCheckInterval with value of ${(errorCheckInterval !== null && errorCheckInterval !== void 0 ? errorCheckInterval : 'undefined').toString()}, if logging error, it will repeat.  These values may need to match`);
        }
    }
    _connectOptionsLayers() {
        const { inputLayerIndex, outputLayerIndex, layers } = this.options;
        if (!layers)
            throw new Error('this.options.layers in unexpected state');
        if (typeof inputLayerIndex !== 'number')
            throw new Error('inputLayerIndex not a number');
        if (typeof outputLayerIndex !== 'number')
            throw new Error('inputLayerIndex not a number');
        const inputLayer = layers[inputLayerIndex];
        if (!inputLayer) {
            throw new Error('inputLayer not found in this.options.layers');
        }
        const outputLayer = layers[outputLayerIndex];
        if (!outputLayer) {
            throw new Error('outputLayer not found in this.options.layers');
        }
        this._inputLayer = inputLayer;
        this._hiddenLayers = layers.slice(inputLayerIndex, outputLayerIndex - inputLayerIndex);
        this._outputLayer = outputLayer;
        return layers;
    }
    _connectNewLayers() {
        const { inputLayer, outputLayer } = this.options;
        if (!inputLayer)
            throw new Error('inputLayer not defined');
        const layers = [];
        this._inputLayer = inputLayer();
        const hiddenLayers = this._connectHiddenLayers(this._inputLayer);
        if (!outputLayer)
            throw new Error('outputLayer not defined');
        this._outputLayer = outputLayer(hiddenLayers[hiddenLayers.length - 1], hiddenLayers.length);
        layers.push(this._inputLayer);
        layers.push(...hiddenLayers);
        layers.push(this._outputLayer);
        return flattenLayers(layers);
    }
    _connectHiddenLayers(previousLayer) {
        this._hiddenLayers = [];
        const result = [];
        const { hiddenLayers } = this.options;
        if (!hiddenLayers)
            throw new Error('hiddenLayers not defined');
        for (let i = 0; i < hiddenLayers.length; i++) {
            const hiddenLayer = hiddenLayers[i](previousLayer, i);
            result.push(hiddenLayer);
            this._hiddenLayers.push(hiddenLayer);
            previousLayer = hiddenLayer;
        }
        return result;
    }
    initialize() {
        this.layers = this.options.layers
            ? this._connectOptionsLayers()
            : this._connectNewLayers();
        this.initializeLayers(this.layers);
        this._model = this.layers.filter((l) => l instanceof Model);
    }
    initializeLayers(layers) {
        var _a, _b;
        for (let i = 0; i < layers.length; i++) {
            const layer = layers[i];
            // TODO: optimize for when training or just running
            layer.setupKernels(true);
            if (layer instanceof Model &&
                layer.praxis === null &&
                typeof this.options.initPraxis === 'function') {
                layer.praxis = this.options.initPraxis(layer, (_b = (_a = layer.settings.praxisOpts) !== null && _a !== void 0 ? _a : this.options.praxisOpts) !== null && _b !== void 0 ? _b : {});
                layer.praxis.setupKernels();
            }
        }
        const lastLayer = layers[layers.length - 1];
        this.meanSquaredError = new MeanSquaredError({
            width: lastLayer.width,
            height: lastLayer.height,
        });
    }
    run(input) {
        let typeSafeInput;
        if (Array.isArray(input) || input.buffer) {
            typeSafeInput = input;
        }
        else {
            if (this.inputLookup) {
                typeSafeInput = lookup.toArray(this.inputLookup, input, this.inputLookupLength);
            }
            else {
                throw new Error('input is incompatible with net');
            }
        }
        let output = this.runInput(typeSafeInput);
        if (output instanceof gpu_js.Texture) {
            output = output.toArray();
        }
        if (this.outputLookup) {
            return lookup.toObject(this.outputLookup, output);
        }
        return output;
    }
    runInput(input) {
        if (!this.layers)
            throw new Error('not initialized');
        this.layers[0].predict(input);
        for (let i = 1; i < this.layers.length; i++) {
            this.layers[i].predict();
        }
        return this.layers[this.layers.length - 1].weights;
    }
    train(data, options = {}) {
        const { preparedData, status, endTime } = this._prepTraining(data, options);
        let continueTicking = true;
        const calculateError = () => this._calculateTrainingError(preparedData);
        const trainPatterns = () => this._trainPatterns(preparedData);
        while (continueTicking) {
            continueTicking = this._trainingTick(status, endTime, calculateError, trainPatterns);
        }
        return status;
    }
    async trainAsync(data, options = {}) {
        const { preparedData, status, endTime } = this._prepTraining(data, options);
        return await new Promise((resolve, reject) => {
            try {
                const calculateError = () => this._calculateTrainingError(preparedData);
                const trainPatterns = () => this._trainPatterns(preparedData);
                const thawedTrain = new dist.Thaw(new Array(this.trainOpts.iterations), {
                    delay: true,
                    each: () => this._trainingTick(status, endTime, calculateError, trainPatterns) || thawedTrain.stop(),
                    done: () => resolve(status),
                });
                thawedTrain.tick();
            }
            catch (trainError) {
                reject(trainError);
            }
        });
    }
    _trainingTick(status, endTime, calculateError, trainPatterns) {
        const { trainOpts } = this;
        if (status.iterations >= trainOpts.iterations ||
            status.error <= trainOpts.errorThresh ||
            Date.now() >= endTime) {
            return false;
        }
        if (typeof trainOpts.log === 'function' &&
            status.iterations % trainOpts.logPeriod === 0) {
            status.error = calculateError();
            trainOpts.log(`iterations: ${status.iterations}, training error: ${status.error}`);
        }
        else if (status.iterations % trainOpts.errorCheckInterval ===
            0) {
            status.error = calculateError();
        }
        else {
            trainPatterns();
        }
        if (trainOpts.callback &&
            status.iterations % trainOpts.callbackPeriod === 0) {
            trainOpts.callback(Object.assign(status));
        }
        status.iterations++;
        return true;
    }
    _prepTraining(data, options) {
        this._updateTrainingOptions(options);
        const formattedData = this.formatData(data);
        const endTime = this.trainOpts.timeout
            ? Date.now() + this.trainOpts.timeout
            : 0;
        const status = {
            error: 1,
            iterations: 0,
        };
        this.verifyIsInitialized();
        return {
            preparedData: this.transferData(formattedData),
            status,
            endTime,
        };
    }
    verifyIsInitialized() {
        if (!this._model) {
            this.initialize();
        }
    }
    _calculateTrainingError(preparedData) {
        let sum = new Float32Array([0]);
        const meanSquaredError = this.meanSquaredError;
        for (let i = 0; i < preparedData.length; ++i) {
            const prevSum = sum;
            const error = this._trainPattern(preparedData[i].input, preparedData[i].output, true);
            sum = meanSquaredError.add(sum, error);
            release(error);
            release(prevSum);
        }
        const result = meanSquaredError.divide(preparedData.length, sum);
        release(sum);
        if (result instanceof gpu_js.Texture) {
            const resultArray = result.toArray();
            release(result);
            return resultArray[0];
        }
        return result[0];
    }
    /**
     * @param data
     * @private
     */
    _trainPatterns(data) {
        for (let i = 0; i < data.length; ++i) {
            this._trainPattern(data[i].input, data[i].output, false);
        }
    }
    _trainPattern(input, target, logErrorRate) {
        var _a;
        // forward propagate
        this.runInput(input);
        // back propagate
        this._calculateDeltas(target);
        this.adjustWeights();
        if (logErrorRate) {
            if (!((_a = this._outputLayer) === null || _a === void 0 ? void 0 : _a.errors)) {
                throw new Error('outputLayer.errors not defined');
            }
            return this.meanSquaredError.calculate(this._outputLayer.errors);
        }
        return null;
    }
    _calculateDeltas(target) {
        const layers = this.layers;
        for (let i = layers.length - 1; i > -1; i--) {
            layers[i].compare(target);
        }
    }
    /**
     *
     */
    adjustWeights() {
        const _model = this._model;
        for (let i = 0; i < _model.length; i++) {
            _model[i].learn(this.trainOpts.learningRate);
        }
    }
    /**
     *
     * @param data
     * @returns {*}
     */
    formatData(data) {
        if (!Array.isArray(data)) {
            // turn stream datum into array
            const tmp = [];
            tmp.push(data);
            data = tmp;
        }
        // turn sparse hash input into arrays with 0s as filler
        const inputDatumCheck = data[0].input;
        let formattedData;
        if (Array.isArray(data) &&
            !Array.isArray(inputDatumCheck) &&
            !(inputDatumCheck instanceof Float32Array)) {
            if (!this.inputLookup) {
                const lookupTable = new LookupTable(data, 'input');
                this.inputLookup = lookupTable.table;
                this.inputLookupLength = lookupTable.length;
            }
            formattedData = data.map((datumParam) => {
                const array = lookup.toArray(this.inputLookup, datumParam.input, this.inputLookupLength);
                return { input: array };
            }, this);
        }
        else {
            formattedData = data;
        }
        const outputDatumCheck = data[0].output;
        if (!Array.isArray(outputDatumCheck) &&
            !(outputDatumCheck instanceof Float32Array)) {
            if (!this.outputLookup) {
                const lookupTable = new LookupTable(data, 'output');
                this.outputLookup = lookupTable.table;
                this.outputLookupLength = lookupTable.length;
            }
            formattedData = data.map((datumParam, index) => {
                const array = lookup.toArray(this.outputLookup, datumParam.output, this.inputLookupLength);
                return {
                    input: formattedData[index].input,
                    output: array,
                };
            }, this);
        }
        return formattedData;
    }
    transferData(formattedData) {
        const transferredData = new Array(formattedData.length);
        const transferInput = makeKernel(function (value) {
            return value[this.thread.x];
        }, {
            output: [formattedData[0].input.length],
            immutable: true,
        });
        const transferOutput = makeKernel(function (value) {
            return value[this.thread.x];
        }, {
            output: [formattedData[0].output.length],
            immutable: true,
        });
        for (let i = 0; i < formattedData.length; i++) {
            const formattedDatum = formattedData[i];
            transferredData[i] = {
                input: transferInput(formattedDatum.input),
                output: transferOutput(formattedDatum.output),
            };
        }
        return transferredData;
    }
    /**
     *
     * @param data
     * @returns {
     *  {
     *    error: number,
     *    misclasses: Array
     *  }
     * }
     */
    test() {
        throw new Error(`${this.constructor.name}-test is not yet implemented`);
    }
    /**
     *
     */
    toJSON() {
        var _a;
        if (!this.layers) {
            this.initialize();
        }
        if (!this._model ||
            !this.layers ||
            !this._inputLayer ||
            !this._hiddenLayers ||
            !this._outputLayer) {
            throw new Error('network is not initialized');
        }
        const jsonLayers = [];
        for (let i = 0; i < this.layers.length; i++) {
            const layer = this.layers[i];
            const jsonLayer = layer.toJSON();
            if (layer.hasOwnProperty('inputLayer')) {
                jsonLayer.inputLayerIndex = this.layers.indexOf(layer.inputLayer);
            }
            else if (layer.hasOwnProperty('inputLayer1') &&
                layer.hasOwnProperty('inputLayer2')) {
                jsonLayer.inputLayer1Index = this.layers.indexOf(layer.inputLayer1);
                jsonLayer.inputLayer2Index = this.layers.indexOf(layer.inputLayer2);
            }
            jsonLayers.push(jsonLayer);
        }
        return {
            type: this.constructor.name,
            sizes: (_a = this.options.sizes) !== null && _a !== void 0 ? _a : [this._inputLayer.height]
                .concat(this._hiddenLayers.map((l) => l.height))
                .concat([this._outputLayer.height]),
            outputLayerIndex: this.layers.indexOf(this._outputLayer),
            layers: jsonLayers,
            inputLayerIndex: this.layers.indexOf(this._inputLayer),
        };
    }
    static fromJSON(json, getLayer) {
        var _a, _b, _c, _d;
        const jsonLayers = json.layers;
        const layers = [];
        const inputLayer = getLayer
            ? (_a = layerFromJSON(jsonLayers[0])) !== null && _a !== void 0 ? _a : getLayer(jsonLayers[0]) : layerFromJSON(jsonLayers[0]);
        if (!inputLayer)
            throw new Error('unable to find layer');
        layers.push(inputLayer);
        for (let i = 1; i < jsonLayers.length; i++) {
            const jsonLayer = jsonLayers[i];
            if (typeof jsonLayer.inputLayerIndex === 'undefined' &&
                typeof jsonLayer.inputLayer1Index === 'undefined' &&
                typeof jsonLayer.inputLayer2Index === 'undefined') {
                const layer = getLayer
                    ? (_b = layerFromJSON(jsonLayer)) !== null && _b !== void 0 ? _b : getLayer(jsonLayer) : layerFromJSON(jsonLayer);
                if (!layer)
                    throw new Error('unable to find layer');
                layers.push(layer);
            }
            else if (typeof jsonLayer.inputLayerIndex === 'number') {
                const inputLayer = layers[jsonLayer.inputLayerIndex];
                if (!inputLayer) {
                    throw new Error('inputLayer1 not found');
                }
                const layer = getLayer
                    ? (_c = layerFromJSON(jsonLayer, inputLayer)) !== null && _c !== void 0 ? _c : getLayer(jsonLayer, inputLayer) : layerFromJSON(jsonLayer, inputLayer);
                if (!layer)
                    throw new Error('unable to find layer');
                layers.push(layer);
            }
            else {
                if (typeof jsonLayer.inputLayer1Index !== 'number') {
                    throw new Error('Cannot create network from provided JSON. inputLayer1Index not defined.');
                }
                if (typeof jsonLayer.inputLayer2Index !== 'number') {
                    throw new Error('Cannot create network from provided JSON. inputLayer2Index not defined.');
                }
                const inputLayer1 = layers[jsonLayer.inputLayer1Index];
                const inputLayer2 = layers[jsonLayer.inputLayer2Index];
                if (inputLayer1 === undefined)
                    throw new Error(`Cannot create network from provided JSON. layer of index ${jsonLayer.inputLayer1Index} not found.`);
                if (inputLayer2 === undefined)
                    throw new Error(`Cannot create network from provided JSON. layer of index ${jsonLayer.inputLayer2Index} not found.`);
                const layer = getLayer
                    ? (_d = layerFromJSON(jsonLayer, inputLayer1, inputLayer2)) !== null && _d !== void 0 ? _d : getLayer(jsonLayer, inputLayer1, inputLayer2) : layerFromJSON(jsonLayer, inputLayer1, inputLayer2);
                if (!layer)
                    throw new Error('unable to find layer');
                layers.push(layer);
            }
        }
        return new this({ ...json, layers });
    }
    /**
     *
     * @returns {Function}
     */
    toFunction() {
        throw new Error(`${this.constructor.name}-toFunction is not yet implemented`);
    }
}

function likely(input, net) {
    if (!net) {
        throw new TypeError(`Required parameter 'net' is of type ${typeof net}. Must be of type 'brain.NeuralNetwork'`);
    }
    const output = net.run(input);
    let maxProp = null;
    let maxValue = -1;
    Object.entries(output).forEach(([key, value]) => {
        if (typeof value !== 'undefined' &&
            typeof value === 'number' &&
            value > maxValue) {
            maxProp = key;
            maxValue = value;
        }
    });
    return maxProp;
}

function arraysToFloat32Arrays(arrays) {
    const result = [];
    for (let i = 0; i < arrays.length; i++) {
        result.push(Float32Array.from(arrays[i]));
    }
    return result;
}
function inputOutputArraysToFloat32Arrays(input, output) {
    const result = [];
    for (let i = 0; i < input.length; i++) {
        result.push(Float32Array.from(input[i]));
    }
    for (let i = 0; i < output.length; i++) {
        result.push(Float32Array.from(output[i]));
    }
    return result;
}
function arrayToFloat32Arrays(array) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(Float32Array.from([array[i]]));
    }
    return result;
}
function inputOutputArrayToFloat32Arrays(input, output) {
    const result = [];
    for (let i = 0; i < input.length; i++) {
        result.push(Float32Array.from([input[i]]));
    }
    for (let i = 0; i < output.length; i++) {
        result.push(Float32Array.from([output[i]]));
    }
    return result;
}
function arrayToFloat32Array(array) {
    return Float32Array.from(array);
}
function inputOutputObjectsToFloat32Arrays(input, output, inputTable, outputTable, inputLength, outputLength) {
    const results = [];
    for (let i = 0; i < input.length; i++) {
        const object = input[i];
        const result = new Float32Array(inputLength);
        for (const p in object) {
            if (object.hasOwnProperty(p)) {
                result[inputTable[p]] = object[p];
            }
        }
        results.push(result);
    }
    for (let i = 0; i < output.length; i++) {
        const object = output[i];
        const result = new Float32Array(outputLength);
        for (const p in object) {
            if (object.hasOwnProperty(p)) {
                result[outputTable[p]] = object[p];
            }
        }
        results.push(result);
    }
    return results;
}
function objectToFloat32Arrays(object) {
    const result = [];
    for (const p in object) {
        if (!object.hasOwnProperty(p))
            continue;
        result.push(Float32Array.from([object[p]]));
    }
    return result;
}
function inputOutputObjectToFloat32Arrays(input, output) {
    const result = [];
    for (const p in input) {
        if (!input.hasOwnProperty(p))
            continue;
        result.push(Float32Array.from([input[p]]));
    }
    for (const p in output) {
        if (!output.hasOwnProperty(p))
            continue;
        result.push(Float32Array.from([output[p]]));
    }
    return result;
}
function objectToFloat32Array(object, table, length) {
    const result = new Float32Array(length);
    for (const p in object) {
        if (object.hasOwnProperty(p)) {
            result[table[p]] = object[p];
        }
    }
    return result;
}

function max(values) {
    if (Array.isArray(values) || values instanceof Float32Array) {
        return Math.max(...values);
    }
    else {
        return Math.max(...Object.values(values));
    }
}

function mse$1(errors) {
    // mean squared error
    let sum = 0;
    for (let i = 0; i < errors.length; i++) {
        sum += errors[i] ** 2;
    }
    return sum / errors.length;
}

function getTypedArrayFn(value, table) {
    if (value.buffer instanceof ArrayBuffer) {
        return null;
    }
    if (Array.isArray(value)) {
        return arrayToFloat32Array;
    }
    if (!table)
        throw new Error('table is not Object');
    const { length } = Object.keys(table);
    return (v) => {
        const array = new Float32Array(length);
        for (const p in table) {
            if (!table.hasOwnProperty(p))
                continue;
            if (typeof v[p] !== 'number')
                continue;
            array[table[p]] = v[p] || 0;
        }
        return array;
    };
}
function defaults$2() {
    return {
        inputSize: 0,
        outputSize: 0,
        binaryThresh: 0.5,
    };
}
function trainDefaults$2() {
    return {
        activation: 'sigmoid',
        iterations: 20000,
        errorThresh: 0.005,
        log: false,
        logPeriod: 10,
        leakyReluAlpha: 0.01,
        learningRate: 0.3,
        momentum: 0.1,
        callbackPeriod: 10,
        timeout: Infinity,
        beta1: 0.9,
        beta2: 0.999,
        epsilon: 1e-8,
    };
}
class NeuralNetwork {
    constructor(options = {}) {
        this.options = defaults$2();
        this.trainOpts = trainDefaults$2();
        this.sizes = [];
        this.outputLayer = -1;
        this.biases = [];
        this.weights = []; // weights for bias nodes
        this.outputs = [];
        // state for training
        this.deltas = [];
        this.changes = []; // for momentum
        this.errors = [];
        this.errorCheckInterval = 1;
        this.inputLookup = null;
        this.inputLookupLength = 0;
        this.outputLookup = null;
        this.outputLookupLength = 0;
        this._formatInput = null;
        this._formatOutput = null;
        this.runInput = (input) => {
            this.setActivation();
            return this.runInput(input);
        };
        this.calculateDeltas = (output) => {
            this.setActivation();
            return this.calculateDeltas(output);
        };
        // adam
        this.biasChangesLow = [];
        this.biasChangesHigh = [];
        this.changesLow = [];
        this.changesHigh = [];
        this.iterations = 0;
        this.options = { ...this.options, ...options };
        this.updateTrainingOptions(options);
        const { inputSize, hiddenLayers, outputSize } = this.options;
        if (inputSize && outputSize) {
            this.sizes = [inputSize].concat(hiddenLayers !== null && hiddenLayers !== void 0 ? hiddenLayers : []).concat([outputSize]);
        }
    }
    /**
     *
     * Expects this.sizes to have been set
     */
    initialize() {
        if (!this.sizes.length) {
            throw new Error('Sizes must be set before initializing');
        }
        this.outputLayer = this.sizes.length - 1;
        this.biases = new Array(this.outputLayer); // weights for bias nodes
        this.weights = new Array(this.outputLayer);
        this.outputs = new Array(this.outputLayer);
        // state for training
        this.deltas = new Array(this.outputLayer);
        this.changes = new Array(this.outputLayer); // for momentum
        this.errors = new Array(this.outputLayer);
        for (let layerIndex = 0; layerIndex <= this.outputLayer; layerIndex++) {
            const size = this.sizes[layerIndex];
            this.deltas[layerIndex] = zeros$1(size);
            this.errors[layerIndex] = zeros$1(size);
            this.outputs[layerIndex] = zeros$1(size);
            if (layerIndex > 0) {
                this.biases[layerIndex] = randos(size);
                this.weights[layerIndex] = new Array(size);
                this.changes[layerIndex] = new Array(size);
                for (let nodeIndex = 0; nodeIndex < size; nodeIndex++) {
                    const prevSize = this.sizes[layerIndex - 1];
                    this.weights[layerIndex][nodeIndex] = randos(prevSize);
                    this.changes[layerIndex][nodeIndex] = zeros$1(prevSize);
                }
            }
        }
        this.setActivation();
        if (this.trainOpts.praxis === 'adam') {
            this._setupAdam();
        }
    }
    setActivation(activation) {
        const value = activation !== null && activation !== void 0 ? activation : this.trainOpts.activation;
        switch (value) {
            case 'sigmoid':
                this.runInput = this._runInputSigmoid;
                this.calculateDeltas = this._calculateDeltasSigmoid;
                break;
            case 'relu':
                this.runInput = this._runInputRelu;
                this.calculateDeltas = this._calculateDeltasRelu;
                break;
            case 'leaky-relu':
                this.runInput = this._runInputLeakyRelu;
                this.calculateDeltas = this._calculateDeltasLeakyRelu;
                break;
            case 'tanh':
                this.runInput = this._runInputTanh;
                this.calculateDeltas = this._calculateDeltasTanh;
                break;
            default:
                throw new Error(`Unknown activation ${value}. Available activations are: 'sigmoid', 'relu', 'leaky-relu', 'tanh'`);
        }
    }
    get isRunnable() {
        return this.sizes.length > 0;
    }
    run(input) {
        if (!this.isRunnable) {
            throw new Error('network not runnable');
        }
        let formattedInput;
        if (this.inputLookup) {
            formattedInput = lookup.toArray(this.inputLookup, input, this.inputLookupLength);
        }
        else {
            formattedInput = input;
        }
        this.validateInput(formattedInput);
        const output = this.runInput(formattedInput).slice(0);
        if (this.outputLookup) {
            return lookup.toObject(this.outputLookup, output);
        }
        return output;
    }
    _runInputSigmoid(input) {
        this.outputs[0] = input; // set output state of input layer
        let output = null;
        for (let layer = 1; layer <= this.outputLayer; layer++) {
            const activeLayer = this.sizes[layer];
            const activeWeights = this.weights[layer];
            const activeBiases = this.biases[layer];
            const activeOutputs = this.outputs[layer];
            for (let node = 0; node < activeLayer; node++) {
                const weights = activeWeights[node];
                let sum = activeBiases[node];
                for (let k = 0; k < weights.length; k++) {
                    sum += weights[k] * input[k];
                }
                // sigmoid
                activeOutputs[node] = 1 / (1 + Math.exp(-sum));
            }
            output = input = activeOutputs;
        }
        if (!output) {
            throw new Error('output was empty');
        }
        return output;
    }
    _runInputRelu(input) {
        this.outputs[0] = input; // set output state of input layer
        let output = null;
        for (let layer = 1; layer <= this.outputLayer; layer++) {
            const activeSize = this.sizes[layer];
            const activeWeights = this.weights[layer];
            const activeBiases = this.biases[layer];
            const activeOutputs = this.outputs[layer];
            for (let node = 0; node < activeSize; node++) {
                const weights = activeWeights[node];
                let sum = activeBiases[node];
                for (let k = 0; k < weights.length; k++) {
                    sum += weights[k] * input[k];
                }
                // relu
                activeOutputs[node] = sum < 0 ? 0 : sum;
            }
            output = input = activeOutputs;
        }
        if (!output) {
            throw new Error('output was empty');
        }
        return output;
    }
    _runInputLeakyRelu(input) {
        this.outputs[0] = input; // set output state of input layer
        const { leakyReluAlpha } = this.trainOpts;
        let output = null;
        for (let layer = 1; layer <= this.outputLayer; layer++) {
            const activeSize = this.sizes[layer];
            const activeWeights = this.weights[layer];
            const activeBiases = this.biases[layer];
            const activeOutputs = this.outputs[layer];
            for (let node = 0; node < activeSize; node++) {
                const weights = activeWeights[node];
                let sum = activeBiases[node];
                for (let k = 0; k < weights.length; k++) {
                    sum += weights[k] * input[k];
                }
                // leaky relu
                activeOutputs[node] = Math.max(sum, leakyReluAlpha * sum);
            }
            output = input = activeOutputs;
        }
        if (!output) {
            throw new Error('output was empty');
        }
        return output;
    }
    _runInputTanh(input) {
        this.outputs[0] = input; // set output state of input layer
        let output = null;
        for (let layer = 1; layer <= this.outputLayer; layer++) {
            const activeSize = this.sizes[layer];
            const activeWeights = this.weights[layer];
            const activeBiases = this.biases[layer];
            const activeOutputs = this.outputs[layer];
            for (let node = 0; node < activeSize; node++) {
                const weights = activeWeights[node];
                let sum = activeBiases[node];
                for (let k = 0; k < weights.length; k++) {
                    sum += weights[k] * input[k];
                }
                // tanh
                activeOutputs[node] = Math.tanh(sum);
            }
            output = input = activeOutputs;
        }
        if (!output) {
            throw new Error('output was empty');
        }
        return output;
    }
    /**
     *
     * Verifies network sizes are initialized
     * If they are not it will initialize them based off the data set.
     */
    verifyIsInitialized(preparedData) {
        if (this.sizes.length && this.outputLayer > 0)
            return;
        this.sizes = [];
        this.sizes.push(preparedData[0].input.length);
        if (!this.options.hiddenLayers) {
            this.sizes.push(Math.max(3, Math.floor(preparedData[0].input.length / 2)));
        }
        else {
            this.options.hiddenLayers.forEach((size) => {
                this.sizes.push(size);
            });
        }
        this.sizes.push(preparedData[0].output.length);
        this.initialize();
    }
    updateTrainingOptions(trainOpts) {
        const merged = { ...this.trainOpts, ...trainOpts };
        this.validateTrainingOptions(merged);
        this.trainOpts = merged;
        this.setLogMethod(this.trainOpts.log);
    }
    validateTrainingOptions(options) {
        const validations = {
            activation: () => {
                return ['sigmoid', 'relu', 'leaky-relu', 'tanh'].includes(options.activation);
            },
            iterations: () => {
                const val = options.iterations;
                return typeof val === 'number' && val > 0;
            },
            errorThresh: () => {
                const val = options.errorThresh;
                return typeof val === 'number' && val > 0 && val < 1;
            },
            log: () => {
                const val = options.log;
                return typeof val === 'function' || typeof val === 'boolean';
            },
            logPeriod: () => {
                const val = options.logPeriod;
                return typeof val === 'number' && val > 0;
            },
            leakyReluAlpha: () => {
                const val = options.leakyReluAlpha;
                return typeof val === 'number' && val > 0 && val < 1;
            },
            learningRate: () => {
                const val = options.learningRate;
                return typeof val === 'number' && val > 0 && val < 1;
            },
            momentum: () => {
                const val = options.momentum;
                return typeof val === 'number' && val > 0 && val < 1;
            },
            callback: () => {
                const val = options.callback;
                return typeof val === 'function' || val === undefined;
            },
            callbackPeriod: () => {
                const val = options.callbackPeriod;
                return typeof val === 'number' && val > 0;
            },
            timeout: () => {
                const val = options.timeout;
                return typeof val === 'number' && val > 0;
            },
            praxis: () => {
                const val = options.praxis;
                return !val || val === 'adam';
            },
            beta1: () => {
                const val = options.beta1;
                return val > 0 && val < 1;
            },
            beta2: () => {
                const val = options.beta2;
                return val > 0 && val < 1;
            },
            epsilon: () => {
                const val = options.epsilon;
                return val > 0 && val < 1;
            },
        };
        for (const p in validations) {
            const v = options;
            if (!validations[p]()) {
                throw new Error(`[${p}, ${v[p]}] is out of normal training range, your network will probably not train.`);
            }
        }
    }
    /**
     *
     *  Gets JSON of trainOpts object
     *    NOTE: Activation is stored directly on JSON object and not in the training options
     */
    getTrainOptsJSON() {
        const { activation, iterations, errorThresh, log, logPeriod, leakyReluAlpha, learningRate, momentum, callbackPeriod, timeout, praxis, beta1, beta2, epsilon, } = this.trainOpts;
        return {
            activation,
            iterations,
            errorThresh,
            log: typeof log === 'function'
                ? true
                : typeof log === 'boolean'
                    ? log
                    : false,
            logPeriod,
            leakyReluAlpha,
            learningRate,
            momentum,
            callbackPeriod,
            timeout: timeout === Infinity ? 'Infinity' : timeout,
            praxis,
            beta1,
            beta2,
            epsilon,
        };
    }
    setLogMethod(log) {
        if (typeof log === 'function') {
            this.trainOpts.log = log;
        }
        else if (log) {
            this.trainOpts.log = this.logTrainingStatus;
        }
        else {
            this.trainOpts.log = false;
        }
    }
    logTrainingStatus(status) {
        console.log(`iterations: ${status.iterations}, training error: ${status.error}`);
    }
    calculateTrainingError(data) {
        let sum = 0;
        for (let i = 0; i < data.length; ++i) {
            sum += this.trainPattern(data[i], true);
        }
        return sum / data.length;
    }
    trainPatterns(data) {
        for (let i = 0; i < data.length; ++i) {
            this.trainPattern(data[i]);
        }
    }
    trainingTick(data, status, endTime) {
        const { callback, callbackPeriod, errorThresh, iterations, log, logPeriod, } = this.trainOpts;
        if (status.iterations >= iterations ||
            status.error <= errorThresh ||
            Date.now() >= endTime) {
            return false;
        }
        status.iterations++;
        if (log && status.iterations % logPeriod === 0) {
            status.error = this.calculateTrainingError(data);
            log(status);
        }
        else if (status.iterations % this.errorCheckInterval === 0) {
            status.error = this.calculateTrainingError(data);
        }
        else {
            this.trainPatterns(data);
        }
        if (callback && status.iterations % callbackPeriod === 0) {
            callback({
                iterations: status.iterations,
                error: status.error,
            });
        }
        return true;
    }
    prepTraining(data, options = {}) {
        this.updateTrainingOptions(options);
        const preparedData = this.formatData(data);
        const endTime = Date.now() + this.trainOpts.timeout;
        const status = {
            error: 1,
            iterations: 0,
        };
        this.verifyIsInitialized(preparedData);
        this.validateData(preparedData);
        return {
            preparedData,
            status,
            endTime,
        };
    }
    train(data, options = {}) {
        const { preparedData, status, endTime } = this.prepTraining(data, options);
        while (true) {
            if (!this.trainingTick(preparedData, status, endTime)) {
                break;
            }
        }
        return status;
    }
    async trainAsync(data, options = {}) {
        const { preparedData, status, endTime } = this.prepTraining(data, options);
        return await new Promise((resolve, reject) => {
            try {
                const thawedTrain = new dist.Thaw(new Array(this.trainOpts.iterations), {
                    delay: true,
                    each: () => this.trainingTick(preparedData, status, endTime) ||
                        thawedTrain.stop(),
                    done: () => resolve(status),
                });
                thawedTrain.tick();
            }
            catch (trainError) {
                reject(trainError);
            }
        });
    }
    trainPattern(value, logErrorRate) {
        // forward propagate
        this.runInput(value.input);
        // back propagate
        this.calculateDeltas(value.output);
        this.adjustWeights();
        if (logErrorRate) {
            return mse$1(this.errors[this.outputLayer]);
        }
        return null;
    }
    _calculateDeltasSigmoid(target) {
        for (let layer = this.outputLayer; layer >= 0; layer--) {
            const activeSize = this.sizes[layer];
            const activeOutput = this.outputs[layer];
            const activeError = this.errors[layer];
            const activeDeltas = this.deltas[layer];
            const nextLayer = this.weights[layer + 1];
            for (let node = 0; node < activeSize; node++) {
                const output = activeOutput[node];
                let error = 0;
                if (layer === this.outputLayer) {
                    error = target[node] - output;
                }
                else {
                    const deltas = this.deltas[layer + 1];
                    for (let k = 0; k < deltas.length; k++) {
                        error += deltas[k] * nextLayer[k][node];
                    }
                }
                activeError[node] = error;
                activeDeltas[node] = error * output * (1 - output);
            }
        }
    }
    _calculateDeltasRelu(target) {
        for (let layer = this.outputLayer; layer >= 0; layer--) {
            const currentSize = this.sizes[layer];
            const currentOutputs = this.outputs[layer];
            const nextWeights = this.weights[layer + 1];
            const nextDeltas = this.deltas[layer + 1];
            const currentErrors = this.errors[layer];
            const currentDeltas = this.deltas[layer];
            for (let node = 0; node < currentSize; node++) {
                const output = currentOutputs[node];
                let error = 0;
                if (layer === this.outputLayer) {
                    error = target[node] - output;
                }
                else {
                    for (let k = 0; k < nextDeltas.length; k++) {
                        error += nextDeltas[k] * nextWeights[k][node];
                    }
                }
                currentErrors[node] = error;
                currentDeltas[node] = output > 0 ? error : 0;
            }
        }
    }
    _calculateDeltasLeakyRelu(target) {
        const alpha = this.trainOpts.leakyReluAlpha;
        for (let layer = this.outputLayer; layer >= 0; layer--) {
            const currentSize = this.sizes[layer];
            const currentOutputs = this.outputs[layer];
            const nextDeltas = this.deltas[layer + 1];
            const nextWeights = this.weights[layer + 1];
            const currentErrors = this.errors[layer];
            const currentDeltas = this.deltas[layer];
            for (let node = 0; node < currentSize; node++) {
                const output = currentOutputs[node];
                let error = 0;
                if (layer === this.outputLayer) {
                    error = target[node] - output;
                }
                else {
                    for (let k = 0; k < nextDeltas.length; k++) {
                        error += nextDeltas[k] * nextWeights[k][node];
                    }
                }
                currentErrors[node] = error;
                currentDeltas[node] = output > 0 ? error : alpha * error;
            }
        }
    }
    _calculateDeltasTanh(target) {
        for (let layer = this.outputLayer; layer >= 0; layer--) {
            const currentSize = this.sizes[layer];
            const currentOutputs = this.outputs[layer];
            const nextDeltas = this.deltas[layer + 1];
            const nextWeights = this.weights[layer + 1];
            const currentErrors = this.errors[layer];
            const currentDeltas = this.deltas[layer];
            for (let node = 0; node < currentSize; node++) {
                const output = currentOutputs[node];
                let error = 0;
                if (layer === this.outputLayer) {
                    error = target[node] - output;
                }
                else {
                    for (let k = 0; k < nextDeltas.length; k++) {
                        error += nextDeltas[k] * nextWeights[k][node];
                    }
                }
                currentErrors[node] = error;
                currentDeltas[node] = (1 - output * output) * error;
            }
        }
    }
    /**
     *
     * Changes weights of networks
     */
    adjustWeights() {
        const { learningRate, momentum } = this.trainOpts;
        for (let layer = 1; layer <= this.outputLayer; layer++) {
            const incoming = this.outputs[layer - 1];
            const activeSize = this.sizes[layer];
            const activeDelta = this.deltas[layer];
            const activeChanges = this.changes[layer];
            const activeWeights = this.weights[layer];
            const activeBiases = this.biases[layer];
            for (let node = 0; node < activeSize; node++) {
                const delta = activeDelta[node];
                for (let k = 0; k < incoming.length; k++) {
                    let change = activeChanges[node][k];
                    change = learningRate * delta * incoming[k] + momentum * change;
                    activeChanges[node][k] = change;
                    activeWeights[node][k] += change;
                }
                activeBiases[node] += learningRate * delta;
            }
        }
    }
    _setupAdam() {
        this.biasChangesLow = [];
        this.biasChangesHigh = [];
        this.changesLow = [];
        this.changesHigh = [];
        this.iterations = 0;
        for (let layer = 0; layer <= this.outputLayer; layer++) {
            const size = this.sizes[layer];
            if (layer > 0) {
                this.biasChangesLow[layer] = zeros$1(size);
                this.biasChangesHigh[layer] = zeros$1(size);
                this.changesLow[layer] = new Array(size);
                this.changesHigh[layer] = new Array(size);
                for (let node = 0; node < size; node++) {
                    const prevSize = this.sizes[layer - 1];
                    this.changesLow[layer][node] = zeros$1(prevSize);
                    this.changesHigh[layer][node] = zeros$1(prevSize);
                }
            }
        }
        this.adjustWeights = this._adjustWeightsAdam;
    }
    _adjustWeightsAdam() {
        this.iterations++;
        const { iterations } = this;
        const { beta1, beta2, epsilon, learningRate } = this.trainOpts;
        for (let layer = 1; layer <= this.outputLayer; layer++) {
            const incoming = this.outputs[layer - 1];
            const currentSize = this.sizes[layer];
            const currentDeltas = this.deltas[layer];
            const currentChangesLow = this.changesLow[layer];
            const currentChangesHigh = this.changesHigh[layer];
            const currentWeights = this.weights[layer];
            const currentBiases = this.biases[layer];
            const currentBiasChangesLow = this.biasChangesLow[layer];
            const currentBiasChangesHigh = this.biasChangesHigh[layer];
            for (let node = 0; node < currentSize; node++) {
                const delta = currentDeltas[node];
                for (let k = 0; k < incoming.length; k++) {
                    const gradient = delta * incoming[k];
                    const changeLow = currentChangesLow[node][k] * beta1 + (1 - beta1) * gradient;
                    const changeHigh = currentChangesHigh[node][k] * beta2 +
                        (1 - beta2) * gradient * gradient;
                    const momentumCorrection = changeLow / (1 - Math.pow(beta1, iterations));
                    const gradientCorrection = changeHigh / (1 - Math.pow(beta2, iterations));
                    currentChangesLow[node][k] = changeLow;
                    currentChangesHigh[node][k] = changeHigh;
                    currentWeights[node][k] +=
                        (learningRate * momentumCorrection) /
                            (Math.sqrt(gradientCorrection) + epsilon);
                }
                const biasGradient = currentDeltas[node];
                const biasChangeLow = currentBiasChangesLow[node] * beta1 + (1 - beta1) * biasGradient;
                const biasChangeHigh = currentBiasChangesHigh[node] * beta2 +
                    (1 - beta2) * biasGradient * biasGradient;
                const biasMomentumCorrection = currentBiasChangesLow[node] / (1 - Math.pow(beta1, iterations));
                const biasGradientCorrection = currentBiasChangesHigh[node] / (1 - Math.pow(beta2, iterations));
                currentBiasChangesLow[node] = biasChangeLow;
                currentBiasChangesHigh[node] = biasChangeHigh;
                currentBiases[node] +=
                    (learningRate * biasMomentumCorrection) /
                        (Math.sqrt(biasGradientCorrection) + epsilon);
            }
        }
    }
    validateData(data) {
        const inputSize = this.sizes[0];
        const outputSize = this.sizes[this.sizes.length - 1];
        const { length } = data;
        for (let i = 0; i < length; i++) {
            const { input, output } = data[i];
            if (input.length !== inputSize) {
                throw new Error(`input at index ${i} length ${input.length} must be ${inputSize}`);
            }
            if (data[i].output.length !== outputSize) {
                throw new Error(`output at index ${i} length ${output.length} must be ${outputSize}`);
            }
        }
    }
    validateInput(formattedInput) {
        const inputSize = this.sizes[0];
        if (formattedInput.length !== inputSize) {
            throw new Error(`input length ${formattedInput.length} must match options.inputSize of ${inputSize}`);
        }
    }
    formatData(data) {
        if (!Array.isArray(data[0].input)) {
            if (this.inputLookup) {
                this.inputLookupLength = Object.keys(this.inputLookup).length;
            }
            else {
                const inputLookup = new LookupTable(data, 'input');
                this.inputLookup = inputLookup.table;
                this.inputLookupLength = inputLookup.length;
            }
        }
        if (!Array.isArray(data[0].output)) {
            if (this.outputLookup) {
                this.outputLookupLength = Object.keys(this.outputLookup).length;
            }
            else {
                const lookup = new LookupTable(data, 'output');
                this.outputLookup = lookup.table;
                this.outputLookupLength = lookup.length;
            }
        }
        if (!this._formatInput) {
            this._formatInput = getTypedArrayFn(data[0].input, this.inputLookup);
        }
        if (!this._formatOutput) {
            this._formatOutput = getTypedArrayFn(data[0].output, this.outputLookup);
        }
        // turn sparse hash input into arrays with 0s as filler
        if (this._formatInput && this._formatOutput) {
            const result = [];
            for (let i = 0; i < data.length; i++) {
                result.push({
                    input: this._formatInput(data[i].input),
                    output: this._formatOutput(data[i].output),
                });
            }
            return result;
        }
        if (this._formatInput) {
            const result = [];
            for (let i = 0; i < data.length; i++) {
                result.push({
                    input: this._formatInput(data[i].input),
                    output: data[i].output,
                });
            }
            return result;
        }
        if (this._formatOutput) {
            const result = [];
            for (let i = 0; i < data.length; i++) {
                result.push({
                    input: data[i].input,
                    output: this._formatOutput(data[i].output),
                });
            }
            return result;
        }
        return data;
    }
    addFormat(data) {
        var _a, _b;
        if (!Array.isArray(data.input) || typeof data.input[0] !== 'number') {
            this.inputLookup = lookup.addKeys(data.input, (_a = this.inputLookup) !== null && _a !== void 0 ? _a : {});
            if (this.inputLookup) {
                this.inputLookupLength = Object.keys(this.inputLookup).length;
            }
        }
        if (!Array.isArray(data.output) || typeof data.output[0] !== 'number') {
            this.outputLookup = lookup.addKeys(data.output, (_b = this.outputLookup) !== null && _b !== void 0 ? _b : {});
            if (this.outputLookup) {
                this.outputLookupLength = Object.keys(this.outputLookup).length;
            }
        }
    }
    test(data) {
        const { preparedData } = this.prepTraining(data);
        // for binary classification problems with one output node
        const isBinary = preparedData[0].output.length === 1;
        // for classification problems
        const misclasses = [];
        // run each pattern through the trained network and collect
        // error and misclassification statistics
        let errorSum = 0;
        if (isBinary) {
            let falsePos = 0;
            let falseNeg = 0;
            let truePos = 0;
            let trueNeg = 0;
            for (let i = 0; i < preparedData.length; i++) {
                const output = this.runInput(preparedData[i].input);
                const target = preparedData[i].output;
                const actual = output[0] > this.options.binaryThresh ? 1 : 0;
                const expected = target[0];
                if (actual !== expected) {
                    const misclass = preparedData[i];
                    misclasses.push({
                        input: misclass.input,
                        output: misclass.output,
                        actual,
                        expected,
                    });
                }
                if (actual === 0 && expected === 0) {
                    trueNeg++;
                }
                else if (actual === 1 && expected === 1) {
                    truePos++;
                }
                else if (actual === 0 && expected === 1) {
                    falseNeg++;
                }
                else if (actual === 1 && expected === 0) {
                    falsePos++;
                }
                errorSum += mse$1(output.map((value, i) => {
                    return target[i] - value;
                }));
            }
            return {
                error: errorSum / preparedData.length,
                misclasses,
                total: preparedData.length,
                trueNeg,
                truePos,
                falseNeg,
                falsePos,
                precision: truePos > 0 ? truePos / (truePos + falsePos) : 0,
                recall: truePos > 0 ? truePos / (truePos + falseNeg) : 0,
                accuracy: (trueNeg + truePos) / preparedData.length,
            };
        }
        for (let i = 0; i < preparedData.length; i++) {
            const output = this.runInput(preparedData[i].input);
            const target = preparedData[i].output;
            const actual = output.indexOf(max(output));
            const expected = target.indexOf(max(target));
            if (actual !== expected) {
                const misclass = preparedData[i];
                misclasses.push({
                    input: misclass.input,
                    output: misclass.output,
                    actual,
                    expected,
                });
            }
            errorSum += mse$1(output.map((value, i) => {
                return target[i] - value;
            }));
        }
        return {
            error: errorSum / preparedData.length,
            misclasses,
            total: preparedData.length,
        };
    }
    toJSON() {
        var _a, _b;
        if (!this.isRunnable) {
            this.initialize();
        }
        // use Array.from, keeping json small
        const jsonLayerWeights = this.weights.map((layerWeights) => {
            return layerWeights.map((layerWeights) => Array.from(layerWeights));
        });
        const jsonLayerBiases = this.biases.map((layerBiases) => Array.from(layerBiases));
        const jsonLayers = [];
        const outputLength = this.sizes.length - 1;
        for (let i = 0; i <= outputLength; i++) {
            jsonLayers.push({
                weights: (_a = jsonLayerWeights[i]) !== null && _a !== void 0 ? _a : [],
                biases: (_b = jsonLayerBiases[i]) !== null && _b !== void 0 ? _b : [],
            });
        }
        return {
            type: 'NeuralNetwork',
            sizes: [...this.sizes],
            layers: jsonLayers,
            inputLookup: this.inputLookup ? { ...this.inputLookup } : null,
            inputLookupLength: this.inputLookupLength,
            outputLookup: this.outputLookup ? { ...this.outputLookup } : null,
            outputLookupLength: this.outputLookupLength,
            options: { ...this.options },
            trainOpts: this.getTrainOptsJSON(),
        };
    }
    fromJSON(json) {
        this.options = { ...defaults$2(), ...json.options };
        if (json.hasOwnProperty('trainOpts')) {
            const trainOpts = {
                ...json.trainOpts,
                timeout: json.trainOpts.timeout === 'Infinity'
                    ? Infinity
                    : json.trainOpts.timeout,
            };
            this.updateTrainingOptions(trainOpts);
        }
        this.sizes = json.sizes;
        this.initialize();
        this.inputLookup = json.inputLookup ? { ...json.inputLookup } : null;
        this.inputLookupLength = json.inputLookupLength;
        this.outputLookup = json.outputLookup ? { ...json.outputLookup } : null;
        this.outputLookupLength = json.outputLookupLength;
        const jsonLayers = json.layers;
        const layerWeights = this.weights.map((layerWeights, layerIndex) => {
            return jsonLayers[layerIndex].weights.map((layerWeights) => Float32Array.from(layerWeights));
        });
        const layerBiases = this.biases.map((layerBiases, layerIndex) => Float32Array.from(jsonLayers[layerIndex].biases));
        for (let i = 0; i <= this.outputLayer; i++) {
            this.weights[i] = layerWeights[i] || [];
            this.biases[i] = layerBiases[i] || [];
        }
        return this;
    }
    toFunction(cb) {
        const { activation, leakyReluAlpha } = this.trainOpts;
        let needsVar = false;
        const nodeHandle = (layerIndex, nodeIndex) => {
            if (layerIndex === 0) {
                return `(input[${nodeIndex}]||0)`;
            }
            const weights = this.weights[layerIndex][nodeIndex];
            const bias = this.biases[layerIndex][nodeIndex];
            if (!weights) {
                throw new Error(`weights at layerIndex ${layerIndex} & nodeIndex ${nodeIndex} not found`);
            }
            if (!bias) {
                throw new Error(`bias as layerIndex ${layerIndex} & nodeIndex ${nodeIndex} not found`);
            }
            const weightsArray = [];
            weights.forEach((weight, subNodeIndex) => {
                if (weight < 0) {
                    weightsArray.push(`${weight}*${nodeHandle(layerIndex - 1, subNodeIndex)}`);
                }
                else {
                    weightsArray.push(`+${weight}*${nodeHandle(layerIndex - 1, subNodeIndex)}`);
                }
            });
            const result = `(${bias.toString()}${weightsArray.join('')})`;
            switch (activation) {
                case 'sigmoid':
                    return `1/(1+1/Math.exp(${result}))`;
                case 'relu': {
                    needsVar = true;
                    return `((v=${result})<0?0:v)`;
                }
                case 'leaky-relu': {
                    needsVar = true;
                    return `Math.max((v=${result}),${leakyReluAlpha}*v)`;
                }
                case 'tanh':
                    return `Math.tanh(${result})`;
                default:
                    throw new Error(`Unknown activation ${activation}. Available activations are: 'sigmoid', 'relu', 'leaky-relu', 'tanh'`);
            }
        };
        function checkKeys(keys) {
            if (keys.find((v) => v.includes('"'))) {
                throw new Error(`key contains '"', which is not compatible`);
            }
        }
        const layersAsMath = [];
        let result;
        let inputLookup = '';
        if (this.inputLookup) {
            const keys = Object.keys(this.inputLookup);
            checkKeys(keys);
            inputLookup = `input = new Float32Array([${Object.keys(this.inputLookup)
                .map((key) => `input["${key}"]`)
                .join(',')}]);`;
        }
        if (this.sizes.length < 1)
            throw new Error('No layers');
        for (let nodeIndex = 0; nodeIndex < this.sizes[this.outputLayer]; nodeIndex++) {
            layersAsMath.push(nodeHandle(this.outputLayer, nodeIndex));
        }
        if (this.outputLookup) {
            const keys = Object.keys(this.outputLookup);
            checkKeys(keys);
            const values = keys
                .map((key, i) => `"${key}":${layersAsMath[i]}`)
                .join(',');
            result = `{${values}}`;
        }
        else {
            result = `[${layersAsMath.join(',')}]`;
        }
        const source = `${inputLookup}${needsVar ? 'var v;' : ''}return ${result};`;
        // eslint-disable-next-line @typescript-eslint/no-implied-eval,no-new-func
        return new Function('input', cb ? cb(source) : source);
    }
}

function weightedSumSigmoid(weights, biases, inputs) {
    let sum = biases[this.thread.x];
    for (let k = 0; k < this.constants.size; k++) {
        sum += weights[this.thread.x][k] * inputs[k];
    }
    // sigmoid
    return 1 / (1 + Math.exp(-sum));
}
function weightedSumRelu(weights, biases, inputs) {
    let sum = biases[this.thread.x];
    for (let k = 0; k < this.constants.size; k++) {
        sum += weights[this.thread.x][k] * inputs[k];
    }
    // relu
    return sum < 0 ? 0 : sum;
}
function weightedSumLeakyRelu(weights, biases, inputs) {
    let sum = biases[this.thread.x];
    for (let k = 0; k < this.constants.size; k++) {
        sum += weights[this.thread.x][k] * inputs[k];
    }
    // leaky relu
    return sum < 0 ? 0 : 0.01 * sum;
}
function weightedSumTanh(weights, biases, inputs) {
    let sum = biases[this.thread.x];
    for (let k = 0; k < this.constants.size; k++) {
        sum += weights[this.thread.x][k] * inputs[k];
    }
    // tanh
    return Math.tanh(sum);
}
function calcErrorOutput(output, target) {
    return target - output;
}
function calcDeltasSigmoid(error, output) {
    // sigmoid derivative
    return error * output * (1 - output);
}
function calcDeltasRelu(error, output) {
    // relu derivative
    return output > 0 ? error : 0;
}
function calcDeltasLeakyRelu(error, output) {
    // leaky relu derivative
    return output > 0 ? error : 0.01 * error;
}
function calcDeltasTanh(error, output) {
    // tanh derivative
    return (1 - output * output) * error;
}
function calcError(x, size, nextWeights, nextDeltas) {
    let error = 0;
    for (let k = 0; k < size; k++) {
        error += nextDeltas[k] * nextWeights[k][x];
    }
    return error;
}
function calcChanges(learningRate, momentum, previousChange, delta, previousOutput) {
    return learningRate * delta * previousOutput + momentum * previousChange;
}
function addWeights(change, weight) {
    return change + weight;
}
function addBiases(biases, deltas) {
    return (biases[this.thread.x] + deltas[this.thread.x] * this.constants.learningRate);
}
// mean squared error, reimplemented for GPU
function mse(errors) {
    let sum = 0;
    for (let i = 0; i < this.constants.size; i++) {
        sum += errors[i] ** 2;
    }
    return sum / this.constants.size;
}
class NeuralNetworkGPU extends NeuralNetwork {
    constructor(options = {}) {
        super(options);
        this.texturizeInputData = () => {
            throw new Error('not yet setup');
        };
        this.forwardPropagate = [];
        this.backwardPropagate = [];
        this.changesPropagate = [];
        this.biasesPropagate = [];
        this.getMSE = () => {
            throw new Error('not yet setup');
        };
        this._addMSE = () => {
            throw new Error('not yet setup');
        };
        this._divideMSESum = () => {
            throw new Error('not yet setup');
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.outputs = [];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.deltas = [];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.errors = [];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.weights = [];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.changes = [];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.biases = [];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.runInput = (input) => {
            let output;
            this.outputs[0] = input;
            for (let layer = 1; layer <= this.outputLayer; layer++) {
                release(this.outputs[layer]);
                this.outputs[layer] = this.forwardPropagate[layer](this.weights[layer], this.biases[layer], input);
                output = input = this.outputs[layer];
            }
            return output;
        };
        this.calculateDeltas = (target) => {
            for (let layer = this.outputLayer; layer > 0; layer--) {
                release(this.deltas[layer]);
                release(this.errors[layer]);
                let output;
                if (layer === this.outputLayer) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    output = this.backwardPropagate[layer](this.outputs[layer], target);
                }
                else {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    output = this.backwardPropagate[layer](this.weights[layer + 1], this.outputs[layer], this.deltas[layer + 1]);
                }
                this.deltas[layer] = output.result;
                this.errors[layer] = output.error;
            }
        };
        this.errorCheckInterval = 100;
        this.gpu = new gpu_js.GPU({ mode: options.mode });
    }
    initialize() {
        super.initialize();
        this.buildRunInput();
        this.buildCalculateDeltas();
        this.buildGetChanges();
        this.buildChangeBiases();
        this.buildGetMSE();
    }
    setActivation() { }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    trainPattern(value, logErrorRate) {
        // forward propagate
        this.runInput(value.input);
        // back propagate
        this.calculateDeltas(value.output);
        this.adjustWeights();
        if (logErrorRate) {
            return this.getMSE(this.errors[this.outputLayer]);
        }
        return null;
    }
    calculateTrainingError(data) {
        let sum = new Float32Array([0]);
        for (let i = 0; i < data.length; ++i) {
            const prevSum = sum;
            const error = this.trainPattern(data[i], true);
            sum = this._addMSE(sum, error);
            release(error);
            release(prevSum);
        }
        const result = this._divideMSESum(data.length, sum);
        release(sum);
        return (result instanceof gpu_js.Texture
            ? result.toArray()
            : result)[0];
    }
    adjustWeights() {
        this.getChanges();
        this.changeBiases();
    }
    buildRunInput() {
        let weightedSum = null;
        switch (this.trainOpts.activation) {
            case 'sigmoid':
                weightedSum = weightedSumSigmoid;
                break;
            case 'relu':
                weightedSum = weightedSumRelu;
                break;
            case 'leaky-relu':
                weightedSum = weightedSumLeakyRelu;
                break;
            case 'tanh':
                weightedSum = weightedSumTanh;
                break;
            default:
                throw new Error(`Unknown activation ${this.trainOpts.activation}. Available activations are: 'sigmoid', 'relu', 'leaky-relu', 'tanh'`);
        }
        for (let layer = 1; layer <= this.outputLayer; layer++) {
            this.forwardPropagate[layer] = this.gpu.createKernel(weightedSum, {
                output: [this.sizes[layer]],
                pipeline: true,
                constants: {
                    size: this.sizes[layer - 1],
                },
                immutable: true,
            });
        }
        this.texturizeInputData = this.gpu.createKernel(function (value) {
            return value[this.thread.x];
        }, {
            output: [this.sizes[1]],
            pipeline: true,
            immutable: true,
        });
    }
    buildCalculateDeltas() {
        let calcDeltas;
        switch (this.trainOpts.activation) {
            case 'sigmoid':
                calcDeltas = calcDeltasSigmoid;
                break;
            case 'relu':
                calcDeltas = calcDeltasRelu;
                break;
            case 'leaky-relu':
                calcDeltas = calcDeltasLeakyRelu;
                break;
            case 'tanh':
                calcDeltas = calcDeltasTanh;
                break;
            default:
                throw new Error(`Unknown activation ${this.trainOpts.activation}. Available activations are: 'sigmoid', 'relu', 'leaky-relu', 'tanh'`);
        }
        calcDeltas = gpu_js.alias(gpu_js.utils.getMinifySafeName(() => calcDeltas), calcDeltas);
        this.gpu.addFunction(calcDeltas);
        for (let layer = this.outputLayer; layer > 0; layer--) {
            if (layer === this.outputLayer) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                this.backwardPropagate[this.outputLayer] = this.gpu.createKernelMap({
                    error: calcErrorOutput,
                }, function (outputs, targets) {
                    const output = outputs[this.thread.x];
                    const target = targets[this.thread.x];
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    return calcDeltas(calcErrorOutput(output, target), output);
                }, {
                    output: [this.sizes[this.outputLayer]],
                    pipeline: true,
                    immutable: true,
                });
            }
            else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                this.backwardPropagate[layer] = this.gpu.createKernelMap({
                    error: calcError,
                }, function (nextWeights, outputs, nextDeltas) {
                    const output = outputs[this.thread.x];
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    return calcDeltas(calcError(this.thread.x, this.constants.size, nextWeights, nextDeltas), output);
                }, {
                    output: [this.sizes[layer]],
                    pipeline: true,
                    constants: {
                        size: this.sizes[layer + 1],
                    },
                    immutable: true,
                });
            }
        }
    }
    buildGetChanges() {
        for (let layer = 1; layer <= this.outputLayer; layer++) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            this.changesPropagate[layer] = this.gpu.createKernelMap({
                weights: addWeights,
                changes: calcChanges,
            }, function (previousOutputs, deltas, weights, previousChanges) {
                const change = calcChanges(this.constants.learningRate, this.constants.momentum, previousChanges[this.thread.y][this.thread.x], deltas[this.thread.y], previousOutputs[this.thread.x]);
                return addWeights(change, weights[this.thread.y][this.thread.x]);
            }, {
                output: [this.sizes[layer - 1], this.sizes[layer]],
                pipeline: true,
                constants: {
                    size: this.sizes[layer - 1],
                    learningRate: this.trainOpts.learningRate,
                    momentum: this.trainOpts.momentum,
                },
                immutable: true,
            });
        }
    }
    getChanges() {
        for (let layer = 1; layer <= this.outputLayer; layer++) {
            const weights = this.weights[layer];
            const changes = this.changes[layer];
            const output = this.changesPropagate[layer](this.outputs[layer - 1], this.deltas[layer], weights, changes);
            release(weights);
            release(changes);
            this.weights[layer] = output.weights;
            this.changes[layer] = output.changes;
            release(output.result);
        }
    }
    buildChangeBiases() {
        for (let layer = 1; layer <= this.outputLayer; layer++) {
            this.biasesPropagate[layer] = this.gpu.createKernel(addBiases, {
                output: [this.sizes[layer]],
                pipeline: true,
                constants: {
                    learningRate: this.trainOpts.learningRate,
                },
                immutable: true,
            });
        }
    }
    changeBiases() {
        for (let layer = 1; layer <= this.outputLayer; layer++) {
            const biases = this.biases[layer];
            this.biases[layer] = this.biasesPropagate[layer](biases, this.deltas[layer]);
            release(biases);
        }
    }
    buildGetMSE() {
        this.getMSE = this.gpu.createKernel(mse, {
            output: [1],
            constants: {
                size: this.sizes[this.outputLayer],
            },
            pipeline: true,
            immutable: true,
        });
        this._addMSE = this.gpu.createKernel(function (value1, value2) {
            return value1[0] + value2[0];
        }, {
            output: [1],
            pipeline: true,
            immutable: true,
        });
        this._divideMSESum = this.gpu.createKernel(function (length, mseSum) {
            const value = mseSum[0];
            if (value > 0) {
                return value / length;
            }
            return 0;
        }, {
            output: [1],
        });
    }
    run(input) {
        if (!this.isRunnable) {
            throw new Error('network not runnable');
        }
        let formattedInput;
        if (this.inputLookup) {
            formattedInput = lookup.toArray(this.inputLookup, input, this.inputLookupLength);
        }
        else {
            formattedInput = input;
        }
        this.validateInput(formattedInput);
        const outputTextures = this.runInput(formattedInput);
        const output = outputTextures instanceof gpu_js.Texture
            ? outputTextures.toArray()
            : outputTextures;
        if (this.outputLookup) {
            return lookup.toObject(this.outputLookup, output);
        }
        return output;
    }
    // @ts-expect-error the underlying network works as normal, but we are working on the GPU
    prepTraining(data, options = {}) {
        this.updateTrainingOptions(options);
        const preparedData = this.formatData(data);
        const endTime = Date.now() + this.trainOpts.timeout;
        const status = {
            error: 1,
            iterations: 0,
        };
        this.verifyIsInitialized(preparedData);
        const texturizeOutputData = this.gpu.createKernel(function (value) {
            return value[this.thread.x];
        }, {
            output: [preparedData[0].output.length],
            pipeline: true,
            immutable: true,
        });
        return {
            preparedData: preparedData.map((set) => ({
                input: this.texturizeInputData(set.input),
                output: texturizeOutputData(set.output),
            })),
            status,
            endTime,
        };
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    toFunction() {
        throw new Error(`${this.constructor.name}-toFunction is not yet implemented`);
    }
    toJSON() {
        var _a, _b;
        if (this.sizes === null) {
            this.initialize();
        }
        // use Array.from, keeping json small
        const jsonLayerWeights = this.weights.map((layerWeights) => {
            return (layerWeights instanceof gpu_js.Texture
                ? layerWeights.toArray()
                : layerWeights).map((layerWeights) => Array.from(layerWeights));
        });
        const jsonLayerBiases = this.biases.map((layerBiases) => Array.from(layerBiases instanceof gpu_js.Texture
            ? layerBiases.toArray()
            : layerBiases));
        const jsonLayers = [];
        for (let i = 0; i <= this.outputLayer; i++) {
            jsonLayers.push({
                weights: (_a = jsonLayerWeights[i]) !== null && _a !== void 0 ? _a : [],
                biases: (_b = jsonLayerBiases[i]) !== null && _b !== void 0 ? _b : [],
            });
        }
        return {
            type: 'NeuralNetworkGPU',
            sizes: [...this.sizes],
            layers: jsonLayers,
            inputLookup: this.inputLookup ? { ...this.inputLookup } : null,
            inputLookupLength: this.inputLookupLength,
            outputLookup: this.outputLookup ? { ...this.outputLookup } : null,
            outputLookupLength: this.outputLookupLength,
            options: { ...this.options },
            trainOpts: this.getTrainOptsJSON(),
        };
    }
}

class RecurrentConnection extends Internal {
    constructor() {
        super(...arguments);
        this.settings = {};
        this.layer = null;
    }
    setLayer(layer) {
        this.layer = layer;
    }
    get width() {
        if (!this.layer)
            throw new Error('layer not set');
        return this.layer.width;
    }
    set width(value) {
        throw new Error(`${this.constructor.name}-width is not yet implemented`);
    }
    get height() {
        if (!this.layer)
            throw new Error('layer not set');
        return this.layer.height;
    }
    set height(value) {
        throw new Error(`${this.constructor.name}-height is not yet implemented`);
    }
    get deltas() {
        if (!this.layer)
            throw new Error('layer not set');
        return this.layer.deltas;
    }
    set deltas(deltas) {
        if (!this.layer)
            throw new Error('layer not set');
        release(this.layer.deltas);
        this.layer.deltas = deltas;
    }
    get weights() {
        if (!this.layer)
            throw new Error('layer not set');
        return this.layer.weights;
    }
    set weights(weights) {
        if (!this.layer)
            throw new Error('layer not set');
        release(this.layer.weights);
        this.layer.weights = weights;
    }
    predict() {
        // throw new Error(`${this.constructor.name}-predict is not yet implemented`)
    }
    compare() {
        // throw new Error(`${this.constructor.name}-compare is not yet implemented`)
    }
    learn() {
        throw new Error('no longer using');
    }
    setupKernels() {
        // throw new Error(
        //   `${this.constructor.name}-setupKernels is not yet implemented`
        // )
    }
    reuseKernels() {
        // throw new Error(
        //   `${this.constructor.name}-reuseKernels is not yet implemented`
        // )
    }
}

class Recurrent extends FeedForward {
    // TODO: use generics in extend
    constructor(options = {}) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        super(options);
        this.trainOpts = {};
        this._outputConnection = null;
        this._layerSets = [];
        this._hiddenLayerOutputIndices = [];
        this._model = null;
    }
    _connectLayers() {
        if (!this.options.inputLayer) {
            throw new Error('inputLayer not found');
        }
        if (!this.options.outputLayer) {
            throw new Error('outputLayer not found');
        }
        const inputLayer = this.options.inputLayer();
        const hiddenLayers = this._connectHiddenLayers(inputLayer);
        const outputLayer = this.options.outputLayer(hiddenLayers[hiddenLayers.length - 1], -1);
        return {
            inputLayer,
            hiddenLayers,
            outputLayer,
        };
    }
    _connectLayersDeep() {
        const layers = [];
        const previousLayers = this._layerSets[this._layerSets.length - 1];
        let usedHiddenLayerOutputIndex = 0;
        function findInputLayer(inputLayer) {
            const index = previousLayers.indexOf(inputLayer);
            if (index < 0)
                throw new Error('unable to find layer');
            return layers[index];
        }
        function layerSettings(layer) {
            return {
                ...layer.settings,
                weights: null,
                deltas: null,
                praxis: null,
            };
        }
        for (let i = 0; i < previousLayers.length; i++) {
            const previousLayer = previousLayers[i];
            let layer;
            if (previousLayer instanceof Activation) {
                layer = new previousLayer.constructor(findInputLayer(previousLayer.inputLayer), layerSettings(previousLayer));
            }
            else if (previousLayer instanceof EntryPoint) {
                layer = new previousLayer.constructor(layerSettings(previousLayer));
            }
            else if (previousLayer instanceof Filter) {
                layer = new previousLayer.constructor(layerSettings(previousLayer.inputLayer), findInputLayer(previousLayer.inputLayer));
            }
            else if (previousLayer instanceof Internal) {
                const previousHiddenLayerOutput = previousLayers[this._hiddenLayerOutputIndices[usedHiddenLayerOutputIndex++]];
                if (previousLayer instanceof RecurrentConnection) {
                    throw new Error('unfinished');
                }
                else if (previousLayer instanceof RecurrentInput) {
                    layer = new RecurrentInput(previousHiddenLayerOutput);
                }
                else if (previousLayer instanceof RecurrentZeros) {
                    layer = new RecurrentInput(previousHiddenLayerOutput);
                }
                else {
                    throw new Error(`hidden layer ${previousLayer.constructor.name} extends unknown hidden layer`);
                }
            }
            else if (previousLayer instanceof InternalModel ||
                previousLayer instanceof Model) {
                layer = previousLayer;
            }
            else if (previousLayer instanceof Modifier) {
                layer = new previousLayer.constructor(findInputLayer(previousLayer.inputLayer), layerSettings(previousLayer.inputLayer));
            }
            else if (previousLayer instanceof Operator) {
                layer = new previousLayer.constructor(findInputLayer(previousLayer.inputLayer1), findInputLayer(previousLayer.inputLayer2), layerSettings(previousLayer));
            }
            else if (previousLayer instanceof Target) {
                layer = new previousLayer.constructor(layerSettings(previousLayer), findInputLayer(previousLayer.inputLayer));
            }
            else {
                throw new Error(`hidden layer ${previousLayer.constructor.name} extends unknown hidden layer`);
            }
            layers.push(layer);
        }
        return layers;
    }
    _connectHiddenLayers(previousLayer) {
        const hiddenLayers = [];
        if (!this.options.hiddenLayers)
            throw new Error('hiddenLayers not defined');
        for (let i = 0; i < this.options.hiddenLayers.length; i++) {
            const recurrentInput = new RecurrentZeros();
            const hiddenLayer = this.options.hiddenLayers[i](previousLayer, recurrentInput, i);
            previousLayer = hiddenLayer;
            hiddenLayers.push(hiddenLayer);
        }
        return hiddenLayers;
    }
    initialize() {
        this._outputConnection = new RecurrentConnection();
        let layerSet;
        if (this.options.layers) {
            layerSet = this._connectOptionsLayers();
        }
        else {
            const { inputLayer, hiddenLayers, outputLayer } = this._connectLayers();
            layerSet = flattenLayers([inputLayer, ...hiddenLayers, outputLayer]);
            this._hiddenLayerOutputIndices = hiddenLayers.map((l) => layerSet.indexOf(l));
            this._inputLayer = inputLayer;
            this._hiddenLayers = hiddenLayers;
            this._outputLayer = outputLayer;
        }
        this.layers = layerSet;
        this._layerSets = [layerSet];
        this._model = layerSet.filter((l) => l instanceof Model || l instanceof InternalModel);
        this.initializeLayers(layerSet);
    }
    initializeDeep() {
        const layers = this._connectLayersDeep();
        for (let i = 0; i < layers.length; i++) {
            const layer = layers[i];
            layer.setupKernels(true);
            layer.reuseKernels(this._layerSets[0][i]);
        }
        this._layerSets.push(layers);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    run(inputs) {
        while (this._layerSets.length <= inputs.length) {
            this.initializeDeep();
        }
        const result = this.runInputs(inputs);
        if (result instanceof gpu_js.Texture) {
            return result.toArray();
        }
        return result;
    }
    runInput(input) {
        throw new Error('use .runInputs()');
    }
    runInputs(inputs) {
        while (this._layerSets.length < inputs.length) {
            this.initializeDeep();
        }
        const max = inputs.length - 1; // last output will be compared with last index
        for (let x = 0; x <= max; x++) {
            const layerSet = this._layerSets[x];
            layerSet[0].predict(inputs[x]);
            for (let i = 1; i < layerSet.length; i++) {
                layerSet[i].predict();
            }
        }
        const lastLayerUsed = this._layerSets[max];
        const result = lastLayerUsed[lastLayerUsed.length - 1].weights;
        this.end();
        return result;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    train(data, options = {}) {
        const { preparedData, status, endTime } = this._prepTraining(data, options);
        let continueTicking = true;
        const calculateError = () => this._calculateTrainingError(preparedData);
        const trainPatters = () => this._trainPatterns(preparedData);
        while (continueTicking) {
            continueTicking = this._trainingTick(status, endTime, calculateError, trainPatters);
        }
        return status;
    }
    end() {
        const x = this._layerSets.length - 1;
        const lastLayerSet = this._layerSets[x];
        lastLayerSet[0].predict([new Float32Array([0])]);
        for (let i = 1; i < lastLayerSet.length; i++) {
            lastLayerSet[i].predict();
        }
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    transferData(formattedData) {
        return formattedData;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    _prepTraining(data, options) {
        this._updateTrainingOptions(options);
        const endTime = this.trainOpts.timeout
            ? Date.now() + this.trainOpts.timeout
            : 0;
        const status = {
            error: 1,
            iterations: 0,
        };
        this.verifyIsInitialized();
        return {
            preparedData: this.transferData(data),
            status,
            endTime,
        };
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    _calculateTrainingError(data) {
        if (!this.meanSquaredError) {
            throw new Error('this.meanSquaredError not setup');
        }
        let sum = new Float32Array(1);
        for (let i = 0; i < data.length; ++i) {
            const prevSum = sum;
            const error = this._trainPattern(data[i], true);
            sum = this.meanSquaredError.add(sum, error);
            release(error);
            release(prevSum);
        }
        const result = this.meanSquaredError.divide(data.length, sum);
        release(sum);
        if (result instanceof gpu_js.Texture) {
            const resultArray = result.toArray();
            return resultArray[0];
        }
        return result[0];
    }
    // TODO: more types
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    formatData(data) {
        return data;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    _calculateDeltas(target) {
        const lastLayerSet = this._layerSets[this._layerSets.length - 1];
        // Iterate from the second to last layer backwards, propagating 0's
        for (let i = lastLayerSet.length - 2; i >= 0; i--) {
            lastLayerSet[i].compare();
        }
        for (let x = target.length - 2; x >= 0; x--) {
            const layerSet = this._layerSets[x];
            layerSet[layerSet.length - 1].compare(target[x + 1]);
            for (let i = layerSet.length - 2; i >= 0; i--) {
                layerSet[i].compare();
            }
        }
    }
    adjustWeights() {
        var _a;
        const _model = this._model;
        for (let i = 0; i < _model.length; i++) {
            _model[i].learn((_a = this.options.learningRate) !== null && _a !== void 0 ? _a : 0);
        }
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    _trainPatterns(data) {
        for (let i = 0; i < data.length; ++i) {
            this._trainPattern(data[i], false);
        }
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    _trainPattern(inputs, logErrorRate) {
        // forward propagate
        this.runInputs(inputs);
        // back propagate
        this._calculateDeltas(inputs);
        this.adjustWeights();
        if (logErrorRate) {
            if (!this.meanSquaredError) {
                throw new Error('this.meanSquaredError not setup');
            }
            let error = new Float32Array(1);
            for (let i = 0, max = inputs.length - 2; i <= max; i++) {
                const layerSet = this._layerSets[i];
                const lastLayer = layerSet[layerSet.length - 1];
                const prevError = error;
                error = this.meanSquaredError.addAbsolute(prevError, lastLayer.errors);
                release(prevError);
            }
            return clone(this.meanSquaredError.divide(inputs.length, error));
        }
        return null;
    }
}

/**
 * A matrix
 */
class Matrix {
    constructor(rows, columns) {
        this.rows = 0;
        this.columns = 0;
        if (rows)
            this.rows = rows;
        if (columns)
            this.columns = columns;
        this.weights = zeros$1(this.rows * this.columns);
        this.deltas = zeros$1(this.rows * this.columns);
    }
    getWeight(row, col) {
        // slow but careful accessor function
        // we want row-major order
        const ix = this.columns * row + col;
        if (ix < 0 || ix >= this.weights.length) {
            throw new Error('get accessor is skewed');
        }
        return this.weights[ix];
    }
    setWeight(row, col, v) {
        // slow but careful accessor function
        const ix = this.columns * row + col;
        if (ix < 0 || ix >= this.weights.length) {
            throw new Error('set accessor is skewed');
        }
        this.weights[ix] = v;
        return this;
    }
    getDelta(row, col) {
        // slow but careful accessor function
        // we want row-major order
        const ix = this.columns * row + col;
        if (ix < 0 || ix >= this.deltas.length) {
            throw new Error('get accessor is skewed');
        }
        return this.deltas[ix];
    }
    setDelta(row, col, v) {
        // slow but careful accessor function
        const ix = this.columns * row + col;
        if (ix < 0 || ix >= this.weights.length) {
            throw new Error('set accessor is skewed');
        }
        this.deltas[ix] = v;
        return this;
    }
    toJSON() {
        return {
            rows: this.rows,
            columns: this.columns,
            weights: Array.from(this.weights.slice(0)),
        };
    }
    static fromJSON(json) {
        const matrix = new Matrix(json.rows, json.columns);
        for (let i = 0, max = json.rows * json.columns; i < max; i++) {
            matrix.weights[i] = json.weights[i]; // copy over weights
        }
        return matrix;
    }
    static fromArray(weights) {
        const matrix = new Matrix(weights.length, weights[0].length);
        matrix.fromArray(weights);
        return matrix;
    }
    deltasToArray() {
        return this.toArray('deltas');
    }
    weightsToArray() {
        return this.toArray('weights');
    }
    toArray(prop = 'weights') {
        const result = new Array(this.rows);
        this.iterate({
            row: (rowIndex) => {
                result[rowIndex] = new Array(this.columns);
            },
            column: (rowIndex, columnIndex) => {
                if (prop === 'weights') {
                    result[rowIndex][columnIndex] = this.getWeight(rowIndex, columnIndex);
                }
                else if (prop === 'deltas') {
                    result[rowIndex][columnIndex] = this.getDelta(rowIndex, columnIndex);
                }
            },
        });
        return result;
    }
    fromArray(array, prop = 'weights') {
        if (array.length !== this.rows) {
            throw new Error('rows do not match');
        }
        if (array[0].length !== this.columns) {
            throw new Error('columns do not match');
        }
        this.iterate({
            column: (rowIndex, columnIndex) => {
                const value = array[rowIndex][columnIndex];
                if (typeof value !== 'number') {
                    throw new Error('value not number');
                }
                if (prop === 'weights') {
                    this.setWeight(rowIndex, columnIndex, value);
                }
                else if (prop === 'deltas') {
                    this.setDelta(rowIndex, columnIndex, value);
                }
            },
        });
        return this;
    }
    iterate(callbacks) {
        const rows = this.rows;
        const columns = this.columns;
        for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
            if (callbacks.row) {
                callbacks.row(rowIndex);
            }
            for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
                if (callbacks.column) {
                    callbacks.column(rowIndex, columnIndex);
                }
            }
        }
        return this;
    }
}

/** return Matrix but filled with random numbers from gaussian
 */
class RandomMatrix extends Matrix {
    constructor(rows, columns, std) {
        super(rows, columns);
        this.std = std;
        for (let i = 0, max = this.weights.length; i < max; i++) {
            this.weights[i] = randomFloat(-std, std);
        }
    }
}

class DataFormatter {
    constructor(values, maxThreshold = 0) {
        this.values = values;
        this.indexTable = {};
        this.characterTable = {};
        this.characters = [];
        this.specialIndexes = [];
        this.isSetup = false;
        if (values === undefined)
            return;
        this.setup(values, maxThreshold);
    }
    setup(values, maxThreshold = 0) {
        if (this.isSetup)
            throw new Error('DataFormatter is already setup');
        this.values = values;
        // go over all characters and keep track of all unique ones seen
        // count up all characters
        this.buildCharactersFromIterable(values);
        this.buildTables(maxThreshold);
        if (values[0].input) {
            this.addInputOutput();
        }
        this.addUnrecognized();
        this.isSetup = true;
    }
    buildCharactersFromIterable(values) {
        const tempCharactersTable = {};
        for (let dataFormatterIndex = 0, dataFormatterLength = values.length; dataFormatterIndex < dataFormatterLength; dataFormatterIndex++) {
            const characters = values[dataFormatterIndex];
            // if (typeof characters === 'string') {
            //   const character = characters;
            //   if (tempCharactersTable.hasOwnProperty(character)) continue;
            //   tempCharactersTable[character] = true;
            //   this.characters.push(character);
            if (characters.hasOwnProperty('length')) {
                const iteratable = characters;
                for (let characterIndex = 0, charactersLength = iteratable.length; characterIndex < charactersLength; characterIndex++) {
                    const character = iteratable[characterIndex];
                    if (tempCharactersTable.hasOwnProperty(character))
                        continue;
                    tempCharactersTable[character] = true;
                    this.characters.push(character);
                }
            }
            else if (typeof characters === 'number') {
                if (tempCharactersTable.hasOwnProperty(characters))
                    continue;
                tempCharactersTable[characters] = true;
                this.characters.push(characters);
            }
            else if (typeof characters === 'boolean') {
                const character = characters.toString();
                if (tempCharactersTable.hasOwnProperty(character))
                    continue;
                tempCharactersTable[character] = true;
                this.characters.push(character);
            }
            else if (Array.isArray(characters) &&
                typeof characters[0] === 'string') {
                for (let i = 0; i < characters.length; i++) {
                    const character = characters[i];
                    if (tempCharactersTable.hasOwnProperty(character))
                        continue;
                    tempCharactersTable[character] = true;
                    this.characters.push(character);
                }
            }
            else if (Array.isArray(characters) &&
                (typeof characters[0] === 'number' ||
                    typeof characters[0] === 'boolean')) {
                for (let i = 0; i < characters.length; i++) {
                    const character = characters[i].toString();
                    if (tempCharactersTable.hasOwnProperty(dataFormatterIndex))
                        continue;
                    tempCharactersTable[character] = true;
                    this.characters.push(character);
                }
            }
            else if (characters.hasOwnProperty('input') &&
                characters.hasOwnProperty('output')) {
                const { input, output } = characters;
                if (Array.isArray(input)) {
                    this.addCharacters(input, tempCharactersTable);
                }
                else {
                    this.addCharacters(input.toString(), tempCharactersTable);
                }
                if (Array.isArray(output)) {
                    this.addCharacters(output, tempCharactersTable);
                }
                else {
                    this.addCharacters(output.toString(), tempCharactersTable);
                }
            }
            else {
                throw new Error('Unhandled value');
            }
        }
    }
    addCharacters(characters, charactersTable) {
        for (let i = 0; i < characters.length; i++) {
            const character = characters[i].toString();
            if (charactersTable.hasOwnProperty(character))
                continue;
            charactersTable[character] = true;
            this.characters.push(character);
        }
    }
    buildTables(maxThreshold) {
        // filter by count threshold and create pointers
        const charactersLength = this.characters.length;
        for (let characterIndex = 0; characterIndex < charactersLength; characterIndex++) {
            const character = this.characters[characterIndex];
            if (characterIndex >= maxThreshold) {
                // add character to dataFormatter
                this.indexTable[character] = characterIndex;
                this.characterTable[characterIndex] = character;
            }
        }
    }
    toIndexes(value, maxThreshold = 0) {
        const result = [];
        const { indexTable } = this;
        switch (typeof value) {
            case 'number':
            case 'boolean':
                value = value.toString();
        }
        for (let i = 0, max = value.length; i < max; i++) {
            const character = value[i].toString();
            let index = indexTable[character];
            if (index === undefined) {
                if (indexTable.unrecognized) {
                    index = indexTable.unrecognized;
                }
                else {
                    throw new Error(`unrecognized character "${character}"`);
                }
            }
            if (index < maxThreshold)
                continue;
            result.push(index);
        }
        return result;
    }
    toIndexesInputOutput(input, output, maxThreshold = 0) {
        const result = this.toIndexesValue(input, maxThreshold, true);
        if (typeof output === 'undefined')
            return result;
        return result.concat(this.toIndexesValue(output, maxThreshold, false));
    }
    toIndexesValue(value, maxThreshold, isInput) {
        if (typeof value === 'string') {
            value = value.split('');
        }
        else if (typeof value === 'number' || typeof value === 'boolean') {
            value = value.toString().split('');
        }
        else if (Array.isArray(value) &&
            (typeof value[0] === 'number' ||
                typeof value[0] === 'boolean' ||
                typeof value[0] === 'string')) {
            value = value.map((v) => v.toString());
        }
        else {
            throw new Error('unrecognized value');
        }
        if (isInput) {
            value = value.concat(['stop-input', 'start-output']);
        }
        return this.toIndexes(value, maxThreshold);
    }
    toCharacters(indices, maxThreshold = 0) {
        const result = [];
        const { indexTable, characterTable } = this;
        for (let i = 0, max = indices.length; i < max; i++) {
            const index = indices[i];
            if (index < maxThreshold)
                continue;
            let character = characterTable[index];
            if (character === undefined) {
                if (indexTable.unrecognized) {
                    character = characterTable[indexTable.unrecognized];
                }
                else {
                    throw new Error(`unrecognized index "${index}"`);
                }
            }
            else if (character !== null) {
                result.push(character.toString());
            }
        }
        return result;
    }
    toString(indices, maxThreshold) {
        return this.toCharacters(indices, maxThreshold).join('');
    }
    addInputOutput() {
        this.addSpecial('stop-input');
        this.addSpecial('start-output');
    }
    addUnrecognized() {
        this.addSpecial('unrecognized');
    }
    static fromAllPrintable(maxThreshold, values = ['\n']) {
        for (let i = 32; i <= 126; i++) {
            values.push(String.fromCharCode(i));
        }
        return new DataFormatter(values, maxThreshold);
    }
    static fromAllPrintableInputOutput(maxThreshold, values = ['\n']) {
        const dataFormatter = DataFormatter.fromAllPrintable(maxThreshold, values);
        dataFormatter.addInputOutput();
        dataFormatter.addUnrecognized();
        return dataFormatter;
    }
    static fromStringInputOutput(string, maxThreshold) {
        const values = Array.from(new Set(string)).join('');
        const dataFormatter = new DataFormatter(values.split(''), maxThreshold);
        dataFormatter.addInputOutput();
        dataFormatter.addUnrecognized();
        dataFormatter.isSetup = true;
        return dataFormatter;
    }
    static fromArrayInputOutput(data, maxThreshold) {
        const values = [];
        for (let i = 0; i < data.length; i++) {
            const datum = data[i];
            values.push(validateAndCast(datum.input), validateAndCast(datum.output));
        }
        const flatArray = Array.isArray(values)
            ? values.flat()
            : values;
        const dataFormatter = new DataFormatter(Array.from(new Set(flatArray)), maxThreshold);
        dataFormatter.addInputOutput();
        dataFormatter.addUnrecognized();
        dataFormatter.isSetup = true;
        return dataFormatter;
    }
    static fromString(string, maxThreshold = 0) {
        const values = Array.from(new Set(string)).join('');
        return new DataFormatter(values.split(''), maxThreshold);
    }
    toJSON() {
        return {
            indexTable: this.indexTable,
            characterTable: this.characterTable,
            values: this.values,
            characters: this.characters,
            specialIndexes: this.specialIndexes,
        };
    }
    /** TODO: Type better, The type of json is not "string that is a valid JSON", it is a POJO in the shape of DataFormatter.
     * this method re-hydrates the the data as an instance of DataFormatter.
     */
    static fromJSON(json) {
        const dataFormatter = new DataFormatter();
        dataFormatter.indexTable = json.indexTable;
        dataFormatter.characterTable = json.characterTable;
        dataFormatter.values = json.values;
        dataFormatter.characters = json.characters;
        dataFormatter.specialIndexes = json.specialIndexes;
        dataFormatter.isSetup = true;
        return dataFormatter;
    }
    addSpecial(special, character = null) {
        const specialIndex = (this.indexTable[special] = this.characters.length);
        this.characterTable[specialIndex] = character;
        this.specialIndexes.push(this.characters.length);
        this.characters.push(special);
    }
    toFunctionString() {
        return `
var characterTable = ${JSON.stringify(this.characterTable)};
var indexTable = ${JSON.stringify(this.indexTable)};
var characters = ${JSON.stringify(this.characters)};
var dataFormatter = {
  toIndexes: function ${this.toIndexes.toString()},
  toIndexesInputOutput: function ${this.toIndexesInputOutput.toString()},
  toCharacters: function ${this.toCharacters.toString()},
  toIndexesValue: function ${this.toIndexesValue.toString()},
};`;
    }
    formatDataIn(input, output) {
        var _a;
        if (input === undefined)
            return [];
        if (Array.isArray(input) && typeof input[0] === 'number') {
            return input;
        }
        if ((_a = this.indexTable) === null || _a === void 0 ? void 0 : _a.hasOwnProperty('stop-input')) {
            return this.toIndexesInputOutput(input, output);
        }
        return this.toIndexes(input);
    }
    formatDataOut(input, output) {
        return this.toCharacters(output).join('');
    }
    format(data) {
        if (typeof data[0] === 'number' &&
            !Array.isArray(data[0]) &&
            (!data[0].hasOwnProperty('input') || !data[0].hasOwnProperty('output'))) {
            return data;
        }
        const result = [];
        if (typeof data[0] === 'string' ||
            typeof data[0] === 'number' ||
            Array.isArray(data[0])) {
            if (!this.isSetup) {
                this.setup(data);
                for (let i = 0; i < data.length; i++) {
                    result.push(this.formatDataIn(validateAndCast(data[i])));
                }
            }
            else {
                for (let i = 0, max = data.length; i < max; i++) {
                    result.push(this.formatDataIn(data[i]));
                }
            }
        }
        else if (data[0].input && data[0].output) {
            if (!this.isSetup) {
                this.setup(data);
            }
            for (let i = 0, max = data.length; i < max; i++) {
                result.push(this.formatDataIn(validateAndCast(data[i].input), validateAndCast(data[i].output)));
            }
        }
        else {
            throw new Error('unrecognized data');
        }
        return result;
    }
}
function validateAndCast(value) {
    if (typeof value === 'string')
        return value;
    if (typeof value === 'number')
        return value.toString();
    if (typeof value === 'boolean')
        return value.toString();
    if (Array.isArray(value) && typeof value[0] === 'string')
        return value;
    if (typeof value[0] === 'boolean') {
        return value.map((v) => v.toString());
    }
    if (typeof value[0] === 'number') {
        return value.map((v) => v.toString());
    }
    throw new Error('unrecognized value, expected string[], string, number[], number, boolean[], or boolean');
}

function copy(product, left) {
    product.rows = left.rows;
    product.columns = left.columns;
    product.weights = left.weights.slice(0);
    product.deltas = left.deltas.slice(0);
}

/**
 * add {left} and {right} matrix weights into {into}
 */
function add(product, left, right) {
    for (let i = 0; i < left.weights.length; i++) {
        product.weights[i] = left.weights[i] + right.weights[i];
        product.deltas[i] = 0;
    }
}

/**
 * adds {from} deltas to {left} and {right} deltas
 */
function addB(product, left, right) {
    for (let i = 0; i < product.deltas.length; i++) {
        left.deltas[i] = product.deltas[i];
        right.deltas[i] = product.deltas[i];
    }
}

/**
 * makes matrix weights and deltas all ones
 */
function allOnes(product) {
    for (let i = 0; i < product.weights.length; i++) {
        product.weights[i] = 1;
        product.deltas[i] = 0;
    }
}

function cloneNegative(product, left) {
    product.rows = left.rows;
    product.columns = left.columns;
    product.weights = left.weights.slice(0);
    product.deltas = left.deltas.slice(0);
    for (let i = 0; i < left.weights.length; i++) {
        product.weights[i] = -left.weights[i];
        product.deltas[i] = 0;
    }
}

/**
 * multiply {left} and {right} matrix weights to {into}
 */
function multiply(product, left, right) {
    const leftRows = left.rows;
    const leftColumns = left.columns;
    const rightColumns = right.columns;
    // loop over rows of left
    for (let leftRow = 0; leftRow < leftRows; leftRow++) {
        const leftRowBase = leftColumns * leftRow;
        const rightRowBase = rightColumns * leftRow;
        // loop over cols of right
        for (let rightColumn = 0; rightColumn < rightColumns; rightColumn++) {
            // dot product loop
            let dot = 0;
            // loop over columns of left
            for (let leftColumn = 0; leftColumn < leftColumns; leftColumn++) {
                const rightColumnBase = rightColumns * leftColumn;
                const leftIndex = leftRowBase + leftColumn;
                const rightIndex = rightColumnBase + rightColumn;
                dot += left.weights[leftIndex] * right.weights[rightIndex];
                left.deltas[leftIndex] = 0;
                right.deltas[rightIndex] = 0;
            }
            product.weights[rightRowBase + rightColumn] = dot;
        }
    }
}

/**
 * multiplies {from} deltas to {left} and {right}
 */
function multiplyB(product, left, right) {
    const leftRows = left.rows;
    const leftColumns = left.columns;
    const rightColumns = right.columns;
    // loop over rows of left
    for (let leftRowRoot = 0; leftRowRoot < leftRows; leftRowRoot++) {
        const leftRowBase = leftColumns * leftRowRoot;
        const rightRowBase = rightColumns * leftRowRoot;
        // loop over cols of right
        for (let rightColumn = 0; rightColumn < rightColumns; rightColumn++) {
            // loop over columns of left
            for (let leftColumn = 0; leftColumn < leftColumns; leftColumn++) {
                const rightColumnBase = rightColumns * leftColumn;
                const leftRow = leftRowBase + leftColumn;
                const rightRow = rightColumnBase + rightColumn;
                const backPropagateValue = product.deltas[rightRowBase + rightColumn];
                left.deltas[leftRow] += right.weights[rightRow] * backPropagateValue;
                right.deltas[rightRow] += left.weights[leftRow] * backPropagateValue;
            }
        }
    }
}

function multiplyElement(product, left, right) {
    const { weights } = left;
    for (let i = 0; i < weights.length; i++) {
        product.weights[i] = left.weights[i] * right.weights[i];
        product.deltas[i] = 0;
    }
}

/**
 * multiplies {left} and {right} weight by {from} deltas into {left} and {right} deltas
 */
function multiplyElementB(product, left, right) {
    for (let i = 0; i < left.weights.length; i++) {
        left.deltas[i] = right.weights[i] * product.deltas[i];
        right.deltas[i] = left.weights[i] * product.deltas[i];
    }
}

/**
 *
 * relu {m} weights to {into} weights
 */
function relu(product, left) {
    for (let i = 0; i < left.weights.length; i++) {
        product.weights[i] = Math.max(0, left.weights[i]); // relu
        product.deltas[i] = 0;
    }
}

/**
 * adds {from} deltas to {m} deltas when {m} weights are above other a threshold of 0
 */
function reluB(product, left) {
    for (let i = 0; i < product.deltas.length; i++) {
        left.deltas[i] = left.weights[i] > 0 ? product.deltas[i] : 0;
    }
}

function rowPluck(product, left, rowPluckIndex) {
    const { columns } = left;
    const rowBase = columns * rowPluckIndex;
    for (let column = 0; column < columns; column++) {
        product.weights[column] = left.weights[rowBase + column];
        product.deltas[column] = 0;
    }
}

/**
 * adds {from} deltas into {m} deltas
 */
function rowPluckB(product, left, rowIndex) {
    const { columns } = left;
    const rowBase = columns * rowIndex;
    for (let column = 0; column < columns; column++) {
        left.deltas[rowBase + column] = product.deltas[column];
    }
}

function sigmoid(product, left) {
    // sigmoid nonlinearity
    for (let i = 0; i < left.weights.length; i++) {
        product.weights[i] = 1 / (1 + Math.exp(-left.weights[i]));
        product.deltas[i] = 0;
    }
}
// function sig(x) {
//   // helper function for computing sigmoid
//   return 1 / (1 + Math.exp(-x));
// }

function sigmoidB(product, left) {
    for (let i = 0; i < product.deltas.length; i++) {
        const mwi = product.weights[i];
        left.deltas[i] = mwi * (1 - mwi) * product.deltas[i];
    }
}

function softmax(matrix) {
    // probability volume
    const result = new Matrix(matrix.rows, matrix.columns);
    let maxVal = -999999;
    for (let i = 0; i < matrix.weights.length; i++) {
        if (matrix.weights[i] > maxVal) {
            maxVal = matrix.weights[i];
        }
    }
    let s = 0;
    for (let i = 0; i < matrix.weights.length; i++) {
        result.weights[i] = Math.exp(matrix.weights[i] - maxVal);
        s += result.weights[i];
    }
    for (let i = 0; i < matrix.weights.length; i++) {
        result.weights[i] /= s;
    }
    // no backward pass here needed
    // since we will use the computed probabilities outside
    // to set gradients directly on m
    return result;
}

function tanh(product, left) {
    // tanh nonlinearity
    for (let i = 0; i < left.weights.length; i++) {
        product.weights[i] = Math.tanh(left.weights[i]);
        product.deltas[i] = 0;
    }
}

function tanhB(product, left) {
    for (let i = 0; i < product.deltas.length; i++) {
        // grad for z = tanh(x) is (1 - z^2)
        const mwi = product.weights[i];
        left.deltas[i] = (1 - mwi * mwi) * product.deltas[i];
    }
}

class Equation {
    constructor() {
        this.states = [];
        this.inputRow = 0;
    }
    add(left, right) {
        if (left.weights.length !== right.weights.length) {
            throw new Error('misaligned matrices');
        }
        const product = new Matrix(left.rows, left.columns);
        this.states.push({
            name: 'add',
            product,
            left,
            right,
            forwardFn: add,
            backpropagationFn: addB,
        });
        return product;
    }
    allOnes(rows, columns) {
        const product = new Matrix(rows, columns);
        this.states.push({
            name: 'allOnes',
            product,
            left: product,
            forwardFn: allOnes,
            backpropagationFn: () => { },
        });
        return product;
    }
    cloneNegative(matrix) {
        const product = new Matrix(matrix.rows, matrix.columns);
        this.states.push({
            name: 'cloneNegative',
            product,
            left: matrix,
            forwardFn: cloneNegative,
            backpropagationFn: () => { },
        });
        return product;
    }
    /**
     * connects two matrices together by subtract
     */
    subtract(left, right) {
        if (left.weights.length !== right.weights.length) {
            throw new Error('misaligned matrices');
        }
        return this.add(this.add(this.allOnes(left.rows, left.columns), this.cloneNegative(left)), right);
    }
    /**
     * connects two matrices together by multiply
     */
    multiply(left, right) {
        if (left.columns !== right.rows) {
            throw new Error('misaligned matrices');
        }
        const product = new Matrix(left.rows, right.columns);
        this.states.push({
            name: 'multiply',
            product,
            left,
            right,
            forwardFn: multiply,
            backpropagationFn: multiplyB,
        });
        return product;
    }
    /**
     * connects two matrices together by multiplyElement
     */
    multiplyElement(left, right) {
        if (left.weights.length !== right.weights.length) {
            throw new Error('misaligned matrices');
        }
        const product = new Matrix(left.rows, left.columns);
        this.states.push({
            name: 'multiplyElement',
            product,
            left,
            right,
            forwardFn: multiplyElement,
            backpropagationFn: multiplyElementB,
        });
        return product;
    }
    /**
     * connects a matrix to relu
     */
    relu(matrix) {
        const product = new Matrix(matrix.rows, matrix.columns);
        this.states.push({
            name: 'relu',
            product,
            left: matrix,
            forwardFn: relu,
            backpropagationFn: reluB,
        });
        return product;
    }
    /**
     * input a matrix
     */
    input(input) {
        this.states.push({
            name: 'input',
            product: input,
            forwardFn: (product) => {
                if (!this.inputValue)
                    return;
                if (this.inputValue.length !== product.weights.length) {
                    throw new Error('this.inputValue is of wrong dimensions');
                }
                product.weights = input.weights = this.inputValue;
            },
            backpropagationFn: () => { },
        });
        return input;
    }
    /**
     * connects a matrix via a row
     */
    inputMatrixToRow(matrix) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        const product = new Matrix(matrix.columns, 1);
        this.states.push({
            name: 'inputMatrixToRow',
            product,
            left: matrix,
            get right() {
                return self.inputRow;
            },
            forwardFn: rowPluck,
            backpropagationFn: rowPluckB,
        });
        return product;
    }
    /**
     * connects a matrix to sigmoid
     */
    sigmoid(matrix) {
        const product = new Matrix(matrix.rows, matrix.columns);
        this.states.push({
            name: 'sigmoid',
            product,
            left: matrix,
            forwardFn: sigmoid,
            backpropagationFn: sigmoidB,
        });
        return product;
    }
    /**
     * connects a matrix to tanh
     */
    tanh(matrix) {
        const product = new Matrix(matrix.rows, matrix.columns);
        this.states.push({
            name: 'tanh',
            product,
            left: matrix,
            forwardFn: tanh,
            backpropagationFn: tanhB,
        });
        return product;
    }
    /**
     *
     * Observe a matrix for debugging
     */
    observe(matrix) {
        this.states.push({
            name: 'observe',
            product: new Matrix(),
            forwardFn: () => { },
            backpropagationFn: () => { },
        });
        return matrix;
    }
    /**
     * Run index through equations via forward propagation
     */
    runIndex(rowIndex = 0) {
        this.inputRow = rowIndex;
        let state = this.states[0];
        for (let i = 0, max = this.states.length; i < max; i++) {
            state = this.states[i];
            if (!state.hasOwnProperty('forwardFn'))
                continue;
            state.forwardFn(state.product, state.left, state.right);
        }
        return state.product;
    }
    /**
     * Run value through equations via forward propagation
     */
    runInput(inputValue) {
        this.inputValue = inputValue;
        let state = this.states[0];
        for (let i = 0, max = this.states.length; i < max; i++) {
            state = this.states[i];
            if (!state.hasOwnProperty('forwardFn'))
                continue;
            state.forwardFn(state.product, state.left, state.right);
        }
        return state.product;
    }
    /**
     * Run value through equations via back propagation
     */
    backpropagate() {
        let i = this.states.length;
        let state = this.states[0];
        while (i-- > 0) {
            state = this.states[i];
            if (!state.hasOwnProperty('backpropagationFn'))
                continue;
            state.backpropagationFn(state.product, state.left, state.right);
        }
        return state.product;
    }
    /**
     * Run index through equations via back propagation
     */
    backpropagateIndex(rowIndex = 0) {
        this.inputRow = rowIndex;
        let i = this.states.length;
        let state = this.states[0];
        while (i-- > 0) {
            state = this.states[i];
            if (!state.hasOwnProperty('backpropagationFn'))
                continue;
            state.backpropagationFn(state.product, state.left, state.right);
        }
        return state.product;
    }
    /**
     * Predict a target value from equation
     */
    predictTarget(input, target) {
        let errorSum = 0;
        const output = this.runInput(input);
        for (let i = 0; i < output.weights.length; i++) {
            const error = output.weights[i] - target[i];
            // set gradients into log probabilities
            errorSum += Math.abs(error);
            // write gradients into log probabilities
            output.deltas[i] = error;
        }
        return errorSum;
    }
    /**
     * Predict a target index from equation
     */
    predictTargetIndex(input, target) {
        const output = this.runIndex(input);
        // set gradients into log probabilities
        const logProbabilities = output; // interpret output as log probabilities
        const probabilities = softmax(output); // compute the softmax probabilities
        // write gradients into log probabilities
        logProbabilities.deltas = probabilities.weights.slice(0);
        logProbabilities.deltas[target] -= 1;
        // accumulate base 2 log prob and do smoothing
        return -Math.log2(probabilities.weights[target]);
    }
}

function maxI(matrix) {
    // argmax of array w
    const { weights } = matrix;
    let maxv = weights[0];
    let maxix = 0;
    for (let i = 1; i < weights.length; i++) {
        const v = weights[i];
        if (v < maxv)
            continue;
        maxix = i;
        maxv = v;
    }
    return maxix;
}

function sampleI(matrix) {
    // sample argmax from w, assuming w are
    // probabilities that sum to one
    const r = randomFloat(0, 1);
    const w = matrix.weights;
    let x = 0;
    let i = 0;
    while (true) {
        x += w[i];
        if (x > r) {
            return i;
        }
        i++;
    }
}

const trainDefaults$1 = {
    iterations: 20000,
    errorThresh: 0.005,
    log: false,
    logPeriod: 10,
    learningRate: 0.01,
    callbackPeriod: 10,
    timeout: Infinity,
};
const defaults$1 = () => {
    return {
        inputSize: 20,
        inputRange: 20,
        hiddenLayers: [20, 20],
        outputSize: 20,
        decayRate: 0.999,
        smoothEps: 1e-8,
        regc: 0.000001,
        clipval: 5,
        maxPredictionLength: 100,
        dataFormatter: new DataFormatter(),
    };
};
class RNN {
    constructor(options = {}) {
        this.options = { ...defaults$1() };
        this.trainOpts = { ...trainDefaults$1 };
        this.stepCache = {};
        this.runs = 0;
        this.ratioClipped = 0;
        this.model = Object.seal({
            isInitialized: false,
            input: new Matrix(0, 0),
            hiddenLayers: [],
            output: new Matrix(0, 0),
            equations: [],
            allMatrices: [],
            equationConnections: [],
            outputConnector: new RandomMatrix(0, 0, 0.08),
        });
        this.initialLayerInputs = [];
        this.options = { ...this.options, ...options };
        this.updateTrainingOptions({
            ...trainDefaults$1,
        });
        if (options.json) {
            this.fromJSON(options.json);
        }
    }
    initialize() {
        const { dataFormatter } = this.options;
        if (dataFormatter === null || dataFormatter === void 0 ? void 0 : dataFormatter.characters.length) {
            this.options.inputSize = this.options.inputRange = this.options.outputSize =
                dataFormatter.characters.length;
        }
        this.model = this.mapModel();
    }
    createHiddenLayers() {
        const { hiddenLayers, inputSize } = this.options;
        const hiddenLayersModel = [];
        // 0 is end, so add 1 to offset
        hiddenLayersModel.push(this.getHiddenLayer(hiddenLayers[0], inputSize));
        let prevSize = hiddenLayers[0];
        for (let d = 1; d < hiddenLayers.length; d++) {
            // loop over depths
            const hiddenSize = hiddenLayers[d];
            hiddenLayersModel.push(this.getHiddenLayer(hiddenSize, prevSize));
            prevSize = hiddenSize;
        }
        return hiddenLayersModel;
    }
    getHiddenLayer(hiddenSize, prevSize) {
        return {
            // wxh
            weight: new RandomMatrix(hiddenSize, prevSize, 0.08),
            // whh
            transition: new RandomMatrix(hiddenSize, hiddenSize, 0.08),
            // bhh
            bias: new Matrix(hiddenSize, 1),
        };
    }
    getEquation(equation, inputMatrix, previousResult, hiddenLayer) {
        if (!hiddenLayer.weight || !hiddenLayer.transition || !hiddenLayer.bias) {
            throw new Error('hiddenLayer does not have expected properties');
        }
        const relu = equation.relu.bind(equation);
        const add = equation.add.bind(equation);
        const multiply = equation.multiply.bind(equation);
        return relu(add(add(multiply(hiddenLayer.weight, inputMatrix), multiply(hiddenLayer.transition, previousResult)), hiddenLayer.bias));
    }
    createInputMatrix() {
        const { inputRange, inputSize } = this.options;
        if (inputRange < 1)
            throw new Error('this.options.inputRange not an expected number');
        if (inputSize < 1)
            throw new Error('this.options.inputSize not an expected number');
        // 0 is end, so add 1 to offset
        return new RandomMatrix(inputRange + 1, inputSize, 0.08);
    }
    createOutputMatrices() {
        const { outputSize, hiddenLayers } = this.options;
        const lastHiddenSize = last(hiddenLayers);
        // 0 is end, so add 1 to offset
        return {
            // whd
            outputConnector: new RandomMatrix(outputSize + 1, lastHiddenSize, 0.08),
            // 0 is end, so add 1 to offset
            // bd
            output: new Matrix(outputSize + 1, 1),
        };
    }
    bindEquation() {
        const { model } = this;
        const { hiddenLayers } = this.options;
        const equation = new Equation();
        const outputs = [];
        const equationConnection = model.equationConnections.length > 0
            ? last(model.equationConnections)
            : this.initialLayerInputs;
        // 0 index
        let output = this.getEquation(equation, equation.inputMatrixToRow(model.input), equationConnection[0], model.hiddenLayers[0]);
        outputs.push(output);
        // 1+ indices
        for (let i = 1, max = hiddenLayers.length; i < max; i++) {
            if (!equationConnection[i]) {
                throw new Error(`Cannot find equation at index ${i}`);
            }
            output = this.getEquation(equation, output, equationConnection[i], model.hiddenLayers[i]);
            outputs.push(output);
        }
        model.equationConnections.push(outputs);
        equation.add(equation.multiply(model.outputConnector, output), model.output);
        model.equations.push(equation);
    }
    mapModel() {
        const allMatrices = [];
        this.initialLayerInputs = this.options.hiddenLayers.map((size) => new Matrix(size, 1));
        const input = this.createInputMatrix();
        allMatrices.push(input);
        const hiddenLayers = this.createHiddenLayers();
        if (!hiddenLayers.length)
            throw new Error('net.hiddenLayers not set');
        for (let i = 0, max = hiddenLayers.length; i < max; i++) {
            const hiddenMatrix = hiddenLayers[i];
            for (const property in hiddenMatrix) {
                if (!hiddenMatrix.hasOwnProperty(property))
                    continue;
                allMatrices.push(hiddenMatrix[property]);
            }
        }
        const { output, outputConnector } = this.createOutputMatrices();
        allMatrices.push(outputConnector);
        allMatrices.push(output);
        return Object.seal({
            isInitialized: true,
            input,
            hiddenLayers,
            output,
            equations: [],
            allMatrices,
            equationConnections: [],
            outputConnector,
        });
    }
    trainInput(input) {
        this.runs++;
        const { model } = this;
        const max = input.length;
        let log2ppl = 0;
        let equation;
        while (model.equations.length <= input.length + 1) {
            // last is zero
            this.bindEquation();
        }
        for (let inputIndex = -1, inputMax = input.length; inputIndex < inputMax; inputIndex++) {
            // start and end tokens are zeros
            const equationIndex = inputIndex + 1;
            equation = model.equations[equationIndex];
            const source = inputIndex === -1 ? 0 : input[inputIndex] + 1; // first step: start with START token
            const target = inputIndex === max - 1 ? 0 : input[inputIndex + 1] + 1; // last step: end with END token
            log2ppl += equation.predictTargetIndex(source, target);
        }
        return Math.pow(2, log2ppl / (max - 1)) / 100;
    }
    backpropagate(input) {
        let i = input.length;
        const { model } = this;
        const { equations } = model;
        while (i > 0) {
            equations[i].backpropagateIndex(input[i - 1] + 1);
            i--;
        }
        equations[0].backpropagateIndex(0);
    }
    adjustWeights() {
        const { regc, clipval, decayRate, smoothEps } = this.options;
        const { trainOpts, model, stepCache } = this;
        const { learningRate } = trainOpts;
        const { allMatrices } = model;
        let numClipped = 0;
        let numTot = 0;
        for (let matrixIndex = 0; matrixIndex < allMatrices.length; matrixIndex++) {
            const matrix = allMatrices[matrixIndex];
            const { weights, deltas } = matrix;
            if (!(matrixIndex in stepCache)) {
                stepCache[matrixIndex] = zeros$1(matrix.rows * matrix.columns);
            }
            const cache = stepCache[matrixIndex];
            for (let i = 0; i < weights.length; i++) {
                let r = deltas[i];
                const w = weights[i];
                // rmsprop adaptive learning rate
                cache[i] = cache[i] * decayRate + (1 - decayRate) * r * r;
                // gradient clip
                if (r > clipval) {
                    r = clipval;
                    numClipped++;
                }
                else if (r < -clipval) {
                    r = -clipval;
                    numClipped++;
                }
                numTot++;
                // update (and regularize)
                weights[i] =
                    w + (-learningRate * r) / Math.sqrt(cache[i] + smoothEps) - regc * w;
            }
        }
        this.ratioClipped = numClipped / numTot;
    }
    get isRunnable() {
        if (this.model && this.model.equations.length === 0) {
            console.error(`No equations bound, did you run train()?`);
            return false;
        }
        return true;
    }
    checkRunnable() {
        if (!this.isRunnable) {
            throw new Error('Network not runnable');
        }
    }
    run(rawInput = [], isSampleI = false, temperature = 1) {
        const maxPredictionLength = this.options.maxPredictionLength +
            (rawInput !== null ? rawInput.length : 0) +
            (this.options.dataFormatter
                ? this.options.dataFormatter.specialIndexes.length
                : 0);
        this.checkRunnable();
        const input = this.options.dataFormatter && rawInput.length > 0
            ? this.options.dataFormatter.formatDataIn(rawInput)
            : rawInput;
        const { model } = this;
        const output = [];
        let i = 0;
        while (true) {
            const previousIndex = i === 0 ? 0 : i < input.length ? input[i - 1] + 1 : output[i - 1];
            while (model.equations.length <= i) {
                this.bindEquation();
            }
            const equation = model.equations[i];
            // sample predicted letter
            const outputMatrix = equation.runIndex(previousIndex);
            const logProbabilities = new Matrix(model.output.rows, model.output.columns);
            copy(logProbabilities, outputMatrix);
            if (temperature !== 1 && isSampleI) {
                /**
                 * scale log probabilities by temperature and re-normalize
                 * if temperature is high, logProbabilities will go towards zero
                 * and the softmax outputs will be more diffuse. if temperature is
                 * very low, the softmax outputs will be more peaky
                 */
                for (let j = 0, max = logProbabilities.weights.length; j < max; j++) {
                    logProbabilities.weights[j] /= temperature;
                }
            }
            const probs = softmax(logProbabilities);
            const nextIndex = isSampleI ? sampleI(probs) : maxI(probs);
            i++;
            if (nextIndex === 0) {
                // END token predicted, break out
                break;
            }
            if (i >= maxPredictionLength) {
                // something is wrong
                break;
            }
            output.push(nextIndex);
        }
        /**
         * we slice the input length here, not because output contains it, but it will be erroneous as we are sending the
         * network what is contained in input, so the data is essentially guessed by the network what could be next, till it
         * locks in on a value.
         * Kind of like this, values are from input:
         * 0 -> 4 (or in English: "beginning on input" -> "I have no idea? I'll guess what they want next!")
         * 2 -> 2 (oh how interesting, I've narrowed down values...)
         * 1 -> 9 (oh how interesting, I've now know what the values are...)
         * then the output looks like: [4, 2, 9,...]
         * so we then remove the erroneous data to get our true output
         */
        return this.options.dataFormatter.formatDataOut(input, output.slice(input.length).map((value) => value - 1));
    }
    /**
     *
     * Verifies network sizes are initialized
     * If they are not it will initialize them
     */
    verifyIsInitialized() {
        if (!this.model.isInitialized) {
            this.initialize();
        }
    }
    /**
     *
     * @param options
     *    Supports all `trainDefaults` properties
     *    also supports:
     *       learningRate: (number),
     *       momentum: (number),
     *       activation: 'sigmoid', 'relu', 'leaky-relu', 'tanh'
     */
    updateTrainingOptions(options) {
        var _a;
        this.trainOpts = { ...trainDefaults$1, ...options };
        this.validateTrainingOptions(this.trainOpts);
        this.setLogMethod((_a = options.log) !== null && _a !== void 0 ? _a : this.trainOpts.log);
        // TODO: Remove this?
        // this.activation = options.activation || this.activation;
    }
    validateTrainingOptions(options) {
        const validations = {
            iterations: () => {
                const val = options.iterations;
                return typeof val === 'number' && val > 0;
            },
            errorThresh: () => {
                const val = options.errorThresh;
                return typeof val === 'number' && val > 0 && val < 1;
            },
            log: () => {
                const val = options.log;
                return typeof val === 'function' || typeof val === 'boolean';
            },
            logPeriod: () => {
                const val = options.logPeriod;
                return typeof val === 'number' && val > 0;
            },
            learningRate: () => {
                const val = options.learningRate;
                return typeof val === 'number' && val > 0 && val < 1;
            },
            callback: () => {
                const val = options.callback;
                return typeof val === 'function' || val === undefined;
            },
            callbackPeriod: () => {
                const val = options.callbackPeriod;
                return typeof val === 'number' && val > 0;
            },
            timeout: () => {
                const val = options.timeout;
                return typeof val === 'number' && val > 0;
            },
        };
        for (const p in validations) {
            const v = options;
            if (!validations[p]()) {
                throw new Error(`[${p}, ${v[p]}] is out of normal training range, your network will probably not train.`);
            }
        }
    }
    setLogMethod(log) {
        if (typeof log === 'function') {
            this.trainOpts.log = log;
        }
        else if (log) {
            this.trainOpts.log = console.log;
        }
        else {
            this.trainOpts.log = false;
        }
    }
    prepTraining(data, options) {
        var _a;
        this.updateTrainingOptions(options);
        const preparedData = this.options.dataFormatter.format(data);
        const endTime = Date.now() + ((_a = this.trainOpts.timeout) !== null && _a !== void 0 ? _a : 0);
        const status = {
            error: 1,
            iterations: 0,
        };
        this.verifyIsInitialized();
        return {
            preparedData,
            status,
            endTime,
        };
    }
    train(data, trainOpts = {}) {
        var _a;
        this.trainOpts = trainOpts = {
            ...trainDefaults$1,
            ...trainOpts,
        };
        const { iterations, errorThresh, logPeriod, callback, callbackPeriod, } = this.trainOpts;
        const log = trainOpts.log === true ? console.log : trainOpts.log;
        let error = Infinity;
        let i;
        let inputs;
        if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.dataFormatter) {
            inputs = this.options.dataFormatter.format(data);
        }
        else if (Array.isArray(data) &&
            Array.isArray(data[0]) &&
            typeof data[0][0] === 'number') {
            inputs = data;
        }
        else {
            throw new Error('training not in expected format of number[][]');
        }
        this.verifyIsInitialized();
        for (i = 0; i < iterations && error > errorThresh; i++) {
            let sum = 0;
            for (let j = 0; j < inputs.length; j++) {
                const err = this.trainPattern(inputs[j], true);
                sum += err;
            }
            error = sum / data.length;
            if (isNaN(error)) {
                throw new Error('Network error rate is unexpected NaN, check network configurations and try again. Most probably input format is not correct or training data is not enough. ');
            }
            if (log && i % logPeriod === 0) {
                log(`iterations: ${i}, training error: ${error}`);
            }
            if (callback && i % callbackPeriod === 0) {
                callback({ error, iterations: i });
            }
        }
        return {
            error,
            iterations: i,
        };
    }
    addFormat(data) { }
    formatData(data) {
        const result = [];
        for (let i = 0; i < data.length; i++) {
            result.push(this.options.dataFormatter.formatDataIn(data[i]));
        }
        return result;
    }
    toJSON() {
        if (!this.model.isInitialized) {
            this.initialize();
        }
        const { model, options } = this;
        return {
            type: this.constructor.name,
            options: { ...options, dataFormatter: options.dataFormatter.toJSON() },
            trainOpts: {
                ...this.trainOpts,
                timeout: this.trainOpts.timeout === Infinity
                    ? 'Infinity'
                    : this.trainOpts.timeout,
            },
            input: model.input.toJSON(),
            hiddenLayers: model.hiddenLayers.map((hiddenLayer) => {
                const layers = {};
                for (const p in hiddenLayer) {
                    if (!hiddenLayer.hasOwnProperty(p))
                        continue;
                    layers[p] = hiddenLayer[p].toJSON();
                }
                return layers;
            }),
            outputConnector: this.model.outputConnector.toJSON(),
            output: this.model.output.toJSON(),
        };
    }
    fromJSON(json) {
        const { options } = json;
        const allMatrices = [];
        const input = Matrix.fromJSON(json.input);
        allMatrices.push(input);
        const hiddenLayers = [];
        json.hiddenLayers.forEach((hiddenLayer) => {
            const layers = {};
            for (const p in hiddenLayer) {
                layers[p] = Matrix.fromJSON(hiddenLayer[p]);
                allMatrices.push(layers[p]);
            }
            hiddenLayers.push(layers);
        });
        const outputConnector = Matrix.fromJSON(json.outputConnector);
        allMatrices.push(outputConnector);
        const output = Matrix.fromJSON(json.output);
        allMatrices.push(output);
        if (options.dataFormatter) {
            this.options = {
                ...defaults$1(),
                ...options,
                dataFormatter: DataFormatter.fromJSON(options.dataFormatter),
            };
        }
        else {
            this.options = {
                ...defaults$1(),
                ...options,
                dataFormatter: new DataFormatter(),
            };
        }
        this.model = Object.seal({
            isInitialized: true,
            input,
            hiddenLayers,
            output,
            allMatrices,
            outputConnector,
            equations: [],
            equationConnections: [],
        });
        this.initialLayerInputs = this.options.hiddenLayers.map((size) => new Matrix(size, 1));
        this.bindEquation();
        return this;
    }
    toFunction(cb) {
        const { model } = this;
        const { equations } = this.model;
        const equation = equations[1];
        const { states } = equation;
        const jsonString = JSON.stringify(this.toJSON());
        function previousConnectionIndex(m) {
            const connection = model.equationConnections[0];
            const { states } = equations[0];
            for (let i = 0, max = states.length; i < max; i++) {
                if (states[i].product === m) {
                    return i;
                }
            }
            return connection.indexOf(m);
        }
        function matrixOrigin(m, stateIndex) {
            for (let i = 0, max = states.length; i < max; i++) {
                const state = states[i];
                if (i === stateIndex) {
                    const j = previousConnectionIndex(m);
                    if (j > -1 && (m === state.left || m === state.right)) {
                        return `typeof prevStates[${j}] === 'object' ? prevStates[${j}].product : new Matrix(${m.rows}, ${m.columns})`;
                    }
                    return `new Matrix(${m.rows}, ${m.columns})`;
                }
                if (m === state.product)
                    return `states[${i}].product`;
                if (m === state.right)
                    return `states[${i}].right`;
                if (m === state.left)
                    return `states[${i}].left`;
            }
            return '';
        }
        function matrixToString(m, stateIndex) {
            if (!m || !m.rows || !m.columns)
                return 'null';
            if (m === model.input)
                return `json.input`;
            if (m === model.outputConnector)
                return `json.outputConnector`;
            if (m === model.output)
                return `json.output`;
            for (let i = 0, max = model.hiddenLayers.length; i < max; i++) {
                const hiddenLayer = model.hiddenLayers[i];
                for (const p in hiddenLayer) {
                    if (!hiddenLayer.hasOwnProperty(p))
                        continue;
                    if (hiddenLayer[p] !== m)
                        continue;
                    return `json.hiddenLayers[${i}].${p}`;
                }
            }
            return matrixOrigin(m, stateIndex);
        }
        function toInner(fnString) {
            // crude, but should be sufficient for now
            // function() { body }
            const fnParts = fnString.toString().split('{');
            fnParts.shift();
            // body }
            const fnBodyString = fnParts.join('{');
            const fnBodyParts = fnBodyString.split('}');
            fnBodyParts.pop();
            // body
            return fnBodyParts
                .join('}')
                .split('\n')
                .join('\n        ')
                .replace('product.deltas[i] = 0;', '')
                .replace('product.deltas[column] = 0;', '')
                .replace('left.deltas[leftIndex] = 0;', '')
                .replace('right.deltas[rightIndex] = 0;', '')
                .replace('product.deltas = left.deltas.slice(0);', '');
        }
        function fileName(fnName) {
            return `src/recurrent/matrix/${fnName.replace(/[A-Z]/g, function (value) {
                return `-${value.toLowerCase()}`;
            })}.js`;
        }
        const statesRaw = [];
        const usedFunctionNames = {};
        const innerFunctionsSwitch = [];
        for (let i = 0, max = states.length; i < max; i++) {
            const state = states[i];
            statesRaw.push(`states[${i}] = {
      name: '${state.forwardFn.name}',
      left: ${state.left ? matrixToString(state.left, i) : 'undefined'},
      right: ${state.right ? matrixToString(state.right, i) : 'undefined'},
      product: ${matrixToString(state.product, i)}
    }`);
            const fnName = state.forwardFn.name;
            if (!usedFunctionNames[fnName]) {
                usedFunctionNames[fnName] = true;
                innerFunctionsSwitch.push(`        case '${fnName}': //compiled from ${fileName(fnName)}
          ${toInner(state.forwardFn.toString())}
          break;`);
            }
        }
        const src = `
  if (typeof rawInput === 'undefined') rawInput = [];
  if (typeof isSampleI === 'undefined') isSampleI = false;
  if (typeof temperature === 'undefined') temperature = 1;
  var json = ${jsonString};
  ${this.options.dataFormatter
            ? `${this.options.dataFormatter.toFunctionString()};
  Object.assign(dataFormatter, json.options.dataFormatter);`
            : ''}
  ${this.options.dataFormatter &&
            typeof this.options.dataFormatter.formatDataIn === 'function'
            ? `const formatDataIn = function (input, output) { ${toInner(this.options.dataFormatter.formatDataIn.toString())} }.bind(dataFormatter);`
            : ''}
  ${this.options.dataFormatter !== null &&
            typeof this.options.dataFormatter.formatDataOut === 'function'
            ? `const formatDataOut = function formatDataOut(input, output) { ${toInner(this.options.dataFormatter.formatDataOut.toString())} }.bind(dataFormatter);`
            : ''}
  var maxPredictionLength =
    ${this.options.maxPredictionLength} +
    rawInput.length +
    ${this.options.dataFormatter
            ? this.options.dataFormatter.specialIndexes.length
            : 0};
  var input = ${this.options.dataFormatter &&
            typeof this.options.dataFormatter.formatDataIn === 'function'
            ? 'formatDataIn(rawInput)'
            : 'rawInput'};
  var _i = 0;
  var output = [];
  var states = [];
  var prevStates;
  while (true) {
    var previousIndex = (_i === 0
        ? 0
        : _i < input.length
          ? input[_i - 1] + 1
          : output[_i - 1])
          ;
    var rowPluckIndex = previousIndex;
    prevStates = states;
    states = [];
    ${statesRaw.join(';\n    ')};
    for (var stateIndex = 0, stateMax = ${statesRaw.length}; stateIndex < stateMax; stateIndex++) {
      var state = states[stateIndex];
      var product = state.product;
      var left = state.left;
      var right = state.right;
      switch (state.name) {
${innerFunctionsSwitch.join('\n')}
      }
    }

    var logProbabilities = state.product;
    if (temperature !== 1 && isSampleI) {
      for (var q = 0, nq = logProbabilities.weights.length; q < nq; q++) {
        logProbabilities.weights[q] /= temperature;
      }
    }

    var probs = softmax(logProbabilities);
    var nextIndex = isSampleI ? sampleI(probs) : maxI(probs);

    _i++;
    if (nextIndex === 0) {
      break;
    }
    if (_i >= maxPredictionLength) {
      break;
    }

    output.push(nextIndex);
  }
  ${this.options.dataFormatter &&
            typeof this.options.dataFormatter.formatDataOut === 'function'
            ? 'return formatDataOut(input, output.slice(input.length).map(function(value) { return value - 1; }))'
            : 'return output.slice(input.length).map(function(value) { return value - 1; })'};
  function Matrix(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.weights = zeros(rows * columns);
  }
  ${zeros$1.toString()}
  ${softmax.toString().replace('_1.Matrix', 'Matrix')}
  ${randomFloat.toString()}
  ${sampleI.toString()}
  ${maxI.toString()}`;
        // eslint-disable-next-line
        return new Function('rawInput', 'isSampleI', 'temperature', cb ? cb(src) : src);
    }
    trainPattern(input, logErrorRate) {
        const error = this.trainInput(input);
        this.backpropagate(input);
        this.adjustWeights();
        if (logErrorRate) {
            return error;
        }
        return 0;
    }
}
function last(values) {
    return values[values.length - 1];
}

class GRU extends RNN {
    getHiddenLayer(hiddenSize, prevSize) {
        return getGRUHiddenLayer(hiddenSize, prevSize);
    }
    getEquation(equation, inputMatrix, previousResult, hiddenLayer) {
        return getGRUEquation(equation, inputMatrix, previousResult, hiddenLayer);
    }
}
function getGRUHiddenLayer(hiddenSize, prevSize) {
    return {
        // update Gate
        // wzxh
        updateGateInputMatrix: new RandomMatrix(hiddenSize, prevSize, 0.08),
        updateGateHiddenMatrix: new RandomMatrix(hiddenSize, hiddenSize, 0.08),
        updateGateBias: new Matrix(hiddenSize, 1),
        // reset Gate
        // wrxh
        resetGateInputMatrix: new RandomMatrix(hiddenSize, prevSize, 0.08),
        resetGateHiddenMatrix: new RandomMatrix(hiddenSize, hiddenSize, 0.08),
        resetGateBias: new Matrix(hiddenSize, 1),
        // cell write parameters
        // wcxh
        cellWriteInputMatrix: new RandomMatrix(hiddenSize, prevSize, 0.08),
        cellWriteHiddenMatrix: new RandomMatrix(hiddenSize, hiddenSize, 0.08),
        cellWriteBias: new Matrix(hiddenSize, 1),
    };
}
function getGRUEquation(equation, inputMatrix, previousResult, hiddenLayer) {
    if (!hiddenLayer.updateGateInputMatrix ||
        !hiddenLayer.updateGateHiddenMatrix ||
        !hiddenLayer.updateGateBias ||
        !hiddenLayer.resetGateInputMatrix ||
        !hiddenLayer.resetGateHiddenMatrix ||
        !hiddenLayer.resetGateBias ||
        !hiddenLayer.cellWriteInputMatrix ||
        !hiddenLayer.cellWriteHiddenMatrix ||
        !hiddenLayer.cellWriteBias) {
        throw new Error('hiddenLayer does not have expected properties');
    }
    const sigmoid = equation.sigmoid.bind(equation);
    const add = equation.add.bind(equation);
    const multiply = equation.multiply.bind(equation);
    const multiplyElement = equation.multiplyElement.bind(equation);
    const tanh = equation.tanh.bind(equation);
    const allOnes = equation.allOnes.bind(equation);
    const cloneNegative = equation.cloneNegative.bind(equation);
    // update gate
    const updateGate = sigmoid(add(add(multiply(hiddenLayer.updateGateInputMatrix, inputMatrix), multiply(hiddenLayer.updateGateHiddenMatrix, previousResult)), hiddenLayer.updateGateBias));
    // reset gate
    const resetGate = sigmoid(add(add(multiply(hiddenLayer.resetGateInputMatrix, inputMatrix), multiply(hiddenLayer.resetGateHiddenMatrix, previousResult)), hiddenLayer.resetGateBias));
    // cell
    const cell = tanh(add(add(multiply(hiddenLayer.cellWriteInputMatrix, inputMatrix), multiply(hiddenLayer.cellWriteHiddenMatrix, multiplyElement(resetGate, previousResult))), hiddenLayer.cellWriteBias));
    // compute hidden state as gated, saturated cell activations
    // negate updateGate
    return add(multiplyElement(add(allOnes(updateGate.rows, updateGate.columns), cloneNegative(updateGate)), cell), multiplyElement(previousResult, updateGate));
}

class ArrayLookupTable {
    constructor(data, prop) {
        this.prop = prop;
        this.length = 0;
        this.table = {};
        for (let i = 0; i < data.length; i++) {
            const datum = data[i];
            const ioValue = datum[prop];
            for (let j = 0; j < ioValue.length; j++) {
                const value = ioValue[j];
                for (const p in value) {
                    if (!value.hasOwnProperty(p))
                        continue;
                    if (this.table.hasOwnProperty(p))
                        continue;
                    this.table[p] = this.length++;
                }
            }
        }
    }
}

const defaults = () => {
    return {
        ...defaults$1(),
        inputSize: 1,
        hiddenLayers: [20],
        outputSize: 1,
        inputRange: 0,
    };
};
class RNNTimeStep extends RNN {
    constructor(options = {}) {
        super();
        this.inputLookupLength = 0;
        this.inputLookup = null;
        this.outputLookup = null;
        this.outputLookupLength = 0;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.model = Object.seal({
            isInitialized: false,
            hiddenLayers: [],
            output: new Matrix(0, 0),
            equations: [],
            allMatrices: [],
            equationConnections: [],
            outputConnector: new RandomMatrix(0, 0, 0.08),
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.options = defaults();
        this.options = { ...this.options, ...options };
        this.updateTrainingOptions({
            ...trainDefaults,
            ...options,
        });
        if (options.json) {
            this.fromJSON(options.json);
        }
    }
    createInputMatrix() {
        throw new Error('Input Matrices do not exist on RNNTimeStep');
    }
    createOutputMatrices() {
        const { outputSize } = this.options;
        const lastHiddenSize = last(this.options.hiddenLayers);
        // whd
        const outputConnector = new RandomMatrix(outputSize, lastHiddenSize, 0.08);
        // bd
        const output = new RandomMatrix(outputSize, 1, 0.08);
        return { output, outputConnector };
    }
    bindEquation() {
        const { model, options } = this;
        const { hiddenLayers, inputSize } = options;
        const layers = model.hiddenLayers;
        const equation = new Equation();
        const outputs = [];
        const equationConnection = model.equationConnections.length > 0
            ? model.equationConnections[model.equationConnections.length - 1]
            : this.initialLayerInputs;
        // 0 index
        let output = this.getEquation(equation, equation.input(new Matrix(inputSize, 1)), equationConnection[0], layers[0]);
        outputs.push(output);
        // 1+ indices
        for (let i = 1, max = hiddenLayers.length; i < max; i++) {
            output = this.getEquation(equation, output, equationConnection[i], layers[i]);
            outputs.push(output);
        }
        model.equationConnections.push(outputs);
        equation.add(equation.multiply(model.outputConnector, output), model.output);
        model.equations.push(equation);
    }
    initialize() {
        this.model = this.mapModel();
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    mapModel() {
        const allMatrices = [];
        this.initialLayerInputs = this.options.hiddenLayers.map((size) => new Matrix(size, 1));
        const hiddenLayers = this.createHiddenLayers();
        for (let i = 0, max = hiddenLayers.length; i < max; i++) {
            const hiddenMatrix = hiddenLayers[i];
            for (const property in hiddenMatrix) {
                if (!hiddenMatrix.hasOwnProperty(property))
                    continue;
                allMatrices.push(hiddenMatrix[property]);
            }
        }
        const { outputConnector, output } = this.createOutputMatrices();
        allMatrices.push(outputConnector);
        allMatrices.push(output);
        return Object.seal({
            isInitialized: true,
            hiddenLayers,
            output,
            equations: [],
            allMatrices,
            equationConnections: [],
            outputConnector,
        });
    }
    backpropagate() {
        for (let i = this.model.equations.length - 1; i > -1; i--) {
            this.model.equations[i].backpropagate();
        }
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    run(rawInput) {
        const shape = lookup.dataShape(rawInput).join(',');
        switch (shape) {
            case 'array,number':
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                return this.runArray(rawInput);
            case 'array,array,number':
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                return this.runArrayOfArray(rawInput);
            case 'object,number':
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                return this.runObject(rawInput); // Backward compatibility, will be result of `unknown` and need casting.  Better to just use net.runObject() directly
            case 'array,object,number':
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                return this.runArrayOfObject(rawInput);
            default:
                throw new Error(`Unrecognized data shape ${shape}`);
        }
    }
    forecast(rawInput, count = 1) {
        const shape = lookup.dataShape(rawInput).join(',');
        switch (shape) {
            case 'array,number':
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                return this.forecastArray(rawInput, count);
            case 'array,array,number':
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                return this.forecastArrayOfArray(rawInput, count);
            case 'object,number':
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                return this.runObject(rawInput);
            case 'array,object,number':
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                return this.forecastArrayOfObject(rawInput, count);
            default:
                throw new Error(`Unrecognized data shape ${shape}`);
        }
    }
    forecastArray(input, count = 1) {
        this.checkRunnable();
        const { model } = this;
        const { equations } = model;
        const length = input.length + count;
        while (equations.length <= length) {
            this.bindEquation();
        }
        let lastOutput;
        let equationIndex = 0;
        if (this.options.inputSize === 1) {
            for (let i = 0; i < input.length; i++) {
                lastOutput = equations[equationIndex++].runInput(Float32Array.from([input[i]]));
            }
        }
        else {
            for (let i = 0; i < input.length; i++) {
                lastOutput = equations[equationIndex++].runInput(Float32Array.from([]));
            }
        }
        if (!lastOutput) {
            throw new Error('lastOutput not set');
        }
        const result = [lastOutput.weights[0]];
        for (let i = 0, max = count - 1; i < max; i++) {
            lastOutput = equations[equationIndex++].runInput(lastOutput.weights);
            result.push(lastOutput.weights[0]);
        }
        this.end();
        return Float32Array.from(result);
    }
    forecastArrayOfArray(input, count = 1) {
        this.checkRunnable();
        const { model } = this;
        const { equations } = model;
        const length = input.length + count;
        while (equations.length <= length) {
            this.bindEquation();
        }
        let lastOutput;
        let equationIndex = 0;
        for (let i = 0; i < input.length; i++) {
            lastOutput = equations[equationIndex++].runInput(input[i]);
        }
        if (!lastOutput) {
            throw new Error('lastOutput not set');
        }
        const result = [Float32Array.from(lastOutput.weights)];
        for (let i = 0, max = count - 1; i < max; i++) {
            lastOutput = equations[equationIndex++].runInput(lastOutput.weights);
            result.push(Float32Array.from(lastOutput.weights.slice(0)));
        }
        this.end();
        return result;
    }
    forecastArrayOfObject(input, count = 1) {
        if (!this.inputLookup) {
            throw new Error('this.inputLookup not set');
        }
        if (!this.outputLookup) {
            throw new Error('this.outputLookup not set');
        }
        const formattedData = input.map((value) => lookup.toArray(this.inputLookup, value, this.inputLookupLength));
        return this.forecastArrayOfArray(formattedData, count).map((value) => lookup.toObject(this.outputLookup, value));
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    train(data, trainOpts = {}) {
        this.trainOpts = trainOpts = {
            ...trainDefaults$1,
            ...trainOpts,
        };
        // Don't destructure here because this.setSize() can reset this.options.
        if (this.options.inputSize === 1 && this.options.outputSize === 1) {
            this.setSize(data);
        }
        this.verifySize();
        const formattedData = this.formatData(data);
        let error = Infinity;
        let i;
        this.verifyIsInitialized();
        const { iterations, errorThresh, logPeriod, callback, callbackPeriod, } = this.trainOpts;
        const log = trainOpts.log === true ? console.log : trainOpts.log;
        for (i = 0; i < iterations && error > errorThresh; i++) {
            let sum = 0;
            for (let j = 0; j < formattedData.length; j++) {
                const err = this.trainPattern(formattedData[j], true);
                sum += err;
            }
            error = sum / formattedData.length;
            if (isNaN(error))
                throw new Error('Network error rate is unexpected NaN, check network configurations and try again. Most probably input format is not correct or training data is not enough. ');
            if (log && i % logPeriod === 0) {
                log(`iterations: ${i}, training error: ${error}`);
            }
            if (callback && i % callbackPeriod === 0) {
                callback({ error, iterations: i });
            }
        }
        return {
            error,
            iterations: i,
        };
    }
    trainArrayOfArray(input) {
        if (input.length < 2) {
            throw new Error('input must be an array of 2 or more');
        }
        const { equations } = this.model;
        while (equations.length < input.length) {
            this.bindEquation();
        }
        let errorSum = 0;
        for (let i = 0, max = input.length - 1; i < max; i++) {
            errorSum += equations[i].predictTarget(input[i], input[i + 1]);
        }
        this.end();
        return errorSum / input.length;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    trainPattern(input, logErrorRate) {
        const error = this.trainArrayOfArray(input);
        this.backpropagate();
        this.adjustWeights();
        if (logErrorRate) {
            return error;
        }
        return 0;
    }
    setSize(data) {
        let size = 0;
        const dataShape = lookup.dataShape(data).join(',');
        switch (dataShape) {
            case 'array,array,number':
            case 'array,object,number':
            case 'array,datum,array,number':
            case 'array,datum,object,number':
                size = 1;
                // probably 1
                break;
            case 'array,array,array,number':
                size = data[0][0].length;
                break;
            case 'array,array,object,number':
                // inputs and outputs should match
                size = Object.keys(lookup.toTable2D(data)).length;
                break;
            case 'array,datum,array,array,number':
                size = data[0].input[0].length;
                break;
            case 'array,datum,array,object,number':
                size = Object.keys(lookup.toInputTable2D(data)).length;
                break;
            default:
                throw new Error('unknown data shape or configuration');
        }
        this.options = Object.seal({
            ...this.options,
            inputSize: size,
            outputSize: size,
        });
    }
    verifySize() {
        if (this.options.inputSize || this.options.outputSize) {
            if (this.options.inputSize !== this.options.outputSize) {
                throw new Error('manually set inputSize and outputSize mismatch');
            }
        }
    }
    runArray(input) {
        this.checkRunnable();
        const { equations } = this.model;
        while (equations.length <= input.length) {
            this.bindEquation();
        }
        let lastOutput;
        for (let i = 0; i < input.length; i++) {
            lastOutput = equations[i].runInput(new Float32Array([input[i]]));
        }
        this.end();
        return lastOutput.weights[0];
    }
    runArrayOfArray(input) {
        this.checkRunnable();
        const { model } = this;
        const { equations } = model;
        while (equations.length <= input.length) {
            this.bindEquation();
        }
        let lastOutput;
        for (let i = 0; i < input.length; i++) {
            const outputMatrix = equations[i].runInput(input[i]);
            lastOutput = outputMatrix.weights;
        }
        this.end();
        return lastOutput !== null && lastOutput !== void 0 ? lastOutput : Float32Array.from([]);
    }
    runObject(input) {
        if (!this.inputLookup) {
            throw new Error('this.inputLookup not set');
        }
        if (!this.outputLookup) {
            throw new Error('this.outputLookup not set');
        }
        if (!this.outputLookupLength) {
            throw new Error('this.outputLookupLength not set');
        }
        if (this.inputLookup === this.outputLookup) {
            const inputArray = lookup.toArrayShort(this.inputLookup, input);
            return lookup.toObjectPartial(this.outputLookup, this.forecastArray(inputArray, this.outputLookupLength - inputArray.length), inputArray.length);
        }
        return lookup.toObject(this.outputLookup, this.forecastArray(lookup.toArray(this.inputLookup, input, this.inputLookupLength), this.outputLookupLength));
    }
    runArrayOfObject(input) {
        if (this.inputLookup === null) {
            throw new Error('this.inputLookup not set');
        }
        if (this.outputLookup === null) {
            throw new Error('this.outputLookup not set');
        }
        const formattedInput = input.map((value) => lookup.toArray(this.inputLookup, value, this.inputLookupLength));
        return this.forecastArrayOfArray(formattedInput, 1).map((value) => lookup.toObject(this.outputLookup, value))[0];
    }
    runArrayOfObjectOfArray(input) {
        if (!this.inputLookup) {
            throw new Error('this.inputLookup not set');
        }
        if (!this.outputLookup) {
            throw new Error('this.outputLookup not set');
        }
        return lookup.toObject(this.outputLookup, this.runArrayOfArray(lookup.toArrays(this.inputLookup, input, this.inputLookupLength)));
    }
    end() {
        this.model.equations[this.model.equations.length - 1].runInput(new Float32Array(this.options.outputSize));
    }
    requireInputOutputOfOne() {
        if (this.options.inputSize !== 1) {
            throw new Error('inputSize must be 1 for this data size');
        }
        if (this.options.outputSize !== 1) {
            throw new Error('outputSize must be 1 for this data size');
        }
    }
    // Handles data shape of 'array,number'
    formatArray(data) {
        const result = [];
        this.requireInputOutputOfOne();
        for (let i = 0; i < data.length; i++) {
            result.push(Float32Array.from([data[i]]));
        }
        return [result];
    }
    // Handles data shape of 'array,array,number'
    formatArrayOfArray(data) {
        const result = [];
        const { inputSize, outputSize } = this.options;
        if (inputSize === 1 && outputSize === 1) {
            for (let i = 0; i < data.length; i++) {
                result.push(arrayToFloat32Arrays(data[i]));
            }
            return result;
        }
        if (inputSize !== data[0].length) {
            throw new Error('inputSize must match data input size');
        }
        if (outputSize !== data[0].length) {
            throw new Error('outputSize must match data output size');
        }
        for (let i = 0; i < data.length; i++) {
            result.push(Float32Array.from(data[i]));
        }
        return [result];
    }
    // Handles data shape of 'array,object,number'
    formatArrayOfObject(data) {
        this.requireInputOutputOfOne();
        if (!this.inputLookup) {
            const lookupTable = new LookupTable(data);
            this.inputLookup = this.outputLookup = lookupTable.table;
            this.inputLookupLength = this.outputLookupLength = lookupTable.length;
        }
        const result = [];
        for (let i = 0; i < data.length; i++) {
            result.push(objectToFloat32Arrays(data[i]));
        }
        return result;
    }
    // Handles data shape of 'array,object,number' when this.options.inputSize > 1
    formatArrayOfObjectMulti(data) {
        if (!this.inputLookup) {
            const lookupTable = new LookupTable(data);
            this.inputLookup = this.outputLookup = lookupTable.table;
            this.inputLookupLength = this.outputLookupLength = lookupTable.length;
        }
        const result = [];
        for (let i = 0; i < data.length; i++) {
            result.push([
                objectToFloat32Array(data[i], this.inputLookup, this.inputLookupLength),
            ]);
        }
        return result;
    }
    // Handles data shape of 'array,datum,array,number'
    formatArrayOfDatumOfArray(data) {
        const result = [];
        this.requireInputOutputOfOne();
        for (let i = 0; i < data.length; i++) {
            const datum = data[i];
            result.push(inputOutputArrayToFloat32Arrays(datum.input, datum.output));
        }
        return result;
    }
    // Handles data shape of 'array,datum,object,number'
    formatArrayOfDatumOfObject(data) {
        this.requireInputOutputOfOne();
        if (!this.inputLookup) {
            const inputLookup = new LookupTable(data, 'input');
            this.inputLookup = inputLookup.table;
            this.inputLookupLength = inputLookup.length;
        }
        if (!this.outputLookup) {
            const outputLookup = new LookupTable(data, 'output');
            this.outputLookup = outputLookup.table;
            this.outputLookupLength = outputLookup.length;
        }
        const result = [];
        for (let i = 0; i < data.length; i++) {
            const datum = data[i];
            result.push(inputOutputObjectToFloat32Arrays(datum.input, datum.output));
        }
        return result;
    }
    // Handles data shape of 'array,array,array,number'
    formatArrayOfArrayOfArray(data) {
        const result = [];
        for (let i = 0; i < data.length; i++) {
            result.push(arraysToFloat32Arrays(data[i]));
        }
        return result;
    }
    // Handles data shape of 'array,array,object,number'
    formatArrayOfArrayOfObject(data) {
        if (!this.inputLookup) {
            const lookupTable = new LookupTable(data);
            this.inputLookup = this.outputLookup = lookupTable.table;
            this.inputLookupLength = this.outputLookupLength = lookupTable.length;
        }
        const result = [];
        for (let i = 0; i < data.length; i++) {
            const array = [];
            for (let j = 0; j < data[i].length; j++) {
                array.push(objectToFloat32Array(data[i][j], this.inputLookup, this.inputLookupLength));
            }
            result.push(array);
        }
        return result;
    }
    // Handles data shape of 'array,datum,array,array,number'
    formatArrayOfDatumOfArrayOfArray(data) {
        const result = [];
        const { inputSize, outputSize } = this.options;
        if (inputSize !== data[0].input[0].length) {
            throw new Error('inputSize must match data input size');
        }
        if (outputSize !== data[0].output[0].length) {
            throw new Error('outputSize must match data output size');
        }
        for (let i = 0; i < data.length; i++) {
            const datum = data[i];
            result.push(inputOutputArraysToFloat32Arrays(datum.input, datum.output));
        }
        return result;
    }
    // 'Handles data shape of array,datum,array,object,number'
    formatArrayOfDatumOfArrayOfObject(data) {
        if (!this.inputLookup) {
            const inputLookup = new ArrayLookupTable(data, 'input');
            this.inputLookup = inputLookup.table;
            this.inputLookupLength = inputLookup.length;
        }
        if (!this.outputLookup) {
            const outputLookup = new ArrayLookupTable(data, 'output');
            this.outputLookup = outputLookup.table;
            this.outputLookupLength = outputLookup.length;
        }
        if (!this.outputLookupLength) {
            throw new Error('this.outputLookupLength not set to usable number');
        }
        const result = [];
        for (let i = 0; i < data.length; i++) {
            const datum = data[i];
            result.push(inputOutputObjectsToFloat32Arrays(datum.input, datum.output, this.inputLookup, this.outputLookup, this.inputLookupLength, this.outputLookupLength));
        }
        return result;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    formatData(data) {
        const dataShape = lookup.dataShape(data).join(',');
        switch (dataShape) {
            case 'array,number':
                return this.formatArray(data);
            case 'array,array,number':
                return this.formatArrayOfArray(data);
            case 'array,object,number':
                if (this.options.inputSize === 1) {
                    return this.formatArrayOfObject(data);
                }
                else {
                    return this.formatArrayOfObjectMulti(data);
                }
            case 'array,datum,array,number':
                return this.formatArrayOfDatumOfArray(data);
            case 'array,datum,object,number':
                return this.formatArrayOfDatumOfObject(data);
            case 'array,array,array,number':
                return this.formatArrayOfArrayOfArray(data);
            case 'array,array,object,number':
                return this.formatArrayOfArrayOfObject(data);
            case 'array,datum,array,array,number':
                return this.formatArrayOfDatumOfArrayOfArray(data);
            case 'array,datum,array,object,number':
                return this.formatArrayOfDatumOfArrayOfObject(data);
            default:
                throw new Error('unknown data shape or configuration');
        }
    }
    test(data) {
        // for classification problems
        const misclasses = [];
        // run each pattern through the trained network and collect
        // error and misclassification statistics
        let errorSum = 0;
        const formattedData = this.formatData(data);
        for (let i = 0; i < formattedData.length; i++) {
            const input = formattedData[i];
            const output = this.run(input.splice(0, input.length - 1));
            const target = input[input.length - 1];
            let errors = 0;
            let errorCount = 0;
            for (let j = 0; j < output.length; j++) {
                errorCount++;
                const error = target[j] - output[j];
                // mse
                errors += error * error;
            }
            errorSum += errors / errorCount;
            const errorsAbs = Math.abs(errors);
            if (errorsAbs > this.trainOpts.errorThresh) {
                const misclass = data[i];
                misclasses.push({
                    value: misclass,
                    actual: output,
                });
            }
        }
        return {
            error: errorSum / formattedData.length,
            misclasses,
            total: formattedData.length,
        };
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    addFormat(value) {
        var _a, _b, _c, _d, _e, _f;
        const dataShape = lookup.dataShape(value).join(',');
        switch (dataShape) {
            case 'array,array,number':
            case 'datum,array,array,number':
            case 'array,number':
            case 'datum,array,number':
                return;
            case 'datum,object,number': {
                this.inputLookup = lookup.addKeys(value.input, (_a = this.inputLookup) !== null && _a !== void 0 ? _a : {});
                if (this.inputLookup) {
                    this.inputLookupLength = Object.keys(this.inputLookup).length;
                }
                this.outputLookup = lookup.addKeys(value.output, (_b = this.outputLookup) !== null && _b !== void 0 ? _b : {});
                if (this.outputLookup) {
                    this.outputLookupLength = Object.keys(this.outputLookup).length;
                }
                break;
            }
            case 'object,number': {
                this.inputLookup = this.outputLookup = lookup.addKeys(value, (_c = this.inputLookup) !== null && _c !== void 0 ? _c : {});
                if (this.inputLookup) {
                    this.inputLookupLength = this.outputLookupLength = Object.keys(this.inputLookup).length;
                }
                break;
            }
            case 'array,object,number': {
                const typedValue = value;
                for (let i = 0; i < typedValue.length; i++) {
                    this.inputLookup = this.outputLookup = lookup.addKeys(typedValue[i], (_d = this.inputLookup) !== null && _d !== void 0 ? _d : {});
                    if (this.inputLookup) {
                        this.inputLookupLength = this.outputLookupLength = Object.keys(this.inputLookup).length;
                    }
                }
                break;
            }
            case 'datum,array,object,number': {
                const typedValue = value;
                const typedInput = typedValue.input;
                for (let i = 0; i < typedInput.length; i++) {
                    this.inputLookup = lookup.addKeys(typedInput[i], (_e = this.inputLookup) !== null && _e !== void 0 ? _e : {});
                    if (this.inputLookup) {
                        this.inputLookupLength = Object.keys(this.inputLookup).length;
                    }
                }
                const typedOutput = typedValue.output;
                for (let i = 0; i < typedOutput.length; i++) {
                    this.outputLookup = lookup.addKeys(typedOutput[i], (_f = this.outputLookup) !== null && _f !== void 0 ? _f : {});
                    if (this.outputLookup) {
                        this.outputLookupLength = Object.keys(this.outputLookup).length;
                    }
                }
                break;
            }
            default:
                throw new Error('unknown data shape or configuration');
        }
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    toJSON() {
        if (!this.model) {
            this.initialize();
        }
        const { model } = this;
        const options = { ...this.options, ...defaults$1 };
        return {
            type: this.constructor.name,
            options,
            hiddenLayers: model.hiddenLayers.map((hiddenLayer) => {
                const layers = {};
                for (const p in hiddenLayer) {
                    if (!hiddenLayer.hasOwnProperty(p))
                        continue;
                    layers[p] = hiddenLayer[p].toJSON();
                }
                return layers;
            }),
            outputConnector: model.outputConnector.toJSON(),
            output: model.output.toJSON(),
            inputLookup: this.inputLookup,
            inputLookupLength: this.inputLookupLength,
            outputLookup: this.outputLookup,
            outputLookupLength: this.outputLookupLength,
        };
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    fromJSON(json) {
        const { options } = json;
        const allMatrices = [];
        const hiddenLayers = [];
        // backward compatibility for hiddenSizes
        json.hiddenLayers.forEach((hiddenLayer) => {
            const layers = {};
            for (const p in hiddenLayer) {
                layers[p] = Matrix.fromJSON(hiddenLayer[p]);
                allMatrices.push(layers[p]);
            }
            hiddenLayers.push(layers);
        });
        const outputConnector = Matrix.fromJSON(json.outputConnector);
        allMatrices.push(outputConnector);
        const output = Matrix.fromJSON(json.output);
        allMatrices.push(output);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.options = { ...defaults(), ...options };
        this.inputLookup = json.inputLookup;
        this.inputLookupLength = json.inputLookupLength;
        this.outputLookup = json.outputLookup;
        this.outputLookupLength = json.outputLookupLength;
        this.model = Object.seal({
            isInitialized: true,
            hiddenLayers,
            output,
            allMatrices,
            outputConnector,
            equations: [],
            equationConnections: [],
        });
        this.initialLayerInputs = options.hiddenLayers.map((size) => new Matrix(size, 1));
        this.bindEquation();
        return this;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    toFunction(cb) {
        const { model, inputLookup, inputLookupLength, outputLookup, outputLookupLength, } = this;
        const { inputSize } = this.options;
        const { equations } = model;
        const equation = equations[1];
        const { states } = equation;
        const jsonString = JSON.stringify(this.toJSON());
        function previousConnectionIndex(m) {
            const connection = model.equationConnections[0];
            const { states } = equations[0];
            for (let i = 0, max = states.length; i < max; i++) {
                if (states[i].product === m) {
                    return i;
                }
            }
            return connection.indexOf(m);
        }
        function matrixOrigin(m, stateIndex) {
            for (let i = 0, max = states.length; i < max; i++) {
                const state = states[i];
                if (i === stateIndex) {
                    const j = previousConnectionIndex(m);
                    switch (m) {
                        case state.left:
                            if (j > -1) {
                                return `typeof prevStates[${j}] === 'object' ? prevStates[${j}].product : new Matrix(${m.rows}, ${m.columns})`;
                            }
                        // eslint-disable-next-line no-fallthrough
                        case state.right:
                            if (j > -1) {
                                return `typeof prevStates[${j}] === 'object' ? prevStates[${j}].product : new Matrix(${m.rows}, ${m.columns})`;
                            }
                        // eslint-disable-next-line no-fallthrough
                        case state.product:
                            return `new Matrix(${m.rows}, ${m.columns})`;
                        default:
                            throw Error('unknown state');
                    }
                }
                if (m === state.product)
                    return `states[${i}].product`;
                if (m === state.right)
                    return `states[${i}].right`;
                if (m === state.left)
                    return `states[${i}].left`;
            }
            return '';
        }
        function matrixToString(m, stateIndex) {
            if (!m || !m.rows || !m.columns)
                return 'null';
            if (m === model.outputConnector)
                return `json.outputConnector`;
            if (m === model.output)
                return `json.output`;
            for (let i = 0, max = model.hiddenLayers.length; i < max; i++) {
                const hiddenLayer = model.hiddenLayers[i];
                for (const p in hiddenLayer) {
                    if (!hiddenLayer.hasOwnProperty(p))
                        continue;
                    if (hiddenLayer[p] !== m)
                        continue;
                    return `json.hiddenLayers[${i}].${p}`;
                }
            }
            return matrixOrigin(m, stateIndex);
        }
        function formatInputData() {
            if (!inputLookup)
                return '';
            if (inputSize === 1) {
                if (inputLookup === outputLookup) {
                    return `function lookupInput(input) {
            var table = ${JSON.stringify(inputLookup)};
            var result = [];
            for (var p in table) {
              if (!input.hasOwnProperty(p)) break;
              result.push(Float32Array.from([input[p]]));
            }
            return result;
          }`;
                }
                return `function lookupInput(input) {
          var table = ${JSON.stringify(inputLookup)};
          var result = [];
          for (var p in table) {
            result.push(Float32Array.from([input[p]]));
          }
          return result;
        }`;
            }
            return `function lookupInput(rawInputs) {
        var table = ${JSON.stringify(inputLookup)};
        var result = [];
        for (var i = 0; i < rawInputs.length; i++) {
          var rawInput = rawInputs[i];
          var input = new Float32Array(${inputLookupLength});
          for (var p in table) {
            input[table[p]] = rawInput.hasOwnProperty(p) ? rawInput[p] : 0;
          }
          result.push(input);
        }
        return result;
      }`;
        }
        function formatOutputData() {
            if (!outputLookup)
                return '';
            if (inputSize === 1) {
                if (inputLookup === outputLookup) {
                    return `function lookupOutputPartial(output, input) {
            var table = ${JSON.stringify(outputLookup)};
            var offset = input.length;
            var result = {};
            var i = 0;
            for (var p in table) {
              if (i++ < offset) continue;
              result[p] = output[table[p] - offset][0];
            }
            return result;
          }`;
                }
                return `function lookupOutput(output) {
          var table = ${JSON.stringify(outputLookup)};
          var result = {};
          for (var p in table) {
            result[p] = output[table[p]][0];
          }
          return result;
        }`;
            }
            return `function lookupOutput(output) {
        var table = ${JSON.stringify(outputLookup)};
        var result = {};
        for (var p in table) {
          result[p] = output[table[p]];
        }
        return result;
      }`;
        }
        function toInner(fnString) {
            // crude, but should be sufficient for now
            // function() { body }
            // crude, but should be sufficient for now
            // function() { body }
            const fnParts = fnString.toString().split('{');
            fnParts.shift();
            // body }
            const fnBodyString = fnParts.join('{');
            const fnBodyParts = fnBodyString.split('}');
            fnBodyParts.pop();
            // body
            return fnBodyParts
                .join('}')
                .split('\n')
                .join('\n        ')
                .replace('product.deltas[i] = 0;', '')
                .replace('product.deltas[column] = 0;', '')
                .replace('left.deltas[leftIndex] = 0;', '')
                .replace('right.deltas[rightIndex] = 0;', '')
                .replace('product.deltas = left.deltas.slice(0);', '');
        }
        function fileName(fnName) {
            return `src/recurrent/matrix/${fnName.replace(/[A-Z]/g, function (value) {
                return `-${value.toLowerCase()}`;
            })}.js`;
        }
        const statesRaw = [];
        const usedFunctionNames = {};
        const innerFunctionsSwitch = [];
        for (let i = 0, max = states.length; i < max; i++) {
            const state = states[i];
            statesRaw.push(`states[${i}] = {
      name: '${state.forwardFn.name}',
      left: ${state.left ? matrixToString(state.left, i) : 'undefined'},
      right: ${state.right ? matrixToString(state.right, i) : 'undefined'},
      product: ${matrixToString(state.product, i)}
    }`);
            const fnName = state.forwardFn.name;
            if (!usedFunctionNames[fnName]) {
                usedFunctionNames[fnName] = true;
                if (state.name === 'input') {
                    innerFunctionsSwitch.push(`case '${fnName}':`);
                    innerFunctionsSwitch.push(inputLookup && inputSize === 1
                        ? 'product.weights = _i < input.length ? input[_i]: prevStates[prevStates.length - 1].product.weights;'
                        : inputSize === 1
                            ? 'product.weights = [input[_i]];'
                            : 'product.weights = input[_i];');
                    innerFunctionsSwitch.push('break;');
                }
                else {
                    innerFunctionsSwitch.push(`        case '${fnName}':${fnName !== 'forwardFn'
                        ? ` //compiled from ${fileName(fnName)}`
                        : ''}
          ${toInner(state.forwardFn.toString())}
          break;`);
                }
            }
        }
        const forceForecast = inputSize === 1 && this.outputLookup;
        const src = `
  var input = ${this.inputLookup ? 'lookupInput(rawInput)' : 'rawInput'};
  var json = ${jsonString};
  var output = [];
  var states = [];
  var prevStates;
  var state;
  var max = ${forceForecast
            ? inputLookup === outputLookup
                ? inputLookupLength
                : `input.length + ${outputLookupLength - 1}`
            : 'input.length'};
  for (var _i = 0; _i < max; _i++) {
    prevStates = states;
    states = [];
    ${statesRaw.join(';\n    ')};
    for (var stateIndex = 0, stateMax = ${statesRaw.length}; stateIndex < stateMax; stateIndex++) {
      state = states[stateIndex];
      var product = state.product;
      var left = state.left;
      var right = state.right;

      switch (state.name) {
${innerFunctionsSwitch.join('\n')}
      }
    }
    ${inputSize === 1 && inputLookup
            ? 'if (_i >= input.length - 1) { output.push(state.product.weights); }'
            : 'output = state.product.weights;'}
  }
  ${outputLookup
            ? outputLookup === inputLookup
                ? 'return lookupOutputPartial(output, input)'
                : 'return lookupOutput(output)'
            : inputSize === 1
                ? 'return output[0]'
                : 'return output'};
  ${formatInputData()}
  ${formatOutputData()}

  function Matrix(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.weights = new Float32Array(rows * columns);
  }
  ${softmax.toString().replace('_2.default', 'Matrix')}
  ${randomFloat.toString()}
  ${sampleI.toString()}
  ${maxI.toString()}`;
        // eslint-disable-next-line
        return new Function('rawInput', cb ? cb(src) : src);
    }
}
const trainDefaults = { ...trainDefaults$1 };

class GRUTimeStep extends RNNTimeStep {
    getHiddenLayer(hiddenSize, prevSize) {
        return getGRUHiddenLayer(hiddenSize, prevSize);
    }
    getEquation(equation, inputMatrix, previousResult, hiddenLayer) {
        return getGRUEquation(equation, inputMatrix, previousResult, hiddenLayer);
    }
}

class LSTM extends RNN {
    getHiddenLayer(hiddenSize, prevSize) {
        return getHiddenLSTMLayer(hiddenSize, prevSize);
    }
    getEquation(equation, inputMatrix, previousResult, hiddenLayer) {
        return getLSTMEquation(equation, inputMatrix, previousResult, hiddenLayer);
    }
}
function getHiddenLSTMLayer(hiddenSize, prevSize) {
    return {
        // gates parameters
        // wix
        inputMatrix: new RandomMatrix(hiddenSize, prevSize, 0.08),
        inputHidden: new RandomMatrix(hiddenSize, hiddenSize, 0.08),
        inputBias: new Matrix(hiddenSize, 1),
        // wfx
        forgetMatrix: new RandomMatrix(hiddenSize, prevSize, 0.08),
        forgetHidden: new RandomMatrix(hiddenSize, hiddenSize, 0.08),
        forgetBias: new Matrix(hiddenSize, 1),
        // wox
        outputMatrix: new RandomMatrix(hiddenSize, prevSize, 0.08),
        outputHidden: new RandomMatrix(hiddenSize, hiddenSize, 0.08),
        outputBias: new Matrix(hiddenSize, 1),
        // cell write params
        // wcx
        cellActivationMatrix: new RandomMatrix(hiddenSize, prevSize, 0.08),
        cellActivationHidden: new RandomMatrix(hiddenSize, hiddenSize, 0.08),
        cellActivationBias: new Matrix(hiddenSize, 1),
    };
}
function getLSTMEquation(equation, inputMatrix, previousResult, hiddenLayer) {
    if (!hiddenLayer.inputMatrix ||
        !hiddenLayer.inputHidden ||
        !hiddenLayer.inputBias ||
        !hiddenLayer.forgetMatrix ||
        !hiddenLayer.forgetHidden ||
        !hiddenLayer.forgetBias ||
        !hiddenLayer.outputMatrix ||
        !hiddenLayer.outputHidden ||
        !hiddenLayer.outputBias ||
        !hiddenLayer.cellActivationMatrix ||
        !hiddenLayer.cellActivationHidden ||
        !hiddenLayer.cellActivationBias) {
        throw new Error('hiddenLayer does not have expected properties');
    }
    const sigmoid = equation.sigmoid.bind(equation);
    const add = equation.add.bind(equation);
    const multiply = equation.multiply.bind(equation);
    const multiplyElement = equation.multiplyElement.bind(equation);
    const tanh = equation.tanh.bind(equation);
    const inputGate = sigmoid(add(add(multiply(hiddenLayer.inputMatrix, inputMatrix), multiply(hiddenLayer.inputHidden, previousResult)), hiddenLayer.inputBias));
    const forgetGate = sigmoid(add(add(multiply(hiddenLayer.forgetMatrix, inputMatrix), multiply(hiddenLayer.forgetHidden, previousResult)), hiddenLayer.forgetBias));
    // output gate
    const outputGate = sigmoid(add(add(multiply(hiddenLayer.outputMatrix, inputMatrix), multiply(hiddenLayer.outputHidden, previousResult)), hiddenLayer.outputBias));
    // write operation on cells
    const cellWrite = tanh(add(add(multiply(hiddenLayer.cellActivationMatrix, inputMatrix), multiply(hiddenLayer.cellActivationHidden, previousResult)), hiddenLayer.cellActivationBias));
    // compute new cell activation
    const retainCell = multiplyElement(forgetGate, previousResult); // what do we keep from cell
    const writeCell = multiplyElement(inputGate, cellWrite); // what do we write to cell
    const cell = add(retainCell, writeCell); // new cell contents
    // compute hidden state as gated, saturated cell activations
    return multiplyElement(outputGate, tanh(cell));
}

class LSTMTimeStep extends RNNTimeStep {
    getHiddenLayer(hiddenSize, prevSize) {
        return getHiddenLSTMLayer(hiddenSize, prevSize);
    }
    getEquation(equation, inputMatrix, previousResult, hiddenLayer) {
        return getLSTMEquation(equation, inputMatrix, previousResult, hiddenLayer);
    }
}

/**
 *
 * @param start
 * @param end
 * @returns {Array}
 */
function range(start, end) {
    const result = [];
    for (; start < end; start++) {
        result.push(start);
    }
    return result;
}

function toArray(values) {
    if (Array.isArray(values)) {
        return Float32Array.from(values);
    }
    return Float32Array.from(Object.values(values));
}

function drawInput({ pixelX, pixelY, radius, inputs, row, line, fontSize, fontClassName, }) {
    let svg = `<rect
              x="${pixelX / 2 - radius}"
              y="${pixelY / 2 + row * pixelY - radius}"
              width="${2 * radius}"
              height="${2 * radius}"
              stroke="black"
              stroke-width="1"
              fill="${inputs.color}"
              class="${inputs.className}" />
            <line
              x1="${pixelX / 4}"
              y1="${pixelY / 2 + row * pixelY}"
              x2="${pixelX / 2 - radius}"
              y2="${pixelY / 2 + row * pixelY}"
              style="stroke:${line.color};stroke-width:${line.width}"
              class="${line.className}" />`;
    if (inputs.labels) {
        svg += `<text
              x="${pixelX / 8}"
              y="${pixelY / 2 + row * pixelY - 5}"
              fill="black"
              font-size="${fontSize}"
              class="${fontClassName}">${inputs.labels[row]}</text>`;
    }
    return svg;
}
function drawNeuron({ pixelX, pixelY, row, column, radius, hidden, }) {
    return `<circle
            cx="${pixelX / 2 + column * pixelX}"
            cy="${pixelY / 2 + row * pixelY}"
            r="${radius}"
            stroke="black"
            stroke-width="1"
            fill="${hidden.color}"
            class="${hidden.className}" />`;
}
function drawOutput({ pixelX, pixelY, row, column, line, outputs, radius, }) {
    return `<circle
            cx="${pixelX / 2 + column * pixelX}"
            cy="${pixelY / 2 + row * pixelY}"
            r="${radius}"
            stroke="black"
            stroke-width="1"
            fill="${outputs.color}"
            class="${outputs.className}" />
          <line
            x1="${pixelX / 2 + column * pixelX + radius}"
            y1="${pixelY / 2 + row * pixelY}"
            x2="${pixelX / 2 + column * pixelX + pixelX / 4}"
            y2="${pixelY / 2 + row * pixelY}"
            style="stroke:${line.color};stroke-width:${line.width}"
            class="${line.className}" />`;
}
function drawBackwardConnections({ pixelX, pixelY, row, column, radius, lineY, line, previousConnectionIndex, }) {
    return `<line
            x1="${pixelX / 2 + (column - 1) * pixelX + radius}"
            y1="${lineY / 2 + previousConnectionIndex * lineY}"
            x2="${pixelX / 2 + column * pixelX - radius}"
            y2="${pixelY / 2 + row * pixelY}"
            style="stroke:${line.color};stroke-width:${line.width}"
            class="${line.className}" />`;
}
function neuralNetworkToInnerSVG(options) {
    const { sizes, height, width } = options;
    let svg = '';
    const pixelX = width / sizes.length;
    for (let column = 0; column < sizes.length; column++) {
        const size = sizes[column];
        const pixelY = height / size;
        for (let row = 0; row < size; row++) {
            if (column === 0) {
                svg += drawInput({ pixelX, pixelY, row, column, ...options });
            }
            else {
                if (column === sizes.length - 1) {
                    svg += drawOutput({ pixelX, pixelY, row, column, ...options });
                }
                else {
                    svg += drawNeuron({ pixelX, pixelY, row, column, ...options });
                }
                const previousSize = sizes[column - 1];
                const lineY = height / previousSize;
                for (let previousConnectionIndex = 0; previousConnectionIndex < previousSize; previousConnectionIndex++) {
                    svg += drawBackwardConnections({
                        pixelX,
                        pixelY,
                        row,
                        column,
                        lineY,
                        previousConnectionIndex,
                        ...options,
                    });
                }
            }
        }
    }
    return svg;
}
function drawRecurrentConnections({ pixelX, pixelY, row, column, radius, recurrentLine, }) {
    const moveX = pixelX / 2 + column * pixelX + radius + 1;
    const moveY = pixelY / 2 + row * pixelY;
    const x = moveX - radius * 2 - 2;
    const y = moveY;
    const x1 = x + 100;
    const y1 = y + 50;
    const x2 = moveX - 100;
    const y2 = moveY + 50;
    return `<path
              d="M ${moveX} ${moveY} C ${x1} ${y1}, ${x2} ${y2}, ${x} ${y}"
              stroke="${recurrentLine.color}"
              stroke-width="${recurrentLine.width}"
              fill="transparent"
              stroke-linecap="round"
              marker-end="url(#arrow)"
              class="${recurrentLine.className}" />`;
}
function rnnToInnerSVG(options) {
    const { width, height, recurrentLine, sizes, radius } = options;
    const pixelX = width / sizes.length;
    let svg = `<defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="${recurrentLine.color}" />
              </marker>
            </defs>`;
    svg += neuralNetworkToInnerSVG(options);
    for (let column = 1; column < sizes.length; column++) {
        const size = sizes[column];
        const pixelY = height / size;
        for (let row = 0; row < size; row++) {
            svg += drawRecurrentConnections({
                pixelX,
                pixelY,
                row,
                column,
                radius,
                recurrentLine,
            });
        }
    }
    return svg;
}
function getFeedForwardLayers(network) {
    const { options } = network;
    if (!options) {
        throw new Error('options not defined');
    }
    if (!options.inputLayer) {
        throw new Error('options.inputLater not defined');
    }
    if (!options.hiddenLayers) {
        throw new Error('options.hiddenLayers not defined');
    }
    if (options.hiddenLayers.length < 1) {
        throw new Error('options.hiddenLayers is empty');
    }
    if (!options.outputLayer) {
        throw new Error('options.outputLayer not defined');
    }
    const inputLayer = options.inputLayer();
    const hiddenLayers = [];
    hiddenLayers.push(options.hiddenLayers[0](inputLayer, 0));
    for (let i = 1; i < options.hiddenLayers.length; i++) {
        hiddenLayers.push(options.hiddenLayers[i](hiddenLayers[i - 1], i));
    }
    const outputLayer = options.outputLayer(hiddenLayers[hiddenLayers.length - 1], hiddenLayers.length);
    return {
        inputSize: inputLayer.height,
        hiddenLayers: hiddenLayers.map((hiddenLayer) => hiddenLayer.height),
        outputSize: outputLayer.height,
    };
}
function getRecurrentLayers(network) {
    const hiddenLayers = [];
    const { options } = network;
    if (!options.inputLayer) {
        throw new Error('inputLayer not defined');
    }
    if (!options.outputLayer) {
        throw new Error('outputLayer not defined');
    }
    const inputLayer = options.inputLayer();
    hiddenLayers.push(options.hiddenLayers[0](inputLayer, recurrentZeros(), 0));
    for (let i = 1; i < options.hiddenLayers.length; i++) {
        hiddenLayers.push(options.hiddenLayers[i](hiddenLayers[i - 1], recurrentZeros(), i));
    }
    const outputLayer = options.outputLayer(hiddenLayers[hiddenLayers.length - 1], -1);
    return {
        inputSize: inputLayer.height,
        hiddenLayers: hiddenLayers.map((hiddenLayer) => hiddenLayer.height),
        outputSize: outputLayer.height,
    };
}
function wrapOuterSVG(svgBody, width, height) {
    // language=html
    return `<svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="${width}"
            height="${height}">${svgBody}</svg>`;
}
function getNeuralNetworkJSONSizes(json) {
    return json.sizes;
}
function getNeuralNetworkSizes(net) {
    const { options, sizes } = net;
    const { inputSize, outputSize, hiddenLayers } = options;
    if (!sizes) {
        if (typeof inputSize === 'number' && inputSize < 1) {
            throw new Error('inputSize not set');
        }
        if (typeof outputSize === 'number' && outputSize < 1) {
            throw new Error('outputSize not set');
        }
        if (hiddenLayers === null || hiddenLayers === void 0 ? void 0 : hiddenLayers.some((v) => v < 1)) {
            throw new Error('hiddenLayers not set');
        }
    }
    return typeof inputSize === 'number' &&
        Array.isArray(hiddenLayers) &&
        typeof outputSize === 'number'
        ? [inputSize].concat(hiddenLayers).concat([outputSize])
        : sizes;
}
function getRNNSizes(net) {
    const { options } = net;
    const { inputSize, outputSize, hiddenLayers } = options;
    return [inputSize].concat(hiddenLayers).concat([outputSize]);
}
function defaultOptions() {
    return {
        line: {
            width: 0.5,
            color: 'black',
            className: 'connection',
        },
        recurrentLine: {
            width: 1,
            color: 'red',
            className: 'recurrence',
        },
        inputs: {
            color: 'rgba(0, 128, 0, 0.5)',
            labels: null,
            className: 'input',
        },
        outputs: {
            color: 'rgba(100, 149, 237, 0.5)',
            className: 'output',
        },
        hidden: {
            color: 'rgba(255, 127, 80, 0.5)',
            className: 'hidden-neuron',
        },
        fontSize: '14px',
        fontClassName: 'label',
        radius: 8,
        width: 400,
        height: 250,
        sizes: [],
    };
}
function toSVG(net, options) {
    const mergedOptions = { ...defaultOptions(), ...options };
    const { width, height, inputs } = mergedOptions;
    // Get network size array for NeuralNetwork or NeuralNetworkGPU
    let sizes = [];
    if (net instanceof NeuralNetwork || net instanceof NeuralNetworkGPU) {
        sizes = getNeuralNetworkSizes(net);
    }
    // get network size for Recurrent
    else if (net instanceof Recurrent) {
        const { inputSize, hiddenLayers, outputSize } = getRecurrentLayers(net);
        sizes = [inputSize].concat(hiddenLayers).concat([outputSize]);
    }
    // get network size for FeedForward
    else if (net instanceof FeedForward) {
        const { inputSize, hiddenLayers, outputSize } = getFeedForwardLayers(net);
        sizes = [inputSize].concat(hiddenLayers).concat([outputSize]);
    }
    // handle json, recurrent first
    else if (net instanceof RNN ||
        net instanceof LSTM ||
        net instanceof GRU ||
        net instanceof RNNTimeStep ||
        net instanceof LSTMTimeStep ||
        net instanceof GRUTimeStep) {
        return wrapOuterSVG(rnnToInnerSVG({
            ...mergedOptions,
            sizes: checkSizes(getRNNSizes(net), inputs.labels),
        }), width, height);
    }
    // handle json, NeuralNetwork
    else if (net.hasOwnProperty('type')) {
        switch (net.type) {
            case 'NeuralNetwork':
            case 'NeuralNetworkGPU':
                return wrapOuterSVG(neuralNetworkToInnerSVG({
                    ...mergedOptions,
                    sizes: checkSizes(getNeuralNetworkJSONSizes(net), inputs.labels),
                }), width, height);
            case 'RNN':
            case 'GRU':
            case 'LSTM':
            case 'RNNTimeStep':
            case 'GRUTimeStep':
            case 'LSTMTimeStep':
                return wrapOuterSVG(rnnToInnerSVG({
                    ...mergedOptions,
                    sizes: checkSizes(getRNNSizes(net), inputs.labels),
                }), width, height);
            default:
                throw new Error('unrecognized network');
        }
    }
    else if (net.hasOwnProperty('inputSize') &&
        net.hasOwnProperty('hiddenLayers') &&
        net.hasOwnProperty('outputSize')) {
        const { inputSize, hiddenLayers, outputSize } = net;
        sizes = [inputSize, ...hiddenLayers, outputSize];
    }
    else if (net.hasOwnProperty('sizes')) {
        sizes = net.sizes;
    }
    else {
        throw new Error('unrecognized network');
    }
    return wrapOuterSVG(neuralNetworkToInnerSVG({
        ...mergedOptions,
        sizes: checkSizes(sizes, inputs.labels),
    }), width, height);
}
function checkSizes(sizes, labels) {
    if (!sizes) {
        throw new Error('sizes not set');
    }
    if (sizes.some((size) => size < 1)) {
        throw new Error('sizes not set correctly');
    }
    if (labels && labels.length !== sizes[0]) {
        throw new Error('not enough labels for inputs');
    }
    return sizes;
}

const recurrent = {
    RNNTimeStep,
    LSTMTimeStep,
    GRUTimeStep,
    RNN,
    LSTM,
    GRU,
};
const utilities = {
    max,
    mse: mse$1,
    ones: ones$1,
    ones2D,
    random: random$1,
    randomWeight,
    randos,
    range,
    toArray,
    DataFormatter,
    zeros: zeros$1,
    toSVG,
};

exports.CrossValidate = CrossValidate;
exports.FeedForward = FeedForward;
exports.NeuralNetwork = NeuralNetwork;
exports.NeuralNetworkGPU = NeuralNetworkGPU;
exports.Recurrent = Recurrent;
exports.activation = index$1;
exports.layer = layer;
exports.layerTypes = layerTypes;
exports.likely = likely;
exports.lookup = lookup;
exports.praxis = index;
exports.recurrent = recurrent;
exports.utilities = utilities;
//# sourceMappingURL=index.js.map
