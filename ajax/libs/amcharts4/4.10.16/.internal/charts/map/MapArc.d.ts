/**
 * Map arched line module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { MapLine, IMapLineProperties, IMapLineAdapters, IMapLineEvents } from "./MapLine";
import { Polyarc } from "../../core/elements/Polyarc";
import { MapArcSeries } from "./MapArcSeries";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[MapArc]].
 */
export interface IMapArcProperties extends IMapLineProperties {
}
/**
 * Defines events for [[MapArc]].
 */
export interface IMapArcEvents extends IMapLineEvents {
}
/**
 * Defines adapters for [[MapArc]].
 *
 * @see {@link Adapter}
 */
export interface IMapArcAdapters extends IMapLineAdapters, IMapArcProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to draw an arched line on the map.
 *
 * @see {@link IMapArcEvents} for a list of available events
 * @see {@link IMapArcAdapters} for a list of available Adapters
 */
export declare class MapArc extends MapLine {
    /**
     * Defines available properties.
     */
    _properties: IMapArcProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IMapArcAdapters;
    /**
     * Defines available events.
     */
    _events: IMapArcEvents;
    /**
     * A visual element.
     */
    line: Polyarc;
    /**
     * A map series this object belongs to.
     */
    series: MapArcSeries;
    /**
     * Constructor
     */
    constructor();
    /**
     * @ignore
     */
    protected createLine(): void;
    /**
     * `shortestDistance = true` is not supported by `MapArc`.
     *
     * Only [[MapLine]] supports it.
     *
     * @default false
     * @param value
     */
    shortestDistance: boolean;
}
