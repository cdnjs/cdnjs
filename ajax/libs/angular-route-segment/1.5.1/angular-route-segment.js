/**
 * angular-route-segment 1.5.1
 * https://angular-route-segment.com
 * @author Artem Chivchalov
 * @license MIT License http://opensource.org/licenses/MIT
 */
'use strict';
(function(angular) {

/**
 * @ngdoc module
 * @module route-segment
 * @name route-segment
 * @packageName angular-route-segment
 * @requires ngRoute
 * @description
 * This library is intended to provide the lacking functionality of nested routing to [AngularJS](http://angularjs.org) applications.
 * It is widely known, there are no ways to keep the parent state unchanged when children are updated via routing mechanics - the
 * [$route](https://docs.angularjs.org/api/ngRoute/service/$route) service re-creates the whole scope after a route is changed, losing its state completely.
 * *route-segment* gives you a way to handle this.
 *
 * The library provides two pieces of code: {@link $routeSegment $routeSegment} service and {@link appViewSegment appViewSegment} directive.
 * Both are placed in their own modules which you must include as dependencies in your app module:
 *
 * ```js
 * var app = angular.module('app', ['ngRoute', 'route-segment', 'view-segment']);
 * ```
 * $routeSegment is a layer on top of built-in Angular [$route](https://docs.angularjs.org/api/ngRoute/service/$route) service and is meant to be used instead of it.
 * Its provider exposes configuration methods which can be used to traverse the tree of route segments and setup it properly.
 */
var mod = angular.module( 'route-segment', [] );
/**
 * @ngdoc provider
 * @module route-segment
 * @name $routeSegmentProvider
 * @requires https://docs.angularjs.org/api/ngRoute/provider/$routeProvider $routeProvider
 * @description Replaces [$routeProvider](https://docs.angularjs.org/api/ngRoute/provider/$routeProvider) for the app routing configuration
 *
 * Example:
 * ```js
 * app.config(function ($routeSegmentProvider) {
 *
 *     $routeSegmentProvider.
 *
 *         when('/section1',          's1').
 *         when('/section1/prefs',    's1.prefs').
 *         when('/section1/:id',      's1.itemInfo').
 *     when('/section1/:id/edit', 's1.itemInfo.edit').
 *         when('/section2',          's2').
 *
 *         segment('s1', {
 *             templateUrl: 'templates/section1.html',
 *             controller: MainCtrl}).
 *
 *         within().
 *
 *             segment('home', {
 *                 default: true,
 *                 templateUrl: 'templates/section1/home.html'}).
 *
 *             segment('itemInfo', {
 *                 templateUrl: 'templates/section1/item.html',
 *                 controller: Section1ItemCtrl,
 *                 dependencies: ['id']}).
 *
 *             within().
 *
 *                 segment('overview', {
 *                     default: true
 *                     templateUrl: 'templates/section1/item/overview.html'}).
 *
 *                 segment('edit', {
 *                      templateUrl: 'templates/section1/item/edit.html'}).
 *
 *                 up().
 *
 *             segment('prefs', {
 *                 templateUrl: 'templates/section1/prefs.html'}).
 *
 *             up().
 *
 *         segment('s2', {
 *             templateUrl: 'templates/section2.html',
 *             controller: MainCtrl});
 * });
 * ```
 *
 * Alternatively, you can use this syntax instead of traversing (useful if you want modules to have their own separately defined routes):
 * ```js
 * $routeSegmentProvider.segment('s1', {
 *     templateUrl: 'templates/section1.html',
 *     controller: MainCtrl});
 *
 * $routeSegmentProvider.within('s1').segment('home', {
 *     templateUrl: 'templates/section1/home.html'});
 *
 * $routeSegmentProvider.within('s1').segment('itemInfo', {
 *     templateUrl: 'templates/section1/item.html',
 *     controller: Section1ItemCtrl,
 *     dependencies: ['id']});
 *
 * $routeSegmentProvider.within('s1').within('itemInfo').segment('overview', {
 *     templateUrl: 'templates/section1/item/overview.html'});
 * ```
 *
 * See {@link appViewSegment appViewSegment} for details on views configuration
 */
mod.provider( '$routeSegment',
        ['$routeProvider', function $routeSegmentProvider ($routeProvider) {

    var $routeSegmentProvider = this;

    /**
     * @ngdoc type
     * @module route-segment
     * @name $routeSegmentProvider.options
     * @description Contains configuration options for {@link $routeSegmentProvider $routeSegmentProvider}
     */
    /**
     * @ngdoc property
     * @name $routeSegmentProvider#options
     * @type {$routeSegmentProvider.options}
     * @description Provider configuration object
     */
    var options = $routeSegmentProvider.options = {

        /**
         * @ngdoc property
         * @name $routeSegmentProvider.options#autoLoadTemplates
         * @type {Boolean}
         * @description
         * When true, it will resolve `templateUrl` automatically via ($http)[https://docs.angularjs.org/api/ng/service/$http]
         * service and put its contents into `template`.
         */
        autoLoadTemplates: true,

        /**
         * @ngdoc property
         * @name $routeSegmentProvider.options#strictMode
         * @type {Boolean}
         * @description
         * When true, all attempts to call `within` method on non-existing segments will throw an error (you would
         * usually want this behavior in production). When false, it will transparently create new empty segment
         * (can be useful in isolated tests).
         */
        strictMode: false
    };

    /**
     * @ngdoc property
     * @name $routeSegmentProvider#property
     * @type {Object}
     * @private
     * @description Registered routing segments
     */
    var segments = this.segments = {},
        rootPointer = pointer(segments, null),
        segmentRoutes = {};

    function camelCase(name) {
        return name.replace(/([\:\-\_]+(.))/g, function(_, separator, letter, offset) {
            return offset ? letter.toUpperCase() : letter;
        });
    }

    /**
     * @ngdoc type
     * @module route-segment
     * @name $routeSegmentProvider.Pointer
     * @description Segment traversal element.
     *
     * Each {@link $routeSegmentProvider#segment $routeSegmentProvider#segment} call creates new navigation pointer
     */
    function pointer(segment, parent) {

        if(!segment)
            throw new Error('Invalid pointer segment');

        var lastAddedName;

        return {

            /**
             * @ngdoc method
             * @name $routeSegmentProvider#segment
             * @see $routeSegmentProvider.Pointer#segment
             */
            /**
             * @ngdoc method
             * @name $routeSegmentProvider.Pointer#segment
             * @param {string} name Name of a segment.
             * @param {Object} params Segment's parameters hash. The following params are supported:
             * @param {String|Function} [params.template] provides HTML for the given segment view;
             * @param {String|Function} [params.templateUrl] template to fetch from network via this URL;
             * @param {String|Function} [params.controller] cotroller attached to the given segment view when compiled and linked,
             *   this can be any controller definition AngularJS supports;
             * @param {String} [params.controllerAs] controller alias name, if present the controller will be
             *   published to scope under the controllerAs name
             * @param {Array<String>} [params.dependencies] array of route param names which are forcing the view to recreate when changed;
             * @param {Function} [params.watcher] $watch-function for recreating the view when its returning value is changed;
             * @param {Object<String, Function>} resolve hash of functions or injectable names which should be resolved
             *   prior to instantiating the template and the controller;
             * @param {Object} [params.untilResolved] alternate set of params (e.g. `template` and `controller`)
             *   which should be used before resolving is completed;
             * @param {Object} [params.resolveFailed] alternate set of params which should be used if resolving failed;
             * @param {Boolean} [params.default] when set to true this child segment should be loaded by
             *   default when no child is specified in the route.
             * @returns {$routeSegmentProvider.Pointer} The same level pointer.
             * @description Adds new segment at current pointer level.
             *
             */
            segment: function(name, params) {
                segment[camelCase(name)] = {name: name, params: params};
                lastAddedName = name;
                return this;
            },

            /**
             * @ngdoc method
             * @name $routeSegmentProvider#within
             * @see  $routeSegmentProvider.Pointer#within
             */
            /**
             * @ngdoc method
             * @name $routeSegmentProvider.Pointer#within
             * @param {String=} childName An existing segment's name. If undefined, then the last added segment is selected.
             * @returns {$routeSegmentProvider.Pointer} The pointer to the child segment.
             * @throws {Error} when {@link $routeSegmentProvider.options#strictMode $routeSegmentProvider.options#strictMode} is true and segment with given name is not found
             * @description Traverses into an existing segment, so that subsequent `segment` calls
             * will add new segments as its descendants.
             */
            within: function(childName) {
                var child;
                childName = childName || lastAddedName;

                if(child = segment[camelCase(childName)]) {
                    if(child.children == undefined)
                        child.children = {};
                }
                else {
                    if(options.strictMode)
                        throw new Error('Cannot get into unknown `'+childName+'` segment');
                    else {
                        child = segment[camelCase(childName)] = {params: {}, children: {}};
                    }
                }
                return pointer(child.children, this);
            },

            /**
             * @ngdoc method
             * @name $routeSegmentProvider.Pointer#up
             * @returns {$routeSegmentProvider.Pointer} The pointer which are parent to the current one;
             * @description Traverses up in the tree.
             */
            up: function() {
                return parent;
            },

            /**
             * @ngdoc method
             * @name $routeSegmentProvider.Pointer#up
             * @returns {$routeSegmentProvider.Pointer} The root pointer.
             * @description Traverses to the root.
             */
            root: function() {
                return rootPointer;
            }
        }
    }

    /**
     * @ngdoc method
     * @name $routeSegmentProvider#when
     * @param {String} path Route URL, e.g. '/foo/bar'
     * @param {String} name Fully qualified route name, e.g. 'foo.bar'
     * @param {Object} route Mapping information to be assigned to $route.current on route match.
     * @returns {$routeSegmentProvider} instance
     * @description The shorthand for [$routeProvider.when()](https://docs.angularjs.org/api/ngRoute/provider/$routeProvider#when) method with specified route name.
     */
    $routeSegmentProvider.when = function(path, name, route) {
        if (route == undefined)
            route = {};
        route.segment = name;

        $routeProvider.when(path, route);
        segmentRoutes[name] = path;
        return this;
    };

    // Extending the provider with the methods of rootPointer
    // to start configuration.
    angular.extend($routeSegmentProvider, rootPointer);

    /**
     * @ngdoc service
     * @module route-segment
     * @name $routeSegment
     * @requires https://docs.angularjs.org/api/ng/service/$rootScope $rootScope
     * @requires https://docs.angularjs.org/api/ng/service/$q $q
     * @requires https://docs.angularjs.org/api/ng/service/$http $http
     * @requires https://docs.angularjs.org/api/ng/service/$templateCache $templateCache
     * @requires https://docs.angularjs.org/api/ngRoute/service/$route $route
     * @requires https://docs.angularjs.org/api/ngRoute/service/$routeParams $routeParams
     * @requires https://docs.angularjs.org/api/auto/service/$injector $injector
     * @requires https://docs.angularjs.org/api/ng/service/$location $location
     * @description Provides state and operations for the current segment
     */
    this.$get = ['$rootScope', '$q', '$http', '$templateCache', '$route', '$routeParams', '$injector',
                 function($rootScope, $q, $http, $templateCache, $route, $routeParams, $injector) {

        var $routeSegment = {

                /**
                 * @ngdoc property
                 * @name $routeSegment#name
                 * @type {String}
                 * @description Fully qualified name of current active route
                 */
                name: '',

                /**
                 * @ngdoc property
                 * @name $routeSegment#$routeParams
                 * @type {Object}
                 * @description A copy of `$routeParams` in its state of the latest successful segment update.
                 *
                 * It may be not equal to `$routeParams` while some resolving is not completed yet. Should be used instead of original
                 * `$routeParams` in most cases.
                 */
                $routeParams: angular.copy($routeParams),

                /**
                 * @ngdoc property
                 * @name $routeSegment#chain
                 * @type {Array.<$routeSegment.Segment>}
                 * @description Array of segments splitted by each level separately. Each item contains the following properties:
                 *
                 * - `name` is the name of a segment;
                 * - `params` is the config params hash of a segment;
                 * - `locals` is a hash which contains resolve results if any;
                 * - `reload` is a function to reload a segment (restart resolving, reinstantiate a controller, etc)
                 */
                chain: [],

                /**
                 * @ngdoc method
                 * @name $routeSegment#startsWith
                 * @param {String} val segment name to test
                 * @returns {Boolean}
                 * @description Helper method for checking whether current route starts with the given string
                 */
                startsWith: function (val) {
                    var regexp = new RegExp('^'+val);
                    return regexp.test($routeSegment.name);
                },

                /**
                 * @ngdoc method
                 * @name $routeSegment#contains
                 * @param {String} val segment name to test
                 * @returns {Boolean} true if given segment present in the current route
                 * @description Helper method for checking whether current route contains the given string
                 */
                contains: function (val) {
                    for(var i=0; i<this.chain.length; i++)
                        if(this.chain[i] && this.chain[i].name == val)
                            return true;
                    return false;
                },

                /**
                 * @ngdoc method
                 * @name $routeSegment#getSegmentUrl
                 * @param {String} segmentName The name of a segment as defined in `when()`
                 * @param {Object} routeParams Route params hash to be put into route URL template
                 * @returns {String} segment url
                 * @throws {Error} if url for the given name is not found
                 * @description A method for reverse routing which can return the route URL for the specified segment name
                 */
                getSegmentUrl: function(segmentName, routeParams) {
                    var url, i, m;
                    if(!segmentRoutes[segmentName])
                        throw new Error('Can not get URL for segment with name `'+segmentName+'`');

                    routeParams = angular.extend({}, $routeParams, routeParams || {});

                    url = segmentRoutes[segmentName];
                    for(i in routeParams) {
                        var regexp = new RegExp('\:'+i+'[\*\?]?','g');
                        url = url.replace(regexp, routeParams[i]);
                    }
                    url = url.replace(/\/\:.*?\?/g, '');

                    if(m = url.match(/\/\:([^\/]*)/))
                        throw new Error('Route param `'+m[1]+'` is not specified for route `'+segmentRoutes[segmentName]+'`');

                    return url;
                }
        };

        var resolvingSemaphoreChain = {};

        // When a route changes, all interested parties should be notified about new segment chain
        $rootScope.$on('$routeChangeSuccess', function(event, args) {

            var route = args.$route || args.$$route; 
            if(route && route.segment) {

                var segmentName = route.segment;
                var segmentNameChain = segmentName.split(".");
                var updates = [], lastUpdateIndex = -1;

                for(var i=0; i < segmentNameChain.length; i++) {
                    
                    var newSegment = getSegmentInChain( i, segmentNameChain );

                    if(resolvingSemaphoreChain[i] != newSegment.name || updates.length > 0 || isDependenciesChanged(newSegment)) {

                        if($routeSegment.chain[i] && $routeSegment.chain[i].name == newSegment.name &&
                            updates.length == 0 && !isDependenciesChanged(newSegment))
                            // if we went back to the same state as we were before resolving new segment
                            resolvingSemaphoreChain[i] = newSegment.name;
                        else {
                            updates.push({index: i, newSegment: newSegment});
                            lastUpdateIndex = i;
                        }
                    }
                }

                var curSegmentPromise = $q.when();

                if(updates.length > 0) {

                    for(var i=0; i<updates.length; i++) {
                        (function(i) {
                            curSegmentPromise = curSegmentPromise.then(function() {

                                return updateSegment(updates[i].index, updates[i].newSegment);

                            }).then(function(result) {

                                if(result.success != undefined) {

                                    broadcast(result.success);

                                    for(var j = updates[i].index + 1; j < $routeSegment.chain.length; j++) {

                                        if($routeSegment.chain[j]) {
                                            if ($routeSegment.chain[j].clearWatcher) {
                                                $routeSegment.chain[j].clearWatcher();
                                            }
                                            
                                            $routeSegment.chain[j] = null;
                                            updateSegment(j, null);
                                        }
                                    }
                                }
                            })
                        })(i);
                    }
                }

                curSegmentPromise.then(function() {

                    // Removing redundant segment in case if new segment chain is shorter than old one
                    if($routeSegment.chain.length > segmentNameChain.length) {
                        var oldLength = $routeSegment.chain.length;
                        var shortenBy = $routeSegment.chain.length - segmentNameChain.length;
                        $routeSegment.chain.splice(-shortenBy, shortenBy);
                        for(var i=segmentNameChain.length; i < oldLength; i++) {
                            updateSegment(i, null);
                            lastUpdateIndex = $routeSegment.chain.length-1;
                        }
                    }
                }).then(function() {

                    var defaultChildUpdatePromise = $q.when();

                    if(lastUpdateIndex == $routeSegment.chain.length-1) {

                        var curSegment = getSegmentInChain(lastUpdateIndex, $routeSegment.name.split("."));

                        while(curSegment) {
                            var children = curSegment.children, index = lastUpdateIndex+1;
                            curSegment = null;
                            for (var i in children) {
                                (function(i, children, index) {
                                    if (children[i].params['default']) {
                                        defaultChildUpdatePromise = defaultChildUpdatePromise.then(function () {
                                            return updateSegment(index, {name: children[i].name, params: children[i].params})
                                                .then(function (result) {
                                                    if (result.success) broadcast(result.success);
                                                });
                                        });
                                        curSegment = children[i];
                                        lastUpdateIndex = index;
                                    }
                                })(i, children, index);


                            }
                        }
                    }

                    return defaultChildUpdatePromise;
                });
            }
        });

        function isDependenciesChanged(segment) {

            var result = false;
            if(segment.params.dependencies)
                angular.forEach(segment.params.dependencies, function(name) {
                    if(!angular.equals($routeSegment.$routeParams[name], $routeParams[name]))
                        result = true;
                });
            return result;
        }

        function updateSegment(index, segment) {

            if($routeSegment.chain[index] && $routeSegment.chain[index].clearWatcher) {
                $routeSegment.chain[index].clearWatcher();
            }

            if(!segment) {
                resolvingSemaphoreChain[index] = null;
                broadcast(index);
                return;
            }

            resolvingSemaphoreChain[index] = segment.name;

            if(segment.params.untilResolved) {
                return resolve(index, segment.name, segment.params.untilResolved)
                    .then(function(result) {
                        if(result.success != undefined)
                            broadcast(index);
                        return resolve(index, segment.name, segment.params);
                    })
            }
            else
                return resolve(index, segment.name, segment.params);
        }

        function resolve(index, name, params) {

            var locals = angular.extend({}, params.resolve);

            angular.forEach(locals, function(value, key) {
                locals[key] = angular.isString(value) ? $injector.get(value) : $injector.invoke(value);
            });

            if(params.template) {

                locals.$template = params.template;
                if(angular.isFunction(locals.$template))
                    locals.$template = $injector.invoke(locals.$template);
            }

            if(options.autoLoadTemplates && params.templateUrl) {

                locals.$template = params.templateUrl;
                if(angular.isFunction(locals.$template))
                    locals.$template = $injector.invoke(locals.$template);

                locals.$template =
                    $http.get(locals.$template, {cache: $templateCache})
                        .then(function (response) {
                            return response.data;
                        });
            }

            return $q.all(locals).then(

                    function(resolvedLocals) {

                        if(resolvingSemaphoreChain[index] != name)
                            return $q.reject();

                        /**
                         * @ngdoc type
                         * @module route-segment
                         * @name $routeSegment.Segment
                         * @description Segment record
                         */
                        $routeSegment.chain[index] = {
                                /**
                                 * @ngdoc property
                                 * @name $routeSegment.Segment#name
                                 * @type {String}
                                 * @description segment name as registered with {@link $routeSegmentProvider#segment $routeSegmentProvider#segment}
                                 */
                                name: name,
                                /**
                                 * @ngdoc property
                                 * @name $routeSegment.Segment#params
                                 * @type {Object=}
                                 * @description [$routeParams](https://docs.angularjs.org/api/ngRoute/provider/$routeProvider) parameters for segment
                                 */
                                params: params,
                                /**
                                 * @ngdoc property
                                 * @name $routeSegment.Segment#locals
                                 * @type {Object=}
                                 * @description resolved segment data
                                 */
                                locals: resolvedLocals,
                                /**
                                 * @ngdoc method
                                 * @name $routeSegment.Segment#reload
                                 * @description reloads current segment from scratch
                                 */
                                reload: function() {
                                    var originalSegment = getSegmentInChain(index, $routeSegment.name.split("."));
                                    updateSegment(index, originalSegment).then(function(result) {
                                        if(result.success != undefined)
                                            broadcast(index);
                                    })
                                }
                            };

                        if(params.watcher) {

                            var getWatcherValue = function() {
                                if(!angular.isFunction(params.watcher) && !angular.isArray(params.watcher))
                                    throw new Error('Watcher is not a function in segment `'+name+'`');

                                return $injector.invoke(
                                    params.watcher,
                                    {},
                                    {segment: $routeSegment.chain[index]});
                            }

                            var lastWatcherValue = getWatcherValue();

                            $routeSegment.chain[index].clearWatcher = $rootScope.$watch(
                                getWatcherValue,
                                function(value) {
                                    if(value == lastWatcherValue) // should not being run when $digest-ing at first time
                                        return;
                                    lastWatcherValue = value;
                                    $routeSegment.chain[index].reload();
                                })
                        }

                        return {success: index};
                    },

                    function(error) {

                        if(params.resolveFailed) {
                            var newResolve = {error: function() { return $q.when(error); }};
                            return resolve(index, name, angular.extend({resolve: newResolve}, params.resolveFailed));
                        }
                        else
                            throw new Error('Resolving failed with a reason `'+error+'`, but no `resolveFailed` ' +
                                            'provided for segment `'+name+'`');
                    })
        }

        function broadcast(index) {

            $routeSegment.$routeParams = angular.copy($routeParams);

            $routeSegment.name = '';
            for(var i=0; i<$routeSegment.chain.length; i++)
                if($routeSegment.chain[i])
                    $routeSegment.name += $routeSegment.chain[i].name+".";
            $routeSegment.name = $routeSegment.name.substr(0, $routeSegment.name.length-1);

            /**
             * @ngdoc event
             * @name $routeSegment#routeSegmentChange
             * @eventType broadcast on $rootScope
             * @param {Object} object object containing
             * - `index` {number} index id in {@link $routeSegment#chain $routeSegment#chain}
             * - segment {$routeSegment.Segment|Null} current segment
             * @description event is thrown when segment is loaded
             */
            $rootScope.$broadcast( 'routeSegmentChange', {
                index: index,
                segment: $routeSegment.chain[index] || null } );
        }

        function getSegmentInChain(segmentIdx, segmentNameChain) {

            if(!segmentNameChain)
                return null;

            if(segmentIdx >= segmentNameChain.length)
                return null;

            var curSegment = segments, nextName;
            for(var i=0;i<=segmentIdx;i++) {

                nextName = segmentNameChain[i];

                if(curSegment[ camelCase(nextName) ] != undefined)
                    curSegment = curSegment[ camelCase(nextName) ];

                if(i < segmentIdx)
                    curSegment = curSegment.children;
            }

            return {
                name: nextName,
                params: curSegment.params,
                children: curSegment.children
            };
        }

        return $routeSegment;
    }];
}]);

/**
 * @ngdoc filter
 * @module route-segment
 * @name routeSegmentUrl
 * @param {String} name fully qualified segment name
 * @param {Object} params params to resolve segment
 * @returns {string} given url
 * @description Returns url for a given segment
 *
 * Usage:
 * ```html
 * <a ng-href="{{ 'index.list' | routeSegmentUrl }}">
 * <a ng-href="{{ 'index.list.itemInfo' | routeSegmentUrl: {id: 123} }}">
 * ```
 */
mod.filter('routeSegmentUrl', ['$routeSegment', function($routeSegment) {
    var filter = function(segmentName, params) {
        return $routeSegment.getSegmentUrl(segmentName, params);
    };
    filter.$stateful = true;
    return filter;
}]);

/**
 * @ngdoc filter
 * @module route-segment
 * @name routeSegmentEqualsTo
 * @param {String} name fully qualified segment name
 * @returns {boolean} true if given segment name is the active one
 * @description Check whether active segment equals to the given segment name
 *
 * Usage:
 * ```html
 * <li ng-class="{active: ('index.list' | routeSegmentEqualsTo)}">
 * ```
 */
mod.filter('routeSegmentEqualsTo', ['$routeSegment', function($routeSegment) {
    var filter = function(value) {
        return $routeSegment.name == value;
    };
    filter.$stateful = true;
    return filter;
}]);

/**
 * @ngdoc filter
 * @module route-segment
 * @name routeSegmentStartsWith
 * @param {String} name segment name
 * @returns {boolean} true if active segment name begins with given name
 * @description Check whether active segment starts with the given segment name
 *
 * Usage:
 * ```html
 * <li ng-class="{active: ('section1' | routeSegmentStartsWith)}">
 * ```
 */
mod.filter('routeSegmentStartsWith', ['$routeSegment', function($routeSegment) {
    var filter = function(value) {
        return $routeSegment.startsWith(value);
    };
    filter.$stateful = true;
    return filter;
}]);

/**
 * @ngdoc filter
 * @module route-segment
 * @name routeSegmentContains
 * @param {String} name segment name
 * @returns {boolean} true if active segment contains given name
 * @description Check whether active segment contains the given segment name
 *
 * Usage:
 * ```html
 * <li ng-class="{active: ('itemInfo' | routeSegmentContains)}">
 * ```
 */
mod.filter('routeSegmentContains', ['$routeSegment', function($routeSegment) {
    var filter = function(value) {
        return $routeSegment.contains(value);
    };
    filter.$stateful = true;
    return filter;
}]);

/**
 * @ngdoc filter
 * @module route-segment
 * @name routeSegmentParam
 * @param {String} name param name
 * @returns {string|undefined} param value or undefined
 * @description Returns segment parameter by name
 *
 * Usage:
 * ```html
 * <li ng-class="{active: ('index.list.itemInfo' | routeSegmentEqualsTo) && ('id' | routeSegmentParam) == 123}">
 * ```
 */
mod.filter('routeSegmentParam', ['$routeSegment', function($routeSegment) {
    var filter = function(value) {
        return $routeSegment.$routeParams[value];
    };
    filter.$stateful = true;
    return filter;
}]);


})(angular);;'use strict';

