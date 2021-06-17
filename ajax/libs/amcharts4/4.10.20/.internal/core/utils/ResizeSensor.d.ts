interface Sensor {
    addTarget(target: Element, callback: () => void): void;
    removeTarget(target: Element): void;
}
export declare class ResizeSensor {
    private _sensor;
    private _element;
    private _disposed;
    constructor(element: Element, callback: () => void);
    isDisposed(): boolean;
    dispose(): void;
    readonly sensor: Sensor;
    /**
     * Deprecated: do not use.
     *
     * @ignore Exclude from docs
     */
    reset(): void;
}
export {};
