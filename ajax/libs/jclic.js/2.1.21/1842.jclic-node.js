"use strict";
exports.id = 1842;
exports.ids = [1842,3018];
exports.modules = {

/***/ 3018:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export BoxBase */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1253);
/* harmony import */ var _AWT_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7912);
/**
 *  File    : boxes/BoxBase.js
 *  Created : 12/04/2015
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  JClic.js
 *  An HTML5 player of JClic activities
 *  https://projectestac.github.io/jclic.js
 *
 *  @source https://github.com/projectestac/jclic.js
 *
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2000-2020 Catalan Educational Telematic Network (XTEC)
 *
 *  Licensed under the EUPL, Version 1.1 or -as soon they will be approved by
 *  the European Commission- subsequent versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the Licence.
 *
 *  You may obtain a copy of the Licence at:
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  Licence for the specific language governing permissions and limitations
 *  under the Licence.
 *  @licend
 *  @module
 */





const defaultValues = _Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.BoxBase;

/**
 * This class contains all the main visual attributes needed to draw {@link module:boxes/AbstractBox.AbstractBox AbstractBox} objects:
 * background and foreground colors, gradients, colors for special states (inactive, alternative,
 * disabled...), margins, fonts, border strokes, etc.
 *
 * Objects derived from {@link module:boxes/AbstractBox.AbstractBox AbstractBox} can have inheritance: boxes that act as "containers"
 * of other boxes (like {@link module:boxes/BoxBag.BoxBag BoxBag}). Most of the attributes of `BoxBase` can be `null`,
 * meaning that the value of the ancestor -or the default value if the box has no ancestors- must
 * be used.
 */
class BoxBase {
  /**
   * BoxBase constructor
   * @param {module:boxes/BoxBase.BoxBase} [parent] - Another BoxBase object used to determine the value of properties not
   * locally set.
   */
  constructor(parent) {
    this.parent = parent || null;
  }

