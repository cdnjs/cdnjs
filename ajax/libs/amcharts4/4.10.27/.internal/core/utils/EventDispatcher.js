/**
 * Event Dispatcher module is used for registering listeners and dispatching
 * events across amCharts system.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Disposer } from "./Disposer";
import * as $array from "./Array";
import * as $async from "./AsyncPending";
import * as $type from "./Type";
/*export interface IEventDispatcher<T> {
    isDisposed(): boolean;
    dispose(): void;
    hasListeners(): boolean;
    enable(): void;
    disable(): void;
    enableType<Key extends keyof T>(type: Key): void;
    disableType<Key extends keyof T>(type: Key, amount?: number): void;
    isEnabled<Key extends keyof T>(type: Key): boolean;
    has<C, Key extends keyof T>(type: Key, callback?: (this: C, event: T[Key]) => void, context?: C): boolean;
    dispatchImmediately<Key extends keyof T>(type: Key, event: T[Key]): void;
    dispatch<Key extends keyof T>(type: Key, event: T[Key]): void;
    onAll<C, Key extends keyof T>(callback: (this: C, type: Key, event: T[Key]) => void, context?: C): IDisposer;
    on<C, Key extends keyof T>(type: Key, callback: (this: C, event: T[Key]) => void, context?: C): IDisposer;
    once<C, Key extends keyof T>(type: Key, callback: (this: C, event: T[Key]) => void, context?: C): IDisposer;
    off<C, Key extends keyof T>(type: Key, callback: (this: C, event: T[Key]) => void, context?: C): void;
    off<C, Key extends keyof T>(type: Key, callback: (this: C, event: T[Key]) => void, context?: C): void;
    copyFrom(source: this): void;
}*/
/**
 * Universal Event Dispatcher.
 *
 * @important
 */
