
(function (factory) {
  if (typeof module === 'object' && typeof module.exports !== "undefined") {
      module.exports = factory;
  } else {
      factory();
  }
}(function () {
"use strict";
(self["webpackChunkFusionCharts"] = self["webpackChunkFusionCharts"] || []).push([[1],{

/***/ 1632:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _configuration = _interopRequireDefault(__webpack_require__(1633));

var _singleSeries = __webpack_require__(1637);

var _multiSeries = _interopRequireDefault(__webpack_require__(1643));

var _heatmapData = _interopRequireDefault(__webpack_require__(1644));

/* eslint-disable no-fallthrough */

/* eslint-disable default-case */
(function () {
  if (typeof window.CustomEvent === 'function') return false;

  function CustomEvent(event, funcParams) {
    var params = funcParams;
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: null
    };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();

function AccessibilityExtension(FusionCharts) {
  /**
         *
         * @param {*} chartInstance
         * @param {*} chartType
         * If anchors are turned off for line, spline, radar etc then it's not possible to highlight plots
         * As a fix to the problem, anchors are rendered with zero alpha
         *
         * Returns true if anchors are modified, otherwise return false
         */
  var adjustZeroAnchor = function adjustZeroAnchor(chartInstance, chartType) {
    if (chartInstance.getChartAttribute('showanchors') === '0' || chartType && (chartType === 'area2d' || chartType === 'msarea') && chartInstance.getChartAttribute('showanchors') !== '1') {
      chartInstance.setChartAttribute({
        'showanchors': '1',
        'anchorbgalpha': '0',
        'anchoralpha': '0'
      });
      return true;
    }

    return false;
  },
      accesibilityTexts = FusionCharts.accesibilityTexts,
      accessibilityConfig = new _configuration.default();

  function addAccessibilityMultiSeries(svgRoot, chartInstance, chartType) {
    var altTexts = accesibilityTexts.buildAriaTexts(chartInstance.id, 'multiSeries', chartType),
        multiSeriesAccessibility = new _multiSeries.default(svgRoot, chartInstance, altTexts, accessibilityConfig.getConfig());
    multiSeriesAccessibility.makeChartAccessible(multiSeriesAccessibility.makeMultiSeriesAccessible);
  }

  function addAccessibilitynonCartesian(svgRoot, chartInstance, chartType) {
    var altTexts = accesibilityTexts.buildAriaTexts(chartInstance.id, 'nonCartesian', chartType),
        nonCartesianAccessibility = new _singleSeries.FCAccessibilitySingleSeriesWithLegend(svgRoot, chartInstance, altTexts, accessibilityConfig.getConfig());
    nonCartesianAccessibility.makeChartAccessible(nonCartesianAccessibility.makeSingleSeriesWithLegendAccessible);
  }

  function addAccessibilitySingleSeries(svgRoot, chartInstance, chartType) {
    var altTexts = accesibilityTexts.buildAriaTexts(chartInstance.id, 'singleSeries', chartType),
        singleSeriesAccessibility = new _singleSeries.FCAccessibilitySingleSeries(svgRoot, chartInstance, altTexts, accessibilityConfig.getConfig());
    singleSeriesAccessibility.addAxisInformation();
    singleSeriesAccessibility.makeChartAccessible(singleSeriesAccessibility.makeSingleSeriesAccessible);
  }

  function addAccessibilityNestedData(svgRoot, chartInstance, chartType) {
    var altTexts = accesibilityTexts.buildAriaTexts(chartInstance.id, 'heatmap', chartType),
        nestedDataAccessibility = new _heatmapData.default(svgRoot, chartInstance, altTexts, accessibilityConfig.getConfig());
    nestedDataAccessibility.makeChartAccessible(nestedDataAccessibility.makeNestedDataAccessible);
  } // eslint-disable-next-line good-practices/no-anonymous-handler


  FusionCharts.addEventListener('renderComplete', function (evt) {
    var chartInstance = evt.sender,
        // eslint-disable-next-line no-unused-vars
    spanContainer = document.getElementById(evt.sender.id),
        svgRoot = chartInstance.apiInstance.getFromEnv('paper').canvas,
        chartType = chartInstance.chartType(); // Accessibility config should be enabled through chart instance only. It could be done by setting the value of accessibility to 1.

    var accessibility = chartInstance.apiInstance.getFromEnv('dataSource').chart.accessibility;

    if (svgRoot && (accessibility === '1' || accessibility === 1)) {
      switch (chartType) {
        case 'msline':
        case 'msspline':
        case 'stackedarea2d':
        case 'msarea':
        case 'radar':
        case 'msstepline':
        case 'logmsline':
        case 'inversemsline':
        case 'inversemsarea':
        case 'sparkline':
        case 'mscombi2d':
        case 'mscombi3d':
        case 'mscombidy2d':
        case 'stackedcolumn2dline':
        case 'stackedcolumn3dline':
        case 'mscolumnline3d':
        case 'mscolumn3dlinedy':
        case 'stackedcolumn3dlinedy':
          // Check for zero anchor and modify anchor if not shown
          // If anchors are modified then break without adding acessibility
          // as another render complete event will trigger
          if (adjustZeroAnchor(chartInstance, chartType)) {
            break;
          }

        case 'mscolumn2d':
        case 'mscolumn3d':
        case 'msbar2d':
        case 'msbar3d':
        case 'stackedcolumn2d':
        case 'stackedcolumn3d':
        case 'stackedbar2d':
        case 'stackedbar3d':
        case 'scatter':
        case 'bubble':
        case 'inversemscolumn2d':
        case 'logmscolumn2d':
        case 'logstackedcolumn2d':
        case 'sparkcolumn':
        case 'sparkwinloss':
          addAccessibilityMultiSeries(svgRoot, chartInstance, chartType);
          break;

        case 'pie2d':
        case 'pie3d':
        case 'doughnut2d':
        case 'doughnut3d':
        case 'pyramid':
        case 'angulargauge':
        case 'hlineargauge':
        case 'hled':
        case 'vled':
        case 'bulb':
        case 'hbullet':
        case 'vbullet':
          addAccessibilitynonCartesian(svgRoot, chartInstance, chartType);
          break;

        case 'funnel':
          addAccessibilitynonCartesian(svgRoot, chartInstance, 'funnel');
          break;

        case 'line':
        case 'spline':
        case 'kagi':
        case 'area2d':
          // Check for zero anchor and modify anchor if not shown
          // If anchors are modified then break without adding acessibility
          // as another render complete event will trigger
          if (adjustZeroAnchor(chartInstance, chartType)) {
            break;
          }

        case 'column2d':
        case 'column3d':
        case 'bar2d':
        case 'bar3d':
          addAccessibilitySingleSeries(svgRoot, chartInstance, chartType);
          break;

        case 'waterfall2d':
          addAccessibilitySingleSeries(svgRoot, chartInstance, 'waterfall2d');
          break;

        case 'heatmap':
          addAccessibilityNestedData(svgRoot, chartInstance, chartType);
          break;
      }
    }
  });
}

var _default = {
  extension: AccessibilityExtension,
  name: 'AccessibilityExtension',
  type: 'extension',
  requiresFusionCharts: true
};
exports["default"] = _default;

/***/ }),

/***/ 1641:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _supportedChartTypes = _interopRequireDefault(__webpack_require__(1642));

var _util = __webpack_require__(1638);

/* eslint-disable no-fallthrough */
var TABIndex = 'tabindex',
    TABIndexForEdge = 'tabIndex';

var FCAccessibilityBase = /*#__PURE__*/function () {
  function FCAccessibilityBase(svgRoot, chartInstance, alternateTexts, config) {
    // Root SVG element
    this.svgRoot = svgRoot; // Instance of FusionCharts object

    this.chartInstance = chartInstance; // The alternate texts to be read out by screen reader

    this.alternateTexts = alternateTexts; // Additional configuration for accessibility

    this.config = config; // Chart JSON data

    this.chartData = chartInstance.getJSONData(); // Type of the chart

    this.chartType = this.chartInstance.chartType(); // If browser is IE

    this.isIE = (0, _util.isIE)(); // Key value pairs, the keys are the macros used in alternate texts and can be set by users, while the values are picked dynamically from the chart which will be replaced in place of the macros

    this.chartPropertyMap = {
      '{chartType}': this.config && this.config.chartType || this._getFormattedChartName(this.chartType),
      '{caption}': this.chartData.chart.caption,
      '{subcaption}': this.chartData.chart.subcaption
    };
  } // Get display name from chart type


  var _proto = FCAccessibilityBase.prototype;

  _proto._getFormattedChartName = function _getFormattedChartName() {
    var chartType = this.chartType;
    return _supportedChartTypes.default.hasOwnProperty(chartType) ? _supportedChartTypes.default[chartType].displayName : chartType;
  }
  /**
     * Add axis related information in chart property map
     */
  ;

  _proto.addAxisInformation = function addAxisInformation() {
    this.chartPropertyMap = (0, _util.mergeDeep)(this.chartPropertyMap, {
      '{xAxisName}': this.chartData.chart.xaxisname || '',
      '{yAxisName}': this.chartData.chart.yaxisname || ''
    });
  }
  /**
     * Add tab index and aria attribute to a SVG element
     * @param {*} elem SVG element on which tabindex and aria attributes will be applied
     * @param {*} txtToReplace Text to replace in string
     * @param {*} propertyMap Key value pair which will be used to replace macros inside a text with chart specific values
     * @param {*} tabindex Tabindex to set on the element - usually 0 or 1
     * @param {*} role Aria role to add on the element
     */
  // eslint-disable-next-line class-methods-use-this
  ;

  _proto.addTabIndexAndSetAria = function addTabIndexAndSetAria(elem, txtToReplace, propertyMap, tabin, role, customAttr) {
    if (elem) {
      var tabIndexText = TABIndex,
          tabindex;

      if ((0, _util.isEdge)()) {
        // Edge browser seems to have some problem if the attribute name is tabindes
        // Edge works well with tabIndex but all other browser stops working with tabIndex
        tabIndexText = TABIndexForEdge;
      }

      tabindex = tabin || '0';
      elem.setAttribute(tabIndexText, tabindex || '0'); // if(tabindex == "0") {
      //     elem.setAttribute('focusable', 'true');
      // }
      // For IE make all elements navigable by TAB key only, as keyboard navigation does not work for IE
      // Although focusable attribute is applied to all elements but as of now only IE works on this attribute
      // All other browser ignore the attribute as of now, hence a redundant check is ommitted to check the browser
      // If browser behavior changes with the release of SVG2 or any browser changing their own behavior, we need to update this section
      // Performing this test and enabling only for IE will make Edge browser work with Narrator flawlessly
      // But not work with JAWS
      // Hence a middle ground is followed - IE and Edge behavior is made similar by removing the check
      // if(this.isIE) {

      elem.setAttribute('focusable', 'true'); // }
      // if(!(this.config.readerPreferenceForEdge == 'narrator' && !this.isIE)) {
      //    elem.setAttribute('focusable', 'true');
      // }

      txtToReplace && propertyMap && elem.setAttribute('aria-label', (0, _util.replaceMultipleStrings)(txtToReplace, propertyMap));

      if (customAttr) {
        // eslint-disable-next-line guard-for-in
        for (var key in customAttr) {
          elem.setAttribute(key, customAttr[key]);
        }
      }

      role && elem.setAttribute('role', role);
    }
  }
  /**
     *
     * @param {*} elem - Element on which the aria-hidden attribute will be applied
     * @param {*} hiddenFlag - value to the aria-hidden attribute
     * @param {*} role - Aria role to add on the element
     */
  // eslint-disable-next-line class-methods-use-this
  ;

  _proto.addAriaHiddenAndRole = function addAriaHiddenAndRole(elem, hiddenFlag, role) {
    if (elem) {
      elem.setAttribute('aria-hidden', hiddenFlag); // Set Aria-role if provided

      if (role) {
        elem.setAttribute('role', role);
      }
    }
  }
  /**
     * Make a chart accessible
     * @param {*} plotEventHandler The event handler which will add all the necessary aria of all elements
     */
  ;

  _proto.makeChartAccessible = function makeChartAccessible(plotEventHandler) {
    var chartInstance = this.chartInstance,
        addAriaHiddenAndRole = this.addAriaHiddenAndRole,
        backButton; // TO-DO : Evaluate if all plot information should be included in chart aria
    // And generalize below section for all charts

    if (this.chartType === 'funnel') {
      var label, value;

      for (var i = 0; i < this.chartData.data.length; i++) {
        if (this.chartData.data[i].value) {
          label = this.chartData.data[i].label;
          value = this.chartInstance.formatNumber(this.chartData.data[i].value);
          break;
        }
      }

      this.chartPropertyMap = (0, _util.mergeDeep)(this.chartPropertyMap, {
        '{plot-0-label}': label || '',
        '{plot-0-value}': value || ''
      });
    } // Span container is marked as role="region", as per WCAG 2.1 guidelines.


    this.addTabIndexAndSetAria(this.chartInstance.apiInstance.getFromEnv('chart-container'), null, null, '-1', 'region');
    this.addTabIndexAndSetAria(this.svgRoot, this.alternateTexts.chart, this.chartPropertyMap, '1');
    backButton = this.chartInstance.jsVars.overlayButton;
    /**
     *
     * @param {Object} event - Handler for back button press
     */

    function backButtonKeyPress(event) {
      event.stopPropagation(); // eslint-disable-next-line default-case

      switch (event.keyCode) {
        case 13: // Enter

        case 32:
          // spacebar
          backButton.click();
          break;
      }
    }

    if (backButton) {
      this.addTabIndexAndSetAria(backButton, 'Back Button. Click this button to go back to the previous chart.', this.chartPropertyMap, '5', 'button');
      backButton.addEventListener('keydown', backButtonKeyPress.bind(this), false);
    }

    if (plotEventHandler) {
      plotEventHandler.call(this); // this.svgRoot.addEventListener('focus', plotEventHandler.bind(this), {once: true});
    }
    /**
     *
     * @param {Object} event - Handler to set "aria-hidden" property on tooltip
     */


    function setAriaHiddenForTooltip(value, role) {
      var tooltipElement = chartInstance.apiInstance.getFromEnv('chart-container').querySelectorAll('.fc__tooltip')[0];
      addAriaHiddenAndRole(tooltipElement, value, role);
    } // Adding accessibilty for tooltips when they are available


    this.chartInstance.addEventListener('dataPlotRollOver', setAriaHiddenForTooltip.bind(null, false, 'tooltip'));
    this.chartInstance.addEventListener('dataPlotRollOut', setAriaHiddenForTooltip.bind(null, true, 'tooltip'));
  };

  return FCAccessibilityBase;
}();

var _default = FCAccessibilityBase;
exports["default"] = _default;

/***/ }),

/***/ 1640:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _util = __webpack_require__(1638);

var _base = _interopRequireDefault(__webpack_require__(1641));

/* eslint-disable no-fallthrough */

/* eslint-disable default-case */
var EMPTY = '';
/**
 * This class adds export as a accessibility feature
 */

var FCAccessibilityExportEnabled = /*#__PURE__*/function (_FCAccessibilityBase) {
  (0, _inheritsLoose2.default)(FCAccessibilityExportEnabled, _FCAccessibilityBase);

  // eslint-disable-next-line no-useless-constructor
  function FCAccessibilityExportEnabled(svgRoot, chartInstance, alternateTexts, config) {
    return _FCAccessibilityBase.call(this, svgRoot, chartInstance, alternateTexts, config) || this;
  } // Make chart export accessible


  var _proto = FCAccessibilityExportEnabled.prototype;

  _proto.makeExportAccessible = function makeExportAccessible() {
    if (this.chartData.chart.exportenabled) {
      // eslint-disable-next-line no-inner-declarations
      var exportSelectOnKeyPress = function exportSelectOnKeyPress(event) {
        var elem = this;
        event.stopPropagation();

        switch (event.keyCode) {
          case 37: // left arrow

          case 38:
            // up arrow
            if (keyCaptured) {
              if (exportItemIndex > 0) {
                exportItemIndex = +elem.getAttribute('pIndex') - 1;
              } else if (exportItemIndex === -1) {
                exportItemIndex = items.length - 1;
              }
            }

            break;

          case 39: // right arrow

          case 40:
            // down arrow
            if (keyCaptured) {
              if (exportItemIndex > -1 && exportItemIndex < items.length - 1) {
                exportItemIndex = +elem.getAttribute('pIndex') + 1;
              } else if (exportItemIndex === -1) {
                exportItemIndex = 0;
              }
            }

            break;

          case 13: // Enter

          case 32:
            // spacebar
            if (exportItemIndex === -1) {
              if (keyCaptured) {
                self.chartInstance.apiInstance._env.hamburger.fireEvent('fc-mouseout');
              } else {
                self.chartInstance.apiInstance._env.hamburger.fireEvent('fc-mouseover');
              }

              keyCaptured = !keyCaptured;
            } else {
              self.chartInstance.apiInstance.getFromEnv('hamburger')._componentStore.listContainer.elemStore[0]._componentStore.item.elemStore[exportItemIndex].fireEvent('fc-click');

              exportItemIndex = -1;
              keyCaptured = false;
            }

            break;

          case 27:
            // escape
            (0, _util.crossBrowserFocus)(exportButton);

            self.chartInstance.apiInstance._env.hamburger.fireEvent('fc-mouseout');

            keyCaptured = false;
            exportItemIndex = -1;
            break;
        }

        if (keyCaptured && exportItemIndex > -1) {
          (0, _util.crossBrowserFocus)(items[exportItemIndex]);
          event.preventDefault();
        }
      }; // Make Export Items Accessible


      var exportButton = this.svgRoot.querySelector('g[class^=raphael][class$=toolbar] > [class$=button]'),
          self = this,
          itemContainer = this.chartInstance.apiInstance.getFromEnv('chart-container').querySelector('[type=div]'),
          items = itemContainer.childNodes;
      var keyCaptured = false,
          exportItemIndex = -1;
      this.addTabIndexAndSetAria(exportButton, this.alternateTexts.exportMenu, this.chartPropertyMap, '4', 'button');

      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        item.style.outline = EMPTY;
        self.addTabIndexAndSetAria(item, Array.isArray(self.alternateTexts.exportMenuItems) ? self.alternateTexts.exportMenuItems[i] : null, self.chartPropertyMap, i === 0 ? '4' : '-1', 'button', {
          pIndex: i
        });
        items[i].removeEventListener('keydown', items[i].exportSelectOnKeyPress, false);
        items[i].exportSelectOnKeyPress = exportSelectOnKeyPress;
        items[i].addEventListener('keydown', items[i].exportSelectOnKeyPress, false);
      }

      exportButton.addEventListener('keydown', exportSelectOnKeyPress);
    }
  };

  return FCAccessibilityExportEnabled;
}(_base.default);

var _default = FCAccessibilityExportEnabled;
exports["default"] = _default;

/***/ }),

/***/ 1644:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _util = __webpack_require__(1638);

var _legendEnabled = __webpack_require__(1639);

/* eslint-disable default-case */
var FCAccessibilityHeatMap = /*#__PURE__*/function (_FCAccessibilityLegen) {
  (0, _inheritsLoose2.default)(FCAccessibilityHeatMap, _FCAccessibilityLegen);

  function FCAccessibilityHeatMap(svgRoot, chartInstance, alternateTexts, config) {
    var _this;

    _this = _FCAccessibilityLegen.call(this, svgRoot, chartInstance, alternateTexts, config) || this;

    _this.addAxisInformation();

    return _this;
  }
  /**
     * Make multi series chart accessible
     */


  var _proto = FCAccessibilityHeatMap.prototype;

  _proto.makeNestedDataAccessible = function makeNestedDataAccessible() {
    var gLegend = this.chartInstance.apiInstance._components.gLegend,
        dataSet,
        chartData,
        seriesLength,
        dataLength,
        rows,
        columns,
        propertyFormatter,
        plotIndex,
        seriesIndex; // Make the legend accessible

    if (gLegend) {
      this.makeGradientLegendAccessible();
    } else {
      this.makeLegendAccessible();
    } // Make the Export accessible


    this.makeExportAccessible(); // Get chart plot points

    dataSet = this.chartInstance.apiInstance.getDatasets();
    chartData = this.chartData.dataset;
    seriesLength = this.chartData.dataset.length;
    dataLength = this.chartData.dataset && this.chartData.dataset.length > 0 ? this.chartData.dataset[0].data.length : 0;
    rows = this.chartData.rows.row;
    columns = this.chartData.columns.column; // Add properties for heatmap plots

    propertyFormatter = function propertyFormatter(i, j) {
      var plotStat = {},
          currentRow,
          currentColumn,
          dataset = this.chartData.dataset,
          rowId = dataset[i].data[j].rowid,
          columnId = dataset[i].data[j].columnid; // value

      plotStat['{value}'] = dataset[i].data[j].value; // Formatted value

      plotStat['{formattedValue}'] = this.chartInstance.formatNumber(dataset[i].data[j].value); // Labels for a plot

      plotStat['{topLeftLabel}'] = dataset[i].data[j].tllabel;
      plotStat['{topRightLabel}'] = dataset[i].data[j].trlabel;
      plotStat['{bottomLeftLabel}'] = dataset[i].data[j].bllabel;
      plotStat['{bottomRightLabel}'] = dataset[i].data[j].brlabel;
      currentRow = rows.find(function (row) {
        if (row.id.toUpperCase() === rowId.toUpperCase()) {
          return row;
        }

        return false;
      });
      currentColumn = columns.find(function (column) {
        if (column.id.toUpperCase() === columnId.toUpperCase()) {
          return column;
        }

        return false;
      }); // x-axis and y-axis lables for plots

      plotStat['{yAxisLabel}'] = currentRow.label;
      plotStat['{xAxisLabel}'] = currentColumn.label;
      return plotStat;
    }; // Tab index and aria attribute is inserted for each plot point


    for (var i = 0; i < seriesLength; i++) {
      for (var j = 0; j < dataLength; j++) {
        var plotStat = propertyFormatter.call(this, i, j);
        plotStat['{plotIndex}'] = j + 1;
        plotStat['{totalPlots}'] = dataLength;
        this.addTabIndexAndSetAria(dataSet[i].components.data[j].graphics.element && dataSet[i].components.data[j].graphics.element.node, this.alternateTexts.plot, (0, _util.mergeDeep)(this.chartPropertyMap, plotStat), i === 0 && j === 0 ? '2' : '-1');
      }
    }

    plotIndex = -1;
    seriesIndex = 0;

    function plotSelectOnKeyPress(event) {
      var _this2 = this;

      if (!this.isAllLegendItemHidden()) {
        (function () {
          var keyCaptured = false,
              elemVisible = false,
              limitExceeded = false,
              targetCell,
              newRow,
              currentRow,
              currentColumn,
              currentRowIndex;

          if (plotIndex !== -1) {
            // Get the current row and column id
            currentRow = chartData[seriesIndex].data[plotIndex].rowid;
            currentColumn = chartData[seriesIndex].data[plotIndex].columnid;
            currentRowIndex = rows.findIndex(function (item) {
              return item.id === currentRow;
            }); // currentColumnIndex = columns.findIndex(function (item) {
            //   return (item.id === currentColumn);
            // });
          }

          while (!elemVisible) {
            switch (event.keyCode) {
              case 38:
                // Up arrow
                if (currentRowIndex > 0) {
                  newRow = currentRowIndex - 1; // eslint-disable-next-line no-loop-func

                  targetCell = chartData[seriesIndex].data.findIndex(function (item) {
                    return item.rowid === rows[newRow].id && item.columnid === currentColumn;
                  });

                  if (targetCell > -1) {
                    plotIndex = targetCell;
                  }
                }

                keyCaptured = true;
                break;

              case 40:
                // Down arrow
                if (currentRowIndex < rows.length - 1) {
                  newRow = currentRowIndex + 1; // eslint-disable-next-line no-loop-func

                  targetCell = chartData[seriesIndex].data.findIndex(function (item) {
                    return item.rowid === rows[newRow].id && item.columnid === currentColumn;
                  });

                  if (targetCell > -1) {
                    plotIndex = targetCell;
                  }
                }

                keyCaptured = true;
                break;

              case 37:
                // left arrow
                if (plotIndex > 0) {
                  --plotIndex;
                } else {
                  limitExceeded = true;
                }

                keyCaptured = true;
                break;

              case 39:
                // right arrow
                if (plotIndex < dataLength - 1) {
                  ++plotIndex;
                } else {
                  limitExceeded = true;
                }

                keyCaptured = true;
                break;
            }

            if (keyCaptured) {
              if (limitExceeded) {
                break;
              }

              if (dataSet[seriesIndex].components.data[plotIndex].graphics.element && getComputedStyle(dataSet[seriesIndex].components.data[plotIndex].graphics.element.node).display !== 'none') {
                elemVisible = true;
              }

              if (!elemVisible && (event.keyCode === 37 || event.keyCode === 39) && _this2.isLegendItemHidden(seriesIndex)) {
                ++seriesIndex;
                plotIndex = -1;
              }
            } else {
              break;
            }
          }

          if (keyCaptured && elemVisible) {
            (0, _util.crossBrowserFocus)(dataSet[seriesIndex].components.data[plotIndex].graphics.element.node);
          }
        })();
      }
    } // If first value of first series is focus by pressing tab then plotIndex is not updated
    // eslint-disable-next-line good-practices/no-anonymous-handler


    dataSet[0].components.data[0].graphics.element && dataSet[0].components.data[0].graphics.element.node.addEventListener('focus', function () {
      plotIndex = seriesIndex = 0;
    });
    this.svgRoot.addEventListener('keydown', plotSelectOnKeyPress.bind(this), false);
  };

  return FCAccessibilityHeatMap;
}(_legendEnabled.FCAccessibilityLegendEnabled);

var _default = FCAccessibilityHeatMap;
exports["default"] = _default;

/***/ }),

