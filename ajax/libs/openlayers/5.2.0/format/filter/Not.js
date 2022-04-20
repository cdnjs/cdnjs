/**
 * @module ol/format/filter/Not
 */
import Filter from '../filter/Filter.js';

/**
 * @classdesc
 * Represents a logical `<Not>` operator for a filter condition.
 * @api
 */
var Not = (function (Filter) {
  function Not(condition) {

    Filter.call(this, 'Not');

    /**
     * @type {!module:ol/format/filter/Filter}
     */
    this.condition = condition;

  }

  if ( Filter ) Not.__proto__ = Filter;
  Not.prototype = Object.create( Filter && Filter.prototype );
  Not.prototype.constructor = Not;

  return Not;
}(Filter));

export default Not;

//# sourceMappingURL=Not.js.map