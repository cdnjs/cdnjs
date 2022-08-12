/**
 * @module ol/render/canvas
 */
import BaseObject from '../Object.js';
import EventTarget from '../events/Target.js';
import { WORKER_OFFSCREEN_CANVAS } from '../has.js';
import { clear } from '../obj.js';
import { createCanvasContext2D } from '../dom.js';
import { getFontParameters } from '../css.js';
import { toString } from '../transform.js';
/**
 * @typedef {Object} FillState
 * @property {import("../colorlike.js").ColorLike} fillStyle
 */
/**
 * @typedef Label
 * @property {number} width
 * @property {number} height
 * @property {Array<string|number>} contextInstructions
 */
/**
 * @typedef {Object} FillStrokeState
 * @property {import("../colorlike.js").ColorLike} [currentFillStyle]
 * @property {import("../colorlike.js").ColorLike} [currentStrokeStyle]
 * @property {CanvasLineCap} [currentLineCap]
 * @property {Array<number>} currentLineDash
 * @property {number} [currentLineDashOffset]
 * @property {CanvasLineJoin} [currentLineJoin]
 * @property {number} [currentLineWidth]
 * @property {number} [currentMiterLimit]
 * @property {number} [lastStroke]
 * @property {import("../colorlike.js").ColorLike} [fillStyle]
 * @property {import("../colorlike.js").ColorLike} [strokeStyle]
 * @property {CanvasLineCap} [lineCap]
 * @property {Array<number>} lineDash
 * @property {number} [lineDashOffset]
 * @property {CanvasLineJoin} [lineJoin]
 * @property {number} [lineWidth]
 * @property {number} [miterLimit]
 */
/**
 * @typedef {Object} StrokeState
 * @property {CanvasLineCap} lineCap
 * @property {Array<number>} lineDash
 * @property {number} lineDashOffset
 * @property {CanvasLineJoin} lineJoin
 * @property {number} lineWidth
 * @property {number} miterLimit
 * @property {import("../colorlike.js").ColorLike} strokeStyle
 */
/**
 * @typedef {Object} TextState
 * @property {string} font
 * @property {string} [textAlign]
 * @property {string} textBaseline
 * @property {string} [placement]
 * @property {number} [maxAngle]
 * @property {boolean} [overflow]
 * @property {import("../style/Fill.js").default} [backgroundFill]
 * @property {import("../style/Stroke.js").default} [backgroundStroke]
 * @property {import("../size.js").Size} [scale]
 * @property {Array<number>} [padding]
 */
/**
 * Container for decluttered replay instructions that need to be rendered or
 * omitted together, i.e. when styles render both an image and text, or for the
 * characters that form text along lines. The basic elements of this array are
 * `[minX, minY, maxX, maxY, count]`, where the first four entries are the
 * rendered extent of the group in pixel space. `count` is the number of styles
 * in the group, i.e. 2 when an image and a text are grouped, or 1 otherwise.
 * In addition to these four elements, declutter instruction arrays (i.e. the
 * arguments to {@link module:ol/render/canvas~drawImage} are appended to the array.
 * @typedef {Array<*>} DeclutterGroup
 */
/**
 * Declutter groups for support of multi geometries.
 * @typedef {Array<DeclutterGroup>} DeclutterGroups
 */
/**
 * @const
 * @type {string}
 */
export var defaultFont = '10px sans-serif';
/**
 * @const
 * @type {import("../colorlike.js").ColorLike}
 */
export var defaultFillStyle = '#000';
/**
 * @const
 * @type {CanvasLineCap}
 */
export var defaultLineCap = 'round';
/**
 * @const
 * @type {Array<number>}
 */
export var defaultLineDash = [];
/**
 * @const
 * @type {number}
 */
export var defaultLineDashOffset = 0;
/**
 * @const
 * @type {CanvasLineJoin}
 */
export var defaultLineJoin = 'round';
/**
 * @const
 * @type {number}
 */
export var defaultMiterLimit = 10;
/**
 * @const
 * @type {import("../colorlike.js").ColorLike}
 */
export var defaultStrokeStyle = '#000';
/**
 * @const
 * @type {string}
 */
export var defaultTextAlign = 'center';
/**
 * @const
 * @type {string}
 */
export var defaultTextBaseline = 'middle';
/**
 * @const
 * @type {Array<number>}
 */
export var defaultPadding = [0, 0, 0, 0];
/**
 * @const
 * @type {number}
 */
export var defaultLineWidth = 1;
/**
 * @type {BaseObject}
 */
