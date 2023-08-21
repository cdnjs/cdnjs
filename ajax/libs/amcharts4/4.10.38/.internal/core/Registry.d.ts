/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ITheme } from "../themes/ITheme";
import { EventDispatcher, AMEvent } from "./utils/EventDispatcher";
import { Dictionary } from "./utils/Dictionary";
import { Sprite } from "./Sprite";
import { Container } from "./Container";
import { Component } from "./Component";
import * as $type from "./utils/Type";
/**
 * Define events available for [[Registry]]
 */
export interface IRegistryEvents {
    /**
     * Invoked when update cycle starts. Before invalid elements are re-validated.
     */
    enterframe: {};
    /**
     * Invoked when udpate cycle ends. After invalid elements have been
     * re-validated.
     */
    exitframe: {};
}
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
export declare class Registry {
    /**
     * Unique ID of the object.
     */
    uid: string;
    /**
     * Event dispacther.
     */
    events: EventDispatcher<AMEvent<Registry, IRegistryEvents>>;
    /**
     * Holds a universal mapping collection, so that elements and their children
     * can create and look up all kinds of relations between id and object.
     *
     * @ignore Exclude from docs
     */
    protected _map: $type.Optional<Dictionary<string, any>>;
    /**
     * All currently applied themes. All new chart instances created will
     * automatically inherit and retain System's themes.
     */
    themes: ITheme[];
    /**
     * List of all loaded available themes.
     *
     * Whenever a theme loads, it registers itself in System's `loadedThemes`
     * collection.
     */
    loadedThemes: {
        [index: string]: ITheme;
    };
    /**
     * An indeternal counter used to generate unique IDs.
     *
     * @ignore Exclude from docs
     */
    protected _uidCount: number;
    /**
     * Keeps register of class references so that they can be instnatiated using
     * string key.
     *
     * @ignore Exclude from docs
     */
    registeredClasses: {
        [index: string]: any;
    };
    /**
     * Holds all generated placeholders.
     */
    protected _placeholders: {
        [index: string]: string;
    };
    /**
     * A list of invalid(ated) [[Sprite]] objects that need to be re-validated
     * during next cycle.
     *
     * @ignore Exclude from docs
     */
    invalidSprites: {
        [index: string]: Array<Sprite>;
    };
    /**
     * Components are added to this list when their data provider changes to
     * a new one or data is added/removed from their data provider.
     *
     * @ignore Exclude from docs
     */
    invalidDatas: {
        [index: string]: Array<Component>;
    };
    /**
     * Components are added to this list when values of their raw data change.
     * Used when we want a smooth animation from one set of values to another.
     *
     * @ignore Exclude from docs
     */
    invalidRawDatas: Array<Component>;
    /**
     * Components are added to this list when values of their data changes
     * (but not data provider itself).
     *
     * @ignore Exclude from docs
     */
    invalidDataItems: Array<Component>;
    /**
     * Components are added to this list when their data range (selection) is
     * changed, e.g. zoomed.
     *
     * @ignore Exclude from docs
     */
    invalidDataRange: Array<Component>;
    /**
     * A list of [[Sprite]] objects that have invalid(ated) positions, that need
     * to be recalculated.
     *
     * @ignore Exclude from docs
     */
    invalidPositions: {
        [index: string]: Array<Sprite>;
    };
    /**
     * A list of [[Container]] objects with invalid(ated) layouts.
     *
     * @ignore Exclude from docs
     */
    invalidLayouts: {
        [index: string]: Array<Container>;
    };
    /**
     * An array holding all active (non-disposed) top level elemens.
     *
     * When, for example, a new chart is created, its instance will be added to
     * this array, and will be removed when the chart is disposed.
     */
    baseSprites: Array<Sprite>;
    /**
     * An UID-based map of base sprites (top-level charts).
     */
    baseSpritesByUid: {
        [index: string]: Sprite;
    };
    /**
     * Queued charts (waiting for their turn) to initialize.
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/performance/#Daisy_chaining_multiple_charts} for more information
     */
    queue: Array<Sprite>;
    /**
     * An array of deferred charts that haven't been created yet.
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/performance/#Deferred_daisy_chained_instantiation} for more information
     * @since 4.10.0
     */
    deferred: Array<{
        callback: (...args: Array<any>) => Sprite;
        scope?: any;
        args?: Array<any>;
        resolve: any;
    }>;
    constructor();
    /**
     * Generates a unique chart system-wide ID.
     *
     * @return Generated ID
     */
    getUniqueId(): string;
    /**
     * Returns a universal collection for mapping ids with objects.
     *
     * @ignore Exclude from docs
     * @return Map collection
     */
    readonly map: Dictionary<string, any>;
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
     * @ignore Exclude from docs
     * @param key    Key
     * @param value  Value to return if cache is not available
     * @return Value
     */
    getCache(key: string, value?: any): any;
    /**
     * Dispatches an event using own event dispatcher. Will automatically
     * populate event data object with event type and target (this element).
     * It also checks if there are any handlers registered for this sepecific
     * event.
     *
     * @param eventType Event type (name)
     * @param data      Data to pass into event handler(s)
     */
    dispatch<Key extends keyof IRegistryEvents>(eventType: Key, data?: any): void;
    /**
     * Works like `dispatch`, except event is triggered immediately, without
     * waiting for the next frame cycle.
     *
     * @param eventType Event type (name)
     * @param data      Data to pass into event handler(s)
     */
    dispatchImmediately<Key extends keyof IRegistryEvents>(eventType: Key, data?: any): void;
    /**
     * Returns a unique placeholder suitable for the key.
     *
     * @param key  Key
     * @return Random string to be used as placeholder
     */
    getPlaceholder(key: string): string;
    /**
     * @ignore
     */
    addToInvalidComponents(component: Component): void;
    /**
     * @ignore
     */
    removeFromInvalidComponents(component: Component): void;
    /**
     * @ignore
     */
    addToInvalidSprites(sprite: Sprite): void;
    /**
     * @ignore
     */
    removeFromInvalidSprites(sprite: Sprite): void;
    /**
     * @ignore
     */
    addToInvalidPositions(sprite: Sprite): void;
    /**
     * @ignore
     */
    removeFromInvalidPositions(sprite: Sprite): void;
    /**
     * @ignore
     */
    addToInvalidLayouts(sprite: Container): void;
    /**
     * @ignore
     */
    removeFromInvalidLayouts(sprite: Container): void;
}
/**
 * A singleton global instance of [[Registry]].
 *
 * @ignore Exclude from docs
 */
export declare let registry: Registry;
/**
 * Returns `true` if object is an instance of the class. It's the same as `instanceof` except it doesn't need to import the class.
 *
 * @param object Object
 * @param name Class name
 * @return Is instance of class
 */
export declare function is<A>(object: any, name: string): object is A;
