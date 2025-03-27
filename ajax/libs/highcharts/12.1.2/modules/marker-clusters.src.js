/**
 * @license Highcharts JS v12.1.2 (2024-12-21)
 * @module highcharts/modules/marker-clusters
 * @requires highcharts
 *
 * Marker clusters module for Highcharts
 *
 * (c) 2010-2024 Wojciech Chmiel
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Highcharts"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/modules/marker-clusters", ["highcharts/highcharts"], function (amd1) {return factory(amd1);});
	else if(typeof exports === 'object')
		exports["highcharts/modules/marker-clusters"] = factory(root["_Highcharts"]);
	else
		root["Highcharts"] = factory(root["Highcharts"]);
})(typeof window === 'undefined' ? this : window, (__WEBPACK_EXTERNAL_MODULE__944__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
  "default": () => (/* binding */ marker_clusters_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
;// ./code/es-modules/Extensions/MarkerClusters/MarkerClusterDefaults.js
/* *
 *
 *  Marker clusters module.
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  Author: Wojciech Chmiel
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  API Options
 *
 * */
/**
 * Options for marker clusters, the concept of sampling the data
 * values into larger blocks in order to ease readability and
 * increase performance of the JavaScript charts.
 *
 * Note: marker clusters module is not working with `boost`
 * and `draggable-points` modules.
 *
 * The marker clusters feature requires the marker-clusters.js
 * file to be loaded, found in the modules directory of the download
 * package, or online at [code.highcharts.com/modules/marker-clusters.js
 * ](code.highcharts.com/modules/marker-clusters.js).
 *
 * @sample maps/marker-clusters/europe
 *         Maps marker clusters
 * @sample highcharts/marker-clusters/basic
 *         Scatter marker clusters
 * @sample maps/marker-clusters/optimized-kmeans
 *         Marker clusters with colorAxis
 *
 * @product      highcharts highmaps
 * @since 8.0.0
 * @optionparent plotOptions.scatter.cluster
 *
 * @private
 */
const cluster = {
    /**
     * Whether to enable the marker-clusters module.
     *
     * @sample maps/marker-clusters/basic
     *         Maps marker clusters
     * @sample highcharts/marker-clusters/basic
     *         Scatter marker clusters
     */
    enabled: false,
    /**
     * When set to `false` prevent cluster overlapping - this option
     * works only when `layoutAlgorithm.type = "grid"`.
     *
     * @sample highcharts/marker-clusters/grid
     *         Prevent overlapping
     */
    allowOverlap: true,
    /**
     * Options for the cluster marker animation.
     * @type    {boolean|Partial<Highcharts.AnimationOptionsObject>}
     * @default { "duration": 500 }
     */
    animation: {
        /** @ignore-option */
        duration: 500
    },
    /**
     * Zoom the plot area to the cluster points range when a cluster is clicked.
     */
    drillToCluster: true,
    /**
     * The minimum amount of points to be combined into a cluster.
     * This value has to be greater or equal to 2.
     *
     * @sample highcharts/marker-clusters/basic
     *         At least three points in the cluster
     */
    minimumClusterSize: 2,
    /**
     * Options for layout algorithm. Inside there
     * are options to change the type of the algorithm, gridSize,
     * distance or iterations.
     */
    layoutAlgorithm: {
        /**
         * Type of the algorithm used to combine points into a cluster.
         * There are three available algorithms:
         *
         * 1) `grid` - grid-based clustering technique. Points are assigned
         * to squares of set size depending on their position on the plot
         * area. Points inside the grid square are combined into a cluster.
         * The grid size can be controlled by `gridSize` property
         * (grid size changes at certain zoom levels).
         *
         * 2) `kmeans` - based on K-Means clustering technique. In the
         * first step, points are divided using the grid method (distance
         * property is a grid size) to find the initial amount of clusters.
         * Next, each point is classified by computing the distance between
         * each cluster center and that point. When the closest cluster
         * distance is lower than distance property set by a user the point
         * is added to this cluster otherwise is classified as `noise`. The
         * algorithm is repeated until each cluster center not change its
         * previous position more than one pixel. This technique is more
         * accurate but also more time consuming than the `grid` algorithm,
         * especially for big datasets.
         *
         * 3) `optimizedKmeans` - based on K-Means clustering technique. This
         * algorithm uses k-means algorithm only on the chart initialization
         * or when chart extremes have greater range than on initialization.
         * When a chart is redrawn the algorithm checks only clustered points
         * distance from the cluster center and rebuild it when the point is
         * spaced enough to be outside the cluster. It provides performance
         * improvement and more stable clusters position yet can be used rather
         * on small and sparse datasets.
         *
         * By default, the algorithm depends on visible quantity of points
         * and `kmeansThreshold`. When there are more visible points than the
         * `kmeansThreshold` the `grid` algorithm is used, otherwise `kmeans`.
         *
         * The custom clustering algorithm can be added by assigning a callback
         * function as the type property. This function takes an array of
         * `processedXData`, `processedYData`, `processedXData` indexes and
         * `layoutAlgorithm` options as arguments and should return an object
         * with grouped data.
         *
         * The algorithm should return an object like that:
         * <pre>{
         *  clusterId1: [{
         *      x: 573,
         *      y: 285,
         *      index: 1 // point index in the data array
         *  }, {
         *      x: 521,
         *      y: 197,
         *      index: 2
         *  }],
         *  clusterId2: [{
         *      ...
         *  }]
         *  ...
         * }</pre>
         *
         * `clusterId` (example above - unique id of a cluster or noise)
         * is an array of points belonging to a cluster. If the
         * array has only one point or fewer points than set in
         * `cluster.minimumClusterSize` it won't be combined into a cluster.
         *
         * @sample maps/marker-clusters/optimized-kmeans
         *         Optimized K-Means algorithm
         * @sample highcharts/marker-clusters/kmeans
         *         K-Means algorithm
         * @sample highcharts/marker-clusters/grid
         *         Grid algorithm
         * @sample maps/marker-clusters/custom-alg
         *         Custom algorithm
         *
         * @type {string|Function}
         * @see [cluster.minimumClusterSize](#plotOptions.scatter.cluster.minimumClusterSize)
         * @apioption plotOptions.scatter.cluster.layoutAlgorithm.type
         */
        /**
         * When `type` is set to the `grid`,
         * `gridSize` is a size of a grid square element either as a number
         * defining pixels, or a percentage defining a percentage
         * of the plot area width.
         *
         * @type    {number|string}
         */
        gridSize: 50,
        /**
         * When `type` is set to `kmeans`,
         * `iterations` are the number of iterations that this algorithm will be
         * repeated to find clusters positions.
         *
         * @type    {number}
         * @apioption plotOptions.scatter.cluster.layoutAlgorithm.iterations
         */
        /**
         * When `type` is set to `kmeans`,
         * `distance` is a maximum distance between point and cluster center
         * so that this point will be inside the cluster. The distance
         * is either a number defining pixels or a percentage
         * defining a percentage of the plot area width.
         *
         * @type    {number|string}
         */
        distance: 40,
        /**
         * When `type` is set to `undefined` and there are more visible points
         * than the kmeansThreshold the `grid` algorithm is used to find
         * clusters, otherwise `kmeans`. It ensures good performance on
         * large datasets and better clusters arrangement after the zoom.
         */
        kmeansThreshold: 100
    },
    /**
     * Options for the cluster marker.
     * @type      {Highcharts.PointMarkerOptionsObject}
     * @extends   plotOptions.series.marker
     * @excluding enabledThreshold, states
     */
    marker: {
        /** @internal */
        symbol: 'cluster',
        /** @internal */
        radius: 15,
        /** @internal */
        lineWidth: 0,
        /** @internal */
        lineColor: "#ffffff" /* Palette.backgroundColor */
    },
    /**
     * Fires when the cluster point is clicked and `drillToCluster` is enabled.
     * One parameter, `event`, is passed to the function. The default action
     * is to zoom to the cluster points range. This can be prevented
     * by calling `event.preventDefault()`.
     *
     * @type      {Highcharts.MarkerClusterDrillCallbackFunction}
     * @product   highcharts highmaps
     * @see [cluster.drillToCluster](#plotOptions.scatter.cluster.drillToCluster)
     * @apioption plotOptions.scatter.cluster.events.drillToCluster
     */
    /**
     * An array defining zones within marker clusters.
     *
     * In styled mode, the color zones are styled with the
     * `.highcharts-cluster-zone-{n}` class, or custom
     * classed from the `className`
     * option.
     *
     * @sample highcharts/marker-clusters/basic
     *         Marker clusters zones
     * @sample maps/marker-clusters/custom-alg
     *         Zones on maps
     *
     * @type      {Array<*>}
     * @product   highcharts highmaps
     * @apioption plotOptions.scatter.cluster.zones
     */
    /**
     * Styled mode only. A custom class name for the zone.
     *
     * @sample highcharts/css/color-zones/
     *         Zones styled by class name
     *
     * @type      {string}
     * @apioption plotOptions.scatter.cluster.zones.className
     */
    /**
     * Settings for the cluster marker belonging to the zone.
     *
     * @see [cluster.marker](#plotOptions.scatter.cluster.marker)
     * @extends   plotOptions.scatter.cluster.marker
     * @product   highcharts highmaps
     * @apioption plotOptions.scatter.cluster.zones.marker
     */
    /**
     * The value where the zone starts.
     *
     * @type      {number}
     * @product   highcharts highmaps
     * @apioption plotOptions.scatter.cluster.zones.from
     */
    /**
     * The value where the zone ends.
     *
     * @type      {number}
     * @product   highcharts highmaps
     * @apioption plotOptions.scatter.cluster.zones.to
     */
    /**
     * The fill color of the cluster marker in hover state. When
     * `undefined`, the series' or point's fillColor for normal
     * state is used.
     *
     * @type      {Highcharts.ColorType}
     * @apioption plotOptions.scatter.cluster.states.hover.fillColor
     */
    /**
     * Options for the cluster data labels.
     * @type    {Highcharts.DataLabelsOptions}
     */
    dataLabels: {
        /** @internal */
        enabled: true,
        /** @internal */
        format: '{point.clusterPointsAmount}',
        /** @internal */
        verticalAlign: 'middle',
        /** @internal */
        align: 'center',
        /** @internal */
        style: {
            color: 'contrast'
        },
        /** @internal */
        inside: true
    }
};
const tooltip = {
    /**
     * The HTML of the cluster point's in the tooltip. Works only with
     * marker-clusters module and analogously to
     * [pointFormat](#tooltip.pointFormat).
     *
     * The cluster tooltip can be also formatted using
     * `tooltip.formatter` callback function and `point.isCluster` flag.
     *
     * @sample highcharts/marker-clusters/grid
     *         Format tooltip for cluster points.
     *
     * @sample maps/marker-clusters/europe/
     *         Format tooltip for clusters using tooltip.formatter
     *
     * @type      {string}
     * @default   Clustered points: {point.clusterPointsAmount}
     * @apioption tooltip.clusterFormat
     */
    clusterFormat: '<span>Clustered points: ' +
        '{point.clusterPointsAmount}</span><br/>'
};
/* *
 *
 *  Default Export
 *
 * */
