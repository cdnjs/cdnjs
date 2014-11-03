/**
 * angular-poller
 *
 * @description
 * Angular poller service. It uses a timer and sends requests every few seconds to
 * keep the client synced with the server.
 *
 * @version v0.2.5
 * @link http://github.com/emmaguo/angular-poller
 * @license MIT
 *
 * @example
 * Simple example:
 *      var myPoller = poller.get(myResource);
 *      myPoller.promise.then(null, null, callback);
 *
 * Advanced example:
 *      var myPoller = poller.get(myResource, {
 *          action: 'get',
 *          delay: 6000,
 *          params: {
 *              verb: 'greet',
 *              salutation: 'Hello'
 *          },
 *          smart: true,
 *          catchError: true
 *      });
 *      myPoller.promise.then(null, null, callback);
 */

(function (window, angular, undefined) {

    'use strict';

    angular.module('emguo.poller', [])

        .constant('pollerConfig', {
            stopOnRouteChange: false,
            stopOnStateChange: false
        })

        .run(function ($rootScope, poller, pollerConfig) {

            /**
             * Automatically stop all pollers before route change ($routeProvider) or state change ($stateProvider).
             */
            if (pollerConfig.stopOnRouteChange) {

                $rootScope.$on('$routeChangeStart', function () {
                    poller.stopAll();
                });
            } else if (pollerConfig.stopOnStateChange) {

                $rootScope.$on('$stateChangeStart', function () {
                    poller.stopAll();
                });
            }
        })

        .factory('poller', function ($interval, $q) {

            var pollers = [], // Poller registry

                defaults = {
                    action: 'query',
                    delay: 5000,
                    params: {},
                    smart: false,
                    catchError: false
                },

                /**
                 * Poller model:
                 *  - resource (http://docs.angularjs.org/api/ngResource.$resource)
                 *  - action
                 *  - delay
                 *  - params
                 *  - smart (indicates whether poller should only send new request if the previous one is resolved)
                 *  - catchError (indicates whether poller should get notified of error responses)
                 *  - promise
                 *  - interval
                 *
                 * @param resource
                 * @param options
                 */
                Poller = function (resource, options) {

                    this.resource = resource;
                    this.set(options);
                },

                /**
                 * Find poller by resource in poller registry.
                 *
                 * @param resource
                 * @returns {object}
                 */
                findPoller = function (resource) {

                    var poller = null;

                    angular.forEach(pollers, function (item) {
                        if (angular.equals(item.resource, resource)) {
                            poller = item;
                        }
                    });

                    return poller;
                };

            angular.extend(Poller.prototype, {

                /**
                 * Set poller action, delay, params, smart and catchError flags.
                 *
                 * If options.params is defined, then set poller params to options.params,
                 * else if poller.params is undefined, then set it to defaults.params,
                 * else do nothing. The same goes for poller.action, poller.delay, poller.smart and poller.catchError.
                 *
                 * @param options
                 */
                set: function (options) {

                    angular.forEach(['action', 'delay', 'params', 'smart', 'catchError'], function (prop) {
                        if (options && options[prop]) {
                            this[prop] = options[prop];
                        } else if (!this[prop]) {
                            this[prop] = defaults[prop];
                        }
                    }, this);
                },

                /**
                 * Start poller service.
                 */
                start: function () {

                    var resource = this.resource,
                        action = this.action,
                        delay = this.delay,
                        params = this.params,
                        smart = this.smart,
                        catchError = this.catchError,
                        self = this,
                        current,
                        timestamp;

                    if (!this.deferred) {
                        this.deferred = $q.defer();
                    }

                    function tick() {

                        // If smart flag is true, then only send new request if the previous one is resolved.
                        if (!smart || !angular.isDefined(current) || current.$resolved) {

                            timestamp = new Date();
                            current = resource[action](params);

                            current.$promise.then(function (result) {

                                // Ignore success response if request is sent before poller is stopped.
                                if (angular.isUndefined(self.stopTimestamp) || timestamp >= self.stopTimestamp) {
                                    self.deferred.notify(result);
                                }

                            }, function (error) {

                                // Send error response if catchError flag is true and request is sent before poller is stopped
                                if (catchError && (angular.isUndefined(self.stopTimestamp) || timestamp >= self.stopTimestamp)) {
                                    self.deferred.notify(error);
                                }
                            });
                        }
                    }

                    tick();
                    this.interval = $interval(tick, delay);

                    this.promise = this.deferred.promise;
                },

                /**
                 * Stop poller service if it is running.
                 */
                stop: function () {

                    if (angular.isDefined(this.interval)) {
                        $interval.cancel(this.interval);
                        this.interval = undefined;
                        this.stopTimestamp = new Date();
                    }
                },

                /**
                 * Restart poller service.
                 */
                restart: function () {
                    this.stop();
                    this.start();
                }
            });

            return {

                /**
                 * Return a singleton instance of a poller. If poller does not exist, then register and
                 * start it. Otherwise return it and restart it if necessary.
                 *
                 * @param resource
                 * @param options
                 * @returns {object}
                 */
                get: function (resource, options) {

                    var poller = findPoller(resource);

                    if (!poller) {

                        poller = new Poller(resource, options);
                        pollers.push(poller);
                        poller.start();

                    } else {

                        poller.set(options);
                        poller.restart();
                    }

                    return poller;
                },

                /**
                 * Total number of pollers in poller registry.
                 *
                 * @returns {number}
                 */
                size: function () {
                    return pollers.length;
                },

                /**
                 * Stop all poller services.
                 */
                stopAll: function () {
                    angular.forEach(pollers, function (p) {
                        p.stop();
                    });
                },

                /**
                 * Restart all poller services.
                 */
                restartAll: function () {
                    angular.forEach(pollers, function (p) {
                        p.restart();
                    });
                },

                /**
                 * Stop and remove all poller services
                 */
                reset: function () {
                    this.stopAll();
                    pollers = [];
                }
            };
        }
    );
})(window, window.angular);