  /**
   * Loads the BoxBase settings from a specific JQuery XML element
   * @param {external:jQuery} $xml - The XML element to parse
   */
  setProperties($xml) {
    //
    // Read attributes
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .attrForEach */ .GM)($xml.get(0).attributes, (name, val) => {
      switch (name) {
        case 'shadow':
        case 'transparent':
          this[name] = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)(val, false);
          break;
        case 'margin':
          this[name] = Number(val);
          break;
        case 'borderStroke':
          this.borderStroke = new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Stroke */ .tc(Number(val));
          break;
        case 'markerStroke':
          this.markerStroke = new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Stroke */ .tc(Number(val));
          break;
      }
    });
    //
    // Read inner elements
    $xml.children().each((_n, child) => {
      const $node = jquery__WEBPACK_IMPORTED_MODULE_0___default()(child);
      switch (child.nodeName) {
        case 'font':
          this.font = (new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Font */ .KQ()).setProperties($node);
          break;

        case 'gradient':
          this.bgGradient = new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Gradient */ .Hf().setProperties($node);
          break;

        case 'color':
          this.textColor = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .checkColor */ .I4)($node.attr('foreground'), this.textColor);
          this.backColor = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .checkColor */ .I4)($node.attr('background'), this.backColor);
          this.shadowColor = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .checkColor */ .I4)($node.attr('shadow'), this.shadowColor);
          this.inactiveColor = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .checkColor */ .I4)($node.attr('inactive'), this.inactiveColor);
          this.alternativeColor = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .checkColor */ .I4)($node.attr('alternative'), this.alternativeColor);
          this.borderColor = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .checkColor */ .I4)($node.attr('border'), this.borderColor);
          break;
      }
    });
    return this;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getAttr */ .iu)(this, [
      'shadow', 'transparent', 'margin',
      'borderStroke', 'markerStroke', // AWT.Stroke
      'font', // AWT.Font
      'bgGradient', // AWT.Gradient
      `textColor|${BoxBase.prototype.textColor}`,
      `backColor|${BoxBase.prototype.backColor}`,
      `shadowColor|${BoxBase.prototype.shadowColor}`,
      `inactiveColor|${BoxBase.prototype.inactiveColor}`,
      `alternativeColor|${BoxBase.prototype.alternativeColor}`,
      `borderColor|${BoxBase.prototype.borderColor}`,
    ]);
  }

  /**
   * Reads the properties of this BoxBase from a data object
   * @param {object} data - The data object to be parsed
   * @returns {module:boxes/BoxBase.BoxBase}
   */
  setAttributes(data) {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .setAttr */ .ob)(this, data, [
      'shadow', 'transparent', 'margin',
      { key: 'borderStroke', fn: _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Stroke */ .tc },
      { key: 'markerStroke', fn: _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Stroke */ .tc },
      { key: 'font', fn: _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Font */ .KQ },
      { key: 'bgGradient', fn: _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Gradient */ .Hf },
      'textColor',
      'backColor',
      'shadowColor',
      'inactiveColor',
      'alternativeColor',
      'borderColor',
    ]);
  }

  /**
   * Gets the value of the specified property, scanning down to parents and prototype if not defined.
   * @param {string} property - The property to retrieve
   * @returns {any} - The object or value associated to this property
   */
  get(property) {
    if (this.hasOwnProperty(property) || this.parent === null)
      return this[property];
    else
      return this.parent.get(property);
  }

  /**
   * Sets the value of a specific property.
   * @param {string} property - The property name.
   * @param {any} value - Depends on the type of property
   */
  set(property, value) {
    this[property] = value;
    return this;
  }

  /**
   * Gets the value of the specified property, scanning down to parents if not defined, and returning
   * always an own property (not from prototype)
   * @param {string} property - The property to retrieve
   * @returns {any} - The object or value associated to this property
   */
  getOwn(property) {
    if (this.hasOwnProperty(property))
      return this[property];
    else if (this.parent !== null)
      return this.parent.getOwn(property);
    else {
      if (typeof this[property] === 'object')
        this[property] = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .cloneObject */ .h2)(BoxBase.prototype[property]);
      else
        this[property] = BoxBase.prototype[property];
    }
    return this[property];
  }

  /**
   * Gets the properties defined in this BoxBase as a collection of CSS attributes
   * @param {object} [css] - An optional set of initial CSS properties
   * @param {boolean} [inactive=false] - When `true`, get CSS attributes for an inactive cell
   * @param {boolean} [inverse=false] - When `true`, get CSS attributes for an inverse cell
   * @param {boolean} [alternative=false] - When `true`, get CSS attributes for an alternative cell
   * @returns {object}
   */
  getCSS(css, inactive = false, inverse = false, alternative = false) {
    // (css will be created by [AWT.Font.toCss](AWT.html) if null or undefined)
    const font = this.get('font');
    css = font.toCss(css);

    css['color'] = inverse ? this.get('backColor')
      : alternative ? this.get('alternativeColor')
        : this.get('textColor');

    const transparent = this.get('transparent');
    css['background-color'] = transparent ? 'transparent'
      : inactive ? this.get('inactiveColor')
        : inverse ? this.get('textColor') : this.get('backColor');

    const bgGradient = this.get('bgGradient');
    if (bgGradient && !transparent)
      css['background-image'] = bgGradient.getCss();

    if (this.shadow === 1) {
      const delta = Math.max(1, Math.round(font.size / 10));
      const color = this.get('shadowColor');
      css['text-shadow'] = `${delta}px ${delta}px 3px ${color}`;
    }
    return css;
  }

  /**
   * This utility method computes the width and height of text lines rendered on an HTML
   * __canvas__ element, reducing the font size of the BoxBase as needed when they exceed the maximum
   * width and/or height.
   * @param {external:CanvasRenderingContext2D} ctx - The canvas rendering context used to draw the text.
   * @param {string} text - The text to drawn.
   * @param {number} maxWidth - Maximum width
   * @param {number} maxHeight - Maximum height
   * @returns {object[]} - An array of objects representing lines of text. Each object has a `text`
   * member with the text displayed in the line, and a `size` member with the line {@link module:AWT.Dimension}
   */
  prepareText(ctx, text, maxWidth, maxHeight) {
    const
      result = [],
      font = this.get('font'),
      height = font.getHeight();
    let totalHeight = 0;

    // divide the text in lines
    const lines = text.trim().split('\n');
    ctx.font = font.cssFont();
    for (let l = 0; l < lines.length; l++) {
      let line = lines[l].trim();
      let width = ctx.measureText(line).width;
      if (width > maxWidth) {
        // retain the last string offset that was inside maxWidth
        let
          lastOK = 0,
          lastOKWidth = 0;
        for (let p = 0; p < line.length; p++) {
          // Find next separator
          if ((0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .isSeparator */ .k$)(line[p])) {
            const w = ctx.measureText(line.substring(0, p).trim()).width;
            if (w > maxWidth)
              break;
            lastOK = p;
            lastOKWidth = w;
          }
        }
        if (lastOK > 0) {
          // Add a new line with the tail of the line
          lines.splice(l + 1, 0, line.substring(lastOK + 1).trim());
          // Adjust the current line
          line = lines[l] = line.substring(0, lastOK).trim();
          width = lastOKWidth;
        }
        else {
          // No solution found. Try resizing down the font.
          if (font.size > defaultValues.MIN_FONT_SIZE) {
            this.getOwn('font').zoom(-1);
            return this.prepareText(ctx, text, maxWidth, maxHeight);
          }
        }
      }

      // Add the line and the calculated dimension to `result`
      result.push({
        text: line,
        size: new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Dimension */ .fg(width, height)
      });

      totalHeight += height;

      if (totalHeight > maxHeight && font.size > defaultValues.MIN_FONT_SIZE) {
        // Max height exceeded. Try resizing down the font
        this.getOwn('font').zoom(-1);
        return this.prepareText(ctx, text, maxWidth, maxHeight);
      }
    }
    return result;
  }
}

