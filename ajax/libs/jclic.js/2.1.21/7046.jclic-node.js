"use strict";
exports.id = 7046;
exports.ids = [7046,698,8276];
exports.modules = {

/***/ 7046:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export ClassicJigSaw */
/* harmony import */ var _Shaper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8276);
/* harmony import */ var _JigSaw_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(698);
/* harmony import */ var _AWT_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7912);
/**
 *  File    : shapers/ClassicJigSaw.js
 *  Created : 25/05/2015
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
 * This is the classic {@link module:shapers/JigSaw.JigSaw JigSaw} {@link module:shapers/Shaper.Shaper Shaper} used in puzzle toys, where teeth and slots
 * are shaped by Bézier curves.
 * @extends module:shapers/JigSaw.JigSaw
 */
class ClassicJigSaw extends _JigSaw_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * ClassicJigSaw constructor
   * @param {number} nx - Number of columns
   * @param {number} ny - Number of rows
   */
  constructor(nx, ny) {
    super(nx, ny);
  }

  /**
   * Overrides {@link module:shapers/JigSaw.JigSaw#hLine}
   * @override
   * @param {module:AWT.Path} sd - The Path to which the line will be added
   * @param {number} type - Type  of tooth: 0 is flat (no tooth), 1 means tooth up, and 2 means tooth down
   * @param {number} x - X coordinate of the starting point
   * @param {number} y - Y coordinate of the starting point
   * @param {number} w - Width of the piece
   * @param {number} h - Height of the piece
   * @param {boolean} inv - The line must be drawn right to left
   */
  hLine(sd, type, x, y, w, h, inv) {
    const
      kx = inv ? -1 : 1,
      ky = type === 1 ? 1 : -1;

    if (type === 0)
      // Flat line
      sd.addStroke(new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .PathStroke */ .kg('L', [x + w * kx, y]));
    else {
      const
        x0 = x + (w - w * this.baseWidthFactor) / 2 * kx,
        wb = w * (this.baseWidthFactor / 12) * kx;

      // Approximation to the tooth:
      sd.addStroke(new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .PathStroke */ .kg('L', [x0, y]));
      // This is the tooth:
      const hb = h * this.toothHeightFactor * ky / 8;
      sd.addStroke(new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .PathStroke */ .kg('B', [x0 + 4 * wb, y, x0 + 6 * wb, y - hb, x0 + 4 * wb, y - 3 * hb]));
      sd.addStroke(new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .PathStroke */ .kg('B', [x0 + 2 * wb, y - 5 * hb, x0 + 10 * wb, y - 5 * hb, x0 + 8 * wb, y - 3 * hb]));
      sd.addStroke(new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .PathStroke */ .kg('B', [x0 + 6 * wb, y - 1 * hb, x0 + 8 * wb, y, x0 + 12 * wb, y]));
      // Draw the remaining line
      sd.addStroke(new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .PathStroke */ .kg('L', [x + w * kx, y]));
    }
  }

  /**
   * Overrides {@link module:shapers/JigSaw.JigSaw#vLine}
   * @override
   * @param {module:AWT.Path} sd - The Path to which the line will be added
   * @param {number} type - Type  of tooth: 0 is flat (no tooth), 1 means tooth right, and 2 means tooth left
   * @param {number} x - X coordinate of the starting point
   * @param {number} y - Y coordinate of the starting point
   * @param {number} w - Width of the piece
   * @param {number} h - Height of the piece
   * @param {boolean} inv - The line must be drawn bottom to top
   */
  vLine(sd, type, x, y, w, h, inv) {
    const
      ky = inv ? -1 : 1,
      kx = type === 1 ? 1 : -1;

    if (type === 0)
      // Flat line
      sd.addStroke(new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .PathStroke */ .kg('L', [x, y + h * ky]));
    else {
      const
        y0 = y + (h - h * this.baseWidthFactor) / 2 * ky,
        hb = h * this.baseWidthFactor / 12 * ky;

      // Approximation to the tooth:
      sd.addStroke(new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .PathStroke */ .kg('L', [x, y0]));
      // This is the tooth:
      const wb = w * this.toothHeightFactor * kx / 8;
      sd.addStroke(new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .PathStroke */ .kg('B', [x, y0 + 4 * hb, x - wb, y0 + 6 * hb, x - 3 * wb, y0 + 4 * hb]));
      sd.addStroke(new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .PathStroke */ .kg('B', [x - 5 * wb, y0 + 2 * hb, x - 5 * wb, y0 + 10 * hb, x - 3 * wb, y0 + 8 * hb]));
      sd.addStroke(new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .PathStroke */ .kg('B', [x - 1 * wb, y0 + 6 * hb, x, y0 + 8 * hb, x, y0 + 12 * hb]));
      // Draw the remaining line
      sd.addStroke(new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .PathStroke */ .kg('L', [x, y + h * ky]));
    }
  }
}

