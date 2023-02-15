/**
 *
 * Password displays strength indicator for password fields.
 *
 * [Live Demo](https://www.primereact.org/password/)
 *
 * @module password
 *
 */
import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';
import { InputText } from '../inputtext';
import { KeyFilterType } from '../keyfilter/keyfilteroptions';
import { TooltipOptions } from '../tooltip/tooltipoptions';

/**
 * Custom icon event
 * @see {@link PasswordProps.icon}
 * @event
 */
interface PasswordIconEvent {
    /**
     * Click event for the default element.
     */
    onClick(): void;
    /**
     * Style class of the default element.
     */
    className: string;
    /**
     * Default element created by the component.
     */
    element: JSX.Element;
    /**
     * All component props.
     */
    props: PasswordProps;
}

/**
 * Defines valid properties in Password component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface PasswordProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onInput' | 'ref'> {
    /**
     * Identifier of the input element.
     */
    inputId?: string | undefined;
    /**
     * Reference of the input element.
     */
    inputRef?: React.Ref<HTMLInputElement> | undefined;
    /**
     * Inline style of the input field.
     */
    inputStyle?: React.CSSProperties | undefined;
    /**
     * Style class of the input field.
     */
    inputClassName?: string | undefined;
    /**
     * Text to prompt password entry.
     * @defaultValue Please enter a password
     */
    promptLabel?: string | undefined;
    /**
     * Text for a weak password.
     * @defaultValue Weak
     */
    weakLabel?: string | undefined;
    /**
     * Text for a medium password.
     * @defaultValue Medium
     */
    mediumLabel?: string | undefined;
    /**
     * Text for a strong password.
     * @defaultValue Strong
     */
    strongLabel?: string | undefined;
    /**
     * Regex for a medium level password.
     * @defaultValue ^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.&#123;6,&#125;).
     */
    mediumRegex?: string | undefined;
    /**
     * Regex for a strong level password.
     * @defaultValue ^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.&#123;8,&#125;)
     */
    strongRegex?: string | undefined;
    /**
     * Whether to show the strength indicator or not.
     * @defaultValue true
     */
    feedback?: boolean | undefined;
    /**
     * Whether to show an icon to display the password as plain text.
     * @defaultValue false
     */
    toggleMask?: boolean | undefined;
    /**
     * DOM element instance where the overlay panel should be mounted. Valid values are any DOM Element and 'self'. The self value is used to render a component where it is located.
     * @defaultValue document.body
     */
    appendTo?: 'self' | HTMLElement | undefined | null;
    /**
     * Template of panel header if "feedback" is enabled.
     */
    header?: React.ReactNode | ((props: PasswordProps) => React.ReactNode);
    /**
     * Template of panel content if "feedback" is enabled.
     */
    content?: React.ReactNode | ((props: PasswordProps) => React.ReactNode);
    /**
     * Template of panel footer if "feedback" is enabled.
     */
    footer?: React.ReactNode | ((props: PasswordProps) => React.ReactNode);
    /**
     * Template of mask icon if "toggleMask" is enabled.
     */
    icon?: React.ReactNode | ((event: PasswordIconEvent) => React.ReactNode);
    /**
     * Content of the tooltip.
     */
    tooltip?: string | undefined;
    /**
     * Configuration of the tooltip, refer to the tooltip documentation for more information.
     */
    tooltipOptions?: TooltipOptions | undefined;
    /**
     * Format definition of the keys to block.
     */
    keyfilter?: KeyFilterType | undefined;
    /**
     * Inline style of the overlay panel element.
     */
    panelStyle?: React.CSSProperties | undefined;
    /**
     * Style class of the overlay panel element.
     */
    panelClassName?: string | undefined;
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * Callback to invoke on input event of input field.
     * @param {React.FormEvent<HTMLInputElement>} event - Browser event
     * @param {boolean} validatePattern - Whether to validate the value
     */
    onInput?(event: React.FormEvent<HTMLInputElement>, validatePattern: boolean): void;
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
 * **PrimeReact - Password**
 *
 * _Password displays strength indicator for password fields._
 *
 * [Live Demo](https://www.primereact.org/password/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Password extends React.Component<PasswordProps, any> {
    /**
     * Used to focus the component.
     */
    public focus(): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
    /**
     * Used to get input element.
     * @return {HTMLInputElement} Input element
     */
    public getInput(): typeof InputText;
    /**
     * Used to get overlay element.
     * @return {HTMLElement} Overlay element
     */
    public getOverlay(): HTMLElement;
}
