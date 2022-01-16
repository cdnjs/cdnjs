/**
 * A module for the mini-map control.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container, IContainerProperties, IContainerAdapters, IContainerEvents } from "../../core/Container";
import { Sprite, ISpriteEvents, AMEvent } from "../../core/Sprite";
import { Rectangle } from "../../core/elements/Rectangle";
import { MapChart } from "../types/MapChart";
import { MapSeries } from "./MapSeries";
import { List, IListEvents } from "../../core/utils/List";
import { MutableValueDisposer } from "../../core/utils/Disposer";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[SmallMap]].
 */
export interface ISmallMapProperties extends IContainerProperties {
}
/**
 * Defines events for [[SmallMap]].
 */
export interface ISmallMapEvents extends IContainerEvents {
}
/**
 * Defines adapters for [[SmallMap]].
 *
 * @see {@link Adapter}
 */
export interface ISmallMapAdapters extends IContainerAdapters, ISmallMapProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a "bird's eye" view of the whole map.
 *
 * This control creates a mini-map with the whole of the map, highlighting
 * the area which is in the current viewport of the map map.
 *
 * @see {@link ISmallMapEvents} for a list of available events
 * @see {@link ISmallMapAdapters} for a list of available Adapters
 * @important
 */
export declare class SmallMap extends Container {
    /**
     * Defines available properties.
     */
    _properties: ISmallMapProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ISmallMapAdapters;
    /**
     * Defines available events.
     */
    _events: ISmallMapEvents;
    /**
     * A target map.
     */
    protected _chart: MutableValueDisposer<MapChart>;
    /**
     * A container that holds the visual elements for the mini-map.
     *
     * @ignore Exclude from docs
     */
    seriesContainer: Container;
    /**
     * The rectangle element which highlights current viewport.
     */
    rectangle: Rectangle;
    /**
     * A list of map series used to draw the mini-map.
     */
    protected _series: List<MapSeries>;
    /**
     * Constructor
     */
    constructor();
    /**
     * A list of map series used to draw the mini-map.
     *
     * @readonly
     * @return Series
     */
    readonly series: List<MapSeries>;
    /**
     * Decorates a new series when they are pushed into a `series` list.
     *
     * @param event Event
     */
    protected handleSeriesAdded(event: IListEvents<MapSeries>["inserted"]): void;
    /**
     * Cleans up after series are removed from Scrollbar.
     *
     * @param event  Event
     */
    protected handleSeriesRemoved(event: IListEvents<MapSeries>["removed"]): void;
    /**
     * Moves main map pan position after click on the small map.
     *
     * @ignore Exclude from docs
     * @param event  Event
     */
    moveToPosition(event: AMEvent<Sprite, ISpriteEvents>["hit"]): void;
    /**
     * A chart/map that this control is meant for.
     *
     * @param chart  Chart/map
     */
    /**
    * @return Chart/map
    */
    chart: MapChart;
    /**
     * Updates the viewport recangle as per current map zoom/pan position.
     *
     * @ignore Exclude from docs
     */
    updateRectangle(): void;
    /**
     * Update map size so that internal elements can redraw themselves after
     * the size of the small map changes.
     *
     * @ignore Exclude from docs
     */
    updateMapSize(): void;
    /**
     * Update elements after drawing the small map.
     */
    protected afterDraw(): void;
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    processConfig(config?: {
        [index: string]: any;
    }): void;
}
