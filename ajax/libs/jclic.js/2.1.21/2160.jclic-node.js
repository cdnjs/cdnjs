"use strict";
exports.id = 2160;
exports.ids = [2160,7781,6148];
exports.modules = {

/***/ 2160:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports WordSearch, WordSearchPanel */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Activity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1567);
/* harmony import */ var _boxes_ActiveBoxGrid_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7781);
/* harmony import */ var _boxes_BoxBag_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9205);
/* harmony import */ var _boxes_BoxConnector_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6148);
/* harmony import */ var _AWT_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7912);
/* harmony import */ var _boxes_TextGrid_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4123);
/**
 *  File    : activities/textGrid/WordSearch.js
 *  Created : 15/06/2015
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
 * This class of {@link module:Activity.Activity Activity} shows a {@link module:boxes/TextGrid.TextGrid TextGrid} with some words placed in horizontal,
 * vertical or diagonal direction, written right or upside down. The remaining grid cells will be
 * filled with randomly selected characters.
 *
 * The aim of the activity is to find all the words hidden on the text grid.
 * The content of an optional {@link module:boxes/ActiveBagContent.ActiveBagContent ActiveBagContent} can be revealed on an auxiliary panel as
 * words are found.
 * @extends module:Activity.Activity
 */
class WordSearch extends _Activity_js__WEBPACK_IMPORTED_MODULE_1__/* .Activity */ .I {
  /**
   * WordSearch constructor
   * @param {module:project/JClicProject.JClicProject} project - The JClic project to which this activity belongs
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
    return this.clues.length;
  }

  /**
   * This type of activity permits the user to display the solution
   * @override
   * @returns {boolean}
   */
  helpSolutionAllowed() {
    return true;
  }

  /**
   * This kind of activity uses random numbers to generate the filling characters
   * @override
   * @returns {boolean}
   */
  hasRandom() {
    return true;
  }
}

Object.assign(WordSearch.prototype, {
  /**
   * String array containing all the valid clues.
   * @name module:activities/textGrid/WordSearch.WordSearch#clues
   * @type {string[]} */
  clues: null,
  /**
   * Array of integers containing __for each clue__ the index
   * of an associated {@link module:boxes/ActiveBoxContent.ActiveBoxContent ActiveBoxContent} located on the secondary {@link module:boxes/ActiveBoxbag.ActiveBoxBag ActiveBoxBag}.
   * This associated element is optional.
   * @name module:activities/textGrid/WordSearch.WordSearch#clueItems
   * @type {number[]} */
  clueItems: null,
  /**
   * Objects that indicate if box grids A and B must be shuffled.
   * (defaults to _false_ in WordSearch activities)
   * @name module:activities/textGrid/WordSearch.WordSearch#shuffleA
   * @type {boolean} */
  shuffleA: false,
  /**
   * Objects that indicate if box grids A and B must be shuffled.
   * (defaults to _false_ in WordSearch activities)
   * @name module:activities/textGrid/WordSearch.WordSearch#shuffleB
   * @type {boolean} */
  shuffleB: false,
});

/**
 * The {@link module:Activity.ActivityPanel ActivityPanel} where {@link module:activities/textGrid/WordSearch.WordSearch WordSearch} activities are played.
 * @extends module:Activity.ActivityPanel
 */
class WordSearchPanel extends _Activity_js__WEBPACK_IMPORTED_MODULE_1__/* .ActivityPanel */ .S {
  /**
   * WordSearchPanel constructor
   * @param {module:Activity.Activity} act - The {@link module:Activity.Activity Activity} to which this Panel belongs
   * @param {module:JClicPlayer.JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
   * @param {external:jQuery} [$div] - The jQuery DOM element where this Panel will deploy
   */
  constructor(act, ps, $div) {
    super(act, ps, $div);
    this.resolvedClues = [];
  }

  /**
   * Performs miscellaneous cleaning operations
   * @override
   */
  clear() {
    if (this.grid) {
      this.grid.end();
      this.grid = null;
    }
    if (this.bgAlt) {
      this.bgAlt.end();
      this.bgAlt = null;
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
      tgc = this.act.tgc,
      abcAlt = this.act.abc['secondary'];
    if (abcAlt) {
      if (abcAlt.image) {
        abcAlt.setImgContent(this.act.project.mediaBag, null, false);
        if (abcAlt.animatedGifFile && !abcAlt.shaper.rectangularShapes && !this.act.shuffleB)
          this.$animatedBg = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<span/>').css({
            'background-image': `url(${abcAlt.animatedGifFile})`,
            'background-position': 'center',
            'background-repeat': 'no-repeat',
            position: 'absolute'
          }).appendTo(this.$div);
      }

      if (this.act.acp !== null)
        this.act.acp.generateContent(0, 0, [abcAlt], false);
    }

