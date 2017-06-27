/**
 * angular-permission
 * Route permission and access control as simple as it can get
 * @version v2.3.8 - 2016-05-07
 * @link https://github.com/Narzerus/angular-permission
 * @author Rafael Vidaurre <narzerus@gmail.com> (http://www.rafaelvidaurre.com), Blazej Krysiak
 *   <blazej.krysiak@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function () {
  'use strict';

  /**
   * @namespace permission
   */

  config.$inject = ['$stateProvider'];
  run.$inject = ['$rootScope', '$state', 'TransitionProperties', 'TransitionEvents', 'StateAuthorization', 'StatePermissionMap'];
  function config($stateProvider) {
    /**
     * This decorator is required to access full state object instead of it's configuration
     * when trying to obtain full toState state object not it's configuration
     * Can be removed when implemented https://github.com/angular-ui/ui-router/issues/13.
     */
    $stateProvider.decorator('parent', function (state, parentFn) {
      state.self.$$state = function () {
        return state;
      };

      state.self.areSetStatePermissions = function () {
        return angular.isDefined(state.data) && angular.isDefined(state.data.permissions);
      };

      return parentFn(state);
    });
  }

  function run($rootScope, $state, TransitionProperties, TransitionEvents, StateAuthorization, StatePermissionMap) {
    /**
     * State transition interceptor
     */
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {

      if (!isAuthorizationFinished()) {
        event.preventDefault();

        setStateAuthorizationStatus(true);
        setTransitionProperties();

        if (!TransitionEvents.areStateEventsDefaultPrevented()) {
          TransitionEvents.broadcastStateChangePermissionStart();

          var statePermissionMap = new StatePermissionMap();

          StateAuthorization
            .authorize(statePermissionMap)
            .then(function () {
              handleAuthorizedState();
            })
            .catch(function (rejectedPermission) {
              handleUnauthorizedState(rejectedPermission, statePermissionMap);
            })
            .finally(function () {
              setStateAuthorizationStatus(false);
            });
        }
      }

      /**
       * Updates values of `TransitionProperties` holder object
       * @method
       * @private
       */
      function setTransitionProperties() {
        TransitionProperties.toState = toState;
        TransitionProperties.toParams = toParams;
        TransitionProperties.fromState = fromState;
        TransitionProperties.fromParams = fromParams;
        TransitionProperties.options = options;
      }

      /**
       * Sets internal state `$$finishedAuthorization` variable to prevent looping
       * @method
       * @private
       *
       *
       * @param status {boolean} When true authorization has been already preceded
       */
      function setStateAuthorizationStatus(status) {
        angular.extend(toState, {'$$isAuthorizationFinished': status});
      }

      /**
       * Checks if state has been already checked for authorization
       * @method
       * @private
       *
       * @returns {boolean}
       */
      function isAuthorizationFinished() {
        return toState.$$isAuthorizationFinished;
      }

      /**
       * Handles redirection for authorized access
       * @method
       * @private
       */
      function handleAuthorizedState() {

        TransitionEvents.broadcastStateChangePermissionAccepted();

        // Overwrite notify option to broadcast it later
        var transitionOptions = angular.extend({}, TransitionProperties.options, {notify: false, location: true});

        $state
          .go(TransitionProperties.toState.name, TransitionProperties.toParams, transitionOptions)
          .then(function () {
            TransitionEvents.broadcastStateChangeSuccess();
          });
      }

      /**
       * Handles redirection for unauthorized access
       * @method
       * @private
       *
       * @param rejectedPermission {String} Rejected access right
       * @param statePermissionMap {permission.StatePermissionMap} State permission map
       */
      function handleUnauthorizedState(rejectedPermission, statePermissionMap) {
        TransitionEvents.broadcastStateChangePermissionDenied();

        statePermissionMap
          .resolveRedirectState(rejectedPermission)
          .then(function (redirect) {
            $state.go(redirect.state, redirect.params, redirect.options);
          });
      }
    });
  }

  angular.module('permission', ['ui.router'])
    .config(config)
    .run(run);
}());