var EventDispatcher = /** @class */ (function () {
    /**
     * Constructor
     */
    function EventDispatcher() {
        this._listeners = [];
        this._killed = [];
        this._disabled = {};
        this._iterating = 0;
        this._enabled = true;
        this._disposed = false;
    }
    /**
     * Returns if this object has been already disposed.
     *
     * @return Disposed?
     */
    EventDispatcher.prototype.isDisposed = function () {
        return this._disposed;
    };
    /**
     * Dispose (destroy) this object.
     */
    EventDispatcher.prototype.dispose = function () {
        if (!this._disposed) {
            this._disposed = true;
            var a = this._listeners;
            this._iterating = 1;
            this._listeners = null;
            this._disabled = null;
            try {
                $array.each(a, function (x) {
                    x.disposer.dispose();
                });
            }
            finally {
                this._killed = null;
                this._iterating = null;
            }
        }
    };
    /**
     * Checks if this particular event dispatcher has any listeners set.
     *
     * @return Has listeners?
     */
    EventDispatcher.prototype.hasListeners = function () {
        return this._listeners.length !== 0;
    };
    /**
     * Checks if this particular event dispatcher has any particular listeners set.
     *
     * @return Has particular event listeners?
     */
    EventDispatcher.prototype.hasListenersByType = function (type) {
        return $array.any(this._listeners, function (x) { return (x.type === null || x.type === type) && !x.killed; });
    };
    /**
     * Enable dispatching of events if they were previously disabled by
     * `disable()`.
     */
    EventDispatcher.prototype.enable = function () {
        this._enabled = true;
    };
    /**
     * Disable dispatching of events until re-enabled by `enable()`.
     */
    EventDispatcher.prototype.disable = function () {
        this._enabled = false;
    };
    /**
     * Enable dispatching particular event, if it was disabled before by
     * `disableType()`.
     *
     * @param type Event type
     */
    EventDispatcher.prototype.enableType = function (type) {
        delete this._disabled[type];
    };
    /**
     * Disable dispatching of events for a certain event type.
     *
     * Optionally, can set how many dispatches to skip before automatically
     * re-enabling the dispatching.
     *
     * @param type    Event type
     * @param amount  Number of event dispatches to skip
     */
    EventDispatcher.prototype.disableType = function (type, amount) {
        if (amount === void 0) { amount = Infinity; }
        this._disabled[type] = amount;
    };
    /**
     * Removes listener from dispatcher.
     *
     * Will throw an exception if such listener does not exists.
     *
     * @param listener Listener to remove
     */
    EventDispatcher.prototype._removeListener = function (listener) {
        if (this._iterating === 0) {
            var index = this._listeners.indexOf(listener);
            if (index === -1) {
                throw new Error("Invalid state: could not remove listener");
            }
            this._listeners.splice(index, 1);
        }
        else {
            this._killed.push(listener);
        }
    };
    /**
     * Removes existing listener by certain parameters.
     *
     * @param once         Listener's once setting
     * @param type         Listener's type
     * @param callback     Callback function
     * @param context      Callback context
     */
    EventDispatcher.prototype._removeExistingListener = function (once, type, callback, context) {
        if (this._disposed) {
            throw new Error("EventDispatcher is disposed");
        }
        this._eachListener(function (info) {
            if (info.once === once && // TODO is this correct ?
                info.type === type &&
                (callback == null || info.callback === callback) &&
                info.context === context) {
                info.disposer.dispose();
            }
        });
    };
    /**
     * Checks if dispatching for particular event type is enabled.
     *
     * @param type  Event type
     * @return Enabled?
     */
    EventDispatcher.prototype.isEnabled = function (type) {
        if (this._disposed) {
            throw new Error("EventDispatcher is disposed");
        }
        // TODO is this check correct ?
        return this._enabled && this._listeners.length > 0 && this.hasListenersByType(type) && this._disabled[type] == null;
    };
    /**
     * Checks if there's already a listener with specific parameters.
     *
     * @param type      Listener's type
     * @param callback  Callback function
     * @param context   Callback context
     * @return Has listener?
     */
    EventDispatcher.prototype.has = function (type, callback, context) {
        var index = $array.findIndex(this._listeners, function (info) {
            return info.once !== true && // Ignoring "once" listeners
                info.type === type &&
                (callback == null || info.callback === callback) &&
                info.context === context;
        });
        return index !== -1;
    };
    /**
     * Checks whether event of the particular type should be dispatched.
     *
     * @param type  Event type
     * @return Dispatch?
     */
    EventDispatcher.prototype._shouldDispatch = function (type) {
        if (this._disposed) {
            throw new Error("EventDispatcher is disposed");
        }
        var count = this._disabled[type];
        if (!$type.isNumber(count)) {
            return this._enabled;
        }
        else {
            if (count <= 1) {
                delete this._disabled[type];
            }
            else {
                --this._disabled[type];
            }
            return false;
        }
    };
    /**
     * [_eachListener description]
     *
     * All of this extra code is needed when a listener is removed while iterating
     *
     * @todo Description
     * @param fn [description]
     */
    EventDispatcher.prototype._eachListener = function (fn) {
        var _this = this;
        ++this._iterating;
        try {
            $array.each(this._listeners, fn);
        }
        finally {
            --this._iterating;
            // TODO should this be inside or outside the finally ?
            if (this._iterating === 0 && this._killed.length !== 0) {
                // Remove killed listeners
                $array.each(this._killed, function (killed) {
                    _this._removeListener(killed);
                });
                this._killed.length = 0;
            }
        }
    };
    /**
     * Dispatches an event immediately without waiting for next cycle.
     *
     * @param type   Event type
     * @param event  Event object
     * @todo automatically add in type and target properties if they are missing
     */
    EventDispatcher.prototype.dispatchImmediately = function (type, event) {
        if (this._shouldDispatch(type)) {
            // TODO check if it's faster to use an object of listeners rather than a single big array
            // TODO if the function throws, maybe it should keep going ?
            this._eachListener(function (listener) {
                if (!listener.killed && (listener.type === null || listener.type === type)) {
                    listener.dispatch(type, event);
                }
            });
        }
    };
    /**
     * Shelves the event to be dispatched within next update cycle.
     *
     * @param type   Event type
     * @param event  Event object
     * @todo automatically add in type and target properties if they are missing
     */
    EventDispatcher.prototype.dispatch = function (type, event) {
        if (this._shouldDispatch(type)) {
            this._eachListener(function (listener) {
                // TODO check if it's faster to use an object of listeners rather than a single big array
                if (!listener.killed && (listener.type === null || listener.type === type)) {
                    // TODO if the function throws, maybe it should keep going ?
                    // TODO dispatch during the update cycle, rather than using whenIdle
                    $async.whenIdle(function () {
                        if (!listener.killed) {
                            listener.dispatch(type, event);
                        }
                    });
                }
            });
        }
    };
    /**
     * Creates, catalogs and returns an [[EventListener]].
     *
     * Event listener can be disposed.
     *
     * @param once         Listener's once setting
     * @param type         Listener's type
     * @param callback     Callback function
     * @param context      Callback context
     * @param shouldClone  Whether the listener should be copied when the EventDispatcher is copied
     * @param dispatch
     * @returns An event listener
     */
    EventDispatcher.prototype._on = function (once, type, callback, context, shouldClone, dispatch) {
        var _this = this;
        if (this._disposed) {
            throw new Error("EventDispatcher is disposed");
        }
        this._removeExistingListener(once, type, callback, context);
        var info = {
            type: type,
            callback: callback,
            context: context,
            shouldClone: shouldClone,
            dispatch: dispatch,
            killed: false,
            once: once,
            disposer: new Disposer(function () {
                info.killed = true;
                _this._removeListener(info);
            })
        };
        this._listeners.push(info);
        return info;
    };
    /**
     * Creates an event listener to be invoked on **any** event.
     *
     * @param callback     Callback function
     * @param context      Callback context
     * @param shouldClone  Whether the listener should be copied when the EventDispatcher is copied
     * @returns A disposable event listener
     * @todo what if `listen` is called on the same function twice ?
     */
    EventDispatcher.prototype.onAll = function (callback, context, shouldClone) {
        if (shouldClone === void 0) { shouldClone = true; }
        return this._on(false, null, callback, context, shouldClone, function (type, event) { return callback.call(context, type, event); }).disposer;
    };
    /**
     * Creates an event listener to be invoked on a specific event type.
     *
     * ```TypeScript
     * series.events.on("hidden", (ev) => {
     *   console.log("Series hidden: " + ev.target.name);
     * }, this);
     * ```
     * ```JavaScript
     * series.events.on("hidden", function(ev) {
     *   console.log("Series hidden: " + ev.target.name);
     * }, this);
     * ```
     * ```JSON
     * {
     *   // ...
     *   "series": [{
     *     // ...
     *     "events": {
     *     	"hidden": function(ev) {
     *     	  console.log("Series hidden: " + ev.target.name);
     *     	}
     *     }
     *   }]
     * }
     * ```
     *
     * The above will invoke our custom event handler whenever series we put
     * event on is hidden.
     *
     * @param type         Listener's type
     * @param callback     Callback function
     * @param context      Callback context
     * @param shouldClone  Whether the listener should be copied when the EventDispatcher is copied
     * @returns A disposable event listener
     * @todo what if `listen` is called on the same function twice ?
     */
    EventDispatcher.prototype.on = function (type, callback, context, shouldClone) {
        if (shouldClone === void 0) { shouldClone = true; }
        return this._on(false, type, callback, context, shouldClone, function (type, event) { return callback.call(context, event); }).disposer;
    };
    /**
     * Creates an event listener to be invoked on a specific event type once.
     *
     * Once the event listener is invoked, it is automatically disposed.
     *
     * ```TypeScript
     * series.events.on("hidden", (ev) => {
     *   console.log("Series hidden: " + ev.target.name);
     * }, this);
     * ```
     * ```JavaScript
     * series.events.on("hidden", function(ev) {
     *   console.log("Series hidden: " + ev.target.name);
     * }, this);
     * ```
     * ```JSON
     * {
     *   // ...
     *   "series": [{
     *     // ...
     *     "events": {
     *     	"hidden": function(ev) {
     *     	  console.log("Series hidden: " + ev.target.name);
     *     	}
     *     }
     *   }]
     * }
     * ```
     *
     * The above will invoke our custom event handler the first time series we
     * put event on is hidden.
     *
     * @param type         Listener's type
     * @param callback     Callback function
     * @param context      Callback context
     * @param shouldClone  Whether the listener should be copied when the EventDispatcher is copied
     * @returns A disposable event listener
     * @todo what if `listen` is called on the same function twice ?
     */
    EventDispatcher.prototype.once = function (type, callback, context, shouldClone) {
        if (shouldClone === void 0) { shouldClone = true; }
        var x = this._on(true, type, callback, context, shouldClone, function (type, event) {
            x.disposer.dispose();
            callback.call(context, event);
        });
        // TODO maybe this should return a different Disposer ?
        return x.disposer;
    };
    /**
     * Removes the event listener with specific parameters.
     *
     * @param type         Listener's type
     * @param callback     Callback function
     * @param context      Callback context
     */
    EventDispatcher.prototype.off = function (type, callback, context) {
        this._removeExistingListener(false, type, callback, context);
    };
    /**
     * Copies all dispatcher parameters, including listeners, from another event
     * dispatcher.
     *
     * @param source Source event dispatcher
     */
    EventDispatcher.prototype.copyFrom = function (source) {
        var _this = this;
        if (this._disposed) {
            throw new Error("EventDispatcher is disposed");
        }
        if (source === this) {
            throw new Error("Cannot copyFrom the same TargetedEventDispatcher");
        }
        $array.each(source._listeners, function (x) {
            // TODO is this correct ?
            if (!x.killed && x.shouldClone) {
                if (x.type === null) {
                    _this.onAll(x.callback, x.context);
                }
                else if (x.once) {
                    _this.once(x.type, x.callback, x.context);
                }
                else {
                    _this.on(x.type, x.callback, x.context);
                }
            }
        });
    };
    return EventDispatcher;
}());
export { EventDispatcher };
/**
 * A version of the [[EventDispatcher]] that dispatches events for a specific
 * target object.
 *
 * @important
 */
