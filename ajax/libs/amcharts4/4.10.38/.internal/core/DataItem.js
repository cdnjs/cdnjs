/**
 * Defines functionality for "Data Item"
 *
 * A Data Item can be any object that can hold data. For example [[LineSeries]]
 * holds a number of values, that comprise a line graph. Each of those values
 * (data points) is a {DataItem}.
 *
 * Furthermore the [[LineSeries]] itself can be represented as a entry in the
 * legend. Since legend needs access to Line Series' value, a DataItem is
 * created for the series.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { BaseObjectEvents } from "./Base";
import { Adapter } from "./utils/Adapter";
import { Animation, AnimationDisposer } from "./utils/Animation";
import * as $utils from "./utils/Utils";
import * as $array from "./utils/Array";
//import * as $object from "./utils/Object";
import * as $type from "./utils/Type";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * DataItem represents single element in data, for example a data point in a
 * Serial Chart Series, e.g. a column.
 *
 * DataItem defines relationship between structured data, required for specific
 * chart type or task, and raw source data.
 *
 * It also implements required calculations, updates related visual elements,
 * etc.
 *
 * @todo Description
 * @important
 */
var DataItem = /** @class */ (function (_super) {
    __extends(DataItem, _super);
    /**
     * Constructor
     * @todo Adding events to disposers produces errors in some cases, which means that chart is using disposed Data Items which is not right
     */
    function DataItem() {
        var _this = _super.call(this) || this;
        /**
         * This Data Item is currently disabled.
         *
         * @ignore Exclude from docs
         */
        _this._disabled = false;
        /**
         * Indicates whether Data Item has any properties set.
         *
         * If it does not have any, the code can use this property to check whether
         * they need to apply costly operation of re-applying properties, whenever
         * Data Item-related element is redrawn, e.g. series.
         */
        _this.hasProperties = false;
        /**
         * An object containing calculated values.
         */
        _this.values = {};
        /**
         * An object container current working values.
         */
        //public readonly workingValues: { [index: string]: { [index: string]: number } } = {};
        /**
         * An object containing categories.
         */
        _this.categories = {};
        /**
         * An object containing dates.
         */
        _this.dates = {};
        /**
         * An object containing locations for the Data Item.
         *
         * A location is a position within date or category, or, in some other cases,
         * where there is no single point but rather some period.
         *
         * @see {@link https://www.amcharts.com/docs/v4/concepts/series/#Data_item_locations} for info how data item locations work
         */
        _this.locations = {};
        /**
         * Current working locations.
         */
        _this.workingLocations = {};
        /**
         * An object containing Data Item specific appearance properties in key-value
         * pairs.
         *
         * Sometimes a single Data Item needs to apply different properties than the
         * rest of the data [[Series]] it is part of. E.g. a single column,
         * represented by a Data Item needs to be filled with a different color than
         * the reset of the [[ColumnSeries]] it belongs to.
         *
         * That's where Data Item's `properties` come into play.
         *
         * Please note that you should set Data Item-specific properties using
         * `setProperty()` method, rather than access `properties` object directly.
         */
        _this.properties = {};
        /**
         * A list of [[Sprite]] elements that are associated with this Data Item.
         *
         * E.g. an [[Axis]] Data Item has several separate elements associated with
         * it, like [[AxisTick]], [[AxisLabel]], and [[Grid]].
         *
         * Data Item keeps track of all of them, so it can toggle all related visual
         * elements when it itself is toggled.
         */
        _this.sprites = [];
        /**
         * Identifies if this object is a "template" and should not be treated as
         * real object that is drawn or actually used in the chart.
         */
        _this.isTemplate = false;
        /**
         * The current index within the dataItems
         *
         * @ignore Exclude from docs
         */
        _this._index = null;
        /**
         * Is Data Item currently visible?
         *
         * @ignore Exclude from docs
         */
        _this._visible = true;
        /**
         * Is Data Item currently hidden?
         *
         * @ignore Exclude from docs
         */
        _this._hidden = false;
        /**
         * Should this Data Item be used when calculating data ranges and scales?
         *
         * @ignore Exclude from docs
         */
        _this._ignoreMinMax = false;
        /**
         * Some of the Data Item's data fields may contain an array of children. This
         * property contains an object indicating which fields hold an array, so that
         * they can be processed properly.
         *
         * @ignore Exclude from docs
         */
        _this.hasChildren = {};
        /**
         * Indicates whether Data Item is currently animiting from visible to hidden
         * state.
         */
        _this.isHiding = false;
        /**
         *
         * @ignore Exclude from docs
         */
        _this._valueAnimations = {};
        /**
         *
         * @ignore Exclude from docs
         */
        _this._locationAnimations = {};
        _this.className = "DataItem";
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(DataItem.prototype, "adapter", {
        /**
         * Holds Adapter.
         */
        get: function () {
            if (!this._adapterO) {
                this._adapterO = new Adapter(this);
            }
            return this._adapterO;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "index", {
        /**
         * Data Item's position index in Component's data.
         *
         * @return Index
         */
        get: function () {
            if (this.component) {
                if (this._index != null) {
                    return this._index;
                }
                else {
                    return -1;
                }
            }
            else {
                return -1;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "animations", {
        /**
         * A list of [[Animations]] objects currently mutating Data Item's values.
         *
         * @return [description]
         */
        get: function () {
            if (!this._animations) {
                this._animations = [];
                this._disposers.push(new AnimationDisposer(this._animations));
            }
            return this._animations;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "visible", {
        /**
         * Returns `true` if this Data Item is currently visible.
         *
         * @return Visible?
         */
        get: function () {
            if (this._hidden) {
                return false;
            }
            return this._visible;
        },
        /**
         * Sets visibility of the Data Item.
         *
         * @param value Visible?
         */
        set: function (value) {
            if (value) {
                this.hidden = false;
            }
            if (this._visible != value) {
                this.setVisibility(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "hidden", {
        /**
         * Returns `true` if this Data Item is currently hidden.
         *
         * @return Hidden?
         */
        get: function () {
            return this._hidden;
        },
        /**
         * Sets hidden flag for data item. Mostly used to initially hide data item.
         *
         * @param value Hidden?
         */
        set: function (value) {
            if (this._hidden != value) {
                this._hidden = value;
                if (value) {
                    this.setVisibility(false);
                }
                else {
                    this.setVisibility(true, true);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "__disabled", {
        /**
         * Is this Data Item currently disabled?
         *
         * @ignore Exclude from docs
         * @param {boolean}
         */
        get: function () {
            return this._disabled;
        },
        /**
         * Disables all Sprites associated with this Data Item.
         *
         * @ignore Exclude from docs
         * @param {boolean}
         */
        set: function (value) {
            //	if (this._disabled != value) { // not good
            this._disabled = value;
            $array.each(this.sprites, function (sprite) {
                sprite.__disabled = value;
            });
            //	}
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets visibility of the Data Item.
     *
     * @param value Data Item
     */
    DataItem.prototype.setVisibility = function (value, noChangeValues) {
        $array.each(this.sprites, function (sprite) {
            if (value) {
                sprite.visible = sprite.defaultState.properties.visible;
            }
            else {
                if (sprite.hiddenState) {
                    sprite.visible = sprite.hiddenState.properties.visible;
                }
                else {
                    sprite.visible = false;
                }
            }
        });
        this._visible = value;
        if (this._eventDispatcher && !this.__disabled) {
            if (this.events.isEnabled("visibilitychanged")) {
                var event_1 = {
                    type: "visibilitychanged",
                    target: this,
                    visible: value
                };
                this.events.dispatchImmediately("visibilitychanged", event_1);
            }
        }
    };
    /**
     * Shows the Data Item and related visual elements.
     *
     * @param duration  Animation duration (ms)
     * @param delay     Delay animation (ms)
     * @param fields    A list of fields to set values of
     */
    DataItem.prototype.show = function (duration, delay, fields) {
        var _this = this;
        if (!this.hidden) {
            this.setVisibility(true, true);
            this.isHiding = false;
            if (this._hideDisposer) {
                this.removeDispose(this._hideDisposer);
            }
            var animation_1;
            if (fields) {
                $array.each(fields, function (field) {
                    animation_1 = _this.setWorkingValue(field, _this.values[field].value, duration, delay);
                });
            }
            $array.each(this.sprites, function (sprite) {
                var animation = sprite.show(duration);
                if (animation != null && !animation.isFinished()) {
                    _this._disposers.push(animation);
                    if (delay != null && delay > 0) {
                        animation.delay(delay);
                    }
                }
            });
            return animation_1;
        }
    };
    /**
     * Destroys this object and all related data.
     */
    DataItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        $array.each(this.sprites, function (sprite) {
            sprite.dispose();
        });
        this.sprites = [];
    };
    /**
     * Hides the Data Item and related visual elements.
     *
     * @param duration  Animation duration (ms)
     * @param delay     Delay animation (ms)
     * @param toValue   A value to set to `fields` when hiding
     * @param fields    A list of data fields to set value to `toValue`
     */
    DataItem.prototype.hide = function (duration, delay, toValue, fields) {
        var _this = this;
        this.isHiding = true;
        $array.each(this.sprites, function (sprite) {
            var animation = sprite.hide(duration);
            if (animation != null && !animation.isFinished()) {
                _this._disposers.push(animation);
                if (delay != null && delay > 0) {
                    animation.delay(delay);
                }
            }
        });
        if ($type.isNumber(toValue) && fields) {
            var animation_2;
            $array.each(fields, function (field) {
                var anim = _this.setWorkingValue(field, toValue, duration, delay);
                if (anim) {
                    animation_2 = anim;
                }
            });
            if (animation_2 && !animation_2.isFinished()) {
                this._hideDisposer = animation_2.events.on("animationended", function () {
                    _this.setVisibility(false, true);
                    _this.isHiding = false;
                });
                this._disposers.push(this._hideDisposer);
                return animation_2;
            }
            else {
                this.isHiding = false;
                this.setVisibility(false, true);
            }
        }
        else {
            this.isHiding = false;
            this.setVisibility(false);
        }
    };
    /**
     * Returns a duration (ms) the Data Item should take to animate from one
     * value to another.
     *
     * If the duration is not specified via parameter, this method will try to
     * request a default duration from the related `Component`.
     *
     * @param duration  Default duration (ms)
     * @return Duration (ms)
     */
    DataItem.prototype.getDuration = function (duration) {
        if (!$type.isNumber(duration)) {
            var component = this.component;
            if (component) {
                duration = component.interpolationDuration;
            }
        }
        if (duration != null) {
            if (!this._adapterO) {
                return duration;
            }
            else {
                return this._adapterO.apply("duration", duration);
            }
        }
    };
    /**
     * Returns a numeric value for specific data field.
     *
     * If `calculated` is not set, it will return a raw value, as it is in
     * source data.
     *
     * If `calculated` is set, it will return a pre-calculated specific value.
     *
     * @param name        Data field name
     * @param calculated  A calculated value name
     * @return Value
     */
    DataItem.prototype.getValue = function (name, calculated) {
        if (name && this.component) {
            if (!calculated) {
                calculated = this.component.dataFields[name + "Show"];
                if (!calculated) {
                    calculated = "value";
                }
            }
            var value = this.values[name][calculated];
            if (this._adapterO && this._adapterO.isEnabled("value")) {
                return this._adapterO.apply("value", {
                    value: value,
                    field: name
                }).value;
            }
            else {
                return value;
            }
        }
    };
    /**
     * Returns a current working value for a specific data field.
     *
     * The actual value may differ from the one returned by `getValue()`. The
     * latter returns static values from the data source.
     *
     * `getWorkingValue()` returns current value, which is usually different if
     * Data Item is animating from one state to another.
     *
     * @param name        Data field name
     * @return Value
     */
    DataItem.prototype.getWorkingValue = function (name) {
        if (name && this.component) {
            var realName = this.component.dataFields[name + "Show"];
            if (!realName) {
                realName = "workingValue";
            }
            if (this._adapterO) {
                return this._adapterO.apply("workingValue", {
                    workingValue: this.values[name][realName],
                    field: name
                }).workingValue;
            }
            else {
                return this.values[name][realName];
            }
        }
    };
    /**
     * @ignore
     * @return Value
     */
    DataItem.prototype.getActualWorkingValue = function (name) {
        return this.values[name].workingValue;
    };
    /**
     * Sets a numeric value for specific data field.
     *
     * @param name        Data field name
     * @param value       Value
     * @param calculated  Calculated data field name
     * @param duration    Duration (ms) to animate to new value to
     * @param delay       Delay animation (ms)
     */
    DataItem.prototype.setValue = function (name, value, duration, delay) {
        var currentValue = this.values[name].value;
        var newDuration = this.getDuration(duration);
        value = $type.toNumber(value);
        if (currentValue !== value) {
            this.values[name].value = value;
            if (this._eventDispatcher && !this.__disabled) {
                if (this.events.isEnabled("valuechanged")) {
                    var event_2 = {
                        type: "valuechanged",
                        target: this,
                        property: name
                    };
                    this.events.dispatchImmediately("valuechanged", event_2);
                }
            }
            if (this.component) {
                this.component.handleDataItemValueChange(this, name);
            }
        }
        this.setWorkingValue(name, value, newDuration, delay);
    };
    DataItem.prototype.setCalculatedValue = function (name, value, calculated) {
        var currentValue = this.values[name][calculated];
        if (currentValue !== value && $type.isNumber(value)) {
            this.values[name][calculated] = value;
            if (this._eventDispatcher && !this.__disabled) {
                if (this.events.isEnabled("calculatedvaluechanged")) {
                    var event_3 = {
                        type: "calculatedvaluechanged",
                        target: this,
                        property: name
                    };
                    this.events.dispatchImmediately("calculatedvaluechanged", event_3);
                }
            }
            if (this.component) {
                this.component.handleDataItemCalculatedValueChange(this, name);
            }
        }
    };
    /**
     * Set current working numeric value for a specific data field.
     *
     * @param name        Data field name
     * @param value       Value
     * @param calculated  Calculated data field name
     * @param duration    Duration (ms) to animate to new value to
     * @param delay       Delay animation (ms)
     * @return An [[Animation]] object used for transition to new values
     */
    DataItem.prototype.setWorkingValue = function (name, value, duration, delay) {
        if ($type.isNumber(this.values[name].value)) {
            var newDuration = this.getDuration(duration);
            var workingValue = this.values[name].workingValue;
            if (newDuration != null && newDuration > 0 && $type.isNumber(workingValue) && this.component) { // sometimes NaN is passed, so only change this to != null if all cases of NaN are handled, otherwise animation won't stop
                if (workingValue != value) {
                    var animation = this.animate({ childObject: this.values[name], property: "workingValue", from: workingValue, to: value, dummyData: name }, newDuration, this.component.interpolationEasing);
                    if (delay != null) {
                        animation.delay(delay);
                    }
                    animation.events.on("animationstarted", this.handleInterpolationProgress, this);
                    animation.events.on("animationprogress", this.handleInterpolationProgress, this);
                    animation.events.on("animationended", this.handleInterpolationProgress, this);
                    this._valueAnimations[name] = animation;
                    return animation;
                }
                else {
                    var valueAnimation = this._valueAnimations[name];
                    if (valueAnimation) {
                        valueAnimation.stop();
                    }
                    this.values[name].workingValue = value;
                }
            }
            else {
                var valueAnimation = this._valueAnimations[name];
                if (valueAnimation) {
                    valueAnimation.stop();
                }
                this.values[name].workingValue = value;
                if (this._eventDispatcher && !this.__disabled) {
                    if (this.events.isEnabled("workingvaluechanged")) {
                        var event_4 = {
                            type: "workingvaluechanged",
                            target: this,
                            property: name
                        };
                        this.events.dispatchImmediately("workingvaluechanged", event_4);
                    }
                }
                if (this.component) {
                    this.component.handleDataItemWorkingValueChange(this, name);
                }
            }
        }
    };
    /**
     * Sets a relative location for a data field.
     *
     * A location is always relative on a 0 to 1 scale, with 0 being beginning,
     * 0.5 middle and 1 end.
     *
     * @todo Rewiew description
     * @param name      Data field name
     * @param value     Location (0-1)
     * @param duration  Duration (ms) to animate to new value to
     * @param delay     Delay animation (ms)
     */
    DataItem.prototype.setLocation = function (name, value, duration, delay) {
        var currentLocation = this.locations[name];
        if (currentLocation !== value) {
            this.locations[name] = value;
            if (this._eventDispatcher && !this.__disabled) {
                if (this.events.isEnabled("locationchanged")) {
                    var event_5 = {
                        type: "locationchanged",
                        target: this,
                        property: name
                    };
                    this.events.dispatchImmediately("locationchanged", event_5);
                }
            }
            if (this.component) {
                this.component.handleDataItemValueChange(this, name); // correct
            }
            this.setWorkingLocation(name, value, duration, delay);
        }
    };
    /**
     * Sets a current working location for a data field.
     *
     * @todo Rewiew description
     * @param name      Data field name
     * @param value     Location (0-1)
     * @param duration  Duration (ms) to animate to new value to
     * @param delay     Delay animation (ms)
     */
    DataItem.prototype.setWorkingLocation = function (name, value, duration, delay) {
        var newDuration = this.getDuration(duration);
        var workingLocation = this.workingLocations[name];
        if (newDuration != null && newDuration > 0 && $type.isNumber(workingLocation) && this.component) { // sometimes NaN is passed, so only change this to != null if all cases of NaN are handled, otherwise animation won't stop
            if (workingLocation != value) {
                var animation = this.animate({ childObject: this.workingLocations, property: name, from: workingLocation, to: value, dummyData: name }, newDuration, this.component.interpolationEasing);
                if (delay != null) {
                    animation.delay(delay);
                }
                animation.events.on("animationstarted", this.handleInterpolationProgress, this);
                animation.events.on("animationprogress", this.handleInterpolationProgress, this);
                animation.events.on("animationended", this.handleInterpolationProgress, this);
                this._locationAnimations[name] = animation;
                return animation;
            }
            else {
                var locationAnimation = this._locationAnimations[name];
                if (locationAnimation) {
                    locationAnimation.stop();
                }
                this.workingLocations[name] = value;
            }
        }
        else {
            var locationAnimation = this._locationAnimations[name];
            if (locationAnimation) {
                locationAnimation.stop();
            }
            this.workingLocations[name] = value;
            if (this._eventDispatcher && !this.__disabled) {
                if (this.events.isEnabled("workinglocationchanged")) {
                    var event_6 = {
                        type: "workinglocationchanged",
                        target: this,
                        property: name
                    };
                    this.events.dispatchImmediately("workinglocationchanged", event_6);
                }
            }
            if (this.component) {
                this.component.handleDataItemWorkingLocationChange(this, name);
            }
        }
    };
    /**
     * Sets Date value to a data field.
     *
     * @param name      Data field name
     * @param date      Date object
     * @param duration  Duration (ms) to animate to new value to
     */
    DataItem.prototype.setDate = function (name, date, duration) {
        if (!$type.isDate(date) && this.component) {
            date = this.component.dateFormatter.parse(date);
        }
        var currentDate = this.dates[name];
        if (currentDate !== date) {
            this.dates[name] = date;
            this.setValue(name, date.getTime(), duration);
        }
    };
    /**
     * Returns a Date value of the data field.
     *
     * @param name  Data field name
     * @return Date object
     */
    DataItem.prototype.getDate = function (name) {
        if (this._adapterO) {
            return this._adapterO.apply("date", {
                date: this.dates[name],
                field: name
            }).date;
        }
        else {
            return this.dates[name];
        }
    };
    /**
     * Sets a Data Item-specific visual properties to apply to related elements.
     *
     * @param name   Property name
     * @param value  Property value
     */
    DataItem.prototype.setProperty = function (name, value) {
        if (this.properties[name] !== value) {
            this.hasProperties = true;
            this.properties[name] = value;
            if (this._eventDispatcher && !this.__disabled) {
                if (this.events.isEnabled("propertychanged")) {
                    var event_7 = {
                        type: "propertychanged",
                        target: this,
                        property: name,
                        value: value
                    };
                    this.events.dispatchImmediately("propertychanged", event_7);
                }
            }
            if (this.component) {
                this.component.handleDataItemPropertyChange(this, name);
            }
        }
    };
    /**
     * Sets a related category for this Data Item.
     *
     * @todo Review description
     * @param name   Data field name
     * @param value  Category
     */
    DataItem.prototype.setCategory = function (name, value) {
        if (!$type.isString(value)) {
            value = $type.castString(value);
        }
        if (this.categories[name] !== value) {
            this.categories[name] = value;
        }
    };
    /**
     * Clones the Data Item, including all related data.
     *
     * @return New Data Item clone
     */
    //public clone(cloneId?: string): this {
    //	let dataItem: this = super.clone(cloneId);
    //	dataItem.copyFrom(this);
    //	return dataItem;
    //}
    /**
     * Copies all properties and related data from different data item.
     *
     * @param object Source data item
     */
    DataItem.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        if (source.dataContext) {
            this.dataContext = $utils.copy(source.dataContext, {});
        }
        $utils.copyProperties(source.locations, this.locations);
        /*
        $utils.copyProperties(source.properties, this.properties);
        $utils.copyProperties(source.categories, this.categories);
        $utils.copyProperties(source.values, this.values);
        $utils.copyProperties(source.dates, this.dates);

        $object.each(source.values, (name, value) => {
            this.values[name] = $object.copy(value);
        });*/
        if (source._adapterO) {
            this.adapter.copyFrom(source._adapterO);
        }
        //this.events.copyFrom(source.events); // because copied in Base
        this.component = source.component;
    };
    Object.defineProperty(DataItem.prototype, "opacity", {
        /**
         * Sets opacity for all Data Item's related elements (Sprites).
         *
         * @param value Opacity (0-1)
         */
        set: function (value) {
            $array.each(this.sprites, function (sprite) {
                sprite.opacity = value;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "ignoreMinMax", {
        /**
         * Exclude from min/max calculations?
         * @return Exclude from min/max calculations?
         */
        get: function () {
            return this._ignoreMinMax;
        },
        /**
         * Sets whether this data point should not be included in the scale and
         * minimum/maximum calculations.
         *
         * E.g. some we may want to exclude a particular data point from influencing
         * [[ValueAxis]] scale.
         *
         * @param value  Exclude from min/max calculations?
         */
        set: function (value) {
            this._ignoreMinMax = value;
            if (this._eventDispatcher && !this.__disabled) {
                if (this.events.isEnabled("propertychanged")) {
                    var event_8 = {
                        type: "propertychanged",
                        target: this,
                        property: "ignoreMinMax",
                        value: value
                    };
                    this.events.dispatchImmediately("propertychanged", event_8);
                }
            }
            if (this.component) {
                this.component.handleDataItemPropertyChange(this, "ignoreMinMax");
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates and starts an [[Animation]] to interpolate (morph) Data Item's
     * properties and/or values.
     *
     * @see {@link Animation}
     * @param animationOptions  Animation options
     * @param duration          Animation duration (ms)
     * @param easing            Easing function
     * @return Animation
     */
    DataItem.prototype.animate = function (animationOptions, duration, easing) {
        return new Animation(this, animationOptions, duration, easing).start();
    };
    /**
     * Handles intermediate steps when Data Item is interpolating (morphing) from
     * one value to another.
     *
     * @ignore Exclude from docs
     * @param event Event object
     */
    DataItem.prototype.handleInterpolationProgress = function (event) {
        var animation = event.target;
        // it's always only one options, no need cycle
        var animationOptions = animation.animationOptions[0];
        if (animationOptions) {
            if (this._eventDispatcher && !this.__disabled) {
                if (this.events.isEnabled("workingvaluechanged")) {
                    var event_9 = {
                        type: "workingvaluechanged",
                        target: this,
                        property: animationOptions.dummyData
                    };
                    this.events.dispatchImmediately("workingvaluechanged", event_9);
                }
            }
            if (this.component) {
                this.component.handleDataItemWorkingValueChange(this, animationOptions.dummyData);
            }
        }
    };
    /**
     * Checks whether Data Item has values set for all of the data fields,
     * supplied via argument.
     *
     * @ignore Exclude from docs
     * @param fields  Field list to check
     * @return Has values for all fields?
     */
    DataItem.prototype.hasValue = function (fields) {
        // todo: what about categories?
        for (var i = 0, len = fields.length; i < len; i++) {
            var values = this.values[fields[i]];
            if (!values || !$type.hasValue(values.value)) {
                return false;
            }
        }
        return true;
    };
    Object.defineProperty(DataItem.prototype, "depth", {
        /**
         * Depth of the Data Item.
         *
         * In nested data structures, like TreeMap, this indicates the level this
         * data point is at, in relation to the parent Data Item.
         *
         * @return Depth
         */
        get: function () {
            if (!this.parent) {
                return 0;
            }
            else {
                return this.parent.depth + 1;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataItem.prototype, "dataContext", {
        /**
         * Sets to a reference to an original object from Component's data.
         *
         * @return [description]
         */
        get: function () {
            return this._dataContext;
        },
        /**
         * A reference to an original object in Component's data, that this Data Item
         * is derived from.
         *
         * @param value Original data object
         */
        set: function (value) {
            this._dataContext = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * adds a sprite to dataItem.sprites array
     * @ignore
     */
    DataItem.prototype.addSprite = function (sprite) {
        if (sprite.dataItem && sprite.dataItem != this) {
            $array.remove(sprite.dataItem.sprites, sprite);
        }
        if (!this.visible) {
            sprite.hide(0);
        }
        if (this.isHiding) {
            sprite.hide();
        }
        this.sprites.push(sprite);
        sprite.dataItem = this;
    };
    return DataItem;
}(BaseObjectEvents));
export { DataItem };
//# sourceMappingURL=DataItem.js.map