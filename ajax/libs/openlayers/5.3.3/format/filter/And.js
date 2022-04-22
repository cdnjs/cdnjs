/**
 * @module ol/format/filter/And
 */
import LogicalNary from './LogicalNary.js';

/**
 * @classdesc
 * Represents a logical `<And>` operator between two or more filter conditions.
 *
 * @abstract
 */
var And = /*@__PURE__*/(function (LogicalNary) {
  function And(conditions) {
    LogicalNary.call(this, 'And', Array.prototype.slice.call(arguments));
  }

  if ( LogicalNary ) And.__proto__ = LogicalNary;
  And.prototype = Object.create( LogicalNary && LogicalNary.prototype );
  And.prototype.constructor = And;

  return And;
}(LogicalNary));

export default And;

//# sourceMappingURL=And.js.map