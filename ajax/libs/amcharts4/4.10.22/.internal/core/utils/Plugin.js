/**
 * A plugin base class.
 */
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
var Plugin = /** @class */ (function () {
    /**
     * Constructor
     */
    function Plugin() {
        /**
         * Is this object disposed?
         */
        this._disposed = false;
        /**
         * List of IDisposer which will be disposed when the BaseObject is disposed.
         *
         * @ignore Exclude from docs
         */
        this._disposers = [];
        // Nothing to do here
    }
    /**
     * Decorates series with required events and adapters used to hijack its
     * data.
     */
    Plugin.prototype.init = function () {
        // Does nothing
        // Override it
    };
    /**
     * Returns if this element is already disposed.
     *
     * @return Is disposed?
     */
    Plugin.prototype.isDisposed = function () {
        return this._disposed;
    };
    /**
     * Disposes this object and related stuff.
     */
    Plugin.prototype.dispose = function () {
        if (!this._disposed) {
            this._disposed = true;
            var a = this._disposers;
            this._disposers = null;
            while (a.length !== 0) {
                var disposer = a.shift();
                disposer.dispose();
            }
        }
    };
    return Plugin;
}());
export { Plugin };
//# sourceMappingURL=Plugin.js.map