/**
 * Module contains functionality related to [[Sprite]] states.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { BaseObject } from "./Base";
import { registry } from "./Registry";
import { Adapter } from "./utils/Adapter";
import { List, ListDisposer } from "./utils/List";
import { toColor } from "./utils/Color";
import { percent } from "./utils/Percent";
import * as $utils from "./utils/Utils";
import * as $ease from "./utils/Ease";
import * as $object from "./utils/Object";
import * as $type from "./utils/Type";
/**
 * Defines a state for [[Sprite]].
 *
 * A "state" is a special object that has all the same properties as the
 * [[Sprite]] of the same type, and which can be used to quickly apply a set
 * of property values. (set state)
 *
 * When [[Sprite]] (or any object that extends Sprite) is created it creates a
 * "default" state. You can modify the "default" state so that when the Sprite
 * returns to default state certain properties are added.
 *
 * Default state can be accessed using Sprite's `defaultState` getter.
 *
 * ```TypeScript
 * sprite.defaultState.properties.fillOpacity = 0.5;
 * ```
 * ```JavaScript
 * sprite.defaultState.properties.fillOpacity = 0.5;
 * ```
 * ```JSON
 * {
 *   // ...
 *   "defaultState": {
 *     "properties": {
 *       "fillOpacity": 0.5
 *     }
 *   }
 * }
 * ```
 *
 * If Sprite is "hoverable", it automatically adds a "hover" state, which is
 * applied when it has a cursor over it.
 *
 * ```TypeScript
 * let hoverstate = sprite.states.create("hover");
 * hoverstate.properties.fillOpacity = 1;
 * ```
 * ```JavaScript
 * var hoverstate = sprite.states.create("hover");
 * hoverstate.properties.fillOpacity = 1;
 * ```
 * ```JSON
 * {
 *   // ...
 *   "states": {
 *     "hover": {
 *       "properties": {
 *         "fillOpacity": 0.5
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * The above will automatically apply "hover" state when the Sprite is hovered,
 * thus will set its `fillOpacity` property to 1, and will reset it to 0.5 when
 * it's no longer hovered.
 *
 * Every object that inherits from [[Sprite]] can and will add their own
 * properties to the available list.
 *
 * User can create their own states, and apply them as needed:
 *
 * ```TypeScript
 * let myCustomState = sprite.states.create("mystate");
 * myCustomState.properties.fillOpacity = 0.5;
 * myCustomState.properties.strokeOpacity = 0.8;
 * sprite.setState("mystate");
 * ```
 * ```JavaScript
 * var myCustomState = sprite.states.create("mystate");
 * myCustomState.properties.fillOpacity = 0.5;
 * myCustomState.properties.strokeOpacity = 0.8;
 * sprite.setState("mystate");
 * ```
 *
 * @see {@link https://www.amcharts.com/docs/v4/concepts/states/}
 * @important
 */
