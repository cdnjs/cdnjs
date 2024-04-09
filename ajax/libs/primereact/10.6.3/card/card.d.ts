/**
 *
 * Card is a flexible container component.
 *
 * [Live Demo](https://www.primereact.org/card/)
 *
 * @module card
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { PassThroughType } from '../utils';

export declare type CardPassThroughType<T> = PassThroughType<T, CardPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface CardPassThroughMethodOptions {
    props: CardProps;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link CardProps.pt}
 */
export interface CardPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: CardPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header's DOM element.
     */
    header?: CardPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the body's DOM element.
     */
    body?: CardPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the title's DOM element.
     */
    title?: CardPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the subtitle's DOM element.
     */
    subTitle?: CardPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: CardPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the footer's DOM element.
     */
    footer?: CardPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines valid properties in Card component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface CardProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref' | 'title'> {
    /**
     * Header of the card.
     */
    header?: React.ReactNode | ((props: CardProps) => React.ReactNode);
    /**
     * Footer of the card.
     */
    footer?: React.ReactNode | ((props: CardProps) => React.ReactNode);
    /**
     * Title of the card.
     */
    title?: React.ReactNode | ((props: CardProps) => React.ReactNode);
    /**
     * Secondary title of the card.
     */
    subTitle?: React.ReactNode | ((props: CardProps) => React.ReactNode);
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {CardPassThroughOptions}
     */
    pt?: CardPassThroughOptions;
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
 * **PrimeReact - Card**
 *
 * _Card is a flexible container component._
 *
 * [Live Demo](https://www.primereact.org/card/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Card extends React.Component<CardProps, any> {}
