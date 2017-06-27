/*
YUI 3.16.0 (build 76f0e08)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('series-areaspline', function (Y, NAME) {

/**
 * Provides functionality for creating an areaspline series.
 *
 * @module charts
 * @submodule series-areaspline
 */
/**
 * AreaSplineSeries renders an area graph with data points connected by a curve.
 *
 * @class AreaSplineSeries
 * @extends AreaSeries
 * @uses CurveUtil
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-areaspline
 */
Y.AreaSplineSeries = Y.Base.create("areaSplineSeries", Y.AreaSeries, [Y.CurveUtil], {
    /**
     * @protected
     *
     * Draws the series.
     *
     * @method drawSeries
     */
    drawSeries: function()
    {
        this.drawAreaSpline();
    }
}, {
	ATTRS : {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default areaSpline
         */
        type: {
            value:"areaSpline"
        }

        /**
         * Style properties used for drawing area fills. This attribute is inherited from `Renderer`. Below are the default values:
         *
         *  <dl>
         *      <dt>color</dt><dd>The color of the fill. The default value is determined by the order of the series on the graph. The color will be
         *      retrieved from the following array:
         *      `["#66007f", "#a86f41", "#295454", "#996ab2", "#e8cdb7", "#90bdbd","#000000","#c3b8ca", "#968373", "#678585"]`
         *      </dd>
         *      <dt>alpha</dt><dd>Number between 0 and 1 that indicates the opacity of the fill. The default value is 1</dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
    }
});



}, '3.16.0', {"requires": ["series-area", "series-curve-util"]});
