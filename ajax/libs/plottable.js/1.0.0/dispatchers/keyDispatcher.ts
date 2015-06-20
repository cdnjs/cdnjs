///<reference path="../reference.ts" />

module Plottable {
export module Dispatchers {
  export type KeyCallback = (keyCode: number, event: KeyboardEvent) => void;

  export class Key extends Dispatcher {
    private static _DISPATCHER_KEY = "__Plottable_Dispatcher_Key";
    private _keydownCallbacks: Utils.CallbackSet<KeyCallback>;

    /**
     * Gets a Key Dispatcher. If one already exists it will be returned;
     * otherwise, a new one will be created.
     *
     * @return {Dispatchers.Key}
     */
    public static getDispatcher(): Dispatchers.Key {
      var dispatcher: Key = (<any> document)[Key._DISPATCHER_KEY];
      if (dispatcher == null) {
        dispatcher = new Key();
        (<any> document)[Key._DISPATCHER_KEY] = dispatcher;
      }
      return dispatcher;
    }

    /**
     * This constructor should not be invoked directly.
     *
     * @constructor
     */
    constructor() {
      super();

      this._eventToCallback["keydown"] = (e: KeyboardEvent) => this._processKeydown(e);

      this._keydownCallbacks = new Utils.CallbackSet<KeyCallback>();
      this._callbacks = [this._keydownCallbacks];
    }

    /**
     * Registers a callback to be called whenever a key is pressed.
     *
     * @param {KeyCallback} callback
     * @return {Dispatchers.Key} The calling Key Dispatcher.
     */
    public onKeyDown(callback: KeyCallback): Key {
      this._setCallback(this._keydownCallbacks, callback);
      return this;
    }

    /**
     * Removes the callback to be called whenever a key is pressed.
     *
     * @param {KeyCallback} callback
     * @return {Dispatchers.Key} The calling Key Dispatcher.
     */
    public offKeyDown(callback: KeyCallback): Key {
      this._unsetCallback(this._keydownCallbacks, callback);
      return this;
    }

    private _processKeydown(event: KeyboardEvent) {
      this._keydownCallbacks.callCallbacks(event.keyCode, event);
    }
  }
}
}
