/**
 * @license Highstock JS v12.1.2 (2024-12-21)
 * @module highcharts/modules/datagrouping
 * @requires highcharts
 *
 * Data grouping module
 *
 * (c) 2010-2024 Torstein Hønsi
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"], root["_Highcharts"]["Templating"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/modules/datagrouping", ["highcharts/highcharts"], function (amd1) {return factory(amd1,amd1["SeriesRegistry"],amd1["Templating"]);});
	else if(typeof exports === 'object')
		exports["highcharts/modules/datagrouping"] = factory(root["_Highcharts"], root["_Highcharts"]["SeriesRegistry"], root["_Highcharts"]["Templating"]);
	else
		root["Highcharts"] = factory(root["Highcharts"], root["Highcharts"]["SeriesRegistry"], root["Highcharts"]["Templating"]);
})(typeof window === 'undefined' ? this : window, (__WEBPACK_EXTERNAL_MODULE__944__, __WEBPACK_EXTERNAL_MODULE__512__, __WEBPACK_EXTERNAL_MODULE__984__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 512:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__512__;

/***/ }),

/***/ 984:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__984__;

/***/ }),

/***/ 944:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__944__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ datagrouping_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
;// ./code/es-modules/Extensions/DataGrouping/ApproximationRegistry.js
/* *
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  Constants
 *
 * */
/**
 * Define the available approximation types. The data grouping
 * approximations takes an array or numbers as the first parameter. In case
 * of ohlc, four arrays are sent in as four parameters. Each array consists
 * only of numbers. In case null values belong to the group, the property
 * .hasNulls will be set to true on the array.
 *
 * @product highstock
 *
 * @private
 */
const ApproximationRegistry = {
// Approximations added programmatically
};
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const DataGrouping_ApproximationRegistry = (ApproximationRegistry);

;// ./code/es-modules/Extensions/DataGrouping/ApproximationDefaults.js
/* *
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { arrayMax, arrayMin, correctFloat, extend, isNumber } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function average(arr) {
    const len = arr.length;
    let ret = sum(arr);
    // If we have a number, return it divided by the length. If not,
    // return null or undefined based on what the sum method finds.
    if (isNumber(ret) && len) {
        ret = correctFloat(ret / len);
    }
    return ret;
}
/**
 * The same as average, but for series with multiple values, like area ranges.
 * @private
 */
function averages() {
    const ret = [];
    [].forEach.call(arguments, function (arr) {
        ret.push(average(arr));
    });
    // Return undefined when first elem. is undefined and let
    // sum method handle null (#7377)
    return typeof ret[0] === 'undefined' ? void 0 : ret;
}
/**
 * @private
 */
function ApproximationDefaults_close(arr) {
    return arr.length ?
        arr[arr.length - 1] :
        (arr.hasNulls ? null : void 0);
}
/**
 * @private
 */
function high(arr) {
    return arr.length ?
        arrayMax(arr) :
        (arr.hasNulls ? null : void 0);
}
/**
 * HLC, OHLC and range are special cases where a multidimensional array is input
 * and an array is output.
 * @private
 */
function hlc(high, low, close) {
    high = DataGrouping_ApproximationRegistry.high(high);
    low = DataGrouping_ApproximationRegistry.low(low);
    close = DataGrouping_ApproximationRegistry.close(close);
    if (isNumber(high) ||
        isNumber(low) ||
        isNumber(close)) {
        return [high, low, close];
    }
}
/**
 * @private
 */
function low(arr) {
    return arr.length ?
        arrayMin(arr) :
        (arr.hasNulls ? null : void 0);
}
/**
 * @private
 */
function ohlc(open, high, low, close) {
    open = DataGrouping_ApproximationRegistry.open(open);
    high = DataGrouping_ApproximationRegistry.high(high);
    low = DataGrouping_ApproximationRegistry.low(low);
    close = DataGrouping_ApproximationRegistry.close(close);
    if (isNumber(open) ||
        isNumber(high) ||
        isNumber(low) ||
        isNumber(close)) {
        return [open, high, low, close];
    }
}
/**
 * @private
 */
function ApproximationDefaults_open(arr) {
    return arr.length ? arr[0] : (arr.hasNulls ? null : void 0);
}
/**
 * @private
 */
function range(low, high) {
    low = DataGrouping_ApproximationRegistry.low(low);
    high = DataGrouping_ApproximationRegistry.high(high);
    if (isNumber(low) || isNumber(high)) {
        return [low, high];
    }
    if (low === null && high === null) {
        return null;
    }
    // Else, return is undefined
}
/**
 * @private
 */
function sum(arr) {
    let len = arr.length, ret;
    // 1. it consists of nulls exclusive
    if (!len && arr.hasNulls) {
        ret = null;
        // 2. it has a length and real values
    }
    else if (len) {
        ret = 0;
        while (len--) {
            ret += arr[len];
        }
    }
    // 3. it has zero length, so just return undefined
    // => doNothing()
    return ret;
}
/* *
 *
 *  Default Export
 *
 * */
const ApproximationDefaults = {
    average,
    averages,
    close: ApproximationDefaults_close,
    high,
    hlc,
    low,
    ohlc,
    open: ApproximationDefaults_open,
    range,
    sum
};
extend(DataGrouping_ApproximationRegistry, ApproximationDefaults);
/* harmony default export */ const DataGrouping_ApproximationDefaults = (ApproximationDefaults);

;// ./code/es-modules/Extensions/DataGrouping/DataGroupingDefaults.js
/* *
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  Constants
 *
 * */
/**
 * Common options
 * @private
 */
const common = {
    /// enabled: null, // (true for stock charts, false for basic),
    // forced: undefined,
    groupPixelWidth: 2,
    // The first one is the point or start value, the second is the start
    // value if we're dealing with range, the third one is the end value if
    // dealing with a range
    dateTimeLabelFormats: {
        millisecond: [
            '%[AebHMSL]',
            '%[AebHMSL]',
            '-%[HMSL]'
        ],
        second: [
            '%[AebHMS]',
            '%[AebHMS]',
            '-%[HMS]'
        ],
        minute: [
            '%[AebHM]',
            '%[AebHM]',
            '-%[HM]'
        ],
        hour: [
            '%[AebHM]',
            '%[AebHM]',
            '-%[HM]'
        ],
        day: [
            '%[AebY]',
            '%[Aeb]',
            '-%[AebY]'
        ],
        week: [
            'week from %[AebY]',
            '%[Aeb]',
            '-%[AebY]'
        ],
        month: [
            '%[BY]',
            '%[B]',
            '-%[BY]'
        ],
        year: [
            '%Y',
            '%Y',
            '-%Y'
        ]
    }
    /// smoothed = false, // enable this for navigator series only
};
/**
 * Extends common options
 * @private
 */
const seriesSpecific = {
    line: {},
    spline: {},
    area: {},
    areaspline: {},
    arearange: {},
    column: {
        groupPixelWidth: 10
    },
    columnrange: {
        groupPixelWidth: 10
    },
    candlestick: {
        groupPixelWidth: 10
    },
    ohlc: {
        groupPixelWidth: 5
    },
    hlc: {
        groupPixelWidth: 5
        // Move to HeikinAshiSeries.ts after refactoring data grouping.
    },
    heikinashi: {
        groupPixelWidth: 10
    }
};
/**
 * Units are defined in a separate array to allow complete overriding in
 * case of a user option.
 * @private
 */
