/**
 * @module ol/format/filter/And
 */
import LogicalNary from '../filter/LogicalNary.js';

/**
 * @classdesc
 * Represents a logical `<And>` operator between two or more filter conditions.
 *
 * @abstract
 */
var And = (function (LogicalNary) {
  function And(conditions) {
    var params = ['And'].concat(Array.prototype.slice.call(arguments));
    LogicalNary.apply(this, params);
  }

  if ( LogicalNary ) And.__proto__ = LogicalNary;
  And.prototype = Object.create( LogicalNary && LogicalNary.prototype );
  And.prototype.constructor = And;

  return And;
}(LogicalNary));

export default And;

//# sourceMappingURL=And.js.map