/***/ 1639:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports.FCAccessibilityLegendEnabled = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _util = __webpack_require__(1638);

var _exportEnabled = _interopRequireDefault(__webpack_require__(1640));

var _base = _interopRequireDefault(__webpack_require__(1641));

exports.FCAccessibilityBase = _base.default;

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var UNDEF;

var FCAccessibilityLegendEnabled = /*#__PURE__*/function (_FCAccessibilityExpor) {
  (0, _inheritsLoose2.default)(FCAccessibilityLegendEnabled, _FCAccessibilityExpor);

  // eslint-disable-next-line no-useless-constructor
  function FCAccessibilityLegendEnabled(svgRoot, chartInstance, alternateTexts, config) {
    return _FCAccessibilityExpor.call(this, svgRoot, chartInstance, alternateTexts, config) || this;
  }
  /**
     * True if all plots are hidden by legend interaction as a result legends are also in disabled state
     * False otherwise
     */


  var _proto = FCAccessibilityLegendEnabled.prototype;

  _proto.isAllLegendItemHidden = function isAllLegendItemHidden() {
    var legend = this.chartInstance.apiInstance._components.legend; // Applies only for discrete legend

    if (legend && legend.length !== 0) {
      var legendItems = legend[0]._components.legendItem;
      if (!legendItems) return false;

      for (var i = 0; i < legendItems.length; i++) {
        if (legendItems[i]._legendState.indexOf('hidden') === -1) {
          return false;
        }
      }

      return true;
    }

    return false;
  }
  /**
     * Checks if all a specific legend items is diabled by legend interaction
     * @param {number} index
     */
  ;

  _proto.isLegendItemHidden = function isLegendItemHidden(index) {
    var legendItems = this.chartInstance.apiInstance._components.legend && this.chartInstance.apiInstance._components.legend[0]._components.legendItem;
    if (!legendItems) return false;
    return legendItems[index]._legendState.indexOf('hidden') >= 0;
  }
  /**
     * Make chart legend accessible
     */
  ;

  _proto.makeLegendAccessible = function makeLegendAccessible(bLegend) {
    var bindLegend = bLegend;
    bindLegend === UNDEF && (bindLegend = true);

    if (!bindLegend) {
      return;
    }

    var self = this;

    if (this.chartInstance.getChartAttribute('showlegend') !== '0') {
      // let legendRegion = this.svgRoot.querySelectorAll("g[class^=raphael][class$=legendGroup] > [class$=item]");
      // if(legendRegion && legendRegion.length > 0) {
      //     this.addTabIndexAndSetAria(legendRegion[0], null, null, "-1", "region");
      // }
      var legendTexts = this.svgRoot.querySelectorAll('g[class^=raphael][class$=legendGroup] > [class$=item] > text');

      if (legendTexts && legendTexts.length > 0) {
        var _this$chartInstance, _this$chartInstance$a, _this$chartInstance$a2, _this$chartInstance$a3, _this$chartInstance$a4, _this$chartInstance$a5;

        var legendSelectOnKeyPress = function legendSelectOnKeyPress(event) {
          var elem = this,
              keyCaptured = false;
          event.stopPropagation();

          switch (event.keyCode) {
            case 37: // left arrow

            case 38:
              // up arrow
              if (legendIndex > 0) {
                legendIndex = +elem.getAttribute('pIndex') - 1;
              }

              keyCaptured = true;
              break;

            case 39: // right arrow

            case 40:
              // down arrow
              if (legendIndex < legendLength - 1) {
                // ++legendIndex;
                legendIndex = +elem.getAttribute('pIndex') + 1;
              }

              keyCaptured = true;
              break;

            case 13: // Enter

            case 32:
              // spacebar
              legendIndex = +elem.getAttribute('pIndex');

              self.chartInstance.apiInstance._components.legend[0]._components.legendItem[legendIndex].fireEvent('fc-click'); // @todo


              setTimeout(function () {
                self.makeMultiSeriesAccessible && self.makeMultiSeriesAccessible(false);
              }, 100);
              keyCaptured = true;
              break;
          }

          if (keyCaptured) {
            (0, _util.crossBrowserFocus)(legendTexts[legendIndex]);
            event.preventDefault();
          }
        };

        /**
         * Handler for updating legend index on focus
         */
        var legendIndexUpdate = function legendIndexUpdate() {
          legendIndex = 0;
        }; // If first legend is focused by pressing tab then legendIndex will be zero


        var legendLength = legendTexts.length,
            legendIndex = -1;

        for (var i = 0; i < legendTexts.length; i++) {
          var legendStat = {};
          legendStat['{legendText}'] = legendTexts[i].innerHTML;
          this.addTabIndexAndSetAria(legendTexts[i], this.alternateTexts.legendItem, (0, _util.mergeDeep)(this.chartPropertyMap, legendStat), i === 0 ? '3' : '-1', 'button', {
            pIndex: i
          });
          legendTexts[i].removeEventListener('keydown', legendTexts[i].legendSelectOnKeyPress, false);
          legendTexts[i].legendSelectOnKeyPress = legendSelectOnKeyPress;
          legendTexts[i].addEventListener('keydown', legendTexts[i].legendSelectOnKeyPress, false);
        }

        var legendItems = (_this$chartInstance = this.chartInstance) == null ? void 0 : (_this$chartInstance$a = _this$chartInstance.apiInstance) == null ? void 0 : (_this$chartInstance$a2 = _this$chartInstance$a._components) == null ? void 0 : (_this$chartInstance$a3 = _this$chartInstance$a2.legend) == null ? void 0 : (_this$chartInstance$a4 = _this$chartInstance$a3[0]) == null ? void 0 : (_this$chartInstance$a5 = _this$chartInstance$a4._components) == null ? void 0 : _this$chartInstance$a5.legendItem;

        if (Array.isArray(legendItems)) {
          for (var _iterator = _createForOfIteratorHelperLoose(legendItems), _step; !(_step = _iterator()).done;) {
            var item = _step.value;
            item.addEventListener('fc-click', function () {
              self.makeMultiSeriesAccessible && self.makeMultiSeriesAccessible(false);
            }, false);
          }
        }

        legendTexts[0].addEventListener('focus', legendIndexUpdate);
      }
    }
  }
  /**
     * Function to make lower and upper sliders accessible for gradient legend
     */
  ;

  _proto.makeGradientLegendAccessible = function makeGradientLegendAccessible() {
    var legendSliders = this.svgRoot.querySelectorAll('g[class^=raphael][class$=fc-gl-slider]'),
        chartInstance = this.chartInstance,
        ariaLabelMethod = this.addTabIndexAndSetAria,
        alternateTexts = this.alternateTexts,
        chartPropertyMap = this.chartPropertyMap;

    if (legendSliders) {
      /**
             * Function to handle the movement of sliders on left/right arrow key press
             * @param {Object} event - the event object associated
             * @param {Number} index - index of the slider
             */
      var slideRangeOnKeyPress = function slideRangeOnKeyPress(event, index) {
        event.stopPropagation();
        var keyCode = event.keyCode,
            extremes = chartInstance.apiInstance._components.gLegend[0].sGroup.extremes,
            displacement = 0,
            currentPos = index === 0 ? lowerSliderCurrentPos : upperSliderCurrentPos,
            keyCaptured = false,
            sliderRange = Math.floor(extremes[1] - extremes[0]),
            bothSlidersOverlapped = sliderRange + upperSliderCurrentPos === lowerSliderCurrentPos,
            maxDisplacement = index === 0 ? sliderRange : -sliderRange,
            self,
            newValue;

        if (index === 0) {
          self = chartInstance.apiInstance._components.gLegend[0].sGroup.sliders['false'];
        } else {
          self = chartInstance.apiInstance._components.gLegend[0].sGroup.sliders['true'];
        }

        switch (keyCode) {
          // Left arrow key
          case 37:
            if (index === 0 && currentPos > 0 || index === 1 && currentPos > maxDisplacement && !bothSlidersOverlapped) {
              displacement = currentPos - sliderRange / 10;
              index === 0 ? lowerSliderCurrentPos = displacement : upperSliderCurrentPos = displacement;
              keyCaptured = true;
            }

            break;
          // Right arrow key

          case 39:
            if (index === 0 && currentPos < maxDisplacement && !bothSlidersOverlapped || index === 1 && currentPos < 0) {
              displacement = currentPos + sliderRange / 10;
              index === 0 ? lowerSliderCurrentPos = displacement : upperSliderCurrentPos = displacement;
              keyCaptured = true;
            }

            break;
        }

        newValue = self.rangeGroup.updateWhenInMove(self, self.currPos + displacement); // Update lower/upper range according to the sliders moved

        if (index === 0) {
          legendStat['{currentStartValue}'] = newValue;
        } else {
          legendStat['{currentEndValue}'] = newValue;
        }

        ariaLabelMethod(legendSliders[0], alternateTexts.lowerRange, (0, _util.mergeDeep)(chartPropertyMap, legendStat), '3');
        ariaLabelMethod(legendSliders[1], alternateTexts.upperRange, (0, _util.mergeDeep)(chartPropertyMap, legendStat), '3');

        if (keyCaptured) {
          // Call the dragAPI of the library
          var dragAPI;

          if (index === 0) {
            dragAPI = chartInstance.apiInstance._components.gLegend[0].sGroup.sliders['false'].getDragAPI();
          } else {
            dragAPI = chartInstance.apiInstance._components.gLegend[0].sGroup.sliders['true'].getDragAPI();
          }

          dragAPI.dragStart({
            stopPropagation: function stopPropagation() {}
          });
          dragAPI.dragging({
            stopPropagation: function stopPropagation() {},
            data: [displacement]
          });
        }
      }; // eslint-disable-next-line good-practices/no-anonymous-handler


      var legendStat = {},
          sliders,
          lowerSliderCurrentPos = 0,
          upperSliderCurrentPos = 0; // Lable for sliders

      legendStat['{lowerRangeLabel}'] = this.chartData.colorrange.startlabel;
      legendStat['{upperRangeLabel}'] = this.chartData.colorrange.endlabel; // Get the sliders element of Fusioncharts.

      sliders = chartInstance.apiInstance._components.gLegend[0].sGroup.sliders;
      legendStat['{rangeStart}'] = legendStat['{currentStartValue}'] = sliders['false'].rangeGroup.updateWhenInMove(sliders['false'], sliders['false'].currPos);
      legendStat['{rangeEnd}'] = legendStat['{currentEndValue}'] = sliders['true'].rangeGroup.updateWhenInMove(sliders['true'], sliders['true'].currPos); // Set aria-label for both the sliders

      this.addTabIndexAndSetAria(legendSliders[0], this.alternateTexts.lowerRange, (0, _util.mergeDeep)(this.chartPropertyMap, legendStat), '3');
      this.addTabIndexAndSetAria(legendSliders[1], this.alternateTexts.upperRange, (0, _util.mergeDeep)(this.chartPropertyMap, legendStat), '3');
      legendSliders[0].addEventListener('keydown', function (event) {
        slideRangeOnKeyPress(event, 0);
      }); // eslint-disable-next-line good-practices/no-anonymous-handler

      legendSliders[1].addEventListener('keydown', function (event) {
        slideRangeOnKeyPress(event, 1);
      });
    }
  };

  return FCAccessibilityLegendEnabled;
}(_exportEnabled.default);

