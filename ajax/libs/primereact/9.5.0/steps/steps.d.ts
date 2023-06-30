/**
 *
 * Steps also known as Stepper, is an indicator for the steps in a workflow. Layout of steps component is optimized for responsive design.
 *
 * [Live Demo](https://www.primereact.org/steps/)
 *
 * @module steps
 *
 */
import * as React from 'react';
import { MenuItem } from '../menuitem';
import { PassThroughType } from '../utils/utils';

export declare type StepsPassThroughType<T> = PassThroughType<T, StepsThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface StepsThroughMethodOptions {
    props: StepsProps;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link StepsProps.pt}
 */
export interface StepsPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: StepsPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the list's DOM element.
     */
    menu?: StepsPassThroughType<React.HTMLAttributes<HTMLUListElement>>;
    /**
     * Uses to pass attributes to the list item's DOM element.
     */
    menuitem?: StepsPassThroughType<React.HTMLAttributes<HTMLLIElement>>;
    /**
     * Uses to pass attributes to the action's DOM element.
     */
    action?: StepsPassThroughType<React.HTMLAttributes<HTMLAnchorElement>>;
    /**
     * Uses to pass attributes to the step's DOM element.
     */
    step?: StepsPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: StepsPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: StepsPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
}

/**
 * Custom select event
 * @see {@link StepsProps.onSelect}
 * @event
 */
interface StepsSelectEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Selected item instance
     */
    item: MenuItem;
    /**
     * Index of selected item instance
     */
    index: number;
}

/**
 * Defines valid properties in Steps component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface StepsProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onSelect' | 'ref'> {
    /**
     * An array of menuitems.
     */
    model: MenuItem[] | undefined;
    /**
     * Index of the active item.
     * @defaultValue 0
     */
    activeIndex?: number | undefined;
    /**
     * Whether the items are clickable or not.
     * @defaultValue true
     */
    readOnly?: boolean | undefined;
    /**
     * Callback to invoke when the new step is selected.
     * @param {StepsSelectEvent} event - Custom select event
     */
    onSelect?(event: StepsSelectEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {StepsPassThroughOptions}
     */
    pt?: StepsPassThroughOptions;
}

/**
 * **PrimeReact - Steps**
 *
 * _Steps also known as Stepper, is an indicator for the steps in a workflow. Layout of steps component is optimized for responsive design._
 *
 * [Live Demo](https://www.primereact.org/steps/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Steps extends React.Component<StepsProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
