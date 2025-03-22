"use strict";
exports.id = 485;
exports.ids = [485,6148];
exports.modules = {

/***/ 485:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports OrderText, OrderTextPanel */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Activity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1567);
/* harmony import */ var _TextActivityBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(743);
/* harmony import */ var _boxes_BoxConnector_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6148);
/* harmony import */ var _AWT_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7912);
/**
 *  File    : activities/text/OrderText.js
 *  Created : 20/06/2015
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
 * In this type of text activity users must put in order some words or paragraphs that have been
 * initially shuffled.
 * @extends module:activities/text/TextActivityBase.TextActivityBase
 */
class OrderText extends _TextActivityBase_js__WEBPACK_IMPORTED_MODULE_2__/* .TextActivityBase */ .q {
  /**
   * OrderText constructor
   * @param {module:project/JClicProject.JClicProject} project - The project to which this activity belongs
   */
  constructor(project) {
    super(project);
  }

  /**
   * Whether or not the activity uses random to shuffle internal components
   * @override
   * @returns {boolean}
   */
  hasRandom() {
    return true;
  }

  /**
   * When `true`, the activity must always be shuffled
   * @override
   * @returns {boolean}
   */
  shuffleAlways() {
    return true;
  }

  /**
   * Whether the activity allows the user to request help.
   * @override
   * @returns {boolean}
   */
  helpSolutionAllowed() {
    return true;
  }
}

Object.assign(OrderText.prototype, {
  /**
   * Whether to allow or not to shuffle words among different paragraphs.
   * @name module:activities/text/OrderText.OrderText#amongParagraphs
   * @type {boolean} */
  amongParagraphs: false,
  /**
   * The box connector
   * @name module:activities/text/OrderText.OrderText#bc
   * @type {module:boxes/BoxConnector.BoxConnector} */
  bc: null,
});

/**
 * The {@link module:activities/text/TextActivityBase.TextActivityBasePanel TextActivityBasePanel} where {@link module:activities/text/OrderText.OrderText OrderText} activities are played.
 * @extends module:activities/text/TextActivityBase.TextActivityBasePanel
 */
class OrderTextPanel extends _TextActivityBase_js__WEBPACK_IMPORTED_MODULE_2__/* .TextActivityBasePanel */ .c {
  /**
   * OrderTextPanel constructor
   * @param {module:Activity.Activity} act - The {@link module:Activity.Activity Activity} to which this Panel belongs
   * @param {module:JClicPlayer.JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
   * @param {external:jQuery} [$div] - The jQuery DOM element where this Panel will deploy
   */
  constructor(act, ps, $div) {
    super(act, ps, $div);
  }

  /**
   * Prepares the text panel
   * @override
   */
  buildVisualComponents() {
    this.act.document.style['target'].css.cursor = 'pointer';
    super.buildVisualComponents();
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
    if (!this.act.dragCells) {
      // Create the main canvas
      this.$canvas = jquery__WEBPACK_IMPORTED_MODULE_0___default()(`<canvas width="${rect.dim.width}" height="${rect.dim.height}"/>`).css({
        position: 'absolute',
        top: 0,
        left: 0,
        'pointer-events': 'none'
      });
      this.$div.append(this.$canvas);

      // Create a [BoxConnector](BoxConnector.html) and attach it to the canvas context
      this.bc = new _boxes_BoxConnector_js__WEBPACK_IMPORTED_MODULE_3__["default"](this, this.$canvas);
      this.bc.compositeOp = this.bc.DEFAULT_COMPOSITE_OP;

      // Repaint all
      this.invalidate().update();
    }
  }

  /**
   * Creates a target DOM element for the provided target.
   * @override
   * @param {module:activities/text/TextActivityDocument.TextTarget} target - The target related to the DOM object to be created
   * @param {external:jQuery} $span -  - An initial DOM object (usually a `span`) that can be used
   * to store the target, or replaced by another type of object.
   * @returns {external:jQuery} - The jQuery DOM element loaded with the target data.
   */
  $createTargetElement(target, $span) {
    super.$createTargetElement(target, $span);
    const idLabel = `target${`000${this.targets.length - 1}`.slice(-3)}`;
    $span.addClass('JClicTextTarget').bind('click', event => {
      event.textTarget = target;
      event.idLabel = idLabel;
      this.processEvent(event);
    });
    return $span;
  }