exports.FCAccessibilityLegendEnabled = FCAccessibilityLegendEnabled;

/***/ }),

/***/ 1643:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _util = __webpack_require__(1638);

var _legendEnabled = __webpack_require__(1639);

/* eslint-disable one-var */

/* eslint-disable good-practices/no-single-usage-variable */

/* eslint-disable no-fallthrough */

/* eslint-disable default-case */
var UNDEF;

var FCAccessibilityMultiSeries = /*#__PURE__*/function (_FCAccessibilityLegen) {
  (0, _inheritsLoose2.default)(FCAccessibilityMultiSeries, _FCAccessibilityLegen);

  function FCAccessibilityMultiSeries(svgRoot, chartInstance, alternateTexts, config) {
    var _this;

    _this = _FCAccessibilityLegen.call(this, svgRoot, chartInstance, alternateTexts, config) || this;

    _this.addAxisInformation();

    return _this;
  }
  /**
     * Make multi series chart accessible
     */


  var _proto = FCAccessibilityMultiSeries.prototype;

  _proto.makeMultiSeriesAccessible = function makeMultiSeriesAccessible(bEvent) {
    var _this2 = this;

    var bindEvent = bEvent,
        self = this,
        dataSet,
        categoryLength,
        seriesLength,
        dataLength;
    bindEvent === UNDEF && (bindEvent = true);
    !self._conf && (self._conf = {}); // Make the legend accessible

    self.makeLegendAccessible(bindEvent); // Make the Export accessible

    self.makeExportAccessible(); // Get chart plot points

    dataSet = self.chartInstance.apiInstance.getDatasets();
    categoryLength = self.chartData.categories && self.chartData.categories[0].category.length;
    seriesLength = self.chartData.dataset.length;
    dataLength = self.chartData.dataset && self.chartData.dataset.length > 0 ? self.chartData.dataset[0].data.length : 0;

    if (this.chartType === 'logmscolumn2d' || this.chartType === 'logmsline') {
      dataLength = categoryLength;
    }

    self._conf.seriesLength = seriesLength;
    self._conf.dataLength = dataLength;
    self._conf.dataSet = dataSet;

    self._conf.plotSelectOnKeyPressMS = function (event) {
      var elem = this,
          plotIndex,
          seriesIndex;
      plotIndex = +elem.getAttribute('pIndex');
      seriesIndex = +elem.getAttribute('sIndex');

      if (this.chartType === 'logmscolumn2d' || this.chartType === 'logmsline2d') {
        dataLength = categoryLength;
      }

      self._conf.dataLength = self.chartData.dataset[seriesIndex].data.length;

      if (!self.isAllLegendItemHidden()) {
        var keyCaptured = false,
            elemVisible = false,
            limitExceeded = false,
            stackedCharts = ['stackedcolumn2d', 'stackedcolumn3d'],
            arrayFound = stackedCharts.filter(function (item) {
          return item === self.chartInstance.chartType();
        }),
            isStackedChart = arrayFound.length !== 0;

        while (!elemVisible) {
          switch (event.keyCode) {
            case 37:
              // left arrow
              if (plotIndex > 0) {
                --plotIndex;
              } else {
                limitExceeded = true;
              }

              keyCaptured = true;
              break;

            case 39:
              if (plotIndex < self._conf.dataLength - 1) {
                ++plotIndex;
              } else {
                limitExceeded = true;
              }

              keyCaptured = true;
              break;

            case 38:
              // up arrow
              // For stacked charts, up arrow will navigate to the next series
              if (seriesIndex < self._conf.seriesLength - 1 && isStackedChart) {
                ++seriesIndex;
              } else if (seriesIndex > 0 && !isStackedChart) {
                --seriesIndex;
              } else {
                limitExceeded = true;
              }

              keyCaptured = true;
              break;

            case 40:
              // down arrow
              // For stacked charts, down arrow will navigate to the previous series
              if (seriesIndex > 0 && isStackedChart) {
                --seriesIndex;
              } else if (seriesIndex < self._conf.seriesLength - 1 && !isStackedChart) {
                ++seriesIndex;
              } else {
                limitExceeded = true;
              }

              keyCaptured = true;
              break;

            case 13: // Enter

            case 32:
              // spacebar
              self.chartInstance.apiInstance.getDatasets()[seriesIndex]._firePlotEvent('fc-click', plotIndex < 0 ? 0 : plotIndex, new CustomEvent('click')); // keyCaptured = true;


              break;
          }

          if (keyCaptured) {
            if (limitExceeded) {
              break;
            } // if(plots[seriesIndex] && plots[seriesIndex].children && plots[seriesIndex].children.length > 0 && plots[seriesIndex].children[plotIndex] && getComputedStyle(plots[seriesIndex].children[plotIndex]).display != "none") {
            //     elemVisible = true;
            // } dataSet[i].components.data[j].graphics.element.node


            if (self._conf.dataSet[seriesIndex].components.data[plotIndex].graphics.element && getComputedStyle(self._conf.dataSet[seriesIndex].components.data[plotIndex].graphics.element.node).display !== 'none') {
              elemVisible = true;
            }

            if (!elemVisible && (event.keyCode === 37 || event.keyCode === 39) && self.isLegendItemHidden(seriesIndex)) {
              ++seriesIndex;
              plotIndex = -1;
            }
          } else {
            break;
          }
        }

        if (keyCaptured && elemVisible) {
          (0, _util.crossBrowserFocus)(self._conf.dataSet[seriesIndex].components.data[plotIndex].graphics.element.node);
        }
      }
    }; // All multi series chart has series name
    // Bubble chart has x,y,z value and also name of a bubble can be specified


    var bubblePlotProperties = function bubblePlotProperties(i, j) {
      var plotStat = {}; // x value of bubble

      plotStat['{xValue}'] = _this2.chartData.dataset[i].data[j].x || ''; // y value of bubble

      plotStat['{yValue}'] = _this2.chartData.dataset[i].data[j].y || ''; // z value of bubble

      plotStat['{zValue}'] = _this2.chartData.dataset[i].data[j].z || ''; // label of the bubble

      plotStat['{bubbleName}'] = _this2.chartData.dataset[i].data[j].name || ''; // Series name

      plotStat['{seriesName}'] = _this2.chartData.dataset[i].seriesname || '';
      return plotStat;
    },
        // Scatter chart has x and y value
    scatterPlotProperties = function scatterPlotProperties(i, j) {
      var plotStat = {}; // x value of bubble

      plotStat['{xValue}'] = _this2.chartData.dataset[i].data[j].x || ''; // y value of bubble

      plotStat['{yValue}'] = _this2.chartData.dataset[i].data[j].y || ''; // Series name

      plotStat['{seriesName}'] = _this2.chartData.dataset[i].seriesname || '';
      return plotStat;
    },
        // For all other supported multi series chart label and value is present
    defaultMultiSeriesPlotPorperties = function defaultMultiSeriesPlotPorperties(i, j) {
      var plotStat = {}; // Label

      plotStat['{label}'] = _this2.chartData.categories && _this2.chartData.categories[0].category[j].label || ''; // value

      plotStat['{value}'] = _this2.chartData.dataset[i].data[j].value; // Formatted value

      plotStat['{formattedValue}'] = _this2.chartInstance.formatNumber(_this2.chartData.dataset[i].data[j].value); // Series

      plotStat['{seriesName}'] = _this2.chartData.dataset[i].seriesname || '';
      return plotStat;
    },
        // Based on the chart type, property formatter is decided
    propertyFormatter;

    switch (this.chartType) {
      case 'scatter':
        propertyFormatter = scatterPlotProperties;
        break;

      case 'bubble':
        propertyFormatter = bubblePlotProperties;
        break;

      default:
        propertyFormatter = defaultMultiSeriesPlotPorperties;
        break;
    }

    var alternateTextsPlot;
    var firstActivePlotIndex = dataSet.findIndex(function (i) {
      return i._state.visible === true;
    }); // Tab index and aria attribute is inserted for each plot point

    for (var i = 0; i < seriesLength; i++) {
      for (var j = 0; j < dataLength; j++) {
        var plotStat = propertyFormatter.call(this, i, j);

        if (this.chartType === 'scatter') {
          dataLength = self.chartData.dataset[i].data.length;
        }

        plotStat['{plotIndex}'] = j + 1;
        plotStat['{seriesIndex}'] = i + 1;
        plotStat['{totalPlots}'] = dataLength;
        plotStat['{totalSeries}'] = seriesLength;
        alternateTextsPlot = this.alternateTexts.plot;

        if (dataSet[i].components.data[j].config.setLink && dataSet[i].components.data[j].config.setLink !== '' || dataSet[i].components.data[j].config.link && dataSet[i].components.data[j].config.link !== '') {
          alternateTextsPlot += ' This is a clickable plot';
        } // this.addTabIndexAndSetAria(plots[i].children[j], this.alternateTexts.plot, extend(this.chartPropertyMap, plotStat), i==0 && j==0 ? "0" : "-1");


        this.addTabIndexAndSetAria(dataSet[i].components.data[j].graphics.element && dataSet[i].components.data[j].graphics.element.node, alternateTextsPlot, (0, _util.mergeDeep)(this.chartPropertyMap, plotStat), i === firstActivePlotIndex && j === 0 ? '2' : '-1', 'img', {
          sIndex: i,
          pIndex: j
        });
        var element = dataSet[i].components.data[j].graphics.element;
        element && element.node.removeEventListener('keydown', element.node.plotSelectOnKeyPressMS, false);
        element && (element.node.plotSelectOnKeyPressMS = self._conf.plotSelectOnKeyPressMS);
        element && element.node.addEventListener('keydown', element.node.plotSelectOnKeyPressMS, false);
      }
    }
  };

  return FCAccessibilityMultiSeries;
}(_legendEnabled.FCAccessibilityLegendEnabled);

