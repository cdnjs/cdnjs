/**
 *
 * Message is used to display inline message with various severities.
 *
 * [Live Demo](https://www.primereact.org/message)
 *
 * @module message
 *
 */
import * as React from 'react';
import { IconType } from '../utils/utils';

/**
 * Defines valid properties in Message component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface MessageProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Text of the message.
     */
    text?: React.ReactNode | ((props: MessageProps) => React.ReactNode);
    /**
     * Severity level of the message.
     */
    severity?: 'success' | 'info' | 'warn' | 'error' | undefined;
    /**
     * Custom template of the message.
     */
    content?: React.ReactNode | ((props: MessageProps) => React.ReactNode);
    /**
     * Icon for the message. If not set it will default to severity icon.
     * @defaultValue based on severity
     */
    icon?: IconType<MessageProps> | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - Message**
 *
 * _Message is used to display inline message with various severities._
 *
 * [Live Demo](https://www.primereact.org/message/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Message extends React.Component<MessageProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
