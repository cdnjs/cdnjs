"use strict";
exports.id = 9513;
exports.ids = [9513];
exports.modules = {

/***/ 9513:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export AbstractBox */
/* harmony import */ var _AWT_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7912);
/* harmony import */ var _BoxBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3018);
/**
 *  File    : boxes/AbstractBox.js
 *  Created : 18/04/2015
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
 * This abstract class is the base for most graphic components of JClic. It describes an area
 * (by default an {@link module:AWT.Rectangle}) with some special properties that determine how it must
 * be drawn on screen.
 *
 * Some types of boxes can act as containers for other boxes, establishing a hierarchy of dependences.
 * @abstract
 * @extends module:AWT.Rectangle
 */
class AbstractBox extends _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Rectangle */ .M_ {
  /**
   * AbstractBox constructor
   * @param {module:AbstractBox} parent - The AbstractBox to which this one belongs
   * @param {module:AWT.Container} container - The container where this box is placed.
   * @param {module:BoxBase} boxBase - The object where colors, fonts, border and other graphic properties
   * of this box are defined.
   */
  constructor(parent, container, boxBase) {
    // AbstractBox extends AWT.Rectangle
    super();
    this.container = container;
    this.parent = parent;
    this.boxBase = boxBase;
    this.shape = this;
    this.specialShape = false;
    this.visible = true;
  }

  /**
   * Setter method for `parent`
   * @param {module:boxes/AbstractBox.AbstractBox} parent - The new parent of this box
   */
  setParent(parent) {
    this.parent = parent;
  }

  /**
   * Gets the current parent of this box
   * @returns {module:boxes/AbstractBox.AbstractBox}
   */
  getParent() {
    return this.parent;
  }

  /**
   * Finisher method
   */
  end() {
  }

  /**
   * Setter method for `container`
   * @param {module:AWT.Container} newContainer - The new Container assigned to this box
   */
  setContainer(newContainer) {
    this.container = newContainer;
    if (this.$hostedComponent && this.container && this.container.$div) {
      this.$hostedComponent.detach();
      this.container.$div.append(this.$hostedComponent);
    }
  }

  /**
   * Gets the `container` attribute of this box, without checking its parent
   * @returns {module:AWT.Container}
   */
  getContainerX() {
    return this.container;
  }

  /**
   * Gets the container associated to this box, asking its parents when `null`.
   * @returns {module:AWT.Container}
   */
  getContainerResolve() {
    let ab = this;
    while (ab.container === null && ab.parent !== null)
      ab = ab.parent;
    return ab.container;
  }

  /**
   * Invalidates the zone corresponding to this box in the associated {@link module:AWT.Container}, if any.
   * @param {module:AWT.Rectangle} rect - The rectangle to be invalidated. When `null`, it's the full
   * container area.
   */
  invalidate(rect) {
    const cnt = this.getContainerResolve();
    if (cnt)
      cnt.invalidate(rect);
  }

  /**
   * Sets the {@link module:boxes/BoxBase.BoxBase BoxBase} of this box
   * @param {module:boxes/BoxBase.BoxBase} boxBase - The new BoxBase
   */
  setBoxBase(boxBase) {
    this.boxBase = boxBase;
    this.invalidate();
  }

