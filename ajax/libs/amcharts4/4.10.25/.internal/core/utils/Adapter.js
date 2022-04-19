/**
 * An Adapter can be used to apply chained synchronous transformations to any
 * value at runtime.
 *
 * Each type class using Adapters must have `adapters` property and adapter
 * interface defined.
 *
 * Adapters can be used to allow external code to apply transformations to any
 * value at any time.
 *
 * For example we have a Weather class which has a method `now()` which returns
 * current temperature.
 *
 * ```
 * function now() {
 *   // ... calculate temperature
 *   let temp = "Temperature now is " + degrees + "F";
 *   return temp;
 * }
 * ```
 *
 * Now, supposed we want to let other classes to modify the output of the
 * `now()`? We just apply an adapter to the `temp` before it is returned:
 *
 * ```
 * temp = this.adapters.apply("now", {
 *   temp: temp,
 *   degrees: degrees
 * }).temp;
 * ```
 *
 * Some other class might tap onto it by defining an Adapter that calculates
 * the temperature in Celsius:
 *
 * weather.adapters.add("now", (arg) => {
 *   arg.temp += "(" + farenheitToCelsius(arg.degrees) + "C)";
 *   return arh;
 * });
 *
 * Furthermore some time-related class could add time:
 *
 * weather.adapters.add("now", (arg) => {
 *   arg.temp += "; the time now is " + (new Date().toLocaleString());
 *   return arh;
 * });
 *
 * So without adapters we would get output like this:
 *
 * ```
 * Temperature now is 90F
 * ```
 *
 * With adapters applied we now have:
 *
 * ```
 * Temperature now is 90F (32C); the time now is 12/11/2012, 7:00:00 PM
 * ```
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { SortedList } from "./SortedList";
import * as $number from "./Number";
import * as $order from "./Order";
import * as $iter from "../utils/Iterator";
import * as $array from "../utils/Array";
import * as $type from "../utils/Type";
import * as $object from "../utils/Object";
/**
 * ============================================================================
 * GLOBAL ADAPTER
 * ============================================================================
 * @hidden
 */
/**
 * A global adapter is an adpater that is attached to a class type rather than
 * specific object instance.
 *
 * @ignore Exclude from docs
 */
var GlobalAdapter = /** @class */ (function () {
    function GlobalAdapter() {
        /**
         * Callback id iterator.
         */
        this._callbackId = 0;
        /**
         * A list of if callbacks (adapters).
         */
        this._callbacks = new SortedList(function (left, right) {
            return $order.or($number.order(left.priority, right.priority), $number.order(left.id, right.id));
        });
    }
    /**
     * Adds a global callback which is not specific to any particular object.
     * Whenever an adapter in any object of the specific class type is invoked
     * global adapters will kick in.
     *
     * @param type      Class type
     * @param key       Adapter key
     * @param callback  Callback function
     * @param priority  Priority (higher priority meaning adapter will be applied later)
     * @param scope     Callback function scaope
     */
    GlobalAdapter.prototype.addAll = function (type, key, callback, priority, scope) {
        if (priority === void 0) { priority = 0; }
        this._callbacks.insert({
            id: ++this._callbackId,
            key: key,
            callback: callback,
            priority: priority,
            scope: scope,
            type: type
        });
    };
    /**
     * Returns if there are adapters for specific type available.
     *
     * @param type  Adapter type
     * @param key   Adapter key
     * @return {boolean}
     */
    GlobalAdapter.prototype.isEnabled = function (type, key) {
        return $array.any(this._callbacks.values, function (x) { return x.key === key && type instanceof x.type; });
    };
    /**
     * Applies global adapters for the object of the specific type.
     *
     * @param type   Class type
     * @param key    Adapter key
     * @param value  Value
     */
    GlobalAdapter.prototype.applyAll = function (type, key, value) {
        // This is needed to improve the performance and reduce garbage collection
        var callbacks = this._callbacks.values;
        var length = callbacks.length;
        if (length == 0) {
            return value;
        }
        // Cycle through all callbacks and find the ones we need to use
        for (var i = 0; i < length; ++i) {
            var item = callbacks[i];
            if (item.key === key && type instanceof item.type) {
                value = item.callback.call(item.scope, value, type, key);
            }
        }
        return value;
    };
    return GlobalAdapter;
}());
export { GlobalAdapter };
/**
 * A global Adapter for plugins that want to add specific
 * functionality for any chart, not just specific instance.
 *
 * If you want to add an adapter which applies to all instances of the same
 * object type, like, for instance all slices in PieSeries, you can use
 * global adapter.
 *
 * Global adapter is a system-wide instance, accessible via `globalAdapter`.
 *
 * ```TypeScript
 * am4core.globalAdapter.addAll<am4charts.IPieSeriesAdapters, am4charts.PieSeries, "fill">(am4charts.PieSeries, "fill", (value, target, key) => {
 *   return am4core.color("#005500");
 * });
 * ```
 * ```JavaScript
 * am4core.globalAdapter.addAll(am4charts.PieSeries, "fill", (value, target, key) => {
 *   return am4core.color("#005500");
 * });
 * ```
 *
 * @ignore
 */
