/**
 *
 * Tooltip functionality is integrated within various PrimeReact components.
 *
 * [Live Demo](https://www.primereact.org/tooltip/)
 *
 * @module tooltip
 *
 */
import * as React from 'react';
import { TooltipEvent, TooltipOptions } from './tooltipoptions';

/**
 * Defines valid properties in Tooltip component. In addition to these, all properties of TooltipOptions can be used in this component.
 * @extends {TooltipOptions}
 * @group Properties
 */
export interface TooltipProps extends TooltipOptions {
    /**
     * Unique identifier of the element.
     */
    id?: string | undefined;
    /**
     * Target element on global tooltip option.
     */
    target?: string | string[] | HTMLElement | undefined;
    /**
     * Content to be displayed in tooltip.
     */
    content?: string | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - Tooltip**
 *
 * _Tooltip functionality is integrated within various PrimeReact components._
 *
 * [Live Demo](https://www.primereact.org/tooltip/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Tooltip extends React.Component<TooltipProps, any> {
    /**
     * Used to reload target events. In some cases, the target element can be hidden initially. Later, when this element becomes visible, it will be necessary to bind tooltip events to this element.
     * @param {HTMLElement} target - Target element.
     */
    public updateTargetEvents(target: HTMLElement): void;
    /**
     * Used to load target events.
     * @param {HTMLElement} target - Target element.
     */
    public loadTargetEvents(target: HTMLElement): void;
    /**
     * Used to unload target events.
     * @param {HTMLElement} target - Target element.
     */
    public unloadTargetEvents(target: HTMLElement): void;
    /**
     * Used to get container element.
     * @return {HTMLElement} Container element
     */
    public getElement(): HTMLElement;
    /**
     * Used to get target element.
     * @return {HTMLElement} Target element
     */
    public getTarget(): HTMLElement | null;
    /**
     * Used to show the tooltip.
     * @param {TooltipEvent} event - Browser event.
     */
    public show(event?: TooltipEvent): null;
    /**
     * Used to hide the tooltip.
     * @param {TooltipEvent} event - Browser event.
     */
    public hide(event?: TooltipEvent): null;
}
