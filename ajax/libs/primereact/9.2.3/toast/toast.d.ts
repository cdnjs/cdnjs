/**
 *
 * Toast is used to display messages in an overlay.
 *
 * [Live Demo](https://www.primereact.org/toast/)
 *
 * @module toast
 *
 */
import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';

/**
 * Message options for toast component
 */
export interface ToastMessage {
    /**
     * Severity of the message.
     */
    severity?: 'success' | 'info' | 'warn' | 'error' | undefined;
    /**
     * Summary content of the message.
     */
    summary?: React.ReactNode | undefined;
    /**
     * Detail content of the message.
     */
    detail?: React.ReactNode | undefined;
    /**
     * Custom content of the message. If enabled, summary and details properties are ignored.
     */
    content?: React.ReactNode | undefined;
    /**
     * Whether the message can be closed manually using the close icon.
     * @defaultValue true
     */
    closable?: boolean | undefined;
    /**
     * When enabled, message is not removed automatically.
     */
    sticky?: boolean | undefined;
    /**
     * Delay in milliseconds to close the message automatically.
     * @defaultValue 3000
     */
    life?: number | undefined;
    /**
     * Style class of the message.
     */
    className?: string | undefined;
    /**
     * Inline style of the message.
     */
    style?: React.CSSProperties | undefined;
    /**
     * Style class of the message content.
     */
    contentClassName?: string | undefined;
    /**
     * Inline style of the message content.
     */
    contentStyle?: React.CSSProperties | undefined;
}

/**
 * Defines valid properties in Toast component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface ToastProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Base zIndex value to add to initial layering of PrimeReact components which start from 1000.
     * @defaultValue 0
     */
    baseZIndex?: number | undefined;
    /**
     * Position of the toast in viewport, valid values are "top-right", "top-left", "bottom-left" and "bottom-right".
     * @defaultValue top-right
     */
    position?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-center' | 'top-left' | 'top-right' | 'bottom-center' | 'bottom-left' | 'bottom-right' | undefined;
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * DOM element instance where the component should be mounted. Valid values are any DOM Element and 'self'. The self value is used to render a component where it is located.
     * @defaultValue self
     */
    appendTo?: 'self' | HTMLElement | null | undefined;
    /**
     * Callback to invoke when an active tab is collapsed by clicking on the header.
     * @param {ToastMessage} message - Clicked message
     */
    onClick?(message: ToastMessage): void;
    /**
     * Callback to invoke when a message is removed.
     * @param {ToastMessage} message - Removed message
     */
    onRemove?(message: ToastMessage): void;
    /**
     * Callback to invoke when message becomes visible.
     */
    onShow?(): void;
    /**
     * Callback to invoke when message becomes hidden.
     */
    onHide?(): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - Toast**
 *
 * _Toast is used to display messages in an overlay._
 *
 * [Live Demo](https://www.primereact.org/toast/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Toast extends React.Component<ToastProps, any> {
    /**
     * Used to show the message.
     * @param {ToastMessage | ToastMessage[]} message - Message to show
     */
    public show(message: ToastMessage | ToastMessage[]): void;
    /**
     * Clears the all messages from Toast.
     */
    public clear(): void;
    /**
     * Used to add new messages after removing all old messages.
     * @param {ToastMessage | ToastMessage[]} message - Message to replace
     */
    public replace(message: ToastMessage | ToastMessage[]): void;
    /**
     * Used to remove messages.
     * @param {ToastMessage | ToastMessage[]} message - Message to remove
     */
    public remove(message: ToastMessage | ToastMessage[]): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
