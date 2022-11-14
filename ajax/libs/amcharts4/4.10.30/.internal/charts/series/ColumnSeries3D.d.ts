/**
 * 3D column series module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ColumnSeries, IColumnSeriesProperties, IColumnSeriesDataFields, IColumnSeriesAdapters, IColumnSeriesEvents, ColumnSeriesDataItem } from "../series/ColumnSeries";
import { Container } from "../../core/Container";
import { XYChart3D } from "../types/XYChart3D";
import { Column3D } from "../elements/Column3D";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
export declare class ColumnSeries3DDataItem extends ColumnSeriesDataItem {
    /**
     * A sprite used to draw the column.
     */
    _column: Column3D;
    /**
     * Constructor
     */
    constructor();
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[ColumnSeries3D]].
 */
export interface IColumnSeries3DDataFields extends IColumnSeriesDataFields {
}
/**
 * Defines properties for [[ColumnSeries3D]].
 */
export interface IColumnSeries3DProperties extends IColumnSeriesProperties {
    /**
     * Depth (height) of the slices in the series in pixels.
     *
     * @ignore Exclude from docs
     */
    depth?: number;
    /**
     * Angle of view for the slices in series. (0-360)
     *
     * @ignore Exclude from docs
     */
    angle?: number;
}
/**
 * Defines events for [[ColumnSeries3D]].
 */
export interface IColumnSeries3DEvents extends IColumnSeriesEvents {
}
/**
 * Defines adapters for [[ColumnSeries3D]].
 *
 * @see {@link Adapter}
 */
export interface IColumnSeries3DAdapters extends IColumnSeriesAdapters, IColumnSeries3DProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a 3D column graph.
 *
 * @see {@link IColumnSeries3DEvents} for a list of available Events
 * @see {@link IColumnSeries3DAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
export declare class ColumnSeries3D extends ColumnSeries {
    /**
     * Type of data item.
     */
    _dataItem: ColumnSeries3DDataItem;
    /**
     * Type of column.
     */
    _column: Column3D;
    /**
     * Defines the type for data fields.
     */
    _dataFields: IColumnSeries3DDataFields;
    /**
     * Defines available properties.
     */
    _properties: IColumnSeries3DProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IColumnSeries3DAdapters;
    /**
     * Defines available events.
     */
    _events: IColumnSeries3DEvents;
    /**
     * Specifies how deep in 3d space columns should be drawn.
     *
     * Internal use only.
     *
     * @ignore Exclude from docs
     */
    depthIndex: number;
    /**
     * A chart series belongs to.
     */
    _chart: XYChart3D;
    /**
     * Constructor
     */
    constructor();
    /**
     * @ignore
     */
    readonly columnsContainer: Container;
    /**
     * Validates data item's elements.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    validateDataElementReal(dataItem: this["_dataItem"]): void;
    /**
     * Validates data item's elements.
     *
     * @ignore Exclude from docs
     */
    validateDataElements(): void;
    /**
     * Returns an element to use for 3D bar.
     * @ignore
     * @return Element.
     */
    protected createColumnTemplate(): this["_column"];
    /**
     * Depth (height) of the slices in the series in pixels.
     *
     * @ignore Exclude from docs
     * @param value  Depth (px)
     */
    /**
    * @ignore Exclude from docs
    * @return Depth (px)
    */
    depth: number;
    /**
     * Angle of view for the slices in series. (0-360)
     *
     * @ignore Exclude from docs
     * @param value  Angle (0-360)
     */
    /**
    * @ignore Exclude from docs
    * @return Angle (0-360)
    */
    angle: number;
}
