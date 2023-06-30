/**
 *
 * ConfirmPopup displays a confirmation overlay displayed relatively to its target.
 *
 * [Live Demo](https://www.primereact.org/confirmpopup)
 *
 * @module confirmpopup
 *
 */
import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';
import { IconType, PassThroughType } from '../utils';
import { ButtonPassThroughOptions } from '../button/button';

export declare type ConfirmPopupPassThroughType<T> = PassThroughType<T, ConfirmPopupPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface ConfirmPopupPassThroughMethodOptions {
    props: ConfirmPopupProps;
    state: ConfirmPopupState;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link ConfirmPopupProps.pt}
 */
export interface ConfirmPopupPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: ConfirmPopupPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: ConfirmPopupPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: ConfirmPopupPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the message's DOM element.
     */
    message?: ConfirmPopupPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the footer's DOM element.
     */
    footer?: ConfirmPopupPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
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
}

/**
 * Defines current inline state in ConfirmPopup component.
 */
export interface ConfirmPopupState {
    /**
     * Current visible state as a boolean.
     * @defaultValue false
     */
    visible: boolean;
    /**
     * Current reshow state as a boolean.
     * @defaultValue false
     */
    reshow: boolean;
}

/**
 * Custom confirm popup options
 */
interface ConfirmPopupOptions {
    /**
     * Callback to execute when action is confirmed.
     */
    accept(): void;
    /**
     * Callback to execute when action is rejected.
     */
    reject(): void;
    /**
     * Style class of the component.
     */
    className: string;
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
     * Default element created by the component.
     */
    element: React.ReactNode;
    /**
     * All component props
     * @type {ConfirmPopupProps}
     */
    props: ConfirmPopupProps;
    /**
     * Extra options
     */
    [key: string]: any;
}

/**
 * Defines valid properties in ConfirmPopup component.
 * @group Properties
 */
export interface ConfirmPopupProps {
    /**
     * Unique tag key used to separate the confirmPopup components in the page.
     */
    tagKey?: string | undefined;
    /**
     * Target element to align the popup.
     */
    target?: HTMLElement | undefined;
    /**
     * Specifies the visibility of the confirm popup.
     * @defaultValue false
     */
    visible?: boolean | undefined;
    /**
     * Message of the confirmation.
     */
    message?: React.ReactNode | ((options: ConfirmPopupOptions) => React.ReactNode);
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
    icon?: IconType<ConfirmPopupProps> | undefined;
    /**
     * Icon of the reject button.
     */
    rejectIcon?: IconType<ConfirmPopupProps> | undefined;
    /**
     * Icon of the accept button.
     */
    acceptIcon?: IconType<ConfirmPopupProps> | undefined;
    /**
     * Style class of the reject button.
     */
    rejectClassName?: string | undefined;
    /**
     * Style class of the accept button.
     */
    acceptClassName?: string | undefined;
    /**
     * Style class of the element.
     */
    className?: string | undefined;
    /**
     * Inline style of the element.
     */
    style?: React.CSSProperties | undefined;
    /**
     * DOM element instance where the overlay panel should be mounted. Valid values are any DOM Element and 'self'. The self value is used to render a component where it is located.
     * @defaultValue document.body
     */
    appendTo?: 'self' | HTMLElement | undefined | null;
    /**
     * Enables to hide the popup when outside is clicked.
     * @defaultValue true
     */
    dismissable?: boolean | undefined;
    /**
     * Footer content of the confirm popup.
     */
    footer?: React.ReactNode | ((options: ConfirmPopupOptions) => React.ReactNode);
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * Callback to invoke when overlay panel becomes visible.
     */
    onShow?(): void;
    /**
     * Callback to invoke when confirm popup is hidden.
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
     * @type {ConfirmPopupPassThroughOptions}
     */
    pt?: ConfirmPopupPassThroughOptions;
}

/**
 * Object returned by the {@link confirmPopup} method.
 */
interface ConfirmPopupReturn {
    /**
     * Used to show the popup.
     */
    show(): void;
    /**
     * Used to hide the popup.
     */
    hide(): void;
}

/**
 * **PrimeReact - ConfirmPopup**
 *
 * _ConfirmPopup displays a confirmation overlay displayed relatively to its target._
 *
 * [Live Demo](https://www.primereact.org/confirmpopup/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class ConfirmPopup extends React.Component<ConfirmPopupProps, any> {
    /**
     * Used to call/update the component manually
     * @param {ConfirmPopupProps} props - All component props
     */
    public confirm(props?: ConfirmPopupProps): void;
}

export declare function confirmPopup(props: ConfirmPopupProps): ConfirmPopupReturn;
