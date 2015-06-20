///<reference path="../reference.ts" />

module Plottable {
export module Components {
  export class YDragBoxLayer extends DragBoxLayer {
    /**
     * A YDragBoxLayer is a DragBoxLayer whose size can only be set in the Y-direction.
     * The x-values of the bounds() are always set to 0 and the width() of the YDragBoxLayer.
     *
     * @constructor
     */
    constructor() {
      super();
      this.addClass("y-drag-box-layer");
      this._hasCorners = false;
    }

    public computeLayout(origin?: Point, availableWidth?: number, availableHeight?: number) {
      super.computeLayout(origin, availableWidth, availableHeight);
      this.bounds(this.bounds()); // set correct bounds when width/height changes
      return this;
    }

    protected _setBounds(newBounds: Bounds) {
      super._setBounds({
        topLeft: { x: 0, y: newBounds.topLeft.y },
        bottomRight: { x: this.width(), y: newBounds.bottomRight.y }
      });
    }

    protected _setResizableClasses(canResize: boolean) {
      if (canResize) {
        this.addClass("y-resizable");
      } else {
        this.removeClass("y-resizable");
      }
    }
  }
}
}