export var checkedFonts = new BaseObject();
/**
 * The label cache for text rendering. To change the default cache size of 2048
 * entries, use {@link module:ol/structs/LRUCache#setSize}.
 * Deprecated - there is no label cache any more.
 * @type {?}
 * @api
 * @deprecated
 */
export var labelCache = new EventTarget();
labelCache.setSize = function () {
    console.warn('labelCache is deprecated.'); //eslint-disable-line
};
/**
 * @type {CanvasRenderingContext2D}
 */
var measureContext = null;
/**
 * @type {string}
 */
var measureFont;
/**
 * @type {!Object<string, number>}
 */
export var textHeights = {};
/**
 * Clears the label cache when a font becomes available.
 * @param {string} fontSpec CSS font spec.
 */
export var registerFont = (function () {
    var retries = 100;
    var size = '32px ';
    var referenceFonts = ['monospace', 'serif'];
    var len = referenceFonts.length;
    var text = 'wmytzilWMYTZIL@#/&?$%10\uF013';
    var interval, referenceWidth;
    /**
     * @param {string} fontStyle Css font-style
     * @param {string} fontWeight Css font-weight
     * @param {*} fontFamily Css font-family
     * @return {boolean} Font with style and weight is available
     */
    function isAvailable(fontStyle, fontWeight, fontFamily) {
        var available = true;
        for (var i = 0; i < len; ++i) {
            var referenceFont = referenceFonts[i];
            referenceWidth = measureTextWidth(fontStyle + ' ' + fontWeight + ' ' + size + referenceFont, text);
            if (fontFamily != referenceFont) {
                var width = measureTextWidth(fontStyle +
                    ' ' +
                    fontWeight +
                    ' ' +
                    size +
                    fontFamily +
                    ',' +
                    referenceFont, text);
                // If width and referenceWidth are the same, then the fallback was used
                // instead of the font we wanted, so the font is not available.
                available = available && width != referenceWidth;
            }
        }
        if (available) {
            return true;
        }
        return false;
    }
    function check() {
        var done = true;
        var fonts = checkedFonts.getKeys();
        for (var i = 0, ii = fonts.length; i < ii; ++i) {
            var font = fonts[i];
            if (checkedFonts.get(font) < retries) {
                if (isAvailable.apply(this, font.split('\n'))) {
                    clear(textHeights);
                    // Make sure that loaded fonts are picked up by Safari
                    measureContext = null;
                    measureFont = undefined;
                    checkedFonts.set(font, retries);
                }
                else {
                    checkedFonts.set(font, checkedFonts.get(font) + 1, true);
                    done = false;
                }
            }
        }
        if (done) {
            clearInterval(interval);
            interval = undefined;
        }
    }
    return function (fontSpec) {
        var font = getFontParameters(fontSpec);
        if (!font) {
            return;
        }
        var families = font.families;
        for (var i = 0, ii = families.length; i < ii; ++i) {
            var family = families[i];
            var key = font.style + '\n' + font.weight + '\n' + family;
            if (checkedFonts.get(key) === undefined) {
                checkedFonts.set(key, retries, true);
                if (!isAvailable(font.style, font.weight, family)) {
                    checkedFonts.set(key, 0, true);
                    if (interval === undefined) {
                        interval = setInterval(check, 32);
                    }
                }
            }
        }
    };
})();
/**
 * @param {string} font Font to use for measuring.
 * @return {import("../size.js").Size} Measurement.
 */
export var measureTextHeight = (function () {
    /**
     * @type {HTMLDivElement}
     */
    var div;
    var heights = textHeights;
    return function (fontSpec) {
        var height = heights[fontSpec];
        if (height == undefined) {
            if (WORKER_OFFSCREEN_CANVAS) {
                var font = getFontParameters(fontSpec);
                var metrics = measureText(fontSpec, 'Žg');
                var lineHeight = isNaN(Number(font.lineHeight))
                    ? 1.2
                    : Number(font.lineHeight);
                textHeights[fontSpec] =
                    lineHeight *
                        (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent);
            }
            else {
                if (!div) {
                    div = document.createElement('div');
                    div.innerHTML = 'M';
                    div.style.margin = '0 !important';
                    div.style.padding = '0 !important';
                    div.style.position = 'absolute !important';
                    div.style.left = '-99999px !important';
                }
                div.style.font = fontSpec;
                document.body.appendChild(div);
                height = div.offsetHeight;
                heights[fontSpec] = height;
                document.body.removeChild(div);
            }
        }
        return height;
    };
})();
/**
 * @param {string} font Font.
 * @param {string} text Text.
 * @return {TextMetrics} Text metrics.
 */
