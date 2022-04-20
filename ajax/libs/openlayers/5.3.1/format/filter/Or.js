/**
 * @module ol/format/filter/Or
 */
import LogicalNary from './LogicalNary.js';

/**
 * @classdesc
 * Represents a logical `<Or>` operator between two ore more filter conditions.
 * @api
 */
var Or = /*@__PURE__*/(function (LogicalNary) {
  function Or(conditions) {
    LogicalNary.call(this, 'Or', Array.prototype.slice.call(arguments));
  }

  if ( LogicalNary ) Or.__proto__ = LogicalNary;
  Or.prototype = Object.create( LogicalNary && LogicalNary.prototype );
  Or.prototype.constructor = Or;

  return Or;
}(LogicalNary));

export default Or;

//# sourceMappingURL=Or.js.map