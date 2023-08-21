/**
 * Map line module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container, IContainerProperties, IContainerAdapters, IContainerEvents } from "../../core/Container";
import { MapLine } from "./MapLine";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[MapLineObject]].
 */
export interface IMapLineObjectProperties extends IContainerProperties {
    /**
     * Sets object's relative position (0-1) within the line.
     *
     * `0` will place the object at the beginning of the line. `1` - at the end.
     *
     * Any intermediate number will place the object at some point within the
     * line.
     */
    position?: number;
    /**
     * If set to `true`, the object will be automatically rotated to face the
     * direction of the line at the specific position.
     *
     * This allows creating images that has its "front" always facing the logical
     * direction of the line.
     *
     * @default false
     */
    adjustRotation?: boolean;
}
/**
 * Defines events for [[MapLineObject]].
 */
export interface IMapLineObjectEvents extends IContainerEvents {
}
/**
 * Defines adapters for [[MapLineObject]].
 *
 * @see {@link Adapter}
 */
export interface IMapLineObjectAdapters extends IContainerAdapters, IMapLineObjectProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws a line on the map.
 *
 * @see {@link IMapLineObjectEvents} for a list of available events
 * @see {@link IMapLineObjectAdapters} for a list of available Adapters
 */
export declare class MapLineObject extends Container {
    /**
     * Defines available properties.
     */
    _properties: IMapLineObjectProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IMapLineObjectAdapters;
    /**
     * Defines available events.
     */
    _events: IMapLineObjectEvents;
    /**
     * A reference to the [[MapLine]] object this object is attached to.
     *
     * @todo Review if necessary (same as parent)
     */
    mapLine: MapLine;
    /**
     * Constructor
     */
    constructor();
    /**
     * (Re)validates element's position.
     *
     * @ignore Exclude from docs
     */
    validatePosition(): void;
    /**
     * Sets object's relative position (0-1) within the line.
     *
     * `0` will place the object at the beginning of the line. `1` - at the end.
     *
     * Any intermediate number will place the object at some point within the
     * line.
     *
     * @param value  Position within the line (0-1)
     */
    /**
    * @return Position within the line
    */
    position: number;
    /**
     * If set to `true`, the object will be automatically rotated to face the
     * direction of the line at the specific position.
     *
     * This allows creating images that has its "front" always facing the logical
     * direction of the line.
     *
     * @default false
     * @param value  Auto-rotate
     */
    /**
    * @return Auto-rotate
    */
    adjustRotation: boolean;
}
