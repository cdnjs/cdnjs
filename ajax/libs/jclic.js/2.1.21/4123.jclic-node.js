"use strict";
exports.id = 4123;
exports.ids = [4123];
exports.modules = {

/***/ 4123:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports defaults, flags, TextGrid */
/* harmony import */ var _AWT_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7912);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1253);
/* harmony import */ var _AbstractBox_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9513);
/* harmony import */ var _TextGridContent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1842);
/**
 *  File    : boxes/TextGrid.js
 *  Created : 12/06/2015
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
 * Default values
 * @type {object}
 */
const defaults = {
  MIN_CELL_SIZE: 12,
  DEFAULT_CELL_SIZE: 20,
  MIN_INTERNAL_MARGIN: 2
};

/**
 * Binary flags used to mark status
 * @type {object}
 */
const flags = {
  NORMAL: 0,
  INVERTED: 1,
  HIDDEN: 2,
  LOCKED: 4,
  MARKED: 8,
  TRANSPARENT: 16
};

/**
 * This class is a special type of {@link module:boxes/AbstractBox.AbstractBox AbstractBox} that displays a grid of single
 * characters.
 *
 * It's used {@link module:activities/textGrid/CrossWord.CrossWord CrossWord} and {@link module:activities/textGrid/WordSearch.WordSearch WordSearch} activities.
 * @extends module:boxes/AbstractBox.AbstractBox
 */
