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
 * Defines valid properties in SplitterPanel component.
 * @group Properties
 */
interface SplitterPanelProps {
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