var _default = FCAccessibilityMultiSeries;
exports["default"] = _default;

/***/ }),

/***/ 1637:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports.FCAccessibilitySingleSeriesWithLegend = exports.FCAccessibilitySingleSeries = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _util = __webpack_require__(1638);

var _legendEnabled = __webpack_require__(1639);

var _exportEnabled = _interopRequireDefault(__webpack_require__(1640));

/* eslint-disable good-practices/no-function-dependency */

/* eslint-disable one-var */

/* eslint-disable no-fallthrough */

/* eslint-disable default-case */
var FCAccessibilitySingleSeries = /*#__PURE__*/function (_FCAccessibilityExpor) {
  (0, _inheritsLoose2.default)(FCAccessibilitySingleSeries, _FCAccessibilityExpor);

  // eslint-disable-next-line no-useless-constructor
  function FCAccessibilitySingleSeries(svgRoot, chartInstance, alternateTexts, config) {
    return _FCAccessibilityExpor.call(this, svgRoot, chartInstance, alternateTexts, config) || this;
  }
  /**
   * Make single series chart accessible
   */


  var _proto = FCAccessibilitySingleSeries.prototype;

  _proto.makeSingleSeriesAccessible = function makeSingleSeriesAccessible() {
    var _this = this;

    var dataLength,
        self = this;
    !self._conf && (self._conf = {});

    if (this.chartType === 'angulargauge') {
      dataLength = this.chartData.dials.dial.length;
    } else if (this.chartType === 'hlineargauge') {
      dataLength = this.chartData.pointers.pointer.length;
    } else if (this.chartType === 'hled' || this.chartType === 'vled' || this.chartType === 'bulb' || this.chartType === 'hbullet' || this.chartType === 'vbullet') {
      dataLength = 1;
    } else {
      dataLength = this.chartData.data.length;
    } // Make the Export accessible


    self.makeExportAccessible();
    var plotData;

    switch (this.chartType) {
      case 'pyramid':
      case 'funnel':
        plotData = this.chartInstance.apiInstance.getDatasets()[0]._components.data;
        break;

      default:
        plotData = this.chartInstance.apiInstance.getDatasets()[0].components.data;
        break;
    }

    self._conf.plotData = plotData;
    self._conf.dataLength = dataLength;

    self._conf.plotSelectOnKeyPressSS = function (event) {
      var elem = this,
          plotIndex = +elem.getAttribute('pIndex'),
          keyCaptured = false,
          elemVisible = false,
          loopCount = 0,
          plotLength = self._conf.dataLength - 1;

      if (self.chartType === 'waterfall2d') {
        plotLength = self._conf.dataLength;
      }

      while (!elemVisible && loopCount < self._conf.dataLength) {
        ++loopCount;

        switch (event.keyCode) {
          case 37:
          case 38:
            // left arrow and down arrow
            --plotIndex;

            if (plotIndex < 0) {
              plotIndex = plotLength;
            }

            keyCaptured = true;
            break;

          case 39:
          case 40:
            // right arrow and up arrow
            ++plotIndex;

            if (plotIndex > plotLength) {
              plotIndex = 0;
            }

            keyCaptured = true;
            break;

          case 13: // Enter

          case 32:
            // spacebar
            if (self.chartInstance.apiInstance.getDatasets()[0]._firePlotEvent) {
              self.chartInstance.apiInstance.getDatasets()[0]._firePlotEvent('fc-click', plotIndex < 0 ? 0 : plotIndex, new CustomEvent('click'));
            } else if (self.chartType === 'angulargauge') {
              if (self.chartInstance.apiInstance.getDatasets()[0].components.data[plotIndex < 0 ? 0 : plotIndex].graphics.pointersTpath.data('eventArgs')) {
                self.chartInstance.apiInstance.plotEventHandler(self.chartInstance.apiInstance.getDatasets()[0].components.data[plotIndex < 0 ? 0 : plotIndex].graphics.pointersTpath, new CustomEvent('click'));
              } else {
                self.chartInstance.apiInstance.plotEventHandler(self.chartInstance.apiInstance.getDatasets()[0].components.data[plotIndex < 0 ? 0 : plotIndex].graphics.pointersPath, new CustomEvent('click'));
              }
            } else if (self.chartType === 'funnel' || self.chartType === 'pyramid') {
              self.chartInstance.apiInstance.plotEventHandler(self.chartInstance.apiInstance.getDatasets()[0]._components.data[plotIndex < 0 ? self.chartType === 'funnel' ? 1 : 0 : plotIndex]._graphics.trackerObj, new CustomEvent('click'));
            } else if (self.chartType === 'hlineargauge') {
              self.chartInstance.apiInstance.plotEventHandler(self.chartInstance.apiInstance.getDatasets()[0].components.data[plotIndex < 0 ? 0 : plotIndex].graphics.pointer, new CustomEvent('click'));
            }

            if (self.chartType === 'pie2d' || self.chartType === 'pie3d' || self.chartType === 'doughnut2d' || self.chartType === 'doughnut3d') {
              self.chartInstance.apiInstance.getDatasets()[0].plotGraphicClick.call(self.chartInstance.apiInstance.getDatasets()[0].components.data[plotIndex < 0 ? 0 : plotIndex].graphics.element);
            } // keyCaptured = true;


            break;
        }

        if (keyCaptured) {
          event.preventDefault();

          if (self._conf.plotData[plotIndex]) {
            var plotElem = getPlotElement(self._conf.plotData[plotIndex]);

            if (plotElem) {
              if (document.activeElement === plotElem.node) continue;
              (0, _util.crossBrowserFocus)(plotElem.node);
              elemVisible = true;
            }
          }
        } else {
          break;
        }
      }
    };

    var getPlotElement = function getPlotElement(plot) {
      switch (_this.chartType) {
        case 'pyramid':
        case 'funnel':
          return plot._graphics.graphic;

        case 'angulargauge':
          if (plot.graphics.pointersTpath.data('eventArgs')) {
            return plot.graphics.pointersTpath;
          }

          return plot.graphics.pointersPath;

        case 'hlineargauge':
          return plot.graphics.pointer;

        case 'hled':
        case 'vled':
          return plot.graphics.element.parent.parent.node.children[0];

        case 'hbullet':
        case 'vbullet':
          return plot.graphics.element.parent.parent;

        default:
          return plot.graphics.element;
      }
    },
        firstElementIndex = -1,
        // eslint-disable-next-line no-unused-vars
    addAria = function () {
      var _this2 = this;

      var getPlotStats = function getPlotStats(plotConfig, i) {
        var plotStat = {}; // label

        plotStat['{label}'] = plotConfig.label || plotConfig.categoryLabel || plotConfig.dataLabel || ''; // value

        plotStat['{value}'] = plotConfig.y || plotConfig.setValue || 0;
        plotStat['{target}'] = plotConfig.target || 0;
        plotStat['{formattedValue}'] = plotConfig.formatedVal || _this2.chartInstance.formatNumber(plotStat['{value}']) || '';
        plotStat['{plotIndex}'] = i + 1;
        plotStat['{totalPlots}'] = plotData.length;
        plotStat['{percentValue}'] = plotConfig.pValue;
        return plotStat;
      },

      /**
      * Add aria values to a plot with given index
      *
      * There may be cases where data is null in chart data, in such cases dom is not renereded
      * i denotes the index of plot in chart data
      *
      * The correct dom index for next plot is returned from function, if the data is found to be invalid then current dom element is matched for next data
      * @param {*} i
      *
      */
      plotIterator = function plotIterator(i) {
        var alternateTextsPlot;

        if (plotData[i]) {
          var plotElem = getPlotElement(plotData[i]);

          if (plotElem) {
            if (firstElementIndex === -1) firstElementIndex = i;
            var plotStats;

            if (_this2.chartType === 'pyramid' || _this2.chartType === 'funnel') {
              plotStats = getPlotStats(plotData[i], i);
            } else {
              plotStats = getPlotStats(plotData[i].config, i);
            }

            alternateTextsPlot = _this2.alternateTexts.plot;

            if (plotData[i].config.setLink && plotData[i].config.setLink !== '' || plotData[i].config.link && plotData[i].config.link !== '' || plotData[i].config.dataLink && plotData[i].config.dataLink !== '' || plotData[i].link && plotData[i].link !== '') {
              // eslint-disable-next-line good-practices/no-static-strings-in-scope
              alternateTextsPlot += ' This is a clickable plot';
            }

            _this2.addTabIndexAndSetAria(plotElem.node || plotElem, alternateTextsPlot, (0, _util.mergeDeep)(_this2.chartPropertyMap, plotStats), firstElementIndex === i ? '2' : '-1', 'img', {
              pIndex: i
            });

            (plotElem.node || plotElem).removeEventListener('keydown', (plotElem.node || plotElem).plotSelectOnKeyPressSS, false);
            (plotElem.node || plotElem).plotSelectOnKeyPressSS = self._conf.plotSelectOnKeyPressSS;
            (plotElem.node || plotElem).addEventListener('keydown', (plotElem.node || plotElem).plotSelectOnKeyPressSS, false);
          }
        }
      };

      for (var i = 0; i < dataLength; i++) {
        plotIterator(i);
      }

      if (this.chartType === 'waterfall2d') {
        plotIterator(dataLength);
      }
    }.call(this);
  };

  return FCAccessibilitySingleSeries;
}(_exportEnabled.default);

