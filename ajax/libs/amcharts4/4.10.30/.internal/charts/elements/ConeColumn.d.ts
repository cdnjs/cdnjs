/**
 * Module that defines everything related to building Cone Columns.
 * It is a container which has coneColumn element which is a Cone.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Column, IColumnProperties, IColumnAdapters, IColumnEvents } from "./Column";
import { Cone } from "../../core/elements/3d/Cone";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[ConeColumn]].
 */
export interface IConeColumnProperties extends IColumnProperties {
}
/**
 * Defines events for [[ConeColumn]].
 */
export interface IConeColumnEvents extends IColumnEvents {
}
/**
 * Defines adapters for [[ConeColumn]].
 *
 * @see {@link Adapter}
 */
export interface IConeColumnAdapters extends IColumnAdapters, IConeColumnProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Class used to creates ConeColumns.
 *
 * @see {@link IConeColumnEvents} for a list of available events
 * @see {@link IConeColumnAdapters} for a list of available Adapters
 * @todo Usage example
 * @important
 */
export declare class ConeColumn extends Column {
    /**
     * Defines available properties.
     */
    _properties: IConeColumnProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IConeColumnAdapters;
    /**
     * Defines available events.
     */
    _events: IConeColumnEvents;
    /**
     * Cone column element
     */
    coneColumn: Cone;
    /**
     * Constructor
     */
    constructor();
    /**
     * @ignore
     */
    createAssets(): void;
    /**
     * Copies all parameters from another [[ConeColumn]].
     *
     * @param source Source ConeColumn
     */
    copyFrom(source: this): void;
}
