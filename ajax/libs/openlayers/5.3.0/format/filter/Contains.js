/**
 * @module ol/format/filter/Contains
 */
import Spatial from './Spatial.js';

/**
 * @classdesc
 * Represents a `<Contains>` operator to test whether a geometry-valued property
 * contains a given geometry.
 * @api
 */
var Contains = /*@__PURE__*/(function (Spatial) {
  function Contains(geometryName, geometry, opt_srsName) {

    Spatial.call(this, 'Contains', geometryName, geometry, opt_srsName);

  }

  if ( Spatial ) Contains.__proto__ = Spatial;
  Contains.prototype = Object.create( Spatial && Spatial.prototype );
  Contains.prototype.constructor = Contains;

  return Contains;
}(Spatial));

export default Contains;

//# sourceMappingURL=Contains.js.map