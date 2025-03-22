"use strict";
exports.id = 5312;
exports.ids = [5312];
exports.modules = {

/***/ 5312:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ textGrid_CrossWord)
});

// UNUSED EXPORTS: CrossWord, CrossWordPanel

// EXTERNAL MODULE: external "jquery"
var external_jquery_ = __webpack_require__(7750);
var external_jquery_default = /*#__PURE__*/__webpack_require__.n(external_jquery_);
// EXTERNAL MODULE: ./src/Activity.js
var Activity = __webpack_require__(1567);
// EXTERNAL MODULE: ./src/boxes/BoxBase.js
var BoxBase = __webpack_require__(3018);
// EXTERNAL MODULE: ./src/boxes/BoxBag.js
var BoxBag = __webpack_require__(9205);
// EXTERNAL MODULE: ./src/boxes/TextGrid.js
var TextGrid = __webpack_require__(4123);
// EXTERNAL MODULE: ./src/boxes/AbstractBox.js
var AbstractBox = __webpack_require__(9513);
// EXTERNAL MODULE: ./src/boxes/ActiveBox.js
var ActiveBox = __webpack_require__(1725);
// EXTERNAL MODULE: ./src/AWT.js
var AWT = __webpack_require__(7912);
// EXTERNAL MODULE: ./src/Utils.js
var Utils = __webpack_require__(1253);
;// ./src/activities/textGrid/icons/hIcon.svg
const hIcon_namespaceObject = "<svg fill=\"#FFFFFF\" height=\"36\" viewBox=\"0 0 24 24\" width=\"36\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z\" />\n</svg>\n";
;// ./src/activities/textGrid/icons/vIcon.svg
const vIcon_namespaceObject = "<svg fill=\"#FFFFFF\" height=\"36\" viewBox=\"0 0 24 24\" width=\"36\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z\" />\n</svg>\n";
;// ./src/activities/textGrid/CrossWord.js
/**
 *  File    : activities/textGrid/CrossWord.js
 *  Created : 17/06/2015
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











// Use Webpack to import SVG files



/**
 * This class of {@link module:Activity.Activity Activity} shows a {@link module:boxes/TextGrid.TextGrid TextGrid} initially empty, with some cells
 * marked in negative color that act as word stoppers. A blinking "cursor" indicates the cell that
 * will receive the next character entered by the user on the keyboard.
 *
 * The letter in each cell of the grid is always shared by two words: one in horizontal direction
 * and the other one in vertical direction. Two {@link module:boxes/ActiveBox.ActiveBox ActiveBox} objects are placed next to the
 * {@link module:boxes/TextGrid.TextGrid TextGrid}, hosting the definitions of the horizontal and vertical words crossing at the
 * cell currently marked by the cursor.
 *
 * Two special buttons placed near this boxes allow to write on the grid horizontally or vertically.
 * The aim of the activity is to fill all the text grid with the correct words.
 * @extends module:Activity.Activity
 */
class CrossWord extends Activity/* Activity */.I {
  /**
   * CrossWord constructor
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
    return this.tgc.getNumChars() - this.tgc.countWildChars();
  }

  /**
   * Crossword activities always make use of the keyboard
   * @override
   * @returns {boolean}
   */
  needsKeyboard() {
    return true;
  }
}

Object.assign(CrossWord.prototype, {
  /**
   * Whether all letters of the {@link module:boxes/TextGrid.TextGrid TextGrid} should be displayed in upper case
   * @name module:activities/textGrid/CrossWord.CrossWord#upperCase
   * @type {boolean} */
  upperCase: true,
  /**
   * Whether the case is significant to evaluate answers
   * @name module:activities/textGrid/CrossWord.CrossWord#checkCase
   * @type {boolean} */
  checkCase: true,
  /**
   * When `true`, the wildcard character of the {@link module:boxes/TextGrid.TextGrid TextGrid} will be transparent.
   * @name module:activities/textGrid/CrossWord.CrossWord#wildTransparent
   * @type {boolean} */
  wildTransparent: false,
});

/**
 * The {@link module:Activity.ActivityPanel ActivityPanel} where {@link module:activities/textGrid/CrossWord.CrossWord CrossWord} activities are played.
 * @extends module:Activity.ActivityPanel
 */
class CrossWordPanel extends Activity/* ActivityPanel */.S {
  /**
   * CrossWordPanel constructor
   * @param {module:Activity.Activity} act - The {@link module:Activity.Activity Activity} to which this Panel belongs
   * @param {module:JClicPlayer.JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
   * @param {external:jQuery} [$div] - The jQuery DOM element where this Panel will deploy
   */
  constructor(act, ps, $div) {
    super(act, ps, $div);
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
    if (this.style) {
      this.style.end();
      this.style = null;
    }
  }

