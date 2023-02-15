/**
 *
 * Tag component is used to categorize content.
 *
 * [Live Demo](https://www.primereact.org/tag)
 *
 * @module tag
 *
 */
import * as React from 'react';
import { IconType } from '../utils';

/**
 * Defines valid properties in Tag component. In addition to these, all properties of HTMLSpanElement can be used in this component.
 * @group Properties
 */
export interface TagProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, 'ref'> {
    /**
     * Value to display inside the tag.
     */
    value?: React.ReactNode;
    /**
     * Severity type of the tag.
     * @defaultValue null
     */
    severity?: 'success' | 'info' | 'warning' | 'danger' | null | undefined;
    /**
     * Whether the corners of the tag are rounded.
     * @defaultValue false
     */
    rounded?: boolean | undefined;
    /**
     * Icon of the tag to display next to the value.
     */
    icon?: IconType<TagProps> | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - Tag**
 *
 * _Tag component is used to categorize content._
 *
 * [Live Demo](https://www.primereact.org/tag/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Tag extends React.Component<TagProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLSpanElement} Container element
     */
    public getElement(): HTMLSpanElement;
}
