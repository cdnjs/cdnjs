/**
 * @module ol/Disposable
 */
/**
 * @classdesc
 * Objects that need to clean up after themselves.
 */
var Disposable = /** @class */ (function () {
    function Disposable() {
        /**
         * The object has already been disposed.
         * @type {boolean}
         * @private
         */
        this.disposed_ = false;
    }
    /**
     * Clean up.
     */
    Disposable.prototype.dispose = function () {
        if (!this.disposed_) {
            this.disposed_ = true;
            this.disposeInternal();
        }
    };
    /**
     * Extension point for disposable objects.
     * @protected
     */
    Disposable.prototype.disposeInternal = function () { };
    return Disposable;
}());
export default Disposable;
//# sourceMappingURL=Disposable.js.map