exports.FCAccessibilitySingleSeries = FCAccessibilitySingleSeries;

var FCAccessibilitySingleSeriesWithLegend = /*#__PURE__*/function (_FCAccessibilityLegen) {
  (0, _inheritsLoose2.default)(FCAccessibilitySingleSeriesWithLegend, _FCAccessibilityLegen);

  // eslint-disable-next-line no-useless-constructor
  function FCAccessibilitySingleSeriesWithLegend(svgRoot, chartInstance, alternateTexts, config) {
    return _FCAccessibilityLegen.call(this, svgRoot, chartInstance, alternateTexts, config) || this;
  }
  /**
   * Make single series chart with legend accessible
   */


  var _proto2 = FCAccessibilitySingleSeriesWithLegend.prototype;

  _proto2.makeSingleSeriesWithLegendAccessible = function makeSingleSeriesWithLegendAccessible() {
    this.makeLegendAccessible();
    var accessibleSingleSeries = new FCAccessibilitySingleSeries(this.svgRoot, this.chartInstance, this.alternateTexts, this.config);
    accessibleSingleSeries.makeSingleSeriesAccessible();
  };

  return FCAccessibilitySingleSeriesWithLegend;
}(_legendEnabled.FCAccessibilityLegendEnabled);

exports.FCAccessibilitySingleSeriesWithLegend = FCAccessibilitySingleSeriesWithLegend;