class TextGrid extends _AbstractBox_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  /**
   * TextGrid constructor
   * @param {module:boxes/AbstractBox.AbstractBox} parent - The AbstractBox to which this text grid belongs
   * @param {module:AWT.Container} container - The container where this text grid is placed.
   * @param {module:boxes/BoxBase.BoxBase} boxBase - The object where colors, fonts, border and other graphic properties
   * @param {number} x - `X` coordinate of the upper left corner of this grid
   * @param {number} y - `Y` coordinate of the upper left corner of this grid
   * @param {number} ncw - Number of columns of the grid
   * @param {number} nch - Nomber of rows of the grid
   * @param {number} cellW - Width of the cells
   * @param {number} cellH - Height of the cells
   * @param {boolean} border - When `true`, a border must be drawn between the cells
   */
  constructor(parent, container, boxBase, x, y, ncw, nch, cellW, cellH, border) {
    // *TextGrid* extends [AbstractBox](AbstractBox.html)
    super(parent, container, boxBase);
    this.pos.x = x;
    this.pos.y = y;
    this.nCols = Math.max(1, ncw);
    this.nRows = Math.max(1, nch);
    this.cellWidth = Math.max(cellW, defaults.MIN_CELL_SIZE);
    this.cellHeight = Math.max(cellH, defaults.MIN_CELL_SIZE);
    this.dim.width = cellW * this.nCols;
    this.dim.height = cellH * this.nRows;
    this.setChars(' ');
    this.preferredBounds = new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Rectangle */ .M_(this.pos, this.dim);
    this.setBorder(border);
    this.cursorTimer = new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Timer */ .M4(() => this.blink(0), 500, false);
    this.cursorEnabled = false;
    this.useCursor = false;
    this.wildTransparent = false;
    this.cursor = new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Point */ .bR();
  }

  /**
   * Factory constructor that creates an empty grid based on a {@link module:boxes/TextGridContent.TextGridContent TextGridContent}
   * @param {module:boxes/AbstractBox.AbstractBox} parent - The AbstractBox to which the text grid belongs
   * @param {module:AWT.Container} container - The container where the text grid will be placed.
   * @param {number} x - `X` coordinate of the upper left corner of the grid
   * @param {number} y - `Y` coordinate of the upper left corner of the grid
   * @param {module:boxes/TextGridContent.TextGridContent} tgc - Object with the content and other settings of the grid
   * @param {boolean} wildTransparent - When `true`, the wildcard character will be transparent
   * @returns {module:boxes/TextGrid.TextGrid}
   */
  static createEmptyGrid(parent, container, x, y, tgc, wildTransparent) {
    const result = new TextGrid(parent, container, tgc.style,
      x, y, tgc.ncw, tgc.nch, tgc.w, tgc.h, tgc.border);
    result.wild = tgc.wild;
    result.randomChars = tgc.randomChars;
    result.wildTransparent = wildTransparent;
    return result;
  }

  /**
   * Sets the characters to be placed in the cells of this TextGrid
   * @param {string} text
   */
  setChars(text) {
    this.chars = [];
    this.answers = [];
    this.attributes = [];
    for (let py = 0; py < this.nRows; py++) {
      const line = py < text.length ? text[py] : '';
      this.chars[py] = line.split('');
      this.answers[py] = [];
      this.attributes[py] = [];
      for (let px = 0; px < this.nCols; px++) {
        if (px >= line.length)
          this.chars[py][px] = ' ';
        this.answers[py][px] = this.chars[py][px];
        this.attributes[py][px] = flags.NORMAL;
      }
    }
  }

  /**
   * Substitutes the current content of all cells with wildcards with a randomly generated char.
   * @see TextGridContent#randomChars
   */
  randomize() {
    for (let py = 0; py < this.nRows; py++)
      for (let px = 0; px < this.nCols; px++)
        if (this.chars[py][px] === this.wild)
          this.chars[py][px] = this.randomChars.charAt(
            Math.floor(Math.random() * this.randomChars.length));
  }

  /**
   * Clears or sets global attributes to all cells
   * @param {boolean} lockWild - When `true`, the wildcard cells will be marked with special
   * attributes (used in CrossWords to mark black cells)
   * @param {boolean} clearChars - When `true`, the current content of cells will be erased.
   */
  setCellAttributes(lockWild, clearChars) {
    let atr = flags.LOCKED;
    if (this.wildTransparent)
      atr |= flags.TRANSPARENT;
    else
      atr |= flags.INVERTED | flags.HIDDEN;
    for (let py = 0; py < this.nRows; py++) {
      for (let px = 0; px < this.nCols; px++) {
        if (lockWild && this.chars[py][px] === this.wild)
          this.attributes[py][px] = atr;
        else {
          this.attributes[py][px] = flags.NORMAL;
          if (clearChars)
            this.chars[py][px] = ' ';
        }
      }
    }
  }

  /**
   * Sets or unsets the `locked` properties (black cell) to a specific cell.
   * @param {number} px - The logical 'X' coordinate of the cell
   * @param {number} py - The logical 'Y' coordinate of the cell
   * @param {boolean} locked - When true, the `locked` attribute will be on.
   */
  setCellLocked(px, py, locked) {
    if (px >= 0 && px < this.nCols && py >= 0 && py < this.nRows) {
      this.attributes[py][px] = locked ?
        flags.LOCKED |
        (this.wildTransparent ?
          flags.TRANSPARENT :
          flags.INVERTED |
          flags.HIDDEN) :
        flags.NORMAL;
    }
  }

  /**
   * For a specific cell located at column `rx` and row `ry`, finds the number of words delimited
   * by wildchars located behind its current position and in the same row and column. Used in
   * {@link module:activities/textGrid/CrossWord.CrossWord CrossWord} activities to find the definition for a specific cell.
   *
   * The result is returned as 'x' and 'y' properties of a logical point.
   * @param {number} rx - The 'X' position of the cell
   * @param {number} ry - The 'Y' position of the cell
   * @returns {module:AWT.Point} - The logical positions of the definition for this cell inside the list
   * of current definitions of its row and column. '0' means first definition of its row/column,
   * '1' the second one, etc.
   */
  getItemFor(rx, ry) {
    if (!this.isValidCell(rx, ry))
      return null;

    const point = new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Point */ .bR();
    let
      inBlack = false,
      startCount = false;

    for (let px = 0; px < rx; px++) {
      if ((this.attributes[ry][px] & flags.LOCKED) !== 0) {
        if (!inBlack) {
          if (startCount)
            point.x++;
          inBlack = true;
        }
      } else {
        startCount = true;
        inBlack = false;
      }
    }
    inBlack = false;
    startCount = false;
    for (let py = 0; py < ry; py++) {
      if ((this.attributes[py][rx] & flags.LOCKED) !== 0) {
        if (!inBlack) {
          if (startCount)
            point.y++;
          inBlack = true;
        }
      } else {
        startCount = true;
        inBlack = false;
      }
    }
    return point;
  }

  /**
   * Whether the blinking cursor must be enabled or disabled.
   * @param {boolean} status
   */
  setCursorEnabled(status) {
    this.cursorEnabled = status;
    if (status === true)
      this.startCursorBlink();
    else
      this.stopCursorBlink();
  }

  /**
   * Starts the {@link module:AWT.Timer} that makes the cursor blink.
   */
  startCursorBlink() {
    if (this.useCursor && this.cursorEnabled && this.cursorTimer && !this.cursorTimer.isRunning()) {
      this.blink(1);
      this.cursorTimer.start();
    }
  }

  /**
   * Stops the {@link module:AWT.Timer} that makes the cursor blink.
   */
  stopCursorBlink() {
    if (this.cursorTimer && this.cursorTimer.isRunning()) {
      this.cursorTimer.stop();
      this.blink(-1);
    }
  }

  /**
   * Moves the cursor in the specified x and y directions.
   * @param {number} dx - Amount to move in the 'X' axis
   * @param {number} dy - Amount to move in the 'Y' axis
   * @param {boolean} skipLocked - Skip locked cells (wildcards in {@link module:activities/textGrid/CrossWord.CrossWord CrossWord})
   */
  moveCursor(dx, dy, skipLocked) {
    if (this.useCursor) {
      const point = this.findNextCellWithAttr(this.cursor.x, this.cursor.y,
        skipLocked ? flags.LOCKED : flags.NORMAL,
        dx, dy, false);

      if (!this.cursor.equals(point))
        this.setCursorAt(point.x, point.y, skipLocked);
    }
  }

  /**
   * Finds the coordinates of the nearest non-locked cell (non-wildcard) moving on the indicated
   * 'X' and 'Y' directions.
   * @param {module:AWT.Point} - Logical coordinates of the starting point
   * @param {number} dx - 0 means no movement, 1 go right, -1 go left.
   * @param {number} dy - 0 means no movement, 1 go down, -1 go up.
   * @returns {module:AWT.Point}
   */
  findFreeCell(from, dx, dy) {
    let result = null;
    if (from && (dx !== 0 || dy !== 0)) {
      const scan = new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Point */ .bR(from);
      while (result === null) {
        scan.x += dx;
        scan.y += dy;
        if (scan.x < 0 || scan.x >= this.nCols || scan.y < 0 || scan.y >= this.nRows)
          break;
        if (!this.getCellAttribute(scan.x, scan.y, flags.LOCKED))
          result = scan;
      }
    }
    return result;
  }

  /**
   * Finds the first cell with the specified attributes at the specified state, starting
   * at specified point.
   * @param {number} startX - Starting X coordinate
   * @param {number} startY - Starting Y coordinate
   * @param {number} attr - Attribute to check. See {@link module:boxes/TextGrid.TextGrid.flags}.
   * @param {number} dx - 0 means no movement, 1 go right, -1 go left.
   * @param {number} dy - 0 means no movement, 1 go down, -1 go up.
   * @param {boolean} attrState - Desired state (enabled or disabled) of `attr`
   * @returns {module:AWT.Point}
   */
  findNextCellWithAttr(startX, startY, attr, dx, dy, attrState) {
    const point = new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Point */ .bR(startX + dx, startY + dy);
    while (true) {
      if (point.x < 0) {
        point.x = this.nCols - 1;
        if (point.y > 0)
          point.y--;
        else
          point.y = this.nRows - 1;
      } else if (point.x >= this.nCols) {
        point.x = 0;
        if (point.y < this.nRows - 1)
          point.y++;
        else
          point.y = 0;
      }
      if (point.y < 0) {
        point.y = this.nRows - 1;
        if (point.x > 0)
          point.x--;
        else
          point.x = this.nCols - 1;
      } else if (point.y >= this.nRows) {
        point.y = 0;
        if (point.x < this.nCols - 1)
          point.x++;
        else
          point.x = 0;
      }
      if (point.x === startX && point.y === startY ||
        this.getCellAttribute(point.x, point.y, attr) === attrState)
        break;
      point.x += dx;
      point.y += dy;
    }
    return point;
  }

  /**
   * Sets the blinking cursor at a specific point
   * @param {number} px - X coordinate
   * @param {number} py - Y coordinate
   * @param {boolean} skipLocked - Skip locked (wildcard) cells
   */
  setCursorAt(px, py, skipLocked) {
    this.stopCursorBlink();
    if (this.isValidCell(px, py)) {
      this.cursor.x = px;
      this.cursor.y = py;
      this.useCursor = true;
      if (skipLocked && this.getCellAttribute(px, py, flags.LOCKED)) {
        this.moveCursor(1, 0, skipLocked);
      } else {
        if (this.cursorEnabled)
          this.startCursorBlink();
      }
    }
  }

  /**
   * Sets the `useCursor` property of this text grid
   * @param {boolean} value
   */
  setUseCursor(value) {
    this.useCursor = value;
  }

  /**
   * Gets the current position of the blinking cursor
   * @returns {module:AWT.Point}
   */
  getCursor() {
    return this.cursor;
  }

  /**
   * Counts the number of cells of this grid with the specified character
   * @param {string} ch
   * @returns {number}
   */
  countCharsLike(ch) {
    let result = 0;
    for (let py = 0; py < this.nRows; py++)
      for (let px = 0; px < this.nCols; px++)
        if (this.chars[py][px] === ch)
          result++;
    return result;
  }

  /**
   * Gets the number of cells of this grid
   * @returns {number}
   */
  getNumCells() {
    return this.nRows * this.nCols;
  }

  /**
   * Counts the number of coincidences between the `answers` array and the current content of this grid
   * @param {boolean} checkCase - Make comparisions case-sensitive
   * @returns {number}
   */
  countCoincidences(checkCase) {
    let result = 0;
    if (this.answers)
      for (let py = 0; py < this.nRows; py++)
        for (let px = 0; px < this.nCols; px++)
          if (this.isCellOk(px, py, checkCase))
            result++;
    return result;
  }

  /**
   * Checks if a specific cell is equivalent to the content of `answers` at its position
   * @param {number} px - X coordinate
   * @param {number} py - Y coordinate
   * @param {boolean} checkCase - Make comparisions case-sensitive
   * @returns {boolean}
   */
  isCellOk(px, py, checkCase) {
    let result = false;
    if (this.isValidCell(px, py)) {
      const ch = this.chars[py][px];
      if (ch !== this.wild) {
        const ch2 = this.answers[py][px];
        if (ch === ch2 ||
          !checkCase && ch.toUpperCase() === ch2.toUpperCase())
          result = true;
      }
    }
    return result;
  }

  /**
   * Gets the logical coordinates (in 'cell' units) of a device point into the grid
   * @param {module:AWT.Point} devicePoint
   * @returns {module:AWT.Point}
   */
  getLogicalCoords(devicePoint) {
    if (!this.contains(devicePoint))
      return null;
    const
      px = Math.floor((devicePoint.x - this.pos.x) / this.cellWidth),
      py = Math.floor((devicePoint.y - this.pos.y) / this.cellHeight);

    return this.isValidCell(px, py) ? new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Point */ .bR(px, py) : null;
  }

  /**
   * Checks if the specified logical coordinates are inside the valid bounds of the grid.
   * @param {number} px - 'X' coordinate
   * @param {number} py - 'Y' coordinate
   * @returns {boolean}
   */
  isValidCell(px, py) {
    return px < this.nCols && py < this.nRows && px >= 0 && py >= 0;
  }

  /**
   * Sets the specified character as a content of the cell at specified coordinates
   * @param {number} px - 'X' coordinate
   * @param {number} py - 'Y' coordinate
   * @param {string} ch - The character to set.
   */
  setCharAt(px, py, ch) {
    if (this.isValidCell(px, py)) {
      this.chars[py][px] = ch;
      this.repaintCell(px, py);
    }
  }

  /**
   * Gets the character of the cell at the specified coordinates
   * @param {number} px - 'X' coordinate
   * @param {number} py - 'Y' coordinate
   * @returns {string}
   */
  getCharAt(px, py) {
    return this.isValidCell(px, py) ? this.chars[py][px] : ' ';
  }

  /**
   * Gets the text formed by the letters between two cells that share a straight line on the grid.
   * The text can be formed horizontally, vertically and diagonal, both in left-to-right or
   * right-to-left direction.
   * @param {number} x0 - 'X' coordinate of the first cell
   * @param {number} y0 - 'Y' coordinate of the first cell
   * @param {number} x1 - 'X' coordinate of the second cell
   * @param {number} y1 - 'Y' coordinate of the second cell
   * @returns {string}
   */
  getStringBetween(x0, y0, x1, y1) {
    let sb = '';
    if (this.isValidCell(x0, y0) && this.isValidCell(x1, y1)) {
      let
        dx = x1 - x0,
        dy = y1 - y0;
      if (dx === 0 || dy === 0 || Math.abs(dx) === Math.abs(dy)) {
        const steps = Math.max(Math.abs(dx), Math.abs(dy));
        if (steps > 0) {
          dx /= steps;
          dy /= steps;
        }
        for (let i = 0; i <= steps; i++)
          sb += this.getCharAt(x0 + dx * i, y0 + dy * i);
      }
    }
    return sb;
  }

  /**
   * Sets a specific attribute to all cells forming a straight line between two cells on the grid.
   * @param {number} x0 - 'X' coordinate of the first cell
   * @param {number} y0 - 'Y' coordinate of the first cell
   * @param {number} x1 - 'X' coordinate of the second cell
   * @param {number} y1 - 'Y' coordinate of the second cell
   * @param {number} attribute - The binary flag representing this attribute. See {@link module:boxes/TextGrid.TextGrid.flags}.
   * @param {boolean} value - Whether to set or unset the attribute.
   */
  setAttributeBetween(x0, y0, x1, y1, attribute, value) {
    if (this.isValidCell(x0, y0) && this.isValidCell(x1, y1)) {
      let
        dx = x1 - x0,
        dy = y1 - y0;

      if (dx === 0 || dy === 0 || Math.abs(dx) === Math.abs(dy)) {
        const steps = Math.max(Math.abs(dx), Math.abs(dy));
        if (steps > 0) {
          dx /= steps;
          dy /= steps;
        }
        for (let i = 0; i <= steps; i++)
          this.setAttribute(x0 + dx * i, y0 + dy * i, attribute, value);
      }
    }
  }

  /**
   * Sets or unsets a specifi attrobut to a cell.
   * @param {number} px - The 'X' coordinate of the cell
   * @param {number} py - The 'Y' coordinate of the cell
   * @param {number} attribute - The binary flag representing this attribute. See {@link module:boxes/TextGrid.TextGrid.flags}.
   * @param {boolean} state - Whether to set or unset the attribute.
   */
  setAttribute(px, py, attribute, state) {
    if (this.isValidCell(px, py)) {
      if (this.attribute === flags.MARKED && !state)
        this.repaintCell(px, py);
      this.attributes[py][px] &= ~attribute;
      this.attributes[py][px] |= state ? attribute : 0;
      if (attribute !== flags.MARKED || state)
        this.repaintCell(px, py);
    }
  }

  /**
   * Sets the specified attribute to all cells.
   * @param {number} attribute - The binary flag representing this attribute. See {@link module:boxes/TextGrid.TextGrid.flags}.
   * @param {boolean} state - Whether to set or unset the attribute.
   */
  setAllCellsAttribute(attribute, state) {
    for (let py = 0; py < this.nRows; py++)
      for (let px = 0; px < this.nCols; px++)
        this.setAttribute(px, py, attribute, state);
  }

  /**
   * Gets the specified attribute of a cell
   * @param {number} px - The 'X' coordinate of the cell
   * @param {number} py - The 'Y' coordinate of the cell
   * @param {number} attribute - The binary flag representing this attribute. See {@link module:boxes/TextGrid.TextGrid.flags}.
   * @returns {boolean} - `true` if the cell has this attribute, `false` otherwise.
   */
  getCellAttribute(px, py, attribute) {
    return this.isValidCell(px, py) ? (this.attributes[py][px] & attribute) !== 0 : false;
  }

  /**
   * Gets the rectangle enclosing a specific cell
   * @param {number} px - The 'X' coordinate of the cell
   * @param {number} py - The 'Y' coordinate of the cell
   * @returns {module:AWT.Rectangle}
   */
  getCellRect(px, py) {
    return new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Rectangle */ .M_(this.pos.x + px * this.cellWidth, this.pos.y + py * this.cellHeight, this.cellWidth, this.cellHeight);
  }

  /**
   * Gets the rectangle enclosing a specific cell, including the border thick.
   * @param {number} px - The 'X' coordinate of the cell
   * @param {number} py - The 'Y' coordinate of the cell
   * @returns {module:AWT.Rectangle}
   */
  getCellBorderBounds(px, py) {
    const isMarked = this.getCellAttribute(px, py, flags.MARKED);
    if (!this.border && !isMarked)
      return this.getCellRect(px, py);

    const
      style = this.getBoxBaseResolve(),
      strk = isMarked ? style.markerStroke : style.borderStroke;

    return this.getCellRect(px, py).grow(strk.lineWidth, strk.lineWidth);
  }

  /**
   * Repaints a cell
   * @param {number} px - The 'X' coordinate of the cell
   * @param {number} py - The 'Y' coordinate of the cell
   */
  repaintCell(px, py) {
    if (this.container)
      this.container.invalidate(this.getCellBorderBounds(px, py)).update();
  }

  /**
   * Gets the preferred size of this grid
   * @returns {module:AWT.Dimension}
   */
  getPreferredSize() {
    return this.preferredBounds.dim;
  }

  /**
   * Gets the minimum size of this grid
   * @returns {module:AWT.Dimension}
   */
  getMinimumSize() {
    return new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Dimension */ .fg(defaults.MIN_CELL_SIZE * this.nCols, defaults.MIN_CELL_SIZE * this.nRows);
  }

  /**
   * Scales the grid to a new size
   * @param {number} scale - The factor used to multiply all coordinates and sizes
   * @returns {module:AWT.Dimension}
   */
  getScaledSize(scale) {
    return new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Dimension */ .fg(
      (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .roundTo */ .GB)(scale * this.preferredBounds.dim.width, this.nCols),
      (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .roundTo */ .GB)(scale * this.preferredBounds.dim.height, this.nRows));
  }

  /**
   * Overrides {@link module:boxes/AbstractBox.AbstractBox#setBounds}
   * @override
   * @param {AWT.Rectangle|number} rect - An AWT.Rectangle object, or the `x` coordinate of the
   * upper-left corner of a new rectangle.
   * @param {number} [y] - `y` coordinate of the upper-left corner of the new rectangle.
   * @param {number} [w] - Width of the new rectangle.
   * @param {number} [h] - Height of the new rectangle.
   */
  setBounds(rect, y, w, h) {
    super.setBounds(rect, y, w, h);
    this.cellWidth = this.dim.width / this.nCols;
    this.cellHeight = this.dim.height / this.nRows;
  }

  /**
   * Overrides {@link module:boxes/AbstractBox.AbstractBox#updateContent}
   * @override
   * @param {external:CanvasRenderingContext2D} ctx - The canvas rendering context used to draw the
   * grid.
   * @param {module:AWT.Rectangle} [dirtyRegion] - The area that must be repainted. `null` refers to the whole box.
   */
  updateContent(ctx, dirtyRegion) {
    const style = this.getBoxBaseResolve();

    // test font size
    ctx.font = style.font.cssFont();
    ctx.textBaseline = 'alphabetic';
    style.prepareText(ctx, 'W',
      this.cellWidth - 2 * defaults.MIN_INTERNAL_MARGIN,
      this.cellHeight - 2 * defaults.MIN_INTERNAL_MARGIN);

    const ch = [];
    const ry = (this.cellHeight - style.font.getHeight()) / 2 + style.font.getMetrics().ascent;

    for (let py = 0; py < this.nRows; py++) {
      for (let px = 0; px < this.nCols; px++) {
        const bxr = this.getCellBorderBounds(px, py);
        if (bxr.intersects(dirtyRegion)) {
          const attr = this.attributes[py][px];
          if ((attr & flags.TRANSPARENT) === 0) {
            const isInverted = (attr & flags.INVERTED) !== 0;
            const isMarked = (attr & flags.MARKED) !== 0;
            const isCursor = this.useCursor && this.cursor.x === px && this.cursor.y === py;
            const boxBounds = this.getCellRect(px, py);
            ctx.fillStyle = isCursor && this.cursorBlink ?
              style.inactiveColor :
              isInverted ? style.textColor : style.backColor;
            boxBounds.fill(ctx);
            ctx.strokeStyle = 'black';
            if ((attr & flags.HIDDEN) === 0) {
              ch[0] = this.chars[py][px];
              if (ch[0]) {
                const dx = boxBounds.pos.x + (this.cellWidth - ctx.measureText(ch[0]).width) / 2;
                const dy = boxBounds.pos.y + ry;

                if (style.shadow) {
                  // Render text shadow
                  const d = Math.max(1, style.font.size / 10);
                  ctx.fillStyle = style.shadowColor;
                  ctx.fillText(ch[0], dx + d, dy + d);
                }
                // Render text
                ctx.fillStyle = isInverted ? style.backColor
                  : this.isAlternative() ? style.alternativeColor : style.textColor;
                ctx.fillText(ch[0], dx, dy);
              }
            }
            if (this.border || isMarked) {
              ctx.strokeStyle = style.borderColor;
              style[isMarked ? 'markerStroke' : 'borderStroke'].setStroke(ctx);
              if (isMarked)
                ctx.globalCompositeOperation = 'xor';

              // Draw border
              boxBounds.stroke(ctx);

              // Reset ctx default values
              if (isMarked)
                ctx.globalCompositeOperation = 'source-over';
            }
            ctx.strokeStyle = 'black';
            _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Stroke */ .tc.prototype.setStroke(ctx);
          }
        }
      }
    }
    return true;
  }

  /**
   * Makes the cursor blink, alternating between two states. This method should be called only by
   * {@link module:boxes/TextGrid.TextGrid#cursorTimer}
   * @param {boolean} status
   */
  blink(status) {
    // TODO: Move blink and timer to ActivityPanel
    if (this.useCursor) {
      this.cursorBlink = status === 1 ? true : status === -1 ? false : !this.cursorBlink;
      this.repaintCell(this.cursor.x, this.cursor.y);
    }
  }

  /**
   * Stops the cursor timer if not `null` and active
   */
  end() {
    if (this.cursorTimer) {
      this.cursorTimer.stop();
      this.cursorTimer = null;
    }
  }
}

