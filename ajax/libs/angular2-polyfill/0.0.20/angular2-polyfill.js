System.registerDynamic("angular2-polyfill/src/http/http.service", ["../../core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('../../core');
  var Http = (function() {
    function Http(http) {
      this.http = http;
    }
    Http.prototype.get = function(url, options) {
      return this.http.get(url, options);
    };
    Http.prototype.post = function(url, body, options) {
      return this.http.post(url, body, options);
    };
    Http.prototype.put = function(url, body, options) {
      return this.http.put(url, body, options);
    };
    Http.prototype.delete = function(url, options) {
      return this.http.delete(url, options);
    };
    Http.prototype.patch = function(url, body, options) {
      return this.http.patch(url, body, options);
    };
    Http.prototype.head = function(url, options) {
      return this.http.head(url, options);
    };
    Http = __decorate([__param(0, core_1.Inject('$http'))], Http);
    return Http;
  }());
  exports.Http = Http;
  return module.exports;
});

System.registerDynamic("angular2-polyfill/src/http/providers", ["./http.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var http_service_1 = $__require('./http.service');
  exports.HTTP_PROVIDERS = [http_service_1.Http];
  return module.exports;
});

System.registerDynamic("angular2-polyfill/http", ["./src/http/http.service", "./src/http/providers"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var http_service_1 = $__require('./src/http/http.service');
  exports.Http = http_service_1.Http;
  var providers_1 = $__require('./src/http/providers');
  exports.HTTP_PROVIDERS = providers_1.HTTP_PROVIDERS;
  return module.exports;
});

System.registerDynamic("angular2-polyfill/src/platform/bootstrap/core", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var bootstrapped = false;
  function bootstrap(ngModule, component) {
    if (bootstrapped) {
      return;
    }
    bootstrapped = true;
    ngModule.run(['$q', '$window', function($q, $window) {
      $window.Promise = function(executor) {
        return $q(executor);
      };
      $window.Promise.all = $q.all.bind($q);
      $window.Promise.reject = $q.reject.bind($q);
      $window.Promise.resolve = $q.when.bind($q);
      $window.Promise.race = function(promises) {
        var promiseMgr = $q.defer();
        var resolve = function(result) {
          if (promiseMgr) {
            promiseMgr.resolve(result);
            promiseMgr = null;
          }
        };
        var reject = function(err) {
          if (promiseMgr) {
            promiseMgr.reject(err);
            promiseMgr = null;
          }
        };
        for (var i = 0; i < promises.length; i++) {
          promises[i].then(resolve).catch(reject);
        }
        return promiseMgr.promise;
      };
    }]);
    angular.element(document).ready(function() {
      angular.bootstrap(document, [ngModule.name]);
    });
  }
  exports.bootstrap = bootstrap;
  return module.exports;
});

System.registerDynamic("camelcase", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function preserveCamelCase(str) {
    var isLastCharLower = false;
    for (var i = 0; i < str.length; i++) {
      var c = str.charAt(i);
      if (isLastCharLower && (/[a-zA-Z]/).test(c) && c.toUpperCase() === c) {
        str = str.substr(0, i) + '-' + str.substr(i);
        isLastCharLower = false;
        i++;
      } else {
        isLastCharLower = (c.toLowerCase() === c);
      }
    }
    return str;
  }
  module.exports = function() {
    var str = [].map.call(arguments, function(str) {
      return str.trim();
    }).filter(function(str) {
      return str.length;
    }).join('-');
    if (!str.length) {
      return '';
    }
    if (str.length === 1) {
      return str;
    }
    if (!(/[_.\- ]+/).test(str)) {
      if (str === str.toUpperCase()) {
        return str.toLowerCase();
      }
      if (str[0] !== str[0].toLowerCase()) {
        return str[0].toLowerCase() + str.slice(1);
      }
      return str;
    }
    str = preserveCamelCase(str);
    return str.replace(/^[_.\- ]+/, '').toLowerCase().replace(/[_.\- ]+(\w|$)/g, function(m, p1) {
      return p1.toUpperCase();
    });
  };
  return module.exports;
});

