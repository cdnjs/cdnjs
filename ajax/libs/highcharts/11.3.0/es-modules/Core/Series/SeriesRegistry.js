/* *
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import H from '../Globals.js';
import D from '../Defaults.js';
const { defaultOptions } = D;
import Point from './Point.js';
import U from '../Utilities.js';
const { extendClass, merge } = U;
/* *
 *
 *  Namespace
 *
 * */
var SeriesRegistry;
(function (SeriesRegistry) {
    /* *
     *
     *  Properties
     *
     * */
    /**
     * @internal
     * @todo Move `Globals.seriesTypes` code to her.
     */
    SeriesRegistry.seriesTypes = H.seriesTypes;
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Registers class pattern of a series.
     *
     * @private
     */
    function registerSeriesType(seriesType, SeriesClass) {
        const defaultPlotOptions = defaultOptions.plotOptions || {}, seriesOptions = SeriesClass.defaultOptions, seriesProto = SeriesClass.prototype;
        seriesProto.type = seriesType;
        if (!seriesProto.pointClass) {
            seriesProto.pointClass = Point;
        }
        if (seriesOptions) {
            defaultPlotOptions[seriesType] = seriesOptions;
        }
        SeriesRegistry.seriesTypes[seriesType] = SeriesClass;
    }
    SeriesRegistry.registerSeriesType = registerSeriesType;
    /**
     * Old factory to create new series prototypes.
     *
     * @deprecated
     * @function Highcharts.seriesType
     *
     * @param {string} type
     * The series type name.
     *
     * @param {string} parent
     * The parent series type name. Use `line` to inherit from the basic
     * {@link Series} object.
     *
     * @param {Highcharts.SeriesOptionsType|Highcharts.Dictionary<*>} options
     * The additional default options that are merged with the parent's options.
     *
     * @param {Highcharts.Dictionary<*>} [props]
     * The properties (functions and primitives) to set on the new prototype.
     *
     * @param {Highcharts.Dictionary<*>} [pointProps]
     * Members for a series-specific extension of the {@link Point} prototype if
     * needed.
     *
     * @return {Highcharts.Series}
     * The newly created prototype as extended from {@link Series} or its
     * derivatives.
     */
    function seriesType(type, parent, options, seriesProto, pointProto) {
        const defaultPlotOptions = defaultOptions.plotOptions || {};
        parent = parent || '';
        // Merge the options
        defaultPlotOptions[type] = merge(defaultPlotOptions[parent], options);
        // Create the class
        registerSeriesType(type, extendClass(SeriesRegistry.seriesTypes[parent] || function () { }, seriesProto));
        SeriesRegistry.seriesTypes[type].prototype.type = type;
        // Create the point class if needed
        if (pointProto) {
            SeriesRegistry.seriesTypes[type].prototype.pointClass = extendClass(Point, pointProto);
        }
        return SeriesRegistry.seriesTypes[type];
    }
    SeriesRegistry.seriesType = seriesType;
})(SeriesRegistry || (SeriesRegistry = {}));
/* *
 *
 *  Default Export
 *
 * */
export default SeriesRegistry;