Object.assign(BoxBase.prototype, {
  /**
   * The parent BoxBase object
   * @name module:boxes/BoxBase.BoxBase#parent
   * @type {module:boxes/BoxBase.BoxBase} */
  parent: null,
  /**
   * Default values
   * @name module:boxes/BoxBase.BoxBase#defaultValues
   * @type {object} */
  default: defaultValues,
  /**
   * Font size can be dynamically reduced to fit the available space if any element using this
   * `BoxBase` requests it. When this happen, this field contains the real font currently used
   * to draw text.
   * @name module:boxes/BoxBase.BoxBase#font
   * @type {module:AWT.Font} */
  font: new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Font */ .KQ(),
  /**
   * The current font size of this BoxBase. Can be dynamically adjusted when drawing.
   * @name module:boxes/BoxBase.BoxBase#dynFontSize
   * @type {number} */
  dynFontSize: 0,
  /**
   * Counts the number of times the `dynFontSize` has been reset. This is useful to avoid excessive
   * recursive loops searching the optimal font size.
   * @name module:boxes/BoxBase.BoxBase#resetFontCounter
   * @type {number} */
  resetFontCounter: 0,
  /**
   * The background color
   * @name module:boxes/BoxBase.BoxBase#backColor
   * @type {string} */
  backColor: defaultValues.BACK_COLOR,
  /**
   * The background gradient. Default is `null`.
   * @name module:boxes/BoxBase.BoxBase#bgGradient
   * @type {module:AWT.Gradient} */
  bgGradient: null,
  /**
   * The color used to write text.
   * @name module:boxes/BoxBase.BoxBase#textColor
   * @type {string} */
  textColor: defaultValues.TEXT_COLOR,
  /**
   * The color used to draw a shadow below regular text.
   * @name module:boxes/BoxBase.BoxBase#shadowColor
   * @type {string} */
  shadowColor: defaultValues.SHADOW_COLOR,
  /**
   * The color of the border.
   * @name module:boxes/BoxBase.BoxBase#borderColor
   * @type {string} */
  borderColor: defaultValues.BORDER_COLOR,
  /**
   * The color used to draw text when a cell is in `inactive` state.
   * @name module:boxes/BoxBase.BoxBase#inactiveColor
   * @type {string} */
  inactiveColor: defaultValues.INACTIVE_COLOR,
  /**
   * The color used to draw text when a cell is in `alternative` state.
   * @name module:boxes/BoxBase.BoxBase#alternativeColor
   * @type {string} */
  alternativeColor: defaultValues.ALTERNATIVE_COLOR,
  /**
   * Whether the text should have a shadow or not
   * @name module:boxes/BoxBase.BoxBase#shadow
   * @type {boolean} */
  shadow: false,
  /**
   * Whether the cell's background (and its hosted component, if any) should be transparent
   * @name module:boxes/BoxBase.BoxBase#transparent
   * @type {boolean} */
  transparent: false,
  /**
   * Wheter the cell's background should be painted or not. This property has no effect on
   * hosted components.
   * @name module:boxes/BoxBase.BoxBase#dontFill
   * @type {boolean} */
  dontFill: false,
  /**
   * The margin to respect between text elements and the limits of the cell or other elements.
   * @name module:boxes/BoxBase.BoxBase#textMargin
   * @type {number} */
  textMargin: defaultValues.AC_MARGIN,
  /**
   * The stroke used to draw the border.
   * @name module:boxes/BoxBase.BoxBase#borderStroke
   * @type {module:AWT.Stroke} */
  borderStroke: new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Stroke */ .tc(defaultValues.BORDER_STROKE_WIDTH),
  /**
   * The stroke used to draw a border around marked cells.
   * @name module:boxes/BoxBase.BoxBase#markerStroke
   * @type {module:AWT.Stroke} */
  markerStroke: new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Stroke */ .tc(defaultValues.MARKER_STROKE_WIDTH),
});

