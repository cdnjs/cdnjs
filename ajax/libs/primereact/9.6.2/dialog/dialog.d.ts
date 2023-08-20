/**
 *
 * Dialog is a container to display content in an overlay window.
 *
 * [Live Demo](https://www.primereact.org/dialog)
 *
 * @module dialog
 *
 */
import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';
import { IconType, PassThroughType } from '../utils/utils';

export declare type DialogPassThroughType<T> = PassThroughType<T, DialogPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface DialogPassThroughMethodOptions {
    props: DialogProps;
    state: DialogState;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link DialogProps.pt}
 */
export interface DialogPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: DialogPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header's DOM element.
     */
    header?: DialogPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header title's DOM element.
     */
    headerTitle?: DialogPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header icons' DOM element.
     */
    headerIcons?: DialogPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the maximizable button's DOM element.
     */
    maximizableButton?: DialogPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the maximizable icon's DOM element.
     */
    maximizableIcon?: DialogPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the close button's component.
     */
    closeButton?: DialogPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the close button icon's component.
     */
    closeButtonIcon?: DialogPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: DialogPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the footer's DOM element.
     */
    footer?: DialogPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the mask's DOM element.
     */
    mask?: DialogPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
}

/**
 * Defines current inline state in Dialog component.
 */
export interface DialogState {
    /**
     * Current visible state of the container as a boolean.
     * @defaultValue false
     */
    containerVisible: boolean;
    /**
     * Current maximized state as a boolean.
     * @defaultValue false
     */
    maximized: boolean;
}

/**
 * Dialog break options
 */
interface DialogBreakpoints {
    /**
     * Extra options.
     */
    [key: string]: string;
}

/**
 * Custom complete method event.
 * @see {@link DialogProps.onMaximize}
 * @event
 */
interface DialogMaximizeEvent {
    /**
     * Browser mouse event.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * When enabled, the dialog is initially displayed full screen.
     * @defaultValue false
     */
    maximized: boolean;
}

/**
 * Defines valid properties in Dialog component.
 * @group Properties
 */
