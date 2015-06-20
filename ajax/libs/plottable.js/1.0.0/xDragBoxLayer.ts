///<reference path="../reference.ts" />

module Plottable {
export module Components {
  export class XDragBoxLayer extends DragBoxLayer {
    /**
     * An XDragBoxLayer is a DragBoxLayer whose size can only be set in the X-direction.
     * The y-values of the bounds() are always set to 0 and the height() of the XDragBoxLayer.
     *
     * @constructor
     */
    constructor() {
      super();
      this.addClass("x-drag-box-layer");
      this._hasCorners = false;
    }

    public computeLayout(origin?: Point, availableWidth?: number, availableHeight?: number) {
      super.computeLayout(origin, availableWidth, availableHeight);
      this.bounds(this.bounds()); // set correct bounds when width/height changes
      return this;
    }

    protected _setBounds(newBounds: Bounds) {
      super._setBounds({
        topLeft: { x: newBounds.topLeft.x, y: 0 },
        bottomRight: { x: newBounds.bottomRight.x, y: this.height() }
      });
    }

    protected _setResizableClasses(canResize: boolean) {
      if (canResize) {
        this.addClass("x-resizable");
      } else {
        this.removeClass("x-resizable");
      }
    }
  }
}
}
