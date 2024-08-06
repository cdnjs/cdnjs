/**
 *
 * TriStateCheckbox is used to select either "true", "false" or "null" as the value.
 *
 * [Live Demo](https://www.primereact.org/tristatecheckbox/)
 *
 * @module tristatecheckbox
 *
 */
import * as React from 'react';
import { CheckboxPassThroughType } from '../checkbox/checkbox';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { TooltipPassThroughOptions } from '../tooltip/tooltip';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { FormEvent } from '../ts-helpers';
import { IconType, PassThroughType } from '../utils/utils';

export declare type TriStateCheckboxPassThroughType<T> = PassThroughType<T, TriStateCheckboxPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface TriStateCheckboxPassThroughMethodOptions {
    props: TriStateCheckboxProps;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link TriStateCheckboxProps.pt}
 */
export interface TriStateCheckboxPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: TriStateCheckboxPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the input's DOM element.
     */
    input?: CheckboxPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to pass attributes to the box's DOM element.
     */
    box?: CheckboxPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes tooltip's DOM element.
     * @type {TooltipPassThroughOptions}
     */
    tooltip?: TooltipPassThroughOptions;
    /**
     * Uses to pass attributes to the check icon's DOM element.
     */
    checkIcon?: TriStateCheckboxPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the uncheck icon's DOM element.
     */
    uncheckIcon?: TriStateCheckboxPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the sr only aria's DOM element.
     */
    srOnlyAria?: TriStateCheckboxPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Custom change event.
 * @see {@link TriStateCheckboxProps.onChange}
 * @extends {FormEvent}
 * @event
 */
interface TriStateCheckboxChangeEvent extends FormEvent<boolean> {}

/**
 * Defines valid properties in TriStateCheckbox component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface TriStateCheckboxProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'value' | 'ref'> {
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @defaultValue false
     */
    autoFocus?: boolean | undefined;
    /**
     * Value of the TriStateCheckbox.
     */
    value?: boolean | undefined | null;
    /**
     * When present, it specifies that the component should have invalid state style.
     * @defaultValue false
     */
    invalid?: boolean | undefined;
    /**
     * When present, it specifies that the element value cannot be altered.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * Specifies the input variant of the component.
     * @defaultValue outlined
     */
    variant?: 'outlined' | 'filled' | undefined;
    /**
     * When present, it specifies that the value cannot be changed.
     * @defaultValue false
     */
    readOnly?: boolean | undefined;
    /**
     * Icon of the checkbox when checked.
     */
    checkIcon?: IconType<TriStateCheckboxProps> | undefined;
    /**
     * Icon of the checkbox when unchecked.
     */
    uncheckIcon?: IconType<TriStateCheckboxProps> | undefined;
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
     * @param {TriStateCheckboxChangeEvent} event - Browser event.
     */
    onChange?(event: TriStateCheckboxChangeEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {TriStateCheckboxPassThroughOptions}
     */
    pt?: TriStateCheckboxPassThroughOptions;
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
 * **PrimeReact - TriStateCheckbox**
 *
 * _TriStateCheckbox is used to select either "true", "false" or "null" as the value._
 *
 * [Live Demo](https://www.primereact.org/tristatecheckbox/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class TriStateCheckbox extends React.Component<TriStateCheckboxProps, any> {
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
