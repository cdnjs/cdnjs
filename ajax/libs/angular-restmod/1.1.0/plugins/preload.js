/**
 * API Bound Models for AngularJS
 * @version v1.1.0 - 2014-09-23
 * @link https://github.com/angular-platanus/restmod
 * @author Ignacio Baixas <ignacio@platan.us>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function(angular, undefined) {
'use strict';
/**
 * @mixin Preload
 *
 * @description Provides relation eager loading via the `Resource.$preload` method.
 */

angular.module('restmod').factory('restmod.Preload', ['restmod', '$q', function(restmod, $q) {

  // simple populate implementation for models that do not provide a $populate function
  function populate(_records) {
    var promises = [];
    for(var i = 0; i < _records.length; i++) {
      promises.push(_records[i].$resolve().$asPromise());
    }
    return $q.all(promises);
  }

  // processes a group records of the same type
  function processGroup(_records, _target) {

    // extract targets
    var targets = [], record;
    for(var i = 0, l = _records.length; i < l; i++) {
      record = _records[i][_target];
      if(angular.isArray(record)) {
        targets.push.apply(targets, record);
      } else if(record) {
        targets.push(record);
      }
    }

    // populate targets
    if(targets.length > 0) {
      var promise = typeof targets[0].$type.$populate === 'function' ?
        targets[0].$type.$populate(targets).$asPromise() :
        populate(targets);

      if(promise) {
        return promise.then(function() {
          return targets;
        });
      }
    }

    return $q.when(targets);
  }

  // helper factory that binds processGroup to a target.
  function processGroupAsync(_target) {
    return function(_records) {
      return processGroup(_records, _target);
    };
  }

  return restmod.mixin(function() {

    /**
     * @method Resource.$preload
     * @memberOf Preload
     *
     * @description Preloads a resource's relations
     *
     * The method receives a list of relation names to preload, it also
     * handles nested relation names. If a nested relation is added to be resolved
     * then the parent relation is also resolved.
     *
     * Usage:
     *
     * ```javascript
     * Bike.$search({ category: 'xc' }).$preload('user', 'parts.maker'); // this will also resolve 'parts'
     * ```
     *
     * Preload will attempt to use the target model's `$populate` method, if not found it will fallback to
     * simple resolving. Take a look at the Populate plugin for a $populate implementation using special
     * API support.
     *
     * @param {array} arguments Relations to preload.
     * @return {Resource} self
     */
    this.define('Resource.$preload', function(/* _targets */) {
      var targets = arguments;
      return this.$always(function() {

        var targetCache = {},
            targetPromises = [],
            initialGroup = this.$isCollection ? this : [this],
            parent, name, fullName, tailPromise;

        for(var i = 0; i < targets.length; i++) {
          var target = targets[i];
          if(targetCache[target]) continue; // already preloaded

          parent = '';
          target = target.split('.');
          tailPromise = null;

          for(var j = 0; j < target.length; j++) {
            name = target[j];
            fullName = parent + '.' + name;

            if(!targetCache[fullName]) {
              if(tailPromise) {
                // queue after parent request
                tailPromise = tailPromise.then(processGroupAsync(name));
              } else {
                // execute immediately
                tailPromise = processGroup(initialGroup, name);
              }

              targetCache[fullName] = tailPromise;
            } else {
              tailPromise = targetCache[fullName];
            }
          }

          targetPromises.push(tailPromise);
        }

        // wait for every promise chain to be resolved.
        return $q.all(targetPromises);
      });
    });
  });
}]);})(angular);