(function () {
  'use strict';

  /**
   * Extends $q implementation by A+ *any* method
   * @name $q
   * @extends {angular.$q}
   * @memberOf permission
   *
   * @param $delegate {Object} Angular promise implementation
   */
  $q.$inject = ['$delegate'];
  function $q($delegate) {
    'ngInject';

    $delegate.any = any;

    /**
     * Implementation of missing $q `any` method that wits for first resolution of provided promise set
     * @method
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

})();


(function () {
  'use strict';

  /**
   * Pre-defined available configurable behaviours of directive `permission`
   * @name PermissionStrategies
   * @memberOf permission
   * @readonly
   *
   * @example
   * <div permission
   *      permission-except="'MANAGER'"
   *      permission-on-authorized="PermissionStrategies.renderContent"
   *      permission-on-unauthorized="PermissionStrategies.removeContent">
   * </div>
   *
   * @property enableElement {Function}
   * @property disableElement {Function}
   * @property showElement {Function}
   * @property hideElement {Function}
   */
  var PermissionStrategies = {
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
    .constant('PermissionStrategies', PermissionStrategies);

}());


(function () {
  'use strict';

  /**
   * Helper object used for storing ui-router transition parameters
   * @name TransitionProperties
   * @memberOf permission
   *
   * @type {Object.<String,Object>}
   *
   * UI-router transition properties:
   * @property toState {Object} Target state object
   * @property toParams {Object} Target state params
   * @property fromState {Object} Source state object
   * @property fromParams {Object} Source state params
   * @property options {Object} Transition options
   */
  var TransitionProperties = {
    toState: undefined,
    toParams: undefined,
    fromState: undefined,
    fromParams: undefined,
    options: undefined
  };

  angular
    .module('permission')
    .value('TransitionProperties', TransitionProperties);

}());

(function () {
  'use strict';

  /**
   * Service responsible for managing and emitting events
   * @name TransitionEvents
   * @memberOf permission
   *
   * @param TransitionProperties {permission.TransitionProperties} Helper storing ui-router transition parameters
   * @param $rootScope {Object} Top-level angular scope
   */
  TransitionEvents.$inject = ['$rootScope', 'TransitionProperties'];
  function TransitionEvents($rootScope, TransitionProperties) {

    this.areStateEventsDefaultPrevented = areStateEventsDefaultPrevented;
    this.broadcastStateChangePermissionStart = broadcastStateChangePermissionStart;
    this.broadcastStateChangePermissionAccepted = broadcastStateChangePermissionAccepted;
    this.broadcastStateChangePermissionDenied = broadcastStateChangePermissionDenied;
    this.broadcastStateChangeSuccess = broadcastStateChangeSuccess;

    /**
     * Checks if state events are not prevented by default
     * @method
     *
     * @returns {boolean}
     */
    function areStateEventsDefaultPrevented() {
      return isStateChangePermissionStartDefaultPrevented() || isStateChangeStartDefaultPrevented();
    }

    /**
     * Broadcasts "$stateChangePermissionStart" event from $rootScope
     * @method
     */
    function broadcastStateChangePermissionStart() {
      $rootScope.$broadcast('$stateChangePermissionStart',
        TransitionProperties.toState, TransitionProperties.toParams,
        TransitionProperties.options);
    }

    /**
     * Broadcasts "$stateChangePermissionAccepted" event from $rootScope
     * @method
     */
    function broadcastStateChangePermissionAccepted() {
      $rootScope.$broadcast('$stateChangePermissionAccepted',
        TransitionProperties.toState, TransitionProperties.toParams,
        TransitionProperties.options);
    }

    /**
     * Broadcasts "$stateChangeSuccess" event from $rootScope
     * @method
     */
    function broadcastStateChangeSuccess() {
      $rootScope.$broadcast('$stateChangeSuccess',
        TransitionProperties.toState, TransitionProperties.toParams,
        TransitionProperties.fromState, TransitionProperties.fromParams);
    }

    /**
     * Broadcasts "$tateChangePermissionDenied" event from $rootScope
     * @method
     */
    function broadcastStateChangePermissionDenied() {
      $rootScope.$broadcast('$stateChangePermissionDenied',
        TransitionProperties.toState, TransitionProperties.toParams,
        TransitionProperties.options);
    }

    /**
     * Checks if event $stateChangeStart hasn't been disabled by default
     * @method
     * @private
     *
     * @returns {boolean}
     */
    function isStateChangeStartDefaultPrevented() {
      return $rootScope.$broadcast('$stateChangeStart',
        TransitionProperties.toState, TransitionProperties.toParams,
        TransitionProperties.fromState, TransitionProperties.fromParams,
        TransitionProperties.options).defaultPrevented;
    }

    /**
     * Checks if event $stateChangePermissionStart hasn't been disabled by default
     * @method
     * @private
     *
     * @returns {boolean}
     */
    function isStateChangePermissionStartDefaultPrevented() {
      return $rootScope.$broadcast('$stateChangePermissionStart',
        TransitionProperties.toState, TransitionProperties.toParams,
        TransitionProperties.options).defaultPrevented;
    }
  }

  angular
    .module('permission')
    .service('TransitionEvents', TransitionEvents);

}());

(function () {
  'use strict';

  /**
   * Access rights map factory
   * @name PermissionMapFactory
   *
   * @param $q {Object} Angular promise implementation
   * @param TransitionProperties {permission.TransitionProperties} Helper storing ui-router transition parameters
   * @param RoleStore {permission.RoleStore} Role definition storage
   * @param PermissionStore {permission.PermissionStore} Permission definition storage
   *
   * @return {permission.PermissionMap}
   */
  PermissionMapFactory.$inject = ['$q', 'TransitionProperties', 'RoleStore', 'PermissionStore'];
  function PermissionMapFactory($q, TransitionProperties, RoleStore, PermissionStore) {
    /**
     * Constructs map object instructing authorization service how to handle authorizing
     * @constructor PermissionMap
     * @memberOf permission
     *
     * @param [permissionMap] {Object} Map of permissions provided to authorization service
     * @param [permissionMap.only] {Array} List of exclusive access right names allowed for authorization
     * @param [permissionMap.except] {Array} List of exclusive access right names denied for authorization
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
     * @method
     * @methodOf permission.PermissionMap
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
        return $q.resolve({
          state: this.redirectTo
        });
      }

      // If redirectTo state is not defined stay where you are
      return $q.reject(null);
    };

    /**
     * Resolves weather permissions set for "only" or "except" property are valid
     * @method
     *
     * @param property {permissionMap.only|permissionMap.except} "only" or "except" map property
     * @returns {Array<Promise>}
     */
    PermissionMap.prototype.resolvePropertyValidity = function (property) {

      return property.map(function (privilegeName) {

        if (RoleStore.hasRoleDefinition(privilegeName)) {
          var role = RoleStore.getRoleDefinition(privilegeName);
          return role.validateRole();
        }

        if (PermissionStore.hasPermissionDefinition(privilegeName)) {
          var permission = PermissionStore.getPermissionDefinition(privilegeName);
          return permission.validatePermission();
        }

        return $q.reject(privilegeName);
      });
    };

    /**
     * Handles function based redirection for rejected permissions
     * @method
     * @methodOf permission.PermissionMap
     * @throws {TypeError}
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
          if (angular.isString(redirectState)) {
            return {
              state: redirectState
            };
          }

          if (angular.isObject(redirectState)) {
            return redirectState;
          }

          throw new TypeError('When used "redirectTo" as function, returned value must be string or object');
        });
    }

    /**
     * Handles object based redirection for rejected permissions
     * @method
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
     * @method
     * @private
     *
     * @param property {String|Array|Function|Promise} Permission map property "only" or "except"
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
        return property.call(null, TransitionProperties);
      }

      return [];
    }

    return PermissionMap;
  }

  angular
    .module('permission')
    .factory('PermissionMap', PermissionMapFactory);
}());

(function () {
  'use strict';

  /**
   * State Access rights map factory
   * @name StatePermissionMapFactory
   *
   * @param TransitionProperties {permission.TransitionProperties} Helper storing ui-router transition parameters
   * @param PermissionMap {permission.PermissionMap}
   *
   * @return {permission.StatePermissionMap}
   */
  StatePermissionMapFactory.$inject = ['TransitionProperties', 'PermissionMap'];
  function StatePermissionMapFactory(TransitionProperties, PermissionMap) {

    StatePermissionMap.prototype = new PermissionMap();
    StatePermissionMap.constructor = StatePermissionMap;
    StatePermissionMap.prototype.parent = PermissionMap.prototype;


    /**
     * Constructs map object instructing authorization service how to handle authorizing
     * @constructor StatePermissionMap
     * @extends PermissionMap
     * @memberOf permission
     */
    function StatePermissionMap() {
      this.parent.constructor.call(this);

      var toStateObject = TransitionProperties.toState.$$state();
      var toStatePath = toStateObject.path.slice().reverse();

      angular.forEach(toStatePath, function (state) {

        if (state.areSetStatePermissions()) {
          var permissionMap = new PermissionMap(state.data.permissions);
          this.extendPermissionMap(permissionMap);
        }
      }, this);
    }

    /**
     * Extends permission map by pushing to it state's permissions
     * @method
     * @methodOf permission.StatePermissionMap
     *
     * @param permissionMap {permission.PermissionMap} Compensated permission map
     */
    StatePermissionMap.prototype.extendPermissionMap = function (permissionMap) {
      if (permissionMap.only.length) {
        this.only = this.only.concat([permissionMap.only]);
      }
      if (permissionMap.except.length) {
        this.except = this.except.concat([permissionMap.except]);
      }
      this.redirectTo = permissionMap.redirectTo;
    };

    return StatePermissionMap;
  }

  angular
    .module('permission')
    .factory('StatePermissionMap', StatePermissionMapFactory);
}());

(function () {
  'use strict';

  /**
   * Permission definition factory
   * @name PermissionFactory
   *
   * @param $q {Object} Angular promise implementation
   * @param TransitionProperties {permission.TransitionProperties} Helper storing ui-router transition parameters
   *
   * @return {permission.Permission}
   */
  PermissionFactory.$inject = ['$q', 'TransitionProperties'];
  function PermissionFactory($q, TransitionProperties) {
    /**
     * Permission definition object constructor
     * @class Permission
     * @memberOf permission
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
     * @method
     * @methodOf permission.Permission
     *
     * @returns {Promise}
     */
    Permission.prototype.validatePermission = function () {
      var validationResult = this.validationFunction.call(null, this.permissionName, TransitionProperties);

      if (!angular.isFunction(validationResult.then)) {
        validationResult = wrapInPromise(validationResult, this.permissionName);
      }

      return validationResult;
    };

    /**
     * Converts a value into a promise, if the value is truthy it resolves it, otherwise it rejects it
     * @method
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
     * @method
     * @private
     * @throws {TypeError}
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
    .factory('Permission', PermissionFactory);

}());

(function () {
  'use strict';

  /**
   * Role definition factory
   * @name RoleFactory
   *
   * @param $q {Object} Angular promise implementation
   * @param PermissionStore {permission.PermissionStore} Permission definition storage
   * @param TransitionProperties {permission.TransitionProperties} Helper storing ui-router transition parameters
   *
   * @return {permission.Role}
   */
  RoleFactory.$inject = ['$q', 'PermissionStore', 'TransitionProperties'];
  function RoleFactory($q, PermissionStore, TransitionProperties) {
    /**
     * Role definition constructor
     * @class Role
     * @memberOf permission
     *
     * @param roleName {String} Name representing role
     * @param permissionNames {Array} List of permission names representing role
     * @param [validationFunction] {Function} Optional function used to validate if permissions are still valid
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
     * @method
     * @methodOf permission.Role
     *
     * @returns {Promise} $q.promise object
     */
    Role.prototype.validateRole = function () {
      // When permission set is provided check each of them
      if (this.permissionNames.length) {
        var promises = this.permissionNames.map(function (permissionName) {
          if (PermissionStore.hasPermissionDefinition(permissionName)) {
            var permission = PermissionStore.getPermissionDefinition(permissionName);
            var validationResult = permission.validatePermission();

            if (!angular.isFunction(validationResult.then)) {
              validationResult = wrapInPromise(validationResult);
            }

            return validationResult;
          }

          return $q.reject();
        });

        return $q.all(promises);
      }

      // If not call validation function manually
      var validationResult = this.validationFunction.call(null, this.roleName, TransitionProperties);
      if (!angular.isFunction(validationResult.then)) {
        validationResult = wrapInPromise(validationResult, this.roleName);
      }

      return $q.resolve(validationResult);
    };

    /**
     * Converts a value into a promise, if the value is truthy it resolves it, otherwise it rejects it
     * @method
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
     * @method
     * @private
     * @throws {TypeError}
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
  }

  angular
    .module('permission')
    .factory('Role', RoleFactory);

}());

(function () {
  'use strict';

  /**
   * Permission definition storage
   * @name PermissionStore
   * @memberOf permission
   *
   * @param Permission {permission.PermissionFactory} Permission definition factory
   */
  PermissionStore.$inject = ['Permission'];
  function PermissionStore(Permission) {
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
     * @method
     *
     * @param permissionName {String} Name of defined permission
     * @param validationFunction {Function} Function used to validate if permission is valid
     */
    function definePermission(permissionName, validationFunction) {
      var permission = new Permission(permissionName, validationFunction);
      permissionStore[permissionName] = permission;
    }

    /**
     * Allows to define set of permissionNames with shared validation function on application configuration
     * @method
     * @throws {TypeError}
     *
     * @param permissionNames {Array<String>} Set of permission names
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
     * @method
     *
     * @param permissionName {String} Name of defined permission
     */
    function removePermissionDefinition(permissionName) {
      delete permissionStore[permissionName];
    }

    /**
     * Checks if permission exists
     * @method
     *
     * @param permissionName {String} Name of defined permission
     * @returns {Boolean}
     */
    function hasPermissionDefinition(permissionName) {
      return angular.isDefined(permissionStore[permissionName]);
    }

    /**
     * Returns permission by it's name
     * @method
     *
     * @returns {permission.Permission} Permissions definition object
     */
    function getPermissionDefinition(permissionName) {
      return permissionStore[permissionName];
    }

    /**
     * Returns all permissions
     * @method
     *
     * @returns {Object} Permissions collection
     */
    function getStore() {
      return permissionStore;
    }

    /**
     * Removes all permissions
     * @method
     */
    function clearStore() {
      permissionStore = {};
    }
  }

  angular
    .module('permission')
    .service('PermissionStore', PermissionStore);
}());

(function () {
  'use strict';

  /**
   * Role definition storage
   * @name RoleStore
   * @memberOf permission
   *
   * @param Role {permission.Role|Function} Role definition constructor
   */
  RoleStore.$inject = ['Role'];
  function RoleStore(Role) {
    var roleStore = {};

    this.defineRole = defineRole;
    this.getRoleDefinition = getRoleDefinition;
    this.hasRoleDefinition = hasRoleDefinition;
    this.removeRoleDefinition = removeRoleDefinition;
    this.getStore = getStore;
    this.clearStore = clearStore;

    /**
     * Allows to define role
     * @method
     *
     * @param roleName {String} Name of defined role
     * @param permissions {Array<String>} Set of permission names
     * @param [validationFunction] {Function} Function used to validate if permissions in role are valid
     */
    function defineRole(roleName, permissions, validationFunction) {
      roleStore[roleName] = new Role(roleName, permissions, validationFunction);
    }

    /**
     * Deletes role from store
     * @method
     *
     * @param roleName {String} Name of defined permission
     */
    function removeRoleDefinition(roleName) {
      delete roleStore[roleName];
    }

    /**
     * Checks if role is defined in store
     * @method
     *
     * @param roleName {String} Name of role
     * @returns {Boolean}
     */
    function hasRoleDefinition(roleName) {
      return angular.isDefined(roleStore[roleName]);
    }

    /**
     * Returns role definition object by it's name
     * @method
     *
     * @returns {permission.Role} Role definition object
     */
    function getRoleDefinition(roleName) {
      return roleStore[roleName];
    }

    /**
     * Returns all role definitions
     * @method
     *
     * @returns {Object} Defined roles collection
     */
    function getStore() {
      return roleStore;
    }

    /**
     * Removes all role definitions
     * @method
     */
    function clearStore() {
      roleStore = {};
    }
  }

  angular
    .module('permission')
    .service('RoleStore', RoleStore);
}());

(function () {
  'use strict';

  /**
   * Handles authorization based on provided permissions/roles.
   * @name permissionDirective
   * @memberOf permission
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
   *      permission-on-authorized="PermissionStrategies.disableElement"
   *      permission-on-unauthorized="PermissionStrategies.enableElement">
   * </div>
   *
   * @param $log {Object} Logging service
   * @param Authorization {permission.Authorization} Authorization service
   * @param PermissionMap {permission.PermissionMap} Map of state access rights
   * @param PermissionStrategies {permission.PermissionStrategies} Set of pre-defined directive behaviours
   *
   * @returns {Object} Directive instance
   */
  permissionDirective.$inject = ['$log', 'Authorization', 'PermissionMap', 'PermissionStrategies'];
  function permissionDirective($log, Authorization, PermissionMap, PermissionStrategies) {
    return {
      restrict: 'A',
      bindToController: {
        only: '=?permissionOnly',
        except: '=?permissionExcept',
        onAuthorized: '&?permissionOnAuthorized',
        onUnauthorized: '&?permissionOnUnauthorized',
        // Observing attribute `only` and `except` will be removed with version 2.4.0+
        deprecatedOnly: '=only',
        deprecatedExcept: '=except'
      },
      controllerAs: 'permission',
      controller: ['$scope', '$element', function ($scope, $element) {
        var permission = this;

        if (angular.isDefined(permission.deprecatedOnly) || angular.isDefined(permission.deprecatedExcept)) {
          $log.warn('Attributes "only" and "except" are deprecated since 2.2.0+ and their support ' +
            'will be removed from 2.4.0. Use scoped "permission-only" and "permission-except" instead.');
        }

        /**
         * Observing attribute `only` and `except` will be removed with version 2.4.0+
         */
        $scope.$watchGroup(['permission.only', 'permission.except',
            'permission.deprecatedOnly', 'permission.deprecatedExcept'],
          function () {
            try {
              var permissionMap = new PermissionMap({
                only: permission.only || permission.deprecatedOnly,
                except: permission.except || permission.deprecatedExcept
              });

              Authorization
                .authorize(permissionMap)
                .then(function () {
                  onAuthorizedAccess();
                })
                .catch(function () {
                  onUnauthorizedAccess();
                });
            } catch (e) {
              onUnauthorizedAccess();
              $log.error(e.message);
            }
          });

        /**
         * Calls `onAuthorized` function if provided or show element
         * @private
         */
        function onAuthorizedAccess() {
          if (angular.isFunction(permission.onAuthorized)) {
            permission.onAuthorized()($element);
          } else {
            PermissionStrategies.showElement($element);
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
            PermissionStrategies.hideElement($element);
          }
        }
      }]
    };
  }

  angular
    .module('permission')
    .directive('permission', permissionDirective);

}());


(function () {
  'use strict';

  /**
   * Service responsible for handling view based authorization
   * @name Authorization
   * @memberOf permission
   *
   * @param $q {Object} Angular promise implementation
   */
  Authorization.$inject = ['$q'];
  function Authorization($q) {

    this.authorize = authorize;

    /**
     * Handles authorization based on provided permissions map
     * @method
     *
     * @param permissionsMap {permission.PermissionMap} Map of permission names
     *
     * @returns {promise} $q.promise object
     */
    function authorize(permissionsMap) {

      return authorizePermissionMap(permissionsMap);
    }

    /**
     * Checks authorization for simple view based access
     * @method
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
     * @method
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
     * @method
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
    .service('Authorization', Authorization);

})();


(function () {
  'use strict';

  /**
   * Service responsible for handling state based authorization
   * @name StateAuthorization
   * @memberOf permission
   *
   * @param $q {Object} Angular promise implementation
   */
  StateAuthorization.$inject = ['$q'];
  function StateAuthorization($q) {

    this.authorize = authorize;

    /**
     * Handles state authorization
     * @method {permission.StatePermissionMap}
     * @param statePermissionMap
     *
     * @return {promise}
     */
    function authorize(statePermissionMap) {
      return authorizeStatePermissionMap(statePermissionMap);
    }

    /**
     * Checks authorization for complex state inheritance
     * @method
     * @private
     *
     * @param map {permission.StatePermissionMap} State access rights map
     *
     * @returns {promise} $q.promise object
     */
    function authorizeStatePermissionMap(map) {
      var deferred = $q.defer();

      resolveExceptStatePermissionMap(deferred, map);

      return deferred.promise;
    }

    /**
     * Resolves compensated set of "except" privileges
     * @method
     * @private
     *
     * @param deferred {Object} Promise defer
     * @param map {permission.StatePermissionMap} State access rights map
     */
    function resolveExceptStatePermissionMap(deferred, map) {
      var exceptPromises = resolveStatePermissionMap(map.except, map);

      $q.all(exceptPromises)
        .then(function (rejectedPermissions) {
          deferred.reject(rejectedPermissions);
        })
        .catch(function () {
          resolveOnlyStatePermissionMap(deferred, map);
        });
    }

    /**
     * Resolves compensated set of "only" privileges
     * @method
     * @private
     *
     * @param deferred {Object} Promise defer
     * @param map {permission.StatePermissionMap} State access rights map
     */
    function resolveOnlyStatePermissionMap(deferred, map) {
      if (!map.only.length) {
        deferred.resolve();
        return;
      }

      var onlyPromises = resolveStatePermissionMap(map.only, map);

      $q.all(onlyPromises)
        .then(function (resolvedPermissions) {
          deferred.resolve(resolvedPermissions);
        })
        .catch(function (rejectedPermission) {
          deferred.reject(rejectedPermission);
        });
    }

    /**
     * Performs iteration over list of privileges looking for matches
     * @method
     * @private
     *
     * @param privilegesNames {Array} Array of sets of access rights
     * @param map {permission.StatePermissionMap} State access rights map
     *
     * @returns {Array<Promise>} Promise collection
     */
    function resolveStatePermissionMap(privilegesNames, map) {
      if (!privilegesNames.length) {
        return [$q.reject()];
      }

      return privilegesNames.map(function (statePrivileges) {
        var resolvedStatePrivileges = map.resolvePropertyValidity(statePrivileges);
        return $q.any(resolvedStatePrivileges);
      });
    }
  }

  angular
    .module('permission')
    .service('StateAuthorization', StateAuthorization);

})();
