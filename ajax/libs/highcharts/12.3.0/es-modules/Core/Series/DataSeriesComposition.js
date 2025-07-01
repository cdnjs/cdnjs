/* *
 *
 *  (c) 2020-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */
'use strict';
import DataTable from '../../Data/DataTable.js';
import H from '../Globals.js';
const { composed } = H;
import U from '../Utilities.js';
const { addEvent, fireEvent, isNumber, merge, pushUnique, wrap } = U;
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function wrapSeriesGeneratePoints(proceed) {
    if (this.hasGroupedData) {
        return proceed.call(this);
    }
    const PointClass = this.pointClass, cropStart = this.cropStart || 0, data = this.data || [], points = [], processedXData = this.getColumn('x', true), processedYData = this.getColumn('y', true);
    let cursor, point;
    for (let i = 0, iEnd = processedXData.length; i < iEnd; ++i) {
        cursor = cropStart + i;
        point = data[cursor];
        if (!point) {
            point = data[cursor] = new PointClass(this, processedYData[cursor], processedXData[i]);
        }
        point.index = cursor;
        points[i] = point;
    }
    this.data = data;
    this.points = points;
    fireEvent(this, 'afterGeneratePoints');
}
/**
 * @private
 */
function wrapSeriesSetData(proceed, data = [], redraw = true, animation) {
    const datas = this.datas;
    if (this.hasGroupedData || !this.options.dataAsColumns) {
        return proceed.call(this, data, redraw, animation);
    }
    data = this.options.data = this.userOptions.data = (this.chart.options.chart.allowMutatingData ?
        (data || []) :
        merge(true, data));
    const columns = {}, keys = (this.options.keys || this.parallelArrays).slice();
    if (isNumber(data[0]) || keys.length === 1) {
        // First column is implicit index
        const xData = columns.x = [];
        for (let i = 0, iEnd = data.length; i < iEnd; ++i) {
            xData.push(this.autoIncrement());
        }
        columns[keys[1] || 'y'] = data;
    }
    else {
        if (keys.indexOf('x') === -1 && keys.length > data.length) {
            // First column is implicit index
            const xData = columns.x = [];
            for (let i = 0, iEnd = data.length; i < iEnd; ++i) {
                xData.push(this.autoIncrement());
            }
        }
        for (let i = 0, iEnd = Math.min(data.length, keys.length); i < iEnd; ++i) {
            if (data[i] instanceof Array) {
                columns[keys[i]] = data[i];
            }
        }
    }
    datas.setTable(new DataTable({ columns, id: this.name }));
}
/* *
 *
 *  Class
 *
 * */
