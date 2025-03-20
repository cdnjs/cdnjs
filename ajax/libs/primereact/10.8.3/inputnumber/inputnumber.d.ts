/**
 *
 * InputNumber is an input component to provide numerical input.
 *
 * [Live Demo](https://www.primereact.org/inputnumber/)
 *
 * @module inputnumber
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { InputText, InputTextPassThroughOptions } from '../inputtext/inputtext';
import { PassThroughOptions } from '../passthrough';
import { TooltipPassThroughOptions } from '../tooltip/tooltip';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { FormEvent } from '../ts-helpers';
import { IconType, PassThroughType } from '../utils/utils';

export declare type RoundingMode = 'ceil' | 'floor' | 'expand' | 'trunc' | 'halfCeil' | 'halfFloor' | 'halfExpand' | 'halfTrunc' | 'halfEven';

export declare type InputNumberPassThroughType<T> = PassThroughType<T, InputNumberPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface InputNumberPassThroughMethodOptions {
    props: InputNumberProps;
    state: InputNumberState;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link InputNumberProps.pt}
 */
export interface InputNumberPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: InputNumberPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the Input component.
     * @see {@link InputTextPassThroughOptions}
     */
    input?: InputTextPassThroughOptions;
    /**
     * Uses to pass attributes to the button group's DOM element.
     */
    buttonGroup?: InputNumberPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the increment button's DOM element.
     */
    incrementButton?: InputNumberPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the decrement button's DOM element.
     */
    decrementButton?: InputNumberPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes tooltip's DOM element.
     * @type {TooltipPassThroughOptions}
     */
    tooltip?: TooltipPassThroughOptions;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines current inline state in InputNumber component.
 */
export interface InputNumberState {
    /**
     * Current focused state as a boolean.
     * @defaultValue false
     */
    focused: boolean;
}

/**
 * Custom value change event.
 * @see {@link InputNumberProps.onValueChange}
 * @extends {FormEvent}
 * @event
 */
interface InputNumberValueChangeEvent extends FormEvent<number | null> {}

/**
 * Custom change event
 * @see {@link InputNumberProps.onChange}
 * @event
 */
interface InputNumberChangeEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * New value
     */
    value: number | null;
}

/**
 * Defines valid properties in InputNumber component. In addition to these, all properties of HTMLSpanElement can be used in this component.
 * @group Properties
 */
