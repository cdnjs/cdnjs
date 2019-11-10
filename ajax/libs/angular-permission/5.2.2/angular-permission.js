/**
 * angular-permission
 * Fully featured role and permission based access control for your angular applications
 * @version v5.2.2 - 2017-03-15
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
  PermPermission.$inject = ['$q', '$injector', 'PermTransitionProperties'];
  PermRole.$inject = ['$q', '$injector', 'PermPermissionStore', 'PermTransitionProperties'];
  PermPermissionStore.$inject = ['PermPermission'];
  PermRoleStore.$inject = ['PermRole'];
  PermissionDirective.$inject = ['$log', '$injector', 'PermPermissionMap', 'PermPermissionStrategies'];
  PermAuthorization.$inject = ['$q'];
  PermPermissionMap.$inject = ['$q', '$log', '$injector', 'PermTransitionProperties', 'PermRoleStore', 'PermPermissionStore'];
  var permission = angular.module('permission', []);

  /* istanbul ignore if  */
  if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
    module.exports = permission.name;
  }

  /**
   * Permission module configuration provider
   *
   * @name permission.permissionProvider
   */
  function $permission() {
    'ngInject';

    var defaultOnAuthorizedMethod = 'showElement';
    var defaultOnUnauthorizedMethod = 'hideElement';

    /**
     * Methods allowing to alter default directive onAuthorized behaviour in permission directive
     * @methodOf permission.permissionProvider
     *
     * @param onAuthorizedMethod {String} One of permission.PermPermissionStrategies method names
     */
    this.setDefaultOnAuthorizedMethod = function (onAuthorizedMethod) { // jshint ignore:line
      defaultOnAuthorizedMethod = onAuthorizedMethod;
    };

    /**
     * Methods allowing to alter default directive onUnauthorized behaviour in permission directive
     * @methodOf permission.permissionProvider
     *
     * @param onUnauthorizedMethod {String} One of permission.PermPermissionStrategies method names
     */
    this.setDefaultOnUnauthorizedMethod = function (onUnauthorizedMethod) { // jshint ignore:line
      defaultOnUnauthorizedMethod = onUnauthorizedMethod;
    };


    this.$get = function () { // jshint ignore:line
      return {
        defaultOnAuthorizedMethod: defaultOnAuthorizedMethod,
        defaultOnUnauthorizedMethod: defaultOnUnauthorizedMethod
      };
    };
  }

  angular
    .module('permission')
    .provider('$permission', $permission);

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
   * @param $injector {Object} Dependency injection instance
   * @param PermTransitionProperties {permission.PermTransitionProperties} Helper storing ui-router transition parameters
   *
   * @return {Permission}
   */
  function PermPermission($q, $injector, PermTransitionProperties) {
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
      this.validationFunction = annotateValidationFunction(validationFunction);
    }

    /**
     * Checks if permission is still valid
     * @methodOf permission.Permission
     *
     * @returns {Promise}
     */
    Permission.prototype.validatePermission = function () {
      var validationLocals = {
        permissionName: this.permissionName,
        transitionProperties: PermTransitionProperties
      };
      var validationResult = $injector.invoke(this.validationFunction, null, validationLocals);

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
      if (result) {
        return $q.resolve(permissionName);
      }

      return $q.reject(permissionName);
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
      if (!angular.isFunction(validationFunction) && !angular.isArray(validationFunction)) {
        throw new TypeError('Parameter "validationFunction" must be Function or an injectable Function using explicit annotation');
      }
    }

    /**
     * Ensures the validation is injectable using explicit annotation.
     * Wraps a non-injectable function for backwards compatibility
     * @methodOf permission.Permission
     * @private
     *
     * @param validationFunction {Function} Function to wrap with injectable if needed
     *
     * @return {Function} Explicitly injectable function
     */
    function annotateValidationFunction(validationFunction) {
      if (!angular.isArray(validationFunction.$inject || validationFunction)) {
        // The function is not explicitly annotated, so assume using old-style parameters
        // and manually prepare for injection using our known old API parameters
        validationFunction = ['permissionName', 'transitionProperties', validationFunction];
      }

      return validationFunction;
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
   * @param $injector {Object} Dependency injection instance
   * @param PermPermissionStore {permission.PermPermissionStore} Permission definition storage
   * @param PermTransitionProperties {permission.PermTransitionProperties} Helper storing ui-router transition parameters
   *
   * @return {Role}
   */
  function PermRole($q, $injector, PermPermissionStore, PermTransitionProperties) {
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
      this.validationFunction = annotateValidationFunction(validationFunction);
    }

    /**
     * Checks if role is still valid
     * @methodOf permission.Role
     *
     * @returns {Promise} $q.promise object
     */
    Role.prototype.validateRole = function () {
      var validationLocals = {
        roleName: this.roleName,
        transitionProperties: PermTransitionProperties
      };
      var validationResult = $injector.invoke(this.validationFunction, null, validationLocals);

      if (!angular.isFunction(validationResult.then)) {
        validationResult = wrapInPromise(validationResult, this.roleName);
      }

      return validationResult;
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
      if (result) {
        return $q.resolve(roleName);
      }

      return $q.reject(roleName);
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


    /**
     * Ensures the validation is injectable using explicit annotation.
     * Wraps a non-injectable function for backwards compatibility
     * @methodOf permission.Role
     * @private
     *
     * @param validationFunction {Function|Array} Function to wrap with injectable if needed
     *
     * @return {Function} Explicitly injectable function
     */
    function annotateValidationFunction(validationFunction) {
      // Test if the validation function is just an array of permission names
      if (angular.isArray(validationFunction) && !angular.isFunction(validationFunction[validationFunction.length - 1])) {
        validationFunction = preparePermissionEvaluation(validationFunction);
      } else if (!angular.isArray(validationFunction.$inject || validationFunction)) {
        // The function is not explicitly annotated, so assume using old-style parameters
        // and manually prepare for injection using our known old API parameters
        validationFunction = ['roleName', 'transitionProperties', validationFunction];
      }

      return validationFunction;
    }

    /**
     * Creates an injectable function that evaluates a set of permissions in place of a role validation function
     * @methodOf permission.Role
     * @private
     *
     * @param permissions {Array<String>} List of permissions to evaluate
     *
     * @return {Function}
     */
    function preparePermissionEvaluation(permissions) {
      return function () {
        var promises = permissions.map(function (permissionName) {
          if (PermPermissionStore.hasPermissionDefinition(permissionName)) {
            var permission = PermPermissionStore.getPermissionDefinition(permissionName);

            return permission.validatePermission();
          }

          return $q.reject(permissionName);
        });

        return $q.all(promises);
      };
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
   * <div permission permission-sref="'app.login'"></div>
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
      controller: ['$scope', '$element', '$permission', function ($scope, $element, $permission) {
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
            var onAuthorizedMethodName = $permission.defaultOnAuthorizedMethod;
            PermPermissionStrategies[onAuthorizedMethodName]($element);
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
            var onUnauthorizedMethodName = $permission.defaultOnUnauthorizedMethod;
            PermPermissionStrategies[onUnauthorizedMethodName]($element);
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
   * @param $log {Object} Angular logging utility
   * @param $injector {Object} Dependency injection instance
   * @param PermTransitionProperties {permission.PermTransitionProperties} Helper storing ui-router transition parameters
   * @param PermRoleStore {permission.PermRoleStore} Role definition storage
   * @param PermPermissionStore {permission.PermPermissionStore} Permission definition storage
   *
   * @return {permission.PermissionMap}
   */
  function PermPermissionMap($q, $log, $injector, PermTransitionProperties, PermRoleStore, PermPermissionStore) {
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

      this.only = normalizeOnlyAndExceptProperty(permissionMap.only);
      this.except = normalizeOnlyAndExceptProperty(permissionMap.except);
      this.redirectTo = normalizeRedirectToProperty(permissionMap.redirectTo);
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

      // If redirectTo definition is not found stay where you are
      if (!angular.isDefined(this.redirectTo)) {
        return $q.reject();
      }

      var redirectState = this.redirectTo[rejectedPermissionName] || this.redirectTo['default'];

      return resolveRedirectState(redirectState, rejectedPermissionName);
    };

    /**
     * Resolves weather permissions set for "only" or "except" property are valid
     * @methodOf permission.PermissionMap
     *
     * @param property {Array} "only" or "except" map property
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

        $log.warn('Permission or role ' + privilegeName + ' was not defined.');
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
    function resolveRedirectState(redirectFunction, rejectedPermissionName) {
      return $q
        .when($injector.invoke(redirectFunction, null, {
          rejectedPermission: rejectedPermissionName,
          transitionProperties: PermTransitionProperties
        }))
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
     * Handles extraction of permission map "only" and "except" properties and converts them into array objects
     * @methodOf permission.PermissionMap
     * @private
     *
     * @param property {String|Array|Function} PermPermission map property "only" or "except"
     *
     * @returns {Array<String>} Array of permission "only" or "except" names
     */
    function normalizeOnlyAndExceptProperty(property) {
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

    /**
     * Convert user provided input into key value dictionary with permission/role name as a key and injectable resolver
     * function as a value
     * @methodOf permission.PermissionMap
     * @private
     *
     * @param redirectTo {String|Function|Array|Object} PermPermission map property "redirectTo"
     *
     * @returns {Object<String, Object>} Redirection dictionary object
     */
    function normalizeRedirectToProperty(redirectTo) {
      if (!angular.isDefined(redirectTo)) {
        return;
      }

      if (isInjectable(redirectTo) || angular.isFunction(redirectTo)) {
        return normalizeFunctionRedirectionRule(redirectTo);
      }

      if (angular.isObject(redirectTo)) {
        if (isObjectSingleRedirectionRule(redirectTo)) {
          return normalizeObjectSingleRedirectionRule(redirectTo);
        }

        return normalizeObjectMultipleRedirectionRule(redirectTo);
      }

      if (angular.isString(redirectTo)) {
        return normalizeStringRedirectionRule(redirectTo);
      }

      throw new ReferenceError('Property "redirectTo" must be String, Function, Array or Object');
    }

    /**
     * Convert string redirection rule into single-element redirection dictionary
     * @methodOf permission.PermissionMap
     * @private
     *
     * @param redirectTo {String} PermPermission map property "redirectTo"
     *
     * @returns {Object<String, Object>} Redirection dictionary object
     */
    function normalizeStringRedirectionRule(redirectTo) {
      var redirectionMap = {};

      redirectionMap.default = function () {
        return {
          state: redirectTo
        };
      };
      redirectionMap.default.$inject = ['rejectedPermission', 'transitionProperties'];

      return redirectionMap;
    }

    /**
     * Checks if redirection object is single rule type
     * @methodOf permission.PermissionMap
     * @private
     *
     * @param redirectTo {Object} PermPermission map property "redirectTo"
     *
     * @returns {boolean}
     */
    function isObjectSingleRedirectionRule(redirectTo) {
      return angular.isDefined(redirectTo.state);
    }

    /**
     * Convert single redirection rule object into single-element redirection dictionary
     * @methodOf permission.PermissionMap
     * @private
     *
     * @param redirectTo {Object} PermPermission map property "redirectTo"
     *
     * @returns {Object<String, Object>} Redirection dictionary object
     */
    function normalizeObjectSingleRedirectionRule(redirectTo) {
      var redirectionMap = {};

      redirectionMap.default = function () {
        return redirectTo;
      };

      return redirectionMap;
    }

    /**
     * Convert multiple redirection rule object into redirection dictionary
     * @methodOf permission.PermissionMap
     * @private
     *
     * @param redirectTo {Object} PermPermission map property "redirectTo"
     *
     * @returns {Object<String, Object>} Redirection dictionary object
     */
    function normalizeObjectMultipleRedirectionRule(redirectTo) {
      var redirectionMap = {};

      angular.forEach(redirectTo, function (redirection, permission) {
        if (isInjectable(redirection)) {
          redirectionMap[permission] = redirection;
        } else {
          if (angular.isFunction(redirection)) {
            redirectionMap[permission] = redirection;
            redirectionMap[permission].$inject = [];
          }
        }

        if (angular.isObject(redirection)) {
          redirectionMap[permission] = function () {
            return redirection;
          };
          redirectionMap[permission].$inject = [];
        }

        if (angular.isString(redirection)) {
          redirectionMap[permission] = function () {
            return {
              state: redirection
            };
          };
          redirectionMap[permission].$inject = [];
        }
      });

      return redirectionMap;
    }

    /**
     * Checks if property is injectable
     * @methodOf permission.PermissionMap
     * @private
     *
     * @param property {Array|Object}
     *
     * @returns {boolean}
     */
    function isInjectable(property) {
      return angular.isArray(property) || (angular.isFunction(property) && angular.isArray(property.$inject));
    }

    /**
     * Convert function redirection rule into redirection dictionary
     * @methodOf permission.PermissionMap
     * @private
     *
     * @param redirectTo {Function} PermPermission map property "redirectTo"
     *
     * @returns {Object<String, Object>} Redirection dictionary object
     */
    function normalizeFunctionRedirectionRule(redirectTo) {
      var redirectionMap = {};

      redirectionMap.default = redirectTo;

      if (!angular.isDefined(redirectTo.$inject)) {
        redirectionMap.default.$inject = ['rejectedPermission', 'transitionProperties'];
      }

      return redirectionMap;
    }

    return PermissionMap;
  }

  angular
    .module('permission')
    .factory('PermPermissionMap', PermPermissionMap);

}(window, window.angular));