BoxBase.DEFAULT_BOX_BASE = new BoxBase();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BoxBase);


/***/ }),

/***/ 1842:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export TextGridContent */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1253);
/* harmony import */ var _BoxBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3018);
/**
 *  File    : boxes/TextGridContent.js
 *  Created : 14/04/2015
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  JClic.js
 *  An HTML5 player of JClic activities
 *  https://projectestac.github.io/jclic.js
 *
 *  @source https://github.com/projectestac/jclic.js
 *
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2000-2020 Educational Telematic Network of Catalonia (XTEC)
 *
 *  Licensed under the EUPL, Version 1.1 or -as soon they will be approved by
 *  the European Commission- subsequent versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the Licence.
 *
 *  You may obtain a copy of the Licence at:
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  Licence for the specific language governing permissions and limitations
 *  under the Licence.
 *  @licend
 *  @module
 */





/**
 * This class encapsulates the content of {@link module:boxes/TextGrid.TextGrid TextGrid} objects.
 *
 * It implements methods to set and retrieve individual characters on the grid, and parsing of
 * XML objects. It also contains information about the optimal size and other graphic properties
 * (fonts, colors, etc.) of the grid.
 */
class TextGridContent {
  /**
   * TextGridContent constructor
   */
  constructor() {
    this.style = new _BoxBase_js__WEBPACK_IMPORTED_MODULE_2__["default"](null);
    this.text = [];
  }

