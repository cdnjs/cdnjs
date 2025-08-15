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
import { ButtonPassThroughOptions } from '../button';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { IconType, PassThroughType } from '../utils/utils';

export declare type InplacePassThroughType<T> = PassThroughType<T, InplacePassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface InplacePassThroughMethodOptions {
    props: InplaceProps;
    state: InplaceState;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link InplaceProps.pt}
 */
export interface InplacePassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: InplacePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the display's DOM element.
     */
    display?: InplacePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: InplacePassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the Button component.
     * @see {@link ButtonPassThroughOptions}
     */
    closeButton?: ButtonPassThroughOptions;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines current inline state in Inplace component.
 */
export interface InplaceState {
    /**
     * Current active state as a boolean.
     * @defaultValue false
     */
    active: boolean;
}

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
     * Whether the content is displayed or not. To use in controlled mode you must implement `onToggle` callback at a minimum.
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
     * Icon of the close button.
     */
    closeIcon?: IconType<InplaceProps> | undefined;
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
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {InplacePassThroughOptions}
     */
    pt?: InplacePassThroughOptions;
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
     * @return {HTMLDivElement | null} Container element
     */
    public getElement(): HTMLDivElement | null;
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
