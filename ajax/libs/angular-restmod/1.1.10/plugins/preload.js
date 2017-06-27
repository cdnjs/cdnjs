/**
 * API Bound Models for AngularJS
 * @version v1.1.10 - 2015-10-24
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
  function populate(_records, _params) {
    var promises = [];
    for(var i = 0; i < _records.length; i++) {
      promises.push(_records[i].$resolve(_params).$asPromise());
    }
    return $q.all(promises);
  }

  // processes a group records of the same type
  function processGroup(_records, _target, _params) {

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
        targets[0].$type.$populate(targets, _params).$asPromise() :
        populate(targets, _params);

      if(promise) {
        return promise.then(function() {
          return targets;
        });
      }
    }

    return $q.when(targets);
  }

  // helper factory that binds processGroup to a target.
  function processGroupAsync(_target, _params) {
    return function(_records) {
      return processGroup(_records, _target, _params);
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
     * **IMPORTANT**: Only `belongsTo` and `belongsToMany` relations can be preloaded.
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
     * It is also posible to specify some query parameters to be passed to the $populate/$resolve methods
     * using an extended form:
     *
     * ```javascript
     * Bike.$search({ category: 'xc' }).$preload(
     *   'user',
     *   { path 'parts', params: { include: 'maker' } }, // path is the relation name and params the parameters
     * );
     * ```
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
          var target = targets[i], params;

          if(typeof target === 'object') {
            params = target.params;
            target = target.path;
          }

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
                tailPromise = tailPromise.then(processGroupAsync(name, params));
              } else {
                // execute immediately
                tailPromise = processGroup(initialGroup, name, params);
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