  /**
   * Swaps the position of two targets in the document
   * @param {module:activities/text/TextActivityDocument.TextTarget} t1 - One target
   * @param {module:activities/text/TextActivityDocument.TextTarget} t2 - Another target
   */
  swapTargets(t1, t2) {
    const
      $span1 = t1.$span,
      $span2 = t2.$span,
      $marker = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<span/>');
    $marker.insertAfter($span2);
    $span2.detach();
    $span2.insertAfter($span1);
    $span1.detach();
    $span1.insertAfter($marker);
    $marker.remove();

    const
      pos = t1.pos,
      $p = t1.$p;
    t1.pos = t2.pos;
    t1.$p = t2.$p;
    t2.pos = pos;
    t2.$p = $p;
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
  }

  /**
   * Called when the activity starts playing
   * @override
   */
  startActivity() {
    super.startActivity();
    if (!this.showingPrevScreen) {
      if (this.act.type === 'orderWords' && !this.act.amongParagraphs) {
        // Group targets by paragraph
        const groups = [];
        let
          lastTarget = null,
          currentGroup = [];
        this.targets.forEach(t => {
          if (lastTarget !== null && lastTarget.$p !== t.$p) {
            groups.push(currentGroup);
            currentGroup = [];
          }
          currentGroup.push(t);
          lastTarget = t;
        });
        if (currentGroup.length > 0)
          groups.push(currentGroup);

        // Scramble group by group
        groups.forEach(group => this.shuffleTargets(group, this.act.shuffles));
      } else
        this.shuffleTargets(this.targets, this.act.shuffles);

      this.playing = true;
    }
    this.setBounds(this);
  }

  /**
   * Randomly shuffles a set of targets
   * @param {module:activities/text/TextActivityDocument.TextTarget[]} targets - The set of targets to shuffle (can be all
   * document targets or just the targets belonging to the same paragraph, depending on the value of
   * `amongParagraphs` in {@link module:Activity.Activity Activity}.
   * @param {number} steps - The number of times to shuffle the elements
   */
  shuffleTargets(targets, steps) {
    const nt = targets.length;
    if (nt > 1) {
      let repeatCount = 100;
      for (let i = 0; i < steps; i++) {
        const
          r1 = Math.floor(Math.random() * nt),
          r2 = Math.floor(Math.random() * nt);
        if (r1 !== r2) {
          this.swapTargets(targets[r1], targets[r2]);
        } else {
          if (--repeatCount)
            i++;
        }
      }
    }
  }

  /**
   * Sets the current target
   * @param {module:activities/text/TextActivityDocument.TextTarget} target - The currently selected target. Can be `null`.
   */
  setCurrentTarget(target) {
    const targetCss = this.act.document.getFullStyle('target').css;
    if (this.currentTarget && this.currentTarget.$span)
      this.currentTarget.$span.css(targetCss);
    if (target && target.$span) {
      target.$span.css({
        color: targetCss['background-color'],
        'background-color': targetCss.color
      });
    }
    this.currentTarget = target;
  }

  /**
   * Counts the number of targets that are at right position
   * @returns {number}
   */
  countSolvedTargets() {
    return this.targets.filter(({ num, pos }) => num === pos).length;
  }

  /**
   * Evaluates all the targets in this panel. This method is usually called from the `Check` button.
   * @override
   * @returns {boolean} - `true` when all targets are OK, `false` otherwise.
   */
  evaluatePanel() {
    if (this.bc && this.bc.active)
      this.bc.end();
    this.setCurrentTarget(null);

    let targetsOk = 0;
    this.targets.forEach(target => {
      const ok = target.num === target.pos;
      target.targetStatus = ok ? 'SOLVED' : 'WITH_ERROR';
      if (ok)
        targetsOk++;
      target.checkColors();
      this.ps.reportNewAction(this.act, 'PLACE', target.text, target.pos, ok, targetsOk);
    });
    if (targetsOk === this.targets.length) {
      this.finishActivity(true);
      return true;
    } else {
      this.playEvent('finishedError');
    }
    return false;
  }

