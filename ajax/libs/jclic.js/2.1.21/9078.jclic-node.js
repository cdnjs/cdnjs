"use strict";
exports.id = 9078;
exports.ids = [9078,3018];
exports.modules = {

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


/***/ }),

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


/***/ })

};
;
//# sourceMappingURL=9078.jclic-node.js.map