    if (tgc) {
      this.grid = _boxes_TextGrid_js__WEBPACK_IMPORTED_MODULE_6__["default"].createEmptyGrid(null, this, this.act.margin, this.act.margin, tgc, false);
      if (abcAlt) {
        this.bgAlt = _boxes_ActiveBoxGrid_js__WEBPACK_IMPORTED_MODULE_2__["default"].createEmptyGrid(null, this, this.act.margin, this.act.margin, abcAlt);
        if (this.$animatedBg && this.bgAlt.backgroundBox)
          this.bgAlt.backgroundBox['tmpTrans'] = true;
      }
      this.grid.setVisible(true);
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

    if (this.grid) {
      this.grid.setChars(this.act.tgc.text);
      this.grid.randomize();
      this.grid.setAllCellsAttribute(_boxes_TextGrid_js__WEBPACK_IMPORTED_MODULE_6__["default"].flags.INVERTED, false);

      this.resolvedClues = Array(this.act.clueItems.length).fill(false);

      if (this.bgAlt) {
        this.bgAlt.setContent(this.act.abc['secondary']);
        if (this.$animatedBg)
          this.bgAlt.clearAllBoxes();
        if (this.act.shuffleB)
          this.shuffle([this.bgAlt], true, true);
        this.bgAlt.setVisible(this.$animatedBg !== null || this.act.invAss);
      }

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
    if (this.grid && this.$canvas) {
      const
        canvas = this.$canvas.get(-1),
        ctx = canvas.getContext('2d');
      if (!dirtyRegion)
        dirtyRegion = new _AWT_js__WEBPACK_IMPORTED_MODULE_5__/* .Rectangle */ .M_(0, 0, canvas.width, canvas.height);
      ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
      this.grid.update(ctx, dirtyRegion);
      if (this.bgAlt)
        this.bgAlt.update(ctx, dirtyRegion);
    }
    return this;
  }

  /**
   * Sets the real dimension of this panel.
   * @override
   * @param {module:AWT.Dimension} preferredMaxSize - The maximum surface available for the activity panel
   * @returns {module:AWT.Dimension}
   */
  setDimension(preferredMaxSize) {
    if (!this.grid || this.getBounds().equals(preferredMaxSize))
      return preferredMaxSize;
    if (this.bgAlt)
      return _boxes_BoxBag_js__WEBPACK_IMPORTED_MODULE_3__["default"].layoutDouble(preferredMaxSize, this.grid, this.bgAlt, this.act.boxGridPos, this.act.margin);
    else
      return _boxes_BoxBag_js__WEBPACK_IMPORTED_MODULE_3__["default"].layoutSingle(preferredMaxSize, this.grid, this.act.margin);
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
    if (this.grid) {
      // Create the main canvas
      this.$canvas = jquery__WEBPACK_IMPORTED_MODULE_0___default()(`<canvas width="${rect.dim.width}" height="${rect.dim.height}"/>`).css({
        position: 'absolute',
        top: 0,
        left: 0
      });
      // Resize animated gif background
      if (this.$animatedBg && this.bgAlt) {
        const bgRect = this.bgAlt.getBounds();
        this.$animatedBg.css({
          left: bgRect.pos.x,
          top: bgRect.pos.y,
          width: `${bgRect.dim.width}px`,
          height: `${bgRect.dim.height}px`,
          'background-size': `${bgRect.dim.width}px ${bgRect.dim.height}px`
        });
      }
      this.$div.append(this.$canvas);

      // Create a [BoxConnector](BoxConnector.html) and attach it to the canvas context
      this.bc = new _boxes_BoxConnector_js__WEBPACK_IMPORTED_MODULE_4__["default"](this, this.$canvas);

      // Repaint all
      this.invalidate().update();
    }
  }

  /**
   * Calculates the current score
   * @returns {number}
   */
  getCurrentScore() {
    return this.resolvedClues.reduce((n, resolved) => resolved ? ++n : n, 0);
  }

  /**
   * Main handler used to process mouse, touch, keyboard and edit events
   * @override
   * @param {external:Event} event - The HTML event to be processed
   * @returns {boolean} - When this event handler returns `false`, jQuery will stop its
   * propagation through the DOM tree. See: {@link http://api.jquery.com/on}
   */
  processEvent(event) {
    if (this.bc && this.playing) {
      //
      // The [AWT.Point](AWT.html#Point) where the mouse or touch event has been originated
      let p = null;
      //
      // _touchend_ event don't provide pageX nor pageY information
      if (event.type === 'touchend')
        p = this.bc.active ? this.bc.dest.clone() : new _AWT_js__WEBPACK_IMPORTED_MODULE_5__/* .Point */ .bR();
      else {
        // Touch events can have more than one touch, so `pageX` must be obtained from `touches[0]`
        const
          x = event.originalEvent.touches ? event.originalEvent.touches[0].pageX : event.pageX,
          y = event.originalEvent.touches ? event.originalEvent.touches[0].pageY : event.pageY;
        p = new _AWT_js__WEBPACK_IMPORTED_MODULE_5__/* .Point */ .bR(x - this.$div.offset().left, y - this.$div.offset().top);
      }

      // Flag for tracking `mouseup` events
      let up = false;
      // Flag for assuring that only one media plays per event (avoid event sounds overlapping
      // cell's media sounds)
      let m = false;
      // Array to be filled with actions to be executed at the end of event processing
      const delayedActions = [];

      switch (event.type) {
        case 'touchcancel':
          // Canvel movement
          if (this.bc.active)
            this.bc.end();
          break;

        case 'mouseup':
          // Don't consider drag moves below 3 pixels. Can be a "trembling click"
          if (this.bc.active && p.distanceTo(this.bc.origin) <= 3)
            break;

          up = true;
        /* falls through */
        case 'touchend':
        case 'touchstart':
        case 'mousedown':
          if (!this.bc.active) {
            // A new word selection starts
            //
            // Selection of words can never start with a `mouseup` event
            if (up)
              break;

            this.ps.stopMedia(1);
            if (this.grid.contains(p)) {
              this.playEvent('click');
              this.bc.begin(p);
            }
          } else {
            this.ps.stopMedia(1);
            // Word selection completed
            //
            // Find the active boxes behind `bc.origin` and `p`
            const
              pt1 = this.grid.getLogicalCoords(this.bc.origin),
              pt2 = this.grid.getLogicalCoords(this.bc.dest);
            this.bc.end();
            const s = this.grid.getStringBetween(pt1.x, pt1.y, pt2.x, pt2.y);
            if (s !== null && s.length > 0) {
              let ok = false, c = 0;
              for (; c < this.act.clues.length; c++) {
                if (s === this.act.clues[c]) {
                  ok = true;
                  break;
                }
              }
              const repeated = this.resolvedClues[c];
              if (ok && !repeated) {
                this.resolvedClues[c] = true;
                this.grid.setAttributeBetween(pt1.x, pt1.y, pt2.x, pt2.y, _boxes_TextGrid_js__WEBPACK_IMPORTED_MODULE_6__["default"].flags.INVERTED, true);
                if (this.bgAlt !== null) {
                  const k = this.act.clueItems[c];
                  if (k >= 0 && k < this.bgAlt.getNumCells()) {
                    const bx = this.bgAlt.getActiveBox(this.act.clueItems[c]);
                    if (bx) {
                      bx.setVisible(this.$animatedBg === null && !this.act.invAss);
                      m = bx.playMedia(this.ps, delayedActions);
                    }
                  }
                }
              }
              if (!repeated) {
                const r = this.getCurrentScore();
                this.ps.reportNewAction(this.act, 'ACTION_SELECT', s, null, ok, r);
                if (r === this.act.clues.length)
                  this.finishActivity(true);
                else if (!m)
                  this.playEvent(ok ? 'actionOK' : 'actionError');
                this.invalidate();
              } else if (!ok && !m)
                this.playEvent('actionError');
            } else
              this.playEvent('actionError');

            this.update();
          }
          break;

        case 'mousemove':
        case 'touchmove':
          this.bc.moveTo(p);
          break;
      }
      delayedActions.forEach(action => action());
      event.preventDefault();
    }
  }
}

Object.assign(WordSearchPanel.prototype, {
  /**
   * The {@link module:boxes/TextGrid.TextGrid TextGrid} object of this ActivityPanel
   * @name module:activities/textGrid/WordSearch.WordSearchPanel#grid
   * @type {module:boxes/TextGrid.TextGrid} */
  grid: null,
  /**
   * An optional {@link module:boxes/ActiveBoxbag.ActiveBoxBag ActiveBoxBag} used to display information associated with the hidden words.
   * @name module:activities/textGrid/WordSearch.WordSearchPanel#bgAlt
   * @type {module:boxes/ActiveBoxBag.ActiveBoxBag} */
  bgAlt: null,
  /**
   * An array of boolean values indicating which clues have been found
   * @name module:activities/textGrid/WordSearch.WordSearchPanel#resolvedClues
   * @type {boolean[]} */
  resolvedClues: null,
  /**
   * The box connector object
   * @name module:activities/textGrid/WordSearch.WordSearchPanel#bc
   * @type {module:boxes/BoxConnector.BoxConnector} */
  bc: null,
  /**
   * Mouse and touch events intercepted by this panel
   * @override
   * @name module:activities/textGrid/WordSearch.WordSearchPanel#events
   * @type {string[]} */
  events: ['mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchend', 'touchmove', 'touchcancel'],
});

/**
 * Panel class associated to this type of activity: {@link module:activities/textGrid/WordSearch.WordSearchPanel WordSearchPanel}
 * @type {class} */
WordSearch.Panel = WordSearchPanel;

// Register activity class
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Activity_js__WEBPACK_IMPORTED_MODULE_1__/* .Activity */ .I.registerClass('@textGrid.WordSearch', WordSearch));


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


