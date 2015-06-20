///<reference path="../reference.ts" />

module Plottable {

export type PointerCallback = (point: Point) => void;

export module Interactions {
  export class Pointer extends Interaction {
    private _mouseDispatcher: Dispatchers.Mouse;
    private _touchDispatcher: Dispatchers.Touch;
    private _overComponent = false;
    private _pointerEnterCallbacks = new Utils.CallbackSet<PointerCallback>();
    private _pointerMoveCallbacks = new Utils.CallbackSet<PointerCallback>();
    private _pointerExitCallbacks = new Utils.CallbackSet<PointerCallback>();

    private _mouseMoveCallback = (p: Point) => this._handlePointerEvent(p);
    private _touchStartCallback = (ids: number[], idToPoint: Point[]) => this._handlePointerEvent(idToPoint[ids[0]]);

    protected _anchor(component: Component) {
      super._anchor(component);
      this._mouseDispatcher = Dispatchers.Mouse.getDispatcher(<SVGElement> this._componentAttachedTo.content().node());
      this._mouseDispatcher.onMouseMove(this._mouseMoveCallback);

      this._touchDispatcher = Dispatchers.Touch.getDispatcher(<SVGElement> this._componentAttachedTo.content().node());
      this._touchDispatcher.onTouchStart(this._touchStartCallback);
    }

    protected _unanchor() {
      super._unanchor();
      this._mouseDispatcher.offMouseMove(this._mouseMoveCallback);
      this._mouseDispatcher = null;

      this._touchDispatcher.offTouchStart(this._touchStartCallback);
      this._touchDispatcher = null;
    }

    private _handlePointerEvent(p: Point) {
      var translatedP = this._translateToComponentSpace(p);
      if (this._isInsideComponent(translatedP)) {
        var wasOverComponent = this._overComponent;
        this._overComponent = true;
        if (!wasOverComponent) {
          this._pointerEnterCallbacks.callCallbacks(translatedP);
        }
        this._pointerMoveCallbacks.callCallbacks(translatedP);
      } else if (this._overComponent) {
        this._overComponent = false;
        this._pointerExitCallbacks.callCallbacks(translatedP);
      }
    }

    /**
     * Adds a callback to be called when the pointer enters the Component.
     *
     * @param {PointerCallback} callback
     * @return {Interactions.Pointer} The calling Pointer Interaction.
     */
    public onPointerEnter(callback: PointerCallback) {
      this._pointerEnterCallbacks.add(callback);
      return this;
    }

    /**
     * Removes a callback that would be called when the pointer enters the Component.
     *
     * @param {PointerCallback} callback
     * @return {Interactions.Pointer} The calling Pointer Interaction.
     */
    public offPointerEnter(callback: PointerCallback) {
      this._pointerEnterCallbacks.delete(callback);
      return this;
    }

    /**
     * Adds a callback to be called when the pointer moves within the Component.
     *
     * @param {PointerCallback} callback
     * @return {Interactions.Pointer} The calling Pointer Interaction.
     */
    public onPointerMove(callback: PointerCallback) {
      this._pointerMoveCallbacks.add(callback);
      return this;
    }

    /**
     * Removes a callback that would be called when the pointer moves within the Component.
     *
     * @param {PointerCallback} callback
     * @return {Interactions.Pointer} The calling Pointer Interaction.
     */
    public offPointerMove(callback: PointerCallback) {
      this._pointerMoveCallbacks.delete(callback);
      return this;
    }

    /**
     * Adds a callback to be called when the pointer exits the Component.
     *
     * @param {PointerCallback} callback
     * @return {Interactions.Pointer} The calling Pointer Interaction.
     */
    public onPointerExit(callback: PointerCallback) {
      this._pointerExitCallbacks.add(callback);
      return this;
    }

    /**
     * Removes a callback that would be called when the pointer exits the Component.
     *
     * @param {PointerCallback} callback
     * @return {Interactions.Pointer} The calling Pointer Interaction.
     */
    public offPointerExit(callback: PointerCallback) {
      this._pointerExitCallbacks.delete(callback);
      return this;
    }
  }
}
}
