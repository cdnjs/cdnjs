import { BaseMixin } from './base-mixin.js';
/**
 * Margin is a mixin that provides margin utility functions for both the Row Chart and Coordinate Grid
 * Charts.
 */
export class MarginMixin extends BaseMixin {
    constructor(parent, chartGroup) {
        super(parent, chartGroup);
        this._margins = { top: 10, right: 50, bottom: 30, left: 30 };
    }
    configure(conf) {
        super.configure(conf);
        return this;
    }
    conf() {
        return this._conf;
    }
    margins(margins) {
        if (!arguments.length) {
            return this._margins;
        }
        this._margins = margins;
        return this;
    }
    /**
     * Effective width of the chart excluding margins (in pixels).
     *
     * @category Intermediate
     */
    effectiveWidth() {
        return this.width() - this.margins().left - this.margins().right;
    }
    /**
     * Effective height of the chart excluding margins (in pixels).
     *
     * @category Intermediate
     */
    effectiveHeight() {
        return this.height() - this.margins().top - this.margins().bottom;
    }
}
//# sourceMappingURL=margin-mixin.js.map