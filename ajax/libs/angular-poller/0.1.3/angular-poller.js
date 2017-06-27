/**
 * Poller service for AngularJS
 * @version v0.1.3
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
         *          }
         *      });
         *      myPoller.promise.then(successCallback, errorCallback, notifyCallback);
         *
         * Most likely you only need the notifyCallback, in which case you will use:
         *      myPoller.promise.then(null, null, notifyCallback);
         */
        .factory('poller', function ($timeout, $q) {

            var pollers = [], // Poller registry

                /*
                 * Default settings:
                 * - Resource action can be anything. By default it is query.
                 * - Default delay is 5000 ms.
                 * - Default values for url parameters.
                 *
                 * Angular $resource:
                 * (http://docs.angularjs.org/api/ngResource.$resource)
                 */
                defaults = {
                    action: 'query',
                    delay: 5000,
                    params: {}
                },

                /*
                 * Poller model:
                 *  - resource
                 *  - action
                 *  - delay
                 *  - params
                 *  - promise
                 *  - timeout
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
                 * Set poller action, delay and params.
                 *
                 * If options.params is defined, then set poller params to options.params,
                 * else if poller.params is undefined, then set it to defaults.params,
                 * else do nothing.
                 *
                 * The same goes for poller.action and poller.delay.
                 */
                set: function (options) {

                    angular.forEach(['action', 'delay', 'params'], function (prop) {
                        if (options && options[prop]) {
                            this[prop] = options[prop];
                        } else if (!this[prop]) {
                            this[prop] = defaults[prop];
                        }
                    }, this);
                },

                // Start poller service
                start: function () {

                    var deferred = $q.defer(),
                        resource = this.resource,
                        action = this.action,
                        delay = this.delay,
                        params = this.params,
                        self = this;

                    (function tick() {
                        resource[action](params, function (data) {
                            deferred.notify(data);
                        });

                        self.timeout = $timeout(tick, delay);
                    })();

                    this.promise = deferred.promise;
                },

                // Stop poller service
                stop: function () {

                    $timeout.cancel(this.timeout);
                    this.timeout.$$timeoutId = null;
                },

                /*
                 * Restart poller service
                 *
                 * If poller is still running, then restart it right away.
                 * If poller is stopped, start it again.
                 */
                restart: function () {

                    if (this.timeout.$$timeoutId) {
                        this.stop();
                    }
                    this.start();
                }
            });

            return {

                /*
                 * Return a singleton instance of a poller.
                 * If poller does not exist, then register and start it.
                 * Otherwise return it and restart it if neccessary.
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