const MarkerClusterDefaults = {
    cluster,
    tooltip
};
/* harmony default export */ const MarkerClusters_MarkerClusterDefaults = (MarkerClusterDefaults);

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

;// ./code/es-modules/Extensions/MarkerClusters/MarkerClusterScatter.js
/* *
 *
 *  Marker clusters module.
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  Author: Wojciech Chmiel
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { animObject } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());


const { cluster: clusterDefaults } = MarkerClusters_MarkerClusterDefaults;

const { addEvent, defined, error, isArray: MarkerClusterScatter_isArray, isFunction, isObject, isNumber, merge, objectEach: MarkerClusterScatter_objectEach, relativeLength, syncTimeout } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Constants
 *
 * */
const markerClusterAlgorithms = {
    grid: function (dataX, dataY, dataIndexes, options) {
        const series = this, grid = {}, gridOffset = series.getGridOffset(), scaledGridSize = series.getScaledGridSize(options);
        let x, y, gridX, gridY, key, i;
        for (i = 0; i < dataX.length; i++) {
            const p = valuesToPixels(series, { x: dataX[i], y: dataY[i] });
            x = p.x - gridOffset.plotLeft;
            y = p.y - gridOffset.plotTop;
            gridX = Math.floor(x / scaledGridSize);
            gridY = Math.floor(y / scaledGridSize);
            key = gridY + ':' + gridX;
            grid[key] ?? (grid[key] = []);
            grid[key].push({
                dataIndex: dataIndexes[i],
                x: dataX[i],
                y: dataY[i]
            });
        }
        return grid;
    },
    kmeans: function (dataX, dataY, dataIndexes, options) {
        const series = this, clusters = [], noise = [], group = {}, pointMaxDistance = options.processedDistance ||
            clusterDefaults.layoutAlgorithm.distance, iterations = options.iterations, 
        // Max pixel difference beetwen new and old cluster position.
        maxClusterShift = 1;
        let currentIteration = 0, repeat = true, pointX = 0, pointY = 0, tempPos, pointClusterDistance = [];
        options.processedGridSize = options.processedDistance;
        // Use grid method to get groupedData object.
        const groupedData = series.markerClusterAlgorithms ?
            series.markerClusterAlgorithms.grid.call(series, dataX, dataY, dataIndexes, options) : {};
        // Find clusters amount and its start positions
        // based on grid grouped data.
        for (const key in groupedData) {
            if (groupedData[key].length > 1) {
                tempPos = getClusterPosition(groupedData[key]);
                clusters.push({
                    posX: tempPos.x,
                    posY: tempPos.y,
                    oldX: 0,
                    oldY: 0,
                    startPointsLen: groupedData[key].length,
                    points: []
                });
            }
        }
        // Start kmeans iteration process.
        while (repeat) {
            for (const c of clusters) {
                c.points.length = 0;
            }
            noise.length = 0;
            for (let i = 0; i < dataX.length; i++) {
                pointX = dataX[i];
                pointY = dataY[i];
                pointClusterDistance = series.getClusterDistancesFromPoint(clusters, pointX, pointY);
                if (pointClusterDistance.length &&
                    pointClusterDistance[0].distance < pointMaxDistance) {
                    clusters[pointClusterDistance[0].clusterIndex].points.push({
                        x: pointX,
                        y: pointY,
                        dataIndex: dataIndexes[i]
                    });
                }
                else {
                    noise.push({
                        x: pointX,
                        y: pointY,
                        dataIndex: dataIndexes[i]
                    });
                }
            }
            // When cluster points array has only one point the
            // point should be classified again.
            for (let i = 0; i < clusters.length; i++) {
                if (clusters[i].points.length === 1) {
                    pointClusterDistance = series.getClusterDistancesFromPoint(clusters, clusters[i].points[0].x, clusters[i].points[0].y);
                    if (pointClusterDistance[1].distance < pointMaxDistance) {
                        // Add point to the next closest cluster.
                        clusters[pointClusterDistance[1].clusterIndex].points
                            .push(clusters[i].points[0]);
                        // Clear points array.
                        clusters[pointClusterDistance[0].clusterIndex]
                            .points.length = 0;
                    }
                }
            }
            // Compute a new clusters position and check if it
            // is different than the old one.
            repeat = false;
            for (let i = 0; i < clusters.length; i++) {
                tempPos = getClusterPosition(clusters[i].points);
                clusters[i].oldX = clusters[i].posX;
                clusters[i].oldY = clusters[i].posY;
                clusters[i].posX = tempPos.x;
                clusters[i].posY = tempPos.y;
                // Repeat the algorithm if at least one cluster
                // is shifted more than maxClusterShift property.
                if (clusters[i].posX > clusters[i].oldX + maxClusterShift ||
                    clusters[i].posX < clusters[i].oldX - maxClusterShift ||
                    clusters[i].posY > clusters[i].oldY + maxClusterShift ||
                    clusters[i].posY < clusters[i].oldY - maxClusterShift) {
                    repeat = true;
                }
            }
            // If iterations property is set repeat the algorithm
            // specified amount of times.
            if (iterations) {
                repeat = currentIteration < iterations - 1;
            }
            currentIteration++;
        }
        for (let i = 0, iEnd = clusters.length; i < iEnd; ++i) {
            group['cluster' + i] = clusters[i].points;
        }
        for (let i = 0, iEnd = noise.length; i < iEnd; ++i) {
            group['noise' + i] = [noise[i]];
        }
        return group;
    },
    optimizedKmeans: function (processedXData, processedYData, dataIndexes, options) {
        const series = this, pointMaxDistance = options.processedDistance ||
            clusterDefaults.layoutAlgorithm.gridSize, extremes = series.getRealExtremes(), clusterMarkerOptions = (series.options.cluster || {}).marker;
        let distance, group = {}, offset, radius;
        if (!series.markerClusterInfo || (series.initMaxX && series.initMaxX < extremes.maxX ||
            series.initMinX && series.initMinX > extremes.minX ||
            series.initMaxY && series.initMaxY < extremes.maxY ||
            series.initMinY && series.initMinY > extremes.minY)) {
            series.initMaxX = extremes.maxX;
            series.initMinX = extremes.minX;
            series.initMaxY = extremes.maxY;
            series.initMinY = extremes.minY;
            group = series.markerClusterAlgorithms ?
                series.markerClusterAlgorithms.kmeans.call(series, processedXData, processedYData, dataIndexes, options) : {};
            series.baseClusters = null;
        }
        else {
            series.baseClusters ?? (series.baseClusters = {
                clusters: series.markerClusterInfo.clusters,
                noise: series.markerClusterInfo.noise
            });
            for (const cluster of series.baseClusters.clusters) {
                cluster.pointsOutside = [];
                cluster.pointsInside = [];
                for (const dataPoint of cluster.data) {
                    const dataPointPx = valuesToPixels(series, dataPoint), clusterPx = valuesToPixels(series, cluster);
                    distance = Math.sqrt(Math.pow(dataPointPx.x - clusterPx.x, 2) +
                        Math.pow(dataPointPx.y - clusterPx.y, 2));
                    if (cluster.clusterZone?.marker?.radius) {
                        radius = cluster.clusterZone.marker.radius;
                    }
                    else if (clusterMarkerOptions?.radius) {
                        radius = clusterMarkerOptions.radius;
                    }
                    else {
                        radius = clusterDefaults.marker.radius;
                    }
                    offset = pointMaxDistance - radius >= 0 ?
                        pointMaxDistance - radius : radius;
                    if (distance > radius + offset &&
                        defined(cluster.pointsOutside)) {
                        cluster.pointsOutside.push(dataPoint);
                    }
                    else if (defined(cluster.pointsInside)) {
                        cluster.pointsInside.push(dataPoint);
                    }
                }
                if (cluster.pointsInside.length) {
                    group[cluster.id] = cluster.pointsInside;
                }
                let i = 0;
                for (const p of cluster.pointsOutside) {
                    group[cluster.id + '_noise' + i++] = [p];
                }
            }
            for (const noise of series.baseClusters.noise) {
                group[noise.id] = noise.data;
            }
        }
        return group;
    }
};
/* *
 *
 *  Variables
 *
 * */
