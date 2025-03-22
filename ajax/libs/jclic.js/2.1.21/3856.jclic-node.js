"use strict";
exports.id = 3856;
exports.ids = [3856,7781];
exports.modules = {

/***/ 3856:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports Identify, IdentifyPanel */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Activity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1567);
/* harmony import */ var _boxes_ActiveBoxGrid_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7781);
/* harmony import */ var _boxes_BoxBag_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9205);
/* harmony import */ var _AWT_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7912);
/**
 *  File    : activities/panels/Identify.js
 *  Created : 03/06/2015
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

/* global window */







/**
 * The aim of this type of {@link module:Activity.Activity Activity} is to identify {@link module:boxes/ActiveBox.ActiveBox ActiveBox} elements in a panel
 * that satisfy a specific condition, usually exposed in the main message.
 * @extends module:Activity.Activity
 */
class Identify extends _Activity_js__WEBPACK_IMPORTED_MODULE_1__/* .Activity */ .I {
  /**
   * Identify constructor
   * @param {module:project/JClicProject.JClicProject} project - The {@link module:project/JClicProject.JClicProject JClicProject} to which this activity belongs
   */
  constructor(project) {
    super(project);
  }

  /**
   * Retrieves the minimum number of actions needed to solve this activity
   * @override
   * @returns {number}
   */
  getMinNumActions() {
    return this.cellsToMatch;
  }

  /**
   * Whether or not the activity uses random to shuffle internal components
   * @override
   * @returns {boolean}
   */
  hasRandom() {
    return true;
  }
}

Object.assign(Identify.prototype, {
  /**
   * Number of not assigned cells (calculated in {@link module:activities/panels/Identify.IdentifyPanel#buildVisualComponents buildVisualComponents})
   * @name module:activities/panels/Identify.Identify#nonAssignedCells
   * @type {number} */
  nonAssignedCells: 0,
  /**
   * Number of cells the user must identify to complete the activity (calculated in
   * {@link module:activities/panels/Identify.IdentifyPanel#buildVisualComponents buildVisualComponents})
   * @name module:activities/panels/Identify.Identify#cellsToMatch
   * @type {number} */
  cellsToMatch: 1,
});

/**
 * The {@link module:Activity.ActivityPanel ActivityPanel} where {@link module:activities/panels/Identify.Identify Identify} activities are played.
 * @extends module:Activity.ActivityPanel
 */
class IdentifyPanel extends _Activity_js__WEBPACK_IMPORTED_MODULE_1__/* .ActivityPanel */ .S {
  /**
   * IdentifyPanel constructor
   * @param {module:Activity.Activity} act - The {@link module:Activity.Activity Activity} to which this Panel belongs
   * @param {module:JClicPlayer.JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
   * @param {external:jQuery} [$div] - The jQuery DOM element where this Panel will deploy
   */
  constructor(act, ps, $div) {
    super(act, ps, $div);
  }

  /**
   * Miscellaneous cleaning operations
   * @override
   */
  clear() {
    if (this.bg) {
      this.bg.end();
      this.bg = null;
    }
  }

  /**
   * Prepares the visual components of the activity
   * @override
   */
  buildVisualComponents() {
    if (this.firstRun)
      super.buildVisualComponents();
    this.clear();
    const
      abc = this.act.abc['primary'],
      solved = this.act.abc['solvedPrimary'];
    if (abc) {
      if (abc.image) {
        abc.setImgContent(this.act.project.mediaBag, null, false);
        if (abc.animatedGifFile && !abc.shaper.rectangularShapes && !this.act.shuffleA)
          this.$animatedBg = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<span/>').css({
            'background-image': `url(${abc.animatedGifFile})`,
            'background-position': 'center',
            'background-repeat': 'no-repeat',
            position: 'absolute'
          }).appendTo(this.$div);
      }

      if (solved && solved.image)
        solved.setImgContent(this.act.project.mediaBag, null, false);

