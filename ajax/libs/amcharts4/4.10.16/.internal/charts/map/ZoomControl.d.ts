/**
 * Zoom control module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container, IContainerProperties, IContainerAdapters, IContainerEvents } from "../../core/Container";
import { Sprite, ISpriteEvents, AMEvent } from "../../core/Sprite";
import { Button } from "../../core/elements/Button";
import { MapChart } from "../types/MapChart";
import { RoundedRectangle } from "../../core/elements/RoundedRectangle";
import { MutableValueDisposer } from "../../core/utils/Disposer";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[ZoomControl]].
 */
export interface IZoomControlProperties extends IContainerProperties {
}
/**
 * Defines events for [[ZoomControl]].
 */
export interface IZoomControlEvents extends IContainerEvents {
}
/**
 * Defines adapters for [[ZoomControl]].
 *
 * @see {@link Adapter}
 */
export interface IZoomControlAdapters extends IContainerAdapters, IZoomControlProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a control for zooming the map.
 *
 * @see {@link IZoomControlEvents} for a list of available events
 * @see {@link IZoomControlAdapters} for a list of available Adapters
 * @important
 */
export declare class ZoomControl extends Container {
    /**
     * Defines available properties.
     */
    _properties: IZoomControlProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IZoomControlAdapters;
    /**
     * Defines available events.
     */
    _events: IZoomControlEvents;
    /**
     * Zoom in button element.
     */
    plusButton: Button;
    /**
     * Zoom out button element.
     */
    minusButton: Button;
    /**
     * A zoom slider background element.
     */
    slider: Container;
    /**
     * A zoom slider thumb element.
     */
    thumb: Button;
    /**
     * A target map.
     */
    protected _chart: MutableValueDisposer<MapChart>;
    /**
     * A type to use for the background element for zoom control.
     */
    _background: RoundedRectangle;
    /**
     * Constructor
     */
    constructor();
    /**
     * @ignore
     */
    protected fixLayout(): void;
    /**
     * Handles zoom operation after clicking on the slider background.
     *
     * @ignore Exclude from docs
     * @param event  Event
     */
    handleBackgroundClick(event: AMEvent<Sprite, ISpriteEvents>["hit"]): void;
    /**
     * A main chart/map that this zoom control is for.
     *
     * @param chart  Map/chart
     */
    /**
    * @return Map/chart
    */
    chart: MapChart;
    /**
     * Updates the slider's thumb size based on the available zoom space.
     *
     * @ignore Exclude from docs
     */
    updateThumbSize(): void;
    /**
     * Updates thumb according to current zoom position from map.
     *
     * @ignore Exclude from docs
     */
    updateThumb(): void;
    /**
     * Zooms the actual map when slider position changes.
     *
     * @ignore Exclude from docs
     */
    handleThumbDrag(): void;
    /**
     * Returns the step countfor the slider grid according to map's min and max
     * zoom level settings.
     *
     * @ignore Exclude from docs
     * @return Step count
     */
    readonly stepCount: number;
    /**
     * Creates a background element for slider control.
     *
     * @ignore Exclude from docs
     * @return Background
     */
    createBackground(): this["_background"];
}
