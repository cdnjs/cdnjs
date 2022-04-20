/**
 * @module ol/format/filter/IsBetween
 */
import Comparison from '../filter/Comparison.js';

/**
 * @classdesc
 * Represents a `<PropertyIsBetween>` comparison operator.
 * @api
 */
var IsBetween = (function (Comparison) {
  function IsBetween(propertyName, lowerBoundary, upperBoundary) {
    Comparison.call(this, 'PropertyIsBetween', propertyName);

    /**
     * @type {!number}
     */
    this.lowerBoundary = lowerBoundary;

    /**
     * @type {!number}
     */
    this.upperBoundary = upperBoundary;

  }

  if ( Comparison ) IsBetween.__proto__ = Comparison;
  IsBetween.prototype = Object.create( Comparison && Comparison.prototype );
  IsBetween.prototype.constructor = IsBetween;

  return IsBetween;
}(Comparison));

export default IsBetween;

//# sourceMappingURL=IsBetween.js.map