/**
 *
 * ConfirmDialog uses a Dialog UI with confirmDialog method or <ConfirmDialog> tag.
 *
 * [Live Demo](https://www.primereact.org/confirmdialog)
 *
 * @module confirmdialog
 *
 */
import * as React from 'react';
import { CSSTransitionProps as ReactCSSTransitionProps } from 'react-transition-group/CSSTransition';
import { ButtonPassThroughOptions } from '../button/button';
import { ComponentHooks } from '../componentbase/componentbase';
import { DialogProps } from '../dialog';
import { PassThroughOptions } from '../passthrough';
import { IconType, PassThroughType } from '../utils';

export declare type ConfirmDialogPassThroughType<T> = PassThroughType<T, ConfirmDialogPassThroughMethodOptions>;
export declare type ConfirmDialogPassThroughTransitionType = ReactCSSTransitionProps | ((options: ConfirmDialogPassThroughMethodOptions) => ReactCSSTransitionProps) | undefined;

/**
 * Custom passthrough(pt) option method.
 */
export interface ConfirmDialogPassThroughMethodOptions {
    props: ConfirmDialogProps;
    state: ConfirmDialogState;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link ConfirmDialogProps.pt}
 */
export interface ConfirmDialogPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: ConfirmDialogPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header's DOM element.
     */
    header?: ConfirmDialogPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header title's DOM element.
     */
    headerTitle?: ConfirmDialogPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header icons' DOM element.
     */
    headerIcons?: ConfirmDialogPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement | SVGSVGElement>>;
    /**
     * Uses to pass attributes to the close button's component.
     */
    closeButton?: ConfirmDialogPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the close button icon's component.
     */
    closeButtonIcon?: ConfirmDialogPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement | SVGSVGElement>>;
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: ConfirmDialogPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: ConfirmDialogPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement | SVGSVGElement>>;
    /**
     * Uses to pass attributes to the message's DOM element.
     */
    message?: ConfirmDialogPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the footer's DOM element.
     */
    footer?: ConfirmDialogPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the Button component.
     * @see {@link ButtonPassThroughOptions}
     */
    rejectButton?: ButtonPassThroughOptions;
    /**
     * Uses to pass attributes to the Button component.
     * @see {@link ButtonPassThroughOptions}
     */
    acceptButton?: ButtonPassThroughOptions;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
    /**
     * Used to control React Transition API.
     */
    transition?: ConfirmDialogPassThroughTransitionType;
}

/**
 * Defines current inline state in ConfirmDialog component.
 */
export interface ConfirmDialogState {
    /**
     * Current visible state as a boolean.
     * @defaultValue false
     */
    visible: boolean;
    /**
     * Current confirmation message.
     */
    confirmation: any;
}

/**
 * Custom confirm dialog options
 */
interface ConfirmDialogOptions {
    /**
     * Callback to execute when action is confirmed.
     */
    accept(): void;
    /**
     * Callback to execute when action is rejected.
     */
    reject(): void;
    /**
     * Style class of the accept button.
     */
    acceptClassName: string;
    /**
     * Style class of the reject button.
     */
    rejectClassName: string;
    /**
     * Label of the accept button.
     * @defaultValue Yes
     */
    acceptLabel: string;
    /**
     * Label of the reject button.
     * @defaultValue No
     */
    rejectLabel: string;
    /**
     * Element to receive the focus when the dialog gets visible, valid values are "accept" and "reject".
     * @defaultValue accept
     */
    defaultFocus: string;
    /**
     * Default element created by the component.
     */
    element: React.ReactNode;
    /**
     * All component props
     * @type {ConfirmDialogProps}
     */
    props: ConfirmDialogProps;
    /**
     * Extra options
     */
    [key: string]: any;
}

/**
 * Defines valid properties in ConfirmDialog component. In addition to these, all properties of {@link dialog} can be used in this component.
 * @group Properties
 */
export interface ConfirmDialogProps extends Omit<DialogProps, 'onHide' | 'footer' | 'pt'> {
    /**
     * Unique tag key used to separate the confirmDialog components in the page.
     */
    tagKey?: string | undefined;
    /**
     * Specifies the visibility of the confirm dialog.
     * @defaultValue false
     */
    visible?: boolean | undefined;
    /**
     * Message of the confirmation.
     */
    message?: React.ReactNode | ((options: ConfirmDialogOptions) => React.ReactNode);
    /**
     * Label of the reject button.
     * @defaultValue No
     */
    rejectLabel?: string | undefined;
    /**
     * Label of the accept button.
     * @defaultValue Yes
     */
    acceptLabel?: string | undefined;
    /**
     * Icon to display next to the message.
     */
    icon?: IconType<ConfirmDialogProps> | undefined;
    /**
     * Icon of the reject button.
     */
    rejectIcon?: IconType<ConfirmDialogProps> | undefined;
    /**
     * Icon of the accept button.
     */
    acceptIcon?: IconType<ConfirmDialogProps> | undefined;
    /**
     * Style class of the reject button.
     */
    rejectClassName?: string | undefined;
    /**
     * Style class of the accept button.
     */
    acceptClassName?: string | undefined;
    /**
     * Element to receive the focus when the dialog gets visible, valid values are "accept" and "reject".
     * @defaultValue accept
     */
    defaultFocus?: string | undefined;
    /**
     * DOM element instance where the overlay panel should be mounted. Valid values are any DOM Element and "self". The "self" value is used to render a component where it is located.
     * @defaultValue document.body
     */
    appendTo?: 'self' | HTMLElement | undefined | null | (() => HTMLElement);
    /**
     * Style class of the element.
     */
    className?: string | undefined;
    /**
     * Footer content of the confirm dialog.
     */
    footer?: React.ReactNode | ((options: ConfirmDialogOptions) => React.ReactNode);
    /**
     * Callback to invoke when confirm dialog is hidden.
     */
    onHide?(result: string): void;
    /**
     * Callback to execute when action is confirmed.
     */
    accept?(): void;
    /**
     * Callback to execute when action is rejected.
     */
    reject?(): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {ConfirmDialogPassThroughOptions}
     */
    pt?: ConfirmDialogPassThroughOptions;
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
 * Object returned by the {@link confirmDialog} method.
 */
interface ConfirmDialogReturn {
    /**
     * Used to show the dialog.
     */
    show(): void;
    /**
     * Used to hide the dialog.
     */
    hide(): void;
}

/**
 * **PrimeReact - ConfirmDialog**
 *
 * _ConfirmDialog uses a Dialog UI with confirmDialog method or <ConfirmDialog> tag._
 *
 * [Live Demo](https://www.primereact.org/confirmdialog/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class ConfirmDialog extends React.Component<ConfirmDialogProps, any> {
    /**
     * Used to call/update the component manually
     * @param {ConfirmDialogProps} props - All component props
     */
    public confirm(props?: ConfirmDialogProps): void;
}

export declare function confirmDialog(props: ConfirmDialogProps): ConfirmDialogReturn;