Object.assign(ClassicJigSaw.prototype, {
  /**
   * ClassicJigSaw needs a biggest base width
   * @name module:shapers/ClassicJigSaw.ClassicJigSaw#baseWidthFactor
   * @type {number} */
  baseWidthFactor: 3.0 / 4,
  /**
   * ClassicJigSaw needs a biggest base height factor
   * @name module:shapers/ClassicJigSaw.ClassicJigSaw#toothHeightFactor
   * @type {number} */
  toothHeightFactor: 3.0 / 5,
});

// Register this class in the list of known shapers
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Shaper_js__WEBPACK_IMPORTED_MODULE_0__["default"].registerClass('@ClassicJigSaw', ClassicJigSaw));


/***/ }),

/***/ 698:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export JigSaw */
/* harmony import */ var _Shaper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8276);
/* harmony import */ var _AWT_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7912);
/**
 *  File    : shapers/JigSaw.js
 *  Created : 01/04/2015
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
 *
 * This {@link module:shapers/Shaper.Shaper Shaper} returns a set of rectangular shapes with teeth and slots that fit between them.
 * @extends module:shapers/Shaper.Shaper
 */
class JigSaw extends _Shaper_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * JigSaw constructor
   * @param {number} nx - Number of columns
   * @param {number} ny - Number of rows
   */
  constructor(nx, ny) {
    super(nx, ny);
  }

  /**
   * Builds the jigsaw shapes based on the number of rows and columns
   * @override
   */
  buildShapes() {
    // Create two two-dimension arrays for storing the type of horizontal and vertical lines
    let hLineType = [], vLineType = [];
    for (let i = 0; i <= this.nRows; i++) {
      hLineType[i] = [];
      vLineType[i] = [];
    }

    for (let row = 0; row < this.nRows; row++) {
      for (let col = 0; col < this.nCols; col++) {
        hLineType[row][col] = row === 0 ? 0 : 1 + (this.randomLines ? Math.round(Math.random() * 9) : row + col) % 2;
        vLineType[row][col] = col === 0 ? 0 : 1 + (this.randomLines ? Math.round(Math.random() * 9) : col + row + 1) % 2;
        if (col === this.nCols - 1)
          vLineType[row][col + 1] = 0;
        if (row === this.nRows - 1)
          hLineType[row + 1][col] = 0;
      }
    }

    const w = 1 / this.nCols, h = 1 / this.nRows;
    for (let r = 0; r < this.nRows; r++) {
      for (let c = 0; c < this.nCols; c++) {
        const x = w * c;
        const y = h * r;
        const sd = new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .Path */ .wA([new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .PathStroke */ .kg('M', [x, y])]);
        this.hLine(sd, hLineType[r][c], x + 0, y + 0, w, h, false);
        this.vLine(sd, vLineType[r][c + 1], x + w, y + 0, w, h, false);
        this.hLine(sd, hLineType[r + 1][c], x + w, y + h, w, h, true);
        this.vLine(sd, vLineType[r][c], x + 0, y + h, w, h, true);
        sd.addStroke(new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .PathStroke */ .kg('X'));
        sd.calcEnclosingRect();
        // Save the Path in `shapeData`
        this.shapeData[r * this.nCols + c] = sd;
      }
    }
    this.initiated = true;
  }

  /**
   * Adds an horizontal line to the provided path
   * @param {module:AWT.Path} sd - The Path to which the line will be added
   * @param {number} type - Type  of tooth: 0 is flat (no tooth), 1 means tooth up, and 2 means tooth down
   * @param {number} x - X coordinate of the starting point
   * @param {number} y - Y coordinate of the starting point
   * @param {number} w - Width of the piece
   * @param {number} h - Height of the piece
   * @param {boolean} inv - The line must be drawn right to left
   */
  hLine(sd, type, x, y, w, h, inv) {
    const
      kx = inv ? -1 : 1,
      ky = type === 1 ? 1 : -1;

    if (type === 0)
      // Flat line
      sd.addStroke(new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .PathStroke */ .kg('L', [x + w * kx, y]));
    else {
      const x0 = x + (w - w * this.baseWidthFactor) / 2 * kx;
      const wb = w * this.baseWidthFactor * kx;
      // Approximation to the tooth:
      sd.addStroke(new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .PathStroke */ .kg('L', [x0, y]));
      // The tooth:
      const hb = h * this.toothHeightFactor * ky;
      sd.addStroke(new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .PathStroke */ .kg('L', [x0, y + hb]));
      sd.addStroke(new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .PathStroke */ .kg('L', [x0 + wb, y + hb]));
      sd.addStroke(new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .PathStroke */ .kg('L', [x0 + wb, y]));
      // Draw the remaining of the line
      sd.addStroke(new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .PathStroke */ .kg('L', [x + w * kx, y]));
    }
  }

  /**
   *
   * Adds a vertical line to the provided path
   * @param {module:AWT.Path} sd - The Path to which the line will be added
   * @param {number} type - Type  of tooth: 0 is flat (no tooth), 1 means tooth right, and 2 means tooth left
   * @param {number} x - X coordinate of the starting point
   * @param {number} y - Y coordinate of the starting point
   * @param {number} w - Width of the piece
   * @param {number} h - Height of the piece
   * @param {boolean} inv - The line must be drawn bottom to top
   */
  vLine(sd, type, x, y, w, h, inv) {
    const
      ky = inv ? -1 : 1,
      kx = type === 1 ? 1 : -1;

    if (type === 0) {
      // Flat line
      sd.addStroke(new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .PathStroke */ .kg('L', [x, y + h * ky]));
    } else {
      const y0 = y + (h - h * this.baseWidthFactor) / 2 * ky;
      const hb = h * this.baseWidthFactor * ky;
      // Approximation to the tooth:
      sd.addStroke(new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .PathStroke */ .kg('L', [x, y0]));
      // The tooth:
      const wb = w * this.toothHeightFactor * kx;
      sd.addStroke(new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .PathStroke */ .kg('L', [x + wb, y0]));
      sd.addStroke(new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .PathStroke */ .kg('L', [x + wb, y0 + hb]));
      sd.addStroke(new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .PathStroke */ .kg('L', [x, y0 + hb]));
      // Draw the remaining line
      sd.addStroke(new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .PathStroke */ .kg('L', [x, y + h * ky]));
    }
  }
}

