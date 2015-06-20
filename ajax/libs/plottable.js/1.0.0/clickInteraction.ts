///<reference path="../reference.ts" />

module Plottable {

export type ClickCallback = (point: Point) => void;

export module Interactions {
  export class Click extends Interaction {

    private _mouseDispatcher: Plottable.Dispatchers.Mouse;
    private _touchDispatcher: Plottable.Dispatchers.Touch;
    private _clickedDown = false;
    private _onClickCallbacks = new Utils.CallbackSet<ClickCallback>();

    private _mouseDownCallback = (p: Point) => this._handleClickDown(p);
    private _mouseUpCallback = (p: Point) => this._handleClickUp(p);

    private _touchStartCallback = (ids: number[], idToPoint: Point[]) => this._handleClickDown(idToPoint[ids[0]]);
    private _touchEndCallback = (ids: number[], idToPoint: Point[]) => this._handleClickUp(idToPoint[ids[0]]);
    private _touchCancelCallback = (ids: number[], idToPoint: Point[]) => this._clickedDown = false;

    protected _anchor(component: Component) {
      super._anchor(component);

      this._mouseDispatcher = Dispatchers.Mouse.getDispatcher(<SVGElement> component.content().node());
      this._mouseDispatcher.onMouseDown(this._mouseDownCallback);
      this._mouseDispatcher.onMouseUp(this._mouseUpCallback);

      this._touchDispatcher = Dispatchers.Touch.getDispatcher(<SVGElement> component.content().node());
      this._touchDispatcher.onTouchStart(this._touchStartCallback);
      this._touchDispatcher.onTouchEnd(this._touchEndCallback);
      this._touchDispatcher.onTouchCancel(this._touchCancelCallback);
    }

    protected _unanchor() {
      super._unanchor();
      this._mouseDispatcher.offMouseDown(this._mouseDownCallback);
      this._mouseDispatcher.offMouseUp(this._mouseUpCallback);
      this._mouseDispatcher = null;

      this._touchDispatcher.offTouchStart(this._touchStartCallback);
      this._touchDispatcher.offTouchEnd(this._touchEndCallback);
      this._touchDispatcher.offTouchCancel(this._touchCancelCallback);
      this._touchDispatcher = null;
    }

    private _handleClickDown(p: Point) {
      var translatedPoint = this._translateToComponentSpace(p);
      if (this._isInsideComponent(translatedPoint)) {
        this._clickedDown = true;
      }
    }

    private _handleClickUp(p: Point) {
      var translatedPoint = this._translateToComponentSpace(p);
      if (this._clickedDown && this._isInsideComponent(translatedPoint)) {
        this._onClickCallbacks.callCallbacks(translatedPoint);
      }
      this._clickedDown = false;
    }

    /**
     * Adds a callback to be called when the Component is clicked.
     *
     * @param {ClickCallback} callback
     * @return {Interactions.Click} The calling Click Interaction.
     */
    public onClick(callback: ClickCallback) {
      this._onClickCallbacks.add(callback);
      return this;
    }

    /**
     * Removes a callback that would be called when the Component is clicked.
     *
     * @param {ClickCallback} callback
     * @return {Interactions.Click} The calling Click Interaction.
     */
    public offClick(callback: ClickCallback) {
      this._onClickCallbacks.delete(callback);
      return this;
    }
  }
}
}
