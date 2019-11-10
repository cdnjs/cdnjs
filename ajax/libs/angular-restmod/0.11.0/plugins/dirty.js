/**
 * API Bound Models for AngularJS
 * @version v0.11.0 - 2014-01-22
 * @link https://github.com/angular-platanus/restmod
 * @author Ignacio Baixas <iobaixas@gmai.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function(angular, undefined) {
'use strict';
/**
 * @mixin DirtyModel
 *
 * @description Adds the `$dirty` method to a model`s instances.
 */

angular.module('plRestmod').factory('DirtyModel', ['$restmod', 'SyncMask', function($restmod, SyncMask) {

  return $restmod.mixin(function() {
    this.attrMask('$cmStatus', SyncMask.SYSTEM_ALL) // make special property ignored and system like
        .on('after-feed', function(_original) {
          // store original information in a model's special property
          var original = this.$cmStatus = {};
          this.$each(function(_value, _key) {
            original[_key] = _value;
          });
        })
        /**
         * @method $dirty
         * @memberof DirtyModel#
         *
         * @description Retrieves the model changes
         *
         * Property changes are determined using the strict equality operator.
         *
         * IDEA: allow changing the equality function per attribute.
         *
         * If given a property name, this method will return true if property has changed
         * or false if it has not.
         *
         * Called without arguments, this method will return a list of changed property names.
         *
         * @param {string} _prop Property to query
         * @return {boolean|array} Property state or array of changed properties
         */
        .define('$dirty', function(_prop) {
          var original = this.$cmStatus;
          if(_prop) {
            if(!original || original[_prop] === undefined) return false;
            return original[_prop] !== this[_prop];
          } else {
            var changes = [], key;
            if(original) {
              for(key in original) {
                if(original.hasOwnProperty(key) && original[key] !== this[key]) {
                  changes.push(key);
                }
              }
            }
            return changes;
          }
        })
        /**
         * @method $restore
         * @memberof DirtyModel#
         *
         * @description Restores the model's last fetched values.
         *
         * Usage:
         *
         * ```javascript
         * bike = Bike.$create({ brand: 'Trek' });
         * // later on...
         * bike.brand = 'Giant';
         * bike.$restore();
         *
         * console.log(bike.brand); // outputs 'Trek'
         * ```
         *
         * @param {string} _prop If provided, only _prop is restored
         * @return {Model} self
         */
        .define('$restore', function(_prop) {
          var original = this.$cmStatus;
          if(_prop) {
            this[_prop] = original[_prop];
          } else {
            for(var key in original) {
              if(original.hasOwnProperty(key)) this[key] = original[key];
            }
          }
          return this;
        });
  });
}]);})(angular);