/***/ }),

/***/ 1633:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



exports.__esModule = true;
exports["default"] = void 0;

var _util = __webpack_require__(1634);

var AccessibilityConfig = /*#__PURE__*/function () {
  function AccessibilityConfig() {
    this.config = {
      base: {
        readerPreferenceForEdge: 'jaws',
        disablePlotDetailsForIE: false
      }
    };
  }

  var _proto = AccessibilityConfig.prototype;

  _proto.setConfig = function setConfig(config, chartId, value) {
    if (config && value && typeof config === 'string') {
      if (chartId) {
        this.config[chartId][config] = value;
      } else {
        this.config.base[config] = value;
      }
    } else {
      if (chartId) {
        this.config[chartId] = (0, _util.mergeDeep)(this.config[chartId], config);
      } else {
        this.config.base = (0, _util.mergeDeep)(this.config.base, config);
      }
    }
  };

  _proto.getConfig = function getConfig(chartId) {
    if (this.config.hasOwnProperty(chartId)) {
      return (0, _util.mergeDeep)(this.config[chartId], this.config.base);
    }

    return this.config.base;
  };

  return AccessibilityConfig;
}();

var _default = AccessibilityConfig;
exports["default"] = _default;

/***/ }),

/***/ 1642:
/***/ ((__unused_webpack_module, exports) => {



exports.__esModule = true;
exports["default"] = void 0;
// eslint-disable-next-line no-unused-vars
var chartTypes;

var _default = chartTypes = {
  'msline': {
    displayName: 'multi series line',
    category: 'multiseries'
  },
  'msspline': {
    displayName: 'multi series spline',
    category: 'multiseries'
  },
  'stackedarea2d': {
    displayName: 'stacked area',
    category: 'multiseries'
  },
  'msarea': {
    displayName: 'multi series area',
    category: 'multiseries'
  },
  'msstepline': {
    displayName: 'multi series step line',
    category: 'multiseries'
  },
  'mscolumn2d': {
    displayName: 'multi series column',
    category: 'multiseries'
  },
  'mscolumn3d': {
    displayName: 'multi series column 3D',
    category: 'multiseries'
  },
  'msbar2d': {
    displayName: 'multi series bar',
    category: 'multiseries'
  },
  'msbar3d': {
    displayName: 'multi series bar 3D',
    category: 'multiseries'
  },
  'stackedcolumn2d': {
    displayName: 'stacked column',
    category: 'multiseries'
  },
  'stackedcolumn3d': {
    displayName: 'stacked column 3D',
    category: 'multiseries'
  },
  'stackedbar2d': {
    displayName: 'stacked bar',
    category: 'multiseries'
  },
  'stackedbar3d': {
    displayName: 'stacked bar 3D',
    category: 'multiseries'
  },
  'inversemscolumn2d': {
    displayName: 'inverse axis multi series column',
    category: 'multiseries'
  },
  'inversemsline': {
    displayName: 'inverse axis multi series line',
    category: 'multiseries'
  },
  'inversemsarea': {
    displayName: 'inverse axis multi series area',
    category: 'multiseries'
  },
  'logmscolumn2d': {
    displayName: 'log axis multi series column',
    category: 'multiseries'
  },
  'logmsline': {
    displayName: 'log axis multi series line',
    category: 'multiseries'
  },
  'logstackedcolumn2d': {
    displayName: 'log axis stacked column',
    category: 'multiseries'
  },
  'pie2d': {
    displayName: 'pie',
    category: 'multiseries'
  },
  'pie3d': {
    displayName: 'pie 3D',
    category: 'multiseries'
  },
  'doughnut2d': {
    displayName: 'doughnut',
    category: 'multiseries'
  },
  'doughnut3d': {
    displayName: 'doughnut 3D',
    category: 'multiseries'
  },
  'column2d': {
    displayName: 'column',
    category: 'multiseries'
  },
  'column3d': {
    displayName: 'column 3D',
    category: 'multiseries'
  },
  'bar2d': {
    displayName: 'bar',
    category: 'multiseries'
  },
  'bar3d': {
    displayName: 'bar 3D',
    category: 'multiseries'
  },
  'waterfall2d': {
    displayName: 'waterfall',
    category: 'multiseries'
  },
  'mscombi2d': {
    displayName: 'Multi-series 2D Single Y Combination Chart',
    category: 'multiseries'
  },
  'mscombidy2d': {
    displayName: 'Multi-series 2D Dual Y Combination Chart',
    category: 'multiseries'
  },
  'area2d': {
    displayName: 'area',
    category: 'multiseries'
  },
  'heatmap': {
    displayName: 'heatmap',
    category: 'multiseries'
  }
};

exports["default"] = _default;

/***/ }),

