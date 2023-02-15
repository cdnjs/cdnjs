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
