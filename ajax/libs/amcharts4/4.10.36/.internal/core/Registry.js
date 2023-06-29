import { EventDispatcher } from "./utils/EventDispatcher";
import { Dictionary } from "./utils/Dictionary";
import { cache } from "./utils/Cache";
import * as $type from "./utils/Type";
import * as $string from "./utils/String";
import * as $array from "./utils/Array";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Registry is used to store miscellaneous system-wide information, like ids,
 * maps, themes, and registered classes.
 *
 * @ignore Exclude from docs
 */
var Registry = /** @class */ (function () {
    function Registry() {
        var _this = this;
        /**
         * Event dispacther.
         */
        this.events = new EventDispatcher();
        /**
         * All currently applied themes. All new chart instances created will
         * automatically inherit and retain System's themes.
         */
        this.themes = [];
        /**
         * List of all loaded available themes.
         *
         * Whenever a theme loads, it registers itself in System's `loadedThemes`
         * collection.
         */
        this.loadedThemes = {};
        /**
         * An indeternal counter used to generate unique IDs.
         *
         * @ignore Exclude from docs
         */
        this._uidCount = 0;
        /**
         * Keeps register of class references so that they can be instnatiated using
         * string key.
         *
         * @ignore Exclude from docs
         */
        this.registeredClasses = {};
        /**
         * Holds all generated placeholders.
         */
        this._placeholders = {};
        /**
         * A list of invalid(ated) [[Sprite]] objects that need to be re-validated
         * during next cycle.
         *
         * @ignore Exclude from docs
         */
        this.invalidSprites = {};
        /**
         * Components are added to this list when their data provider changes to
         * a new one or data is added/removed from their data provider.
         *
         * @ignore Exclude from docs
         */
        this.invalidDatas = {};
        /**
         * Components are added to this list when values of their raw data change.
         * Used when we want a smooth animation from one set of values to another.
         *
         * @ignore Exclude from docs
         */
        this.invalidRawDatas = [];
        /**
         * Components are added to this list when values of their data changes
         * (but not data provider itself).
         *
         * @ignore Exclude from docs
         */
        this.invalidDataItems = [];
        /**
         * Components are added to this list when their data range (selection) is
         * changed, e.g. zoomed.
         *
         * @ignore Exclude from docs
         */
        this.invalidDataRange = [];
        /**
         * A list of [[Sprite]] objects that have invalid(ated) positions, that need
         * to be recalculated.
         *
         * @ignore Exclude from docs
         */
        this.invalidPositions = {};
        /**
         * A list of [[Container]] objects with invalid(ated) layouts.
         *
         * @ignore Exclude from docs
         */
        this.invalidLayouts = {};
        /**
         * An array holding all active (non-disposed) top level elemens.
         *
         * When, for example, a new chart is created, its instance will be added to
         * this array, and will be removed when the chart is disposed.
         */
        this.baseSprites = [];
        /**
         * An UID-based map of base sprites (top-level charts).
         */
        this.baseSpritesByUid = {};
        /**
         * Queued charts (waiting for their turn) to initialize.
         *
         * @see {@link https://www.amcharts.com/docs/v4/concepts/performance/#Daisy_chaining_multiple_charts} for more information
         */
        this.queue = [];
        /**
         * An array of deferred charts that haven't been created yet.
         *
         * @see {@link https://www.amcharts.com/docs/v4/concepts/performance/#Deferred_daisy_chained_instantiation} for more information
         * @since 4.10.0
         */
        this.deferred = [];
        this.uid = this.getUniqueId();
        this.invalidSprites.noBase = [];
        this.invalidDatas.noBase = [];
        this.invalidLayouts.noBase = [];
        this.invalidPositions.noBase = [];
        // This is needed for Angular Universal SSR
        if (typeof addEventListener !== "undefined") {
            // This is needed to prevent charts from being cut off when printing
            addEventListener("beforeprint", function () {
                $array.each(_this.baseSprites, function (sprite) {
                    var svg = sprite.paper.svg;
                    svg.setAttribute("viewBox", "0 0 " + svg.clientWidth + " " + svg.clientHeight);
                });
            });
            addEventListener("afterprint", function () {
                $array.each(_this.baseSprites, function (sprite) {
                    var svg = sprite.paper.svg;
                    svg.removeAttribute("viewBox");
                });
            });
        }
    }
    /**
     * Generates a unique chart system-wide ID.
     *
     * @return Generated ID
     */
    Registry.prototype.getUniqueId = function () {
        var uid = this._uidCount;
        this._uidCount += 1;
        return "id-" + uid;
    };
    Object.defineProperty(Registry.prototype, "map", {
        /**
         * Returns a universal collection for mapping ids with objects.
         *
         * @ignore Exclude from docs
         * @return Map collection
         */
        get: function () {
            if (!this._map) {
                this._map = new Dictionary();
            }
            return this._map;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Caches value in object's cache.
     *
     * @ignore Exclude from docs
     * @param key    Key
     * @param value  Value
     * @param ttl    TTL in seconds
     */
    Registry.prototype.setCache = function (key, value, ttl) {
        cache.set(this.uid, key, value, ttl);
    };
    /**
     * Retrieves cached value.
     *
     * @ignore Exclude from docs
     * @param key    Key
     * @param value  Value to return if cache is not available
     * @return Value
     */
    Registry.prototype.getCache = function (key, value) {
        if (value === void 0) { value = undefined; }
        return cache.get(this.uid, key, value);
    };
    /**
     * Dispatches an event using own event dispatcher. Will automatically
     * populate event data object with event type and target (this element).
     * It also checks if there are any handlers registered for this sepecific
     * event.
     *
     * @param eventType Event type (name)
     * @param data      Data to pass into event handler(s)
     */
    Registry.prototype.dispatch = function (eventType, data) {
        // @todo Implement proper type check
        if (this.events.isEnabled(eventType)) {
            if (data) {
                data.type = eventType;
                data.target = data.target || this;
                this.events.dispatch(eventType, {
                    type: eventType,
                    target: this
                });
            }
            else {
                this.events.dispatch(eventType, {
                    type: eventType,
                    target: this
                });
            }
        }
    };
    /**
     * Works like `dispatch`, except event is triggered immediately, without
     * waiting for the next frame cycle.
     *
     * @param eventType Event type (name)
     * @param data      Data to pass into event handler(s)
     */
    Registry.prototype.dispatchImmediately = function (eventType, data) {
        // @todo Implement proper type check
        if (this.events.isEnabled(eventType)) {
            if (data) {
                data.type = eventType;
                data.target = data.target || this;
                this.events.dispatchImmediately(eventType, data);
            }
            else {
                this.events.dispatchImmediately(eventType, {
                    type: eventType,
                    target: this
                });
            }
        }
    };
    /**
     * Returns a unique placeholder suitable for the key.
     *
     * @param key  Key
     * @return Random string to be used as placeholder
     */
    Registry.prototype.getPlaceholder = function (key) {
        if ($type.hasValue(this._placeholders[key])) {
            return this._placeholders[key];
        }
        this._placeholders[key] = "__amcharts_" + key + "_" + $string.random(8) + "__";
        return this._placeholders[key];
    };
    /**
     * @ignore
     */
    Registry.prototype.addToInvalidComponents = function (component) {
        if (component.baseId) {
            $array.move(this.invalidDatas[component.baseId], component);
        }
        else {
            $array.move(this.invalidDatas["noBase"], component);
        }
    };
    /**
     * @ignore
     */
    Registry.prototype.removeFromInvalidComponents = function (component) {
        if (component.baseId) {
            $array.remove(this.invalidDatas[component.baseId], component);
        }
        $array.remove(this.invalidDatas["noBase"], component);
    };
    /**
     * @ignore
     */
    Registry.prototype.addToInvalidSprites = function (sprite) {
        if (sprite.baseId) {
            $array.add(this.invalidSprites[sprite.baseId], sprite);
        }
        else {
            $array.add(this.invalidSprites["noBase"], sprite);
        }
    };
    /**
     * @ignore
     */
    Registry.prototype.removeFromInvalidSprites = function (sprite) {
        if (sprite.baseId) {
            $array.remove(this.invalidSprites[sprite.baseId], sprite);
        }
        $array.remove(this.invalidSprites["noBase"], sprite);
    };
    /**
     * @ignore
     */
    Registry.prototype.addToInvalidPositions = function (sprite) {
        if (sprite.baseId) {
            $array.add(this.invalidPositions[sprite.baseId], sprite);
        }
        else {
            $array.add(this.invalidPositions["noBase"], sprite);
        }
    };
    /**
     * @ignore
     */
    Registry.prototype.removeFromInvalidPositions = function (sprite) {
        if (sprite.baseId) {
            $array.remove(this.invalidPositions[sprite.baseId], sprite);
        }
        $array.remove(this.invalidPositions["noBase"], sprite);
    };
    /**
     * @ignore
     */
    Registry.prototype.addToInvalidLayouts = function (sprite) {
        if (sprite.baseId) {
            $array.add(this.invalidLayouts[sprite.baseId], sprite);
        }
        else {
            $array.add(this.invalidLayouts["noBase"], sprite);
        }
    };
    /**
     * @ignore
     */
    Registry.prototype.removeFromInvalidLayouts = function (sprite) {
        if (sprite.baseId) {
            $array.remove(this.invalidLayouts[sprite.baseId], sprite);
        }
        $array.remove(this.invalidLayouts["noBase"], sprite);
    };
    return Registry;
}());
export { Registry };
/**
 * A singleton global instance of [[Registry]].
 *
 * @ignore Exclude from docs
 */
export var registry = new Registry();
/**
 * Returns `true` if object is an instance of the class. It's the same as `instanceof` except it doesn't need to import the class.
 *
 * @param object Object
 * @param name Class name
 * @return Is instance of class
 */
export function is(object, name) {
    var x = registry.registeredClasses[name];
    return x != null && object instanceof x;
}
//# sourceMappingURL=Registry.js.map