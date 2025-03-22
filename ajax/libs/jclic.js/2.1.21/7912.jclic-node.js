"use strict";
exports.id = 7912;
exports.ids = [7912];
exports.modules = {

/***/ 7912:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Hf: () => (/* binding */ Gradient),
/* harmony export */   KQ: () => (/* binding */ Font),
/* harmony export */   M4: () => (/* binding */ Timer),
/* harmony export */   M_: () => (/* binding */ Rectangle),
/* harmony export */   Pp: () => (/* binding */ Ellipse),
/* harmony export */   bR: () => (/* binding */ Point),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   fg: () => (/* binding */ Dimension),
/* harmony export */   kg: () => (/* binding */ PathStroke),
/* harmony export */   mc: () => (/* binding */ Container),
/* harmony export */   rc: () => (/* binding */ Action),
/* harmony export */   tc: () => (/* binding */ Stroke),
/* harmony export */   wA: () => (/* binding */ Path),
/* harmony export */   yp: () => (/* binding */ Shape)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1253);
/* harmony import */ var webfontloader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4356);
/* harmony import */ var webfontloader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(webfontloader__WEBPACK_IMPORTED_MODULE_2__);
/**
 *  File    : AWT.js
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

/* global console, window */





/**
 * Font contains properties and provides methods to manage fonts
 */
class Font {
  /**
   * Font constructor
   * @param {string} [family='Arial']
   * @param {number} [size=17]
   * @param {number} [bold=0]
   * @param {number} [italic=0]
   * @param {string} [variant='']
   */
  constructor(family, size, bold, italic, variant) {
    if (family)
      this.family = family;
    if (typeof size === 'number')
      this.size = size;
    if (bold)
      this.bold = bold;
    if (italic)
      this.italic = italic;
    if (variant)
      this.variant = variant;
    this._metrics = { ascent: -1, descent: -1, height: -1 };
  }

  /**
   * Finds the XML elements with typeface specifications, checks its value against the font
   * substitution list, replacing the `family` attribute and loading the alternative font when needed.
   * @param {external:jQuery} $tree - The xml element to be processed
   * @param {object} [options] - Optional param that can contain a `fontSubstitutions` attribute with
   * a substition table to be added to {@link module:AWT.Font.SUBSTITUTIONS SUBSTITUTIONS}
   */
  static checkTree($tree, options) {
    let substitutions = Font.SUBSTITUTIONS;
    // Load own fonts and remove it from the substitution table
    if (options && options.ownFonts) {
      options.ownFonts.forEach(name => {
        // Check WebFont as a workaround to avoid problems with a different version of `webfontloader` in agora.xtec.cat
        if (Font.ALREADY_LOADED_FONTS.indexOf(name) < 0 && (webfontloader__WEBPACK_IMPORTED_MODULE_2___default()) && (webfontloader__WEBPACK_IMPORTED_MODULE_2___default().load)) {
          webfontloader__WEBPACK_IMPORTED_MODULE_2___default().load({ custom: { families: [name] } });
          Font.ALREADY_LOADED_FONTS.push(name);
          delete substitutions[name.trim().toLowerCase()];
        }
      });
    }

    // Add custom font substitutions
    if (options && options.fontSubstitutions)
      //substitutions = Object.assign({}, substitutions, options.fontSubstitutions)
      substitutions = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(Object.create(substitutions), options.fontSubstitutions);

    if ($tree.jquery)
      $tree.find('style[family],font[family]').each((_n, style) => {
        const $style = jquery__WEBPACK_IMPORTED_MODULE_0___default()(style),
          name = $style.attr('family').trim().toLowerCase();
        if (name in substitutions) {
          const newName = substitutions[name];
          if (newName !== '') {
            Font.loadGoogleFont(newName);
            $style.attr('family', newName);
          }
        }
      });
    else {
      (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .findParentsWithChild */ .TQ)($tree, 'family').forEach(parent => {
        if (typeof parent.family === 'string') {
          const name = parent.family;
          if (Font.GOOGLEFONTS.includes(name))
            Font.loadGoogleFont(name);
          else {
            const newName = substitutions[name.trim().toLowerCase()];
            if (newName) {
              Font.loadGoogleFont(newName);
              parent.family = newName;
            }
          }
        }
      });
    }
  }

  /**
   * Try to load a specific font from [http://www.google.com/fonts]
   * @param {string} name - The font family name
   */
  // Check WebFont as a workaround to avoid problems with a different version of `webfontloader` in agora.xtec.cat
  static loadGoogleFont(name) {
    if (name && !Font.ALREADY_LOADED_FONTS.includes(name) && (webfontloader__WEBPACK_IMPORTED_MODULE_2___default()) && (webfontloader__WEBPACK_IMPORTED_MODULE_2___default().load)) {
      webfontloader__WEBPACK_IMPORTED_MODULE_2___default().load({ google: { families: [name] } });
      Font.ALREADY_LOADED_FONTS.push(name);
    }
  }

  /**
   * Try to load a set of Google fonts
   * @param {string[]} fonts - An array of font names
   */
  static loadGoogleFonts(fonts) {
    if (fonts && fonts.forEach)
      fonts.forEach(name => Font.loadGoogleFont(name));
  }

  /**
   * Reads the properties of this Font from an XML element
   * @param {external:jQuery} $xml - The xml element to be parsed
   * @returns {module:AWT.Font}
   */
  setProperties($xml) {
    if ($xml.attr('family'))
      this.family = $xml.attr('family');
    if ($xml.attr('size'))
      this.size = Number($xml.attr('size'));
    if ($xml.attr('bold'))
      this.bold = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)($xml.attr('bold'));
    if ($xml.attr('italic'))
      this.italic = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)($xml.attr('italic'));
    if ($xml.attr('variant'))
      this.variant = $xml.attr('variant');
    return this;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getAttr */ .iu)(this, ['family|Arial', 'size|17', 'bold|0', 'italic|0', 'variant']);
  }

  /**
   * Reads the properties of this Font from a data object
   * @param {object} data - The data object to be parsed
   * @returns {module:AWT.Font}
   */
  setAttributes(data) {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .setAttr */ .ob)(this, data, ['family', 'size', 'bold', 'italic', 'variant']);
  }

  /**
   * Allows to change the `size` member, recalculating the vertical metrics.
   * @param {number} size - The new size to set
   * @returns {module:AWT.Font}
   */
  setSize(size) {
    const currentSize = this.size;
    this.size = size;
    if (currentSize !== size)
      this._metrics.height = -1;
    return this;
  }

  /**
   * Increases or decreases the current font size by the specified amount
   * @param {number} amount - The amount to increase or decrease current size
   * @returns {module:AWT.Font}
   */
  zoom(amount) {
    return this.setSize(this.size + amount);
  }

  /**
   * Calculates the font metrics
   * @returns {Object} - The font metrics
   */
  getMetrics() {
    if (this._metrics.height < 0) {
      // Look for an equivalent font already calculated
      const font = Font.ALREADY_CALCULATED_FONTS.find(font => font.equals(this));
      if (font)
        Object.assign(this._metrics, font._metrics);

      if (this._metrics.height < 0) {
        this._calcHeight();
        if (this._metrics.height > 0)
          Font.ALREADY_CALCULATED_FONTS.push(this);
      }
    }
    return this._metrics;
  }

  /**
   * Calculates the font metrics and returns its height
   * @returns {number} - The font height
   */
  getHeight() {
    return this.getMetrics().height;
  }

  /**
   * Translates the Font properties into CSS statements
   * @param {object} css - The object where to add CSS properties. When null or undefined, a new
   * object will be created and returned.
   * @returns {object} - A set of CSS property-values pairs, ready to be used by JQuery
   * [.css(properties)](http://api.jquery.com/css/#css-properties).
   */
  toCss(css) {
    if (!css)
      css = {};
    css['font-family'] = this.family;
    css['font-size'] = `${this.size}px`;
    if (this.hasOwnProperty('bold'))
      css['font-weight'] = this.bold ? 'bold' : 'normal';
    if (this.hasOwnProperty('italic'))
      css['font-style'] = this.italic ? 'italic' : 'normal';
    if (this.hasOwnProperty('variant'))
      css['font-variant'] = this.variant;
    return css;
  }

  /**
   * Gets the codification of this font in a single string, suitable to be used in a `font`
   * CSS attribute.
   * @returns {string} - A string with all the CSS font properties concatenated
   */
  cssFont() {
    return `${this.italic ? 'italic ' : 'normal'} ${this.variant === '' ? 'normal' : this.variant} ${this.bold ? 'bold ' : 'normal'} ${this.size}px ${this.family}`;
  }

  /**
   * The {@link https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics TextMetrics} object used
   * by {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D CanvasRenderingContext2D}
   * does not provide a `heigth` value for rendered text.
   * This {@link http://stackoverflow.com/questions/1134586/how-can-you-find-the-height-of-text-on-an-html-canvas stackoverflow question}
   * has an excellent response by Daniel Earwicker explaining how to measure the
   * vertical dimension of rendered text using a `span` element.
   * The code has been slighty adapted to deal with Font objects.
   *
   * _Warning_: Do not call this method direcly. Use {@link module:AWT.Font#getHeight getHeight()} or {@link module:AWT.Font#getMetrics getMetrics()} instead
   *
   * @returns {module:AWT.Font}
   */
  _calcHeight() {
    const
      $text = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<span/>').html('Hg').css(this.toCss()),
      $block = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>').css({ display: 'inline-block', width: '1px', height: '0px' }),
      $div = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>').append($text, $block);

    jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').append($div);
    try {
      $block.css({ verticalAlign: 'baseline' });
      this._metrics.ascent = $block.offset().top - $text.offset().top;
      $block.css({ verticalAlign: 'bottom' });
      this._metrics.height = $block.offset().top - $text.offset().top;
      this._metrics.descent = this._metrics.height - this._metrics.ascent;
    } finally {
      $div.remove();
    }
    return this;
  }

  /**
   * Checks if two Font objects are equivalent
   * @param {module:AWT.Font} font - The Font object to compare against this one
   * @returns {boolean} - `true` if both objects are equivalent, `false` otherwise
   */
  equals(font) {
    return this.family === font.family &&
      this.size === font.size &&
      this.bold === font.bold &&
      this.italic === font.italic &&
      this.variant === font.variant;
  }
}


