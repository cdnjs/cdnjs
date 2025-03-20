
(function (factory) {
  if (typeof module === 'object' && typeof module.exports !== "undefined") {
      module.exports = factory;
  } else {
      factory();
  }
}(function () {
"use strict";
(self["webpackChunkFusionCharts"] = self["webpackChunkFusionCharts"] || []).push([[16],{

/***/ 1611:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _scatterbase = _interopRequireDefault(__webpack_require__(719));

var _zoomscatter = _interopRequireDefault(__webpack_require__(1612));

var _lib = __webpack_require__(274);

var _iconsymbol = __webpack_require__(1580);

var _dependencyManager = __webpack_require__(282);

var _schedular = __webpack_require__(286);

var Raphael = (0, _dependencyManager.getDep)('redraphael', 'plugin'),
    UNDEF,
    CHART_STR = 'ZoomScatter Chart',
    ZOOMSCATTER_STR = 'zoomscatter';
Raphael.addSymbol(_iconsymbol.symbolList);

var ZoomScatter = /*#__PURE__*/function (_ScatterBase) {
  (0, _inheritsLoose2.default)(ZoomScatter, _ScatterBase);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  ZoomScatter.getName = function getName() {
    return 'ZoomScatter';
  };

  function ZoomScatter() {
    var _this;

    _this = _ScatterBase.call(this) || this;
    _this.highlightEnabled = false;
    _this.isXY = true;
    _this.zoom = true;
    _this.zoomX = true;
    _this.zoomY = true;
    _this.defaultZeroPlaneHighlighted = false;
    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = ZoomScatter.prototype;

  _proto.getName = function getName() {
    return 'ZoomScatter';
  };

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _ScatterBase.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = CHART_STR;
    config.defaultDatasetType = ZOOMSCATTER_STR;
    config.enablemousetracking = true;
    config.animation = 0;
  };

  _proto.configureAttributes = function configureAttributes(dataObj) {
    var chartAttr,
        iapi = this,
        conf = iapi.config;

    _ScatterBase.prototype.configureAttributes.call(this, dataObj);

    chartAttr = iapi.getFromEnv('dataSource').chart;
    conf.stepZoom = 400 / (100 - (0, _lib.pluckNumber)(chartAttr.stepzoom, 25));

    if (conf.stepZoom <= 2) {
      conf.stepZoom = 1.9;
    }

    conf.showToolBarButtonTooltext = (0, _lib.pluckNumber)(chartAttr.showtoolbarbuttontooltext, 1);
    conf.btnResetChartToolText = conf.showToolBarButtonTooltext ? (0, _lib.pluck)(chartAttr.btnresetcharttooltext, 'Reset Chart') : '';
    conf.btnZoomOutToolText = conf.showToolBarButtonTooltext ? (0, _lib.pluck)(chartAttr.btnzoomouttooltext, 'Zoom out to previous level') : '';
    conf.btnZoomInToolText = conf.showToolBarButtonTooltext ? (0, _lib.pluck)(chartAttr.btnzoomintooltext, '<strong>Zoom in</strong><br/>Or double-' + 'click on plot to zoom-in') : '';
    conf.btnSelectZoomToolText = conf.showToolBarButtonTooltext ? (0, _lib.pluck)(chartAttr.btnselectzoomtooltext, '<strong>Select a region to zoom-in</strong><br/>Click to enable pan mode.') : '';
    conf.btnPanToolText = conf.showToolBarButtonTooltext ? (0, _lib.pluck)(chartAttr.btnpantooltext, '<strong>Drag to move across chart</strong><br/>Click to enable select-zoom mode.') : '';
  }
  /**
   * Function to state if inputOptions are to be used for this charts
   * @return {Array} value
   */
  ;

  ZoomScatter.includeInputOptions = function includeInputOptions() {
    return ['DragPan', 'DragZoomIn', 'ZoomResetButton', 'ZoomOutButton', 'ZoomInButton', 'DbTapZoom', 'PinchZoom'];
  };

  _proto.getInputConfigurations = function getInputConfigurations() {
    var iapi = this,
        config = iapi.config,
        zoomDecimalLimit = 2,
        hookFn = function hookFn() {
      // Function to manage space during zoom interactions
      iapi.addJob('spaceManage', function () {
        iapi._manageInteractiveSpace();
      }, _schedular.priorityList.configure);
    },
        inputComponents = {
      dragZoomIn: {
        scaleX: true,
        scaleY: true,
        boxStyle: {
          'stroke-width': 1,
          'stroke': 'red',
          'fill': '#00FF00',
          'opacity': 0.2,
          'cursor': 'ne-resize'
        },
        dragendFn: hookFn,
        tooltext: config.btnSelectZoomToolText,
        zoomDecimalLimit: zoomDecimalLimit
      },
      zoomResetButton: {
        tooltext: config.btnResetChartToolText,
        hookFn: hookFn
      },
      zoomOutButton: {
        tooltext: config.btnZoomOutToolText,
        hookFn: hookFn
      },
      zoomInButton: {
        tooltext: config.btnZoomInToolText,
        stepzoom: config.stepZoom,
        zoomDecimalLimit: zoomDecimalLimit,
        hookFn: hookFn
      },
      dragPan: {
        tooltext: config.btnPanToolText
      },
      dbTapZoom: {
        stepzoom: config.stepZoom,
        zoomDecimalLimit: zoomDecimalLimit,
        hookFn: hookFn
      },
      pinchZoom: {
        zoomDecimalLimit: zoomDecimalLimit
      }
    };

    return inputComponents;
  }
  /**
   * function to check if the chart specific data is proper is not
   * this fn is define for specific chart types
   * @return {boolean} if JSON data is valid or not
   */
  ;

  _proto._checkInvalidSpecificData = function _checkInvalidSpecificData() {
    var jsonData = this.getFromEnv('dataSource'),
        datasetsJSON = jsonData.dataset;

    if (!datasetsJSON) {
      return true;
    }
  }
  /**
   * Returns the dataset array
   * @return {Array} array of dataset objects
   */
  ;

  _proto.getDatasets = function getDatasets() {
    var iapi = this,
        dataSetArr = [];
    iapi.iterateComponents(function (child) {
      if (child.getType && child.getType() === 'dataset') {
        dataSetArr.push(child);
      }
    });
    return dataSetArr;
  } // This method return the dataset definations for this charts
  ;

  _proto.getDSdef = function getDSdef() {
    return _zoomscatter.default;
  } // This method return the dataset-group definations for this charts
  ;

  _proto.getDSGroupdef = function getDSGroupdef() {
    return UNDEF;
  };

  return ZoomScatter;
}(_scatterbase.default);

ZoomScatter.prototype._manageInteractiveSpace = _lib._manageInteractiveSpace;
var _default = ZoomScatter;
exports["default"] = _default;

/***/ }),

/***/ 1612:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _scatter = _interopRequireDefault(__webpack_require__(723));

var _kdtree = _interopRequireDefault(__webpack_require__(724));

var _schedular = __webpack_require__(286);

var _lib = __webpack_require__(274);

var _linearRegression = _interopRequireDefault(__webpack_require__(410));

var UNDEF,
    win = window,
    hideFn = function hideFn() {
  this.hide();
},
    POINTER = 'pointer',
    pi = Math.PI,
    DEFAULT_CURSOR = _lib.preDefStr.DEFAULT,
    pi2 = 2 * pi,
    COLOR_WHITE = '#FFFFFF',
    sameSign = function sameSign(a, b) {
  return a * b >= 0;
},
    lineIntersect = function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
  var a1, a2, b1, b2, c1, c2, r1, r2, r3, r4, denom; // Compute a1, b1, c1, where line joining points 1 and 2
  // is "a1 x + b1 y + c1 = 0".

  a1 = y2 - y1;
  b1 = x1 - x2;
  c1 = x2 * y1 - x1 * y2; // Compute r3 and r4.

  r3 = a1 * x3 + b1 * y3 + c1;
  r4 = a1 * x4 + b1 * y4 + c1; // Check signs of r3 and r4. If both point 3 and point 4 lie on
  // same side of line 1, the line segments do not intersect.

  if (r3 !== 0 && r4 !== 0 && sameSign(r3, r4)) {
    return 0; // return that they do not intersect
  } // Compute a2, b2, c2


  a2 = y4 - y3;
  b2 = x3 - x4;
  c2 = x4 * y3 - x3 * y4; // Compute r1 and r2

  r1 = a2 * x1 + b2 * y1 + c2;
  r2 = a2 * x2 + b2 * y2 + c2; // Check signs of r1 and r2. If both point 1 and point 2 lie
  // on same side of second line segment, the line segments do
  // not intersect.

  if (r1 !== 0 && r2 !== 0 && sameSign(r1, r2)) {
    return 0; // return that they do not intersect
  } // Line segments intersect: compute intersection point.


  denom = a1 * b2 - a2 * b1;

  if (denom === 0) {
    return 1; // collinear
  } // lines_intersect


  return 1; // lines intersect, return true
},
    lineIntersectsGrid = function lineIntersectsGrid(a, b, grid) {
  if (isNaN(a.x) || isNaN(a.y) || isNaN(b.x) || isNaN(b.y)) {
    return;
  }

  return lineIntersect(a.x, a.y, b.x, b.y, grid.xMinWPad, grid.yMaxWPad, grid.xMaxWPad, grid.yMaxWPad) || lineIntersect(a.x, a.y, b.x, b.y, grid.xMaxWPad, grid.yMaxWPad, grid.xMaxWPad, grid.yMinWPad) || lineIntersect(a.x, a.y, b.x, b.y, grid.xMaxWPad, grid.yMinWPad, grid.xMinWPad, grid.yMinWPad);
},
    // take how much was previously zoomed in case of pixelatedDraw
getVisibilityRatio = function getVisibilityRatio(axis) {
  var res = (axis.config.axisRange.max - axis.config.axisRange.min) / (axis.getVisibleConfig().maxValue - axis.getVisibleConfig().minValue);
  res = Math.round(res * 1000) / 1000;
  return res;
},
    numberNeighbours = function numberNeighbours(n) {
  return [n - 1, n, n + 1];
},

/*
 * A function to check if a in in range of b and c
 * where b is smaller and c is greater value
 * */
inRange = function inRange(a, b, c) {
  return a >= b && a <= c;
},

/*
 * A function to check if a in in range of b and c,
 * where either b or c could be greater value
 * */
inRangeMod = function inRangeMod(a, b, c) {
  return inRange(a, b, c) || inRange(a, c, b);
},
    getFillColor = function getFillColor(clr, opcty) {
  var opacity = opcty,
      color = clr; // todo check if we have any similar library method

  opacity = parseFloat(opacity / 100); // opacity is provided in [0-100] and needed to be in [0-1]

  if (opacity < 0) {
    // opacity cannot be negative.
    opacity = 0;
  } else if (opacity > 1) {
    // opacity cannot be more than 1
    opacity = 1;
  }

  if (!color) {
    color = COLOR_WHITE; // white stays the default color
  }

  if (_lib.isIE && !_lib.hasSVG) {
    // if the version donot have SVG in IE.
    return opacity ? color : 'transparent';
  } // convert to rgba code.


  color = color.replace(/^#?([a-f0-9]+)/ig, '$1');
  color = (0, _lib.HEXtoRGB)(color);
  color[3] = opacity.toString();
  return 'rgba(' + color.join(',') + ')';
},
    getVisibleGridsIndex = function getVisibleGridsIndex(axis) {
  var resArr = [],
      visibleConfig = axis.getVisibleConfig(),
      visibleRangeDiff = visibleConfig.maxValue - visibleConfig.minValue,
      visibleRangeMid = visibleConfig.minValue + visibleRangeDiff / 2,
      focus,
      axisConfig = axis.config,
      axisRange = axisConfig.axisRange,
      focusedGrid;
  focus = Math.abs((visibleRangeMid - (axisConfig.isReverse ? axisRange.max : axisRange.min)) / visibleRangeDiff);
  focusedGrid = resArr.focusedGrid = Math.floor(focus);
  resArr.push(focusedGrid);

  if (focus % 1 > 0.5) {
    resArr.push(focusedGrid + 1);
  } else if (focus % 1 < 0.5) {
    resArr.unshift(focusedGrid - 1);
  }

  return resArr;
};
/**
 * ZoomScatter - ZoomScatter is an extended version of FusionCharts Scatter chart.
 * It supports
 * - zooming
 * - panning
 * - scrolling
 * - pinch to zoom
 * - double tap to zoom
 * - drag to zoom
 * - drag to pan
 *
 * Note - All of these features can be added to any charts by adding the input components to the canvas
 * which are in the 'input' folder in 'renderer-javascript'.
 *
 * But the most important feature of ZoomScatter is that it supports 1 million data points, which is
 * also the most challenging part.
 *
 * The challenges of one million points -
 *
 * 1. Rendering 1 million points with svg will make the page drastically slow as there will be a burden of
 *    one million elements on the page.
 *
 * 2. Searching - Every time someone hovers mouse over zoomscatter chart search is fired. This is about 50 - 100
 *    times per second. That means we need minimum possible time to search. Linear searching is bad idea because
 *    iterating over one million data points would take huge time i.e O(n) complexity. Also binary search search is
 *    not applicable as binary search can only be used in cases where the search has to be done in one dimension.
 *    In ZoomScatter every point has two dimensions 'x' and 'y'.
 *
 * Solutions we came up with -
 *
 * 1. Since rendering a million point with svg is not posiible so we use canvas to render the points.
 *
 * 2. For searching we use KdTree algorithm which is basically a quick seach algorithm for 2 dimensional
 *    points. For more details on KdTree, visit: http://www.geeksforgeeks.org/k-dimensional-tree/
 *
 * Although KdTree was fine and solved our searching issues, rendering on canvas came up with multiple
 * more issues of its own.
 *
 * The issues faced in rendering with canvas are :
 *
 * 1. No interactivity available in canvas. Canvas is a one time paint and go. No elements or interactivity
 *    like svg.
 *
 * 2. When the ZoomScatter chart is zoomed all of the current drawings become invalid and we have to draw again.
 *    Rendering all points again takes a lot of time and blocks user for few seconds which causes major lag.
 *
 * How we overcome these problems:
 *
 * 1. For interactivity we do not make any changes in the canvas, instead we make one single svg. Now whenever a user
 *    hovers over a point, we fetch the point's x and y position and place the svg element over it. The svg element
 *    has size as same as the hovered canvas element with the extra hover attributes applied over it. Thus user
 *    gets a feeling that the hovered element has changed.
 *    And when user is not hovering over any element we simple hide the svg element, thus achieving the interactivity
 *    of the plot elements.
 *
 * 2. To overcome the burden of drawing of all element when zoom occurs, we avoid drawing of all elements
 *    at the time of zoom.
 *    ZoomScatter uses a 9 grid system. Whenever zoom occurs we divide the whole canvas into multiple grids,
 *    each of height and width as same as the canvas. There can be "n * m" number of grids depending on
 *    how many times it has been zoomed. So in zoomed state rendering all grids (even the grids that arent visible)
 *    is a total waste of cpu and user's time. So we pick what grid lies at the center and
 *    also pick all other grids lying beside it (i.e in directions: N, S, E, W, SW, SE, NW, NE).
 *    So we concentrate on those grids and draw them first. Although only a max of 4 grids can be
 *    visible at a time but we still choose to draw 9 grids so that even when user scrolls or pans the
 *    chart he/she can see the data points instantly.
 *
 * ***Code flow *** -
 *
 * **In initial rendering** - code flow in intitial is common as other cartesian charts. Please refer to cartesian
 *    docs for the flow. In short and specific manner, 'drawPlots' function of dataset is called
 *    from column's draw function.
 *
 * **When interacted with legend** - In case of legend interactivity, dataset's show or hide function is
 *    called which just changes the visibilty of canvas element where the dataset is rendered.
 *
 * **When zoomed or panned** - Zooming or panning is handled by the input components, all input components
 *    finally just changes the axis visible range (i.e axis.setVisibleConfig()) which either becomes
 *    zoomed state or panned
 *    state, depending on the interaction. Now whenever axis' visible config is changed it fires an event.
 *    The vCanvas is listening to the same event and when it event that event occurs it changes its
 *    panning accordingly
 *    and again fire an event 'vcanvasupdated' which datasets are listenting to. On 'vcanvasupdated' event
 *    all datasets draw themselves. Thus again 'drawPlots' function is called from column dataset's draw function.
 *
 * So apart from legend interaction every time drawPlot function is called.
 *
 * The drawPlots function always stores previous zoom state. Whenever it is called, it calculates current zoom
 * and compares with previous if zoom has changed or not.
 *
 * If the zoom has changed (i.e zoomed in or out), it clears all the canvas elements and commands to draw
 * everything again.
 *
 * If zoom hasnt occured(meaning pan), dataset lists all the nearby grids and draw them if they arent drawn,
 * which was previously explained in 9 grids system.
 */


var ZoomScatter = /*#__PURE__*/function (_Scatter) {
  (0, _inheritsLoose2.default)(ZoomScatter, _Scatter);

  function ZoomScatter() {
    return _Scatter.apply(this, arguments) || this;
  }

  var _proto = ZoomScatter.prototype;

  /**
   * Sets the type of the component
   * @return {string} type
   */
  _proto.getType = function getType() {
    return 'dataset';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  _proto.getName = function getName() {
    return 'zoomScatter';
  };

  _proto.configureAttributes = function configureAttributes(datasetJSON) {
    _Scatter.prototype.configureAttributes.call(this, datasetJSON);

    var plotFillHoverColor,
        plotFillHoverAlpha,
        borderHoverColor,
        borderHoverThickness,
        borderHoverAlpha,
        showHoverEffect,
        staticRadius,
        dataset = this,
        conf = dataset.config,
        chart = dataset.getFromEnv('chart'),
        chartConfig = chart.config,
        chartAttr = chart.getFromEnv('dataSource').chart,
        // Following configurations are added or modified being speciifc to the 'zoom-scatter' chart
    // We first look into dataset then chart obj and then default value.(plucking the cosmetics)
    userGivenBorderColor = (0, _lib.pluck)(datasetJSON.anchorbordercolor, chartAttr.anchorbordercolor),
        seriesAnchorBorderColor = (0, _lib.getFirstColor)((0, _lib.pluck)(userGivenBorderColor, conf.plotBorderColor)),
        seriesAnchorBorderThickness = (0, _lib.pluckNumber)(datasetJSON.anchorborderthickness, chartAttr.anchorborderthickness, userGivenBorderColor ? 1 : 0),
        seriesAnchorBgColor = (0, _lib.getFirstColor)((0, _lib.pluck)(datasetJSON.anchorbgcolor, datasetJSON.color, chartAttr.anchorbgcolor, conf.plotColor)),
        seriesAnchorAlpha = (0, _lib.pluck)(datasetJSON.anchoralpha, datasetJSON.alpha, chartAttr.anchoralpha, _lib.HUNDREDSTRING),
        seriesAnchorBgAlpha = (0, _lib.pluck)(datasetJSON.anchorbgalpha, datasetJSON.alpha, chartAttr.anchorbgalpha, _lib.HUNDREDSTRING),
        lineColorObj = {
      color: conf.lineColor,
      alpha: conf.lineAlpha
    };
    conf.plotCosmetics = {
      'fillStyle': getFillColor(seriesAnchorBgColor, seriesAnchorAlpha * seriesAnchorBgAlpha / 100),
      'strokeStyle': getFillColor(seriesAnchorBorderColor, seriesAnchorAlpha),
      'borderWidth': seriesAnchorBorderThickness,
      lineWidth: conf.lineThickness,
      'lineStrokeStyle': (0, _lib.toRaphaelColor)(lineColorObj)
    };
    dataset.config.JSONData = datasetJSON;
    /* If no border Thickness is given, the border thickness turns to 1 px in case there exists a
              user-defined anchorBorderColor; orelse the anchorBorderThickness turns to zero. */

    conf.anchorBorderThickness = (0, _lib.pluckNumber)(datasetJSON.anchorborderthickness, chartAttr.anchorborderthickness, userGivenBorderColor ? 1 : 0); // * @todo make this dynamic as per the browser performance

    conf.chunkSize = Math.floor(Math.min((datasetJSON.data || []).length / 5, 50000)); // Turning staticRadius TRUE, keeps the radius of the plots intact even after zooming.

    staticRadius = conf.staticRadius = (0, _lib.pluckNumber)(chartAttr.staticradius, 0); // Applies to all the plots of a particular dataset.

    conf.radius = (0, _lib.pluckNumber)(datasetJSON.radius, datasetJSON.anchorradius, chartAttr.radius, chartAttr.anchorradius, staticRadius ? 3 : 0.5);
    showHoverEffect = conf.showHoverEffect; // Hover Cosmetics

    plotFillHoverColor = (0, _lib.getFirstColor)((0, _lib.pluck)(datasetJSON.plotfillhovercolor, datasetJSON.hovercolor, chartAttr.plotfillhovercolor, chartAttr.hovercolor, conf.anchorbgcolor));
    plotFillHoverAlpha = (0, _lib.pluck)(datasetJSON.plotfillhoveralpha, datasetJSON.hoveralpha, chartAttr.plotfillhoveralpha, chartAttr.hoveralpha, _lib.HUNDREDSTRING);
    borderHoverColor = (0, _lib.getFirstColor)((0, _lib.pluck)(datasetJSON.plotfillhovercolor, datasetJSON.hovercolor, chartAttr.plotfillhovercolor, chartAttr.hovercolor, plotFillHoverColor));
    borderHoverAlpha = (0, _lib.pluck)(datasetJSON.plotfillhoveralpha, datasetJSON.hoveralpha, chartAttr.plotfillhoveralpha, chartAttr.hoveralpha, _lib.HUNDREDSTRING);
    borderHoverThickness = (0, _lib.pluckNumber)(datasetJSON.borderhoverthickness, chartAttr.borderhoverthickness, 1);
    conf.hoverCosmetics = {
      'showHoverEffect': showHoverEffect,
      'fill': getFillColor(plotFillHoverColor, plotFillHoverAlpha),
      'borderColor': getFillColor(borderHoverColor, borderHoverAlpha),
      'borderThickness': borderHoverThickness,
      plotFillHoverColor: plotFillHoverColor,
      plotFillHoverAlpha: plotFillHoverAlpha,
      borderHoverColor: borderHoverColor,
      borderHoverAlpha: borderHoverAlpha
    }; // store the hoverCosmetics
    // sending an examplory
    // conf.hoverCosmetics = dataset._parseHoverEffectOptions();
    // tooltip configurations

    conf.tooltip = {
      toolTipVisible: chartConfig.showtooltip,
      seriesNameInToolTip: chartConfig.seriesnameintooltip,
      toolTipSepChar: chartConfig.tooltipsepchar
    }; // create the store to store last scale factors

    conf.lastViewPort = {};
    this.disableScrollBars();
    this.setState('dirty', true);
  }
  /**
   * Function to check if axis has zoomed or chart-dimensions has changed (resized)
   */
  ;

  _proto.hasDrawingRefChanged = function hasDrawingRefChanged() {
    var dataset = this,
        xAxis = dataset.getFromEnv('xAxis'),
        yAxis = dataset.getFromEnv('yAxis'),
        dsConfig = dataset.config,
        axisConfig = dsConfig.axisConfig = dsConfig.axisConfig || {},
        res = false,
        currVizRatioX = getVisibilityRatio(xAxis),
        chartConfig = dataset.getFromEnv('chartConfig'),
        currVizRatioY = getVisibilityRatio(yAxis);
    res = axisConfig.xZoomScale !== currVizRatioX || axisConfig.yZoomScale !== currVizRatioY || dsConfig.prevCanvasHeight !== chartConfig.canvasHeight || dsConfig.prevCanvasWidth !== chartConfig.canvasWidth; // Saving zoom state

    axisConfig.xZoomScale = currVizRatioX;
    axisConfig.yZoomScale = currVizRatioY;
    dsConfig.prevCanvasHeight = chartConfig.canvasHeight;
    dsConfig.prevCanvasWidth = chartConfig.canvasWidth;
    return res;
  };

  _proto.saveScrollPos = function saveScrollPos() {
    var dataset = this,
        xAxis = dataset.getFromEnv('xAxis'),
        yAxis = dataset.getFromEnv('yAxis'),
        dsConfig = dataset.config,
        axisConfig = dsConfig.axisConfig = dsConfig.axisConfig || {}; // saving scroll state

    axisConfig.xScrollPos = xAxis.config.apparentScrollPos;
    axisConfig.yScrollPos = yAxis.config.apparentScrollPos;
  }
  /*
  * Axis has default scroll type of smart, set it to none
  */
  ;

  _proto.disableScrollBars = function disableScrollBars() {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        scrollBar = chart.getChildren() && chart.getChildren().scrollBar && chart.getChildren().scrollBar[0];
    scrollBar && chart.setScrollType('none');
  };

  _proto.calculateZoomedRadius = function calculateZoomedRadius() {
    var dataset = this,
        dsConfig = dataset.config,
        chartConfig = dataset.getFromEnv('chart').config,
        axisConfig = dsConfig.axisConfig;
    dsConfig.zoomedRadius = Math.min(dsConfig.staticRadius ? dsConfig.radius : dsConfig.radius * Math.min(axisConfig.xZoomScale, axisConfig.yZoomScale), chartConfig.canvasWidth / 2, chartConfig.canvasHeight / 2);
  };

  _proto.setupKdTree = function setupKdTree() {
    var dataset = this,
        data,
        datastore = dataset.components.data,
        ii = datastore.length,
        i,
        setVal,
        searchDataArr = [];

    for (i = 0; i < ii; ++i) {
      data = datastore[i];
      setVal = data.config.setValue;

      if (isNaN(setVal.x) || isNaN(setVal.y)) {
        continue;
      }

      setVal.index = i;
      searchDataArr.push({
        x: setVal.x,
        y: setVal.y,
        index: i,
        data: data,
        r: 1
      });
    } // create the kdtree in a seperate thread


    dataset.addJob('kdtree', function () {
      dataset.dataTree = new _kdtree.default().buildKdTree(searchDataArr);
    }, _schedular.priorityList.kdTree);
  }
  /*
    * Using kdtree algo for searching
  */
  ;

  _proto._getHoveredPlot = function _getHoveredPlot(x, y) {
    var res,
        dataset = this,
        xAxis = dataset.getFromEnv('xAxis'),
        yAxis = dataset.getFromEnv('yAxis'),
        xVal,
        yVal;
    xVal = xAxis.getValue(x + xAxis.getTranslation());
    yVal = yAxis.getValue(y + yAxis.getTranslation());
    res = dataset.dataTree && dataset.dataTree.getNeighbour({
      x: xVal,
      y: yVal,
      options: dataset.zoomRadiusOb
    }, true); // searching neighbour from Kdtree with basic search flag on

    if (res) {
      res.data.x = res.x;
      res.data.y = res.y;
      return {
        pointIndex: res.index || res.i,
        hovered: true,
        pointObj: res.data
      };
    }
  } // Helper function of _firePlotEvent which decides single/consolidated tooltip
  ;

  _proto._decideTooltipType = function _decideTooltipType(plotIndex, e) {
    var dataset = this,
        toolTipController = dataset.getFromEnv('toolTipController'),
        currentToolTip = dataset.config.currentToolTip,
        components = dataset.components,
        dataStore = components.data,
        data = dataStore[plotIndex],
        toolText = data && (data.config.finalTooltext || data.config.toolText),
        originalEvent = e.originalEvent;

    if (toolText) {
      if (currentToolTip) {
        toolTipController.draw(originalEvent, toolText, currentToolTip);
      } else {
        currentToolTip = dataset.config.currentToolTip = toolTipController.draw(originalEvent, toolText);
      }
    }
  }
  /**
   * This method handles all mouse events of an dataset.
   * @param {String} eventType name of the event
   * @param {number} plotIndex index of the plot where this event has been occured
   * @param {Event} originalEvent reference of the original mouse event
   */
  ;

  _proto._firePlotEvent = function _firePlotEvent(eventType, plotIndex, e) {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        linkClick = dataset.getFromEnv('linkClickFN'),
        components = dataset.components,
        toolTipController = dataset.getFromEnv('toolTipController'),
        dataStore = components.data,
        data = dataStore[plotIndex],
        // tip = toolTip,
    // originalEvent = e.originalEvent,
    style = dataset.getFromEnv('paper').canvas.style,
        config,
        setLink;

    if (data) {
      config = data.config;
      setLink = config.setLink;

      switch (eventType) {
        case 'fc-mouseover':
          dataset._decideTooltipType(plotIndex, e);

          dataset.highlightPoint(dataset.config.showHoverEffect, data);
          chart.plotEventHandler(dataset.getGraphicalElement('tracker'), e, 'dataplotRollover');
          setLink && (style.cursor = 'pointer');
          break;

        case 'fc-mouseout':
          toolTipController.hide(dataset.config.currentToolTip);
          setLink && (style.cursor = DEFAULT_CURSOR);
          dataset.highlightPoint(false);
          chart.plotEventHandler(dataset.getGraphicalElement('tracker'), e, 'dataplotRollout');
          break;

        case 'fc-click':
          chart.plotEventHandler(dataset.getGraphicalElement('tracker'), e, 'dataplotClick');
          this.link = setLink;
          linkClick.call(this, false);
          break;

        case 'fc-mousemove':
          dataset._decideTooltipType(plotIndex, e);

      }
    }
  }
  /*
    * Highlight the hovered element. It needs the index value to set the cosmetics according to the dataset
    cosmetics
    * @param showHover {Boolean} -
    * @param cx {Number} - Pixel information about the x-cordinate of the center of the plot being hovered.
    * @param cy {Number} - Pixel information about the y-cordinate of the center of the plot being hovered.
    * @param point {Object} - Raw information about the point say its x and y.
    * @param index {Number} - This refers to the dataset index to which the point being hovered belongs to.
    * @param toolText {String} - Tooltext needed to be displayed for the point being hovered.
  */
  ;

  _proto.highlightPoint = function highlightPoint(showHover, point) {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        chartConfig = chart.config,
        // chartComponents = chart.components,
    // chartGraphics = chart.graphics,
    animationManager = dataset.getFromEnv('animationManager'),
        trackerCheck = dataset.getGraphicalElement('tracker'),
        tracker,
        xAxis = dataset.getFromEnv('xAxis'),
        yAxis = dataset.getFromEnv('yAxis'),
        datasetConfig = dataset && dataset.config,
        radius = datasetConfig && datasetConfig.zoomedRadius || 0,
        hoverCosmetics = datasetConfig && datasetConfig.hoverCosmetics,
        fill = hoverCosmetics && hoverCosmetics.fill,
        hoverEffects = point && point.config.hoverEffects,
        anchorProps = point && point.config.anchorProps,
        borderColor = hoverCosmetics && hoverCosmetics.borderColor,
        borderThickness = hoverCosmetics && hoverCosmetics.borderThickness,
        attrObj = {},
        setLink = point && point.link; // if hover cosmetics then add that in the attrObj

    if (showHover) {
      attrObj = {
        r: radius,
        fill: fill,
        stroke: borderColor,
        'stroke-width': borderThickness,
        cx: xAxis.getPixel(point.x),
        cy: yAxis.getPixel(point.y)
      };
    }

    animationManager.setAnimationState(showHover ? 'mouseover' : 'mouseout');
    tracker = animationManager.setAnimation({
      el: trackerCheck || 'circle',
      attr: showHover && attrObj,
      container: dataset.getContainer('plotGroup'),
      component: dataset,
      doNotRemove: true,
      callback: !showHover && hideFn
    });
    showHover && tracker.show();

    if (!trackerCheck) {
      dataset.addGraphicalElement('tracker', tracker);
    } // Attach the required information for the hovering element.


    point && tracker.data('eventArgs', {
      x: point.x,
      y: point.y,
      tooltip: point.config.toolText,
      link: setLink,
      showValue: point.config.showValue,
      hoverColor: point.config.hoverEffects.enabled === true ? hoverCosmetics.plotFillHoverColor : UNDEF,
      hoverAlpha: point.config.hoverEffects.enabled === true ? hoverCosmetics.plotFillHoverAlpha : UNDEF,
      anchorBgColor: anchorProps.bgColor,
      anchorBgAlpha: anchorProps.anchorBgAlpha,
      anchorAlpha: anchorProps.anchorAlpha,
      anchorBorderColor: anchorProps.borderColor,
      anchorBorderThickness: point.config.hoverEffects.enabled === true ? borderThickness : anchorProps.borderThickness,
      anchorRadius: anchorProps.radius,
      anchorSides: anchorProps.sides,
      anchorStartAngle: anchorProps.startAngle,
      anchorHoverSides: hoverEffects.anchorSides
    });
    /* store the hovered point as last visible point. This is required to avoid redaundant calls if the same
    point is hovered. */

    chartConfig.lastHoveredPoint = point;
    attrObj.cursor = setLink ? POINTER : '';
  } // eslint-disable-next-line
  ;

  _proto.drawCommonElements = function drawCommonElements() {// Override and do nothing
  } // eslint-disable-next-line
  ;

  _proto.animateCommonElements = function animateCommonElements() {// Override and do nothing
  }
  /**
   * Function to remove a dataset
   */
  ;

  _proto.remove = function remove() {
    _Scatter.prototype.remove.call(this);

    this._deleteGridImages();
  }
  /**
   * Function to draw the plots. When there is zooming or panning this function is called
   * and it draws accordingly. Whenver there is zoom detected it clears all the graphics and redraws
   * everything, in case of panning only visible or nearby grids are drawn.
   * Zoomscatter uses 9 grid system, so whenever it is zoomed the visible grid/grids are rendered
   * and on next thread nearby but not visible grids are rendered so that when user pans it sees the
   * plots instantly. Grids are determined on baseis of zoom and canvas width and height.
   * At a given instance max 4 grids could be visible, so all visible grids are drawn on same thread
   * and nearby remaining(out of 9) grids are drawn on next thread, to reduce load.
   * In case of pinch to zoom, only group is zoomed by corresponding input manager and at lastdraw is
   * called.
   */
  ;

  _proto.drawPlots = function drawPlots() {
    var dataset = this,
        animationManager = dataset.getFromEnv('animationManager'),
        xAxis = dataset.getFromEnv('xAxis'),
        yAxis = dataset.getFromEnv('yAxis'),
        scaleX,
        scaleY,
        dsConfig = dataset.config,
        plotGroup = dataset.getContainer('plotGroup'),
        zoomedRadius,
        containerLine,
        containerPlot,
        prevContainerLine = dataset.getContainer('containerLine'),
        prevContainerPlot = dataset.getContainer('containerPlot'),
        quickRenderVisibleGrids = false,
        borderThickness = dataset.config.anchorBorderThickness;
    /* a flag to check if there is a modification in the lastViewPort and determine
      if the action is supposedly zoom or paning one. */
    // Save current scroll position

    dataset.saveScrollPos(); // TODO move to create containers
    // create the image group if not being created

    containerLine = animationManager.setAnimation({
      el: prevContainerLine || 'group',
      attr: {
        name: 'lineGroup'
      },
      container: plotGroup,
      component: dataset,
      label: 'group'
    });
    containerPlot = animationManager.setAnimation({
      el: prevContainerPlot || 'group',
      attr: {
        name: 'plotGroup'
      },
      container: plotGroup,
      component: dataset,
      label: 'group'
    });
    /*
     * Consider the cases:
     * 1. initiallyHidden is true
     * 2. dataset is hidden by legend interactivity(and then chart is interacted)
     *
     * For the above the cases, dataset have visibility state set to false and should be hidden.
    */

    if (!dataset.getState('visible')) {
      // when visible state of dataset is false, hide the plot and line
      containerLine.hide();
      containerPlot.hide();
    } else {
      // show when visible state is not explicitly set to false
      containerLine.show();
      containerPlot.show();
    }

    !prevContainerLine && dataset.addContainer('containerLine', containerLine);
    !prevContainerPlot && dataset.addContainer('containerPlot', containerPlot); // modifications in viewPortConfig indicates it is a zoom effect and not pan.

    if (dataset.hasDrawingRefChanged() || dataset.wasLastDrawPixelated || dataset.getState('dirty')) {
      dataset.wasLastDrawPixelated = false;
      /* For zoomedRadius below 2 pixels, it becomes tough for tooltip display, hence minimum 2 pixels is
      the lower cut-off.Similarily, zoomedDiameter can not be expected to be more than the canvasWidth or
      canvasHeight becuase there is no point of letting the user zoom beyond a level where only a single
      plot covers the entire canvas area */

      dataset.calculateZoomedRadius();
      scaleX = getVisibilityRatio(xAxis);
      scaleY = getVisibilityRatio(yAxis);
      zoomedRadius = dsConfig.radius * Math.min(scaleX, scaleY);
      dataset.zoomRadiusOb = {
        rx: xAxis.getValue(zoomedRadius + borderThickness) - xAxis.getValue(0),
        ry: yAxis.getValue(0) - yAxis.getValue(zoomedRadius + borderThickness)
      };

      dataset._deleteGridImages(); // delete the old grids.


      dataset._graphics._grid = {}; // initialise the _grid Object.

      quickRenderVisibleGrids = true; // in case of zoom do not create a seperate thread for the first drawing
    } // now draw the grid image


    dataset._gridDraw(quickRenderVisibleGrids);

    dataset.setState('dirty', false);
  }
  /*
    * Delete the already drawn images
    * Delete previous drawing threads
  */
  ;

  _proto._deleteGridImages = function _deleteGridImages() {
    var imageElem,
        lineImage,
        lineCanvas,
        canvasElem,
        gridElem,
        rowIndex,
        colIndex,
        row,
        dataset = this,
        datasetConfig = dataset.config,
        datasetGraphics = dataset._graphics,
        imagePool = datasetGraphics._imagePool || (datasetGraphics._imagePool = []),
        canvasPool = datasetGraphics._canvasPool || (datasetGraphics._canvasPool = []),
        lineImagePool = datasetGraphics._lineImagePool || (datasetGraphics._lineImagePool = []),
        lineCanvasPool = datasetGraphics._lineCanvasPool || (datasetGraphics._lineCanvasPool = []),
        grid = datasetGraphics._grid || [],
        batchDrawTimers = datasetConfig._batchDrawTimers; // delete previous drawing jobs

    if (batchDrawTimers && batchDrawTimers.length) {
      while (batchDrawTimers.length) {
        dataset.removeJob(batchDrawTimers.shift());
      }
    }

    for (rowIndex in grid) {
      row = grid[rowIndex];

      if (row) {
        for (colIndex in row) {
          gridElem = row[colIndex];

          if (gridElem && gridElem.drawState) {
            // unlink the image element
            imageElem = gridElem.image; // blanks the src of the image element.

            imageElem.attr({
              'src': '',
              'width': 0,
              'height': 0
            });
            imagePool.push(imageElem); // push the already drawn image in the image pool

            delete gridElem.image; // unlink the canvas element

            canvasElem = gridElem.canvas;
            canvasPool.push(canvasElem); // push the already drawn canvas in the canvas pool

            delete gridElem.canvas;
            delete gridElem.ctx;

            if (lineImage = gridElem.lineImage) {
              // blanks the src of the line image element.
              lineImage.attr({
                'src': '',
                'width': 0,
                'height': 0
              });
              lineImagePool.push(lineImage); // push the already drawn image in the image pool

              delete gridElem.lineImage; // unlink the canvas element

              lineCanvas = gridElem.lineCanvas;
              lineCanvasPool.push(lineCanvas); // push the already drawn canvas in the canvas pool

              delete gridElem.lineCanvas;
              delete gridElem.lineCtx;
            }
          }
        }
      }
    } // delete the grid store


    delete datasetGraphics._grid;
  }
  /*
    * Primarily updates the gridManager using _gridManager(). But in case of pan, it does in timer to avoid mouse
    freezing. So even if the drawing part becomes heavy, they dont block mouse drag event, enriching the UI
    experience,
    * @param quickRenderVisibleGrids {Boolean} - The flag is TRUE for zooming action and FALSE during the panning actions.
  */
  ;

  _proto._gridDraw = function _gridDraw(quickRenderVisibleGrids) {
    var dataset = this,
        datasetConfig = dataset.config; // viewPortConfig = chartConfig.viewPortConfig;
    // clear previous drading thread if any
    // TODO - use job scheduler

    clearTimeout(datasetConfig.timer);
    /* Pan the image group to the latest viewPortConfigurations taking the scaling factors(due to zooming) in
    account */
    // datasetGraphics.container.transform('t' + Math.round(-viewPortConfig.x * viewPortConfig.scaleX) + ',' +
    //           Math.round(-viewPortConfig.y * viewPortConfig.scaleY));

    if (quickRenderVisibleGrids) {
      // Zoom actions
      // draw grid members if required
      dataset._gridManager();
    } else {
      // TODO - Use scheduler
      // Pan(/Drag) actions.
      // _gridManager() is called in setTimeout() to avoid frezzed mousemove as the drawing is heavy
      datasetConfig.timer = dataset.addJob('_gridManagerId', function () {
        // draw grid members if required
        dataset._gridManager();
      }, _schedular.priorityList.label);
    }
  }
  /**
   * Function to get the 9 grids, divided by visible and invisible grids.
   * A max of 4 and min 1 grid/s could be visible out of 9
   */
  ;

  _proto.getAllGrids = function getAllGrids() {
    var dataset = this,
        dsConfig = dataset.config,
        chartConfig = dataset.getFromEnv('chart').config,
        xAxis = dataset.getFromEnv('xAxis'),
        yAxis = dataset.getFromEnv('yAxis'),
        visibleXGrids = getVisibleGridsIndex(xAxis),
        visibleYGrids = getVisibleGridsIndex(yAxis),
        nineGridsXIndices = numberNeighbours(visibleXGrids.focusedGrid),
        nineGridsYIndices = numberNeighbours(visibleYGrids.focusedGrid),
        visibleArr = [],
        nearByArr = [],
        i = 0,
        j = 0,
        datasetGraphics = dataset._graphics,
        grids = datasetGraphics._grid,
        row = {},
        element,
        scaleX = getVisibilityRatio(xAxis),
        scaleY = getVisibilityRatio(yAxis),
        noRow = Math.ceil(scaleY),
        noCol = Math.ceil(scaleX),
        // Getting neigbour grids
    startRow = Math.max(visibleYGrids.focusedGrid - 1, 0),
        endRow = Math.min(visibleYGrids.focusedGrid + 1, noRow - 1),
        startCol = Math.max(visibleXGrids.focusedGrid - 1, 0),
        endCol = Math.min(visibleXGrids.focusedGrid + 1, noCol - 1),
        cellWidth = xAxis.getAxisConfig('axisDimention').axisLength || chartConfig.canvasWidth,
        cellHeight = yAxis.getAxisConfig('axisDimention').axisLength || chartConfig.canvasHeight,
        xAxisConfig = xAxis.config,
        yAxisConfig = yAxis.config,
        xMin = xAxisConfig.axisRange.min,
        xMax = xAxisConfig.axisRange.max,
        yMin = yAxisConfig.axisRange.min,
        yMax = yAxisConfig.axisRange.max,
        radius = dsConfig.radius * Math.min(scaleX, scaleY),
        borderWidth = dsConfig.plotCosmetics.borderWidth,
        padPx = radius + borderWidth,
        xRadiusPad = Math.abs(padPx / (cellWidth * scaleX / (xAxis.config.axisRange.max - xAxis.config.axisRange.min))),
        yRadiusPad = Math.abs(padPx / (cellHeight * scaleY / (yAxis.config.axisRange.max - yAxis.config.axisRange.min))),
        xRightValue,
        xLeftValue,
        yTopValue,
        yBottomValue,
        appliedLeftXPad,
        appliedRightXPad,
        gridY,
        gridX,
        yRefPx = yAxis.getPixel(yAxis.config.axisRange.max),
        xRefPx = xAxis.getPixel(xAxis.config.axisRange.min); // Make grids if not present

    if (!grids) {
      dataset.config.grids = grids = {};
    }

    for (i = startRow; i <= endRow; ++i) {
      grids[i] = row = grids[i] || {};
      gridY = yRefPx + i * cellHeight;
      yTopValue = yAxis.getValue(gridY);
      yBottomValue = yAxis.getValue(gridY + cellHeight);

      for (j = startCol; j <= endCol; ++j) {
        appliedLeftXPad = j === 0 ? padPx : 0;
        appliedRightXPad = j === noCol - 1 ? padPx : 0;
        gridX = xRefPx + j * cellWidth - appliedLeftXPad; // Calculating values

        xLeftValue = xAxis.getValue(gridX);
        xRightValue = xAxis.getValue(gridX + cellWidth + appliedLeftXPad + appliedRightXPad);
        row[j] = element = row[j] || {
          xPixel: gridX,
          width: Math.abs(xAxis.getPixel(xRightValue) - gridX),
          yPixel: gridY,
          height: yAxis.getPixel(yBottomValue) - gridY,
          xLeftValue: xLeftValue,
          yTopValue: yTopValue,
          xRightValue: xRightValue,
          yBottomValue: yBottomValue,
          drawState: 0,
          // 0=> not drawn, 1=> drawn, 2=> is drawing
          // padding to accomodate the partial drawing of the elements of neighbouring grid
          xMinWPad: Math.max(Math.min(xLeftValue, xRightValue) - xRadiusPad, xMin),
          yMinWPad: Math.max(Math.min(yTopValue, yBottomValue) - yRadiusPad, yMin),
          xMaxWPad: Math.min(Math.max(xLeftValue, xRightValue) + xRadiusPad, xMax),
          yMaxWPad: Math.min(Math.max(yTopValue, yBottomValue) + yRadiusPad, yMax),
          i: i,
          j: j
        };

        if (!element.drawState) {
          if (~visibleXGrids.indexOf(j) && ~visibleYGrids.indexOf(i)) {
            visibleArr.push(element);
          } else if (~nineGridsXIndices.indexOf(j) && ~nineGridsYIndices.indexOf(i)) {
            nearByArr.push(element);
          }
        }
      }
    }

    return {
      focused: visibleArr,
      nearBy: nearByArr
    };
  }
  /**
   * Calculation of position during post space management
   *
   * @memberof ZoomScatter
   */
  ;

  _proto.allocatePosition = function allocatePosition() {
    var dataset = this,
        datasetConfig = dataset.config,
        dsStore = dataset.components.data,
        dsStoreLength = dsStore.length,
        xAxis = dataset.getFromEnv('xAxis'),
        yAxis = dataset.getFromEnv('yAxis'),
        cx,
        cy,
        i,
        element,
        config,
        radius = datasetConfig.zoomedRadius;

    for (i = 0; i < dsStoreLength; i++) {
      config = dsStore[i].config;
      element = config.setValue;
      cx = xAxis.getPixel(element.x); // value to pixel conversions

      cy = yAxis.getPixel(element.y); // value to pixel conversions

      config.props = {
        element: {
          attr: {
            polypath: [0, cx, cy, radius || config.anchorProps.radius]
          }
        },
        label: {
          attr: {}
        }
      };
    }
  }
  /*
       * initially draw max 4 grid (grid of the 4 sample corner point) which are visible and then draw
       the rest images
      */
  ;

  _proto._gridManager = function _gridManager() {
    var dataset = this,
        gridsOb = {},
        callback;
    gridsOb = dataset.getAllGrids();
    dataset.config._drawGrid = gridsOb.focused; // The visible images are drawn first and the rest images are drawn as a callback of the rest.

    if (gridsOb.focused.length || gridsOb.nearBy.length) {
      dataset.config._drawGrid = gridsOb.focused; // create the call back function that will be called once these grids are created

      callback = function callback() {
        dataset.config._drawGrid = gridsOb.nearBy; // No callback after the 2nd phase

        dataset._drawGridArr();
      }; // draw the images for 1st phase


      dataset._drawGridArr(callback);
    }
  }
  /*
    *
    * @param callBack {Function} - Once the four visible images are drawn, this function sets the _drawGrid to the
    rest images, which are drawn again. Hence this callback is invoked at the end of the completion of drawing of
    the first phase images.
  */
  ;

  _proto._drawGridArr = function _drawGridArr(callBack) {
    // draw grids and delete them from the drawGridarr once completed
    var gridElem,
        canvasElem,
        lineCanvasElem,
        ctx,
        lineCtx,
        dataset = this,
        datasetConfig = dataset.config,
        drawLine = datasetConfig.drawLine,
        gridIndexArr = datasetConfig._drawGrid,
        // list of images to be drawn.
    gridSubArr = [],
        animationManager = dataset.getFromEnv('animationManager'),
        containerLine = dataset.getContainer('containerLine'),
        containerPlot = dataset.getContainer('containerPlot'),
        xAxis = dataset.getFromEnv('xAxis'),
        yAxis = dataset.getFromEnv('yAxis'),
        width,
        height,
        scaleX = getVisibilityRatio(xAxis),
        scaleY = getVisibilityRatio(yAxis),
        imagePool = dataset._graphics._imagePool || [],
        canvasPool = dataset._graphics._canvasPool || [],
        lineImagePool = dataset._graphics._lineImagePool || [],
        lineCanvasPool = dataset._graphics._lineCanvasPool || [],
        plotCosmetics = datasetConfig.plotCosmetics,
        // update the radius with every zoom configurations.
    radius = datasetConfig.radius * Math.min(scaleX, scaleY),
        // offset = (chart.components.xAxis[0].getAxisConfig('axisDimention').x || chartConfig.canvasLeft) -
    //             chartConfig.canvasLeft,
    gridX,
        gridY;

    if (gridIndexArr.length) {
      while (gridIndexArr.length) {
        gridElem = gridIndexArr.shift();
        gridX = gridElem.xPixel;
        gridY = gridElem.yPixel;
        width = gridElem.width;
        height = gridElem.height;

        if (gridElem.drawState === 2) {
          continue;
        }

        gridElem.drawState = 2; // use another set of images for drawing the lines.

        if (drawLine) {
          // add the image from the pool
          if (lineImagePool.length) {
            gridElem.lineImage = lineImagePool.shift();
          }

          gridElem.lineImage = animationManager.setAnimation({
            el: gridElem.lineImage || 'image',
            attr: {
              x: gridX,
              y: gridY,
              width: width,
              height: height
            },
            container: containerLine,
            component: dataset,
            label: 'image'
          });

          if (lineCanvasPool.length) {
            gridElem.lineCanvas = lineCanvasElem = lineCanvasPool.shift();
          } else {
            // create the canvas if it doesnot exist.
            gridElem.lineCanvas = lineCanvasElem = win.document.createElement('canvas');
          } // set the canvas dimensions


          lineCanvasElem.setAttribute('width', width);
          lineCanvasElem.setAttribute('height', height); // cache the context of the canvas element.

          lineCtx = gridElem.lineCtx = lineCanvasElem.getContext('2d'); // apply the cosmetics of the anchors.

          lineCtx.fillStyle = plotCosmetics.fillStyle;
          lineCtx.strokeStyle = plotCosmetics.lineStrokeStyle;
          lineCtx.lineWidth = plotCosmetics.lineWidth;
        } // add the image from the pool


        if (imagePool.length) {
          gridElem.image = imagePool.shift();
        }

        gridElem.image = animationManager.setAnimation({
          el: gridElem.image || 'image',
          attr: {
            x: gridX,
            y: gridY,
            width: width,
            height: height
          },
          container: containerPlot,
          component: dataset,
          label: 'image'
        }); // add the canvas element from the pool

        if (canvasPool.length) {
          gridElem.canvas = canvasElem = canvasPool.shift();
        } else {
          // create the canvas if it doesnot exist.
          gridElem.canvas = canvasElem = win.document.createElement('canvas');
        } // set the canvas dimensions


        canvasElem.setAttribute('width', width);
        canvasElem.setAttribute('height', height);
        ctx = gridElem.ctx = canvasElem.getContext('2d'); // cache the context of the canvas element.
        // apply the cosmetics of the anchors.

        if (radius < 1) {
          /* incase of very small radius, set the fill as stroke-style and draw a dot. This is acts as a
          leverage on performance. */
          ctx.strokeStyle = plotCosmetics.fillStyle;
          ctx.lineWidth = 0.5;
        } else {
          ctx.fillStyle = plotCosmetics.fillStyle;
          ctx.strokeStyle = plotCosmetics.strokeStyle;
          ctx.lineWidth = plotCosmetics.borderWidth;
        }

        gridSubArr.push(gridElem);
      } // reset the batch drawing index


      datasetConfig._batchDrawindex = dataset.config.JSONData.data && dataset.config.JSONData.data.length - 1 || 0; // start drawing the images in batches.

      dataset._drawGridArrBatch(gridSubArr, callBack, !datasetConfig.animation.enabled);
    } else {
      // if there is nothing to draw then call the callBack
      callBack && callBack();
    }
  }
  /**
    * Draw the grids of the array together in batch.
    * At the batch end call the call back.
    * Use grid's own image and canvas only.
    * At the end set the drawState of the grids.
    * Draw in batches so that it naver goes for script time out.
    * Process - Loop is iteratedover every data item and if it falls in the rande of grids that is currently
    * being drawn then it is renderedin that particular grid
    * @param gridArr {Array} - Stores the grid Elements, which has its own indivual images, canvas elements and
    contexts
    * @param callBack {Function} - Function being called at the end of all drawings of the images in the gridArr.
    * @param doNotUpdateImage {Boolean} - Flag to update the visual configurations. If set to true, At every batch
    the images are viusally updated. Once set to false they are shown only if all the drawing is completed. This
    is attained using showAnimation = 0
  */
  ;

  _proto._drawGridArrBatch = function _drawGridArrBatch(gridArr, callBack, doNotUpdateImage) {
    var cx,
        cy,
        cx1,
        cx2,
        cy1,
        cy2,
        storeX,
        j,
        gridElem,
        ctx,
        lineCtx,
        element,
        leftElement,
        rightElement,
        lineImage,
        lineCanvas,
        image,
        canvas,
        regresionPoints,
        dataset = this,
        datasetConfig = dataset.config,
        drawLine = datasetConfig.drawLine,
        plotCosmetics = datasetConfig.plotCosmetics,
        i = datasetConfig._batchDrawindex,
        arr = dataset.components.data,
        chunkSize = datasetConfig.chunkSize,
        endIndex = i - chunkSize,
        xAxis = dataset.getFromEnv('xAxis'),
        yAxis = dataset.getFromEnv('yAxis'),
        chart = dataset.getFromEnv('chart'),
        animationManager = dataset.getFromEnv('animationManager'),
        dataSource = chart.getFromEnv('dataSource'),
        JSONData = datasetConfig.JSONData,
        radius = datasetConfig.zoomedRadius,
        // If regression line should be drawn
    regressionStatus = (0, _lib.pluckNumber)(JSONData.showregressionline, chart.config.showregressionline, 0),
        regressionLineColor,
        regressionLineThickness,
        regressionLineAlpha,
        // stores the already plotted pixels for caching and performance improvement.
    _store = datasetConfig._store || [],
        // doStroke for the plot is set to TRUE only if there exists a lineWidth or radius is less than 1 pixel
    doStroke = plotCosmetics.lineWidth || radius < 1,
        leftElCx,
        leftElCy;

    if (regressionStatus) {
      // Regression line color picking preference :
      // regressionColor at dataset level > regressionColor at chart level > anchor border color of plots > line color
      regressionLineColor = (0, _lib.toRaphaelColor)((0, _lib.pluck)(JSONData.regressionlinecolor, dataSource.chart.regressionlinecolor, datasetConfig.anchorbordercolor, datasetConfig.lineColor, 'fff000')); // regressionLineThickness at dataset level > regressionLineThickness at chart level

      regressionLineThickness = (0, _lib.pluckNumber)(JSONData.regressionlinethickness, dataSource.chart.regressionlinethickness, 1); // regressionLineAlpha at dataset level > regressionThickness at chart level

      regressionLineAlpha = (0, _lib.pluckNumber)(JSONData.regressionlinealpha, dataSource.chart.regressionlinealpha, 100) / 100;
    } // clear all the previous visual for the canvas grid and update its cosmetics.


    for (j = 0; j < gridArr.length; j += 1) {
      gridArr[j].ctx.beginPath();

      if (drawLine) {
        gridArr[j].lineCtx.beginPath();
      }
    }

    endIndex = endIndex <= 0 ? 0 : endIndex; // lower limit is 0

    for (; i >= endIndex; i -= 1) {
      element = arr[i] && arr[i].config.setValue; // Check for NaN value.

      if (!element || isNaN(element.x) || isNaN(element.y)) {
        continue;
      } // Check which grid is the element lying and draw it in that grid.


      for (j = 0; j < gridArr.length; j += 1) {
        gridElem = gridArr[j];

        if (!inRangeMod(element.x, gridElem.xMinWPad, gridElem.xMaxWPad) || !inRangeMod(element.y, gridElem.yMinWPad, gridElem.yMaxWPad)) {
          if (drawLine && i && lineIntersectsGrid(element, arr[i - 1].config.setValue, gridElem)) {
            // Draw only line if line goes through this grid
            leftElement = arr[i - 1].config.setValue;
            leftElCx = xAxis.getPixel(leftElement.x) - gridElem.xPixel;
            leftElCy = yAxis.getPixel(leftElement.y) - gridElem.yPixel;
            cx = xAxis.getPixel(element.x) - gridElem.xPixel;
            cy = yAxis.getPixel(element.y) - gridElem.yPixel;
            lineCtx = gridElem.lineCtx;
            lineCtx.moveTo(Math.round(leftElCx), Math.round(leftElCy));
            lineCtx.lineTo(cx, cy);
          }

          continue;
        }

        ctx = gridElem.ctx;
        lineCtx = gridElem.lineCtx;
        cx = xAxis.getPixel(element.x) - gridElem.xPixel; // value to pixel conversions

        cy = yAxis.getPixel(element.y) - gridElem.yPixel; // value to pixel conversions

        /* Incase there is already a point being drawn with exact same center pixelwise, there is no need to
          draw again. This can happen when two data points are very closely placed. This caching is done in
          _store */

        storeX = _store[cx];

        if (!storeX) {
          storeX = _store[cx] = {};
        }

        if (!storeX[cy]) {
          storeX[cy] = true; // set the flag of a circle being drawn at that pixel to TRUE

          if (drawLine) {
            leftElement = i && arr[i - 1].config.setValue;
            rightElement = i < arr.length - 1 && arr[i + 1].config.setValue;

            if (leftElement && !isNaN(leftElement.x) && !isNaN(leftElement.y)) {
              leftElCx = xAxis.getPixel(leftElement.x) - gridElem.xPixel;
              leftElCy = yAxis.getPixel(leftElement.y) - gridElem.yPixel;
              lineCtx.moveTo(Math.round(leftElCx), Math.round(leftElCy));
              lineCtx.lineTo(cx, cy);

              if ((!inRangeMod(rightElement.x, gridElem.xMinWPad, gridElem.xMaxWPad) || !inRangeMod(rightElement.y, gridElem.yMinWPad, gridElem.yMaxWPad)) && !isNaN(rightElement.x) && !isNaN(rightElement.y)) {
                lineCtx.lineTo(xAxis.getPixel(rightElement.x) - gridElem.xPixel, yAxis.getPixel(rightElement.y) - gridElem.yPixel);
              }
            }
          }

          if (radius < 1) {
            /* Drawing a dot seemed to have a performance preference to drawing an arc. So if radius
            turns less than 1 pixel, drawing a dot is prefered. */
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + 1, cy);
          } else {
            ctx.moveTo(cx + radius, cy);
            ctx.arc(cx, cy, radius, 0, pi2);
          }
        }
      }
    } // clear all the previous visual for the canvas grid and update its cosmetics.


    for (j = 0; j < gridArr.length; j += 1) {
      gridElem = gridArr[j];
      ctx = gridElem.ctx;
      ctx.fill();
      doStroke && ctx.stroke();
      ctx.closePath();

      if (drawLine) {
        lineCtx = gridElem.lineCtx; // lineCtx.fill();

        doStroke && lineCtx.stroke();
        lineCtx.closePath();
      }
    } // reset the _batchDrawindex


    datasetConfig._batchDrawindex = i; // if there is any remaning drawing to be drawn

    if (i >= 0) {
      if (!doNotUpdateImage) {
        // update all the grid images for the visual clue.
        for (j = 0; j < gridArr.length; j += 1) {
          image = gridArr[j].image;
          canvas = gridArr[j].canvas; // update the src of the images.

          animationManager.setAnimation({
            el: image,
            attr: {
              src: canvas.toDataURL('image/png')
            },
            component: dataset
          });

          if (datasetConfig.drawLine) {
            lineImage = gridArr[j].lineImage;
            lineCanvas = gridArr[j].lineCanvas; // update the src of the images.

            animationManager.setAnimation({
              el: lineImage,
              src: canvas.toDataURL('image/png'),
              component: dataset
            });
          }
        }
      } // store the jobId for future cancellation


      (datasetConfig._batchDrawTimers || (datasetConfig._batchDrawTimers = [])).push(dataset.addJob('_drawGridArrBatchID', function () {
        dataset.getFromEnv('chart') && dataset._drawGridArrBatch(gridArr, callBack, doNotUpdateImage);
      }, _schedular.priorityList.draw));
    } else {
      // drawing completed
      // remove the temp store arr
      dataset.setupKdTree();
      delete datasetConfig._store; // regresion line generalised for all images.

      if (regressionStatus) {
        // Fetch the regression points
        regresionPoints = datasetConfig.regressionPoints; // update all the grid images for the regressionLine.

        for (j = 0; j < gridArr.length; j += 1) {
          gridElem = gridArr[j];
          image = gridElem.image;
          canvas = gridElem.canvas;
          ctx = gridElem.ctx;

          if (!regresionPoints.length) {
            continue;
          } // extend the points to make the regressionLine throughout the canvas.


          cx1 = xAxis.getPixel(regresionPoints[0].x) - gridElem.xPixel;
          cy1 = yAxis.getPixel(regresionPoints[0].y) - gridElem.yPixel;
          cx2 = xAxis.getPixel(regresionPoints[1].x) - gridElem.xPixel;
          cy2 = yAxis.getPixel(regresionPoints[1].y) - gridElem.yPixel;
          ctx.beginPath();
          ctx.strokeStyle = regressionLineColor;
          ctx.lineWidth = regressionLineThickness; // Apply opacity to regression line

          ctx.globalAlpha = regressionLineAlpha;
          ctx.moveTo(cx1, cy1);
          ctx.lineTo(cx2, cy2);
          ctx.stroke();
          ctx.closePath();
        }
      } // update all the grid images for the visual clue.


      for (j = 0; j < gridArr.length; j += 1) {
        gridElem = gridArr[j];
        image = gridElem.image;
        canvas = gridElem.canvas;
        gridElem.drawState = 1; // set the drawState flag as drawn.

        animationManager.setAnimation({
          el: image,
          attr: {
            src: canvas.toDataURL('image/png')
          },
          component: dataset
        });

        if (drawLine) {
          lineImage = gridElem.lineImage;
          lineCanvas = gridElem.lineCanvas;
          animationManager.setAnimation({
            el: lineImage,
            attr: {
              src: lineCanvas.toDataURL('image/png')
            },
            component: dataset
          });
        }
      } // invoke the completion callBack


      callBack && callBack();
    }
  }
  /**
   * API to find out the maximum and minimum values of regressionline path.
   *
   * @returns {Object} xMax, xMin, yMax, yMin
   * @memberof ScatterDataset
   */
  ;

  _proto.getRegressionPoints = function getRegressionPoints() {
    var dataset = this,
        regressionPoints = dataset.config.regressionPoints,
        xMax = -Infinity,
        xMin = Infinity,
        yMax = -Infinity,
        yMin = Infinity,
        i,
        regPointsLength;

    if (!regressionPoints || !regressionPoints.length) {
      return;
    }

    regPointsLength = regressionPoints.length;

    for (i = 0; i < regPointsLength; i++) {
      xMax = Math.max(xMax, regressionPoints[i].x);
      xMin = Math.min(xMin, regressionPoints[i].x);
      yMax = Math.max(yMax, regressionPoints[i].y);
      yMin = Math.min(yMin, regressionPoints[i].y);
    }

    return {
      max: yMax,
      min: yMin,
      xMax: xMax,
      xMin: xMin
    };
  }
  /*
    * This function is used to make a dataset visible when clicked on its respective legend.
    * This fucntion is fired from drawGraph() every time a deactivated legend is clicked.
    */
  ;

  _proto.show = function show() {
    var dataSet = this,
        lineGroup = dataSet.getContainer('containerLine'),
        plotGroup = dataSet.getContainer('containerPlot'),
        legend = dataSet.getFromEnv('legend');

    if (legend && legend.getItem(dataSet.config.legendItemId)) {
      legend.getItem(dataSet.config.legendItemId).removeLegendState('hidden');
    }

    dataSet.setState('visible', true);
    lineGroup.show();
    plotGroup.show();
    dataSet.setState('dirty', true);
  } // eslint-disable-next-line
  ;

  _proto.setContainerVisibility = function setContainerVisibility() {// empty fn
  }
  /**
   * Function for drawing zoomscatter plots.
   */
  ;

  _proto.draw = function draw() {
    var dataSet = this,
        conf = dataSet.config,
        xAxis = dataSet.getFromEnv('xAxis'),
        xAxisZeroPos = xAxis.getPixel(0),
        xAxisFirstPos = xAxis.getPixel(1),
        groupMaxWidth = dataSet.getFromEnv('groupMaxWidth'),
        drawn = conf.drawn,
        scrollMinValForLabel,
        scrollMaxValForLabel,
        skipInfo = dataSet.getSkippingInfo && dataSet.getSkippingInfo() || {},
        skippingApplied = skipInfo.skippingApplied;

    if (!groupMaxWidth) {
      groupMaxWidth = Math.abs(xAxisFirstPos - xAxisZeroPos);
      dataSet.addToEnv('groupMaxWidth', groupMaxWidth);
    }

    !drawn && dataSet.createContainer();
    dataSet.setContainerVisibility(true);

    if (skippingApplied) {
      dataSet.hidePlots();
    } // Draw all the graphic elements


    dataSet.drawPlots();
    dataSet.drawCommonElements && !dataSet.config.skipCommonElements && dataSet.drawCommonElements(); // Datalabels are drawn in a different thread for the first time and later drawn in the same thread.

    conf.drawn ? dataSet.drawLabel(scrollMinValForLabel, scrollMaxValForLabel) : dataSet.addJob('labelDrawID', function () {
      dataSet.drawLabel(scrollMinValForLabel, scrollMaxValForLabel);
    }, _schedular.priorityList.label); // Setting the drawn flag true to draw differently incase of real time draw.

    conf.drawn = true;
    dataSet.removePlots();
  }
  /*
  * This function is used to make a dataset hidden when clicked on its respective legend.
  * This fucntion is fired from drawGraph() every time an activated legend is clicked.
  */
  ;

  _proto.hide = function hide() {
    var dataSet = this,
        lineGroup = dataSet.getContainer('containerLine'),
        plotGroup = dataSet.getContainer('containerPlot'),
        legend = dataSet.getFromEnv('legend');

    if (legend && legend.getItem(dataSet.config.legendItemId)) {
      legend.getItem(dataSet.config.legendItemId).setLegendState('hidden');
    }

    lineGroup.hide();
    plotGroup.hide();
    dataSet.setState('dirty', true);
    dataSet.setState('visible', false);
  };

  _proto._addLegend = function _addLegend() {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        chartAttr = chart.getFromEnv('dataSource').chart,
        legend = chart.getFromEnv('legend'),
        conf = dataset.config,
        legendItem,
        config,
        JSONData = dataset.config.JSONData,
        userGivenBorderColor = (0, _lib.pluck)(JSONData.anchorbordercolor, chartAttr.anchorbordercolor),
        seriesAnchorBorderColor = (0, _lib.getFirstColor)((0, _lib.pluck)(userGivenBorderColor, conf.plotBorderColor)),
        seriesAnchorBgColor = (0, _lib.getFirstColor)((0, _lib.pluck)(JSONData.anchorbgcolor, JSONData.color, chartAttr.anchorbgcolor, conf.plotColor)),
        seriesAnchorAlpha = (0, _lib.pluck)(JSONData.anchoralpha, JSONData.alpha, chartAttr.anchoralpha, _lib.HUNDREDSTRING),
        seriesAnchorBgAlpha = (0, _lib.pluck)(JSONData.anchorbgalpha, JSONData.alpha, chartAttr.anchorbgalpha, _lib.HUNDREDSTRING),
        fillColor = getFillColor(seriesAnchorBgColor, seriesAnchorAlpha * seriesAnchorBgAlpha / 100),
        strokeColor = getFillColor(seriesAnchorBorderColor, seriesAnchorAlpha);
    config = {
      enabled: conf.includeInLegend,
      type: dataset.type,
      anchorSide: 2,
      label: (0, _lib.getFirstValue)(dataset.config.JSONData.seriesname),
      legendIconAlpha: (0, _lib.pluckNumber)(JSONData.legendiconalpha)
    };

    if (conf.includeinlegend) {
      legendItem = legend.getItem(dataset.config.legendItemId);

      if (!legendItem) {
        dataset.config.legendItemId = legend.createItem(dataset);
        legendItem = legend.getItem(dataset.config.legendItemId);
        dataset.addExtEventListener('fc-click', function () {
          legendItem.itemClickFn();
        }, legendItem);
      } else {
        legendItem.configure({
          style: legend.config.itemStyle,
          hiddenStyle: legend.config.itemHiddenStyle,
          datasetVisible: legend.config.datasetVisible,
          hoverStyle: legend.config.itemHoverStyle
        });
      }

      legendItem.configure(config);
      legendItem.setStateCosmetics('default', {
        symbol: {
          fill: fillColor,
          bgAlpha: (0, _lib.pluckNumber)(JSONData.legendiconbgalpha, JSONData.legendiconalpha, chartAttr.legendiconbgalpha, chartAttr.legendiconalpha, seriesAnchorBgAlpha),
          borderAlpha: (0, _lib.pluckNumber)(JSONData.legendiconborderalpha, JSONData.legendiconalpha, chartAttr.legendiconborderalpha, chartAttr.legendiconalpha, '100'),
          stroke: strokeColor,
          rawFillColor: seriesAnchorBgColor,
          rawStrokeColor: conf.anchorbordercolor,
          'stroke-width': conf.anchorBorderThickness
        }
      }); // check if dataset is initiallyhidden

      if (!dataset.getState('visible')) {
        legendItem.setLegendState('hidden');
      } else {
        // remove hidden state of legend item is dataset is not hidden
        legendItem.removeLegendState('hidden');
      }
    } else if (dataset.config.legendItemId) {
      legend.disposeItem(dataset.config.legendItemId);
    }
  }
  /*
       * Sets the configurations for the set level attributes.
      */
  ;

  _proto._setConfigure = function _setConfigure() {
    var i,
        config,
        dataObj,
        setData,
        setValue,
        toolText,
        toolTipValue,
        macroIndices,
        parserConfig,
        formatedVal,
        formatedValX,
        setDisplayValue,
        infMin = -Infinity,
        infMax = +Infinity,
        yMax = infMin,
        yMin = infMax,
        xMin = infMax,
        xMax = infMin,
        dataset = this,
        dataStore = dataset.components.data || (dataset.components.data = []),
        chart = dataset.getFromEnv('chart'),
        conf = dataset.config,
        JSONData = dataset.config.JSONData,
        // chart level JSON format
    chartAttr = chart.getFromEnv('dataSource').chart,
        setDataArr = JSONData.data || [],
        datasetLen = setDataArr.length,
        numberFormatter = dataset.getFromEnv('number-formatter'),
        yAxisName = (0, _lib.parseUnsafeString)(chartAttr.yaxisname),
        xAxisName = (0, _lib.parseUnsafeString)(chartAttr.xaxisname),
        lineDashed = conf.lineDashed,
        lineDashStyle = conf.lineDashStyle,
        // If regression line should be drawn
    regressionStatus = (0, _lib.pluckNumber)(JSONData.showregressionline, chart.config.showregressionline, 0),
        // whether regressionline to be drawn by taking primary axis as x-axis or y-axis
    regressionShowYonX = (0, _lib.pluckNumber)(JSONData.showyonx, chartAttr.showyonx, 1),
        parentYAxis = conf.parentYAxis,
        tooltipSepChar = conf.toolTipSepChar,
        seriesname = conf.seriesname; // Iterate through all set level data

    for (i = 0; i < datasetLen; i += 1) {
      setData = setDataArr[i];
      dataObj = dataStore[i] || (dataStore[i] = {});
      config = dataObj.config || (dataObj.config = {}); // The set data is given: {x: <Number>, y : <Number>}

      config.setValue = setValue = {
        x: numberFormatter.getCleanValue(setData.x),
        y: numberFormatter.getCleanValue(setData.y),
        index: i
      };

      if (xMax < setValue.x) {
        xMax = setValue.x;
        conf.rightMostData = dataObj;
      }

      if (xMin > setValue.x) {
        xMin = setValue.x;
        conf.leftMostData = dataObj;
      }

      yMax = Math.max(yMax, setValue.y);
      yMin = Math.min(yMin, setValue.y); // update the regression calulations.

      conf.showRegressionLine && this.pointValueWatcher(setValue.x, setValue.y, conf.regressionObj);
      config.setLink = (0, _lib.pluck)(setData.link); // Parsing the anchor properties for set level

      config.anchorProps = this._parseAnchorProperties(i);
      config.showValue = (0, _lib.pluckNumber)(setData.showvalue, conf.showValues); // Dashed, color and alpha configuration in set level is only for line chart

      config.dashed = (0, _lib.pluckNumber)(setData.dashed, lineDashed);
      config.color = (0, _lib.pluck)(setData.color, conf.lineColor);
      config.alpha = (0, _lib.pluck)(setData.alpha, conf.lineAlpha);
      config.dashStyle = config.dashed ? lineDashStyle : 'none';
      config.toolTipValue = toolTipValue = numberFormatter.dataLabels(setValue.y, parentYAxis);
      config.setDisplayValue = setDisplayValue = (0, _lib.parseUnsafeString)(setData.displayvalue);
      formatedVal = config.formatedVal = (0, _lib.pluck)(setData.toolTipValue, numberFormatter.dataLabels(setValue.y, parentYAxis));
      formatedValX = numberFormatter.xAxis(setValue.x);
      config.displayValue = (0, _lib.pluck)(setDisplayValue, toolTipValue);
      config.setTooltext = (0, _lib.getValidValue)((0, _lib.parseUnsafeString)((0, _lib.pluck)(setData.tooltext, conf.plotToolText), false)); // Initial tooltext parsing

      if (!conf.showTooltip) {
        toolText = false;
      } else if (config.setTooltext !== UNDEF) {
        macroIndices = [4, 5, 6, 7, 8, 9, 10, 11];
        parserConfig = {
          yaxisName: yAxisName,
          xaxisName: xAxisName,
          yDataValue: formatedVal,
          xDataValue: formatedValX
        };
        toolText = (0, _lib.parseTooltext)(config.setTooltext, macroIndices, parserConfig, setData, chartAttr, JSONData);
      } else {
        // determine the default tooltext then.
        if (formatedVal === null) {
          toolText = false;
        } else {
          toolText = seriesname ? seriesname + tooltipSepChar : _lib.BLANKSTRING;
          toolText += setValue.x ? formatedValX + tooltipSepChar : _lib.BLANKSTRING;
          toolText += toolTipValue;
        }
      }

      config.toolText = toolText;

      if (!dataObj) {
        dataObj = dataStore[i] = {
          graphics: {}
        };
      } else if (!dataObj.graphics) {
        dataStore[i].graphics = {};
      } // parse the hover cosmetics.


      config.hoverEffects = this._parseHoverEffectOptions(dataObj);
      config.anchorProps.isAnchorHoverRadius = config.hoverEffects.anchorRadius;
    }

    conf.xMax = xMax;
    conf.xMin = xMin;
    conf.yMin = yMin;
    conf.yMax = yMax; // augment the regression line to be a line series.

    if (regressionStatus) {
      conf.regressionPoints = (0, _linearRegression.default)(JSONData.data.slice(), regressionShowYonX)[1];
    } else {
      conf.regressionPoints = [];
    }

    dataset.ErrorValueConfigure && dataset.ErrorValueConfigure();
  };

  return ZoomScatter;
}(_scatter.default);

var _default = ZoomScatter;
exports["default"] = _default;

/***/ }),

/***/ 1610:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _zoomscatter = _interopRequireDefault(__webpack_require__(1611));

var _default = _zoomscatter.default;
exports["default"] = _default;

/***/ }),

/***/ 1609:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _zoomscatter = _interopRequireDefault(__webpack_require__(1610));

exports.ZoomScatter = _zoomscatter.default;
var _default = {
  name: 'zoomscatter',
  type: 'package',
  requiresFusionCharts: true,
  extension: function extension(FusionCharts) {
    FusionCharts.addDep(_zoomscatter.default);
  }
};
exports["default"] = _default;

/***/ })

}]);
}));

//# sourceMappingURL=http://localhost:3052/4.1.0-beta.1/map/eval/fusioncharts.zoomscatter.js.map