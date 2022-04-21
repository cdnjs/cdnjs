/**
 * @module ol/format/filter/IsLike
 */
import Comparison from './Comparison.js';

/**
 * @classdesc
 * Represents a `<PropertyIsLike>` comparison operator.
 * @api
 */
var IsLike = /*@__PURE__*/(function (Comparison) {
  function IsLike(propertyName, pattern, opt_wildCard, opt_singleChar, opt_escapeChar, opt_matchCase) {
    Comparison.call(this, 'PropertyIsLike', propertyName);

    /**
     * @type {!string}
     */
    this.pattern = pattern;

    /**
     * @type {!string}
     */
    this.wildCard = (opt_wildCard !== undefined) ? opt_wildCard : '*';

    /**
     * @type {!string}
     */
    this.singleChar = (opt_singleChar !== undefined) ? opt_singleChar : '.';

    /**
     * @type {!string}
     */
    this.escapeChar = (opt_escapeChar !== undefined) ? opt_escapeChar : '!';

    /**
     * @type {boolean|undefined}
     */
    this.matchCase = opt_matchCase;

  }

  if ( Comparison ) IsLike.__proto__ = Comparison;
  IsLike.prototype = Object.create( Comparison && Comparison.prototype );
  IsLike.prototype.constructor = IsLike;

  return IsLike;
}(Comparison));

export default IsLike;

//# sourceMappingURL=IsLike.js.map