let baseGeneratePoints, 
/**
 * Points that ids are included in the oldPointsStateId array are hidden
 * before animation. Other ones are destroyed.
 * @private
 */
oldPointsStateId = [], stateIdCounter = 0;
/* *
 *
 *  Functions
 *
 * */
/** @private */
function compose(highchartsDefaultOptions, ScatterSeriesClass) {
    const scatterProto = ScatterSeriesClass.prototype;
    if (!scatterProto.markerClusterAlgorithms) {
        baseGeneratePoints = scatterProto.generatePoints;
        scatterProto.markerClusterAlgorithms = markerClusterAlgorithms;
        scatterProto.animateClusterPoint = seriesAnimateClusterPoint;
        scatterProto.destroyClusteredData = seriesDestroyClusteredData;
        scatterProto.generatePoints = seriesGeneratePoints;
        scatterProto.getClusterDistancesFromPoint =
            seriesGetClusterDistancesFromPoint;
        scatterProto.getClusteredData = seriesGetClusteredData;
        scatterProto.getGridOffset = seriesGetGridOffset;
        scatterProto.getPointsState = seriesGetPointsState;
        scatterProto.getRealExtremes = seriesGetRealExtremes;
        scatterProto.getScaledGridSize = seriesGetScaledGridSize;
        scatterProto.hideClusteredData = seriesHideClusteredData;
        scatterProto.isValidGroupedDataObject = seriesIsValidGroupedDataObject;
        scatterProto.preventClusterCollisions = seriesPreventClusterCollisions;
        // Destroy grouped data on series destroy.
        addEvent(ScatterSeriesClass, 'destroy', scatterProto.destroyClusteredData);
        if (highchartsDefaultOptions.plotOptions) {
            highchartsDefaultOptions.plotOptions.series = merge(highchartsDefaultOptions.plotOptions.series, MarkerClusters_MarkerClusterDefaults);
        }
    }
}
/**
 * Util function.
 * @private
 */
function destroyOldPoints(oldState) {
    for (const key of Object.keys(oldState)) {
        oldState[key].point?.destroy?.();
    }
}
/**
 * Util function.
 * @private
 */
function fadeInElement(elem, opacity, animation) {
    elem.attr({ opacity }).animate({ opacity: 1 }, animation);
}
/**
 * Util function.
 * @private
 */
function fadeInNewPointAndDestoryOld(newPointObj, oldPoints, animation, opacity) {
    // Fade in new point.
    fadeInStatePoint(newPointObj, opacity, animation, true, true);
    // Destroy old animated points.
    for (const p of oldPoints) {
        p.point?.destroy?.();
    }
}
/**
 * Util function.
 * @private
 */
function fadeInStatePoint(stateObj, opacity, animation, fadeinGraphic, fadeinDataLabel) {
    if (stateObj.point) {
        if (fadeinGraphic && stateObj.point.graphic) {
            stateObj.point.graphic.show();
            fadeInElement(stateObj.point.graphic, opacity, animation);
        }
        if (fadeinDataLabel && stateObj.point.dataLabel) {
            stateObj.point.dataLabel.show();
            fadeInElement(stateObj.point.dataLabel, opacity, animation);
        }
    }
}
/**
 * Util function.
 * @private
 */
function getClusterPosition(points) {
    const pointsLen = points.length;
    let sumX = 0, sumY = 0;
    for (let i = 0; i < pointsLen; i++) {
        sumX += points[i].x;
        sumY += points[i].y;
    }
    return {
        x: sumX / pointsLen,
        y: sumY / pointsLen
    };
}
/**
 * Util function.Prepare array with sorted data objects to be compared in
 * getPointsState method.
 * @private
 */
