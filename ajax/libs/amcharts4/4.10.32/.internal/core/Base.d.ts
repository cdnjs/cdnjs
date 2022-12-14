/**
 * Base functionality
*/
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { IClone } from "./utils/Clone";
import { List, ListTemplate } from "./utils/List";
import { OrderedListTemplate, SortedListTemplate } from "./utils/SortedList";
import { Dictionary, DictionaryTemplate } from "./utils/Dictionary";
import { IDisposer } from "./utils/Disposer";
import { EventDispatcher, AMEvent } from "./utils/EventDispatcher";
import { Adapter } from "./utils/Adapter";
import { ITheme } from "../themes/ITheme";
import { Ordering } from "./utils/Order";
import * as $type from "./utils/Type";
/**
 * Provides base functionality for all derivative objects, like generating ids,
 * handling cache, etc.
 */
export declare class BaseObject implements IClone<BaseObject>, IDisposer {
    /**
     * A unique ID for this object.
     *
     * Generated on first access by `uid()` getter.
     */
    protected _uid: $type.Optional<string>;
    /**
     * Indicates if this object has already been deleted. Any
     * destruction/disposal code should take this into account when deciding
     * wheter to run potentially costly disposal operations if they already have
     * been run.
     */
    protected _disposed: boolean;
    /**
     * List of IDisposer which will be disposed when the BaseObject is disposed.
     */
    protected _disposers: Array<IDisposer>;
    /**
     * User-defined id of the object.
     */
    protected _id: $type.Optional<string>;
    /**
     * Holds a universal mapping collection, so that elements and their children
     * can create and look up all kinds of relations between id and object.
     */
    protected _map: $type.Optional<Dictionary<string, any>>;
    /**
     * Holds mapping for objects referenced by id in JSON config that are not yet
     * available at processing time.
     */
    protected _delayedMap: $type.Optional<Dictionary<string, any>>;
    /**
     * The theme used by this object.
     */
    protected _themes: $type.Optional<ITheme[]>;
    /**
     * A list of objects that are clones of this object. An object needs to
     * maintain a list of its clones so that properties can be re-applied to
     * clones whenever property on the object they were cloned from changes.
     */
    protected _clones: $type.Optional<List<this>>;
    /**
     * Reference to the original object this object was cloned from. We need to
     * keep this so we can disassociate it from source object when this object
     * is disposed.
     */
    clonedFrom: $type.Optional<this>;
    /**
     * A class name for the object.
     *
     * This property is used by deriving classes to identify which class it is.
     * We could derive the class name from the object itself, however method of
     * doing so is too costly, so we are relying on this property to quickly
     * access type of class.
     *
     * @ignore Exclude from docs
     */
    protected _className: $type.Optional<string>;
    /**
     * [cloneId description]
     *
     * @todo Needs description
     * @ignore Exclude from docs
     */
    cloneId: $type.Optional<string>;
    /**
     * Holds processing error list.
     */
    protected _processingErrors: string[];
    /**
     * Constructor
     * * Sets class name
     */
    constructor();
    protected debug(): void;
    /**
     * Returns object's internal unique ID.
     *
     * @return Unique ID
     */
    readonly uid: string;
    /**
     * Sets the user-defined id of the element.
     *
     * @param value Id
     */
    /**
    * @return Id
    */
    id: $type.Optional<string>;
    /**
     * Returns a universal collection for mapping ids with objects.
     *
     * @ignore Exclude from docs
     * @return Map collection
     */
    readonly map: Dictionary<string, any>;
    /**
     * Returns mapping for objects referenced by id in JSON config that are not yet
     * available at processing time.
     *
     * @ignore Exclude from docs
     * @return Map collection
     */
    readonly delayedMap: Dictionary<string, any>;
    /**
     * Logs an id and property of the target element that is not yet available
     * for later assignment.
     *
     * @ignore
     * @param  property  Property to set
     * @param  id        ID of the target element
     */
    addDelayedMap(property: string, id: string): void;
    /**
     * Processes delayed JSON config items.
     *
     * @ignore
     */
    processDelayedMap(): void;
    /**
     * Applies properties from all assigned themes.
     *
     * @ignore Exclude from docs
     */
    applyTheme(): void;
    /**
     * A list of themes to be used for this element.
     *
     * @ignore Exclude from docs
     * @param value An array of themes
     */
    /**
    * @ignore Exclude from docs
    * @return An array of themes
    */
    themes: $type.Optional<ITheme[]>;
    /**
     * Returns a list of themes that should be applied to this element. It could
     * either be a list of themes set explicitly on this element, or system-wide.
     *
     * @return List of themes
     */
    getCurrentThemes(): ITheme[];
    /**
     * Returns if this object has been already been disposed.
     *
     * @return Is disposed?
     */
    isDisposed(): boolean;
    /**
     * Destroys this object and all related data.
     */
    dispose(): void;
    /**
     * Adds an IDisposer, which will be disposed when this object is disposed.
     *
     * @param target Object to dispose
     * @ignore Exclude from docs
     */
    addDisposer(target: IDisposer): void;
    /**
     * Disposes disposable object and removes it from `_disposers`.
     *
     * @param target Object to dispose
     * @ignore Exclude from docs
     */
    removeDispose(target: IDisposer): void;
    /**
     * Makes a copy of this object and returns the clone. Try to avoid cloning complex objects like chart, create new instances if you need them.
     *
     * @param cloneId  An id to use for clone (if not set a unique id will be generated)
     * @returns Clone
     */
    clone<A extends this>(cloneId?: string): this;
    /**
     * Returns a collection of object's clones.
     *
     * @ignore Exclude from docs
     * @return Clones
     */
    readonly clones: List<this>;
    /**
     * Copies all properties and related data from different element.
     *
     * @param object Source element
     */
    copyFrom(object: this): void;
    /**
     * Element's class name. (a class that was used to instantiate the element)
     *
     * @ignore Exclude from docs
     * @param value  Class name
     */
    /**
    * @ignore Exclude from docs
    * @return Class name
    */
    className: $type.Optional<string>;
    /**
     * Caches value in object's cache.
     *
     * @ignore Exclude from docs
     * @param key    Key
     * @param value  Value
     * @param ttl    TTL in seconds
     */
    setCache(key: string, value: any, ttl?: number): void;
    /**
     * Retrieves cached value.
     *
     * If optional second padarameter is specified, it will return that value
     * if cache is not available or is expired.
     *
     * @ignore Exclude from docs
     * @param key    Key
     * @param value  Value to return if cache is not available
     * @return Value
     */
    getCache(key: string, value?: any): any;
    /**
     * Clears object's local cache.
     *
     * @ignore Exclude from docs
     */
    clearCache(): void;
    /**
     * Creates [[Disposer]] for `setTimeout` function call. This ensures that all
     * timeouts created by the object will be cleared when object itself is
     * disposed.
     *
     * @ignore Exclude from docs
     * @param fn     Callback function
     * @param delay  Timeout (ms)
     * @return Disposer for timeout
     */
    setTimeout(fn: () => void, delay: number): IDisposer;
    /**
     * Creates [[Disposer]] for `setInterval` function call. This ensures that all
     * timeouts created by the object will be cleared when object itself is
     * disposed.
     *
     * @ignore Exclude from docs
     * @param fn     Callback function
     * @param delay  Timeout (ms)
     * @return Disposer for timeout
     */
    setInterval(fn: () => void, delay: number): IDisposer;
    /**
     * ==========================================================================
     * JSON-BASED CONFIG PROCESSING
     * ==========================================================================
     * @hidden
     */
    /**
     * Use this property to set JSON-based config. When set, triggers processing
     * routine, which will go through all properties, and try to apply values,
     * create instances, etc.
     *
     * Use this with caution, as it is a time-consuming process. It's used for
     * initialchart setup only, not routine operations.
     *
     * @param json JSON config
     */
    config: object;
    /**
     * Processes the JSON config.
     *
     * @param json  JSON config
     * @ignore Exclude from docs
     */
    protected processConfig(config?: object): void;
    /**
     * Tries to detect if value is color or percent and converts to proper object
     * if necessary.
     *
     * Returns the same source value if no color/percent detected
     *
     * @param value  Source value
     * @return Converted value
     */
    protected maybeColorOrPercent(value: any): any;
    protected processAdapters(item: Adapter<any, any>, config: any): void;
    protected processEvents(item: EventDispatcher<any>, config: any): void;
    /**
     * Processes JSON config for a [[DictionaryTemplate]] item.
     *
     * @todo Description
     * @param item    Item
     * @param config  Config
     */
    protected processDictionaryTemplate(item: DictionaryTemplate<any, any>, config: any): void;
    /**
     * Processes JSON config for a [[Dictionary]] item.
     *
     * @todo Description
     * @param item    Item
     * @param config  Config
     */
    protected processDictionary(item: Dictionary<any, any>, config: any): void;
    /**
     * Processes [[ListTemplate]].
     *
     * @param configValue  Config value
     * @param item         Item
     */
    protected processListTemplate(configValue: any, item: ListTemplate<any>): void;
    /**
     * Processes [[OrdererListTemplate]] or [[SortedListTemplate]].
     *
     * @param configValue  Config value
     * @param item         Item
     */
    protected processOrderedTemplate(configValue: any, item: OrderedListTemplate<any> | SortedListTemplate<any>): void;
    /**
     * Processes [[List]].
     *
     * @param configValue  Config value
     * @param item         Item
     */
    protected processList(configValue: any, item: List<any>, parent?: any): void;
    /**
     * This function is used to sort element's JSON config properties, so that
     * some properties that absolutely need to be processed last, can be put at
     * the end.
     *
     * @ignore Exclude from docs
     * @param a  Element 1
     * @param b  Element 2
     * @return Sorting number
     */
    protected configOrder(a: string, b: string): Ordering;
    /**
     * Checks if field should be just assigned as is, without any checking when
     * processing JSON config.
     *
     * Extending functions can override this function to do their own checks.
     *
     * @param field  Field name
     * @return Assign as is?
     */
    protected asIs(field: string): boolean;
    /**
     * Checks if field needs to be converted to function, if it is specified
     * as string.
     *
     * @param field  Field name
     * @return Assign as function?
     */
    protected asFunction(field: string): boolean;
    /**
     * Creates a relevant class instance if such class definition exists.
     *
     * @ignore Exclude from docs
     * @param className  Class name
     * @return Instance
     */
    protected createClassInstance(className: string): Object;
    /**
     * Creates a class instance for a config entry using it's type. (as set in
     * `type` property)
     *
     * @ignore Exclude from docs
     * @param config  Config part
     * @return Instance
     */
    protected createEntryInstance(config: any): any;
    /**
     * Determines config object type.
     *
     * @ignore Exclude from docs
     * @param config  Config part
     * @return Type
     */
    protected getConfigEntryType(config: any): any;
    /**
     * Checks if this element has a property.
     *
     * @ignore Exclude from docs
     * @param prop  Property name
     * @return Has property?
     */
    protected hasProperty(prop: string): boolean;
    /**
     * Checkes whether JSON key is a reserved keyword.
     *
     * @param key  Key
     * @return Reserved
     */
    protected isReserved(key: string): boolean;
    /**
     * A list of errors that happened during JSON processing.
     *
     * @return Errors
     */
    protected readonly processingErrors: string[];
}
/**
 * Defines events for [[BaseObjectEvents]].
 */