// Register this class in the list of known shapers
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Shaper_js__WEBPACK_IMPORTED_MODULE_0__["default"].registerClass('@JigSaw', JigSaw));


/***/ }),

/***/ 8276:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export Shaper */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1253);
/* harmony import */ var _AWT_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7912);
/**
 *  File    : shapers/Shaper.js
 *  Created : 13/04/2015
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
 * The function of this class and its subclasses is to draw a set of "shapes" that will be used to
 * place {@link module:boxes/ActiveBox.ActiveBox ActiveBox} objects at a specific position, and to determine its dimension and
 * appearance.
 */
class Shaper {
  /**
   * Shaper constructor
   * @param {number} nx - Number of columns (in grid-based shapers)
   * @param {number} ny - Number of rows (in grid-based shapers)
   */
  constructor(nx, ny) {
    this.reset(nx, ny);
  }

  /**
   * Registers a new type of shaper
   * @param {string} shaperName - The name used to identify this shaper
   * @param {function} shaperClass - The shaper class, usually extending Shaper
   * @returns {module:shapers/Shaper.Shaper} - The provided shaper class
   */
  static registerClass(shaperName, shaperClass) {
    Shaper.CLASSES[shaperName] = shaperClass;
    return shaperClass;
  }

  /**
   * Factory constructor that returns a Shaper of the requested class.
   * @param {string} className - The class name of the requested Shaper.
   * @param {number} nx - Number of columns (in grid-based shapers)
   * @param {number} ny - Number of rows (in grid-based shapers)
   * @returns {module:shapers/Shaper.Shaper}
   */
  static getShaper(className, nx, ny) {
    const cl = Shaper.CLASSES[(className || '').replace(/^edu\.xtec\.jclic\.shapers\./, '@')];
    if (!cl)
      (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .log */ .Rm)('error', `Unknown shaper: ${className}`);
    return cl ? new cl(nx, ny) : null;
  }

