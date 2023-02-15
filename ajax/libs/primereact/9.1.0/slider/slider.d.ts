/**
 *
 * Slider is a component to provide input with a drag handle.
 *
 * [Live Demo](https://www.primereact.org/slider/)
 *
 * @module slider
 *
 */
import * as React from 'react';

/**
 * Custom change event.
 * @see {@link SliderProps.onChange}
 * @event
 */
interface SliderChangeEvent {
    /**
     * Slide event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * New value
     */
    value: number | [number, number];
}

/**
 * Custom slide event.
 * @see {@link SliderProps.onSlideEnd}
 * @extends {SliderChangeEvent}
 * @event
 */
interface SliderSlideEndEvent extends SliderChangeEvent {}

/**
 * Defines valid properties in Slider component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface SliderProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'value' | 'ref'> {
    /**
     * Value of the component.
     * @defaultValue 0
     */
    value?: number | [number, number] | undefined;
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
     * Orientation of the slider, valid values are horizontal and vertical.
     * @defaultValue horizontal
     */
    orientation?: 'horizontal' | 'vertical' | undefined;
    /**
     * Step factor to increment/decrement the value.
     * @defaultValue 1
     */
    step?: number | undefined;
    /**
     * When speficed, allows two boundary values to be picked.
     * @defaultValue false
     */
    range?: boolean | undefined;
    /**
     * When present, it specifies that the component should be disabled.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     */
    ariaLabelledBy?: string | undefined;
    /**
     * Callback to invoke on value change via slide.
     * @param {SliderChangeEvent} event - Custom change event
     */
    onChange?(event: SliderChangeEvent): void;
    /**
     * Callback to invoke when slide ends.
     * @param {SliderSlideEndEvent} event - Custom slide event
     */
    onSlideEnd?(event: SliderSlideEndEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - Slider**
 *
 * _Slider is a component to provide input with a drag handle._
 *
 * [Live Demo](https://www.primereact.org/slider/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Slider extends React.Component<SliderProps, any> {
    /**
     * Returns the reference of virtualScroller's container.
     */
    public getElement(): HTMLDivElement;
}
