/**
 * angular-permission
 * Fully featured role and permission based access control for your angular applications
 * @version v4.0.3 - 2016-08-18
 * @link https://github.com/Narzerus/angular-permission
 * @author Rafael Vidaurre <narzerus@gmail.com> (http://www.rafaelvidaurre.com), Blazej Krysiak <blazej.krysiak@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function (window, angular, undefined) {
  'use strict';

  /**
   * @namespace permission
   */

  $q.$inject = ['$delegate'];
  PermPermission.$inject = ['$q', 'PermTransitionProperties'];
  PermRole.$inject = ['$q', 'PermPermissionStore', 'PermTransitionProperties'];
  PermPermissionStore.$inject = ['PermPermission'];
  PermRoleStore.$inject = ['PermRole'];
  PermissionDirective.$inject = ['$log', '$injector', 'PermPermissionMap', 'PermPermissionStrategies'];
  PermAuthorization.$inject = ['$q'];
  PermPermissionMap.$inject = ['$q', 'PermTransitionProperties', 'PermRoleStore', 'PermPermissionStore'];
  var permission = angular.module('permission', []);

  if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
    module.exports = permission.name;
  }

  /**
   * Extends $q implementation by A+ *any* method
   * @name permission.$q
   *
   * @extends {angular.$q}
   *
   * @param $delegate {Object} Parent instance being extended
   */
  function $q($delegate) {
    'ngInject';

    $delegate.any = any;

    /**
     * Implementation of missing $q `any` method that wits for first resolution of provided promise set
     * @methodOf permission.$q
     *
     * @param promises {Array|promise} Single or set of promises
     *
     * @returns {Promise} Returns a single promise that will be rejected with an array/hash of values,
     *  each value corresponding to the promise at the same index/key in the `promises` array/hash.
     *  If any of the promises is resolved, this resulting promise will be returned
     *  with the same resolution value.
     */
    function any(promises) {
      var deferred = $delegate.defer(),
        counter = 0,
        results = angular.isArray(promises) ? [] : {};

      angular.forEach(promises, function (promise, key) {
        counter++;
        $delegate
          .when(promise)
          .then(function (value) {
            deferred.resolve(value);
          })
          .catch(function (reason) {
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

    return $delegate;
  }

  angular
    .module('permission')
    .decorator('$q', $q);


  /**
   * Pre-defined available configurable behaviours of directive `permission`
   * @name permission.PermPermissionStrategies
   * @readonly
   *
   * @example
   * <div permission
   *      permission-except="'MANAGER'"
   *      permission-on-authorized="PermPermissionStrategies.renderContent"
   *      permission-on-unauthorized="PermPermissionStrategies.removeContent">
   * </div>
   *
   * @property enableElement {Function}
   * @property disableElement {Function}
   * @property showElement {Function}
   * @property hideElement {Function}
   */
  var PermPermissionStrategies = {
    enableElement: function ($element) {
      $element.removeAttr('disabled');
    },
    disableElement: function ($element) {
      $element.attr('disabled', 'disabled');
    },
    showElement: function ($element) {
      $element.removeClass('ng-hide');
    },
    hideElement: function ($element) {
      $element.addClass('ng-hide');
    }
  };

  angular
    .module('permission')
    .value('PermPermissionStrategies', PermPermissionStrategies)
    .value('PermissionStrategies', PermPermissionStrategies);


  /**
   * Helper object used for storing ui-router/ng-route transition parameters
   * @name permission.PermTransitionProperties
   *
   * @type {Object.<String,Object>}
   *
   * Transition properties for ui-router:
   * @property toState {Object} Target state object [ui-router]
   * @property toParams {Object} Target state params [ui-router]
   * @property fromState {Object} Source state object [ui-router]
   * @property fromParams {Object} Source state params [ui-router]
   * @property options {Object} Transition options [ui-router]
   *
   * Transition properties for ng-route:
   * @property current {Object} Current state properties [ng-route]
   * @property next {Object} Next state properties [ng-route]
   */
  var PermTransitionProperties = {};

  angular
    .module('permission')
    .value('PermTransitionProperties', PermTransitionProperties);

  /**
   * Interface responsible for managing and emitting events dependent on router implementation
   * @name permission.PermTransitionEvents
   */
  function PermTransitionEvents() {
    'ngInject';

    this.broadcastPermissionStartEvent = function () {
      throw new Error('Method broadcastPermissionStartEvent in PermTransitionEvents interface must be implemented');
    };

    this.broadcastPermissionAcceptedEvent = function () {
      throw new Error('Method broadcastPermissionAcceptedEvent in PermTransitionEvents interface must be implemented');
    };

    this.broadcastPermissionDeniedEvent = function () {
      throw new Error('Method broadcastPermissionDeniedEvent in PermTransitionEvents interface must be implemented');
    };
  }

  angular
    .module('permission')
    .service('PermTransitionEvents', PermTransitionEvents);


  /**
   * PermPermission definition factory
   * @function
   *
   * @param $q {Object} Angular promise implementation
   * @param PermTransitionProperties {permission.PermTransitionProperties} Helper storing ui-router transition parameters
   *
   * @return {Permission}
   */
  function PermPermission($q, PermTransitionProperties) {
    'ngInject';

    /**
     * PermPermission definition object constructor
     * @constructor Permission
     *
     * @param permissionName {String} Name repressing permission
     * @param validationFunction {Function} Function used to check if permission is valid
     */
    function Permission(permissionName, validationFunction) {
      validateConstructor(permissionName, validationFunction);

      this.permissionName = permissionName;
      this.validationFunction = validationFunction;
    }

    /**
     * Checks if permission is still valid
     * @methodOf permission.Permission
     *
     * @returns {Promise}
     */
    Permission.prototype.validatePermission = function () {
      var validationResult = this.validationFunction.call(null, this.permissionName, PermTransitionProperties);

      if (!angular.isFunction(validationResult.then)) {
        validationResult = wrapInPromise(validationResult, this.permissionName);
      }

      return validationResult;
    };

    /**
     * Converts a value into a promise, if the value is truthy it resolves it, otherwise it rejects it
     * @methodOf permission.Permission
     * @private
     *
     * @param result {Boolean} Function to be wrapped into promise
     * @param permissionName {String} Returned value in promise
     *
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
     * @methodOf permission.Permission
     * @private
     *
     * @throws {TypeError}
     *
     * @param permissionName {String} Name repressing permission
     * @param validationFunction {Function} Function used to check if permission is valid
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
  }

  angular
    .module('permission')
    .factory('PermPermission', PermPermission);

  /**
   * Role definition factory
   * @function
   *
   * @param $q {Object} Angular promise implementation
   * @param PermPermissionStore {permission.PermPermissionStore} Permission definition storage
   * @param PermTransitionProperties {permission.PermTransitionProperties} Helper storing ui-router transition parameters
   *
   * @return {Role}
   */
  function PermRole($q, PermPermissionStore, PermTransitionProperties) {
    'ngInject';

    /**
     * Role definition constructor
     * @constructor Role
     *
     * @param roleName {String} Name representing role
     * @param validationFunction {Function|Array<String>} Optional function used to validate if permissions are still
     *   valid or list of permission names representing role
     */
    function Role(roleName, validationFunction) {
      validateConstructor(roleName, validationFunction);

      this.roleName = roleName;
      this.validationFunction = validationFunction;
    }

    /**
     * Checks if role is still valid
     * @methodOf permission.Role
     *
     * @returns {Promise} $q.promise object
     */
    Role.prototype.validateRole = function () {
      if (angular.isFunction(this.validationFunction)) {
        var validationResult = this.validationFunction.call(null, this.roleName, PermTransitionProperties);
        if (!angular.isFunction(validationResult.then)) {
          validationResult = wrapInPromise(validationResult, this.roleName);
        }

        return validationResult;
      }

      if (angular.isArray(this.validationFunction)) {
        var promises = this.validationFunction.map(function (permissionName) {
          if (PermPermissionStore.hasPermissionDefinition(permissionName)) {
            var permission = PermPermissionStore.getPermissionDefinition(permissionName);

            return permission.validatePermission();
          }

          return $q.reject(permissionName);
        });

        return $q.all(promises);
      }
    };

    /**
     * Converts a value into a promise, if the value is truthy it resolves it, otherwise it rejects it
     * @methodOf permission.Role
     * @private
     *
     * @param result {Boolean} Function to be wrapped into promise
     * @param [roleName] {String} Returned value in promise
     *
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
     * @methodOf permission.Role
     * @private
     *
     * @throws {TypeError}
     *
     * @param roleName {String} Name representing role
     * @param validationFunction {Function|Array<String>} Optional function used to validate if permissions are still
     *   valid or list of permission names representing role
     */
    function validateConstructor(roleName, validationFunction) {
      if (!angular.isString(roleName)) {
        throw new TypeError('Parameter "roleName" name must be String');
      }

      if (!angular.isArray(validationFunction) && !angular.isFunction(validationFunction)) {
        throw new TypeError('Parameter "validationFunction" must be array or function');
      }
    }

    return Role;
  }

  angular
    .module('permission')
    .factory('PermRole', PermRole);

  /**
   * Permission definition storage
   * @name permission.PermPermissionStore
   *
   * @param PermPermission {permission.PermPermission|Function}
   */
  function PermPermissionStore(PermPermission) {
    'ngInject';

    /**
     * @property permissionStore
     *
     * @type {Object}
     */
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
     * @methodOf permission.PermPermissionStore
     *
     * @param permissionName {String} Name of defined permission
     * @param validationFunction {Function} Function used to validate if permission is valid
     */
    function definePermission(permissionName, validationFunction) {
      permissionStore[permissionName] = new PermPermission(permissionName, validationFunction);
    }

    /**
     * Allows to define set of permissionNames with shared validation function on application configuration
     * @methodOf permission.PermPermissionStore
     * @throws {TypeError}
     *
     * @param permissionNames {Array<Number>} Set of permission names
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
     * @methodOf permission.PermPermissionStore
     *
     * @param permissionName {String} Name of defined permission
     */
    function removePermissionDefinition(permissionName) {
      delete permissionStore[permissionName];
    }

    /**
     * Checks if permission exists
     * @methodOf permission.PermPermissionStore
     *
     * @param permissionName {String} Name of defined permission
     * @returns {Boolean}
     */
    function hasPermissionDefinition(permissionName) {
      return angular.isDefined(permissionStore[permissionName]);
    }

    /**
     * Returns permission by it's name
     * @methodOf permission.PermPermissionStore
     *
     * @returns {permission.Permission} Permissions definition object
     */
    function getPermissionDefinition(permissionName) {
      return permissionStore[permissionName];
    }

    /**
     * Returns all permissions
     * @methodOf permission.PermPermissionStore
     *
     * @returns {Object} Permissions collection
     */
    function getStore() {
      return permissionStore;
    }

    /**
     * Removes all permissions
     * @methodOf permission.PermPermissionStore
     */
    function clearStore() {
      permissionStore = {};
    }
  }

  angular
    .module('permission')
    .service('PermPermissionStore', PermPermissionStore);


  /**
   * Role definition storage
   * @name permission.PermRoleStore
   *
   * @param PermRole {permission.PermRole} Role definition constructor
   */
  function PermRoleStore(PermRole) {
    'ngInject';

    var roleStore = {};

    this.defineRole = defineRole;
    this.defineManyRoles = defineManyRoles;
    this.getRoleDefinition = getRoleDefinition;
    this.hasRoleDefinition = hasRoleDefinition;
    this.removeRoleDefinition = removeRoleDefinition;
    this.getStore = getStore;
    this.clearStore = clearStore;

    /**
     * Allows to add single role definition to the store by providing it's name and validation function
     * @methodOf permission.PermRoleStore
     *
     * @param roleName {String} Name of defined role
     * @param [validationFunction] {Function|Array<String>} Function used to validate if role is valid or set of
     *   permission names that has to be owned to have a role
     */
    function defineRole(roleName, validationFunction) {
      roleStore[roleName] = new PermRole(roleName, validationFunction);
    }

    /**
     * Allows to define set of roleNames with shared validation function
     * @methodOf permission.PermPermissionStore
     * @throws {TypeError}
     *
     * @param roleMap {String, Function|Array<String>} Map of roles with matching validators
     */
    function defineManyRoles(roleMap) {
      if (!angular.isObject(roleMap)) {
        throw new TypeError('Parameter "roleNames" name must be object');
      }

      angular.forEach(roleMap, function (validationFunction, roleName) {
        defineRole(roleName, validationFunction);
      });
    }

    /**
     * Deletes role from store
     * @method permission.PermRoleStore
     *
     * @param roleName {String} Name of defined permission
     */
    function removeRoleDefinition(roleName) {
      delete roleStore[roleName];
    }

    /**
     * Checks if role is defined in store
     * @method permission.PermRoleStore
     *
     * @param roleName {String} Name of role
     * @returns {Boolean}
     */
    function hasRoleDefinition(roleName) {
      return angular.isDefined(roleStore[roleName]);
    }

    /**
     * Returns role definition object by it's name
     * @method permission.PermRoleStore
     *
     * @returns {permission.PermRole} PermRole definition object
     */
    function getRoleDefinition(roleName) {
      return roleStore[roleName];
    }

    /**
     * Returns all role definitions
     * @method permission.PermRoleStore
     *
     * @returns {Object} Defined roles collection
     */
    function getStore() {
      return roleStore;
    }

    /**
     * Removes all role definitions
     * @method permission.PermRoleStore
     */
    function clearStore() {
      roleStore = {};
    }
  }

  angular
    .module('permission')
    .service('PermRoleStore', PermRoleStore);

  /**
   * Handles authorization based on provided permissions/roles.
   * @name permission.permissionDirective
   *
   * Directive accepts single or combined attributes `permission-only` and `permission-except` that checks on
   * DOM rendering if permissions/roles are met. Attributes can be passed either as String, Array or variable from
   * parent scope. Directive also will watch for changes if applied and automatically update the view.
   *
   * @example
   * <div permission
   *      permission-only="'USER'">
   * </div>
   * <div permission
   *      permission-only="['USER','ADMIN']"
   *      permission-except="'MANAGER'">
   * </div>
   * <div permission permission-sref="app.login"></div>
   *
   * By default directive will show/hide elements if provided permissions matches.
   * You can override this behaviour by passing `permission-on-authorized` and `permission-on-unauthorized`
   *   attributes that will pass to your function `$element` as argument that you can freely manipulate your DOM
   *   behaviour.
   *
   * Important! Function should be as references - `vm.disableElement` not `vm.disableElement()` to be able to
   *   accept passed $element reference from inside of permissionDirective
   *
   * @example
   * <div permission
   *      permission-only="['USER','ADMIN']"
   *      permission-on-authorized="PermPermissionStrategies.disableElement"
   *      permission-on-unauthorized="PermPermissionStrategies.enableElement">
   * </div>
   *
   * @param $log {Object} Logging service
   * @param $injector {Object} Injector instance object
   * @param PermPermissionMap {permission.permPermissionMap|Function} Map of state access rights
   * @param PermPermissionStrategies {permission.permPermissionStrategies} Set of pre-defined directive behaviours
   *
   * @returns {{
   *   restrict: string,
   *   bindToController: {
   *     sref: string
   *     only: string,
   *     except: string,
   *     onAuthorized: function,
   *     onUnauthorized: function
   *   },
   *   controllerAs: string,
   *   controller: controller
   * }} Directive instance
   */
  function PermissionDirective($log, $injector, PermPermissionMap, PermPermissionStrategies) {
    'ngInject';

    return {
      restrict: 'A',
      bindToController: {
        sref: '=?permissionSref',
        only: '=?permissionOnly',
        except: '=?permissionExcept',
        onAuthorized: '&?permissionOnAuthorized',
        onUnauthorized: '&?permissionOnUnauthorized'
      },
      controllerAs: 'permission',
      controller: ['$scope', '$element', function ($scope, $element) {
        var permission = this;

        $scope.$watchGroup(['permission.only', 'permission.except', 'sref'],
          function () {
            try {
              if (isSrefStateDefined()) {
                var PermStateAuthorization = $injector.get('PermStateAuthorization');

                PermStateAuthorization
                  .authorizeByStateName(permission.sref)
                  .then(function () {
                    onAuthorizedAccess();
                  })
                  .catch(function () {
                    onUnauthorizedAccess();
                  });
              } else {
                var PermAuthorization = $injector.get('PermAuthorization');
                var permissionMap = new PermPermissionMap({
                  only: permission.only,
                  except: permission.except
                });

                PermAuthorization
                  .authorizeByPermissionMap(permissionMap)
                  .then(function () {
                    onAuthorizedAccess();
                  })
                  .catch(function () {
                    onUnauthorizedAccess();
                  });
              }
            } catch (e) {
              onUnauthorizedAccess();
              $log.error(e.message);
            }
          });

        /**
         * Returns true when permissions should be checked based on state name
         * @private
         *
         * @returns {boolean}
         */
        function isSrefStateDefined() {
          return $injector.has('$state') && permission.sref;
        }

        /**
         * Calls `onAuthorized` function if provided or show element
         * @private
         */
        function onAuthorizedAccess() {
          if (angular.isFunction(permission.onAuthorized)) {
            permission.onAuthorized()($element);
          } else {
            PermPermissionStrategies.showElement($element);
          }
        }

        /**
         * Calls `onUnauthorized` function if provided or hide element
         * @private
         */
        function onUnauthorizedAccess() {
          if (angular.isFunction(permission.onUnauthorized)) {
            permission.onUnauthorized()($element);
          } else {
            PermPermissionStrategies.hideElement($element);
          }
        }
      }]
    };
  }

  angular
    .module('permission')
    .directive('permission', PermissionDirective);


  /**
   * Service responsible for handling view based authorization
   * @name permission.PermAuthorization
   *
   * @param $q {Object} Angular promise implementation
   */
  function PermAuthorization($q) {
    'ngInject';

    /**
     * @deprecated
     *
     * This method will be deprecated in favour of authorizeByPermissionMap in 4.0
     */
    this.authorize = authorizeByPermissionMap;

    this.authorizeByPermissionMap = authorizeByPermissionMap;

    /**
     * Handles authorization based on provided permissions map
     * @methodOf permission.PermAuthorization
     *
     * @param map {permission.PermissionMap} Map of permission names
     *
     * @returns {promise} $q.promise object
     */
    function authorizeByPermissionMap(map) {
      return authorizePermissionMap(map);
    }

    /**
     * Checks authorization for simple view based access
     * @methodOf permission.PermAuthorization
     * @private
     *
     * @param map {permission.PermissionMap} Access rights map
     *
     * @returns {promise} $q.promise object
     */
    function authorizePermissionMap(map) {
      var deferred = $q.defer();

      resolveExceptPrivilegeMap(deferred, map);

      return deferred.promise;
    }

    /**
     * Resolves flat set of "except" privileges
     * @methodOf permission.PermAuthorization
     * @private
     *
     * @param deferred {Object} Promise defer
     * @param map {permission.PermissionMap} Access rights map
     *
     * @returns {Promise} $q.promise object
     */
    function resolveExceptPrivilegeMap(deferred, map) {
      var exceptPromises = map.resolvePropertyValidity(map.except);

      $q.any(exceptPromises)
        .then(function (rejectedPermissions) {
          deferred.reject(rejectedPermissions);
        })
        .catch(function () {
          resolveOnlyPermissionMap(deferred, map);
        });
    }

    /**
     * Resolves flat set of "only" privileges
     * @methodOf permission.PermAuthorization
     * @private
     *
     * @param deferred {Object} Promise defer
     * @param map {permission.PermissionMap} Access rights map
     */
    function resolveOnlyPermissionMap(deferred, map) {
      if (!map.only.length) {
        deferred.resolve();
        return;
      }

      var onlyPromises = map.resolvePropertyValidity(map.only);
      $q.any(onlyPromises)
        .then(function (resolvedPermissions) {
          deferred.resolve(resolvedPermissions);
        })
        .catch(function (rejectedPermission) {
          deferred.reject(rejectedPermission);
        });
    }
  }

  angular
    .module('permission')
    .service('PermAuthorization', PermAuthorization);


  /**
   * Access rights map factory
   * @name permission.PermPermissionMap
   *
   * @param $q {Object} Angular promise implementation
   * @param PermTransitionProperties {permission.PermTransitionProperties} Helper storing ui-router transition parameters
   * @param PermRoleStore {permission.PermRoleStore} Role definition storage
   * @param PermPermissionStore {permission.PermPermissionStore} Permission definition storage
   *
   * @return {permission.PermissionMap}
   */
  function PermPermissionMap($q, PermTransitionProperties, PermRoleStore, PermPermissionStore) {
    'ngInject';

    /**
     * Constructs map object instructing authorization service how to handle authorizing
     * @constructor permission.PermissionMap
     *
     * @param [permissionMap] {Object} Map of permissions provided to authorization service
     * @param [permissionMap.only] {String|Array|Function} List of exclusive access right names allowed for
     *   authorization
     * @param [permissionMap.except] {String|Array|Function} List of exclusive access right names denied for
     *   authorization
     * @param [permissionMap.redirectTo] {String|Function|Object|promise} Handling redirection when rejected
     *   authorization
     */
    function PermissionMap(permissionMap) {
      // Suppress not defined object errors
      permissionMap = permissionMap || {};

      this.only = normalizeMapProperty(permissionMap.only);
      this.except = normalizeMapProperty(permissionMap.except);
      this.redirectTo = permissionMap.redirectTo;
    }

    /**
     * Redirects to fallback states when permissions fail
     * @methodOf permission.PermissionMap
     *
     * @param [rejectedPermissionName] {String} Permission name
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
        return $q.resolve({
          state: this.redirectTo
        });
      }

      // If redirectTo state is not defined stay where you are
      return $q.reject();
    };

    /**
     * Resolves weather permissions set for "only" or "except" property are valid
     * @methodOf permission.PermissionMap
     *
     * @param property {String|Array|Function} "only" or "except" map property
     *
     * @return {Array<Promise>}
     */
    PermissionMap.prototype.resolvePropertyValidity = function (property) {

      return property.map(function (privilegeName) {
        if (PermRoleStore.hasRoleDefinition(privilegeName)) {
          var role = PermRoleStore.getRoleDefinition(privilegeName);
          return role.validateRole();
        }

        if (PermPermissionStore.hasPermissionDefinition(privilegeName)) {
          var permission = PermPermissionStore.getPermissionDefinition(privilegeName);
          return permission.validatePermission();
        }

        return $q.reject(privilegeName);
      });
    };

    /**
     * Handles function based redirection for rejected permissions
     * @methodOf permission.PermissionMap
     *
     * @throws {TypeError}
     *
     * @param redirectFunction {Function} Redirection function
     * @param rejectedPermissionName {String} Rejected permission
     *
     * @return {Promise}
     */
    function resolveFunctionRedirect(redirectFunction, rejectedPermissionName) {
      return $q
        .when(redirectFunction.call(null, rejectedPermissionName, PermTransitionProperties))
        .then(function (redirectState) {
          if (angular.isString(redirectState)) {
            return {
              state: redirectState
            };
          }

          if (angular.isObject(redirectState)) {
            return redirectState;
          }

          return $q.reject();
        });
    }

    /**
     * Handles object based redirection for rejected permissions
     * @methodOf permission.PermissionMap
     *
     * @throws {ReferenceError}
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

      if (angular.isObject(redirectState)) {
        return $q.resolve(redirectState);
      }

      if (angular.isString(redirectState)) {
        return $q.resolve({
          state: redirectState
        });
      }
    }

    /**
     * Handles extraction of permission map "only" and "except" properties and converts them into array objects
     * @methodOf permission.PermissionMap
     * @private
     *
     * @param property {String|Array|Function} PermPermission map property "only" or "except"
     *
     * @returns {Array<String>} Array of permission "only" or "except" names
     */
    function normalizeMapProperty(property) {
      if (angular.isString(property)) {
        return [property];
      }

      if (angular.isArray(property)) {
        return property;
      }

      if (angular.isFunction(property)) {
        return property.call(null, PermTransitionProperties);
      }

      return [];
    }

    return PermissionMap;
  }

  angular
    .module('permission')
    .factory('PermPermissionMap', PermPermissionMap);
}(window, window.angular));