/**
 * @ngdoc module
 * @module view-segment
 * @name view-segment
 * @packageName angular-route-segment
 * @requires route-segment
 * @description
 * view-segment is a replacement for [ngView](https://docs.angularjs.org/api/ngRoute/directive/ngView) AngularJS directive.
 *
 * {@link appViewSegment appViewSegment} tags in the DOM will be populated with the corresponding route segment item.
 * You must provide a segment index as an argument to this directive to make it aware about which segment level in the tree
 * it should be linked to.
 *
 * *index.html*:
 * ```html
 * <ul>
 *     <li ng-class="{active: $routeSegment.startsWith('s1')}">
 *         <a href="/section1">Section 1</a>
 *     </li>
 *     <li ng-class="{active: $routeSegment.startsWith('s2')}">
 *         <a href="/section2">Section 2</a>
 *     </li>
 * </ul>
 * <div id="contents" app-view-segment="0"></div>
 * ```
 *
 * *section1.html*: (it will be loaded to div#contents in index.html)
 * ```html
 * <h4>Section 1</h4>
 * Section 1 contents.
 * <div app-view-segment="1"></div>
 * ```
 *
 * ...etc. You can reach any nesting level here. Every view will be handled independently, keeping the state of top-level views.
 *
 * You can also use filters to define link hrefs. It will resolve segment URLs automatically:
 *
 * ```html
 * <ul>
 *     <li ng-class="{active: ('s1' | routeSegmentStartsWith)}">
 *         <a href="{{ 's1' | routeSegmentUrl }}">Section 1</a>
 *     </li>
 *     <li ng-class="{active: ('s2' | routeSegmentStartsWith)}">
 *         <a href="{{ 's2' | routeSegmentUrl }}">Section 2</a>
 *     </li>
 * </ul>
 * ```
 */
