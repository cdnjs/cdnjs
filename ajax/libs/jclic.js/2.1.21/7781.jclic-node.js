"use strict";
exports.id = 7781;
exports.ids = [7781];
exports.modules = {

/***/ 7781:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export ActiveBoxGrid */
/* harmony import */ var _ActiveBoxBag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(427);
/* harmony import */ var _ActiveBox_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1725);
/* harmony import */ var _AWT_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7912);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1253);
/**
 *  File    : boxes/ActiveBoxGrid.js
 *  Created : 19/05/2015
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






/**
 * This class extends {@link module:boxes/ActiveBoxbag.ActiveBoxBag ActiveBoxBag} with constructors that take an argument of type
 * {@link module:shapers/Shaper.Shaper Shaper} used to build all its {@link module:boxes/ActiveBox.ActiveBox ActiveBox}components. It also maintains information
 * about the number of "rows" and "columns", useful to compute valid (integer) values when
 * resizing or moving its components.
 * @extends module:boxes/ActiveBoxBag.ActiveBoxBag
 */
class ActiveBoxGrid extends _ActiveBoxBag_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * ActiveBxGrid constructor
   * @param {module:boxes/AbstractBox.AbstractBox} parent - The AbstractBox to which this box grid belongs
   * @param {module:AWT.Container} container - The container where this box grid is placed.
   * @param {module:boxes/BoxBase} boxBase - The object where colors, fonts, border and other graphic properties
   * @param {number} px - `X` coordinate of the upper left corner of this box grid
   * @param {number} py - `Y` coordinate of the upper left corner of this box grid
   * @param {number} setWidth - Total width of the box grid
   * @param {number} setHeight - Total height of the box grid
   * @param {module:shapers/Shaper.Shaper} sh - Shaper used to build the ActiveBox objects
   */
  constructor(parent, container, boxBase, px, py, setWidth, setHeight, sh) {
    // ActiveBoxGrid derives from ActiveBoxBag
    super(parent, container, boxBase);

    this.nCols = sh.nCols;
    this.nRows = sh.nRows;

    // This will be the enclosing rectangle of this ActiveBox bag
    const r = new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Rectangle */ .M_(
      new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Point */ .bR(px, py),
      new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Dimension */ .fg(
        Math.round(setWidth / this.nCols) * this.nCols,
        Math.round(setHeight / this.nRows) * this.nRows));

    // Create all the [ActiveBox](ActiveBox.html) objects based on the
    // shapes provided by the [Shaper](Shaper.html)
    for (let i = 0; i < sh.nCells; i++) {
      const
        tmpSh = sh.getShape(i, r),
        bx = new _ActiveBox_js__WEBPACK_IMPORTED_MODULE_1__["default"](this, container, boxBase, i, tmpSh.getBounds());
      if (!sh.rectangularShapes)
        bx.setShape(tmpSh);
      this.addActiveBox(bx);
    }

    // If the Shaper has `remainder` (extra space), set the background box of this
    // [BoxBag](BoxBag.html)
    if (sh.hasRemainder) {
      const
        tmpSh = sh.getRemainderShape(r),
        bx = new _ActiveBox_js__WEBPACK_IMPORTED_MODULE_1__["default"](this, container, boxBase, 0, tmpSh.getBounds());
      bx.setShape(tmpSh);
      this.setBackgroundBox(bx);
    }
  }

  /**
   * This factory constructor creates a new empty grid with the number of cells indicated by the
   * {@link module:boxes/ActiveBagContent.ActiveBagContent ActiveBagContent} `abc`, not filling the cells with any content.
   * @param {module:boxes/AbstractBox.AbstractBox} parent - The AbstractBox to which this box grid belongs
   * @param {module:AWT.Container} container - The container where this box grid is placed.
   * @param {number} px - `X` coordinate of the upper left corner of this box grid
   * @param {number} py - `Y` coordinate of the upper left corner of this box grid
   * @param {module:boxes/ActiveBagContent.ActiveBagContent} abc - Used only to get the number of cells and the shaper (when `sh` is `null`)
   * @param {module:shapers/Shaper.Shaper} sh - Shaper used to build the ActiveBox objects
   * @param {module:boxes/BoxBase.BoxBase} boxBase - The object where colors, fonts, border and other graphic properties
   * of this box grid are defined.
   * @returns {module:boxes/ActiveBoxGrid.ActiveBoxGrid}
   */
  static createEmptyGrid(parent, container, px, py, abc, sh, boxBase) {
    const result = abc ? new ActiveBoxGrid(parent, container,
      boxBase || abc.style,
      px, py,
      abc.getTotalWidth(), abc.getTotalHeight(),
      sh || abc.getShaper()) : null;

    if (result)
      result.setBorder(abc.border);

    return result;
  }

  /**
   * Gets the minimum size of this grid
   * @returns {module:AWT.Dimension}
   */
  getMinimumSize() {
    return new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Dimension */ .fg(
      _Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .settings */ .W0.MIN_CELL_SIZE * this.nCols,
      _Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .settings */ .W0.MIN_CELL_SIZE * this.nRows);
  }

  /**
   * Gets a scaled size of this grid, rounded to the nearest integer values
   * @param {number} scale - The scale factor
   * @returns {module:AWT.Dimension}
   */
  getScaledSize(scale) {
    return new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Dimension */ .fg(
      (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .roundTo */ .GB)(scale * this.preferredBounds.dim.width, this.nCols),
      (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .roundTo */ .GB)(scale * this.preferredBounds.dim.height, this.nRows));
  }

  /**
   * Returns the logical coordinates of the provided {@link module:boxes/ActiveBox.ActiveBox ActiveBox}.
   * The units of the result are not pixels, but ordinal numbers (relative positions) of columns
   * and rows in the grid.
   * @param {module:boxes/ActiveBox.ActiveBox} bx - The box to process
   * @returns {module:AWT.Point}
   */
  getCoord(bx) {
    return new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Point */ .bR(bx.idLoc % this.nCols, Math.floor(bx.idLoc / this.nCols));
  }

  /**
   * Calculates the logical distance between two {@link module:boxes/ActiveBox.ActiveBox ActiveBox} objects.
   * Resulting units are not pixels, but ordinal numbers (relative positions) of columns and rows
   * in the grid.
   * @param {module:boxes/ActiveBox.ActiveBox} src - First box
   * @param {module:boxes/ActiveBox.ActiveBox} dest - Second box
   * @returns {module:AWT.Point}
   */
  getCoordDist(src, dest) {
    const
      ptSrc = this.getCoord(src),
      ptDest = this.getCoord(dest);
    return new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Point */ .bR(ptDest.x - ptSrc.x, ptDest.y - ptSrc.y);
  }
}

Object.assign(ActiveBoxGrid.prototype, {
  /**
   * Number of columns of this box grid
   * @name module:boxes/ActiveBoxGrid.ActiveBoxGrid#nCols
   * @type {number} */
  nCols: 1,
  /**
   * Number of rows of this box grid
   * @name module:boxes/ActiveBoxGrid.ActiveBoxGrid#nRows
   * @type {number} */
  nRows: 1,
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ActiveBoxGrid);


/***/ })

};
;
//# sourceMappingURL=7781.jclic-node.js.map