class DataSeriesAdditions {
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * @private
     */
    static compose(SeriesClass) {
        if (pushUnique(composed, 'Core.DataSeries')) {
            const seriesProto = SeriesClass.prototype;
            addEvent(SeriesClass, 'init', function () {
                this.datas = new DataSeriesAdditions(this);
            });
            wrap(seriesProto, 'generatePoints', wrapSeriesGeneratePoints);
            wrap(seriesProto, 'setData', wrapSeriesSetData);
        }
    }
    /* *
     *
     *  Constructor
     *
     * */
    constructor(series) {
        this.unlisteners = [];
        const columns = {}, keys = series.parallelArrays;
        for (let i = 0, iEnd = keys.length; i < iEnd; ++i) {
            columns[keys[i]] = [];
        }
        this.series = series;
        this.table = new DataTable();
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Triggers processing and redrawing
     * @private
     */
    processTable(redraw, animation) {
        const series = this.series;
        if (series.options.legendType === 'point') {
            series.processData();
            series.generatePoints();
        }
        if (redraw) {
            const chart = series.chart;
            series.isDirty = chart.isDirtyBox = true;
            series.isDirtyData = true;
            chart.redraw(animation);
        }
    }
    /**
     * Experimental integration of the data layer
     * @private
     */
    setTable(table, redraw = true, animation) {
        const series = this.series, anySeries = series, oldData = series.points, keys = series.parallelArrays, rowCount = table.getRowCount();
        let key;
        if (oldData) {
            const xAxis = series.xAxis;
            series.colorCounter = 0;
            series.data = [];
            delete anySeries.points;
            delete anySeries.processedXData;
            delete anySeries.processedYData;
            delete anySeries.xIncrement;
            for (let i = 0, iEnd = keys.length; i < iEnd; ++i) {
                key = keys[i];
                anySeries[`${key}Data`] = [];
            }
            for (let i = 0, iEnd = oldData.length; i < iEnd; ++i) {
                if (oldData[i] && !!oldData[i].destroy) {
                    oldData[i].destroy();
                }
            }
            if (xAxis) {
                xAxis.minRange = xAxis.userMinRange;
            }
        }
        let column, failure = false, indexAsX = false;
        for (let i = 0, iEnd = keys.length; i < iEnd; ++i) {
            key = keys[i];
            column = table.getColumn(key, true);
            if (!column) {
                if (key === 'x') {
                    indexAsX = true;
                    continue;
                }
                else {
                    failure = true;
                    break;
                }
            }
            anySeries[`${key}Data`] = column;
        }
        if (failure) {
            // Fallback to index
            const columnNames = table.getColumnNames(), emptyColumn = [];
            emptyColumn.length = rowCount;
            let columnOffset = 0;
            if (columnNames.length === keys.length - 1) {
                // Table index becomes x
                columnOffset = 1;
                indexAsX = true;
            }
            for (let i = columnOffset, iEnd = keys.length; i < iEnd; ++i) {
                column = table.getColumn(columnNames[i], true);
                key = keys[i];
                anySeries[`${key}Data`] = column || emptyColumn.slice();
            }
        }
        this.indexAsX = indexAsX;
        if (indexAsX && keys.indexOf('x') !== -1) {
            column = [];
            for (let x = 0; x < rowCount; ++x) {
                column.push(series.autoIncrement());
            }
            anySeries.xData = column;
        }
        this.syncOff();
        this.table = table;
        if (redraw) {
            this.syncOn();
        }
        this.processTable(redraw, oldData && animation);
    }
    /**
     * Stops synchronisation of table changes with series.
     * @private
     */
    syncOff() {
        const unlisteners = this.unlisteners;
        for (let i = 0, iEnd = unlisteners.length; i < iEnd; ++i) {
            unlisteners[i]();
        }
        unlisteners.length = 0;
    }
    /**
     * Activates synchronization of table changes with series.
     * @private
     */
    syncOn() {
        if (this.unlisteners.length) {
            return;
        }
        const series = this.series, table = this.table, anySeries = series, onChange = (e) => {
            if (e.type === 'afterDeleteColumns') {
                // Deletion affects all points
                this.setTable(table, true);
                return;
            }
            if (e.type === 'afterDeleteRows') {
                if (e.rowIndex > 0 &&
                    e.rowIndex + e.rowCount < series.points.length) {
                    // Deletion affects trailing points
                    this.setTable(table, true);
                    return;
                }
                for (let i = e.rowIndex, iEnd = i + e.rowCount; i < iEnd; ++i) {
                    series.removePoint(i, false);
                }
            }
            if (this.indexAsX) {
                if (e.type === 'afterSetCell') {
                    anySeries.xData[e.rowIndex] = e.rowIndex;
                }
                else if (e.type === 'afterSetRows') {
                    for (let i = e.rowIndex, iEnd = i + e.rowCount; i < iEnd; ++i) {
                        anySeries.xData[i] = series.autoIncrement();
                    }
                }
            }
            this.processTable(true);
        };
        this.unlisteners.push(table.on('afterDeleteColumns', onChange), table.on('afterDeleteRows', onChange), table.on('afterSetCell', onChange), table.on('afterSetRows', onChange));
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default DataSeriesAdditions;
/* *
 *
 *  API Options
 *
 * */
/* *
 * Indicates data is structured as columns instead of rows.
 *
 * @type      {boolean}
 * @since     Future
 * @apioption plotOptions.series.dataAsColumns
 */
(''); // Keeps doclets above in JS file