var SpriteState = /** @class */ (function (_super) {
    __extends(SpriteState, _super);
    /**
     * Constructor
     */
    function SpriteState() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * Duration of the transition to this state. 0 means instantenous transition.
         * Any number means the [[Sprite]] will transit smoothly to this state,
         * animating all animatable properties.
         *
         * @default 0
         * @see {@link https://www.amcharts.com/docs/v4/concepts/animations/} for more info about animations
         */
        _this.transitionDuration = 0;
        /**
         * Easing function to use when transitioning to this state.
         *
         * @default cubicOut
         * @see {@link Ease}
         * @see {@link https://www.amcharts.com/docs/v4/concepts/animations/} for more info about animations
         */
        _this.transitionEasing = $ease.cubicOut;
        /**
         * Collection of properties and their values that should be applied to [[Sprite]]
         * when switching to this State.
         *
         * The property values set on a [[SpriteState]] will override the ones set
         * directly on a [[Sprite]].
         */
        _this.properties = {};
        /**
         * A collection of key/value pairs that can be used to bind specific Sprite
         * properties to [[DataItem]].
         *
         * For example: `fill` property can be bound to `myCustomColor` field in
         * DataItem. The Sprite will automatically get the value for `fill` from its
         * DataItem.
         *
         * SpriteState-specific binding will override binding set directly on
         * [[Sprite]]. I.e. you can make Sprite use different fill color on hover by
         * adding a `fill` binding to a different DataItem key for Sprite's "hover"
         * state object.
         *
         * @see {@link Sprite}
         */
        _this.propertyFields = {};
        //public propertyFields: Dictionary<keyof this["_properties"], string> = new Dictionary<keyof this["_properties"], string>();;
        /**
         * A list of [[Filter]] elements to be applied to the relative [[Sprite]]
         * when switching to this State.
         *
         * @param {List}
         */
        _this.filters = new List();
        /**
         * Identifies if this object is a "template" and should not be treated as
         * real object that is drawn or actually used in the chart.
         */
        _this.isTemplate = false;
        _this.className = "SpriteState";
        // Make filter list disposable
        _this._disposers.push(new ListDisposer(_this.filters));
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(SpriteState.prototype, "adapter", {
        /**
         * Holds Adapter.
         */
        get: function () {
            var _this = this;
            if (!this._adapterO) {
                this._adapterO = new Adapter(this);
                // Decorate adapter with events so that we can apply its settings whenever
                // it is modified
                this._adapterO.events.on("inserted", function (ev) {
                    _this[ev.newValue.key] = _this[ev.newValue.key];
                }, undefined, false);
                this._adapterO.events.on("removed", function (ev) {
                    _this[ev.newValue.key] = _this[ev.newValue.key];
                }, undefined, false);
            }
            return this._adapterO;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns [[Sprite]] element's property value.
     *
     * Will check if there are any bindings with [[DataItem]] and if there are
     * any method callbacks set up for the specific property.
     *
     * @param propertyName  Property name
     * @return Property value
     */
    SpriteState.prototype.getPropertyValue = function (propertyName) {
        var propValue = this.properties[propertyName];
        var sprite = this.sprite;
        if (sprite) {
            var fieldName = this.propertyFields[propertyName];
            if ($type.hasValue(fieldName)) {
                if (sprite.dataItem) {
                    propValue = sprite.dataItem.dataContext[fieldName];
                }
                if (propValue == undefined) {
                    propValue = "__unset";
                }
            }
            // Apply adapters
            // If the value itself is undefined, we're going to pass in Sprite's
            // value to adapters
            // @todo get rid of <any>
            if (!$type.hasValue(propValue)) {
                var spriteValue = sprite.getPropertyValue(propertyName);
                if (this._adapterO) {
                    propValue = this._adapterO.apply(propertyName, spriteValue);
                }
                else {
                    propValue = spriteValue;
                }
                if (propValue == spriteValue) {
                    propValue = undefined;
                }
            }
            else {
                if (this._adapterO) {
                    propValue = this._adapterO.apply(propertyName, propValue);
                }
            }
            /*let method = this.propertyMethods.getKey(propertyName);
            if (method) {
                propValue = method(sprite, propertyName);
            }*/
        }
        return propValue;
    };
    /**
     * Copies all property and style values from another [[SpriteState]] object.
     *
     * @param source  Source [[SpriteState]]
     */
    SpriteState.prototype.copyFrom = function (source) {
        if (source && source != this) {
            this.transitionDuration = source.transitionDuration;
            this.transitionEasing = source.transitionEasing;
            $utils.copyProperties(source.properties, this.properties);
            $utils.copyProperties(source.propertyFields, this.propertyFields);
            this.filters.copyFrom(source.filters);
            if (source._adapterO) {
                this.adapter.copyFrom(source._adapterO);
            }
        }
    };
    Object.defineProperty(SpriteState.prototype, "allValues", {
        /**
         * Returns all values that should be applied by the SpriteState.
         *
         * It takes adapters into account.
         *
         * @ignore Exclude from docs
         * @return Properties
         * @todo Add adapter values
         * @todo proper type this["_properties"]
         */
        get: function () {
            var _this = this;
            // Init return value
            var res = {};
            // Apply adapters to all values
            $object.each(this.properties, function (prop, value) {
                res[prop] = _this.getPropertyValue(prop);
            });
            // Cycle through all adapters and add values for missing properties
            if (this._adapterO) {
                var keys = this._adapterO.keys();
                $object.each(keys, function (_x, prop) {
                    var value = _this.getPropertyValue(prop);
                    res[prop] = value;
                });
            }
            // Cycle through all property fileds and add values for missing properties
            var propertyFields = this.propertyFields;
            $object.each(propertyFields, function (prop) {
                var value = _this.getPropertyValue(prop);
                res[prop] = value;
            });
            return res;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Resets the State to initial state - no values or Filters applied.
     */
    SpriteState.prototype.reset = function () {
        this.properties = {};
        this.filters.clear();
    };
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    SpriteState.prototype.processConfig = function (config) {
        if ($type.hasValue(config) && $type.hasValue(config["properties"])) {
            $object.each(config["properties"], function (key, value) {
                if ($type.isString(value)) {
                    if (value.match(/^[0-9.\-]+\%$/)) {
                        config["properties"][key] = percent($type.toNumber(value));
                    }
                    else if (value.match(/^\#[0-9abcdef]{3,}$/i)) {
                        config["properties"][key] = toColor(value);
                    }
                }
            });
        }
        _super.prototype.processConfig.call(this, config);
    };
    /**
     * Adds easing functions to "function" fields.
     *
     * @param field  Field name
     * @return Assign as function?
     */
    SpriteState.prototype.asFunction = function (field) {
        return field == "transitionEasing" || _super.prototype.asIs.call(this, field);
    };
    return SpriteState;
}(BaseObject));
export { SpriteState };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["SpriteState"] = SpriteState;
//# sourceMappingURL=SpriteState.js.map