export var globalAdapter = new GlobalAdapter();
/**
 * ============================================================================
 * REGULAR ADAPTER
 * ============================================================================
 * @hidden
 */
/**
 * Adapter allows adding ordered callback functions and associating them with a
 * string-based key. An Adapter user can then easily invoke those callbacks to
 * apply custom functions on its input, output or intermediate values.
 *
 * Custom code and plugins can add their own callbacks to modify and enhance
 * core functionality.
 *
 * See the description of `add()` for an example.
 *
 * Almost any object in amCharts4 has own adapter, accessible with `adapter`
 * property.
 *
 * Any adapters added to it will be applied to that object only.
 *
 * ### Global Adapters
 *
 * If you want to add an adapter which applies to all instances of the same
 * object type, like, for instance all slices in PieSeries, you can use
 * global adapter.
 *
 * Global adapter is a system-wide instance, accessible via `globalAdapter`.
 *
 * ```TypeScript
 * am4core.globalAdapter.addAll<am4charts.IPieSeriesAdapters, am4charts.PieSeries, "fill">(am4charts.PieSeries. "fill", (value, target, key) => {
 *   return am4core.color("#005500");
 * });
 * ```
 * ```JavaScript
 * am4core.globalAdapter.addAll(am4charts.PieSeries. "fill", (value, target, key) => {
 *   return am4core.color("#005500");
 * });
 * ```
 *
 * {@link https://www.amcharts.com/docs/v4/reference/adapter_module/#globalAdapter_property More info}.
 *
 * @important
 */
