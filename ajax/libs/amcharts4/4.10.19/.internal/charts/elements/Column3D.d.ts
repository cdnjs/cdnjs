/**
 * Module that defines everything related to building 3D Columns.
 * It is a container which has column3D element which is a Rectangle3D.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Column, IColumnProperties, IColumnAdapters, IColumnEvents } from "./Column";
import { Rectangle3D } from "../../core/elements/3d/Rectangle3D";
import { Color } from "../../core/utils/Color";
import { RadialGradient } from "../../core/rendering/fills/RadialGradient";
import { LinearGradient } from "../../core/rendering/fills/LinearGradient";
import { Pattern } from "../../core/rendering/fills/Pattern";
import * as $type from "../../core/utils/Type";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[Column3D]].
 */
export interface IColumn3DProperties extends IColumnProperties {
}
/**
 * Defines events for [[Column3D]].
 */
export interface IColumn3DEvents extends IColumnEvents {
}
/**
 * Defines adapters for [[Column3D]].
 *
 * @see {@link Adapter}
 */
export interface IColumn3DAdapters extends IColumnAdapters, IColumn3DProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Class used to creates Column3Ds.
 *
 * @see {@link IColumn3DEvents} for a list of available events
 * @see {@link IColumn3DAdapters} for a list of available Adapters
 * @todo Usage example
 * @important
 */
export declare class Column3D extends Column {
    /**
     * Defines available properties.
     */
    _properties: IColumn3DProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IColumn3DAdapters;
    /**
     * Defines available events.
     */
    _events: IColumn3DEvents;
    /**
     * column3D element
     */
    column3D: Rectangle3D;
    /**
     * Constructor
     */
    constructor();
    /**
     * @ignore
     */
    protected createAssets(): void;
    /**
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * Copies all parameters from another [[Column3D]].
     *
     * @param source Source Column3D
     */
    copyFrom(source: this): void;
    /**
     * Sets actual `fill` property on the SVG element, including applicable color
     * modifiers.
     *
     * @ignore Exclude from docs
     * @param value  Fill
     */
    protected setFill(value: $type.Optional<Color | Pattern | LinearGradient | RadialGradient>): void;
}
