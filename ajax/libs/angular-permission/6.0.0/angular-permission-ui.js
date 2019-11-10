/**
 * angular-permission-ui
 * Extension module of angular-permission for access control within ui-router
 * @version v6.0.0 - 2018-01-20
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
  run.$inject = ['$injector', '$rootScope', '$state', 'PermTransitionProperties', 'PermTransitionEvents', 'PermStateAuthorization', 'PermStatePermissionMap'];
  PermTransitionEvents.$inject = ['$delegate', '$rootScope', 'PermTransitionProperties', 'PermTransitionEventNames'];
  PermStateAuthorization.$inject = ['$q', '$state', 'PermStatePermissionMap'];
  PermStatePermissionMap.$inject = ['PermPermissionMap'];

  function config($stateProvider) {
    'ngInject';

    $stateProvider.decorator('$delegate', function ($delegate) {

      /**
       * Property containing full state object definition
       *
       * This decorator is required to access full state object instead of just it's configuration
       * Can be removed when implemented https://github.com/angular-ui/ui-router/issues/13.
       *
       * @returns {Object}
       */
      $delegate.self.$$permissionState = function () {
        return $delegate;
      };

      return $delegate;
    });
  }

  /**
   * @param $injector {Object}
   * @param $rootScope {Object}
   * @param $state {Object}
   * @param PermTransitionProperties {permission.PermTransitionProperties}
   * @param PermTransitionEvents {permission.ui.PermTransitionEvents}
   * @param PermStateAuthorization {permission.ui.PermStateAuthorization}
   * @param PermStatePermissionMap {permission.ui.PermStatePermissionMap}
   */
  function run($injector, $rootScope, $state, PermTransitionProperties, PermTransitionEvents, PermStateAuthorization, PermStatePermissionMap) {
    'ngInject';

    // For ui-router 1.x use $transitions web hook
    if ($injector.has('$transitions')) {
      var $transitions = $injector.get('$transitions');
      $transitions.onBefore({}, handleOnBeforeWebHook);
      // For ui-router 0.x use old-style eventing
    } else {
      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
        handleStateChangeStartEvent(event, toState, toParams, fromState, fromParams, options);
      });
    }

    /**
     * State transition web hook
     * @param transition {Object}
     */
    function handleOnBeforeWebHook(transition) {
      setTransitionProperties(transition);
      var statePermissionMap = new PermStatePermissionMap(PermTransitionProperties.toState);

      return PermStateAuthorization
        .authorizeByPermissionMap(statePermissionMap)
        .catch(function (rejectedPermission) {
          return statePermissionMap
            .resolveRedirectState(rejectedPermission)
            .then(function (redirect) {
              return transition.router.stateService.target(redirect.state, redirect.params, redirect.options);
            });
        });

      /**
       * Updates values of `PermTransitionProperties` holder object
       * @method
       * @private
       */
      function setTransitionProperties(transition) {
        PermTransitionProperties.toState = transition.to();
        PermTransitionProperties.toParams = transition.params('to');
        PermTransitionProperties.fromState = transition.from();
        PermTransitionProperties.fromParams = transition.params('from');
        PermTransitionProperties.options = transition.options();
      }
    }

    /**
     * State transition event interceptor
     */
    function handleStateChangeStartEvent(event, toState, toParams, fromState, fromParams, options) {
      if (!isAuthorizationFinished()) {
        setStateAuthorizationStatus(true);
        setTransitionProperties();

        if (!PermTransitionEvents.areEventsDefaultPrevented()) {
          PermTransitionEvents.broadcastPermissionStartEvent();

          event.preventDefault();
          var statePermissionMap = new PermStatePermissionMap(PermTransitionProperties.toState);

          PermStateAuthorization
            .authorizeByPermissionMap(statePermissionMap)
            .then(function () {
              handleAuthorizedState();
            })
            .catch(function (rejectedPermission) {
              handleUnauthorizedState(rejectedPermission, statePermissionMap);
            })
            .finally(function () {
              setStateAuthorizationStatus(false);
            });
        } else {
          setStateAuthorizationStatus(false);
        }
      }


      /**
       * Updates values of `PermTransitionProperties` holder object
       * @method
       * @private
       */
      function setTransitionProperties() {
        PermTransitionProperties.toState = toState;
        PermTransitionProperties.toParams = toParams;
        PermTransitionProperties.fromState = fromState;
        PermTransitionProperties.fromParams = fromParams;
        PermTransitionProperties.options = options;
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
        PermTransitionEvents.broadcastPermissionAcceptedEvent();

        // Overwrite notify option to broadcast it later
        var transitionOptions = angular.extend({}, PermTransitionProperties.options, {
          notify: false,
          location: true
        });

        $state
          .go(PermTransitionProperties.toState.name, PermTransitionProperties.toParams, transitionOptions)
          .then(function () {
            PermTransitionEvents.broadcastStateChangeSuccessEvent();
          });
      }

      /**
       * Handles redirection for unauthorized access
       * @method
       * @private
       *
       * @param rejectedPermission {String} Rejected access right
       * @param statePermissionMap {permission.ui.PermPermissionMap} State permission map
       */
      function handleUnauthorizedState(rejectedPermission, statePermissionMap) {
        PermTransitionEvents.broadcastPermissionDeniedEvent();

        statePermissionMap
          .resolveRedirectState(rejectedPermission)
          .then(function (redirect) {
            $state.go(redirect.state, redirect.params, redirect.options);
          });
      }
    }
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
   * @name permission.ui.PermTransitionEvents
   *
   * @extends permission.PermTransitionEvents
   *
   * @param $delegate {Object} Parent instance being extended
   * @param $rootScope {Object} Top-level angular scope
   * @param PermTransitionProperties {permission.PermTransitionProperties} Helper storing transition parameters
   * @param PermTransitionEventNames {permission.ui.PermTransitionEventNames} Constant storing event names
   */
  function PermTransitionEvents($delegate, $rootScope, PermTransitionProperties, PermTransitionEventNames) {
    'ngInject';

    $delegate.areEventsDefaultPrevented = areEventsDefaultPrevented;
    $delegate.broadcastStateChangeSuccessEvent = broadcastStateChangeSuccessEvent;
    $delegate.broadcastPermissionStartEvent = broadcastPermissionStartEvent;
    $delegate.broadcastPermissionAcceptedEvent = broadcastPermissionAcceptedEvent;
    $delegate.broadcastPermissionDeniedEvent = broadcastPermissionDeniedEvent;

    /**
     * Checks if state events are not prevented by default
     * @methodOf permission.ui.PermTransitionEvents
     *
     * @returns {boolean}
     */
    function areEventsDefaultPrevented() {
      return isStateChangePermissionStartDefaultPrevented() || isStateChangeStartDefaultPrevented();
    }

    /**
     * Broadcasts "$stateChangePermissionStart" event from $rootScope
     * @methodOf permission.ui.PermTransitionEvents
     */
    function broadcastPermissionStartEvent() {
      $rootScope.$broadcast(PermTransitionEventNames.permissionStart,
        PermTransitionProperties.toState, PermTransitionProperties.toParams,
        PermTransitionProperties.options);
    }

    /**
     * Broadcasts "$stateChangePermissionAccepted" event from $rootScope
     * @methodOf permission.ui.PermTransitionEvents
     */
    function broadcastPermissionAcceptedEvent() {
      $rootScope.$broadcast(PermTransitionEventNames.permissionAccepted,
        PermTransitionProperties.toState, PermTransitionProperties.toParams,
        PermTransitionProperties.options);
    }

    /**
     * Broadcasts "$tateChangePermissionDenied" event from $rootScope
     * @methodOf permission.ui.PermTransitionEvents
     */
    function broadcastPermissionDeniedEvent() {
      $rootScope.$broadcast(PermTransitionEventNames.permissionDenies,
        PermTransitionProperties.toState, PermTransitionProperties.toParams,
        PermTransitionProperties.options);
    }

    /**
     * Broadcasts "$stateChangeSuccess" event from $rootScope
     * @methodOf permission.ui.PermTransitionEvents
     */
    function broadcastStateChangeSuccessEvent() {
      $rootScope.$broadcast('$stateChangeSuccess',
        PermTransitionProperties.toState, PermTransitionProperties.toParams,
        PermTransitionProperties.fromState, PermTransitionProperties.fromParams);
    }

    /**
     * Checks if event $stateChangePermissionStart hasn't been disabled by default
     * @methodOf permission.ui.PermTransitionEvents
     * @private
     *
     * @returns {boolean}
     */
    function isStateChangePermissionStartDefaultPrevented() {
      return $rootScope.$broadcast(PermTransitionEventNames.permissionStart,
        PermTransitionProperties.toState, PermTransitionProperties.toParams,
        PermTransitionProperties.options).defaultPrevented;
    }

    /**
     * Checks if event $stateChangeStart hasn't been disabled by default
     * @methodOf permission.ui.PermTransitionEvents
     * @private
     *
     * @returns {boolean}
     */
    function isStateChangeStartDefaultPrevented() {
      return $rootScope.$broadcast('$stateChangeStart',
        PermTransitionProperties.toState, PermTransitionProperties.toParams,
        PermTransitionProperties.fromState, PermTransitionProperties.fromParams,
        PermTransitionProperties.options).defaultPrevented;
    }

    return $delegate;
  }

  angular
    .module('permission.ui')
    .decorator('PermTransitionEvents', PermTransitionEvents);

  /**
   * Constant storing event names for ng-route
   * @name permission.ui.PermTransitionEventNames
   *
   * @type {Object.<String,Object>}
   *
   * @property permissionStart {String} Event name called when started checking for permissions
   * @property permissionAccepted {String} Event name called when authorized
   * @property permissionDenies {String} Event name called when unauthorized
   */
  var PermTransitionEventNames = {
    permissionStart: '$stateChangePermissionStart',
    permissionAccepted: '$stateChangePermissionAccepted',
    permissionDenies: '$stateChangePermissionDenied'
  };

  angular
    .module('permission.ui')
    .value('PermTransitionEventNames', PermTransitionEventNames);


  /**
   * Service responsible for handling inheritance-enabled state-based authorization in ui-router
   * @extends permission.PermPermissionMap
   * @name permission.ui.PermStateAuthorization
   *
   * @param $q {Object} Angular promise implementation
   * @param $state {Object} State object
   * @param PermStatePermissionMap {permission.ui.PermStatePermissionMap|Function} Angular promise implementation
   */
  function PermStateAuthorization($q, $state, PermStatePermissionMap) {
    'ngInject';

    this.authorizeByPermissionMap = authorizeByPermissionMap;
    this.authorizeByStateName = authorizeByStateName;

    /**
     * Handles authorization based on provided state permission map
     * @methodOf permission.ui.PermStateAuthorization
     *
     * @param statePermissionMap
     *
     * @return {promise}
     */
    function authorizeByPermissionMap(statePermissionMap) {
      return authorizeStatePermissionMap(statePermissionMap);
    }

    /**
     * Authorizes uses by provided state name
     * @methodOf permission.ui.PermStateAuthorization
     *
     * @param stateName {String}
     * @returns {promise}
     */
    function authorizeByStateName(stateName) {
      var srefState = $state.get(stateName);
      var permissionMap = new PermStatePermissionMap(srefState);

      return authorizeByPermissionMap(permissionMap);
    }

    /**
     * Checks authorization for complex state inheritance
     * @methodOf permission.ui.PermStateAuthorization
     * @private
     *
     * @param map {permission.ui.StatePermissionMap} State access rights map
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
     * @methodOf permission.ui.PermStateAuthorization
     * @private
     *
     * @param deferred {Object} Promise defer
     * @param map {permission.ui.StatePermissionMap} State access rights map
     */
    function resolveExceptStatePermissionMap(deferred, map) {
      var exceptPromises = resolveStatePermissionMap(map.except, map);

      // Reverse the promises, so if any "except" privileges are not met, the promise rejects
      $q.all(reversePromises(exceptPromises))
        .then(function () {
          resolveOnlyStatePermissionMap(deferred, map);
        })
        .catch(function (rejectedPermissions) {

          if (!angular.isArray(rejectedPermissions)) {
            rejectedPermissions = [rejectedPermissions];
          }

          deferred.reject(rejectedPermissions[0]);
        });
    }

    /**
     * Resolves compensated set of "only" privileges
     * @methodOf permission.ui.PermStateAuthorization
     * @private
     *
     * @param deferred {Object} Promise defer
     * @param map {permission.ui.StatePermissionMap} State access rights map
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
     * @methodOf permission.ui.PermStateAuthorization
     * @private
     *
     * @param privilegesNames {Array} Array of sets of access rights
     * @param map {permission.ui.StatePermissionMap} State access rights map
     *
     * @returns {Array<Promise>} Promise collection
     */
    function resolveStatePermissionMap(privilegesNames, map) {
      if (!privilegesNames.length) {
        return [$q.reject()];
      }

      return privilegesNames.map(function (statePrivileges) {
        var resolvedStatePrivileges = map.resolvePropertyValidity(statePrivileges);
        return $q.any(resolvedStatePrivileges)
          .then(function (resolvedPermissions) {
            if (angular.isArray(resolvedPermissions)) {
              return resolvedPermissions[0];
            }
            return resolvedPermissions;
          });
      });
    }

    /**
     * Creates an Array of Promises that resolve when rejected, and reject when resolved
     * @methodOf permission.ui.PermStateAuthorization
     * @private
     *
     * @param promises {Array} Array of promises
     *
     * @returns {Array<Promise>} Promise collection
     */
    function reversePromises(promises) {
      return promises.map(function (promise) {
        var d = $q.defer();
        promise.then(d.reject, d.resolve);
        return d.promise;
      });
    }
  }

  angular
    .module('permission')
    .service('PermStateAuthorization', PermStateAuthorization);

  /**
   * State Access rights map factory
   * @function
   * @name permission.ui.PermStatePermissionMap
   *
   * @param PermPermissionMap {permission.PermPermissionMap|Function}
   *
   * @return {permission.ui.PermStatePermissionMap}
   */
  function PermStatePermissionMap(PermPermissionMap) {
    'ngInject';

    StatePermissionMap.prototype = new PermPermissionMap();

    /**
     * Constructs map instructing authorization service how to handle authorizing
     * @constructor permission.ui.PermStatePermissionMap
     * @extends permission.PermPermissionMap
     */
    function StatePermissionMap(state) {
      var toStateObject = state.$$permissionState();
      var toStatePath = toStateObject.path;

      angular.forEach(toStatePath, function (state) {
        if (areSetStatePermissions(state)) {
          var permissionMap = new PermPermissionMap(state.data.permissions);
          this.extendPermissionMap(permissionMap);
        }
      }, this);
    }

    /**
     * Extends permission map by pushing to it state's permissions
     * @methodOf permission.ui.StatePermissionMap
     *
     * @param permissionMap {permission.PermPermissionMap} Compensated permission map
     */
    StatePermissionMap.prototype.extendPermissionMap = function (permissionMap) {
      if (permissionMap.only.length) {
        this.only = this.only.concat([permissionMap.only]);
      }
      if (permissionMap.except.length) {
        this.except = this.except.concat([permissionMap.except]);
      }

      if (angular.isDefined(permissionMap.redirectTo)) {
        this.redirectTo = angular.extend({}, this.redirectTo, permissionMap.redirectTo);
      }
    };


    /**
     * Checks if state has set permissions
     * We check for hasOwnProperty, because ui-router lets the `data` property inherit from its parent
     * @methodOf permission.ui.StatePermissionMap
     * @private
     *
     * @returns {boolean}
     */
    function areSetStatePermissions(state) {
      try {
        return Object.prototype.hasOwnProperty.call(state.data, 'permissions');
      } catch (e) {
        return false;
      }
    }

    return StatePermissionMap;
  }

  angular
    .module('permission.ui')
    .factory('PermStatePermissionMap', PermStatePermissionMap);

}(window, window.angular));