System.registerDynamic("decamelize", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = function(str, sep) {
    if (typeof str !== 'string') {
      throw new TypeError('Expected a string');
    }
    sep = typeof sep === 'undefined' ? '_' : sep;
    return str.replace(/([a-z\d])([A-Z])/g, '$1' + sep + '$2').replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + sep + '$2').toLowerCase();
  };
  return module.exports;
});

System.registerDynamic("angular2-polyfill/src/platform/bootstrap/component", ["camelcase", "decamelize", "./utils"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var camelcase = $__require('camelcase');
  var decamelize = $__require('decamelize');
  var utils = $__require('./utils');
  var map = {};
  var states = {};
  function bootstrap(ngModule, target, parentState) {
    var annotations = target.__annotations__;
    var component = annotations.component;
    var name = camelcase(component.selector || target.name);
    var styleElements = [];
    var headEl = angular.element(document).find('head');
    if (map[target.name]) {
      return name;
    }
    map[target.name] = decamelize(component.selector || target.name, '-');
    (component.providers || []).forEach(function(provider) {
      return utils.bootstrapHelper(ngModule, provider);
    });
    (component.directives || []).forEach(function(directive) {
      return utils.bootstrapHelper(ngModule, directive);
    });
    (component.pipes || []).forEach(function(pipe) {
      return utils.bootstrapHelper(ngModule, pipe);
    });
    (component.styles || []).forEach(function(style) {
      styleElements.push(angular.element('<style type="text/css">@charset "UTF-8";' + style + '</style>'));
    });
    (component.styleUrls || []).forEach(function(url) {
      styleElements.push(angular.element('<link rel="stylesheet" href="' + url + '">'));
    });
    utils.inject(target);
    var hostBindings = utils.parseHosts(component.host || {});
    ngModule.controller(target.name, target).directive(name, ['$compile', function($compile) {
      var directive = {
        restrict: 'E',
        scope: {},
        bindToController: {},
        controller: target.name,
        controllerAs: component.exportAs || '$ctrl',
        transclude: true,
        compile: function() {
          styleElements.forEach(function(el) {
            return headEl.prepend(el);
          });
          return {pre: function(scope, el) {
              utils.bindHostBindings(scope, el, hostBindings, component.controllerAs);
              if (target.prototype.ngOnInit) {
                var init = $compile("<div ng-init=\"" + directive.controllerAs + ".ngOnInit();\"></div>")(scope);
                el.append(init);
              }
              scope.$on('$destroy', function() {
                styleElements.forEach(function(el) {
                  return el.remove();
                });
                if (target.prototype.ngOnDestroy) {
                  scope[directive.controllerAs].ngOnDestroy();
                }
              });
            }};
        }
      };
      utils.bindInput(target, directive);
      utils.bindOutput(target, directive);
      if (component.template) {
        directive.template = component.template;
      } else {
        directive.templateUrl = component.templateUrl;
      }
      return directive;
    }]);
    if (annotations.routes) {
      var cmpStates = [];
      annotations.routes.forEach(function(route) {
        var name = route.name || route.as;
        var routerAnnotations = route.component.__annotations__ && route.component.__annotations__.router;
        var state = {
          name: name,
          url: route.path,
          isDefault: route.useAsDefault === true
        };
        if (route.component.name !== component.name) {
          bootstrap(ngModule, route.component, state);
        }
        if (state.url.substr(-4) === '/...') {
          state.url = state.url.substr(0, state.url.length - 4);
          state.abstract = true;
        }
        if (parentState && parentState.url && parentState.url.substr(-4) === '/...') {
          state.parent = parentState.name;
        }
        state.template = "<" + map[route.component.name] + "></" + map[route.component.name] + ">";
        cmpStates.push(state.name);
        states[name] = state;
        if (routerAnnotations && routerAnnotations.canActivate) {
          var hook = ['Router', '$state', '$stateParams'];
          if (Object.keys(routerAnnotations.canActivate.prototype).length > 0) {
            if (!routerAnnotations.canActivate.prototype.routerCanActivate) {
              throw new Error('@CanActivate class does not implement the `CanActivate` interface.');
            }
            hook.push(utils.bootstrapHelper(ngModule, routerAnnotations.canActivate));
          }
          hook.push(function(router, $state, $stateParams, handler) {
            var fn = handler ? handler.routerCanActivate : routerAnnotations.canActivate;
            return Promise.all([router.generate([name, $stateParams]), $state.current.name.length === 0 ? null : router.generate([$state.current.name, $state.params])]).then(function(instructions) {
              return Promise.resolve(fn.apply(handler, instructions));
            }).then(function(result) {
              if (!result) {
                return Promise.reject('could not activate');
              }
            });
          });
          states[name].resolve = {routerCanActivate: hook};
        }
      });
      ngModule.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
        cmpStates.forEach(function(name) {
          var state = states[name];
          $stateProvider.state(name, state);
          if (state.isDefault) {
            if (state.parent) {
              var parentState_1 = states[state.parent];
              var from = parentState_1.url;
              while (parentState_1.parent) {
                parentState_1 = states[parentState_1.parent];
                from = parentState_1.url + from;
              }
              $urlRouterProvider.when(from, from + state.url);
            } else {
              $urlRouterProvider.otherwise(state.url);
            }
          }
        });
      }]);
    }
    return name;
  }
  exports.bootstrap = bootstrap;
  return module.exports;
});

