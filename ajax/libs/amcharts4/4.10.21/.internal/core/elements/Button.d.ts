/**
 * Functionality for drawing simple buttons.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container, IContainerProperties, IContainerAdapters, IContainerEvents } from "../Container";
import { Sprite } from "../Sprite";
import { Label } from "./Label";
import { RoundedRectangle } from "../elements/RoundedRectangle";
import * as $type from "../../core/utils/Type";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[Button]].
 */
export interface IButtonProperties extends IContainerProperties {
    /**
     * Icon (if available) position - left or right.
     */
    iconPosition?: "left" | "right";
    /**
     * Icon sprite
     */
    icon?: Sprite;
}
/**
 * Defines events for [[Button]].
 */
export interface IButtonEvents extends IContainerEvents {
}
/**
 * Defines adapters for [[Button]].
 *
 * @see {@link Adapter}
 */
export interface IButtonAdapters extends IContainerAdapters, IButtonProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Button class is capable of drawing a simple rectangular button with
 * optionally rounded corners and an icon in it.
 *
 * @see {@link IButtonEvents} for a list of available events
 * @see {@link IButtonAdapters} for a list of available Adapters
 */
export declare class Button extends Container {
    /**
     * Defines available properties.
     */
    _properties: IButtonProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IButtonAdapters;
    /**
     * Defines available events.
     */
    _events: IButtonEvents;
    /**
     * Icon reference.
     */
    protected _icon: Sprite;
    /**
     * [[Label]] element for button content.
     */
    protected _label: $type.Optional<Label>;
    /**
     * A type for background.
     */
    _background: RoundedRectangle;
    /**
     * Constructor
     */
    constructor();
    /**
     * A [[Sprite]] to be used as an icon on button.
     *
     * @param icon Icon Sprite
     */
    /**
    * @return Icon Sprite
    */
    icon: Sprite;
    /**
     * Icon position: "left" or "right".
     *
     * @default "left"
     * @param position  Icon position
     */
    /**
    * @return Icon position
    */
    iconPosition: "left" | "right";
    /**
     * [[Label]] element to be used for text.
     *
     * @param label element
     */
    /**
    * @return Label element
    */
    label: $type.Optional<Label>;
    /**
     * Creates a background element for the button.
     *
     * @ignore Exclude from docs
     * @return Background element
     */
    createBackground(): this["_background"];
    /**
     * Copies properties and other attributes.
     *
     * @param source  Source
     */
    copyFrom(source: this): void;
}
