/**
 * angular-permission
 * Route permission and access control as simple as it can get
 * @version v2.1.2 - 2016-03-06
 * @link http://www.rafaelvidaurre.com
 * @author Rafael Vidaurre <narzerus@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function () {
  'use strict';

  var permission = angular.module('permission', ['ui.router']);

  /**
   * This decorator is required to access full state object instead of it's configuration
   * when trying to obtain full toState state object not it's configuration
   * Can be removed when implemented https://github.com/angular-ui/ui-router/issues/13.
   */
  permission.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.decorator('parent', function (state, parentFn) {
      state.self.getState = function () {
        return state;
      };
      return parentFn(state);
    });
  }]);

  permission.run(['$rootScope', '$state', '$q', 'Authorization', 'PermissionMap', function ($rootScope, $state, $q, Authorization, PermissionMap) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {

      if (!isAuthorizationFinished() && areSetStatePermissions(toState)) {
        event.preventDefault();
        setStateAuthorizationStatus(true);

        if (!areStateEventsDefaultPrevented()) {
          var compensatedPermissionMap = compensatePermissionMap(toState.data.permissions);
          authorizeForState(compensatedPermissionMap);
        }
      }

      /**
       * Checks if state is qualified to be permission based verified
       *
       * @returns {boolean}
       */
      function areSetStatePermissions(state) {
        return angular.isDefined(state.data) && angular.isDefined(state.data.permissions);
      }

      /**
       * Sets internal state `$$finishedAuthorization` variable to prevent looping
       *
       * @param status {boolean} When true authorization has been already preceded
       */
      function setStateAuthorizationStatus(status) {
        angular.extend(toState, {'$$isAuthorizationFinished': status});
      }


      /**
       * Checks if state has been already checked for authorization
       *
       * @returns {boolean}
       */
      function isAuthorizationFinished() {
        return toState.$$isAuthorizationFinished;
      }

      /**
       * Checks if state events are not prevented by default
       *
       * @returns {boolean}
       */
      function areStateEventsDefaultPrevented() {
        return isStateChangePermissionStartDefaultPrevented() || isStateChangeStartDefaultPrevented();
      }

      /**
       * Builds map of permissions resolving passed values to data.permissions and combine them with all its parents
       * keeping the order of permissions from the newest (children) to the oldest (parent)
       *
       * @param statePermissionMap {Object} Current state permission map
       * @returns {PermissionMap} Permission map
       */
      function compensatePermissionMap(statePermissionMap) {
        var permissionMap = new PermissionMap({redirectTo: statePermissionMap.redirectTo});

        var toStatePath = $state
          .get(toState.name)
          .getState().path
          .slice()
          .reverse();

        angular.forEach(toStatePath, function (state) {
          if (areSetStatePermissions(state)) {
            permissionMap.extendPermissionMap(new PermissionMap(state.data.permissions));
          }
        });

        return permissionMap;
      }

      /**
       * Handles state authorization
       *
       * @param permissions {PermissionMap} Map of permission names
       */
      function authorizeForState(permissions) {
        Authorization
          .authorize(permissions, toParams)
          .then(function () {
            $rootScope.$broadcast('$stateChangePermissionAccepted', toState, toParams, options);

            $state
              .go(toState.name, toParams, {notify: false})
              .then(function () {
                $rootScope.$broadcast('$stateChangeSuccess', toState, toParams);
              });
          })
          .catch(function (rejectedPermission) {
            $rootScope.$broadcast('$stateChangePermissionDenied', toState, toParams, options);

            return permissions
              .resolveRedirectState(rejectedPermission)
              .then(function (redirectStateName) {
                $state.go(redirectStateName, toParams);
              });
          })
          .finally(function () {
            setStateAuthorizationStatus(false);
            $rootScope.$broadcast('$stateChangeSuccess');
          });
      }

      /**
       * Checks if event $stateChangeStart hasn't been disabled by default
       *
       * @returns {boolean}
       */
      function isStateChangeStartDefaultPrevented() {
        return $rootScope.$broadcast('$stateChangeStart', toState, toParams, fromState, fromParams, options).defaultPrevented;
      }

      /**
       * Checks if event $stateChangePermissionStart hasn't been disabled by default
       *
       * @returns {boolean}
       */
      function isStateChangePermissionStartDefaultPrevented() {
        return $rootScope.$broadcast('$stateChangePermissionStart', toState, toParams, options).defaultPrevented;
      }
    });
  }]);
}());