System.registerDynamic("angular2-polyfill/src/platform/bootstrap/directive", ["./utils"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var utils = $__require('./utils');
  function parseSelector(selector) {
    var regex = [{
      key: 'A',
      value: /^\[([a-zA-Z]+)\]$/
    }, {
      key: 'C',
      value: /^\.([a-zA-Z]+)$/
    }];
    for (var i = 0; i < regex.length; i++) {
      var result = selector.match(regex[i].value);
      if (result !== null) {
        return {
          restrict: regex[i].key,
          name: result[1]
        };
      }
    }
    ;
    throw new Error("Selector " + selector + " could not be parsed");
  }
  function bootstrap(ngModule, target) {
    var annotations = target.__annotations__;
    var directive = annotations.directive;
    var selector = parseSelector(directive.selector);
    var hostBindings = utils.parseHosts(directive.host || {});
    utils.inject(target);
    ngModule.controller(target.name, target).directive(selector.name, [function() {
      var declaration = {
        restrict: selector.restrict,
        scope: {},
        bindToController: {},
        controller: target.name,
        controllerAs: '$ctrl',
        link: function(scope, el) {
          return utils.bindHostBindings(scope, el, hostBindings);
        }
      };
      utils.bindInput(target, declaration);
      utils.bindOutput(target, declaration);
      return declaration;
    }]);
  }
  exports.bootstrap = bootstrap;
  return module.exports;
});

System.registerDynamic("angular2-polyfill/src/platform/bootstrap/pipe", ["./utils"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var utils = $__require('./utils');
  function bootstrap(ngModule, target) {
    var pipe = target.__annotations__.pipe;
    utils.inject(target);
    var filter = target.$inject || [];
    filter.push(function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
      }
      var instance = new (target.bind.apply(target, [void 0].concat(args)))();
      var filter = function(value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments[_i];
        }
        return instance.transform(value, args);
      };
      filter.$stateful = pipe.pure === false;
      return filter;
    });
    ngModule.filter(pipe.name, filter);
    return pipe.name;
  }
  exports.bootstrap = bootstrap;
  return module.exports;
});

System.registerDynamic("angular2-polyfill/src/platform/bootstrap/injectable", ["./utils"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var utils_1 = $__require('./utils');
  function bootstrap(ngModule, target) {
    var name = target.name;
    utils_1.inject(target);
    ngModule.service(name, target);
    return name;
  }
  exports.bootstrap = bootstrap;
  return module.exports;
});