  /**
   * Initializes this Shaper to default values
   * @param {number} nCols - Number of columns
   * @param {number} nRows - Number of rows
   */
  reset(nCols, nRows) {
    this.nCols = nCols;
    this.nRows = nRows;
    this.nCells = nRows * nCols;
    this.initiated = false;
    this.shapeData = [];
    for (let i = 0; i < this.nCells; i++)
      this.shapeData[i] = new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Shape */ .yp();
  }

  /**
   * Loads this shaper settings from a specific JQuery XML element
   * @param {external:jQuery} $xml - The XML element with the shaper data
   */
  setProperties($xml) {
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .attrForEach */ .GM)($xml.get(0).attributes, (name, value) => {
      switch (name) {
        case 'class':
          this.className = value;
          break;
        case 'cols':
          this.nCols = Number(value);
          break;
        case 'rows':
          this.nRows = Number(value);
          break;
        case 'baseWidthFactor':
        case 'toothHeightFactor':
        case 'scaleX':
        case 'scaleY':
          this[name] = Number(value);
          break;
        case 'randomLines':
        case 'showEnclosure':
          this[name] = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)(value, true);
          break;
      }
    });

    // Reads the 'enclosing'
    // (main shape area where the other shape elements are placed)
    $xml.children('enclosing:first').each((_n, child) => {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(child).children('shape:first').each((_n, child2) => {
        let sh = Shaper.readShapeData(child2, this.scaleX, this.scaleY);
        this.enclosing = sh;
        this.showEnclosure = true;
        this.hasRemainder = true;
      });
    });

    // Read the shape elements
    $xml.children('shape').each((n, child) => {
      this.shapeData[n] = Shaper.readShapeData(child, this.scaleX, this.scaleY);
    });

    // Correction needed for '@Holes' shaper
    if (this.shapeData.length > 0 /* && this.shapeData.length !== this.nRows * this.nCols */) {
      //this.nRows = this.shapeData.length
      //this.nCols = 1
      //this.nCells = this.nCols * this.nRows
      this.nCells = this.shapeData.length;
    }
    return this;
  }

  /**
   * Reads an individual shape from an XML element.
   * Shapes are arrays of `stroke` objects.
   * Each `stroke` has an `action` (_move to_, _line to_, _quad to_...) and associated `data`.
   * @param {external:jQuery} $xml - The XML element with the shape data
   * @param {number} scaleX
   * @param {number} scaleY
   * @returns {module:AWT.Shape}
   */
  static readShapeData(xml, scaleX, scaleY) {
    const shd = [];
    let result = null;
    jquery__WEBPACK_IMPORTED_MODULE_0___default().each(xml.textContent.split('|'), (_n, txt) => {
      const sd = txt.split(':');
      // Possible strokes are: `rectangle`, `ellipse`, `M`, `L`, `Q`, `B`, `X`
      // Also possible, but not currently used in JClic: `roundRectangle` and `pie`
      let data = sd.length > 1 ? sd[1].split(',') : null;
      //
      // Data should be always divided by the scale (X or Y)
      if (data)
        data = data.map((d, n) => d / (n % 2 ? scaleY : scaleX));

      switch (sd[0]) {
        case 'rectangle':
          result = new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Rectangle */ .M_(data[0], data[1], data[2], data[3]);
          break;
        case 'ellipse':
          result = new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Ellipse */ .Pp(data[0], data[1], data[2], data[3]);
          break;
        default:
          // It's an `AWT.PathStroke`
          shd.push(new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .PathStroke */ .kg(sd[0], data));
          break;
      }
    });

    return !result && shd.length > 0 ? new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Path */ .wA(shd) : result;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    const fields = [
      'className', 'nCols', 'nRows',
      'baseWidthFactor', 'toothHeightFactor',
      'scaleX', 'scaleY',
      'randomLines',
    ];

    if (this.customShapes) {
      ['showEnclosure', 'hasRemainder',
        'enclosing', 'shapeData', // Array of AWT.Rectangle, AWT.Ellipse or (AWT.Path -> AWT.PathStroke)
      ].forEach(f => fields.push(f));
    }

    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getAttr */ .iu)(this, fields);
  }

  /**
   * Builds a new shaper, based on the properties specified in a data object
   * @param {object} data - The data object to be parsed
   * @returns {module:shapers/Shaper.Shaper}
   */
  static factory(data) {
    const result = Shaper.getShaper(data.className, data.nCols, data.nRows);
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .setAttr */ .ob)(result, data, [
      'className', 'nCols', 'nRows',
      'baseWidthFactor', 'toothHeightFactor',
      'scaleX', 'scaleY',
      'randomLines',
      'showEnclosure', 'hasRemainder',
      { key: 'enclosing', fn: _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Shape */ .yp },
      { key: 'shapeData', fn: _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Shape */ .yp, group: 'array' },
    ]);

    result.nCells = result.shapeData.length || result.nCols * result.nRows;

    return result;
  }

  /**
   * Builds the individual shapes that will form this Shaper
   */
  buildShapes() {
  }

  /**
   * Gets a clone of the nth Shape object, scaled and located inside a Rectangle
   * @param {number} n
   * @param {module:AWT.Rectangle} rect
   * @returns {module:AWT.Shape}
   */
  getShape(n, rect) {
    if (!this.initiated)
      this.buildShapes();
    if (n >= this.nCells || this.shapeData[n] === null)
      return null;
    return this.shapeData[n].getShape(rect);
  }

  /**
   * Gets the nth Shape data object
   * @param {number} n
   * @returns {object}
   */
  getShapeData(n) {
    return n >= 0 && n < this.shapeData.length ? this.shapeData[n] : null;
  }

  /**
   * Gets the AWT.Rectangle that contains all shapes of this Shaper.
   * @returns {module:AWT.Rectangle}
   */
  getEnclosingShapeData() {
    return new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Rectangle */ .M_(0, 0, 1, 1);
  }

  /**
   * When `hasRemainder` is true, this method gets the rectangle containing the full surface where
   * the Shaper develops.
   * @param {module:AWT.Rectangle} rect - The frame where to move and scale all the shapes
   * @returns {module:AWT.Rectangle}
   */
  getRemainderShape(rect) {
    if (!this.hasRemainder)
      return null;

    if (!this.initiated)
      this.buildShapes();

    const sh = this.getEnclosingShapeData();
    const r = sh ? sh.getShape(rect) : new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Rectangle */ .M_();
    for (let i = 0; i < this.nCells; i++) {
      if (this.shapeData[i])
        r.add(this.shapeData[i].getShape(rect), false);
    }
    return r;
  }
}

