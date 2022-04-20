/**
 * @module ol/format/filter/Comparison
 */
import Filter from './Filter.js';

/**
 * @classdesc
 * Abstract class; normally only used for creating subclasses and not instantiated in apps.
 * Base class for WFS GetFeature property comparison filters.
 *
 * @abstract
 */
var Comparison = /*@__PURE__*/(function (Filter) {
  function Comparison(tagName, propertyName) {

    Filter.call(this, tagName);

    /**
     * @type {!string}
     */
    this.propertyName = propertyName;
  }

  if ( Filter ) Comparison.__proto__ = Filter;
  Comparison.prototype = Object.create( Filter && Filter.prototype );
  Comparison.prototype.constructor = Comparison;

  return Comparison;
}(Filter));

export default Comparison;

//# sourceMappingURL=Comparison.js.map