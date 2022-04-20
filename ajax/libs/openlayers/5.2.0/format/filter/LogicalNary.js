/**
 * @module ol/format/filter/LogicalNary
 */
import {assert} from '../../asserts.js';
import Filter from '../filter/Filter.js';

/**
 * @classdesc
 * Abstract class; normally only used for creating subclasses and not instantiated in apps.
 * Base class for WFS GetFeature n-ary logical filters.
 *
 * @abstract
 */
var LogicalNary = (function (Filter) {
  function LogicalNary(tagName, conditions) {

    Filter.call(this, tagName);

    /**
     * @type {Array<module:ol/format/filter/Filter>}
     */
    this.conditions = Array.prototype.slice.call(arguments, 1);
    assert(this.conditions.length >= 2, 57); // At least 2 conditions are required.
  }

  if ( Filter ) LogicalNary.__proto__ = Filter;
  LogicalNary.prototype = Object.create( Filter && Filter.prototype );
  LogicalNary.prototype.constructor = LogicalNary;

  return LogicalNary;
}(Filter));

export default LogicalNary;

//# sourceMappingURL=LogicalNary.js.map