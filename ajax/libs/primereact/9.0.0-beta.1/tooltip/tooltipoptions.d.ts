/**
 *
 * This module contains the common options and events of Tooltip.
 *
 * @module tooltipoptions
 *
 */
import * as React from 'react';

/**
 * Custom tooltip event
 * @event
 */
interface TooltipEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Target element.
     * @defaultValue current target
     */
    target: HTMLElement;
}

/**
 * Defines valid properties of TooltipOptions.
 * @group Misc
 */
export interface TooltipOptions {
    /**
     * DOM element instance where the overlay panel should be mounted. Valid values are any DOM Element and 'self'. The self value is used to render a component where it is located.
     * @defaultValue document.body
     */
    appendTo?: 'self' | HTMLElement | null | undefined;
    /**
     * Defines which position on the target element to align the positioned tooltip.
     */
    at?: string | undefined;
    /**
     * Whether to hide tooltip when hovering over tooltip content.
     * @defaultValue true
     */
    autoHide?: boolean | undefined;
    /**
     * Whether to automatically manage layering.
     * @defaultValue true
     */
    autoZIndex?: boolean | undefined;
    /**
     * Base zIndex value to use in layering.
     * @defaultValue 0
     */
    baseZIndex?: number | undefined;
    /**
     * Style class of the tooltip.
     */
    className?: string | undefined;
    /**
     * When present, it specifies that the tooltip should be hidden.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * Event to show the tooltip.
     * @defaultValue hover
     */
    event?: 'hover' | 'focus' | 'both' | undefined;
    /**
     * Delay to hide the tooltip in milliseconds.
     * @defaultValue 0
     */
    hideDelay?: number | undefined;
    /**
     * Event to hide the tooltip if the event property is empty.
     * @defaultValue mouseleave
     */
    hideEvent?: string | undefined;
    /**
     * Whether the tooltip will follow the mouse.
     * @defaultValue false
     */
    mouseTrack?: boolean | undefined;
    /**
     * Defines left position of the tooltip in relation to the mouse when the mouseTrack is enabled.
     * @defaultValue 5
     */
    mouseTrackLeft?: number | undefined;
    /**
     * Defines top position of the tooltip in relation to the mouse when the mouseTrack is enabled.
     * @defaultValue 5
     */
    mouseTrackTop?: number | undefined;
    /**
     * Defines which position on the tooltip being positioned to align with the target element.
     */
    my?: string | undefined;
    /**
     * Position of the tooltip.
     * @defaultValue right
     */
    position?: 'top' | 'bottom' | 'left' | 'right' | 'mouse' | undefined;
    /**
     * Delay to show the tooltip in milliseconds.
     * @defaultValue 0
     */
    showDelay?: number | undefined;
    /**
     * Event to show the tooltip if the event property is empty.
     * @defaultValue mouseenter
     */
    showEvent?: string | undefined;
    /**
     * Whether to show tooltip for disabled elements.
     * @defaultValue false
     */
    showOnDisabled?: boolean | undefined;
    /**
     * Style of the tooltip.
     */
    style?: React.CSSProperties | undefined;
    /**
     * Delay to update the tooltip in milliseconds.
     * @defaultValue 0
     */
    updateDelay?: number | undefined;
    /**
     * Callback to invoke before the tooltip is shown.
     * @param {TooltipEvent} event - Browser event
     */
    onBeforeShow?(event: TooltipEvent): void;
    /**
     * Callback to invoke before the tooltip is hidden.
     * @param {TooltipEvent} event - Browser event
     */
    onBeforeHide?(event: TooltipEvent): void;
    /**
     * Callback to invoke when the tooltip is shown.
     * @param {TooltipEvent} event - Browser event
     */
    onShow?(event: TooltipEvent): void;
    /**
     * Callback to invoke when the tooltip is hidden.
     * @param {TooltipEvent} event - Browser event
     */
    onHide?(event: TooltipEvent): void;
}

/**
 * In addition to React.HTMLAttributes, the following attributes can be used on any HTMLElement if the page has a PrimeReact {@link tooltip} component.
 * @group Misc
 */

