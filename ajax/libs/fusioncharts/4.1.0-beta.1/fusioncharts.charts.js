
(function (factory) {
  if (typeof module === 'object' && typeof module.exports !== "undefined") {
      module.exports = factory;
  } else {
      factory();
  }
}(function () {
"use strict";
(self["webpackChunkFusionCharts"] = self["webpackChunkFusionCharts"] || []).push([[2],{

/***/ 606:
/***/ ((__unused_webpack_module, exports) => {



exports.__esModule = true;
exports["default"] = void 0;
var animationObject = {
  initialAttr: {
    opacity: 0
  },
  finalAttr: {
    opacity: 1
  },
  slot: 'initial'
};
var _default = {
  'initial.canvas.canvas': {
    'canvas.appearing': [animationObject]
  }
};
exports["default"] = _default;

/***/ }),

/***/ 605:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _canvas = _interopRequireDefault(__webpack_require__(522));

var _lib = __webpack_require__(274);

var _dependencyManager = __webpack_require__(282);

var _canvas3d = _interopRequireDefault(__webpack_require__(606));

var _redraphaelShapes = _interopRequireDefault(__webpack_require__(607));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var R = (0, _dependencyManager.getDep)('redraphael', 'plugin'),
    canvasBaseColor3DStr = 'canvasBaseColor3D',
    canvasBGAlphaStr = 'canvasBgAlpha',
    clipCanvasStr = 'clip-canvas',
    clipCanvasInitStr = 'clip-canvas-init',
    COMMA = ',',
    MAX_MITER_LINEJOIN = 2,
    CANVAS_BASE_DEFAULT_VISIBILITY = 'hidden',
    ROUND = _lib.preDefStr.ROUND,
    miterStr = _lib.preDefStr.miterStr,
    math = Math,
    mathMax = math.max,
    Raphael = R,
    NONE = 'none',
    M = 'M',
    L = 'L',
    Z = 'Z',
    H = 'H',
    V = 'V',
    chartPaletteStr = {
  chart2D: {
    bgColor: 'bgColor',
    bgAlpha: 'bgAlpha',
    bgAngle: 'bgAngle',
    bgRatio: 'bgRatio',
    canvasBgColor: 'canvasBgColor',
    canvasBaseColor: 'canvasBaseColor',
    divLineColor: 'divLineColor',
    legendBgColor: 'legendBgColor',
    legendBorderColor: 'legendBorderColor',
    toolTipbgColor: 'toolTipbgColor',
    toolTipBorderColor: 'toolTipBorderColor',
    baseFontColor: 'baseFontColor',
    anchorBgColor: 'anchorBgColor'
  },
  chart3D: {
    bgColor: 'bgColor3D',
    bgAlpha: 'bgAlpha3D',
    bgAngle: 'bgAngle3D',
    bgRatio: 'bgRatio3D',
    canvasBgColor: 'canvasBgColor3D',
    canvasBaseColor: canvasBaseColor3DStr,
    divLineColor: 'divLineColor3D',
    divLineAlpha: 'divLineAlpha3D',
    legendBgColor: 'legendBgColor3D',
    legendBorderColor: 'legendBorderColor3D',
    toolTipbgColor: 'toolTipbgColor3D',
    toolTipBorderColor: 'toolTipBorderColor3D',
    baseFontColor: 'baseFontColor3D',
    anchorBgColor: 'anchorBgColor3D'
  }
},
    hideFn = function hideFn() {
  this.hide();
},
    // for hiding cubepath
hide3dBaseFn = function hide3dBaseFn() {
  this.hide();

  this._.cubeside.hide();

  this._.cubetop.hide();
},
    // for showing cubepath
show3dBaseFn = function show3dBaseFn() {
  this.show();

  this._.cubeside.show();

  this._.cubetop.show();
};

(0, _dependencyManager.addDep)({
  name: 'canvas3dAnimation',
  type: 'animationRule',
  extension: _canvas3d.default
}); // Adding required shapes for chart.

(0, _redraphaelShapes.default)(R);
/**
 * Canvas is responsible for create the groups where the chart is going to render.
 * Canvas has also ability to add input buttons, all input components have to be added to
 * canvas to activate them. Ex. ZoomIn,ZoomOut etc Button in zoomscatter chart.
 * Before adding any input component to canvas it is required to attach axes to canvas,
 * so that input components can recognize what axis is zoomable or pannable.
 */

var Canvas3d = /*#__PURE__*/function (_Canvas) {
  (0, _inheritsLoose2.default)(Canvas3d, _Canvas);

  function Canvas3d() {
    return _Canvas.apply(this, arguments) || this;
  }

  var _proto = Canvas3d.prototype;

  /**
   * Sets the name of the component
   * @return {string} name
   */
  _proto.getName = function getName() {
    return 'canvas';
  }
  /**
   * Sets the type of the component
   * @return {string} type
   */
  ;

  _proto.getType = function getType() {
    return 'canvas';
  }
  /**
   * Draws canvas3d
   */
  ;

  _proto.drawCanvas = function drawCanvas() {
    if (this.getFromEnv('chart').isBar) {
      this.drawCanvas3dBar();
    } else {
      this.drawCanvas3dColumn();
    }
  };

  _proto.configureAttributes = function configureAttributes() {
    _Canvas.prototype.configureAttributes.call(this);

    this.config.xDepth = 10;
    this.config.yDepth = 10;
  }
  /**
   * Draws the 3d canvas for column
   */
  ;

  _proto.drawCanvas3dColumn = function drawCanvas3dColumn() {
    var canvas = this,
        chart = canvas.getFromEnv('chart'),
        jsonData = chart.getFromEnv('dataSource'),
        canvasConfig = canvas.config,
        chartConfig = chart.config,
        canvasLeft = canvasConfig.canvasLeft,
        canvasTop = canvasConfig.canvasTop,
        canvasWidth = canvasConfig.canvasWidth,
        canvasHeight = canvasConfig.canvasHeight,
        chartAttrs = jsonData.chart,
        animationManager = canvas.getFromEnv('animationManager'),
        colorM = chart.getFromEnv('color-manager'),
        canvasBorderElementCheck = canvas.getGraphicalElement('canvasBorderElement'),
        canvasBorderElement,
        canvasElement,
        canvasElementCheck = canvas.getGraphicalElement('canvasElement'),
        config = canvas.config,
        clip = config.clip = {},
        canvasGroup = canvas.getContainer('canvasGroup'),
        canvasBg,
        canvasBgCheck = canvas.getGraphicalElement('canvasBg'),
        canvas3DBase,
        canvas3DBaseCheck = canvas.getGraphicalElement('canvas3DBase'),
        path,
        attr,
        x,
        y,
        w,
        h,
        zw,
        zh,
        clipCanvas,
        dsGroup = chart.getChildContainer('plotGroup'),
        dataLabelsLayer = chart.getChildContainer('datalabelsGroup'),
        // animationObj = chart.get(configStr, animationObjStr),
    // animType = animationObj.animType,
    // animObj = animationObj.animObj,
    // dummyObj = animationObj.dummyObj,
    // animationDuration = animationObj.duration,
    canvas3dbaselineCheck = canvas.getGraphicalElement('canvas3dbaseline'),
        canvas3dbaseline,
        canvasBgColor = config.canvasBgColor,
        showCanvasBg = config.showCanvasBG = Boolean((0, _lib.pluckNumber)(chartAttrs.showcanvasbg, 1)),
        canvasBgDepth = chartConfig.canvasBgDepth,
        showCanvasBase = chartConfig.showCanvasBase,
        canvasBaseDepth = chartConfig.canvasBaseDepth,
        canvasBaseColor3D = config.canvasBaseColor3D = (0, _lib.pluck)(chartAttrs.canvasbasecolor, colorM.getColor(canvasBaseColor3DStr)),
        use3DLighting = config.use3DLighting = (0, _lib.pluckNumber)(chartAttrs.use3dlighting, 1),
        palleteString = chartPaletteStr.chart3D,
        canvasBorderRadius = config.canvasBorderRadius = (0, _lib.pluckNumber)(chartAttrs.plotborderradius, 0),
        canvasBorderWidth = 0,
        borderWHlf = canvasBorderWidth * 0.5,
        canvasBorderColor = config.canvasBorderColor = (0, _lib.convertColor)((0, _lib.pluck)(chartAttrs.canvasbordercolor, colorM.getColor(_lib.canvasBorderColorStr))),
        canBGAlpha = config.canBGAlpha = (0, _lib.pluck)(chartAttrs.canvasbgalpha, colorM.getColor(canvasBGAlphaStr)),
        canBGColor = config.canBGColor = (0, _lib.pluck)(chartAttrs.canvasbgcolor, colorM.getColor(palleteString.canvasBgColor)),
        xDepth,
        yDepth,
        // 2 px extra xDepth and yDepth in 3d chart's base
    canvasBasePadding = chartConfig.canvasBasePadding || 2;

    if (use3DLighting) {
      canvasBgColor = config.canvasBgColor = {
        FCcolor: {
          color: (0, _lib.getDarkColor)(canBGColor, 85) + _lib.COMMASTRING + (0, _lib.getLightColor)(canBGColor, 55),
          alpha: canBGAlpha + _lib.COMMASTRING + canBGAlpha,
          ratio: _lib.BGRATIOSTRING,
          angle: (0, _lib.getAngle)(chartConfig.width - (chartConfig.marginLeft + chartConfig.marginRight), chartConfig.height - (chartConfig.marginTop + chartConfig.marginBottom), 1)
        }
      };
    } else {
      canvasBgColor = config.canvasBgColor = (0, _lib.convertColor)(canBGColor, canBGAlpha);
    }

    canBGColor = canBGColor.split(_lib.COMMASTRING)[0];
    canBGAlpha = canBGAlpha.split(_lib.COMMASTRING)[0];
    xDepth = config.xDepth;
    yDepth = config.yDepth;
    attr = {
      x: canvasLeft - borderWHlf,
      y: canvasTop - borderWHlf,
      width: canvasWidth + canvasBorderWidth,
      height: canvasHeight + canvasBorderWidth,
      r: canvasBorderRadius,
      'stroke-width': canvasBorderWidth,
      stroke: canvasBorderColor,
      'stroke-linejoin': canvasBorderWidth > MAX_MITER_LINEJOIN ? ROUND : miterStr
    };
    canvasBorderElement = animationManager.setAnimation({
      el: canvasBorderElementCheck || 'rect',
      attr: attr,
      component: canvas,
      label: 'canvas',
      container: canvasGroup
    });

    if (!canvasBorderElementCheck) {
      canvas.addGraphicalElement('canvasBorderElement', canvasBorderElement);
    } // create a clip-rect to clip canvas for later use


    clip[clipCanvasStr] = [mathMax(0, canvasLeft - xDepth), mathMax(0, canvasTop), mathMax(1, canvasWidth + xDepth), mathMax(1, canvasHeight + yDepth)];
    clip[clipCanvasInitStr] = [mathMax(0, canvasLeft - xDepth), mathMax(0, canvasTop - yDepth), 1, mathMax(1, canvasHeight + yDepth * 2)];
    clipCanvas = clip[clipCanvasStr].slice(0);
    animationManager.setAnimation({
      el: dsGroup,
      attr: {
        'clip-rect': clipCanvas
      },
      component: canvas
    });
    animationManager.setAnimation({
      el: dataLabelsLayer,
      attr: {
        'clip-rect': clipCanvas
      },
      component: canvas
    });
    attr = {
      x: canvasLeft,
      y: canvasTop,
      width: canvasWidth,
      height: canvasHeight,
      r: canvasBorderRadius,
      'stroke-width': 0,
      'stroke': NONE,
      fill: (0, _lib.toRaphaelColor)(canvasBgColor)
    };
    canvasElement = animationManager.setAnimation({
      el: canvasElementCheck || 'rect',
      attr: attr,
      component: canvas,
      label: 'canvas',
      callback: showCanvasBg ? _lib.stubFN : hideFn,
      container: canvasGroup
    });

    if (!canvasElementCheck) {
      canvas.addGraphicalElement('canvasElement', canvasElement);
    }

    path = [M, canvasLeft + canvasWidth, canvasTop, L, canvasLeft + canvasWidth + canvasBgDepth, canvasTop + canvasBgDepth * 1.2, canvasLeft + canvasWidth + canvasBgDepth, canvasTop + canvasHeight - canvasBgDepth, canvasLeft + canvasWidth, canvasTop + canvasHeight, Z]; // Horizontal 3D Base

    canvasBg = animationManager.setAnimation({
      el: canvasBgCheck || 'path',
      attr: {
        'path': path,
        'stroke-width': 0,
        'stroke': NONE,
        fill: (0, _lib.toRaphaelColor)(canvasBgColor)
      },
      component: canvas,
      label: 'canvas',
      callback: showCanvasBg ? _lib.stubFN : hideFn,
      container: canvasGroup
    });

    if (!canvasBgCheck) {
      canvas.addGraphicalElement('canvasBg', canvasBg);
    }

    if (showCanvasBg) {
      canvasBg.show();
      canvasElement.show();
    } else {
      canvasBg.hide();
      canvasElement.hide();
    }

    x = canvasLeft - xDepth - canvasBasePadding;
    y = canvasTop + canvasHeight + yDepth + canvasBasePadding;
    w = canvasWidth;
    h = canvasBaseDepth;
    zw = xDepth + canvasBasePadding;
    zh = yDepth + canvasBasePadding; // if (!canvas3DBase) {

    canvas3DBase = animationManager.setAnimation({
      el: canvas3DBaseCheck || 'cubepath',
      component: canvas,
      index: 0,
      attr: {
        cubepath: [x, y, w, h, zw, zh],
        'stroke': NONE,
        'stroke-width': 0,
        'visibility': showCanvasBase ? 'visible' : 'hidden',
        'fill': canvasBaseColor3D.replace(_lib.dropHash, _lib.HASHSTRING),
        noGradient: !use3DLighting
      },
      callback: showCanvasBase ? _lib.stubFN : hide3dBaseFn,
      label: 'canvas',
      container: canvasGroup
    });

    if (!canvas3DBaseCheck) {
      canvas.addGraphicalElement('canvas3DBase', canvas3DBase);
    }

    canvas3dbaseline = animationManager.setAnimation({
      el: canvas3dbaselineCheck || 'path',
      attr: {
        'path': [M, canvasLeft, canvasTop + canvasHeight, H, canvasWidth + canvasLeft],
        stroke: R.tintshade(canvasBaseColor3D.replace(_lib.dropHash, _lib.HASHSTRING), 0.05).rgba
      },
      component: canvas,
      callback: showCanvasBase ? _lib.stubFN : hideFn,
      label: 'canvas',
      container: canvasGroup
    });

    if (!canvas3dbaselineCheck) {
      canvas.addGraphicalElement('canvas3dbaseline', canvas3dbaseline);
    }

    if (showCanvasBase) {
      show3dBaseFn.call(canvas3DBase);
      canvas3dbaseline.show();
    }
  }
  /**
   * Draws the 3d canvas for bar
   */
  ;

  _proto.drawCanvas3dBar = function drawCanvas3dBar() {
    var canvas = this,
        chart = canvas.getFromEnv('chart'),
        jsonData = chart.getFromEnv('dataSource'),
        chartConfig = chart.config,
        canvasLeft = chartConfig.canvasLeft,
        canvasTop = chartConfig.canvasTop,
        canvasWidth = chartConfig.canvasWidth,
        canvasHeight = chartConfig.canvasHeight,
        chartAttrs = jsonData.chart,
        colorM = chart.getFromEnv('color-manager'),
        canvasBorderElement,
        canvasBorderElementCheck = canvas.getGraphicalElement('canvasBorderElement'),
        canvasElementCheck = canvas.getGraphicalElement('canvasElement'),
        canvasElement,
        config = canvas.config,
        clip = config.clip = {},
        canvasGroup = canvas.getContainer('canvasGroup'),
        canvasBg,
        canvasBgCheck = canvas.getGraphicalElement('canvasBg'),
        canvas3DBase,
        canvas3DBaseCheck = canvas.getGraphicalElement('canvas3DBase'),
        attr,
        path,
        x,
        y,
        w,
        h,
        zw,
        zh,
        clipCanvas,
        dsGroup = chart.getChildContainer('plotGroup'),
        dataLabelsLayer = chart.getChildContainer('datalabelsGroup'),
        animationManager = canvas.getFromEnv('animationManager'),
        canvas3dbaseline,
        canvas3dbaselineCheck = canvas.getGraphicalElement('canvas3dbaseline'),
        canvasBgColor = config.canvasBgColor,
        showCanvasBg = config.showCanvasBG = Boolean((0, _lib.pluckNumber)(chartAttrs.showcanvasbg, 1)),
        canvasBgDepth = chartConfig.canvasBgDepth,
        showCanvasBase = chartConfig.showCanvasBase,
        canvasBaseDepth = chartConfig.canvasBaseDepth,
        canvasBaseColor3D = config.canvasBaseColor3D = (0, _lib.pluck)(chartAttrs.canvasbasecolor, colorM.getColor(canvasBaseColor3DStr)),
        use3DLighting = config.use3DLighting = (0, _lib.pluckNumber)(chartAttrs.use3dlighting, 1),
        palleteString = chartPaletteStr.chart3D,
        canvasBorderRadius = config.canvasBorderRadius = (0, _lib.pluckNumber)(chartAttrs.plotborderradius, 0),
        canvasBorderWidth = config.canvasBorderWidth = 0,
        borderWHlf = canvasBorderWidth * 0.5,
        canvasBorderColor = config.canvasBorderColor = (0, _lib.convertColor)((0, _lib.pluck)(chartAttrs.canvasbordercolor, colorM.getColor(_lib.canvasBorderColorStr))),
        canBGAlpha = config.canBGAlpha = (0, _lib.pluck)(chartAttrs.canvasbgalpha, colorM.getColor(canvasBGAlphaStr)),
        canBGColor = config.canBGColor = (0, _lib.pluck)(chartAttrs.canvasbgcolor, colorM.getColor(palleteString.canvasBgColor)),
        xDepth = config.xDepth,
        yDepth = config.yDepth;

    if (use3DLighting) {
      canvasBgColor = config.canvasBgColor = {
        FCcolor: {
          color: (0, _lib.getDarkColor)(canBGColor, 85) + COMMA + (0, _lib.getLightColor)(canBGColor, 55),
          alpha: canBGAlpha + COMMA + canBGAlpha,
          ratio: _lib.BGRATIOSTRING,
          angle: (0, _lib.getAngle)(chartConfig.width - (chartConfig.marginLeft + chartConfig.marginRight), chartConfig.height - (chartConfig.marginTop + chartConfig.marginBottom), 1)
        }
      };
    } else {
      canvasBgColor = config.canvasBgColor = (0, _lib.convertColor)(canBGColor, canBGAlpha);
    }

    canBGColor = canBGColor.split(COMMA)[0];
    canBGAlpha = canBGAlpha.split(COMMA)[0];
    xDepth = config.xDepth = 5;
    yDepth = config.yDepth = 5;
    attr = {
      x: canvasLeft - borderWHlf,
      y: canvasTop - borderWHlf,
      width: canvasWidth + canvasBorderWidth,
      height: canvasHeight + canvasBorderWidth,
      r: canvasBorderRadius,
      'stroke-width': canvasBorderWidth,
      stroke: canvasBorderColor,
      'stroke-linejoin': canvasBorderWidth > MAX_MITER_LINEJOIN ? ROUND : miterStr
    };
    canvasBorderElement = animationManager.setAnimation({
      el: canvasBorderElementCheck || 'rect',
      attr: attr,
      container: canvasGroup,
      label: 'canvas',
      component: canvas
    });

    if (!canvasBorderElementCheck) {
      canvas.addGraphicalElement('canvasBorderElement', canvasBorderElement);
    } // create a clip-rect to clip canvas for later use


    clip[clipCanvasStr] = [mathMax(0, canvasLeft - xDepth), mathMax(0, canvasTop), mathMax(1, canvasWidth + xDepth), mathMax(1, canvasHeight + yDepth)];
    clip[clipCanvasInitStr] = [mathMax(0, canvasLeft - xDepth), mathMax(0, canvasTop - yDepth), 1, mathMax(1, canvasHeight + yDepth * 2)];
    clipCanvas = clip[clipCanvasStr].slice(0);
    animationManager.setAnimation({
      el: dsGroup,
      attr: {
        'clip-rect': clipCanvas
      },
      component: canvas
    });
    animationManager.setAnimation({
      el: dataLabelsLayer,
      attr: {
        'clip-rect': clipCanvas
      },
      component: canvas
    });
    attr = {
      x: canvasLeft,
      y: canvasTop,
      width: canvasWidth,
      height: canvasHeight,
      r: canvasBorderRadius,
      'stroke-width': 0,
      'stroke': NONE,
      fill: (0, _lib.toRaphaelColor)(canvasBgColor)
    };
    canvasElement = animationManager.setAnimation({
      el: canvasElementCheck || 'rect',
      attr: attr,
      component: canvas,
      label: 'canvas',
      container: canvasGroup
    });

    if (!canvasElementCheck) {
      canvas.addGraphicalElement('canvasElement', canvasElement);
    } // Vertical 3D Base


    path = [M, canvasLeft, canvasTop, L, canvasLeft + canvasBgDepth * 1.2, canvasTop - canvasBgDepth, canvasLeft + canvasWidth - canvasBgDepth, canvasTop - canvasBgDepth, canvasLeft + canvasWidth, canvasTop, Z]; // if (!canvasBg) {

    canvasBg = animationManager.setAnimation({
      el: canvasBgCheck || 'path',
      attr: {
        'path': path,
        'stroke-width': 0,
        'stroke': NONE,
        fill: (0, _lib.toRaphaelColor)(canvasBgColor)
      },
      component: canvas,
      callback: showCanvasBg ? _lib.stubFN : hideFn,
      label: 'canvas',
      container: canvasGroup
    });

    if (!canvasBgCheck) {
      canvas.addGraphicalElement('canvasBg', canvasBg);
    } // Show canvas background if showCanvasBg is enabled


    if (showCanvasBg) {
      canvasElement.show();
      canvasBg.show();
    } else {
      canvasElement.hide();
      canvasBg.hide();
    }

    x = canvasLeft - xDepth - canvasBaseDepth - 1;
    y = canvasTop + yDepth + 1;
    w = canvasBaseDepth;
    h = canvasHeight;
    zw = xDepth + 1;
    zh = yDepth + 1;
    canvas3DBase = animationManager.setAnimation({
      el: canvas3DBaseCheck || 'cubepath',
      attr: {
        'cubepath': [x, y, w, h, zw, zh],
        'stroke': NONE,
        'stroke-width': 0,
        'visibility': CANVAS_BASE_DEFAULT_VISIBILITY,
        'fill': canvasBaseColor3D.replace(_lib.dropHash, _lib.HASHSTRING),
        noGradient: !use3DLighting
      },
      component: canvas,
      callback: showCanvasBase ? _lib.stubFN : hide3dBaseFn,
      label: 'canvas',
      container: canvasGroup
    });

    if (!canvas3DBaseCheck) {
      canvas.addGraphicalElement('canvas3DBase', canvas3DBase);
    }

    canvas3dbaseline = animationManager.setAnimation({
      el: canvas3dbaselineCheck || 'path',
      attr: {
        'path': [M, canvasLeft, canvasTop, V, canvasHeight + canvasTop],
        stroke: Raphael.tintshade(canvasBaseColor3D.replace(_lib.dropHash, _lib.HASHSTRING), 0.05).rgba
      },
      component: canvas,
      callback: showCanvasBase ? _lib.stubFN : hideFn,
      label: 'canvas',
      container: canvasGroup
    });

    if (!canvas3dbaselineCheck) {
      canvas.addGraphicalElement('canvas3dbaseline', canvas3dbaseline);
    } // Show canvas base if showCanvasBase is enabled


    if (showCanvasBase) {
      canvas3dbaseline.show();
      show3dBaseFn.call(canvas3DBase);
    }
  };

  return Canvas3d;
}(_canvas.default);

var _default = Canvas3d;
exports["default"] = _default;

/***/ }),

/***/ 744:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _msbarcartesian = _interopRequireDefault(__webpack_require__(625));

var _canvas3dAxisRefCartesian = _interopRequireDefault(__webpack_require__(604));

var _multiseries3dDataset = _interopRequireDefault(__webpack_require__(745));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */

/**
 * Creates class MSBarCartesian3D
 */
var MSBarCartesian3D = /*#__PURE__*/function (_MSBarCartesian) {
  (0, _inheritsLoose2.default)(MSBarCartesian3D, _MSBarCartesian);

  /**
   * constructor fn
   */
  function MSBarCartesian3D() {
    var _this;

    _this = _MSBarCartesian.call(this) || this;

    _this.registerFactory('canvas', _canvas3dAxisRefCartesian.default);

    _this.registerFactory('dataset', _multiseries3dDataset.default, ['vCanvas']);

    return _this;
  }
  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */


  MSBarCartesian3D.getName = function getName() {
    return 'MSBarCartesian3D';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  var _proto = MSBarCartesian3D.prototype;

  _proto.getName = function getName() {
    return 'MSBarCartesian3D';
  }
  /**
   * Parse the chart attributes and store in chart's config
   * @param {Object} dataObj User input json
   */
  ;

  _proto.parseChartAttr = function parseChartAttr(dataObj) {
    _MSBarCartesian.prototype.parseChartAttr.call(this, dataObj);

    this.config.drawTrendRegion = 0;
  }
  /**
   * parse defualt configuration of the chart
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSBarCartesian.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.is3D = true;
    config.showplotborder = 0;
    config.showzeroplaneontop = 0;
  };

  return MSBarCartesian3D;
}(_msbarcartesian.default);

var _default = MSBarCartesian3D;
exports["default"] = _default;

/***/ }),

/***/ 751:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _mscartesian = _interopRequireDefault(__webpack_require__(626));

var _canvas3dAxisRefCartesian = _interopRequireDefault(__webpack_require__(604));

var _multiseries3dDataset = _interopRequireDefault(__webpack_require__(745));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */

/**
 * Creates class for MSCartesian3D
 */
var MSCartesian3D = /*#__PURE__*/function (_MSCartesian) {
  (0, _inheritsLoose2.default)(MSCartesian3D, _MSCartesian);

  /**
   * constructor fn
   */
  function MSCartesian3D() {
    var _this;

    _this = _MSCartesian.call(this) || this;

    _this.registerFactory('canvas', _canvas3dAxisRefCartesian.default);

    _this.registerFactory('dataset', _multiseries3dDataset.default, ['vCanvas']);

    return _this;
  }
  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */


  MSCartesian3D.getName = function getName() {
    return 'MSCartesian3D';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  var _proto = MSCartesian3D.prototype;

  _proto.getName = function getName() {
    return 'MSCartesian3D';
  }
  /**
   * Parse the chart attributes and store in chart's config
   * @param {Object} dataObj User input json
   */
  ;

  _proto.parseChartAttr = function parseChartAttr(dataObj) {
    _MSCartesian.prototype.parseChartAttr.call(this, dataObj);

    this.config.drawTrendRegion = 0;
  }
  /**
   * Sets default configuration of chart elements
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSCartesian.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.is3D = true;
    config.showplotborder = 0;
    config.drawcrosslineontop = 0;
    config.showzeroplaneontop = 0;
  };

  return MSCartesian3D;
}(_mscartesian.default);

var _default = MSCartesian3D;
exports["default"] = _default;

/***/ }),

/***/ 758:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _msdybasecartesian = _interopRequireDefault(__webpack_require__(668));

var _canvas3dAxisRefCartesian = _interopRequireDefault(__webpack_require__(604));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */

/**
 * Creates class for MSDybaseCartesian3D
 */
var MSDybaseCartesian3D = /*#__PURE__*/function (_MSDyBaseCartesian) {
  (0, _inheritsLoose2.default)(MSDybaseCartesian3D, _MSDyBaseCartesian);

  /**
   * constructor fn
   */
  function MSDybaseCartesian3D() {
    var _this;

    _this = _MSDyBaseCartesian.call(this) || this;

    _this.registerFactory('canvas', _canvas3dAxisRefCartesian.default);

    return _this;
  }
  /**
   * Parse the chart attributes and store in chart's config
   * @param {Object} dataObj User input json
   */


  var _proto = MSDybaseCartesian3D.prototype;

  _proto.parseChartAttr = function parseChartAttr(dataObj) {
    _MSDyBaseCartesian.prototype.parseChartAttr.call(this, dataObj);

    this.config.drawTrendRegion = 0;
  }
  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  ;

  MSDybaseCartesian3D.getName = function getName() {
    return 'MSDybaseCartesian3D';
  }
  /**
   * Sets default configuration
   * @memberof MSDybaseCartesian3D
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSDyBaseCartesian.prototype.__setDefaultConfig.call(this);

    this.config.is3D = true;
    /*
      * This will change layer of zero plane
      * from 3 to 1.
    */

    this.config.showzeroplaneontop = 0;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  _proto.getName = function getName() {
    return 'MSDybaseCartesian3D';
  };

  return MSDybaseCartesian3D;
}(_msdybasecartesian.default);

var _default = MSDybaseCartesian3D;
exports["default"] = _default;

/***/ }),

/***/ 624:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _sscartesian = _interopRequireDefault(__webpack_require__(517));

var _msbarcartesian = __webpack_require__(625);

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */

/**
 * This class is base class for single series bar charts.
 */
var SSBarCartesian = /*#__PURE__*/function (_SSCartesian) {
  (0, _inheritsLoose2.default)(SSBarCartesian, _SSCartesian);

  function SSBarCartesian() {
    return _SSCartesian.apply(this, arguments) || this;
  }

  var _proto = SSBarCartesian.prototype;

  /**
   * Sets the name of the component
   * @return {string} name
   */
  _proto.getName = function getName() {
    return 'SSBarCartesian';
  }
  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  ;

  SSBarCartesian.getName = function getName() {
    return 'SSBarCartesian';
  }
  /**
   * This method parse all the attributes which are associated with axis compoenents.
   * So that axis compoenents can be configured
   * @return { Object } contains axes config
   */
  ;

  _proto._feedAxesRawData = function _feedAxesRawData() {
    return _msbarcartesian.__feedAxesRawData.call(this);
  }
  /**
   * This method first assigns the entire area of the chart to canvas. Then every component (for example toolbox,
   * caption etc) is asked to allocate its own space. Once every compoenent has had its space allocated, the canvas is
   * assigned the remaining space.
   */
  ;

  _proto._spaceManager = function _spaceManager() {
    _msbarcartesian.__spaceManager.call(this);
  }
  /**
   * This function is adjusting value padding depending upon data and axis labels and set dimention to axis
   */
  ;

  _proto._postSpaceManagement = function _postSpaceManagement() {
    _msbarcartesian.__postSpaceManagement.call(this);
  };

  return SSBarCartesian;
}(_sscartesian.default);

var _default = SSBarCartesian;
exports["default"] = _default;

/***/ }),

/***/ 644:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _sscartesian3d = _interopRequireDefault(__webpack_require__(603));

var _msbarcartesian = __webpack_require__(625);

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */

/**
 * Creates class for SSBarCartesian3D
 */
var SSBarCartesian3D = /*#__PURE__*/function (_SSCartesian3D) {
  (0, _inheritsLoose2.default)(SSBarCartesian3D, _SSCartesian3D);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  SSBarCartesian3D.getName = function getName() {
    return 'SSBarCartesian3D';
  }
  /**
   * Constructor function of SSBarCartesian3D class
   */
  ;

  function SSBarCartesian3D() {
    var _this;

    _this = _SSCartesian3D.call(this) || this;
    _this.__feedAxesRawData = _msbarcartesian.__feedAxesRawData;
    _this.__spaceManager = _msbarcartesian.__spaceManager;
    _this.__postSpaceManagement = _msbarcartesian.__postSpaceManagement; // this._createAxes = _createAxes;
    // this._feedAxesRawData = _feedAxesRawData;
    // this._spaceManager = _spaceManager;
    // this._postSpaceManagement = _postSpaceManagement;

    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = SSBarCartesian3D.prototype;

  _proto.getName = function getName() {
    return 'SSBarCartesian3D';
  }
  /**
   * This method parse all the attributes which are associated with axis compoenents.
   * So that axis compoenents can be configured.
   * @return {Object} configurations of axes
   */
  ;

  _proto._feedAxesRawData = function _feedAxesRawData() {
    return _msbarcartesian.__feedAxesRawData.call(this);
  }
  /**
   * This method first assigns the entire area of the chart to canvas. Then every component (for example toolbox,
   * caption etc) is asked to allocate its own space. Once every compoenent has had its space allocated, the canvas is
   * assigned the remaining space.
   */
  ;

  _proto._spaceManager = function _spaceManager() {
    _msbarcartesian.__spaceManager.call(this);
  }
  /**
   * This function is adjusting value padding depending upon data and axis labels and set dimention to axis
   */
  ;

  _proto._postSpaceManagement = function _postSpaceManagement() {
    _msbarcartesian.__postSpaceManagement.call(this);
  };

  return SSBarCartesian3D;
}(_sscartesian3d.default);

var _default = SSBarCartesian3D;
exports["default"] = _default;

/***/ }),

/***/ 603:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _sscartesian = _interopRequireDefault(__webpack_require__(517));

var _canvas3dAxisRefCartesian = _interopRequireDefault(__webpack_require__(604));

var _singleseries3dDataset = _interopRequireDefault(__webpack_require__(608));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */

/**
 * Creates class SSCartesian3D
 */
var SSCartesian3D = /*#__PURE__*/function (_SSCartesian) {
  (0, _inheritsLoose2.default)(SSCartesian3D, _SSCartesian);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  SSCartesian3D.getName = function getName() {
    return 'SSCartesian3D';
  }
  /**
   * Constructor function for SSCartesian3D class
   */
  ;

  function SSCartesian3D() {
    var _this;

    _this = _SSCartesian.call(this) || this;

    _this.registerFactory('canvas', _canvas3dAxisRefCartesian.default);

    _this.registerFactory('dataset', _singleseries3dDataset.default, ['vCanvas']);

    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = SSCartesian3D.prototype;

  _proto.getName = function getName() {
    return 'SSCartesian3D';
  }
  /**
   * parse defualt configuration of the chart
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _SSCartesian.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.is3D = true;
    config.hasLegend = false;
    config.showplotborder = 0;
    config.drawcrosslineontop = 0;
    config.showzeroplaneontop = 0;
  };

  return SSCartesian3D;
}(_sscartesian.default);

var _default = SSCartesian3D;
exports["default"] = _default;

/***/ }),

/***/ 621:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _sscartesian = _interopRequireDefault(__webpack_require__(517));

var _area = _interopRequireDefault(__webpack_require__(617));

var _lib = __webpack_require__(274);

var UNDEF,
    SEVENTYSTRING = _lib.preDefStr.SEVENTYSTRING,
    AREA_CHART = 'Area Chart',
    AREA_STR = 'area';

var Area2D = /*#__PURE__*/function (_SSCartesian) {
  (0, _inheritsLoose2.default)(Area2D, _SSCartesian);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  Area2D.getName = function getName() {
    return 'Area2D';
  };

  function Area2D() {
    var _this;

    _this = _SSCartesian.call(this) || this;
    _this.defaultPlotShadow = 0;
    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = Area2D.prototype;

  _proto.getName = function getName() {
    return 'Area2D';
  };

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _SSCartesian.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = AREA_CHART;
    config.singleseries = true;
    config.defaultDatasetType = AREA_STR;
    config.anchorborderthickness = 1;
    config.anchorimageurl = UNDEF;
    config.anchorimagepadding = 1;
    config.anchorsides = 1;
    config.anchoralpha = UNDEF;
    config.anchorbgalpha = _lib.HUNDREDSTRING;
    config.anchorimagealpha = _lib.HUNDREDSTRING;
    config.anchorimagescale = 100;
    config.anchorstartangle = 90;
    config.anchorshadow = 0;
    config.anchorbgcolor = UNDEF;
    config.anchorbordercolor = UNDEF;
    config.anchorradius = 3;
    config.showvalues = 1;
    config.plotfillalpha = SEVENTYSTRING;
    config.linedashlen = 5;
    config.linedashgap = 4;
    config.linedashed = UNDEF;
    config.linealpha = _lib.HUNDREDSTRING;
    config.linethickness = 2;
    config.drawfullareaborder = 1;
    config.inheritplotbordercolor = 0;
    config.connectnulldata = 0;
    config.enablemousetracking = true;
    config.defaultcrosslinethickness = 1;
  } // This method return the dataset definations for this charts
  ;

  _proto.getDSdef = function getDSdef() {
    return _area.default;
  } // // This method return the dataset-group definations for this charts
  // getDSGroupdef (name) {
  //   return UNDEF;
  // }
  ;

  return Area2D;
}(_sscartesian.default);

var _default = Area2D;
exports["default"] = _default;

/***/ }),

/***/ 623:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _ssbarcartesian = _interopRequireDefault(__webpack_require__(624));

var _bar2d = _interopRequireDefault(__webpack_require__(640));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var BAR_CHART = 'Bar Chart',
    BAR2D_STR = 'bar2d';
/**
 * chart API of the Bar2Dn chart
 */

var Bar2D = /*#__PURE__*/function (_SSBarCartesian) {
  (0, _inheritsLoose2.default)(Bar2D, _SSBarCartesian);

  /**
   * constructor fn
   */
  function Bar2D() {
    var _this;

    _this = _SSBarCartesian.call(this) || this;
    _this.isBar = true;
    return _this;
  }
  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */


  Bar2D.getName = function getName() {
    return 'Bar2D';
  }
  /**
   * Sets the type of the component
   * @return {string} type
   */
  ;

  var _proto = Bar2D.prototype;

  _proto.getType = function getType() {
    return 'chartAPI';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  _proto.getName = function getName() {
    return 'Bar2D';
  }
  /**
   * This set the default configuration for this chart
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _SSBarCartesian.prototype.__setDefaultConfig.call(this);

    this.config.friendlyName = BAR_CHART;
    this.config.singleseries = true;
    this.config.defaultDatasetType = BAR2D_STR;
    this.config.enablemousetracking = true;
  }
  /**
   * This method return the dataset definations for this charts
   * @return {class} bar2d dataset definitions
   */
  ;

  _proto.getDSdef = function getDSdef() {
    return _bar2d.default;
  }
  /**
   * This method return the dataset-group definations for this charts
   */
  ;

  _proto.getDSGroupdef = function getDSGroupdef() {// this fn overrides
  };

  return Bar2D;
}(_ssbarcartesian.default);

var _default = Bar2D;
exports["default"] = _default;

/***/ }),

/***/ 643:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _ssbarcartesian3d = _interopRequireDefault(__webpack_require__(644));

var _bar3d = _interopRequireDefault(__webpack_require__(645));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var BARCHART3D = '3D Bar Chart',
    BAR3D_STR = 'bar3d';
/**
 * Creates class for Bar3D
 */

var Bar3D = /*#__PURE__*/function (_SSBarCartesian3D) {
  (0, _inheritsLoose2.default)(Bar3D, _SSBarCartesian3D);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  Bar3D.getName = function getName() {
    return 'Bar3D';
  }
  /**
   * Constructor function for Bar3D class
   */
  ;

  function Bar3D() {
    var _this;

    _this = _SSBarCartesian3D.call(this) || this;
    _this.defaultPlotShadow = 1;
    _this.fireGroupEvent = true;
    _this.isBar = true;
    _this.defaultZeroPlaneHighlighted = false;
    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = Bar3D.prototype;

  _proto.getName = function getName() {
    return 'Bar3D';
  }
  /**
   * parse defualt configuration of the chart
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _SSBarCartesian3D.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.is3D = true;
    config.singleseries = true;
    config.friendlyName = BARCHART3D;
    config.defaultDatasetType = BAR3D_STR;
    config.showplotborder = 0;
    config.enablemousetracking = true;
  }
  /**
   * This method return the dataset definations for this charts
   * @return {Object} dataset class for bar2d
   */
  ;

  _proto.getDSdef = function getDSdef() {
    return _bar3d.default;
  };

  return Bar3D;
}(_ssbarcartesian3d.default);

var _default = Bar3D;
exports["default"] = _default;

/***/ }),

/***/ 717:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _scatter = _interopRequireDefault(__webpack_require__(718));

var _bubble = _interopRequireDefault(__webpack_require__(727));

var _bubble2 = _interopRequireDefault(__webpack_require__(729));

var BUBBLE_CHART = 'Bubble Chart';

var Bubble = /*#__PURE__*/function (_Scatter) {
  (0, _inheritsLoose2.default)(Bubble, _Scatter);

  function Bubble() {
    return _Scatter.apply(this, arguments) || this;
  }

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  Bubble.getName = function getName() {
    return 'Bubble';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  var _proto = Bubble.prototype;

  _proto.getName = function getName() {
    return 'Bubble';
  };

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _Scatter.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = BUBBLE_CHART;
    config.enablemousetracking = true;
  } // This method return the dataset definations for this charts
  ;

  _proto.getDSdef = function getDSdef() {
    return _bubble.default;
  };

  _proto.getDSGroupdef = function getDSGroupdef() {
    return _bubble2.default;
  };

  return Bubble;
}(_scatter.default);

var _default = Bubble;
exports["default"] = _default;

/***/ }),

/***/ 516:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _sscartesian = _interopRequireDefault(__webpack_require__(517));

var _column = _interopRequireDefault(__webpack_require__(595));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var COLUMN_CHART = 'Column Chart',
    COLUMN_STR = 'column';
/**
 * Class for single series column charts and who depend on this class
 * @type {class}
 */

var Column2D = /*#__PURE__*/function (_SSCartesian) {
  (0, _inheritsLoose2.default)(Column2D, _SSCartesian);

  function Column2D() {
    return _SSCartesian.apply(this, arguments) || this;
  }

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  Column2D.getName = function getName() {
    return 'Column2D';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  var _proto = Column2D.prototype;

  _proto.getName = function getName() {
    return 'Column2D';
  }
  /**
   * parse defualt configuration of the chart
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _SSCartesian.prototype.__setDefaultConfig.call(this);

    this.config.friendlyName = COLUMN_CHART;
    this.config.singleseries = true;
    this.config.defaultDatasetType = COLUMN_STR;
    this.config.enablemousetracking = true;
  }
  /**
   * This method return the dataset definations for this charts
   * @return {Object}       Column dataset definition
   */
  ;

  _proto.getDSdef = function getDSdef() {
    return _column.default;
  };

  return Column2D;
}(_sscartesian.default);

var _default = Column2D;
exports["default"] = _default;

/***/ }),

/***/ 602:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _sscartesian3d = _interopRequireDefault(__webpack_require__(603));

var _column3d = _interopRequireDefault(__webpack_require__(611));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var COLUMN3D_CHART = '3D Column Chart';
/**
 * Creates class Column3D
 */

var Column3D = /*#__PURE__*/function (_SSCartesian3D) {
  (0, _inheritsLoose2.default)(Column3D, _SSCartesian3D);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  Column3D.getName = function getName() {
    return 'Column3D';
  }
  /**
   * Constructor function of Column3D class
   */
  ;

  function Column3D() {
    var _this;

    _this = _SSCartesian3D.call(this) || this;
    _this.defaultPlotShadow = 1;
    _this.defaultZeroPlaneHighlighted = false;
    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = Column3D.prototype;

  _proto.getName = function getName() {
    return 'Column3D';
  }
  /**
   * parse defualt configuration of the chart
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _SSCartesian3D.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.is3D = true;
    config.hasLegend = false;
    config.singleseries = true;
    config.friendlyName = COLUMN3D_CHART;
    config.showplotborder = 0;
    config.enablemousetracking = true;
  }
  /**
   * This method return the dataset definations for this charts
   * @return {Object}       Column dataset definition
   */
  ;

  _proto.getDSdef = function getDSdef() {
    return _column3d.default;
  };

  return Column3D;
}(_sscartesian3d.default);

var _default = Column3D;
exports["default"] = _default;

/***/ }),

/***/ 661:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _pie2d = _interopRequireDefault(__webpack_require__(648));

var _doughnut2d = _interopRequireDefault(__webpack_require__(656));

var _lib = __webpack_require__(274);

// import CenterLabel from '../components/centerlabel';
var DOUGHNUT_CHART = 'Doughnut Chart',
    DOUGHNUT_STR = 'Doughnut2D';

var Doughnut2D = /*#__PURE__*/function (_Pie2D) {
  (0, _inheritsLoose2.default)(Doughnut2D, _Pie2D);

  function Doughnut2D() {
    return _Pie2D.apply(this, arguments) || this;
  }

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  Doughnut2D.getName = function getName() {
    return 'Doughnut2D';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  var _proto = Doughnut2D.prototype;

  _proto.getName = function getName() {
    return 'Doughnut2D';
  };

  _proto.configureAttributes = function configureAttributes(dataObj) {
    _Pie2D.prototype.configureAttributes.call(this, dataObj);

    var iapi = this,
        conf = iapi.config,
        chartAttrs = iapi.getFromEnv('chart-attrib'); // dataset = iapi.getChildren('dataset')[0],
    // centerLabel;

    conf.doughnutradius = (0, _lib.pluck)(chartAttrs.doughnutradius, '50%'); // if (!(centerLabel = iapi.getChildren('centerLabel'))) {
    //   centerLabel = iapi.attachChild(new CenterLabel(), 'centerLabel', false);
    //   iapi.addToEnv('centerLabel', centerLabel);
    //   centerLabel.setLinkedItem('dataset', dataset);
    // }
  };

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _Pie2D.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = DOUGHNUT_CHART;
    config.defaultDatasetType = DOUGHNUT_STR;
    config.singletonPlaceValue = false;
  };

  _proto.getDSdef = function getDSdef() {
    return _doughnut2d.default;
  };

  return Doughnut2D;
}(_pie2d.default);

var _default = Doughnut2D;
exports["default"] = _default;

/***/ }),

/***/ 663:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _pie3d = _interopRequireDefault(__webpack_require__(654));

var _doughnut3d = _interopRequireDefault(__webpack_require__(664));

var DOUGHTNUT3D_CHART = '3D Doughnut Chart',
    DOUGHNUT_STR = 'Doughnut3D';

var Doughnut3D = /*#__PURE__*/function (_Pie3D) {
  (0, _inheritsLoose2.default)(Doughnut3D, _Pie3D);

  function Doughnut3D() {
    return _Pie3D.apply(this, arguments) || this;
  }

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  Doughnut3D.getName = function getName() {
    return 'Doughnut3D';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  var _proto = Doughnut3D.prototype;

  _proto.getName = function getName() {
    return 'Doughnut3D';
  };

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _Pie3D.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = DOUGHTNUT3D_CHART;
    config.defaultDatasetType = DOUGHNUT_STR;
    config.singletonPlaceValue = false;
  };

  _proto.getDSdef = function getDSdef() {
    return _doughnut3d.default;
  };

  return Doughnut3D;
}(_pie3d.default);

var _default = Doughnut3D;
exports["default"] = _default;

/***/ }),

/***/ 615:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _sscartesian = _interopRequireDefault(__webpack_require__(517));

var _line = _interopRequireDefault(__webpack_require__(616));

var _lib = __webpack_require__(274);

var UNDEF,
    SEVENTYSTRING = _lib.preDefStr.SEVENTYSTRING,
    LINE_CHART = 'Line Chart',
    LINE_STR = 'line';

var Line = /*#__PURE__*/function (_SSCartesian) {
  (0, _inheritsLoose2.default)(Line, _SSCartesian);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  Line.getName = function getName() {
    return 'Line';
  };

  function Line() {
    var _this;

    _this = _SSCartesian.call(this) || this;
    _this.defaultPlotShadow = 1;
    _this.axisPaddingLeft = 0;
    _this.axisPaddingRight = 0;
    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = Line.prototype;

  _proto.getName = function getName() {
    return 'Line';
  };

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _SSCartesian.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = LINE_CHART;
    config.singleseries = true;
    config.defaultDatasetType = LINE_STR;
    config.anchorborderthickness = 1;
    config.anchorimageurl = UNDEF;
    config.anchorimagepadding = 1;
    config.anchorsides = 1;
    config.anchoralpha = UNDEF;
    config.anchorbgalpha = _lib.HUNDREDSTRING;
    config.anchorimagealpha = _lib.HUNDREDSTRING;
    config.anchorimagescale = 100;
    config.anchorstartangle = 90;
    config.anchorshadow = 0;
    config.anchorbgcolor = UNDEF;
    config.anchorbordercolor = UNDEF;
    config.anchorradius = 3;
    config.showvalues = 1;
    config.plotfillalpha = SEVENTYSTRING;
    config.linedashlen = 5;
    config.linedashgap = 4;
    config.linedashed = UNDEF;
    config.linealpha = _lib.HUNDREDSTRING;
    config.linethickness = 2;
    config.drawfullareaborder = 1;
    config.connectnulldata = 0;
    config.zeroplanethickness = 1;
    config.enablemousetracking = true;
    config.zeroplanealpha = 40;
    config.showzeroplaneontop = 0;
    config.defaultcrosslinethickness = 1;
  } // This method return the dataset definations for this charts
  ;

  _proto.getDSdef = function getDSdef() {
    return _line.default;
  } // // This method return the dataset-group definations for this charts
  // getDSGroupdef (name) {
  //   return UNDEF;
  // }
  ;

  return Line;
}(_sscartesian.default);

var _default = Line;
exports["default"] = _default;

/***/ }),

/***/ 775:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _mscartesian = _interopRequireDefault(__webpack_require__(626));

var _marimekko = _interopRequireDefault(__webpack_require__(776));

var _marimekkoStack = _interopRequireDefault(__webpack_require__(778));

var _multiseriesDataset = _interopRequireDefault(__webpack_require__(628));

var _lib = __webpack_require__(274);

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var MARIMEKKO_CHART = 'Marimekko Chart',
    MARIMEKKO_STR = 'marimekko';
/**
 * class for Marimekko chartAPI
 */

var Marimekko = /*#__PURE__*/function (_MSCartesian) {
  (0, _inheritsLoose2.default)(Marimekko, _MSCartesian);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  Marimekko.getName = function getName() {
    return 'Marimekko';
  }
  /**
   * function to check if the chart specific data is proper is not
   * this fn is define for specific chart types
   * @return {boolean} if JSON data is valid or not
   */
  ;

  var _proto = Marimekko.prototype;

  _proto._checkInvalidSpecificData = function _checkInvalidSpecificData() {
    var jsonData = this.getFromEnv('dataSource'),
        datasetsJSON = jsonData.dataset,
        categories = jsonData.categories;

    if (!datasetsJSON || !categories || categories.length === 0 || !categories[0].category || !(categories[0].category instanceof Array)) {
      return true;
    }
  }
  /**
   * Constructor funtion for Marimekko chartAPI
   */
  ;

  function Marimekko() {
    var _this;

    _this = _MSCartesian.call(this) || this;
    _this.isValueAbs = true;
    _this.distributedColumns = true;
    _this.stack100percent = true;
    _this.isStacked = true;

    _this.registerFactory('dataset', function (chart) {
      (0, _multiseriesDataset.default)(chart);
      var children = chart.getChildren(),
          canvas = children.canvas[0],
          vCanvas = canvas.getChildren('vCanvas')[0],
          dsType = chart.config.defaultDatasetType || '',
          manager = vCanvas.getChildren('datasetGroup_' + dsType)[0];
      manager.addToEnv('categories', chart.getFromEnv('dataSource').categories);
    }, ['vCanvas']);

    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  _proto.getName = function getName() {
    return 'Marimekko';
  }
  /**
   * Parse the chart attributes and store in chart's config
   * @param {Object} dataObj User input json
   */
  ;

  _proto.parseChartAttr = function parseChartAttr(dataObj) {
    _MSCartesian.prototype.parseChartAttr.call(this, dataObj);

    this.config.showXAxisPercentValues = (0, _lib.pluckNumber)(dataObj.chart && dataObj.chart.showxaxispercentvalues, 1);
  }
  /**
   * Set default chart configuration
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSCartesian.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = MARIMEKKO_CHART;
    config.defaultDatasetType = MARIMEKKO_STR;
    config.isstacked = true;
    config.showpercentvalues = 0;
    config.usepercentdistribution = 1;
    config.showSum = 1;
    config.enablemousetracking = true;
  }
  /**
   * This method return the dataset definations for this charts
   * @return {Object} Column dataset definition
   */
  ;

  _proto.getDSdef = function getDSdef() {
    return _marimekko.default;
  }
  /**
   * This method return the dataset-group definations for this charts
   * @return {Object} Multiseries column group definition
   */
  ;

  _proto.getDSGroupdef = function getDSGroupdef() {
    return _marimekkoStack.default;
  };

  return Marimekko;
}(_mscartesian.default);

var _default = Marimekko;
exports["default"] = _default;

/***/ }),

/***/ 734:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _msbarcartesian = _interopRequireDefault(__webpack_require__(625));

var _bar2d = _interopRequireDefault(__webpack_require__(640));

var _columnMultiseries = _interopRequireDefault(__webpack_require__(689));

var _multiseriesDataset = _interopRequireDefault(__webpack_require__(628));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var MS_BAR_CHART = 'Multi-series Bar Chart',
    BAR2D_STR = 'bar2d';
/**
 * Class for MSBar2d chart
 * @class MSBar2D
 * @extends {MSBarCartesian}
 */

var MSBar2D = /*#__PURE__*/function (_MSBarCartesian) {
  (0, _inheritsLoose2.default)(MSBar2D, _MSBarCartesian);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  MSBar2D.getName = function getName() {
    return 'MSBar2D';
  }
  /**
   * Creates an instance of MSBar2D.
   * @memberof MSBar2D
   */
  ;

  function MSBar2D() {
    var _this;

    _this = _MSBarCartesian.call(this) || this;
    _this.isBar = true;

    _this.registerFactory('dataset', _multiseriesDataset.default, ['vCanvas']);

    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = MSBar2D.prototype;

  _proto.getName = function getName() {
    return 'MSBar2D';
  }
  /**
   * This method return the dataset definations for this charts
   * @return {Object} dataset
   */
  ;

  _proto.getDSdef = function getDSdef() {
    return _bar2d.default;
  }
  /** This method return the dataset-group definations for this charts
    * @return {Object} dataset group **/
  ;

  _proto.getDSGroupdef = function getDSGroupdef() {
    return _columnMultiseries.default;
  }
  /**
   * Function to create dataset of MSBar2D chart.
   * @memberof MSBar2D
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSBarCartesian.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = MS_BAR_CHART;
    config.hasLegend = true;
    config.defaultDatasetType = BAR2D_STR;
  };

  return MSBar2D;
}(_msbarcartesian.default);

var _default = MSBar2D;
exports["default"] = _default;

/***/ }),

/***/ 743:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _msbarcartesian3d = _interopRequireDefault(__webpack_require__(744));

var _columnMultiseries = _interopRequireDefault(__webpack_require__(689));

var _bar3d = _interopRequireDefault(__webpack_require__(645));

var _multiseries3dDataset = _interopRequireDefault(__webpack_require__(745));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var MS_BAR3D_CHART = 'Multi-series 3D Bar Chart',
    BAR3D_STR = 'bar3d';
/**
 * Creates class MSBar3D
 */

var MSBar3D = /*#__PURE__*/function (_MSBarCartesian3D) {
  (0, _inheritsLoose2.default)(MSBar3D, _MSBarCartesian3D);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  MSBar3D.getName = function getName() {
    return 'MSBar3D';
  }
  /**
   * Constructor function for MSBar3D
   */
  ;

  function MSBar3D() {
    var _this;

    _this = _MSBarCartesian3D.call(this) || this;
    _this.defaultSeriesType = BAR3D_STR; // this.fireGroupEvent = true;

    _this.defaultPlotShadow = 1;
    _this.isBar = true;
    _this.defaultZeroPlaneHighlighted = false;

    _this.registerFactory('dataset', _multiseries3dDataset.default, ['vCanvas']);

    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = MSBar3D.prototype;

  _proto.getName = function getName() {
    return 'MSBar3D';
  }
  /**
   * parse defualt configuration of the chart
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSBarCartesian3D.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.is3D = true;
    config.friendlyName = MS_BAR3D_CHART;
    config.hasLegend = true;
    config.defaultDatasetType = BAR3D_STR;
    config.showplotborder = 0;
    config.enablemousetracking = true;
  }
  /**
   * This method return the dataset definations for this charts
   * @return {Object}       Column dataset definition
   */
  ;

  _proto.getDSdef = function getDSdef() {
    return _bar3d.default;
  }
  /**
   * This method return the dataset-group definations for this charts
   * @return {Object}       Multiseries column group definition
   */
  ;

  _proto.getDSGroupdef = function getDSGroupdef() {
    return _columnMultiseries.default;
  };

  return MSBar3D;
}(_msbarcartesian3d.default);

var _default = MSBar3D;
exports["default"] = _default;

/***/ }),

/***/ 750:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _mscartesian3d = _interopRequireDefault(__webpack_require__(751));

var _column3d = _interopRequireDefault(__webpack_require__(611));

var _columnMultiseries = _interopRequireDefault(__webpack_require__(689));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var MS_COLUMN3D_CHART = 'Multi-series 3D Column Chart',
    COLUMN3D_STR = 'column3d';
/**
 * Creates class MSColumn3D
 */

var MSColumn3D = /*#__PURE__*/function (_MSCartesian3D) {
  (0, _inheritsLoose2.default)(MSColumn3D, _MSCartesian3D);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  MSColumn3D.getName = function getName() {
    return 'MSColumn3D';
  }
  /**
   * Constructor function for class MSColumn3D
   */
  ;

  function MSColumn3D() {
    var _this;

    _this = _MSCartesian3D.call(this) || this; // Default shadow is visible for 3D variant of MSColumn2D chart

    _this.defaultPlotShadow = 1; //  this.fireGroupEvent = true;

    _this.defaultZeroPlaneHighlighted = false;
    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = MSColumn3D.prototype;

  _proto.getName = function getName() {
    return 'MSColumn3D';
  }
  /**
   * parse defualt configuration of the chart
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSCartesian3D.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.is3D = true;
    config.friendlyName = MS_COLUMN3D_CHART;
    config.defaultDatasetType = COLUMN3D_STR;
    config.showplotborder = 0;
    config.enablemousetracking = true;
  }
  /**
   * This method return the dataset definations for this charts
   * @return {Object}       Column dataset definition
   */
  ;

  _proto.getDSdef = function getDSdef() {
    return _column3d.default;
  }
  /**
   * This method return the dataset-group definations for this charts
   * @return {Object}       Multiseries column group definition
   */
  ;

  _proto.getDSGroupdef = function getDSGroupdef() {
    return _columnMultiseries.default;
  };

  return MSColumn3D;
}(_mscartesian3d.default);

var _default = MSColumn3D;
exports["default"] = _default;

/***/ }),

/***/ 757:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _msdybasecartesian3d = _interopRequireDefault(__webpack_require__(758));

var _column3d = _interopRequireDefault(__webpack_require__(611));

var _line = _interopRequireDefault(__webpack_require__(616));

var _columnMultiseries = _interopRequireDefault(__webpack_require__(689));

var _combiDualY3dDataset = _interopRequireDefault(__webpack_require__(759));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var UNDEFINED,
    HUNDREDSTRING = '100',
    SEVENTYSTRING = '70',
    MS_3D_COLUMN_LINE_CHART = 'Multi-series 3D Column and Line Chart',
    LINE_STR = 'line',
    COLUMN3D_STR = 'column3d';
/**
 * Creates class for MSColumn3DLineDy
 */

var MSColumn3DLineDy = /*#__PURE__*/function (_MSDybaseCartesian3D) {
  (0, _inheritsLoose2.default)(MSColumn3DLineDy, _MSDybaseCartesian3D);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  MSColumn3DLineDy.getName = function getName() {
    return 'MSColumn3DLineDy';
  }
  /**
   * Constructor function of MSColumn3DLineDy class
   */
  ;

  function MSColumn3DLineDy() {
    var _this;

    _this = _MSDybaseCartesian3D.call(this) || this;
    _this.defaultPlotShadow = 1;
    _this.isDual = true;

    _this.registerFactory('dataset', _combiDualY3dDataset.default, ['vCanvas']);

    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = MSColumn3DLineDy.prototype;

  _proto.getName = function getName() {
    return 'MSColumn3DLineDy';
  }
  /**
   * Sets default configuration of chart elements
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSDybaseCartesian3D.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.is3D = true;
    config.sDefaultDatasetType = LINE_STR;
    config.friendlyName = MS_3D_COLUMN_LINE_CHART;
    config.defaultDatasetType = COLUMN3D_STR;
    config.use3dlineshift = 1;
    config.isdual = true;
    config.showplotborder = 0;
    config.enablemousetracking = true;
    config.anchorborderthickness = 1;
    config.anchorimageurl = UNDEFINED;
    config.anchorimagepadding = 1;
    config.anchorsides = 1;
    config.anchoralpha = UNDEFINED;
    config.anchorbgalpha = HUNDREDSTRING;
    config.anchorimagealpha = HUNDREDSTRING;
    config.anchorimagescale = 100;
    config.anchorstartangle = 90;
    config.anchorshadow = 0;
    config.anchorbgcolor = UNDEFINED;
    config.anchorbordercolor = UNDEFINED;
    config.anchorradius = 3;
    config.showvalues = 1;
    config.plotfillalpha = SEVENTYSTRING;
    config.linedashlen = 5;
    config.linedashgap = 4;
    config.linedashed = UNDEFINED;
    config.linealpha = HUNDREDSTRING;
    config.linethickness = 2;
    config.drawfullareaborder = 1;
    config.connectnulldata = 0;
  }
  /**
   * This method return the dataset definations for this charts
   * @param  {string} name type of dataset class
   * @return {Object}      dataset class
   */
  ;

  _proto.getDSdef = function getDSdef(name) {
    return name === 'line' ? _line.default : _column3d.default;
  }
  /**
   * This method return the dataset-group definations for this charts
   * @param  {string} name is type of dataset group
   * @return {Object} <dataset group class>     dataset group class
   */
  ;

  _proto.getDSGroupdef = function getDSGroupdef(name) {
    return name === 'column3d' ? _columnMultiseries.default : UNDEFINED;
  }
  /**
   * function to return dataset type applicable for this chart
   * @param   {string}  name            dataset type
   * @param   {boolean} secondaryAxis   dataset type for secondary axis
   * @return  {string}                  dataset type applicable for this chart
   */
  ;

  _proto.getDSType = function getDSType(name, secondaryAxis) {
    return name && name.toLowerCase() === 'line' || secondaryAxis ? 'line' : 'column3d';
  };

  return MSColumn3DLineDy;
}(_msdybasecartesian3d.default);

var _default = MSColumn3DLineDy;
exports["default"] = _default;

/***/ }),

/***/ 771:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _mscombi3d = _interopRequireDefault(__webpack_require__(766));

var _column3d = _interopRequireDefault(__webpack_require__(611));

var _line = _interopRequireDefault(__webpack_require__(616));

var _columnMultiseries = _interopRequireDefault(__webpack_require__(689));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var MS_COLUMN_LINE_CHART = 'Multi-series Column and Line Chart';
/**
 * Creates class MSColumnLine3D
 */

var UNDEF;

var MSColumnLine3D = /*#__PURE__*/function (_MSCombi3D) {
  (0, _inheritsLoose2.default)(MSColumnLine3D, _MSCombi3D);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  MSColumnLine3D.getName = function getName() {
    return 'MSColumnLine3D';
  }
  /**
   * Creates constructor function for MSColumnLine3D class
   */
  ;

  function MSColumnLine3D() {
    var _this;

    _this = _MSCombi3D.call(this) || this;
    _this.defaultPlotShadow = 1;
    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = MSColumnLine3D.prototype;

  _proto.getName = function getName() {
    return 'MSColumnLine3D';
  }
  /**
   * Sets default configuration of chart elements
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSCombi3D.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.is3D = true;
    config.friendlyName = MS_COLUMN_LINE_CHART;
    config.use3dlineshift = 1;
    config.showplotborder = 0;
    config.enablemousetracking = true;
  }
  /**
   * This method return the dataset definations for this charts
   * @param  {string} name type of dataset class
   * @return {Object}      dataset class
   */
  ;

  _proto.getDSdef = function getDSdef(name) {
    return name === 'line' ? _line.default : _column3d.default;
  }
  /**
   * This method return the dataset-group definations for this charts
   * @param  {string} name is type of dataset group
   * @return {Object} <dataset group class>     dataset group class
   */
  ;

  _proto.getDSGroupdef = function getDSGroupdef(name) {
    return name === 'column3d' ? _columnMultiseries.default : UNDEF;
  }
  /**
   * function to return dataset type applicable for this chart
   * @param   {string}  name  dataset type
   * @return  {string}        dataset type applicable for this chart
   */
  ;

  _proto.getDSType = function getDSType(name) {
    return name && name.toLowerCase() === 'line' ? 'line' : 'column3d';
  };

  return MSColumnLine3D;
}(_mscombi3d.default);

var _default = MSColumnLine3D;
exports["default"] = _default;

/***/ }),

/***/ 769:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _areabase = _interopRequireDefault(__webpack_require__(740));

var _column = _interopRequireDefault(__webpack_require__(595));

var _area = _interopRequireDefault(__webpack_require__(617));

var _line = _interopRequireDefault(__webpack_require__(616));

var _mssplinearea = _interopRequireDefault(__webpack_require__(683));

var _msspline = _interopRequireDefault(__webpack_require__(687));

var _columnMultiseries = _interopRequireDefault(__webpack_require__(689));

var _combiDualYDataset = _interopRequireDefault(__webpack_require__(670));

var UNDEFINED,
    MS_COMBINATION_CHART = 'Multi-series Combination Chart',
    COLUMN_STR = 'column';

var MSCombi2D = /*#__PURE__*/function (_AreaBase) {
  (0, _inheritsLoose2.default)(MSCombi2D, _AreaBase);

  /**
   * constructor fn
   */
  function MSCombi2D() {
    var _this;

    _this = _AreaBase.call(this) || this;

    _this.registerFactory('dataset', _combiDualYDataset.default, ['vCanvas']);

    return _this;
  }
  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */


  MSCombi2D.getName = function getName() {
    return 'MSCombi2D';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  var _proto = MSCombi2D.prototype;

  _proto.getName = function getName() {
    return 'MSCombi2D';
  };

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _AreaBase.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = MS_COMBINATION_CHART;
    config.defaultDatasetType = COLUMN_STR;
    config.enablemousetracking = true;
    config.showzeroplaneontop = 0;
  }
  /**
   * This method return the dataset definations for this charts
   * @param  {string} name type of dataset class
   * @return {Object}      dataset class
   */
  ;

  _proto.getDSdef = function getDSdef(name) {
    if (name === 'splinearea') {
      return _mssplinearea.default;
    } else if (name === 'spline') {
      return _msspline.default;
    } else if (name === 'area') {
      return _area.default;
    } else if (name === 'line') {
      return _line.default;
    }

    return _column.default;
  }
  /**
   * This method return the dataset-group definations for this charts
   * @param  {string} name is type of dataset group
   * @return {Object} <dataset group class>     dataset group class
   */
  ;

  _proto.getDSGroupdef = function getDSGroupdef(name) {
    return name === 'column' ? _columnMultiseries.default : UNDEFINED;
  }
  /**
   * function to return dataset type applicable for this chart
   * @param   {string}  name  dataset type
   * @return  {string}        dataset type applicable for this chart
   */
  ;

  _proto.getDSType = function getDSType(name) {
    if (name === void 0) {
      name = '';
    }

    if (name.toLowerCase() === 'splinearea') {
      return 'splinearea';
    } else if (name.toLowerCase() === 'spline') {
      return 'spline';
    } else if (name.toLowerCase() === 'area') {
      return 'area';
    } else if (name.toLowerCase() === 'line') {
      return 'line';
    }

    return 'column';
  };

  return MSCombi2D;
}(_areabase.default);

var _default = MSCombi2D;
exports["default"] = _default;

/***/ }),

/***/ 766:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _mscartesian3d = _interopRequireDefault(__webpack_require__(751));

var _column3d = _interopRequireDefault(__webpack_require__(611));

var _mssplinearea = _interopRequireDefault(__webpack_require__(683));

var _msspline = _interopRequireDefault(__webpack_require__(687));

var _area = _interopRequireDefault(__webpack_require__(617));

var _line = _interopRequireDefault(__webpack_require__(616));

var _columnMultiseries = _interopRequireDefault(__webpack_require__(689));

var _combiDualY3dDataset = _interopRequireDefault(__webpack_require__(759));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var UNDEFINED,
    HUNDREDSTRING = '100',
    SEVENTYSTRING = '70',
    MS_3D_COMBI_CHART = 'Multi-series 3D Combination Chart',
    COLUMN3D_STR = 'column3d';
/**
 * Class to render mscombi3d chart
 * @class MSCombi3D
 * @extends {MSCartesian3D}
 */

var MSCombi3D = /*#__PURE__*/function (_MSCartesian3D) {
  (0, _inheritsLoose2.default)(MSCombi3D, _MSCartesian3D);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  MSCombi3D.getName = function getName() {
    return 'MSCombi3D';
  }
  /**
   * Creates an instance of MSCombi3D.
   * @memberof MSCombi3D
   */
  ;

  function MSCombi3D() {
    var _this;

    _this = _MSCartesian3D.call(this) || this;
    _this.defaultPlotShadow = 1;

    _this.registerFactory('dataset', _combiDualY3dDataset.default, ['vCanvas']);

    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = MSCombi3D.prototype;

  _proto.getName = function getName() {
    return 'MSCombi3D';
  }
  /**
   * Sets default configuration of chart elements
   * @memberof MSCombi3D
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSCartesian3D.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.is3D = true;
    config.friendlyName = MS_3D_COMBI_CHART;
    config.defaultDatasetType = COLUMN3D_STR;
    config.showplotborder = 0;
    config.enablemousetracking = true;
    config.anchorborderthickness = 1;
    config.anchorimageurl = UNDEFINED;
    config.anchorimagepadding = 1;
    config.anchorsides = 1;
    config.anchoralpha = UNDEFINED;
    config.anchorbgalpha = HUNDREDSTRING;
    config.anchorimagealpha = HUNDREDSTRING;
    config.anchorimagescale = 100;
    config.anchorstartangle = 90;
    config.anchorshadow = 0;
    config.anchorbgcolor = UNDEFINED;
    config.anchorbordercolor = UNDEFINED;
    config.anchorradius = 3;
    config.showvalues = 1;
    config.plotfillalpha = SEVENTYSTRING;
    config.linedashlen = 5;
    config.linedashgap = 4;
    config.linedashed = UNDEFINED;
    config.linealpha = HUNDREDSTRING;
    config.linethickness = 2;
    config.drawfullareaborder = 1;
    config.connectnulldata = 0;
  }
  /**
   * This method return the dataset definations for this charts
   * @param  {string} name type of dataset class
   * @return {Object}      dataset class
   */
  ;

  _proto.getDSdef = function getDSdef(name) {
    if (name === 'splinearea') {
      return _mssplinearea.default;
    } else if (name === 'spline') {
      return _msspline.default;
    } else if (name === 'area') {
      return _area.default;
    } else if (name === 'line') {
      return _line.default;
    }

    return _column3d.default;
  }
  /**
   * This method return the dataset-group definations for this charts
   * @param  {string} name is type of dataset group
   * @return {Object} <dataset group class>     dataset group class
   */
  ;

  _proto.getDSGroupdef = function getDSGroupdef(name) {
    return name === 'column3d' ? _columnMultiseries.default : UNDEFINED;
  }
  /**
   * function to return dataset type applicable for this chart
   * @param   {string}  name  dataset type
   * @return  {string}        dataset type applicable for this chart
   */
  ;

  _proto.getDSType = function getDSType(name) {
    if (name === void 0) {
      name = '';
    }

    if (name.toLowerCase() === 'area') {
      return 'area';
    } else if (name.toLowerCase() === 'line') {
      return 'line';
    } else if (name.toLowerCase() === 'spline') {
      return 'spline';
    } else if (name.toLowerCase() === 'splinearea') {
      return 'splinearea';
    }

    return 'column3d';
  };

  return MSCombi3D;
}(_mscartesian3d.default);

var _default = MSCombi3D;
exports["default"] = _default;

/***/ }),

/***/ 682:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _msdybasecartesian = _interopRequireDefault(__webpack_require__(668));

var _column = _interopRequireDefault(__webpack_require__(595));

var _area = _interopRequireDefault(__webpack_require__(617));

var _line = _interopRequireDefault(__webpack_require__(616));

var _mssplinearea = _interopRequireDefault(__webpack_require__(683));

var _msspline = _interopRequireDefault(__webpack_require__(687));

var _columnMultiseries = _interopRequireDefault(__webpack_require__(689));

var _lib = __webpack_require__(274);

var _combiDualYDataset = _interopRequireDefault(__webpack_require__(670));

var UNDEF,
    SEVENTYSTRING = _lib.preDefStr.SEVENTYSTRING,
    MS_DUAL_Y_COMBI_CHART = 'Multi-series Dual Y-Axis Combination Chart',
    LINE_STR = 'line',
    COLUMN_STR = 'column';

var MSCombidy2D = /*#__PURE__*/function (_MSDyBaseCartesian) {
  (0, _inheritsLoose2.default)(MSCombidy2D, _MSDyBaseCartesian);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  MSCombidy2D.getName = function getName() {
    return 'MSCombidy2D';
  };

  function MSCombidy2D() {
    var _this;

    _this = _MSDyBaseCartesian.call(this) || this;
    _this.isDual = true;

    _this.registerFactory('dataset', _combiDualYDataset.default, ['vCanvas']);

    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = MSCombidy2D.prototype;

  _proto.getName = function getName() {
    return 'MSCombidy2D';
  };

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSDyBaseCartesian.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = MS_DUAL_Y_COMBI_CHART;
    config.sDefaultDatasetType = LINE_STR;
    config.defaultDatasetType = COLUMN_STR;
    config.enablemousetracking = true;
    config.isdual = 1; // Area default configurations

    config.anchorborderthickness = 1;
    config.anchorimageurl = UNDEF;
    config.anchorimagepadding = 1;
    config.anchorsides = 1;
    config.anchoralpha = UNDEF;
    config.anchorbgalpha = _lib.HUNDREDSTRING;
    config.anchorimagealpha = _lib.HUNDREDSTRING;
    config.anchorimagescale = 100;
    config.anchorstartangle = 90;
    config.anchorshadow = 0;
    config.anchorbgcolor = UNDEF;
    config.anchorbordercolor = UNDEF;
    config.anchorradius = 3;
    config.showvalues = 1;
    config.plotfillalpha = SEVENTYSTRING;
    config.linedashlen = 5;
    config.linedashgap = 4;
    config.linedashed = UNDEF;
    config.linealpha = _lib.HUNDREDSTRING;
    config.linethickness = 2;
    config.drawfullareaborder = 1;
    config.connectnulldata = 0;
    config.showzeroplaneontop = 0;
  }
  /**
   * This method return the dataset definations for this charts
   * @param  {string} name type of dataset class
   * @return {class}      class of dataset
   */
  ;

  _proto.getDSdef = function getDSdef(name) {
    if (name === 'splinearea') {
      return _mssplinearea.default;
    } else if (name === 'spline') {
      return _msspline.default;
    } else if (name === 'area') {
      return _area.default;
    } else if (name === 'line') {
      return _line.default;
    }

    return _column.default;
  }
  /**
   * This method return the dataset group definations for this charts
   * @param  {string} name type of dataset group class
   * @return {class}      class of dataset group
   */
  ;

  _proto.getDSGroupdef = function getDSGroupdef(name) {
    return name === 'column' ? _columnMultiseries.default : UNDEF;
  }
  /**
   * function to return dataset type applicable for this chart
   * @param   {string}  name  dataset type
   * @return  {string}        dataset type applicable for this chart
   */
  ;

  _proto.getDSType = function getDSType(name) {
    if (name === void 0) {
      name = '';
    }

    if (name.toLowerCase() === 'splinearea') {
      return 'splinearea';
    } else if (name.toLowerCase() === 'spline') {
      return 'spline';
    } else if (name.toLowerCase() === 'area') {
      return 'area';
    } else if (name.toLowerCase() === 'line') {
      return 'line';
    }

    return 'column';
  };

  return MSCombidy2D;
}(_msdybasecartesian.default);

var _default = MSCombidy2D;
exports["default"] = _default;

/***/ }),

/***/ 763:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _msdybasecartesian3d = _interopRequireDefault(__webpack_require__(758));

var _column3d = _interopRequireDefault(__webpack_require__(611));

var _area = _interopRequireDefault(__webpack_require__(617));

var _line = _interopRequireDefault(__webpack_require__(616));

var _mssplinearea = _interopRequireDefault(__webpack_require__(683));

var _msspline = _interopRequireDefault(__webpack_require__(687));

var _columnMultiseries = _interopRequireDefault(__webpack_require__(689));

var _lib = __webpack_require__(274);

var _combiDualY3dDataset = _interopRequireDefault(__webpack_require__(759));

// Parent class that imposes component flow
// Dataset imports
// utility imports
var UNDEF,
    HUNDREDSTRING = _lib.preDefStr.HUNDREDSTRING,
    SEVENTYSTRING = _lib.preDefStr.SEVENTYSTRING,
    LINE_STR = 'line',
    COLUMN3D_STR = 'column3d';

var MSCombiDY3D = /*#__PURE__*/function (_MSDYBasecartesian3D) {
  (0, _inheritsLoose2.default)(MSCombiDY3D, _MSDYBasecartesian3D);

  function MSCombiDY3D() {
    var _this;

    _this = _MSDYBasecartesian3D.call(this) || this;
    _this.isDual = true;

    _this.registerFactory('dataset', _combiDualY3dDataset.default, ['vCanvas']);

    return _this;
  }
  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */


  MSCombiDY3D.getName = function getName() {
    return 'MSCombiDY3D';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  var _proto = MSCombiDY3D.prototype;

  _proto.getName = function getName() {
    return 'MSCombiDY3D';
  };

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSDYBasecartesian3D.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.is3D = true;
    config.sDefaultDatasetType = LINE_STR;
    config.defaultDatasetType = COLUMN3D_STR;
    config.showplotborder = 0;
    config.isdual = 1;
    config.enablemousetracking = true;
    config.anchorborderthickness = 1;
    config.anchorimageurl = UNDEF;
    config.anchorimagepadding = 1;
    config.anchorsides = 1;
    config.anchoralpha = UNDEF;
    config.anchorbgalpha = HUNDREDSTRING;
    config.anchorimagealpha = HUNDREDSTRING;
    config.anchorimagescale = 100;
    config.anchorstartangle = 90;
    config.anchorshadow = 0;
    config.anchorbgcolor = UNDEF;
    config.anchorbordercolor = UNDEF;
    config.anchorradius = 3;
    config.showvalues = 1;
    config.plotfillalpha = SEVENTYSTRING;
    config.linedashlen = 5;
    config.linedashgap = 4;
    config.linedashed = UNDEF;
    config.linealpha = HUNDREDSTRING;
    config.linethickness = 2;
    config.drawfullareaborder = 1;
    config.connectnulldata = 0;
  }
  /**
   * This method return the dataset group definations for this charts
   * @param  {string} name type of dataset group class
   * @return {class}      class of dataset group
   */
  ;

  _proto.getDSGroupdef = function getDSGroupdef(name) {
    return name.toLowerCase() === 'column3d' ? _columnMultiseries.default : UNDEF;
  }
  /**
   * This method return the dataset definations for this charts
   * @param  {string} name type of dataset class
   * @return {class}      class of dataset
   */
  ;

  _proto.getDSdef = function getDSdef(name) {
    if (name.toLowerCase() === 'splinearea') {
      return _mssplinearea.default;
    } else if (name.toLowerCase() === 'spline') {
      return _msspline.default;
    } else if (name.toLowerCase() === 'area') {
      return _area.default;
    } else if (name.toLowerCase() === 'line') {
      return _line.default;
    }

    return _column3d.default;
  }
  /**
   * function to return dataset type applicable for this chart
   * @param   {string}  name  dataset type
   * @return  {string}        dataset type applicable for this chart
   */
  ;

  _proto.getDSType = function getDSType(name) {
    if (name.toLowerCase() === 'splinearea') {
      return 'splinearea';
    } else if (name.toLowerCase() === 'spline') {
      return 'spline';
    } else if (name.toLowerCase() === 'area') {
      return 'area';
    } else if (name.toLowerCase() === 'line') {
      return 'line';
    }

    return 'column3d';
  };

  return MSCombiDY3D;
}(_msdybasecartesian3d.default);

exports["default"] = MSCombiDY3D;

/***/ }),

/***/ 733:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports._checkInvalidSpecificData = exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _msbar2d = _interopRequireDefault(__webpack_require__(734));

var _bar2d = _interopRequireDefault(__webpack_require__(640));

var _cartesianStack = _interopRequireDefault(__webpack_require__(698));

var _msstackedbarDataset = _interopRequireDefault(__webpack_require__(735));

var MS_STACKED_BAR_CHART = 'Multi-series Stacked Bar Chart',
    BAR_STR = 'bar';
/**
 * function to check if the chart specific data is proper is not
 * this fn is define for specific chart types
 * @return {boolean} if JSON data is valid or not
 */

var __checkInvalidSpecificData = function __checkInvalidSpecificData() {
  var jsonData = this.getFromEnv('dataSource'),
      datasetsJSON = jsonData.dataset,
      categories = jsonData.categories,
      i;

  if (!datasetsJSON || !categories) {
    return true;
  }

  if (i = datasetsJSON.length) {
    while (i--) {
      if (!datasetsJSON[i].dataset) {
        return true;
      }
    }
  }
};

exports._checkInvalidSpecificData = __checkInvalidSpecificData;

var MSStackedBar2D = /*#__PURE__*/function (_MSBar2D) {
  (0, _inheritsLoose2.default)(MSStackedBar2D, _MSBar2D);

  /**
   * constructor fn
   */
  function MSStackedBar2D() {
    var _this;

    _this = _MSBar2D.call(this) || this;

    _this.registerFactory('dataset', _msstackedbarDataset.default, ['vCanvas']);

    return _this;
  }
  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */


  MSStackedBar2D.getName = function getName() {
    return 'MSStackedBar2D';
  }
  /**
   * function to check if the chart specific data is proper is not
   * this fn is define for specific chart types
   * @return {boolean} if JSON data is valid or not
   */
  ;

  var _proto = MSStackedBar2D.prototype;

  _proto._checkInvalidSpecificData = function _checkInvalidSpecificData() {
    return __checkInvalidSpecificData.call(this);
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  _proto.getName = function getName() {
    return 'MSStackedBar2D';
  };

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSBar2D.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = MS_STACKED_BAR_CHART;
    config.defaultDatasetType = BAR_STR;
    config.isstacked = true;
    config.showSum = 0;
    config.enablemousetracking = true;
  }
  /**
   * This method return the dataset definations for this charts
   * @return {Object} return column dataset
   */
  ;

  _proto.getDSdef = function getDSdef() {
    return _bar2d.default;
  }
  /** This method return the dataset-group definations for this charts **/
  ;

  _proto.getDSGroupdef = function getDSGroupdef() {
    return _cartesianStack.default;
  };

  return MSStackedBar2D;
}(_msbar2d.default);

var _default = MSStackedBar2D;
exports["default"] = _default;

/***/ }),

/***/ 667:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports._setCategories = _setCategories2;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _msdybasecartesian = _interopRequireDefault(__webpack_require__(668));

var _pareto = __webpack_require__(672);

var _paretoline = __webpack_require__(674);

var _paretoAxis = _interopRequireDefault(__webpack_require__(675));

var _lib = __webpack_require__(274);

var _paretoDataset = _interopRequireDefault(__webpack_require__(676));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var NINETYSTRING = _lib.preDefStr.NINETYSTRING,
    COLUMN_STR = 'column';
/**
 * Set categories to Axis
 */

function _setCategories2() {
  var iapi = this,
      dataObj = iapi.getFromEnv('dataSource'),
      dataset = dataObj.dataset,
      numberFormatter = iapi.getFromEnv('number-formatter'),
      xAxis = iapi.getChildren('xAxis'),
      data = dataObj.data || dataset && dataset[0].data || [],
      catArr = [],
      datum,
      dataLen = data.length,
      i,
      vLine = {}; // iterate all data and remove null and vlines

  for (i = dataLen - 1; i >= 0; i--) {
    datum = data[i];

    if (datum.vline === 'true' || datum.vline === '1' || datum.vline === 1 || datum.vline === true) {
      vLine[i] = datum;
      data.splice(i, 1);
    } else if (numberFormatter.getCleanValue(datum.value, true) === null) {
      data.splice(i, 1);
    }
  } // Sort the original data


  data.sort(function (a, b) {
    return numberFormatter.getCleanValue(b.value, true) - numberFormatter.getCleanValue(a.value, true);
  }); // clone the sorted data for categories

  catArr = data.slice(); // add the v lines

  for (i in vLine) {
    catArr.splice(i, 0, vLine[i]);
  }

  xAxis[0].setTickValues(catArr);
}
/**
 * Creates class for  Pareto2D
 */


var Pareto2D = /*#__PURE__*/function (_MSDyBaseCartesian) {
  (0, _inheritsLoose2.default)(Pareto2D, _MSDyBaseCartesian);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  Pareto2D.getName = function getName() {
    return 'Pareto2D';
  }
  /**
   * Constructor function for class Pareto2D
   */
  ;

  function Pareto2D() {
    var _this;

    _this = _MSDyBaseCartesian.call(this) || this;
    _this.isPercentage = true;

    _this.registerFactory('axis', _paretoAxis.default, ['canvas']);

    _this.registerFactory('dataset', _paretoDataset.default, ['vCanvas']);

    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = Pareto2D.prototype;

  _proto.getName = function getName() {
    return 'Pareto2D';
  }
  /**
   * parse defualt configuration of the chart
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSDyBaseCartesian.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.singleseries = true;
    config.hasLegend = false;
    config.defaultDatasetType = COLUMN_STR;
    config.plotfillalpha = NINETYSTRING;
    config.enablemousetracking = true;
  }
  /**
   * parse defualt configuration of the chart
   */
  ;

  _proto._setCategories = function _setCategories() {
    _setCategories2.call(this);
  }
  /**
   * function to check if the chart specific data is proper is not
   * this fn is define for specific chart types
   * @return {boolean} if JSON data is valid or not
   */
  ;

  _proto._checkInvalidSpecificData = function _checkInvalidSpecificData() {
    var jsonData = this.getFromEnv('dataSource'),
        data = jsonData.data;

    if (!data || !data.length) {
      return true;
    }
  }
  /**
   * This method return the dataset definations for this charts
   * @param {string} name Name of dataset class
   * @return {Class}       Pareto dataset
   */
  ;

  _proto.getDSdef = function getDSdef(name) {
    return name === 'column' ? _pareto.ParetoColumnDataset : _paretoline.ParetoLineDataset;
  }
  /**
   * Overrides parent fn
   */
  ;

  _proto.getDSGroupdef = function getDSGroupdef() {// this fn overrides
  };

  return Pareto2D;
}(_msdybasecartesian.default);

var _default = Pareto2D;
exports["default"] = _default;

/***/ }),

/***/ 678:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _pareto2d = _interopRequireDefault(__webpack_require__(667));

var _lib = __webpack_require__(274);

var _pareto3d = __webpack_require__(679);

var _paretoline = __webpack_require__(674);

var _canvas3dAxisRefCartesian = _interopRequireDefault(__webpack_require__(604));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var CHART_STR = '3D Pareto Chart',
    COLUMN3D_STR = 'column3d';
/**
 * Creates class for  Pareto3D
 */

var Pareto3D = /*#__PURE__*/function (_Pareto2D) {
  (0, _inheritsLoose2.default)(Pareto3D, _Pareto2D);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  Pareto3D.getName = function getName() {
    return 'Pareto3D';
  }
  /**
   * Constructor function for class Pareto3D
   */
  ;

  function Pareto3D() {
    var _this;

    _this = _Pareto2D.call(this) || this;
    _this.fireGroupEvent = true;
    _this.defaultPlotShadow = 1;
    _this.isPercentage = true;

    _this.registerFactory('canvas', _canvas3dAxisRefCartesian.default);

    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = Pareto3D.prototype;

  _proto.getName = function getName() {
    return 'Pareto3D';
  }
  /**
   * parse defualt configuration of the chart
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _Pareto2D.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.is3D = true;
    config.friendlyName = CHART_STR;
    config.singleseries = true;
    config.hasLegend = false;
    config.defaultDatasetType = COLUMN3D_STR;
    config.plotfillalpha = _lib.preDefStr.NINETYSTRING;
    config.use3dlineshift = 1;
    config.enablemousetracking = true;
    config.showzeroplaneontop = 0;
  }
  /**
   * This method return the dataset definations for this charts
   * @param {string} name Name of dataset class
   * @return {Class}       Pareto dataset
   */
  ;

  _proto.getDSdef = function getDSdef(name) {
    return name === 'column' ? _pareto3d.ParetoColumn3DDataset : _paretoline.ParetoLineDataset;
  };

  return Pareto3D;
}(_pareto2d.default);

var _default = Pareto3D;
exports["default"] = _default;

/***/ }),

/***/ 648:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _pie2d = _interopRequireDefault(__webpack_require__(649));

var _commonchartapi = _interopRequireDefault(__webpack_require__(520));

var _lib = __webpack_require__(274);

var _caption = _interopRequireDefault(__webpack_require__(525));

var _subCaption = _interopRequireDefault(__webpack_require__(527));

var _background = _interopRequireDefault(__webpack_require__(529));

var _pieDataset = _interopRequireDefault(__webpack_require__(652));

var _legend = _interopRequireDefault(__webpack_require__(629));

var _legendSpacemanager = __webpack_require__(627);

var _schedular = __webpack_require__(286);

var math = Math,
    mathMin = math.min,
    mathMax = math.max,
    mathAbs = math.abs,
    mathPI = math.PI,
    mathRound = math.round,
    deg2rad = mathPI / 180,
    rad2deg = 180 / mathPI,
    PIE_STR = 'pie',
    CHART_STR = 'Pie Chart',
    PIE2D_STR = 'Pie2D',
    count = 0,
    UNDEF,

/**
 * Slices the dataset
 * @param {Object} dataset The dataset on which to perform the slicing operation
 * @param {number} index The index of the data within the dataset which will be sliced
 * @param {boolean} slice If true, the dataset is sliced out. Else, the dataset is sliced in.
 *
 * @return {boolean} Returns the slicing state of the data at the given index after slicing
 */
performSlicing = function performSlicing(dataset, indx, slice) {
  var sliceVal = !!slice,
      index = indx,

  /**
   * If the user as not explicitly provided the slice parameter OR if the provided slice
   * parameter is not the same as the present slice state of the given data plot, the data plot
   * is eligible for slicing.
   *
   * @param {Object} dataPlot The dataplot which needs to be checked for slicing eligibility
   *
   * @return {boolean} Whether the given data plot will slice or not
   */
  willSlice = function willSlice(dataPlot) {
    return sliceVal !== dataPlot.config.sliced || typeof slice === 'undefined';
  },
      data,
      dataConfig,
      output,
      selectedDataPlot;

  if (!dataset) {
    return output;
  } // Extract the all data from the dataset


  data = dataset.components && dataset.components.data || []; // Check if dataset is reversed and adjust the user's given index accordingly

  index = dataset.config.reversePlotOrder ? data.length - index - 1 : index;
  selectedDataPlot = data[index];

  if (selectedDataPlot) {
    dataConfig = selectedDataPlot.config; // If the data is eligible for slicing, slice it. Else, return the present slice state of the
    // data plot

    if (willSlice(selectedDataPlot)) {
      output = dataset.plotGraphicClick.call(selectedDataPlot.graphics.element);
    } else {
      output = dataConfig.sliced;
    }
  }

  return output;
};

var Pie2D = /*#__PURE__*/function (_CommonAPI) {
  (0, _inheritsLoose2.default)(Pie2D, _CommonAPI);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  Pie2D.getName = function getName() {
    return 'Pie2D';
  }
  /**
   * Provides the name of the chart extension
   *
   * @return {string} The name of the chart extension
   */
  ;

  var _proto = Pie2D.prototype;

  _proto.getName = function getName() {
    return 'Pie2D';
  };

  function Pie2D() {
    var _this;

    _this = _CommonAPI.call(this) || this;
    _this.defaultSeriesType = PIE_STR;
    _this.defaultPlotShadow = 1;
    _this.reverseLegend = 1;
    _this.defaultPaletteOptions = UNDEF;
    _this.sliceOnLegendClick = true;
    _this.dontShowLegendByDefault = true;
    _this.defaultZeroPlaneHighlighted = false;
    _this.hasCanvas = true;
    _this.eiMethods =
    /** @lends FusionCharts# */
    {
      /**
       * Pie charts have slices that can be clicked to slice in and out.
       * Checks whether a particular wedge of Pie or Doughnut chart is sliced-out or sliced-in.
       *
       * > Available on `pie` and `doughnut` chart types only.
       *
       * @group chart:pie-slice
       *
       * @param {number} index - The index of the data corresponding to the pie/doughnut slice.
       * @return {boolean} - The sliced state of the pie/doughnut wedge. Returns `true` if it's sliced out,
       * or `false` if it's sliced in.
       *
       * @example
       * // Render a pie 2d chart with some data in sliced out state, provide data index
       * // in an input textfield and get the sliced state of the pie on click of a button
       * FusionCharts.ready(function () {
       *     var chart = new FusionCharts({
       *         type: "pie2d",
       *         renderAt: "chart-container",
       *         dataSource: "data.json",
       *         dataFormat: "jsonurl"
       *     }).render();
       *
       *     // Get the sliced state of a pie returned when clicked on a button
       *     // (with an id pie-sliced-state). It picks the data index from
       *     // an input textfield (with id pie-data-index).
       *     document.getElementById("pie-sliced-state").onclick = function () {
       *         var dataIndex = document.getElementById("pie-data-index").value,
       *             slicedState = chart.isPlotItemSliced(dataIndex);
       *     };
       * });
       */
      isPlotItemSliced: function isPlotItemSliced(index) {
        var data,
            config,
            apiInstance = this.apiInstance,
            dataset = apiInstance && apiInstance.getDatasets();
        return dataset && (dataset = dataset[0]) && (data = dataset.components.data) && data[index] && (config = data[index].config) && config.sliced;
      },
      addData: function addData() {
        var apiInstance = this.apiInstance,
            dataset = apiInstance && apiInstance.getDatasets();
        return dataset && (dataset = dataset[0]) && dataset.addData.apply(dataset, arguments);
      },
      removeData: function removeData() {
        var apiInstance = this.apiInstance,
            dataset = apiInstance && apiInstance.getDatasets();
        return dataset && (dataset = dataset[0]) && dataset.removeData.apply(dataset, arguments);
      },
      updateData: function updateData() {
        var apiInstance = this.apiInstance,
            dataset = apiInstance && apiInstance.getDatasets();
        return dataset && (dataset = dataset[0]) && dataset.updateData.apply(dataset, arguments);
      },

      /**
       * Pie charts have slices. These slices can be clicked by users to slice in or slice out.
       * Slices a pie/doughnut wedge to in / out state. In absence of the optional second parameter, it
       * toggles the sliced state of the pie. The second parameter only enforces a specific sliced state.
       *
       * > Available on `pie` and `doughnut` chart types only.
       *
       * @group chart:pie-slice
       *
       * @param {number} index - The index of the data corresponding to the pie/doughnut slice.
       * @param {boolean=} [slice] - Gives direction to chart on what is the required sliced state. For
       * `true`, it slices out, if in sliced-in state. Or else, maintains it's sliced-out state. And
       * vice-versa.
       * @param {Function} [callback] - If the chart is in asyncRender mode, the callback function
       * is invoked with the result of the slicing operation.
       *
       * @return {boolean} - The final sliced state of the pie/doughnut wedge. Returns `true` if it's
       * sliced out, or `false` if it's sliced in. If the chart is in asyncRender mode, this method
       * returns `undefined` and instead the callback provided is invoked with the result of the
       * slicing operation.
       *
       * @fires FusionCharts#slicingStart
       * @fires FusionCharts#slicingEnd
       *
       * @example
       * // Render a pie 2d chart, provide data index in an input textfield
       * // and toggle the sliced state of the pie on click of a button
       * FusionCharts.ready(function () {
       *     var chart = new FusionCharts({
       *         type: "pie2d",
       *         renderAt: "chart-container",
       *         dataSource: "data.json",
       *         dataFormat: "jsonurl"
       *     }).render();
       *
       *     // Toggle the sliced state of the pie when clicked on a button
       *     // (with an id pie-sliced-state). It picks the data index from
       *     // an input textfield (with id pie-data-index).
       *     document.getElementById("pie-sliced-state").onclick = function () {
       *         var dataIndex = document.getElementById("pie-data-index").value;
       *         chart.slicePlotItem(dataIndex);
       *     };
       * });
       */
      slicePlotItem: function slicePlotItem(index, slice, callback) {
        var fcInstance = this,
            apiInstance = fcInstance.apiInstance;

        if (callback) {
          apiInstance.addJob("eiMethods-slice-plot" + count++, function () {
            var slicingResult = performSlicing(apiInstance.getDatasets()[0], index, slice);
            return typeof callback === 'function' && callback(slicingResult);
          }, _schedular.priorityList.postRender);
        } else {
          return performSlicing(apiInstance.getDatasets()[0], index, slice);
        }
      },

      /**
       * Rotates the pie/doughnut chart to a specific angle or by a specific angle. The mode of
       * operation is controlled by the optional second parameter. Even the first parameter is optional,
       * in absence of which, the chart doesn't rotate and simply returns the current starting angle
       * of the pie/doughnut chart.
       *
       * Starting angle of a pie/doughnut chart is the angle at which the starting face of the first data is
       * aligned to. Each pie is drawn in counter clock-wise direction.
       *
       * > Available on `pie` and `doughnut` chart types only.
       *
       * @group chart:pie-slice
       *
       * @param {degrees=} [angle=0] - The angle by which to rotate the entire pie/doughnut chart.
       * @param {boolean=} [relative=false] - Specify whether the angle being set is relative to the current
       * angle or with respect to absolute 0.
       * @return {degrees} - The final state of the starting angle of the chart.
       *
       * @example
       * // Render a pie 2d chart and rotate the chart by 90 degrees on click of a button
       * FusionCharts.ready(function () {
       *     var chart = new FusionCharts({
       *         type: "pie2d",
       *         renderAt: "chart-container",
       *         dataSource: "data.json",
       *         dataFormat: "jsonurl"
       *     }).render();
       *
       *     // Assign the functionality of rotating the chart by 90 degrees when clicked on
       *     // a button (with an id rotate-chart).
       *     document.getElementById("rotate-chart").onclick = function () {
       *         chart.startingAngle(90, true);
       *     };
       * });
       */
      startingAngle: function startingAngle(angle, relative, callback) {
        var chart = this.apiInstance,
            output;

        if (callback) {
          chart.addJob("eiMethods-start-angle" + count++, function () {
            output = chart._startingAngle(angle, relative);

            if (typeof callback === 'function') {
              callback(output);
            }
          }, _schedular.priorityList.postRender);
        } else {
          return chart._startingAngle(angle, relative);
        }
      }
    };

    _this.registerFactory('dataset', _pieDataset.default, ['vCanvas', 'legend']);

    _this.registerFactory('legend', _legend.default);

    return _this;
  }

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _CommonAPI.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.alignCaptionWithCanvas = 0;
    config.formatnumberscale = 1;
    config.isSingleSeries = true;
    config.friendlyName = CHART_STR;
    config.defaultDatasetType = PIE2D_STR;
    config.plotborderthickness = 1;
    config.decimals = 2;
    config.alphaanimation = 0;
    config.singletonPlaceValue = true;
    config.usedataplotcolorforlabels = 0;
    config.enableslicing = _lib.ONESTRING;
    config.skipCanvasDrawing = true;
  }
  /**
   * Parse the chart attributes and store in chart's config
   * @param {Object} dataObj User input json
   */
  ;

  _proto.parseChartAttr = function parseChartAttr(dataObj) {
    _CommonAPI.prototype.parseChartAttr.call(this, dataObj);

    var iapi = this,
        chartAttrs = iapi.getFromEnv('chart-attrib');
    iapi.config.showLegend = (0, _lib.pluckNumber)(chartAttrs.showlegend, 0);
    iapi.config.showvalues = (0, _lib.pluckNumber)(chartAttrs.showvalues, 1);
    iapi.config.showlabels = (0, _lib.pluckNumber)(chartAttrs.showlabels, 1);
  }
  /**
   * function to create component and configure and also configure the chart
   * It creates components which are depend on data and configure them and also configure chart
   * It calls helper function namely, configure
   * @param  {Object} dataObj contains json data of the chart
   */
  ;

  _proto.configureAttributes = function configureAttributes(dataObj) {
    var iapi = this,
        chartConfig = iapi.config,
        toolTipController;
    iapi.parseChartAttr(dataObj);
    iapi.createComponent(dataObj);
    iapi.config.skipConfigureIteration.axis = true;
    iapi.configureChildren(); // @TODO this is not proper place to invoking this fn
    // as configureAttributes fn is copied from the mscartesian to
    // override the parent configureAttributes fn, this _createToolBox
    // fn invoking is still here.

    toolTipController = iapi.getFromEnv('toolTipController');
    toolTipController.setStyle({
      'backgroundColor': _lib.hasSVG ? (0, _lib.convertColor)(chartConfig.tooltipbgcolor || 'FFF', chartConfig.tooltipbgalpha || 100) : (chartConfig.tooltipbgcolor || 'FFF').replace(/\s+/g, '').replace(/^#?([a-f0-9]+)/ig, '#$1'),
      'color': (chartConfig.tooltipcolor || chartConfig.basefontcolor || '545454').replace(/^#?([a-f0-9]+)/ig, '#$1'),
      'borderColor': _lib.hasSVG ? (0, _lib.convertColor)(chartConfig.tooltipbordercolor || '666', chartConfig.tooltipborderalpha || 100) : (chartConfig.tooltipbordercolor || '666').replace(/\s+/g, '').replace(/^#?([a-f0-9]+)/ig, '#$1'),
      'borderWidth': (0, _lib.pluckNumber)(chartConfig.tooltipborderthickness, 1) + 'px',
      'showToolTipShadow': (0, _lib.pluckNumber)(chartConfig.showtooltipshadow || 0),
      'borderRadius': (0, _lib.pluckNumber)(chartConfig.tooltipborderradius, 0) + 'px',
      'fontSize': (0, _lib.pluckNumber)(this.computeFontSize(chartConfig.basefontsize), 10) + 'px',
      'fontFamily': chartConfig.basefont || this.getFromEnv('style').inCanfontFamily,
      'padding': (0, _lib.pluckNumber)(chartConfig.tooltippadding || 3) + 'px'
    });
  }
  /**
   * Create child components of chart
   * @param {Object} dataObj User input json
   */
  ;

  _proto.createComponent = function createComponent() {
    var iapi = this,
        skipConfigureIteration;
    skipConfigureIteration = iapi.config.skipConfigureIteration = {};
    iapi.createBaseComponent();
    iapi.getFromEnv('animationManager').setAnimationState(iapi._firstConfigure ? 'initial' : 'update');
    (0, _lib.componentFactory)(iapi, _caption.default, 'caption');
    skipConfigureIteration.caption = true;
    (0, _lib.componentFactory)(iapi, _subCaption.default, 'subCaption');
    skipConfigureIteration.subCaption = true;
    (0, _lib.componentFactory)(iapi, _background.default, 'background');
    skipConfigureIteration.background = true;
    skipConfigureIteration.canvas = true; // Create dynamic components like message logger

    iapi._createConfigurableComponents && iapi._createConfigurableComponents(); // Update alert manager

    if (iapi.config.realtimeEnabled) {
      iapi._realTimeConfigure && iapi._realTimeConfigure(); // if (AlertManagerClass) {
      //   componentFactory(iapi, AlertManagerClass, 'alertManager');
      // }
    }
  }
  /**
   * function to calculate post space management calculations
   * calculations like axis dimenetion set, allocate space for xaxis labels,
   * canvas padding etc.
   * As pie charts do not have axis and canvas so this api will override the parent api
   */
  // eslint-disable-next-line
  ;

  _proto._postSpaceManagement = function _postSpaceManagement() {
    this.config.showLegend && this.getChildren('legend') && this.getChildren('legend')[0].postSpaceManager();
    this.allocateDimensionOfChartMenuBar();
  }
  /**
   * function to check if the chart specific data is proper is not
   * this fn is define for specific chart types
   * @return {boolean} if JSON data is valid or not
   */
  // eslint-disable-next-line
  ;

  _proto._checkInvalidSpecificData = function _checkInvalidSpecificData() {
    var chart = this,
        chartAttr = chart.getFromEnv('dataSource'),
        i,
        len,
        zeroSum = 0,
        nullSum = 0,
        data = chartAttr.data,
        value;
    /**
     * Case 1: If no data is present, return true
     * Case 2: If no valid data is present(ie, data has all zero and/or null values)
     */

    if (!data) {
      return true;
    }

    len = data.length || 0;

    for (i = 0; i < len; i++) {
      value = Number(data[i].value);
      zeroSum += !isNaN(value) && value === 0 ? 1 : 0;
      nullSum += isNaN(value) ? 1 : 0;
    } // Number of zero values + number of null values >= total data present.


    if (zeroSum + nullSum >= len) {
      return true;
    }

    return false;
  };

  _proto._spaceManager = function _spaceManager() {
    var chart = this,
        chartConfig = chart.config,
        dataSet = chart.getChildren('dataset')[0],
        data = dataSet.components.data,
        conf = dataSet.config,
        legend = chart.getFromEnv('legend'),
        colorM = chart.getFromEnv('color-manager'),
        SmartLabel = chart.getFromEnv('smartLabel'),
        chartwidth = chart.getFromEnv('chartWidth'),
        chartHeight = chart.getFromEnv('chartHeight'),
        textWidthArr = [],
        length = conf.dataLabelCounter,
        labelMaxW = 0,
        fcJSONChart = chart.getFromEnv('dataSource').chart,
        manageLabelOverflow = (0, _lib.pluckNumber)(fcJSONChart.managelabeloverflow, 0),
        userGivenSlicingDist = (0, _lib.pluckNumber)(fcJSONChart.slicingdistance),
        slicingDistance = !conf.preSliced && chartConfig.allPlotSliceEnabled === _lib.ZEROSTRING && (fcJSONChart.showlegend !== _lib.ONESTRING || fcJSONChart.interactivelegend === _lib.ZEROSTRING) ? 0 : mathAbs((0, _lib.pluckNumber)(userGivenSlicingDist, 20)),
        // isPieRadiusInPerentage variable is introduced to support NFR pieRadius in percentage, bolean variable to check value given in % or not
    isPieRadiusInPerentage = /%/g.test(fcJSONChart.pieradius),
        // percentage is calcluated on half of min of chart's height and width, Otherwise considering the given value
    pieRadius = (0, _lib.pluckNumber)(isPieRadiusInPerentage ? Math.min(chartwidth / 2, chartHeight / 2) * (parseFloat(fcJSONChart.pieradius) / 100) : fcJSONChart.pieradius, 0),
        enableSmartLabels = (0, _lib.pluckNumber)(fcJSONChart.enablesmartlabels, fcJSONChart.enablesmartlabel, 1),
        skipOverlapLabels = enableSmartLabels ? (0, _lib.pluckNumber)(fcJSONChart.skipoverlaplabels, fcJSONChart.skipoverlaplabel, 1) : 0,
        isSmartLineSlanted = (0, _lib.pluckNumber)(fcJSONChart.issmartlineslanted, 1),
        labelDistance = length ? (0, _lib.pluckNumber)(fcJSONChart.labeldistance, fcJSONChart.smartlabelclearance, 5) : slicingDistance,
        totalDistnace,
        width = chartConfig.width,
        height = chartConfig.height,
        actionBarHeight = (chart._manageActionBarSpace(height * 0.225) || {}).bottom,
        chartWorkingWidth = width - (chartConfig.marginRight + chartConfig.marginLeft),
        chartWorkingHeight = height - (chartConfig.marginTop + chartConfig.marginBottom) - (actionBarHeight ? actionBarHeight + chartConfig.marginBottom : 0),
        minOfWH = mathMin(chartWorkingHeight, chartWorkingWidth),
        smartLineColor = (0, _lib.pluck)(fcJSONChart.smartlinecolor, colorM.getColor('plotFillColor')),
        smartLineAlpha = (0, _lib.pluckNumber)(fcJSONChart.smartlinealpha, 100),
        smartLineThickness = (0, _lib.pluckNumber)(fcJSONChart.smartlinethickness, 0.7),
        dataLabelOptions = conf.dataLabelOptions = dataSet._parseDataLabelOptions(),
        style = dataLabelOptions.style,
        lineHeight = length ? (0, _lib.pluckNumber)(parseInt(style.lineHeight, 10), 12) : 0,
        // 2px padding
    pieMinRadius = pieRadius === 0 ? minOfWH * 0.15 : pieRadius,
        pieMinDia = 2 * pieMinRadius,
        legendSpace,
        captionSpace,
        pieYScale = conf.pieYScale,
        pieSliceDepth = conf.pieSliceDepth,
        textObj,
        avaiableMaxpieSliceDepth,
        totalSpaceReq,
        legendPos = (0, _lib.pluck)(fcJSONChart.legendposition, _lib.POSITION_BOTTOM).toLowerCase().split('-'); // Old code for placeValuesInside
    // placeLabelsInside = pluckNumber ((FCchartName === 'doughnut2d') ? 0 : fcJSONChart.placevaluesinside),


    dataLabelOptions.connectorWidth = smartLineThickness;
    dataLabelOptions.connectorPadding = (0, _lib.pluckNumber)(fcJSONChart.connectorpadding, 5);
    dataLabelOptions.connectorColor = (0, _lib.convertColor)(smartLineColor, smartLineAlpha); // If smart label is on and there is a label defined only then modify the label distance

    totalDistnace = !(chartConfig.showvalues || chartConfig.showlabels) ? labelDistance : conf.labelPosition !== 'inside' || conf.valuePosition !== 'inside' ? labelDistance + slicingDistance : labelDistance; // Include label

    totalSpaceReq = pieMinDia + (lineHeight + totalDistnace) * 2; // Provide at least single line height space for caption.
    // a space manager that manages the space for the tools as well as the captions.

    captionSpace = chart._manageChartMenuBar(totalSpaceReq < chartWorkingHeight ? chartWorkingHeight - totalSpaceReq : chartWorkingHeight / 2);
    chartWorkingHeight -= (captionSpace.top || 0) + (captionSpace.bottom || 0);

    if (conf.showLegend) {
      chart.config.hasLegend = true;

      if (legendPos[0] === _lib.POSITION_RIGHT || legendPos[0] === _lib.POSITION_LEFT) {
        legendSpace = legend._manageLegendPosition(chartWorkingHeight / 2);
        chartWorkingWidth -= mathMax(legendSpace.left, legendSpace.right);
      } else {
        legendSpace = legend._manageLegendPosition(chartWorkingHeight / 2);
        chartWorkingHeight -= mathMax(legendSpace.top, legendSpace.bottom);
      }

      legendSpace && chart._allocateSpace(legendSpace);
    } // Now get the max width required for all display text
    // set the style


    SmartLabel.useEllipsesOnOverflow(chartConfig.useEllipsesWhenOverflow);

    if (length !== 1) {
      // Fix for single data in Pie makes pie very small in size.
      for (; length--;) {
        SmartLabel.setStyle(data[length].config.style || chartConfig.dataLabelStyle);
        textWidthArr[length] = textObj = SmartLabel.getOriSize(data[length].config.displayValue);
        labelMaxW = conf.labelPosition !== 'inside' || conf.valuePosition !== 'inside' ? mathMax(labelMaxW, textObj.width) : 0;
      }
    } // If redius not supplyed then auto calculate it


    if (pieRadius === 0) {
      pieMinRadius = chart._stubRadius(chartWorkingWidth, labelMaxW, chartWorkingHeight, totalDistnace, slicingDistance, lineHeight, pieMinRadius, labelDistance);
    } else {
      conf.slicingDistance = slicingDistance;
      conf.pieMinRadius = pieMinRadius;
      dataLabelOptions.distance = labelDistance;
    }

    avaiableMaxpieSliceDepth = chartWorkingHeight - 2 * (pieMinRadius * pieYScale + lineHeight);
    conf.managedPieSliceDepth = pieSliceDepth > avaiableMaxpieSliceDepth ? pieSliceDepth - avaiableMaxpieSliceDepth : conf.pieSliceDepth;
    dataLabelOptions.isSmartLineSlanted = isSmartLineSlanted;
    dataLabelOptions.enableSmartLabels = enableSmartLabels;
    dataLabelOptions.skipOverlapLabels = skipOverlapLabels;
    dataLabelOptions.manageLabelOverflow = manageLabelOverflow;
  } // manages the spaces when no radius is given.
  ;

  _proto._stubRadius = function _stubRadius(chartWorkingWidth, labelMaxW, chartWorkingHeight, totalDist, sliceDistance, lineHeight, minRadius, labelDistance) {
    var chart = this,
        pieMinRadius = minRadius,
        slicingDistance = sliceDistance,
        dataSet = chart.getChildren('dataset')[0],
        conf = dataSet.config,
        fcJSONChart = chart.getFromEnv('dataSource').chart,
        userGivenSlicingDist = (0, _lib.pluckNumber)(fcJSONChart.slicingdistance),
        dataLabelOptions = conf.dataLabelOptions || (conf.dataLabelOptions = dataSet._parseDataLabelOptions()),
        availableRadius = 0,
        // Slicing distance can not be less then the MINSLICINGDIST (10)
    MINSLICINGDIST = 10,
        shortFall;

    availableRadius = mathMin(chartWorkingWidth / 2 - labelMaxW - slicingDistance, chartWorkingHeight / 2 - lineHeight) - totalDist;

    if (availableRadius >= pieMinRadius) {
      // there has space for min width
      pieMinRadius = availableRadius;
    } else if (!userGivenSlicingDist) {
      /** @todo smartyfy Labels */
      // If slicing distance is not given by the user, adjust slicing distance based on pie radius.
      shortFall = pieMinRadius - availableRadius; // Now reduce the pie slicing distance, but restrict the minimum slicing distance to 10 pixels.

      slicingDistance = mathMax(mathMin(totalDist - shortFall, slicingDistance), MINSLICINGDIST);
    }

    conf.slicingDistance = slicingDistance;
    conf.pieMinRadius = pieMinRadius;
    dataLabelOptions.distance = labelDistance;
    return pieMinRadius;
  };

  _proto._startingAngle = function _startingAngle(angl, relative) {
    var angle = angl,
        ang,
        chart = this,
        dataSet = chart.getChildren('dataset')[0],
        seriesData = dataSet.config,
        // Angle is differently handled in Pie2D and Pie3D. So, angles is converted
    // accordingly to the same base. Its radian in 2D while in degrees in 3D.
    // Moreover, sense of positive angle is opposite in the two.
    currentAngle = (ang = seriesData.startAngle) * -rad2deg + (-1 * ang < 0 ? 360 : 0);

    if (!isNaN(angle)) {
      if (!(seriesData.singletonCase || seriesData.isRotating)) {
        angle += relative ? currentAngle : 0;
        seriesData.startAngle = -angle * deg2rad;

        dataSet._rotate(angle);

        currentAngle = angle;
      }
    } // Angle normalised in the range of [0, 360]


    return mathRound(((currentAngle %= 360) + (currentAngle < 0 ? 360 : 0)) * 100) / 100;
  }
  /**
   * function to calculate and allote space for legend
   */
  ;

  _proto._manageLegendSpace = function _manageLegendSpace() {
    _legendSpacemanager._manageLegendSpace.call(this);
  };

  _proto.getDSdef = function getDSdef() {
    return _pie2d.default;
  };

  return Pie2D;
}(_commonchartapi.default);

var _default = Pie2D;
exports["default"] = _default;

/***/ }),

/***/ 654:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _pie2d = _interopRequireDefault(__webpack_require__(648));

var _pie3d = _interopRequireDefault(__webpack_require__(655));

var _lib = __webpack_require__(274);

var math = Math,
    mathRound = math.round,
    mathMin = math.min,
    mathMax = math.max,
    mathPI = math.PI,
    CHART_STR = '3D Pie Chart',
    PIE3D_STR = 'Pie3D';

var Pie3D = /*#__PURE__*/function (_Pie2D) {
  (0, _inheritsLoose2.default)(Pie3D, _Pie2D);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  Pie3D.getName = function getName() {
    return 'Pie3D';
  };

  function Pie3D() {
    var _this;

    _this = _Pie2D.call(this) || this; // this.fireGroupEvent = true;

    _this.defaultPlotShadow = 0;
    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = Pie3D.prototype;

  _proto.getName = function getName() {
    return 'Pie3D';
  };

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _Pie2D.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.is3D = true;
    config.friendlyName = CHART_STR;
    config.defaultDatasetType = PIE3D_STR;
    config.plotborderthickness = 0.1;
    config.alphaanimation = 1;
  } // Pie2D (base) has defaultPlotShadow, but 3d does not.
  ;

  _proto.animate = function animate() {
    var i,
        point,
        graphic,
        pointGraphics,
        pointConfig,
        element,
        args,
        up,
        start,
        end,
        chart = this,
        chartComponents = chart.components,
        dataSet = chartComponents.dataset[0],
        dataSetConfig = dataSet.config,
        dataSetComponents = dataSet.components,
        plotItems = dataSetComponents.data,
        len = plotItems.length,
        alphaAnim = dataSetConfig.alphaAnimation,
        animationObj = chart.get('config', 'animationObj'),
        animationDuration = animationObj.duration || 0,
        mainElm = animationObj.dummyObj,
        animObj = animationObj.animObj,
        animType = animationObj.animType;

    if (!alphaAnim) {
      for (i = 0; i < len; i++) {
        point = plotItems[i];
        pointGraphics = point.graphics;
        pointConfig = point.config;
        args = pointConfig.shapeArgs;
        up = 2 * mathPI;
        element = pointGraphics.element; // start values

        if (element) {
          element.attr({
            sAngle: up,
            eAngle: up
          });
          start = args.sAngle;
          end = args.eAngle;
          /* Raphael animation do not support start and end attributes.
                      * Since the attribute setting for Pie3D goes through attrFN
                      * method of Pie3DManager, we can safely use some unused
                      * attributes for pie3D to pass through Raphael animation module
                      * and trap the attributes to convert to start and end in attrFN */

          graphic.animateWith(mainElm, animObj, {
            cx: start - up,
            cy: end - up
          }, animationDuration, animType);
        }
      }
    }
  } // manages the spaces when no radius is given.
  ;

  _proto._stubRadius = function _stubRadius(chartWorkingWidth, labelMaxW, chartWrkngHt, lblDistance, sliceDistance, lineHeight, pieMinRad) {
    var chart = this,
        chartWorkingHeight = chartWrkngHt,
        pieMinRadius = pieMinRad,
        slicingDistance = sliceDistance,
        labelDistance = lblDistance,
        dataSet = chart.getChildren('dataset')[0],
        conf = dataSet.config,
        fcJSONChart = dataSet.config,
        userGivenSlicingDist = (0, _lib.pluckNumber)(fcJSONChart.slicingdistance),
        dataLabelOptions = conf.dataLabelOptions || (conf.dataLabelOptions = dataSet._parseDataLabelOptions()),
        availableRadius = 0,
        // Slicing distance can not be less then the MINSLICINGDIST (10)
    MINSLICINGDIST = 10,
        pieYScale = conf.pieYScale,
        pieSliceDepth = conf.pieSliceDepth,
        shortFall;

    chartWorkingHeight -= pieSliceDepth;
    availableRadius = mathMin(chartWorkingWidth / 2 - labelMaxW - slicingDistance, (chartWorkingHeight / 2 - lineHeight) / pieYScale) - labelDistance;

    if (availableRadius >= pieMinRadius) {
      // there has space for min width
      pieMinRadius = availableRadius;
    } else if (!userGivenSlicingDist) {
      /** @todo smartyfy Labels */
      // If slicing distance is not given by the user, adjust slicing distance based on pie radius.
      shortFall = pieMinRadius - availableRadius; // Now reduce the pie slicing distance, but restrict the minimum slicing distance to 10 pixels.

      slicingDistance = labelDistance = mathMax(mathMin(labelDistance - shortFall, slicingDistance), MINSLICINGDIST);
    }

    conf.slicingDistance = slicingDistance;
    conf.pieMinRadius = pieMinRadius;
    dataLabelOptions.distance = labelDistance;
    return pieMinRadius;
  };

  _proto._startingAngle = function _startingAngle(angl, relative) {
    var ang,
        angle = angl,
        chart = this,
        dataSet = chart.getChildren('dataset')[0],
        seriesData = dataSet.config,
        // Angle is differently handled in Pie2D and Pie3D. So, angles is converted
    // accordingly to the same base. Its radian in 2D while in degrees in 3D.
    // Moreover, sense of positive angle is opposite in the two.
    currentAngle = (ang = seriesData.startAngle) + (ang < 0 ? 360 : 0);

    if (!isNaN(angle)) {
      if (!(seriesData.singletonCase || seriesData.isRotating)) {
        angle += relative ? currentAngle : 0;

        dataSet._rotate(angle);

        currentAngle = angle;
      }
    } // Angle normalised in the range of [0, 360]


    return mathRound(((currentAngle %= 360) + (currentAngle < 0 ? 360 : 0)) * 100) / 100;
  };

  _proto.getDSdef = function getDSdef() {
    return _pie3d.default;
  };

  return Pie3D;
}(_pie2d.default);

var _default = Pie3D;
exports["default"] = _default;

/***/ }),

/***/ 718:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _scatterbase = _interopRequireDefault(__webpack_require__(719));

var _scatter = _interopRequireDefault(__webpack_require__(723));

var UNDEF,
    CHART_STR = 'Scatter Chart';

var Scatter = /*#__PURE__*/function (_ScatterBase) {
  (0, _inheritsLoose2.default)(Scatter, _ScatterBase);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  Scatter.getName = function getName() {
    return 'Scatter';
  };

  function Scatter() {
    var _this;

    _this = _ScatterBase.call(this) || this;
    _this.isXY = true;
    _this.defaultZeroPlaneHighlighted = false;
    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = Scatter.prototype;

  _proto.getName = function getName() {
    return 'Scatter';
  };

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _ScatterBase.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = CHART_STR;
    config.hasLegend = true;
    config.allowreversexaxis = true;
    config.enablemousetracking = true;
  };

  _proto.getDSdef = function getDSdef() {
    return _scatter.default;
  } // This method return the dataset-group definations for this charts
  ;

  _proto.getDSGroupdef = function getDSGroupdef() {
    return UNDEF;
  };

  return Scatter;
}(_scatterbase.default);

var _default = Scatter;
exports["default"] = _default;

/***/ }),

/***/ 693:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _scrollcolumn2d = _interopRequireDefault(__webpack_require__(694));

var _area = _interopRequireDefault(__webpack_require__(617));

var _lib = __webpack_require__(274);

var UNDEF,
    SEVENTYSTRING = _lib.preDefStr.SEVENTYSTRING,
    CHART_STR = 'Scrollable Multi-series Area Chart',
    SCROLL_AREA_STR = 'scrollarea2d';
/**
 * Creates ScrollArea2D class
 */

var ScrollArea2D = /*#__PURE__*/function (_ScrollColumn2D) {
  (0, _inheritsLoose2.default)(ScrollArea2D, _ScrollColumn2D);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  ScrollArea2D.getName = function getName() {
    return 'ScrollArea2D';
  }
  /**
   * Constructor fn of ScrollArea2D class
   */
  ;

  function ScrollArea2D() {
    var _this;

    _this = _ScrollColumn2D.call(this) || this;
    _this.hasScroll = true;
    _this.defaultPlotShadow = 0;
    _this.binSize = 0;
    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = ScrollArea2D.prototype;

  _proto.getName = function getName() {
    return 'ScrollArea2D';
  }
  /**
   * Sets default chart configuration
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _ScrollColumn2D.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = CHART_STR;
    config.defaultDatasetType = SCROLL_AREA_STR;
    config.enablemousetracking = true;
    config.anchorborderthickness = 1;
    config.anchorimageurl = UNDEF;
    config.anchorimagepadding = 1;
    config.anchorsides = 1;
    config.anchoralpha = UNDEF;
    config.anchorbgalpha = _lib.HUNDREDSTRING;
    config.anchorimagealpha = _lib.HUNDREDSTRING;
    config.anchorimagescale = 100;
    config.anchorstartangle = 90;
    config.anchorshadow = 0;
    config.anchorbgcolor = UNDEF;
    config.anchorbordercolor = UNDEF;
    config.anchorradius = 3;
    config.showvalues = 1;
    config.plotfillalpha = SEVENTYSTRING;
    config.canvasborderthickness = 1;
    config.linedashlen = 5;
    config.linedashgap = 4;
    config.linedashed = UNDEF;
    config.linealpha = _lib.HUNDREDSTRING;
    config.linethickness = 2;
    config.drawfullareaborder = 1;
    config.connectnulldata = 0;
    config.defaultcrosslinethickness = 1;
    config.avgScrollPointWidth = 75;
  }
  /** This method return the dataset definations for this charts **/
  ;

  _proto.getDSdef = function getDSdef() {
    return _area.default;
  }
  /** This method return the dataset-group definations for this charts **/
  ;

  _proto.getDSGroupdef = function getDSGroupdef() {
    return UNDEF;
  };

  return ScrollArea2D;
}(_scrollcolumn2d.default);

var _default = ScrollArea2D;
exports["default"] = _default;

/***/ }),

/***/ 710:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _msbarcartesian = _interopRequireDefault(__webpack_require__(625));

var _bar2d = _interopRequireDefault(__webpack_require__(640));

var _columnMultiseries = _interopRequireDefault(__webpack_require__(689));

var _multiseriesDataset = _interopRequireDefault(__webpack_require__(628));

var _scrollApis = __webpack_require__(690);

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var SCROLL_BAR_CHART = 'Scrollable Multi-series Bar Chart',
    BAR2D_STR = 'bar2d';
/**
 * Class for ScrollBar2D chart
 * @class ScrollBar2D
 * @extends {MSBarCartesian}
 */

var ScrollBar2D = /*#__PURE__*/function (_MSBarCartesian) {
  (0, _inheritsLoose2.default)(ScrollBar2D, _MSBarCartesian);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  ScrollBar2D.getName = function getName() {
    return 'ScrollBar2D';
  }
  /**
   * Function to state if inputOptions are to be used for this charts
   * @return {Array} value
   */
  ;

  ScrollBar2D.includeInputOptions = function includeInputOptions() {
    return ['SwipeGesture'];
  }
  /**
   * Creates an instance of ScrollBar2D.
   * @memberof ScrollBar2D
   */
  ;

  function ScrollBar2D() {
    var _this;

    _this = _MSBarCartesian.call(this) || this;
    _this.isBar = true;
    _this.eiMethods = {
      scrollTo: _scrollApis.scrollTo
    };
    _this.hasScroll = true;

    _this.registerFactory('dataset', _multiseriesDataset.default, ['vCanvas']);

    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = ScrollBar2D.prototype;

  _proto.getName = function getName() {
    return 'ScrollBar2D';
  }
  /**
   * This method return the dataset definations for this charts
   * @return {Object} dataset
   */
  ;

  _proto.getDSdef = function getDSdef() {
    return _bar2d.default;
  }
  /** This method return the dataset-group definations for this charts
    * @return {Object} dataset group **/
  ;

  _proto.getDSGroupdef = function getDSGroupdef() {
    return _columnMultiseries.default;
  }
  /**
   * Function to create dataset of ScrollBar2D chart.
   * @memberof ScrollBar2D
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSBarCartesian.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = SCROLL_BAR_CHART;
    config.hasLegend = true;
    config.defaultDatasetType = BAR2D_STR;
    config.avgScrollPointWidth = 40;
  }
  /**
   * function to create component and configure and also configure the chart
   * It creates components which are depend on data and configure them and also configure chart
   * It calls helper function namely, configure
   * @param  {Object} dataObj contains json data of the chart
   */
  ;

  _proto.configureAttributes = function configureAttributes(dataObj) {
    _MSBarCartesian.prototype.configureAttributes.call(this, dataObj);

    _scrollApis.configurer.call(this, dataObj);
  }
  /**
   * Sets xAxis scale visible region
   */
  ;

  _proto._setAxisScale = function _setAxisScale() {
    _scrollApis.setAxisScale.call(this, BAR2D_STR);
  }
  /**
   * Reset view port
   */
  ;

  _proto._resetViewPortConfig = function _resetViewPortConfig() {
    _scrollApis.resetViewPortConfig.call(this);
  };

  return ScrollBar2D;
}(_msbarcartesian.default);

var _default = ScrollBar2D;
exports["default"] = _default;

/***/ }),

/***/ 694:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _mscolumn2d = _interopRequireDefault(__webpack_require__(695));

var _column = _interopRequireDefault(__webpack_require__(595));

var _columnMultiseries = _interopRequireDefault(__webpack_require__(689));

var _scrollApis = __webpack_require__(690);

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var CHART_STR = 'Scrollable Multi-series Column Chart',
    COLUMN_STR = 'column',
    PLOT_STR = 'plot';
/**
 * Creates ScrollColumn2D class
 */

var ScrollColumn2D = /*#__PURE__*/function (_MScolumn2D) {
  (0, _inheritsLoose2.default)(ScrollColumn2D, _MScolumn2D);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  ScrollColumn2D.getName = function getName() {
    return 'ScrollColumn2D';
  }
  /**
   * Function to state if inputOptions are to be used for this charts
   * @return {Array} value
   */
  ;

  ScrollColumn2D.includeInputOptions = function includeInputOptions() {
    return ['SwipeGesture'];
  }
  /**
   * Constructor fn of ScrollColumn2D class
   */
  ;

  function ScrollColumn2D() {
    var _this;

    _this = _MScolumn2D.call(this) || this;
    _this.tooltipConstraint = PLOT_STR;
    _this.hasScroll = true;
    _this.defaultPlotShadow = 1;
    _this.binSize = 0;
    _this.eiMethods.scrollTo = _scrollApis.scrollTo;
    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = ScrollColumn2D.prototype;

  _proto.getName = function getName() {
    return 'ScrollColumn2D';
  }
  /**
   * Sets default configuration
   * @memberof ScrollColumn2D
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MScolumn2D.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.defaultDatasetType = COLUMN_STR;
    config.showzeroplaneontop = 1;
    config.friendlyName = CHART_STR;
    config.avgScrollPointWidth = 40;
    config.canvasborderthickness = 1;
  }
  /**
   * function to create component and configure and also configure the chart
   * It creates components which are depend on data and configure them and also configure chart
   * It calls helper function namely, configure
   * @param  {Object} dataObj contains json data of the chart
   */
  ;

  _proto.configureAttributes = function configureAttributes(dataObj) {
    _MScolumn2D.prototype.configureAttributes.call(this, dataObj);

    _scrollApis.configurer.call(this, dataObj);
  }
  /**
   * Sets xAxis scale visible region
   */
  ;

  _proto._setAxisScale = function _setAxisScale() {
    _scrollApis.setAxisScale.call(this);
  }
  /**
   * Parse the chart attributes and store in chart's config
   * @param {Object} dataObj User input json
   */
  ;

  _proto.parseChartAttr = function parseChartAttr(dataObj) {
    _MScolumn2D.prototype.parseChartAttr.call(this, dataObj); // this.config.drawTrendRegion = 0;

  }
  /**
   * Reset view port
   */
  ;

  _proto._resetViewPortConfig = function _resetViewPortConfig() {
    _scrollApis.resetViewPortConfig.call(this);
  }
  /**
   * Returns dataset class
   * @return {class} returns ColumnDataset class
   */
  ;

  _proto.getDSdef = function getDSdef() {
    return _column.default;
  }
  /**
   * Returns dataset group class
   * @return {class} returns Columngroup class
   */
  ;

  _proto.getDSGroupdef = function getDSGroupdef() {
    return _columnMultiseries.default;
  };

  return ScrollColumn2D;
}(_mscolumn2d.default);

var _default = ScrollColumn2D;
exports["default"] = _default;

/***/ }),

/***/ 692:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _scrollarea2d = _interopRequireDefault(__webpack_require__(693));

var _column = _interopRequireDefault(__webpack_require__(595));

var _area = _interopRequireDefault(__webpack_require__(617));

var _line = _interopRequireDefault(__webpack_require__(616));

var _mssplinearea = _interopRequireDefault(__webpack_require__(683));

var _msspline = _interopRequireDefault(__webpack_require__(687));

var _columnMultiseries = _interopRequireDefault(__webpack_require__(689));

var _combiDualYDataset = _interopRequireDefault(__webpack_require__(670));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var UNDEFINED,
    CHART_STR = 'Scrollable Combination Chart',
    COLUMN_STR = 'column';
/**
 * Creates ScrollCombi2D class
 */

var ScrollCombi2D = /*#__PURE__*/function (_ScrollArea2D) {
  (0, _inheritsLoose2.default)(ScrollCombi2D, _ScrollArea2D);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  ScrollCombi2D.getName = function getName() {
    return 'ScrollCombi2D';
  }
  /**
   * Constructor fn of ScrollCombi2D class
   */
  ;

  function ScrollCombi2D() {
    var _this;

    _this = _ScrollArea2D.call(this) || this;
    _this.hasScroll = true;
    _this.defaultPlotShadow = 1;

    _this.registerFactory('dataset', _combiDualYDataset.default, ['vCanvas']);

    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = ScrollCombi2D.prototype;

  _proto.getName = function getName() {
    return 'ScrollCombi2D';
  }
  /**
   * Sets default chart configuration
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _ScrollArea2D.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = CHART_STR;
    config.defaultDatasetType = COLUMN_STR;
    config.zeroplanethickness = 1;
    config.zeroplanealpha = 80;
    config.enablemousetracking = true;
    config.showzeroplaneontop = 0;
    config.defaultcrosslinethickness = null;
    config.avgScrollPointWidth = 40;
    config.canvasborderthickness = 1;
  }
  /**
   * This method return the dataset definations for this charts
   * @param  {string} name type of dataset class
   * @return {Object}      dataset class
   */
  ;

  _proto.getDSdef = function getDSdef(name) {
    if (name === 'splinearea') {
      return _mssplinearea.default;
    } else if (name === 'spline') {
      return _msspline.default;
    } else if (name === 'area') {
      return _area.default;
    } else if (name === 'line') {
      return _line.default;
    }

    return _column.default;
  }
  /**
   * This method return the dataset-group definations for this charts
   * @param  {string} name is type of dataset group
   * @return {Object} <dataset group class>     dataset group class
   */
  ;

  _proto.getDSGroupdef = function getDSGroupdef(name) {
    return name === 'column' ? _columnMultiseries.default : UNDEFINED;
  }
  /**
   * function to return dataset type applicable for this chart
   * @param   {string}  name  dataset type
   * @return  {string}        dataset type applicable for this chart
   */
  ;

  _proto.getDSType = function getDSType(name) {
    if (name === void 0) {
      name = '';
    }

    if (name.toLowerCase() === 'splinearea') {
      return 'splinearea';
    } else if (name.toLowerCase() === 'spline') {
      return 'spline';
    } else if (name.toLowerCase() === 'area') {
      return 'area';
    } else if (name.toLowerCase() === 'line') {
      return 'line';
    }

    return 'column';
  };

  return ScrollCombi2D;
}(_scrollarea2d.default);

var _default = ScrollCombi2D;
exports["default"] = _default;

/***/ }),

/***/ 681:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _mscombidy2d = _interopRequireDefault(__webpack_require__(682));

var _scrollApis = __webpack_require__(690);

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var CHART_STR = 'Scrollable Dual Y-Axis Combination Chart',
    COLUMN_STR = 'column';
/**
 * Creates ScrollCombiDy2D class
 */

var ScrollCombiDy2D = /*#__PURE__*/function (_MSCombidy2D) {
  (0, _inheritsLoose2.default)(ScrollCombiDy2D, _MSCombidy2D);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  ScrollCombiDy2D.getName = function getName() {
    return 'ScrollCombiDy2D';
  }
  /**
   * Function to state if inputOptions are to be used for this charts
   * @return {Array} value
   */
  ;

  ScrollCombiDy2D.includeInputOptions = function includeInputOptions() {
    return ['SwipeGesture'];
  }
  /**
   * Constructor fn of class ScrollCombiDy2D
   */
  ;

  function ScrollCombiDy2D() {
    var _this;

    _this = _MSCombidy2D.call(this) || this;
    _this.hasScroll = true;
    _this.eiMethods = {
      'scrollTo': _scrollApis.scrollTo
    };
    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = ScrollCombiDy2D.prototype;

  _proto.getName = function getName() {
    return 'ScrollCombiDy2D';
  }
  /**
   * Sets default configuration
   * @memberof ScrollCombiDy2D
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSCombidy2D.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = CHART_STR;
    config.defaultDatasetType = COLUMN_STR;
    config.showzeroplaneontop = 0;
    config.avgScrollPointWidth = 40;
    config.canvasborderthickness = 1;
  }
  /**
   * function to create component and configure and also configure the chart
   * It creates components which are depend on data and configure them and also configure chart
   * It calls helper function namely, configure
   * @param  {Object} dataObj contains json data of the chart
   */
  ;

  _proto.configureAttributes = function configureAttributes(dataObj) {
    _MSCombidy2D.prototype.configureAttributes.call(this, dataObj);

    _scrollApis.configurer.call(this, dataObj);
  }
  /**
   * Sets xAxis scale visible region
   */
  ;

  _proto._setAxisScale = function _setAxisScale() {
    _scrollApis.setAxisScale.call(this);
  }
  /**
   * Reset view port
   */
  ;

  _proto._resetViewPortConfig = function _resetViewPortConfig() {
    _scrollApis.resetViewPortConfig.call(this);
  };

  return ScrollCombiDy2D;
}(_mscombidy2d.default);

var _default = ScrollCombiDy2D;
exports["default"] = _default;

/***/ }),

/***/ 713:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _scrollarea2d = _interopRequireDefault(__webpack_require__(693));

var _line = _interopRequireDefault(__webpack_require__(616));

var CHART_STR = 'Scrollable Multi-series Line Chart',
    LINE_STR = 'line';
/**
 * Creates ScrollLine2D class
 */

var UNDEF;

var ScrollLine2D = /*#__PURE__*/function (_ScrollArea2D) {
  (0, _inheritsLoose2.default)(ScrollLine2D, _ScrollArea2D);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  ScrollLine2D.getName = function getName() {
    return 'ScrollLine2D';
  }
  /**
   * Constructor fn of ScrollLine2D class
   */
  ;

  function ScrollLine2D() {
    var _this;

    _this = _ScrollArea2D.call(this) || this;
    _this.defaultPlotShadow = 1;
    _this.binSize = 0;
    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = ScrollLine2D.prototype;

  _proto.getName = function getName() {
    return 'ScrollLine2D';
  }
  /**
   * Sets default chart configuration
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _ScrollArea2D.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = CHART_STR;
    config.defaultDatasetType = LINE_STR;
    config.zeroplanethickness = 1;
    config.zeroplanealpha = 40;
    config.showzeroplaneontop = 0;
    config.enablemousetracking = true;
    config.defaultcrosslinethickness = 1;
    config.avgScrollPointWidth = 75;
    config.canvasborderthickness = 1;
  }
  /** This method return the dataset definations for this charts **/
  ;

  _proto.getDSdef = function getDSdef() {
    return _line.default;
  }
  /** This method return the dataset-group definations for this charts **/
  ;

  _proto.getDSGroupdef = function getDSGroupdef() {
    return UNDEF;
  };

  return ScrollLine2D;
}(_scrollarea2d.default);

var _default = ScrollLine2D;
exports["default"] = _default;

/***/ }),

/***/ 701:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _msstackedcolumn2d = _interopRequireDefault(__webpack_require__(702));

var _scrollApis = __webpack_require__(690);

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var CHART_STR = 'Scrollable MultiSeries Stacked Column Chart',
    COLUMN_STR = 'column';
/**
 * Creates ScrollMSStackedColumn2D class
 */

var ScrollMSStackedColumn2D = /*#__PURE__*/function (_MSStackedColumn2d) {
  (0, _inheritsLoose2.default)(ScrollMSStackedColumn2D, _MSStackedColumn2d);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  ScrollMSStackedColumn2D.getName = function getName() {
    return 'ScrollMSStackedColumn2D';
  }
  /**
   * Function to state if inputOptions are to be used for this charts
   * @return {Array} value
   */
  ;

  ScrollMSStackedColumn2D.includeInputOptions = function includeInputOptions() {
    return ['SwipeGesture'];
  }
  /**
   * Constructor fn of class ScrollCombiDy2D
   */
  ;

  function ScrollMSStackedColumn2D() {
    var _this;

    _this = _MSStackedColumn2d.call(this) || this;
    _this.hasScroll = true;
    _this.eiMethods = {
      'scrollTo': _scrollApis.scrollTo
    };
    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = ScrollMSStackedColumn2D.prototype;

  _proto.getName = function getName() {
    return 'ScrollMSStackedColumn2D';
  }
  /**
   * Sets default configuration
   * @memberof ScrollMSStackedColumn2D
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSStackedColumn2d.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.isstacked = true;
    config.friendlyName = CHART_STR;
    config.defaultDatasetType = COLUMN_STR;
    config.showzeroplaneontop = 1;
    config.avgScrollPointWidth = 75;
    config.canvasborderthickness = 1;
  }
  /**
   * function to create component and configure and also configure the chart
   * It creates components which are depend on data and configure them and also configure chart
   * It calls helper function namely, configure
   * @param  {Object} dataObj contains json data of the chart
   */
  ;

  _proto.configureAttributes = function configureAttributes(dataObj) {
    _MSStackedColumn2d.prototype.configureAttributes.call(this, dataObj);

    _scrollApis.configurer.call(this, dataObj);
  };

  return ScrollMSStackedColumn2D;
}(_msstackedcolumn2d.default);
/**
* Sets xAxis scale visible region
*/


ScrollMSStackedColumn2D.prototype._setAxisScale = _scrollApis.setAxisScale;
/**
* Reset view port
*/

ScrollMSStackedColumn2D.prototype._resetViewPortConfig = _scrollApis.resetViewPortConfig;
var _default = ScrollMSStackedColumn2D;
exports["default"] = _default;

/***/ }),

/***/ 705:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _msstackedcolumn2dlinedy = _interopRequireDefault(__webpack_require__(706));

var _scrollApis = __webpack_require__(690);

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var CHART_STR = 'Scrollable Multi-series Dual Y-Axis Stacked Column and Line Chart',
    COLUMN_STR = 'column',
    LINE_STR = 'line';
/**
 * Creates ScrollMSStackedColumn2DLineDY class
 */

var ScrollMSStackedColumn2DLineDY = /*#__PURE__*/function (_MSStackedColumn2dLin) {
  (0, _inheritsLoose2.default)(ScrollMSStackedColumn2DLineDY, _MSStackedColumn2dLin);

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  ScrollMSStackedColumn2DLineDY.getName = function getName() {
    return 'ScrollMSStackedColumn2DLineDY';
  }
  /**
   * Function to state if inputOptions are to be used for this charts
   * @return {Array} value
   */
  ;

  ScrollMSStackedColumn2DLineDY.includeInputOptions = function includeInputOptions() {
    return ['SwipeGesture'];
  }
  /**
   * Constructor fn of class ScrollCombiDy2D
   */
  ;

  function ScrollMSStackedColumn2DLineDY() {
    var _this;

    _this = _MSStackedColumn2dLin.call(this) || this;
    _this.hasScroll = true;
    _this.eiMethods = {
      'scrollTo': _scrollApis.scrollTo
    };
    return _this;
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */


  var _proto = ScrollMSStackedColumn2DLineDY.prototype;

  _proto.getName = function getName() {
    return 'ScrollMSStackedColumn2DLineDY';
  }
  /**
   * Sets default configuration
   * @memberof ScrollMSStackedColumn2DLineDY
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSStackedColumn2dLin.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.isstacked = true;
    config.friendlyName = CHART_STR;
    config.defaultDatasetType = COLUMN_STR;
    config.sDefaultDatasetType = LINE_STR;
    config.showzeroplaneontop = 1;
    config.avgScrollPointWidth = 75;
    config.canvasborderthickness = 1;
  }
  /**
   * function to create component and configure and also configure the chart
   * It creates components which are depend on data and configure them and also configure chart
   * It calls helper function namely, configure
   * @param  {Object} dataObj contains json data of the chart
   */
  ;

  _proto.configureAttributes = function configureAttributes(dataObj) {
    _MSStackedColumn2dLin.prototype.configureAttributes.call(this, dataObj);

    _scrollApis.configurer.call(this, dataObj);
  }
  /**
   * Sets xAxis scale visible region
   */
  ;

  _proto._setAxisScale = function _setAxisScale() {
    _scrollApis.setAxisScale.call(this);
  }
  /**
   * Reset view port
   */
  ;

  _proto._resetViewPortConfig = function _resetViewPortConfig() {
    _scrollApis.resetViewPortConfig.call(this);
  };

  return ScrollMSStackedColumn2DLineDY;
}(_msstackedcolumn2dlinedy.default);
/**
* Sets xAxis scale visible region
*/


ScrollMSStackedColumn2DLineDY.prototype._setAxisScale = _scrollApis.setAxisScale;
/**
* Reset view port
*/

ScrollMSStackedColumn2DLineDY.prototype._resetViewPortConfig = _scrollApis.resetViewPortConfig;
var _default = ScrollMSStackedColumn2DLineDY;
exports["default"] = _default;

/***/ }),

/***/ 709:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _scrollbar2d = _interopRequireDefault(__webpack_require__(710));

var _cartesianStack = _interopRequireDefault(__webpack_require__(698));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var CHART_STR = 'Scrollable Stacked Bar Chart';
/**
 * Creates ScrollStackedBar2D class
 */

var ScrollStackedBar2D = /*#__PURE__*/function (_ScrollBar2D) {
  (0, _inheritsLoose2.default)(ScrollStackedBar2D, _ScrollBar2D);

  function ScrollStackedBar2D() {
    return _ScrollBar2D.apply(this, arguments) || this;
  }

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  ScrollStackedBar2D.getName = function getName() {
    return 'ScrollStackedBar2D';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  var _proto = ScrollStackedBar2D.prototype;

  _proto.getName = function getName() {
    return 'ScrollStackedBar2D';
  }
  /**
   * Sets default chart configuration
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _ScrollBar2D.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = CHART_STR;
    config.isstacked = true;
    config.avgScrollPointWidth = 75;
    config.canvasborderthickness = 1;
    config.showSum = 0;
  }
  /**
   * Return Dataset Group class
   * @return {Class} CartesianStackGroup class
   */
  ;

  _proto.getDSGroupdef = function getDSGroupdef() {
    return _cartesianStack.default;
  };

  return ScrollStackedBar2D;
}(_scrollbar2d.default);

var _default = ScrollStackedBar2D;
exports["default"] = _default;

/***/ }),

/***/ 697:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _scrollcolumn2d = _interopRequireDefault(__webpack_require__(694));

var _cartesianStack = _interopRequireDefault(__webpack_require__(698));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var CHART_STR = 'Scrollable Stacked Column Chart';
/**
 * Creates ScrollStackedColumn2D class
 */

var ScrollStackedColumn2D = /*#__PURE__*/function (_ScrollColumn2D) {
  (0, _inheritsLoose2.default)(ScrollStackedColumn2D, _ScrollColumn2D);

  function ScrollStackedColumn2D() {
    return _ScrollColumn2D.apply(this, arguments) || this;
  }

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  ScrollStackedColumn2D.getName = function getName() {
    return 'ScrollStackedColumn2D';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  var _proto = ScrollStackedColumn2D.prototype;

  _proto.getName = function getName() {
    return 'ScrollStackedColumn2D';
  }
  /**
   * Sets default chart configuration
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _ScrollColumn2D.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = CHART_STR;
    config.isstacked = true;
    config.showSum = 0;
    config.canvasborderthickness = 1;
    config.avgScrollPointWidth = 75;
  }
  /**
   * Return Dataset Group class
   * @return {Class} CartesianStackGroup class
   */
  ;

  _proto.getDSGroupdef = function getDSGroupdef() {
    return _cartesianStack.default;
  };

  return ScrollStackedColumn2D;
}(_scrollcolumn2d.default);

var _default = ScrollStackedColumn2D;
exports["default"] = _default;

/***/ }),

/***/ 738:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _msarea = _interopRequireDefault(__webpack_require__(739));

var _cartesianStack = _interopRequireDefault(__webpack_require__(698));

var _lib = __webpack_require__(274);

var _pluckNumber = _interopRequireDefault(__webpack_require__(280));

var CHART_STR = 'Stacked Area Chart';

var StackedArea2D = /*#__PURE__*/function (_MSArea) {
  (0, _inheritsLoose2.default)(StackedArea2D, _MSArea);

  function StackedArea2D() {
    return _MSArea.apply(this, arguments) || this;
  }

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  StackedArea2D.getName = function getName() {
    return 'StackedArea2D';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  var _proto = StackedArea2D.prototype;

  _proto.getName = function getName() {
    return 'StackedArea2D';
  };

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSArea.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = CHART_STR;
    config.plotfillalpha = _lib.HUNDREDSTRING;
    config.showSum = 0;
    config.isstacked = 1; // for realtime stacked area and stacked area chart api the overlapping of sum labels
    // has been fixed and this has been used to reduce the affected subset

    this.addToEnv('useImprovedLabelPlacement', true); // The border is a line
    // Anchor must be at higher position than border

    this.addToEnv('useLinePlotGroupForAnchorPlacement', true);
  };

  _proto.configureAttributes = function configureAttributes(rawAttr) {
    _MSArea.prototype.configureAttributes.call(this, rawAttr);

    var config = this.config,
        chartAttrs = this.getFromEnv('chart-attrib');
    config.showSum = (0, _pluckNumber.default)(chartAttrs.showsum, config.showSum); // if show sum is on then default value position will be below for better visual

    if (config.showSum) {
      config.valueposition = (0, _lib.parseUnsafeString)((0, _lib.pluck)(chartAttrs.valueposition, 'below'));
    }
  }
  /** This method return the dataset-group definations for this charts **/
  ;

  _proto.getDSGroupdef = function getDSGroupdef() {
    return _cartesianStack.default;
  };

  return StackedArea2D;
}(_msarea.default);

var _default = StackedArea2D;
exports["default"] = _default;

/***/ }),

/***/ 801:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _cartesianStack = _interopRequireDefault(__webpack_require__(698));

var _line = _interopRequireDefault(__webpack_require__(616));

var _area = _interopRequireDefault(__webpack_require__(617));

var _stackedcolumn2dlinedy = _interopRequireDefault(__webpack_require__(799));

var _lib = __webpack_require__(274);

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var UNDEF,
    CHART_STR = 'Stacked 2D Area and Line Chart',
    LINE_STR = 'line',
    AREA_STR = 'area';
/**
 * Creates class for StackedArea2DLineDy
 */

var StackedArea2DLineDy = /*#__PURE__*/function (_StackedColumn2DLineD) {
  (0, _inheritsLoose2.default)(StackedArea2DLineDy, _StackedColumn2DLineD);

  function StackedArea2DLineDy() {
    return _StackedColumn2DLineD.apply(this, arguments) || this;
  }

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  StackedArea2DLineDy.getName = function getName() {
    return 'StackedArea2DLineDy';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  var _proto = StackedArea2DLineDy.prototype;

  _proto.getName = function getName() {
    return 'StackedArea2DLineDy';
  }
  /**
   * Sets default configuration of chart elements
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _StackedColumn2DLineD.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = CHART_STR;
    config.plotfillalpha = _lib.HUNDREDSTRING;
    config.isstacked = 1;
    config.defaultDatasetType = AREA_STR;
    config.stack100percent = 0;
    config.defaultcrosslinethickness = 1; // for realtime stacked area and stacked area chart api the overlapping of sum labels
    // has been fixed and this has been used to reduce the affected subset

    this.addToEnv('useImprovedLabelPlacement', true); // The border is a line
    // Anchor must be at higher position than border

    this.addToEnv('useLinePlotGroupForAnchorPlacement', true);
  };

  _proto.getDSdef = function getDSdef(name) {
    return name === LINE_STR ? _line.default : _area.default;
  };

  _proto.getDSGroupdef = function getDSGroupdef(name) {
    return name === AREA_STR ? _cartesianStack.default : UNDEF;
  };

  _proto.getDSType = function getDSType(name) {
    if (name === void 0) {
      name = '';
    }

    if (name.toLowerCase() === LINE_STR) {
      return LINE_STR;
    }

    return AREA_STR;
  };

  return StackedArea2DLineDy;
}(_stackedcolumn2dlinedy.default);

var _default = StackedArea2DLineDy;
exports["default"] = _default;

/***/ }),

/***/ 747:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _msbar2d = _interopRequireDefault(__webpack_require__(734));

var _cartesianStack = _interopRequireDefault(__webpack_require__(698));

var CHART_STR = 'Stacked Bar Chart';

var StackedBar2D = /*#__PURE__*/function (_MSBar2D) {
  (0, _inheritsLoose2.default)(StackedBar2D, _MSBar2D);

  function StackedBar2D() {
    return _MSBar2D.apply(this, arguments) || this;
  }

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  StackedBar2D.getName = function getName() {
    return 'StackedBar2D';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  var _proto = StackedBar2D.prototype;

  _proto.getName = function getName() {
    return 'StackedBar2D';
  };

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSBar2D.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = CHART_STR;
    config.enablemousetracking = true;
    config.maxbarheight = 50;
    config.isstacked = true;
    config.showSum = 0;
  }
  /** This method return the dataset-group definations for this charts **/
  ;

  _proto.getDSGroupdef = function getDSGroupdef() {
    return _cartesianStack.default;
  };

  return StackedBar2D;
}(_msbar2d.default);

var _default = StackedBar2D;
exports["default"] = _default;

/***/ }),

/***/ 742:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _msbar3d = _interopRequireDefault(__webpack_require__(743));

var _cartesianStack = _interopRequireDefault(__webpack_require__(698));

var _bar3d = _interopRequireDefault(__webpack_require__(645));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var CHART_STR = '3D Stacked Bar Chart';
/**
 * Creates class StackedBar3D
 */

var StackedBar3D = /*#__PURE__*/function (_MSBar3D) {
  (0, _inheritsLoose2.default)(StackedBar3D, _MSBar3D);

  function StackedBar3D() {
    return _MSBar3D.apply(this, arguments) || this;
  }

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  StackedBar3D.getName = function getName() {
    return 'StackedBar3D';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  var _proto = StackedBar3D.prototype;

  _proto.getName = function getName() {
    return 'StackedBar3D';
  }
  /**
   * parse defualt configuration of the chart
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSBar3D.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = CHART_STR;
    config.enablemousetracking = true;
    config.maxbarheight = 50;
    config.isstacked = true;
    config.showSum = 0;
  }
  /**
   * This method return the dataset-group definations for this charts
   * @return {Object} Multiseries bar group definition
   * @memberof StackedBar3D
   */
  ;

  _proto.getDSdef = function getDSdef() {
    return _bar3d.default;
  }
  /**
   * This method return the dataset-group definations for this charts
   * @return {Object}       Multiseries column group definition
   */
  ;

  _proto.getDSGroupdef = function getDSGroupdef() {
    return _cartesianStack.default;
  };

  return StackedBar3D;
}(_msbar3d.default);

var _default = StackedBar3D;
exports["default"] = _default;

/***/ }),

/***/ 753:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _mscolumn2d = _interopRequireDefault(__webpack_require__(695));

var _column = _interopRequireDefault(__webpack_require__(595));

var _cartesianStack = _interopRequireDefault(__webpack_require__(698));

var CHART_STR = 'Stacked Column Chart';

var StackedColumn2D = /*#__PURE__*/function (_MSColumn2D) {
  (0, _inheritsLoose2.default)(StackedColumn2D, _MSColumn2D);

  function StackedColumn2D() {
    return _MSColumn2D.apply(this, arguments) || this;
  }

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  StackedColumn2D.getName = function getName() {
    return 'StackedColumn2D';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  var _proto = StackedColumn2D.prototype;

  _proto.getName = function getName() {
    return 'StackedColumn2D';
  };

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSColumn2D.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = CHART_STR;
    config.isstacked = true;
    config.showSum = 0;
  }
  /** This method return the dataset definations for this charts **/
  ;

  _proto.getDSdef = function getDSdef() {
    return _column.default;
  }
  /** This method return the dataset-group definations for this charts **/
  ;

  _proto.getDSGroupdef = function getDSGroupdef() {
    return _cartesianStack.default;
  };

  return StackedColumn2D;
}(_mscolumn2d.default);

var _default = StackedColumn2D;
exports["default"] = _default;

/***/ }),

/***/ 768:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _mscombi2d = _interopRequireDefault(__webpack_require__(769));

var _column = _interopRequireDefault(__webpack_require__(595));

var _line = _interopRequireDefault(__webpack_require__(616));

var _msspline = _interopRequireDefault(__webpack_require__(687));

var _cartesianStack = _interopRequireDefault(__webpack_require__(698));

var UNDEFINED,
    CHART_STR = 'Stacked Column and Line Chart',
    COLUMN_STR = 'column';

var StackedColumn2DLine = /*#__PURE__*/function (_MSCombi2D) {
  (0, _inheritsLoose2.default)(StackedColumn2DLine, _MSCombi2D);

  function StackedColumn2DLine() {
    return _MSCombi2D.apply(this, arguments) || this;
  }

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  StackedColumn2DLine.getName = function getName() {
    return 'StackedColumn2DLine';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  var _proto = StackedColumn2DLine.prototype;

  _proto.getName = function getName() {
    return 'StackedColumn2DLine';
  };

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSCombi2D.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = CHART_STR;
    config.defaultDatasetType = COLUMN_STR;
    config.isstacked = true;
    config.stack100percent = 0;
    config.enablemousetracking = true;
    config.showSum = 0;
  }
  /**
   * This method return the dataset definations for this charts
   * @param  {string} name type of dataset class
   * @return {Object}      dataset class
   */
  ;

  _proto.getDSdef = function getDSdef(name) {
    if (name === 'spline') {
      return _msspline.default;
    } else if (name === 'line') {
      return _line.default;
    }

    return _column.default;
  }
  /**
   * This method return the dataset-group definations for this charts
   * @param  {string} name is type of dataset group
   * @return {Object} <dataset group class>     dataset group class
   */
  ;

  _proto.getDSGroupdef = function getDSGroupdef(name) {
    return name === 'column' ? _cartesianStack.default : UNDEFINED;
  }
  /**
   * function to return dataset type applicable for this chart
   * @param   {string}  name  dataset type
   * @return  {string}        dataset type applicable for this chart
   */
  ;

  _proto.getDSType = function getDSType(name) {
    if (name === void 0) {
      name = '';
    }

    if (name.toLowerCase() === 'line') {
      return 'line';
    }

    return 'column';
  };

  return StackedColumn2DLine;
}(_mscombi2d.default);

var _default = StackedColumn2DLine;
exports["default"] = _default;

/***/ }),

/***/ 799:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _lib = __webpack_require__(274);

var _cartesianStack = _interopRequireDefault(__webpack_require__(698));

var _line = _interopRequireDefault(__webpack_require__(616));

var _column = _interopRequireDefault(__webpack_require__(595));

var _msdybasecartesian = _interopRequireDefault(__webpack_require__(668));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var CHART_STR = 'Stacked 2D Column and Line Chart',
    LINE_STR = 'line',
    COLUMN_STR = 'column',
    SEVENTYSTRING = _lib.preDefStr.SEVENTYSTRING;
/**
 * Creates class for StackedColumn2DLineDy
 */

var StackedColumn2DLineDy = /*#__PURE__*/function (_MSDyBaseCartesian) {
  (0, _inheritsLoose2.default)(StackedColumn2DLineDy, _MSDyBaseCartesian);

  function StackedColumn2DLineDy() {
    return _MSDyBaseCartesian.apply(this, arguments) || this;
  }

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  StackedColumn2DLineDy.getName = function getName() {
    return 'StackedColumn2DLineDy';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  var _proto = StackedColumn2DLineDy.prototype;

  _proto.getName = function getName() {
    return 'StackedColumn2DLineDy';
  }
  /**
   * Sets default configuration of chart elements
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSDyBaseCartesian.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = CHART_STR;
    config.sDefaultDatasetType = LINE_STR;
    config.friendlyName = CHART_STR;
    config.defaultDatasetType = COLUMN_STR;
    config.isdual = true;
    config.isstacked = true;
    config.enablemousetracking = true;
    config.stack100percent = 0;
    config.showSum = 0; // Anchor related attributes

    config.anchorborderthickness = 1;
    config.anchorimageurl = _lib.UNDEF;
    config.anchorimagepadding = 1;
    config.anchorsides = 1;
    config.anchoralpha = _lib.UNDEF;
    config.anchorbgalpha = _lib.HUNDREDSTRING;
    config.anchorimagealpha = _lib.HUNDREDSTRING;
    config.anchorimagescale = 100;
    config.anchorstartangle = 90;
    config.anchorshadow = 0;
    config.anchorbgcolor = _lib.UNDEF;
    config.anchorbordercolor = _lib.UNDEF;
    config.anchorradius = 3;
    config.showvalues = 1;
    config.plotfillalpha = SEVENTYSTRING;
    config.linedashlen = 5;
    config.linedashgap = 4;
    config.linedashed = _lib.UNDEF;
    config.linealpha = _lib.HUNDREDSTRING;
    config.linethickness = 2;
    config.drawfullareaborder = 1;
    config.connectnulldata = 0;
    config.showzeroplaneontop = 0;
  };

  _proto.getDSdef = function getDSdef(name) {
    return name === LINE_STR ? _line.default : _column.default;
  };

  _proto.getDSGroupdef = function getDSGroupdef(name) {
    return name === COLUMN_STR ? _cartesianStack.default : _lib.UNDEF;
  };

  _proto.getDSType = function getDSType(name) {
    if (name === void 0) {
      name = '';
    }

    if (name.toLowerCase() === LINE_STR) {
      return LINE_STR;
    }

    return COLUMN_STR;
  };

  return StackedColumn2DLineDy;
}(_msdybasecartesian.default);

var _default = StackedColumn2DLineDy;
exports["default"] = _default;

/***/ }),

/***/ 749:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _mscolumn3d = _interopRequireDefault(__webpack_require__(750));

var _column3d = _interopRequireDefault(__webpack_require__(611));

var _cartesianStack = _interopRequireDefault(__webpack_require__(698));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var CHART_STR = '3D Stacked Column Chart';
/**
 * Creates class for StackedColumn3D
 */

var StackedColumn3D = /*#__PURE__*/function (_MSColumn3D) {
  (0, _inheritsLoose2.default)(StackedColumn3D, _MSColumn3D);

  function StackedColumn3D() {
    return _MSColumn3D.apply(this, arguments) || this;
  }

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  StackedColumn3D.getName = function getName() {
    return 'StackedColumn3D';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  var _proto = StackedColumn3D.prototype;

  _proto.getName = function getName() {
    return 'StackedColumn3D';
  }
  /**
   * parse defualt configuration of the chart
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSColumn3D.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.friendlyName = CHART_STR;
    config.showSum = 0; //  config.showplotborder = 0;

    config.maxbarheight = 50;
    config.enablemousetracking = true;
    config.isstacked = true;
  }
  /**
   * This method return the dataset definations for this charts
   * @return {Object} Column Dataset definition
   */
  ;

  _proto.getDSdef = function getDSdef() {
    return _column3d.default;
  }
  /**
   * This method return the dataset-group definations for this charts
   * @return {Object}       Multiseries column group definition
   */
  ;

  _proto.getDSGroupdef = function getDSGroupdef() {
    return _cartesianStack.default;
  };

  return StackedColumn3D;
}(_mscolumn3d.default);

var _default = StackedColumn3D; //  export { _mouseEvtHandler };

exports["default"] = _default;

/***/ }),

/***/ 765:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _mscombi3d = _interopRequireDefault(__webpack_require__(766));

var _column3d = _interopRequireDefault(__webpack_require__(611));

var _line = _interopRequireDefault(__webpack_require__(616));

var _cartesianStack = _interopRequireDefault(__webpack_require__(698));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var CHART_STR = 'Stacked 3D Column and Line Chart';
/**
 * Creates class for StackedColumn3DLine
 */

var UNDEF;

var StackedColumn3DLine = /*#__PURE__*/function (_MSCombi3D) {
  (0, _inheritsLoose2.default)(StackedColumn3DLine, _MSCombi3D);

  function StackedColumn3DLine() {
    return _MSCombi3D.apply(this, arguments) || this;
  }

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  StackedColumn3DLine.getName = function getName() {
    return 'StackedColumn3DLine';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  var _proto = StackedColumn3DLine.prototype;

  _proto.getName = function getName() {
    return 'StackedColumn3DLine';
  }
  /**
   * Sets default configuration of chart elements
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSCombi3D.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.is3D = true;
    config.friendlyName = CHART_STR;
    config.use3dlineshift = 1;
    config.isstacked = true;
    config.stack100percent = 0;
    config.showplotborder = 0;
    config.enablemousetracking = true;
    config.showSum = 0;
  }
  /**
   * This method return the dataset definations for this charts
   * @param  {string} name type of dataset class
   * @return {Object}      dataset class
   */
  ;

  _proto.getDSdef = function getDSdef(name) {
    return name === 'line' ? _line.default : _column3d.default;
  }
  /**
   * This method return the dataset-group definations for this charts
   * @param  {string} name is type of dataset group
   * @return {Object} <dataset group class>     dataset group class
   */
  ;

  _proto.getDSGroupdef = function getDSGroupdef(name) {
    return name === 'column' ? _cartesianStack.default : UNDEF;
  }
  /**
   * function to return dataset type applicable for this chart
   * @param   {string}  name  dataset type
   * @return  {string}        dataset type applicable for this chart
   */
  ;

  _proto.getDSType = function getDSType(name) {
    return name && name.toLowerCase() === 'line' ? 'line' : 'column';
  };

  return StackedColumn3DLine;
}(_mscombi3d.default);

var _default = StackedColumn3DLine;
exports["default"] = _default;

/***/ }),

/***/ 756:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _mscolumn3dlinedy = _interopRequireDefault(__webpack_require__(757));

var _cartesianStack = _interopRequireDefault(__webpack_require__(698));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var UNDEF,
    CHART_STR = 'Stacked 3D Column and Line Chart',
    LINE_STR = 'line',
    COLUMN3D_STR = 'column3d';
/**
 * Creates class for StackedColumn3DLineDy
 */

var StackedColumn3DLineDy = /*#__PURE__*/function (_MSColumn3DLineDy) {
  (0, _inheritsLoose2.default)(StackedColumn3DLineDy, _MSColumn3DLineDy);

  function StackedColumn3DLineDy() {
    return _MSColumn3DLineDy.apply(this, arguments) || this;
  }

  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */
  StackedColumn3DLineDy.getName = function getName() {
    return 'StackedColumn3DLineDy';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  var _proto = StackedColumn3DLineDy.prototype;

  _proto.getName = function getName() {
    return 'StackedColumn3DLineDy';
  }
  /**
   * Sets default configuration of chart elements
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSColumn3DLineDy.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.is3D = true;
    config.sDefaultDatasetType = LINE_STR;
    config.friendlyName = CHART_STR;
    config.defaultDatasetType = COLUMN3D_STR;
    config.use3dlineshift = 1;
    config.isdual = true;
    config.isstacked = true;
    config.showplotborder = 0;
    config.enablemousetracking = true;
    config.showSum = 0;
  }
  /**
   * This method return the dataset-group definations for this charts
   * @param  {string} name is type of dataset group
   * @return {Object} <dataset group class>     dataset group class
   */
  ;

  _proto.getDSGroupdef = function getDSGroupdef(name) {
    return name === 'column3d' ? _cartesianStack.default : UNDEF;
  };

  return StackedColumn3DLineDy;
}(_mscolumn3dlinedy.default);

var _default = StackedColumn3DLineDy;
exports["default"] = _default;

/***/ }),

/***/ 612:
/***/ ((__unused_webpack_module, exports) => {



exports.__esModule = true;
exports._checkPointerOverColumn = _checkPointerOverColumn;

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var math = Math,
    mathRound = math.round;
/**
 * function to check if given x,y coordiante is over a column plot or not
 * @param  {number} pX     index of column
 * @param  {number} chartX x co-ordinate
 * @param  {number} chartY y co-ordinate
 * @return {Object}        hovered information
 */

function _checkPointerOverColumn(pX, chartX, chartY) {
  var dataset = this,
      chart = dataset.getFromEnv('chart'),
      chartConfig = chart.config,
      plotBorderThickness = chartConfig.plotborderthickness,
      showPlotBorder = chartConfig.showplotborder,
      dataStore = dataset.components.data,
      pointObj = dataStore[pX],
      pY,
      dx,
      dy,
      hovered,
      halfPlotBorderThickness,
      zDepth = 10,
      xPos,
      yPos,
      width,
      height;

  if (!pointObj) {
    return;
  }

  pY = pointObj.config.setValue; //  if (chartConfig.isstacked && ((pY < 0 && dataset.valueLook) || (pY > 0 && !dataset.valueLook))) {
  //    return;
  //  }

  plotBorderThickness = showPlotBorder ? plotBorderThickness : 0;
  halfPlotBorderThickness = plotBorderThickness / 2;
  halfPlotBorderThickness = halfPlotBorderThickness % 2 === 0 ? halfPlotBorderThickness + 1 : mathRound(halfPlotBorderThickness);

  if (pY !== null) {
    xPos = pointObj._xPos - zDepth;
    width = pointObj._width + zDepth;
    yPos = pointObj._yPos;
    height = pointObj._height + zDepth;
    dx = chartX - xPos + halfPlotBorderThickness;
    dy = chartY - yPos + halfPlotBorderThickness;
    hovered = dx >= 0 && dx <= width + plotBorderThickness && dy >= 0 && dy <= height + plotBorderThickness;

    if (pY >= 0) {
      hovered = hovered ? chartX + chartY - (xPos + yPos) - zDepth > 0 : false;
      hovered = hovered ? chartX + chartY - (xPos + yPos + width + height) + zDepth < 0 : false;
    } else {
      hovered = hovered ? chartX + chartY - (xPos + yPos) - zDepth > 0 : false;
      hovered = hovered ? chartX + chartY - (xPos + yPos + width + height) + zDepth < 0 : false;
    }

    if (hovered) {
      return {
        pointIndex: pX,
        hovered: hovered,
        pointObj: dataStore[pX]
      };
    }
  }
}

/***/ }),

/***/ 646:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _index = _interopRequireDefault(__webpack_require__(641));

var _default = {
  'initial.dataset.bar3D': _index.default['initial.dataset.bar2D'],
  'legendInteraction.dataset.bar3D': _index.default['legendInteraction.dataset.bar2D']
};
exports["default"] = _default;

/***/ }),

/***/ 645:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _column3d = _interopRequireDefault(__webpack_require__(611));

var _bar2d = __webpack_require__(640);

var _dependencyManager = __webpack_require__(282);

var _index = _interopRequireDefault(__webpack_require__(646));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
(0, _dependencyManager.addDep)({
  name: 'bar3DAnimation',
  type: 'animationRule',
  extension: _index.default
});
/**
 * representing bar3d dataset
 */

var Bar3DDataset = /*#__PURE__*/function (_Column3DDataset) {
  (0, _inheritsLoose2.default)(Bar3DDataset, _Column3DDataset);

  function Bar3DDataset() {
    return _Column3DDataset.apply(this, arguments) || this;
  }

  var _proto = Bar3DDataset.prototype;

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
    return 'bar3D';
  }
  /**
   * Helper function of _getHoveredPlot().
   * @param {number} pX index of column
   * @param {number} chartX x co-ordinate
   * @param {number} chartY y co-ordinate
   * @return {Object}        hovered information
   */
  ;

  _proto._checkPointerOverColumn = function _checkPointerOverColumn(pX, chartX, chartY) {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        chartConfig = chart.config,
        plotBorderThickness = chartConfig.plotborderthickness,
        showPlotBorder = chartConfig.showplotborder,
        dataStore = dataset.components.data,
        pointObj = dataStore[pX],
        pY,
        dx,
        dy,
        hovered,
        zDepth = 5,
        xPos,
        yPos,
        width,
        height;

    if (!pointObj) {
      return;
    }

    pY = pointObj.config.setValue; // if (chartConfig.isstacked && ((pY < 0 && dataset.valueLook) || (pY > 0 && !dataset.valueLook))) {
    //   return;
    // }

    plotBorderThickness = showPlotBorder ? plotBorderThickness : 0;

    if (pY !== null) {
      yPos = pointObj._yPos;
      height = pointObj._height + zDepth;
      xPos = pointObj._xPos - zDepth;
      width = pointObj._width + zDepth;
      dx = chartX - xPos;
      dy = chartY - yPos;
      hovered = dx >= 0 && dx <= width + plotBorderThickness && dy >= 0 && dy <= height + plotBorderThickness;

      if (pY >= 0) {
        hovered = hovered ? chartX + chartY - (xPos + yPos) - zDepth > 0 : false;
        hovered = hovered ? chartX + chartY - (xPos + yPos + width + height) + zDepth < 0 : false;
      } else {
        hovered = hovered ? chartX + chartY - (xPos + yPos) - zDepth > 0 : false;
        hovered = hovered ? chartX + chartY - (xPos + yPos + width + height) + zDepth < 0 : false;
      }

      if (hovered) {
        return {
          pointIndex: pX,
          hovered: hovered,
          pointObj: dataStore[pX]
        };
      }
    }
  }
  /**
   * Function that return the nearest plot details
   * @param {number} chartX x-axis position of the mouse cordinate
   * @param {number} chartY x-axis position of the mouse cordinate
   * @return {Object} return an object with details of nearest polt and whether it is hovered or not
   */
  ;

  _proto._getHoveredPlot = function _getHoveredPlot(chartX, chartY) {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        isBar = chart.isBar,
        xAxis = dataset.getFromEnv('xAxis'),
        x,
        pX;
    x = xAxis.getValue(isBar ? chartY : chartX);
    pX = Math.round(x); // Checking for overlap between two cosecutive column plots along x-axis

    return pX - x > 0 ? dataset._checkPointerOverColumn(pX, chartX, chartY) || dataset._checkPointerOverColumn(pX - 1, chartX, chartY) : dataset._checkPointerOverColumn(pX + 1, chartX, chartY) || dataset._checkPointerOverColumn(pX, chartX, chartY);
  }
  /**
   * Function to draw label for every data plot.
   * It calculates where to draw the label for data plot.
   */
  ;

  _proto.drawLabel = function drawLabel() {
    var conf = this.config;

    _bar2d.drawLabel.call(this, conf.scrollMinVal, conf.scrollMaxVal);
  };

  return Bar3DDataset;
}(_column3d.default);

var _default = Bar3DDataset;
exports["default"] = _default;

/***/ }),

/***/ 728:
/***/ ((__unused_webpack_module, exports) => {



exports.__esModule = true;
exports["default"] = void 0;
var _default = {
  'initial.dataset.bubble': function initialDatasetBubble() {
    return {
      'circle.appearing': function circleAppearing(inputJSON) {
        return [{
          initialAttr: {
            cx: inputJSON.attr.cx,
            cy: inputJSON.attr.cy,
            r: 0
          },
          slot: 'plot'
        }];
      },
      'group.appearing': function groupAppearing(inputJSON) {
        if (inputJSON.attr.name === 'label-group') {
          return [{
            initialAttr: {
              opacity: 0
            },
            finalAttr: {
              opacity: 1
            },
            slot: 'final'
          }];
        }

        return [{
          initialAttr: {
            opacity: 1
          },
          finalAttr: {
            opacity: 1
          },
          slot: 'final'
        }];
      },
      '*': null
    };
  }
};
exports["default"] = _default;

/***/ }),

/***/ 727:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _scatter = _interopRequireDefault(__webpack_require__(723));

var _column = __webpack_require__(595);

var _lib = __webpack_require__(274);

var _kdtree = _interopRequireDefault(__webpack_require__(724));

var _dependencyManager = __webpack_require__(282);

var _index = _interopRequireDefault(__webpack_require__(728));

var UNDEF,
    // ROLLOUT = 'DataPlotRollOut',
// hot/tracker threshold in pixels
HTP = _lib.hasTouch ? _lib.TOUCH_THRESHOLD_PIXELS : _lib.CLICK_THRESHOLD_PIXELS,
    // add the tools thats are requared
EVENTARGS = 'eventArgs',
    DEFAULT_MIN_RADIUS_FOR_VALUE = 0,
    // visibleStr = preDefStr.visibleStr,
SETROLLOVERATTR = _lib.preDefStr.setRolloverAttrStr,
    SETROLLOUTATTR = _lib.preDefStr.setRolloutAttrStr,
    ROLLOUT = 'DataPlotRollOut',
    HUNDREDSTRING = '100',
    math = Math,
    mathRound = math.round,
    mathMin = math.min,
    mathMax = math.max; // mathPow = math.pow,
// defined = function (obj) {
//   return obj !== UNDEF && obj !== null;
// };

(0, _dependencyManager.addDep)({
  name: 'bubbleAnimation',
  type: 'animationRule',
  extension: _index.default
});

var BubbleDataset = /*#__PURE__*/function (_ScatterDataset) {
  (0, _inheritsLoose2.default)(BubbleDataset, _ScatterDataset);

  function BubbleDataset() {
    return _ScatterDataset.apply(this, arguments) || this;
  }

  var _proto = BubbleDataset.prototype;

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
    return 'bubble';
  };

  _proto.configureAttributes = function configureAttributes(datasetJSON) {
    if (!datasetJSON) {
      return false;
    }

    this.trimData(datasetJSON);
    this.config.JSONData = datasetJSON;
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        rawDataObj = chart.getFromEnv('dataSource'),
        chartConfig = chart.config,
        chartAttr = rawDataObj.chart,
        JSONData = dataset.config.JSONData,
        conf = dataset.config,
        setDataArr = JSONData.data || [],
        len,
        i,
        dataObj,
        dataStore,
        setColor,
        setAlpha,
        colorM = dataset.getFromEnv('color-manager'),
        index = dataset.index,
        numberFormatter = dataset.getFromEnv('number-formatter'),
        // regressionObj,
    tooltipSepChar = (0, _lib.pluck)((0, _lib.parseUnsafeString)(chartAttr.tooltipsepchar), ', '),
        formatedVal,
        enableAnimation,
        setData,
        config,
        toolText,
        hoverEffects,
        seriesname,
        parserConfig,
        macroIndices,
        label,
        setDisplayValue,
        isHoverColorString,
        hColorsLoop,
        hColorsLen,
        infMin = -Infinity,
        infMax = +Infinity,
        xMax = infMin,
        xMin = infMax,
        yMax = infMin,
        yMin = infMax,
        zMax = infMin,
        zMin = infMax,
        colorObj,
        highLight,
        quickEnabled,
        highlightColors;
    conf.usePattern = (0, _lib.pluckNumber)(chartConfig.usePattern, 0);
    conf.patternType = _column.PATTERN_TYPES.includes(JSONData.patterntype) ? JSONData.patterntype : chartConfig.patternType;
    conf.patternAngle = (0, _lib.pluckNumber)(JSONData.patternangle, chartAttr.patternangle, conf.patternType === _column.PATTERN_TYPES[0] ? 40 : 0);
    conf.patternDensity = (0, _lib.pluckNumber)(JSONData.patterndensity, chartConfig.patternDensity);
    conf.patternSize = (0, _lib.pluckNumber)(JSONData.patternsize, conf.patternType === _column.PATTERN_TYPES[0] ? 2 : 4);
    conf.patternAlpha = (0, _lib.pluckNumber)(JSONData.patternalpha, chartConfig.patternAlpha);
    conf.patternBgColor = (0, _lib.pluck)(JSONData.patternbgcolor, conf.patternBgColor);
    conf.seriesname = (0, _lib.parseUnsafeString)(JSONData.seriesname);
    conf.includeinlegend = (0, _lib.pluckNumber)(JSONData.includeinlegend, conf.seriesname ? 1 : 0);
    conf.anchorBgColor = (0, _lib.getFirstColor)((0, _lib.pluck)(JSONData.color, JSONData.plotfillcolor, chartAttr.plotfillcolor, colorM.getPlotColor(index)));
    conf.showPlotBorder = (0, _lib.pluckNumber)(JSONData.showplotborder, chartAttr.showplotborder, 1);
    conf.anchorBorderThickness = conf.showPlotBorder ? (0, _lib.pluckNumber)(JSONData.plotborderthickness, chartAttr.plotborderthickness, 1) : 0;
    conf.anchorBorderColor = (0, _lib.getFirstColor)((0, _lib.pluck)(JSONData.plotbordercolor, chartAttr.plotbordercolor, conf.usePattern ? conf.anchorBgColor : '666666'));
    conf.plotFillAlpha = (0, _lib.pluck)(JSONData.plotfillalpha, JSONData.bubblefillalpha, chartAttr.plotfillalpha, HUNDREDSTRING);
    conf.plotBorderAlpha = (0, _lib.pluck)(JSONData.plotborderalpha, chartAttr.plotborderalpha, '95');
    conf.negativeColor = (0, _lib.pluck)(chartAttr.negativecolor, 'FF0000');
    conf.is3d = (0, _lib.pluckNumber)(chartAttr.use3dlighting, JSONData.is3d, chartAttr.is3d) !== 0;
    conf.usePattern && (conf.is3d = 0);
    conf.bubbleScale = (0, _lib.pluckNumber)(chartAttr.bubblescale, 1);
    conf.showTextOutline = (0, _lib.pluckNumber)(chartAttr.textoutline, 0);
    conf.minBubbleRadius = (0, _lib.pluckNumber)(chartAttr.minbubbleradius);
    conf.minRadiusForValue = (0, _lib.pluckNumber)(JSONData.minradiusforvalue, chartAttr.minradiusforvalue, DEFAULT_MIN_RADIUS_FOR_VALUE);
    conf.clipBubbles = (0, _lib.pluckNumber)(chartAttr.clipbubbles, 1); // conf.showRegressionLine = pluckNumber(JSONData.showregressionline, chartAttr.showregressionline, 0);

    conf.enableAnimation = enableAnimation = (0, _lib.pluckNumber)(chartAttr.animation, chartAttr.defaultanimation, 1);
    conf.animation = !enableAnimation ? false : {
      duration: (0, _lib.pluckNumber)(chartAttr.animationduration, 1) * 1000
    };
    conf.showTooltip = (0, _lib.pluckNumber)(chartAttr.showtooltip, 1);
    conf.transposeAnimation = (0, _lib.pluckNumber)(chartAttr.transposeanimation, enableAnimation);
    conf.transposeAnimDuration = (0, _lib.pluckNumber)(chartAttr.transposeanimduration, 0.2) * 1000;
    conf.seriesNameInTooltip = (0, _lib.pluckNumber)(chartAttr.seriesnameintooltip, 1);
    conf.rotateValues = (0, _lib.pluckNumber)(chartAttr.rotatevalues) ? 270 : 0;
    conf.showHoverEffect = (0, _lib.pluckNumber)(chartAttr.plothovereffect, chartAttr.showhovereffect, UNDEF);
    conf.usePattern && (conf.showHoverEffect = 0);
    conf.showValues = conf.showvalues = (0, _lib.pluckNumber)(JSONData.showvalues, chartAttr.showvalues, 0);
    dataStore = dataset.components.data = dataset.components.data || (dataset.components.data = []);
    len = setDataArr.length;
    conf.fillColor = conf.is3d ? (0, _lib.toRaphaelColor)((0, _lib.getPointColor)(conf.anchorBgColor, conf.plotFillAlpha)) : (0, _lib.toRaphaelColor)({
      color: conf.anchorBgColor,
      alpha: conf.plotFillAlpha
    });
    conf.strokeColor = (0, _lib.toRaphaelColor)({
      color: conf.anchorBorderColor,
      alpha: conf.plotFillAlpha
    });

    for (i = 0; i < len; i++) {
      setData = setDataArr[i];
      dataObj = dataStore[i] = dataStore[i] || (dataStore[i] = {});
      !dataObj.graphics && (dataObj.graphics = {});
      config = dataObj.config = {};
      config.x = numberFormatter.getCleanValue(setData.x);
      config.y = numberFormatter.getCleanValue(setData.y);
      config.z = numberFormatter.getCleanValue(setData.z, true);
      config.setValue = {
        x: config.x,
        y: config.y,
        z: config.z
      };
      config.patternType = _column.PATTERN_TYPES.includes(setData.patterntype) ? setData.patterntype : conf.patternType;
      config.patternAngle = (0, _lib.pluckNumber)(setData.patternangle, JSONData.patternangle, chartAttr.patternangle, config.patternType === _column.PATTERN_TYPES[0] ? 40 : 0);
      config.patternDensity = (0, _lib.pluckNumber)(setData.patterndensity, conf.patternDensity);
      config.patternSize = (0, _lib.pluckNumber)(setData.patternsize, JSONData.patternsize, config.patternType === _column.PATTERN_TYPES[0] ? 2 : 4);
      config.patternAlpha = (0, _lib.pluckNumber)(setData.patternalpha, conf.patternAlpha);
      config.patternBgColor = (0, _lib.pluck)(setData.patternbgcolor, conf.patternBgColor);
      config.dataLabelStyle = dataset._configureDataLabelStyle(setData);
      config._x = config.x;
      config._y = config.y;
      config._z = config.z;
      config.showValue = (0, _lib.pluckNumber)(setData.showvalue, conf.showValues, 0);
      config.plotShowValue = (0, _lib.pluckNumber)(setData.showvalue);
      config.plotMinRadiusForValue = (0, _lib.pluckNumber)(setData.minradiusforvalue, conf.minRadiusForValue);
      config.anchorProps = {};
      label = config.label = config.x;
      config.setLink = (0, _lib.getValidValue)(setData.link);
      conf.max = zMax = mathMax(zMax, config.z || 0);
      conf.min = zMin = mathMin(zMin, config.z || 0);
      config.is3d = (0, _lib.pluckNumber)(setData.is3d, conf.is3d) !== 0;
      xMax = mathMax(xMax, config.x);
      xMin = mathMin(xMin, config.x);
      yMax = mathMax(yMax, config.y);
      yMin = mathMin(yMin, config.y);
      setColor = config.color = (0, _lib.getFirstColor)((0, _lib.pluck)(setData.color, setData.z < 0 ? conf.negativeColor : conf.anchorBgColor));
      setAlpha = config.alpha = (0, _lib.pluck)(setData.alpha, conf.plotFillAlpha);
      config.colorObj = colorObj = config.is3d ? (0, _lib.getPointColor)(setColor, setAlpha) : {
        color: setColor,
        alpha: setAlpha
      };
      config.setDisplayValue = setDisplayValue = (0, _lib.parseUnsafeString)((0, _lib.pluck)(setData.displayvalue, setData.name, setData.label));
      formatedVal = config.formatedVal = config.y === null ? config.y : numberFormatter.dataLabels(config.y);
      config.displayValue = (0, _lib.pluck)(setDisplayValue, config.formatedVal);
      config.setTooltext = (0, _lib.getValidValue)((0, _lib.parseUnsafeString)((0, _lib.pluck)(setData.tooltext, JSONData.plottooltext, chartAttr.plottooltext), false)); // Initial tooltext parsing

      if (!conf.showTooltip) {
        toolText = false;
      } else {
        if (formatedVal === null) {
          toolText = false;
        } else if (config.setTooltext !== UNDEF) {
          macroIndices = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 118];
          parserConfig = {
            yDataValue: formatedVal,
            xDataValue: numberFormatter.xAxis(label),
            yaxisName: (0, _lib.parseUnsafeString)(chartAttr.yaxisname),
            xaxisName: (0, _lib.parseUnsafeString)(chartAttr.xaxisname),
            zDataValue: numberFormatter.dataLabels(config.z)
          };
          toolText = (0, _lib.parseTooltext)(config.setTooltext, macroIndices, parserConfig, setData, chartAttr, JSONData);
        } else {
          if (conf.seriesNameInTooltip) {
            seriesname = (0, _lib.getFirstValue)(JSONData && JSONData.seriesname);
          }

          toolText = seriesname ? seriesname + tooltipSepChar : _lib.BLANKSTRING;
          toolText += label ? numberFormatter.xAxis(label) + tooltipSepChar : _lib.BLANKSTRING;
          toolText += formatedVal;
          toolText += setData.z ? tooltipSepChar + numberFormatter.formatValue(setData.z) : _lib.BLANKSTRING;
        }
      }

      config.toolText = toolText; // conf.showRegressionLine && pointValueWatcher(config.x, config.y, regressionObj);

      hoverEffects = config.hoverEffects = {}; // Hover attributes parsing

      if (conf.showHoverEffect !== 0) {
        quickEnabled = hoverEffects.enabled = (0, _lib.pluck)(setData.hoveralpha, JSONData.hoveralpha, chartAttr.bubblehoveralpha, setData.hovercolor, JSONData.hovercolor, JSONData.bubblehovercolor, chartAttr.bubblehovercolor, setData.borderhovercolor, JSONData.borderhovercolor, chartAttr.plotborderhovercolor, setData.borderhoveralpha, JSONData.borderhoveralpha, chartAttr.plotborderhoveralpha, setData.hoverscale, JSONData.bubblehoverscale, chartAttr.bubblehoverscale, setData.borderhovercolor, JSONData.borderhovercolor, chartAttr.plotborderhovercolor, setData.borderhoverthickness, JSONData.borderhoverthickness, chartAttr.plotborderhoverthickness, setData.negativehovercolor, JSONData.negativeColor, chartAttr.negativecolor, setData.is3donhover, chartAttr.plotfillhovercolor, JSONData.is3donhover, chartAttr.is3donhover, UNDEF) !== UNDEF;
        hoverEffects.negativeColor = (0, _lib.pluck)(setData.negativehovercolor, JSONData.negativehovercolor, chartAttr.negativehovercolor, conf.negativeColor);
        hoverEffects.is3d = (0, _lib.pluckNumber)(setData.is3donhover, JSONData.is3donhover, chartAttr.is3donhover, config.is3d);
        hoverEffects.color = (0, _lib.pluck)(setData.hovercolor, JSONData.hovercolor, JSONData.bubblehovercolor, chartAttr.plotfillhovercolor, chartAttr.bubblehovercolor, config.is3d ? colorObj.FCcolor.color : setColor);
        hoverEffects.color = hoverEffects.negativeColor && setData.z < 0 ? hoverEffects.negativeColor : hoverEffects.color;
        hoverEffects.scale = (0, _lib.pluck)(setData.hoverscale, JSONData.hoverscale, JSONData.bubblehoverscale, chartAttr.bubblehoverscale, 1);
        hoverEffects.color = (0, _lib.getFirstColor)(hoverEffects.color);
        config.hoverColor = hoverEffects.color;
        hoverEffects.alpha = (0, _lib.pluck)(setData.hoveralpha, JSONData.hoveralpha, chartAttr.plotfillhoveralpha, chartAttr.bubblehoveralpha, setAlpha);
        hoverEffects.borderColor = (0, _lib.pluck)(setData.borderhovercolor, JSONData.borderhovercolor, chartAttr.plotborderhovercolor, conf.anchorBorderColor);
        hoverEffects.borderAlpha = (0, _lib.pluck)(setData.borderhoveralpha, JSONData.borderhoveralpha, chartAttr.plotborderhoveralpha, hoverEffects.alpha, conf.plotBorderAlpha);
        hoverEffects.borderThickness = (0, _lib.pluckNumber)(setData.borderhoverthickness, JSONData.borderhoverthickness, chartAttr.plotborderhoverthickness, conf.anchorBorderThickness);
        hoverEffects.color = hoverEffects.is3d ? (0, _lib.getPointColor)(hoverEffects.color, hoverEffects.alpha) : {
          FCcolor: {
            color: hoverEffects.color,
            alpha: hoverEffects.alpha
          }
        };

        if (quickEnabled && conf.showHoverEffect) {
          highLight = 0;
        } else {
          highLight = conf.showHoverEffect;
        }

        if (highLight === 1) {
          isHoverColorString = typeof hoverEffects.color === 'string';
          highlightColors = isHoverColorString ? hoverEffects.color.split(/\s{0,},\s{0,}/) : hoverEffects.color.FCcolor.color.split(/\s{0,},\s{0,}/);
          hColorsLen = highlightColors.length;

          for (hColorsLoop = 0; hColorsLoop < hColorsLen; hColorsLoop++) {
            highlightColors[hColorsLoop] = (0, _lib.getLightColor)(highlightColors[hColorsLoop], 70);
          }

          if (isHoverColorString) {
            hoverEffects.color = highlightColors.join(',');
          } else {
            hoverEffects.color.FCcolor.color = highlightColors.join(',');
          }
        }

        if (quickEnabled === false) {
          hoverEffects.enabled = Boolean(conf.showHoverEffect);
        }
      } else {
        hoverEffects.enabled = false;
      }
    }

    conf.xMax = xMax;
    conf.xMin = xMin;
    conf.yMin = yMin;
    conf.yMax = yMax; // conf.regressionData = conf.showRegressionLine &&
    // this.getRegressionLineSeries(regressionObj, conf.showYOnX, len);

    dataset.setState('dirty', true);
    dataset.setState('visible', (0, _lib.pluckNumber)(JSONData.visible, !Number(JSONData.initiallyhidden), 1) === 1);
    chart.config.showLegend && dataset._addLegend();
    dataset.setState('dirty', true);
  }
  /*
   * Using kdtree algo for searching
  */
  ;

  _proto._getHoveredPlot = function _getHoveredPlot(x, y) {
    var res = this.config.dataTree.getNeighbour({
      x: x,
      y: y
    }, true, 'circle'); // searching neighbour from Kdtree with basic search flag on

    if (res) {
      return {
        pointIndex: res.index || res.i,
        hovered: true,
        pointObj: res.data
      };
    }
  }
  /**
   * Function to set hover cosmetics when hovered over plot
   * @param {Object} dataObj
   * @param {string} state state of the plot
   * @param {boolean} hoverEnabled
   */
  ;

  _proto._hoverPlotAnchor = function _hoverPlotAnchor(dataObj, state, hoverEnabled) {
    var dataset = this,
        animationManager = dataset.getFromEnv('animationManager'),
        graphic = dataObj.graphics,
        setElem = graphic.element,
        hoverAttr = state === ROLLOUT ? setElem.data(SETROLLOUTATTR) : setElem.data(SETROLLOVERATTR);

    if (hoverEnabled && setElem) {
      // TODO: remove the dirty check after animation manager is merged
      animationManager.setAnimationState && animationManager.setAnimationState(state === ROLLOUT ? 'mouseOut' : 'mouseOver');
      animationManager.setAnimation({
        el: setElem,
        attr: hoverAttr,
        component: dataset
      });
    }
  };

  _proto._addLegend = function _addLegend() {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        conf = dataset.config,
        chartAttr = dataset.getFromEnv('chart-attrib'),
        legend = chart.getChildren('legend')[0],
        JSONData = dataset.config.JSONData || {},
        legendItem,
        config;

    if (conf.includeinlegend) {
      config = {
        enabled: conf.includeInLegend,
        anchorSide: 1,
        type: dataset.type,
        label: conf.seriesname,
        usePattern: conf.usePattern,
        legendIconAlpha: (0, _lib.pluckNumber)(JSONData.legendiconalpha),
        patternAttr: {
          patternType: conf.patternType,
          patternAngle: conf.patternAngle,
          patternDensity: conf.patternDensity,
          patternSize: conf.patternSize,
          color: conf.anchorBgColor,
          patternAlpha: conf.patternAlpha,
          patternBgColor: conf.patternBgColor,
          alpha: conf.plotFillAlpha
        }
      };
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
          fill: conf.fillColor,
          bgAlpha: (0, _lib.pluckNumber)(JSONData.legendiconbgalpha, JSONData.legendiconalpha, chartAttr.legendiconbgalpha, chartAttr.legendiconalpha, conf.plotFillAlpha),
          borderAlpha: (0, _lib.pluckNumber)(JSONData.legendiconborderalpha, JSONData.legendiconalpha, chartAttr.legendiconborderalpha, chartAttr.legendiconalpha, '100'),
          rawFillColor: conf.anchorBgColor,
          rawStrokeColor: conf.anchorBorderColor,
          stroke: conf.strokeColor
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
  };

  _proto.getBubbleRadius = function getBubbleRadius(zValue) {
    var dataset = this,
        mathSqrt = math.sqrt,
        dsConfig = dataset.config,
        bubbleScale = dsConfig.bubbleScale,
        minBubbleRadius = dsConfig.minBubbleRadius,
        chartConfig = dataset.getFromEnv('chartConfig'),
        // chartConfig = chart.config,
    // to have diameter of the largest bubble as 25% of the smaller of the two dimensions of
    // canvas
    radiusLimit = mathMin(chartConfig.canvasHeight, chartConfig.canvasWidth) / 8,
        chartLimits = this.getLinkedParent().getDataLimitRange(),
        zMax = chartLimits.zMax,
        sqrtMaxZ = mathSqrt(zMax),
        sqrtBubbleZ = mathSqrt(zValue),
        bubbleRadius; // calculating radius with scaling

    bubbleRadius = mathRound(sqrtBubbleZ * radiusLimit / sqrtMaxZ) * bubbleScale || 0; // In case minimum radius for bubble is defined we have to honor it

    if (minBubbleRadius) {
      bubbleRadius = mathMax(bubbleRadius, minBubbleRadius);
    }

    return bubbleRadius;
  } // Create pixel coordinates for the plots
  ;

  _proto.createCoordinates = function createCoordinates() {
    var dataset = this,
        dsComponents = dataset.components,
        dsData = dsComponents.data,
        yAxis = dataset.getFromEnv('yAxis'),
        yBase = yAxis.getAxisBase(),
        yBasePos = yAxis.getPixel(yBase),
        xAxis = dataset.getFromEnv('xAxis'),
        isVertical = xAxis.config.isVertical,
        dataObj,
        config,
        previousY,
        i,
        Px,
        Py,
        Pb,
        len = dsData.length,
        dataStore = dsComponents.data;

    for (i = 0; i < len; i++) {
      dataObj = dataStore[i];
      config = dataObj && dataObj.config;

      if (dataObj === UNDEF) {
        continue;
      }

      previousY = config._b;
      Px = xAxis.getPixel(config._x);
      Py = yAxis.getPixel(config._y);
      Pb = previousY ? yAxis.getPixel(previousY) : yBasePos;

      if (dataset.getName() === 'bubble') {
        config.r = dataset.getBubbleRadius(config._z);
        config.showValue = config.plotShowValue !== UNDEF ? +config.plotShowValue : config.r >= config.plotMinRadiusForValue ? dataset.config.showValues : false;
      }

      if (isVertical) {
        config._Px = Py;
        config._Py = Px;
        config._Pby = Py;
        config._Pbx = Pb;
      } else {
        config._Px = Px;
        config._Py = Py;
        config._Pby = Pb;
        config._Pbx = Px;
      }
    }
  }
  /**
   * Parses the bubble attributes and calculates position
   *
   * @param {any} set
   * @param {any} index
   * @memberof BubbleDataset
   */
  ;

  _proto.parsePlotAttributes = function parsePlotAttributes(set, index) {
    var dataset = this,
        JSONData = dataset.config.JSONData,
        chart = dataset.getFromEnv('chart'),
        chartConfig = chart.config,
        conf = dataset.config,
        bubbleRadius,
        yPos,
        xPos,
        i = index,
        config,
        visible = dataset.getState('visible'),
        toolText,
        x,
        y,
        z,
        setLink,
        displayValue,
        hoverEffects = {},
        setRolloutAttr,
        eventArgs,
        borderThickness = conf.anchorBorderThickness,
        kdTreeArr = [];
    config = set.config;
    x = (0, _lib.pluckNumber)(config.x, i);
    y = config.y;
    z = config.z;
    setLink = config.setLink;
    displayValue = config.displayValue;
    toolText = config.toolText;
    config.finalTooltext = config.toolText;
    hoverEffects = config.hoverEffects;

    if (y !== null) {
      eventArgs = config.eventArgs || (config.eventArgs = {});
      eventArgs.index = i;
      eventArgs.link = setLink;
      eventArgs.value = y;
      eventArgs.y = y;
      eventArgs.x = x;
      eventArgs.z = z;
      eventArgs.displayValue = displayValue;
      eventArgs.toolText = toolText;
      eventArgs.id = dataset.userID;
      eventArgs.datasetIndex = dataset.config.index;
      eventArgs.datasetName = JSONData.seriesname;
      eventArgs.visible = visible;
      eventArgs.color = config.color;
      eventArgs.alpha = config.alpha;
      eventArgs.is3dOnHover = hoverEffects.is3d;
      eventArgs.hoverScale = hoverEffects.scale;
      eventArgs.use3dLighting = config.is3d;
      eventArgs.hoverColor = config.hoverColor;
      eventArgs.hoverAlpha = hoverEffects.alpha;

      if (conf.usePattern) {
        eventArgs.pattern = {
          patternType: config.patternType,
          patternColor: config.color,
          patternBgColor: config.patternBgColor === _lib.TRACKER_FILL ? UNDEF : config.patternBgColor
        };
        delete eventArgs.color;
      } else {
        delete eventArgs.pattern;
      }

      yPos = config._Py;
      xPos = config._Px;
      bubbleRadius = config.r;
      kdTreeArr.push({
        x: xPos,
        y: yPos,
        r: bubbleRadius
      });
      setRolloutAttr = config.setRolloutAttr = {
        fill: (0, _lib.toRaphaelColor)(config.colorObj),
        'stroke-width': conf.anchorBorderThickness,
        stroke: (0, _lib.toRaphaelColor)({
          color: conf.anchorBorderColor,
          alpha: conf.plotBorderAlpha
        }),
        r: bubbleRadius
      };

      if (hoverEffects.enabled !== false) {
        config.setRolloverAttr = {
          fill: (0, _lib.toRaphaelColor)(hoverEffects.color),
          'stroke-width': hoverEffects.borderThickness,
          stroke: (0, _lib.toRaphaelColor)({
            color: hoverEffects.borderColor,
            alpha: hoverEffects.borderAlpha
          }),
          r: bubbleRadius * hoverEffects.scale
        };
      }

      config.props = {
        element: {
          attr: {
            cx: xPos,
            cy: visible ? yPos : chartConfig.canvasBottom + bubbleRadius,
            r: bubbleRadius || 0,
            fill: (0, _lib.toRaphaelColor)(config.colorObj),
            'stroke-width': conf.anchorBorderThickness,
            'visibility': visible,
            stroke: setRolloutAttr.stroke
          }
        }
      };
      config.props.element.patternAttr = {
        patternType: config.patternType,
        patternAngle: config.patternAngle,
        patternDensity: config.patternDensity,
        patternSize: config.patternSize,
        color: config.props.element.attr.fill,
        patternAlpha: config.patternAlpha,
        patternBgColor: config.patternBgColor,
        alpha: config.alpha,
        x: config.props.element.attr.cx,
        y: config.props.element.attr.cy
      };
      config.trackerConfig || (config.trackerConfig = {});
      config.trackerConfig.trackerRadius = mathMax(bubbleRadius + (borderThickness || 0 / 2), HTP);
      set._xPos = xPos;
      set._yPos = yPos;
    }
  }
  /**
   * Parses plot and label attributes during post space management
   *
   * @memberof BubbleDataset
   */
  ;

  _proto.allocatePosition = function allocatePosition() {
    var dataset = this,
        set,
        i,
        ln,
        xPos,
        yPos,
        plotConfig,
        r,
        setDataArr = dataset.components.data,
        kdTreeArr = [];
    dataset.createCoordinates();

    for (i = 0, ln = setDataArr.length; i < ln; i += 1) {
      set = setDataArr[i];
      dataset.parsePlotAttributes(set, i);
      dataset.parseLabelAttributes(set, i);

      if (set) {
        plotConfig = set.config;
        xPos = plotConfig._Px;
        yPos = plotConfig._Py;
        r = plotConfig.r || 0; // Pushing object to custom array that will be required for K-D Tree Search Algorithm
        // (in integer format)

        kdTreeArr.push({
          x: xPos,
          y: yPos,
          index: i,
          data: set,
          r: r
        });
      }
    } // Building KdTree


    this.config.dataTree = new _kdtree.default().buildKdTree(kdTreeArr);
  }
  /**
   * This functions calculate the space required for a dataset and return that to the chart
   * @return {Object} dimention
   */
  ;

  _proto.getCanvasPadding = function getCanvasPadding() {
    var dataset = this,
        conf = dataset.config || (dataset.config = {}),
        components = dataset.components || {},
        chartConfig = dataset.getFromEnv('chartConfig'),
        rotateValues = chartConfig.rotatevalues,
        xAxis = dataset.getFromEnv('xAxis'),
        dataLabelStyle = dataset.getFromEnv('dataLabelStyle'),
        data = components.data || [],
        dataLen = data.length,
        firstData = conf.leftMostData || data[0],
        lastData = conf.rightMostData || data[data.length - 1],
        radiusLimit = mathMin(chartConfig.canvasHeight, chartConfig.canvasWidth) / 8,
        sqrtMaxZ,
        firstDataChangeFlag = 1,
        secondDataChangeFlag = 1,
        radiusFactor,
        configAttr,
        configAttrFirst,
        configAttrLast,
        dataConf,
        zMax = chartConfig.zMax,
        sqrtBubbleZ,
        minPoint,
        bubbleScale = conf.bubbleScale,
        i,
        xReduced,
        xReducedFirst,
        xReducedLast,
        label,
        bubbleRadius,
        bubbleRadiusVal,
        axisRange = xAxis.config.axisRange,
        xAxisMax = axisRange.max,
        xAxisMin = axisRange.min,
        endPixel = xAxis.getPixel(xAxisMax),
        startPixel = xAxis.getPixel(xAxisMin),
        labelDimEnd = {},
        labelDimStart = {},
        maxPoint,
        SmartLabel = dataset.getFromEnv('smartLabel'),
        returnDimension = {
      paddingLeft: 0,
      paddingRight: 0
    },
        labelWidth = 0;
    sqrtMaxZ = Math.sqrt(zMax);
    radiusFactor = radiusLimit / sqrtMaxZ;

    for (i = 0; i < dataLen; i++) {
      configAttr = data[i].config;
      configAttrFirst = firstData.config;
      configAttrLast = lastData.config; // finding the radius of the current point

      sqrtBubbleZ = Math.sqrt(configAttr.z);
      bubbleRadius = Math.round(sqrtBubbleZ * radiusFactor) * bubbleScale || 0;
      bubbleRadiusVal = xAxis.getValue(bubbleRadius) - xAxisMin;
      xReduced = configAttr.x - bubbleRadiusVal / 2; // finding the radius of the firstData

      if (firstDataChangeFlag === 1) {
        sqrtBubbleZ = Math.sqrt(configAttrFirst.z);
        bubbleRadius = Math.round(sqrtBubbleZ * radiusFactor) * bubbleScale || 0;
        bubbleRadiusVal = xAxis.getValue(bubbleRadius) - xAxisMin;
        xReducedFirst = configAttrFirst.x - bubbleRadiusVal / 2;
      } // finding the radius of the lastData


      if (secondDataChangeFlag === 1) {
        sqrtBubbleZ = Math.sqrt(configAttrLast.z);
        bubbleRadius = Math.round(sqrtBubbleZ * radiusFactor) * bubbleScale || 0;
        bubbleRadiusVal = xAxis.getValue(bubbleRadius) - xAxisMin;
        xReducedLast = configAttrLast.x - bubbleRadiusVal / 2;
      }

      firstDataChangeFlag = 0;
      secondDataChangeFlag = 0;

      if (xReducedFirst > xReduced) {
        firstData = data[i];
        firstDataChangeFlag = 1;
      }

      if (xReducedLast < xReduced) {
        lastData = data[i];
        secondDataChangeFlag = 1;
      }
    }

    SmartLabel.useEllipsesOnOverflow(chartConfig.useEllipsesWhenOverflow);
    SmartLabel.setStyle(dataLabelStyle);

    if (firstData && firstData.config.showValue) {
      dataConf = firstData.config;
      label = dataConf.displayValue;
      labelDimStart = SmartLabel.getOriSize(label);
      labelWidth = rotateValues ? labelDimStart.height : labelDimStart.width;
      minPoint = xAxis.getPixel(dataConf.x) - labelWidth * 0.5;

      if (startPixel > minPoint) {
        returnDimension.paddingLeft = startPixel - minPoint;
      }
    }

    if (lastData && lastData.config.showValue) {
      dataConf = lastData.config;
      label = dataConf.displayValue;
      labelDimEnd = SmartLabel.getOriSize(label);
      labelWidth = rotateValues ? labelDimEnd.height : labelDimEnd.width;
      maxPoint = xAxis.getPixel(dataConf.x) + labelWidth * 0.5;

      if (endPixel < maxPoint) {
        returnDimension.paddingRight = maxPoint - endPixel;
      }
    }

    return returnDimension;
  };

  _proto.drawPlots = function drawPlots() {
    var dataset = this,
        setElem,
        setElemCheck,
        hotElem,
        animationManager = dataset.getFromEnv('animationManager'),
        set,
        i,
        ln,
        config,
        setDataArr = dataset.components.data,
        containers = dataset.getContainer(),
        visible = dataset.getState('visible'),
        dataLabelContainer = dataset.getContainer('labelGroup'),
        animCallBack = function animCallBack() {
      if (visible === false) {
        containers.plotGroup.hide();
        containers.commonElemsGroup.hide();
        dataLabelContainer && dataLabelContainer.hide();
        dataset._containerHidden = true;
      }
    },
        y,
        hoverEffects = {},
        label;

    for (i = 0, ln = setDataArr.length; i < ln; i += 1) {
      set = setDataArr[i];
      config = set.config;
      y = config.y;
      setElem = set.graphics.element;
      hoverEffects = config.hoverEffects;
      hotElem = set.graphics.hotElement;
      label = set.graphics.label;

      if (y !== null) {
        setElemCheck = set.graphics.element; // creation of the plots

        setElem = animationManager.setAnimation({
          el: setElemCheck || 'circle',
          attr: config.props.element.attr,
          label: 'circle',
          callback: animCallBack,
          component: dataset,
          container: containers.plotGroup
        });
        setElem.addPattern(config.props.element.patternAttr, dataset.config.usePattern);

        if (!setElemCheck) {
          set.graphics.element = setElem;
        }

        setElem.show(); // Set the anchorRadius and anchorHoverRadius to bubble radius

        setElem.data('hoverEnabled', hoverEffects.enabled).data(SETROLLOVERATTR, config.setRolloverAttr).data(SETROLLOUTATTR, config.setRolloutAttr).data('anchorRadius', config.r).data('anchorHoverRadius', config.r);
        setElem && setElem.data(EVENTARGS, config && config.eventArgs);
      } else {
        setElem && setElem.hide();
        hotElem && hotElem.hide();
        label && label.hide();
      }

      setElem && (setElem.isDrawn = true);
    }
  };

  _proto.getDataLimits = function getDataLimits() {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        chartConfig = chart.config,
        conf = dataset.config,
        maxValue = conf.yMax,
        minValue = conf.yMin,
        infMin = -Infinity,
        infMax = +Infinity,
        transposeAxis = chartConfig.transposeAxis,
        xMin = conf.xMin,
        xMax = conf.xMax,
        zMax = conf.max,
        zMin = conf.min,
        regressionPoints = dataset.getRegressionPoints();

    if (dataset.getState('visible') === false && transposeAxis) {
      maxValue = infMin;
      minValue = infMax;
      xMin = infMax;
      xMax = infMin;
    }

    if (regressionPoints) {
      maxValue = Math.max(maxValue, regressionPoints.max);
      minValue = Math.min(minValue, regressionPoints.min);
      xMax = Math.max(xMax, regressionPoints.xMax);
      xMin = Math.min(xMin, regressionPoints.xMin);
    }

    return {
      max: maxValue,
      min: minValue,
      xMin: xMin,
      xMax: xMax,
      zMax: zMax,
      zMin: zMin
    };
  };

  return BubbleDataset;
}(_scatter.default);

var _default = BubbleDataset;
exports["default"] = _default;

/***/ }),

/***/ 613:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _index = _interopRequireDefault(__webpack_require__(599));

var _default = {
  'initial.dataset.column3D': _index.default['initial.dataset.column'],
  'legendInteraction.dataset.column3D': _index.default['legendInteraction.dataset.column']
};
exports["default"] = _default;

/***/ }),

/***/ 611:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _column = _interopRequireDefault(__webpack_require__(595));

var _lib = __webpack_require__(274);

var _column3dUtils = __webpack_require__(612);

var _dependencyManager = __webpack_require__(282);

var _index = _interopRequireDefault(__webpack_require__(613));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var createGroup = function createGroup(groupName, paper, parentContainer) {
  return paper.group(groupName, parentContainer);
};

(0, _dependencyManager.addDep)({
  name: 'column3dAnimation',
  type: 'animationRule',
  extension: _index.default
});
/**
 * Creates class for Column3DDataset
 */

var Column3DDataset = /*#__PURE__*/function (_ColumnDataset) {
  (0, _inheritsLoose2.default)(Column3DDataset, _ColumnDataset);

  /**
   * Constructor function of Column3DDataset class to initiate
   */
  function Column3DDataset() {
    var _this;

    _this = _ColumnDataset.call(this) || this;
    _this.setContainerVisibility = _lib.stubFN;
    return _this;
  }
  /**
   * Sets the type of the component
   * @return {string} type
   */


  var _proto = Column3DDataset.prototype;

  _proto.getType = function getType() {
    return 'dataset';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  _proto.getName = function getName() {
    return 'column3D';
  }
  /**
   * parse defualt configuration of the chart
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _ColumnDataset.prototype.__setDefaultConfig.call(this);

    this.config.use3dlighting = _lib.UNDEF;
  }
  /**
   * function to create group for dataset
   */
  ;

  _proto.createContainer = function createContainer() {
    var dataset = this,
        parent = dataset.getLinkedParent(),
        paper = dataset.getFromEnv('paper');
    !dataset.getContainer('labelGroup') && dataset.addContainer('labelGroup', createGroup('label-group', paper, parent.getChildContainer('vcanvasLabelGroup')).attr('class', 'fusioncharts-datalabels')).attr('opacity', 1);
  }
  /**
   * Function that retunr the nearest plot details
   * @param {number} chartX x-axis position of the mouse cordinate
   * @param {number} chartY x-axis position of the mouse cordinate
   * @return {Object} return an object with details of nearest polt and whether it is hovered or not
   */
  ;

  _proto._getHoveredPlot = function _getHoveredPlot(chartX, chartY) {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        isBar = chart.isBar,
        xAxis = dataset.getFromEnv('xAxis'),
        x,
        pX;
    x = xAxis.getValue(isBar ? chartY : chartX);
    pX = Math.round(x); // Checking for overlap between two cosecutive column plots along x-axis

    return pX - x > 0 ? _column3dUtils._checkPointerOverColumn.call(dataset, pX, chartX, chartY) || _column3dUtils._checkPointerOverColumn.call(dataset, pX - 1, chartX, chartY) : _column3dUtils._checkPointerOverColumn.call(dataset, pX + 1, chartX, chartY) || _column3dUtils._checkPointerOverColumn.call(dataset, pX, chartX, chartY);
  };

  return Column3DDataset;
}(_column.default);

var _default = Column3DDataset;
exports["default"] = _default;

/***/ }),

/***/ 657:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _index = _interopRequireDefault(__webpack_require__(650));

var _default = {
  'initial.dataset.doughnut2D': _index.default['initial.dataset.pie2D']
};
exports["default"] = _default;

/***/ }),

/***/ 656:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = exports._getInnerSize = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _pie2d = _interopRequireDefault(__webpack_require__(649));

var _dependencyManager = __webpack_require__(282);

var _lib = __webpack_require__(274);

var _index = _interopRequireDefault(__webpack_require__(657));

var COMMASTRING = ',',
    FIFTY_PERCENT = '50%',
    _getInnerSize2 = function _getInnerSize() {
  var innerradius,
      dataSet = this,
      chart = dataSet.getFromEnv('chart'),
      dataSetConfig = dataSet.config,
      chartAttr = chart.getFromEnv('dataSource').chart,
      doughnutRadius = dataSetConfig.doughnutradius,
      use3DLighting = (0, _lib.pluckNumber)(chartAttr.use3dlighting, 1),
      radius3D = use3DLighting ? (0, _lib.pluckNumber)(chartAttr.radius3d, chartAttr['3dradius'], 50) : 100,
      innerpercentR,
      diff50Percent,
      radius3Dpercent,
      pointConfig,
      poin2nd,
      ratioStr,
      x,
      point,
      data,
      length,
      pieMinRadius = dataSetConfig.pieMinRadius;

  if (radius3D > 100) {
    radius3D = 100;
  }

  if (radius3D < 0) {
    radius3D = 0;
  }
  /*
   * Decide inner radius
   */


  if (/%/.test(doughnutRadius)) {
    doughnutRadius = Number(doughnutRadius.split('%')[0]) / 100;
    innerradius = pieMinRadius * doughnutRadius;
  } else if (doughnutRadius <= 0 || doughnutRadius >= pieMinRadius) {
    innerradius = pieMinRadius / 2;
  } else {
    innerradius = (0, _lib.pluckNumber)(doughnutRadius);
  }

  dataSetConfig.innerRadius = innerradius; // hcJSON.plotOptions.pie3d.innerSize = hcJSON.plotOptions.pie.innerSize = 2 * innerradius;

  /*
    * Create doughnut type 3d lighting
    */

  if (radius3D > 0 && _lib.hasSVG) {
    // Radial gradient is not supported in VML
    innerpercentR = parseInt(innerradius / pieMinRadius * 100, 10);
    diff50Percent = (100 - innerpercentR) / 2;
    radius3Dpercent = parseInt(diff50Percent * radius3D / 100, 10);
    poin2nd = 2 * (diff50Percent - radius3Dpercent);
    ratioStr = innerpercentR + COMMASTRING + radius3Dpercent + COMMASTRING + poin2nd + COMMASTRING + radius3Dpercent; // Loop for all points

    if (dataSet && (data = dataSet.components.data)) {
      for (x = 0, length = data.length; x < length; x += 1) {
        point = data[x];
        pointConfig = point.config;

        if (pointConfig.color) {
          pointConfig.color.ratio = ratioStr;

          if (pointConfig.hoverEffects && pointConfig.hoverEffects.color) {
            pointConfig.hoverEffects.color.ratio = ratioStr;
          }
        }
      }
    }
  }

  return innerradius * 2;
};

exports._getInnerSize = _getInnerSize2;
(0, _dependencyManager.addDep)({
  name: 'doughnut2dAnimation',
  type: 'animationRule',
  extension: _index.default
});

var Doughnut2DDataset = /*#__PURE__*/function (_Pie2DDataset) {
  (0, _inheritsLoose2.default)(Doughnut2DDataset, _Pie2DDataset);

  function Doughnut2DDataset() {
    return _Pie2DDataset.apply(this, arguments) || this;
  }

  var _proto = Doughnut2DDataset.prototype;

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
    return 'doughnut2D';
  };

  _proto.configureAttributes = function configureAttributes(dataObj) {
    _Pie2DDataset.prototype.configureAttributes.call(this, dataObj);

    var dataset = this,
        conf = dataset.config,
        chartConfig = dataset.getFromEnv('chartConfig');
    conf.doughnutradius = (0, _lib.pluck)(chartConfig.doughnutradius, conf.doughnutradius, '50%');
  };

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _Pie2DDataset.prototype.__setDefaultConfig.call(this);

    this.config.doughnutradius = FIFTY_PERCENT;
  };

  _proto._parsePiePlotOptions = function _parsePiePlotOptions() {
    var dataSet = this,
        piePlotOptions = _Pie2DDataset.prototype._parsePiePlotOptions.call(this);

    piePlotOptions.innerSize = dataSet._getInnerSize();
    return piePlotOptions;
  };

  _proto._getInnerSize = function _getInnerSize() {
    return _getInnerSize2.call(this);
  };

  _proto.allocatePosition = function allocatePosition() {
    this.config.innerSize = this._getInnerSize();

    _Pie2DDataset.prototype.allocatePosition.call(this);
  };

  return Doughnut2DDataset;
}(_pie2d.default);

var _default = Doughnut2DDataset;
exports["default"] = _default;

/***/ }),

/***/ 665:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _index = _interopRequireDefault(__webpack_require__(658));

var _default = {
  'initial.dataset.doughnut3D': _index.default['initial.dataset.pie3d']
};
exports["default"] = _default;

/***/ }),

/***/ 664:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _pie3d = _interopRequireDefault(__webpack_require__(655));

var _index = _interopRequireDefault(__webpack_require__(665));

var _dependencyManager = __webpack_require__(282);

var _lib = __webpack_require__(274);

var FIFTY_PERCENT = '50%';
(0, _dependencyManager.addDep)({
  name: 'doughnut3dAnimation',
  type: 'animationRule',
  extension: _index.default
});

var Doughnut3DDataset = /*#__PURE__*/function (_Pie3DDataset) {
  (0, _inheritsLoose2.default)(Doughnut3DDataset, _Pie3DDataset);

  function Doughnut3DDataset() {
    return _Pie3DDataset.apply(this, arguments) || this;
  }

  var _proto = Doughnut3DDataset.prototype;

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
    return 'doughnut3D';
  };

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _Pie3DDataset.prototype.__setDefaultConfig.call(this);

    this.config.doughnutradius = FIFTY_PERCENT;
  };

  _proto._configurePie3DManager = function _configurePie3DManager() {
    var dataSet = this,
        dataSetConfig = dataSet.config,
        dataSetComponents = dataSet.components,
        pie3DManager = dataSet.getFromEnv('pie3DManager'),
        data = dataSetComponents.data;

    if (pie3DManager) {
      pie3DManager.configure(dataSetConfig.pieSliceDepth, data.length === 1, dataSetConfig.use3DLighting, true);
    }
  };

  _proto.configureAttributes = function configureAttributes(dataObj) {
    _Pie3DDataset.prototype.configureAttributes.call(this, dataObj);

    var dataset = this,
        conf = dataset.config,
        chartConfig = dataset.getFromEnv('chartConfig');
    conf.doughnutradius = (0, _lib.pluck)(chartConfig.doughnutradius, conf.doughnutradius, FIFTY_PERCENT);
  };

  return Doughnut3DDataset;
}(_pie3d.default);

var _default = Doughnut3DDataset;
exports["default"] = _default;

/***/ }),

/***/ 736:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _componentInterface = __webpack_require__(290);

var _lib = __webpack_require__(274);

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var math = Math,
    mathMin = math.min,
    mathMax = math.max,
    mathAbs = math.abs,
    UNDEF;
/**
 * BarMultiSeriesgroup basically manages all the position of multiseries bars side by side.
 * suppose multiseries bar chart contains 2 dataset now what will be the bar width and
 * position to accomodate all the bars. This manager conveys the bar width and position
 * for every bar plots to its children
 */

var BarMultiSeriesgroup = /*#__PURE__*/function (_ComponentInterface) {
  (0, _inheritsLoose2.default)(BarMultiSeriesgroup, _ComponentInterface);

  /**
   * constructor function this class
   */
  function BarMultiSeriesgroup() {
    var _this;

    _this = _ComponentInterface.call(this) || this;

    _this.setState('visible', true);

    return _this;
  }
  /**
   * Sets the type of the component
   * @return {string} type
   */


  var _proto = BarMultiSeriesgroup.prototype;

  _proto.getType = function getType() {
    return 'group';
  }
  /**
  * Sets the name of the component
  * @return {string} name
  */
  ;

  BarMultiSeriesgroup.getName = function getName() {
    return 'barMultiSeriesgroup';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  _proto.getName = function getName() {
    return 'barMultiSeriesgroup';
  }
  /**
   * function to configure json data
   * @param {Object} managerJSON to set json data in configuration
   * @return {boolean} Indiactes whether the configuration was successful or not
   */
  ;

  _proto.preConfigure = function preConfigure(managerJSON) {
    if (!managerJSON) {
      return false;
    }

    this.config.JSONData = managerJSON;

    _ComponentInterface.prototype.preConfigure.call(this, managerJSON);
  }
  /**
   * function to configure json data
   * @param {Object} managerJSON to set json data in configuration
   * @return {boolean} Indiactes whether the configuration was successful or not
   */
  ;

  _proto.configure = function configure(managerJSON) {
    if (!managerJSON) {
      return false;
    }

    _ComponentInterface.prototype.configure.call(this, managerJSON);
  }
  /**
   * set visibility of  this manager by checking the visbility of the children
   */
  ;

  _proto.setVisibility = function setVisibility() {
    var manager = this,
        numVisibleDataset = 0;

    manager._mapChildren(function (child) {
      child.setVisibility && child.setVisibility();
    });

    manager._mapChildren(function (child) {
      child.getState('visible') && numVisibleDataset++;
    });

    manager.setState('visible', !!numVisibleDataset);
  }
  /**
   * Create child containers
   */
  ;

  _proto.createContainer = function createContainer() {
    var manager = this,
        animationManager = manager.getFromEnv('animationManager'),
        key,
        parent = manager.getLinkedParent(),
        pContainer,
        parentChildContainers = parent.getChildContainer();

    for (key in parentChildContainers) {
      pContainer = parentChildContainers[key];
      !manager.getChildContainer(key) && manager.addChildContainer(key, animationManager.setAnimation({
        el: 'group',
        attr: {
          name: 'manager-' + key
        },
        component: manager,
        container: pContainer
      }));
    }
  }
  /**
   * Sets the bar dimentions
   *
   * @memberof BarMultiSeriesgroup
   */
  ;

  _proto.allocatePosition = function allocatePosition() {
    this.setBarPosition();
  }
  /**
   * function call sync draw of its children
   */
  ;

  _proto.draw = function draw() {
    this.createContainer();
  }
  /**
   * function to calculate maximum canvas padding is required by the children of this manager
   * @return {Object} contains dimension required
   */
  ;

  _proto.getCanvasPadding = function getCanvasPadding() {
    var manager = this,
        dim,
        key,
        returnDimension = {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    };
    manager.setBarPosition();

    manager._mapChildren(function (child) {
      dim = !child.getState('removed') && child.getState('visible') && child.getCanvasPadding && child.getCanvasPadding() || {};

      for (key in dim) {
        if (dim.hasOwnProperty(key)) {
          returnDimension[key] = Math.max(dim[key], returnDimension[key]);
        }
      }
    });

    return returnDimension;
  }
  /**
   * function to calculate bar position and width
   */
  ;

  _proto.setBarPosition = function setBarPosition() {
    var manager = this,
        chartConfig = manager.getFromEnv('chartConfig'),
        chartAttr = manager.getFromEnv('chart-attrib'),
        xAxis = manager.getFromEnv('xAxis'),
        oldNumOfBars = manager.getFromEnv('numOfBars'),
        definedGroupPadding = chartConfig.plotSpacePercent,
        plotSpacePercent = mathMax((0, _lib.pluckNumber)(definedGroupPadding, 20) % 100, 0),
        groupPadding = plotSpacePercent / 200,
        xAxisZeroPos = xAxis.getPixel(0),
        xAxisFirstPos = xAxis.getPixel(1),
        maxColWidth = manager.getFromEnv('chart').isBar ? chartConfig.maxBarHeight : chartConfig.maxColWidth,
        groupMaxWidth = mathAbs(xAxisFirstPos - xAxisZeroPos),
        groupNetWidth,
        barWidth,
        commonXShift,
        plotEffectivePadding,
        plotPaddingPercent = chartConfig.plotPaddingPercent,
        plotPadding,
        xPosFirst,
        xPosNext,
        isCrisp = true,
        groupNetHalfWidth,
        groupNetGapWidth = 4,
        overlapBars = chartConfig.overlapBars,
        count = 0,
        numOfBars = 0,
        i = 0;
    manager.addToEnv('groupMaxWidth', groupMaxWidth);

    manager._mapChildren(function (child) {
      if (!child.getState('removed') && child.getState('visible') !== false) {
        numOfBars++;
        child.addToEnv('updatedIndex', i++);
      }
    });

    manager.addToEnv('numOfBars', numOfBars);
    manager.addToEnv('numColDiff', (0, _lib.pluckNumber)(oldNumOfBars - numOfBars, 0));
    groupNetWidth = (1 - definedGroupPadding * 0.01) * groupMaxWidth || mathMin(groupMaxWidth * (1 - groupPadding * 2), maxColWidth * (numOfBars || 1)); // if plotSpacePercent is not defined explicitly in chart attributes then group net width
    // will be recalculated

    chartAttr.plotspacepercent === UNDEF && groupNetWidth >= chartConfig.canvasWidth / 2 && (groupNetWidth = groupMaxWidth - maxColWidth / 2);
    barWidth = numOfBars === 0 ? groupNetWidth : groupNetWidth / numOfBars;
    plotPadding = numOfBars > 1 ? !overlapBars && plotPaddingPercent === UNDEF ? 4 : plotPaddingPercent > 0 ? barWidth * plotPaddingPercent / 100 : 0 : 0;
    plotEffectivePadding = mathMin(barWidth - 1, plotPadding); // barWidth is subtracted by plotEffectivePadding to get space between
    // the bars for enhanced 3D effect. When overlapBars is 0
    // or plotPaddingPercent is present then
    // plotEffectivePadding has some value else it is 0 to give a overlapping effect.

    manager.addToEnv('oldPlotWidth', manager.getFromEnv('plotWidth'));
    manager.addToEnv('plotWidth', barWidth - plotEffectivePadding);
    manager.addToEnv('oldPlotPadding', manager.getFromEnv('plotPadding'));
    manager.addToEnv('plotPadding', plotEffectivePadding);
    commonXShift = -(numOfBars / 2 * barWidth - barWidth / 2);
    manager.addToEnv('oldGroupNetWidth', manager.getFromEnv('groupNetWidth'));
    manager.addToEnv('groupNetWidth', groupNetWidth);

    manager._mapChildren(function (child) {
      if (!child.getState('removed') && child.getState('visible')) {
        child.addToEnv('shift', commonXShift + count * barWidth + plotEffectivePadding / 2);
        count++;
      }
    });

    groupNetHalfWidth = groupNetWidth / 2;
    xPosFirst = xAxisZeroPos - groupNetHalfWidth;
    xPosNext = xAxisFirstPos - groupNetHalfWidth;

    if (xPosNext - (xPosFirst + groupNetWidth) < groupNetGapWidth) {
      isCrisp = false;
    }

    if (plotSpacePercent === 0) {
      isCrisp = true;
    }

    manager.addToEnv('isCrisp', isCrisp);
  }
  /**
   * function to accomodate the changes of its child and notify its parent for further action if its needed
   * @param  {Object} updateInfo is an object with the informations about the changes in its child
   */
  ;

  _proto.childChanged = function childChanged(updateInfo) {
    if (updateInfo === void 0) {
      updateInfo = {};
    }

    var manager = this,
        config = manager.config,
        parent = manager.getLinkedParent(),
        range,
        count = 0,
        prevVisiblity = manager.getState('visible'),
        changeInfo = {},
        informParent; // get the number of visible children

    manager._mapChildren(function (child) {
      if (child.getState('visible')) {
        count++;
      }
    }); // set the manager visiblity according to number of children visible


    manager.setState('visible', !!count); // if the visiblity state changed then parent inform flag set to true

    prevVisiblity !== !!count && (informParent = true); // if the managers data limit get changed then also inform the parent

    if (updateInfo.dataLimitChanged !== false) {
      range = manager.getDataLimits();

      if (range.min !== config.range.min || range.max !== config.range.max) {
        config.range.min = range.min;
        config.range.max = range.max;
        changeInfo.dataLimitChanged = true;
        informParent = true;
      }
    } // if the axis value got changed then inform parent
    // right now we do not change value padding on any type of update
    // if (updateInfo.paddingChanged !== false) {
    //   padding = manager.getAxisValuePadding();
    //   if (padding.left !== config.padding.left || padding.right !== config.padding.right) {
    //     config.padding.left = padding.left;
    //     config.padding.right = padding.right;
    //     changeInfo.paddingChanged = true;
    //     informParent = true;
    //   }
    // }


    if (informParent) {
      parent.childChanged && parent.childChanged(changeInfo);
    } else {
      manager.asyncDraw();
    }
  }
  /**
   * function to get value for axis padding from is children
   * @return {Object} with left and right member
   */
  ;

  _proto.getAxisValuePadding = function getAxisValuePadding() {
    var paddingObj = {},
        axisPaddingLeft = -Infinity,
        axisPaddingRight = -Infinity;

    this._mapChildren(function (child) {
      if (child.getState('removed')) {
        return;
      }

      paddingObj = child.getAxisValuePadding && child.getAxisValuePadding() || {};
      axisPaddingLeft = Math.max(axisPaddingLeft, paddingObj.left || -Infinity);
      axisPaddingRight = Math.max(axisPaddingRight, paddingObj.right || -Infinity);
    });

    if (axisPaddingLeft === -Infinity) {
      axisPaddingLeft = 0;
    }

    if (axisPaddingRight === -Infinity) {
      axisPaddingRight = 0;
    }

    if (!this.config.padding) {
      this.config.padding = {};
      this.config.padding.left = axisPaddingLeft;
      this.config.padding.right = axisPaddingRight;
    }

    return {
      left: axisPaddingLeft,
      right: axisPaddingRight
    };
  }
  /**
   * function to get data limits from its child datasets
   * return minimun and maximum value among the datasets limit
   * @param {boolean} allVisible  whether consider all the datasets are visible or not
   * @return {Object}             [min, max]
   */
  ;

  _proto.getDataLimits = function getDataLimits(allVisible) {
    var manager = this,
        min = +Infinity,
        max = -Infinity,
        maxminObj,
        numOfBars = 0,
        getMaxMin = function getMaxMin(_maxminObj) {
      max = Math.max(max, _maxminObj.max);
      min = Math.min(min, _maxminObj.min);
    };

    manager._mapChildren(function (child) {
      if (child.getState('removed')) {
        return;
      }

      if (child.getState('visible') === false) {
        if (allVisible) {
          maxminObj = child.getDataLimits(allVisible);
          getMaxMin(maxminObj);
        }

        return;
      }

      numOfBars++;
      maxminObj = child.getDataLimits(allVisible);
      getMaxMin(maxminObj);
    });

    if (!numOfBars) {
      manager.setState('visible', false);
    } else {
      manager.setState('visible', true);
    }

    if (!this.config.range) {
      this.config.range = {};
      this.config.range.min = this.config.dataMin;
      this.config.range.max = this.config.dataMax;
    }

    return {
      max: max,
      min: min
    };
  }
  /**
   * it return the status of dataset visiblity
   * @return {boolean} returns the visiblity status of dataset
   */
  ;

  _proto.isVisible = function isVisible() {
    return !this.isNotVisible;
  };

  return BarMultiSeriesgroup;
}(_componentInterface.ComponentInterface);

var _default = BarMultiSeriesgroup;
exports["default"] = _default;

/***/ }),

/***/ 729:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _componentInterface = __webpack_require__(290);

var _lib = __webpack_require__(274);

var BubbleDatasetGroup = /*#__PURE__*/function (_ComponentInterface) {
  (0, _inheritsLoose2.default)(BubbleDatasetGroup, _ComponentInterface);

  /**
   * constructor function this class
   */
  function BubbleDatasetGroup() {
    var _this;

    _this = _ComponentInterface.call(this) || this;

    _this.setState('visible', true);

    return _this;
  }
  /**
   * Create child containers
   */


  var _proto = BubbleDatasetGroup.prototype;

  _proto.createContainer = function createContainer() {
    var manager = this,
        key,
        animationManager = manager.getFromEnv('animationManager'),
        parent = manager.getLinkedParent(),
        pContainer,
        parentChildContainers = parent.getChildContainer();

    for (key in parentChildContainers) {
      pContainer = parentChildContainers[key];
      !manager.getChildContainer(key) && manager.addChildContainer(key, animationManager.setAnimation({
        el: 'group',
        attr: {
          name: 'manager-' + key
        },
        component: manager,
        container: pContainer
      }));
    }
  }
  /**
   * function call sync draw of its children
   */
  ;

  _proto.draw = function draw() {
    this.createContainer();
  };

  _proto.getDataLimitRange = function getDataLimitRange() {
    var vcanvas = this,
        children = vcanvas.getChildren(),
        i,
        key,
        child,
        len,
        limits,
        zMax = -Infinity,
        zMin = +Infinity,
        xMax = -Infinity,
        xMin = +Infinity;

    for (key in children) {
      if (children.hasOwnProperty(key)) {
        child = children[key];

        if (child instanceof Array) {
          len = child.length;

          for (i = 0; i < len; i++) {
            if (child[i].getState('removed')) {
              continue;
            }

            limits = child[i].getDataLimits();
            xMax = Math.max(xMax, limits.xMax || -Infinity);
            xMin = Math.min(xMin, limits.xMin || +Infinity);
            zMax = Math.max(zMax, limits.zMax || -Infinity);
            zMin = Math.min(zMin, limits.zMin || +Infinity);
          }
        }
      }
    }

    zMax = zMax === -Infinity ? 0 : zMax;
    zMin = zMin === +Infinity ? 0 : zMin;
    return {
      xMax: xMax,
      xMin: xMin,
      zMax: zMax,
      zMin: zMin
    };
  }
  /**
   * function to accomodate the changes of its child and notify its parent for further action if its needed
   * @param  {Object} updateInfo is an object with the informations about the changes in its child
   */
  ;

  _proto.childChanged = function childChanged(updateInfo) {
    if (updateInfo === void 0) {
      updateInfo = {};
    }

    var manager = this,
        config = manager.config,
        parent = manager.getLinkedParent(),
        range,
        padding,
        changeInfo = {},
        ifInformParent;

    if (updateInfo.hide !== false || updateInfo.show !== false) {
      manager._mapChildren(function (child) {
        child.setState('dirty', true);
      });

      ifInformParent = true;
    }

    if (updateInfo.dataLimitChanged !== false) {
      range = manager.getDataLimits();

      if (range.min !== config.range.min || range.max !== config.range.max) {
        config.range.min = range.min;
        config.range.max = range.max;
        changeInfo.dataLimitChanged = true;
        ifInformParent = true;
      }
    }

    if (updateInfo.paddingChanged !== false) {
      padding = manager.getAxisValuePadding();

      if (padding.left !== config.padding.left || padding.right !== config.padding.right) {
        config.padding.left = padding.left;
        config.padding.right = padding.right;
        changeInfo.paddingChanged = true;
        ifInformParent = true;
      }
    }

    if (ifInformParent) {
      parent.childChanged && parent.childChanged(changeInfo);
    } else {
      manager.asyncDraw();
    }
  }
  /**
   * function to get value for axis padding from is children
   * @return {Object} with left and right member
   */
  ;

  _proto.getAxisValuePadding = function getAxisValuePadding() {
    var paddingObj = {},
        axisPaddingLeft = -Infinity,
        axisPaddingRight = -Infinity;

    this._mapChildren(function (child) {
      if (child.getState('removed') || child.getState('visible') === false) {
        return;
      }

      paddingObj = child.getAxisValuePadding && child.getAxisValuePadding() || {};
      axisPaddingLeft = Math.max(axisPaddingLeft, paddingObj.left || -Infinity);
      axisPaddingRight = Math.max(axisPaddingRight, paddingObj.right || -Infinity);
    });

    if (axisPaddingLeft === -Infinity) {
      axisPaddingLeft = 0;
    }

    if (axisPaddingRight === -Infinity) {
      axisPaddingRight = 0;
    }

    if (!this.config.padding) {
      this.config.padding = {};
      this.config.padding.left = axisPaddingLeft;
      this.config.padding.right = axisPaddingRight;
    }

    return {
      left: axisPaddingLeft,
      right: axisPaddingRight
    };
  }
  /**
   * function to calculate maximum canvas padding is required by the children of this manager
   * @return {Object} contains dimension required
   */
  ;

  _proto.getCanvasPadding = function getCanvasPadding() {
    var manager = this,
        dim,
        key,
        returnDimension = {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    };

    manager._mapChildren(function (child) {
      if (child.getState('removed')) {
        return;
      }

      dim = child.getCanvasPadding && child.getCanvasPadding() || {};

      for (key in dim) {
        if (dim.hasOwnProperty(key)) {
          returnDimension[key] = Math.max(dim[key], returnDimension[key]);
        }
      }
    });

    return returnDimension;
  }
  /**
   * function to get data limits from its child datasets
   * return minimun and maximum value among the datasets limit
   * @return {Object} [min, max]
   */
  ;

  _proto.getDataLimits = function getDataLimits() {
    var manager = this,
        chart = manager.getFromEnv('chart'),
        infMin = -Infinity,
        infMax = +Infinity,
        max = infMin,
        min = infMax,
        xMin = infMax,
        xMax = infMin,
        maxminObj,
        xMaxValue,
        xMinValue,
        getMaxMin = function getMaxMin(_maxminObj) {
      xMaxValue = (0, _lib.pluck)(_maxminObj.xMax, infMin);
      xMinValue = (0, _lib.pluck)(_maxminObj.xMin, infMax);
      max = Math.max(max, _maxminObj.max);
      min = Math.min(min, _maxminObj.min);
      xMax = Math.max(xMax, xMaxValue);
      xMin = Math.min(xMin, xMinValue);
    };

    manager._mapChildren(function (child) {
      if (!child.getDataLimits || child.getState('removed')) {
        return;
      }

      maxminObj = child.getDataLimits();
      getMaxMin(maxminObj);
    });

    max === -Infinity && (max = 0);
    min === +Infinity && (min = 0);

    if (!this.config.range) {
      this.config.range = {};
      this.config.range.min = min;
      this.config.range.max = max;
      this.config.range.xMin = xMin;
      this.config.range.xMax = xMax;
    }

    chart.config.yMax = max;
    chart.config.yMin = min;
    return {
      min: min,
      max: max,
      xMin: xMin,
      xMax: xMax
    };
  }
  /**
   * it return the status of dataset visiblity
   * @return {boolean} returns the visiblity status of dataset
   */
  ;

  _proto.isVisible = function isVisible() {
    return !this.isNotVisible;
  };

  _proto.getType = function getType() {
    return 'manager';
  };

  _proto.getName = function getName() {
    return 'BubbleGroupManager';
  };

  _proto.remove = function remove() {
    var manager = this;

    manager._mapChildren(function (child) {
      if (!child.getState('removed')) {
        child.remove();
      }
    });

    _ComponentInterface.prototype.remove.call(this);
  };

  return BubbleDatasetGroup;
}(_componentInterface.ComponentInterface);

var _default = BubbleDatasetGroup;
exports["default"] = _default;

/***/ }),

/***/ 610:
/***/ ((__unused_webpack_module, exports) => {



exports.__esModule = true;
exports["default"] = void 0;
var _default = {
  'initial.group.column3d': function initialGroupColumn3d() {
    return {
      'zeroPlane.appearing': function zeroPlaneAppearing() {
        return [{
          initialAttr: {
            opacity: 0
          },
          finalAttr: {
            opacity: 1
          },
          slot: 'axis'
        }];
      }
    };
  }
};
exports["default"] = _default;

/***/ }),

/***/ 609:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _componentInterface = __webpack_require__(290);

var _dependencyManager = __webpack_require__(282);

var _index = _interopRequireDefault(__webpack_require__(610));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
(0, _dependencyManager.addDep)({
  name: 'column3dManagerAnimation',
  type: 'animationRule',
  extension: _index.default
});
/**
 * ColumnMultiSeriesgroup basically manages all the position of multiseries columns side by side.
 * suppose multiseries column chart contains 2 dataset now what will be the column width and
 * position to accomodate all the columns. This manager conveys the column width and position
 * for every column plots to its children
 */

var Column3dGroup = /*#__PURE__*/function (_ComponentInterface) {
  (0, _inheritsLoose2.default)(Column3dGroup, _ComponentInterface);

  /**
   * Sets the type of the component
   * @return {string} type
   */

  /**
   * constructor function this class
   */
  function Column3dGroup() {
    var _this;

    _this = _ComponentInterface.call(this) || this;

    _this.setState('visible', true);

    return _this;
  }
  /**
   * Sets the type of the component
   * @return {string} type
   */


  var _proto = Column3dGroup.prototype;

  _proto.getType = function getType() {
    return 'group';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  _proto.getName = function getName() {
    return 'column3d';
  }
  /**
   * function to calculate maximum canvas padding is required by the children of this manager
   * @return {Object} contains dimension required
   */
  ;

  _proto.getCanvasPadding = function getCanvasPadding() {
    var manager = this,
        dim,
        key,
        returnDimension = {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    };

    manager._mapChildren(function (child) {
      dim = child.getCanvasPadding && child.getCanvasPadding() || {};

      for (key in dim) {
        if (dim.hasOwnProperty(key)) {
          returnDimension[key] = Math.max(dim[key], returnDimension[key]);
        }
      }
    });

    return returnDimension;
  }
  /**
   * Create child containers
   */
  ;

  _proto.createContainer = function createContainer() {
    var manager = this,
        animationManager = manager.getFromEnv('animationManager'),
        key,
        parent = manager.getLinkedParent(),
        pContainer,
        parentChildContainers = parent.getChildContainer();

    for (key in parentChildContainers) {
      pContainer = parentChildContainers[key];
      !manager.getChildContainer(key) && manager.addChildContainer(key, animationManager.setAnimation({
        el: 'group',
        attr: {
          name: 'manager' + key
        },
        container: pContainer,
        component: manager,
        label: 'group'
      }));
    }
  }
  /**
   * Draws container for 3d plots
   */
  ;

  _proto.draw3DContainer = function draw3DContainer() {
    var manager = this,
        animationManager = manager.getFromEnv('animationManager'),
        container = manager.getChildContainer('plotGroup3d'),
        xAxis = manager.getFromEnv('xAxis'),
        ii = xAxis.getTicksLen(),
        i,
        plotNegativeGroup = container && container.negative,
        plotPositiveGroup = container && container.positive,
        parentContainer = this.getLinkedParent().getChildContainer().columnVcanvasGroup; // Create plotGroup3d group

    !manager.getChildContainer('plotGroup3d') && manager.addChildContainer('plotGroup3d', animationManager.setAnimation({
      el: 'group',
      attr: {
        name: '3d-plots'
      },
      container: parentContainer,
      component: manager,
      label: 'group'
    }));
    container = manager.getChildContainer('plotGroup3d');
    manager.addToEnv('plotGroup3d', container); // Create plotNegativeGroup

    plotNegativeGroup = container.negative = animationManager.setAnimation({
      el: plotNegativeGroup || 'group',
      attr: {
        name: 'negative-values'
      },
      container: container,
      component: manager,
      label: 'group'
    }); // Create plotPositivegroup

    plotPositiveGroup = container.positive = animationManager.setAnimation({
      el: plotPositiveGroup || 'group',
      attr: {
        name: 'positive-values'
      },
      container: container,
      component: manager,
      label: 'group'
    }); // Create zeroPlane group

    container.zeroPlane = animationManager.setAnimation({
      el: container.zeroPlane || 'group',
      attr: {
        name: 'zero-plane'
      },
      container: container,
      component: manager,
      label: 'group'
    }).insertBefore(container.positive); // Create Negative group array for data plots having Negative value, if not present.

    if (!(container.negativeGroupArray = container.negativeGroupArray = plotNegativeGroup.data('categoryplots'))) {
      plotNegativeGroup.data('categoryplots', new Array(ii));
      container.negativeGroupArray = plotNegativeGroup.data('categoryplots');
    } // Create Positive group array for data plots having Positive value, if not present.


    if (!(container.positiveGroupAarray = container.positiveGroupAarray = plotPositiveGroup.data('categoryplots'))) {
      plotPositiveGroup.data('categoryplots', new Array(ii));
      container.positiveGroupAarray = plotPositiveGroup.data('categoryplots');
    }

    for (i = 0; i < ii; i++) {
      /*
      * Create seperate group for each data plot having Negative value, if not present.
      * Store the group in Negative group array
      */
      container.negativeGroupArray[i] = animationManager.setAnimation({
        el: container.negativeGroupArray[i] || 'group',
        attr: {
          name: 'negative-group-' + i
        },
        container: plotNegativeGroup,
        component: manager,
        label: 'group'
      });
      /*
      * Create seperate group for each data plot having Positive value, if not present.
      * Store the group in Positive group array
      */

      container.positiveGroupAarray[i] = animationManager.setAnimation({
        el: container.positiveGroupAarray[i] || 'group',
        attr: {
          name: 'positive-group-' + i
        },
        container: plotPositiveGroup,
        component: manager,
        label: 'group'
      });
    }
  }
  /**
   * Draws zero plane
   */
  ;

  _proto.drawZeroPlane = function drawZeroPlane() {
    var manager = this,
        chart = manager.getFromEnv('chart'),
        animationManager = chart.getFromEnv('animationManager'),
        isBar = chart.isBar,
        chartConfig = chart.config,
        use3DLighting = chartConfig.use3dlighting,
        container = manager.getChildContainer('plotGroup3d'),
        yAxis = manager.getFromEnv('yAxis'),
        yAxisMaxmin = yAxis.getLimit(),
        yMax = yAxisMaxmin.max,
        yMin = yAxisMaxmin.min,
        zeroPlane = manager.getGraphicalElement('zeroplane'),
        zeroplaneAttr = {},
        xDepth = chartConfig.xDepth,
        yDepth = chartConfig.yDepth,
        yBasePos = yAxis.getPixel(yAxis.getAxisBase()),
        MINWIDTH = 1,
        data,
        attr,
        zeroPlaneGroup;

    if (yMin < 0 && yMax >= 0) {
      !manager.graphics && (manager.graphics = {});
      zeroPlaneGroup = container.zeroPlane;
      zeroplaneAttr.fill = chartConfig.zeroPlaneColor;
      zeroplaneAttr.noGradient = !use3DLighting;
      zeroplaneAttr.stroke = chartConfig.zeroPlaneBorderColor || 'none';
      zeroplaneAttr['stroke-width'] = chartConfig.zeroPlaneShowBorder ? 1 : 0;
      zeroplaneAttr.x = isBar ? yBasePos - xDepth : chartConfig.canvasLeft - xDepth;
      zeroplaneAttr.y = isBar ? chartConfig.canvasTop + yDepth : yBasePos + yDepth;
      zeroplaneAttr.width = isBar ? MINWIDTH : chartConfig.canvasWidth;
      zeroplaneAttr.height = isBar ? chartConfig.canvasHeight : MINWIDTH;
      zeroplaneAttr.xDepth = xDepth;
      zeroplaneAttr.yDepth = yDepth; // If zeroPlane is present, show it.

      if (zeroPlane) {
        zeroPlane.show();

        zeroPlane._.cubetop.show();

        zeroPlane._.cubeside.show();
      }

      data = {
        el: zeroPlane || 'cubepath',
        attr: zeroplaneAttr,
        container: zeroPlaneGroup,
        component: manager,
        label: 'zeroPlane'
      };
    } else {
      if (zeroPlane) {
        if (isBar) {
          attr = {
            x: yBasePos - yDepth
          };
        } else {
          attr = {
            y: yBasePos + yDepth
          };
        }

        data = {
          el: zeroPlane,
          attr: attr,
          component: manager,
          doNotRemove: true,
          callback: function callback() {
            zeroPlane.hide();

            zeroPlane._.cubetop.hide();

            zeroPlane._.cubeside.hide();
          },
          container: container,
          label: 'zeroPlane'
        };
      }
    }

    data && manager.addGraphicalElement('zeroplane', animationManager.setAnimation(data));
  }
  /**
   * function call sync draw of its children
   */
  ;

  _proto.draw = function draw() {
    this.createContainer();
    this.draw3DContainer();
    this.drawZeroPlane();
  }
  /**
   * function to accomodate the changes of its child and notify its parent for further action if its needed
   * @param  {Object} updateInfo is an object with the informations about the changes in its child
   */
  ;

  _proto.childChanged = function childChanged(updateInfo) {
    if (updateInfo === void 0) {
      updateInfo = {};
    }

    var manager = this,
        config = manager.config,
        parent = manager.getLinkedParent(),
        range,
        count = 0,
        prevVisiblity = manager.getState('visible'),
        changeInfo = {},
        informParent; // get the number of visible children

    manager._mapChildren(function (child) {
      if (child.getState('visible')) {
        count++;
      }
    }); // set the manager visiblity according to number of children visible


    manager.setState('visible', !!count); // if the visiblity state changed then parent inform flag set to true

    prevVisiblity !== !!count && (informParent = true); // if the managers data limit get changed then also inform the parent

    if (updateInfo.dataLimitChanged !== false) {
      range = manager.getDataLimits();

      if (range.min !== config.range.min || range.max !== config.range.max) {
        config.range.min = range.min;
        config.range.max = range.max;
        changeInfo.dataLimitChanged = true;
        informParent = true;
      }
    } // if the axis value got changed then inform parent
    // right now we do not change value padding on any type of update
    // if (updateInfo.paddingChanged !== false) {
    //   padding = manager.getAxisValuePadding();
    //   if (padding.left !== config.padding.left || padding.right !== config.padding.right) {
    //     config.padding.left = padding.left;
    //     config.padding.right = padding.right;
    //     changeInfo.paddingChanged = true;
    //     informParent = true;
    //   }
    // }


    if (informParent) {
      parent.childChanged && parent.childChanged(changeInfo);
    } else {
      manager.asyncDraw();
    }
  }
  /**
   * function to get value for axis padding from is children
   * @return {Object} with left and right member
   */
  ;

  _proto.getAxisValuePadding = function getAxisValuePadding() {
    var paddingObj = {},
        axisPaddingLeft = -Infinity,
        axisPaddingRight = -Infinity;

    this._mapChildren(function (child) {
      if (child.getState('removed')) {
        return;
      }

      paddingObj = child.getAxisValuePadding && child.getAxisValuePadding() || {};
      axisPaddingLeft = Math.max(axisPaddingLeft, paddingObj.left || -Infinity);
      axisPaddingRight = Math.max(axisPaddingRight, paddingObj.right || -Infinity);
    });

    if (axisPaddingLeft === -Infinity) {
      axisPaddingLeft = 0;
    }

    if (axisPaddingRight === -Infinity) {
      axisPaddingRight = 0;
    }

    if (!this.config.padding) {
      this.config.padding = {};
      this.config.padding.left = axisPaddingLeft;
      this.config.padding.right = axisPaddingRight;
    }

    return {
      left: axisPaddingLeft,
      right: axisPaddingRight
    };
  }
  /**
   * function to get data limits from its child datasets
   * return minimun and maximum value among the datasets limit
   * @param {boolean} allVisible  whether consider all the datasets are visible or not
   * @return {Object}             [min, max]
   */
  ;

  _proto.getDataLimits = function getDataLimits(allVisible) {
    var manager = this,
        min = +Infinity,
        max = -Infinity,
        maxminObj,
        numOfColumns = 0,
        getMaxMin = function getMaxMin(_maxminObj) {
      max = Math.max(max, _maxminObj.max);
      min = Math.min(min, _maxminObj.min);
    };

    manager._mapChildren(function (child) {
      if (child.getState('removed')) {
        return;
      }

      if (child.getState('visible') === false) {
        if (allVisible) {
          maxminObj = child.getDataLimits(allVisible);
          getMaxMin(maxminObj);
        }

        return;
      }

      numOfColumns++;
      maxminObj = child.getDataLimits(allVisible);
      getMaxMin(maxminObj);
    });

    if (!numOfColumns) {
      manager.setState('visible', false);
    } else {
      manager.setState('visible', true);
    }

    if (!this.config.range) {
      this.config.range = {};
      this.config.range.min = this.config.dataMin;
      this.config.range.max = this.config.dataMax;
    }

    return {
      max: max,
      min: min
    };
  }
  /**
   * it return the status of dataset visiblity
   * @return {boolean} returns the visiblity status of dataset
   */
  ;

  _proto.isVisible = function isVisible() {
    return !this.isNotVisible;
  };

  return Column3dGroup;
}(_componentInterface.ComponentInterface);

var _default = Column3dGroup;
exports["default"] = _default;

/***/ }),

/***/ 778:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _cartesianStack = _interopRequireDefault(__webpack_require__(698));

var _lib = __webpack_require__(274);

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var createGroup = function createGroup(groupName, parentContainer, manager) {
  var animationManager = manager.getFromEnv('animationManager');
  return animationManager.setAnimation({
    el: 'group',
    attr: {
      name: groupName
    },
    container: parentContainer,
    component: manager,
    label: 'group'
  });
};
/**
 * class for marimekko group manager
 */


var MarimekkoStackgroup = /*#__PURE__*/function (_CartesianStackgroup) {
  (0, _inheritsLoose2.default)(MarimekkoStackgroup, _CartesianStackgroup);

  function MarimekkoStackgroup() {
    return _CartesianStackgroup.apply(this, arguments) || this;
  }

  var _proto = MarimekkoStackgroup.prototype;

  /**
   * Sets the type of the component
   * @return {string} type
   */
  _proto.getType = function getType() {
    return 'group';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  _proto.getName = function getName() {
    return 'marimekkoStackgroup';
  }
  /**
   * Function to return the stackConf of groupmanager
   * @return {Object} configurations
   */
  ;

  _proto.getstackConf = function getstackConf() {
    return this.config.stackConf;
  }
  /**
   * function to calculate plot position, max and min of manager in case a of stacked dataset
   */
  ;

  _proto._setStackPosition = function _setStackPosition() {
    _CartesianStackgroup.prototype._setStackPosition.call(this);

    var manager = this,
        config = manager.config,
        stackPercentValues,
        stackConf = config.stackConf || (config.stackConf = []),
        stackSumValue = config.stackValues,
        catObj,
        categories = manager.getFromEnv('categories')[0].category,
        numberFormatter = manager.getFromEnv('number-formatter'),
        positionStackConfig,
        sum = 0,
        sumValue = 0,
        sumPercent = 0,
        k,
        len,
        x,
        xAxis = manager.getFromEnv('xAxis'),
        range = xAxis.getVisibleConfig(),
        xMin = range.minValue,
        xMax = range.maxValue,
        diff = xMax - xMin,
        tempX = xMin;

    for (k = 0, len = stackSumValue.length; k < len; k++) {
      sumValue += stackSumValue[k] && stackSumValue[k].positive || 0;
    }

    config.totalSumValue = sumValue;

    for (k = 0; k < categories.length; k++) {
      catObj = categories[k];

      if (catObj.widthpercent) {
        sum += numberFormatter.getCleanValue(catObj.widthpercent);
      }
    }

    if (+sum.toFixed(8) === 100) {
      sum = +sum.toFixed(8);
      config.setUserWidth = 1;
    }

    stackPercentValues = manager.getStackSumPercent();

    for (k = 0, len = stackSumValue.length; k < len; k++) {
      if (!(positionStackConfig = stackConf[k])) {
        positionStackConfig = stackConf[k] = {};
      }

      sumPercent = sumPercent + stackPercentValues[k] / 100;
      x = stackPercentValues[k] / 100 * diff / 2 + tempX;
      tempX = sumPercent * diff + xMin;
      positionStackConfig.x = x;
      xAxis.updateTicksValues(k, {
        x: x
      });
    }
  }
  /**
   * This function returns an array containing the percent values of individual stack
   * @return {Array} conatains the total value of each stack in percentage
   */
  ;

  _proto.getStackSumPercent = function getStackSumPercent() {
    var manager = this,
        config = manager.config,
        stackSumValue = config.stackValues,
        totalSumValue = config.totalSumValue,
        i,
        numberFormatter = manager.getFromEnv('number-formatter'),
        categories = manager.getFromEnv('categories')[0].category,
        setUserWidth = config.setUserWidth,
        arr = [];

    for (i = 0; i < stackSumValue.length; i++) {
      if (setUserWidth) {
        arr[i] = numberFormatter.getCleanValue(categories[i].widthpercent);
      } else {
        arr[i] = (stackSumValue[i] && stackSumValue[i].positive || 0) / totalSumValue * 100;
      }
    }

    return arr;
  }
  /**
   * Draw function of group manager
   */
  ;

  _proto.draw = function draw() {
    _CartesianStackgroup.prototype.draw.call(this);

    this.drawLabel();
  }
  /**
   * Function to create container for labels
   */
  ;

  _proto.createContainer = function createContainer() {
    _CartesianStackgroup.prototype.createContainer.call(this);

    var manager = this,
        parent = manager.getLinkedParent();
    !manager.getContainer('commonLabelContainer') && manager.addContainer('commonLabelContainer', createGroup('manager-commonLabelContainer', parent.getChildContainer('vcanvasLabelGroup'), manager));
  }
  /**
   * This function draws the cumulative percentage labels appearing at bottom right of the stack
   */
  ;

  _proto.drawLabel = function drawLabel() {
    var manager = this,
        config = manager.config,
        smartLabel = manager.getFromEnv('smartLabel'),
        animationManager = manager.getFromEnv('animationManager'),
        stackPercentValues = manager.getStackSumPercent(),
        chartAttr = manager.getFromEnv('chart-attrib'),
        jsonData,
        datasets = manager.getChildren('dataset'),
        dataset,
        data,
        stackConf = config.stackConf,
        xPos,
        yPos,
        index,
        commonLabelContainer = manager.getContainer('commonLabelContainer'),
        numberFormatter = manager.getFromEnv('number-formatter'),
        percentValue = 0,
        formatedPercentValue,
        attr,
        chartConfig = manager.getFromEnv('chartConfig'),
        canvasBottom = chartConfig.canvasBottom,
        xAxis = manager.getFromEnv('xAxis'),
        inCanvasStyle = manager.getFromEnv('style'),
        style = chartConfig.dataLabelStyle,
        length = stackPercentValues.length,
        bBoxObj,
        labelEle,
        labelEleCheck,
        sumValues = config.stackValues,
        borderColor,
        bgColor,
        borderThickness,
        showXAxisPercentValues = chartConfig.showXAxisPercentValues,
        labels = manager.getGraphicalElement('commonLabels') || [],
        prevLabelLen = labels.length,
        i,
        j;
    smartLabel.setStyle(style);

    if (showXAxisPercentValues) {
      bgColor = (0, _lib.pluck)(style.backgroundColor, '#ffffff');
      borderColor = (0, _lib.pluck)(style.borderColor === _lib.BLANKSTRING ? '#' + inCanvasStyle.inCancolor : style.borderColor, '#000000');
      borderThickness = (0, _lib.pluck)(style.borderThickness, 1);

      for (index = 0; index < length - 1; index++) {
        if (!sumValues[index]) {
          continue;
        }

        percentValue += stackPercentValues[index];
        formatedPercentValue = numberFormatter.percentValue(percentValue);
        xPos = xAxis.getPixel(stackConf[index].x) + stackConf[index].columnWidth / 2;
        yPos = canvasBottom;
        labelEleCheck = labels[index];

        if (sumValues[index].positive === sumValues[index].negative) {
          formatedPercentValue = _lib.BLANKSTRING;

          if (labelEleCheck) {
            labelEleCheck.hide();
          }

          continue;
        }

        attr = {
          text: formatedPercentValue,
          fill: style.color,
          'text-bound': [bgColor, borderColor, borderThickness, style.borderPadding, style.borderRadius, style.borderDash],
          'line-height': style.lineHeight,
          visibility: _lib.visibleStr
        };
        bBoxObj = smartLabel.getOriSize(formatedPercentValue);
        yPos = yPos - bBoxObj.height / 2 - borderThickness;
        attr.x = xPos;
        attr.y = yPos;
        labelEleCheck && labelEleCheck.show();
        labelEle = animationManager.setAnimation({
          el: labelEleCheck || 'text',
          container: commonLabelContainer,
          attr: attr,
          label: 'text',
          component: manager
        });

        if (!labelEleCheck) {
          manager.addGraphicalElement('commonLabels', labelEle, true);
        }
      }

      for (var count = index; count < prevLabelLen; count++) {
        labels[count].hide();
      }
    }

    for (i = 0; i < datasets.length; i++) {
      dataset = datasets[i];
      data = dataset.components.data;
      jsonData = dataset.config.JSONData;

      for (j = 0; j < data.length; j++) {
        data[j].config.finalTooltext = (0, _lib.parseTooltext)(data[j].config.finalTooltext, [111], {
          xAxisPercentValue: stackPercentValues[j] && stackPercentValues[j].toPrecision(4) + '%'
        }, data, chartAttr, jsonData);
      }
    }
  }
  /**
   * Helper function for determining the xPos of sumLabel
   * @param {number} index The index of the sumLabel
   * @return {number} x-position
   */
  ;

  _proto._getXpos = function _getXpos(index) {
    var manager = this,
        xAxis = manager.getFromEnv('xAxis');
    return xAxis.getPixel(manager.config.stackConf[index].x);
  }
  /**
   * Function to set column width and position of all the stacks
   */
  ;

  _proto._setStackDimensions = function _setStackDimensions() {
    var manager = this,
        config = manager.config,
        k,
        stackSumValue = config.stackValues,
        categories = manager.getFromEnv('categories')[0].category,
        catObj,
        setUserWidth,
        len,
        sum = 0,
        positionStackConfig,
        numberFormatter = manager.getFromEnv('number-formatter'),
        percentValue,
        stackPercentValues = manager.getStackSumPercent(),
        canvasWidth = manager.getFromEnv('canvasConfig').canvasWidth,
        stackConf = config.stackConf || (config.stackConf = []);

    for (k = 0; k < categories.length; k++) {
      catObj = categories[k];

      if (catObj.widthpercent) {
        sum += numberFormatter.getCleanValue(catObj.widthpercent);
      }
    }

    if (+sum.toFixed(8) === 100) {
      setUserWidth = config.setUserWidth = 1;
      sum = +sum.toFixed(8);
    }

    for (k = 0, len = stackSumValue.length; k < len; k++) {
      catObj = categories[k];

      if (!(positionStackConfig = stackConf[k])) {
        positionStackConfig = stackConf[k] = {};
      }

      if (setUserWidth) {
        percentValue = numberFormatter.getCleanValue(catObj.widthpercent) / 100;
      } else {
        percentValue = stackPercentValues[k] / 100;
      }

      positionStackConfig.columnWidth = percentValue * canvasWidth;
    }
  };

  return MarimekkoStackgroup;
}(_cartesianStack.default);

var _default = MarimekkoStackgroup;
exports["default"] = _default;

/***/ }),

/***/ 777:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



exports.__esModule = true;
exports["default"] = void 0;

var _lib = __webpack_require__(274);

var _default = {
  'initial.dataset.marimekko': function initialDatasetMarimekko() {
    var component = this,
        chart = component.getFromEnv('chart'),
        yDepth = chart.config.yDepth || 0,
        yAttrKey = 'y',
        // eslint-disable-line good-practices/no-static-strings-in-scope
    hAttrKey = 'height',
        // eslint-disable-line good-practices/no-static-strings-in-scope
    yAxis = component.getFromEnv('yAxis');
    return {
      'rect.appearing': function rectAppearing(inputJSON) {
        // appearing animation for the data plots.
        var zeroPos = yAxis.getPixel(yAxis.getAxisBase()) + (chart.isBar ? -yDepth : yDepth),
            actualFinalAttr = inputJSON.attr,
            yAttrVal,
            hAttrVal,
            yBasePos,
            endPosWRT0; // Store final y and h for later use

        yAttrVal = actualFinalAttr[yAttrKey];
        hAttrVal = actualFinalAttr[hAttrKey];
        endPosWRT0 = Math.sign(yAttrVal + hAttrVal / 2 - zeroPos);
        yBasePos = yAttrVal + hAttrVal;
        return [{
          initialAttr: function initialAttr() {
            var initialAttr = {}; // Replace the y and h with initial positions

            initialAttr[yAttrKey] = yBasePos;
            initialAttr[hAttrKey] = 0;
            return initialAttr;
          },
          slot: 'plot',
          startEnd: function startEnd() {
            return _lib.animHelperFN.getTimeByValue({
              start: 0,
              end: 0.6
            }, {
              startPx: zeroPos,
              endPx: endPosWRT0 === 1 ? component.config.yAxisMaxPixel : component.config.yAxisMinPixel
            }, {
              startPx: yBasePos,
              endPx: endPosWRT0 === 1 ? actualFinalAttr[yAttrKey] + actualFinalAttr[hAttrKey] : actualFinalAttr[yAttrKey]
            });
          },
          effect: 'linear'
        }];
      },
      'group.appearing': null,
      'group.updating': null,
      'plotLabel.appearing': [{
        initialAttr: {
          opacity: 0
        },
        slot: 'final'
      }],
      '*': null
    };
  }
};
exports["default"] = _default;

/***/ }),

/***/ 776:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _column = _interopRequireDefault(__webpack_require__(595));

var _lib = __webpack_require__(274);

var _index = _interopRequireDefault(__webpack_require__(777));

var _dependencyManager = __webpack_require__(282);

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var dropHash = _lib.regex.dropHypeash,
    math = Math,
    COLUMN_STR = 'column',
    mathRound = math.round,
    mathAbs = math.abs;
(0, _dependencyManager.addDep)({
  name: 'marimekkoAnimation',
  type: 'animationRule',
  extension: _index.default
});
/**
 * class for Marimekko dataset
 */

var MarimekkoDataset = /*#__PURE__*/function (_ColumnDataset) {
  (0, _inheritsLoose2.default)(MarimekkoDataset, _ColumnDataset);

  /**
   * Constructor function of MarimekkoDataset
   */
  function MarimekkoDataset() {
    var _this;

    _this = _ColumnDataset.call(this) || this;
    _this.config.groupName = COLUMN_STR;
    return _this;
  }
  /**
   * Sets the type of the component
   * @return {string} type
   */


  var _proto = MarimekkoDataset.prototype;

  _proto.getType = function getType() {
    return 'dataset';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  _proto.getName = function getName() {
    return 'marimekko';
  }
  /**
   * Function to configure the dataset
   * @param  {Object} datasetJSON JSON for dataset configurations
   */
  ;

  _proto.configure = function configure(datasetJSON) {
    (0, _lib.fcEach)(datasetJSON.data, function (obj) {
      if (obj) {
        // RED-7982 fix for seperators in marimekko
        obj.value = +obj.value ? mathAbs(obj.value) : typeof obj.value === 'string' && obj.value.charAt(0) === '-' ? obj.value.substring(1) : obj.value; // RED-7982 handle an empty string case

        if (!obj.value || obj.value === '') {
          obj.value = 0;
        }
      }
    });

    _ColumnDataset.prototype.configure.call(this, datasetJSON);
  }
  /**
   * Function to register datasets in the internal data store of legend class.
   */
  ;

  _proto._addLegend = function _addLegend() {
    var dataset = this,
        strokeColor,
        fillColor,
        config,
        chartAttr = dataset.getFromEnv('chart-attrib'),
        legendItem,
        conf = dataset.config,
        legend = dataset.getFromEnv('legend'),
        use3DLighting = (0, _lib.pluckNumber)(dataset.getFromEnv('chart-attrib').useplotgradientcolor, 1),
        color = conf.legendSymbolColor,
        JSONData = dataset.config.JSONData || {},
        lightColor;
    strokeColor = (0, _lib.getLightColor)(color, 60).replace(dropHash, _lib.HASHSTRING);

    if (use3DLighting) {
      lightColor = (0, _lib.getLightColor)(color, 40);
      fillColor = {
        FCcolor: {
          color: color + ',' + color + ',' + lightColor + ',' + color + ',' + color,
          ratio: '0,70,30',
          angle: 270,
          alpha: '100,100,100,100,100'
        }
      };
    } else {
      fillColor = {
        FCcolor: {
          color: color,
          angle: 0,
          ratio: '0',
          alpha: '100'
        }
      };
    }

    config = {
      enabled: conf.includeInLegend,
      type: dataset.type,
      label: (0, _lib.getFirstValue)(dataset.config.JSONData.seriesname),
      usePattern: conf.usePattern,
      legendIconAlpha: (0, _lib.pluckNumber)(JSONData.legendiconalpha),
      patternAttr: {
        patternType: conf.patternType,
        patternAngle: conf.patternAngle,
        patternDensity: conf.patternDensity,
        patternSize: conf.patternSize,
        color: conf.plotColor,
        patternAlpha: conf.patternAlpha,
        patternBgColor: conf.patternBgColor,
        alpha: conf.plotfillalpha
      }
    };

    if (conf.includeinlegend) {
      legendItem = legend.getItem(dataset.config.legendItemId);

      if (!legendItem) {
        dataset.config.legendItemId = legend.createItem(dataset);
        legendItem = legend.getItem(dataset.config.legendItemId);
        dataset.addExtEventListener('fc-click', function () {
          legendItem.itemClickFn();
        }, legendItem);
      }

      legendItem.configure(config);
      legendItem.setStateCosmetics('default', {
        symbol: {
          fill: (0, _lib.toRaphaelColor)(fillColor),
          bgAlpha: (0, _lib.pluckNumber)(JSONData.legendiconbgalpha, JSONData.legendiconalpha, chartAttr.legendiconbgalpha, chartAttr.legendiconalpha, conf.plotfillalpha),
          borderAlpha: (0, _lib.pluckNumber)(JSONData.legendiconborderalpha, JSONData.legendiconalpha, chartAttr.legendiconbordergalpha, chartAttr.legendiconalpha, '100'),
          rawFillColor: fillColor.FCcolor.color,
          stroke: (0, _lib.toRaphaelColor)(strokeColor)
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
  /**
   * Function returns the nearest dataset index
   * @param {number} searchElementIndex The derived search index as per the mouse postion
   * @param {Array} arr Has the information about each stack
   * @return {number} The found dataset index
   */
  ;

  _proto.searchIndex = function searchIndex(searchElementIndex, arr) {
    var dataset = this,
        // chart = dataset.chart,
    xAxis = dataset.getFromEnv('xAxis'),
        minIndex = 0,
        len = arr.length - 1,
        maxIndex = len,
        currentIndex,
        currentElementIndex;

    while (minIndex <= maxIndex) {
      currentIndex = Math.round((minIndex + maxIndex) / 2) || 0;
      currentElementIndex = xAxis.getPixel(arr[currentIndex].x) + arr[currentIndex].columnWidth / 2;

      if (currentElementIndex < searchElementIndex) {
        minIndex = currentIndex + 1;
      } else if (currentElementIndex > searchElementIndex) {
        maxIndex = currentIndex - 1;
      } else {
        return currentIndex;
      }
    }

    return minIndex;
  }
  /**
   * Allocates positions and parses attributes of plot during post spacemanagement
   *
   * @memberof MarimekkoDataset
   */
  ;

  _proto.allocatePosition = function allocatePosition() {
    this.getLinkedParent()._setStackDimensions();

    _ColumnDataset.prototype.allocatePosition.call(this);
  }
  /**
   * Function that return the nearest plot details
   * @param {number} chartX x-axis position of the mouse cordinate
   * @param {number} chartY x-axis position of the mouse cordinate
   * @return {Object} return an object with details of nearest polt and whether it is hovered or not
  */
  ;

  _proto._getHoveredPlot = function _getHoveredPlot(chartX, chartY) {
    var dataset = this,
        groupManager = dataset.getLinkedParent(),
        stackConf = groupManager.getstackConf(),
        // chart = dataset.chart,
    chartConfig = dataset.getFromEnv('chartConfig'),
        configManager = groupManager.config,
        plotBorderThickness = chartConfig.plotborderthickness,
        showPlotBorder = chartConfig.showplotborder,
        len = stackConf.length - 1,
        halfPlotBorderThickness,
        xPos,
        returnValue,
        datasetIndex;
    plotBorderThickness = showPlotBorder ? plotBorderThickness : 0;
    halfPlotBorderThickness = plotBorderThickness / 2;
    halfPlotBorderThickness = halfPlotBorderThickness % 2 === 0 ? halfPlotBorderThickness + 1 : Math.round(halfPlotBorderThickness);
    xPos = chartX + halfPlotBorderThickness;
    datasetIndex = returnValue && configManager.datasetIndex || dataset.searchIndex(xPos, stackConf); // save dataIndex to prevent unnecessary search

    configManager.datasetIndex || (configManager.datasetIndex = datasetIndex); // Checking for overlap between two cosecutive column plots along x-axis

    returnValue = dataset._checkPointerOverColumn(datasetIndex, chartX, chartY); // delete dataIndex

    returnValue ? delete configManager.datasetIndex : dataset.index === len && delete configManager.datasetIndex;
    return returnValue;
  }
  /**
   * Over-writting the function
   * @return {Object} returning the this object to avoid lint error
   */
  ;

  _proto.setColumnPosition = function setColumnPosition() {
    return this;
  }
  /**
   * Setting the width, xPos of the individual column data such that the corresponding stacks share a common boundary
   * @param {number} xPosition The pre-calculated x position
   * @param {number} yPosition The pre-calculated y position
   * @param {number} ht The pre-calculated height position
   * @param {number} wdth The pre-calculated width position
   * @param {number} index The index of the data
   * @return {Object} the calculated xPos, yPos, width and height
   */
  ;

  _proto.fineTunePlotDimension = function fineTunePlotDimension(xPosition, yPosition, ht, wdth, index) {
    var dataSet = this,
        height = ht,
        width = wdth,
        xPos = xPosition,
        yPos = yPosition,
        parent = dataSet.getLinkedParent(),
        stackConf = parent.getstackConf(),
        chart = dataSet.getFromEnv('chart'),
        chartConfig = chart.config,
        plotBorderThickness = chartConfig.plotborderthickness,
        canvasConfig = chart.getChildren('canvas')[0].config,
        canvasBorderWidth = canvasConfig.canvasBorderWidth,
        hasValidCanvasBorder = canvasBorderWidth > 0,
        canvasRight = canvasConfig.canvasRight,
        canvasTop = canvasConfig.canvasTop,
        canvasLeft = canvasConfig.canvasLeft; // if there is no stackConf then return the pre-calculated position

    if (!stackConf.length) {
      return {
        xPos: xPos,
        yPos: yPos,
        width: width,
        height: height
      };
    }

    width = stackConf[index].columnWidth;
    xPos -= width / 2;

    if (parseInt(yPos, 10) <= canvasTop) {
      height -= canvasTop - yPos - +hasValidCanvasBorder;
      yPos = canvasTop - +hasValidCanvasBorder;
    }

    if (plotBorderThickness <= 1) {
      // in case xPos is right of canvas-left position -
      // normalize
      if (mathRound(xPos) <= canvasLeft) {
        width += xPos;
        xPos = canvasLeft - plotBorderThickness / 2 + +!!plotBorderThickness - +hasValidCanvasBorder;
        width -= xPos;
      } // in case plot exceeds canvas-right position -
      // normalize width


      if (mathRound(xPos + width) >= canvasRight) {
        width = canvasRight - xPos + plotBorderThickness / 2 - +!!plotBorderThickness + +hasValidCanvasBorder;
      }
    }

    return {
      xPos: xPos,
      yPos: yPos,
      width: width,
      height: height
    };
  };

  return MarimekkoDataset;
}(_column.default);

var _default = MarimekkoDataset;
exports["default"] = _default;

/***/ }),

/***/ 673:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _index = _interopRequireDefault(__webpack_require__(599));

var _default = {
  'initial.dataset.paretoColumn': _index.default['initial.dataset.column']
};
exports["default"] = _default;

/***/ }),

/***/ 672:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports.ParetoColumnDataset = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _lib = __webpack_require__(274);

var _column = _interopRequireWildcard(__webpack_require__(595));

var _dependencyManager = __webpack_require__(282);

var _index = _interopRequireDefault(__webpack_require__(673));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var PLOTBORDERCOLOR = 'plotBorderColor',
    PLOTGRADIENTCOLOR = 'plotGradientColor',
    SHOWSHADOW = 'showShadow',
    UNDEF,
    math = Math,
    mathMin = math.min,
    mathMax = math.max,
    mathAbs = math.abs,
    HUNDREDSTRING = '100';
(0, _dependencyManager.addDep)({
  name: 'paretoAnimation',
  type: 'animationRule',
  extension: _index.default
});

var ParetoColumnDataset = /*#__PURE__*/function (_ColumnDataset) {
  (0, _inheritsLoose2.default)(ParetoColumnDataset, _ColumnDataset);

  function ParetoColumnDataset() {
    return _ColumnDataset.apply(this, arguments) || this;
  }

  var _proto = ParetoColumnDataset.prototype;

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
    return 'paretoColumn';
  };

  _proto.configureAttributes = function configureAttributes(datasetJSON) {
    if (!datasetJSON) {
      return false;
    }

    this.trimData(datasetJSON);
    this.config.JSONData = datasetJSON;
    var dataSet = this,
        chart = dataSet.getFromEnv('chart'),
        conf = dataSet.config,
        xAxis = dataSet.getFromEnv('xAxis'),
        JSONData = conf.JSONData,
        setDataArr = JSONData.data,
        setDataLen = setDataArr && setDataArr.length,
        len = setDataLen,
        chartAttr = dataSet.getFromEnv('chart-attrib'),
        colorM = dataSet.getFromEnv('color-manager'),
        index = dataSet.index || dataSet.positionIndex,
        showplotborder,
        plotColor = colorM.getPlotColor(index),
        plotBorderDash = (0, _lib.pluckNumber)(JSONData.dashed, chartAttr.plotborderdashed),
        chartConfig = chart.config,
        usePlotGradientColor = chartConfig.useplotgradientcolor,
        showTooltip = (0, _lib.pluckNumber)(chartAttr.showtooltip, 1),
        yAxisName = (0, _lib.parseUnsafeString)(chartAttr.yaxisname),
        xAxisName = (0, _lib.parseUnsafeString)(chartAttr.xaxisname),
        formatedVal,
        parserConfig,
        setTooltext,
        macroIndices,
        tempPlotfillAngle,
        toolText,
        plotDashLen,
        plotDashGap,
        plotBorderThickness,
        isRoundEdges,
        showHoverEffect,
        plotfillAngle,
        plotFillAlpha,
        plotFillRatio,
        plotgradientcolor,
        plotBorderAlpha,
        plotBorderColor,
        plotBorderDashStyle,
        initailPlotBorderDashStyle,
        setData,
        setValue,
        dataObj,
        config,
        colorArr,
        dataStore = dataSet.components.data,
        numberFormatter = dataSet.getFromEnv('number-formatter'),
        setDisplayValue,
        is3D = chartConfig.is3D,
        hoverColor,
        hoverAlpha,
        hoverGradientColor,
        hoverRatio,
        hoverAngle,
        hoverBorderColor,
        hoverBorderAlpha,
        hoverBorderThickness,
        hoverBorderDashed,
        hoverBorderDashGap,
        hoverBorderDashLen,
        hoverDashStyle,
        hoverColorArr,
        enableAnimation,
        setDataDashed,
        setDataPlotDashLen,
        setDataPlotDashGap,
        i,
        maxValue = -Infinity,
        minValue = +Infinity,
        displayValue,
        displayValuePercent,
        sumValue = 0,
        value,
        catObj,
        cleanArr = [],
        cumulativeSumValue = 0,
        useDataPlotColorForLabels,
        tooltipSepChar = conf.tootipSepChar = (0, _lib.pluck)(chartAttr.tooltipsepchar, ', ');
    conf.minAbsNonZeroValue = Infinity;
    conf.minAbsNonZeroData = {};
    conf.defaultPadding = {
      left: 0.5,
      right: 0.5
    };
    conf.enableAnimation = enableAnimation = (0, _lib.pluckNumber)(chartAttr.animation, chartAttr.defaultanimation, 1);
    conf.animation = !enableAnimation ? false : {
      duration: (0, _lib.pluckNumber)(chartAttr.animationduration, 1) * 1000
    };
    conf.showTooltip = (0, _lib.pluckNumber)(chartAttr.showtooltip, 1);
    conf.showTextOutline = (0, _lib.pluckNumber)(chartAttr.textoutline, 0);
    conf.valuePadding = (0, _lib.pluckNumber)(chartAttr.valuepadding, 2);
    conf.rotateValues = (0, _lib.pluckNumber)(chartAttr.rotatevalues) ? 270 : 0;
    conf.usePattern = (0, _lib.pluckNumber)(chartConfig.usePattern, 0);
    conf.patternType = _column.PATTERN_TYPES.includes(JSONData.patterntype) ? JSONData.patterntype : chartConfig.patternType;
    conf.patternDensity = (0, _lib.pluckNumber)(JSONData.patterndensity, chartConfig.patternDensity);
    conf.patternAlpha = (0, _lib.pluckNumber)(JSONData.patternalpha, chartConfig.patternAlpha);
    conf.patternBgColor = (0, _lib.pluck)(JSONData.patternbgcolor, conf.patternBgColor);
    conf.showHoverEffect = showHoverEffect = (0, _lib.pluckNumber)(chartAttr.plothovereffect, chartAttr.showhovereffect, UNDEF);
    conf.usePattern && (conf.showHoverEffect = showHoverEffect = 0);
    conf.showShadow = isRoundEdges || is3D ? (0, _lib.pluckNumber)(chartAttr.showshadow, 1) : (0, _lib.pluckNumber)(chartAttr.showshadow, colorM.getColor(SHOWSHADOW));
    conf.useDataPlotColorForLabels = useDataPlotColorForLabels = (0, _lib.pluckNumber)(chartAttr.usedataplotcolorforlabels, 0);
    conf.use3dlineshift = (0, _lib.pluckNumber)(chartAttr.use3dlineshift, chart.use3dlineshift);
    showplotborder = conf.showplotborder = (0, _lib.pluckNumber)(chartAttr.showplotborder, is3D ? 0 : 1);
    conf.plotDashLen = plotDashLen = (0, _lib.pluckNumber)(chartAttr.plotborderdashlen, 5);
    conf.plotDashGap = plotDashGap = (0, _lib.pluckNumber)(chartAttr.plotborderdashgap, 4);
    conf.plotfillangle = plotfillAngle = (0, _lib.pluckNumber)(360 - chartAttr.plotfillangle, 90);
    conf.plotfillalpha = plotFillAlpha = (0, _lib.pluck)(chartAttr.plotfillalpha, HUNDREDSTRING);
    conf.plotColor = plotColor;
    conf.isRoundEdges = isRoundEdges = (0, _lib.pluckNumber)(chartAttr.useroundedges, 0);
    conf.plotRadius = (0, _lib.pluckNumber)(chartAttr.useRoundEdges, conf.isRoundEdges ? 1 : 0);
    conf.plotfillratio = plotFillRatio = (0, _lib.pluck)(chartAttr.plotfillratio);
    conf.plotgradientcolor = plotgradientcolor = (0, _lib.getDefinedColor)(chartAttr.plotgradientcolor, colorM.getColor(PLOTGRADIENTCOLOR));
    !usePlotGradientColor && (plotgradientcolor = '');
    conf.plotborderalpha = plotBorderAlpha = showplotborder && !is3D ? (0, _lib.pluck)(chartAttr.plotborderalpha, plotFillAlpha, HUNDREDSTRING) : 0;
    conf.plotbordercolor = plotBorderColor = (0, _lib.pluck)(chartAttr.plotbordercolor, is3D ? '#ffffff' : colorM.getColor(PLOTBORDERCOLOR));
    conf.plotborderthickness = plotBorderThickness = (0, _lib.pluckNumber)(chartAttr.plotborderthickness, 1);
    conf.plotBorderDashStyle = initailPlotBorderDashStyle = plotBorderDash ? (0, _lib.getDashStyle)(plotDashLen, plotDashGap) : 'none';
    conf.showValues = (0, _lib.pluckNumber)(chartAttr.showvalues, 1);
    conf.definedGroupPadding = mathMax((0, _lib.pluckNumber)(chartAttr.plotspacepercent), 0);
    conf.plotSpacePercent = mathMax((0, _lib.pluckNumber)(chartAttr.plotspacepercent, 20) % 100, 0);
    conf.maxcolwidth = (0, _lib.pluckNumber)(chartAttr.maxcolwidth, 50);
    conf.plotpaddingpercent = (0, _lib.pluckNumber)(chartAttr.plotpaddingpercent);
    conf.placevaluesinside = (0, _lib.pluckNumber)(chartAttr.placevaluesinside, 0);
    conf.use3dlighting = (0, _lib.pluckNumber)(chartAttr.use3dlighting, 1);
    conf.parentYAxis = 0;
    dataSet.setState('visible', (0, _lib.pluckNumber)(JSONData.visible, 1) === 1);
    dataSet.setState('dirty', true);

    if (!dataStore) {
      dataStore = dataSet.components.data = [];
    } // Get the sum value and create the clean Array of value


    for (i = 0; i < len; i++) {
      value = mathAbs(numberFormatter.getCleanValue(setDataArr[i].value));
      sumValue += value;
      cleanArr[i] = (0, _lib.extend2)({}, setDataArr[i]);
      cleanArr[i].value = value;
    } // Sort the clean Array of values


    cleanArr.sort(function (a, b) {
      return b.value - a.value;
    });
    conf.imageCount = 0; // Parsing the attributes and values at set level.

    for (i = 0; i < len; i++) {
      setData = cleanArr[i];
      dataObj = dataStore[i];

      if (!dataObj) {
        dataObj = dataStore[i] = {
          graphics: {}
        };
      }

      if (!dataObj.config) {
        config = dataStore[i].config = {};
      }

      setValue = mathAbs(numberFormatter.getCleanValue(setData.value));

      if (setValue === null) {
        continue;
      }

      config = dataObj && dataObj.config;
      catObj = xAxis.getLabel(i);
      config.label = (0, _lib.getValidValue)((0, _lib.parseUnsafeString)((0, _lib.pluck)(catObj.label)));
      config.showValue = (0, _lib.pluckNumber)(setData.showvalue, conf.showValues);
      config.setValue = setValue;
      config.setLink = (0, _lib.pluck)(setData.link);
      config.setDisplayValue = setDisplayValue = (0, _lib.parseUnsafeString)(setData.displayvalue);
      cumulativeSumValue += config.setValue;
      displayValue = numberFormatter.dataLabels(setValue); // parsing the id property in config

      config.id = setData.id ? (0, _lib.getValidValue)((0, _lib.parseUnsafeString)((0, _lib.pluck)(setData.id))) : config.label;
      config.valuePadding = (0, _lib.pluckNumber)(setData.valuepadding, JSONData.valuepadding, chartConfig.valuepadding);
      config.patternType = _column.PATTERN_TYPES.includes(setData.patterntype) ? setData.patterntype : conf.patternType;
      config.patternAngle = (0, _lib.pluckNumber)(setData.patternangle, JSONData.patternangle, chartAttr.patternangle, config.patternType === _column.PATTERN_TYPES[0] ? 40 : 0);
      config.patternDensity = (0, _lib.pluckNumber)(setData.patterndensity, conf.patternDensity);
      config.patternSize = (0, _lib.pluckNumber)(setData.patternsize, JSONData.patternsize, config.patternType === _column.PATTERN_TYPES[0] ? 2 : 4);
      config.patternAlpha = (0, _lib.pluckNumber)(setData.patternalpha, conf.patternAlpha);
      config.patternBgColor = (0, _lib.pluck)(setData.patternbgcolor, conf.patternBgColor);
      config.dataLabelStyle = dataSet._configureDataLabelStyle(setData);
      config.shadow = {
        opacity: conf.showShadow ? plotFillAlpha / 100 : 0
      };
      setDataDashed = (0, _lib.pluckNumber)(setData.dashed);
      setDataPlotDashLen = (0, _lib.pluckNumber)(setData.dashlen, plotDashLen);
      setDataPlotDashGap = plotDashGap = (0, _lib.pluckNumber)(setData.dashgap, plotDashGap);
      config.plotBorderDashStyle = plotBorderDashStyle = setDataDashed === 1 ? (0, _lib.getDashStyle)(setDataPlotDashLen, setDataPlotDashGap) : setDataDashed === 0 ? 'none' : initailPlotBorderDashStyle;
      plotColor = colorM.getPlotColor(i);
      plotColor = (0, _lib.pluck)(setData.color, plotColor);
      plotFillRatio = (0, _lib.pluck)(setData.ratio, conf.plotfillratio);
      plotFillAlpha = (0, _lib.pluck)(setData.alpha, conf.plotfillalpha);
      plotBorderAlpha = (0, _lib.pluck)(setData.alpha, conf.plotborderalpha); // Setting the angle for plot fill for negative data

      if (setValue < 0 && !isRoundEdges) {
        tempPlotfillAngle = plotfillAngle;
        plotfillAngle = 360 - plotfillAngle;
      } // Setting the color Array to be applied to the bar/column.


      config.colorArr = colorArr = (0, _lib.getColumnColor)(plotColor + ',' + plotgradientcolor, plotFillAlpha, plotFillRatio, plotfillAngle, isRoundEdges, plotBorderColor, plotBorderAlpha.toString(), 0, !!is3D);

      if (showHoverEffect !== 0) {
        hoverColor = (0, _lib.pluck)(setData.hovercolor, chartAttr.plotfillhovercolor, chartAttr.columnhovercolor, plotColor);
        hoverAlpha = (0, _lib.pluck)(setData.hoveralpha, chartAttr.plotfillhoveralpha, chartAttr.columnhoveralpha, plotFillAlpha);
        hoverGradientColor = (0, _lib.pluck)(setData.hovergradientcolor, chartAttr.plothovergradientcolor, plotgradientcolor);
        !hoverGradientColor && (hoverGradientColor = '');
        hoverRatio = (0, _lib.pluck)(setData.hoverratio, chartAttr.plothoverratio, plotFillRatio);
        hoverAngle = (0, _lib.pluckNumber)(360 - setData.hoverangle, 360 - JSONData.hoverangle, 360 - chartAttr.plothoverangle, plotfillAngle);
        hoverBorderColor = (0, _lib.pluck)(setData.borderhovercolor, chartAttr.plotborderhovercolor, plotBorderColor);
        hoverBorderAlpha = (0, _lib.pluck)(setData.borderhoveralpha, JSONData.borderhoveralpha, chartAttr.plotborderhoveralpha, chartAttr.plotfillhoveralpha, plotBorderAlpha, plotFillAlpha);
        hoverBorderThickness = (0, _lib.pluckNumber)(setData.borderhoverthickness, JSONData.borderhoverthickness, chartAttr.plotborderhoverthickness, plotBorderThickness);
        hoverBorderDashed = (0, _lib.pluckNumber)(setData.borderhoverdashed, chartAttr.plotborderhoverdashed);
        hoverBorderDashGap = (0, _lib.pluckNumber)(setData.borderhoverdashgap, chartAttr.plotborderhoverdashgap, plotDashLen);
        hoverBorderDashLen = (0, _lib.pluckNumber)(setData.borderhoverdashlen, chartAttr.plotborderhoverdashlen, plotDashGap);
        hoverDashStyle = hoverBorderDashed ? (0, _lib.getDashStyle)(hoverBorderDashLen, hoverBorderDashGap) : plotBorderDashStyle;
        /* If no hover effects are explicitly defined and
                       * showHoverEffect is not 0 then hoverColor is set.
                       */

        if (showHoverEffect === 1 && hoverColor === plotColor) {
          hoverColor = (0, _lib.getLightColor)(hoverColor, 70);
        } // setting the hover color array which is always applied except
        // when showHoverEffect is not 0.


        hoverColorArr = (0, _lib.getColumnColor)(hoverColor + ',' + hoverGradientColor, hoverAlpha, hoverRatio, hoverAngle, isRoundEdges, hoverBorderColor, hoverBorderAlpha.toString(), 0, !!is3D);
        config.setRolloutAttr = {
          fill: !is3D ? (0, _lib.toRaphaelColor)(colorArr[0]) : [(0, _lib.toRaphaelColor)(colorArr[0]), !conf.use3dlighting],
          stroke: showplotborder && (0, _lib.toRaphaelColor)(colorArr[1]),
          'stroke-width': plotBorderThickness,
          'stroke-dasharray': plotBorderDashStyle
        };
        config.setRolloverAttr = {
          fill: !is3D ? (0, _lib.toRaphaelColor)(hoverColorArr[0]) : [(0, _lib.toRaphaelColor)(hoverColorArr[0]), !conf.use3dlighting],
          stroke: showplotborder && (0, _lib.toRaphaelColor)(hoverColorArr[1]),
          'stroke-width': hoverBorderThickness,
          'stroke-dasharray': hoverDashStyle
        };
      }

      useDataPlotColorForLabels && xAxis.updateTicksValues(i, {
        labelfontcolor: (0, _lib.convertColor)(plotColor)
      });
      config.originalPlotColor = (0, _lib.hashify)(plotColor);
      config.displayValue = (0, _lib.pluck)(setDisplayValue, displayValue);
      setTooltext = config.setTooltext = config.origToolText = (0, _lib.getValidValue)((0, _lib.parseUnsafeString)((0, _lib.pluck)(setData.tooltext, chartAttr.plottooltext), false));
      config.toolTipValue = numberFormatter.dataLabels(setValue, conf.parentYAxis);
      config._x = i;
      config._y = setValue;
      formatedVal = config.toolTipValue;
      maxValue = mathMax(maxValue, setValue);
      minValue = mathMin(minValue, setValue);

      if (setValue !== 0 && conf.minAbsNonZeroValue > Math.abs(setValue)) {
        conf.minAbsNonZeroValue = Math.abs(setValue);
        conf.minAbsNonZeroData = config;
      } // Parsing tooltext against various configurations provided by the user.


      if (!showTooltip) {
        toolText = false;
      } else {
        if (!conf.showTooltip) {
          toolText = false;
        } else if (setTooltext !== UNDEF) {
          parserConfig = {
            formattedValue: formatedVal,
            label: config.label,
            yaxisName: yAxisName,
            xaxisName: xAxisName,
            cumulativeValue: cumulativeSumValue,
            cumulativeDataValue: numberFormatter.dataLabels(cumulativeSumValue),
            cumulativePercentValue: displayValuePercent,
            sum: numberFormatter.dataLabels(sumValue),
            unformattedSum: sumValue
          };
          macroIndices = [1, 2, 3, 5, 6, 7, 20, 21, 22, 23, 24, 25];
          toolText = (0, _lib.parseTooltext)(setTooltext, macroIndices, parserConfig, setData, chartAttr);
        } else {
          // determine the dispalay value then
          toolText = config.label ? config.label + tooltipSepChar : '';
        }

        config.toolText = toolText;
      }

      config.toolText = toolText;
      config.tooltext = setTooltext;
      config.setTooltext = toolText;
      tempPlotfillAngle && (plotfillAngle = tempPlotfillAngle);
    }

    conf.maxValue = maxValue;
    conf.minValue = minValue;
  };

  return ParetoColumnDataset;
}(_column.default);

exports.ParetoColumnDataset = ParetoColumnDataset;

/***/ }),

/***/ 679:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports.ParetoColumn3DDataset = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _pareto = __webpack_require__(672);

var _column3dUtils = __webpack_require__(612);

var
/**
 * Helper function to create a RedRaphael group.
 * @param  {string} groupName                Name of the group to be created.
 * @param  {Element} parentContainer         The parent container in which the group will be appended.
 * @param {Object} dataset The concerned dataset
 * @return {Element}                         The group that was created.
 */
createGroup = function createGroup(groupName, parentContainer, dataset) {
  var animationManager = dataset.getFromEnv('animationManager');
  return animationManager.setAnimation({
    el: 'group',
    attr: {
      name: groupName
    },
    container: parentContainer,
    state: 'appearing',
    component: dataset,
    label: 'group'
  });
};

var ParetoColumn3DDataset = /*#__PURE__*/function (_ParetoColumnDataset) {
  (0, _inheritsLoose2.default)(ParetoColumn3DDataset, _ParetoColumnDataset);

  function ParetoColumn3DDataset() {
    return _ParetoColumnDataset.apply(this, arguments) || this;
  }

  var _proto = ParetoColumn3DDataset.prototype;

  /**
   * Function that retunr the nearest plot details
   * @param {number} chartX x-axis position of the mouse cordinate
   * @param {number} chartY x-axis position of the mouse cordinate
   * @return {Object} return an object with details of nearest polt and whether it is hovered or not
   */
  _proto._getHoveredPlot = function _getHoveredPlot(chartX, chartY) {
    var dataset = this,
        xAxis = dataset.getFromEnv('xAxis'),
        x,
        pX;
    x = xAxis.getValue(chartX);
    pX = Math.round(x); // Checking for overlap between two cosecutive column plots along x-axis

    return pX - x > 0 ? _column3dUtils._checkPointerOverColumn.call(dataset, pX, chartX, chartY) || _column3dUtils._checkPointerOverColumn.call(dataset, pX - 1, chartX, chartY) : _column3dUtils._checkPointerOverColumn.call(dataset, pX + 1, chartX, chartY) || _column3dUtils._checkPointerOverColumn.call(dataset, pX, chartX, chartY);
  }
  /**
   * function to create group for dataset
   */
  ;

  _proto.createContainer = function createContainer() {
    var dataset = this,
        parent = dataset.getLinkedParent();
    !dataset.getContainer('labelGroup') && dataset.addContainer('labelGroup', createGroup('label-group', parent.getChildContainer('vcanvasLabelGroup'), dataset).attr('class', 'fusioncharts-datalabels'));
  };

  return ParetoColumn3DDataset;
}(_pareto.ParetoColumnDataset);

exports.ParetoColumn3DDataset = ParetoColumn3DDataset;

/***/ }),

/***/ 674:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports.ParetoLineDataset = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _line = _interopRequireDefault(__webpack_require__(616));

var _lib = __webpack_require__(274);

var PLOTBORDERCOLOR = 'plotBorderColor',
    SHOWSHADOW = 'showShadow',
    UNDEF,
    math = Math,
    mathMin = math.min,
    mathMax = math.max,
    mathAbs = math.abs,
    HUNDREDSTRING = '100';

var ParetoLineDataset = /*#__PURE__*/function (_LineDataset) {
  (0, _inheritsLoose2.default)(ParetoLineDataset, _LineDataset);

  function ParetoLineDataset() {
    return _LineDataset.apply(this, arguments) || this;
  }

  var _proto = ParetoLineDataset.prototype;

  _proto.configureAttributes = function configureAttributes(datasetJSON) {
    if (!datasetJSON) {
      return false;
    }

    this.trimData(datasetJSON);
    this.config.JSONData = datasetJSON;
    var dataSet = this,
        chart = dataSet.getFromEnv('chart'),
        conf = dataSet.config,
        xAxis = dataSet.getFromEnv('xAxis'),
        JSONData = conf.JSONData,
        setDataArr = JSONData.data,
        setDataLen = setDataArr && setDataArr.length,
        len = setDataLen,
        chartAttr = dataSet.getFromEnv('chart-attrib'),
        colorM = dataSet.getFromEnv('color-manager'),
        showTooltip = (0, _lib.pluckNumber)(chartAttr.showtooltip, 1),
        yAxisName = (0, _lib.parseUnsafeString)(chartAttr.yaxisname),
        xAxisName = (0, _lib.parseUnsafeString)(chartAttr.xaxisname),
        formatedVal,
        parserConfig,
        setTooltext,
        macroIndices,
        toolText,
        isRoundEdges,
        setData,
        setValue,
        dataObj,
        config,
        dataStore = dataSet.components.data,
        numberFormatter = dataSet.getFromEnv('number-formatter'),
        is3D = chart.config.is3D,
        enableAnimation,
        lineDashStyle,
        i,
        maxValue = -Infinity,
        minValue = +Infinity,
        displayValuePercent,
        sumValue = 0,
        value,
        catObj,
        cleanArr = [],
        cumulativeSumValue = 0,
        tooltipSepChar = conf.tootipSepChar = (0, _lib.pluck)(chartAttr.tooltipsepchar, ', '),
        anchorProps;
    conf.defaultPadding = {
      left: 0.5,
      right: 0.5
    };
    conf.enableAnimation = enableAnimation = (0, _lib.pluckNumber)(chartAttr.animation, chartAttr.defaultanimation, 1);
    conf.animation = !enableAnimation ? false : {
      duration: (0, _lib.pluckNumber)(chartAttr.animationduration, 1) * 1000
    };
    conf.showTooltip = (0, _lib.pluckNumber)(chartAttr.showtooltip, 1);
    conf.valuePadding = (0, _lib.pluckNumber)(chartAttr.valuepadding, 2);
    conf.showTextOutline = (0, _lib.pluckNumber)(chartAttr.textoutline, 0);
    conf.rotateValues = (0, _lib.pluckNumber)(chartAttr.rotatevalues) ? 270 : 0;
    conf.showHoverEffect = (0, _lib.pluckNumber)(chartAttr.plothovereffect, chartAttr.showhovereffect, UNDEF);
    conf.showShadow = isRoundEdges || is3D ? (0, _lib.pluckNumber)(chartAttr.showshadow, 1) : (0, _lib.pluckNumber)(chartAttr.showshadow, colorM.getColor(SHOWSHADOW));
    conf.useDataPlotColorForLabels = (0, _lib.pluckNumber)(chartAttr.usedataplotcolorforlabels, 0);
    conf.use3dlineshift = (0, _lib.pluckNumber)(chartAttr.use3dlineshift, chart.use3dlineshift); // Line configuration attributes parsing

    conf.drawLine = 1;
    conf.linecolor = (0, _lib.getFirstColor)((0, _lib.pluck)(chartAttr.linecolor, colorM.getColor(PLOTBORDERCOLOR)));
    conf.linethickness = (0, _lib.pluckNumber)(chartAttr.linethickness, 2);
    conf.linealpha = (0, _lib.pluck)(chartAttr.linealpha, HUNDREDSTRING);
    conf.linedashed = (0, _lib.pluckNumber)(chartAttr.linedashed, 0);
    conf.linedashlen = (0, _lib.pluckNumber)(JSONData.linedashlen, chartAttr.linedashlen, 5);
    conf.linedashgap = (0, _lib.pluckNumber)(JSONData.linedashgap, chartAttr.linedashgap, 4);
    lineDashStyle = (0, _lib.getDashStyle)(conf.linedashlen, conf.linedashgap);
    conf.lineDashStyle = conf.linedashed ? lineDashStyle : 'none';
    conf.drawanchors = (0, _lib.pluckNumber)(chartAttr.drawanchors, chartAttr.showanchors);
    conf.anchorbgcolor = (0, _lib.pluck)(chartAttr.anchorbgcolor, colorM.getColor('anchorBgColor'));
    conf.anchorbordercolor = (0, _lib.pluck)(chartAttr.anchorbordercolor, conf.linecolor);
    conf.anchorradius = (0, _lib.pluckNumber)(chartAttr.anchorradius, 3);
    conf.anchoralpha = (0, _lib.pluck)(chartAttr.anchoralpha);
    conf.anchorbgalpha = (0, _lib.pluck)(chartAttr.anchorbgalpha, 100);
    conf.anchorborderthickness = (0, _lib.pluck)(chartAttr.anchorborderthickness, 1);
    conf.anchorsides = (0, _lib.pluck)(chartAttr.anchorsides, 0); // Anchor image cosmetics attributes

    conf.anchorimageurl = (0, _lib.pluck)(chartAttr.anchorimageurl);
    conf.anchorimagealpha = (0, _lib.pluckNumber)(chartAttr.anchorimagealpha, 100);
    conf.anchorimagescale = (0, _lib.pluckNumber)(chartAttr.anchorimagescale, 100);
    conf.anchorimagepadding = (0, _lib.pluckNumber)(chartAttr.anchorimagepadding, 1);
    conf.anchorstartangle = (0, _lib.pluckNumber)(chartAttr.anchorstartangle, 90);
    conf.parentYAxis = 1;
    conf.valuePosition = (0, _lib.pluck)(chartAttr.valueposition, 'auto');
    conf.showvalues = conf.showValues = (0, _lib.pluckNumber)(chartAttr.showlinevalues, chartAttr.showvalues, 1);
    dataSet.setState('visible', (0, _lib.pluckNumber)(JSONData.visible, 1) === 1);
    dataSet.setState('dirty', true);
    conf.shadow = {
      opacity: conf.showShadow ? conf.linealpha / 100 : 0
    };
    conf.showCumulativeLine = (0, _lib.pluckNumber)(chartAttr.showcumulativeline, 1);
    conf.maxRadius = -Infinity;

    if (!dataStore) {
      dataStore = dataSet.components.data = [];
    } // Get the sum value and create the clean Array of value


    for (i = 0; i < len; i++) {
      value = mathAbs(numberFormatter.getCleanValue(setDataArr[i].value));
      sumValue += value;
      cleanArr[i] = (0, _lib.extend2)({}, setDataArr[i]);
      cleanArr[i].value = value;
    } // Sort the clean Array of values


    cleanArr.sort(function (a, b) {
      return b.value - a.value;
    });
    conf.imageCount = 0; // Parsing the attributes and values at set level.

    for (i = 0; i < len; i++) {
      setData = cleanArr[i];
      dataObj = dataStore[i];

      if (!dataObj) {
        dataObj = dataStore[i] = {
          graphics: {}
        };
      }

      if (!dataObj.config) {
        config = dataStore[i].config = {};
      }

      setValue = mathAbs(numberFormatter.getCleanValue(setData.value));

      if (setValue === null) {
        continue;
      }

      config = dataObj && dataObj.config;
      catObj = xAxis.getLabel(i);
      config.label = (0, _lib.getValidValue)((0, _lib.parseUnsafeString)((0, _lib.pluck)(catObj.label)));
      config.showValue = (0, _lib.pluckNumber)(setData.showvalue, conf.showValues);
      config.setValue = setValue;
      config.setLink = (0, _lib.pluck)(setData.link);
      config.setDisplayValue = (0, _lib.parseUnsafeString)(setData.displayvalue);
      cumulativeSumValue += config.setValue;
      config.dataLabelStyle = dataSet._configureDataLabelStyle(setData);
      config.valuePadding = (0, _lib.pluckNumber)(setData.valuepadding, JSONData.valuepadding, chart.config.valuepadding);
      setValue = config.setValue = cumulativeSumValue / sumValue * 100;
      displayValuePercent = numberFormatter.percentValue(setValue);
      config.toolTipValue = displayValuePercent;
      config.displayValue = displayValuePercent;
      config.valuePosition = (0, _lib.pluck)(setData.valueposition, conf.valuePosition);
      config.anchorProps = this._parseAnchorProperties(i, cleanArr);
      config.hoverEffects = this._parseHoverEffectOptions(dataObj);
      anchorProps = config.anchorProps;
      conf.maxRadius = Math.max(conf.maxRadius, anchorProps.radius + anchorProps.borderThickness / 2);
      config._x = i;
      config._y = setValue; // setTooltext = config.setTooltext = getValidValue(parseUnsafeString(
      //     pluck(setData.cumulativeplottooltext, chartAttr.cumulativeplottooltext)));

      formatedVal = config.toolTipValue;
      maxValue = mathMax(maxValue, setValue);
      minValue = mathMin(minValue, setValue); // Parsing tooltext against various configurations provided by the user.

      if (!showTooltip) {
        toolText = false;
      } else {
        if (!conf.showTooltip) {
          toolText = false;
        } else if (setTooltext !== UNDEF) {
          parserConfig = {
            formattedValue: formatedVal,
            label: config.label,
            yaxisName: yAxisName,
            xaxisName: xAxisName,
            cumulativeValue: cumulativeSumValue,
            cumulativeDataValue: numberFormatter.dataLabels(cumulativeSumValue),
            cumulativePercentValue: displayValuePercent,
            sum: numberFormatter.dataLabels(sumValue),
            unformattedSum: sumValue
          };
          macroIndices = [1, 2, 3, 5, 6, 7, 20, 21, 22, 23, 24, 25];
          toolText = (0, _lib.parseTooltext)(setTooltext, macroIndices, parserConfig, setData, chartAttr);
        } else {
          // determine the dispalay value then
          toolText = config.label ? config.label + tooltipSepChar + config.toolTipValue : '';
        }

        config.toolText = toolText;
      }

      config.toolText = toolText;
      config.tooltext = setTooltext;
      config.setTooltext = toolText;
    }

    conf.maxValue = maxValue;
    conf.minValue = minValue;
  };

  return ParetoLineDataset;
}(_line.default);

exports.ParetoLineDataset = ParetoLineDataset;

/***/ }),

/***/ 658:
/***/ ((__unused_webpack_module, exports) => {



exports.__esModule = true;
exports["default"] = void 0;
var _default = {
  'initial.dataset.pie3d': function initialDatasetPie3d() {
    return {
      'group.appearing': function groupAppearing(inputJSON) {
        var component = inputJSON.component,
            chartConfig = component.getFromEnv('chartConfig');

        if (inputJSON.attr.name === 'plots') {
          return [{
            initialAttr: {
              opacity: '0'
            },
            finalAttr: {
              opacity: '1'
            },
            slot: chartConfig.alphaanimation ? 'plot' : 'initial'
          }];
        }

        return [{
          initialAttr: {
            opacity: '1'
          },
          finalAttr: {
            opacity: '1'
          },
          slot: 'final'
        }];
      },
      'slice.appearing': function sliceAppearing(inputJSON) {
        var component = inputJSON.component,
            chart = component.getFromEnv('chart'),
            chartConfig = chart.config,
            dsConfig = component.config,
            attr = inputJSON.attr;

        if (!chartConfig.alphaanimation) {
          if (!dsConfig.animateClockWise) {
            return [{
              initialAttr: {
                sAngle: 2 * Math.PI,
                eAngle: 2 * Math.PI,
                transform: ''
              },
              finalAttr: {
                sAngle: attr.sAngle,
                eAngle: attr.eAngle,
                transform: ''
              },
              slot: 'plot',
              startEnd: {
                start: 0,
                end: 0.75
              }
            }, {
              finalAttr: {
                transform: attr.transform
              },
              slot: 'plot',
              startEnd: {
                start: 0.75,
                end: 1
              }
            }];
          }

          return [{
            initialAttr: {
              sAngle: 0,
              eAngle: 0,
              transform: ''
            },
            finalAttr: {
              sAngle: attr.sAngle,
              eAngle: attr.eAngle,
              transform: ''
            },
            slot: 'plot',
            startEnd: {
              start: 0,
              end: 0.75
            }
          }, {
            finalAttr: {
              transform: attr.transform
            },
            slot: 'plot',
            startEnd: {
              start: 0.75,
              end: 1
            }
          }];
        }

        return [{
          initialAttr: {
            opacity: '1'
          },
          slot: 'plot'
        }];
      },
      'label.updating': [{
        initialAttr: {
          opacity: '1'
        },
        finalAttr: {
          opacity: '1'
        },
        slot: 'final'
      }],
      'label.appearing': [{
        initialAttr: {
          opacity: '0'
        },
        finalAttr: {
          opacity: '1'
        },
        slot: 'final'
      }],
      'connector.updating': function connectorUpdating(inputJSON) {
        return [{
          initialAttr: {
            path: inputJSON.el.attr('path') || inputJSON.attr.path,
            opacity: inputJSON.el.attr('opacity')
          },
          finalAttr: {
            path: inputJSON.attr.path
          },
          slot: 'final'
        }];
      },
      'connector.appearing': function connectorAppearing(inputJSON) {
        var initialAttr;

        if (typeof inputJSON.el === 'string') {
          initialAttr = {
            opacity: '0'
          };
        } else {
          initialAttr = {
            path: inputJSON.attr.path,
            opacity: '0'
          };
        }

        return [{
          initialAttr: initialAttr,
          slot: 'final'
        }];
      },
      'connector-sliced.updating': function connectorSlicedUpdating(inputJSON) {
        return [{
          initialAttr: {
            path: inputJSON.el.attr('path')
          },
          finalAttr: {
            path: inputJSON.attr.path
          },
          slot: 'plot'
        }];
      },
      'label-sliced.updating': function labelSlicedUpdating(inputJSON) {
        return [{
          initialAttr: {
            x: inputJSON.el.attr('x'),
            y: inputJSON.el.attr('y')
          },
          slot: 'plot'
        }];
      },
      '*': null
    };
  }
};
exports["default"] = _default;

/***/ }),

/***/ 655:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(292));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _pie2d = _interopRequireWildcard(__webpack_require__(649));

var _lib = __webpack_require__(274);

var _componentInterface = __webpack_require__(290);

var _doughnut2d = __webpack_require__(656);

var _index = _interopRequireDefault(__webpack_require__(658));

var _dependencyManager = __webpack_require__(282);

var _redraphaelShapes = _interopRequireDefault(__webpack_require__(659));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Raphael = (0, _dependencyManager.getDep)('redraphael', 'plugin'),
    win = window,
    UNDEF,
    HIDDEN = 'hidden',
    PATH_STR = 'path',
    LITEPATH_STR = 'litepath',
    docMode8 = window.document.documentMode === 8,
    VISIBLE = docMode8 ? 'visible' : '',
    COMMASTRING = ',',
    ROLLOVER = 'DataPlotRollOver',
    ROLLOUT = 'DataPlotRollOut',
    EVENTARGS = 'eventArgs',
    GROUPID = 'groupId',
    POINTER = 'pointer',
    elementStr = _lib.preDefStr.elementStr,
    M = 'M',
    L = 'L',
    V = 'v',
    A = 'A',
    Z = 'Z',
    math = Math,
    mathMax = math.max,
    mathMin = math.min,
    mathAbs = math.abs,
    mathCeil = math.ceil,
    mathSin = math.sin,
    mathATan2 = math.atan2,
    mathCos = math.cos,
    mathFloor = math.floor,
    mathRound = math.round,
    pi = math.PI,
    pi2 = 2 * pi,
    piBy2 = pi / 2,
    pi3By2 = pi + piBy2,
    getAbsScaleAngle = function getAbsScaleAngle(start, end) {
  return (start > end ? pi2 : 0) + end - start;
},
    map = function map(arr, fn) {
  var results = [],
      i = 0,
      len = arr.length;

  for (; i < len; i++) {
    results[i] = fn.call(arr[i], arr[i], i, arr);
  }

  return results;
},
    defined = function defined(obj) {
  return obj !== UNDEF && obj !== null;
},
    isObject = function isObject(obj) {
  return typeof obj === 'object';
},
    isString = function isString(s) {
  return typeof s === 'string';
},
    pInt = function pInt(s, mag) {
  return parseInt(s, mag || 10);
},
    pie3DCacheColorStore = {
  lighting3D: {},
  lighting2D: {}
},
    getClickArcTangent = function getClickArcTangent(x, y, center, ref, pieYScale) {
  return mathATan2((y - center[1] - ref.top) / pieYScale, x - center[0] - ref.left);
},
    plotRollOver = function plotRollOver(e) {
  var plotItem = this.data('plotItem'),
      index = plotItem.index,
      chart = plotItem.chart,
      animationManager = chart.getFromEnv('animationManager'),
      chartConfig = chart.config,
      dataSet = chart.getChildren('dataset')[0],
      dataSetConfig = dataSet.config,
      dataSetComponents = dataSet.components,
      data = dataSetComponents.data[index],
      setGraphics = data.graphics,
      setConfig = data.config,
      element = setGraphics.element,
      hoverEffects = setConfig.hoverEffects;

  if (!dataSetConfig.isRotating) {
    chart.plotEventHandler(element, e, ROLLOVER);
    hoverEffects.enabled && animationManager.setAnimation({
      el: element,
      attr: hoverEffects,
      component: dataSet
    });
  }

  chartConfig.isHovered = true;
},
    plotRollOut = function plotRollOut(e) {
  var plotItem = this.data('plotItem'),
      index = plotItem.index,
      chart = plotItem.chart,
      animationManager = chart.getFromEnv('animationManager'),
      chartConfig = chart.config,
      dataSet = chart.getChildren('dataset')[0],
      dataSetConfig = dataSet.config,
      dataSetComponents = dataSet.components,
      data = dataSetComponents.data[index],
      setConfig,
      element;

  if (!data) {
    return;
  }

  setConfig = data.config;
  element = data.graphics.element;

  if (!dataSetConfig.isRotating) {
    chart.plotEventHandler(element, e, ROLLOUT);
    animationManager.setAnimation({
      el: element,
      attr: {
        color: setConfig.color.color.split(',')[0],
        alpha: setConfig._3dAlpha,
        borderWidth: setConfig.borderWidth,
        borderColor: setConfig.borderColor
      },
      component: dataSet
    });
  }

  chartConfig.isHovered = false;
},
    plotDragStart = function plotDragStart(evt) {
  var plotItem = this.data('plotItem'),
      chart = plotItem.chart,
      dataSet = chart.getChildren('dataset')[0],
      button = (0, _lib.pluckNumber)(evt.button, evt.originalEvent.button),
      dataSetConfig = dataSet.config,
      angle,
      x = evt.data[0],
      y = evt.data[1];
  dataSetConfig.isRightClicked = !!(!_lib.touchEnabled && button !== 0 && button !== 1);

  if (!dataSetConfig.enableRotation || dataSetConfig.isRightClicked) {
    return;
  }

  dataSetConfig.isRotating = false;
  angle = getClickArcTangent.call(evt, x, y, dataSetConfig.center, dataSetConfig.chartPosition = (0, _lib.getPosition)(dataSet.getFromEnv('chart-container')), dataSetConfig.pieYScale);
  dataSetConfig.dragStartAngle = angle;
  dataSetConfig._lastAngle = -dataSetConfig.startAngle;
  dataSetConfig.startingAngleOnDragStart = dataSetConfig.startAngle;
},
    plotDragEnd = function plotDragEnd() {
  var plotItem = this.data('plotItem'),
      index = plotItem.index,
      chart = plotItem.chart,
      animationManager = chart.getFromEnv('animationManager'),
      chartConfig = chart.config,
      dataSet = chart.getChildren('dataset')[0],
      dataSetConfig = dataSet.config,
      dataSetComponents = dataSet.components,
      data = dataSetComponents.data[index],
      setGraphics = data.graphics,
      setConfig = data.config,
      element = setGraphics.element,
      startingAng = dataSetConfig.startAngle; // save state

  /* reflowUpdate = {
      hcJSON: {
          series: [ {
              startAngle: startingAng
          }]
      }
  }; */

  /* if (!chart.disposed) {
        extend2 (chart.logic.chartInstance.jsVars._reflowData,
                    reflowUpdate, true);
    } */

  if (dataSetConfig.isRightClicked) {
    return;
  }

  if (dataSetConfig.isRotating) {
    /* The events mouseup, dragend and click are raised in order. In order
      * to update the flag isRotating to false post click event, setTimeout
      * called, to take immediate effect, is programmed to update the flag.
      * Thus, the flag gets updated post the series of events, in effect.
      * NB: Click event is subscribed conditionally.
      */
    setTimeout(function () {
      dataSetConfig.isRotating = false;
    }, 0);
    /**
             * @event FusionCharts#rotationEnd
             * @group chart:pie-slice
             *
             * @param { number} startingAngle - The initial angle. (desc)
             * @param { number} changeInAngle - It is the difference between the starting angle and the starting
             * angle on the drag start.
             */

    chart.fireChartInstanceEvent('rotationEnd', {
      startingAngle: (0, _lib.normalizeAngle)(startingAng, true),
      changeInAngle: startingAng - dataSetConfig.startingAngleOnDragStart
    }); // if not hovered on this plot and rotation End then undo hovereffect from plot

    !chartConfig.isHovered && animationManager.setAnimation({
      el: element,
      attr: {
        color: setConfig.color.color.split(',')[0],
        alpha: setConfig._3dAlpha,
        borderWidth: setConfig.borderWidth,
        borderColor: setConfig.borderColor
      },
      component: dataSet
    });
  }
},
    plotDragMove = function plotDragMove(evt) {
  var plotItem = this.data('plotItem'),
      chart = plotItem.chart,
      evtData = evt.data,
      dx = evtData[0],
      dy = evtData[1],
      x = evtData[2],
      y = evtData[3],
      dataSet = chart.getChildren('dataset')[0],
      dataSetConfig = dataSet.config,
      angle,
      currentTime,
      deltaAngle;

  if (isNaN(dx) || isNaN(dy) || !dataSetConfig.enableRotation || dataSetConfig.singletonCase || dataSetConfig.isRightClicked) {
    return;
  }

  angle = getClickArcTangent.call(evt, x, y, dataSetConfig.center, dataSetConfig.chartPosition, dataSetConfig.pieYScale);

  if (dataSetConfig.dragStartAngle !== angle && !dataSetConfig.isRotating) {
    dataSetConfig.isRotating = true;
    /**
     * This event is fired when a pie or doughnut chart's rotation is triggered.
     *
     * @event FusionCharts#rotationStart
     * @group chart:pie-slice
     * @param { number} startingAngle - This indicates the angle from where rotation started.
     */

    chart.fireChartInstanceEvent('rotationStart', {
      startingAngle: (0, _lib.normalizeAngle)(dataSetConfig.startAngle, true)
    });
  }

  deltaAngle = angle - dataSetConfig.dragStartAngle;
  dataSetConfig.dragStartAngle = angle;
  dataSetConfig.moveDuration = 0;
  dataSetConfig._lastAngle += deltaAngle * 180 / pi;
  currentTime = new Date().getTime();

  if (!dataSetConfig._lastTime || dataSetConfig._lastTime + dataSetConfig.timerThreshold < currentTime) {
    if (!dataSetConfig._lastTime) {
      dataSet._rotate();
    }

    dataSetConfig.timerId = setTimeout(function () {
      if (!chart.disposed || !chart.disposing) {
        dataSet._rotate();
      }
    }, dataSetConfig.timerThreshold);
    dataSetConfig._lastTime = currentTime;
  }
},
    elementZSortFn = function elementZSortFn(a, b) {
  var centerAngleDiff = a._conf.index - b._conf.index || a._conf.cIndex - b._conf.cIndex || a._conf.isStart - b._conf.isStart || a._conf.si - b._conf.si; // !centerAngleDiff && console.log("aaa");

  return centerAngleDiff;
},
    getStartIndex = function getStartIndex(array) {
  var l,
      i,
      startsAtFrontHalf,
      startIndex = array[0] && array[0]._conf.index,
      atFrontHalf,
      index;
  startsAtFrontHalf = startIndex <= pi;

  for (i = 1, l = array.length; i < l; i += 1) {
    index = array[i]._conf.index;
    atFrontHalf = index <= pi;

    if (atFrontHalf !== startsAtFrontHalf || index < startIndex) {
      return i;
    }
  }

  return 0;
},

/*
 * Pie Helper Functions.
 */
sortArrayByPoint = function sortArrayByPoint(a, b) {
  return a.point.value - b.point.value;
},
    sortArrayByAngle = function sortArrayByAngle(a, b) {
  return a.angle - b.angle;
},
    alignments = ['start', 'start', 'end', 'end'],
    alignCenter = 'middle',
    ySign = [-1, 1, 1, -1],
    xSign = [1, 1, -1, -1],
    attrKeyList = {
  // block following attribute
  stroke: true,
  strokeWidth: true,
  'stroke-width': true,
  dashstyle: true,
  'stroke-dasharray': true,
  translateX: true,
  translateY: true,
  'stroke-opacity': true,
  fill: true,
  'fill-opacity': true,
  opacity: true,
  // attribute that has direct effect
  transform: true,
  cursor: true,
  sAngle: true,
  eAngle: true,
  color: true,
  alpha: true,
  borderColor: true,
  borderAlpha: true,
  borderWidth: true,
  rolloverProps: true,
  showBorderEffect: true,
  positionIndex: true,
  cx: true,
  cy: true,
  radiusYFactor: true,
  r: true,
  innerR: true
},
    attrFN = function attrFN(hsh, val) {
  var key,
      value,
      hash = hsh,
      slice = this,
      confObject = slice._confObject,
      commonAttr = {},
      elements = confObject.elements,
      x,
      updateShape,
      updateColor,
      Pie3DManager = confObject.Pie3DManager,
      applyCommonAttr; // single key-value pair

  if (isString(hash) && defined(val)) {
    key = hash;
    hash = {};
    hash[key] = val;
  } // used as a getter: first argument is a string, second is undefined


  if (!hash || isString(hash)) {
    if (attrKeyList[hash]) {
      slice = confObject[hash];
    } else {
      slice = slice._attr(hash);
    } // setter

  } else {
    for (key in hash) {
      value = hash[key]; // if belongs from the list then handle here

      if (attrKeyList[key]) {
        // store the att in confObject for further use
        confObject[key] = value;

        if (key === 'cursor' || key === 'transform' || key === 'opacity' || key === 'fill-opacity') {
          commonAttr[key] = value;
          applyCommonAttr = true;
        } else if (key === 'sAngle' || key === 'eAngle' || key === 'cx' || key === 'cy' || key === 'radiusYFactor' || key === 'r' || key === 'innerR') {
          updateShape = true;
        } else if (key === 'color' || key === 'alpha' || key === 'borderColor' || key === 'borderAlpha' || key === 'borderWidth') {
          updateColor = true;
        }
      } else {
        // else leve for the original attr
        slice._attr(key, value);
      }
    } // if paths need to be updated


    if (updateShape) {
      Pie3DManager._setSliceShape(confObject); // refreash the drawinh for proper z lavel for elements


      Pie3DManager.refreshDrawing();
    } // if colors need to be updated
    // If the shape got changed, then also cange the color


    if (updateColor || updateShape) {
      Pie3DManager._setSliceCosmetics(confObject);
    } // apply common attributes


    if (applyCommonAttr) {
      // other elements
      for (x in elements) {
        elements[x].attr(commonAttr);
      } // main element


      slice._attr(commonAttr);
    }
  }

  return slice;
},
    onFN = function onFN(eventType, handler, callFromRaphael) {
  if (callFromRaphael) {
    this._on(eventType, handler, true);

    return;
  }

  var slice = this,
      confObject = slice._confObject,
      elements = confObject.elements,
      element;

  for (element in elements) {
    elements[element].on(eventType, handler);
  }

  return slice._on(eventType, handler);
},
    onDragFN = function onDragFN(dragStart, dragMove, dragEnd) {
  var element,
      slice = this,
      confObject = slice._confObject,
      elements = confObject.elements,
      navigator = win.navigator,
      ua = navigator.userAgent.toLowerCase(),
      isAndroid = ua.indexOf('android') > -1;

  for (element in elements) {
    if (isAndroid) {
      if (element === 'topBorder' || element === 'frontOuter' || element === 'startSlice' || element === 'endSlice') {
        elements[element].drag(dragStart, dragMove, dragEnd);
      }
    } else {
      elements[element].drag(dragStart, dragMove, dragEnd);
    }
  }

  return slice._drag(dragStart, dragMove, dragEnd);
},
    hideFN = function hideFN() {
  var slice = this,
      confObject = slice._confObject,
      elements = confObject.elements,
      element;

  for (element in elements) {
    elements[element].hide();
  }

  return slice._hide();
},
    showFN = function showFN() {
  var slice = this,
      confObject = slice._confObject,
      elements = confObject.elements,
      element;

  for (element in elements) {
    elements[element].show();
  }

  return slice._show();
},
    destroyFN = function destroyFN() {
  var confObject = this._confObject,
      elements = confObject.elements,
      x; // other elements

  for (x in elements) {
    elements[x].destroy();
  }

  if (_lib.hasSVG) {
    // destory other element
    // TODO: Check whether this clip elements are not destroying from else where
    confObject.clipTop.destroy();
    confObject.clipOuterFront.destroy();
    confObject.clipOuterBack.destroy();

    if (confObject.clipOuterFront1) {
      confObject.clipOuterFront1.destroy();
    }

    if (confObject.clipInnerFront) {
      confObject.clipInnerFront.destroy();
    }

    if (confObject.clipInnerBack) {
      confObject.clipInnerBack.destroy();
    }
  } // main element


  return this._destroy();
},
    dataFN = function dataFN(key, value) {
  var slice = this,
      confObject = slice._confObject,
      elements = confObject.elements,
      element;

  if (value === UNDEF) {
    return slice._data(key);
  } // other elements


  for (element in elements) {
    elements[element].data(key, value);
  } // main element


  return slice._data(key, value);
},
    si = 0; // slice index


(0, _dependencyManager.addDep)({
  name: 'pie3dAnimation',
  type: 'animationRule',
  extension: _index.default
});

var Pie3DDataset = /*#__PURE__*/function (_Pie2DDataset) {
  (0, _inheritsLoose2.default)(Pie3DDataset, _Pie2DDataset);

  function Pie3DDataset() {
    return _Pie2DDataset.apply(this, arguments) || this;
  }

  var _proto = Pie3DDataset.prototype;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _Pie2DDataset.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.setBorderWidth = UNDEF;
    config.alphaanimation = 1;
    config.showBorderEffect = UNDEF;
  };

  _proto.placeDataLabels = function placeDataLabels(isRotating) {
    var attr,
        // prevTextPos,
    dataSet = this,
        chart = dataSet.getFromEnv('chart'),
        toolTipController = chart.getFromEnv('toolTipController'),
        chartConfig = chart.config,
        plotOptions = dataSet.config,
        plotItems = dataSet.components.data,
        piePlotOptions = plotOptions.piePlotOptions,
        canvasLeft = chartConfig.canvasLeft,
        canvasTop = chartConfig.canvasTop,
        canvasWidth = chartConfig.canvasWidth,
        cx = canvasLeft + chartConfig.canvasWidth * 0.5,
        cy = canvasTop + chartConfig.canvasHeight * 0.5,
        smartLabel = chart.getFromEnv('smartLabel'),
        dataLabelsOptions = plotOptions.dataLabelOptions,
        style = dataLabelsOptions.style,
        lineHeight = (0, _lib.pluckNumber)(mathCeil(parseFloat(style.lineHeight)), 12),
        placeInside = (0, _lib.getFirstValue)(dataLabelsOptions.placeInside, false),
        skipOverlapLabels = dataLabelsOptions.skipOverlapLabels,
        manageLabelOverflow = dataLabelsOptions.manageLabelOverflow,
        connectorPadding = dataLabelsOptions.connectorPadding,
        distanceOption = dataLabelsOptions.distance,
        connectorWidth = dataLabelsOptions.connectorWidth,
        remainingHeight,
        // divide the points into quarters for anti collision
    quarters = [[], // top right
    [], // bottom right
    [], // bottom left
    [] // top left
    ],
        // todo remove the dupliace variables.
    plotLeft = canvasLeft,
        plotTop = canvasTop,
        plotWidth = canvasWidth,
        labelFontSize = parseInt(style.fontSize, 10),
        labelHeight = labelFontSize,
        halfLabelHeight = labelHeight / 2,
        xDisplacement = [connectorPadding, connectorPadding, -connectorPadding, -connectorPadding],
        isSmartLineSlanted = dataLabelsOptions.isSmartLineSlanted,
        align,
        i,
        labelWidth,
        j,
        oriY,
        maxYmayHave,
        spaceRequired,
        length,
        k,
        sliced,
        x1,
        x2,
        x3,
        x4,
        y1,
        y2,
        y3,
        points,
        point,
        angle,
        excess,
        excessArr,
        dataLabel,
        dataLabelCheck,
        quarter,
        transX,
        transY,
        smartLabelObj,
        pointConfig,
        pointGraphics,
        connector,
        connectorPath,
        outside = distanceOption > 0,
        center = plotOptions.center || (plotOptions.center = [cx, cy, piePlotOptions.size, piePlotOptions.innerSize || 0]),
        centerY = center[1],
        centerX = center[0],
        radius = center[2],
        radiusY = center[4],
        dataLabelsRadius = plotOptions.labelsRadius,
        dataLabelsRadiusY = mathRound(plotOptions.labelsRadiusY * 100) / 100,
        maxLabels = plotOptions.maxLabels,
        enableSmartLabels = plotOptions.enableSmartLabels,
        labelQuardentHeight,
        maxQuardentLabel,
        pieSliceDepthHalf = plotOptions.pieSliceDepth / 2,
        _textCss,
        _textAttrs,
        animationManager = chart.getFromEnv('animationManager'),
        dataLabelContainer = dataSet.getContainer('label-group');

    smartLabel.useEllipsesOnOverflow(chartConfig.useEllipsesWhenOverflow); // save the world if there is no labels to be placed.

    if (!plotOptions.dataLabelCounter) {
      return;
    }

    if (!isRotating) {
      // do not set the style every time
      // Do it for first time
      smartLabel.setStyle(style);
    } // arrange points for detection collision
    // Creates an array of quarter containing labels of each quarter
    // if there has only one label the draw it inside


    if (plotItems.length === 1) {
      point = plotItems[0];
      pointGraphics = point.graphics;
      pointConfig = point.config;
      _textAttrs = pointConfig._textAttrs;
      _textCss = pointConfig._textCss;
      dataLabel = pointGraphics.label;
      connector = pointGraphics.connector;
      pointConfig.slicedTranslation = [plotLeft, plotTop];

      if (pointConfig.y !== null && pointConfig.y !== UNDEF) {
        _textAttrs.visibility = VISIBLE;
        _textAttrs['text-anchor'] = alignCenter;
        _textAttrs.x = centerX;
        _textAttrs.y = centerY + halfLabelHeight - 2;
        _textAttrs._x = centerX;
      }

      _textCss.cursor = pointConfig.labellink ? 'pointer' : '';
      dataLabel = pointGraphics.label = animationManager.setAnimation({
        el: pointGraphics.label || 'text',
        attr: _textAttrs,
        css: _textCss,
        label: 'label',
        container: dataLabelContainer,
        component: dataSet
      });

      if (chartConfig.showtooltip && dataLabel.abbrArr && dataLabel.abbrArr.length) {
        toolTipController.enableToolTip(dataLabel, UNDEF);
      }

      dataLabel.on('fc-dragstart', plotDragStart).on('fc-dragmove', plotDragMove).on('fc-dragend', plotDragEnd).on('fc-click', _pie2d.labelClickFn.bind(dataLabel, chart, point.config.labellink)).on('fc-mouseup', (0, _pie2d.plotClickHandler)(dataSet, dataLabel)).on('fc-mouseover', plotRollOver).on('fc-mouseout', plotRollOut);

      if (_textAttrs._x) {
        dataLabel.x = _textAttrs._x;
        delete _textAttrs.x;
      }

      dataLabel.data('plotItem', _textAttrs.plotItem).data(EVENTARGS, _textAttrs.eventArgs);

      if (_textAttrs.visibility === VISIBLE) {
        dataLabel.show();
      }

      if (connector) {
        connector.hide();
      }
    } else {
      if (placeInside) {
        (0, _lib.fcEach)(plotItems, function (plotPoint) {
          var slicedTranslation, translateX, translateY;
          pointGraphics = plotPoint.graphics;
          pointConfig = plotPoint.config;
          _textAttrs = pointConfig._textAttrs;
          dataLabel = pointGraphics.label;

          if (pointConfig.y !== null && pointConfig.y !== UNDEF) {
            angle = pointConfig.angle;
            y3 = centerY + center[6] * mathSin(angle) + halfLabelHeight - 2;
            x3 = centerX + center[5] * mathCos(angle);
            _textAttrs._x = x3;
            _textAttrs._y = y3;

            if (pointConfig.sliced) {
              slicedTranslation = plotPoint.slicedTranslation;
              translateX = slicedTranslation[0] - plotLeft;
              translateY = slicedTranslation[1] - plotTop;
              x3 = x3 + translateX;
              y3 = y3 + translateY;
            }

            _textAttrs.visibility = VISIBLE;
            _textAttrs.align = alignCenter;
            _textAttrs.x = x3;
            _textAttrs.y = y3;
          }

          _textCss.cursor = pointConfig.labellink ? 'pointer' : '';
          dataLabel = pointGraphics.label = animationManager.setAnimation({
            el: pointGraphics.label || 'text',
            attr: _textAttrs,
            css: _textCss,
            label: 'label',
            container: dataLabelContainer,
            component: dataSet
          });

          if (chartConfig.showtooltip && dataLabel && dataLabel.abbrArr && dataLabel.abbrArr.length) {
            toolTipController.enableToolTip(dataLabel, UNDEF);
          }

          dataLabel.data('plotItem', _textAttrs.plotItem).data(EVENTARGS, _textAttrs.eventArgs);

          if (_textAttrs.visibility === VISIBLE) {
            dataLabel.show();
          }

          dataLabel.x = _textAttrs._x;
          dataLabel._x = _textAttrs._x;
          dataLabel._y = _textAttrs._y;
        });
      } else {
        // outside
        (0, _lib.fcEach)(plotItems, function (plotPoint) {
          pointGraphics = plotPoint.graphics;
          pointConfig = plotPoint.config;
          _textCss = pointConfig._textCss;
          _textAttrs = pointConfig._textAttrs;

          if (!(_textAttrs.text = pointConfig.displayValue)) {
            pointGraphics.connector && animationManager.setAnimation({
              el: pointGraphics.connector,
              component: dataSet,
              callback: _pie2d.hideFn
            });
            pointGraphics.label && animationManager.setAnimation({
              el: pointGraphics.label,
              component: dataSet,
              callback: _pie2d.hideFn
            });
            return;
          }

          pointGraphics = plotPoint.graphics;

          if (pointConfig.y !== null && pointConfig.y !== UNDEF) {
            dataLabel = pointGraphics.label;
            connector = pointGraphics.connector;
            connector && connector.show();
            dataLabel && dataLabel.show();
          }

          dataLabel = pointGraphics.label;

          if (chartConfig.showtooltip && dataLabel && dataLabel.abbrArr && dataLabel.abbrArr.length) {
            toolTipController.enableToolTip(dataLabel, UNDEF);
          }

          angle = pointConfig.angle;

          if (angle < 0) {
            angle = pi2 + angle;
          } // Calculate top right quarter labels


          if (angle >= 0 && angle < piBy2) {
            quarter = 1;
          } else // Calculate bottom right quarter labels
            if (angle < pi) {
              quarter = 2;
            } else // Calculate bottom left quarter labels
              if (angle < pi3By2) {
                quarter = 3;
              } else {
                // Calculate bottom left quarter labels
                quarter = 0;
              } // Now put labels according to each quarter


          quarters[quarter].push({
            point: plotPoint,
            angle: angle
          });
          /* dataLabel = pointGraphics.label;
          if (dataLabel) {
              angle = pointConfig.angle;
               if (angle < 0) {
                  angle = pi2 + angle;
              }
              // Calculate top right quarter labels
              if (angle >= 0 && angle < piBy2) {
                  quarter = 1;
              } else
              // Calculate bottom right quarter labels
              if (angle < pi) {
                  quarter = 2;
              } else
              // Calculate bottom left quarter labels
              if (angle < (pi3By2)) {
                  quarter = 3;
              }
              // Calculate bottom left quarter labels
              else {
                  quarter = 0;
              }
              // Now put labels according to each quarter
              quarters[quarter].push ( {
                  point : point,
                  angle : angle
              });
          } */
        });
        i = 4; // if excess then remove the low value slice first

        while (i--) {
          if (skipOverlapLabels) {
            // Find labels can fit into the quarters or not
            excess = quarters[i].length - maxLabels;

            if (excess > 0) {
              quarters[i].sort(sortArrayByPoint); // sort by point.y
              // remove extra data form the array
              // which labels can not be fitted into the quarters

              excessArr = quarters[i].splice(0, excess); // hide all removed labels

              for (j = 0, length = excessArr.length; j < length; j += 1) {
                point = excessArr[j].point;
                pointGraphics = point.graphics;

                if (pointGraphics.label) {
                  animationManager.setAnimation({
                    el: pointGraphics.label,
                    attr: {
                      'visibility': HIDDEN
                    },
                    component: dataSet
                  });
                }

                if (pointGraphics.connector) {
                  animationManager.setAnimation({
                    el: pointGraphics.connector,
                    attr: {
                      visibility: HIDDEN
                    },
                    component: dataSet
                  });
                }
              }
            }
          } // now we sort the data labels by its label angle


          quarters[i].sort(sortArrayByAngle);
        }

        maxQuardentLabel = mathMax(quarters[0].length, quarters[1].length, quarters[2].length, quarters[3].length);
        labelQuardentHeight = mathMax(mathMin(maxQuardentLabel, maxLabels) * labelHeight, dataLabelsRadiusY + labelHeight); // reverse 1st and 3rd quardent points

        quarters[1].reverse();
        quarters[3].reverse();
        smartLabel.setStyle(style);
        k = 4;

        while (k--) {
          points = quarters[k];
          length = points.length;

          if (!skipOverlapLabels) {
            if (length > maxLabels) {
              labelHeight = labelQuardentHeight / length;
            } else {
              labelHeight = labelFontSize;
            }

            halfLabelHeight = labelHeight / 2;
          } // 1st pass
          // place all labels at 1st quarter
          // calculate the total available space to put labels


          spaceRequired = length * labelHeight; // calculate the remaining height

          remainingHeight = labelQuardentHeight; // place all child point

          for (i = 0; i < length; i += 1, spaceRequired -= labelHeight) {
            // Get the y position of the label (radius where data label is to draw)
            oriY = mathAbs(labelQuardentHeight * mathSin(points[i].angle));

            if (remainingHeight < oriY) {
              oriY = remainingHeight;
            } else if (oriY < spaceRequired) {
              oriY = spaceRequired;
            }

            remainingHeight = (points[i].oriY = oriY) - labelHeight;
          } // 2nd pass (reverse)


          align = alignments[k]; // place all labels at 1st quarter

          maxYmayHave = labelQuardentHeight - (length - 1) * labelHeight;
          remainingHeight = 0; // place all child point

          for (i = points.length - 1; i >= 0; i -= 1, maxYmayHave += labelHeight) {
            point = points[i].point;
            pointGraphics = point.graphics;
            pointConfig = point.config;
            _textAttrs = pointConfig._textAttrs;
            _textCss = pointConfig._textCss;

            if (pointConfig.y === null || !_textAttrs.text) {
              continue;
            }

            angle = points[i].angle;
            sliced = pointConfig.sliced;
            dataLabel = pointGraphics.label;
            oriY = mathAbs(labelQuardentHeight * mathSin(angle));

            if (oriY < remainingHeight) {
              oriY = remainingHeight;
            } else if (oriY > maxYmayHave) {
              oriY = maxYmayHave;
            }

            remainingHeight = oriY + labelHeight;
            y1 = (oriY + points[i].oriY) / 2;
            x1 = centerX + xSign[k] * dataLabelsRadius * mathCos(math.asin(y1 / labelQuardentHeight));
            y1 *= ySign[k];
            y1 += centerY;
            y2 = centerY + radiusY * mathSin(angle);
            x2 = centerX + radius * mathCos(angle); // Relation: centerX <= connectorStartX <= connectorEndX (for right half and vice
            // versa for left half)

            (k < 2 && x1 < x2 || k > 1 && x1 > x2) && (x1 = x2);
            x3 = x1 + xDisplacement[k];
            y3 = y1 + halfLabelHeight - 2;
            x4 = x3 + xDisplacement[k];
            _textAttrs._x = x4;

            if (manageLabelOverflow) {
              labelWidth = k > 1 ? x4 - canvasLeft : canvasLeft + plotWidth - x4;
              smartLabel.setStyle(pointConfig.style);
              lineHeight = (0, _lib.pluckNumber)(mathCeil(parseFloat(pointConfig.style.lineHeight)), 12) + (mathCeil(parseFloat(pointConfig.style.border), 12) * 2 || 0);
              smartLabelObj = smartLabel.getSmartText(pointConfig.displayValue, labelWidth, lineHeight);
              _textAttrs.text = smartLabelObj.text;
              _textAttrs.tooltip = smartLabelObj.tooltext;
            } // shift the labels at front pieSliceDepthHalf


            if (angle < pi) {
              y1 += pieSliceDepthHalf;
              y2 += pieSliceDepthHalf;
              y3 += pieSliceDepthHalf;
            }

            _textAttrs._y = y3; // dataLabel.y = y3;

            if (sliced) {
              transX = pointConfig.transX;
              transY = pointConfig.transY;
              x3 = x3 + transX;
              x1 = x1 + transX;
              x2 = x2 + transX;
              y1 = y1 + transY;
              y2 = y2 + transY;
              x4 = x4 + transX;
            }

            _textAttrs.visibility = VISIBLE;
            _textAttrs['text-anchor'] = align;
            _textAttrs.x = x4;
            _textAttrs.y = y1;
            _textAttrs.opacity = 1;
            _textCss.cursor = pointConfig.labellink ? 'pointer' : '';
            dataLabelCheck = pointGraphics.label;
            dataLabel = animationManager.setAnimation({
              el: dataLabelCheck || 'text',
              attr: _textAttrs,
              css: _textCss,
              container: dataLabelContainer,
              component: dataSet,
              label: 'label'
            });

            if (chartConfig.showtooltip && dataLabel && dataLabel.abbrArr && dataLabel.abbrArr.length) {
              toolTipController.enableToolTip(dataLabel, UNDEF);
            }

            dataLabel.outlineText(plotOptions.showTextOutline, _textAttrs.fill);
            dataLabel.data('textPos', {
              x: x4,
              y: y1
            }).data('plotItem', _textAttrs.plotItem).data(EVENTARGS, _textAttrs.eventArgs);

            if (!dataLabelCheck) {
              // asssign events on label only on initial creation
              pointGraphics.label = dataLabel;
              dataLabel.on('fc-dragstart', plotDragStart).on('fc-dragmove', plotDragMove).on('fc-dragend', plotDragEnd).on('fc-click', _pie2d.labelClickFn.bind(dataLabel, chart, point.config.labellink)).on('fc-click', (0, _pie2d.plotClickHandler)(dataSet, dataLabel)).on('fc-mouseover', plotRollOver).on('fc-mouseout', plotRollOut);
            }

            dataLabel.x = _textAttrs._x; // storing original x value
            // to use while slicing in (IE Issue original x get changed form animate)

            dataLabel._x = _textAttrs._x;
            dataLabel.y = _textAttrs._y;

            if (_textAttrs.tooltip) {
              toolTipController.enableToolTip(dataLabel, _textAttrs.tooltip);
              delete _textAttrs.tooltip;
            } // draw the connector
            // draw the connector


            if (outside && connectorWidth && enableSmartLabels) {
              connector = pointGraphics.connector; // if (!pointConfig.connectorPath) {
              //   isNewElem = true;
              // }

              pointConfig.connectorPath = connectorPath = [M, x2, y2, // base
              L, isSmartLineSlanted ? x1 : x2, y1, // first break, next to the label
              x3, y1 // end of the string at the label
              ];
              attr = {
                path: connectorPath,
                'stroke-width': connectorWidth,
                stroke: dataLabelsOptions.connectorColor || '#606060',
                opacity: 1,
                visibility: VISIBLE
              };

              if (connector) {
                animationManager.setAnimation({
                  el: connector,
                  attr: attr,
                  label: 'connector',
                  component: dataSet
                });
              }
            }
          }
        }
      }
    }
  };

  _proto._parsePie3DOptions = function _parsePie3DOptions() {
    var dataSet = this,
        conf = dataSet.config;
    return {
      size: 2 * conf.pieMinRadius,
      slicedOffset: conf.slicingDistance,
      allowPointSelect: true,
      cursor: POINTER,
      innerSize: dataSet.getName() === 'pie3d' ? 0 : _doughnut2d._getInnerSize.call(dataSet)
    };
  } // Some border properties of PIE3D varies from that of its 2d counter part
  ;

  _proto._parseBorderConfig = function _parseBorderConfig(setColor, setAlpha, dataJSON) {
    var dataSet = this,
        conf = dataSet.config,
        pieBorderColor = conf.pieBorderColor,
        chartAttr = dataSet.getFromEnv('chart-attrib'),
        // each slice border color
    setPlotBorderColor = (0, _lib.pluck)(dataJSON.bordercolor, pieBorderColor),
        // each slice border alpha
    setPlotBorderAlpha = (0, _lib.pluck)(dataJSON.borderalpha, chartAttr.plotborderalpha, chartAttr.pieborderalpha);
    setPlotBorderColor = (0, _lib.pluck)(setPlotBorderColor, (0, _lib.getLightColor)(setColor, 90)).split(COMMASTRING)[0];
    setPlotBorderAlpha = chartAttr.showplotborder === _lib.ZEROSTRING ? _lib.ZEROSTRING : (0, _lib.pluck)(setPlotBorderAlpha, setAlpha, '80');
    return {
      setPlotBorderColor: setPlotBorderColor,
      setPlotBorderAlpha: setPlotBorderAlpha
    };
  } // Initialising the pie3D manager class.
  ;

  _proto._initPie3dManager = function _initPie3dManager() {
    var i,
        point,
        dataSet = this,
        chart = dataSet.getFromEnv('chart'),
        chartConfig = chart.config,
        precision = 1000,
        total = 0,
        dataSetConfig = dataSet.config,
        dataSetComponents = dataSet.components,
        dataLabelOptions = dataSetConfig.dataLabelOptions,
        pie3DOptions = dataSetConfig.pie3DOptions = dataSet._parsePie3DOptions(),
        startingAngle = (0, _lib.pluck)(dataSetConfig.startAngle, 0) % pi2,
        fontSize,
        managedPieSliceDepth = dataSetConfig.managedPieSliceDepth,
        slicedOffset = dataSetConfig.slicedOffset = pie3DOptions.slicedOffset,
        plotWidth = chartConfig.canvasWidth,
        plotHeight = chartConfig.canvasHeight,
        positions = [chartConfig.canvasLeft + plotWidth * 0.5, chartConfig.canvasTop + plotHeight * 0.5 - managedPieSliceDepth * 0.5],
        start,
        pointConfig,
        end,
        angle,
        lastEnd,
        maxEnd,
        data = dataSetComponents.data,
        fraction,
        smallestSize = mathMin(plotWidth, plotHeight),
        isPercent,
        radiusX,
        // the x component of the radius vector for a given point
    radiusY,
        labelDistance = dataLabelOptions.distance,
        pieYScale = dataSetConfig.pieYScale,
        slicedOffsetY = dataSetConfig.slicedOffsetY || (dataSetConfig.slicedOffsetY = slicedOffset * dataSetConfig.pieYScale),
        pie3DManager = dataSet.getFromEnv('pie3DManager'); // get positions - either an integer or a percentage string must be given


    positions.push(2 * dataSetConfig.pieMinRadius, pie3DOptions.innerSize || 0);
    positions = map(positions, function (length, index) {
      isPercent = /%$/.test(length);
      return isPercent // i == 0: centerX, relative to width
      // i == 1: centerY, relative to height
      // i == 2: size, relative to smallestSize
      // i == 4: innerSize, relative to smallestSize
      ? [plotWidth, plotHeight - managedPieSliceDepth, smallestSize, smallestSize][index] * pInt(length) / 100 : length;
    }); // convert all diameter into radius

    positions[2] /= 2;
    positions[3] /= 2; // Add the ry

    positions.push(positions[2] * pieYScale); // centerRadiusX

    positions.push((positions[2] + positions[3]) / 2); // centerRadiusY

    positions.push(positions[5] * pieYScale); // utility for getting the x value from a given y, used for anticollision logic in data labels

    dataSet.getX = function (y, left) {
      angle = math.asin((y - positions[1]) / (positions[2] + labelDistance));
      return positions[0] + (left ? -1 : 1) * (mathCos(angle) * (positions[2] + labelDistance));
    }; // set center for later use


    dataSetConfig.center = positions; // get the total sum

    (0, _lib.fcEach)(data, function (datapoint) {
      total += datapoint.config.y;
    });
    dataSetConfig.labelsRadius = positions[2] + labelDistance;
    dataSetConfig.labelsRadiusY = dataSetConfig.labelsRadius * pieYScale;
    dataSetConfig.quadrantHeight = (plotHeight - managedPieSliceDepth) / 2;
    dataSetConfig.quadrantWidth = plotWidth / 2;
    lastEnd = startingAngle;
    lastEnd = mathRound(lastEnd * precision) / precision;
    maxEnd = lastEnd + pi2;
    fontSize = (0, _lib.pluckNumber)(parseInt(dataLabelOptions.style.fontSize, 10), 10) + 4; // 2px padding

    dataSetConfig.maxLabels = mathFloor(dataSetConfig.quadrantHeight / fontSize); // max labels per quarter

    dataSetConfig.labelFontSize = fontSize;
    dataSetConfig.connectorPadding = (0, _lib.pluckNumber)(dataLabelOptions.connectorPadding, 5);
    dataSetConfig.isSmartLineSlanted = (0, _lib.pluck)(dataLabelOptions.isSmartLineSlanted, true);
    dataSetConfig.connectorWidth = (0, _lib.pluckNumber)(dataLabelOptions.connectorWidth, 1);
    dataSetConfig.enableSmartLabels = dataLabelOptions.enableSmartLabels;

    if (!pie3DManager) {
      pie3DManager = new Pie3DManager(chart);
      dataSet.attachChild(pie3DManager, 'pie3DManager', false);
      dataSet.addToEnv('pie3DManager', pie3DManager);
    }

    dataSet._configurePie3DManager(); // each (data, function (point) {


    for (i = data.length - 1; i >= 0; i -= 1) {
      point = data[i];
      pointConfig = point.config; // set start and end angle

      start = lastEnd;
      fraction = total ? pointConfig.y / total : 0;
      lastEnd = mathRound((lastEnd + fraction * pi2) * precision) / precision;

      if (lastEnd > maxEnd) {
        lastEnd = maxEnd;
      }

      end = lastEnd; // set the shape

      pointConfig.shapeArgs = {
        sAngle: mathRound(start * precision) / precision,
        eAngle: mathRound(end * precision) / precision
      }; // center for the sliced out slice

      pointConfig.centerAngle = angle = (end + start) / 2 % pi2; // TODO: slicedTranslation is implemented as string

      pointConfig.slicedTranslation = [mathRound(mathCos(angle) * slicedOffset), mathRound(mathSin(angle) * slicedOffsetY)]; // set the anchor point for tooltips

      radiusX = mathCos(angle) * positions[2];
      dataSetConfig.radiusY = radiusY = mathSin(angle) * positions[4];
      pointConfig.tooltipPos = [positions[0] + radiusX * 0.7, positions[1] + radiusY // changed to reducr mouce on tooltip condition
      ]; // API properties

      pointConfig.percentage = fraction * 100;
      pointConfig.total = total;
    }
  };

  _proto._configurePie3DManager = function _configurePie3DManager() {
    var dataSet = this,
        dataSetConfig = dataSet.config,
        dataSetComponents = dataSet.components,
        pie3DManager = dataSet.getFromEnv('pie3DManager'),
        data = dataSetComponents.data;

    if (pie3DManager) {
      pie3DManager.configure(dataSetConfig.pieSliceDepth, data.length === 1, dataSetConfig.use3DLighting, false);
    }
  };

  _proto.allocatePosition = function allocatePosition() {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        chartConfig = chart.config,
        dataSetConfig = dataset.config,
        plotData = dataset.components.data,
        i,
        precision = 1000,
        dataObj,
        startingAngle = (0, _lib.pluck)(dataSetConfig.startAngle, 0) % pi2,
        lastEnd = startingAngle,
        start,
        end,
        point,
        fraction,
        isPercent,
        pie3DOptions = dataSetConfig.pie3DOptions = dataset._parsePie3DOptions(),
        pieYScale = dataSetConfig.pieYScale,
        managedPieSliceDepth = dataSetConfig.managedPieSliceDepth,
        plotWidth = chartConfig.canvasWidth,
        plotHeight = chartConfig.canvasHeight,
        smallestSize = mathMin(plotWidth, plotHeight),
        positions = [chartConfig.canvasLeft + plotWidth * 0.5, chartConfig.canvasTop + plotHeight * 0.5 - managedPieSliceDepth * 0.5],
        total = 0,
        maxEnd,
        len = plotData.length; // get positions - either an integer or a percentage string must be given


    positions.push(2 * dataSetConfig.pieMinRadius, pie3DOptions.innerSize || 0);
    positions = map(positions, function (length, index) {
      isPercent = /%$/.test(length);
      return isPercent // i == 0: centerX, relative to width
      // i == 1: centerY, relative to height
      // i == 2: size, relative to smallestSize
      // i == 4: innerSize, relative to smallestSize
      ? [plotWidth, plotHeight - managedPieSliceDepth, smallestSize, smallestSize][index] * pInt(length) / 100 : length;
    }); // convert all diameter into radius

    positions[2] /= 2;
    positions[3] /= 2; // Add the ry

    positions.push(positions[2] * pieYScale); // centerRadiusX

    positions.push((positions[2] + positions[3]) / 2); // centerRadiusY

    positions.push(positions[5] * pieYScale);
    dataSetConfig.center = positions; // get the total sum

    (0, _lib.fcEach)(plotData, function (plotpoint) {
      total += plotpoint.config.y;
    });
    lastEnd = mathRound(lastEnd * precision) / precision;
    maxEnd = lastEnd + pi2;

    for (i = plotData.length - 1; i >= 0; i -= 1) {
      point = plotData[i];
      start = lastEnd;
      fraction = total ? point.config.y / total : 0;
      lastEnd = mathRound((lastEnd + fraction * pi2) * precision) / precision;

      if (lastEnd > maxEnd) {
        lastEnd = maxEnd;
      }

      end = lastEnd; // set the shape

      point.config.shapeArgs = {
        sAngle: mathRound(start * precision) / precision,
        eAngle: mathRound(end * precision) / precision
      };
    }

    for (i = 0; i < len; i++) {
      dataObj = plotData[i];
      dataset.parsePlotAttributes(dataObj, i);
      dataset.parseLabelAttributes(dataObj, i);
    }
  };

  _proto.parsePlotAttributes = function parsePlotAttributes(set, index) {
    var positions,
        pieYScale,
        dataSet = this,
        dataSetComponents = dataSet.components,
        dataSetConfig = dataSet.config,
        chart = dataSet.getFromEnv('chart'),
        chartConfig = chart.config,
        plotData = dataSetComponents.data,
        dataLabelOptions = dataSetConfig.dataLabelOptions,
        style = dataLabelOptions.style,
        slicedOffset = dataSetConfig.slicingDistance,
        slicedOffsetY = dataSetConfig.slicedOffsetY || (dataSetConfig.slicedOffsetY = slicedOffset * dataSetConfig.pieYScale),
        showBorderEffect = dataSetConfig.showBorderEffect,
        dataLength = plotData.length,
        colorLabelFromPoint = dataSetConfig.usePerPointLabelColor,
        textDirection = chartConfig.textDirection,
        eventArgs,
        plotItem,
        val,
        displayValue,
        setLink,
        sliced,
        angle,
        connectorWidth,
        shapeArgs,
        toolText,
        setConfig,
        dataLabel,
        connector,
        i = index,
        isTranspose,
        _textAttrs,
        _textCss,
        setElAttr,
        connectorAttr,
        setElCosmetics = {},
        prevPositions,
        dataLabelStyle = chartConfig.dataLabelStyle;

    positions = dataSetConfig.center;
    prevPositions = dataSetConfig.prevPositions || positions;
    pieYScale = dataSetConfig.pieYScale;
    setConfig = set.config;

    if (!(_textAttrs = setConfig._textAttrs)) {
      _textAttrs = setConfig._textAttrs = {};
    }

    if (!(_textCss = setConfig._textCss)) {
      _textCss = setConfig._textCss = {};
    }

    val = setConfig.y;
    displayValue = setConfig.displayValue;
    sliced = setConfig.sliced;
    shapeArgs = setConfig.shapeArgs;
    angle = setConfig.centerAngle;
    toolText = setConfig.toolText;
    setLink = !!setConfig.link;
    style = setConfig.style;

    if (val === null || val === UNDEF) {
      // todo: update null data.
      return;
    }

    setElAttr = {
      sAngle: shapeArgs.sAngle,
      eAngle: shapeArgs.eAngle,
      r: !isTranspose ? positions[2] : prevPositions[2],
      innerR: !isTranspose ? positions[3] : prevPositions[3],
      cx: !isTranspose ? positions[0] : prevPositions[0],
      cy: !isTranspose ? positions[1] : prevPositions[1],
      radiusYFactor: pieYScale,
      opacity: 1
    };

    if (displayValue !== UNDEF) {
      // If data label cosmetics exists.
      if (style) {
        if (!(_textCss = setConfig._textCss)) {
          _textCss = setConfig._textCss = {};
        }

        _textCss.fontFamily = style.fontFamily;
        _textCss.fontSize = style.fontSize;
        _textCss.lineHeight = style.lineHeight;
        _textCss.fontWeight = style.fontWeight;
        _textCss.fontStyle = style.fontStyle;
      } else if (setConfig._textCss) {
        /* If there was a perviously applied cosmetics for a data Object, need to restore the chart
        Label styling to it. */
        dataLabel && dataLabel.removeCSS();
        delete setConfig._textCss;
        _textCss = UNDEF;
      }

      setConfig.style = style || (style = dataLabelStyle);
      _textAttrs.text = displayValue;
      _textAttrs.fill = (colorLabelFromPoint ? (0, _lib.toRaphaelColor)(setConfig.color) : style.color) || '#000000';
      _textAttrs['text-bound'] = [style.backgroundColor, style.borderColor, style.borderThickness, style.borderPadding, style.borderRadius, style.borderDash];
      _textAttrs.direction = textDirection;
      _textAttrs.lineHeight = style.lineHeight;

      if (dataLabel) {
        if (_textCss) {
          delete _textCss.fontFamily;
          delete _textCss.fontSize;
          delete _textCss.lineHeight;
          delete _textCss.fontWeight;
          delete _textCss.fontStyle;
          _textCss = UNDEF;
        }
      }

      if (dataLabelOptions.distance > 0 && (connectorWidth = dataLabelOptions.connectorWidth) && dataLabelOptions.enableSmartLabels) {
        connectorAttr = {
          'stroke-width': connectorWidth,
          stroke: dataLabelOptions.connectorColor || '#606060',
          cursor: setLink ? POINTER : '',
          opacity: 1
        };
      }
    } else {
      _textAttrs.text = _lib.BLANKSTRING;
    }

    setConfig.plotItem = plotItem = {
      chart: chart,
      index: i,
      seriesData: dataSetConfig,
      value: val,
      angle: setConfig.angle = angle,
      link: setConfig.link,
      shapeArgs: shapeArgs,
      slicedX: sliced && !dataSetConfig.singletonCase ? mathCos(angle) * slicedOffset : 0,
      slicedY: sliced && !dataSetConfig.singletonCase ? mathSin(angle) * slicedOffsetY : 0,
      sliced: sliced,
      labelText: displayValue,
      name: setConfig.name,
      percentage: setConfig.percentage,
      toolText: toolText,
      originalIndex: dataLength - i - 1,
      style: setConfig.style,
      // graphic: setElement,
      transX: setConfig.transX = mathCos(angle) * slicedOffset,
      transY: setConfig.transY = mathSin(angle) * slicedOffsetY,
      slicedTranslation: setConfig.slicedTranslation = 't' + setConfig.transX + ',' + setConfig.transY,
      label: dataLabel,
      connector: connector
    };
    setConfig.eventArgs = eventArgs = {
      index: dataSetConfig.reversePlotOrder ? dataLength - 1 - i : i,
      link: setConfig.link,
      value: setConfig.y,
      displayValue: setConfig.displayValueArgs,
      categoryLabel: setConfig.categoryLabel,
      isSliced: setConfig.sliced,
      toolText: setConfig.toolText,
      color: setConfig.setColor,
      alpha: setConfig.setAlpha,
      borderColor: setConfig.borderConfig.setPlotBorderColor,
      borderAlpha: setConfig.borderConfig.setPlotBorderAlpha,
      dashed: setConfig.setBorderDashed,
      showLabel: setConfig.showLabel,
      showValue: setConfig.showValue,
      labelPosition: setConfig.labelPosition,
      valuePosition: setConfig.valuePosition,
      labelFont: setConfig.labelFont,
      labelFontColor: setConfig.labelFontColor || '#555555',
      labelLink: setConfig.labelLink,
      hoverColor: setConfig.hoverEffects.hoverColor,
      hoverAlpha: setConfig.hoverEffects.alpha,
      borderHoverColor: setConfig.hoverBorderColor,
      borderHoverAlpha: setConfig.hoverEffects.borderAlpha,
      id: setConfig.id
    };
    setElCosmetics = {
      color: setConfig.color.color.split(',')[0],
      alpha: setConfig._3dAlpha,
      borderWidth: setConfig.borderWidth,
      borderColor: setConfig.borderColor,
      borderAlpha: setConfig.borderConfig.setPlotBorderAlpha
    };
    (0, _lib.extend2)(setElAttr, setElCosmetics);
    setElAttr.cursor = setLink ? POINTER : '';
    setElAttr.showBorderEffect = showBorderEffect;
    setElAttr.transform = 't' + plotItem.slicedX + ',' + plotItem.slicedY;
    _textAttrs.plotItem = plotItem;
    _textAttrs[EVENTARGS] = eventArgs;
    setConfig.props = {
      element: {
        attr: setElAttr
      },
      connector: {
        attr: connectorAttr
      },
      label: {
        attr: _textAttrs,
        css: _textCss
      }
    };
  };

  _proto.draw = function draw() {
    var positions,
        pieYScale,
        dataSet = this,
        dataSetComponents = dataSet.components,
        dataSetConfig = dataSet.config,
        chart = dataSet.getFromEnv('chart'),
        chartConfig = chart.config,
        animationManager = chart.getFromEnv('animationManager'),
        // state,
    plotData = dataSetComponents.data,
        pie3DManager,
        dataLabelOptions = dataSetConfig.dataLabelOptions,
        style = dataLabelOptions.style,
        slicedOffset = dataSetConfig.slicingDistance,
        slicedOffsetY = dataSetConfig.slicedOffsetY || (dataSetConfig.slicedOffsetY = slicedOffset * dataSetConfig.pieYScale),
        showBorderEffect = dataSetConfig.showBorderEffect,
        dataLength = plotData.length,
        colorLabelFromPoint = dataSetConfig.usePerPointLabelColor,
        textDirection = chartConfig.textDirection,
        eventArgs,
        plotItem,
        set,
        val,
        valueTotal = dataSetConfig.valueTotal,
        displayValue,
        setLink,
        sliced,
        angle,
        connectorWidth,
        shapeArgs,
        toolText,
        setConfig,
        setGraphics,
        dataLabel,
        removeDataArr = dataSetComponents.removeDataArr || [],
        connector,
        visible = dataSet.getState('visible'),
        i,
        // callBackCalled = false,
    // datasetGraphics = dataSet.graphics,
    // dataLabelContainer = datasetGraphics.dataLabelContainer,
    dataLabelContainer = dataSet.getContainer('labelGroup'),
        plotGroup,
        isTranspose,
        setElement,
        _textAttrs,
        _textCss,
        setElAttr,
        connectorAttr,
        isnewElem,
        element,
        sliceElements,
        setElCosmetics = {},
        prevPositions,
        toolTipController = dataSet.getFromEnv('toolTipController'),
        showDataLabels = function showDataLabels() {
      dataLabelContainer.show();
      dataSet.placeDataLabels(false);
    },
        dataLabelStyle = chartConfig.dataLabelStyle;

    if (!dataSet.getContainer('pie-groups')) {
      dataSet._createContainer();
    }

    dataLabelContainer = dataSet.getContainer('label-group');
    plotGroup = dataSet.getContainer('plot-group');
    animationManager.setAnimation({
      el: dataLabelContainer,
      attr: {
        css: dataLabelStyle
      },
      component: dataSet,
      label: 'labelcontainer',
      callback: function callback() {
        // hide all groups if dataset is not visible.
        if (!visible || !valueTotal) {
          dataLabelContainer.hide();
          plotGroup.hide();
        } else {
          dataLabelContainer.show();
          plotGroup.show();
        }
      }
    }); // does the initialising tasks and calculations before the actual rendering.

    dataSet._initPie3dManager();

    pie3DManager = dataSet.getFromEnv('pie3DManager'); // Remove extra plots

    removeDataArr.length && dataSet.remove();
    positions = dataSetConfig.center;
    prevPositions = dataSetConfig.prevPositions || positions;
    pieYScale = dataSetConfig.pieYScale; // Spare the world if no data has been sent

    if (!(plotData && dataLength)) {
      plotData = [];
    }

    i = -1;

    while (++i < dataLength) {
      set = plotData[i];
      setConfig = set.config;

      if (!(_textAttrs = setConfig._textAttrs)) {
        _textAttrs = setConfig._textAttrs = {};
      }

      setGraphics = set.graphics;
      val = setConfig.y;
      displayValue = setConfig.displayValue;
      sliced = setConfig.sliced;
      shapeArgs = setConfig.shapeArgs;
      angle = setConfig.centerAngle;
      toolText = setConfig.toolText;
      setLink = !!setConfig.link;
      style = setConfig.style;

      if (val === null || val === UNDEF) {
        // todo: update null data.
        continue;
      }

      setElement = setGraphics.element;
      dataLabel = setGraphics.label;
      connector = setGraphics.connector;
      setElAttr = {
        sAngle: shapeArgs.sAngle,
        eAngle: shapeArgs.eAngle,
        r: !isTranspose ? positions[2] : prevPositions[2],
        innerR: !isTranspose ? positions[3] : prevPositions[3],
        cx: !isTranspose ? positions[0] : prevPositions[0],
        cy: !isTranspose ? positions[1] : prevPositions[1],
        radiusYFactor: pieYScale,
        opacity: 1
      }; // create the element if not available.

      if (!setElement) {
        isnewElem = true; // pick from the pool (maintained by Pie3dManager).

        setElement = setGraphics.element = pie3DManager.useSliceFromPool();

        if (!setElement) {
          setElement = setGraphics.element = pie3DManager.createSlice().drag(plotDragMove, plotDragStart, plotDragEnd).on('fc-mouseover', plotRollOver).on('fc-mouseout', plotRollOut);
          setElement.on('fc-click', (0, _pie2d.plotClickHandler)(dataSet, setElement));
        }
      } else {
        isnewElem = false;
      }

      if (displayValue !== UNDEF) {
        // If data label cosmetics exists.
        if (style) {
          if (!(_textCss = setConfig._textCss)) {
            _textCss = setConfig._textCss = {};
          }

          _textCss.fontFamily = style.fontFamily;
          _textCss.fontSize = style.fontSize;
          _textCss.lineHeight = style.lineHeight;
          _textCss.fontWeight = style.fontWeight;
          _textCss.fontStyle = style.fontStyle;
        } else if (setConfig._textCss) {
          /* If there was a perviously applied cosmetics for a data Object, need to restore the chart
          Label styling to it. */
          dataLabel && dataLabel.removeCSS();
          delete setConfig._textCss;
          _textCss = UNDEF;
        }

        setConfig.style = style || (style = dataLabelStyle);
        _textAttrs.text = displayValue;
        _textAttrs.fill = (colorLabelFromPoint ? (0, _lib.toRaphaelColor)(setConfig.color) : style.color) || '#000000';
        _textAttrs['text-bound'] = [style.backgroundColor, style.borderColor, style.borderThickness, style.borderPadding, style.borderRadius, style.borderDash];
        _textAttrs.direction = textDirection;
        _textAttrs.lineHeight = style.lineHeight;

        if (dataLabelOptions.distance > 0 && (connectorWidth = dataLabelOptions.connectorWidth) && dataLabelOptions.enableSmartLabels) {
          connectorAttr = {
            'stroke-width': connectorWidth,
            stroke: dataLabelOptions.connectorColor || '#606060',
            cursor: setLink ? POINTER : '',
            opacity: 1 // path: 'M 0 0 l 0 0'

          };
          dataLabelContainer.show();
          connector = setGraphics.connector = animationManager.setAnimation({
            el: setGraphics.connector || 'path',
            attr: connectorAttr,
            container: dataLabelContainer,
            label: 'connector',
            component: dataSet
          }).show().on('fc-dragstart', plotDragStart).on('fc-dragmove', plotDragMove).on('fc-dragend', plotDragEnd).on('fc-mouseover', plotRollOver).on('fc-mouseout', plotRollOut);
        }
      } // --when all values of the dataplots are 0--


      if (!valueTotal) {
        dataLabel && dataLabel.hide();
        connector && connector.hide();
      } else {
        dataLabel && dataLabel.show();
        connector && connector.show();
      }

      plotItem = {
        chart: chart,
        index: i,
        seriesData: dataSetConfig,
        value: val,
        angle: setConfig.angle = angle,
        link: setConfig.link,
        shapeArgs: shapeArgs,
        slicedX: sliced && !dataSetConfig.singletonCase ? mathCos(angle) * slicedOffset : 0,
        slicedY: sliced && !dataSetConfig.singletonCase ? mathSin(angle) * slicedOffsetY : 0,
        sliced: sliced,
        labelText: displayValue,
        name: setConfig.name,
        percentage: setConfig.percentage,
        toolText: toolText,
        originalIndex: dataLength - i - 1,
        style: setConfig.style,
        graphic: setElement,
        transX: setConfig.transX = mathCos(angle) * slicedOffset,
        transY: setConfig.transY = mathSin(angle) * slicedOffsetY,
        slicedTranslation: setConfig.slicedTranslation = 't' + setConfig.transX + ',' + setConfig.transY,
        label: dataLabel,
        connector: connector
      };
      eventArgs = {
        index: dataSetConfig.reversePlotOrder ? dataLength - 1 - i : i,
        link: setConfig.link,
        value: setConfig.y,
        displayValue: setConfig.displayValueArgs,
        categoryLabel: setConfig.categoryLabel,
        isSliced: setConfig.sliced,
        toolText: setConfig.toolText,
        color: setConfig.setColor,
        alpha: setConfig.setAlpha,
        borderColor: setConfig.borderConfig.setPlotBorderColor,
        borderAlpha: setConfig.borderConfig.setPlotBorderAlpha,
        dashed: setConfig.setBorderDashed,
        showLabel: setConfig.showLabel,
        showValue: setConfig.showValue,
        labelPosition: setConfig.labelPosition,
        valuePosition: setConfig.valuePosition,
        labelFont: setConfig.labelFont,
        labelFontColor: setConfig.labelFontColor || '#555555',
        labelLink: setConfig.labellink,
        hoverColor: setConfig.hoverEffects.hoverColor,
        hoverAlpha: setConfig.hoverEffects.alpha,
        borderHoverColor: setConfig.hoverBorderColor,
        borderHoverAlpha: setConfig.hoverEffects.borderAlpha,
        id: setConfig.id
      };
      setElCosmetics = {
        color: setConfig.color.color.split(',')[0],
        alpha: setConfig._3dAlpha,
        borderWidth: setConfig.borderWidth,
        borderColor: setConfig.borderColor,
        borderAlpha: setConfig.borderConfig.setPlotBorderAlpha
      };

      if (isnewElem) {
        (0, _lib.extend2)(setElAttr, setElCosmetics);
      }

      setElement.data(GROUPID, i).data('plotItem', plotItem).data(EVENTARGS, eventArgs);
      setElement.data(GROUPID, i).data('plotItem', plotItem).data(EVENTARGS, eventArgs);
      setElAttr.cursor = setLink ? POINTER : '';
      setElAttr.showBorderEffect = showBorderEffect;
      setElAttr.color = setConfig.color.color.split(',')[0];
      setElAttr.alpha = setConfig._3dAlpha;
      setElAttr.borderWidth = setConfig.borderWidth;
      setElAttr.borderColor = setConfig.borderColor;
      toolTipController.enableToolTip(setElement, toolText);
      sliceElements = setElement._confObject.elements;

      for (element in sliceElements) {
        toolTipController.enableToolTip(sliceElements[element], toolText);
      }

      setElAttr.transform = 't' + plotItem.slicedX + ',' + plotItem.slicedY;
      _textAttrs.plotItem = plotItem;
      _textAttrs[EVENTARGS] = eventArgs;
      animationManager.setAnimation({
        el: setElement,
        attr: setElAttr,
        component: dataSet,
        label: 'slice',
        state: isnewElem ? 'appearing' : 'updating'
      });
      connector && connector.data('plotItem', plotItem).data(EVENTARGS, eventArgs);
    }

    showDataLabels(); // Marking dataSet drawn

    dataSet.drawn = true; // Savinf prev positions

    dataSetConfig.prevPositions = positions.slice(0);
  };

  _proto.remove = function remove() {
    var dataSet = this,
        conf = dataSet.config,
        components = dataSet.components,
        animationManager = dataSet.getFromEnv('animationManager'),
        removeDataArr = components.removeDataArr || [],
        pool = dataSet.pool = dataSet.pool = [],
        len = removeDataArr.length,
        pie3DManager = this.getFromEnv('pie3DManager'),
        removeData,
        ele,
        graphics,
        i,
        elem,
        hideFunc = function hideFunc(graphic, type) {
      return function () {
        if (type === elementStr) {
          pie3DManager.removeSlice(graphic.element);
          delete graphic.element;
        } else {
          graphic[type].hide();
        }
      };
    },
        startAngle = conf.startAngle,
        positions = conf.center;

    for (i = 0; i < len; i++) {
      removeData = removeDataArr[0];
      graphics = removeData.graphics;

      for (ele in graphics) {
        elem = graphics[ele];

        if (!pool[ele]) {
          pool[ele] = [];
        }

        if (ele === elementStr) {
          animationManager.setAnimation({
            el: elem,
            attr: {
              sAngle: -startAngle,
              eAngle: -startAngle + 0.01,
              r: positions[2],
              innerR: positions[3],
              cx: positions[0],
              cy: positions[1]
            },
            component: dataSet,
            callback: hideFunc(graphics, ele)
          });
        } else {
          animationManager.setAnimation({
            el: elem,
            attr: {
              opacity: 0
            },
            component: dataSet,
            callback: hideFunc(graphics, ele)
          });
        }
      }

      removeDataArr.splice(0, 1);
    }
  };

  _proto._rotate = function _rotate(stAngle) {
    var dataSet = this,
        setAngle = stAngle,
        dataSetConfig = dataSet.config,
        animationManager = dataSet.getFromEnv('animationManager'),
        dataSetComponents = dataSet.components,
        data = dataSetComponents.data,
        slicedOffset = dataSetConfig.slicedOffset,
        slicedOffsetY = dataSetConfig.slicedOffsetY,
        startingAngle = dataSetConfig.startAngle,
        pie3DManager = dataSet.getFromEnv('pie3DManager'),
        angle;
    setAngle = !isNaN(setAngle) ? setAngle : -dataSetConfig._lastAngle;
    angle = (setAngle - startingAngle) % 360;
    dataSetConfig.startAngle = (0, _lib.pluckNumber)(setAngle, dataSetConfig.startAngle) % 360;
    angle = -(angle * pi) / 180;

    if (pie3DManager) {
      pie3DManager.rotate(angle);
    }

    (0, _lib.fcEach)(data, function (point) {
      var slicedTranslation = [],
          pointGraphics = point.graphics,
          pointConfig = point.config,
          element = pointGraphics.element,
          args = pointConfig.shapeArgs,
          newAngleArgs = {
        sAngle: args.sAngle += angle,
        eAngle: args.eAngle += angle
      },
          pointAngle = pointConfig.angle = (0, _lib.normalizeAngle)((newAngleArgs.sAngle + newAngleArgs.eAngle) / 2),
          sliced = pointConfig.sliced,
          cosAngle = mathCos(pointAngle),
          sinAngle = mathSin(pointAngle); // set the  slicedTranslation

      slicedTranslation = pointConfig.slicedTranslation = [mathRound(cosAngle * slicedOffset), mathRound(sinAngle * slicedOffsetY)];
      pointConfig.transX = slicedTranslation[0];
      pointConfig.transY = slicedTranslation[1];
      pointConfig.slicedX = sliced ? mathCos(angle) * slicedOffset : 0;
      pointConfig.slicedY = sliced ? mathSin(angle) * slicedOffsetY : 0;

      if (element && sliced) {
        animationManager.setAnimation({
          el: element,
          attr: {
            transform: 't' + slicedTranslation[0] + ',' + slicedTranslation[1]
          },
          component: dataSet
        });
      }
    });
    dataSet.placeDataLabels(true, data);
  };

  _proto.foldingFn = function foldingFn() {
    var conf = this.config,
        startAngle = conf.startAngle;
    return {
      sAngle: -startAngle,
      eAngle: -startAngle + 0.01
    };
  }
  /**
   * Returns the type of the component
   * @return {string} type of component
   */
  ;

  _proto.getType = function getType() {
    return 'dataset';
  }
  /**
   * Returns the name of the component
   * @return {string} name of component
   */
  ;

  _proto.getName = function getName() {
    return 'pie3d';
  };

  return Pie3DDataset;
}(_pie2d.default); // **** pie3d manager ***** //
// set the new animatable properites


if (Raphael && Raphael._availableAnimAttrs && Raphael._availableAnimAttrs.cx) {
  // assuming that cx is also numaric type
  Raphael._availableAnimAttrs.innerR = Raphael._availableAnimAttrs.depth = Raphael._availableAnimAttrs.radiusYFactor = Raphael._availableAnimAttrs.sAngle = Raphael._availableAnimAttrs.eAngle = Raphael._availableAnimAttrs.cx;
} // Adding required shapes for chart.


(0, _redraphaelShapes.default)(Raphael); // Pie 3D point class

var Pie3DManager = /*#__PURE__*/function (_ComponentInterface) {
  (0, _inheritsLoose2.default)(Pie3DManager, _ComponentInterface);

  function Pie3DManager(chart) {
    var _this;

    _this = _ComponentInterface.call(this) || this;
    var manager = (0, _assertThisInitialized2.default)(_this);
    manager.config = {};
    manager.linkedItems = {
      chart: chart
    };
    return _this;
  }
  /**
   * Returns the type of the component
   * @return {string} type of component
   */


  var _proto2 = Pie3DManager.prototype;

  _proto2.getType = function getType() {
    return 'pie3DManager';
  }
  /**
   * Returns the name of the component
   * @return {string} name of component
   */
  ;

  _proto2.getName = function getName() {
    return 'pie3d';
  }
  /**
   * This function create a new 3d slice and return that for futher use
   * @return {slice} an raphael like composite object that can be used as a slice element
   * TODO: update slice color depending upon angle
   * TODO: For proper z-index create 2 back outer element for larger (>180 deg) slices
   * TODO: Optimize ***** the element creation, instead of outer1, back and from for all elements,
   * create few extra element per manager, which will act as outer1, back / front (inner / outer wall) for
   *  slices, who has both. Because, at max 1 slice can have outer1 and only 2 slice can have
   *   back and front both
   */
  ;

  _proto2.createSlice = function createSlice() {
    var manager = this,
        renderer = manager.renderer,
        returnElement,
        confObject = {
      elements: {},
      Pie3DManager: manager
    },
        slicingWallsArr = manager.slicingWallsArr,
        elements = confObject.elements,
        renderingPath = _lib.hasSVG ? 'litepath' : 'path'; // create elements

    returnElement = renderer[renderingPath](manager.getContainer('topGroup')); // store the _confObject reference

    returnElement._confObject = confObject;
    confObject.thisElement = returnElement; // modify few core function

    returnElement._destroy = returnElement.destroy;
    returnElement.destroy = destroyFN;
    returnElement._show = returnElement.show;
    returnElement.show = showFN;
    returnElement._hide = returnElement.hide;
    returnElement.hide = hideFN;
    returnElement._on = returnElement.on;
    returnElement.on = onFN;
    returnElement._drag = returnElement.drag;
    returnElement.drag = onDragFN;
    returnElement._attr = returnElement.attr;
    returnElement.attr = attrFN;
    returnElement._data = returnElement.data;
    returnElement.data = dataFN; // add the element to the store

    manager.pointElemStore.push(returnElement);
    elements.topBorder = renderer[renderingPath](manager.getContainer('topGroup'));
    elements.bottom = renderer[renderingPath](manager.getContainer('bottomBorderGroup')).attr({
      'stroke-width': 0
    });
    elements.bottomBorder = renderer[renderingPath](manager.getContainer('bottomBorderGroup'));
    elements.frontOuter = renderer[renderingPath](manager.getContainer('slicingWallsFrontGroup')).attr({
      'stroke-width': 0
    });
    elements.backOuter = renderer[renderingPath](manager.getContainer('slicingWallsFrontGroup')).attr({
      'stroke-width': 0
    });
    elements.startSlice = renderer[renderingPath](manager.getContainer('slicingWallsFrontGroup'));
    elements.endSlice = renderer[renderingPath](manager.getContainer('slicingWallsFrontGroup'));
    elements.frontOuter1 = renderer[renderingPath](manager.getContainer('slicingWallsFrontGroup')).attr({
      'stroke-width': 0
    }); // update config object for proper z order

    elements.frontOuter._conf = {
      si: si,
      isStart: 0.5
    };
    elements.frontOuter1._conf = {
      si: si,
      isStart: 0.5
    };
    elements.startSlice._conf = {
      si: si,
      isStart: 0
    };
    elements.endSlice._conf = {
      si: si,
      isStart: 1
    };
    elements.backOuter._conf = {
      si: si,
      isStart: 0.4
    };
    slicingWallsArr.push(elements.startSlice, elements.frontOuter1, elements.frontOuter, elements.backOuter, elements.endSlice);

    if (manager.isDoughnut) {
      // innerFront
      elements.frontInner = renderer[renderingPath](manager.getContainer('slicingWallsFrontGroup')).attr({
        'stroke-width': 0
      });
      elements.backInner = renderer[renderingPath](manager.getContainer('slicingWallsFrontGroup')).attr({
        'stroke-width': 0
      });
      elements.backInner._conf = {
        si: si,
        isStart: 0.5
      };
      elements.frontInner._conf = {
        si: si,
        isStart: 0.4
      };
      slicingWallsArr.push(elements.frontInner, elements.backInner);
    }

    si += 1;
    return returnElement;
  };

  _proto2.refreshDrawing = function refreshDrawing() {
    var slicingWallsArr = this.slicingWallsArr,
        x = 0,
        sWall,
        ln = slicingWallsArr.length,
        startIndex,
        lastElem2,
        lastElem3,
        index,
        frontGroup = this.getContainer('slicingWallsFrontGroup'),
        backGroup = this.getContainer('slicingWallsBackGroup'); // sort the slicing walls for z-placing

    slicingWallsArr.sort(elementZSortFn); // find the index which cross the pi line

    startIndex = getStartIndex(slicingWallsArr);

    for (; x < ln; x += 1, startIndex += 1) {
      if (startIndex === ln) {
        startIndex = 0;
      }

      sWall = slicingWallsArr[startIndex];
      index = sWall._conf.index;

      if (index < piBy2) {
        frontGroup.appendChild(sWall);
      } else if (index <= pi) {
        if (lastElem2) {
          sWall.insertBefore(lastElem2);
        } else {
          frontGroup.appendChild(sWall);
        }

        lastElem2 = sWall;
      } else if (index <= pi3By2) {
        if (lastElem3) {
          sWall.insertBefore(lastElem3);
        } else {
          backGroup.appendChild(sWall);
        }

        lastElem3 = sWall;
      } else {
        backGroup.appendChild(sWall);
      }
    }
  };

  _proto2.configure = function configure(dpth, hasOnePt, use3DLight, isDghnut) {
    var manager = this,
        depth = dpth,
        hasOnePoint = hasOnePt,
        use3DLighting = use3DLight,
        isDoughnut = isDghnut,
        dataSet = manager.getLinkedParent(),
        renderer = manager.getFromEnv('paper'),
        seriesGroup = dataSet.getContainer('plot-group');

    if (isObject(depth)) {
      depth = depth.depth;
      hasOnePoint = depth.hasOnePoint;
      use3DLighting = depth.use3DLighting;
      isDoughnut = depth.isDoughnut;
    } // @todo: need to have pie to daughnut transpose
    // add the values to the instance


    if (!manager.renderer) {
      manager.renderer = renderer;
    }

    manager.hasOnePoint = hasOnePoint;
    manager.use3DLighting = use3DLighting;
    manager.isDoughnut = isDoughnut;
    manager.depth = depth; // create required groups
    // TODO: if required create bottom side group

    !manager.getContainer('bottomBorderGroup') && manager.addContainer('bottomBorderGroup', renderer.group('bottom-border', seriesGroup)); // @todo: need to have animate with for dept

    manager.getContainer('bottomBorderGroup').attr({
      transform: 't0,' + depth
    });
    !manager.getContainer('slicingWallsBackGroup') && manager.addContainer('slicingWallsBackGroup', renderer.group('slicingWalls-back-Side', seriesGroup));
    !manager.getContainer('slicingWallsFrontGroup') && manager.addContainer('slicingWallsFrontGroup', renderer.group('slicingWalls-front-Side', seriesGroup));
    !manager.getContainer('topGroup') && manager.addContainer('topGroup', renderer.group('top-Side', seriesGroup)); // if arrays are not availabel the create the m for first time

    !manager.pointElemStore && (manager.pointElemStore = []);
    !manager.slicingWallsArr && (manager.slicingWallsArr = []); // few reusable code

    manager.moveCmdArr = [M];
    manager.lineCmdArr = [L];
    manager.closeCmdArr = [Z];
    manager.colorObjs = [];
  };

  _proto2._parseSliceColor = function _parseSliceColor(clr, alph, pointConf) {
    var manager = this,
        color = clr,
        alpha = alph,
        dark1,
        dark2,
        // dark3,
    dark4,
        dark5,
        dark6,
        light1,
        light2,
        light3,
        light4,
        // light5,
    light6,
        alpha1,
        colorStr1,
        colorStr2,
        alphaStr1,
        alphaStr2,
        alphaStr3,
        colorStr3,
        colorStr4,
        colorStr5,
        alphaFactor = 3,
        lighting3D = manager.use3DLighting,
        cacheStore = lighting3D ? pie3DCacheColorStore.lighting3D : pie3DCacheColorStore.lighting2D,
        colorsObj,
        radiusYFactor = pointConf.radiusYFactor,
        cx = pointConf.cx,
        cy = pointConf.cy,
        rx = pointConf.r,
        ry = rx * radiusYFactor,
        innerRx = pointConf.innerR || 0,
        rightX = cx + rx,
        leftX = cx - rx,
        rightInnerX = cx + innerRx,
        leftInnerX = cx - innerRx;

    if (~color.indexOf('rgb')) {
      color = (0, _lib.rawRGBtoHEX)(color);
    }

    alpha = alpha || 100;
    alpha1 = alpha / 2; // check in cacheStore

    if (cacheStore[color] && cacheStore[color][alpha]) {
      // if found return the color
      colorsObj = cacheStore[color][alpha];
    } else {
      // create the color components
      if (!cacheStore[color]) {
        cacheStore[color] = {};
      }

      if (!cacheStore[color][alpha]) {
        cacheStore[color][alpha] = {};
      }

      colorsObj = cacheStore[color][alpha];

      if (lighting3D) {
        dark1 = (0, _lib.getDarkColor)(color, 80);
        dark2 = (0, _lib.getDarkColor)(color, 75);
        light1 = (0, _lib.getLightColor)(color, 85);
        light2 = (0, _lib.getLightColor)(color, 70);
        light3 = (0, _lib.getLightColor)(color, 40);
        light4 = (0, _lib.getLightColor)(color, 50); // light5 = getLightColor(color, 30);

        light6 = (0, _lib.getLightColor)(color, 65); // dark3 = getDarkColor(color, 85);

        dark4 = (0, _lib.getDarkColor)(color, 69);
        dark5 = (0, _lib.getDarkColor)(color, 75);
        dark6 = (0, _lib.getDarkColor)(color, 95);
      } else {
        alphaFactor = 10;
        dark1 = (0, _lib.getDarkColor)(color, 90);
        dark2 = (0, _lib.getDarkColor)(color, 87);
        light1 = (0, _lib.getLightColor)(color, 93);
        light2 = (0, _lib.getLightColor)(color, 87);
        light3 = (0, _lib.getLightColor)(color, 80);
        light6 = light4 = (0, _lib.getLightColor)(color, 85); // light5 = getLightColor(color, 80);

        dark6 = (0, _lib.getDarkColor)(color, 85); // dark3 = dark6;

        dark4 = (0, _lib.getDarkColor)(color, 75);
        dark5 = (0, _lib.getDarkColor)(color, 80);
      }

      colorStr1 = dark2 + COMMASTRING + light1 + COMMASTRING + light2 + COMMASTRING + light1 + COMMASTRING + dark2;
      alphaStr1 = alpha + COMMASTRING + alpha + COMMASTRING + alpha + COMMASTRING + alpha + COMMASTRING + alpha;
      colorStr2 = dark2 + COMMASTRING + color + COMMASTRING + light1 + COMMASTRING + color + COMMASTRING + dark2;
      alphaStr2 = alpha1 + COMMASTRING + alpha1 + COMMASTRING + alpha1 + COMMASTRING + alpha1 + COMMASTRING + alpha1;
      colorStr3 = dark2 + COMMASTRING + color + COMMASTRING + light3 + COMMASTRING + color + COMMASTRING + dark2;
      colorStr4 = dark5 + COMMASTRING + light1 + COMMASTRING + light4 + COMMASTRING + light1 + COMMASTRING + dark4;
      colorStr5 = 'FFFFFF' + COMMASTRING + 'FFFFFF' + COMMASTRING + 'FFFFFF' + COMMASTRING + 'FFFFFF' + COMMASTRING + 'FFFFFF';
      alphaStr3 = 0 + COMMASTRING + alpha1 / alphaFactor + COMMASTRING + alpha / alphaFactor + COMMASTRING + alpha1 / alphaFactor + COMMASTRING + 0;

      if (_lib.hasSVG) {
        colorsObj.top = {
          FCcolor: {
            gradientUnits: 'userSpaceOnUse',
            radialGradient: true,
            color: light6 + COMMASTRING + dark6,
            alpha: alpha + COMMASTRING + alpha,
            ratio: '0,100'
          }
        };
      } else {
        colorsObj.top = {
          FCcolor: {
            gradientUnits: 'objectBoundingBox',
            color: light2 + COMMASTRING + light2 + COMMASTRING + light1 + COMMASTRING + dark2,
            alpha: alpha + COMMASTRING + alpha + COMMASTRING + alpha + COMMASTRING + alpha,
            angle: -72,
            ratio: '0,8,15,77'
          }
        };
      }

      colorsObj.frontOuter = {
        FCcolor: {
          gradientUnits: 'userSpaceOnUse',
          y1: 0,
          y2: 0,
          color: colorStr4,
          alpha: alphaStr1,
          angle: 0,
          ratio: '0,20,15,15,50'
        }
      };
      colorsObj.backOuter = {
        FCcolor: {
          gradientUnits: 'userSpaceOnUse',
          y1: 0,
          y2: 0,
          color: colorStr3,
          alpha: alphaStr2,
          angle: 0,
          ratio: '0,62,8,8,22'
        }
      };
      colorsObj.frontInner = {
        FCcolor: {
          gradientUnits: 'userSpaceOnUse',
          y1: 0,
          y2: 0,
          color: colorStr2,
          alpha: alphaStr2,
          angle: 0,
          ratio: '0,25,5,5,65'
        }
      };
      colorsObj.backInner = {
        FCcolor: {
          gradientUnits: 'userSpaceOnUse',
          y1: 0,
          y2: 0,
          color: colorStr1,
          alpha: alphaStr1,
          angle: 0,
          ratio: '0,62,8,8,22'
        }
      };
      colorsObj.topBorder = {
        FCcolor: {
          gradientUnits: 'userSpaceOnUse',
          y1: 0,
          y2: 0,
          color: colorStr5,
          alpha: alphaStr3,
          angle: 0,
          ratio: '0,20,15,15,50'
        }
      };
      colorsObj.topInnerBorder = {
        FCcolor: {
          gradientUnits: 'userSpaceOnUse',
          y1: 0,
          y2: 0,
          color: colorStr5,
          alpha: alphaStr3,
          angle: 0,
          ratio: '0,50,15,15,20'
        }
      };
      colorsObj.bottom = (0, _lib.toRaphaelColor)((0, _lib.convertColor)(color, alpha1));
      /** TODO will be changed w. r. t. angle */

      colorsObj.startSlice = (0, _lib.toRaphaelColor)((0, _lib.convertColor)(dark1, alpha));
      colorsObj.endSlice = (0, _lib.toRaphaelColor)((0, _lib.convertColor)(dark1, alpha));
    } // check if non color attributes match, else apply them


    if (colorsObj.cx !== cx || colorsObj.cy !== cy || colorsObj.rx !== rx || colorsObj.radiusYFactor !== radiusYFactor || colorsObj.innerRx !== innerRx) {
      // appaly positional properties in colors
      if (_lib.hasSVG) {
        colorsObj.top.FCcolor.cx = cx;
        colorsObj.top.FCcolor.cy = cy;
        colorsObj.top.FCcolor.r = rx;
        colorsObj.top.FCcolor.fx = cx - 0.3 * rx;
        colorsObj.top.FCcolor.fy = cy + ry * 1.2;
      }

      colorsObj.topBorder.FCcolor.x1 = colorsObj.backOuter.FCcolor.x1 = colorsObj.frontOuter.FCcolor.x1 = leftX;
      colorsObj.topBorder.FCcolor.x2 = colorsObj.backOuter.FCcolor.x2 = colorsObj.frontOuter.FCcolor.x2 = rightX;
      colorsObj.topInnerBorder.FCcolor.x1 = colorsObj.backInner.FCcolor.x1 = colorsObj.frontInner.FCcolor.x1 = leftInnerX;
      colorsObj.topInnerBorder.FCcolor.x2 = colorsObj.backInner.FCcolor.x2 = colorsObj.frontInner.FCcolor.x2 = rightInnerX; // Set positional attributes in color Object

      colorsObj.cx = cx;
      colorsObj.cy = cy;
      colorsObj.rx = rx;
      colorsObj.radiusYFactor = radiusYFactor;
      colorsObj.innerRx = innerRx;
    }

    return colorsObj;
  } // eslint-disable-next-line
  ;

  _proto2.allocatePosition = function allocatePosition() {};

  _proto2.rotate = function rotate(angle) {
    var manager = this,
        pointElemStore = manager.pointElemStore,
        x = 0,
        ln = pointElemStore.length,
        point,
        confObject;

    if (!manager.hasOnePoint) {
      for (; x < ln; x += 1) {
        point = pointElemStore[x];
        confObject = point._confObject;
        confObject.sAngle += angle;
        confObject.eAngle += angle;

        manager._setSliceShape(confObject);
      }

      manager.refreshDrawing();
    }
  };

  _proto2.removeSlice = function removeSlice(slice) {
    var manager = this,
        pointElemStore = manager.pointElemStore,
        confObject = slice._confObject,
        elements = confObject.elements,
        slicingWallsArr = manager.slicingWallsArr,
        x,
        ln = pointElemStore.length,
        point,
        wallElement; // remove the slice from the point store

    for (x = ln - 1; x >= 0; x -= 1) {
      point = pointElemStore[x];

      if (point === slice) {
        pointElemStore.splice(x, 1);
      }
    } // remove the side elements from the side wall arr


    ln = slicingWallsArr.length;

    for (x = ln - 1; x >= 0; x -= 1) {
      wallElement = slicingWallsArr[x];

      if (wallElement === elements.startSlice || wallElement === elements.frontOuter1 || wallElement === elements.frontOuter || wallElement === elements.backInner || wallElement === elements.endSlice) {
        slicingWallsArr.splice(x, 1);
      }
    } // hide corrosponding elements


    slice.hide && slice.hide(); // store the element in pool for future reuse

    if (!manager._slicePool) {
      manager._slicePool = [];
    }

    manager._slicePool.push(slice);

    manager.refreshDrawing();
  };

  _proto2.useSliceFromPool = function useSliceFromPool() {
    var manager = this,
        slicePool = manager._slicePool || (manager._slicePool = []),
        slicingWallsArr = manager.slicingWallsArr,
        newSlice = false,
        elements;

    if (slicePool.length) {
      newSlice = slicePool.shift(); // restore the element in point store

      manager.pointElemStore.push(newSlice); // show the slice

      newSlice.show(); // push the side walls in to the side wall array

      elements = newSlice._confObject.elements;
      slicingWallsArr.push(elements.startSlice, elements.frontOuter1, elements.frontOuter);
      elements.backInner && slicingWallsArr.push(elements.backInner);
      slicingWallsArr.push(elements.endSlice);
    }

    return newSlice;
  } // This function do the z-index management
  // @todo: needs to be optimize
  ;

  _proto2._setSliceShape = function _setSliceShape(pointConf, doNotApply) {
    var pie3DManager = this,
        getArcPath = function getArcPath(startX, startY, endX, endY, rX, rY, isClockWise, isLargeArc) {
      return startX === endX && startY === endY ? [] : [A, rX, rY, 0, isLargeArc, isClockWise, endX, endY];
    },
        startOri = pointConf.sAngle,
        endOri = pointConf.eAngle,
        start = (0, _lib.normalizeAngle)(startOri),
        end = (0, _lib.normalizeAngle)(endOri),
        scaleAngle,
        startCos,
        startSin,
        endCos,
        endSin,
        startOuterX,
        startOuterY,
        startOuterTopClipX,
        startOuterTopClipY,
        endOuterTopClipX,
        endOuterTopClipY,
        startInnerX,
        startInnerY,
        endInnerX,
        endInnerY,
        startInnerY1,
        endInnerY1,
        borderThickness = 1,
        isDoughnut = pie3DManager.isDoughnut,
        radiusYFactor = pointConf.radiusYFactor,
        cx = pointConf.cx,
        cy = pointConf.cy,
        rx = pointConf.r,
        ry = rx * radiusYFactor,
        topCliprx = rx + (_lib.hasSVG ? -borderThickness : 2),
        topClipry = ry + (_lib.hasSVG ? -borderThickness : 2),
        innerRx = pointConf.innerR || 0,
        innerRy = innerRx * radiusYFactor,
        depth = pie3DManager.depth,
        depthY = depth + cy,
        rightX = cx + rx,
        leftX = cx - rx,
        rightInnerX = cx + innerRx,
        leftInnerX = cx - innerRx,
        topY = cy - ry,
        bottomY = depthY + ry,
        clipPathforNoClip = [M, leftInnerX, topY, L, leftInnerX, bottomY, Z],
        elements = pointConf.elements,
        startOuterY1,
        endOuterX,
        endOuterY,
        endOuterY1,
        tempArr1,
        tempArr2,
        tempArr3,
        tempArr4,
        tempArr5,
        tempArr6,
        moveCmdArr,
        lineCmdArr,
        closeCmdArr,
        centerPoint,
        leftPoint,
        topPoint,
        rightPoint,
        bottomPoint,
        leftDepthPoint,
        rightDepthPoint,
        leftInnerPoint,
        rightInnerPoint,
        leftInnerDepthPoint,
        rightInnerDepthPoint,
        pathAttrString = PATH_STR,
        middleAngle = (start + end) / 2,
        // not applicable for the slices that are crossing the 0deg
    frontOuterIndex,
        BackOuterIndex,
        crossed2Pi = start > end;

    startCos = mathCos(start);
    startSin = mathSin(start);
    endCos = mathCos(end);
    endSin = mathSin(end);
    startOuterX = cx + rx * startCos;
    startOuterY = cy + ry * startSin;
    startOuterTopClipX = cx + topCliprx * startCos;
    startOuterTopClipY = cy + topClipry * startSin;
    startOuterY1 = startOuterY + depth;
    endOuterX = cx + rx * endCos;
    endOuterY = cy + ry * endSin;
    endOuterTopClipX = cx + topCliprx * endCos;
    endOuterTopClipY = cy + topClipry * endSin;
    endOuterY1 = endOuterY + depth;

    if (isDoughnut) {
      // doughnut like slice
      startInnerX = cx + innerRx * startCos;
      startInnerY = cy + innerRy * startSin;
      startInnerY1 = startInnerY + depth;
      endInnerX = cx + innerRx * endCos;
      endInnerY = cy + innerRy * endSin;
      endInnerY1 = endInnerY + depth;
      pointConf.startSlice = [M, startOuterX, startOuterY, L, startOuterX, startOuterY1, startInnerX, startInnerY1, startInnerX, startInnerY, Z];
      pointConf.endSlice = [M, endOuterX, endOuterY, L, endOuterX, endOuterY1, endInnerX, endInnerY1, endInnerX, endInnerY, Z];
    } else {
      pointConf.startSlice = [M, startOuterX, startOuterY, L, startOuterX, startOuterY1, cx, depthY, cx, cy, Z];
      pointConf.endSlice = [M, endOuterX, endOuterY, L, endOuterX, endOuterY1, cx, depthY, cx, cy, Z];
    }

    if (_lib.hasSVG) {
      scaleAngle = getAbsScaleAngle(start, end); // create the clip for top and bottom

      if (!isDoughnut) {
        pointConf.clipTopPath = [[M, startOuterX, startOuterY, A, rx, ry, 0, scaleAngle > pi ? 1 : 0, 1, endOuterX, endOuterY, L, cx, cy, Z]];
      } else {
        pointConf.clipTopPath = [[M, startOuterX, startOuterY, A, rx, ry, 0, scaleAngle > pi ? 1 : 0, 1, endOuterX, endOuterY, L, endInnerX, endInnerY, A, innerRx, innerRy, 0, scaleAngle > pi ? 1 : 0, 0, startInnerX, startInnerY, Z]];
      }

      pointConf.clipOuterFrontPath1 = [clipPathforNoClip];
      pointConf.clipTopBorderPath = [[M, startOuterTopClipX, startOuterTopClipY, A, topCliprx, topClipry, 0, scaleAngle > pi ? 1 : 0, 1, endOuterTopClipX, endOuterTopClipY, L, endOuterX, endOuterY, endOuterX, endOuterY + borderThickness, A, rx, ry, 0, scaleAngle > pi ? 1 : 0, 0, startOuterX, startOuterY + borderThickness, L, startOuterX, startOuterY, Z]];

      if (startOri !== endOri) {
        if (start > end) {
          // crossed the 0 deg line
          if (start < pi) {
            // crossed the 180 deg line also
            pointConf.clipOuterFrontPath = [[M, rightX, cy, A, rx, ry, 0, 0, 1, endOuterX, endOuterY, V, depth, A, rx, ry, 0, 0, 0, rightX, cy + depth, Z]];
            pointConf.clipOuterFrontPath1 = [[M, leftX, cy, A, rx, ry, 0, 0, 0, startOuterX, startOuterY, V, depth, A, rx, ry, 0, 0, 1, leftX, cy + depth, Z]];
            pointConf.clipOuterBackPath = [[M, rightX, cy, A, rx, ry, 0, 1, 0, leftX, cy, V, depth, A, rx, ry, 0, 1, 1, rightX, cy + depth, Z]];

            if (isDoughnut) {
              pointConf.clipInnerBackPath = [[M, rightInnerX, cy, A, innerRx, innerRy, 0, 1, 0, leftInnerX, cy, V, depth, A, innerRx, innerRy, 0, 1, 1, rightInnerX, cy + depth, Z]];
              pointConf.clipInnerFrontPath = [[M, rightInnerX, cy, A, innerRx, innerRy, 0, 0, 1, endInnerX, endInnerY, V, depth, A, innerRx, innerRy, 0, 0, 0, rightInnerX, cy + depth, Z, M, leftInnerX, cy, A, innerRx, innerRy, 0, 0, 0, startInnerX, startInnerY, V, depth, A, innerRx, innerRy, 0, 0, 1, leftInnerX, cy + depth, Z]];
            }
          } else if (end > pi) {
            // crossed the 180 deg line also
            pointConf.clipOuterFrontPath = [[M, rightX, cy, A, rx, ry, 0, 1, 1, leftX, cy, V, depth, A, rx, ry, 0, 1, 0, rightX, cy + depth, Z]];
            pointConf.clipOuterBackPath = [[M, leftX, cy, A, rx, ry, 0, 0, 1, endOuterX, endOuterY, V, depth, A, rx, ry, 0, 0, 0, leftX, cy + depth, Z, M, rightX, cy, A, rx, ry, 0, 0, 0, startOuterX, startOuterY, V, depth, A, rx, ry, 0, 0, 1, rightX, cy + depth, Z]];

            if (isDoughnut) {
              pointConf.clipInnerFrontPath = [[M, rightInnerX, cy, A, innerRx, innerRy, 0, 1, 1, leftInnerX, cy, V, depth, A, innerRx, innerRy, 0, 1, 0, rightInnerX, cy + depth, Z]];
              pointConf.clipInnerBackPath = [[M, leftInnerX, cy, A, innerRx, innerRy, 0, 0, 1, endInnerX, endInnerY, V, depth, A, innerRx, innerRy, 0, 0, 0, leftInnerX, cy + depth, Z, M, rightInnerX, cy, A, innerRx, innerRy, 0, 0, 0, startInnerX, startInnerY, V, depth, A, innerRx, innerRy, 0, 0, 1, rightInnerX, cy + depth, Z]];
            }
          } else {
            pointConf.clipOuterFrontPath = [[M, rightX, cy, A, rx, ry, 0, 0, 1, endOuterX, endOuterY, V, depth, A, rx, ry, 0, 0, 0, rightX, cy + depth, Z]];
            pointConf.clipOuterBackPath = [[M, startOuterX, startOuterY, A, rx, ry, 0, 0, 1, rightX, cy, V, depth, A, rx, ry, 0, 0, 0, startOuterX, startOuterY1, Z]];

            if (isDoughnut) {
              pointConf.clipInnerFrontPath = [[M, rightInnerX, cy, A, innerRx, innerRy, 0, 0, 1, endInnerX, endInnerY, V, depth, A, innerRx, innerRy, 0, 0, 0, rightInnerX, cy + depth, Z]];
              pointConf.clipInnerBackPath = [[M, startInnerX, startInnerY, A, innerRx, innerRy, 0, 0, 1, rightInnerX, cy, V, depth, A, innerRx, innerRy, 0, 0, 0, startInnerX, startInnerY1, Z]];
            }
          }
        } else if (start < pi) {
          if (end > pi) {
            // crossed the 180 deg line only
            pointConf.clipOuterFrontPath = [[M, startOuterX, startOuterY, A, rx, ry, 0, 0, 1, leftX, cy, V, depth, A, rx, ry, 0, 0, 0, startOuterX, startOuterY1, Z]];
            pointConf.clipOuterBackPath = [[M, leftX, cy, A, rx, ry, 0, 0, 1, endOuterX, endOuterY, V, depth, A, rx, ry, 0, 0, 0, leftX, cy + depth, Z]];

            if (isDoughnut) {
              pointConf.clipInnerFrontPath = [[M, startInnerX, startInnerY, A, innerRx, innerRy, 0, 0, 1, leftInnerX, cy, V, depth, A, innerRx, innerRy, 0, 0, 0, startInnerX, startInnerY1, Z]];
              pointConf.clipInnerBackPath = [[M, leftInnerX, cy, A, innerRx, innerRy, 0, 0, 1, endInnerX, endInnerY, V, depth, A, innerRx, innerRy, 0, 0, 0, leftInnerX, cy + depth, Z]];
            }
          } else {
            // haven't crossed any thing
            pointConf.clipOuterFrontPath = [[M, startOuterX, startOuterY, A, rx, ry, 0, 0, 1, endOuterX, endOuterY, V, depth, A, rx, ry, 0, 0, 0, startOuterX, startOuterY1, Z]];
            pointConf.clipOuterBackPath = [clipPathforNoClip];

            if (isDoughnut) {
              pointConf.clipInnerFrontPath = [[M, startInnerX, startInnerY, A, innerRx, innerRy, 0, 0, 1, endInnerX, endInnerY, V, depth, A, innerRx, innerRy, 0, 0, 0, startInnerX, startInnerY1, Z]];
              pointConf.clipInnerBackPath = [clipPathforNoClip];
            }
          }
        } else {
          // haven't crossed any thing
          pointConf.clipOuterFrontPath = [clipPathforNoClip];
          pointConf.clipOuterBackPath = [[M, startOuterX, startOuterY, A, rx, ry, 0, 0, 1, endOuterX, endOuterY, V, depth, A, rx, ry, 0, 0, 0, startOuterX, startOuterY1, Z]];

          if (isDoughnut) {
            pointConf.clipInnerFrontPath = [clipPathforNoClip];
            pointConf.clipInnerBackPath = [[M, startInnerX, startInnerY, A, innerRx, innerRy, 0, 0, 1, endInnerX, endInnerY, V, depth, A, innerRx, innerRy, 0, 0, 0, startInnerX, startInnerY1, Z]];
          }
        }
      } else {
        // zero Pie
        pointConf.clipOuterFrontPath = pointConf.clipOuterBackPath = pointConf.clipInnerBackPath = pointConf.clipInnerFrontPath = [clipPathforNoClip];
      }

      pathAttrString = LITEPATH_STR;
      pointConf.clipBottomBorderPath = pointConf.clipTopPath;
      pointConf.startSlice = [pointConf.startSlice];
      pointConf.endSlice = [pointConf.endSlice];
    } else {
      // for VML
      moveCmdArr = pie3DManager.moveCmdArr;
      lineCmdArr = pie3DManager.lineCmdArr;
      closeCmdArr = pie3DManager.closeCmdArr;
      centerPoint = [cx, cy];
      leftPoint = [leftX, cy];
      topPoint = [cx, topY];
      rightPoint = [rightX, cy];
      bottomPoint = [cx, cy + ry];
      leftDepthPoint = [leftX, depthY];
      rightDepthPoint = [rightX, depthY];
      leftInnerPoint = [leftInnerX, cy];
      rightInnerPoint = [rightInnerX, cy];
      leftInnerDepthPoint = [leftInnerX, depthY];
      rightInnerDepthPoint = [rightInnerX, depthY];
      pointConf.clipOuterFrontPath1 = [];

      if (startOri !== endOri) {
        if (start > end) {
          // crossed the 0 deg line
          if (start < pi) {
            // crossed the 180 deg line also
            tempArr1 = getArcPath(startOuterX, startOuterY, leftX, cy, rx, ry, 1, 0);
            tempArr3 = getArcPath(leftX, cy, rightX, cy, rx, ry, 1, 0);
            tempArr5 = getArcPath(rightX, cy, endOuterX, endOuterY, rx, ry, 1, 0);
            pointConf.clipOuterBackPath = moveCmdArr.concat(leftPoint, tempArr3, lineCmdArr, rightDepthPoint, getArcPath(rightX, depthY, leftX, depthY, rx, ry, 0, 0), closeCmdArr);
            pointConf.clipOuterFrontPath1 = moveCmdArr.concat([startOuterX, startOuterY], tempArr1, lineCmdArr, leftDepthPoint, getArcPath(leftX, depthY, startOuterX, startOuterY1, rx, ry, 0, 0), closeCmdArr);
            pointConf.clipOuterFrontPath = moveCmdArr.concat(rightPoint, tempArr5, lineCmdArr, [endOuterX, endOuterY1], getArcPath(endOuterX, endOuterY1, rightX, depthY, rx, ry, 0, 0), closeCmdArr);
            pointConf.clipTopBorderPath = moveCmdArr.concat([startOuterX, startOuterY], tempArr1, tempArr3, tempArr5);

            if (isDoughnut) {
              tempArr2 = getArcPath(endInnerX, endInnerY, rightInnerX, cy, innerRx, innerRy, 0, 0);
              tempArr4 = getArcPath(rightInnerX, cy, leftInnerX, cy, innerRx, innerRy, 0, 0);
              tempArr6 = getArcPath(leftInnerX, cy, startInnerX, startInnerY, innerRx, innerRy, 0, 0);
              pointConf.clipInnerBackPath = moveCmdArr.concat(rightInnerPoint, tempArr4, lineCmdArr, leftInnerDepthPoint, getArcPath(leftInnerX, depthY, rightInnerX, depthY, innerRx, innerRy, 1, 0), closeCmdArr);
              pointConf.clipInnerFrontPath = moveCmdArr.concat(leftInnerPoint, tempArr6, lineCmdArr, [startInnerX, startInnerY1], getArcPath(startInnerX, startInnerY1, leftInnerX, depthY, innerRx, innerRy, 1, 0), closeCmdArr, moveCmdArr, [endInnerX, endInnerY], tempArr2, lineCmdArr, rightInnerDepthPoint, getArcPath(rightInnerX, depthY, endInnerX, endInnerY1, innerRx, innerRy, 1, 0), closeCmdArr);
              pointConf.clipTopPath = pointConf.clipTopBorderPath.concat(lineCmdArr, [endInnerX, endInnerY], tempArr2, tempArr4, tempArr6, closeCmdArr);
              pointConf.clipTopBorderPath = pointConf.clipTopBorderPath.concat(moveCmdArr, [endInnerX, endInnerY], tempArr2, tempArr4, tempArr6);
            } else {
              pointConf.clipTopPath = pointConf.clipTopBorderPath.concat(lineCmdArr, centerPoint, closeCmdArr);
            }
          } else if (end > pi) {
            // crossed the 180 deg line also
            tempArr1 = getArcPath(startOuterX, startOuterY, rightX, cy, rx, ry, 1, 0);
            tempArr3 = getArcPath(rightX, cy, leftX, cy, rx, ry, 1, 0);
            tempArr5 = getArcPath(leftX, cy, endOuterX, endOuterY, rx, ry, 1, 0);
            pointConf.clipOuterFrontPath = moveCmdArr.concat(rightPoint, tempArr3, lineCmdArr, leftDepthPoint, getArcPath(leftX, depthY, rightX, depthY, rx, ry, 0, 0), closeCmdArr);
            pointConf.clipOuterBackPath = moveCmdArr.concat([startOuterX, startOuterY], tempArr1, lineCmdArr, rightDepthPoint, getArcPath(rightX, depthY, startOuterX, startOuterY1, rx, ry, 0, 0), closeCmdArr, moveCmdArr, leftPoint, tempArr5, lineCmdArr, [endOuterX, endOuterY1], getArcPath(endOuterX, endOuterY1, leftX, depthY, rx, ry, 0, 0), closeCmdArr);
            pointConf.clipTopBorderPath = moveCmdArr.concat([startOuterX, startOuterY], tempArr1, tempArr3, tempArr5);

            if (isDoughnut) {
              tempArr2 = getArcPath(endInnerX, endInnerY, leftInnerX, cy, innerRx, innerRy, 0, 0);
              tempArr4 = getArcPath(leftInnerX, cy, rightInnerX, cy, innerRx, innerRy, 0, 0);
              tempArr6 = getArcPath(rightInnerX, cy, startInnerX, startInnerY, innerRx, innerRy, 0, 0);
              pointConf.clipInnerFrontPath = moveCmdArr.concat(leftInnerPoint, tempArr4, lineCmdArr, rightInnerDepthPoint, getArcPath(rightInnerX, depthY, leftInnerX, depthY, innerRx, innerRy, 1, 0), closeCmdArr);
              pointConf.clipInnerBackPath = moveCmdArr.concat(rightInnerPoint, tempArr6, lineCmdArr, [startInnerX, startInnerY1], getArcPath(startInnerX, startInnerY1, rightInnerX, depthY, innerRx, innerRy, 1, 0), closeCmdArr, moveCmdArr, [endInnerX, endInnerY], tempArr2, lineCmdArr, leftInnerDepthPoint, getArcPath(leftInnerX, depthY, endInnerX, endInnerY1, innerRx, innerRy, 1, 0), closeCmdArr);
              pointConf.clipTopPath = pointConf.clipTopBorderPath.concat(lineCmdArr, [endInnerX, endInnerY], tempArr2, tempArr4, tempArr6, closeCmdArr);
              pointConf.clipTopBorderPath = pointConf.clipTopBorderPath.concat(moveCmdArr, [endInnerX, endInnerY], tempArr2, tempArr4, tempArr6);
            } else {
              pointConf.clipTopPath = pointConf.clipTopBorderPath.concat(lineCmdArr, centerPoint, closeCmdArr);
            }
          } else {
            tempArr1 = getArcPath(startOuterX, startOuterY, rightX, cy, rx, ry, 1, 0);
            tempArr3 = getArcPath(rightX, cy, endOuterX, endOuterY, rx, ry, 1, 0);
            pointConf.clipOuterFrontPath = moveCmdArr.concat(rightPoint, tempArr3, lineCmdArr, [endOuterX, endOuterY1], getArcPath(endOuterX, endOuterY1, rightX, depthY, rx, ry, 0, 0), closeCmdArr);
            pointConf.clipOuterBackPath = moveCmdArr.concat([startOuterX, startOuterY], tempArr1, lineCmdArr, rightDepthPoint, getArcPath(rightX, depthY, startOuterX, startOuterY1, rx, ry, 0, 0), closeCmdArr);
            pointConf.clipTopBorderPath = moveCmdArr.concat([startOuterX, startOuterY], tempArr1, tempArr3);

            if (isDoughnut) {
              tempArr2 = getArcPath(endInnerX, endInnerY, rightInnerX, cy, innerRx, innerRy, 0, 0);
              tempArr4 = getArcPath(rightInnerX, cy, startInnerX, startInnerY, innerRx, innerRy, 0, 0);
              pointConf.clipInnerFrontPath = moveCmdArr.concat([endInnerX, endInnerY], tempArr2, lineCmdArr, rightInnerDepthPoint, getArcPath(rightInnerX, depthY, endInnerX, endInnerY1, innerRx, innerRy, 1, 0), closeCmdArr);
              pointConf.clipInnerBackPath = moveCmdArr.concat(rightInnerPoint, tempArr4, lineCmdArr, [startInnerX, startInnerY1], getArcPath(startInnerX, startInnerY1, rightInnerX, depthY, innerRx, innerRy, 1, 0), closeCmdArr);
              pointConf.clipTopPath = pointConf.clipTopBorderPath.concat(lineCmdArr, [endInnerX, endInnerY], tempArr2, tempArr4, closeCmdArr);
              pointConf.clipTopBorderPath = pointConf.clipTopBorderPath.concat(moveCmdArr, [endInnerX, endInnerY], tempArr2, tempArr4);
            } else {
              pointConf.clipTopPath = pointConf.clipTopBorderPath.concat(lineCmdArr, centerPoint, closeCmdArr);
            }
          }
        } else if (start < pi) {
          if (end > pi) {
            // crossed the 180 deg line only
            tempArr1 = getArcPath(startOuterX, startOuterY, leftX, cy, rx, ry, 1, 0);
            tempArr3 = getArcPath(leftX, cy, endOuterX, endOuterY, rx, ry, 1, 0);
            pointConf.clipOuterBackPath = moveCmdArr.concat(leftPoint, tempArr3, lineCmdArr, [endOuterX, endOuterY1], getArcPath(endOuterX, endOuterY1, leftX, depthY, rx, ry, 0, 0), closeCmdArr);
            pointConf.clipOuterFrontPath = moveCmdArr.concat([startOuterX, startOuterY], tempArr1, lineCmdArr, leftDepthPoint, getArcPath(leftX, depthY, startOuterX, startOuterY1, rx, ry, 0, 0), closeCmdArr);
            pointConf.clipTopBorderPath = moveCmdArr.concat([startOuterX, startOuterY], tempArr1, tempArr3);

            if (isDoughnut) {
              tempArr2 = getArcPath(endInnerX, endInnerY, leftInnerX, cy, innerRx, innerRy, 0, 0);
              tempArr4 = getArcPath(leftInnerX, cy, startInnerX, startInnerY, innerRx, innerRy, 0, 0);
              pointConf.clipInnerBackPath = moveCmdArr.concat([endInnerX, endInnerY], tempArr2, lineCmdArr, leftInnerDepthPoint, getArcPath(leftInnerX, depthY, endInnerX, endInnerY1, innerRx, innerRy, 1, 0), closeCmdArr);
              pointConf.clipInnerFrontPath = moveCmdArr.concat(leftInnerPoint, tempArr4, lineCmdArr, [startInnerX, startInnerY1], getArcPath(startInnerX, startInnerY1, leftInnerX, depthY, innerRx, innerRy, 1, 0), closeCmdArr);
              pointConf.clipTopPath = pointConf.clipTopBorderPath.concat(lineCmdArr, [endInnerX, endInnerY], tempArr2, tempArr4, closeCmdArr);
              pointConf.clipTopBorderPath = pointConf.clipTopBorderPath.concat(moveCmdArr, [endInnerX, endInnerY], tempArr2, tempArr4);
            } else {
              pointConf.clipTopPath = pointConf.clipTopBorderPath.concat(lineCmdArr, centerPoint, closeCmdArr);
            }
          } else {
            // haven't crossed any thing
            tempArr1 = getArcPath(startOuterX, startOuterY, endOuterX, endOuterY, rx, ry, 1, 0);
            pointConf.clipOuterBackPath = moveCmdArr.concat([startOuterX, startOuterY]);
            pointConf.clipTopBorderPath = pointConf.clipOuterBackPath.concat(tempArr1);
            pointConf.clipOuterFrontPath = pointConf.clipTopBorderPath.concat(lineCmdArr, [endOuterX, endOuterY1], getArcPath(endOuterX, endOuterY1, startOuterX, startOuterY1, rx, ry, 0, 0), closeCmdArr);

            if (isDoughnut) {
              tempArr2 = getArcPath(endInnerX, endInnerY, startInnerX, startInnerY, innerRx, innerRy, 0, 0);
              pointConf.clipInnerBackPath = moveCmdArr.concat([endInnerX, endInnerY]);
              pointConf.clipTopPath = pointConf.clipTopBorderPath.concat(lineCmdArr, [endInnerX, endInnerY], tempArr2, closeCmdArr);
              pointConf.clipTopBorderPath = pointConf.clipTopBorderPath.concat(moveCmdArr, [endInnerX, endInnerY], tempArr2);
              pointConf.clipInnerFrontPath = pointConf.clipInnerBackPath.concat(tempArr2, lineCmdArr, [startInnerX, startInnerY1], getArcPath(startInnerX, startInnerY1, endInnerX, endInnerY1, innerRx, innerRy, 1, 0), closeCmdArr);
            } else {
              pointConf.clipTopPath = pointConf.clipTopBorderPath.concat(lineCmdArr, centerPoint, closeCmdArr);
            }
          }
        } else {
          // haven't crossed any thing
          tempArr1 = getArcPath(startOuterX, startOuterY, endOuterX, endOuterY, rx, ry, 1, 0);
          pointConf.clipOuterFrontPath = moveCmdArr.concat([startOuterX, startOuterY]);
          pointConf.clipTopBorderPath = pointConf.clipOuterFrontPath.concat(tempArr1);
          pointConf.clipOuterBackPath = pointConf.clipTopBorderPath.concat(lineCmdArr, [endOuterX, endOuterY1], getArcPath(endOuterX, endOuterY1, startOuterX, startOuterY1, rx, ry, 0, 0), closeCmdArr);

          if (isDoughnut) {
            tempArr2 = getArcPath(endInnerX, endInnerY, startInnerX, startInnerY, innerRx, innerRy, 0, 0);
            pointConf.clipInnerFrontPath = moveCmdArr.concat([endInnerX, endInnerY]);
            pointConf.clipTopPath = pointConf.clipTopBorderPath.concat(lineCmdArr, [endInnerX, endInnerY], tempArr2, closeCmdArr);
            pointConf.clipTopBorderPath = pointConf.clipTopBorderPath.concat(pointConf.clipInnerFrontPath, tempArr2);
            pointConf.clipInnerBackPath = pointConf.clipInnerFrontPath.concat(tempArr2, lineCmdArr, [startInnerX, startInnerY1], getArcPath(startInnerX, startInnerY1, endInnerX, endInnerY1, innerRx, innerRy, 1, 0), closeCmdArr);
          } else {
            pointConf.clipTopPath = pointConf.clipTopBorderPath.concat(lineCmdArr, centerPoint, closeCmdArr);
          }
        } // enlarge the bounded box so that the gradient works perfactly


        tempArr1 = moveCmdArr.concat(leftPoint, lineCmdArr, rightPoint);
        tempArr2 = moveCmdArr.concat(topPoint, lineCmdArr, bottomPoint);
        pointConf.clipTopPath = pointConf.clipTopPath.concat(tempArr1, tempArr2);
        pointConf.clipOuterFrontPath = pointConf.clipOuterFrontPath.concat(tempArr1);
        pointConf.clipOuterFrontPath1 = pointConf.clipOuterFrontPath1.concat(tempArr1);
        pointConf.clipOuterBackPath = pointConf.clipOuterBackPath.concat(tempArr1);

        if (isDoughnut) {
          tempArr2 = moveCmdArr.concat(leftInnerPoint, lineCmdArr, rightInnerPoint);
          pointConf.clipInnerFrontPath = pointConf.clipInnerFrontPath.concat(tempArr2);
          pointConf.clipInnerBackPath = pointConf.clipInnerBackPath.concat(tempArr2);
        }
      } else {
        // zero Pie
        pointConf.clipTopPath = pointConf.clipOuterFrontPath = pointConf.clipOuterBackPath = [];

        if (isDoughnut) {
          pointConf.clipInnerFrontPath = pointConf.clipInnerBackPath = [];
        }
      }

      pointConf.clipBottomBorderPath = pointConf.clipTopBorderPath;
    } // now apply the changes


    if (!doNotApply) {
      elements.startSlice._conf.index = start;
      elements.endSlice._conf.index = end;
      elements.backOuter._conf.index = BackOuterIndex = crossed2Pi && (start <= pi3By2 || end > pi3By2) || start <= pi3By2 && end > pi3By2 ? pi3By2 : start > pi ? start : end;
      elements.frontOuter._conf.index = frontOuterIndex = end <= piBy2 ? end : start > end || start <= piBy2 ? piBy2 : start;
      elements.frontOuter1._conf.index = start;
      elements.frontOuter1._conf.cIndex = pi;

      if (start > end) {
        elements.backOuter._conf.cIndex = start < pi3By2 ? pi3By2 : pi2;
        elements.startSlice._conf.cIndex = start < pi ? (start + pi) / 2 : (start + pi2) / 2;
        elements.endSlice._conf.cIndex = elements.frontOuter._conf.cIndex = 0;
      } else {
        elements.backOuter._conf.cIndex = elements.startSlice._conf.cIndex = elements.endSlice._conf.cIndex = elements.frontOuter._conf.cIndex = middleAngle;
      }

      if (scaleAngle > pi) {
        elements.frontOuter1.show().attr(pathAttrString, pointConf.clipOuterFrontPath1);
      } else {
        elements.frontOuter1.hide();
      }

      pointConf.thisElement._attr(pathAttrString, pointConf.clipTopPath);

      elements.bottom.attr(pathAttrString, pointConf.clipTopPath);
      elements.bottomBorder.attr(pathAttrString, pointConf.clipBottomBorderPath);
      elements.topBorder && elements.topBorder.attr(pathAttrString, pointConf.clipTopBorderPath);
      elements.frontOuter.attr(pathAttrString, pointConf.clipOuterFrontPath);
      elements.backOuter.attr(pathAttrString, pointConf.clipOuterBackPath);

      if (isDoughnut) {
        elements.backInner.attr(pathAttrString, pointConf.clipInnerBackPath);
        elements.frontInner.attr(pathAttrString, pointConf.clipInnerFrontPath);
        elements.backInner._conf.index = BackOuterIndex;
        elements.frontInner._conf.index = frontOuterIndex;

        if (start > end) {
          elements.backInner._conf.cIndex = pi2;
          elements.frontInner._conf.cIndex = 0;
        } else {
          elements.backInner._conf.cIndex = elements.frontInner._conf.cIndex = middleAngle;
        }
      }

      if (pie3DManager.hasOnePoint) {
        elements.startSlice.hide();
        elements.endSlice.hide();
      } else {
        elements.startSlice.attr(pathAttrString, pointConf.startSlice).show();
        elements.endSlice.attr(pathAttrString, pointConf.endSlice).show();
      }
    }
  };

  _proto2._setSliceCosmetics = function _setSliceCosmetics(pointConf) {
    var manager = this,
        topElement = pointConf.thisElement,
        showBorderEffect = pointConf.showBorderEffect,
        elements = pointConf.elements,
        colorObj,
        borderColor = (0, _lib.convertColor)(pointConf.borderColor, (0, _lib.pluckNumber)(pointConf.borderAlpha, pointConf.alpha)),
        borderWidth = pointConf.borderWidth,
        topAttrObj;

    if (!pointConf.color) {
      return;
    } // in case of hover, color is color object, have property color containing values


    pointConf.color = pointConf.color.color ? pointConf.color.color : pointConf.color;
    colorObj = manager._parseSliceColor(pointConf.color, pointConf.alpha, pointConf);

    if (_lib.hasSVG) {
      topAttrObj = {
        fill: (0, _lib.toRaphaelColor)(colorObj.top),
        'stroke-width': 0
      };

      if (showBorderEffect) {
        elements.topBorder.show().attr({
          fill: (0, _lib.toRaphaelColor)(colorObj.topBorder),
          'stroke-width': 0
        });
      } else {
        elements.topBorder.hide();
        topAttrObj.stroke = borderColor;
        topAttrObj['stroke-width'] = borderWidth;
      } // top


      topElement._attr(topAttrObj);
    } else {
      topElement._attr({
        fill: (0, _lib.toRaphaelColor)(colorObj.top),
        'stroke-width': 0
      }); // top border


      elements.topBorder.attr({
        stroke: borderColor,
        'stroke-width': borderWidth
      });
    } // bottom


    elements.bottom.attr({
      fill: (0, _lib.toRaphaelColor)(colorObj.bottom)
    }); // bottom

    elements.bottomBorder.attr({
      stroke: borderColor,
      'stroke-width': borderWidth
    });
    elements.frontOuter.attr({
      fill: (0, _lib.toRaphaelColor)(colorObj.frontOuter)
    });
    elements.frontOuter1.attr({
      fill: (0, _lib.toRaphaelColor)(colorObj.frontOuter)
    }); // outerback

    elements.backOuter.attr({
      fill: (0, _lib.toRaphaelColor)(colorObj.backOuter)
    }); // startSlice
    // whenAtBack

    elements.startSlice.attr({
      fill: (0, _lib.toRaphaelColor)(colorObj.startSlice),
      stroke: borderColor,
      'stroke-width': borderWidth
    }); // endSlice
    // whenAtBack

    elements.endSlice.attr({
      fill: (0, _lib.toRaphaelColor)(colorObj.endSlice),
      stroke: borderColor,
      'stroke-width': borderWidth
    });

    if (manager.isDoughnut) {
      // innerFront
      elements.frontInner.attr({
        fill: (0, _lib.toRaphaelColor)(colorObj.frontInner)
      });
      elements.backInner.attr({
        fill: (0, _lib.toRaphaelColor)(colorObj.backInner)
      });
    }
  };

  return Pie3DManager;
}(_componentInterface.ComponentInterface);

var _default = Pie3DDataset;
exports["default"] = _default;

/***/ }),

/***/ 604:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = _default;

var _canvas3d = _interopRequireDefault(__webpack_require__(605));

var _axisRefComponent = _interopRequireDefault(__webpack_require__(588));

var _lib = __webpack_require__(274);

/**
 * canvas factory creates canvas only. for those charts where cartesian axis ref visuals are required
 * @param {Object} chart chart API
 */
function _default(chart) {
  var canvas;
  (0, _lib.componentFactory)(chart, _canvas3d.default, 'canvas', chart.config.showVolumeChart ? 2 : 1);
  canvas = chart.getChildren('canvas');

  if (canvas) {
    for (var i = 0, len = canvas.length; i < len; i++) {
      canvas[i].configure();
      (0, _lib.componentFactory)(canvas[i], _axisRefComponent.default, 'axisRefVisualCartesian');
    }
  }
}

/***/ }),

/***/ 759:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = _default;

var _column3d = _interopRequireDefault(__webpack_require__(609));

var _lib = __webpack_require__(274);

var _dataset = __webpack_require__(671);

var MULTISERIESCOLUMNMANAGER = 'multiseriesColumnManager',
    MULTISERIESCOLUMNMANAGER3D = 'multiseriesColumnManager3D';
/**
 * function to  create dataset, groupmaneger.
 * assign dataset to group manager.
 * @param {Object} chart Chart API
 **/

function _default(chart) {
  var jsonData = chart.getFromEnv('dataSource'),
      datasetsJSON = jsonData.dataset,
      children = chart.getChildren(),
      canvas = children.canvas[0],
      vCanvasArr = canvas.getChildren('vCanvas'),
      vCanvas = vCanvasArr[0],
      svCanvas = vCanvasArr[1],
      datasetJSON,
      isdual = chart.getFromEnv('chartConfig').isdual,
      i,
      canvasDatasetsDef = {
    vCanvasDatasetsDef0: {},
    vCanvasDatasetsDef1: {}
  },
      manager3D,
      datasetsDef,
      datasetDef,
      DsGroupClass,
      dsType,
      parentyaxis,
      relatedVCanvas,
      relatedPrevDatasetMap,
      prevDatasetMap = {
    vCanvas0: {},
    vCanvas1: {}
  };

  if (!datasetsJSON) {
    chart.setChartMessage();
  }

  for (i = 0; i < datasetsJSON.length; i++) {
    datasetJSON = datasetsJSON[i];
    parentyaxis = datasetJSON.parentyaxis || '';

    if (parentyaxis.toLowerCase() === 's' && isdual) {
      dsType = (0, _lib.pluck)(datasetJSON.renderas, chart.config.sDefaultDatasetType);
      relatedVCanvas = svCanvas;
      relatedPrevDatasetMap = prevDatasetMap.vCanvas1;
      datasetsDef = canvasDatasetsDef.vCanvasDatasetsDef1;
    } else {
      dsType = (0, _lib.pluck)(datasetJSON.renderas, chart.config.defaultDatasetType);
      relatedVCanvas = vCanvas;
      relatedPrevDatasetMap = prevDatasetMap.vCanvas0;
      datasetsDef = canvasDatasetsDef.vCanvasDatasetsDef0;
    }

    dsType = chart.getDSType(dsType, parentyaxis.toLowerCase() === 's');
    DsGroupClass = chart.getDSGroupdef(dsType, parentyaxis);

    if (DsGroupClass) {
      (0, _lib.componentFactory)(relatedVCanvas, _column3d.default, MULTISERIESCOLUMNMANAGER3D);
      manager3D = relatedVCanvas.getChildren(MULTISERIESCOLUMNMANAGER3D)[0];
      relatedPrevDatasetMap[manager3D.getName()] = true;
      (0, _lib.componentFactory)(manager3D, DsGroupClass, MULTISERIESCOLUMNMANAGER);
      relatedPrevDatasetMap[DsGroupClass.getName().toLowerCase()] = true;
    }

    relatedPrevDatasetMap[dsType.toLowerCase()] = true;

    if (datasetsDef[dsType]) {
      datasetsDef[dsType].conf.push(datasetJSON);
      datasetsDef[dsType].indices.push(i);
    } else {
      datasetsDef[dsType] = {};
      datasetsDef[dsType].indices = [i];
      datasetsDef[dsType].classDef = chart.getDSdef(dsType);
      datasetsDef[dsType].conf = [datasetJSON];
      datasetsDef[dsType].pYAxis = parentyaxis.toLowerCase();
      datasetsDef[dsType].parent = DsGroupClass ? manager3D.getChildren(MULTISERIESCOLUMNMANAGER)[0] : relatedVCanvas;
    }
  }

  for (var key in canvasDatasetsDef) {
    if (canvasDatasetsDef.hasOwnProperty(key)) {
      datasetsDef = canvasDatasetsDef[key];

      for (dsType in datasetsDef) {
        if (datasetsDef.hasOwnProperty(dsType)) {
          datasetDef = datasetsDef[dsType];

          if (datasetDef.parent.getType() === 'group') {
            datasetDef.parent.configure(datasetDef.conf);
          }

          (0, _lib.datasetFactory)(datasetDef.parent, datasetDef.classDef, 'dataset_' + dsType, datasetDef.conf.length, datasetDef.conf, datasetDef.indices);
        }
      }
    }
  }

  (0, _dataset.removeComponents)(vCanvasArr[0], Object.keys(prevDatasetMap.vCanvas0));
  (0, _dataset.removeComponents)(vCanvasArr[1], Object.keys(prevDatasetMap.vCanvas1));
}

/***/ }),

/***/ 735:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = _default;

var _lib = __webpack_require__(274);

var _barMultiseries = _interopRequireDefault(__webpack_require__(736));

/**
 * function to  create dataset, groupmaneger.
 * assign dataset to group manager.
 * @param {Object} chart chart API
 **/
function _default(chart) {
  var jsonData = chart.getFromEnv('dataSource'),
      pDatasetsJSON = jsonData.dataset,
      pLength = pDatasetsJSON && pDatasetsJSON.length,
      i,
      length,
      prevLength = 0,
      datasetsJSON,
      canvas = chart.getChildren('canvas')[0],
      vCanvas = canvas.getChildren('vCanvas')[0],
      indices,
      stackGroups,
      stackConf = [],
      stackGroupParent;

  if (!pDatasetsJSON) {
    chart.setChartMessage();
    return;
  }

  (0, _lib.componentFactory)(vCanvas, _barMultiseries.default, 'multiSeriesGroup_bar');
  stackGroupParent = vCanvas.getChildren('multiSeriesGroup_bar')[0];

  for (i = 0; i < pLength; i++) {
    stackConf.push(pDatasetsJSON[i].dataset);
  }

  (0, _lib.componentFactory)(stackGroupParent, chart.getDSGroupdef(), 'stackedGroup_bar', pLength, stackConf);
  stackGroups = stackGroupParent.getChildren('stackedGroup_bar');

  for (i = 0; i < stackGroups.length; i++) {
    if (stackGroups[i].getState('removed') !== true) {
      datasetsJSON = pDatasetsJSON[i].dataset;

      if (!datasetsJSON) {
        chart.setChartMessage();
        return;
      }

      length = datasetsJSON && datasetsJSON.length;
      indices = Array(length).fill(prevLength).map(function (n, j) {
        return n + j;
      });
      (0, _lib.datasetFactory)(stackGroups[i], chart.getDSdef(), 'dataset_bar', length, datasetsJSON, indices);
      prevLength += length;
    }
  }

  chart.config._lastDatasetIndex = indices[indices.length - 1];
}

/***/ }),

/***/ 745:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = _default;

var _lib = __webpack_require__(274);

var _column3d = _interopRequireDefault(__webpack_require__(609));

/**
 * Create dataset for 3d charts
 * @param {Object} chart Chart API
 */
function _default(chart) {
  var jsonData = chart.getFromEnv('dataSource'),
      datasetsJSON = jsonData.dataset,
      children = chart.getChildren(),
      canvas = children.canvas[0],
      vCanvas,
      datasetParent = vCanvas = canvas.getChildren('vCanvas')[0],
      DsGroupClass,
      DSClass,
      dsType = chart.config.defaultDatasetType || '',
      groupManager,
      groupManager3d;

  if (!datasetsJSON) {
    chart.setChartMessage();
  }

  (0, _lib.componentFactory)(vCanvas, _column3d.default, 'datasetGroup_' + dsType);
  groupManager3d = vCanvas.getChildren('datasetGroup_' + dsType)[0];
  DsGroupClass = chart.getDSGroupdef();
  (0, _lib.componentFactory)(groupManager3d, DsGroupClass, 'datasetGroup_' + dsType, 1, [{}]);
  groupManager = groupManager3d.getChildren('datasetGroup_' + dsType);
  groupManager && (datasetParent = groupManager[0]);
  DSClass = chart.getDSdef();
  (0, _lib.datasetFactory)(datasetParent, DSClass, 'dataset', datasetsJSON.length, datasetsJSON);
}

/***/ }),

/***/ 675:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = _default;

var _numeric = _interopRequireDefault(__webpack_require__(537));

var _category = _interopRequireDefault(__webpack_require__(585));

var _lib = __webpack_require__(274);

/**
 * function to instatiate axis and get attached to canvas
 * @param {Object} chart chart API
 */
function _default(chart) {
  var children,
      chartAttr = chart.getFromEnv('chart-attrib'),
      showCumulativeLine = (0, _lib.pluckNumber)(chartAttr.showcumulativeline, 1),
      canvas = chart.getChildren('canvas')[0],
      axisRefVisualCartesian = canvas.getChildren('axisRefVisualCartesian')[0],
      zoomObj = {
    zoomable: true,
    pannable: true
  },
      config = chart._feedAxesRawData(),
      yAxes,
      xAxis,
      redraw = function redraw() {
    return axisRefVisualCartesian.asyncDraw();
  };

  (0, _lib.componentFactory)(chart, _category.default, 'xAxis', 1, config.xAxisConf);
  children = chart.getChildren();
  xAxis = children.xAxis[0];
  axisRefVisualCartesian.setLinkedItem(xAxis.getId(), xAxis);
  canvas.attachAxis(xAxis, false, chart.zoomX ? zoomObj : {});
  xAxis.setLinkedItem('canvas', canvas);
  (0, _lib.componentFactory)(chart, _numeric.default, 'yAxis', showCumulativeLine ? 2 : 1, config.yAxisConf);
  yAxes = chart.getChildren('yAxis');
  yAxes && yAxes[1] && yAxes[1].setAxisConfig({
    isPercent: true,
    drawLabels: true,
    drawPlotLines: true,
    drawAxisName: true,
    drawAxisLine: true,
    drawPlotBands: true,
    drawTrendLines: true,
    drawTrendLabels: true
  });
  yAxes.forEach(function (axis) {
    if (axis.getState('removed') !== true) {
      axis.setLinkedItem('canvas', canvas);
      axisRefVisualCartesian.setLinkedItem(axis.getId(), axis);
      canvas.attachAxis(axis, true, chart.zoomY ? zoomObj : {});
      axisRefVisualCartesian.setLinkedItem(axis.getId(), axis);
      axisRefVisualCartesian.addExtEventListener('visiblerangeset', redraw, axis);
    } else {
      canvas.detachAxis(axis);
    }
  });

  chart._setCategories();
}

/***/ }),

/***/ 676:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = _default;

var _column3d = _interopRequireDefault(__webpack_require__(609));

var _lib = __webpack_require__(274);

/**
 * function to  create dataset.
 * assign dataset to vCanvas.
 **/
function _default(chart) {
  var children = chart.getChildren(),
      chartAttr = chart.getFromEnv('chart-attrib'),
      canvas = children.canvas[0],
      datasetParent = canvas.getChildren('vCanvas'),
      dataObj = chart.getFromEnv('dataSource'),
      dataset = dataObj.dataset,
      showCumulativeLine = (0, _lib.pluckNumber)(chartAttr.showcumulativeline, 1),
      data = dataObj.data || dataset && dataset[0].data,
      DSClass,
      groupManager3d,
      datasetJSON;
  datasetJSON = {
    data: data
  };

  if (!(data && data.length !== 0)) {
    chart.setChartMessage();
    return;
  }

  DSClass = chart.getDSdef('column');

  if (chart.config.is3D) {
    (0, _lib.componentFactory)(datasetParent[0], _column3d.default, 'datasetGroup_column');
    groupManager3d = datasetParent[0].getChildren('datasetGroup_column')[0];
  }

  (0, _lib.datasetFactory)(groupManager3d || datasetParent[0], DSClass, 'dataset', 1, [datasetJSON]);

  if (showCumulativeLine) {
    DSClass = chart.getDSdef('line');
    (0, _lib.datasetFactory)(datasetParent[1], DSClass, 'dataset', 1, [datasetJSON], [1]);
  }
}

/***/ }),

/***/ 652:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



exports.__esModule = true;
exports["default"] = _default;

var _lib = __webpack_require__(274);

var TRUE_STRING = 'true',
    ONE_STRING = '1',

/**
  * Seggregates the original data to data and vline.
  * @param {Object} data  Original data used for seggregation.
  * @return {Object}  JSON data to be used further by the child components, e.g. dataSet.
 */
_dataSegregator = function _dataSegregator(data) {
  var dataOnlyArr = [];
  (0, _lib.fcEach)(data, function (datum) {
    if (!(datum.vline === TRUE_STRING || datum.vline === true || datum.vline === 1 || datum.vline === ONE_STRING)) {
      dataOnlyArr.push(datum);
    }
  });
  return {
    catData: [],
    data: dataOnlyArr
  };
};
/**
 * function to  create dataset.
 * assign dataset to vCanvas.
 * @param {Object} chart chart API
 **/


function _default(chart) {
  var dataObj = chart.getFromEnv('dataSource'),
      dataset = dataObj.dataset,
      data = dataObj.data || dataset && dataset[0].data,
      DSClass,
      datasetJSON;
  datasetJSON = _dataSegregator(data);

  if (!(data && data.length !== 0)) {
    chart.setChartMessage();
    return;
  }

  DSClass = chart.getDSdef();
  (0, _lib.datasetFactory)(chart, DSClass, 'dataset', 1, [datasetJSON]);
}

/***/ }),

/***/ 608:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = _default;

var _lib = __webpack_require__(274);

var _column3d = _interopRequireDefault(__webpack_require__(609));

var TRUE_STRING = 'true',
    ONE_STRING = '1',

/**
 * Filters data
 * @param {Array} data user input data
 * @return {Object} filtered data array
 */
_dataSegregator = function _dataSegregator(data) {
  var dataOnlyArr = [];
  (0, _lib.fcEach)(data, function (datum) {
    if (!(datum.vline === TRUE_STRING || datum.vline === true || datum.vline === 1 || datum.vline === ONE_STRING)) {
      dataOnlyArr.push(datum);
    }
  });
  return {
    data: dataOnlyArr
  };
};
/**
 * Create dataset for 3d charts
 * @param {Object} chart Chart API
 */


function _default(chart) {
  var children = chart.getChildren(),
      canvas = children.canvas[0],
      datasetParent = canvas.getChildren('vCanvas')[0],
      dataObj = chart.getFromEnv('dataSource'),
      dataset = dataObj.dataset,
      dsType = chart.config.defaultDatasetType || '',
      data = dataObj.data || dataset && dataset[0].data,
      DSClass,
      datasetJSON,
      groupManager3d;
  datasetJSON = _dataSegregator(data);

  if (!(data && data.length !== 0)) {
    chart.setChartMessage();
    return;
  }

  (0, _lib.componentFactory)(datasetParent, _column3d.default, 'datasetGroup_' + dsType);
  groupManager3d = datasetParent.getChildren('datasetGroup_' + dsType)[0];
  DSClass = chart.getDSdef();
  (0, _lib.datasetFactory)(groupManager3d, DSClass, 'dataset', 1, [datasetJSON]);
}

/***/ }),

/***/ 607:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



exports.__esModule = true;
exports["default"] = _default;

var _lib = __webpack_require__(274);

function _default(R) {
  var UNDEF,
      math = Math,
      mathAtan2 = math.atan2,
      NONE = 'none',
      FILL = 'fill',
      PATH = 'path',
      CUBEPATH = 'cubepath';
  R.define && R.define([{
    name: 'cubepath',
    // args: [x, y, w, h, zw, zh]
    cubepath: function cubepath() {
      var paper = this,
          shapeDefaultAttrs = {
        'stroke-linejoin': 'round',
        'shape-rendering': 'precision',
        'stroke': NONE
      },
          args = arguments,
          lastArg = args.length - 1,
          group = args[lastArg],
          top,
          side,
          a,
          face,
          generateCubepath = function generateCubepath(_x, _y, _w, _h, _zw, _zh) {
        var o = this,
            t = o._.cubetop,
            s = o._.cubeside,
            x = _x,
            y = _y,
            w = _w,
            h = _h,
            zw = _zw,
            zh = _zh;

        if (typeof x === 'object' || x === UNDEF && y === UNDEF && w === UNDEF && h === UNDEF && zw === UNDEF && zh === UNDEF) {
          return this;
        }

        x = (0, _lib.pluckNumber)(x, o.attrs.x, 0);
        y = (0, _lib.pluckNumber)(y, o.attrs.y, 0);
        w = (0, _lib.pluckNumber)(w, o.attrs.width, 0);
        h = (0, _lib.pluckNumber)(h, o.attrs.height, 0);
        zw = (0, _lib.pluckNumber)(zw, o.attrs.xDepth, 0);
        zh = (0, _lib.pluckNumber)(zh, o.attrs.yDepth, 0);
        o.attrs.x = x;
        o.attrs.y = y;
        o.attrs.width = w;
        o.attrs.height = h;
        o.attrs.xDepth = zw;
        o.attrs.yDepth = zh;
        /* The issue of pixel wide gap found between adjacent faces when input params
                    * are not all intezers, is solved by adding extra portion in top and side faces.
                    * The side face is extended to the left with a pixel wide rectange, whole top
                    * end is cut diagonally to avoid overlapping stoke effect. Like wise, the top face
                    * is extended below with a pixel height rectangle whose left end is cut diagonally for
                    * the same rason as above. Motive was to keep the bounding box intact as intended.
                    */

        o._attr(PATH, ['M', x + w, y, 'l', 0, h, -w, 0, 0, -h, 'z']);

        t.attr(PATH, ['M', x, y, 'l', 1, 1, w - 1, 0, 0, -1, zw, -zh, -w, 0, 'z']);
        s.attr(PATH, ['M', x + w - 1, y + 1, 'l', 0, h - 1, 1, 0, zw, -zh, 0, -h, -zw, zh]);
        return this;
      },
          dropShadow = function dropShadow(dx, dy, spread, color) {
        var o = this,
            topShadow = o._.cubetop,
            sideShadow = o._.cubeside; // Only allow filter based shadow.

        if (o.dropshadow) {
          topShadow.dropshadow(dx, -dy, spread, color);
          sideShadow.dropshadow(dx, -dy, spread, color);
        }

        return false;
      };

      group && group.constructor === R.el.constructor ? args[lastArg] = UNDEF : group = UNDEF;
      top = paper.path(shapeDefaultAttrs, group);
      side = paper.path(shapeDefaultAttrs, group);
      face = paper.path(shapeDefaultAttrs, group);
      face._.cubetop = top.follow(face, UNDEF, 'before');
      face._.cubeside = side.follow(face, UNDEF, 'before');

      for (a in R.fn.cubepath.ca) {
        face.ca[a] = R.fn.cubepath.ca[a];
      }

      face._attr = face.attr;
      face._shadow = face.shadow;

      face.attr = function (name, _value) {
        var isObject = typeof name === 'object',
            value = _value;

        if (isObject) {
          // When cubepath is given as an array of inputs
          if (name.cubepath) {
            value = [].concat(name.cubepath);
          } else {
            value = [];
            value.push(name.x);
            value.push(name.y);
            value.push(name.width);
            value.push(name.height);
            value.push(name.xDepth);
            value.push(name.yDepth);
          }

          if (name.noGradient !== UNDEF) {
            face.attrs.noGradient = name.noGradient;
          }
        }

        if (name === UNDEF && value === UNDEF) {
          return this.attrs;
        } else if (value === UNDEF) {
          return this.attrs[name];
        }

        if (isObject) {
          generateCubepath.apply(this, value);
        } else if (name === 'drop-shadow') {
          dropShadow.apply(this, [].concat(value));
        }

        face._attr(name);

        return this;
      };

      face.appendTo = function (_group) {
        _group.appendChild(face._.cubetop);

        _group.appendChild(face._.cubeside);

        _group.appendChild(face);
      };

      if (typeof args[0] === 'object') {
        return face.attr(args[0]);
      } // return face.attr(CUBEPATH, [args[0], args[1], args[2], args[3], args[4], args[5]]);


      return generateCubepath.apply(face, [args[0], args[1], args[2], args[3], args[4], args[5]]);
    },
    fn: {
      // Return the bounding box of the back face of the 3D shape.
      // This is an internal function, which is not implemented to the complete level, as such
      // there is no proper definition the function is supposed to do, hence it is prefixed with
      // an '_' and named as _getBBox2
      _getBBox2: function _getBBox2() {
        var shape = this,
            sideBox = shape._.cubeside.getBBox(),
            topBox = shape._.cubetop.getBBox(),
            bbox = shape.getBBox(); // Calculate the backface bbox like object consisting of x,y width, height
        // using the sideBox,topBox,bBox


        return {
          x: bbox.x + topBox.height,
          y: bbox.y - sideBox.width,
          width: bbox.width,
          height: bbox.height
        };
      },
      shadow: function shadow() {
        this._.cubeside.shadow.apply(this._.cubeside, arguments);

        this._.cubetop.shadow.apply(this._.cubetop, arguments);

        return this._shadow.apply(this, arguments);
      }
    },
    ca: {
      'stroke-linejoin': function strokeLinejoin() {
        // We force the linejoin to always be round. Otherwise, the cube
        // edges will look horrible.
        return {
          'stroke-linejoin': 'round'
        };
      },
      'fill': function fill(_color, _nogradient) {
        var o = this,
            top = o._.cubetop,
            side = o._.cubeside,
            attr = o._attr(CUBEPATH) || [0, 0, 0, 0, 0, 0],
            color = _color,
            nogradient = _nogradient,
            width = attr[2],
            zw = attr[4],
            zh = attr[5],
            rgba;

        if (nogradient === UNDEF) {
          nogradient = o._attr('noGradient');
        }

        color = R.color(color);
        /*
          As the join method internally calls toString(), but is overwritten in this object
          so, an extracted string it sent to it
        */

        if (typeof color === 'object') {
          color = rgba = 'opacity' in color ? 'rgba(' + [color.r, color.g, color.b, color.opacity] + ')' : 'rgb(' + [color.r, color.g, color.b] + ')';
        }

        if (nogradient) {
          o._attr(FILL, color);

          top.attr(FILL, R.tintshade(color, -0.78).rgba);
          side.attr(FILL, R.tintshade(color, -0.65).rgba);
        } else {
          // Since the color has been already calculated in object form,
          // we manually recalculate the rgba here since re-sending object
          // to Raphael's tintshade can cause it to return stale result
          // from its cache.
          o._attr(FILL, [270, R.tintshade(rgba, 0.55).rgba, R.tintshade(rgba, -0.65).rgba].join('-'));

          side.attr(FILL, [270, R.tintshade(rgba, -0.75).rgba, R.tintshade(rgba, -0.35).rgba].join('-'));
          top.attr(FILL, [45 + R.deg(mathAtan2(zh, zw + width)), R.tintshade(rgba, -0.78).rgba, R.tintshade(rgba, 0.22).rgba].join('-'));
          /**
                     * @note
                    // This is the gradient calculation mapping that accounts for
                    // the skew of the top face.
                    o.attr(FILL, [285, R.tintshade(rgba, .55).rgba,
                        R.tintshade(rgba, -.65).rgba].join('-'));
                    side.attr(FILL, [50 + R.deg(mathAtan2(height + zh, zw)),
                        R.tintshade(rgba, -.45).rgba,
                        R.tintshade(rgba, -.75).rgba].join('-'));
                    top.attr(FILL, [R.deg(mathAtan2(zh, zw + width)),
                        R.tintshade(rgba, -.85).rgba,
                        R.tintshade(rgba, .35).rgba].join('-'));
                    */
        } // We return false so that the attribute is not applied to the
        // composite shape's leading element (the front face.)


        return false;
      }
    }
  }]);
}

/***/ }),

/***/ 514:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _column2d = _interopRequireDefault(__webpack_require__(515));

exports.Column2D = _column2d.default;

var _column3d = _interopRequireDefault(__webpack_require__(601));

exports.Column3D = _column3d.default;

var _line = _interopRequireDefault(__webpack_require__(614));

exports.Line = _line.default;

var _area2d = _interopRequireDefault(__webpack_require__(620));

exports.Area = _area2d.default;

var _bar2d = _interopRequireDefault(__webpack_require__(622));

exports.Bar2D = _bar2d.default;

var _bar3d = _interopRequireDefault(__webpack_require__(642));

exports.Bar3D = _bar3d.default;

var _pie2d = _interopRequireDefault(__webpack_require__(647));

exports.Pie2D = _pie2d.default;

var _pie3d = _interopRequireDefault(__webpack_require__(653));

exports.Pie3D = _pie3d.default;

var _doughnut2d = _interopRequireDefault(__webpack_require__(660));

exports.Doughnut2D = _doughnut2d.default;

var _doughnut3d = _interopRequireDefault(__webpack_require__(662));

exports.Doughnut3D = _doughnut3d.default;

var _pareto2d = _interopRequireDefault(__webpack_require__(666));

exports.Pareto2D = _pareto2d.default;

var _pareto3d = _interopRequireDefault(__webpack_require__(677));

exports.Pareto3D = _pareto3d.default;

var _scrollcombidy2d = _interopRequireDefault(__webpack_require__(680));

exports.ScrollCombiDy2D = _scrollcombidy2d.default;

var _scrollcombi2d = _interopRequireDefault(__webpack_require__(691));

exports.ScrollCombi2D = _scrollcombi2d.default;

var _scrollstackedcolumn2d = _interopRequireDefault(__webpack_require__(696));

exports.ScrollStackedColumn2D = _scrollstackedcolumn2d.default;

var _scrollmsstackedcolumn2d = _interopRequireDefault(__webpack_require__(700));

exports.ScrollMSStackedColumn2D = _scrollmsstackedcolumn2d.default;

var _scrollmsstackedcolumn2dlinedy = _interopRequireDefault(__webpack_require__(704));

exports.ScrollMSStackedColumn2dLineDY = _scrollmsstackedcolumn2dlinedy.default;

var _scrollstackedbar2d = _interopRequireDefault(__webpack_require__(708));

exports.ScrollStackedBar2D = _scrollstackedbar2d.default;

var _scrollarea2d = _interopRequireDefault(__webpack_require__(711));

exports.ScrollArea2D = _scrollarea2d.default;

var _scrollline2d = _interopRequireDefault(__webpack_require__(712));

exports.ScrollLine2D = _scrollline2d.default;

var _scrollcolumn2d = _interopRequireDefault(__webpack_require__(714));

exports.ScrollColumn2D = _scrollcolumn2d.default;

var _scrollbar2d = _interopRequireDefault(__webpack_require__(715));

exports.ScrollBar2D = _scrollbar2d.default;

var _bubble = _interopRequireDefault(__webpack_require__(716));

exports.Bubble = _bubble.default;

var _scatter = _interopRequireDefault(__webpack_require__(730));

exports.Scatter = _scatter.default;

var _msstackedcolumn2d = _interopRequireDefault(__webpack_require__(731));

exports.MSStackedColumn2D = _msstackedcolumn2d.default;

var _msstackedbar2d = _interopRequireDefault(__webpack_require__(732));

exports.MSStackedBar2D = _msstackedbar2d.default;

var _stackedarea2d = _interopRequireDefault(__webpack_require__(737));

exports.StackedArea2D = _stackedarea2d.default;

var _stackedbar3d = _interopRequireDefault(__webpack_require__(741));

exports.StackedBar3D = _stackedbar3d.default;

var _stackedbar2d = _interopRequireDefault(__webpack_require__(746));

exports.StackedBar2D = _stackedbar2d.default;

var _stackedcolumn3d = _interopRequireDefault(__webpack_require__(748));

exports.StackedColumn3D = _stackedcolumn3d.default;

var _stackedcolumn2d = _interopRequireDefault(__webpack_require__(752));

exports.StackedColumn2D = _stackedcolumn2d.default;

var _msstackedcolumn2dlinedy = _interopRequireDefault(__webpack_require__(754));

exports.MSStackedColumn2DLineDy = _msstackedcolumn2dlinedy.default;

var _stackedcolumn3dlinedy = _interopRequireDefault(__webpack_require__(755));

exports.StackedColumn3DLineDy = _stackedcolumn3dlinedy.default;

var _mscolumn3dlinedy = _interopRequireDefault(__webpack_require__(760));

exports.MSColumn3DLineDy = _mscolumn3dlinedy.default;

var _mscombidy2d = _interopRequireDefault(__webpack_require__(761));

exports.MSCombidy2D = _mscombidy2d.default;

var _mscombidy3d = _interopRequireDefault(__webpack_require__(762));

exports.MSCombidy3D = _mscombidy3d.default;

var _stackedcolumn3dline = _interopRequireDefault(__webpack_require__(764));

exports.StackedColumn3DLine = _stackedcolumn3dline.default;

var _stackedcolumn2dline = _interopRequireDefault(__webpack_require__(767));

exports.StackedColumn2DLine = _stackedcolumn2dline.default;

var _mscolumnline3d = _interopRequireDefault(__webpack_require__(770));

exports.MSColumnLine3D = _mscolumnline3d.default;

var _mscombi3d = _interopRequireDefault(__webpack_require__(772));

exports.MSCombi3D = _mscombi3d.default;

var _mscombi2d = _interopRequireDefault(__webpack_require__(773));

exports.MSCombi2D = _mscombi2d.default;

var _marimekko = _interopRequireDefault(__webpack_require__(774));

exports.Marimekko = _marimekko.default;

var _msarea = _interopRequireDefault(__webpack_require__(779));

exports.MSArea = _msarea.default;

var _msbar3d = _interopRequireDefault(__webpack_require__(780));

exports.MSBar3D = _msbar3d.default;

var _msbar2d = _interopRequireDefault(__webpack_require__(781));

exports.MSBar2D = _msbar2d.default;

var _msline = _interopRequireDefault(__webpack_require__(782));

exports.MSLine = _msline.default;

var _mscolumn3d = _interopRequireDefault(__webpack_require__(784));

exports.MSColumn3D = _mscolumn3d.default;

var _mscolumn2d = _interopRequireDefault(__webpack_require__(785));

exports.MSColumn2D = _mscolumn2d.default;

var _spline = _interopRequireDefault(__webpack_require__(786));

exports.Spline = _spline.default;

var _splinearea = _interopRequireDefault(__webpack_require__(789));

exports.Splinearea = _splinearea.default;

var _msspline = _interopRequireDefault(__webpack_require__(791));

exports.Msspline = _msspline.default;

var _mssplinedy = _interopRequireDefault(__webpack_require__(794));

exports.MSSplineDy = _mssplinedy.default;

var _mssplinearea = _interopRequireDefault(__webpack_require__(796));

exports.Mssplinearea = _mssplinearea.default;

var _stackedcolumn2dlinedy = _interopRequireDefault(__webpack_require__(798));

exports.StackedColumn2DLineDy = _stackedcolumn2dlinedy.default;

var _stackedarea2dlinedy = _interopRequireDefault(__webpack_require__(800));

exports.StackedArea2DLineDy = _stackedarea2dlinedy.default;
var _default = {
  name: 'charts',
  type: 'package',
  requiresFusionCharts: true,
  extension: function extension(FusionCharts) {
    FusionCharts.addDep(_column2d.default);
    FusionCharts.addDep(_column3d.default);
    FusionCharts.addDep(_line.default);
    FusionCharts.addDep(_area2d.default);
    FusionCharts.addDep(_bar2d.default);
    FusionCharts.addDep(_bar3d.default);
    FusionCharts.addDep(_pie2d.default);
    FusionCharts.addDep(_pie3d.default);
    FusionCharts.addDep(_doughnut2d.default);
    FusionCharts.addDep(_doughnut3d.default);
    FusionCharts.addDep(_pareto2d.default);
    FusionCharts.addDep(_pareto3d.default);
    FusionCharts.addDep(_scrollcombidy2d.default);
    FusionCharts.addDep(_scrollcombi2d.default);
    FusionCharts.addDep(_scrollstackedcolumn2d.default);
    FusionCharts.addDep(_scrollmsstackedcolumn2d.default);
    FusionCharts.addDep(_scrollmsstackedcolumn2dlinedy.default);
    FusionCharts.addDep(_scrollstackedbar2d.default);
    FusionCharts.addDep(_scrollarea2d.default);
    FusionCharts.addDep(_scrollline2d.default);
    FusionCharts.addDep(_scrollcolumn2d.default);
    FusionCharts.addDep(_scrollbar2d.default);
    FusionCharts.addDep(_bubble.default); // FusionCharts.addDep(ZoomScatter);

    FusionCharts.addDep(_scatter.default);
    FusionCharts.addDep(_msstackedcolumn2d.default);
    FusionCharts.addDep(_msstackedbar2d.default);
    FusionCharts.addDep(_stackedarea2d.default);
    FusionCharts.addDep(_stackedbar3d.default);
    FusionCharts.addDep(_stackedbar2d.default);
    FusionCharts.addDep(_stackedcolumn3d.default);
    FusionCharts.addDep(_stackedcolumn2d.default);
    FusionCharts.addDep(_msstackedcolumn2dlinedy.default);
    FusionCharts.addDep(_stackedcolumn3dlinedy.default);
    FusionCharts.addDep(_stackedcolumn2dlinedy.default);
    FusionCharts.addDep(_stackedarea2dlinedy.default);
    FusionCharts.addDep(_mscolumn3dlinedy.default);
    FusionCharts.addDep(_mscombidy2d.default);
    FusionCharts.addDep(_mscombidy3d.default);
    FusionCharts.addDep(_stackedcolumn3dline.default);
    FusionCharts.addDep(_stackedcolumn2dline.default);
    FusionCharts.addDep(_mscolumnline3d.default);
    FusionCharts.addDep(_mscombi3d.default);
    FusionCharts.addDep(_mscombi2d.default);
    FusionCharts.addDep(_marimekko.default);
    FusionCharts.addDep(_msarea.default);
    FusionCharts.addDep(_msbar3d.default);
    FusionCharts.addDep(_msbar2d.default);
    FusionCharts.addDep(_msline.default);
    FusionCharts.addDep(_mscolumn3d.default);
    FusionCharts.addDep(_mscolumn2d.default);
    FusionCharts.addDep(_spline.default);
    FusionCharts.addDep(_splinearea.default);
    FusionCharts.addDep(_mssplinedy.default);
    FusionCharts.addDep(_msspline.default);
    FusionCharts.addDep(_mssplinearea.default);
  }
};
exports["default"] = _default;

/***/ }),

/***/ 620:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _area2d = _interopRequireDefault(__webpack_require__(621));

var _default = _area2d.default;
exports["default"] = _default;

/***/ }),

/***/ 622:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _bar2d = _interopRequireDefault(__webpack_require__(623));

var _default = _bar2d.default;
exports["default"] = _default;

/***/ }),

/***/ 642:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _bar3d = _interopRequireDefault(__webpack_require__(643));

var _default = _bar3d.default;
exports["default"] = _default;

/***/ }),

/***/ 716:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _bubble = _interopRequireDefault(__webpack_require__(717));

var _default = _bubble.default;
exports["default"] = _default;

/***/ }),

/***/ 515:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _column2d = _interopRequireDefault(__webpack_require__(516));

var _default = _column2d.default;
exports["default"] = _default;

/***/ }),

/***/ 601:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _column3d = _interopRequireDefault(__webpack_require__(602));

var _default = _column3d.default;
exports["default"] = _default;

/***/ }),

/***/ 660:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _doughnut2d = _interopRequireDefault(__webpack_require__(661));

var _default = _doughnut2d.default;
exports["default"] = _default;

/***/ }),

/***/ 662:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _doughnut3d = _interopRequireDefault(__webpack_require__(663));

var _default = _doughnut3d.default;
exports["default"] = _default;

/***/ }),

/***/ 614:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _line = _interopRequireDefault(__webpack_require__(615));

var _default = _line.default;
exports["default"] = _default;

/***/ }),

/***/ 774:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _marimekko = _interopRequireDefault(__webpack_require__(775));

var _default = _marimekko.default;
exports["default"] = _default;

/***/ }),

/***/ 779:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _msarea = _interopRequireDefault(__webpack_require__(739));

var _default = _msarea.default;
exports["default"] = _default;

/***/ }),

/***/ 781:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _msbar2d = _interopRequireDefault(__webpack_require__(734));

var _default = _msbar2d.default;
exports["default"] = _default;

/***/ }),

/***/ 780:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _msbar3d = _interopRequireDefault(__webpack_require__(743));

var _default = _msbar3d.default;
exports["default"] = _default;

/***/ }),

/***/ 785:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _mscolumn2d = _interopRequireDefault(__webpack_require__(695));

var _default = _mscolumn2d.default;
exports["default"] = _default;

/***/ }),

/***/ 784:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _mscolumn3d = _interopRequireDefault(__webpack_require__(750));

var _default = _mscolumn3d.default;
exports["default"] = _default;

/***/ }),

/***/ 760:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _mscolumn3dlinedy = _interopRequireDefault(__webpack_require__(757));

var _default = _mscolumn3dlinedy.default;
exports["default"] = _default;

/***/ }),

/***/ 770:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _mscolumnline3d = _interopRequireDefault(__webpack_require__(771));

var _default = _mscolumnline3d.default;
exports["default"] = _default;

/***/ }),

/***/ 773:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _mscombi2d = _interopRequireDefault(__webpack_require__(769));

var _default = _mscombi2d.default;
exports["default"] = _default;

/***/ }),

/***/ 772:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _mscombi3d = _interopRequireDefault(__webpack_require__(766));

var _default = _mscombi3d.default;
exports["default"] = _default;

/***/ }),

/***/ 761:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _mscombidy2d = _interopRequireDefault(__webpack_require__(682));

var _default = _mscombidy2d.default;
exports["default"] = _default;

/***/ }),

/***/ 762:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _mscombidy3d = _interopRequireDefault(__webpack_require__(763));

var _default = _mscombidy3d.default;
exports["default"] = _default;

/***/ }),

/***/ 782:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _msline = _interopRequireDefault(__webpack_require__(783));

var _default = _msline.default;
exports["default"] = _default;

/***/ }),

/***/ 732:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _msstackedbar2d = _interopRequireDefault(__webpack_require__(733));

var _default = _msstackedbar2d.default;
exports["default"] = _default;

/***/ }),

/***/ 731:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _msstackedcolumn2d = _interopRequireDefault(__webpack_require__(702));

var _default = _msstackedcolumn2d.default;
exports["default"] = _default;

/***/ }),

/***/ 754:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _msstackedcolumn2dlinedy = _interopRequireDefault(__webpack_require__(706));

var _default = _msstackedcolumn2dlinedy.default;
exports["default"] = _default;

/***/ }),

/***/ 666:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _pareto2d = _interopRequireDefault(__webpack_require__(667));

var _default = _pareto2d.default;
exports["default"] = _default;

/***/ }),

/***/ 677:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _pareto3d = _interopRequireDefault(__webpack_require__(678));

var _default = _pareto3d.default;
exports["default"] = _default;

/***/ }),

/***/ 647:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _pie2d = _interopRequireDefault(__webpack_require__(648));

var _default = _pie2d.default;
exports["default"] = _default;

/***/ }),

/***/ 653:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _pie3d = _interopRequireDefault(__webpack_require__(654));

var _default = _pie3d.default;
exports["default"] = _default;

/***/ }),

/***/ 730:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _scatter = _interopRequireDefault(__webpack_require__(718));

var _default = _scatter.default;
exports["default"] = _default;

/***/ }),

/***/ 711:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _scrollarea2d = _interopRequireDefault(__webpack_require__(693));

var _default = _scrollarea2d.default;
exports["default"] = _default;

/***/ }),

/***/ 715:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _scrollbar2d = _interopRequireDefault(__webpack_require__(710));

var _default = _scrollbar2d.default;
exports["default"] = _default;

/***/ }),

/***/ 714:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _scrollcolumn2d = _interopRequireDefault(__webpack_require__(694));

var _default = _scrollcolumn2d.default;
exports["default"] = _default;

/***/ }),

/***/ 691:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _scrollcombi2d = _interopRequireDefault(__webpack_require__(692));

var _default = _scrollcombi2d.default;
exports["default"] = _default;

/***/ }),

/***/ 680:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _scrollcombidy2d = _interopRequireDefault(__webpack_require__(681));

var _default = _scrollcombidy2d.default;
exports["default"] = _default;

/***/ }),

/***/ 712:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _scrollline2d = _interopRequireDefault(__webpack_require__(713));

var _default = _scrollline2d.default;
exports["default"] = _default;

/***/ }),

/***/ 700:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _scrollmsstackedcolumn2d = _interopRequireDefault(__webpack_require__(701));

var _default = _scrollmsstackedcolumn2d.default;
exports["default"] = _default;

/***/ }),

/***/ 704:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _scrollmsstackedcolumn2dlinedy = _interopRequireDefault(__webpack_require__(705));

var _default = _scrollmsstackedcolumn2dlinedy.default;
exports["default"] = _default;

/***/ }),

/***/ 708:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _scrollstackedbar2d = _interopRequireDefault(__webpack_require__(709));

var _default = _scrollstackedbar2d.default;
exports["default"] = _default;

/***/ }),

/***/ 696:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _scrollstackedcolumn2d = _interopRequireDefault(__webpack_require__(697));

var _default = _scrollstackedcolumn2d.default;
exports["default"] = _default;

/***/ }),

/***/ 737:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _stackedarea2d = _interopRequireDefault(__webpack_require__(738));

var _default = _stackedarea2d.default;
exports["default"] = _default;

/***/ }),

/***/ 800:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _stackedarea2dlinedy = _interopRequireDefault(__webpack_require__(801));

var _default = _stackedarea2dlinedy.default;
exports["default"] = _default;

/***/ }),

/***/ 746:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _stackedbar2d = _interopRequireDefault(__webpack_require__(747));

var _default = _stackedbar2d.default;
exports["default"] = _default;

/***/ }),

/***/ 741:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _stackedbar3d = _interopRequireDefault(__webpack_require__(742));

var _default = _stackedbar3d.default;
exports["default"] = _default;

/***/ }),

/***/ 752:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _stackedcolumn2d = _interopRequireDefault(__webpack_require__(753));

var _default = _stackedcolumn2d.default;
exports["default"] = _default;

/***/ }),

/***/ 767:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _stackedcolumn2dline = _interopRequireDefault(__webpack_require__(768));

var _default = _stackedcolumn2dline.default;
exports["default"] = _default;

/***/ }),

/***/ 798:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _stackedcolumn2dlinedy = _interopRequireDefault(__webpack_require__(799));

var _default = _stackedcolumn2dlinedy.default;
exports["default"] = _default;

/***/ }),

/***/ 748:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _stackedcolumn3d = _interopRequireDefault(__webpack_require__(749));

var _default = _stackedcolumn3d.default;
exports["default"] = _default;

/***/ }),

/***/ 764:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _stackedcolumn3dline = _interopRequireDefault(__webpack_require__(765));

var _default = _stackedcolumn3dline.default;
exports["default"] = _default;

/***/ }),

/***/ 755:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _stackedcolumn3dlinedy = _interopRequireDefault(__webpack_require__(756));

var _default = _stackedcolumn3dlinedy.default;
exports["default"] = _default;

/***/ })

}]);
}));

//# sourceMappingURL=http://localhost:3052/4.1.0-beta.1/map/eval/fusioncharts.charts.js.map