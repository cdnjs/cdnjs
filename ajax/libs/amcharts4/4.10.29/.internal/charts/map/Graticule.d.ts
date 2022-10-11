/**
 * Graticule (map grid line).
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { MapLine, IMapLineProperties, IMapLineAdapters, IMapLineEvents } from "./MapLine";
import { GraticuleSeries } from "./GraticuleSeries";
import { Polyline } from "../../core/elements/Polyline";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[Graticule]].
 */
export interface IGraticuleProperties extends IMapLineProperties {
}
/**
 * Defines events for [[Graticule]].
 */
export interface IGraticuleEvents extends IMapLineEvents {
}
/**
 * Defines adapters for [[Graticule]].
 *
 * @see {@link Adapter}
 */
export interface IGraticuleAdapters extends IMapLineAdapters, IGraticuleProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Graticule is a map line spanning from the poles or around the globe.
 *
 * @since 4.3.0
 * @see {@link IGraticuleEvents} for a list of available events
 * @see {@link IGraticuleAdapters} for a list of available Adapters
 */
export declare class Graticule extends MapLine {
    /**
     * Defines available properties.
     */
    _properties: IGraticuleProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IGraticuleAdapters;
    /**
     * Defines available events.
     */
    _events: IGraticuleEvents;
    /**
     * A visual element.
     */
    line: Polyline;
    /**
     * A map series this object belongs to.
     */
    series: GraticuleSeries;
    /**
     * Constructor
     */
    constructor();
}