function getDataState(clusteredData, stateDataLen) {
    const state = [];
    state.length = stateDataLen;
    clusteredData.clusters.forEach(function (cluster) {
        cluster.data.forEach(function (elem) {
            state[elem.dataIndex] = elem;
        });
    });
    clusteredData.noise.forEach(function (noise) {
        state[noise.data[0].dataIndex] = noise.data[0];
    });
    return state;
}
/**
 * Util function. Generate unique stateId for a state element.
 * @private
 */
function getStateId() {
    return Math.random().toString(36).substring(2, 7) + '-' + stateIdCounter++;
}
/**
 * Util function.
 * @private
 */
function hideStatePoint(stateObj, hideGraphic, hideDataLabel) {
    if (stateObj.point) {
        if (hideGraphic && stateObj.point.graphic) {
            stateObj.point.graphic.hide();
        }
        if (hideDataLabel && stateObj.point.dataLabel) {
            stateObj.point.dataLabel.hide();
        }
    }
}
/** @private */
function onPointDrillToCluster(event) {
    const point = event.point || event.target;
    point.firePointEvent('drillToCluster', event, function (e) {
        const point = e.point || e.target, series = point.series, { xAxis, yAxis, chart } = series, { inverted, mapView, pointer } = chart, drillToCluster = series.options.cluster?.drillToCluster;
        if (drillToCluster && point.clusteredData) {
            const sortedDataX = point.clusteredData
                .map((data) => data.x)
                .sort((a, b) => a - b), sortedDataY = point.clusteredData
                .map((data) => data.y)
                .sort((a, b) => a - b), minX = sortedDataX[0], maxX = sortedDataX[sortedDataX.length - 1], minY = sortedDataY[0], maxY = sortedDataY[sortedDataY.length - 1], offsetX = Math.abs((maxX - minX) * 0.1), offsetY = Math.abs((maxY - minY) * 0.1), x1 = Math.min(minX, maxX) - offsetX, x2 = Math.max(minX, maxX) + offsetX, y1 = Math.min(minY, maxY) - offsetY, y2 = Math.max(minY, maxY) + offsetY;
            if (mapView) {
                mapView.fitToBounds({ x1, x2, y1, y2 });
            }
            else if (xAxis && yAxis) {
                let x1Px = xAxis.toPixels(x1), x2Px = xAxis.toPixels(x2), y1Px = yAxis.toPixels(y1), y2Px = yAxis.toPixels(y2);
                if (inverted) {
                    [x1Px, x2Px, y1Px, y2Px] = [y1Px, y2Px, x1Px, x2Px];
                }
                if (x1Px > x2Px) {
                    [x1Px, x2Px] = [x2Px, x1Px];
                }
                if (y1Px > y2Px) {
                    [y1Px, y2Px] = [y2Px, y1Px];
                }
                if (pointer) {
                    pointer.zoomX = true;
                    pointer.zoomY = true;
                }
                chart.transform({
                    from: {
                        x: x1Px,
                        y: y1Px,
                        width: x2Px - x1Px,
                        height: y2Px - y1Px
                    }
                });
            }
        }
    });
}
/**
 * Util function.
 * @private
 */
function pixelsToValues(series, pos) {
    const { chart, xAxis, yAxis } = series;
    if (chart.mapView) {
        return chart.mapView.pixelsToProjectedUnits(pos);
    }
    return {
        x: xAxis ? xAxis.toValue(pos.x) : 0,
        y: yAxis ? yAxis.toValue(pos.y) : 0
    };
}
/** @private */
function seriesAnimateClusterPoint(clusterObj) {
    const series = this, chart = series.chart, mapView = chart.mapView, animation = animObject(series.options.cluster?.animation), animDuration = animation.duration || 500, pointsState = series.markerClusterInfo?.pointsState, newState = pointsState?.newState, oldState = pointsState?.oldState, oldPoints = [];
    let parentId, oldPointObj, newPointObj, newPointBBox, offset = 0, newX = 0, newY = 0, isOldPointGrahic = false, isCbHandled = false;
    if (oldState && newState) {
        newPointObj = newState[clusterObj.stateId];
        const newPos = valuesToPixels(series, newPointObj);
        newX = newPos.x - (mapView ? 0 : chart.plotLeft);
        newY = newPos.y - (mapView ? 0 : chart.plotTop);
        // Point has one ancestor.
        if (newPointObj.parentsId.length === 1) {
            parentId = newState?.[clusterObj.stateId].parentsId[0];
            oldPointObj = oldState[parentId];
            // If old and new positions are the same do not animate.
            if (newPointObj.point?.graphic &&
                oldPointObj.point?.plotX &&
                oldPointObj.point.plotY &&
                (oldPointObj.point.plotX !== newPointObj.point.plotX ||
                    oldPointObj.point.plotY !== newPointObj.point.plotY)) {
                newPointBBox = newPointObj.point.graphic.getBBox();
                // Marker image does not have the offset (#14342).
                offset = newPointObj.point.graphic?.isImg ?
                    0 : newPointBBox.width / 2;
                newPointObj.point.graphic.attr({
                    x: oldPointObj.point.plotX - offset,
                    y: oldPointObj.point.plotY - offset
                });
                newPointObj.point.graphic.animate({
                    x: newX - (newPointObj.point.graphic.radius || 0),
                    y: newY - (newPointObj.point.graphic.radius || 0)
                }, animation, function () {
                    isCbHandled = true;
                    // Destroy old point.
                    oldPointObj.point?.destroy?.();
                });
                // Data label animation.
                if (newPointObj.point.dataLabel?.alignAttr &&
                    oldPointObj.point.dataLabel?.alignAttr) {
                    newPointObj.point.dataLabel.attr({
                        x: oldPointObj.point.dataLabel.alignAttr.x,
                        y: oldPointObj.point.dataLabel.alignAttr.y
                    });
                    newPointObj.point.dataLabel.animate({
                        x: newPointObj.point.dataLabel.alignAttr.x,
                        y: newPointObj.point.dataLabel.alignAttr.y
                    }, animation);
                }
            }
        }
        else if (newPointObj.parentsId.length === 0) {
            // Point has no ancestors - new point.
            // Hide new point.
            hideStatePoint(newPointObj, true, true);
            syncTimeout(function () {
                // Fade in new point.
                fadeInStatePoint(newPointObj, 0.1, animation, true, true);
            }, animDuration / 2);
        }
        else {
            // Point has many ancestors.
            // Hide new point before animation.
            hideStatePoint(newPointObj, true, true);
            newPointObj.parentsId.forEach(function (elem) {
                if (oldState?.[elem]) {
                    oldPointObj = oldState[elem];
                    oldPoints.push(oldPointObj);
                    if (oldPointObj.point?.graphic) {
                        isOldPointGrahic = true;
                        oldPointObj.point.graphic.show();
                        oldPointObj.point.graphic.animate({
                            x: newX - (oldPointObj.point.graphic.radius || 0),
                            y: newY - (oldPointObj.point.graphic.radius || 0),
                            opacity: 0.4
                        }, animation, function () {
                            isCbHandled = true;
                            fadeInNewPointAndDestoryOld(newPointObj, oldPoints, animation, 0.7);
                        });
                        if (oldPointObj.point.dataLabel &&
                            oldPointObj.point.dataLabel.y !== -9999 &&
                            newPointObj.point?.dataLabel?.alignAttr) {
                            oldPointObj.point.dataLabel.show();
                            oldPointObj.point.dataLabel.animate({
                                x: newPointObj.point.dataLabel.alignAttr.x,
                                y: newPointObj.point.dataLabel.alignAttr.y,
                                opacity: 0.4
                            }, animation);
                        }
                    }
                }
            });
            // Make sure point is faded in.
            syncTimeout(function () {
                if (!isCbHandled) {
                    fadeInNewPointAndDestoryOld(newPointObj, oldPoints, animation, 0.85);
                }
            }, animDuration);
            if (!isOldPointGrahic) {
                syncTimeout(function () {
                    fadeInNewPointAndDestoryOld(newPointObj, oldPoints, animation, 0.1);
                }, animDuration / 2);
            }
        }
    }
}
/**
 * Destroy clustered data points.
 * @private
 */
