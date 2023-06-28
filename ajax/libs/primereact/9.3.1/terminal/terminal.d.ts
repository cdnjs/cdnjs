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
