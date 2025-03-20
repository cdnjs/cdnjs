
(function (factory) {
  if (typeof module === 'object' && typeof module.exports !== "undefined") {
      module.exports = factory;
  } else {
      factory();
  }
}(function () {
"use strict";
(self["webpackChunkFusionCharts"] = self["webpackChunkFusionCharts"] || []).push([[6],{

/***/ 1646:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _mscartesian = _interopRequireDefault(__webpack_require__(626));

var _componentInterface = __webpack_require__(290);

var defaultPaletteOption = _interopRequireWildcard(__webpack_require__(532));

var _domEvent = _interopRequireDefault(__webpack_require__(276));

var _eventApi = __webpack_require__(281);

var _lib = __webpack_require__(274);

var _mapsDataset = _interopRequireDefault(__webpack_require__(1647));

var _canvas = _interopRequireDefault(__webpack_require__(521));

var _colorrange = _interopRequireDefault(__webpack_require__(1444));

var _legendmanager = _interopRequireDefault(__webpack_require__(1448));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var defaultPaletteOptions = (0, _lib.extend2)({
  foregroundcolor: '333333',
  foregroundalpha: '100',
  foregrounddarkcolor: '111111',
  foregrounddarkalpha: '100',
  foregroundlightcolor: '666666',
  foregroundlightalpha: '100',
  backgroundlightcolor: 'FFFFFF',
  backgroundlightalpha: '100',
  backgroundlightangle: 90,
  backgroundlightratio: '',
  backgroundcolor: 'FFFFCC',
  backgroundalpha: '100',
  backgrounddarkcolor: 'ffcc66',
  backgrounddarkalpha: '100',
  backgrounddarkangle: 270,
  backgrounddarkratio: '',
  shadow: 1
}, defaultPaletteOption),
    zeroCommaHundredStr = '0,100',
    MAP_STR = 'Map',
    MAPS_STR = 'maps',
    GEO_STR = 'geo',
    RIGHT_STR = 'right',
    colorPaletteMapGlobal = {
  basefontcolor: 'foregroundcolor',
  bordercolor: 'foregrounddarkcolor',
  borderalpha: 'foregrounddarkalpha',
  bgcolor: 'backgroundlightcolor',
  bgalpha: 'backgroundlightalpha',
  bgangle: 'backgroundlightangle',
  bgratio: 'backgroundlightratio',
  canvasbordercolor: 'foregrounddarkcolor',
  canvasborderalpha: 'foregrounddarkalpha',
  canvasbgcolor: 'backgroundlightcolor',
  canvasbgalpha: 'backgroundlightalpha',
  canvasbgangle: 'backgroundlightangle',
  canvasbgratio: 'backgroundlightratio',
  tooltipbordercolor: 'foregrounddarkcolor',
  tooltipborderalpha: 'foregrounddarkalpha',
  tooltipbgcolor: 'backgroundlightcolor',
  tooltipbgalpha: 'backgroundlightalpha',
  tooltipfontcolor: 'foregroundcolor',
  legendbordercolor: 'foregrounddarkcolor',
  legendborderalpha: 'foregrounddarkalpha',
  markerbordercolor: 'foregroundlightcolor',
  markerborderalpha: 'foregroundlightalpha',
  markerfillcolor: 'backgrounddarkcolor',
  markerfillalpha: 'backgrounddarkalpha',
  markerfillangle: 'backgrounddarkangle',
  markerfillratio: 'backgrounddarkratio',
  plotfillcolor: 'backgroundcolor',
  plotfillalpha: 'backgroundalpha',
  plotfillangle: 'backgroundangle',
  plotfillratio: 'backgroundratio',
  plothoverfillcolor: 'backgrounddarkcolor',
  plothoverfillalpha: 'backgrounddarkalpha',
  plothoverfillangle: 'backgrounddarkangle',
  plothoverfillratio: 'backgrounddarkratio',
  plotbordercolor: 'foregroundcolor',
  plotborderalpha: 'foregroundalpha',
  shadow: 'shadow'
},
    eiMethodsGlobal = {
  getMapName: function getMapName() {
    var chart = this,
        iapi = chart.jsVars.instanceAPI,
        mapName = iapi.getName().toLowerCase();
    return mapName;
  },
  getEntityList: function getEntityList() {
    var chart = this,
        iapi = chart.jsVars.instanceAPI,
        datasets = iapi.getDatasets() || [],
        i,
        entities,
        dataset,
        len = datasets.length,
        entityList = [],
        data,
        entityObj,
        config,
        name;

    for (i = 0; i < len; i++) {
      dataset = datasets[i] || [];
      name = dataset.getName();

      if (name === 'entities') {
        entities = dataset;
        break;
      }
    }

    data = entities.components.data;
    len = data.length;

    for (i in data) {
      if (data.hasOwnProperty(i)) {
        entityObj = data[i] || {};
        config = entityObj.config || {};
        entityList.push({
          id: config.id,
          originalId: config.originalId || config.id,
          label: config.label,
          shortlabel: config.shortLabel,
          value: config.value,
          formattedValue: config.formattedValue,
          toolText: config.toolText
        });
      }
    }

    return entityList;
  },
  getMapAttribute: function getMapAttribute() {
    var chartObj = this;
    (0, _eventApi.raiseWarning)(this, '12061210581', 'run', 'JavaScriptRenderer~getMapAttribute()', 'Use of deprecated "getMapAttribute()". Replace with "getChartAttribute()".');
    return chartObj.getChartAttribute.apply(chartObj, arguments);
  },
  exportMap: function exportMap() {
    var chartObj = this;
    (0, _eventApi.raiseWarning)(this, '12061210581', 'run', 'JavaScriptRenderer~exportMap()', 'Use of deprecated "exportMap()". Replace with "exportChart()".');
    return chartObj.exportChart && chartObj.exportChart.apply(chartObj, arguments);
  },
  addMarker: function addMarker(options) {
    var iapi = this.jsVars.instanceAPI,
        datasets = iapi.getDatasets() || [],
        len = datasets.length,
        i,
        dataset,
        markers,
        name;

    for (i = 0; i < len; i++) {
      dataset = datasets[i] || [];
      name = dataset.getName();

      if (name === 'markers') {
        markers = dataset;
        break;
      }
    }

    if (markers && !markers.addMarkerItem(options)) {
      (0, _eventApi.raiseWarning)(this, '1309264086', 'run', 'MapsRenderer~addMarker()', 'Failed to add marker. Check the options and try again.');
    }
  },
  updateMarker: function updateMarker(id, options) {
    var iapi = this.jsVars.instanceAPI,
        datasets = iapi.getDatasets() || [],
        newId,
        len = datasets.length,
        i,
        dataset,
        markers,
        name;

    for (i = 0; i < len; i++) {
      dataset = datasets[i] || [];
      name = dataset.getName();

      if (name === 'markers') {
        markers = dataset;
        break;
      }
    }

    if (markers && id) {
      newId = (id + BLANK).toLowerCase();
      markers.updateMarkerItem(newId, options);
    }
  },
  removeMarker: function removeMarker(id) {
    var iapi = this.jsVars.instanceAPI,
        datasets = iapi.getDatasets() || [],
        len = datasets.length,
        newId,
        i,
        dataset,
        markers,
        name;

    for (i = 0; i < len; i++) {
      dataset = datasets[i] || [];
      name = dataset.getName();

      if (name === 'markers') {
        markers = dataset;
        break;
      }
    }

    if (id) {
      newId = (id + BLANK).toLowerCase();

      markers._removeMarkerItem(newId);
    }
  }
},
    UNDEF,
    DASH_DEF = 'none',
    // animDurations = {
//   click: 300,
//   hover: 300,
//   linkedScale: 1000,
//   legendTransition: 1000
// },
COMMASPACE = ', ',
    BLANK = '',
    POSITION_BOTTOM = 'bottom',
    SHAPE_CIRCLE = 'circle',
    math = window.Math,
    mathMin = math.min,
    mathMax = math.max,
    isWithinCanvas = function isWithinCanvas(e, chart) {
  var mousePos = (0, _lib.getMouseCoordinate)(chart.getFromEnv('chart-container'), e, chart),

  /* converts the original mouse event to a Fusion
        Charts event( that has chartX, chartY, pageX and pageY as its property) */
  chartX = mousePos.chartX,
      chartY = mousePos.chartY,
      chartConfig = chart.config,
      minX = chartConfig.canvasLeft,
      minY = chartConfig.canvasTop,
      maxX = chartConfig.canvasLeft + chartConfig.canvasWidth,
      maxY = chartConfig.canvasHeight + chartConfig.canvasTop; // default value of the flag.

  mousePos.insideCanvas = false; // store the original event as well

  mousePos.originalEvent = e; // return true if within the canvas

  if (chartX > minX && chartX < maxX && chartY > minY && chartY < maxY) {
    // set the flag to be TRUE if triggered within the canvas area.
    mousePos.insideCanvas = true;
  }

  return mousePos;
};
/**
 * Creates class ColorPalette for maps
 */


var ColorPalette = /*#__PURE__*/function (_ComponentInterface) {
  (0, _inheritsLoose2.default)(ColorPalette, _ComponentInterface);

  /**
   * Instantiate ColorPalette class
   * @param {Object} hash color properties map
   * @param {number} index color palette index
   */
  function ColorPalette(hash, index) {
    var _this;

    _this = _ComponentInterface.call(this) || this;
    _this.subpalette = _lib.BLANKSTRING;
    _this.key = _lib.BLANKSTRING;
    _this.index = index;
    var key;

    for (key in hash) {
      _this.subpalette = defaultPaletteOptions[hash[key]];
      _this[key] = _this.subpalette instanceof Array ? _this.subpalette[index] : _this.subpalette;
      _this.key = key;
    }

    return _this;
  }

  return ColorPalette;
}(_componentInterface.ComponentInterface);
/**
 * Creates Maps class
 */


var Maps = /*#__PURE__*/function (_MSCartesian) {
  (0, _inheritsLoose2.default)(Maps, _MSCartesian);

  /**
   * Instantiate Map class
   */
  function Maps() {
    var _this2;

    _this2 = _MSCartesian.call(this) || this; // this.name = GEO;

    _this2.friendlyName = MAP_STR;
    _this2.revision = 1;
    _this2.hasCanvas = true;
    _this2.standaloneInit = false; // this map cannot be displayed alone

    _this2.defaultDatasetType = MAPS_STR;
    _this2.defaultSeriesType = GEO_STR;
    _this2.fireGroupEvent = true;
    _this2.legendposition = RIGHT_STR;
    _this2.hasGradientLegend = true;
    _this2.isMap = true;
    _this2.defaultPaletteOptions = {
      // Store colors now
      paletteColors: [['A6A6A6', 'CCCCCC', 'E1E1E1', 'F0F0F0'], ['A7AA95', 'C4C6B7', 'DEDFD7', 'F2F2EE'], ['04C2E3', '66E7FD', '9CEFFE', 'CEF8FF'], ['FA9101', 'FEB654', 'FED7A0', 'FFEDD5'], ['FF2B60', 'FF6C92', 'FFB9CB', 'FFE8EE']],
      // Store other colors
      // ------------- For 2D Chart ---------------//
      // We're storing 5 combinations, as we've 5 defined palettes.
      bgColor: ['FFFFFF', 'CFD4BE,F3F5DD', 'C5DADD,EDFBFE', 'A86402,FDC16D', 'FF7CA0,FFD1DD'],
      bgAngle: [270, 270, 270, 270, 270],
      bgRatio: [zeroCommaHundredStr, zeroCommaHundredStr, zeroCommaHundredStr, zeroCommaHundredStr, zeroCommaHundredStr],
      bgAlpha: ['100', '60,50', '40,20', '20,10', '30,30'],
      toolTipBgColor: ['FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF'],
      toolTipBorderColor: ['545454', '545454', '415D6F', '845001', '68001B'],
      // Default font color should be #555555
      baseFontColor: ['555555', '60634E', '025B6A', 'A15E01', '68001B'],
      tickColor: ['333333', '60634E', '025B6A', 'A15E01', '68001B'],
      trendColor: ['545454', '60634E', '415D6F', '845001', '68001B'],
      plotFillColor: ['545454', '60634E', '415D6F', '845001', '68001B'],
      borderColor: ['767575', '545454', '415D6F', '845001', '68001B'],
      borderAlpha: [50, 50, 50, 50, 50]
    };
    _this2.colorPaletteMap = colorPaletteMapGlobal;
    _this2.eiMethods = eiMethodsGlobal; // decide and create legend after creating canvas

    _this2.registerFactory('legend', _legendmanager.default, ['canvas']);

    _this2.registerFactory('axis', _lib.stubFN, ['canvas']); // create color manager after creating legend-decider


    _this2.registerFactory('colormanager-decider', _colorrange.default, ['legend']);

    _this2.registerFactory('dataset', _mapsDataset.default, ['colormanager-decider']);

    _this2.registerFactory('canvas', _canvas.default);

    return _this2;
  }
  /**
   * function to check if the chart specific data is proper is not
   * this fn is define for specific chart types
   * @return {boolean} if JSON data is valid or not
   */


  var _proto = Maps.prototype;

  _proto._checkInvalidSpecificData = function _checkInvalidSpecificData() {
    // @temp - need to remove
    this.config.invalid = false;
    return false;
  }
  /**
   * parse defualt configuration of the chart
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSCartesian.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    !config.baseWidth && (config.baseWidth = 400);
    !config.baseHeight && (config.baseHeight = 300);
    !config.baseScaleFactor && (config.baseScaleFactor = 1);
  }
  /**
   * Returns the name of the component
   * @return {string} name of the component
   */
  ;

  Maps.getName = function getName() {
    return 'maps';
  }
  /**
   * Returns the type of the component
   * @return {string} type of the component
   */
  ;

  Maps.getType = function getType() {
    return 'chartAPI';
  }
  /**
   * Returns the name of the component
   * @return {string} name of the component
   */
  ;

  _proto.getName = function getName() {
    return this.config.name || 'GEO';
  }
  /**
   * Returns the type of the component
   * @return {string} type of the component
   */
  ;

  _proto.getType = function getType() {
    return 'chartAPI';
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
        colorPalette = iapi.getChildren('colorPalette') && iapi.getChildren('colorPalette')[0],
        chartAttrs;
    chartAttrs = dataObj.chart = dataObj.chart || dataObj.graph || dataObj.map || {};
    iapi.jsonData = dataObj;

    if (!colorPalette) {
      colorPalette = new ColorPalette(this.colorPaletteMap, (chartAttrs.palette > 0 && chartAttrs.palette < 6 ? chartAttrs.palette : (0, _lib.pluckNumber)(iapi.paletteIndex, 1)) - 1);
      iapi.attachChild(colorPalette, 'colorPalette');
    }

    iapi.config.skipCanvasDrawing = true;

    _MSCartesian.prototype.configureAttributes.call(this, dataObj);

    iapi._parseBackgroundCosmetics();
  }
  /**
   * Parse the chart attributes and store in chart's config
   * @param {Object} dataObj User input json
   */
  ;

  _proto.parseChartAttr = function parseChartAttr(dataObj) {
    var iapi = this,
        config,
        jsonData = iapi.jsonData,
        chartAttrs = jsonData.chart || jsonData.map,
        markerAttrs = jsonData.markers,
        // Select the color palette
    palette = new ColorPalette(this.colorPaletteMap, (chartAttrs.palette > 0 && chartAttrs.palette < 6 ? chartAttrs.palette : (0, _lib.pluckNumber)(iapi.paletteIndex, 1)) - 1),
        inCancolor,
        inCanFontFamily,
        inCanFontSize,
        style,
        entityBorderColor = (0, _lib.pluck)(chartAttrs.entitybordercolor, chartAttrs.bordercolor, palette.plotbordercolor),
        entityFillColor = (0, _lib.pluck)(chartAttrs.entityfillcolor, chartAttrs.fillcolor, palette.plotfillcolor),
        entityFillAlpha = (0, _lib.pluck)(chartAttrs.entityfillalpha, chartAttrs.fillalpha, palette.plotfillalpha),
        entityFillRatio = (0, _lib.pluck)(chartAttrs.entityfillratio, chartAttrs.fillratio, palette.plotfillratio),
        entityFillAngle = (0, _lib.pluck)(chartAttrs.entityfillangle, chartAttrs.fillangle, palette.plotfillangle),
        nullEntityColor = (0, _lib.pluck)(chartAttrs.nullentityfillcolor, chartAttrs.nullentitycolor, entityFillColor),
        markerDataEnabled = (0, _lib.pluckNumber)(chartAttrs.usevaluesformarkers, jsonData.markers && jsonData.markers.items && jsonData.markers.items.length, !(jsonData.markers && jsonData.markers.application && jsonData.markers.application.length && jsonData.markers.definition && jsonData.markers.definition.length));

    _MSCartesian.prototype.parseChartAttr.call(this, dataObj);

    config = iapi.config;
    config.origMarginTop = (0, _lib.pluckNumber)(chartAttrs.charttopmargin, chartAttrs.maptopmargin, 11);
    config.origMarginLeft = (0, _lib.pluckNumber)(chartAttrs.chartleftmargin, chartAttrs.mapleftmargin, 11);
    config.origMarginBottom = (0, _lib.pluckNumber)(chartAttrs.chartbottommargin, chartAttrs.mapbottommargin, 11);
    config.origMarginRight = (0, _lib.pluckNumber)(chartAttrs.chartrightmargin, chartAttrs.maprightmargin, 11);
    config.labelsOnTop = (0, _lib.pluckNumber)(chartAttrs.entitylabelsontop, 1);
    style = config.style;
    inCancolor = style.inCancolor;
    inCanFontFamily = style.inCanfontFamily;
    inCanFontSize = style.inCanfontSize;
    config.entityOpts = {
      baseScaleFactor: config.baseScaleFactor,
      dataLabels: {
        style: {
          fontFamily: inCanFontFamily,
          fontSize: inCanFontSize,
          lineHeight: style.inCanLineHeight,
          color: (0, _lib.pluck)(chartAttrs.entitylabelcolor, style.inCancolor),
          bgColor: (0, _lib.pluck)(chartAttrs.entitylabelbgcolor) || BLANK,
          borderColor: (0, _lib.pluck)(chartAttrs.entitylabelbordercolor) || BLANK
        }
      },
      fillColor: entityFillColor,
      fillAlpha: entityFillAlpha,
      fillRatio: entityFillRatio,
      fillAngle: entityFillAngle,
      borderColor: entityBorderColor,
      borderAlpha: (0, _lib.pluck)(chartAttrs.entityborderalpha, chartAttrs.borderalpha, iapi.borderAlpha, '100'),
      borderThickness: (0, _lib.pluckNumber)(chartAttrs.showentityborder, chartAttrs.showborder, 1) ? (0, _lib.pluckNumber)(chartAttrs.entityborderthickness, chartAttrs.borderthickness, 1) : 0,
      scaleBorder: (0, _lib.pluckNumber)(chartAttrs.scaleentityborder, chartAttrs.scaleborder, 0),
      hoverFillColor: (0, _lib.pluck)(chartAttrs.entityfillhovercolor, chartAttrs.hoverfillcolor, chartAttrs.hovercolor, palette.plothoverfillcolor),
      hoverFillAlpha: (0, _lib.pluck)(chartAttrs.entityfillhoveralpha, chartAttrs.hoverfillalpha, chartAttrs.hoveralpha, palette.plothoverfillalpha),
      hoverFillRatio: (0, _lib.pluck)(chartAttrs.entityfillhoverratio, chartAttrs.hoverfillratio, chartAttrs.hoverratio, palette.plothoverfillratio),
      hoverFillAngle: (0, _lib.pluck)(chartAttrs.entityfillhoverangle, chartAttrs.hoverfillangle, chartAttrs.hoverangle, palette.plothoverfillangle),
      hoverBorderThickness: (0, _lib.pluck)(chartAttrs.entityborderhoverthickness, chartAttrs.hoverborderthickness),
      hoverBorderColor: (0, _lib.pluck)(chartAttrs.entityborderhovercolor, entityBorderColor, palette.plotbordercolor),
      hoverBorderAlpha: (0, _lib.pluck)(chartAttrs.entityborderhoveralpha, palette.plotborderalpha),
      nullEntityColor: nullEntityColor,
      nullEntityAlpha: (0, _lib.pluck)(chartAttrs.nullentityfillalpha, chartAttrs.nullentityalpha, entityFillAlpha),
      nullEntityRatio: (0, _lib.pluck)(chartAttrs.nullentityfillratio, chartAttrs.nullentityratio, entityFillRatio),
      nullEntityAngle: (0, _lib.pluck)(chartAttrs.nullentityfillangle, chartAttrs.nullentityangle, entityFillAngle),
      connectorColor: (0, _lib.pluck)(chartAttrs.labelconnectorcolor, chartAttrs.connectorcolor, inCancolor),
      connectorAlpha: (0, _lib.pluck)(chartAttrs.labelconnectoralpha, chartAttrs.connectoralpha, '100'),
      connectorThickness: (0, _lib.pluckNumber)(chartAttrs.labelconnectorthickness, chartAttrs.borderthickness, 1),
      showHoverEffect: (0, _lib.pluckNumber)(chartAttrs.showentityhovereffect, chartAttrs.usehovercolor, chartAttrs.showhovereffect, 1),
      hoverOnNull: (0, _lib.pluckNumber)(chartAttrs.hoveronnull, chartAttrs.entityhoveronnull, 1),
      labelPadding: (0, _lib.pluckNumber)(chartAttrs.labelpadding, 5),
      showLabels: (0, _lib.pluckNumber)(chartAttrs.showlabels, 1),
      labelsOnTop: (0, _lib.pluckNumber)(chartAttrs.entitylabelsontop, 1),
      includeNameInLabels: (0, _lib.pluckNumber)(chartAttrs.includenameinlabels, 1),
      includeValueInLabels: (0, _lib.pluckNumber)(chartAttrs.includevalueinlabels, 0),
      useSNameInTooltip: (0, _lib.pluckNumber)(chartAttrs.usesnameintooltip, 0),
      useShortName: (0, _lib.pluckNumber)(chartAttrs.usesnameinlabels, 1),
      labelSepChar: (0, _lib.pluck)(chartAttrs.labelsepchar, COMMASPACE),
      showTooltip: (0, _lib.pluckNumber)(chartAttrs.showentitytooltip, chartAttrs.showtooltip, 1),
      tooltipSepChar: (0, _lib.pluck)(chartAttrs.tooltipsepchar, ', '),
      tooltext: chartAttrs.entitytooltext,
      hideNullEntities: (0, _lib.pluckNumber)(chartAttrs.hidenullentities, 0),
      showHiddenEntityBorder: (0, _lib.pluckNumber)(chartAttrs.showhiddenentityborder, 1),
      showNullEntityBorder: (0, _lib.pluckNumber)(chartAttrs.shownullentityborder, 1),
      hiddenEntityColor: (0, _lib.pluck)(chartAttrs.hiddenentitycolor, chartAttrs.hiddenentityfillcolor, chartAttrs.hiddenentityalpha || chartAttrs.hiddenentityfillalpha ? nullEntityColor : 'ffffff'),
      hiddenEntityAlpha: (0, _lib.pluck)(chartAttrs.hiddenentityalpha, chartAttrs.hiddenentityfillalpha, 0.001),
      shadow: (0, _lib.pluckNumber)(chartAttrs.showshadow, iapi.defaultPlotShadow, palette.shadow)
    };
    config.markerOpts = {
      dataLabels: {
        style: {
          fontFamily: (0, _lib.pluck)(chartAttrs.markerfont, inCanFontFamily),
          fontSize: (0, _lib.pluckNumber)(chartAttrs.markerfontsize, parseInt(inCanFontSize, 10)),
          fontColor: (0, _lib.pluck)(chartAttrs.markerlabelcolor, chartAttrs.markerfontcolor, inCancolor),
          labelBgColor: (0, _lib.pluck)(chartAttrs.markerlabelbgcolor) || BLANK,
          labelBorderColor: (0, _lib.pluck)(chartAttrs.markerlabelbordercolor) || BLANK
        }
      },
      showTooltip: (0, _lib.pluckNumber)(chartAttrs.showmarkertooltip, chartAttrs.showtooltip, 1),
      showLabels: (0, _lib.pluckNumber)(chartAttrs.showmarkerlabels, chartAttrs.showlabels, 1),
      showHoverEffect: (0, _lib.pluckNumber)(chartAttrs.showmarkerhovereffect, 1),
      labelPadding: (0, _lib.pluck)(chartAttrs.markerlabelpadding, '5'),
      labelWrapWidth: (0, _lib.pluckNumber)(chartAttrs.markerlabelwrapwidth, 0),
      labelWrapHeight: (0, _lib.pluckNumber)(chartAttrs.markerlabelwrapheight, 0),
      fillColor: (0, _lib.pluck)(chartAttrs.markerfillcolor, chartAttrs.markerbgcolor, palette.markerfillcolor),
      // has a legacy attr
      fillAlpha: (0, _lib.pluck)(chartAttrs.markerfillalpha, palette.markerfillalpha),
      fillAngle: (0, _lib.pluck)(chartAttrs.markerfillangle, palette.markerfillangle),
      fillRatio: (0, _lib.pluck)(chartAttrs.markerfillratio, palette.markerfillratio),
      fillPattern: (0, _lib.pluck)(chartAttrs.markerfillpattern, palette.markerbgpattern),
      hoverFillColor: chartAttrs.markerfillhovercolor,
      hoverFillAlpha: chartAttrs.markerfillhoveralpha,
      hoverFillRatio: chartAttrs.markerfillhoverratio,
      hoverFillAngle: chartAttrs.markerfillhoverangle,
      borderThickness: (0, _lib.pluck)(chartAttrs.markerborderthickness, 1),
      borderColor: (0, _lib.pluck)(chartAttrs.markerbordercolor, palette.markerbordercolor),
      borderAlpha: (0, _lib.pluckNumber)(chartAttrs.markerborderalpha, palette.markerborderalpha),
      hoverBorderThickness: chartAttrs.markerborderhoverthickness,
      hoverBorderColor: chartAttrs.markerborderhovercolor,
      hoverBorderAlpha: chartAttrs.markerborderhoveralpha,
      radius: (0, _lib.pluckNumber)(chartAttrs.markerradius && (0, _lib.trimString)(chartAttrs.markerradius), 7),
      shapeId: (0, _lib.pluck)(chartAttrs.defaultmarkershape, SHAPE_CIRCLE),
      labelSepChar: (0, _lib.pluck)(chartAttrs.labelsepchar, COMMASPACE),
      tooltipSepChar: (0, _lib.pluck)(chartAttrs.tooltipsepchar, ', '),
      autoScale: (0, _lib.pluckNumber)(chartAttrs.autoscalemarkers, 0),
      tooltext: (0, _lib.pluck)(markerAttrs && markerAttrs.tooltext, chartAttrs.markertooltext),

      /* Value related attributes */
      dataEnabled: markerDataEnabled,
      valueToRadius: (0, _lib.pluckNumber)(chartAttrs.markerradiusfromvalue, 1),
      valueMarkerAlpha: (0, _lib.pluck)(chartAttrs.valuemarkeralpha, '75'),
      hideNull: (0, _lib.pluckNumber)(chartAttrs.hidenullmarkers, 0),
      nullRadius: (0, _lib.pluckNumber)(chartAttrs.nullmarkerradius, chartAttrs.markerradius, 7),
      adjustViewPort: (0, _lib.pluckNumber)(chartAttrs.adjustviewportformarkers, 0),
      startAngle: (0, _lib.pluckNumber)(chartAttrs.markerstartangle, 90),
      maxRadius: (0, _lib.pluckNumber)(chartAttrs.maxmarkerradius, 0),
      minRadius: (0, _lib.pluckNumber)(chartAttrs.minmarkerradius, 0),
      applyAll: (0, _lib.pluckNumber)(chartAttrs.applyallmarkers, 0),
      shadow: (0, _lib.pluckNumber)(chartAttrs.showmarkershadow, chartAttrs.showshadow, 0)
    };
    config.connectorOpts = {
      showHoverEffect: (0, _lib.pluckNumber)(chartAttrs.showconnectorhovereffect, 1),
      thickness: (0, _lib.pluckNumber)(chartAttrs.connectorthickness, chartAttrs.markerconnthickness, '2'),
      color: (0, _lib.pluck)(chartAttrs.connectorcolor, chartAttrs.markerconncolor, palette.markerbordercolor),
      alpha: (0, _lib.pluck)(chartAttrs.connectoralpha, chartAttrs.markerconnalpha, '100'),
      hoverThickness: (0, _lib.pluckNumber)(chartAttrs.connectorhoverthickness, chartAttrs.connectorthickness, chartAttrs.markerconnthickness, '2'),
      hoverColor: (0, _lib.pluck)(chartAttrs.connectorhovercolor, chartAttrs.connectorcolor, chartAttrs.markerconncolor, palette.markerbordercolor),
      hoverAlpha: (0, _lib.pluck)(chartAttrs.connectorhoveralpha, chartAttrs.connectoralpha, chartAttrs.markerconnalpha, '100'),
      dashed: (0, _lib.pluckNumber)(chartAttrs.connectordashed, chartAttrs.markerconndashed, 0),
      dashLen: (0, _lib.pluckNumber)(chartAttrs.connectordashlen, chartAttrs.markerconndashlen, 3),
      dashGap: (0, _lib.pluckNumber)(chartAttrs.connectordashgap, chartAttrs.markerconndashgap, 2),
      font: (0, _lib.pluck)(chartAttrs.connectorfont, chartAttrs.markerconnfont, inCanFontFamily),
      fontColor: (0, _lib.pluck)(chartAttrs.connectorlabelcolor, chartAttrs.connectorfontcolor, chartAttrs.markerconnfontcolor, inCancolor),
      fontSize: (0, _lib.pluckNumber)(chartAttrs.connectorfontsize, chartAttrs.markerconnfontsize, parseInt(inCanFontSize, 10)),
      showLabels: (0, _lib.pluckNumber)(chartAttrs.showconnectorlabels, chartAttrs.showmarkerlabels, chartAttrs.showlabels, 1),
      labelBgColor: (0, _lib.pluck)(chartAttrs.connectorlabelbgcolor, chartAttrs.markerconnlabelbgcolor, palette.plotfillcolor),
      labelBorderColor: (0, _lib.pluck)(chartAttrs.connectorlabelbordercolor, chartAttrs.markerconnlabelbordercolor, palette.markerbordercolor),
      shadow: (0, _lib.pluckNumber)(chartAttrs.showconnectorshadow, chartAttrs.showmarkershadow, chartAttrs.showshadow, 0),
      showTooltip: (0, _lib.pluckNumber)(chartAttrs.showconnectortooltip, chartAttrs.showmarkertooltip, chartAttrs.showtooltip, 1),
      tooltext: (0, _lib.pluck)(markerAttrs && markerAttrs.connectortooltext, chartAttrs.connectortooltext),
      hideOpen: (0, _lib.pluckNumber)(chartAttrs.hideopenconnectors, 1)
    };
    config.adjustViewPortForMarkers = (0, _lib.pluckNumber)(chartAttrs.adjustviewportformarkers, markerDataEnabled);
  }
  /**
   * Attach mouse events
   */
  ;

  _proto._attachMouseEvents = function _attachMouseEvents() {
    var iapi = this,
        listeners = iapi.getFromEnv('eventListeners'),
        containerElem = iapi.getFromEnv('chart-container'); // adds to event stack.

    listeners.push(_domEvent.default.listen(containerElem, _lib.hasTouch ? 'touchstart' : 'click', Maps.searchMouseMove, iapi));
    listeners.push(_domEvent.default.listen(window.document, _lib.hasTouch ? 'touchstart' : 'mousemove', Maps.searchMouseMove, iapi));
  };

  _proto._dispose = function _dispose() {
    var iapi = this,
        containerElem = iapi.getFromEnv('chart-container');

    if (_lib.hasTouch) {
      _domEvent.default.unlisten(containerElem, 'touchstart', Maps.searchMouseMove);

      _domEvent.default.unlisten(window.document, 'touchstart', Maps.searchMouseMove);
    }

    _domEvent.default.unlisten(containerElem, 'click', Maps.searchMouseMove);

    _domEvent.default.unlisten(window.document, 'mousemove', Maps.searchMouseMove);

    _MSCartesian.prototype._dispose.call(this);
  }
  /**
   * Searches for point on mouse move
   * @param {Event} e mouse move event
   */
  ;

  Maps.searchMouseMove = function searchMouseMove(e) {
    var mousePos,
        chart = e.data,
        chartConfig = chart.config,
        datasets = chart.getDatasets(),
        markers = datasets[1],
        toolTipController = markers && markers.getFromEnv('toolTipController'),
        currentToolTip = markers && markers.config.currentToolTip,
        lastHoveredPoint = chart.config.lastHoveredPoint,
        lastMouseCoordinate = {};

    if (!chart.getFromEnv('chart-container') || chart.config.lastInteractionEvent === e.originalEvent) {
      return;
    }

    chart.config.lastInteractionEvent = e.originalEvent; // check if the event is fired within the canvas region.

    if ((mousePos = isWithinCanvas(e, chart)) && mousePos.insideCanvas) {
      // store the evnt object. This will be used to generate event on same coordinate
      chartConfig.lastMouseEvent = e;
      lastMouseCoordinate = {
        x: mousePos.chartX,
        y: mousePos.chartY
      }; // search the best neighbouring point of the mouse moved point.

      chart._searchNearestNeighbour(lastMouseCoordinate, e);
    } else {
      lastHoveredPoint && markers && markers.hoverOutFn(lastHoveredPoint.element);
      chart.config.lastHoveredPoint = null;
      toolTipController && toolTipController.hide(currentToolTip);
    }
  }
  /**
   * Searches for nearest point on mouse move using kdTree
   * @param {Object} point point object
   * @param {Event} event interaction event
   */
  ;

  _proto._searchNearestNeighbour = function _searchNearestNeighbour(point, event) {
    var iapi = this,
        // datasets = iapi.components.dataset,
    datasets = iapi.getDatasets(),
        markers = datasets[1],
        kdPoint;

    if (markers) {
      if (!markers.components.kDTree) {
        return;
      } // searches the nearest neighbouring point of the input point.


      kdPoint = markers.getElement(point);

      if (kdPoint) {
        // iapi.config.lastHoveredPoint !== kdPoint && markers.highlightPoint(kdPoint, event);
        markers.highlightPoint(kdPoint, event);
      } else {
        markers.highlightPoint(false, event);
      }
    }
  }
  /**
   * Create group layers graphics
   */
  ;

  _proto._createLayers = function _createLayers() {
    _MSCartesian.prototype._createLayers.call(this);

    this._attachMouseEvents();
  }
  /**
   * Function to parse background cosmetics
   * @memberof GEO
   */
  ;

  _proto._parseBackgroundCosmetics = function _parseBackgroundCosmetics() {
    var iapi = this,
        background = iapi.getChildren('background')[0],
        config = background.config,
        // palette = iapi.components.colorPalette,
    palette = iapi.getChildren('colorPalette')[0],
        chartAttrs = iapi.getFromEnv('chart-attrib'),
        showBorder;
    showBorder = config.showBorder = (0, _lib.pluckNumber)(chartAttrs.showcanvasborder, 1);
    config.borderWidth = showBorder ? (0, _lib.pluckNumber)(chartAttrs.canvasborderthickness, 1) : 0;
    config.borderRadius = config.borderRadius = (0, _lib.pluckNumber)(chartAttrs.canvasborderradius, 0);
    config.borderDashStyle = config.borderDashStyle = (0, _lib.pluckNumber)(chartAttrs.borderdashed, 0) ? (0, _lib.getDashStyle)((0, _lib.pluckNumber)(chartAttrs.borderdashlen, 4), (0, _lib.pluckNumber)(chartAttrs.borderdashgap, 2)) : DASH_DEF;
    config.borderAlpha = (0, _lib.pluck)(chartAttrs.canvasborderalpha, palette.borderAlpha);
    config.borderColor = config.borderColor = (0, _lib.convertColor)((0, _lib.pluck)(chartAttrs.canvasbordercolor, palette && palette.borderColor), config.borderAlpha);
  }
  /**
   * Function to create background cosmetics
   * @return {Object} color object for background
   * @memberof GEO
   */
  ;

  _proto._getBackgroundCosmetics = function _getBackgroundCosmetics() {
    var iapi = this,
        chartAttrs = iapi.getFromEnv('chart-attrib') || iapi.jsonData.map,
        palette = iapi.getChildren('colorPalette')[0];
    return {
      FCcolor: {
        color: (0, _lib.pluck)(chartAttrs.bgcolor, chartAttrs.canvasbgcolor, palette.bgcolor),
        alpha: (0, _lib.pluck)(chartAttrs.bgalpha, chartAttrs.canvasbgalpha, palette.bgalpha),
        angle: (0, _lib.pluck)(chartAttrs.bgangle, chartAttrs.canvasbgangle, palette.bgangle),
        ratio: (0, _lib.pluck)(chartAttrs.bgratio, chartAttrs.canvasbgratio, palette.bgratio)
      }
    };
  }
  /**
   * Function to parse background cosmetics
   * @memberof GEO
   */
  ;

  _proto._parseCanvasCosmetics = function _parseCanvasCosmetics() {
    _MSCartesian.prototype._parseCanvasCosmetics.call(this);

    var iapi = this,
        config = iapi.config,
        chartAttrs = iapi.getFromEnv('chart-attrib') || iapi.jsonData.map,
        // canvasConfig = components.canvas.config
    canvasConfig = iapi.getChildren('canvas')[0].config; // borderThickness = pluckNumber(chartAttrs.showborder, 1) ? pluckNumber(chartAttrs.borderthickness, 1) : 0;
    // chart margins

    config.origMarginTop = (0, _lib.pluckNumber)(chartAttrs.maptopmargin, 11);
    config.origMarginLeft = (0, _lib.pluckNumber)(chartAttrs.mapleftmargin, 11);
    config.origMarginBottom = (0, _lib.pluckNumber)(chartAttrs.mapbottommargin, 11);
    config.origMarginRight = (0, _lib.pluckNumber)(chartAttrs.maprightmargin, 11);
    config.origCanvasLeftMargin = (0, _lib.pluckNumber)(chartAttrs.canvasleftmargin, 0);
    config.origCanvasRightMargin = (0, _lib.pluckNumber)(chartAttrs.canvasrightmargin, 0);
    config.origCanvasTopMargin = (0, _lib.pluckNumber)(chartAttrs.canvastopmargin, 0);
    config.origCanvasBottomMargin = (0, _lib.pluckNumber)(chartAttrs.canvasbottommargin, 0);
    canvasConfig.canvasBorderRadius = (0, _lib.pluckNumber)(chartAttrs.canvasborderradius, 0); // canvas padding

    canvasConfig.origCanvasTopPad = (0, _lib.pluckNumber)(chartAttrs.canvastoppadding, 0);
    canvasConfig.origCanvasBottomPad = (0, _lib.pluckNumber)(chartAttrs.canvasbottompadding, 0);
    canvasConfig.origCanvasLeftPad = (0, _lib.pluckNumber)(chartAttrs.canvasleftpadding, 0);
    canvasConfig.origCanvasRightPad = (0, _lib.pluckNumber)(chartAttrs.canvasrightpadding, 0);
  }
  /**
   * Function to scale markers
   * @return {Object} scaled coordinates
   * @memberof GEO
   */
  ;

  _proto.preliminaryScaling = function preliminaryScaling() {
    var iapi = this,
        jsonData = iapi.jsonData,
        markerArray = jsonData.markers && jsonData.markers.items || [],
        i = markerArray && markerArray.length || 0,
        minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity,
        x,
        y,
        item;

    while (i--) {
      item = markerArray[i];
      x = Number(item.x);
      y = Number(item.y);
      minX = mathMin(minX, x);
      minY = mathMin(minY, y);
      maxX = mathMax(maxX, x);
      maxY = mathMax(maxY, y);
    }

    return {
      x: minX,
      y: minY,
      x1: maxX,
      y1: maxY
    };
  }
  /**
   * [getScalingParameters description]
   * @param {number} wg original width
   * @param {number} hg original height
   * @param {number} wv scaled width
   * @param {number} hv scaled height
   * @return {Object} scaled properties
   */
  ;

  _proto.getScalingParameters = function getScalingParameters(wg, hg, wv, hv) {
    var iapi = this,
        aspR = wg / hg,
        widthScaleR = wv / (wg * iapi.config.baseScaleFactor),
        heightScaleR = hv / (hg * iapi.config.baseScaleFactor),
        translateX = 0,
        translateY = 0,
        scaleFactor,
        strokeWidth;

    if (widthScaleR > heightScaleR) {
      scaleFactor = heightScaleR;
      translateX += (wv - hv * aspR) / 2;
      strokeWidth = 200 / (hg * scaleFactor);
    } else {
      scaleFactor = widthScaleR;
      translateY += (hv - wv / aspR) / 2;
      strokeWidth = 200 / (wg * scaleFactor);
    }

    return {
      scaleFactor: scaleFactor,
      strokeWidth: strokeWidth,
      translateX: translateX,
      translateY: translateY
    };
  }
  /**
   * Calculates marker bounds (coordinates, dimention)
   * @param {number} scaleFactor factor of scaling
   * @param {number} xOffset x coordinate offset
   * @param {number} yOffset y coordinate offset
   * @return {Object} scaled coordinates
   */
  ;

  _proto.calculateMarkerBounds = function calculateMarkerBounds(scaleFactor, xOffset, yOffset) {
    var iapi = this,
        config = iapi.config,
        markerOptions = config.markerOpts,
        // datasets = iapi.components.dataset,
    datasets = iapi.getDatasets(),
        limits = iapi.getDataLimits(),
        dataMin = limits.dataMin,
        dataMax = limits.dataMax,
        hideNull = markerOptions.hideNull,
        nullRadius = markerOptions.nullRadius,
        v2r = markerOptions.valueToRadius,
        markerDataset,
        markerConf,
        minR,
        maxR,
        markerArray,
        i,
        name,
        dataset,
        len,
        minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity,
        x,
        y,
        r,
        definition,
        item;

    for (i = 0, len = datasets.length; i < len; i++) {
      dataset = datasets[i];
      name = dataset.getName();

      if (name === 'markers') {
        markerDataset = dataset;
      }
    }

    if (markerDataset) {
      markerDataset.calculateMarkerRadiusLimits();
      markerConf = markerDataset.config || {};
      minR = markerConf.minRadius;
      maxR = markerConf.maxRadius;
      markerArray = markerDataset.components && markerDataset.components.markerObjs || {};

      for (i in markerArray) {
        item = markerArray[i];
        config = item.config;
        definition = config.definition || {};

        if (config.cleanValue !== null) {
          if (v2r && definition.radius === UNDEF) {
            config.radius = minR + (maxR - minR) * (config.cleanValue - dataMin) / (dataMax - dataMin);
          }
        } else {
          if (hideNull) {
            config.__hideMarker = true;
          } else if (config.radius === null) {
            config.radius = nullRadius;
          }

          continue;
        }

        r = Number(config.radius);
        x = (Number(definition.x) + xOffset) * scaleFactor;
        y = (Number(definition.y) + yOffset) * scaleFactor; // These values will be scaled along with the graphic

        minX = mathMin(minX, x - r);
        minY = mathMin(minY, y - r);
        maxX = mathMax(maxX, x + r);
        maxY = mathMax(maxY, y + r);
      }
    }

    return {
      x: minX,
      y: minY,
      x1: maxX,
      y1: maxY
    };
  }
  /**
   * calculate and allote space for various components
   * every components are get notified with maximum space and then components return
   * the available space.
   * @memberof GEO
   */
  ;

  _proto._spaceManager = function _spaceManager() {
    var availableHeight,
        iapi = this,
        config = iapi.config,
        legend = iapi.getChildren('legend') && iapi.getChildren('legend')[0],
        gLegend = iapi.getChildren('gLegend') && iapi.getChildren('gLegend')[0],
        legendPosition = legend && legend.config.legendPos ? legend.config.legendPos.split('-') : gLegend && gLegend.conf.legendPosition ? gLegend.conf.legendPosition.split('-') : [],
        initSpace,
        chartAttrs = iapi.getFromEnv('chart-attrib'),
        showBorder = config.showBorder,
        translateX = config.origMarginLeft,
        translateY = config.origMarginTop,
        wg = iapi.config.baseWidth,
        hg = iapi.config.baseHeight,
        scalingParams,
        wv,
        hv,
        sFactor,
        extraMarkerSpace = {},
        xDifference = 0,
        yDifference = 0,
        initHv,
        initWv,
        allottedSpace,
        topSpace,
        markerOptions = config.markerOpts,
        chartBorderWidth = config.borderWidth = showBorder ? (0, _lib.pluckNumber)(chartAttrs.borderthickness, 1) : 0;

    iapi._allocateSpace({
      top: chartBorderWidth,
      bottom: chartBorderWidth,
      left: chartBorderWidth,
      right: chartBorderWidth
    });

    iapi._allocateSpace(iapi._manageActionBarSpace && iapi._manageActionBarSpace(config.availableHeight * 0.225) || {});

    if (legendPosition[0] === 'right' || legendPosition[0] === 'left') {
      allottedSpace = config.canvasWidth * 0.3;
    } else {
      allottedSpace = config.canvasHeight * 0.3;
    }

    initSpace = legendPosition[0] === _lib.POSITION_TOP || legendPosition[0] === POSITION_BOTTOM ? config.canvasHeight : config.canvasWidth;
    config.showLegend && iapi._manageLegendSpace(allottedSpace);
    availableHeight = legendPosition[0] === POSITION_BOTTOM || legendPosition[0] === _lib.POSITION_TOP ? config.canvasHeight * 0.225 : config.canvasWidth * 0.225; // need to translate plot bottom side when legendPosition: top-*

    if (legendPosition[0] === 'top') {
      translateY += initSpace - config.canvasHeight;
    } // a space manager that manages the space for the tools as well as the captions.


    topSpace = iapi._manageChartMenuBar(availableHeight); // need to translate plot right side when legendPosition: left-*

    if (legendPosition[0] === 'left') {
      translateX += initSpace - config.canvasWidth;
    }

    wv = config.canvasWidth;
    hv = config.canvasHeight;

    if (markerOptions.dataEnabled) {
      if (config.adjustViewPortForMarkers) {
        // Calculate the overflow of the scaled properties (x, y)
        extraMarkerSpace = iapi.preliminaryScaling();

        if (extraMarkerSpace.x1 > wg) {
          wg = extraMarkerSpace.x1;
        }

        if (extraMarkerSpace.x < 0) {
          wg += -extraMarkerSpace.x;
          xDifference = -extraMarkerSpace.x;
        }

        if (extraMarkerSpace.y1 > hg) {
          hg = extraMarkerSpace.y1;
        }

        if (extraMarkerSpace.y < 0) {
          hg += -extraMarkerSpace.y;
          yDifference = -extraMarkerSpace.y;
        } // Get the scale factor and translate factors


        scalingParams = iapi.getScalingParameters(wg, hg, wv, hv); // Assign radii to the markers that have a value but no radius.
        // Calculate the overflow of the radius (unscaled property).

        extraMarkerSpace = iapi.calculateMarkerBounds(scalingParams.scaleFactor * iapi.config.baseScaleFactor, xDifference, yDifference);
        /**
                         * @todo: Check if the wv and hv become less than a certain limit.
                         * If they do reduce the radii of the markers.
                         */

        initHv = hv;
        initWv = wv;

        if (extraMarkerSpace.x < 0) {
          translateX += -extraMarkerSpace.x;
          wv += extraMarkerSpace.x;
        }

        if (extraMarkerSpace.y < 0) {
          translateY += -extraMarkerSpace.y;
          hv += extraMarkerSpace.y;
        }

        if (extraMarkerSpace.x1 > initWv) {
          wv -= extraMarkerSpace.x1 - initWv;
        }

        if (extraMarkerSpace.y1 > initHv) {
          hv -= extraMarkerSpace.y1 - initHv;
        }
      } else {
        // Get the scale factor and translate factors
        scalingParams = iapi.getScalingParameters(wg, hg, wv, hv); // Assign radii to the markers that have a value but no radius.
        // Calculate the overflow of the radius (unscaled property).

        iapi.calculateMarkerBounds(scalingParams.scaleFactor * iapi.config.baseScaleFactor, xDifference, yDifference);
      } // Recalculate the scale factor after accounting for radii.


      scalingParams = iapi.getScalingParameters(wg, hg, wv, hv);
      translateX += xDifference * scalingParams.scaleFactor * iapi.config.baseScaleFactor;
      translateY += yDifference * scalingParams.scaleFactor * iapi.config.baseScaleFactor;
    } else {
      scalingParams = iapi.getScalingParameters(wg, hg, wv, hv);
    }

    iapi.config.scalingParams = scalingParams;
    sFactor = scalingParams.scaleFactor;
    scalingParams.translateX = scalingParams.translateX + translateX;
    scalingParams.translateY = scalingParams.translateY + translateY + topSpace.top || 0;
    scalingParams.sFactor = sFactor * iapi.config.baseScaleFactor * 100 / 100;
    scalingParams.transformStr = ['t', scalingParams.translateX, ',', scalingParams.translateY, 's', sFactor, ',', sFactor, ',0,0'].join('');
    iapi.config.annotationConfig = {
      id: 'Geo',
      showbelow: 0,
      autoscale: 0,
      grpxshift: scalingParams.translateX ? scalingParams.translateX : 0,
      grpyshift: scalingParams.translateY ? scalingParams.translateY : 0,
      xscale: (sFactor ? sFactor * iapi.config.baseScaleFactor : 1) * 100,
      yscale: (sFactor ? sFactor * iapi.config.baseScaleFactor : 1) * 100,
      scaletext: 1,
      // centeralign: 1,
      options: {
        useTracker: true
      }
    };
  }
  /**
   * Function to calculate the lower and upper limit of data
   * @return {Object} data minimum, maximum value
   * @memberof GEO
   */
  ;

  _proto.getDataLimits = function getDataLimits() {
    var iapi = this,
        datasets = iapi.getDatasets(),
        length = datasets.length,
        dataset,
        dataMin = +Infinity,
        dataMax = -Infinity,
        limits,
        i;

    for (i = 0; i < length; i++) {
      dataset = datasets[i];
      limits = dataset.getDataLimits();
      dataMin = mathMin(dataMin, limits.min);
      dataMax = mathMax(dataMax, limits.max);
    }

    return {
      dataMin: dataMin,
      dataMax: dataMax
    };
  }
  /**
   * Return copy of entity paths
   * @param {boolean} copy whether to copy or return the original object
   * @return {Object} entity path object
   */
  ;

  _proto.getEntityPaths = function getEntityPaths(copy) {
    var returnObj = {},
        ents = this.config.entities,
        id;

    if (copy) {
      for (id in ents) {
        returnObj[id] = ents[id];
      }

      return returnObj;
    }

    return ents;
  }
  /**
   * Check if rendering is complete
   * @memberof GEO
   */
  ;

  _proto.checkComplete = function checkComplete() {
    var iapi = this; // iapi.config.labelDrawCount = 0;

    if (iapi.config.entityFlag && iapi.config.entitiesReady) {
      iapi.config.entityFlag = false;
      iapi.config.markersDrawn = true;
      iapi.fireChartInstanceEvent('internal.mapdrawingcomplete', {
        renderer: iapi
      });
    }
  };

  return Maps;
}(_mscartesian.default);

var _default = Maps;
exports["default"] = _default;

/***/ }),

/***/ 1649:
/***/ ((__unused_webpack_module, exports) => {



exports.__esModule = true;
exports["default"] = void 0;
var PLOT_STR = 'plot',
    FINAL_STR = 'final';

var fadeEffect = [{
  initialAttr: function initialAttr() {
    return {
      opacity: 0
    };
  },
  finalAttr: function finalAttr() {
    return {
      opacity: 1
    };
  }
}],
    PATH_APPEARING_FN = function PATH_APPEARING_FN() {
  fadeEffect[0].slot = PLOT_STR;
  return fadeEffect;
},
    PATH_UPDATING_FN = function PATH_UPDATING_FN(input) {
  return [{
    finalAttr: function finalAttr() {
      return input.finalAttr;
    }
  }];
},
    LABEL_CONNECTOR_APPEARING_FN = function LABEL_CONNECTOR_APPEARING_FN() {
  fadeEffect[0].slot = FINAL_STR;
  return fadeEffect;
},
    ENTITY_LABEL_APPEARING_FN = function ENTITY_LABEL_APPEARING_FN() {
  return [{
    initialAttr: {
      opacity: 0
    },
    finalAttr: {
      opacity: 1
    },
    slot: 'final'
  }];
},
    MARKER_ITEM_APPEARING_FN = function MARKER_ITEM_APPEARING_FN() {
  fadeEffect[0].slot = FINAL_STR;
  return fadeEffect;
},
    MARKER_ITEM_UPDATING_FN = function MARKER_ITEM_UPDATING_FN(input) {
  return [{
    finalAttr: function finalAttr() {
      return input.finalAttr;
    }
  }];
},
    GROUP_APPEARING_FN = function GROUP_APPEARING_FN(input) {
  return [{
    initialAttr: function initialAttr() {
      return Object.assign({
        opacity: 0
      }, input.attr);
    },
    finalAttr: function finalAttr() {
      return input.attr;
    },
    slot: 'plot'
  }];
},
    GROUP_UPDATING_FN = function GROUP_UPDATING_FN(input) {
  return [{
    initialAttr: function initialAttr() {
      return Object.assign({
        opacity: 0
      }, input.attr);
    },
    finalAttr: function finalAttr() {
      return input.attr;
    },
    slot: 'plot'
  }];
};

var _default = {
  'initial.dataset.entities': function initialDatasetEntities() {
    return {
      'path.appearing': PATH_APPEARING_FN,
      'path.updating': PATH_UPDATING_FN,
      'labelConnectors.appearing': LABEL_CONNECTOR_APPEARING_FN,
      'labelConnectors.updating': null,
      'entityLabel.appearing': ENTITY_LABEL_APPEARING_FN,
      '*': null
    };
  },
  'initial.dataset.markers': function initialDatasetMarkers() {
    return {
      markers: null,
      'markerItem.appearing': MARKER_ITEM_APPEARING_FN,
      'markerItem.updating': MARKER_ITEM_UPDATING_FN
    };
  },
  'initial.group.mapGroup': function initialGroupMapGroup() {
    return {
      'group.appearing': GROUP_APPEARING_FN,
      'group.updating': GROUP_UPDATING_FN,
      '*': null
    };
  }
};
exports["default"] = _default;

/***/ }),

/***/ 1648:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _componentInterface = __webpack_require__(290);

var _extAnnotation = _interopRequireDefault(__webpack_require__(387));

var _dependencyManager = __webpack_require__(282);

var _mapEntities = _interopRequireDefault(__webpack_require__(1649));

var _lib = __webpack_require__(274);

var _schedular = __webpack_require__(286);

var _redraphaelShapes = _interopRequireDefault(__webpack_require__(659));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var Raphael = (0, _dependencyManager.getDep)('redraphael', 'plugin'),
    UNDEF,
    userAgent = window.navigator.userAgent,
    isIE = /msie/i.test(userAgent) && !window.opera,
    COMMA = ',',
    BLANK = '',
    POSITION_TOP = 'top',
    POSITION_BOTTOM = 'bottom',
    POSITION_RIGHT = 'right',
    POSITION_LEFT = 'left',
    POSITION_MIDDLE = 'middle',
    POSITION_CENTER = 'center',
    ENTITYLABEL = 'entityLabel',
    TEXT_STR = 'text',
    CRISP = 'crisp',
    math = window.Math,
    mathMin = math.min,
    mathMax = math.max,
    isStrokeReg = /stroke/ig,
    isWebKit = /AppleWebKit/.test(userAgent),
    mathCeil = math.ceil,
    colorize = function colorize(original, obj) {
  var col = !obj ? {
    FCcolor: original
  } : (0, _lib.extend2)(original.FCcolor, obj, false, true);
  col.toString = _lib.toRaphaelColor;
  return col;
},
    pruneStrokeAttrs = function pruneStrokeAttrs(obj, thicknessModifier) {
  var key,
      returnObj = {},
      finalThicknessModifier;
  finalThicknessModifier = thicknessModifier || 1;

  if (!obj || typeof obj !== 'object') {
    return returnObj;
  }

  for (key in obj) {
    if (!isStrokeReg.test(key)) {
      if (key === 'stroke-width') {
        returnObj[key] = Number(obj[key]) / finalThicknessModifier;

        if (isWebKit) {
          // webkit issue fix
          returnObj[key] = returnObj[key] && mathCeil(returnObj[key]) || 0;
        }
      } else {
        returnObj[key] = obj[key];
      }
    }
  }

  return returnObj;
},
    getTextWrapWidth = {
  right: function right() {
    // return x value
    return arguments[1];
  },
  left: function left(w, x) {
    return w - x;
  },
  center: function center(w, x) {
    return mathMin(x, w - x) * 2;
  }
},
    getTextWrapHeight = {
  top: function top() {
    // returns y value
    return arguments[1];
  },
  middle: function middle(h, y) {
    return mathMin(y, h - y) * 2;
  },
  bottom: function bottom(h, y) {
    return h - y;
  }
},

/**
 * set attribute to entity grphics
 * @param {Object} entityObj paricular entity object
 * @param {Object} attrs set of attributes to be applied
 */
setCustomAttrs = function setCustomAttrs(entityObj, attrs) {
  entityObj && entityObj.graphics.outlines.attr(attrs);
},
    convertArrayToIdMap = function convertArrayToIdMap(arr) {
  var i = arr && arr.length || 0,
      ret = {},
      item;

  while (i--) {
    item = arr[i];

    if (item.id !== UNDEF) {
      ret[item.id.toLowerCase()] = item;
    }
  }

  return ret;
};

(0, _dependencyManager.addDep)({
  name: 'mapsAnimation',
  type: 'animationRule',
  extension: _mapEntities.default
}); // Adding required shapes for chart.

(0, _redraphaelShapes.default)(Raphael);
/**
 * Cretaes class Entities to render map entities
 */

var Entities = /*#__PURE__*/function (_ComponentInterface) {
  (0, _inheritsLoose2.default)(Entities, _ComponentInterface);

  /**
   * Creates an instance of Entities
   */
  function Entities() {
    var _this;

    _this = _ComponentInterface.call(this) || this;
    _this.components = {};
    return _this;
  }
  /**
   * Returns the name of the component
   * @return {string} name of the component
   */


  var _proto = Entities.prototype;

  _proto.getName = function getName() {
    return 'entities';
  }
  /**
   * Returns the type of the component
   * @return {string} type of the component
   */
  ;

  _proto.getType = function getType() {
    return 'dataset';
  }
  /**
   * Configures the entities
   * @param {Object} entityJSONDataOb JSON for dataset configurations
   */
  ;

  _proto.configureAttributes = function configureAttributes(entityJSONDataOb) {
    if (!entityJSONDataOb) {
      return;
    }

    this.JSONData = {
      data: entityJSONDataOb
    };
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        rawData = chart.jsonData,
        conf = dataset.config,
        mapAttrs = rawData.map || rawData.chart,
        entityJSONData,
        entities,
        dataItem,
        entityItem,
        item,
        minMaxArray = [],
        minMaxArrayLen,
        i,
        d,
        colorManager = dataset.getFromEnv('colorManager'),
        entityDef = rawData.entitydef || [];

    if (!conf.attachEvent && colorManager) {
      dataset.addExtEventListener('legendUpdate', function () {
        d = arguments[1];

        if (d.component === 'legend') {
          dataset.legendInteractivity(d.legendItem, d.colorObj);
        } else {
          minMaxArray = d.maxMinArray;
          minMaxArrayLen = minMaxArray.length;

          for (i = 0; i < minMaxArrayLen; i++) {
            dataset.updateEntityColors(minMaxArray[i].min, minMaxArray[i].max);
          }
        }
      }, colorManager);
      conf.attachEvent = true;
    }

    if (rawData.data && rawData.data[0] && rawData.data[0].data) {
      entityJSONData = dataset.JSONData = rawData.data[0].data || [];
    } else {
      entityJSONData = dataset.JSONData = rawData.data || [];
    }

    conf.useSNameAsId = (0, _lib.pluckNumber)(mapAttrs.usesnameasid, 0);

    this._redefineEntities(entityDef);

    entities = dataset.components.data;
    conf.showTooltip = (0, _lib.pluckNumber)(mapAttrs.showtooltip, 1);
    conf.showHoverEffect = (0, _lib.pluckNumber)(mapAttrs.showhovereffect, 0);
    entityJSONData = convertArrayToIdMap(entityJSONData);
    dataset.calculateDataLimits();
    !rawData.colorrange && dataset._detachChild(dataset.getChildren('colorRange') && dataset.getChildren('colorRange')[0]);

    for (item in entities) {
      dataItem = entityJSONData[item];
      entityItem = entities[item];

      if (dataItem) {
        // Work on a copy of dataItem
        this._configureEntity(item, entityItem, (0, _lib.imprint)(Entities._sanitizeEntityOptions((0, _lib.extend2)({}, dataItem)), entityItem.config));
      } else {
        this._configureEntity(item, entityItem, entityItem.config);
      }
    }
  }
  /**
   * Function to update entity colors
   * @param {number} minValue minimum value of range selected
   * @param {number} maxValue maximum value of range selected
   */
  ;

  _proto.updateEntityColors = function updateEntityColors(minValue, maxValue) {
    var dataset = this,
        entities = dataset.components.data,
        chart = dataset.getFromEnv('chart'),
        _chart$config$entityO = chart.config.entityOpts,
        nullEntityAlpha = _chart$config$entityO.nullEntityAlpha,
        nullEntityColor = _chart$config$entityO.nullEntityColor,
        entityObj,
        config,
        value,
        name,
        alphaArr,
        visibleEntityAttr,
        nullAttr = colorize({
      fill: nullEntityColor,
      alpha: nullEntityAlpha
    }),
        hiddenAttr = {
      'fill-opacity': 0
    }; // For all entities of the map

    for (name in entities) {
      if (entities.hasOwnProperty(name)) {
        entityObj = entities[name];
        config = entityObj.config;
        value = config.cleanValue;
        alphaArr = config.alphaArr || [];
        visibleEntityAttr = {
          'fill-opacity': alphaArr[0] / 100 || 1
        };

        if (value == null) {
          // If a value is undefined or null
          setCustomAttrs(entityObj, nullAttr); // A null entity is, surprisingly enough, not hidden.
          // It is instead visible with null attributes applied to it.

          entityObj.hidden = false;
        } else if (value < minValue || value > maxValue) {
          // If a value is outside the range
          setCustomAttrs(entityObj, hiddenAttr); // An entity with out-of-range values is hidden

          entityObj.hidden = true;
        } else {
          // If value is valid and is inside the range
          setCustomAttrs(entityObj, visibleEntityAttr); // An entity with valid values is, obviously, not hidden

          entityObj.hidden = false;
        }
      }
    }
  }
  /**
   * Function that deals with all interactions associated with a map
   * @param {Object} legendItem corresponding legend item
   * @param {Object} entityColorObj color object of a aparticular entity
   * @memberof Entities
   */
  ;

  _proto.legendInteractivity = function legendInteractivity(legendItem, entityColorObj) {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        entities = dataset.components.data,
        i,
        entity,
        config = legendItem.config,
        visible = legendItem.hasState('hidden'),
        cleanValue,
        colorRange = dataset.getFromEnv('colorManager'),
        entityAttrs,
        visibleEntityAttr = {},
        applyAttr,
        hiddenAttr = {
      'fill-opacity': 0
    },
        colorObj;
    chart.getFromEnv('animationManager').setAnimationState('legendInteraction');

    for (i in entities) {
      if (entities.hasOwnProperty(i)) {
        entity = entities[i];
        config = entity.config;
        cleanValue = config.cleanValue;
        colorObj = colorRange.getColorObj(cleanValue);
        entityAttrs = config.visibleEntityAttr;
        visibleEntityAttr['fill-opacity'] = entityAttrs['fill-opacity'];
        applyAttr = !visible ? hiddenAttr : visibleEntityAttr;

        if (entityColorObj.code === (!colorObj.outOfRange && colorObj.code)) {
          entity.hidden = !visible;
          setCustomAttrs(entity, applyAttr);

          if (!visible) {
            legendItem.setLegendState('hidden');
          } else {
            legendItem && legendItem.removeLegendState('hidden');
          }
        }
      }
    }
  }
  /**
   * Calculates the data limits for chart
   * @memberof Entities
   */
  ;

  _proto.calculateDataLimits = function calculateDataLimits() {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        conf = dataset.config,
        jsonData = chart.jsonData,
        dataArr = jsonData.data || [],
        // numberFormatter = chart.components.numberFormatter,
    numberFormatter = this.getFromEnv('number-formatter'),
        cleanValue,
        value,
        minValue = +Infinity,
        maxValue = -Infinity,
        len,
        i;

    for (i = 0, len = dataArr.length; i < len; i++) {
      value = dataArr[i].value;
      cleanValue = numberFormatter.getCleanValue(value);
      minValue = mathMin(minValue, cleanValue);
      maxValue = mathMax(maxValue, cleanValue);
    }

    conf.max = maxValue;
    conf.min = minValue;
  }
  /**
   * Configures particular entity
   * @param {number} id entity id
   * @param {Object} entityItem particular entity object
   * @param {Object} entityJSON entity JSON object
   */
  ;

  _proto._configureEntity = function _configureEntity(id, entityItem, entityJSON) {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        conf = dataset.config,
        numberFormatter = this.getFromEnv('number-formatter'),
        chartConf = chart.config,
        entityOpts = chartConf.entityOpts,
        entityConf = entityItem.config,
        labelConfig = entityItem.labelConfig,
        value = entityJSON.value,
        cleanValue = entityConf.cleanValue = numberFormatter.getCleanValue(value),
        formattedValue = entityConf.formattedValue = cleanValue !== UNDEF ? numberFormatter.dataLabels(cleanValue) : UNDEF,
        showTooltip = (0, _lib.pluckNumber)(entityJSON.showtooltip, entityOpts.showTooltip),
        defaultTooltip = this._getDefaultTooltip(entityItem, entityJSON, dataset),
        tooltextMacroObj = {
      formattedValue: formattedValue,
      sName: entityJSON.shortLabel,
      lName: entityJSON.label
    },
        styleObj = entityOpts.dataLabels.style,
        toolText = entityConf.toolText = showTooltip ? (0, _lib.parseUnsafeString)((0, _lib.pluck)((0, _lib.parseTooltext)((0, _lib.pluck)(entityJSON.tooltext, entityOpts.tooltext, defaultTooltip), [1, 2, 7, 38, 39], tooltextMacroObj, entityJSON)), false) : BLANK,
        borderColor = entityConf.borderColor = (0, _lib.pluck)(entityJSON.bordercolor, entityOpts.borderColor),
        borderAlpha = entityConf.borderAlpha = (0, _lib.pluck)(entityJSON.borderalpha, entityOpts.borderAlpha),
        borderThickness = entityConf.borderThickness = (0, _lib.pluckNumber)(entityJSON.borderthickness, entityOpts.borderThickness),
        hoverOnNull = entityOpts.hoverOnNull,
        useHoverColor = entityConf.useHoverColor = (0, _lib.pluckNumber)(entityJSON.showhovereffect, entityJSON.usehovercolor, hoverOnNull ? entityOpts.showHoverEffect : isNaN(value) ? 0 : entityOpts.showHoverEffect),
        labelAlignment = entityConf.labelAlignment,
        colorManager = dataset.getFromEnv('colorManager'),
        colorObj,
        link,
        align,
        valign,
        color,
        alpha,
        angle,
        ratio,
        fillColor,
        fontColor,
        fontFamily,
        fontBold,
        emptyColorObject,
        fillColorObject,
        hoverColor,
        bgColor,
        bgAlpha,
        labels,
        labelObj,
        oriLabels,
        i,
        alphaArr; // Reset the hidden flag so that on data update entity item gets visible


    entityItem.hidden = false;
    entityConf.showLabel = (0, _lib.pluckNumber)(entityJSON.showlabel, entityOpts.showLabels);
    entityConf.labelPadding = (0, _lib.pluckNumber)(entityJSON.labelpadding, entityOpts.labelPadding);
    entityConf.fontFamily = (0, _lib.pluck)(entityJSON.font, styleObj.fontFamily);
    entityConf.fontSize = (0, _lib.pluckNumber)(parseInt(entityJSON.fontsize, 10), parseInt(styleObj.fontSize, 10));
    entityConf.fontBold = (0, _lib.pluckNumber)(entityJSON.fontbold, 0); // fontcolor is deprecated.

    entityConf.fontColor = (0, _lib.pluck)(entityJSON.labelcolor, entityJSON.fontcolor, styleObj.color);
    entityConf.labelBgColor = (0, _lib.pluck)(entityJSON.labelbgcolor, styleObj.bgColor) || BLANK;
    entityConf.labelBorderColor = (0, _lib.pluck)(entityJSON.labelbordercolor, styleObj.borderColor) || BLANK;
    entityConf.connectorColor = (0, _lib.pluck)(entityJSON.labelconnectorcolor, entityOpts.connectorColor);
    entityConf.connectorAlpha = (0, _lib.pluck)(entityJSON.labelconnectoralpha, entityOpts.connectorAlpha);
    entityConf.hoverBorderThickness = (0, _lib.pluckNumber)(entityJSON.borderhoverthickness, entityJSON.hoverborderthickness, entityOpts.hoverBorderThickness);
    entityConf.hoverBorderColor = (0, _lib.pluck)(entityJSON.borderhovercolor, entityJSON.hoverbordercolor, entityOpts.hoverBorderColor, entityConf.borderColor);
    entityConf.hoverBorderAlpha = (0, _lib.pluck)(entityJSON.borderhoveralpha, entityJSON.hoverborderalpha, entityOpts.hoverBorderAlpha, entityConf.borderAlpha);
    entityConf.connectorThickness = (0, _lib.pluckNumber)(entityJSON.labelconnectorthickness, entityOpts.connectorThickness);
    entityConf.origConnectorThickness = entityConf.connectorThickness;
    entityConf.borderThickness = borderThickness;
    entityConf.link = entityJSON.link;
    entityConf.isVisible = true;
    entityConf.id = id;
    entityConf.originalId = entityJSON.origId;

    if (cleanValue !== null) {
      colorObj = colorManager && colorManager.getColor(cleanValue);

      if (colorObj && !colorObj.outOfRange) {
        bgColor = colorObj.code;

        if (colorObj.oriAlpha !== UNDEF) {
          bgAlpha = colorObj.oriAlpha + '';
        }
      }
    }

    if ((0, _lib.pluck)(entityJSON.color, entityJSON.alpha, entityJSON.angle, entityJSON.ratio) !== UNDEF) {
      color = (0, _lib.pluck)(entityJSON.color, bgColor, entityOpts.fillColor);
      alpha = (0, _lib.pluck)(entityJSON.alpha, bgAlpha, entityOpts.fillAlpha);
      angle = (0, _lib.pluck)(entityJSON.angle, entityOpts.fillAngle);
      ratio = (0, _lib.pluck)(entityJSON.ratio, entityOpts.fillRatio);
      fillColor = colorize({
        color: color,
        alpha: alpha,
        angle: angle,
        ratio: ratio
      });
    } else {
      fillColorObject = colorize({
        color: (0, _lib.pluck)(bgColor, entityOpts.fillColor),
        alpha: (0, _lib.pluck)(bgAlpha, entityOpts.fillAlpha),
        angle: (0, _lib.pluck)(entityOpts.fillAngle),
        ratio: (0, _lib.pluck)(entityOpts.fillRatio)
      });
      emptyColorObject = colorize({
        color: (0, _lib.pluck)(entityOpts.nullEntityColor),
        alpha: (0, _lib.pluck)(entityOpts.nullEntityAlpha),
        angle: (0, _lib.pluck)(entityOpts.nullEntityAngle),
        ratio: (0, _lib.pluck)(entityOpts.nullEntityRatio)
      }); // If value is null then set empty color for entity

      fillColor = cleanValue === null ? emptyColorObject : fillColorObject;
      color = fillColor.FCcolor.color;
      alpha = fillColor.FCcolor.alpha;
      angle = fillColor.FCcolor.angle;
      ratio = fillColor.FCcolor.ratio;
    } // Need to re-check whether tooltip is to be shown for blank
    // tooltext


    if (toolText === BLANK) {
      conf.showTooltip = 0;
    }

    entityConf.visibleEntityAttr = {
      stroke: (0, _lib.convertColor)(borderColor, borderAlpha),
      fill: (entityConf.fillColor = fillColor).toString(),
      'fill-opacity': alpha / 100
    };
    alphaArr = alpha.split(COMMA); // if (borderThickness) {
    //     alphaArr.push(borderAlpha);
    // }

    entityConf.alphaArr = alphaArr;

    if (useHoverColor) {
      if ((0, _lib.pluck)(entityJSON.fillhovercolor, entityJSON.fillhoveralpha, entityJSON.fillhoverangle, entityJSON.fillhoverratio, entityJSON.hoverfillcolor, entityJSON.hoverfillalpha, entityJSON.hoverfillratio, entityJSON.hoverfillangle) !== UNDEF) {
        color = (0, _lib.pluck)(entityJSON.fillhovercolor, entityJSON.hoverfillcolor, entityOpts.hoverFillColor);
        alpha = (0, _lib.pluck)(entityJSON.fillhoveralpha, entityJSON.hoverfillalpha, entityOpts.hoverFillAlpha);
        angle = (0, _lib.pluck)(entityJSON.fillhoverangle, entityJSON.hoverfillangle, entityOpts.hoverFillAngle);
        ratio = (0, _lib.pluck)(entityJSON.fillhoverratio, entityJSON.hoverfillratio, entityOpts.hoverFillRatio);
        hoverColor = colorize({
          color: color,
          alpha: alpha,
          angle: angle,
          ratio: ratio
        });
      } else {
        if (!entityOpts.hoverColorObject) {
          entityOpts.hoverColorObject = colorize({
            color: entityOpts.hoverFillColor,
            alpha: entityOpts.hoverFillAlpha,
            angle: entityOpts.hoverFillAngle,
            ratio: entityOpts.hoverFillRatio
          });
        }

        hoverColor = entityOpts.hoverColorObject;
      }

      entityConf.hoverColor = hoverColor;
    } // Entity Label configurations


    !labelConfig && (labelConfig = entityItem.labelConfig = {});
    fontColor = entityConf.fontColor;
    fontFamily = entityConf.fontFamily;
    fontBold = entityConf.fontBold;
    toolText = entityConf.toolText;
    link = entityConf.link;

    if (labelAlignment) {
      // labelPadding neednt be scaleFactored.
      align = labelAlignment[0];
      valign = labelAlignment[1];
    } else {
      align = POSITION_CENTER;
      valign = POSITION_MIDDLE;
    }

    labelConfig.align = align;
    labelConfig.vAlign = valign;
    labelConfig.fontColor = fontColor;
    labelConfig.bgColor = entityConf.labelBgColor;
    labelConfig.borderColor = entityConf.labelBorderColor;
    labelConfig.fontFamily = fontFamily;
    labelConfig.fontBold = fontBold;
    labelConfig.toolText = toolText;
    labelConfig.link = link;

    if (typeof entityConf.options === 'object') {
      labels = entityConf.entityLabels = entityConf.entityLabels || [];
      oriLabels = entityConf.labels || [];
      i = oriLabels.length;

      while (i--) {
        if (!labels[i]) {
          labels[i] = {
            config: {}
          };
        }

        labelConfig = labels[i].config;
        labelAlignment = oriLabels[i].labelAlignment;

        if (labelAlignment) {
          // labelPadding neednt be scaleFactored.
          align = labelAlignment[0];
          valign = labelAlignment[1];
        } else {
          align = POSITION_CENTER;
          valign = POSITION_MIDDLE;
        }

        labelConfig.align = align;
        labelConfig.vAlign = valign;
        labelConfig.displayValue = dataset.getDisplayValue(entityItem, oriLabels[i], entityConf.options.isDataEnabled, !i, entityJSON);
        labelConfig.toolText = toolText;
        labelConfig.align = align;
        labelConfig.vAlign = valign;
        labelConfig.bgColor = entityConf.labelBgColor;
        labelConfig.borderColor = entityConf.labelBorderColor;
        labelConfig.fontColor = fontColor;
        labelConfig.fontFamily = fontFamily;
        labelConfig.fontBold = fontBold;
        labelConfig.toolText = toolText;
      }
    } else {
      labelObj = {
        shortText: entityConf.shortLabel,
        text: entityConf.label
      };
      labelConfig.displayValue = dataset.getDisplayValue(entityItem, labelObj, true, true, entityJSON);
    }
  }
  /**
   * Return display value of entity labels
   * @param {Object} entity entity item
   * @param {Object} labelObj [description]
   * @param {boolean} userValue whether to parse user value or not
   * @param {boolean} userDV whether to parse user display value or not
   * @param {Object} entityJSON raw JSON for entities
   * @return {string} display value of entity labels
   */
  ;

  _proto.getDisplayValue = function getDisplayValue(entity, labelObj, userValue, userDV, entityJSON) {
    var chart = this.getFromEnv('chart'),
        entityOpts = chart.config.entityOpts,
        entityConf = entity.config,
        cleanValue = entityConf.cleanValue,
        formattedValue = entityConf.formattedValue,
        labelSepChar = entityOpts.labelSepChar,
        displayValue; // Parsing display Value

    if (userValue) {
      if (userDV && typeof entityJSON.displayvalue !== 'undefined') {
        displayValue = entityJSON.displayvalue;
      } else {
        displayValue = (0, _lib.pluck)(entityOpts.includeNameInLabels ? entityOpts.useShortName ? labelObj.shortText : labelObj.text : '');

        if (entityOpts.includeValueInLabels && cleanValue !== null) {
          displayValue = displayValue === UNDEF ? formattedValue : displayValue + labelSepChar + formattedValue;
        }
      }
    } else {
      displayValue = entityConf.label;
    }

    return displayValue;
  }
  /**
   * Function that clears all entity options
   * @param {Object} options configuration object
   * @return {Object} configuration object
   */
  ;

  Entities._sanitizeEntityOptions = function _sanitizeEntityOptions(options) {
    delete options.outlines;
    delete options.label;
    delete options.shortlabel;
    delete options.labelposition;
    delete options.labelalignment;
    delete options.labelconnectors;
    return options;
  }
  /**
   * Redifines entities on update
   * @param {Object} entityDef entity definitions
   */
  ;

  _proto._redefineEntities = function _redefineEntities(entityDef) {
    var dataset = this,
        conf = dataset.config,
        chart = dataset.getFromEnv('chart'),
        redefinedEntities = {},
        processedIds = {},
        entities = chart.config.entities,
        useSNameAsId = conf.useSNameAsId,
        i,
        defObj,
        oldId,
        newId,
        sName,
        lName,
        id,
        newObj,
        entityCount = 0,
        entityStore,
        entityDataStore,
        item,
        entityObj;
    i = entityDef.length;

    while (i--) {
      defObj = entityDef[i];
      oldId = defObj.internalid;
      newId = defObj.newid ? defObj.newid : oldId;
      sName = defObj.sname;
      lName = defObj.lname;
      entityObj = entities[oldId];
      /**
                   * Handling the exception when the entity ids in the map js have an
                   * extra space (leading or trailing)
                   */

      oldId = (0, _lib.trimString)(oldId);
      newId = (0, _lib.trimString)(newId);
      newId = newId && newId.toLowerCase();

      if (entityObj) {
        redefinedEntities[newId] = newObj = {
          origId: oldId
        }; // processedIds is needed to keep track of all the entities
        // that have been redefined using the entitiydef block.

        processedIds[oldId] = true; // not using extend2 as it involves a deep copy of the objects.

        for (item in entityObj) {
          newObj[item] = entityObj[item];
        }

        newObj.shortLabel = sName || entityObj.shortLabel;
        newObj.label = lName || entityObj.label;
        newObj.showhovereffect = defObj.showhovereffect;
        newObj.fillhovercolor = defObj.fillhovercolor;
        newObj.fillhoveralpha = defObj.fillhoveralpha;
        newObj.fillhoverangle = defObj.fillhoverangle;
        newObj.fillhoverratio = defObj.fillhoverratio;
        newObj.borderhoverthickness = defObj.borderhoverthickness;
      }
    }

    entityDataStore = dataset.components.data;

    if (!entityDataStore) {
      entityDataStore = dataset.components.data = {};
    }

    for (id in redefinedEntities) {
      id = id.toLowerCase();

      if (!entityDataStore[id]) {
        entityDataStore[id] = {
          config: {}
        };
      }

      entityDataStore[id].config = redefinedEntities[id];
      entityCount += 1;
    }

    entityStore = entityDataStore;

    for (id in entities) {
      newObj = entities[id];
      /**
                   * Handling the exception when the entity ids in the map js have an
                   * extra space (leading or trailing)
                   */

      id = (0, _lib.trimString)(id);

      if (!processedIds[id]) {
        if (useSNameAsId) {
          entityObj = entityStore[newObj.shortLabel.toLowerCase()];

          if (!entityObj) {
            entityObj = entityStore[newObj.shortLabel.toLowerCase()] = {};
          }

          entityObj.config = {};
          entityObj.origId = newObj.shortLabel;
        } else {
          entityObj = entityStore[id.toLowerCase()];

          if (!entityObj) {
            entityObj = entityStore[id.toLowerCase()] = {};
          }

          entityObj.config = {};
          entityObj.config.origId = id;
        }

        for (item in newObj) {
          entityObj.config[item] = newObj[item];
        }

        entityCount += 1;
      }
    } // Entity count introduced to enable the batch rendering of entities.


    conf.entityCount = entityCount;
  }
  /**
   * Draws entities
   */
  ;

  _proto.draw = function draw() {
    var dataset = this,
        conf = dataset.config,
        chart = dataset.getFromEnv('chart'),
        // The rendering should be done in samll batches only for VML.
    // For SVG increase the batch size
    // @todo Determine the batchsize in a generalized way for all browsers instead of hardcoding it.
    BATCH_SIZE = _lib.hasSVG ? 200 : 10,
        doBatchRendering;
    dataset.createContainer();
    this.config.ready = false;
    conf.BATCH_SIZE = BATCH_SIZE;
    conf.labelBatchSize = _lib.hasSVG ? 200 : 20;
    doBatchRendering = this._batchRender();
    doBatchRendering(0);
    chart.config.entityFlag = true;
    chart.checkComplete();
  }
  /**
   * Renders large entities in a small chunk
   * @return {Function} draw entities batch wise
   */
  ;

  _proto._batchRender = function _batchRender() {
    var dataset = this,
        conf = dataset.config,
        chart = dataset.getFromEnv('chart'),
        // jobList = chart.getJobList(),
    firstEntity = chart.config.entities.firstEntity,
        // components = dataset.components,
    entities = dataset.components.data,
        batchSize = conf.BATCH_SIZE,
        keys = conf.entityKeys = firstEntity ? dataset._getKeys(firstEntity, entities) : Object.keys(entities),
        keysLength = conf.entityLength = keys.length,
        i,
        entityObj,
        count,
        ent,
        outlinesDrawn,
        drawEntities = function drawEntities(entityStartIndex) {
      i = entityStartIndex;
      count = 0; // To counter the performance issues while rendering in IE, the entities shall
      // be rendered in bat +ches of BATCH_SIZE.

      while (keys[i] !== UNDEF) {
        entityObj = entities[keys[i]];
        outlinesDrawn = dataset.drawEntity(entityObj, batchSize);
        count += outlinesDrawn;

        if (entityObj.config.drawn) {
          ent = i === keysLength - 1 ? entityObj : entities[keys[i - 1]];

          if (ent) {
            ent.config.drawn = false;
            ent.config.outlineStartIndex = UNDEF;
          }

          i++;
        }

        if (count >= batchSize) {
          dataset.addJob('entityDraw', drawEntities.bind(dataset, i), _schedular.priorityList.entitydraw);
          break;
        }
      }

      if (i === keysLength) {
        dataset._addEventListenersToEntities(0);

        dataset.initComplete();
      }
    };

    return drawEntities;
  }
  /**
   * Add event listeners to entities
   * @param {number} startIndex index of entity array
   */
  ;

  _proto._addEventListenersToEntities = function _addEventListenersToEntities(startIndex) {
    var dataset = this,
        entities = dataset.components.data,
        // chart = dataset.getFromEnv('chart'),
    // jobList = chart.getJobList(),
    conf = dataset.config,
        batchSize = conf.BATCH_SIZE,
        keys = conf.entityKeys,
        i,
        len = conf.entityLength,
        entity,
        count = 0,
        options,
        entityConf;

    for (i = startIndex; i < len; i++) {
      entity = entities[keys[i]];
      entityConf = entity.config;
      options = entityConf.options;

      if (!(options && options.isDataEnabled === false)) {
        dataset.addMouseGestures(entity);
      }

      count++;

      if (count === batchSize) {
        dataset.addJob('_addEventListenersToEntities', dataset._addEventListenersToEntities.bind(this, i), _schedular.priorityList.entitydraw);
        break;
      }
    }
  }
  /**
   * Fetch keys of entity object
   * @param {Object} firstEntity reference of starting entity object
   * @param {Array} entities array of entities
   * @return {Object} key of entity object
   */
  ;

  Entities._getKeys = function _getKeys(firstEntity, entities) {
    var keys = [firstEntity],
        item = firstEntity;

    while (entities[item]) {
      item = entities[item].nextId;
      keys.push(item);
    }

    return keys;
  }
  /**
   * Fetch default tooltip of entity
   * @param {Object} entity item
   * @param {Object} entityJSON raw entity JSON object
   * @return {string} tooltip string
   */
  ;

  _proto._getDefaultTooltip = function _getDefaultTooltip(entity, entityJSON) {
    var dataset = this,
        value = entity.config.cleanValue,
        formattedValue = entity.config.formattedValue,
        entityOpts = dataset.getFromEnv('chart').config.entityOpts,
        tooltip,
        labelObj;

    if (typeof entity.config.options === 'object') {
      labelObj = entityJSON.labels && entityJSON.labels[0];

      if (!labelObj) {
        return UNDEF;
      }

      tooltip = (entityOpts.useSNameInTooltip ? labelObj.shortText : labelObj.text) + (value === null ? BLANK : entityOpts.tooltipSepChar + formattedValue);
    } else {
      tooltip = (entityOpts.useSNameInTooltip ? entityJSON.shortLabel : entityJSON.label) + (value === null ? BLANK : entityOpts.tooltipSepChar + formattedValue);
    }

    return tooltip;
  }
  /**
   * Draws individual entity
   * @param {Object} entity individual entity object
   * @param {number} outlinesDrawCount number of outlines to be drawn
   * @return {number} count of entities drawn
   */
  ;

  _proto.drawEntity = function drawEntity(entity, outlinesDrawCount) {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        animationManager = chart.getFromEnv('animationManager'),
        // components = chart.components,
    // paper = dataset.getFromEnv('paper'),
    entityConf = entity.config,
        pathStr = _lib.hasSVG || !isIE ? 'litepath' : 'path',
        entityOpts = chart.config.entityOpts,
        outlines = entityConf.outlines,
        toolTipController = dataset.getFromEnv('toolTipController'),
        addTo = this.getLinkedParent().getChildContainer('plot'),
        shadowGroup = this.getLinkedParent().getChildContainer('plotShadow'),
        toolText = entityConf.toolText,
        showShadow = entityOpts.shadow,
        i,
        outlinePath = [],
        path,
        visibleEntityAttr,
        // fillOpacity,
    applyAttr,
        outlineGraphics,
        outline,
        count,
        customStrokeWidthModifier,
        finalAttr = {},
        shadowOptions;

    dataset._configureEntityDrawingParams(entity);

    entityConf = entity.config;
    visibleEntityAttr = entityConf.visibleEntityAttr;
    shadowOptions = entityConf.shadowOptions; // fillOpacity = entityConf.fillOpacity;

    i = entityConf.outlineStartIndex === UNDEF ? outlines.length : entityConf.outlineStartIndex;

    if (!entity.graphics) {
      entity.graphics = {};
    }

    count = 0;
    outlinePath = entityConf.outlinePath || (entityConf.outlinePath = []);
    customStrokeWidthModifier = entityConf.customStrokeWidthModifier;

    if (typeof entityConf.options === 'object') {
      while (i--) {
        outlinePath = outlines[i].outline;

        if (entityConf.options.isDataEnabled === true) {
          applyAttr = visibleEntityAttr;
        } else {
          applyAttr = (0, _lib.extend2)((0, _lib.extend2)({}, visibleEntityAttr), pruneStrokeAttrs(outlines[i].style, customStrokeWidthModifier));
        }

        outlineGraphics = entity.graphics.outlines;

        if (!outlineGraphics) {
          outlineGraphics = entity.graphics.outlines = [];
        }

        !outlineGraphics[i] && (outlineGraphics[i] = {});
        outline = outlineGraphics[i].outline; // if (!outline) {
        //   outline = outlineGraphics[i].outline = paper[pathStr](outlinePath, addTo);
        // }

        applyAttr[pathStr] = outlinePath;
        outline = outlineGraphics[i].outline = animationManager.setAnimation({
          el: pathStr,
          container: addTo,
          attr: applyAttr,
          component: dataset,
          label: 'path'
        });
        outline.shadow(showShadow ? shadowOptions : false, shadowGroup);
        toolTipController.enableToolTip(outline, toolText);
        count++;
        entityConf.outlineStartIndex = i;

        if (count === outlinesDrawCount) {
          return count;
        }
      }

      entityConf.drawn = true;
      return count;
    }

    while (i--) {
      path = outlines[i];
      outlinePath = path.concat(outlinePath);
      count++;
      entityConf.outlineStartIndex = i;

      if (count === outlinesDrawCount) {
        entityConf.outlinePath = outlinePath;
        return count;
      }
    }

    !entity.graphics.outlines && (visibleEntityAttr[pathStr] = outlinePath);
    Object.assign(finalAttr, visibleEntityAttr, entity.hidden && {
      'fill-opacity': 0
    } || {});
    entity.graphics.outlines = animationManager.setAnimation({
      el: entity.graphics.outlines || pathStr,
      container: addTo,
      attr: finalAttr,
      component: dataset,
      label: 'path'
    }); // entity.graphics.outlines = paper[pathStr](outlinePath, addTo)
    //   .attr(visibleEntityAttr);
    // entity.graphics.outlines.attr({
    //   'fill-opacity': 0,
    //   'stroke-opacity': 0
    // });

    entityConf.drawn = true;
    entityConf.outlineStartIndex = 0;
    entityConf.outlinePath = [];
    entity.graphics.outlines.shadow(showShadow ? shadowOptions : false, shadowGroup);
    toolTipController.enableToolTip(entity.graphics.outlines, toolText);
    return count;
  }
  /**
   * Configure graphics attributes of entities
   * @param {Object} entity individual entity object
   */
  ;

  _proto._configureEntityDrawingParams = function _configureEntityDrawingParams(entity) {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        entityConf = entity.config,
        entityOpts = chart.config.entityOpts,
        scalingParams = chart.config.scalingParams,
        scaleStrokes = !isIE || _lib.hasSVG,
        scaleFactor = scalingParams.scaleFactor,
        scaledPixel = scalingParams.strokeWidth,
        scaledPixelWithBaseFactor = (scaleStrokes ? chart.baseScaleFactor : 1) * scaledPixel,
        scaleBorder = entityOpts.scaleBorder === 1,
        borderThickness = entityConf.borderThickness,
        alphaArr = entityConf.alphaArr,
        connectorThickness = entityConf.origConnectorThickness,
        hoverBorderThickness = entityConf.hoverBorderThickness,
        visibleEntityAttr = entityConf.visibleEntityAttr,
        fillOpacity = visibleEntityAttr['fill-opacity'],
        customStrokeWidthModifier;
    entityConf.shadowOptions = {
      scalefactor: [scaleFactor, scaleFactor * chart.config.baseScaleFactor],
      opacity: mathMax.apply(math, alphaArr) / 100,
      useFilter: 0
    };
    entityConf.fillOpacity = entity.hidden ? 0 : fillOpacity; // By default scaleBorder is false.

    if (scaleStrokes) {
      // SVG
      borderThickness = entityConf.entityBorderThickness = scaleBorder ? borderThickness * scaledPixelWithBaseFactor : borderThickness / scaleFactor;
      connectorThickness = connectorThickness / scaleFactor;
      customStrokeWidthModifier = scaleBorder ? scaleFactor : scalingParams.sFactor;

      if (hoverBorderThickness) {
        hoverBorderThickness = entityConf.hoverBorderThickness = scaleBorder ? hoverBorderThickness * scaledPixelWithBaseFactor : hoverBorderThickness / scaleFactor;
      } // if (isWebKit) {
      // webkit issue fix
      //     borderThickness = (borderThickness && mathCeil(borderThickness)) || 0;
      //     connectorThickness = (connectorThickness && mathCeil(connectorThickness)) || 0;
      // }

    } else {
      // VML
      borderThickness = scaleBorder ? borderThickness * scaledPixel : borderThickness;
      customStrokeWidthModifier = scaleBorder ? scalingParams.scaleFactor : chart.baseScaleFactor;
    }

    entityConf.entityBorderThickness = borderThickness;
    entityConf.connectorThickness = connectorThickness;
    entityConf.customStrokeWidthModifier = customStrokeWidthModifier;
    visibleEntityAttr['stroke-width'] = borderThickness;
    visibleEntityAttr.transform = _lib.hasSVG || !isIE ? '' : scalingParams.transformStr;
  }
  /**
   * Draw entity labels
   * @param {Object} ent entity item
   * @param {Object} dataset Entity dataset component
   */
  ;

  _proto.drawLabels = function drawLabels(ent) {
    var dataset = this,
        itemMap = ent,
        chart = dataset.getFromEnv('chart'),
        conf = dataset.config,
        batchSize = conf.labelBatchSize,
        keysLength = conf.entityLength,
        labelItems = [],
        i,
        j,
        annGroupElem = chart.getChildContainer('upperAnnotationGroup'),
        groupItems,
        annObj,
        annCount = 0,
        mapLabelAnnotations = dataset.getChildren('mapLabelAnnotations') && dataset.getChildren('mapLabelAnnotations')[annCount],
        count = 0,
        labelItemsAdded = 0,
        annConfig = chart.config.annotationConfig;

    if (!mapLabelAnnotations) {
      annObj = new _extAnnotation.default();
      dataset.attachChild(annObj, 'mapLabelAnnotations');
      mapLabelAnnotations = dataset.getChildren('mapLabelAnnotations')[annCount];
      mapLabelAnnotations.addCustomGroup(annGroupElem);
    }

    mapLabelAnnotations.destroy();
    mapLabelAnnotations._renderer && (mapLabelAnnotations._renderer = null); // Entity objects should be shown above plots by default

    annConfig.showbelow = 0;

    for (i in itemMap) {
      dataset.drawLabel(itemMap[i], labelItems);
      count++;

      if (count === batchSize) {
        // Set the label of entity labels
        for (j = 0; j < labelItems.length; j++) {
          labelItems[j].animationLabel = ENTITYLABEL;
        }

        groupItems = mapLabelAnnotations.addGroup(Object.assign(annConfig, {
          id: 'entityLabels' + annCount,
          items: labelItems,
          animationLabel: 'entityLabelGroup'
        }), dataset); // chart.config.labelsOnTop && mapLabelAnnotations.getContainer('entityLabels' + annCount).toFront();

        for (j = 0; j < groupItems.items.length; j++) {
          groupItems.items[j].addEventListener('fc-mouseover', labelItems[j].onmouseover);
          groupItems.items[j].addEventListener('fc-mouseout', labelItems[j].onmouseout);
          groupItems.items[j].addEventListener('fc-click', labelItems[j].onclick);
        }

        annCount++;
        mapLabelAnnotations = dataset.getChildren('mapLabelAnnotations') && dataset.getChildren('mapLabelAnnotations')[annCount];

        if (!mapLabelAnnotations) {
          annObj = new _extAnnotation.default();
          dataset.attachChild(annObj, 'mapLabelAnnotations');
          mapLabelAnnotations = dataset.getChildren('mapLabelAnnotations')[annCount];
          mapLabelAnnotations.addCustomGroup(annGroupElem);
        }

        mapLabelAnnotations.destroy();
        mapLabelAnnotations._renderer && (mapLabelAnnotations._renderer = null);
        count = 0;
        labelItems = [];
      } else if (labelItemsAdded === keysLength - 1) {
        // Set the labels of entity labels
        for (j = 0; j < labelItems.length; j++) {
          labelItems[j].animationLabel = ENTITYLABEL;
        }

        groupItems = mapLabelAnnotations.addGroup(Object.assign(annConfig, {
          id: 'entityLabels' + annCount,
          items: labelItems,
          animationLabel: 'entityLabelGroup'
        }), dataset); // chart.config.labelsOnTop && mapLabelAnnotations.getContainer('entityLabels' + annCount).toFront();

        for (j = 0; j < groupItems.items.length; j++) {
          groupItems.items[j].addEventListener('fc-mouseover', labelItems[j].onmouseover);
          groupItems.items[j].addEventListener('fc-mouseout', labelItems[j].onmouseout);
          groupItems.items[j].addEventListener('fc-click', labelItems[j].onclick);
        }
      }

      labelItemsAdded++;
    }

    dataset.drawLabelConnFn(0);
  }
  /**
   * Draw label connectors
   * @param {number} startIndex starting index of entity
   */
  ;

  _proto.drawLabelConnFn = function drawLabelConnFn(startIndex) {
    var dataset = this,
        conf = dataset.config,
        // chart = dataset.getFromEnv('chart'),
    // jobList = chart.getJobList(),
    entities = dataset.components.data,
        batchSize = conf.BATCH_SIZE,
        keys = conf.entityKeys,
        l,
        i,
        length = keys.length,
        labelArr,
        config,
        entity,
        count = 0;

    for (i = startIndex; i < length; i++) {
      entity = entities[keys[i]];
      config = entity.config;

      if (typeof config.options === 'object') {
        labelArr = config.labels;
        l = labelArr && labelArr.length || 0;

        while (l--) {
          if (labelArr[l].labelConnectors) {
            dataset.drawLabelConnectors(entity, labelArr[l].labelConnectors, dataset);
            count++;
          }
        }
      } else {
        if (config.labelConnectors) {
          dataset.drawLabelConnectors(entity, config.labelConnectors, dataset);
          count++;
        }
      }

      if (count === batchSize) {
        dataset.addJob('drawLabelConnectors', dataset.drawLabelConnFn.bind(this, i), _schedular.priorityList.entitydraw);
        break;
      }
    }
  }
  /**
   * Return the label object to feed annotation
   * @param {Object} entity item
   * @param {number} index index of entities
   * @param {boolean} userValue determines whether to parse user value
   * @return {Object} individual label object
   */
  ;

  _proto._getLabelObject = function _getLabelObject(entity, index, userValue) {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        chartAttrs = dataset.getFromEnv('chart-attrib'),
        entityConf = entity.config,
        labelConfig,
        scalingParams = chart.config.scalingParams,
        labelPos,
        labelAlignment,
        firstEle = entity.graphics && entity.graphics.outlines,
        fontStyleObj,
        fontSize = entityConf.fontSize,
        labelPadding = entityConf.labelPadding,
        labelsArr = entityConf.labels || [],
        entityLabels = entityConf.entityLabels || [],
        baseWidth,
        baseHeight,
        labelX,
        labelY,
        box,
        align,
        valign,
        fsize,
        xOffset,
        yOffset,
        oriLabelObj,
        labelObj;

    if (index !== UNDEF) {
      oriLabelObj = labelsArr[index];
      labelObj = entityLabels[index];
      labelConfig = labelObj.config;
      fontStyleObj = labelConfig.style = oriLabelObj.style;
      labelPos = oriLabelObj.labelPosition;
      labelAlignment = oriLabelObj.labelAlignment;
    } else {
      labelConfig = entity.labelConfig;
      labelPos = entityConf.labelPosition;
      labelAlignment = entityConf.labelAlignment;
    }

    if (labelPos) {
      labelX = labelPos[0];
      labelY = labelPos[1];
    } else {
      box = firstEle.getBBox();
      labelX = box.x + box.width / 2;
      labelY = box.y + box.height / 2;
    }

    if (labelAlignment) {
      // labelPadding neednt be scaleFactored.
      align = labelAlignment[0];
      valign = labelAlignment[1];

      if (align === POSITION_RIGHT) {
        labelX -= labelPadding;
      } else if (align === POSITION_LEFT) {
        labelX += labelPadding;
      }

      if (valign === POSITION_TOP) {
        labelY -= labelPadding;
      } else if (valign === POSITION_BOTTOM) {
        labelY += labelPadding;
      }
    } else {
      align = POSITION_CENTER;
      valign = POSITION_MIDDLE;
    }

    fsize = parseFloat(fontSize) / scalingParams.sFactor;

    if (!userValue && fontStyleObj) {
      /** @todo change fill property to color as for fonts fill is non-standard */
      fontStyleObj.color && (labelConfig.fontColor = fontStyleObj.color);
      fontStyleObj['font-size'] && (fsize = parseFloat(fontStyleObj['font-size']) / scalingParams.sFactor);
      fontStyleObj['font-family'] && (labelConfig.fontFamily = fontStyleObj['font-family']);
      fontStyleObj['font-weight'] !== UNDEF && (labelConfig.fontBold = fontStyleObj['font-weight'] === 'bold');
    }

    labelConfig.x = labelX.toString();
    labelConfig.y = labelY.toString();
    labelConfig.wrap = 1;
    labelConfig.type = TEXT_STR;
    labelConfig.fontSize = fsize;
    return {
      x: labelX.toString(),
      y: labelY.toString(),
      wrapwidth: getTextWrapWidth[align](baseWidth, labelX + xOffset) - labelPadding,
      wrapheight: getTextWrapHeight[valign](baseHeight, labelY + yOffset) - labelPadding,
      wrap: 1,
      type: 'text',
      align: labelConfig.align,
      valign: labelConfig.vAlign,
      text: labelConfig.displayValue,
      tooltext: labelConfig.toolText,
      outlineText: (0, _lib.pluckNumber)(chartAttrs.textoutline, 0),
      // link: labelConfig.link,
      css: labelConfig.link !== UNDEF && {
        cursor: 'pointer',
        '_cursor': 'hand'
      },
      bgcolor: labelConfig.bgColor,
      bordercolor: labelConfig.borderColor,
      fillcolor: labelConfig.fontColor,
      fontsize: labelConfig.fontSize,
      font: labelConfig.fontFamily,
      bold: labelConfig.fontBold,
      onclick: function onclick(e) {
        var hoverEnt = entity.graphics.outlines,
            i,
            len; // In some maps outline graphics is an array of elements for example - usmsa map

        if (hoverEnt instanceof Array) {
          for (i = 0, len = hoverEnt.length; i < len; i++) {
            dataset.entityClick(hoverEnt[i].outline, e);
          }
        } else {
          dataset.entityClick(hoverEnt, e);
        }
      },
      onmouseover: function onmouseover(e) {
        var hoverEnt = entity.graphics.outlines,
            i,
            len; // In some maps outline graphics is an array of elements for example - usmsa map

        if (hoverEnt instanceof Array) {
          for (i = 0, len = hoverEnt.length; i < len; i++) {
            dataset.entityRollOver(hoverEnt[i].outline, e);
          }
        } else {
          dataset.entityRollOver(hoverEnt, e);
        }
      },
      onmouseout: function onmouseout(e) {
        var hoverEnt = entity.graphics.outlines,
            i,
            len; // In some maps outline graphics is an array of elements for example - usmsa map

        if (hoverEnt instanceof Array) {
          for (i = 0, len = hoverEnt.length; i < len; i++) {
            dataset.entityRollOut(hoverEnt[i].outline, e);
          }
        } else {
          dataset.entityRollOut(hoverEnt, e);
        }
      },
      ontouchstart: function ontouchstart(e) {
        var hoverEnt = entity.graphics.outlines,
            i,
            len; // In some maps outline graphics is an array of elements for example - usmsa map

        if (hoverEnt instanceof Array) {
          for (i = 0, len = hoverEnt.length; i < len; i++) {
            dataset.entityRollOver(hoverEnt[i].outline, e);
          }
        } else {
          dataset.entityRollOver(hoverEnt, e);
        }

        dataset.entityRollOver(hoverEnt, e);
      }
    };
  }
  /**
   * Draw labels using annotaion
   * @param {Object} entity entity item
   * @param {Array} annotationsArray annotation array for labels
   */
  ;

  _proto.drawLabel = function drawLabel(entity, annotationsArray) {
    var dataset = this,
        config = entity.config,
        showLabel = config.showLabel,
        useValue,
        i,
        labelArr;

    if (!showLabel) {
      return;
    }

    if (typeof config.options === 'object') {
      labelArr = config.labels;
      i = labelArr && labelArr.length || 0;
      useValue = config.options.isDataEnabled;

      while (i--) {
        annotationsArray.push(dataset._getLabelObject(entity, i, useValue, !i));
      }
    } else {
      annotationsArray.push(dataset._getLabelObject(entity, UNDEF, true, true));
    }
  }
  /**
   * Draw label connectors
   * @param {Object} entity entity item
   * @param {Array} connectorArr datalabel connector array
   * @param {Object} dataSet entity dataset object
   */
  ;

  _proto.drawLabelConnectors = function drawLabelConnectors(entity, connectorArr, dataSet) {
    var entityConf = entity.config,
        dataset = this,
        chart = dataset.getFromEnv('chart'),
        animationManager = chart.getFromEnv('animationManager'),
        // paper = dataset.getFromEnv('paper'),
    scalingParams = chart.config.scalingParams,
        datasetGroup = dataSet.getLinkedParent().getChildContainer('plot'),
        i = connectorArr && connectorArr.length || 0,
        connElem,
        path,
        showLabel = entityConf.showLabel;

    while (i--) {
      path = connectorArr[i];
      connElem = entity.graphics.connectorElem;

      if (showLabel) {
        entity.graphics.connectorElem = connElem = animationManager.setAnimation({
          el: entity.graphics.connectorElem || 'path',
          attr: {
            path: path,
            opacity: 1,
            transform: _lib.hasSVG || !isIE ? '' : scalingParams.transformStr,
            stroke: (0, _lib.convertColor)(entityConf.connectorColor, entityConf.connectorAlpha),
            'shape-rendering': CRISP,
            'stroke-width': entityConf.connectorThickness
          },
          container: datasetGroup,
          component: dataset,
          label: 'labelConnectors'
        });
      } else {
        connElem && connElem.hide();
      }
    }
  }
  /**
   * Handler function for entity click
   * @param {Object} entityElem entity graphic
   * @param {Event} e click event
   */
  ;

  _proto.entityClick = function entityClick(entityElem, e) {
    var entity = entityElem.node.__entity,
        dataset = this,
        chart = dataset.getFromEnv('chart'),
        scalingParams = chart.config.scalingParams,
        entityBox = entityElem.getBBox(),
        linkClickFN = chart.getFromEnv('linkClickFN'),
        config = entity.config,
        link = config.link;
    entityBox.width = entityBox.width * scalingParams.scaleFactor;
    entityBox.height = entityBox.height * scalingParams.scaleFactor;
    entityBox.x = entityBox.x * scalingParams.scaleFactor + scalingParams.translateX;
    entityBox.y = entityBox.y * scalingParams.scaleFactor + scalingParams.translateY;
    entityBox.x2 = entityBox.x + entityBox.width;
    entityBox.y2 = entityBox.y + entityBox.height;
    chart.fireChartInstanceEvent('entityclick', config.eventArgs, e);

    if (link !== UNDEF) {
      linkClickFN.call({
        link: link,
        entity: entity,
        entityBox: entityBox
      }, true);
    }
  }
  /**
   * Handler function for entity mouse roll over
   * @param {Object} entityElem entity graphic
   * @param {Event} e mouse roll over event
   */
  ;

  _proto.entityRollOver = function entityRollOver(entityElem, e) {
    var entity = entityElem.node.__entity,
        dataset = this,
        config = entity.config,
        chart = dataset.getFromEnv('chart'),
        animationManager = chart.getFromEnv('animationManager'),
        hoverAttr = config.hoverAttr;
    chart.plotEventHandler(entityElem, e, 'entityRollOver');

    if (entityElem.data('hovered')) {
      clearTimeout(entity.config.timer);
    } else {
      if (config.useHoverColor && config.isVisible && !entity.hidden && hoverAttr) {
        chart.config.hoverEntity = entityElem; // Highlight hovered entity with fade animation

        animationManager.setAnimation({
          el: entityElem,
          attr: hoverAttr,
          component: dataset,
          state: 'updating',
          label: 'path'
        });
        entityElem.data('hovered', true);
      }
    }
  }
  /**
   * Handler function for entity mouse roll out
   * @param {Object} entityElem entity graphic
   * @param {Event} e mouse roll out event
   */
  ;

  _proto.entityRollOut = function entityRollOut(entityElem, e) {
    var entity = entityElem.node.__entity,
        dataset = this,
        hidden,
        chart = dataset.getFromEnv('chart'),
        animationManager = chart.getFromEnv('animationManager'),
        config = entity.config,
        revertAttr = config.revertAttr;
    chart.plotEventHandler(entityElem, e, 'entityRollOut'); // global.raiseEvent('entityRollOut', eventArgs, chart.chartInstance);

    entity.config.timer = setTimeout(function () {
      hidden = entity.hidden;

      if (hidden !== true && revertAttr) {
        // Remove highlight from entitiy
        animationManager.setAnimation({
          el: entityElem,
          attr: revertAttr,
          component: dataset,
          state: 'updating',
          label: 'path'
        });
        entityElem.data('hovered', false);
      }
    }, 100);
  }
  /**
   * Function to capture mouse activities
   * @param {Object} entity entity item
   * @memberof Entities
   */
  ;

  _proto.addMouseGestures = function addMouseGestures(entity) {
    var config = entity.config,
        originalId = config.originalId,
        dataset = this,
        graphics = entity.graphics,
        useHoverColor = config.useHoverColor,
        hoverBorderThickness = config.hoverBorderThickness,
        hoverBorderColor = config.hoverBorderColor,
        hoverBorderAlpha = config.hoverBorderAlpha,
        borderThickness = config.entityBorderThickness,
        borderColor = config.borderColor,
        borderAlpha = config.borderAlpha,
        link = config.link,
        visibleEntityAttr = config.visibleEntityAttr,
        groupId = 'groupId' + originalId,
        item,
        i,
        graphic,
        len,
        outlines,
        bindListener = function bindListener(graphicEle) {
      if (link !== UNDEF) {
        graphicEle.css({
          cursor: 'pointer',
          '_cursor': 'hand'
        });
      }

      graphicEle.data('eventArgs', config.eventArgs);
      graphicEle.data('groupId', groupId);
      graphicEle.node.__entity = entity; // If listeners are not binded

      if (!entity._listenersBinded) {
        graphicEle.on('fc-click', dataset.entityClick.bind(dataset, graphicEle)).hover(dataset.entityRollOver.bind(dataset, graphicEle), dataset.entityRollOut.bind(dataset, graphicEle));
      }
    };

    config.eventArgs = {
      value: config.cleanValue,
      label: config.label,
      shortLabel: config.shortLabel,
      originalId: config.origId,
      id: config.id || config.origId
    };
    config.legacyEventArgs = {
      value: config.value,
      lName: config.label,
      sName: config.shortLabel,
      id: config.originalId || config.id
    };

    if (useHoverColor) {
      config.hoverAttr = {
        fill: (0, _lib.toRaphaelColor)(config.hoverColor)
      };
      config.revertAttr = {
        fill: (0, _lib.toRaphaelColor)(config.fillColor),
        stroke: (0, _lib.toRaphaelColor)(config.borderColor, config.borderAlpha)
      };
      config.revertAttr['fill-opacity'] = visibleEntityAttr['fill-opacity'];

      if (hoverBorderThickness !== borderThickness) {
        config.hoverAttr['stroke-width'] = (0, _lib.pluckNumber)(hoverBorderThickness, borderThickness);
        config.revertAttr['stroke-width'] = borderThickness;
      }
      /* @todo: Enable once the drawing of entities allows these
                   * hover effects to be applied properly.
                   */


      if (hoverBorderColor !== borderColor || hoverBorderAlpha !== borderAlpha) {
        config.hoverAttr.stroke = (0, _lib.convertColor)(hoverBorderColor, hoverBorderAlpha);
        config.revertAttr.stroke = (0, _lib.convertColor)(borderColor, borderAlpha);
      }
    }

    for (item in graphics) {
      if (graphics.hasOwnProperty(item)) {
        if (graphics[item] instanceof Array) {
          outlines = graphics[item];

          for (i = 0, len = outlines.length; i < len; i++) {
            graphic = outlines[i].outline;
            bindListener(graphic);
          }

          entity._listenersBinded = true;
        } else {
          graphic = graphics[item];
          bindListener(graphic);
          entity._listenersBinded = true;
        }
      }
    }
  }
  /**
   * Function which returns the upper and lower data limits.
   * @return {Object} containing the upper and lower data bounds
   * @memberof Entities
   */
  ;

  _proto.getDataLimits = function getDataLimits() {
    var dataset = this,
        conf = dataset.config;
    return {
      max: conf.max,
      min: conf.min
    };
  };

  _proto.createContainer = function createContainer() {
    var dataset = this,
        parent = dataset.getLinkedParent(),
        animationManager = dataset.getFromEnv('animationManager'),
        pContainer = parent.getChildContainer('layer0');
    !dataset.getChildContainer('abovePlotGroup') && dataset.addChildContainer('abovePlotGroup', animationManager.setAnimation({
      el: 'group',
      attr: {
        name: 'abovePlotGroup',
        opacity: 1
      },
      container: pContainer,
      component: dataset,
      label: 'group'
    }));
    !dataset.getChildContainer('belowPlotGroup') && dataset.addChildContainer('belowPlotGroup', animationManager.setAnimation({
      el: 'group',
      attr: {
        name: 'belowPlotGroup',
        opacity: 1
      },
      container: pContainer,
      component: dataset,
      label: 'group'
    }));
  }
  /**
   * Function to check whether drawing of labels is complete
   *
   * @memberof Entities
   */
  ;

  _proto.initComplete = function initComplete() {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        entities = dataset.components.data;
    this.drawLabels(entities);
    chart.config.entitiesReady = true;
    chart.checkComplete();
  };

  return Entities;
}(_componentInterface.ComponentInterface);

var _default = Entities;
exports["default"] = _default;

/***/ }),

/***/ 1651:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _componentInterface = __webpack_require__(290);

var _lib = __webpack_require__(274);

var _dependencyManager = __webpack_require__(282);

var _mapEntities = _interopRequireDefault(__webpack_require__(1649));

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var configureChildren = function configureChildren(child) {
  child.configure && child.configure();
};

(0, _dependencyManager.addDep)({
  name: 'mapsAnimation',
  type: 'animationRule',
  extension: _mapEntities.default
});
/**
 * Class to create Maps group
 */

var MapGroup = /*#__PURE__*/function (_ComponentInterface) {
  (0, _inheritsLoose2.default)(MapGroup, _ComponentInterface);

  function MapGroup() {
    return _ComponentInterface.apply(this, arguments) || this;
  }

  var _proto = MapGroup.prototype;

  /**
   * Returns type of chart
   * @return {string} class type
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
    return 'mapGroup';
  }
  /**
   * function to configure this manager
   */
  ;

  _proto.configure = function configure() {
    var manager = this;

    manager._mapChildren(configureChildren);
  }
  /**
   * Create child containers
   */
  ;

  _proto.createContainer = function createContainer() {
    var manager = this,
        parent = manager.getLinkedParent(),
        animationManager = manager.getFromEnv('animationManager'),
        pContainer,
        parentChildContainers = parent.getChildContainer();
    pContainer = parentChildContainers.plotGroup;
    !manager.getChildContainer('plotShadow') && manager.addChildContainer('plotShadow', animationManager.setAnimation({
      el: 'group',
      attr: {
        name: 'manager-plot-shadow',
        opacity: 1
      },
      container: pContainer,
      component: manager,
      label: 'group'
    }));
    !manager.getChildContainer('plot') && manager.addChildContainer('plot', animationManager.setAnimation({
      el: 'group',
      attr: {
        name: 'manager-plot',
        opacity: 1
      },
      container: pContainer,
      component: manager,
      label: 'group'
    }));
    !manager.getChildContainer('layer0') && manager.addChildContainer('layer0', animationManager.setAnimation({
      el: 'group',
      attr: {
        name: 'ann-layer0',
        opacity: 1
      },
      container: parentChildContainers.abovePlotGroup,
      component: manager,
      label: 'group'
    }));
    !manager.getChildContainer('layer1') && manager.addChildContainer('layer1', animationManager.setAnimation({
      el: 'group',
      attr: {
        name: 'ann-layer1',
        opacity: 1
      },
      container: parentChildContainers.abovePlotGroup,
      component: manager,
      label: 'group'
    }));

    if (parent.config.labelsOnTop) {
      manager.getChildContainer('layer0').toFront();
    } else {
      manager.getChildContainer('layer0').toBack();
    }
  }
  /**
   * Transforms entity group
   */
  ;

  _proto._transformGroup = function _transformGroup() {
    var manager = this,
        chart = this.getFromEnv('chart'),
        chartInstance = chart.getFromEnv('chartInstance'),
        animationManager = manager.getFromEnv('animationManager'),
        // dataset = chart.getDatasets(),
    jsonData = chart.jsonData,
        plotGroup = manager.getChildContainer('plot'),
        plotShadowGroup = manager.getChildContainer('plotShadow'),
        scalingParams = chart.config.scalingParams,
        transformGroup = function transformGroup() {
      return function (event) {
        // eslint-disable-line good-practices/no-function-dependency
        // let clickedElemScaleParams,
        // transformStr,
        // clickedElementBox;
        event.detachHandler(); // one time

        if (_lib.hasSVG) {
          if (chartInstance.args.link && chartInstance.args.clickedEntityBox && jsonData.chart.linkedcharttransition === 'scale') {
            // clickedElementBox = chartInstance.args.clickedEntityBox;
            // clickedElemScaleParams = chart.getScalingParameters(
            //   chart.baseWidth,
            //   chart.baseHeight,
            //   clickedElementBox.width,
            //   clickedElementBox.height);
            // transformStr = ['t',
            //   clickedElementBox.x,
            //   ',',
            //   clickedElementBox.y,
            //   's',
            //   clickedElemScaleParams.scaleFactor,
            //   ',',
            //   clickedElemScaleParams.scaleFactor,
            //   ',0,0'].join('');
            // plotGroup && animationManager.setAnimation({
            //   el: plotGroup,
            //   attr: {
            //     transform: transformStr
            //   },
            //   component: manager,
            //   state: 'appearing',
            //   label: 'group'
            // });
            // // plotGroup && plotGroup.attr({
            // //   transform: transformStr
            // // });
            // plotShadowGroup && animationManager.setAnimation({
            //   el: plotShadowGroup,
            //   attr: {
            //     transform: transformStr
            //   },
            //   component: manager,
            //   state: 'appearing',
            //   label: 'group'
            // });
            plotGroup && animationManager.setAnimation({
              el: plotGroup,
              attr: {
                transform: scalingParams.transformStr
              },
              component: manager,
              label: 'group'
            });
            plotShadowGroup && animationManager.setAnimation({
              el: plotShadowGroup,
              attr: {
                transform: scalingParams.transformStr
              },
              component: manager,
              label: 'group'
            }); // plotShadowGroup && plotShadowGroup.attr({
            //   transform: transformStr
            // });
            // plotGroup && plotGroup.attr({
            //   transform: scalingParams.transformStr
            // });
            // plotShadowGroup && plotShadowGroup.attr({
            //   transform: scalingParams.transformStr
            // });
          } else {
            plotGroup && animationManager.setAnimation({
              el: plotGroup,
              attr: {
                transform: scalingParams.transformStr
              },
              component: manager,
              label: 'group'
            }); // plotGroup && plotGroup.attr({
            //   transform: scalingParams.transformStr
            // });

            plotShadowGroup && animationManager.setAnimation({
              el: plotShadowGroup,
              attr: {
                transform: scalingParams.transformStr
              },
              component: manager,
              label: 'group'
            }); // plotShadowGroup && plotShadowGroup.attr({
            //   transform: scalingParams.transformStr
            // });
          }
        } // Show the dataset's shadow layers for both VML and SVG


        plotGroup.show();
        plotShadowGroup.show();
      };
    }; // i;
    // Initially set the opacity of the shadow group to zero
    // plotShadowGroup.attr({
    //   opacity: 0
    // });
    // plotShadowGroup && animationManager.setAnimation({
    //   el: plotShadowGroup,
    //   attr: {
    //     opacity: 0
    //   },
    //   component: manager,
    //   state: 'appearing',
    //   label: 'group'
    // });


    plotGroup.hide();
    plotShadowGroup.hide();
    chart.config.entitiesReady = false;
    chartInstance.addEventListener('internal.mapdrawingcomplete', transformGroup());
    chart.checkComplete();
  }
  /**
   * function call sync draw of its children
   */
  ;

  _proto.draw = function draw() {
    this.createContainer();

    this._transformGroup();
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
      if (child.getState('removed') || child.getState('visible') === false) {
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
  };

  return MapGroup;
}(_componentInterface.ComponentInterface);

var _default = MapGroup;
exports["default"] = _default;

/***/ }),

/***/ 1650:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _entities = _interopRequireDefault(__webpack_require__(1648));

var _kdtree = _interopRequireDefault(__webpack_require__(724));

var _extAnnotation = _interopRequireDefault(__webpack_require__(387));

var _dependencyManager = __webpack_require__(282);

var _mapEntities = _interopRequireDefault(__webpack_require__(1649));

var _lib = __webpack_require__(274);

var _eventApi = __webpack_require__(281);

var _schedular = __webpack_require__(286);

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var UNDEF,
    BLANK = '',
    POSITION_TOP = 'top',
    POSITION_BOTTOM = 'bottom',
    POSITION_RIGHT = 'right',
    POSITION_LEFT = 'left',
    POSITION_MIDDLE = 'middle',
    POSITION_CENTER = 'center',
    LINE_STR = 'line',
    TEXT_STR = 'text',
    POLYGON_STR = 'polygon',
    ACR_STR = 'arc',
    CIRCLE_STR = 'circle',
    CENTER_STR = 'center',
    INNERRADIUSFACTOR = 0.6,
    math = window.Math,
    mathMin = math.min,
    mathMax = math.max,
    //   isStrokeReg = /stroke/ig,
//   isWebKit = /AppleWebKit/.test(userAgent),
//   mathCeil = math.ceil,
MARKER_ITEM_KEY = 'items',

/**
 * Hover in handler function for markers
 * @param {Object} marker the marker which is hovered on
 */
hoverFn = function hoverFn(marker) {
  var dataset = this,
      // eslint-disable-line no-invalid-this
  chart = dataset.getFromEnv('chart'),
      annotations = dataset.getChildren('mapAnnotations')[0],
      shape = marker.markerShape,
      groupConfig = shape.groupConfig,
      options = shape.data('unfilteredConfig'),
      eventArgs = options._markerEventArgs,
      attrs,
      markerConfig = marker.config; // if link is present then cursor is of pointer type
  // if (markerConfig.link) {
  //   element.node.style.cursor = POINTER;
  // }

  if (options.hovereffect) {
    if (shape.config.type === 'circle') {
      // fillObj = {
      // color: options.hoverfillcolor,
      // alpha: options.hoverfillalpha,
      // angle: 360 - options.hoverfillangle,
      // ratio: options.hoverfillratio,
      // gradientUnits: 'objectBoundingBox',
      // radialGradient: shape.config.rawFillPattern === 'radial'
      // };
      // options._hoverattrs.fill = toRaphaelColor(fillObj);
      // options._hoverattrs = extend2(obj, options._hoverattrs);
      attrs = (0, _lib.extend2)({
        fillcolor: options.hoverfillcolor,
        fillalpha: options.hoverfillalpha,
        fillangle: options.hoverfillangle,
        fillratio: options.hoverfillratio,
        gradientUnits: 'objectBoundingBox',
        radialGradient: 1
      }, options._hoverattrs);
    }

    attrs = (0, _lib.extend2)({}, options._hoverattrs);
    annotations.update(shape.getId(), attrs); // if (wrapper.type === 'image') {
    //   delete attrs.fill;
    //   delete attrs.stroke;
    //   delete attrs['stroke-width'];
    // }
    // wrapper.attr(attrs);
  }

  if (!eventArgs) {
    eventArgs = options._markerEventArgs = {
      x: +options.x,
      y: +options.y,
      scaledX: options.x * groupConfig.scaleX,
      scaledY: options.y * groupConfig.scaleY,
      chartX: options.x * groupConfig.scaleX + groupConfig.grpXShift,
      chartY: options.y * groupConfig.scaleY + groupConfig.grpYShift,
      id: options.id,
      label: options.label
    };
  }

  (0, _eventApi.raiseEventGroup)(markerConfig.options.id, 'markerRollOver', eventArgs, chart.getFromEnv('chartInstance'), markerConfig, UNDEF, UNDEF, UNDEF);
},

/**
 * Hover out handler function for markers
 * @param {Object} marker the marker which is hovered out
 */
hoverOutFn = function hoverOutFn(marker) {
  var dataset = this,
      // eslint-disable-line no-invalid-this
  chart = dataset.getFromEnv('chart'),
      annotations = dataset.getChildren('mapAnnotations')[0],
      shape = marker.markerShape,
      wrapper = shape.getElement(),
      markerConfig = marker.config,
      options = shape.data('unfilteredConfig'),
      attrs; // element.node.style.cursor = 'default';

  if (wrapper && options.hovereffect) {
    if (shape.config.type === 'circle') {
      // options._defaultattrs.fill = toRaphaelColor({
      //   alpha: shape.config.rawAlpha,
      //   color: shape.config.rawColor,
      //   angle: 360 - shape.config.rawAngle,
      //   ratio: shape.config.rawRatio,
      //   radialGradient: shape.config.rawFillPattern === 'radial'
      // });
      attrs = (0, _lib.extend2)({
        fillcolor: shape.config.rawColor,
        fillalpha: shape.config.rawAlpha,
        fillangle: shape.config.rawAngle,
        fillratio: shape.config.rawRatio,
        gradientUnits: 'objectBoundingBox',
        radialGradient: shape.config.rawFillPattern === 'radial'
      }, options._defaultattrs);
    }

    attrs = (0, _lib.extend2)({}, options._defaultattrs);
    annotations.update(shape.getId(), attrs); // if (wrapper.type === 'image') {
    //   delete attrs.fill;
    //   delete attrs.stroke;
    //   delete attrs['stroke-width'];
    // }
    // wrapper.attr(attrs);
  }

  (0, _eventApi.raiseEventGroup)(markerConfig.id, 'markerRollOut', options._markerEventArgs, chart.getFromEnv('chartInstance'), UNDEF, UNDEF, UNDEF);
},

/**
 * Click handler function for markers
 * @param {Object} e event object
 * @param {Object} marker the marker which is clicked
 */
clickFn = function clickFn(e, marker) {
  var dataset = this,
      // eslint-disable-line no-invalid-this
  markerOptions = marker.config.options,
      // dataset = marker.dataset,
  chart = dataset.getFromEnv('chart'),
      shape = marker.markerShape,
      options = shape.config,
      groupConfig = shape.groupConfig,
      linkClickFN = dataset.getFromEnv('linkClickFN'),
      link = shape.config.link,
      eventArgs = options._markerEventArgs; // added the link calling function on tracker

  link && linkClickFN && linkClickFN.call({
    link: link
  }, true);

  if (!eventArgs) {
    eventArgs = options._markerEventArgs = {
      x: +options.x,
      y: +options.y,
      scaledX: options.x * groupConfig.scaleX,
      scaledY: options.y * groupConfig.scaleY,
      chartX: options.x * groupConfig.scaleX + groupConfig.grpXShift,
      chartY: options.y * groupConfig.scaleY + groupConfig.grpYShift,
      id: markerOptions.id,
      label: markerOptions.label
    };
  }

  chart.fireChartInstanceEvent('markerClick', eventArgs, e);
},
    // colorize = function (original, obj) {
//   let col = !obj ? {
//     FCcolor: original
//   } : extend2(original.FCcolor, obj, false, true);
//   col.toString = toRaphaelColor;
//   return col;
// },
convertToObj = function convertToObj(arr, idKey) {
  var i = arr && arr.length || false,
      key = idKey || 'id',
      returnObj = {},
      item;

  if (!arr) {
    return arr;
  }

  while (i--) {
    item = arr[i];
    item[key] !== UNDEF && (returnObj[item[key].toLowerCase()] = item);
  }

  return returnObj;
},
    topLabelAlignmentFn = function topLabelAlignmentFn(x, y, radius) {
  return {
    x: x.toString(),
    y: (y - radius).toString(),
    align: POSITION_CENTER,
    valign: POSITION_TOP
  };
},
    leftLabelAlignmentFn = function leftLabelAlignmentFn(x, y, radius) {
  return {
    x: (x - radius).toString(),
    y: y.toString(),
    align: POSITION_RIGHT,
    valign: POSITION_MIDDLE
  };
},
    rightLabelAlignmentFn = function rightLabelAlignmentFn(x, y, radius) {
  return {
    x: (x + radius).toString(),
    y: y.toString(),
    align: POSITION_LEFT,
    valign: POSITION_MIDDLE
  };
},
    bottomLabelAlignmentFn = function bottomLabelAlignmentFn(x, y, radius) {
  return {
    x: x.toString(),
    y: (y + radius).toString(),
    align: POSITION_CENTER,
    valign: POSITION_BOTTOM
  };
},
    centerLabelAlignmentFn = function centerLabelAlignmentFn(x, y) {
  return {
    x: x.toString(),
    y: y.toString(),
    align: POSITION_CENTER,
    valign: POSITION_MIDDLE
  };
},
    rightWrapWidthFn = function rightWrapWidthFn() {
  return arguments[1];
},
    leftWrapWidthFn = function leftWrapWidthFn(width, x) {
  return width - x;
},
    centerWrapWidthFn = function centerWrapWidthFn(width, x) {
  return mathMin(x, width - x) * 2;
},
    topWrapHeightFn = function topWrapHeightFn() {
  return arguments[1];
},
    middleWrapHeightFn = function middleWrapHeightFn(height, y) {
  return mathMin(y, height - y) * 2;
},
    bottomWrapHeightFn = function bottomWrapHeightFn(height, y) {
  return height - y;
};

(0, _dependencyManager.addDep)({
  name: 'mapsAnimation',
  type: 'animationRule',
  extension: _mapEntities.default
});
/**
 * Creates class Markers to render markers in maps
 */

var Markers = /*#__PURE__*/function (_Entities) {
  (0, _inheritsLoose2.default)(Markers, _Entities);

  /**
   * Creates an instance of Markers
   */
  function Markers() {
    var _this;

    _this = _Entities.call(this) || this;
    _this.components = {};
    _this.getLabelAlignment = {
      top: topLabelAlignmentFn,
      left: leftLabelAlignmentFn,
      right: rightLabelAlignmentFn,
      bottom: bottomLabelAlignmentFn,
      center: centerLabelAlignmentFn
    };
    _this.getWrapWidth = {
      right: rightWrapWidthFn,
      left: leftWrapWidthFn,
      center: centerWrapWidthFn
    };
    _this.getWrapHeight = {
      top: topWrapHeightFn,
      middle: middleWrapHeightFn,
      bottom: bottomWrapHeightFn
    };
    _this.hoverFn = hoverFn;
    _this.hoverOutFn = hoverOutFn;
    _this.clickFn = clickFn;
    return _this;
  }
  /**
   * Returns the name of the component
   * @return {string} name of the component
   */


  var _proto = Markers.prototype;

  _proto.getName = function getName() {
    return 'markers';
  }
  /**
   * Returns the type of the component
   * @return {string} type of the component
   */
  ;

  _proto.getType = function getType() {
    return 'dataset';
  }
  /**
   * Configures the marker component
   * @param {Object} markerJSONData JSON for dataset configurations
   */
  ;

  _proto.configureAttributes = function configureAttributes(markerJSONData) {
    if (!markerJSONData) {
      return;
    }

    this.JSONData = markerJSONData;
    var dataset = this,
        annObj,
        mapAnnotations = dataset.getChildren('mapAnnotations') && dataset.getChildren('mapAnnotations')[0],
        chart = dataset.getFromEnv('chart'),
        markerOptions = chart.config.markerOpts;

    if (!mapAnnotations) {
      annObj = new _extAnnotation.default();
      dataset.attachChild(annObj, 'mapAnnotations');
      mapAnnotations = dataset.getChildren('mapAnnotations')[0];
    }

    mapAnnotations.destroy();
    dataset.calculateDataLimits();

    if (markerOptions.dataEnabled) {
      this._parseMarkers();
    } else {
      this.defineMarkersNShapes();
    }

    this.configureConnectors();
  }
  /**
   * Function that calculates the marker radius limits.
   * @memberof Markers
   */
  ;

  _proto.calculateMarkerRadiusLimits = function calculateMarkerRadiusLimits() {
    if (!this.JSONData) {
      return;
    }

    var dataset = this,
        JSONData = dataset.JSONData,
        conf = dataset.config,
        chart = dataset.getFromEnv('chart'),
        width = chart.config.width,
        height = chart.config.height,
        markerMaxRadius = JSONData.markermaxradius,
        markerMinRadius = JSONData.markerminradius,
        minMax = Markers.getMarkerRadiusLimits(width, height, markerMaxRadius, markerMinRadius);
    conf.minRadius = minMax.min;
    conf.maxRadius = minMax.max;
  }
  /**
   * Function to calculate the data limits of chart
   * @memberof Markers
   */
  ;

  _proto.calculateDataLimits = function calculateDataLimits() {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        conf = dataset.config,
        jsonData = chart.jsonData,
        markers = jsonData.markers || {},
        markerData = markers[MARKER_ITEM_KEY] || [],
        // numberFormatter = chart.components.numberFormatter,
    numberFormatter = this.getFromEnv('number-formatter'),
        min = +Infinity,
        max = -Infinity,
        markerObj,
        cleanValue,
        len,
        value,
        i;

    for (i = 0, len = markerData.length; i < len; i++) {
      markerObj = markerData[i];
      value = markerObj.value;
      cleanValue = numberFormatter.getCleanValue(value);

      if (cleanValue !== null) {
        min = mathMin(cleanValue, min);
        max = mathMax(cleanValue, max);
      }
    }

    conf.min = min;
    conf.max = max;
  }
  /**
   * Function to parse marker components
   * @memberof Markers
   */
  ;

  _proto._parseMarkers = function _parseMarkers() {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        jsonData = chart.jsonData,
        markers = jsonData.markers,
        markerData = markers[MARKER_ITEM_KEY],
        shapeArr = markers.shapes,
        markerOptions = chart.config.markerOpts,
        markerStyle = markerOptions.dataLabels.style,
        // numberFormatter = chart.components.numberFormatter,
    numberFormatter = this.getFromEnv('number-formatter'),
        shapeObjs = dataset.components.shapeObjs = {},
        markerObjs = dataset.components.markerObjs = {},
        value,
        i,
        markerObj,
        item,
        shapeId,
        markerConfig,
        options,
        id;

    if (!markerData || !markerData.length) {
      return;
    }

    if (shapeArr && shapeArr.length) {
      i = shapeArr.length;

      for (; i; i -= 1) {
        item = shapeArr[i - 1];

        if (id = item.id.toLowerCase()) {
          shapeObjs[id] = item;
        }
      }
    }

    i = markerData.length;

    while (i--) {
      item = markerData[i];

      if (id = item.id && item.id.toLowerCase()) {
        value = item.value;

        if (value !== UNDEF && value !== '') {
          value = parseFloat(value);
        }

        markerObj = Markers._initializeMarkerItem(id, item, null, chart);
        shapeId = markerObj.config.options.shapeid;
        shapeId && typeof shapeId === 'string' && (shapeId = shapeId.toLowerCase());
        markerConfig = markerObj.config;
        options = markerConfig.options;
        markerConfig.cleanValue = numberFormatter.getCleanValue(value);

        if (markerConfig.cleanValue !== null) {
          markerConfig.formattedValue = numberFormatter.dataLabels(value);
        } else {
          markerConfig.formattedValue = UNDEF;
        }

        markerConfig.fillColor = (0, _lib.pluck)(options.fillcolor, options.color, markerOptions.fillColor);
        markerConfig.fillAlpha = (0, _lib.pluck)(options.fillalpha, options.alpha, markerOptions.fillAlpha);
        markerConfig.fillRatio = (0, _lib.pluck)(options.fillratio, markerOptions.fillRatio);
        markerConfig.fillAngle = (0, _lib.pluck)(options.fillangle, markerOptions.fillAngle);
        markerConfig.borderThickness = (0, _lib.pluckNumber)(options.borderthickness, markerOptions.borderThickness);
        markerConfig.borderColor = (0, _lib.pluck)(options.bordercolor, markerOptions.borderColor);
        markerConfig.borderAlpha = (0, _lib.pluck)(options.borderalpha, markerOptions.borderAlpha);
        markerConfig.labelPadding = options.labelpadding || markerOptions.labelPadding;
        markerConfig.fontColor = (0, _lib.pluck)(options.labelcolor, markerStyle.fontColor);
        markerConfig.labelBgColor = (0, _lib.pluck)(options.labelbgcolor, markerStyle.labelBgColor) || BLANK;
        markerConfig.labelBorderColor = (0, _lib.pluck)(options.labelbordercolor, markerStyle.labelBorderColor) || BLANK;

        if (item.__hideMarker) {
          markerObj._isHidden = true;
        }

        if (shapeId) {
          markerObj.shapeObj = shapeObjs[shapeId];
        }

        markerObjs[id] = markerObj;
      }
    }
  }
  /**
   * Creates the marker objects abd their specified shapes
   */
  ;

  _proto.defineMarkersNShapes = function defineMarkersNShapes() {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        jsonData = chart.jsonData,
        markers = jsonData.markers,
        defineArr = markers.definition,
        // numberFormatter = chart.components.numberFormatter,
    numberFormatter = this.getFromEnv('number-formatter'),
        markerOptions = chart.config.markerOpts,
        markerStyle = markerOptions.dataLabels.style,
        defineObject = convertToObj(defineArr) || {},
        applyObject = convertToObj(markers.application) || {},
        shapeArr = markers.shapes,
        shapeObjs = dataset.components.shapeObjs = dataset.components.shapeObjs || (dataset.components.shapeObjs = {}),
        markerObjs = dataset.components.markerObjs = dataset.components.markerObjs || (dataset.components.markerObjs = {}),
        shapeObjHash = {},
        markerObjHash = {},
        options,
        markerConfig,
        value,
        i,
        markerObj,
        item,
        shapeId,
        id;

    if (!defineArr || !defineArr.length) {
      return;
    } // Store all the previously present marker and shape configurations


    for (i in shapeObjs) {
      shapeObjHash[i] = false;
    }

    for (i in markerObjs) {
      markerObjHash[i] = false;
    }

    if (shapeArr && shapeArr.length) {
      i = shapeArr.length;

      for (; i; i -= 1) {
        item = shapeArr[i - 1];

        if (id = item.id.toLowerCase()) {
          shapeObjs[id] = item; // If a previously existing shape configuration is present, mark it true

          shapeObjHash[id] = true;
        }
      }
    }

    for (id in defineObject) {
      item = defineObject[id];
      markerObj = markerObjs[id] = Markers._initializeMarkerItem(id, item, applyObject[id], chart); // If a previously existing marker configuration is present, mark it true

      markerObjHash[id] = true;
      shapeId = markerObj.config.options.shapeid;
      markerConfig = markerObj.config;
      value = item.value;
      markerConfig.cleanValue = numberFormatter.getCleanValue(value);
      options = markerConfig.options;

      if (markerConfig.cleanValue !== null) {
        markerConfig.formattedValue = numberFormatter.dataLabels(value);
      } else {
        markerConfig.formattedValue = UNDEF;
      }

      markerConfig.fillColor = (0, _lib.pluck)(options.fillcolor, options.color, markerOptions.fillColor);
      markerConfig.fontColor = (0, _lib.pluck)(options.labelcolor, markerStyle.fontColor);
      markerConfig.fillAlpha = (0, _lib.pluck)(options.fillalpha, options.alpha, markerOptions.fillAlpha);
      markerConfig.fillRatio = (0, _lib.pluck)(options.fillratio, markerOptions.fillRatio);
      markerConfig.fillAngle = (0, _lib.pluck)(options.fillangle, markerOptions.fillAngle);
      markerConfig.borderThickness = (0, _lib.pluckNumber)(options.borderthickness, markerOptions.borderThickness);
      markerConfig.borderColor = (0, _lib.pluck)(options.bordercolor, markerOptions.borderColor);
      markerConfig.borderAlpha = (0, _lib.pluck)(options.borderalpha, markerOptions.borderAlpha);
      markerConfig.labelPadding = options.labelpadding || markerOptions.labelPadding;
      markerConfig.options.tooltext = (0, _lib.pluck)(options.tooltext, markerOptions.tooltext);
      markerConfig.link = options.link;

      if (shapeId) {
        markerObj.shapeObj = shapeObjs[shapeId.toLowerCase()];
      }
    } // Remove all the false marked configurations. This configurations are disposed.


    for (i in shapeObjHash) {
      if (!shapeObjHash[i]) {
        delete shapeObjs[i];
      }
    }

    for (i in markerObjs) {
      if (!markerObjHash[i]) {
        delete markerObjs[i];
      }
    }
  }
  /**
   * Return marker radius limit for a particular marker
   * @param {number} width available width
   * @param {number} height available height
   * @param {number} userMax user defined max value
   * @param {number} userMin user defined min value
   * @return {Object} Max, Min value
   */
  ;

  Markers.getMarkerRadiusLimits = function getMarkerRadiusLimits(width, height, userMax, userMin) {
    var dime = mathMin(width, height),
        factor = 0.02,
        times = 3.5,
        minR = factor * dime,
        maxR = factor * times * dime,
        finalUserMin,
        finalUserMax;
    finalUserMin = parseFloat(userMin);
    finalUserMax = parseFloat(userMax);

    if (!isNaN(finalUserMin) && !isNaN(finalUserMax)) {
      if (finalUserMin < finalUserMax) {
        return {
          min: finalUserMin,
          max: finalUserMax
        };
      }

      return {
        min: finalUserMax,
        max: finalUserMin
      };
    } else if (!isNaN(finalUserMin)) {
      return {
        min: finalUserMin,
        max: 10 * finalUserMin
      };
    } else if (!isNaN(finalUserMax)) {
      return {
        min: parseInt(finalUserMax / 10, 10),
        max: finalUserMax
      };
    }

    return {
      min: minR,
      max: maxR
    };
  }
  /**
   * Function that returns the upper and lower data limits
   * @return {Object} containing the upper and lower data limits
   * @memberof Markers
   */
  ;

  _proto.getDataLimits = function getDataLimits() {
    var dataset = this,
        conf = dataset.config;
    return {
      min: conf.min,
      max: conf.max
    };
  }
  /**
   * Initialise a marker item
   * @param {string} id marker id
   * @param {Object} markerDefinition marker configurations
   * @param {Object} markerApplication configurations to be added
   * @return {Object} marker item object
   */
  ;

  Markers._initializeMarkerItem = function _initializeMarkerItem(id, markerDefinition, markerApplication) {
    var markerObj = {},
        config = markerObj.config,
        opts;

    if (!config) {
      config = markerObj.config = {};
    }

    config.id = id;
    config.definition = markerDefinition;
    config.application = markerApplication; // new member variables for value markers.

    config.hasValue = null;
    config.value = null;
    config.options = null;
    config.label = null;
    config.markerShape = null;
    config.markerLabel = null;
    config.drawOptions = {
      shape: null,
      label: null
    };
    config.drawComplete = false;
    opts = markerObj.config.options = (0, _lib.extend2)({}, config.definition);

    if (config.dataEnabled) {
      if (!isNaN(opts.value) && opts.value !== '') {
        markerObj.value = parseFloat(opts.value);
        markerObj.hasValue = true;
      }
    } else if (config.applyAll) {
      config.options = (0, _lib.extend2)(opts, config.application);
    } else if (markerApplication) {
      config.options = (0, _lib.extend2)(opts, config.application);
    }

    return markerObj;
  }
  /**
   * Function that configures the map connectors
   * @memberof Markers
   */
  ;

  _proto.configureConnectors = function configureConnectors() {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        annotations = dataset.getChildren('mapAnnotations')[0],
        jsonData = chart.jsonData,
        datasetComponents = dataset.components,
        markers = jsonData.markers || {},
        connectors = markers.connector || markers.connectors || [],
        markerObjs = datasetComponents.markerObjs,
        length = connectors.length,
        connectorComponents = dataset.components.connectors,
        getMouseOverFn = function getMouseOverFn(eventArgs) {
      return function (e) {
        var shape = this,
            // eslint-disable-line no-invalid-this
        unfilteredConfig = shape.data('unfilteredConfig');

        if (unfilteredConfig.hoverEffect) {
          annotations.update(shape.getId(), unfilteredConfig._hoverAttrs);
        }

        chart.fireChartInstanceEvent('connectorrollover', eventArgs, e);
      };
    },
        getMouseOutFn = function getMouseOutFn(eventArgs) {
      return function (e) {
        var shape = this,
            // eslint-disable-line no-invalid-this
        unfilteredConfig = shape.data('unfilteredConfig');

        if (unfilteredConfig.hoverEffect) {
          annotations.update(shape.getId(), unfilteredConfig._defaultAttrs);
        }

        chart.fireChartInstanceEvent('connectorrollout', eventArgs, e);
      };
    },
        getClickFn = function getClickFn(eventArgs) {
      return function (e) {
        chart.fireChartInstanceEvent('connectorClick', eventArgs, e);
      };
    },
        chartConnOptions = chart.config.connectorOpts,
        connectorItem = {},
        config,
        options,
        fromMarker,
        toMarker,
        label,
        toolText,
        thickness,
        color,
        alpha,
        hovercolor,
        hoveralpha,
        hoverthickness,
        connLabelConfig,
        obj,
        i;

    connectorComponents = dataset.components.connectors = [];

    for (i = 0; i < length; i++) {
      obj = connectors[i];

      if (!obj.from && !obj.to) {
        continue;
      }

      fromMarker = markerObjs[obj.from.toLowerCase()];
      toMarker = markerObjs[obj.to.toLowerCase()];

      if (!fromMarker || !toMarker) {
        continue;
      }

      label = connectors[i].label; // if (connectorConfig.hideOpen &&
      //         (fromMarker._isHidden || toMarker._isHidden)) {
      //     continue;
      // }

      connectorItem = connectorComponents[i];
      !connectorItem && (connectorItem = connectorComponents[i] = {});
      !connectorItem.config && (config = connectorItem.config = {});
      !connectorItem.graphics && (connectorItem.graphics = {});
      config = connectorItem.config = (0, _lib.extend2)({}, obj);
      config.fromMarker = fromMarker;
      config.toMarker = toMarker;
      config.link = obj.link;
      config.showTooltip = (0, _lib.pluckNumber)(obj.showtooltip, chartConnOptions.showTooltip);
      toolText = config.tooltext = config.showTooltip ? (0, _lib.pluck)(obj.tooltext, chartConnOptions.tooltext) : BLANK;
      thickness = config.thickness = (0, _lib.pluck)(obj.thickness, chartConnOptions.thickness);
      color = config.color = (0, _lib.pluck)(obj.color, chartConnOptions.color);
      alpha = config.alpha = (0, _lib.pluck)(obj.alpha, chartConnOptions.alpha);
      config.hoverEffect = (0, _lib.pluckNumber)(obj.showhovereffect, chartConnOptions.showHoverEffect);
      hovercolor = (0, _lib.pluck)(obj.hovercolor, chartConnOptions.hoverColor, color);
      hoveralpha = (0, _lib.pluck)(obj.hoveralpha, chartConnOptions.hoverAlpha, alpha);
      hoverthickness = (0, _lib.pluck)(obj.hoverthickness, chartConnOptions.hoverThickness, thickness);
      config.dashed = (0, _lib.pluck)(obj.dashed, chartConnOptions.dashed);
      config.dashLen = (0, _lib.pluckNumber)(obj.dashlen, chartConnOptions.dashlen);
      config.dashGap = (0, _lib.pluckNumber)(obj.dashgap, chartConnOptions.dashgap);

      if (toolText) {
        config.tooltext = toolText = (0, _lib.parseUnsafeString)((0, _lib.parseTooltext)(toolText, [3, 40, 41, 42, 43], {
          label: label,
          fromId: fromMarker.config.definition.id,
          toId: toMarker.config.definition.id,
          fromLabel: fromMarker.config.definition.label,
          toLabel: toMarker.config.definition.label
        }, options), false);
      }

      config.eventArgs = {
        fromMarkerId: fromMarker.config.id,
        toMarkerId: toMarker.config.id,
        label: label
      };
      config._hoverAttrs = {
        // stroke: colorize({
        //   color: hovercolor,
        //   alpha: hoveralpha
        // }).toString(),
        // 'stroke-width': hoverthickness
        color: hovercolor,
        alpha: hoveralpha,
        thickness: hoverthickness
      };
      config._defaultAttrs = {
        // stroke: colorize({
        //   color: color,
        //   alpha: alpha
        // }).toString(),
        // 'stroke-width': thickness
        color: color,
        alpha: alpha,
        thickness: thickness
      };
      config.type = LINE_STR;
      config.onclick = getClickFn(config.eventArgs);
      config.onmouseover = getMouseOverFn(config.eventArgs);
      config.onmouseout = getMouseOutFn(config.eventArgs);

      if (label) {
        connLabelConfig = connectorItem.labelConfig;
        !connLabelConfig && (connLabelConfig = connectorItem.labelConfig = {});
        connLabelConfig.type = TEXT_STR;
        connLabelConfig.text = label;
        connLabelConfig.align = POSITION_CENTER;
        connLabelConfig.valign = POSITION_MIDDLE;
        connLabelConfig.font = chartConnOptions.font;
        connLabelConfig.fillcolor = (0, _lib.pluck)(obj.labelcolor, chartConnOptions.fontColor);
        connLabelConfig.bgcolor = (0, _lib.pluck)(obj.labelbgcolor, chartConnOptions.labelBgColor);
        connLabelConfig.bordercolor = (0, _lib.pluck)(obj.labelbordercolor, chartConnOptions.labelBorderColor);
        connLabelConfig.tooltext = config.tooltext;
      }
    }
  }
  /**
   * Function that draws the marker components
   * @memberof Markers
   */
  ;

  _proto.draw = function draw() {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        conf = dataset.config,
        annotations = dataset.getChildren('mapAnnotations')[0],
        markers = dataset.components.markerObjs,
        chartConf = chart.config,
        chartMarkerOpts = chartConf.markerOpts,
        scalingParams = chartConf.scalingParams,
        annConfig = chart.config.annotationConfig,
        // toolTipController = dataset.getFromEnv('toolTipController'),
    // entityDataset = chart.getDatasets()[0],
    markerItems = [],
        markerLabels = [],
        appliedMarkers = {},
        appliedObj,
        markerItem,
        rawConfig,
        // shapeId,
    config,
        id,
        i,
        // markerElem,
    // markerLabelElem,
    markerLabelGroup,
        markerGroup,
        validShape = {};
    annotations.destroy();
    dataset.createContainer();

    dataset._drawConnectors();

    dataset.imageLoadCount = 0;
    dataset.imageCount = 0; // chartConf.labelsOnTop && entityDataset.getChildren('mapLabelAnnotations') &&
    //   entityDataset.getChildren('mapLabelAnnotations')[0].annotation.groups[0].store.element.toFront();
    // Have to configure the autoscale property in draw function as the scale factor is
    // available only after spaceManagement

    conf.autoScale = chartMarkerOpts.autoScale ? scalingParams.sFactor : 1;

    for (id in markers) {
      appliedObj = null;
      markerItem = markers[id];
      config = markerItem.config; // shapeId = config.options.shapeid;

      if (!config.conIsHidden) {
        appliedObj = this._drawMarkerItem(markerItem);
      }

      if (!appliedObj) {
        continue;
      }

      validShape[id] = appliedObj;
      config._annotationIndex = markerItems.length;
      appliedMarkers[id] = markerItem;

      if (appliedObj.markerShape) {
        rawConfig = Object.assign({
          align: 'center',
          valign: 'middle',
          animationLabel: 'markerItem',
          autoscale: appliedObj.markerShape.type === 'image' ? 0 : 1
        }, appliedObj.markerShape);
        markerItems.push(rawConfig);
      }

      if (appliedObj.markerLabel) {
        rawConfig = Object.assign({
          animationLabel: 'markerItem',
          id: appliedObj.markerShape.id
        }, appliedObj.markerLabel);
        markerLabels.push(rawConfig);
      }
    } // create the markers and marker labels


    markerGroup = annotations.addGroup(Object.assign(annConfig, {
      id: 'markers',
      fillalpha: '100',
      items: markerItems,
      scaleimages: 1
    }), dataset);
    markerLabelGroup = annotations.addGroup(Object.assign(annConfig, {
      id: 'markerLabels',
      items: markerLabels,
      scaleimages: 1
    }), dataset);
    dataset.components.markerGroup = markerGroup;
    dataset.components.markerLabelGroup = markerLabelGroup;
    i = 0;

    for (id in markers) {
      if (!validShape[id]) {
        continue;
      }

      markerItem = markers[id];
      markerItem.markerShape = markerGroup.retrieveItem(markerItems[i].id);
      markerItem.markerShape.data('unfilteredConfig', markerItems[i]);

      if (validShape[id].markerLabel) {
        markerItem.markerLabel = markerLabelGroup.retrieveItem(markerItems[i].id);
        markerItem.markerLabel.data('unfilteredConfig', markerLabels[i]);
      }

      i++;
    }

    dataset.addJob('buildKdtree', dataset._buildKdTree.bind(dataset), _schedular.priorityList.kdTree);
  }
  /**
   * Function to create a K-dimensional tree
   * @memberof Markers
   */
  ;

  _proto._buildKdTree = function _buildKdTree() {
    var dataset = this,
        kdArrayMap = dataset.components.kdArrayMap,
        markerGroup = dataset.components.markerGroup,
        kdPointsArr = [],
        id,
        i,
        items = markerGroup && markerGroup.items,
        len = items && items.length || 0;

    for (i = 0; i < len; i++) {
      id = items[i].config.id;
      kdArrayMap[id] && kdPointsArr.push(kdArrayMap[id]);
    }

    if (!dataset.components.kDTree) {
      // Create a new instance of the KdTree class and store its reference in the current instance.
      dataset.components.kDTree = new _kdtree.default(true); // componentFactory(dataset, KdTree, 'kDTree');
    } // dataset.components.kDTree._setSearchLimit(Infinity, Infinity);
    // dataset.components.kDTree.buildKdTree(kdPointsArr);


    dataset.components.kDTree._setSearchLimit(Infinity, Infinity);

    dataset.components.kDTree.buildKdTree(kdPointsArr);
  }
  /**
   * Draws individual marker items
   *
   * @param {Object} marker marker configurations
   * @returns {Object} Object containing marker shapes and labels
   * @memberof Markers
   */
  ;

  _proto._drawMarkerItem = function _drawMarkerItem(marker) {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        conf = chart.config,
        datasetConfig = dataset.config,
        scalingParams = conf.scalingParams,
        markerConfig = marker.config,
        options = markerConfig.options,
        definition = markerConfig.definition,
        chartMarkerOpts = conf.markerOpts,
        markerStyle = chartMarkerOpts.dataLabels.style,
        shapeId = options.shapeid,
        itemScale = options.scale || 1,
        label = options.label || BLANK,
        scaleFactor = chart.config.scalingParams.scaleFactor * chart.config.baseScaleFactor,
        labelPos = (options.labelpos || POSITION_TOP).toLowerCase(),
        value = markerConfig.formattedValue === UNDEF ? UNDEF : markerConfig.formattedValue,
        tooltext = options.tooltext || chartMarkerOpts.tooltext,
        radius = (0, _lib.pluckNumber)(definition.radius, markerConfig.radius, chartMarkerOpts.radius) * itemScale * datasetConfig.autoScale || 0.0001,
        fillColor = markerConfig.fillColor,
        fillAlpha = markerConfig.fillAlpha,
        fillRatio = markerConfig.fillRatio,
        fillAngle = markerConfig.fillAngle,
        borderThickness = markerConfig.borderThickness,
        borderColor = markerConfig.borderColor,
        borderAlpha = markerConfig.borderAlpha,
        annotations = dataset.getChildren('mapAnnotations')[0],
        labelObj,
        align,
        valign,
        baseWidth,
        baseHeight,
        xOffset,
        yOffset,
        wrapWidth,
        wrapHeight,
        labelPadding,
        shapeObj,
        // fillAttrs,
    // hoverFillAttrs,
    temp,
        // shapeType,
    calcX,
        calcY,
        kdPoint,
        innerradius,
        sides,
        type,
        kdArrayMap = dataset.components.kdArrayMap || (dataset.components.kdArrayMap = {}),
        markerId = marker.config.id;
    markerConfig.autoScale = chartMarkerOpts.autoScale ? scaleFactor : 1;

    if (!shapeId) {
      return;
    }

    if (tooltext) {
      tooltext = (0, _lib.parseUnsafeString)((0, _lib.parseTooltext)(tooltext, [1, 2, 3], {
        formattedValue: value,
        label: label
      }, options), false);
    } else {
      tooltext = value ? label + chartMarkerOpts.tooltipSepChar + value : label;
    }

    if (value !== UNDEF && value !== null) {
      /* value_for_markers */
      label = label + chartMarkerOpts.labelSepChar + value;
    } else {
      if (!isNaN(itemScale)) {
        if (itemScale < 0) {
          itemScale = 0;
        } else if (itemScale > 5) {
          itemScale = 5;
        }
      } else {
        itemScale = 1;
      }
    }

    (0, _lib.extend2)(options, {
      x: options.x && options.x.toString(),
      y: options.y && options.y.toString(),
      fillcolor: fillColor,
      fillalpha: fillAlpha,
      fillratio: fillRatio,
      fillangle: fillAngle,
      borderthickness: borderThickness,
      bordercolor: borderColor,
      borderalpha: borderAlpha,
      hovereffect: (0, _lib.pluck)(chartMarkerOpts.showHoverEffect),
      radius: radius && radius.toString(),
      // tooltext: chartMarkerOpts.showTooltip ? tooltext : 0,
      link: options.link,
      showshadow: (0, _lib.pluckNumber)(options.showshadow, markerConfig.shadow),
      _markerLabel: label,
      // for event
      _markerId: options.id,
      // for event
      id: (options.id + BLANK).toLowerCase()
    });
    delete options.tooltext;
    markerConfig.tooltext = chartMarkerOpts.showTooltip ? tooltext : false; // shapeType = options.type;

    calcX = Number(options.x) * scalingParams.sFactor + scalingParams.translateX;
    calcY = Number(options.y) * scalingParams.sFactor + scalingParams.translateY;
    radius = options.radius;

    if (shapeId === 'triangle') {
      (0, _lib.extend2)(options, {
        type: 'polygon',
        sides: 3,
        startangle: chartMarkerOpts.startAngle
      });
      type = POLYGON_STR;
      sides = 3;
    } else if (shapeId === 'diamond') {
      (0, _lib.extend2)(options, {
        type: 'polygon',
        sides: 4,
        startangle: chartMarkerOpts.startAngle
      });
      type = POLYGON_STR;
      sides = 4;
    } else if (shapeId === 'arc') {
      innerradius = radius * INNERRADIUSFACTOR;
      (0, _lib.extend2)(options, {
        type: 'arc',
        startangle: 0,
        endangle: 360,
        innerradius: innerradius
      });
      type = ACR_STR;
    } else if (shapeId === 'circle') {
      options.type = CIRCLE_STR;
      type = CIRCLE_STR;
    } else {
      shapeObj = dataset.getShapeArgs.call(marker);

      if (!chartMarkerOpts.dataEnabled || !chartMarkerOpts.valueToRadius || options.radius === UNDEF) {
        !shapeObj.radius && (shapeObj.radius = chartMarkerOpts.radius);
        shapeObj.radius *= itemScale * markerConfig.autoScale;
      } else {
        delete shapeObj.radius;
      }

      (0, _lib.extend2)(options, shapeObj);
      options.id = options._markerId && options._markerId.toLowerCase();
      innerradius = shapeObj.innerradius;
      shapeObj.radius && (radius = shapeObj.radius);
      type = shapeObj.type && shapeObj.type.toLowerCase();
      sides = shapeObj.sides;
      radius = Number(radius);

      if (radius && innerradius && radius < innerradius) {
        temp = radius;
        options.radius = radius = innerradius;
        options.innerradius = innerradius = temp;
      }
    }

    options.type = options.type && options.type.toLowerCase(); // Setting the hover attributes after all the cosmetics have been finalized.

    (0, _lib.extend2)(options, {
      hoverfillcolor: (0, _lib.pluck)(options.fillhovercolor, chartMarkerOpts.hoverFillColor, options.fillcolor),
      hoverfillalpha: (0, _lib.pluck)(options.fillhoveralpha, chartMarkerOpts.hoverFillAlpha, options.fillalpha),
      hoverfillratio: (0, _lib.pluck)(options.fillhoverratio, chartMarkerOpts.hoverFillRatio, options.fillratio),
      hoverfillangle: (0, _lib.pluck)(options.fillhoverangle, chartMarkerOpts.hoverFillAngle, options.fillangle),
      hoverborderthickness: (0, _lib.pluckNumber)(options.borderhoverthickness, chartMarkerOpts.hoverBorderThickness, options.borderthickness),
      hoverbordercolor: (0, _lib.pluck)(options.borderhovercolor, chartMarkerOpts.hoverBorderColor, options.bordercolor),
      hoverborderalpha: (0, _lib.pluck)(options.borderhoveralpha, chartMarkerOpts.hoverBorderAlpha, options.borderalpha)
    }); // fillAttrs = {
    //   alpha: options.fillalpha,
    //   color: options.fillcolor,
    //   angle: 360 - options.fillangle,
    //   ratio: options.fillratio
    // };
    // hoverFillAttrs = {
    //   alpha: options.hoverfillalpha,
    //   color: options.hoverfillcolor,
    //   angle: options.hoverfillangle,
    //   ratio: options.hoverfillratio
    // };

    /** Hover Effect for markers **/
    // options._defaultattrs = {
    //   fill: toRaphaelColor(fillAttrs),
    //   'stroke-width': options.showborder !== '0' ? options.borderthickness : 0,
    //   stroke: convertColor(options.bordercolor, options.borderalpha)
    // };
    // options._hoverattrs = {
    //   fill: toRaphaelColor(hoverFillAttrs),
    //   'stroke-width': options.showborder !== '0' ? options.hoverborderthickness : 0,
    //   stroke: convertColor(options.hoverbordercolor, options.hoverborderalpha)
    // };

    options._hoverattrs = {
      fillalpha: options.hoverfillalpha,
      fillcolor: options.hoverfillcolor,
      fillangle: options.hoverfillangle,
      fillratio: options.hoverfillratio,
      borderThickness: options.showborder !== '0' ? options.hoverborderthickness : 0,
      borderColor: options.hoverbordercolor,
      borderAlpha: options.hoverborderalpha
    };
    options._defaultattrs = {
      fillalpha: options.fillalpha,
      fillcolor: options.fillcolor,
      fillangle: options.fillangle,
      fillratio: options.fillratio,
      borderThickness: options.showborder !== '0' ? options.borderthickness : 0,
      borderColor: options.bordercolor,
      borderAlpha: options.borderalpha
    };

    if (options.type === 'image') {
      // In case of image there should not be a border around it by default.
      options.borderthickness = options.borderthickness || 0;

      options.onload = function (imageattr) {
        var shape = this,
            width = imageattr.width,
            height = imageattr.height;
        kdPoint = {};
        options = shape.config;
        calcX = (Number(options.derivedX) - width / (2 * scalingParams.sFactor)) * scalingParams.sFactor;
        calcY = (Number(options.derivedY) - height / (2 * scalingParams.sFactor)) * scalingParams.sFactor;
        kdPoint = kdArrayMap[markerId] || (kdArrayMap[markerId] = {});
        kdPoint.x = calcX + scalingParams.translateX;
        kdPoint.y = calcY + scalingParams.translateY;
        kdPoint.element = marker;
        kdPoint.shapeInfo = {
          type: 'rect',
          width: width,
          height: height
        };

        if (width && height) {
          annotations.update(shape.getId(), {
            x: calcX,
            y: calcY,
            width: width,
            height: height,
            autoscale: 0
          });
        }

        dataset.imageLoadCount++;

        if (dataset.imageLoadCount === dataset.imageCount) {
          dataset._buildKdTree();
        }
      };

      options.onerror = function () {
        dataset.imageLoadCount++;

        if (dataset.imageLoadCount === dataset.imageCount) {
          dataset._buildKdTree();
        }
      };

      dataset.imageCount++;
    } else {
      kdPoint = kdArrayMap[markerId] || (kdArrayMap[markerId] = {});
      kdPoint.x = calcX;
      kdPoint.y = calcY;
      kdPoint.element = marker;
      kdPoint.shapeInfo = {
        type: type,
        sides: sides,
        radius: Number(radius) + options.borderthickness / 2,
        innerradius: innerradius
      };
    }

    markerConfig.drawOptions.shape = options;

    if (!chartMarkerOpts.showLabels) {
      return {
        markerShape: options
      };
    } // creating marker label options here.


    labelPadding = options.labelpadding || chartMarkerOpts.labelPadding;
    labelObj = dataset._getLabelOptions(labelPos, labelPadding, options);
    align = labelObj.align;
    valign = labelObj.valign;
    baseWidth = markerConfig._labelBaseWidth;
    baseHeight = markerConfig._labelBaseHeight;
    xOffset = markerConfig._labelXOffset;
    yOffset = markerConfig._labelYOffset;
    wrapWidth = chartMarkerOpts.labelWrapWidth ? chartMarkerOpts.labelWrapWidth : dataset.getWrapWidth[align](baseWidth, Number(labelObj.x) + xOffset);
    wrapHeight = chartMarkerOpts.labelWrapHeight ? chartMarkerOpts.labelWrapHeight : dataset.getWrapHeight[valign](baseHeight, Number(labelObj.y) + yOffset);

    if (wrapWidth > labelPadding) {
      wrapWidth -= labelPadding;
    }

    if (wrapHeight > labelPadding) {
      wrapHeight -= labelPadding;
    }

    markerConfig.drawOptions.label = (0, _lib.extend2)({
      type: 'text'
    }, {
      text: label,
      tooltext: options.tooltext,
      x: labelObj.x,
      y: labelObj.y,
      align: align,
      valign: labelObj.valign,
      wrap: 1,
      wrapwidth: wrapWidth,
      wrapheight: wrapHeight,
      fontsize: markerStyle.fontSize / scalingParams.sFactor,
      font: markerStyle.fontFamily,
      color: markerConfig.fontColor,
      bgcolor: markerConfig.labelBgColor || BLANK,
      bordercolor: markerConfig.labelBorderColor || BLANK
    });
    return {
      markerShape: options,
      markerLabel: markerConfig.drawOptions.label
    };
  }
  /**
   * highlight the markers
   * @param {Object|boolean} kdPoint point object of markers
   * @param {Event} e interaction events
   */
  ;

  _proto.highlightPoint = function highlightPoint(kdPoint, e) {
    var marker = kdPoint.element,
        dataset = this,
        originalEvent = e.originalEvent,
        chart = dataset.getFromEnv('chart'),
        toolTipController = dataset.getFromEnv('toolTipController'),
        currentToolTip = dataset.config.currentToolTip,
        lastHoveredPoint = chart.config.lastHoveredPoint;

    if (lastHoveredPoint && lastHoveredPoint !== kdPoint) {
      lastHoveredPoint && dataset.hoverOutFn(lastHoveredPoint.element);
      chart.config.lastHoveredPoint = null;
      toolTipController.hide(currentToolTip);
    }

    if (kdPoint === false) {
      return;
    }

    if (e.type === 'click' || e.type === 'touchstart') {
      if (chart.config.lastHoveredPoint !== kdPoint) {
        dataset.hoverFn(marker);
      }

      dataset.clickFn(e, marker);
    } else if (e.type === 'mousemove') {
      if (chart.config.lastHoveredPoint !== kdPoint) {
        dataset.hoverFn(marker);
      }
    }

    if (marker.config.tooltext) {
      if (currentToolTip) {
        toolTipController.draw(originalEvent, marker.config.tooltext, currentToolTip);
      } else {
        currentToolTip = dataset.config.currentToolTip = toolTipController.draw(originalEvent, marker.config.tooltext);
      }
    }

    chart.config.lastHoveredPoint = kdPoint;
  }
  /**
   * Function that draws the connectors
   * @memberof Markers
   */
  ;

  _proto._drawConnectors = function _drawConnectors() {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        annConfig = chart.config.annotationConfig,
        datasetComponents = dataset.components,
        connectors = datasetComponents.connectors || (dataset.components.connectors = []),
        connector,
        connectorLabel,
        length = connectors.length,
        scalingParams = chart.config.scalingParams,
        chartConnOptions = chart.config.connectorOpts,
        showConnectorLabels = chartConnOptions.showLabels,
        annotations = dataset.getChildren('mapAnnotations')[0],
        i,
        j,
        connectorOptions = [],
        connectorLabelItems = [],
        x,
        y,
        toX,
        toY,
        fromMarkerConfig,
        toMarkerConfig,
        connectorGroup,
        connectorLabelGroup,
        rawConfig,
        groups = [],
        validConnector = {};
    groups.push({
      id: 'connectorLabels',
      fillalpha: '100',
      items: connectorLabelItems
    });
    groups.push({
      id: 'connectors',
      fillalpha: '100',
      items: connectorOptions
    });

    for (i = 0; i < length; i++) {
      if (!connectors[i]) {
        continue;
      }

      validConnector[i] = true;
      fromMarkerConfig = connectors[i].config.fromMarker.config;
      toMarkerConfig = connectors[i].config.toMarker.config;
      x = fromMarkerConfig.options.x;
      y = fromMarkerConfig.options.y;
      toX = toMarkerConfig.options.x;
      toY = toMarkerConfig.options.y;
      connectors[i].config.x = x;
      connectors[i].config.y = y;
      connectors[i].config.tox = toX;
      connectors[i].config.toy = toY;
      rawConfig = Object.assign({
        animationLabel: 'markerItem'
      }, connectors[i].config);
      connectorOptions.push(rawConfig);

      if (connectors[i].labelConfig && showConnectorLabels) {
        connectors[i].labelConfig.x = ((Number(x) + Number(toX)) / 2).toString();
        connectors[i].labelConfig.y = ((Number(y) + Number(toY)) / 2).toString(); // base scale factor, taken from chart config is required to calculate font size

        connectors[i].labelConfig.fontsize = chartConnOptions.fontSize / (scalingParams.scaleFactor * chart.config.baseScaleFactor);
        rawConfig = Object.assign({
          animationLabel: 'markerItem'
        }, connectors[i].labelConfig);
        connectorLabelItems.push(rawConfig);
      }
    } // create the connectors and the connector labels


    connectorGroup = annotations.addGroup(Object.assign(annConfig, groups[1]), dataset);
    connectorLabelGroup = annotations.addGroup(Object.assign(annConfig, groups[0]), dataset);

    for (i = 0, j = 0; i < length; i++) {
      if (!validConnector[i]) {
        continue;
      }

      connector = connectorGroup.items[j];

      if (connector) {
        connector.data('unfilteredConfig', connectorOptions[j]);
        connector.addEventListener('fc-mouseover', connectors[i].config.onmouseover);
        connector.addEventListener('fc-mouseout', connectors[i].config.onmouseout);
        connector.addEventListener('fc-click', connectors[i].config.onclick);
      }

      if (connectors[i].labelConfig && showConnectorLabels) {
        connectorLabel = connectorLabelGroup.items[j];
        connectorLabel && connectorLabel.data('unfilteredConfig');
      }

      j++;
    } // annotations.addGroup(Object.assign(annConfig, groups[0]));
    // annotations.addGroup(Object.assign(annConfig, groups[1]));

  }
  /**
   * Determines marker shape
   * @return {Object} prepared marker shape object
   */
  ;

  _proto.getShapeArgs = function getShapeArgs() {
    var mark = this,
        config = mark.config,
        shapeObj = (0, _lib.extend2)({}, mark.shapeObj),
        // FMXT-388: work on a copy of the shapeObj so as to not alter the original shapeObj.
    radius;
    config.autoScale = 1;

    if (shapeObj) {
      if (shapeObj.type === 'polygon') {
        if (shapeObj.sides < 3) {
          shapeObj.type = CIRCLE_STR;
        } else {
          shapeObj.startangle = config.startAngle;
        }
      } else if (shapeObj.type === 'arc') {
        radius = (shapeObj.radius || config.markerRadius) * config.autoScale;
        shapeObj.radius = radius;
        shapeObj.innerradius = shapeObj.innerradius && shapeObj.innerradius * config.autoScale || radius * INNERRADIUSFACTOR;
      }

      return shapeObj;
    }

    return null;
  }
  /**
   * Prepares label object for markers
   * @param {string} labelPos label position
   * @param {string} labelPadding padding of a label
   * @param {Object} options marker configurations
   * @param {string} width max width
   * @param {string} height max height
   * @return {Object}label object need for annotation
   */
  ;

  _proto._getLabelOptions = function _getLabelOptions(labelPos, labelPadding, options, width, height) {
    var dataset = this,
        radius,
        x,
        y,
        alignment = labelPos && labelPos.toLowerCase(); // validate alignments

    if (!dataset.getLabelAlignment[alignment]) {
      alignment = CENTER_STR;
    }

    x = Number(options.x);
    y = Number(options.y);

    if (width === UNDEF || height === UNDEF) {
      // not an image
      radius = options.radius || 0;
    } else {
      // image
      radius = /^(top|bottom)$/ig.test(alignment) && height * 0.5 || /^(left|right)$/ig.test(alignment) && width * 0.5 || 0;
    }

    radius = Number(radius) + Number(labelPadding);
    return dataset.getLabelAlignment[alignment](x, y, radius);
  }
  /**
   * Add marker item
   * @param {Object} options configuration of the marker item
   */
  ;

  _proto.addMarkerItem = function addMarkerItem(options) {
    var markers = this,
        chart = markers.getFromEnv('chart'),
        item = options,
        markerObj,
        items = markers.components.markerObjs,
        shapeObjs = markers.components.shapeObjs,
        markerGroup = markers.components.markerGroup,
        markerLabelGroup = markers.components.markerLabelGroup,
        markerConfigOptions,
        annotations = markers.getChildren('mapAnnotations')[0],
        numberFormatter = markers.getFromEnv('number-formatter'),
        markerOptions = chart.config.markerOpts,
        // markerElem,
    // markerLabelElem,
    drawOptions,
        markerConfig,
        rawConfig,
        value,
        shapeId,
        id;

    if (id = item.id.toLowerCase()) {
      if (items[id]) {
        return;
      } // Data enabled markers not yet supported by this method.


      delete item.value;
      markers.imageLoadCount = 0;
      markerObj = Markers._initializeMarkerItem(id, item, null);
      markerObj.dataset = markers;
      shapeId = markerObj.config.options.shapeid;
      markerConfig = markerObj.config;
      value = item.value;
      markerConfig.cleanValue = numberFormatter.getCleanValue(value);
      markerConfigOptions = markerConfig.options;

      if (markerConfig.cleanValue !== null) {
        markerConfig.formattedValue = numberFormatter.dataLabels(value);
      } else {
        markerConfig.formattedValue = UNDEF;
      }

      markerConfig.fillColor = (0, _lib.pluck)(markerConfigOptions.fillcolor, markerConfigOptions.color, markerOptions.fillColor);
      markerConfig.fillAlpha = (0, _lib.pluck)(markerConfigOptions.fillalpha, markerConfigOptions.alpha, markerOptions.fillAlpha);
      markerConfig.fillRatio = (0, _lib.pluck)(markerConfigOptions.fillratio, markerOptions.fillRatio);
      markerConfig.fillAngle = (0, _lib.pluck)(markerConfigOptions.fillangle, markerOptions.fillAngle);
      markerConfig.borderThickness = (0, _lib.pluckNumber)(markerConfigOptions.borderthickness, markerOptions.borderThickness);
      markerConfig.borderColor = (0, _lib.pluck)(markerConfigOptions.bordercolor, markerOptions.borderColor);
      markerConfig.borderAlpha = (0, _lib.pluck)(markerConfigOptions.borderalpha, markerOptions.borderAlpha);
      markerConfig.labelPadding = markerConfigOptions.labelpadding || markerOptions.labelPadding;
      markerConfig.options.tooltext = (0, _lib.pluck)(markerConfigOptions.tooltext, markerOptions.tooltext);
      markerConfig.link = markerConfigOptions.link;

      if (shapeId) {
        markerObj.shapeObj = shapeObjs[shapeId && shapeId.toLowerCase()];
      }

      items[id] = markerObj;
      drawOptions = markers._drawMarkerItem(markerObj);

      if (markerGroup && markerLabelGroup) {
        if (drawOptions.markerShape) {
          rawConfig = Object.assign({
            align: 'center',
            valign: 'middle',
            animationLabel: 'markerItem',
            autoscale: drawOptions.markerShape.type === 'image' ? 0 : 1
          }, drawOptions.markerShape);
          markerObj.markerShape = annotations.addItem(markerGroup.getId(), rawConfig, markers);
          markerObj.markerShape.data('unfilteredConfig', rawConfig);
        }

        if (drawOptions.markerLabel) {
          rawConfig = Object.assign({
            animationLabel: 'markerItem'
          }, drawOptions.markerLabel);
          markerObj.markerLabel = annotations.addItem(markerLabelGroup.getId(), rawConfig, markers);
          markerObj.markerLabel.data('unfilteredConfig', rawConfig);
        }
      }

      markers._buildKdTree();
    }
  }
  /**
   * Updates a marker item
   * @param {string} id marker item id
   * @param {Object} options configuration of the marker item
   */
  ;

  _proto.updateMarkerItem = function updateMarkerItem(id, options) {
    var markers = this,
        chart = markers.getFromEnv('chart'),
        annotations = markers.getChildren('mapAnnotations')[0],
        markerObjs = markers.components.markerObjs,
        markerOptions = chart.config.markerOpts,
        origOptions,
        key,
        markerConfig,
        optConfig = {},
        marker = markerObjs[id],
        annotOptions;

    if (marker) {
      origOptions = marker.config.options; // Add the marker options passed to the original options to persist in case of multiple updates.

      (0, _lib.extend2)(origOptions, options);
      markers.imageLoadCount = 0; // Get the annotation options from marker options.

      markerConfig = marker.config;

      for (key in options) {
        optConfig[key.toLowerCase()] = options[key] && options[key].toString();
      }

      markerConfig.fillColor = (0, _lib.pluck)(optConfig.fillcolor, optConfig.color, markerOptions.fillColor);
      markerConfig.fillAlpha = (0, _lib.pluck)(optConfig.fillalpha, optConfig.alpha, markerOptions.fillAlpha);
      markerConfig.fillRatio = (0, _lib.pluck)(optConfig.fillratio, markerOptions.fillRatio);
      markerConfig.fillAngle = (0, _lib.pluck)(optConfig.fillangle, markerOptions.fillAngle);
      markerConfig.borderThickness = (0, _lib.pluckNumber)(optConfig.borderthickness, markerOptions.borderThickness);
      markerConfig.borderColor = (0, _lib.pluck)(optConfig.bordercolor, markerOptions.borderColor);
      markerConfig.borderAlpha = (0, _lib.pluck)(optConfig.borderalpha, markerOptions.borderAlpha);
      markerConfig.labelPadding = optConfig.labelpadding || markerOptions.labelPadding;
      markerConfig.options.tooltext = (0, _lib.pluck)(optConfig.tooltext, markerOptions.tooltext);
      markerConfig.link = optConfig.link;
      annotOptions = markers._drawMarkerItem(marker).markerShape;

      markers._buildKdTree(); // Update annotations


      annotations.update(id, annotOptions);
    }
  };

  _proto.createContainer = function createContainer() {
    var dataset = this,
        parent = dataset.getLinkedParent(),
        animationManager = dataset.getFromEnv('animationManager'),
        pContainer = parent.getChildContainer('layer1');
    !dataset.getChildContainer('abovePlotGroup') && dataset.addChildContainer('abovePlotGroup', animationManager.setAnimation({
      el: 'group',
      attr: {
        name: 'abovePlotGroup',
        opacity: 1
      },
      container: pContainer,
      component: dataset,
      label: 'group'
    }));
    !dataset.getChildContainer('belowPlotGroup') && dataset.addChildContainer('belowPlotGroup', animationManager.setAnimation({
      el: 'group',
      attr: {
        name: 'belowPlotGroup',
        opacity: 1
      },
      container: pContainer,
      component: dataset,
      label: 'group'
    }));
  }
  /**
   * Remove a marker item
   * @param {string} id marker item id
   */
  ;

  _proto._removeMarkerItem = function _removeMarkerItem(id) {
    var markers = this,
        components = markers.components,
        markerObjs = components.markerObjs,
        markerObj = markerObjs[id],
        kdArrayMap = components.kdArrayMap,
        annotations = markers.getChildren('mapAnnotations')[0],
        markerShape,
        markerLabel;

    if (markerObj) {
      markerShape = markerObj.markerShape;
      markerLabel = markerObj.markerLabel;
      markerShape && annotations.destroy(markerShape.getId());
      markerLabel && annotations.destroy(markerLabel.getId());
      delete kdArrayMap[id];

      markers._buildKdTree();
    }

    delete markerObjs[id];
  }
  /**
   * Return nearest marker element on mouse hover
   * @param {Object|boolean} point point object of mouse coordinate
   * @return {Object} marker element graphics
   */
  ;

  _proto.getElement = function getElement(point) {
    var datasetObj = this;

    if (datasetObj.components.kDTree) {
      // searches the neighbouring points using the kdtree instance.
      return datasetObj.components.kDTree.getNeighbour(point);
    }
  };

  return Markers;
}(_entities.default);

var _default = Markers;
exports["default"] = _default;

/***/ }),

