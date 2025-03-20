
(function (factory) {
  if (typeof module === 'object' && typeof module.exports !== "undefined") {
      module.exports = factory;
  } else {
      factory();
  }
}(function () {
"use strict";
(self["webpackChunkFusionCharts"] = self["webpackChunkFusionCharts"] || []).push([[5],{

/***/ 1594:
/***/ ((__unused_webpack_module, exports) => {



exports.__esModule = true;
exports["default"] = void 0;

var fadeIn = function fadeIn() {
  return [{
    initialAttr: {
      opacity: 0
    },
    finalAttr: {
      opacity: 1
    },
    slot: 'axis',
    startEnd: {
      start: 0,
      end: 0.3
    }
  }];
};

var _default = {
  'initial.axis.GanttProcess': function initialAxisGanttProcess() {
    return {
      'path.appearing': fadeIn,
      'rect.appearing': fadeIn,
      'text.appearing': fadeIn
    };
  },
  'initial.axis.GanttTime': function initialAxisGanttTime() {
    return {
      'path.appearing': fadeIn,
      'rect.appearing': fadeIn,
      'text.appearing': fadeIn
    };
  }
};
exports["default"] = _default;

/***/ }),

/***/ 1592:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports.extractAttribToEnd = extractAttribToEnd;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _gantt = _interopRequireWildcard(__webpack_require__(1593));

var _lib = __webpack_require__(274);

var _dependencyManager = __webpack_require__(282);

var _ganttCommon = _interopRequireDefault(__webpack_require__(1594));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }], complexity: 'off' */
var UNDEF, lastHoverEle, hoverTimeout;

var PXSTRING = 'px',
    NONE = 'none',
    UND_LINE = 'underline',
    VISIBLE_STR = 'visible',
    HIDDEN_STR = 'hidden',
    START_STR = 'start',
    END_STR = 'end',
    MIDDLE_STR = 'middle',
    HALF_SECOND = 500,

/**
 * Method that returns an element of provided id from an array of elements
 * @param {Array} elemArr array of elements
 * @param {string} id if the element to be fetched
 * @return {Object} returns the element if found, else returns false
*/
_hasElements = function _hasElements(elemArr, id) {
  var i;

  for (i = 0; i < elemArr.length; i++) {
    if (elemArr[i].id === id) {
      return elemArr[i];
    }
  }

  return false;
},

/**
 * Function return all the attribute as object
 * @param {Object} obj The object for which the attribute list is to be extracted
 * @return {Object} The return object that contain all the atribute list
 */
_getAttribAsObj = function _getAttribAsObj(obj) {
  var ind,
      ret = {};

  for (ind in obj) {
    if (obj.hasOwnProperty(ind) && typeof obj[ind] === 'string' && !!obj[ind]) {
      ret[ind] = obj[ind];
    }
  }

  return ret;
};
/**
 * Function help to extract the all attribute from parent to its child
 * @param {Object} obj The Object for which the attribute to be extracted
 * @param {Object} attribObj the attribute object
 */


function extractAttribToEnd(obj, attribObj) {
  var ind;
  obj._attrib = (0, _lib.extend2)({}, attribObj);
  obj._attrib = (0, _lib.extend2)(obj._attrib, _getAttribAsObj(obj));

  for (ind in obj) {
    if (obj.hasOwnProperty(ind) && !!obj[ind] && typeof obj[ind] === 'object' && ind !== '_attrib') {
      extractAttribToEnd(obj[ind], obj._attrib);
    }
  }
}

(0, _dependencyManager.addDep)({
  name: 'ganttCommonAnimation',
  type: 'animationRule',
  extension: _ganttCommon.default
});
/**
 * An extension of the cartesian axis which defines some methods which is used by the Gantt char API
 * to render its axis.
 */

var GantCommonAxis = /*#__PURE__*/function (_GanttAxis) {
  (0, _inheritsLoose2.default)(GantCommonAxis, _GanttAxis);

  /**
   * Creates an instance of GantCommonAxis. Specially, it creates a components object where it
   * stores components that are not a part of the component interface.
   * @memberof GantCommonAxis
   */
  function GantCommonAxis() {
    var _this;

    _this = _GanttAxis.call(this) || this;
    _this.components = {};
    return _this;
  }
  /**
   * Gets the name of the component
   * @return {string} name
   */


  var _proto = GantCommonAxis.prototype;

  _proto.getName = function getName() {
    return 'GanttCommon';
  }
  /**
   * Draws the plot lines along the axis.
   */
  ;

  _proto._drawPlotLine = function _drawPlotLine() {
    var axis = this,
        axisConfig = axis.config,
        chart = axis.getFromEnv('chart'),
        canvas = chart.getChildren('canvas')[0],
        chartConfig = chart.config,
        axisPlotLineContainerBottom = axis.getContainer('ganttPlotLineContainer'),
        canvasBottom = canvas.canvasBottom || chartConfig.canvasBottom,
        canvasLeft = canvas.canvasLeft || chartConfig.canvasLeft,
        canvasRight = canvas.canvasRight || chartConfig.canvasRight,
        canvasTop = canvas.canvasTop || chartConfig.canvasTop,
        animationManager = axis.getFromEnv('animationManager'),
        gridArr = axisConfig.gridArr,
        plotLine = axis.getGraphicalElement('plotLine'),
        // animateAxis = axisConfig.animateAxis,
    // animationDuration,
    // transposeAnimDuration,
    lineStyle,
        lineElement,
        i,
        ln,
        // animObj,
    // dummyObj,
    // animType,
    path = []; // animationDuration = chartConfig.animationObj;
    // animObj = animationDuration.animObj;
    // dummyObj = animationDuration.dummyObj;
    // transposeAnimDuration = animationDuration.transposeAnimDuration;
    // animType = animationDuration.animType;

    for (i = 0, ln = gridArr.length; i < ln; i += 1) {
      if (gridArr[i].x !== UNDEF) {
        path.push('M', gridArr[i].x, canvasTop, 'L', gridArr[i].x, canvasBottom);
      } else {
        path.push('M', canvasLeft, gridArr[i].y, 'L', canvasRight, gridArr[i].y);
      }
    }

    lineStyle = {
      'stroke-dasharray': axisConfig.plotLineDashStyle,
      'stroke-width': axisConfig.plotLineThickness,
      stroke: axisConfig.plotLineColor,
      path: path
    };
    lineElement = animationManager.setAnimation({
      el: plotLine && plotLine[0] || 'path',
      attr: lineStyle,
      container: axisPlotLineContainerBottom,
      label: 'path',
      component: axis
    });

    if (!(plotLine && plotLine[0])) {
      axis.addGraphicalElement('plotLine', lineElement, true);
    }
  }
  /**
   * Draws a trend line along the axis
   */
  ;

  _proto._drawTrendLine = function _drawTrendLine() {
    var axis = this,
        trendArr = axis.getComponentInfo('trend'),
        tooltipController = axis.getFromEnv('toolTipController'),
        i,
        markerObj,
        labelObj,
        axisConfig = axis.config,
        axisDrawingAttrObj,
        axisTextAttrObj,
        startValuePixel,
        isTrendZone,
        endValuePixel,
        startValue,
        endValue,
        fixedTrendLabelPos,
        fixedTrendLabelPosRight,
        isOpposit = axisConfig.isOpposit,
        crispPath,
        axisPadding = axisConfig.labelPadding,
        chart = axis.getFromEnv('chart'),
        animationManager = chart.getFromEnv('animationManager'),
        chartConfig = chart.config,
        canvas = chart.getChildren('canvas')[0],
        canvasBottom = canvas.config.canvasTop + canvas.config.canvasHeight,
        canvasLeft = canvas.config.canvasLeft || chartConfig.canvasLeft,
        canvasRight = canvas.config.canvasRight || chartConfig.canvasRight,
        canvasTop = canvas.config.canvasTop || chartConfig.canvasTop,
        drawTrendLabels = axisConfig.drawTrendLabels,
        trendlabels = axis.getGraphicalElement('trendlabels') || [],
        axisTrendContainerTop = axisConfig.axisTrendContainerTop,
        axisTrendContainerBottom = axisConfig.axisTrendContainerBottom,
        axisTrendContainer,
        axisDimention = axisConfig.axisDimention || {},
        checkForLimit = axis._isZoomed(),
        getLimit = axis.getVisibleConfig(),
        maxPx,
        minPx,
        showOnTop,
        xOffset = chartConfig.xOffset * -1,
        valueOnRight,

    /*
    * id is appended with each type of graphical elements so that these elements are stored
    * uniquely for each axes. When this fn would get invoked for other axes; it would retrive
    * only the graphical elements which are related to only that axis. So that all the graphical
    * elements should not be stored at the same place for all axes. It will prevent the fetching
    * of wrong graphical elements.
    */
    // TODO: We have to find a proper way to handle all this operations for trendline, vtrendline etc.
    trendElemsArr = axis.getGraphicalElement('trendElems'),
        trendTextElemsArr = axis.getGraphicalElement('trendlabels'),
        trendElems,
        trendTextElems,
        trendlines = axisConfig.trendLines,
        vtrendlines = axisConfig.vTrendLines;

    !trendElemsArr && (trendElemsArr = []);
    !trendTextElemsArr && (trendTextElemsArr = []); // initially remove the trend elements

    for (i = 0; i < trendElemsArr.length; i++) {
      trendElems = _hasElements(trendElemsArr, i);

      if (trendElems) {
        trendElems.remove();
      }
    }

    if (vtrendlines) {
      fixedTrendLabelPos = isOpposit ? (axisDimention.opposite || canvasBottom) - (axisConfig.trendBottomPadding || 0) : (axisDimention.y || canvasBottom) + (axisConfig.trendBottomPadding || 0);
    } else {
      fixedTrendLabelPos = isOpposit ? (axisDimention.opposite || canvasLeft) + (axisPadding || 0) : (axisDimention.x || canvasLeft) - (axisPadding || 0);
      fixedTrendLabelPosRight = isOpposit ? (axisDimention.x || canvasRight) + (axisPadding || 0) : (axisDimention.opposite || canvasRight) + (axisPadding || 0);
    }

    if (checkForLimit) {
      maxPx = Math.max(axis.getPixel(getLimit.minValue, {
        wrtVisible: true
      }), axis.getPixel(getLimit.maxValue, {
        wrtVisible: true
      }));
      minPx = Math.min(axis.getPixel(getLimit.minValue, {
        wrtVisible: true
      }), axis.getPixel(getLimit.maxValue, {
        wrtVisible: true
      }));
    }

    if (trendlines || vtrendlines) {
      for (i = 0; i < trendArr.length; i++) {
        markerObj = trendArr[i].marker;
        labelObj = trendArr[i].label;
        axisDrawingAttrObj = {
          fill: markerObj.fill || '',
          stroke: markerObj.stroke || '',
          'stroke-width': markerObj.strokeWidth,
          'stroke-dasharray': markerObj.strokeDashArray,
          'shape-rendering': markerObj.shapeRendering
        };
        axisTextAttrObj = {
          fill: labelObj.fill || '',
          text: labelObj.text,
          'text-anchor': labelObj.textAnchor,
          'text-bound': labelObj.textBound
        };
        isTrendZone = markerObj.isZone;
        startValue = markerObj.startValue;
        endValue = markerObj.endValue;

        if (vtrendlines) {
          startValuePixel = axis.getPixel(axisConfig.hasBreakPoints ? axis._getRelativeBreakValue(startValue) : startValue, {
            wrtVisible: true
          });
          endValuePixel = endValue ? axis.getPixel(axisConfig.hasBreakPoints ? axis._getRelativeBreakValue(endValue) : endValue, {
            wrtVisible: true
          }) : 0; // Add the offset during scroll

          startValuePixel += xOffset;
          endValuePixel += xOffset;
          axisTextAttrObj.y = fixedTrendLabelPos;
          axisTextAttrObj['vertical-align'] = 'top';

          if (endValue !== UNDEF && endValue !== '' && endValue !== startValue && isTrendZone) {
            axisDrawingAttrObj.path = ['M', startValuePixel, canvasTop, 'L', startValuePixel, canvasBottom, 'L', endValuePixel, canvasBottom, 'L', endValuePixel, canvasTop, 'Z'];
            axisTextAttrObj.x = startValuePixel + (endValuePixel - startValuePixel) / 2;
          } else {
            // trend line
            crispPath = endValue ? (0, _gantt.getCrispPath)(['M', startValuePixel, canvasTop, 'L', endValuePixel, canvasBottom], markerObj.strokeWidth) : (0, _gantt.getCrispPath)(['M', startValuePixel, canvasTop, 'L', startValuePixel, canvasBottom], markerObj.strokeWidth);
            axisDrawingAttrObj.path = crispPath.path;
            axisTextAttrObj.x = endValue ? endValuePixel : startValuePixel;
          } // checking if the text is out of viewport


          if (checkForLimit && (!drawTrendLabels || axisTextAttrObj.x > maxPx || axisTextAttrObj.x < minPx)) {
            axisTextAttrObj.text = _lib.BLANKSTRING;
            axisTextAttrObj.visibility = HIDDEN_STR;
          } else {
            axisTextAttrObj.visibility = VISIBLE_STR;
          }
        } else if (trendlines) {
          startValuePixel = axis.getPixel(startValue, {
            wrtVisible: true
          });
          endValuePixel = endValue ? axis.getPixel(endValue, {
            wrtVisible: true
          }) : 0;
          valueOnRight = labelObj.valueOnRight;

          if (endValue !== UNDEF && endValue !== '' && endValue !== startValue && isTrendZone) {
            // trend zone
            axisDrawingAttrObj.path = ['M', canvasLeft, startValuePixel, 'L', canvasRight, startValuePixel, 'L', canvasRight, endValuePixel, 'L', canvasLeft, endValuePixel, 'Z'];
            axisTextAttrObj.x = valueOnRight ? fixedTrendLabelPosRight : fixedTrendLabelPos;
            axisTextAttrObj.y = startValuePixel + (endValuePixel - startValuePixel) / 2;
          } else {
            // trend line
            crispPath = endValue ? (0, _gantt.getCrispPath)(['M', canvasLeft, startValuePixel, 'L', canvasRight, endValuePixel, 'Z'], markerObj.strokeWidth) : (0, _gantt.getCrispPath)(['M', canvasLeft, startValuePixel, 'L', canvasRight, startValuePixel, 'Z'], markerObj.strokeWidth);
            axisDrawingAttrObj.path = crispPath.path;
            axisTextAttrObj.x = valueOnRight ? fixedTrendLabelPosRight : fixedTrendLabelPos;
            axisTextAttrObj.y = endValue ? valueOnRight ? endValuePixel : startValuePixel : startValuePixel;
          } // checking if the text is out of viewport


          if (checkForLimit && (!drawTrendLabels || axisTextAttrObj.y > maxPx || axisTextAttrObj.y < minPx)) {
            axisTextAttrObj.text = _lib.BLANKSTRING;
            axisTextAttrObj.visibility = HIDDEN_STR;
          } else {
            axisTextAttrObj.visibility = VISIBLE_STR;
          }
        } // if show on top or bottom set the container accordingly


        showOnTop = trendArr[i].showOnTop;

        if (!chart.config.is3D && (showOnTop === 1 || axisConfig.showTrendlinesOnTop === 1)) {
          axisTrendContainer = axisTrendContainerTop;
        } else {
          axisTrendContainer = axisTrendContainerBottom;
        }

        trendElems = _hasElements(trendElemsArr, i);
        trendElems = animationManager.setAnimation({
          el: trendElems || 'path',
          attr: axisDrawingAttrObj,
          container: axisTrendContainer,
          label: 'path',
          component: axis
        }).show();
        trendTextElems = trendTextElemsArr[i];

        if (trendTextElems) {
          animationManager.setAnimation({
            el: trendTextElems,
            attr: axisTextAttrObj,
            label: 'text',
            component: axis
          });
        }

        !_hasElements(trendElemsArr, i) && axis.addGraphicalElement('trendElems', trendElems, true);
        trendElems.id = i;

        if (labelObj.toolText !== '') {
          tooltipController.enableToolTip(trendElems, labelObj.toolText);
        } else {
          tooltipController.disableToolTip(trendElems);
        }
      }
    } else {
      for (i = 0; i < trendElemsArr.length; i++) {
        trendElems = _hasElements(trendElemsArr, i);

        if (trendElems) {
          trendElems.remove();
          trendlabels[i] && trendlabels[i].remove();
        }
      }
    }
  }
  /**
   * Extracts and parses styles for the processes and data tables.
   *
   * @param {Object} attrs The configuration from which to extract styles
   * @return {Object} The extracted styles
   */
  ;

  _proto._drawProcessAndDataTableStyleParser = function _drawProcessAndDataTableStyleParser(attrs) {
    var axis = this,
        axisConfig = axis.config,
        chart = axis.getFromEnv('chart'),
        smartLabel = axis.getFromEnv('smartLabel'),
        colorM = axis.getFromEnv('color-manager'),
        labels = axisConfig.labels,
        style = labels.style,
        elem = attrs.elem || {},
        dimension = attrs.dimension,
        textStyle = elem._attrib || {},
        left = dimension.left,
        right = dimension.right,
        top = dimension.top,
        bottom = dimension.bottom,
        processPadding = 2,
        fontFamily,
        fontSize,
        fontWeight,
        fontStyle,
        bgColor,
        xPos,
        yPos,
        text,
        retAttrib,
        smartText,
        vAlign,
        align,
        color,
        textDecoration,
        hoverC,
        hoverA,
        useHover,
        usePlotHover,
        rollOverColor,
        link,
        lHeight;

    switch (attrs.type) {
      case 'category':
      case 'datatable':
      case 'process':
        fontFamily = (0, _lib.pluck)(textStyle.font, style.fontFamily);
        fontSize = (0, _lib.pluck)(textStyle.fontsize, this.computeFontSize(style.fontSizeWithUnit).toString()).replace(/px/i, '') + PXSTRING;
        fontStyle = (0, _lib.pluck)(Number(textStyle.isitalic) ? 'italic' : UNDEF, style.fontStyle);
        bgColor = (0, _lib.convertColor)((0, _lib.pluck)(textStyle.bgcolor ? (0, _lib.getFirstColor)(textStyle.bgcolor) : UNDEF, colorM.getColor('categoryBgColor')), (0, _lib.pluckNumber)(textStyle.bgalpha, 100));
        color = (0, _lib.pluck)(textStyle.fontcolor ? (0, _lib.getFirstColor)(textStyle.fontcolor) : UNDEF, style.color);
        textDecoration = (0, _lib.pluckNumber)(textStyle.isunderline, 0) && UND_LINE || NONE;
        vAlign = (0, _lib.pluck)(textStyle.valign, 'center').toLowerCase();
        align = (0, _lib.pluck)(textStyle.align, 'middle').toLowerCase();
        text = elem.drawLabel || '';
        fontWeight = (0, _lib.pluck)(Number(textStyle.isbold) ? 'bold' : UNDEF, style.fontWeight);
        link = elem.link;
        break;

      case 'header':
        fontFamily = (0, _lib.pluck)(textStyle.headerfont, style.fontFamily);
        fontSize = (0, _lib.pluck)(textStyle.headerfontsize, this.computeFontSize(style.fontSizeWithUnit).toString()).replace(/px/i, '') + PXSTRING;
        fontWeight = (0, _lib.pluck)(Number(textStyle.headerisbold) === 1 ? 'bold' : textStyle.headerisbold === UNDEF ? 'bold' : UNDEF, style.fontWeight);
        color = (0, _lib.pluck)(textStyle.headerfontcolor ? (0, _lib.getFirstColor)(textStyle.headerfontcolor) : UNDEF, style.color);
        textDecoration = (0, _lib.pluckNumber)(textStyle.headerisunderline, 0) && UND_LINE || NONE;
        fontStyle = (0, _lib.pluck)(textStyle.headerisitalic ? 'italic' : UNDEF, style.fontStyle);
        bgColor = (0, _lib.convertColor)((0, _lib.pluck)(textStyle.headerbgcolor ? (0, _lib.getFirstColor)(textStyle.headerbgcolor) : UNDEF, colorM.getColor('categoryBgColor')), (0, _lib.pluckNumber)(textStyle.headerbgalpha, 100));
        vAlign = (0, _lib.pluck)(textStyle.headervalign, 'center').toLowerCase();
        align = (0, _lib.pluck)(textStyle.headeralign, 'middle').toLowerCase();
        text = elem.drawLabel || '';
        link = elem.headerlink;
        break;
    }

    switch (attrs.type) {
      case 'category':
        axisConfig.gridLinePath += 'M' + left + ',' + top + 'L' + left + ',' + bottom + 'L' + right + ',' + bottom;
        fontWeight = (0, _lib.pluck)(Number(textStyle.isbold) === 1 ? 'bold' : textStyle.isbold === UNDEF ? 'bold' : UNDEF, style.fontWeight);
        break;

      case 'datatable':
      case 'process':
        axisConfig.gridLinePath += 'M' + left + ',' + bottom + 'L' + right + ',' + bottom + 'L' + right + ',' + top;
        break;

      case 'header':
        axisConfig.gridLineHeaderPath += 'M' + left + ',' + bottom + 'L' + right + ',' + bottom + 'L' + right + ',' + top;
        break;
    }

    hoverC = (0, _lib.pluck)(elem._attrib.hoverbandcolor, axisConfig.hoverColor);
    hoverA = (0, _lib.pluckNumber)(elem._attrib.hoverbandalpha, axisConfig.hoverAlpha);

    if (align === 'left') {
      xPos = left + processPadding;
      align = START_STR;
    } else if (align === 'right') {
      xPos = left + (right - left) - processPadding;
      align = END_STR;
    } else {
      align = MIDDLE_STR;
      xPos = left + (right - left) / 2;
    }

    if (vAlign === 'top') {
      yPos = top - processPadding;
    } else if (vAlign === 'bottom') {
      yPos = top + (bottom - top) - processPadding;
    } else {
      vAlign = MIDDLE_STR;
      yPos = top + (bottom - top) / 2;
    }

    style = {
      fontFamily: fontFamily,
      fontSize: fontSize,
      fontWeight: fontWeight,
      fontStyle: fontStyle,
      textDecoration: textDecoration
    };
    lHeight = (0, _lib.setLineHeight)(style);
    lHeight = Number(lHeight.replace(/px/i, ''));
    lHeight = bottom - top > lHeight ? bottom - top : lHeight;
    smartLabel.useEllipsesOnOverflow(chart.config.useEllipsesWhenOverflow);
    smartLabel.setStyle(style);
    smartText = smartLabel.getSmartText(text, right - left, lHeight);
    retAttrib = {
      textAttr: {
        x: xPos,
        y: yPos,
        text: smartText.text,
        fill: color,
        'text-anchor': align,
        'vertical-align': vAlign,
        cursor: link ? 'pointer' : chart.getFromEnv('paper').canvas.style.cursor
      },
      css: style,
      rectAttr: {
        x: left,
        y: top,
        width: left < right ? right - left : 0,
        height: top < bottom ? bottom - top : 0,
        fill: bgColor,
        'stroke-width': 0,
        cursor: link ? 'pointer' : chart.getFromEnv('paper').canvas.style.cursor
      },
      eventArgs: {
        isHeader: attrs.type === 'header',
        label: text,
        vAlign: vAlign,
        align: align,
        link: link,
        id: elem.id
      },
      tooltext: smartText.oriText
    };

    if (attrs.type === 'datatable' || attrs.type === 'process' || attrs.type === 'category') {
      rollOverColor = (0, _lib.convertColor)(hoverC, hoverA);
      useHover = (0, _lib.pluckNumber)(elem._attrib.showhoverband, axisConfig.useHover);
      usePlotHover = (0, _lib.pluckNumber)(elem._attrib.showganttpanehoverband, axisConfig.usePlotHover, useHover);
      retAttrib.dataArgs = {
        rollOverColor: rollOverColor,
        useHover: useHover,
        usePlotHover: usePlotHover,
        dimension: dimension,
        hoverEle: elem,
        type: attrs.type,
        pos: attrs.pos,
        axis: axis,
        groupId: attrs.elemIndex
      };
    } else {
      retAttrib.dataArgs = {
        rollOverColor: UNDEF,
        useHover: 0,
        usePlotHover: 0,
        dimension: dimension,
        hoverEle: elem,
        type: attrs.type,
        pos: attrs.pos,
        axis: axis,
        groupId: attrs.elemIndex
      };
    }

    return retAttrib;
  }
  /**
   * Draws the processes and data tables.
   *
   * @param {Object} attrs The configuration using which to dray the processes and data tables
   */
  ;

  _proto._drawProcessAndDataTableElement = function _drawProcessAndDataTableElement(attrs) {
    var axis = this,
        axisConfig = axis.config,
        chart = axis.getFromEnv('chart'),
        categoryElement = axis.components.categoryElement || [],
        hoverElemsArr = axisConfig.hoverElemsArr || (axisConfig.hoverElemsArr = []),
        animationManager = axis.getFromEnv('animationManager'),
        elemIndex = attrs.elemIndex,
        labelHoverEventName = axisConfig.labelHoverEventName,
        toolTipController = axis.getFromEnv('toolTipController'),
        // animationDuration,
    // transposeAnimDuration,
    attribs,
        labelBackContainer,
        labelTextContainer,
        rectElement,
        textElement,
        // animObj,
    // dummyObj,
    showTooltip = chart.config.showtooltip,
        // animType,
    labelClickHandler = function labelClickHandler(e) {
      var ele = this;
      /**
       * In `Gantt` chart, category element distributes the time line into visual divisions
       * This event is fired when a category is clicked.
       *
       * This event is only applicable to Gantt chart.
       *
       * @event FusionCharts#categoryClick
       *
       * @param { string } align - The alignment of the category label.
       * @param { string } vAlign - The vertical alignment of the category label.
       * @param { number } chartX - x-coordinate of the pointer relative to the chart.
       * @param { number } chartY - y-coordinate of the pointer relative to the chart.
       * @param { number } pageX - x-coordinate of the pointer relative to the page.
       * @param { number } pageY - y-coordinate of the pointer relative to the page.
       * @param { string } link - URL set for the category on mouse click.
       * @param { string } text - The label in the category
       * @see FusionCharts#event:categoryRollOver
       * @see FusionCharts#event:categoryRollOut
       */

      chart.plotEventHandler(ele, e, labelHoverEventName.click);
    },
        labelRollOver = function labelRollOver(e) {
      var ele = this;
      hoverTimeout = clearTimeout(hoverTimeout);

      if (!lastHoverEle || lastHoverEle.removed) {
        lastHoverEle = null;
      }

      lastHoverEle && axis._gridOutHandler.call(lastHoverEle);

      axis._gridHoverHandler.call(ele);
      /**
       * In `Gantt` chart, category element distributes the time line into visual divisions
       * This event is fired when the pointer moves over a category.
       *
       * This event is only applicable to Gantt chart.
       *
       * @event FusionCharts#categoryRollOver
       *
       * @param { string } align - The alignment of the category label.
       * @param { string } vAlign - The vertical alignment of the category label.
       * @param { number } chartX - x-coordinate of the pointer relative to the chart.
       * @param { number } chartY - y-coordinate of the pointer relative to the chart.
       * @param { number } pageX - x-coordinate of the pointer relative to the page.
       * @param { number } pageY - y-coordinate of the pointer relative to the page.
       * @param { string } link - URL set for the category on mouse click.
       * @param { string } text - The label in the category
       * @see FusionCharts#event:categoryClick
       * @see FusionCharts#event:categoryRollOut
       */


      chart.plotEventHandler(ele, e, labelHoverEventName.rollOver);
    },
        labelRollOut = function labelRollOut(e) {
      lastHoverEle = this;
      hoverTimeout = clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(function () {
        return axis._gridOutHandler.call(lastHoverEle);
      }, HALF_SECOND);
      /**
           * In `Gantt` chart, category element distributes the time line into visual divisions
           * This event is fired when the pointer moves out of a category.
           *
           * This event is only applicable to Gantt chart.
           *
           * @event FusionCharts#categoryRollOut
           *
           * @param { string } align - The alignment of the category label.
           * @param { string } vAlign - The vertical alignment of the category label.
           * @param { number } chartX - x-coordinate of the pointer relative to the chart.
           * @param { number } chartY - y-coordinate of the pointer relative to the chart.
           * @param { number } pageX - x-coordinate of the pointer relative to the page.
           * @param { number } pageY - y-coordinate of the pointer relative to the page.
           * @param { string } link - URL set for the category on mouse click.
           * @param { string } text - The label in the category
           * @see FusionCharts#event:categoryClick
           * @see FusionCharts#event:categoryRollOver
           */

      chart.plotEventHandler(lastHoverEle, e, labelHoverEventName.rollOut);
    }; // animationDuration = chart.config.animationObj;
    // animObj = animationDuration.animObj;
    // dummyObj = animationDuration.dummyObj;
    // transposeAnimDuration = animationDuration.transposeAnimDuration;
    // animType = animationDuration.animType;


    if (attrs.type === 'header') {
      labelBackContainer = axis.getContainer('headerBackContainer');
      labelTextContainer = axis.getContainer('headerTextContainer');
    } else {
      labelBackContainer = axis.getContainer('labelBackContainer');
      labelTextContainer = axis.getContainer('labelTextContainer');
    }

    attribs = axis._drawProcessAndDataTableStyleParser(attrs);
    rectElement = animationManager.setAnimation({
      el: categoryElement[elemIndex] && categoryElement[elemIndex].graphics.rect || 'rect',
      attr: attribs.rectAttr,
      container: labelBackContainer,
      label: 'rect',
      component: axis
    });
    textElement = animationManager.setAnimation({
      el: categoryElement[elemIndex] && categoryElement[elemIndex].graphics.label || 'text',
      attr: attribs.textAttr,
      container: labelTextContainer,
      label: 'text',
      component: axis
    });

    if (categoryElement[elemIndex]) {
      textElement.removeCSS();
      labelBackContainer.appendChild(rectElement);
      labelTextContainer.appendChild(textElement);
    } else {
      axis.addGraphicalElement('rectElement', rectElement, true);
      axis.addGraphicalElement('textElement', textElement, true);
      categoryElement[elemIndex] = {};
      categoryElement[elemIndex].graphics = {};
      categoryElement[elemIndex].config = {};
      categoryElement[elemIndex].graphics.label = textElement;
      categoryElement[elemIndex].graphics.rect = rectElement;
      rectElement.hover(labelRollOver, labelRollOut).on('fc-click', labelClickHandler);
      textElement.hover(labelRollOver, labelRollOut).on('fc-click', labelClickHandler);
    }

    textElement.css(attribs.css);

    if (attrs.type !== 'header') {
      if (!hoverElemsArr[attrs.pos]) {
        hoverElemsArr[attrs.pos] = [];
      }

      hoverElemsArr[attrs.pos].push({
        bgElem: rectElement,
        bgColor: attribs.rectAttr.fill
      });
    }

    rectElement.data('dataObj', attrs.elem).data('eventArgs', attribs.eventArgs).data('data', attribs.dataArgs);
    textElement.data('dataObj', attrs.elem).data('eventArgs', attribs.eventArgs).data('data', attribs.dataArgs);

    if (!showTooltip) {
      toolTipController.disableToolTip(textElement);
    } else {
      toolTipController.enableToolTip(textElement, attribs.tooltext);
    }

    axis.components.categoryElement = categoryElement;
  }
  /**
   * Draws grid lines along the axis.
   */
  ;

  _proto._drawGridLine = function _drawGridLine() {
    var axis = this,
        axisConfig = axis.config,
        animationManager = axis.getFromEnv('animationManager'),
        gridLine = axis.getGraphicalElement('gridLine') || [],
        // animationDuration,
    // transposeAnimDuration,
    lineStyle,
        lineElement,
        counter = 0,
        i = 0,
        ln = 2,
        path,
        // animObj,
    // dummyObj,
    // animType,
    container; // animationDuration = chart.config.animationObj;
    // animObj = animationDuration.animObj;
    // dummyObj = animationDuration.dummyObj;
    // transposeAnimDuration = animationDuration.transposeAnimDuration;
    // animType = animationDuration.animType;

    lineStyle = {
      'stroke-dasharray': axisConfig.lineDashStyle,
      'stroke-width': axisConfig.lineThickness,
      stroke: axisConfig.lineColor
    };

    for (; i < ln; i += 1) {
      if (i === 0) {
        path = axisConfig.gridLinePath;
        container = axis.getContainer('labelLineContainer');
      } else {
        path = axisConfig.gridLineHeaderPath;
        container = axis.getContainer('headerLineContainer');

        if (!path) {
          continue;
        }
      }

      lineStyle.path = path;
      lineElement = animationManager.setAnimation({
        el: gridLine && gridLine[counter] || 'path',
        attr: lineStyle,
        container: container,
        label: 'path',
        component: axis
      });
      !(gridLine && gridLine[counter]) && axis.addGraphicalElement('gridLine', lineElement, true);
      counter += 1;
    }

    for (i = counter, ln = axis.getGraphicalElement('gridLine').length; i < ln; i += 1) {
      axis.getGraphicalElement('gridLine')[i].attr({
        path: 'M0,0'
      });
    }
  }
  /**
   * The method is invoked when the mouse hovers over a grid along the axis.
   */
  ;

  _proto._gridHoverHandler = function _gridHoverHandler() {
    var data = this.data('data'),
        type = data.type,
        dimension = data.dimension,
        axis = data.axis,
        chart = axis.getFromEnv('chart'),
        chartConfig = chart.config,
        animationManager = axis.getFromEnv('animationManager'),
        hoverElems = axis.config.hoverElemsArr || [],
        ganttPlotHoverBandContainer = axis.getContainer('ganttPlotHoverBandContainer'),
        plotHoverElement = axis.getGraphicalElement('plotHoverElement'),
        isPlotHoverElement = plotHoverElement ? 1 : 0,
        plotHoverElementAttr,
        i,
        ln;

    if (type === 'category') {
      plotHoverElementAttr = {
        x: dimension.left,
        y: chartConfig.canvasTop,
        width: dimension.left < dimension.right ? dimension.right - dimension.left : 0,
        height: chartConfig.height,
        fill: data.rollOverColor,
        'stroke-width': 0
      };
    } else {
      plotHoverElementAttr = {
        y: dimension.top,
        x: chartConfig.canvasLeft,
        height: dimension.top < dimension.bottom ? dimension.bottom - dimension.top : 0,
        width: chartConfig.width,
        fill: data.rollOverColor,
        'stroke-width': 0
      };
    }

    if (data.usePlotHover) {
      plotHoverElement = animationManager.setAnimation({
        el: plotHoverElement || 'rect',
        attr: plotHoverElementAttr,
        component: axis,
        label: 'rect',
        container: ganttPlotHoverBandContainer
      }); // if plotHoverElement is present(for update case) then show else add as graphical element to axis(render for 1st time)

      isPlotHoverElement ? plotHoverElement.show() : axis.addGraphicalElement('plotHoverElement', plotHoverElement);
    }

    if (data.useHover && hoverElems[data.pos]) {
      for (i = 0, ln = hoverElems[data.pos].length; i < ln; i += 1) {
        animationManager.setAnimation({
          el: hoverElems[data.pos][i].bgElem || 'rect',
          attr: {
            'fill': data.rollOverColor
          },
          label: 'rect'
        });
      }
    }
  }
  /**
   * The method is invoked when the mouse hovers out of a grid along the axis.
   */
  ;

  _proto._gridOutHandler = function _gridOutHandler() {
    var data = this.data('data'),
        axis = data.axis,
        hoverElemsArr = axis.config.hoverElemsArr || [],
        animationManager = axis.getFromEnv('animationManager'),
        plotHoverElement = axis.getGraphicalElement('plotHoverElement'),
        i,
        ln,
        hoverOutElem;

    if (data.usePlotHover) {
      if (plotHoverElement) {
        plotHoverElement.hide();
      }
    }

    if (data.useHover && hoverElemsArr[data.pos]) {
      for (i = 0, ln = hoverElemsArr[data.pos].length; i < ln; i += 1) {
        hoverOutElem = hoverElemsArr[data.pos][i];
        animationManager.setAnimation({
          el: hoverOutElem.bgElem || 'rect',
          attr: {
            'fill': hoverOutElem.bgColor
          },
          label: 'rect'
        });
      }
    }
  }
  /**
   * Disposes any extra processes or data tables on an update
   *
   * @param {number} index The index from which to remove the element
   */
  ;

  _proto._disposeExtraProcessAndDataTableElement = function _disposeExtraProcessAndDataTableElement(index) {
    var axis = this,
        categoryElement = axis.components.categoryElement || [],
        i,
        ln;

    for (i = index, ln = categoryElement.length; i < ln; i += 1) {
      categoryElement[i].graphics.label.attr({
        text: ''
      });
      categoryElement[i].graphics.rect.attr({
        x: 0,
        y: 0,
        width: 0,
        heigth: 0
      });
    }
  };

  return GantCommonAxis;
}(_gantt.default);

var _default = GantCommonAxis;
exports["default"] = _default;

/***/ }),

/***/ 1591:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _ganttCommon = _interopRequireWildcard(__webpack_require__(1592));

var _lib = __webpack_require__(274);

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }], complexity: 'off' */
var UNDEF;
var DEFAULT_DASH_STYLE = 'none',
    PXSTRING = 'px',
    TRANSFORM = 't0,0',
    DEFAULT_HOVER_ALPHA = 30;
/**
 * Defines an axis which can position a Gantt chart's proceses.
 */

var GanttProcessAxis = /*#__PURE__*/function (_GanttCommonAxis) {
  (0, _inheritsLoose2.default)(GanttProcessAxis, _GanttCommonAxis);

  function GanttProcessAxis() {
    return _GanttCommonAxis.apply(this, arguments) || this;
  }

  var _proto = GanttProcessAxis.prototype;

  /**
   * Gets the name of the component
   * @return {string} name
   */
  _proto.getName = function getName() {
    return 'GanttProcess';
  }
  /**
   * Configures the process axis of a Gantt chart
   *
   * @param {any} rawAttr The raw attributes using which axis will configure itself
   */
  ;

  _proto.configure = function configure(rawAttr) {
    var axisConfig = this.config,
        colorM = this.getFromEnv('color-manager'),
        jsonData = this.getFromEnv('dataSource'),
        chartData = jsonData.chart;

    _GanttCommonAxis.prototype.configure.call(this, rawAttr);

    axisConfig.lineColor = (0, _lib.convertColor)((0, _lib.pluck)(chartData.gridbordercolor, colorM.getColor('gridColor')), (0, _lib.pluckNumber)(chartData.gridborderalpha, 100));
    axisConfig.lineThickness = (0, _lib.pluckNumber)(chartData.gridborderthickness, 1);
    axisConfig.lineDashStyle = (0, _lib.pluckNumber)(chartData.gridborderdashed, 0) ? (0, _lib.getDashStyle)((0, _lib.pluckNumber)(chartData.gridborderdashlen, 1), chartData.gridborderdashgap, axisConfig.lineThickness) : DEFAULT_DASH_STYLE;
    axisConfig.plotLineColor = (0, _lib.convertColor)((0, _lib.pluck)(chartData.ganttlinecolor, colorM.getColor('gridColor')), (0, _lib.pluckNumber)(chartData.ganttlinealpha, 100));
    axisConfig.plotLineThickness = (0, _lib.pluckNumber)(chartData.ganttlinethickness, 1);
    axisConfig.plotLineDashStyle = (0, _lib.pluckNumber)(chartData.ganttlinedashed, 0) ? (0, _lib.getDashStyle)((0, _lib.pluckNumber)(chartData.ganttlinedashlen, 1), chartData.ganttlinedashgap, axisConfig.lineThickness) : DEFAULT_DASH_STYLE;
    axisConfig.gridResizeBarColor = (0, _lib.convertColor)((0, _lib.pluck)(chartData.gridresizebarcolor, colorM.getColor('gridResizeBarColor')), (0, _lib.pluckNumber)(chartData.gridresizebaralpha, 100));
    axisConfig.gridResizeBarThickness = (0, _lib.pluckNumber)(chartData.gridresizebarthickness, 1);
    axisConfig.forceRowHeight = (0, _lib.pluckNumber)(chartData.forcerowheight, 0);
    axisConfig.rowHeight = (0, _lib.pluckNumber)(chartData.rowheight, 0);
    axisConfig.hoverColor = (0, _lib.pluck)(chartData.processhoverbandcolor, chartData.hoverbandcolor, colorM.getColor('gridColor'));
    axisConfig.hoverAlpha = (0, _lib.pluckNumber)(chartData.processhoverbandalpha, chartData.hoverbandalpha, DEFAULT_HOVER_ALPHA);
    axisConfig.useHover = (0, _lib.pluckNumber)(chartData.showprocesshoverband, chartData.showhoverband, chartData.showhovereffect, 1);
    axisConfig.usePlotHover = (0, _lib.pluckNumber)(chartData.showganttpanehorizontalhoverband);
    axisConfig.showFullDataTable = (0, _lib.pluckNumber)(chartData.showfulldatatable, 1);
    axisConfig.forceGanttWidthPercent = (0, _lib.pluckNumber)(chartData.forceganttwidthpercent, 0);
    axisConfig.useVerticalScrolling = (0, _lib.pluckNumber)(chartData.useverticalscrolling, 1);
    axisConfig.gridLineHeaderPath = '';
    axisConfig.gridLinePath = '';
  }
  /**
   * Informs the axis of all its processes and sets its range accordingly
   *
   * @param {Array} processes An array of Gantt chart processes
   */
  ;

  _proto.setProcess = function setProcess(processes) {
    var axis = this,
        axisConfig = axis.config,
        startPad = axisConfig.startPad || 0,
        endPad = axisConfig.endPad || 0,
        processesLen,
        processesFinal,
        index,
        ProcessIndex,
        processMap; // Initialize the category object

    axisConfig.processes = {};

    if (processes) {
      // Indicate that the axis has processes on it
      axisConfig.hasProcess = 1;
    } else {
      axisConfig.hasProcess = 0;
      return;
    } // this will store only the category not the vline


    processesFinal = axisConfig.processes.process = (0, _lib.extend2)({}, processes);
    (0, _ganttCommon.extractAttribToEnd)(processesFinal, {});
    processesLen = processesFinal.process.length;
    processMap = axisConfig.processes.processMap = {};
    axisConfig.processes.processHeightMap = {}; // Storing Process mapping

    for (index = 0; index < processesLen; index += 1) {
      ProcessIndex = processesFinal.process[index];

      if (ProcessIndex.id) {
        processMap[ProcessIndex.id.toLowerCase()] = {
          catObj: ProcessIndex,
          index: index
        };
      }
    }

    axis.setAxisRange({
      min: Number((0, _lib.toPrecision)(-startPad, 10)),
      max: Number((0, _lib.toPrecision)(processesLen - 1 + endPad, 10)),
      tickInterval: Number((0, _lib.toPrecision)(1, 10))
    });
  }
  /**
   * Finds the process at the given index
   *
   * @param {number} idx The index at which the process is required
   * @return {Object} The process found at the given index
   */
  ;

  _proto.getProcessPositionByIndex = function getProcessPositionByIndex(idx) {
    var axis = this,
        axisConfig = axis.config,
        processHeightMap = axisConfig.processes.processHeightMap;

    if (processHeightMap[idx]) {
      return processHeightMap[idx];
    }

    return false;
  }
  /**
   * Finds the process with the given id
   *
   * @param {number} processId The id of the process requested
   * @return {Object} The process found with the given id
   */
  ;

  _proto.getProcessPositionById = function getProcessPositionById(processId) {
    var axis = this,
        axisConfig = axis.config,
        process = axisConfig.processes && axisConfig.processes.processMap[processId],
        processHeightMap = axisConfig.processes.processHeightMap;

    if (process) {
      return processHeightMap[process.index];
    }

    return false;
  }
  /**
   * Informs the axis of any data tables it needs to draw
   *
   * @param {Array} _dataTables The suer given data tables
   */
  ;

  _proto.setDataTable = function setDataTable(_dataTables) {
    var axis = this,
        dataTables = _dataTables,
        axisConfig = axis.config; // Initialize the category object

    axisConfig.dataTables = {};
    axisConfig.dataTables.dataTable = {};

    if (dataTables) {
      // Set the category flag to true
      axisConfig.hasDataTables = 1;
    } else {
      axisConfig.hasDataTables = 0;
      return;
    } // this will store only the category not the vline


    (0, _lib.extend2)(axisConfig.dataTables.dataTable, dataTables);
    dataTables = axisConfig.dataTables.dataTable; // Set the final style property for each text inherating from its parent

    (0, _ganttCommon.extractAttribToEnd)(dataTables, {});
  }
  /**
   * Sets the height of the processes
   *
   * @return {number} The calculated process height
   */
  ;

  _proto.setProcessHeight = function setProcessHeight() {
    var axis = this,
        axisConfig = axis.config,
        chart = axis.getFromEnv('chart'),
        chartConfig = chart.config,
        canvasHeight = chartConfig.canvasHeight,
        process = axisConfig.processes.process.process,
        processHeightMap = axisConfig.processes.processHeightMap,
        processHeight = axisConfig.processMaxHeight,
        height = 0,
        forceRowHeight = axisConfig.forceRowHeight,
        rowHeight = axisConfig.rowHeight,
        processHeightFinal,
        processLength,
        i;

    if (processHeight * process.length < canvasHeight || axisConfig.useVerticalScrolling === 0) {
      processHeight = canvasHeight / process.length;
    }

    if (forceRowHeight === 0) {
      if (rowHeight && rowHeight > processHeight) {
        processHeight = rowHeight;
      }
    } else {
      processHeight = rowHeight || processHeight;
    }

    for (i = 0, processLength = process.length; i < processLength; i++) {
      processHeightFinal = (0, _lib.pluckNumber)(process[i].height, processHeight);
      processHeightMap[i] = {
        top: height,
        bottom: height + processHeightFinal,
        height: processHeightFinal
      };
      height += processHeightFinal;
    }

    return height;
  }
  /**
   * Adjusts the axis' width
   */
  ;

  _proto.adjustWidth = function adjustWidth() {
    var axis = this,
        axisConfig = axis.config,
        totalWidth = axisConfig.totalWidth,
        availableWidth = totalWidth,
        spaceUsed = 0,
        processOnRight = false,
        dragPadding = 20,
        processVlineArr,
        attrib,
        getWidth,
        processParent,
        newLeft,
        dataTables,
        dataTable,
        process,
        i,
        prevProcessVlineArr;
    processVlineArr = axisConfig.processVlineArr = [];
    availableWidth -= dragPadding * (axisConfig.hasDataTables && axisConfig.dataTables && axisConfig.dataTables.dataTable && axisConfig.dataTables.dataTable.datacolumn ? axisConfig.dataTables.dataTable.datacolumn.length + 1 : 1);

    getWidth = function getWidth(width) {
      var retW;
      availableWidth += dragPadding;

      if (width.match(/%/g)) {
        retW = (0, _lib.pluckNumber)(totalWidth * Number(width.replace(/%/g, '') / 100), 0);
      } else {
        retW = (0, _lib.pluckNumber)(width, 0);
      }

      if (availableWidth < dragPadding) {
        retW = dragPadding;
      } else if (retW > availableWidth) {
        retW = availableWidth;
      }

      availableWidth -= retW;
      return retW;
    };

    if (axisConfig.hasProcess) {
      process = axisConfig.processes.process.process;
      processParent = axisConfig.processes.process;

      if (processParent.positioningrid === 'right') {
        processOnRight = true;
      }

      attrib = process._attrib;
      newLeft = spaceUsed;
      spaceUsed += getWidth(attrib.width || '' + (attrib.rightPos - attrib.leftPos));
      attrib.leftPos = newLeft;
      attrib.rightPos = spaceUsed;

      if (!processOnRight) {
        processVlineArr.push({
          type: 'process',
          ind: 0,
          xPos: attrib.rightPos,
          left: attrib,
          leftLimit: attrib.leftPos + dragPadding
        });
      } else {
        spaceUsed = 0;
      }
    }

    if (axisConfig.hasDataTables) {
      dataTables = axisConfig.dataTables.dataTable.datacolumn;

      for (i in dataTables) {
        if (!dataTables.hasOwnProperty(i) || i === '_attrib') {
          continue;
        }

        dataTable = dataTables[i];
        attrib = dataTable._attrib;
        newLeft = spaceUsed;
        spaceUsed += getWidth(attrib.width || '' + (attrib.rightPos - attrib.leftPos));
        attrib.leftPos = newLeft;
        attrib.rightPos = spaceUsed;
        prevProcessVlineArr = processVlineArr[processVlineArr.length - 1];

        if (prevProcessVlineArr) {
          prevProcessVlineArr.right = attrib;
          prevProcessVlineArr.rightLimit = attrib.rightPos - dragPadding;
        }

        processVlineArr.push({
          type: 'dataTable',
          ind: i,
          xPos: attrib.rightPos,
          left: attrib,
          leftLimit: attrib.leftPos + dragPadding
        });
      }
    }

    if (axisConfig.hasProcess) {
      if (processOnRight) {
        attrib = process._attrib;
        attrib.rightPos = spaceUsed + (attrib.rightPos - attrib.leftPos);
        attrib.leftPos = spaceUsed;
        spaceUsed += attrib.rightPos - attrib.leftPos;
        prevProcessVlineArr = processVlineArr[processVlineArr.length - 1];

        if (prevProcessVlineArr) {
          prevProcessVlineArr.right = attrib;
          prevProcessVlineArr.rightLimit = attrib.rightPos - dragPadding;
        }
      } else {
        processVlineArr.pop();
      }
    }

    axisConfig.totalWidth = spaceUsed;
  }
  /**
   * Allocates space for all elements in the axis.
   *
   * @param {number} maxWidth The maximum width within which the axis must position all its elements
   * @return {number} The space taken by the axis after placement
   */
  ;

  _proto.placeAxis = function placeAxis(maxWidth) {
    var axis = this,
        axisConfig = axis.config,
        chart = axis.getFromEnv('chart'),
        smartLabel = chart.getFromEnv('smartLabel'),
        labelStyle = axisConfig.labels.style,
        nameStyle = axisConfig.name.style,
        trendStyle = axisConfig.trend.trendStyle,
        hPadding = 4,
        processHeightPadding = 8,
        maxProcessDimention = 0,
        maxTextSize = 0,
        spaceReturn = {
      left: 0,
      right: 0
    },
        spaceUsed = 0,
        processOnRight = false,
        processSpaceUsed = 0,
        processMaxHeight = 0,
        i,
        text,
        smartLabelText,
        processLength,
        singleProcess,
        processStyle,
        processParent,
        singleProcessStyle,
        dataTables,
        dataTable,
        dataColumn,
        process,
        j,
        textStyle,
        singleTextStyle,
        maxTextDimention,
        preAlocateSpace = 0; // Re-calculating line heights for when chart is resized
    // Axis name line height

    nameStyle.fontSize = this.computeFontSize(nameStyle.fontSizeWithUnit);
    nameStyle.lineHeight = (0, _lib.setLineHeight)(nameStyle); // Trend line label line height

    trendStyle.fontSize = this.computeFontSize(trendStyle.fontSizeWithUnit);
    trendStyle.lineHeight = (0, _lib.setLineHeight)(trendStyle); // Axis label line height

    labelStyle.fontSize = this.computeFontSize(labelStyle.fontSizeWithUnit);
    labelStyle.lineHeight = (0, _lib.setLineHeight)(labelStyle);
    smartLabel.useEllipsesOnOverflow(chart.config.useEllipsesWhenOverflow);
    smartLabel.setStyle({
      fontSize: labelStyle.fontSize,
      fontFamily: labelStyle.fontFamily,
      lineHeight: labelStyle.lineHeight,
      fontWeight: labelStyle.fontWeight
    });

    if (axisConfig.forceGanttWidthPercent || axisConfig.showFullDataTable === 0) {
      preAlocateSpace = maxWidth / ((axisConfig.hasDataTables && axisConfig.dataTables && axisConfig.dataTables.dataTable && axisConfig.dataTables.dataTable.datacolumn ? axisConfig.dataTables.dataTable.datacolumn.length : 0) + 1);
    }

    if (axisConfig.hasProcess) {
      process = axisConfig.processes.process.process;
      processParent = axisConfig.processes.process;

      if (processParent.positioningrid === 'right') {
        processOnRight = true;
      }

      if (processParent.headertext) {
        processParent.drawLabel = (0, _lib.parseUnsafeString)(processParent.headertext);
        processStyle = processParent._attrib;
        singleProcessStyle = {
          fontFamily: (0, _lib.pluck)(processStyle.headerfontfamily, labelStyle.fontFamily),
          fontSize: (0, _lib.pluck)(processStyle.headerfontsize, this.computeFontSize(labelStyle.fontSizeWithUnit).toString()).replace(/px/i, '') + PXSTRING,
          fontWeight: (0, _lib.pluck)(Number(processStyle.headerisbold) === 1 ? 'bold' : typeof processStyle.headerisbold === 'undefined' ? 'bold' : UNDEF, labelStyle.fontWeight),
          fontStyle: (0, _lib.pluck)(processStyle.headerisitalic ? 'italic' : UNDEF, labelStyle.fontStyle)
        };
        singleProcessStyle.lineHeight = (0, _lib.setLineHeight)(singleProcessStyle);
        smartLabel.setStyle(singleProcessStyle);
        smartLabelText = smartLabel.getOriSize(processParent.drawLabel);

        if (smartLabelText.width > maxTextSize) {
          maxProcessDimention = smartLabelText;
          maxTextSize = smartLabelText.width;
        }
      }

      for (i = 0, processLength = process.length; i < processLength; i++) {
        singleProcess = process[i];
        processStyle = singleProcess._attrib;
        singleProcess.drawLabel = (0, _lib.parseUnsafeString)(singleProcess.label || singleProcess.name);
        singleProcessStyle = {
          fontFamily: (0, _lib.pluck)(processStyle.fontfamily, labelStyle.fontFamily),
          fontSize: (0, _lib.pluck)(processStyle.fontsize, this.computeFontSize(labelStyle.fontSizeWithUnit).toString()).replace(/px/i, '') + PXSTRING,
          fontWeight: (0, _lib.pluck)(processStyle.isbold ? 'bold' : UNDEF, labelStyle.fontWeight),
          fontStyle: (0, _lib.pluck)(processStyle.isitalic ? 'italic' : UNDEF, labelStyle.fontStyle)
        };
        singleProcessStyle.lineHeight = (0, _lib.setLineHeight)(singleProcessStyle);
        smartLabel.setStyle(singleProcessStyle);
        smartLabelText = smartLabel.getOriSize(singleProcess.drawLabel);

        if (smartLabelText.width > maxTextSize) {
          maxProcessDimention = smartLabelText;
          maxTextSize = smartLabelText.width;
        }

        if (smartLabelText.height > processMaxHeight) {
          processMaxHeight = smartLabelText.height;
        }
      }

      axisConfig.processMaxHeight = processMaxHeight + processHeightPadding; // axisConfig.processTotalHeight = axis._setProcessHeight(processMaxHeight);

      process._attrib.leftPos = spaceUsed;

      if (!processOnRight) {
        spaceUsed += preAlocateSpace || maxProcessDimention.width + hPadding;
      } else {
        processSpaceUsed = preAlocateSpace || maxProcessDimention.width + hPadding;
      }

      process._attrib.rightPos = spaceUsed;
    }

    if (axisConfig.hasDataTables) {
      dataTables = axisConfig.dataTables.dataTable.datacolumn;

      for (i in dataTables) {
        if (!dataTables.hasOwnProperty(i) || i === '_attrib') {
          continue;
        }

        dataTable = dataTables[i];
        maxTextSize = 0;

        if (dataTable.headertext) {
          processStyle = dataTable._attrib;
          dataTable.drawLabel = (0, _lib.parseUnsafeString)(dataTable.headertext);
          singleTextStyle = {
            fontFamily: (0, _lib.pluck)(processStyle.headerfontfamily, labelStyle.fontFamily),
            fontSize: (0, _lib.pluck)(processStyle.headerfontsize, this.computeFontSize(labelStyle.fontSizeWithUnit).toString()).replace(/px/i, '') + PXSTRING,
            fontWeight: (0, _lib.pluck)(Number(processStyle.headerisbold) === 1 ? 'bold' : typeof processStyle.headerisbold === 'undefined' ? 'bold' : UNDEF, labelStyle.fontWeight),
            fontStyle: (0, _lib.pluck)(processStyle.headerisitalic ? 'italic' : UNDEF, labelStyle.fontStyle)
          };
          singleTextStyle.lineHeight = (0, _lib.setLineHeight)(singleTextStyle);
          smartLabel.setStyle(singleTextStyle);
          smartLabelText = smartLabel.getOriSize(dataTable.drawLabel);

          if (smartLabelText.width > maxTextSize) {
            maxTextDimention = smartLabelText;
            maxTextSize = smartLabelText.width;
          }
        }

        dataColumn = dataTable.text;

        for (j in dataColumn) {
          if (!dataColumn.hasOwnProperty(j) || j === '_attrib') {
            continue;
          }

          text = dataColumn[j];
          text.drawLabel = (0, _lib.parseUnsafeString)(text.label || text.name);
          textStyle = text._attrib;
          singleTextStyle = {
            fontFamily: (0, _lib.pluck)(textStyle.fontfamily, labelStyle.fontFamily),
            fontSize: (0, _lib.pluck)(textStyle.fontsize, this.computeFontSize(labelStyle.fontSizeWithUnit).toString()).replace(/px/i, '') + PXSTRING,
            fontWeight: (0, _lib.pluck)(textStyle.isbold ? 'bold' : UNDEF, labelStyle.fontWeight),
            fontStyle: (0, _lib.pluck)(textStyle.isitalic ? 'italic' : UNDEF, labelStyle.fontStyle)
          };
          singleTextStyle.lineHeight = (0, _lib.setLineHeight)(singleTextStyle);
          smartLabel.setStyle(singleTextStyle);
          smartLabelText = smartLabel.getOriSize(text.drawLabel);

          if (smartLabelText.width > maxTextSize) {
            maxTextDimention = smartLabelText;
            maxTextSize = smartLabelText.width;
          }
        }

        dataTables[i]._attrib.leftPos = spaceUsed;
        spaceUsed += preAlocateSpace || maxTextDimention.width + hPadding;
        dataTables[i]._attrib.rightPos = spaceUsed;
      }
    }

    if (axisConfig.hasProcess) {
      if (processOnRight) {
        process._attrib.leftPos += spaceUsed;
        process._attrib.rightPos += spaceUsed + processSpaceUsed;
        spaceUsed += processSpaceUsed;
      }
    }

    axisConfig.totalWidth = spaceUsed;
    axis.adjustWidth();
    spaceUsed = axisConfig.totalWidth > maxWidth ? maxWidth : axisConfig.totalWidth;
    axisConfig.totalVisiblelWidth = spaceUsed;
    spaceReturn.left += spaceUsed;
    return spaceReturn;
  }
  /**
   * Returns the length of the processes represented by the process axis
   *
   * @return {number} The number of processes represented by the process axis
   */
  ;

  _proto.getProcessLen = function getProcessLen() {
    return this.config.processes.process.process.length;
  }
  /**
   * Draws the processes and the data tables of the Gantt chart.
   */
  ;

  _proto._drawProcessAndDataTable = function _drawProcessAndDataTable() {
    var axis = this,
        axisConfig = axis.config,
        chart = axis.getFromEnv('chart'),
        axisDimention = axisConfig.axisDimention || {},
        axisStartPosition = axisDimention.x,
        spaceTaken = axisConfig.totalWidth || 0,
        gridArr = axisConfig.gridArr || (axisConfig.gridArr = []),
        canvas = chart.getChildren('canvas')[0],
        chartConfig = chart.config,
        animationManager = chart.getFromEnv('animationManager'),
        canvasTop = canvas.canvasTop || chartConfig.canvasTop,
        canvasLeft = canvas.canvasLeft || chartConfig.canvasLeft,
        canvasHeight = canvas.canvasHeight || chartConfig.canvasHeight,
        canvasWidth = canvas.canvasWidth || chartConfig.canvasWidth,
        axisBottomGroup = chart.getChildContainer('axisBottomGroup'),
        totalVisiblelWidth = axisConfig.totalVisiblelWidth,
        i,
        process,
        processLength,
        dataTables,
        dataColumn,
        elemIndex = 0,
        dataTableCounter = 0,
        j,
        args,
        topBottom,
        translateX,
        labelContainerAttr,
        headerContainerAttr,
        ganttPlotHoverBandContainerParent,
        ganttPlotHoverBandContainer = axis.getContainer('ganttPlotHoverBandContainer'),
        ganttPlotLineContainer = axis.getContainer('ganttPlotLineContainer'),
        headerContainer = axis.getContainer('headerContainer'),
        headerBackContainer = axis.getContainer('headerBackContainer'),
        headerLineContainer = axis.getContainer('headerLineContainer'),
        headerTextContainer = axis.getContainer('headerTextContainer'),
        labelContainer = axis.getContainer('labelContainer'),
        labelBackContainer = axis.getContainer('labelBackContainer'),
        labelLineContainer = axis.getContainer('labelLineContainer'),
        labelTextContainer = axis.getContainer('labelTextContainer'),
        hotContainer = axis.getContainer('hotContainer');
    ganttPlotHoverBandContainerParent = axis.getContainer('ganttPlotHoverBandContainerParent') || axis.addContainer('ganttPlotHoverBandContainerParent', animationManager.setAnimation({
      el: 'group',
      attr: {
        name: 'gantt-plot-band-container-parent'
      },
      container: axisBottomGroup,
      component: axis
    }));
    axis.addContainer('ganttPlotHoverBandContainer', animationManager.setAnimation({
      el: ganttPlotHoverBandContainer || 'group',
      attr: {
        name: 'gantt-plot-band-container',
        'clip-rect': canvasLeft + ',' + canvasTop + ',' + canvasWidth + ',' + canvasHeight
      },
      container: ganttPlotHoverBandContainerParent,
      component: axis
    }));
    axis.addContainer('ganttPlotLineContainer', animationManager.setAnimation({
      el: ganttPlotLineContainer || 'group',
      attr: {
        name: 'gantt-plot-line-container',
        'clip-rect': canvasLeft + ',' + canvasTop + ',' + canvasWidth + ',' + canvasHeight
      },
      container: axisBottomGroup,
      component: axis
    }));
    headerContainerAttr = {
      name: 'gantt-header-container',
      'clip-rect': canvasLeft - axisConfig.totalVisiblelWidth + ',' + (canvasTop - chartConfig.categorySpaceUsed) + ',' + axisConfig.totalVisiblelWidth + ',' + chartConfig.categorySpaceUsed
    };

    if (!axisConfig.isDraged) {
      headerContainerAttr.transform = TRANSFORM;
    } else {
      delete headerContainerAttr.transform;
    }

    headerContainer = axis.addContainer('headerContainer', animationManager.setAnimation({
      el: headerContainer || 'group',
      attr: headerContainerAttr,
      container: axisBottomGroup,
      component: axis
    }));

    if (!headerBackContainer) {
      headerBackContainer = axis.addContainer('headerBackContainer', animationManager.setAnimation({
        el: 'group',
        attr: {
          name: 'gantt-header-back-container'
        },
        container: headerContainer,
        component: axis
      }));
    }

    if (!headerLineContainer) {
      headerLineContainer = axis.addContainer('headerLineContainer', animationManager.setAnimation({
        el: 'group',
        attr: {
          name: 'gantt-header-line-container'
        },
        container: headerContainer,
        component: axis
      }));
    }

    if (!headerTextContainer) {
      headerTextContainer = axis.addContainer('headerTextContainer', animationManager.setAnimation({
        el: 'group',
        attr: {
          name: 'gantt-header-text-container'
        },
        container: headerContainer,
        component: axis
      }));
    }

    labelContainerAttr = {
      name: 'gantt-label-container',
      'clip-rect': canvasLeft - axisConfig.totalVisiblelWidth + ',' + canvasTop + ',' + axisConfig.totalVisiblelWidth + ',' + canvasHeight
    };

    if (!axisConfig.isDraged) {
      labelContainerAttr.transform = TRANSFORM;
    } else {
      delete labelContainerAttr.transform;
    }

    labelContainer = axis.addContainer('labelContainer', animationManager.setAnimation({
      el: labelContainer || 'group',
      attr: labelContainerAttr,
      component: axis,
      container: axisBottomGroup
    }));

    if (!labelBackContainer) {
      labelBackContainer = axis.addContainer('labelBackContainer', animationManager.setAnimation({
        el: 'group',
        attr: {
          name: 'gantt-label-back-container'
        },
        container: labelContainer,
        component: axis
      }));
    }

    if (!labelLineContainer) {
      labelLineContainer = axis.addContainer('labelLineContainer', animationManager.setAnimation({
        el: 'group',
        attr: {
          name: 'gantt-label-line-container'
        },
        container: labelContainer,
        component: axis
      }));
    }

    if (!labelTextContainer) {
      labelTextContainer = axis.addContainer('labelTextContainer', animationManager.setAnimation({
        el: 'group',
        attr: {
          name: 'gantt-label-text-container'
        },
        container: labelContainer,
        component: axis
      }));
    }

    axis.addContainer('hotContainer', animationManager.setAnimation({
      el: hotContainer || 'group',
      attr: {
        name: 'gantt-hot-container',
        'clip-rect': canvasLeft - axisConfig.totalVisiblelWidth + ',' + (canvasTop - chartConfig.categorySpaceUsed) + ',' + axisConfig.totalVisiblelWidth + ',' + (canvasHeight + chartConfig.categorySpaceUsed)
      },
      component: axis,
      container: chart.getContainer('parentgroup')
    }));
    axisConfig.gridLinePath = '';
    axisConfig.gridLineHeaderPath = '';
    axisConfig.hoverElemsArr = [];
    axisConfig.labelHoverEventName = {
      click: 'ProcessClick',
      rollOver: 'ProcessRollOver',
      rollOut: 'ProcessRollOut'
    };

    if (axisConfig.hasProcess) {
      process = axisConfig.processes.process.process;
      args = {
        elem: axisConfig.processes.process,
        elemIndex: elemIndex,
        dimension: {
          left: axisStartPosition - spaceTaken + process._attrib.leftPos,
          right: axisStartPosition - spaceTaken + process._attrib.rightPos,
          top: canvasTop - chartConfig.categorySpaceUsed,
          bottom: canvasTop
        },
        type: 'header'
      };

      axis._drawProcessAndDataTableElement(args);

      elemIndex += 1;
      gridArr = axisConfig.gridArr = [];

      for (i = 0, processLength = process.length; i < processLength; i++) {
        topBottom = axis.getProcessPositionByIndex(i);
        args = {
          elem: process[i],
          elemIndex: elemIndex,
          pos: i,
          dimension: {
            left: axisStartPosition - spaceTaken + process._attrib.leftPos,
            right: axisStartPosition - spaceTaken + process._attrib.rightPos,
            top: canvasTop + topBottom.top,
            bottom: canvasTop + topBottom.bottom
          },
          type: 'process'
        };

        axis._drawProcessAndDataTableElement(args);

        elemIndex += 1;
        gridArr.push({
          y: args.dimension.bottom
        });
      }
    }

    if (axisConfig.hasDataTables) {
      dataTables = axisConfig.dataTables.dataTable.datacolumn;

      for (i in dataTables) {
        if (!dataTables.hasOwnProperty(i) || i === '_attrib') {
          continue;
        }

        dataTableCounter = 0;
        args = {
          elem: dataTables[i],
          elemIndex: elemIndex,
          pos: i,
          dimension: {
            left: axisStartPosition - spaceTaken + dataTables[i]._attrib.leftPos,
            right: axisStartPosition - spaceTaken + dataTables[i]._attrib.rightPos,
            top: canvasTop - chartConfig.categorySpaceUsed,
            bottom: canvasTop
          },
          type: 'header'
        };

        axis._drawProcessAndDataTableElement(args);

        elemIndex += 1;
        dataColumn = dataTables[i].text;

        for (j in dataColumn) {
          if (dataTableCounter >= processLength) {
            // If number of dataTable element is greater than number of process elements, then break.
            // Number of dataTables should be less than or equal to number of process.
            break;
          }

          if (dataColumn[j]._attrib && process[j] && process[j]._attrib) {
            dataColumn[j]._attrib.hoverbandcolor = process[j]._attrib.hoverbandcolor;
            dataColumn[j]._attrib.hoverbandalpha = process[j]._attrib.hoverbandalpha;
            dataColumn[j]._attrib.showhoverband = process[j]._attrib.showhoverband;
          }

          if (!dataColumn.hasOwnProperty(j) || j === '_attrib') {
            continue;
          }

          topBottom = axis.getProcessPositionByIndex(j);
          args = {
            elem: dataColumn[j],
            elemIndex: elemIndex,
            pos: j,
            dimension: {
              left: axisStartPosition - spaceTaken + dataTables[i]._attrib.leftPos,
              right: axisStartPosition - spaceTaken + dataTables[i]._attrib.rightPos,
              top: canvasTop + topBottom.top,
              bottom: canvasTop + topBottom.bottom
            },
            type: 'datatable'
          };
          dataTableCounter++;

          axis._drawProcessAndDataTableElement(args);

          elemIndex += 1;
        }
      }

      if (!axisConfig.drawFromProcessVlineDrag) {
        if (spaceTaken > totalVisiblelWidth) {
          translateX = spaceTaken - totalVisiblelWidth;
          axis.resetTransletAxis();
          axis.translateAxis(translateX, UNDEF);
        } else {
          axis.resetTransletAxis();
        }
      } else {
        axisConfig.drawFromProcessVlineDrag = false;
      }
    }

    axis._drawGridLine();

    axis._disposeExtraProcessAndDataTableElement(elemIndex);
  }
  /**
   * Draws the process vertical lines and their trackers
   */
  ;

  _proto._drawVerticalLineAndTracker = function _drawVerticalLineAndTracker() {
    var axis = this,
        axisConfig = axis.config,
        chart = axis.getFromEnv('chart'),
        canvas = axisConfig.canvas,
        chartConfig = chart.config,
        axisDimention = axisConfig.axisDimention || {},
        axisStartPosition = axisDimention.x,
        spaceTaken = axisConfig.totalWidth || 0,
        canvasTop = canvas.canvasTop || chartConfig.canvasTop,
        plotLine = axis.components.processVline || (axis.components.processVline = []),
        processVlineArr = axisConfig.processVlineArr,
        trackerGroup = axis.getContainer('hotContainer'),
        animationManager = axis.getFromEnv('animationManager'),
        counter = 0,
        TRACKER_W = 30,
        i,
        ln,
        path,
        hotElement,
        elem,
        top,
        hoverLineStyle,
        lineHotElemStyle,
        xPos,
        vHoverLine,
        dragStart = function dragStart() {
      var ele = this,
          data = ele.data('drag-options');
      data.origX = data.lastX || (data.lastX = 0);
      data.vHoverLine.show();
      chart.trackerClicked = true;
      data.draged = false;
    },
        dragMove = function dragMove(evt) {
      var ele = this,
          data = ele.data('drag-options'),
          vLineSetting = data.vLineSetting,
          dx = typeof evt.data === 'string' ? +evt.data.substr(0, evt.data.indexOf(',')) : evt.data[0] || 0,
          startX = vLineSetting.xPos + dx,
          leftSideLimit = vLineSetting.leftLimit,
          rightSideLimit = vLineSetting.rightLimit,
          transform; // bound limits

      if (startX < leftSideLimit) {
        dx = leftSideLimit - vLineSetting.xPos;
      }

      if (startX > rightSideLimit) {
        dx = rightSideLimit - vLineSetting.xPos;
      }

      transform = {
        transform: 't' + (data.origX + dx) + ',' + 0
      };
      ele.attr(transform);
      data.vHoverLine.attr(transform);
      data.draged = true;
      data.lastX = dx;
    },
        dragUp = function dragUp() {
      var ele = this,
          data = ele.data('drag-options'),
          vLineSetting = data.vLineSetting,
          vLineIndex = data.vLineIndex,
          transform;
      chart.trackerClicked = false;
      data.vHoverLine.hide(); // restoring state with respect to original state

      if (data.draged) {
        axisConfig.isDraged = true;
        vLineSetting.left.rightPos += data.lastX || 0;
        vLineSetting.right.leftPos += data.lastX || 0;
        vLineSetting.xPos += data.lastX || 0;

        if (processVlineArr[vLineIndex - 1]) {
          processVlineArr[vLineIndex - 1].rightLimit += data.lastX || 0;
        }

        if (processVlineArr[vLineIndex + 1]) {
          processVlineArr[vLineIndex + 1].leftLimit += data.lastX || 0;
        }

        axisConfig.drawFromProcessVlineDrag = true;

        axis._drawProcessAndDataTable();

        axis._drawVerticalLineAndTracker();

        transform = {
          transform: 't0,0'
        };
        ele.attr(transform);
        data.vHoverLine.attr(transform);
      }
    };

    hoverLineStyle = {
      stroke: axisConfig.gridResizeBarColor,
      'stroke-width': axisConfig.gridResizeBarThickness
    };
    lineHotElemStyle = {
      stroke: _lib.TRACKER_FILL,
      'stroke-width': TRACKER_W
    };
    top = canvasTop - chartConfig.categorySpaceUsed;

    for (i = 0, ln = processVlineArr.length; i < ln; i += 1) {
      if (processVlineArr[i].type === 'process') {
        elem = axisConfig.processes.process.process;
      } else {
        elem = axisConfig.dataTables.dataTable.datacolumn[processVlineArr[i].ind];
      }

      xPos = axisStartPosition - spaceTaken + elem._attrib.rightPos;
      path = ['M', xPos, top, 'L', xPos, canvasTop + axisConfig.processTotalHeight];

      if (plotLine[counter]) {
        vHoverLine = plotLine[counter].graphics.vHoverLine;
        vHoverLine.attr({
          path: path
        }).attr(hoverLineStyle);
        hotElement = plotLine[counter].graphics.hotElement;
        hotElement.attr({
          path: path
        }).attr(lineHotElemStyle);
      } else {
        hoverLineStyle.path = path;
        vHoverLine = animationManager.setAnimation({
          el: 'path',
          container: trackerGroup,
          component: axis,
          attr: hoverLineStyle
        });
        lineHotElemStyle.path = path;
        hotElement = animationManager.setAnimation({
          el: 'path',
          container: trackerGroup,
          component: axis,
          attr: lineHotElemStyle
        });
        plotLine[counter] = {};
        plotLine[counter].graphics = {};
        plotLine[counter].config = {};
        plotLine[counter].graphics.vHoverLine = vHoverLine;
        plotLine[counter].graphics.hotElement = hotElement;
      }

      hotElement.show();
      vHoverLine.hide();
      hotElement.css('cursor', _lib.hasSVG && 'ew-resize' || 'e-resize').drag(dragMove, dragStart, dragUp).data('drag-options', {
        vHoverLine: plotLine[counter].graphics.vHoverLine,
        vLineSetting: processVlineArr[i],
        vLineIndex: i
      });
      counter += 1;
    }

    for (i = counter, ln = plotLine.length; i < ln; i += 1) {
      plotLine[i].graphics.vHoverLine.attr({
        path: ['M', 0, 0]
      });
      plotLine[i].graphics.hotElement.attr({
        path: ['M', 0, 0]
      });
    }
  }
  /**
   * Draws the components of the Process Axis.
   */
  ;

  _proto._drawComponents = function _drawComponents() {
    var axis = this,
        axisConfig = axis.config;
    axisConfig.isDraged = false;

    axis._drawProcessAndDataTable();

    axisConfig.drawPlotlines && axis._drawPlotLine();

    axis._drawVerticalLineAndTracker();

    axis._drawGridLine();
  };

  return GanttProcessAxis;
}(_ganttCommon.default);

var _default = GanttProcessAxis;
exports["default"] = _default;

/***/ }),

/***/ 1595:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _ganttCommon = _interopRequireWildcard(__webpack_require__(1592));

var _lib = __webpack_require__(274);

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }], complexity: 'off' */
var DEFAULT_DASH_STYLE = 'none',
    TRANSFORM = 't0,0',
    PXSTRING = 'px';
var UNDEF,
    DASH_DEF = 'none',
    POSITION_START = _lib.preDefStr.POSITION_START,
    POSITION_TOP = _lib.preDefStr.POSITION_TOP,
    POSITION_END = _lib.preDefStr.POSITION_END;
/**
 * Function is called internally by the axis class draw function to draw the axis trend line and zone
 * @param {Object} axis the axis
 */

function prepareTrends(axis) {
  var axisConfig = axis.config,
      isVertical = axisConfig.isVertical,
      isOpposit = axisConfig.isOpposit,
      animationManager = axis.getFromEnv('animationManager'),
      axisIndex = axisConfig.axisIndex,
      chartAttr = axis.getFromEnv('chart-attrib'),
      numberFormatter = axis.getFromEnv('number-formatter'),
      axisRange = axisConfig.axisRange,
      max = axisRange.max,
      min = axisRange.min,
      maxPx,
      minPx,
      style = axisConfig.trend.trendStyle,
      axisPadding = axisConfig.labelPadding,
      axisTrendLabelContainer = axisConfig.axisTrendLabelContainer,
      css = {
    fontFamily: style.fontFamily,
    fontSize: style.fontSize,
    lineHeight: style.lineHeight,
    fontWeight: style.fontWeight,
    fontStyle: style.fontStyle
  },
      vtrendlines = axisConfig.vTrendLines,
      trendlines = axisConfig.trendLines,
      checkForLimit = true,
      drawTrendLabels = axisConfig.drawTrendLabels,
      axisDimention = axisConfig.axisDimention || {},
      i,
      iLim,
      j,
      jLen,
      toolText,
      chartConfig = axis.getFromEnv('chartConfig'),
      canvas = axis.getFromEnv('chart').getChildren('canvas')[0],
      canvasBottom = canvas.config.canvasBottom || chartConfig.canvasBottom,
      canvasLeft = canvas.config.canvasLeft || chartConfig.canvasLeft,
      canvasRight = canvas.config.canvasRight || chartConfig.canvasRight,
      trendlabels = [],
      trendLabelElement,
      comTrendLines,
      isTrendZone,
      axisDrawingAttrObj,
      axisTextAttrObj,
      trendObj,
      text,
      valueOnRight,
      startValue,
      endValue,
      startValuePixel,
      endValuePixel,
      strokeWidth,
      fixedTrendLabelPos,
      fixedTrendLabelPosRight,
      NFMethodName,
      // get the visible range
  getLimit = axis.getVisibleConfig(),
      trendLabelText = axis.getGraphicalElement('trendlabels') || []; // hide the trend label text

  for (i = 0; i < trendLabelText.length; i++) {
    trendLabelText[i].remove();
  }

  if (axisConfig.hasBreakPoints) {
    getLimit.minValue = axis._getRealBreakValue(getLimit.minValue);
    getLimit.maxValue = axis._getRealBreakValue(getLimit.maxValue);
  }

  checkForLimit = axis._isZoomed();

  if (!checkForLimit) {
    getLimit.minValue = min;
    getLimit.maxValue = max;
  } else {
    maxPx = Math.max(axis.getPixel(getLimit.minValue, {
      wrtVisible: true
    }), axis.getPixel(getLimit.maxValue, {
      wrtVisible: true
    }));
    minPx = Math.min(axis.getPixel(getLimit.minValue, {
      wrtVisible: true
    }), axis.getPixel(getLimit.maxValue, {
      wrtVisible: true
    }));
  }

  if (vtrendlines) {
    fixedTrendLabelPos = isOpposit ? (axisDimention.opposite || canvasBottom) - (axisConfig.trendBottomPadding || 0) : (axisDimention.y || canvasBottom) + (axisConfig.trendBottomPadding || 0);
  } else {
    fixedTrendLabelPos = isOpposit ? (axisDimention.opposite || canvasLeft) + (axisPadding || 0) : (axisDimention.x || canvasLeft) - (axisPadding || 0);
    fixedTrendLabelPosRight = isOpposit ? (axisDimention.x || canvasRight) + (axisPadding || 0) : (axisDimention.opposite || canvasRight) + (axisPadding || 0);
  } // get the trend line object


  comTrendLines = trendlines || vtrendlines;

  if (comTrendLines) {
    for (j = 0, jLen = comTrendLines.length; j < jLen; j += 1) {
      for (i = 0, iLim = comTrendLines[j].line && comTrendLines[j].line.length; i < iLim; i += 1) {
        trendObj = comTrendLines[j].line[i];
        NFMethodName = isVertical ? 'yAxis' : 'xAxis';
        startValue = trendObj.startvalue || trendObj.value || 0;
        startValue = numberFormatter.getCleanValue((0, _lib.pluck)(trendObj.startvalue, trendObj.value, 0));
        endValue = Number(trendObj.endvalue) || UNDEF;
        toolText = (0, _lib.getValidValue)((0, _lib.parseUnsafeString)((0, _lib.pluck)(comTrendLines[j].line[i].tooltext, comTrendLines[0].tooltext, axisConfig.trendlineToolText), false));
        toolText = (0, _lib.parseTooltext)(toolText, [7, 15, 16, 17, 18, 19], {
          startValue: startValue,
          startDataValue: numberFormatter[NFMethodName](startValue, axisIndex),
          endValue: endValue || startValue,
          endDataValue: numberFormatter[NFMethodName](endValue || startValue, axisIndex),
          axisName: axisConfig.axisName
        }, trendObj);

        if (startValue > max || startValue < min || endValue > max || endValue < min) {
          continue;
        }

        if (vtrendlines) {
          // y-axis
          text = (0, _lib.pluck)((0, _lib.parseUnsafeString)(trendObj.displayvalue), trendObj.start, '');
          startValuePixel = axis.getPixel(axisConfig.hasBreakPoints ? axis._getRelativeBreakValue(startValue) : startValue, {
            wrtVisible: true
          });
          isTrendZone = (0, _lib.pluckNumber)(trendObj.istrendzone, axisConfig.isTrendZone, 1);
          endValuePixel = endValue ? axis.getPixel(axisConfig.hasBreakPoints ? axis._getRelativeBreakValue(endValue) : endValue, {
            wrtVisible: true
          }) : 0; // trend zone

          if (endValue !== UNDEF && endValue !== '' && endValue !== startValue && isTrendZone) {
            axisDrawingAttrObj = {
              fill: (0, _lib.convertColor)((0, _lib.pluck)(trendObj.color, axisConfig.trendlineColor), (0, _lib.pluck)(trendObj.alpha, axisConfig.trendlineAlpha, 40)),
              'stroke-width': 0
            };
            axisTextAttrObj = {
              fill: (0, _lib.convertColor)((0, _lib.pluck)(trendObj.color, style.color), (0, _lib.pluck)(trendObj.valuealpha, chartAttr.trendvaluealpha, trendObj.alpha, axisConfig.trendlineAlpha, 99)),
              'vertical-align': POSITION_TOP,
              'text': text,
              'x': startValuePixel + (endValuePixel - startValuePixel) / 2,
              'y': fixedTrendLabelPos
            };
          } else {
            // trend line
            strokeWidth = (0, _lib.pluckNumber)(trendObj.thickness, axisConfig.trendlineThickness, 1);
            axisDrawingAttrObj = {
              stroke: (0, _lib.convertColor)((0, _lib.pluck)(trendObj.color, axisConfig.trendlineColor), (0, _lib.pluck)(trendObj.alpha, axisConfig.trendlineAlpha, 99)),
              'stroke-width': strokeWidth,
              'stroke-dasharray': (0, _lib.pluck)(trendObj.dashed, axisConfig.trendlinesAreDashed) === _lib.ONESTRING ? (0, _lib.getDashStyle)((0, _lib.pluckNumber)(trendObj.dashlen, axisConfig.trendlinesDashLen), (0, _lib.pluckNumber)(trendObj.dashgap, axisConfig.trendlinesDashGap)) : DASH_DEF
            };
            axisTextAttrObj = {
              fill: (0, _lib.convertColor)((0, _lib.pluck)(trendObj.color, style.color), (0, _lib.pluck)(trendObj.valuealpha, chartAttr.trendvaluealpha, trendObj.alpha, axisConfig.trendlineAlpha, 99)),
              'vertical-align': POSITION_TOP,
              'text': text,
              'x': endValue ? endValuePixel : startValuePixel,
              'y': fixedTrendLabelPos
            };
          }
        } else if (trendlines) {
          // x-axis
          text = (0, _lib.pluck)((0, _lib.parseUnsafeString)(trendObj.displayvalue), trendObj.start, '');
          valueOnRight = (0, _lib.pluckNumber)(trendObj.valueonright, 0);
          isTrendZone = (0, _lib.pluckNumber)(trendObj.istrendzone, axisConfig.isTrendZone, 0);
          startValuePixel = axis.getPixel(startValue, {
            wrtVisible: true
          });
          endValuePixel = endValue ? axis.getPixel(endValue, {
            wrtVisible: true
          }) : 0;

          if (endValue !== UNDEF && endValue !== '' && endValue !== startValue && isTrendZone) {
            // trend zone
            axisDrawingAttrObj = {
              fill: (0, _lib.convertColor)((0, _lib.pluck)(trendObj.color, axisConfig.trendlineColor), (0, _lib.pluck)(trendObj.alpha, axisConfig.trendlineAlpha, 40)),
              'stroke-width': 0
            };
            axisTextAttrObj = {
              'text-anchor': valueOnRight ? POSITION_START : POSITION_END,
              fill: (0, _lib.convertColor)((0, _lib.pluck)(trendObj.color, style.color), (0, _lib.pluck)(trendObj.valuealpha, chartAttr.trendvaluealpha, trendObj.alpha, axisConfig.trendlineAlpha, 99)),
              'text': text,
              'x': valueOnRight ? fixedTrendLabelPosRight : fixedTrendLabelPos,
              'y': startValuePixel + (endValuePixel - startValuePixel) / 2
            };
          } else {
            // trend line
            strokeWidth = (0, _lib.pluckNumber)(trendObj.thickness, axisConfig.trendlineThickness, 1);
            axisDrawingAttrObj = {
              stroke: (0, _lib.convertColor)((0, _lib.pluck)(trendObj.color, axisConfig.trendlineColor), (0, _lib.pluck)(trendObj.alpha, axisConfig.trendlineAlpha, 99)),
              'stroke-width': strokeWidth,
              'stroke-dasharray': (0, _lib.pluck)(trendObj.dashed, axisConfig.trendlinesAreDashed) === _lib.ONESTRING ? (0, _lib.getDashStyle)((0, _lib.pluckNumber)(trendObj.dashlen, axisConfig.trendlinesDashLen), (0, _lib.pluckNumber)(trendObj.dashgap, axisConfig.trendlinesDashGap)) : DASH_DEF
            };
            axisTextAttrObj = {
              'text-anchor': valueOnRight ? POSITION_START : POSITION_END,
              fill: (0, _lib.convertColor)((0, _lib.pluck)(trendObj.color, style.color), (0, _lib.pluck)(trendObj.valuealpha, chartAttr.trendvaluealpha, trendObj.alpha, axisConfig.trendlineAlpha, 99)),
              'text': text,
              'x': valueOnRight ? fixedTrendLabelPosRight : fixedTrendLabelPos,
              'y': endValue ? valueOnRight ? endValuePixel : startValuePixel : startValuePixel
            };
          } // checking if the text is out of viewport


          if (checkForLimit && (!drawTrendLabels || axisTextAttrObj.y > maxPx || axisTextAttrObj.y < minPx)) {
            axisTextAttrObj.text = '';
          }
        }

        axisTextAttrObj['text-bound'] = axisTextAttrObj.text ? [style.backgroundColor, style.borderColor, style.borderThickness, style.borderPadding, style.borderRadius, style.borderDash] : [];
        trendLabelElement = animationManager.setAnimation({
          el: 'text',
          attr: axisTextAttrObj,
          css: css,
          container: axisTrendLabelContainer,
          component: axis
        }).show();

        if (!(axisConfig.showTooltip && toolText)) {
          toolText = '';
        }

        axis.addComponentInfo('trend', {
          marker: {
            isZone: isTrendZone,
            startValue: startValue,
            endValue: endValue,
            fill: axisDrawingAttrObj.fill,
            stroke: axisDrawingAttrObj.stroke,
            strokeWidth: axisDrawingAttrObj['stroke-width'],
            strokeDashArray: axisDrawingAttrObj['stroke-dasharray'],
            shapeRendering: axisDrawingAttrObj['shape-rendering']
          },
          label: {
            fill: axisTextAttrObj.fill,
            text: text,
            textAnchor: axisTextAttrObj['text-anchor'],
            textBound: axisTextAttrObj['text-bound'],
            valueOnRight: (0, _lib.pluckNumber)(trendObj.valueonright, 0),
            toolText: toolText
          },
          showOnTop: (0, _lib.pluckNumber)(trendObj.showontop)
        });
        trendlabels.push(trendLabelElement);
      }
    }
  }

  if (trendlabels.length) {
    axis.addGraphicalElement('trendlabels', trendlabels);
  }
}
/**
 * Defines an axis which can map time values to pixel values for a Gantt chart.
 */


var GanttTimeAxis = /*#__PURE__*/function (_GanttCommonAxis) {
  (0, _inheritsLoose2.default)(GanttTimeAxis, _GanttCommonAxis);

  function GanttTimeAxis() {
    return _GanttCommonAxis.apply(this, arguments) || this;
  }

  var _proto = GanttTimeAxis.prototype;

  /**
   * Gets the name of the component
   * @return {string} name
   */
  _proto.getName = function getName() {
    return 'GanttTimeCategory';
  }
  /**
   * Configures the axis.
   *
   * @param {any} rawAttr The configuration using which the axis will configure itself
   */
  ;

  _proto.configure = function configure(rawAttr) {
    var axis = this,
        axisConfig = axis.config,
        chart = axis.getFromEnv('chart'),
        jsonData = axis.getFromEnv('dataSource'),
        colorM = chart.getFromEnv('color-manager'),
        chartData = jsonData.chart,
        axisAttr;

    _GanttCommonAxis.prototype.configure.call(this, rawAttr);

    axisAttr = axisConfig.rawAttr; // Gantt grid line properties

    axisConfig.plotLineColor = axisConfig.lineColor = (0, _lib.convertColor)((0, _lib.pluck)(chartData.ganttlinecolor, colorM.getColor('gridColor')), (0, _lib.pluckNumber)(chartData.ganttlinealpha, 100));
    axisConfig.plotLineThickness = axisConfig.lineThickness = (0, _lib.pluckNumber)(chartData.ganttlinethickness, 1);
    axisConfig.plotLineDashStyle = axisConfig.lineDashStyle = (0, _lib.pluckNumber)(chartData.ganttlinedashed, 0) ? (0, _lib.getDashStyle)((0, _lib.pluckNumber)(chartData.ganttlinedashlen, 1), chartData.ganttlinedashgap, axisConfig.lineThickness) : DEFAULT_DASH_STYLE;
    axisConfig.hoverColor = (0, _lib.pluck)(chartData.categoryhoverbandcolor, chartData.hoverbandcolor, colorM.getColor('gridColor'));
    axisConfig.hoverAlpha = (0, _lib.pluckNumber)(chartData.categoryhoverbandalpha, chartData.hoverbandalpha, 30);
    axisConfig.useHover = (0, _lib.pluckNumber)(chartData.showcategoryhoverband, chartData.showhoverband, chartData.showhovereffect, 1);
    axisConfig.usePlotHover = (0, _lib.pluckNumber)(chartData.showganttpaneverticalhoverband);
    axisConfig.trendlinesDashLen = (0, _lib.pluckNumber)(axisAttr.trendlinesDashLen, 3);
    axisConfig.trendlinesDashGap = (0, _lib.pluckNumber)(axisAttr.trendlinesDashGap, 3);
    axisConfig.gridLineHeaderPath = '';
    axisConfig.gridLinePath = '';
  }
  /**
   * Sets the category on the axes
   *
   * @param {any} categories The categories to be set
   */
  ;

  _proto.setCategory = function setCategory(categories) {
    var numberFormatter = this.getFromEnv('number-formatter'),
        axisConfig = this.config,
        startPad = axisConfig.startPad || 0,
        endPad = axisConfig.endPad || 0,
        catLength,
        categoriesFinal,
        catObj,
        startMS,
        endMS,
        minTime = Infinity,
        maxTime = -Infinity,
        i,
        j; // Initialize the category object

    axisConfig.categories = {}; // Set the category flag to true

    if (categories) {
      axisConfig.hasCategory = 1;
    } else {
      axisConfig.hasCategory = 0;
      return;
    } // this will store the category


    categoriesFinal = axisConfig.categories.category = (0, _lib.extend2)({}, categories);
    (0, _ganttCommon.extractAttribToEnd)(categoriesFinal, {});

    for (i in categoriesFinal) {
      if (!categoriesFinal.hasOwnProperty(i) || i === '_attrib') {
        continue;
      }

      for (j = 0, catLength = categoriesFinal[i].category.length; j < catLength; j += 1) {
        catObj = categoriesFinal[i].category[j];
        startMS = numberFormatter.getDateValue(catObj.start).ms;
        endMS = numberFormatter.getDateValue(catObj.end).ms;

        if (isNaN(startMS)) {
          /** @todo nan check without fn call */
          startMS = UNDEF;
        }

        if (startMS > maxTime) {
          maxTime = startMS;
        }

        if (startMS <= minTime) {
          minTime = startMS;
        }

        if (isNaN(endMS)) {
          /** @todo nan check without fn call */
          endMS = UNDEF;
        }

        if (endMS > maxTime) {
          maxTime = endMS;
        }

        if (endMS <= minTime) {
          minTime = endMS;
        }
      }
    }

    this.setAxisRange({
      min: Number((0, _lib.toPrecision)(minTime - startPad, 10)),
      max: Number((0, _lib.toPrecision)(maxTime + endPad, 10)),
      tickInterval: Number((0, _lib.toPrecision)(1, 10))
    });
  }
  /**
   * Places the axis within a given maximum height
   *
   * @param {number} maxHeight The maximum height within which to place the axis
   *
   * @return {number} The space taken up by the axis
   */
  ;

  _proto.placeAxis = function placeAxis(maxHeight) {
    var axis = this,
        axisConfig = axis.config,
        chart = axis.getFromEnv('chart'),
        chartConfig = chart.config,
        numberFormatter = axis.getFromEnv('number-formatter'),
        smartLabel = axis.getFromEnv('smartLabel'),
        labelStyle = axisConfig.labels.style,
        vPadding = 8,
        maxTextSize = 0,
        spaceReturn = {
      top: 0,
      bottom: 0
    },
        spaceUsed = 0,
        categories,
        category,
        i,
        text,
        smartLabelText,
        j,
        textStyle,
        singleTextStyle,
        jLen,
        iLim,
        maxTextDimention,
        trendStyle = axisConfig.trend.trendStyle,
        vtrendlines = axisConfig.vTrendLines,
        useEllipsesWhenOverflow = axisConfig.useEllipsesWhenOverflow,
        trendMaxHeight = 0,
        trendSpaceUsed = 0,
        trendObj,
        axisSmartTrendValue,
        trendHeight,
        heightLeft;
    smartLabel.useEllipsesOnOverflow(chartConfig.useEllipsesWhenOverflow);
    smartLabel.setStyle({
      fontSize: labelStyle.fontSize,
      fontFamily: labelStyle.fontFamily,
      lineHeight: labelStyle.lineHeight,
      fontWeight: labelStyle.fontWeight
    }); // Used to clip the category when chart height is very small.

    axisConfig.maxTopSpaceAvailable = chartConfig.canvasTop;

    if (axisConfig.hasCategory) {
      categories = axisConfig.categories.category;

      for (i in categories) {
        if (!categories.hasOwnProperty(i) || i === '_attrib') {
          continue;
        }

        maxTextSize = 0;
        category = categories[i].category;

        for (j in category) {
          if (!category.hasOwnProperty(j) || j === '_attrib') {
            continue;
          }

          text = category[j];
          text.drawLabel = (0, _lib.parseUnsafeString)(text.label || text.name);
          textStyle = text._attrib;
          singleTextStyle = {
            fontFamily: (0, _lib.pluck)(textStyle.fontfamily, labelStyle.fontFamily).replace(/px/i, '') + PXSTRING,
            fontSize: (0, _lib.pluck)(textStyle.fontsize, this.computeFontSize(labelStyle.fontSizeWithUnit)),
            fontWeight: (0, _lib.pluck)(Number(textStyle.isbold) === 1 ? 'bold' : textStyle.isbold === UNDEF ? 'bold' : UNDEF, labelStyle.fontWeight),
            fontStyle: (0, _lib.pluck)(textStyle.isitalic ? 'italic' : UNDEF, labelStyle.fontStyle)
          };
          (0, _lib.setLineHeight)(singleTextStyle);
          smartLabel.setStyle(singleTextStyle);
          smartLabelText = smartLabel.getOriSize(text.drawLabel);

          if (smartLabelText.height > maxTextSize) {
            maxTextDimention = smartLabelText;
            maxTextSize = smartLabelText.height;
          }
        }

        categories[i]._attrib.topPos = spaceUsed;
        spaceUsed += maxTextDimention.height + vPadding;
        categories[i]._attrib.bottomPos = spaceUsed;
      }
    }

    heightLeft = maxHeight - spaceUsed;

    if (axisConfig.drawTrendLines && axisConfig.drawTrendLabels && vtrendlines && axisConfig.isActive) {
      // for trend line
      smartLabel.setStyle({
        fontSize: trendStyle.fontSize,
        fontFamily: trendStyle.fontFamily,
        lineHeight: trendStyle.lineHeight,
        fontWeight: trendStyle.fontWeight
      });
      axisConfig.trendBottomPadding = -1;

      for (j = 0, jLen = vtrendlines.length; j < jLen; j += 1) {
        for (i = 0, iLim = vtrendlines[j].line.length; i < iLim; i += 1) {
          trendObj = vtrendlines[j].line[i];
          text = trendObj.origText || trendObj.displayvalue || trendObj.endvalue || trendObj.startvalue || '';
          text = (0, _lib.parseUnsafeString)(text); // if (text === (trendObj.endvalue || trendObj.startvalue)) {
          //     text = ''+ numberFormatterFn.call(chartComponents.numberFormatter, text);
          // }

          trendObj.startvalue = trendObj.start && numberFormatter.getDateValue(trendObj.start).ms;
          trendObj.endvalue = trendObj.end && numberFormatter.getDateValue(trendObj.end).ms;
          trendObj.origText = text;
          axisSmartTrendValue = smartLabel.getSmartText(text, chart.canvasWidth, trendStyle.lineHeight, useEllipsesWhenOverflow);
          trendHeight = axisSmartTrendValue.height + 2; // checking if space available for trend label value to be drawn
          // if not make the display value empty

          if (heightLeft - trendHeight < 0) {
            trendObj.displayvalue = '';
          } else {
            // set the display value
            trendObj.displayvalue = axisSmartTrendValue.text;
            trendMaxHeight = trendMaxHeight < axisSmartTrendValue.height ? axisSmartTrendValue.height : trendMaxHeight;
          } // check tooltext is available which will help to draw tooltext on hover


          if (axisSmartTrendValue.tooltext) {
            trendObj.valueToolText = axisSmartTrendValue.tooltext;
          } else {
            delete trendObj.valueToolText;
          }
        }
      }
    }

    axisConfig.totalHeight = spaceUsed;

    if (trendMaxHeight > 0) {
      trendSpaceUsed += trendMaxHeight + Math.abs(axisConfig.trendBottomPadding || 0);
    }

    spaceUsed = spaceUsed > maxHeight ? maxHeight : spaceUsed;
    spaceReturn.top += spaceUsed;
    spaceReturn.bottom += trendSpaceUsed;
    chartConfig.categorySpaceUsed = spaceUsed;
    return spaceReturn;
  }
  /**
   * Draws the categories along the axis
   */
  ;

  _proto._drawCategories = function _drawCategories() {
    var axis = this,
        axisConfig = axis.config,
        axisDimention = axisConfig.axisDimention || {},
        axisStartPosition = axisDimention.y,
        spaceTaken = axisConfig.totalHeight || 0,
        chart = axis.getFromEnv('chart'),
        chartConfig = chart.config,
        animationManager = chart.getFromEnv('animationManager'),
        numberFormatter = chart.getFromEnv('number-formatter'),
        canvas = axisConfig.canvas,
        gridArr = axisConfig.gridArr || (axisConfig.gridArr = []),
        canvasLeft = canvas.canvasLeft || chartConfig.canvasLeft,
        canvasTop = canvas.canvasTop || chartConfig.canvasTop,
        canvasHeight = canvas.canvasHeight || chartConfig.canvasHeight,
        canvasWidth = canvas.canvasWidth || chartConfig.canvasWidth,
        axisBottomGroup = chart.getChildContainer('axisBottomGroup'),
        i,
        categories,
        category,
        elemIndex = 0,
        j,
        args,
        lastRightPos,
        labelClipHeight,
        ganttPlotHoverBandContainerParent = axis.getContainer('ganttPlotHoverBandContainerParent'),
        ganttPlotHoverBandContainer = axis.getContainer('ganttPlotHoverBandContainer'),
        ganttPlotLineContainer = axis.getContainer('ganttPlotLineContainer'),
        labelContainer = axis.getContainer('labelContainer'),
        labelBackContainer = axis.getContainer('labelBackContainer'),
        labelLineContainer = axis.getContainer('labelLineContainer'),
        labelTextContainer = axis.getContainer('labelTextContainer'),
        startms,
        endms;
    labelClipHeight = Math.min(spaceTaken, canvasTop - (axisConfig.maxTopSpaceAvailable || 0));
    labelClipHeight = labelClipHeight > 0 ? labelClipHeight : 0;

    if (!ganttPlotHoverBandContainerParent) {
      ganttPlotHoverBandContainerParent = axis.addContainer('ganttPlotHoverBandContainerParent', animationManager.setAnimation({
        el: 'group',
        attr: {
          name: 'gantt-plot-band-container-parent'
        },
        container: axisBottomGroup,
        component: axis
      }));
    }

    axis.addContainer('ganttPlotHoverBandContainer', animationManager.setAnimation({
      el: ganttPlotHoverBandContainer || 'group',
      attr: {
        name: 'gantt-plot-band-container',
        'clip-rect': canvasLeft + ',' + canvasTop + ',' + canvasWidth + ',' + canvasHeight
      },
      container: ganttPlotHoverBandContainerParent,
      component: axis
    }));
    axis.addContainer('ganttPlotLineContainer', animationManager.setAnimation({
      el: ganttPlotLineContainer || 'group',
      attr: {
        name: 'gantt-plot-line-container',
        'clip-rect': canvasLeft + ',' + canvasTop + ',' + canvasWidth + ',' + canvasHeight,
        transform: TRANSFORM
      },
      container: axisBottomGroup,
      component: axis
    }));
    labelContainer = axis.addContainer('labelContainer', animationManager.setAnimation({
      el: labelContainer || 'group',
      attr: {
        name: 'gantt-label-container',
        'clip-rect': canvasLeft + ',' + (canvasTop - labelClipHeight) + ',' + canvasWidth + ',' + labelClipHeight,
        transform: TRANSFORM
      },
      container: axisBottomGroup,
      component: axis
    }));

    if (!labelBackContainer) {
      labelBackContainer = axis.addContainer('labelBackContainer', animationManager.setAnimation({
        el: 'group',
        attr: {
          name: 'gantt-label-back-container'
        },
        container: labelContainer,
        component: axis
      }));
    }

    if (!labelLineContainer) {
      labelLineContainer = axis.addContainer('labelLineContainer', animationManager.setAnimation({
        el: 'group',
        attr: {
          name: 'gantt-label-line-container'
        },
        component: axis,
        container: labelContainer
      }));
    }

    if (!labelTextContainer) {
      labelTextContainer = axis.addContainer('labelTextContainer', animationManager.setAnimation({
        el: 'group',
        attr: {
          name: 'gantt-label-text-container'
        },
        container: labelContainer,
        component: axis
      }));
    }

    axisConfig.gridLinePath = '';
    axisConfig.gridLineHeaderPath = '';
    axisConfig.hoverElemsArr = [];
    axisConfig.labelHoverEventName = {
      click: 'CategoryClick',
      rollOver: 'CategoryRollOver',
      rollOut: 'CategoryRollOut'
    };

    if (axisConfig.hasCategory) {
      categories = axisConfig.categories.category;

      for (i in categories) {
        if (!categories.hasOwnProperty(i) || i === '_attrib') {
          continue;
        }

        category = categories[i].category;
        lastRightPos = UNDEF;
        gridArr = axisConfig.gridArr = [];

        for (j in category) {
          startms = numberFormatter.getDateValue(category[j].start).ms;
          endms = numberFormatter.getDateValue(category[j].end).ms;

          if (!category.hasOwnProperty(j) || j === '_attrib' || isNaN(startms) || isNaN(endms)) {
            continue;
          }

          args = {
            elem: category[j],
            elemIndex: elemIndex,
            pos: elemIndex,
            dimension: {
              left: lastRightPos || axis.getPixel(startms),
              right: axis.getPixel(endms),
              top: axisStartPosition - spaceTaken + categories[i]._attrib.topPos,
              bottom: axisStartPosition - spaceTaken + categories[i]._attrib.bottomPos
            },
            type: 'category',
            isHeader: false
          };
          lastRightPos = args.dimension.right;

          axis._drawProcessAndDataTableElement(args);

          elemIndex += 1;
          gridArr.push({
            x: args.dimension.left
          });
        }
      }
    }

    axis._drawGridLine();

    axis._disposeExtraProcessAndDataTableElement(elemIndex);
  }
  /**
   * Draws all the axis components.
   */
  ;

  _proto._drawComponents = function _drawComponents() {
    var axisConfig = this.config,
        chartConfig = this.getFromEnv('chartConfig');

    this._drawCategories();

    axisConfig.lastTranslate = {
      x: 0,
      y: 0
    };
    this.translateAxis(-(chartConfig.viewPortConfig.x * chartConfig.viewPortConfig.scaleX), 0);
    axisConfig.drawPlotlines && this._drawPlotLine();
    prepareTrends(this);
    axisConfig.drawTrendLines && this._drawTrendLine();
  };

  return GanttTimeAxis;
}(_ganttCommon.default);

var _default = GanttTimeAxis;
exports["default"] = _default;

/***/ }),

/***/ 1593:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports._drawScrollBar = _drawScrollBar;
exports.getCrispPath = exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _safeMin = _interopRequireDefault(__webpack_require__(539));

var _safeMax = _interopRequireDefault(__webpack_require__(540));

var _componentInterface = __webpack_require__(290);

var _lib = __webpack_require__(274);

var _dependencyManager = __webpack_require__(282);

var UNDEF,
    R = (0, _dependencyManager.getDep)('redraphael', 'plugin'),
    PXSTRING = 'px',
    DASH_DEF = 'none',
    NORMALSTRING = 'normal',
    TREND = 'trend',
    CAT_VLINE = 'catVLine',
    LABEL = 'label',
    LINE = 'line',
    BAND = 'band',
    CAT_BAND = 'catBand',
    TREND_LINE_COLOR = '333333',
    pInt = function pInt(s, mag) {
  return parseInt(s, mag || 10);
},

/**
 * Helper function to create a RedRaphael group.
 * @param  {string} groupName Name of the group to be created.
 * @param  {Element} parentContainer The parent container in which the group will be appended.
 * @param {Object} axis The concerned axis
 * @return {Element} The group that was created.
 */
createGroup = function createGroup(groupName, parentContainer, axis) {
  return axis.getFromEnv('animationManager').setAnimation({
    el: 'group',
    attr: {
      name: groupName
    },
    container: parentContainer,
    state: 'appearing',
    component: axis,
    label: 'group'
  });
},

/**
 * Rounds the given number to the nearest multiple of the given number.
 *
 * @param {number} num The number to be rounded
 * @param {number} [multiple=0] The multiple of the number to be rounded to
 *
 * @return {number} The rounded number
 */
roundToMultiple = function roundToMultiple(num, multiple) {
  if (multiple === void 0) {
    multiple = 0;
  }

  var remainder;
  if (multiple === 0) return num;
  remainder = Math.abs(num) % multiple;
  if (remainder === 0) return num;
  if (num < 0) return -(Math.abs(num) - remainder);
  return num + multiple - remainder;
},
    getCrispPath = function getCrispPath(path, width) {
  var isCrisped = false,
      // eslint-disable-line good-practices/no-single-usage-variable
  oddWidth = width % 2,
      value,
      roundValue;

  if (path[1] === path[4]) {
    value = path[1];
    roundValue = Math.round(value);
    path[1] = path[4] = oddWidth ? roundValue > value ? roundValue - 0.5 : roundValue + 0.5 : roundValue;
    isCrisped = true;
  }

  if (path[2] === path[5]) {
    value = path[2];
    roundValue = Math.round(value);
    path[2] = path[5] = oddWidth ? roundValue > value ? roundValue - 0.5 : roundValue + 0.5 : roundValue;
    isCrisped = true;
  }

  return {
    path: path,
    isCrisped: isCrisped
  };
},

/**
 * Forces a given value to a given limit
 * @param  {number} value The value to be limited
 * @param  {number} limit The number to which the given value must be limited
 * @return {number}       The limited value
 */
_forceValidLowerLimit = function _forceValidLowerLimit(value, limit) {
  return value < limit ? limit : value;
},
    _drawLimitUpdater = function _drawLimitUpdater(limitUpdater) {
  limitUpdater.draw();
};
/**
 * Given a name of an axis component, checks it for plurality and normalises it to a name that
 * axis can understand
 * @param  {string} name The component name
 * @return {string}      The normalized name
 */


exports.getCrispPath = getCrispPath;

function sanitiseComponentName(name) {
  var sanitisedName = _lib.BLANKSTRING; // eslint-disable-line good-practices/no-single-usage-variable

  if (name === TREND || name === TREND + "s") {
    sanitisedName = TREND;
  }

  if (name === CAT_VLINE || name === CAT_VLINE + "s") {
    sanitisedName = CAT_VLINE;
  }

  if (name === LABEL || name === LABEL + "s") {
    sanitisedName = LABEL + "s";
  }

  if (name === LINE || name === LINE + "s") {
    sanitisedName = LINE + "s";
  }

  if (name === BAND || name === BAND + "s") {
    sanitisedName = BAND;
  }

  if (name === CAT_BAND || name === CAT_BAND + "s") {
    sanitisedName = CAT_BAND;
  }

  return sanitisedName;
}
/**
 * Draws the scrollbar associated with the axis
 */


function _drawScrollBar() {
  var axis = this,
      chart = axis.getFromEnv('chart'),
      chartConfig = chart.config,
      graphics = chart.graphics,
      axisConfig = axis.config,
      axisRange = axisConfig.axisRange,
      scrollOptions = chartConfig.scrollOptions || (chartConfig.scrollOptions = {}),
      max = axisRange.max,
      min = axisRange.min,
      scrollBar = axis.getLinkedItem('scrollBar'),
      scrollNode = scrollBar && scrollBar.config.node,
      // eslint-disable-line good-practices/no-single-usage-variable
  // scrollToEnd = chartConfig.scrollToEnd,
  // lastScrollPosition = chartConfig.lastScrollPosition,
  // axisZoom = axis.getZoomScale(),
  canvasLeft,
      canvasTop,
      canvasHeight,
      canvasConfig = chart.getChildren('canvas')[0].config,
      canvasBorderWidth,
      axisLineWidth,
      axisLineStartExtension,
      axisLineEndExtension,
      scrollRatio,
      windowedCanvasWidth,
      fullCanvasWidth,
      scrollBarParentGroup,
      visibleConfig,
      visibleRange,
      totalRange,
      scrollPosition;

  if (!scrollBar) {
    return;
  } // if (lastScrollPosition !== UNDEF) {
  //   startPercent = lastScrollPosition;
  // } else {
  //   startPercent = scrollToEnd ? 1 : 0;
  // }


  canvasLeft = canvasConfig.canvasLeft;
  canvasTop = canvasConfig.canvasTop;
  canvasHeight = canvasConfig.canvasHeight;
  canvasBorderWidth = canvasConfig.canvasBorderWidth;
  axisLineWidth = axisConfig.showAxisLine ? axisConfig.axisLineThickness || 0 : 0;
  axisLineStartExtension = (0, _lib.pluckNumber)(canvasBorderWidth, axisConfig.lineStartExtension);
  axisLineEndExtension = (0, _lib.pluckNumber)(canvasBorderWidth, axisConfig.lineEndExtension);
  scrollOptions.viewPortMin = min;
  scrollOptions.viewPortMax = max; // scrollRatio = ((scrollOptions.scrollRatio = 1) / axisZoom);

  visibleConfig = axis.getVisibleConfig();
  visibleRange = visibleConfig.maxValue - visibleConfig.minValue;
  totalRange = axisRange.max - axisRange.min;
  scrollRatio = visibleRange / totalRange;
  scrollPosition = (visibleConfig.minValue - axisRange.min) / (totalRange - visibleRange);
  windowedCanvasWidth = scrollOptions.windowedCanvasWidth = axis.getPixel(scrollOptions.vxLength);
  fullCanvasWidth = scrollOptions.fullCanvasWidth = axis.getPixel(max - min) - windowedCanvasWidth;
  scrollBarParentGroup = graphics.scrollBarParentGroup;

  if (!scrollBarParentGroup) {
    scrollBarParentGroup = graphics.scrollBarParentGroup = createGroup('scrollBarParentGroup', graphics.parentGroup).insertBefore(chart.getChildContainer().datalabelsGroup);
  } // draw the scrollbar element
  // todo padding needs to be included.


  if (axisConfig.scrollEnabled !== false) {
    if (axisConfig.isVertical) {
      scrollBar.draw(canvasLeft, canvasTop, {
        height: canvasHeight,
        scrollRatio: scrollRatio,
        roundEdges: canvasConfig.isRoundEdges,
        fullCanvasWidth: fullCanvasWidth,
        windowedCanvasWidth: windowedCanvasWidth,
        scrollPosition: scrollPosition,
        parentLayer: scrollBarParentGroup
      });
    } else {
      scrollBar.draw(canvasLeft - axisLineStartExtension, canvasTop + canvasHeight + canvasBorderWidth + axisLineWidth - 2, {
        width: canvasConfig.canvasWidth + axisLineStartExtension + axisLineEndExtension,
        scrollRatio: scrollRatio,
        roundEdges: canvasConfig.isRoundEdges,
        fullCanvasWidth: fullCanvasWidth,
        windowedCanvasWidth: windowedCanvasWidth,
        scrollPosition: scrollPosition,
        parentLayer: scrollBarParentGroup
      });
    } // attach the callback for raising event only for it is a new scroll node.


    !scrollNode && function () {
      var prevPos;
      R.eve.on('raphael.scroll.start.' + scrollBar.config.node.id, function (pos) {
        axis.setState('scrolling', true);
        prevPos = pos;
        chart.fireChartInstanceEvent('scrollstart', {
          scrollPosition: pos
        });
      });
      R.eve.on('raphael.scroll.end.' + scrollBar.config.node.id, function (pos) {
        axis.setState('scrolling', false);
        chart.fireChartInstanceEvent('scrollend', {
          prevScrollPosition: prevPos,
          scrollPosition: pos
        });
      });
    }();
  } else {
    scrollBar && scrollBar.node && scrollBar.node.hide();
  }

  axisConfig.scrollBarDrawn = true;
}
/**
 * The Cartesian Axis is a special kind of axis which is used to uniquely identify points in a plane
 * using two numbers.
 *
 * This class takes care of all cosmetics and calculations related to rendering a cartesian axis on
 * a chart. In addition it also takes care of drawing the ticks, the labels and the scroll bars of
 * the axis.
 * @class
 */


var CartesianAxis = /*#__PURE__*/function (_ComponentInterface) {
  (0, _inheritsLoose2.default)(CartesianAxis, _ComponentInterface);

  /**
   * Instantiates the axis with some instance members
   */
  function CartesianAxis() {
    var _this;

    _this = _ComponentInterface.call(this) || this; // addDep({
    //   name: 'cartesianAxisAnimation',
    //   type: 'animationRule',
    //   extension: cartesianAxisAnimation
    // });

    _this._drawScrollBar = _drawScrollBar;
    return _this;
  }
  /**
   * Sets the type of the component
   * @return {string} type
   */


  var _proto = CartesianAxis.prototype;

  _proto.getType = function getType() {
    return 'axis';
  }
  /**
   * Sets the name of the component
   * @return {string} name
   */
  ;

  _proto.getName = function getName() {
    return 'cartesian';
  }
  /**
   * Sets the default configuration of the axis
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _ComponentInterface.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.setAdaptiveMin = 0;
    config.adjustDiv = 1;
    config.axisNameWidth = UNDEF;
    config.rotateAxisName = 0;
    config.useEllipsesWhenOverflow = 1;
    config.divLineColor = UNDEF;
    config.divLineAlpha = UNDEF;
    config.divLineThickness = UNDEF;
    config.divLineIsDashed = UNDEF;
    config.divLineDashLen = UNDEF;
    config.divLineDashGap = UNDEF;
    config.showAlternateGridColor = UNDEF;
    config.alternateGridColor = UNDEF;
    config.alternateGridAlpha = UNDEF;
    config.showZeroPlane = 1;
    config.zeroPlaneAlpha = 80;
    config.showZeroPlaneValue = 1;
    config.showZeroPlaneOnTop = 1;
    config.showAxisLine = UNDEF;
    config.axisLineThickness = UNDEF;
    config.axisLineAlpha = UNDEF;
    config.tickLength = UNDEF;
    config.trendlineToolText = UNDEF;
    config.trendlineColor = TREND_LINE_COLOR;
    config.trendlineThickness = 1;
    config.trendlineAlpha = UNDEF;
    config.showTrendlinesOnTop = 0;
    config.trendlinesAreDashed = 0;
    config.trendlinesDashLen = 5;
    config.trendlinesDashGap = 2;
    config.isTrendZone = UNDEF;
    config.showTrendlines = 1;
    config.showTrendlineLabels = 1;
    config.showLabels = 1;
    config.maxLabelHeight = UNDEF;
    config.rotateLabels = UNDEF;
    config.slantLabel = 0;
    config.showAxisValues = 1;
    config.showTooltip = 1;
    config.isActive = true; // this attribute control the drawing of divline and trendline

    config.drawLabels = true;
    config.drawOnlyCategoryLine = false; // true only for candlestick volume canvas

    config.drawLabelsOpposit = false;
    config.drawPlotlines = true;
    config.drawAxisLine = true;
    config.drawPlotBands = true;
    config.drawAxisName = true;
    config.drawAxisNameOpposit = false;
    config.axisNameAlignCanvas = false;
    config.drawAxisNameFromBottom = false;
    config.drawTrendLines = true;
    config.drawTrendLabels = true;
    config.drawTick = true;
    config.drawTickMinor = true;
    config.animateAxis = true;
    config.drawAxisLineWRTCanvas = true;
    config.isRelativeAxisInverse = false;
    config.axisIndex = 0;
    config.uniqueClassName = 0;
    config.viewPortRatio = {};
    config.canvas = {};
    config.axisRange = {};
    config.isConfigured = true;
    config.axisDimention = {}; // configuration required for drag chart to edit the extreme labels

    config.extremeLabels = {
      firstLabel: {},
      lastLabel: {}
    }; // these are configuration for internal use don't use it from outside

    config._setRangeAgain = false;
    config._defaultForceDecimal = UNDEF;
    config._defaultDecimalPrecision = UNDEF;
    config.rangeChanged = false;
    config.dimensionChanged = false;
    config.apparentScrollPos = 0; // axis.configure();

    this.addToEnv('componentInfo', {
      catVLine: [],
      trend: [],
      labels: [],
      lines: [],
      bands: [],
      catBand: []
    });
  }
  /**
   * Prepare the axis attributes for use by the chart drawing. It applies default values to the
   * options that are undefined.
   * @param  {Object}  rawAttr The raw attributes to be set
   */
  ;

  _proto.configure = function configure(rawAttr) {
    var axis = this,
        axisConfig = axis.config,
        chart = axis.getFromEnv('chart'),
        is3D = axis.getFromEnv('chart').config.is3D,
        // eslint-disable-line good-practices/no-single-usage-variable
    FCChartObj = chart.getFromEnv('dataSource').chart,
        numberFormatter = axis.getFromEnv('number-formatter'),
        tempAxis = axis.getFromEnv('tempAxis'),
        axisAttr,
        fontBdrColor,
        trendFontBdrColor,
        labelFontBdrColor,
        i,
        j,
        axisAttrTrend,
        rawAttrTrend;
    axisAttr = axisConfig.rawAttr = rawAttr; // store the trendlines to the axis object

    if (rawAttr.vtrendlines) {
      for (i = 0; i < rawAttr.vtrendlines.length; ++i) {
        for (j = 0; j < rawAttr.vtrendlines[i].line.length; ++j) {
          axisAttrTrend = axisAttr.vtrendlines[i].line[j];
          rawAttrTrend = rawAttr.vtrendlines[i].line[j];
          axisAttrTrend.startvalue = (0, _lib.pluckNumber)(rawAttrTrend.startvalue, UNDEF);
          axisAttrTrend.endvalue = (0, _lib.pluckNumber)(rawAttrTrend.endvalue, rawAttrTrend.startvalue);
          axisAttrTrend.color = (0, _lib.pluck)(rawAttrTrend.color, 'FFFFFF');
          axisAttrTrend.istrendzone = (0, _lib.pluckNumber)(rawAttrTrend.istrendzone, 1);
          axisAttrTrend.thickness = (0, _lib.pluckNumber)(rawAttrTrend.thickness, 1);
          axisAttrTrend.trendTextAlpha = (0, _lib.pluckNumber)(rawAttrTrend.alpha, axisConfig.trendlineAlpha, 99);
          axisAttrTrend.alpha = (0, _lib.pluckNumber)(rawAttrTrend.alpha, 40);
          axisAttrTrend.tooltext = (0, _lib.pluck)(rawAttrTrend.tooltext, '');
        }
      }
    }

    if (rawAttr.trendlines) {
      for (i = 0; i < rawAttr.trendlines.length; ++i) {
        for (j = 0; j < rawAttr.trendlines[i].line.length; ++j) {
          axisAttrTrend = axisAttr.trendlines[i].line[j];
          rawAttrTrend = rawAttr.trendlines[i].line[j];
          axisAttrTrend.startvalue = (0, _lib.pluckNumber)(rawAttrTrend.startvalue, UNDEF);
          axisAttrTrend.endvalue = (0, _lib.pluckNumber)(rawAttrTrend.endvalue, rawAttrTrend.startvalue);
          axisAttrTrend.color = (0, _lib.pluck)(rawAttrTrend.color, 'FFFFFF');
          axisAttrTrend.istrendzone = (0, _lib.pluckNumber)(rawAttrTrend.istrendzone, 1);
          axisAttrTrend.thickness = (0, _lib.pluckNumber)(rawAttrTrend.thickness, 1);
          axisAttrTrend.trendTextAlpha = (0, _lib.pluckNumber)(rawAttrTrend.alpha, axisConfig.trendlineAlpha, 99);
          axisAttrTrend.alpha = (0, _lib.pluckNumber)(rawAttrTrend.alpha, 40);
          axisAttrTrend.showOnTop = (0, _lib.pluckNumber)(rawAttrTrend.showOnTop, 1);
          axisAttrTrend.valueOnRight = (0, _lib.pluckNumber)(rawAttrTrend.valueOnRight, 0);
        }
      }
    }

    axisConfig.trendLines = axisAttr.trendlines;
    axisConfig.vTrendLines = axisAttr.vtrendlines;
    (0, _lib.parseConfiguration)(axisAttr, axisConfig); // TODO : validation of the attributes is required

    axisConfig.axisName = (0, _lib.parseUnsafeString)(axisAttr.axisName); // Store the attribute value in the axisConfig object

    axisConfig.axisValuePadding = axisConfig.axisNamePadding || (0, _lib.pluckNumber)(axisAttr.axisValuePadding, 4); // if change also in placeAxis

    axisConfig.axisNamePadding = axisConfig.axisNamePadding || (0, _lib.pluckNumber)(axisAttr.axisNamePadding, 5); // if change also in placeAxis

    axisConfig.maxLabelWidthPercent = (0, _lib.pluckNumber)(axisAttr.maxLabelWidthPercent);
    axisConfig.maxLabelWidthPercent = Math.abs(axisConfig.maxLabelWidthPercent); // Take minLabelWidthPercent from axis attribute and set it to config of axis

    axisConfig.minLabelWidthPercent = Math.abs((0, _lib.pluckNumber)(axisAttr.minLabelWidthPercent));
    axisConfig.numDivLines = (0, _lib.pluckNumber)(axisAttr.numDivLines, 4);
    axisConfig.numDivLines = _forceValidLowerLimit(axisConfig.numDivLines, 0);
    axisConfig.categoryNumDivLines = (0, _lib.pluckNumber)(axisAttr.numDivLines, 0);
    axisConfig.axisValuePadding = _forceValidLowerLimit(axisConfig.axisValuePadding, 0);
    axisConfig.isReverse = Number(axisAttr.isReverse, 0);
    axisConfig.isOpposit = Number(axisAttr.isOpposit, 0);
    axisConfig.isVertical = Number(axisAttr.isVertical, 0);
    axisConfig.categoryDivLinesFromZero = 1; // can be overwritten programetically

    axisConfig.axisMinValue = numberFormatter.getCleanValue(axisAttr.axisMinValue);
    axisConfig.axisMaxValue = numberFormatter.getCleanValue(axisAttr.axisMaxValue);
    axisConfig.zeroPlaneColor = (0, _lib.pluck)(axisAttr.zeroPlaneColor, axisAttr.divLineColor);
    axisConfig.zeroPlaneThickness = (0, _lib.pluck)(axisAttr.zeroPlaneThickness, axisAttr.divLineThickness);
    axisConfig.axisLineColor = (0, _lib.convertColor)(axisAttr.axisLineColor, axisAttr.axisLineAlpha);
    axisConfig.tickAlpha = (0, _lib.pluckNumber)(axisAttr.tickAlpha, axisConfig.axisLineAlpha);
    axisConfig.tickColor = (0, _lib.convertColor)((0, _lib.pluck)(axisAttr.tickColor, axisAttr.axisLineColor), axisConfig.tickAlpha);
    axisConfig.tickWidth = (0, _lib.pluckNumber)(axisAttr.tickWidth, axisConfig.axisLineThickness);
    axisConfig.maxZoomLimit = (0, _lib.pluckNumber)(FCChartObj.maxzoomlimit, chart.maxzoomlimit, 1000);
    axisConfig.showVLines = (0, _lib.pluckNumber)(FCChartObj.showvlines, 1);
    axisConfig.showVLinesOnTop = (0, _lib.pluckNumber)(FCChartObj.showvlinesontop, 0);
    axisConfig.showVLineLabels = (0, _lib.pluckNumber)(FCChartObj.showvlinelabels, this.showVLineLabels, 1);
    axisConfig.showVLineLabelBorder = (0, _lib.pluckNumber)(FCChartObj.showvlinelabelborder, 1);
    axisConfig.rotateVLineLabels = (0, _lib.pluckNumber)(FCChartObj.rotatevlinelabels, 0);
    axisConfig.vLineColor = (0, _lib.pluck)(FCChartObj.vlinecolor, '333333');
    axisConfig.vLineLabelColor = (0, _lib.pluck)(FCChartObj.vlinelabelcolor);
    axisConfig.vLineThickness = (0, _lib.pluck)(FCChartObj.vlinethickness, 1);
    axisConfig.vLineAlpha = (0, _lib.pluckNumber)(FCChartObj.vlinealpha, 80);
    axisConfig.vLineLabelBgColor = (0, _lib.pluck)(FCChartObj.vlinelabelbgcolor, 'ffffff');
    axisConfig.vLineLabelBgAlpha = (0, _lib.pluckNumber)(FCChartObj.vlinelabelbgalpha, is3D ? 50 : 100);
    axisConfig.staggerLines = Math.max((0, _lib.pluckNumber)(FCChartObj.staggerlines, 2), 2);
    axisConfig.staggerLines = _forceValidLowerLimit(axisConfig.staggerLines, 1);
    axisConfig.trendlineValuesOnOpp = (0, _lib.pluck)(axisAttr.trendlineValuesOnOpp, axisAttr.trendlineValuesOnOpp, 0);
    axisConfig.labelDisplay = (0, _lib.pluck)(axisAttr.labelDisplay, 'auto').toLowerCase();
    axisConfig.labelStep = (0, _lib.pluckNumber)(axisAttr.labelStep, 0);
    axisConfig.labelStep = Math.round(axisConfig.labelStep);
    axisConfig.labelStep = _forceValidLowerLimit(axisConfig.labelStep, 0);
    axisConfig.startPad = 0;
    axisConfig.endPad = 0;
    axisConfig._oriLabelStep = axisConfig.labelStep;
    axisConfig.showLimits = (0, _lib.pluckNumber)(axisAttr.showLimits, axisConfig.showAxisValues);
    axisConfig.showUpperLimit = axisAttr.showLimits;
    axisConfig.showDivLineValues = (0, _lib.pluckNumber)(axisAttr.showDivLineValues, axisConfig.showAxisValues);
    axisConfig.showCanvasBorder = chart.getChildren('canvas')[0].config.showCanvasBorder ? 1 : 0;
    axisConfig.axisBreak = axisAttr.axisBreaks;
    axisConfig.isBreak = !!axisConfig.axisBreak;

    if (axisConfig.isBreak) {
      axis._processAxisBreak();
    } // Store the axis name style attributesa


    fontBdrColor = (0, _lib.getFirstValue)(axisAttr.axisNameBorderColor, _lib.BLANKSTRING);
    fontBdrColor = fontBdrColor ? (0, _lib.convertColor)(fontBdrColor, (0, _lib.pluckNumber)(axisAttr.axisNameBorderAlpha, axisAttr.axisNameAlpha, 100)) : _lib.BLANKSTRING;
    axisConfig.name = axisConfig.name || {};
    axisConfig.name.style = {
      fontFamily: (0, _lib.pluck)(axisAttr.axisNameFont, axisAttr.outCanfontFamily),
      fontSize: (0, _lib.pluck)(axisAttr.axisNameFontSize, pInt(axisAttr.outCanfontSize)) + PXSTRING,
      fontSizeWithUnit: (0, _lib.pluckFontSizeMaintainUnit)(axisAttr.axisNameFontSizeWithUnit, axisAttr.outCanfontSizeWithUnit),
      color: (0, _lib.convertColor)((0, _lib.pluck)(axisAttr.axisNameFontColor, axisAttr.outCancolor), (0, _lib.pluckNumber)(axisAttr.axisNameFontAlpha, axisAttr.axisNameAlpha, 100)),
      fontWeight: (0, _lib.pluckNumber)(axisAttr.axisNameFontBold, 1) ? 'bold' : NORMALSTRING,
      fontStyle: (0, _lib.pluckNumber)(axisAttr.axisNameFontItalic) ? 'italic' : NORMALSTRING,
      border: fontBdrColor || axisAttr.axisNameBgColor ? (0, _lib.pluckNumber)(axisAttr.axisNameBorderThickness, 1) + 'px solid' : UNDEF,
      borderColor: fontBdrColor,
      borderThickness: (0, _lib.pluckNumber)(axisAttr.axisNameBorderThickness, 1),
      borderPadding: (0, _lib.pluckNumber)(axisAttr.axisNameBorderPadding, 2),
      borderRadius: (0, _lib.pluckNumber)(axisAttr.axisNameBorderRadius, 0),
      backgroundColor: axisAttr.axisNameBgColor ? (0, _lib.convertColor)(axisAttr.axisNameBgColor, (0, _lib.pluckNumber)(axisAttr.axisNameBgAlpha, axisAttr.axisNameAlpha, 100)) : _lib.BLANKSTRING,
      borderDash: (0, _lib.pluckNumber)(axisAttr.axisNameBorderDashed, 0) ? (0, _lib.getDashStyle)((0, _lib.pluckNumber)(axisAttr.axisNameBorderDashLen, 4), (0, _lib.pluckNumber)(axisAttr.axisNameBorderDashGap, 2)) : DASH_DEF
    }; // Calculate the line height of the axis name

    axisConfig.name.style.lineHeight = (0, _lib.setLineHeight)(axisConfig.name.style); // Trend line label font style

    trendFontBdrColor = (0, _lib.getFirstValue)(FCChartObj.trendvaluebordercolor, _lib.BLANKSTRING);
    trendFontBdrColor = trendFontBdrColor ? (0, _lib.convertColor)(trendFontBdrColor, (0, _lib.pluckNumber)(FCChartObj.trendvalueborderalpha, FCChartObj.trendvaluealpha, 100)) : _lib.BLANKSTRING;
    axisConfig.trend = axisConfig.trend || {};
    axisConfig.trend.trendStyle = {
      fontFamily: (0, _lib.pluck)(FCChartObj.trendvaluefont, axisAttr.outCanfontFamily),
      color: (0, _lib.pluck)(FCChartObj.trendvaluefontcolor, axisAttr.trendlineColor, axisAttr.outCancolor, '333333'),
      fontSize: (0, _lib.pluckFontSize)(this.computeFontSize(FCChartObj.trendvaluefontsize), pInt(axisAttr.outCanfontSize)) + PXSTRING,
      fontSizeWithUnit: (0, _lib.pluckFontSizeMaintainUnit)(FCChartObj.trendvaluefontsize, axisAttr.outCanfontSizeWithUnit),
      fontWeight: (0, _lib.pluckNumber)(FCChartObj.trendvaluefontbold) ? 'bold' : NORMALSTRING,
      fontStyle: (0, _lib.pluckNumber)(FCChartObj.trendvaluefontitalic) ? 'italic' : NORMALSTRING,
      // Set border as empty string when not required,
      // since IE will stop js execution if it is undefined or null.
      border: trendFontBdrColor || FCChartObj.trendvaluebgcolor ? (0, _lib.pluckNumber)(FCChartObj.trendvalueborderthickness, 1) + 'px solid' : '',
      borderColor: trendFontBdrColor,
      borderThickness: (0, _lib.pluckNumber)(FCChartObj.trendvalueborderthickness, 1),
      borderPadding: (0, _lib.pluckNumber)(FCChartObj.trendvalueborderpadding, 2),
      borderRadius: (0, _lib.pluckNumber)(FCChartObj.trendvalueborderradius, 0),
      backgroundColor: FCChartObj.trendvaluebgcolor ? (0, _lib.convertColor)(FCChartObj.trendvaluebgcolor, (0, _lib.pluckNumber)(FCChartObj.trendvaluebgalpha, FCChartObj.trendvaluealpha, 100)) : _lib.BLANKSTRING,
      borderDash: (0, _lib.pluckNumber)(FCChartObj.trendvalueborderdashed, 0) ? (0, _lib.getDashStyle)((0, _lib.pluckNumber)(FCChartObj.trendvalueborderdashlen, 4), (0, _lib.pluckNumber)(FCChartObj.trendvalueborderdashgap, 2)) : DASH_DEF
    }; // Trend line label line height

    axisConfig.trend.trendStyle.lineHeight = (0, _lib.setLineHeight)(axisConfig.trend.trendStyle);
    axisConfig.labels = axisConfig.labels || {};
    axisConfig.lines = axisConfig.lines || {};
    axisConfig.band = axisConfig.band || {}; // Axis label style

    labelFontBdrColor = (0, _lib.getFirstValue)(FCChartObj.labelbordercolor, _lib.BLANKSTRING);
    labelFontBdrColor = labelFontBdrColor ? (0, _lib.convertColor)(labelFontBdrColor, (0, _lib.pluckNumber)(FCChartObj.labelborderalpha, FCChartObj.labelalpha, 100)) : _lib.BLANKSTRING;
    axisConfig.labels.style = {
      fontFamily: (0, _lib.pluck)(axisAttr.labelFont, axisAttr.outCanfontFamily),
      fontSize: (0, _lib.pluckNumber)(axisAttr.labelFontSize, pInt(axisAttr.outCanfontSize)) + PXSTRING,
      fontSizeWithUnit: (0, _lib.pluckFontSizeMaintainUnit)(axisAttr.labelFontSizeWithUnit, axisAttr.outCanfontSizeWithUnit),
      fontWeight: (0, _lib.pluckNumber)(axisAttr.labelFontBold) ? 'bold' : NORMALSTRING,
      fontStyle: (0, _lib.pluckNumber)(axisAttr.labelFontItalic) ? 'italic' : NORMALSTRING,
      color: (0, _lib.convertColor)((0, _lib.pluck)(axisAttr.labelFontColor, axisAttr.outCancolor), (0, _lib.pluckNumber)(axisAttr.labelFontAlpha, 100)),
      labelLink: FCChartObj.labellink,
      border: labelFontBdrColor || FCChartObj.labelbgcolor ? (0, _lib.pluckNumber)(FCChartObj.labelborderthickness, 1) + 'px solid' : '',
      borderColor: labelFontBdrColor,
      borderThickness: (0, _lib.pluckNumber)(FCChartObj.labelborderthickness, 1),
      borderPadding: (0, _lib.pluckNumber)(FCChartObj.labelborderpadding, 2),
      borderRadius: (0, _lib.pluckNumber)(FCChartObj.labelborderradius, 0),
      backgroundColor: FCChartObj.labelbgcolor ? (0, _lib.convertColor)(FCChartObj.labelbgcolor, (0, _lib.pluckNumber)(FCChartObj.labelbgalpha, FCChartObj.labelalpha, 100)) : _lib.BLANKSTRING,
      borderDash: (0, _lib.pluckNumber)(FCChartObj.labelborderdashed, 0) ? (0, _lib.getDashStyle)((0, _lib.pluckNumber)(FCChartObj.labelborderdashlen, 4), (0, _lib.pluckNumber)(FCChartObj.labelborderdashgap, 2)) : DASH_DEF
    }; // Axis label line height

    axisConfig.labels.style.lineHeight = (0, _lib.setLineHeight)(axisConfig.labels.style);
    axisConfig.numberFormatterFn = (0, _lib.pluck)(axisAttr.numberFormatterFn); // Setting zoom and scroll if present

    axisConfig.apparentScrollPos = axisAttr.apparentScrollPos || axisConfig.apparentScrollPos; // axis.setZoomScale(axisAttr.zoomScale || axisConfig.zoomScale);

    axisConfig.axisEndLabelDisplaySpace = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };
    axisConfig.isConfigured = true;
    axisConfig._defaultForceDecimal = UNDEF;
    axisConfig._defaultDecimalPrecision = UNDEF;
    axis.setScrollType('smart');
    axis.addToEnv('savedAxis', tempAxis && (0, _lib.extend2)({}, tempAxis));
  }
  /**
   * Sets the scrolling behavior of the axis.
   * **'none'** indicates that the scroll bar wil never be shown
   * **'smart'** indicates that the scroll bar will be shown only when the axis limits are beyond
   * the visible limits of the chart
   * **'always'** indicates that the scroll bar will always be visible
   * @param {string} type The type of scroll behavior.
   */
  ;

  _proto.setScrollType = function setScrollType(type) {
    var visibleConfig = this.getVisibleConfig();

    if (type === 'none' || type === 'smart' || type === 'always') {
      this.config.scrollType = type;
    }

    this.setVisibleConfig(visibleConfig.minValue, visibleConfig.maxValue);
  }
  /**
   * Returns the currently active scrolling behavior of the axis.
   * @return {string} The axis' scrolling behavior
   */
  ;

  _proto.getScrollType = function getScrollType() {
    return this.config.scrollType;
  };

  _proto._processAxisBreak = function _processAxisBreak() {
    var axis = this,
        axisConfig = axis.config,
        breakPoints,
        count,
        i,
        len;
    axisConfig.breakPoints = [];
    breakPoints = axisConfig.axisBreak.split('|');

    for (i = 0, len = breakPoints.length, count = 0; i < len; i += 1) {
      // eslint-disable-line good-practices/no-single-usage-variable
      breakPoints[i] = breakPoints[i].split(',');

      if (!isNaN(breakPoints[i][0]) && !isNaN(breakPoints[i][1])) {
        axisConfig.breakPoints[count] = {
          start: (0, _lib.pluckNumber)(breakPoints[i][0]),
          end: (0, _lib.pluckNumber)(breakPoints[i][1]),
          length: (0, _lib.pluckNumber)(breakPoints[i][2], 0)
        };
        count += 1;
      }
    }

    axisConfig.breakPoints.sort(function compareAxisBreakPoints(a, b) {
      return a.start - b.start;
    });
    axisConfig.hasBreakPoints = true;

    axis._validateBreakPoints();
  };

  _proto._validateBreakPoints = function _validateBreakPoints() {
    var axisConfig = this.config,
        breakPoints = axisConfig.breakPoints,
        totalBreakAmount = 0,
        // eslint-disable-line good-practices/no-single-usage-variable
    i,
        len = breakPoints.length; // eslint-disable-line good-practices/no-single-usage-variable

    for (i = 0; i < len; i += 1) {
      totalBreakAmount += breakPoints[i].end - breakPoints[i].start;
    }

    axisConfig.totalBreakAmount = totalBreakAmount;
  };

  _proto._getRelativeBreakValue = function _getRelativeBreakValue(value) {
    var breakPoints = this.config.breakPoints,
        i,
        len = breakPoints.length,
        // eslint-disable-line good-practices/no-single-usage-variable
    valueDeletion = 0;

    for (i = 0; i < len; i += 1) {
      if (value >= breakPoints[i].start && value <= breakPoints[i].end) {
        return breakPoints[i].start - valueDeletion;
      } else if (value < breakPoints[i].start) {
        break;
      }

      valueDeletion += breakPoints[i].end - breakPoints[i].start;
    }

    return value - valueDeletion;
  };

  _proto._getRealBreakValue = function _getRealBreakValue(_value) {
    var value = _value,
        breakPoints = this.config.breakPoints,
        i,
        len = breakPoints.length; // eslint-disable-line good-practices/no-single-usage-variable

    for (i = 0; i < len; i += 1) {
      if (value >= breakPoints[i].start) {
        value += breakPoints[i].end - breakPoints[i].start;
      } else if (value < breakPoints[i].start) {
        return value;
      }
    }

    return value;
  }
  /**
   * Given an interval, this changes the number formatter in use at present
   * @param  {number} interval The interval to adjust the number formatter against
   */
  ;

  _proto._adjustNumberFormatter = function _adjustNumberFormatter(interval) {
    var axis = this,
        axisConfig = axis.config,
        numberFormatter = axis.getFromEnv('chart').getFromEnv('number-formatter'),
        defaultDecimalPrecision = axisConfig._defaultDecimalPrecision,
        defaultForceDecimal = axisConfig._defaultForceDecimal,
        dec,
        beforeZero = 0,
        numberFormatterSetting;

    if (axisConfig.isVertical || axisConfig.numberFormatterFn === 'yAxis') {
      numberFormatterSetting = (numberFormatter.Y[axisConfig.axisIndex] || numberFormatter.Y[0]).yAxisLabelConf;
    } else {
      numberFormatterSetting = numberFormatter.paramX;
    }

    defaultDecimalPrecision !== UNDEF ? numberFormatterSetting.decimalprecision = defaultDecimalPrecision : axisConfig._defaultDecimalPrecision = numberFormatterSetting.decimalprecision;
    defaultForceDecimal !== UNDEF ? numberFormatterSetting.forcedecimals = defaultForceDecimal : axisConfig._defaultForceDecimal = numberFormatterSetting.forcedecimals; // If integer part is greater than zero no need of adjustment

    if (parseInt(interval, 10) > 0) {
      return;
    } // Get the fraction part as a string


    dec = interval.toString().split('.')[1];

    if (dec) {
      // Extract the number of zero in the begining because if no of decimal in numberFormatter is
      // less or equal to the number zero then same number may repeat.
      beforeZero = dec.match(/^[0]*/)[0].length;

      if (beforeZero + 1 > numberFormatterSetting.decimalprecision) {
        numberFormatterSetting.forcedecimals = 1;
      }

      numberFormatterSetting.decimalprecision = Math.max(beforeZero + 1, numberFormatterSetting.decimalprecision);
    }
  }
  /**
   * Function returning is the axis is in zoomed condition or not
   * @return {boolean} is the axis in zoomed condition
   */
  ;

  _proto._isZoomed = function _isZoomed() {
    var viewPortConfig = this.getFromEnv('chart').config.viewPortConfig; // when scale values are not 1, it implies that axis is in zoomed state

    if (this.config.isVertical) {
      return viewPortConfig.scaleY !== 1;
    }

    return viewPortConfig.scaleX !== 1;
  };

  _proto._getIntervalArr = function _getIntervalArr(args) {
    var axis = this,
        axisConfig = axis.config,
        axisLabelConfig = axisConfig.labels,
        increment = axisConfig.axisRange.tickInterval * (args && args.step || 1),
        returnArr = [],
        getLimit,
        visibleMin,
        visibleMax,
        min,
        max,
        i,
        value;
    getLimit = this.getVisibleConfig(); // to prevent getting max value greater than the max value of axis range of polar axis

    if (axis.getFromEnv('chart').config.axisType === 'polar') {
      visibleMin = getLimit.minValue;
      visibleMax = getLimit.maxValue;
    } else {
      visibleMin = getLimit.minValue - (args && args.minPad || 0);
      visibleMax = getLimit.maxValue + (args && args.maxPad || 0);
    }

    min = roundToMultiple(visibleMin, increment);
    max = roundToMultiple(visibleMax - visibleMax % increment, increment);

    if (min === max) {
      return [min];
    }

    if (axisLabelConfig.drawNormalVal) {
      for (i = (0, _lib.toPrecision)(min + increment, 10); i < max; i = (0, _lib.toPrecision)(i + increment, 10)) {
        if (axisConfig.hasBreakPoints) {
          value = (0, _lib.toPrecision)(axis._getRealBreakValue(i), 10);
        } else {
          value = (0, _lib.toPrecision)(i, 10);
        }

        returnArr.push(value);
      }
    }

    if (axisLabelConfig.drawLimitVal) {
      returnArr.push(max, min);
    }

    returnArr.indexOf(0) !== -1 && returnArr.splice(returnArr.indexOf(0), 1); // Add zero to returnArr if showzeroplane is enabled and zero point is within the axis range

    if (axisConfig.showZeroPlane && min <= 0 && max >= 0) {
      returnArr.push(0);
    }

    return returnArr.sort(function (a, b) {
      return a - b;
    }); // eslint-disable-line good-practices/no-function-dependency
  }
  /**
   * Disposes the scroll bas associated with the axis if it is drawn
   */
  ;

  _proto._disposeScrollBar = function _disposeScrollBar() {
    var axis = this,
        axisConfig = axis.config;

    if (axisConfig.scrollBarDrawn) {
      axis.getLinkedItem('scrollBar').hide();
      axisConfig.scrollBarDrawn = false;
    }
  }
  /**
   * Once the drawing parameters of a component is calculated, they are saved in the axis instance
   * with the given name.
   * @param {string} name The name by which to save the calculated parameters
   * @param {Object} obj  An object containing the calculated parameters of the component
   */
  ;

  _proto.addComponentInfo = function addComponentInfo(name, obj) {
    this.getFromEnv('componentInfo')[sanitiseComponentName(name)].push(obj);
  }
  /**
   * Gets the calculated drawing parameters of an axis component
   * @param  {string} name The name of the component whose drawing parameters are required
   * @return {Object}      The drawing parameters of the given component
   */
  ;

  _proto.getComponentInfo = function getComponentInfo(name) {
    return this.getFromEnv('componentInfo')[sanitiseComponentName(name)];
  }
  /**
   * Clears the calculated parameters of all components
   */
  ;

  _proto.clearComponentInfo = function clearComponentInfo() {
    var componentInfo = this.getFromEnv('componentInfo'),
        key;

    for (key in componentInfo) {
      if (componentInfo.hasOwnProperty(key)) {
        componentInfo[key] = [];
      }
    }
  }
  /**
   * The function is called whenever there is need to draw the axis or update the axis
   * NOTE : before calling the function placeAxis must be called to manage the space
   */
  ;

  _proto.draw = function draw() {
    var axis = this,
        axisConfig = axis.config,
        canvas = axisConfig.canvas,
        chart = axis.getFromEnv('chart'),
        chartConfig = chart.config,
        isVertical = axisConfig.isVertical,
        viewPortConfig = chartConfig.viewPortConfig,
        limitUpdaters = axis.getChildren().limitUpdater,
        viewPortRatio = axisConfig.viewPortRatio || {},
        canvasLeft = canvas.canvasLeft || chartConfig.canvasLeft,
        canvasTop = canvas.canvasTop || chartConfig.canvasTop,
        canvasWidth = canvas.canvasWidth || chartConfig.canvasWidth,
        canvasHeight = canvas.canvasHeight || chartConfig.canvasHeight,
        axisContainer = axisConfig.axisContainer,
        axisLabelContainerTop = axisConfig.axisLabelContainerTop,
        axisPlotLineContainer = axisConfig.axisPlotLineContainer,
        axisPlotLineContainerTop = axisConfig.axisPlotLineContainerTop,
        vlineLabelContainer = axisConfig.vlineLabelContainer,
        axisBandContainer = axisConfig.axisBandContainer,
        axisNameContainer = axisConfig.axisNameContainer,
        // eslint-disable-line good-practices/no-single-usage-variable
    axisTrendContainerTop = axisConfig.axisTrendContainerTop,
        axisTrendContainerBottom = axisConfig.axisTrendContainerBottom,
        axisTrendLabelContainer = axisConfig.axisTrendLabelContainer,
        // eslint-disable-line good-practices/no-single-usage-variable
    axisAxisLineContainer = axisConfig.axisAxisLineContainer,
        // eslint-disable-line good-practices/no-single-usage-variable
    axisAxisLineContainerBottom = axisConfig.axisAxisLineContainerBottom,
        // eslint-disable-line good-practices/no-single-usage-variable
    plotLineWidth = axisConfig.divLineThickness || 0,
        childContainers = chart.getChildContainer(),
        axisBottom = childContainers.axisBottomGroup,
        axisTop = childContainers.axisTopGroup,
        animElems = [],
        axisBandGroup,
        axisPlotLineGroup,
        axisPlotLineGroupTop,
        axisLineGroup,
        axisNameGroup,
        axisLabelGroup,
        axisLabelGroupTop,
        axisTrendGroupTop,
        axisTrendGroupBottom,
        dx,
        dy,
        originY,
        originX,
        plotLineClipRect;
    axis.clearComponentInfo();
    originY = viewPortConfig.y * viewPortConfig.scaleY; // eslint-disable-line good-practices/no-single-usage-variable

    originX = viewPortConfig.x * viewPortConfig.scaleX; // eslint-disable-line good-practices/no-single-usage-variable

    if (isVertical) {
      plotLineClipRect = canvasLeft + ',' + (canvasTop - plotLineWidth) + ',' + canvasWidth + ',' + (canvasHeight + plotLineWidth * 2);
    } else {
      plotLineClipRect = canvasLeft - plotLineWidth + ',' + canvasTop + ',' + (canvasWidth + plotLineWidth * 2) + ',' + canvasHeight;
    } // creating the axis elements group unique throughout the charts
    // axisBandGroup holding the axisBandContainer


    axisBandGroup = axis.getContainer('axisBandGroup') || // eslint-disable-line good-practices/no-single-usage-variable
    axis.addContainer('axisBandGroup', createGroup('dataset-Band-group', axisBottom, axis)); // axisPlotLineGroup holding the axisplotLineContainer

    axisPlotLineGroup = axis.getContainer('axisPlotLineGroup') || // eslint-disable-line good-practices/no-single-usage-variable
    axis.addContainer('axisPlotLineGroup', createGroup('dataset-Line-group', axisBottom, axis)); // axisTrendGroupBottom hold trendContainer below the dataset

    axisPlotLineGroupTop = axis.getContainer('axisPlotLineGroupTop') || // eslint-disable-line good-practices/no-single-usage-variable
    axis.addContainer('axisPlotLineGroupTop', createGroup('dataset-Line-group-top', axisTop, axis)); // axisNameGroup hold the name container

    axisNameGroup = axis.getContainer('axisNameGroup') || // eslint-disable-line good-practices/no-single-usage-variable
    axis.addContainer('axisNameGroup', createGroup('dataset-Name-group', axisBottom, axis)); // axisLineGroup hold the axis line  element

    axisLineGroup = axis.getContainer('axisLineGroup') || // eslint-disable-line good-practices/no-single-usage-variable
    axis.addContainer('axisLineGroup', createGroup('axis-Line-group', axisTop, axis)); // axisTrendGroupTop hold trendContainer top of the dataset

    axisTrendGroupTop = axis.getContainer('axisTrendGroupTop') || axis.addContainer('axisTrendGroupTop', createGroup('dataset-Trend-group-top', axisTop, axis)); // axisLabelGroup hold the label container

    axisLabelGroup = axis.getContainer('axisLabelGroup') || // eslint-disable-line good-practices/no-single-usage-variable
    axis.addContainer('axisLabelGroup', createGroup('dataset-Label-group', axisBottom, axis)); // axisLabelGroup hold the label container

    axisLabelGroupTop = axis.getContainer('axisLabelGroupTop') || // eslint-disable-line good-practices/no-single-usage-variable
    axis.addContainer('axisLabelGroupTop', createGroup('dataset-Label-group', axisTop, axis));
    axisTrendGroupBottom = axis.getContainer('axisTrendGroupBottom') || // eslint-disable-line good-practices/no-single-usage-variable
    axis.addContainer('axisTrendGroupBottom', createGroup('dataset-Trend-group-bottom', axisBottom, axis));

    if (!axisTrendContainerBottom) {
      // contain trend elements on bottom of data
      axisConfig.axisTrendContainerBottom = axisTrendContainerBottom = createGroup('dataset-axis-trend-bottom', axisTrendGroupBottom, axis); // clip the container according to canvas width and height

      axisTrendContainerBottom.attr({
        'clip-rect': canvasLeft + ',' + canvasTop + ',' + canvasWidth + ',' + canvasHeight
      });
    } else {
      // clip the container according to canvas width and height
      axisTrendContainerBottom.attr({
        'clip-rect': canvasLeft + ',' + canvasTop + ',' + canvasWidth + ',' + canvasHeight
      });
    } // creating the container group for every axis there will be
    // note : if new container added add it to hide and show


    if (!axisContainer) {
      // contains all the axis label
      axisConfig.axisContainer = axisContainer = createGroup('dataset-axis', axisLabelGroup, axis);
    }

    if (!axisLabelContainerTop) {
      axisConfig.axisLabelContainerTop = axisLabelContainerTop = createGroup('dataset-top-label', axisLabelGroupTop, axis);
    }

    if (!axisAxisLineContainer) {
      axisConfig.axisAxisLineContainer = axisAxisLineContainer = createGroup('axis-line-tick', axisLineGroup, axis);
    }

    if (!vlineLabelContainer) {
      axisConfig.vlineLabelContainer = vlineLabelContainer = createGroup('axis-vline-label', axisLineGroup, axis);
    }

    if (!axisBandContainer) {
      // contain axis band
      axisConfig.axisBandContainer = axisBandContainer = createGroup('dataset-axis-bands', axisBandGroup, axis);
      axisBandContainer.attr({
        'clip-rect': canvasLeft + ',' + canvasTop + ',' + canvasWidth + ',' + canvasHeight
      });
    } else {
      // clip the container according to canvas width and height
      animElems.push({
        el: axisBandContainer,
        attrs: {
          'clip-rect': canvasLeft + ',' + canvasTop + ',' + canvasWidth + ',' + canvasHeight
        },
        animType: 'linear',
        animConfig: [{
          syncWith: 'initial',
          start: 0,
          initial: 1
        }]
      });
    }

    if (!axisPlotLineContainer) {
      // contain all plot lines
      axisConfig.axisPlotLineContainer = axisPlotLineContainer = createGroup('dataset-axis-lines', axisPlotLineGroup, axis); // clip the container according to canvas width and height

      axisPlotLineContainer.attr({
        'clip-rect': plotLineClipRect
      });
    } else {
      // clip the container according to canvas width and height
      animElems.push({
        el: axisPlotLineContainer,
        attrs: {
          'clip-rect': plotLineClipRect
        },
        animType: 'linear',
        animConfig: [{
          syncWith: 'initial',
          start: 0,
          initial: 1
        }]
      });
    }

    if (!axisPlotLineContainerTop) {
      // contain all plot lines
      axisConfig.axisPlotLineContainerTop = axisPlotLineContainerTop = createGroup('dataset-axis-lines-top', axisPlotLineGroupTop, axis); // clip the container according to canvas width and height

      axisPlotLineContainerTop.attr({
        'clip-rect': plotLineClipRect
      });
    } else {
      // clip the container according to canvas width and height
      animElems.push({
        el: axisPlotLineContainerTop,
        attrs: {
          'clip-rect': plotLineClipRect
        },
        animType: 'linear',
        animConfig: [{
          syncWith: 'initial',
          start: 0,
          initial: 1
        }]
      });
    }

    if (!axisTrendContainerTop) {
      // contain trend elements on top of data
      axisConfig.axisTrendContainerTop = axisTrendContainerTop = createGroup('dataset-axis-trend-top', axisTrendGroupTop, axis); // clip the container according to canvas width and height

      axisTrendContainerTop.attr({
        'clip-rect': canvasLeft + ',' + canvasTop + ',' + canvasWidth + ',' + canvasHeight
      });
    } else {
      animElems.push({
        el: axisTrendContainerTop,
        attrs: {
          'clip-rect': canvasLeft + ',' + canvasTop + ',' + canvasWidth + ',' + canvasHeight
        },
        animType: 'linear',
        animConfig: [{
          syncWith: 'initial',
          start: 0,
          initial: 1
        }]
      });
    }

    if (!axisTrendLabelContainer) {
      // contain trend label elements
      axisConfig.axisTrendLabelContainer = axisTrendLabelContainer = createGroup('dataset-axis-trend-label', axisTrendGroupTop, axis);
    }

    if (!axisNameContainer) {
      // contain the axis name
      axisConfig.axisNameContainer = axisNameContainer = createGroup('dataset-axis-name', axisNameGroup, axis);
    }

    if (!axisAxisLineContainerBottom) {
      axisConfig.axisAxisLineContainerBottom = axisAxisLineContainerBottom = createGroup('axis-line-tick-bottom', axisBottom, axis);
    } // On zoom condition


    if (viewPortRatio.scaleX && viewPortRatio.scaleY && (viewPortRatio.scaleX !== viewPortConfig.scaleX || viewPortRatio.scaleY !== viewPortConfig.scaleY)) {
      viewPortRatio.scaleX = viewPortConfig.scaleX;
      viewPortRatio.scaleY = viewPortConfig.scaleY;

      axis._drawComponents();
    } else {
      // On pan condition
      // while panning no need to clip only transform accordingly
      if (isVertical) {
        // dy is the amount of the dataset transform vertically
        dy = originY - viewPortConfig.y * viewPortConfig.scaleY;
        vlineLabelContainer.transform('t0,' + dy);
        axisContainer.transform('t0,' + dy);
        axisLabelContainerTop.transform('t0,' + dy);
        axisPlotLineContainer.transform('t0,' + dy);
        axisPlotLineContainerTop.transform('t0,' + dy);
        axisBandContainer.transform('t0,' + dy);
        axisTrendContainerTop.transform('t0,' + dy);
        axisTrendContainerBottom.transform('t0,' + dy);
      } else {
        // dx is the amount of the dataset transform horizontally
        dx = originX - viewPortConfig.x * viewPortConfig.scaleX;
        vlineLabelContainer.transform('t' + dx + ',0');
        axisContainer.transform('t' + dx + ',0');
        axisLabelContainerTop.transform('t' + dx + ',0');
        axisPlotLineContainer.transform('t' + dx + ',0');
        axisPlotLineContainerTop.transform('t' + dx + ',0');
        axisBandContainer.transform('t' + dx + ',0');
        axisTrendContainerTop.transform('t' + dx + ',0');
        axisTrendContainerBottom.transform('t' + dx + ',0');
      } // draw the axis elements


      axis._drawComponents();
    }

    axis.addExtEventListener('animationcomplete', function () {
      limitUpdaters && limitUpdaters.forEach(_drawLimitUpdater);
    }, axis.getFromEnv('animationmanager'));
    axis.addToEnv('tempAxis', {
      canvasHeight: axis.config.canvas.canvasHeight,
      canvasWidth: axis.config.canvas.canvasWidth,
      canvasLeft: axis.config.canvas.canvasLeft,
      canvasRight: axis.config.canvas.canvasRight,
      canvasBottom: axis.config.canvas.canvasBottom,
      canvasTop: axis.config.canvas.canvasTop,
      visibleRange: axis.getVisibleConfig(),
      visibleLength: axis.getVisibleLength(),
      axisLength: axis.config.axisDimention.axisLength,
      axisOpposite: axis.config.axisDimention.opposite,
      axisY: axis.config.axisDimention.y,
      axisX: axis.config.axisDimention.x,
      axisRangeMin: axis.config.axisRange.min,
      axisRangeMax: axis.config.axisRange.max,
      axisTickInterval: axis.config.axisRange.tickInterval,
      axisIsReverse: axis.config.isReverse,
      axisIsVertical: axis.config.isVertical,
      axisHasBreakPoints: axis.config.hasBreakPoints,
      viewPortScaleY: axis.getFromEnv('chart').config.viewPortConfig.scaleY,
      viewPortY: axis.getFromEnv('chart').config.viewPortConfig.y,
      viewPortScaleX: axis.getFromEnv('chart').config.viewPortConfig.scaleX,
      viewPortX: axis.getFromEnv('chart').config.viewPortConfig.x,
      chartHeight: axis.getFromEnv('chart').config.canvasHeight,
      chartWidth: axis.getFromEnv('chart').config.canvasWidth,
      chartLeft: axis.getFromEnv('chart').config.canvasLeft,
      chartRight: axis.getFromEnv('chart').config.canvasRight,
      chartBottom: axis.getFromEnv('chart').config.canvasBottom,
      chartTop: axis.getFromEnv('chart').config.canvasTop,
      pvr: axis.config.pvr,
      refVal: axis.config.refVal,
      refVisibleVal: axis.config.refVisibleVal
    });
  };

  _proto.getBreakPoints = function getBreakPoints() {
    var axisConfig = this.config;

    if (axisConfig.hasBreakPoints) {
      return axisConfig.breakPoints;
    }

    return false;
  }
  /**
   * Function returning values for respective pixel passed
   * @param {number} pixel the pixel value for which the (X or Y) value is required
   * @param {Object} options An object which indicates whether values should be w.r.t. the visible range
   * @return {number} Value for which the pixel is passed
   */
  ;

  _proto.getValue = function getValue(pixel, options) {
    var axis = this,
        axisConfig = axis.config,
        wrtVisible = options && options.wrtVisible,
        // eslint-disable-line good-practices/no-single-usage-variable
    refVal = wrtVisible ? axisConfig.refVisibleVal : axisConfig.refVal; // eslint-disable-line good-practices/no-single-usage-variable

    return refVal + (pixel - axisConfig.refPx) / axis.config.pvr;
  }
  /**
   * Function returning values for respective dragged pixel passed
   * @param {number} pixel the pixel value for which the (X or Y) value is required
   * @return {number} Value for which the pixel is passed
   */
  ;

  _proto.getDraggedValue = function getDraggedValue(pixel) {
    var axis = this,
        parent = this._linkedParent,
        config = parent == null ? void 0 : parent.config,
        viewPortConfig = config == null ? void 0 : config.viewPortConfig,
        axisConfig = axis.config,
        adjustedPixel = pixel,
        refVal = axisConfig.refVal;
    if (config != null && config.scrolltodate) adjustedPixel -= (viewPortConfig == null ? void 0 : viewPortConfig.scaleX) * viewPortConfig.x;
    return Math.round(refVal + (adjustedPixel - axisConfig.refPx) / axisConfig.pvr / (viewPortConfig == null ? void 0 : viewPortConfig.scaleX));
  }
  /**
   * Returns the difference between the visible max value and the visible min value
   * @return {number} The visible range
   */
  ;

  _proto.getVisibleLength = function getVisibleLength() {
    var limit = this.getVisibleConfig();
    return Math.abs(limit.maxValue - limit.minValue);
  }
  /**
   * Function to shift the axis drawing
   * @param {number} _startPad start padding in values
   * @param {number} _endPad end Padding in values
   */
  ;

  _proto.setAxisPadding = function setAxisPadding(_startPad, _endPad) {
    if (_startPad === void 0) {
      _startPad = 0;
    }

    if (_endPad === void 0) {
      _endPad = 0;
    }

    var axis = this,
        axisConfig = axis.config,
        startPad = _startPad,
        endPad = _endPad;
    startPad = axisConfig.startPad = Math.max(axisConfig.startPad, startPad);
    endPad = axisConfig.endPad = Math.max(axisConfig.endPad, endPad);

    if (axisConfig.oriCatLen === 0) {
      if (startPad === 0) {
        startPad = 0.5;
      }

      if (endPad === 0) {
        endPad = 0.5;
      }
    }

    if (axisConfig.hasCategory) {
      if (axisConfig.oriCatLen >= 0) {
        axis.setAxisRange({
          max: axisConfig.oriCatLen + endPad,
          min: -startPad
        });
      }
    } else {
      if (axisConfig.originalMax && axisConfig.originalMin) {
        axis.setDataLimit(axisConfig.originalMax, axisConfig.originalMin);
      }
    }
  }
  /**
   * Function to set the axis config from (used for axis configuration) out side.
   * @param {Object} data Axis config object the values to be changed
   */
  ;

  _proto.setAxisConfig = function setAxisConfig(data) {
    var axisConfig = this.config,
        // eslint-disable-line good-practices/no-single-usage-variable
    prop;

    for (prop in data) {
      if (data.hasOwnProperty(prop)) {
        axisConfig[prop] = data[prop];
      }
    }
  }
  /**
   * Function to get the axis config.
   * @param {string} name Name of the configuration
   * @return {any} Value of the configuration
   */
  ;

  _proto.getAxisConfig = function getAxisConfig(name) {
    var axisConfig = this.config;

    if (name) {
      return axisConfig[name];
    }

    return axisConfig;
  }
  /**
   * Function to set the axis range from (used for axis drawing) out side.
   * @param {Object} data Axis range object the values to be changed
   */
  ;

  _proto.setAxisRange = function setAxisRange(data) {
    // TODO: Janitorial service
    var axis = this,
        axisConfig = axis.config,
        axisRange = axisConfig.axisRange,
        tempAxis,
        tempAxisRange,
        prop;

    for (prop in data) {
      // TODO: Please review this condition. The commented code was present previously.
      // Removing it seems to have no noticable effect. Instead everything seems to work even better.
      if (data.hasOwnProperty(prop)
      /* && axisRange[prop] !== undefined */
      ) {
          axisRange[prop] = data[prop];
        }
    }

    if (axisConfig.isReverse) {
      axisConfig.refVal = axisRange.max;
    } else {
      axisConfig.refVal = axisRange.min;
    } // axis.config.refVal must be updated before calling setVisibleConfig()
    // otherwise incorrect axis translation is applied when data limit is changed on update


    axis.setVisibleConfig(axisRange.min, axisRange.max);

    if (axis.getFromEnv('tempAxis')) {
      tempAxis = axis.getFromEnv('tempAxis');
      tempAxisRange = {
        max: tempAxis.axisRangeMax,
        min: tempAxis.axisRangeMin,
        tickInterval: tempAxis.axisTickInterval
      };

      if (tempAxisRange.max !== axisRange.max || tempAxisRange.min !== axisRange.min || tempAxisRange.tickInterval !== axisRange.tickInterval) {
        // Something has changed in the axis.
        // This flag is used to register its animation as an axis.
        axisConfig.rangeChanged = true;
      } else {
        // Nothing has changed in the axis.
        axisConfig.rangeChanged = false;
      }
    }
  }
  /**
   * Function set the starting point for drawing the axis and the axis drawing width/height
   * @param {Object} data Contains the x, y, length and whether the axis is drawn on the opposite side
   */
  ;

  _proto.setAxisDimention = function setAxisDimention(data) {
    var axis = this,
        axisConfig = axis.config,
        chartConfig = axis.getFromEnv('chart').config,
        axisDimention = axisConfig.axisDimention || (axisConfig.axisDimention = {}),
        tempAxis;
    axisDimention.opposite = (0, _lib.pluckNumber)(data.opposite, axisDimention.opposite);
    axisDimention.x = (0, _lib.pluckNumber)(data.x, chartConfig.canvasLeft, axisDimention.x);
    axisDimention.y = (0, _lib.pluckNumber)(data.y, chartConfig.canvasTop, axisDimention.y);
    axisDimention.axisLength = (0, _lib.pluckNumber)(data.axisLength, axisDimention.axisLength);

    if (axisConfig.isVertical) {
      axisConfig.refPx = axisDimention.y;
    } else {
      axisConfig.refPx = axisDimention.x;
    }

    axis.getPVR();

    if (axis.getFromEnv('tempAxis')) {
      tempAxis = axis.getFromEnv('tempAxis');

      if (tempAxis.axisLength !== axisDimention.axisLength || tempAxis.axisOpposite !== axisDimention.opposite || tempAxis.axisY !== axisDimention.y || tempAxis.axisX !== axisDimention.x) {
        // The axis dimensions have changed.
        // This flag is used to register its animation as an axis.
        axisConfig.dimensionChanged = true;
      } else {
        // No dimensions have changed.
        // Its animations will be registered as a plot.
        axisConfig.dimensionChanged = false;
      }
    }
  }
  /**
   * Function set the div interval and set the max and min value used by axis
   * This function is called externally by the chart to adjust or define the axis limits
   * @param {number} _max maximum limit of axis from the data
   * @param {number} _min minimum limit of axis from the data
   */
  ;

  _proto.setDataLimit = function setDataLimit(_max, _min) {
    var axis = this,
        axisConfig = axis.config,
        max = _max,
        min = _min,
        axisRange = axisConfig.axisRange,
        AxisMaxValue = axisConfig.isPercent ? 100 : axisConfig.axisMaxValue,
        AxisMinValue = axisConfig.isPercent ? 0 : axisConfig.axisMinValue,
        numDivLines = axisConfig.numDivLines,
        // eslint-disable-line good-practices/no-single-usage-variable
    setAdaptiveMin = axisConfig.setAdaptiveMin,
        // eslint-disable-line good-practices/no-single-usage-variable
    adjustDiv = axisConfig.adjustDiv,
        // eslint-disable-line good-practices/no-single-usage-variable
    startPad = axisConfig.startPad || 0,
        // eslint-disable-line good-practices/no-single-usage-variable
    endPad = axisConfig.endPad || 0,
        // eslint-disable-line good-practices/no-single-usage-variable
    setMinAsZero,
        stopMaxAtZero,
        axisLimits,
        lines = axisConfig.trendLines || axisConfig.vTrendLines,
        lineArr = lines && lines[0] && lines[0].line,
        lineMin,
        lineMax; // This will check the limit of the trendlines and will set axis limits accordingly

    lineMin = (0, _safeMin.default)(lineArr, function _getMin(obj) {
      return obj.startvalue;
    }); // eslint-disable-line good-practices/no-single-usage-variable

    lineMax = (0, _safeMax.default)(lineArr, function _getMax(obj) {
      return obj.endvalue;
    }); // eslint-disable-line good-practices/no-single-usage-variable

    min = (0, _safeMin.default)([lineMin, min]);
    max = (0, _safeMax.default)([lineMax, max]);
    axisConfig.originalMax = max;
    axisConfig.originalMin = min;
    max = axisConfig.isPercent ? 100 : max + endPad;
    min = axisConfig.isPercent ? 0 : min - startPad;
    setMinAsZero = stopMaxAtZero = !setAdaptiveMin; // eslint-disable-line good-practices/no-single-usage-variable

    if (axisConfig.hasBreakPoints) {
      max -= axisConfig.totalBreakAmount;
    } // Calling the getAxisLimits from lib to calculate the best possible div interval
    // TODO : improve the function getAxisLimits


    axisLimits = (0, _lib.getAxisLimits)((0, _lib.pluckNumber)(max, AxisMaxValue), (0, _lib.pluckNumber)(min, AxisMinValue), AxisMaxValue, AxisMinValue, stopMaxAtZero, setMinAsZero, numDivLines, adjustDiv); // Saving the data to the axis

    axis.setAxisRange({
      max: Number((0, _lib.toPrecision)(axisLimits.Max, 10)),
      min: Number((0, _lib.toPrecision)(axisLimits.Min, 10)),
      tickInterval: Number((0, _lib.toPrecision)(axisLimits.divGap, 10))
    });

    axis._adjustNumberFormatter(axisRange.tickInterval); // check for zero value to break infinite loop


    if (axisRange.tickInterval === 0) {
      axisRange.tickInterval = 1;
    }
  }
  /**
   * Sets the visible range of the axis. Also sets axis's reference values and re-calculates PVR.
   * @param  {number} minValue The minimum value of the area to be visible
   * @param  {number} maxValue The maximum value of the area to be visible
   * @return {boolean} Whether the visible range of the axis was successfully set or not
   */
  ;

  _proto.setVisibleConfig = function setVisibleConfig(minValue, maxValue) {
    var axis = this,
        axisConfig = axis.config,
        range = axisConfig.axisRange,
        scrollType = axis.getScrollType(),
        axisScroll,
        translationStr,
        zoom,
        maxZoomLimit = axisConfig.maxZoomLimit; // TODO: Add sanity checks for max greater than min etc

    if (minValue > maxValue) {
      return false;
    }

    zoom = (range.max - range.min) / (maxValue - minValue); // eslint-disable-line good-practices/no-single-usage-variable

    if (maxZoomLimit && zoom > maxZoomLimit) {
      return false;
    }

    axisConfig.minVisibleValue = minValue;
    axisConfig.maxVisibleValue = maxValue;

    if (axisConfig.isReverse) {
      axisConfig.refVisibleVal = maxValue;
    } else {
      axisConfig.refVisibleVal = minValue;
    }

    if (scrollType === 'always') {
      axis.setScrollEnabled(true);
    } else if (scrollType === 'smart') {
      if (axis._isZoomed()) {
        axis.setScrollEnabled(true);
      } else {
        axis.setScrollEnabled(false);
      }
    } else if (scrollType === 'none' && axis.isScrollEnabled()) {
      axis.setScrollEnabled(false);
    }

    axis.getPVR();
    axis.fireEvent('visiblerangeset', {
      minValue: axisConfig.minVisibleValue,
      maxValue: axisConfig.maxVisibleValue
    });

    if (axis.getFromEnv('tempAxis')) {
      axis.asyncDraw();
      axisScroll = -axis.getTranslation();

      if (axisConfig.isVertical) {
        translationStr = ['T', 0, ',', axisScroll].join('');
      } else {
        translationStr = ['T', axisScroll, ',', 0].join('');
      }

      axisConfig.axisContainer.attr({
        transform: translationStr
      });
      axisConfig.axisBandContainer.attr({
        transform: translationStr
      });
      axisConfig.axisPlotLineContainer.attr({
        transform: translationStr
      }); // axisConfig.axisTrendContainerBottom.attr({
      //   transform: translationStr
      // });

      axisConfig.axisTrendContainerTop.attr({
        transform: translationStr
      });
    } // return info that value was successfully set


    return true;
  }
  /**
   * Gets the visible min and max values from the axis
   * @return {Object} Contains minValue and maxValue, the min and max values of the visible area
   */
  ;

  _proto.getVisibleConfig = function getVisibleConfig() {
    var axisConfig = this.config;
    return {
      minValue: axisConfig.minVisibleValue,
      maxValue: axisConfig.maxVisibleValue
    };
  }
  /**
   * Function used to calculate the pixel to value ratio and return it
   * @return {number} The pixel to value ratio
   */
  ;

  _proto.getPVR = function getPVR() {
    var axis = this,
        axisConfig = axis.config,
        visibleConfig = axis.getVisibleConfig(),
        visibleSpan = visibleConfig.maxValue - visibleConfig.minValue,
        // eslint-disable-line good-practices/no-single-usage-variable
    axisLength = (axisConfig.axisDimention || {}).axisLength,
        // eslint-disable-line good-practices/no-single-usage-variable
    pvr = axisLength / visibleSpan;

    if (pvr) {
      if (axisConfig.isReverse) {
        axisConfig.pvr = -pvr;
      } else {
        axisConfig.pvr = pvr;
      }
    }

    return axisConfig.pvr;
  }
  /**
   * Function returning the pixel for respective value passed
   * @param {number} _value   The value for which the pixel value is required
   * @param {Object} options The object containing information about whether the axis should
   *                         return values w.r.t. the old axis OR w.r.t. the visible range
   * @return {number} The pixel corresponding to the given value
   */
  ;

  _proto.getPixel = function getPixel(_value, options) {
    var axis = this,
        axisConfig = axis.config,
        value = _value,
        wrtVisible = options && options.wrtVisible,
        refVal = wrtVisible ? axisConfig.refVisibleVal : axisConfig.refVal,
        // eslint-disable-line good-practices/no-single-usage-variable
    tempAxis = axis.getFromEnv('tempAxis'),
        pvr = axisConfig.pvr * axis.getFromEnv('chartConfig').viewPortConfig.scaleX; // Calculate the pixel to value ratio

    if (options && options.preValue && tempAxis) {
      refVal = wrtVisible ? tempAxis.refVisibleVal : tempAxis.refVal;
      pvr = axis.getOldPVR();
    }

    if (!pvr) {
      return 0;
    }

    if (axisConfig.hasBreakPoints) {
      value = axis._getRelativeBreakValue(value);
    }

    return (0, _lib.toPrecision)(axisConfig.refPx + (value - refVal) * pvr, 2);
  }
  /**
   * Function returning limit of the axis
   * @return {Object} ({min:number,max: number}) return an object with axis limits as property
   */
  ;

  _proto.getLimit = function getLimit() {
    var axisRange = this.config.axisRange;
    return {
      min: axisRange.min,
      max: axisRange.max,
      tickInterval: axisRange.tickInterval
    };
  }
  /**
   * Gets the pixel to value ratio with respect to the saved axis
   * @return {number} The pvr w.r.t. the old axis
   */
  ;

  _proto.getOldPVR = function getOldPVR() {
    var tempAxis = this.getFromEnv('tempAxis');
    return tempAxis ? tempAxis.pvr : this.config.pvr;
  }
  /**
   * Hides the axis components
   */
  ;

  _proto.hide = function hide() {
    var axisConfig = this.config;

    if (!axisConfig.axisContainer) {
      return;
    }

    axisConfig.axisLabelContainerTop.hide();
    axisConfig.axisContainer.hide();
    axisConfig.axisPlotLineContainer.hide();
    axisConfig.axisPlotLineContainerTop.hide();
    axisConfig.axisBandContainer.hide();
    axisConfig.axisNameContainer.hide();
    axisConfig.axisTrendContainerTop.hide();
    axisConfig.axisTrendContainerBottom.hide();
    axisConfig.axisTrendLabelContainer.hide();
    axisConfig.axisAxisLineContainer.hide();
    axisConfig.axisAxisLineContainerBottom.hide();
  }
  /**
   * Show the axis components
   */
  ;

  _proto.show = function show() {
    var axisConfig = this.config;

    if (!axisConfig.axisContainer) {
      return;
    }

    axisConfig.axisLabelContainerTop.show();
    axisConfig.axisContainer.show();
    axisConfig.axisPlotLineContainer.show();
    axisConfig.axisPlotLineContainerTop.show();
    axisConfig.axisBandContainer.show();
    axisConfig.axisNameContainer.show();
    axisConfig.axisTrendContainerTop.show();
    axisConfig.axisTrendContainerBottom.show();
    axisConfig.axisTrendLabelContainer.show();
    axisConfig.axisAxisLineContainer.show();
    axisConfig.axisAxisLineContainerBottom.show();
  }
  /**
   * Returns the amount by which the visible window is translated with respect to the axis'
   * reference point
   * @return {number} The translation amount
   */
  ;

  _proto.getTranslation = function getTranslation() {
    var axis = this,
        axisConfig = axis.config;
    return axis.getPixel(axisConfig.refVisibleVal) - axisConfig.refPx;
  }
  /**
   * Invokes createScrollBar() and sets a configuration parameter to enable the scrollbar
   * @param  {boolean} bool Whether scrolling is enabled or not
   */
  ;

  _proto.setScrollEnabled = function setScrollEnabled(bool) {
    var axis = this;
    axis.config.scrollEnabled = bool;

    if (bool) {
      axis.getFromEnv('chart')._createToolBoxGantt();

      axis.getFromEnv('tempAxis') && axis.asyncDraw();
    } else {
      axis._disposeScrollBar();
    }
  }
  /**
   * Returns the current status of the scroll bar
   * @return {boolean} Whether scrolling is enabled or disabled
   */
  ;

  _proto.isScrollEnabled = function isScrollEnabled() {
    return this.config.scrollEnabled;
  }
  /** Exception for Gantt chart**/
  ;

  _proto.manageProcessScroll = function manageProcessScroll(scroll) {
    var axis = this,
        axisConfig = axis.config,
        spaceTaken = axisConfig.totalWidth || 0,
        totalVisiblelWidth = axisConfig.totalVisiblelWidth,
        translateX;

    if (spaceTaken > totalVisiblelWidth) {
      translateX = (spaceTaken - totalVisiblelWidth) * (1 - scroll);
      axis.translateAxis(translateX, UNDEF);
    }
  }
  /** Exception for Gantt chart**/
  ;

  _proto.translateAxis = function translateAxis(x, y) {
    var axis = this,
        axisConfig = axis.config,
        ganttPlotLineContainer = axis.getContainer('ganttPlotLineContainer'),
        ganttPlotHoverBandContainer = axis.getContainer('ganttPlotHoverBandContainer'),
        lastTranslate = axisConfig.lastTranslate || (axisConfig.lastTranslate = {
      x: 0,
      y: 0
    }),
        ganttLabelContainer = axis.getContainer('labelContainer'),
        ganttHeaderContainer = axis.getContainer('headerContainer'),
        hotContainer = axis.getContainer('hotContainer'),
        dx,
        dy;
    dx = x !== UNDEF ? x - lastTranslate.x : 0;
    dy = y !== UNDEF ? y - lastTranslate.y : 0;
    lastTranslate.x = x !== UNDEF ? x : lastTranslate.x;
    lastTranslate.y = y !== UNDEF ? y : lastTranslate.y;
    ganttLabelContainer && ganttLabelContainer.translate(dx, dy);
    ganttHeaderContainer && ganttHeaderContainer.translate(dx, dy);
    axisConfig.labelContainer && axisConfig.labelContainer.translate(dx, dy);
    hotContainer && hotContainer.translate(dx, dy);
    axisConfig.headerContainer && axisConfig.headerContainer.translate(dx, 0);

    if (axisConfig.isVertical) {
      ganttPlotLineContainer && ganttPlotLineContainer.translate(0, dy);
      ganttPlotHoverBandContainer && ganttPlotHoverBandContainer.translate(0, dy);
    } else {
      ganttPlotLineContainer && ganttPlotLineContainer.translate(dx, 0);
      ganttPlotHoverBandContainer && ganttPlotHoverBandContainer.translate(dx, 0);
      axis.setAxisConfig({
        animateAxis: false
      });
      axisConfig.drawTrendLines && axis._drawTrendLine();
      axis.setAxisConfig({
        animateAxis: true
      });
    }
  }
  /** Exception for Gantt chart**/
  ;

  _proto.resetTransletAxis = function resetTransletAxis() {
    var axis = this,
        axisConfig = axis.config,
        ganttLabelContainer = axis.getContainer('labelContainer'),
        ganttHeaderContainer = axis.getContainer('headerContainer'),
        hotContainer = axis.getContainer('hotContainer'),
        transformAttr;
    transformAttr = {
      transform: 't0,0'
    };
    axisConfig.lastTranslate = {
      x: 0,
      y: 0
    };
    ganttLabelContainer && ganttLabelContainer.attr(transformAttr);
    ganttHeaderContainer && ganttHeaderContainer.attr(transformAttr);
    axisConfig.labelContainer && axisConfig.labelContainer.attr(transformAttr);
    axisConfig.headerContainer && axisConfig.headerContainer.attr(transformAttr);
    axisConfig.ganttPlotLineContainer && axisConfig.ganttPlotLineContainer.attr(transformAttr);
    axisConfig.ganttPlotHoverBandContainer && axisConfig.ganttPlotHoverBandContainer.attr(transformAttr);
    hotContainer && hotContainer.attr(transformAttr);
  };

  return CartesianAxis;
}(_componentInterface.ComponentInterface);

var _default = CartesianAxis;
exports["default"] = _default;

/***/ }),

/***/ 1589:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _canvas = _interopRequireDefault(__webpack_require__(522));

var _lib = __webpack_require__(274);

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var MAX_MITER_LINEJOIN = 2;
/**
 * An extension of the regular chart canvas which defines Gantt specific groups and configures some
 * gantt specific attributes.
 */

var CanvasGantt = /*#__PURE__*/function (_Canvas) {
  (0, _inheritsLoose2.default)(CanvasGantt, _Canvas);

  function CanvasGantt() {
    return _Canvas.apply(this, arguments) || this;
  }

  var _proto = CanvasGantt.prototype;

  /**
   * Creates groups for Gantt datasets.
   */
  _proto.createGroup = function createGroup() {
    _Canvas.prototype.createGroup.call(this);

    var chart = this.getFromEnv('chart'),
        chartConfig = chart.config,
        inCanStyle = chartConfig.style.inCanvasStyle,
        animationManager = this.getFromEnv('animationManager'),
        canvas = this,
        plotGroup = chart.getChildContainer('plotGroup'),
        labelStyle;
    !this.getChildContainer('taskGroup') && this.addChildContainer('taskGroup', animationManager.setAnimation({
      el: 'group',
      attr: {
        name: 'task'
      },
      container: plotGroup,
      component: canvas
    }));
    !this.getChildContainer('connectorGroup') && this.addChildContainer('connectorGroup', animationManager.setAnimation({
      el: 'group',
      attr: {
        name: 'connector'
      },
      container: plotGroup,
      component: canvas
    }));
    !this.getChildContainer('milestoneGroup') && this.addChildContainer('milestoneGroup', animationManager.setAnimation({
      el: 'group',
      attr: {
        name: 'milestone'
      },
      container: plotGroup,
      component: canvas
    }));
    labelStyle = chartConfig.milestoneLabelStyle = {
      fontSize: (0, _lib.pluckNumber)(chartConfig.milestonefontsize, this.computeFontSize(inCanStyle.fontSizeWithUnit)) + 'px',
      fontFamily: (0, _lib.pluck)(chartConfig.milestonefont, inCanStyle.fontFamily),
      fontWeight: (0, _lib.pluckNumber)(chartConfig.milestonefontbold, 0) && 'bold' || 'normal',
      fontStyle: (0, _lib.pluckNumber)(chartConfig.milestonefontitalic, 0) && 'italic' || 'normal'
    };
    (0, _lib.setLineHeight)(labelStyle);
    this.getChildContainer('milestoneGroup').css(labelStyle);
  }
  /**
   * Draws the canvas and sets clipping
   */
  ;

  _proto.draw = function draw() {
    _Canvas.prototype.draw.call(this);

    this.setClipping();
  }
  /**
   * Sets the clipping in the datasets, tracker and datalabels
   */
  ;

  _proto.setClipping = function setClipping() {
    var chart = this.getFromEnv('chart'),
        config = chart.config,
        taskGroup = this.getChildContainer('taskGroup'),
        connectorGroup = this.getChildContainer('connectorGroup'),
        childContainer = chart.getChildContainer(),
        datasetLayer = childContainer.plotGroup,
        dataLabelsLayer = childContainer.datalabelsGroup,
        trackerLayer = childContainer.trackerGroup,
        viewPortConfig = config.viewPortConfig,
        scaleX = viewPortConfig.scaleX,
        xOffset,
        x = viewPortConfig.x,
        animationManager = this.getFromEnv('animationManager'),
        clipCanvas = chart.getChildren('canvas')[0].config.clip['clip-canvas'].slice(0);
    animationManager.setAnimation({
      el: datasetLayer,
      attr: {
        'clip-rect': clipCanvas
      },
      state: !chart.config.clipSet ? 'appearing' : 'updating',
      component: this
    });
    animationManager.setAnimation({
      el: dataLabelsLayer,
      attr: {
        'clip-rect': clipCanvas
      },
      state: !chart.config.clipSet ? 'appearing' : 'updating',
      component: this
    });
    animationManager.setAnimation({
      el: trackerLayer,
      attr: {
        'clip-rect': clipCanvas
      },
      state: !chart.config.clipSet ? 'appearing' : 'updating',
      component: this
    });
    config.xOffset = xOffset = x * scaleX;
    animationManager.setAnimation({
      el: datasetLayer,
      attr: {
        transform: 'T' + -xOffset + ',0'
      },
      component: this
    });
    animationManager.setAnimation({
      el: taskGroup,
      attr: {
        transform: 'T' + -xOffset + ',0'
      },
      component: this
    });
    animationManager.setAnimation({
      el: connectorGroup,
      attr: {
        transform: 'T' + -xOffset + ',0'
      },
      component: this
    });
    animationManager.setAnimation({
      el: dataLabelsLayer,
      attr: {
        transform: 'T' + -xOffset + ',0'
      },
      component: this
    });
    animationManager.setAnimation({
      el: trackerLayer,
      attr: {
        transform: 'T' + -xOffset + ',0'
      },
      component: this
    });
    chart.config.clipSet = true;
  }
  /**
   * Draws the canvas
   */
  ;

  _proto.drawCanvas = function drawCanvas() {
    var canvas = this,
        iapi = canvas.getFromEnv('chart'),
        jsonData = iapi.getFromEnv('dataSource'),
        chartAttrs = jsonData.chart,
        chartConfig = iapi.config,
        animationManager = canvas.getFromEnv('animationManager'),
        config = canvas.config,
        clip = config.clip = {},
        canvasBorderElementDummy = canvas.getGraphicalElement('canvasBorderElement'),
        canvasBorderElement,
        // animationObj = iapi.config.animationObj,
    // animationDuration = animationObj.duration,
    // dummyAnimElem = animationObj.dummyObj,
    // dummyAnimObj = animationObj.animObj,
    // animType = animationObj.animType,
    canvasElementDummy = canvas.getGraphicalElement('canvasElement'),
        canvasElement,
        canvasLeft = chartConfig.actualCanvasLeft,
        canvasTop = chartConfig.actualCanvasTop,
        actualCanvasWidth = chartConfig.canvasWidth,
        actualCanvasHeight = chartConfig.canvasHeight,
        actualCanvasLeft = chartConfig.canvasLeft,
        actualCanvasTop = chartConfig.canvasTop,
        canvasWidth = chartConfig.canvasWidth + chartConfig.totalWidth,
        canvasHeight = chartConfig.canvasHeight + chartConfig.totalHeight,
        canvasGroup = canvas.getContainer('canvasGroup'),
        canvasBorderRadius = config.canvasBorderRadius,
        canvasBorderWidth = config.canvasBorderWidth,
        borderWHlf = canvasBorderWidth * 0.5,
        canvasBorderColor = config.canvasBorderColor,
        canBGColor = config.canBGColor,
        shadow = config.shadow,
        canvasBgColor,
        attr,
        showCanvasBg = config.showCanvasBG = Boolean((0, _lib.pluckNumber)(chartAttrs.showcanvasbg, 1)),
        shadowOnCanvasFill = config.shadowOnCanvasFill,
        showCanvasBorder = config.showCanvasBorder;
    canvasBgColor = canBGColor;
    attr = {
      x: canvasLeft - borderWHlf,
      y: canvasTop - borderWHlf,
      width: canvasWidth + canvasBorderWidth,
      height: canvasHeight + canvasBorderWidth,
      r: canvasBorderRadius,
      'stroke-width': canvasBorderWidth,
      stroke: canvasBorderColor,
      'stroke-linejoin': canvasBorderWidth > MAX_MITER_LINEJOIN ? 'round' : 'miter'
    };

    if (showCanvasBorder) {
      canvasBorderElement = animationManager.setAnimation({
        el: canvasBorderElementDummy || 'rect',
        attr: attr,
        container: canvasGroup,
        component: canvas
      });

      if (!canvasBorderElementDummy) {
        canvasBorderElement = canvas.addGraphicalElement('canvasBorderElement', canvasBorderElement);
      } else {
        canvasBorderElement.show();
      }

      canvasBorderElement.shadow(shadow);
    } else {
      canvasBorderElementDummy && canvasBorderElementDummy.hide();
    } // create a clip-rect to clip canvas for later use


    clip['clip-canvas'] = [Math.max(0, actualCanvasLeft), Math.max(0, actualCanvasTop), Math.max(1, actualCanvasWidth), Math.max(1, actualCanvasHeight)];
    clip['clip-canvas-init'] = [Math.max(0, actualCanvasLeft), Math.max(0, actualCanvasTop), 1, Math.max(1, actualCanvasHeight)];

    if (showCanvasBg) {
      attr = {
        x: canvasLeft,
        y: canvasTop,
        width: canvasWidth,
        height: canvasHeight,
        r: canvasBorderRadius,
        'stroke-width': 0,
        'stroke': 'none',
        fill: (0, _lib.toRaphaelColor)(canvasBgColor)
      };
      canvasElement = animationManager.setAnimation({
        el: canvasElementDummy || 'rect',
        attr: attr,
        component: canvas,
        container: canvasGroup
      });

      if (!canvasElementDummy) {
        canvasElement = canvas.addGraphicalElement('canvasElement', canvasElement);
      } else {
        canvasElement.show();
      }

      canvasElement.shadow(shadowOnCanvasFill);
    } else {
      canvasElementDummy && canvasElementDummy.hide();
    }
  };

  return CanvasGantt;
}(_canvas.default);

var _default = CanvasGantt;
exports["default"] = _default;

/***/ }),

/***/ 1587:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _mscartesian = _interopRequireDefault(__webpack_require__(626));

var _ganttCanvas = _interopRequireDefault(__webpack_require__(1588));

var _ganttAxis = _interopRequireDefault(__webpack_require__(1590));

var _milestone = _interopRequireDefault(__webpack_require__(1596));

var _task = _interopRequireDefault(__webpack_require__(1597));

var _connector = _interopRequireDefault(__webpack_require__(1600));

var _ganttDataset = _interopRequireDefault(__webpack_require__(1602));

var _toolbox = __webpack_require__(418);

var _timeIntervals = __webpack_require__(490);

var _lib = __webpack_require__(274);

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }] */
var UNDEF,
    mathMax = Math.max,
    mathMin = Math.min,
    SLACK_FILL_COLOR = 'FF5E5E',
    TASK = 'task',
    _scrollBar = function () {
  var scrollItems = [];
  return {
    get: function get() {
      return scrollItems;
    },
    clear: function clear() {
      scrollItems.length = 0;
    },
    add: function add(options, callback) {
      scrollItems.push({
        conf: options,
        handler: callback
      });
    }
  };
}(),

/**
 * Function that determines if horizontal scroll is needed based on the number of time units to be shown
 * @param {Number} multiplier The multiplier of the time unit
 * @param {Number} unit The time unit namely year, month, etc
 * @param {Number} startTime The start time in the user given data
 * @param {Number} endTime The end time in the user given data
 * @return {Boolean} returns whether the given start and and end time can be accomodated in the given time bound
 */
_isOutofTimeRange = function _isOutofTimeRange(multiplier, unit, startTime, endTime) {
  if (multiplier > 0) {
    switch (unit) {
      case 'y':
        return +_timeIntervals.timeYear.offset(startTime, multiplier) < endTime;

      case 'm':
        return +_timeIntervals.timeMonth.offset(startTime, multiplier) < endTime;

      case 'd':
        return +_timeIntervals.timeDay.offset(startTime, multiplier) < endTime;

      case 'h':
        return +_timeIntervals.timeHour.offset(startTime, multiplier) < endTime;

      case 'mn':
        return +_timeIntervals.timeMinute.offset(startTime, multiplier) < endTime;

      case 's':
        return +_timeIntervals.timeSecond.offset(startTime, multiplier) < endTime;
    }
  }
}; // Map attribute definitions to their types


_lib.setAttribDefs && (0, _lib.setAttribDefs)({
  showpercentlabel: {
    type: _lib.attrTypeBool,
    pAttr: 'showpercentlabel'
  },
  fontsize: {
    type: _lib.attrTypeNum
  },
  alpha: {
    type: _lib.attrTypeNum
  },
  showborder: {
    type: _lib.attrTypeBool
  },
  borderthickness: {
    type: _lib.attrTypeNum
  },
  borderalpha: {
    type: _lib.attrTypeNum
  },
  showHoverEffect: {
    type: _lib.attrTypeNum
  },
  hoverFillAlpha: {
    type: _lib.attrTypeNum
  },
  slackHoverFillColor: {
    type: _lib.attrTypeNum
  },
  slackHoverFillAlpha: {
    type: _lib.attrTypeBool
  },
  showlabels: {
    type: _lib.attrTypeBool,
    pAttr: 'showtasknames'
  },
  slackfillcolor: {
    pAttr: 'slackfillcolor'
  },
  showtasklabels: {
    type: _lib.attrTypeBool,
    pAttr: 'showtasknames'
  },
  showtasknames: {
    type: _lib.attrTypeBool,
    pAttr: 'showlabels'
  },
  showconnectorhovereffect: {
    type: _lib.attrTypeNum,
    pAttr: 'showhovereffect'
  },
  connectorextension: {
    type: _lib.attrTypeNum
  },
  tasklabelspadding: {
    type: _lib.attrTypeNum
  },
  taskdatepadding: {
    type: _lib.attrTypeNum
  },
  showstartdate: {
    type: _lib.attrTypeNum,
    pAttr: 'showtaskstartdate'
  },
  showenddate: {
    type: _lib.attrTypeNum,
    pAttr: 'showtaskenddate'
  },
  showtaskhovereffect: {
    type: _lib.attrTypeNum,
    pAttr: 'showhovereffect'
  },
  useverticalscrolling: {
    type: _lib.attrTypeNum
  },
  taskbarroundradius: {
    type: _lib.attrTypeNum
  },
  showshadow: {
    type: _lib.attrTypeNum
  },
  showslackasfill: {
    type: _lib.attrTypeNum
  }
});
/**
 * Definition of the Gantt Chart API.
 */

var Gantt = /*#__PURE__*/function (_MSCartesian) {
  (0, _inheritsLoose2.default)(Gantt, _MSCartesian);

  /**
   * Creates an instance of Gantt. Defines the default color palette of the chart.
   */
  function Gantt() {
    var _this;

    _this = _MSCartesian.call(this) || this;
    _this._scrollBar = _scrollBar;
    _this.components = {};
    _this.fireGroupEvent = true;
    _this.hasInteractiveLegend = false;
    _this.defaultPaletteOptions = (0, _lib.extend2)((0, _lib.extend2)({}, _lib.defaultGaugePaletteOptions), {
      // Colors for gauge '339900', 'DD9B02', '943A0A',
      paletteColors: [['AFD8F8', 'F6BD0F', '8BBA00', 'FF8E46', '008E8E', 'D64646', '8E468E', '588526', 'B3AA00', '008ED6', '9D080D', 'A186BE', 'CC6600', 'FDC689', 'ABA000', 'F26D7D', 'FFF200', '0054A6', 'F7941C', 'CC3300', '006600', '663300', '6DCFF6'], ['AFD8F8', 'F6BD0F', '8BBA00', 'FF8E46', '008E8E', 'D64646', '8E468E', '588526', 'B3AA00', '008ED6', '9D080D', 'A186BE', 'CC6600', 'FDC689', 'ABA000', 'F26D7D', 'FFF200', '0054A6', 'F7941C', 'CC3300', '006600', '663300', '6DCFF6'], ['AFD8F8', 'F6BD0F', '8BBA00', 'FF8E46', '008E8E', 'D64646', '8E468E', '588526', 'B3AA00', '008ED6', '9D080D', 'A186BE', 'CC6600', 'FDC689', 'ABA000', 'F26D7D', 'FFF200', '0054A6', 'F7941C', 'CC3300', '006600', '663300', '6DCFF6'], ['AFD8F8', 'F6BD0F', '8BBA00', 'FF8E46', '008E8E', 'D64646', '8E468E', '588526', 'B3AA00', '008ED6', '9D080D', 'A186BE', 'CC6600', 'FDC689', 'ABA000', 'F26D7D', 'FFF200', '0054A6', 'F7941C', 'CC3300', '006600', '663300', '6DCFF6'], ['AFD8F8', 'F6BD0F', '8BBA00', 'FF8E46', '008E8E', 'D64646', '8E468E', '588526', 'B3AA00', '008ED6', '9D080D', 'A186BE', 'CC6600', 'FDC689', 'ABA000', 'F26D7D', 'FFF200', '0054A6', 'F7941C', 'CC3300', '006600', '663300', '6DCFF6']],
      // Store other colors
      // ------------- For 2D Chart ---------------//
      // We're storing 5 combinations, as we've 5 defined palettes.
      bgColor: ['FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF'],
      bgAngle: [270, 270, 270, 270, 270],
      bgRatio: ['100', '100', '100', '100', '100'],
      bgAlpha: ['100', '100', '100', '100', '100'],
      canvasBgColor: ['FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF'],
      canvasBgAngle: [0, 0, 0, 0, 0],
      canvasBgAlpha: ['100', '100', '100', '100', '100'],
      canvasBgRatio: ['', '', '', '', ''],
      canvasBorderColor: ['545454', '545454', '415D6F', '845001', '68001B'],
      canvasBorderAlpha: [100, 100, 100, 90, 100],
      gridColor: ['DDDDDD', 'D8DCC5', '99C4CD', 'DEC49C', 'FEC1D0'],
      gridResizeBarColor: ['999999', '545454', '415D6F', '845001', 'D55979'],
      categoryBgColor: ['F1F1F1', 'EEF0E6', 'F2F8F9', 'F7F0E6', 'FFF4F8'],
      dataTableBgColor: ['F1F1F1', 'EEF0E6', 'F2F8F9', 'F7F0E6', 'FFF4F8'],
      toolTipBgColor: ['FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF'],
      toolTipBorderColor: ['545454', '545454', '415D6F', '845001', '68001B'],
      baseFontColor: ['555555', '60634E', '025B6A', 'A15E01', '68001B'],
      borderColor: ['767575', '545454', '415D6F', '845001', '68001B'],
      borderAlpha: [50, 50, 50, 50, 50],
      legendBgColor: ['ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff'],
      legendBorderColor: ['666666', '545454', '415D6F', '845001', 'D55979'],
      plotBorderColor: ['999999', '8A8A8A', '6BA9B6', 'C1934D', 'FC819F'],
      plotFillColor: ['EEEEEE', 'D8DCC5', 'BCD8DE', 'E9D8BE', 'FEDAE3'],
      scrollBarColor: ['EEEEEE', 'D8DCC5', '99C4CD', 'DEC49C', 'FEC1D0']
    });

    _this.registerFactory('canvas', _ganttCanvas.default);

    _this.registerFactory('axis', _ganttAxis.default, ['canvas']);

    _this.registerFactory('dataset', _ganttDataset.default, ['canvas']);

    return _this;
  }
  /**
   * Provides the name of the chart extension
   *
   * @static
   * @return {string} The name of the chart extension
   */


  Gantt.getName = function getName() {
    return 'Gantt';
  }
  /**
   * draws the chart and the scroll bars
   */
  ;

  var _proto = Gantt.prototype;

  _proto.draw = function draw() {
    _MSCartesian.prototype.draw.call(this);

    this.createScrollbarContainer();
  }
  /**
   * Gets the name of the component
   * @return {string} name
   */
  ;

  _proto.getName = function getName() {
    return 'Gantt';
  }
  /**
   * Sets the default configurations of the Gantt chart
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _MSCartesian.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.alignCaptionWithCanvas = 0;
    config.defaultDatasetType = TASK;
    config.taskbarroundradius = 0;
    config.taskbarfillmix = " { light-10 }, { dark-20 }, { light-50 }, { light-85 }";
    config.taskbarfillratio = "0,8,84,8";
    config.showslackasfill = 1;
    config.dateintooltip = 1;
    config.tasklabelsalign = _lib.POSITION_CENTER;
    config.datepadding = 3;
    config.showtasknames = 0;
    config.showpercentlabel = false;
    config.showhovereffect = 1;
    config.slackfillcolor = SLACK_FILL_COLOR;
    config.connectorextension = 10;
    config.tasklabelspadding = 2;
    config.taskdatepadding = 3;
    config.showlabels = UNDEF;
    config.showtooltip = 1;
    config.showtaskhovereffect = UNDEF;
    config.useverticalscrolling = 1;
    config.ganttpanedurationunit = UNDEF;
    config.ganttpaneduration = UNDEF;
    config.showtaskstartdate = UNDEF;
    config.showtaskenddate = UNDEF;
    config.ganttwidthpercent = UNDEF;
    config.showshadow = 1;
    config.taskhoverfillalpha = _lib.HUNDREDSTRING;
    config.enablemousetracking = false;
  }
  /**
   * Checks if the given data is applicable to the chart. If it is not, the chart shows the
   * 'Invalid Data' message.
   *
   * @return {boolean} Indicates whether the data suplied to the chart is valid.
   */
  ;

  _proto._checkInvalidSpecificData = function _checkInvalidSpecificData() {
    var jsonData = this.getFromEnv('dataSource'),
        processes = jsonData.processes,
        process = processes && processes.process,
        zeroProcesslen = process && process.length,
        tasks = jsonData.tasks,
        task = tasks && tasks.task || tasks,
        zeroTaskLen = task && task.length,
        categories = jsonData.categories,
        category = categories && categories[0] && categories[0].category,
        zeroCatlen = category && category.length;
    return !zeroProcesslen || !zeroTaskLen || !zeroCatlen;
  }
  /**
   * Parses the data source configuration given by the user
   *
   * @param {Object} config The data source given by the user
   */
  ;

  _proto.parseChartAttr = function parseChartAttr(config) {
    var chartConfig = this.config,
        chartAttrs = config && config.chart || this.getFromEnv('chart-attrib'); // Parsing of showborder and borderwidth must be done before calling
    // configureAttributes of super class

    _MSCartesian.prototype.parseChartAttr.call(this, config);

    chartConfig.showBorder = (0, _lib.pluckNumber)(chartAttrs.showborder, 0);
    chartConfig.alignLegendWithCanvas = 0;
    chartConfig.taskhoverfillalpha = config.chart.taskhoverfillalpha;
  }
  /**
   * Generates the configuration for the x and y axes of the chart
   *
   * @return {Object} Containing the axis configuration
   */
  ;

  _proto._feedAxesRawData = function _feedAxesRawData() {
    var colorM = this.getFromEnv('color-manager'),
        dataSource = this.getFromEnv('dataSource'),
        chartAttrs = dataSource.chart,
        is3d = this.is3d,
        palleteString = is3d ? _lib.chartPaletteStr.chart3D : _lib.chartPaletteStr.chart2D,
        outCanfontSizeWithUnit = (0, _lib.pluckFontSizeMaintainUnit)(chartAttrs.outcnvbasefontsize, chartAttrs.basefontsize, 10);
    return {
      xAxisConf: [{
        isVertical: false,
        isReverse: false,
        isOpposit: true,
        outCanfontFamily: (0, _lib.pluck)(chartAttrs.outcnvbasefont, chartAttrs.basefont, 'Verdana,sans'),
        outCanfontSize: this.computeFontSize(outCanfontSizeWithUnit),
        outCanfontSizeWithUnit: outCanfontSizeWithUnit,
        outCancolor: (0, _lib.pluck)(chartAttrs.outcnvbasefontcolor, chartAttrs.basefontcolor, colorM.getColor(palleteString.baseFontColor)).replace(/^#? ([a-f0-9]+)/ig, '#$1'),
        axisBreaks: chartAttrs.xaxisbreaks,
        axisNamePadding: chartAttrs.xaxisnamepadding,
        axisValuePadding: chartAttrs.labelpadding,
        axisNameFont: chartAttrs.xaxisnamefont,
        axisNameFontSize: this.computeFontSize(chartAttrs.xaxisnamefontsize),
        axisNameFontSizeWithUnit: chartAttrs.xaxisnamefontsize,
        axisNameFontColor: chartAttrs.xaxisnamefontcolor,
        axisNameFontBold: chartAttrs.xaxisnamefontbold,
        axisNameFontItalic: chartAttrs.xaxisnamefontitalic,
        axisNameBgColor: chartAttrs.xaxisnamebgcolor,
        axisNameBorderColor: chartAttrs.xaxisnamebordercolor,
        axisNameAlpha: chartAttrs.xaxisnamealpha,
        axisNameFontAlpha: chartAttrs.xaxisnamefontalpha,
        axisNameBgAlpha: chartAttrs.xaxisnamebgalpha,
        axisNameBorderAlpha: chartAttrs.xaxisnameborderalpha,
        axisNameBorderPadding: chartAttrs.xaxisnameborderpadding,
        axisNameBorderRadius: chartAttrs.xaxisnameborderradius,
        axisNameBorderThickness: chartAttrs.xaxisnameborderthickness,
        axisNameBorderDashed: chartAttrs.xaxisnameborderdashed,
        axisNameBorderDashLen: chartAttrs.xaxisnameborderdashlen,
        axisNameBorderDashGap: chartAttrs.xaxisnameborderdashgap,
        useEllipsesWhenOverflow: chartAttrs.useellipseswhenoverflow,
        divLineColor: (0, _lib.pluck)(chartAttrs.vdivlinecolor, colorM.getColor(palleteString.divLineColor)),
        divLineAlpha: (0, _lib.pluck)(chartAttrs.vdivlinealpha, is3d ? colorM.getColor('divLineAlpha3D') : colorM.getColor('divLineAlpha')),
        divLineThickness: (0, _lib.pluckNumber)(chartAttrs.vdivlinethickness, 1),
        divLineIsDashed: Boolean((0, _lib.pluckNumber)(chartAttrs.vdivlinedashed, chartAttrs.vdivlineisdashed, 0)),
        divLineDashLen: (0, _lib.pluckNumber)(chartAttrs.vdivlinedashlen, 4),
        divLineDashGap: (0, _lib.pluckNumber)(chartAttrs.vdivlinedashgap, 2),
        showAlternateGridColor: (0, _lib.pluckNumber)(chartAttrs.showalternatevgridcolor, 0),
        alternateGridColor: (0, _lib.pluck)(chartAttrs.alternatevgridcolor, colorM.getColor('altVGridColor')),
        alternateGridAlpha: (0, _lib.pluck)(chartAttrs.alternatevgridalpha, colorM.getColor('altVGridAlpha')),
        numDivLines: (0, _lib.pluckNumber)(chartAttrs.numvdivlines, this.config.numVDivLines),
        labelFont: chartAttrs.labelfont,
        labelFontSize: this.computeFontSize(chartAttrs.labelfontsize),
        labelFontSizeWithUnit: chartAttrs.labelfontsize,
        labelFontColor: chartAttrs.labelfontcolor,
        labelFontAlpha: chartAttrs.labelalpha,
        labelFontBold: chartAttrs.labelfontbold,
        labelFontItalic: chartAttrs.labelfontitalic,
        maxLabelHeight: chartAttrs.maxlabelheight,
        axisName: chartAttrs.xaxisname,
        axisMinValue: chartAttrs.xaxisminvalue,
        axisMaxValue: chartAttrs.xaxismaxvalue,
        setAdaptiveMin: chartAttrs.setadaptivexmin,
        adjustDiv: chartAttrs.adjustvdiv,
        labelDisplay: chartAttrs.labeldisplay,
        showLabels: chartAttrs.showlabels,
        rotateLabels: chartAttrs.rotatelabels,
        slantLabel: (0, _lib.pluckNumber)(chartAttrs.slantlabels, chartAttrs.slantlabel),
        labelStep: (0, _lib.pluckNumber)(chartAttrs.labelstep, chartAttrs.xaxisvaluesstep),
        showAxisValues: (0, _lib.pluckNumber)(chartAttrs.showxaxisvalues, chartAttrs.showxaxisvalue),
        showLimits: (0, _lib.pluckNumber)(chartAttrs.showvlimits, this.config.showvlimits),
        showDivLineValues: (0, _lib.pluckNumber)(chartAttrs.showvdivlinevalues, chartAttrs.showvdivlinevalues),
        // showZeroPlane: chartAttrs.showvzeroplane,
        zeroPlaneColor: chartAttrs.vzeroplanecolor,
        zeroPlaneThickness: chartAttrs.vzeroplanethickness || 2,
        zeroPlaneAlpha: chartAttrs.vzeroplanealpha,
        showZeroPlaneValue: chartAttrs.showvzeroplanevalue,
        vTrendLines: dataSource.trendlines,
        trendlineColor: chartAttrs.trendlinecolor,
        trendlineToolText: chartAttrs.trendlinetooltext,
        trendlineThickness: chartAttrs.trendlinethickness,
        trendlineAlpha: chartAttrs.trendlinealpha,
        showTrendlinesOnTop: chartAttrs.showtrendlinesontop,
        showAxisLine: (0, _lib.pluckNumber)(chartAttrs.showxaxisline, chartAttrs.showaxislines, chartAttrs.drawAxisLines, 0),
        axisLineThickness: (0, _lib.pluckNumber)(chartAttrs.xaxislinethickness, chartAttrs.axislinethickness, 1),
        axisLineAlpha: (0, _lib.pluckNumber)(chartAttrs.xaxislinealpha, chartAttrs.axislinealpha, 100),
        axisLineColor: (0, _lib.pluck)(chartAttrs.xaxislinecolor, chartAttrs.axislinecolor, '#000000')
      }],
      yAxisConf: [{
        isVertical: true,
        isReverse: true,
        isOpposit: false,
        outCanfontFamily: (0, _lib.pluck)(chartAttrs.outcnvbasefont, chartAttrs.basefont, 'Verdana,sans'),
        outCanfontSize: this.computeFontSize(outCanfontSizeWithUnit),
        outCanfontSizeWithUnit: outCanfontSizeWithUnit,
        outCancolor: (0, _lib.pluck)(chartAttrs.outcnvbasefontcolor, chartAttrs.basefontcolor, colorM.getColor(palleteString.baseFontColor)).replace(/^#? ([a-f0-9]+)/ig, '#$1'),
        axisBreaks: chartAttrs.yaxisbreaks,
        axisNamePadding: chartAttrs.yaxisnamepadding,
        axisValuePadding: chartAttrs.yaxisvaluespadding,
        axisNameFont: chartAttrs.yaxisnamefont,
        axisNameFontSize: this.computeFontSize(chartAttrs.yaxisnamefontsize),
        axisNameFontSizeWithUnit: chartAttrs.yaxisnamefontsize,
        axisNameFontColor: chartAttrs.yaxisnamefontcolor,
        axisNameFontBold: chartAttrs.yaxisnamefontbold,
        axisNameFontItalic: chartAttrs.yaxisnamefontitalic,
        axisNameBgColor: chartAttrs.yaxisnamebgcolor,
        axisNameBorderColor: chartAttrs.yaxisnamebordercolor,
        axisNameAlpha: chartAttrs.yaxisnamealpha,
        axisNameFontAlpha: chartAttrs.yaxisnamefontalpha,
        axisNameBgAlpha: chartAttrs.yaxisnamebgalpha,
        axisNameBorderAlpha: chartAttrs.yaxisnameborderalpha,
        axisNameBorderPadding: chartAttrs.yaxisnameborderpadding,
        axisNameBorderRadius: chartAttrs.yaxisnameborderradius,
        axisNameBorderThickness: chartAttrs.yaxisnameborderthickness,
        axisNameBorderDashed: chartAttrs.yaxisnameborderdashed,
        axisNameBorderDashLen: chartAttrs.yaxisnameborderdashlen,
        axisNameBorderDashGap: chartAttrs.yaxisnameborderdashgap,
        axisNameWidth: chartAttrs.yaxisnamewidth,
        useEllipsesWhenOverflow: chartAttrs.useellipseswhenoverflow,
        rotateAxisName: (0, _lib.pluckNumber)(chartAttrs.rotateyaxisname, 1),
        axisName: chartAttrs.yaxisname,
        divLineColor: (0, _lib.pluck)(chartAttrs.divlinecolor, colorM.getColor(palleteString.divLineColor)),
        divLineAlpha: (0, _lib.pluck)(chartAttrs.divlinealpha, is3d ? colorM.getColor('divLineAlpha3D') : colorM.getColor('divLineAlpha')),
        divLineThickness: (0, _lib.pluckNumber)(chartAttrs.divlinethickness, 1),
        divLineIsDashed: Boolean((0, _lib.pluckNumber)(chartAttrs.divlinedashed, chartAttrs.divlineisdashed, 0)),
        divLineDashLen: (0, _lib.pluckNumber)(chartAttrs.divlinedashlen, 4),
        divLineDashGap: (0, _lib.pluckNumber)(chartAttrs.divlinedashgap, 2),
        showAlternateGridColor: (0, _lib.pluckNumber)(chartAttrs.showalternatehgridcolor, 1),
        alternateGridColor: (0, _lib.pluck)(chartAttrs.alternatehgridcolor, colorM.getColor('altHGridColor')),
        alternateGridAlpha: (0, _lib.pluck)(chartAttrs.alternatehgridalpha, colorM.getColor('altHGridAlpha')),
        numDivLines: (0, _lib.pluckNumber)(chartAttrs.numdivlines, this.numDivLines),
        axisMinValue: chartAttrs.yaxisminvalue,
        axisMaxValue: chartAttrs.yaxismaxvalue,
        setAdaptiveMin: chartAttrs.setadaptiveymin,
        adjustDiv: chartAttrs.adjustdiv,
        labelStep: chartAttrs.yaxisvaluesstep,
        showAxisValues: (0, _lib.pluckNumber)(chartAttrs.showyaxisvalues, chartAttrs.showyaxisvalue),
        showLimits: (0, _lib.pluckNumber)(chartAttrs.showlimits, this.showLimits),
        showDivLineValues: (0, _lib.pluckNumber)(chartAttrs.showdivlinevalues, chartAttrs.showdivlinevalue),
        // showZeroPlane: chartAttrs.showzeroplane,
        zeroPlaneColor: chartAttrs.zeroplanecolor,
        zeroPlaneThickness: chartAttrs.zeroplanethickness || 2,
        zeroPlaneAlpha: chartAttrs.zeroplanealpha,
        showZeroPlaneValue: chartAttrs.showzeroplanevalue,
        trendlineColor: chartAttrs.trendlinecolor,
        trendlineToolText: chartAttrs.trendlinetooltext,
        trendlineThickness: chartAttrs.trendlinethickness,
        trendlineAlpha: chartAttrs.trendlinealpha,
        showTrendlinesOnTop: chartAttrs.showtrendlinesontop,
        showAxisLine: (0, _lib.pluckNumber)(chartAttrs.showyaxisline, chartAttrs.showaxislines, chartAttrs.drawAxisLines, 0),
        axisLineThickness: (0, _lib.pluckNumber)(chartAttrs.yaxislinethickness, chartAttrs.axislinethickness, 1),
        axisLineAlpha: (0, _lib.pluckNumber)(chartAttrs.yaxislinealpha, chartAttrs.axislinealpha, 100),
        axisLineColor: (0, _lib.pluck)(chartAttrs.yaxislinecolor, chartAttrs.axislinecolor, '#000000')
      }]
    };
  }
  /**
   * Method that resets viewport config.
   */
  ;

  _proto._resetViewPortConfig = function _resetViewPortConfig() {
    var iapi = this;
    iapi.config.viewPortConfig = {
      scaleX: 1,
      scaleY: 1,
      x: 0,
      y: 0
    };
  }
  /**
   * Prepares the chart's axes.
   */
  ;

  _proto._setCategories = function _setCategories() {
    var jsonData = this.getFromEnv('dataSource'),
        xAxis = this.getChildren('xAxis')[0],
        yAxis = this.getChildren('yAxis')[0],
        categories = jsonData.categories,
        dataTable = jsonData.datatable,
        processes = jsonData.processes;
    yAxis.setAxisPadding(0.5, 0.5);
    yAxis.setProcess(processes);
    yAxis.setDataTable(dataTable);
    xAxis.setCategory(categories);
  }
  /**
   * Returns the class corresponding to the type of dataset requested
   * @param {string} dsType the type of the dataset.
   *
   * @return {Class} The corresponding dataset class.
   */
  ;

  _proto.getDSdef = function getDSdef(dsType) {
    switch (dsType) {
      case 'milestone':
        return _milestone.default;

      case 'connector':
        return _connector.default;

      case 'task':
      default:
        return _task.default;
    }
  }
  /**
   * Creates and configures all items in the legend.
   */
  ;

  _proto._createLegendItems = function _createLegendItems() {
    var iapi = this,
        dataObj = iapi.getFromEnv('dataSource'),
        legend = iapi.getFromEnv('legend'),
        length,
        i,
        strokeColor,
        lightColor,
        color,
        fillColor,
        itemObj,
        config,
        prevLen,
        currLen,
        legendItemId,
        legendItems = legend.getChildren('legendItem'),
        dataLegendItems = dataObj.legend && dataObj.legend.item || [];
    !this.config.legendItemIds && (this.config.legendItemIds = []);
    prevLen = legendItems && legendItems.length || 0;
    currLen = dataLegendItems.length;

    if (prevLen > currLen) {
      for (i = currLen; i < prevLen; i++) {
        legend.disposeItem(legendItems[i].getId());
      }

      legendItems && legendItems.splice(currLen, prevLen - currLen);
    }

    for (i = 0, length = dataLegendItems.length; i < length; i++) {
      itemObj = dataLegendItems[i];

      if (legend.getItem(this.config.legendItemIds[i])) {
        legendItemId = this.config.legendItemIds[i];
      } else {
        legendItemId = legend.createItem();
        this.config.legendItemIds.push(legendItemId);
      }

      color = itemObj.color;
      strokeColor = (0, _lib.getLightColor)(color, 60).replace(_lib.dropHash, '#');
      lightColor = (0, _lib.getLightColor)(color, 40);
      fillColor = {
        FCcolor: {
          color: color + ',' + color + ',' + lightColor + ',' + color + ',' + color,
          ratio: '0,70,30',
          angle: 270,
          alpha: '100,100,100,100,100'
        }
      };
      config = {
        label: itemObj.label,
        interactiveLegend: false
      };
      legend.getItem(legendItemId).configure(config);
      legend.getItem(legendItemId).setStateCosmetics('default', {
        symbol: {
          fill: (0, _lib.toRaphaelColor)(fillColor),
          stroke: (0, _lib.toRaphaelColor)(strokeColor)
        }
      });
    }
  }
  /**
   * Manages and assigns space to Gantt chart components
   */
  ;

  _proto._spaceManager = function _spaceManager() {
    // todo marge _allocateSpace and _spacemanager
    var availableHeight,
        availableWidth,
        config = this.config,
        xAxis = this.getChildren('xAxis')[0],
        yAxis = this.getChildren('yAxis')[0],
        legend = this.getChildren('legend')[0],
        legendPosition,
        allottedSpace,
        ganttWidthPercent = config.ganttwidthpercent,
        processWidthPercent = 100 - (ganttWidthPercent || 67),
        chartBorderWidth = config.borderWidth,
        spaceUsed,
        processHeight,
        totalWidth = 0,
        totalHeight = 0;

    this._resetViewPortConfig();

    this._allocateSpace({
      top: chartBorderWidth,
      bottom: chartBorderWidth,
      left: chartBorderWidth,
      right: chartBorderWidth
    });

    this._allocateSpace(this._manageActionBarSpace && this._manageActionBarSpace(config.availableHeight * 0.225) || {});

    if (legend) {
      legendPosition = legend.config.legendPos ? legend.config.legendPos.split('-') : [];
    }

    availableHeight = legendPosition[0] === _lib.POSITION_BOTTOM || legendPosition[0] === _lib.POSITION_TOP ? config.canvasHeight * 0.6 : config.canvasWidth * 0.6; // a space manager that manages the space for the tools as well as the captions.

    this._manageChartMenuBar(availableHeight);

    if (legendPosition[0] === 'right' || legendPosition[0] === 'left') {
      allottedSpace = config.canvasWidth * 0.3;
    } else {
      allottedSpace = config.canvasHeight * 0.3;
    } // Manage space for legend


    config.showLegend && this._manageLegendSpace(allottedSpace);
    config.actualCanvasTop = config.canvasTop;
    config.actualCanvasLeft = config.canvasLeft; //* ***** Manage space for y axis here y axis is the process column

    availableWidth = config.canvasWidth * (processWidthPercent / 100);
    spaceUsed = yAxis.placeAxis(availableWidth);
    totalWidth += (spaceUsed.left || 0) + (spaceUsed.right || 0);
    yAxis && this._allocateSpace(spaceUsed);
    availableHeight = legendPosition[0] === _lib.POSITION_BOTTOM || legendPosition[0] === _lib.POSITION_TOP ? config.canvasHeight * 0.6 : config.canvasWidth * 0.6;
    availableHeight = config.canvasHeight * 0.6;
    spaceUsed = xAxis.placeAxis(availableHeight);
    totalHeight += spaceUsed.top || 0;
    config.totalWidth = totalWidth;
    config.totalHeight = totalHeight;
    xAxis && this._allocateSpace(spaceUsed);
    processHeight = yAxis && yAxis.setProcessHeight();
    yAxis.setAxisConfig({
      processTotalHeight: processHeight
    });
  }
  /**
   * Final space management before the chart starts drawing itself.
   */
  ;

  _proto._postSpaceManagement = function _postSpaceManagement() {
    var iapi = this,
        config = iapi.config,
        xAxis = this.getChildren('xAxis')[0],
        yAxis = this.getChildren('yAxis')[0],
        limits = xAxis.getLimit(),
        processTotalHeight = yAxis.getAxisConfig('processTotalHeight'),
        canvasHeight = config.canvasHeight,
        legend = this.getChildren('legend')[0],
        xDepth = config.xDepth,
        canvasConfig = this.getChildren('canvas')[0].config,
        canvasBorderWidth = canvasConfig.canvasBorderWidth,
        canvasPadding = canvasConfig.canvasPadding,
        vScrollBar = iapi.getChildren('vScrollBar') && iapi.getChildren('vScrollBar')[0],
        conf = vScrollBar && vScrollBar.config,
        vScrollWidth,
        vScrollEnabled,
        canvasPaddingLeft = canvasConfig.canvasPaddingLeft,
        canvasPaddingRight = canvasConfig.canvasPaddingRight,
        gPaneDuration = Number(config.ganttpaneduration),
        gPaneDurationUnit = config.ganttpanedurationunit,
        hProcessScrollBar = iapi.getChildren('hProcessScrollBar') && iapi.getChildren('hProcessScrollBar')[0],
        hScrollBar = iapi.getChildren('hScrollBar') && iapi.getChildren('hScrollBar')[0],
        hScrollBarHeight = hScrollBar && hScrollBar.config.height || 0,
        hProcessScrollHeight = hProcessScrollBar && hProcessScrollBar.config.height || 0,
        totalProcessWidth,
        totalVisiblelProcessWidth,
        hScrollEnabled,
        hProcessScrollEnabled,
        maxHScrollBarHeight,
        actualCanvasHeight,
        axisLength;
    config.hScrollEnabled = hScrollEnabled = !isNaN(gPaneDuration) && gPaneDurationUnit !== UNDEF && _isOutofTimeRange(gPaneDuration, gPaneDurationUnit, limits.min, limits.max);
    totalProcessWidth = yAxis.getAxisConfig('totalWidth');
    totalVisiblelProcessWidth = yAxis.getAxisConfig('totalVisiblelWidth');

    if (totalProcessWidth > totalVisiblelProcessWidth) {
      hProcessScrollEnabled = true;
    } else {
      hProcessScrollEnabled = false;
    }

    maxHScrollBarHeight = Math.max(hProcessScrollEnabled ? hProcessScrollHeight : 0, hScrollEnabled ? hScrollBarHeight : 0);
    actualCanvasHeight = canvasHeight - maxHScrollBarHeight; // Need to call manageScrollbarPosition here for knowing whether vertical scroll bar is there

    if (processTotalHeight > actualCanvasHeight) {
      vScrollEnabled = true;
    }

    vScrollWidth = vScrollEnabled ? conf.width || 0 : 0;
    axisLength = config.canvasWidth - (xDepth || 0) - Math.max(canvasPaddingLeft, canvasPadding) - Math.max(canvasPaddingRight, canvasPadding) - vScrollWidth;
    xAxis && xAxis.setAxisDimention({
      x: canvasConfig.canvasLeft + (xDepth || 0) + Math.max(canvasPaddingLeft, canvasPadding),
      y: canvasConfig.canvasTop - (config.shift || 0),
      opposite: canvasConfig.canvasTop + canvasConfig.canvasHeight + canvasBorderWidth,
      axisLength: axisLength
    });
    config.currentCanvasWidth = axisLength;
    yAxis && yAxis.setAxisDimention({
      x: canvasConfig.canvasLeft - (config.shift || 0),
      y: canvasConfig.canvasTop,
      opposite: canvasConfig.canvasRight + canvasBorderWidth,
      axisLength: config.canvasHeight
    });

    iapi._manageScrollbarPosition();

    config.showLegend && legend.postSpaceManager();
    iapi.setScrollDimensions();
    iapi.allocateDimensionOfChartMenuBar();
  }
  /**
   * Function to create scrollbar container
   */
  ;

  _proto.createScrollbarContainer = function createScrollbarContainer() {
    var iapi = this,
        childGraphics = iapi.getChildContainer(),
        graphics = iapi.getContainer(),
        scrollBarParentGroup = graphics.scrollBarParentGroup,
        animationManager = iapi.getFromEnv('animationManager');

    if (!scrollBarParentGroup) {
      scrollBarParentGroup = graphics.scrollBarParentGroup = animationManager.setAnimation({
        el: 'group',
        attr: {
          name: 'scrollBarParentGroup'
        },
        container: graphics.parentgroup,
        component: iapi
      });
      iapi.config.scrollbarContainer = scrollBarParentGroup;
      scrollBarParentGroup.insertBefore(childGraphics.datalabelsGroup);
    }
  }
  /**
   * Function to draw scrollbar
   */
  ;

  _proto.setScrollDimensions = function setScrollDimensions() {
    var iapi = this,
        config = iapi.config,
        components = iapi.getChildren(),
        xAxis = components.xAxis[0],
        axisRange = xAxis.config.axisRange,
        viewPortConfig = config.viewPortConfig,
        scrollOptions = config.scrollOptions || (config.scrollOptions = {}),
        max = axisRange.max,
        min = axisRange.min,
        vxLength = scrollOptions.horizontalVxLength,
        hScrollBar = iapi.getChildren('hScrollBar')[0],
        hScrollBarConfig,
        hScrollBarAnchor = hScrollBar.getChildren('scrollAnchor')[0],
        hScrollBarAnchorConfig = hScrollBarAnchor.config,
        vScrollBar = iapi.getChildren('vScrollBar')[0],
        vScrollBarConfig,
        hProcessScrollBar = iapi.getChildren('hProcessScrollBar')[0],
        hProcessScrollBarConfig,
        useVerticalScrollBar = config.useverticalscrolling,
        scrollableLength = max - min,
        canvasRight = config.canvasRight,
        scaleX = viewPortConfig.scaleX,
        scaleY = viewPortConfig.scaleY,
        canvasLeft,
        canvasTop,
        canvasHeight,
        canvasWidth,
        canvasConfig,
        vScrollRatio,
        windowedCanvasHeight,
        fullCanvasHeight,
        vScrollEnabled = config.vScrollEnabled,
        yAxis = components.yAxis[0],
        windowedCanvasWidth,
        vScrollWidth = vScrollEnabled ? vScrollBar.config.conf.width : 0,
        fullCanvasWidth,
        totalProcessWidth,
        totalVisiblelProcessWidth,
        graphics = iapi.getContainer(),
        scrollBarParentGroup;
    canvasLeft = config.canvasLeft;
    canvasTop = config.canvasTop;
    canvasHeight = config.canvasHeight;
    canvasWidth = config.canvasWidth;
    canvasConfig = components.canvas[0].config;
    scrollOptions.viewPortMin = min;
    scrollOptions.viewPortMax = max;
    scrollOptions.scrollRatio = vxLength / scrollableLength;
    windowedCanvasWidth = scrollOptions.windowedCanvasWidth = xAxis.getPixel(vxLength);
    fullCanvasWidth = scrollOptions.fullCanvasWidth = xAxis.getPixel(max - min) - windowedCanvasWidth;
    fullCanvasHeight = scrollOptions.fullCanvasHeight = yAxis.getAxisConfig('processTotalHeight');
    windowedCanvasHeight = scrollOptions.windowedCanvasHeight = canvasHeight;
    totalProcessWidth = yAxis.getAxisConfig('totalWidth');
    totalVisiblelProcessWidth = yAxis.getAxisConfig('totalVisiblelWidth');
    vScrollRatio = 1 / scaleY;
    scrollBarParentGroup = graphics.scrollBarParentGroup; // draw the scrollbar element
    // todo padding needs to be included.

    if (config.hScrollEnabled !== false) {
      hScrollBarConfig = hScrollBar.config;
      hScrollBar.setDimension({
        x: canvasLeft,
        y: canvasTop + canvasHeight,
        width: canvasWidth - vScrollWidth
      });
      hScrollBarConfig.scrollRatio = 1 / scaleX;
      hScrollBarConfig.scrollPosition = hScrollBarAnchorConfig.scrollPosition = viewPortConfig.x * scaleX / (canvasWidth * (scaleX - 1));
      hScrollBarConfig.roundEdges = canvasConfig.isRoundEdges;
      hScrollBarConfig.fullCanvasWidth = fullCanvasWidth;
      hScrollBarConfig.windowedCanvasWidth = windowedCanvasWidth;
      hScrollBarConfig.parentLayer = scrollBarParentGroup;
    }

    if (vScrollEnabled !== false && useVerticalScrollBar) {
      vScrollBarConfig = vScrollBar.config;
      vScrollBar.setDimension({
        x: canvasRight - vScrollWidth,
        y: canvasTop,
        height: canvasHeight
      });
      vScrollBarConfig.scrollRatio = vScrollRatio;
      vScrollBarConfig.roundEdges = canvasConfig.isRoundEdges;
      vScrollBarConfig.fullCanvasWidth = fullCanvasHeight;
      vScrollBarConfig.windowedCanvasWidth = windowedCanvasHeight;
      vScrollBarConfig.parentLayer = scrollBarParentGroup;
    }

    if (totalVisiblelProcessWidth < totalProcessWidth && totalVisiblelProcessWidth > 0) {
      hProcessScrollBarConfig = hProcessScrollBar.config;
      hProcessScrollBar.setDimension({
        x: canvasLeft - totalVisiblelProcessWidth,
        y: canvasTop + canvasHeight,
        width: totalVisiblelProcessWidth
      });
      hProcessScrollBarConfig.scrollRatio = totalVisiblelProcessWidth / totalProcessWidth;
      hProcessScrollBarConfig.roundEdges = canvasConfig.isRoundEdges;
      hProcessScrollBarConfig.fullCanvasWidth = fullCanvasWidth;
      hProcessScrollBarConfig.windowedCanvasWidth = windowedCanvasWidth;
      hProcessScrollBarConfig.parentLayer = scrollBarParentGroup;
    }
  }
  /**
   * Function to set axis scale
   */
  ;

  _proto._setAxisScale = function _setAxisScale() {
    var iapi = this,
        components = iapi.getChildren(),
        config = iapi.config,
        xAxis = components.xAxis[0],
        limits = xAxis.getLimit(),
        max = limits.max,
        min = limits.min,
        minDt = new Date(min),
        yAxis = components.yAxis[0],
        numberFormatter = iapi.getFromEnv('number-formatter'),
        gPaneDuration = Number(config.ganttpaneduration),
        scrollOptions = config.scrollOptions || (config.scrollOptions = {}),
        gPaneDurationUnit = config.ganttpanedurationunit,
        scaleX,
        ms = max - min,
        canvasHeight = config.canvasHeight,
        scrollToDate = config.scrolltodate,
        canvasWidth = config.canvasWidth,
        datems,
        canvasLeft = config.canvasLeft,
        hProcessScrollBar = iapi.getChildren('hProcessScrollBar')[0],
        hScrollBar = iapi.getChildren('hScrollBar')[0],
        vScrollBar = iapi.getChildren('vScrollBar')[0],
        maxHScrollBarHeight,
        hScrollBarHeight = hScrollBar && hScrollBar.config && hScrollBar.config.height || 0,
        hProcessScrollHeight = hProcessScrollBar && hProcessScrollBar.config && hProcessScrollBar.config.height || 0,
        datePixel,
        totalWidth = xAxis.getPixel(max) - canvasLeft,
        processTotalHeight = yAxis.getAxisConfig('processTotalHeight'),
        totalVisiblelProcessWidth,
        totalProcessWidth,
        actualCanvasHeight,
        width,
        units;

    if (!config.hScrollEnabled) {
      hScrollBar.remove();
    } else {
      switch (gPaneDurationUnit) {
        case 'y':
          minDt.setFullYear(minDt.getFullYear() + gPaneDuration);
          break;

        case 'm':
          minDt.setMonth(minDt.getMonth() + gPaneDuration);
          break;

        case 'd':
          minDt.setDate(minDt.getDate() + gPaneDuration);
          break;

        case 'h':
          minDt.setHours(minDt.getHours() + gPaneDuration);
          break;

        case 'mn':
          minDt.setMinutes(minDt.getMinutes() + gPaneDuration);
          break;

        default:
          minDt.setSeconds(minDt.getSeconds() + gPaneDuration);
          break;
      }

      minDt = minDt.getTime();
      width = xAxis.getPixel(minDt) - canvasLeft;
      config.hScrollEnabled = true; // update the scaleX for the axis.

      config.viewPortConfig.scaleX = scaleX = totalWidth / width; // parse the scroll properties

      scrollOptions.horizontalVxLength = ms / units * gPaneDuration;

      if (scrollToDate) {
        datems = numberFormatter.getDateValue(scrollToDate).ms;
        datePixel = xAxis.getPixel(datems);
        config.viewPortConfig.x = mathMin(datePixel - canvasLeft, canvasWidth * (scaleX - 1)) / scaleX;
      }

      if (config.scrollPos >= 0) {
        config.xOffset = config.currentCanvasWidth * (scaleX - 1) * config.scrollPos;
        config.viewPortConfig.x = config.xOffset / scaleX;
      }
    }

    totalProcessWidth = yAxis.getAxisConfig('totalWidth');
    totalVisiblelProcessWidth = yAxis.getAxisConfig('totalVisiblelWidth');

    if (totalProcessWidth > totalVisiblelProcessWidth) {
      config.hProcessScrollEnabled = true;
    } else {
      config.hProcessScrollEnabled = false;
      hProcessScrollBar.remove();
    }

    maxHScrollBarHeight = mathMax(config.hProcessScrollEnabled ? hProcessScrollHeight : 0, config.hScrollEnabled ? hScrollBarHeight : 0);
    actualCanvasHeight = canvasHeight - maxHScrollBarHeight;

    if (Math.floor(processTotalHeight) > actualCanvasHeight && config.useverticalscrolling) {
      config.viewPortConfig.scaleY = processTotalHeight / actualCanvasHeight;
      config.vScrollEnabled = true;
    } else {
      config.vScrollEnabled = false;
      vScrollBar.remove();
    }
  }
  /**
   * Create toolbox of gantt
   */
  ;

  _proto._createToolBoxGantt = function _createToolBoxGantt() {
    var iapi = this,
        hScrollBar = iapi.getChildren('hScrollBar') && iapi.getChildren('hScrollBar')[0],
        vScrollBar = iapi.getChildren('vScrollBar') && iapi.getChildren('vScrollBar')[0],
        hProcessScrollBar = iapi.getChildren('hProcessScrollBar') && iapi.getChildren('hProcessScrollBar')[0],
        components = iapi.getChildren(),
        yAxis = components.yAxis[0],
        _scrollB = iapi._scrollBar,
        chartMenuBar = components.chartMenuBar || {},
        actionBar = components.actionBar,
        getScrollItems = _scrollB.get,
        addScrollItems = _scrollB.add,
        prevPos,
        // Scrollbar,
    // ComponentGroup,
    hScrollItem,
        hScrollItem1,
        vScrollItem; // toolBoxAPI;
    // chartId = iapi.getFromEnv('chartInstance').id;

    if (chartMenuBar.drawn || actionBar && actionBar.drawn) {
      return;
    } // toolBoxAPI = iapi.getFromEnv('toolBoxAPI');
    // Scrollbar = toolBoxAPI.Scrollbar;
    // ComponentGroup = toolBoxAPI.ComponentGroup;
    // temp code: On update scroll items needs to be reused.


    _scrollB.clear(); // Adding the scroll items in the scroll bar.


    addScrollItems({
      isHorizontal: true,
      scale: 1,
      scrollPosition: 0
    }, {
      // Attach the callback for scroll Interaction.
      'scroll': function (ref, isHorizontal) {
        return function () {
          ref.updateManagerH(arguments[0], isHorizontal);
        };
      }(iapi, true),
      'scrollStart': function scrollStart(scrollPosition) {
        prevPos = scrollPosition;
        iapi.fireChartInstanceEvent('scrollstart', {
          scrollPosition: scrollPosition
        });
      },
      scrollEnd: function scrollEnd(scrollPosition) {
        iapi.fireChartInstanceEvent('scrollend', {
          scrollPosition: scrollPosition,
          prevScrollPosition: prevPos
        });
      }
    });
    addScrollItems({
      isHorizontal: false,
      scale: 1,
      scrollPosition: 0
    }, {
      // Attach the callback for scroll Interaction.
      'scroll': function (ref, isHorizontal) {
        return function () {
          ref.updateManagerV(arguments[0], isHorizontal);
        };
      }(iapi, false),
      'scrollStart': function scrollStart(scrollPosition) {
        prevPos = scrollPosition;
        iapi.fireChartInstanceEvent('scrollstart', {
          scrollPosition: scrollPosition
        });
      },
      scrollEnd: function scrollEnd(scrollPosition) {
        iapi.fireChartInstanceEvent('scrollend', {
          scrollPosition: scrollPosition,
          prevScrollPosition: prevPos
        });
      }
    });
    addScrollItems({
      isHorizontal: true,
      scale: 1,
      scrollPosition: 0
    }, {
      // Attach the callback for scroll Interaction.
      'scroll': function () {
        return function () {
          yAxis.manageProcessScroll(arguments[0]);
        };
      }(iapi, true),
      'scrollStart': function scrollStart(scrollPosition) {
        prevPos = scrollPosition;
        iapi.fireChartInstanceEvent('scrollstart', {
          scrollPosition: scrollPosition
        });
      },
      scrollEnd: function scrollEnd(scrollPosition) {
        iapi.fireChartInstanceEvent('scrollend', {
          scrollPosition: scrollPosition,
          prevScrollPosition: prevPos
        });
      }
    }); // Fetching the scroll Items.

    hScrollItem = getScrollItems()[0];
    vScrollItem = getScrollItems()[1];
    hScrollItem1 = getScrollItems()[2]; // adding the scrollbar. tb.pid is the component pool id

    if (!hScrollBar) {
      hScrollBar = iapi.attachChild(new _toolbox.ScrollBar(), 'hScrollBar');
    }

    hScrollBar.configure(hScrollItem.conf);
    hScrollBar.attachEventHandlers(hScrollItem.handler);

    if (!vScrollBar) {
      vScrollBar = iapi.attachChild(new _toolbox.ScrollBar(), 'vScrollBar');
    }

    vScrollBar.configure(vScrollItem.conf);
    vScrollBar.attachEventHandlers(vScrollItem.handler);

    if (!hProcessScrollBar) {
      hProcessScrollBar = iapi.attachChild(new _toolbox.ScrollBar(), 'hProcessScrollBar');
    }

    hProcessScrollBar.configure(hScrollItem1.conf);
    hProcessScrollBar.attachEventHandlers(hScrollItem1.handler);
  }
  /**
   * Function to manage scrollbar position
   */
  ;

  _proto._manageScrollbarPosition = function _manageScrollbarPosition() {
    var iapi = this,
        config = iapi.config,
        hScrollEnabled,
        vScrollEnabled,
        hScrollBar = iapi.getChildren('hScrollBar')[0],
        vScrollBar = iapi.getChildren('vScrollBar')[0],
        hProcessScrollBar = iapi.getChildren('hProcessScrollBar')[0],
        totalWidth = config.totalWidth || 0,
        totalHeight = config.totalHeight || 0,
        scrollDimensions;
    iapi._setAxisScale && iapi._setAxisScale();
    hScrollBar = iapi.getChildren('hScrollBar')[0];
    vScrollBar = iapi.getChildren('vScrollBar')[0];
    hProcessScrollBar = iapi.getChildren('hProcessScrollBar')[0];
    vScrollEnabled = config.vScrollEnabled;
    hScrollEnabled = config.hScrollEnabled;
    scrollDimensions = hScrollBar.getLogicalSpace(); // allocate space for toolBox and set the chart configurations.
    // shift denotes the amount of shift required by the x-axis

    config.hScrollHeight = hScrollEnabled === false ? 0 : scrollDimensions.height + vScrollBar.config.padding;
    scrollDimensions = vScrollBar.getLogicalSpace();
    config.vScrollWidth = vScrollEnabled !== false ? scrollDimensions.width + vScrollBar.config.conf.padding : 0;
    scrollDimensions = hProcessScrollBar.getLogicalSpace();
    config.hProcessScrollHeight = config.hProcessScrollEnabled ? scrollDimensions.height + hProcessScrollBar.config.padding : 0;
    totalHeight += mathMax(config.hProcessScrollHeight, config.hScrollHeight);

    iapi._allocateSpace({
      bottom: mathMax(config.hProcessScrollHeight, config.hScrollHeight)
    });

    config.totalWidth = totalWidth;
    config.totalHeight = totalHeight;
  }
  /**
   * Function is responsible for horizontal scroll of datatable
   * @param {number} pos scroll position
   */
  ;

  _proto.updateManagerH = function updateManagerH(pos
  /*, isHorizontal */
  ) {
    var iapi = this,
        config = iapi.config,
        lastXpos = config.lastXpos || (config.lastXpos = {
      x: 0,
      y: 0
    }),
        viewPortConfig = iapi.config.viewPortConfig,
        animationManager = iapi.getFromEnv('animationManager'),
        scaleX = viewPortConfig.scaleX,
        components = iapi.getChildren(),
        xAxis = components.xAxis[0],
        graphics = iapi.getChildContainer(),
        datasetLayer = graphics.plotGroup,
        dataLabelContainer = iapi.getChildContainer('datalabelsGroup'),
        dataLabelsLayer = graphics.datalabelsGroup,
        trackerGroup = graphics.trackerGroup,
        xOffset = config.xOffset || 0,
        yOffset = config.yOffset || 0,
        currentCanvasWidth = config.currentCanvasWidth,
        transformAttr,
        ganttPlotLineContainer = xAxis.getContainer('ganttPlotLineContainer');
    config.scrollPos = pos;
    xOffset = config.xOffset = currentCanvasWidth * (scaleX - 1) * pos; // viewPortConfig.x = xOffset / scaleX;

    xAxis.translateAxis(-xOffset, UNDEF);
    lastXpos.x = -xOffset;
    transformAttr = 't' + -xOffset + ', ' + -yOffset;
    animationManager.setAnimation({
      el: datasetLayer,
      attr: {
        'transform': transformAttr
      },
      component: iapi
    });
    animationManager.setAnimation({
      el: dataLabelsLayer,
      attr: {
        'transform': transformAttr
      },
      component: iapi
    });
    animationManager.setAnimation({
      el: trackerGroup,
      attr: {
        'transform': transformAttr
      },
      component: iapi
    });
    animationManager.setAnimation({
      el: dataLabelContainer,
      attr: {
        'transform': transformAttr
      },
      component: iapi
    });
    animationManager.setAnimation({
      el: ganttPlotLineContainer,
      attr: {
        'transform': 't' + -xOffset + ', ' + 0
      },
      component: iapi
    });
  }
  /**
   * Function is responsible for vertical scrolling of datatable
   * @param {number} pos scroll position
   */
  ;

  _proto.updateManagerV = function updateManagerV(pos
  /*, isHorizontal */
  ) {
    var iapi = this,
        config = iapi.config,
        animationManager = iapi.getFromEnv('animationManager'),
        xOffset = config.xOffset,
        viewPortConfig = iapi.config.viewPortConfig,
        components = iapi.getChildren(),
        yAxis = components.yAxis[0],
        yOffset = config.yOffset || 0,
        canvasHeight = config.canvasHeight,
        scaleY = viewPortConfig.scaleY,
        lastTranslate,
        dataLabelContainer = iapi.getChildContainer('datalabelsGroup'),
        labelContainer = yAxis.getContainer('labelContainer'),
        datatableContainer = iapi.getChildContainer('plotGroup'),
        ganttPlotHoverBandContainer = yAxis.getContainer('ganttPlotHoverBandContainer'),
        ganttPlotLineContainer = yAxis.getContainer('ganttPlotLineContainer');
    yOffset = config.yOffset = canvasHeight * (scaleY - 1) * pos;
    viewPortConfig.y = yOffset / scaleY;
    lastTranslate = yAxis.config.lastTranslate || (yAxis.config.lastTranslate = {
      x: 0,
      y: 0
    });
    animationManager.setAnimation({
      el: labelContainer,
      attr: {
        'transform': 't' + lastTranslate.x + ', ' + -yOffset
      },
      component: iapi
    });
    animationManager.setAnimation({
      el: ganttPlotHoverBandContainer,
      attr: {
        'transform': 't' + 0 + ', ' + -yOffset
      },
      component: iapi
    });
    animationManager.setAnimation({
      el: datatableContainer,
      attr: {
        'transform': 't' + -xOffset + ', ' + -yOffset
      },
      component: iapi
    });
    animationManager.setAnimation({
      el: dataLabelContainer,
      attr: {
        'transform': 't' + -xOffset + ', ' + -yOffset
      },
      component: iapi
    });
    animationManager.setAnimation({
      el: ganttPlotLineContainer,
      attr: {
        'transform': 't' + 0 + ', ' + -yOffset
      },
      component: iapi
    });
  };

  return Gantt;
}(_mscartesian.default);

var _default = Gantt;
exports["default"] = _default;

/***/ }),

/***/ 1601:
/***/ ((__unused_webpack_module, exports) => {



exports.__esModule = true;
exports["default"] = void 0;
var _default = {
  'initial.dataset.connector': function initialDatasetConnector() {
    return {
      'path.appearing': function pathAppearing() {
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
    };
  }
};
exports["default"] = _default;

/***/ }),

/***/ 1600:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _task = _interopRequireWildcard(__webpack_require__(1597));

var _lib = __webpack_require__(274);

var _connectorGantt = _interopRequireDefault(__webpack_require__(1601));

var _dependencyManager = __webpack_require__(282);

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }], complexity: 'off' */
var
/**
 * Click event handler for connectors
 *
 * @param {Object} chart The chart instance which the connector is a part of
 *
 * @return {Function} The function to be executed on a click
 */
connectorClick = function connectorClick(chart) {
  return function (e) {
    var ele = this;
    chart.plotEventHandler(ele, e, 'ConnectorClick');
  };
},

/**
 * Mouse over event handler for connectors
 *
 * @param {Object} chart The chart instance which the connector is a part of
 *
 * @return {Function} The function to be executed on a mouse over
 */
rollOverHandler = function rollOverHandler(chart) {
  return function (event) {
    var ele = this,
        data = ele.data('dataObj'),
        config = data.config,
        chartComponents = chart.components,
        taskMap = chartComponents.tasksMap,
        stTObj = taskMap[config.fromTaskId],
        endTObj = taskMap[config.toTaskId],
        attr = {
      stroke: config.hoverColor,
      'stroke-dasharray': config.dashedStyle,
      'stroke-width': config.hoverThickness
    },
        connector = data.graphics.connector;
    chart.plotEventHandler(ele, event, 'ConnectorRollOver');

    if (config.showHoverEffect) {
      [stTObj, endTObj].forEach(function (obj) {
        var attrib = {
          fill: obj.config.hoverFillColor,
          stroke: obj.config.hoverBorderColor
        },
            percentComplete = obj.config.percentComplete,
            slackGraphic = obj.graphics.slackElem,
            element = obj.graphics.element,
            // Percent complete graphic is task fill
        percentCompleteGraphic = obj.graphics.taskFill;

        if (percentComplete && !obj.config.showAsGroup) {
          slackGraphic && slackGraphic.attr({
            fill: obj.config.slackHoverColor
          });
          percentCompleteGraphic && percentCompleteGraphic.attr({
            fill: obj.config.hoverFillColor,
            stroke: obj.config.hoverBorderColor
          });
          delete attrib.fill;
        }

        element && element.attr(attrib);
      });
      connector && connector.attr(attr);
    }
  };
},

/**
 * Mouse out event handler for connectors
 *
 * @param {Object} chart The chart instance which the connector is a part of
 *
 * @return {Function} The function to be executed on a mouse out
 */
rollOutHandler = function rollOutHandler(chart) {
  return function (event) {
    var ele = this,
        data = ele.data('dataObj'),
        config = data.config,
        chartComponents = chart.components,
        taskMap = chartComponents.tasksMap,
        stTObj = taskMap[config.fromTaskId],
        endTObj = taskMap[config.toTaskId],
        attr = {
      stroke: config.color,
      'stroke-width': config.thickness,
      'stroke-dasharray': config.dashedStyle
    },
        connector = data.graphics.connector;
    chart.plotEventHandler(ele, event, 'ConnectorRollOut');

    if (config.showHoverEffect) {
      [stTObj, endTObj].forEach(function (obj) {
        var attrib = {
          fill: obj.config.color,
          stroke: obj.config.borderColor,
          'stroke-width': obj.config.borderThickness,
          'stroke-dasharray': obj.config.dashedStyle
        },
            percentComplete = obj.config.percentComplete,
            slackGraphic = obj.graphics.slackElem,
            element = obj.graphics.element,
            percentCompleteGraphic = obj.graphics.taskFill;

        if (percentComplete && !obj.config.showAsGroup) {
          slackGraphic && slackGraphic.attr({
            fill: obj.config.slackColor
          });
          percentCompleteGraphic && percentCompleteGraphic.attr({
            fill: obj.config.color
          });
          delete attrib.fill;
        }

        element && element.attr(attrib);
      });
      connector && connector.attr(attr);
    }
  };
};

(0, _dependencyManager.addDep)({
  name: 'connectorAnimation',
  type: 'animationRule',
  extension: _connectorGantt.default
});
/**
 * Defines a Connector dataset for a Gantt chart.
 */

var Connector = /*#__PURE__*/function (_Task) {
  (0, _inheritsLoose2.default)(Connector, _Task);

  function Connector() {
    return _Task.apply(this, arguments) || this;
  }

  var _proto = Connector.prototype;

  /**
   * Gets the name of the component
   * @return {string} name
   */
  _proto.getName = function getName() {
    return 'connector';
  }
  /**
   * Sets the default configurations of the dataset
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _Task.prototype.__setDefaultConfig.call(this);

    var config = this.config;
    config.isdashed = 1;
    config.thickness = 1;
  }
  /**
   * Parses and configures the dataset according to the data given by the user.
   */
  ;

  _proto.configureAttributes = function configureAttributes() {
    var dataset = this,
        jsonData = dataset.getFromEnv('dataSource'),
        userConfig = (0, _lib.extend2)({}, jsonData.connectors && jsonData.connectors.length ? jsonData.connectors[0] : jsonData.connectors || {});
    (0, _lib.parseConfiguration)(userConfig, dataset.config, dataset.getFromEnv('chart').config, {
      connector: true
    });

    if (!dataset.components) {
      dataset.components = {};
    }

    dataset._setConfigure();

    dataset.setState('dirty', true);
  }
  /**
   * Configures each data of the dataset
   *
   * @param {Array} newDataset The new dataset, if any
   */
  ;

  _proto._setConfigure = function _setConfigure(newDataset) {
    var dataset = this,
        datasetConfig = dataset.config,
        chart = dataset.getFromEnv('chart'),
        jsonData = dataset.getFromEnv('dataSource'),
        JSONData = jsonData.connectors && jsonData.connectors.length ? jsonData.connectors[0] : jsonData.connectors || {},
        setDataArr = newDataset || JSONData.length ? JSONData : JSONData.connector,
        setDataLen = setDataArr && setDataArr.length || 0,
        colorM = chart.getFromEnv('color-manager'),
        chartConfig = chart.config,
        dataStore = dataset.components.data,
        i,
        dataObj,
        setData,
        config,
        cnColor,
        cnAlpha,
        cnThickness,
        cnIsDashed;

    if (!dataStore) {
      dataStore = dataset.components.data = [];
    } // Connectors


    for (i = 0; i < setDataLen; i += 1) {
      setData = setDataArr[i];
      dataObj = dataStore[i];

      if (!dataObj) {
        dataObj = dataStore[i] = {
          config: {}
        };
      }

      !dataObj.config && (dataObj.config = {});
      config = dataObj.config; // Extract the attributes

      cnColor = (0, _lib.pluck)(setData.color, datasetConfig.color, colorM.getColor('plotBorderColor'));
      cnAlpha = (0, _lib.pluckNumber)(setData.alpha, datasetConfig.alpha, 100);
      cnThickness = (0, _lib.pluckNumber)(setData.thickness, datasetConfig.thickness, 1);
      cnIsDashed = (0, _lib.pluckNumber)(setData.isdashed, datasetConfig.isdashed, 1);
      config.fromTaskId = (0, _lib.getFirstValue)(setData.fromtaskid, '').toLowerCase();
      config.toTaskId = (0, _lib.getFirstValue)(setData.totaskid, '').toLowerCase();
      config.fromTaskConnectStart = (0, _lib.pluckNumber)(setData.fromtaskconnectstart, 0);
      config.toTaskConnectStart = (0, _lib.pluckNumber)(setData.totaskconnectstart, 1);
      config.color = (0, _lib.convertColor)(cnColor);
      config.alpha = cnAlpha * 0.01;
      config.link = setData.link;
      config.showHoverEffect = (0, _lib.pluckNumber)(setData.showhovereffect, datasetConfig.showhovereffect, chartConfig.showconnectorhovereffect, 1);
      config.hoverColor = (0, _lib.convertColor)((0, _lib.pluck)(setData.hovercolor, datasetConfig.hovercolor, chartConfig.connectorhovercolor, (0, _lib.getDarkColor)(cnColor, 80)), (0, _lib.pluckNumber)(setData.hoveralpha, datasetConfig.hoveralpha, chartConfig.connectorhoveralpha, cnAlpha));
      config.hoverThickness = (0, _lib.pluckNumber)(setData.hoverthickness, datasetConfig.hoverthickness, chartConfig.connectorhoverthickness, cnThickness);
      config.thickness = cnThickness;
      config.dashedStyle = cnIsDashed ? (0, _lib.getDashStyle)((0, _lib.pluckNumber)(setData.dashlen, datasetConfig.dashlen, 5), (0, _lib.pluckNumber)(setData.dashgap, datasetConfig.dashgap, cnThickness), cnThickness) : 'none';
    }

    if ((0, _lib.pluckNumber)(JSONData.visible, 1)) {
      dataset.setState('visible', true);
    } else {
      dataset.setState('visible', false);
    }
  }
  /**
   * Draws the dataset.
   */
  ;

  _proto.draw = function draw() {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        chartComponents = chart.components,
        dataStore = dataset.components.data,
        animationManager = dataset.getFromEnv('animationManager'),
        chartConfig = chart.config,
        ln = dataStore.length,
        taskMap = chartComponents.tasksMap,
        cExt = chartConfig.connectorextension,
        canvas = chart.getChildren('canvas')[0],
        parentContainer = canvas.getChildContainer('connectorGroup'),
        container = dataset.getContainer('connectorContainer'),
        visible = dataset.getState('visible'),
        isContextChanged = dataset._contextChanged(),
        // animationObj = chart.get('config', 'animationObj'),
    // animationDuration = animationObj.duration,
    // dummyAnimElem = animationObj.dummyObj,
    // dummyAnimObj = animationObj.animObj,
    // animType = animationObj.animType,
    removeDataArr = dataset.components.removeDataArr || [],
        removeDataArrLen = removeDataArr.length,
        startTaskId,
        endTaskId,
        stTObj,
        endTObj,
        dataObj,
        isStraightLine,
        stY,
        etY,
        stx1,
        stx2,
        etx1,
        etx2,
        diff,
        cnCase,
        config,
        stTConfig,
        endTConfig,
        cPath,
        tH,
        graphics,
        connectorDummy,
        connector,
        eventArgs,
        trackerElementDummy,
        trackerElement,
        i;

    if (!dataset.getState('removed') && !dataset.getState('dirty') && !(isContextChanged && visible) && !dataset.getState('dragged')) {
      return;
    }

    if (!container) {
      container = dataset.addContainer('connectorContainer', animationManager.setAnimation({
        el: 'group',
        attr: {
          name: 'connectors'
        },
        container: parentContainer,
        component: dataset
      }));

      if (!visible) {
        container.hide();
      } else {
        container.show();
      }
    } // Iterate through each and draw it


    for (i = 0; i <= ln; i += 1) {
      dataObj = dataStore[i];

      if (!dataObj) {
        continue;
      }

      config = dataObj.config;
      !dataObj.graphics && (dataObj.graphics = {});
      graphics = dataObj.graphics;
      startTaskId = config.fromTaskId && config.fromTaskId.toLowerCase();
      endTaskId = config.toTaskId && config.toTaskId.toLowerCase();
      stTObj = taskMap[startTaskId];
      endTObj = taskMap[endTaskId];
      connectorDummy = graphics.connector; // If the connector's from and to Id are defined, only then we draw the connector

      if (stTObj && endTObj) {
        stTConfig = stTObj.config;
        endTConfig = endTObj.config; // Y Positions

        stY = stTConfig.yPos + stTConfig.height * 0.5;
        etY = endTConfig.yPos + endTConfig.height * 0.5; // Check if the to and from bars are in straight line

        isStraightLine = stY === etY; // X Positions

        stx1 = stTConfig.xPos;
        stx2 = stTConfig.xPos + stTConfig.width;
        etx1 = endTConfig.xPos;
        etx2 = endTConfig.xPos + endTConfig.width;

        if ((0, _task.checkInvalidValue)(stx1, stx2, etx1, etx2) === false) {
          continue;
        }

        diff = 0; // There can be four cases if the two tasks are not in straight line

        cnCase = 0; // cnCase 1: End of StartTask to Start of EndTask

        if (config.fromTaskConnectStart === 0 && config.toTaskConnectStart === 1) {
          cnCase = 1;
        } // cnCase 2: End of StartTask to End of EndTask


        if (config.fromTaskConnectStart === 0 && config.toTaskConnectStart === 0) {
          cnCase = 2;
        } // cnCase 3: Start of StartTask to Start of EndTask


        if (config.fromTaskConnectStart === 1 && config.toTaskConnectStart === 1) {
          cnCase = 3;
        } // cnCase 4: Start of StartTask to End of EndTask


        if (config.fromTaskConnectStart === 1 && config.toTaskConnectStart === 0) {
          cnCase = 4;
        }

        if (isStraightLine) {
          tH = stTConfig.height;

          switch (cnCase) {
            case 1:
              diff = (etx1 - stx2) / 10;
              cPath = ['M', stx2, stY, stx2 + diff, stY, 'L', stx2 + diff, stY, stx2 + diff, stY - tH, 'L', stx2 + diff, stY - tH, etx1 - diff, stY - tH, 'L', etx1 - diff, stY - tH, etx1 - diff, stY, 'L', etx1 - diff, stY, etx1, etY];
              break;

            case 2:
              cPath = ['M', stx2, stY, stx2 + cExt, stY, 'L', stx2 + cExt, stY, stx2 + cExt, stY - tH, 'L', stx2 + cExt, stY - tH, etx2 + cExt, stY - tH, 'L', etx2 + cExt, etY - tH, etx2 + cExt, etY, etx2, etY];
              break;

            case 3:
              cPath = ['M', stx1, stY, stx1 - cExt, stY, 'L', stx1 - cExt, stY, stx1 - cExt, stY - tH, 'L', stx1 - cExt, stY - tH, etx1 - cExt, stY - tH, 'L', etx1 - cExt, stY - tH, etx1 - cExt, stY, 'L', etx1 - cExt, stY, etx1, stY];
              break;

            case 4:
              cPath = ['M', stx1, stY, stx1 - cExt, stY, 'L', stx1 - cExt, stY, stx1 - cExt, stY - tH, 'L', stx1 - cExt, stY - tH, etx2 + cExt, stY - tH, 'L', etx2 + cExt, stY - tH, etx2 + cExt, stY, 'L', etx2 + cExt, stY, etx2, stY];
              break;
          }
        } else {
          switch (cnCase) {
            case 1:
              cPath = ['M', stx2, stY, stx2 + (etx1 - stx2) / 2, stY, 'L', stx2 + (etx1 - stx2) / 2, stY, stx2 + (etx1 - stx2) / 2, etY, 'L', stx2 + (etx1 - stx2) / 2, etY, etx1, etY];

              if (stx2 <= etx1) {
                cPath = ['M', stx2, stY, stx2 + (etx1 - stx2) / 2, stY, 'L', stx2 + (etx1 - stx2) / 2, stY, stx2 + (etx1 - stx2) / 2, etY, 'L', stx2 + (etx1 - stx2) / 2, etY, etx1, etY];
              } else {
                cPath = ['M', stx2, stY, stx2 + cExt, stY, 'L', stx2 + cExt, stY, stx2 + cExt, stY + (etY - stY) / 2, 'L', stx2 + cExt, stY + (etY - stY) / 2, etx1 - cExt, stY + (etY - stY) / 2, 'L', etx1 - cExt, stY + (etY - stY) / 2, etx1 - cExt, etY, 'L', etx1 - cExt, etY, etx1, etY];
              }

              break;

            case 2:
              diff = etx2 - stx2 < 0 ? 0 : etx2 - stx2;
              cPath = ['M', stx2, stY, stx2 + cExt + diff, stY, 'L', stx2 + cExt + diff, stY, stx2 + cExt + diff, etY, 'L', stx2 + cExt + diff, etY, etx2, etY];
              break;

            case 3:
              diff = stx1 - etx1 < 0 ? 0 : stx1 - etx1;
              cPath = ['M', stx1, stY, stx1 - cExt - diff, stY, 'L', stx1 - cExt - diff, stY, stx1 - cExt - diff, etY, 'L', stx1 - cExt - diff, etY, etx1, etY];
              break;

            case 4:
              if (stx1 > etx2) {
                cPath = ['M', stx1, stY, stx1 - (stx1 - etx2) / 2, stY, 'L', stx1 - (stx1 - etx2) / 2, stY, stx1 - (stx1 - etx2) / 2, etY, 'L', stx1 - (stx1 - etx2) / 2, etY, etx2, etY];
              } else {
                cPath = ['M', stx1, stY, stx1 - cExt, stY, 'L', stx1 - cExt, stY, stx1 - cExt, stY + (etY - stY) / 2, 'L', stx1 - cExt, stY + (etY - stY) / 2, etx2 + cExt, stY + (etY - stY) / 2, 'L', etx2 + cExt, stY + (etY - stY) / 2, etx2 + cExt, etY, 'L', etx2 + cExt, etY, etx2, etY];
              }

              break;
          }
        }

        connector = graphics.connector = animationManager.setAnimation({
          el: connectorDummy || 'path',
          label: 'path',
          attr: {
            path: cPath,
            stroke: config.color,
            'stroke-opacity': config.alpha,
            'stroke-width': config.thickness,
            'stroke-dasharray': config.dashedStyle
          },
          container: container,
          component: dataset
        });
        connector.show();
        eventArgs = {
          fromTaskId: config.fromTaskId,
          toTaskId: config.toTaskId,
          fromTaskConnectStart: config.fromTaskConnectStart,
          toTaskConnectStart: config.toTaskConnectStart,
          link: config.link,
          sourceType: 'connector'
        };
        trackerElementDummy = graphics.trackerElement;
        trackerElement = graphics.trackerElement = animationManager.setAnimation({
          el: trackerElementDummy || 'path',
          attr: {
            path: cPath,
            stroke: _lib.TRACKER_FILL,
            'stroke-width': Math.max(config.thickness, 1),
            cursor: config.link ? 'pointer' : ''
          },
          container: container,
          component: dataset
        });

        if (!trackerElementDummy) {
          trackerElement.on('fc-click', connectorClick(chart)).hover(rollOverHandler(chart), rollOutHandler(chart));
        }

        trackerElement.data('dataObj', dataObj).data('eventArgs', eventArgs);
      } else {
        connectorDummy && animationManager.setAnimation({
          el: connectorDummy,
          component: dataset,
          callback: _task.hideFn,
          doNotRemove: true
        });
        graphics.trackerElement && animationManager.setAnimation({
          el: graphics.trackerElement,
          component: dataset,
          callback: _task.hideFn,
          doNotRemove: true
        });
      }
    }

    for (i = 0; i < removeDataArrLen; i++) {
      dataset._removeDataVisuals(removeDataArr.shift());
    }
  };

  return Connector;
}(_task.default);

var _default = Connector;
exports["default"] = _default;

/***/ }),

/***/ 1599:
/***/ ((__unused_webpack_module, exports) => {



exports.__esModule = true;
exports["default"] = void 0;
var _default = {
  'initial.dataset.milestone': function initialDatasetMilestone() {
    return {
      'polypath.appearing': function polypathAppearing() {
        return [{
          initialAttr: {
            opacity: 0
          },
          finalAttr: {
            opacity: 1
          },
          slot: 'middle',
          startEnd: {
            start: 0.9,
            end: 1
          }
        }];
      }
    };
  }
};
exports["default"] = _default;

/***/ }),

/***/ 1596:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _task = _interopRequireWildcard(__webpack_require__(1597));

var _lib = __webpack_require__(274);

var _milestoneGantt = _interopRequireDefault(__webpack_require__(1599));

var _dependencyManager = __webpack_require__(282);

var _schedular = __webpack_require__(286);

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint require-jsdoc: 'error', valid-jsdoc: ["error", { "requireReturn": false }], complexity: 'off' */
var UNDEF,
    FF5E5E = 'FF5E5E',
    MIDDLE = 'middle';

var
/**
 * Click event handler for milestones
 *
 * @param {Object} chart The chart instance which the milestone is a part of
 *
 * @return {Function} The function to be executed on a click
 */
clickHandler = function clickHandler(chart) {
  return function (event) {
    var ele = this;
    /**
     * In `Gantt` chart, milestones are an important part of the chart as they allow you to visually
     * depict any crucial dates on the chart.
     * This event is fired when a milestone is clicked
     *
     * This event is only applicable to Gantt chart.
     *
     * @event FusionCharts#milestoneClick
     *
     * @param {string} date - The date of the milestone.
     * @param {string} numSides - The number of sides of the milestone.
     * @param {string} radius - The radius of the milestone.
     * @param {string} taskId - The id of the task to which this milestone relates to.
     * @param {string} toolText - The tooltext that is displayed when hovered over the milestone
     * @param {number} chartX - x-coordinate of the pointer relative to the chart.
     * @param {number} chartY - y-coordinate of the pointer relative to the chart.
     * @param {number} pageX - x-coordinate of the pointer relative to the page.
     * @param {number} pageY - y-coordinate of the pointer relative to the page.
     * @see FusionCharts#event:milestoneRollOver
     * @see FusionCharts#event:milestoneRollOut
     */

    chart.plotEventHandler(ele, event, 'MilestoneClick');
  };
},

/**
 * Mouse over event handler for milestones
 *
 * @param {Object} chart The chart instance which the milestone is a part of
 *
 * @return {Function} The function to be executed on a mouse over
 */
rollOverHandler = function rollOverHandler(chart) {
  return function (event) {
    var ele = this,
        dataObj = ele.data('dataObj'),
        config = dataObj.config;
    /**
       * In `Gantt` chart, milestones are an important part of the chart as they allow you to
       * visually depict any crucial dates on the chart.
       * This event is fired when the pointer moves over a milestone
       *
       * This event is only applicable to Gantt chart.
       *
       * @event FusionCharts#milestoneRollOver
       *
       * @param {string} date - The date of the milestone.
       * @param {string} numSides - The number of sides of the milestone.
       * @param {string} radius - The radius of the milestone.
       * @param {string} taskId - The id of the task to which this milestone relates to.
       * @param {string} toolText - The tooltext that is displayed when hovered over the milestone.
       * @param {number} chartX - x-coordinate of the pointer relative to the chart.
       * @param {number} chartY - y-coordinate of the pointer relative to the chart.
       * @param {number} pageX - x-coordinate of the pointer relative to the page.
       * @param {number} pageY - y-coordinate of the pointer relative to the page.
       * @see FusionCharts#event:milestoneClick
       * @see FusionCharts#event:milestoneRollOut
       */

    chart.plotEventHandler(ele, event, 'MilestoneRollOver');
    config.showHoverEffect && dataObj.graphics.element.attr({
      fill: config.hoverFillColor,
      stroke: config.hoverBorderColor,
      'fill-opacity': config.hoverFillAlpha,
      'stroke-opacity': config.hoverBorderAlpha
    });
  };
},

/**
 * Mouse out event handler for milestones
 *
 * @param {Object} chart The chart instance which the milestone is a part of
 *
 * @return {Function} The function to be executed on a mouse out
 */
rollOutHandler = function rollOutHandler(chart) {
  return function (event) {
    var ele = this,
        dataObj = ele.data('dataObj'),
        config = dataObj.config;
    /**
     * In `Gantt` chart, milestones are an important part of the chart as they allow you to visually
     * depict any crucial dates on the chart.
     * This event is fired when the pointer moves out of a milestone
     *
     * This event is only applicable to Gantt chart.
     *
     * @event FusionCharts#milestoneRollOut
     *
     * @param {string} date - The date of the milestone.
     * @param {string} numSides - The number of sides of the milestone.
     * @param {string} radius - The radius of the milestone.
     * @param {string} taskId - The id of the task to which this milestone relates to.
     * @param {string} toolText - The tooltext that is displayed when hovered over the milestone
     * @param {number} chartX - x-coordinate of the pointer relative to the chart.
     * @param {number} chartY - y-coordinate of the pointer relative to the chart.
     * @param {number} pageX - x-coordinate of the pointer relative to the page.
     * @param {number} pageY - y-coordinate of the pointer relative to the page.
     * @see FusionCharts#event:milestoneClick
     * @see FusionCharts#event:milestoneRollOver
     */

    chart.plotEventHandler(ele, event, 'MilestoneRollOut');
    config.showHoverEffect && dataObj.graphics.element.attr({
      fill: config.fillColor,
      stroke: config.borderColor,
      'fill-opacity': config.fillAlpha,
      'stroke-opacity': config.borderAlpha
    });
  };
};

(0, _dependencyManager.addDep)({
  name: 'milestoneAnimation',
  type: 'animationRule',
  extension: _milestoneGantt.default
});
/**
 * Defines a Milestone dataset for a Gantt chart.
 */

var Milestone = /*#__PURE__*/function (_Task) {
  (0, _inheritsLoose2.default)(Milestone, _Task);

  function Milestone() {
    return _Task.apply(this, arguments) || this;
  }

  var _proto = Milestone.prototype;

  /**
   * Gets the name of the component
   * @return {string} name
   */
  _proto.getName = function getName() {
    return 'milestone';
  }
  /**
   * Sets the default configurations of the dataset
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _Task.prototype.__setDefaultConfig.call(this);

    var config = this.config; // configurations with defult values

    config.showpercentlabel = 0;
    config.showstartdate = 0;
    config.showenddate = 0;
    config.showlabels = UNDEF;
    config.showborder = 1;
    config.borderthickness = 1;
    config.showHoverEffect = 1;
    config.slackFillColor = FF5E5E; // inherited from parent

    config.font = _lib.BLANKSTRING;
    config.fontcolor = _lib.BLANKSTRING;
    config.fontsize = _lib.BLANKSTRING;
    config.color = _lib.BLANKSTRING;
    config.alpha = _lib.HUNDREDSTRING; // not found

    config.bordercolor = _lib.BLANKSTRING; // not found

    config.borderalpha = _lib.HUNDREDSTRING; // not found

    config.hoverFillColor = _lib.BLANKSTRING; // not found

    config.hoverFillAlpha = _lib.HUNDREDSTRING; // not found

    config.slackHoverFillColor = 10; // not found

    config.slackHoverFillAlpha = _lib.HUNDREDSTRING; // notfound
  }
  /**
   * Parses and configures the dataset according to the data given by the user.
   */
  ;

  _proto.configureAttributes = function configureAttributes() {
    var dataset = this,
        config = dataset.config,
        jsonData = dataset.getFromEnv('dataSource'),
        userConfig = (0, _lib.extend2)({}, jsonData.milestones && jsonData.milestones.length ? jsonData.milestones[0] : jsonData.milestones || {});
    (0, _lib.parseConfiguration)(userConfig, config, {
      milestones: true
    });

    if (!dataset.components) {
      dataset.components = {};
    }

    dataset._setConfigure();

    dataset.setState('dirty', true);
  }
  /**
   * Configures each data of the dataset
   *
   * @param {Array} newDataset The new dataset, if any
   */
  ;

  _proto._setConfigure = function _setConfigure(newDataset) {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        yAxis = chart.getChildren('yAxis')[0],
        axisConfig = yAxis.config,
        jsonData = dataset.getFromEnv('dataSource'),
        JSONData = jsonData.milestones && jsonData.milestones.length ? jsonData.milestones[0] : jsonData.milestones || {},
        setDataArr = newDataset || JSONData.length ? JSONData : JSONData.milestone,
        setDataLen = setDataArr && setDataArr.length,
        colorM = dataset.getFromEnv('color-manager'),
        chartConfig = chart.config,
        numberFormatter = dataset.getFromEnv('number-formatter'),
        dataStore = dataset.components.data,
        style = chart.config.style,
        inCanStyle = style.inCanvasStyle,
        tasksMap = chart.components.tasksMap,
        dataObj,
        taskConfigObj,
        dataConfig,
        i,
        processMap = axisConfig.processes.processMap,
        processes = axisConfig.processes.process.process,
        processName,
        setData,
        sides,
        color,
        shape,
        depth,
        toolText,
        taskId,
        labelStyle = chart.config.milestoneLabelStyle,
        dateMs,
        milestoneDate;

    if (!dataStore) {
      dataStore = dataset.components.data = [];
    }

    for (i = 0; i < setDataLen; i += 1) {
      setData = setDataArr[i];
      dataObj = dataStore[i];

      if (!dataObj) {
        dataObj = dataStore[i] = {
          config: {}
        };
      }

      dataConfig = dataObj.config;
      taskId = (0, _lib.getFirstValue)(setData.taskid, _lib.BLANKSTRING).toLowerCase();
      shape = (0, _lib.pluck)(setData.shape, 'polygon').toLowerCase();
      sides = (0, _lib.pluckNumber)(setData.numsides, 5); // Restrict
      // shape = (shape == 'star') ? shape : mapSymbolName (sides);

      depth = 0;

      if (shape === 'star') {
        depth = 0.4;
      } else {
        shape = (0, _lib.mapSymbolName)(sides);
        shape = (0, _lib.mapSymbolName)(sides).split('-')[0];
      }

      color = (0, _lib.pluck)(setData.color, colorM.getColor('legendBorderColor'));
      toolText = (0, _lib.getValidValue)((0, _lib.parseUnsafeString)((0, _lib.pluck)(setData.tooltext, setData.hovertext, chartConfig.milestonetooltext), false));
      dateMs = numberFormatter.getDateValue(setData.date).ms;
      milestoneDate = numberFormatter.getFormattedDate(dateMs);

      if (toolText !== UNDEF && tasksMap[taskId]) {
        taskConfigObj = tasksMap[taskId].config;

        if (processMap[taskId]) {
          // take process name using the processMap(stores a map for processId and process Name)
          processName = processMap[taskId].catObj.label || processMap[taskId].catObj.name;
        } else {
          processName = processes[i] && (processes[i].label || processes[i].name);
        }

        toolText = (0, _lib.parseTooltext)(toolText, [28, 32, 33, 34, 35, 36], {
          date: milestoneDate,
          taskStartDate: taskConfigObj._startDate,
          taskEndDate: taskConfigObj._endDate,
          taskLabel: taskConfigObj.label,
          taskPercentComplete: taskConfigObj.percentComplete !== -1 ? numberFormatter.percentValue(taskConfigObj.percentComplete) : _lib.BLANKSTRING,
          // @todo add the process name from data table once created
          processName: processName
        }, setData);
      } else {
        toolText = milestoneDate;
      } // style = {
      //     fontSize: pluckNumber (setData.fontsize, chartConfig.milestonefontsize,
      //         inCanStyle.fontSize) + PX,
      //     fontFamily: pluck (setData.font, chartConfig.milestonefont,
      //         inCanStyle.fontFamily),
      //     fontWeight: pluckNumber (setData.fontbold,
      //         chartConfig.milestonefontbold, 0) && BOLD || NORMAL,
      //     fontStyle: pluckNumber (setData.fontitalic,
      //         chartConfig.milestonefontitalic, 0) && ITALIC || NORMAL
      // };


      style = dataConfig.style = (0, _task.extractLabelStyle)({
        fontSize: setData.fontsize,
        fontFamily: setData.font,
        fontWeight: setData.fontbold,
        fontStyle: setData.fontitalic
      });
      dataConfig.textColor = (0, _lib.getFirstColor)((0, _lib.pluck)(setData.fontcolor, chartConfig.milestonefontcolor, inCanStyle.color));
      (0, _lib.setLineHeight)(style);
      dataConfig.lineHeight = (0, _lib.pluck)(style && style.lineHeight, labelStyle && labelStyle.lineHeight);
      dataConfig.numSides = sides;
      dataConfig.startAngle = (0, _lib.pluckNumber)(setData.startangle, 90);
      dataConfig.radius = setData.radius;
      dataConfig.origDate = setData.date;
      dataConfig.date = numberFormatter.getDateValue(setData.date);
      dataConfig.fillColor = (0, _lib.getFirstColor)(color);
      dataConfig.fillAlpha = (0, _lib.pluckNumber)(setData.fillalpha, setData.alpha, 100) * 0.01;
      dataConfig.borderColor = (0, _lib.getFirstColor)((0, _lib.pluck)(setData.bordercolor, color));
      dataConfig.borderAlpha = (0, _lib.pluckNumber)(setData.borderalpha, setData.alpha, 100) * 0.01;
      dataConfig.displayValue = (0, _lib.parseUnsafeString)(setData.label);
      dataConfig.style = style;
      dataConfig.hoverFillColor = (0, _lib.getFirstColor)((0, _lib.pluck)(setData.hoverfillcolor, chartConfig.milestonehoverfillcolor, (0, _lib.getDarkColor)(color, 80)));
      dataConfig.hoverFillAlpha = (0, _lib.pluckNumber)(setData.hoverfillalpha, chartConfig.milestonehoverfillalpha, setData.fillalpha, setData.alpha, 100) * 0.01;
      dataConfig.hoverBorderColor = (0, _lib.getFirstColor)((0, _lib.pluck)(setData.hoverbordercolor, chartConfig.milestonehoverbordercolor, (0, _lib.getDarkColor)((0, _lib.pluck)(setData.bordercolor, color), 80)));
      dataConfig.hoverBorderAlpha = (0, _lib.pluckNumber)(setData.hoverborderalpha, chartConfig.milestonehoverborderalpha, setData.borderalpha, setData.alpha, 100) * 0.01;
      dataConfig.showHoverEffect = (0, _lib.pluckNumber)(setData.showhovereffect, chartConfig.showmilestonehovereffect, chartConfig.showhovereffect, 1);
      dataConfig.depth = depth;
      dataConfig.taskId = taskId;
      dataConfig.borderThickness = (0, _lib.pluckNumber)(setData.borderthickness, 1);
      dataConfig.link = setData.link;
      dataConfig.toolText = toolText;
    }

    if ((0, _lib.pluckNumber)(JSONData.visible, 1)) {
      dataset.setState('visible', true);
    } else {
      dataset.setState('visible', false);
    }
  }
  /**
   * Draws labels on the milestones.
   */
  ;

  _proto.drawLabel = function drawLabel() {
    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        animationManager = dataset.getFromEnv('animationManager'),
        tasksMap = chart.components.tasksMap,
        config,
        toolTipController = dataset.getFromEnv('toolTipController'),
        dataLabelContainer = dataset.getContainer('milestoneLabelContainer'),
        eventArgs,
        dataObj,
        i,
        labelElementDummy,
        labelElement,
        len,
        graphics,
        labelAttrs,
        taskObj,
        dataStore = dataset.components.data,
        style;

    for (i = 0, len = dataStore.length; i < len; i++) {
      dataObj = dataStore[i];
      config = dataObj.config;
      taskObj = tasksMap[config.taskId];
      graphics = dataObj.graphics;
      labelElementDummy = graphics.labelElement;
      eventArgs = config.eventArgs;
      labelAttrs = config._labelAttrs;
      style = config.style;

      if (config.displayValue !== _lib.BLANKSTRING && config.displayValue !== UNDEF && taskObj) {
        labelElement = graphics.labelElement = animationManager.setAnimation({
          el: labelElementDummy || 'text',
          attr: labelAttrs,
          container: dataLabelContainer,
          component: dataset
        }); // Drawing of milestone label element

        if (!labelElementDummy) {
          labelElement.on('fc-click', clickHandler(chart)).hover(rollOverHandler(chart), rollOutHandler(chart));
        } else {
          labelElement.removeCSS();
          labelElement.show();
        }

        labelElement.css(style);
        toolTipController.enableToolTip(labelElement, config.toolText);
        labelElement.data('eventArgs', eventArgs).data('dataObj', dataObj);
      } else {
        labelElementDummy && animationManager.setAnimation({
          el: labelElementDummy,
          component: dataset,
          callback: _task.hideFn,
          doNotRemove: true
        });
      }
    }
  }
  /**
   * Draws the datastet.
   */
  ;

  _proto.draw = function draw() {
    var dataset = this,
        datasetConfigMilestones = this.config.milestone,
        chart = dataset.getFromEnv('chart'),
        chartComponents = chart.components,
        components = dataset.components,
        toolTipController = dataset.getFromEnv('toolTipController'),
        xAxis = chart.getChildren('xAxis')[0],
        dataStore = components.data,
        taskMap = chartComponents.tasksMap,
        chartConfig = chart.config,
        canvas = chart.getChildren('canvas')[0],
        container = dataset.getContainer('milestoneContainer'),
        parentContainer = canvas.getChildContainer('milestoneGroup'),
        dataLabelContainer = dataset.getContainer('milestoneLabelContainer'),
        visible = dataset.getState('visible'),
        animationManager = dataset.getFromEnv('animationManager'),
        removeDataArr = dataset.components.removeDataArr || [],
        removeDataArrLen = removeDataArr.length,
        dataObj,
        taskObj,
        graphics,
        config,
        eventArgs,
        taskConfigObj,
        setElementDummy,
        setElement,
        xPos,
        yPos,
        polypath,
        radius,
        i,
        ln,
        labelAttrs,
        showTooltip = chartConfig.showtooltip;

    if (!container) {
      container = dataset.addContainer('milestoneContainer', animationManager.setAnimation({
        el: 'group',
        attr: {
          name: 'milestone'
        },
        container: parentContainer,
        component: dataset
      }));
    }

    if (!visible) {
      container.hide();
    } else {
      container.show();
    }

    if (!dataLabelContainer) {
      dataLabelContainer = dataset.addContainer('milestoneLabelContainer', animationManager.setAnimation({
        el: 'group',
        attr: {
          name: 'labels'
        },
        container: parentContainer,
        component: dataset
      }));
    }

    if (!visible) {
      dataLabelContainer.hide();
    } else {
      dataLabelContainer.show();
    }

    ln = dataStore && dataStore.length;

    for (i = 0; i < ln; i += 1) {
      dataObj = dataStore[i];

      if (!dataObj) {
        continue;
      }

      config = dataObj.config;
      graphics = dataObj.graphics;
      taskObj = taskMap[config.taskId];
      !dataObj.graphics && (dataObj.graphics = {});
      setElementDummy = graphics.element;

      if (taskObj) {
        taskConfigObj = taskObj.config;
        eventArgs = config.eventArgs = {
          sides: config.sides,
          date: config.origDate,
          radius: config.radius,
          taskId: config.taskId,
          toolText: config.toolText,
          link: config.link,
          numSides: config.numSides
        };
        xPos = xAxis.getPixel(config.date.ms);
        yPos = taskConfigObj.yPos + taskConfigObj.height * 0.5;
        radius = (0, _lib.pluckNumber)(config.radius, taskConfigObj.height * 0.6);

        if ((0, _task.checkInvalidValue)(xPos, yPos, radius) === false) {
          continue;
        }

        polypath = [config.numSides, xPos, yPos, radius, config.startAngle, config.depth];
        setElement = graphics.element = animationManager.setAnimation({
          el: setElementDummy || 'polypath',
          label: 'polypath',
          attr: {
            polypath: polypath,
            fill: config.fillColor,
            'fill-opacity': config.fillAlpha,
            stroke: config.borderColor,
            'stroke-opacity': config.borderAlpha,
            groupId: 'gId' + i,
            cursor: config.link ? 'pointer' : _lib.BLANKSTRING,
            'stroke-width': config.borderThickness
          },
          component: dataset,
          container: container
        });
        setElement.on('fc-click', clickHandler(chart)).hover(rollOverHandler(chart), rollOutHandler(chart));
        setElement.show().data('eventArgs', eventArgs).data('dataObj', dataObj);

        if (showTooltip) {
          toolTipController.enableToolTip(setElement, config.toolText);
        } else {
          toolTipController.disableToolTip(setElement);
        }

        var milestoneConf = datasetConfigMilestones[i],
            yDiff = ((milestoneConf == null ? void 0 : milestoneConf.margintop) || 0) - ((milestoneConf == null ? void 0 : milestoneConf.marginbottom) || 0),
            xDiff = ((milestoneConf == null ? void 0 : milestoneConf.marginright) || 0) - ((milestoneConf == null ? void 0 : milestoneConf.marginleft) || 0);
        labelAttrs = config._labelAttrs || (config._labelAttrs = {});
        labelAttrs.x = xPos - +xDiff;
        labelAttrs.y = yPos + +yDiff;
        labelAttrs.text = config.displayValue;
        labelAttrs.groupId = 'gId' + i;
        labelAttrs.cursor = config.link ? 'pointer' : _lib.BLANKSTRING;
        labelAttrs.direction = chartConfig.textDirection;
        labelAttrs['text-anchor'] = MIDDLE;
        labelAttrs.fill = config.textColor;
      } else {
        setElementDummy && animationManager.setAnimation({
          el: setElementDummy,
          component: dataset,
          callback: _task.hideFn,
          doNotRemove: true
        });
      }
    }

    dataset.drawn ? dataset.drawLabel() : dataset.addJob('drawMilestoneLabels', dataset.drawLabel.bind(dataset), _schedular.priorityList.label);
    dataset.drawn = true;

    for (i = 0; i < removeDataArrLen; i++) {
      dataset._removeDataVisuals(removeDataArr.shift());
    }
  };

  return Milestone;
}(_task.default);

var _default = Milestone;
exports["default"] = _default;

/***/ }),

/***/ 1598:
/***/ ((__unused_webpack_module, exports) => {



exports.__esModule = true;
exports["default"] = void 0;
var _default = {
  'initial.dataset.task': function initialDatasetTask() {
    return {
      'rect.appearing': function rectAppearing(input) {
        return [{
          initialAttr: {
            width: 0
          },
          finalAttr: {
            width: input.attr.width
          },
          slot: 'middle'
        }];
      },
      'path.appearing': function pathAppearing(input) {
        var inputPath = input.attr.path,
            path = inputPath.slice(0, 3);
        return [{
          initialAttr: {
            path: path
          },
          finalAttr: {
            path: inputPath
          },
          slot: 'middle'
        }];
      }
    };
  }
};
exports["default"] = _default;

/***/ }),

/***/ 1597:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = exports.hideFn = exports.extractLabelStyle = exports.checkInvalidValue = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(596));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(598));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(273));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(288));

var _column = _interopRequireDefault(__webpack_require__(595));

var _lib = __webpack_require__(274);

var _dependencyManager = __webpack_require__(282);

var _task = _interopRequireDefault(__webpack_require__(1598));

var _schedular = __webpack_require__(286);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var UNDEF;
/**
   * function to check date format
   * @param {*} dateString date to be checked
   * @returns {boolean} true if it matches "MM/DD/YYYY HH:MM:SS" format
   */

function checkDateFormat(dateString) {
  // Regular expression to match "MM/DD/YYYY HH:MM:SS" format
  var dateFormat = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4} (0?[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/; // Check if the dateString matches the format

  if (dateFormat.test(dateString)) {
    return true; // Format is correct
  }

  return false; // Format is incorrect
}

;

var BLANK = '',
    MINIMUM_TASKBAR_WIDTH = 3,
    BOLD = 'bold',
    ITALIC = 'italic',
    NORMAL = 'normal',
    PROCESS = 'PROCESS_',
    ROLLOVER = 'DataPlotRollOver',
    ROLLOUT = 'DataPlotRollOut',
    DATAPLOTDRAGSTART = 'dataplotdragstart',
    DATAPLOTDRAGMOVE = 'dataplotdragmove',
    EVENTARGS = _lib.preDefStr.EVENTARGS,
    CANVASLEFTPADDING = 1.5,
    align = {
  left: 'start',
  right: 'end',
  center: 'middle'
},
    xAlign = {
  left: 0,
  right: 1,
  center: 0.5,
  'undefined': 0.5
},
    alignGutter = {
  left: 5,
  right: -5,
  center: 0,
  'undefined': 0
},
    stylePropValues = {
  fontWeight: [NORMAL, BOLD],
  fontStyle: [NORMAL, ITALIC]
},
    hideFn = function hideFn() {
  this.hide();
},

/**
 * Checks if an object is defined or null.
 * @param {Object} obj The oject to be checked
 * @return {booleam} Whether the object was null or undefined
 */
defined = function defined(obj) {
  return obj !== UNDEF && obj !== null;
},

/**
 * Extracts the label styles from a given style object.
 * @param {Object} styleObj The style object from which to extract the styles.
 *
 * @return {Object} The extracted style.
 */
extractLabelStyle = function extractLabelStyle(styleObj) {
  var style, prop;

  for (prop in styleObj) {
    if (styleObj[prop] !== UNDEF) {
      style = style || {};

      switch (prop) {
        case 'fontWeight':
        case 'fontStyle':
          style[prop] = stylePropValues[prop][styleObj[prop]];
          break;

        default:
          style[prop] = styleObj[prop];
      }
    }
  }

  return style;
},

/**
 * Checks if a given string is a percentage value or not.
 * @param {string} str The string to be checked
 * @return {boolean} Indicates whether the input is a string.
 */
isPercent = function isPercent(str) {
  return /%/g.test(str);
},
    checkInvalidValue = function checkInvalidValue() {
  var i = 0,
      ii = arguments.length,
      allValuesValid = false,
      val;

  for (i = 0; i < ii; i++) {
    val = arguments[i];

    if (isNaN(val)) {
      return false;
    }

    allValuesValid = true;
  }

  return allValuesValid;
};

exports.checkInvalidValue = checkInvalidValue;
exports.extractLabelStyle = extractLabelStyle;
exports.hideFn = hideFn;
(0, _dependencyManager.addDep)({
  name: 'taskAnimation',
  type: 'animationRule',
  extension: _task.default
});
/**
 * Defines a Task dataset for a Gantt chart.
 */

var Task = /*#__PURE__*/function (_Column) {
  (0, _inheritsLoose2.default)(Task, _Column);

  /**
   * Creates an instance of Task. Instatiates an empty components object within it.
   * @memberof Task
   */
  function Task() {
    var _this;

    _this = _Column.call(this) || this;
    _this.components = {};
    return _this;
  }
  /**
   * Gets the name of the component
   * @return {string} name
   */


  var _proto = Task.prototype;

  _proto.getName = function getName() {
    return 'task';
  }
  /**
   * Sets the default configurations of the dataset
   */
  ;

  _proto.__setDefaultConfig = function __setDefaultConfig() {
    _Column.prototype.__setDefaultConfig.call(this);

    var config = this.config; // configurations with default values

    config.showpercentlabel = UNDEF;
    config.showlabels = UNDEF;
    config.showborder = 1;
    config.borderthickness = 1; // inherited from parent

    config.font = _lib.BLANKSTRING;
    config.fontcolor = _lib.BLANKSTRING;
    config.fontsize = _lib.BLANKSTRING;
    config.color = _lib.BLANKSTRING;
    config.alpha = _lib.HUNDREDSTRING;
    config.angle = 270;
    config.slackfillcolor = UNDEF;
    config.borderalpha = _lib.HUNDREDSTRING;
    config.hoverfillcolor = _lib.BLANKSTRING;
    config.slackhoverfillalpha = _lib.HUNDREDSTRING;
    config.showstartdate = UNDEF;
    config.showenddate = UNDEF;
  }
  /**
   * Parses and configures the dataset according to the data given by the user.
   */
  ;

  _proto.configureAttributes = function configureAttributes() {
    var dataset = this,
        jsonData = dataset.getFromEnv('dataSource'),
        userConfig = (0, _lib.extend2)({}, jsonData.tasks && jsonData.tasks.length ? jsonData.tasks[0] : jsonData.tasks || {});
    (0, _lib.parseConfiguration)(userConfig, dataset.config, dataset.getFromEnv('chart').config, {
      task: true
    });

    if (!dataset.components) {
      dataset.components = {};
    }

    dataset.config.hoverfillalpha = (0, _lib.pluckNumber)(userConfig.hoverfillalpha, dataset.getFromEnv('chart').config.taskhoverfillalpha, _lib.HUNDREDSTRING);

    dataset._setConfigure();

    dataset.setState('dirty', true);
  }
  /**
   * Configures each data of the dataset
   *
   * @param {Array} newDataset The new dataset, if any
   */
  ;

  _proto._setConfigure = function _setConfigure(newDataset) {
    var dataset = this,
        datasetConfig = dataset.config,
        chart = dataset.getFromEnv('chart'),
        yAxis = chart.getChildren('yAxis')[0],
        axisConfig = yAxis.config,
        jsonData = dataset.getFromEnv('dataSource'),
        chartAttrs = jsonData.chart,
        JSONData = jsonData.tasks && jsonData.tasks.length ? jsonData.tasks[0] : jsonData.tasks || {},
        setDataArr = newDataset || JSONData.length ? JSONData : JSONData.task,
        setDataLen = setDataArr && setDataArr.length,
        colorM = dataset.getFromEnv('color-manager'),
        chartConfig = chart.config,
        numberFormatter = dataset.getFromEnv('number-formatter'),
        // taskRadius = chartConfig.taskbarroundradius,
    taskMix = chartConfig.taskbarfillmix,
        taskRatio = chartConfig.taskbarfillratio,
        showSlackAsFill = chartConfig.showslackasfill,
        dataStore = dataset.components.data,
        percentComplete,
        eDate,
        sDate,
        i,
        processMap = axisConfig.processes.processMap,
        processes = axisConfig.processes.process.process,
        processName,
        arrColor,
        arrAlpha,
        arrRatio,
        dataLabel,
        dInt = chartConfig.dateintooltip,
        dataObj,
        taskObj,
        alignVal = {
      right: 'right',
      left: 'left',
      'undefined': 'center',
      'center': 'center'
    },
        id,
        tAlpha,
        tBorderAlpha,
        tBorderColor,
        label,
        color,
        fillAngle,
        showPercentLabel,
        tasksMap = chart.components.tasksMap = {},
        inCanStyle = chartConfig.style.inCanvasStyle,
        toolText,
        slHovColor,
        slColor,
        tColorObj,
        tHovColor,
        tHovBorderColor,
        taskId,
        dataConfig,
        showtooltip = (0, _lib.pluckNumber)(chartAttrs.showtooltip, 1),
        dataLabelStyle = chartConfig.dataLabelStyle,
        datasetLabelStyle,
        setLabelStyle;

    if (!dataStore) {
      dataStore = dataset.components.data = [];
    }

    datasetConfig.showlabels = (0, _lib.pluck)(JSONData.showlabels, JSONData.showlabels, JSONData.showname, chartAttrs.showtasklabels, chartAttrs.showtasknames, 0);
    datasetConfig.showTextOutline = (0, _lib.pluckNumber)(chartAttrs.textoutline, 0); // congfigure prop for allowDrag functionality

    datasetConfig.allowDrag = (0, _lib.pluckNumber)(chartAttrs.allowdrag, 0);
    datasetLabelStyle = datasetConfig.labelStyle = extractLabelStyle({
      fontSize: datasetConfig.fontSize,
      fontFamily: datasetConfig.font
    });
    (0, _lib.setLineHeight)(datasetConfig.labelStyle); // Tasks

    if (setDataLen) {
      // dmin = Infinity;
      // dmax = -Infinity;
      for (i = 0; i < setDataLen; i += 1) {
        taskObj = setDataArr[i];
        id = (0, _lib.pluck)(taskObj.processid);

        if (id && typeof id === 'string') {
          id = id.toLowerCase();
        }

        taskId = taskObj.id;
        percentComplete = taskObj.percentcomplete;
        tAlpha = (0, _lib.pluckNumber)(taskObj.alpha, datasetConfig.alpha);
        color = (0, _lib.pluck)(taskObj.color, datasetConfig.color, colorM.getColor('plotFillColor'));
        tBorderAlpha = (0, _lib.pluckNumber)(taskObj.borderalpha, datasetConfig.borderalpha, '100');
        tBorderColor = (0, _lib.pluck)(taskObj.bordercolor, datasetConfig.bordercolor, colorM.getColor('plotBorderColor'));
        label = (0, _lib.getFirstValue)((0, _lib.pluck)(taskObj.label, taskObj.name), BLANK); // Parse the task color, ratio & alpha

        arrColor = colorM.parseColorMix(color, taskMix);
        arrAlpha = colorM.parseAlphaList(tAlpha.toString(), arrColor.length);
        arrRatio = colorM.parseRatioList(taskRatio, arrColor.length);
        fillAngle = (0, _lib.pluckNumber)(taskObj.angle, datasetConfig.angle);
        dataObj = dataStore[i] || (dataStore[i] = {
          config: {}
        });
        dataConfig = dataObj.config;
        dataConfig.index = i;
        dataConfig.link = taskObj.link; // Process id should be PROCESS_index

        dataConfig.processId = (0, _lib.pluck)(id, PROCESS + i); // dataConfig.style = {
        //     fontSize: pluckNumber (taskObj.fontsize, datasetConfig.fontsize,
        //         inCanStyle.fontSize) + PX,
        //     fontFamily: pluck (taskObj.font, datasetConfig.font,
        //         inCanStyle.fontFamily)
        // };

        dataConfig.textColor = (0, _lib.getFirstColor)((0, _lib.pluck)(taskObj.fontcolor, datasetConfig.fontcolor, inCanStyle.color));
        dataConfig.textFont = (0, _lib.pluck)(taskObj.font, datasetConfig.font, inCanStyle.fontFamily);
        dataConfig.textFontSize = (0, _lib.pluckNumber)(taskObj.fontsize, datasetConfig.fontsizes, inCanStyle.fontSize); // RED-8910 fix for font size

        if (!taskObj.fontsize && chartConfig.dataLabelStyle) {
          taskObj.fontsize = chartConfig.dataLabelStyle.fontSize;
        }

        dataConfig.style = extractLabelStyle({
          fontSize: taskObj.fontsize,
          fontFamily: taskObj.font
        });
        (0, _lib.setLineHeight)(dataConfig.style);
        setLabelStyle = dataConfig.style;
        dataConfig.lineHeight = (0, _lib.pluck)(setLabelStyle && setLabelStyle.lineHeight, datasetLabelStyle && datasetLabelStyle.lineHeight, dataLabelStyle && dataLabelStyle.lineHeight);
        dataConfig.startMs = numberFormatter.getDateValue(taskObj.start).ms;
        dataConfig.endMs = numberFormatter.getDateValue(taskObj.end).ms;
        sDate = numberFormatter.getFormattedDate(dataConfig.startMs, chartAttrs.dateformat);
        eDate = numberFormatter.getFormattedDate(dataConfig.endMs, chartAttrs.dateformat);
        dataConfig.tAlpha = tAlpha;
        dataConfig.tBorderColor = tBorderColor;
        dataConfig.tBorderAlpha = tBorderAlpha;
        dataLabel = BLANK;
        dataConfig.percentComplete = percentComplete = Math.min((0, _lib.pluckNumber)(taskObj.percentcomplete, -1), 100);
        dataConfig.labelAlign = alignVal[[(0, _lib.pluck)(taskObj.labelalign, chartConfig.tasklabelsalign).toLowerCase()]];
        dataConfig.showAsGroup = (0, _lib.pluckNumber)(taskObj.showasgroup, 0);
        showPercentLabel = dataConfig.showPercentLabel = (0, _lib.pluckNumber)(taskObj.showpercentlabel, datasetConfig.showpercentlabel);

        if ((0, _lib.pluckNumber)(taskObj.showlabel, taskObj.showname, datasetConfig.showlabels)) {
          dataLabel = label;
        }

        if (showPercentLabel && percentComplete !== -1) {
          dataLabel += ' ' + percentComplete + '%';
        }

        dataConfig.percentComplete = percentComplete;
        tColorObj = {
          FCcolor: {
            color: arrColor.join(),
            alpha: arrAlpha,
            ratio: arrRatio,
            angle: fillAngle
          }
        };
        slColor = colorM.parseColorMix((0, _lib.pluck)(taskObj.slackfillcolor, datasetConfig.slackfillcolor, chartConfig.slackfillcolor), taskMix);
        slColor = showSlackAsFill ? {
          FCcolor: {
            color: slColor.join(),
            alpha: arrAlpha,
            ratio: arrRatio,
            angle: fillAngle
          }
        } : _lib.TRACKER_FILL;
        tHovColor = {
          FCcolor: {
            color: colorM.parseColorMix((0, _lib.pluck)(taskObj.hoverfillcolor, datasetConfig.hoverfillcolor, chartConfig.taskhoverfillcolor, (0, _lib.getDarkColor)(color, 80)), taskMix).join(),
            alpha: colorM.parseAlphaList((0, _lib.pluck)(taskObj.hoverfillalpha, datasetConfig.hoverfillalpha).toString(), arrColor.length),
            ratio: arrRatio,
            angle: fillAngle
          }
        };
        tHovBorderColor = (0, _lib.convertColor)((0, _lib.pluck)(taskObj.hoverbordercolor, datasetConfig.hoverbordercolor, (0, _lib.getDarkColor)(tBorderColor, 80)), (0, _lib.pluck)(taskObj.hoverborderalpha, datasetConfig.hoverborderalpha, tBorderAlpha));
        slHovColor = showSlackAsFill ? {
          FCcolor: {
            color: colorM.parseColorMix((0, _lib.getDarkColor)((0, _lib.pluck)(taskObj.slackhoverfillcolor, datasetConfig.slackhoverfillcolor, chartConfig.slackfillcolor), 80), taskMix).join(),
            alpha: colorM.parseAlphaList((0, _lib.pluck)(taskObj.slackhoverfillalpha, datasetConfig.slackhoverfillalpha, '100').toString(), arrColor.length),
            ratio: arrRatio,
            angle: fillAngle
          }
        } : _lib.TRACKER_FILL;
        dataConfig.color = (0, _lib.toRaphaelColor)(tColorObj);
        dataConfig.rawTaskColor = color;
        dataConfig.rawTaskAlpha = tAlpha;
        dataConfig.slackColor = (0, _lib.toRaphaelColor)(slColor);
        dataConfig.hoverFillColor = (0, _lib.toRaphaelColor)(tHovColor);
        dataConfig.hoverBorderColor = tHovBorderColor;
        dataConfig.slackHoverColor = (0, _lib.toRaphaelColor)(slHovColor);
        dataConfig.showHoverEffect = (0, _lib.pluckNumber)(taskObj.showhovereffect, datasetConfig.showhovereffect, chartAttrs.showhovereffect, 1);
        dataConfig.taskHeight = (0, _lib.pluck)(taskObj.height, '35%');
        dataConfig.topPadding = (0, _lib.pluck)(taskObj.toppadding, '35%');
        dataConfig.showPercentLabel = showPercentLabel;
        dataConfig.endDate = (0, _lib.pluckNumber)(taskObj.showenddate, datasetConfig.showenddate) ? eDate : UNDEF;
        dataConfig._endDate = eDate;
        dataConfig.startDate = (0, _lib.pluckNumber)(taskObj.showstartdate, datasetConfig.showstartdate) ? sDate : UNDEF;
        dataConfig._startDate = sDate;
        dataConfig.shadow = {
          opacity: Math.max(tAlpha, tBorderAlpha) / 100,
          inverted: true
        };
        dataConfig.id = id;
        dataConfig.taskId = taskId;
        dataConfig.borderColor = (0, _lib.convertColor)(tBorderColor, tBorderAlpha);
        dataConfig.borderThickness = (0, _lib.pluckNumber)(taskObj.showborder, datasetConfig.showborder) ? (0, _lib.pluckNumber)(taskObj.borderthickness, datasetConfig.borderthickness) : 0;
        toolText = (0, _lib.getValidValue)((0, _lib.parseUnsafeString)((0, _lib.pluck)(taskObj.tooltext, datasetConfig.hovertext, datasetConfig.plottooltext, chartAttrs.plottooltext), false));

        if (showtooltip) {
          if (toolText !== UNDEF) {
            if (processMap[id]) {
              // take process name using the processMap(stores a map for processId and process Name)
              processName = processMap[id].catObj.label || processMap[id].catObj.name;
            } else {
              processName = processes[i] && (processes[i].label || processes[i].name);
            }

            toolText = (0, _lib.parseTooltext)(toolText, [3, 28, 29, 30, 31], {
              end: numberFormatter.getFormattedDate(dataConfig.endMs, chartAttrs.outputdateformat),
              start: numberFormatter.getFormattedDate(dataConfig.startMs, chartAttrs.outputdateformat),
              label: label,
              percentComplete: percentComplete !== -1 ? numberFormatter.percentValue(percentComplete) : BLANK,
              processName: processName
            }, datasetConfig);
          } else {
            toolText = (label !== BLANK ? label + (dInt ? ', ' : BLANK) : BLANK) + (dInt ? numberFormatter.getFormattedDate(dataConfig.startMs, chartAttrs.outputdateformat) + ' - ' + numberFormatter.getFormattedDate(dataConfig.endMs, chartAttrs.outputdateformat) : BLANK);
          }
        }

        dataConfig.label = dataLabel;
        dataConfig.toolText = toolText;
        typeof taskId === 'string' && (taskId = taskId.toLowerCase());

        if (taskId !== UNDEF) {
          tasksMap[taskId] = dataStore[i];
        }
      }
    }

    if ((0, _lib.pluckNumber)(JSONData.visible, 1)) {
      dataset.setState('visible', true);
    } else {
      dataset.setState('visible', false);
    }
  };

  _proto._getParentToolTextOnDrag = function _getParentToolTextOnDrag(startMs, endMs, parentConfig) {
    var _dataSource$tasks$, _dataSource$tasks;

    var element = this,
        data = element.data('drag-options'),
        dataset = data.dataset,
        dataSource = dataset.getFromEnv('dataSource'),
        chartAttr = dataSource.chart,
        task = Array.isArray(dataSource == null ? void 0 : dataSource.tasks) ? dataSource == null ? void 0 : (_dataSource$tasks$ = dataSource.tasks[0]) == null ? void 0 : _dataSource$tasks$.task : dataSource == null ? void 0 : (_dataSource$tasks = dataSource.tasks) == null ? void 0 : _dataSource$tasks.task,
        index = parentConfig.index,
        taskObj = task[index],
        label = (0, _lib.getFirstValue)((0, _lib.pluck)(taskObj.label, taskObj.name), BLANK),
        chartConfig = dataset.getFromEnv('chartConfig'),
        // eslint-disable-next-line good-practices/no-static-strings-in-scope
    toolText = '',
        numberFormatter = dataset.getFromEnv('number-formatter'),
        dInt = chartConfig.dateintooltip;
    toolText = (label !== BLANK ? label + (dInt ? ', ' : BLANK) : BLANK) + (dInt ? numberFormatter.getFormattedDate(startMs, chartAttr.outputdateformat) + ' - ' + numberFormatter.getFormattedDate(endMs, chartAttr.outputdateformat) : BLANK);
    return toolText;
  };

  _proto._checkUpdatedTaskWidth = function _checkUpdatedTaskWidth(startMs, endMs) {
    var element = this,
        data = element.data('drag-options'),
        dataset = data.dataset,
        chart = dataset.getFromEnv('chart'),
        xAxis = chart.getChildren('xAxis')[0],
        chartConfig = chart.config,
        viewPortConfig = chartConfig.viewPortConfig,
        x = viewPortConfig.x,
        scaleX = viewPortConfig.scaleX,
        xPos = xAxis.getPixel(startMs) + x * scaleX,
        endX = xAxis.getPixel(endMs) + x * scaleX,
        width = Math.round(endX - xPos);
    return MINIMUM_TASKBAR_WIDTH < width;
  }
  /**
   * Callback function when dragging of a node is started
   * @param {Object} event The actual event object
   */
  ;

  _proto.dragStartWidthHandler = function dragStartWidthHandler(event) {
    var ele = this,
        data = ele.data('drag-options'),
        dataset = data.dataset;

    dataset._dragStartWidthHandler.call(ele, event);
  }
  /**
     * Helper function of dragStart()
     * @param {Object} e The actual event object
     */
  ;

  _proto._dragStartWidthHandler = function _dragStartWidthHandler() {
    var _dataSource$tasks$2, _dataSource$tasks2;

    var element = this,
        data = element.data('drag-options'),
        dataObj = data.dataObj,
        dataGraphics = dataObj.graphics,
        ele = dataGraphics.element,
        bBox = ele.getBBox(),
        config = dataObj.config,
        dataset = data.dataset,
        dataSource = dataset.getFromEnv('dataSource'),
        chartAttr = dataSource.chart,
        numberFormatter = dataset.getFromEnv('number-formatter'),
        chart = dataset.getFromEnv('chart'),
        task = Array.isArray(dataSource == null ? void 0 : dataSource.tasks) ? dataSource == null ? void 0 : (_dataSource$tasks$2 = dataSource.tasks[0]) == null ? void 0 : _dataSource$tasks$2.task : dataSource == null ? void 0 : (_dataSource$tasks2 = dataSource.tasks) == null ? void 0 : _dataSource$tasks2.task,
        index = config == null ? void 0 : config.index,
        taskObj = task[index],
        sourceEvent = DATAPLOTDRAGSTART,
        dragStart = config.dragStart || (config.dragStart = {}),
        dragData = config.dragData || (config.dragData = {}),
        eventArgs,
        taskbarElement = data.taskbarElement,
        direction = data.direction; // Storing taskbar positions temporarily, will be cleared on drag-end

    data.tempStartMs = dataObj.startMs;
    data.tempEndMs = dataObj.endMs;
    dragStart.xPos = direction === 'left' ? config.xPos : config.xPos + taskbarElement.attrs.width;
    dragStart.x = config.xPos;
    dragStart.bBox = bBox;
    var dateFormat = checkDateFormat(taskObj.start);
    dragData.prevStartDate = numberFormatter.getFormattedDate(config.startMs, dateFormat ? 'mm/dd/yyyy hh:mn:ss' : chartAttr.dateformat);
    dragData.prevEndDate = numberFormatter.getFormattedDate(config.endMs, dateFormat ? 'mm/dd/yyyy hh:mn:ss' : chartAttr.dateformat); // store original x, y positions

    dragStart.origX = dragStart.lastDx || (dragStart.lastDx = 0);
    eventArgs = ele.data(EVENTARGS); // Whether to fire the click event ot not

    chart.fireChartInstanceEvent(sourceEvent, eventArgs);
  }
  /**
  * Callback function when a node is being dragged
  * @param {Object} event The actual event object
  * @param {Object} customData Object containing the details related to drag coordinates
  */
  ;

  _proto.dragMoveWidthHandler = function dragMoveWidthHandler(event, customData) {
    // eslint-disable-line no-unused-vars
    var ele = this,
        data = ele.data('drag-options'),
        dataset = data.dataset,
        dx = customData[0],
        dy = customData[1],
        px = customData[2],
        py = customData[3];

    dataset._dragMoveWidthHandler.call(ele, dx, dy, px, py);
  }
  /**
   * Helper function of dragMove()
   * @param {number} dxVal the drag coordinates
   * @param {number} dyVal the drag coordinates
   * @param {number} px the drag coordinates
   * @param {number} py the drag coordinates
   */
  ;

  _proto._dragMoveWidthHandler = function _dragMoveWidthHandler(dxVal) {
    var _dataSource$tasks$3, _dataSource$tasks3, _dataObj$config, _dataSource$connector;

    var element = this,
        dx = dxVal,
        i,
        canvasPadding = CANVASLEFTPADDING,
        data = element.data('drag-options'),
        dataObj = data.dataObj,
        taskbarElement = data.taskbarElement,
        direction = data.direction,
        dataset = data.dataset,
        datasetConfig = dataset.config,
        dataSource = dataset.getFromEnv('dataSource'),
        chartAttr = dataSource.chart,
        task = Array.isArray(dataSource == null ? void 0 : dataSource.tasks) ? dataSource == null ? void 0 : (_dataSource$tasks$3 = dataSource.tasks[0]) == null ? void 0 : _dataSource$tasks$3.task : dataSource == null ? void 0 : (_dataSource$tasks3 = dataSource.tasks) == null ? void 0 : _dataSource$tasks3.task,
        chart = dataset.getFromEnv('chart'),
        tasksMap = chart.components.tasksMap,
        numberFormatter = dataset.getFromEnv('number-formatter'),
        yAxis = dataset.getFromEnv('yAxis'),
        xAxis = dataset.getFromEnv('xAxis'),
        processMap = xAxis.config.processes.processMap,
        dataStore = dataset.components.data,
        ele = dataObj.graphics.element,
        config = dataObj.config,
        id = config.id,
        index = config == null ? void 0 : config.index,
        taskObj = task[index],
        label = (0, _lib.getFirstValue)((0, _lib.pluck)(taskObj.label, taskObj.name), BLANK),
        percentComplete = Math.min((0, _lib.pluckNumber)(taskObj.percentcomplete, -1), 100),
        dragStart = config.dragStart,
        dragData = config.dragData,
        startX = dragStart.bBox.x + dx,
        endX = dragStart.bBox.x2 + dx,
        chartConfig = dataset.getFromEnv('chartConfig'),
        canvasLeft = chartConfig.canvasLeft,
        // eslint-disable-next-line good-practices/no-static-strings-in-scope
    toolText = '',
        processName,
        canvasRight = yAxis.getPixel(chartConfig.scrollOptions.viewPortMax),
        dInt = chartConfig.dateintooltip,
        len,
        viewPortScale,
        setObj;
    var prevElement, dateFormat, nextElement, nextElConfig, nextElData;
    /**  adjust canvasPixel if scrolltoDate is added */

    if (chartConfig.scrolltodate) {
      viewPortScale = chartConfig.viewPortConfig.scaleX * chartConfig.viewPortConfig.x;
      canvasLeft = canvasLeft + viewPortScale;
      canvasRight = canvasRight + viewPortScale;
    } // Edge case when taskbar is fit to canvas width


    var isTaskbarFitToWidth = Math.sign(canvasRight - canvasLeft - (dragStart.bBox.x2 - dragStart.bBox.x)) === -1;

    if (startX < canvasLeft && !isTaskbarFitToWidth && direction === 'left' && Math.sign(dxVal) === -1) {
      dx += canvasLeft + canvasPadding - startX;
    }

    if (endX > canvasRight && !isTaskbarFitToWidth && direction === 'right' && Math.sign(dxVal) === 1) {
      dx -= endX - canvasRight;
    }

    if (dx) {
      ele.data('fire_click_event', 0);
    }

    if (taskObj) {
      toolText = (0, _lib.getValidValue)((0, _lib.parseUnsafeString)((0, _lib.pluck)(taskObj.tooltext, datasetConfig.hovertext, datasetConfig.plottooltext, chartAttr.plottooltext), false));

      if (toolText !== UNDEF) {
        if (id && processMap[id]) {
          processName = processMap[id].catObj.label || processMap[id].catObj.name;
        }

        toolText = (0, _lib.parseTooltext)(toolText, [3, 28, 29, 30, 31], {
          end: numberFormatter.getFormattedDate(dataObj.config.endMs, chartAttr.outputdateformat),
          start: numberFormatter.getFormattedDate(dataObj.config.startMs, chartAttr.outputdateformat),
          label: label,
          percentComplete: percentComplete !== -1 ? numberFormatter.percentValue(percentComplete) : BLANK,
          processName: processName
        }, dataset.config);
      } else {
        toolText = (label !== BLANK ? label + (dInt ? ', ' : BLANK) : BLANK) + (dInt ? numberFormatter.getFormattedDate(dataObj.config.startMs, chartAttr.outputdateformat) + ' - ' + numberFormatter.getFormattedDate(dataObj.config.endMs, chartAttr.outputdateformat) : BLANK);
      }
    }

    dragStart.lastDx = dx;
    dateFormat = checkDateFormat(taskObj.start);

    if (direction === 'left') {
      var _arrayOfAdjacentEleme, _nextElData, _nextElData$graphics, _arrayOfAdjacentEleme2, _arrayOfAdjacentEleme3, _task$nextElConfig$in;

      // width constrain
      if (Math.sign(dxVal) === 1 && dataObj.graphics.element.attrs.width === MINIMUM_TASKBAR_WIDTH) return; // allow drag overlap

      var arrayOfAdjacentElements = Object.values(tasksMap).filter(function (a) {
        return a.graphics.element.attrs.y === taskbarElement.attrs.y;
      }).sort(function (a, b) {
        return a.graphics.element.attrs.x - b.graphics.element.attrs.x;
      }),
          currentElIndex = arrayOfAdjacentElements == null ? void 0 : arrayOfAdjacentElements.findIndex(function (x, elIndex) {
        var _task$elIndex;

        return x.graphics.element.attrs.y === taskbarElement.attrs.y && x.graphics.element.attrs.x === taskbarElement.attrs.x && ((_task$elIndex = task[elIndex]) == null ? void 0 : _task$elIndex.label) !== 'Delay';
      });
      nextElData = arrayOfAdjacentElements[currentElIndex + 1];
      nextElConfig = (_arrayOfAdjacentEleme = arrayOfAdjacentElements[currentElIndex + 1]) == null ? void 0 : _arrayOfAdjacentEleme.config;
      nextElement = (_nextElData = nextElData) == null ? void 0 : (_nextElData$graphics = _nextElData.graphics) == null ? void 0 : _nextElData$graphics.element;
      prevElement = (_arrayOfAdjacentEleme2 = arrayOfAdjacentElements[currentElIndex - 1]) == null ? void 0 : (_arrayOfAdjacentEleme3 = _arrayOfAdjacentEleme2.graphics) == null ? void 0 : _arrayOfAdjacentEleme3.element;
      if (Math.sign(dxVal) === 1 && nextElement && nextElConfig && ((_task$nextElConfig$in = task[nextElConfig.index]) == null ? void 0 : _task$nextElConfig$in.label) === 'Delay' && dataObj.graphics.element.attrs.width === nextElement.attrs.width + 1) return;
      dataObj.config.startMs = yAxis.getDraggedValue(dragStart.xPos + dragStart.lastDx); // if drag is moved beyond the constrain brought back to prev element end point.

      if (!chartAttr.allowtaskbaroverlap && Math.sign(dxVal) === -1 && prevElement && prevElement.attrs.x + prevElement.attrs.width >= element.attrs.x && prevElement.attrs.y === element.attrs.y) {
        dataObj.config.startMs = yAxis.getDraggedValue(prevElement.attrs.x + prevElement.attrs.width);
      }

      if (dragData.updatedStartDate !== numberFormatter.getFormattedDate(dataObj.config.startMs, dateFormat ? 'mm/dd/yyyy hh:mn:ss' : chartAttr.dateformat)) {
        var dragDataCopy = JSON.parse(JSON.stringify(dragData));
        chart.fireChartInstanceEvent(DATAPLOTDRAGMOVE, dragDataCopy);
      }

      dragData.updatedStartDate = numberFormatter.getFormattedDate(dataObj.config.startMs, dateFormat ? 'mm/dd/yyyy hh:mn:ss' : chartAttr.dateformat);
      taskObj.start = dragData.updatedStartDate;
      dragData.updatedEndDate = dragData.prevEndDate; // drag Parent group elements when child element is dragged

      if ((taskObj == null ? void 0 : taskObj.showasgroup) === '0' && dataset._checkUpdatedTaskWidth.call(element, yAxis.getDraggedValue(dataObj.config.dragStart.xPos + dataObj.config.dragStart.lastDx - dataObj.graphics.element.attrs.width), dataObj.config.endMs, i)) {
        if (taskObj.processid.includes('.1')) {
          var matchingParentTask = dataset.components.data.find(function (t) {
            return t.config.processId + ".1" === taskObj.processid;
          }),
              firstChildTask = tasksMap[matchingParentTask.config.processId + "-a"],
              secondChildTask = tasksMap[matchingParentTask.config.processId + "-b"];

          if (secondChildTask.config.startMs < firstChildTask.config.startMs) {
            matchingParentTask.config._startDate = secondChildTask.config._startDate;
            matchingParentTask.config.startMs = secondChildTask.config.startMs;
          } else {
            matchingParentTask.config._startDate = dragData.updatedStartDate;
            matchingParentTask.config.startMs = dataObj.config.startMs;
          }

          if (secondChildTask.config.endMs < firstChildTask.config.endMs) {
            matchingParentTask.config._endDate = dragData.updatedEndDate;
            matchingParentTask.config.endMs = dataObj.config.endMs;
          } else {
            matchingParentTask.config._endDate = secondChildTask.config._endDate;
            matchingParentTask.config.endMs = secondChildTask.config.endMs;
          }

          matchingParentTask.config.toolText = dataset._getParentToolTextOnDrag.call(element, matchingParentTask.config.startMs, matchingParentTask.config.endMs, matchingParentTask.config);
          dataset.parsePlotAttributes(matchingParentTask, i - 1);
        }

        if (taskObj.processid.includes('.2')) {
          var _matchingParentTask = dataset.components.data.find(function (t) {
            return t.config.processId + ".2" === taskObj.processid;
          }),
              _firstChildTask = tasksMap[_matchingParentTask.config.processId + "-a"],
              _secondChildTask = tasksMap[_matchingParentTask.config.processId + "-b"];

          if (_secondChildTask.config.endMs < _firstChildTask.config.endMs) {
            _matchingParentTask.config._endDate = _firstChildTask.config._endDate;
            _matchingParentTask.config.endMs = _firstChildTask.config.endMs;
          } else {
            _matchingParentTask.config._endDate = dragData.updatedEndDate;
            _matchingParentTask.config.endMs = dataObj.config.endMs;
          }

          if (_secondChildTask.config.startMs < _firstChildTask.config.startMs) {
            _matchingParentTask.config._startDate = dragData.updatedStartDate;
            _matchingParentTask.config.startMs = dataObj.config.startMs;
          } else {
            _matchingParentTask.config._startDate = _firstChildTask.config._startDate;
            _matchingParentTask.config.startMs = _firstChildTask.config.startMs;
          }

          _matchingParentTask.config.toolText = dataset._getParentToolTextOnDrag.call(element, _matchingParentTask.config.startMs, _matchingParentTask.config.endMs, _matchingParentTask.config);
          dataset.parsePlotAttributes(_matchingParentTask, i - 2);
        }
      }
    } else if (direction === 'right') {
      var _arrayOfAdjacentEleme4, _nextElData2, _nextElData2$graphics, _task$nextElConfig$in2, _task$nextElConfig$in3;

      // width constrain
      if (Math.sign(dxVal) === -1 && dataObj.graphics.element.attrs.width === MINIMUM_TASKBAR_WIDTH) return; // allow drag overlap

      var _arrayOfAdjacentElements = Object.values(tasksMap).filter(function (a) {
        return a.graphics.element.attrs.y === taskbarElement.attrs.y;
      }).sort(function (a, b) {
        return a.graphics.element.attrs.x - b.graphics.element.attrs.x;
      }),
          _currentElIndex = _arrayOfAdjacentElements == null ? void 0 : _arrayOfAdjacentElements.findIndex(function (x, elIndex) {
        var _task$elIndex2;

        return x.graphics.element.attrs.y === taskbarElement.attrs.y && x.graphics.element.attrs.x === taskbarElement.attrs.x && ((_task$elIndex2 = task[elIndex]) == null ? void 0 : _task$elIndex2.label) !== 'Delay';
      });

      nextElData = _arrayOfAdjacentElements[_currentElIndex + 1];
      nextElConfig = (_arrayOfAdjacentEleme4 = _arrayOfAdjacentElements[_currentElIndex + 1]) == null ? void 0 : _arrayOfAdjacentEleme4.config;
      nextElement = (_nextElData2 = nextElData) == null ? void 0 : (_nextElData2$graphics = _nextElData2.graphics) == null ? void 0 : _nextElData2$graphics.element;
      if (Math.sign(dxVal) === -1 && nextElement && nextElConfig && ((_task$nextElConfig$in2 = task[nextElConfig.index]) == null ? void 0 : _task$nextElConfig$in2.label) === 'Delay' && dataObj.graphics.element.attrs.width === nextElement.attrs.width + 1) return;
      dataObj.config.endMs = yAxis.getDraggedValue(dragStart.xPos + dragStart.lastDx);

      if (nextElement && nextElConfig && ((_task$nextElConfig$in3 = task[nextElConfig.index]) == null ? void 0 : _task$nextElConfig$in3.label) === 'Delay') {
        nextElConfig.endMs = dataObj.config.endMs;
        nextElConfig.startMs = yAxis.getDraggedValue(dragStart.xPos + dragStart.lastDx - nextElement.attrs.width);
        dataset.parsePlotAttributes(nextElData, i + 1);
      } else if (!chartAttr.allowtaskbaroverlap && Math.sign(dxVal) === 1 && nextElement && element.attrs.x + element.attrs.width >= nextElement.attrs.x && nextElement.attrs.y === element.attrs.y) {
        dataObj.config.endMs = yAxis.getDraggedValue(nextElement.attrs.x);
      }

      if (dragData.updatedEndDate !== numberFormatter.getFormattedDate(dataObj.config.endMs, dateFormat ? 'mm/dd/yyyy hh:mn:ss' : chartAttr.dateformat)) {
        var _dragDataCopy = JSON.parse(JSON.stringify(dragData));

        chart.fireChartInstanceEvent(DATAPLOTDRAGMOVE, _dragDataCopy);
      }

      dragData.updatedStartDate = dragData.prevStartDate;
      dragData.updatedEndDate = numberFormatter.getFormattedDate(dataObj.config.endMs, dateFormat ? 'mm/dd/yyyy hh:mn:ss' : chartAttr.dateformat);
      taskObj.end = dragData.updatedEndDate; // drag Parent group elements when child element is dragged

      if ((taskObj == null ? void 0 : taskObj.showasgroup) === '0' && dataset._checkUpdatedTaskWidth.call(element, yAxis.getDraggedValue(dataObj.config.dragStart.xPos + dataObj.config.dragStart.lastDx - dataObj.graphics.element.attrs.width), dataObj.config.endMs, i)) {
        if (taskObj.processid.includes('.1')) {
          var _matchingParentTask2 = dataset.components.data.find(function (t) {
            return t.config.processId + ".1" === taskObj.processid;
          }),
              _firstChildTask2 = tasksMap[_matchingParentTask2.config.processId + "-a"],
              _secondChildTask2 = tasksMap[_matchingParentTask2.config.processId + "-b"];

          if (_secondChildTask2.config.startMs < _firstChildTask2.config.startMs) {
            _matchingParentTask2.config._startDate = _secondChildTask2.config._startDate;
            _matchingParentTask2.config.startMs = _secondChildTask2.config.startMs;
          } else {
            _matchingParentTask2.config._startDate = dragData.updatedStartDate;
            _matchingParentTask2.config.startMs = dataObj.config.startMs;
          }

          if (_secondChildTask2.config.endMs < _firstChildTask2.config.endMs) {
            _matchingParentTask2.config._endDate = dragData.updatedEndDate;
            _matchingParentTask2.config.endMs = dataObj.config.endMs;
          } else {
            _matchingParentTask2.config._endDate = _secondChildTask2.config._endDate;
            _matchingParentTask2.config.endMs = _secondChildTask2.config.endMs;
          }

          _matchingParentTask2.config.toolText = dataset._getParentToolTextOnDrag.call(element, _matchingParentTask2.config.startMs, _matchingParentTask2.config.endMs, _matchingParentTask2.config);
          dataset.parsePlotAttributes(_matchingParentTask2, i - 1);
        }

        if (taskObj.processid.includes('.2')) {
          var _matchingParentTask3 = dataset.components.data.find(function (t) {
            return t.config.processId + ".2" === taskObj.processid;
          }),
              _firstChildTask3 = tasksMap[_matchingParentTask3.config.processId + "-a"],
              _secondChildTask3 = tasksMap[_matchingParentTask3.config.processId + "-b"];

          if (_secondChildTask3.config.endMs < _firstChildTask3.config.endMs) {
            _matchingParentTask3.config._endDate = _firstChildTask3.config._endDate;
            _matchingParentTask3.config.endMs = _firstChildTask3.config.endMs;
          } else {
            _matchingParentTask3.config._endDate = dragData.updatedEndDate;
            _matchingParentTask3.config.endMs = dataObj.config.endMs;
          }

          if (_secondChildTask3.config.startMs < _firstChildTask3.config.startMs) {
            _matchingParentTask3.config._startDate = dragData.updatedStartDate;
            _matchingParentTask3.config.startMs = dataObj.config.startMs;
          } else {
            _matchingParentTask3.config._startDate = _firstChildTask3.config._startDate;
            _matchingParentTask3.config.startMs = _firstChildTask3.config.startMs;
          }

          _matchingParentTask3.config.toolText = dataset._getParentToolTextOnDrag.call(element, _matchingParentTask3.config.startMs, _matchingParentTask3.config.endMs, _matchingParentTask3.config);
          dataset.parsePlotAttributes(_matchingParentTask3, i - 2);
        }
      }
    }

    dataObj.config.toolText = toolText;
    dragData.index = dataObj == null ? void 0 : (_dataObj$config = dataObj.config) == null ? void 0 : _dataObj$config.index;
    dragData.id = dataObj == null ? void 0 : dataObj.config.taskId;

    for (i = 0, len = dataStore.length; i < len; i++) {
      setObj = dataStore[i];

      if (dataObj.config.index === setObj.config.index) {
        break;
      }
    } // Check if updated taskbar width is greater than minimum width


    if (!dataset._checkUpdatedTaskWidth.call(element, dataObj.config.startMs, dataObj.config.endMs, dataObj.config.endMs, i)) return;
    data.tempStartMs = dataObj.config.startMs;
    data.tempEndMs = dataObj.config.endMs;

    if (((_dataSource$connector = dataSource.connectors) == null ? void 0 : _dataSource$connector.length) > 0) {
      task[index] = _objectSpread(_objectSpread({}, task[index]), {}, {
        start: numberFormatter.getFormattedDate(dataObj.config.startMs, chartAttr.dateformat),
        end: numberFormatter.getFormattedDate(dataObj.config.endMs, chartAttr.dateformat)
      });
      dataSource.tasks = [_objectSpread(_objectSpread({}, dataSource.tasks[0]), {}, {
        task: task
      })];

      if (dataset._linkedParent.getChildren().connector) {
        dataset._linkedParent.getChildren().connector[0]._state.dragged = true;

        dataset._linkedParent.getChildren().connector[0].draw();
      }
    }

    dataset.parsePlotAttributes(dataObj, i);
    dataset && dataset.draw();

    if (dataset._linkedParent.getChildren().connector) {
      dataset._linkedParent.getChildren().connector[0]._state.dragged = false;
    }
  }
  /**
   * Callback function when dragging of a node is started
   * @param {Object} event The actual event object
   */
  ;

  _proto.dragStart = function dragStart(event) {
    var ele = this,
        data = ele.data('drag-options'),
        dataset = data.dataset,
        chart = dataset.getFromEnv('chart'),
        tasksMap = chart.components.tasksMap;

    dataset._dragStart.call(ele, event); // Adding all the next, previous elements to element env so they can be fetched while dragMove


    var arrayOfAdjacentElements = Object.values(tasksMap).filter(function (a) {
      return a.graphics.element.attrs.y === ele.attrs.y;
    }).sort(function (a, b) {
      return a.graphics.element.attrs.x - b.graphics.element.attrs.x;
    });
    ele.data('arrayOfAdjacentElements', arrayOfAdjacentElements);
  }
  /**
   * Helper function of dragStart()
   * @param {Object} e The actual event object
   */
  ;

  _proto._dragStart = function _dragStart() {
    var element = this,
        data = element.data('drag-options'),
        dataObj = data.dataObj,
        dataGraphics = dataObj.graphics,
        ele = dataGraphics.element,
        bBox = ele.getBBox(),
        config = dataObj.config,
        dataset = data.dataset,
        dataSource = dataset.getFromEnv('dataSource'),
        chartAttr = dataSource.chart,
        numberFormatter = dataset.getFromEnv('number-formatter'),
        chart = dataset.getFromEnv('chart'),
        sourceEvent = DATAPLOTDRAGSTART,
        dragStart = config.dragStart || (config.dragStart = {}),
        dragData = config.dragData || (config.dragData = {}),
        eventArgs;
    dragStart.xPos = config.xPos;
    dragStart.x = config.xPos;
    dragStart.bBox = bBox;
    dragData.prevStartDate = numberFormatter.getFormattedDate(config.startMs, chartAttr.dateformat);
    dragData.prevEndDate = numberFormatter.getFormattedDate(config.endMs, chartAttr.dateformat); // store original x, y positions

    dragStart.origX = dragStart.lastDx || (dragStart.lastDx = 0);
    eventArgs = ele.data(EVENTARGS); // Whether to fire the click event ot not

    chart.fireChartInstanceEvent(sourceEvent, eventArgs);
  }
  /**
  * Callback function when a node is being dragged
  * @param {Object} event The actual event object
  * @param {Object} customData Object containing the details related to drag coordinates
  */
  ;

  _proto.dragMove = function dragMove(event, customData) {
    // eslint-disable-line no-unused-vars
    var ele = this,
        data = ele.data('drag-options'),
        dataset = data.dataset,
        dataSource = dataset.getFromEnv('dataSource'),
        chartAttr = dataSource.chart,
        arrayOfAdjacentElements = ele.data('arrayOfAdjacentElements'),
        dx = customData[0],
        dy = customData[1],
        px = customData[2],
        py = customData[3];
    /**
     *
     */

    function getAdjacentEl() {
      return _getAdjacentEl.apply(this, arguments);
    }

    function _getAdjacentEl() {
      _getAdjacentEl = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _arrayOfAdjacentEleme5, _arrayOfAdjacentEleme6, _arrayOfAdjacentEleme7, _arrayOfAdjacentEleme8;

        var prev, nextEl, currentElIndex, _ele$prev, _ele$prev$prev, _ele$next, _ele$next$next;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // allow drag overlap
                currentElIndex = arrayOfAdjacentElements == null ? void 0 : arrayOfAdjacentElements.findIndex(function (x) {
                  return x.graphics.element.attrs.y === ele.attrs.y && x.graphics.element.attrs.x === ele.attrs.x;
                });
                prev = (_arrayOfAdjacentEleme5 = arrayOfAdjacentElements[currentElIndex - 1]) == null ? void 0 : (_arrayOfAdjacentEleme6 = _arrayOfAdjacentEleme5.graphics) == null ? void 0 : _arrayOfAdjacentEleme6.element;

                if (arrayOfAdjacentElements.length === 0 && !prev) {
                  prev = ele == null ? void 0 : (_ele$prev = ele.prev) == null ? void 0 : (_ele$prev$prev = _ele$prev.prev) == null ? void 0 : _ele$prev$prev.prev;
                }

                nextEl = (_arrayOfAdjacentEleme7 = arrayOfAdjacentElements[currentElIndex + 1]) == null ? void 0 : (_arrayOfAdjacentEleme8 = _arrayOfAdjacentEleme7.graphics) == null ? void 0 : _arrayOfAdjacentEleme8.element;

                if (arrayOfAdjacentElements.length === 0 && !nextEl) {
                  nextEl = ele == null ? void 0 : (_ele$next = ele.next) == null ? void 0 : (_ele$next$next = _ele$next.next) == null ? void 0 : _ele$next$next.next;
                }

                return _context.abrupt("return", {
                  nextEl: nextEl,
                  prev: prev
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _getAdjacentEl.apply(this, arguments);
    }

    if (!chartAttr.allowtaskbaroverlap) {
      getAdjacentEl().then(function (x) {
        data.nextElement = x.nextEl;
        data.prevElement = x.prev;

        dataset._dragMove.call(ele, dx, dy, px, py, x.nextEl, x.prev);
      });
    } else {
      dataset._dragMove.call(ele, dx, dy, px, py);
    }
  }
  /**
  * Helper function of dragMove()
  * @param {number} dxVal the drag coordinates
  * @param {number} dyVal the drag coordinates
  * @param {number} px the drag coordinates
  * @param {number} py the drag coordinates
  * @param {object} nextEl very next element
  * @param {object} prevEl very next element
  */
  ;

  _proto._dragMove = function _dragMove(dxVal, dyVal, px, py, nextEl, prevEl) {
    var _dataSource$tasks$4, _dataSource$tasks4, _tasksMap$nextEleInde, _tasksMap$prevEleInde, _dataObj$graphics, _dataObj$graphics2, _dataObj$config2, _dataSource$connector2;

    var element = this,
        dx = dxVal,
        i,
        canvasPadding = CANVASLEFTPADDING,
        data = element.data('drag-options'),
        dataObj = data.dataObj,
        dataset = data.dataset,
        datasetConfig = dataset.config,
        dataSource = dataset.getFromEnv('dataSource'),
        task = Array.isArray(dataSource == null ? void 0 : dataSource.tasks) ? dataSource == null ? void 0 : (_dataSource$tasks$4 = dataSource.tasks[0]) == null ? void 0 : _dataSource$tasks$4.task : dataSource == null ? void 0 : (_dataSource$tasks4 = dataSource.tasks) == null ? void 0 : _dataSource$tasks4.task,
        config = dataObj.config,
        id = config.id,
        index = config == null ? void 0 : config.index,
        taskObj = task[index],
        chartAttr = dataSource.chart,
        chart = dataset.getFromEnv('chart'),
        numberFormatter = dataset.getFromEnv('number-formatter'),
        yAxis = dataset.getFromEnv('yAxis'),
        xAxis = dataset.getFromEnv('xAxis'),
        processMap = xAxis.config.processes.processMap,
        dataStore = dataset.components.data,
        ele = dataObj.graphics.element,
        label = (0, _lib.getFirstValue)((0, _lib.pluck)(taskObj.label, taskObj.name), BLANK),
        percentComplete = Math.min((0, _lib.pluckNumber)(taskObj.percentcomplete, -1), 100),
        tasksMap = chart.components.tasksMap,
        dragStart = config.dragStart,
        dragData = config.dragData,
        startX = dragStart.bBox.x + dx,
        endX = dragStart.bBox.x2 + dx,
        chartConfig = dataset.getFromEnv('chartConfig'),
        canvasLeft = chartConfig.canvasLeft,
        // eslint-disable-next-line good-practices/no-static-strings-in-scope
    toolText = '',
        processName,
        canvasRight = yAxis.getPixel(chartConfig.scrollOptions.viewPortMax),
        dInt = chartConfig.dateintooltip,
        len,
        viewPortScale,
        setObj;
    var dateFormat,
        nextElObj = task[index + 1],
        prevElObj = task[index - 1],
        currentObj = task[index],
        nextEleIndex = "" + (nextElObj == null ? void 0 : nextElObj.id),
        prevEleIndex = "" + (prevElObj == null ? void 0 : prevElObj.id),
        currentEleIndex = "" + (currentObj == null ? void 0 : currentObj.id),
        nextElConfig = (_tasksMap$nextEleInde = tasksMap[nextEleIndex]) == null ? void 0 : _tasksMap$nextEleInde.config,
        prevElConfig = (_tasksMap$prevEleInde = tasksMap[prevEleIndex]) == null ? void 0 : _tasksMap$prevEleInde.config,
        delayTaskBarCheck = (nextElObj == null ? void 0 : nextElObj.processid) === (taskObj == null ? void 0 : taskObj.processid) && (nextElObj == null ? void 0 : nextElObj.label) === 'Delay' || (prevElObj == null ? void 0 : prevElObj.processId) === (taskObj == null ? void 0 : taskObj.processid) && (prevElObj == null ? void 0 : prevElObj.label) === 'Delay' || (taskObj == null ? void 0 : taskObj.label) === 'Delay',
        isCurrentElementDelayTaskbar = (taskObj == null ? void 0 : taskObj.label) === 'Delay',
        updatedStartX;
    /**  adjust canvasPixel if scrolltoDate is added */

    if (chartConfig.scrolltodate) {
      viewPortScale = chartConfig.viewPortConfig.scaleX * chartConfig.viewPortConfig.x;
      canvasLeft = canvasLeft + viewPortScale;
      canvasRight = canvasRight + viewPortScale;
    } // Edge case handling when taskbar is dragged to extreme right or left


    if (isCurrentElementDelayTaskbar) {
      var _tasksMap$currentEleI;

      var currentElementWidth = (_tasksMap$currentEleI = tasksMap[currentEleIndex]) == null ? void 0 : _tasksMap$currentEleI.config.width;
      updatedStartX = startX - (prevElConfig.width - currentElementWidth);

      if (updatedStartX < canvasLeft) {
        dx += canvasLeft + canvasPadding - updatedStartX;
      }
    } else if (startX < canvasLeft) {
      dx += canvasLeft + canvasPadding - startX;
    }

    if (endX > canvasRight) {
      dx -= endX - canvasRight;
    }

    if (dx) {
      ele.data('fire_click_event', 0);
    }

    if (taskObj) {
      toolText = (0, _lib.getValidValue)((0, _lib.parseUnsafeString)((0, _lib.pluck)(taskObj.tooltext, datasetConfig.hovertext, datasetConfig.plottooltext, chartAttr.plottooltext), false));

      if (toolText !== UNDEF) {
        if (id && processMap[id]) {
          processName = processMap[id].catObj.label || processMap[id].catObj.name;
        }

        toolText = (0, _lib.parseTooltext)(toolText, [3, 28, 29, 30, 31], {
          end: numberFormatter.getFormattedDate(dataObj.config.endMs, chartAttr.outputdateformat),
          start: numberFormatter.getFormattedDate(dataObj.config.startMs, chartAttr.outputdateformat),
          label: label,
          percentComplete: percentComplete !== -1 ? numberFormatter.percentValue(percentComplete) : BLANK,
          processName: processName
        }, dataset.config);
      } else {
        toolText = (label !== BLANK ? label + (dInt ? ', ' : BLANK) : BLANK) + (dInt ? numberFormatter.getFormattedDate(dataObj.config.startMs, chartAttr.outputdateformat) + ' - ' + numberFormatter.getFormattedDate(dataObj.config.endMs, chartAttr.outputdateformat) : BLANK);
      }
    }

    dateFormat = checkDateFormat(taskObj.start);
    dragStart.lastDx = dx;
    dataObj.config.startMs = yAxis.getDraggedValue(dragStart.xPos + dragStart.lastDx);

    if (dragData.updatedStartDate !== numberFormatter.getFormattedDate(dataObj.config.startMs, dateFormat ? 'dd/mm/yyyy hh:mn:ss' : chartAttr.dateformat)) {
      var dragDataCopy = JSON.parse(JSON.stringify(dragData));
      chart.fireChartInstanceEvent(DATAPLOTDRAGMOVE, dragDataCopy);
    }

    dataObj.config.endMs = yAxis.getDraggedValue(dragStart.xPos + dragStart.lastDx + dataObj.config.width);
    var nextElTaskFillCheck = dataObj != null && (_dataObj$graphics = dataObj.graphics) != null && _dataObj$graphics.taskFill ? (dataObj == null ? void 0 : (_dataObj$graphics2 = dataObj.graphics) == null ? void 0 : _dataObj$graphics2.taskFill.id) === nextEl.id : false;

    if (!delayTaskBarCheck && Math.sign(dxVal) === 1 && !nextElTaskFillCheck && nextEl && element.attrs.x + element.attrs.width >= nextEl.attrs.x && nextEl.attrs.y === element.attrs.y) {
      dataObj.config.startMs = yAxis.getDraggedValue(nextEl.attrs.x - dataObj.config.width);
      dataObj.config.endMs = yAxis.getDraggedValue(nextEl.attrs.x);
    } else if (!delayTaskBarCheck && Math.sign(dxVal) === -1 && prevEl && prevEl.attrs.x + prevEl.attrs.width >= element.attrs.x && (data == null ? void 0 : data.prevElement.attrs.y) === element.attrs.y) {
      dataObj.config.startMs = yAxis.getDraggedValue(prevEl.attrs.x + prevEl.attrs.width);
      dataObj.config.endMs = yAxis.getDraggedValue(prevEl.attrs.x + prevEl.attrs.width + dataObj.config.width);
    } else if (delayTaskBarCheck) {
      if (taskObj.label !== 'Delay' && nextElObj && nextElConfig) {
        nextElConfig.startMs = yAxis.getDraggedValue(dragStart.xPos + dragStart.lastDx + dataObj.config.width - tasksMap["" + nextElObj.id].graphics.element.attrs.width);
        nextElConfig.endMs = yAxis.getDraggedValue(dragStart.xPos + dragStart.lastDx + dataObj.config.width);
        dataset.parsePlotAttributes(tasksMap["" + nextElObj.id], i + 1);
      } else if (taskObj.label === 'Delay' && prevElObj && prevElConfig) {
        prevElConfig.startMs = yAxis.getDraggedValue(dragStart.xPos + dragStart.lastDx + dataObj.config.width - tasksMap["" + prevElObj.id].graphics.element.attrs.width);
        prevElConfig.endMs = yAxis.getDraggedValue(dragStart.xPos + dragStart.lastDx + dataObj.config.width);
        dataset.parsePlotAttributes(tasksMap["" + prevElObj.id], i - 1);
      }
    }

    dataObj.config.toolText = toolText;
    dragData.updatedStartDate = numberFormatter.getFormattedDate(dataObj.config.startMs, dateFormat ? 'dd/mm/yyyy hh:mn:ss' : chartAttr.dateformat);
    dragData.updatedEndDate = numberFormatter.getFormattedDate(dataObj.config.endMs, dateFormat ? 'dd/mm/yyyy hh:mn:ss' : chartAttr.dateformat);
    dragData.index = dataObj == null ? void 0 : (_dataObj$config2 = dataObj.config) == null ? void 0 : _dataObj$config2.index;
    dragData.id = dataObj == null ? void 0 : dataObj.config.taskId; // drag child group elements when parent is dragged

    if ((taskObj == null ? void 0 : taskObj.showasgroup) === '1') {
      var _firstChildTask$confi, _secondChildTask$conf;

      var firstChildTask = tasksMap[taskObj.processid + "-a"],
          secondChildTask = tasksMap[taskObj.processid + "-b"];

      if ((firstChildTask == null ? void 0 : (_firstChildTask$confi = firstChildTask.config) == null ? void 0 : _firstChildTask$confi.endMs) < (secondChildTask == null ? void 0 : (_secondChildTask$conf = secondChildTask.config) == null ? void 0 : _secondChildTask$conf.endMs)) {
        var newEndMs = yAxis.getDraggedValue(dragStart.xPos + dragStart.lastDx + (firstChildTask == null ? void 0 : firstChildTask.config.width)),
            updatedEndDateForChildTask = numberFormatter.getFormattedDate(newEndMs, chartAttr.dateformat),
            newSecondStartMs = yAxis.getDraggedValue(dragStart.xPos + dragStart.lastDx + (dataObj.config.width - (secondChildTask == null ? void 0 : secondChildTask.config.width))),
            updatedStartDateForChildTask = numberFormatter.getFormattedDate(newSecondStartMs, chartAttr.dateformat);

        if (secondChildTask.config.startMs >= firstChildTask.config.startMs) {
          if (firstChildTask) {
            firstChildTask.config._startDate = dragData.updatedStartDate;
            firstChildTask.config.startMs = dataObj.config.startMs;
            firstChildTask.config._endDate = updatedEndDateForChildTask;
            firstChildTask.config.endMs = newEndMs;
            dataset.parsePlotAttributes(firstChildTask, i + 1);
            firstChildTask.config.toolText = dataset._getParentToolTextOnDrag.call(element, firstChildTask.config.startMs, firstChildTask.config.endMs, firstChildTask.config);
          }

          if (secondChildTask) {
            secondChildTask.config._startDate = updatedStartDateForChildTask;
            secondChildTask.config.startMs = newSecondStartMs;
            secondChildTask.config._endDate = dragData.updatedEndDate;
            secondChildTask.config.endMs = dataObj.config.endMs;
            dataset.parsePlotAttributes(secondChildTask, i + 2);
            secondChildTask.config.toolText = dataset._getParentToolTextOnDrag.call(element, secondChildTask.config.startMs, secondChildTask.config.endMs, secondChildTask.config);
          }
        } else {
          if (secondChildTask) {
            secondChildTask.config._startDate = updatedStartDateForChildTask;
            secondChildTask.config.startMs = newSecondStartMs;
            secondChildTask.config._endDate = dragData.updatedEndDate;
            secondChildTask.config.endMs = dataObj.config.endMs;
            dataset.parsePlotAttributes(secondChildTask, i + 2);
            secondChildTask.config.toolText = dataset._getParentToolTextOnDrag.call(element, secondChildTask.config.startMs, secondChildTask.config.endMs, secondChildTask.config);
          }
        }
      } else {
        var _secondChildTask$conf2, _firstChildTask$confi2;

        var _newEndMs = yAxis.getDraggedValue(dragStart.xPos + dragStart.lastDx + (secondChildTask == null ? void 0 : secondChildTask.config.width)),
            _updatedEndDateForChildTask = numberFormatter.getFormattedDate(_newEndMs, chartAttr.dateformat),
            _newSecondStartMs = yAxis.getDraggedValue(dragStart.xPos + dragStart.lastDx + (dataObj.config.width - (firstChildTask == null ? void 0 : firstChildTask.config.width))),
            _updatedStartDateForChildTask = numberFormatter.getFormattedDate(_newSecondStartMs, chartAttr.dateformat);

        if ((secondChildTask == null ? void 0 : (_secondChildTask$conf2 = secondChildTask.config) == null ? void 0 : _secondChildTask$conf2.startMs) < (firstChildTask == null ? void 0 : (_firstChildTask$confi2 = firstChildTask.config) == null ? void 0 : _firstChildTask$confi2.startMs)) {
          if (firstChildTask) {
            firstChildTask.config._startDate = _updatedStartDateForChildTask;
            firstChildTask.config.startMs = _newSecondStartMs;
            firstChildTask.config._endDate = dragData.updatedEndDate;
            firstChildTask.config.endMs = dataObj.config.endMs;
            dataset.parsePlotAttributes(firstChildTask, i + 1);
            firstChildTask.config.toolText = dataset._getParentToolTextOnDrag.call(element, firstChildTask.config.startMs, firstChildTask.config.endMs, firstChildTask.config);
          }

          if (secondChildTask) {
            secondChildTask.config._startDate = dragData.updatedStartDate;
            secondChildTask.config.startMs = dataObj.config.startMs;
            secondChildTask.config._endDate = _updatedEndDateForChildTask;
            secondChildTask.config.endMs = _newEndMs;
            dataset.parsePlotAttributes(secondChildTask, i + 2);
            secondChildTask.config.toolText = dataset._getParentToolTextOnDrag.call(element, secondChildTask.config.startMs, secondChildTask.config.endMs, secondChildTask.config);
          }
        } else {
          if (firstChildTask) {
            firstChildTask.config._startDate = _updatedStartDateForChildTask;
            firstChildTask.config.startMs = _newSecondStartMs;
            firstChildTask.config._endDate = dragData.updatedEndDate;
            firstChildTask.config.endMs = dataObj.config.endMs;
            dataset.parsePlotAttributes(firstChildTask, i + 1);
            firstChildTask.config.toolText = dataset._getParentToolTextOnDrag.call(element, firstChildTask.config.startMs, firstChildTask.config.endMs, firstChildTask.config);
          }
        }
      }
    } // drag Parent group elements when child element is dragged


    if ((taskObj == null ? void 0 : taskObj.showasgroup) === '0') {
      if (taskObj.processid.includes('.1')) {
        var matchingParentTask = dataset.components.data.find(function (t) {
          return t.config.processId + ".1" === taskObj.processid;
        }),
            _firstChildTask4 = tasksMap[matchingParentTask.config.processId + "-a"],
            _secondChildTask4 = tasksMap[matchingParentTask.config.processId + "-b"],
            secondChildTaskEndMs = _secondChildTask4.config.endMs,
            secondChildTaskStartMs = _secondChildTask4.config.startMs;

        if (!secondChildTaskEndMs) {
          secondChildTaskEndMs = yAxis.getDraggedValue(_secondChildTask4.config.dragStart.xPos + _secondChildTask4.config.dragStart.lastDx + (_secondChildTask4 == null ? void 0 : _secondChildTask4.config.width));
        }

        if (!secondChildTaskStartMs) {
          secondChildTaskStartMs = yAxis.getDraggedValue(_secondChildTask4.config.dragStart.xPos + _secondChildTask4.config.dragStart.lastDx);
        }

        if (secondChildTaskStartMs < _firstChildTask4.config.startMs) {
          matchingParentTask.config._startDate = _secondChildTask4.config._startDate;
          matchingParentTask.config.startMs = secondChildTaskStartMs;
        } else {
          matchingParentTask.config._startDate = dragData.updatedStartDate;
          matchingParentTask.config.startMs = dataObj.config.startMs;
        }

        if (secondChildTaskEndMs < _firstChildTask4.config.endMs) {
          matchingParentTask.config._endDate = dragData.updatedEndDate;
          matchingParentTask.config.endMs = dataObj.config.endMs;
        } else {
          matchingParentTask.config._endDate = _secondChildTask4.config._endDate;
          matchingParentTask.config.endMs = secondChildTaskEndMs;
        }

        matchingParentTask.config.toolText = dataset._getParentToolTextOnDrag.call(element, matchingParentTask.config.startMs, matchingParentTask.config.endMs, matchingParentTask.config);
        dataset.parsePlotAttributes(matchingParentTask, i - 1);
      }

      if (taskObj.processid.includes('.2')) {
        var _matchingParentTask4 = dataset.components.data.find(function (t) {
          return t.config.processId + ".2" === taskObj.processid;
        }),
            _firstChildTask5 = tasksMap[_matchingParentTask4.config.processId + "-a"],
            _secondChildTask5 = tasksMap[_matchingParentTask4.config.processId + "-b"],
            firstChildTaskEndMs = _firstChildTask5.config.endMs,
            firstChildTaskStartMs = _firstChildTask5.config.startMs;

        if (!firstChildTaskEndMs) {
          firstChildTaskEndMs = yAxis.getDraggedValue(_firstChildTask5.config.dragStart.xPos + _firstChildTask5.config.dragStart.lastDx + (_firstChildTask5 == null ? void 0 : _firstChildTask5.config.width));
        }

        if (!firstChildTaskStartMs) {
          firstChildTaskStartMs = yAxis.getDraggedValue(_firstChildTask5.config.dragStart.xPos + _firstChildTask5.config.dragStart.lastDx);
        }

        if (_secondChildTask5.config.endMs < firstChildTaskEndMs) {
          _matchingParentTask4.config._endDate = _firstChildTask5.config._endDate;
          _matchingParentTask4.config.endMs = firstChildTaskEndMs;
        } else {
          _matchingParentTask4.config._endDate = dragData.updatedEndDate;
          _matchingParentTask4.config.endMs = dataObj.config.endMs;
        }

        if (_secondChildTask5.config.startMs < firstChildTaskStartMs) {
          _matchingParentTask4.config._startDate = dragData.updatedStartDate;
          _matchingParentTask4.config.startMs = dataObj.config.startMs;
        } else {
          _matchingParentTask4.config._startDate = _firstChildTask5.config._startDate;
          _matchingParentTask4.config.startMs = firstChildTaskStartMs;
        }

        _matchingParentTask4.config.toolText = dataset._getParentToolTextOnDrag.call(element, _matchingParentTask4.config.startMs, _matchingParentTask4.config.endMs, _matchingParentTask4.config);
        dataset.parsePlotAttributes(_matchingParentTask4, i - 2);
      }
    }

    for (i = 0, len = dataStore.length; i < len; i++) {
      setObj = dataStore[i];

      if (dataObj.config.index === setObj.config.index) {
        break;
      }
    }

    if (((_dataSource$connector2 = dataSource.connectors) == null ? void 0 : _dataSource$connector2.length) > 0) {
      task[index] = _objectSpread(_objectSpread({}, task[index]), {}, {
        start: numberFormatter.getFormattedDate(dataObj.config.startMs, chartAttr.dateformat),
        end: numberFormatter.getFormattedDate(dataObj.config.endMs, chartAttr.dateformat)
      });
      dataSource.tasks = [_objectSpread(_objectSpread({}, dataSource.tasks[0]), {}, {
        task: task
      })]; // If there are connectors then update state and draw

      if (dataset._linkedParent.getChildren().connector) {
        dataset._linkedParent.getChildren().connector[0]._state.dragged = true;

        dataset._linkedParent.getChildren().connector[0].draw();
      }
    }

    dataset.parsePlotAttributes(dataObj, i);
    dataset && dataset.draw();

    if (dataset._linkedParent.getChildren().connector) {
      dataset._linkedParent.getChildren().connector[0]._state.dragged = false;
    }

    dataset.taskHoverHandler.call(element, chart);
  }
  /**
   * Callback function when dragging of the node is stopped
   * @param {Object} event The actual event object
   */
  ;

  _proto.dragUp = function dragUp(event) {
    var ele = this,
        data = ele.data('drag-options'),
        dataset = data.dataset;

    dataset._dragUp.call(ele, event);
  }
  /**
   * Helper function of dragUp()
   * @param {Object} event The actual event object
   */
  ;

  _proto._dragUp = function _dragUp(event) {
    var _dataSource$datatable, _dataSource$tasks$5, _dataSource$tasks5;

    var element = this,
        data = element.data('drag-options'),
        dataObj = data.dataObj,
        dataset = data.dataset,
        dataSource = dataset.getFromEnv('dataSource'),
        dataColumn = dataSource == null ? void 0 : (_dataSource$datatable = dataSource.datatable) == null ? void 0 : _dataSource$datatable.datacolumn,
        config = dataObj.config,
        id = config.id,
        index = config == null ? void 0 : config.index,
        direction = data.direction,
        numberFormatter = dataset.getFromEnv('number-formatter'),
        task = Array.isArray(dataSource == null ? void 0 : dataSource.tasks) ? dataSource == null ? void 0 : (_dataSource$tasks$5 = dataSource.tasks[0]) == null ? void 0 : _dataSource$tasks$5.task : dataSource == null ? void 0 : (_dataSource$tasks5 = dataSource.tasks) == null ? void 0 : _dataSource$tasks5.task,
        taskObj = task[index],
        chartAttr = dataSource.chart,
        chart = dataset.getFromEnv('chart'),
        tasksMap = chart.components.tasksMap;

    if (chartAttr.autoupdatestartenddatecolumn && taskObj.label === 'Actual' && (dataColumn == null ? void 0 : dataColumn.length) > 0) {
      var _tasksMap$nextEleInde2;

      var actualDateIndex = Number(id) - 1,
          nextElObj = task[index + 1],
          nextEleIndex = "" + (nextElObj == null ? void 0 : nextElObj.id),
          nextElConfig = (_tasksMap$nextEleInde2 = tasksMap[nextEleIndex]) == null ? void 0 : _tasksMap$nextEleInde2.config,
          delayTaskBarCheck = (nextElObj == null ? void 0 : nextElObj.processid) === (taskObj == null ? void 0 : taskObj.processid) && (nextElObj == null ? void 0 : nextElObj.label) === 'Delay' || (taskObj == null ? void 0 : taskObj.label) === 'Delay';

      if (actualDateIndex >= 0) {
        dataSource.datatable.datacolumn[0].text[actualDateIndex].label = numberFormatter.getFormattedDate(dataObj.config.startMs, chartAttr.dateformat);
        dataSource.datatable.datacolumn[1].text[actualDateIndex].label = numberFormatter.getFormattedDate(dataObj.config.endMs, chartAttr.dateformat);

        if (delayTaskBarCheck) {
          task[nextElConfig.index] = _objectSpread(_objectSpread({}, task[nextElConfig.index]), {}, {
            start: numberFormatter.getFormattedDate(nextElConfig.startMs, chartAttr.dateformat),
            end: numberFormatter.getFormattedDate(nextElConfig.endMs, chartAttr.dateformat)
          });
          dataSource.tasks = [_objectSpread(_objectSpread({}, dataSource.tasks[0]), {}, {
            task: task
          })];
        }
      }

      chart._env.chartInstance.setChartData(dataSource);
    } // If there are connectors then update state and draw


    if (dataset._linkedParent.getChildren().connector) {
      dataset._linkedParent.getChildren().connector[0]._state.dragged = true;

      dataset._linkedParent.getChildren().connector[0].draw();
    }

    dataset.taskHoverOutHandler.call(element, chart);

    if (taskObj.label === 'Actual' && direction && direction === 'left') {
      var _tasksMap$_nextEleInd;

      var _nextElObj = task[index + 1],
          _nextEleIndex = "" + (_nextElObj == null ? void 0 : _nextElObj.id),
          delayElConfig = (_tasksMap$_nextEleInd = tasksMap[_nextEleIndex]) == null ? void 0 : _tasksMap$_nextEleInd.config;

      if (dataObj.config.startMs > delayElConfig.startMs) {
        dataObj.config.startMs = delayElConfig.startMs;
      }
    } else {
      if (data.tempStartMs) dataObj.config.startMs = data.tempStartMs;
      if (data.tempEndMs) dataObj.config.endMs = data.tempEndMs;
    }
  }
  /** Task
   * Adds event handlers on slack elements
   * @param {Object} slackElem The slack Raphael element
   * @param {Object} chart A reference to the gant chartAPI
   */
  ;

  _proto.slackElemHandlers = function slackElemHandlers(slackElem, chart) {
    var dataset = this;

    if (slackElem) {
      slackElem.on('fc-click', function (e) {
        var ele = this;
        chart.plotEventHandler(ele, e);
      }).hover(function (data) {
        var ele = this,
            dataObj = ele.data('dataObj');
        chart.plotEventHandler(ele, data, ROLLOVER);
        dataObj.config.showHoverEffect && dataset.taskHoverHandler.call(ele, chart);
      }, function (data) {
        var ele = this,
            dataObj = ele.data('dataObj');
        chart.plotEventHandler(ele, data, ROLLOUT);
        dataObj.config.showHoverEffect && dataset.taskHoverOutHandler.call(ele, chart);
      });
    }
  }
  /**
   * function to Remove data plots if the number of current data plots/categories
   * is more than the existing ones.
   * @param  {Object} datasetJSON JSON for dataset configurations
   */
  ;

  _proto.trimData = function trimData(datasetJSON) {
    if (!this.config.JSONData) {
      return;
    }

    var dataSet = this,
        config = dataSet.config,
        context = config && config.context,
        prevCatlen = context && context.prevCatlen,
        xAxis = dataSet.getFromEnv('xAxis'),
        currCatLen = xAxis.getProcessLen(),
        catDiff = prevCatlen - currCatLen,
        prevData = config.JSONData,
        prevDataLength = prevData.task && prevData.task.length,
        currDataLength = datasetJSON.task && datasetJSON.task.length || 0,
        dataDiff = prevDataLength - currDataLength,
        diff,
        startIndex;

    if (catDiff > dataDiff) {
      diff = catDiff;
      startIndex = currCatLen;
    } else {
      diff = dataDiff;
      startIndex = currDataLength;
    } // Removing data plots if the number of current data plots/categories
    // is more than the existing ones.


    if (diff > 0) {
      this.removeData(startIndex, diff, false);
    }
  }
  /**
   * Returns the default value padding for this dataset.
   *
   * @return {number} The value padding
   */
  ;

  _proto.getAxisValuePadding = function getAxisValuePadding() {
    return this.config.defaultPadding;
  }
  /**
   * Draws labels on the tasks.
   */
  ;

  _proto.drawLabel = function drawLabel() {
    var dataset = this,
        conf = dataset.config,
        chart = dataset.getFromEnv('chart'),
        animationManager = dataset.getFromEnv('animationManager'),
        dataStore = dataset.components.data,
        valElemDummy,
        startValElemDummy,
        endValElemDummy,
        valElem,
        startValElem,
        endValElem,
        config,
        graphics,
        dataObj,
        eventArgs,
        textAttr,
        startLabelTextAttr,
        endLabelTextAttr,
        dataLabelContainer = dataset.getContainer('dataLabelContainer'),
        i,
        len = dataStore.length;

    for (i = 0; i < len; i++) {
      dataObj = dataStore[i];
      config = dataObj.config;
      graphics = dataObj.graphics;
      eventArgs = config.eventArgs; // valElem = valElems && valElems[i];

      valElemDummy = graphics.valElem;
      textAttr = config._labelTextAttr;

      if (defined(config.label) && config.label !== BLANK && textAttr) {
        valElem = graphics.valElem = animationManager.setAnimation({
          el: valElemDummy || 'text',
          attr: textAttr,
          container: dataLabelContainer,
          component: dataset
        });
        valElem.outlineText(conf.showTextOutline, textAttr.fill);

        if (!valElemDummy) {
          valElem.data('dataset', dataset);
          dataset.slackElemHandlers(valElem, chart);
        } else {
          valElem.removeCSS();
          valElem.show();
        }

        valElem.css(config.style);
        valElem.data('dataObj', dataObj).data('dataObj', dataObj).data('eventArgs', eventArgs);
      } else {
        valElemDummy && animationManager.setAnimation({
          el: valElemDummy,
          component: dataset,
          callback: hideFn,
          doNotRemove: true
        });
      } // Task start date element


      startValElemDummy = graphics.startValElem;
      startLabelTextAttr = config._startLabelTextAttr;

      if (defined(config.startDate) && config.startDate !== BLANK && startLabelTextAttr) {
        startValElem = graphics.startValElem = animationManager.setAnimation({
          el: startValElemDummy || 'text',
          attr: startLabelTextAttr,
          container: dataLabelContainer,
          component: dataset
        });
        startValElem.outlineText(conf.showTextOutline, startLabelTextAttr.fill);

        if (!startValElemDummy) {
          startValElem.data('dataset', dataset);
          dataset.slackElemHandlers(startValElem, chart);
        } else {
          startValElem.removeCSS();
          startValElem.show();
        }

        startValElem.css(config.style);
        startValElem.data('dataObj', dataObj).data('chart', chart).data('eventArgs', eventArgs);
      } else {
        startValElemDummy && animationManager.setAnimation({
          el: startValElemDummy,
          component: dataset,
          callback: hideFn,
          doNotRemove: true
        });
      } // Task end date label drawing


      endValElemDummy = graphics.endValElem;
      endLabelTextAttr = config._endLabelTextAttr;

      if (defined(config.endDate) && config.endDate !== BLANK && endLabelTextAttr) {
        endValElem = graphics.endValElem = animationManager.setAnimation({
          el: endValElemDummy || 'text',
          attr: endLabelTextAttr,
          container: dataLabelContainer,
          component: dataset
        });
        endValElem.outlineText(conf.showTextOutline, endLabelTextAttr.fill);

        if (!endValElemDummy) {
          endValElem.data('dataset', dataset);
          dataset.slackElemHandlers(endValElem, chart);
        } else {
          endValElem.removeCSS();
          endValElem.show().css(config.style);
        }

        endValElem.data('dataObj', dataObj).data('chart', chart).data('eventArgs', eventArgs);
      } else {
        endValElemDummy && animationManager.setAnimation({
          el: endValElemDummy,
          component: dataset,
          callback: hideFn,
          doNotRemove: true
        });
      }
    }
  }
  /**
   * Defines what happens when the users mouses into a task.
   */
  ;

  _proto.taskHoverHandler = function taskHoverHandler() {
    var ele = this,
        dataObj = ele.data('dataObj') || {},
        dataset = ele.data('dataset'),
        dataStore = dataset.components.data,
        config = dataObj.config || {},
        index = config.index,
        graphics = dataStore[index] && dataStore[index].graphics,
        attrib = {
      fill: config.hoverFillColor,
      stroke: config.hoverBorderColor
    };

    if (config.percentComplete !== -1 && !config.showAsGroup) {
      graphics.slackElem.attr({
        fill: config.slackHoverColor
      });
      graphics.taskFill.attr({
        fill: config.hoverFillColor
      });
      delete attrib.fill;
    }

    ;
    graphics.element.attr(attrib);
  }
  /**
   * Defines what happens when the users mouses out of a task.
   */
  ;

  _proto.taskHoverOutHandler = function taskHoverOutHandler() {
    var ele = this,
        dataObj = ele.data('dataObj') || {},
        dataset = ele.data('dataset') || {},
        dataStore = dataset.components.data,
        config = dataObj.config || {},
        index = config.index,
        graphics = dataStore[index] && dataStore[index].graphics,
        attrib = {
      fill: config.color,
      stroke: config.borderColor,
      'stroke-width': config.borderThickness,
      'stroke-dasharray': config.dashedStyle
    };

    if (config.percentComplete !== -1 && !config.showAsGroup) {
      graphics && graphics.slackElem.attr({
        fill: config.slackColor
      });
      graphics && graphics.taskFill.attr({
        fill: config.color
      });
      delete attrib.fill;
    }

    graphics && graphics.element.attr(attrib);
  }
  /**
   * Parsing and calculation of plot attr
   *
   * @param {any} dataObj dataObj
   * @param {any} index index
   * @memberof Task
   */
  ;

  _proto.parsePlotAttributes = function parsePlotAttributes(dataObj, index) {
    var _dataset$config, _config, _config$style, _config2, _config2$style;

    var dataset = this,
        chart = dataset.getFromEnv('chart'),
        jsonData = chart.getFromEnv('dataSource'),
        chartConfig = chart.config,
        canvasTop = chartConfig.canvasTop,
        xAxis = chart.getChildren('xAxis')[0],
        yAxis = chart.getChildren('yAxis')[0],
        config,
        endX,
        startMs,
        endMs,
        setLink,
        height,
        id,
        pHeight,
        width,
        width2,
        xPos,
        yPos,
        borderThickness,
        taskBarElementAttrs,
        crispBox,
        halfH,
        txtAlign,
        borderFill,
        padding,
        incrementId = index,
        datePadding = chartConfig.datepadding,
        taskHeight,
        labelTextAttr,
        endLabelTextAttr,
        startLabelTextAttr,
        proLen = jsonData.processes.process && jsonData.processes.process.length,
        taskBarRadius = chartConfig.taskbarroundradius,
        cursor,
        processDimention,
        viewPortConfig = chartConfig.viewPortConfig,
        x = viewPortConfig.x,
        scaleX = viewPortConfig.scaleX,
        lineHeight;
    config = dataObj && dataObj.config;
    !dataObj.graphics && (dataObj.graphics = {});
    startMs = config && config.startMs;
    endMs = config && config.endMs; // Condition arises when user has removed data in real time update

    if (typeof dataObj === 'undefined' || typeof startMs === 'undefined' || endMs === null) {
      return;
    }

    taskHeight = config.taskHeight;
    setLink = config.link;
    borderThickness = config.borderThickness;
    id = config.id;
    borderFill = config.color;
    lineHeight = config.lineHeight; // isNewElem = false;

    if (incrementId > proLen - 1) {
      incrementId = 0;
    }

    if (typeof config.id !== 'undefined') {
      processDimention = yAxis.getProcessPositionById(id);
    } else {
      processDimention = yAxis.getProcessPositionByIndex(incrementId);
    }

    incrementId++;
    pHeight = processDimention.height;
    padding = pHeight * (isPercent(config.topPadding) && parseFloat(config.topPadding, 10) * 0.01) || (0, _lib.pluckNumber)(config.topPadding, pHeight);
    height = config.height = pHeight * (isPercent(taskHeight) && parseFloat(taskHeight, 10) * 0.01) || (0, _lib.pluckNumber)(taskHeight, pHeight);
    xPos = config.xPos = xAxis.getPixel(config.startMs) + x * scaleX;
    endX = xAxis.getPixel(config.endMs) + x * scaleX;
    width = config.width = Math.round(width2 = endX - xPos);
    yPos = processDimention.bottom + canvasTop - pHeight;
    yPos = config.yPos = yPos + Math.min(padding, pHeight - height);
    halfH = height * 0.5;
    crispBox = (0, _lib.crispBound)(xPos, yPos, width, height, borderThickness);
    xPos = crispBox.x;
    yPos = crispBox.y;
    width = crispBox.width;
    height = crispBox.height;

    if (checkInvalidValue(xPos, yPos, width, height) === false) {
      config.inValidValue = true;
      return;
    }

    config.props = {
      element: {},
      perComElem: {},
      slackElem: {}
    };

    if (config.showAsGroup) {
      taskBarElementAttrs = {
        path: ['M', xPos, yPos, 'V', yPos + height, 'L', xPos + halfH, yPos + halfH, 'H', xPos + width - halfH, 'L', xPos + width, yPos + height, 'V', yPos, 'H', xPos]
      };
    } else {
      taskBarElementAttrs = {
        x: crispBox.x,
        y: crispBox.y,
        width: crispBox.width || 1,
        height: height
      };
    }

    Object.assign(taskBarElementAttrs, {
      fill: borderFill,
      stroke: config.borderColor,
      cursor: setLink ? 'pointer' : dataset != null && (_dataset$config = dataset.config) != null && _dataset$config.allowDrag ? 'move' : BLANK,
      r: taskBarRadius,
      'stroke-width': borderThickness,
      width: crispBox.width || 1
    });
    config.eventArgs = {
      processId: config.processId,
      taskId: config.taskId,
      start: config._startDate,
      end: config._endDate,
      showAsGroup: config.showAsGroup,
      link: config.link,
      sourceType: 'task',
      percentComplete: config.percentComplete !== -1,
      bgColor: config.rawTaskColor,
      bgAlpha: config.rawTaskAlpha,
      font: config.textFont,
      fontSize: config.textFontSize,
      fontColor: config.textColor
    };

    if (config.percentComplete !== -1 && !config.showAsGroup) {
      width2 = width * config.percentComplete * 0.01;
      borderFill = _lib.TRACKER_FILL; // Percent complete element

      config.props.perComElem = {
        attr: {
          x: xPos,
          y: yPos,
          height: height,
          width: width2,
          fill: config.color,
          cursor: setLink ? 'pointer' : BLANK,
          'stroke-width': 0
        }
      }; // Slack Element

      config.props.slackElem = {
        attr: {
          x: xPos + width2 || 1,
          y: yPos,
          width: width - width2,
          height: height,
          fill: config.slackColor,
          cursor: setLink ? 'pointer' : BLANK,
          'stroke-width': 0
        }
      }; // update the fill of taskBar Element

      taskBarElementAttrs.fill = borderFill;
    }

    txtAlign = config.labelAlign;
    labelTextAttr = config._labelTextAttr || (config._labelTextAttr = {});
    config.props.element.attr = taskBarElementAttrs;
    labelTextAttr.x = xPos + width * xAlign[txtAlign] + alignGutter[txtAlign];
    labelTextAttr.y = yPos - parseInt(lineHeight, 10) * 0.5 - chartConfig.tasklabelspadding;
    labelTextAttr.text = config.label;
    labelTextAttr.direction = chartConfig.textDirection;
    labelTextAttr['text-anchor'] = align[txtAlign];
    labelTextAttr.cursor = cursor;
    labelTextAttr.fill = (0, _lib.convertColor)(config.textColor);
    labelTextAttr['line-height'] = lineHeight;
    startLabelTextAttr = config._startLabelTextAttr || (config._startLabelTextAttr = {});
    startLabelTextAttr.x = xPos - 2 - datePadding;
    startLabelTextAttr.y = yPos + height * 0.5;
    startLabelTextAttr.text = config.startDate;
    startLabelTextAttr['text-anchor'] = _lib.POSITION_END;
    startLabelTextAttr.cursor = cursor;
    startLabelTextAttr.direction = chartConfig.textDirection;
    startLabelTextAttr.fill = (0, _lib.convertColor)(config.textColor);
    startLabelTextAttr['line-height'] = lineHeight;
    startLabelTextAttr['font-size'] = (_config = config) == null ? void 0 : (_config$style = _config.style) == null ? void 0 : _config$style.fontSize;
    endLabelTextAttr = config._endLabelTextAttr || (config._endLabelTextAttr = {});
    endLabelTextAttr.x = xPos + width + 2 + datePadding;
    endLabelTextAttr.y = yPos + height * 0.5;
    endLabelTextAttr.text = config.endDate;
    endLabelTextAttr.cursor = cursor;
    endLabelTextAttr.direction = chartConfig.textDirection;
    endLabelTextAttr['text-anchor'] = _lib.POSITION_START;
    endLabelTextAttr.fill = (0, _lib.convertColor)(config.textColor);
    endLabelTextAttr['line-height'] = lineHeight;
    endLabelTextAttr['font-size'] = (_config2 = config) == null ? void 0 : (_config2$style = _config2.style) == null ? void 0 : _config2$style.fontSize;
    config.cursor = cursor;
  }
  /**
   * Parses and calculates positions during post space management
   *
   * @memberof Task
   */
  ;

  _proto.allocatePosition = function allocatePosition() {
    var dataset = this,
        dsStore = dataset.components.data || [],
        length = dsStore.length,
        i,
        dataObj;

    for (i = 0; i < length; i++) {
      dataObj = dsStore[i];
      dataset.parsePlotAttributes(dataObj, i);
    }
  }
  /**
   * Function to remove a data from a dataset during real time update.
   *
   * @param {any} dataObj The data object to remove
   */
  ;

  _proto._removeDataVisuals = function _removeDataVisuals(dataObj) {
    var dataset = this,
        animationManager = dataset.getFromEnv('animationManager'),
        ele,
        graphics,
        graphicsObj;

    if (!dataObj) {
      return;
    }

    graphics = dataObj.graphics; // eslint-disable-next-line guard-for-in

    for (ele in graphics) {
      graphicsObj = graphics[ele];
      graphicsObj && animationManager.setAnimation({
        el: graphicsObj,
        component: dataset
      });
    }
  }
  /**
   * Draws the dataset.
   */
  ;

  _proto.draw = function draw() {
    var _dataSource$tasks$6, _dataSource$tasks6;

    var dataset = this,
        i,
        visible = dataset.getState('visible'),
        chart = dataset.getFromEnv('chart'),
        toolTipController = dataset.getFromEnv('toolTipController'),
        chartConfig = chart.config,
        canvas = chart.getChildren('canvas')[0],
        xAxis = chart.getChildren('xAxis')[0],
        dataSource = dataset.getFromEnv('dataSource'),
        task = Array.isArray(dataSource == null ? void 0 : dataSource.tasks) ? dataSource == null ? void 0 : (_dataSource$tasks$6 = dataSource.tasks[0]) == null ? void 0 : _dataSource$tasks$6.task : dataSource == null ? void 0 : (_dataSource$tasks6 = dataSource.tasks) == null ? void 0 : _dataSource$tasks6.task,
        animationManager = dataset.getFromEnv('animationManager'),
        len,
        parentContainer = canvas.getChildContainer('taskGroup'),
        components = dataset.components,
        dataStore = components.data,
        dataObj,
        config,
        graphics,
        removeDataArr = components.removeDataArr,
        removeDataArrLen = removeDataArr && removeDataArr.length,
        dataLabelsLayer = chart.getChildContainer('datalabelsGroup'),
        labelsGroup = canvas.getContainer('labelsGroup'),
        dataLabelContainer = dataset.getContainer('dataLabelContainer'),
        isContextChanged = dataset._contextChanged(),
        container = dataset.getContainer('taskColumnContainer'),
        shadowContainer = dataset.getContainer('taskColumnShadowContainer'),
        startMs,
        endMs,
        toolText,
        taskBarElement,
        perComElem,
        perComElemDummy,
        slackElem,
        slackElemDummy,
        elemType,
        taskBarElementAttrs,
        eventArgs,
        viewPortConfig = chartConfig.viewPortConfig,
        x = viewPortConfig.x,
        scaleX = viewPortConfig.scaleX,
        shadow = chartConfig.showshadow,
        dragMove = dataset.dragMove,
        dragStart = dataset.dragStart,
        dragUp = dataset.dragUp,
        dragMoveWidthHandler = dataset.dragMoveWidthHandler,
        dragStartWidthHandler = dataset.dragStartWidthHandler,
        conf = dataset.config;

    if (!dataset.getState('removed') && !dataset.getState('dirty') && !(isContextChanged && visible) && !conf.allowDrag) {
      return;
    } // Creating a container group for the graphic element of column plots if
    // not present and attaching it to its parent group.


    if (!container) {
      container = dataset.addContainer('taskColumnContainer', animationManager.setAnimation({
        el: 'group',
        attr: {
          name: 'columns'
        },
        container: parentContainer,
        component: dataset
      }));
    }

    if (!visible) {
      container.hide();
    } else {
      container.show();
    }

    if (!labelsGroup) {
      labelsGroup = canvas.addContainer('labelsGroup', animationManager.setAnimation({
        el: 'group',
        attr: {
          name: 'task-plot-labels'
        },
        container: dataLabelsLayer,
        component: canvas
      }));
    }

    if (!dataLabelContainer) {
      dataLabelContainer = dataset.addContainer('dataLabelContainer', animationManager.setAnimation({
        el: 'group',
        attr: {
          name: 'labels'
        },
        container: parentContainer,
        // RED-8910 changed labelsGroup to parentContainer
        component: dataset
      }));
    } else {
      dataLabelContainer.removeCSS();
    }

    if (!visible) {
      dataLabelContainer.hide();
    } else {
      dataLabelContainer.show();
    }

    labelsGroup = animationManager.setAnimation({
      el: labelsGroup,
      attr: {
        transform: 'T' + -chart.config.xOffset + ',0'
      },
      component: canvas
    });
    dataLabelContainer.css(conf.labelStyle); // Creating the shadow element container group for each plots if not present
    // and attaching it its parent group.

    if (!shadowContainer) {
      // Always sending the shadow group to the back of the plots group.
      shadowContainer = dataset.addContainer('taskColumnShadowContainer', animationManager.setAnimation({
        el: 'group',
        attr: {
          name: 'shadow'
        },
        container: parentContainer,
        component: dataset
      }).toBack());

      if (!visible) {
        shadowContainer.hide();
      }
    }

    len = dataStore.length; // Create plot elements.

    for (i = 0; i < len; i++) {
      var _config3;

      dataObj = dataStore[i];
      config = dataObj && dataObj.config;
      var index = (_config3 = config) == null ? void 0 : _config3.index,
          taskObj = task[index];
      !dataObj.graphics && (dataObj.graphics = {});
      graphics = dataObj.graphics;
      startMs = config && config.startMs;
      endMs = config && config.endMs; // Condition arises when user has removed data in real time update

      if (typeof dataObj === 'undefined' || typeof startMs === 'undefined' || endMs === null) {
        continue;
      }

      toolText = config.toolText;

      if (config.inValidValue) {
        continue;
      }

      taskBarElement = graphics.element;
      elemType = config.showAsGroup ? 'path' : 'rect';

      if (taskBarElement && taskBarElement.type !== elemType) {
        taskBarElement.remove();
        taskBarElement = graphics.element = null;
      }

      taskBarElementAttrs = config.props.element.attr;
      graphics.element = animationManager.setAnimation({
        el: taskBarElement || elemType,
        label: elemType,
        attr: taskBarElementAttrs,
        container: container,
        component: dataset
      });

      if (!taskBarElement) {
        taskBarElement = graphics.element; // Add drag methods of dragMove and dragStart

        if (conf != null && conf.allowDrag) {
          taskBarElement.drag(dragMove, dragStart, dragUp);
        }

        taskBarElement.data('dataset', dataset);
        dataset.slackElemHandlers(taskBarElement, chart);
      }

      eventArgs = config.eventArgs;
      var xPos = config.xPos = xAxis.getPixel(config.startMs) + x * scaleX,
          endX = xAxis.getPixel(config.endMs) + x * scaleX,
          width = config.width = Math.round(endX - xPos),
          widthHandlerRightEl = taskBarElement.paper.getById(dataObj.widthHandlerRightId),
          widthHandlerLeftEl = taskBarElement.paper.getById(dataObj.widthHandlerLeftId);

      if (config.percentComplete !== -1 && !config.showAsGroup) {
        perComElemDummy = graphics.taskFill;
        slackElemDummy = graphics.slackElem; // Percent complete element

        perComElem = graphics.taskFill = animationManager.setAnimation({
          el: perComElemDummy || 'rect',
          attr: config.props.perComElem.attr,
          container: container,
          component: dataset
        });

        if (!perComElemDummy) {
          dataset.slackElemHandlers(perComElem, chart);
        } // Slack Element


        slackElem = graphics.slackElem = animationManager.setAnimation({
          el: slackElemDummy || 'rect',
          attr: config.props.slackElem.attr,
          container: container,
          component: dataset
        });
        container.node.insertBefore(perComElem.node, taskBarElement ? taskBarElement.node : null);
        container.node.insertBefore(slackElem.node, taskBarElement ? taskBarElement.node : null); // dataset.slackElemId = slackElem.id;
        // dataset.perComElemId = perComElem.id;

        if (!slackElemDummy) {
          dataset.slackElemHandlers(slackElem, chart);
        }

        perComElem.show();
        perComElem.data('chart', chart).data('dataObj', dataObj).data('dataset', dataset); // toolTipController.enableToolTip(perComElem, toolText);

        slackElem.show();
        perComElem && perComElem.data('eventArgs', eventArgs); // toolTipController.enableToolTip(slackElem, toolText);

        slackElem && slackElem.data('eventArgs', eventArgs).data('dataObj', dataObj).data('dataset', dataset).data('chart', chart);
      } else {
        // If there are slack elements then hide those
        graphics.taskFill && animationManager.setAnimation({
          el: graphics.taskFill,
          component: dataset,
          callback: hideFn,
          doNotRemove: true
        });
        graphics.slackElem && animationManager.setAnimation({
          el: graphics.slackElem,
          component: dataset,
          callback: hideFn,
          doNotRemove: true
        });
      } // set the attr


      taskBarElement.show().shadow({
        opacity: shadow
      }, shadowContainer).data('dataObj', dataObj).data('chart', chart).data('dataset', dataset).data('eventArgs', eventArgs); // Attach drag options to task element if allow drag enable

      if (conf != null && conf.allowDrag) {
        taskBarElement.data('drag-options', {
          dataObj: dataObj,
          dataset: dataset,
          datasetIndex: dataset.index,
          pointIndex: dataObj.config.index,
          cursor: 'move',
          chart: chart,
          link: dataObj.link
        });
      }

      if (!widthHandlerLeftEl && conf != null && conf.allowDrag && (taskObj == null ? void 0 : taskObj.label) !== 'Delay') {
        var widthHandlerLeft = taskBarElement.paper.rect(taskBarElement.attrs.x - 1, taskBarElement.attrs.y, 2, taskBarElement.attrs.height).attr({
          fill: 'rgb(51, 189, 218)',
          stroke: 'none',
          cursor: 'ew-resize',
          opacity: 0
        });
        widthHandlerLeft.insertAfter(taskBarElement);
        dataObj.widthHandlerLeftId = widthHandlerLeft.id; // Add drag methods of dragMove and dragStart

        widthHandlerLeft.drag(dragMoveWidthHandler, dragStartWidthHandler, dragUp);
        widthHandlerLeft.show().data('dataObj', dataObj).data('chart', chart).data('dataset', dataset).data('eventArgs', eventArgs);
        widthHandlerLeft.data('drag-options', {
          dataObj: dataObj,
          dataset: dataset,
          datasetIndex: dataset.index,
          pointIndex: dataObj.config.index,
          cursor: 'ew-resize',
          chart: chart,
          link: dataObj.link,
          direction: 'left',
          taskbarElement: taskBarElement
        });
        widthHandlerLeft.data('dataset', dataset);
      } else if (widthHandlerLeftEl && !isNaN(taskBarElement.attrs.x)) {
        widthHandlerLeftEl.attr('x', taskBarElement.attrs.x - 1);
      }

      if (!widthHandlerRightEl && conf != null && conf.allowDrag && (taskObj == null ? void 0 : taskObj.label) !== 'Delay') {
        var widthHandlerRight = taskBarElement.paper.rect(taskBarElement.attrs.x + width - 1, taskBarElement.attrs.y, 2, taskBarElement.attrs.height).attr({
          fill: 'rgb(51, 189, 218)',
          stroke: 'none',
          cursor: 'ew-resize',
          opacity: 0
        });
        widthHandlerRight.insertAfter(taskBarElement);
        dataObj.widthHandlerRightId = widthHandlerRight.id;
        widthHandlerRight.drag(dragMoveWidthHandler, dragStartWidthHandler, dragUp);
        widthHandlerRight.data('drag-options', {
          dataObj: dataObj,
          dataset: dataset,
          datasetIndex: dataset.index,
          pointIndex: dataObj.config.index,
          cursor: 'ew-resize',
          chart: chart,
          link: dataObj.link,
          direction: 'right',
          taskbarElement: taskBarElement
        });
        widthHandlerRight.data('dataset', dataset);
      } else if (widthHandlerRightEl && !isNaN(taskBarElement.attrs.x)) {
        widthHandlerRightEl.attr('x', taskBarElement.attrs.x + width - 1);
      }

      toolTipController.enableToolTip(taskBarElement, toolText);
    }

    dataset.drawn ? dataset.drawLabel() : dataset.addJob('drawLabel', dataset.drawLabel.bind(dataset), _schedular.priorityList.label); // Setting the drawn flag true to draw differently incase of real time draw.

    dataset.drawn = true;

    for (i = 0; i < removeDataArrLen; i++) {
      dataset._removeDataVisuals(removeDataArr.shift());
    }
  };

  return Task;
}(_column.default);

var _default = Task;
exports["default"] = _default;

/***/ }),

/***/ 1590:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = _default;

var _lib = __webpack_require__(274);

var _ganttProcess = _interopRequireDefault(__webpack_require__(1591));

var _ganttTime = _interopRequireDefault(__webpack_require__(1595));

/**
 * Function to instatiate axis and get attached to canvas
 * @param {Object} chart chart API
 */
function _default(chart) {
  var canvas = chart.getChildren('canvas')[0],
      zoomObj = {
    zoomable: true,
    pannable: true
  },
      config = chart._feedAxesRawData(),
      yAxis,
      xAxis;

  (0, _lib.componentFactory)(chart, _ganttTime.default, 'xAxis', 1, config.xAxisConf);
  (0, _lib.componentFactory)(chart, _ganttProcess.default, 'yAxis', 1, config.yAxisConf);
  yAxis = chart.getChildren('yAxis')[0];
  xAxis = chart.getChildren('xAxis')[0];
  yAxis.setLinkedItem('canvas', canvas);
  xAxis.setLinkedItem('canvas', canvas);
  canvas.attachAxis(xAxis, false, chart.zoomX ? zoomObj : {});
  canvas.attachAxis(yAxis, true, chart.zoomY ? zoomObj : {});

  chart._setCategories();
}

/***/ }),

/***/ 1588:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = _default;

var _canvasGantt = _interopRequireDefault(__webpack_require__(1589));

var _lib = __webpack_require__(274);

function _default(chart) {
  var canvas;
  (0, _lib.componentFactory)(chart, _canvasGantt.default, 'canvas', 1);
  canvas = chart.getChildren('canvas');

  for (var i = 0, len = canvas.length; i < len; i++) {
    canvas[i].configure();
  }
}

/***/ }),

/***/ 1602:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



exports.__esModule = true;
exports["default"] = _default;

var _lib = __webpack_require__(274);

/**
 * Checks if the data source of the chart has any connectors in it or not.
 *
 * @return {boolean} Whether the data source of the chart has any connectors.
 */
var _hasNoConnectors = function _hasNoConnectors(dataSource) {
  var connectors = dataSource.connectors;
  var hasNoConnectors = true;

  if (typeof connectors !== 'undefined') {
    if (connectors.length) {
      hasNoConnectors = !(connectors.length > 0);
    } else {
      hasNoConnectors = connectors.task && !(connectors.task.length > 0);
    }
  }

  return hasNoConnectors;
},

/**
* Checks if the data source of the chart has any milestones in it or not.
*
* @return {boolean} Whether the data source of the chart has any milestones.
*/
_hasNoMilestones = function _hasNoMilestones(dataSource) {
  var milestones = dataSource.milestones;
  var hasNoMilestones = true;

  if (typeof milestones !== 'undefined') {
    if (milestones.length) {
      hasNoMilestones = !(milestones.length > 0);
    } else {
      hasNoMilestones = milestones.milestone && !(milestones.milestone.length > 0);
    }
  }

  return hasNoMilestones;
},

/**
* Checks if the data source of the chart has any tasks in it or not.
*
* @return {boolean} Whether the data source of the chart has any tasks.
*/
_hasNoTasks = function _hasNoTasks(dataSource) {
  var tasks = dataSource.tasks;
  var hasNoTasks = true;

  if (typeof tasks !== 'undefined') {
    if (tasks.length) {
      hasNoTasks = !(tasks.length > 0);
    } else {
      hasNoTasks = tasks.task && !(tasks.task.length > 0);
    }
  }

  return hasNoTasks;
},

/**
* Checks whether the chart should display a no data to display message.
*
* @return {boolean} Whether the chart has any data to display or not.
*/
_hasNoDataToDisplay = function _hasNoDataToDisplay(dataSource) {
  return _hasNoTasks(dataSource) && _hasNoConnectors(dataSource) && _hasNoMilestones(dataSource);
};
/**
 * This is simple dataset factory. It instantiates and cofigures the datasets in a Gantt chart.
 * @param {Object} chart chart API
 */


function _default(chart) {
  var dataSource = chart.getFromEnv('dataSource'),
      task,
      connector,
      milestone;

  if (_hasNoDataToDisplay(dataSource)) {
    chart.setChartMessage();
    return;
  }

  task = dataSource.tasks;
  connector = dataSource.connectors;
  milestone = dataSource.milestones;
  task && (0, _lib.datasetFactory)(chart, chart.getDSdef('task'), 'task', 1, task.length ? task : [task]);
  connector && (0, _lib.datasetFactory)(chart, chart.getDSdef('connector'), 'connector', 1, connector.length ? connector : [connector]);
  milestone && (0, _lib.datasetFactory)(chart, chart.getDSdef('milestone'), 'milestone', 1, milestone.length ? milestone : [milestone]);
  chart.getDatasets().forEach(function (dataset) {
    dataset.addToEnv('yAxis', chart.getChildren('xAxis')[0]);
    dataset.addToEnv('xAxis', chart.getChildren('yAxis')[0]);
  });
  chart.config.showLegend && chart._createLegendItems();
}

/***/ }),

/***/ 1585:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _gantt = _interopRequireDefault(__webpack_require__(1586));

exports.Gantt = _gantt.default;
var _default = {
  name: 'gantt',
  type: 'package',
  requiresFusionCharts: true,
  extension: function extension(FusionCharts) {
    return FusionCharts.addDep(_gantt.default);
  }
};
exports["default"] = _default;

/***/ }),

/***/ 1586:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(269);

exports.__esModule = true;
exports["default"] = void 0;

var _gantt = _interopRequireDefault(__webpack_require__(1587));

var _default = _gantt.default;
exports["default"] = _default;

/***/ })

}]);
}));

//# sourceMappingURL=http://localhost:3052/4.1.0-beta.1/map/eval/fusioncharts.gantt.js.map