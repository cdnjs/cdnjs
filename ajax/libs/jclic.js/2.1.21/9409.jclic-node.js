"use strict";
exports.id = 9409;
exports.ids = [9409,8276];
exports.modules = {

/***/ 9409:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export ActiveBagContent */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BoxBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3018);
/* harmony import */ var _ActiveBoxContent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9072);
/* harmony import */ var _shapers_Shaper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8276);
/* harmony import */ var _AWT_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7912);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1253);
/**
 *  File    : boxes/ActiveBagContent.js
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
 * This class packs a collection of {@link module:boxes/ActiveBoxContent.ActiveBoxContent ActiveBoxContent} objects and provides methods to access
 * and manage it. The two main members of `ActiveBagContent` are the {@link module:shapers/Shaper.Shaper Shaper}, responsible for
 * determining the position and shape of each {@link module:boxes/ActiveBox.ActiveBox ActiveBox}, and the {@link module:boxes/BoxBase.BoxBase BoxBase} (field `style`),
 * provider of a common visual style.
 */
class ActiveBagContent {
  /**
   * ActiveBagContent constructor
   * @param {string} [id] - An optional text tag identifying this ActiveBagContent
   * @param {number} ncw - In grid-based distributions, number of columns.
   * @param {number} nch - In grid-based distributions, number of rows.
   */
  constructor(id, ncw, nch) {
    if (id)
      this.id = id;
    this.cells = [];
    this.ncw = Math.max(1, ncw);
    this.nch = Math.max(1, nch);
  }

