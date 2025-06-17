/**
 *
 * Timeline visualizes a series of chained events.
 *
 * [Live Demo](https://www.primereact.org/timeline/)
 *
 * @module timeline
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { PassThroughType } from '../utils/utils';

export declare type TimelinePassThroughType<T> = PassThroughType<T, TimelinePassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface TimelinePassThroughMethodOptions {
    props: Timeline;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link TimelineProps.pt}
 */
export interface TimelinePassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: TimelinePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the event's DOM element.
     */
    event?: TimelinePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the opposite's DOM element.
     */
    opposite?: TimelinePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the separator's DOM element.
     */
    separator?: TimelinePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the marker's DOM element.
     */
    marker?: TimelinePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the connector's DOM element.
     */
    connector?: TimelinePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: TimelinePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines valid properties in Timeline component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface TimelineProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref' | 'content' | 'pt'> {
    /**
     * Position of the timeline bar relative to the content. Valid values are "left", "right for vertical layout and "top", "bottom" for horizontal layout.
     * @defaultValue left
     */
    align?: 'left' | 'right' | 'top' | 'bottom' | 'alternate' | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode;
    /**
     * Template of the content.
     */
    content?: React.ReactNode | ((item: any, index: number) => React.ReactNode);
    /**
     * Name of the field that uniquely identifies a record in the data. Should be a unique business key to prevent re-rendering.
     */
    dataKey?: string | undefined;
    /**
     * Orientation of the timeline, valid values are "vertical" and "horizontal".
     * @defaultValue vertical
     */
    layout?: 'vertical' | 'horizontal' | undefined;
    /**
     * Template content allows placing a custom event marker instead of the default one.
     */
    marker?: React.ReactNode | ((item: any, index: number) => React.ReactNode);
    /**
     * Template content to be placed at the other side of the bar.
     */
    opposite?: React.ReactNode | ((item: any, index: number) => React.ReactNode);
    /**
     * An array of events to display.
     */
    value?: any[] | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {TimelinePassThroughOptions}
     */
    pt?: TimelinePassThroughOptions;
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
 * **PrimeReact - Timeline**
 *
 * _Timeline visualizes a series of chained events._
 *
 * [Live Demo](https://www.primereact.org/timeline/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Timeline extends React.Component<TimelineProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement | null} Container element
     */
    public getElement(): HTMLDivElement | null;
}
