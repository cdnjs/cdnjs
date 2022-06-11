/**
 * @param {string} key Key name.
 * @return {string} Change name.
 */
export function getChangeEventType(key: string): string;
/**
 * @classdesc
 * Events emitted by {@link module:ol/Object~BaseObject} instances are instances of this type.
 */
export class ObjectEvent extends Event {
    /**
     * @param {string} type The event type.
     * @param {string} key The property name.
     * @param {*} oldValue The old value for `key`.
     */
    constructor(type: string, key: string, oldValue: any);
    /**
     * The name of the property whose value is changing.
     * @type {string}
     * @api
     */
    key: string;
    /**
     * The old value. To get the new value use `e.target.get(e.key)` where
     * `e` is the event object.
     * @type {*}
     * @api
     */
    oldValue: any;
}
export default BaseObject;
import Event from "./events/Event.js";
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Most non-trivial classes inherit from this.
 *
 * This extends {@link module:ol/Observable} with observable
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
declare class BaseObject extends Observable {
    /**
     * @param {Object<string, *>=} opt_values An object with key-value pairs.
     */
    constructor(opt_values?: {
        [x: string]: any;
    });
    /**
     * @private
     * @type {!Object<string, *>}
     */
    private values_;
    /**
     * Gets a value.
     * @param {string} key Key name.
     * @return {*} Value.
     * @api
     */
    get(key: string): any;
    /**
     * Get a list of object property names.
     * @return {Array<string>} List of property names.
     * @api
     */
    getKeys(): string[];
    /**
     * Get an object of all property names and values.
     * @return {Object<string, *>} Object.
     * @api
     */
    getProperties(): {
        [x: string]: any;
    };
    /**
     * @param {string} key Key name.
     * @param {*} oldValue Old value.
     */
    notify(key: string, oldValue: any): void;
    /**
     * Sets a value.
     * @param {string} key Key name.
     * @param {*} value Value.
     * @param {boolean=} opt_silent Update without triggering an event.
     * @api
     */
    set(key: string, value: any, opt_silent?: boolean): void;
    /**
     * Sets a collection of key-value pairs.  Note that this changes any existing
     * properties and adds new ones (it does not remove any existing properties).
     * @param {Object<string, *>} values Values.
     * @param {boolean=} opt_silent Update without triggering an event.
     * @api
     */
    setProperties(values: {
        [x: string]: any;
    }, opt_silent?: boolean): void;
    /**
     * Unsets a property.
     * @param {string} key Key name.
     * @param {boolean=} opt_silent Unset without triggering an event.
     * @api
     */
    unset(key: string, opt_silent?: boolean): void;
}
import Observable from "./Observable.js";
//# sourceMappingURL=Object.d.ts.map