(function () {
  'use strict';

  angular
    .module('permission')
    .factory('PermissionMap', ['$q', function ($q) {

      /**
       * Constructs map object instructing authorization service how to handle authorizing
       *
       * @param permissionMap {Object} Map of permissions provided to authorization service
       * @param permissionMap.only {Array} List of exclusive permission/role names allowed for authorization
       * @param permissionMap.except {Array} List of exclusive permission/role names denied for authorization
       * @param permissionMap.redirectTo {String|Function|Object|promise} Handling redirection when rejected
       *   authorization
       * @param [toState] {Object} UI-Router transition state object
       * @param [toParams] {Object} UI-Router transition state params
       * @param [options] {Object} UI-Router transition state options
       * @constructor
       */
      function PermissionMap(permissionMap, toState, toParams, options) {
        this.only = resolvePermissionMapProperty(permissionMap.only, toState, toParams, options);
        this.except = resolvePermissionMapProperty(permissionMap.except, toState, toParams, options);
        this.redirectTo = permissionMap.redirectTo;
      }

      /**
       * Extends permission map by pushing to it state's permissions
       *
       * @param permissionMap {PermissionMap} Compensated permission map
       */
      PermissionMap.prototype.extendPermissionMap = function (permissionMap) {
        this.only = this.only.concat(permissionMap.only);
        this.except = this.except.concat(permissionMap.except);
      };

      /**
       * Redirects to fallback states when permissions fail
       *
       * @param rejectedPermissionName {String} Permission name
       *
       * @return {Promise}
       */
      PermissionMap.prototype.resolveRedirectState = function (rejectedPermissionName) {
        if (angular.isFunction(this.redirectTo)) {
          return resolveFunctionRedirect(this.redirectTo, rejectedPermissionName);
        }

        if (angular.isObject(this.redirectTo)) {
          return resolveObjectRedirect(this.redirectTo, rejectedPermissionName);
        }

        if (angular.isString(this.redirectTo)) {
          return $q.resolve(this.redirectTo);
        }

        // If redirectTo state is not defined stay where you are
        return $q.reject(null);
      };

      /**
       * Handles function based redirection for rejected permissions
       *
       * @param redirectFunction {Function} Redirection function
       * @param permission {String} Rejected permission
       *
       * @return {Promise}
       */
      function resolveFunctionRedirect(redirectFunction, permission) {
        return $q
          .when(redirectFunction.call(null, permission))
          .then(function (redirectState) {
            if (!angular.isString(redirectState)) {
              throw new TypeError('When used "redirectTo" as function, returned value must be string with state name');
            }
            return redirectState;
          });
      }

      /**
       * Handles object based redirection for rejected permissions
       *
       * @param redirectObject {Object} Redirection function
       * @param permission {String} Rejected permission
       *
       * @return {Promise}
       */
      function resolveObjectRedirect(redirectObject, permission) {
        if (!angular.isDefined(redirectObject['default'])) {
          throw new ReferenceError('When used "redirectTo" as object, property "default" must be defined');
        }

        var redirectState = redirectObject[permission];

        if (!angular.isDefined(redirectState)) {
          redirectState = redirectObject['default'];
        }

        if (angular.isFunction(redirectState)) {
          return resolveFunctionRedirect(redirectState, permission);
        }

        if (angular.isString(redirectState)) {
          return $q.resolve(redirectState);
        }
      }

      /**
       * Handles extraction of permission map "only" and "except" properties
       * @private
       *
       * @param property {Array|Function|promise} Permission map property "only" or "except"
       * @param [toState] {Object} UI-Router transition state object
       * @param [toParams] {Object} UI-Router transition state params
       * @param [options] {Object} UI-Router transition state options
       *
       * @returns {Array} Array of permission "only" or "except" names
       */
      function resolvePermissionMapProperty(property, toState, toParams, options) {
        if (angular.isString(property)) {
          return [property];
        }

        if (angular.isArray(property)) {
          return property;
        }

        if (angular.isFunction(property)) {
          return property.call(null, toState, toParams, options);
        }

        return [];
      }

      return PermissionMap;
    }]);
}());

