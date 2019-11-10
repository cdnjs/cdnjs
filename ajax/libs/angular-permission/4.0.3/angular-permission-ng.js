/**
 * angular-permission-ng
 * Extension module of angular-permission for access control within angular-route
 * @version v4.0.3 - 2016-08-18
 * @link https://github.com/Narzerus/angular-permission
 * @author Rafael Vidaurre <narzerus@gmail.com> (http://www.rafaelvidaurre.com), Blazej Krysiak <blazej.krysiak@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function (window, angular, undefined) {
  'use strict';

  /**
   * @namespace permission.ng
   */

  /**
   * @param $rootScope {Object}
   * @param $location {Object}
   * @param PermTransitionProperties {permission.PermTransitionProperties}
   * @param PermTransitionEvents {permission.ng.PermTransitionEvents}
   * @param PermAuthorization {permission.PermAuthorization}
   * @param PermPermissionMap {permission.PermPermissionMap|Function}
   */
  run.$inject = ['$rootScope', '$location', 'PermTransitionProperties', 'PermTransitionEvents', 'PermAuthorization', 'PermPermissionMap'];
  PermTransitionEvents.$inject = ['$delegate', '$rootScope', 'PermTransitionProperties', 'PermTransitionEventNames'];

  function run($rootScope, $location, PermTransitionProperties, PermTransitionEvents, PermAuthorization, PermPermissionMap) {
    'ngInject';

    /**
     * State transition interceptor
     */
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      setTransitionProperties();

      if (areSetRoutePermissions() && !PermTransitionEvents.areEventsDefaultPrevented()) {

        PermTransitionEvents.broadcastPermissionStartEvent();

        next.$$route.resolve = next.$$route.resolve || {};
        next.$$route.resolve.$$permission = permissionResolver;
      }

      /**
       * Checks if route has set permissions restrictions
       * @method
       * @private
       *
       * @returns {boolean}
       */
      function areSetRoutePermissions() {
        return angular.isDefined(next.$$route.data) && angular.isDefined(next.$$route.data.permissions);
      }

      /**
       * Updates values of `PermTransitionProperties` holder object
       * @method
       * @private
       */
      function setTransitionProperties() {
        PermTransitionProperties.next = next;
        PermTransitionProperties.current = current;
      }

      function permissionResolver() {
        var PermissionMap = new PermPermissionMap({
          only: next.$$route.data.permissions.only,
          except: next.$$route.data.permissions.except,
          redirectTo: next.$$route.data.permissions.redirectTo
        });

        var authorizationResult = PermAuthorization.authorizeByPermissionMap(PermissionMap);

        authorizationResult
          .then(function () {
            handleAuthorizedState();
          })
          .catch(function (rejectedPermission) {
            handleUnauthorizedState(rejectedPermission, PermissionMap);
          });

        return authorizationResult;
      }

      /**
       * Handles redirection for authorized access
       * @method
       * @private
       */
      function handleAuthorizedState() {
        PermTransitionEvents.broadcastPermissionAcceptedEvent();
      }

      /**
       * Handles redirection for unauthorized access
       * @method
       * @private
       *
       * @param rejectedPermission {String} Rejected access right
       * @param permissionMap {permission.PermPermissionMap} State permission map
       */
      function handleUnauthorizedState(rejectedPermission, permissionMap) {
        PermTransitionEvents.broadcastPermissionDeniedEvent();

        permissionMap
          .resolveRedirectState(rejectedPermission)
          .then(function (redirect) {
            $location.path(redirect.state).replace();
          });
      }
    });
  }

  var ngPermission = angular
    .module('permission.ng', ['permission', 'ngRoute'])
    .run(run);

  if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
    module.exports = ngPermission.name;
  }

  /**
   * Service responsible for managing and emitting events
   * @name permission.ng.PermTransitionEvents
   *
   * @extends {permission.PermTransitionEvents}
   *
   * @param $delegate {Object} Parent instance being extended
   * @param $rootScope {Object} Top-level angular scope
   * @param PermTransitionProperties {permission.PermTransitionProperties} Helper storing transition parameters
   * @param PermTransitionEventNames {permission.ng.PermTransitionEventNames} Constant storing event names
   */
  function PermTransitionEvents($delegate, $rootScope, PermTransitionProperties, PermTransitionEventNames) {
    'ngInject';

    $delegate.areEventsDefaultPrevented = areEventsDefaultPrevented;
    $delegate.broadcastPermissionStartEvent = broadcastPermissionStartEvent;
    $delegate.broadcastPermissionAcceptedEvent = broadcastPermissionAcceptedEvent;
    $delegate.broadcastPermissionDeniedEvent = broadcastPermissionDeniedEvent;

    /**
     * Checks if state events are not prevented by default
     * @methodOf permission.ng.PermTransitionEvents
     *
     * @returns {boolean}
     */
    function areEventsDefaultPrevented() {
      return isRouteChangePermissionStartDefaultPrevented();
    }

    /**
     * Broadcasts "$routeChangePermissionStart" event from $rootScope
     * @methodOf permission.ng.PermTransitionEvents
     */
    function broadcastPermissionStartEvent() {
      $rootScope.$broadcast(PermTransitionEventNames.permissionStart, PermTransitionProperties.next);
    }

    /**
     * Broadcasts "$routeChangePermissionAccepted" event from $rootScope
     * @methodOf permission.ng.PermTransitionEvents
     */
    function broadcastPermissionAcceptedEvent() {
      $rootScope.$broadcast(PermTransitionEventNames.permissionAccepted, PermTransitionProperties.next);
    }

    /**
     * Broadcasts "$routeChangePermissionDenied" event from $rootScope
     * @methodOf permission.ng.PermTransitionEvents
     */
    function broadcastPermissionDeniedEvent() {
      $rootScope.$broadcast(PermTransitionEventNames.permissionDenied, PermTransitionProperties.next);
    }

    /**
     * Checks if event $routeChangePermissionStart hasn't been disabled by default
     * @methodOf permission.ng.PermTransitionEvents
     * @private
     *
     * @returns {boolean}
     */
    function isRouteChangePermissionStartDefaultPrevented() {
      return $rootScope.$broadcast(PermTransitionEventNames.permissionStart, PermTransitionProperties.next).defaultPrevented;
    }

    return $delegate;
  }

  angular
    .module('permission.ng')
    .decorator('PermTransitionEvents', PermTransitionEvents);

  /**
   * Constant storing event names for ng-route
   * @name permission.ng.PermTransitionEventNames
   *
   * @type {Object.<String,Object>}
   *
   * @property permissionStart {String} Event name called when started checking for permissions
   * @property permissionAccepted {String} Event name called when authorized
   * @property permissionDenied {String} Event name called when unauthorized
   */
  var PermTransitionEventNames = {
    permissionStart: '$routeChangePermissionStart',
    permissionAccepted: '$routeChangePermissionAccepted',
    permissionDenied: '$routeChangePermissionDenied'
  };

  angular
    .module('permission.ng')
    .value('PermTransitionEventNames', PermTransitionEventNames);

}(window, window.angular));
