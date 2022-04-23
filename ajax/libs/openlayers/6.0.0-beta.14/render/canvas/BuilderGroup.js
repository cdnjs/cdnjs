/**
 * @module ol/render/canvas/BuilderGroup
 */
import { createEmpty } from '../../extent.js';
import Builder from './Builder.js';
import ImageBuilder from './ImageBuilder.js';
import LineStringBuilder from './LineStringBuilder.js';
import PolygonBuilder from './PolygonBuilder.js';
import TextBuilder from './TextBuilder.js';
/**
 * @type {Object<import("./BuilderType").default, typeof Builder>}
 */
var BATCH_CONSTRUCTORS = {
    'Circle': PolygonBuilder,
    'Default': Builder,
    'Image': ImageBuilder,
    'LineString': LineStringBuilder,
    'Polygon': PolygonBuilder,
    'Text': TextBuilder
};
var BuilderGroup = /** @class */ (function () {
    /**
     * @param {number} tolerance Tolerance.
     * @param {import("../../extent.js").Extent} maxExtent Max extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {boolean} declutter Decluttering enabled.
     */
    function BuilderGroup(tolerance, maxExtent, resolution, pixelRatio, declutter) {
        /**
         * @type {boolean}
         * @private
         */
        this.declutter_ = declutter;
        /**
         * @type {import("../canvas.js").DeclutterGroup}
         * @private
         */
        this.declutterGroup_ = null;
        /**
         * @private
         * @type {number}
         */
        this.tolerance_ = tolerance;
        /**
         * @private
         * @type {import("../../extent.js").Extent}
         */
        this.maxExtent_ = maxExtent;
        /**
         * @private
         * @type {number}
         */
        this.pixelRatio_ = pixelRatio;
        /**
         * @private
         * @type {number}
         */
        this.resolution_ = resolution;
        /**
         * @private
         * @type {!Object<string, !Object<import("./BuilderType").default, Builder>>}
         */
        this.buildersByZIndex_ = {};
    }
    /**
     * @param {boolean} group Group with previous builder.
     * @return {Array<*>} The resulting instruction group.
     */
    BuilderGroup.prototype.addDeclutter = function (group) {
        var declutter = null;
        if (this.declutter_) {
            if (group) {
                declutter = this.declutterGroup_;
                /** @type {number} */ (declutter[4])++;
            }
            else {
                declutter = this.declutterGroup_ = createEmpty();
                declutter.push(1);
            }
        }
        return declutter;
    };
    /**
     * @return {!Object<string, !Object<import("./BuilderType").default, import("./Builder.js").SerializableInstructions>>} The serializable instructions
     */
    BuilderGroup.prototype.finish = function () {
        var builderInstructions = {};
        for (var zKey in this.buildersByZIndex_) {
            builderInstructions[zKey] = builderInstructions[zKey] || {};
            var builders = this.buildersByZIndex_[zKey];
            for (var builderKey in builders) {
                var builderInstruction = builders[builderKey].finish();
                builderInstructions[zKey][builderKey] = builderInstruction;
            }
        }
        return builderInstructions;
    };
    /**
     * @param {number|undefined} zIndex Z index.
     * @param {import("./BuilderType.js").default} builderType Replay type.
     * @return {import("../VectorContext.js").default} Replay.
     */
    BuilderGroup.prototype.getBuilder = function (zIndex, builderType) {
        var zIndexKey = zIndex !== undefined ? zIndex.toString() : '0';
        var replays = this.buildersByZIndex_[zIndexKey];
        if (replays === undefined) {
            replays = {};
            this.buildersByZIndex_[zIndexKey] = replays;
        }
        var replay = replays[builderType];
        if (replay === undefined) {
            var Constructor = BATCH_CONSTRUCTORS[builderType];
            replay = new Constructor(this.tolerance_, this.maxExtent_, this.resolution_, this.pixelRatio_);
            replays[builderType] = replay;
        }
        return replay;
    };
    return BuilderGroup;
}());
export default BuilderGroup;
//# sourceMappingURL=BuilderGroup.js.map