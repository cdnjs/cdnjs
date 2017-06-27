/**
 * API Bound Models for AngularJS
 * @version v1.1.6 - 2015-01-06
 * @link https://github.com/angular-platanus/restmod
 * @author Ignacio Baixas <ignacio@platan.us>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function(angular, undefined) {
'use strict';
/**
 * @mixin NestedDirtyModel
 *
 * @description Adds the `$dirty` method to a model`s instances. Acts in the same way as the DirtyModel plugin, but supports nested objects.
 */

angular.module('restmod').factory('NestedDirtyModel', ['restmod', function(restmod) {

  function isPlainObject(_val) {
    return angular.isObject(_val) && !angular.isArray(_val);
  }

  function copyOriginalData(_from) {
    var Model = _from.$type, result = {};

    _from.$each(function(value, key) {
      var meta = Model.$$getDescription(key);
      if(!meta || !meta.relation) {
        // TODO: skip masked properties too?
        result[key] = angular.copy(value);
      }
    });

    return result;
  }

  function navigate(_target, _keys) {
    var key, i = 0;
    while((key = _keys[i++])) {
      if(_target) {
        _target = _target.hasOwnProperty(key) ? _target[key] : null;
      }
    }
    return _target;
  }

  function hasValueChanged(_model, _original, _keys, _comparator) {
    var prop = _keys.pop();

    _model = navigate(_model, _keys);
    _original = navigate(_original, _keys);

    if(angular.isObject(_original) && angular.isObject(_model) && _original.hasOwnProperty(prop)) {
      if(typeof _comparator === 'function') {
        return !!_comparator(_model[prop], _original[prop]);
      } else {
        return !angular.equals(_model[prop], _original[prop]);
      }
    }

    return false;
  }

  function findChangedValues(_model, _original, _keys, _comparator) {
    var changes = [], childChanges;

    if(_original) {
      for(var key in _original) {
        if(_original.hasOwnProperty(key)) {
          if(isPlainObject(_original[key]) && isPlainObject(_model[key])) {
            childChanges = findChangedValues(_model[key], _original[key], _keys.concat([key]), _comparator);
            changes.push.apply(changes, childChanges);
          } else if(hasValueChanged(_model, _original, [key], _comparator)) {
            changes.push(_keys.concat([key]));
          }
        }
      }
    }

    return changes;
  }

  function changesAsStrings(_changes) {
    for(var i = 0, l = _changes.length; i < l; i++) {
      _changes[i] = _changes[i].join('.');
    }
    return _changes;
  }

  function restoreValue(_model, _original, _keys) {
    var prop = _keys.pop();
    _model = navigate(_model, _keys);
    _original = navigate(_original, _keys);

    if(_original && _model && _original.hasOwnProperty(prop)) {
      _model[prop] = angular.copy(_original[prop]);
    }
  }

  return restmod.mixin(function() {
    this.on('after-feed', function() {
          // store original information in a model's special property
          this.$cmStatus = copyOriginalData(this);
        })
        /**
         * @method $dirty
         * @memberof NestedDirtyModel#
         *
         * @description Retrieves the model changes
         *
         * Property changes are determined using the strict equality operator if no comparator
         * function is provided.
         *
         * If given a property name, this method will return true if property has changed
         * or false if it has not.
         *
         * The comparator function can be passed either as the first or second parameter.
         * If first, this function will compare all properties using the comparator.
         *
         * Called without arguments, this method will return a list of changed property names.
         *
         * @param {string|function} _prop Property to query or function to compare all properties
         * @param {function} _comparator Function to compare property
         * @return {boolean|array} Property state or array of changed properties
         */
        .define('$dirty', function(_prop, _comparator) {
          var original = this.$cmStatus;

          if(_prop && !angular.isFunction(_prop)) {
            return hasValueChanged(this, original, _prop.split('.'), _comparator);
          } else {
            if(angular.isFunction(_prop)) _comparator = _prop;
            return changesAsStrings(findChangedValues(this, original, [], _comparator));
          }
        })
        /**
         * @method $restore
         * @memberof NestedDirtyModel#
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
          return this.$action(function() {
            var original = this.$cmStatus;

            if(_prop) {
              var keys = _prop.split('.');
              restoreValue(this, original, keys);
            } else {
              var changes = findChangedValues(this, original, []);
              for(var i = 0, l = changes.length; i < l; i++) {
                restoreValue(this, original, changes[i]);
              }
            }
          });
        });
  });
}]);})(angular);