"use strict";
exports.id = 427;
exports.ids = [427];
exports.modules = {

/***/ 427:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export ActiveBoxBag */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BoxBag_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9205);
/* harmony import */ var _AWT_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7912);
/**
 *  File    : boxes/ActiveBoxBag.js
 *  Created : 21/04/2015
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
 * This class is a special case of {@link module:boxes/BoxBag.BoxBag BoxBag} containing only objects of type {@link module:boxes/ActiveBox.ActiveBox ActiveBox}.
 * In addition to the members and methods of `BoxBag`, it implements specific methods to deal with
 * {@link module:boxes/ActiveBagContent.ActiveBagContent ActiveBagContent} objects and with the other specific members of `ActiveBox` like its "ids"
 * (`idOrder`, `idLoc` and `idAss`).
 * @extends module:boxes/BoxBag.BoxBag
 */
class ActiveBoxBag extends _BoxBag_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * ActiveBoxBag constructor
   * @param {module:boxes/AbstractBox.AbstractBox} [parent] - The AbstractBox to which this box bag belongs
   * @param {module:AWT.Container} [container] - The container where this box bag is placed.
   * @param {module:boxes/BoxBase.BoxBase} [boxBase] - The object where colors, fonts, border and other graphic properties
   * of this box bag are defined.
   */
  constructor(parent, container, boxBase) {
    // ActiveBoxBag extends BoxBag
    super(parent, container, boxBase);
  }

  /**
   * Adds an {@link module:boxes/ActiveBox.ActiveBox ActiveBox} to this bag
   * @param {module:boxes/ActiveBox.ActiveBox} bx - The ActiveBox to be added to this bag
   */
  addActiveBox(bx) {
    bx.idLoc = this.cells.length;
    bx.idOrder = bx.idLoc;
    return this.addBox(bx);
  }

  /**
   * Finds an ActiveBox by its relative location (`idLoc` field)
   * @param {number} idLoc
   * @returns {module:boxes/ActiveBox.ActiveBox}
   */
  getActiveBox(idLoc) {
    return this.getBox(idLoc);
  }

  /**
   * Gets the background box
   * @returns {module:boxes/ActiveBox.ActiveBox}
   */
  getBackgroundActiveBox() {
    return this.getBackgroundBox();
  }

  /**
   * Sets the content of members of this ActiveBoxBag, based on one or more {@link module:boxes/ActiveBagContent.ActiveBagContent ActiveBagContent}
   * objects.
   * @param {module:boxes/ActiveBagContent.ActiveBagContent} abc - The main bag of content
   * @param {module:boxes/ActiveBagContent.ActiveBagContent} [altAbc] - The alternative bag of content
   * @param {number} [fromIndex] - Starts taking the cell content located at this position on the bag
   * @param {number} [toCell] - Starts filling the box located at this position on the ActiveBoxBag
   * @param {number} [numCells] - Acts only with a limited number of elements.
   */
  setContent(abc, altAbc, fromIndex, toCell, numCells) {
    if (!fromIndex)
      fromIndex = 0;
    if (!toCell)
      toCell = 0;
    if (!numCells)
      numCells = this.cells.length;

    for (let i = 0; i < numCells; i++) {
      const bx = this.getActiveBox(toCell + i);
      bx.setContent(abc, fromIndex + i);
      bx.setAlternative(false);
      if (altAbc)
        bx.setAltContent(altAbc, fromIndex + i);
    }

    if (abc.backgroundContent !== null && this.getBackgroundActiveBox() !== null) {
      const bx = this.getBackgroundActiveBox();
      bx.setContent(abc.backgroundContent);
      if (abc.style !== bx.boxBase)
        bx.setBoxBase(abc.style);
    }
  }

  /**
   * Finds an ActiveBox by location
   * @param {module:AWT.Point} point - The location to search for
   * @returns {module:boxes/ActiveBox.ActiveBox}
   */
  findActiveBox(point) {
    return this.findBox(point);
  }

  /**
   * Clears the content of all boxes
   */
  clearAllBoxes() {
    this.cells.forEach(bx => bx.clear());
  }

  /**
   * Clears the content of all boxes and background box
   */
  clearAll() {
    this.clearAllBoxes();
    if (this.backgroundBox !== null)
      this.getBackgroundActiveBox().clear();
  }

  /**
   * Count the number of cells that are at its original place
   * @returns {number}
   */
  countCellsAtPlace() {
    return this.cells.reduce((n, bx) => bx.isAtPlace() ? ++n : n, 0);
  }

  /**
   * Finds the {@link module:boxes/ActiveBox.ActiveBox ActiveBox} that has the specified `idLoc` attribute
   * @param {number} idLoc - The idLoc to search for
   * @returns {module:boxes/ActiveBox.ActiveBox}
   */
  getActiveBoxWithIdLoc(idLoc) {
    return this.cells.find(bx => bx.idLoc === idLoc) || null;
  }

  /**
   * Checks if the place occupied by a cell corresponds to a cell with equivalent content.
   * @param {module:boxes/ActiveBox.ActiveBox} bx - The box to check
   * @param {boolean} checkCase - If `true`, check case when comparing texts
   * @returns {boolean}
   */
  cellIsAtEquivalentPlace(bx, checkCase) {
    return bx.isAtPlace() ||
      bx.isEquivalent(this.getActiveBoxWithIdLoc(bx.idOrder), checkCase);
  }

  /**
   * Count the number of cells that are at its original place or equivalent
   * @param {boolean} checkCase -  - If `true`, check case when comparing texts
   * @returns {number}
   */
  countCellsAtEquivalentPlace(checkCase) {
    return this.cells.reduce((n, bx) => this.cellIsAtEquivalentPlace(bx, checkCase) ? ++n : n, 0);
  }

  /**
   * Counts the number of cells that have the provided `idAss` attribute
   * @param {number} idAss - The `idAss` attribute to search
   * @returns {number}
   */
  countCellsWithIdAss(idAss) {
    return this.cells.reduce((n, bx) => bx.idAss === idAss ? ++n : n, 0);
  }

  /**
   * Resets the default `idAss` attribute on all cells
   */
  setDefaultIdAss() {
    this.cells.map(bx => bx.setDefaultIdAss());
  }

  /**
   * Shuffles the cells
   * @param {number} times - Number of times to shuffle
   * @param {boolean} fitInArea - Ensure that all cells are inside the bag rectangle
   */
  shuffleCells(times, fitInArea) {
    let nc = this.cells.length;
    if (nc >= 2) {
      // Array of AWT.Point objects
      const
        pos = [],
        idLoc = [],
        p = new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Point */ .bR();

      for (let i = 0; i < nc; i++) {
        const bx = this.getActiveBox(i);
        pos[i] = new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Point */ .bR(bx.pos);
        idLoc[i] = bx.idLoc;
      }

      for (let i = 0; i < times; i++) {
        const
          r1 = Math.floor(Math.random() * nc),
          r2 = Math.floor(Math.random() * nc);
        if (r1 !== r2) {
          p.moveTo(pos[r1]);
          pos[r1].moveTo(pos[r2]);
          pos[r2].moveTo(p);
          const j = idLoc[r1];
          idLoc[r1] = idLoc[r2];
          idLoc[r2] = j;
        }
      }

      for (let i = 0; i < nc; i++) {
        const
          bx = this.getActiveBox(i),
          px = pos[i].x,
          py = pos[i].y;
        bx.moveTo(new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Point */ .bR(px, py));
        if (fitInArea)
          this.fitCellsInArea([bx]);
        bx.idLoc = idLoc[i];
      }
    }
  }

  /**
   * Fits cells inside the ActiveBoxBag area. Useful when non-rectangular cells exchange its positions.
   * @param {module:boxes/ActiveBox.ActiveBox[]} boxes - The boxes to be checked
   */
  fitCellsInArea(boxes) {
    const
      maxX = this.pos.x + this.dim.width,
      maxY = this.pos.y + this.dim.height;

    boxes.forEach(bx => {
      // Save original position
      if (!bx.pos0)
        bx.pos0 = new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Point */ .bR(bx.pos);

      const
        px = Math.min(Math.max(bx.pos.x, this.pos.x), maxX - bx.dim.width),
        py = Math.min(Math.max(bx.pos.y, this.pos.y), maxY - bx.dim.height);
      if (px !== bx.pos.x || py !== bx.pos.y)
        bx.moveTo(new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Point */ .bR(px, py));
    });
  }

  /**
   * Exchange the positions of two cells inside the ActiveBoxBag area.
   * @param {module:boxes/ActiveBox.ActiveBox} bxa - The first box
   * @param {module:boxes/ActiveBox.ActiveBox} bxb - The second box
   * @param {boolean} fitInArea - Ensure that all cells are inside the bag rectangle
   */
  swapCellPositions(bxa, bxb, fitInArea) {
    // Save backup of bxb significant properties
    const
      posB = new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Point */ .bR(bxb.pos),
      posB0 = bxb.pos0,
      idLocB = bxb.idLoc;

    bxb.moveTo(bxa.pos0 || bxa.pos);
    bxb.pos0 = bxa.pos0;
    bxb.idLoc = bxa.idLoc;

    bxa.moveTo(posB0 || posB);
    bxa.pos0 = posB0;
    bxa.idLoc = idLocB;

    if (fitInArea)
      this.fitCellsInArea([bxa, bxb]);
  }

  /**
   * Resets the IDs of all cells
   */
  resetIds() {
    this.cells.forEach((bx, i) => {
      if (bx) {
        bx.idOrder = i;
        bx.idAss = i;
        bx.idLoc = i;
      }
    });
  }

  /**
   * Gets the index of box located in the `cells` array after the provided index, having the
   * provided `idAssValid` value as `idAss` attribute.
   * When `idAssValid` is `null` or `undefined`, search for the next cell with `idAss>0`
   * @param {number} currentItem - The index after to which start scanning
   * @param {string} [idAssValid] - The `idAss` attribute value to search
   * @returns {number}
   */
  getNextItem(currentItem, idAssValid) {
    const IDASSNOTUSED = -12345;
    if (!idAssValid)
      idAssValid = IDASSNOTUSED;
    let i = currentItem + 1;
    for (; i < this.cells.length; i++) {
      const bx = this.cells[i];
      if (!bx)
        break;
      if (idAssValid !== IDASSNOTUSED) {
        if (idAssValid === bx.idAss)
          break;
      } else if (bx.idAss >= 0)
        break;
    }
    return i;
  }

  /**
   * Builds a group of hidden `buton` elements that will act as a accessible objects associated
   * to the canvas area of this ActiveBoxBag.
   * The buttons will only be created when `CanvasRenderingContext2D` has a method named `addHitRegion`.
   * See https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Hit_regions_and_accessibility
   * for more information and supported browsers.
   * @param {external:jQuery} $canvas - The `canvas` where this `ActiveBoxBag` will deploy, wrapped up in a jQuery object
   * @param {external:jQuery} $clickReceiver - The DOM element that will be notified  when a button is clicked.
   * @param {string} [eventType] - Type of event sent to $clickReceiver. Default is `click`.
   * @returns {external:jQuery} - The $accessibleDiv member, containing the accessible elements associated to this ActiveBoxBag.
   */
  buildAccessibleElements($canvas, $clickReceiver, eventType) {
    this.$accessibleDiv = this.accessibleText !== '' ? jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>', { 'aria-label': this.accessibleText, tabindex: 0 }) : null;
    $canvas.append(this.$accessibleDiv);
    this.cells
      .map(a => a)
      .sort((a, b) => a.idLoc > b.idLoc ? 1 : -1)
      .forEach(bx => bx.buildAccessibleElement($canvas, $clickReceiver, this.$accessibleDiv, eventType));
    return this.$accessibleDiv;
  }
}

