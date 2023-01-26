/**
 *
 * GMap component provides integration with Google Maps API. This sample demontrates various uses cases like binding, overlays and events. Click the map to add a new item.
 *
 * [Live Demo](https://www.primefaces.org/primereact/gmap/)
 *
 * @module gmap
 *
 */
import * as React from 'react';

/**
 * Custom click event.
 * @see {@link GMapProps.onOverlayClick}
 * @event
 */
interface GMapEvent {
    /**
     * Google Maps mouse event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Clicked overlay
     */
    overlay: any;
    /**
     * Map instance
     */
    map: any;
}

/**
 * Defines valid properties in GMap component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface GMapProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Google Maps API configuration object.
     */
    options?: object | undefined;
    /**
     * An array of overlays to display.
     */
    overlays?: any[] | undefined;
    /**
     * Callback to invoke when the map is ready to be used.
     * @param {*} map - Google Maps instance
     */
    onMapReady?(map: any): void;
    /**
     * Callback to invoke when map is clicked except markers.
     * @param {React.SyntheticEvent} event - Mouse event.
     */
    onMapClick?(event: React.SyntheticEvent): void;
    /**
     * Callback to invoke when the map is ready to be used.
     */
    onMapDragEnd?(): void;
    /**
     * Callback to invoke when zoom level has changed.
     */
    onZoomChanged?(): void;
    /**
     * Callback to invoke when an overlay drag starts.
     * @param {React.SyntheticEvent} event - Google Maps mouse event.
     */
    onOverlayDragStart?(event: React.SyntheticEvent): void;
    /**
     * Callback to invoke when an overlay is being dragged.
     * @param {React.SyntheticEvent} event - Google Maps mouse event.
     */
    onOverlayDrag?(event: React.SyntheticEvent): void;
    /**
     * Callback to invoke when an overlay drag ends.
     * @param {React.SyntheticEvent} event - Google Maps mouse event.
     */
    onOverlayDragEnd?(event: React.SyntheticEvent): void;
    /**
     * Callback to invoke when an overlay is clicked.
     * @param {GMapEvent} event - Custom click event.
     */
    onOverlayClick?(event: GMapEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - GMap**
 *
 * _GMap component provides integration with Google Maps API. This sample demontrates various uses cases like binding, overlays and events. Click the map to add a new item._
 *
 * [Live Demo](https://www.primefaces.org/primereact/gmap/)
 * --- ---
 * ![PrimeReact](https://www.primefaces.org/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class GMap extends React.Component<GMapProps, any> {
    /**
     * Used to get map instance
     * @return {*} Map instance
     */
    public getMap(): any;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