/***/ 1647:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = _default;

var _lib = __webpack_require__(274);

var _entities = _interopRequireDefault(__webpack_require__(1648));

var _markers = _interopRequireDefault(__webpack_require__(1650));

var _mapGroup = _interopRequireDefault(__webpack_require__(1651));

/**
 * this is simple dataset factory. It instantiate maps
 * @param {Object} chart chart API
 */
function _default(chart) {
  var mapGroupManager,
      dataObj = chart.getFromEnv('dataSource'),
      entityJSONData = dataObj.data || {},
      markerJSONData = dataObj.markers;
  (0, _lib.componentFactory)(chart, _mapGroup.default, 'mapGroup');
  mapGroupManager = chart.getChildren('mapGroup')[0];
  (0, _lib.datasetFactory)(mapGroupManager, _entities.default, 'entities', 1, [entityJSONData]);

  if (markerJSONData) {
    (0, _lib.datasetFactory)(mapGroupManager, _markers.default, 'markers', 1, [markerJSONData]);
  } else {
    chart.getDatasets()[1] && chart.getDatasets()[1].remove();
  }
}

/***/ }),

/***/ 1645:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _maps = _interopRequireDefault(__webpack_require__(1646));

exports.Maps = _maps.default;
var _default = {
  name: 'maps',
  type: 'package',
  requiresFusionCharts: true,
  extension: function extension(FusionCharts) {
    return FusionCharts.addDep(_maps.default);
  }
};
exports["default"] = _default;

/***/ })

}]);
}));

//# sourceMappingURL=http://localhost:3052/4.1.0-beta.1/map/eval/fusioncharts.maps.js.map