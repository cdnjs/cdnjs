/**
 * @module ol/Disposable
 */
import {UNDEFINED} from './functions.js';

/**
 * @classdesc
 * Objects that need to clean up after themselves.
 */
var Disposable = function Disposable () {};

Disposable.prototype.dispose = function dispose () {
  if (!this.disposed_) {
    this.disposed_ = true;
    this.disposeInternal();
  }
};

/**
 * The object has already been disposed.
 * @type {boolean}
 * @private
 */
Disposable.prototype.disposed_ = false;

/**
 * Extension point for disposable objects.
 * @protected
 */
Disposable.prototype.disposeInternal = UNDEFINED;
export default Disposable;

//# sourceMappingURL=Disposable.js.map