/***/ }),

/***/ 6148:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export BoxConnector */
/* harmony import */ var _AWT_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7912);
/**
 *  File    : boxes/BoxConnector.js
 *  Created : 26/05/2015
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



const DEFAULT_COMPOSITE_OP = 'source-over';

/**
 * BoxConnector allows users to visually connect two {@link module:boxes/ActiveBox.ActiveBox ActiveBox} objects of an
 * {@link module:Activity.ActivityPanel ActivityPanel}. There are two modes of operation:
 *
 * - Drawing a line between an origin point (usually the point where the user clicks on) and a
 * destination point.
 * - Dragging the ActiveBox from one location to another.
 *
 * The connecting lines can have arrowheads at its endings.
 */
class BoxConnector {
  /**
   * BoxConnector constructor
   * @param {module:AWT.Container} parent - The Container to which this BoxConnector belongs
   * @param {external:jQuery} $canvas - The HTML `canvas` element where this BoxConnector will draw.
   */
  constructor(parent, $canvas) {
    this.parent = parent;
    this.ctx = $canvas.get(-1).getContext('2d', { willReadFrequently: true });
    this.dim = new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Dimension */ .fg(this.ctx.canvas.width, this.ctx.canvas.height);
    this.origin = new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Point */ .bR();
    this.dest = new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Point */ .bR();
    this.relativePos = new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Point */ .bR();
  }