  /**
   * Ordinary ending of the activity, usually called form `processEvent`
   * @override
   * @param {boolean} result - `true` if the activity was successfully completed, `false` otherwise
   */
  finishActivity(result) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.JClicTextTarget').css('cursor', 'pointer');
    return super.finishActivity(result);
  }

  /**
   * Main handler used to process mouse, touch, keyboard and edit events.
   * @override
   * @param {external:Event} event - The HTML event to be processed
   * @returns {boolean} - When this event handler returns `false`, jQuery will stop its
   * propagation through the DOM tree. See: {@link http://api.jquery.com/on}
   */
  processEvent(event) {
    if (!super.processEvent(event))
      return false;

    const target = event.textTarget;
    let p = null;
    if (this.bc && this.playing && !this.showingPrevScreen) {
      //
      // _touchend_ event don't provide pageX nor pageY information
      if (event.type === 'touchend')
        p = this.bc.active ? this.bc.dest.clone() : new _AWT_js__WEBPACK_IMPORTED_MODULE_4__/* .Point */ .bR();
      else {
        // Touch events can have more than one touch, so `pageX` must be obtained from `touches[0]`
        const
          x = event.originalEvent.touches ? event.originalEvent.touches[0].pageX : event.pageX,
          y = event.originalEvent.touches ? event.originalEvent.touches[0].pageY : event.pageY;
        p = new _AWT_js__WEBPACK_IMPORTED_MODULE_4__/* .Point */ .bR(x - this.$div.offset().left, y - this.$div.offset().top);
      }

      switch (event.type) {
        case 'click':
          if (target && target !== this.currentTarget) {
            if (this.currentTarget) {
              if (this.bc && this.bc.active)
                this.bc.end();
              this.swapTargets(target, this.currentTarget);
              this.setCurrentTarget(null);

              if (!this.$checkButton) {
                // Check and notify action
                const
                  cellsAtPlace = this.countSolvedTargets(),
                  ok = target.pos === target.num;
                this.ps.reportNewAction(this.act, 'PLACE', target.text, target.pos, ok, cellsAtPlace);

                // End activity or play event sound
                if (ok && cellsAtPlace === this.targets.length)
                  this.finishActivity(true);
                else
                  this.playEvent(ok ? 'actionOk' : 'actionError');
              }
            } else {
              this.setCurrentTarget(target);
              this.bc.begin(p);
              this.playEvent('click');
            }
          }
          break;

        case 'mousemove':
          this.bc.moveTo(p);
          break;

        default:
          break;
      }
      event.preventDefault();
      return true;
    }
  }
}

// Properties and methods specific to OrderTextPanel
Object.assign(OrderTextPanel.prototype, {
  /**
   * Currently selected text target
   * @name module:activities/text/OrderText.OrderTextPanel#currentTarget
   * @type {module:activities/text/TextActivityDocument.TextActivityDocument.TextTarget} */
  currentTarget: null,
  /**
   * The box connector
   * @name module:activities/text/OrderText.OrderTextPanel#bc
   * @type {module:boxes/BoxConnector.BoxConnector} */
  bc: null,
  /**
   * List of mouse, touch and keyboard events intercepted by this panel
   * @override
   * @name module:activities/text/OrderText.OrderTextPanel#events
   * @type {string[]} */
  events: ['click', 'mousemove'],
});

/**
 * Panel class associated to this type of activity: {@link module:activities/text/OrderText.OrderTextPanel OrderTextPanel}
 * @type {class} */
OrderText.Panel = OrderTextPanel;

// Register activity class
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Activity_js__WEBPACK_IMPORTED_MODULE_1__["default"].registerClass('@text.Order', OrderText));


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
//# sourceMappingURL=485.jclic-node.js.map