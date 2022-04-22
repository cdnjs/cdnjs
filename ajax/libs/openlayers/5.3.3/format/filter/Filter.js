/**
 * @module ol/format/filter/Filter
 */


/**
 * @classdesc
 * Abstract class; normally only used for creating subclasses and not instantiated in apps.
 * Base class for WFS GetFeature filters.
 *
 * @abstract
 */
var Filter = function Filter(tagName) {

  /**
   * @private
   * @type {!string}
   */
  this.tagName_ = tagName;
};

/**
 * The XML tag name for a filter.
 * @returns {!string} Name.
 */
Filter.prototype.getTagName = function getTagName () {
  return this.tagName_;
};

export default Filter;

//# sourceMappingURL=Filter.js.map