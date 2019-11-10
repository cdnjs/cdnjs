/**
 * angular-permission-ng
 * Extension module of angular-permission for access control within angular-route
 * @version v3.1.4 - 2016-05-18
 * @link https://github.com/Narzerus/angular-permission
 * @author Rafael Vidaurre <narzerus@gmail.com> (http://www.rafaelvidaurre.com), Blazej Krysiak <blazej.krysiak@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function (window, angular, undefined) {
  'use strict';

  /**
   * @namespace permission.ng
   */

  run.$inject = ['$rootScope', '$location', 'TransitionProperties', 'TransitionEvents', 'Authorization', 'PermissionMap'];
  TransitionEvents.$inject = ['$delegate', '$rootScope', 'TransitionProperties', 'TransitionEventNames'];

  function run($rootScope, $location, TransitionProperties, TransitionEvents, Authorization, PermissionMap) {
    'ngInject';

    /**
     * State transition interceptor
     */
    $rootScope.$on('$routeChangeStart', function (event, next, current) {

      if (areSetRoutePermissions() && !TransitionEvents.areEventsDefaultPrevented()) {
        setTransitionProperties();

        TransitionEvents.broadcastPermissionStartEvent();

        var permissionMap = new PermissionMap({
          only: next.$$route.data.permissions.only,
          except: next.$$route.data.permissions.except,
          redirectTo: next.$$route.data.permissions.redirectTo
        });

        Authorization
          .authorize(permissionMap)
          .then(function () {
            handleAuthorizedState();
          })
          .catch(function (rejectedPermission) {
            event.preventDefault();
            handleUnauthorizedState(rejectedPermission, permissionMap);
          });
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
       * Updates values of `TransitionProperties` holder object
       * @method
       * @private
       */
      function setTransitionProperties() {
        TransitionProperties.next = next;
        TransitionProperties.current = current;
      }

      /**
       * Handles redirection for authorized access
       * @method
       * @private
       */
      function handleAuthorizedState() {
        TransitionEvents.broadcastPermissionAcceptedEvent();
      }

      /**
       * Handles redirection for unauthorized access
       * @method
       * @private
       *
       * @param rejectedPermission {String} Rejected access right
       * @param permissionMap {permission.PermissionMap} State permission map
       */
      function handleUnauthorizedState(rejectedPermission, permissionMap) {
        TransitionEvents.broadcastPermissionDeniedEvent();

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
   * @name permission.ng.TransitionEvents
   *
   * @extends {permission.TransitionEvents}
   *
   * @param $delegate {Object} Parent instance being extended
   * @param $rootScope {Object} Top-level angular scope
   * @param TransitionProperties {permission.TransitionProperties} Helper storing transition parameters
   * @param TransitionEventNames {permission.ng.TransitionEventNames} Constant storing event names
   */
  function TransitionEvents($delegate, $rootScope, TransitionProperties, TransitionEventNames) {
    'ngInject';

    $delegate.areEventsDefaultPrevented = areEventsDefaultPrevented;
    $delegate.broadcastPermissionStartEvent = broadcastPermissionStartEvent;
    $delegate.broadcastPermissionAcceptedEvent = broadcastPermissionAcceptedEvent;
    $delegate.broadcastPermissionDeniedEvent = broadcastPermissionDeniedEvent;

    /**
     * Checks if state events are not prevented by default
     * @methodOf permission.ng.TransitionEvents
     *
     * @returns {boolean}
     */
    function areEventsDefaultPrevented() {
      return isRouteChangePermissionStartDefaultPrevented();
    }

    /**
     * Broadcasts "$routeChangePermissionStart" event from $rootScope
     * @methodOf permission.ng.TransitionEvents
     */
    function broadcastPermissionStartEvent() {
      $rootScope.$broadcast(TransitionEventNames.permissionStart, TransitionProperties.next);
    }

    /**
     * Broadcasts "$routeChangePermissionAccepted" event from $rootScope
     * @methodOf permission.ng.TransitionEvents
     */
    function broadcastPermissionAcceptedEvent() {
      $rootScope.$broadcast(TransitionEventNames.permissionAccepted, TransitionProperties.next);
    }

    /**
     * Broadcasts "$routeChangePermissionDenied" event from $rootScope
     * @methodOf permission.ng.TransitionEvents
     */
    function broadcastPermissionDeniedEvent() {
      $rootScope.$broadcast(TransitionEventNames.permissionDenied, TransitionProperties.next);
    }

    /**
     * Checks if event $routeChangePermissionStart hasn't been disabled by default
     * @methodOf permission.ng.TransitionEvents
     * @private
     *
     * @returns {boolean}
     */
    function isRouteChangePermissionStartDefaultPrevented() {
      return $rootScope.$broadcast(TransitionEventNames.permissionStart, TransitionProperties.next).defaultPrevented;
    }

    return $delegate;
  }

  angular
    .module('permission.ng')
    .decorator('TransitionEvents', TransitionEvents);

  /**
   * Constant storing event names for ng-route
   * @name permission.ng.TransitionEventNames
   *
   * @type {Object.<String,Object>}
   *
   * @property permissionStart {String} Event name called when started checking for permissions
   * @property permissionAccepted {String} Event name called when authorized
   * @property permissionDenied {String} Event name called when unauthorized
   */
  var TransitionEventNames = {
    permissionStart: '$routeChangePermissionStart',
    permissionAccepted: '$routeChangePermissionAccepted',
    permissionDenied: '$routeChangePermissionDenied'
  };

  angular
    .module('permission.ng')
    .value('TransitionEventNames', TransitionEventNames);

}(window, window.angular));