Object.assign(ActiveBoxBag.prototype, {
  /**
   * `div` containing the accessible elements associated to this ActiveBoxBag
   * @name module:boxes/ActiveBoxBag.ActiveBoxBag#$accessibleDiv
   * @type {external:jQuery} */
  $accessibleDiv: null,
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ActiveBoxBag);


/***/ }),

/***/ 9205:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export BoxBag */
/* harmony import */ var _AbstractBox_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9513);
/* harmony import */ var _AWT_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7912);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1253);
/**
 *  File    : boxes/BoxBag.js
 *  Created : 21/04/2015
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
 * BoxBag is a class derived from {@link module:boxes/AbstractBox.AbstractBox AbstractBox} that contains a collection of "boxes"
 * (objects also derived from {@link module:boxes/AbstractBox.AbstractBox AbstractBox}). This class implements methods to add, remove
 * and retrieve boxes, and to manage some of its properties like visibility, status, location and size.
 * @extends module:boxes/AbstractBox.AbstractBox
 */
class BoxBag extends _AbstractBox_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * BoxBag constructor
   * @param {module:boxes/AbstractBox.AbstractBox} [parent] - The AbstractBox to which this box bag belongs
   * @param {module:AWT.Container} [container] - The container where this box bag is placed.
   * @param {module:boxes/BoxBase.BoxBase} [boxBase] - The object where colors, fonts, border and other graphic properties
   */
  constructor(parent, container, boxBase) {
    // BoxBag extends AbstractBox
    super(parent, container, boxBase);
    this.preferredBounds = new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .Rectangle */ .M_();
    this.cells = [];
  }

  /**
   * Static method that sets the position and dimension of a `Resizable` object based on a
   * preferred maximum dimension and a margin.
   * @param {module:AWT.Dimension} preferredMaxSize - The preferred maximum size
   * @param {Resizable} rs - A resizable object implementing the methods described in the
   * {@link http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/boxes/Resizable.html Resizable}
   * interface of JClic. Currently a {@link module:boxes/BoxBag.BoxBag BoxBag} or {@link module:boxes/TextGrid.TextGrid TextGrid}.
   * @param {number} margin - The margin between the available area and the BoxBag
   * @returns {module:AWT.Dimension} - The resulting size of the container
   */
  static layoutSingle(preferredMaxSize, rs, margin) {

    // Avoid exceptions when rs is null
    if (!rs)
      return preferredMaxSize;

    // optimal, maximal and minimal dimensions
    let
      d = rs.getPreferredSize(),
      minSize = rs.getMinimumSize(),
      maxSize = preferredMaxSize;

    // remove margins
    maxSize.width -= 2 * margin;
    maxSize.height -= 2 * margin;
    // correct maxSize if less than minSize
    if (minSize.width > maxSize.width || minSize.height > maxSize.height) {
      maxSize = minSize;
    }
    // compute scale factor
    let scale = d.width > maxSize.width ? maxSize.width / d.width : 1;
    if (scale * d.height > maxSize.height)
      scale = maxSize.height / d.height;

    // resize the `Resizable` object
    d = rs.getScaledSize(scale);
    rs.setBounds(margin, margin, d.width, d.height);

    // restore margins
    d.width += 2 * margin;
    d.height += 2 * margin;

    return d;
  }

  /**
   * Static method that sets the position and dimension of two `Resizable` objects based on a
   * preferred maximum size, a layout schema and a margin.
   * @param {module:AWT.Dimension} desiredMaxSize - The preferred maximum size
   * @param {Resizable} rsA - First resizable object implementing the methods described in the
   * {@link http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/boxes/Resizable.html Resizable}
   * interface of JClic. Currently a {@link module:boxes/BoxBag.BoxBag BoxBag} or {@link module:boxes/TextGrid.TextGrid TextGrid}.
   * @param {Resizable} rsB - Second resizable object
   * @param {string} boxGridPos - The layout schema. Possible values are:
   * - "AB" (_A_ at left, _B_ at right)
   * - "BA" (_B_ at left, _A_ at right)
   * - "AUB" (_A_ above _B_)
   * - "BUA" (_A_ below _B_).
   * @param {number} margin - The margin between the available area and the BoxBag
   * @returns {module:AWT.Dimension} - The resulting size of the container
   */
  static layoutDouble(desiredMaxSize, rsA, rsB, boxGridPos, margin) {
    // number of horizontal and vertical grid lines
    let
      isHLayout = false,
      nbh = 1,
      nbv = 1;
    switch (boxGridPos) {
      case 'AB':
      case 'BA':
        nbh = 2;
        nbv = 1;
        isHLayout = true;
        break;
      case 'AUB':
      case 'BUA':
        nbh = 1;
        nbv = 2;
        isHLayout = false;
        break;
    }
    const
      ra = rsA.getBounds(),
      rb = rsB.getBounds();

    // optimal dimensions
    let
      da = rsA.getPreferredSize(),
      db = rsB.getPreferredSize();

    const d = new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .Dimension */ .fg(
      isHLayout ? da.width + db.width : Math.max(da.width, db.width),
      isHLayout ? Math.max(da.height, db.height) : da.height + db.height
    );

    // minimal dimensions
    const
      minSizeA = rsA.getMinimumSize(),
      minSizeB = rsB.getMinimumSize(),
      minSize = new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .Dimension */ .fg(
        isHLayout ? minSizeA.width + minSizeB.width : Math.max(minSizeA.width, minSizeB.width),
        isHLayout ? Math.max(minSizeA.height, minSizeB.height) : minSizeA.height + minSizeB.height
      ),
      maxSize = desiredMaxSize;

    // remove margins
    maxSize.width -= (1 + nbh) * margin;
    maxSize.height -= (1 + nbv) * margin;

    // correct maxSize if less than minSize
    if (minSize.width > maxSize.width || minSize.height > maxSize.height)
      maxSize.setDimension(minSize);

    // compute scale factor
    let scale = d.width > maxSize.width ? maxSize.width / d.width : 1;
    if (scale * d.height > maxSize.height)
      scale = maxSize.height / d.height;

    //
    // correct possible minimal infractions
    // ...
    // resize
    da = rsA.getScaledSize(scale);
    db = rsB.getScaledSize(scale);

    // set margins to center one box relative to the other
    let
      dah = db.width > da.width ? (db.width - da.width) / 2 : 0,
      dbh = da.width > db.width ? (da.width - db.width) / 2 : 0,
      dav = db.height > da.height ? (db.height - da.height) / 2 : 0,
      dbv = da.height > db.height ? (da.height - db.height) / 2 : 0;

    switch (boxGridPos) {
      case 'AB':
        rsA.setBounds(margin, margin + dav, da.width, da.height);
        rsB.setBounds(2 * margin + da.width, margin + dbv, db.width, db.height);
        break;
      case 'BA':
        rsB.setBounds(margin, margin + dbv, db.width, db.height);
        rsA.setBounds(2 * margin + db.width, margin + dav, da.width, da.height);
        break;
      case 'AUB':
        rsA.setBounds(margin + dah, margin, da.width, da.height);
        rsB.setBounds(margin + dbh, 2 * margin + da.height, db.width, db.height);
        break;
      case 'BUA':
        rsB.setBounds(margin + dbh, margin, db.width, db.height);
        rsA.setBounds(margin + dah, 2 * margin + db.height, da.width, da.height);
        break;
      default:
        rsA.setBounds(
          Math.round(margin + scale * ra.pos.x),
          Math.round(margin + scale * ra.pos.y),
          da.width, da.height);
        rsB.setBounds(
          Math.round(margin + scale * rb.pos.x),
          Math.round(margin + scale * rb.pos.y),
          da.width, da.height);
        break;
    }

    // recompute 'd' adding margins
    const r = new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .Rectangle */ .M_(rsA.getBounds());
    r.add(rsB.getBounds());
    d.width = r.dim.width + 2 * margin;
    d.height = r.dim.height + 2 * margin;

    return d;
  }

  /**
   * Gets the preferred size of this `BoxBag`
   * @returns {module:AWT.Dimension}
   */
  getPreferredSize() {
    return this.preferredBounds.dim;
  }

  /**
   * Gets the minimum size requested by this `BoxBag`
   * @returns {module:AWT.Dimension}
   */
  getMinimumSize() {
    const d = this.getPreferredSize();
    return new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .Dimension */ .fg(
      Math.max(_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .settings */ .W0.MIN_CELL_SIZE, d.width),
      Math.max(_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .settings */ .W0.MIN_CELL_SIZE, d.height));
  }

  /**
   * Scales the current size of this box bag, multiplying all values by a specific factor
   * @param {number} scale - The scale factor
   * @returns {module:AWT.Dimension}
   */
  getScaledSize(scale) {
    const d = this.getPreferredSize();
    return new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .Dimension */ .fg(Math.round(scale * d.width), Math.round(scale * d.height));
  }

  /**
   * Adds an {@link module:boxes/AbstractBox.AbstractBox AbstractBox} to the collection of cells
   * @param {module:boxes/AbstractBox.AbstractBox} bx - The box to add
   */
  addBox(bx) {
    this.cells.push(bx);
    bx.setParent(this);

    if (this.cells.length === 1)
      _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .Rectangle */ .M_.prototype.setBounds.call(this, bx);
    else
      this.add(bx);

    this.preferredBounds.setBounds(this.getBounds());
  }

  /**
   * Returns the index of a specific box in the `cells` array
   * @param {module:boxes/AbstractBox.AbstractBox} bx
   * @returns {number}
   */
  boxIndex(bx) {
    return bx === null ? -1 : this.cells.indexOf(bx);
  }

  /**
   * Returns the box at a specific index in the `cells` array
   * @param {number} n - The index
   * @returns {module:boxes/AbstractBox.AbstractBox}
   */
  getBox(n) {
    return n < 0 || n >= this.cells.length ? null : this.cells[n];
  }

  /**
   * Gets the background box
   * @returns {module:boxes/AbstractBox.AbstractBox}
   */
  getBackgroundBox() {
    return this.backgroundBox;
  }

  /**
   * Sets the background box
   * @param {module:boxes/AbstractBox.AbstractBox} bx
   */
  setBackgroundBox(bx) {
    this.backgroundBox = bx;
    if (bx !== null) {
      bx.setParent(this);
      bx.isBackground = true;
    }
    // Add the `backgroundbox` rectangle to the global BoxBag rectangle
    _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .Rectangle */ .M_.prototype.add.call(this, bx);
    this.preferredBounds.setBounds(this.getBounds());
  }

  /**
   * Recalculates the total size of this BoxBag (useful after direct additions o deletions of
   * elements in the `cells` array).
   * Updates `preferredBounds` and the current position and size of the box bag.
   */
  recalcSize() {
    let r = this.backgroundBox ? new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .Rectangle */ .M_(this.backgroundBox.pos, this.backgroundBox.dim) : null;
    this.cells.forEach(cell => {
      if (!r)
        r = new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .Rectangle */ .M_(cell.pos, cell.dim);
      else
        r.add(cell);
    });
    if (!r)
      r = new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .Rectangle */ .M_(this.pos.x, this.pos.y, 0, 0);
    this.preferredBounds.setRect(r);
    this.x = r.pos.x;
    this.y = r.pos.y;
    this.dim.width = r.dim.width;
    this.dim.height = r.dim.height;
  }

  /**
   * Returns the number of cells stored in this BoxBag
   * @returns {number}
   */
  getNumCells() {
    return this.cells.length;
  }

  /**
   * Sets the specified key - value pair to all cells of this bag.
   * @param {string} key - The key to be established
   * @param {any} value - The value, of any type
   */
  setCellAttr(key, value) {
    this.cells.forEach(bx => bx[key] = value);
    if (this.backgroundBox)
      this.backgroundBox[key] = value;
  }

  /**
   * Overrides {@link module:boxes/AbstractBox.AbstractBox#setBorder} iterating over all the cells stored in this box bag.
   * @override
   * @param {boolean} newVal - Whether to set or unset the border
   */
  setBorder(newVal) {
    this.cells.forEach(bx => bx.setBorder(newVal));
  }

  /**
   * Overrides {@link module:boxes/AbstractBox.AbstractBox#setVisible} iterating over all the cells stored in this box bag.
   * @override
   * @param {boolean} newVal - Whether to set the cells visible or not
   */
  setVisible(newVal) {
    this.cells.forEach(bx => bx.setVisible(newVal));
  }

  /**
   * Overrides {@link module:boxes/AbstractBox.AbstractBox#setAlternative} iterating over all the cells stored in this box bag.
   * @override
   * @param {boolean} newVal - Whether to set or unset the cells in "alternative" mode
   */
  setAlternative(newVal) {
    super.setAlternative(newVal);
    this.cells.forEach(bx => bx.setAlternative(newVal));
  }

  /**
   * Overrides {@link module:boxes/AbstractBox.AbstractBox#setBounds} adjusting the position and size of all cells
   * @override
   * @param {(AWT.Rectangle|number)} rect - An AWT.Rectangle object, or the `x` coordinate of the
   * upper-left corner of a new rectangle.
   * @param {number} [ry] - `y` coordinate of the upper-left corner of the new rectangle.
   * @param {number} [rw] - Width of the new rectangle.
   * @param {number} [rh] - Height of the new rectangle.
   */
  setBounds(rect, ry, rw, rh) {
    if (typeof rect === 'number') {
      // Arguments are co-ordinates and size
      rect = new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .Rectangle */ .M_(rect, ry, rw, rh);
    }
    if (rect.getSurface() > 0 && !rect.equals(this)) {
      const
        scaleW = rect.dim.width / this.dim.width,
        scaleH = rect.dim.height / this.dim.height,
        dx = rect.pos.x - this.pos.x,
        dy = rect.pos.y - this.pos.y;
      this.cells.forEach(bx => {
        const p = new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .Point */ .bR(bx.pos.x - this.pos.x, bx.pos.y - this.pos.y);
        bx.setBounds(
          dx + this.pos.x + scaleW * p.x,
          dy + this.pos.y + scaleH * p.y,
          scaleW * bx.dim.width,
          scaleH * bx.dim.height);
        // Clear pos0
        bx.pos0 = null;
      });
      if (this.backgroundBox !== null) {
        const
          bx = this.backgroundBox,
          p = new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .Point */ .bR(bx.pos.x - this.pos.x, bx.pos.y - this.pos.y);
        bx.setBounds(
          dx + this.pos.x + scaleW * p.x,
          dy + this.pos.y + scaleH * p.y,
          scaleW * bx.dim.width,
          scaleH * bx.dim.height);
      }
    }
    super.setBounds(rect);
  }

  /**
   * Performs graphics operations for each cell.
   * Overrides {@link module:boxes/AbstractBox.AbstractBox#update}
   * @override
   * @param {external:CanvasRenderingContext2D} ctx - The canvas rendering context used to draw the
   * box contents.
   * @param {module:AWT.Rectangle} [dirtyRegion] - The area that must be repainted. `null` refers to the whole box.
   */
  update(ctx, dirtyRegion) {
    if (this.isEmpty() || !this.isVisible() || this.isTemporaryHidden())
      return false;

    if (dirtyRegion && !this.intersects(dirtyRegion))
      return false;

    if (this.backgroundBox !== null)
      this.backgroundBox.update(ctx, dirtyRegion);

    this.cells.forEach(bx => {
      if (!bx.isMarked())
        bx.update(ctx, dirtyRegion);
    });

    // Make a second loop to repaint marked cells
    this.cells.forEach(bx => {
      if (bx.isMarked())
        bx.update(ctx, dirtyRegion);
    });
    return true;
  }

  /**
   * Finds the first visible {@link module:boxes/AbstractBox.AbstractBox AbstractBox} located under the specified point
   * @param {module:AWT.Point} p
   * @returns {module:boxes/AbstractBox.AbstractBox}
   */
  findBox(p) {
    let result = null;
    for (let i = this.cells.length - 1; i >= 0; i--) {
      const bx = this.getBox(i);
      if (bx.isVisible() && bx.contains(p)) {
        result = bx;
        break;
      }
    }
    return result;
  }

  /**
   * Count the number of cells of this BoxBag that are in "inactive" state
   * @returns {number}
   */
  countInactiveCells() {
    return this.cells.reduce((n, bx) => bx.isInactive() ? ++n : n, 0);
  }
}

Object.assign(BoxBag.prototype, {
  /**
   * The array of cells
   * @name module:boxes/BoxBag.BoxBag#cells
   * @type {module:boxes/AbstractBox.AbstractBox[]} */
  cells: [],
  /**
   * Rectangle containing the preferred bounds of the BoxBag
   * @name module:boxes/BoxBag.BoxBag#preferredBounds
   * @type {module:AWT.Rectangle} */
  preferredBounds: new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .Rectangle */ .M_(),
  /**
   * An optional box used as a background by this BoxBag
   * @name module:boxes/BoxBag.BoxBag#backgroundBox
   * @type {module:boxes/AbstractBox.AbstractBox} */
  backgroundBox: null,
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BoxBag);


/***/ })

};
;
//# sourceMappingURL=427.jclic-node.js.map