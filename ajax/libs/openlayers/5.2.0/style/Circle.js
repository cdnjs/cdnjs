/**
 * @module ol/style/Circle
 */

import RegularShape from '../style/RegularShape.js';


/**
 * @typedef {Object} Options
 * @property {module:ol/style/Fill} [fill] Fill style.
 * @property {number} radius Circle radius.
 * @property {module:ol/style/Stroke} [stroke] Stroke style.
 * @property {module:ol/style/AtlasManager} [atlasManager] The atlas manager to use for this circle.
 * When using WebGL it is recommended to use an atlas manager to avoid texture switching. If an atlas manager is given,
 * the circle is added to an atlas. By default no atlas manager is used.
 */


/**
 * @classdesc
 * Set circle style for vector features.
 * @api
 */
var CircleStyle = (function (RegularShape) {
  function CircleStyle(opt_options) {

    var options = opt_options || {};

    RegularShape.call(this, {
      points: Infinity,
      fill: options.fill,
      radius: options.radius,
      stroke: options.stroke,
      atlasManager: options.atlasManager
    });

  }

  if ( RegularShape ) CircleStyle.__proto__ = RegularShape;
  CircleStyle.prototype = Object.create( RegularShape && RegularShape.prototype );
  CircleStyle.prototype.constructor = CircleStyle;

  /**
  * Clones the style.  If an atlasmanager was provided to the original style it will be used in the cloned style, too.
  * @return {module:ol/style/Circle} The cloned style.
  * @override
  * @api
  */
  CircleStyle.prototype.clone = function clone () {
    var style = new CircleStyle({
      fill: this.getFill() ? this.getFill().clone() : undefined,
      stroke: this.getStroke() ? this.getStroke().clone() : undefined,
      radius: this.getRadius(),
      atlasManager: this.atlasManager_
    });
    style.setOpacity(this.getOpacity());
    style.setScale(this.getScale());
    return style;
  };

  /**
  * Set the circle radius.
  *
  * @param {number} radius Circle radius.
  * @api
  */
  CircleStyle.prototype.setRadius = function setRadius (radius) {
    this.radius_ = radius;
    this.render_(this.atlasManager_);
  };

  return CircleStyle;
}(RegularShape));


export default CircleStyle;

//# sourceMappingURL=Circle.js.map