function seriesDestroyClusteredData() {
    // Clear previous groups.
    this.markerClusterSeriesData?.forEach((point) => {
        point?.destroy?.();
    });
    this.markerClusterSeriesData = null;
}
/**
 * Override the generatePoints method by adding a reference to grouped data.
 * @private
 */
function seriesGeneratePoints() {
    const series = this, { chart } = series, mapView = chart.mapView, xData = series.getColumn('x'), yData = series.getColumn('y'), clusterOptions = series.options.cluster, realExtremes = series.getRealExtremes(), visibleXData = [], visibleYData = [], visibleDataIndexes = [];
    let oldPointsState, oldDataLen, oldMarkerClusterInfo, kmeansThreshold, cropDataOffsetX, cropDataOffsetY, seriesMinX, seriesMaxX, seriesMinY, seriesMaxY, type, algorithm, clusteredData, groupedData, layoutAlgOptions, point;
    // For map point series, we need to resolve lon, lat and geometry options
    // and project them on the plane in order to get x and y. In the regular
    // series flow, this is not done until the `translate` method because the
    // resulting [x, y] position depends on inset positions in the MapView.
    if (mapView && series.is('mappoint') && xData && yData) {
        series.options.data?.forEach((p, i) => {
            const xy = series.projectPoint(p);
            if (xy) {
                xData[i] = xy.x;
                yData[i] = xy.y;
            }
        });
    }
    if (clusterOptions?.enabled &&
        xData?.length &&
        yData?.length &&
        !chart.polar) {
        type = clusterOptions.layoutAlgorithm.type;
        layoutAlgOptions = clusterOptions.layoutAlgorithm;
        // Get processed algorithm properties.
        layoutAlgOptions.processedGridSize = relativeLength(layoutAlgOptions.gridSize ||
            clusterDefaults.layoutAlgorithm.gridSize, chart.plotWidth);
        layoutAlgOptions.processedDistance = relativeLength(layoutAlgOptions.distance ||
            clusterDefaults.layoutAlgorithm.distance, chart.plotWidth);
        kmeansThreshold = layoutAlgOptions.kmeansThreshold ||
            clusterDefaults.layoutAlgorithm.kmeansThreshold;
        // Offset to prevent cluster size changes.
        const halfGrid = layoutAlgOptions.processedGridSize / 2, p1 = pixelsToValues(series, { x: 0, y: 0 }), p2 = pixelsToValues(series, { x: halfGrid, y: halfGrid });
        cropDataOffsetX = Math.abs(p1.x - p2.x);
        cropDataOffsetY = Math.abs(p1.y - p2.y);
        // Get only visible data.
        for (let i = 0; i < xData.length; i++) {
            if (!series.dataMaxX) {
                if (!defined(seriesMaxX) ||
                    !defined(seriesMinX) ||
                    !defined(seriesMaxY) ||
                    !defined(seriesMinY)) {
                    seriesMaxX = seriesMinX = xData[i];
                    seriesMaxY = seriesMinY = yData[i];
                }
                else if (isNumber(yData[i]) &&
                    isNumber(seriesMaxY) &&
                    isNumber(seriesMinY)) {
                    seriesMaxX = Math.max(xData[i], seriesMaxX);
                    seriesMinX = Math.min(xData[i], seriesMinX);
                    seriesMaxY = Math.max(yData[i] || seriesMaxY, seriesMaxY);
                    seriesMinY = Math.min(yData[i] || seriesMinY, seriesMinY);
                }
            }
            // Crop data to visible ones with appropriate offset to prevent
            // cluster size changes on the edge of the plot area.
            if (xData[i] >= (realExtremes.minX - cropDataOffsetX) &&
                xData[i] <= (realExtremes.maxX + cropDataOffsetX) &&
                (yData[i] || realExtremes.minY) >=
                    (realExtremes.minY - cropDataOffsetY) &&
                (yData[i] || realExtremes.maxY) <=
                    (realExtremes.maxY + cropDataOffsetY)) {
                visibleXData.push(xData[i]);
                visibleYData.push(yData[i]);
                visibleDataIndexes.push(i);
            }
        }
        // Save data max values.
        if (defined(seriesMaxX) && defined(seriesMinX) &&
            isNumber(seriesMaxY) && isNumber(seriesMinY)) {
            series.dataMaxX = seriesMaxX;
            series.dataMinX = seriesMinX;
            series.dataMaxY = seriesMaxY;
            series.dataMinY = seriesMinY;
        }
        if (isFunction(type)) {
            algorithm = type;
        }
        else if (series.markerClusterAlgorithms) {
            if (type && series.markerClusterAlgorithms[type]) {
                algorithm = series.markerClusterAlgorithms[type];
            }
            else {
                algorithm = visibleXData.length < kmeansThreshold ?
                    series.markerClusterAlgorithms.kmeans :
                    series.markerClusterAlgorithms.grid;
            }
        }
        else {
            algorithm = () => false;
        }
        groupedData = algorithm.call(this, visibleXData, visibleYData, visibleDataIndexes, layoutAlgOptions);
        clusteredData = groupedData ? series.getClusteredData(groupedData, clusterOptions) : groupedData;
        // When animation is enabled get old points state.
        if (clusterOptions.animation &&
            series.markerClusterInfo?.pointsState?.oldState) {
            // Destroy old points.
            destroyOldPoints(series.markerClusterInfo.pointsState.oldState);
            oldPointsState = series.markerClusterInfo.pointsState.newState;
        }
        else {
            oldPointsState = {};
        }
        // Save points old state info.
        oldDataLen = xData.length;
        oldMarkerClusterInfo = series.markerClusterInfo;
        if (clusteredData) {
            series.dataTable.modified = new Data_DataTableCore({
                columns: {
                    x: clusteredData.groupedXData,
                    y: clusteredData.groupedYData
                }
            });
            series.hasGroupedData = true;
            series.markerClusterInfo = clusteredData;
            series.groupMap = clusteredData.groupMap;
        }
        baseGeneratePoints.apply(this);
        if (clusteredData && series.markerClusterInfo) {
            // Mark cluster points. Safe point reference in the cluster object.
            series.markerClusterInfo.clusters?.forEach((cluster) => {
                point = series.points[cluster.index];
                point.isCluster = true;
                point.clusteredData = cluster.data;
                point.clusterPointsAmount = cluster.data.length;
                cluster.point = point;
                // Add zoom to cluster range.
                addEvent(point, 'click', onPointDrillToCluster);
            });
            // Safe point reference in the noise object.
            series.markerClusterInfo.noise?.forEach((noise) => {
                noise.point = series.points[noise.index];
            });
            // When animation is enabled save points state.
            if (clusterOptions.animation &&
                series.markerClusterInfo) {
                series.markerClusterInfo.pointsState = {
                    oldState: oldPointsState,
                    newState: series.getPointsState(clusteredData, oldMarkerClusterInfo, oldDataLen)
                };
            }
            // Record grouped data in order to let it be destroyed the next time
            // processData runs.
            if (!clusterOptions.animation) {
                this.destroyClusteredData();
            }
            else {
                this.hideClusteredData();
            }
            this.markerClusterSeriesData =
                this.hasGroupedData ? this.points : null;
        }
    }
    else {
        baseGeneratePoints.apply(this);
    }
}
/** @private */
function seriesGetClusterDistancesFromPoint(clusters, pointX, pointY) {
    const pointClusterDistance = [];
    for (let clusterIndex = 0; clusterIndex < clusters.length; clusterIndex++) {
        const p1 = valuesToPixels(this, { x: pointX, y: pointY }), p2 = valuesToPixels(this, {
            x: clusters[clusterIndex].posX,
            y: clusters[clusterIndex].posY
        }), distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) +
            Math.pow(p1.y - p2.y, 2));
        pointClusterDistance.push({ clusterIndex, distance });
    }
    return pointClusterDistance.sort((a, b) => a.distance - b.distance);
}
/** @private */
function seriesGetClusteredData(groupedData, options) {
    const series = this, data = series.options.data, groupedXData = [], groupedYData = [], clusters = [], // Container for clusters.
    noise = [], // Container for points not belonging to any cluster.
    groupMap = [], 
    // Prevent minimumClusterSize lower than 2.
    minimumClusterSize = Math.max(2, options.minimumClusterSize || 2);
    let index = 0, stateId, point, points, pointUserOptions, pointsLen, marker, clusterPos, pointOptions, clusterTempPos, zoneOptions, clusterZone, clusterZoneClassName;
    // Check if groupedData is valid when user uses a custom algorithm.
    if (isFunction(options.layoutAlgorithm.type) &&
        !series.isValidGroupedDataObject(groupedData)) {
        error('Highcharts marker-clusters module: ' +
            'The custom algorithm result is not valid!', false, series.chart);
        return false;
    }
    for (const k in groupedData) {
        if (groupedData[k].length >= minimumClusterSize) {
            points = groupedData[k];
            stateId = getStateId();
            pointsLen = points.length;
            // Get zone options for cluster.
            if (options.zones) {
                for (let i = 0; i < options.zones.length; i++) {
                    if (pointsLen >= options.zones[i].from &&
                        pointsLen <= options.zones[i].to) {
                        clusterZone = options.zones[i];
                        clusterZone.zoneIndex = i;
                        zoneOptions = options.zones[i].marker;
                        clusterZoneClassName = options.zones[i].className;
                    }
                }
            }
            clusterTempPos = getClusterPosition(points);
            if (options.layoutAlgorithm.type === 'grid' &&
                !options.allowOverlap) {
                marker = series.options.marker || {};
                clusterPos = series.preventClusterCollisions({
                    x: clusterTempPos.x,
                    y: clusterTempPos.y,
                    key: k,
                    groupedData: groupedData,
                    gridSize: series.getScaledGridSize(options.layoutAlgorithm),
                    defaultRadius: marker.radius || 3 + (marker.lineWidth || 0),
                    clusterRadius: (zoneOptions && zoneOptions.radius) ?
                        zoneOptions.radius :
                        (options.marker || {}).radius ||
                            clusterDefaults.marker.radius
                });
            }
            else {
                clusterPos = {
                    x: clusterTempPos.x,
                    y: clusterTempPos.y
                };
            }
            for (let i = 0; i < pointsLen; i++) {
                points[i].parentStateId = stateId;
            }
            clusters.push({
                x: clusterPos.x,
                y: clusterPos.y,
                id: k,
                stateId,
                index,
                data: points,
                clusterZone,
                clusterZoneClassName
            });
            groupedXData.push(clusterPos.x);
            groupedYData.push(clusterPos.y);
            groupMap.push({
                options: {
                    formatPrefix: 'cluster',
                    dataLabels: options.dataLabels,
                    marker: merge(options.marker, {
                        states: options.states
                    }, zoneOptions || {})
                }
            });
            // Save cluster data points options.
            if (data?.length) {
                for (let i = 0; i < pointsLen; i++) {
                    if (isObject(data[points[i].dataIndex])) {
                        points[i].options = data[points[i].dataIndex];
                    }
                }
            }
            index++;
            zoneOptions = null;
        }
        else {
            for (let i = 0; i < groupedData[k].length; i++) {
                // Points not belonging to any cluster.
                point = groupedData[k][i];
                stateId = getStateId();
                pointOptions = null;
                pointUserOptions = data?.[point.dataIndex];
                groupedXData.push(point.x);
                groupedYData.push(point.y);
                point.parentStateId = stateId;
                noise.push({
                    x: point.x,
                    y: point.y,
                    id: k,
                    stateId,
                    index,
                    data: groupedData[k]
                });
                if (pointUserOptions &&
                    typeof pointUserOptions === 'object' &&
                    !MarkerClusterScatter_isArray(pointUserOptions)) {
                    pointOptions = merge(pointUserOptions, { x: point.x, y: point.y });
                }
                else {
                    pointOptions = {
                        userOptions: pointUserOptions,
                        x: point.x,
                        y: point.y
                    };
                }
                groupMap.push({ options: pointOptions });
                index++;
            }
        }
    }
    return {
        clusters,
        noise,
        groupedXData,
        groupedYData,
        groupMap
    };
}
/** @private */
function seriesGetGridOffset() {
    const series = this, { chart, xAxis, yAxis } = series;
    let plotLeft = 0, plotTop = 0;
    if (xAxis && series.dataMinX && series.dataMaxX) {
        plotLeft = xAxis.reversed ?
            xAxis.toPixels(series.dataMaxX) : xAxis.toPixels(series.dataMinX);
    }
    else {
        plotLeft = chart.plotLeft;
    }
    if (yAxis && series.dataMinY && series.dataMaxY) {
        plotTop = yAxis.reversed ?
            yAxis.toPixels(series.dataMinY) : yAxis.toPixels(series.dataMaxY);
    }
    else {
        plotTop = chart.plotTop;
    }
    return { plotLeft, plotTop };
}
/**
 * Point state used when animation is enabled to compare and bind old points
 * with new ones.
 * @private
 */