      if (this.act.acp !== null) {
        const contentKit = [abc];
        if (solved) {
          contentKit.push(null);
          contentKit.push(solved);
        }
        this.act.acp.generateContent(abc.nch, abc.ncw, contentKit, false);
      }
      this.bg = _boxes_ActiveBoxGrid_js__WEBPACK_IMPORTED_MODULE_2__["default"].createEmptyGrid(null, this,
        this.act.margin, this.act.margin,
        abc);
      this.bg.setContent(abc, solved || null);
      this.bg.setAlternative(false);
      if (this.$animatedBg)
        this.bg.setCellAttr('tmpTrans', true);
      this.bg.setDefaultIdAss();
      this.act.nonAssignedCells = 0;
      this.act.cellsToMatch = 0;
      const n = this.bg.getNumCells();
      for (let i = 0; i < n; i++) {
        const
          bx = this.bg.getActiveBox(i),
          id = bx.idAss;
        if (id === 1)
          this.act.cellsToMatch++;
        else if (id === -1) {
          this.act.nonAssignedCells++;
          bx.switchToAlt(this.ps);
        }
      }
      this.bg.setVisible(true);
    }
  }

  /**
   * Basic initialization procedure
   * @override
   */
  initActivity() {
    super.initActivity();
    if (!this.firstRun)
      this.buildVisualComponents();
    else
      this.firstRun = false;

    if (this.bg) {
      if (this.act.shuffleA)
        this.shuffle([this.bg], true, true);

      if (this.useOrder)
        this.currentItem = this.bg.getNextItem(-1);

      this.setAndPlayMsg('initial', 'start');
      this.invalidate().update();
      this.playing = true;
    }
  }

  /**
   * Updates the graphic content of this panel.
   * This method will be called from {@link module:AWT.Container#update} when needed.
   * @override
   * @param {module:AWT.Rectangle} dirtyRegion - Specifies the area to be updated. When `null`,
   * it's the whole panel.
   */
  updateContent(dirtyRegion) {
    super.updateContent(dirtyRegion);

    if (this.bg && this.$canvas) {
      const
        canvas = this.$canvas.get(-1),
        ctx = canvas.getContext('2d');
      if (!dirtyRegion)
        dirtyRegion = new _AWT_js__WEBPACK_IMPORTED_MODULE_4__/* .Rectangle */ .M_(0, 0, canvas.width, canvas.height);
      ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
      this.bg.update(ctx, dirtyRegion);
    }
    return super.updateContent(dirtyRegion);
  }

  /**
   * Sets the real dimension of this panel.
   * @override
   * @param {module:AWT.Dimension} preferredMaxSize - The maximum surface available for the activity panel
   * @returns {module:AWT.Dimension}
   */
  setDimension(preferredMaxSize) {
    return this.getBounds().equals(preferredMaxSize) ?
      preferredMaxSize :
      _boxes_BoxBag_js__WEBPACK_IMPORTED_MODULE_3__["default"].layoutSingle(preferredMaxSize, this.bg, this.act.margin);
  }

  /**
   * Sets the size and position of this activity panel
   * @override
   * @param {module:AWT.Rectangle} rect
   */
  setBounds(rect) {
    if (this.$canvas)
      this.$canvas.remove();

    super.setBounds(rect);
    if (this.bg) {
      this.$canvas = jquery__WEBPACK_IMPORTED_MODULE_0___default()(`<canvas width="${rect.dim.width}" height="${rect.dim.height}"/>`).css({
        position: 'absolute',
        top: 0,
        left: 0
      });
      // Resize animated gif background
      if (this.$animatedBg) {
        const bgRect = this.bg.getBounds();
        this.$animatedBg.css({
          left: bgRect.pos.x,
          top: bgRect.pos.y,
          width: `${bgRect.dim.width}px`,
          height: `${bgRect.dim.height}px`,
          'background-size': `${bgRect.dim.width}px ${bgRect.dim.height}px`
        });
      }
      this.$div.append(this.$canvas);
      this.invalidate().update();
      window.setTimeout(() => this.bg ? this.bg.buildAccessibleElements(this.$canvas, this.$div) : null, 0);
    }
  }

  /**
   * Builds the accessible components needed for this ActivityPanel
   * This method is called when all main elements are placed and visible, when the activity is ready
   * to start or when resized.
   * @override
   */
  buildAccessibleComponents() {
    if (this.bg && this.$canvas && this.accessibleCanvas) {
      super.buildAccessibleComponents();
      this.bg.buildAccessibleElements(this.$canvas, this.$div);
    }
  }

  /**
   * Main handler used to process mouse, touch, keyboard and edit events
   * @override
   * @param {external:Event} event - The HTML event to be processed
   * @returns {boolean} - When this event handler returns `false`, jQuery will stop its
   * propagation through the DOM tree. See: {@link http://api.jquery.com/on}
   */
  processEvent(event) {
    if (this.playing) {
      const p = new _AWT_js__WEBPACK_IMPORTED_MODULE_4__/* .Point */ .bR(
        event.pageX - this.$div.offset().left,
        event.pageY - this.$div.offset().top);
      // Flag for assuring that only one media plays per event (avoid event sounds overlapping
      // cell's media sounds)
      let m = false;
      // Array to be filled with actions to be executed at the end of event processing
      const delayedActions = [];

      switch (event.type) {
        case 'click':
          this.ps.stopMedia(1);
          // Find the box behind the clicked point
          const bx = this.bg ? this.bg.findActiveBox(p) : null;
          if (bx) {
            if (bx.idAss !== -1) {
              // Check if it's a valid move
              let ok = false;
              const src = bx.getDescription();
              m = m || bx.playMedia(this.ps, delayedActions);
              if (bx.idAss === 1 && (!this.act.useOrder || bx.idOrder === this.currentItem)) {
                ok = true;
                bx.idAss = -1;
                if (bx.switchToAlt(this.ps))
                  m = m || bx.playMedia(this.ps, delayedActions);
                else
                  bx.clear();
                if (this.act.useOrder)
                  this.currentItem = this.bg.getNextItem(this.currentItem, 1);
              }
              const cellsOk = this.bg.countCellsWithIdAss(-1);
              this.ps.reportNewAction(this.act, 'SELECT', src, null, ok, cellsOk - this.act.nonAssignedCells);
              if (ok && cellsOk === this.act.cellsToMatch + this.act.nonAssignedCells)
                this.finishActivity(true);
              else if (!m)
                this.playEvent(ok ? 'actionOk' : 'actionError');
              this.update();
            } else {
              this.playEvent('actionError');
            }
          }
          break;
      }
      delayedActions.forEach(action => action());
      event.preventDefault();
    }
  }
}

Object.assign(IdentifyPanel.prototype, {
  /**
   * The {@link module:boxes/ActiveBoxbag.ActiveBoxBag ActiveBoxBag} containing the information to be displayed on the panel.
   * @name module:activities/panels/Identify.IdentifyPanel#bg
   * @type {module:boxes/ActiveBoxBag.ActiveBoxBag} */
  bg: null,
  /**
   * List of mouse, touch and keyboard events intercepted by this panel
   * @override
   * @name module:activities/panels/Identify.IdentifyPanel#events
   * @type {string[]} */
  events: ['click'],
});

/**
 * Panel class associated to this type of activity: {@link module:activities/panels/Identify.IdentifyPanel IdentifyPanel}
 * @type {class} */
Identify.Panel = IdentifyPanel;

// Register activity class
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Activity_js__WEBPACK_IMPORTED_MODULE_1__/* .Activity */ .I.registerClass('@panels.Identify', Identify));


/***/ }),

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
//# sourceMappingURL=3856.jclic-node.js.map