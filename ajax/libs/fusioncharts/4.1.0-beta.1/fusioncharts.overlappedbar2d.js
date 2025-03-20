
(function (factory) {
  if (typeof module === 'object' && typeof module.exports !== "undefined") {
      module.exports = factory;
  } else {
      factory();
  }
}(function () {
"use strict";
(self["webpackChunkFusionCharts"] = self["webpackChunkFusionCharts"] || []).push([[8],{

/***/ 1619:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _msbarcartesian = _interopRequireDefault(__webpack_require__(625));

var _overlappedbar2d = _interopRequireDefault(__webpack_require__(1620));

var _multiseriesDataset = _interopRequireDefault(__webpack_require__(628));

var _columnOverlapped = _interopRequireDefault(__webpack_require__(1621));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var CHART_STR = 'Multi-series Bar Chart',
    BAR2D_STR = 'bar2d';
/**
 * class definition for overlapped bar chart API
 */

var OverlappedBar2D = /*#__PURE__*/function (_MSBarCartesian) {
  (0, _inheritsLoose2.default)(OverlappedBar2D, _MSBarCartesian);

  /**
   * constructor fn
   */
  function OverlappedBar2D() {
    var _this;

    _this = _MSBarCartesian.call(this) || this;
    _this.isBar = true;

    _this.registerFactory('dataset', _multiseriesDataset.default, ['vCanvas']);

    return _this;
  }
  /**
   * parse defualt configuration of the chart
   * @memberof OverlappedBar2D
   */


  var _proto = OverlappedBar2D.prototype;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSBarCartesian.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = CHART_STR;
    config.hasLegend = true;
    config.defaultDatasetType = BAR2D_STR;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  _proto.getName = function getName() {
    return 'OverlappedBar2D';
  }
  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  ;

  OverlappedBar2D.getName = function getName() {
    return 'OverlappedBar2D';
  }
  /**
   * This method return the dataset definations for this charts
   * @return {class} overlappedbar dataset class definition
   */
  ;

  _proto.getDSdef = function getDSdef() {
    return _overlappedbar2d.default;
  }
  /**
   * This method return the dataset-group definations for this charts
   * @return {class} manager API for overlap column
   */
  ;

  _proto.getDSGroupdef = function getDSGroupdef() {
    return _columnOverlapped.default;
  };

  return OverlappedBar2D;
}(_msbarcartesian.default);

var _default = OverlappedBar2D;
exports["default"] = _default;

/***/ }),

/***/ 1620:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _lib = __webpack_require__(274);

var _bar2d = _interopRequireDefault(__webpack_require__(640));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var UNDEF,
    visibleStr = _lib.preDefStr.visibleStr,
    hiddenStr = _lib.preDefStr.hiddenStr,
    POSITION_MIDDLE = _lib.preDefStr.POSITION_MIDDLE,
    POSITION_START = _lib.preDefStr.POSITION_START,
    POSITION_END = _lib.preDefStr.POSITION_END,
    math = Math,
    mathMax = math.max,
    defined = function defined(obj) {
  return obj !== UNDEF && obj !== null;
};
/**
 * This methods checks if current datalabel overlaps with any of the datalabels of same index
 * @param {Object} currDataDimensions current data object
 * @param {Array} prevDataDimensions previous data objects of different series but of same index.
 * @returns {Boolean} a boolean value that indicates whether the value overlaps with previous values.
 */


function checkOverlap(currDataDimensions, prevDataDimensions) {
  var i,
      len,
      currentLabelXPos = currDataDimensions.x,
      prevLabelXPos,
      currentLabelWidth = currDataDimensions.width,
      prevlabelWidth;

  for (i = 0, len = prevDataDimensions.length; i < len; i++) {
    prevlabelWidth = prevDataDimensions[i].width;
    prevLabelXPos = prevDataDimensions[i].x;

    if (prevDataDimensions[i].labelShown && currentLabelXPos + currentLabelWidth >= prevLabelXPos && prevLabelXPos + prevlabelWidth >= currentLabelXPos) {
      return true;
    }
  }

  return false;
}

var OverlappedColumn = /*#__PURE__*/function (_Bar) {
  (0, _inheritsLoose2.default)(OverlappedColumn, _Bar);

  function OverlappedColumn() {
    var _this;

    _this = _Bar.call(this) || this; // this map stores the dimensions of the datalabels.used for checking if two labels overlap

    _this._labeldimensionMap = {};
    return _this;
  }

  var _proto = OverlappedColumn.prototype;

  _proto.drawLabel = function drawLabel() {
    var dataSet = this,
        chart = dataSet.getFromEnv('chart'),
        chartConf = chart.config,
        conf = dataSet.config,
        JSONData = conf.JSONData,
        animationManager = dataSet.getFromEnv('animationManager'),
        toolTipController = dataSet.getFromEnv('toolTipController'),
        canvasConf = chart.getChildren('canvas')[0].config,
        style = chart.config.dataLabelStyle,
        setDataArr = JSONData.data,
        categories = chart.config.categories,
        is3D = chart.config.is3D,
        isStacked = chart.config.isstacked,
        catLen = categories && categories.length,
        dataSetLen = setDataArr && setDataArr.length,
        len,
        dataStore = dataSet.getData(),
        SmartLabel = chart.getFromEnv('smartLabel'),
        dataObj,
        attr,
        yDepth = canvasConf.yDepth,
        xDepth = canvasConf.xDepth,
        numberFormatter = chart.getFromEnv('number-formatter'),
        i,
        j,
        displayValue = _lib.BLANKSTRING,
        setData,
        placeValuesInside = chartConf.placevaluesinside,
        canvasWidth = chartConf.canvasWidth,
        canvasLeft = chartConf.canvasLeft,
        graphic,
        height,
        gutter = 2,
        valuePadding,
        textY,
        textX,
        outsideColSpace,
        isNegative,
        yPos,
        xPos,
        width,
        setValue,
        dataLabelContainer = dataSet.getContainer('labelGroup'),
        textAnchor,
        textWidth,
        xAdjust,
        GUTTER_4 = 4,
        skipInfo = dataSet.getSkippingInfo && dataSet.getSkippingInfo(),
        skippingApplied = skipInfo && skipInfo.skippingApplied,
        plotDrawArray = skipInfo && skipInfo.labelDraw || [],
        plotDrawArrayLength = plotDrawArray.length,
        config,
        plotLabel,
        prevDataDims,
        currentDataDim,
        currDatasetIndex = dataSet.getJSONIndex(),
        skipLabelDraw,
        plotLabelCheck,
        dim,
        tempGraphics,
        visible = dataSet.getState('visible'),
        hideCallback = function hideCallback() {
      this.hide();
    },
        showCallback = function showCallback() {
      this.show();
    };

    visible && dataLabelContainer.show();
    SmartLabel.setStyle(style);
    len = skippingApplied ? plotDrawArrayLength : catLen < dataSetLen ? catLen : dataSetLen;

    for (j = 0; j < len; j++) {
      i = skippingApplied ? plotDrawArray[j] : j;
      dataObj = dataStore[i];
      config = dataObj && dataObj.config;
      setValue = config && config.setValue;

      if (dataObj === UNDEF || setValue === UNDEF || setValue === null || config.labelSkip === true) {
        tempGraphics = dataObj && dataObj.graphics;

        if (tempGraphics) {
          tempGraphics.label && tempGraphics.label.hide();
        }

        config && delete config.labelSkip;
        continue;
      }

      graphic = dataObj.graphics;

      if (!graphic) {
        continue;
      }

      setData = setDataArr[i];
      yPos = dataObj._yPos;
      xPos = dataObj._xPos;
      setValue = numberFormatter.getCleanValue(setData.value);
      isNegative = (0, _lib.pluckNumber)(setValue) < 0;
      height = dataObj._height;
      width = dataObj._width;
      valuePadding = config.valuePadding + gutter;
      textAnchor = isStacked ? POSITION_MIDDLE : isNegative
      /** @todo this boolean check needs optimisation */
      ? placeValuesInside ? POSITION_START : POSITION_END : placeValuesInside ? POSITION_END : POSITION_START;
      displayValue = config.displayValue;
      plotLabelCheck = graphic.label; // Dont draw values if the respective conditions are not satisfied

      if (config.showValue && defined(displayValue) && displayValue !== _lib.BLANKSTRING && setValue !== null) {
        // Preparing the attributes of the text
        attr = {
          text: displayValue,
          fill: style.color,
          'text-bound': [style.backgroundColor, style.borderColor, style.borderThickness, style.borderPadding, style.borderRadius, style.borderDash],
          'line-height': style.lineHeight,
          visibility: dataSet.getState('visible') ? visibleStr : hiddenStr
        };
        dim = SmartLabel.getOriSize(displayValue);
        textWidth = dim.width;
        textWidth += valuePadding;
        xAdjust = valuePadding;
        textY = yPos + height * 0.5;
        textX = xPos + (isNegative ? 0 : width);

        if (isNegative) {
          outsideColSpace = xPos - canvasLeft;
        } else {
          outsideColSpace = canvasLeft + canvasWidth - (xPos + width);
        }

        if (placeValuesInside) {
          // If label fits inside the data plot
          if (width >= textWidth) {
            textX += isNegative ? xAdjust : -xAdjust;

            if (is3D) {
              textY += yDepth;
              textX -= xDepth;
            }
          } else {
            // If label fits outside the data plot
            if (textWidth < outsideColSpace) {
              textX += isNegative ? -xAdjust : xAdjust;
              textAnchor = isNegative ? POSITION_END : POSITION_START;

              if (is3D && isNegative) {
                textX -= xDepth;
              }
            } else {
              // Label management for negative values
              if (isNegative) {
                textX = xPos + width + mathMax(textWidth - xPos - width + canvasLeft, 0) - xAdjust; // If negative value then drawing text from end

                textAnchor = POSITION_END;
              } else {
                textX = xPos - mathMax(textWidth - (canvasLeft + canvasWidth - xPos), 0) + xAdjust;
                textAnchor = POSITION_START;
              }
            }
          }
        } else {
          // If space is available inside plot
          if (outsideColSpace >= textWidth) {
            textX += isNegative ? -xAdjust : xAdjust;

            if (is3D && isNegative) {
              textX -= xDepth;
              textY += xDepth;
            }
          } else {
            // If space not available inside plot
            textX += isNegative ? xAdjust + textWidth : -(xAdjust + textWidth);
          }
        } // If value gets out of canvas


        if (textX > canvasLeft + canvasWidth || textX < canvasLeft) {
          textX = canvasLeft + GUTTER_4;
          textAnchor = POSITION_START;
        }

        attr['text-anchor'] = textAnchor; // If label is not created then create it

        attr.x = textX;
        attr.y = textY;
        attr['text-bound'] = [style.backgroundColor, style.borderColor, style.borderThickness, style.borderPadding, style.borderRadius, style.borderDash];
        attr.opacity = visible ? 1 : 0; // get the dimensions of datalabels of same index but of previous datasets

        prevDataDims = chart.getDatasets().map(
        /* eslint-disable-next-line */
        function (dataset) {
          return dataset.getJSONIndex() < currDatasetIndex && dataset._labeldimensionMap[j];
        }).filter(Boolean); // current datalabel dimensions

        currentDataDim = {
          x: textX,
          y: textY,
          width: dim.width,
          height: dim.height
        }; // check for overlap

        skipLabelDraw = checkOverlap(currentDataDim, prevDataDims); // update curent label dimensions

        dataSet._labeldimensionMap[j] = currentDataDim;

        if (!skipLabelDraw) {
          plotLabel = animationManager.setAnimation({
            el: plotLabelCheck || 'text',
            container: dataLabelContainer,
            component: dataSet,
            attr: attr,
            callback: !visible ? hideCallback : showCallback,
            label: 'plotLabel'
          });
          plotLabel && plotLabel.outlineText(conf.showTextOutline, attr.fill);

          if (chartConf.showtooltip && plotLabel.abbrArr && plotLabel.abbrArr.length) {
            toolTipController.enableToolTip(plotLabel, UNDEF);
          }

          if (!plotLabelCheck) {
            graphic.label = plotLabel;
          }
        } else if (graphic.label) {
          graphic.label = animationManager.setAnimation({
            el: graphic.label,
            component: dataSet
          });
          dataSet._labeldimensionMap[j].labelShown = false;
        }

        if (visible && !skipLabelDraw) {
          dataSet._labeldimensionMap[j].labelShown = true;
        } else {
          dataSet._labeldimensionMap[j].labelShown = false;
        }
      } else if (graphic.label) {
        graphic.label = animationManager.setAnimation({
          el: graphic.label,
          component: dataSet
        });
        dataSet._labeldimensionMap[j].labelShown = false;
      }
    }
  };

  return OverlappedColumn;
}(_bar2d.default);

var _default = OverlappedColumn;
exports["default"] = _default;

/***/ }),

/***/ 1617:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _overlappedbar2d = _interopRequireDefault(__webpack_require__(1618));

exports.OverlapperBar2D = _overlappedbar2d.default;

var _crossline = _interopRequireDefault(__webpack_require__(1474));

var _default = {
  name: 'overlappedbar2d',
  type: 'package',
  requiresFusionCharts: true,
  extension: function extension(FusionCharts) {
    FusionCharts.addDep(_crossline.default);
    FusionCharts.addDep(_overlappedbar2d.default);
  }
};
exports["default"] = _default;

/***/ }),

/***/ 1618:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _overlappedbar2d = _interopRequireDefault(__webpack_require__(1619));

var _default = _overlappedbar2d.default;
exports["default"] = _default;

/***/ })

}]);
}));

//# sourceMappingURL=http://localhost:3052/4.1.0-beta.1/map/eval/fusioncharts.overlappedbar2d.js.map