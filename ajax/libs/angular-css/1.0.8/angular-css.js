/**
 * AngularCSS - CSS on-demand for AngularJS
 * @version v1.0.8
 * @author Alex Castillo
 * @link http://castillo-io.github.io/angular-css
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

'use strict';

(function (angular) {

  /**
   * AngularCSS Module
   * Contains: config, constant, provider and run
   **/
  var angularCSS = angular.module('angularCSS', []);

  // Old module name handler
  angular.module('door3.css', [])
    .run(function () {
      console.error('AngularCSS: The module name "door3.css" is now deprecated. Please use "angularCSS" instead.');
    });

  // Provider
  angularCSS.provider('$css', [function $cssProvider() {

    // Defaults - default options that can be overridden from application config
    var defaults = this.defaults = {
      element: 'link',
      rel: 'stylesheet',
      type: 'text/css',
      container: 'head',
      method: 'append',
      weight: 0
    };
    
    var DEBUG = false;

    // Turn off/on in order to see console logs during dev mode
    this.debugMode = function(mode) {
        if (angular.isDefined(mode))
            DEBUG = mode;
        return DEBUG;
    };

    this.$get = ['$rootScope','$injector','$q','$window','$timeout','$compile','$http','$filter','$log', '$interpolate',
                function $get($rootScope, $injector, $q, $window, $timeout, $compile, $http, $filter, $log, $interpolate) {

      var $css = {};

      var template = '<link ng-repeat="stylesheet in stylesheets | orderBy: \'weight\' track by $index " rel="{{ stylesheet.rel }}" type="{{ stylesheet.type }}" ng-href="{{ stylesheet.href }}" ng-attr-media="{{ stylesheet.media }}">';

      // Using correct interpolation symbols.
      template = template
        .replace(/{{/g, $interpolate.startSymbol())
        .replace(/}}/g, $interpolate.endSymbol());

      // Variables - default options that can be overridden from application config
      var mediaQuery = {}, mediaQueryListener = {}, mediaQueriesToIgnore = ['print'], options = angular.extend({}, defaults),
        container = angular.element(document.querySelector ? document.querySelector(options.container) : document.getElementsByTagName(options.container)[0]),
        dynamicPaths = [];

      // Parse all directives
      angular.forEach($directives, function (directive, key) {
        if (directive.hasOwnProperty('css')) {
          $directives[key] = parse(directive.css);
        }
      });

      /**
       * Listen for directive add event in order to add stylesheet(s)
       **/
      function $directiveAddEventListener(event, directive, scope) {
        // Binds directive's css
        if (scope && directive.hasOwnProperty('css')) {
          $css.bind(directive.css, scope);
        }
      }

      /**
       * Listen for route change event and add/remove stylesheet(s)
       **/
      function $routeEventListener(event, current, prev) {
        // Removes previously added css rules
        if (prev) {
          $css.remove($css.getFromRoute(prev).concat(dynamicPaths));
          // Reset dynamic paths array
          dynamicPaths.length = 0;
        }
        // Adds current css rules
        if (current) {
          $css.add($css.getFromRoute(current));
        }
      }

      /**
       * Listen for state change event and add/remove stylesheet(s)
       **/
      function $stateEventListener(event, current, params, prev) {
        // Removes previously added css rules
        if (prev) {
          $css.remove($css.getFromState(prev).concat(dynamicPaths));
          // Reset dynamic paths array
          dynamicPaths.length = 0;
        }
        // Adds current css rules
        if (current) {
          $css.add($css.getFromState(current));
        }
      }

      /**
       * Map breakpoitns defined in defaults to stylesheet media attribute
       **/
      function mapBreakpointToMedia(stylesheet) {
        if (angular.isDefined(options.breakpoints)) {
          if (stylesheet.breakpoint in options.breakpoints) {
            stylesheet.media = options.breakpoints[stylesheet.breakpoint];
          }
          delete stylesheet.breakpoints;
        }
      }

      /**
       * Parse: returns array with full all object based on defaults
       **/
      function parse(obj) {
        if (!obj) {
          return;
        }
        // Function syntax
        if (angular.isFunction(obj)) {
          obj = angular.copy($injector.invoke(obj));
        }
        // String syntax
        if (angular.isString(obj)) {
          obj = angular.extend({
            href: obj
          }, options);
        }
        // Array of strings syntax
        if (angular.isArray(obj) && angular.isString(obj[0])) {
          angular.forEach(obj, function (item) {
            obj = angular.extend({
              href: item
            }, options);
          });
        }
        // Object syntax
        if (angular.isObject(obj) && !angular.isArray(obj)) {
          obj = angular.extend({}, options, obj);
        }
        // Array of objects syntax
        if (angular.isArray(obj) && angular.isObject(obj[0])) {
          angular.forEach(obj, function (item) {
            obj = angular.extend(item, options);
          });
        }
        // Map breakpoint to media attribute
        mapBreakpointToMedia(obj);
        return obj;
      }

      // Add stylesheets to scope
      $rootScope.stylesheets = [];

      // Adds compiled link tags to container element
      container[options.method]($compile(template)($rootScope));

      // Directive event listener (emulated internally)
      $rootScope.$on('$directiveAdd', $directiveAddEventListener);

      // Routes event listener ($route required)
      $rootScope.$on('$routeChangeSuccess', $routeEventListener);

      // States event listener ($state required)
      $rootScope.$on('$stateChangeSuccess', $stateEventListener);

      /**
       * Bust Cache
       **/
      function bustCache(stylesheet) {
        if (!stylesheet) {
          if(DEBUG) $log.error('No stylesheets provided');
          return;
        }
        var queryString = '?cache=';
        // Append query string for bust cache only once
        if (stylesheet.href.indexOf(queryString) === -1) {
          stylesheet.href = stylesheet.href + (stylesheet.bustCache ? queryString + (new Date().getTime()) : '');
        }
      }

      /**
       * Filter By: returns an array of routes based on a property option
       **/
      function filterBy(array, prop) {
        if (!array || !prop) {
            if(DEBUG) $log.error('filterBy: missing array or property');
            return;
        }
        return $filter('filter')(array, function (item) {
          return item[prop];
        });
      }

      /**
       * Add Media Query
       **/
      function addViaMediaQuery(stylesheet) {
        if (!stylesheet) {
            if(DEBUG) $log.error('No stylesheet provided');
            return;
        }
        // Media query object
        mediaQuery[stylesheet.href] = $window.matchMedia(stylesheet.media);
        // Media Query Listener function
        mediaQueryListener[stylesheet.href] = function(mediaQuery) {
          // Trigger digest
          $timeout(function () {
            if (mediaQuery.matches) {
              // Add stylesheet
              $rootScope.stylesheets.push(stylesheet);
            } else {
              var index = $rootScope.stylesheets.indexOf($filter('filter')($rootScope.stylesheets, {
                href: stylesheet.href
              })[0]);
              // Remove stylesheet
              if (index !== -1) {
                $rootScope.stylesheets.splice(index, 1);
              }
            }
          });
        };
        // Listen for media query changes
        mediaQuery[stylesheet.href].addListener(mediaQueryListener[stylesheet.href]);
        // Invoke first media query check
        mediaQueryListener[stylesheet.href](mediaQuery[stylesheet.href]);
      }

      /**
       * Remove Media Query
       **/
      function removeViaMediaQuery(stylesheet) {
        if (!stylesheet) {
            if(DEBUG) $log.error('No stylesheet provided');
            return;
        }
        // Remove media query listener
        if ($rootScope && angular.isDefined(mediaQuery)
          && mediaQuery[stylesheet.href]
          && angular.isDefined(mediaQueryListener)) {
          mediaQuery[stylesheet.href].removeListener(mediaQueryListener[stylesheet.href]);
        }
      }

      /**
       * Is Media Query: checks for media settings, media queries to be ignore and match media support
       **/
      function isMediaQuery(stylesheet) {
        if (!stylesheet) {
            if(DEBUG) $log.error('No stylesheet provided');
            return;
        }
        return !!(
          // Check for media query setting
          stylesheet.media
          // Check for media queries to be ignored
          && (mediaQueriesToIgnore.indexOf(stylesheet.media) === -1)
          // Check for matchMedia support
          && $window.matchMedia
        );
      }

      /**
       * Get From Route: returns array of css objects from single route
       **/
      $css.getFromRoute = function (route) {
        if (!route) {
            if(DEBUG) $log.error('Get From Route: No route provided');
            return;
        }
        var css = null, result = [];
        if (route.$$route && route.$$route.css) {
          css = route.$$route.css;
        }
        else if (route.css) {
          css = route.css;
        }
        // Adds route css rules to array
        if (css) {
          if (angular.isArray(css)) {
            angular.forEach(css, function (cssItem) {
              if (angular.isFunction(cssItem)) {
                dynamicPaths.push(parse(cssItem));
              }
              result.push(parse(cssItem));
            });
          } else {
            if (angular.isFunction(css)) {
              dynamicPaths.push(parse(css));
            }
            result.push(parse(css));
          }
        }
        return result;
      };

      /**
       * Get From Routes: returns array of css objects from ng routes
       **/
      $css.getFromRoutes = function (routes) {
        if (!routes) {
            if(DEBUG) $log.error('Get From Routes: No routes provided');
            return;
        }
        var result = [];
        // Make array of all routes
        angular.forEach(routes, function (route) {
          var css = $css.getFromRoute(route);
          if (css.length) {
            result.push(css[0]);
          }
        });
        return result;
      };

      /**
       * Get From State: returns array of css objects from single state
       **/
      $css.getFromState = function (state) {
        if (!state) {
            if(DEBUG) $log.error('Get From State: No state provided');
            return;
        }
        var result = [];
        // State "views" notation
        if (angular.isDefined(state.views)) {
          angular.forEach(state.views, function (item) {
            if (item.css) {
              if (angular.isFunction(item.css)) {
                dynamicPaths.push(parse(item.css));
              }
              result.push(parse(item.css));
            }
          });
        }
        // State "children" notation
        if (angular.isDefined(state.children)) {
          angular.forEach(state.children, function (child) {
            if (child.css) {
              if (angular.isFunction(child.css)) {
                dynamicPaths.push(parse(child.css));
              }
              result.push(parse(child.css));
            }
            if (angular.isDefined(child.children)) {
              angular.forEach(child.children, function (childChild) {
                if (childChild.css) {
                  if (angular.isFunction(childChild.css)) {
                    dynamicPaths.push(parse(childChild.css));
                  }
                  result.push(parse(childChild.css));
                }
              });
            }
          });
        }
        // State default notation
        if (
            angular.isDefined(state.css) ||
            (angular.isDefined(state.data) && angular.isDefined(state.data.css))
        ) {
          var css = state.css || state.data.css;
          // For multiple stylesheets
          if (angular.isArray(css)) {
              angular.forEach(css, function (itemCss) {
                if (angular.isFunction(itemCss)) {
                  dynamicPaths.push(parse(itemCss));
                }
                result.push(parse(itemCss));
              });
            // For single stylesheets
          } else {
            if (angular.isFunction(css)) {
              dynamicPaths.push(parse(css));
            }
            result.push(parse(css));
          }
        }
        return result;
      };

      /**
       * Get From States: returns array of css objects from states
       **/
      $css.getFromStates = function (states) {
        if (!states) {
            if(DEBUG) $log.error('Get From States: No states provided');
            return;
        }
        var result = [];
        // Make array of all routes
        angular.forEach(states, function (state) {
          var css = $css.getFromState(state);
          if (angular.isArray(css)) {
            angular.forEach(css, function (cssItem) {
              result.push(cssItem);
            });
          } else {
            result.push(css);
          }
        });
        return result;
      };

      /**
       * Preload: preloads css via http request
       **/
      $css.preload = function (stylesheets, callback) {
        // If no stylesheets provided, then preload all
        if (!stylesheets) {
          stylesheets = [];
          // Add all stylesheets from custom directives to array
          if ($directives.length) {
            Array.prototype.push.apply(stylesheets, $directives);
          }
          // Add all stylesheets from ngRoute to array
          if ($injector.has('$route')) {
            Array.prototype.push.apply(stylesheets, $css.getFromRoutes($injector.get('$route').routes));
          }
          // Add all stylesheets from UI Router to array
          if ($injector.has('$state')) {
            Array.prototype.push.apply(stylesheets, $css.getFromStates($injector.get('$state').get()));
          }
          stylesheets = filterBy(stylesheets, 'preload');
        }
        if (!angular.isArray(stylesheets)) {
          stylesheets = [stylesheets];
        }
        var stylesheetLoadPromises = [];
        angular.forEach(stylesheets, function(stylesheet, key) {
          stylesheet = stylesheets[key] = parse(stylesheet);
          stylesheetLoadPromises.push(
            // Preload via ajax request
            $http.get(stylesheet.href).error(function (response) {
                if(DEBUG) $log.error('AngularCSS: Incorrect path for ' + stylesheet.href);
            })
          );
        });
        if (angular.isFunction(callback)) {
          $q.all(stylesheetLoadPromises).then(function () {
            callback(stylesheets);
          });
        }
      };

      /**
       * Bind: binds css in scope with own scope create/destroy events
       **/
       $css.bind = function (css, $scope) {
        if (!css || !$scope) {
            if(DEBUG) $log.error('No scope or stylesheets provided');
            return;
        }
        var result = [];
        // Adds route css rules to array
        if (angular.isArray(css)) {
          angular.forEach(css, function (cssItem) {
            result.push(parse(cssItem));
          });
        } else {
          result.push(parse(css));
        }
        $css.add(result);
        if(DEBUG) $log.debug('$css.bind(): Added', result);
        $scope.$on('$destroy', function () {
          $css.remove(result);
          if(DEBUG) $log.debug('$css.bind(): Removed', result);
        });
       };

      /**
       * Add: adds stylesheets to scope
       **/
      $css.add = function (stylesheets, callback) {
        if (!stylesheets) {
            if(DEBUG) $log.error('No stylesheets provided');
            return;
        }
        if (!angular.isArray(stylesheets)) {
          stylesheets = [stylesheets];
        }
        angular.forEach(stylesheets, function(stylesheet) {
          stylesheet = parse(stylesheet);
          // Avoid adding duplicate stylesheets
          if (stylesheet.href && !$filter('filter')($rootScope.stylesheets, { href: stylesheet.href }).length) {
            // Bust Cache feature
            bustCache(stylesheet);
            // Media Query add support check
            if (isMediaQuery(stylesheet)) {
              addViaMediaQuery(stylesheet);
            }
            else {
              $rootScope.stylesheets.push(stylesheet);
            }
            if(DEBUG) $log.debug('$css.add(): ' + stylesheet.href);
          }
        });
        // Broadcasts custom event for css add
        $rootScope.$broadcast('$cssAdd', stylesheets, $rootScope.stylesheets);
      };

      /**
       * Remove: removes stylesheets from scope
       **/
      $css.remove = function (stylesheets, callback) {
        if (!stylesheets) {
            if(DEBUG) $log.error('No stylesheets provided');
            return;
        }
        if (!angular.isArray(stylesheets)) {
          stylesheets = [stylesheets];
        }
        // Only proceed based on persist setting
        stylesheets = $filter('filter')(stylesheets, function (stylesheet) {
          return !stylesheet.persist;
        });
        angular.forEach(stylesheets, function(stylesheet) {
          stylesheet = parse(stylesheet);
          // Get index of current item to be removed based on href
          var index = $rootScope.stylesheets.indexOf($filter('filter')($rootScope.stylesheets, {
            href: stylesheet.href
          })[0]);
          // Remove stylesheet from scope (if found)
          if (index !== -1) {
            $rootScope.stylesheets.splice(index, 1);
          }
          // Remove stylesheet via media query
          removeViaMediaQuery(stylesheet);
          if(DEBUG) $log.debug('$css.remove(): ' + stylesheet.href);
        });
        // Broadcasts custom event for css remove
        $rootScope.$broadcast('$cssRemove', stylesheets, $rootScope.stylesheets);
      };

      /**
       * Remove All: removes all style tags from the DOM
       **/
      $css.removeAll = function () {
        // Remove all stylesheets from scope
        if ($rootScope && $rootScope.hasOwnProperty('stylesheets')) {
          $rootScope.stylesheets.length = 0;
        }
        if(DEBUG) $log.debug('all stylesheets removed');
      };

      // Preload all stylesheets
      $css.preload();

      return $css;

    }];

  }]);

  /**
   * Links filter - renders the stylesheets array in html format
   **/
  angularCSS.filter('$cssLinks', function () {
    return function (stylesheets) {
      if (!stylesheets || !angular.isArray(stylesheets)) {
        return stylesheets;
      }
      var result = '';
      angular.forEach(stylesheets, function (stylesheet) {
        result += '<link rel="' + stylesheet.rel + '" type="' + stylesheet.type + '" href="' + stylesheet.href + '"';
        result += (stylesheet.media ? ' media="' + stylesheet.media + '"' : '');
        result += '>\n\n';
      });
      return result;
    }
  });

  /**
   * Run - auto instantiate the $css provider by injecting it in the run phase of this module
   **/
  angularCSS.run(['$css', function ($css) { } ]);

  /**
   * AngularJS hack - This way we can get and decorate all custom directives
   * in order to broadcast a custom $directiveAdd event
   **/
  var $directives = [];
  var originalModule = angular.module;
  var arraySelect = function(array, action) {
    return array.reduce(
      function(previous, current) {
        previous.push(action(current));
        return previous;
      }, []);
    };
  var arrayExists = function(array, value) {
    return array.indexOf(value) > -1;
  };

  angular.module = function () {
    var module = originalModule.apply(this, arguments);
    var originalDirective = module.directive;
    module.directive = function(directiveName, directiveFactory) {
      var originalDirectiveFactory = angular.isFunction(directiveFactory) ?
      directiveFactory : directiveFactory[directiveFactory ? (directiveFactory.length - 1) : 0];
      try {
        var directive = angular.copy(originalDirectiveFactory)();
        directive.directiveName = directiveName;
        if (directive.hasOwnProperty('css') && !arrayExists(arraySelect($directives, function(x) {return x.ddo.directiveName}), directiveName)) {
          $directives.push({ ddo: directive, handled: false });
        }
      } catch (e) { }
      return originalDirective.apply(this, arguments);
    };
    var originalComponent = module.component;
    module.component = function (componentName, componentObject) {
      componentObject.directiveName = componentName;
      if (componentObject.hasOwnProperty('css') && !arrayExists(arraySelect($directives, function(x) {return x.ddo.directiveName}), componentName)) {
        $directives.push({ ddo: componentObject, handled: false });
      }
      return originalComponent.apply(this, arguments);
    };
    module.config(['$provide','$injector', function ($provide, $injector) {
      angular.forEach($directives, function ($dir) {
        if (!$dir.handled) {
          var $directive = $dir.ddo;
          var dirProvider = $directive.directiveName + 'Directive';
          if ($injector.has(dirProvider)) {
            $dir.handled = true;
            $provide.decorator(dirProvider, ['$delegate', '$rootScope', '$timeout', function ($delegate, $rootScope, $timeout) {
              var directive = $delegate[0];
              var compile = directive.compile;
              if (!directive.css) {
                directive.css = $directive.css;
              }
              directive.compile = function() {
                var link = compile ? compile.apply(this, arguments): false;
                return function(scope) {
                  var linkArgs = arguments;
                  $timeout(function () {
                    if (link) {
                      link.apply(this, linkArgs);
                    }
                  });
                  $rootScope.$broadcast('$directiveAdd', directive, scope);
                };
              };
              return $delegate;
            }]);
          }
        }
      });
    }]);
    return module;
  };
  /* End of hack */

})(angular);