var Adapter = /** @class */ (function () {
    /**
     * Constructor, sets the object referece this Adapter should be used for.
     *
     * @param c Object
     */
    function Adapter(c) {
        /**
         * Internal counter for callback ids.
         */
        this._callbackId = 0;
        /**
         * A list of adapter callbacks.
         *
         * @param $number.order(left.priority, right.priority) [description]
         * @param $number.order(left.id,       right.id));	}  [description]
         */
        this._callbacks = new SortedList(function (left, right) {
            return $order.or($number.order(left.priority, right.priority), $number.order(left.id, right.id));
        });
        this._disabled = {};
        this.object = c;
        // TODO this exposes the internal events
        this.events = this._callbacks.events;
    }
    /**
     * Adds a callback for a specific key.
     *
     * ```TypeScript
     * // Override fill color value and make all slices green
     * chart.series.template.adapter.add("fill", (value, target, key) => {
     *   return am4core.color("#005500");
     * });
     * ```
     * ```JavaScript
     * // Override fill color value and make all slices green
     * chart.series.template.adapter.add("fill", function(value, target, key) {
     *   return am4core.color("#005500");
     * });
     * ```
     * ```JSON
     * {
     *   // ...
     *   "series": [{
     *     // ...
     *     "adapter": {
     *     	// Override fill color value and make all slices green
     *     	"fill": function(value, target, key) {
     *     	  return am4core.color("#005500");
     *     	}
     *     }
     *   }]
     * }
     * ```
     *
     * The above will call user-defined function (adapter) whenever `fill` value
     * is requested from the Pie series, allowing it to override the default
     * using custom code and any fuzzy logic.
     *
     * There can be any number of adapters set on one property key.
     *
     * In this case adapters will be applied in daisy-chain fashion. The first
     * adapter in queue will make its transformation. The next one will have
     * the output of the first adapter as a starting value, etc.
     *
     * The order of the adapters are determined either by the order they were
     * added in, or their `priority` value.
     *
     * The heigher the `priority`, the later in the game adapter will be applied.
     *
     * @param key       Key
     * @param callback  A callback function
     * @param priority  The higher priority, the more chance the adapter will be applied last
     * @param scope     Scope for the callback function
     */
    Adapter.prototype.add = function (key, callback, priority, scope) {
        if (priority === void 0) { priority = 0; }
        this._callbacks.insert({
            id: ++this._callbackId,
            key: key,
            callback: callback,
            priority: priority,
            scope: scope
        });
    };
    /**
     * Checks whether specific adapter is already set.
     *
     * @param key       Key
     * @param callback  A callback function
     * @param priority  The higher priority, the more chance the adapter will be applied last
     * @param scope     Scope for the callback function
     * @returns                            Adapter set?
     */
    Adapter.prototype.has = function (key, callback, priority, scope) {
        if (priority === void 0) { priority = 0; }
        return $iter.contains(this._callbacks.iterator(), function (item) {
            return item.key === key && item.callback === callback && item.priority === priority && item.scope === scope;
        });
    };
    /**
     * Removes adapter callbacks for the specific `key`.
     *
     * If `priority` is specified, only callbacks for that priority are removed.
     *
     * @param key      Key
     * @param priority Priority
     * @todo Implement
     */
    Adapter.prototype.remove = function (key, priority) {
        var _this = this;
        // It has to make a copy because it removes the elements while iterating
        // TODO inefficient
        // TODO should this re-enable the key ?
        $array.each($iter.toArray(this._callbacks.iterator()), function (item) {
            // TODO test this
            if (item.key === key && (!$type.isNumber(priority) || priority === item.priority)) {
                _this._callbacks.remove(item);
            }
        });
    };
    /**
     * Enable applying adapters for a certain key, if it was disabled before by
     * `disableKey()`.
     *
     * @param key Key
     */
    Adapter.prototype.enableKey = function (key) {
        delete this._disabled[key];
    };
    /**
     * Disable applying adapters for a certain key.
     *
     * Optionally, can set how many applies to skip before automatically
     * re-enabling the applying.
     *
     * @param key     Key
     * @param amount  Number of applies to skip
     */
    Adapter.prototype.disableKey = function (key, amount) {
        if (amount === void 0) { amount = Infinity; }
        this._disabled[key] = amount;
    };
    Adapter.prototype._hasListenersByType = function (key) {
        return $array.any(this._callbacks.values, function (x) { return x.key === key; });
    };
    /**
     * Returns if there are any enabled adapters set for the specific `key`.
     *
     * @returns Are there any adapters for the key?
     */
    Adapter.prototype.isEnabled = function (key) {
        return this._disabled[key] == null && (this._hasListenersByType(key) || globalAdapter.isEnabled(this.object, key));
    };
    Adapter.prototype._shouldDispatch = function (key) {
        var count = this._disabled[key];
        if (!$type.isNumber(count)) {
            return true;
        }
        else {
            if (count <= 1) {
                delete this._disabled[key];
            }
            else {
                --this._disabled[key];
            }
            return false;
        }
    };
    /**
     * Passes the input value through all the callbacks for the defined `key`.
     *
     * @param key      Key
     * @param value    Input value
     * @param ...rest  Rest of the parameters to be passed into callback
     * @return Output value
     */
    Adapter.prototype.apply = function (key, value) {
        if (this._shouldDispatch(key)) {
            // This is needed to improve the performance and reduce garbage collection
            var callbacks = this._callbacks.values;
            var length_1 = callbacks.length;
            if (length_1 > 0) {
                for (var i = 0; i < length_1; ++i) {
                    var item = callbacks[i];
                    if (item.key === key) {
                        value = item.callback.call(item.scope, value, this.object, key);
                    }
                }
            }
            // Apply global adapters
            value = globalAdapter.applyAll(this.object, key, value);
            return value;
        }
        else {
            return value;
        }
    };
    /**
     * Returns all adapter keys which are in this adapter.
     *
     * @return Adapter keys
     */
    Adapter.prototype.keys = function () {
        // TODO inefficient
        return $iter.toArray($iter.map(this._callbacks.iterator(), function (x) { return x.key; }));
    };
    /**
     * Copies all the adapter callbacks from `source`.
     *
     * @param source  An Adapter to copy items from
     */
    Adapter.prototype.copyFrom = function (source) {
        var _this = this;
        $iter.each(source._callbacks.iterator(), function (x) {
            _this.add(x.key, x.callback, x.priority, x.scope);
        });
        $object.each(source._disabled, function (key, val) {
            _this._disabled[key] = val;
        });
    };
    /**
     * Clears all callbacks from this Adapter.
     */
    Adapter.prototype.clear = function () {
        // TODO should this also re-enable all the keys ?
        this._callbacks.clear();
    };
    return Adapter;
}());
export { Adapter };
//# sourceMappingURL=Adapter.js.map