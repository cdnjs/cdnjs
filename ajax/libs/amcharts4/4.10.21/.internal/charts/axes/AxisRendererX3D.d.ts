/**
 * Module, defining Axis Renderer for horizontal 3D axes.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { AxisRendererX, IAxisRendererXProperties, IAxisRendererXAdapters, IAxisRendererXEvents } from "../axes/AxisRendererX";
import { Sprite, ISpriteEvents, AMEvent } from "../../core/Sprite";
import { XYChart3D } from "../types/XYChart3D";
import { Grid } from "../axes/Grid";
import { MutableValueDisposer } from "../../core/utils/Disposer";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[AxisRendererX3D]].
 */
export interface IAxisRendererX3DProperties extends IAxisRendererXProperties {
}
/**
 * Defines events for [[AxisRendererX3D]].
 */
export interface IAxisRendererX3DEvents extends IAxisRendererXEvents {
}
/**
 * Defines adapters for [[AxisRendererX3D]].
 *
 * @see {@link Adapter}
 */
export interface IAxisRendererX3DAdapters extends IAxisRendererXAdapters, IAxisRendererX3DProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Renderer for horizontal 3D axis.
 *
 * @see {@link IAxisRendererX3DEvents} for a list of available events
 * @see {@link IAxisRendererX3DAdapters} for a list of available Adapters
 */
export declare class AxisRendererX3D extends AxisRendererX {
    /**
     * Defines available properties
     */
    _properties: IAxisRendererX3DProperties;
    /**
     * Defines available adapters
     */
    _adapter: IAxisRendererX3DAdapters;
    /**
     * Defines available events.
     */
    _events: IAxisRendererX3DEvents;
    /**
     * A related chart.
     *
     * @todo Description
     */
    protected _chart: MutableValueDisposer<XYChart3D>;
    /**
     * Constructor.
     *
     * @param axis Related axis
     */
    constructor();
    /**
     * Updates and positions a grid element.
     *
     * @ignore Exclude from docs
     * @param grid         Grid element
     * @param position     Starting position
     * @param endPosition  End position
     */
    updateGridElement(grid: Grid, position: number, endPosition: number): void;
    /**
     * Updates and positions the base grid element.
     *
     * @ignore Exclude from docs
     */
    updateBaseGridElement(): void;
    /**
     * Chart, associated with the Axis.
     *
     * @ignore Exclude from docs
     * @param value Chart
     */
    /**
    * @ignore Exclude from docs
    * @return Chart
    */
    chart: XYChart3D;
    /**
     * Invoked when 3D-related settings change, like depth or angle.
     *
     * @param event Event
     */
    protected handle3DChanged(event: AMEvent<Sprite, ISpriteEvents>["propertychanged"]): void;
}
