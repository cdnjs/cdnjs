/**
 * @module ol/format/filter/IsNull
 */
import Comparison from '../filter/Comparison.js';

/**
 * @classdesc
 * Represents a `<PropertyIsNull>` comparison operator.
 * @api
 */
var IsNull = (function (Comparison) {
  function IsNull(propertyName) {
    Comparison.call(this, 'PropertyIsNull', propertyName);
  }

  if ( Comparison ) IsNull.__proto__ = Comparison;
  IsNull.prototype = Object.create( Comparison && Comparison.prototype );
  IsNull.prototype.constructor = IsNull;

  return IsNull;
}(Comparison));

export default IsNull;

//# sourceMappingURL=IsNull.js.map