/**
 * @module ol/format/filter/During
 */
import Comparison from './Comparison.js';

/**
 * @classdesc
 * Represents a `<During>` comparison operator.
 * @api
 */
var During = /*@__PURE__*/(function (Comparison) {
  function During(propertyName, begin, end) {
    Comparison.call(this, 'During', propertyName);

    /**
     * @type {!string}
     */
    this.begin = begin;

    /**
     * @type {!string}
     */
    this.end = end;
  }

  if ( Comparison ) During.__proto__ = Comparison;
  During.prototype = Object.create( Comparison && Comparison.prototype );
  During.prototype.constructor = During;

  return During;
}(Comparison));

export default During;

//# sourceMappingURL=During.js.map