/**
 * Array of font objects with already calculated heights */
Font.ALREADY_CALCULATED_FONTS = [];

/**
 * Array of font names already loaded from Google Fonts, or generic names provided by browsers by default
 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/font-family */
Font.ALREADY_LOADED_FONTS = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy'];

/**
 * Google Fonts equivalent for special fonts used in some JClic projects.
 * More substitutions can be added to the list for specific projects indicating a
 * `fontSubstitutions` object in the `data-options` attribute of the HTML `div` element
 * containing the player.
 * For example:
 * `<div class ="JClic" data-project="demo.jclic" data-options='{"fontSubstitutions":{"arial":"Arimo"}}'/>`
 */
Font.SUBSTITUTIONS = {
  // Lowercase versions of JDK Logical Fonts (see: https://docs.oracle.com/javase/tutorial/2d/text/fonts.html)
  'dialog': 'sans-serif',
  'dialoginput': 'sans-serif',
  'monospaced': 'monospace',
  //'serif': 'serif',
  'sansserif': 'sans-serif',
  // Other fonts commonly used in JClic activities, mapped to similar Google Fonts
  'abc': 'Kalam',
  'a.c.m.e. secret agent': 'Permanent Marker',
  'comic sans ms': 'Patrick Hand',
  'impact': 'Oswald',
  'massallera': 'Vibur',
  'memima': 'Vibur',
  'memima_n1': 'Vibur',
  'memima_n2': 'Vibur',
  'memimas-regularalternate': 'Vibur',
  'palmemim': 'Vibur',
  'zurichcalligraphic': 'Felipa'
};
/**
 * Google Fonts currently used in substitutions
 */
Font.GOOGLEFONTS = [
  'Kalam', 'Permanent Marker', 'Patrick Hand', 'Oswald', 'Vibur', 'Felipa',
];

Object.assign(Font.prototype, {
  /**
   * The `font-family` property
   * @name module:AWT.Font#family
   * @type {string} */
  family: 'Arial',
  /**
   * The font size
   * __Warning__: Do not change `size` directly. Use {@link module:AWT.Font#setSize setSize()} instead.
   * @name module:AWT.Font#size
   * @type {number} */
  size: 17,
  /**
   * The font _bold_ value
   * @name module:AWT.Font#bold
   * @type {number} */
  bold: 0,
  /**
   * The font _italic_ value
   * @name module:AWT.Font#italic
   * @type {number} */
  italic: 0,
  /**
   * The font _variant_ value
   * @name module:AWT.Font#variant
   * @type {string}*/
  variant: '',
  /**
   * The font *_metrics* property contains the values for `ascent`, `descent` and `height`
   * attributes. Vertical font metrics are calculated in
   * {@link module:AWT.Font#_calcHeight|_calcHeight()} as needed.
   * @name module:AWT.Font#_metrics
   * @private
   * @type {{ascent: number, descent: number, height: number}} */
  _metrics: { ascent: -1, descent: -1, height: -1 },
});

/**
 * Contains parameters and methods to draw complex color gradients
 */
class Gradient {
  /**
   * Gradient constructor
   * @param {string} c1 - The initial color, in any CSS-valid form.
   * @param {string} c2 - The final color, in any CSS-valid form.
   * @param {number} [angle=0] - The inclination of the gradient relative to the horizontal line.
   * @param {number} [cycles=1] - The number of times the gradient will be repeated.
   */
  constructor(c1, c2, angle, cycles) {
    if (c1)
      this.c1 = c1;
    if (c2)
      this.c2 = c2;
    if (typeof angle === 'number')
      this.angle = angle % 360;
    if (typeof cycles === 'number')
      this.cycles = cycles;
  }

  /**
   * Reads the properties of this Gradient from an XML element
   * @param {external:jQuery} $xml - The xml element to be parsed
   * @returns {module:AWT.Gradient}
   */
  setProperties($xml) {
    this.c1 = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .checkColor */ .I4)($xml.attr('source'), 'black');
    this.c2 = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .checkColor */ .I4)($xml.attr('dest'), 'white');
    this.angle = Number($xml.attr('angle') || 0) % 360;
    this.cycles = Number($xml.attr('cycles') || 1);
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
      'c1', 'c2', 'angle|0', 'cycles|1'
    ]);
  }

  /**
   * Reads the properties of this Gradient from a data object
   * @param {object} data - The data object to be parsed
   * @returns {module:AWT.Gradient}
   */
  setAttributes(data) {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .setAttr */ .ob)(this, data, ['c1', 'c2', 'angle', 'cycles']);
  }

  /**
   * Creates a {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient|CanvasGradient}
   * based on the provided context and rectangle.
   * @param {external:CanvasRenderingContext2D} ctx - The 2D rendering context
   * @param {module:AWT.Rectangle} rect - The rectangle where this gradient will be applied to
   * @returns {module:AWT.Gradient}
   */
  getGradient(ctx, rect) {
    const
      p2 = rect.getOppositeVertex(),
      gradient = ctx.createLinearGradient(rect.pos.x, rect.pos.y, p2.x, p2.y),
      step = 1 / Math.max(this.cycles, 1);
    for (let i = 0; i <= this.cycles; i++)
      gradient.addColorStop(i * step, i % 2 ? this.c1 : this.c2);
    return gradient;
  }

  /**
   * Gets the CSS 'linear-gradient' expression of this Gradient
   * @returns {string} - A string ready to be used as a value for the `linear-gradient` CSS attribute
   */
  getCss() {
    let result = `linear-gradient(${(this.angle + 90)}deg, ${this.c1}, ${this.c2}`;
    for (let i = 1; i < this.cycles; i++)
      result = `${result}, ${i % 2 > 0 ? this.c1 : this.c2}`;
    return `${result})`;
  }

  /**
   * Checks if any of the gradient colors has transparency
   * @returns {boolean} - `true` if this gradient uses colors with transparency, `false` otherwise.
   */
  hasTransparency() {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .colorHasTransparency */ .c0)(this.c1) || (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .colorHasTransparency */ .c0)(this.c2);
  }
}

