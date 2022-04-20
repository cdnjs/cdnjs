/**
 * @module ol/format/filter/Or
 */
import LogicalNary from '../filter/LogicalNary.js';

/**
 * @classdesc
 * Represents a logical `<Or>` operator between two ore more filter conditions.
 * @api
 */
var Or = (function (LogicalNary) {
  function Or(conditions) {
    var params = ['Or'].concat(Array.prototype.slice.call(arguments));
    LogicalNary.apply(this, params);
  }

  if ( LogicalNary ) Or.__proto__ = LogicalNary;
  Or.prototype = Object.create( LogicalNary && LogicalNary.prototype );
  Or.prototype.constructor = Or;

  return Or;
}(LogicalNary));

export default Or;

//# sourceMappingURL=Or.js.map