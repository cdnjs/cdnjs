/**
 * @module ol/render/canvas/ExecutorGroup
 */
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
import { numberSafeCompareFunction } from '../../array.js';
import { createCanvasContext2D } from '../../dom.js';
import { buffer, createEmpty, extendCoordinate } from '../../extent.js';
import { transform2D } from '../../geom/flat/transform.js';
import { isEmpty } from '../../obj.js';
import BuilderType from './BuilderType.js';
import { create as createTransform, compose as composeTransform } from '../../transform.js';
import Executor from './Executor.js';
import Disposable from '../../Disposable.js';
/**
 * @const
 * @type {Array<BuilderType>}
 */
var ORDER = [
    BuilderType.POLYGON,
    BuilderType.CIRCLE,
    BuilderType.LINE_STRING,
    BuilderType.IMAGE,
    BuilderType.TEXT,
    BuilderType.DEFAULT
];
var ExecutorGroup = /** @class */ (function (_super) {
    __extends(ExecutorGroup, _super);
    /**
     * @param {import("../../extent.js").Extent} maxExtent Max extent for clipping. When a
     * `maxExtent` was set on the Buillder for this executor group, the same `maxExtent`
     * should be set here, unless the target context does not exceet that extent (which
     * can be the case when rendering to tiles).
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {boolean} overlaps The executor group can have overlapping geometries.
     * @param {?} declutterTree Declutter tree for declutter processing in postrender.
     * @param {!Object<string, !Object<BuilderType, import("./Builder.js").SerializableInstructions>>} allInstructions
     * The serializable instructions.
     * @param {number=} opt_renderBuffer Optional rendering buffer.
     */
    function ExecutorGroup(maxExtent, resolution, pixelRatio, overlaps, declutterTree, allInstructions, opt_renderBuffer) {
        var _this = _super.call(this) || this;
        /**
         * Declutter tree.
         * @private
         */
        _this.declutterTree_ = declutterTree;
        /**
         * @private
         * @type {import("../../extent.js").Extent}
         */
        _this.maxExtent_ = maxExtent;
        /**
         * @private
         * @type {boolean}
         */
        _this.overlaps_ = overlaps;
        /**
         * @private
         * @type {number}
         */
        _this.pixelRatio_ = pixelRatio;
        /**
         * @private
         * @type {number}
         */
        _this.resolution_ = resolution;
        /**
         * @private
         * @type {number|undefined}
         */
        _this.renderBuffer_ = opt_renderBuffer;
        /**
         * @private
         * @type {!Object<string, !Object<BuilderType, import("./Executor").default>>}
         */
        _this.executorsByZIndex_ = {};
        /**
         * @private
         * @type {CanvasRenderingContext2D}
         */
        _this.hitDetectionContext_ = createCanvasContext2D(1, 1);
        /**
         * @private
         * @type {import("../../transform.js").Transform}
         */
        _this.hitDetectionTransform_ = createTransform();
        _this.createExecutors_(allInstructions);
        return _this;
    }
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {import("../../transform.js").Transform} transform Transform.
     */
    ExecutorGroup.prototype.clip = function (context, transform) {
        var flatClipCoords = this.getClipCoords(transform);
        context.beginPath();
        context.moveTo(flatClipCoords[0], flatClipCoords[1]);
        context.lineTo(flatClipCoords[2], flatClipCoords[3]);
        context.lineTo(flatClipCoords[4], flatClipCoords[5]);
        context.lineTo(flatClipCoords[6], flatClipCoords[7]);
        context.clip();
    };
    /**
     * Create executors and populate them using the provided instructions.
     * @private
     * @param {!Object<string, !Object<BuilderType, import("./Builder.js").SerializableInstructions>>} allInstructions The serializable instructions
     */
    ExecutorGroup.prototype.createExecutors_ = function (allInstructions) {
        for (var zIndex in allInstructions) {
            var executors = this.executorsByZIndex_[zIndex];
            if (executors === undefined) {
                this.executorsByZIndex_[zIndex] = executors = {};
            }
            var instructionByZindex = allInstructions[zIndex];
            for (var builderType in instructionByZindex) {
                var instructions = instructionByZindex[builderType];
                executors[builderType] = new Executor(this.resolution_, this.pixelRatio_, this.overlaps_, this.declutterTree_, instructions);
            }
        }
    };
    /**
     * @inheritDoc
     */
    ExecutorGroup.prototype.disposeInternal = function () {
        for (var z in this.executorsByZIndex_) {
            var executors = this.executorsByZIndex_[z];
            for (var key in executors) {
                executors[key].disposeInternal();
            }
        }
        var canvas = this.hitDetectionContext_.canvas;
        canvas.width = canvas.height = 0;
        _super.prototype.disposeInternal.call(this);
    };
    /**
     * @param {Array<BuilderType>} executors Executors.
     * @return {boolean} Has executors of the provided types.
     */
    ExecutorGroup.prototype.hasExecutors = function (executors) {
        for (var zIndex in this.executorsByZIndex_) {
            var candidates = this.executorsByZIndex_[zIndex];
            for (var i = 0, ii = executors.length; i < ii; ++i) {
                if (executors[i] in candidates) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {number} resolution Resolution.
     * @param {number} rotation Rotation.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @param {Object<string, boolean>} skippedFeaturesHash Ids of features to skip.
     * @param {function(import("../../Feature.js").FeatureLike): T} callback Feature callback.
     * @param {Object<string, import("../canvas.js").DeclutterGroup>} declutterReplays Declutter replays.
     * @return {T|undefined} Callback result.
     * @template T
     */
    ExecutorGroup.prototype.forEachFeatureAtCoordinate = function (coordinate, resolution, rotation, hitTolerance, skippedFeaturesHash, callback, declutterReplays) {
        hitTolerance = Math.round(hitTolerance);
        var contextSize = hitTolerance * 2 + 1;
        var transform = composeTransform(this.hitDetectionTransform_, hitTolerance + 0.5, hitTolerance + 0.5, 1 / resolution, -1 / resolution, -rotation, -coordinate[0], -coordinate[1]);
        var context = this.hitDetectionContext_;
        if (context.canvas.width !== contextSize || context.canvas.height !== contextSize) {
            context.canvas.width = contextSize;
            context.canvas.height = contextSize;
        }
        else {
            context.clearRect(0, 0, contextSize, contextSize);
        }
        /**
         * @type {import("../../extent.js").Extent}
         */
        var hitExtent;
        if (this.renderBuffer_ !== undefined) {
            hitExtent = createEmpty();
            extendCoordinate(hitExtent, coordinate);
            buffer(hitExtent, resolution * (this.renderBuffer_ + hitTolerance), hitExtent);
        }
        var mask = getCircleArray(hitTolerance);
        var declutteredFeatures;
        if (this.declutterTree_) {
            declutteredFeatures = this.declutterTree_.all().map(function (entry) {
                return entry.value;
            });
        }
        var builderType;
        /**
         * @param {import("../../Feature.js").FeatureLike} feature Feature.
         * @return {?} Callback result.
         */
        function featureCallback(feature) {
            var imageData = context.getImageData(0, 0, contextSize, contextSize).data;
            for (var i_1 = 0; i_1 < contextSize; i_1++) {
                for (var j_1 = 0; j_1 < contextSize; j_1++) {
                    if (mask[i_1][j_1]) {
                        if (imageData[(j_1 * contextSize + i_1) * 4 + 3] > 0) {
                            var result_1 = void 0;
                            if (!(declutteredFeatures && (builderType == BuilderType.IMAGE || builderType == BuilderType.TEXT)) ||
                                declutteredFeatures.indexOf(feature) !== -1) {
                                result_1 = callback(feature);
                            }
                            if (result_1) {
                                return result_1;
                            }
                            else {
                                context.clearRect(0, 0, contextSize, contextSize);
                                return undefined;
                            }
                        }
                    }
                }
            }
        }
        /** @type {Array<number>} */
        var zs = Object.keys(this.executorsByZIndex_).map(Number);
        zs.sort(numberSafeCompareFunction);
        var i, j, executors, executor, result;
        for (i = zs.length - 1; i >= 0; --i) {
            var zIndexKey = zs[i].toString();
            executors = this.executorsByZIndex_[zIndexKey];
            for (j = ORDER.length - 1; j >= 0; --j) {
                builderType = ORDER[j];
                executor = executors[builderType];
                if (executor !== undefined) {
                    if (declutterReplays &&
                        (builderType == BuilderType.IMAGE || builderType == BuilderType.TEXT)) {
                        var declutter = declutterReplays[zIndexKey];
                        if (!declutter) {
                            declutterReplays[zIndexKey] = [executor, transform.slice(0)];
                        }
                        else {
                            declutter.push(executor, transform.slice(0));
                        }
                    }
                    else {
                        result = executor.executeHitDetection(context, transform, rotation, skippedFeaturesHash, featureCallback, hitExtent);
                        if (result) {
                            return result;
                        }
                    }
                }
            }
        }
        return undefined;
    };
    /**
     * @param {import("../../transform.js").Transform} transform Transform.
     * @return {Array<number>} Clip coordinates.
     */
    ExecutorGroup.prototype.getClipCoords = function (transform) {
        var maxExtent = this.maxExtent_;
        if (!maxExtent) {
            return null;
        }
        var minX = maxExtent[0];
        var minY = maxExtent[1];
        var maxX = maxExtent[2];
        var maxY = maxExtent[3];
        var flatClipCoords = [minX, minY, minX, maxY, maxX, maxY, maxX, minY];
        transform2D(flatClipCoords, 0, 8, 2, transform, flatClipCoords);
        return flatClipCoords;
    };
    /**
     * @return {boolean} Is empty.
     */
    ExecutorGroup.prototype.isEmpty = function () {
        return isEmpty(this.executorsByZIndex_);
    };
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {import("../../transform.js").Transform} transform Transform.
     * @param {number} viewRotation View rotation.
     * @param {Object<string, boolean>} skippedFeaturesHash Ids of features to skip.
     * @param {boolean} snapToPixel Snap point symbols and test to integer pixel.
     * @param {Array<BuilderType>=} opt_builderTypes Ordered replay types to replay.
     *     Default is {@link module:ol/render/replay~ORDER}
     * @param {Object<string, import("../canvas.js").DeclutterGroup>=} opt_declutterReplays Declutter replays.
     */
    ExecutorGroup.prototype.execute = function (context, transform, viewRotation, skippedFeaturesHash, snapToPixel, opt_builderTypes, opt_declutterReplays) {
        /** @type {Array<number>} */
        var zs = Object.keys(this.executorsByZIndex_).map(Number);
        zs.sort(numberSafeCompareFunction);
        // setup clipping so that the parts of over-simplified geometries are not
        // visible outside the current extent when panning
        if (this.maxExtent_) {
            context.save();
            this.clip(context, transform);
        }
        var builderTypes = opt_builderTypes ? opt_builderTypes : ORDER;
        var i, ii, j, jj, replays, replay;
        for (i = 0, ii = zs.length; i < ii; ++i) {
            var zIndexKey = zs[i].toString();
            replays = this.executorsByZIndex_[zIndexKey];
            for (j = 0, jj = builderTypes.length; j < jj; ++j) {
                var builderType = builderTypes[j];
                replay = replays[builderType];
                if (replay !== undefined) {
                    if (opt_declutterReplays &&
                        (builderType == BuilderType.IMAGE || builderType == BuilderType.TEXT)) {
                        var declutter = opt_declutterReplays[zIndexKey];
                        if (!declutter) {
                            opt_declutterReplays[zIndexKey] = [replay, transform.slice(0)];
                        }
                        else {
                            declutter.push(replay, transform.slice(0));
                        }
                    }
                    else {
                        replay.execute(context, transform, viewRotation, skippedFeaturesHash, snapToPixel);
                    }
                }
            }
        }
        if (this.maxExtent_) {
            context.restore();
        }
    };
    return ExecutorGroup;
}(Disposable));
/**
 * This cache is used for storing calculated pixel circles for increasing performance.
 * It is a static property to allow each Replaygroup to access it.
 * @type {Object<number, Array<Array<(boolean|undefined)>>>}
 */
var circleArrayCache = {
    0: [[true]]
};
/**
 * This method fills a row in the array from the given coordinate to the
 * middle with `true`.
 * @param {Array<Array<(boolean|undefined)>>} array The array that will be altered.
 * @param {number} x X coordinate.
 * @param {number} y Y coordinate.
 */
function fillCircleArrayRowToMiddle(array, x, y) {
    var i;
    var radius = Math.floor(array.length / 2);
    if (x >= radius) {
        for (i = radius; i < x; i++) {
            array[i][y] = true;
        }
    }
    else if (x < radius) {
        for (i = x + 1; i < radius; i++) {
            array[i][y] = true;
        }
    }
}
/**
 * This methods creates a circle inside a fitting array. Points inside the
 * circle are marked by true, points on the outside are undefined.
 * It uses the midpoint circle algorithm.
 * A cache is used to increase performance.
 * @param {number} radius Radius.
 * @returns {Array<Array<(boolean|undefined)>>} An array with marked circle points.
 */
export function getCircleArray(radius) {
    if (circleArrayCache[radius] !== undefined) {
        return circleArrayCache[radius];
    }
    var arraySize = radius * 2 + 1;
    var arr = new Array(arraySize);
    for (var i = 0; i < arraySize; i++) {
        arr[i] = new Array(arraySize);
    }
    var x = radius;
    var y = 0;
    var error = 0;
    while (x >= y) {
        fillCircleArrayRowToMiddle(arr, radius + x, radius + y);
        fillCircleArrayRowToMiddle(arr, radius + y, radius + x);
        fillCircleArrayRowToMiddle(arr, radius - y, radius + x);
        fillCircleArrayRowToMiddle(arr, radius - x, radius + y);
        fillCircleArrayRowToMiddle(arr, radius - x, radius - y);
        fillCircleArrayRowToMiddle(arr, radius - y, radius - x);
        fillCircleArrayRowToMiddle(arr, radius + y, radius - x);
        fillCircleArrayRowToMiddle(arr, radius + x, radius - y);
        y++;
        error += 1 + 2 * y;
        if (2 * (error - x) + 1 > 0) {
            x -= 1;
            error += 1 - 2 * x;
        }
    }
    circleArrayCache[radius] = arr;
    return arr;
}
/**
 * @param {!Object<string, Array<*>>} declutterReplays Declutter replays.
 * @param {CanvasRenderingContext2D} context Context.
 * @param {number} rotation Rotation.
 * @param {boolean} snapToPixel Snap point symbols and text to integer pixels.
 */
export function replayDeclutter(declutterReplays, context, rotation, snapToPixel) {
    var zs = Object.keys(declutterReplays).map(Number).sort(numberSafeCompareFunction);
    var skippedFeatureUids = {};
    for (var z = 0, zz = zs.length; z < zz; ++z) {
        var executorData = declutterReplays[zs[z].toString()];
        for (var i = 0, ii = executorData.length; i < ii;) {
            var executor = executorData[i++];
            var transform = executorData[i++];
            executor.execute(context, transform, rotation, skippedFeatureUids, snapToPixel);
        }
    }
}
export default ExecutorGroup;
//# sourceMappingURL=ExecutorGroup.js.map