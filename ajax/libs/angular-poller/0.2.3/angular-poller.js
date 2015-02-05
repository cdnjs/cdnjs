/**
 * Poller service for AngularJS
 * @version v0.2.3
 * @link http://github.com/emmaguo/angular-poller
 * @license MIT
 */

(function (window, angular, undefined) {

    'use strict';

    angular.module('emguo.poller', [])

        /*
         * Usage:
         * - Simple example:
         *      var myPoller = poller.get(myResource);
         *      myPoller.promise.then(successCallback, errorCallback, notifyCallback);
         *
         * - Advanced example:
         *      var myPoller = poller.get(myResource, {
         *          action: 'get',
         *          delay: 6000,
         *          params: {
         *              verb: 'greet',
         *              salutation: 'Hello'
         *          },
         *          smart: true
         *      });
         *      myPoller.promise.then(successCallback, errorCallback, notifyCallback);
         *
         * Most likely you only need the notifyCallback, in which case you will use:
         *      myPoller.promise.then(null, null, notifyCallback);
         */
        .factory('poller', function ($interval, $q) {

            var pollers = [], // Poller registry

                /*
                 * Default settings:
                 * - Resource action can be anything. By default it is query.
                 * - Default delay is 5000 ms.
                 * - Default values for url parameters.
                 * - Smart flag is set to false by default. If it is set to true then poller will only send new
                 *   request after the previous one is resolved.
                 *
                 * Angular $resource:
                 * (http://docs.angularjs.org/api/ngResource.$resource)
                 */
                defaults = {
                    action: 'query',
                    delay: 5000,
                    params: {},
                    smart: false
                },

                /*
                 * Poller model:
                 *  - resource
                 *  - action
                 *  - delay
                 *  - params
                 *  - smart
                 *  - promise
                 *  - interval
                 */
                Poller = function (resource, options) {

                    this.resource = resource;
                    this.set(options);
                },

                // Find poller by resource in poller registry.
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

                /*
                 * Set poller action, delay, params and smart flag.
                 *
                 * If options.params is defined, then set poller params to options.params,
                 * else if poller.params is undefined, then set it to defaults.params,
                 * else do nothing.
                 *
                 * The same goes for poller.action, poller.delay and poller.smart.
                 */
                set: function (options) {

                    angular.forEach(['action', 'delay', 'params', 'smart'], function (prop) {
                        if (options && options[prop]) {
                            this[prop] = options[prop];
                        } else if (!this[prop]) {
                            this[prop] = defaults[prop];
                        }
                    }, this);
                },

                // Start poller service
                start: function () {

                    var resource = this.resource,
                        action = this.action,
                        delay = this.delay,
                        params = this.params,
                        smart = this.smart,
                        self = this,
                        current,
                        timestamp;

                    if (!this.deferred) {
                        this.deferred = $q.defer();
                    }

                    function tick() {

                        // If smart flag is true, then only send new request after the previous one is resolved.
                        if (!smart || !angular.isDefined(current) || current.$resolved) {

                            timestamp = new Date();
                            current = resource[action](params, function (data) {

                                // Ignore the response if request is sent before poller is stopped.
                                if (!angular.isDefined(self.stopTimestamp) || timestamp >= self.stopTimestamp) {
                                    self.deferred.notify(data);
                                }
                            });
                        }
                    }

                    tick();
                    this.interval = $interval(tick, delay);

                    this.promise = this.deferred.promise;
                },

                // Stop poller service if it is running
                stop: function () {

                    if (angular.isDefined(this.interval)) {
                        $interval.cancel(this.interval);
                        this.interval = undefined;
                        this.stopTimestamp = new Date();
                    }
                },

                // Restart poller service
                restart: function () {
                    this.stop();
                    this.start();
                }
            });

            return {

                /*
                 * Return a singleton instance of a poller.
                 * If poller does not exist, then register and start it.
                 * Otherwise return it and restart it if necessary.
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

                // Total number of pollers in poller registry
                size: function () {
                    return pollers.length;
                },

                // Stop all poller services
                stopAll: function () {
                    angular.forEach(pollers, function (p) {
                        p.stop();
                    });
                },

                // Restart all poller services
                restartAll: function () {
                    angular.forEach(pollers, function (p) {
                        p.restart();
                    });
                },

                // Stop and remove all poller services
                reset: function () {
                    this.stopAll();
                    pollers = [];
                }
            };
        }
    );
})(window, window.angular);