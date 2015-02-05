/**
 * angular-route-segment 1.3.2
 * https://angular-route-segment.com
 * @author Artem Chivchalov
 * @license MIT License http://opensource.org/licenses/MIT
 */
'use strict';

(function(angular) {

var mod = angular.module( 'route-segment', [] );
mod.provider( '$routeSegment',
        ['$routeProvider', function($routeProvider) {
    
    var $routeSegmentProvider = this;
    
    var options = $routeSegmentProvider.options = {
            
        /**
         * When true, it will resolve `templateUrl` automatically via $http service and put its
         * contents into `template`.
         * @type {boolean}
         */
        autoLoadTemplates: true,
        
        /**
         * When true, all attempts to call `within` method on non-existing segments will throw an error (you would
         * usually want this behavior in production). When false, it will transparently create new empty segment
         * (can be useful in isolated tests).
         * @type {boolean}
         */
        strictMode: false
    };
    
    var segments = this.segments = {},
        rootPointer = pointer(segments, null),
        segmentRoutes = {};
    
    function camelCase(name) {
        return name.replace(/([\:\-\_]+(.))/g, function(_, separator, letter, offset) {
            return offset ? letter.toUpperCase() : letter;
        });
    }
    
    function pointer(segment, parent) {
        
        if(!segment)
            throw new Error('Invalid pointer segment');
        
        var lastAddedName;
        
        return {
            
            /**
             * Adds new segment at current pointer level.
             * 
             * @param string} name Name of a segment.
             * @param {Object} params Segment's parameters hash. The following params are supported:
             *                        - `template` provides HTML for the given segment view;
             *                        - `templateUrl` is a template should be fetched from network via this URL;
             *                        - `controller` is attached to the given segment view when compiled and linked,
             *                              this can be any controller definition AngularJS supports;
             *                        - `dependencies` is an array of route param names which are forcing the view 
             *                              to recreate when changed;
             *                        - `watcher` is a $watch-function for recreating the view when its returning value
             *                              is changed;
             *                        - `resolve` is a hash of functions or injectable names which should be resolved
             *                              prior to instantiating the template and the controller;
             *                        - `untilResolved` is the alternate set of params (e.g. `template` and `controller`)
             *                              which should be used before resolving is completed; 
             *                        - `resolveFailed` is the alternate set of params which should be used 
             *                              if resolving failed;
             *                              
             * @returns {Object} The same level pointer.
             */
            segment: function(name, params) {
                segment[camelCase(name)] = {params: params};
                lastAddedName = name;
                return this;
            },

            /**
             * Traverses into an existing segment, so that subsequent `segment` calls
             * will add new segments as its descendants.
             *
             * @param {string} childName An existing segment's name. If undefined, then the last added segment is selected.
             * @returns {Object} The pointer to the child segment.
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
             * Traverses up in the tree.
             * @returns {Object} The pointer which are parent to the current one;
             */
            up: function() {
                return parent;
            },
            
            /**
             * Traverses to the root.
             * @returns The root pointer.
             */
            root: function() {
                return rootPointer;
            }
        }
    }
    
    /**
     * The shorthand for $routeProvider.when() method with specified route name.
     * @param {string} route Route URL, e.g. '/foo/bar'
     * @param {string} name Fully qualified route name, e.g. 'foo.bar'
     */
    $routeSegmentProvider.when = function(route, name) {
        $routeProvider.when(route, {segment: name});
        segmentRoutes[name] = route;
        return this;
    };
    
    // Extending the provider with the methods of rootPointer
    // to start configuration.
    angular.extend($routeSegmentProvider, rootPointer);
    
        
    // the service factory
    this.$get = ['$rootScope', '$q', '$http', '$templateCache', '$route', '$routeParams', '$injector',
                 function($rootScope, $q, $http, $templateCache, $route, $routeParams, $injector) {
                
        var $routeSegment = {    
                
                /**
                 * Fully qualified name of current active route
                 * @type {string}
                 */
                name: '',

                /**
                 * A copy of `$routeParams` in its state of the latest successful segment update. It may be not equal
                 * to `$routeParams` while some resolving is not completed yet. Should be used instead of original
                 * `$routeParams` in most cases.
                 * @type {Object}
                 */
                $routeParams: angular.copy($routeParams),
                
                /**
                 * Array of segments splitted by each level separately. Each item contains the following properties:
                 * - `name` is the name of a segment;
                 * - `params` is the config params hash of a segment;
                 * - `locals` is a hash which contains resolve results if any;
                 * - `reload` is a function to reload a segment (restart resolving, reinstantiate a controller, etc)
                 *
                 * @type {Array.<Object>}
                 */
                chain: [],
                
                /**
                 * Helper method for checking whether current route starts with the given string
                 * @param {string} val
                 * @returns {boolean}
                 */
                startsWith: function (val) {
                    var regexp = new RegExp('^'+val);
                    return regexp.test($routeSegment.name);
                },
                
                /**
                 * Helper method for checking whether current route contains the given string
                 * @param {string} val
                 * @returns {Boolean}
                 */
                contains: function (val) {
                    for(var i=0; i<this.chain.length; i++)
                        if(this.chain[i] && this.chain[i].name == val)
                            return true;
                    return false;
                },

                /**
                 * A method for reverse routing which can return the route URL for the specified segment name
                 * @param {string} segmentName The name of a segment as defined in `when()`
                 * @param {Object} routeParams Route params hash to be put into route URL template
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
                                            return updateSegment(index, {name: i, params: children[i].params})
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

                        $routeSegment.chain[index] = {
                                name: name,
                                params: params,
                                locals: resolvedLocals,
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
 * Usage:
 * <a ng-href="{{ 'index.list' | routeSegmentUrl }}">
 * <a ng-href="{{ 'index.list.itemInfo' | routeSegmentUrl: {id: 123} }}">
 */
mod.filter('routeSegmentUrl', ['$routeSegment', function($routeSegment) {
    return function(segmentName, params) {
        return $routeSegment.getSegmentUrl(segmentName, params);
    }
}]);

/**
 * Usage:
 * <li ng-class="{active: ('index.list' | routeSegmentEqualsTo)}">
 */
mod.filter('routeSegmentEqualsTo', ['$routeSegment', function($routeSegment) {
    return function(value) {
        return $routeSegment.name == value;
    }
}]);

/**
 * Usage:
 * <li ng-class="{active: ('section1' | routeSegmentStartsWith)}">
 */
mod.filter('routeSegmentStartsWith', ['$routeSegment', function($routeSegment) {
    return function(value) {
        return $routeSegment.startsWith(value);
    }
}]);

/**
 * Usage:
 * <li ng-class="{active: ('itemInfo' | routeSegmentContains)}">
 */
mod.filter('routeSegmentContains', ['$routeSegment', function($routeSegment) {
    return function(value) {
        return $routeSegment.contains(value);
    }
}]);

/**
 * Usage:
 * <li ng-class="{active: ('index.list.itemInfo' | routeSegmentEqualsTo) && ('id' | routeSegmentParam) == 123}">
 */
mod.filter('routeSegmentParam', ['$routeSegment', function($routeSegment) {
    return function(value) {
        return $routeSegment.$routeParams[value];
    }
}]);


})(angular);
;'use strict';

/**
 * appViewSegment directive
 * It is based on ngView directive code: 
 * https://github.com/angular/angular.js/blob/master/src/ngRoute/directive/ngView.js
 */

(function(angular) {

    angular.module( 'view-segment', [ 'route-segment' ] ).directive( 'appViewSegment',
    ['$route', '$compile', '$controller', '$routeParams', '$routeSegment', '$q', '$injector', '$timeout',
        function($route, $compile, $controller, $routeParams, $routeSegment, $q, $injector, $timeout) {

            return {
                restrict : 'ECA',
                priority: 500,
                compile : function(tElement, tAttrs) {

                    var defaultContent = tElement.html(), isDefault = true,
                    anchor = angular.element(document.createComment(' view-segment '));

                    tElement.prepend(anchor);

                    return function($scope) {

                        var currentScope, currentElement, currentSegment, onloadExp = tAttrs.onload || '', animate,
                        viewSegmentIndex = parseInt(tAttrs.appViewSegment), updatePromise;

                        try {
                            // angular 1.1.x
                            var $animator = $injector.get('$animator')
                            animate = $animator($scope, tAttrs);
                        }
                        catch(e) {}
                        try {
                            // angular 1.2.x
                            animate = $injector.get('$animate');
                        }
                        catch(e) {}

                        if($routeSegment.chain[viewSegmentIndex])
                            updatePromise = $timeout(function() {
                                update($routeSegment.chain[viewSegmentIndex]);
                            }, 0);

                        // Watching for the specified route segment and updating contents
                        $scope.$on('routeSegmentChange', function(event, args) {

                            if(updatePromise)
                                $timeout.cancel(updatePromise);

                            if(args.index == viewSegmentIndex && currentSegment != args.segment)
                                update(args.segment);
                        });

                        function clearContent() {

                            if(currentElement) {
                                animate.leave(currentElement);
                                currentElement = null;
                            }

                            if (currentScope) {
                                currentScope.$destroy();
                                currentScope = null;
                            }
                        }


                        function update(segment) {

                            currentSegment = segment;

                            if(isDefault) {
                                isDefault = false;
                                tElement.replaceWith(anchor);
                            }

                            if(!segment) {
                                clearContent();
                                currentElement = tElement.clone();
                                currentElement.html(defaultContent);
                                animate.enter( currentElement, null, anchor );
                                $compile(currentElement, false, 499)($scope);
                                return;
                            }

                            var locals = angular.extend({}, segment.locals),
                            template = locals && locals.$template;

                            clearContent();

                            currentElement = tElement.clone();
                            currentElement.html(template ? template : defaultContent);
                            animate.enter( currentElement, null, anchor );

                            var link = $compile(currentElement, false, 499), controller;

                            currentScope = $scope.$new();
                            if (segment.params.controller) {
                                locals.$scope = currentScope;
                                controller = $controller(segment.params.controller, locals);
                                if(segment.params.controllerAs)
                                    currentScope[segment.params.controllerAs] = controller;
                                currentElement.data('$ngControllerController', controller);
                                currentElement.children().data('$ngControllerController', controller);
                            }

                            link(currentScope);
                            currentScope.$emit('$viewContentLoaded');
                            currentScope.$eval(onloadExp);
                        }
                    }
                }
            }
        }]);

})(angular);
