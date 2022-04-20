/**
 * @module ol/format/filter/Spatial
 */
import Filter from '../filter/Filter.js';

/**
 * @classdesc
 * Abstract class; normally only used for creating subclasses and not instantiated in apps.
 * Represents a spatial operator to test whether a geometry-valued property
 * relates to a given geometry.
 *
 * @abstract
 */
var Spatial = (function (Filter) {
  function Spatial(tagName, geometryName, geometry, opt_srsName) {

    Filter.call(this, tagName);

    /**
     * @type {!string}
     */
    this.geometryName = geometryName || 'the_geom';

    /**
     * @type {module:ol/geom/Geometry}
     */
    this.geometry = geometry;

    /**
     * @type {string|undefined}
     */
    this.srsName = opt_srsName;
  }

  if ( Filter ) Spatial.__proto__ = Filter;
  Spatial.prototype = Object.create( Filter && Filter.prototype );
  Spatial.prototype.constructor = Spatial;

  return Spatial;
}(Filter));

export default Spatial;

//# sourceMappingURL=Spatial.js.map