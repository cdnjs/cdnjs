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
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { PassThroughType } from '../utils/utils';
import { TooltipEvent, TooltipOptions } from './tooltipoptions';

export declare type TooltipPassThroughType<T> = PassThroughType<T, TooltipPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface TooltipPassThroughMethodOptions {
    props: TooltipProps;
    state: TooltipState;
    context: TooltipContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link TooltipProps.pt}
 */
export interface TooltipPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: TooltipPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the arrow's DOM element.
     */
    arrow?: TooltipPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the text's DOM element.
     */
    text?: TooltipPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines current inline context in Tooltip component.
 */
export interface TooltipContext {
    /**
     * Right aligned tooltip as a boolean.
     * @defaultValue false
     */
    right: boolean;
    /**
     * Right aligned tooltip as a boolean.
     * @defaultValue false
     */
    left: boolean;
    /**
     * Right aligned tooltip as a boolean.
     * @defaultValue false
     */
    top: boolean;
    /**
     * Right aligned tooltip as a boolean.
     * @defaultValue false
     */
    bottom: boolean;
}

/**
 * Defines current inline state in Tooltip component.
 */
export interface TooltipState {
    /**
     * Current visible state as a boolean.
     * @defaultValue false
     */
    visible: boolean;
    /**
     * Current position state as a string.
     * @defaultValue right
     */
    position: string;
    /**
     * Current className state as a string.
     */
    className: string;
}

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
    target?: string | string[] | HTMLElement | React.RefObject<HTMLElement> | undefined;
    /**
     * Content to be displayed in tooltip.
     */
    content?: React.ReactNode | string | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {TooltipPassThroughOptions}
     */
    pt?: TooltipPassThroughOptions;
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: PassThroughOptions;
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
     * @param {string | string[] | HTMLElement | React.RefObject<HTMLElement> | undefined} target - Target element or if undefined will use current target.
     */
    public updateTargetEvents(target?: string | string[] | HTMLElement | React.RefObject<HTMLElement> | undefined): void;
    /**
     * Used to load target events.
     * @param {string | string[] | HTMLElement | React.RefObject<HTMLElement> | undefined} target - Target element or if undefined will use current target.
     */
    public loadTargetEvents(target?: string | string[] | HTMLElement | React.RefObject<HTMLElement> | undefined): void;
    /**
     * Used to unload target events.
     * @param {string | string[] | HTMLElement | React.RefObject<HTMLElement> | undefined} target - Target element or if undefined will use current target.
     */
    public unloadTargetEvents(target?: string | string[] | HTMLElement | React.RefObject<HTMLElement> | undefined): void;
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
