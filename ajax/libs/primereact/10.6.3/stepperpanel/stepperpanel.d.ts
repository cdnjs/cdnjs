/**
 *
 * StepperPanel is a helper component for Stepper component.
 *
 * [Live Demo](https://www.primereact.org/stepper/)
 *
 * @module stepperpanel
 *
 */
import * as React from 'react';
import { TransitionProps } from 'react-transition-group/Transition';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';

export declare type StepperPanelPassThroughOptionType = StepperPanelPassThroughAttributes | ((options: StepperPanelPassThroughMethodOptions) => StepperPanelPassThroughAttributes | string) | string | null | undefined;

export declare type StepperPanelPassThroughTransitionType = TransitionProps | ((options: StepperPanelPassThroughMethodOptions) => TransitionProps) | undefined;

/**
 * Custom passthrough(pt) option method.
 */
export interface StepperPanelPassThroughMethodOptions {
    /**
     * Defines valid properties.
     */
    props: StepperPanelProps;
    /**
     * Defines current options.
     */
    context: StepperPanelContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link StepperPanelProps.pt}
 */
export interface StepperPanelPassThroughOptions {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: StepperPanelPassThroughOptionType;
    /**
     * Used to pass attributes to the header's DOM element.
     */
    header?: StepperPanelPassThroughOptionType;
    /**
     * Used to pass attributes to the action's DOM element.
     */
    action?: StepperPanelPassThroughOptionType;
    /**
     * Used to pass attributes to the number's DOM element.
     */
    number?: StepperPanelPassThroughOptionType;
    /**
     * Used to pass attributes to the title's DOM element.
     */
    title?: StepperPanelPassThroughOptionType;
    /**
     * Used to pass attributes to the separator's DOM element.
     */
    separator?: StepperPanelPassThroughOptionType;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: StepperPanelPassThroughOptionType;
    /**
     * Used to pass attributes to the panel's DOM element.
     */
    panel?: StepperPanelPassThroughOptionType;
    /**
     * Used to pass attributes to the toggleable content's DOM element.
     */
    toggleableContent?: StepperPanelPassThroughOptionType;
    /**
     * Used to control React Transition API.
     */
    transition?: StepperPanelPassThroughTransitionType;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Custom passthrough attributes for each DOM elements
 */
export interface StepperPanelPassThroughAttributes {
    [key: string]: any;
}

/**
 * Defines current options in StepperPanel component.
 */
export interface StepperPanelContext {
    /**
     * Current index of the stepperpanel.
     */
    index: number;
    /**
     * Count of stepperpanels
     */
    count: number;
    /**
     * Whether the stepperpanel is first.
     */
    first: boolean;
    /**
     * Whether the stepperpanel is last.
     */
    last: boolean;
    /**
     * Whether the stepperpanel is active.
     */
    active: boolean;
    /**
     * Whether the stepperpanel is highlighted.
     */
    highlighted: boolean;
    /**
     * Whether the stepperpanel is disabled.
     */
    disabled: boolean;
}

/**
 * Defines valid properties in StepperPanel component.
 * @group Properties
 */
export interface StepperPanelProps {
    /**
     * Orientation of tab headers.
     */
    header?: string | undefined;
    /**
     * Used to pass attributes to DOM elements inside the component.
     * @type {StepperPanelPassThroughOptions}
     */
    pt?: StepperPanelPassThroughOptions;
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: PassThroughOptions;
}

/**
 * **PrimeReact - StepperPanel**
 *
 * _StepperPanel is a component that streamlines a wizard-like workflow, organizing content into coherent steps and visually guiding users through a numbered progression in a multi-step process._
 *
 * [Live Demo](https://www.primereact.org/stepper/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare const StepperPanel: React.Component<StepperPanelProps, any>;