Object.assign(Gradient.prototype, {
  /**
   * Initial color
   * @name module:AWT.Gradient#c1
   * @type {string} */
  c1: 'white',
  /**
   * Final color
   * @name module:AWT.Gradient#c2
   * @type {string} */
  c2: 'black',
  /**
   * Tilt angle
   * @name module:AWT.Gradient#angle
   * @type {number} */
  angle: 0,
  /**
   * Number of repetitions of the gradient
   * @name module:AWT.Gradient#cycles
   * @type {number} */
  cycles: 1,
});

/**
 * Contains properties used to draw lines in HTML `canvas` elements.
 * @see {@link http://bucephalus.org/text/CanvasHandbook/CanvasHandbook.html#line-caps-and-joins}
 */
class Stroke {
  /**
   * Stroke constructor
   * @param {number} [lineWidth=1] - The line width of the stroke
   * @param {string} [lineCap='butt'] - The line ending type. Possible values are: `butt`, `round`
   * and `square`.
   * @param {string} [lineJoin='miter'] - The type of drawing used when two lines join. Possible
   * values are: `round`, `bevel` and `miter`.
   * @param {number} [miterLimit=10] - The ratio between the miter length and half `lineWidth`.
   */
  constructor(lineWidth, lineCap, lineJoin, miterLimit) {
    if (typeof lineWidth === 'number')
      this.lineWidth = lineWidth;
    if (lineCap)
      this.lineCap = lineCap;
    if (lineJoin)
      this.lineJoin = lineJoin;
    if (typeof miterLimit === 'number')
      this.miterLimit = miterLimit;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getAttr */ .iu)(this, [
      'lineWidth|1', 'lineCap|butt', 'lineJoin|miter', 'miterLimit|10',
    ]);
  }

  /**
   * Reads the properties of this Stroke from a data object
   * @param {object} data - The data object to be parsed
   * @returns {module:AWT.Stroke}
   */
  setAttributes(data) {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .setAttr */ .ob)(this, data, ['lineWidth', 'lineCap', 'lineJoin', 'miterLimit']);
  }

  /**
   * Sets the properties of this stroke to a CanvasRenderingContext2D
   * @param {external:CanvasRenderingContext2D} ctx - The canvas 2D rendering context
   * @returns {external:CanvasRenderingContext2D}
   */
  setStroke(ctx) {
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = this.lineCap;
    ctx.lineJoin = this.lineJoin;
    ctx.miterLimit = this.miterLimit;
    return ctx;
  }
}

Object.assign(Stroke.prototype, {
  /**
   * The line width
   * @name module:AWT.Stroke#lineWidth
   * @type {number} */
  lineWidth: 1.0,
  /**
   * The line ending type (`butt`, `round` or `square`)
   * @name module:AWT.Stroke#lineCap
   * @type {string} */
  lineCap: 'butt',
  /**
   * The drawing used when two lines join (`round`, `bevel` or `miter`)
   * @name module:AWT.Stroke#lineJoin
   * @type {string} */
  lineJoin: 'miter',
  /**
   * Ratio between the miter length and half `lineWidth`
   * @name module:AWT.Stroke#miterLimit
   * @type {number} */
  miterLimit: 10.0,
});

/**
 * Contains the `x` andy `y` coordinates of a point, and provides some useful methods.
 */
class Point {
  /**
   * Point constructor
   * @param {number|Point} x - When `x` is an `Point` object, a clone of it will be created.
   * @param {number} [y] - Not used when `x` is an `Point`
   */
  constructor(x, y) {
    if (x instanceof Point) {
      // Special case: constructor passing another point as unique parameter
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x || 0;
      this.y = y || 0;
    }
  }

  /**
   * Reads the properties of this Point from an XML element
   * @param {external:jQuery} $xml - The xml element to be parsed
   * @returns {module:AWT.Point}
   */
  setProperties($xml) {
    this.x = Number($xml.attr('x'));
    this.y = Number($xml.attr('y'));
    return this;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getAttr */ .iu)(this, ['x', 'y']);
  }

  /**
   * Reads the properties of this Point from a data object
   * @param {object} data - The data object to be parsed
   * @returns {module:AWT.Point}
   */
  setAttributes(data) {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .setAttr */ .ob)(this, data, ['x', 'y']);
  }

  /**
   * Moves this Point to a new position, by a specified displacement
   * @param {Point|Dimension} delta - The amount to move
   * @returns {module:AWT.Point}
   */
  moveBy(delta) {
    this.x += delta.x || delta.width || 0;
    this.y += delta.y || delta.height || 0;
    return this;
  }

  /**
   * Moves this Point to a new position
   * @param {number|Point} newPos - The new position, or a x coordinate
   * @param {number} [y] - `null` or `undefined` when `newPos` is a Point
   * @returns {module:AWT.Point}
   */
  moveTo(newPos, y) {
    if (typeof newPos === 'number') {
      this.x = newPos;
      this.y = y;
    } else {
      this.x = newPos.x;
      this.y = newPos.y;
    }
    return this;
  }

  /**
   * Multiplies the `x` and `y` coordinates by a specified `delta`
   * @param {Point|Dimension} delta - The amount to multiply by.
   * @returns {module:AWT.Point}
   */
  multBy(delta) {
    this.x *= delta.x || delta.width || 0;
    this.y *= delta.y || delta.height || 0;
    return this;
  }

  /**
   * Checks if two points are at the same place
   * @param {module:AWT.Point} p - The Point to check against to
   * @returns {boolean}
   */
  equals(p) {
    return this.x === p.x && this.y === p.y;
  }

  /**
   * Calculates the distance between two points
   * @param {module:AWT.Point} point - The Point to calculate the distance against to
   * @returns {number} - The distance between the two points.
   */
  distanceTo(point) {
    return Math.sqrt(Math.pow(this.x - point.x, 2), Math.pow(this.y - point.y, 2));
  }

  /**
   * Clones this point
   * @returns {module:AWT.Point}
   */
  clone() {
    return new Point(this);
  }
}

Object.assign(Point.prototype, {
  /**
   * @name module:AWT.Point#x
   * @type {number} */
  x: 0,
  /**
   * @name module:AWT.Point#y
   * @type {number} */
  y: 0,
});

/**
 * This class encapsulates `width` and `height` properties.
 */
class Dimension {
  /**
   * Dimension constructor
   * @param {number|Point} w - The width of this Dimension, or the upper-left vertex of a
   * virtual Rectangle
   * @param {number|Point} h - The height of this Dimension, or the bottom-right vertex of a
   * virtual Rectangle
   */
  constructor(w, h) {
    if (w instanceof Point && h instanceof Point) {
      this.width = h.x - w.x;
      this.height = h.y - w.y;
    } else {
      this.width = w || 0;
      this.height = h || 0;
    }
  }