  /**
   * Creates a {@link module:boxes/BoxBag.BoxBag BoxBag} with a label ("Horizontal" or "Vertical") and an {@link module:boxes/ActiveBox.ActiveBox ActiveBox}
   * that will be used to display clues.
   * @param {string} type - `acrossClues` for horizontal clues, 'downClues' for vertical.
   * @returns {module:boxes/BoxBag.BoxBag}
   */
  createBoxBag(type) {
    const
      bxb = new BoxBag["default"](null, this, null),
      sb = new AbstractBox["default"](bxb, this, this.icoBB);

    sb.setBounds(0, 0, this.LABEL_WIDTH, this.act.abc[type].h);
    const $btn = external_jquery_default()('<button/>', { class: 'StockBtn' }).css({
      'width': this.LABEL_WIDTH,
      'height': this.act.abc[type].h,
      'background-image': `url(${type === 'acrossClues' ? this.hIcon : this.vIcon})`,
      'background-repeat': 'no-repeat',
      'background-position': 'center',
      'border-radius': 6,
      'z-index': 10
    }).on('click', () => {
      this.advance = type === 'acrossClues' ?
        this.advance === 'ADVANCE_RIGHT' ?
          'NO_ADVANCE' : 'ADVANCE_RIGHT' :
        this.advance === 'ADVANCE_DOWN' ?
          'NO_ADVANCE' : 'ADVANCE_DOWN';
      this.setBtnStatus();
    }).on('keypress', event => {
      if (String.fromCharCode(event.charCode || event.keyCode) === ' ')
        event.stopPropagation();
    }).appendTo(this.$div);

    sb.setHostedComponent($btn);
    bxb.addBox(sb);

    const ab = new ActiveBox["default"](bxb, null, null, type, new AWT/* Rectangle */.M_(this.LABEL_WIDTH + this.act.margin, 0, this.act.abc[type].w, this.act.abc[type].h));
    bxb.addBox(ab);
    bxb.setBoxBase(this.act.abc[type].style);

    if (type === 'acrossClues') { // Horizontal
      this.hClue = ab;
      this.hClueBtn = sb;
    } else {
      this.vClue = ab;
      this.vClueBtn = sb;
    }
    return bxb;
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
      abcH = this.act.abc['acrossClues'],
      abcV = this.act.abc['downClues'];

    if (abcH.image)
      abcH.setImgContent(this.act.project.mediaBag, null, false);
    if (abcV.image)
      abcV.setImgContent(this.act.project.mediaBag, null, false);

    if (this.act.acp !== null) {
      this.act.acp.generateContent(0, 0, this.act.abc, false);
    }

    if (tgc) {
      this.grid = TextGrid["default"].createEmptyGrid(null, this, this.act.margin, this.act.margin, tgc, this.act.wildTransparent);
      this.style = new BoxBag["default"](null, this, null);
      const
        bxbh = this.createBoxBag('acrossClues'),
        bxbv = this.createBoxBag('downClues');
      if (this.act.boxGridPos === 'AUB' || this.act.boxGridPos === 'BUA')
        bxbv.moveTo(new AWT/* Point */.bR(bxbh.dim.width + this.act.margin, 0));
      else
        bxbv.moveTo(new AWT/* Point */.bR(0, bxbh.dim.height + this.act.margin));
      this.style.addBox(bxbh);
      this.style.addBox(bxbv);
      this.grid.setVisible(true);
      this.style.setVisible(true);
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
      this.numLetters = this.act.getMinNumActions();
      this.grid.setCellAttributes(true, true);
      this.grid.setCursorEnabled(true);
      this.setCursorAt(0, 0);
      this.advance = 'ADVANCE_RIGHT';
      this.setBtnStatus();
      this.setAndPlayMsg('initial', 'start');
      this.invalidate().update();
      this.$div.attr("tabindex", 0);
      this.$div.focus();
      this.playing = true;
    }
  }

  /**
   * Calculates the current score
   * @returns {number}
   */
  getCurrentScore() {
    return this.grid ? this.grid.countCoincidences(this.act.checkCase) : 0;
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
        dirtyRegion = new AWT/* Rectangle */.M_(0, 0, canvas.width, canvas.height);
      ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
      this.grid.update(ctx, dirtyRegion);
      this.style.update(ctx, dirtyRegion);
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
    return !this.grid || !this.style || this.getBounds().equals(preferredMaxSize) ?
      preferredMaxSize :
      BoxBag["default"].layoutDouble(preferredMaxSize, this.grid, this.style, this.act.boxGridPos, this.act.margin);
  }

