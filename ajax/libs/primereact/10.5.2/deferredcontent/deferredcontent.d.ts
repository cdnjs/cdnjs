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
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { PassThroughType } from '../utils/utils';

export declare type DeferredContentPassThroughType<T> = PassThroughType<T, DeferredContentPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface DeferredContentPassThroughMethodOptions {
    props: DeferredContentProps;
    state: DeferredContentState;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link DeferredContentProps.pt}
 */
export interface DeferredContentPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: DeferredContentPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines current inline state in DeferredContent component.
 */
export interface DeferredContentState {
    /**
     * Current loaded state as a boolean.
     * @defaultValue false
     */
    loaded?: boolean;
}

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
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {DeferredContentPassThroughOptions}
     */
    pt?: DeferredContentPassThroughOptions;
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: PassThroughOptions;
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
