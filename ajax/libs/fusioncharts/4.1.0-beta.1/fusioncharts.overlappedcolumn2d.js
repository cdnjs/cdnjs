
(function (factory) {
  if (typeof module === 'object' && typeof module.exports !== "undefined") {
      module.exports = factory;
  } else {
      factory();
  }
}(function () {
"use strict";
(self["webpackChunkFusionCharts"] = self["webpackChunkFusionCharts"] || []).push([[9],{

/***/ 1624:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _mscartesian = _interopRequireDefault(__webpack_require__(626));

var _overlappedcolumn2d = _interopRequireDefault(__webpack_require__(1625));

var _columnOverlapped = _interopRequireDefault(__webpack_require__(1621));

var _multiseriesDataset = _interopRequireDefault(__webpack_require__(628));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var CHART_STR = 'Multi-series Overlapped Column Chart',
    COLUMN_STR = 'column';
/**
 * Class for multiseries column charts and who depend on this class
 * @type {class}
 */

var OverlappedColumn2D = /*#__PURE__*/function (_MSCartesian) {
  (0, _inheritsLoose2.default)(OverlappedColumn2D, _MSCartesian);

  /**
   * constructor function of this class
   */
  function OverlappedColumn2D() {
    var _this;

    _this = _MSCartesian.call(this) || this;
    _this.eiMethods = {};

    _this.registerFactory('dataset', _multiseriesDataset.default, ['vCanvas']);

    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = OverlappedColumn2D.prototype;

  _proto.getName = function getName() {
    return 'OverlappedColumn2D';
  }
  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  ;

  OverlappedColumn2D.getName = function getName() {
    return 'OverlappedColumn2D';
  }
  /**
   * parse defualt configuration of the chart
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSCartesian.prototype.__setDefaultConfig.call(this);

    this.config.friendlyName = CHART_STR;
    this.config.defaultDatasetType = COLUMN_STR;
    this.config.enablemousetracking = true;
  }
  /**
   * This method return the dataset definations for this charts
   * @return {Object}       Column dataset definition
   */
  ;

  _proto.getDSdef = function getDSdef() {
    return _overlappedcolumn2d.default;
  }
  /**
   * This method return the dataset-group definations for this charts
   * @return {class} manager API for overlap column
   */
  ;

  _proto.getDSGroupdef = function getDSGroupdef() {
    return _columnOverlapped.default;
  };

  return OverlappedColumn2D;
}(_mscartesian.default);

var _default = OverlappedColumn2D;
exports["default"] = _default;

/***/ }),

/***/ 1625:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _lib = __webpack_require__(274);

var _column = _interopRequireDefault(__webpack_require__(595));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var UNDEF;
/**
 * This methods checks if current datalabel overlaps with any of the datalabels of same index
 * @param {Object} currDataDimensions current data object
 * @param {Array} prevDataDimensions previous data objects of different series but of same index.
 * @returns {Boolean} a boolean value that indicates whether the value overlaps with previous values.
 */

function checkOverlap(currDataDimensions, prevDataDimensions) {
  var i,
      len,
      currentLabelYPos = currDataDimensions.y,
      prevLabelYPos,
      currentLabelHeight = currDataDimensions.height,
      prevlabelHeight;

  for (i = 0, len = prevDataDimensions.length; i < len; i++) {
    prevlabelHeight = prevDataDimensions[i].height;
    prevLabelYPos = prevDataDimensions[i].y;

    if (prevDataDimensions[i].labelShown && currentLabelYPos + currentLabelHeight >= prevLabelYPos && prevLabelYPos + prevlabelHeight >= currentLabelYPos) {
      return true;
    }
  }

  return false;
}

var OverlappedColumn = /*#__PURE__*/function (_Column) {
  (0, _inheritsLoose2.default)(OverlappedColumn, _Column);

  function OverlappedColumn() {
    var _this;

    _this = _Column.call(this) || this; // this map stores the dimensions of the datalabels.used for checking if two labels overlap

    _this._labeldimensionMap = {};
    return _this;
  }
  /**
   * This function is used for drawing the data labels.
   * This function is called once for each dataset when the are drawn and shown/hidden from the draw()
   * function of the Column class.
   * @param {number} start   start index
   * @param {number} end     end index
   */


  var _proto = OverlappedColumn.prototype;

  _proto.drawLabel = function drawLabel(start, end) {
    var dataSet = this,
        chart = dataSet.getFromEnv('chart'),
        animationManager = dataSet.getFromEnv('animationManager'),
        toolTipController = dataSet.getFromEnv('toolTipController'),
        chartConfig = chart.config,
        xAxis = dataSet.getFromEnv('xAxis'),
        paper = dataSet.getFromEnv('paper'),
        visible = dataSet.getState('visible'),
        smartLabel = chart.getFromEnv('smartLabel'),
        style = chart.config.dataLabelStyle,
        conf = dataSet.config,
        len = xAxis.getTicksLen(),
        components = dataSet.components,
        dataStore = components.data,
        pool = components.pool,
        skipLabelDraw,
        dataObj,
        attr,
        i,
        j,
        rotateValues = chartConfig.rotatevalues ? 270 : 0,
        graphic,
        setValue,
        config,
        showValue,
        label,
        tempGraphics,
        prevDataDims,
        currentDataDim = {},
        currDatasetIndex = dataSet.getJSONIndex(),
        dataLabelContainer,
        skipInfo = dataSet.getSkippingInfo && dataSet.getSkippingInfo(),
        skippingApplied = skipInfo && skipInfo.skippingApplied,
        plotDrawArray = skipInfo && skipInfo.labelDraw || [],
        plotDrawArrayLength = plotDrawArray.length,
        startIndex = (0, _lib.pluckNumber)(start, 0),
        endIndex = (0, _lib.pluckNumber)(end, skippingApplied ? plotDrawArrayLength : len),
        notParticularLabeDraw = plotDrawArrayLength === Math.abs(endIndex - (startIndex + 1)),
        hideCallbackFn = function hideCallbackFn() {
      this.attr({
        'text-bound': []
      });
      this.hide();
    },
        showCallbackFn = function showCallbackFn() {
      this.show();
    };

    dataLabelContainer = dataSet.getContainer('labelGroup');
    dataLabelContainer.css({
      fontFamily: style.fontFamily,
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      fontStyle: style.fontStyle
    });
    dataLabelContainer.show();
    smartLabel.useEllipsesOnOverflow(chart.config.useEllipsesWhenOverflow);
    smartLabel.setStyle(style);

    for (j = startIndex; j < endIndex; j++) {
      i = skippingApplied && notParticularLabeDraw ? plotDrawArray[j] : j;
      dataObj = dataStore[i];
      config = dataObj && dataObj.config;
      setValue = config && config.setValue;

      if (dataObj === UNDEF || setValue === UNDEF || setValue === null || config.labelSkip === true) {
        config && delete config.labelSkip;
        tempGraphics = dataObj && dataObj.graphics;

        if (tempGraphics) {
          tempGraphics.label && tempGraphics.label.hide();
        }

        continue;
      }

      graphic = dataObj.graphics;

      if (!graphic) {
        continue;
      }

      showValue = config.showValue; // get the dimensions of datalabels of same index but of previous datasets

      prevDataDims = chart.getDatasets().map(
      /* eslint-disable-next-line */
      function (dataset) {
        return dataset.getJSONIndex() < currDatasetIndex && dataset._labeldimensionMap[j];
      }).filter(Boolean);

      if (conf.showValues && config.showValue) {
        // current datalabel dimensions
        currentDataDim = {
          x: config.props.label.attr.x,
          y: config.props.label.attr.y,
          width: config._state.labelWidth,
          height: config._state.labelHeight
        }; // check for overlap

        skipLabelDraw = checkOverlap(currentDataDim, prevDataDims);
      } // update curent label dimensions


      dataSet._labeldimensionMap[j] = currentDataDim;

      if (!showValue || setValue === null || skipLabelDraw) {
        if (graphic.label) {
          animationManager.setAnimation({
            el: graphic.label,
            component: dataSet,
            doNotRemove: true,
            callback: hideCallbackFn,
            label: 'plotLabel'
          });
        }

        dataSet._labeldimensionMap[j].labelShown = false;
        continue;
      }

      attr = config.props.label.attr;
      attr.transform = paper.getSuggestiveRotation(rotateValues, attr.x, attr.y);

      if (!(label = graphic.label)) {
        if (pool && pool.label[0]) {
          label = graphic.label = pool.label[0];
          pool.label.splice(0, 1);
        }
      }

      label = animationManager.setAnimation({
        el: graphic.label || 'text',
        attr: attr,
        component: dataSet,
        label: 'plotLabel',
        index: i,
        container: dataLabelContainer,
        callback: !visible ? hideCallbackFn : showCallbackFn
      });
      label && label.outlineText(conf.showTextOutline, attr.fill);

      if (chartConfig.showtooltip && label.abbrArr && label.abbrArr.length) {
        toolTipController.enableToolTip(label, UNDEF);
      }

      if (visible) {
        dataSet._labeldimensionMap[j].labelShown = true;
      } else {
        dataSet._labeldimensionMap[j].labelShown = false;
      }

      if (!graphic.label) {
        graphic.label = dataSet.addGraphicalElement('plotLabel', label, true);
      }
    }

    conf.labelDrawn = true;
  };

  return OverlappedColumn;
}(_column.default);

var _default = OverlappedColumn;
exports["default"] = _default;

/***/ }),

/***/ 1622:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _overlappedcolumn2d = _interopRequireDefault(__webpack_require__(1623));

exports.OverlapperColumn2D = _overlappedcolumn2d.default;

var _crossline = _interopRequireDefault(__webpack_require__(1474));

var _default = {
  name: 'overlappedcolumn2d',
  type: 'package',
  requiresFusionCharts: true,
  extension: function extension(FusionCharts) {
    FusionCharts.addDep(_crossline.default);
    FusionCharts.addDep(_overlappedcolumn2d.default);
  }
};
exports["default"] = _default;

/***/ }),

/***/ 1623:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _overlappedcolumn2d = _interopRequireDefault(__webpack_require__(1624));

var _default = _overlappedcolumn2d.default;
exports["default"] = _default;

/***/ })

}]);
}));

//# sourceMappingURL=http://localhost:3052/4.1.0-beta.1/map/eval/fusioncharts.overlappedcolumn2d.js.map