/**
 * @ngdoc directive
 * @module view-segment
 * @name appViewSegment
 * @requires https://docs.angularjs.org/api/ngRoute/service/$route $route
 * @requires https://docs.angularjs.org/api/ng/service/$compile $compile
 * @requires https://docs.angularjs.org/api/ng/service/$controller $controller
 * @requires https://docs.angularjs.org/api/ngRoute/service/$routeParams $routeParams
 * @requires $routeSegment
 * @requires https://docs.angularjs.org/api/ng/service/$q $q
 * @requires https://docs.angularjs.org/api/auto/service/$injector $injector
 * @requires https://docs.angularjs.org/api/ng/service/$timeout $timeout
 * @requires https://docs.angularjs.org/api/ng/service/$animate $animate
 * @restrict ECA
 * @priority 400
 * @param {String} appViewSegment render depth level
 * @description Renders active segment as specified by parameter
 *
 * It is based on [ngView directive code](https://github.com/angular/angular.js/blob/master/src/ngRoute/directive/ngView.js)
 */

(function(angular) {

    angular.module( 'view-segment', [ 'route-segment' ] ).directive( 'appViewSegment',
    ['$route', '$compile', '$controller', '$routeParams', '$routeSegment', '$q', '$injector', '$timeout', '$animate',
        function($route, $compile, $controller, $routeParams, $routeSegment, $q, $injector, $timeout, $animate) {

            return {
                restrict : 'ECA',
                priority: 400,
                transclude: 'element',

                compile : function(tElement, tAttrs) {

                    return function($scope, element, attrs, ctrl, $transclude) {

                        var currentScope, currentElement, currentSegment = {}, onloadExp = tAttrs.onload || '',
                        viewSegmentIndex = parseInt(tAttrs.appViewSegment), updatePromise, previousLeaveAnimation;

                        if($routeSegment.chain[viewSegmentIndex]) {
                            updatePromise = $timeout(function () {
                                update($routeSegment.chain[viewSegmentIndex]);
                            }, 0);
                        }
                        else {
                            update();
                        }

                        // Watching for the specified route segment and updating contents
                        $scope.$on('routeSegmentChange', function(event, args) {

                            if(updatePromise)
                                $timeout.cancel(updatePromise);

                            if(args.index == viewSegmentIndex && currentSegment != args.segment) {
                                update(args.segment);
                            }
                        });

                        function clearContent() {
                            if (previousLeaveAnimation) {
                                $animate.cancel(previousLeaveAnimation);
                                previousLeaveAnimation = null;
                            }

                            if (currentScope) {
                                currentScope.$destroy();
                                currentScope = null;
                            }
                            if (currentElement) {
                                previousLeaveAnimation = $animate.leave(currentElement);
                                if(previousLeaveAnimation) {
                                    previousLeaveAnimation.then(function () {
                                        previousLeaveAnimation = null;
                                    });
                                }
                                currentElement = null;
                            }
                        }

                        function update(segment) {

                            currentSegment = segment;

                            var newScope = $scope.$new();

                            var clone = $transclude(newScope, function(clone) {
                                if(segment) {
                                    clone.data('viewSegment', segment);
                                }
                                $animate.enter(clone, null, currentElement || element);
                                clearContent();
                            });

                            currentElement = clone;
                            currentScope = newScope;
                            /*
                             * @ngdoc event
                             * @name appViewSegment#$viewContentLoaded
                             * @description Indicates that segment content has been loaded and transcluded
                             */
                            currentScope.$emit('$viewContentLoaded');
                            currentScope.$eval(onloadExp);
                        }
                    }
                }
            }
        }]);

    angular.module( 'view-segment').directive( 'appViewSegment',
        ['$route', '$compile', '$controller', function($route, $compile, $controller) {

                return {
                    restrict: 'ECA',
                    priority: -400,
                    link: function ($scope, element) {

                        var segment = element.data('viewSegment') || {};

                        var locals = angular.extend({}, segment.locals),
                                template = locals && locals.$template;

                            if(template) {
                                element.html(template);
                            }

                            var link = $compile(element.contents());

                            if (segment.params && segment.params.controller) {
                                locals.$scope = $scope;
                                var controller = $controller(segment.params.controller, locals);
                                if(segment.params.controllerAs)
                                    $scope[segment.params.controllerAs] = controller;
                                element.data('$ngControllerController', controller);
                                element.children().data('$ngControllerController', controller);
                            }

                            link($scope);
                    }
                }

            }]);

})(angular);
