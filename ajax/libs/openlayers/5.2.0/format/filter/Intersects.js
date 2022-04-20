/**
 * @module ol/format/filter/Intersects
 */
import Spatial from '../filter/Spatial.js';

/**
 * @classdesc
 * Represents a `<Intersects>` operator to test whether a geometry-valued property
 * intersects a given geometry.
 * @api
 */
var Intersects = (function (Spatial) {
  function Intersects(geometryName, geometry, opt_srsName) {
    Spatial.call(this, 'Intersects', geometryName, geometry, opt_srsName);
  }

  if ( Spatial ) Intersects.__proto__ = Spatial;
  Intersects.prototype = Object.create( Spatial && Spatial.prototype );
  Intersects.prototype.constructor = Intersects;

  return Intersects;
}(Spatial));

export default Intersects;

//# sourceMappingURL=Intersects.js.map