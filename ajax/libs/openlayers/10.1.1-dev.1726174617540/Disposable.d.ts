export default Disposable;
/**
 * @module ol/Disposable
 */
/**
 * @classdesc
 * Objects that need to clean up after themselves.
 */
declare class Disposable {
    /**
     * The object has already been disposed.
     * @type {boolean}
     * @protected
     */
    protected disposed: boolean;
    /**
     * Clean up.
     */
    dispose(): void;
    /**
     * Extension point for disposable objects.
     * @protected
     */
    protected disposeInternal(): void;
}
//# sourceMappingURL=Disposable.d.ts.map