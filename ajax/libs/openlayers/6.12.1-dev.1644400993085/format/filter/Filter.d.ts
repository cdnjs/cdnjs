export default Filter;
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
declare class Filter {
    /**
     * @param {!string} tagName The XML tag name for this filter.
     */
    constructor(tagName: string);
    /**
     * @private
     * @type {!string}
     */
    private tagName_;
    /**
     * The XML tag name for a filter.
     * @return {!string} Name.
     */
    getTagName(): string;
}
//# sourceMappingURL=Filter.d.ts.map