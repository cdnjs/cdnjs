/**
 * Functionality for drawing paths.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container, IContainerProperties, IContainerAdapters, IContainerEvents } from "../../core/Container";
import { Sprite, AMEvent, ISpriteEvents } from "../../core/Sprite";
import { IDisposer } from "../../core/utils/Disposer";
import { Rectangle } from "../../core/elements/Rectangle";
import { Optional } from "../../core/utils/Type";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[Resize]].
 */
export interface IResizeProperties extends IContainerProperties {
}
/**
 * Defines events for [[Resize]].
 */
export interface IResizeEvents extends IContainerEvents {
}
/**
 * Defines adapters for [[Resize]].
 *
 * @see {@link Adapter}
 */
export interface IResizeAdapters extends IContainerAdapters, IResizeProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Resize class is capable of drawing a simple rectangular button with
 * optionally rounded corners and an icon in it.
 *
 * @see {@link IResizeEvents} for a list of available events
 * @see {@link IResizeAdapters} for a list of available Adapters
 */
export declare class Resize extends Container {
    /**
     * Defines available properties.
     */
    _properties: IResizeProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IResizeAdapters;
    /**
     * Defines available events.
     */
    _events: IResizeEvents;
    isResizing: boolean;
    _sprite: Sprite;
    protected _changeDisposer: IDisposer;
    tlGrip: Rectangle;
    trGrip: Rectangle;
    blGrip: Rectangle;
    brGrip: Rectangle;
    constrainProportions: boolean;
    rectangle: Rectangle;
    protected _startWidth: number;
    protected _startHeight: number;
    protected _startX: number;
    protected _startY: number;
    /**
     * Constructor
     */
    constructor();
    sprite: Optional<Sprite>;
    updatePosition(): void;
    protected handleStartResize(): void;
    protected handleGrips(event: AMEvent<Sprite, ISpriteEvents>["drag"]): void;
}
