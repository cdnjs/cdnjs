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
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { IconType, PassThroughType } from '../utils/utils';

export declare type MessagePassThroughType<T> = PassThroughType<T, MessagePassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface MessagePassThroughMethodOptions {
    props: MessageProps;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link MessageProps.pt}
 */
export interface MessagePassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: MessagePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: MessagePassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the text's DOM element.
     */
    text?: MessagePassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines valid properties in Message component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface MessageProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref' | 'content' | 'pt'> {
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
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {MessagePassThroughOptions}
     */
    pt?: MessagePassThroughOptions;
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
