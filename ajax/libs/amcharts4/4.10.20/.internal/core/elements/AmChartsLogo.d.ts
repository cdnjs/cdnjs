/**
 * AmChartsLogo module.
 *
 * AmChartsLogo shows amCharts logo for non-commercial users of a library.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container, IContainerProperties, IContainerAdapters, IContainerEvents } from "../Container";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[AmChartsLogo]].
 * @ignore Exclude from docs
 */
export interface IAmChartsLogoProperties extends IContainerProperties {
}
/**
 * Defines events for [[AmChartsLogo]].
 * @ignore Exclude from docs
 */
export interface IAmChartsLogoEvents extends IContainerEvents {
}
/**
 * Defines adapters for [[AmChartsLogo]].
 *
 * @see {@link Adapter}
 * @ignore Exclude from docs
 */
export interface IAmChartsLogoAdapters extends IContainerAdapters, IAmChartsLogoProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A class used to draw and display progress indicator.
 *
 * @see {@link IAmChartsLogoEvents} for a list of available events
 * @see {@link IAmChartsLogoAdapters} for a list of available Adapters
 * @ignore Exclude from docs
 */
export declare class AmChartsLogo extends Container {
    /**
     * Defines available properties.
     */
    _properties: IAmChartsLogoProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IAmChartsLogoAdapters;
    /**
     * Defines available events.
     */
    _events: IAmChartsLogoEvents;
    /**
     * Constructor
     */
    constructor();
}
