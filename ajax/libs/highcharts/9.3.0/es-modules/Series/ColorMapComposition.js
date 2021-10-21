/* *
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import U from '../Core/Utilities.js';
var defined = U.defined, wrap = U.wrap;
/**
 * @private
 * @mixin Highcharts.colorMapSeriesMixin
 */
var colorMapSeriesMixinOld = {
    pointArrayMap: ['value'],
    axisTypes: ['xAxis', 'yAxis', 'colorAxis'],
    trackerGroups: ['group', 'markerGroup', 'dataLabelsGroup'],
    // getSymbol: noop,
    parallelArrays: ['x', 'y', 'value'],
    colorKey: 'value'
    // pointAttribs: seriesTypes.column.prototype.pointAttribs,
    /* eslint-disable valid-jsdoc */
};
/* *
 *
 *  Composition
 *
 * */
var ColorMapComposition;
(function (ColorMapComposition) {
    ColorMapComposition.colorMapSeriesMixin = colorMapSeriesMixinOld;
    /* *
     *
     *  Constants
     *
     * */
    var composedClasses = [];
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * @private
     */
    function compose(SeriesClass, PointClass) {
        if (PointClass && composedClasses.indexOf(PointClass) === -1) {
            composedClasses.push(PointClass);
            var pointProto = PointClass.prototype;
            pointProto.dataLabelOnNull = true;
            pointProto.moveToTopOnHover = true;
            pointProto.isValid = pointIsValid;
        }
        if (composedClasses.indexOf(SeriesClass) === -1) {
            composedClasses.push(SeriesClass);
            var seriesProto = SeriesClass.prototype;
            seriesProto.colorAttribs = seriesColorAttribs;
            wrap(seriesProto, 'pointAttribs', seriesWrapPointAttribs);
        }
        return SeriesClass;
    }
    ColorMapComposition.compose = compose;
    /**
     * Color points have a value option that determines whether or not it is
     * a null point
     * @private
     */
    function pointIsValid() {
        // undefined is allowed
        return (this.value !== null &&
            this.value !== Infinity &&
            this.value !== -Infinity);
    }
    /**
     * Get the color attibutes to apply on the graphic
     * @private
     */
    function seriesColorAttribs(point) {
        var ret = {};
        if (defined(point.color) &&
            (!point.state || point.state === 'normal') // #15746
        ) {
            ret[this.colorProp || 'fill'] = point.color;
        }
        return ret;
    }
    ColorMapComposition.seriesColorAttribs = seriesColorAttribs;
    /**
     * Move points to the top of the z-index order when hovered
     * @private
     */
    function seriesWrapPointAttribs(original, point, state) {
        var attribs = original.call(this, point, state);
        if (point.moveToTopOnHover) {
            attribs.zIndex = state === 'hover' ? 1 : 0;
        }
        return attribs;
    }
})(ColorMapComposition || (ColorMapComposition = {}));
/* *
 *
 *  Default Export
 *
 * */
export default ColorMapComposition;