export interface InputNumberProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, 'onChange' | 'ref'> {
    /**
     * 	Value of the component.
     */
    value?: number | null;
    /**
     * Reference of the input element.
     */
    inputRef?: React.Ref<HTMLInputElement> | undefined;
    /**
     * Whether to format the value.
     * @defaultValue true
     */
    format?: boolean | undefined;
    /**
     * Displays spinner buttons.
     * @defaultValue false
     */
    showButtons?: boolean | undefined;
    /**
     * Layout of the buttons.
     * @defaultValue stacked
     */
    buttonLayout?: 'stacked' | 'horizontal' | 'vertical' | undefined;
    /**
     * Style class of the increment button.
     */
    incrementButtonClassName?: string | undefined;
    /**
     * Style class of the decrement button.
     */
    decrementButtonClassName?: string | undefined;
    /**
     * Style class of the increment button.
     */
    incrementButtonIcon?: IconType<InputNumberProps> | undefined;
    /**
     * Style class of the decrement button.
     */
    decrementButtonIcon?: IconType<InputNumberProps> | undefined;
    /**
     * Locale to be used in formatting.
     */
    locale?: string | undefined;
    /**
     * The locale matching algorithm to use. See [Locale Negotation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_negotiation) for details.
     * @defaultValue best fit
     */
    localeMatcher?: 'lookup' | 'best fit' | string | undefined;
    /**
     * Defines the behavior of the component.
     * @defaultValue decimal
     */
    mode?: 'decimal' | 'currency' | undefined;
    /**
     * Text to display after the value.
     */
    suffix?: string | undefined;
    /**
     * Text to display before the value.
     */
    prefix?: string | undefined;
    /**
     * The currency to use in currency formatting. Possible values are the [ISO 4217 currency codes](https://www.six-group.com/en/products-services/financial-information/data-standards.html#scrollTo=maintenance-agency), such as "USD" for the US dollar, "EUR" for the euro, or "CNY" for the Chinese RMB.
     * There is no default value; if the style is "currency", the currency property must be provided.
     */
    currency?: string | undefined;
    /**
     * How to display the currency in currency formatting. Possible values are "symbol" to use a localized currency symbol such as €, ü"code" to use the ISO currency code, "name" to use a localized currency name such as "dollar"; the default is "symbol".
     * @defaultValue symbol
     */
    currencyDisplay?: string | undefined;
    /**
     * Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators.
     * @defaultValue true
     */
    useGrouping?: boolean | undefined;
    /**
     * The minimum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number and percent formatting is 0;
     * the default for currency formatting is the number of minor unit digits provided by the [ISO 4217 currency code list](https://www.six-group.com/en/products-services/financial-information/data-standards.html#scrollTo=maintenance-agency) (2 if the list doesn't provide that information).
     */
    minFractionDigits?: number | undefined;
    /**
     * The maximum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number formatting is the larger of minimumFractionDigits and 3;
     * the default for currency formatting is the larger of minimumFractionDigits and the number of minor unit digits provided by the [ISO 4217 currency code list](https://www.six-group.com/en/products-services/financial-information/data-standards.html#scrollTo=maintenance-agency) (2 if the list doesn't provide that information).
     */
    maxFractionDigits?: number | undefined;
    /**
     * How decimals should be rounded. [further information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#roundingmode).
     * @defaultValue halfExpand
     */
    roundingMode?: RoundingMode;
    /**
     * Name of the input element.
     */
    name?: string | undefined;
    /**
     * Type of the input element.
     * @defaultValue text
     */
    type?: string | undefined;
    /**
     * Determines whether the input field is empty.
     * @defaultValue true
     */
    allowEmpty?: boolean | undefined;
    /**
     * Step factor to increment/decrement the value.
     * @defaultValue 1
     */
    step?: number | undefined;
    /**
     * Mininum boundary value.
     */
    min?: number | undefined;
    /**
     * Maximum boundary value.
     */
    max?: number | undefined;
    /**
     * Maximum value length.
     */
    maxLength?: number | undefined;
    /**
     * When present, it specifies that the component should have invalid state style.
     * @defaultValue false
     */
    invalid?: boolean | undefined;
    /**
     * When present, it specifies that the element should be disabled.
     */
    disabled?: boolean | undefined;
    /**
     * Specifies the input variant of the component.
     * @defaultValue outlined
     */
    variant?: 'outlined' | 'filled' | undefined;
    /**
     * When present, it specifies that the element must be filled out before submitting the form.
     * @defaultValue false
     */
    required?: boolean | undefined;
    /**
     * Index of the element in tabbing order.
     */
    tabIndex?: number | undefined;
    /**
     * The pattern attribute specifies a regular expression that the element's value is checked against on form submission.
     */
    pattern?: string | undefined;
    /**
     * Hint text for the input field.
     */
    placeholder?: string | undefined;
    /**
     * When present, it specifies that the element should be read-only.
     */
    readOnly?: boolean | undefined;
    /**
     * Size of the input field.
     */
    size?: number | undefined;
    /**
     * Identifier of the input element.
     */
    inputId?: string | undefined;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @defaultValue false
     */
    autoFocus?: boolean | undefined;
    /**
     * Inline style of the input field.
     */
    inputStyle?: React.CSSProperties | undefined;
    /**
     * Inline style of the input field.
     */
    inputClassName?: string | undefined;
    /**
     * Content of the tooltip.
     */
    tooltip?: string | undefined;
    /**
     * Configuration of the tooltip, refer to the tooltip documentation for more information.
     * @type {TooltipOptions}
     */
    tooltipOptions?: TooltipOptions | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     */
    ariaLabelledBy?: string | undefined;
    /**
     * Callback to invoke after validation check and value change.
     * @param {InputNumberValueChangeEvent} event - Custom value change event
     */
    onValueChange?(event: InputNumberValueChangeEvent): void;
    /**
     * Callback to invoke on value change.
     * @param {InputNumberChangeEvent} event - Custom change event
     */
    onChange?(event: InputNumberChangeEvent): void;
    /**
     * Callback to invoke when input receives focus.
     * @param {React.FocusEvent<HTMLInputElement>} event - Browser event
     */
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke when input loses focus.
     * @param {React.FocusEvent<HTMLInputElement>} event - Browser event
     */
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke when the key pressed down.
     * @param {React.KeyboardEvent<HTMLInputElement>} event - Browser event
     */
    onKeyDown?(event: React.KeyboardEvent<HTMLInputElement>): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {InputNumberPassThroughOptions}
     */
    pt?: InputNumberPassThroughOptions;
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
 * **PrimeReact - InputNumber**
 *
 * _InputNumber is an input component to provide numerical input._
 *
 * [Live Demo](https://www.primereact.org/inputnumber/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class InputNumber extends React.Component<InputNumberProps, any> {
    /**
     * Used to focus the component.
     */
    public focus(): void;
    /**
     * Used to get formatter.
     * @return {*} formatter instance
     */
    public getFormatter(): any;
    /**
     * Used to get container element.
     * @return {HTMLSpanElement} Container element
     */
    public getElement(): HTMLSpanElement;
    /**
     * Used to get input element.
     * @return {InputText} Input element
     */
    public getInput(): typeof InputText;
}
