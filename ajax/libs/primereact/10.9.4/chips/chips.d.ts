/**
 *
 * Chips is used to enter multiple values on an input field.
 *
 * [Live Demo](https://www.primereact.org/chips/)
 *
 * @module chips
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { KeyFilterType } from '../keyfilter';
import { PassThroughOptions } from '../passthrough';
import { TooltipPassThroughOptions } from '../tooltip/tooltip';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { FormEvent } from '../ts-helpers';
import { IconType, PassThroughType } from '../utils/utils';

export declare type ChipsPassThroughType<T> = PassThroughType<T, ChipsPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface ChipsPassThroughMethodOptions {
    props: ChipsProps;
    state: ChipsState;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link ChipsProps.pt}
 */
export interface ChipsPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: ChipsPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the container's DOM element.
     */
    container?: ChipsPassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the token's DOM element.
     */
    token?: ChipsPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: ChipsPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the remove token icon's DOM element.
     */
    removeTokenIcon?: ChipsPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the input token's DOM element.
     */
    inputToken?: ChipsPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the input's DOM element.
     */
    input?: ChipsPassThroughType<React.HTMLAttributes<HTMLInputElement>>;
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
 * Defines current inline state in Chips component.
 */
export interface ChipsState {
    /**
     * Current focused state as a boolean.
     * @defaultValue false
     */
    focused: boolean;
}

/**
 * @group Others
 * @see {@link ChipsProps.removable}
 */
interface ChipsRemovableOptions {
    /**
     * Current value
     */
    value: string;
    /**
     * Current index
     */
    index: number;
    /**
     * Props of Chips component
     * @type {ChipsProps}
     */
    props: ChipsProps;
}

/**
 * Custom add event
 */
interface ChipsAddEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Added item value
     */
    value: string;
}

/**
 * Custom remove event
 * @event
 */
interface ChipsRemoveEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Removed item value
     */
    value: string;
}

/**
 * Custom change event.
 * @see {@link ChipsProps.onChange}
 * @extends {FormEvent}
 * @event
 */
interface ChipsChangeEvent extends FormEvent<string[]> {}

/**
 * Defines valid properties in Chips component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface ChipsProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'onFocus' | 'onBlur' | 'onKeyDown' | 'ref'> {
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @defaultValue false
     */
    autoFocus?: boolean | undefined;
    /**
     * Reference of the input element.
     */
    inputRef?: React.Ref<HTMLInputElement> | undefined;
    /**
     * Identifier of the input element.
     */
    inputId?: string | undefined;
    /**
     * Name of the input field.
     */
    name?: string | undefined;
    /**
     * Advisory information to display on input.
     */
    placeholder?: string | undefined;
    /**
     * Value of the component.
     */
    value?: string[] | undefined;
    /**
     * Maximum number of entries allowed.
     */
    max?: number | undefined;
    /**
     * When present, it specifies that the component should have invalid state style.
     * @defaultValue false
     */
    invalid?: boolean | undefined;
    /**
     * When present, it specifies that the element should be disabled.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * Specifies the input variant of the component.
     * @defaultValue outlined
     */
    variant?: 'outlined' | 'filled' | undefined;
    /**
     * When present, it specifies that the element should be read-only.
     * @defaultValue false
     */
    readOnly?: boolean | undefined;
    /**
     * Whether an item is removable.
     * @defaultValue true
     */
    removable?: boolean | ((options: ChipsRemovableOptions) => boolean);
    /**
     * Icon of the remove element.
     */
    removeIcon?: IconType<ChipsProps> | undefined;
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
     * Separator char to add an item when pressed in addition to the enter key.
     */
    separator?: string | undefined;
    /**
     * Whether to allow duplicate values or not.
     * @defaultValue true
     */
    allowDuplicate?: boolean;
    /**
     * Format definition of the keys to block.
     * @type {KeyFilterType}
     */
    keyfilter?: KeyFilterType | undefined;
    /**
     * Whether to add an item when the input loses focus.
     * @defaultValue false
     */
    addOnBlur?: boolean | undefined;
    /**
     * The template of each item
     * @param {*} item - Current item
     */
    itemTemplate?(item: any): React.ReactNode;
    /**
     * Callback to invoke when a chip is added. Return 'false' to prevent the item from being added.
     * @param {ChipsAddEvent} event - Custom add event
     */
    onAdd?(event: ChipsAddEvent): void;
    /**
     * Callback to invoke when a chip is removed.
     * @param {ChipsRemoveEvent} event - Custom remove event
     */
    onRemove?(event: ChipsRemoveEvent): void;
    /**
     * Callback to invoke when a chip is added or removed.
     * @param {ChipsChangeEvent} event - Custom change event
     */
    onChange?(event: ChipsChangeEvent): void;
    /**
     * Callback to invoke when the component gets focus.
     * @param {React.FocusEvent<HTMLInputElement>} event - Browser event
     */
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke when the component loses focus.
     * @param {React.FocusEvent<HTMLInputElement>} event - Browser event
     */
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke when the key pressed.
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
     * @type {ChipsPassThroughOptions}
     */
    pt?: ChipsPassThroughOptions;
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
 * **PrimeReact - Chips**
 *
 * _Chips is used to enter multiple values on an input field._
 *
 * [Live Demo](https://www.primereact.org/chips/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Chips extends React.Component<ChipsProps, any> {
    /**
     * Used to focus the component.
     */
    public focus(): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement | null} Container element
     */
    public getElement(): HTMLDivElement | null;
    /**
     * Used to get input element.
     * @return {HTMLInputElement} Input element
     */
    public getInput(): HTMLInputElement;
}
