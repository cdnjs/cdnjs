/**
 * @module ol/render/canvas/Executor
 */
import CanvasInstruction from './Instruction.js';
import RBush from 'rbush/rbush.js';
import { TEXT_ALIGN } from './TextBuilder.js';
import { WORKER_OFFSCREEN_CANVAS } from '../../has.js';
import { apply as applyTransform, compose as composeTransform, create as createTransform, setFromArray as transformSetFromArray, } from '../../transform.js';
import { createEmpty, createOrUpdate, getHeight, getWidth, intersects, } from '../../extent.js';
import { defaultPadding, defaultTextBaseline, drawImageOrLabel, } from '../canvas.js';
import { defaultTextAlign, measureAndCacheTextWidth, measureTextHeight, measureTextWidths, } from '../canvas.js';
import { drawTextOnPath } from '../../geom/flat/textpath.js';
import { equals } from '../../array.js';
import { lineStringLength } from '../../geom/flat/length.js';
import { transform2D } from '../../geom/flat/transform.js';
/**
 * @typedef {Object} SerializableInstructions
 * @property {Array<*>} instructions The rendering instructions.
 * @property {Array<*>} hitDetectionInstructions The rendering hit detection instructions.
 * @property {Array<number>} coordinates The array of all coordinates.
 * @property {!Object<string, import("../canvas.js").TextState>} textStates The text states (decluttering).
 * @property {!Object<string, import("../canvas.js").FillState>} fillStates The fill states (decluttering).
 * @property {!Object<string, import("../canvas.js").StrokeState>} strokeStates The stroke states (decluttering).
 */
/**
 * @type {import("../../extent.js").Extent}
 */
var tmpExtent = createEmpty();
/**
 * @type {!import("../../transform.js").Transform}
 */
