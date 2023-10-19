import { Component } from './component';
type EffectFn = () => void;
type ComputedFn<T> = () => T;
interface Signal<T> {
    value: T;
    peek: () => T;
}
export declare function setActiveComponent(component: Component | null): void;
export declare function getActiveComponent(): Component | null;
/**
 * Creates a signal with an initial value.
 * @param initialValue - The initial value of the signal.
 * @returns A signal object with `value` and `peek` properties.
 */
export declare function signal<T>(initialValue: T): Signal<T>;
/**
 * Creates a computed signal based on a function.
 * @param fn - The function to compute the signal value.
 * @returns A computed signal object.
 */
export declare function computed<T>(fn: ComputedFn<T>): Signal<T>;
/**
 * Creates an effect based on a function.
 * @param fn - The function to create the effect.
 */
export declare function effect(fn: EffectFn): void;
/**
 * Batches multiple updates into a single update.
 * @param fn - The function to batch.
 */
export declare function batch(fn: EffectFn): void;
/**
 * Runs all functions in the batch queue.
 */
export declare function runBatch(): void;
export {};
