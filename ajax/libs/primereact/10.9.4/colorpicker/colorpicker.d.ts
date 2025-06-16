/**
 *
 * ColorPicker is an input component to select a color.
 *
 * [Live Demo](https://www.primereact.org/colorpicker/)
 *
 * @module colorpicker
 *
 */
import * as React from 'react';
import { CSSTransitionProps as ReactCSSTransitionProps } from 'react-transition-group/CSSTransition';
import { ComponentHooks } from '../componentbase/componentbase';
import { CSSTransitionProps } from '../csstransition';
import { PassThroughOptions } from '../passthrough';
import { TooltipPassThroughOptions } from '../tooltip/tooltip';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { FormEvent } from '../ts-helpers';
import { PassThroughType } from '../utils/utils';

export declare type ColorPickerPassThroughType<T> = PassThroughType<T, ColorPickerPassThroughMethodOptions>;
export declare type ColorPickerPassThroughTransitionType = ReactCSSTransitionProps | ((options: ColorPickerPassThroughMethodOptions) => ReactCSSTransitionProps) | undefined;

/**
 * Custom passthrough(pt) option method.
 */
export interface ColorPickerPassThroughMethodOptions {
    props: ColorPickerProps;
    state: ColorPickerState;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link ColorPickerProps.pt}
 */
export interface ColorPickerPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: ColorPickerPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the input's DOM element.
     */
    input?: ColorPickerPassThroughType<React.HTMLAttributes<HTMLInputElement>>;
    /**
     * Uses to pass attributes to the panel's DOM element.
     */
    panel?: ColorPickerPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: ColorPickerPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the selector's DOM element.
     */
    selector?: ColorPickerPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the color's DOM element.
     */
    color?: ColorPickerPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the color handle's DOM element.
     */
    colorHandle?: ColorPickerPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the hue's DOM element.
     */
    hue?: ColorPickerPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the hue handle's DOM element.
     */
    hueHandle?: ColorPickerPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
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
    /**
     * Used to control React Transition API.
     */
    transition?: ColorPickerPassThroughTransitionType;
}

/**
 * Defines current inline state in ColorPicker component.
 */
export interface ColorPickerState {
    /**
     * Current overlay visible state as a boolean.
     * @defaultValue false
     */
    overlayVisible: boolean;
}

/**
 * RGB type of value
 */
interface ColorPickerRGBType {
    /**
     * red color number
     */
    r: number;
    /**
     * green color number
     */
    g: number;
    /**
     * blue color number
     */
    b: number;
}

/**
 * HSB type of value
 */
interface ColorPickerHSBType {
    /**
     * hue number
     */
    h: number;
    /**
     * saturation number
     */
    s: number;
    /**
     * brightness number
     */
    b: number;
}

/**
 * Custom change event.
 * @see {@link ColorPickerProps.onChange}
 * @extends {FormEvent}
 * @event
 */
interface ColorPickerChangeEvent extends FormEvent<string | ColorPickerRGBType | ColorPickerHSBType> {}

/**
 * Defines valid properties in AutoComplete component. In addition to these, all properties of HTMLInputElement can be used in this component.
 * @group Properties
 */
export interface ColorPickerProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange' | 'value' | 'ref'> {
    /**
     * DOM element instance where the overlay panel should be mounted. Valid values are any DOM Element and "self". The "self" value is used to render a component where it is located.
     * @defaultValue document.body
     */
    appendTo?: 'self' | HTMLElement | undefined | null | (() => HTMLElement);
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @defaultValue false
     */
    autoFocus?: boolean | undefined;
    /**
     * Default color to display when value is null.
     * @defaultValue ff0000
     */
    defaultColor?: string | undefined;
    /**
     * Format to use in value binding.
     * @defaultValue hex
     */
    format?: 'hex' | 'rgb' | 'hsb' | undefined;
    /**
     * Whether to display as an overlay or not.
     * @defaultValue false
     */
    inline?: boolean | undefined;
    /**
     * Identifier of the focus input to match a label defined for the dropdown.
     */
    inputId?: string | undefined;
    /**
     * Reference of the input element.
     */
    inputRef?: React.Ref<HTMLInputElement> | undefined;
    /**
     * Inline style of the input field.
     */
    inputStyle?: React.CSSProperties | undefined;
    /**
     * Inline style of the input field.
     */
    inputClassName?: string | undefined;
    /**
     * Style class of the overlay panel.
     */
    panelClassName?: string | undefined;
    /**
     * Inline style of the overlay panel.
     */
    panelStyle?: React.CSSProperties | undefined;
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
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     * @type {CSSTransitionProps}
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * Value of the component.
     * @type {string | ColorPickerRGBType | ColorPickerHSBType}
     */
    value?: string | ColorPickerRGBType | ColorPickerHSBType | undefined;
    /**
     * Callback to invoke when a color is selected.
     * @param {ColorPickerChangeEvent} event - Custom change event.
     */
    onChange?(event: ColorPickerChangeEvent): void;
    /**
     * Callback to invoke when overlay panel becomes visible.
     */
    onShow?(): void;
    /**
     * Callback to invoke when overlay panel becomes hidden.
     */
    onHide?(): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {ColorPickerPassThroughOptions}
     */
    pt?: ColorPickerPassThroughOptions;
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
 * **PrimeReact - ColorPicker**
 *
 * _ColorPicker is an input component to select a color._
 *
 * [Live Demo](https://www.primereact.org/colorpicker/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class ColorPicker extends React.Component<ColorPickerProps, any> {
    /**
     * Used to show the overlay.
     */
    public show(): void;
    /**
     * Used to hide the overlay.
     */
    public hide(): void;
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
     * @return {HTMLInputElement | null} Input element
     */
    public getInput(): HTMLInputElement | null;
    /**
     * Used to get overlay element.
     * @return {HTMLElement | null} Overlay element
     */
    public getOverlay(): HTMLElement | null;
}