  /**
   * Sets the size and position of this activity panel
   * @override
   * @param {module:AWT.Rectangle} rect
   */
  setBounds(rect) {
    if (this.$canvas) {
      this.$canvas.remove();
      this.$canvas = null;
    }
    super.setBounds(rect);

    if (this.grid) {
      // Create the main canvas
      this.$canvas = external_jquery_default()(`<canvas width="${rect.dim.width}" height="${rect.dim.height}"/>`).css({
        position: 'absolute',
        top: 0,
        left: 0
      });
      this.$div.append(this.$canvas);
      // Repaint all
      this.invalidate().update();
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
      switch (event.type) {
        case 'click':
          //
          // The [AWT.Point](AWT.html#Point) where the mouse or touch event has been originated
          // Touch events can have more than one touch, so `pageX` must be obtained from `touches[0]`
          const
            x = event.originalEvent && event.originalEvent.touches ? event.originalEvent.touches[0].pageX : event.pageX,
            y = event.originalEvent && event.originalEvent.touches ? event.originalEvent.touches[0].pageY : event.pageY,
            p = new AWT/* Point */.bR(x - this.$div.offset().left, y - this.$div.offset().top),
            // Array to be filled with actions to be executed at the end of event processing
            delayedActions = [];

          this.ps.stopMedia(1);
          if (this.grid.contains(p)) {
            const pt = this.grid.getLogicalCoords(p);
            if (pt !== null) {
              this.setCursorAt(pt.x, pt.y);
              if (Utils/* settings */.W0.TOUCH_DEVICE) {
                // We are in a touch device, so prompt user to write text:
                const d = this.advance === 'ADVANCE_DOWN';
                const txt = window.prompt(`${d ? 'Vertical' : 'Horizontal'} word:`, '');
                this.writeChars(txt);
              }
            }
          } else if (this.hClue.contains(p))
            this.hClue.playMedia(this.ps, delayedActions);
          else if (this.vClue.contains(p))
            this.vClue.playMedia(this.ps, delayedActions);
          else
            break;

          this.update();
          delayedActions.forEach(action => action());
          break;

        case 'keypress':
          const code = event.charCode || event.keyCode;
          if (code && this.grid.getCursor()) {
            event.preventDefault();
            this.writeChars(String.fromCharCode(code));
          }
          break;

        case 'keydown':
          let dx = 0, dy = 0;
          switch (event.keyCode) {
            case Utils/* settings */.W0.VK.RIGHT:
              dx = 1;
              break;
            case Utils/* settings */.W0.VK.LEFT:
              dx = -1;
              break;
            case Utils/* settings */.W0.VK.DOWN:
              dy = 1;
              break;
            case Utils/* settings */.W0.VK.UP:
              dy = -1;
              break;
          }
          if (dx || dy) {
            event.preventDefault();
            this.moveCursor(dx, dy);
            this.update();
          }
          break;
      }
    }
  }

  /**
   * Moves the cursor the specified `dx` and `dy` amount (in logical coordinates)
   * @param {number} dx - Amount of cells to horizontally move on
   * @param {number} dy - Amount of cells to vertically move on
   */
  moveCursor(dx, dy) {
    if (this.grid) {
      this.grid.moveCursor(dx, dy, true);
      this.cursorPosChanged();
    }
  }

  /**
   * Places the cursor at the specified location (in logical coordinates)
   * @param {number} x
   * @param {number} y
   */
  setCursorAt(x, y) {
    this.grid.setCursorAt(x, y, true);
    this.cursorPosChanged();
  }

  /**
   * Method called when the cursor moves to a different location
   */
  cursorPosChanged() {
    const pt = this.grid.getCursor();
    if (pt !== null && this.style !== null) {
      const items = this.grid.getItemFor(pt.x, pt.y);
      if (items !== null) {
        this.hClue.setContent(this.act.abc['acrossClues'].getActiveBoxContentWith(pt.y, items.x));
        this.vClue.setContent(this.act.abc['downClues'].getActiveBoxContentWith(pt.x, items.y));
      }
    }
  }

  /**
   * Writes a string on the grid starting at the current cursor position and
   * following the direction marked by the `advance` field
   * @param {string} txt - Text to write
   */
  writeChars(txt) {
    if (txt && txt.length > 0) {
      for (let i = 0; i < txt.length; i++) {
        const cur = this.grid.getCursor();
        let ch = txt.charAt(i);
        if (this.act.upperCase)
          ch = ch.toLocaleUpperCase();
        this.grid.setCharAt(cur.x, cur.y, ch);
        const
          ok = this.grid.isCellOk(cur.x, cur.y, this.act.checkCase),
          r = this.getCurrentScore();
        this.ps.reportNewAction(this.act, 'WRITE', ch, `X:${cur.x} Y:${cur.y}`, ok, r);
        // End activity or play event sound
        if (r === this.numLetters) {
          this.grid.setCursorEnabled(false);
          this.grid.stopCursorBlink();
          this.finishActivity(true);
        } else {
          this.playEvent('click');
          if (this.advance === 'ADVANCE_DOWN')
            this.moveCursor(0, 1);
          else if (this.advance === 'ADVANCE_RIGHT')
            this.moveCursor(1, 0);
        }
      }
    }
    this.update();
  }