var tmpTransform = createTransform();
/** @type {import("../../coordinate.js").Coordinate} */
var p1 = [];
/** @type {import("../../coordinate.js").Coordinate} */
var p2 = [];
/** @type {import("../../coordinate.js").Coordinate} */
var p3 = [];
/** @type {import("../../coordinate.js").Coordinate} */
var p4 = [];
var Executor = /** @class */ (function () {
    /**
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {boolean} overlaps The replay can have overlapping geometries.
     * @param {SerializableInstructions} instructions The serializable instructions
     * @param {import("../../size.js").Size} renderBuffer Render buffer (width/height) in pixels.
     */
    function Executor(resolution, pixelRatio, overlaps, instructions, renderBuffer) {
        /**
         * @protected
         * @type {boolean}
         */
        this.overlaps = overlaps;
        /**
         * @protected
         * @type {number}
         */
        this.pixelRatio = pixelRatio;
        /**
         * @protected
         * @const
         * @type {number}
         */
        this.resolution = resolution;
        /**
         * @private
         * @type {boolean}
         */
        this.alignFill_;
        /**
         * @type {Array<*>}
         */
        this.declutterItems = [];
        /**
         * @protected
         * @type {Array<*>}
         */
        this.instructions = instructions.instructions;
        /**
         * @protected
         * @type {Array<number>}
         */
        this.coordinates = instructions.coordinates;
        /**
         * @private
         * @type {!Object<number,import("../../coordinate.js").Coordinate|Array<import("../../coordinate.js").Coordinate>|Array<Array<import("../../coordinate.js").Coordinate>>>}
         */
        this.coordinateCache_ = {};
        /**
         * @private
         * @type {import("../../size.js").Size}
         */
        this.renderBuffer_ = renderBuffer;
        /**
         * @private
         * @type {!import("../../transform.js").Transform}
         */
        this.renderedTransform_ = createTransform();
        /**
         * @protected
         * @type {Array<*>}
         */
        this.hitDetectionInstructions = instructions.hitDetectionInstructions;
        /**
         * @private
         * @type {Array<number>}
         */
        this.pixelCoordinates_ = null;
        /**
         * @private
         * @type {number}
         */
        this.viewRotation_ = 0;
        /**
         * @type {!Object<string, import("../canvas.js").FillState>}
         */
        this.fillStates = instructions.fillStates || {};
        /**
         * @type {!Object<string, import("../canvas.js").StrokeState>}
         */
        this.strokeStates = instructions.strokeStates || {};
        /**
         * @type {!Object<string, import("../canvas.js").TextState>}
         */
        this.textStates = instructions.textStates || {};
        /**
         * @private
         * @type {Object<string, Object<string, number>>}
         */
        this.widths_ = {};
        /**
         * @private
         * @type {Object<string, import("../canvas.js").Label>}
         */
        this.labels_ = {};
    }
    /**
     * @param {string} text Text.
     * @param {string} textKey Text style key.
     * @param {string} fillKey Fill style key.
     * @param {string} strokeKey Stroke style key.
     * @return {import("../canvas.js").Label} Label.
     */
    Executor.prototype.createLabel = function (text, textKey, fillKey, strokeKey) {
        var key = text + textKey + fillKey + strokeKey;
        if (this.labels_[key]) {
            return this.labels_[key];
        }
        var strokeState = strokeKey ? this.strokeStates[strokeKey] : null;
        var fillState = fillKey ? this.fillStates[fillKey] : null;
        var textState = this.textStates[textKey];
        var pixelRatio = this.pixelRatio;
        var scale = [
            textState.scale[0] * pixelRatio,
            textState.scale[1] * pixelRatio,
        ];
        var align = TEXT_ALIGN[textState.textAlign || defaultTextAlign];
        var strokeWidth = strokeKey && strokeState.lineWidth ? strokeState.lineWidth : 0;
        var lines = text.split('\n');
        var numLines = lines.length;
        var widths = [];
        var width = measureTextWidths(textState.font, lines, widths);
        var lineHeight = measureTextHeight(textState.font);
        var height = lineHeight * numLines;
        var renderWidth = width + strokeWidth;
        var contextInstructions = [];
        // make canvas 2 pixels wider to account for italic text width measurement errors
        var w = (renderWidth + 2) * scale[0];
        var h = (height + strokeWidth) * scale[1];
        /** @type {import("../canvas.js").Label} */
        var label = {
            width: w < 0 ? Math.floor(w) : Math.ceil(w),
            height: h < 0 ? Math.floor(h) : Math.ceil(h),
            contextInstructions: contextInstructions,
        };
        if (scale[0] != 1 || scale[1] != 1) {
            contextInstructions.push('scale', scale);
        }
        contextInstructions.push('font', textState.font);
        if (strokeKey) {
            contextInstructions.push('strokeStyle', strokeState.strokeStyle);
            contextInstructions.push('lineWidth', strokeWidth);
            contextInstructions.push('lineCap', strokeState.lineCap);
            contextInstructions.push('lineJoin', strokeState.lineJoin);
            contextInstructions.push('miterLimit', strokeState.miterLimit);
            // eslint-disable-next-line
            var Context = WORKER_OFFSCREEN_CANVAS ? OffscreenCanvasRenderingContext2D : CanvasRenderingContext2D;
            if (Context.prototype.setLineDash) {
                contextInstructions.push('setLineDash', [strokeState.lineDash]);
                contextInstructions.push('lineDashOffset', strokeState.lineDashOffset);
            }
        }
        if (fillKey) {
            contextInstructions.push('fillStyle', fillState.fillStyle);
        }
        contextInstructions.push('textBaseline', 'middle');
        contextInstructions.push('textAlign', 'center');
        var leftRight = 0.5 - align;
        var x = align * renderWidth + leftRight * strokeWidth;
        var i;
        if (strokeKey) {
            for (i = 0; i < numLines; ++i) {
                contextInstructions.push('strokeText', [
                    lines[i],
                    x + leftRight * widths[i],
                    0.5 * (strokeWidth + lineHeight) + i * lineHeight,
                ]);
            }
        }
        if (fillKey) {
            for (i = 0; i < numLines; ++i) {
                contextInstructions.push('fillText', [
                    lines[i],
                    x + leftRight * widths[i],
                    0.5 * (strokeWidth + lineHeight) + i * lineHeight,
                ]);
            }
        }
        this.labels_[key] = label;
        return label;
    };
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {import("../../coordinate.js").Coordinate} p1 1st point of the background box.
     * @param {import("../../coordinate.js").Coordinate} p2 2nd point of the background box.
     * @param {import("../../coordinate.js").Coordinate} p3 3rd point of the background box.
     * @param {import("../../coordinate.js").Coordinate} p4 4th point of the background box.
     * @param {Array<*>} fillInstruction Fill instruction.
     * @param {Array<*>} strokeInstruction Stroke instruction.
     * @param {boolean} declutter Declutter.
     */
    Executor.prototype.replayTextBackground_ = function (context, p1, p2, p3, p4, fillInstruction, strokeInstruction, declutter) {
        context.beginPath();
        context.moveTo.apply(context, p1);
        context.lineTo.apply(context, p2);
        context.lineTo.apply(context, p3);
        context.lineTo.apply(context, p4);
        context.lineTo.apply(context, p1);
        if (fillInstruction) {
            this.alignFill_ = /** @type {boolean} */ (fillInstruction[2]);
            if (declutter) {
                context.fillStyle = /** @type {import("../../colorlike.js").ColorLike} */ (fillInstruction[1]);
            }
            this.fill_(context);
        }
        if (strokeInstruction) {
            this.setStrokeStyle_(context, 
            /** @type {Array<*>} */ (strokeInstruction));
            context.stroke();
        }
    };
    /**
     * @private
     * @param {CanvasRenderingContext2D} context Context.
     * @param {number} contextScale Scale of the context.
     * @param {number} x X.
     * @param {number} y Y.
     * @param {import("../canvas.js").Label|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} imageOrLabel Image.
     * @param {number} anchorX Anchor X.
     * @param {number} anchorY Anchor Y.
     * @param {import("../canvas.js").DeclutterGroup} declutterGroup Declutter group.
     * @param {number} height Height.
     * @param {number} opacity Opacity.
     * @param {number} originX Origin X.
     * @param {number} originY Origin Y.
     * @param {number} rotation Rotation.
     * @param {import("../../size.js").Size} scale Scale.
     * @param {boolean} snapToPixel Snap to pixel.
     * @param {number} width Width.
     * @param {Array<number>} padding Padding.
     * @param {Array<*>} fillInstruction Fill instruction.
     * @param {Array<*>} strokeInstruction Stroke instruction.
     * @return {boolean} The image or label was rendered.
     */
    Executor.prototype.replayImageOrLabel_ = function (context, contextScale, x, y, imageOrLabel, anchorX, anchorY, declutterGroup, height, opacity, originX, originY, rotation, scale, snapToPixel, width, padding, fillInstruction, strokeInstruction) {
        var fillStroke = fillInstruction || strokeInstruction;
        anchorX *= scale[0];
        anchorY *= scale[1];
        x -= anchorX;
        y -= anchorY;
        var w = width + originX > imageOrLabel.width
            ? imageOrLabel.width - originX
            : width;
        var h = height + originY > imageOrLabel.height
            ? imageOrLabel.height - originY
            : height;
        var boxW = padding[3] + w * scale[0] + padding[1];
        var boxH = padding[0] + h * scale[1] + padding[2];
        var boxX = x - padding[3];
        var boxY = y - padding[0];
        if (fillStroke || rotation !== 0) {
            p1[0] = boxX;
            p4[0] = boxX;
            p1[1] = boxY;
            p2[1] = boxY;
            p2[0] = boxX + boxW;
            p3[0] = p2[0];
            p3[1] = boxY + boxH;
            p4[1] = p3[1];
        }
        var transform = null;
        if (rotation !== 0) {
            var centerX = x + anchorX;
            var centerY = y + anchorY;
            transform = composeTransform(tmpTransform, centerX, centerY, 1, 1, rotation, -centerX, -centerY);
            applyTransform(tmpTransform, p1);
            applyTransform(tmpTransform, p2);
            applyTransform(tmpTransform, p3);
            applyTransform(tmpTransform, p4);
            createOrUpdate(Math.min(p1[0], p2[0], p3[0], p4[0]), Math.min(p1[1], p2[1], p3[1], p4[1]), Math.max(p1[0], p2[0], p3[0], p4[0]), Math.max(p1[1], p2[1], p3[1], p4[1]), tmpExtent);
        }
        else {
            createOrUpdate(boxX, boxY, boxX + boxW, boxY + boxH, tmpExtent);
        }
        var renderBufferX = 0;
        var renderBufferY = 0;
        if (declutterGroup) {
            var renderBuffer = this.renderBuffer_;
            renderBuffer[0] = Math.max(renderBuffer[0], getWidth(tmpExtent));
            renderBufferX = renderBuffer[0];
            renderBuffer[1] = Math.max(renderBuffer[1], getHeight(tmpExtent));
            renderBufferY = renderBuffer[1];
        }
        var canvas = context.canvas;
        var strokePadding = strokeInstruction
            ? (strokeInstruction[2] * scale[0]) / 2
            : 0;
        var intersects = tmpExtent[0] - strokePadding <=
            (canvas.width + renderBufferX) / contextScale &&
            tmpExtent[2] + strokePadding >= -renderBufferX / contextScale &&
            tmpExtent[1] - strokePadding <=
                (canvas.height + renderBufferY) / contextScale &&
            tmpExtent[3] + strokePadding >= -renderBufferY / contextScale;
        if (snapToPixel) {
            x = Math.round(x);
            y = Math.round(y);
        }
        if (declutterGroup) {
            if (!intersects && declutterGroup[0] == 1) {
                return false;
            }
            var declutterArgs = intersects
                ? [
                    context,
                    transform ? transform.slice(0) : null,
                    opacity,
                    imageOrLabel,
                    originX,
                    originY,
                    w,
                    h,
                    x,
                    y,
                    scale,
                    tmpExtent.slice(),
                ]
                : null;
            if (declutterArgs) {
                if (fillStroke) {
                    declutterArgs.push(fillInstruction, strokeInstruction, p1.slice(0), p2.slice(0), p3.slice(0), p4.slice(0));
                }
                declutterGroup.push(declutterArgs);
            }
        }
        else if (intersects) {
            if (fillStroke) {
                this.replayTextBackground_(context, p1, p2, p3, p4, 
                /** @type {Array<*>} */ (fillInstruction), 
                /** @type {Array<*>} */ (strokeInstruction), false);
            }
            drawImageOrLabel(context, transform, opacity, imageOrLabel, originX, originY, w, h, x, y, scale);
        }
        return true;
    };
    /**
     * @private
     * @param {CanvasRenderingContext2D} context Context.
     */
    Executor.prototype.fill_ = function (context) {
        if (this.alignFill_) {
            var origin_1 = applyTransform(this.renderedTransform_, [0, 0]);
            var repeatSize = 512 * this.pixelRatio;
            context.save();
            context.translate(origin_1[0] % repeatSize, origin_1[1] % repeatSize);
            context.rotate(this.viewRotation_);
        }
        context.fill();
        if (this.alignFill_) {
            context.restore();
        }
    };
    /**
     * @private
     * @param {CanvasRenderingContext2D} context Context.
     * @param {Array<*>} instruction Instruction.
     */
    Executor.prototype.setStrokeStyle_ = function (context, instruction) {
        context.strokeStyle = /** @type {import("../../colorlike.js").ColorLike} */ (instruction[1]);
        context.lineWidth = /** @type {number} */ (instruction[2]);
        context.lineCap = /** @type {CanvasLineCap} */ (instruction[3]);
        context.lineJoin = /** @type {CanvasLineJoin} */ (instruction[4]);
        context.miterLimit = /** @type {number} */ (instruction[5]);
        if (context.setLineDash) {
            context.lineDashOffset = /** @type {number} */ (instruction[7]);
            context.setLineDash(/** @type {Array<number>} */ (instruction[6]));
        }
    };
    /**
     * @param {import("../canvas.js").DeclutterGroup} declutterGroup Declutter group.
     * @param {import("../../Feature.js").FeatureLike} feature Feature.
     * @param {number} opacity Layer opacity.
     * @param {?} declutterTree Declutter tree.
     * @return {?} Declutter tree.
     */
    Executor.prototype.renderDeclutter = function (declutterGroup, feature, opacity, declutterTree) {
        /** @type {Array<import("../../structs/RBush.js").Entry>} */
        var boxes = [];
        for (var i = 1, ii = declutterGroup.length; i < ii; ++i) {
            var declutterData = declutterGroup[i];
            var box = declutterData[11];
            boxes.push({
                minX: box[0],
                minY: box[1],
                maxX: box[2],
                maxY: box[3],
                value: feature,
            });
        }
        if (!declutterTree) {
            declutterTree = new RBush(9);
        }
        var collides = false;
        for (var i = 0, ii = boxes.length; i < ii; ++i) {
            if (declutterTree.collides(boxes[i])) {
                collides = true;
                break;
            }
        }
        if (!collides) {
            declutterTree.load(boxes);
            for (var j = 1, jj = declutterGroup.length; j < jj; ++j) {
                var declutterData = /** @type {Array} */ (declutterGroup[j]);
                var context = declutterData[0];
                var currentAlpha = context.globalAlpha;
                if (currentAlpha !== opacity) {
                    context.globalAlpha = opacity;
                }
                if (declutterData.length > 12) {
                    this.replayTextBackground_(declutterData[0], declutterData[14], declutterData[15], declutterData[16], declutterData[17], declutterData[12], declutterData[13], true);
                }
                drawImageOrLabel.apply(undefined, declutterData);
                if (currentAlpha !== opacity) {
                    context.globalAlpha = currentAlpha;
                }
            }
        }
        declutterGroup.length = 1;
        return declutterTree;
    };
    /**
     * @private
     * @param {string} text The text to draw.
     * @param {string} textKey The key of the text state.
     * @param {string} strokeKey The key for the stroke state.
     * @param {string} fillKey The key for the fill state.
     * @return {{label: import("../canvas.js").Label, anchorX: number, anchorY: number}} The text image and its anchor.
     */
    Executor.prototype.drawLabelWithPointPlacement_ = function (text, textKey, strokeKey, fillKey) {
        var textState = this.textStates[textKey];
        var label = this.createLabel(text, textKey, fillKey, strokeKey);
        var strokeState = this.strokeStates[strokeKey];
        var pixelRatio = this.pixelRatio;
        var align = TEXT_ALIGN[textState.textAlign || defaultTextAlign];
        var baseline = TEXT_ALIGN[textState.textBaseline || defaultTextBaseline];
        var strokeWidth = strokeState && strokeState.lineWidth ? strokeState.lineWidth : 0;
        // Remove the 2 pixels we added in createLabel() for the anchor
        var width = label.width / pixelRatio - 2 * textState.scale[0];
        var anchorX = align * width + 2 * (0.5 - align) * strokeWidth;
        var anchorY = (baseline * label.height) / pixelRatio +
            2 * (0.5 - baseline) * strokeWidth;
        return {
            label: label,
            anchorX: anchorX,
            anchorY: anchorY,
        };
    };
    /**
     * @private
     * @param {CanvasRenderingContext2D} context Context.
     * @param {number} contextScale Scale of the context.
     * @param {import("../../transform.js").Transform} transform Transform.
     * @param {Array<*>} instructions Instructions array.
     * @param {boolean} snapToPixel Snap point symbols and text to integer pixels.
     * @param {function(import("../../Feature.js").FeatureLike): T|undefined} featureCallback Feature callback.
     * @param {import("../../extent.js").Extent=} opt_hitExtent Only check features that intersect this
     *     extent.
     * @return {T|undefined} Callback result.
     * @template T
     */
    Executor.prototype.execute_ = function (context, contextScale, transform, instructions, snapToPixel, featureCallback, opt_hitExtent) {
        this.declutterItems.length = 0;
        /** @type {Array<number>} */
        var pixelCoordinates;
        if (this.pixelCoordinates_ && equals(transform, this.renderedTransform_)) {
            pixelCoordinates = this.pixelCoordinates_;
        }
        else {
            if (!this.pixelCoordinates_) {
                this.pixelCoordinates_ = [];
            }
            pixelCoordinates = transform2D(this.coordinates, 0, this.coordinates.length, 2, transform, this.pixelCoordinates_);
            transformSetFromArray(this.renderedTransform_, transform);
        }
        var i = 0; // instruction index
        var ii = instructions.length; // end of instructions
        var d = 0; // data index
        var dd; // end of per-instruction data
        var anchorX, anchorY, prevX, prevY, roundX, roundY, declutterGroup, declutterGroups, image, text, textKey;
        var strokeKey, fillKey;
        var pendingFill = 0;
        var pendingStroke = 0;
        var lastFillInstruction = null;
        var lastStrokeInstruction = null;
        var coordinateCache = this.coordinateCache_;
        var viewRotation = this.viewRotation_;
        var viewRotationFromTransform = Math.round(Math.atan2(-transform[1], transform[0]) * 1e12) / 1e12;
        var state = /** @type {import("../../render.js").State} */ ({
            context: context,
            pixelRatio: this.pixelRatio,
            resolution: this.resolution,
            rotation: viewRotation,
        });
        // When the batch size gets too big, performance decreases. 200 is a good
        // balance between batch size and number of fill/stroke instructions.
        var batchSize = this.instructions != instructions || this.overlaps ? 0 : 200;
        var /** @type {import("../../Feature.js").FeatureLike} */ feature;
        var x, y;
        while (i < ii) {
            var instruction = instructions[i];
            var type = /** @type {import("./Instruction.js").default} */ (instruction[0]);
            switch (type) {
                case CanvasInstruction.BEGIN_GEOMETRY:
                    feature = /** @type {import("../../Feature.js").FeatureLike} */ (instruction[1]);
                    if (!feature.getGeometry()) {
                        i = /** @type {number} */ (instruction[2]);
                    }
                    else if (opt_hitExtent !== undefined &&
                        !intersects(opt_hitExtent, instruction[3])) {
                        i = /** @type {number} */ (instruction[2]) + 1;
                    }
                    else {
                        ++i;
                    }
                    break;
                case CanvasInstruction.BEGIN_PATH:
                    if (pendingFill > batchSize) {
                        this.fill_(context);
                        pendingFill = 0;
                    }
                    if (pendingStroke > batchSize) {
                        context.stroke();
                        pendingStroke = 0;
                    }
                    if (!pendingFill && !pendingStroke) {
                        context.beginPath();
                        prevX = NaN;
                        prevY = NaN;
                    }
                    ++i;
                    break;
                case CanvasInstruction.CIRCLE:
                    d = /** @type {number} */ (instruction[1]);
                    var x1 = pixelCoordinates[d];
                    var y1 = pixelCoordinates[d + 1];
                    var x2 = pixelCoordinates[d + 2];
                    var y2 = pixelCoordinates[d + 3];
                    var dx = x2 - x1;
                    var dy = y2 - y1;
                    var r = Math.sqrt(dx * dx + dy * dy);
                    context.moveTo(x1 + r, y1);
                    context.arc(x1, y1, r, 0, 2 * Math.PI, true);
                    ++i;
                    break;
                case CanvasInstruction.CLOSE_PATH:
                    context.closePath();
                    ++i;
                    break;
                case CanvasInstruction.CUSTOM:
                    d = /** @type {number} */ (instruction[1]);
                    dd = instruction[2];
                    var geometry = /** @type {import("../../geom/SimpleGeometry.js").default} */ (instruction[3]);
                    var renderer = instruction[4];
                    var fn = instruction.length == 6 ? instruction[5] : undefined;
                    state.geometry = geometry;
                    state.feature = feature;
                    if (!(i in coordinateCache)) {
                        coordinateCache[i] = [];
                    }
                    var coords = coordinateCache[i];
                    if (fn) {
                        fn(pixelCoordinates, d, dd, 2, coords);
                    }
                    else {
                        coords[0] = pixelCoordinates[d];
                        coords[1] = pixelCoordinates[d + 1];
                        coords.length = 2;
                    }
                    renderer(coords, state);
                    ++i;
                    break;
                case CanvasInstruction.DRAW_IMAGE:
                    d = /** @type {number} */ (instruction[1]);
                    dd = /** @type {number} */ (instruction[2]);
                    image = /** @type {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement} */ (instruction[3]);
                    // Remaining arguments in DRAW_IMAGE are in alphabetical order
                    anchorX = /** @type {number} */ (instruction[4]);
                    anchorY = /** @type {number} */ (instruction[5]);
                    declutterGroups = featureCallback ? null : instruction[6];
                    var height = /** @type {number} */ (instruction[7]);
                    var opacity = /** @type {number} */ (instruction[8]);
                    var originX = /** @type {number} */ (instruction[9]);
                    var originY = /** @type {number} */ (instruction[10]);
                    var rotateWithView = /** @type {boolean} */ (instruction[11]);
                    var rotation = /** @type {number} */ (instruction[12]);
                    var scale = /** @type {import("../../size.js").Size} */ (instruction[13]);
                    var width = /** @type {number} */ (instruction[14]);
                    if (!image && instruction.length >= 19) {
                        // create label images
                        text = /** @type {string} */ (instruction[18]);
                        textKey = /** @type {string} */ (instruction[19]);
                        strokeKey = /** @type {string} */ (instruction[20]);
                        fillKey = /** @type {string} */ (instruction[21]);
                        var labelWithAnchor = this.drawLabelWithPointPlacement_(text, textKey, strokeKey, fillKey);
                        image = labelWithAnchor.label;
                        instruction[3] = image;
                        var textOffsetX = /** @type {number} */ (instruction[22]);
                        anchorX = (labelWithAnchor.anchorX - textOffsetX) * this.pixelRatio;
                        instruction[4] = anchorX;
                        var textOffsetY = /** @type {number} */ (instruction[23]);
                        anchorY = (labelWithAnchor.anchorY - textOffsetY) * this.pixelRatio;
                        instruction[5] = anchorY;
                        height = image.height;
                        instruction[7] = height;
                        width = image.width;
                        instruction[14] = width;
                    }
                    var geometryWidths = void 0;
                    if (instruction.length > 24) {
                        geometryWidths = /** @type {number} */ (instruction[24]);
                    }
                    var padding = void 0, backgroundFill = void 0, backgroundStroke = void 0;
                    if (instruction.length > 16) {
                        padding = /** @type {Array<number>} */ (instruction[15]);
                        backgroundFill = /** @type {boolean} */ (instruction[16]);
                        backgroundStroke = /** @type {boolean} */ (instruction[17]);
                    }
                    else {
                        padding = defaultPadding;
                        backgroundFill = false;
                        backgroundStroke = false;
                    }
                    if (rotateWithView && viewRotationFromTransform) {
                        // Canvas is expected to be rotated to reverse view rotation.
                        rotation += viewRotation;
                    }
                    else if (!rotateWithView && !viewRotationFromTransform) {
                        // Canvas is not rotated, images need to be rotated back to be north-up.
                        rotation -= viewRotation;
                    }
                    var widthIndex = 0;
                    var declutterGroupIndex = 0;
                    for (; d < dd; d += 2) {
                        if (geometryWidths &&
                            geometryWidths[widthIndex++] < width / this.pixelRatio) {
                            continue;
                        }
                        if (declutterGroups) {
                            var index = Math.floor(declutterGroupIndex);
                            declutterGroup =
                                declutterGroups.length < index + 1
                                    ? [declutterGroups[0][0]]
                                    : declutterGroups[index];
                        }
                        var rendered = this.replayImageOrLabel_(context, contextScale, pixelCoordinates[d], pixelCoordinates[d + 1], image, anchorX, anchorY, declutterGroup, height, opacity, originX, originY, rotation, scale, snapToPixel, width, padding, backgroundFill
                            ? /** @type {Array<*>} */ (lastFillInstruction)
                            : null, backgroundStroke
                            ? /** @type {Array<*>} */ (lastStrokeInstruction)
                            : null);
                        if (rendered &&
                            declutterGroup &&
                            declutterGroups[declutterGroups.length - 1] !== declutterGroup) {
                            declutterGroups.push(declutterGroup);
                        }
                        if (declutterGroup) {
                            if (declutterGroup.length - 1 === declutterGroup[0]) {
                                this.declutterItems.push(this, declutterGroup, feature);
                            }
                            declutterGroupIndex += 1 / declutterGroup[0];
                        }
                    }
                    ++i;
                    break;
                case CanvasInstruction.DRAW_CHARS:
                    var begin = /** @type {number} */ (instruction[1]);
                    var end = /** @type {number} */ (instruction[2]);
                    var baseline = /** @type {number} */ (instruction[3]);
                    declutterGroup = featureCallback ? null : instruction[4];
                    var overflow = /** @type {number} */ (instruction[5]);
                    fillKey = /** @type {string} */ (instruction[6]);
                    var maxAngle = /** @type {number} */ (instruction[7]);
                    var measurePixelRatio = /** @type {number} */ (instruction[8]);
                    var offsetY = /** @type {number} */ (instruction[9]);
                    strokeKey = /** @type {string} */ (instruction[10]);
                    var strokeWidth = /** @type {number} */ (instruction[11]);
                    text = /** @type {string} */ (instruction[12]);
                    textKey = /** @type {string} */ (instruction[13]);
                    var pixelRatioScale = [
                        /** @type {number} */ (instruction[14]),
                        /** @type {number} */ (instruction[14]),
                    ];
                    var textState = this.textStates[textKey];
                    var font = textState.font;
                    var textScale = [
                        textState.scale[0] * measurePixelRatio,
                        textState.scale[1] * measurePixelRatio,
                    ];
                    var cachedWidths = void 0;
                    if (font in this.widths_) {
                        cachedWidths = this.widths_[font];
                    }
                    else {
                        cachedWidths = {};
                        this.widths_[font] = cachedWidths;
                    }
                    var pathLength = lineStringLength(pixelCoordinates, begin, end, 2);
                    var textLength = Math.abs(textScale[0]) *
                        measureAndCacheTextWidth(font, text, cachedWidths);
                    if (overflow || textLength <= pathLength) {
                        var textAlign = this.textStates[textKey].textAlign;
                        var startM = (pathLength - textLength) * TEXT_ALIGN[textAlign];
                        var parts = drawTextOnPath(pixelCoordinates, begin, end, 2, text, startM, maxAngle, Math.abs(textScale[0]), measureAndCacheTextWidth, font, cachedWidths, viewRotationFromTransform ? 0 : this.viewRotation_);
                        if (parts) {
                            var rendered = false;
                            var c = void 0, cc = void 0, chars = void 0, label = void 0, part = void 0;
                            if (strokeKey) {
                                for (c = 0, cc = parts.length; c < cc; ++c) {
                                    part = parts[c]; // x, y, anchorX, rotation, chunk
                                    chars = /** @type {string} */ (part[4]);
                                    label = this.createLabel(chars, textKey, '', strokeKey);
                                    anchorX = /** @type {number} */ (part[2]) + strokeWidth;
                                    anchorY =
                                        baseline * label.height +
                                            ((0.5 - baseline) * 2 * strokeWidth * textScale[1]) /
                                                textScale[0] -
                                            offsetY;
                                    rendered =
                                        this.replayImageOrLabel_(context, contextScale, 
                                        /** @type {number} */ (part[0]), 
                                        /** @type {number} */ (part[1]), label, anchorX, anchorY, declutterGroup, label.height, 1, 0, 0, 
                                        /** @type {number} */ (part[3]), pixelRatioScale, false, label.width, defaultPadding, null, null) || rendered;
                                }
                            }
                            if (fillKey) {
                                for (c = 0, cc = parts.length; c < cc; ++c) {
                                    part = parts[c]; // x, y, anchorX, rotation, chunk
                                    chars = /** @type {string} */ (part[4]);
                                    label = this.createLabel(chars, textKey, fillKey, '');
                                    anchorX = /** @type {number} */ (part[2]);
                                    anchorY = baseline * label.height - offsetY;
                                    rendered =
                                        this.replayImageOrLabel_(context, contextScale, 
                                        /** @type {number} */ (part[0]), 
                                        /** @type {number} */ (part[1]), label, anchorX, anchorY, declutterGroup, label.height, 1, 0, 0, 
                                        /** @type {number} */ (part[3]), pixelRatioScale, false, label.width, defaultPadding, null, null) || rendered;
                                }
                            }
                            if (rendered) {
                                this.declutterItems.push(this, declutterGroup, feature);
                            }
                        }
                    }
                    ++i;
                    break;
                case CanvasInstruction.END_GEOMETRY:
                    if (featureCallback !== undefined) {
                        feature = /** @type {import("../../Feature.js").FeatureLike} */ (instruction[1]);
                        var result = featureCallback(feature);
                        if (result) {
                            return result;
                        }
                    }
                    ++i;
                    break;
                case CanvasInstruction.FILL:
                    if (batchSize) {
                        pendingFill++;
                    }
                    else {
                        this.fill_(context);
                    }
                    ++i;
                    break;
                case CanvasInstruction.MOVE_TO_LINE_TO:
                    d = /** @type {number} */ (instruction[1]);
                    dd = /** @type {number} */ (instruction[2]);
                    x = pixelCoordinates[d];
                    y = pixelCoordinates[d + 1];
                    roundX = (x + 0.5) | 0;
                    roundY = (y + 0.5) | 0;
                    if (roundX !== prevX || roundY !== prevY) {
                        context.moveTo(x, y);
                        prevX = roundX;
                        prevY = roundY;
                    }
                    for (d += 2; d < dd; d += 2) {
                        x = pixelCoordinates[d];
                        y = pixelCoordinates[d + 1];
                        roundX = (x + 0.5) | 0;
                        roundY = (y + 0.5) | 0;
                        if (d == dd - 2 || roundX !== prevX || roundY !== prevY) {
                            context.lineTo(x, y);
                            prevX = roundX;
                            prevY = roundY;
                        }
                    }
                    ++i;
                    break;
                case CanvasInstruction.SET_FILL_STYLE:
                    lastFillInstruction = instruction;
                    this.alignFill_ = instruction[2];
                    if (pendingFill) {
                        this.fill_(context);
                        pendingFill = 0;
                        if (pendingStroke) {
                            context.stroke();
                            pendingStroke = 0;
                        }
                    }
                    context.fillStyle = /** @type {import("../../colorlike.js").ColorLike} */ (instruction[1]);
                    ++i;
                    break;
                case CanvasInstruction.SET_STROKE_STYLE:
                    lastStrokeInstruction = instruction;
                    if (pendingStroke) {
                        context.stroke();
                        pendingStroke = 0;
                    }
                    this.setStrokeStyle_(context, /** @type {Array<*>} */ (instruction));
                    ++i;
                    break;
                case CanvasInstruction.STROKE:
                    if (batchSize) {
                        pendingStroke++;
                    }
                    else {
                        context.stroke();
                    }
                    ++i;
                    break;
                default:
                    ++i; // consume the instruction anyway, to avoid an infinite loop
                    break;
            }
        }
        if (pendingFill) {
            this.fill_(context);
        }
        if (pendingStroke) {
            context.stroke();
        }
        return undefined;
    };
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {number} contextScale Scale of the context.
     * @param {import("../../transform.js").Transform} transform Transform.
     * @param {number} viewRotation View rotation.
     * @param {boolean} snapToPixel Snap point symbols and text to integer pixels.
     */
    Executor.prototype.execute = function (context, contextScale, transform, viewRotation, snapToPixel) {
        this.viewRotation_ = viewRotation;
        this.execute_(context, contextScale, transform, this.instructions, snapToPixel, undefined, undefined);
    };
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {import("../../transform.js").Transform} transform Transform.
     * @param {number} viewRotation View rotation.
     * @param {function(import("../../Feature.js").FeatureLike): T=} opt_featureCallback
     *     Feature callback.
     * @param {import("../../extent.js").Extent=} opt_hitExtent Only check features that intersect this
     *     extent.
     * @return {T|undefined} Callback result.
     * @template T
     */
    Executor.prototype.executeHitDetection = function (context, transform, viewRotation, opt_featureCallback, opt_hitExtent) {
        this.viewRotation_ = viewRotation;
        return this.execute_(context, 1, transform, this.hitDetectionInstructions, true, opt_featureCallback, opt_hitExtent);
    };
    return Executor;
}());
export default Executor;
//# sourceMappingURL=Executor.js.map