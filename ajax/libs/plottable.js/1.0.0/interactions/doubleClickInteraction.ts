///<reference path="../reference.ts" />

module Plottable {
export module Interactions {
  enum ClickState {NotClicked, SingleClicked, DoubleClicked};
  export class DoubleClick extends Interaction {

    private _mouseDispatcher: Plottable.Dispatchers.Mouse;
    private _touchDispatcher: Plottable.Dispatchers.Touch;
    private _clickState = ClickState.NotClicked;
    private _clickedDown = false;
    private _clickedPoint: Point;

    private _onDoubleClickCallbacks = new Utils.CallbackSet<ClickCallback>();

    private _mouseDownCallback = (p: Point) => this._handleClickDown(p);
    private _mouseUpCallback = (p: Point) => this._handleClickUp(p);
    private _dblClickCallback = (p: Point) => this._handleDblClick();
    private _touchStartCallback = (ids: number[], idToPoint: Point[]) => this._handleClickDown(idToPoint[ids[0]]);
    private _touchEndCallback = (ids: number[], idToPoint: Point[]) => this._handleClickUp(idToPoint[ids[0]]);
    private _touchCancelCallback = (ids: number[], idToPoint: Point[]) => this._handleClickCancel();

    protected _anchor(component: Component) {
      super._anchor(component);

      this._mouseDispatcher = Dispatchers.Mouse.getDispatcher(<SVGElement> component.content().node());
      this._mouseDispatcher.onMouseDown(this._mouseDownCallback);
      this._mouseDispatcher.onMouseUp(this._mouseUpCallback);
      this._mouseDispatcher.onDblClick(this._dblClickCallback);

      this._touchDispatcher = Dispatchers.Touch.getDispatcher(<SVGElement> component.content().node());
      this._touchDispatcher.onTouchStart(this._touchStartCallback);
      this._touchDispatcher.onTouchEnd(this._touchEndCallback);
      this._touchDispatcher.onTouchCancel(this._touchCancelCallback);
    }

    protected _unanchor() {
      super._unanchor();
      this._mouseDispatcher.offMouseDown(this._mouseDownCallback);
      this._mouseDispatcher.offMouseUp(this._mouseUpCallback);
      this._mouseDispatcher.offDblClick(this._dblClickCallback);
      this._mouseDispatcher = null;

      this._touchDispatcher.offTouchStart(this._touchStartCallback);
      this._touchDispatcher.offTouchEnd(this._touchEndCallback);
      this._touchDispatcher.offTouchCancel(this._touchCancelCallback);
      this._touchDispatcher = null;
    }

    private _handleClickDown(p: Point) {
      var translatedP = this._translateToComponentSpace(p);
      if (this._isInsideComponent(translatedP)) {
        if (!(this._clickState === ClickState.SingleClicked) || !DoubleClick._pointsEqual(translatedP, this._clickedPoint)) {
          this._clickState = ClickState.NotClicked;
        }
        this._clickedPoint = translatedP;
        this._clickedDown = true;
      }
    }

    private _handleClickUp(p: Point) {
      var translatedP = this._translateToComponentSpace(p);
      if (this._clickedDown && DoubleClick._pointsEqual(translatedP, this._clickedPoint)) {
        this._clickState = this._clickState === ClickState.NotClicked ? ClickState.SingleClicked : ClickState.DoubleClicked;
      } else {
        this._clickState = ClickState.NotClicked;
      }
      this._clickedDown = false;
    }

    private _handleDblClick() {
      if (this._clickState === ClickState.DoubleClicked) {
        this._onDoubleClickCallbacks.callCallbacks(this._clickedPoint);
        this._clickState = ClickState.NotClicked;
      }
    }

    private _handleClickCancel() {
      this._clickState = ClickState.NotClicked;
      this._clickedDown = false;
    }

    private static _pointsEqual(p1: Point, p2: Point) {
      return p1.x === p2.x && p1.y === p2.y;
    }

    /**
     * Adds a callback to be called when the Component is double-clicked.
     *
     * @param {ClickCallback} callback
     * @return {Interactions.DoubleClick} The calling DoubleClick Interaction.
     */
    public onDoubleClick(callback: ClickCallback) {
      this._onDoubleClickCallbacks.add(callback);
      return this;
    }

    /**
     * Removes a callback that would be called when the Component is double-clicked.
     *
     * @param {ClickCallback} callback
     * @return {Interactions.DoubleClick} The calling DoubleClick Interaction.
     */
    public offDoubleClick(callback: ClickCallback) {
      this._onDoubleClickCallbacks.delete(callback);
      return this;
    }
  }
}
}
