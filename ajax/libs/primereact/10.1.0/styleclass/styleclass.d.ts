/**
 *
 * StyleClass manages css classes declaratively to during enter/leave animations or just to toggle classes on an element.
 *
 * [Live Demo](https://www.primereact.org/styleclass)
 *
 * @module styleclass
 *
 */
import * as React from 'react';

/**
 * Defines valid properties in StyleClass component.
 * @group Properties
 */
export interface StyleClassProps {
    /**
     * A React reference to DOM element that need to specify. Required.
     */
    nodeRef: React.MutableRefObject<React.ReactNode>;
    /**
     * Selector to define the target element.
     */
    selector?: '@next' | '@prev' | '@parent' | '@grandparent' | string | undefined;
    /**
     * Style class to add when item begins to get displayed.
     */
    enterClassName?: string | undefined;
    /**
     * Style class to add during enter animation.
     */
    enterActiveClassName?: string | undefined;
    /**
     * Style class to add when item begins to get displayed.
     */
    enterToClassName?: string | undefined;
    /**
     * Style class to add when item begins to get hidden.
     */
    leaveClassName?: string | undefined;
    /**
     * Style class to add during leave animation.
     */
    leaveActiveClassName?: string | undefined;
    /**
     * Style class to add when leave animation is completed.
     */
    leaveToClassName?: string | undefined;
    /**
     * Whether to trigger leave animation when outside of the element is clicked.
     * @defaultValue false
     */
    hideOnOutsideClick?: boolean | undefined;
    /**
     * Adds or removes a class when no enter-leave animation is required.
     */
    toggleClassName?: string | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - StyleClass**
 *
 * _StyleClass manages css classes declaratively to during enter/leave animations or just to toggle classes on an element._
 *
 * [Live Demo](https://www.primereact.org/styleclass/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class StyleClass extends React.Component<StyleClassProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLElement} Container element
     */
    public getElement(): HTMLElement;
    /**
     * Used to get target element.
     * @return {HTMLElement} Container element
     */
    public getTarget(): HTMLElement;
}
