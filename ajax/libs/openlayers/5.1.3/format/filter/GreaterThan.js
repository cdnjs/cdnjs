/**
 * @module ol/format/filter/GreaterThan
 */
import ComparisonBinary from '../filter/ComparisonBinary.js';

/**
 * @classdesc
 * Represents a `<PropertyIsGreaterThan>` comparison operator.
 * @api
 */
var GreaterThan = (function (ComparisonBinary) {
  function GreaterThan(propertyName, expression) {
    ComparisonBinary.call(this, 'PropertyIsGreaterThan', propertyName, expression);
  }

  if ( ComparisonBinary ) GreaterThan.__proto__ = ComparisonBinary;
  GreaterThan.prototype = Object.create( ComparisonBinary && ComparisonBinary.prototype );
  GreaterThan.prototype.constructor = GreaterThan;

  return GreaterThan;
}(ComparisonBinary));

export default GreaterThan;

//# sourceMappingURL=GreaterThan.js.map