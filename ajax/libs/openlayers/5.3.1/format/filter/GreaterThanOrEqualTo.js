/**
 * @module ol/format/filter/GreaterThanOrEqualTo
 */
import ComparisonBinary from './ComparisonBinary.js';

/**
 * @classdesc
 * Represents a `<PropertyIsGreaterThanOrEqualTo>` comparison operator.
 * @api
 */
var GreaterThanOrEqualTo = /*@__PURE__*/(function (ComparisonBinary) {
  function GreaterThanOrEqualTo(propertyName, expression) {
    ComparisonBinary.call(this, 'PropertyIsGreaterThanOrEqualTo', propertyName, expression);
  }

  if ( ComparisonBinary ) GreaterThanOrEqualTo.__proto__ = ComparisonBinary;
  GreaterThanOrEqualTo.prototype = Object.create( ComparisonBinary && ComparisonBinary.prototype );
  GreaterThanOrEqualTo.prototype.constructor = GreaterThanOrEqualTo;

  return GreaterThanOrEqualTo;
}(ComparisonBinary));

export default GreaterThanOrEqualTo;

//# sourceMappingURL=GreaterThanOrEqualTo.js.map