(function () {
  'use strict';

  angular
    .module('permission')
    .factory('Permission', ['$q', function ($q) {

      /**
       * Permission definition object constructor
       *
       * @param permissionName {String} Name repressing permission
       * @param validationFunction {Function} Function used to check if permission is valid
       * @constructor
       */
      function Permission(permissionName, validationFunction) {
        validateConstructor(permissionName, validationFunction);

        this.permissionName = permissionName;
        this.validationFunction = validationFunction;
      }

      /**
       * Checks if permission is still valid
       *
       * @param toParams {Object} UI-Router params object
       * @returns {Promise}
       */
      Permission.prototype.validatePermission = function (toParams) {
        var validationResult = this.validationFunction.call(null, toParams, this.permissionName);

        if (!angular.isFunction(validationResult.then)) {
          validationResult = wrapInPromise(validationResult, this.permissionName);
        }

        return validationResult;
      };

      /**
       * Converts a value into a promise, if the value is truthy it resolves it, otherwise it rejects it
       * @private
       *
       * @param result {Boolean} Function to be wrapped into promise
       * @param permissionName {String} Returned value in promise
       * @return {Promise}
       */
      function wrapInPromise(result, permissionName) {
        var dfd = $q.defer();

        if (result) {
          dfd.resolve(permissionName);
        } else {
          dfd.reject(permissionName);
        }

        return dfd.promise;
      }

      /**
       * Checks if provided permission has accepted parameter types
       * @private
       */
      function validateConstructor(permissionName, validationFunction) {
        if (!angular.isString(permissionName)) {
          throw new TypeError('Parameter "permissionName" name must be String');
        }
        if (!angular.isFunction(validationFunction)) {
          throw new TypeError('Parameter "validationFunction" must be Function');
        }
      }

      return Permission;
    }]);
}());

(function () {
  'use strict';

  angular
    .module('permission')
    .factory('Role', ['$q', 'PermissionStore', function ($q, PermissionStore) {

      /**
       * Role definition constructor
       *
       * @param roleName {String} Name representing role
       * @param permissionNames {Array} List of permission names representing role
       * @param [validationFunction] {Function} Optional function used to validate if permissions are still valid
       * @constructor
       */
      function Role(roleName, permissionNames, validationFunction) {
        validateConstructor(roleName, permissionNames, validationFunction);
        this.roleName = roleName;
        this.permissionNames = permissionNames || [];
        this.validationFunction = validationFunction;

        if (validationFunction) {
          PermissionStore.defineManyPermissions(permissionNames, validationFunction);
        }
      }

      /**
       * Checks if role is still valid
       *
       * @param [toParams] {Object} UI-Router params object
       * @returns {Promise} $q.promise object
       */
      Role.prototype.validateRole = function (toParams) {

        // When set permissions is provided check each of them
        if (this.permissionNames.length) {
          var promises = this.permissionNames.map(function (permissionName) {
            if (PermissionStore.hasPermissionDefinition(permissionName)) {
              var permission = PermissionStore.getPermissionDefinition(permissionName);
              var validationResult = permission.validationFunction.call(null, toParams, permission.permissionName);

              if (!angular.isFunction(validationResult.then)) {
                validationResult = wrapInPromise(validationResult);
              }

              return validationResult;
            }

            return $q.reject(null);
          });

          return $q.all(promises);
        }

        // If not call validation function manually
        var validationResult = this.validationFunction.call(null, toParams, this.roleName);
        if (!angular.isFunction(validationResult.then)) {
          validationResult = wrapInPromise(validationResult, this.roleName);
        }

        return $q.resolve(validationResult);

      };

      /**
       * Converts a value into a promise, if the value is truthy it resolves it, otherwise it rejects it
       * @private
       *
       * @param result {Boolean} Function to be wrapped into promise
       * @param roleName {String} Returned value in promise
       * @return {Promise}
       */
      function wrapInPromise(result, roleName) {
        var dfd = $q.defer();

        if (result) {
          dfd.resolve(roleName);
        } else {
          dfd.reject(roleName);
        }

        return dfd.promise;
      }

      /**
       * Checks if provided permission has accepted parameter types
       * @private
       */
      function validateConstructor(roleName, permissionNames, validationFunction) {
        if (!angular.isString(roleName)) {
          throw new TypeError('Parameter "roleName" name must be String');
        }

        if (!angular.isArray(permissionNames)) {
          throw new TypeError('Parameter "permissionNames" must be Array');
        }

        if (!permissionNames.length && !angular.isFunction(validationFunction)) {
          throw new TypeError('Parameter "validationFunction" must be provided for empty "permissionNames" array');
        }
      }

      return Role;
    }]);
}());