Object.assign(Shaper.prototype, {
  /**
   * This shaper class name
   * @name module:shapers/Shaper.Shaper#className
   * @type {string} */
  className: 'Shaper',
  /**
   * Number of columns (useful in grid-based shapers)
   * @name module:shapers/Shaper.Shaper#nCols
   * @type {number} */
  nCols: 0,
  /**
   * Number of rows (useful in grid-based shapers)
   * @name module:shapers/Shaper.Shaper#nRows
   * @type {number} */
  nRows: 0,
  /**
   * Number of cells managed by this shaper
   * @name module:shapers/Shaper.Shaper#nCells
   * @type {number} */
  nCells: 0,
  /**
   * Contains the specific definition of each shape
   * @name module:shapers/Shaper.Shaper#shapeData
   * @type {object} */
  shapeData: null,
  /**
   * Flag used to check if the `Shaper` has been initialized against a real surface
   * @name module:shapers/Shaper.Shaper#initiated
   * @type {boolean} */
  initiated: false,
  //
  // Fields used only in JigSaw shapers
  /**
   * In {@link module:shapers/JigSaw.JigSaw JigSaw}, ratio between the base width of the tooth and the total length of the side.
   * @name module:shapers/Shaper.Shaper#baseWidthFactor
   * @type {number} */
  baseWidthFactor: 1.0 / 3,
  /**
   * In {@link module:shapers/JigSaw.JigSaw JigSaw}, ratio between the tooth height and the total length of the side.
   * @name module:shapers/Shaper.Shaper#toothHeightFactor
   * @type {number} */
  toothHeightFactor: 1.0 / 6,
  /**
   * In {@link module:shapers/JigSaw.JigSaw JigSaw}, whether the tooths take random directions or not
   * @name module:shapers/Shaper.Shaper#randomLines
   * @type {boolean} */
  randomLines: false,
  //
  // Fields used only in the `Holes` shaper
  /**
   * In {@link module:shapers/Holes.Holes Holes}, scale to be applied to horizontal positions and lengths to achieve the real
   * value of the shape placed on a real surface.
   * @name module:shapers/Shaper.Shaper#scaleX
   * @type {number} */
  scaleX: 1.0,
  /**
   * In {@link module:shapers/Holes.Holes Holes}, scale to be applied to vertical positions and lengths to achieve the real
   * value of the shape placed on a real surface.
   * @name module:shapers/Shaper.Shaper#scaleY
   * @type {number} */
  scaleY: 1.0,
  /**
   * In {@link module:shapers/Holes.Holes Holes}, the enclosing area where all shapes are placed.
   * @name module:shapers/Shaper.Shaper#enclosing
   * @type {module:AWT.Shape} */
  enclosing: null,
  /**
   * In {@link module:shapers/Holes.Holes Holes}, when `true`, the enclosing area will be drawn
   * @name module:shapers/Shaper.Shaper#showEnclosure
   * @type {boolean} */
  showEnclosure: false,
  /**
   * Flag indicating if this shaper organizes its cells in rows and columns
   * @name module:shapers/Shaper.Shaper#rectangularShapes
   * @type {boolean} */
  rectangularShapes: false,
  /**
   * Flag indicating if this Shaper deploys over a surface biggest than the rectangle enclosing
   * all its shapes
   * @name module:shapers/Shaper.Shaper#hasRemainder
   * @type {boolean} */
  hasRemainder: false,
  /**
   * Only the `Holes` shaper has this flag activated
   * @name module:shapers/Shaper.Shaper#customShapes
   * @type {boolean} */
  customShapes: false,
});

/**
 * List of known classes derived from Shaper. It should be filled by real shaper classes at
 * declaration time.
 * @type {object} */
Shaper.CLASSES = {};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Shaper);


/***/ })

};
;
//# sourceMappingURL=7046.jclic-node.js.map