var TargetedEventDispatcher = /** @class */ (function (_super) {
    __extends(TargetedEventDispatcher, _super);
    /**
     * Constructor
     *
     * @param target Event dispatcher target
     */
    function TargetedEventDispatcher(target) {
        var _this = _super.call(this) || this;
        _this.target = target;
        return _this;
    }
    /**
     * Copies all dispatcher parameters, including listeners, from another event
     * dispatcher.
     *
     * @param source Source event dispatcher
     */
    TargetedEventDispatcher.prototype.copyFrom = function (source) {
        var _this = this;
        if (this._disposed) {
            throw new Error("EventDispatcher is disposed");
        }
        if (source === this) {
            throw new Error("Cannot copyFrom the same TargetedEventDispatcher");
        }
        $array.each(source._listeners, function (x) {
            // TODO very hacky
            if (x.context === source.target) {
                return;
            }
            // TODO is this correct ?
            if (!x.killed && x.shouldClone) {
                if (x.type === null) {
                    _this.onAll(x.callback, x.context);
                }
                else if (x.once) {
                    _this.once(x.type, x.callback, x.context);
                }
                else {
                    _this.on(x.type, x.callback, x.context);
                }
            }
        });
    };
    return TargetedEventDispatcher;
}(EventDispatcher));
export { TargetedEventDispatcher };
//# sourceMappingURL=EventDispatcher.js.map