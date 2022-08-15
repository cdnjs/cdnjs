/**
 * @module ol/style/Fill
 */
/**
 * @typedef {Object} Options
 * @property {import("../color.js").Color|import("../colorlike.js").ColorLike} [color=null] A color, gradient or pattern.
 * See {@link module:ol/color~Color} and {@link module:ol/colorlike~ColorLike} for possible formats.
 * Default null; if null, the Canvas/renderer default black will be used.
 */
/**
 * @classdesc
 * Set fill style for vector features.
 * @api
 */
var Fill = /** @class */ (function () {
    /**
     * @param {Options=} opt_options Options.
     */
    function Fill(opt_options) {
        var options = opt_options || {};
        /**
         * @private
         * @type {import("../color.js").Color|import("../colorlike.js").ColorLike}
         */
        this.color_ = options.color !== undefined ? options.color : null;
    }
    /**
     * Clones the style. The color is not cloned if it is an {@link module:ol/colorlike~ColorLike}.
     * @return {Fill} The cloned style.
     * @api
     */
    Fill.prototype.clone = function () {
        var color = this.getColor();
        return new Fill({
            color: Array.isArray(color) ? color.slice() : color || undefined,
        });
    };
    /**
     * Get the fill color.
     * @return {import("../color.js").Color|import("../colorlike.js").ColorLike} Color.
     * @api
     */
    Fill.prototype.getColor = function () {
        return this.color_;
    };
    /**
     * Set the color.
     *
     * @param {import("../color.js").Color|import("../colorlike.js").ColorLike} color Color.
     * @api
     */
    Fill.prototype.setColor = function (color) {
        this.color_ = color;
    };
    return Fill;
}());
export default Fill;
//# sourceMappingURL=Fill.js.map