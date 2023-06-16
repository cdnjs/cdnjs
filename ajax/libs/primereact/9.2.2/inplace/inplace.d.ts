/**
 *
 * Inplace provides an easy to do editing and display at the same time where clicking the output displays the actual content.
 *
 * [Live Demo](https://www.primereact.org/inplace)
 *
 * Helper Components:
 *
 * - {@link InplaceDisplay}
 *
 * - {@link InplaceContent}
 *
 * @module inplace
 *
 */
import * as React from 'react';

/**
 * Custom toggle event.
 * @see {@link InplaceProps.onToggle}
 * @event
 */
interface InplaceToggleEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Current value
     */
    value: boolean;
}

/**
 * Defines valid properties in Inplace component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface InplaceProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Whether the content is displayed or not.
     * @defaultValue false
     */
    active?: boolean | undefined;
    /**
     * Displays a button to switch back to display mode.
     * @defaultValue false
     */
    closable?: boolean | undefined;
    /**
     * When present, it specifies that the element should be disabled.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * Used to define a string that labels the component.
     */
    ariaLabel?: string | undefined;
    /**
     * Callback to invoke when inplace is opened.
     * @param {React.MouseEvent}  event - Browser event.
     */
    onOpen?(event: React.MouseEvent<HTMLElement>): void;
    /**
     * Callback to invoke when inplace is closed.
     * @param {React.MouseEvent}  event - Browser event.
     */
    onClose?(event: React.MouseEvent<HTMLElement>): void;
    /**
     * Callback to invoke when inplace is opened or closed.
     * @param {InplaceToggleEvent}  event - Custom toggle event.
     */
    onToggle?(event: InplaceToggleEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - Inplace**
 *
 * _Inplace provides an easy to do editing and display at the same time where clicking the output displays the actual content._
 *
 * [Live Demo](https://www.primereact.org/inplace/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Inplace extends React.Component<InplaceProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}

/**
 * @group Properties
 */
export interface InplaceDisplayProps {
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * @group Properties
 */
export interface InplaceContentProps {
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * InplaceDisplay is a helper component for Inplace.
 * @group Component
 */
// tslint:disable-next-line:max-classes-per-file
export declare class InplaceDisplay extends React.Component<InplaceDisplayProps, any> {}

/**
 * InplaceContent is a helper component for Inplace.
 * @group Component
 */
// tslint:disable-next-line:max-classes-per-file
export declare class InplaceContent extends React.Component<InplaceContentProps, any> {}
