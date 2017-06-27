/**
 * angular-poller
 *
 * @description
 * Angular poller service. It uses a timer and sends requests every few seconds
 * to keep the client synced with the server.
 *
 * @version v0.4.5
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

(function(angular, undefined) {

    'use strict';

    angular.module('emguo.poller', [])

        .constant('pollerConfig', {
            stopOn: null,
            resetOn: null,
            smart: false,
            neverOverwrite: false,
            handleVisibilityChange: false
        })

        .run([
            '$rootScope',
            '$document',
            'poller',
            'pollerConfig',
            function(
                $rootScope,
                $document,
                poller,
                pollerConfig
            ) {
                /**
                 * Automatically stop or reset all pollers before route
                 * change start/success ($routeProvider) or state change
                 * start/success ($stateProvider).
                 */
                function isValid(event) {
                    return event && (
                        event === '$stateChangeStart' ||
                        event === '$routeChangeStart' ||
                        event === '$stateChangeSuccess' ||
                        event === '$routeChangeSuccess');
                }

                if (isValid(pollerConfig.stopOn)) {
                    $rootScope.$on(
                        pollerConfig.stopOn,
                        function() {
                            poller.stopAll();
                        }
                    );
                }

                if (isValid(pollerConfig.resetOn)) {
                    $rootScope.$on(
                        pollerConfig.resetOn,
                        function() {
                            poller.reset();
                        }
                    );
                }

                /**
                 * Automatically increase or decrease poller speed on page
                 * visibility change.
                 */
                function delayOnVisibilityChange() {
                    if ($document.prop('hidden')) {
                        poller.delayAll();
                    } else {
                        poller.resetDelay();
                    }
                }

                if (pollerConfig.handleVisibilityChange) {
                    delayOnVisibilityChange();
                    $document.on('visibilitychange', delayOnVisibilityChange);
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
                    idleDelay: 10000,
                    smart: pollerConfig.smart,
                    catchError: false
                };

                /**
                 * Poller model:
                 *  - target: can be $resource object, or Restangular object,
                 *    or $http url
                 *  - action
                 *  - argumentsArray
                 *  - delay
                 *  - idleDelay: a bigger polling interval if page is hidden
                 *  - smart: indicates whether poller should only send new
                 *    request if the previous one is resolved
                 *  - catchError: indicates whether poller should get notified
                 *    of error responses
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
                 * Set poller action, argumentsArray, delay, normalDelay,
                 * idleDelay, smart and catchError flags.
                 *
                 * If options.action is defined, then set poller action to
                 * options.action, else if poller.action is undefined, then
                 * set it to defaults.action, else do nothing. The same goes
                 * for argumentsArray, delay, idleDelay, smart and catchError.
                 * Also keep a copy of delay in normalDelay.
                 *
                 * @param options
                 */
                Poller.prototype.set = function(options) {
                    var props = [
                        'action',
                        'argumentsArray',
                        'delay',
                        'idleDelay',
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

                    this.normalDelay = this.delay;
                };

                /**
                 * Start poller.
                 */
                Poller.prototype.start = function() {
                    var target = this.target;
                    var action = this.action;
                    var argumentsArray;
                    var delay = this.delay;
                    var smart = this.smart;
                    var catchError = this.catchError;
                    var self = this;
                    var current;
                    var timestamp;

                    this.deferred = this.deferred || $q.defer();

                    function tick() {
                        // If smart flag is true, then only send new
                        // request if the previous one is resolved.
                        if (!smart ||
                            angular.isUndefined(current) ||
                            current.$resolved) {

                            if (angular.isFunction(self.argumentsArray)) {
                                argumentsArray = self.argumentsArray();
                            } else {
                                argumentsArray = self.argumentsArray.slice(0);
                            }

                            /**
                             * $resource: typeof target === 'function'
                             * Restangular: typeof target === 'object'
                             * $http: typeof target === 'string'
                             */
                            if (angular.isString(self.target)) {

                                /**
                                 * Update argumentsArray and target for $http
                                 *
                                 * @example
                                 * $http.get(url, [config])
                                 * $http.post(url, data, [config])
                                 */
                                argumentsArray.unshift(self.target);
                                target = $http;
                            }

                            timestamp = new Date();
                            current =
                                target[action].apply(target, argumentsArray);
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
                     * Stop and remove all poller services.
                     */
                    reset: function() {
                        this.stopAll();
                        pollers = [];
                    },

                    /**
                     * Increase all poller interval to idleDelay, and restart the ones
                     * that are already running.
                     */
                    delayAll: function() {
                        angular.forEach(pollers, function(p) {
                            p.delay = p.idleDelay;
                            if (angular.isDefined(p.interval)) {
                                p.restart();
                            }
                        });
                    },

                    /**
                     * Reset all poller interval back to its original delay, and restart
                     * the ones that are already running.
                     */
                    resetDelay: function() {
                        angular.forEach(pollers, function(p) {
                            p.delay = p.normalDelay;
                            if (angular.isDefined(p.interval)) {
                                p.restart();
                            }
                        });
                    }
                };
            }
        ]);
})(window.angular);