System.registerDynamic("angular2-polyfill/src/platform/bootstrap/utils", ["camelcase", "dot-prop", "./component", "./directive", "./pipe", "./injectable"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var camelcase = $__require('camelcase');
  var dotProp = $__require('dot-prop');
  var component_1 = $__require('./component');
  var directive_1 = $__require('./directive');
  var pipe_1 = $__require('./pipe');
  var injectable_1 = $__require('./injectable');
  function parseHostBinding(key) {
    var regex = [{
      type: 'attr',
      regex: /^([a-zA-Z]+)$/
    }, {
      type: 'prop',
      regex: /^\[([a-zA-Z\.-]+)\]$/
    }, {
      type: 'event',
      regex: /^\(([a-zA-Z]+)\)$/
    }];
    for (var i = 0; i < regex.length; i++) {
      var match = key.match(regex[i].regex);
      if (match !== null) {
        return {
          type: regex[i].type,
          value: match[1]
        };
      }
    }
    ;
    return {
      type: undefined,
      value: key
    };
  }
  function applyValueToProperties(el, properties, value) {
    properties.forEach(function(property) {
      var splitted = property.split('.');
      if (splitted.length === 1) {
        el.prop(camelcase(property), value);
      } else {
        var root = splitted.shift();
        if (root === 'class') {
          var method = value ? 'addClass' : 'removeClass';
          el[method](splitted.join('.'));
        } else {
          var runner = el.prop(camelcase(root));
          while (splitted.length > 1) {
            runner = runner[camelcase(splitted.shift())];
          }
          runner[camelcase(splitted.shift())] = value;
        }
      }
    });
  }
  function inject(target) {
    var annotations = target.__annotations__ || {};
    var injectables = [];
    if (annotations.inject) {
      annotations.inject.forEach(function(injectable, index) {
        if (typeof injectable === 'string') {
          injectables[index] = injectable;
        } else if (injectable) {
          injectables[index] = injectable.name;
        }
      });
    }
    if (Reflect.hasMetadata('design:paramtypes', target)) {
      Reflect.getMetadata('design:paramtypes', target).forEach(function(type, index) {
        if (type.name !== 'Object') {
          injectables[index] = type.name;
        }
      });
    }
    target.$inject = injectables;
  }
  exports.inject = inject;
  function bindInput(target, directive) {
    var annotations = target.__annotations__;
    var component = annotations.component || annotations.directive;
    function signOf(key) {
      if (Reflect.hasMetadata('design:type', target.prototype, key)) {
        var type = Reflect.getMetadata('design:type', target.prototype, key);
        if (type.name === 'String') {
          return '@';
        } else {
          return '=';
        }
      }
      return '@';
    }
    (component.inputs || []).forEach(function(key) {
      var mapping = key.split(/:[ ]*/);
      directive.bindToController[mapping[0]] = signOf(key) + (mapping[1] || mapping[0]);
    });
    Object.keys(annotations.inputs || {}).forEach(function(key) {
      directive.bindToController[key] = signOf(key) + annotations.inputs[key];
    });
  }
  exports.bindInput = bindInput;
  function bindOutput(target, directive) {
    var annotations = target.__annotations__;
    var component = annotations.component || annotations.directive;
    (component.outputs || []).forEach(function(key) {
      var mapping = key.split(/:[ ]*/);
      directive.bindToController[mapping[0]] = '&' + (mapping[1] || mapping[0]);
    });
    Object.keys(annotations.outputs || {}).forEach(function(key) {
      return directive.bindToController[key] = "&" + annotations.outputs[key];
    });
  }
  exports.bindOutput = bindOutput;
  function parseHosts(hostBindings) {
    var result = {
      attrs: {},
      events: {},
      props: {
        raw: {},
        expressions: {}
      }
    };
    Object.keys(hostBindings).forEach(function(key) {
      var value = hostBindings[key];
      var parsed = parseHostBinding(key);
      if (parsed.type === 'attr') {
        result.attrs[parsed.value] = value;
      } else if (parsed.type === 'event') {
        var handler = value.match(/^([a-zA-Z]+)\((.*?)\)$/);
        var method = handler[1];
        var params = handler[2].length === 0 ? [] : handler[2].split(/,[ ]*/);
        result.events[parsed.value] = {
          method: method,
          params: params
        };
      } else if (parsed.type === 'prop') {
        var raw = value.match(/^['"](.*?)['"]$/);
        var map = 'expressions';
        if (raw) {
          value = raw[1];
          map = 'raw';
        }
        result.props[map][value] = result.props[map][value] || [];
        result.props[map][value].push(parsed.value);
      }
    });
    return result;
  }
  exports.parseHosts = parseHosts;
  function bindHostBindings(scope, el, hostBindings, controllerAs) {
    if (controllerAs === void 0) {
      controllerAs = '$ctrl';
    }
    Object.keys(hostBindings.attrs).forEach(function(attribute) {
      el.attr(attribute, hostBindings.attrs[attribute]);
    });
    Object.keys(hostBindings.events).forEach(function(event) {
      var target = hostBindings.events[event];
      el.bind(event, function(e) {
        var ctx = {$event: e};
        scope.$apply(function() {
          scope[controllerAs][target.method].apply(scope[controllerAs], target.params.map(function(param) {
            return dotProp.get(ctx, param);
          }));
        });
      });
    });
    Object.keys(hostBindings.props.raw).forEach(function(value) {
      var properties = hostBindings.props.raw[value];
      applyValueToProperties(el, properties, value);
    });
    Object.keys(hostBindings.props.expressions).forEach(function(expression) {
      var properties = hostBindings.props.expressions[expression];
      scope.$watch(controllerAs + "." + expression, function(newValue) {
        applyValueToProperties(el, properties, newValue);
      });
    });
  }
  exports.bindHostBindings = bindHostBindings;
  function bootstrapHelper(ngModule, target) {
    if (Array.isArray(target)) {
      return target.forEach(function(target) {
        return bootstrapHelper(ngModule, target);
      });
    }
    if (target.__annotations__) {
      if (target.__annotations__.component) {
        return component_1.bootstrap(ngModule, target);
      } else if (target.__annotations__.directive) {
        return directive_1.bootstrap(ngModule, target);
      } else if (target.__annotations__.pipe) {
        return pipe_1.bootstrap(ngModule, target);
      }
    }
    return injectable_1.bootstrap(ngModule, target);
  }
  exports.bootstrapHelper = bootstrapHelper;
  return module.exports;
});

System.registerDynamic("angular2-polyfill/src/platform/upgrade", ["./bootstrap/core", "./bootstrap/utils"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var core_1 = $__require('./bootstrap/core');
  var utils_1 = $__require('./bootstrap/utils');
  function bootstrap(ngModule, component, providers) {
    if (providers === void 0) {
      providers = [];
    }
    core_1.bootstrap(ngModule, component);
    utils_1.bootstrapHelper(ngModule, component);
    providers.forEach(function(provider) {
      return utils_1.bootstrapHelper(ngModule, provider);
    });
  }
  exports.bootstrap = bootstrap;
  return module.exports;
});

System.registerDynamic("angular2-polyfill/platform/upgrade", ["../src/platform/upgrade"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var upgrade_1 = $__require('../src/platform/upgrade');
  exports.bootstrap = upgrade_1.bootstrap;
  return module.exports;
});

System.registerDynamic("angular2-polyfill/src/router/decorators/RouteConfig", ["../../utils"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var utils_1 = $__require('../../utils');
  function RouteConfig(routes) {
    return function(target) {
      utils_1.annotate(target, 'routes', routes);
    };
  }
  exports.RouteConfig = RouteConfig;
  return module.exports;
});

System.registerDynamic("angular2-polyfill/src/router/lifecycle/lifecycle_annotations", ["../../utils"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var utils_1 = $__require('../../utils');
  function CanActivate(hook) {
    return function(target) {
      utils_1.annotate(target, 'router.canActivate', hook);
    };
  }
  exports.CanActivate = CanActivate;
  return module.exports;
});

System.registerDynamic("angular2-polyfill/src/router/router", ["../../core", "./instruction"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('../../core');
  var instruction_1 = $__require('./instruction');
  var Router = (function() {
    function Router(state) {
      this.state = state;
    }
    Router.prototype.isRouteActive = function(instruction) {
      return this.state.is(instruction._state, instruction.urlParams);
    };
    Router.prototype.navigate = function(linkParams) {
      return this.state.go(linkParams[0], linkParams[1] || {});
    };
    Router.prototype.renavigate = function() {
      return this.state.reload(this.state.current);
    };
    Router.prototype.generate = function(linkParams) {
      var state = linkParams[0];
      var params = linkParams[1] || {};
      var url = this.state.href(state, params);
      var instruction = new instruction_1.Instruction();
      instruction._state = state;
      instruction.urlPath = this.state.href(state, params);
      instruction.urlParams = params;
      return Promise.resolve(instruction);
    };
    Router = __decorate([__param(0, core_1.Inject('$state'))], Router);
    return Router;
  }());
  exports.Router = Router;
  return module.exports;
});

System.registerDynamic("angular2-polyfill/src/core/decorators/Component", ["../../utils"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var utils_1 = $__require('../../utils');
  function Component(component) {
    return function(target) {
      utils_1.annotate(target, 'component', component);
    };
  }
  exports.Component = Component;
  return module.exports;
});

System.registerDynamic("angular2-polyfill/src/core/decorators/Directive", ["../../utils"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var utils_1 = $__require('../../utils');
  function Directive(options) {
    return function(target) {
      utils_1.annotate(target, 'directive', options);
    };
  }
  exports.Directive = Directive;
  return module.exports;
});

System.registerDynamic("angular2-polyfill/src/core/decorators/Inject", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function Inject(token) {
    return function(target, propertyKey, parameterIndex) {
      if (!target.__annotations__) {
        target.__annotations__ = {};
      }
      if (!target.__annotations__.inject) {
        target.__annotations__.inject = [];
      }
      target.__annotations__.inject[parameterIndex] = token;
    };
  }
  exports.Inject = Inject;
  return module.exports;
});

System.registerDynamic("angular2-polyfill/src/core/decorators/Injectable", ["../../utils"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var utils_1 = $__require('../../utils');
  function Injectable() {
    return function(target) {
      utils_1.annotate(target, 'injectable', true);
    };
  }
  exports.Injectable = Injectable;
  return module.exports;
});

System.registerDynamic("angular2-polyfill/src/core/decorators/Input", ["../../utils"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var utils_1 = $__require('../../utils');
  function Input(bindingPropertyName) {
    return function(target, propertyKey) {
      utils_1.annotate(target.constructor, "inputs." + propertyKey, bindingPropertyName || propertyKey);
    };
  }
  exports.Input = Input;
  return module.exports;
});

System.registerDynamic("angular2-polyfill/src/core/decorators/Output", ["../../utils"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var utils_1 = $__require('../../utils');
  function Output(bindingPropertyName) {
    return function(target, propertyKey) {
      utils_1.annotate(target.constructor, "outputs." + propertyKey, bindingPropertyName || propertyKey);
    };
  }
  exports.Output = Output;
  return module.exports;
});

System.registerDynamic("is-obj", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = function(x) {
    var type = typeof x;
    return x !== null && (type === 'object' || type === 'function');
  };
  return module.exports;
});