export interface IBaseObjectEvents {
}
/**
 * A version of [[BaseObject]] with events properties and methods.
 * Classes that use [[EventDispatcher]] should extend this instead of
 * [[BaseObject]] directly.
 */
export declare class BaseObjectEvents extends BaseObject {
    /**
     * Constructor
     */
    constructor();
    _events: IBaseObjectEvents;
    /**
     * An [[EventDispatcher]] instance
     * @ignore
     */
    _eventDispatcher: EventDispatcher<AMEvent<this, this["_events"]>>;
    /**
     * An [[EventDispatcher]] instance
     */
    readonly events: EventDispatcher<AMEvent<this, this["_events"]>>;
    /**
     * Dispatches an event using own event dispatcher. Will automatically
     * populate event data object with event type and target (this element).
     * It also checks if there are any handlers registered for this sepecific
     * event.
     *
     * @param eventType Event type (name)
     * @param data      Data to pass into event handler(s)
     */
    dispatch<Key extends keyof this["_events"]>(eventType: Key, data?: any): void;
    /**
     * Works like `dispatch`, except event is triggered immediately, without
     * waiting for the next frame cycle.
     *
     * @param eventType Event type (name)
     * @param data      Data to pass into event handler(s)
     */
    dispatchImmediately<Key extends keyof this["_events"]>(eventType: Key, data?: any): void;
    /**
     * Copies all parameters from another [[Sprite]].
     *
     * @param source Source object
     */
    copyFrom(source: this): void;
}
