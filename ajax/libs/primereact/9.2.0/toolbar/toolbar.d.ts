/**
 *
 * Toolbar is a grouping component for buttons and other content.
 *
 * [Live Demo](https://www.primereact.org/toolbar/)
 *
 * @module toolbar
 *
 */
import * as React from 'react';

/**
 * Defines valid properties in Toolbar component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface ToolbarProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * The template of left section.
     * @deprecated use start instead
     */
    left?: React.ReactNode | ((props: ToolbarProps) => React.ReactNode);
    /**
     * The template of right section.
     * @deprecated use end instead
     */
    right?: React.ReactNode | ((props: ToolbarProps) => React.ReactNode);
    /**
     * The template of start section.
     */
    start?: React.ReactNode | ((props: ToolbarProps) => React.ReactNode);
    /**
     * The template of center section.
     */
    center?: React.ReactNode | ((props: ToolbarProps) => React.ReactNode);
    /**
     * The template of end section.
     */
    end?: React.ReactNode | ((props: ToolbarProps) => React.ReactNode);
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - Toolbar**
 *
 * _Toolbar is a grouping component for buttons and other content._
 *
 * [Live Demo](https://www.primereact.org/toolbar/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Toolbar extends React.Component<ToolbarProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
