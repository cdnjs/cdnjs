/* *
 *
 *  Imports
 *
 * */
import DataTable from './DataTable.js';
import U from '../Core/Utilities.js';
var addEvent = U.addEvent, fireEvent = U.fireEvent, isNumber = U.isNumber, merge = U.merge, wrap = U.wrap;
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
/**
 * @private
 */
function wrapSeriesGeneratePoints(proceed) {
    if (this.hasGroupedData) {
        return proceed.call(this);
    }
    var PointClass = this.pointClass, cropStart = this.cropStart || 0, data = this.data || [], points = [], processedXData = this.processedXData, processedYData = this.processedYData;
    var cursor, point;
    for (var i = 0, iEnd = processedXData.length; i < iEnd; ++i) {
        cursor = cropStart + i;
        point = data[cursor];
        if (!point) {
            point = data[cursor] = (new PointClass()).init(this, processedYData[cursor], processedXData[i]);
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
function wrapSeriesSetData(proceed, data, redraw, animation) {
    if (data === void 0) { data = []; }
    if (redraw === void 0) { redraw = true; }
    var datas = this.datas;
    if (this.hasGroupedData || !this.options.dataAsColumns) {
        return proceed.call(this, data, redraw, animation);
    }
    data = this.options.data = this.userOptions.data = (this.chart.options.chart.allowMutatingData ?
        (data || []) :
        merge(true, data));
    var columns = {}, keys = (this.options.keys || this.parallelArrays).slice();
    if (isNumber(data[0]) || keys.length === 1) {
        // first column is implicit index
        var xData = columns.x = [];
        for (var i = 0, iEnd = data.length; i < iEnd; ++i) {
            xData.push(this.autoIncrement());
        }
        columns[keys[1] || 'y'] = data;
    }
    else {
        if (keys.indexOf('x') === -1 && keys.length > data.length) {
            // first column is implicit index
            var xData = columns.x = [];
            for (var i = 0, iEnd = data.length; i < iEnd; ++i) {
                xData.push(this.autoIncrement());
            }
        }
        for (var i = 0, iEnd = Math.min(data.length, keys.length); i < iEnd; ++i) {
            if (data[i] instanceof Array) {
                columns[keys[i]] = data[i];
            }
        }
    }
    datas.setTable(new DataTable(columns, this.name));
}
/* *
 *
 *  Class
 *
 * */
var DataSeriesAdditions = /** @class */ (function () {
    /* *
     *
     *  Constructor
     *
     * */
    function DataSeriesAdditions(series) {
        this.unlisteners = [];
        var columns = {}, keys = series.parallelArrays;
        for (var i = 0, iEnd = keys.length; i < iEnd; ++i) {
            columns[keys[i]] = [];
        }
        this.series = series;
        this.table = new DataTable();
    }
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * @private
     */
    DataSeriesAdditions.compose = function (SeriesClass) {
        if (composedClasses.indexOf(SeriesClass) === -1) {
            composedClasses.push(SeriesClass);
            addEvent(SeriesClass, 'init', function () {
                this.datas = new DataSeriesAdditions(this);
            });
            var seriesProto = SeriesClass.prototype;
            wrap(seriesProto, 'generatePoints', wrapSeriesGeneratePoints);
            wrap(seriesProto, 'setData', wrapSeriesSetData);
        }
    };
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Triggers processing and redrawing
     * @private
     */
    DataSeriesAdditions.prototype.processTable = function (redraw, animation) {
        var series = this.series;
        if (series.options.legendType === 'point') {
            series.processData();
            series.generatePoints();
        }
        if (redraw) {
            var chart = series.chart;
            series.isDirty = chart.isDirtyBox = true;
            series.isDirtyData = true;
            chart.redraw(animation);
        }
    };
    /**
     * Experimental integration of the data layer
     * @private
     */
    DataSeriesAdditions.prototype.setTable = function (table, redraw, animation) {
        if (redraw === void 0) { redraw = true; }
        var series = this.series, anySeries = series, oldData = series.points, keys = series.parallelArrays, rowCount = table.getRowCount();
        var key;
        if (oldData) {
            var xAxis = series.xAxis;
            series.colorCounter = 0;
            series.data = [];
            delete anySeries.points;
            delete anySeries.processedXData;
            delete anySeries.processedYData;
            delete anySeries.xIncrement;
            for (var i = 0, iEnd = keys.length; i < iEnd; ++i) {
                key = keys[i];
                anySeries["".concat(key, "Data")] = [];
            }
            for (var i = 0, iEnd = oldData.length; i < iEnd; ++i) {
                if (oldData[i] && (oldData[i].destroy)) {
                    oldData[i].destroy();
                }
            }
            if (xAxis) {
                xAxis.minRange = xAxis.userMinRange;
            }
        }
        var column, failure = false, indexAsX = false;
        for (var i = 0, iEnd = keys.length; i < iEnd; ++i) {
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
            anySeries["".concat(key, "Data")] = column;
        }
        if (failure) {
            // fallback to index
            var columnNames = table.getColumnNames(), emptyColumn = [];
            emptyColumn.length = rowCount;
            var columnOffset = 0;
            if (columnNames.length === keys.length - 1) {
                // table index becomes x
                columnOffset = 1;
                indexAsX = true;
            }
            for (var i = columnOffset, iEnd = keys.length; i < iEnd; ++i) {
                column = table.getColumn(columnNames[i], true);
                key = keys[i];
                anySeries["".concat(key, "Data")] = column || emptyColumn.slice();
            }
        }
        this.indexAsX = indexAsX;
        if (indexAsX && keys.indexOf('x') !== -1) {
            column = [];
            for (var x = 0; x < rowCount; ++x) {
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
    };
    /**
     * Stops synchronisation of table changes with series.
     * @private
     */
    DataSeriesAdditions.prototype.syncOff = function () {
        var unlisteners = this.unlisteners;
        for (var i = 0, iEnd = unlisteners.length; i < iEnd; ++i) {
            unlisteners[i]();
        }
        unlisteners.length = 0;
    };
    /**
     * Activates synchronization of table changes with series.
     * @private
     */
    DataSeriesAdditions.prototype.syncOn = function () {
        var _this = this;
        if (this.unlisteners.length) {
            return;
        }
        var series = this.series, table = this.table, anySeries = series, onChange = function (e) {
            if (e.type === 'afterDeleteColumns') {
                // deletion affects all points
                _this.setTable(table, true);
                return;
            }
            if (e.type === 'afterDeleteRows') {
                if (e.rowIndex > 0 &&
                    e.rowIndex + e.rowCount < series.points.length) {
                    // deletion affects trailing points
                    _this.setTable(table, true);
                    return;
                }
                for (var i = e.rowIndex, iEnd = i + e.rowCount; i < iEnd; ++i) {
                    series.removePoint(i, false);
                }
            }
            if (_this.indexAsX) {
                if (e.type === 'afterSetCell') {
                    anySeries.xData[e.rowIndex] = e.rowIndex;
                }
                else if (e.type === 'afterSetRows') {
                    for (var i = e.rowIndex, iEnd = i + e.rowCount; i < iEnd; ++i) {
                        anySeries.xData[i] = series.autoIncrement();
                    }
                }
            }
            _this.processTable(true);
        };
        this.unlisteners.push(table.on('afterDeleteColumns', onChange), table.on('afterDeleteRows', onChange), table.on('afterSetCell', onChange), table.on('afterSetRows', onChange));
    };
    return DataSeriesAdditions;
}());
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
 * @requires  es-modules/Data/DataSeriesComposition.js
 *
 * @type      {boolean}
 * @since     Future
 * @apioption plotOptions.series.dataAsColumns
 */
(''); // keeps doclets above in JS file
