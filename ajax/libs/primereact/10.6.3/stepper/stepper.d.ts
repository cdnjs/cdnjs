/**
 *
 * Stepper is a component that streamlines a wizard-like workflow, organizing content into coherent steps and visually guiding users through a numbered progression in a multi-step process.
 *
 * [Live Demo](https://www.primereact.org/stepper/)
 *
 * @module stepper
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { StepperPanelPassThroughOptionType } from '../stepperpanel/stepperpanel';

export declare type StepperPassThroughOptionType = StepperPassThroughAttributes | ((options: StepperPassThroughMethodOptions) => StepperPassThroughAttributes | string) | string | null | undefined;

/**
 * Custom passthrough(pt) option method.
 */
export interface StepperPassThroughMethodOptions {
    props: StepperProps;
    state: StepperState;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link Stepper.pt}
 */
export interface StepperPassThroughOptions {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: StepperPassThroughOptionType;
    /**
     * Used to pass attributes to the nav's DOM element.
     */
    nav?: StepperPassThroughOptionType;
    /**
     * Used to pass attributes to the panel container's DOM element.
     */
    panelContainer?: StepperPassThroughOptionType;
    /**
     * Used to pass attributes to the end handler's DOM element.
     */
    stepperpanel?: StepperPanelPassThroughOptionType;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Custom passthrough attributes for each DOM elements
 */
export interface StepperPassThroughAttributes {
    [key: string]: any;
}

/**
 * Defines current inline state in Stepper component.
 */
export interface StepperState {
    /**
     * Current active index state.
     */
    activeStep: number;
}

/**
 * Custom tab change event.
 * @see {@link StepperProps.onChange}
 */
export interface StepperChangeEvent {
    /**
     * Browser event
     */
    originalEvent: Event;
    /**
     * Index of the selected stepper panel
     */
    index: number;
}

/**
 * Defines valid properties in Stepper component.
 * @group Properties
 */
export interface StepperProps {
    /**
     * Active step index of stepper.
     * @defaultValue 0
     */
    activeStep?: number | undefined;
    /**
     * Orientation of the stepper.
     * @defaultValue horizontal
     */
    orientation?: 'horizontal' | 'vertical' | undefined;
    /**
     * Whether the steps are clickable or not.
     * @defaultValue false
     */
    linear?: boolean | undefined;
    /**
     * Callback to invoke when an active panel is changed.
     */
    onChange?(event: StepperChangeEvent): void;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {StepperPassThroughOptions}
     */
    pt?: StepperPassThroughOptions;
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
 * **PrimeReact - Stepper**
 *
 * _Stepper is a component that streamlines a wizard-like workflow, organizing content into coherent steps and visually guiding users through a numbered progression in a multi-step process._
 *
 * [Live Demo](https://www.primereact.org/stepper/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare const Stepper: React.Component<StepperProps, any>;
