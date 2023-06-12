/**
 * Legend-related functionality.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Component, IComponentProperties, IComponentDataFields, IComponentAdapters, IComponentEvents } from "../core/Component";
import { DataItem } from "../core/DataItem";
import { ListTemplate } from "../core/utils/List";
import { Container } from "../core/Container";
import { Label } from "../core/elements/Label";
import { Optional } from "../core/utils/Type";
import { Preloader } from "../core/elements/Preloader";
import { Color } from "../core/utils/Color";
import { RadialGradient } from "../core/rendering/fills/RadialGradient";
import { LinearGradient } from "../core/rendering/fills/LinearGradient";
import { Pattern } from "../core/rendering/fills/Pattern";
import * as $type from "../core/utils/Type";
import { Sprite, ISpriteEvents, AMEvent } from "../core/Sprite";
import { IDisposer } from "../core/utils/Disposer";
import { Scrollbar } from "../core/elements/Scrollbar";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[Legend]].
 *
 * @see {@link DataItem}
 */
export declare class LegendDataItem extends DataItem {
    /**
     * A container data item's elements will be placed in.
     */
    protected _itemContainer: Container;
    /**
     * A [[Label]] element for the item label.
     */
    protected _label: Label;
    /**
     * A [[Container]] for legend item marker.
     */
    protected _marker: Container;
    /**
     * A [[Label]] element for the value label.
     */
    protected _valueLabel: Label;
    /**
     * A data context for legend item.
     */
    dataContext: any;
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: Legend;
    /**
     * @ignore
     */
    childrenCreated: boolean;
    /**
     * @ignore
     */
    colorOrig: $type.Optional<Color | Pattern | LinearGradient | RadialGradient>;
    /**
     * Constructor
     */
    constructor();
    /**
     * A legend item's [[Label]] element.
     *
     * @return Label
     */
    readonly label: Label;
    /**
     * Main color of legend data item.
     *
     * This is set by the target element this legend item represents, like
     * a Series or a Slice.
     *
     * It can be used to derive a color in legend's sub-items, like label:
     *
     * ```TypeScript
     * chart.legend.labels.template.text = "[{color}]{name}[/]";
     * ```
     * ```JavaScript
     * chart.legend.labels.template.text = "[{color}]{name}[/]";
     * ```
     * ```JSON
     * {
     *   // ...
     *   "legend": {
     *     // ...
     *     "labels": {
     *       "text": "[{color}]{name}[/]"
     *     }
     *   }
     * }
     * ```
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/legend/#Legend_labels} For more information about configuring legend labels.
     * @param value  Main color
     */
    /**
    * @return Main color
    */
    color: $type.Optional<Color | Pattern | LinearGradient | RadialGradient>;
    /**
     * A legend item's [[Label]] element for "value label".
     *
     * @return Label
     */
    readonly valueLabel: Label;
    /**
     * A reference to the main [[Container]] that holds legend item's elements:
     * marker and labels.
     *
     * @return Item container
     */
    readonly itemContainer: Container;
    /**
     * A [[Container]] that holds legend item's marker element.
     *
     * @return Marker
     */
    readonly marker: Container;
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines a class that carries legend settings.
 *
 * A legend might change its settings dynamically. Legend can also be shared
 * by several elements, requiring different settings.
 *
 * Having legend's settings in a separate object is a good way to "hot swap"
 * a set of settings for the legend.
 */
export declare class LegendSettings {
    /**
     * [valueText description]
     *
     * @todo Description
     */
    valueText: string;
    /**
     * [labelText description]
     *
     * @todo Description
     */
    labelText: string;
    /**
     * A text template for the value part of the legend item.
     */
    itemValueText: string;
    /**
     * A text template for the label part of the legend item.
     */
    itemLabelText: string;
    /**
     * Should marker be created for each legend item.
     */
    createMarker: boolean;
}
/**
 * Represents types available for Legend position. Not all charts will pay attention to this, like MapChart. You'll need to use legend.align and legend.valign properties to position legend on MapChart.
 */
export declare type LegendPosition = "left" | "right" | "top" | "bottom" | "absolute";
/**
 * Defines data fields for [[Legend]].
 */
export interface ILegendDataFields extends IComponentDataFields {
    /**
     * A field name in the data item which holds name of the legend item.
     */
    name?: string;
    /**
     * A field name in data item which holds boolean value whether item should
     * be displayed in legend or not.
     */
    visible?: string;
}
/**
 * Defines properties for [[Legend]].
 */
export interface ILegendProperties extends IComponentProperties {
    /**
     * Should legend use default marker?
     *
     * If set to `false`, the legend will try to mirror the look of the actual
     * item, like series.
     *
     * @default true
     */
    useDefaultMarker?: boolean;
    /**
     * Position of the legend.
     *
     * Options: "left", "right", "top", "bottom" (default), or "absolute".
     *
     * @default "bottom"
     */
    position?: LegendPosition;
    /**
     * If set to `true` the Legend will display a scrollbar if its contents do
     * not fit into its `maxHeight`.
     *
     * @default false
     * @since 4.8.0
     */
    scrollable?: boolean;
}
/**
 * Defines events for [[Legend]].
 */
export interface ILegendEvents extends IComponentEvents {
}
/**
 * Defines adapters for [[Legend]].
 *
 * @see {@link Adapter}
 */
export interface ILegendAdapters extends IComponentAdapters, ILegendProperties {
}
export interface ILegendItemEvents {
    propertychanged: {
        /**
         * Property key.
         */
        property: string;
    };
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * [[Legend]] class is used to create legend for the chart.
 *
 * @see {@link https://www.amcharts.com/docs/v4/concepts/legend/} for Legend documentation
 * @see {@link ILegendEvents} for a list of available events
 * @see {@link ILegendAdapters} for a list of available Adapters
 */
export declare class Legend extends Component {
    /**
     * Defines the type of the data fields.
     */
    _dataFields: ILegendDataFields;
    /**
     * Defines available properties.
     */
    _properties: ILegendProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ILegendAdapters;
    /**
     * Defines available events.
     */
    _events: ILegendEvents;
    /**
     * Defines data item type.
     */
    _dataItem: LegendDataItem;
    /**
     * List of legend Item containers. Legend item containers contain marker, title label and value label.
     */
    itemContainers: ListTemplate<Container>;
    /**
     * List of legend item labels.
     */
    labels: ListTemplate<Label>;
    /**
     * List of legend item markers.
     */
    markers: ListTemplate<Container>;
    /**
     * List of legend item value labels.
     */
    valueLabels: ListTemplate<Label>;
    /**
     * Currently focused legend item (for toggling via keyboard)
     */
    focusedItem: Optional<this["_dataItem"]>;
    scrollbar: Scrollbar;
    protected _mouseWheelDisposer: IDisposer;
    /**
     * Constructor
     */
    constructor();
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    protected applyInternalDefaults(): void;
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    protected createDataItem(): this["_dataItem"];
    /**
     * [validateDataElements description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    protected validateDataElements(): void;
    /**
     * [validateDataElement description]
     *
     * @ignore Exclude from docs
     * @param dataItem Data item
     * @todo Description
     * @todo Figure out how to update appearance of legend item without losing focus
     * @todo Update legend marker appearance as apperance of related series changes
     */
    validateDataElement(dataItem: this["_dataItem"]): void;
    afterDraw(): void;
    protected handleScrollbar(): void;
    /**
     * Position of the legend.
     *
     * Options: "left", "right", "top", "bottom" (default), or "absolute".
     *
     * IMPORTANT: [[MapChart]] will ignore this setting, as it is using different
     * layout structure than other charts.
     *
     * To position legend in [[MapChart]] set legend's `align` (`"left"` or
     * `"right"`) and `valign` (`"top"` or `"bottom"`) properties instead.
     *
     * @default "bottom"
     * @param value  Position
     */
    /**
    * @return Position
    */
    position: LegendPosition;
    /**
     * Should legend try to mirror the look of the related item when building
     * the marker for legend item?
     *
     * If set to `false` it will try to make the marker look like its related
     * item.
     *
     * E.g. if an item is for a Line Series, it will display a line of the
     * same thickness, color, and will use the same bullets if series have them.
     *
     * If set to `true`, all markers will be shown as squares, regardless of te
     * series type.
     *
     * @default false
     * @param value Use default marker?
     */
    /**
    * @return Use default marker?
    */
    useDefaultMarker: boolean;
    /**
     * If set to `true` the Legend will display a scrollbar if its contents do
     * not fit into its `maxHeight`.
     *
     * Please note that `maxHeight` is automatically set for Legend when its
     * `position` is set to `"left"` or `"right"`.
     *
     * @default false
     * @since 4.8.0
     * @param  value  Legend Scrollable?
     */
    /**
    * @return Legend Scrollable?
    */
    scrollable: boolean;
    /**
     * Handles mouse wheel scrolling of legend.
     *
     * @param  event  Event
     */
    protected handleWheel(event: AMEvent<Sprite, ISpriteEvents>["wheel"]): void;
    protected _handleWheelReal(shift: number): void;
    /**
     * @ignore
     */
    protected updateMasks(): void;
    /**
     * Toggles a legend item.
     *
     * @ignore Exclude from docs
     * @param item Legend item
     * @todo Maybe do it with togglable instead
     */
    toggleDataItem(item: this["_dataItem"]): void;
    /**
     * Override preloader method so that legend does not accidentally show its
     * own preloader.
     *
     * @ignore Exclude from docs
     * @return Always `undefined`
     */
    readonly preloader: Optional<Preloader>;
    /**
     * [handleDataItemPropertyChange description]
     *
     * @ignore Exclude from docs
     */
    handleDataItemPropertyChange(dataItem?: this["_dataItem"], name?: string): void;
}