System.registerDynamic("dot-prop", ["is-obj"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isObj = $__require('is-obj');
  module.exports.get = function(obj, path) {
    if (!isObj(obj) || typeof path !== 'string') {
      return obj;
    }
    var pathArr = getPathSegments(path);
    for (var i = 0; i < pathArr.length; i++) {
      obj = obj[pathArr[i]];
      if (obj === undefined) {
        break;
      }
    }
    return obj;
  };
  module.exports.set = function(obj, path, value) {
    if (!isObj(obj) || typeof path !== 'string') {
      return;
    }
    var pathArr = getPathSegments(path);
    for (var i = 0; i < pathArr.length; i++) {
      var p = pathArr[i];
      if (!isObj(obj[p])) {
        obj[p] = {};
      }
      if (i === pathArr.length - 1) {
        obj[p] = value;
      }
      obj = obj[p];
    }
  };
  module.exports.delete = function(obj, path) {
    if (!isObj(obj) || typeof path !== 'string') {
      return;
    }
    var pathArr = getPathSegments(path);
    for (var i = 0; i < pathArr.length; i++) {
      var p = pathArr[i];
      if (i === pathArr.length - 1) {
        delete obj[p];
        return;
      }
      obj = obj[p];
    }
  };
  module.exports.has = function(obj, path) {
    if (!isObj(obj) || typeof path !== 'string') {
      return false;
    }
    var pathArr = getPathSegments(path);
    for (var i = 0; i < pathArr.length; i++) {
      obj = obj[pathArr[i]];
      if (obj === undefined) {
        return false;
      }
    }
    return true;
  };
  function getPathSegments(path) {
    var pathArr = path.split('.');
    var parts = [];
    for (var i = 0; i < pathArr.length; i++) {
      var p = pathArr[i];
      while (p[p.length - 1] === '\\') {
        p = p.slice(0, -1) + '.';
        p += pathArr[++i];
      }
      parts.push(p);
    }
    return parts;
  }
  return module.exports;
});

