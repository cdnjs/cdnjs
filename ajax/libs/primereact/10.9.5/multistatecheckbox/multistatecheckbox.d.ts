/**
 *
 * MultiStateCheckbox is used to select a state from given multiple states.
 *
 * [Live Demo](https://www.primereact.org/multistatecheckbox/)
 *
 * @module multistatecheckbox
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { TooltipPassThroughOptions } from '../tooltip/tooltip';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { IconType, PassThroughType } from '../utils';

export declare type MultiStateCheckboxPassThroughType<T> = PassThroughType<T, MultiStateCheckboxPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface MultiStateCheckboxPassThroughMethodOptions {
    props: MultiStateCheckboxProps;
    state: MultiStateCheckboxState;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link MultiStateCheckboxProps.pt}
 */
export interface MultiStateCheckboxPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: MultiStateCheckboxPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the checkbox box's DOM element.
     */
    checkbox?: MultiStateCheckboxPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes tooltip's DOM element.
     * @type {TooltipPassThroughOptions}
     */
    tooltip?: TooltipPassThroughOptions;
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: MultiStateCheckboxPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the sr only aria's DOM element.
     */
    srOnlyAria?: MultiStateCheckboxPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines current inline state in MultiStateCheckbox component.
 */
export interface MultiStateCheckboxState {
    /**
     * Focused state as a boolean.
     */
    focused: boolean;
}

/**
 * Custom MultiStateCheckbox option.
 */
interface MultiStateCheckboxOption {
    /**
     * The icon of the option.
     */
    icon: IconType<MultiStateCheckboxProps>;
    /**
     * Inline style of the element.
     */
    style: React.CSSProperties;
    /**
     * Style class of the element.
     */
    className: string;
    /**
     * Extra options.
     */
    [key: string]: any;
}

/**
 * Custom icon template options.
 */
interface MultiStateCheckboxIconTemplateEvent {
    /**
     * Option of the element.
     */
    option: MultiStateCheckboxOption | null | undefined;
    /**
     * Style class of the element.
     */
    className: string;
    /**
     * The default element created by the component.
     */
    element: JSX.Element;
    /**
     * The props passed to the component.
     */
    props: MultiStateCheckboxProps;
}

/**
 * Custom change target options.
 */
interface MultiStateCheckboxChangeTargetOptions {
    /**
     * The name of the element.
     */
    name: string;
    /**
     * Unique identifier of the element.
     */
    id: string;
    /**
     * Value of the MultiStateCheckbox.
     */
    value: boolean | null | undefined;
}

/**
 * Custom change event.
 * @see {@link MultiStateCheckboxProps.onChange}
 * @event
 */
interface MultiStateCheckboxChangeEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Current value
     */
    value: any;
    /**
     * Stops the event from propagating.
     */
    stopPropagation(): void;
    /**
     * Prevents the default action of the event.
     */
    preventDefault(): void;
    /**
     * Target options.
     */
    target: MultiStateCheckboxChangeTargetOptions;
}

/**
 * Defines valid properties in MultiStateCheckbox component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface MultiStateCheckboxProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref' | 'pt'> {
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @defaultValue false
     */
    autoFocus?: boolean | undefined;
    /**
     * Value of the MultiStateCheckbox.
     */
    value?: any | undefined;
    /**
     * An array to display as the available options.
     */
    options?: MultiStateCheckboxOption[] | any[];
    /**
     * Property name to use as the value of an option, defaults to the option itself when not defined.
     */
    optionValue?: string | undefined;
    /**
     * Property name to refer to the option label, used by screen readers only. Defaults to optionValue.
     */
    optionLabel?: string | undefined;
    /**
     * Property name to use as the icon of an option, defaults to the icon property.
     */
    optionIcon?: string | undefined;
    /**
     * Template of icon for the selected option.
     */
    iconTemplate?: React.ReactNode | ((options: MultiStateCheckboxIconTemplateEvent) => React.ReactNode);
    /**
     * A property to uniquely identify an option.
     */
    dataKey?: string | undefined;
    /**
     * When present, it specifies that the element value cannot be altered.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * When present, it specifies that the value cannot be changed.
     * @defaultValue false
     */
    readOnly?: boolean | undefined;
    /**
     * If false, the empty state is skipped in the chekbox.
     * @defaultValue true
     */
    empty?: boolean | undefined;
    /**
     * Content of the tooltip.
     */
    tooltip?: string | undefined;
    /**
     * Configuration of the tooltip, refer to the tooltip documentation for more information.
     */
    tooltipOptions?: TooltipOptions | undefined;
    /**
     * Callback to invoke on value change
     * @param {MultiStateCheckboxChangeEvent} event - Custom change event.
     */
    onChange?(event: MultiStateCheckboxChangeEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {MultiStateCheckboxPassThroughOptions}
     */
    pt?: MultiStateCheckboxPassThroughOptions;
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
 * **PrimeReact - MultiStateCheckbox**
 *
 * _MultiStateCheckbox is used to select a state from given multiple states._
 *
 * [Live Demo](https://www.primereact.org/multistatecheckbox/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class MultiStateCheckbox extends React.Component<MultiStateCheckboxProps, any> {
    /**
     * Used to focus the component.
     */
    public focus(): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement | null} Container element
     */
    public getElement(): HTMLDivElement | null;
}