function seriesGetPointsState(clusteredData, oldMarkerClusterInfo, dataLength) {
    const oldDataStateArr = oldMarkerClusterInfo ?
        getDataState(oldMarkerClusterInfo, dataLength) : [], newDataStateArr = getDataState(clusteredData, dataLength), state = {};
    // Clear global array before populate with new ids.
    oldPointsStateId = [];
    // Build points state structure.
    clusteredData.clusters.forEach((cluster) => {
        state[cluster.stateId] = {
            x: cluster.x,
            y: cluster.y,
            id: cluster.stateId,
            point: cluster.point,
            parentsId: []
        };
    });
    clusteredData.noise.forEach((noise) => {
        state[noise.stateId] = {
            x: noise.x,
            y: noise.y,
            id: noise.stateId,
            point: noise.point,
            parentsId: []
        };
    });
    let newState, oldState;
    // Bind new and old state.
    for (let i = 0; i < newDataStateArr.length; i++) {
        newState = newDataStateArr[i];
        oldState = oldDataStateArr[i];
        if (newState?.parentStateId &&
            oldState?.parentStateId &&
            state[newState.parentStateId]?.parentsId.indexOf(oldState.parentStateId) === -1) {
            state[newState.parentStateId].parentsId.push(oldState.parentStateId);
            if (oldPointsStateId.indexOf(oldState.parentStateId) === -1) {
                oldPointsStateId.push(oldState.parentStateId);
            }
        }
    }
    return state;
}
/** @private */
function seriesGetRealExtremes() {
    const chart = this.chart, x = chart.mapView ? 0 : chart.plotLeft, y = chart.mapView ? 0 : chart.plotTop, p1 = pixelsToValues(this, {
        x,
        y
    }), p2 = pixelsToValues(this, {
        x: x + chart.plotWidth,
        y: x + chart.plotHeight
    }), realMinX = p1.x, realMaxX = p2.x, realMinY = p1.y, realMaxY = p2.y;
    return {
        minX: Math.min(realMinX, realMaxX),
        maxX: Math.max(realMinX, realMaxX),
        minY: Math.min(realMinY, realMaxY),
        maxY: Math.max(realMinY, realMaxY)
    };
}
/** @private */
function seriesGetScaledGridSize(options) {
    const series = this, xAxis = series.xAxis, mapView = series.chart.mapView, processedGridSize = options.processedGridSize ||
        clusterDefaults.layoutAlgorithm.gridSize;
    let search = true, k = 1, divider = 1;
    if (!series.gridValueSize) {
        if (mapView) {
            series.gridValueSize = processedGridSize / mapView.getScale();
        }
        else {
            series.gridValueSize = Math.abs(xAxis.toValue(processedGridSize) - xAxis.toValue(0));
        }
    }
    const gridSize = mapView ?
        series.gridValueSize * mapView.getScale() :
        xAxis.toPixels(series.gridValueSize) - xAxis.toPixels(0);
    const scale = +(processedGridSize / gridSize).toFixed(14);
    // Find the level and its divider.
    while (search && scale !== 1) {
        const level = Math.pow(2, k);
        if (scale > 0.75 && scale < 1.25) {
            search = false;
        }
        else if (scale >= (1 / level) && scale < 2 * (1 / level)) {
            search = false;
            divider = level;
        }
        else if (scale <= level && scale > level / 2) {
            search = false;
            divider = 1 / level;
        }
        k++;
    }
    return (processedGridSize / divider) / scale;
}
/**
 * Hide clustered data points.
 * @private
 */
