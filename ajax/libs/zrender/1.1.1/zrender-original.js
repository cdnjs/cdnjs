
// Copyright 2006 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


// Known Issues:
//
// * Patterns only support repeat.
// * Radial gradient are not implemented. The VML version of these look very
//   different from the canvas one.
// * Clipping paths are not implemented.
// * Coordsize. The width and height attribute have higher priority than the
//   width and height style values which isn't correct.
// * Painting mode isn't implemented.
// * Canvas width/height should is using content-box by default. IE in
//   Quirks mode will draw the canvas using border-box. Either change your
//   doctype to HTML5
//   (http://www.whatwg.org/specs/web-apps/current-work/#the-doctype)
//   or use Box Sizing Behavior from WebFX
//   (http://webfx.eae.net/dhtml/boxsizing/boxsizing.html)
// * Non uniform scaling does not correctly scale strokes.
// * Optimize. There is always room for speed improvements.

// AMD by kener.linfeng@gmail.com
define('zrender/lib/excanvas',['require'],function(require) {
    
// Only add this code if we do not already have a canvas implementation
if (!document.createElement('canvas').getContext) {

(function() {

  // alias some functions to make (compiled) code shorter
  var m = Math;
  var mr = m.round;
  var ms = m.sin;
  var mc = m.cos;
  var abs = m.abs;
  var sqrt = m.sqrt;

  // this is used for sub pixel precision
  var Z = 10;
  var Z2 = Z / 2;

  var IE_VERSION = +navigator.userAgent.match(/MSIE ([\d.]+)?/)[1];

  /**
   * This funtion is assigned to the <canvas> elements as element.getContext().
   * @this {HTMLElement}
   * @return {CanvasRenderingContext2D_}
   */
  function getContext() {
    return this.context_ ||
        (this.context_ = new CanvasRenderingContext2D_(this));
  }

  var slice = Array.prototype.slice;

  /**
   * Binds a function to an object. The returned function will always use the
   * passed in {@code obj} as {@code this}.
   *
   * Example:
   *
   *   g = bind(f, obj, a, b)
   *   g(c, d) // will do f.call(obj, a, b, c, d)
   *
   * @param {Function} f The function to bind the object to
   * @param {Object} obj The object that should act as this when the function
   *     is called
   * @param {*} var_args Rest arguments that will be used as the initial
   *     arguments when the function is called
   * @return {Function} A new function that has bound this
   */
  function bind(f, obj, var_args) {
    var a = slice.call(arguments, 2);
    return function() {
      return f.apply(obj, a.concat(slice.call(arguments)));
    };
  }

  function encodeHtmlAttribute(s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  }

  function addNamespace(doc, prefix, urn) {
    if (!doc.namespaces[prefix]) {
      doc.namespaces.add(prefix, urn, '#default#VML');
    }
  }

  function addNamespacesAndStylesheet(doc) {
    addNamespace(doc, 'g_vml_', 'urn:schemas-microsoft-com:vml');
    addNamespace(doc, 'g_o_', 'urn:schemas-microsoft-com:office:office');

    // Setup default CSS.  Only add one style sheet per document
    if (!doc.styleSheets['ex_canvas_']) {
      var ss = doc.createStyleSheet();
      ss.owningElement.id = 'ex_canvas_';
      ss.cssText = 'canvas{display:inline-block;overflow:hidden;' +
          // default size is 300x150 in Gecko and Opera
          'text-align:left;width:300px;height:150px}';
    }
  }

  // Add namespaces and stylesheet at startup.
  addNamespacesAndStylesheet(document);

  var G_vmlCanvasManager_ = {
    init: function(opt_doc) {
      var doc = opt_doc || document;
      // Create a dummy element so that IE will allow canvas elements to be
      // recognized.
      doc.createElement('canvas');
      doc.attachEvent('onreadystatechange', bind(this.init_, this, doc));
    },

    init_: function(doc) {
      // find all canvas elements
      var els = doc.getElementsByTagName('canvas');
      for (var i = 0; i < els.length; i++) {
        this.initElement(els[i]);
      }
    },

    /**
     * Public initializes a canvas element so that it can be used as canvas
     * element from now on. This is called automatically before the page is
     * loaded but if you are creating elements using createElement you need to
     * make sure this is called on the element.
     * @param {HTMLElement} el The canvas element to initialize.
     * @return {HTMLElement} the element that was created.
     */
    initElement: function(el) {
      if (!el.getContext) {
        el.getContext = getContext;

        // Add namespaces and stylesheet to document of the element.
        addNamespacesAndStylesheet(el.ownerDocument);

        // Remove fallback content. There is no way to hide text nodes so we
        // just remove all childNodes. We could hide all elements and remove
        // text nodes but who really cares about the fallback content.
        el.innerHTML = '';

        // do not use inline function because that will leak memory
        el.attachEvent('onpropertychange', onPropertyChange);
        el.attachEvent('onresize', onResize);

        var attrs = el.attributes;
        if (attrs.width && attrs.width.specified) {
          // TODO: use runtimeStyle and coordsize
          // el.getContext().setWidth_(attrs.width.nodeValue);
          el.style.width = attrs.width.nodeValue + 'px';
        } else {
          el.width = el.clientWidth;
        }
        if (attrs.height && attrs.height.specified) {
          // TODO: use runtimeStyle and coordsize
          // el.getContext().setHeight_(attrs.height.nodeValue);
          el.style.height = attrs.height.nodeValue + 'px';
        } else {
          el.height = el.clientHeight;
        }
        //el.getContext().setCoordsize_()
      }
      return el;
    }
  };

  function onPropertyChange(e) {
    var el = e.srcElement;

    switch (e.propertyName) {
      case 'width':
        el.getContext().clearRect();
        el.style.width = el.attributes.width.nodeValue + 'px';
        // In IE8 this does not trigger onresize.
        el.firstChild.style.width =  el.clientWidth + 'px';
        break;
      case 'height':
        el.getContext().clearRect();
        el.style.height = el.attributes.height.nodeValue + 'px';
        el.firstChild.style.height = el.clientHeight + 'px';
        break;
    }
  }

  function onResize(e) {
    var el = e.srcElement;
    if (el.firstChild) {
      el.firstChild.style.width =  el.clientWidth + 'px';
      el.firstChild.style.height = el.clientHeight + 'px';
    }
  }

  G_vmlCanvasManager_.init();

  // precompute "00" to "FF"
  var decToHex = [];
  for (var i = 0; i < 16; i++) {
    for (var j = 0; j < 16; j++) {
      decToHex[i * 16 + j] = i.toString(16) + j.toString(16);
    }
  }

  function createMatrixIdentity() {
    return [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ];
  }

  function matrixMultiply(m1, m2) {
    var result = createMatrixIdentity();

    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        var sum = 0;

        for (var z = 0; z < 3; z++) {
          sum += m1[x][z] * m2[z][y];
        }

        result[x][y] = sum;
      }
    }
    return result;
  }

  function copyState(o1, o2) {
    o2.fillStyle     = o1.fillStyle;
    o2.lineCap       = o1.lineCap;
    o2.lineJoin      = o1.lineJoin;
    o2.lineWidth     = o1.lineWidth;
    o2.miterLimit    = o1.miterLimit;
    o2.shadowBlur    = o1.shadowBlur;
    o2.shadowColor   = o1.shadowColor;
    o2.shadowOffsetX = o1.shadowOffsetX;
    o2.shadowOffsetY = o1.shadowOffsetY;
    o2.strokeStyle   = o1.strokeStyle;
    o2.globalAlpha   = o1.globalAlpha;
    o2.font          = o1.font;
    o2.textAlign     = o1.textAlign;
    o2.textBaseline  = o1.textBaseline;
    o2.arcScaleX_    = o1.arcScaleX_;
    o2.arcScaleY_    = o1.arcScaleY_;
    o2.lineScale_    = o1.lineScale_;
  }

  var colorData = {
    aliceblue: '#F0F8FF',
    antiquewhite: '#FAEBD7',
    aquamarine: '#7FFFD4',
    azure: '#F0FFFF',
    beige: '#F5F5DC',
    bisque: '#FFE4C4',
    black: '#000000',
    blanchedalmond: '#FFEBCD',
    blueviolet: '#8A2BE2',
    brown: '#A52A2A',
    burlywood: '#DEB887',
    cadetblue: '#5F9EA0',
    chartreuse: '#7FFF00',
    chocolate: '#D2691E',
    coral: '#FF7F50',
    cornflowerblue: '#6495ED',
    cornsilk: '#FFF8DC',
    crimson: '#DC143C',
    cyan: '#00FFFF',
    darkblue: '#00008B',
    darkcyan: '#008B8B',
    darkgoldenrod: '#B8860B',
    darkgray: '#A9A9A9',
    darkgreen: '#006400',
    darkgrey: '#A9A9A9',
    darkkhaki: '#BDB76B',
    darkmagenta: '#8B008B',
    darkolivegreen: '#556B2F',
    darkorange: '#FF8C00',
    darkorchid: '#9932CC',
    darkred: '#8B0000',
    darksalmon: '#E9967A',
    darkseagreen: '#8FBC8F',
    darkslateblue: '#483D8B',
    darkslategray: '#2F4F4F',
    darkslategrey: '#2F4F4F',
    darkturquoise: '#00CED1',
    darkviolet: '#9400D3',
    deeppink: '#FF1493',
    deepskyblue: '#00BFFF',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1E90FF',
    firebrick: '#B22222',
    floralwhite: '#FFFAF0',
    forestgreen: '#228B22',
    gainsboro: '#DCDCDC',
    ghostwhite: '#F8F8FF',
    gold: '#FFD700',
    goldenrod: '#DAA520',
    grey: '#808080',
    greenyellow: '#ADFF2F',
    honeydew: '#F0FFF0',
    hotpink: '#FF69B4',
    indianred: '#CD5C5C',
    indigo: '#4B0082',
    ivory: '#FFFFF0',
    khaki: '#F0E68C',
    lavender: '#E6E6FA',
    lavenderblush: '#FFF0F5',
    lawngreen: '#7CFC00',
    lemonchiffon: '#FFFACD',
    lightblue: '#ADD8E6',
    lightcoral: '#F08080',
    lightcyan: '#E0FFFF',
    lightgoldenrodyellow: '#FAFAD2',
    lightgreen: '#90EE90',
    lightgrey: '#D3D3D3',
    lightpink: '#FFB6C1',
    lightsalmon: '#FFA07A',
    lightseagreen: '#20B2AA',
    lightskyblue: '#87CEFA',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#B0C4DE',
    lightyellow: '#FFFFE0',
    limegreen: '#32CD32',
    linen: '#FAF0E6',
    magenta: '#FF00FF',
    mediumaquamarine: '#66CDAA',
    mediumblue: '#0000CD',
    mediumorchid: '#BA55D3',
    mediumpurple: '#9370DB',
    mediumseagreen: '#3CB371',
    mediumslateblue: '#7B68EE',
    mediumspringgreen: '#00FA9A',
    mediumturquoise: '#48D1CC',
    mediumvioletred: '#C71585',
    midnightblue: '#191970',
    mintcream: '#F5FFFA',
    mistyrose: '#FFE4E1',
    moccasin: '#FFE4B5',
    navajowhite: '#FFDEAD',
    oldlace: '#FDF5E6',
    olivedrab: '#6B8E23',
    orange: '#FFA500',
    orangered: '#FF4500',
    orchid: '#DA70D6',
    palegoldenrod: '#EEE8AA',
    palegreen: '#98FB98',
    paleturquoise: '#AFEEEE',
    palevioletred: '#DB7093',
    papayawhip: '#FFEFD5',
    peachpuff: '#FFDAB9',
    peru: '#CD853F',
    pink: '#FFC0CB',
    plum: '#DDA0DD',
    powderblue: '#B0E0E6',
    rosybrown: '#BC8F8F',
    royalblue: '#4169E1',
    saddlebrown: '#8B4513',
    salmon: '#FA8072',
    sandybrown: '#F4A460',
    seagreen: '#2E8B57',
    seashell: '#FFF5EE',
    sienna: '#A0522D',
    skyblue: '#87CEEB',
    slateblue: '#6A5ACD',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#FFFAFA',
    springgreen: '#00FF7F',
    steelblue: '#4682B4',
    tan: '#D2B48C',
    thistle: '#D8BFD8',
    tomato: '#FF6347',
    turquoise: '#40E0D0',
    violet: '#EE82EE',
    wheat: '#F5DEB3',
    whitesmoke: '#F5F5F5',
    yellowgreen: '#9ACD32'
  };


  function getRgbHslContent(styleString) {
    var start = styleString.indexOf('(', 3);
    var end = styleString.indexOf(')', start + 1);
    var parts = styleString.substring(start + 1, end).split(',');
    // add alpha if needed
    if (parts.length != 4 || styleString.charAt(3) != 'a') {
      parts[3] = 1;
    }
    return parts;
  }

  function percent(s) {
    return parseFloat(s) / 100;
  }

  function clamp(v, min, max) {
    return Math.min(max, Math.max(min, v));
  }

  function hslToRgb(parts){
    var r, g, b, h, s, l;
    h = parseFloat(parts[0]) / 360 % 360;
    if (h < 0)
      h++;
    s = clamp(percent(parts[1]), 0, 1);
    l = clamp(percent(parts[2]), 0, 1);
    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hueToRgb(p, q, h + 1 / 3);
      g = hueToRgb(p, q, h);
      b = hueToRgb(p, q, h - 1 / 3);
    }

    return '#' + decToHex[Math.floor(r * 255)] +
        decToHex[Math.floor(g * 255)] +
        decToHex[Math.floor(b * 255)];
  }

  function hueToRgb(m1, m2, h) {
    if (h < 0)
      h++;
    if (h > 1)
      h--;

    if (6 * h < 1)
      return m1 + (m2 - m1) * 6 * h;
    else if (2 * h < 1)
      return m2;
    else if (3 * h < 2)
      return m1 + (m2 - m1) * (2 / 3 - h) * 6;
    else
      return m1;
  }

  var processStyleCache = {};

  function processStyle(styleString) {
    if (styleString in processStyleCache) {
      return processStyleCache[styleString];
    }

    var str, alpha = 1;

    styleString = String(styleString);
    if (styleString.charAt(0) == '#') {
      str = styleString;
    } else if (/^rgb/.test(styleString)) {
      var parts = getRgbHslContent(styleString);
      var str = '#', n;
      for (var i = 0; i < 3; i++) {
        if (parts[i].indexOf('%') != -1) {
          n = Math.floor(percent(parts[i]) * 255);
        } else {
          n = +parts[i];
        }
        str += decToHex[clamp(n, 0, 255)];
      }
      alpha = +parts[3];
    } else if (/^hsl/.test(styleString)) {
      var parts = getRgbHslContent(styleString);
      str = hslToRgb(parts);
      alpha = parts[3];
    } else {
      str = colorData[styleString] || styleString;
    }
    return processStyleCache[styleString] = {color: str, alpha: alpha};
  }

  var DEFAULT_STYLE = {
    style: 'normal',
    variant: 'normal',
    weight: 'normal',
    size: 12,           //10
    family: '微软雅黑'     //'sans-serif'
  };

  // Internal text style cache
  var fontStyleCache = {};

  function processFontStyle(styleString) {
    if (fontStyleCache[styleString]) {
      return fontStyleCache[styleString];
    }

    var el = document.createElement('div');
    var style = el.style;
    var fontFamily;
    try {
      style.font = styleString;
      fontFamily = style.fontFamily.split(',')[0];
    } catch (ex) {
      // Ignore failures to set to invalid font.
    }

    return fontStyleCache[styleString] = {
      style: style.fontStyle || DEFAULT_STYLE.style,
      variant: style.fontVariant || DEFAULT_STYLE.variant,
      weight: style.fontWeight || DEFAULT_STYLE.weight,
      size: style.fontSize || DEFAULT_STYLE.size,
      family: fontFamily || DEFAULT_STYLE.family
    };
  }

  function getComputedStyle(style, element) {
    var computedStyle = {};

    for (var p in style) {
      computedStyle[p] = style[p];
    }

    // Compute the size
    var canvasFontSize = parseFloat(element.currentStyle.fontSize),
        fontSize = parseFloat(style.size);

    if (typeof style.size == 'number') {
      computedStyle.size = style.size;
    } else if (style.size.indexOf('px') != -1) {
      computedStyle.size = fontSize;
    } else if (style.size.indexOf('em') != -1) {
      computedStyle.size = canvasFontSize * fontSize;
    } else if(style.size.indexOf('%') != -1) {
      computedStyle.size = (canvasFontSize / 100) * fontSize;
    } else if (style.size.indexOf('pt') != -1) {
      computedStyle.size = fontSize / .75;
    } else {
      computedStyle.size = canvasFontSize;
    }

    // Different scaling between normal text and VML text. This was found using
    // trial and error to get the same size as non VML text.
    //computedStyle.size *= 0.981;

    return computedStyle;
  }

  function buildStyle(style) {
    return style.style + ' ' + style.variant + ' ' + style.weight + ' ' +
        style.size + "px '" + style.family + "'";
  }

  var lineCapMap = {
    'butt': 'flat',
    'round': 'round'
  };

  function processLineCap(lineCap) {
    return lineCapMap[lineCap] || 'square';
  }

  /**
   * This class implements CanvasRenderingContext2D interface as described by
   * the WHATWG.
   * @param {HTMLElement} canvasElement The element that the 2D context should
   * be associated with
   */
  function CanvasRenderingContext2D_(canvasElement) {
    this.m_ = createMatrixIdentity();

    this.mStack_ = [];
    this.aStack_ = [];
    this.currentPath_ = [];

    // Canvas context properties
    this.strokeStyle = '#000';
    this.fillStyle = '#000';

    this.lineWidth = 1;
    this.lineJoin = 'miter';
    this.lineCap = 'butt';
    this.miterLimit = Z * 1;
    this.globalAlpha = 1;
    // this.font = '10px sans-serif';
    this.font = '12px 微软雅黑';        // 决定还是改这吧，影响代价最小
    this.textAlign = 'left';
    this.textBaseline = 'alphabetic';
    this.canvas = canvasElement;

    var cssText = 'width:' + canvasElement.clientWidth + 'px;height:' +
        canvasElement.clientHeight + 'px;overflow:hidden;position:absolute';
    var el = canvasElement.ownerDocument.createElement('div');
    el.style.cssText = cssText;
    canvasElement.appendChild(el);

    var overlayEl = el.cloneNode(false);
    // Use a non transparent background.
    overlayEl.style.backgroundColor = '#fff'; //red, I don't know why, it work! 
    overlayEl.style.filter = 'alpha(opacity=0)';
    canvasElement.appendChild(overlayEl);

    this.element_ = el;
    this.arcScaleX_ = 1;
    this.arcScaleY_ = 1;
    this.lineScale_ = 1;
  }

  var contextPrototype = CanvasRenderingContext2D_.prototype;
  contextPrototype.clearRect = function() {
    if (this.textMeasureEl_) {
      this.textMeasureEl_.removeNode(true);
      this.textMeasureEl_ = null;
    }
    this.element_.innerHTML = '';
  };

  contextPrototype.beginPath = function() {
    // TODO: Branch current matrix so that save/restore has no effect
    //       as per safari docs.
    this.currentPath_ = [];
  };

  contextPrototype.moveTo = function(aX, aY) {
    var p = getCoords(this, aX, aY);
    this.currentPath_.push({type: 'moveTo', x: p.x, y: p.y});
    this.currentX_ = p.x;
    this.currentY_ = p.y;
  };

  contextPrototype.lineTo = function(aX, aY) {
    var p = getCoords(this, aX, aY);
    this.currentPath_.push({type: 'lineTo', x: p.x, y: p.y});

    this.currentX_ = p.x;
    this.currentY_ = p.y;
  };

  contextPrototype.bezierCurveTo = function(aCP1x, aCP1y,
                                            aCP2x, aCP2y,
                                            aX, aY) {
    var p = getCoords(this, aX, aY);
    var cp1 = getCoords(this, aCP1x, aCP1y);
    var cp2 = getCoords(this, aCP2x, aCP2y);
    bezierCurveTo(this, cp1, cp2, p);
  };

  // Helper function that takes the already fixed cordinates.
  function bezierCurveTo(self, cp1, cp2, p) {
    self.currentPath_.push({
      type: 'bezierCurveTo',
      cp1x: cp1.x,
      cp1y: cp1.y,
      cp2x: cp2.x,
      cp2y: cp2.y,
      x: p.x,
      y: p.y
    });
    self.currentX_ = p.x;
    self.currentY_ = p.y;
  }

  contextPrototype.quadraticCurveTo = function(aCPx, aCPy, aX, aY) {
    // the following is lifted almost directly from
    // http://developer.mozilla.org/en/docs/Canvas_tutorial:Drawing_shapes

    var cp = getCoords(this, aCPx, aCPy);
    var p = getCoords(this, aX, aY);

    var cp1 = {
      x: this.currentX_ + 2.0 / 3.0 * (cp.x - this.currentX_),
      y: this.currentY_ + 2.0 / 3.0 * (cp.y - this.currentY_)
    };
    var cp2 = {
      x: cp1.x + (p.x - this.currentX_) / 3.0,
      y: cp1.y + (p.y - this.currentY_) / 3.0
    };

    bezierCurveTo(this, cp1, cp2, p);
  };

  contextPrototype.arc = function(aX, aY, aRadius,
                                  aStartAngle, aEndAngle, aClockwise) {
    aRadius *= Z;
    var arcType = aClockwise ? 'at' : 'wa';

    var xStart = aX + mc(aStartAngle) * aRadius - Z2;
    var yStart = aY + ms(aStartAngle) * aRadius - Z2;

    var xEnd = aX + mc(aEndAngle) * aRadius - Z2;
    var yEnd = aY + ms(aEndAngle) * aRadius - Z2;

    // IE won't render arches drawn counter clockwise if xStart == xEnd.
    if (xStart == xEnd && !aClockwise) {
      xStart += 0.125; // Offset xStart by 1/80 of a pixel. Use something
                       // that can be represented in binary
    }

    var p = getCoords(this, aX, aY);
    var pStart = getCoords(this, xStart, yStart);
    var pEnd = getCoords(this, xEnd, yEnd);

    this.currentPath_.push({type: arcType,
                           x: p.x,
                           y: p.y,
                           radius: aRadius,
                           xStart: pStart.x,
                           yStart: pStart.y,
                           xEnd: pEnd.x,
                           yEnd: pEnd.y});

  };

  contextPrototype.rect = function(aX, aY, aWidth, aHeight) {
    this.moveTo(aX, aY);
    this.lineTo(aX + aWidth, aY);
    this.lineTo(aX + aWidth, aY + aHeight);
    this.lineTo(aX, aY + aHeight);
    this.closePath();
  };

  contextPrototype.strokeRect = function(aX, aY, aWidth, aHeight) {
    var oldPath = this.currentPath_;
    this.beginPath();

    this.moveTo(aX, aY);
    this.lineTo(aX + aWidth, aY);
    this.lineTo(aX + aWidth, aY + aHeight);
    this.lineTo(aX, aY + aHeight);
    this.closePath();
    this.stroke();

    this.currentPath_ = oldPath;
  };

  contextPrototype.fillRect = function(aX, aY, aWidth, aHeight) {
    var oldPath = this.currentPath_;
    this.beginPath();

    this.moveTo(aX, aY);
    this.lineTo(aX + aWidth, aY);
    this.lineTo(aX + aWidth, aY + aHeight);
    this.lineTo(aX, aY + aHeight);
    this.closePath();
    this.fill();

    this.currentPath_ = oldPath;
  };

  contextPrototype.createLinearGradient = function(aX0, aY0, aX1, aY1) {
    var gradient = new CanvasGradient_('gradient');
    gradient.x0_ = aX0;
    gradient.y0_ = aY0;
    gradient.x1_ = aX1;
    gradient.y1_ = aY1;
    return gradient;
  };

  contextPrototype.createRadialGradient = function(aX0, aY0, aR0,
                                                   aX1, aY1, aR1) {
    var gradient = new CanvasGradient_('gradientradial');
    gradient.x0_ = aX0;
    gradient.y0_ = aY0;
    gradient.r0_ = aR0;
    gradient.x1_ = aX1;
    gradient.y1_ = aY1;
    gradient.r1_ = aR1;
    return gradient;
  };

  contextPrototype.drawImage = function(image, var_args) {
    var dx, dy, dw, dh, sx, sy, sw, sh;

    // to find the original width we overide the width and height
    var oldRuntimeWidth = image.runtimeStyle.width;
    var oldRuntimeHeight = image.runtimeStyle.height;
    image.runtimeStyle.width = 'auto';
    image.runtimeStyle.height = 'auto';

    // get the original size
    var w = image.width;
    var h = image.height;

    // and remove overides
    image.runtimeStyle.width = oldRuntimeWidth;
    image.runtimeStyle.height = oldRuntimeHeight;

    if (arguments.length == 3) {
      dx = arguments[1];
      dy = arguments[2];
      sx = sy = 0;
      sw = dw = w;
      sh = dh = h;
    } else if (arguments.length == 5) {
      dx = arguments[1];
      dy = arguments[2];
      dw = arguments[3];
      dh = arguments[4];
      sx = sy = 0;
      sw = w;
      sh = h;
    } else if (arguments.length == 9) {
      sx = arguments[1];
      sy = arguments[2];
      sw = arguments[3];
      sh = arguments[4];
      dx = arguments[5];
      dy = arguments[6];
      dw = arguments[7];
      dh = arguments[8];
    } else {
      throw Error('Invalid number of arguments');
    }

    var d = getCoords(this, dx, dy);

    var w2 = sw / 2;
    var h2 = sh / 2;

    var vmlStr = [];

    var W = 10;
    var H = 10;

    var scaleX = scaleY = 1;
    
    // For some reason that I've now forgotten, using divs didn't work
    vmlStr.push(' <g_vml_:group',
                ' coordsize="', Z * W, ',', Z * H, '"',
                ' coordorigin="0,0"' ,
                ' style="width:', W, 'px;height:', H, 'px;position:absolute;');

    // If filters are necessary (rotation exists), create them
    // filters are bog-slow, so only create them if abbsolutely necessary
    // The following check doesn't account for skews (which don't exist
    // in the canvas spec (yet) anyway.

    if (this.m_[0][0] != 1 || this.m_[0][1] ||
        this.m_[1][1] != 1 || this.m_[1][0]) {
      var filter = [];

      scaleX = Math.sqrt(this.m_[0][0] * this.m_[0][0] + this.m_[0][1] * this.m_[0][1]);
      scaleY = Math.sqrt(this.m_[1][0] * this.m_[1][0] + this.m_[1][1] * this.m_[1][1]);

      // Note the 12/21 reversal
      filter.push('M11=', this.m_[0][0] / scaleX, ',',
                  'M12=', this.m_[1][0] / scaleY, ',',
                  'M21=', this.m_[0][1] / scaleX, ',',
                  'M22=', this.m_[1][1] / scaleY, ',',
                  'Dx=', mr(d.x / Z), ',',
                  'Dy=', mr(d.y / Z), '');

      // Bounding box calculation (need to minimize displayed area so that
      // filters don't waste time on unused pixels.
      var max = d;
      var c2 = getCoords(this, dx + dw, dy);
      var c3 = getCoords(this, dx, dy + dh);
      var c4 = getCoords(this, dx + dw, dy + dh);

      max.x = m.max(max.x, c2.x, c3.x, c4.x);
      max.y = m.max(max.y, c2.y, c3.y, c4.y);

      vmlStr.push('padding:0 ', mr(max.x / Z), 'px ', mr(max.y / Z),
                  'px 0;filter:progid:DXImageTransform.Microsoft.Matrix(',
                  filter.join(''), ", sizingmethod='clip');");

    } else {
      vmlStr.push('top:', mr(d.y / Z), 'px;left:', mr(d.x / Z), 'px;');
    }

    vmlStr.push(' ">');

    // Draw a special cropping div if needed
    if (sx || sy) {
      // Apply scales to width and height
      vmlStr.push('<div style="overflow: hidden; width:', Math.ceil((dw + sx * dw / sw) * scaleX), 'px;',
                  ' height:', Math.ceil((dh + sy * dh / sh) * scaleY), 'px;',
                  ' filter:progid:DxImageTransform.Microsoft.Matrix(Dx=',
                  -sx * dw / sw * scaleX, ',Dy=', -sy * dh / sh * scaleY, ');">');
    }
    
      
    // Apply scales to width and height
    vmlStr.push('<div style="width:', Math.round(scaleX * w * dw / sw), 'px;',
                ' height:', Math.round(scaleY * h * dh / sh), 'px;',
                ' filter:');
   
    // If there is a globalAlpha, apply it to image
    if(this.globalAlpha < 1) {
      vmlStr.push(' progid:DXImageTransform.Microsoft.Alpha(opacity=' + (this.globalAlpha * 100) + ')');
    }
    
    vmlStr.push(' progid:DXImageTransform.Microsoft.AlphaImageLoader(src=', image.src, ',sizingMethod=scale)">');
    
    // Close the crop div if necessary            
    if (sx || sy) vmlStr.push('</div>');
    
    vmlStr.push('</div></div>');
    
    this.element_.insertAdjacentHTML('BeforeEnd', vmlStr.join(''));
  };

  contextPrototype.stroke = function(aFill) {
    var lineStr = [];
    var lineOpen = false;

    var W = 10;
    var H = 10;

    lineStr.push('<g_vml_:shape',
                 ' filled="', !!aFill, '"',
                 ' style="position:absolute;width:', W, 'px;height:', H, 'px;"',
                 ' coordorigin="0,0"',
                 ' coordsize="', Z * W, ',', Z * H, '"',
                 ' stroked="', !aFill, '"',
                 ' path="');

    var newSeq = false;
    var min = {x: null, y: null};
    var max = {x: null, y: null};

    for (var i = 0; i < this.currentPath_.length; i++) {
      var p = this.currentPath_[i];
      var c;

      switch (p.type) {
        case 'moveTo':
          c = p;
          lineStr.push(' m ', mr(p.x), ',', mr(p.y));
          break;
        case 'lineTo':
          lineStr.push(' l ', mr(p.x), ',', mr(p.y));
          break;
        case 'close':
          lineStr.push(' x ');
          p = null;
          break;
        case 'bezierCurveTo':
          lineStr.push(' c ',
                       mr(p.cp1x), ',', mr(p.cp1y), ',',
                       mr(p.cp2x), ',', mr(p.cp2y), ',',
                       mr(p.x), ',', mr(p.y));
          break;
        case 'at':
        case 'wa':
          lineStr.push(' ', p.type, ' ',
                       mr(p.x - this.arcScaleX_ * p.radius), ',',
                       mr(p.y - this.arcScaleY_ * p.radius), ' ',
                       mr(p.x + this.arcScaleX_ * p.radius), ',',
                       mr(p.y + this.arcScaleY_ * p.radius), ' ',
                       mr(p.xStart), ',', mr(p.yStart), ' ',
                       mr(p.xEnd), ',', mr(p.yEnd));
          break;
      }


      // TODO: Following is broken for curves due to
      //       move to proper paths.

      // Figure out dimensions so we can do gradient fills
      // properly
      if (p) {
        if (min.x == null || p.x < min.x) {
          min.x = p.x;
        }
        if (max.x == null || p.x > max.x) {
          max.x = p.x;
        }
        if (min.y == null || p.y < min.y) {
          min.y = p.y;
        }
        if (max.y == null || p.y > max.y) {
          max.y = p.y;
        }
      }
    }
    lineStr.push(' ">');

    if (!aFill) {
      appendStroke(this, lineStr);
    } else {
      appendFill(this, lineStr, min, max);
    }

    lineStr.push('</g_vml_:shape>');

    this.element_.insertAdjacentHTML('beforeEnd', lineStr.join(''));
  };

  function appendStroke(ctx, lineStr) {
    var a = processStyle(ctx.strokeStyle);
    var color = a.color;
    var opacity = a.alpha * ctx.globalAlpha;
    var lineWidth = ctx.lineScale_ * ctx.lineWidth;

    // VML cannot correctly render a line if the width is less than 1px.
    // In that case, we dilute the color to make the line look thinner.
    if (lineWidth < 1) {
      opacity *= lineWidth;
    }

    lineStr.push(
      '<g_vml_:stroke',
      ' opacity="', opacity, '"',
      ' joinstyle="', ctx.lineJoin, '"',
      ' miterlimit="', ctx.miterLimit, '"',
      ' endcap="', processLineCap(ctx.lineCap), '"',
      ' weight="', lineWidth, 'px"',
      ' color="', color, '" />'
    );
  }

  function appendFill(ctx, lineStr, min, max) {
    var fillStyle = ctx.fillStyle;
    var arcScaleX = ctx.arcScaleX_;
    var arcScaleY = ctx.arcScaleY_;
    var width = max.x - min.x;
    var height = max.y - min.y;
    if (fillStyle instanceof CanvasGradient_) {
      // TODO: Gradients transformed with the transformation matrix.
      var angle = 0;
      var focus = {x: 0, y: 0};

      // additional offset
      var shift = 0;
      // scale factor for offset
      var expansion = 1;

      if (fillStyle.type_ == 'gradient') {
        var x0 = fillStyle.x0_ / arcScaleX;
        var y0 = fillStyle.y0_ / arcScaleY;
        var x1 = fillStyle.x1_ / arcScaleX;
        var y1 = fillStyle.y1_ / arcScaleY;
        var p0 = getCoords(ctx, x0, y0);
        var p1 = getCoords(ctx, x1, y1);
        var dx = p1.x - p0.x;
        var dy = p1.y - p0.y;
        angle = Math.atan2(dx, dy) * 180 / Math.PI;

        // The angle should be a non-negative number.
        if (angle < 0) {
          angle += 360;
        }

        // Very small angles produce an unexpected result because they are
        // converted to a scientific notation string.
        if (angle < 1e-6) {
          angle = 0;
        }
      } else {
        var p0 = getCoords(ctx, fillStyle.x0_, fillStyle.y0_);
        focus = {
          x: (p0.x - min.x) / width,
          y: (p0.y - min.y) / height
        };

        width  /= arcScaleX * Z;
        height /= arcScaleY * Z;
        var dimension = m.max(width, height);
        shift = 2 * fillStyle.r0_ / dimension;
        expansion = 2 * fillStyle.r1_ / dimension - shift;
      }

      // We need to sort the color stops in ascending order by offset,
      // otherwise IE won't interpret it correctly.
      var stops = fillStyle.colors_;
      stops.sort(function(cs1, cs2) {
        return cs1.offset - cs2.offset;
      });

      var length = stops.length;
      var color1 = stops[0].color;
      var color2 = stops[length - 1].color;
      var opacity1 = stops[0].alpha * ctx.globalAlpha;
      var opacity2 = stops[length - 1].alpha * ctx.globalAlpha;

      var colors = [];
      for (var i = 0; i < length; i++) {
        var stop = stops[i];
        colors.push(stop.offset * expansion + shift + ' ' + stop.color);
      }

      // When colors attribute is used, the meanings of opacity and o:opacity2
      // are reversed.
      lineStr.push('<g_vml_:fill type="', fillStyle.type_, '"',
                   ' method="none" focus="100%"',
                   ' color="', color1, '"',
                   ' color2="', color2, '"',
                   ' colors="', colors.join(','), '"',
                   ' opacity="', opacity2, '"',
                   ' g_o_:opacity2="', opacity1, '"',
                   ' angle="', angle, '"',
                   ' focusposition="', focus.x, ',', focus.y, '" />');
    } else if (fillStyle instanceof CanvasPattern_) {
      if (width && height) {
        var deltaLeft = -min.x;
        var deltaTop = -min.y;
        lineStr.push('<g_vml_:fill',
                     ' position="',
                     deltaLeft / width * arcScaleX * arcScaleX, ',',
                     deltaTop / height * arcScaleY * arcScaleY, '"',
                     ' type="tile"',
                     // TODO: Figure out the correct size to fit the scale.
                     //' size="', w, 'px ', h, 'px"',
                     ' src="', fillStyle.src_, '" />');
       }
    } else {
      var a = processStyle(ctx.fillStyle);
      var color = a.color;
      var opacity = a.alpha * ctx.globalAlpha;
      lineStr.push('<g_vml_:fill color="', color, '" opacity="', opacity,
                   '" />');
    }
  }

  contextPrototype.fill = function() {
    this.stroke(true);
  };

  contextPrototype.closePath = function() {
    this.currentPath_.push({type: 'close'});
  };

  function getCoords(ctx, aX, aY) {
    var m = ctx.m_;
    return {
      x: Z * (aX * m[0][0] + aY * m[1][0] + m[2][0]) - Z2,
      y: Z * (aX * m[0][1] + aY * m[1][1] + m[2][1]) - Z2
    };
  };

  contextPrototype.save = function() {
    var o = {};
    copyState(this, o);
    this.aStack_.push(o);
    this.mStack_.push(this.m_);
    this.m_ = matrixMultiply(createMatrixIdentity(), this.m_);
  };

  contextPrototype.restore = function() {
    if (this.aStack_.length) {
      copyState(this.aStack_.pop(), this);
      this.m_ = this.mStack_.pop();
    }
  };

  function matrixIsFinite(m) {
    return isFinite(m[0][0]) && isFinite(m[0][1]) &&
        isFinite(m[1][0]) && isFinite(m[1][1]) &&
        isFinite(m[2][0]) && isFinite(m[2][1]);
  }

  function setM(ctx, m, updateLineScale) {
    if (!matrixIsFinite(m)) {
      return;
    }
    ctx.m_ = m;

    if (updateLineScale) {
      // Get the line scale.
      // Determinant of this.m_ means how much the area is enlarged by the
      // transformation. So its square root can be used as a scale factor
      // for width.
      var det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
      ctx.lineScale_ = sqrt(abs(det));
    }
  }

  contextPrototype.translate = function(aX, aY) {
    var m1 = [
      [1,  0,  0],
      [0,  1,  0],
      [aX, aY, 1]
    ];

    setM(this, matrixMultiply(m1, this.m_), false);
  };

  contextPrototype.rotate = function(aRot) {
    var c = mc(aRot);
    var s = ms(aRot);

    var m1 = [
      [c,  s, 0],
      [-s, c, 0],
      [0,  0, 1]
    ];

    setM(this, matrixMultiply(m1, this.m_), false);
  };

  contextPrototype.scale = function(aX, aY) {
    this.arcScaleX_ *= aX;
    this.arcScaleY_ *= aY;
    var m1 = [
      [aX, 0,  0],
      [0,  aY, 0],
      [0,  0,  1]
    ];

    setM(this, matrixMultiply(m1, this.m_), true);
  };

  contextPrototype.transform = function(m11, m12, m21, m22, dx, dy) {
    var m1 = [
      [m11, m12, 0],
      [m21, m22, 0],
      [dx,  dy,  1]
    ];

    setM(this, matrixMultiply(m1, this.m_), true);
  };

  contextPrototype.setTransform = function(m11, m12, m21, m22, dx, dy) {
    var m = [
      [m11, m12, 0],
      [m21, m22, 0],
      [dx,  dy,  1]
    ];

    setM(this, m, true);
  };

  /**
   * The text drawing function.
   * The maxWidth argument isn't taken in account, since no browser supports
   * it yet.
   */
  contextPrototype.drawText_ = function(text, x, y, maxWidth, stroke) {
    var m = this.m_,
        delta = 1000,
        left = 0,
        right = delta,
        offset = {x: 0, y: 0},
        lineStr = [];

    var fontStyle = getComputedStyle(processFontStyle(this.font),
                                     this.element_);

    var fontStyleString = buildStyle(fontStyle);

    var elementStyle = this.element_.currentStyle;
    var textAlign = this.textAlign.toLowerCase();
    switch (textAlign) {
      case 'left':
      case 'center':
      case 'right':
        break;
      case 'end':
        textAlign = elementStyle.direction == 'ltr' ? 'right' : 'left';
        break;
      case 'start':
        textAlign = elementStyle.direction == 'rtl' ? 'right' : 'left';
        break;
      default:
        textAlign = 'left';
    }

    // 1.75 is an arbitrary number, as there is no info about the text baseline
    switch (this.textBaseline) {
      case 'hanging':
      case 'top':
        offset.y = fontStyle.size / 1.75;
        break;
      case 'middle':
        break;
      default:
      case null:
      case 'alphabetic':
      case 'ideographic':
      case 'bottom':
        offset.y = -fontStyle.size / 2.25;
        break;
    }

    switch(textAlign) {
      case 'right':
        left = delta;
        right = 0.05;
        break;
      case 'center':
        left = right = delta / 2;
        break;
    }

    var d = getCoords(this, x + offset.x, y + offset.y);

    lineStr.push('<g_vml_:line from="', -left ,' 0" to="', right ,' 0.05" ',
                 ' coordsize="100 100" coordorigin="0 0"',
                 ' filled="', !stroke, '" stroked="', !!stroke,
                 '" style="position:absolute;width:1px;height:1px;">');

    if (stroke) {
      appendStroke(this, lineStr);
    } else {
      // TODO: Fix the min and max params.
      appendFill(this, lineStr, {x: -left, y: 0},
                 {x: right, y: fontStyle.size});
    }

    var skewM = m[0][0].toFixed(3) + ',' + m[1][0].toFixed(3) + ',' +
                m[0][1].toFixed(3) + ',' + m[1][1].toFixed(3) + ',0,0';

    var skewOffset = mr(d.x / Z) + ',' + mr(d.y / Z);

    lineStr.push('<g_vml_:skew on="t" matrix="', skewM ,'" ',
                 ' offset="', skewOffset, '" origin="', left ,' 0" />',
                 '<g_vml_:path textpathok="true" />',
                 '<g_vml_:textpath on="true" string="',
                 encodeHtmlAttribute(text),
                 '" style="v-text-align:', textAlign,
                 ';font:', encodeHtmlAttribute(fontStyleString),
                 '" /></g_vml_:line>');

    this.element_.insertAdjacentHTML('beforeEnd', lineStr.join(''));
  };

  contextPrototype.fillText = function(text, x, y, maxWidth) {
    this.drawText_(text, x, y, maxWidth, false);
  };

  contextPrototype.strokeText = function(text, x, y, maxWidth) {
    this.drawText_(text, x, y, maxWidth, true);
  };

  contextPrototype.measureText = function(text) {
    if (!this.textMeasureEl_) {
      var s = '<span style="position:absolute;' +
          'top:-20000px;left:0;padding:0;margin:0;border:none;' +
          'white-space:pre;"></span>';
      this.element_.insertAdjacentHTML('beforeEnd', s);
      this.textMeasureEl_ = this.element_.lastChild;
    }
    var doc = this.element_.ownerDocument;
    this.textMeasureEl_.innerHTML = '';
    this.textMeasureEl_.style.font = this.font;
    // Don't use innerHTML or innerText because they allow markup/whitespace.
    this.textMeasureEl_.appendChild(doc.createTextNode(text));
    return {width: this.textMeasureEl_.offsetWidth};
  };

  /******** STUBS ********/
  contextPrototype.clip = function() {
    // TODO: Implement
  };

  contextPrototype.arcTo = function() {
    // TODO: Implement
  };

  contextPrototype.createPattern = function(image, repetition) {
    return new CanvasPattern_(image, repetition);
  };

  // Gradient / Pattern Stubs
  function CanvasGradient_(aType) {
    this.type_ = aType;
    this.x0_ = 0;
    this.y0_ = 0;
    this.r0_ = 0;
    this.x1_ = 0;
    this.y1_ = 0;
    this.r1_ = 0;
    this.colors_ = [];
  }

  CanvasGradient_.prototype.addColorStop = function(aOffset, aColor) {
    aColor = processStyle(aColor);
    this.colors_.push({offset: aOffset,
                       color: aColor.color,
                       alpha: aColor.alpha});
  };

  function CanvasPattern_(image, repetition) {
    assertImageIsValid(image);
    switch (repetition) {
      case 'repeat':
      case null:
      case '':
        this.repetition_ = 'repeat';
        break
      case 'repeat-x':
      case 'repeat-y':
      case 'no-repeat':
        this.repetition_ = repetition;
        break;
      default:
        throwException('SYNTAX_ERR');
    }

    this.src_ = image.src;
    this.width_ = image.width;
    this.height_ = image.height;
  }

  function throwException(s) {
    throw new DOMException_(s);
  }

  function assertImageIsValid(img) {
    if (!img || img.nodeType != 1 || img.tagName != 'IMG') {
      throwException('TYPE_MISMATCH_ERR');
    }
    if (img.readyState != 'complete') {
      throwException('INVALID_STATE_ERR');
    }
  }

  function DOMException_(s) {
    this.code = this[s];
    this.message = s +': DOM Exception ' + this.code;
  }
  var p = DOMException_.prototype = new Error;
  p.INDEX_SIZE_ERR = 1;
  p.DOMSTRING_SIZE_ERR = 2;
  p.HIERARCHY_REQUEST_ERR = 3;
  p.WRONG_DOCUMENT_ERR = 4;
  p.INVALID_CHARACTER_ERR = 5;
  p.NO_DATA_ALLOWED_ERR = 6;
  p.NO_MODIFICATION_ALLOWED_ERR = 7;
  p.NOT_FOUND_ERR = 8;
  p.NOT_SUPPORTED_ERR = 9;
  p.INUSE_ATTRIBUTE_ERR = 10;
  p.INVALID_STATE_ERR = 11;
  p.SYNTAX_ERR = 12;
  p.INVALID_MODIFICATION_ERR = 13;
  p.NAMESPACE_ERR = 14;
  p.INVALID_ACCESS_ERR = 15;
  p.VALIDATION_ERR = 16;
  p.TYPE_MISMATCH_ERR = 17;

  // set up externs
  G_vmlCanvasManager = G_vmlCanvasManager_;
  CanvasRenderingContext2D = CanvasRenderingContext2D_;
  CanvasGradient = CanvasGradient_;
  CanvasPattern = CanvasPattern_;
  DOMException = DOMException_;
})();

} // if
else { // make the canvas test simple by kener.linfeng@gmail.com
    G_vmlCanvasManager = false;
}
return G_vmlCanvasManager;
}); // define;
/**
 * zrender: 向量操作类
 *
 * author : lang(shenyi01@baidu.com)
 */
define(
    'zrender/tool/vector',[],function() {
        var ArrayCtor
            = typeof Float32Array === 'undefined'
            ? Array
            : Float32Array;
        var vector = {
            create : function(x, y) {
                var out = new ArrayCtor(2);
                out[0] = x || 0;
                out[1] = y || 0;
                return out;
            },
            copy : function(out, v) {
                out[0] = v[0];
                out[1] = v[1];
            },
            set : function(out, a, b) {
                out[0] = a;
                out[1] = b;
            },
            add : function(out, v1, v2) {
                out[0] = v1[0] + v2[0];
                out[1] = v1[1] + v2[1];
                return out;
            },
            scaleAndAdd : function(out, v1, v2, a) {
                out[0] = v1[0] + v2[0] * a;
                out[1] = v1[1] + v2[1] * a;
                return out;
            },
            sub : function(out, v1, v2) {
                out[0] = v1[0] - v2[0];
                out[1] = v1[1] - v2[1];
                return out;
            },
            length : function(v) {
                return Math.sqrt(this.lengthSquare(v));
            },
            lengthSquare : function(v) {
                return v[0] * v[0] + v[1] * v[1];
            },
            mul : function(out, v1, v2) {
                out[0] = v1[0] * v2[0];
                out[1] = v1[1] * v2[1];
                return out;
            },
            dot : function(v1, v2) {
                return v1[0] * v2[0] + v1[1] * v2[1];
            },
            scale : function(out, v, s) {
                out[0] = v[0] * s;
                out[1] = v[1] * s;
                return out;
            },
            normalize : function(out, v) {
                var d = vector.length(v);
                if(d === 0){
                    out[0] = 0;
                    out[1] = 0;
                }else{
                    out[0] = v[0]/d;
                    out[1] = v[1]/d;
                }
                return out;
            },
            distance : function(v1, v2) {
                return Math.sqrt(
                    (v1[0] - v2[0]) * (v1[0] - v2[0]) +
                    (v1[1] - v2[1]) * (v1[1] - v2[1])
                );
            },
            negate : function(out, v) {
                out[0] = -v[0];
                out[1] = -v[1];
            },
            middle : function(out, v1, v2) {
                out[0] = (v1[0] + v2[0])/2;
                out[1] = (v1[1] + v2[1])/2;
                return out;
            }
        };

        return vector;
    }
);
/**
 * zrender: 公共辅助函数
 *
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 *
 * clone：深度克隆
 * merge：合并源对象的属性到目标对象
 * getContext：获取一个自由使用的canvas 2D context，使用原生方法，如isPointInPath，measureText等
 */
define(
    'zrender/tool/util',['require','./vector','../lib/excanvas'],function(require) {

        var vec2 = require('./vector');

        /**
         * 对一个object进行深度拷贝
         *
         * @param {Any} source 需要进行拷贝的对象
         * @return {Any} 拷贝后的新对象
         */
        function clone(source) {
            // buildInObject, 用于处理无法遍历Date等对象的问题
            var buildInObject = {
                '[object Function]': 1,
                '[object RegExp]': 1,
                '[object Date]': 1,
                '[object Error]': 1,
                '[object CanvasGradient]': 1
            };
            var result = source;
            var i;
            var len;
            if (!source
                || source instanceof Number
                || source instanceof String
                || source instanceof Boolean
            ) {
                return result;
            }
            else if (source instanceof Array) {
                result = [];
                var resultLen = 0;
                for (i = 0, len = source.length; i < len; i++) {
                    result[resultLen++] = this.clone(source[i]);
                }
            }
            else if ('object' == typeof source) {
                if(buildInObject[Object.prototype.toString.call(source)]
                   || source.__nonRecursion
                ) {
                    return result;
                }
                result = {};
                for (i in source) {
                    if (source.hasOwnProperty(i)) {
                        result[i] = this.clone(source[i]);
                    }
                }
            }
            return result;
        }

        /**
         * 合并源对象的属性到目标对象
         * modify from Tangram
         * @param {*} target 目标对象
         * @param {*} source 源对象
         * @param {Object} optOptions 选项
         * @param {boolean} optOptions.overwrite 是否覆盖
         * @param {boolean} optOptions.recursive 是否递归
         * @param {boolean} optOptions.whiteList 白名单，如果定义，则仅处理白名单属性
         */
        var merge = (function() {
            // buildInObject, 用于处理无法遍历Date等对象的问题
            var buildInObject = {
                '[object Function]': 1,
                '[object RegExp]': 1,
                '[object Date]': 1,
                '[object Error]': 1,
                '[object CanvasGradient]': 1
            };
            function mergeItem(target, source, index, overwrite, recursive) {
                if (source.hasOwnProperty(index)) {
                    if (recursive
                        && typeof target[index] == 'object'
                        && buildInObject[
                            Object.prototype.toString.call(target[index])
                        ] != 1
                    ) {
                        // 如果需要递归覆盖，就递归调用merge
                        merge(
                            target[index],
                            source[index],
                            {
                                'overwrite': overwrite,
                                'recursive': recursive
                            }
                        );
                    } else if (overwrite || !(index in target)) {
                        // 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
                        target[index] = source[index];
                    }
                }
            }

            return function(target, source, optOptions){
                var i = 0;
                var options = optOptions || {};
                var overwrite = options['overwrite'];
                var whiteList = options['whiteList'];
                var recursive = options['recursive'];
                var len;

                // 只处理在白名单中的属性
                if (whiteList && whiteList.length) {
                    len = whiteList.length;
                    for (; i < len; ++i) {
                        mergeItem(
                            target, source, whiteList[i], overwrite, recursive
                        );
                    }
                } else {
                    for (i in source) {
                        mergeItem(target, source, i, overwrite, recursive);
                    }
                }
                return target;
            };
        })();

        /**
         * 简化版的merge操作，舍去很多判断
         * @param  {*} target   
         * @param  {*} source   
         * @param  {boolean} overwrite
         * @param  {boolean} recursive     
         */
        function mergeFast(target, source, overwrite, recursive) {
            if (!target || !source) {
                return;
            }
            if (source instanceof Object) {
                for (var name in source) {
                    if (source.hasOwnProperty(name)) {
                        if (
                            source[name] instanceof Object 
                            && recursive
                            && target[name]
                        ) {
                            mergeFast(
                                target[name],
                                source[name],
                                overwrite,
                                recursive
                            );
                        } else {
                            if (
                                overwrite
                                || !target.hasOwnProperty(name)
                            ) {
                                target[name] = source[name];
                            }
                        }
                    }
                }
            }
        }

        var _ctx;

        function getContext() {
            if (!_ctx) {
                require('../lib/excanvas');
                if (G_vmlCanvasManager) {
                    var _div = document.createElement('div');
                    _div.style.position = 'absolute';
                    _div.style.top = '-1000px';
                    document.body.appendChild(_div);

                    _ctx = G_vmlCanvasManager.initElement(_div)
                               .getContext('2d');
                }
                else {
                    _ctx = document.createElement('canvas').getContext('2d');
                }
            }
            return _ctx;
        }

        var _canvas;
        var _pixelCtx;
        var _width;
        var _height;
        var _offsetX = 0;
        var _offsetY = 0;

        /**
         * 获取像素拾取专用的上下文
         * @return {Object} 上下文
         */
        function getPixelContext() {
            if (!_pixelCtx) {
                _canvas = document.createElement('canvas');
                _width = _canvas.width;
                _height = _canvas.height;
                _pixelCtx = _canvas.getContext('2d');
            }
            return _pixelCtx;
        }

        /**
         * 如果坐标处在_canvas外部，改变_canvas的大小
         * @param {number} x : 横坐标
         * @param {number} y : 纵坐标
         * 注意 修改canvas的大小 需要重新设置translate
         */
        function adjustCanvasSize(x, y) {
            // 每次加的长度
            var _v = 100;
            var _flag = false;

            if (x + _offsetX > _width) {
                _width = x + _offsetX + _v;
                _canvas.width = _width;
                _flag = true;
            }

            if (y + _offsetY > _height) {
                _height = y + _offsetY + _v;
                _canvas.height = _height;
                _flag = true;
            }

            if (x < -_offsetX) {
                _offsetX = Math.ceil(-x / _v) * _v;
                _width += _offsetX;
                _canvas.width = _width;
                _flag = true;
            }

            if (y < -_offsetY) {
                _offsetY = Math.ceil(-y / _v) * _v;
                _height += _offsetY;
                _canvas.height = _height;
                _flag = true;
            }

            if (_flag) {
                _pixelCtx.translate(_offsetX, _offsetY);
            }
        }

        /**
         * 获取像素canvas的偏移量
         * @return {Object} 偏移量
         */
        function getPixelOffset() {
            return {
                x : _offsetX,
                y : _offsetY
            };
        }

        /**
         * 查询数组中元素的index
         */
        function indexOf(array, value){
            if (array.indexOf) {
                return array.indexOf(value);
            }
            for(var i = 0, len=array.length; i<len; i++) {
                if (array[i] === value) {
                    return i;
                }
            }
            return -1;
        }

        /**
         * 计算包围盒
         */
        function computeBoundingBox(points, min, max) {
            if (points.length === 0) {
                return;
            }
            var left = points[0][0];
            var right = points[0][0];
            var top = points[0][1];
            var bottom = points[0][1];
            
            for (var i = 1; i < points.length; i++) {
                var p = points[i];
                if (p[0] < left) {
                    left = p[0];
                }
                if (p[0] > right) {
                    right = p[0];
                }
                if (p[1] < top) {
                    top = p[1];
                }
                if (p[1] > bottom) {
                    bottom = p[1];
                }
            }

            min[0] = left;
            min[1] = top;
            max[0] = right;
            max[1] = bottom;
        }

        /**
         * 计算三阶贝塞尔曲线的包围盒
         * http://pissang.net/blog/?p=91
         */
        function computeCubeBezierBoundingBox(p0, p1, p2, p3, min, max) {
            var xDim = _computeCubeBezierExtremitiesDim(
                p0[0], p1[0], p2[0], p3[0]
            );
            var yDim = _computeCubeBezierExtremitiesDim(
                p0[1], p1[1], p2[1], p3[1]
            );

            xDim.push(p0[0], p3[0]);
            yDim.push(p0[1], p3[1]);

            var left = Math.min.apply(null, xDim);
            var right = Math.max.apply(null, xDim);
            var top = Math.min.apply(null, yDim);
            var bottom = Math.max.apply(null, yDim);

            min[0] = left;
            min[1] = top;
            max[0] = right;
            max[1] = bottom;
        }

        function _computeCubeBezierExtremitiesDim(p0, p1, p2, p3) {
            var extremities = [];

            var b = 6 * p2 - 12 * p1 + 6 * p0;
            var a = 9 * p1 + 3 * p3 - 3 * p0 - 9 * p2;
            var c = 3 * p1 - 3 * p0;

            var tmp = b * b - 4 * a * c;
            if (tmp > 0){
                var tmpSqrt = Math.sqrt(tmp);
                var t1 = (-b + tmpSqrt) / (2 * a);
                var t2 = (-b - tmpSqrt) / (2 * a);
                extremities.push(t1, t2);
            } else if (tmp === 0) {
                extremities.push(-b / (2 * a));
            }
            var result = [];
            for (var i = 0; i < extremities.length; i++) {
                var t = extremities[i];
                if (Math.abs(2 * a * t + b) > 0.0001 && t < 1 && t > 0) {
                    var ct = 1 - t;
                    var val = ct * ct * ct * p0 
                            + 3 * ct * ct * t * p1
                            + 3 * ct * t * t * p2
                            + t * t *t * p3;

                    result.push(val);
                }
            }

            return result;
        }

        /**
         * 计算二阶贝塞尔曲线的包围盒
         * http://pissang.net/blog/?p=91
         */
        function computeQuadraticBezierBoundingBox(p0, p1, p2, min, max) {
            // Find extremities, where derivative in x dim or y dim is zero
            var tmp = (p0[0] + p2[0] - 2 * p1[0]);
            // p1 is center of p0 and p2 in x dim
            var t1;
            if (tmp === 0) {
                t1 = 0.5;
            } else {
                t1 = (p0[0] - p1[0]) / tmp;
            }

            tmp = (p0[1] + p2[1] - 2 * p1[1]);
            // p1 is center of p0 and p2 in y dim
            var t2;
            if (tmp === 0) {
                t2 = 0.5;
            } else {
                t2 = (p0[1] - p1[1]) / tmp;
            }

            t1 = Math.max(Math.min(t1, 1), 0);
            t2 = Math.max(Math.min(t2, 1), 0);

            var ct1 = 1-t1;
            var ct2 = 1-t2;

            var x1 = ct1 * ct1 * p0[0] 
                     + 2 * ct1 * t1 * p1[0] 
                     + t1 * t1 * p2[0];
            var y1 = ct1 * ct1 * p0[1] 
                     + 2 * ct1 * t1 * p1[1] 
                     + t1 * t1 * p2[1];

            var x2 = ct2 * ct2 * p0[0] 
                     + 2 * ct2 * t2 * p1[0] 
                     + t2 * t2 * p2[0];
            var y2 = ct2 * ct2 * p0[1] 
                     + 2 * ct2 * t2 * p1[1] 
                     + t2 * t2 * p2[1];

            return computeBoundingBox(
                        [p0.slice(), p2.slice(), [x1, y1], [x2, y2]],
                        min, max
                    );
        }


        /**
         * 计算圆弧的包围盒
         * http://pissang.net/blog/?p=91
         */
        var computeArcBoundingBox = (function(){
            var start = [];
            var end = [];
            // At most 4 extremities
            var extremities = [[], [], [], []];
            return function(
                center, radius, startAngle, endAngle, clockwise, min, max
            ) {
                clockwise = clockwise ? 1 : -1;
                start[0] = Math.cos(startAngle);
                start[1] = Math.sin(startAngle) * clockwise;
                vec2.scale(start, start, radius);
                vec2.add(start, start, center);

                end[0] = Math.cos(endAngle);
                end[1] = Math.sin(endAngle) * clockwise;
                vec2.scale(end, end, radius);
                vec2.add(end, end, center);
                
                startAngle = startAngle % (Math.PI * 2);
                if (startAngle < 0) {
                    startAngle = startAngle + Math.PI * 2;
                }
                endAngle = endAngle % (Math.PI * 2);
                if (endAngle < 0) {
                    endAngle = endAngle + Math.PI * 2;
                }

                if (startAngle > endAngle) {
                    endAngle += Math.PI * 2;
                }
                var number = 0;
                for (var angle = 0; angle < endAngle; angle += Math.PI / 2) {
                    if (angle > startAngle) {
                        var extremity = extremities[number++];
                        extremity[0] = Math.cos(angle);
                        extremity[1] = Math.sin(angle) * clockwise;
                        vec2.scale(extremity, extremity, radius);
                        vec2.add(extremity, extremity, center);
                    }
                }
                var points = extremities.slice(0, number);
                points.push(start, end);
                computeBoundingBox(points, min, max);
            };
        })();

        return {
            clone : clone,
            merge : merge,
            mergeFast : mergeFast,
            getContext : getContext,

            getPixelContext : getPixelContext,
            getPixelOffset : getPixelOffset,
            adjustCanvasSize : adjustCanvasSize,

            computeBoundingBox : computeBoundingBox,
            computeCubeBezierBoundingBox : computeCubeBezierBoundingBox,
            computeQuadraticBezierBoundingBox : 
                computeQuadraticBezierBoundingBox,
            computeArcBoundingBox : computeArcBoundingBox,

            indexOf : indexOf
        };
    }
);
/**
 * echarts设备环境识别
 *
 * @desc echarts基于Canvas，纯Javascript图表库，提供直观，生动，可交互，可个性化定制的数据统计图表。
 * @author firede[firede@firede.us]
 * @desc thanks zepto.
 */
define('zrender/tool/env',[],function() {
    // Zepto.js
    // (c) 2010-2013 Thomas Fuchs
    // Zepto.js may be freely distributed under the MIT license.

    function detect( ua ) {
        var os = this.os = {};
        var browser = this.browser = {};
        var webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/);
        var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
        var webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/);
        var touchpad = webos && ua.match(/TouchPad/);
        var kindle = ua.match(/Kindle\/([\d.]+)/);
        var silk = ua.match(/Silk\/([\d._]+)/);
        var blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/);
        var bb10 = ua.match(/(BB10).*Version\/([\d.]+)/);
        var rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/);
        var playbook = ua.match(/PlayBook/);
        var chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/);
        var firefox = ua.match(/Firefox\/([\d.]+)/);
        var ie = ua.match(/MSIE ([\d.]+)/);
        var safari = webkit && ua.match(/Mobile\//) && !chrome;
        var webview = ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) && !chrome;
        var ie = ua.match(/MSIE\s([\d.]+)/);

        // Todo: clean this up with a better OS/browser seperation:
        // - discern (more) between multiple browsers on android
        // - decide if kindle fire in silk mode is android or not
        // - Firefox on Android doesn't specify the Android version
        // - possibly devide in os, device and browser hashes

        if (browser.webkit = !!webkit) browser.version = webkit[1];

        if (android) os.android = true, os.version = android[2];
        if (iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.');
        if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.');
        if (ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
        if (webos) os.webos = true, os.version = webos[2];
        if (touchpad) os.touchpad = true;
        if (blackberry) os.blackberry = true, os.version = blackberry[2];
        if (bb10) os.bb10 = true, os.version = bb10[2];
        if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2];
        if (playbook) browser.playbook = true;
        if (kindle) os.kindle = true, os.version = kindle[1];
        if (silk) browser.silk = true, browser.version = silk[1];
        if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true;
        if (chrome) browser.chrome = true, browser.version = chrome[1];
        if (firefox) browser.firefox = true, browser.version = firefox[1];
        if (ie) browser.ie = true, browser.version = ie[1];
        if (safari && (ua.match(/Safari/) || !!os.ios)) browser.safari = true;
        if (webview) browser.webview = true;
        if (ie) browser.ie = true, browser.version = ie[1];

        os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
            (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)));
        os.phone  = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 ||
            (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
            (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))));

        return {
            browser: browser,
            os: os,
            // 原生canvas支持
            canvasSupported : document.createElement('canvas').getContext 
                              ? true : false 
        }
    }

    return detect( navigator.userAgent );
});
/**
 * zrender: shape仓库
 *
 * @desc zrender是一个轻量级的Canvas类库，MVC封装，数据驱动，提供类Dom事件模型。
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 *
 */
define(
    'zrender/shape',[],function(/*require*/) {
        var self = {};

        var _shapeLibrary = {};     //shape库

        /**
         * 定义图形实现
         * @param {Object} name
         * @param {Object} clazz 图形实现
         */
        self.define = function(name, clazz) {
            _shapeLibrary[name] = clazz;
            return self;
        };

        /**
         * 获取图形实现
         * @param {Object} name
         */
        self.get = function(name) {
            return _shapeLibrary[name];
        };

        return self;
    }
);
/**
 * zrender: 图形空间辅助类
 *
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 *
 * isInside：是否在区域内部
 * isOutside：是否在区域外部
 * getTextWidth：测算单行文本宽度
 */
define(
    'zrender/tool/area',['require','../tool/util','../shape'],function(require) {
        var util = require('../tool/util');

        var _ctx;

        /**
         * 包含判断
         * @param {string} shapeClazz : 图形类
         * @param {Object} area ： 目标区域
         * @param {number} x ： 横坐标
         * @param {number} y ： 纵坐标
         */
        function isInside(shapeClazz, area, x, y) {
            if (!area || !shapeClazz) {
                // 无参数或不支持类型
                return false;
            }
            var zoneType = shapeClazz.type;

            if (!_ctx) {
                _ctx = util.getContext();
            }
            if (!_isInsideRectangle(
                    area.__rect || shapeClazz.getRect(area), x, y
                 )
             ) {
                // 不在矩形区域内直接返回false
                return false;
            }

            // 未实现或不可用时(excanvas不支持)则数学运算，主要是line，brokenLine，ring
            var _mathReturn = _mathMethod(zoneType, area, x, y);

            if (typeof _mathReturn != 'undefined') {
                return _mathReturn;
            }

            if (zoneType != 'beziercurve'
                && shapeClazz.buildPath
                && _ctx.isPointInPath
            ) {
                return _buildPathMethod(shapeClazz, _ctx, area, x, y);
            }
            else if (_ctx.getImageData) {
                return _pixelMethod(shapeClazz, area, x, y);
            }

            // 上面的方法都行不通时
            switch (zoneType) {
                //心形----------------------10
                case 'heart':
                    return true;    // Todo，不精确
                //水滴----------------------11
                case 'droplet':
                    return true;    // Todo，不精确
                case 'ellipse':
                    return true;     // Todo，不精确
                // 旋轮曲线  不准确
                case 'trochoid':
                    var _r = area.location == 'out'
                            ? area.r1 + area.r2 + area.d
                            : area.r1 - area.r2 + area.d;
                    return _isInsideCircle(area, x, y, _r);
                // 玫瑰线 不准确
                case 'rose' :
                    return _isInsideCircle(area, x, y, area.maxr);
                //路径，椭圆，曲线等-----------------13
                default:
                    return false;   // Todo，暂不支持
            }
        }

        /**
         * 用数学方法判断，三个方法中最快，但是支持的shape少
         *
         * @param {string} zoneType ： 图形类型
         * @param {Object} area ：目标区域
         * @param {number} x ： 横坐标
         * @param {number} y ： 纵坐标
         * @return {boolean=} true表示坐标处在图形中
         */
        function _mathMethod(zoneType, area, x, y) {
            // 在矩形内则部分图形需要进一步判断
            switch (zoneType) {
                //线-----------------------1
                case 'line':
                    return _isInsideLine(area, x, y);
                //折线----------------------2
                case 'brokenLine':
                    return _isInsideBrokenLine(area, x, y);
                //文本----------------------3
                case 'text':
                    return true;
                //圆环----------------------4
                case 'ring':
                    return _isInsideRing(area, x, y);
                //矩形----------------------5
                case 'rectangle':
                    return true;
                //圆形----------------------6
                case 'circle':
                    return _isInsideCircle(area, x, y, area.r);
                //扇形----------------------7
                case 'sector':
                    return _isInsideSector(area, x, y);
                //多边形---------------------8
                case 'path':
                    return _isInsidePath(area, x, y);
                case 'polygon':
                case 'star':
                case 'isogon':
                    return _isInsidePolygon(area, x, y);
                //图片----------------------9
                case 'image':
                    return true;
            }
        }

        /**
         * 通过buildPath方法来判断，三个方法中较快，但是不支持线条类型的shape，
         * 而且excanvas不支持isPointInPath方法
         *
         * @param {Object} shapeClazz ： shape类
         * @param {Object} context : 上下文
         * @param {Object} area ：目标区域
         * @param {number} x ： 横坐标
         * @param {number} y ： 纵坐标
         * @return {boolean} true表示坐标处在图形中
         */
        function _buildPathMethod(shapeClazz, context, area, x, y) {
            // 图形类实现路径创建了则用类的path
            context.beginPath();
            shapeClazz.buildPath(context, area);
            context.closePath();
            return context.isPointInPath(x, y);
        }

        /**
         * 通过像素值来判断，三个方法中最慢，但是支持广,不足之处是excanvas不支持像素处理
         *
         * @param {Object} shapeClazz ： shape类
         * @param {Object} area ：目标区域
         * @param {number} x ： 横坐标
         * @param {number} y ： 纵坐标
         * @return {boolean} true表示坐标处在图形中
         */
        function _pixelMethod(shapeClazz, area, x, y) {
            var _rect = area.__rect || shapeClazz.getRect(area);
            var _context = util.getPixelContext();
            var _offset = util.getPixelOffset();

            util.adjustCanvasSize(x, y);
            _context.clearRect(_rect.x, _rect.y, _rect.width, _rect.height);
            _context.beginPath();
            shapeClazz.brush(_context, {style : area});
            _context.closePath();

            return _isPainted(_context, x + _offset.x, y + _offset.y);
        }

        /**
         * 坐标像素值，判断坐标是否被作色
         *
         * @param {Object} context : 上下文
         * @param {number} x : 横坐标
         * @param {number} y : 纵坐标
         * @param {number=} unit : 触发的精度，越大越容易触发，可选，缺省是为1
         * @return {boolean} 已经被画过返回true
         */
        function _isPainted(context, x, y, unit) {
            var pixelsData;

            if (typeof unit != 'undefined') {
                unit = Math.floor((unit || 1 )/ 2);
                pixelsData = context.getImageData(
                    x - unit,
                    y - unit,
                    unit + unit,
                    unit + unit
                ).data;
            }
            else {
                pixelsData = context.getImageData(x, y, 1, 1).data;
            }

            var len = pixelsData.length;
            while (len--) {
                if (pixelsData[len] !== 0) {
                    return true;
                }
            }

            return false;
        }

        /**
         * !isInside
         */
        function isOutside(shapeClazz, area, x, y) {
            return !isInside(shapeClazz, area, x, y);
        }

        /**
         * 线段包含判断
         */
        function _isInsideLine(area, x, y) {
            var _x1 = area.xStart;
            var _y1 = area.yStart;
            var _x2 = area.xEnd;
            var _y2 = area.yEnd;
            var _l = Math.max(area.lineWidth, 5);
            var _a = 0;
            var _b = _x1;

            if (_x1 !== _x2) {
                _a = (_y1 - _y2) / (_x1 - _x2);
                _b = (_x1 * _y2 - _x2 * _y1) / (_x1 - _x2) ;
            }
            else {
                return Math.abs(x - _x1) <= _l / 2;
            }

            var _s = (_a * x - y + _b) * (_a * x - y + _b) / (_a * _a + 1);
            return  _s <= _l / 2 * _l / 2;
        }

        function _isInsideBrokenLine(area, x, y) {
            var pointList = area.pointList;
            var lineArea;
            var insideCatch = false;
            for (var i = 0, l = pointList.length - 1; i < l; i++) {
                lineArea = {
                    xStart : pointList[i][0],
                    yStart : pointList[i][1],
                    xEnd : pointList[i + 1][0],
                    yEnd : pointList[i + 1][1],
                    lineWidth : Math.max(area.lineWidth, 10)
                };
                if (!_isInsideRectangle(
                        {
                            x : Math.min(lineArea.xStart, lineArea.xEnd)
                                - lineArea.lineWidth,
                            y : Math.min(lineArea.yStart, lineArea.yEnd)
                                - lineArea.lineWidth,
                            width : Math.abs(lineArea.xStart - lineArea.xEnd)
                                    + lineArea.lineWidth,
                            height : Math.abs(lineArea.yStart - lineArea.yEnd)
                                     + lineArea.lineWidth
                        },
                        x,y
                    )
                ) {
                    // 不在矩形区内跳过
                    continue;
                }
                insideCatch = _isInsideLine(lineArea, x, y);
                if (insideCatch) {
                    break;
                }
            }
            return insideCatch;
        }

        function _isInsideRing(area, x, y) {
            if (_isInsideCircle(area, x, y, area.r)
                && !_isInsideCircle(
                    {
                        x : area.x,
                        y : area.y
                    },
                    x, y,
                    area.r0 || 0
                )
            ){
                // 大圆内，小圆外
                return true;
            }
            return false;
        }

        /**
         * 矩形包含判断
         */
        function _isInsideRectangle(area, x, y) {
            if (x >= area.x
                && x <= (area.x + area.width)
                && y >= area.y
                && y <= (area.y + area.height)
            ) {
                return true;
            }
            return false;
        }

        /**
         * 圆形包含判断
         */
        function _isInsideCircle(area, x, y, r) {
            return (x - area.x) * (x - area.x) + (y - area.y) * (y - area.y)
                   < r * r;
        }

        /**
         * 扇形包含判断
         */
        function _isInsideSector(area, x, y) {
            if (!_isInsideCircle(area, x, y, area.r)
                || (area.r0 > 0
                    && _isInsideCircle(
                            {
                                x : area.x,
                                y : area.y
                            },
                            x, y,
                            area.r0
                        )
                    )
            ){
                // 大圆外或者小圆内直接false
                return false;
            }
            else {
                // 判断夹角
                if (Math.abs(area.endAngle - area.startAngle) >= 360) {
                    // 大于360度的扇形，在环内就为true
                    return true;
                }
                
                var angle = (360
                             - Math.atan2(y - area.y, x - area.x)
                             / Math.PI
                             * 180)
                             % 360;
                var endA = (360 + area.endAngle) % 360;
                var startA = (360 + area.startAngle) % 360;
                if (endA > startA) {
                    return (angle >= startA && angle <= endA);
                } else {
                    return !(angle >= endA && angle <= startA);
                }

            }
        }

        /**
         * 多边形包含判断
         * 警告：下面这段代码会很难看，建议跳过~
         */
        function _isInsidePolygon(area, x, y) {
            /**
             * 射线判别法
             * 如果一个点在多边形内部，任意角度做射线肯定会与多边形要么有一个交点，要么有与多边形边界线重叠
             * 如果一个点在多边形外部，任意角度做射线要么与多边形有一个交点，
             * 要么有两个交点，要么没有交点，要么有与多边形边界线重叠。
             */
            var i;
            var j;
            var polygon = area.pointList;
            var N = polygon.length;
            var inside = false;
            var redo = true;
            var v;

            for (i = 0; i < N; ++i) {
                // 是否在顶点上
                if (polygon[i][0] == x && polygon[i][1] == y ) {
                    redo = false;
                    inside = true;
                    break;
                }
            }

            if (redo) {
                redo = false;
                inside = false;
                for (i = 0,j = N - 1;i < N;j = i++) {
                    if ((polygon[i][1] < y && y < polygon[j][1])
                        || (polygon[j][1] < y && y < polygon[i][1])
                    ) {
                        if (x <= polygon[i][0] || x <= polygon[j][0]) {
                            v = (y - polygon[i][1])
                                * (polygon[j][0] - polygon[i][0])
                                / (polygon[j][1] - polygon[i][1])
                                + polygon[i][0];
                            if (x < v) {          // 在线的左侧
                                inside = !inside;
                            }
                            else if (x == v) {   // 在线上
                                inside = true;
                                break;
                            }
                        }
                    }
                    else if (y == polygon[i][1]) {
                        if (x < polygon[i][0]) {    // 交点在顶点上
                            polygon[i][1] > polygon[j][1] ? --y : ++y;
                            //redo = true;
                            break;
                        }
                    }
                    else if (polygon[i][1] == polygon[j][1] // 在水平的边界线上
                             && y == polygon[i][1]
                             && ((polygon[i][0] < x && x < polygon[j][0])
                                 || (polygon[j][0] < x && x < polygon[i][0]))
                    ) {
                        inside = true;
                        break;
                    }
                }
            }
            return inside;
        }
        
        /**
         * 路径包含判断，依赖多边形判断
         */
        function _isInsidePath(area, x, y) {
            if (!area.pointList) {
                require('../shape').get('path').buildPath(_ctx, area);
            }
            var pointList = area.pointList;
            var insideCatch = false;
            for (var i = 0, l = pointList.length; i < l; i++) {
                insideCatch = _isInsidePolygon(
                    { pointList : pointList[i] }, x, y
                );
                if (insideCatch) {
                    break;
                }
            }
            return insideCatch;
        }

        /**
         * 测算多行文本宽度
         * @param {Object} text
         * @param {Object} textFont
         */
        function getTextWidth(text, textFont) {
            if (!_ctx) {
                _ctx = util.getContext();
            }

            _ctx.save();
            if (textFont) {
                _ctx.font = textFont;
            }
            
            text = (text + '').split('\n');
            var width = 0;
            for (var i = 0, l = text.length; i < l; i++) {
                width =  Math.max(
                    _ctx.measureText(text[i]).width,
                    width
                );
            }
            _ctx.restore();

            return width;
        }
        
        /**
         * 测算多行文本高度
         * @param {Object} text
         * @param {Object} textFont
         */
        function getTextHeight(text, textFont) {
            if (!_ctx) {
                _ctx = util.getContext();
            }

            _ctx.save();
            if (textFont) {
                _ctx.font = textFont;
            }
            
            text = (text + '').split('\n');
            //比较粗暴
            var height = (_ctx.measureText('国').width + 2) * text.length;

            _ctx.restore();

            return height;
        }

        return {
            isInside : isInside,
            isOutside : isOutside,
            getTextWidth : getTextWidth,
            getTextHeight : getTextHeight
        };
    }
);

/**
 * zrender: 3x2矩阵操作类
 *
 * author: lang(shenyi01@baidu.com)
 * code from mat2d in http://glmatrix.net/
 */

define(
    'zrender/tool/matrix',[],function() {

        var matrix = {
            create : function() {
                return [1, 0,
                        0, 1,
                        0, 0];
            },
            identity : function(out) {
                out[0] = 1;
                out[1] = 0;
                out[2] = 0;
                out[3] = 1;
                out[4] = 0;
                out[5] = 0;
            },
            mul : function(out, m1, m2) {
               out[0] = m1[0] * m2[0] + m1[2] * m2[1];
               out[1] = m1[1] * m2[0] + m1[3] * m2[1];
               out[2] = m1[0] * m2[2] + m1[2] * m2[3];
               out[3] = m1[1] * m2[2] + m1[3] * m2[3];
               out[4] = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
               out[5] = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
               return out;
            },

            translate : function(out, a, v) {
                out[0] = a[0];
                out[1] = a[1];
                out[2] = a[2];
                out[3] = a[3];
                out[4] = a[4] + v[0];
                out[5] = a[5] + v[1];
                return out;
            },
            rotate : function(out, a, rad) {
                var aa = a[0], ac = a[2], atx = a[4];
                var ab = a[1], ad = a[3], aty = a[5];
                var st = Math.sin(rad);
                var ct = Math.cos(rad);

                out[0] = aa*ct + ab*st;
                out[1] = -aa*st + ab*ct;
                out[2] = ac*ct + ad*st;
                out[3] = -ac*st + ct*ad;
                out[4] = ct*atx + st*aty;
                out[5] = ct*aty - st*atx;
                return out;
            },
            scale : function(out, a, v) {
                var vx = v[0], vy = v[1];
                out[0] = a[0] * vx;
                out[1] = a[1] * vy;
                out[2] = a[2] * vx;
                out[3] = a[3] * vy;
                out[4] = a[4] * vx;
                out[5] = a[5] * vy;
                return out;
            },
            /**
             * 求逆矩阵
             */
            invert : function(out, a) {
            
                var aa = a[0], ac = a[2], atx = a[4];
                var ab = a[1], ad = a[3], aty = a[5];

                var det = aa * ad - ab * ac;
                if(!det){
                    return null;
                }
                det = 1.0 / det;

                out[0] = ad * det;
                out[1] = -ab * det;
                out[2] = -ac * det;
                out[3] = aa * det;
                out[4] = (ac * aty - ad * atx) * det;
                out[5] = (ab * atx - aa * aty) * det;
                return out;
            },

            /**
             * 矩阵左乘向量
             */
            mulVector : function(out, a, v) {
                var aa = a[0], ac = a[2], atx = a[4];
                var ab = a[1], ad = a[3], aty = a[5];

                out[0] = v[0] * aa + v[1] * ac + atx;
                out[1] = v[0] * ab + v[1] * ad + aty;

                return out;
            }
        };

        return matrix;
    }
);
/**
 * zrender : 颜色辅助类
 *
 * author: CrossDo (chenhuaimu@baidu.com)
 *
 * getColor：获取色板颜色
 * customPalette : 自定义调色板
 * resetPalette : 重置调色板
 *
 * getHighlightColor : 获取默认高亮颜色
 * customHighlight : 自定义默认高亮颜色
 * resetHighlight : 重置默认高亮颜色
 *
 * getRadialGradient : 径向渐变
 * getLinearGradient : 线性渐变
 * getGradientColors : 获取颜色之间渐变颜色数组
 * getStepColors : 获取两种颜色之间渐变颜色数组
 * reverse : 颜色翻转
 * mix : 颜色混合
 * lift : 颜色升降
 * trim : 清除空格
 * random : 随机颜色
 * toRGB  : 转为RGB格式
 * toRGBA : 转为RGBA格式
 * toHex  : 转为#RRGGBB格式
 * toHSL  : 转为HSL格式
 * toHSLA : 转为HSLA格式
 * toHSB  : 转为HSB格式
 * toHSBA : 转为HSBA格式
 * toHSV  : 转为HSV格式
 * toHSVA : 转为HSVA格式
 * toName : 转为颜色名字
 * toColor: 颜色值数组转为指定格式颜色
 * toArray: 返回颜色值数组
 * alpha  : 设置颜色的透明度
 **/
define( 'zrender/tool/color',['require','../tool/util'],function(require) {
    var util = require('../tool/util');

    var _ctx;

    // Color palette is an array containing the default colors for the chart's
    // series.
    // When all colors are used, new colors are selected from the start again.
    // Defaults to:
    // 默认色板
    var palette = [
        '#ff9277', ' #dddd00', ' #ffc877', ' #bbe3ff', ' #d5ffbb',
        '#bbbbff', ' #ddb000', ' #b0dd00', ' #e2bbff', ' #ffbbe3',
        '#ff7777', ' #ff9900', ' #83dd00', ' #77e3ff', ' #778fff',
        '#c877ff', ' #ff77ab', ' #ff6600', ' #aa8800', ' #77c7ff',
        '#ad77ff', ' #ff77ff', ' #dd0083', ' #777700', ' #00aa00',
        '#0088aa', ' #8400dd', ' #aa0088', ' #dd0000', ' #772e00'
    ];
    var _palette = palette;

    var highlightColor = 'rgba(255,255,0,0.5)';
    var _highlightColor = highlightColor;

    // 颜色格式
    /*jshint maxlen: 330 */
    var colorRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i;

    var _nameColors = {
        aliceblue : '#f0f8ff',
        antiquewhite : '#faebd7',
        aqua : '#0ff',
        aquamarine : '#7fffd4',
        azure : '#f0ffff',
        beige : '#f5f5dc',
        bisque : '#ffe4c4',
        black : '#000',
        blanchedalmond : '#ffebcd',
        blue : '#00f',
        blueviolet : '#8a2be2',
        brown : '#a52a2a',
        burlywood : '#deb887',
        cadetblue : '#5f9ea0',
        chartreuse : '#7fff00',
        chocolate : '#d2691e',
        coral : '#ff7f50',
        cornflowerblue : '#6495ed',
        cornsilk : '#fff8dc',
        crimson : '#dc143c',
        cyan : '#0ff',
        darkblue : '#00008b',
        darkcyan : '#008b8b',
        darkgoldenrod : '#b8860b',
        darkgray : '#a9a9a9',
        darkgrey : '#a9a9a9',
        darkgreen : '#006400',
        darkkhaki : '#bdb76b',
        darkmagenta : '#8b008b',
        darkolivegreen : '#556b2f',
        darkorange : '#ff8c00',
        darkorchid : '#9932cc',
        darkred : '#8b0000',
        darksalmon : '#e9967a',
        darkseagreen : '#8fbc8f',
        darkslateblue : '#483d8b',
        darkslategray : '#2f4f4f',
        darkslategrey : '#2f4f4f',
        darkturquoise : '#00ced1',
        darkviolet : '#9400d3',
        deeppink : '#ff1493',
        deepskyblue : '#00bfff',
        dimgray : '#696969',
        dimgrey : '#696969',
        dodgerblue : '#1e90ff',
        firebrick : '#b22222',
        floralwhite : '#fffaf0',
        forestgreen : '#228b22',
        fuchsia : '#f0f',
        gainsboro : '#dcdcdc',
        ghostwhite : '#f8f8ff',
        gold : '#ffd700',
        goldenrod : '#daa520',
        gray : '#808080',
        grey : '#808080',
        green : '#008000',
        greenyellow : '#adff2f',
        honeydew : '#f0fff0',
        hotpink : '#ff69b4',
        indianred : '#cd5c5c',
        indigo : '#4b0082',
        ivory : '#fffff0',
        khaki : '#f0e68c',
        lavender : '#e6e6fa',
        lavenderblush : '#fff0f5',
        lawngreen : '#7cfc00',
        lemonchiffon : '#fffacd',
        lightblue : '#add8e6',
        lightcoral : '#f08080',
        lightcyan : '#e0ffff',
        lightgoldenrodyellow : '#fafad2',
        lightgray : '#d3d3d3',
        lightgrey : '#d3d3d3',
        lightgreen : '#90ee90',
        lightpink : '#ffb6c1',
        lightsalmon : '#ffa07a',
        lightseagreen : '#20b2aa',
        lightskyblue : '#87cefa',
        lightslategray : '#789',
        lightslategrey : '#789',
        lightsteelblue : '#b0c4de',
        lightyellow : '#ffffe0',
        lime : '#0f0',
        limegreen : '#32cd32',
        linen : '#faf0e6',
        magenta : '#f0f',
        maroon : '#800000',
        mediumaquamarine : '#66cdaa',
        mediumblue : '#0000cd',
        mediumorchid : '#ba55d3',
        mediumpurple : '#9370d8',
        mediumseagreen : '#3cb371',
        mediumslateblue : '#7b68ee',
        mediumspringgreen : '#00fa9a',
        mediumturquoise : '#48d1cc',
        mediumvioletred : '#c71585',
        midnightblue : '#191970',
        mintcream : '#f5fffa',
        mistyrose : '#ffe4e1',
        moccasin : '#ffe4b5',
        navajowhite : '#ffdead',
        navy : '#000080',
        oldlace : '#fdf5e6',
        olive : '#808000',
        olivedrab : '#6b8e23',
        orange : '#ffa500',
        orangered : '#ff4500',
        orchid : '#da70d6',
        palegoldenrod : '#eee8aa',
        palegreen : '#98fb98',
        paleturquoise : '#afeeee',
        palevioletred : '#d87093',
        papayawhip : '#ffefd5',
        peachpuff : '#ffdab9',
        peru : '#cd853f',
        pink : '#ffc0cb',
        plum : '#dda0dd',
        powderblue : '#b0e0e6',
        purple : '#800080',
        red : '#f00',
        rosybrown : '#bc8f8f',
        royalblue : '#4169e1',
        saddlebrown : '#8b4513',
        salmon : '#fa8072',
        sandybrown : '#f4a460',
        seagreen : '#2e8b57',
        seashell : '#fff5ee',
        sienna : '#a0522d',
        silver : '#c0c0c0',
        skyblue : '#87ceeb',
        slateblue : '#6a5acd',
        slategray : '#708090',
        slategrey : '#708090',
        snow : '#fffafa',
        springgreen : '#00ff7f',
        steelblue : '#4682b4',
        tan : '#d2b48c',
        teal : '#008080',
        thistle : '#d8bfd8',
        tomato : '#ff6347',
        turquoise : '#40e0d0',
        violet : '#ee82ee',
        wheat : '#f5deb3',
        white : '#fff',
        whitesmoke : '#f5f5f5',
        yellow : '#ff0',
        yellowgreen : '#9acd32'
    };

    /**
     * 自定义调色板
     */
    function customPalette(userPalete) {
        palette = userPalete;
    }

    /**
     * 复位默认色板
     */
    function resetPalette() {
        palette = _palette;
    }

    /**
     * 获取色板颜色
     * @param {number} idx : 色板位置
     * @param {array} [userPalete] : 自定义色板
     *
     * @return {color} 颜色#000000~#ffffff
     */
    function getColor(idx, userPalete) {
        idx = +idx || 0;
        userPalete = userPalete || palette;
        return userPalete[idx % userPalete.length];
    }

    /**
     * 自定义默认高亮颜色
     */
    function customHighlight(userHighlightColor) {
        highlightColor = userHighlightColor;
    }

    /**
     * 重置默认高亮颜色
     */
    function resetHighlight() {
        _highlightColor = highlightColor;
    }

    /**
     * 获取默认高亮颜色
     */
    function getHighlightColor() {
        return highlightColor;
    }

    /**
     * 径向渐变
     * @param {number} x0 渐变起点
     * @param {number} y0
     * @param {number} r0
     * @param {number} x1 渐变终点
     * @param {number} y1
     * @param {number} r1
     * @param {Array} colorList 颜色列表
     */
    function getRadialGradient(x0, y0, r0, x1, y1, r1, colorList) {
        if (!_ctx) {
            _ctx = util.getContext();
        }
        var gradient = _ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
        for ( var i = 0, l = colorList.length; i < l; i++) {
            gradient.addColorStop(colorList[i][0], colorList[i][1]);
        }
        gradient.__nonRecursion = true;
        return gradient;
    }

    /**
     * 线性渐变
     * @param {Object} x0 渐变起点
     * @param {Object} y0
     * @param {Object} x1 渐变终点
     * @param {Object} y1
     * @param {Array} colorList 颜色列表
     */
    function getLinearGradient(x0, y0, x1, y1, colorList) {
        if (!_ctx) {
            _ctx = util.getContext();
        }
        var gradient = _ctx.createLinearGradient(x0, y0, x1, y1);
        for ( var i = 0, l = colorList.length; i < l; i++) {
            gradient.addColorStop(colorList[i][0], colorList[i][1]);
        }
        gradient.__nonRecursion = true;
        return gradient;
    }

    /**
     * 获取两种颜色之间渐变颜色数组
     * @param {color} start 起始颜色
     * @param {color} end 结束颜色
     * @param {number} step 渐变级数
     * @return {Array}  颜色数组
     */
    function getStepColors(start, end, step) {
        start = toRGBA(start);
        end = toRGBA(end);
        start = getData(start);
        end = getData(end);

        var colors = [];
        var stepR = (end[0] - start[0]) / step;
        var stepG = (end[1] - start[1]) / step;
        var stepB = (end[2] - start[2]) / step;
        // 生成颜色集合
        // fix by linfeng 颜色堆积
        for (var i = 0, r = start[0], g = start[1], b = start[2]; i < step; i++
        ) {
            colors[i] = toColor([
                adjust(Math.floor(r), [ 0, 255 ]),
                adjust(Math.floor(g), [ 0, 255 ]), 
                adjust(Math.floor(b), [ 0, 255 ])
            ]);
            r += stepR;
            g += stepG;
            b += stepB;
        }
        r = end[0];
        g = end[1];
        b = end[2];
        colors[i] = toColor( [ r, g, b ]);
        return colors;
    }

    /**
     * 获取指定级数的渐变颜色数组
     * @param {Array} colors 颜色组
     * @param {number=20} step 渐变级数
     * @return {Array}  颜色数组
     */
    function getGradientColors(colors, step) {
        var ret = [];
        var len = colors.length;
        if (step === undefined) {
            step = 20;
        }
        if (len === 1) {
            ret = getStepColors(colors[0], colors[0], step);
        } else if (len > 1) {
            for ( var i = 0, n = len - 1; i < n; i++) {
                var steps = getStepColors(colors[i], colors[i + 1], step);
                if (i < n - 1) {
                    steps.pop();
                }
                ret = ret.concat(steps);
            }
        }
        return ret;
    }

    /**
     * 颜色值数组转为指定格式颜色,例如:<br/>
     * data = [60,20,20,0.1] format = 'rgba'
     * 返回：rgba(60,20,20,0.1)
     * @param {Array} data 颜色值数组
     * @param {string} format 格式,默认rgb
     * @return {string} 颜色
     */
    function toColor(data, format) {
        format = format || 'rgb';
        if (data && (data.length === 3 || data.length === 4)) {
            data = map(data,
                function(c) {
                    return c > 1 ? Math.ceil(c) : c;
            });

            if (format.indexOf('hex') > -1) {
                data = map(data.slice(0, 3),
                    function(c) {
                        c = Number(c).toString(16);
                        return (c.length === 1) ? '0' + c : c;
                });
                return '#' + data.join('');
            } else if (format.indexOf('hs') > -1) {
                var sx = map(data.slice(1, 3),
                    function(c) {
                        return c + '%';
                });
                data[1] = sx[0];
                data[2] = sx[1];
            }

            if (format.indexOf('a') > -1) {
                if (data.length === 3) {
                    data.push(1);
                }
                data[3] = adjust(data[3], [ 0, 1 ]);
                return format + '(' + data.slice(0, 4).join(',') + ')';
            }

            return format + '(' + data.slice(0, 3).join(',') + ')';
        }
    }

    /**
     * 返回颜色值数组
     * @param {string} color 颜色
     * @return {Array} 颜色值数组
     */
    function toArray(color) {
        color = trim(color);
        if (color.indexOf('#') > -1) {
            color = toRGB(color);
        }
        var data = color.replace(/[rgbahsvl%\(\)]/ig, '').split(',');
        data = map(data,
            function(c) {
                return Number(c);
        });
        return data;
    }

    /**
     * 颜色格式转化
     * @param {Array} data 颜色值数组
     * @param {string} format 格式,默认rgb
     * @return {string} 颜色
     */
    function convert(color, format) {
        var data = getData(color);
        var alpha = data[3];
        if(typeof alpha === 'undefined') {
            alpha = 1;
        }

        if (color.indexOf('hsb') > -1) {
            data = _HSV_2_RGB(data);
        } else if (color.indexOf('hsl') > -1) {
            data = _HSL_2_RGB(data);
        }

        if (format.indexOf('hsb') > -1 || format.indexOf('hsv') > -1) {
            data = _RGB_2_HSB(data);
        } else if (format.indexOf('hsl') > -1) {
            data = _RGB_2_HSL(data);
        }

        data[3] = alpha;

        return toColor(data, format);
    }

    /**
     * 转换为rgba格式的颜色
     * @param {string} color 颜色
     * @return {string} rgba颜色，rgba(r,g,b,a)
     */
    function toRGBA(color) {
        return convert(color, 'rgba');
    }

    /**
     * 转换为rgb数字格式的颜色
     * @param {string} color 颜色
     * @return {string} rgb颜色，rgb(0,0,0)格式
     */
    function toRGB(color) {
        return convert(color, 'rgb');
    }

    /**
     * 转换为16进制颜色
     * @param {string} color 颜色
     * @return {string} 16进制颜色，#rrggbb格式
     */
    function toHex(color) {
        return convert(color, 'hex');
    }

    /**
     * 转换为HSV颜色
     * @param {string} color 颜色
     * @return {string} HSVA颜色，hsva(h,s,v,a)
     */
    function toHSVA(color) {
        return convert(color, 'hsva');
    }

    /**
     * 转换为HSV颜色
     * @param {string} color 颜色
     * @return {string} HSV颜色，hsv(h,s,v)
     */
    function toHSV(color) {
        return convert(color, 'hsv');
    }

    /**
     * 转换为HSBA颜色
     * @param {string} color 颜色
     * @return {string} HSBA颜色，hsba(h,s,b,a)
     */
    function toHSBA(color) {
        return convert(color, 'hsba');
    }

    /**
     * 转换为HSB颜色
     * @param {string} color 颜色
     * @return {string} HSB颜色，hsb(h,s,b)
     */
    function toHSB(color) {
        return convert(color, 'hsb');
    }

    /**
     * 转换为HSLA颜色
     * @param {string} color 颜色
     * @return {string} HSLA颜色，hsla(h,s,l,a)
     */
    function toHSLA(color) {
        return convert(color, 'hsla');
    }

    /**
     * 转换为HSL颜色
     * @param {string} color 颜色
     * @return {string} HSL颜色，hsl(h,s,l)
     */
    function toHSL(color) {
        return convert(color, 'hsl');
    }

    /**
     * 转换颜色名
     * @param {string} color 颜色
     * @return {String} 颜色名
     */
    function toName(color) {
        for ( var key in _nameColors) {
            if (toHex(_nameColors[key]) === toHex(color)) {
                return key;
            }
        }
        return null;
    }

    /**
     * 移除颜色中多余空格
     * @param {String} color 颜色
     * @return {String} 无空格颜色
     */
    function trim(color) {
        color = String(color);
        color = color.replace(/(^\s*)|(\s*$)/g, '');
        if (/^[^#]*?$/i.test(color)) {
            color = color.replace(/\s/g, '');
        }
        return color;
    }

    // 规范化
    function normalize(color) {
        // 颜色名
        if (_nameColors[color]) {
            color = _nameColors[color];
        }
        // 去掉空格
        color = trim(color);
        // hsv与hsb等价
        color = color.replace(/hsv/i, 'hsb');
        // rgb转为rrggbb
        if (/^#[0-9a-f]{3}$/i.test(color)) {
            var d = color.replace('#', '').split('');
            color = '#' + d[0] + d[0] + d[1] + d[1] + d[2] + d[2];
        }
        return color;
    }

    /**
     * 颜色加深或减淡，当level>0加深，当level<0减淡
     * @param {string} color 颜色
     * @param {number} level 升降程度,取值区间[-1,1]
     * @return {string} 加深或减淡后颜色值
     */
    function lift(color, level) {
        var direct = level > 0 ? 1 : -1;
        if (typeof level === 'undefined') {
            level = 0;
        }
        level = Math.abs(level) > 1 ? 1 : Math.abs(level);
        color = toRGB(color);
        var data = getData(color);
        for ( var i = 0; i < 3; i++) {
            if (direct === 1) {
                data[i] = Math.floor(data[i] * (1 - level));
            } else {
                data[i] = Math.floor((255 - data[i]) * level + data[i]);
            }
        }
        return 'rgb(' + data.join(',') + ')';
    }

    /**
     * 颜色翻转,[255-r,255-g,255-b,1-a]
     * @param {string} color 颜色
     * @return {string} 翻转颜色
     */
    function reverse(color) {
        var data = getData(toRGBA(color));
        data = map(data,
            function(c) {
                return 255 - c;
        });
        return toColor(data, 'rgb');
    }

    /**
     * 简单两种颜色混合
     * @param {String} color1 第一种颜色
     * @param {String} color2 第二种颜色
     * @param {String} weight 混合权重[0-1]
     * @return {String} 结果色,rgb(r,g,b)或rgba(r,g,b,a)
     */
    function mix(color1, color2, weight) {
        if(typeof weight === 'undefined') {
            weight = 0.5;
        }
        weight = 1 - adjust(weight, [0, 1]);

        var w = weight * 2 - 1;
        var data1 = getData(toRGBA(color1));
        var data2 = getData(toRGBA(color2));

        var d = data1[3] - data2[3];

        var weight1 = (((w * d === -1) ? w : (w + d) / (1 + w * d)) + 1) / 2;
        var weight2 = 1 - weight1;

        var data = [];

        for ( var i = 0; i < 3; i++) {
            data[i] = data1[i] * weight1 + data2[i] * weight2;
        }

        var alpha = data1[3] * weight + data2[3] * (1 - weight);
        alpha = Math.max(0, Math.min(1, alpha));

        if (data1[3] === 1 && data2[3] === 1) {// 不考虑透明度
            return toColor(data, 'rgb');
        }
        data[3] = alpha;
        return toColor(data, 'rgba');
    }

    /**
     * 随机颜色
     * @return {string} 颜色值，#rrggbb格式
     */
    function random() {
        return toHex(
            'rgb(' + Math.round(Math.random() * 256) + ','
                   + Math.round(Math.random() * 256) + ','
                   + Math.round(Math.random() * 256) + ')'
        );
    }

    /**
     * 获取颜色值数组,返回值范围： <br/>
     * RGB 范围[0-255] <br/>
     * HSL/HSV/HSB 范围[0-1]<br/>
     * A透明度范围[0-1]
     * 支持格式：
     * #rgb
     * #rrggbb
     * rgb(r,g,b)
     * rgb(r%,g%,b%)
     * rgba(r,g,b,a)
     * hsb(h,s,b) // hsv与hsb等价
     * hsb(h%,s%,b%)
     * hsba(h,s,b,a)
     * hsl(h,s,l)
     * hsl(h%,s%,l%)
     * hsla(h,s,l,a)
     * @param {string} color 颜色
     * @return {Array} 颜色值数组或null
     */
    function getData(color) {
        color = normalize(color);
        var r = color.match(colorRegExp);
        if (r === null) {
            throw new Error('The color format error'); // 颜色格式错误
        }
        var d;
        var a;
        var data = [];
        var rgb;

        if (r[2]) {
            // #rrggbb
            d = r[2].replace('#', '').split('');
            rgb = [ d[0] + d[1], d[2] + d[3], d[4] + d[5] ];
            data = map(rgb,
                function(c) {
                    return adjust(parseInt(c, 16), [ 0, 255 ]);
            });

        }
        else if (r[4]) {
            // rgb rgba
            var rgba = (r[4]).split(',');
            a = rgba[3];
            rgb = rgba.slice(0, 3);
            data = map(
                rgb,
                function(c) {
                    c = Math.floor(
                        c.indexOf('%') > 0 ? parseInt(c, 0) * 2.55 : c
                    );
                    return adjust(c, [ 0, 255 ]);
                }
            );

            if( typeof a !== 'undefined') {
                data.push(adjust(parseFloat(a), [ 0, 1 ]));
            }
        }
        else if (r[5] || r[6]) {
            // hsb hsba hsl hsla
            var hsxa = (r[5] || r[6]).split(',');
            var h = parseInt(hsxa[0], 0) / 360;
            var s = hsxa[1];
            var x = hsxa[2];
            a = hsxa[3];
            data = map( [ s, x ],
                function(c) {
                    return adjust(parseFloat(c) / 100, [ 0, 1 ]);
            });
            data.unshift(h);
            if( typeof a !== 'undefined') {
                data.push(adjust(parseFloat(a), [ 0, 1 ]));
            }
        }
        return data;
    }

    /**
     * 设置颜色透明度
     * @param {string} color 颜色
     * @param {number} alpha 透明度,区间[0,1]
     * @return {string} rgba颜色值
     */
    function alpha(color, a) {
        if (a === null) {
            a = 1;
        }
        var data = getData(toRGBA(color));
        data[3] = adjust(Number(a).toFixed(4), [ 0, 1 ]);

        return toColor(data, 'rgba');
    }

    // 数组映射
    function map(array, fun) {
        if (typeof fun !== 'function') {
            throw new TypeError();
        }
        var len = array ? array.length : 0;
        for ( var i = 0; i < len; i++) {
            array[i] = fun(array[i]);
        }
        return array;
    }

    // 调整值区间
    function adjust(value, region) {
        // < to <= & > to >=
        // modify by linzhifeng 2014-05-25 because -0 == 0
        if (value <= region[0]) {
            value = region[0];
        }
        else if (value >= region[1]) {
            value = region[1];
        }
        return value;
    }

    // 参见 http:// www.easyrgb.com/index.php?X=MATH
    function _HSV_2_RGB(data) {
        var H = data[0];
        var S = data[1];
        var V = data[2];
        // HSV from 0 to 1
        var R, G, B;
        if (S === 0) {
            R = V * 255;
            G = V * 255;
            B = V * 255;
        } else {
            var h = H * 6;
            if (h === 6) {
                h = 0;
            }
            var i = Math.floor(h);
            var v1 = V * (1 - S);
            var v2 = V * (1 - S * (h - i));
            var v3 = V * (1 - S * (1 - (h - i)));
            var r = 0;
            var g = 0;
            var b = 0;

            if (i === 0) {
                r = V;
                g = v3;
                b = v1;
            } else if (i === 1) {
                r = v2;
                g = V;
                b = v1;
            } else if (i === 2) {
                r = v1;
                g = V;
                b = v3;
            } else if (i === 3) {
                r = v1;
                g = v2;
                b = V;
            } else if (i === 4) {
                r = v3;
                g = v1;
                b = V;
            } else {
                r = V;
                g = v1;
                b = v2;
            }

            // RGB results from 0 to 255
            R = r * 255;
            G = g * 255;
            B = b * 255;
        }
        return [ R, G, B ];
    }

    function _HSL_2_RGB(data) {
        var H = data[0];
        var S = data[1];
        var L = data[2];
        // HSL from 0 to 1
        var R, G, B;
        if (S === 0) {
            R = L * 255;
            G = L * 255;
            B = L * 255;
        } else {
            var v2;
            if (L < 0.5) {
                v2 = L * (1 + S);
            } else {
                v2 = (L + S) - (S * L);
            }

            var v1 = 2 * L - v2;

            R = 255 * _HUE_2_RGB(v1, v2, H + (1 / 3));
            G = 255 * _HUE_2_RGB(v1, v2, H);
            B = 255 * _HUE_2_RGB(v1, v2, H - (1 / 3));
        }
        return [ R, G, B ];
    }

    function _HUE_2_RGB(v1, v2, vH) {
        if (vH < 0) {
            vH += 1;
        }
        if (vH > 1) {
            vH -= 1;
        }
        if ((6 * vH) < 1) {
            return (v1 + (v2 - v1) * 6 * vH);
        }
        if ((2 * vH) < 1) {
            return (v2);
        }
        if ((3 * vH) < 2) {
            return (v1 + (v2 - v1) * ((2 / 3) - vH) * 6);
        }
        return v1;
    }

    function _RGB_2_HSB(data) {
        // RGB from 0 to 255
        var R = (data[0] / 255);
        var G = (data[1] / 255);
        var B = (data[2] / 255);

        var vMin = Math.min(R, G, B); // Min. value of RGB
        var vMax = Math.max(R, G, B); // Max. value of RGB
        var delta = vMax - vMin; // Delta RGB value
        var V = vMax;
        var H;
        var S;

        // HSV results from 0 to 1
        if (delta === 0) {
            H = 0;
            S = 0;
        } else {
            S = delta / vMax;

            var deltaR = (((vMax - R) / 6) + (delta / 2)) / delta;
            var deltaG = (((vMax - G) / 6) + (delta / 2)) / delta;
            var deltaB = (((vMax - B) / 6) + (delta / 2)) / delta;

            if (R === vMax) {
                H = deltaB - deltaG;
            } else if (G === vMax) {
                H = (1 / 3) + deltaR - deltaB;
            } else if (B === vMax) {
                H = (2 / 3) + deltaG - deltaR;
            }

            if (H < 0) {
                H += 1;
            }
            if (H > 1) {
                H -= 1;
            }
        }
        H = H * 360;
        S = S * 100;
        V = V * 100;
        return [ H, S, V ];
    }

    function _RGB_2_HSL(data) {
        // RGB from 0 to 255
        var R = (data[0] / 255);
        var G = (data[1] / 255);
        var B = (data[2] / 255);

        var vMin = Math.min(R, G, B); // Min. value of RGB
        var vMax = Math.max(R, G, B); // Max. value of RGB
        var delta = vMax - vMin; // Delta RGB value

        var L = (vMax + vMin) / 2;
        var H;
        var S;
        // HSL results from 0 to 1
        if (delta === 0) {
            H = 0;
            S = 0;
        } else {
            if (L < 0.5) {
                S = delta / (vMax + vMin);
            } else {
                S = delta / (2 - vMax - vMin);
            }

            var deltaR = (((vMax - R) / 6) + (delta / 2)) / delta;
            var deltaG = (((vMax - G) / 6) + (delta / 2)) / delta;
            var deltaB = (((vMax - B) / 6) + (delta / 2)) / delta;

            if (R === vMax) {
                H = deltaB - deltaG;
            } else if (G === vMax) {
                H = (1 / 3) + deltaR - deltaB;
            } else if (B === vMax) {
                H = (2 / 3) + deltaG - deltaR;
            }

            if (H < 0) {
                H += 1;
            }

            if (H > 1) {
                H -= 1;
            }
        }

        H = H * 360;
        S = S * 100;
        L = L * 100;

        return [ H, S, L ];
    }

    return {
        customPalette : customPalette,
        resetPalette : resetPalette,
        getColor : getColor,
        getHighlightColor : getHighlightColor,
        customHighlight : customHighlight,
        resetHighlight : resetHighlight,
        getRadialGradient : getRadialGradient,
        getLinearGradient : getLinearGradient,
        getGradientColors : getGradientColors,
        getStepColors : getStepColors,
        reverse : reverse,
        mix : mix,
        lift : lift,
        trim : trim,
        random : random,
        toRGB : toRGB,
        toRGBA : toRGBA,
        toHex : toHex,
        toHSL : toHSL,
        toHSLA : toHSLA,
        toHSB : toHSB,
        toHSBA : toHSBA,
        toHSV : toHSV,
        toHSVA : toHSVA,
        toName : toName,
        toColor : toColor,
        toArray : toArray,
        alpha : alpha,
        getData : getData
    };
});


/**
 * zrender : shape基类
 *
 * desc:    zrender是一个轻量级的Canvas类库，MVC封装，数据驱动，提供类Dom事件模型。
 * author:  Kener (@Kener-林峰, linzhifeng@baidu.com)
 *
 * 可配图形属性：
   {
       // 基础属性，详见各shape
       shape  : {string},       // 必须，shape类标识，需要显式指定
       id     : {string},       // 必须，图形唯一标识，可通过zrender实例方法newShapeId生成
       zlevel : {number},       // 默认为0，z层level，决定绘画在哪层canvas中
       invisible : {boolean},   // 默认为false，是否可见

       // 变换
       position : {array},        // 默认为[0, 0], shape的坐标
       rotation : {number|array}, // 默认为[0, 0, 0]，shape绕自身旋转的角度，不被translate 影响
                                  // 后两个值为旋转的origin
       scale : {array},           // 默认为[1, 1, 0, 0], shape纵横缩放比例，不被translate影响
                                  // 后两个值为缩放的origin

       // 样式属性，详见各shape，默认状态样式属性
       style  : {Object},

       // 样式属性，详见各shape，高亮样式属性，当不存在highlightStyle时使用默认样式扩展显示
       highlightStyle : {Object},

       // 交互属性，zrender支持，非图形类实现
       hoverable : {boolean},   // 默认为true，可悬浮响应，默认悬浮响应为高亮显示
                                // 可在onbrush中捕获并阻塞高亮绘画
       clickable : {boolean},   // 默认为false，可点击响应，影响鼠标hover时图标是否为可点击样式
                                // 为false则阻断点击事件抛出，为true可在onclick中捕获
       draggable : {boolean},   // 默认为false，可拖拽响应，默认拖拽响应改变图形位置，
                                // 可在ondrift中捕获并阻塞默认拖拽行为

       // 事件属性
       onbrush : {Function}, // 默认为null，当前图形被刷画时回调，可用于实现自定义绘画
                 // 回传参数为：
                 // @param {2D Context} context 当前canvas context
                 // @param {Object} shape 当前shape
                 // @param {boolean} isHighlight 是否高亮
                 // @return {boolean} 回调返回true则不执行默认绘画
       ondrift : {Function}, // 默认为null，当前图形被拖拽改变位置时回调，可用于限制拖拽范围
                 // 回传参数为：
                 // @param {Object} shape 当前shape
                 // @param {number} dx x方向变化
                 // @param {number} dy y方向变化
       onclick : {Function}, // 默认为null，当前图形点击响应，回传参数为：
                 // @param {Object} eventPacket 对象内容如下：
                 // @param {string} eventPacket.type 事件类型，EVENT.CLICK
                 // @param {event} eventPacket.event 原始dom事件对象
                 // @param {Object} eventPacket.target 当前图形shape对象
                 // @return {boolean} 回调返回true则阻止抛出全局事件

       onmousewheel : {Function}, // 默认为null，当前图形上鼠标滚轮触发，回传参数格式同onclick，其中：
                      // 事件类型为confit.EVENT.MOUSEWHEEL
                      // @return {boolean} 回调返回true则阻止抛出全局事件

       onmousemove : {Function}, // 默认为null，当前图上形鼠标（或手指）移动触发，回传参数格式同onclick，其中：
                     // 事件类型为confit.EVENT.MOUSEMOVE
                     // @return {boolean} 回调返回true则阻止抛出全局事件

       onmouseover : {Function}, // 默认为null，鼠标（或手指）移动到当前图形上触发，回传参数格式同onclick：
                     // 事件类型为confit.EVENT.MOUSEOVER
                     // @return {boolean} 回调返回true则阻止抛出全局事件

       onmouseout : {Function}, // 默认为null，鼠标（或手指）从当前图形移开，回传参数格式同onclick，其中：
                    // 事件类型为confit.EVENT.MOUSEOUT
                    // @return {boolean} 回调返回true则阻止抛出全局事件

       onmousedown : {Function}, // 默认为null，鼠标按钮（或手指）按下，回传参数格式同onclick，其中：
                     // 事件类型为confit.EVENT.MOUSEDOWN
                     // @return {boolean} 回调返回true则阻止抛出全局事件

       onmouseup : {Function}, // 默认为null，鼠标按钮（或手指）松开，回传参数格式同onclick，其中：
                   // 事件类型为confit.EVENT.MOUSEUP
                   // @return {boolean} 回调返回true则阻止抛出全局事件

       ondragstart : {Function}, // 默认为null，开始拖拽时触发，回传参数格式同onclick，其中：
                     // 事件类型为confit.EVENT.DRAGSTART
                     // @return {boolean} 回调返回true则阻止抛出全局事件

       ondragend : {Function}, // 默认为null，拖拽完毕时触发，回传参数格式同onclick，其中：
                   // 事件类型为confit.EVENT.DRAGEND
                   // @return {boolean} 回调返回true则阻止抛出全局事件

       ondragenter : {Function}, // 默认为null，拖拽图形元素进入目标图形元素时触发
                     // 回传参数格式同onclick，其中：
                     // @param {string} eventPacket.type 事件类型，EVENT.DRAGENTER
                     // @param {Object} eventPacket.target 目标图形元素shape对象
                     // @param {Object} eventPacket.dragged 拖拽图形元素shape对象
                     // @return {boolean} 回调返回true则阻止抛出全局事件

       ondragover : {Function}, // 默认为null，拖拽图形元素在目标图形元素上移动时触发，
                    // 回传参数格式同onclick，其中：
                    // @param {string} eventPacket.type 事件类型，EVENT.DRAGOVER
                    // @param {Object} eventPacket.target 目标图形元素shape对象
                    // @param {Object} eventPacket.dragged 拖拽图形元素shape对象
                    // @return {boolean} 回调返回true则阻止抛出全局事件

       ondragleave : {Function}, // 默认为null，拖拽图形元素离开目标图形元素时触发，
                     // 回传参数格式同onclick，其中：
                     // @param {string} eventPacket.type 事件类型，EVENT.DRAGLEAVE
                     // @param {Object} eventPacket.target 目标图形元素shape对象
                     // @param {Object} eventPacket.dragged 拖拽图形元素shape对象
                     // @return {boolean} 回调返回true则阻止抛出全局事件

       ondrop : {Function}, // 默认为null，拖拽图形元素放在目标图形元素内时触发，
                // 回传参数格式同onclick，其中：
                // @param {string} eventPacket.type 事件类型，EVENT.DRAG
                // @param {Object} eventPacket.target 目标图形元素shape对象
                // @param {Object} eventPacket.dragged 拖拽图形元素shape对象
                // @return {boolean} 回调返回true则阻止抛出全局事件
   }
 */
define(
    'zrender/shape/base',['require','../tool/area','../tool/matrix','../tool/vector','../tool/color'],function(require) {

        var self;
        var area = require('../tool/area');
        var matrix = require('../tool/matrix');
        var vec2 = require('../tool/vector');

        /**
         * 派生实现通用功能
         * @param {Object} clazz 图形类
         */
        function derive(clazz) {
            var methods = [             // 派生实现的基类方法
                    'brush',
                    'setContext',
                    'dashedLineTo',
                    'smoothBezier',
                    'smoothSpline',
                    'drawText',
                    'getHighlightStyle',
                    'getHighlightZoom',
                    'drift',
                    'isCover',
                    'updateTransform'
                ];
            var len = methods.length;
            var proto = clazz.prototype;
            var i = 0;
            var method;

            for (; i < len; i++) {
                method = methods[i];
                if (!proto[method]) {
                    proto[method] = self[method];
                }
            }
        }

        /**
         * 画刷
         * @param ctx       画布句柄
         * @param e         形状实体
         * @param isHighlight   是否为高亮状态
         * @param updateCallback 需要异步加载资源的shape可以通过这个callback(e)
         *                       让painter更新视图，base.brush没用，需要的话重载brush
         */
        function brush(ctx, e, isHighlight) {
            var style = e.style || {};

            if (this.brushTypeOnly) {
                style.brushType = this.brushTypeOnly;
            }

            if (isHighlight) {
                // 根据style扩展默认高亮样式
                style = this.getHighlightStyle(
                    style,
                    e.highlightStyle || {},
                    this.brushTypeOnly
                );
            }

            if (this.brushTypeOnly == 'stroke') {
                style.strokeColor = style.strokeColor || style.color;
            }

            ctx.save();
            this.setContext(ctx, style);

            // 设置transform
            if (e.__needTransform) {
                ctx.transform.apply(ctx,this.updateTransform(e));
            }

            ctx.beginPath();
            this.buildPath(ctx, style);
            if (this.brushTypeOnly != 'stroke') {
                ctx.closePath();
            }

            switch (style.brushType) {
                case 'fill':
                    ctx.fill();
                    break;
                case 'stroke':
                    style.lineWidth > 0 && ctx.stroke();
                    break;
                case 'both':
                    ctx.fill();
                    style.lineWidth > 0 && ctx.stroke();
                    break;
                default:
                    ctx.fill();
            }

            if (typeof style.text != 'undefined') {
                this.drawText(ctx, style, e.style);
            }

            ctx.restore();

            return;
        }

        /**
         * 画布通用设置
         * @param ctx       画布句柄
         * @param style     通用样式
         */
        function setContext(ctx, style) {
            // 简单判断不做严格类型检测
            if (style.color) {
                ctx.fillStyle = style.color;
            }

            if (style.strokeColor) {
                ctx.strokeStyle = style.strokeColor;
            }

            if (typeof style.opacity != 'undefined') {
                ctx.globalAlpha = style.opacity;
            }

            if (style.lineCap) {
                ctx.lineCap = style.lineCap;
            }

            if (style.lineJoin) {
                ctx.lineJoin = style.lineJoin;
            }

            if (style.miterLimit) {
                ctx.miterLimit = style.miterLimit;
            }

            if (typeof style.lineWidth != 'undefined') {
                ctx.lineWidth = style.lineWidth;
            }

            if (typeof style.shadowBlur != 'undefined') {
                ctx.shadowBlur = style.shadowBlur;
            }

            if (style.shadowColor) {
                ctx.shadowColor = style.shadowColor;
            }

            if (typeof style.shadowOffsetX != 'undefined') {
                ctx.shadowOffsetX = style.shadowOffsetX;
            }

            if (typeof style.shadowOffsetY != 'undefined') {
                ctx.shadowOffsetY = style.shadowOffsetY;
            }
        }
        
        /**
         * 虚线lineTo 
         */
        function dashedLineTo(ctx, x1, y1, x2, y2, dashLength) {
            dashLength = typeof dashLength == 'undefined'
                         ? 5 : dashLength;
            var deltaX = x2 - x1;
            var deltaY = y2 - y1;
            var numDashes = Math.floor(
                Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashLength
            );
            for (var i = 0; i < numDashes; ++i) {
                ctx[i % 2 === 0 ? 'moveTo' : 'lineTo'](
                    x1 + (deltaX / numDashes) * i,
                    y1 + (deltaY / numDashes) * i
                );
            }
        }
        
        /**
         * 贝塞尔平滑曲线 
         */
        function smoothBezier(points, smooth, loop) {
            var len = points.length;
            var cps = [];

            var v = [];
            var v1 = [];
            var v2 = [];
            var prevPoint;
            var nextPoint;
            for(var i = 0; i < len; i++){
                var point = points[i];
                var prevPoint;
                var nextPoint;
                if (loop) {
                    prevPoint = points[i === 0 ? len-1 : i-1];
                    nextPoint = points[(i + 1) % len];
                } else {
                    if (i === 0 || i === len-1) {
                        cps.push(points[i]);
                        continue;
                    } else {
                        prevPoint = points[i-1];
                        nextPoint = points[i+1];
                    }
                }

                vec2.sub(v, nextPoint, prevPoint);

                //use degree to scale the handle length
                vec2.scale(v, v, smooth);

                var d0 = vec2.distance(point, prevPoint);
                var d1 = vec2.distance(point, nextPoint);
                var sum = d0 + d1;
                d0 /= sum;
                d1 /= sum;

                vec2.scale(v1, v, -d0);
                vec2.scale(v2, v, d1);

                cps.push(vec2.add([], point, v1));
                cps.push(vec2.add([], point, v2));
            }
            if (loop) {
                cps.push(cps.shift());
            }
            return cps;
        }

        /**
         * 多线段平滑曲线 Catmull-Rom spline
         */
        function smoothSpline(points, loop) {
            var len = points.length;
            var ret = [];

            var distance = 0;
            for (var i = 1; i < len; i++) {
                distance += vec2.distance(points[i-1], points[i]);
            }
            var segs = distance / 5;
            segs = segs < len ? len : segs;
            for (var i = 0; i < segs; i++) {
                var pos;
                if (loop) {
                    pos = i / (segs-1) * len;
                } else {
                    pos = i / (segs-1) * (len - 1);
                }
                var idx = Math.floor(pos);

                var w = pos - idx;

                var p0;
                var p1 = points[idx % len];
                var p2;
                var p3;
                if (!loop) {
                    p0 = points[idx === 0 ? idx : idx - 1];
                    p2 = points[idx > len - 2 ? len - 1 : idx + 1];
                    p3 = points[idx > len - 3 ? len - 1 : idx + 2];
                } else {
                    p0 = points[(idx -1 + len) % len];
                    p2 = points[(idx + 1) % len];
                    p3 = points[(idx + 2) % len];
                }

                var w2 = w * w;
                var w3 = w * w2;

                ret.push([
                    _interpolate(p0[0], p1[0], p2[0], p3[0], w, w2, w3),
                    _interpolate(p0[1], p1[1], p2[1], p3[1], w, w2, w3)
                ]);
            }
            return ret;
        }

        function _interpolate(p0, p1, p2, p3, t, t2, t3) {
            var v0 = (p2 - p0) * 0.5;
            var v1 = (p3 - p1) * 0.5;
            return (2 * (p1 - p2) + v0 + v1) * t3 
                    + (- 3 * (p1 - p2) - 2 * v0 - v1) * t2
                    + v0 * t + p1;
        }
        
        /**
         * 附加文本
         * @param {Context2D} ctx Canvas 2D上下文
         * @param {Object} style 样式
         * @param {Object} normalStyle 默认样式，用于定位文字显示
         */
        function drawText(ctx, style, normalStyle) {
            // 字体颜色策略
            style.textColor= style.textColor
                            || style.color
                            || style.strokeColor;
            ctx.fillStyle = style.textColor;

            if (style.textPosition == 'inside') {
                ctx.shadowColor = 'rgba(0,0,0,0)';   // 内部文字不带shadowColor
            }

            // 文本与图形间空白间隙
            var dd = 10;
            var al;         // 文本水平对齐
            var bl;         // 文本垂直对齐
            var tx;         // 文本横坐标
            var ty;         // 文本纵坐标

            var textPosition = style.textPosition       // 用户定义
                               || this.textPosition     // shape默认
                               || 'top';                // 全局默认

            if ((textPosition == 'inside'
                || textPosition == 'top'
                || textPosition == 'bottom'
                || textPosition == 'left'
                || textPosition == 'right')
                && this.getRect // 矩形定位文字的图形必须提供getRect方法
            ) {
                var rect = (normalStyle || style).__rect
                           || this.getRect(normalStyle || style);
                switch (textPosition) {
                    case 'inside':
                        tx = rect.x + rect.width / 2;
                        ty = rect.y + rect.height / 2;
                        al = 'center';
                        bl = 'middle';
                        if (style.brushType != 'stroke'
                            && style.textColor == style.color
                        ) {
                            ctx.fillStyle = '#fff';
                        }
                        break;
                    case 'left':
                        tx = rect.x - dd;
                        ty = rect.y + rect.height / 2;
                        al = 'end';
                        bl = 'middle';
                        break;
                    case 'right':
                        tx = rect.x + rect.width + dd;
                        ty = rect.y + rect.height / 2;
                        al = 'start';
                        bl = 'middle';
                        break;
                    case 'top':
                        tx = rect.x + rect.width / 2;
                        ty = rect.y - dd;
                        al = 'center';
                        bl = 'bottom';
                        break;
                    case 'bottom':
                        tx = rect.x + rect.width / 2;
                        ty = rect.y + rect.height + dd;
                        al = 'center';
                        bl = 'top';
                        break;
                }
            }
            else if (textPosition == 'start' || textPosition == 'end') {
                var xStart;
                var xEnd;
                var yStart;
                var yEnd;
                if (typeof style.pointList != 'undefined') {
                    var pointList = style.pointList;
                    if (pointList.length < 2) {
                        // 少于2个点就不画了~
                        return;
                    }
                    var length = pointList.length;
                    switch (textPosition) {
                        case 'start':
                            xStart = pointList[0][0];
                            xEnd = pointList[1][0];
                            yStart = pointList[0][1];
                            yEnd = pointList[1][1];
                            break;
                        case 'end':
                            xStart = pointList[length - 2][0];
                            xEnd = pointList[length - 1][0];
                            yStart = pointList[length - 2][1];
                            yEnd = pointList[length - 1][1];
                            break;
                    }
                }
                else {
                    xStart = style.xStart || 0;
                    xEnd = style.xEnd || 0;
                    yStart = style.yStart || 0;
                    yEnd = style.yEnd || 0;
                }
                switch (textPosition) {
                    case 'start':
                        al = xStart < xEnd ? 'end' : 'start';
                        bl = yStart < yEnd ? 'bottom' : 'top';
                        tx = xStart;
                        ty = yStart;
                        break;
                    case 'end':
                        al = xStart < xEnd ? 'start' : 'end';
                        bl = yStart < yEnd ? 'top' : 'bottom';
                        tx = xEnd;
                        ty = yEnd;
                        break;
                }
                dd -= 4;
                if (xStart != xEnd) {
                    tx -= (al == 'end' ? dd : -dd);
                } else {
                    al = 'center';
                }
                if (yStart != yEnd) {
                    ty -= (bl == 'bottom' ? dd : -dd);
                } else {
                    bl = 'middle';
                }
            }
            else if (textPosition == 'specific') {
                tx = style.textX || 0;
                ty = style.textY || 0;
                al = 'start';
                bl = 'middle';
            }

            if (typeof tx != 'undefined' && typeof ty != 'undefined') {
                _fillText(
                    ctx,
                    style.text, 
                    tx, ty, 
                    style.textFont,
                    style.textAlign || al,
                    style.textBaseline || bl
                );
            }
        }
        
        function _fillText(ctx, text, x, y, textFont, textAlign, textBaseline) {
            if (textFont) {
                ctx.font = textFont;
            }
            ctx.textAlign = textAlign;
            ctx.textBaseline = textBaseline;
            var rect = _getTextRect(
                text, x, y, textFont, textAlign, textBaseline
            );
            
            text = (text + '').split('\n');
            var lineHeight = area.getTextHeight('国', textFont);
            var x = x;
            var y;
            if (textBaseline == 'top') {
                y = rect.y;
            }
            else if (textBaseline == 'bottom') {
                y = rect.y + lineHeight;
            }
            else {
                y = rect.y + lineHeight / 2;
            }
            
            for (var i = 0, l = text.length; i < l; i++) {
                ctx.fillText(text[i], x, y);
                y += lineHeight;
            }
        }
        /**
         * 返回矩形区域，用于局部刷新和文字定位
         * @param {Object} style
         */
        function _getTextRect(text, x, y, textFont, textAlign, textBaseline) {
            var width = area.getTextWidth(text, textFont);
            var lineHeight = area.getTextHeight('国', textFont);
            
            text = (text + '').split('\n');
            
            var textX = x;                 //默认start == left
            if (textAlign == 'end' || textAlign == 'right') {
                textX -= width;
            }
            else if (textAlign == 'center') {
                textX -= (width / 2);
            }

            var textY;
            if (textBaseline == 'top') {
                textY = y;
            }
            else if (textBaseline == 'bottom') {
                textY = y - lineHeight * text.length;
            }
            else {
                // middle
                textY = y - lineHeight * text.length / 2;
            }

            return {
                x : textX,
                y : textY,
                width : width,
                height : lineHeight * text.length
            };
        }
    
        /**
         * 根据默认样式扩展高亮样式
         * @param ctx Canvas 2D上下文
         * @param {Object} style 默认样式
         * @param {Object} highlightStyle 高亮样式
         */
        function getHighlightStyle(style, highlightStyle, brushTypeOnly) {
            var newStyle = {};
            for (var k in style) {
                newStyle[k] = style[k];
            }

            var color = require('../tool/color');
            var highlightColor = color.getHighlightColor();
            // 根据highlightStyle扩展
            if (style.brushType != 'stroke') {
                // 带填充则用高亮色加粗边线
                newStyle.strokeColor = highlightColor;
                newStyle.lineWidth = (style.lineWidth || 1)
                                      + this.getHighlightZoom();
                newStyle.brushType = 'both';
            }
            else {
                if (brushTypeOnly != 'stroke') {
                    // 描边型的则用原色加工高亮
                    newStyle.strokeColor = highlightColor;
                    newStyle.lineWidth = (style.lineWidth || 1)
                                          + this.getHighlightZoom();
                } else {
                    // 线型的则用原色加工高亮
                    newStyle.strokeColor = highlightStyle.strokeColor
                                           || color.mix(
                                                 style.strokeColor,
                                                 color.toRGB(highlightColor)
                                              );
                }
            }

            // 可自定义覆盖默认值
            for (var k in highlightStyle) {
                if (typeof highlightStyle[k] != 'undefined') {
                    newStyle[k] = highlightStyle[k];
                }
            }

            return newStyle;
        }

        /**
         * 高亮放大效果参数
         * 当前统一设置为6，如有需要差异设置，通过this.type判断实例类型
         */
        function getHighlightZoom() {
            return this.type != 'text' ? 6 : 2;
        }

        /**
         * 默认漂移
         * @param e 图形实体
         * @param dx 横坐标变化
         * @param dy 纵坐标变化
         */
        function drift(e, dx, dy) {
            e.position[0] += dx;
            e.position[1] += dy;
        }

        /**
         * 默认区域包含判断
         * @param e 图形实体
         * @param x 横坐标
         * @param y 纵坐标
         */
        function isCover(e, x, y) {
            //对鼠标的坐标也做相同的变换
            if(e.__needTransform && e._transform){
                var inverseMatrix = [];
                matrix.invert(inverseMatrix, e._transform);

                var originPos = [x, y];
                matrix.mulVector(originPos, inverseMatrix, [x, y, 1]);

                if (x == originPos[0] && y == originPos[1]) {
                    // 避免外部修改导致的__needTransform不准确
                    if (Math.abs(e.rotation[0]) > 0.0001
                        || Math.abs(e.position[0]) > 0.0001
                        || Math.abs(e.position[1]) > 0.0001
                        || Math.abs(e.scale[0] - 1) > 0.0001
                        || Math.abs(e.scale[1] - 1) > 0.0001
                    ) {
                        e.__needTransform = true;
                    } else {
                        e.__needTransform = false;
                    }
                }

                x = originPos[0];
                y = originPos[1];
            }

            // 快速预判并保留判断矩形
            var rect;
            if (e.style.__rect) {
                rect = e.style.__rect;
            }
            else {
                rect = this.getRect(e.style);
                e.style.__rect = rect;
            }
            if (x >= rect.x
                && x <= (rect.x + rect.width)
                && y >= rect.y
                && y <= (rect.y + rect.height)
            ) {
                // 矩形内
                return area.isInside(this, e.style, x, y);
            }
            else {
                return false;
            }

        }

        function updateTransform(e) {
            var _transform = e._transform || matrix.create();
            matrix.identity(_transform);
            if (e.scale && (e.scale[0] !== 1 || e.scale[1] !== 1)) {
                var originX = e.scale[2] || 0;
                var originY = e.scale[3] || 0;
                if (originX || originY ) {
                    matrix.translate(
                        _transform, _transform, [-originX, -originY]
                    );
                }
                matrix.scale(_transform, _transform, e.scale);
                if ( originX || originY ) {
                    matrix.translate(
                        _transform, _transform, [originX, originY]
                    );
                }
            }
            if (e.rotation) {
                if (e.rotation instanceof Array) {
                    if (e.rotation[0] !== 0) {
                        var originX = e.rotation[1] || 0,
                            originY = e.rotation[2] || 0;
                        if (originX || originY ) {
                            matrix.translate(
                                _transform, _transform, [-originX, -originY]
                            );
                        }
                        matrix.rotate(_transform, _transform, e.rotation[0]);
                        if (originX || originY ) {
                            matrix.translate(
                                _transform, _transform, [originX, originY]
                            );
                        }
                    }
                }else{
                    if (e.rotation !== 0) {
                        matrix.rotate(_transform, _transform, e.rotation);
                    }
                }
            }
            if (e.position && (e.position[0] !==0 || e.position[1] !== 0)) {
                matrix.translate(_transform, _transform, e.position);
            }
            // 保存这个变换矩阵
            e._transform = _transform;

            return _transform;
        }

        self = {
            derive : derive,
            brush : brush,
            setContext : setContext,
            dashedLineTo : dashedLineTo,
            smoothBezier : smoothBezier,
            smoothSpline : smoothSpline,
            drawText : drawText,
            getHighlightStyle : getHighlightStyle,
            getHighlightZoom : getHighlightZoom,
            drift : drift,
            isCover : isCover,

            updateTransform : updateTransform
        };

        return self;
    }
);
/**
 * zrender
 *
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 *
 * shape类：圆
 * 可配图形属性：
   {
       // 基础属性
       shape  : 'circle',       // 必须，shape类标识，需要显式指定
       id     : {string},       // 必须，图形唯一标识，可通过zrender实例方法newShapeId生成
       zlevel : {number},       // 默认为0，z层level，决定绘画在哪层canvas中
       invisible : {boolean},   // 默认为false，是否可见

       // 样式属性，默认状态样式样式属性
       style  : {
           x             : {number},  // 必须，圆心横坐标
           y             : {number},  // 必须，圆心纵坐标
           r             : {number},  // 必须，圆半径
           brushType     : {string},  // 默认为fill，绘画方式
                                      // fill(填充) | stroke(描边) | both(填充+描边)
           color         : {color},   // 默认为'#000'，填充颜色，支持rgba
           strokeColor   : {color},   // 默认为'#000'，描边颜色（轮廓），支持rgba
           lineWidth     : {number},  // 默认为1，线条宽度，描边下有效

           opacity       : {number},  // 默认为1，透明度设置，如果color为rgba，则最终透明度效果叠加
           shadowBlur    : {number},  // 默认为0，阴影模糊度，大于0有效
           shadowColor   : {color},   // 默认为'#000'，阴影色彩，支持rgba
           shadowOffsetX : {number},  // 默认为0，阴影横向偏移，正值往右，负值往左
           shadowOffsetY : {number},  // 默认为0，阴影纵向偏移，正值往下，负值往上

           text          : {string},  // 默认为null，附加文本
           textFont      : {string},  // 默认为null，附加文本样式，eg:'bold 18px verdana'
           textPosition  : {string},  // 默认为top，附加文本位置。
                                      // inside | left | right | top | bottom
           textAlign     : {string},  // 默认根据textPosition自动设置，附加文本水平对齐。
                                      // start | end | left | right | center
           textBaseline  : {string},  // 默认根据textPosition自动设置，附加文本垂直对齐。
                                      // top | bottom | middle |
                                      // alphabetic | hanging | ideographic
           textColor     : {color},   // 默认根据textPosition自动设置，默认策略如下，附加文本颜色
                                      // 'inside' ? '#fff' : color
       },

       // 样式属性，高亮样式属性，当不存在highlightStyle时使用基于默认样式扩展显示
       highlightStyle : {
           // 同style
       }

       // 交互属性，详见shape.Base

       // 事件属性，详见shape.Base
   }
         例子：
   {
       shape  : 'circle',
       id     : '123456',
       zlevel : 1,
       style  : {
           x : 200,
           y : 100,
           r : 50,
           color : '#eee',
           text : 'Baidu'
       },
       myName : 'kener',  // 可自带任何有效自定义属性

       clickable : true,
       onClick : function(eventPacket) {
           alert(eventPacket.target.myName);
       }
   }
 */
define(
    'zrender/shape/circle',['require','./base','../shape'],function(require) {
        function Circle() {
            this.type = 'circle';
        }

        Circle.prototype =  {
            /**
             * 创建圆形路径
             * @param {Context2D} ctx Canvas 2D上下文
             * @param {Object} style 样式
             */
            buildPath : function(ctx, style) {
                ctx.arc(style.x, style.y, style.r, 0, Math.PI * 2, true);
                return;
            },

            /**
             * 返回矩形区域，用于局部刷新和文字定位
             * @param {Object} style
             */
            getRect : function(style) {
                var lineWidth;
                if (style.brushType == 'stroke' || style.brushType == 'fill') {
                    lineWidth = style.lineWidth || 1;
                }
                else {
                    lineWidth = 0;
                }
                return {
                    x : Math.round(style.x - style.r - lineWidth / 2),
                    y : Math.round(style.y - style.r - lineWidth / 2),
                    width : style.r * 2 + lineWidth,
                    height : style.r * 2 + lineWidth
                };
            }
        };

        var base = require('./base');
        base.derive(Circle);
        
        var shape = require('../shape');
        shape.define('circle', new Circle());

        return Circle;
    }
);
/**
 * zrender
 *
 * author: loutongbing@baidu.com
 *
 * shape类：椭圆
 * Todo：excanvas bug ~ 连续scale保持?? IE8下不建议使用
 * 可配图形属性：
   {
       // 基础属性
       shape  : 'ellipse',       // 必须，shape类标识，需要显式指定
       id     : {string},       // 必须，图形唯一标识，可通过zrender实例方法newShapeId生成
       zlevel : {number},       // 默认为0，z层level，决定绘画在哪层canvas中
       invisible : {boolean},   // 默认为false，是否可见

       // 样式属性，默认状态样式样式属性
       style  : {
           x             : {number},  // 必须，椭圆心横坐标
           y             : {number},  // 必须，椭圆心纵坐标
           a             : {number},  // 必须，椭圆横轴半径
           b             : {number},  // 必须，椭圆纵轴半径
           brushType     : {string},  // 默认为fill，绘画方式
                                      // fill(填充) | stroke(描边) | both(填充+描边)
           color         : {color},   // 默认为'#000'，填充颜色，支持rgba
           strokeColor   : {color},   // 默认为'#000'，描边颜色（轮廓），支持rgba
           lineWidth     : {number},  // 默认为1，线条宽度，描边下有效

           opacity       : {number},  // 默认为1，透明度设置，如果color为rgba，则最终透明度效果叠加
           shadowBlur    : {number},  // 默认为0，阴影模糊度，大于0有效
           shadowColor   : {color},   // 默认为'#000'，阴影色彩，支持rgba
           shadowOffsetX : {number},  // 默认为0，阴影横向偏移，正值往右，负值往左
           shadowOffsetY : {number},  // 默认为0，阴影纵向偏移，正值往下，负值往上

           text          : {string},  // 默认为null，附加文本
           textFont      : {string},  // 默认为null，附加文本样式，eg:'bold 18px verdana'
           textPosition  : {string},  // 默认为top，附加文本位置。
                                      // inside | left | right | top | bottom
           textAlign     : {string},  // 默认根据textPosition自动设置，附加文本水平对齐。
                                      // start | end | left | right | center
           textBaseline  : {string},  // 默认根据textPosition自动设置，附加文本垂直对齐。
                                      // top | bottom | middle |
                                      // alphabetic | hanging | ideographic
           textColor     : {color},   // 默认根据textPosition自动设置，默认策略如下，附加文本颜色
                                      // 'inside' ? '#fff' : color
       },

       // 样式属性，高亮样式属性，当不存在highlightStyle时使用基于默认样式扩展显示
       highlightStyle : {
           // 同style
       }

       // 交互属性，详见shape.Base

       // 事件属性，详见shape.Base
   }
         例子：
   {
       shape  : 'ellipse',
       id     : '123456',
       zlevel : 1,
       style  : {
           x : 200,
           y : 100,
           a : 100,
           b : 50,
           color : '#eee',
           text : 'Baidu'
       },
       myName : 'kener',  // 可自带任何有效自定义属性

       clickable : true,
       onClick : function(eventPacket) {
           alert(eventPacket.target.myName);
       }
   }
 */
define(
    'zrender/shape/ellipse',['require','./base','../shape'],function(require) {
        function Ellipse() {
            this.type = 'ellipse';
        }

        Ellipse.prototype =  {
            /**
             * 创建圆形路径
             * @param {Context2D} ctx Canvas 2D上下文
             * @param {Object} style 样式
             */
            buildPath : function(ctx, style) {
                var k = 0.5522848;
                var x = style.x;
                var y = style.y;
                var a =style.a;
                var b = style.b;
                var ox = a * k; // 水平控制点偏移量
                var oy = b * k; // 垂直控制点偏移量
                //从椭圆的左端点开始顺时针绘制四条三次贝塞尔曲线
                ctx.moveTo(x - a, y);
                ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
                ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
                ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
                ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
                return;
            },

            /**
             * 返回矩形区域，用于局部刷新和文字定位
             * @param {Object} style
             */
            getRect : function(style) {
                var lineWidth;
                if (style.brushType == 'stroke' || style.brushType == 'fill') {
                    lineWidth = style.lineWidth || 1;
                }
                else {
                    lineWidth = 0;
                }
                return {
                    x : Math.round(style.x - style.a - lineWidth / 2),
                    y : Math.round(style.y - style.b - lineWidth / 2),
                    width : style.a * 2 + lineWidth,
                    height : style.b * 2 + lineWidth
                };
            }
        };

        var base = require('./base');
        base.derive(Ellipse);
        
        var shape = require('../shape');
        shape.define('ellipse', new Ellipse());
        return Ellipse;
    }
);
/**
 * zrender
 *
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 *
 * shape类：直线
 * 可配图形属性：
   {
       // 基础属性
       shape  : 'line',         // 必须，shape类标识，需要显式指定
       id     : {string},       // 必须，图形唯一标识，可通过zrender实例方法newShapeId生成
       zlevel : {number},       // 默认为0，z层level，决定绘画在哪层canvas中
       invisible : {boolean},   // 默认为false，是否可见

       // 样式属性，默认状态样式样式属性
       style  : {
           xStart        : {number},  // 必须，起点横坐标
           yStart        : {number},  // 必须，起点纵坐标
           xEnd          : {number},  // 必须，终点横坐标
           yEnd          : {number},  // 必须，终点纵坐标
           strokeColor   : {color},   // 默认为'#000'，线条颜色（轮廓），支持rgba
           lineType      : {string},  // 默认为solid，线条类型，solid | dashed | dotted
           lineWidth     : {number},  // 默认为1，线条宽度
           lineCap       : {string},  // 默认为butt，线帽样式。butt | round | square

           opacity       : {number},  // 默认为1，透明度设置，如果color为rgba，则最终透明度效果叠加
           shadowBlur    : {number},  // 默认为0，阴影模糊度，大于0有效
           shadowColor   : {color},   // 默认为'#000'，阴影色彩，支持rgba
           shadowOffsetX : {number},  // 默认为0，阴影横向偏移，正值往右，负值往左
           shadowOffsetY : {number},  // 默认为0，阴影纵向偏移，正值往下，负值往上

           text          : {string},  // 默认为null，附加文本
           textFont      : {string},  // 默认为null，附加文本样式，eg:'bold 18px verdana'
           textPosition  : {string},  // 默认为end，附加文本位置。
                                      // inside | start | end
           textAlign     : {string},  // 默认根据textPosition自动设置，附加文本水平对齐。
                                      // start | end | left | right | center
           textBaseline  : {string},  // 默认根据textPosition自动设置，附加文本垂直对齐。
                                      // top | bottom | middle |
                                      // alphabetic | hanging | ideographic
           textColor     : {color},   // 默认根据textPosition自动设置，默认策略如下，附加文本颜色
                                      // 'inside' ? '#000' : color
       },

       // 样式属性，高亮样式属性，当不存在highlightStyle时使用基于默认样式扩展显示
       highlightStyle : {
           // 同style
       }

       // 交互属性，详见shape.Base

       // 事件属性，详见shape.Base
   }
         例子：
   {
       shape  : 'line',
       id     : '123456',
       zlevel : 1,
       style  : {
           xStart : 100,
           yStart : 100,
           xEnd : 200,
           yEnd : 200,
           strokeColor : '#eee',
           lineWidth : 20,
           text : 'Baidu'
       },
       myName : 'kener',  //可自带任何有效自定义属性

       clickable : true,
       onClick : function(eventPacket) {
           alert(eventPacket.target.myName);
       }
   }
 */
define(
    'zrender/shape/line',['require','./base','../shape'],function(require) {
        function Line() {
            this.type = 'line';
            this.brushTypeOnly = 'stroke';  //线条只能描边，填充后果自负
            this.textPosition = 'end';
        }

        Line.prototype =  {
            /**
             * 创建线条路径
             * @param {Context2D} ctx Canvas 2D上下文
             * @param {Object} style 样式
             */
            buildPath : function(ctx, style) {
                if (!style.lineType || style.lineType == 'solid') {
                    //默认为实线
                    ctx.moveTo(style.xStart, style.yStart);
                    ctx.lineTo(style.xEnd, style.yEnd);
                }
                else if (style.lineType == 'dashed'
                        || style.lineType == 'dotted'
                ) {
                    var dashLength =(style.lineWidth || 1)  
                                     * (style.lineType == 'dashed' ? 5 : 1);
                    this.dashedLineTo(
                        ctx,
                        style.xStart, style.yStart,
                        style.xEnd, style.yEnd,
                        dashLength
                    );
                }
            },

            /**
             * 返回矩形区域，用于局部刷新和文字定位
             * @param {Object} style
             */
            getRect : function(style) {
                var lineWidth = style.lineWidth || 1;
                return {
                    x : Math.min(style.xStart, style.xEnd) - lineWidth,
                    y : Math.min(style.yStart, style.yEnd) - lineWidth,
                    width : Math.abs(style.xStart - style.xEnd)
                            + lineWidth,
                    height : Math.abs(style.yStart - style.yEnd)
                             + lineWidth
                };
            }
        };

        var base = require('./base');
        base.derive(Line);
        
        var shape = require('../shape');
        shape.define('line', new Line());

        return Line;
    }
);
/**
 * zrender
 *
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 *
 * shape类：多边形
 * 可配图形属性：
   {
       // 基础属性
       shape  : 'polygon',      // 必须，shape类标识，需要显式指定
       id     : {string},       // 必须，图形唯一标识，可通过zrender实例方法newShapeId生成
       zlevel : {number},       // 默认为0，z层level，决定绘画在哪层canvas中
       invisible : {boolean},   // 默认为false，是否可见

       // 样式属性，默认状态样式样式属性
       style  : {
           pointList     : {Array},   // 必须，多边形各个顶角坐标
           brushType     : {string},  // 默认为fill，绘画方式
                                      // fill(填充) | stroke(描边) | both(填充+描边)
           color         : {color},   // 默认为'#000'，填充颜色，支持rgba
           strokeColor   : {color},   // 默认为'#000'，描边颜色（轮廓），支持rgba
           lineWidth     : {number},  // 默认为1，线条宽度，描边下有效

           opacity       : {number},  // 默认为1，透明度设置，如果color为rgba，则最终透明度效果叠加
           shadowBlur    : {number},  // 默认为0，阴影模糊度，大于0有效
           shadowColor   : {color},   // 默认为'#000'，阴影色彩，支持rgba
           shadowOffsetX : {number},  // 默认为0，阴影横向偏移，正值往右，负值往左
           shadowOffsetY : {number},  // 默认为0，阴影纵向偏移，正值往下，负值往上

           text          : {string},  // 默认为null，附加文本
           textFont      : {string},  // 默认为null，附加文本样式，eg:'bold 18px verdana'
           textPosition  : {string},  // 默认为top，附加文本位置。
                                      // inside | left | right | top | bottom
           textAlign     : {string},  // 默认根据textPosition自动设置，附加文本水平对齐。
                                      // start | end | left | right | center
           textBaseline  : {string},  // 默认根据textPosition自动设置，附加文本垂直对齐。
                                      // top | bottom | middle |
                                      // alphabetic | hanging | ideographic
           textColor     : {color},   // 默认根据textPosition自动设置，默认策略如下，附加文本颜色
                                      // 'inside' ? '#fff' : color
       },

       // 样式属性，高亮样式属性，当不存在highlightStyle时使用基于默认样式扩展显示
       highlightStyle : {
           // 同style
       }

       // 交互属性，详见shape.Base

       // 事件属性，详见shape.Base
   }
         例子：
   {
       shape  : 'polygon',
       id     : '123456',
       zlevel : 1,
       style  : {
           pointList : [[10, 10], [300, 20], [298, 400], [50, 450]]
           color : '#eee',
           text : 'Baidu'
       },
       myName : 'kener',  // 可自带任何有效自定义属性

       clickable : true,
       onClick : function(eventPacket) {
           alert(eventPacket.target.myName);
       }
   }
 */
define(
    'zrender/shape/polygon',['require','./base','../shape'],function(require) {
        function Polygon() {
            this.type = 'polygon';
        }

        Polygon.prototype = {
            /**
             * 画刷
             * @param ctx       画布句柄
             * @param e         形状实体
             * @param isHighlight   是否为高亮状态
             * @param updateCallback 需要异步加载资源的shape可以通过这个callback(e)
             *                       让painter更新视图，base.brush没用，需要的话重载brush
             */
            brush : function (ctx, e, isHighlight) {
                var style = e.style || {};
                if (isHighlight) {
                    // 根据style扩展默认高亮样式
                    style = this.getHighlightStyle(
                        style,
                        e.highlightStyle || {}
                    );
                }

                ctx.save();
                this.setContext(ctx, style);
    
                // 设置transform
                if (e.__needTransform) {
                    ctx.transform.apply(ctx,this.updateTransform(e));
                }
                
                // 先fill再stroke
                var hasPath = false;
                if (style.brushType == 'fill' 
                    || style.brushType == 'both'
                    || typeof style.brushType == 'undefined' // 默认为fill
                ) {
                    ctx.beginPath();
                    if (style.lineType == 'dashed' 
                        || style.lineType == 'dotted'
                    ) {
                        // 特殊处理，虚线围不成path，实线再build一次
                        this.buildPath(
                            ctx, 
                            {
                                lineType: 'solid',
                                lineWidth: style.lineWidth,
                                pointList: style.pointList
                            }
                        );
                        hasPath = false; // 这个path不能用
                    }
                    else {
                        this.buildPath(ctx, style);
                        hasPath = true; // 这个path能用
                    }
                    ctx.closePath();
                    ctx.fill();
                }

                if (style.lineWidth > 0 
                    && (style.brushType == 'stroke' || style.brushType == 'both')
                ) {
                    if (!hasPath) {
                        ctx.beginPath();
                        this.buildPath(ctx, style);
                        ctx.closePath();
                    }
                    ctx.stroke();
                }
    
                if (style.text) {
                    this.drawText(ctx, style, e.style);
                }
    
                ctx.restore();
    
                return;
            },
        
            /**
             * 创建多边形路径
             * @param {Context2D} ctx Canvas 2D上下文
             * @param {Object} style 样式
             */
            buildPath : function(ctx, style) {
                // 虽然能重用brokenLine，但底层图形基于性能考虑，重复代码减少调用吧
                var pointList = style.pointList;
                // 开始点和结束点重复
                var start = pointList[0];
                var end = pointList[pointList.length-1];
                if (start && end) {
                    if (start[0] == end[0] &&
                        start[1] == end[1]) {
                        // 移除最后一个点
                        pointList.pop();
                    }
                }
                if (pointList.length < 2) {
                    // 少于2个点就不画了~
                    return;
                }
                if (style.smooth && style.smooth !== 'spline') {
                    var controlPoints = this.smoothBezier(
                        pointList, style.smooth, true
                    );

                    ctx.moveTo(pointList[0][0], pointList[0][1]);
                    var cp1;
                    var cp2;
                    var p;
                    var len = pointList.length;
                    for (var i = 0; i < len; i++) {
                        cp1 = controlPoints[i * 2];
                        cp2 = controlPoints[i * 2 + 1];
                        p = pointList[(i + 1) % len];
                        ctx.bezierCurveTo(
                            cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]
                        );
                    }
                } 
                else {
                    if (style.smooth === 'spline') {
                        pointList = this.smoothSpline(pointList, true);
                    }
                    if (!style.lineType || style.lineType == 'solid') {
                        //默认为实线
                        ctx.moveTo(pointList[0][0],pointList[0][1]);
                        for (var i = 1, l = pointList.length; i < l; i++) {
                            ctx.lineTo(pointList[i][0],pointList[i][1]);
                        }
                        ctx.lineTo(pointList[0][0], pointList[0][1]);
                    }
                    else if (style.lineType == 'dashed'
                            || style.lineType == 'dotted'
                    ) {
                        var dashLength = 
                            style._dashLength
                            || (style.lineWidth || 1) 
                               * (style.lineType == 'dashed' ? 5 : 1);
                        style._dashLength = dashLength;
                        ctx.moveTo(pointList[0][0],pointList[0][1]);
                        for (var i = 1, l = pointList.length; i < l; i++) {
                            this.dashedLineTo(
                                ctx,
                                pointList[i - 1][0], pointList[i - 1][1],
                                pointList[i][0], pointList[i][1],
                                dashLength
                            );
                        }
                        this.dashedLineTo(
                            ctx,
                            pointList[pointList.length - 1][0], 
                            pointList[pointList.length - 1][1],
                            pointList[0][0],
                            pointList[0][1],
                            dashLength
                        );
                    }
                }
                return;
            },

            /**
             * 返回矩形区域，用于局部刷新和文字定位
             * @param {Object} style
             */
            getRect : function(style) {
                var minX =  Number.MAX_VALUE;
                var maxX =  Number.MIN_VALUE;
                var minY = Number.MAX_VALUE;
                var maxY = Number.MIN_VALUE;

                var pointList = style.pointList;
                for(var i = 0, l = pointList.length; i < l; i++) {
                    if (pointList[i][0] < minX) {
                        minX = pointList[i][0];
                    }
                    if (pointList[i][0] > maxX) {
                        maxX = pointList[i][0];
                    }
                    if (pointList[i][1] < minY) {
                        minY = pointList[i][1];
                    }
                    if (pointList[i][1] > maxY) {
                        maxY = pointList[i][1];
                    }
                }

                var lineWidth;
                if (style.brushType == 'stroke' || style.brushType == 'fill') {
                    lineWidth = style.lineWidth || 1;
                }
                else {
                    lineWidth = 0;
                }
                return {
                    x : Math.round(minX - lineWidth / 2),
                    y : Math.round(minY - lineWidth / 2),
                    width : maxX - minX + lineWidth,
                    height : maxY - minY + lineWidth
                };
            }
        };

        var base = require('./base');
        base.derive(Polygon);
        
        var shape = require('../shape');
        shape.define('polygon', new Polygon());

        return Polygon;
    }
);
/**
 * zrender
 *
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 *
 * shape类：折线
 * 可配图形属性：
   {
       // 基础属性
       shape  : 'brokenLine',         // 必须，shape类标识，需要显式指定
       id     : {string},       // 必须，图形唯一标识，可通过zrender实例方法newShapeId生成
       zlevel : {number},       // 默认为0，z层level，决定绘画在哪层canvas中
       invisible : {boolean},   // 默认为false，是否可见

       // 样式属性，默认状态样式样式属性
       style  : {
           pointList     : {Array},   // 必须，各个顶角坐标
           smooth        : {Number},  // 默认为0
           strokeColor   : {color},   // 默认为'#000'，线条颜色（轮廓），支持rgba
           lineType      : {string},  // 默认为solid，线条类型，solid | dashed | dotted
           lineWidth     : {number},  // 默认为1，线条宽度
           lineCap       : {string},  // 默认为butt，线帽样式。butt | round | square
           lineJoin      : {string},  // 默认为miter，线段连接样式。miter | round | bevel
           miterLimit    : {number},  // 默认为10，最大斜接长度，仅当lineJoin为miter时生效

           opacity       : {number},  // 默认为1，透明度设置，如果color为rgba，则最终透明度效果叠加
           shadowBlur    : {number},  // 默认为0，阴影模糊度，大于0有效
           shadowColor   : {color},   // 默认为'#000'，阴影色彩，支持rgba
           shadowOffsetX : {number},  // 默认为0，阴影横向偏移，正值往右，负值往左
           shadowOffsetY : {number},  // 默认为0，阴影纵向偏移，正值往下，负值往上

           text          : {string},  // 默认为null，附加文本
           textFont      : {string},  // 默认为null，附加文本样式，eg:'bold 18px verdana'
           textPosition  : {string},  // 默认为end，附加文本位置。
                                      // start | end
           textAlign     : {string},  // 默认根据textPosition自动设置，附加文本水平对齐。
                                      // start | end | left | right | center
           textBaseline  : {string},  // 默认根据textPosition自动设置，附加文本垂直对齐。
                                      // top | bottom | middle |
                                      // alphabetic | hanging | ideographic
           textColor     : {color},   // 默认根据textPosition自动设置，默认策略如下，附加文本颜色
                                      // 'inside' ? '#000' : color
       },

       // 样式属性，高亮样式属性，当不存在highlightStyle时使用基于默认样式扩展显示
       highlightStyle : {
           // 同style
       }

       // 交互属性，详见shape.Base

       // 事件属性，详见shape.Base
   }
         例子：
   {
       shape  : 'brokenLine',
       id     : '123456',
       zlevel : 1,
       style  : {
           pointList : [[10, 10], [300, 20], [298, 400], [50, 450]],
           strokeColor : '#eee',
           lineWidth : 20,
           text : 'Baidu'
       },
       myName : 'kener',  //可自带任何有效自定义属性

       clickable : true,
       onClick : function(eventPacket) {
           alert(eventPacket.target.myName);
       }
   }
 */
define(
    'zrender/shape/brokenLine',['require','../shape','./base','../shape'],function(require) {
        function BrokenLine() {
            this.type = 'brokenLine';
            this.brushTypeOnly = 'stroke';  //线条只能描边，填充后果自负
            this.textPosition = 'end';
        }

        BrokenLine.prototype =  {
            /**
             * 创建多边形路径
             * @param {Context2D} ctx Canvas 2D上下文
             * @param {Object} style 样式
             */
            buildPath : function(ctx, style) {
                var pointList = style.pointList;
                if (pointList.length < 2) {
                    // 少于2个点就不画了~
                    return;
                }
                if (style.smooth && style.smooth !== 'spline') {
                    var controlPoints = this.smoothBezier(
                        pointList, style.smooth, false
                    );

                    ctx.moveTo(pointList[0][0], pointList[0][1]);
                    var cp1;
                    var cp2;
                    var p;
                    for (var i = 0, l = pointList.length; i < l - 1; i++) {
                        cp1 = controlPoints[i * 2];
                        cp2 = controlPoints[i * 2 + 1];
                        p = pointList[i + 1];
                        ctx.bezierCurveTo(
                            cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]
                        );
                    }
                } 
                else {
                    if (style.smooth === 'spline') {
                        pointList = this.smoothSpline(pointList, false);
                    }
                    if (!style.lineType || style.lineType == 'solid') {
                        //默认为实线
                        ctx.moveTo(pointList[0][0],pointList[0][1]);
                        for (var i = 1, l = pointList.length; i < l; i++) {
                            ctx.lineTo(pointList[i][0],pointList[i][1]);
                        }
                    }
                    else if (style.lineType == 'dashed'
                            || style.lineType == 'dotted'
                    ) {
                        var dashLength = (style.lineWidth || 1) 
                                         * (style.lineType == 'dashed' ? 5 : 1);
                        ctx.moveTo(pointList[0][0],pointList[0][1]);
                        for (var i = 1, l = pointList.length; i < l; i++) {
                            this.dashedLineTo(
                                ctx,
                                pointList[i - 1][0], pointList[i - 1][1],
                                pointList[i][0], pointList[i][1],
                                dashLength
                            );
                        }
                    }
                }
                return;
            },

            /**
             * 返回矩形区域，用于局部刷新和文字定位
             * @param {Object} style
             */
            getRect : function(style) {
                var shape = require('../shape');
                return shape.get('polygon').getRect(style);
            }
        };

        var base = require('./base');
        base.derive(BrokenLine);
        
        var shape = require('../shape');
        shape.define('brokenLine', new BrokenLine());

        return BrokenLine;
    }
);
/**
 * zrender
 *
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com) , 
 *         strwind (@劲风FEI, yaofeifei@baidu.com)
 *
 * shape类：矩形
 * 可配图形属性：
   {
       // 基础属性
       shape  : 'rectangle',       // 必须，shape类标识，需要显式指定
       id     : {string},       // 必须，图形唯一标识，可通过zrender实例方法newShapeId生成
       zlevel : {number},       // 默认为0，z层level，决定绘画在哪层canvas中
       invisible : {boolean},   // 默认为false，是否可见

       // 样式属性，默认状态样式样式属性
       style  : {
           x             : {number},  // 必须，左上角横坐标
           y             : {number},  // 必须，左上角纵坐标
           width         : {number},  // 必须，宽度
           height        : {number},  // 必须，高度
           radius        : {array},   // 默认为[0]，圆角 
           brushType     : {string},  // 默认为fill，绘画方式
                                      // fill(填充) | stroke(描边) | both(填充+描边)
           color         : {color},   // 默认为'#000'，填充颜色，支持rgba
           strokeColor   : {color},   // 默认为'#000'，描边颜色（轮廓），支持rgba
           lineWidth     : {number},  // 默认为1，线条宽度，描边下有效

           opacity       : {number},  // 默认为1，透明度设置，如果color为rgba，则最终透明度效果叠加
           shadowBlur    : {number},  // 默认为0，阴影模糊度，大于0有效
           shadowColor   : {color},   // 默认为'#000'，阴影色彩，支持rgba
           shadowOffsetX : {number},  // 默认为0，阴影横向偏移，正值往右，负值往左
           shadowOffsetY : {number},  // 默认为0，阴影纵向偏移，正值往下，负值往上

           text          : {string},  // 默认为null，附加文本
           textFont      : {string},  // 默认为null，附加文本样式，eg:'bold 18px verdana'
           textPosition  : {string},  // 默认为top，附加文本位置。
                                      // inside | left | right | top | bottom
           textAlign     : {string},  // 默认根据textPosition自动设置，附加文本水平对齐。
                                      // start | end | left | right | center
           textBaseline  : {string},  // 默认根据textPosition自动设置，附加文本垂直对齐。
                                      // top | bottom | middle |
                                      // alphabetic | hanging | ideographic
           textColor     : {color},   // 默认根据textPosition自动设置，默认策略如下，附加文本颜色
                                      // 'inside' ? '#fff' : color
       },

       // 样式属性，高亮样式属性，当不存在highlightStyle时使用基于默认样式扩展显示
       highlightStyle : {
           // 同style
       }

       // 交互属性，详见shape.Base

       // 事件属性，详见shape.Base
   }
         例子：
   {
       shape  : 'rectangle',
       id     : '123456',
       zlevel : 1,
       style  : {
           x : 200,
           y : 100,
           width : 150,
           height : 50,
           color : '#eee',
           text : 'Baidu'
       },
       myName : 'kener',  // 可自带任何有效自定义属性

       clickable : true,
       onClick : function(eventPacket) {
           alert(eventPacket.target.myName);
       }
   }
 */
define(
    'zrender/shape/rectangle',['require','./base','../shape'],function(require) {
        function Rectangle() {
            this.type = 'rectangle';
        }

        Rectangle.prototype =  {
            /**
             * 绘制圆角矩形
             * @param {Context2D} ctx Canvas 2D上下文
             * @param {Object} style 样式
             */
            _buildRadiusPath: function(ctx, style) {
                //左上、右上、右下、左下角的半径依次为r1、r2、r3、r4
                //r缩写为1         相当于 [1, 1, 1, 1]
                //r缩写为[1]       相当于 [1, 1, 1, 1]
                //r缩写为[1, 2]    相当于 [1, 2, 1, 2]
                //r缩写为[1, 2, 3] 相当于 [1, 2, 3, 2]
                var x = style.x;
                var y = style.y;
                var width = style.width;
                var height = style.height;
                var r = style.radius;
                var r1; 
                var r2; 
                var r3; 
                var r4;
                  
                if(typeof r === 'number') {
                    r1 = r2 = r3 = r4 = r;
                }
                else if(r instanceof Array) {
                    if (r.length === 1) {
                        r1 = r2 = r3 = r4 = r[0];
                    }
                    else if(r.length === 2) {
                        r1 = r3 = r[0];
                        r2 = r4 = r[1];
                    }
                    else if(r.length === 3) {
                        r1 = r[0];
                        r2 = r4 = r[1];
                        r3 = r[2];
                    } else {
                        r1 = r[0];
                        r2 = r[1];
                        r3 = r[2];
                        r4 = r[3];
                    }
                } else {
                    r1 = r2 = r3 = r4 = 0;
                }
                ctx.moveTo(x + r1, y);
                ctx.lineTo(x + width - r2, y);
                r2 !== 0 && ctx.quadraticCurveTo(
                    x + width, y, x + width, y + r2
                );
                ctx.lineTo(x + width, y + height - r3);
                r3 !== 0 && ctx.quadraticCurveTo(
                    x + width, y + height, x + width - r3, y + height
                );
                ctx.lineTo(x + r4, y + height);
                r4 !== 0 && ctx.quadraticCurveTo(
                    x, y + height, x, y + height - r4
                );
                ctx.lineTo(x, y + r1);
                r1 !== 0 && ctx.quadraticCurveTo(x, y, x + r1, y);
            },
            
            /**
             * 创建矩形路径
             * @param {Context2D} ctx Canvas 2D上下文
             * @param {Object} style 样式
             */
            buildPath : function(ctx, style) {
                if(!style.radius) {
                    ctx.moveTo(style.x, style.y);
                    ctx.lineTo(style.x + style.width, style.y);
                    ctx.lineTo(style.x + style.width, style.y + style.height);
                    ctx.lineTo(style.x, style.y + style.height);
                    ctx.lineTo(style.x, style.y);
                    //ctx.rect(style.x, style.y, style.width, style.height);
                } else {
                    this._buildRadiusPath(ctx, style);
                }
                return;
            },

            /**
             * 返回矩形区域，用于局部刷新和文字定位
             * @param {Object} style
             */
            getRect : function(style) {
                var lineWidth;
                if (style.brushType == 'stroke' || style.brushType == 'fill') {
                    lineWidth = style.lineWidth || 1;
                }
                else {
                    lineWidth = 0;
                }
                return {
                    x : Math.round(style.x - lineWidth / 2),
                    y : Math.round(style.y - lineWidth / 2),
                    width : style.width + lineWidth,
                    height : style.height + lineWidth
                };
            }
        };

        var base = require('./base');
        base.derive(Rectangle);
        
        var shape = require('../shape');
        shape.define('rectangle', new Rectangle());

        return Rectangle;
    }
);
/**
 * zrender
 *
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 *
 * shape类：圆环
 * 可配图形属性：
   {
       // 基础属性
       shape  : 'ring',         // 必须，shape类标识，需要显式指定
       id     : {string},       // 必须，图形唯一标识，可通过zrender实例方法newShapeId生成
       zlevel : {number},       // 默认为0，z层level，决定绘画在哪层canvas中
       invisible : {boolean},   // 默认为false，是否可见

       // 样式属性，默认状态样式样式属性
       style  : {
           x             : {number},  // 必须，圆心横坐标
           y             : {number},  // 必须，圆心纵坐标
           r0            : {number},  // 必须，内圆半径
           r             : {number},  // 必须，外圆半径
           brushType     : {string},  // 默认为fill，绘画方式
                                      // fill(填充) | stroke(描边) | both(填充+描边)
           color         : {color},   // 默认为'#000'，填充颜色，支持rgba
           strokeColor   : {color},   // 默认为'#000'，描边颜色（轮廓），支持rgba
           lineWidth     : {number},  // 默认为1，线条宽度，描边下有效

           opacity       : {number},  // 默认为1，透明度设置，如果color为rgba，则最终透明度效果叠加
           shadowBlur    : {number},  // 默认为0，阴影模糊度，大于0有效
           shadowColor   : {color},   // 默认为'#000'，阴影色彩，支持rgba
           shadowOffsetX : {number},  // 默认为0，阴影横向偏移，正值往右，负值往左
           shadowOffsetY : {number},  // 默认为0，阴影纵向偏移，正值往下，负值往上

           text          : {string},  // 默认为null，附加文本
           textFont      : {string},  // 默认为null，附加文本样式，eg:'bold 18px verdana'
           textPosition  : {string},  // 默认为outside，附加文本位置。
                                      // outside | inside
           textAlign     : {string},  // 默认根据textPosition自动设置，附加文本水平对齐。
                                      // start | end | left | right | center
           textBaseline  : {string},  // 默认根据textPosition自动设置，附加文本垂直对齐。
                                      // top | bottom | middle |
                                      // alphabetic | hanging | ideographic
           textColor     : {color},   // 默认根据textPosition自动设置，默认策略如下，附加文本颜色
                                      // 'inside' ? '#fff' : color
       },

       // 样式属性，高亮样式属性，当不存在highlightStyle时使用基于默认样式扩展显示
       highlightStyle : {
           // 同style
       }

       // 交互属性，详见shape.Base

       // 事件属性，详见shape.Base
   }
         例子：
   {
       shape  : 'ring',
       id     : '123456',
       zlevel : 1,
       style  : {
           x : 200,
           y : 100,
           r : 50,
           color : '#eee',
           text : 'Baidu'
       },
       myName : 'kener',  // 可自带任何有效自定义属性

       clickable : true,
       onClick : function(eventPacket) {
           alert(eventPacket.target.myName);
       }
   }
 */
define(
    'zrender/shape/ring',['require','./base','../shape'],function(require) {
        function Ring() {
            this.type = 'ring';
        }

        Ring.prototype = {
            /**
             * 创建圆环路径，依赖扇形路径
             * @param {Context2D} ctx Canvas 2D上下文
             * @param {Object} style 样式
             */
            buildPath : function(ctx, style) {
                // 非零环绕填充优化
                ctx.arc(style.x, style.y, style.r, 0, Math.PI * 2, false);
                ctx.moveTo(style.x + style.r0, style.y);
                ctx.arc(style.x, style.y, style.r0, 0, Math.PI * 2, true);
                return;
            },

            /**
             * 返回矩形区域，用于局部刷新和文字定位
             * @param {Object} style
             */
            getRect : function(style) {
                var lineWidth;
                if (style.brushType == 'stroke' || style.brushType == 'fill') {
                    lineWidth = style.lineWidth || 1;
                }
                else {
                    lineWidth = 0;
                }
                return {
                    x : Math.round(style.x - style.r - lineWidth / 2),
                    y : Math.round(style.y - style.r - lineWidth / 2),
                    width : style.r * 2 + lineWidth,
                    height : style.r * 2 + lineWidth
                };
            }
        };

        var base = require('./base');
        base.derive(Ring);
        
        var shape = require('../shape');
        shape.define('ring', new Ring());

        return Ring;
    }
);
/**
 * zrender: 数学辅助类
 *
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 *
 * sin：正弦函数，自动缓存
 * cos：余弦函数，自动缓存
 * degreeToRadian：角度转弧度
 * radianToDegree：弧度转角度
 */
define(
    'zrender/tool/math',[],function() {
        /*
        var _cache = {
            sin : {},     //sin缓存
            cos : {}      //cos缓存
        };
        */
        var _radians = Math.PI / 180;

        /**
         * @param angle 弧度（角度）参数
         * @param isDegrees angle参数是否为角度计算，默认为false，angle为以弧度计量的角度
         */
        function sin(angle, isDegrees) {
            return Math.sin(isDegrees ? angle * _radians : angle);
            /*
            angle = (isDegrees ? angle * _radians : angle).toFixed(4);
            if(typeof _cache.sin[angle] == 'undefined') {
                _cache.sin[angle] = Math.sin(angle);
            }
            return _cache.sin[angle];
            */
        }

        /**
         * @param radians 弧度参数
         */
        function cos(angle, isDegrees) {
            return Math.cos(isDegrees ? angle * _radians : angle);
            /*
            angle = (isDegrees ? angle * _radians : angle).toFixed(4);
            if(typeof _cache.cos[angle] == 'undefined') {
                _cache.cos[angle] = Math.cos(angle);
            }
            return _cache.cos[angle];
            */
        }

        /**
         * 角度转弧度
         * @param {Object} angle
         */
        function degreeToRadian(angle) {
            return angle * _radians;
        }

        /**
         * 弧度转角度
         * @param {Object} angle
         */
        function radianToDegree(angle) {
            return angle / _radians;
        }

        return {
            sin : sin,
            cos : cos,
            degreeToRadian : degreeToRadian,
            radianToDegree : radianToDegree
        };
    }
);
/**
 * zrender
 *
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 *
 * shape类：扇形
 * 可配图形属性：
   {
       // 基础属性
       shape  : 'sector',       // 必须，shape类标识，需要显式指定
       id     : {string},       // 必须，图形唯一标识，可通过zrender实例方法newShapeId生成
       zlevel : {number},       // 默认为0，z层level，决定绘画在哪层canvas中
       invisible : {boolean},   // 默认为false，是否可见

       // 样式属性，默认状态样式样式属性
       style  : {
           x             : {number},  // 必须，圆心横坐标
           y             : {number},  // 必须，圆心纵坐标
           r0            : {number},  // 默认为0，内圆半径，指定后将出现内弧，同时扇边长度 = r - r0
           r             : {number},  // 必须，外圆半径
           startAngle    : {number},  // 必须，起始角度[0, 360)
           endAngle      : {number},  // 必须，结束角度(0, 360]
           brushType     : {string},  // 默认为fill，绘画方式
                                      // fill(填充) | stroke(描边) | both(填充+描边)
           color         : {color},   // 默认为'#000'，填充颜色，支持rgba
           strokeColor   : {color},   // 默认为'#000'，描边颜色（轮廓），支持rgba
           lineWidth     : {number},  // 默认为1，线条宽度，描边下有效

           opacity       : {number},  // 默认为1，透明度设置，如果color为rgba，则最终透明度效果叠加
           shadowBlur    : {number},  // 默认为0，阴影模糊度，大于0有效
           shadowColor   : {color},   // 默认为'#000'，阴影色彩，支持rgba
           shadowOffsetX : {number},  // 默认为0，阴影横向偏移，正值往右，负值往左
           shadowOffsetY : {number},  // 默认为0，阴影纵向偏移，正值往下，负值往上

           text          : {string},  // 默认为null，附加文本
           textFont      : {string},  // 默认为null，附加文本样式，eg:'bold 18px verdana'
           textPosition  : {string},  // 默认为outside，附加文本位置。
                                      // outside | inside
           textAlign     : {string},  // 默认根据textPosition自动设置，附加文本水平对齐。
                                      // start | end | left | right | center
           textBaseline  : {string},  // 默认根据textPosition自动设置，附加文本垂直对齐。
                                      // top | bottom | middle |
                                      // alphabetic | hanging | ideographic
           textColor     : {color},   // 默认根据textPosition自动设置，默认策略如下，附加文本颜色
                                      // 'inside' ? '#fff' : color
       },

       // 样式属性，高亮样式属性，当不存在highlightStyle时使用基于默认样式扩展显示
       highlightStyle : {
           // 同style
       }

       // 交互属性，详见shape.Base

       // 事件属性，详见shape.Base
   }
         例子：
   {
       shape  : 'sector',
       id     : '123456',
       zlevel : 1,
       style  : {
           x : 200,
           y : 100,
           r : 50,
           color : '#eee',
           text : 'Baidu'
       },
       myName : 'kener',  // 可自带任何有效自定义属性

       clickable : true,
       onClick : function(eventPacket) {
           alert(eventPacket.target.myName);
       }
   }
 */
define(
    'zrender/shape/sector',['require','../tool/math','../shape','./base','../shape'],function(require) {
        var math = require('../tool/math');

        function Sector() {
            this.type = 'sector';
        }

        Sector.prototype = {
            /**
             * 创建扇形路径
             * @param {Context2D} ctx Canvas 2D上下文
             * @param {Object} style 样式
             */
            buildPath : function(ctx, style) {
                var x = style.x;   // 圆心x
                var y = style.y;   // 圆心y
                var r0 = typeof style.r0 == 'undefined'     // 形内半径[0,r)
                         ? 0 : style.r0;
                var r = style.r;                            // 扇形外半径(0,r]
                var startAngle = style.startAngle;          // 起始角度[0,360)
                var endAngle = style.endAngle;              // 结束角度(0,360]

                if (Math.abs(endAngle - startAngle) >= 360) {
                    // 大于360度的扇形简化为圆环画法
                    ctx.arc(x, y, r, 0, Math.PI * 2, false);
                    if (r0 !== 0) {
                        ctx.moveTo(x + r0, y);
                        ctx.arc(x, y, r0, 0, Math.PI * 2, true);
                    }
                    return;
                }
                
                startAngle = math.degreeToRadian(startAngle);
                endAngle = math.degreeToRadian(endAngle);

                var PI2 = Math.PI * 2;
                var cosStartAngle = math.cos(startAngle);
                var sinStartAngle = math.sin(startAngle);
                ctx.moveTo(
                    cosStartAngle * r0 + x,
                    y - sinStartAngle * r0
                );

                ctx.lineTo(
                    cosStartAngle * r + x,
                    y - sinStartAngle * r
                );

                ctx.arc(x, y, r, PI2 - startAngle, PI2 - endAngle, true);

                ctx.lineTo(
                    math.cos(endAngle) * r0 + x,
                    y - math.sin(endAngle) * r0
                );

                if (r0 !== 0) {
                    ctx.arc(x, y, r0, PI2 - endAngle, PI2 - startAngle, false);
                }

                return;
            },

            /**
             * 返回矩形区域，用于局部刷新和文字定位
             * @param {Object} style
             */
            getRect : function(style) {
                var shape = require('../shape');
                var x = style.x;   // 圆心x
                var y = style.y;   // 圆心y
                var r0 = typeof style.r0 == 'undefined'     // 形内半径[0,r)
                         ? 0 : style.r0;
                var r = style.r;                            // 扇形外半径(0,r]
                var startAngle = style.startAngle;          // 起始角度[0,360)
                var endAngle = style.endAngle;              // 结束角度(0,360]
                
                if (Math.abs(endAngle - startAngle) >= 360) {
                    // 大于360度的扇形简化为圆环bbox
                    return shape.get('ring').getRect(style);;
                }
                
                startAngle = (720 + startAngle) % 360;
                endAngle = (720 + endAngle) % 360;
                if (endAngle <= startAngle) {
                    endAngle += 360;
                }
                var pointList = [];
                if (startAngle <= 90 && endAngle >= 90) {
                    pointList.push([
                        x, y - r
                    ]);
                }
                if (startAngle <= 180 && endAngle >= 180) {
                    pointList.push([
                        x - r, y
                    ]);
                }
                if (startAngle <= 270 && endAngle >= 270) {
                    pointList.push([
                        x, y + r
                    ]);
                }
                if (startAngle <= 360 && endAngle >= 360) {
                    pointList.push([
                        x + r, y
                    ]);
                }

                startAngle = math.degreeToRadian(startAngle);
                endAngle = math.degreeToRadian(endAngle);


                pointList.push([
                    math.cos(startAngle) * r0 + x,
                    y - math.sin(startAngle) * r0
                ]);

                pointList.push([
                    math.cos(startAngle) * r + x,
                    y - math.sin(startAngle) * r
                ]);

                pointList.push([
                    math.cos(endAngle) * r + x,
                    y - math.sin(endAngle) * r
                ]);

                pointList.push([
                    math.cos(endAngle) * r0 + x,
                    y - math.sin(endAngle) * r0
                ]);

                return shape.get('polygon').getRect({
                    brushType : style.brushType,
                    lineWidth : style.lineWidth,
                    pointList : pointList
                });
            }
        };

        var base = require('./base');
        base.derive(Sector);
        
        var shape = require('../shape');
        shape.define('sector', new Sector());

        return Sector;
    }
);
/**
 * zrender
 *
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 *
 * shape类：文字
 * 可配图形属性：
   {
       // 基础属性
       shape  : 'text',         // 必须，shape类标识，需要显式指定
       id     : {string},       // 必须，图形唯一标识，可通过zrender实例方法newShapeId生成
       zlevel : {number},       // 默认为0，z层level，决定绘画在哪层canvas中
       invisible : {boolean},   // 默认为false，是否可见

       // 样式属性，默认状态样式样式属性
       style  : {
           x             : {number},  // 必须，横坐标
           y             : {number},  // 必须，纵坐标
           brushType     : {string},  // 默认为fill，绘画方式
                                      // fill(填充) | stroke(描边) | both(填充+描边)
           color         : {color},   // 默认为'#000'，填充颜色，支持rgba
           strokeColor   : {color},   // 默认为'#000'，线条颜色（轮廓），支持rgba
           lineWidth     : {number},  // 默认为1，线条宽度

           opacity       : {number},  // 默认为1，透明度设置，如果color为rgba，则最终透明度效果叠加
           shadowBlur    : {number},  // 默认为0，阴影模糊度，大于0有效
           shadowColor   : {color},   // 默认为'#000'，阴影色彩，支持rgba
           shadowOffsetX : {number},  // 默认为0，阴影横向偏移，正值往右，负值往左
           shadowOffsetY : {number},  // 默认为0，阴影纵向偏移，正值往下，负值往上

           text          : {string},  // 必须，文本内容
           textFont      : {string},  // 默认为null，文本文字样式，eg:'bold 18px verdana'
           textAlign     : {string},  // 默认为start，文本水平对齐。
                                      // start | end | left | right | center
           textBaseline  : {string},  // 默认为middle，文本垂直对齐。
                                      // top | bottom | middle |
                                      // alphabetic | hanging | ideographic
           maxWidth      : {number}   // 默认为null，最大宽度
       },

       // 样式属性，高亮样式属性，当不存在highlightStyle时使用基于默认样式扩展显示
       highlightStyle : {
           // 同style
       }

       // 交互属性，详见shape.Base

       // 事件属性，详见shape.Base
   }
         例子：
   {
       shape  : 'text',
       id     : '123456',
       zlevel : 1,
       style  : {
           x : 200,
           y : 100,
           color : 'red',
           text : 'Baidu'
       },
       myName : 'kener',  //可自带任何有效自定义属性

       clickable : true,
       onClick : function(eventPacket) {
           alert(eventPacket.target.myName);
       }
   }
 */
define(
    'zrender/shape/text',['require','../tool/area','./base','../shape'],function(require) {
        var area = require('../tool/area');
        
        function Text() {
            this.type = 'text';
        }

        Text.prototype =  {
            /**
             * 画刷，重载基类方法
             * @param {Context2D} ctx Canvas 2D上下文
             * @param e 图形形状实体
             * @param isHighlight 是否为高亮状态
             */
            brush : function(ctx, e, isHighlight) {
                var style = e.style || {};
                if (isHighlight) {
                    // 根据style扩展默认高亮样式
                    style = this.getHighlightStyle(
                        style, e.highlightStyle || {}
                    );
                }
                
                if (typeof style.text == 'undefined') {
                    return;
                }

                ctx.save();
                this.setContext(ctx, style);

                // 设置transform
                if (e.__needTransform) {
                    ctx.transform.apply(ctx,this.updateTransform(e));
                }

                if (style.textFont) {
                    ctx.font = style.textFont;
                }
                ctx.textAlign = style.textAlign || 'start';
                ctx.textBaseline = style.textBaseline || 'middle';

                var text = (style.text + '').split('\n');
                var lineHeight = area.getTextHeight('国', style.textFont);
                var rect = this.getRect(style);
                var x = style.x;
                var y;
                if (style.textBaseline == 'top') {
                    y = rect.y;
                }
                else if (style.textBaseline == 'bottom') {
                    y = rect.y + lineHeight;
                }
                else {
                    y = rect.y + lineHeight / 2;
                }
                
                for (var i = 0, l = text.length; i < l; i++) {
                    if (style.maxWidth) {
                        switch (style.brushType) {
                            case 'fill':
                                ctx.fillText(
                                    text[i],
                                    x, y, style.maxWidth
                                );
                                break;
                            case 'stroke':
                                ctx.strokeText(
                                    text[i],
                                    x, y, style.maxWidth
                                );
                                break;
                            case 'both':
                                ctx.fillText(
                                    text[i],
                                    x, y, style.maxWidth
                                );
                                ctx.strokeText(
                                    text[i],
                                    x, y, style.maxWidth
                                );
                                break;
                            default:
                                ctx.fillText(
                                    text[i],
                                    x, y, style.maxWidth
                                );
                        }
                    }
                    else{
                        switch (style.brushType) {
                            case 'fill':
                                ctx.fillText(text[i], x, y);
                                break;
                            case 'stroke':
                                ctx.strokeText(text[i], x, y);
                                break;
                            case 'both':
                                ctx.fillText(text[i], x, y);
                                ctx.strokeText(text[i], x, y);
                                break;
                            default:
                                ctx.fillText(text[i], x, y);
                        }
                    }
                    y += lineHeight;
                }

                ctx.restore();
                return;
            },

            /**
             * 返回矩形区域，用于局部刷新和文字定位
             * @param {Object} style
             */
            getRect : function(style) {
                var width = area.getTextWidth(style.text, style.textFont);
                var height = area.getTextHeight(style.text, style.textFont);
                
                var textX = style.x;                 //默认start == left
                if (style.textAlign == 'end' || style.textAlign == 'right') {
                    textX -= width;
                }
                else if (style.textAlign == 'center') {
                    textX -= (width / 2);
                }

                var textY;
                if (style.textBaseline == 'top') {
                    textY = style.y;
                }
                else if (style.textBaseline == 'bottom') {
                    textY = style.y - height;
                }
                else {
                    // middle
                    textY = style.y - height / 2;
                }

                return {
                    x : textX,
                    y : textY,
                    width : width,
                    height : height
                };
            }
        };

        var base = require('./base');
        base.derive(Text);
        
        var shape = require('../shape');
        shape.define('text', new Text());

        return Text;
    }
);

/**
 * zrender
 *
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 *
 * shape类：心形
 * 可配图形属性：
   {
       // 基础属性
       shape  : 'heart',       // 必须，shape类标识，需要显式指定
       id     : {string},       // 必须，图形唯一标识，可通过zrender实例方法newShapeId生成
       zlevel : {number},       // 默认为0，z层level，决定绘画在哪层canvas中
       invisible : {boolean},   // 默认为false，是否可见

       // 样式属性，默认状态样式样式属性
       style  : {
           x             : {number},  // 必须，心形内部尖端横坐标
           y             : {number},  // 必须，心形内部尖端纵坐标
           a             : {number},  // 必须，心形横宽（中轴线到水平边缘最宽处距离）
           b             : {number},  // 必须，心形纵高（内尖到外尖距离）
           brushType     : {string},  // 默认为fill，绘画方式
                                      // fill(填充) | stroke(描边) | both(填充+描边)
           color         : {color},   // 默认为'#000'，填充颜色，支持rgba
           strokeColor   : {color},   // 默认为'#000'，描边颜色（轮廓），支持rgba
           lineWidth     : {number},  // 默认为1，线条宽度，描边下有效

           shadowBlur    : {number},  // 默认为0，阴影模糊度，大于0有效
           shadowColor   : {color},   // 默认为'#000'，阴影色彩，支持rgba
           shadowOffsetX : {number},  // 默认为0，阴影横向偏移，正值往右，负值往左
           shadowOffsetY : {number},  // 默认为0，阴影横向偏移，正值往右，负值往左

           text          : {string},  // 默认为null，附加文本
           textFont      : {string},  // 默认为null，附加文本样式，eg:'bold 18px verdana'
           textPosition  : {string},  // 默认为outside，附加文本位置。
                                      // outside | inside
           textAlign     : {string},  // 默认根据textPosition自动设置，附加文本水平对齐。
                                      // start | end | left | right | center
           textBaseline  : {string},  // 默认根据textPosition自动设置，附加文本垂直对齐。
                                      // top | bottom | middle |
                                      // alphabetic | hanging | ideographic
           textColor     : {color},   // 默认根据textPosition自动设置，默认策略如下，附加文本颜色
                                      // 'inside' ? '#fff' : color
       },

       // 样式属性，高亮样式属性，当不存在highlightStyle时使用基于默认样式扩展显示
       highlightStyle : {
           // 同style
       }

       // 交互属性，详见shape.Base

       // 事件属性，详见shape.Base
   }
         例子：
   {
       shape  : 'heart',
       id     : '123456',
       zlevel : 1,
       style  : {
           x : 200,
           y : 100,
           a : 50,
           b : 80,
           color : '#eee',
           text : 'Baidu'
       },
       myName : 'kener',  // 可自带任何有效自定义属性

       clickable : true,
       onClick : function(eventPacket) {
           alert(eventPacket.target.myName);
       }
   }
 */
define(
    'zrender/shape/heart',['require','./base','../shape'],function(require) {
        function Heart() {
            this.type = 'heart';
        }

        Heart.prototype = {
            /**
             * 创建扇形路径
             * @param {Context2D} ctx Canvas 2D上下文
             * @param {Object} style 样式
             */
            buildPath : function(ctx, style) {
                ctx.moveTo(style.x, style.y);
                ctx.bezierCurveTo(
                    style.x + style.a / 2,
                    style.y - style.b * 2 / 3,
                    style.x + style.a * 2,
                    style.y + style.b / 3,
                    style.x,
                    style.y + style.b
                );
                ctx.bezierCurveTo(
                    style.x - style.a *  2,
                    style.y + style.b / 3,
                    style.x - style.a / 2,
                    style.y - style.b * 2 / 3,
                    style.x,
                    style.y
                );
                return;
            },

            /**
             * 返回矩形区域，用于局部刷新和文字定位
             * @param {Object} style
             */
            getRect : function(style) {
                var lineWidth;
                if (style.brushType == 'stroke' || style.brushType == 'fill') {
                    lineWidth = style.lineWidth || 1;
                }
                else {
                    lineWidth = 0;
                }
                return {
                    x : Math.round(style.x - style.a - lineWidth / 2),
                    y : Math.round(style.y - style.b / 4 - lineWidth / 2),
                    width : style.a * 2 + lineWidth,
                    height : style.b * 5 / 4 + lineWidth
                };
            }
        };

        var base = require('./base');
        base.derive(Heart);
        
        var shape = require('../shape');
        shape.define('heart', new Heart());

        return Heart;
    }
);
/**
 * zrender
 *
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 *
 * shape类：水滴
 * 可配图形属性：
   {
       // 基础属性
       shape  : 'heart',       // 必须，shape类标识，需要显式指定
       id     : {string},       // 必须，图形唯一标识，可通过zrender实例方法newShapeId生成
       zlevel : {number},       // 默认为0，z层level，决定绘画在哪层canvas中
       invisible : {boolean},   // 默认为false，是否可见

       // 样式属性，默认状态样式样式属性
       style  : {
           x             : {number},  // 必须，水滴中心横坐标
           y             : {number},  // 必须，水滴中心纵坐标
           a             : {number},  // 必须，水滴横宽（中心到水平边缘最宽处距离）
           b             : {number},  // 必须，水滴纵高（中心到尖端距离）
           brushType     : {string},  // 默认为fill，绘画方式
                                      // fill(填充) | stroke(描边) | both(填充+描边)
           color         : {color},   // 默认为'#000'，填充颜色，支持rgba
           strokeColor   : {color},   // 默认为'#000'，描边颜色（轮廓），支持rgba
           lineWidth     : {number},  // 默认为1，线条宽度，描边下有效

           shadowBlur    : {number},  // 默认为0，阴影模糊度，大于0有效
           shadowColor   : {color},   // 默认为'#000'，阴影色彩，支持rgba
           shadowOffsetX : {number},  // 默认为0，阴影横向偏移，正值往右，负值往左
           shadowOffsetY : {number},  // 默认为0，阴影横向偏移，正值往右，负值往左

           text          : {string},  // 默认为null，附加文本
           textFont      : {string},  // 默认为null，附加文本样式，eg:'bold 18px verdana'
           textPosition  : {string},  // 默认为outside，附加文本位置。
                                      // outside | inside
           textAlign     : {string},  // 默认根据textPosition自动设置，附加文本水平对齐。
                                      // start | end | left | right | center
           textBaseline  : {string},  // 默认根据textPosition自动设置，附加文本垂直对齐。
                                      // top | bottom | middle |
                                      // alphabetic | hanging | ideographic
           textColor     : {color},   // 默认根据textPosition自动设置，默认策略如下，附加文本颜色
                                      // 'inside' ? '#fff' : color
       },

       // 样式属性，高亮样式属性，当不存在highlightStyle时使用基于默认样式扩展显示
       highlightStyle : {
           // 同style
       }

       // 交互属性，详见shape.Base

       // 事件属性，详见shape.Base
   }
         例子：
   {
       shape  : 'droplet',
       id     : '123456',
       zlevel : 1,
       style  : {
           x : 200,
           y : 100,
           a : 50,
           b : 80,
           color : '#eee',
           text : 'Baidu'
       },
       myName : 'kener',  // 可自带任何有效自定义属性

       clickable : true,
       onClick : function(eventPacket) {
           alert(eventPacket.target.myName);
       }
   }
 */
define(
    'zrender/shape/droplet',['require','./base','../shape'],function(require) {
        function Droplet() {
            this.type = 'droplet';
        }

        Droplet.prototype = {
            /**
             * 创建扇形路径
             * @param {Context2D} ctx Canvas 2D上下文
             * @param {Object} style 样式
             */
            buildPath : function(ctx, style) {
                ctx.moveTo(style.x, style.y + style.a);
                ctx.bezierCurveTo(
                    style.x + style.a,
                    style.y + style.a,
                    style.x + style.a * 3 / 2,
                    style.y - style.a / 3,
                    style.x,
                    style.y - style.b
                );
                ctx.bezierCurveTo(
                    style.x - style.a * 3 / 2,
                    style.y - style.a / 3,
                    style.x - style.a,
                    style.y + style.a,
                    style.x,
                    style.y + style.a
                );
                return;
            },

            /**
             * 返回矩形区域，用于局部刷新和文字定位
             * @param {Object} style
             */
            getRect : function(style) {
                var lineWidth;
                if (style.brushType == 'stroke' || style.brushType == 'fill') {
                    lineWidth = style.lineWidth || 1;
                }
                else {
                    lineWidth = 0;
                }
                return {
                    x : Math.round(style.x - style.a - lineWidth / 2),
                    y : Math.round(style.y - style.b - lineWidth / 2),
                    width : style.a * 2 + lineWidth,
                    height : style.a + style.b + lineWidth
                };
            }
        };

        var base = require('./base');
        base.derive(Droplet);
        
        var shape = require('../shape');
        shape.define('droplet', new Droplet());

        return Droplet;
    }
);
/**
 * zrender
 *
 * author: CrossDo (chenhuaimu@baidu.com)
 *
 * shape类：路径
 * 可配图形属性：
   {
       // 基础属性
       shape  : 'path',         // 必须，shape类标识，需要显式指定
       id     : {string},       // 必须，图形唯一标识，可通过zrender实例方法newShapeId生成
       zlevel : {number},       // 默认为0，z层level，决定绘画在哪层canvas中
       invisible : {boolean},   // 默认为false，是否可见

       // 样式属性，默认状态样式样式属性
       style  : {
           path          : {string},// 必须，路径。例如:M 0 0 L 0 10 L 10 10 Z (一个三角形)
                                    //M = moveto
                                    //L = lineto
                                    //H = horizontal lineto
                                    //V = vertical lineto
                                    //C = curveto
                                    //S = smooth curveto
                                    //Q = quadratic Belzier curve
                                    //T = smooth quadratic Belzier curveto
                                    //Z = closepath


           x             : {number},  // 必须，x轴坐标
           y             : {number},  // 必须，y轴坐标


           brushType     : {string},  // 默认为fill，绘画方式
                                      // fill(填充) | stroke(描边) | both(填充+描边)
           color         : {color},   // 默认为'#000'，填充颜色，支持rgba
           strokeColor   : {color},   // 默认为'#000'，描边颜色（轮廓），支持rgba
           lineWidth     : {number},  // 默认为1，线条宽度，描边下有效

           opacity       : {number},  // 默认为1，透明度设置，如果color为rgba，则最终透明度效果叠加
           shadowBlur    : {number},  // 默认为0，阴影模糊度，大于0有效
           shadowColor   : {color},   // 默认为'#000'，阴影色彩，支持rgba
           shadowOffsetX : {number},  // 默认为0，阴影横向偏移，正值往右，负值往左
           shadowOffsetY : {number},  // 默认为0，阴影纵向偏移，正值往下，负值往上

           text          : {string},  // 默认为null，附加文本
           textFont      : {string},  // 默认为null，附加文本样式，eg:'bold 18px verdana'
           textPosition  : {string},  // 默认为top，附加文本位置。
                                      // inside | left | right | top | bottom
           textAlign     : {string},  // 默认根据textPosition自动设置，附加文本水平对齐。
                                      // start | end | left | right | center
           textBaseline  : {string},  // 默认根据textPosition自动设置，附加文本垂直对齐。
                                      // top | bottom | middle |
                                      // alphabetic | hanging | ideographic
           textColor     : {color},   // 默认根据textPosition自动设置，默认策略如下，附加文本颜色
                                      // 'inside' ? '#fff' : color
       },

       // 样式属性，高亮样式属性，当不存在highlightStyle时使用基于默认样式扩展显示
       highlightStyle : {
           // 同style
       }

       // 交互属性，详见shape.Base

       // 事件属性，详见shape.Base
   }

 **/

define('zrender/shape/path',['require','./base','../shape'],function(require) {
    function Path() {
        this.type = 'path';
    }

    Path.prototype = {
        _parsePathData : function(data) {
            if (!data) {
                return [];
            }

            // command string
            var cs = data;

            // command chars
            var cc = [
                'm', 'M', 'l', 'L', 'v', 'V', 'h', 'H', 'z', 'Z',
                'c', 'C', 'q', 'Q', 't', 'T', 's', 'S', 'a', 'A'
            ];
            
            cs = cs.replace(/-/g, ' -');
            cs = cs.replace(/  /g, ' ');
            cs = cs.replace(/ /g, ',');
            cs = cs.replace(/,,/g, ',');
            

            var n;
            // create pipes so that we can split the data
            for (n = 0; n < cc.length; n++) {
                cs = cs.replace(new RegExp(cc[n], 'g'), '|' + cc[n]);
            }

            // create array
            var arr = cs.split('|');
            var ca = [];
            // init context point
            var cpx = 0;
            var cpy = 0;
            for (n = 1; n < arr.length; n++) {
                var str = arr[n];
                var c = str.charAt(0);
                str = str.slice(1);
                str = str.replace(new RegExp('e,-', 'g'), 'e-');

                var p = str.split(',');
                if (p.length > 0 && p[0] === '') {
                    p.shift();
                }

                for (var i = 0; i < p.length; i++) {
                    p[i] = parseFloat(p[i]);
                }
                while (p.length > 0) {
                    if (isNaN(p[0])) {
                        break;
                    }
                    var cmd = null;
                    var points = [];

                    var ctlPtx;
                    var ctlPty;
                    var prevCmd;

                    var rx;
                    var ry;
                    var psi;
                    var fa;
                    var fs;

                    var x1 = cpx;
                    var y1 = cpy;

                    // convert l, H, h, V, and v to L
                    switch (c) {
                    case 'l':
                        cpx += p.shift();
                        cpy += p.shift();
                        cmd = 'L';
                        points.push(cpx, cpy);
                        break;
                    case 'L':
                        cpx = p.shift();
                        cpy = p.shift();
                        points.push(cpx, cpy);
                        break;
                    case 'm':
                        cpx += p.shift();
                        cpy += p.shift();
                        cmd = 'M';
                        points.push(cpx, cpy);
                        c = 'l';
                        break;
                    case 'M':
                        cpx = p.shift();
                        cpy = p.shift();
                        cmd = 'M';
                        points.push(cpx, cpy);
                        c = 'L';
                        break;

                    case 'h':
                        cpx += p.shift();
                        cmd = 'L';
                        points.push(cpx, cpy);
                        break;
                    case 'H':
                        cpx = p.shift();
                        cmd = 'L';
                        points.push(cpx, cpy);
                        break;
                    case 'v':
                        cpy += p.shift();
                        cmd = 'L';
                        points.push(cpx, cpy);
                        break;
                    case 'V':
                        cpy = p.shift();
                        cmd = 'L';
                        points.push(cpx, cpy);
                        break;
                    case 'C':
                        points.push(p.shift(), p.shift(), p.shift(), p.shift());
                        cpx = p.shift();
                        cpy = p.shift();
                        points.push(cpx, cpy);
                        break;
                    case 'c':
                        points.push(
                            cpx + p.shift(), cpy + p.shift(),
                            cpx + p.shift(), cpy + p.shift()
                        );
                        cpx += p.shift();
                        cpy += p.shift();
                        cmd = 'C';
                        points.push(cpx, cpy);
                        break;
                    case 'S':
                        ctlPtx = cpx;
                        ctlPty = cpy;
                        prevCmd = ca[ca.length - 1];
                        if (prevCmd.command === 'C') {
                            ctlPtx = cpx + (cpx - prevCmd.points[2]);
                            ctlPty = cpy + (cpy - prevCmd.points[3]);
                        }
                        points.push(ctlPtx, ctlPty, p.shift(), p.shift());
                        cpx = p.shift();
                        cpy = p.shift();
                        cmd = 'C';
                        points.push(cpx, cpy);
                        break;
                    case 's':
                        ctlPtx = cpx, ctlPty = cpy;
                        prevCmd = ca[ca.length - 1];
                        if (prevCmd.command === 'C') {
                            ctlPtx = cpx + (cpx - prevCmd.points[2]);
                            ctlPty = cpy + (cpy - prevCmd.points[3]);
                        }
                        points.push(
                            ctlPtx, ctlPty,
                            cpx + p.shift(), cpy + p.shift()
                        );
                        cpx += p.shift();
                        cpy += p.shift();
                        cmd = 'C';
                        points.push(cpx, cpy);
                        break;
                    case 'Q':
                        points.push(p.shift(), p.shift());
                        cpx = p.shift();
                        cpy = p.shift();
                        points.push(cpx, cpy);
                        break;
                    case 'q':
                        points.push(cpx + p.shift(), cpy + p.shift());
                        cpx += p.shift();
                        cpy += p.shift();
                        cmd = 'Q';
                        points.push(cpx, cpy);
                        break;
                    case 'T':
                        ctlPtx = cpx, ctlPty = cpy;
                        prevCmd = ca[ca.length - 1];
                        if (prevCmd.command === 'Q') {
                            ctlPtx = cpx + (cpx - prevCmd.points[0]);
                            ctlPty = cpy + (cpy - prevCmd.points[1]);
                        }
                        cpx = p.shift();
                        cpy = p.shift();
                        cmd = 'Q';
                        points.push(ctlPtx, ctlPty, cpx, cpy);
                        break;
                    case 't':
                        ctlPtx = cpx, ctlPty = cpy;
                        prevCmd = ca[ca.length - 1];
                        if (prevCmd.command === 'Q') {
                            ctlPtx = cpx + (cpx - prevCmd.points[0]);
                            ctlPty = cpy + (cpy - prevCmd.points[1]);
                        }
                        cpx += p.shift();
                        cpy += p.shift();
                        cmd = 'Q';
                        points.push(ctlPtx, ctlPty, cpx, cpy);
                        break;
                    case 'A':
                        rx = p.shift();
                        ry = p.shift();
                        psi = p.shift();
                        fa = p.shift();
                        fs = p.shift();

                        x1 = cpx, y1 = cpy;
                        cpx = p.shift(), cpy = p.shift();
                        cmd = 'A';
                        points = this._convertPoint(
                            x1, y1, cpx, cpy, fa, fs, rx, ry, psi
                        );
                        break;
                    case 'a':
                        rx = p.shift();
                        ry = p.shift();
                        psi = p.shift();
                        fa = p.shift();
                        fs = p.shift();

                        x1 = cpx, y1 = cpy;
                        cpx += p.shift();
                        cpy += p.shift();
                        cmd = 'A';
                        points = this._convertPoint(
                            x1, y1, cpx, cpy, fa, fs, rx, ry, psi
                        );
                        break;

                    }

                    ca.push({
                        command : cmd || c,
                        points : points
                    });
                }

                if (c === 'z' || c === 'Z') {
                    ca.push({
                        command : 'z',
                        points : []
                    });
                }
            }

            return ca;

        },

        _convertPoint : function(x1, y1, x2, y2, fa, fs, rx, ry, psiDeg) {
            var psi = psiDeg * (Math.PI / 180.0);
            var xp = Math.cos(psi) * (x1 - x2) / 2.0
                     + Math.sin(psi) * (y1 - y2) / 2.0;
            var yp = -1 * Math.sin(psi) * (x1 - x2) / 2.0
                     + Math.cos(psi) * (y1 - y2) / 2.0;

            var lambda = (xp * xp) / (rx * rx) + (yp * yp) / (ry * ry);

            if (lambda > 1) {
                rx *= Math.sqrt(lambda);
                ry *= Math.sqrt(lambda);
            }

            var f = Math.sqrt((((rx * rx) * (ry * ry))
                    - ((rx * rx) * (yp * yp))
                    - ((ry * ry) * (xp * xp))) / ((rx * rx) * (yp * yp)
                    + (ry * ry) * (xp * xp))
                );

            if (fa === fs) {
                f *= -1;
            }
            if (isNaN(f)) {
                f = 0;
            }

            var cxp = f * rx * yp / ry;
            var cyp = f * -ry * xp / rx;

            var cx = (x1 + x2) / 2.0
                     + Math.cos(psi) * cxp
                     - Math.sin(psi) * cyp;
            var cy = (y1 + y2) / 2.0
                    + Math.sin(psi) * cxp
                    + Math.cos(psi) * cyp;

            var vMag = function(v) {
                return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
            };
            var vRatio = function(u, v) {
                return (u[0] * v[0] + u[1] * v[1]) / (vMag(u) * vMag(v));
            };
            var vAngle = function(u, v) {
                return (u[0] * v[1] < u[1] * v[0] ? -1 : 1)
                        * Math.acos(vRatio(u, v));
            };
            var theta = vAngle([ 1, 0 ], [ (xp - cxp) / rx, (yp - cyp) / ry ]);
            var u = [ (xp - cxp) / rx, (yp - cyp) / ry ];
            var v = [ (-1 * xp - cxp) / rx, (-1 * yp - cyp) / ry ];
            var dTheta = vAngle(u, v);

            if (vRatio(u, v) <= -1) {
                dTheta = Math.PI;
            }
            if (vRatio(u, v) >= 1) {
                dTheta = 0;
            }
            if (fs === 0 && dTheta > 0) {
                dTheta = dTheta - 2 * Math.PI;
            }
            if (fs === 1 && dTheta < 0) {
                dTheta = dTheta + 2 * Math.PI;
            }
            return [ cx, cy, rx, ry, theta, dTheta, psi, fs ];
        },

        /**
         * 创建路径
         * @param {Context2D} ctx Canvas 2D上下文
         * @param {Object} style 样式
         */
        buildPath : function(ctx, style) {
            var path = style.path;

            var pathArray = this._parsePathData(path);

            // 平移坐标
            var x = style.x || 0;
            var y = style.y || 0;

            var p;
            // 记录边界点，用于判断inside
            var pointList = style.pointList = [];
            var singlePointList = [];
            for (var i = 0, l = pathArray.length; i < l; i++) {
                if (pathArray[i].command.toUpperCase() == 'M') {
                    singlePointList.length > 0 
                    && pointList.push(singlePointList);
                    singlePointList = [];
                }
                p = pathArray[i].points;
                for (var j = 0, k = p.length; j < k; j += 2) {
                    singlePointList.push([p[j] + x, p[j+1] + y]);
                }
            }
            singlePointList.length > 0 && pointList.push(singlePointList);
            
            var c;
            for (var i = 0, l = pathArray.length; i < l; i++) {
                c = pathArray[i].command;
                p = pathArray[i].points;
                // 平移变换
                for (var j = 0, k = p.length; j < k; j++) {
                    if (j % 2 === 0) {
                        p[j] += x;
                    } else {
                        p[j] += y;
                    }
                }
                switch (c) {
                    case 'L':
                        ctx.lineTo(p[0], p[1]);
                        break;
                    case 'M':
                        ctx.moveTo(p[0], p[1]);
                        break;
                    case 'C':
                        ctx.bezierCurveTo(p[0], p[1], p[2], p[3], p[4], p[5]);
                        break;
                    case 'Q':
                        ctx.quadraticCurveTo(p[0], p[1], p[2], p[3]);
                        break;
                    case 'A':
                        var cx = p[0];
                        var cy = p[1];
                        var rx = p[2];
                        var ry = p[3];
                        var theta = p[4];
                        var dTheta = p[5];
                        var psi = p[6];
                        var fs = p[7];
                        var r = (rx > ry) ? rx : ry;
                        var scaleX = (rx > ry) ? 1 : rx / ry;
                        var scaleY = (rx > ry) ? ry / rx : 1;

                        ctx.translate(cx, cy);
                        ctx.rotate(psi);
                        ctx.scale(scaleX, scaleY);
                        ctx.arc(0, 0, r, theta, theta + dTheta, 1 - fs);
                        ctx.scale(1 / scaleX, 1 / scaleY);
                        ctx.rotate(-psi);
                        ctx.translate(-cx, -cy);
                        break;
                    case 'z':
                        ctx.closePath();
                        break;
                }
            }

            return;
        },

        /**
         * 返回矩形区域，用于局部刷新和文字定位
         * @param {Object} style 样式
         */
        getRect : function(style) {
            var lineWidth;
            if (style.brushType == 'stroke' || style.brushType == 'fill') {
                lineWidth = style.lineWidth || 1;
            }
            else {
                lineWidth = 0;
            }

            var minX = Number.MAX_VALUE;
            var maxX = Number.MIN_VALUE;

            var minY = Number.MAX_VALUE;
            var maxY = Number.MIN_VALUE;

            // 平移坐标
            var x = style.x || 0;
            var y = style.y || 0;

            var pathArray = this._parsePathData(style.path);
            for (var i = 0; i < pathArray.length; i++) {
                var p = pathArray[i].points;

                for (var j = 0; j < p.length; j++) {
                    if (j % 2 === 0) {
                        if (p[j] + x < minX) {
                            minX = p[j] + x;
                        }
                        if (p[j] + x > maxX) {
                            maxX = p[j] + x;
                        }
                    } else {
                        if (p[j] + y < minY) {
                            minY = p[j] + y;
                        }
                        if (p[j] + y > maxY) {
                            maxY = p[j] + y;
                        }
                    }
                }
            }

            var rect;
            if (minX === Number.MAX_VALUE
                || maxX === Number.MIN_VALUE
                || minY === Number.MAX_VALUE
                || maxY === Number.MIN_VALUE
            ) {
                rect = {
                    x : 0,
                    y : 0,
                    width : 0,
                    height : 0
                };
            }
            else {
                rect = {
                    x : Math.round(minX - lineWidth / 2),
                    y : Math.round(minY - lineWidth / 2),
                    width : maxX - minX + lineWidth,
                    height : maxY - minY + lineWidth
                };
            }
            return rect;
        }
    };

    var base = require('./base');
    base.derive(Path);
    
    var shape = require('../shape');
    shape.define('path', new Path());

    return Path;
});
/**
 * zrender
 *
 * @author lang( shenyi01@baidu.com )
 *
 * shape类：图片
 * 可配图形属性：
   {
       // 基础属性
       shape  : 'image',       // 必须，shape类标识，需要显式指定
       id     : {string},       // 必须，图形唯一标识，可通过zrender实例方法newShapeId生成
       zlevel : {number},       // 默认为0，z层level，决定绘画在哪层canvas中
       invisible : {boolean},   // 默认为false，是否可见

       // 样式属性，默认状态样式样式属性
       style  : {
           x             : {number},  // 必须，左上角横坐标
           y             : {number},  // 必须，左上角纵坐标
           width         : {number},  // 可选，宽度
           height        : {number},  // 可选，高度
           sx            : {number},  // 可选, 从图片中裁剪的x
           sy            : {number},  // 可选, 从图片中裁剪的y
           sWidth        : {number},  // 可选, 从图片中裁剪的宽度
           sHeight       : {number},  // 可选, 从图片中裁剪的高度
           image         : {string|Image} // 必须，图片url或者图片对象
           lineWidth     : {number},  // 默认为1，线条宽度，描边下有效

           opacity       : {number},  // 默认为1，透明度设置，如果color为rgba，则最终透明度效果叠加
           shadowBlur    : {number},  // 默认为0，阴影模糊度，大于0有效
           shadowColor   : {color},   // 默认为'#000'，阴影色彩，支持rgba
           shadowOffsetX : {number},  // 默认为0，阴影横向偏移，正值往右，负值往左
           shadowOffsetY : {number},  // 默认为0，阴影纵向偏移，正值往下，负值往上

           text          : {string},  // 默认为null，附加文本
           textFont      : {string},  // 默认为null，附加文本样式，eg:'bold 18px verdana'
           textPosition  : {string},  // 默认为top，附加文本位置。
                                      // inside | left | right | top | bottom
           textAlign     : {string},  // 默认根据textPosition自动设置，附加文本水平对齐。
                                      // start | end | left | right | center
           textBaseline  : {string},  // 默认根据textPosition自动设置，附加文本垂直对齐。
                                      // top | bottom | middle |
                                      // alphabetic | hanging | ideographic
           textColor     : {color},   // 默认根据textPosition自动设置，默认策略如下，附加文本颜色
                                      // 'inside' ? '#fff' : color
       },

       // 样式属性，高亮样式属性，当不存在highlightStyle时使用基于默认样式扩展显示
       highlightStyle : {
           // 同style
       }

       // 交互属性，详见shape.Base

       // 事件属性，详见shape.Base
   }
         例子：
   {
       shape  : 'image',
       id     : '123456',
       zlevel : 1,
       style  : {
           x : 200,
           y : 100,
           width : 150,
           height : 50,
           image : 'tests.jpg',
           text : 'Baidu'
       },
       myName : 'kener',  // 可自带任何有效自定义属性

       clickable : true,
       onClick : function(eventPacket) {
           alert(eventPacket.target.myName);
       }
   }
 */
define(
    'zrender/shape/image',['require','./base','../shape'],function(require) {

        var _cache = {};
        var _needsRefresh = [];
        var _refreshTimeout;

        function ZImage() {
            this.type = 'image';
        }

        ZImage.prototype = {
            brush : function(ctx, e, isHighlight, refresh) {
                var style = e.style || {};

                if (isHighlight) {
                    // 根据style扩展默认高亮样式
                    style = this.getHighlightStyle(
                        style, e.highlightStyle || {}
                    );
                }

                var image = style.image;

                if (typeof(image) === 'string') {
                    var src = image;
                    if (_cache[src]) {
                        image = _cache[src];
                    }
                    else {
                        image = new Image();//document.createElement('image');
                        image.onload = function(){
                            image.onload = null;
                            clearTimeout( _refreshTimeout );
                            _needsRefresh.push( e );
                            // 防止因为缓存短时间内触发多次onload事件
                            _refreshTimeout = setTimeout(function(){
                                refresh( _needsRefresh );
                                // 清空needsRefresh
                                _needsRefresh = [];
                            }, 10);
                        };
                        _cache[ src ] = image;

                        image.src = src;
                    }
                }
                if (image) {
                    //图片已经加载完成
                    if (window.ActiveXObject) {
                        if (image.readyState != 'complete') {
                            return;
                        }
                    }
                    else {
                        if (!image.complete) {
                            return;
                        }
                    }

                    ctx.save();
                    this.setContext(ctx, style);

                    // 设置transform
                    if (e.__needTransform) {
                        ctx.transform.apply(ctx,this.updateTransform(e));
                    }

                    var width = style.width || image.width;
                    var height = style.height || image.height;
                    var x = style.x;
                    var y = style.y;
                    if (style.sWidth && style.sHeight) {
                        var sx = style.sx || 0;
                        var sy = style.sy || 0;
                        ctx.drawImage(
                            image,
                            sx, sy, style.sWidth, style.sHeight,
                            x, y, width, height
                        );
                    }
                    else if (style.sx && style.sy) {
                        var sx = style.sx;
                        var sy = style.sy;
                        var sWidth = width - sx;
                        var sHeight = height - sy;
                        ctx.drawImage(
                            image,
                            sx, sy, sWidth, sHeight,
                            x, y, width, height
                        );
                    }
                    else {
                        ctx.drawImage(image, x, y, width, height);
                    }
                    // 如果没设置宽和高的话自动根据图片宽高设置
                    style.width = width;
                    style.height = height;
                    e.style.width = width;
                    e.style.height = height;


                    if (style.text) {
                        this.drawText(ctx, style, e.style);
                    }

                    ctx.restore();
                }

                return;
            },

            /**
             * 创建路径，用于判断hover时调用isPointInPath~
             * @param {Context2D} ctx Canvas 2D上下文
             * @param {Object} style 样式
             */
            buildPath : function(ctx, style) {
                ctx.rect(style.x, style.y, style.width, style.height);
                return;
            },

            /**
             * 返回矩形区域，用于局部刷新和文字定位
             * @param {Object} style
             */
            getRect : function(style) {
                return {
                    x : style.x,
                    y : style.y,
                    width : style.width,
                    height : style.height
                };
            }
        };

        var base = require('./base');
        base.derive(ZImage);
        
        var shape = require('../shape');
        shape.define('image', new ZImage());

        return ZImage;
    }
);
/**
 * zrender
 *
 * @author Neil (杨骥, yangji01@baidu.com)
 *
 * shape类：贝塞尔曲线
 * 可配图形属性：
   {
       // 基础属性
       shape  : 'beziercurve',         // 必须，shape类标识，需要显式指定
       id     : {string},       // 必须，图形唯一标识，可通过zrender实例方法newShapeId生成
       zlevel : {number},       // 默认为0，z层level，决定绘画在哪层canvas中
       invisible : {boolean},   // 默认为false，是否可见

       // 样式属性，默认状态样式样式属性
       style  : {
           xStart        : {number},  // 必须，起点横坐标
           yStart        : {number},  // 必须，起点纵坐标
           cpX1          : {number},  // 必须，第一个关联点横坐标
           cpY1          : {number},  // 必须，第一个关联点纵坐标
           cpX2          : {number},  // 可选，第二个关联点横坐标  缺省即为二次贝塞尔曲线
           cpY2          : {number},  // 可选，第二个关联点纵坐标
           xEnd          : {number},  // 必须，终点横坐标
           yEnd          : {number},  // 必须，终点纵坐标
           strokeColor   : {color},   // 默认为'#000'，线条颜色（轮廓），支持rgba

           lineWidth     : {number},  // 默认为1，线条宽度
           lineCap       : {string},  // 默认为butt，线帽样式。butt | round | square

           opacity       : {number},  // 默认为1，透明度设置，如果color为rgba，则最终透明度效果叠加
           shadowBlur    : {number},  // 默认为0，阴影模糊度，大于0有效
           shadowColor   : {color},   // 默认为'#000'，阴影色彩，支持rgba
           shadowOffsetX : {number},  // 默认为0，阴影横向偏移，正值往右，负值往左
           shadowOffsetY : {number},  // 默认为0，阴影纵向偏移，正值往下，负值往上

           text          : {string},  // 默认为null，附加文本
           textFont      : {string},  // 默认为null，附加文本样式，eg:'bold 18px verdana'
           textPosition  : {string},  // 默认为end，附加文本位置。
                                      // inside | start | end
           textAlign     : {string},  // 默认根据textPosition自动设置，附加文本水平对齐。
                                      // start | end | left | right | center
           textBaseline  : {string},  // 默认根据textPosition自动设置，附加文本垂直对齐。
                                      // top | bottom | middle |
                                      // alphabetic | hanging | ideographic
           textColor     : {color},   // 默认根据textPosition自动设置，默认策略如下，附加文本颜色
                                      // 'inside' ? '#000' : color
       },

       // 样式属性，高亮样式属性，当不存在highlightStyle时使用基于默认样式扩展显示
       highlightStyle : {
           // 同style
       }

       // 交互属性，详见shape.Base

       // 事件属性，详见shape.Base
   }
         例子：
   {
       shape  : 'beziercurve',
       id     : '123456',
       zlevel : 1,
       style  : {
           xStart : 100,
           yStart : 100,
           xEnd : 200,
           yEnd : 200,
           strokeColor : '#eee',
           lineWidth : 20,
           text : 'Baidu'
       },
       myName : 'kener',  //可自带任何有效自定义属性

       clickable : true,
       onClick : function(eventPacket) {
           alert(eventPacket.target.myName);
       }
   }
 */
define(
    'zrender/shape/beziercurve',['require','./base','../shape'],function(require) {
        function Beziercurve() {
            this.type = 'beziercurve';
            this.brushTypeOnly = 'stroke';  //线条只能描边，填充后果自负
            this.textPosition = 'end';
        }

        Beziercurve.prototype =  {
            /**
             * 创建线条路径
             * @param {Context2D} ctx Canvas 2D上下文
             * @param {Object} style 样式
             */
            buildPath : function(ctx, style) {
                ctx.moveTo(style.xStart, style.yStart);
                if (typeof style.cpX2 != 'undefined'
                    && typeof style.cpY2 != 'undefined'
                ) {
                    ctx.bezierCurveTo(
                        style.cpX1, style.cpY1,
                        style.cpX2, style.cpY2,
                        style.xEnd, style.yEnd
                    );
                }
                else {
                    ctx.quadraticCurveTo(
                        style.cpX1, style.cpY1,
                        style.xEnd, style.yEnd
                    );
                }

            },

            /**
             * 返回矩形区域，用于局部刷新和文字定位
             * @param {Object} style
             */
            getRect : function(style) {
                var _minX = Math.min(style.xStart, style.xEnd, style.cpX1);
                var _minY = Math.min(style.yStart, style.yEnd, style.cpY1);
                var _maxX = Math.max(style.xStart, style.xEnd, style.cpX1);
                var _maxY = Math.max(style.yStart, style.yEnd, style.cpY1);
                var _x2 = style.cpX2;
                var _y2 = style.cpY2;

                if (typeof _x2 != 'undefined'
                    && typeof _y2 != 'undefined'
                ) {
                    _minX = Math.min(_minX, _x2);
                    _minY = Math.min(_minY, _y2);
                    _maxX = Math.max(_maxX, _x2);
                    _maxY = Math.max(_maxY, _y2);
                }

                var lineWidth = style.lineWidth || 1;
                return {
                    x : _minX - lineWidth,
                    y : _minY - lineWidth,
                    width : _maxX - _minX + lineWidth,
                    height : _maxY - _minY + lineWidth
                };
            }
        };

        var base = require('./base');
        base.derive(Beziercurve);
        
        var shape = require('../shape');
        shape.define('beziercurve', new Beziercurve());

        return Beziercurve;
    }
);
/**
 * zrender
 *
 * @author sushuang (宿爽, sushuang@baidu.com)
 *
 * shape类：n角星（n>3）
 * 可配图形属性：
   {
       // 基础属性
       shape  : 'star',       // 必须，shape类标识，需要显式指定
       id     : {string},       // 必须，图形唯一标识，可通过zrender实例方法newShapeId生成
       zlevel : {number},       // 默认为0，z层level，决定绘画在哪层canvas中
       invisible : {boolean},   // 默认为false，是否可见

       // 样式属性，默认状态样式样式属性
       style  : {
           x             : {number},  // 必须，n角星外接圆心横坐标
           y             : {number},  // 必须，n角星外接圆心纵坐标
           r             : {number},  // 必须，n角星外接圆半径
           r0            : {number},  // n角星内部顶点（凹点）的外接圆半径，
                                      // 如果不指定此参数，则自动计算：取相隔外部顶点连线的交点作内部顶点
           n             : {number},  // 必须，指明几角星
           brushType     : {string},  // 默认为fill，绘画方式
                                      // fill(填充) | stroke(描边) | both(填充+描边)
           color         : {color},   // 默认为'#000'，填充颜色，支持rgba
           strokeColor   : {color},   // 默认为'#000'，描边颜色（轮廓），支持rgba
           lineWidth     : {number},  // 默认为1，线条宽度，描边下有效
           lineJoin      : {string},  // 默认为miter，线段连接样式。miter | round | bevel

           shadowBlur    : {number},  // 默认为0，阴影模糊度，大于0有效
           shadowColor   : {color},   // 默认为'#000'，阴影色彩，支持rgba
           shadowOffsetX : {number},  // 默认为0，阴影横向偏移，正值往右，负值往左
           shadowOffsetY : {number},  // 默认为0，阴影横向偏移，正值往右，负值往左

           text          : {string},  // 默认为null，附加文本
           textFont      : {string},  // 默认为null，附加文本样式，eg:'bold 18px verdana'
           textPosition  : {string},  // 默认为outside，附加文本位置。
                                      // outside | inside
           textAlign     : {string},  // 默认根据textPosition自动设置，附加文本水平对齐。
                                      // start | end | left | right | center
           textBaseline  : {string},  // 默认根据textPosition自动设置，附加文本垂直对齐。
                                      // top | bottom | middle |
                                      // alphabetic | hanging | ideographic
           textColor     : {color},   // 默认根据textPosition自动设置，默认策略如下，附加文本颜色
                                      // 'inside' ? '#fff' : color
       },

       // 样式属性，高亮样式属性，当不存在highlightStyle时使用基于默认样式扩展显示
       highlightStyle : {
           // 同style
       }

       // 交互属性，详见shape.Base

       // 事件属性，详见shape.Base
   }
         例子：
   {
       shape  : 'star',
       id     : '123456',
       zlevel : 1,
       style  : {
           x : 200,
           y : 100,
           r : 150,
           n : 5,
           color : '#eee'
       },
       myName : 'kener',   // 可自带任何有效自定义属性

       clickable : true,
       onClick : function(eventPacket) {
           alert(eventPacket.target.myName);
       }
   }
 */
define(
    'zrender/shape/star',['require','../tool/math','./base','../shape'],function(require) {

        var math = require('../tool/math');
        var sin = math.sin;
        var cos = math.cos;
        var PI = Math.PI;

        function Star() {
            this.type = 'heart';
        }

        Star.prototype = {
            /**
             * 创建n角星（n>3）路径
             * @param {Context2D} ctx Canvas 2D上下文
             * @param {Object} style 样式
             */
            buildPath : function(ctx, style) {
                var n = style.n;
                if (!n || n < 2) { return; }

                var x = style.x;
                var y = style.y;
                var r = style.r;
                var r0 = style.r0;

                // 如果未指定内部顶点外接圆半径，则自动计算
                if (r0 == null) {
                    r0 = n > 4
                        // 相隔的外部顶点的连线的交点，
                        // 被取为内部交点，以此计算r0
                        ? r * cos(2 * PI / n) / cos(PI / n)
                        // 二三四角星的特殊处理
                        : r / 3;
                }

                var dStep = PI / n;
                var deg = -PI / 2;
                var xStart = x + r * cos(deg);
                var yStart = y + r * sin(deg);
                deg += dStep;

                // 记录边界点，用于判断inside
                var pointList = style.pointList = [];
                pointList.push([xStart, yStart]);
                for (var i = 0, end = n * 2 - 1, ri; i < end; i ++) {
                    ri = i % 2 === 0 ? r0 : r;
                    pointList.push([x + ri * cos(deg), y + ri * sin(deg)]);
                    deg += dStep;
                }
                pointList.push([xStart, yStart]);

                // 绘制
                ctx.moveTo(pointList[0][0], pointList[0][1]);
                for (var i = 0; i < pointList.length; i ++) {
                    ctx.lineTo(pointList[i][0], pointList[i][1]);
                }

                return;
            },

            /**
             * 返回矩形区域，用于局部刷新和文字定位
             * @param {Object} style
             */
            getRect : function(style) {
                var lineWidth;
                if (style.brushType == 'stroke' || style.brushType == 'fill') {
                    lineWidth = style.lineWidth || 1;
                }
                else {
                    lineWidth = 0;
                }
                return {
                    x : Math.round(style.x - style.r - lineWidth / 2),
                    y : Math.round(style.y - style.r - lineWidth / 2),
                    width : style.r * 2 + lineWidth,
                    height : style.r * 2 + lineWidth
                };
            }
        };

        var base = require('./base');
        base.derive(Star);
        
        var shape = require('../shape');
        shape.define('star', new Star());

        return Star;
    }
);
/**
 * zrender
 *
 * @author sushuang (宿爽, sushuang@baidu.com)
 *
 * shape类：正n边形（n>=3）
 * 可配图形属性：
   {
       // 基础属性
       shape  : 'isogon',       // 必须，shape类标识，需要显式指定
       id     : {string},       // 必须，图形唯一标识，可通过zrender实例方法newShapeId生成
       zlevel : {number},       // 默认为0，z层level，决定绘画在哪层canvas中
       invisible : {boolean},   // 默认为false，是否可见

       // 样式属性，默认状态样式样式属性
       style  : {
           x             : {number},  // 必须，正n边形外接圆心横坐标
           y             : {number},  // 必须，正n边形外接圆心纵坐标
           r             : {number},  // 必须，正n边形外接圆半径
           n             : {number},  // 必须，指明正几边形
           brushType     : {string},  // 默认为fill，绘画方式
                                      // fill(填充) | stroke(描边) | both(填充+描边)
           color         : {color},   // 默认为'#000'，填充颜色，支持rgba
           strokeColor   : {color},   // 默认为'#000'，描边颜色（轮廓），支持rgba
           lineWidth     : {number},  // 默认为1，线条宽度，描边下有效
           lineJoin      : {string},  // 默认为miter，线段连接样式。miter | round | bevel

           shadowBlur    : {number},  // 默认为0，阴影模糊度，大于0有效
           shadowColor   : {color},   // 默认为'#000'，阴影色彩，支持rgba
           shadowOffsetX : {number},  // 默认为0，阴影横向偏移，正值往右，负值往左
           shadowOffsetY : {number},  // 默认为0，阴影横向偏移，正值往右，负值往左

           text          : {string},  // 默认为null，附加文本
           textFont      : {string},  // 默认为null，附加文本样式，eg:'bold 18px verdana'
           textPosition  : {string},  // 默认为outside，附加文本位置。
                                      // outside | inside
           textAlign     : {string},  // 默认根据textPosition自动设置，附加文本水平对齐。
                                      // start | end | left | right | center
           textBaseline  : {string},  // 默认根据textPosition自动设置，附加文本垂直对齐。
                                      // top | bottom | middle |
                                      // alphabetic | hanging | ideographic
           textColor     : {color},   // 默认根据textPosition自动设置，默认策略如下，附加文本颜色
                                      // 'inside' ? '#fff' : color
       },

       // 样式属性，高亮样式属性，当不存在highlightStyle时使用基于默认样式扩展显示
       highlightStyle : {
           // 同style
       }

       // 交互属性，详见shape.Base

       // 事件属性，详见shape.Base
   }
         例子：
   {
       shape  : 'isogon',
       id     : '123456',
       zlevel : 1,
       style  : {
           x : 400,
           y : 100,
           r : 150,
           n : 7,
           color : '#eee'
       },
       myName : 'kener',   // 可自带任何有效自定义属性

       clickable : true,
       onClick : function(eventPacket) {
           alert(eventPacket.target.myName);
       }
   }
 */
define(
    'zrender/shape/isogon',['require','../tool/math','./base','../shape'],function(require) {

        var math = require('../tool/math');
        var sin = math.sin;
        var cos = math.cos;
        var PI = Math.PI;

        function Isogon() {
            this.type = 'isogon';
        }

        Isogon.prototype = {
            /**
             * 创建n角星（n>=3）路径
             * @param {Context2D} ctx Canvas 2D上下文
             * @param {Object} style 样式
             */
            buildPath : function(ctx, style) {
                var n = style.n;
                if (!n || n < 2) { return; }

                var x = style.x;
                var y = style.y;
                var r = style.r;

                var dStep = 2 * PI / n;
                var deg = -PI / 2;
                var xStart = x + r * cos(deg);
                var yStart = y + r * sin(deg);
                deg += dStep;

                // 记录边界点，用于判断insight
                var pointList = style.pointList = [];
                pointList.push([xStart, yStart]);
                for (var i = 0, end = n - 1; i < end; i ++) {
                    pointList.push([x + r * cos(deg), y + r * sin(deg)]);
                    deg += dStep;
                }
                pointList.push([xStart, yStart]);

                // 绘制
                ctx.moveTo(pointList[0][0], pointList[0][1]);
                for (var i = 0; i < pointList.length; i ++) {
                    ctx.lineTo(pointList[i][0], pointList[i][1]);
                }

                return;
            },

            /**
             * 返回矩形区域，用于局部刷新和文字定位
             * @param {Object} style
             */
            getRect : function(style) {
                var lineWidth;
                if (style.brushType == 'stroke' || style.brushType == 'fill') {
                    lineWidth = style.lineWidth || 1;
                }
                else {
                    lineWidth = 0;
                }
                return {
                    x : Math.round(style.x - style.r - lineWidth / 2),
                    y : Math.round(style.y - style.r - lineWidth / 2),
                    width : style.r * 2 + lineWidth,
                    height : style.r * 2 + lineWidth
                };
            }
        };

        var base = require('./base');
        base.derive(Isogon);
        
        var shape = require('../shape');
        shape.define('isogon', new Isogon());

        return Isogon;
    }
);
/**
 * 缓动代码来自 https://github.com/sole/tween.js/blob/master/src/Tween.js
 * author: lang(shenyi01@baidu.com)
 */
define(
    'zrender/animation/easing',[],function() {
        var Easing = {
            // 线性
            Linear: function(k) {
                return k;
            },

            // 二次方的缓动（t^2）
            QuadraticIn: function(k) {
                return k * k;
            },
            QuadraticOut: function(k) {
                return k * (2 - k);
            },
            QuadraticInOut: function(k) {
                if ((k *= 2) < 1) {
                    return 0.5 * k * k;
                }
                return - 0.5 * (--k * (k - 2) - 1);
            },

            // 三次方的缓动（t^3）
            CubicIn: function(k) {
                return k * k * k;
            },
            CubicOut: function(k) {
                return --k * k * k + 1;
            },
            CubicInOut: function(k) {
                if ((k *= 2) < 1) {
                    return 0.5 * k * k * k;
                }
                return 0.5 * ((k -= 2) * k * k + 2);
            },

            // 四次方的缓动（t^4）
            QuarticIn: function(k) {
                return k * k * k * k;
            },
            QuarticOut: function(k) {
                return 1 - (--k * k * k * k);
            },
            QuarticInOut: function(k) {
                if ((k *= 2) < 1) {
                    return 0.5 * k * k * k * k;
                }
                return - 0.5 * ((k -= 2) * k * k * k - 2);
            },

            // 五次方的缓动（t^5）
            QuinticIn: function(k) {
                return k * k * k * k * k;
            },

            QuinticOut: function(k) {
                return --k * k * k * k * k + 1;
            },
            QuinticInOut: function(k) {
                if ((k *= 2) < 1) {
                    return 0.5 * k * k * k * k * k;
                }
                return 0.5 * ((k -= 2) * k * k * k * k + 2);
            },

            // 正弦曲线的缓动（sin(t)）
            SinusoidalIn: function(k) {
                return 1 - Math.cos(k * Math.PI / 2);
            },
            SinusoidalOut: function(k) {
                return Math.sin(k * Math.PI / 2);
            },
            SinusoidalInOut: function(k) {
                return 0.5 * (1 - Math.cos(Math.PI * k));
            },

            // 指数曲线的缓动（2^t）
            ExponentialIn: function(k) {
                return k === 0 ? 0 : Math.pow(1024, k - 1);
            },
            ExponentialOut: function(k) {
                return k === 1 ? 1 : 1 - Math.pow(2, - 10 * k);
            },
            ExponentialInOut: function(k) {
                if (k === 0) {
                    return 0;
                }
                if (k === 1) {
                    return 1;
                }
                if ((k *= 2) < 1) {
                    return 0.5 * Math.pow(1024, k - 1);
                }
                return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);
            },

            // 圆形曲线的缓动（sqrt(1-t^2)）
            CircularIn: function(k) {
                return 1 - Math.sqrt(1 - k * k);
            },
            CircularOut: function(k) {
                return Math.sqrt(1 - (--k * k));
            },
            CircularInOut: function(k) {
                if ((k *= 2) < 1) {
                    return - 0.5 * (Math.sqrt(1 - k * k) - 1);
                }
                return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
            },

            // 创建类似于弹簧在停止前来回振荡的动画
            ElasticIn: function(k) {
                var s, a = 0.1, p = 0.4;
                if (k === 0) {
                    return 0;
                }
                if (k === 1) {
                    return 1;
                }
                if (!a || a < 1) {
                    a = 1; s = p / 4;
                }else{
                    s = p * Math.asin(1 / a) / (2 * Math.PI);
                }
                return - (a * Math.pow(2, 10 * (k -= 1)) *
                            Math.sin((k - s) * (2 * Math.PI) / p));
            },
            ElasticOut: function(k) {
                var s, a = 0.1, p = 0.4;
                if (k === 0) {
                    return 0;
                }
                if (k === 1) {
                    return 1;
                }
                if (!a || a < 1) {
                    a = 1; s = p / 4;
                }
                else{
                    s = p * Math.asin(1 / a) / (2 * Math.PI);
                }
                return (a * Math.pow(2, - 10 * k) *
                        Math.sin((k - s) * (2 * Math.PI) / p) + 1);
            },
            ElasticInOut: function(k) {
                var s, a = 0.1, p = 0.4;
                if (k === 0) {
                    return 0;
                }
                if (k === 1) {
                    return 1;
                }
                if (!a || a < 1) {
                    a = 1; s = p / 4;
                }
                else{
                    s = p * Math.asin(1 / a) / (2 * Math.PI);
                }
                if ((k *= 2) < 1) {
                    return - 0.5 * (a * Math.pow(2, 10 * (k -= 1))
                        * Math.sin((k - s) * (2 * Math.PI) / p));
                }
                return a * Math.pow(2, -10 * (k -= 1))
                        * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;

            },

            // 在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动
            BackIn: function(k) {
                var s = 1.70158;
                return k * k * ((s + 1) * k - s);
            },
            BackOut: function(k) {
                var s = 1.70158;
                return --k * k * ((s + 1) * k + s) + 1;
            },
            BackInOut: function(k) {
                var s = 1.70158 * 1.525;
                if ((k *= 2) < 1) {
                    return 0.5 * (k * k * ((s + 1) * k - s));
                }
                return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
            },

            // 创建弹跳效果
            BounceIn: function(k) {
                return 1 - Easing.BounceOut(1 - k);
            },
            BounceOut: function(k) {
                if (k < (1 / 2.75)) {
                    return 7.5625 * k * k;
                }
                else if (k < (2 / 2.75)) {
                    return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
                } else if (k < (2.5 / 2.75)) {
                    return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
                } else {
                    return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
                }
            },
            BounceInOut: function(k) {
                if (k < 0.5) {
                    return Easing.BounceIn(k * 2) * 0.5;
                }
                return Easing.BounceOut(k * 2 - 1) * 0.5 + 0.5;
            }
        };

        return Easing;
    }
);


/**
 * 动画主控制器
 * @config target 动画对象，可以是数组，如果是数组的话会批量分发onframe等事件
 * @config life(1000) 动画时长
 * @config delay(0) 动画延迟时间
 * @config loop(true)
 * @config gap(0) 循环的间隔时间
 * @config onframe
 * @config easing(optional)
 * @config ondestroy(optional)
 * @config onrestart(optional)
 */
define(
    'zrender/animation/clip',['require','./easing'],function(require) {

        var Easing = require('./easing');

        var Clip = function(options) {

            this._targetPool = options.target || {};
            if (this._targetPool.constructor != Array) {
                this._targetPool = [this._targetPool];
            }

            //生命周期
            this._life = options.life || 1000;
            //延时
            this._delay = options.delay || 0;
            //开始时间
            this._startTime = new Date().getTime() + this._delay;//单位毫秒

            //结束时间
            this._endTime = this._startTime + this._life*1000;

            //是否循环
            this.loop = typeof(options.loop) == 'undefined'
                        ? false : options.loop;

            this.gap = options.gap || 0;

            this.easing = options.easing || 'Linear';

            this.onframe = options.onframe || null;

            this.ondestroy = options.ondestroy || null;

            this.onrestart = options.onrestart || null;
        };

        Clip.prototype = {
            step : function(time) {
                var percent = (time - this._startTime) / this._life;

                //还没开始
                if (percent < 0) {
                    return;
                }

                percent = Math.min(percent, 1);

                var easingFunc = typeof(this.easing) == 'string'
                                 ? Easing[this.easing]
                                 : this.easing;
                var schedule;
                if (typeof easingFunc === 'function') {
                    schedule = easingFunc(percent);
                }else{
                    schedule = percent;
                }
                this.fire('frame', schedule);

                //结束
                if (percent == 1) {
                    if (this.loop) {
                        this.restart();
                        // 重新开始周期
                        // 抛出而不是直接调用事件直到 stage.update 后再统一调用这些事件
                        return 'restart';

                    }else{
                        // 动画完成将这个控制器标识为待删除
                        // 在Animation.update中进行批量删除
                        this._needsRemove = true;

                        return 'destroy';
                    }
                }else{
                    return null;
                }
            },
            restart : function() {
                this._startTime = new Date().getTime() + this.gap;
            },
            fire : function(eventType, arg) {
                for(var i = 0, len = this._targetPool.length; i < len; i++) {
                    if (this['on' + eventType]) {
                        this['on' + eventType](this._targetPool[i], arg);
                    }
                }
            }
        };
        Clip.prototype.constructor = Clip;

        return Clip;
    }
);
/**
 * 动画主类, 调度和管理所有动画控制器
 *
 * @author pissang(https://github.com/pissang)
 *
 * @class : Animation
 * @config : stage(optional) 绘制类, 需要提供update接口
 * @config : onframe(optional)
 * @method : add
 * @method : remove
 * @method : update
 * @method : start
 * @method : stop
 */
define(
'zrender/animation/animation',['require','./clip'],function(require) {
    


var Clip = require('./clip');

var requestAnimationFrame = window.requestAnimationFrame
                            || window.msRequestAnimationFrame
                            || window.mozRequestAnimationFrame
                            || window.webkitRequestAnimationFrame
                            || function(func){setTimeout(func, 16);};

var arraySlice = Array.prototype.slice;

var Animation = function(options) {

    options = options || {};

    this.stage = options.stage || {};

    this.onframe = options.onframe || function() {};

    // private properties
    this._clips = [];

    this._running = false;

    this._time = 0;
};

Animation.prototype = {
    add : function(clip) {
        this._clips.push(clip);
    },
    remove : function(clip) {
        var idx = this._clips.indexOf(clip);
        if (idx >= 0) {
            this._clips.splice(idx, 1);
        }
    },
    update : function() {

        var time = new Date().getTime();
        //var delta = time - this._time;
        var clips = this._clips;
        var len = clips.length;

        var deferredEvents = [];
        var deferredClips = [];
        for (var i = 0; i < len; i++) {
            var clip = clips[i];
            var e = clip.step(time);
            // Throw out the events need to be called after
            // stage.update, like destroy
            if (e) {
                deferredEvents.push(e);
                deferredClips.push(clip);
            }
        }
        if (this.stage
            && this.stage.update
            && this._clips.length
        ) {
            this.stage.update();
        }

        // Remove the finished clip
        for (var i = 0; i < len;) {
            if (clips[i]._needsRemove) {
                clips[i] = clips[len-1];
                clips.pop();
                len--;
            } else {
                i++;
            }
        }

        len = deferredEvents.length;
        for (var i = 0; i < len; i++) {
            deferredClips[i].fire(deferredEvents[i]);
        }

        this._time = time;

        this.onframe();

    },
    start : function() {
        var self = this;

        this._running = true;

        function step() {
            if (self._running) {
                self.update();
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    },
    stop : function() {
        this._running = false;
    },
    clear : function() {
        this._clips = [];
    },
    animate : function(target, options) {
        options = options || {};
        var deferred = new Deferred(
            target,
            options.loop,
            options.getter, 
            options.setter
        );
        deferred.animation = this;
        return deferred;
    }
};
Animation.prototype.constructor = Animation;

function _defaultGetter(target, key) {
    return target[key];
}
function _defaultSetter(target, key, value) {
    target[key] = value;
}

function _interpolateNumber(p0, p1, percent) {
    return (p1 - p0) * percent + p0;
}

function _interpolateArray(p0, p1, percent, out, arrDim) {
    var len = p0.length;
    if (arrDim == 1) {
        for (var i = 0; i < len; i++) {
            out[i] = _interpolateNumber(p0[i], p1[i], percent); 
        }
    } else {
        var len2 = p0[0].length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len2; j++) {
                out[i][j] = _interpolateNumber(
                    p0[i][j], p1[i][j], percent
                );
            }
        }
    }
}

function _isArrayLike(data) {
    if (typeof(data) === 'undefined') {
        return false;
    } else if (typeof(data) == 'string') {
        return false;
    } else {
        return typeof(data.length) !== 'undefined';
    }
}

function _catmullRomInterpolateArray(
    p0, p1, p2, p3, t, t2, t3, out, arrDim
) {
    var len = p0.length;
    if (arrDim == 1) {
        for (var i = 0; i < len; i++) {
            out[i] = _catmullRomInterpolate(
                p0[i], p1[i], p2[i], p3[i], t, t2, t3
            );
        }
    } else {
        var len2 = p0[0].length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len2; j++) {
                out[i][j] = _catmullRomInterpolate(
                    p0[i][j], p1[i][j], p2[i][j], p3[i][j],
                    t, t2, t3
                );
            }
        }
    }
}

function _catmullRomInterpolate(p0, p1, p2, p3, t, t2, t3) {
    var v0 = (p2 - p0) * 0.5;
    var v1 = (p3 - p1) * 0.5;
    return (2 * (p1 - p2) + v0 + v1) * t3 
            + (- 3 * (p1 - p2) - 2 * v0 - v1) * t2
            + v0 * t + p1;
}

function Deferred(target, loop, getter, setter) {
    this._tracks = {};
    this._target = target;

    this._loop = loop || false;

    this._getter = getter || _defaultGetter;
    this._setter = setter || _defaultSetter;

    this._clipCount = 0;

    this._delay = 0;

    this._doneList = [];

    this._onframeList = [];

    this._clipList = [];
}

Deferred.prototype = {
    when : function(time /* ms */, props) {
        for (var propName in props) {
            if (! this._tracks[propName]) {
                this._tracks[propName] = [];
                // Initialize value
                this._tracks[propName].push({
                    time : 0,
                    value : this._getter(this._target, propName)
                });
            }
            this._tracks[propName].push({
                time : parseInt(time, 10),
                value : props[propName]
            });
        }
        return this;
    },
    during : function(callback) {
        this._onframeList.push(callback);
        return this;
    },
    start : function(easing) {

        var self = this;
        var setter = this._setter;
        var getter = this._getter;
        var onFrameListLen = self._onframeList.length;
        var useSpline = easing === 'spline';

        var ondestroy = function() {
            self._clipCount--;
            if (self._clipCount === 0) {
                // Clear all tracks
                self._tracks = {};

                var len = self._doneList.length;
                for (var i = 0; i < len; i++) {
                    self._doneList[i].call(self);
                }
            }
        };

        var createTrackClip = function(keyframes, propName) {
            var trackLen = keyframes.length;
            if (!trackLen) {
                return;
            }
            // Guess data type
            var firstVal = keyframes[0].value;
            var isValueArray = _isArrayLike(firstVal);

            // For vertices morphing
            var arrDim = (
                    isValueArray 
                    && _isArrayLike(firstVal[0])
                )
                ? 2 : 1;
            // Sort keyframe as ascending
            keyframes.sort(function(a, b) {
                return a.time - b.time;
            });
            var trackMaxTime;
            if (trackLen) {
                trackMaxTime = keyframes[trackLen-1].time;
            }else{
                return;
            }
            // Percents of each keyframe
            var kfPercents = [];
            // Value of each keyframe
            var kfValues = [];
            for (var i = 0; i < trackLen; i++) {
                kfPercents.push(keyframes[i].time / trackMaxTime);
                if (isValueArray) {
                    if (arrDim == 2) {
                        kfValues[i] = [];
                        for (var j = 0; j < firstVal.length; j++) {
                            kfValues[i].push(
                                arraySlice.call(keyframes[i].value[j])
                            );
                        }
                    } else {
                        kfValues.push(arraySlice.call(keyframes[i].value));
                    }
                } else {
                    kfValues.push(keyframes[i].value);
                }
            }

            // Cache the key of last frame to speed up when 
            // animation playback is sequency
            var cacheKey = 0;
            var cachePercent = 0;
            var start;
            var i, w;
            var p0, p1, p2, p3;

            var onframe = function(target, percent) {
                // Find the range keyframes
                // kf1-----kf2---------current--------kf3
                // find kf2 and kf3 and do interpolation
                if (percent < cachePercent) {
                    // Start from next key
                    start = Math.min(cacheKey + 1, trackLen - 1);
                    for (i = start; i >= 0; i--) {
                        if (kfPercents[i] <= percent) {
                            break;
                        }
                    }
                    i = Math.min(i, trackLen-2);
                } else {
                    for (i = cacheKey; i < trackLen; i++) {
                        if (kfPercents[i] > percent) {
                            break;
                        }
                    }
                    i = Math.min(i-1, trackLen-2);
                }
                cacheKey = i;
                cachePercent = percent;

                var range = (kfPercents[i+1] - kfPercents[i]);
                if (range === 0) {
                    return;
                } else {
                    w = (percent - kfPercents[i]) / range;
                }
                if (w < 0) {
                    console.log(w);
                }
                if (useSpline) {
                    p1 = kfValues[i];
                    p0 = kfValues[i === 0 ? i : i - 1];
                    p2 = kfValues[i > trackLen - 2 ? trackLen - 1 : i + 1];
                    p3 = kfValues[i > trackLen - 3 ? trackLen - 1 : i + 2];
                    if (isValueArray) {
                        _catmullRomInterpolateArray(
                            p0, p1, p2, p3, w, w*w, w*w*w,
                            getter(target, propName),
                            arrDim
                        );
                    } else {
                        setter(
                            target,
                            propName,
                            _catmullRomInterpolate(
                                p0, p1, p2, p3, w, w*w, w*w*w
                            )
                        );
                    }
                } else {
                    if (isValueArray) {
                        _interpolateArray(
                            kfValues[i], kfValues[i+1], w,
                            getter(target, propName),
                            arrDim
                        );
                    } else {
                        setter(
                            target,
                            propName,
                            _interpolateNumber(kfValues[i], kfValues[i+1], w)
                        );
                    }
                }

                for (i = 0; i < onFrameListLen; i++) {
                    self._onframeList[i](target, percent);
                }
            };

            var clip = new Clip({
                target : self._target,
                life : trackMaxTime,
                loop : self._loop,
                delay : self._delay,
                onframe : onframe,
                ondestroy : ondestroy
            });

            if (easing && easing !== 'spline') {
                clip.easing = easing;
            }
            self._clipList.push(clip);
            self._clipCount++;
            self.animation.add(clip);
        };


        for (var propName in this._tracks) {
            createTrackClip(this._tracks[propName], propName);
        }
        return this;
    },
    stop : function() {
        for (var i = 0; i < this._clipList.length; i++) {
            var clip = this._clipList[i];
            this.animation.remove(clip);
        }
        this._clipList = [];
    },
    delay : function(time){
        this._delay = time;
        return this;
    },
    done : function(func) {
        this._doneList.push(func);
        return this;
    }
};

return Animation;
}
);

/**
 * zrender: config默认配置项
 *
 * @desc zrender是一个轻量级的Canvas类库，MVC封装，数据驱动，提供类Dom事件模型。
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 *
 */
define(
    'zrender/config',{
        loadingEffect : 'spin',         // 默认loading特效
        EVENT : {                       // 支持事件列表
            RESIZE : 'resize',          // 窗口大小变化
            CLICK : 'click',            // 鼠标按钮被（手指）按下，事件对象是：目标图形元素或空

            MOUSEWHEEL : 'mousewheel',  // 鼠标滚轮变化，事件对象是：目标图形元素或空
            MOUSEMOVE : 'mousemove',    // 鼠标（手指）被移动，事件对象是：目标图形元素或空
            MOUSEOVER : 'mouseover',    // 鼠标移到某图形元素之上，事件对象是：目标图形元素
            MOUSEOUT : 'mouseout',      // 鼠标从某图形元素移开，事件对象是：目标图形元素
            MOUSEDOWN : 'mousedown',    // 鼠标按钮（手指）被按下，事件对象是：目标图形元素或空
            MOUSEUP : 'mouseup',        // 鼠标按键（手指）被松开，事件对象是：目标图形元素或空

            //
            GLOBALOUT : 'globalout',    // 全局离开，MOUSEOUT触发比较频繁，一次离开优化绑定

            // 一次成功元素拖拽的行为事件过程是：
            // dragstart > dragenter > dragover [> dragleave] > drop > dragend
            DRAGSTART : 'dragstart',    // 开始拖拽时触发，事件对象是：被拖拽图形元素
            DRAGEND : 'dragend',        // 拖拽完毕时触发（在drop之后触发），事件对象是：被拖拽图形元素
            DRAGENTER : 'dragenter',    // 拖拽图形元素进入目标图形元素时触发，事件对象是：目标图形元素
            DRAGOVER : 'dragover',      // 拖拽图形元素在目标图形元素上移动时触发，事件对象是：目标图形元素
            DRAGLEAVE : 'dragleave',    // 拖拽图形元素离开目标图形元素时触发，事件对象是：目标图形元素
            DROP : 'drop',              // 拖拽图形元素放在目标图形元素内时触发，事件对象是：目标图形元素

            touchClickDelay : 300       // touch end - start < delay is click
        }
    }
);
/**
 * zrender: loading特效
 *
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 *
 * 扩展loading effect：
 * getBackgroundShape：获取背景图形
 * getTextShape：获取文字
 * define : 定义效果
 *
 * 内置效果
 * bar：进度条
 * whirling：旋转水滴
 * dynamicLine：动态线条
 * bubble：气泡
 */
define(
    'zrender/tool/loadingEffect',['require','./util','./color','./color','./color','./color','./color','./math'],function(require) {
        var util = require('./util');
        var self;
        var _defaultText = 'Loading...';
        var _defaultTextFont = 'normal 16px Arial';

        var _width;
        var _height;

        function define(name, fun) {
            self[name] = fun;
        }

        /**
         * 获取loading文字图形
         * @param {Object} textStyle 文字style，同shape/text.style
         */
        function getTextShape(textStyle) {
            return {
                shape : 'text',
                highlightStyle : util.merge(
                    {
                        x : _width / 2,
                        y : _height / 2,
                        text : _defaultText,
                        textAlign : 'center',
                        textBaseline : 'middle',
                        textFont : _defaultTextFont,
                        color: '#333',
                        brushType : 'fill'
                    },
                    textStyle,
                    {'overwrite': true, 'recursive': true}
                )
            };
        }

        /**
         * 获取loading背景图形
         * @param {color} color 背景颜色
         */
        function getBackgroundShape (color) {
            return {
                shape : 'rectangle',
                highlightStyle : {
                    x : 0,
                    y : 0,
                    width : _width,
                    height : _height,
                    brushType : 'fill',
                    color : color
                }
            };
        }

        // 调整值区间
        function _adjust(value, region) {
            if (value <= region[0]) {
                value = region[0];
            }
            else if (value >= region[1]) {
                value = region[1];
            }
            return value;
        }

        /**
         * 进度条
         * @param {Object} loadingOption
         * @param {Object} addShapeHandle
         * @param {Object} refreshHandle
         */
        function bar(loadingOption, addShapeHandle, refreshHandle) {
            var zrColor = require('./color');
            // 特效默认配置
            loadingOption = util.merge(
                loadingOption,
                {
                    textStyle : {
                        color : '#888'
                    },
                    backgroundColor : 'rgba(250, 250, 250, 0.8)',
                    effectOption : {
                        x : 0,
                        y : _height / 2 - 30,
                        width : _width,
                        height : 5,
                        brushType : 'fill',
                        timeInterval : 100
                    }
                },
                {'overwrite': false, 'recursive': true}
            );

            var textShape = getTextShape(loadingOption.textStyle);

            var background = getBackgroundShape(loadingOption.backgroundColor);

            var effectOption = loadingOption.effectOption;
            // 初始化动画元素
            var barShape = {
                shape : 'rectangle',
                highlightStyle : util.clone(effectOption)
            };
            barShape.highlightStyle.color =
                effectOption.color
                || zrColor.getLinearGradient(
                    effectOption.x,
                    effectOption.y,
                    effectOption.x + effectOption.width,
                    effectOption.y + effectOption.height,
                    [[0, '#ff6400'], [0.5, '#ffe100'], [1, '#b1ff00']]
                );

            if (typeof loadingOption.progress != 'undefined') {
                // 指定进度
                addShapeHandle(background);

                barShape.highlightStyle.width =
                    _adjust(loadingOption.progress, [0,1])
                    * loadingOption.effectOption.width;
                addShapeHandle(barShape);

                addShapeHandle(textShape);

                refreshHandle();
                return;
            }
            else {
                // 循环显示
                barShape.highlightStyle.width = 0;
                return setInterval(
                    function() {
                        addShapeHandle(background);

                        if (barShape.highlightStyle.width
                            < loadingOption.effectOption.width
                        ) {
                            barShape.highlightStyle.width += 8;
                        }
                        else {
                            barShape.highlightStyle.width = 0;
                        }
                        addShapeHandle(barShape);

                        addShapeHandle(textShape);
                        refreshHandle();
                    },
                    effectOption.timeInterval
                );
            }
        }

        /**
         * 旋转水滴
         * @param {Object} loadingOption
         * @param {Object} addShapeHandle
         * @param {Object} refreshHandle
         */
        function whirling(loadingOption, addShapeHandle, refreshHandle) {
            // 特效默认配置
            loadingOption.effectOption = util.merge(
                loadingOption.effectOption || {},
                {
                    x : _width / 2 - 80,
                    y : _height / 2,
                    r : 18,
                    colorIn : '#fff',
                    colorOut : '#555',
                    colorWhirl : '#6cf',
                    timeInterval : 50
                }
            );

            var effectOption = loadingOption.effectOption;
            loadingOption = util.merge(
                loadingOption,
                {
                    textStyle : {
                        color : '#888',
                        x : effectOption.x + effectOption.r + 10,
                        y : effectOption.y,
                        textAlign : 'start'
                    },
                    backgroundColor : 'rgba(250, 250, 250, 0.8)'
                },
                {'overwrite': false, 'recursive': true}
            );

            var textShape = getTextShape(loadingOption.textStyle);

            var background = getBackgroundShape(loadingOption.backgroundColor);

            // 初始化动画元素
            var droplet = {
                shape : 'droplet',
                highlightStyle : {
                    a : Math.round(effectOption.r / 2),
                    b : Math.round(effectOption.r - effectOption.r / 6),
                    brushType : 'fill',
                    color : effectOption.colorWhirl
                }
            };
            var circleIn = {
                shape : 'circle',
                highlightStyle : {
                    r : Math.round(effectOption.r / 6),
                    brushType : 'fill',
                    color : effectOption.colorIn
                }
            };
            var circleOut = {
                shape : 'ring',
                highlightStyle : {
                    r0 : Math.round(effectOption.r - effectOption.r / 3),
                    r : effectOption.r,
                    brushType : 'fill',
                    color : effectOption.colorOut
                }
            };

            var pos = [0, effectOption.x, effectOption.y];

            droplet.highlightStyle.x
                = circleIn.highlightStyle.x
                = circleOut.highlightStyle.x
                = pos[1];
            droplet.highlightStyle.y
                = circleIn.highlightStyle.y
                = circleOut.highlightStyle.y
                = pos[2];

            return setInterval(
                function() {
                    addShapeHandle(background);
                    addShapeHandle(circleOut);
                    pos[0] -= 0.3;
                    droplet.rotation = pos;
                    addShapeHandle(droplet);
                    addShapeHandle(circleIn);
                    addShapeHandle(textShape);
                    refreshHandle();
                },
                effectOption.timeInterval
            );
        }

        /**
         * 动态线
         * @param {Object} loadingOption
         * @param {Object} addShapeHandle
         * @param {Object} refreshHandle
         */
        function dynamicLine(loadingOption, addShapeHandle, refreshHandle) {
            var zrColor = require('./color');
            // 特效默认配置
            loadingOption = util.merge(
                loadingOption,
                {
                    textStyle : {
                        color : '#fff'
                    },
                    backgroundColor : 'rgba(0, 0, 0, 0.8)',
                    effectOption : {
                        n : 30,
                        lineWidth : 1,
                        color : 'random',
                        timeInterval : 100
                    }
                },
                {'overwrite': false, 'recursive': true}
            );

            var textShape = getTextShape(loadingOption.textStyle);

            var background = getBackgroundShape(loadingOption.backgroundColor);

            var effectOption = loadingOption.effectOption;
            var n = effectOption.n;
            var lineWidth = effectOption.lineWidth;

            var shapeList = [];
            var pos;
            var len;
            var xStart;
            var color;
            // 初始化动画元素
            for(var i = 0; i < n; i++) {
                xStart = -Math.ceil(Math.random() * 1000);
                len = Math.ceil(Math.random() * 400);
                pos = Math.ceil(Math.random() * _height);

                if (effectOption.color == 'random') {
                    color = zrColor.random();
                }
                else {
                    color = effectOption.color;
                }
                shapeList[i] = {
                    shape : 'line',
                    highlightStyle : {
                        xStart : xStart,
                        yStart : pos,
                        xEnd : xStart + len,
                        yEnd : pos,
                        strokeColor : color,
                        lineWidth : lineWidth
                    },
                    animationX : Math.ceil(Math.random() * 100),
                    len : len
                };
            }

            return setInterval(
                function() {
                    addShapeHandle(background);
                    var style;
                    for(var i = 0; i < n; i++) {
                        style = shapeList[i].highlightStyle ;

                        if (style.xStart >= _width){
                            shapeList[i].len = Math.ceil(Math.random() * 400);
                            shapeList[i].highlightStyle .xStart = -400;
                            shapeList[i].highlightStyle .xEnd =
                                -400 + shapeList[i].len;
                            shapeList[i].highlightStyle .yStart =
                                Math.ceil(Math.random() * _height);
                            shapeList[i].highlightStyle .yEnd =
                                shapeList[i].highlightStyle.yStart;
                        }
                        shapeList[i].highlightStyle.xStart +=
                            shapeList[i].animationX;
                        shapeList[i].highlightStyle.xEnd +=
                            shapeList[i].animationX;

                        addShapeHandle(shapeList[i]);
                    }

                    addShapeHandle(textShape);
                    refreshHandle();
                },
                effectOption.timeInterval
            );
        }

        /**
         * 泡泡
         * @param {Object} loadingOption
         * @param {Object} addShapeHandle
         * @param {Object} refreshHandle
         */
        function bubble(loadingOption, addShapeHandle, refreshHandle) {
            var zrColor = require('./color');
            // 特效默认配置
            loadingOption = util.merge(
                loadingOption,
                {
                    textStyle : {
                        color : '#888'
                    },
                    backgroundColor : 'rgba(250, 250, 250, 0.8)',
                    effectOption : {
                        n : 50,
                        lineWidth : 2,
                        brushType : 'stroke',
                        color : 'random',
                        timeInterval : 100
                    }
                },
                {'overwrite': false, 'recursive': true}
            );

            var textShape = getTextShape(loadingOption.textStyle);

            var background = getBackgroundShape(loadingOption.backgroundColor);

            var effectOption = loadingOption.effectOption;
            var n = effectOption.n;
            var brushType = effectOption.brushType;
            var lineWidth = effectOption.lineWidth;

            var shapeList = [];
            var color;
            // 初始化动画元素
            for(var i = 0; i < n; i++) {
                if (effectOption.color == 'random') {
                    color = zrColor.alpha(zrColor.random(), 0.3);
                }
                else {
                    color = effectOption.color;
                }
                shapeList[i] = {
                    shape : 'circle',
                    highlightStyle : {
                        x : Math.ceil(Math.random() * _width),
                        y : Math.ceil(Math.random() * _height),
                        r : Math.ceil(Math.random() * 40),
                        brushType : brushType,
                        color : color,
                        strokeColor : color,
                        lineWidth : lineWidth
                    },
                    animationY : Math.ceil(Math.random() * 20)
                };
            }

            return setInterval(
                function () {
                    addShapeHandle(background);
                    var style;
                    for(var i = 0; i < n; i++) {
                        style = shapeList[i].highlightStyle;

                        if (style.y - shapeList[i].animationY + style.r <= 0){
                            shapeList[i].highlightStyle.y = _height + style.r;
                            shapeList[i].highlightStyle.x = Math.ceil(
                                Math.random() * _width
                            );
                        }
                        shapeList[i].highlightStyle.y -=
                            shapeList[i].animationY;

                        addShapeHandle(shapeList[i]);
                    }

                    addShapeHandle(textShape);
                    refreshHandle();
                },
                effectOption.timeInterval
            );
        }

        /**
         * 旋转
         * @param {Object} loadingOption
         * @param {Object} addShapeHandle
         * @param {Object} refreshHandle
         */
        function spin(loadingOption, addShapeHandle, refreshHandle) {
            var zrColor = require('./color');
            // 特效默认配置
            loadingOption.effectOption = util.merge(
                loadingOption.effectOption || {},
                {
                    x : _width / 2 - 80,
                    y : _height / 2,
                    r0 : 9,
                    r : 15,
                    n : 18,
                    color : '#fff',
                    timeInterval : 100
                }
            );

            var effectOption = loadingOption.effectOption;
            loadingOption = util.merge(
                loadingOption,
                {
                    textStyle : {
                        color : '#fff',
                        x : effectOption.x + effectOption.r + 10,
                        y : effectOption.y,
                        textAlign : 'start'
                    },
                    backgroundColor : 'rgba(0, 0, 0, 0.8)'
                },
                {'overwrite': false, 'recursive': true}
            );

            var textShape = getTextShape(loadingOption.textStyle);

            var background = getBackgroundShape(loadingOption.backgroundColor);

            var n = effectOption.n;
            var x = effectOption.x;
            var y = effectOption.y;
            var r0 = effectOption.r0;
            var r = effectOption.r;
            var color = effectOption.color;
            // 初始化动画元素
            var shapeList = [];
            var preAngle = Math.round(180 / n);
            for(var i = 0; i < n; i++) {
                shapeList[i] = {
                    shape : 'sector',
                    highlightStyle  : {
                        x : x,
                        y : y,
                        r0 : r0,
                        r : r,
                        startAngle : preAngle * i * 2,
                        endAngle : preAngle * i * 2 + preAngle,
                        color : zrColor.alpha(color, (i + 1) / n),
                        brushType: 'fill'
                    }
                };
            }

            var pos = [0, x, y];

            return setInterval(
                function() {
                    addShapeHandle(background);
                    pos[0] -= 0.3;
                    for(var i = 0; i < n; i++) {
                        shapeList[i].rotation = pos;
                        addShapeHandle(shapeList[i]);
                    }

                    addShapeHandle(textShape);
                    refreshHandle();
                },
                effectOption.timeInterval
            );
        }


        /**
         * 圆环
         * @param {Object} loadingOption
         * @param {Object} addShapeHandle
         * @param {Object} refreshHandle
         */
        function ring(loadingOption, addShapeHandle, refreshHandle) {
            var zrColor = require('./color');
            var zrMath = require('./math');
            // 特效默认配置
            loadingOption = util.merge(
                loadingOption,
                {
                    textStyle : {
                        color : '#07a'
                    },
                    backgroundColor : 'rgba(250, 250, 250, 0.8)',
                    effectOption : {
                        x : _width / 2,
                        y : _height / 2,
                        r0 : 60,
                        r : 100,
                        color : '#bbdcff',
                        brushType: 'fill',
                        textPosition : 'inside',
                        textFont : 'normal 30px verdana',
                        textColor : 'rgba(30, 144, 255, 0.6)',
                        timeInterval : 100
                    }
                },
                {'overwrite': false, 'recursive': true}
            );

            var effectOption = loadingOption.effectOption;
            var textStyle = loadingOption.textStyle;
            textStyle.x = typeof textStyle.x != 'undefined'
                ? textStyle.x : effectOption.x;
            textStyle.y = typeof textStyle.y != 'undefined'
                ? textStyle.y
                : (effectOption.y + (effectOption.r0 + effectOption.r) / 2 - 5);
            var textShape = getTextShape(loadingOption.textStyle);

            var background = getBackgroundShape(loadingOption.backgroundColor);

            var x = effectOption.x;
            var y = effectOption.y;
            var r0 = effectOption.r0 + 6;
            var r = effectOption.r - 6;
            var color = effectOption.color;
            var darkColor = zrColor.lift(color, 0.1);

            var shapeRing = {
                shape : 'ring',
                highlightStyle : util.clone(effectOption)
            };
            // 初始化动画元素
            var shapeList = [];
            var clolrList = zrColor.getGradientColors(
                ['#ff6400', '#ffe100', '#97ff00'], 25
            );
            var preAngle = 15;
            var endAngle = 240;

            for(var i = 0; i < 16; i++) {
                shapeList.push({
                    shape : 'sector',
                    highlightStyle  : {
                        x : x,
                        y : y,
                        r0 : r0,
                        r : r,
                        startAngle : endAngle - preAngle,
                        endAngle : endAngle,
                        brushType: 'fill',
                        color : darkColor
                    },
                    _color : zrColor.getLinearGradient(
                        x + r0 * zrMath.cos(endAngle, true),
                        y - r0 * zrMath.sin(endAngle, true),
                        x + r0 * zrMath.cos(endAngle - preAngle, true),
                        y - r0 * zrMath.sin(endAngle - preAngle, true),
                        [
                            [0, clolrList[i * 2]],
                            [1, clolrList[i * 2 + 1]]
                        ]
                    )
                });
                endAngle -= preAngle;
            }
            endAngle = 360;
            for(var i = 0; i < 4; i++) {
                shapeList.push({
                    shape : 'sector',
                    highlightStyle  : {
                        x : x,
                        y : y,
                        r0 : r0,
                        r : r,
                        startAngle : endAngle - preAngle,
                        endAngle : endAngle,
                        brushType: 'fill',
                        color : darkColor
                    },
                    _color : zrColor.getLinearGradient(
                        x + r0 * zrMath.cos(endAngle, true),
                        y - r0 * zrMath.sin(endAngle, true),
                        x + r0 * zrMath.cos(endAngle - preAngle, true),
                        y - r0 * zrMath.sin(endAngle - preAngle, true),
                        [
                            [0, clolrList[i * 2 + 32]],
                            [1, clolrList[i * 2 + 33]]
                        ]
                    )
                });
                endAngle -= preAngle;
            }

            var n = 0;
            if (typeof loadingOption.progress != 'undefined') {
                // 指定进度
                addShapeHandle(background);

                n = _adjust(loadingOption.progress, [0,1]).toFixed(2) * 100 / 5;
                shapeRing.highlightStyle.text = n * 5 + '%';
                addShapeHandle(shapeRing);

                for(var i = 0; i < 20; i++) {
                    shapeList[i].highlightStyle.color = i < n
                        ? shapeList[i]._color : darkColor;
                    addShapeHandle(shapeList[i]);
                }

                addShapeHandle(textShape);

                refreshHandle();
                return;
            }
            else {
                // 循环显示
                return setInterval(
                    function() {
                        addShapeHandle(background);

                        n += n >= 20 ? -20 : 1;

                        //shapeRing.highlightStyle.text = n * 5 + '%';
                        addShapeHandle(shapeRing);

                        for(var i = 0; i < 20; i++) {
                            shapeList[i].highlightStyle.color = i < n
                                ? shapeList[i]._color : darkColor;
                            addShapeHandle(shapeList[i]);
                        }

                        addShapeHandle(textShape);
                        refreshHandle();
                    },
                    effectOption.timeInterval
                );
            }
        }

        function start(loadingOption, addShapeHandle, refreshHandle) {
            var loadingEffect = self.ring;   // 默认特效
            if (typeof loadingOption.effect == 'function') {
                // 自定义特效
                loadingEffect = loadingOption.effect;
            }
            else if (typeof self[loadingOption.effect] == 'function'){
                // 指定特效
                loadingEffect = self[loadingOption.effect];
            }

            _width = loadingOption.canvasSize.width;
            _height = loadingOption.canvasSize.height;

            return loadingEffect(
                loadingOption, addShapeHandle, refreshHandle
            );
        }

        function stop(loadingTimer) {
            clearInterval(loadingTimer);
        }

        self = {
            // 这三个方法用于扩展loading effect
            getBackgroundShape : getBackgroundShape,
            getTextShape : getTextShape,
            define : define,
            // 内置特效
            bar : bar,
            whirling : whirling,
            dynamicLine : dynamicLine,
            bubble : bubble,
            spin : spin,
            ring : ring,
            // 方法
            start : start,
            stop : stop
        };

        return self;
    }
);
/**
 * zrender: 事件辅助类
 *
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 *
 * getX：获取事件横坐标
 * getY：或者事件纵坐标
 * getDelta：或者鼠标滚轮变化
 * stop：停止事件传播
 * Dispatcher：事件分发器
 */
define(
    'zrender/tool/event',[],function() {
        /**
        * 提取鼠标（手指）x坐标
        * @param  {event} e 事件.
        * @return {number} 鼠标（手指）x坐标.
        */
        function getX(e) {
            return typeof e.zrenderX != 'undefined' && e.zrenderX
                   || typeof e.offsetX != 'undefined' && e.offsetX
                   || typeof e.layerX != 'undefined' && e.layerX
                   || typeof e.clientX != 'undefined' && e.clientX;
        }

        /**
        * 提取鼠标y坐标
        * @param  {event} e 事件.
        * @return {number} 鼠标（手指）y坐标.
        */
        function getY(e) {
            return typeof e.zrenderY != 'undefined' && e.zrenderY
                   || typeof e.offsetY != 'undefined' && e.offsetY
                   || typeof e.layerY != 'undefined' && e.layerY
                   || typeof e.clientY != 'undefined' && e.clientY;
        }

        /**
        * 提取鼠标滚轮变化
        * @param  {event} e 事件.
        * @return {number} 滚轮变化，正值说明滚轮是向上滚动，如果是负值说明滚轮是向下滚动
        */
        function getDelta(e) {
            return typeof e.wheelDelta != 'undefined' && e.wheelDelta
                   || typeof e.detail != 'undefined' && -e.detail;
        }

        /**
         * 停止冒泡和阻止默认行为
         * @param {Object} e : event对象
         */
        function stop(e) {
            if (e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }
            else {
                e.returnValue = false;
                e.cancelBubble = true;
            }
        }

        /**
         * 事件分发器
         */
        function Dispatcher() {
            var _self = this;
            var _h = {};

            /**
             * 单次触发绑定，dispatch后销毁
             * @param {string} event 事件字符串
             * @param {function} handler 响应函数
             */
            function one(event, handler) {
                if(!handler || !event) {
                    return _self;
                }

                if(!_h[event]) {
                    _h[event] = [];
                }

                _h[event].push({
                    h : handler,
                    one : true
                });

                return _self;
            }

            /**
             * 事件绑定
             * @param {string} event 事件字符串
             * @param {function} handler : 响应函数
             */
            function bind(event, handler) {
                if(!handler || !event) {
                    return _self;
                }

                if(!_h[event]) {
                    _h[event] = [];
                }

                _h[event].push({
                    h : handler,
                    one : false
                });

                return _self;
            }

            /**
             * 事件解绑定
             * @param {string} event 事件字符串
             * @param {function} handler : 响应函数
             */
            function unbind(event, handler) {
                if(!event) {
                    _h = {};
                    return _self;
                }

                if(handler) {
                    if(_h[event]) {
                        var newList = [];
                        for (var i = 0, l = _h[event].length; i < l; i++) {
                            if (_h[event][i]['h'] != handler) {
                                newList.push(_h[event][i]);
                            }
                        }
                        _h[event] = newList;
                    }

                    if(_h[event] && _h[event].length === 0) {
                        delete _h[event];
                    }
                }
                else {
                    delete _h[event];
                }

                return _self;
            }

            /**
             * 事件分发
             * @param {string} type : 事件类型
             * @param {Object} event : event对象
             * @param {Object} [attachment] : 附加信息
             */
            function dispatch(type, event, attachment) {
                if(_h[type]) {
                    var newList = [];
                    var eventPacket = attachment || {};
                    eventPacket.type = type;
                    eventPacket.event = event;
                    //eventPacket._target = self;
                    for (var i = 0, l = _h[type].length; i < l; i++) {
                        _h[type][i]['h'](eventPacket);
                        if (!_h[type][i]['one']) {
                            newList.push(_h[type][i]);
                        }
                    }

                    if (newList.length != _h[type].length) {
                        _h[type] = newList;
                    }
                }

                return _self;
            }

            _self.one = one;
            _self.bind = bind;
            _self.unbind = unbind;
            _self.dispatch = dispatch;
        }

        return {
            getX : getX,
            getY : getY,
            getDelta : getDelta,
            stop : stop,
            Dispatcher : Dispatcher
        };
    }
);
/*!
 * ZRender, a lightweight canvas library with a MVC architecture, data-driven 
 * and provides an event model like DOM.
 *  
 * Copyright (c) 2013, Baidu Inc.
 * All rights reserved.
 * 
 * LICENSE
 * https://github.com/ecomfe/zrender/blob/master/LICENSE.txt
 */

/**
 * zrender: core核心类
 *
 * @desc zrender是一个轻量级的Canvas类库，MVC封装，数据驱动，提供类Dom事件模型。
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 *
 */
define(
    'zrender/zrender',['require','./lib/excanvas','./tool/util','./tool/env','./shape','./shape/circle','./shape/ellipse','./shape/line','./shape/polygon','./shape/brokenLine','./shape/rectangle','./shape/ring','./shape/sector','./shape/text','./shape/heart','./shape/droplet','./shape/path','./shape/image','./shape/beziercurve','./shape/star','./shape/isogon','./animation/animation','./config','./tool/loadingEffect','./tool/loadingEffect','./config','./tool/env','./tool/event'],function(require) {
        /*
         * HTML5 Canvas for Internet Explorer!
         * Modern browsers like Firefox, Safari, Chrome and Opera support
         * the HTML5 canvas tag to allow 2D command-based drawing.
         * ExplorerCanvas brings the same functionality to Internet Explorer.
         * To use, web developers only need to include a single script tag
         * in their existing web pages.
         *
         * https://code.google.com/p/explorercanvas/
         * http://explorercanvas.googlecode.com/svn/trunk/excanvas.js
         */
        // 核心代码会生成一个全局变量 G_vmlCanvasManager，模块改造后借用于快速判断canvas支持
        require('./lib/excanvas');

        var util = require('./tool/util');

        var self = {};
        var zrender = self;     // 提供MVC内部反向使用静态方法；

        var _idx = 0;           //ZRender instance's id
        var _instances = {};    //ZRender实例map索引

        self.version = '1.1.1';

        /**
         * zrender初始化
         * 不让外部直接new ZRender实例，为啥？
         * 不为啥，提供全局可控同时减少全局污染和降低命名冲突的风险！
         *
         * @param {HTMLElement} dom dom对象，不帮你做document.getElementById了
         * @param {Object=} params 个性化参数，如自定义shape集合，带进来就好
         *
         * @return {ZRender} ZRender实例
         */
        self.init = function(dom, params) {
            var zi = new ZRender(++_idx + '', dom, params || {});
            _instances[_idx] = zi;
            return zi;
        };

        /**
         * zrender实例销毁，记在_instances里的索引也会删除了
         * 管生就得管死，可以通过zrender.dispose(zi)销毁指定ZRender实例
         * 当然也可以直接zi.dispose()自己销毁
         *
         * @param {ZRender=} zi ZRender对象，不传则销毁全部
         */
        self.dispose = function(zi) {
            if (zi) {
                zi.dispose();
            }
            else {
                for (var z in _instances) {
                    _instances[z].dispose();
                }
                _instances = {};
            }
            return self;
        };

        /**
         * 获取zrender实例
         *
         * @param {string} id ZRender对象索引
         */
        self.getInstance = function(id) {
            return _instances[id];
        };

        /**
         * 删除zrender实例，ZRender实例dispose时会调用，
         * 删除后getInstance则返回undefined
         * ps: 仅是删除，删除的实例不代表已经dispose了~~
         *     这是一个摆脱全局zrender.dispose()自动销毁的后门，
         *     take care of yourself~
         *
         * @param {string} id ZRender对象索引
         */
        self.delInstance = function(id) {
            if (_instances[id]) {
                //只是对垃圾回收上的友好照顾，不写也大不了~
                _instances[id] = null;
                delete _instances[id];
            }
            return self;
        };

        // 是否异常捕获
        self.catchBrushException = false;

        /**
         * debug日志选项：catchBrushException为true下有效
         * 0 : 不生成debug数据，发布用
         * 1 : 异常抛出，调试用
         * 2 : 控制台输出，调试用
         */
        self.debugMode = 0;
        self.log = function() {
            if (self.debugMode === 0) {
                return;
            }
            else if (self.debugMode == 1) {
                for (var k in arguments) {
                    throw new Error(arguments[k]);
                }
            }
            else if (self.debugMode > 1) {
                for (var k in arguments) {
                    console.log(arguments[k]);
                }
            }

            return self;
        };
        /* for debug
        self.log = function(mes) {
            document.getElementById('wrong-message').innerHTML =
                mes + ' ' + (new Date() - 0)
                + '<br/>' 
                + document.getElementById('wrong-message').innerHTML;
        };
        */
        /**
         * ZRender接口类，对外可用的所有接口都在这里！！
         * storage（M）、painter（V）、handler（C）为内部私有类，外部接口不可见
         * 非get接口统一返回self支持链式调用~
         *
         * @param {string} id 唯一标识
         * @param {HTMLElement} dom dom对象，不帮你做document.getElementById
         * @param {Object=} params 个性化参数，如自定义shape集合，带进来就好
         *
         * @return {ZRender} ZRender实例
         */
        function ZRender(id, dom, params) {
            var self = this;
            self.env = require('./tool/env');
            
            var shape = require('./shape');
            // 内置图形注册
            require('./shape/circle');
            require('./shape/ellipse');
            require('./shape/line');
            require('./shape/polygon');
            require('./shape/brokenLine');
            require('./shape/rectangle');
            require('./shape/ring');
            require('./shape/sector');
            require('./shape/text');
            require('./shape/heart');
            require('./shape/droplet');
            require('./shape/path');
            require('./shape/image');
            require('./shape/beziercurve');
            require('./shape/star');
            require('./shape/isogon');
            
            var shapeLibrary;

            if (typeof params.shape == 'undefined') {
                //默认图形库
                shapeLibrary = shape;
            }
            else {
                //自定义图形库，私有化，实例独占
                shapeLibrary = {};
                for (var s in params.shape) {
                    shapeLibrary[s] = params.shape[s];
                }
                shapeLibrary.get = function(name) {
                    return shapeLibrary[name] || shape.get(name);
                };
            }

            var storage = new Storage(shapeLibrary);
            var painter = new Painter(dom, storage, shapeLibrary);
            var handler = new Handler(dom, storage, painter, shapeLibrary);

            // 动画控制
            var Animation = require('./animation/animation');
            var animatingShapes = [];
            var animation = new Animation({
                stage : {
                    update : function(){
                        var shapes = animatingShapes;
                        for (var i = 0, l = shapes.length; i < l; i++) {
                            storage.mod(shapes[i].id);
                        }
                        if (shapes.length > 0) {
                            painter.refresh();
                        }
                    }
                }
            });
            animation.start();

            /**
             * 获取实例唯一标识
             */
            self.getId = function() {
                return id;
            };

            /**
             * 添加图形形状
             * @param {Object} shape 形状对象，可用属性全集，详见各shape
             */
            self.addShape = function(shape) {
                storage.add(shape);
                return self;
            };

            /**
             * 删除图形形状
             * @param {string} shapeId 形状对象唯一标识
             */
            self.delShape = function(shapeId) {
                storage.del(shapeId);
                return self;
            };

            /**
             * 修改图形形状
             * @param {string} shapeId 形状对象唯一标识
             * @param {Object} shape 形状对象
             * @param {fast} boolean 默认为false, 如果为true的话会在merge中省略部分判断
             */
            self.modShape = function(shapeId, shape, fast) {
                storage.mod(shapeId, shape, fast);
                return self;
            };

            /**
             * 修改指定zlevel的绘制配置项，例如clearColor
             * @param {string} zLevel
             * @param {Object} config 配置对象, 目前支持clearColor 
             */
            self.modLayer = function(zLevel, config) {
                painter.modLayer(zLevel, config);
            }

            /**
             * 添加额外高亮层显示，仅提供添加方法，每次刷新后高亮层图形均被清空
             * @param {Object} shape 形状对象
             */
            self.addHoverShape = function(shape) {
                storage.addHover(shape);
                return self;
            };

            /**
             * 渲染
             * @param {Function} callback  渲染结束后回调函数
             * todo:增加缓动函数
             */
            self.render = function(callback) {
                painter.render(callback);
                return self;
            };

            /**
             * 视图更新
             * @param {Function} callback  视图更新后回调函数
             */
            self.refresh = function(callback) {
                painter.refresh(callback);
                return self;
            };
            
            /**
             * 高亮层更新
             * @param {Function} callback  视图更新后回调函数
             */
            self.refreshHover = function(callback) {
                painter.refreshHover(callback);
                return self;
            };

            /**
             * 视图更新
             * @param {Array} shapeList 需要更新的图形元素列表
             * @param {Function} callback  视图更新后回调函数
             */
            self.update = function(shapeList, callback) {
                painter.update(shapeList, callback);
                return self;
            };

            self.resize = function() {
                painter.resize();
                return self;
            };

            /**
             * 动画
             * @param {string} shapeId 形状对象唯一标识
             * @param {string} path 需要添加动画的属性获取路径，可以通过a.b.c来获取深层的属性
             * @param {boolean} loop 动画是否循环
             * @return {Object} 动画的Deferred对象
             * Example:
             * zr.animate( circleId, 'style', false)
             *   .when(1000, { x: 10} )
             *   .done( function(){ console.log('Animation done')})
             *   .start()
             */
            self.animate = function(shapeId, path, loop) {
                var shape = storage.get(shapeId);
                if (shape) {
                    var target;
                    if (path) {
                        var pathSplitted = path.split('.');
                        var prop = shape;
                        for (var i = 0, l = pathSplitted.length; i < l; i++) {
                            if (!prop) {
                                continue;
                            }
                            prop = prop[pathSplitted[i]];
                        }
                        if (prop) {
                            target = prop;
                        }
                    }
                    else {
                        target = shape;
                    }
                    if (!target) {
                        zrender.log(
                            'Property "'
                            + path
                            + '" is not existed in shape '
                            + shapeId
                        );
                        return;
                    }

                    if (typeof(shape.__aniCount) === 'undefined') {
                        // 正在进行的动画记数
                        shape.__aniCount = 0;
                    }
                    if (shape.__aniCount === 0) {
                        animatingShapes.push(shape);
                    }
                    shape.__aniCount++;

                    return animation.animate(target, {loop : loop})
                        .done(function() {
                            shape.__aniCount --;
                            if( shape.__aniCount === 0){
                                // 从animatingShapes里移除
                                var idx = util.indexOf(animatingShapes, shape);
                                animatingShapes.splice(idx, 1);
                            }
                        });
                }
                else {
                    zrender.log('Shape "'+ shapeId + '" not existed');
                }
            };

            /**
             * 停止所有动画
             */
            self.clearAnimation = function() {
                animation.clear();
            };

            /**
             * loading显示
             * @param  {Object} loadingOption 参数
             * {
             *     effect,
             *     //loading话术
             *     text:'',
             *     // 水平安放位置，默认为 'center'，可指定x坐标
             *     x:'center' || 'left' || 'right' || {number},
             *     // 垂直安放位置，默认为'top'，可指定y坐标
             *     y:'top' || 'bottom' || {number},
             *
             *     textStyle:{
             *         textFont: 'normal 20px Arial' || {textFont}, //文本字体
             *         color: {color}
             *     }
             * }
             */
            self.showLoading = function(loadingOption) {
                painter.showLoading(loadingOption);
                return self;
            };

            /**
             * loading结束
             */
            self.hideLoading = function() {
                painter.hideLoading();
                return self;
            };

            /**
             * 生成形状唯一ID
             * @param {string} [idPrefix] id前缀
             * @return {string} 不重复ID
             */
            self.newShapeId = function(idPrefix) {
                return storage.newShapeId(idPrefix);
            };

            /**
             * 获取视图宽度
             */
            self.getWidth = function() {
                return painter.getWidth();
            };

            /**
             * 获取视图高度
             */
            self.getHeight = function() {
                return painter.getHeight();
            };

            /**
             * 图像导出 
             */
            self.toDataURL = function(type, backgroundColor, args) {
                return painter.toDataURL(type, backgroundColor, args);
            };

            /**
             * 将常规shape转成image shape
             */
            self.shapeToImage = function(e, width, height) {
                var id = self.newShapeId('image');
                return painter.shapeToImage(id, e, width, height);
            };

            /**
             * 事件绑定
             * @param {string} eventName 事件名称
             * @param {Function} eventHandler 响应函数
             */
            self.on = function(eventName, eventHandler) {
                handler.on(eventName, eventHandler);
                return self;
            };

            /**
             * 事件解绑定，参数为空则解绑所有自定义事件
             * @param {string} eventName 事件名称
             * @param {Function} eventHandler 响应函数
             */
            self.un = function(eventName, eventHandler) {
                handler.un(eventName, eventHandler);
                return self;
            };
            
            /**
             * 事件触发
             * @param {string} event 事件名称，resize，hover，drag，etc~
             * @param {event=} event event dom事件对象
             */
            self.trigger = function(eventName, event) {
                handler.trigger(eventName, event);
                return self;
            };
            

            /**
             * 清除当前ZRender下所有类图的数据和显示，clear后MVC和已绑定事件均还存在在，ZRender可用
             */
            self.clear = function() {
                storage.del();
                painter.clear();
                return self;
            };

            /**
             * 释放当前ZR实例（删除包括dom，数据、显示和事件绑定），dispose后ZR不可用
             */
            self.dispose = function() {
                animation.stop();
                animation = null;
                animatingShapes = null;

                self.clear();
                self = null;

                storage.dispose();
                storage = null;

                painter.dispose();
                painter = null;

                handler.dispose();
                handler = null;

                //释放后告诉全局删除对自己的索引，没想到啥好方法
                zrender.delInstance(id);

                return;
            };
        }

        /**
         * 内容仓库 (M)
         * @param {Object} shape 图形库
         */
        function Storage(shape) {
            var self = this;

            var _idBase = 0;            //图形数据id自增基础

            // 所有常规形状，id索引的map
            var _elements = {};

            // 所有形状的z轴方向排列，提高遍历性能，zElements[0]的形状在zElements[1]形状下方
            var _zElements = [];

            // 高亮层形状，不稳定，动态增删，数组位置也是z轴方向，靠前显示在下方
            var _hoverElements = [];

            var _maxZlevel = 0;         // 最大zlevel
            var _changedZlevel = {};    // 有数据改变的zlevel

            /**
             * 快速判断标志~
             * e.__silent 是否需要hover判断
             * e.__needTransform 是否需要进行transform
             * e.style.__rect 区域矩阵缓存，修改后清空，重新计算一次
             */
            function _mark(e) {
                if (e.hoverable || e.onclick || e.draggable
                    || e.onmousemove || e.onmouseover || e.onmouseout
                    || e.onmousedown || e.onmouseup
                    || e.ondragenter || e.ondragover || e.ondragleave
                    || e.ondrop
                ) {
                    e.__silent = false;
                }
                else {
                    e.__silent = true;
                }

                if (Math.abs(e.rotation[0]) > 0.0001
                    || Math.abs(e.position[0]) > 0.0001
                    || Math.abs(e.position[1]) > 0.0001
                    || Math.abs(e.scale[0] - 1) > 0.0001
                    || Math.abs(e.scale[1] - 1) > 0.0001
                ) {
                    e.__needTransform = true;
                }
                else {
                    e.__needTransform = false;
                }

                e.style = e.style || {};
                e.style.__rect = null;
            }

            /**
             * 唯一标识id生成
             * @param {string=} idHead 标识前缀
             */
            function newShapeId(idHead) {
                return (idHead || '') + (++_idBase);
            }

            /**
             * 添加
             * @param {Object} params 参数
             */
            function add(params) {
                // 默认&必须的参数
                var e = {
                    'shape': 'circle',                      // 形状
                    'id': params.id || self.newShapeId(),   // 唯一标识
                    'zlevel': 0,                            // z轴位置
                    'draggable': false,                     // draggable可拖拽
                    'clickable': false,                     // clickable可点击响应
                    'hoverable': true,                      // hoverable可悬浮响应
                    'position': [0, 0],
                    'rotation' : [0, 0, 0],
                    'scale' : [1, 1, 0, 0]
                };
                util.merge(
                    e,
                    params,
                    {
                        'overwrite': true,
                        'recursive': true
                    }
                );
                _mark(e);
                _elements[e.id] = e;
                _zElements[e.zlevel] = _zElements[e.zlevel] || [];
                _zElements[e.zlevel].push(e);

                _maxZlevel = Math.max(_maxZlevel,e.zlevel);
                _changedZlevel[e.zlevel] = true;

                return self;
            }

            /**
             * 根据指定的shapeId获取相应的shape属性
             * @param {string=} idx 唯一标识
             */
            function get(shapeId) {
                return _elements[shapeId];
            }

            /**
             * 删除，shapeId不指定则全清空
             * @param {string= | Array} idx 唯一标识
             */
            function del(shapeId) {
                if (typeof shapeId != 'undefined') {
                    var delMap = {};
                    if (!(shapeId instanceof Array)) {
                        // 单个
                        delMap[shapeId] = true;
                    }
                    else {
                        // 批量删除
                        if (shapeId.lenth < 1) { // 空数组
                            return;
                        }
                        for (var i = 0, l = shapeId.length; i < l; i++) {
                            delMap[shapeId[i].id] = true;
                        }
                    }
                    var newList;
                    var oldList;
                    var zlevel;
                    var zChanged = {};
                    for (var sId in delMap) {
                        if (_elements[sId]) {
                            zlevel = _elements[sId].zlevel;
                            _changedZlevel[zlevel] = true;
                            if (!zChanged[zlevel]) {
                                oldList = _zElements[zlevel];
                                newList = [];
                                for (var i = 0, l = oldList.length; i < l; i++){
                                    if (!delMap[oldList[i].id]) {
                                        newList.push(oldList[i]);
                                    }
                                }
                                _zElements[zlevel] = newList;
                                zChanged[zlevel] = true;
                            }
                            delete _elements[sId];
                        }
                    }
                }
                else{
                    //不指定shapeId清空
                    _elements = {};
                    _zElements = [];
                    _hoverElements = [];
                    _maxZlevel = 0;         //最大zlevel
                    _changedZlevel = {      //有数据改变的zlevel
                        all : true
                    };
                }

                return self;
            }

            /**
             * 修改
             * @param {string} idx 唯一标识
             * @param {Object} params]参数
             * @param {boolean} fast
             */
            function mod(shapeId, params, fast) {
                var e = _elements[shapeId];
                if (e) {
                    _changedZlevel[e.zlevel] = true;    // 可能修改前后不在一层
                    if (params) {
                        if (fast) {
                            util.mergeFast(
                                e,
                                params,
                                true,
                                true
                            );
                        } else {
                            util.merge(
                                e,
                                params,
                                {
                                    'overwrite': true,
                                    'recursive': true
                                }
                            );
                        }   
                    }
                    _mark(e);
                    _changedZlevel[e.zlevel] = true;    // 可能修改前后不在一层
                    _maxZlevel = Math.max(_maxZlevel,e.zlevel);
                }

                return self;
            }

            /**
             * 常规形状位置漂移，形状自身定义漂移函数
             * @param {string} idx 形状唯一标识
             *
             */
            function drift(shapeId, dx, dy) {
                var e = _elements[shapeId];
                if (!e) {
                    return;
                }
                e.__needTransform = true;
                if (!e.ondrift //ondrift
                    //有onbrush并且调用执行返回false或undefined则继续
                    || (e.ondrift && !e.ondrift(e, dx, dy))
                ) {
                    if (zrender.catchBrushException) {
                        try {
                            shape.get(e.shape).drift(e, dx, dy);
                        }
                        catch(error) {
                            zrender.log(error, 'drift error of ' + e.shape, e);
                        }
                    }
                    else {
                        shape.get(e.shape).drift(e, dx, dy);
                    }
                }

                _changedZlevel[e.zlevel] = true;

                return self;
            }

            /**
             * 添加高亮层数据
             * @param {Object} params 参数
             */
            function addHover(params) {
                if ((params.rotation && Math.abs(params.rotation[0]) > 0.0001)
                    || (params.position
                        && (Math.abs(params.position[0]) > 0.0001
                            || Math.abs(params.position[1]) > 0.0001))
                    || (params.scale
                        && (Math.abs(params.scale[0] - 1) > 0.0001
                        || Math.abs(params.scale[1] - 1) > 0.0001))
                ) {
                    params.__needTransform = true;
                }
                else {
                    params.__needTransform = false;
                }

                _hoverElements.push(params);
                return self;
            }

            /**
             * 删除高亮层数据
             */
            function delHover() {
                _hoverElements = [];
                return self;
            }

            function hasHoverShape() {
                return _hoverElements.length > 0;
            }

            /**
             * 遍历迭代器
             * @param {Function} fun 迭代回调函数，return true终止迭代
             * @param {Object=} option 迭代参数，缺省为仅降序遍历常规形状
             *     hover : true 是否迭代高亮层数据
             *     normal : 'down' | 'up' | 'free' 是否迭代常规数据，迭代时是否指定及z轴顺序
             */
            function iterShape(fun, option) {
                if (!option) {
                    option = {
                        hover: false,
                        normal: 'down'
                    };
                }
                if (option.hover) {
                    //高亮层数据遍历
                    for (var i = 0, l = _hoverElements.length; i < l; i++) {
                        if (fun(_hoverElements[i])) {
                            return self;
                        }
                    }
                }

                var zlist;
                var len;
                if (typeof option.normal != 'undefined') {
                    //z轴遍历: 'down' | 'up' | 'free'
                    switch (option.normal) {
                        case 'down':
                            //降序遍历，高层优先
                            for (var l = _zElements.length - 1; l >= 0; l--) {
                                zlist = _zElements[l];
                                if (zlist) {
                                    len = zlist.length;
                                    while (len--) {
                                        if (fun(zlist[len])) {
                                            return self;
                                        }
                                    }
                                }
                            }
                            break;
                        case 'up':
                            //升序遍历，底层优先
                            for (var i = 0, l = _zElements.length; i < l; i++) {
                                zlist = _zElements[i];
                                if (zlist) {
                                    len = zlist.length;
                                    for (var k = 0; k < len; k++) {
                                        if (fun(zlist[k])) {
                                            return self;
                                        }
                                    }
                                }
                            }
                            break;
                        // case 'free':
                        default:
                            //无序遍历
                            for (var i in _elements) {
                                if (fun(_elements[i])) {
                                    return self;
                                }
                            }
                            break;
                    }
                }

                return self;
            }

            function getMaxZlevel() {
                return _maxZlevel;
            }

            function getChangedZlevel() {
                return _changedZlevel;
            }

            function clearChangedZlevel() {
                _changedZlevel = {};
                return self;
            }

            function setChangedZlevle(level){
                _changedZlevel[level] = true;
                return self;
            }

            /**
             * 释放
             */
            function dispose() {
                _elements = null;
                _zElements = null;
                _hoverElements = null;
                self = null;

                return;
            }

            self.newShapeId = newShapeId;
            self.add = add;
            self.get = get;
            self.del = del;
            self.addHover = addHover;
            self.delHover = delHover;
            self.hasHoverShape = hasHoverShape;
            self.mod = mod;
            self.drift = drift;
            self.iterShape = iterShape;
            self.getMaxZlevel = getMaxZlevel;
            self.getChangedZlevel = getChangedZlevel;
            self.clearChangedZlevel = clearChangedZlevel;
            self.setChangedZlevle = setChangedZlevle;
            self.dispose = dispose;
        }

        /**
         * 绘图类 (V)
         * @param {HTMLElement} root 绘图区域
         * @param {storage} storage Storage实例
         * @param {Object} shape 图形库
         */
        function Painter(root, storage, shape) {
            var config = require('./config');
            var self = this;

            var _domList = {};              //canvas dom元素
            var _ctxList = {};              //canvas 2D context对象，与domList对应
            var _domListBack = {};
            var _ctxListBack = {};
            
            // 每个zLevel 的配置
            // @config clearColor
            var _zLevelConfig = {};

            var _maxZlevel = 0;             //最大zlevel，缓存记录
            var _loadingTimer;

            var _domRoot = document.createElement('div');
            // 避免页面选中的尴尬
            _domRoot.onselectstart = function() {
                return false;
            };

            //宽，缓存记录
            var _width;
            //高，缓存记录
            var _height;

            //retina 屏幕优化
            var _devicePixelRatio = window.devicePixelRatio || 1;

            function _getWidth() {
                var stl = root.currentStyle
                          || document.defaultView.getComputedStyle(root);

                return (root.clientWidth || (stl.style.width.replace(/\D/g,'')))
                       - stl.paddingLeft.replace(/\D/g,'')   // 请原谅我这比较粗暴
                       - stl.paddingRight.replace(/\D/g,'');
            }

            function _getHeight(){
                var stl = root.currentStyle
                          || document.defaultView.getComputedStyle(root);

                return (root.clientHeight || (stl.style.height.replace(/\D/g,'')))
                       - stl.paddingTop.replace(/\D/g,'')    // 请原谅我这比较粗暴
                       - stl.paddingBottom.replace(/\D/g,'');
            }

            function _init() {
                _domRoot.innerHTML = '';
                root.innerHTML = '';

                _width = _getWidth();
                _height = _getHeight();

                //没append呢，原谅我这样写，清晰~
                _domRoot.style.position = 'relative';
                _domRoot.style.overflow = 'hidden';
                _domRoot.style.width = _width + 'px';
                _domRoot.style.height = _height + 'px';

                root.appendChild(_domRoot);

                _domList = {};
                _ctxList = {};

                _domListBack = {};
                _ctxListBack = {};

                _maxZlevel = storage.getMaxZlevel();

                //创建各层canvas
                //背景
                _domList['bg'] = _createDom('bg','div');
                _domRoot.appendChild(_domList['bg']);

                //实体
                for (var i = 0; i <= _maxZlevel; i++) {
                    _domList[i] = _createDom(i,'canvas');
                    _domRoot.appendChild(_domList[i]);
                    if (G_vmlCanvasManager) {
                        G_vmlCanvasManager.initElement(_domList[i]);
                    }
                    _ctxList[i] = _domList[i].getContext('2d');
                    _devicePixelRatio != 1 
                    && _ctxList[i].scale(_devicePixelRatio, _devicePixelRatio);
                }

                //高亮
                _domList['hover'] = _createDom('hover','canvas');
                _domList['hover'].id = '_zrender_hover_';
                _domRoot.appendChild(_domList['hover']);
                if (G_vmlCanvasManager) {
                    G_vmlCanvasManager.initElement(_domList['hover']);
                }
                _ctxList['hover'] = _domList['hover'].getContext('2d');
                _devicePixelRatio != 1 
                && _ctxList['hover'].scale(
                       _devicePixelRatio, _devicePixelRatio
                   );
            }

            /**
             * 检查_maxZlevel是否变大，如是则同步创建需要的Canvas
             */
            function _syncMaxZlevelCanvase(){
                var curMaxZlevel = storage.getMaxZlevel();
                if (_maxZlevel < curMaxZlevel) {
                    //实体
                    for (var i = _maxZlevel + 1; i <= curMaxZlevel; i++) {
                        _domList[i] = _createDom(i,'canvas');
                        _domRoot.insertBefore(_domList[i], _domList['hover']);
                        if (G_vmlCanvasManager) {
                            G_vmlCanvasManager.initElement(_domList[i]);
                        }
                        _ctxList[i] = _domList[i].getContext('2d');
                        _devicePixelRatio != 1 
                        && _ctxList[i].scale(
                               _devicePixelRatio, _devicePixelRatio
                           );
                    }
                    _maxZlevel = curMaxZlevel;
                }
            }

            /**
             * 创建dom
             * @param {string} id dom id 待用
             * @param {string} type : dom type， such as canvas, div etc.
             */
            function _createDom(id, type) {
                var newDom = document.createElement(type);

                //没append呢，请原谅我这样写，清晰~
                newDom.style.position = 'absolute';
                newDom.style.left = 0;
                newDom.style.top = 0;
                newDom.style.width = _width + 'px';
                newDom.style.height = _height + 'px';
                newDom.setAttribute('width', _width * _devicePixelRatio);
                newDom.setAttribute('height', _height * _devicePixelRatio);
                //id不作为索引用，避免可能造成的重名，定义为私有属性
                newDom.setAttribute('data-id', id);
                return newDom;
            }

            /**
             * 刷画图形
             * @param {Object} changedZlevel 需要更新的zlevel索引
             */
            function _brush(changedZlevel) {
                return function(e) {
                    if ((changedZlevel.all || changedZlevel[e.zlevel])
                        && !e.invisible
                    ) {
                        var ctx = _ctxList[e.zlevel];
                        if (ctx) {
                            if (!e.onbrush //没有onbrush
                                //有onbrush并且调用执行返回false或undefined则继续粉刷
                                || (e.onbrush && !e.onbrush(ctx, e, false))
                            ) {
                                if (zrender.catchBrushException) {
                                    try {
                                        shape.get(e.shape).brush(
                                            ctx, e, false, update
                                        );
                                    }
                                    catch(error) {
                                        zrender.log(
                                            error,
                                            'brush error of ' + e.shape,
                                            e
                                        );
                                    }
                                }
                                else {
                                    shape.get(e.shape).brush(
                                        ctx, e, false, update
                                    );
                                }
                            }
                        }
                        else {
                            zrender.log(
                                'can not find the specific zlevel canvas!'
                            );
                        }
                    }
                };
            }

            /**
             * 鼠标悬浮刷画
             */
            function _brushHover(e) {
                var ctx = _ctxList['hover'];
                if (!e.onbrush //没有onbrush
                    //有onbrush并且调用执行返回false或undefined则继续粉刷
                    || (e.onbrush && !e.onbrush(ctx, e, true))
                ) {
                    // Retina 优化
                    if (zrender.catchBrushException) {
                        try {
                            shape.get(e.shape).brush(ctx, e, true, update);
                        }
                        catch(error) {
                            zrender.log(
                                error, 'hoverBrush error of ' + e.shape, e
                            );
                        }
                    }
                    else {
                        shape.get(e.shape).brush(ctx, e, true, update);
                    }
                }
            }

            /**
             * 首次绘图，创建各种dom和context
             * @param {Function=} callback 绘画结束后的回调函数
             */
            function render(callback) {
                if (isLoading()) {
                    hideLoading();
                }
                //检查_maxZlevel是否变大，如是则同步创建需要的Canvas
                _syncMaxZlevelCanvase();
                
                //清空已有内容，render默认为首次渲染
                clear();

                //升序遍历，shape上的zlevel指定绘画图层的z轴层叠
                storage.iterShape(
                    _brush({ all : true }),
                    { normal: 'up' }
                );

                //update到最新则清空标志位
                storage.clearChangedZlevel();

                if (typeof callback == 'function') {
                    callback();
                }

                return self;
            }

            /**
             * 刷新
             * @param {Function=} callback 刷新结束后的回调函数
             */
            function refresh(callback) {
                //检查_maxZlevel是否变大，如是则同步创建需要的Canvas
                _syncMaxZlevelCanvase();

                //仅更新有修改的canvas
                var changedZlevel = storage.getChangedZlevel();
                //擦除有修改的canvas
                if (changedZlevel.all){
                    clear();
                }
                else {
                    for (var k in changedZlevel) {
                        if (_ctxList[k]) {
                            clearLayer(k);
                        }
                    }
                }
                //重绘内容，升序遍历，shape上的zlevel指定绘画图层的z轴层叠
                storage.iterShape(
                    _brush(changedZlevel),
                    { normal: 'up'}
                );

                //update到最新则清空标志位
                storage.clearChangedZlevel();

                if (typeof callback == 'function') {
                    callback();
                }

                return self;
            }


            /**
             * 视图更新
             * @param {Array} shapeList 需要更新的图形元素列表
             * @param {Function} callback  视图更新后回调函数
             */
            function update(shapeList, callback) {
                var shape;
                for (var i = 0, l = shapeList.length; i < l; i++) {
                    shape = shapeList[i];
                    storage.mod(shape.id, shape);
                }
                refresh(callback);
                return self;
            }

            /**
             * 清除hover层外所有内容
             */
            function clear() {
                for (var k in _ctxList) {
                    if (k == 'hover') {
                        continue;
                    }

                    clearLayer(k);
                }
                return self;
            }

            /**
             * 清除单独的一个层
             */
            function clearLayer(k) {
                if (_zLevelConfig[k]) {
                    var haveClearColor = typeof(_zLevelConfig[k].clearColor) !== 'undefined';
                    var haveMotionBLur = _zLevelConfig[k].motionBlur;
                    var lastFrameAlpha = _zLevelConfig[k].lastFrameAlpha;
                    if (typeof(lastFrameAlpha) == 'undefined') {
                        lastFrameAlpha = 0.7;
                    }
                    if (haveMotionBLur) {
                        if (typeof(_domListBack[k]) === 'undefined') {
                            var backDom = _createDom('back-' + k, 'canvas');
                            backDom.width = _domList[k].width;
                            backDom.height = _domList[k].height;
                            backDom.style.width = _domList[k].style.width;
                            backDom.style.height = _domList[k].style.height;
                            _domListBack[k] = backDom;
                            _ctxListBack[k] = backDom.getContext('2d');
                            _devicePixelRatio != 1
                                && _ctxListBack[k].scale(
                                       _devicePixelRatio, _devicePixelRatio
                                   );
                        }
                        _ctxListBack[k].globalCompositeOperation = 'copy';
                        _ctxListBack[k].drawImage(
                            _domList[k], 0, 0,
                            _domList[k].width / _devicePixelRatio,
                            _domList[k].height / _devicePixelRatio
                        );
                    }
                    if (haveClearColor) {
                        _ctxList[k].save();
                        _ctxList[k].fillStyle = _zLevelConfig[k].clearColor;
                        _ctxList[k].fillRect(
                            0, 0,
                            _width * _devicePixelRatio, 
                            _height * _devicePixelRatio
                        );
                        _ctxList[k].restore();
                    } else {
                        _ctxList[k].clearRect(
                            0, 0, 
                            _width * _devicePixelRatio, 
                            _height * _devicePixelRatio
                        );
                    }
                    if (haveMotionBLur) {
                        var backDom = _domListBack[k];
                        var ctx = _ctxList[k];
                        ctx.save();
                        ctx.globalAlpha = lastFrameAlpha;
                        ctx.drawImage(
                            backDom, 0, 0,
                            backDom.width / _devicePixelRatio,
                            backDom.height / _devicePixelRatio
                        );
                        ctx.restore();
                    }
                } else {
                    _ctxList[k].clearRect(
                        0, 0, 
                        _width * _devicePixelRatio, 
                        _height * _devicePixelRatio
                    );
                }
            }

            /**
             * 修改指定zlevel的绘制参数
             * @return {[type]} [description]
             */
            function modLayer(zLevel, config) {
                if (config) {
                    if (typeof(_zLevelConfig[zLevel]) === 'undefined' ) {
                        _zLevelConfig[zLevel] = {};
                    }
                    util.merge(_zLevelConfig[zLevel], config, {
                        recursive : true,
                        overwrite : true
                    });
                }
            }

            /**
             * 刷新hover层
             */
            function refreshHover() {
                clearHover();

                storage.iterShape(_brushHover, { hover: true });

                storage.delHover();

                return self;
            }

            /**
             * 清除hover层所有内容
             */
            function clearHover() {
                _ctxList
                && _ctxList['hover']
                && _ctxList['hover'].clearRect(
                    0, 0, 
                    _width * _devicePixelRatio, 
                    _height * _devicePixelRatio
                );

                return self;
            }

            /**
             * 显示loading
             * @param {Object} loadingOption 选项，内容见下
             * @param {color} -.backgroundColor 背景颜色
             * @param {Object} -.textStyle 文字样式，同shape/text.style
             * @param {number=} -.progress 进度参数，部分特效有用
             * @param {Object=} -.effectOption 特效参数，部分特效有用
             * @param {string | function} -.effect 特效依赖tool/loadingEffect，
             *                                     可传入自定义特效function
             */
            function showLoading(loadingOption) {
                var effect = require('./tool/loadingEffect');
                effect.stop(_loadingTimer);

                loadingOption = loadingOption || {};
                loadingOption.effect = loadingOption.effect
                                       || config.loadingEffect;
                loadingOption.canvasSize = {
                    width : _width,
                    height : _height
                };

                _loadingTimer = effect.start(
                    loadingOption,
                    storage.addHover,
                    refreshHover
                );
                self.loading = true;

                return self;
            }

            /**
             * loading结束
             * 乱来的，待重写
             */
            function hideLoading() {
                var effect = require('./tool/loadingEffect');
                effect.stop(_loadingTimer);
                clearHover();
                self.loading = false;
                return self;
            }

            /**
             * loading结束判断
             */
            function isLoading() {
                return self.loading;
            }

            /**
             * 获取绘图区域宽度
             */
            function getWidth() {
                return _width;
            }

            /**
             * 获取绘图区域高度
             */
            function getHeight() {
                return _height;
            }

            /**
             * 区域大小变化后重绘
             */
            function resize() {
                var width;
                var height;
                var dom;

                _domRoot.style.display = 'none';

                width = _getWidth();
                height = _getHeight();

                _domRoot.style.display = '';

                //优化没有实际改变的resize
                if (_width != width || height != _height){
                    _width = width;
                    _height = height;

                    _domRoot.style.width = _width + 'px';
                    _domRoot.style.height = _height + 'px';

                    for (var i in _domList) {
                        dom = _domList[i];
                        dom.setAttribute('width', _width);
                        dom.setAttribute('height', _height);
                        dom.style.width = _width + 'px';
                        dom.style.height = _height + 'px';
                    }

                    storage.setChangedZlevle('all');
                    refresh();
                }

                return self;
            }

            /**
             * 释放
             */
            function dispose() {
                if (isLoading()) {
                    hideLoading();
                }
                root.innerHTML = '';

                root = null;
                storage = null;
                shape = null;

                _domRoot = null;
                _domList = null;
                _ctxList = null;

                _ctxListBack = null;
                _domListBack = null;

                self = null;

                return;
            }

            function getDomHover() {
                return _domList['hover'];
            }

            function toDataURL(type, backgroundColor, args) {
                if (G_vmlCanvasManager) {
                    return null;
                }
                var imageDom = _createDom('image','canvas');
                _domList['bg'].appendChild(imageDom);
                var ctx = imageDom.getContext('2d');
                _devicePixelRatio != 1 
                && ctx.scale(_devicePixelRatio, _devicePixelRatio);
                
                ctx.fillStyle = backgroundColor || '#fff';
                ctx.rect(
                    0, 0, 
                    _width * _devicePixelRatio,
                    _height * _devicePixelRatio
                );
                ctx.fill();
                
                //升序遍历，shape上的zlevel指定绘画图层的z轴层叠
                storage.iterShape(
                    function (e) {
                        if (!e.invisible) {
                            if (!e.onbrush //没有onbrush
                                //有onbrush并且调用执行返回false或undefined则继续粉刷
                                || (e.onbrush && !e.onbrush(ctx, e, false))
                            ) {
                                if (zrender.catchBrushException) {
                                    try {
                                        shape.get(e.shape).brush(
                                            ctx, e, false, update
                                        );
                                    }
                                    catch(error) {
                                        zrender.log(
                                            error,
                                            'brush error of ' + e.shape,
                                            e
                                        );
                                    }
                                }
                                else {
                                    shape.get(e.shape).brush(
                                        ctx, e, false, update
                                    );
                                }
                            }
                        }
                    },
                    { normal: 'up' }
                );
                var image = imageDom.toDataURL(type, args); 
                ctx = null;
                _domList['bg'].removeChild(imageDom);
                return image;
            }
            
            var shapeToImage = (function() {
                if (G_vmlCanvasManager) {
                    return function(){};
                }
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                var devicePixelRatio = window.devicePixelRatio || 1;
                
                return function(id, e, width, height) {
                    canvas.style.width = width + 'px';
                    canvas.style.height = height + 'px';
                    canvas.setAttribute('width', width * devicePixelRatio);
                    canvas.setAttribute('height', height * devicePixelRatio);

                    ctx.clearRect(0, 0, width * devicePixelRatio, height * devicePixelRatio);

                    var brush = shape.get(e.shape);
                    var shapeTransform = {
                        position : e.position,
                        rotation : e.rotation,
                        scale : e.scale
                    };
                    e.position = [0, 0, 0];
                    e.rotation = 0;
                    e.scale = [1, 1];
                    if (brush) {
                        brush.brush(ctx, e, false);
                    }

                    var imgShape = {
                        shape : 'image',
                        id : id,
                        style : {
                            x : 0,
                            y : 0,
                            // TODO 直接使用canvas而不是通过base64
                            image : canvas.toDataURL()
                        }
                    }

                    if (typeof(shapeTransform.position) !== 'undefined') {
                        imgShape.position = e.position = shapeTransform.position;
                    }
                    if (typeof(shapeTransform.rotation) !== 'undefined') {
                        imgShape.rotation = e.rotation = shapeTransform.rotation;
                    }
                    if (typeof(shapeTransform.scale) !== 'undefined') {
                        imgShape.scale = e.scale = shapeTransform.scale;
                    }

                    return imgShape;
                }
            })();

            self.render = render;
            self.refresh = refresh;
            self.update = update;
            self.clear = clear;
            self.modLayer = modLayer;
            self.refreshHover = refreshHover;
            self.clearHover = clearHover;
            self.showLoading = showLoading;
            self.hideLoading = hideLoading;
            self.isLoading = isLoading;
            self.getWidth = getWidth;
            self.getHeight = getHeight;
            self.resize = resize;
            self.dispose = dispose;
            self.getDomHover = getDomHover;
            self.toDataURL = toDataURL;
            self.shapeToImage = shapeToImage;

            _init();
        }

        /**
         * 控制类 (C)
         * @param {HTMLElement} root 绘图区域
         * @param {storage} storage Storage实例
         * @param {painter} painter Painter实例
         * @param {Object} shape 图形库
         *
         * 分发事件支持详见config.EVENT
         */
        function Handler(root, storage, painter, shape) {
            var config = require('./config');
            var env = require('./tool/env');
            //添加事件分发器特性
            var eventTool = require('./tool/event');
            eventTool.Dispatcher.call(this);

            var self = this;

            //常用函数加速
            var getX = eventTool.getX;
            var getY = eventTool.getY;

            //各种事件标识的私有变量
            var _event;                         //原生dom事件
            var _hasfound = false;              //是否找到hover图形元素
            var _lastHover = null;              //最后一个hover图形元素
            var _mouseDownTarget = null;
            var _draggingTarget = null;         //当前被拖拽的图形元素
            var _isMouseDown = false;
            var _isDragging = false;
            var _lastMouseDownMoment;
            var _lastTouchMoment;
            var _lastDownButton;

            var _lastX = 0;
            var _lastY = 0;
            var _mouseX = 0;
            var _mouseY = 0;


            var _domHover = painter.getDomHover();

            /**
             * 初始化，事件绑定，支持的所有事件都由如下原生事件计算得来
             */
            function _init() {
                if (window.addEventListener) {
                    window.addEventListener('resize', _resizeHandler);
                    
                    if (!env.os.tablet && !env.os.phone) {
                        // mobile的click/move/up/down自己模拟
                        root.addEventListener('click', _clickHandler);
                        root.addEventListener('mousewheel', _mouseWheelHandler);
                        root.addEventListener('mousemove', _mouseMoveHandler);
                        root.addEventListener('mousedown', _mouseDownHandler);
                        root.addEventListener('mouseup', _mouseUpHandler);
                    }
                    else {
                        // mobile支持
                        root.addEventListener('touchstart', _touchStartHandler);
                        root.addEventListener('touchmove', _touchMoveHandler);
                        root.addEventListener('touchend', _touchEndHandler);
                    } 
                    root.addEventListener('DOMMouseScroll', _mouseWheelHandler);
                    root.addEventListener('mouseout', _mouseOutHandler);
                }
                else {
                    window.attachEvent('onresize', _resizeHandler);

                    root.attachEvent('onclick', _clickHandler);
                    root.attachEvent('onmousewheel', _mouseWheelHandler);
                    root.attachEvent('onmousemove', _mouseMoveHandler);
                    root.attachEvent('onmouseout', _mouseOutHandler);
                    root.attachEvent('onmousedown', _mouseDownHandler);
                    root.attachEvent('onmouseup', _mouseUpHandler);
                }
            }

            /**
             * 窗口大小改变响应函数
             * @param {event} event dom事件对象
             */
            function _resizeHandler(event) {
                _event = event || window.event;
                _lastHover = null;
                _isMouseDown = false;
                //分发config.EVENT.RESIZE事件，global
                self.dispatch(config.EVENT.RESIZE, _event);
            }

            /**
             * 点击事件
             * @param {event} event dom事件对象
             */
            function _clickHandler(event) {
                _event = _zrenderEventFixed(event);
                //分发config.EVENT.CLICK事件
                if (!_lastHover) {
                    _dispatchAgency(_lastHover, config.EVENT.CLICK);
                }
                else if (_lastHover && _lastHover.clickable) {
                    _dispatchAgency(_lastHover, config.EVENT.CLICK);
                }
                _mouseMoveHandler(_event);
            }

            /**
             * 鼠标滚轮响应函数
             * @param {event} event dom事件对象
             */
            function _mouseWheelHandler(event) {
                _event = _zrenderEventFixed(event);
                //分发config.EVENT.MOUSEWHEEL事件
                _dispatchAgency(_lastHover, config.EVENT.MOUSEWHEEL);
                _mouseMoveHandler(_event);
            }

            /**
             * 鼠标（手指）移动响应函数
             * @param {event} event dom事件对象
             */
            function _mouseMoveHandler(event) {
                if (painter.isLoading()) {
                    return;
                }
                _event = _zrenderEventFixed(event);
                _lastX = _mouseX;
                _lastY = _mouseY;
                _mouseX = getX(_event);
                _mouseY = getY(_event);

                // 可能出现config.EVENT.DRAGSTART事件
                // 避免手抖点击误认为拖拽
                //if (_mouseX - _lastX > 1 || _mouseY - _lastY > 1) {
                    _dragStartHandler();
                //}
                _hasfound = false;
                storage.iterShape(_findHover, { normal: 'down'});

                //找到的在迭代函数里做了处理，没找到得在迭代完后处理
                if (!_hasfound) {
                    //过滤首次拖拽产生的mouseout和dragLeave
                    if (!_draggingTarget
                        || (_lastHover && _lastHover.id != _draggingTarget.id)
                    ) {
                        //可能出现config.EVENT.MOUSEOUT事件
                        _outShapeHandler();

                        //可能出现config.EVENT.DRAGLEAVE事件
                        _dragLeaveHandler();
                    }

                    _lastHover = null;
                    storage.delHover();
                    painter.clearHover();
                }
                //如果存在拖拽中元素，被拖拽的图形元素最后addHover
                if (_draggingTarget) {
                    storage.drift(
                        _draggingTarget.id,
                        _mouseX - _lastX,
                        _mouseY - _lastY
                    );
                    storage.addHover(_draggingTarget);
                }

                if (_draggingTarget || (_hasfound && _lastHover.draggable)) {
                    root.style.cursor = 'move';
                }
                else if (_hasfound && _lastHover.clickable) {
                    root.style.cursor = 'pointer';
                }
                else {
                    root.style.cursor = 'default';
                }

                //分发config.EVENT.MOUSEMOVE事件
                _dispatchAgency(_lastHover, config.EVENT.MOUSEMOVE);

                if (_draggingTarget || _hasfound || storage.hasHoverShape()) {
                    painter.refreshHover();
                }
            }

            /**
             * 鼠标（手指）离开响应函数
             * @param {event} event dom事件对象
             */
            function _mouseOutHandler(event) {
                _event = _zrenderEventFixed(event);

                var element = _event.toElement || _event.relatedTarget;
                if (element != root) {
                    while (element && element.nodeType != 9) {
                        if (element == root) {
                            // 忽略包含在root中的dom引起的mouseOut
                            _mouseMoveHandler(event);
                            return;
                        }
                        element = element.parentNode;
                    }
                }
                _event.zrenderX = _lastX;
                _event.zrenderY = _lastY;
                root.style.cursor = 'default';
                _isMouseDown = false;

                _outShapeHandler();
                _dropHandler();
                _dragEndHandler();
                if (!painter.isLoading()) {
                    painter.refreshHover();
                }
                
                self.dispatch(config.EVENT.GLOBALOUT, _event);
            }

            /**
             * 鼠标在某个图形元素上移动
             */
            function _overShapeHandler() {
                //分发config.EVENT.MOUSEOVER事件
                _dispatchAgency(_lastHover, config.EVENT.MOUSEOVER);
            }

            /**
             * 鼠标离开某个图形元素
             */
            function _outShapeHandler() {
                //分发config.EVENT.MOUSEOUT事件
                _dispatchAgency(_lastHover, config.EVENT.MOUSEOUT);
            }

            /**
             * 鼠标（手指）按下响应函数
             * @param {event} event dom事件对象
             */
            function _mouseDownHandler(event) {
                if (_lastDownButton == 2) {
                    _lastDownButton = event.button;
                    _mouseDownTarget = null;
                    // 仅作为关闭右键菜单使用
                    return;
                }
                _lastMouseDownMoment = new Date();
                _event = _zrenderEventFixed(event);
                _isMouseDown = true;
                //分发config.EVENT.MOUSEDOWN事件
                _mouseDownTarget = _lastHover;
                _dispatchAgency(_lastHover, config.EVENT.MOUSEDOWN);
                _lastDownButton = event.button;
            }

            /**
             * 鼠标（手指）抬起响应函数
             * @param {event} event dom事件对象
             */
            function _mouseUpHandler(event) {
                _event = _zrenderEventFixed(event);
                root.style.cursor = 'default';
                _isMouseDown = false;
                _mouseDownTarget = null;

                //分发config.EVENT.MOUSEUP事件
                _dispatchAgency(_lastHover, config.EVENT.MOUSEUP);
                _dropHandler();
                _dragEndHandler();
            }

            /**
             * Touch开始响应函数
             * @param {event} event dom事件对象
             */
            function _touchStartHandler(event) {
                //eventTool.stop(event);// 阻止浏览器默认事件，重要
                _event = _zrenderEventFixed(event, true);
                _lastTouchMoment = new Date();
                //平板补充一次findHover
                _mobildFindFixed();
                _mouseDownHandler(_event);
            }

            /**
             * Touch移动响应函数
             * @param {event} event dom事件对象
             */
            function _touchMoveHandler(event) {
                _event = _zrenderEventFixed(event, true);
                _mouseMoveHandler(_event);
                if (_isDragging) {
                    eventTool.stop(event);// 阻止浏览器默认事件，重要
                }
            }

            /**
             * Touch结束响应函数
             * @param {event} event dom事件对象
             */
            function _touchEndHandler(event) {
                //eventTool.stop(event);// 阻止浏览器默认事件，重要
                _event = _zrenderEventFixed(event, true);
                _mouseUpHandler(_event);

                if (new Date() - _lastTouchMoment
                    < config.EVENT.touchClickDelay
                ) {
                     _mobildFindFixed();
                    _clickHandler(_event);
                }
                painter.clearHover();
            }

            /**
             * 拖拽开始
             */
            function _dragStartHandler() {
                if (_isMouseDown
                    && _lastHover
                    && _lastHover.draggable
                    && !_draggingTarget
                    && _mouseDownTarget == _lastHover
                ) {
                    // 拖拽点击生效时长阀门，某些场景需要降低拖拽敏感度
                    if (_lastHover.dragEnableTime && 
                        new Date() - _lastMouseDownMoment < _lastHover.dragEnableTime
                    ) {
                        return;
                    }
                    _draggingTarget = _lastHover;
                    _isDragging = true;

                    _draggingTarget.invisible = true;
                    storage.mod(_draggingTarget.id,_draggingTarget);

                    //分发config.EVENT.DRAGSTART事件
                    _dispatchAgency(
                        _draggingTarget,
                        config.EVENT.DRAGSTART
                    );
                    painter.refresh();
                }
            }

            /**
             * 拖拽进入目标元素
             */
            function _dragEnterHandler() {
                if (_draggingTarget) {
                    //分发config.EVENT.DRAGENTER事件
                    _dispatchAgency(
                        _lastHover,
                        config.EVENT.DRAGENTER,
                        _draggingTarget
                    );
                }
            }

            /**
             * 拖拽在目标元素上移动
             */
            function _dragOverHandler() {
                if (_draggingTarget) {
                    //分发config.EVENT.DRAGOVER事件
                    _dispatchAgency(
                        _lastHover,
                        config.EVENT.DRAGOVER,
                        _draggingTarget
                    );
                }
            }

            /**
             * 拖拽离开目标元素
             */
            function _dragLeaveHandler() {
                if (_draggingTarget) {
                    //分发config.EVENT.DRAGLEAVE事件
                    _dispatchAgency(
                        _lastHover,
                        config.EVENT.DRAGLEAVE,
                        _draggingTarget
                    );
                }
            }

            /**
             * 拖拽在目标元素上完成
             */
            function _dropHandler() {
                if (_draggingTarget) {
                    _draggingTarget.invisible = false;
                    storage.mod(_draggingTarget.id,_draggingTarget);
                    painter.refresh();
                    //分发config.EVENT.DROP事件
                    _dispatchAgency(
                        _lastHover,
                        config.EVENT.DROP,
                        _draggingTarget
                    );
                }
            }

            /**
             * 拖拽结束
             */
            function _dragEndHandler() {
                if (_draggingTarget) {
                    //分发config.EVENT.DRAGEND事件
                    _dispatchAgency(
                        _draggingTarget,
                        config.EVENT.DRAGEND
                    );
                    _lastHover = null;
                }
                _isDragging = false;
                _draggingTarget = null;
            }

            /**
             * 事件分发代理
             * @param {Object} targetShape 目标图形元素
             * @param {string} eventName 事件名称
             * @param {Object=} draggedShape 拖拽事件特有，当前被拖拽图形元素
             */
            function _dispatchAgency(targetShape, eventName, draggedShape) {
                var eventHandler = 'on' + eventName;
                var eventPacket = {
                    type : eventName,
                    event : _event,
                    target : targetShape
                };

                if (draggedShape) {
                    eventPacket.dragged = draggedShape;
                }

                if (targetShape) {
                    //“不存在shape级事件”或“存在shape级事件但事件回调返回非true”
                    if (!targetShape[eventHandler]
                        || !targetShape[eventHandler](eventPacket)
                    ) {
                        self.dispatch(
                            eventName,
                            _event,
                            eventPacket
                        );
                    }
                }
                else if (!draggedShape) {
                    //无hover目标，无拖拽对象，原生事件分发
                    self.dispatch(eventName, _event);
                }
            }
            
            // touch有指尖错觉，四向尝试，让touch上的点击更好触发事件
            function _mobildFindFixed() {
                _lastHover = null;
                _mouseX = _event.zrenderX;
                _mouseY = _event.zrenderY;
                storage.iterShape(_findHover, { normal: 'down'});
                if (!_lastHover) {
                    _mouseX += 10;
                    storage.iterShape(_findHover, { normal: 'down'});
                }
                if (!_lastHover) {
                    _mouseX -= 20;
                    storage.iterShape(_findHover, { normal: 'down'});
                }
                if (!_lastHover) {
                    _mouseX += 10;
                    _mouseY += 10;
                    storage.iterShape(_findHover, { normal: 'down'});
                }
                if (!_lastHover) {
                    _mouseY -= 20;
                    storage.iterShape(_findHover, { normal: 'down'});
                }
                if (_lastHover) {
                    _event.zrenderX = _mouseX;
                    _event.zrenderY = _mouseY;
                }
            }

            /**
             * 迭代函数，查找hover到的图形元素并即时做些事件分发
             * @param {Object} e 图形元素
             */
            function _findHover(e) {
                if (_draggingTarget && _draggingTarget.id == e.id) {
                    //迭代到当前拖拽的图形上
                    return false;
                }

                //打酱油的路过，啥都不响应的shape~
                if (e.__silent) {
                    return false;
                }

                var shapeInstance = shape.get(e.shape);
                if (shapeInstance.isCover(e, _mouseX, _mouseY)) {
                    if (e.hoverable) {
                        storage.addHover(e);
                    }

                    if (_lastHover != e) {
                        _outShapeHandler();

                        //可能出现config.EVENT.DRAGLEAVE事件
                        _dragLeaveHandler();

                        _lastHover = e;

                        //可能出现config.EVENT.DRAGENTER事件
                        _dragEnterHandler();
                    }
                    _overShapeHandler();

                    //可能出现config.EVENT.DRAGOVER
                    _dragOverHandler();

                    _hasfound = true;

                    return true;    //找到则中断迭代查找
                }

                return false;
            }

            // 如果存在第三方嵌入的一些dom触发的事件，或touch事件，需要转换一下事件坐标
            function _zrenderEventFixed(event, isTouch) {
                if (!isTouch) {
                    _event = event || window.event;
                    // 进入对象优先~
                    var target = _event.toElement
                              || _event.relatedTarget
                              || _event.srcElement
                              || _event.target;
                    if (target && target != _domHover) {
                        _event.zrenderX = (typeof _event.offsetX != 'undefined'
                                          ? _event.offsetX
                                          : _event.layerX)
                                          + target.offsetLeft;
                        _event.zrenderY = (typeof _event.offsetY != 'undefined'
                                          ? _event.offsetY
                                          : _event.layerY)
                                          + target.offsetTop;
                    }
                }
                else {
                    _event = event;
                    var touch = _event.type != 'touchend'
                                ? _event.targetTouches[0]
                                : _event.changedTouches[0];
                    if (touch) {
                        // touch事件坐标是全屏的~
                        _event.zrenderX = touch.clientX - root.offsetLeft
                                          + document.body.scrollLeft;
                        _event.zrenderY = touch.clientY - root.offsetTop
                                          + document.body.scrollTop;
                    }
                }

                return _event;
            }

            /**
             * 自定义事件绑定
             * @param {string} eventName 事件名称，resize，hover，drag，etc~
             * @param {Function} handler 响应函数
             */
            function on(eventName, handler) {
                self.bind(eventName, handler);

                return self;
            }

            /**
             * 自定义事件解绑
             * @param {string} event 事件名称，resize，hover，drag，etc~
             * @param {Function} handler 响应函数
             */
            function un(eventName, handler) {
                self.unbind(eventName, handler);
                return self;
            }

            /**
             * 事件触发
             * @param {string} event 事件名称，resize，hover，drag，etc~
             * @param {event=} event event dom事件对象
             */
            function trigger(eventName, event) {
                switch (eventName) {
                    case config.EVENT.RESIZE :
                        _resizeHandler(event);
                        break;
                    case config.EVENT.CLICK :
                        _clickHandler(event);
                        break;
                    case config.EVENT.MOUSEWHEEL :
                        _mouseWheelHandler(event);
                        break;
                    case config.EVENT.MOUSEMOVE :
                        _mouseMoveHandler(event);
                        break;
                    case config.EVENT.MOUSEDOWN :
                        _mouseDownHandler(event);
                        break;
                    case config.EVENT.MOUSEUP :
                        _mouseUpHandleru(event);
                        break;
                    case config.EVENT.MOUSEOUT :
                        _mouseOutHandler(event);
                        break;
                }
            }

            /**
             * 释放
             */
            function dispose() {
                if (window.removeEventListener) {
                    window.removeEventListener('resize', _resizeHandler);

                    if (!env.os.tablet && !env.os.phone) {
                        // mobile的click自己模拟
                        root.removeEventListener(
                            'click', _clickHandler
                        );
                        root.removeEventListener(
                            'mousewheel', _mouseWheelHandler
                        );
                        root.removeEventListener(
                            'mousemove', _mouseMoveHandler
                        );
                        root.removeEventListener(
                            'mousedown', _mouseDownHandler
                        );
                        root.removeEventListener(
                            'mouseup', _mouseUpHandler
                        );
                    }
                    else {
                        // mobile支持
                        root.removeEventListener(
                            'touchstart', _touchStartHandler
                        );
                        root.removeEventListener(
                            'touchmove', _touchMoveHandler
                        );
                        root.removeEventListener(
                            'touchend', _touchEndHandler
                        );
                    }
                    root.removeEventListener(
                        'DOMMouseScroll', _mouseWheelHandler
                    );
                    root.removeEventListener(
                        'mouseout', _mouseOutHandler
                    );
                }
                else {
                    window.detachEvent('onresize', _resizeHandler);

                    root.detachEvent('onclick', _clickHandler);
                    root.detachEvent('onmousewheel', _mouseWheelHandler);
                    root.detachEvent('onmousemove', _mouseMoveHandler);
                    root.detachEvent('onmouseout', _mouseOutHandler);
                    root.detachEvent('onmousedown', _mouseDownHandler);
                    root.detachEvent('onmouseup', _mouseUpHandler);
                }

                root = null;
                _domHover = null;
                storage = null;
                painter  = null;
                shape = null;

                un();

                self = null;

                return;
            }

            self.on = on;
            self.un = un;
            self.trigger = trigger;
            self.dispose = dispose;

            _init();
        }

        return self;
    }
);
define('zrender', ['zrender/zrender'], function (main) { return main; });
