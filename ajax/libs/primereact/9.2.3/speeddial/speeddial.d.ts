/**
 *
 * When pressed, a floating action button can display multiple primary actions that can be performed on a page.
 *
 * [Live Demo](https://www.primereact.org/speeddial/)
 *
 * @module speeddial
 *
 */
import * as React from 'react';
import { MenuItem } from '../menuitem';
import { IconType } from '../utils';

/**
 */
interface SpeedDialButtonOptions {
    /**
     * Fired when the button element clicked.
     * @param {React.MouseEvent<HTMLElement>} event - Browser event.
     */
    onClick?(event: React.MouseEvent<HTMLElement>): void;
    /**
     * Style class of the element.
     */
    className: string;
    /**
     * Icon Classname of the element.
     */
    iconClassName: string;
    /**
     * Default element created by the component.
     */
    element: JSX.Element;
    /**
     * Properties passed to the component.
     */
    props: SpeedDialProps;
    /**
     * Whether the overlay is opened.
     */
    visible: boolean;
}

/**
 * Defines valid properties in SpeedDial component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface SpeedDialProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * MenuModel instance to define the action items.
     */
    model?: MenuItem[];
    /**
     * Specifies the visibility of the overlay.
     * @defaultValue false
     */
    visible?: boolean | undefined;
    /**
     * Specifies the opening direction of actions. Valid values are 'up', 'down', 'left', 'right', 'up-left', 'up-right', 'down-left' and 'down-right'
     * @defaultValue up
     */
    direction?: 'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-right' | 'down-left' | 'down-right' | undefined;
    /**
     * Transition delay step for each action item.
     * @defaultValue 30
     */
    transitionDelay?: number | undefined;
    /**
     * Specifies the opening type of actions.
     * @defaultValue linear
     */
    type?: 'linear' | 'circle' | 'semi-circle' | 'quarter-circle' | undefined;
    /**
     * Radius for *circle types.
     * @defaultValue 0
     */
    radius?: number | undefined;
    /**
     * Whether to show a mask element behind the speeddial.
     * @defaultValue false
     */
    mask?: boolean | undefined;
    /**
     * Whether the component is disabled.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * Whether the actions close when clicked outside.
     * @defaultValue true
     */
    hideOnClickOutside?: boolean | undefined;
    /**
     * Inline style of the button element.
     */
    buttonStyle?: React.CSSProperties;
    /**
     * Style class of the button element.
     */
    buttonClassName?: string | undefined;
    /**
     * Template of button element.
     */
    buttonTemplate?: React.ReactNode | ((options: SpeedDialButtonOptions) => React.ReactNode);
    /**
     * Inline style of the mask element.
     */
    maskStyle?: React.CSSProperties | undefined;
    /**
     * Style class of the mask element.
     */
    maskClassName?: string | undefined;
    /**
     * Show icon of the button element.
     * @defaultValue pi pi-plus
     */
    showIcon?: IconType<SpeedDialProps>;
    /**
     * Hide icon of the button element.
     */
    hideIcon?: IconType<SpeedDialProps>;
    /**
     * Defined to rotate showIcon when hideIcon is not present.
     * @defaultValue true
     */
    rotateAnimation?: boolean | undefined;
    /**
     * Fired when the visibility of element changed.
     * @param {boolean} visible - Custom visible change event
     */
    onVisibleChange?(visible: boolean): void;
    /**
     * Fired when the button element clicked.
     * @param {React.MouseEvent<HTMLElement>} event - Browser event.
     */
    onClick?(event: React.MouseEvent<HTMLElement>): void;
    /**
     * Fired when the actions are visible.
     */
    onShow?(): void;
    /**
     * Fired when the actions are hidden.
     */
    onHide?(): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - SpeedDial**
 *
 * _When pressed, a floating action button can display multiple primary actions that can be performed on a page._
 *
 * [Live Demo](https://www.primereact.org/speeddial/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class SpeedDial extends React.Component<SpeedDialProps, any> {
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
