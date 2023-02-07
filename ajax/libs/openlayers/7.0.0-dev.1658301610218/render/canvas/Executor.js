/**
 * @module ol/render/canvas/Executor
 */
import CanvasInstruction from './Instruction.js';
import { TEXT_ALIGN } from './TextBuilder.js';
import { WORKER_OFFSCREEN_CANVAS } from '../../has.js';
import { apply as applyTransform, compose as composeTransform, create as createTransform, setFromArray as transformSetFromArray, } from '../../transform.js';
import { createEmpty, createOrUpdate, intersects } from '../../extent.js';
import { defaultPadding, defaultTextAlign, defaultTextBaseline, drawImageOrLabel, getTextDimensions, measureAndCacheTextWidth, } from '../canvas.js';
import { drawTextOnPath } from '../../geom/flat/textpath.js';
import { equals } from '../../array.js';
import { lineStringLength } from '../../geom/flat/length.js';
import { transform2D } from '../../geom/flat/transform.js';
/**
 * @typedef {Object} BBox
 * @property {number} minX Minimal x.
 * @property {number} minY Minimal y.
 * @property {number} maxX Maximal x.
 * @property {number} maxY Maximal y
 * @property {*} value Value.
 */
/**
 * @typedef {Object} ImageOrLabelDimensions
 * @property {number} drawImageX DrawImageX.
 * @property {number} drawImageY DrawImageY.
 * @property {number} drawImageW DrawImageW.
 * @property {number} drawImageH DrawImageH.
 * @property {number} originX OriginX.
 * @property {number} originY OriginY.
 * @property {Array<number>} scale Scale.
 * @property {BBox} declutterBox DeclutterBox.
 * @property {import("../../transform.js").Transform} canvasTransform CanvasTransform.
 */
/**
 * @typedef {{0: CanvasRenderingContext2D, 1: number, 2: import("../canvas.js").Label|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement, 3: ImageOrLabelDimensions, 4: number, 5: Array<*>, 6: Array<*>}} ReplayImageOrLabelArgs
 */
/**
 * @template T
 * @typedef {function(import("../../Feature.js").FeatureLike, import("../../geom/SimpleGeometry.js").default): T} FeatureCallback
 */
/**
 * @type {import("../../extent.js").Extent}
 */
var tmpExtent = createEmpty();
/** @type {import("../../coordinate.js").Coordinate} */
var p1 = [];
/** @type {import("../../coordinate.js").Coordinate} */
var p2 = [];
/** @type {import("../../coordinate.js").Coordinate} */
var p3 = [];
/** @type {import("../../coordinate.js").Coordinate} */
var p4 = [];
/**
 * @param {ReplayImageOrLabelArgs} replayImageOrLabelArgs Arguments to replayImageOrLabel
 * @return {BBox} Declutter bbox.
 */
function getDeclutterBox(replayImageOrLabelArgs) {
    return replayImageOrLabelArgs[3].declutterBox;
}
var rtlRegEx = new RegExp(
/* eslint-disable prettier/prettier */
'[' +
    String.fromCharCode(0x00591) + '-' + String.fromCharCode(0x008ff) +
    String.fromCharCode(0x0fb1d) + '-' + String.fromCharCode(0x0fdff) +
    String.fromCharCode(0x0fe70) + '-' + String.fromCharCode(0x0fefc) +
    String.fromCharCode(0x10800) + '-' + String.fromCharCode(0x10fff) +
    String.fromCharCode(0x1e800) + '-' + String.fromCharCode(0x1efff) +
    ']'
/* eslint-enable prettier/prettier */
);
/**
 * @param {string} text Text.
 * @param {string} align Alignment.
 * @return {number} Text alignment.
 */
function horizontalTextAlign(text, align) {
    if ((align === 'start' || align === 'end') && !rtlRegEx.test(text)) {
        align = align === 'start' ? 'left' : 'right';
    }
    return TEXT_ALIGN[align];
}
/**
 * @param {Array<string>} acc Accumulator.
 * @param {string} line Line of text.
 * @param {number} i Index
 * @return {Array<string>} Accumulator.
 */
