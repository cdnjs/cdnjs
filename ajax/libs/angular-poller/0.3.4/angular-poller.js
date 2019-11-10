/**
 * angular-poller
 *
 * @description
 * Angular poller service. It uses a timer and sends requests every few seconds
 * to keep the client synced with the server.
 *
 * @version v0.3.4
 * @link http://github.com/emmaguo/angular-poller
 * @license MIT
 *
 * @example
 * Simple example:
 *      var myPoller = poller.get(target);
 *      myPoller.promise.then(null, null, callback);
 *
 * Advanced example:
 *      var myPoller = poller.get(target, {
 *          action: 'query',
 *          argumentsArray: [
 *              {
 *                  verb: 'greet',
 *                  salutation: 'Hello'
 *              }
 *          ],
 *          delay: 6000,
 *          smart: true,
 *          catchError: true
 *      });
 *      myPoller.promise.then(null, null, callback);
 */

(function(window, angular, undefined) {

    'use strict';

    angular.module('emguo.poller', [])

        .constant('pollerConfig', {
            stopOnRouteChange: false,
            stopOnStateChange: false,
            resetOnRouteChange: false,
            resetOnStateChange: false,
            neverOverwrite: false,
            smart: false
        })

        .run([
            '$rootScope',
            'poller',
            'pollerConfig',
            function(
                $rootScope,
                poller,
                pollerConfig
            ) {
                /**
                 * Automatically stop or reset all pollers before route
                 * change ($routeProvider) or state change ($stateProvider).
                 */
                if (pollerConfig.stopOnRouteChange) {
                    $rootScope.$on(
                        '$routeChangeStart',
                        function() {
                            poller.stopAll();
                        }
                    );
                }

                if (pollerConfig.stopOnStateChange) {
                    $rootScope.$on(
                        '$stateChangeStart',
                        function() {
                            poller.stopAll();
                        }
                    );
                }

                if (pollerConfig.resetOnRouteChange) {
                    $rootScope.$on(
                        '$routeChangeStart',
                        function() {
                            poller.reset();
                        }
                    );
                }

                if (pollerConfig.resetOnStateChange) {
                    $rootScope.$on(
                        '$stateChangeStart',
                        function() {
                            poller.reset();
                        }
                    );
                }
            }
        ])

        .factory('poller', [
            '$interval',
            '$q',
            '$http',
            'pollerConfig',
            function(
                $interval,
                $q,
                $http,
                pollerConfig
            ) {
                // Poller registry
                var pollers = [];
                var defaults = {
                    action: 'get',
                    argumentsArray: [],
                    delay: 5000,
                    smart: pollerConfig.smart,
                    catchError: false
                };

                /**
                 * Poller model:
                 *  - target (can be $resource object, or Restangular object,
                 *    or $http url)
                 *  - action
                 *  - argumentsArray
                 *  - delay
                 *  - smart (indicates whether poller should only send new
                 *    request if the previous one is resolved)
                 *  - catchError (indicates whether poller should get notified
                 *    of error responses)
                 *  - promise
                 *  - interval
                 *
                 * @param target
                 * @param options
                 */
                function Poller(target, options) {
                    this.target = target;
                    this.set(options);
                }

                /**
                 * Find poller by target in poller registry if
                 * pollerConfig.neverOverwrite is set to false (default).
                 * Otherwise return null to prevent overwriting existing pollers.
                 *
                 * @param target
                 * @returns {object}
                 */
                function findPoller(target) {
                    var poller = null;
                    if (!pollerConfig.neverOverwrite) {
                        angular.forEach(pollers, function(item) {
                            if (angular.equals(item.target, target)) {
                                poller = item;
                            }
                        });
                    }

                    return poller;
                }

                /**
                 * Set poller action, argumentsArray, delay, smart and
                 * catchError flags.
                 *
                 * If options.action is defined, then set poller action to
                 * options.action, else if poller.action is undefined, then
                 * set it to defaults.action, else do nothing.
                 * The same goes for poller.argumentsArray, poller.delay,
                 * poller.smart and poller.catchError.
                 *
                 * @param options
                 */
                Poller.prototype.set = function(options) {
                    var props = [
                        'action',
                        'argumentsArray',
                        'delay',
                        'smart',
                        'catchError'
                    ];

                    angular.forEach(props, function(prop) {
                        if (options && options[prop]) {
                            this[prop] = options[prop];
                        } else if (!this[prop]) {
                            this[prop] = defaults[prop];
                        }
                    }, this);
                };

                /**
                 * Start poller.
                 */
                Poller.prototype.start = function() {
                    var target = this.target;
                    var action = this.action;
                    var argumentsArray = this.argumentsArray.slice(0);
                    var delay = this.delay;
                    var smart = this.smart;
                    var catchError = this.catchError;
                    var self = this;
                    var current;
                    var timestamp;

                    this.deferred = this.deferred || $q.defer();

                    /**
                     * $resource: typeof target === 'function'
                     * Restangular: typeof target === 'object'
                     * $http: typeof target === 'string'
                     */
                    if (typeof target === 'string') {

                        /**
                         * Update argumentsArray and target for
                         * target[action].apply(self, argumentsArray).
                         *
                         * @example
                         * $http.get(url, [config])
                         * $http.post(url, data, [config])
                         */
                        argumentsArray.unshift(target);
                        target = $http;
                    }

                    function tick() {
                        // If smart flag is true, then only send new
                        // request if the previous one is resolved.
                        if (!smart ||
                            angular.isUndefined(current) ||
                            current.$resolved) {

                            timestamp = new Date();
                            current =
                                target[action].apply(self, argumentsArray);
                            current.$resolved = false;

                            /**
                             * $resource: current.$promise.then
                             * Restangular: current.then
                             * $http: current.then
                             */
                            (current.$promise || current).then(
                                function(result) {
                                    // Ignore success response if request is
                                    // sent before poller is stopped.
                                    current.$resolved = true;
                                    if (angular.isUndefined(self.stopTimestamp) ||
                                        timestamp >= self.stopTimestamp) {
                                        self.deferred.notify(result);
                                    }
                                },
                                function(error) {
                                    // Send error response if catchError
                                    // flag is true and request is sent
                                    // before poller is stopped.
                                    current.$resolved = true;
                                    if (catchError &&
                                        (angular.isUndefined(self.stopTimestamp) ||
                                            timestamp >= self.stopTimestamp)) {
                                        self.deferred.notify(error);
                                    }
                                }
                            );
                        }
                    }

                    tick();
                    this.interval = $interval(tick, delay);
                    this.promise = this.deferred.promise;
                };

                /**
                 * Stop poller if it is running.
                 */
                Poller.prototype.stop = function() {
                    if (angular.isDefined(this.interval)) {
                        $interval.cancel(this.interval);
                        this.interval = undefined;
                        this.stopTimestamp = new Date();
                    }
                };

                /**
                 * Remove poller.
                 */
                Poller.prototype.remove = function() {
                    var index = pollers.indexOf(this);
                    this.stop();
                    pollers.splice(index, 1);
                };

                /**
                 * Restart poller.
                 */
                Poller.prototype.restart = function() {
                    this.stop();
                    this.start();
                };

                return {
                    /**
                     * Return a singleton instance of a poller. If poller does
                     * not exist, then register and start it. Otherwise return
                     * it and restart it if necessary.
                     *
                     * @param target
                     * @param options
                     * @returns {object}
                     */
                    get: function(target, options) {
                        var poller = findPoller(target);

                        if (!poller) {
                            poller = new Poller(target, options);
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
                    size: function() {
                        return pollers.length;
                    },

                    /**
                     * Stop all poller services.
                     */
                    stopAll: function() {
                        angular.forEach(pollers, function(p) {
                            p.stop();
                        });
                    },

                    /**
                     * Restart all poller services.
                     */
                    restartAll: function() {
                        angular.forEach(pollers, function(p) {
                            p.restart();
                        });
                    },

                    /**
                     * Stop and remove all poller services
                     */
                    reset: function() {
                        this.stopAll();
                        pollers = [];
                    }
                };
            }
        ]);
})(window, window.angular);
