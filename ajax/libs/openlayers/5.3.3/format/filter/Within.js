/**
 * @module ol/format/filter/Within
 */
import Spatial from './Spatial.js';

/**
 * @classdesc
 * Represents a `<Within>` operator to test whether a geometry-valued property
 * is within a given geometry.
 * @api
 */
var Within = /*@__PURE__*/(function (Spatial) {
  function Within(geometryName, geometry, opt_srsName) {
    Spatial.call(this, 'Within', geometryName, geometry, opt_srsName);
  }

  if ( Spatial ) Within.__proto__ = Spatial;
  Within.prototype = Object.create( Spatial && Spatial.prototype );
  Within.prototype.constructor = Within;

  return Within;
}(Spatial));

export default Within;

//# sourceMappingURL=Within.js.map