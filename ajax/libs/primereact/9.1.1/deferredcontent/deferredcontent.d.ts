/**
 *
 * DeferredContent postpones the loading the content that is initially not in the viewport until it becomes visible on scroll.
 *
 * [Live Demo](https://www.primereact.org/deferredcontent/)
 *
 * @module deferredcontent
 *
 */
import * as React from 'react';

/**
 * Defines valid properties in DeferredContent component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface DeferredContentProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Callback to invoke when deferred content is loaded.
     * @param {React.SyntheticEvent} event - Event object
     */
    onLoad?(event: React.SyntheticEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - DeferredContent**
 *
 * _DeferredContent postpones the loading the content that is initially not in the viewport until it becomes visible on scroll._
 *
 * [Live Demo](https://www.primereact.org/deferredcontent/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class DeferredContent extends React.Component<DeferredContentProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
