/**
 *
 * BlockUI represents people using icons, labels and images.
 *
 * [Live Demo](https://www.primereact.org/blockui)
 *
 * @module blockui
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { PassThroughType } from '../utils/utils';

export declare type BlockUIPassThroughType<T> = PassThroughType<T, BlockUIPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface BlockUIPassThroughMethodOptions {
    props: BlockUIProps;
    state: BlockUIState;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link BlockUIProps.pt}
 */
export interface BlockUIPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: BlockUIPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the mask's DOM element.
     */
    mask?: BlockUIPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines current inline state in BlockUI component.
 */
export interface BlockUIState {
    /**
     * Current blocked state as a boolean.
     * @defaultValue false
     */
    blocked: boolean;
}

/**
 * Defines valid properties in BlockUI component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface BlockUIProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Whether to automatically manage layering.
     * @defaultValue true
     */
    autoZIndex?: boolean | undefined;
    /**
     * Base zIndex value to use in layering.
     * @defaultValue 0
     */
    baseZIndex?: number | undefined;
    /**
     * Controls the blocked state.
     * @defaultValue false
     */
    blocked?: boolean | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Style class of the container element.
     */
    containerClassName?: string | undefined;
    /**
     * Inline style of the container element.
     */
    containerStyle?: React.CSSProperties | undefined;
    /**
     * When enabled, the whole document gets blocked.
     * @defaultValue false
     */
    fullScreen?: boolean | undefined;
    /**
     * Template of mask.
     */
    template?: React.ReactNode | ((props: BlockUIProps) => React.ReactNode) | null | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {BlockUIPassThroughOptions}
     */
    pt?: BlockUIPassThroughOptions;
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
    /**
     * Fired when the element gets blocked.
     */
    onBlocked?(): void;
    /**
     * Fired when the element gets unblocked.
     */
    onUnblocked?(): void;
}

/**
 * **PrimeReact - BlockUI**
 *
 * _BlockUI represents people using icons, labels and images._
 *
 * [Live Demo](https://www.primereact.org/blockui/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class BlockUI extends React.Component<BlockUIProps, any> {
    public block(): void;
    public unblock(): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
