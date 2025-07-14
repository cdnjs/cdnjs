/**
 *
 * ScrollTop gets displayed after a certain scroll position and used to navigates to the top of the page quickly.
 *
 * [Live Demo](https://www.primereact.org/scrolltop/)
 *
 * @module scrolltop
 *
 */
import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';
import { IconType, PassThroughType } from '../utils';

export declare type ScrollTopPassThroughType<T> = PassThroughType<T, ScrollTopPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface ScrollTopPassThroughMethodOptions {
    props: ScrollTopProps;
    state: ScrollTopState;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link ScrollTopProps.pt}
 */
export interface ScrollTopPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: ScrollTopPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: ScrollTopPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
}

/**
 * Defines current inline state in ScrollTop component.
 */
export interface ScrollTopState {
    /**
     * Current visible state as a boolean.
     * @defaultValue false
     */
    visible: boolean;
}

/**
 * Defines valid properties in ScrollTop component.
 * @group Properties
 */
export interface ScrollTopProps {
    /**
     * Target of the ScrollTop, valid values are "window" and "parent".
     * @defaultValue window
     */
    target?: 'window' | 'parent' | undefined;
    /**
     * Defines the threshold value of the vertical scroll position of the target to toggle the visibility.
     * @defaultValue 400
     */
    threshold?: number;
    /**
     * Name of the icon or JSX.Element for icon.
     */
    icon?: IconType<ScrollTopProps>;
    /**
     * Defines the scrolling behavior, "smooth" adds an animation and "auto" scrolls with a jump.
     * @defaultValue smooth
     */
    behavior?: 'auto' | 'smooth' | undefined;
    /**
     * Style class of the component.
     */
    className?: string | undefined;
    /**
     * Inline style of the component.
     */
    style?: React.CSSProperties | undefined;
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     * @type {CSSTransitionProps}
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * Callback to invoke when overlay panel becomes visible.
     */
    onShow?(): void;
    /**
     * 	Callback to invoke when overlay becomes hidden.
     */
    onHide?(): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {ScrollTopPassThroughOptions}
     */
    pt?: ScrollTopPassThroughOptions;
}

/**
 * **PrimeReact - ScrollTop**
 *
 * _ScrollTop gets displayed after a certain scroll position and used to navigates to the top of the page quickly._
 *
 * [Live Demo](https://www.primereact.org/scrolltop/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class ScrollTop extends React.Component<ScrollTopProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLButtonElement} Container element
     */
    public getElement(): HTMLButtonElement;
}