  /**
   * Loads the object settings from a specific JQuery XML element
   * @param {external:jQuery} $xml - The XML element to parse
   * @param {module:bags/MediaBag.MediaBag} mediaBag - The project's MediaBag
   */
  setProperties($xml, mediaBag) {
    let bug = false;
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_5__/* .attrForEach */ .GM)($xml.get(0).attributes, (name, val) => {
      switch (name) {
        case 'id':
          this.id = val;
          break;
        case 'image':
          this.image = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_5__/* .nSlash */ .c4)(val);
          break;
        // Bug in JClic beta 1: "columns" is number of rows, and "rows" is number of columns.
        // Was corrected in beta 2: If "cols" is specified, "rows" are rows and "cols" are columns.
        case 'rows':
          this.nch = Number(val);
          break;
        case 'columns':
          bug = true;
        /* falls through */
        case 'cols':
          this.ncw = Number(val);
          break;
        case 'cellWidth':
          this.w = Number(val);
          break;
        case 'cellHeight':
          this.h = Number(val);
          break;
        case 'border':
          this.border = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_5__/* .getBoolean */ .pW)(val);
          break;
      }
    });

    if (bug) {
      let n = this.ncw;
      this.ncw = this.nch;
      this.nch = n;
    }

    $xml.children().each((_n, child) => {
      const $node = jquery__WEBPACK_IMPORTED_MODULE_0___default()(child);
      switch (child.nodeName) {
        case 'style':
          this.style = new _BoxBase_js__WEBPACK_IMPORTED_MODULE_1__["default"](null).setProperties($node);
          break;
        case 'shaper':
          const shaperClassName = $node.attr('class'),
            nCols = Math.max(1, $node.attr('cols')),
            nRows = Math.max(1, $node.attr('rows'));
          this.shaper = _shapers_Shaper_js__WEBPACK_IMPORTED_MODULE_3__["default"].getShaper(shaperClassName, nCols, nRows);
          this.shaper.setProperties($node);
          break;
        case 'ids':
          // Used in special cases where all cells have empty content with only 'ids'
          this.ids = child.textContent;
          this.ids.split(' ').forEach((id, i) => { this.cells[i] = new _ActiveBoxContent_js__WEBPACK_IMPORTED_MODULE_2__["default"](Number(id)); });
          break;
        case 'cell':
          this.cells.push(new _ActiveBoxContent_js__WEBPACK_IMPORTED_MODULE_2__["default"]().setProperties($node, mediaBag));
          break;
      }
    });

    let n = this.cells.length;

    // Create cells when `cells` is empty
    if (n === 0 && this.shaper && this.shaper.nCells > 0) {
      this.initiallyEmptyCells = true;
      n = this.shaper.nCells;
      this.getActiveBoxContent(n - 1);
    }

    // Assign ids when cells have empty content (they are just shapes)
    if (n > 0) {
      let empty = true;
      for (let i = 0; i < n; i++) {
        const bxc = this.getActiveBoxContent(i);
        if (bxc.id !== -1 || bxc.item !== -1 || !bxc.isEmpty()) {
          empty = false;
          break;
        }
      }
      if (empty) {
        for (let i = 0; i < n; i++)
          this.getActiveBoxContent(i).id = i;
      }
    }

    // Link [BoxBase](BoxBase.html) objects of `cells` elements to `style`
    if (this.style)
      this.cells.forEach((abc) => { if (abc.style) abc.style.parent = this.style; });

    return this;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    const fields = [
      'id', 'image',
      'ncw', 'nch',
      'w', 'h', 'border',
      'style', // BoxBase
      'shaper', // Shaper
    ];
    if (!this.initiallyEmptyCells)
      fields.push(this.ids ? 'ids' : 'cells'); // ActiveBoxContent
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_5__/* .getAttr */ .iu)(this, fields);
  }

  /**
   * Reads the properties of this ActiveBagContent from a data object
   * @param {object} data - The data object to be parsed
   * @param {module:bags/MediaBag.MediaBag} mediaBag - The project's MediaBag
   * @returns {module:boxes/ActiveBagContent.ActiveBagContent}
   */
  setAttributes(data, mediaBag) {
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_5__/* .setAttr */ .ob)(this, data, [
      'id', 'image',
      'ncw', 'nch',
      'w', 'h', 'border',
      { key: 'style', fn: _BoxBase_js__WEBPACK_IMPORTED_MODULE_1__["default"] },
      { key: 'shaper', fn: _shapers_Shaper_js__WEBPACK_IMPORTED_MODULE_3__["default"] },
      'ids',
      { key: 'cells', fn: _ActiveBoxContent_js__WEBPACK_IMPORTED_MODULE_2__["default"], group: 'array', params: [mediaBag] },
    ]);

    let n = this.cells.length;

    // Create cells when `cells` is empty
    if (n === 0 && this.shaper && this.shaper.nCells > 0) {
      this.initiallyEmptyCells = true;
      n = this.shaper.nCells;
      this.getActiveBoxContent(n - 1);
      if (this.ids)
        this.ids.split(' ').forEach((id, i) => { this.getActiveBoxContent(i).id = Number(id); });
    }

    // Assign ids when cells have empty content (they are just shapes)
    if (n > 0) {
      let empty = true;
      for (let i = 0; i < n; i++) {
        const bxc = this.getActiveBoxContent(i);
        if (bxc.id !== -1 || bxc.item !== -1 || !bxc.isEmpty()) {
          empty = false;
          break;
        }
      }
      if (empty) {
        for (let i = 0; i < n; i++)
          this.getActiveBoxContent(i).id = i;
      }
    }

    // Link [BoxBase](BoxBase.html) objects of `cells` elements to `style`
    if (this.style)
      this.cells.forEach(abc => { if (abc.style) abc.style.parent = this.style; });

    if (mediaBag)
      this.cells.forEach(abc => abc.realizeContent(mediaBag));

    return this;
  }

  /**
   * Prepares the media content of all elements
   * @param {module:JClicPlayer.JClicPlayer} playStation - The {@link module:JClicPlayer.JClicPlayer JClicPlayer}
   */
  prepareMedia(playStation) {
    this.cells.forEach(abc => abc.prepareMedia(playStation));
  }

  /**
   * Gets the estimated total width of this content bag
   * @returns {number}
   */
  getTotalWidth() {
    return this.w * this.ncw;
  }

  /**
   * Gets the estimated total height of this bag
   * @returns {number}
   */
  getTotalHeight() {
    return this.h * this.nch;
  }

  /**
   * Gets the total number of cells of this bag
   * @returns {number}
   */
  getNumCells() {
    return this.cells.length;
  }

  /**
   * Checks if the bag is empty
   * @returns {boolean}
   */
  isEmpty() {
    return this.cells.length === 0;
  }

  /**
   * Retrieves the {@link module:shapers/Shaper.Shaper Shaper} of this bag, creating a new one if it was _null_
   * @returns {module:shapers/Shaper.Shaper}
   */
  getShaper() {
    if (this.shaper === null)
      this.shaper = _shapers_Shaper_js__WEBPACK_IMPORTED_MODULE_3__["default"].getShaper('@Rectangular', this.ncw, this.nch);
    return this.shaper;
  }

  /**
   * Retrieves the {@link module:boxes/BoxBase.BoxBase BoxBase} of this bag, creating a new one if it was _null_
   * @returns {module:boxes/BoxBase.BoxBase}
   */
  getBoxBase() {
    if (this.style === null)
      this.style = new _BoxBase_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    return this.style;
  }

  /**
   * Adds a new {@link module:boxes/ActiveBoxContent.ActiveBoxContent ActiveBoxContent} to this bag
   * @param {module:boxes/ActiveBoxContent.ActiveBoxContent} ab - The ActiveBoxContent to add
   */
  addActiveBoxContent(ab) {
    this.cells.push(ab);
    if (this.ncw === 0 || this.nch === 0) {
      this.ncw = this.nch = 1;
    }
  }

  /**
   * Gets the nth {@link module:boxes/ActiveBoxContent.ActiveBoxContent ActiveBoxContent} in `cells`
   * @param {number} i - The index of the content to be retrieved
   * @returns {module:boxes/ActiveBoxContent.ActiveBoxContent}
   */
  getActiveBoxContent(i) {
    if (i >= this.cells.length) {
      for (let j = this.cells.length; j <= i; j++)
        this.cells.push(new _ActiveBoxContent_js__WEBPACK_IMPORTED_MODULE_2__["default"]());
    }
    return this.cells[i];
  }

  /**
   * Finds the ActiveBoxContent with specific `id` and `item` values
   * @param {number} id
   * @param {number} item
   * @returns {module:boxes/ActiveBoxContent.ActiveBoxContent}
   */
  getActiveBoxContentWith(id, item) {
    return this.cells.find(bxc => bxc.id === id && bxc.item === item);
  }

  /**
   * Sets the content of the cells based on a image spliced by a shaper
   * @param {module:bags/MediaBag.MediaBag} mb - The MediaBag used to retrieve the image
   * @param {module:shapers/Shaper.Shaper} sh - The Shaper used to splice the image
   * @param {boolean} roundSizes - When `true`, the size and coordinates of cells will be rounded
   * to the nearest integer values.
   */
  setImgContent(mb, sh, roundSizes) {
    if (sh)
      this.setShaper(sh);

    if (this.shaper.className === '@Holes')
      this.shaper.hasRemainder = true;

    this.ncw = this.shaper.nCols;
    this.nch = this.shaper.nRows;
    const mbe = mb.elements[this.image];
    if (mb && this.image && mbe && mbe.ready) {
      this.img = mbe.data;
      if (mbe.animated)
        this.animatedGifFile = mbe.getFullPath();
      this.w = this.img.width / this.ncw;
      this.h = this.img.height / this.nch;
      if (roundSizes) {
        this.w = Math.round(this.w);
        this.h = Math.round(this.h);
      }
    } else {
      this.img = null;
      this.w = Math.max(this.w, 10);
      this.h = Math.max(this.h, 10);
    }

    const r = new _AWT_js__WEBPACK_IMPORTED_MODULE_4__/* .Rectangle */ .M_(0, 0, this.w * this.ncw, this.h * this.nch);
    for (let i = 0; i < this.shaper.nCells; i++)
      this.getActiveBoxContent(i).setImgContent(this.img, this.shaper.getShape(i, r), this.animatedGifFile);

    if (this.shaper.hasRemainder) {
      this.backgroundContent = new _ActiveBoxContent_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
      this.backgroundContent.setImgContent(this.img, this.shaper.getRemainderShape(r));
    }
  }

  /**
   * Sets the content of this bag based on an array of strings
   * @param {string[]} txt - The array of strings to be used as content.
   * @param {number} setNcw - Number of columns
   * @param {number} setNch - Number of rows
   */
  setTextContent(txt, setNcw, setNch) {
    this.ncw = Math.max(1, setNcw);
    this.nch = Math.max(1, setNch);
    const n = this.ncw * this.nch;
    for (let i = 0; i < n; i++)
      this.getActiveBoxContent(i).setTextContent(i >= txt.length || txt[i] === null ? '' : txt[i]);
  }

  /**
   * Sets `id` values to a all the {@link module:boxes/ActiveBoxContent.ActiveBoxContent ActiveBoxContent} elements of his bag.
   * @param {number[]} ids -Array of numeric identifiers
   */
  setIds(ids) {
    for (let i = 0; i < ids.length && i < this.cells.length; i++)
      this.getActiveBoxContent(i).id = ids[i];
  }

  /**
   * Sets `value` to the `key` attribute of all cells
   * @param {string} key - The key where the value will be stored
   * @param {any} value - The supplied value. Can be of any type.
   */
  setCellsAttribute(key, value) {
    this.cells.forEach(abc => abc[key] = value);
  }

  /**
   *
   * Cheks if the `id` values of all {@link module:boxes/ActiveBoxContent.ActiveBoxContent ActiveBoxContent} objects are -1 and, if true,
   * sets new ids to them, with values between 0 and `maxId`
   * @param {number} maxId - The maximum value of identifiers
   */
  avoidAllIdsNull(maxId) {
    if (this.cells.every(abc => abc.id === -1)) {
      maxId = Math.max(1, maxId);
      this.cells.forEach((abc, n) => { abc.id = n % maxId; });
    }
  }
}