function createTextChunks(acc, line, i) {
    if (i > 0) {
        acc.push('\n', '');
    }
    acc.push(line, '');
    return acc;
}
var Executor = /** @class */ (function () {
    /**
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {boolean} overlaps The replay can have overlapping geometries.
     * @param {import("../canvas.js").SerializableInstructions} instructions The serializable instructions
     */
    function Executor(resolution, pixelRatio, overlaps, instructions) {
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
     * @param {string|Array<string>} text Text.
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
        var textIsArray = Array.isArray(text);
        var align = textState.justify
            ? TEXT_ALIGN[textState.justify]
            : horizontalTextAlign(Array.isArray(text) ? text[0] : text, textState.textAlign || defaultTextAlign);
        var strokeWidth = strokeKey && strokeState.lineWidth ? strokeState.lineWidth : 0;
        var chunks = textIsArray
            ? text
            : text.split('\n').reduce(createTextChunks, []);
        var _a = getTextDimensions(textState, chunks), width = _a.width, height = _a.height, widths = _a.widths, heights = _a.heights, lineWidths = _a.lineWidths;
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
        var strokeInstructions = [];
        var fillInstructions = [];
        var lineHeight = 0;
        var lineOffset = 0;
        var widthHeightIndex = 0;
        var lineWidthIndex = 0;
        var previousFont;
        for (var i = 0, ii = chunks.length; i < ii; i += 2) {
            var text_1 = chunks[i];
            if (text_1 === '\n') {
                lineOffset += lineHeight;
                lineHeight = 0;
                x = align * renderWidth + leftRight * strokeWidth;
                ++lineWidthIndex;
                continue;
            }
            var font = chunks[i + 1] || textState.font;
            if (font !== previousFont) {
                if (strokeKey) {
                    strokeInstructions.push('font', font);
                }
                if (fillKey) {
                    fillInstructions.push('font', font);
                }
                previousFont = font;
            }
            lineHeight = Math.max(lineHeight, heights[widthHeightIndex]);
            var fillStrokeArgs = [
                text_1,
                x +
                    leftRight * widths[widthHeightIndex] +
                    align * (widths[widthHeightIndex] - lineWidths[lineWidthIndex]),
                0.5 * (strokeWidth + lineHeight) + lineOffset,
            ];
            x += widths[widthHeightIndex];
            if (strokeKey) {
                strokeInstructions.push('strokeText', fillStrokeArgs);
            }
            if (fillKey) {
                fillInstructions.push('fillText', fillStrokeArgs);
            }
            ++widthHeightIndex;
        }
        Array.prototype.push.apply(contextInstructions, strokeInstructions);
        Array.prototype.push.apply(contextInstructions, fillInstructions);
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
     */
    Executor.prototype.replayTextBackground_ = function (context, p1, p2, p3, p4, fillInstruction, strokeInstruction) {
        context.beginPath();
        context.moveTo.apply(context, p1);
        context.lineTo.apply(context, p2);
        context.lineTo.apply(context, p3);
        context.lineTo.apply(context, p4);
        context.lineTo.apply(context, p1);
        if (fillInstruction) {
            this.alignFill_ = /** @type {boolean} */ (fillInstruction[2]);
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
     * @param {number} sheetWidth Width of the sprite sheet.
     * @param {number} sheetHeight Height of the sprite sheet.
     * @param {number} centerX X.
     * @param {number} centerY Y.
     * @param {number} width Width.
     * @param {number} height Height.
     * @param {number} anchorX Anchor X.
     * @param {number} anchorY Anchor Y.
     * @param {number} originX Origin X.
     * @param {number} originY Origin Y.
     * @param {number} rotation Rotation.
     * @param {import("../../size.js").Size} scale Scale.
     * @param {boolean} snapToPixel Snap to pixel.
     * @param {Array<number>} padding Padding.
     * @param {boolean} fillStroke Background fill or stroke.
     * @param {import("../../Feature.js").FeatureLike} feature Feature.
     * @return {ImageOrLabelDimensions} Dimensions for positioning and decluttering the image or label.
     */
    Executor.prototype.calculateImageOrLabelDimensions_ = function (sheetWidth, sheetHeight, centerX, centerY, width, height, anchorX, anchorY, originX, originY, rotation, scale, snapToPixel, padding, fillStroke, feature) {
        anchorX *= scale[0];
        anchorY *= scale[1];
        var x = centerX - anchorX;
        var y = centerY - anchorY;
        var w = width + originX > sheetWidth ? sheetWidth - originX : width;
        var h = height + originY > sheetHeight ? sheetHeight - originY : height;
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
        var transform;
        if (rotation !== 0) {
            transform = composeTransform(createTransform(), centerX, centerY, 1, 1, rotation, -centerX, -centerY);
            applyTransform(transform, p1);
            applyTransform(transform, p2);
            applyTransform(transform, p3);
            applyTransform(transform, p4);
            createOrUpdate(Math.min(p1[0], p2[0], p3[0], p4[0]), Math.min(p1[1], p2[1], p3[1], p4[1]), Math.max(p1[0], p2[0], p3[0], p4[0]), Math.max(p1[1], p2[1], p3[1], p4[1]), tmpExtent);
        }
        else {
            createOrUpdate(Math.min(boxX, boxX + boxW), Math.min(boxY, boxY + boxH), Math.max(boxX, boxX + boxW), Math.max(boxY, boxY + boxH), tmpExtent);
        }
        if (snapToPixel) {
            x = Math.round(x);
            y = Math.round(y);
        }
        return {
            drawImageX: x,
            drawImageY: y,
            drawImageW: w,
            drawImageH: h,
            originX: originX,
            originY: originY,
            declutterBox: {
                minX: tmpExtent[0],
                minY: tmpExtent[1],
                maxX: tmpExtent[2],
                maxY: tmpExtent[3],
                value: feature,
            },
            canvasTransform: transform,
            scale: scale,
        };
    };
    /**
     * @private
     * @param {CanvasRenderingContext2D} context Context.
     * @param {number} contextScale Scale of the context.
     * @param {import("../canvas.js").Label|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} imageOrLabel Image.
     * @param {ImageOrLabelDimensions} dimensions Dimensions.
     * @param {number} opacity Opacity.
     * @param {Array<*>} fillInstruction Fill instruction.
     * @param {Array<*>} strokeInstruction Stroke instruction.
     * @return {boolean} The image or label was rendered.
     */
    Executor.prototype.replayImageOrLabel_ = function (context, contextScale, imageOrLabel, dimensions, opacity, fillInstruction, strokeInstruction) {
        var fillStroke = !!(fillInstruction || strokeInstruction);
        var box = dimensions.declutterBox;
        var canvas = context.canvas;
        var strokePadding = strokeInstruction
            ? (strokeInstruction[2] * dimensions.scale[0]) / 2
            : 0;
        var intersects = box.minX - strokePadding <= canvas.width / contextScale &&
            box.maxX + strokePadding >= 0 &&
            box.minY - strokePadding <= canvas.height / contextScale &&
            box.maxY + strokePadding >= 0;
        if (intersects) {
            if (fillStroke) {
                this.replayTextBackground_(context, p1, p2, p3, p4, 
                /** @type {Array<*>} */ (fillInstruction), 
                /** @type {Array<*>} */ (strokeInstruction));
            }
            drawImageOrLabel(context, dimensions.canvasTransform, opacity, imageOrLabel, dimensions.originX, dimensions.originY, dimensions.drawImageW, dimensions.drawImageH, dimensions.drawImageX, dimensions.drawImageY, dimensions.scale);
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
        context['strokeStyle'] =
            /** @type {import("../../colorlike.js").ColorLike} */ (instruction[1]);
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
     * @private
     * @param {string|Array<string>} text The text to draw.
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
        var align = horizontalTextAlign(Array.isArray(text) ? text[0] : text, textState.textAlign || defaultTextAlign);
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
     * @param {FeatureCallback<T>} [opt_featureCallback] Feature callback.
     * @param {import("../../extent.js").Extent} [opt_hitExtent] Only check
     *     features that intersect this extent.
     * @param {import("rbush").default} [opt_declutterTree] Declutter tree.
     * @return {T|undefined} Callback result.
     * @template T
     */
    Executor.prototype.execute_ = function (context, contextScale, transform, instructions, snapToPixel, opt_featureCallback, opt_hitExtent, opt_declutterTree) {
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
        var anchorX, anchorY, prevX, prevY, roundX, roundY, image, text, textKey, strokeKey, fillKey;
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
        var x, y, currentGeometry;
        while (i < ii) {
            var instruction = instructions[i];
            var type = /** @type {import("./Instruction.js").default} */ (instruction[0]);
            switch (type) {
                case CanvasInstruction.BEGIN_GEOMETRY:
                    feature = /** @type {import("../../Feature.js").FeatureLike} */ (instruction[1]);
                    currentGeometry = instruction[3];
                    if (!feature.getGeometry()) {
                        i = /** @type {number} */ (instruction[2]);
                    }
                    else if (opt_hitExtent !== undefined &&
                        !intersects(opt_hitExtent, currentGeometry.getExtent())) {
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
                    var geometry = 
                    /** @type {import("../../geom/SimpleGeometry.js").default} */ (instruction[3]);
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
                    image =
                        /** @type {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement} */ (instruction[3]);
                    // Remaining arguments in DRAW_IMAGE are in alphabetical order
                    anchorX = /** @type {number} */ (instruction[4]);
                    anchorY = /** @type {number} */ (instruction[5]);
                    var height = /** @type {number} */ (instruction[6]);
                    var opacity = /** @type {number} */ (instruction[7]);
                    var originX = /** @type {number} */ (instruction[8]);
                    var originY = /** @type {number} */ (instruction[9]);
                    var rotateWithView = /** @type {boolean} */ (instruction[10]);
                    var rotation = /** @type {number} */ (instruction[11]);
                    var scale = /** @type {import("../../size.js").Size} */ (instruction[12]);
                    var width = /** @type {number} */ (instruction[13]);
                    var declutterMode = 
                    /** @type {"declutter"|"obstacle"|"none"|undefined} */ (instruction[14]);
                    var declutterImageWithText = 
                    /** @type {import("../canvas.js").DeclutterImageWithText} */ (instruction[15]);
                    if (!image && instruction.length >= 20) {
                        // create label images
                        text = /** @type {string} */ (instruction[19]);
                        textKey = /** @type {string} */ (instruction[20]);
                        strokeKey = /** @type {string} */ (instruction[21]);
                        fillKey = /** @type {string} */ (instruction[22]);
                        var labelWithAnchor = this.drawLabelWithPointPlacement_(text, textKey, strokeKey, fillKey);
                        image = labelWithAnchor.label;
                        instruction[3] = image;
                        var textOffsetX = /** @type {number} */ (instruction[23]);
                        anchorX = (labelWithAnchor.anchorX - textOffsetX) * this.pixelRatio;
                        instruction[4] = anchorX;
                        var textOffsetY = /** @type {number} */ (instruction[24]);
                        anchorY = (labelWithAnchor.anchorY - textOffsetY) * this.pixelRatio;
                        instruction[5] = anchorY;
                        height = image.height;
                        instruction[6] = height;
                        width = image.width;
                        instruction[13] = width;
                    }
                    var geometryWidths = void 0;
                    if (instruction.length > 25) {
                        geometryWidths = /** @type {number} */ (instruction[25]);
                    }
                    var padding = void 0, backgroundFill = void 0, backgroundStroke = void 0;
                    if (instruction.length > 17) {
                        padding = /** @type {Array<number>} */ (instruction[16]);
                        backgroundFill = /** @type {boolean} */ (instruction[17]);
                        backgroundStroke = /** @type {boolean} */ (instruction[18]);
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
                    for (; d < dd; d += 2) {
                        if (geometryWidths &&
                            geometryWidths[widthIndex++] < width / this.pixelRatio) {
                            continue;
                        }
                        var dimensions = this.calculateImageOrLabelDimensions_(image.width, image.height, pixelCoordinates[d], pixelCoordinates[d + 1], width, height, anchorX, anchorY, originX, originY, rotation, scale, snapToPixel, padding, backgroundFill || backgroundStroke, feature);
                        /** @type {ReplayImageOrLabelArgs} */
                        var args = [
                            context,
                            contextScale,
                            image,
                            dimensions,
                            opacity,
                            backgroundFill
                                ? /** @type {Array<*>} */ (lastFillInstruction)
                                : null,
                            backgroundStroke
                                ? /** @type {Array<*>} */ (lastStrokeInstruction)
                                : null,
                        ];
                        if (opt_declutterTree) {
                            if (declutterMode === 'none') {
                                // not rendered in declutter group
                                continue;
                            }
                            else if (declutterMode === 'obstacle') {
                                // will always be drawn, thus no collision detection, but insert as obstacle
                                opt_declutterTree.insert(dimensions.declutterBox);
                                continue;
                            }
                            else {
                                var imageArgs = void 0;
                                var imageDeclutterBox = void 0;
                                if (declutterImageWithText) {
                                    var index = dd - d;
                                    if (!declutterImageWithText[index]) {
                                        // We now have the image for an image+text combination.
                                        declutterImageWithText[index] = args;
                                        // Don't render anything for now, wait for the text.
                                        continue;
                                    }
                                    imageArgs = declutterImageWithText[index];
                                    delete declutterImageWithText[index];
                                    imageDeclutterBox = getDeclutterBox(imageArgs);
                                    if (opt_declutterTree.collides(imageDeclutterBox)) {
                                        continue;
                                    }
                                }
                                if (opt_declutterTree.collides(dimensions.declutterBox)) {
                                    continue;
                                }
                                if (imageArgs) {
                                    // We now have image and text for an image+text combination.
                                    opt_declutterTree.insert(imageDeclutterBox);
                                    // Render the image before we render the text.
                                    this.replayImageOrLabel_.apply(this, imageArgs);
                                }
                                opt_declutterTree.insert(dimensions.declutterBox);
                            }
                        }
                        this.replayImageOrLabel_.apply(this, args);
                    }
                    ++i;
                    break;
                case CanvasInstruction.DRAW_CHARS:
                    var begin = /** @type {number} */ (instruction[1]);
                    var end = /** @type {number} */ (instruction[2]);
                    var baseline = /** @type {number} */ (instruction[3]);
                    var overflow = /** @type {number} */ (instruction[4]);
                    fillKey = /** @type {string} */ (instruction[5]);
                    var maxAngle = /** @type {number} */ (instruction[6]);
                    var measurePixelRatio = /** @type {number} */ (instruction[7]);
                    var offsetY = /** @type {number} */ (instruction[8]);
                    strokeKey = /** @type {string} */ (instruction[9]);
                    var strokeWidth = /** @type {number} */ (instruction[10]);
                    text = /** @type {string} */ (instruction[11]);
                    textKey = /** @type {string} */ (instruction[12]);
                    var pixelRatioScale = [
                        /** @type {number} */ (instruction[13]),
                        /** @type {number} */ (instruction[13]),
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
                        drawChars: if (parts) {
                            /** @type {Array<ReplayImageOrLabelArgs>} */
                            var replayImageOrLabelArgs = [];
                            var c = void 0, cc = void 0, chars = void 0, label = void 0, part = void 0;
                            if (strokeKey) {
                                for (c = 0, cc = parts.length; c < cc; ++c) {
                                    part = parts[c]; // x, y, anchorX, rotation, chunk
                                    chars = /** @type {string} */ (part[4]);
                                    label = this.createLabel(chars, textKey, '', strokeKey);
                                    anchorX =
                                        /** @type {number} */ (part[2]) +
                                            (textScale[0] < 0 ? -strokeWidth : strokeWidth);
                                    anchorY =
                                        baseline * label.height +
                                            ((0.5 - baseline) * 2 * strokeWidth * textScale[1]) /
                                                textScale[0] -
                                            offsetY;
                                    var dimensions = this.calculateImageOrLabelDimensions_(label.width, label.height, part[0], part[1], label.width, label.height, anchorX, anchorY, 0, 0, part[3], pixelRatioScale, false, defaultPadding, false, feature);
                                    if (opt_declutterTree &&
                                        opt_declutterTree.collides(dimensions.declutterBox)) {
                                        break drawChars;
                                    }
                                    replayImageOrLabelArgs.push([
                                        context,
                                        contextScale,
                                        label,
                                        dimensions,
                                        1,
                                        null,
                                        null,
                                    ]);
                                }
                            }
                            if (fillKey) {
                                for (c = 0, cc = parts.length; c < cc; ++c) {
                                    part = parts[c]; // x, y, anchorX, rotation, chunk
                                    chars = /** @type {string} */ (part[4]);
                                    label = this.createLabel(chars, textKey, fillKey, '');
                                    anchorX = /** @type {number} */ (part[2]);
                                    anchorY = baseline * label.height - offsetY;
                                    var dimensions = this.calculateImageOrLabelDimensions_(label.width, label.height, part[0], part[1], label.width, label.height, anchorX, anchorY, 0, 0, part[3], pixelRatioScale, false, defaultPadding, false, feature);
                                    if (opt_declutterTree &&
                                        opt_declutterTree.collides(dimensions.declutterBox)) {
                                        break drawChars;
                                    }
                                    replayImageOrLabelArgs.push([
                                        context,
                                        contextScale,
                                        label,
                                        dimensions,
                                        1,
                                        null,
                                        null,
                                    ]);
                                }
                            }
                            if (opt_declutterTree) {
                                opt_declutterTree.load(replayImageOrLabelArgs.map(getDeclutterBox));
                            }
                            for (var i_1 = 0, ii_1 = replayImageOrLabelArgs.length; i_1 < ii_1; ++i_1) {
                                this.replayImageOrLabel_.apply(this, replayImageOrLabelArgs[i_1]);
                            }
                        }
                    }
                    ++i;
                    break;
                case CanvasInstruction.END_GEOMETRY:
                    if (opt_featureCallback !== undefined) {
                        feature = /** @type {import("../../Feature.js").FeatureLike} */ (instruction[1]);
                        var result = opt_featureCallback(feature, currentGeometry);
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
                    context.fillStyle =
                        /** @type {import("../../colorlike.js").ColorLike} */ (instruction[1]);
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
                default: // consume the instruction anyway, to avoid an infinite loop
                    ++i;
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
     * @param {import("rbush").default} [opt_declutterTree] Declutter tree.
     */
    Executor.prototype.execute = function (context, contextScale, transform, viewRotation, snapToPixel, opt_declutterTree) {
        this.viewRotation_ = viewRotation;
        this.execute_(context, contextScale, transform, this.instructions, snapToPixel, undefined, undefined, opt_declutterTree);
    };
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {import("../../transform.js").Transform} transform Transform.
     * @param {number} viewRotation View rotation.
     * @param {FeatureCallback<T>} [opt_featureCallback] Feature callback.
     * @param {import("../../extent.js").Extent} [opt_hitExtent] Only check
     *     features that intersect this extent.
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