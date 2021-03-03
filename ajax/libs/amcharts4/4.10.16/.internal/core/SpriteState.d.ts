/**
 * Module contains functionality related to [[Sprite]] states.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { BaseObject } from "./Base";
import { Adapter } from "./utils/Adapter";
import { List } from "./utils/List";
import { Filter } from "./rendering/filters/Filter";
import { Sprite } from "./Sprite";
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
export declare class SpriteState<P, A> extends BaseObject {
    /**
     * Defines property types.
     */
    _properties: P;
    /**
     * Defines adapter types.
     */
    _adapter: A;
    /**
     * Title of the state, i.e. "default", "hidden", etc.
     */
    name: string;
    /**
     * Reference to [[Sprite]] element this State is for.
     */
    sprite: $type.Optional<Sprite>;
    /**
     * @ignore
     */
    _adapterO: Adapter<this, A>;
    /**
     * Holds Adapter.
     */
    readonly adapter: Adapter<this, A>;
    /**
     * Duration of the transition to this state. 0 means instantenous transition.
     * Any number means the [[Sprite]] will transit smoothly to this state,
     * animating all animatable properties.
     *
     * @default 0
     * @see {@link https://www.amcharts.com/docs/v4/concepts/animations/} for more info about animations
     */
    transitionDuration: number;
    /**
     * Easing function to use when transitioning to this state.
     *
     * @default cubicOut
     * @see {@link Ease}
     * @see {@link https://www.amcharts.com/docs/v4/concepts/animations/} for more info about animations
     */
    transitionEasing: (value: number) => number;
    /**
     * Collection of properties and their values that should be applied to [[Sprite]]
     * when switching to this State.
     *
     * The property values set on a [[SpriteState]] will override the ones set
     * directly on a [[Sprite]].
     */
    properties: P;
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
    propertyFields: {
        [index in keyof this["_properties"]]?: string;
    };
    /**
     * A list of [[Filter]] elements to be applied to the relative [[Sprite]]
     * when switching to this State.
     *
     * @param {List}
     */
    filters: List<Filter>;
    /**
     * Identifies if this object is a "template" and should not be treated as
     * real object that is drawn or actually used in the chart.
     */
    isTemplate: boolean;
    /**
     * Constructor
     */
    constructor();
    /**
     * Returns [[Sprite]] element's property value.
     *
     * Will check if there are any bindings with [[DataItem]] and if there are
     * any method callbacks set up for the specific property.
     *
     * @param propertyName  Property name
     * @return Property value
     */
    getPropertyValue<Key extends keyof P>(propertyName: Key): P[Key];
    /**
     * Copies all property and style values from another [[SpriteState]] object.
     *
     * @param source  Source [[SpriteState]]
     */
    copyFrom(source: this): void;
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
    readonly allValues: P;
    /**
     * Resets the State to initial state - no values or Filters applied.
     */
    reset(): void;
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    processConfig(config?: {
        [index: string]: any;
    }): void;
    /**
     * Adds easing functions to "function" fields.
     *
     * @param field  Field name
     * @return Assign as function?
     */
    protected asFunction(field: string): boolean;
}