  /**
   * Reads the properties of this Dimension from an XML element
   * @param {external:jQuery} $xml - The xml element to be parsed
   * @returns {module:AWT.Dimension}
   */
  setProperties($xml) {
    this.width = Number($xml.attr('width'));
    this.height = Number($xml.attr('height'));
    return this;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getAttr */ .iu)(this, ['width', 'height']);
  }

  /**
   * Reads the properties of this Dimension from a data object
   * @param {object} data - The data object to be parsed
   * @returns {module:AWT.Dimension}
   */
  setAttributes(data) {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .setAttr */ .ob)(this, data, ['width', 'height']);
  }

  /**
   * Check if two dimensions are equivalent
   * @param {module:AWT.Dimension} d
   * @returns {boolean}
   */
  equals(d) {
    return this.width === d.width && this.height === d.height;
  }

  /**
   * Multiplies the `w` and `h` co-ordinates by a specified `delta`
   * @param {Point|Dimension} delta
   * @returns {module:AWT.Dimension}
   */
  multBy(delta) {
    this.width *= delta.x || delta.width || 0;
    this.height *= delta.y || delta.height || 0;
    return this;
  }

  /**
   * Sets new values for width and height.
   * `width` can be a number or another `Dimension` object
   * @param {number|Dimension} width - The new width, or a full Dimension to copy it from.
   * @param {number} [height] - Not used when `width` is a Dimension
   * @returns {module:AWT.Dimension}
   */
  setDimension(width, height) {
    if (width instanceof Dimension) {
      height = width.height;
      width = width.width;
    }
    this.width = width;
    this.height = height;
    return this;
  }

  /**
   * Calculates the area of a Rectangle with this dimension
   * @returns {number} The resulting area
   */
  getSurface() {
    return this.width * this.height;
  }
}

Object.assign(Dimension.prototype, {
  /**
   * @name module:AWT.Dimension#width
   * @type {number} */
  width: 0,
  /**
   * @name module:AWT.Dimension#height
   * @type {number} */
  height: 0,
});

/**
 * Shape is a generic abstract class for rectangles, ellipses and stroke-free shapes.
 * @abstract
 */
class Shape {
  /**
   * Shape  constructor
   * @param {module:AWT.Point} pos - The top-left coordinates of this Shape
   */
  constructor(pos) {
    this.pos = pos || new Point();
  }

  /**
   * Shifts the shape a specified amount in horizontal and vertical directions
   * @param {Point|Dimension} delta - The amount to shift the Shape
   * @returns {module:AWT.Shape}
   */
  moveBy(delta) {
    this.pos.moveBy(delta);
    return this;
  }

  /**
   * Moves this shape to a new position
   * @param {module:AWT.Point} newPos - The new position of the shape
   * @returns {module:AWT.Shape}
   */
  moveTo(newPos) {
    this.pos.moveTo(newPos);
    return this;
  }

  /**
   * Gets the enclosing {@link module:AWT.Rectangle Rectangle} of this Shape.
   * @returns {module:AWT.Rectangle}
   */
  getBounds() {
    return new Rectangle(this.pos);
  }

  /**
   * Checks if two shapes are equivalent.
   * @param {module:AWT.Shape} p - The Shape to compare against
   * @returns {boolean}
   */
  equals(p) {
    return this.pos.equals(p.pos);
  }

  /**
   * Multiplies the dimension of the Shape by the specified `delta` amount.
   * @param {Point|Dimension} _delta - Object containing the X and Y ratio to be scaled.
   * @returns {module:AWT.Shape}
   */
  scaleBy(_delta) {
    // Nothing to scale in abstract shapes
    return this;
  }

  /**
   * Gets a clone of this shape moved to the `pos` component of the rectangle and scaled
   * by its `dim` value.
   * @param {module:AWT.Rectangle} rect - The rectangle to be taken as a base for moving and scaling
   * this shape.
   * @returns {module:AWT.Shape}
   */
  getShape(rect) {
    return this.clone().scaleBy(rect.dim).moveBy(rect.pos);
  }

  /**
   * Checks if the provided {@link module:AWT.Point} is inside this shape.
   * @param {module:AWT.Point} _p - The point to check
   * @returns {boolean}
   */
  contains(_p) {
    // Nothing to check in abstract shapes
    return false;
  }

  /**
   * Checks if the provided {@link module:AWT.Rectangle Rectangle} `r` intersects with this shape.
   * @param {module:AWT.Rectangle} _r
   * @returns {boolean}
   */
  intersects(_r) {
    // Nothing to check in abstract shapes
    return false;
  }

  /**
   * Fills the Shape with the current style in the provided HTML canvas context
   * @param {external:CanvasRenderingContext2D} ctx - The canvas 2D rendering context where to fill this shape.
   * @param {module:AWT.Rectangle} [dirtyRegion] - The context region to be updated. Used as clipping
   * region when drawing.
   * @returns {external:CanvasRenderingContext2D} - The provided rendering context
   */
  fill(ctx, dirtyRegion) {
    ctx.save();
    if (dirtyRegion && dirtyRegion.getSurface() > 0) {
      // Clip the dirty region
      ctx.beginPath();
      ctx.rect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
      ctx.clip();
    }
    // Prepare shape path and fill
    this.preparePath(ctx);
    ctx.fill();
    ctx.restore();
    return ctx;
  }

  /**
   * Draws this shape in the provided HTML canvas 2D rendering context.
   * @param {external:CanvasRenderingContext2D} ctx - The canvas 2D rendering context where to draw the shape.
   * @returns {external:CanvasRenderingContext2D} - The provided rendering context
   */
  stroke(ctx) {
    this.preparePath(ctx);
    ctx.stroke();
    return ctx;
  }

  /**
   * Prepares an HTML canvas 2D rendering context with a path that can be used to stroke a line,
   * to fill a surface or to define a clipping region.
   * @param {external:CanvasRenderingContext2D} ctx
   * @returns {external:CanvasRenderingContext2D} - The provided rendering context
   */
  preparePath(ctx) {
    // Nothing to do in abstract shapes
    return ctx;
  }

  /**
   * Creates a clipping region on the specified HTML canvas 2D rendering context
   * @param {external:CanvasRenderingContext2D} ctx - The rendering context
   * @param {string} [fillRule='nonzero'] - Can be 'nonzero' (default when not set) or 'evenodd'
   * @returns {external:CanvasRenderingContext2D} - The provided rendering context
   */
  clip(ctx, fillRule) {
    this.preparePath(ctx);
    ctx.clip(fillRule || 'nonzero');
    return ctx;
  }

  /**
   * Shorthand method for determining if a Shape is an {@link module:AWT.Rectangle Rectangle}
   * @returns {boolean}
   */
  isRect() {
    return false;
  }

  /**
   * Overwrites the original 'Object.toString' method with a more descriptive text
   * @returns {string}
   */
  toString() {
    return `Shape enclosed in ${this.getBounds().getCoords()}`;
  }

  /**
   * Reads the properties of this Shape from a data object
   * @param {object} data - The data object to be parsed
   * @returns {module:AWT.Shape}
   */
  setAttributes(data) {
    return Shape.buildShape(data);
    /*
    return setAttr(this, data, [
      'type',
      { key: 'pos', fn: Point },
    ]);
    */
  }

  /**
   * Builds a shape based on the provided `data` object.
   * Data should contain a 'type' member, specifying the type of shape requested ('rect', 'ellipse', 'rectangle' or 'path')
   * @param {object} data - Specific data for this shape
   * @returns {module:AWT.Shape}
   */
  static buildShape(data) {
    const shapeType = (data.type === 'rect' && Rectangle) || (data.type === 'ellipse' && Ellipse) || (data.type === 'path' && Path) || null;
    if (!shapeType) {
      console.log('unknown shape:', data);
    } else
      return (new shapeType()).setAttributes(data);
  }
}

Object.assign(Shape.prototype, {
  /**
   * Shape type id
   * @name module:AWT.Shape#type
   * @type {string} */
  type: 'shape',
  /**
   * The current position of the shape
   * @name module:AWT.Shape#pos
   * @type {module:AWT.Point} */
  pos: new Point(),
  /**
   * The type of shape (Rectangle, ellipse, path...)
   * @name module:AWT.Shape#type
   * @type {string} */
  type: 'shape',
});