const units = [
    [
        'millisecond', // Unit name
        [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // Allowed multiples
    ], [
        'second',
        [1, 2, 5, 10, 15, 30]
    ], [
        'minute',
        [1, 2, 5, 10, 15, 30]
    ], [
        'hour',
        [1, 2, 3, 4, 6, 8, 12]
    ], [
        'day',
        [1]
    ], [
        'week',
        [1]
    ], [
        'month',
        [1, 3, 6]
    ], [
        'year',
        null
    ]
];
/* *
 *
 *  Default Export
 *
 * */
const DataGroupingDefaults = {
    common,
    seriesSpecific,
    units
};
/* harmony default export */ const DataGrouping_DataGroupingDefaults = (DataGroupingDefaults);

;// ./code/es-modules/Extensions/DataGrouping/DataGroupingAxisComposition.js
/* *
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { addEvent, extend: DataGroupingAxisComposition_extend, merge, pick } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Variables
 *
 * */
let AxisConstructor;
/* *
 *
 *  Functions
 *
 * */
/**
 * Check the groupPixelWidth and apply the grouping if needed.
 * Fired only after processing the data.
 *
 * @product highstock
 *
 * @function Highcharts.Axis#applyGrouping
 */
function applyGrouping(e) {
    const axis = this, series = axis.series;
    // Reset the groupPixelWidth for all series, #17141.
    series.forEach(function (series) {
        series.groupPixelWidth = void 0; // #2110
    });
    series.forEach(function (series) {
        series.groupPixelWidth = (axis.getGroupPixelWidth &&
            axis.getGroupPixelWidth());
        if (series.groupPixelWidth) {
            series.hasProcessed = true; // #2692
        }
        // Fire independing on series.groupPixelWidth to always set a proper
        // dataGrouping state, (#16238)
        series.applyGrouping(!!e.hasExtremesChanged);
    });
}
/**
 * @private
 */
function compose(AxisClass) {
    AxisConstructor = AxisClass;
    const axisProto = AxisClass.prototype;
    if (!axisProto.applyGrouping) {
        addEvent(AxisClass, 'afterSetScale', onAfterSetScale);
        // When all series are processed, calculate the group pixel width and
        // then if this value is different than zero apply groupings.
        addEvent(AxisClass, 'postProcessData', applyGrouping);
        DataGroupingAxisComposition_extend(axisProto, {
            applyGrouping,
            getGroupPixelWidth,
            setDataGrouping
        });
    }
}
/**
 * Get the data grouping pixel width based on the greatest defined individual
 * width of the axis' series, and if whether one of the axes need grouping.
 * @private
 */
function getGroupPixelWidth() {
    const series = this.series;
    let i = series.length, groupPixelWidth = 0, doGrouping = false, dataLength, dgOptions;
    // If one of the series needs grouping, apply it to all (#1634)
    while (i--) {
        dgOptions = series[i].options.dataGrouping;
        if (dgOptions) { // #2692
            // If multiple series are compared on the same x axis, give them the
            // same group pixel width (#334)
            groupPixelWidth = Math.max(groupPixelWidth, 
            // Fallback to commonOptions (#9693)
            pick(dgOptions.groupPixelWidth, DataGrouping_DataGroupingDefaults.common.groupPixelWidth));
            dataLength = (series[i].dataTable.modified ||
                series[i].dataTable).rowCount;
            // Execute grouping if the amount of points is greater than the
            // limit defined in groupPixelWidth
            if (series[i].groupPixelWidth ||
                (dataLength >
                    (this.chart.plotSizeX / groupPixelWidth)) ||
                (dataLength && dgOptions.forced)) {
                doGrouping = true;
            }
        }
    }
    return doGrouping ? groupPixelWidth : 0;
}
/**
 * When resetting the scale reset the hasProcessed flag to avoid taking
 * previous data grouping of neighbour series into account when determining
 * group pixel width (#2692).
 * @private
 */
function onAfterSetScale() {
    this.series.forEach(function (series) {
        series.hasProcessed = false;
    });
}
/**
 * Highcharts Stock only. Force data grouping on all the axis' series.
 *
 * @product highstock
 *
 * @function Highcharts.Axis#setDataGrouping
 *
 * @param {boolean|Highcharts.DataGroupingOptionsObject} [dataGrouping]
 *        A `dataGrouping` configuration. Use `false` to disable data grouping
 *        dynamically.
 *
 * @param {boolean} [redraw=true]
 *        Whether to redraw the chart or wait for a later call to
 *        {@link Chart#redraw}.
 */
function setDataGrouping(dataGrouping, redraw) {
    const axis = this;
    let i;
    redraw = pick(redraw, true);
    if (!dataGrouping) {
        dataGrouping = {
            forced: false,
            units: null
        };
    }
    // Axis is instantiated, update all series
    if (this instanceof AxisConstructor) {
        i = this.series.length;
        while (i--) {
            this.series[i].update({
                dataGrouping: dataGrouping
            }, false);
        }
        // Axis not yet instantiated, alter series options
    }
    else {
        this.chart.options.series.forEach(function (seriesOptions) {
            // Merging dataGrouping options with already defined options #16759
            seriesOptions.dataGrouping = typeof dataGrouping === 'boolean' ?
                dataGrouping :
                merge(dataGrouping, seriesOptions.dataGrouping);
        });
    }
    // Clear ordinal slope, so we won't accidentally use the old one (#7827)
    if (axis.ordinal) {
        axis.ordinal.slope = void 0;
    }
    if (redraw) {
        this.chart.redraw();
    }
}
/* *
 *
 *  Default Export
 *
 * */
const DataGroupingAxisComposition = {
    compose
};
/* harmony default export */ const DataGrouping_DataGroupingAxisComposition = (DataGroupingAxisComposition);

;// ./code/es-modules/Data/DataTableCore.js
/* *
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *  - Gøran Slettemark
 *  - Torstein Hønsi
 *
 * */


const { fireEvent, isArray, objectEach, uniqueKey } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Class
 *
 * */
/**
 * Class to manage columns and rows in a table structure. It provides methods
 * to add, remove, and manipulate columns and rows, as well as to retrieve data
 * from specific cells.
 *
 * @class
 * @name Highcharts.DataTable
 *
 * @param {Highcharts.DataTableOptions} [options]
 * Options to initialize the new DataTable instance.
 */
class DataTableCore {
    /**
     * Constructs an instance of the DataTable class.
     *
     * @example
     * const dataTable = new Highcharts.DataTableCore({
     *   columns: {
     *     year: [2020, 2021, 2022, 2023],
     *     cost: [11, 13, 12, 14],
     *     revenue: [12, 15, 14, 18]
     *   }
     * });

     *
     * @param {Highcharts.DataTableOptions} [options]
     * Options to initialize the new DataTable instance.
     */
    constructor(options = {}) {
        /**
         * Whether the ID was automatic generated or given in the constructor.
         *
         * @name Highcharts.DataTable#autoId
         * @type {boolean}
         */
        this.autoId = !options.id;
        this.columns = {};
        /**
         * ID of the table for indentification purposes.
         *
         * @name Highcharts.DataTable#id
         * @type {string}
         */
        this.id = (options.id || uniqueKey());
        this.modified = this;
        this.rowCount = 0;
        this.versionTag = uniqueKey();
        let rowCount = 0;
        objectEach(options.columns || {}, (column, columnName) => {
            this.columns[columnName] = column.slice();
            rowCount = Math.max(rowCount, column.length);
        });
        this.applyRowCount(rowCount);
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Applies a row count to the table by setting the `rowCount` property and
     * adjusting the length of all columns.
     *
     * @private
     * @param {number} rowCount The new row count.
     */
    applyRowCount(rowCount) {
        this.rowCount = rowCount;
        objectEach(this.columns, (column) => {
            if (isArray(column)) { // Not on typed array
                column.length = rowCount;
            }
        });
    }
    /**
     * Fetches the given column by the canonical column name. Simplified version
     * of the full `DataTable.getRow` method, always returning by reference.
     *
     * @param {string} columnName
     * Name of the column to get.
     *
     * @return {Highcharts.DataTableColumn|undefined}
     * A copy of the column, or `undefined` if not found.
     */
    getColumn(columnName, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    asReference) {
        return this.columns[columnName];
    }
    /**
     * Retrieves all or the given columns. Simplified version of the full
     * `DataTable.getColumns` method, always returning by reference.
     *
     * @param {Array<string>} [columnNames]
     * Column names to retrieve.
     *
     * @return {Highcharts.DataTableColumnCollection}
     * Collection of columns. If a requested column was not found, it is
     * `undefined`.
     */
    getColumns(columnNames, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    asReference) {
        return (columnNames || Object.keys(this.columns)).reduce((columns, columnName) => {
            columns[columnName] = this.columns[columnName];
            return columns;
        }, {});
    }
    /**
     * Retrieves the row at a given index.
     *
     * @param {number} rowIndex
     * Row index to retrieve. First row has index 0.
     *
     * @param {Array<string>} [columnNames]
     * Column names to retrieve.
     *
     * @return {Record<string, number|string|undefined>|undefined}
     * Returns the row values, or `undefined` if not found.
     */
    getRow(rowIndex, columnNames) {
        return (columnNames || Object.keys(this.columns)).map((key) => this.columns[key]?.[rowIndex]);
    }
    /**
     * Sets cell values for a column. Will insert a new column, if not found.
     *
     * @param {string} columnName
     * Column name to set.
     *
     * @param {Highcharts.DataTableColumn} [column]
     * Values to set in the column.
     *
     * @param {number} [rowIndex=0]
     * Index of the first row to change. (Default: 0)
     *
     * @param {Record<string, (boolean|number|string|null|undefined)>} [eventDetail]
     * Custom information for pending events.
     *
     * @emits #setColumns
     * @emits #afterSetColumns
     */
    setColumn(columnName, column = [], rowIndex = 0, eventDetail) {
        this.setColumns({ [columnName]: column }, rowIndex, eventDetail);
    }
    /**
     * * Sets cell values for multiple columns. Will insert new columns, if not
     * found. Simplified version of the full `DataTable.setColumns`, limited to
     * full replacement of the columns (undefined `rowIndex`).
     *
     * @param {Highcharts.DataTableColumnCollection} columns
     * Columns as a collection, where the keys are the column names.
     *
     * @param {number} [rowIndex]
     * Index of the first row to change. Keep undefined to reset.
     *
     * @param {Record<string, (boolean|number|string|null|undefined)>} [eventDetail]
     * Custom information for pending events.
     *
     * @emits #setColumns
     * @emits #afterSetColumns
     */
    setColumns(columns, rowIndex, eventDetail) {
        let rowCount = this.rowCount;
        objectEach(columns, (column, columnName) => {
            this.columns[columnName] = column.slice();
            rowCount = column.length;
        });
        this.applyRowCount(rowCount);
        if (!eventDetail?.silent) {
            fireEvent(this, 'afterSetColumns');
            this.versionTag = uniqueKey();
        }
    }
    /**
     * Sets cell values of a row. Will insert a new row if no index was
     * provided, or if the index is higher than the total number of table rows.
     * A simplified version of the full `DateTable.setRow`, limited to objects.
     *
     * @param {Record<string, number|string|undefined>} row
     * Cell values to set.
     *
     * @param {number} [rowIndex]
     * Index of the row to set. Leave `undefind` to add as a new row.
     *
     * @param {boolean} [insert]
     * Whether to insert the row at the given index, or to overwrite the row.
     *
     * @param {Record<string, (boolean|number|string|null|undefined)>} [eventDetail]
     * Custom information for pending events.
     *
     * @emits #afterSetRows
     */
    setRow(row, rowIndex = this.rowCount, insert, eventDetail) {
        const { columns } = this, indexRowCount = insert ? this.rowCount + 1 : rowIndex + 1;
        objectEach(row, (cellValue, columnName) => {
            const column = columns[columnName] ||
                eventDetail?.addColumns !== false && new Array(indexRowCount);
            if (column) {
                if (insert) {
                    column.splice(rowIndex, 0, cellValue);
                }
                else {
                    column[rowIndex] = cellValue;
                }
                columns[columnName] = column;
            }
        });
        if (indexRowCount > this.rowCount) {
            this.applyRowCount(indexRowCount);
        }
        if (!eventDetail?.silent) {
            fireEvent(this, 'afterSetRows');
            this.versionTag = uniqueKey();
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Data_DataTableCore = (DataTableCore);
/* *
 *
 *  API Declarations
 *
 * */
/**
 * A column of values in a data table.
 * @typedef {Array<boolean|null|number|string|undefined>} Highcharts.DataTableColumn
 */ /**
* A collection of data table columns defined by a object where the key is the
* column name and the value is an array of the column values.
* @typedef {Record<string, Highcharts.DataTableColumn>} Highcharts.DataTableColumnCollection
*/
/**
 * Options for the `DataTable` or `DataTableCore` classes.
 * @interface Highcharts.DataTableOptions
 */ /**
* The column options for the data table. The columns are defined by an object
* where the key is the column ID and the value is an array of the column
* values.
*
* @name Highcharts.DataTableOptions.columns
* @type {Highcharts.DataTableColumnCollection|undefined}
*/ /**
* Custom ID to identify the new DataTable instance.
*
* @name Highcharts.DataTableOptions.id
* @type {string|undefined}
*/
(''); // Keeps doclets above in JS file

;// ./code/es-modules/Core/Axis/DateTimeAxis.js
/* *
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { addEvent: DateTimeAxis_addEvent, getMagnitude, normalizeTickInterval, timeUnits } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Composition
 *
 * */
/* eslint-disable valid-jsdoc */
var DateTimeAxis;
(function (DateTimeAxis) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Extends axis class with date and time support.
     * @private
     */
    function compose(AxisClass) {
        if (!AxisClass.keepProps.includes('dateTime')) {
            AxisClass.keepProps.push('dateTime');
            const axisProto = AxisClass.prototype;
            axisProto.getTimeTicks = getTimeTicks;
            DateTimeAxis_addEvent(AxisClass, 'afterSetType', onAfterSetType);
        }
        return AxisClass;
    }
    DateTimeAxis.compose = compose;
    /**
     * Set the tick positions to a time unit that makes sense, for example
     * on the first of each month or on every Monday. Return an array with
     * the time positions. Used in datetime axes as well as for grouping
     * data on a datetime axis.
     *
     * @private
     * @function Highcharts.Axis#getTimeTicks
     * @param {Highcharts.TimeNormalizeObject} normalizedInterval
     * The interval in axis values (ms) and the count.
     * @param {number} min
     * The minimum in axis values.
     * @param {number} max
     * The maximum in axis values.
     */
    function getTimeTicks() {
        return this.chart.time.getTimeTicks.apply(this.chart.time, arguments);
    }
    /**
     * @private
     */
    function onAfterSetType() {
        if (this.type !== 'datetime') {
            this.dateTime = void 0;
            return;
        }
        if (!this.dateTime) {
            this.dateTime = new Additions(this);
        }
    }
    /* *
     *
     *  Classes
     *
     * */
    class Additions {
        /* *
         *
         *  Constructors
         *
         * */
        constructor(axis) {
            this.axis = axis;
        }
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Get a normalized tick interval for dates. Returns a configuration
         * object with unit range (interval), count and name. Used to prepare
         * data for `getTimeTicks`. Previously this logic was part of
         * getTimeTicks, but as `getTimeTicks` now runs of segments in stock
         * charts, the normalizing logic was extracted in order to prevent it
         * for running over again for each segment having the same interval.
         * #662, #697.
         * @private
         */
        normalizeTimeTickInterval(tickInterval, unitsOption) {
            const units = (unitsOption || [[
                    // Unit name
                    'millisecond',
                    // Allowed multiples
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]
                ], [
                    'second',
                    [1, 2, 5, 10, 15, 30]
                ], [
                    'minute',
                    [1, 2, 5, 10, 15, 30]
                ], [
                    'hour',
                    [1, 2, 3, 4, 6, 8, 12]
                ], [
                    'day',
                    [1, 2]
                ], [
                    'week',
                    [1, 2]
                ], [
                    'month',
                    [1, 2, 3, 4, 6]
                ], [
                    'year',
                    null
                ]]);
            let unit = units[units.length - 1], // Default unit is years
            interval = timeUnits[unit[0]], multiples = unit[1], i;
            // Loop through the units to find the one that best fits the
            // tickInterval
            for (i = 0; i < units.length; i++) {
                unit = units[i];
                interval = timeUnits[unit[0]];
                multiples = unit[1];
                if (units[i + 1]) {
                    // `lessThan` is in the middle between the highest multiple
                    // and the next unit.
                    const lessThan = (interval *
                        multiples[multiples.length - 1] +
                        timeUnits[units[i + 1][0]]) / 2;
                    // Break and keep the current unit
                    if (tickInterval <= lessThan) {
                        break;
                    }
                }
            }
            // Prevent 2.5 years intervals, though 25, 250 etc. are allowed
            if (interval === timeUnits.year && tickInterval < 5 * interval) {
                multiples = [1, 2, 5];
            }
            // Get the count
            const count = normalizeTickInterval(tickInterval / interval, multiples, unit[0] === 'year' ? // #1913, #2360
                Math.max(getMagnitude(tickInterval / interval), 1) :
                1);
            return {
                unitRange: interval,
                count: count,
                unitName: unit[0]
            };
        }
        /**
         * Get the best date format for a specific X value based on the closest
         * point range on the axis.
         *
         * @private
         */
        getXDateFormat(x, dateTimeLabelFormats) {
            const { axis } = this, time = axis.chart.time;
            return axis.closestPointRange ?
                time.getDateFormat(axis.closestPointRange, x, axis.options.startOfWeek, dateTimeLabelFormats) ||
                    // #2546, 2581
                    time.resolveDTLFormat(dateTimeLabelFormats.year).main :
                time.resolveDTLFormat(dateTimeLabelFormats.day).main;
        }
    }
    DateTimeAxis.Additions = Additions;
})(DateTimeAxis || (DateTimeAxis = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Axis_DateTimeAxis = (DateTimeAxis);

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","SeriesRegistry"],"commonjs":["highcharts","SeriesRegistry"],"commonjs2":["highcharts","SeriesRegistry"],"root":["Highcharts","SeriesRegistry"]}
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_ = __webpack_require__(512);
var highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default = /*#__PURE__*/__webpack_require__.n(highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_);
;// ./code/es-modules/Extensions/DataGrouping/DataGroupingSeriesComposition.js
/* *
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */







const { series: { prototype: seriesProto } } = (highcharts_SeriesRegistry_commonjs_highcharts_SeriesRegistry_commonjs2_highcharts_SeriesRegistry_root_Highcharts_SeriesRegistry_default());

const { addEvent: DataGroupingSeriesComposition_addEvent, defined, error, extend: DataGroupingSeriesComposition_extend, isNumber: DataGroupingSeriesComposition_isNumber, merge: DataGroupingSeriesComposition_merge, pick: DataGroupingSeriesComposition_pick, splat } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Constants
 *
 * */
const baseGeneratePoints = seriesProto.generatePoints;
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function adjustExtremes(xAxis, groupedXData) {
    // Make sure the X axis extends to show the first group (#2533)
    // But only for visible series (#5493, #6393)
    if (defined(groupedXData[0]) &&
        DataGroupingSeriesComposition_isNumber(xAxis.min) &&
        DataGroupingSeriesComposition_isNumber(xAxis.dataMin) &&
        groupedXData[0] < xAxis.min) {
        if ((!defined(xAxis.options.min) &&
            xAxis.min <= xAxis.dataMin) ||
            xAxis.min === xAxis.dataMin) {
            xAxis.min = Math.min(groupedXData[0], xAxis.min);
        }
        xAxis.dataMin = Math.min(groupedXData[0], xAxis.dataMin);
    }
    // When the last anchor set, change the extremes that
    // the last point is visible (#12455).
    if (defined(groupedXData[groupedXData.length - 1]) &&
        DataGroupingSeriesComposition_isNumber(xAxis.max) &&
        DataGroupingSeriesComposition_isNumber(xAxis.dataMax) &&
        groupedXData[groupedXData.length - 1] > xAxis.max) {
        if ((!defined(xAxis.options.max) &&
            DataGroupingSeriesComposition_isNumber(xAxis.dataMax) &&
            xAxis.max >= xAxis.dataMax) || xAxis.max === xAxis.dataMax) {
            xAxis.max = Math.max(groupedXData[groupedXData.length - 1], xAxis.max);
        }
        xAxis.dataMax = Math.max(groupedXData[groupedXData.length - 1], xAxis.dataMax);
    }
}
/**
 * @private
 */
function anchorPoints(series, groupedXData, xMax) {
    const options = series.options, dataGroupingOptions = options.dataGrouping, totalRange = (series.currentDataGrouping && series.currentDataGrouping.gapSize), xData = series.getColumn('x');
    if (!(dataGroupingOptions &&
        xData.length &&
        totalRange &&
        series.groupMap)) {
        return;
    }
    const groupedDataLastIndex = groupedXData.length - 1, anchor = dataGroupingOptions.anchor, firstAnchor = dataGroupingOptions.firstAnchor, lastAnchor = dataGroupingOptions.lastAnchor;
    let anchorIndexIterator = groupedXData.length - 1, anchorFirstIndex = 0;
    // Change the first point position, but only when it is
    // the first point in the data set not in the current zoom.
    if (firstAnchor && xData[0] >= groupedXData[0]) {
        anchorFirstIndex++;
        const groupStart = series.groupMap[0].start, groupLength = series.groupMap[0].length;
        let firstGroupEnd;
        if (DataGroupingSeriesComposition_isNumber(groupStart) && DataGroupingSeriesComposition_isNumber(groupLength)) {
            firstGroupEnd = groupStart + (groupLength - 1);
        }
        groupedXData[0] = {
            start: groupedXData[0],
            middle: groupedXData[0] + 0.5 * totalRange,
            end: groupedXData[0] + totalRange,
            firstPoint: xData[0],
            lastPoint: firstGroupEnd && xData[firstGroupEnd]
        }[firstAnchor];
    }
    // Change the last point position but only when it is
    // the last point in the data set not in the current zoom,
    // or if it is not the 1st point simultaneously.
    if (groupedDataLastIndex > 0 &&
        lastAnchor &&
        totalRange &&
        groupedXData[groupedDataLastIndex] >= xMax - totalRange) {
        anchorIndexIterator--;
        const lastGroupStart = series.groupMap[series.groupMap.length - 1].start;
        groupedXData[groupedDataLastIndex] = {
            start: groupedXData[groupedDataLastIndex],
            middle: groupedXData[groupedDataLastIndex] + 0.5 * totalRange,
            end: groupedXData[groupedDataLastIndex] + totalRange,
            firstPoint: lastGroupStart && xData[lastGroupStart],
            lastPoint: xData[xData.length - 1]
        }[lastAnchor];
    }
    if (anchor && anchor !== 'start') {
        const shiftInterval = (totalRange *
            { middle: 0.5, end: 1 }[anchor]);
        // Anchor the rest of the points apart from the ones, that were
        // previously moved.
        while (anchorIndexIterator >= anchorFirstIndex) {
            groupedXData[anchorIndexIterator] += shiftInterval;
            anchorIndexIterator--;
        }
    }
}
/**
 * For the processed data, calculate the grouped data if needed.
 *
 * @private
 * @function Highcharts.Series#applyGrouping
 */
function DataGroupingSeriesComposition_applyGrouping(hasExtremesChanged) {
    const series = this, chart = series.chart, options = series.options, dataGroupingOptions = options.dataGrouping, groupingEnabled = series.allowDG !== false && dataGroupingOptions &&
        DataGroupingSeriesComposition_pick(dataGroupingOptions.enabled, chart.options.isStock), reserveSpace = series.reserveSpace(), lastDataGrouping = this.currentDataGrouping;
    let currentDataGrouping, croppedData, revertRequireSorting = false;
    // Data needs to be sorted for dataGrouping
    if (groupingEnabled && !series.requireSorting) {
        series.requireSorting = revertRequireSorting = true;
    }
    // Skip if skipDataGrouping method returns false or if grouping is disabled
    // (in that order).
    const skip = skipDataGrouping(series, hasExtremesChanged) === false || !groupingEnabled;
    // Revert original requireSorting value if changed
    if (revertRequireSorting) {
        series.requireSorting = false;
    }
    if (skip) {
        return;
    }
    series.destroyGroupedData();
    const table = dataGroupingOptions.groupAll ?
        series.dataTable :
        series.dataTable.modified || series.dataTable, processedXData = series.getColumn('x', !dataGroupingOptions.groupAll), xData = processedXData, plotSizeX = chart.plotSizeX, xAxis = series.xAxis, extremes = xAxis.getExtremes(), ordinal = xAxis.options.ordinal, groupPixelWidth = series.groupPixelWidth;
    let i, hasGroupedData;
    // Execute grouping if the amount of points is greater than the limit
    // defined in groupPixelWidth
    if (groupPixelWidth &&
        xData &&
        table.rowCount &&
        plotSizeX &&
        DataGroupingSeriesComposition_isNumber(extremes.min)) {
        hasGroupedData = true;
        // Force recreation of point instances in series.translate, #5699
        series.isDirty = true;
        series.points = null; // #6709
        const xMin = extremes.min, xMax = extremes.max, groupIntervalFactor = (ordinal &&
            xAxis.ordinal &&
            xAxis.ordinal.getGroupIntervalFactor(xMin, xMax, series)) || 1, interval = (groupPixelWidth * (xMax - xMin) / plotSizeX) *
            groupIntervalFactor, groupPositions = xAxis.getTimeTicks(Axis_DateTimeAxis.Additions.prototype.normalizeTimeTickInterval(interval, dataGroupingOptions.units ||
            DataGrouping_DataGroupingDefaults.units), 
        // Processed data may extend beyond axis (#4907)
        Math.min(xMin, xData[0]), Math.max(xMax, xData[xData.length - 1]), xAxis.options.startOfWeek, processedXData, series.closestPointRange), groupedData = seriesProto.groupData.apply(series, [
            table,
            groupPositions,
            dataGroupingOptions.approximation
        ]);
        let modified = groupedData.modified, groupedXData = modified.getColumn('x', true), gapSize = 0;
        // The smoothed option is deprecated, instead, there is a fallback
        // to the new anchoring mechanism. #12455.
        if (dataGroupingOptions?.smoothed &&
            modified.rowCount) {
            dataGroupingOptions.firstAnchor = 'firstPoint';
            dataGroupingOptions.anchor = 'middle';
            dataGroupingOptions.lastAnchor = 'lastPoint';
            error(32, false, chart, {
                'dataGrouping.smoothed': 'use dataGrouping.anchor'
            });
        }
        // Record what data grouping values were used
        for (i = 1; i < groupPositions.length; i++) {
            // The grouped gapSize needs to be the largest distance between
            // the group to capture varying group sizes like months or DST
            // crossing (#10000). Also check that the gap is not at the
            // start of a segment.
            if (!groupPositions.info.segmentStarts ||
                groupPositions.info.segmentStarts.indexOf(i) === -1) {
                gapSize = Math.max(groupPositions[i] - groupPositions[i - 1], gapSize);
            }
        }
        currentDataGrouping = groupPositions.info;
        currentDataGrouping.gapSize = gapSize;
        series.closestPointRange = groupPositions.info.totalRange;
        series.groupMap = groupedData.groupMap;
        series.currentDataGrouping = currentDataGrouping;
        anchorPoints(series, groupedXData || [], xMax);
        if (reserveSpace && groupedXData) {
            adjustExtremes(xAxis, groupedXData);
        }
        // We calculated all group positions but we should render only the ones
        // within the visible range
        if (dataGroupingOptions.groupAll) {
            // Keep the reference to all grouped points for further calculation,
            // used in Heikin-Ashi and hollow candlestick series.
            series.allGroupedTable = modified;
            croppedData = series.cropData(modified, xAxis.min || 0, xAxis.max || 0);
            modified = croppedData.modified;
            groupedXData = modified.getColumn('x');
            series.cropStart = croppedData.start; // #15005
        }
        // Set the modified table
        series.dataTable.modified = modified;
    }
    else {
        series.groupMap = void 0;
        series.currentDataGrouping = void 0;
    }
    series.hasGroupedData = hasGroupedData;
    series.preventGraphAnimation =
        (lastDataGrouping && lastDataGrouping.totalRange) !==
            (currentDataGrouping && currentDataGrouping.totalRange);
}
/**
 * @private
 */
function DataGroupingSeriesComposition_compose(SeriesClass) {
    const seriesProto = SeriesClass.prototype;
    if (!seriesProto.applyGrouping) {
        const PointClass = SeriesClass.prototype.pointClass;
        // Override point prototype to throw a warning when trying to update
        // grouped points.
        DataGroupingSeriesComposition_addEvent(PointClass, 'update', function () {
            if (this.dataGroup) {
                error(24, false, this.series.chart);
                return false;
            }
        });
        DataGroupingSeriesComposition_addEvent(SeriesClass, 'afterSetOptions', onAfterSetOptions);
        DataGroupingSeriesComposition_addEvent(SeriesClass, 'destroy', destroyGroupedData);
        DataGroupingSeriesComposition_extend(seriesProto, {
            applyGrouping: DataGroupingSeriesComposition_applyGrouping,
            destroyGroupedData,
            generatePoints,
            getDGApproximation,
            groupData
        });
    }
}
/**
 * Destroy the grouped data points. #622, #740
 * @private
 */
function destroyGroupedData() {
    // Clear previous groups
    if (this.groupedData) {
        this.groupedData.forEach(function (point, i) {
            if (point) {
                this.groupedData[i] = point.destroy ?
                    point.destroy() : null;
            }
        }, this);
        // Clears all:
        // - `this.groupedData`
        // - `this.points`
        // - `preserve` object in series.update()
        this.groupedData.length = 0;
        delete this.allGroupedTable;
    }
}
/**
 * Override the generatePoints method by adding a reference to grouped data
 * @private
 */
function generatePoints() {
    baseGeneratePoints.apply(this);
    // Record grouped data in order to let it be destroyed the next time
    // processData runs
    this.destroyGroupedData(); // #622
    this.groupedData = this.hasGroupedData ? this.points : null;
}
/**
 * Set default approximations to the prototypes if present. Properties are
 * inherited down. Can be overridden for individual series types.
 * @private
 */
function getDGApproximation() {
    if (this.is('arearange')) {
        return 'range';
    }
    if (this.is('ohlc')) {
        return 'ohlc';
    }
    if (this.is('hlc')) {
        return 'hlc';
    }
    if (
    // #18974, default approximation for cumulative
    // should be `sum` when `dataGrouping` is enabled
    this.is('column') ||
        this.options.cumulative) {
        return 'sum';
    }
    return 'average';
}
/**
 * Highcharts Stock only. Takes parallel arrays of x and y data and groups the
 * data into intervals defined by groupPositions, a collection of starting x
 * values for each group.
 *
 * @product highstock
 *
 * @function Highcharts.Series#groupData
 * @param {Highcharts.DataTable} table
 *        The series data table.
 * @param {Array<number>} groupPositions
 *        Group positions.
 * @param {string|Function} [approximation]
 *        Approximation to use.
 * @return {Highcharts.DataGroupingResultObject}
 *         Mapped groups.
 */
function groupData(table, groupPositions, approximation) {
    const xData = table.getColumn('x', true) || [], yData = table.getColumn('y', true), series = this, data = series.data, dataOptions = series.options && series.options.data, groupedXData = [], modified = new Data_DataTableCore(), groupMap = [], dataLength = table.rowCount, 
    // When grouping the fake extended axis for panning, we don't need to
    // consider y
    handleYData = !!yData, values = [], pointArrayMap = series.pointArrayMap, pointArrayMapLength = pointArrayMap && pointArrayMap.length, extendedPointArrayMap = ['x'].concat(pointArrayMap || ['y']), 
    // Data columns to be applied to the modified data table at the end
    valueColumns = (pointArrayMap || ['y']).map(() => []), groupAll = (this.options.dataGrouping &&
        this.options.dataGrouping.groupAll);
    let pointX, pointY, groupedY, pos = 0, start = 0;
    const approximationFn = (typeof approximation === 'function' ?
        approximation :
        approximation && DataGrouping_ApproximationRegistry[approximation] ?
            DataGrouping_ApproximationRegistry[approximation] :
            DataGrouping_ApproximationRegistry[(series.getDGApproximation && series.getDGApproximation() ||
                'average')]);
    // Calculate values array size from pointArrayMap length
    if (pointArrayMapLength) {
        let len = pointArrayMap.length;
        while (len--) {
            values.push([]);
        }
    }
    else {
        values.push([]);
    }
    const valuesLen = pointArrayMapLength || 1;
    for (let i = 0; i <= dataLength; i++) {
        // Start with the first point within the X axis range (#2696)
        if (xData[i] < groupPositions[0]) {
            continue; // With next point
        }
        // When a new group is entered, summarize and initialize
        // the previous group
        while ((typeof groupPositions[pos + 1] !== 'undefined' &&
            xData[i] >= groupPositions[pos + 1]) ||
            i === dataLength) { // Get the last group
            // get group x and y
            pointX = groupPositions[pos];
            series.dataGroupInfo = {
                start: groupAll ? start : (series.cropStart + start),
                length: values[0].length,
                groupStart: pointX
            };
            groupedY = approximationFn.apply(series, values);
            // By default, let options of the first grouped point be passed over
            // to the grouped point. This allows preserving properties like
            // `name` and `color` or custom properties. Implementers can
            // override this from the approximation function, where they can
            // write custom options to `this.dataGroupInfo.options`.
            if (series.pointClass && !defined(series.dataGroupInfo.options)) {
                // Convert numbers and arrays into objects
                series.dataGroupInfo.options = DataGroupingSeriesComposition_merge(series.pointClass.prototype
                    .optionsToObject.call({ series: series }, series.options.data[series.cropStart + start]));
                // Make sure the raw data (x, y, open, high etc) is not copied
                // over and overwriting approximated data.
                extendedPointArrayMap.forEach(function (key) {
                    delete series.dataGroupInfo.options[key];
                });
            }
            // Push the grouped data
            if (typeof groupedY !== 'undefined') {
                groupedXData.push(pointX);
                // Push the grouped values to the parallel columns
                const groupedValuesArr = splat(groupedY);
                for (let j = 0; j < groupedValuesArr.length; j++) {
                    valueColumns[j].push(groupedValuesArr[j]);
                }
                groupMap.push(series.dataGroupInfo);
            }
            // Reset the aggregate arrays
            start = i;
            for (let j = 0; j < valuesLen; j++) {
                values[j].length = 0; // Faster than values[j] = []
                values[j].hasNulls = false;
            }
            // Advance on the group positions
            pos += 1;
            // Don't loop beyond the last group
            if (i === dataLength) {
                break;
            }
        }
        // Break out
        if (i === dataLength) {
            break;
        }
        // For each raw data point, push it to an array that contains all values
        // for this specific group
        if (pointArrayMap) {
            const index = groupAll ? i : series.cropStart + i, point = (data && data[index]) ||
                series.pointClass.prototype.applyOptions.apply({
                    series: series
                }, [dataOptions[index]]);
            let val;
            for (let j = 0; j < pointArrayMapLength; j++) {
                val = point[pointArrayMap[j]];
                if (DataGroupingSeriesComposition_isNumber(val)) {
                    values[j].push(val);
                }
                else if (val === null) {
                    values[j].hasNulls = true;
                }
            }
        }
        else {
            pointY = handleYData ? yData[i] : null;
            if (DataGroupingSeriesComposition_isNumber(pointY)) {
                values[0].push(pointY);
            }
            else if (pointY === null) {
                values[0].hasNulls = true;
            }
        }
    }
    const columns = {
        x: groupedXData
    };
    (pointArrayMap || ['y']).forEach((key, i) => {
        columns[key] = valueColumns[i];
    });
    modified.setColumns(columns);
    return {
        groupMap,
        modified
    };
}
/**
 * Handle default options for data grouping. This must be set at runtime because
 * some series types are defined after this.
 * @private
 */
function onAfterSetOptions(e) {
    const options = e.options, type = this.type, plotOptions = this.chart.options.plotOptions, 
    // External series, for example technical indicators should also inherit
    // commonOptions which are not available outside this module
    baseOptions = (this.useCommonDataGrouping &&
        DataGrouping_DataGroupingDefaults.common), seriesSpecific = DataGrouping_DataGroupingDefaults.seriesSpecific;
    let defaultOptions = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).defaultOptions.plotOptions[type].dataGrouping;
    if (plotOptions && (seriesSpecific[type] || baseOptions)) { // #1284
        const rangeSelector = this.chart.rangeSelector;
        if (!defaultOptions) {
            defaultOptions = DataGroupingSeriesComposition_merge(DataGrouping_DataGroupingDefaults.common, seriesSpecific[type]);
        }
        options.dataGrouping = DataGroupingSeriesComposition_merge(baseOptions, defaultOptions, plotOptions.series && plotOptions.series.dataGrouping, // #1228
        // Set by the StockChart constructor:
        plotOptions[type].dataGrouping, this.userOptions.dataGrouping, !options.isInternal &&
            rangeSelector &&
            DataGroupingSeriesComposition_isNumber(rangeSelector.selected) &&
            rangeSelector.buttonOptions[rangeSelector.selected].dataGrouping);
    }
}
/**
 * @private
 */
function skipDataGrouping(series, force) {
    return !(series.isCartesian &&
        !series.isDirty &&
        !series.xAxis.isDirty &&
        !series.yAxis.isDirty &&
        !force);
}
/* *
 *
 *  Default Export
 *
 * */
const DataGroupingSeriesComposition = {
    compose: DataGroupingSeriesComposition_compose,
    groupData
};
/* harmony default export */ const DataGrouping_DataGroupingSeriesComposition = (DataGroupingSeriesComposition);

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","Templating"],"commonjs":["highcharts","Templating"],"commonjs2":["highcharts","Templating"],"root":["Highcharts","Templating"]}
var highcharts_Templating_commonjs_highcharts_Templating_commonjs2_highcharts_Templating_root_Highcharts_Templating_ = __webpack_require__(984);
var highcharts_Templating_commonjs_highcharts_Templating_commonjs2_highcharts_Templating_root_Highcharts_Templating_default = /*#__PURE__*/__webpack_require__.n(highcharts_Templating_commonjs_highcharts_Templating_commonjs2_highcharts_Templating_root_Highcharts_Templating_);
;// ./code/es-modules/Extensions/DataGrouping/DataGrouping.js
/* *
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */





const { format } = (highcharts_Templating_commonjs_highcharts_Templating_commonjs2_highcharts_Templating_root_Highcharts_Templating_default());

const { composed } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { addEvent: DataGrouping_addEvent, extend: DataGrouping_extend, isNumber: DataGrouping_isNumber, pick: DataGrouping_pick, pushUnique } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function DataGrouping_compose(AxisClass, SeriesClass, TooltipClass) {
    DataGrouping_DataGroupingAxisComposition.compose(AxisClass);
    DataGrouping_DataGroupingSeriesComposition.compose(SeriesClass);
    if (TooltipClass &&
        pushUnique(composed, 'DataGrouping')) {
        DataGrouping_addEvent(TooltipClass, 'headerFormatter', onTooltipHeaderFormatter);
    }
}
/**
 * Extend the original method, make the tooltip's header reflect the grouped
 * range.
 * @private
 */
function onTooltipHeaderFormatter(e) {
    const chart = this.chart, time = chart.time, point = e.point, series = point.series, options = series.options, tooltipOptions = series.tooltipOptions, dataGroupingOptions = options.dataGrouping, xAxis = series.xAxis;
    let xDateFormat = tooltipOptions.xDateFormat || '', xDateFormatEnd, currentDataGrouping, dateTimeLabelFormats, labelFormats, formattedKey, formatString = tooltipOptions[e.isFooter ? 'footerFormat' : 'headerFormat'];
    // Apply only to grouped series
    if (xAxis &&
        xAxis.options.type === 'datetime' &&
        dataGroupingOptions &&
        DataGrouping_isNumber(point.key)) {
        // Set variables
        currentDataGrouping = series.currentDataGrouping;
        dateTimeLabelFormats = dataGroupingOptions.dateTimeLabelFormats ||
            // Fallback to commonOptions (#9693)
            DataGrouping_DataGroupingDefaults.common.dateTimeLabelFormats;
        // If we have grouped data, use the grouping information to get the
        // right format
        if (currentDataGrouping) {
            labelFormats = dateTimeLabelFormats[currentDataGrouping.unitName];
            if (currentDataGrouping.count === 1) {
                xDateFormat = labelFormats[0];
            }
            else {
                xDateFormat = labelFormats[1];
                xDateFormatEnd = labelFormats[2];
            }
            // If not grouped, and we don't have set the xDateFormat option, get the
            // best fit, so if the least distance between points is one minute, show
            // it, but if the least distance is one day, skip hours and minutes etc.
        }
        else if (!xDateFormat && dateTimeLabelFormats && xAxis.dateTime) {
            xDateFormat = xAxis.dateTime.getXDateFormat(point.x, tooltipOptions.dateTimeLabelFormats);
        }
        const groupStart = DataGrouping_pick(series.groupMap?.[point.index].groupStart, point.key), groupEnd = groupStart + (currentDataGrouping?.totalRange || 0) - 1;
        formattedKey = time.dateFormat(xDateFormat, groupStart);
        if (xDateFormatEnd) {
            formattedKey += time.dateFormat(xDateFormatEnd, groupEnd);
        }
        // Replace default header style with class name
        if (series.chart.styledMode) {
            formatString = this.styledModeFormat(formatString);
        }
        // Return the replaced format
        e.text = format(formatString, {
            point: DataGrouping_extend(point, { key: formattedKey }),
            series: series
        }, chart);
        e.preventDefault();
    }
}
/* *
 *
 *  Default Export
 *
 * */
const DataGroupingComposition = {
    compose: DataGrouping_compose,
    groupData: DataGrouping_DataGroupingSeriesComposition.groupData
};
/* harmony default export */ const DataGrouping = (DataGroupingComposition);
/* *
 *
 *  API Declarations
 *
 * */
/**
 * @typedef {"average"|"averages"|"open"|"high"|"low"|"close"|"sum"} Highcharts.DataGroupingApproximationValue
 */
/**
 * The position of the point inside the group.
 *
 * @typedef    {"start"|"middle"|"end"} Highcharts.DataGroupingAnchor
 */
/**
 * The position of the first or last point in the series inside the group.
 *
 * @typedef    {"start"|"middle"|"end"|"firstPoint"|"lastPoint"} Highcharts.DataGroupingAnchorExtremes
 */
/**
 * Highcharts Stock only.
 *
 * @product highstock
 * @interface Highcharts.DataGroupingInfoObject
 */ /**
* @name Highcharts.DataGroupingInfoObject#length
* @type {number}
*/ /**
* @name Highcharts.DataGroupingInfoObject#options
* @type {Highcharts.SeriesOptionsType|undefined}
*/ /**
* @name Highcharts.DataGroupingInfoObject#start
* @type {number}
*/
/**
 * Highcharts Stock only.
 *
 * @product highstock
 * @interface Highcharts.DataGroupingResultObject
 */ /**
* @name Highcharts.DataGroupingResultObject#groupedXData
* @type {Array<number>}
*/ /**
* @name Highcharts.DataGroupingResultObject#groupedYData
* @type {Array<(number|null|undefined)>|Array<Array<(number|null|undefined)>>}
*/ /**
* @name Highcharts.DataGroupingResultObject#groupMap
* @type {Array<DataGroupingInfoObject>}
*/
/**
 * Highcharts Stock only. If a point object is created by data
 * grouping, it doesn't reflect actual points in the raw
 * data. In this case, the `dataGroup` property holds
 * information that points back to the raw data.
 *
 * - `dataGroup.start` is the index of the first raw data
 *   point in the group.
 *
 * - `dataGroup.length` is the amount of points in the
 *   group.
 *
 * @sample stock/members/point-datagroup
 *         Click to inspect raw data points
 *
 * @product highstock
 *
 * @name Highcharts.Point#dataGroup
 * @type {Highcharts.DataGroupingInfoObject|undefined}
 */
(''); // Detach doclets above
/* *
 *
 *  API Options
 *
 * */
/**
 * Data grouping is the concept of sampling the data values into larger
 * blocks in order to ease readability and increase performance of the
 * JavaScript charts. Highcharts Stock by default applies data grouping when
 * the points become closer than a certain pixel value, determined by
 * the `groupPixelWidth` option.
 *
 * If data grouping is applied, the grouping information of grouped
 * points can be read from the [Point.dataGroup](
 * /class-reference/Highcharts.Point#dataGroup). If point options other than
 * the data itself are set, for example `name` or `color` or custom properties,
 * the grouping logic doesn't know how to group it. In this case the options of
 * the first point instance are copied over to the group point. This can be
 * altered through a custom `approximation` callback function.
 *
 * @declare   Highcharts.DataGroupingOptionsObject
 * @product   highstock
 * @requires  modules/stock
 * @apioption plotOptions.series.dataGrouping
 */
/**
 * Specifies how the points should be located on the X axis inside the group.
 * Points that are extremes can be set separately. Available options:
 *
 * - `start` places the point at the beginning of the group
 * (e.g. range 00:00:00 - 23:59:59 -> 00:00:00)
 *
 * - `middle` places the point in the middle of the group
 * (e.g. range 00:00:00 - 23:59:59 -> 12:00:00)
 *
 * - `end` places the point at the end of the group
 * (e.g. range 00:00:00 - 23:59:59 -> 23:59:59)
 *
 * @sample {highstock} stock/plotoptions/series-datagrouping-anchor
 *         Changing the point x-coordinate inside the group.
 *
 * @see [dataGrouping.firstAnchor](#plotOptions.series.dataGrouping.firstAnchor)
 * @see [dataGrouping.lastAnchor](#plotOptions.series.dataGrouping.lastAnchor)
 *
 * @type       {Highcharts.DataGroupingAnchor}
 * @since 9.1.0
 * @default    start
 * @apioption  plotOptions.series.dataGrouping.anchor
 */
/**
 * The method of approximation inside a group. When for example 30 days
 * are grouped into one month, this determines what value should represent
 * the group. Possible values are "average", "averages", "open", "high",
 * "low", "close" and "sum". For OHLC and candlestick series the approximation
 * is "ohlc" by default, which finds the open, high, low and close values
 * within all the grouped data. For ranges, the approximation is "range",
 * which finds the low and high values. For multi-dimensional data,
 * like ranges and OHLC, "averages" will compute the average for each
 * dimension.
 *
 * Custom aggregate methods can be added by assigning a callback function
 * as the approximation. This function takes a numeric array as the
 * argument and should return a single numeric value or `null`. Note
 * that the numeric array will never contain null values, only true
 * numbers. Instead, if null values are present in the raw data, the
 * numeric array will have an `.hasNulls` property set to `true`. For
 * single-value data sets the data is available in the first argument
 * of the callback function. For OHLC data sets, all the open values
 * are in the first argument, all high values in the second etc.
 *
 * Since v4.2.7, grouping meta data is available in the approximation
 * callback from `this.dataGroupInfo`. It can be used to extract information
 * from the raw data.
 *
 * Defaults to `average` for line-type series, `sum` for columns, `range`
 * for range series, `hlc` for HLC, and `ohlc` for OHLC and candlestick.
 *
 * @sample {highstock} stock/plotoptions/series-datagrouping-approximation
 *         Approximation callback with custom data
 * @sample {highstock} stock/plotoptions/series-datagrouping-simple-approximation
 *         Simple approximation demo
 *
 * @type       {Highcharts.DataGroupingApproximationValue|Function}
 * @apioption  plotOptions.series.dataGrouping.approximation
 */
/**
 * Datetime formats for the header of the tooltip in a stock chart.
 * The format can vary within a chart depending on the currently selected
 * time range and the current data grouping.
 *
 * The default formats are:
 * ```js
 * {
 *     millisecond: [
 *         '%A, %e %b, %H:%M:%S.%L', '%A, %e %b, %H:%M:%S.%L', '-%H:%M:%S.%L'
 *     ],
 *     second: ['%A, %e %b, %H:%M:%S', '%A, %e %b, %H:%M:%S', '-%H:%M:%S'],
 *     minute: ['%A, %e %b, %H:%M', '%A, %e %b, %H:%M', '-%H:%M'],
 *     hour: ['%A, %e %b, %H:%M', '%A, %e %b, %H:%M', '-%H:%M'],
 *     day: ['%A, %e %b %Y', '%A, %e %b', '-%A, %e %b %Y'],
 *     week: ['Week from %A, %e %b %Y', '%A, %e %b', '-%A, %e %b %Y'],
 *     month: ['%B %Y', '%B', '-%B %Y'],
 *     year: ['%Y', '%Y', '-%Y']
 * }
 * ```
 *
 * For each of these array definitions, the first item is the format
 * used when the active time span is one unit. For instance, if the
 * current data applies to one week, the first item of the week array
 * is used. The second and third items are used when the active time
 * span is more than two units. For instance, if the current data applies
 * to two weeks, the second and third item of the week array are used,
 *  and applied to the start and end date of the time span.
 *
 * @type      {Object}
 * @apioption plotOptions.series.dataGrouping.dateTimeLabelFormats
 */
/**
 * Enable or disable data grouping.
 *
 * @type      {boolean}
 * @default   true
 * @apioption plotOptions.series.dataGrouping.enabled
 */
/**
 * Specifies how the first grouped point is positioned on the xAxis.
 * If firstAnchor and/or lastAnchor are defined, then those options take
 * precedence over anchor for the first and/or last grouped points.
 * Available options:
 *
 * -`start` places the point at the beginning of the group
 * (e.g. range 00:00:00 - 23:59:59 -> 00:00:00)
 *
 * -`middle` places the point in the middle of the group
 * (e.g. range 00:00:00 - 23:59:59 -> 12:00:00)
 *
 * -`end` places the point at the end of the group
 * (e.g. range 00:00:00 - 23:59:59 -> 23:59:59)
 *
 * -`firstPoint` the first point in the group
 * (e.g. points at 00:13, 00:35, 00:59 -> 00:13)
 *
 * -`lastPoint` the last point in the group
 * (e.g. points at 00:13, 00:35, 00:59 -> 00:59)
 *
 * @sample {highstock} stock/plotoptions/series-datagrouping-first-anchor
 *         Applying first and last anchor.
 *
 * @see [dataGrouping.anchor](#plotOptions.series.dataGrouping.anchor)
 *
 * @type       {Highcharts.DataGroupingAnchorExtremes}
 * @since 9.1.0
 * @default    start
 * @apioption  plotOptions.series.dataGrouping.firstAnchor
 */
/**
 * When data grouping is forced, it runs no matter how small the intervals
 * are. This can be handy for example when the sum should be calculated
 * for values appearing at random times within each hour.
 *
 * @type      {boolean}
 * @default   false
 * @apioption plotOptions.series.dataGrouping.forced
 */
/**
 * The approximate pixel width of each group. If for example a series
 * with 30 points is displayed over a 600 pixel wide plot area, no grouping
 * is performed. If however the series contains so many points that
 * the spacing is less than the groupPixelWidth, Highcharts will try
 * to group it into appropriate groups so that each is more or less
 * two pixels wide. If multiple series with different group pixel widths
 * are drawn on the same x axis, all series will take the greatest width.
 * For example, line series have 2px default group width, while column
 * series have 10px. If combined, both the line and the column will
 * have 10px by default.
 *
 * @type      {number}
 * @default   2
 * @apioption plotOptions.series.dataGrouping.groupPixelWidth
 */
/**
 * By default only points within the visible range are grouped. Enabling this
 * option will force data grouping to calculate all grouped points for a given
 * dataset. That option prevents for example a column series from calculating
 * a grouped point partially. The effect is similar to
 * [Series.getExtremesFromAll](#plotOptions.series.getExtremesFromAll) but does
 * not affect yAxis extremes.
 *
 * @sample {highstock} stock/plotoptions/series-datagrouping-groupall/
 *         Two series with the same data but different groupAll setting
 *
 * @type      {boolean}
 * @default   false
 * @since     6.1.0
 * @apioption plotOptions.series.dataGrouping.groupAll
 */
/**
 * Specifies how the last grouped point is positioned on the xAxis.
 * If firstAnchor and/or lastAnchor are defined, then those options take
 * precedence over anchor for the first and/or last grouped points.
 * Available options:
 *
 * -`start` places the point at the beginning of the group
 * (e.g. range 00:00:00 - 23:59:59 -> 00:00:00)
 *
 * -`middle` places the point in the middle of the group
 * (e.g. range 00:00:00 - 23:59:59 -> 12:00:00)
 *
 * -`end` places the point at the end of the group
 * (e.g. range 00:00:00 - 23:59:59 -> 23:59:59)
 *
 * -`firstPoint` the first point in the group
 * (e.g. points at 00:13, 00:35, 00:59 -> 00:13)
 *
 * -`lastPoint` the last point in the group
 * (e.g. points at 00:13, 00:35, 00:59 -> 00:59)
 *
 * @sample {highstock} stock/plotoptions/series-datagrouping-first-anchor
 *         Applying first and last anchor.
 *
 * @sample {highstock} stock/plotoptions/series-datagrouping-last-anchor
 *         Applying the last anchor in the chart with live data.
 *
 * @see [dataGrouping.anchor](#plotOptions.series.dataGrouping.anchor)
 *
 * @type       {Highcharts.DataGroupingAnchorExtremes}
 * @since 9.1.0
 * @default    start
 * @apioption  plotOptions.series.dataGrouping.lastAnchor
 */
/**
 * Normally, a group is indexed by the start of that group, so for example
 * when 30 daily values are grouped into one month, that month's x value
 * will be the 1st of the month. This apparently shifts the data to
 * the left. When the smoothed option is true, this is compensated for.
 * The data is shifted to the middle of the group, and min and max
 * values are preserved. Internally, this is used in the Navigator series.
 *
 * @type      {boolean}
 * @default   false
 * @deprecated
 * @apioption plotOptions.series.dataGrouping.smoothed
 */
/**
 * An array determining what time intervals the data is allowed to be
 * grouped to. Each array item is an array where the first value is
 * the time unit and the second value another array of allowed multiples.
 *
 * Defaults to:
 * ```js
 * units: [[
 *     'millisecond', // unit name
 *     [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
 * ], [
 *     'second',
 *     [1, 2, 5, 10, 15, 30]
 * ], [
 *     'minute',
 *     [1, 2, 5, 10, 15, 30]
 * ], [
 *     'hour',
 *     [1, 2, 3, 4, 6, 8, 12]
 * ], [
 *     'day',
 *     [1]
 * ], [
 *     'week',
 *     [1]
 * ], [
 *     'month',
 *     [1, 3, 6]
 * ], [
 *     'year',
 *     null
 * ]]
 * ```
 *
 * @type      {Array<Array<string,(Array<number>|null)>>}
 * @apioption plotOptions.series.dataGrouping.units
 */
/**
 * The approximate pixel width of each group. If for example a series
 * with 30 points is displayed over a 600 pixel wide plot area, no grouping
 * is performed. If however the series contains so many points that
 * the spacing is less than the groupPixelWidth, Highcharts will try
 * to group it into appropriate groups so that each is more or less
 * two pixels wide. Defaults to `10`.
 *
 * @sample {highstock} stock/plotoptions/series-datagrouping-grouppixelwidth/
 *         Two series with the same data density but different groupPixelWidth
 *
 * @type      {number}
 * @default   10
 * @apioption plotOptions.column.dataGrouping.groupPixelWidth
 */
''; // Required by JSDoc parsing

;// ./code/es-modules/masters/modules/datagrouping.src.js






const G = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
G.dataGrouping = G.dataGrouping || {};
G.dataGrouping.approximationDefaults = (G.dataGrouping.approximationDefaults ||
    DataGrouping_ApproximationDefaults);
G.dataGrouping.approximations = (G.dataGrouping.approximations ||
    DataGrouping_ApproximationRegistry);
DataGrouping.compose(G.Axis, G.Series, G.Tooltip);
/* harmony default export */ const datagrouping_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});