/***/ 1638:
/***/ ((__unused_webpack_module, exports) => {



exports.__esModule = true;
exports.mergeDeep = mergeDeep;
exports.replaceMultipleStrings = replaceMultipleStrings;
exports.crossBrowserFocus = crossBrowserFocus;
exports.isEdge = isEdge;
exports.isIE = isIE;

/**
 * Returns true if item is an object, otherwise false
 * @param {*} item
 */
var isObject = function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
};
/**
 * Deep merge contents of multiple objects to return one single merged object
 * @param {*} target
 * @param {*} sources
 */


function mergeDeep(target) {
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  if (!sources.length) return target;
  var source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (var key in source) {
      if (isObject(source[key])) {
        var _Object$assign;

        if (!target[key]) Object.assign(target, (_Object$assign = {}, _Object$assign[key] = {}, _Object$assign));
        mergeDeep(target[key], source[key]);
      } else {
        var _Object$assign2;

        Object.assign(target, (_Object$assign2 = {}, _Object$assign2[key] = source[key], _Object$assign2));
      }
    }
  }

  return mergeDeep.apply(void 0, [target].concat(sources));
}
/**
 * Replace multiple sub strings of a string with another strin
 * The sub string and replaced string must be passed as key-value pair object format
 * @param {*} str
 * @param {*} mapObj
 */


function replaceMultipleStrings(str, mapObj) {
  var re = new RegExp(Object.keys(mapObj).join('|'), 'gi');
  return str.replace(re, function (matched) {
    return mapObj[matched];
  });
}
/**
 * A cross browser focus function
 * @param {*} elemet
 */


function crossBrowserFocus(elemet) {
  if (elemet.focus) {
    elemet.focus();
  }

  return elemet;
}
/**
 * Returns true if the browser is edge, false otherwise
 */


function isEdge() {
  return navigator.userAgent.indexOf('Edge') >= 0;
}
/**
 * Returns true if the browser is IE, false otherwise
 */


function isIE() {
  return /MSIE|Trident/.test(navigator.userAgent);
}

/***/ }),

/***/ 1631:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _accessibility = _interopRequireDefault(__webpack_require__(1632));

var _default = _accessibility.default;
exports["default"] = _default;

/***/ })

}]);
}));

//# sourceMappingURL=http://localhost:3052/4.1.0-beta.1/map/eval/fusioncharts.accessibility.js.map