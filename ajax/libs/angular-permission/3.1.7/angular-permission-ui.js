/**
 * angular-permission-ui
 * Extension module of angular-permission for access control within ui-router
 * @version v3.1.7 - 2016-06-21
 * @link https://github.com/Narzerus/angular-permission
 * @author Rafael Vidaurre <narzerus@gmail.com> (http://www.rafaelvidaurre.com), Blazej Krysiak <blazej.krysiak@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function (window, angular, undefined) {
  'use strict';

  /**
   * @namespace permission.ui
   */

  /**
   * @param $stateProvider {Object}
   */
  config.$inject = ['$stateProvider'];
  run.$inject = ['$rootScope', '$state', 'TransitionProperties', 'TransitionEvents', 'StateAuthorization', 'StatePermissionMap'];
  TransitionEvents.$inject = ['$delegate', '$rootScope', 'TransitionProperties', 'TransitionEventNames'];
  StateAuthorization.$inject = ['$q'];
  StatePermissionMapFactory.$inject = ['PermissionMap'];

  function config($stateProvider) {
    'ngInject';

    $stateProvider.decorator('parent', function (state, parentFn) {
      /**
       * Property containing full state object definition
       *
       * This decorator is required to access full state object instead of just it's configuration
       * Can be removed when implemented https://github.com/angular-ui/ui-router/issues/13.
       *
       * @returns {Object}
       */
      state.self.$$state = function () {
        return state;
      };

      return parentFn(state);
    });
  }

  /**
   * @param $rootScope {Object}
   * @param $state {Object}
   * @param TransitionProperties {permission.TransitionProperties}
   * @param TransitionEvents {permission.ui.TransitionEvents}
   * @param StateAuthorization {permission.ui.StateAuthorization}
   * @param StatePermissionMap {permission.ui.StatePermissionMap}
   */
  function run($rootScope, $state, TransitionProperties, TransitionEvents, StateAuthorization, StatePermissionMap) {
    'ngInject';

    /**
     * State transition interceptor
     */
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {

      if (!isAuthorizationFinished()) {
        setStateAuthorizationStatus(true);
        setTransitionProperties();

        if (!TransitionEvents.areEventsDefaultPrevented()) {
          TransitionEvents.broadcastPermissionStartEvent();

          event.preventDefault();
          var statePermissionMap = new StatePermissionMap(TransitionProperties.toState);

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
       * @param status {boolean} When true authorization has been already preceded
       */
      function setStateAuthorizationStatus(status) {
        angular.extend(toState, {
          '$$isAuthorizationFinished': status
        });
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
        TransitionEvents.broadcastPermissionAcceptedEvent();

        // Overwrite notify option to broadcast it later
        var transitionOptions = angular.extend({}, TransitionProperties.options, {
          notify: false,
          location: true
        });

        $state
          .go(TransitionProperties.toState.name, TransitionProperties.toParams, transitionOptions)
          .then(function () {
            TransitionEvents.broadcastStateChangeSuccessEvent();
          });
      }

      /**
       * Handles redirection for unauthorized access
       * @method
       * @private
       *
       * @param rejectedPermission {String} Rejected access right
       * @param statePermissionMap {permission.ui.StatePermissionMap} State permission map
       */
      function handleUnauthorizedState(rejectedPermission, statePermissionMap) {
        TransitionEvents.broadcastPermissionDeniedEvent();

        statePermissionMap
          .resolveRedirectState(rejectedPermission)
          .then(function (redirect) {
            $state.go(redirect.state, redirect.params, redirect.options);
          });
      }
    });
  }

  var uiPermission = angular
    .module('permission.ui', ['permission', 'ui.router'])
    .config(config)
    .run(run);

  if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
    module.exports = uiPermission.name;
  }


  /**
   * Service responsible for managing and emitting events
   * @name permission.ui.TransitionEvents
   *
   * @extends permission.TransitionEvents
   *
   * @param $delegate {Object} Parent instance being extended
   * @param $rootScope {Object} Top-level angular scope
   * @param TransitionProperties {permission.TransitionProperties} Helper storing transition parameters
   * @param TransitionEventNames {permission.ui.TransitionEventNames} Constant storing event names
   */
  function TransitionEvents($delegate, $rootScope, TransitionProperties, TransitionEventNames) {
    'ngInject';

    $delegate.areEventsDefaultPrevented = areEventsDefaultPrevented;
    $delegate.broadcastStateChangeSuccessEvent = broadcastStateChangeSuccessEvent;
    $delegate.broadcastPermissionStartEvent = broadcastPermissionStartEvent;
    $delegate.broadcastPermissionAcceptedEvent = broadcastPermissionAcceptedEvent;
    $delegate.broadcastPermissionDeniedEvent = broadcastPermissionDeniedEvent;

    /**
     * Checks if state events are not prevented by default
     * @methodOf permission.ui.TransitionEvents
     *
     * @returns {boolean}
     */
    function areEventsDefaultPrevented() {
      return isStateChangePermissionStartDefaultPrevented() || isStateChangeStartDefaultPrevented();
    }

    /**
     * Broadcasts "$stateChangePermissionStart" event from $rootScope
     * @methodOf permission.ui.TransitionEvents
     */
    function broadcastPermissionStartEvent() {
      $rootScope.$broadcast(TransitionEventNames.permissionStart,
        TransitionProperties.toState, TransitionProperties.toParams,
        TransitionProperties.options);
    }

    /**
     * Broadcasts "$stateChangePermissionAccepted" event from $rootScope
     * @methodOf permission.ui.TransitionEvents
     */
    function broadcastPermissionAcceptedEvent() {
      $rootScope.$broadcast(TransitionEventNames.permissionAccepted,
        TransitionProperties.toState, TransitionProperties.toParams,
        TransitionProperties.options);
    }

    /**
     * Broadcasts "$tateChangePermissionDenied" event from $rootScope
     * @methodOf permission.ui.TransitionEvents
     */
    function broadcastPermissionDeniedEvent() {
      $rootScope.$broadcast(TransitionEventNames.permissionDenies,
        TransitionProperties.toState, TransitionProperties.toParams,
        TransitionProperties.options);
    }

    /**
     * Broadcasts "$stateChangeSuccess" event from $rootScope
     * @methodOf permission.ui.TransitionEvents
     */
    function broadcastStateChangeSuccessEvent() {
      $rootScope.$broadcast('$stateChangeSuccess',
        TransitionProperties.toState, TransitionProperties.toParams,
        TransitionProperties.fromState, TransitionProperties.fromParams);
    }

    /**
     * Checks if event $stateChangePermissionStart hasn't been disabled by default
     * @methodOf permission.ui.TransitionEvents
     * @private
     *
     * @returns {boolean}
     */
    function isStateChangePermissionStartDefaultPrevented() {
      return $rootScope.$broadcast(TransitionEventNames.permissionStart,
        TransitionProperties.toState, TransitionProperties.toParams,
        TransitionProperties.options).defaultPrevented;
    }

    /**
     * Checks if event $stateChangeStart hasn't been disabled by default
     * @methodOf permission.ui.TransitionEvents
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

    return $delegate;
  }

  angular
    .module('permission.ui')
    .decorator('TransitionEvents', TransitionEvents);

  /**
   * Constant storing event names for ng-route
   * @name permission.ui.TransitionEventNames
   *
   * @type {Object.<String,Object>}
   *
   * @property permissionStart {String} Event name called when started checking for permissions
   * @property permissionAccepted {String} Event name called when authorized
   * @property permissionDenies {String} Event name called when unauthorized
   */
  var TransitionEventNames = {
    permissionStart: '$stateChangePermissionStart',
    permissionAccepted: '$stateChangePermissionAccepted',
    permissionDenies: '$stateChangePermissionDenied'
  };

  angular
    .module('permission.ui')
    .value('TransitionEventNames', TransitionEventNames);


  /**
   * Service responsible for handling inheritance-enabled state-based authorization in ui-router
   * @name permission.ui.StateAuthorization
   *
   * @param $q {Object} Angular promise implementation
   */
  function StateAuthorization($q) {
    'ngInject';

    this.authorize = authorize;

    /**
     * Handles state authorization
     * @methodOf permission.ui.StateAuthorization
     *
     * @param statePermissionMap
     *
     * @return {promise}
     */
    function authorize(statePermissionMap) {
      return authorizeStatePermissionMap(statePermissionMap);
    }

    /**
     * Checks authorization for complex state inheritance
     * @methodOf permission.ui.StateAuthorization
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
     * @methodOf permission.ui.StateAuthorization
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
     * @methodOf permission.ui.StateAuthorization
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
     * @methodOf permission.ui.StateAuthorization
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

  /**
   * State Access rights map factory
   * @function
   *
   * @param PermissionMap {permission.PermissionMap}
   *
   * @return {StatePermissionMap}
   */
  function StatePermissionMapFactory(PermissionMap) {
    'ngInject';

    StatePermissionMap.prototype = new PermissionMap();

    /**
     * Constructs map instructing authorization service how to handle authorizing
     * @constructor permission.ui.StatePermissionMap
     * @extends permission.PermissionMap
     */
    function StatePermissionMap(state) {
      var toStateObject = state.$$state();
      var toStatePath = toStateObject.path;

      angular.forEach(toStatePath, function (state) {
        if (areSetStatePermissions(state)) {
          var permissionMap = new PermissionMap(state.data.permissions);
          this.extendPermissionMap(permissionMap);
        }
      }, this);
    }

    /**
     * Extends permission map by pushing to it state's permissions
     * @methodOf permission.ui.StatePermissionMap
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


    /**
     * Checks if state has set permissions
     * @methodOf permission.ui.StatePermissionMap
     * @private
     *
     * @returns {boolean}
     */
    function areSetStatePermissions(state) {
      return angular.isDefined(state.data) && angular.isDefined(state.data.permissions);
    }

    return StatePermissionMap;
  }

  angular
    .module('permission.ui')
    .factory('StatePermissionMap', StatePermissionMapFactory);

}(window, window.angular));
