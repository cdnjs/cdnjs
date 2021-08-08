/**
 * Functionality for drawing simple SwitchButtons.
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
import { Button } from "../elements/Button";
import * as $type from "../../core/utils/Type";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[SwitchButton]].
 */
export interface ISwitchButtonProperties extends IContainerProperties {
}
/**
 * Defines events for [[SwitchButton]].
 */
export interface ISwitchButtonEvents extends IContainerEvents {
}
/**
 * Defines adapters for [[SwitchButton]].
 *
 * @see {@link Adapter}
 */
export interface ISwitchButtonAdapters extends IContainerAdapters, ISwitchButtonProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * SwitchButton class is capable of drawing a simple rectangular SwitchButton with
 * optionally rounded corners and an icon in it.
 *
 * @see {@link ISwitchButtonEvents} for a list of available events
 * @see {@link ISwitchButtonAdapters} for a list of available Adapters
 */
export declare class SwitchButton extends Container {
    /**
     * Defines available properties.
     */
    _properties: ISwitchButtonProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ISwitchButtonAdapters;
    /**
     * Defines available events.
     */
    _events: ISwitchButtonEvents;
    /**
     * Icon reference.
     */
    protected _icon: Sprite;
    /**
     * [[Label]] element for SwitchButton content.
     */
    protected _leftLabel: $type.Optional<Label>;
    /**
     * [[Label]] element for SwitchButton content.
     */
    protected _rightLabel: $type.Optional<Label>;
    /**
     * A type for background.
     */
    _background: RoundedRectangle;
    protected _switchButton: Button;
    /**
     * Constructor
     */
    constructor();
    /**
     * [[Label]] element to be used for left text.
     *
     * @param left label element
     */
    /**
    * @return Left label element
    */
    leftLabel: $type.Optional<Label>;
    /**
     * [[Label]] element to be used for left text.
     *
     * @param rigth label element
     */
    /**
    * @return Rigth label element
    */
    rightLabel: $type.Optional<Label>;
    /**
     * @ignore
     * @deprecated Use `switchButton` instead
     */
    readonly switch: $type.Optional<Button>;
    /**
     * A [[Button]] element for switch.
     *
     * @param Button
     */
    /**
    * @return Button
    */
    switchButton: $type.Optional<Button>;
    /**
     * Copies properties and other attributes.
     *
     * @param source  Source
     */
    copyFrom(source: this): void;
}
