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
import U from '../../Utilities.js';
const { erase, extend, isNumber } = U;
/* *
 *
 *  Composition
 *
 * */
var PlotLineOrBandAxis;
(function (PlotLineOrBandAxis) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Variables
     *
     * */
    let PlotLineOrBandClass;
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Add a plot band after render time.
     *
     * @sample highcharts/members/axis-addplotband/
     *         Toggle the plot band from a button
     *
     * @function Highcharts.Axis#addPlotBand
     *
     * @param {Highcharts.AxisPlotBandsOptions} options
     * A configuration object for the plot band, as defined in
     * [xAxis.plotBands](https://api.highcharts.com/highcharts/xAxis.plotBands).
     *
     * @return {Highcharts.PlotLineOrBand|undefined}
     * The added plot band, or `undefined` if the options are not valid.
     */
    function addPlotBand(options) {
        return this.addPlotBandOrLine(options, 'plotBands');
    }
    /**
     * Add a plot band or plot line after render time. Called from
     * addPlotBand and addPlotLine internally.
     *
     * @private
     * @function Highcharts.Axis#addPlotBandOrLine
     * @param {Highcharts.AxisPlotBandsOptions|Highcharts.AxisPlotLinesOptions} options
     * The plotBand or plotLine configuration object.
     */
    function addPlotBandOrLine(options, coll) {
        const userOptions = this.userOptions;
        let obj = new PlotLineOrBandClass(this, options);
        if (this.visible) {
            obj = obj.render();
        }
        if (obj) { // #2189
            if (!this._addedPlotLB) {
                this._addedPlotLB = true;
                (userOptions.plotLines || [])
                    .concat(userOptions.plotBands || [])
                    .forEach((plotLineOptions) => {
                    this.addPlotBandOrLine(plotLineOptions);
                });
            }
            // Add it to the user options for exporting and Axis.update
            if (coll) {
                // Workaround Microsoft/TypeScript issue #32693
                const updatedOptions = (userOptions[coll] || []);
                updatedOptions.push(options);
                userOptions[coll] = updatedOptions;
            }
            this.plotLinesAndBands.push(obj);
        }
        return obj;
    }
    /**
     * Add a plot line after render time.
     *
     * @sample highcharts/members/axis-addplotline/
     *         Toggle the plot line from a button
     *
     * @function Highcharts.Axis#addPlotLine
     *
     * @param {Highcharts.AxisPlotLinesOptions} options
     * A configuration object for the plot line, as defined in
     * [xAxis.plotLines](https://api.highcharts.com/highcharts/xAxis.plotLines).
     *
     * @return {Highcharts.PlotLineOrBand|undefined}
     * The added plot line, or `undefined` if the options are not valid.
     */
    function addPlotLine(options) {
        return this.addPlotBandOrLine(options, 'plotLines');
    }
    /**
     * @private
     */
    function compose(PlotLineOrBandType, AxisClass) {
        const axisProto = AxisClass.prototype;
        if (!axisProto.addPlotBand) {
            PlotLineOrBandClass = PlotLineOrBandType;
            extend(axisProto, {
                addPlotBand,
                addPlotLine,
                addPlotBandOrLine,
                getPlotBandPath,
                removePlotBand,
                removePlotLine,
                removePlotBandOrLine
            });
        }
        return AxisClass;
    }
    PlotLineOrBandAxis.compose = compose;
    /**
     * Internal function to create the SVG path definition for a plot band.
     *
     * @function Highcharts.Axis#getPlotBandPath
     *
     * @param {number} from
     * The axis value to start from.
     *
     * @param {number} to
     * The axis value to end on.
     *
     * @param {Highcharts.AxisPlotBandsOptions|Highcharts.AxisPlotLinesOptions} options
     * The plotBand or plotLine configuration object.
     *
     * @return {Highcharts.SVGPathArray}
     * The SVG path definition in array form.
     */
    function getPlotBandPath(from, to, options) {
        options = options || this.options;
        const toPath = this.getPlotLinePath({
            value: to,
            force: true,
            acrossPanes: options.acrossPanes
        }), result = [], horiz = this.horiz, outside = !isNumber(this.min) ||
            !isNumber(this.max) ||
            (from < this.min && to < this.min) ||
            (from > this.max && to > this.max), path = this.getPlotLinePath({
            value: from,
            force: true,
            acrossPanes: options.acrossPanes
        });
        let i, 
        // #4964 check if chart is inverted or plotband is on yAxis
        plus = 1, isFlat;
        if (path && toPath) {
            // Flat paths don't need labels (#3836)
            if (outside) {
                isFlat = path.toString() === toPath.toString();
                plus = 0;
            }
            // Go over each subpath - for panes in Highcharts Stock
            for (i = 0; i < path.length; i += 2) {
                const pathStart = path[i], pathEnd = path[i + 1], toPathStart = toPath[i], toPathEnd = toPath[i + 1];
                // Type checking all affected path segments. Consider
                // something smarter.
                if ((pathStart[0] === 'M' || pathStart[0] === 'L') &&
                    (pathEnd[0] === 'M' || pathEnd[0] === 'L') &&
                    (toPathStart[0] === 'M' || toPathStart[0] === 'L') &&
                    (toPathEnd[0] === 'M' || toPathEnd[0] === 'L')) {
                    // Add 1 pixel when coordinates are the same
                    if (horiz && toPathStart[1] === pathStart[1]) {
                        toPathStart[1] += plus;
                        toPathEnd[1] += plus;
                    }
                    else if (!horiz && toPathStart[2] === pathStart[2]) {
                        toPathStart[2] += plus;
                        toPathEnd[2] += plus;
                    }
                    result.push(['M', pathStart[1], pathStart[2]], ['L', pathEnd[1], pathEnd[2]], ['L', toPathEnd[1], toPathEnd[2]], ['L', toPathStart[1], toPathStart[2]], ['Z']);
                }
                result.isFlat = isFlat;
            }
        }
        return result;
    }
    /**
     * Remove a plot band by its id.
     *
     * @sample highcharts/members/axis-removeplotband/
     *         Remove plot band by id
     * @sample highcharts/members/axis-addplotband/
     *         Toggle the plot band from a button
     *
     * @function Highcharts.Axis#removePlotBand
     *
     * @param {string} id
     *        The plot band's `id` as given in the original configuration
     *        object or in the `addPlotBand` option.
     */
    function removePlotBand(id) {
        this.removePlotBandOrLine(id);
    }
    /**
     * Remove a plot band or plot line from the chart by id. Called
     * internally from `removePlotBand` and `removePlotLine`.
     * @private
     * @function Highcharts.Axis#removePlotBandOrLine
     */
    function removePlotBandOrLine(id) {
        const plotLinesAndBands = this.plotLinesAndBands, options = this.options, userOptions = this.userOptions;
        if (plotLinesAndBands) { // #15639
            let i = plotLinesAndBands.length;
            while (i--) {
                if (plotLinesAndBands[i].id === id) {
                    plotLinesAndBands[i].destroy();
                }
            }
            ([
                options.plotLines || [],
                userOptions.plotLines || [],
                options.plotBands || [],
                userOptions.plotBands || []
            ]).forEach(function (arr) {
                i = arr.length;
                while (i--) {
                    if ((arr[i] || {}).id === id) {
                        erase(arr, arr[i]);
                    }
                }
            });
        }
    }
    /**
     * Remove a plot line by its id.
     *
     * @sample highcharts/xaxis/plotlines-id/
     *         Remove plot line by id
     * @sample highcharts/members/axis-addplotline/
     *         Toggle the plot line from a button
     *
     * @function Highcharts.Axis#removePlotLine
     *
     * @param {string} id
     *        The plot line's `id` as given in the original configuration
     *        object or in the `addPlotLine` option.
     */
    function removePlotLine(id) {
        this.removePlotBandOrLine(id);
    }
})(PlotLineOrBandAxis || (PlotLineOrBandAxis = {}));
/* *
 *
 *  Default Export
 *
 * */
export default PlotLineOrBandAxis;