  /**
   * Displaces the ending point of the connector
   * @param {number} dx - Displacement on the X axis
   * @param {number} dy - Displacement on the Y axis
   */
  moveBy(dx, dy) {
    this.moveTo((0,_AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Point */ .bR)(this.dest.x + dx, this.dest.y + dy));
  }

  /**
   * Moves the ending point of the connector to a new position
   * @param {module:AWT.Point} pt - The new position
   * @param {boolean} forcePaint - When `true`, forces the repaint of all the area also if there is
   * no movement at all.
   */
  moveTo(pt, forcePaint) {
    if (!this.active || !forcePaint && this.dest.equals(pt))
      return;

    // Restore the background
    if (this.bgRect) {
      if (this.bgImg) {
        this.ctx.putImageData(
          this.bgImg,
          0, 0,
          this.bgRect.pos.x, this.bgRect.pos.y,
          this.bgRect.dim.width, this.bgRect.dim.height);
      } else if (this.parent)
        this.parent.updateContent();
    }

    this.dest.moveTo(pt);

    // Calculate the bounds of the invalidated area after the move:
    // Start with the origin point or box area
    const pt1 = new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Point */ .bR(this.origin.x - this.relativePos.x, this.origin.y - this.relativePos.y);
    this.bgRect = new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Rectangle */ .M_(pt1, this.bx ? this.bx.dim : new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Dimension */ .fg());
    //  Add the destination point or box area
    const pt2 = new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Point */ .bR(pt.x - this.relativePos.x, pt.y - this.relativePos.y);
    this.bgRect.add(new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Rectangle */ .M_(pt2, this.bx ? this.bx.dim : new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Dimension */ .fg()));
    // Add a generous border around the area
    this.bgRect.grow(10, 10);

    if (this.bx !== null) {
      // Move the ActiveBox
      this.bx.moveTo(new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Point */ .bR(pt.x - this.relativePos.x, pt.y - this.relativePos.y));
      this.bx.setTemporaryHidden(false);
      this.bx.update(this.ctx, null);
      this.bx.setTemporaryHidden(true);
    } else {
      // Draw the connecting line
      this.drawLine();
      this.linePainted = true;
    }
  }

