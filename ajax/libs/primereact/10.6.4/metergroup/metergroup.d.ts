/**
 *
 * MeterGroup displays scalar measurements within a known range.
 *
 * [Live Demo](https://www.primereact.org/metergroup/)
 *
 * @module metergroup
 *
 */
import * as React from 'react';
import { ComponentType, ReactNode } from 'react';
import { CSSTransitionProps as ReactCSSTransitionProps } from 'react-transition-group/CSSTransition';
import { CheckboxPassThroughOptions } from '../checkbox/checkbox';
import { ComponentHooks } from '../componentbase/componentbase';
import { CSSTransitionProps } from '../csstransition/csstransition';
import { PassThroughOptions } from '../passthrough';
import { SelectItemOptionsType } from '../selectitem/selectitem';
import { TooltipPassThroughOptions } from '../tooltip/tooltip';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { IconType, PassThroughType } from '../utils/utils';
import { VirtualScrollerPassThroughOptions, VirtualScrollerProps } from '../virtualscroller/virtualscroller';

export declare type MeterGroupPassThroughType<T> = PassThroughType<T, MeterGroupPassThroughMethodOptions>;
export declare type MeterGroupPassThroughTransitionType = ReactCSSTransitionProps | ((options: MeterGroupPassThroughMethodOptions) => ReactCSSTransitionProps) | undefined;

/**
 * Defines current options in MeterGroup component.
 */
export interface MeterGroupContext {
    /**
     * Current disabled state of the component as a boolean.
     * @defaultValue false
     */
    disabled: boolean;
}

/**
 * Custom passthrough(pt) option method.
 */
export interface MeterGroupPassThroughMethodOptions {
    props: MeterGroupProps;
    context: MeterGroupContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link MeterGroupProps.pt}
 */
export interface MeterGroupPassThroughOptions {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: MeterGroupPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to pass attributes to the label list's DOM element.
     */
    labellist?: MeterGroupPassThroughType<React.HTMLAttributes<HTMLOListElement>>;
    /**
     * Used to pass attributes to the label list item's DOM element.
     */
    labellistitem?: MeterGroupPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Used to pass attributes to the label list type's DOM element.
     */
    labellisttype?: MeterGroupPassThroughType<React.HTMLAttributes<HTMLOrSVGElement | any>>;
    /**
     * Used to pass attributes to the label's DOM element.
     */
    label?: MeterGroupPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Used to pass attributes to the meter container's DOM element.
     */
    metercontainer?: MeterGroupPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to pass attributes to the meter's DOM element.
     */
    meter?: MeterGroupPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
}

interface MeterGroupValue {
    value?: number;
    label?: string | HTMLElement;
    color?: string;
    [key: string]: any;
}

interface CustomRenderProps {
    totaLPercent: number;
    percentages: number[];
    values: MeterGroupValue[];
}

/**
 * Defines valid properties in MeterGroup component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
interface MeterGroupProps {
    /**
     * Additional CSS classes to apply to the MeterGroup.
     */
    className?: string;

    /**
     * An array of values to be represented by the MeterGroup.
     */
    values?: MeterGroupValue[];

    /**
     * The minimum value for the MeterGroup.
     * @defaultValue 0
     */
    min?: number;

    /**
     * The maximum value for the MeterGroup.
     * @defaultValue 100
     */
    max?: number;

    /**
     * The orientation of the MeterGroup. Can be either 'horizontal' or 'vertical'.
     * @defaultValue 'horizontal'
     */
    orientation?: 'horizontal' | 'vertical';

    /**
     * The position of the label. Can be either 'start' or 'end'.
     * @defaultValue 'end'
     */
    labelPosition?: 'start' | 'end';

    /**
     * The orientation of the label. Can be either 'horizontal' or 'vertical'.
     * @defaultValue 'horizontal'
     */
    labelOrientation?: 'horizontal' | 'vertical';
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {MeterGroupPassThroughOptions}
     */
    pt?: MeterGroupPassThroughOptions;
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: PassThroughOptions;
    /**
     * A function to render custom start label.
     * @param {CustomRenderProps} prop - Custom Render Props
     */
    start?: (props: CustomRenderProps) => ReactNode;

    /**
     * A function to render custom end label.
     * @param {CustomRenderProps} prop - Custom Render Props
     */
    end?: (props: CustomRenderProps) => ReactNode;

    /**
     * A function to render a custom meter.
     * @param {CustomRenderProps} prop - Custom Render Props
     */
    meter?: (props: CustomRenderProps) => ReactNode;

    /**
     * A function to render a custom label list.
     * @param {CustomRenderProps} prop - Custom Render Props
     */
    labelList?: (props: CustomRenderProps) => ReactNode;
}

/**
 * **PrimeReact - MeterGroup**
 *
 * _MeterGroup is an extension to standard input element with theming and keyfiltering._
 *
 * [Live Demo](https://www.primereact.org/metergroup/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class MeterGroup extends React.Component<MeterGroupProps, any> {}
