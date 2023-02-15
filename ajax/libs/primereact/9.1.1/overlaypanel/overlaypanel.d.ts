/**
 *
 * OverlayPanel, also known as Popover, is a container component that can overlay other components on page.
 *
 * [Live Demo](https://www.primereact.org/overlaypanel)
 *
 * @module overlaypanel
 *
 */
import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';

/**
 * Custom overlay panel breakpoints
 */
interface OverlayPanelBreakpoints {
    /**
     *  A key-value pair representing a breakpoint and its associated value.
     */
    [key: string]: string;
}

/**
 * Defines valid properties in OverlayPanel component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface OverlayPanelProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Enables to hide the overlay when outside is clicked.
     * @defaultValue true
     */
    dismissable?: boolean | undefined;
    /**
     * When enabled, displays a close icon at top right corner.
     * @defaultValue false
     */
    showCloseIcon?: boolean | undefined;
    /**
     * DOM element instance where the overlay panel should be mounted. Valid values are any DOM Element and 'self'. The self value is used to render a component where it is located.
     * @defaultValue document.body
     */
    appendTo?: 'self' | HTMLElement | undefined | null;
    /**
     * Aria label of the close icon.
     * @defaultValue close
     */
    ariaCloseLabel?: string | undefined;
    /**
     * Object literal to define widths per screen size.
     */
    breakpoints?: OverlayPanelBreakpoints | undefined;
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * Callback to invoke when overlay becomes visible.
     */
    onShow?(): void;
    /**
     * Callback to invoke when overlay becomes hidden.
     */
    onHide?(): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - OverlayPanel**
 *
 * _OverlayPanel, also known as Popover, is a container component that can overlay other components on page._
 *
 * [Live Demo](https://www.primereact.org/overlaypanel/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class OverlayPanel extends React.Component<OverlayPanelProps, any> {
    /**
     * Toggles the visiblity of the overlay.
     * @param {React.SyntheticEvent | undefined | null} event - Browser event.
     * @param {HTMLElement | EventTarget | undefined | null} target - Browser event.
     */
    public toggle(event: React.SyntheticEvent | undefined | null, target?: HTMLElement | EventTarget | undefined | null): void;
    /**
     * Shows the overlay.
     * @param {React.SyntheticEvent | undefined | null} event - Browser event.
     * @param {HTMLElement | EventTarget | undefined | null} target - Browser event.
     */
    public show(event: React.SyntheticEvent | undefined | null, target: HTMLElement | EventTarget | undefined | null): void;
    /**
     * Hides the overlay.
     */
    public hide(): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
