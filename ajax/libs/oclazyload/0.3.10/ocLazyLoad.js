/**
 * oclazyload - Load modules on demand (lazy load) with angularJS
 * @version v0.3.10
 * @link https://github.com/ocombe/ocLazyLoad
 * @license MIT
 * @author Olivier Combe <olivier.combe@gmail.com>
 */
(function() {
  'use strict';
  var regModules = ['ng'],
    regInvokes = {},
    regConfigs = [],
    justLoaded = [],
    ocLazyLoad = angular.module('oc.lazyLoad', ['ng']),
    broadcast = angular.noop;

  ocLazyLoad.provider('$ocLazyLoad', ['$controllerProvider', '$provide', '$compileProvider', '$filterProvider', '$injector', '$animateProvider',
    function($controllerProvider, $provide, $compileProvider, $filterProvider, $injector, $animateProvider) {
      var modules = {},
        providers = {
          $controllerProvider: $controllerProvider,
          $compileProvider: $compileProvider,
          $filterProvider: $filterProvider,
          $provide: $provide, // other things
          $injector: $injector,
          $animateProvider: $animateProvider
        },
        anchor = document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0],
        jsLoader, cssLoader, templatesLoader,
        debug = false,
        events = false;

      // Let's get the list of loaded modules & components
      init(angular.element(window.document));

      this.$get = ['$timeout', '$log', '$q', '$templateCache', '$http', '$rootElement', '$rootScope', '$cacheFactory', '$interval', function($timeout, $log, $q, $templateCache, $http, $rootElement, $rootScope, $cacheFactory, $interval) {
        var instanceInjector,
          filesCache = $cacheFactory('ocLazyLoad'),
          uaCssChecked = false,
          useCssLoadPatch = false;

        if(!debug) {
          $log = {};
          $log['error'] = angular.noop;
          $log['warn'] = angular.noop;
          $log['info'] = angular.noop;
        }

        // Make this lazy because at the moment that $get() is called the instance injector hasn't been assigned to the rootElement yet
        providers.getInstanceInjector = function() {
          return (instanceInjector) ? instanceInjector : (instanceInjector = $rootElement.data('$injector'));
        };

        broadcast = function broadcast(eventName, params) {
          if(events) {
            $rootScope.$broadcast(eventName, params);
          }
          if(debug) {
            $log.info(eventName, params);
          }
        }

        /**
         * Load a js/css file
         * @param type
         * @param path
         * @returns promise
         */
        var buildElement = function buildElement(type, path, params) {
          var deferred = $q.defer(),
            el, loaded,
            cacheBuster = function cacheBuster(url) {
              var dc = new Date().getTime();
              if(url.indexOf('?') >= 0) {
                if(url.substring(0, url.length - 1) === '&') {
                  return url + '_dc=' + dc;
                }
                return url + '&_dc=' + dc;
              } else {
                return url + '?_dc=' + dc;
              }
            };

          // Store the promise early so the file load can be detected by other parallel lazy loads
          // (ie: multiple routes on one page) a 'true' value isn't sufficient
          // as it causes false positive load results.
          if(angular.isUndefined(filesCache.get(path))) {
            filesCache.put(path, deferred.promise);
          }

          // Switch in case more content types are added later
          switch(type) {
            case 'css':
              el = document.createElement('link');
              el.type = 'text/css';
              el.rel = 'stylesheet';
              el.href = params.cache === false ? cacheBuster(path) : path;
              break;
            case 'js':
              el = document.createElement('script');
              el.src = params.cache === false ? cacheBuster(path) : path;
              break;
            default:
              deferred.reject(new Error('Requested type "' + type + '" is not known. Could not inject "' + path + '"'));
              break;
          }
          el.onload = el['onreadystatechange'] = function(e) {
            if((el['readyState'] && !(/^c|loade/.test(el['readyState']))) || loaded) return;
            el.onload = el['onreadystatechange'] = null
            loaded = 1;
            broadcast('ocLazyLoad.fileLoaded', path);
            deferred.resolve();
          }
          el.onerror = function(e) {
            deferred.reject(new Error('Unable to load ' + path));
          }
          el.async = 1;
          anchor.insertBefore(el, anchor.lastChild);

          /*
           The event load or readystatechange doesn't fire in:
           - iOS < 6       (default mobile browser)
           - Android < 4.4 (default mobile browser)
           - Safari < 6    (desktop browser)
           */
          if(type == 'css') {
            if(!uaCssChecked) {
              var ua = navigator.userAgent.toLowerCase();

              // iOS < 6
              if(/iP(hone|od|ad)/.test(navigator.platform)) {
                var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
                var iOSVersion = parseFloat([parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)].join('.'));
                useCssLoadPatch = iOSVersion < 6;
              } else if(ua.indexOf("android") > -1) { // Android < 4.4
                var androidVersion = parseFloat(ua.slice(ua.indexOf("android") + 8));
                useCssLoadPatch = androidVersion < 4.4;
              } else if(ua.indexOf('safari') > -1 && ua.indexOf('chrome') == -1) {
                var safariVersion = parseFloat(ua.match(/version\/([\.\d]+)/i)[1]);
                useCssLoadPatch = safariVersion < 6;
              }
            }

            if(useCssLoadPatch) {
              var tries = 1000; // * 20 = 20000 miliseconds
              var interval = $interval(function() {
                try {
                  el.sheet.cssRules;
                  $interval.cancel(interval);
                  el.onload();
                } catch(e) {
                  if(--tries <= 0) {
                    el.onerror();
                  }
                }
              }, 20);
            }
          }

          return deferred.promise;
        }

        if(angular.isUndefined(jsLoader)) {
          /**
           * jsLoader function
           * @type Function
           * @param paths array list of js files to load
           * @param callback to call when everything is loaded. We use a callback and not a promise
           * @param params object config parameters
           * because the user can overwrite jsLoader and it will probably not use promises :(
           */
          jsLoader = function(paths, callback, params) {
            var promises = [];
            angular.forEach(paths, function loading(path) {
              promises.push(buildElement('js', path, params));
            });
            $q.all(promises).then(function success() {
              callback();
            }, function error(err) {
              callback(err);
            });
          }
          jsLoader.ocLazyLoadLoader = true;
        }

        if(angular.isUndefined(cssLoader)) {
          /**
           * cssLoader function
           * @type Function
           * @param paths array list of css files to load
           * @param callback to call when everything is loaded. We use a callback and not a promise
           * @param params object config parameters
           * because the user can overwrite cssLoader and it will probably not use promises :(
           */
          cssLoader = function(paths, callback, params) {
            var promises = [];
            angular.forEach(paths, function loading(path) {
              promises.push(buildElement('css', path, params));
            });
            $q.all(promises).then(function success() {
              callback();
            }, function error(err) {
              callback(err);
            });
          }
          cssLoader.ocLazyLoadLoader = true;
        }

        if(angular.isUndefined(templatesLoader)) {
          /**
           * templatesLoader function
           * @type Function
           * @param paths array list of css files to load
           * @param callback to call when everything is loaded. We use a callback and not a promise
           * @param params object config parameters for $http
           * because the user can overwrite templatesLoader and it will probably not use promises :(
           */
          templatesLoader = function(paths, callback, params) {
            if(angular.isString(paths)) {
              paths = [paths];
            }
            var promises = [];
            angular.forEach(paths, function(url) {
              var deferred = $q.defer();
              promises.push(deferred.promise);
              $http.get(url, params).success(function(data) {
                angular.forEach(angular.element(data), function(node) {
                  if(node.nodeName === 'SCRIPT' && node.type === 'text/ng-template') {
                    $templateCache.put(node.id, node.innerHTML);
                  }
                });
                if(angular.isUndefined(filesCache.get(url))) {
                  filesCache.put(url, true);
                }
                deferred.resolve();
              }).error(function(data) {
                var err = 'Error load template "' + url + '": ' + data;
                $log.error(err);
                deferred.reject(new Error(err));
              });
            });
            return $q.all(promises).then(function success() {
              callback();
            }, function error(err) {
              callback(err);
            });
          }
          templatesLoader.ocLazyLoadLoader = true;
        }

        var filesLoader = function(config, params) {
          var cssFiles = [],
            templatesFiles = [],
            jsFiles = [],
            promises = [],
            cachePromise = null;

          angular.extend(params || {}, config);

          angular.forEach(params.files, function(path) {
            cachePromise = filesCache.get(path);
            if(angular.isUndefined(cachePromise) || params.cache === false) {
              if(/\.css[^\.]*$/.test(path) && cssFiles.indexOf(path) === -1) {
                cssFiles.push(path);
              } else if(/\.(htm|html)[^\.]*$/.test(path) && templatesFiles.indexOf(path) === -1) {
                templatesFiles.push(path);
              } else if(jsFiles.indexOf(path) === -1) {
                jsFiles.push(path);
              }
            } else if(cachePromise) {
              promises.push(cachePromise);
            }
          });

          if(cssFiles.length > 0) {
            var cssDeferred = $q.defer();
            cssLoader(cssFiles, function(err) {
              if(angular.isDefined(err) && cssLoader.hasOwnProperty('ocLazyLoadLoader')) {
                $log.error(err);
                cssDeferred.reject(err);
              } else {
                cssDeferred.resolve();
              }
            }, params);
            promises.push(cssDeferred.promise);
          }

          if(templatesFiles.length > 0) {
            var templatesDeferred = $q.defer();
            templatesLoader(templatesFiles, function(err) {
              if(angular.isDefined(err) && templatesLoader.hasOwnProperty('ocLazyLoadLoader')) {
                $log.error(err);
                templatesDeferred.reject(err);
              } else {
                templatesDeferred.resolve();
              }
            }, params);
            promises.push(templatesDeferred.promise);
          }

          if(jsFiles.length > 0) {
            var jsDeferred = $q.defer();
            jsLoader(jsFiles, function(err) {
              if(angular.isDefined(err) && jsLoader.hasOwnProperty('ocLazyLoadLoader')) {
                $log.error(err);
                jsDeferred.reject(err);
              } else {
                jsDeferred.resolve();
              }
            }, params);
            promises.push(jsDeferred.promise);
          }

          return $q.all(promises);
        }

        return {
          getModuleConfig: function(name) {
            if(!modules[name]) {
              return null;
            }
            return modules[name];
          },

          setModuleConfig: function(module) {
            modules[module.name] = module;
            return module;
          },

          getModules: function() {
            return regModules;
          },

          // deprecated
          loadTemplateFile: function(paths, params) {
            return filesLoader({files: paths}, params);
          },

          load: function(module, params) {
            var self = this,
              config = null,
              moduleCache = [],
              deferredList = [],
              deferred = $q.defer(),
              moduleName,
              errText;

            if(angular.isUndefined(params)) {
              params = {};
            }

            // If module is an array, break it down
            if(angular.isArray(module)) {
              // Resubmit each entry as a single module
              angular.forEach(module, function(m) {
                if(m) {
                  deferredList.push(self.load(m, params));
                }
              });

              // Resolve the promise once everything has loaded
              $q.all(deferredList).then(function success() {
                deferred.resolve(module);
              }, function error(err) {
                deferred.reject(err);
              });

              return deferred.promise;
            }

            moduleName = getModuleName(module);

            // Get or Set a configuration depending on what was passed in
            if(typeof module === 'string') {
              config = self.getModuleConfig(module);
              if(!config) {
                config = {
                  files: [module]
                };
                moduleName = null;
              }
            } else if(typeof module === 'object') {
              config = self.setModuleConfig(module);
            }

            if(config === null) {
              errText = 'Module "' + moduleName + '" is not configured, cannot load.';
              $log.error(errText);
              deferred.reject(new Error(errText));
            } else {
              // deprecated
              if(angular.isDefined(config.template)) {
                if(angular.isUndefined(config.files)) {
                  config.files = [];
                }
                if(angular.isString(config.template)) {
                  config.files.push(config.template);
                } else if(angular.isArray(config.template)) {
                  config.files.concat(config.template);
                }
              }
            }

            moduleCache.push = function(value) {
              if(this.indexOf(value) === -1) {
                Array.prototype.push.apply(this, arguments);
              }
            };

            // If this module has been loaded before, re-use it.
            if(angular.isDefined(moduleName) && moduleExists(moduleName) && regModules.indexOf(moduleName) !== -1) {
              moduleCache.push(moduleName);

              // if we don't want to load new files, resolve here
              if(angular.isUndefined(config.files)) {
                deferred.resolve();
                return deferred.promise;
              }
            }

            var loadDependencies = function loadDependencies(module) {
              var moduleName,
                loadedModule,
                requires,
                diff,
                promisesList = [];

              moduleName = getModuleName(module);
              if(moduleName === null) {
                return $q.when();
              } else {
                try {
                  loadedModule = getModule(moduleName);
                } catch(e) {
                  var deferred = $q.defer();
                  $log.error(e.message);
                  deferred.reject(e);
                  return deferred.promise;
                }
                requires = getRequires(loadedModule);
              }

              angular.forEach(requires, function(requireEntry) {
                // If no configuration is provided, try and find one from a previous load.
                // If there isn't one, bail and let the normal flow run
                if(typeof requireEntry === 'string') {
                  var config = self.getModuleConfig(requireEntry);
                  if(config === null) {
                    moduleCache.push(requireEntry); // We don't know about this module, but something else might, so push it anyway.
                    return;
                  }
                  requireEntry = config;
                }

                // Check if this dependency has been loaded previously
                if(moduleExists(requireEntry.name)) {
                  if(typeof module !== 'string') {
                    // compare against the already loaded module to see if the new definition adds any new files
                    diff = requireEntry.files.filter(function(n) {
                      return self.getModuleConfig(requireEntry.name).files.indexOf(n) < 0;
                    });

                    // If the module was redefined, advise via the console
                    if(diff.length !== 0) {
                      $log.warn('Module "', moduleName, '" attempted to redefine configuration for dependency. "', requireEntry.name, '"\n Additional Files Loaded:', diff);
                    }

                    // Push everything to the file loader, it will weed out the duplicates.
                    promisesList.push(filesLoader(requireEntry.files, params).then(function() {
                      return loadDependencies(requireEntry);
                    }));
                  }
                  return;
                } else if(typeof requireEntry === 'object') {
                  if(requireEntry.hasOwnProperty('name') && requireEntry['name']) {
                    // The dependency doesn't exist in the module cache and is a new configuration, so store and push it.
                    self.setModuleConfig(requireEntry);
                    moduleCache.push(requireEntry['name']);
                  }

                  // CSS Loading Handler
                  if(requireEntry.hasOwnProperty('css') && requireEntry['css'].length !== 0) {
                    // Locate the document insertion point
                    angular.forEach(requireEntry['css'], function(path) {
                      buildElement('css', path, params);
                    });
                  }
                  // CSS End.
                }

                // Check if the dependency has any files that need to be loaded. If there are, push a new promise to the promise list.
                if(requireEntry.hasOwnProperty('files') && requireEntry.files.length !== 0) {
                  if(requireEntry.files) {
                    promisesList.push(filesLoader(requireEntry, params).then(function() {
                      return loadDependencies(requireEntry);
                    }));
                  }
                }
              });

              // Create a wrapper promise to watch the promise list and resolve it once everything is done.
              return $q.all(promisesList);
            }

            filesLoader(config, params).then(function success() {
              if(moduleName === null) {
                deferred.resolve(module);
              } else {
                moduleCache.push(moduleName);
                loadDependencies(moduleName).then(function success() {
                  try {
                    justLoaded = [];
                    register(providers, moduleCache, params);
                  } catch(e) {
                    $log.error(e.message);
                    deferred.reject(e);
                    return;
                  }
                  $timeout(function() {
                    deferred.resolve(module);
                  });
                }, function error(err) {
                  $timeout(function() {
                    deferred.reject(err);
                  });
                });
              }
            }, function error(err) {
              deferred.reject(err);
            });

            return deferred.promise;
          }
        };
      }];

      this.config = function(config) {
        if(angular.isDefined(config.jsLoader) || angular.isDefined(config.asyncLoader)) {
          jsLoader = config.jsLoader || config.asyncLoader;
          if(!angular.isFunction(jsLoader)) {
            throw('The js loader needs to be a function');
          }
        }

        if(angular.isDefined(config.cssLoader)) {
          cssLoader = config.cssLoader;
          if(!angular.isFunction(cssLoader)) {
            throw('The css loader needs to be a function');
          }
        }

        if(angular.isDefined(config.templatesLoader)) {
          templatesLoader = config.templatesLoader;
          if(!angular.isFunction(templatesLoader)) {
            throw('The template loader needs to be a function');
          }
        }

        // for bootstrap apps, we need to define the main module name
        if(angular.isDefined(config.loadedModules)) {
          var addRegModule = function(loadedModule) {
            if(regModules.indexOf(loadedModule) < 0) {
              regModules.push(loadedModule);
              angular.forEach(angular.module(loadedModule).requires, addRegModule);
            }
          };
          angular.forEach(config.loadedModules, addRegModule);
        }

        // If we want to define modules configs
        if(angular.isDefined(config.modules)) {
          if(angular.isArray(config.modules)) {
            angular.forEach(config.modules, function(moduleConfig) {
              modules[moduleConfig.name] = moduleConfig;
            });
          } else {
            modules[config.modules.name] = config.modules;
          }
        }

        if(angular.isDefined(config.debug)) {
          debug = config.debug;
        }

        if(angular.isDefined(config.events)) {
          events = config.events;
        }
      };
    }]);

  ocLazyLoad.directive('ocLazyLoad', ['$ocLazyLoad', '$compile', '$animate', '$parse',
    function($ocLazyLoad, $compile, $animate, $parse) {
      return {
        restrict: 'A',
        terminal: true,
        priority: 1000,
        compile: function(element, attrs) {
          // we store the content and remove it before compilation
          var content = element[0].innerHTML;
          element.html('');

          return function($scope, $element, $attr) {
            var model = $parse($attr.ocLazyLoad);
            $scope.$watch(function() {
              // it can be a module name (string), an object, an array, or a scope reference to any of this
              return model($scope) || $attr.ocLazyLoad;
            }, function(moduleName) {
              if(angular.isDefined(moduleName)) {
                $ocLazyLoad.load(moduleName).then(function(moduleConfig) {
                  $animate.enter($compile(content)($scope), null, $element);
                });
              }
            }, true);
          };
        }
      };
    }]);

  /**
   * Get the list of required modules/services/... for this module
   * @param module
   * @returns {Array}
   */
  function getRequires(module) {
    var requires = [];
    angular.forEach(module.requires, function(requireModule) {
      if(regModules.indexOf(requireModule) === -1) {
        requires.push(requireModule);
      }
    });
    return requires;
  }

  /**
   * Check if a module exists and returns it if it does
   * @param moduleName
   * @returns {boolean}
   */
  function moduleExists(moduleName) {
    try {
      return angular.module(moduleName);
    } catch(e) {
      if(/No module/.test(e) || (e.message.indexOf('$injector:nomod') > -1)) {
        return false;
      }
    }
  }

  function getModule(moduleName) {
    try {
      return angular.module(moduleName);
    } catch(e) {
      // this error message really suxx
      if(/No module/.test(e) || (e.message.indexOf('$injector:nomod') > -1)) {
        e.message = 'The module "' + moduleName + '" that you are trying to load does not exist. ' + e.message
      }
      throw e;
    }
  }

  function invokeQueue(providers, queue, moduleName, reconfig) {
    if(!queue) {
      return;
    }

    var i, len, args, provider;
    for(i = 0, len = queue.length; i < len; i++) {
      args = queue[i];
      if(angular.isArray(args)) {
        if(providers !== null) {
          if(providers.hasOwnProperty(args[0])) {
            provider = providers[args[0]];
          } else {
            throw new Error('unsupported provider ' + args[0]);
          }
        }
        var isNew = registerInvokeList(args, moduleName);
        if(args[1] !== 'invoke') {
          if(isNew && angular.isDefined(provider)) {
            provider[args[1]].apply(provider, args[2]);
          }
        } else { // config block
          var callInvoke = function(fct) {
            var invoked = regConfigs.indexOf(moduleName + '-' + fct);
            if(invoked === -1 || reconfig) {
              if(invoked === -1) {
                regConfigs.push(moduleName + '-' + fct);
              }
              if(angular.isDefined(provider)) {
                provider[args[1]].apply(provider, args[2]);
              }
            }
          }
          if(angular.isFunction(args[2][0])) {
            callInvoke(args[2][0]);
          } else if(angular.isArray(args[2][0])) {
            for(var j = 0, jlen = args[2][0].length; j < jlen; j++) {
              if(angular.isFunction(args[2][0][j])) {
                callInvoke(args[2][0][j]);
              }
            }
          }
        }
      }
    }
  }

  /**
   * Register a new module and load it
   * @param providers
   * @param registerModules
   * @returns {*}
   */
  function register(providers, registerModules, params) {
    if(registerModules) {
      var k, moduleName, moduleFn, runBlocks = [];
      for(k = registerModules.length - 1; k >= 0; k--) {
        moduleName = registerModules[k];
        if(typeof moduleName !== 'string') {
          moduleName = getModuleName(moduleName);
        }
        if(!moduleName || justLoaded.indexOf(moduleName) !== -1) {
          continue;
        }
        var newModule = regModules.indexOf(moduleName) === -1;
        moduleFn = angular.module(moduleName);
        if(newModule) { // new module
          regModules.push(moduleName);
          register(providers, moduleFn.requires, params);
          runBlocks = runBlocks.concat(moduleFn._runBlocks);
        }
        invokeQueue(providers, moduleFn._invokeQueue, moduleName, params.reconfig);
        invokeQueue(providers, moduleFn._configBlocks, moduleName, params.reconfig); // angular 1.3+
        broadcast(newModule ? 'ocLazyLoad.moduleLoaded' : 'ocLazyLoad.moduleReloaded', moduleName);
        registerModules.pop();
        justLoaded.push(moduleName);
      }
      var instanceInjector = providers.getInstanceInjector();
      angular.forEach(runBlocks, function(fn) {
        instanceInjector.invoke(fn);
      });
    }
  }

  /**
   * Register an invoke
   * @param args
   * @returns {*}
   */
  function registerInvokeList(args, moduleName) {
    var invokeList = args[2][0],
      type = args[1],
      newInvoke = false;
    if(angular.isUndefined(regInvokes[moduleName])) {
      regInvokes[moduleName] = {};
    }
    if(angular.isUndefined(regInvokes[moduleName][type])) {
      regInvokes[moduleName][type] = [];
    }
    var onInvoke = function(invokeName) {
      newInvoke = true;
      regInvokes[moduleName][type].push(invokeName);
      broadcast('ocLazyLoad.componentLoaded', [moduleName, type, invokeName]);
    }
    if(angular.isString(invokeList) && regInvokes[moduleName][type].indexOf(invokeList) === -1) {
      onInvoke(invokeList);
    } else if(angular.isObject(invokeList)) {
      angular.forEach(invokeList, function(invoke) {
        if(angular.isString(invoke) && regInvokes[moduleName][type].indexOf(invoke) === -1) {
          onInvoke(invoke);
        }
      });
    } else {
      return false;
    }
    return newInvoke;
  }

  function getModuleName(module) {
    if(module === null) {
      return null;
    }
    var moduleName = null;
    if(typeof module === 'string') {
      moduleName = module;
    } else if(typeof module === 'object' && module.hasOwnProperty('name') && typeof module.name === 'string') {
      moduleName = module.name;
    }
    return moduleName;
  }

  /**
   * Get the list of existing registered modules
   * @param element
   */
  function init(element) {
    var elements = [element],
      appElement,
      moduleName,
      names = ['ng:app', 'ng-app', 'x-ng-app', 'data-ng-app'],
      NG_APP_CLASS_REGEXP = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;

    function append(elm) {
      return (elm && elements.push(elm));
    }

    angular.forEach(names, function(name) {
      names[name] = true;
      append(document.getElementById(name));
      name = name.replace(':', '\\:');
      if(element[0].querySelectorAll) {
        angular.forEach(element[0].querySelectorAll('.' + name), append);
        angular.forEach(element[0].querySelectorAll('.' + name + '\\:'), append);
        angular.forEach(element[0].querySelectorAll('[' + name + ']'), append);
      }
    });

    //TODO: search the script tags for angular.bootstrap
    angular.forEach(elements, function(elm) {
      if(!appElement) {
        var className = ' ' + element.className + ' ';
        var match = NG_APP_CLASS_REGEXP.exec(className);
        if(match) {
          appElement = elm;
          moduleName = (match[2] || '').replace(/\s+/g, ',');
        } else {
          angular.forEach(elm.attributes, function(attr) {
            if(!appElement && names[attr.name]) {
              appElement = elm;
              moduleName = attr.value;
            }
          });
        }
      }
    });

    if(appElement) {
      (function addReg(moduleName) {
        if(regModules.indexOf(moduleName) === -1) {
          // register existing modules
          regModules.push(moduleName);
          var mainModule = angular.module(moduleName);

          // register existing components (directives, services, ...)
          invokeQueue(null, mainModule._invokeQueue, moduleName);
          invokeQueue(null, mainModule._configBlocks, moduleName); // angular 1.3+

          angular.forEach(mainModule.requires, addReg);
        }
      })(moduleName);
    }
  }

  // Array.indexOf polyfill for IE8
  if(!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement, fromIndex) {

      var k;

      // 1. Let O be the result of calling ToObject passing
      //    the this value as the argument.
      if(this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var O = Object(this);

      // 2. Let lenValue be the result of calling the Get
      //    internal method of O with the argument "length".
      // 3. Let len be ToUint32(lenValue).
      var len = O.length >>> 0;

      // 4. If len is 0, return -1.
      if(len === 0) {
        return -1;
      }

      // 5. If argument fromIndex was passed let n be
      //    ToInteger(fromIndex); else let n be 0.
      var n = +fromIndex || 0;

      if(Math.abs(n) === Infinity) {
        n = 0;
      }

      // 6. If n >= len, return -1.
      if(n >= len) {
        return -1;
      }

      // 7. If n >= 0, then Let k be n.
      // 8. Else, n<0, Let k be len - abs(n).
      //    If k is less than 0, then let k be 0.
      k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      // 9. Repeat, while k < len
      while(k < len) {
        // a. Let Pk be ToString(k).
        //   This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the
        //    HasProperty internal method of O with argument Pk.
        //   This step can be combined with c
        // c. If kPresent is true, then
        //    i.  Let elementK be the result of calling the Get
        //        internal method of O with the argument ToString(k).
        //   ii.  Let same be the result of applying the
        //        Strict Equality Comparison Algorithm to
        //        searchElement and elementK.
        //  iii.  If same is true, return k.
        if(k in O && O[k] === searchElement) {
          return k;
        }
        k++;
      }
      return -1;
    };
  }
})();
