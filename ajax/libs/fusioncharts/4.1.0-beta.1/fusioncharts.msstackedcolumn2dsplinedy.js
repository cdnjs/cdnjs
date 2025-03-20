
(function (factory) {
  if (typeof module === 'object' && typeof module.exports !== "undefined") {
      module.exports = factory;
  } else {
      factory();
  }
}(function () {
"use strict";
(self["webpackChunkFusionCharts"] = self["webpackChunkFusionCharts"] || []).push([[7],{

/***/ 1615:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _msstackedcolumn2dlinedy = _interopRequireDefault(__webpack_require__(706));

var _msspline = _interopRequireDefault(__webpack_require__(687));

var _column = _interopRequireDefault(__webpack_require__(595));

var _cartesianStack = _interopRequireDefault(__webpack_require__(698));

var _msstackedcolumnSplineDataset = _interopRequireDefault(__webpack_require__(1616));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var CHART_STR = 'Multi-series Dual Y-Axis Stacked Column and Line Chart',
    SPLIE_STR = 'spline',
    COLUMN_STR = 'column';
/**
 * class definition for MSStackedColumn2DSplineDy chart api
 */

var MSStackedColumn2DSplineDy = /*#__PURE__*/function (_MSStackedColumn2DLin) {
  (0, _inheritsLoose2.default)(MSStackedColumn2DSplineDy, _MSStackedColumn2DLin);

  /**
   * constructor fn
   */
  function MSStackedColumn2DSplineDy() {
    var _this;

    _this = _MSStackedColumn2DLin.call(this) || this;
    _this.stack100percent = 0;
    _this.hasLineSet = true;
    _this.lineset = true;

    _this.registerFactory('dataset', _msstackedcolumnSplineDataset.default, ['vCanvas']);

    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = MSStackedColumn2DSplineDy.prototype;

  _proto.getName = function getName() {
    return 'MSStackedColumn2DSplineDy';
  }
  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  ;

  MSStackedColumn2DSplineDy.getName = function getName() {
    return 'MSStackedColumn2DSplineDy';
  }
  /**
   * This sets the default configuration
   * @memberof MSStackedColumn2DSplineDy
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSStackedColumn2DLin.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.sDefaultDatasetType = SPLIE_STR;
    config.friendlyName = CHART_STR;
    config.defaultDatasetType = COLUMN_STR;
  }
  /**
   * This method return the dataset definations for this charts
   * @param  {string} name type of dataset class
   * @return {Object}      dataset class
   */
  ;

  _proto.getDSdef = function getDSdef(name) {
    return name === 'spline' ? _msspline.default : _column.default;
  }
  /**
   * This method return the dataset-group definations for this charts
   * @param  {string} name is type of dataset group
   * @return {Object} <dataset group class>     dataset group class
   */
  ;

  _proto.getDSGroupdef = function getDSGroupdef() {
    return _cartesianStack.default;
  };

  return MSStackedColumn2DSplineDy;
}(_msstackedcolumn2dlinedy.default);

var _default = MSStackedColumn2DSplineDy;
exports["default"] = _default;

/***/ }),

/***/ 1616:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = _default;

var _msstackedcolumnDataset = _interopRequireDefault(__webpack_require__(703));

var _lib = __webpack_require__(274);

var removeLineSet = function removeLineSet(component) {
  var lineSet = component.getChildren('dataset_line'),
      i;

  for (i = lineSet && lineSet.length - 1; i > -1; i--) {
    lineSet[i].remove();
  }
};
/**
 * function to  create dataset, groupmaneger.
 * assign dataset to group manager.
 * @param {Object} chart Chart API
 **/


function _default(chart) {
  var jsonData = chart.getFromEnv('dataSource'),
      dataset = jsonData.dataset,
      splineSets = jsonData.lineset || [],
      splinesetStartIndex,
      indices,
      canvas = chart.getChildren('canvas')[0],
      vCanvas = canvas.getChildren('vCanvas')[1];

  if (!dataset && splineSets.length === 0) {
    chart.setChartMessage();
    return;
  }

  (0, _msstackedcolumnDataset.default)(chart);
  splinesetStartIndex = chart.config._lastDatasetIndex + 1;

  if (splineSets && splineSets.length) {
    indices = Array(splineSets.length).fill(splinesetStartIndex).map(function (n, j) {
      return n + j;
    });
    (0, _lib.datasetFactory)(vCanvas, chart.getDSdef('spline'), 'dataset_spline', splineSets.length, splineSets, indices);
  } else {
    removeLineSet(vCanvas);
  }
}

/***/ }),

/***/ 1613:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _msstackedcolumn2dsplinedy = _interopRequireDefault(__webpack_require__(1614));

exports.MSStackedColumn2DSplineDY = _msstackedcolumn2dsplinedy.default;
var _default = {
  name: 'msstackedcolumn2dsplinedy',
  type: 'package',
  requiresFusionCharts: true,
  extension: function extension(FusionCharts) {
    return FusionCharts.addDep(_msstackedcolumn2dsplinedy.default);
  }
};
exports["default"] = _default;

/***/ }),

/***/ 1614:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _msstackedcolumn2dsplinedy = _interopRequireDefault(__webpack_require__(1615));

var _default = _msstackedcolumn2dsplinedy.default;
exports["default"] = _default;

/***/ })

}]);
}));

//# sourceMappingURL=http://localhost:3052/4.1.0-beta.1/map/eval/fusioncharts.msstackedcolumn2dsplinedy.js.map