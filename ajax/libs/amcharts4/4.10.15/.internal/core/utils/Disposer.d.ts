import { Optional } from "./Type";
/**
 * Defines interface for disposable objects.
 *
 * @ignore Exclude from docs
 */
export interface IDisposer {
    isDisposed(): boolean;
    dispose(): void;
}
/**
 * A base class for disposable objects.
 *
 * @ignore Exclude from docs
 */
export declare class Disposer implements IDisposer {
    /**
     * Is object disposed?
     */
    private _disposed;
    /**
     * Method that disposes the object.
     */
    private _dispose;
    /**
     * Constructor.
     *
     * @param dispose  Function that disposes object
     */
    constructor(dispose: () => void);
    /**
     * Checks if object is disposed.
     *
     * @return Disposed?
     */
    isDisposed(): boolean;
    /**
     * Disposes the object.
     */
    dispose(): void;
}
/**
 * A collection of related disposers that can be disposed in one go.
 *
 * @ignore Exclude from docs
 */
export declare class MultiDisposer extends Disposer {
    constructor(disposers: Array<IDisposer>);
}
/**
 * A special kind of Disposer that has attached value set.
 *
 * If a new value is set using `set()` method, the old disposer value is
 * disposed.
 *
 * @ignore Exclude from docs
 * @todo Description
 */
export declare class MutableValueDisposer<T extends IDisposer> extends Disposer {
    /**
     * Current disposer.
     */
    private _disposer;
    /**
     * Current value.
     */
    private _value;
    /**
     * Constructor.
     */
    constructor();
    /**
     * Returns current value.
     *
     * @return Value
     */
    get(): Optional<T>;
    /**
     * Sets value and disposes previous disposer if it was set.
     *
     * @param value     New value
     * @param disposer  Disposer
     */
    set(value: Optional<T>, disposer: Optional<IDisposer>): void;
    /**
     * Resets the disposer value.
     */
    reset(): void;
}
/**
 * @ignore Exclude from docs
 * @todo Description
 */
export declare class CounterDisposer extends Disposer {
    /**
     * [_counter description]
     *
     * @todo Description
     */
    private _counter;
    /**
     * [increment description]
     *
     * @todo Description
     */
    increment(): Disposer;
}
