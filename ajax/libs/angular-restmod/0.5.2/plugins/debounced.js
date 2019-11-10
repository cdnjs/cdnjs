/**
 * API Bound Models for AngularJS
 * @version v0.5.2 - 2013-11-08
 * @link https://github.com/angular-platanus/restmod
 * @author Ignacio Baixas <iobaixas@gmai.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function(angular, undefined) {
'use strict';
/**
 * @mixin DebouncedModel
 *
 * @description Adds debouncing to `$save` operations so rapid consecutive calls result in only one server request.
 *
 * Usage:
 *
 * First add mixin to a model's mixin chain
 *
 * ```javascript
 * var Bike = $restmod.model('api/bikes', 'DebouncedModel'),
 *     bike = Bike.build({ id: 1, brand: 'Yeti' });
 * ```
 *
 * Then use `$save` as always
 *
 * ```javascript
 * // The following code will just generate 1 request
 * bike.$save();
 * bike.$save();
 * bike.$save();
 * ```
 *
 * Or with options
 *
 * ```javascript
 * bike.$save({ timeout: 0, adjourn: false });
 * // same as
 * bike.$saveNow();
 * ```
 *
 */

var bind = angular.bind,
    isObject = angular.isObject;

angular.module('plRestmod').factory('DebouncedModel', ['$restmod', '$timeout', '$q', function($restmod, $timeout, $q) {

  return $restmod.mixin(function() {
    this.attrIgnored('$dmPromise', true)

        .define('$dmTimeout', 500)
        .define('$dmAdjourn', true)

        /**
         * @method setDebounceOptions
         * @memberOf DebouncedModel
         *
         * @description ModelBuilder extension that allows model debounce configuration.
         *
         * ```javascript
         * $restmod.model(null, function() {
         *   // Sets 1000ms timeout and no rescheduling for this and child models
         *   this.setDebounceOptions({ timeout: 1000, adjourn: false });
         * });
         * ```
         *
         * @param  {object} _opt Debouncing options:
         * * timeout: sets the debounce timeout, if 0 then debouncing is deactivated.
         * * adjourn: if true, then save operation is rescheduled on every $save call.
         *
         * @return {ModelBuilder} self
         */
        .extend('setDebounceOptions', function(_opt) {
          if(_opt.timeout !== undefined) this.define('$dmTimeout', _opt.timeout);
          if(_opt.adjourn !== undefined) this.define('$dmAdjourn', _opt.adjourn);
          return this;
        })

        /**
         * @method $save
         * @memberOf DebouncedModel
         *
         * @description Debounced `$save` implementation
         *
         * @param {object} _opt Same as `setDebounceOptions` options.
         * @return {Model} self
         */
        .define('$save', function(_opt) {

          var timeout = this.$dmTimeout,
              adjourn = this.$dmAdjourn;

          // apply configuration overrides
          if(_opt !== undefined) {
            if(isObject(_opt)) {
              if(_opt.timeout !== undefined) timeout = _opt.timeout;
              if(_opt.adjourn !== undefined) adjourn = _opt.adjourn;
            }
          }

          if(this.$dmPromise) {
            if(!adjourn) return this; // if adjourn mode is deactivated, just wait for queued save operation to be executed.
            $timeout.cancel(this.$dmPromise);
            this.$dmPromise = null;
          }

          // If timeout is set to 0, then just call save.
          if(!timeout) return this.$super();

          var promise = $q.defer(),
              $super = this.$super, // super is only available during the function execution, so it must be cached
              self = this;

          function asyncSave() {
            $super.call(self).$then(
              bind(promise, promise.resolve),
              bind(promise, promise.reject)
            );

            self.$dmPromise = null;
          }

          this.$dmPromise = $timeout(asyncSave, timeout);
          // TODO: if timeout.cancel is called, this promise is never resolved
          this.$promise = promise; // update last promise prop.
          return this;
        })

        /**
         * @method $saveNow
         * @memberOf DebouncedModel
         *
         * @description Convenience method that will cancel any pending save and save inmediatelly.
         *
         * @return {Model} self
         */
        .define('$saveNow', function() {
          return this.$save({ timeout: 0, adjourn: true });
        });
  });
}]);})(angular);