/**
 * The rectangular {@link module:AWT.Shape} accepts five different sets of parameters:
 * @example
 * // Calling Rectangle() with different sets of parameters
 * // A Point and a Dimension:
 * new Rectangle(pos, dim)
 * // Another Rectangle, to be cloned:
 * new Rectangle(rect)
 * // Two Point objects containing the coordinates of upper-left and lower-right vertexs:
 * new Rectangle(p0, p1)
 * // An array of four numbers with the coordinates of the same vertexs:
 * new Rectangle([x0, y0, x1, y1])
 * // Four single numbers, meaning the same coordinates as above:
 * new Rectangle(x0, y0, x1, y1)
 * @extends module:AWT.Shape
 */
class Rectangle extends Shape {
  /**
   * Rectangle constructor
   * @param {Point|Rectangle|number|number[]} pos
   * @param {Dimension|number} [dim]
   * @param {number} [w]
   * @param {number} [h]
   */
  constructor(pos, dim, w, h) {
    let p = pos, d = dim;
    // Special case: constructor with a Rectangle as a unique parameter
    if (pos instanceof Rectangle) {
      d = new Dimension(pos.dim.width, pos.dim.height);
      p = new Point(pos.pos.x, pos.pos.y);
    } else if (pos instanceof Point) {
      p = new Point(pos.x, pos.y);
      if (dim instanceof Dimension)
        d = new Dimension(dim.width, dim.height);
    } else if (pos instanceof Array) {
      // Assume `pos` is an array of numbers indicating: x0, y0, x1, y1
      p = new Point(pos[0], pos[1]);
      d = new Dimension(pos[2] - pos[0], pos[3] - pos[1]);
    } else if (typeof w === 'number' && typeof h === 'number') {
      // width and height passed. Treat all parameters as co-ordinates:
      p = new Point(pos, dim);
      d = new Dimension(w, h);
    }
    super(p);

    if (d instanceof Dimension)
      this.dim = d;
    else if (d instanceof Point)
      this.dim = new Dimension(d.x - this.pos.x, d.y - this.pos.y);
    else
      this.dim = new Dimension();

    this.type = 'rect';
  }

  /**
   * Gets the enclosing {@link module:AWT.Rectangle Rectangle} of this Shape.
   * @returns {module:AWT.Rectangle}
   */
  getBounds() {
    return this;
  }

  /**
   * Sets this Rectangle the position and dimension of another one
   * @param {module:AWT.Rectangle} rect
   * @returns {module:AWT.Rectangle}
   */
  setBounds(rect) {
    if (!rect)
      rect = new Rectangle();
    this.pos.x = rect.pos.x;
    this.pos.y = rect.pos.y;
    this.dim.width = rect.dim.width;
    this.dim.height = rect.dim.height;
    return this;
  }

  /**
   * Checks if two shapes are equivalent.
   * @param {module:AWT.Shape} r - The Shape to compare against
   * @returns {boolean}
   */
  equals(r) {
    return r instanceof Rectangle && this.pos.equals(r.pos) && this.dim.equals(r.dim);
  }

  /**
   * Clones this Rectangle
   * @returns {module:AWT.Rectangle}
   */
  clone() {
    return new Rectangle(this);
  }

  /**
   * Multiplies the dimension of the Shape by the specified `delta` amount.
   * @param {Point|Dimension} delta - Object containing the X and Y ratio to be scaled.
   * @returns {module:AWT.Rectangle}
   */
  scaleBy(delta) {
    this.pos.multBy(delta);
    this.dim.multBy(delta);
    return this;
  }

  /**
   * Expands the boundaries of this shape. This affects the current position and dimension.
   * @param {number} dx - The amount to grow (or decrease) in horizontal direction
   * @param {number} dy - The amount to grow (or decrease) in vertical direction
   * @returns {module:AWT.Rectangle}
   */
  grow(dx, dy) {
    this.pos.x -= dx;
    this.pos.y -= dy;
    this.dim.width += 2 * dx;
    this.dim.height += 2 * dy;
    return this;
  }

  /**
   * Gets the {@link module:AWT.Point} corresponding to the lower-right vertex of the Rectangle.
   * @returns {module:AWT.Point}
   */
  getOppositeVertex() {
    return new Point(this.pos.x + this.dim.width, this.pos.y + this.dim.height);
  }

  /**
   * Adds the boundaries of another shape to the current one
   * @param {module:AWT.Shape} shape - The {@link module:AWT.Shape} to be added
   * @returns {module:AWT.Rectangle}
   */
  add(shape) {
    const
      myP2 = this.getOppositeVertex(),
      rectP2 = shape.getBounds().getOppositeVertex();

    this.pos.moveTo(
      Math.min(this.pos.x, shape.getBounds().pos.x),
      Math.min(this.pos.y, shape.getBounds().pos.y));
    this.dim.setDimension(
      Math.max(myP2.x, rectP2.x) - this.pos.x,
      Math.max(myP2.y, rectP2.y) - this.pos.y);
    return this;
  }

  //
  // Inherits the documentation of `contains` in Shape
  contains(p) {
    const p2 = this.getOppositeVertex();
    return p.x >= this.pos.x && p.x <= p2.x && p.y >= this.pos.y && p.y <= p2.y;
  }

  //
  // Inherits the documentation of `intersects` in Shape
  intersects(r) {
    const
      p1 = this.pos, p2 = this.getOppositeVertex(),
      r1 = r.pos, r2 = r.getOppositeVertex();
    return r2.x >= p1.x && r1.x <= p2.x && r2.y >= p1.y && r1.y <= p2.y;
  }

  //
  // Inherits the documentation of `preparePath` in Shape
  preparePath(ctx) {
    ctx.beginPath();
    ctx.rect(this.pos.x, this.pos.y, this.dim.width, this.dim.height);
    return ctx;
  }

  //
  // Inherits the documentation of `getSurface` in Shape
  getSurface() {
    return this.dim.getSurface();
  }

  //
  // Inherits the documentation of `isEmpty` in Shape
  isEmpty() {
    return this.getSurface() === 0;
  }

  //
  // Inherits the documentation of `isRect` in Shape
  isRect() {
    return true;
  }

  //
  // Inherits the documentation of `toString` in Shape
  toString() {
    return `Rectangle ${this.getCoords()}`;
  }

  /**
   * Gets a string with the co-ordinates of the upper-left and lower-right vertexs of this rectangle,
   * (with values rounded to int)
   * @returns {string}
   */
  getCoords() {
    return `[${Math.round(this.pos.x)},${Math.round(this.pos.y)},${Math.round(this.pos.x + this.dim.width)},${Math.round(this.pos.y + this.dim.height)}]`;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getAttr */ .iu)(this, ['type', 'pos', 'dim']);
  }

  /**
   * Reads the properties of this Rectangle from a data object
   * @param {object} data - The data object to be parsed
   * @returns {module:AWT.Rectangle}
   */
  setAttributes(data) {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .setAttr */ .ob)(this, data, [
      'type',
      { key: 'pos', fn: Point },
      { key: 'dim', fn: Dimension },
    ]);
  }
}

Object.assign(Rectangle.prototype, {
  /**
   * Shape type id
   * @name module:AWT.Rectangle#type
   * @type {string} */
  type: 'rect',
  /**
   * The {@link module:AWT.Dimension Dimension} of the Rectangle
   * @name module:AWT.Rectangle#dim
   * @type {module:AWT.Dimension} */
  dim: new Dimension(),
});

/**
 * The Ellipse shape has the same constructor options as {@link module:AWT.Rectangle Rectangle}
 * @extends module:AWT.Rectangle
 */
class Ellipse extends Rectangle {
  /**
   * Ellipse constructor
   * @param {Point|Rectangle|number|number[]} pos
   * @param {Dimension|number} [dim]
   * @param {number} [w]
   * @param {number} [h]
   */
  constructor(pos, dim, w, h) {
    super(pos, dim, w, h);
  }

