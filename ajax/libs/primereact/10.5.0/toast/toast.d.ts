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
import { CSSTransitionProps as ReactCSSTransitionProps } from 'react-transition-group/CSSTransition';
import { ComponentHooks } from '../componentbase/componentbase';
import { CSSTransitionProps } from '../csstransition';
import { PassThroughOptions } from '../passthrough';
import { IconType, PassThroughType } from '../utils/utils';

export declare type ToastPassThroughType<T> = PassThroughType<T, ToastPassThroughMethodOptions>;
export declare type ToastPassThroughTransitionType = ReactCSSTransitionProps | ((options: ToastPassThroughMethodOptions) => ReactCSSTransitionProps) | undefined;

/**
 * Custom passthrough(pt) option method.
 */
export interface ToastPassThroughMethodOptions {
    props: ToastProps;
    state: ToastState;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link ToastProps.pt}
 */
export interface ToastPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: ToastPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the message's DOM element.
     */
    message?: ToastPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: ToastPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: ToastPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the text's DOM element.
     */
    text?: ToastPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the summary's DOM element.
     */
    summary?: ToastPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the detail's DOM element.
     */
    detail?: ToastPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the close button's DOM element.
     */
    closeButton?: ToastPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the close button icon's DOM element.
     */
    closeButtonIcon?: ToastPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
    /**
     * Used to control React Transition API.
     */
    transition?: ToastPassThroughTransitionType;
}

/**
 * Defines message options in Toast component.
 */
export interface ToastMessageOptions {
    /**
     * Severity level of the message.
     * @defaultValue info
     */
    severity?: 'success' | 'info' | 'warn' | 'error' | undefined;
    /**
     * Summary content of the message.
     */
    summary?: string | undefined;
    /**
     * Detail content of the message.
     */
    detail?: any | undefined;
    /**
     * Whether the message can be closed manually using the close icon.
     * @defaultValue true
     */
    closable?: boolean | undefined;
    /**
     * Delay in milliseconds to close the message automatically.
     */
    life?: number | undefined;
    /**
     * Key of the Toast to display the message.
     */
    group?: string | undefined;
    /**
     * Style class of the message.
     */
    styleClass?: any;
    /**
     * Style class of the content.
     */
    contentStyleClass?: any;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {ToastPassThroughOptions}
     */
    pt?: ToastPassThroughOptions;
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: PassThroughOptions;
    /**
     * When enabled, it removes component related styles in the core.
     * @defaultValue false
     */
    unstyled?: boolean;
}

/**
 * Defines current inline state in Toast component.
 */
export interface ToastState {
    /**
     * Current messages.
     */
    messages: any[];
}

/**
 * Message options for toast component
 */
export interface ToastMessage {
    /**
     * Unique id of the message.
     */
    id?: string | undefined;
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
     * Icon of the message.
     */
    icon?: IconType<ToastProps> | undefined;
    /**
     * Icon of the close button.
     */
    closeIcon?: IconType<ToastProps> | undefined;
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
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {Omit<ToastPassThroughOptions, 'message'>}
     */
    pt?: Omit<ToastPassThroughOptions, 'message'>;
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: PassThroughOptions;
}

/**
 * Defines current content values and refs for headless development.
 * @see {@link ContentProps.message}
 */
interface ContentPropsMessage {
    /**
     * Summary of the toast.
     * @readonly
     */
    summary: string;
    /**
     * Detail of the toast.
     * @readonly
     */
    detail: string;
}

/**
 * Defines current content values and refs for headless development.
 * @see {@link ToastProps.content}
 */
interface ContentProps {
    /**
     * Toast's props values.
     */
    message: ContentPropsMessage;
}

/**
 * Defines valid properties in Toast component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface ToastProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref' | 'pt' | 'content'> {
    /**
     * Base zIndex value to add to initial layering of PrimeReact components which start from 1000.
     * @defaultValue 0
     */
    baseZIndex?: number | undefined;
    /**
     * Position of the toast in viewport, valid values are 'center', 'top-center', 'top-left', 'top-right', 'bottom-center', 'bottom-left', 'bottom-right'.
     * @defaultValue top-right
     */
    position?: 'center' | 'top-center' | 'top-left' | 'top-right' | 'bottom-center' | 'bottom-left' | 'bottom-right' | undefined;
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * DOM element instance where the component should be mounted. Valid values are any DOM Element and 'self'. The self value is used to render a component where it is located.
     * @defaultValue self
     */
    appendTo?: 'self' | HTMLElement | undefined | null | (() => HTMLElement);
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
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {ToastPassThroughOptions}
     */
    pt?: ToastPassThroughOptions;
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: PassThroughOptions;
    /**
     * Specifies a custom content for the toast. For more complex markup, use the "content" slot instead.
     * @param {ContentProps} props - The values of toast.
     * @return {React.ReactNode}
     */
    content?: React.ReactNode | ((props: ContentProps) => React.ReactNode);
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