(function () {
  'use strict';

  angular
    .module('permission')
    .service('PermissionStore', ['Permission', function (Permission) {
      var permissionStore = {};

      this.definePermission = definePermission;
      this.defineManyPermissions = defineManyPermissions;
      this.removePermissionDefinition = removePermissionDefinition;
      this.hasPermissionDefinition = hasPermissionDefinition;
      this.getPermissionDefinition = getPermissionDefinition;
      this.getStore = getStore;
      this.clearStore = clearStore;

      /**
       * Allows to define permission on application configuration
       *
       * @param permissionName {String} Name of defined permission
       * @param validationFunction {Function} Function used to validate if permission is valid
       */
      function definePermission(permissionName, validationFunction) {
        permissionStore[permissionName] = new Permission(permissionName, validationFunction);
      }

      /**
       * Allows to define set of permissionNames with shared validation function on application configuration
       *
       * @param permissionNames {Array} Set of permission names
       * @param validationFunction {Function} Function used to validate if permission is valid
       */
      function defineManyPermissions(permissionNames, validationFunction) {
        if (!angular.isArray(permissionNames)) {
          throw new TypeError('Parameter "permissionNames" name must be Array');
        }

        angular.forEach(permissionNames, function (permissionName) {
          definePermission(permissionName, validationFunction);
        });
      }

      /**
       * Deletes permission
       *
       * @param permissionName {String} Name of defined permission
       */
      function removePermissionDefinition(permissionName) {
        delete permissionStore[permissionName];
      }

      /**
       * Checks if permission exists
       *
       * @param permissionName {String} Name of defined permission
       * @returns {Boolean}
       */
      function hasPermissionDefinition(permissionName) {
        return angular.isDefined(permissionStore[permissionName]);
      }

      /**
       * Returns permission by it's name
       *
       * @returns {Object} Permissions collection
       */
      function getPermissionDefinition(permissionName) {
        return permissionStore[permissionName];
      }

      /**
       * Returns all permissions
       *
       * @returns {Object} Permissions collection
       */
      function getStore() {
        return permissionStore;
      }

      /**
       * Removes all permissions
       */
      function clearStore() {
        permissionStore = {};
      }
    }]);
}());

(function () {
  'use strict';

  angular
    .module('permission')
    .service('RoleStore', ['Role', function (Role) {
      var roleStore = {};

      this.defineRole = defineRole;
      this.getRoleDefinition = getRoleDefinition;
      this.hasRoleDefinition = hasRoleDefinition;
      this.removeRoleDefinition = removeRoleDefinition;
      this.getStore = getStore;
      this.clearStore = clearStore;

      /**
       * Allows to define role
       *
       * @param roleName {String} Name of defined role
       * @param permissions {Array} Set of permission names
       * @param [validationFunction] {Function} Function used to validate if permissions in role are valid
       */
      function defineRole(roleName, permissions, validationFunction) {
        roleStore[roleName] = new Role(roleName, permissions, validationFunction);
      }

      /**
       * Deletes role from store
       *
       * @param roleName {String} Name of defined permission
       */
      function removeRoleDefinition(roleName) {
        delete roleStore[roleName];
      }

      /**
       * Checks if role is defined in store
       *
       * @param roleName {String} Name of role
       * @returns {Boolean}
       */
      function hasRoleDefinition(roleName) {
        return angular.isDefined(roleStore[roleName]);
      }

      /**
       * Returns role definition object by it's name
       *
       * @returns {Object} Role definition object
       */
      function getRoleDefinition(roleName) {
        return roleStore[roleName];
      }

      /**
       * Returns all role definitions
       *
       * @returns {Object} Defined roles collection
       */
      function getStore() {
        return roleStore;
      }

      /**
       * Removes all role definitions
       */
      function clearStore() {
        roleStore = {};
      }
    }]);
}());