Object.assign(ActiveBagContent.prototype, {
  /**
   * The global identifier of this object: `primary`, `secondary`...
   * @name module:boxes/ActiveBagContent.ActiveBagContent#id
   * @type {string} */
  id: 'primary',
  /**
   * The name of the image file used as a common image of this bag
   * @name module:boxes/ActiveBagContent.ActiveBagContent#image
   * @type {string} */
  image: null,
  /**
   * The built image object
   * @name module:boxes/ActiveBagContent.ActiveBagContent#img
   * @type {external:HTMLImageElement} */
  img: null,
  /**
   * Name of the img source when is an animated GIF
   * @name module:boxes/ActiveBagContent.ActiveBagContent#animatedGifFile
   * @type {string} */
  animatedGifFile: null,
  /**
   * Number of columns when cells are distributed in a grid
   * @name module:boxes/ActiveBagContent.ActiveBagContent#ncw
   * @type {number} */
  ncw: 1,
  /**
   * Number of rows when cells are distributed in a grid
   * @name module:boxes/ActiveBagContent.ActiveBagContent#nch
   * @type {number} */
  nch: 1,
  /**
   * Optimal cell width
   * @name module:boxes/ActiveBagContent.ActiveBagContent#w
   * @type {number} */
  w: _Utils_js__WEBPACK_IMPORTED_MODULE_5__/* .settings */ .W0.DEFAULT_GRID_ELEMENT_SIZE,
  /**
   * Optimal cell height
   * @name module:boxes/ActiveBagContent.ActiveBagContent#h
   * @type {number} */
  h: _Utils_js__WEBPACK_IMPORTED_MODULE_5__/* .settings */ .W0.DEFAULT_GRID_ELEMENT_SIZE,
  /**
   * Whether the cells must have a border or not
   * @name module:boxes/ActiveBagContent.ActiveBagContent#border
   * @type {boolean} */
  border: true,
  /**
   * The BoxBase used for this bag of cell contents
   * @name module:boxes/ActiveBagContent.ActiveBagContent#style
   * @type {module:boxes/BoxBase.BoxBase} */
  style: null,
  /**
   * The Shaper used to define the specific shape of each cell
   * @name module:boxes/ActiveBagContent.ActiveBagContent#shaper
   * @type {module:shapers/Shaper.Shaper} */
  shaper: null,
  /**
   * An optional ActiveBoxContent object with background settings.
   * @name module:boxes/ActiveBagContent.ActiveBagContent#backgroundContent
   * @type {module:boxes/ActiveBoxContent.ActiveBoxContent} */
  backgroundContent: null,
  /**
   * The main Array of {@link module:boxes/ActiveBoxContent.ActiveBoxContent ActiveBoxContent} objects
   * @name module:boxes/ActiveBagContent.ActiveBagContent#cells
   * @type {module:boxes/ActiveBoxContent.ActiveBoxContent[]} */
  cells: null,
  /**
   * The default value to be assigned at the 'id' field of children
   * @name module:boxes/ActiveBagContent.ActiveBagContent#defaultIdValue
   * @type {number} */
  defaultIdValue: -1,
  /**
   * Used in special cases where all cells have empty content with only numeric identifiers
   * @name module:boxes/ActiveBagContent.ActiveBagContent#ids
   * @type {string} */
  ids: null,
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ActiveBagContent);


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
//# sourceMappingURL=9409.jclic-node.js.map