  //
  // Inherits the documentation of `preparePath` in Rectangle
  preparePath(ctx) {

    // Using the solution 'drawEllipseWithBezier' proposed by Steve Tranby in:
    // [http://jsbin.com/sosugenegi/1/edit] as a response to:
    // [http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas]
    // Thanks Steve!!

    const kappa = 0.5522848,
      ox = kappa * this.dim.width / 2, // control point offset horizontal
      oy = kappa * this.dim.height / 2, // control point offset vertical
      xe = this.pos.x + this.dim.width, // x-end
      ye = this.pos.y + this.dim.height, // y-end
      xm = this.pos.x + this.dim.width / 2, // x-middle
      ym = this.pos.y + this.dim.height / 2; // y-middle

    ctx.beginPath();
    ctx.moveTo(this.pos.x, ym);
    ctx.bezierCurveTo(this.pos.x, ym - oy, xm - ox, this.pos.y, xm, this.pos.y);
    ctx.bezierCurveTo(xm + ox, this.pos.y, xe, ym - oy, xe, ym);
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    ctx.bezierCurveTo(xm - ox, ye, this.pos.x, ym + oy, this.pos.x, ym);
    ctx.closePath();
    return ctx;
  }

  //
  // Inherits the documentation of `contains` in Shape
  contains(p) {
    // First check if the point is inside the enclosing rectangle
    let result = super.contains(p);
    if (result) {
      const
        rx = this.dim.width / 2,
        ry = this.dim.height / 2,
        cx = this.pos.x + rx,
        cy = this.pos.y + ry;
      // Apply the general equation of an ellipse
      // See: [http://math.stackexchange.com/questions/76457/check-if-a-point-is-within-an-ellipse]
      // rx and ry are > 0 because we are inside the enclosing rect,
      // so don't care about division by zero
      result = Math.pow(p.x - cx, 2) / Math.pow(rx, 2) + Math.pow(p.y - cy, 2) / Math.pow(ry, 2) <= 1;
    }
    return result;
  }

  //
  // Inherits the documentation of `getSurface` in Rectangle
  getSurface() {
    return Math.PI * this.dim.width / 2 * this.dim.height / 2;
  }

  //
  // Inherits the documentation of `equals` in Rectangle
  equals(e) {
    return e instanceof Ellipse && super.equals(e);
  }

  //
  // Inherits the documentation of `clone` in Rectangle
  clone() {
    return new Ellipse(this.pos, this.dim);
  }

  //
  // Inherits the documentation of `isRect` in Rectangle
  isRect() {
    return false;
  }

  //
  // Inherits the documentation of `toString` in Shape
  toString() {
    return `Ellipse enclosed in ${this.getCoords()}`;
  }
}

Object.assign(Ellipse.prototype, {
  /**
   * Shape type id
   * @name module:AWT.Ellipse#type
   * @type {string} */
  type: 'ellipse',
});

/**
 * A `Path` is a {@link module:AWT.Shape} formed by a serie of strokes, represented by
 * {@link module:AWT.PathStroke} objects
 * @extends module:AWT.Shape
 */
class Path extends Shape {
  /**
   * Path constructor
   * @param {module:AWT.PathStroke[]} strokes - The array of {@link module:AWT.PathStroke} objects defining this Path.
   */
  constructor(strokes) {
    super();
    // Deep copy of the array of strokes
    if (strokes)
      this.setStrokes(strokes);
  }

  setStrokes(strokes) {
    this.strokes = [];
    // In [Shaper](Shaper.html) objects, strokes have `action` instead of `type` and `data` instead of `points`
    strokes.forEach(str => this.strokes.push(new PathStroke(str.type || str.action, str.points || str.data)));
    // Calculate the enclosing rectangle
    this.enclosing = new Rectangle();
    this.enclosingPoints = [];
    this.calcEnclosingRect();
    this.pos = this.enclosing.pos;
    return this;
  }

  //
  // Inherits the documentation of `clone` in Shape
  clone() {
    return new Path(this.strokes.map(str => str.clone()));
  }

  /**
   * Adds a {@link module:AWT.PathStroke} to `strokes`
   * @param {module:AWT.PathStroke} stroke
   */
  addStroke(stroke) {
    this.strokes.push(stroke);
    return this;
  }

  /**
   * Calculates the polygon and the rectangle that (approximately) encloses this shape
   * @returns {module:AWT.Rectangle}
   */
  calcEnclosingRect() {
    this.enclosingPoints = [];
    let last = new Point();
    this.strokes.forEach(str => {
      str.getEnclosingPoints(last).forEach(pt => {
        last = new Point(pt);
        this.enclosingPoints.push(last);
      });
    });

    let l = this.enclosingPoints.length;
    if (l > 1 && this.enclosingPoints[0].equals(this.enclosingPoints[l - 1])) {
      this.enclosingPoints.pop();
      l--;
    }
    const
      p0 = new Point(this.enclosingPoints[0]),
      p1 = new Point(this.enclosingPoints[0]);

    for (let k = 1; k < l; k++) {
      const p = this.enclosingPoints[k];
      // Check if `p` is at left or above `p0`
      p0.x = Math.min(p.x, p0.x);
      p0.y = Math.min(p.y, p0.y);
      // Check if `p` is at right or below `p1`
      p1.x = Math.max(p.x, p1.x);
      p1.y = Math.max(p.y, p1.y);
    }
    this.enclosing.setBounds(new Rectangle(p0, new Dimension(p0, p1)));
    return this.enclosing;
  }

  //
  // Inherits the documentation of `getBounds` in Shape
  getBounds() {
    return this.enclosing;
  }

  //
  // Inherits the documentation of `moveBy` in Shape
  moveBy(delta) {
    this.strokes.forEach(str => str.moveBy(delta));
    this.enclosingPoints.forEach(pt => pt.moveBy(delta));
    this.enclosing.moveBy(delta);
    return this;
  }

  //
  // Inherits the documentation of `moveTo` in Shape
  moveTo(newPos) {
    return this.moveBy(new Dimension(newPos.x - this.pos.x, newPos.y - this.pos.y));
  }

  //
  // Inherits the documentation of `equals` in Shape
  // TODO: Implement comparision of complex paths
  equals(_p) {
    return false;
  }

  //
  // Inherits the documentation of `scaleBy` in Shape
  scaleBy(delta) {
    this.strokes.forEach(str => str.multBy(delta));
    this.enclosingPoints.forEach(pt => pt.multBy(delta));
    this.enclosing.scaleBy(delta);
    return this;
  }

  //
  // Inherits the documentation of `contains` in Shape
  contains(p) {
    let result = this.enclosing.contains(p);
    if (result) {
      // Let's see if the point really lies inside the polygon formed by enclosingPoints
      // Using the "Ray casting algorithm" described in [https://en.wikipedia.org/wiki/Point_in_polygon]
      const N = this.enclosingPoints.length;
      let
        xinters = 0,
        counter = 0,
        p1 = this.enclosingPoints[0];

      for (let i = 1; i <= N; i++) {
        const p2 = this.enclosingPoints[i % N];
        if (p.y > Math.min(p1.y, p2.y)) {
          if (p.y <= Math.max(p1.y, p2.y)) {
            if (p.x <= Math.max(p1.x, p2.x)) {
              if (p1.y !== p2.y) {
                xinters = (p.y - p1.y) * (p2.x - p1.x) / (p2.y - p1.y) + p1.x;
                if (p1.x === p2.x || p.x <= xinters)
                  counter++;
              }
            }
          }
        }
        p1 = p2;
      }
      if (counter % 2 === 0)
        result = false;
    }
    return result;
  }

  //
  // Inherits the documentation of `intersects` in Shape
  // TODO: Implement a check algorithm based on the real shape
  intersects(r) {
    return this.enclosing.intersects(r);
  }

  //
  // Inherits the documentation of `preparePath` in Shape
  preparePath(ctx) {
    // TODO: Implement filling paths
    ctx.beginPath();
    this.strokes.forEach(str => str.stroke(ctx));
    return ctx;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return {
      type: this.type,
      strokes: this.strokes.map(s => s.getAttributes()).join('|'),
    };
  }

