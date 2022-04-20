/**
 * @module ol/style/Fill
 */
import {getUid} from '../util.js';
import {asString} from '../color.js';


/**
 * @typedef {Object} Options
 * @property {module:ol/color~Color|module:ol/colorlike~ColorLike} [color] A color, gradient or pattern.
 * See {@link module:ol/color~Color} and {@link module:ol/colorlike~ColorLike} for possible formats.
 * Default null; if null, the Canvas/renderer default black will be used.
 */


/**
 * @classdesc
 * Set fill style for vector features.
 * @api
 */
var Fill = function Fill(opt_options) {

  var options = opt_options || {};

  /**
   * @private
   * @type {module:ol/color~Color|module:ol/colorlike~ColorLike}
   */
  this.color_ = options.color !== undefined ? options.color : null;

  /**
   * @private
   * @type {string|undefined}
   */
  this.checksum_ = undefined;
};

/**
 * Clones the style. The color is not cloned if it is an {@link module:ol/colorlike~ColorLike}.
 * @return {module:ol/style/Fill} The cloned style.
 * @api
 */
Fill.prototype.clone = function clone () {
  var color = this.getColor();
  return new Fill({
    color: (color && color.slice) ? color.slice() : color || undefined
  });
};

/**
 * Get the fill color.
 * @return {module:ol/color~Color|module:ol/colorlike~ColorLike} Color.
 * @api
 */
Fill.prototype.getColor = function getColor () {
  return this.color_;
};

/**
 * Set the color.
 *
 * @param {module:ol/color~Color|module:ol/colorlike~ColorLike} color Color.
 * @api
 */
Fill.prototype.setColor = function setColor (color) {
  this.color_ = color;
  this.checksum_ = undefined;
};

/**
 * @return {string} The checksum.
 */
Fill.prototype.getChecksum = function getChecksum () {
  if (this.checksum_ === undefined) {
    if (
      this.color_ instanceof CanvasPattern ||
        this.color_ instanceof CanvasGradient
    ) {
      this.checksum_ = getUid(this.color_).toString();
    } else {
      this.checksum_ = 'f' + (this.color_ ? asString(this.color_) : '-');
    }
  }

  return this.checksum_;
};

export default Fill;

//# sourceMappingURL=Fill.js.map