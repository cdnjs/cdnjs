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
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { IconType } from '../utils';

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
export interface MultiStateCheckboxProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref'> {
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
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
