/**
 * @module ol/format/filter/EqualTo
 */
import ComparisonBinary from './ComparisonBinary.js';

/**
 * @classdesc
 * Represents a `<PropertyIsEqualTo>` comparison operator.
 * @api
 */
var EqualTo = /*@__PURE__*/(function (ComparisonBinary) {
  function EqualTo(propertyName, expression, opt_matchCase) {
    ComparisonBinary.call(this, 'PropertyIsEqualTo', propertyName, expression, opt_matchCase);
  }

  if ( ComparisonBinary ) EqualTo.__proto__ = ComparisonBinary;
  EqualTo.prototype = Object.create( ComparisonBinary && ComparisonBinary.prototype );
  EqualTo.prototype.constructor = EqualTo;

  return EqualTo;
}(ComparisonBinary));

export default EqualTo;

//# sourceMappingURL=EqualTo.js.map