  /**
   * Reads the properties of this Path from a data object
   * @param {object} data - The data object to be parsed
   * @returns {module:AWT.Path}
   */
  setAttributes(data) {
    const strData = data.strokes.split('|');
    const strokes = strData.map(s => {
      const [type, points] = s.split(':');
      return new PathStroke(type, points ? points.split(',') : []);
    });
    return this.setStrokes(strokes);
  }
}

Object.assign(Path.prototype, {
  /**
   * Shape type id
   * @name module:AWT.Path#type
   * @type {string} */
  type: 'path',
  /**
   * The strokes forming this Path.
   * @name module:AWT.Path#strokes
   * @type {module:AWT.PathStroke[]} */
  strokes: [],
  /**
   * The {@link module:AWT.Rectangle Rectangle} enclosing this Path (when drawing, this Rectangle don't include border width!)
   * @name module:AWT.Path#enclosing
   * @type {module:AWT.Rectangle} */
  enclosing: new Rectangle(),
  /**
   * Set of vertexs of a polygon close to the real path of this shape
   * @name module:AWT.Path#enclosingPoints
   * @type {module:AWT.Point[]} */
  enclosingPoints: [],
});

/**
 * PathStroke is the basic component of {@link module:AWT.Path} objects
 */
class PathStroke {
  /**
   * PathStroke constructor
   * @param {string} type - The type of stroke. Possible values are: `M` (move to), `L` (line to),
   * `Q` (quadratic to), `B` (bezier to) and `X` (close path).
   * @param {module:AWT.Point[]} points - The array of {@link module:AWT.Point} objects used in this Stroke.
   */
  constructor(type, points) {
    this.type = type;
    // Points are deep cloned, to avoid change the original values
    if (points && points.length > 0) {
      // Check if 'points' is an array of objects of type 'Point'
      if (points[0] instanceof Point)
        this.points = points.map(p => new Point(p));
      // otherwise assume that 'points' contains just numbers
      // to be readed in pairs of x and y co-ordinates
      else {
        this.points = [];
        for (let i = 0; i < points.length; i += 2)
          this.points.push(new Point(points[i], points[i + 1]));
      }
    }
  }

  /**
   * Calculates some of the points included in a quadratic Bézier curve
   * The number of points being calculated is defined in Utils.settings.BEZIER_POINTS
   * @see {@link https://en.wikipedia.org/wiki/B%C3%A9zier_curve}
   * @see {@link https://www.jasondavies.com/animated-bezier/}
   *
   * @param {module:AWT.Point} p0 - Starting point of the quadratic Bézier curve
   * @param {module:AWT.Point} p1 - Control point
   * @param {module:AWT.Point} p2 - Ending point
   * @param {number} [numPoints] - The number of intermediate points to calculate. When not defined,
   * the value will be obtained from {@link module:Utils.settings.BEZIER_POINTS}.
   * @returns {module:AWT.Point[]} - Array with some intermediate points from the resulting Bézier curve
   */
  static getQuadraticPoints(p0, p1, p2, numPoints) {
    if (!numPoints)
      numPoints = _Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.BEZIER_POINTS;
    const
      result = [],
      pxa = new Point(),
      pxb = new Point();
    for (let i = 0; i < numPoints; i++) {
      const n = (i + 1) / (numPoints + 1);
      pxa.x = p0.x + (p1.x - p0.x) * n;
      pxa.y = p0.y - (p0.y - p1.y) * n;
      pxb.x = p1.x + (p2.x - p1.x) * n;
      pxb.y = p1.y + (p2.y - p1.y) * n;
      result.push(new Point(pxa.x + (pxb.x - pxa.x) * n, pxa.y - (pxa.y - pxb.y) * n));
    }
    return result;
  }

  /**
   * Calculates some of the points included in a cubic Bézier (curve with two control points)
   * The number of points being calculated is defined in Utils.settings.BEZIER_POINTS
   * @param {module:AWT.Point} p0 - Starting point of the cubic Bézier curve
   * @param {module:AWT.Point} p1 - First control point
   * @param {module:AWT.Point} p2 - Second control point
   * @param {module:AWT.Point} p3 - Ending point
   * @param {number} [numPoints] - The number of intermediate points to calculate. When not defined,
   * the value will be obtained from {@link module:Utils.settings.BEZIER_POINTS}.
   * @returns {module:AWT.Point[]} - Array with some intermediate points from the resulting Bézier curve
   */
  static getCubicPoints(p0, p1, p2, p3, numPoints) {
    const result = [];
    if (!numPoints)
      numPoints = _Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.BEZIER_POINTS;
    const pr = PathStroke.getQuadraticPoints(p0, p1, p2, numPoints);
    const pq = PathStroke.getQuadraticPoints(p1, p2, p3, numPoints);
    for (let i = 0; i < numPoints; i++) {
      const n = (i + 1) / (numPoints + 1);
      result.push(new Point(pr[i].x + (pq[i].x - pr[i].x) * n, pr[i].y - (pr[0].y - pq[0].y) * n));
    }
    return result;
  }

  /**
   * Clones this PathStroke
   * @returns {module:AWT.PathStroke}
   */
  clone() {
    // The constructors of PathStroke always make a deep copy of the `points` array
    return new PathStroke(this.type, this.points);
  }

  /**
   * Increments or decrements by `delta` the x and y coordinates of all points
   * @param {Point|Dimension} delta - The amount to add to the `x` and `y`
   * coordinates of each point.
   */
  moveBy(delta) {
    if (this.points)
      this.points.forEach(pt => pt.moveBy(delta));
    return this;
  }

  /**
   * Multiplies each point coordinates by the `x` and `y` (or `w` and `h`) values of the
   * passed {@link module:AWT.Point} or {@link module:AWT.Dimension Dimension}.
   * @param {Point|Dimension} delta
   */
  multBy(delta) {
    if (this.points)
      this.points.forEach(pt => pt.multBy(delta));
    return this;
  }

  /**
   * Draws this PathStroke in the provided HTML canvas context
   * @param {external:CanvasRenderingContext2D} ctx - The HTML canvas 2D rendering context
   */
  stroke(ctx) {
    switch (this.type) {
      case 'M':
        ctx.moveTo(this.points[0].x, this.points[0].y);
        break;
      case 'L':
        ctx.lineTo(this.points[0].x, this.points[0].y);
        break;
      case 'Q':
        ctx.quadraticCurveTo(
          this.points[0].x, this.points[0].y,
          this.points[1].x, this.points[1].y);
        break;
      case 'B':
        ctx.bezierCurveTo(
          this.points[0].x, this.points[0].y,
          this.points[1].x, this.points[1].y,
          this.points[2].x, this.points[2].y);
        break;
      case 'X':
        ctx.closePath();
        break;
    }
    return ctx;
  }

  /**
   * Gets the set of points that will be included as a vertexs on the owner's shape
   * enclosing polygon.
   * @param {module:AWT.Point} from - The starting point for this stroke
   * @returns {module:AWT.Point[]}
   */
  getEnclosingPoints(from) {
    let result = [];
    switch (this.type) {
      case 'M':
      case 'L':
        result.push(this.points[0]);
        break;
      case 'Q':
        result = PathStroke.getQuadraticPoints(from, this.points[0], this.points[1]);
        result.push(this.points[1]);
        break;
      case 'B':
        result = PathStroke.getCubicPoints(from, this.points[0], this.points[1], this.points[2]);
        result.push(this.points[2]);
        break;
    }
    return result;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return `${this.type}:${this.points ? this.points.map(p => `${(0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__.fx)(p.x)},${(0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__.fx)(p.y)}`).join(',') : ''}`;
  }
}

Object.assign(PathStroke.prototype, {
  /**
   * The Stroke type. Possible values are: `M` (move to), `L` (line to), `Q` (quadratic to),
   * `B` (bezier to) and `X` (close path).
   * @name module:AWT.PathStroke#type
   * @type {string} */
  type: 'X',
  /**
   * The array of points used by this stroke. Can be `null`.
   * @name module:AWT.PathStroke#points
   * @type {module:AWT.Point[]} */
  points: null,
});

