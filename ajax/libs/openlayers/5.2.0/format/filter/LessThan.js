/**
 * @module ol/format/filter/LessThan
 */
import ComparisonBinary from '../filter/ComparisonBinary.js';

/**
 * @classdesc
 * Represents a `<PropertyIsLessThan>` comparison operator.
 * @api
 */
var LessThan = (function (ComparisonBinary) {
  function LessThan(propertyName, expression) {
    ComparisonBinary.call(this, 'PropertyIsLessThan', propertyName, expression);
  }

  if ( ComparisonBinary ) LessThan.__proto__ = ComparisonBinary;
  LessThan.prototype = Object.create( ComparisonBinary && ComparisonBinary.prototype );
  LessThan.prototype.constructor = LessThan;

  return LessThan;
}(ComparisonBinary));

export default LessThan;

//# sourceMappingURL=LessThan.js.map