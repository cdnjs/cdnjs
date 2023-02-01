var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/Object
 */
import Event from './events/Event.js';
import ObjectEventType from './ObjectEventType.js';
import Observable from './Observable.js';
import { assign, isEmpty } from './obj.js';
import { getUid } from './util.js';
/**
 * @classdesc
 * Events emitted by {@link module:ol/Object~BaseObject} instances are instances of this type.
 */
var ObjectEvent = /** @class */ (function (_super) {
    __extends(ObjectEvent, _super);
    /**
     * @param {string} type The event type.
     * @param {string} key The property name.
     * @param {*} oldValue The old value for `key`.
     */
    function ObjectEvent(type, key, oldValue) {
        var _this = _super.call(this, type) || this;
        /**
         * The name of the property whose value is changing.
         * @type {string}
         * @api
         */
        _this.key = key;
        /**
         * The old value. To get the new value use `e.target.get(e.key)` where
         * `e` is the event object.
         * @type {*}
         * @api
         */
        _this.oldValue = oldValue;
        return _this;
    }
    return ObjectEvent;
}(Event));
export { ObjectEvent };
/***
 * @template Return
 * @typedef {import("./Observable").OnSignature<import("./Observable").EventTypes, import("./events/Event.js").default, Return> &
 *    import("./Observable").OnSignature<import("./ObjectEventType").Types, ObjectEvent, Return> &
 *    import("./Observable").CombinedOnSignature<import("./Observable").EventTypes|import("./ObjectEventType").Types, Return>} ObjectOnSignature
 */
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Most non-trivial classes inherit from this.
 *
 * This extends {@link module:ol/Observable~Observable} with observable
 * properties, where each property is observable as well as the object as a
 * whole.
 *
 * Classes that inherit from this have pre-defined properties, to which you can
 * add your owns. The pre-defined properties are listed in this documentation as
 * 'Observable Properties', and have their own accessors; for example,
 * {@link module:ol/Map~Map} has a `target` property, accessed with
 * `getTarget()` and changed with `setTarget()`. Not all properties are however
 * settable. There are also general-purpose accessors `get()` and `set()`. For
 * example, `get('target')` is equivalent to `getTarget()`.
 *
 * The `set` accessors trigger a change event, and you can monitor this by
 * registering a listener. For example, {@link module:ol/View~View} has a
 * `center` property, so `view.on('change:center', function(evt) {...});` would
 * call the function whenever the value of the center property changes. Within
 * the function, `evt.target` would be the view, so `evt.target.getCenter()`
 * would return the new center.
 *
 * You can add your own observable properties with
 * `object.set('prop', 'value')`, and retrieve that with `object.get('prop')`.
 * You can listen for changes on that property value with
 * `object.on('change:prop', listener)`. You can get a list of all
 * properties with {@link module:ol/Object~BaseObject#getProperties}.
 *
 * Note that the observable properties are separate from standard JS properties.
 * You can, for example, give your map object a title with
 * `map.title='New title'` and with `map.set('title', 'Another title')`. The
 * first will be a `hasOwnProperty`; the second will appear in
 * `getProperties()`. Only the second is observable.
 *
 * Properties can be deleted by using the unset method. E.g.
 * object.unset('foo').
 *
 * @fires ObjectEvent
 * @api
 */
var BaseObject = /** @class */ (function (_super) {
    __extends(BaseObject, _super);
    /**
     * @param {Object<string, *>} [opt_values] An object with key-value pairs.
     */
    function BaseObject(opt_values) {
        var _this = _super.call(this) || this;
        /***
         * @type {ObjectOnSignature<import("./events").EventsKey>}
         */
        _this.on;
        /***
         * @type {ObjectOnSignature<import("./events").EventsKey>}
         */
        _this.once;
        /***
         * @type {ObjectOnSignature<void>}
         */
        _this.un;
        // Call {@link module:ol/util.getUid} to ensure that the order of objects' ids is
        // the same as the order in which they were created.  This also helps to
        // ensure that object properties are always added in the same order, which
        // helps many JavaScript engines generate faster code.
        getUid(_this);
        /**
         * @private
         * @type {Object<string, *>}
         */
        _this.values_ = null;
        if (opt_values !== undefined) {
            _this.setProperties(opt_values);
        }
        return _this;
    }
    /**
     * Gets a value.
     * @param {string} key Key name.
     * @return {*} Value.
     * @api
     */
    BaseObject.prototype.get = function (key) {
        var value;
        if (this.values_ && this.values_.hasOwnProperty(key)) {
            value = this.values_[key];
        }
        return value;
    };
    /**
     * Get a list of object property names.
     * @return {Array<string>} List of property names.
     * @api
     */
    BaseObject.prototype.getKeys = function () {
        return (this.values_ && Object.keys(this.values_)) || [];
    };
    /**
     * Get an object of all property names and values.
     * @return {Object<string, *>} Object.
     * @api
     */
    BaseObject.prototype.getProperties = function () {
        return (this.values_ && assign({}, this.values_)) || {};
    };
    /**
     * @return {boolean} The object has properties.
     */
    BaseObject.prototype.hasProperties = function () {
        return !!this.values_;
    };
    /**
     * @param {string} key Key name.
     * @param {*} oldValue Old value.
     */
    BaseObject.prototype.notify = function (key, oldValue) {
        var eventType;
        eventType = "change:".concat(key);
        if (this.hasListener(eventType)) {
            this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
        }
        eventType = ObjectEventType.PROPERTYCHANGE;
        if (this.hasListener(eventType)) {
            this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
        }
    };
    /**
     * @param {string} key Key name.
     * @param {import("./events.js").Listener} listener Listener.
     */
    BaseObject.prototype.addChangeListener = function (key, listener) {
        this.addEventListener("change:".concat(key), listener);
    };
    /**
     * @param {string} key Key name.
     * @param {import("./events.js").Listener} listener Listener.
     */
    BaseObject.prototype.removeChangeListener = function (key, listener) {
        this.removeEventListener("change:".concat(key), listener);
    };
    /**
     * Sets a value.
     * @param {string} key Key name.
     * @param {*} value Value.
     * @param {boolean} [opt_silent] Update without triggering an event.
     * @api
     */
    BaseObject.prototype.set = function (key, value, opt_silent) {
        var values = this.values_ || (this.values_ = {});
        if (opt_silent) {
            values[key] = value;
        }
        else {
            var oldValue = values[key];
            values[key] = value;
            if (oldValue !== value) {
                this.notify(key, oldValue);
            }
        }
    };
    /**
     * Sets a collection of key-value pairs.  Note that this changes any existing
     * properties and adds new ones (it does not remove any existing properties).
     * @param {Object<string, *>} values Values.
     * @param {boolean} [opt_silent] Update without triggering an event.
     * @api
     */
    BaseObject.prototype.setProperties = function (values, opt_silent) {
        for (var key in values) {
            this.set(key, values[key], opt_silent);
        }
    };
    /**
     * Apply any properties from another object without triggering events.
     * @param {BaseObject} source The source object.
     * @protected
     */
    BaseObject.prototype.applyProperties = function (source) {
        if (!source.values_) {
            return;
        }
        assign(this.values_ || (this.values_ = {}), source.values_);
    };
    /**
     * Unsets a property.
     * @param {string} key Key name.
     * @param {boolean} [opt_silent] Unset without triggering an event.
     * @api
     */
    BaseObject.prototype.unset = function (key, opt_silent) {
        if (this.values_ && key in this.values_) {
            var oldValue = this.values_[key];
            delete this.values_[key];
            if (isEmpty(this.values_)) {
                this.values_ = null;
            }
            if (!opt_silent) {
                this.notify(key, oldValue);
            }
        }
    };
    return BaseObject;
}(Observable));
export default BaseObject;
//# sourceMappingURL=Object.js.map