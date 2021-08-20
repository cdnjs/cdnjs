/**
 * Module that defines everything related to building CurveColumns.
 * It is a container which has CurveColumn element which is a Slice.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Column, IColumnProperties, IColumnAdapters, IColumnEvents } from "../../charts/elements/Column";
import { Sprite } from "../../core/Sprite";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[CurveColumn]].
 */
export interface ICurveColumnProperties extends IColumnProperties {
}
/**
 * Defines events for [[CurveColumn]].
 */
export interface ICurveColumnEvents extends IColumnEvents {
}
/**
 * Defines adapters for [[CurveColumn]].
 *
 * @see {@link Adapter}
 */
export interface ICurveColumnAdapters extends IColumnAdapters, ICurveColumnProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Class used to create CurveColumns.
 *
 * @see {@link ICurveColumnEvents} for a list of available events
 * @see {@link ICurveColumnAdapters} for a list of available Adapters
 * @important
 */
export declare class CurveColumn extends Column {
    /**
     * Defines available properties.
     */
    _properties: ICurveColumnProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ICurveColumnAdapters;
    /**
     * Defines available events.
     */
    _events: ICurveColumnEvents;
    /**
     * Radar column element
     */
    curveColumn: Sprite;
    /**
     * @ignore
     */
    CurveColumn: Sprite;
    /**
     * Constructor
     */
    constructor();
    /**
     * @ignore
     */
    protected createAssets(): void;
    /**
     * Copies all parameters from another [[CurveColumn]].
     *
     * @param source Source CurveColumn
     */
    copyFrom(source: this): void;
}
