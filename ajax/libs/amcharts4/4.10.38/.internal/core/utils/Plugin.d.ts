/**
 * A plugin base class.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Optional } from "./Type";
import { IDisposer } from "./Disposer";
import { Sprite } from "../Sprite";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
export interface IPlugin extends IDisposer {
    target: Optional<Sprite>;
    init(): void;
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * This is a base class that provides core functionality for plugins.
 *
 * The easiest way to start off with a new plugin is to extend this class.
 *
 * It will provide all the mandatory functionality, such as disposers.
 *
 * @since 4.2.2
 */
export declare class Plugin implements IPlugin {
    /**
     * A target object plugin is for.
     */
    target: Optional<Sprite>;
    /**
     * Is this object disposed?
     */
    protected _disposed: boolean;
    /**
     * List of IDisposer which will be disposed when the BaseObject is disposed.
     *
     * @ignore Exclude from docs
     */
    protected _disposers: Array<IDisposer>;
    /**
     * Constructor
     */
    constructor();
    /**
     * Decorates series with required events and adapters used to hijack its
     * data.
     */
    init(): void;
    /**
     * Returns if this element is already disposed.
     *
     * @return Is disposed?
     */
    isDisposed(): boolean;
    /**
     * Disposes this object and related stuff.
     */
    dispose(): void;
}
