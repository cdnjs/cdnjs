/**
 * @module ol/format/filter/NotEqualTo
 */
import ComparisonBinary from '../filter/ComparisonBinary.js';

/**
 * @classdesc
 * Represents a `<PropertyIsNotEqualTo>` comparison operator.
 * @api
 */
var NotEqualTo = (function (ComparisonBinary) {
  function NotEqualTo(propertyName, expression, opt_matchCase) {
    ComparisonBinary.call(this, 'PropertyIsNotEqualTo', propertyName, expression, opt_matchCase);
  }

  if ( ComparisonBinary ) NotEqualTo.__proto__ = ComparisonBinary;
  NotEqualTo.prototype = Object.create( ComparisonBinary && ComparisonBinary.prototype );
  NotEqualTo.prototype.constructor = NotEqualTo;

  return NotEqualTo;
}(ComparisonBinary));

export default NotEqualTo;

//# sourceMappingURL=NotEqualTo.js.map