  /**
   * Gets the real {@link module:boxes/BoxBase.BoxBase BoxBase} associated to this box, scanning down parent relationships.
   * @returns {module:boxes/BoxBase.BoxBase}
   */
  getBoxBaseResolve() {
    let ab = this;
    while (!ab.boxBase && ab.parent)
      ab = ab.parent;
    return ab.boxBase || _BoxBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].DEFAULT_BOX_BASE;
  }

  /**
   * Sets the shape used to draw the content of this box
   * @param {module:AWT.Shape} sh - The shape to be set
   */
  setShape(sh) {
    this.shape = sh;
    this.specialShape = true;
    this.invalidate();
    super.setBounds(sh.getBounds());
    this.invalidate();
  }

  /**
   * Gets the current shape used in this box
   * @returns {module:AWT.Shape}
   */
  getShape() {
    return this.shape;
  }

  /**
   * Check if this box contains the specified point
   * @override
   * @param {module:AWT.Point} p - The point to be checked
   * @returns {boolean}
   */
  contains(p) {
    return this.shape === this ? super.contains(p) : this.shape.contains(p);
  }

  /**
   * Sets a new size and/or dimension to this box
   * @override
   * @param {AWT.Rectangle|number} rect - An AWT.Rectangle object, or the `x` coordinate of the
   * upper-left corner of a new rectangle.
   * @param {number} [y] - `y` coordinate of the upper-left corner of the new rectangle.
   * @param {number} [w] - Width of the new rectangle.
   * @param {number} [h] - Height of the new rectangle.
   */
  setBounds(rect, y, w, h) {
    if (typeof rect === 'number')
      // arguments are co-ordinates and size
      rect = new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Rectangle */ .M_(rect, y, w, h);
    // Rectangle comparision
    if (this.equals(rect))
      return;

    const sizeChanged = !this.dim.equals(rect.dim);
    if (this.specialShape) {
      if (sizeChanged) {
        this.shape.scaleBy(new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Dimension */ .fg(rect.dim.width / this.dim.width, rect.dim.height / this.dim.height));
        this.setShape(this.shape);
      }
      if (!this.pos.equals(rect.pos)) {
        this.shape.moveTo(rect.pos);
      }
      this.setShape(this.shape);
    } else
      super.setBounds(rect);

    if (this.$hostedComponent)
      this.setHostedComponentBounds(sizeChanged);

    return this;
  }

  /**
   * Sets a new location for this box. In JClic this method was named `setLocation`
   * @param {AWT.Point|number} newPos - A point or the `x` coordinate of a new point.
   * @param {number} [y] - The `y` coordinate of a new point.
   */
  moveTo(newPos, y) {
    if (typeof newPos === 'number')
      newPos = new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Point */ .bR(newPos, y);
    this.setBounds((new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Rectangle */ .M_(this)).moveTo(newPos));
  }

  /**
   * Sets a new location to this box. In JClic this method was named `translate`.
   * @param {number} dx - The displacement on the X axis
   * @param {number} dy - The displacement on the Y axis
   */
  moveBy(dx, dy) {
    this.setBounds((new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Rectangle */ .M_(this)).moveBy(dx, dy));
  }

  /**
   * Changes the size of this box
   * @param {number} width
   * @param {number} height
   */
  setSize(width, height) {
    this.setBounds(new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Rectangle */ .M_(this.pos, new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Dimension */ .fg(width, height)));
  }

  /**
   * Checks if this box has border
   * @returns {boolean}
   */
  hasBorder() {
    return this.border;
  }

  /**
   * Sets/unsets a border to this box
   * @param {boolean} newVal - `true` to set a border.
   */
  setBorder(newVal) {
    if (!newVal)
      this.invalidate();
    this.border = newVal;
    if (newVal)
      this.invalidate();
  }

  /**
   * Checks if this box is fully visible
   * @returns {boolean}
   */
  isVisible() {
    return this.visible;
  }

  /**
   * Sets this box visible or invisible
   * @param {boolean} newVal - `true` for visible
   */
  setVisible(newVal) {
    this.visible = newVal;
    this.setHostedComponentVisible();
    this.invalidate();
  }

  /**
   * Makes {@link module:boxes/AbstractBox.AbstractBox#$hostedComponent} visible or invisible, based on the value of
   * the AbstractBox `visible` flag.
   */
  setHostedComponentVisible() {
    if (this.$hostedComponent)
      this.$hostedComponent.css('visibility', this.visible ? 'visible' : 'hidden');
  }

  /**
   * Checks if this box is temporary hidden
   * @returns {boolean}
   */
  isTemporaryHidden() {
    return this.temporaryHidden;
  }

  /**
   * Makes this box temporary hidden (newVal `true`) or resets its original state (newVal `false`)
   * @param {boolean} newVal
   */
  setTemporaryHidden(newVal) {
    this.temporaryHidden = newVal;
  }

  /**
   * Checks if this box is currently inactive.
   * @returns {boolean}
   */
  isInactive() {
    return this.inactive;
  }

  /**
   * Makes this box active (`false`) or inactive (`true`)
   * @param {boolean} newVal
   */
  setInactive(newVal) {
    this.inactive = newVal;
    if (this.$hostedComponent) {
      this.setHostedComponentColors();
      this.setHostedComponentVisible();
    } else {
      if (this.$accessibleElement) {
        const disabled = this.isInactive() && !this.accessibleAlwaysActive;
        this.$accessibleElement.prop({
          disabled: disabled,
          tabindex: disabled ? -1 : 0
        });
      }
      this.invalidate();
    }
  }

  /**
   * Checks if this box is in `inverted` state.
   * @returns {boolean}
   */
  isInverted() {
    return this.inverted;
  }


  /**
   * Puts this box in `inverted` mode or restores its original state.
   * @param {boolean} newVal
   */
  setInverted(newVal) {
    this.inverted = newVal;
    if (this.$hostedComponent)
      this.setHostedComponentColors();
    else
      this.invalidate();
  }

  /**
   * Checks if this box is `marked`
   * @returns {boolean}
   */
  isMarked() {
    return this.marked;
  }

  /**
   * Sets this box in `marked` mode, or restores its original state.
   * @param {boolean} newVal
   */
  setMarked(newVal) {
    if (!newVal)
      this.invalidate();
    this.marked = newVal;
    if (this.$hostedComponent) {
      this.setHostedComponentColors();
      this.setHostedComponentBorder();
    } else if (newVal)
      this.invalidate();
  }

  /**
   * Checks if this box has the input focus
   * @returns {boolean}
   */
  isFocused() {
    return this.focused;
  }

  /**
   *
   * Sets or unsets the input focus to this box.
   * @param {boolean} newVal
   */
  setFocused(newVal) {
    if (!newVal)
      this.invalidate();
    this.focused = newVal;
    if (newVal)
      this.invalidate();
    // Put hosted component on top
    if (this.$hostedComponent)
      this.$hostedComponent.css('z-index', this.focused ? 20 : 2);
  }

  /**
   * Checks if this box is in `alternative` state.
   * @returns {boolean}
   */
  isAlternative() {
    return this.alternative;
  }

  /**
   * Sets this box in `alternative` mode, or restores its original state.
   * @param {boolean} newVal
   */
  setAlternative(newVal) {
    this.alternative = newVal;
    this.invalidate();
  }

  /**
   * Draws the content of this box on an HTML `canvas` element. At this level, only background
   * and border are painted/stroked. Derived classes should implement specific drawing tasks in
   * {@link module:boxes/AbstractBox.AbstractBox#updateContent}.
   * @param {external:CanvasRenderingContext2D} ctx - The canvas rendering context used to draw the
   * box content.
   * @param {module:AWT.Rectangle} [dirtyRegion=null] - The area that must be repainted. `null` refers to the whole box.
   */
  update(ctx, dirtyRegion = null) {
    if (this.isEmpty() || !this.isVisible() || this.isTemporaryHidden())
      return false;

    if (dirtyRegion && !this.shape.intersects(dirtyRegion))
      return false;

    /**
     * TODO: Implement clipping
     Shape saveClip=new Area(g2.getClip())
     Area clip=new Area(saveClip)
     clip.intersect(new Area(shape))
     g2.setClip(clip)
     */

    const style = this.getBoxBaseResolve();
    if (!style.transparent && !style.dontFill && !this.tmpTrans) {
      if (!style.bgGradient || style.bgGradient.hasTransparency()) {
        // Prepare the rendering context
        ctx.fillStyle = this.inactive ?
          style.inactiveColor :
          this.inverted ? style.textColor : style.backColor;
        // Fill the shape
        this.shape.fill(ctx, dirtyRegion);
      }
      if (style.bgGradient) {
        ctx.fillStyle = style.bgGradient.getGradient(ctx, this.shape.getBounds());
        this.shape.fill(ctx, dirtyRegion);
      }
      // Reset the canvas context
      ctx.fillStyle = 'black';
    }

    if (!this.$hostedComponent)
      this.updateContent(ctx, dirtyRegion);

    this.drawBorder(ctx);
    return true;
  }

  /**
   * Here is where classes derived from {@link module:boxes/AbstractBox.AbstractBox AbstractBox} should implement the drawing of its
   * content. Background and border are already painted in {@link module:boxes/AbstractBox.AbstractBox#update}.
   * @param {external:CanvasRenderingContext2D} _ctx - The canvas rendering context used to draw the
   * box content.
   * @param {module:AWT.Rectangle} [_dirtyRegion] - The area that must be repainted. `null` refers to the whole box.
   */
  //
  // Abstract method, to be implemented in subclasses
  updateContent(_ctx, _dirtyRegion) {
  }

  /**
   * Draws the box border
   * @param {external:CanvasRenderingContext2D} ctx - The canvas rendering context where the border
   * will be drawn.
   */
  drawBorder(ctx) {
    if (this.border || this.marked) {
      const style = this.getBoxBaseResolve();

      // Prepare stroke settings
      ctx.strokeStyle = style.borderColor;
      style[this.marked ? 'markerStroke' : 'borderStroke'].setStroke(ctx);
      if (this.marked)
        ctx.globalCompositeOperation = 'xor';

      // Draw border
      this.shape.stroke(ctx);

      // Reset ctx default values
      if (this.marked)
        ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = 'black';
      _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Stroke */ .tc.prototype.setStroke(ctx);
    }
  }

  /**
   * Returns the enclosing Rectangle of this box including its border (if any)
   * @returns {module:AWT.Rectangle}
   */
  getBorderBounds() {
    const result = new _AWT_js__WEBPACK_IMPORTED_MODULE_0__/* .Rectangle */ .M_(this.getBounds());
    if (this.border || this.marked) {
      const style = this.getBoxBaseResolve();
      const w = style[this.marked ? 'markerStroke' : 'borderStroke'].lineWidth;
      result.moveBy(-w / 2, -w / 2);
      result.dim.width += w;
      result.dim.height += w;
    }
    return result;
  }

  /**
   * Sets the {@link module:boxes/AbstractBox.AbstractBox#$hostedComponent $hostedComponent} member.
   * @param {external:jQuery} $hc - The jQuery DOM component hosted by this box.
   */
  setHostedComponent($hc) {
    if (this.$hostedComponent)
      this.$hostedComponent.detach();

    this.$hostedComponent = $hc;

    if (this.$hostedComponent) {
      this.setContainer(this.container);
      this.setHostedComponentColors();
      this.setHostedComponentBorder();
      this.setHostedComponentBounds(true);
      this.setHostedComponentVisible();
      this.setFocused(this.focused);
    }
  }

  /**
   * Gets the current {@link module:boxes/AbstractBox.AbstractBox#$hostedComponent|$hostedComponent} member
   * @returns {external:jQuery}
   */
  getHostedComponent() {
    return this.$hostedComponent;
  }

  /**
   * Sets {@link module:boxes/AbstractBox.AbstractBox#$hostedComponent|$hostedComponent} colors and other css properties
   * based on the current {@link module:boxes/BoxBase.BoxBase BoxBase} of this box.
   */
  setHostedComponentColors() {
    if (this.$hostedComponent) {
      const style = this.getBoxBaseResolve();
      const css = style.getCSS(null, this.inactive, this.inverted, this.alternative);
      // Check if cell has background gradient and animated gif
      if (this.$hostedComponent.data('background-image') && css['background-image'])
        css['background-image'] = `${this.$hostedComponent.data('background-image')},${css['background-image']}`;
      this.$hostedComponent.css(css);
    }
  }

  /**
   * Sets the {@link module:boxes/AbstractBox.AbstractBox#$hostedComponent|$hostedComponent} border, based on the current
   * {@link module:boxes/BoxBase.BoxBase BoxBase} of this box.
   */
  setHostedComponentBorder() {
    if (this.$hostedComponent && (this.border || this.marked)) {
      const style = this.getBoxBaseResolve();
      this.$hostedComponent.css({
        'border-width': `${style.get(this.marked ? 'markerStroke' : 'borderStroke').lineWidth}px`,
        'border-style': 'solid',
        'border-color': style.get('borderColor')
      });
    }
  }

  /**
   * Places and resizes {@link module:boxes/AbstractBox.AbstractBox#$hostedComponent|$hostedComponent}, based on the size
   * and position of this box.
   * @param {boolean} _sizeChanged - `true` when this {@link module:boxes/ActiveBox.ActiveBox ActiveBox} has changed its size
   */
  setHostedComponentBounds(_sizeChanged) {
    if (this.$hostedComponent) {
      const
        r = this.getBounds(),
        b = this.border || this.marked ? this.getBoxBaseResolve().get(this.marked ? 'markerStroke' : 'borderStroke').lineWidth : 0;
      this.$hostedComponent.css({
        position: 'absolute',
        width: r.dim.width - 2 * b + 'px',
        height: r.dim.height - 2 * b + 'px',
        top: r.pos.y + 'px',
        left: r.pos.x + 'px'
      });
    }
  }
}