interface TooltipHTMLAttributes {
    /**
     * **PrimeReact - TooltipHTMLAttributes**
     *
     * Content of the tooltip.*
     *
     * ![PrimeReact](https://www.primefaces.org/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a PrimeReact {@link tooltip} component on the page._
     */
    'data-pr-tooltip'?: string | undefined;
    /**
     * **PrimeReact - TooltipHTMLAttributes**
     *
     * When present, it specifies that the tooltip should be hidden.*
     *
     * ![PrimeReact](https://www.primefaces.org/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a PrimeReact {@link tooltip} component on the page._
     */
    'data-pr-disabled'?: boolean | undefined;
    /**
     * **PrimeReact - TooltipHTMLAttributes**
     *
     * Style class of the tooltip.*
     *
     * ![PrimeReact](https://www.primefaces.org/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a PrimeReact {@link tooltip} component on the page._
     */
    'data-pr-classname'?: string | undefined;
    /**
     * **PrimeReact - TooltipHTMLAttributes**
     *
     * Position of the tooltip.*
     * @defaultValue right
     *
     * ![PrimeReact](https://www.primefaces.org/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a PrimeReact {@link tooltip} component on the page._
     */
    'data-pr-position'?: 'top' | 'bottom' | 'left' | 'right' | 'mouse' | undefined;
    /**
     * **PrimeReact - TooltipHTMLAttributes**
     *
     * Defines which position on the tooltip being positioned to align with the target element.*
     *
     * ![PrimeReact](https://www.primefaces.org/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a PrimeReact {@link tooltip} component on the page._
     */
    'data-pr-my'?: string | undefined;
    /**
     * **PrimeReact - TooltipHTMLAttributes**
     *
     * Defines which position on the target element to align the positioned tooltip.*
     *
     * ![PrimeReact](https://www.primefaces.org/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a PrimeReact {@link tooltip} component on the page._
     */
    'data-pr-at'?: string | undefined;
    /**
     * **PrimeReact - TooltipHTMLAttributes**
     *
     * Event to show the tooltip.*
     * @defaultValue hover
     *
     * ![PrimeReact](https://www.primefaces.org/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a PrimeReact {@link tooltip} component on the page._
     */
    'data-pr-event'?: 'hover' | 'focus' | 'both' | undefined;
    /**
     * **PrimeReact - TooltipHTMLAttributes**
     *
     * Event to show the tooltip if the event property is empty.*
     * @defaultValue mouseenter
     *
     * ![PrimeReact](https://www.primefaces.org/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a PrimeReact {@link tooltip} component on the page._
     */
    'data-pr-showevent'?: string | undefined;
    /**
     * **PrimeReact - TooltipHTMLAttributes**
     *
     * Event to hide the tooltip if the event property is empty.*
     * @defaultValue mouseleave
     *
     * ![PrimeReact](https://www.primefaces.org/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a PrimeReact {@link tooltip} component on the page._
     */
    'data-pr-hideevent'?: string | undefined;
    /**
     * **PrimeReact - TooltipHTMLAttributes**
     *
     * Whether the tooltip will follow the mouse.*
     * @defaultValue false
     *
     * ![PrimeReact](https://www.primefaces.org/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a PrimeReact {@link tooltip} component on the page._
     */
    'data-pr-mousetrack'?: boolean | undefined;
    /**
     * **PrimeReact - TooltipHTMLAttributes**
     *
     * Defines top position of the tooltip in relation to the mouse when the mouseTrack is enabled.*
     * @defaultValue 5
     *
     * ![PrimeReact](https://www.primefaces.org/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a PrimeReact {@link tooltip} component on the page._
     */
    'data-pr-mousetracktop'?: number | undefined;
    /**
     * **PrimeReact - TooltipHTMLAttributes**
     *
     * Defines left position of the tooltip in relation to the mouse when the mouseTrack is enabled.*
     * @defaultValue 5
     *
     * ![PrimeReact](https://www.primefaces.org/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a PrimeReact {@link tooltip} component on the page._
     */
    'data-pr-mousetrackleft'?: number | undefined;
    /**
     * **PrimeReact - TooltipHTMLAttributes**
     *
     * Delay to show the tooltip in milliseconds.*
     * @defaultValue 0
     *
     * ![PrimeReact](https://www.primefaces.org/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a PrimeReact {@link tooltip} component on the page._
     */
    'data-pr-showdelay'?: number | undefined;
    /**
     * **PrimeReact - TooltipHTMLAttributes**
     *
     * Delay to update the tooltip in milliseconds.*
     * @defaultValue 0
     *
     * ![PrimeReact](https://www.primefaces.org/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a PrimeReact {@link tooltip} component on the page._
     */
    'data-pr-updatedelay'?: number | undefined;
    /**
     * **PrimeReact - TooltipHTMLAttributes**
     *
     * Delay to hide the tooltip in milliseconds.*
     * @defaultValue 0
     *
     * ![PrimeReact](https://www.primefaces.org/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a PrimeReact {@link tooltip} component on the page._
     */
    'data-pr-hidedelay'?: number | undefined;
    /**
     * **PrimeReact - TooltipHTMLAttributes**
     *
     * Whether to hide tooltip when hovering over tooltip content.*
     * @defaultValue true
     *
     * ![PrimeReact](https://www.primefaces.org/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a PrimeReact {@link tooltip} component on the page._
     */
    'data-pr-autohide'?: boolean | undefined;
    /**
     * **PrimeReact - TooltipHTMLAttributes**
     *
     * Whether to show tooltip for disabled elements.*
     * @defaultValue false
     *
     * ![PrimeReact](https://www.primefaces.org/primereact/images/logo-100.png)
     * ___
     *
     * _*This feature will be active when there is a PrimeReact {@link tooltip} component on the page._
     */
    'data-pr-showondisabled'?: boolean | undefined;
}

declare module 'react' {
    export interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T>, TooltipHTMLAttributes {}
}