System.registerDynamic("angular2-polyfill/src/utils", ["dot-prop"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var dotProp = $__require('dot-prop');
  function annotate(target, key, value) {
    if (!target.__annotations__) {
      target.__annotations__ = {};
    }
    dotProp.set(target.__annotations__, key, value);
  }
  exports.annotate = annotate;
  return module.exports;
});

System.registerDynamic("angular2-polyfill/src/core/decorators/Pipe", ["../../utils"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var utils_1 = $__require('../../utils');
  function Pipe(pipe) {
    return function(target) {
      utils_1.annotate(target, 'pipe', pipe);
    };
  }
  exports.Pipe = Pipe;
  return module.exports;
});

System.registerDynamic("angular2-polyfill/src/core/core", ["./decorators/Component", "./decorators/Directive", "./decorators/Inject", "./decorators/Injectable", "./decorators/Input", "./decorators/Output", "./decorators/Pipe"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Component_1 = $__require('./decorators/Component');
  exports.Component = Component_1.Component;
  var Directive_1 = $__require('./decorators/Directive');
  exports.Directive = Directive_1.Directive;
  var Inject_1 = $__require('./decorators/Inject');
  exports.Inject = Inject_1.Inject;
  var Injectable_1 = $__require('./decorators/Injectable');
  exports.Injectable = Injectable_1.Injectable;
  var Input_1 = $__require('./decorators/Input');
  exports.Input = Input_1.Input;
  var Output_1 = $__require('./decorators/Output');
  exports.Output = Output_1.Output;
  var Pipe_1 = $__require('./decorators/Pipe');
  exports.Pipe = Pipe_1.Pipe;
  return module.exports;
});

