/**
 *
 * Knob is a form component to define number inputs with a dial.
 *
 * [Live Demo](https://www.primereact.org/knob/)
 *
 * @module knob
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { PassThroughType } from '../utils/utils';

export declare type KnobPassThroughType<T> = PassThroughType<T, KnobPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface KnobPassThroughMethodOptions {
    props: KnobProps;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link KnobProps.pt}
 */
export interface KnobPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: KnobPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the svg's DOM element.
     */
    svg?: KnobPassThroughType<React.SVGProps<SVGSVGElement>>;
    /**
     * Uses to pass attributes to the range's DOM element.
     */
    range?: KnobPassThroughType<React.SVGProps<SVGPathElement>>;
    /**
     * Uses to pass attributes to the value' DOM element.
     */
    value?: KnobPassThroughType<React.SVGProps<SVGPathElement>>;
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: KnobPassThroughType<React.SVGProps<SVGTextElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Custom change event.
 * @see {@link KnobProps.onChange}
 * @event
 */
interface KnobChangeEvent {
    /**
     * New value
     */
    value: number;
}

/**
 * Defines valid properties in Knob component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface KnobProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref'> {
    /**
     * Unique identifier of the element.
     */
    id?: string | undefined;
    /**
     * Inline style of the element.
     */
    style?: React.CSSProperties | undefined;
    /**
     * Style class of the element.
     */
    className?: string | undefined;
    /**
     * Value of the component.
     */
    value?: number | undefined;
    /**
     * Size of the component in pixels.
     * @defaultValue 100
     */
    size?: number | undefined;
    /**
     * When present, it specifies that the component should be disabled.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * When present, it specifies that the component value cannot be edited.
     * @defaultValue false
     */
    readOnly?: boolean | undefined;
    /**
     * Whether the show the value inside the knob.
     * @defaultValue true
     */
    showValue?: boolean | undefined;
    /**
     * Step factor to increment/decrement the value.
     * @defaultValue 1
     */
    step?: number | undefined;
    /**
     * Mininum boundary value.
     * @defaultValue 0
     */
    min?: number | undefined;
    /**
     * Maximum boundary value.
     * @defaultValue 100
     */
    max?: number | undefined;
    /**
     * Width of the knob stroke.
     * @defaultValue 14
     */
    strokeWidth?: number | undefined;
    /**
     * Name of the input element.
     */
    name?: string | undefined;
    /**
     * Background of the value.
     * @defaultValue var(--primary-color, Black)
     */
    valueColor?: string | undefined;
    /**
     * Background color of the range.
     * @defaultValue var(--surface-border, LightGray)
     */
    rangeColor?: string | undefined;
    /**
     * Color of the value text.
     * @defaultValue var(--text-color-secondary, Black)
     */
    textColor?: string | undefined;
    /**
     * Template string of the value.
     * @defaultValue &#123;value&#125;
     */
    valueTemplate?: string | undefined;
    /**
     * Callback to invoke on value change.
     * @param {KnobChangeEvent} event - Custom change event
     */
    onChange?(event: KnobChangeEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {KnobPassThroughOptions}
     */
    pt?: KnobPassThroughOptions;
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
 * **PrimeReact - Knob**
 *
 * _Knob is a form component to define number inputs with a dial._
 *
 * [Live Demo](https://www.primereact.org/knob/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Knob extends React.Component<KnobProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
