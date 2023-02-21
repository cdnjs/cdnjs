/**
 *
 * Messages is used to display inline messages with various severities.
 *
 * [Live Demo](https://www.primereact.org/messages)
 *
 * @module messages
 *
 */
import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';
import { IconType } from '../utils/utils';

export interface MessagesMessage {
    /**
     * Unique id of the message.
     */
    id?: string | undefined;
    /**
     * Severity of the message.
     */
    severity?: 'success' | 'info' | 'warn' | 'error' | undefined;
    /**
     * Custom template of the message.
     */
    content?: React.ReactNode | undefined;
    /**
     * Summary content of the message.
     */
    summary?: React.ReactNode;
    /**
     * Detail content of the message.
     */
    detail?: React.ReactNode;
    /**
     * Whether the message can be closed manually using the close icon.
     * @defaultValue true
     */
    closable?: boolean;
    /**
     * When enabled, message is not removed automatically.
     */
    sticky?: boolean;
    /**
     * Delay in milliseconds to close the message automatically.
     * @defaultValue 3000
     */
    life?: number;
    /**
     * Defines the icon to display.
     * @defaultValue Defaults to severity icon
     */
    icon?: IconType<MessagesProps>;
}

/**
 * Defines valid properties in Messages component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface MessagesProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * Callback to invoke when a message is removed.
     * @param {MessagesMessage} message - Removed message.
     */
    onRemove?(message: MessagesMessage): void;
    /**
     * Callback to invoke when a message gets clicked.
     * @param {MessagesMessage} message - Clicked message.
     */
    onClick?(message: MessagesMessage): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - Messages**
 *
 * _Messages is used to display inline messages with various severities._
 *
 * [Live Demo](https://www.primereact.org/messages/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Messages extends React.Component<MessagesProps, any> {
    /**
     * Used to show the message.
     * @param {MessagesMessage | MessagesMessage[]} message - Showed message.
     */
    public show(message: MessagesMessage | MessagesMessage[]): void;
    /**
     * Used to clear the shown messages.
     */
    public clear(): void;
    /**
     * Used to add new messages after removing all old messages.
     * @param {MessagesMessage | MessagesMessage[]} message - New message.
     */
    public replace(message: MessagesMessage | MessagesMessage[]): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
