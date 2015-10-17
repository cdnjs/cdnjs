/*
 * Breeze Angular Module ("breeze.angular") containing the "breeze" service
 * for preparing breeze applications to work with angular.
 *
 * The "breeze" that tells Breeze to
 * - use $q for its promises rather than Q.js
 * - use $http for AJAX calls.
 *
 * The object returned by the service is the breeze client object
 *
 * Implemented with an Angular provider so that you
 * can configure some of Breeze during the launch 'config' phase.
 *
 * However, you must at least depend on this service after the angular config phase
 * so that Breeze can learn about the $q and $http services for the app
 * as these services only become available during the 'run' phase.
 *
 * Install:
 *   1) load this script after the breeze script (e.g. breeze.debug.js)
 *   2) make your app module depend upon the 'breeze.angular' module
 *   3) ensure some component depends on 'breeze' service before calling a breeze function,
 * --------------------------------------------
 * Example #1: Configure when app boots
 *
 * // Make the app depend on the 'breeze.angular' module
 * var app = angular.module('app', [
 *     'breeze.angular'
 *     // ... other dependencies ...
 * ]);
 *
 * // Ensure that breeze is minimally configured by loading it when app runs
 * app.run(['breeze', function (breeze) { }]); // do nothing but you could
 *
 * --------------------------------------------
 * Example #2: Configure in 'config' phase and on first use of breeze
 *
 * // Make the app depend on the 'breeze.angular' module
 * var app = angular.module('app', [
 *     'breeze.angular'
 *     // ... other dependencies ...
 * ]);
 *
 * // Configure static features of breeze through its "provider"
 * app.config(['breezeProvider', function (bp) {
 *   // Convert server-side PascalCase to client-side camelCase property names
 *   bp.NamingConvention.camelCase.setAsDefault();
 * }]);
 *
 * ... elsewhere ...
 *
 * // Depend on the breeze service when app runs so Breeze gets app's $q and $http
 * // The 'entityManagerFactory' is a good choice to inject it because
 * // the first use of breeze probably involves the EntityManager.
 * angular.module('app').factory('entityManagerFactory', ['breeze', emFactory]);
 *
 * function emFactory(breeze) {
 *
 *   // Identify the endpoint for the remote data service
 *   var serviceRoot = window.location.protocol + '//' + window.location.host + '/';
 *   var serviceName = serviceRoot + 'breeze/breeze'; // breeze Web API controller
 *
 *   var factory = {
 *     newManager: function() {return new breeze.EntityManager(serviceName);},
 *     serviceName: serviceName
 *   };
 *
 *   return factory;
 * }
 */
(function (definition) {
    if (typeof breeze === "object") {
        definition(breeze);
    } else if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        // CommonJS or Node
        var b = require('breeze');
        definition(b);
    } else if (typeof define === "function" && define["amd"] && !window.breeze) {
        // Requirejs / AMD
        define(['breeze'], definition);
    } else {
        throw new Error("Can't find breeze");
    }
}(function (breeze) {
    'use strict';

    angular.module('breeze.angular', [], ['$provide', function ($provide) {
        $provide.provider({ breeze: breezeProvider });
    }]);

    function breezeProvider() {

        // config breeze to use the native 'backingStore' modeling adapter appropriate for Ng
        // 'backingStore' is the Breeze default when it detects that KnockoutJS is absent
        // but we set it here to be explicit.
        breeze.config.initializeAdapterInstance('modelLibrary', 'backingStore', true);

        // Expose breeze and add some sugar to provider for stuff we often configure
        this.breeze = breeze;
        this.NamingConvention = breeze.NamingConvention;
        this.initializeDataServiceAdapter = initializeDataServiceAdapter;
        this.$get = ['$http', '$q', breezeFactory];

        function breezeFactory($http, $q) {
            useNgHttp();
            useNgPromises();
            return breeze;

            /* implementation */
            function useNgHttp() {
                // configure breeze to use Angular's $http ajax adapter
                var ajax = breeze.config.initializeAdapterInstance('ajax', 'angular', true);
                ajax.setHttp($http); // use this app's $http instance
            }

            function useNgPromises() {
                if (breeze.config.setQ) {
                    breeze.config.setQ($q);
                    // add class methods that Breeze wants that $q lacks
                    $q.resolve = $q.fcall = $q.when;
                } else {
                    throw new Error(
                        'Cannot use the breeze angular service with breeze.version=' + breeze.version);
                }
                // Todo: deprecate once we're sure how Breeze exposes promises
                if (!breeze.Q){
                    breeze.Q = $q; // HACK ... until dependencies can get it another way
                }
            }
        }

        function initializeDataServiceAdapter(adapterName, isDefault) {
            return breeze.config.initializeAdapterInstance('dataService', adapterName, isDefault);
        }
    }

}));