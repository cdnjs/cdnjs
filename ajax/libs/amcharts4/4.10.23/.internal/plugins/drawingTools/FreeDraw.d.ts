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
import { IInteractionEvents } from "../../core/interaction/Interaction";
import { Polyspline } from "../../core/elements/Polyspline";
import { IPoint } from "../../core/defs/IPoint";
import { Orientation } from "../../core/defs/Orientation";
import { Optional } from "../../core/utils/Type";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[FreeDraw]].
 */
export interface IFreeDrawProperties extends IContainerProperties {
}
/**
 * Defines events for [[FreeDraw]].
 */
export interface IFreeDrawEvents extends IContainerEvents {
}
/**
 * Defines adapters for [[FreeDraw]].
 *
 * @see {@link Adapter}
 */
export interface IFreeDrawAdapters extends IContainerAdapters, IFreeDrawProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * FreeDraw class is capable of drawing a simple rectangular button with
 * optionally rounded corners and an icon in it.
 *
 * @see {@link IFreeDrawEvents} for a list of available events
 * @see {@link IFreeDrawAdapters} for a list of available Adapters
 */
export declare class FreeDraw extends Container {
    /**
     * Defines available properties.
     */
    _properties: IFreeDrawProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IFreeDrawAdapters;
    /**
     * Defines available events.
     */
    _events: IFreeDrawEvents;
    splines: Polyspline[];
    currentSpline: Polyspline;
    currentPoints: IPoint[];
    isDrawing: boolean;
    protected _direction: Optional<Orientation>;
    protected _prevPoint: Optional<IPoint>;
    /**
     * Constructor
     */
    constructor();
    handleKeyUp(): void;
    handleDraw(event: IInteractionEvents["track"]): void;
    handleDrawStart(event?: AMEvent<Sprite, ISpriteEvents>["down"]): void;
    handleDrawEnd(event: IInteractionEvents["up"]): void;
}