function seriesHideClusteredData() {
    const clusteredSeriesData = this.markerClusterSeriesData, oldState = this.markerClusterInfo?.pointsState?.oldState, oldPointsId = oldPointsStateId.map((elem) => oldState?.[elem].point?.id || '');
    clusteredSeriesData?.forEach((point) => {
        // If an old point is used in animation hide it, otherwise destroy.
        if (point &&
            oldPointsId.indexOf(point.id) !== -1) {
            if (point.graphic) {
                point.graphic.hide();
            }
            if (point.dataLabel) {
                point.dataLabel.hide();
            }
        }
        else {
            point?.destroy?.();
        }
    });
}
/**
 * Check if user algorithm result is valid groupedDataObject.
 * @private
 */
function seriesIsValidGroupedDataObject(groupedData) {
    let result = false;
    if (!isObject(groupedData)) {
        return false;
    }
    MarkerClusterScatter_objectEach(groupedData, (elem) => {
        result = true;
        if (!MarkerClusterScatter_isArray(elem) || !elem.length) {
            result = false;
            return;
        }
        for (let i = 0; i < elem.length; i++) {
            if (!isObject(elem[i]) || (!elem[i].x || !elem[i].y)) {
                result = false;
                return;
            }
        }
    });
    return result;
}
/** @private */
function seriesPreventClusterCollisions(props) {
    const series = this, [gridY, gridX] = props.key.split(':').map(parseFloat), gridSize = props.gridSize, groupedData = props.groupedData, defaultRadius = props.defaultRadius, clusterRadius = props.clusterRadius, gridXPx = gridX * gridSize, gridYPx = gridY * gridSize, propsPx = valuesToPixels(series, props), gridsToCheckCollision = [], clusterMarkerOptions = series.options.cluster?.marker, zoneOptions = series.options.cluster?.zones, gridOffset = series.getGridOffset();
    let xPixel = propsPx.x, yPixel = propsPx.y, pointsLen = 0, radius = 0, nextXPixel, nextYPixel, signX, signY, cornerGridX, cornerGridY, j, itemX, itemY, nextClusterPos, maxDist, keys;
    // Distance to the grid start.
    xPixel -= gridOffset.plotLeft;
    yPixel -= gridOffset.plotTop;
    for (let i = 1; i < 5; i++) {
        signX = i % 2 ? -1 : 1;
        signY = i < 3 ? -1 : 1;
        cornerGridX = Math.floor((xPixel + signX * clusterRadius) / gridSize);
        cornerGridY = Math.floor((yPixel + signY * clusterRadius) / gridSize);
        keys = [
            cornerGridY + ':' + cornerGridX,
            cornerGridY + ':' + gridX,
            gridY + ':' + cornerGridX
        ];
        for (j = 0; j < keys.length; j++) {
            if (gridsToCheckCollision.indexOf(keys[j]) === -1 &&
                keys[j] !== props.key) {
                gridsToCheckCollision.push(keys[j]);
            }
        }
    }
    for (const item of gridsToCheckCollision) {
        if (groupedData[item]) {
            // Cluster or noise position is already computed.
            if (!groupedData[item].posX) {
                nextClusterPos = getClusterPosition(groupedData[item]);
                groupedData[item].posX = nextClusterPos.x;
                groupedData[item].posY = nextClusterPos.y;
            }
            const pos = valuesToPixels(series, {
                x: groupedData[item].posX || 0,
                y: groupedData[item].posY || 0
            });
            nextXPixel = pos.x - gridOffset.plotLeft;
            nextYPixel = pos.y - gridOffset.plotTop;
            [itemY, itemX] = item.split(':').map(parseFloat);
            if (zoneOptions) {
                pointsLen = groupedData[item].length;
                for (let i = 0; i < zoneOptions.length; i++) {
                    if (pointsLen >= zoneOptions[i].from &&
                        pointsLen <= zoneOptions[i].to) {
                        if (defined(zoneOptions[i].marker?.radius)) {
                            radius = zoneOptions[i].marker.radius || 0;
                        }
                        else if (clusterMarkerOptions?.radius) {
                            radius = clusterMarkerOptions.radius;
                        }
                        else {
                            radius = clusterDefaults.marker.radius;
                        }
                    }
                }
            }
            if (groupedData[item].length > 1 &&
                radius === 0 &&
                clusterMarkerOptions?.radius) {
                radius = clusterMarkerOptions.radius;
            }
            else if (groupedData[item].length === 1) {
                radius = defaultRadius;
            }
            maxDist = clusterRadius + radius;
            radius = 0;
            if (itemX !== gridX &&
                Math.abs(xPixel - nextXPixel) < maxDist) {
                xPixel = itemX - gridX < 0 ? gridXPx + clusterRadius :
                    gridXPx + gridSize - clusterRadius;
            }
            if (itemY !== gridY &&
                Math.abs(yPixel - nextYPixel) < maxDist) {
                yPixel = itemY - gridY < 0 ? gridYPx + clusterRadius :
                    gridYPx + gridSize - clusterRadius;
            }
        }
    }
    const pos = pixelsToValues(series, {
        x: xPixel + gridOffset.plotLeft,
        y: yPixel + gridOffset.plotTop
    });
    groupedData[props.key].posX = pos.x;
    groupedData[props.key].posY = pos.y;
    return pos;
}
/**
 * Util function.
 * @private
 */
function valuesToPixels(series, pos) {
    const { chart, xAxis, yAxis } = series;
    if (chart.mapView) {
        return chart.mapView.projectedUnitsToPixels(pos);
    }
    return {
        x: xAxis ? xAxis.toPixels(pos.x) : 0,
        y: yAxis ? yAxis.toPixels(pos.y) : 0
    };
}
/* *
 *
 *  Default Export
 *
 * */
