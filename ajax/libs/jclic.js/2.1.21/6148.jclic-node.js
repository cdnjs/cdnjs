"use strict";
exports.id = 6148;
exports.ids = [6148];
exports.modules = {

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
//# sourceMappingURL=6148.jclic-node.js.map