Object.assign(TextGrid.prototype, {
  /**
   * Number of rows
   * @name module:boxes/TextGrid.TextGrid#nRows
   * @type {number} */
  nRows: 1,
  /**
   * Number of columns
   * @name module:boxes/TextGrid.TextGrid#nCols
   * @type {number} */
  nCols: 1,
  /**
   * Two-dimension array of characters
   * @name module:boxes/TextGrid.TextGrid#chars
   * @type {string[][]} */
  chars: null,
  /**
   * Two-dimension array with the expected characters, used to check user's answers.
   * @name module:boxes/TextGrid.TextGrid#answers
   * @type {string[][]} */
  answers: null,
  /**
   * Two-dimension array of bytes used as containers of boolean attributes
   * @name module:boxes/TextGrid.TextGrid#attributes
   * @see TextGrid.flags
   * @type {number[][]} */
  attributes: null,
  /**
   * The cell width, in pixels
   * @name module:boxes/TextGrid.TextGrid#cellWidth
   * @type {number} */
  cellWidth: 20,
  /**
   * The cell height, in pixels
   * @name module:boxes/TextGrid.TextGrid#cellHeight
   * @type {number} */
  cellHeight: 20,
  /**
   * The preferred bounds of this grid
   * @name module:boxes/TextGrid.TextGrid#preferredBounds
   * @type {module:AWT.Rectangle} */
  preferredBounds: null,
  /**
   * The character to be used as wildcard
   * @name module:boxes/TextGrid.TextGrid#wild
   * @type {string} */
  wild: _TextGridContent_js__WEBPACK_IMPORTED_MODULE_3__["default"].prototype.wild,
  /**
   * Characters that can be used when randomizing the content of this grid
   * @name module:boxes/TextGrid.TextGrid#randomChars
   * @see TextGridContent#randomChars
   * @type {string} */
  randomChars: _TextGridContent_js__WEBPACK_IMPORTED_MODULE_3__["default"].prototype.randomChars,
  /**
   * Whether the blinking cursor is enabled or disabled
   * @name module:boxes/TextGrid.TextGrid#cursorEnabled
   * @type {boolean} */
  cursorEnabled: false,
  /**
   * Whether this grid uses a blinking cursor or not
   * @name module:boxes/TextGrid.TextGrid#useCursor
   * @type {boolean} */
  useCursor: false,
  /**
   * The current position of the cursor
   * @name module:boxes/TextGrid.TextGrid#cursor
   * @type {module:AWT.Point} */
  cursor: null,
  /**
   * `true` when the cursor is "blinking" (cell drawn with {@link module:boxes/BoxBase.BoxBase BoxBase} `inverse` attributes)
   * @name module:boxes/TextGrid.TextGrid#cursorBlink
   * @type {boolean} */
  cursorBlink: false,
  /**
   * Controls the blinking of the cursor
   * @name module:boxes/TextGrid.TextGrid#cursorTimer
   * @type {module:AWT.Timer} */
  cursorTimer: null,
  /**
   * Whether the wildcard character is transparent or opaque
   * @name module:boxes/TextGrid.TextGrid#wildTransparent
   * @type {boolean} */
  wildTransparent: false,
});

/**
 * TextGrid default values
 * @name module:boxes/TextGrid.TextGrid.defaults
 * @constant
 * @type {object} */
TextGrid.defaults = defaults;

/**
 * Binary flags used to mark status
 * @name module:boxes/TextGrid.TextGrid.flags
 * @constant
 * @type {object} */
TextGrid.flags = flags;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextGrid);


/***/ })

};
;
//# sourceMappingURL=4123.jclic-node.js.map