  /**
   * Starts the box connector operation
   * @param {module:AWT.Point} pt - Starting point
   * @param {module:boxes/ActiveBox.ActiveBox} [box] -  Passed only when the BoxConnector runs in drag&drop mode
   */
  begin(pt, box) {
    if (this.active)
      this.end();
    this.origin.moveTo(pt);
    this.dest.moveTo(pt);
    this.linePainted = false;
    this.active = true;

    if (box) {
      // Remember what box will be moved, hide it from the panel and repaint all
      this.bx = box;
      this.relativePos.moveTo(pt.x - box.pos.x, pt.y - box.pos.y);
      this.bx.setFocused(true);
      this.bx.setTemporaryHidden(true);
      this.linePainted = false;
      this.parent.invalidate().update();
    }

    // Save the full image currently displayed on the panel (with the box hidden)
    try {
      this.bgImg = this.ctx.getImageData(0, 0, this.dim.width, this.dim.height);
    } catch (_ex) {
      // Avoid "canvas tainted by cross-origin data" errors
      // Setting bgImg to null is less efficient, but works
      this.bgImg = null;
    }
    this.bgRect = null;

    // Make a first movement to make the box appear
    if (box)
      this.moveTo(pt, true);
  }

  /**
   * Finalizes the operation of this box connector until a new call to `begin`
   */
  end() {
    if (!this.active)
      return;

    this.active = false;
    this.linePainted = false;
    this.bgRect = null;
    this.bgImg = null;

    if (this.bx) {
      // Restore the original position and attributes of the box
      this.bx.setFocused(false);
      this.bx.moveTo(this.origin.x - this.relativePos.x, this.origin.y - this.relativePos.y);
      this.bx.setTemporaryHidden(false);
      this.bx = null;
      this.relativePos.moveTo(0, 0);
    }

    // Repaint all
    this.ctx.clearRect(0, 0, this.dim.width, this.dim.height);
    this.parent.invalidate().update();
  }

  /**
   * Strokes a line between `origin` and `dest`, optionally ended with an arrowhead.
   */
  drawLine() {
    if (this.compositeOp !== DEFAULT_COMPOSITE_OP) {
      this.ctx.strokeStyle = this.xorColor;
      this.ctx.globalCompositeOperation = this.compositeOp;
    } else
      this.ctx.strokeStyle = this.lineColor;

    this.ctx.lineWidth = this.lineWidth;

    this.ctx.beginPath();
    this.ctx.moveTo(this.origin.x, this.origin.y);
    this.ctx.lineTo(this.dest.x, this.dest.y);
    this.ctx.stroke();

    if (this.arrow) {
      // Draws the arrow head
      const
        beta = Math.atan2(this.origin.x - this.dest.x, this.dest.x - this.origin.x),
        arp = new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Point */ .bR(this.dest.x - this.arrowLength * Math.cos(beta + this.arrowAngle),
          this.dest.y + this.arrowLength * Math.sin(beta + this.arrowAngle));
      this.ctx.beginPath();
      this.ctx.moveTo(this.dest.x, this.dest.y);
      this.ctx.lineTo(arp.x, arp.y);
      this.ctx.stroke();

      arp.moveTo(this.dest.x - this.arrowLength * Math.cos(beta - this.arrowAngle),
        this.dest.y + this.arrowLength * Math.sin(beta - this.arrowAngle));
      this.ctx.beginPath();
      this.ctx.moveTo(this.dest.x, this.dest.y);
      this.ctx.lineTo(arp.x, arp.y);
      this.ctx.stroke();
    }
    if (this.compositeOp !== DEFAULT_COMPOSITE_OP) {
      // reset default settings
      this.ctx.globalCompositeOperation = DEFAULT_COMPOSITE_OP;
    }
  }
}

