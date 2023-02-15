/**
 *
 * SplitButton groups a set of commands in an overlay with a default command.
 *
 * [Live Demo](https://www.primereact.org/splitbutton/)
 *
 * @module splitbutton
 *
 */
import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';
import { MenuItem } from '../menuitem';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { IconType, TemplateType } from '../utils';

/**
 * Defines valid properties in SplitButton component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface SplitButtonProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Text of the button.
     */
    label?: string | undefined;
    /**
     * Name of the icon.
     */
    icon?: IconType<SplitButtonProps> | undefined;
    /**
     * Display loading icon of the button
     * @defaultValue false
     */
    loading?: boolean | undefined;
    /**
     * Name of the loading icon or JSX.Element for loading icon.
     */
    loadingIcon?: IconType<SplitButtonProps> | undefined;
    /**
     * MenuModel instance to define the overlay items.
     */
    model?: MenuItem[] | undefined;
    /**
     * When present, it specifies that the component should be disabled.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * When present, it specifies that the element should be visible.
     * @defaultValue true
     */
    visible?: boolean | undefined;
    /**
     * ClassName of the button.
     */
    buttonClassName?: string | undefined;
    /**
     * Inline style of the overlay menu.
     */
    menuStyle?: React.CSSProperties | undefined;
    /**
     * ClassName class of the overlay menu.
     */
    menuClassName?: string | undefined;
    /**
     * ClassName of the menu dropdown button.
     */
    menuButtonClassName?: string | undefined;
    /**
     * Props for the main button, any prop is passed implicity to the button element.
     */
    buttonProps?: any | undefined;
    /**
     * Props for the dropdown button, any prop is passed implicity to the dropdown button element.
     */
    menuButtonProps?: any | undefined;
    /**
     * DOM element instance where the overlay panel should be mounted. Valid values are any DOM Element and 'self'. The self value is used to render a component where it is located.
     * @defaultValue document.body
     */
    appendTo?: 'self' | HTMLElement | null | undefined;
    /**
     * Content of the tooltip.
     */
    tooltip?: string | undefined;
    /**
     * Configuration of the tooltip, refer to the tooltip documentation for more information.
     */
    tooltipOptions?: TooltipOptions | undefined;
    /**
     * Template of the default button.
     */
    buttonTemplate?: TemplateType<SplitButtonProps> | undefined;
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * Icon class of the dropdown icon.
     * @defaultValue pi pi-chevron-down
     */
    dropdownIcon?: IconType<SplitButtonProps> | undefined;
    /**
     * Callback to invoke when main button is clicked.
     * @param {React.MouseEvent<HTMLElement>} event - Browser event
     */
    onClick?(event: React.MouseEvent<HTMLElement>): void;
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
}

/**
 * **PrimeReact - SplitButton**
 *
 * _SplitButton groups a set of commands in an overlay with a default command._
 *
 * [Live Demo](https://www.primereact.org/splitbutton/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class SplitButton extends React.Component<SplitButtonProps, any> {
    /**
     * Used to show the popup.
     */
    public show(): void;
    /**
     * Used to hide the popup.
     */
    public hide(): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