  /**
   * Loads the object settings from a specific JQuery XML element
   * @param {external:jQuery} $xml
   */
  setProperties($xml) {
    // Read attributes
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .attrForEach */ .GM)($xml.get(0).attributes, (name, val) => {
      switch (name) {
        case 'rows':
          // WARNING: Due to a bug in JClic, the meaning of "rows" and "columns" must be
          // interchanged:
          this.ncw = Number(val);
          break;
        case 'columns':
          this.nch = Number(val);
          break;
        case 'cellWidth':
          this.w = Number(val);
          break;
        case 'cellHeight':
          this.h = Number(val);
          break;
        case 'border':
          this.border = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)(val);
          break;
        case 'wild':
        case 'randomChars':
          this[name] = val;
          break;
      }
    });

    // Read inner elements
    $xml.children('style:first').each((_n, child) => {
      this.style = new _BoxBase_js__WEBPACK_IMPORTED_MODULE_2__["default"]().setProperties(jquery__WEBPACK_IMPORTED_MODULE_0___default()(child));
    });

    $xml.find('text:first > row').each((_n, el) => this.text.push(el.textContent));

    for (let i = this.text.length; i < this.nch; i++)
      this.text[i] = '';

    return this;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getAttr */ .iu)(this, [
      'ncw', 'nch',
      'w', 'h',
      'text',
      'style', // BoxBase
      'border',
      'wild|*',
      `randomChars|${_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.RANDOM_CHARS}`,
    ]);
  }

  /**
   * Reads the properties of this TextGridContent from a data object
   * @param {object|string} data - The data object to be parsed, or just the text content
   * @returns {module:boxes/TextGridContent.TextGridContent}
   */
  setAttributes(data) {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .setAttr */ .ob)(this, data, [
      'ncw', 'nch',
      'w', 'h',
      'text',
      { key: 'style', fn: _BoxBase_js__WEBPACK_IMPORTED_MODULE_2__["default"] },
      'border',
      'wild',
      `randomChars`,
    ]);
  }

  /**
   * Counts the number of wildcard characters present in this TextGrid
   * @returns {number}
   */
  countWildChars() {
    let result = 0;
    if (this.text)
      for (let y = 0; y < this.nch; y++)
        for (let x = 0; x < this.ncw; x++)
          if (this.text[y].charAt(x) === this.wild)
            result++;
    return result;
  }

  /**
   * Counts the total number of characters, including wildcard characters.
   * @returns {number}
   */
  getNumChars() {
    return this.ncw * this.nch;
  }

  /**
   * Sets the specified character as a content of the cell located at specific coordinates
   * @param {number} x - The X coordinate of the cell
   * @param {number} y - The X coordinate of the cell
   * @param {string} ch - The character to be placed on the specified cell
   */
  setCharAt(x, y, ch) {
    if (x >= 0 && x < this.ncw && y >= 0 && y < this.nch)
      this.text[y] = this.text[y].substring(0, x) + ch + this.text[y].substring(x + 1);
  }
}

Object.assign(TextGridContent.prototype, {
  /**
   * Grid columns
   * @name module:boxes/TextGridContent.TextGridContent#ncw
   * @type {number} */
  ncw: 1,
  /**
   * Grid rows
   * @name module:boxes/TextGridContent.TextGridContent#nch
   * @type {number} */
  nch: 1,
  /**
   * Width of cells
   * @name module:boxes/TextGridContent.TextGridContent#w
   * @type {number} */
  w: 20,
  /**
   * Height of cells
   * @name module:boxes/TextGridContent.TextGridContent#h
   * @type {number} */
  h: 20,
  /**
   * Whether the cells must be surrounded by a border or not
   * @name module:boxes/TextGridContent.TextGridContent#border
   * @type {boolean} */
  border: false,
  /**
   * The {@link module:boxes/BoxBase.BoxBase BoxBase} object with visual settings of the text grid
   * @name module:boxes/TextGridContent.TextGridContent#style
   * @type {module:boxes/BoxBase.BoxBase} */
  style: null,
  /**
   * An array of String objects textning the chars of cells. One string per row, one character of
   * this string per cell.
   * @name module:boxes/TextGridContent.TextGridContent#text
   * @type {string[]} */
  text: null,
  /**
   * The letter used as wildcardtext
   * @name module:boxes/TextGridContent.TextGridContent#wild
   * @type {string} */
  wild: '*',
  /**
   * A String with the chars to take as source when randomly filling empty cells
   * @name module:boxes/TextGridContent.TextGridContent#randomChars
   * @type {string} */
  randomChars: _Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.RANDOM_CHARS,
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextGridContent);


/***/ })

};
;
//# sourceMappingURL=1842.jclic-node.js.map