Object.assign(BoxConnector.prototype, {
  /**
   * The background image, saved and redrawn on each movement
   * @name module:boxes/BoxConnector.BoxConnector#bgImg
   * @type {external:HTMLImageElement} */
  bgImg: null,
  /**
   * The rectangle of {@link module:Activity.ActivityPanel ActivityPanel} saved in `bgImg`
   * @name module:boxes/BoxConnector.BoxConnector#bgRect
   * @type {module:AWT.Rectangle} */
  bgRect: null,
  /**
   * Initial position of the connector
   * @name module:boxes/BoxConnector.BoxConnector#origin
   * @type {module:AWT.Point} */
  origin: null,
  /**
   * Current (while moving) and final position of the connector
   * @name module:boxes/BoxConnector.BoxConnector#dest
   * @type {module:AWT.Point} */
  dest: null,
  /**
   * When `true`, the connector must end on arrowhead
   * @name module:boxes/BoxConnector.BoxConnector#arrow
   * @type {boolean} */
  arrow: false,
  /**
   * `true` while the connector is active
   * @name module:boxes/BoxConnector.BoxConnector#active
   * @type {boolean} */
  active: false,
  /**
   * `true` while the line has already been painted (used for XOR expressions)
   * @name module:boxes/BoxConnector.BoxConnector#linePainted
   * @type {boolean} */
  linePainted: false,
  /**
   * The arrowhead length (in pixels)
   * @name module:boxes/BoxConnector.BoxConnector#arrowLength
   * @type {number} */
  arrowLength: 10,
  /**
   * The arrowhead angle
   * @name module:boxes/BoxConnector.BoxConnector#arrowAngle
   * @type {number} */
  arrowAngle: Math.PI / 6,
  /**
   * The main color used in XOR operations
   * @name module:boxes/BoxConnector.BoxConnector#lineColor
   * @type {string} */
  lineColor: 'black',
  /**
   * The complementary color used in XOR operations
   * @name module:boxes/BoxConnector.BoxConnector#xorColor
   * @type {string} */
  xorColor: 'white',
  /**
   * The global composite operator used when drawing in XOR mode. Default is "difference".
   * For a list of possible values see:
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation}
   * @name module:boxes/BoxConnector.BoxConnector#compositeOp
   * @type {string} */
  compositeOp: 'difference',
  /**
   * The default {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation composite operator}
   * ("source-over").
   * @name module:boxes/BoxConnector.BoxConnector#DEFAULT_COMPOSITE_OP
   * @static
   * @type {string} */
  DEFAULT_COMPOSITE_OP: DEFAULT_COMPOSITE_OP,
  /**
   * Relative position of point B regarding A
   * @name module:boxes/BoxConnector.BoxConnector#relativePos
   * @type {module:AWT.Point} */
  relativePos: null,
  /**
   * The ActiveBox to connect or move
   * @name module:boxes/BoxConnector.BoxConnector#bx
   * @type {module:boxes/ActiveBox.ActiveBox} */
  bx: null,
  /**
   * The Graphics context where the BoxConnector will paint
   * @name module:boxes/BoxConnector.BoxConnector#ctx
   * @type {external:CanvasRenderingContext2D} */
  ctx: null,
  /**
   * The dimension of the HTML canvas where to draw
   * @name module:boxes/BoxConnector.BoxConnector#dim
   * @type {module:AWT.Dimension} */
  dim: null,
  /**
   * The container to which this connector belongs
   * @name module:boxes/BoxConnector.BoxConnector#parent
   * @type {module:AWT.Container} */
  parent: null,
  /**
   * Width of the connector line
   * @name module:boxes/BoxConnector.BoxConnector#lineWidth
   * @type {number} */
  lineWidth: 1.5,
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BoxConnector);


/***/ })

};
;
//# sourceMappingURL=2160.jclic-node.js.map