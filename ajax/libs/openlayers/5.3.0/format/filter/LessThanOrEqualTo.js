/**
 * @module ol/format/filter/LessThanOrEqualTo
 */
import ComparisonBinary from './ComparisonBinary.js';

/**
 * @classdesc
 * Represents a `<PropertyIsLessThanOrEqualTo>` comparison operator.
 * @api
 */
var LessThanOrEqualTo = /*@__PURE__*/(function (ComparisonBinary) {
  function LessThanOrEqualTo(propertyName, expression) {
    ComparisonBinary.call(this, 'PropertyIsLessThanOrEqualTo', propertyName, expression);
  }

  if ( ComparisonBinary ) LessThanOrEqualTo.__proto__ = ComparisonBinary;
  LessThanOrEqualTo.prototype = Object.create( ComparisonBinary && ComparisonBinary.prototype );
  LessThanOrEqualTo.prototype.constructor = LessThanOrEqualTo;

  return LessThanOrEqualTo;
}(ComparisonBinary));

export default LessThanOrEqualTo;

//# sourceMappingURL=LessThanOrEqualTo.js.map