/**
 *
 * SelectButton is used to choose single or multiple items from a list using buttons.
 *
 * [Live Demo](https://www.primereact.org/selectbutton/)
 *
 * @module selectbutton
 *
 */
import * as React from 'react';
import { SelectItemOptionsType } from '../selectitem/selectitem';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { FormEvent } from '../ts-helpers';

/**
 * Custom change event.
 * @see {@link SelectButtonProps.onChange}
 * @extends {FormEvent}
 * @event
 */
interface SelectButtonChangeEvent extends FormEvent {}

/**
 * Defines valid properties in SelectButton component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface SelectButtonProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'unselectable' | 'onChange' | 'ref'> {
    /**
     * Value of the component.
     */
    value?: any | undefined;
    /**
     * An array of objects to display as the available options.
     */
    options?: SelectItemOptionsType | undefined;
    /**
     * Name of the label field of an option when an arbitrary objects instead of SelectItems are used as options.
     */
    optionLabel?: string | undefined;
    /**
     * Name of the value field of an option when arbitrary objects are used as options instead of SelectItems.
     */
    optionValue?: string | undefined;
    /**
     * Property name or getter function to use as the disabled flag of an option, defaults to false when not defined.
     */
    optionDisabled?: string | ((option: any) => boolean);
    /**
     * Index of the element in tabbing order.
     */
    tabIndex?: number | undefined;
    /**
     * When specified, allows selecting multiple values.
     * @defaultValue false
     */
    multiple?: boolean | undefined;
    /**
     * Whether selection can be cleared.
     * @defaultValue true
     */
    unselectable?: boolean | undefined;
    /**
     * When present, it specifies that the element should be disabled.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * A property to uniquely match the value in options for better performance.
     */
    dataKey?: string | undefined;
    /**
     * Content of the tooltip.
     */
    tooltip?: string | undefined;
    /**
     * Configuration of the tooltip, refer to the tooltip documentation for more information.
     */
    tooltipOptions?: TooltipOptions | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     */
    ariaLabelledBy?: string | undefined;
    /**
     * Function that gets the option and returns the content.
     * @param {*} item - Current item
     */
    itemTemplate?(item: any): React.ReactNode;
    /**
     * Callback to invoke on value change.
     * @param {SelectButtonChangeEvent} event - Custom change event.
     */
    onChange?(event: SelectButtonChangeEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - SelectButton**
 *
 * _SelectButton is used to choose single or multiple items from a list using buttons._
 *
 * [Live Demo](https://www.primereact.org/selectbutton/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class SelectButton extends React.Component<SelectButtonProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
    /**
     * Used to focus the component.
     */
    public focus(): void;
}