Object.assign(AbstractBox.prototype, {
  /**
   * The parent AbstractBox (can be `null`)
   * @name module:boxes/AbstractBox.AbstractBox#parent
   * @type {module:boxes/AbstractBox.AbstractBox} */
  parent: null,
  /**
   * The Container to which this AbstractBox belongs
   * @name module:boxes/AbstractBox.AbstractBox#container
   * @type {module:AWT.Container} */
  container: null,
  /**
   * The {@link module:boxes/BoxBase.BoxBase BoxBase} related to this AbstractBox. When `null`, the parent can provide an
   * alternative one.
   * @name module:boxes/AbstractBox.AbstractBox#boxBase
   * @type {module:boxes/BoxBase.BoxBase} */
  boxBase: null,
  /**
   * Whether this box has a border or not
   * @name module:boxes/AbstractBox.AbstractBox#border
   * @type {boolean} */
  border: false,
  /**
   * The shape of this box (the box Rectangle or a special Shape, if set)
   * @name module:boxes/AbstractBox.AbstractBox#shape
   * @type {module:AWT.Shape} */
  shape: null,
  /**
   * Whether this box has a shape that is not a rectangle
   * @name module:boxes/AbstractBox.AbstractBox#specialShape
   * @type {boolean} */
  specialShape: false,
  /**
   * Whether this box is visible or not
   * @name module:boxes/AbstractBox.AbstractBox#visible
   * @type {boolean} */
  visible: true,
  /**
   * Used to temporary hide a box while other drawing operations are done
   * @name module:boxes/AbstractBox.AbstractBox#temporaryHidden
   * @type {boolean} */
  temporaryHidden: false,
  /**
   * Cells with this attribute will be transparent but with painted border
   * @name module:boxes/AbstractBox.AbstractBox#tmpTrans
   * @type {boolean}*/
  tmpTrans: false,
  /**
   * Whether this box is active or inactive
   * @name module:boxes/AbstractBox.AbstractBox#inactive
   * @type {boolean} */
  inactive: false,
  /**
   * Whether this box must be displayed with inverted or regular colors
   * @name module:boxes/AbstractBox.AbstractBox#inverted
   * @type {boolean} */
  inverted: false,
  /**
   * Whether this box must be displayed with alternative or regular color and font settings
   * @name module:boxes/AbstractBox.AbstractBox#alternative
   * @type {boolean} */
  alternative: false,
  /**
   * Whether this box is marked (selected) or not
   * @name module:boxes/AbstractBox.AbstractBox#marked
   * @type {boolean} */
  marked: false,
  /**
   * Whether this box holds the input focus
   * @name module:boxes/AbstractBox.AbstractBox#focused
   * @type {boolean} */
  focused: false,
  /**
   * Text to be used in accessible contexts
   * @name module:boxes/AbstractBox.AbstractBox#accessibleText
   * @type {string} */
  accessibleText: '',
  /**
   * Describes the main role of this box on the activity. Useful in wai-aria descriptions.
   * @name module:boxes/AbstractBox.AbstractBox#role
   * @type {string} */
  role: 'cell',
  /**
   * DOM element used to display this cell content in wai-aria contexts
   * @name module:boxes/AbstractBox.AbstractBox#$accessibleElement
   * @type {external:jQuery} */
  $accessibleElement: null,
  /**
   * Flag indicating that $accessibleElement should be always active
   * @name module:boxes/AbstractBox.AbstractBox#accessibleAlwaysActive
   * @type {boolean} */
  accessibleAlwaysActive: false,
  /**
   * An external JQuery DOM element hosted by this box
   * @name module:boxes/AbstractBox.AbstractBox#$hostedComponent
   * @type {external:jQuery} */
  $hostedComponent: null,
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AbstractBox);


/***/ })

};
;
//# sourceMappingURL=9513.jclic-node.js.map