/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('series-area-stacked', function (Y, NAME) {

/**
 * Provides functionality for creating a stacked area series.
 *
 * @module charts
 * @submodule series-area-stacked
 */
/**
 * StackedAreaSeries area fills to display data showing its contribution to a whole.
 *
 * @class StackedAreaSeries
 * @extends AreaSeries
 * @uses StackingUtil
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-area-stacked
 */
Y.StackedAreaSeries = Y.Base.create("stackedAreaSeries", Y.AreaSeries, [Y.StackingUtil], {
    /**
     * @protected
     *
     * Calculates the coordinates for the series. Overrides base implementation.
     *
     * @method setAreaData
     */
    setAreaData: function()
    {
        Y.StackedAreaSeries.superclass.setAreaData.apply(this);
        this._stackCoordinates.apply(this);
    },

    /**
     * @protected
     *
     * Draws the series
     *
     * @method drawSeries
     */
	drawSeries: function()
    {
        this.drawFill.apply(this, this._getStackedClosingPoints());
    }
}, {
    ATTRS: {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default stackedArea
         */
        type: {
            value:"stackedArea"
        }
    }
});


}, '3.17.2', {"requires": ["series-stacked", "series-area"]});