  /**
   * Sets the status of horizontal and vertical buttons based on the value of `advance`
   */
  setBtnStatus() {
    if (this.hClueBtn)
      this.hClueBtn.setInactive(this.advance !== 'ADVANCE_RIGHT');
    if (this.vClueBtn)
      this.vClueBtn.setInactive(this.advance !== 'ADVANCE_DOWN');
  }
}

Object.assign(CrossWordPanel.prototype, {
  /**
   * The default width of the 'Horizontal' and 'Vertical' buttons (currently 40 pixels)
   * @name module:activities/textGrid/CrossWord.CrossWordPanel#LABEL_WIDTH
   * @type {number} */
  LABEL_WIDTH: 40,
  /**
   * The text grid of this ActivityPanel
   * @name module:activities/textGrid/CrossWord.CrossWordPanel#grid
   * @type {module:boxes/TextGrid.TextGrid} */
  grid: null,
  /**
   * A BoxBag used to place the across and down clues, and the `toggle direction` button.
   * @name module:activities/textGrid/CrossWord.CrossWordPanel#style
   * @type {module:boxes/BoxBag.BoxBag} */
  style: null,
  /**
   * The total number of letters of this cross word
   * @name module:activities/textGrid/CrossWord.CrossWordPanel#numLetters
   * @type {number} */
  numLetters: 0,
  /**
   * Flag indicating the type of automatic advance of the cursor.
   * Possible values are: `NO_ADVANCE` (default), 'ADVANCE_RIGHT' and 'ADVANCE_DOWN'.
   * TODO: Implement 'ADVANCE_LEFT' for LTR languages
   * @name module:activities/textGrid/CrossWord.CrossWordPanel#advance
   * @type {string} */
  advance: 'NO_ADVANCE',
  /**
   * The ActiveBox object used to display the 'across' clues
   * @name module:activities/textGrid/CrossWord.CrossWordPanel#hClue
   * @type {module:boxes/ActiveBox.ActiveBox} */
  hClue: null,
  /**
   * The ActiveBox object used to display the 'down' clues
   * @name module:activities/textGrid/CrossWord.CrossWordPanel#vClue
   * @type {module:boxes/ActiveBox.ActiveBox} */
  vClue: null,
  /**
   * Button used to set the advance mode to 'ADVANCE_RIGHT'
   * @name module:activities/textGrid/CrossWord.CrossWordPanel#hClueBtn
   * @type {module:boxes/ActiveBox.ActiveBox} */
  hClueBtn: null,
  /**
   * Button used to set the advance mode to 'ADVANCE_BOTTOM'
   * @name module:activities/textGrid/CrossWord.CrossWordPanel#vClueBtn
   * @type {module:boxes/ActiveBox.ActiveBox} */
  vClueBtn: null,
  /**
   * Mouse and touch events intercepted by this panel
   * @override
   * @name module:activities/textGrid/CrossWord.CrossWordPanel#events
   * @type {string[]} */
  events: ['click', 'keydown', 'keypress'],
  /**
   * Graphic icon for the horizontal direction button, represented as a string containing
   * an SVG file codified in base64.
   * @name module:activities/textGrid/CrossWord.CrossWordPanel#hIcon
   * @type {string} */
  hIcon: (0,Utils/* svgToURI */.g8)(hIcon_namespaceObject),
  /**
   * Graphic icon for the vertical direction button, represented as a string containing
   * an SVG file codified in base64.
   * @name module:activities/textGrid/CrossWord.CrossWordPanel#vIcon
   * @type {string} */
  vIcon: (0,Utils/* svgToURI */.g8)(vIcon_namespaceObject),
  /**
   * Sizes of the icons (currently 36 x 36 pixel)
   * @name module:activities/textGrid/CrossWord.CrossWordPanel#icoSize
   * @type {object} */
  icoSize: { w: 36, h: 36 },
  /**
   * BoxBase with the style to be used by the direction buttons.
   * @name module:activities/textGrid/CrossWord.CrossWordPanel#icoBB
   * @type {module:boxes/BoxBase.BoxBase} */
  icoBB: new BoxBase["default"]().set('backColor', '#4285F4').set('inactiveColor', '#70A2F6').set('dontFill', true)
});

/**
 * Panel class associated to this type of activity: {@link module:activities/textGrid/CrossWord.CrossWordPanel CrossWordPanel}
 * @type {class} */
CrossWord.Panel = CrossWordPanel;

// Register activity class
/* harmony default export */ const textGrid_CrossWord = (Activity/* Activity */.I.registerClass('@textGrid.CrossWord', CrossWord));


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
//# sourceMappingURL=5312.jclic-node.js.map