function measureText(font, text) {
    if (!measureContext) {
        measureContext = createCanvasContext2D(1, 1);
    }
    if (font != measureFont) {
        measureContext.font = font;
        measureFont = measureContext.font;
    }
    return measureContext.measureText(text);
}
/**
 * @param {string} font Font.
 * @param {string} text Text.
 * @return {number} Width.
 */
export function measureTextWidth(font, text) {
    return measureText(font, text).width;
}
/**
 * Measure text width using a cache.
 * @param {string} font The font.
 * @param {string} text The text to measure.
 * @param {Object<string, number>} cache A lookup of cached widths by text.
 * @returns {number} The text width.
 */
export function measureAndCacheTextWidth(font, text, cache) {
    if (text in cache) {
        return cache[text];
    }
    var width = measureTextWidth(font, text);
    cache[text] = width;
    return width;
}
/**
 * @param {string} font Font to use for measuring.
 * @param {Array<string>} lines Lines to measure.
 * @param {Array<number>} widths Array will be populated with the widths of
 * each line.
 * @return {number} Width of the whole text.
 */
export function measureTextWidths(font, lines, widths) {
    var numLines = lines.length;
    var width = 0;
    for (var i = 0; i < numLines; ++i) {
        var currentWidth = measureTextWidth(font, lines[i]);
        width = Math.max(width, currentWidth);
        widths.push(currentWidth);
    }
    return width;
}
/**
 * @param {CanvasRenderingContext2D} context Context.
 * @param {number} rotation Rotation.
 * @param {number} offsetX X offset.
 * @param {number} offsetY Y offset.
 */
export function rotateAtOffset(context, rotation, offsetX, offsetY) {
    if (rotation !== 0) {
        context.translate(offsetX, offsetY);
        context.rotate(rotation);
        context.translate(-offsetX, -offsetY);
    }
}
/**
 * @param {CanvasRenderingContext2D} context Context.
 * @param {import("../transform.js").Transform|null} transform Transform.
 * @param {number} opacity Opacity.
 * @param {Label|HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} labelOrImage Label.
 * @param {number} originX Origin X.
 * @param {number} originY Origin Y.
 * @param {number} w Width.
 * @param {number} h Height.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {import("../size.js").Size} scale Scale.
 */
export function drawImageOrLabel(context, transform, opacity, labelOrImage, originX, originY, w, h, x, y, scale) {
    context.save();
    if (opacity !== 1) {
        context.globalAlpha *= opacity;
    }
    if (transform) {
        context.setTransform.apply(context, transform);
    }
    if ( /** @type {*} */(labelOrImage).contextInstructions) {
        // label
        context.translate(x, y);
        context.scale(scale[0], scale[1]);
        executeLabelInstructions(/** @type {Label} */ (labelOrImage), context);
    }
    else if (scale[0] < 0 || scale[1] < 0) {
        // flipped image
        context.translate(x, y);
        context.scale(scale[0], scale[1]);
        context.drawImage(
        /** @type {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} */ (labelOrImage), originX, originY, w, h, 0, 0, w, h);
    }
    else {
        // if image not flipped translate and scale can be avoided
        context.drawImage(
        /** @type {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} */ (labelOrImage), originX, originY, w, h, x, y, w * scale[0], h * scale[1]);
    }
    context.restore();
}
/**
 * @param {Label} label Label.
 * @param {CanvasRenderingContext2D} context Context.
 */
function executeLabelInstructions(label, context) {
    var contextInstructions = label.contextInstructions;
    for (var i = 0, ii = contextInstructions.length; i < ii; i += 2) {
        if (Array.isArray(contextInstructions[i + 1])) {
            context[contextInstructions[i]].apply(context, contextInstructions[i + 1]);
        }
        else {
            context[contextInstructions[i]] = contextInstructions[i + 1];
        }
    }
}
/**
 * @type {HTMLCanvasElement}
 * @private
 */
var createTransformStringCanvas = null;
/**
 * @param {import("../transform.js").Transform} transform Transform.
 * @return {string} CSS transform.
 */
export function createTransformString(transform) {
    if (WORKER_OFFSCREEN_CANVAS) {
        return toString(transform);
    }
    else {
        if (!createTransformStringCanvas) {
            createTransformStringCanvas = createCanvasContext2D(1, 1).canvas;
        }
        createTransformStringCanvas.style.transform = toString(transform);
        return createTransformStringCanvas.style.transform;
    }
}
//# sourceMappingURL=canvas.js.map