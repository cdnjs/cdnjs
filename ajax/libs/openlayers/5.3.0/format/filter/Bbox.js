/**
 * @module ol/format/filter/Bbox
 */
import Filter from './Filter.js';

/**
 * @classdesc
 * Represents a `<BBOX>` operator to test whether a geometry-valued property
 * intersects a fixed bounding box
 *
 * @api
 */
var Bbox = /*@__PURE__*/(function (Filter) {
  function Bbox(geometryName, extent, opt_srsName) {

    Filter.call(this, 'BBOX');

    /**
     * @type {!string}
     */
    this.geometryName = geometryName;

    /**
     * @type {import("../../extent.js").Extent}
     */
    this.extent = extent;

    /**
     * @type {string|undefined}
     */
    this.srsName = opt_srsName;
  }

  if ( Filter ) Bbox.__proto__ = Filter;
  Bbox.prototype = Object.create( Filter && Filter.prototype );
  Bbox.prototype.constructor = Bbox;

  return Bbox;
}(Filter));

export default Bbox;

//# sourceMappingURL=Bbox.js.map