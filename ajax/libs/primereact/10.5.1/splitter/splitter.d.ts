/**
 *
 * Splitter is utilized to separate and resize panels.
 *
 * [Live Demo](https://www.primereact.org/splitter/)
 *
 * Helper Components:
 *
 * - {@link SplitterPanel}
 *
 * @module splitter
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { PassThroughType } from '../utils/utils';

export declare type SplitterPassThroughType<T> = PassThroughType<T, SplitterPassThroughMethodOptions>;
export declare type SplitterPanelPassThroughType<T> = PassThroughType<T, SplitterPanelPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface SplitterPassThroughMethodOptions {
    props: SplitterProps;
    state: SplitterState;
}

/**
 * Defines current inline state in Panel component.
 */
export interface SplitterState {
    /**
     * Previous size state as a number.
     */
    panelSizes: number[];
}

/**
 * Custom resize end event.
 * @see {@link SplitterProps.onResizeEnd}
 * @event
 */
interface SplitterResizeEndEvent {
    /**
     * Browser event.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Sizes of the panels as an array.
     */
    sizes: number[];
}

/**
 * Custom passthrough(pt) options.
 * @see {@link PanelProps.pt}
 */
export interface SplitterPanelPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: SplitterPanelPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Custom passthrough(pt) option method.
 */
export interface SplitterPanelPassThroughMethodOptions {
    props: SplitterPanelProps;
    parent: SplitterPassThroughMethodOptions;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link SplitterProps.pt}
 */
export interface SplitterPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: SplitterPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the gutter's DOM element.
     */
    gutter?: SplitterPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the gutter handler's DOM element.
     */
    gutterHandler?: SplitterPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines valid properties in SplitterPanel component.
 * @group Properties
 */
interface SplitterPanelProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Returns the value of element's id content attribute. Can be set to change it.
     */
    id?: string;
    /**
     * Establishes relationships between the splitter and panel label element IDs.
     */
    'aria-labelledby'?: string | undefined;
    /**
     * Splitter handle ARIA label for screenreader support.
     */
    'aria-label'?: string | undefined;
    /**
     * Size of the element relative to 100%.
     */
    size?: number;
    /**
     * Minimum size of the element relative to 100%.
     */
    minSize?: number;
    /**
     * Inline style of the component.
     */
    style?: React.CSSProperties;
    /**
     * ClassName of the component.
     */
    className?: string;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Step factor to increment/decrement the size of the panels while pressing the arrow keys.
     * @defaultValue 5
     */
    step?: number | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {SplitterPanelPassThroughOptions}
     */
    pt?: SplitterPanelPassThroughOptions;
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: PassThroughOptions;
}

/**
 * SplitterPanel is a helper component for Splitter.
 * @group Component
 */
export declare class SplitterPanel extends React.Component<SplitterPanelProps, any> {}

/**
 * Defines valid properties in Splitter component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface SplitterProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Orientation of the panels, valid values are "horizontal" and "vertical".
     * @defaultValue horizontal
     */
    layout?: 'vertical' | 'horizontal' | undefined;
    /**
     * Size of the divider in pixels.
     * @defaultValue 4
     */
    gutterSize?: number | undefined;
    /**
     * Storage identifier of a stateful Splitter.
     */
    stateKey?: string | undefined;
    /**
     * Defines where a stateful splitter keeps its state, valid values are "session" for sessionStorage and "local" for localStorage.
     * @defaultValue session
     */
    stateStorage?: 'session' | 'local' | undefined;
    /**
     * Callback to invoke when resize ends.
     * @param {SplitterResizeEndEvent} event - Custom resize end event.
     */
    onResizeEnd?(event: SplitterResizeEndEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {SplitterPassThroughOptions}
     */
    pt?: SplitterPassThroughOptions;
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
 * **PrimeReact - SplitterPanel**
 *
 * _Splitter is utilized to separate and resize panels._
 *
 * [Live Demo](https://www.primereact.org/splitter/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Splitter extends React.Component<SplitterProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
