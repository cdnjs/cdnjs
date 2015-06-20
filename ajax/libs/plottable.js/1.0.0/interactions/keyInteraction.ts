///<reference path="../reference.ts" />

module Plottable {
export type KeyCallback = (keyCode: number) => void;

export module Interactions {
  export class Key extends Interaction {
    /**
     * A Key Interaction listens to key events that occur while the Component is
     * moused over.
     */
    private _positionDispatcher: Plottable.Dispatchers.Mouse;
    private _keyDispatcher: Plottable.Dispatchers.Key;
    private _keyCodeCallbacks: { [keyCode: string]: Utils.CallbackSet<KeyCallback> } = {};

    private _mouseMoveCallback = (point: Point) => false; // HACKHACK: registering a listener
    private _keyDownCallback = (keyCode: number) => this._handleKeyEvent(keyCode);

    protected _anchor(component: Component) {
      super._anchor(component);
      this._positionDispatcher = Dispatchers.Mouse.getDispatcher(
                                   <SVGElement> (<any> this._componentAttachedTo)._element.node()
                                 );
      this._positionDispatcher.onMouseMove(this._mouseMoveCallback);

      this._keyDispatcher = Dispatchers.Key.getDispatcher();
      this._keyDispatcher.onKeyDown(this._keyDownCallback);
    }

    protected _unanchor() {
      super._unanchor();
      this._positionDispatcher.offMouseMove(this._mouseMoveCallback);
      this._positionDispatcher = null;

      this._keyDispatcher.offKeyDown(this._keyDownCallback);
      this._keyDispatcher = null;
    }

    private _handleKeyEvent(keyCode: number) {
      var p = this._translateToComponentSpace(this._positionDispatcher.lastMousePosition());
      if (this._isInsideComponent(p) && this._keyCodeCallbacks[keyCode]) {
        this._keyCodeCallbacks[keyCode].callCallbacks(keyCode);
      }
    }

    /**
     * Adds a callback to be called when the key with the given keyCode is
     * pressed and the user is moused over the Component.
     *
     * @param {number} keyCode
     * @param {KeyCallback} callback
     * @returns {Interactions.Key} The calling Key Interaction.
     */
    public onKeyPress(keyCode: number, callback: KeyCallback) {
      if (!this._keyCodeCallbacks[keyCode]) {
        this._keyCodeCallbacks[keyCode] = new Utils.CallbackSet<KeyCallback>();
      }
      this._keyCodeCallbacks[keyCode].add(callback);
      return this;
    }

    /**
     * Removes a callback that would be called when the key with the given keyCode is
     * pressed and the user is moused over the Component.
     *
     * @param {number} keyCode
     * @param {KeyCallback} callback
     * @returns {Interactions.Key} The calling Key Interaction.
     */
    public offKeyPress(keyCode: number, callback: KeyCallback) {
      this._keyCodeCallbacks[keyCode].delete(callback);
      if (this._keyCodeCallbacks[keyCode].size === 0) {
        delete this._keyCodeCallbacks[keyCode];
      }
      return this;
    }
  }
}
}