export interface DialogProps {
    /**
     * DOM element instance where the overlay panel should be mounted. Valid values are any DOM Element and 'self'. The self value is used to render a component where it is located.
     * @defaultValue document.body
     */
    appendTo?: 'self' | HTMLElement | undefined | null;
    /**
     * Defines a string that labels the close icon.
     */
    ariaCloseIconLabel?: string | undefined;
    /**
     * Base zIndex value to use in layering.
     * @defaultValue 0
     */
    baseZIndex?: number | undefined;
    /**
     * Whether background scroll should be blocked when dialog is visible.
     * @defaultValue false
     */
    blockScroll?: boolean | undefined;
    /**
     * Object literal to define widths per screen size.
     */
    breakpoints?: DialogBreakpoints | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Style class of the component.
     */
    className?: string | undefined;
    /**
     * Adds a close icon to the header to hide the dialog.
     * @defaultValue true
     */
    closable?: boolean | undefined;
    /**
     * Specifies if pressing escape key should hide the dialog.
     * @defaultValue true
     */
    closeOnEscape?: boolean | undefined;
    /**
     * Style class of the content section.
     */
    contentClassName?: string | undefined;
    /**
     * Style of the content section.
     */
    contentStyle?: React.CSSProperties | undefined;
    /**
     * Specifies if clicking the modal background should hide the dialog.
     * @defaultValue false
     */
    dismissableMask?: boolean | undefined;
    /**
     * Enables dragging to change the position using header.
     * @defaultValue true
     */
    draggable?: boolean | undefined;
    /**
     * When enabled, first button receives focus on show.
     * @defaultValue true
     */
    focusOnShow?: boolean | undefined;
    /**
     * Footer content of the dialog.
     */
    footer?: React.ReactNode | ((props: DialogProps) => React.ReactNode);
    /**
     * Title content of the dialog.
     */
    header?: React.ReactNode | ((props: DialogProps) => React.ReactNode);
    /**
     * Style class of the header section.
     */
    headerClassName?: string | undefined;
    /**
     * Icon to display in the dialog close button.
     */
    closeIcon?: IconType<DialogProps> | undefined;
    /**
     * Style of the header section.
     */
    headerStyle?: React.CSSProperties | undefined;
    /**
     * Custom icons template for the header.
     */
    icons?: React.ReactNode | ((props: DialogProps) => React.ReactNode);
    /**
     * Unique identifier of the element.
     */
    id?: string | undefined;
    /**
     * Keeps dialog in the viewport.
     * @defaultValue true
     */
    keepInViewport?: boolean | undefined;
    /**
     * Style class of the mask.
     */
    maskClassName?: string | undefined;
    /**
     * Inline style of the mask.
     */
    maskStyle?: React.CSSProperties | undefined;
    /**
     * Whether the dialog can be displayed full screen.
     * @defaultValue false
     */
    maximizable?: boolean | undefined;
    /**
     * When enabled, the dialog is initially displayed full screen.
     * @defaultValue false
     */
    maximized?: boolean | undefined;
    /**
     * Minimum value for the left coordinate of dialog in dragging.
     * @defaultValue 0
     */
    minX?: number | undefined;
    /**
     * Minimum value for the top coordinate of dialog in dragging.
     * @defaultValue 0
     */
    minY?: number | undefined;
    /**
     * Defines if background should be blocked when dialog is displayed.
     * @defaultValue true
     */
    modal?: boolean | undefined;
    /**
     * Position of the dialog, options are "center", "top", "bottom", "left", "right", "top-left", "top-right", "bottom-left" or "bottom-right".
     * @defaultValue center
     */
    position?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | undefined;
    /**
     * Enables resizing of the content.
     * @defaultValue true
     */
    resizable?: boolean | undefined;
    /**
     * When enabled dialog is displayed in RTL direction.
     * @defaultValue false
     */
    rtl?: boolean | undefined;
    /**
     * Whether to show the header or not.
     * @defaultValue true
     */
    showHeader?: boolean | undefined;
    /**
     * Icon to display in the dialog maximize button when dialog is not maximized.
     */
    maximizeIcon?: IconType<DialogProps> | undefined;
    /**
     * Icon to display in the dialog maximize button when dialog is maximized.
     */
    minimizeIcon?: IconType<DialogProps> | undefined;
    /**
     * Inline style of the component.
     */
    style?: React.CSSProperties | undefined;
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * Specifies the visibility of the dialog.
     * @defaultValue false
     */
    visible?: boolean | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {DialogPassThroughOptions}
     */
    pt?: DialogPassThroughOptions;
    /**
     * Callback to invoke when dialog is clicked.
     * @param {React.PointerEvent<HTMLElement>} event - Browser event.
     */
    onClick?(event: React.PointerEvent<HTMLElement>): void;
    /**
     * Callback to invoke when dragging dialog.
     * @param {React.DragEvent<HTMLElement>} event - Browser event.
     */
    onDrag?(event: React.DragEvent<HTMLElement>): void;
    /**
     * Callback to invoke when dialog dragging is completed.
     * @param {React.DragEvent<HTMLElement>} event - Browser event.
     */
    onDragEnd?(event: React.DragEvent<HTMLElement>): void;
    /**
     * Callback to invoke when dialog dragging is initiated.
     * @param {React.DragEvent<HTMLElement>} event - Browser event.
     */
    onDragStart?(event: React.DragEvent<HTMLElement>): void;
    /**
     * Callback to invoke when dialog is hidden (Required).
     */
    onHide(): void;
    /**
     * Callback to invoke when the mask is clicked.
     * @param {React.MouseEvent<HTMLElement>} event - Browser event.
     */
    onMaskClick?(event: React.MouseEvent<HTMLElement>): void;
    /**
     * Callback to invoke when toggle maximize icon is clicked.
     * @param {DialogMaximizeEvent} event - Custom click event.
     */
    onMaximize?(event: DialogMaximizeEvent): void;
    /**
     * Callback to invoke while resizing dialog.
     * @param {React.MouseEvent<HTMLElement>} event - Browser event.
     */
    onResize?(event: React.MouseEvent<HTMLElement>): void;
    /**
     * Callback to invoke when dialog resizing is completed.
     * @param {React.MouseEvent<HTMLElement>} event - Browser event.
     */
    onResizeEnd?(event: React.MouseEvent<HTMLElement>): void;
    /**
     * Callback to invoke when dialog resizing is initiated.
     * @param {React.MouseEvent<HTMLElement>} event - Browser event.
     */
    onResizeStart?(event: React.MouseEvent<HTMLElement>): void;
    /**
     * Callback to invoke when dialog is showed.
     */
    onShow?(): void;
}

/**
 * **PrimeReact - Dialog**
 *
 * _Dialog is a container to display content in an overlay window._
 *
 * [Live Demo](https://www.primereact.org/dialog/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Dialog extends React.Component<DialogProps, any> {
    /**
     * Reset the dialog's position.
     */
    public resetPosition(): void;
    /**
     * Used to get the container element of the dialog.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
    /**
     * Used to get mask element.
     * @return {HTMLDivElement} Mask element
     */
    public getMask(): HTMLDivElement;
    /**
     * Used to get the content element of the dialog
     * @return {HTMLDivElement} Content element
     */
    public getContent(): HTMLDivElement;
    /**
     * Used to get the header element of the dialog
     * @return {HTMLDivElement} Header element
     */
    public getHeader(): HTMLDivElement;
    /**
     * Used to get the dialog's footer element.
     * @return {HTMLDivElement} Footer element
     */
    public getFooter(): HTMLDivElement;
    /**
     * Used to get close button element.
     * @return {HTMLButtonElement} CloseButton element
     */
    public getCloseButton(): HTMLButtonElement;
}
