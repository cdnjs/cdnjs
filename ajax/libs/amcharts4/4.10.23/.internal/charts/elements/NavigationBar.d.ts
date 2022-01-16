/**
 * Functionality for drawing simple NavigationBar.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Component, IComponentProperties, IComponentAdapters, IComponentEvents, IComponentDataFields } from "../../core/Component";
import { Sprite } from "../../core/Sprite";
import { DataItem } from "../../core/DataItem";
import { ListTemplate } from "../../core/utils/List";
import { TextLink } from "../../core/elements/TextLink";
import { Triangle } from "../../core/elements/Triangle";
import * as $iter from "../../core/utils/Iterator";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[NavigationBar]].
 *
 * @see {@link DataItem}
 */
export declare class NavigationBarDataItem extends DataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: NavigationBar;
    /**
     * Constructor
     */
    constructor();
    /**
     * Name of the navigation bar item.
     *
     * @param value  Name
     */
    /**
    * @return Name
    */
    name: string;
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[NavigationBar]].
 */
export interface INavigationBarDataFields extends IComponentDataFields {
    /**
     * Name of nav var item.
     */
    name?: string;
}
/**
 * Defines properties for [[NavigationBar]].
 */
export interface INavigationBarProperties extends IComponentProperties {
}
/**
 * Defines events for [[NavigationBar]].
 */
export interface INavigationBarEvents extends IComponentEvents {
}
/**
 * Defines adapters for [[NavigationBar]].
 *
 * @see {@link Adapter}
 */
export interface INavigationBarAdapters extends IComponentAdapters, INavigationBarProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * NavigationBar class can be used to create a multi-level breadcrumb-style
 * navigation control.
 *
 * @see {@link INavigationBarEvents} for a list of available events
 * @see {@link INavigationBarAdapters} for a list of available Adapters
 * @todo Implement better
 * @important
 */
export declare class NavigationBar extends Component {
    /**
     * Defines data fields.
     */
    _dataFields: INavigationBarDataFields;
    /**
     * Defines available properties.
     */
    _properties: INavigationBarProperties;
    /**
     * Defines available adapters.
     */
    _adapter: INavigationBarAdapters;
    /**
     * Defines available events.
     */
    _events: INavigationBarEvents;
    /**
     * A list of breadcrumbs (links) in the nav bar.
     */
    links: ListTemplate<TextLink>;
    /**
     * [_linksIterator description]
     *
     * @todo Description
     */
    protected _linksIterator: $iter.ListIterator<TextLink>;
    /**
     * [_separatorsIterator description]
     *
     * @todo Description
     */
    protected _separatorsIterator: $iter.ListIterator<Sprite>;
    /**
     * A reference to the link which is currently active.
     */
    activeLink: TextLink;
    /**
     * A list of elements used as nav bar item separators.
     */
    separators: ListTemplate<Triangle>;
    /**
     * Identifies the type of the [[DataItem]] used in this element.
     */
    _dataItem: NavigationBarDataItem;
    /**
     * Constructor
     */
    constructor();
    /**
     * Completely redraws the navigation bar.
     *
     * @ignore Exclude from docs
     */
    validateDataElements(): void;
    /**
     * Creates a visual element for a data item (nav item).
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    validateDataElement(dataItem: this["_dataItem"]): void;
}