System.registerDynamic("angular2-polyfill/core", ["./src/core/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  __export($__require('./src/core/core'));
  return module.exports;
});

System.registerDynamic("angular2-polyfill/src/router/instruction", ["../../core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('../../core');
  var RouteParams = (function() {
    function RouteParams(stateParams) {
      this.stateParams = stateParams;
    }
    RouteParams.prototype.get = function(param) {
      return this.stateParams[param];
    };
    RouteParams = __decorate([__param(0, core_1.Inject('$stateParams'))], RouteParams);
    return RouteParams;
  }());
  exports.RouteParams = RouteParams;
  var Instruction = (function() {
    function Instruction() {}
    return Instruction;
  }());
  exports.Instruction = Instruction;
  return module.exports;
});

System.registerDynamic("angular2-polyfill/src/router/providers", ["./router", "./instruction"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var router_1 = $__require('./router');
  var instruction_1 = $__require('./instruction');
  exports.ROUTER_PROVIDERS = [router_1.Router, instruction_1.RouteParams];
  return module.exports;
});

System.registerDynamic("angular2-polyfill/router", ["./src/router/router", "./src/router/instruction", "./src/router/decorators/RouteConfig", "./src/router/lifecycle/lifecycle_annotations", "./src/router/providers"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var router_1 = $__require('./src/router/router');
  exports.Router = router_1.Router;
  var instruction_1 = $__require('./src/router/instruction');
  exports.RouteParams = instruction_1.RouteParams;
  var instruction_2 = $__require('./src/router/instruction');
  exports.Instruction = instruction_2.Instruction;
  var RouteConfig_1 = $__require('./src/router/decorators/RouteConfig');
  exports.RouteConfig = RouteConfig_1.RouteConfig;
  var lifecycle_annotations_1 = $__require('./src/router/lifecycle/lifecycle_annotations');
  exports.CanActivate = lifecycle_annotations_1.CanActivate;
  var providers_1 = $__require('./src/router/providers');
  exports.ROUTER_PROVIDERS = providers_1.ROUTER_PROVIDERS;
  return module.exports;
});

//# sourceMappingURL=angular2-polyfill.js.map