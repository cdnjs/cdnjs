/**
 *
 * Terminal is a text based user interface.
 *
 * [Live Demo](https://www.primereact.org/terminal)
 *
 * @module terminal
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { PassThroughType } from '../utils';

export declare type TerminalPassThroughType<T> = PassThroughType<T, TerminalPassThroughMethodOptions>;

/**
 * Defines current inline state in Terminal component.
 */
export interface TerminalState {
    /**
     * Current command text as a string.
     */
    commandText: string;
    /**
     * Current commands as an array.
     */
    commands: string[];
}

/**
 * Custom passthrough(pt) option method.
 */
export interface TerminalPassThroughMethodOptions {
    props: TerminalProps;
    state: TerminalState;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link TerminalProps.pt}
 */
export interface TerminalPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: TerminalPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the welcome message's DOM element.
     */
    welcomeMessage?: TerminalPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: TerminalPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the commands' DOM element.
     */
    commands?: TerminalPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the prompt's DOM element.
     */
    prompt?: TerminalPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the command's DOM element.
     */
    command?: TerminalPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the response's DOM element.
     */
    response?: TerminalPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the container's DOM element.
     */
    container?: TerminalPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the command text's DOM element.
     */
    commandText?: TerminalPassThroughType<React.HTMLAttributes<HTMLInputElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines valid properties in Terminal component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface TerminalProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Initial text to display on terminal.
     */
    welcomeMessage?: string | undefined;
    /**
     * Prompt text for each command.
     */
    prompt?: string | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {TerminalPassThroughOptions}
     */
    pt?: TerminalPassThroughOptions;
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
 * **PrimeReact - Terminal**
 *
 * _Terminal is a text based user interface._
 *
 * [Live Demo](https://www.primereact.org/terminal/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Terminal extends React.Component<TerminalProps, any> {
    /**
     * Used to focus the component.
     */
    public focus(): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