const MarkerClusterScatter = {
    compose
};
/* harmony default export */ const MarkerClusters_MarkerClusterScatter = (MarkerClusterScatter);

;// ./code/es-modules/Extensions/MarkerClusters/MarkerClusters.js
/* *
 *
 *  Marker clusters module.
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  Author: Wojciech Chmiel
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { animObject: MarkerClusters_animObject } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { defaultOptions } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { composed } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());



const { addEvent: MarkerClusters_addEvent, defined: MarkerClusters_defined, error: MarkerClusters_error, isFunction: MarkerClusters_isFunction, merge: MarkerClusters_merge, pushUnique, syncTimeout: MarkerClusters_syncTimeout } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Constants
 *
 * */
(defaultOptions.plotOptions || {}).series = MarkerClusters_merge((defaultOptions.plotOptions || {}).series, MarkerClusters_MarkerClusterDefaults);
/* *
 *
 *  Functions
 *
 * */
/** @private */
function MarkerClusters_compose(AxisClass, ChartClass, highchartsDefaultOptions, SeriesClass) {
    if (pushUnique(composed, 'MarkerClusters')) {
        const PointClass = SeriesClass.prototype.pointClass, { scatter: ScatterSeries } = SeriesClass.types;
        MarkerClusters_addEvent(AxisClass, 'setExtremes', onAxisSetExtremes);
        MarkerClusters_addEvent(ChartClass, 'render', onChartRender);
        MarkerClusters_addEvent(PointClass, 'drillToCluster', MarkerClusters_onPointDrillToCluster);
        MarkerClusters_addEvent(PointClass, 'update', onPointUpdate);
        MarkerClusters_addEvent(SeriesClass, 'afterRender', onSeriesAfterRender);
        if (ScatterSeries) {
            MarkerClusters_MarkerClusterScatter
                .compose(highchartsDefaultOptions, ScatterSeries);
        }
    }
}
/**
 * Destroy the old tooltip after zoom.
 * @private
 */
function onAxisSetExtremes() {
    const chart = this.chart;
    let animationDuration = 0;
    for (const series of chart.series) {
        if (series.markerClusterInfo) {
            animationDuration = (MarkerClusters_animObject((series.options.cluster || {}).animation).duration ||
                0);
        }
    }
    MarkerClusters_syncTimeout(() => {
        if (chart.tooltip) {
            chart.tooltip.destroy();
        }
    }, animationDuration);
}
/**
 * Handle animation.
 * @private
 */
function onChartRender() {
    const chart = this;
    for (const series of (chart.series || [])) {
        if (series.markerClusterInfo) {
            const options = series.options.cluster, pointsState = (series.markerClusterInfo || {}).pointsState, oldState = (pointsState || {}).oldState;
            if ((options || {}).animation &&
                series.markerClusterInfo &&
                (series.chart.pointer?.pinchDown || []).length === 0 &&
                ((series.xAxis || {}).eventArgs || {}).trigger !== 'pan' &&
                oldState &&
                Object.keys(oldState).length) {
                for (const cluster of series.markerClusterInfo.clusters) {
                    series.animateClusterPoint(cluster);
                }
                for (const noise of series.markerClusterInfo.noise) {
                    series.animateClusterPoint(noise);
                }
            }
        }
    }
}
/** @private */
function MarkerClusters_onPointDrillToCluster(event) {
    const point = event.point || event.target, series = point.series, clusterOptions = series.options.cluster, onDrillToCluster = ((clusterOptions || {}).events || {}).drillToCluster;
    if (MarkerClusters_isFunction(onDrillToCluster)) {
        onDrillToCluster.call(this, event);
    }
}
/**
 * Override point prototype to throw a warning when trying to update
 * clustered point.
 * @private
 */
function onPointUpdate() {
    const point = this;
    if (point.dataGroup) {
        MarkerClusters_error('Highcharts marker-clusters module: ' +
            'Running `Point.update` when point belongs to clustered series' +
            ' is not supported.', false, point.series.chart);
        return false;
    }
}
/**
 * Add classes, change mouse cursor.
 * @private
 */
function onSeriesAfterRender() {
    const series = this, clusterZoomEnabled = (series.options.cluster || {}).drillToCluster;
    if (series.markerClusterInfo && series.markerClusterInfo.clusters) {
        for (const cluster of series.markerClusterInfo.clusters) {
            if (cluster.point && cluster.point.graphic) {
                cluster.point.graphic.addClass('highcharts-cluster-point');
                // Change cursor to pointer when drillToCluster is enabled.
                if (clusterZoomEnabled && cluster.point) {
                    cluster.point.graphic.css({
                        cursor: 'pointer'
                    });
                    if (cluster.point.dataLabel) {
                        cluster.point.dataLabel.css({
                            cursor: 'pointer'
                        });
                    }
                }
                if (MarkerClusters_defined(cluster.clusterZone)) {
                    cluster.point.graphic.addClass(cluster.clusterZoneClassName ||
                        'highcharts-cluster-zone-' +
                            cluster.clusterZone.zoneIndex);
                }
            }
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
const MarkerClusters = {
    compose: MarkerClusters_compose
};
/* harmony default export */ const MarkerClusters_MarkerClusters = (MarkerClusters);
/* *
 *
 *  API Options
 *
 * */
/**
 * Function callback when a cluster is clicked.
 *
 * @callback Highcharts.MarkerClusterDrillCallbackFunction
 *
 * @param {Highcharts.Point} this
 *        The point where the event occurred.
 *
 * @param {Highcharts.PointClickEventObject} event
 *        Event arguments.
 */
''; // Keeps doclets above in JS file

;// ./code/es-modules/Extensions/MarkerClusters/MarkerClusterSymbols.js
/* *
 *
 *  Marker clusters module.
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  Author: Wojciech Chmiel
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  Variables
 *
 * */
let symbols;
/* *
 *
 *  Functions
 *
 * */
/**
 * Cluster symbol.
 * @private
 */
function MarkerClusterSymbols_cluster(x, y, width, height) {
    const w = width / 2, h = height / 2, outerWidth = 1, space = 1, inner = symbols.arc(x + w, y + h, w - space * 4, h - space * 4, {
        start: Math.PI * 0.5,
        end: Math.PI * 2.5,
        open: false
    }), outer1 = symbols.arc(x + w, y + h, w - space * 3, h - space * 3, {
        start: Math.PI * 0.5,
        end: Math.PI * 2.5,
        innerR: w - outerWidth * 2,
        open: false
    }), outer2 = symbols.arc(x + w, y + h, w - space, h - space, {
        start: Math.PI * 0.5,
        end: Math.PI * 2.5,
        innerR: w,
        open: false
    });
    return outer2.concat(outer1, inner);
}
/**
 * @private
 */
function MarkerClusterSymbols_compose(SVGRendererClass) {
    symbols = SVGRendererClass.prototype.symbols;
    symbols.cluster = MarkerClusterSymbols_cluster;
}
/* *
 *
 *  Default Export
 *
 * */
const MarkerClusterSymbols = {
    compose: MarkerClusterSymbols_compose
};
/* harmony default export */ const MarkerClusters_MarkerClusterSymbols = (MarkerClusterSymbols);

;// ./code/es-modules/masters/modules/marker-clusters.src.js





const G = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
MarkerClusters_MarkerClusters.compose(G.Axis, G.Chart, G.defaultOptions, G.Series);
MarkerClusters_MarkerClusterSymbols.compose(G.SVGRenderer);
/* harmony default export */ const marker_clusters_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});