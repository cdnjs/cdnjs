/**
 * @module ol/format/filter/LogicalNary
 */
import {assert} from '../../asserts.js';
import Filter from './Filter.js';

/**
 * @classdesc
 * Abstract class; normally only used for creating subclasses and not instantiated in apps.
 * Base class for WFS GetFeature n-ary logical filters.
 *
 * @abstract
 */
var LogicalNary = /*@__PURE__*/(function (Filter) {
  function LogicalNary(tagName, conditions) {

    Filter.call(this, tagName);

    /**
     * @type {Array<import("./Filter.js").default>}
     */
    this.conditions = conditions;
    assert(this.conditions.length >= 2, 57); // At least 2 conditions are required.
  }

  if ( Filter ) LogicalNary.__proto__ = Filter;
  LogicalNary.prototype = Object.create( Filter && Filter.prototype );
  LogicalNary.prototype.constructor = LogicalNary;

  return LogicalNary;
}(Filter));

export default LogicalNary;

//# sourceMappingURL=LogicalNary.js.map