/**
 * This class encapsulates actions that can be linked to buttons, menus and other active objects
 */
class Action {
  /**
   * Action constructor
   * @param {string} name - The name of this Action
   * @param {function} actionPerformed - The callback to be triggered by this Action
   */
  constructor(name, actionPerformed) {
    this.name = name;
    this.actionPerformed = actionPerformed;
    this._statusListeners = [];
  }

  /**
   * Here is where subclasses must define the callback to be triggered when
   * this Action object is called
   * @param {module:AWT.Action} _thisAction - Pointer to this Action object
   * @param {object} _event - The original action event that has originated this action
   */
  actionPerformed(_thisAction, _event) {
    return this;
  }

  /**
   * This is the method to be passed to DOM event triggers
   * @example
   * const myFunc = () => { alert('Hello!') }
   * const myAction = new Action('hello', myFunc)
   * $( "#foo" ).bind( "click", myAction.processEvent)
   * @param {object} event - The event object passed by the DOM event trigger
   */
  processEvent(event) {
    return this.actionPerformed(this, event);
  }

  /**
   * Adds a status listener
   * @param {function} listener - The callback method to be called when the status of this
   * Action changes
   */
  addStatusListener(listener) {
    this._statusListeners.push(listener);
  }

  /**
   * Removes a previously registered status listener
   * @param {function} listener - The listener to be removed
   */
  removeStatusListener(listener) {
    this._statusListeners = this._statusListeners.map(l => l !== listener);
  }

  /**
   * Enables or disables this action
   * @param {boolean} enabled
   */
  setEnabled(enabled) {
    this.enabled = enabled;
    this._statusListeners.forEach(listener => listener.call(this, this));
    return this;
  }
}

Object.assign(Action.prototype, {
  /**
   * The action's name
   * @name module:AWT.Action#name
   * @type {string} */
  name: null,
  /**
   * An optional description
   * @name module:AWT.Action#description
   * @type {string} */
  description: null,
  /**
   * Action status. `true` means enabled, `false` disabled
   * @name module:AWT.Action#enabled
   * @type {boolean} */
  enabled: false,
  /**
   * Array of callback functions to be triggered when the `enabled` flag changes
   * @name module:AWT.Action#_statusListeners
   * @private
   * @type {function[]} */
  _statusListeners: null,
});

/**
 * This class provides a timer that will launch a function at specific intervals
 */
class Timer {
  /**
   * Timer constructor
   * @param {function} actionPerformed - The function to be triggered when the timer is enabled.
   * @param {number} interval - The interval between action calls, specified in milliseconds.
   * @param {boolean} [enabled=false] - Flag to indicate if the timer will be initially enabled.
   */
  constructor(actionPerformed, interval, enabled) {
    this.actionPerformed = actionPerformed;
    this.interval = interval;
    this.setEnabled(enabled === true);
  }

  /**
   * Here is where subclasses must define the function to be performed when this timer ticks.
   * @param {module:AWT.Timer} _thisTimer
   */
  actionPerformed(_thisTimer) {
    return this;
  }

  /**
   * This is the method called by `window.setInterval`
   * @param {external:Event} _event
   */
  processTimer(_event) {
    this.ticks++;
    if (!this.repeats)
      this.stop();
    return this.actionPerformed.call(this);
  }

  /**
   * Enables or disables this timer
   * @param {boolean} enabled - Indicates if the timer should be enabled or disabled
   * @param {boolean} [retainCounter=false] - When `true`, the ticks counter will not be cleared
   */
  setEnabled(enabled, retainCounter) {
    if (!retainCounter)
      this.ticks = 0;
    if (enabled && this.timer !== null) {
      // Timer already running
      return;
    }

    if (enabled) {
      this.timer = window.setInterval(() => this.processTimer(null), this.interval);
    } else {
      if (this.timer !== null) {
        window.clearInterval(this.timer);
        this.timer = null;
      }
    }
    return this;
  }

  /**
   * Checks if this timer is running
   * @returns {boolean}
   */
  isRunning() {
    return this.timer !== null;
  }

  /**
   * Starts this timer
   * @param {boolean} [retainCounter=false] - When `true`, the ticks counter will not be cleared
   */
  start(retainCounter) {
    return this.setEnabled(true, retainCounter);
  }

  /**
   * Stops this timer
   * @param {boolean} [retainCounter=false] - When `true`, the ticks counter will not be cleared
   */
  stop(retainCounter) {
    return this.setEnabled(false, retainCounter);
  }
}

Object.assign(Timer.prototype, {
  /**
   * The timer interval, in milliseconds
   * @name module:AWT.Timer#interval
   * @type {number} */
  interval: 0,
  /**
   * The ticks counter
   * @name module:AWT.Timer#ticks
   * @type {number} */
  ticks: 0,
  /**
   * The object returned by `window.setInterval`
   * @name module:AWT.Timer#timer
   * @type {object} */
  timer: null,
  /**
   * When `true`, the timer should repeat until `stop` is called
   * @name module:AWT.Timer#repeats
   * @type {boolean} */
  repeats: true,
});

/**
 * Logic object that takes care of an "invalidated" rectangle that will be repainted
 * at the next update of a 2D object, usually an HTML Canvas.
 * Container has the same constructor options as {@link module:AWT.Rectangle Rectangle}
 * @extends module:AWT.Rectangle
 */
class Container extends Rectangle {
  /**
   * Container constructor
   * @param {Point|Rectangle|number|number[]} pos
   * @param {Dimension|number} [dim]
   * @param {number} [w]
   * @param {number} [h]
   */
  constructor(pos, dim, w, h) {
    super(pos, dim, w, h);
  }

  /**
   * Adds the provided rectangle to the invalidated area.
   * @param {module:AWT.Rectangle} rect
   */
  invalidate(rect) {
    if (rect) {
      if (this.invalidatedRect === null)
        this.invalidatedRect = rect.clone();
      else
        this.invalidatedRect.add(rect);
    } else
      this.invalidatedRect = null;
    return this;
  }

  /**
   * Updates the invalidated area
   */
  update() {
    this.updateContent(this.invalidatedRect);
    this.invalidatedRect = null;
    return this;
  }

  /**
   * Containers should implement this method to update its graphic contents. It should
   * be called from {@link module:AWT.Container#update}
   * @param {module:AWT.Shape} _dirtyRegion - Specifies the area to be updated. When `null`, it's the whole
   * Container.
   */
  updateContent(_dirtyRegion) {
    // To be overrided by subclasses. Here does nothing.
    return this;
  }
}

Object.assign(Container.prototype, {
  /**
   * The currently "invalidated" area
   * @name module:AWT.Container#invalidatedRect
   * @type {module:AWT.Rectangle} */
  invalidatedRect: null,
});

/**
 * This object contains utility clases for painting graphics and images,
 * as found in the Java [Abstract Window Toolkit](http://docs.oracle.com/javase/7/docs/api/java/awt/package-summary.html)
 *
 * The objects defined here are: {@link module:AWT.Font Font}, {@link module:AWT.Gradient Gradient}, {@link module:AWT.Stroke Stroke},
 * {@link module:AWT.Point Point}, {@link module:AWT.Dimension Dimension}, {@link module:AWT.Shape Shape}, {@link module:AWT.Rectangle Rectangle},
 * {@link module:AWT.Ellipse Ellipse}, {@link module:AWT.Path Path}, {@link module:AWT.PathStroke PathStroke}, {@link module:AWT.Action Action},
 * {@link module:AWT.Timer Timer} and {@link module:AWT.Container Container}.
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  Font,
  Gradient,
  Stroke,
  Point,
  Dimension,
  Shape,
  Rectangle,
  Ellipse,
  Path,
  PathStroke,
  Action,
  Timer,
  Container
});


/***/ })

};
;
//# sourceMappingURL=7912.jclic-node.js.map