(function () {
  'use strict';

  /**
   * Show/hide elements based on provided permissions/roles
   *
   * @example
   * <div permission only="'USER'"></div>
   * <div permission only="['USER','ADMIN']" except="'MANAGER'"></div>
   * <div permission except="'MANAGER'"></div>
   */
  angular
    .module('permission')
    .directive('permission', ['$log', 'Authorization', 'PermissionMap', function ($log, Authorization, PermissionMap) {
      return {
        restrict: 'A',
        scope: true,
        bindToController: {
          only: '=',
          except: '='
        },
        controllerAs: 'permission',
        controller: ['$scope', '$element', function ($scope, $element) {
          var permission = this;

          $scope.$watchGroup(['permission.only', 'permission.except'],
            function () {
              try {
                Authorization
                  .authorize(new PermissionMap({
                    only: permission.only,
                    except: permission.except
                  }), null)
                  .then(function () {
                    $element.removeClass('ng-hide');
                  })
                  .catch(function () {
                    $element.addClass('ng-hide');
                  });
              } catch (e) {
                $element.addClass('ng-hide');
                $log.error(e.message);
              }
            });
        }]
      };
    }]);
}());


(function () {
  'use strict';

  angular
    .module('permission')
    .service('Authorization', ['$q', 'PermissionMap', 'PermissionStore', 'RoleStore', function ($q, PermissionMap, PermissionStore, RoleStore) {
      this.authorize = authorize;

      /**
       * Checks if provided permissions are acceptable
       *
       * @param permissionsMap {PermissionMap} Map of permission names
       * @param [toParams] {Object} UI-Router params object
       * @returns {promise} $q.promise object
       */
      function authorize(permissionsMap, toParams) {
        return handleAuthorization(permissionsMap, toParams);
      }

      /**
       * Handles authorization based on provided permissions map
       * @private
       *
       * @param permissionsMap {Object} Map of permission names
       * @param toParams {Object} UI-Router params object
       * @returns {promise} $q.promise object
       */
      function handleAuthorization(permissionsMap, toParams) {
        var deferred = $q.defer();

        var exceptPromises = findMatchingPermissions(permissionsMap.except, toParams);

        only(exceptPromises)
          .then(function (rejectedPermissions) {
            deferred.reject(rejectedPermissions);
          })
          .catch(function () {
            if (!permissionsMap.only.length) {
              deferred.resolve(null);
            }

            var onlyPromises = findMatchingPermissions(permissionsMap.only, toParams);

            only(onlyPromises)
              .then(function (resolvedPermissions) {
                deferred.resolve(resolvedPermissions);
              })
              .catch(function (rejectedPermission) {
                deferred.reject(rejectedPermission);
              });
          });

        return deferred.promise;
      }

      /**
       * Implementation of missing $q `only` method that wits for first
       * resolution of provided promise set.
       * @private
       *
       * @param promises {Array|promise} Single or set of promises
       * @returns {Promise} Returns a single promise that will be rejected with an array/hash of values,
       *  each value corresponding to the promise at the same index/key in the `promises` array/hash.
       *  If any of the promises is resolved, this resulting promise will be returned
       *  with the same resolution value.
       */
      function only(promises) {
        var deferred = $q.defer(),
          counter = 0,
          results = angular.isArray(promises) ? [] : {};

        angular.forEach(promises, function (promise, key) {
          counter++;
          $q.when(promise)
            .then(function (value) {
              if (results.hasOwnProperty(key)) {
                return;
              }
              deferred.resolve(value);
            })
            .catch(function (reason) {
              if (results.hasOwnProperty(key)) {
                return;
              }
              results[key] = reason;
              if (!(--counter)) {
                deferred.reject(reason);
              }
            });
        });

        if (counter === 0) {
          deferred.reject(results);
        }

        return deferred.promise;
      }

      /**
       * Performs iteration over list of defined permissions looking for matches
       * @private
       *
       * @param permissionNames {Array} Set of permission names
       * @param toParams {Object} UI-Router params object
       * @returns {Array} Promise collection
       */
      function findMatchingPermissions(permissionNames, toParams) {
        return permissionNames.map(function (permissionName) {
            if (RoleStore.hasRoleDefinition(permissionName)) {
              var role = RoleStore.getRoleDefinition(permissionName);
              return role.validateRole(toParams);
            }

            if (PermissionStore.hasPermissionDefinition(permissionName)) {
              var permission = PermissionStore.getPermissionDefinition(permissionName);
              return permission.validatePermission(toParams);
            }

            if (permissionName) {
              return $q.reject(permissionName);
            }
          });
      }
    }]);
})();
