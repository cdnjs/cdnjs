/**
 *
 * Chart components are based on Chart.js, an open source HTML5 based charting library.
 *
 * [Live Demo](https://www.primereact.org/chart)
 *
 * @module chart
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { PassThroughType } from '../utils/utils';

export declare type ChartPassThroughType<T> = PassThroughType<T, ChartPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface ChartPassThroughMethodOptions {
    props: ChartProps;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link ChartProps.pt}
 */
export interface ChartPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: ChartPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the canvas's DOM element.
     */
    canvas?: ChartPassThroughType<React.HTMLAttributes<HTMLCanvasElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines valid properties in Chart component.
 * @group Properties
 */
export interface ChartProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref' | 'content' | 'pt'> {
    /**
     * Type of the chart.
     */
    type?: string | undefined;
    /**
     * Data to display.
     */
    data?: object | undefined;
    /**
     * Options to customize the chart.
     */
    options?: object | undefined;
    /**
     * Used to custom plugins of the chart.
     */
    plugins?: any[] | undefined;
    /**
     * Width of the chart in non-responsive mode.
     */
    width?: string | undefined;
    /**
     * Height of the chart in non-responsive mode.
     */
    height?: string | undefined;
    /**
     * ARIA label for the chart canvas. Defaults to options.plugins.title.text if available.
     * @default options.plugins.title.text
     */
    ariaLabel?: string | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {ChartPassThroughOptions}
     */
    pt?: ChartPassThroughOptions;
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
 * **PrimeReact - Chart**
 *
 * _Chart components are based on Chart.js, an open source HTML5 based charting library._
 *
 * [Live Demo](https://www.primereact.org/chart/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Chart extends React.Component<ChartProps, any> {
    /**
     * Used to get canvas element.
     * @return {HTMLCanvasElement} Canvas element
     */
    public getCanvas(): HTMLCanvasElement;
    /**
     * Used to get chart instance.
     * @return {*} Chart instance
     */
    public getChart(): any;
    /**
     * Used to get base64 image.
     * @return {*} base64 image
     */
    public getBase64Image(): any;
    /**
     * Used to generate legend.
     * @return {string} Generated legend
     */
    public generateLegend(): string;
    /**
     * Redraws the graph.
     */
    public refresh(): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
