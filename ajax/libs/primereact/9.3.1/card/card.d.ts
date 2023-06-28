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
