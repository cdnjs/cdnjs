"format register";
System.register("angular2/src/router/url", ["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/url";
  var RegExpWrapper,
      StringWrapper,
      specialCharacters,
      escapeRe;
  function escapeRegex(string) {
    return StringWrapper.replaceAllMapped(string, escapeRe, (function(match) {
      return "\\" + match;
    }));
  }
  $__export("escapeRegex", escapeRegex);
  return {
    setters: [function($__m) {
      RegExpWrapper = $__m.RegExpWrapper;
      StringWrapper = $__m.StringWrapper;
    }],
    execute: function() {
      specialCharacters = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
      escapeRe = RegExpWrapper.create('(\\' + specialCharacters.join('|\\') + ')', 'g');
      Object.defineProperty(escapeRegex, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
    }
  };
});

System.register("angular2/src/router/instruction", ["angular2/src/facade/collection", "angular2/src/facade/async", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/instruction";
  var Map,
      MapWrapper,
      StringMap,
      StringMapWrapper,
      List,
      ListWrapper,
      Promise,
      PromiseWrapper,
      isPresent,
      RouteParams,
      Instruction,
      noopInstruction;
  function mapObjAsync(obj, fn) {
    return PromiseWrapper.all(mapObj(obj, fn));
  }
  function mapObj(obj, fn) {
    var result = ListWrapper.create();
    StringMapWrapper.forEach(obj, (function(value, key) {
      return ListWrapper.push(result, fn(value, key));
    }));
    return result;
  }
  return {
    setters: [function($__m) {
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
      StringMap = $__m.StringMap;
      StringMapWrapper = $__m.StringMapWrapper;
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      Promise = $__m.Promise;
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }],
    execute: function() {
      RouteParams = (function() {
        function RouteParams(params) {
          this.params = params;
        }
        return ($traceurRuntime.createClass)(RouteParams, {get: function(param) {
            return StringMapWrapper.get(this.params, param);
          }}, {});
      }());
      $__export("RouteParams", RouteParams);
      Object.defineProperty(RouteParams, "parameters", {get: function() {
          return [[StringMap]];
        }});
      Object.defineProperty(RouteParams.prototype.get, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Instruction = (function() {
        function Instruction() {
          var $__2 = arguments[0] !== (void 0) ? arguments[0] : {},
              params = $__2.params,
              component = $__2.component,
              children = $__2.children,
              matchedUrl = $__2.matchedUrl;
          this.matchedUrl = matchedUrl;
          if (isPresent(children)) {
            this._children = children;
            var childUrl;
            StringMapWrapper.forEach(this._children, (function(child, _) {
              childUrl = child.matchedUrl;
            }));
            if (isPresent(childUrl)) {
              this.matchedUrl += childUrl;
            }
          } else {
            this._children = StringMapWrapper.create();
          }
          this.component = component;
          this.params = params;
        }
        return ($traceurRuntime.createClass)(Instruction, {
          getChildInstruction: function(outletName) {
            return StringMapWrapper.get(this._children, outletName);
          },
          forEachChild: function(fn) {
            StringMapWrapper.forEach(this._children, fn);
          },
          mapChildrenAsync: function(fn) {
            return mapObjAsync(this._children, fn);
          },
          traverseSync: function(fn) {
            var $__0 = this;
            this.forEachChild((function(childInstruction, _) {
              return fn($__0, childInstruction);
            }));
            this.forEachChild((function(childInstruction, _) {
              return childInstruction.traverseSync(fn);
            }));
          }
        }, {});
      }());
      $__export("Instruction", Instruction);
      Object.defineProperty(Instruction.prototype.getChildInstruction, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(Instruction.prototype.forEachChild, "parameters", {get: function() {
          return [[Function]];
        }});
      Object.defineProperty(Instruction.prototype.traverseSync, "parameters", {get: function() {
          return [[Function]];
        }});
      Object.defineProperty(mapObjAsync, "parameters", {get: function() {
          return [[StringMap], []];
        }});
      Object.defineProperty(mapObj, "parameters", {get: function() {
          return [[StringMap], []];
        }});
      noopInstruction = new Instruction();
      $__export("noopInstruction", noopInstruction);
    }
  };
});

System.register("angular2/src/router/route_config_impl", ["angular2/src/facade/lang", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/route_config_impl";
  var CONST,
      List,
      Map,
      RouteConfig;
  return {
    setters: [function($__m) {
      CONST = $__m.CONST;
    }, function($__m) {
      List = $__m.List;
      Map = $__m.Map;
    }],
    execute: function() {
      RouteConfig = (function() {
        function RouteConfig(configs) {
          this.configs = configs;
        }
        return ($traceurRuntime.createClass)(RouteConfig, {}, {});
      }());
      $__export("RouteConfig", RouteConfig);
      Object.defineProperty(RouteConfig, "annotations", {get: function() {
          return [new CONST()];
        }});
      Object.defineProperty(RouteConfig, "parameters", {get: function() {
          return [[assert.genericType(List, Map)]];
        }});
    }
  };
});

System.register("angular2/src/router/pipeline", ["angular2/src/facade/async", "angular2/src/facade/collection", "angular2/src/router/instruction"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/pipeline";
  var Promise,
      PromiseWrapper,
      List,
      ListWrapper,
      Instruction,
      Pipeline;
  return {
    setters: [function($__m) {
      Promise = $__m.Promise;
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      Instruction = $__m.Instruction;
    }],
    execute: function() {
      Pipeline = (function() {
        function Pipeline() {
          this.steps = [(function(instruction) {
            return instruction.traverseSync((function(parentInstruction, childInstruction) {
              childInstruction.router = parentInstruction.router.childRouter(childInstruction.component);
            }));
          }), (function(instruction) {
            return instruction.router.traverseOutlets((function(outlet, name) {
              return outlet.canDeactivate(instruction.getChildInstruction(name));
            }));
          }), (function(instruction) {
            return instruction.router.traverseOutlets((function(outlet, name) {
              return outlet.canActivate(instruction.getChildInstruction(name));
            }));
          }), (function(instruction) {
            return instruction.router.activateOutlets(instruction);
          })];
        }
        return ($traceurRuntime.createClass)(Pipeline, {process: function(instruction) {
            var steps = this.steps,
                currentStep = 0;
            function processOne() {
              var result = arguments[0] !== (void 0) ? arguments[0] : true;
              if (currentStep >= steps.length) {
                return PromiseWrapper.resolve(result);
              }
              var step = steps[currentStep];
              currentStep += 1;
              return PromiseWrapper.resolve(step(instruction)).then(processOne);
            }
            Object.defineProperty(processOne, "parameters", {get: function() {
                return [[assert.type.any]];
              }});
            return processOne();
          }}, {});
      }());
      $__export("Pipeline", Pipeline);
      Object.defineProperty(Pipeline.prototype.process, "parameters", {get: function() {
          return [[Instruction]];
        }});
    }
  };
});

System.register("angular2/src/router/location", ["angular2/src/facade/lang", "angular2/src/facade/async"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/location";
  var global,
      EventEmitter,
      ObservableWrapper,
      Location;
  return {
    setters: [function($__m) {
      global = $__m.global;
    }, function($__m) {
      EventEmitter = $__m.EventEmitter;
      ObservableWrapper = $__m.ObservableWrapper;
    }],
    execute: function() {
      Location = (function() {
        function Location() {
          var $__0 = this;
          this._subject = new EventEmitter();
          this._location = global.location;
          this._history = global.history;
          global.addEventListener('popstate', (function(_) {
            return $__0._onPopState(_);
          }), false);
        }
        return ($traceurRuntime.createClass)(Location, {
          _onPopState: function(_) {
            ObservableWrapper.callNext(this._subject, {'url': this._location.pathname});
          },
          path: function() {
            return this._location.pathname;
          },
          go: function(url) {
            this._history.pushState(null, null, url);
          },
          forward: function() {
            this._history.forward();
          },
          back: function() {
            this._history.back();
          },
          subscribe: function(onNext) {
            var onThrow = arguments[1] !== (void 0) ? arguments[1] : null;
            var onReturn = arguments[2] !== (void 0) ? arguments[2] : null;
            ObservableWrapper.subscribe(this._subject, onNext, onThrow, onReturn);
          }
        }, {});
      }());
      $__export("Location", Location);
      Object.defineProperty(Location.prototype.go, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
    }
  };
});

System.register("angular2/src/router/router_link", ["angular2/src/core/annotations_impl/annotations", "angular2/core", "angular2/src/facade/lang", "angular2/src/dom/dom_adapter", "angular2/src/router/router"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/router_link";
  var Directive,
      ElementRef,
      isPresent,
      DOM,
      Router,
      RouterLink;
  return {
    setters: [function($__m) {
      Directive = $__m.Directive;
    }, function($__m) {
      ElementRef = $__m.ElementRef;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Router = $__m.Router;
    }],
    execute: function() {
      RouterLink = (function() {
        function RouterLink(elementRef, router) {
          this._domEl = elementRef.domElement;
          this._router = router;
        }
        return ($traceurRuntime.createClass)(RouterLink, {
          set route(changes) {
            this._route = changes;
            this.updateHref();
          },
          set params(changes) {
            this._params = changes;
            this.updateHref();
          },
          updateHref: function() {
            if (isPresent(this._route) && isPresent(this._params)) {
              var newHref = this._router.generate(this._route, this._params);
              DOM.setAttribute(this._domEl, 'href', newHref);
            }
          }
        }, {});
      }());
      $__export("RouterLink", RouterLink);
      Object.defineProperty(RouterLink, "annotations", {get: function() {
          return [new Directive({
            selector: '[router-link]',
            properties: {
              'route': 'routerLink',
              'params': 'routerParams'
            }
          })];
        }});
      Object.defineProperty(RouterLink, "parameters", {get: function() {
          return [[ElementRef], [Router]];
        }});
    }
  };
});

System.register("angular2/src/router/route_config_annotation", ["angular2/src/router/route_config_impl"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/route_config_annotation";
  return {
    setters: [function($__m) {
      $__export("RouteConfigAnnotation", $__m.RouteConfig);
    }],
    execute: function() {}
  };
});

System.register("angular2/src/router/route_config_decorator", ["angular2/src/router/route_config_impl", "angular2/src/util/decorators"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/route_config_decorator";
  var RouteConfigAnnotation,
      makeDecorator,
      RouteConfig;
  return {
    setters: [function($__m) {
      RouteConfigAnnotation = $__m.RouteConfig;
    }, function($__m) {
      makeDecorator = $__m.makeDecorator;
    }],
    execute: function() {
      RouteConfig = makeDecorator(RouteConfigAnnotation);
      $__export("RouteConfig", RouteConfig);
    }
  };
});

System.register("angular2/src/router/path_recognizer", ["angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/router/url"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/path_recognizer";
  var RegExp,
      RegExpWrapper,
      RegExpMatcherWrapper,
      StringWrapper,
      isPresent,
      Map,
      MapWrapper,
      StringMap,
      StringMapWrapper,
      List,
      ListWrapper,
      escapeRegex,
      StaticSegment,
      DynamicSegment,
      StarSegment,
      paramMatcher,
      wildcardMatcher,
      SLASH_RE,
      PathRecognizer;
  function parsePathString(route) {
    if (route[0] === "/") {
      route = StringWrapper.substring(route, 1);
    }
    var segments = splitBySlash(route);
    var results = ListWrapper.create();
    for (var i = 0; i < segments.length; i++) {
      var segment = segments[i],
          match = void 0;
      if (isPresent(match = RegExpWrapper.firstMatch(paramMatcher, segment))) {
        ListWrapper.push(results, new DynamicSegment(match[1]));
      } else if (isPresent(match = RegExpWrapper.firstMatch(wildcardMatcher, segment))) {
        ListWrapper.push(results, new StarSegment(match[1]));
      } else if (segment.length > 0) {
        ListWrapper.push(results, new StaticSegment(segment));
      }
    }
    return results;
  }
  function splitBySlash(url) {
    return StringWrapper.split(url, SLASH_RE);
  }
  return {
    setters: [function($__m) {
      RegExp = $__m.RegExp;
      RegExpWrapper = $__m.RegExpWrapper;
      RegExpMatcherWrapper = $__m.RegExpMatcherWrapper;
      StringWrapper = $__m.StringWrapper;
      isPresent = $__m.isPresent;
    }, function($__m) {
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
      StringMap = $__m.StringMap;
      StringMapWrapper = $__m.StringMapWrapper;
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      escapeRegex = $__m.escapeRegex;
    }],
    execute: function() {
      StaticSegment = (function() {
        function StaticSegment(string) {
          this.string = string;
          this.name = '';
          this.regex = escapeRegex(string);
        }
        return ($traceurRuntime.createClass)(StaticSegment, {generate: function(params) {
            return this.string;
          }}, {});
      }());
      Object.defineProperty(StaticSegment, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      DynamicSegment = (function() {
        function DynamicSegment(name) {
          this.name = name;
          this.regex = "([^/]+)";
        }
        return ($traceurRuntime.createClass)(DynamicSegment, {generate: function(params) {
            return StringMapWrapper.get(params, this.name);
          }}, {});
      }());
      Object.defineProperty(DynamicSegment, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(DynamicSegment.prototype.generate, "parameters", {get: function() {
          return [[StringMap]];
        }});
      StarSegment = (function() {
        function StarSegment(name) {
          this.name = name;
          this.regex = "(.+)";
        }
        return ($traceurRuntime.createClass)(StarSegment, {generate: function(params) {
            return StringMapWrapper.get(params, this.name);
          }}, {});
      }());
      Object.defineProperty(StarSegment, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(StarSegment.prototype.generate, "parameters", {get: function() {
          return [[StringMap]];
        }});
      paramMatcher = RegExpWrapper.create("^:([^\/]+)$");
      wildcardMatcher = RegExpWrapper.create("^\\*([^\/]+)$");
      Object.defineProperty(parsePathString, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      SLASH_RE = RegExpWrapper.create('/');
      Object.defineProperty(splitBySlash, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      PathRecognizer = (function() {
        function PathRecognizer(path, handler) {
          this.handler = handler;
          this.segments = ListWrapper.create();
          var segments = parsePathString(path);
          var regexString = '^';
          ListWrapper.forEach(segments, (function(segment) {
            regexString += '/' + segment.regex;
          }));
          this.regex = RegExpWrapper.create(regexString);
          this.segments = segments;
        }
        return ($traceurRuntime.createClass)(PathRecognizer, {
          parseParams: function(url) {
            var params = StringMapWrapper.create();
            var urlPart = url;
            for (var i = 0; i < this.segments.length; i++) {
              var segment = this.segments[i];
              var match = RegExpWrapper.firstMatch(RegExpWrapper.create('/' + segment.regex), urlPart);
              urlPart = StringWrapper.substring(urlPart, match[0].length);
              if (segment.name.length > 0) {
                StringMapWrapper.set(params, segment.name, match[1]);
              }
            }
            return params;
          },
          generate: function(params) {
            return ListWrapper.join(ListWrapper.map(this.segments, (function(segment) {
              return '/' + segment.generate(params);
            })), '');
          }
        }, {});
      }());
      $__export("PathRecognizer", PathRecognizer);
      Object.defineProperty(PathRecognizer, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.any]];
        }});
      Object.defineProperty(PathRecognizer.prototype.parseParams, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(PathRecognizer.prototype.generate, "parameters", {get: function() {
          return [[StringMap]];
        }});
    }
  };
});

System.register("angular2/src/router/route_recognizer", ["angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/router/path_recognizer"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/route_recognizer";
  var RegExp,
      RegExpWrapper,
      StringWrapper,
      isPresent,
      Map,
      MapWrapper,
      List,
      ListWrapper,
      StringMap,
      StringMapWrapper,
      PathRecognizer,
      RouteRecognizer;
  return {
    setters: [function($__m) {
      RegExp = $__m.RegExp;
      RegExpWrapper = $__m.RegExpWrapper;
      StringWrapper = $__m.StringWrapper;
      isPresent = $__m.isPresent;
    }, function($__m) {
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      StringMap = $__m.StringMap;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      PathRecognizer = $__m.PathRecognizer;
    }],
    execute: function() {
      RouteRecognizer = (function() {
        function RouteRecognizer() {
          this.names = MapWrapper.create();
          this.matchers = MapWrapper.create();
          this.redirects = MapWrapper.create();
        }
        return ($traceurRuntime.createClass)(RouteRecognizer, {
          addRedirect: function(path, target) {
            MapWrapper.set(this.redirects, path, target);
          },
          addConfig: function(path, handler) {
            var alias = arguments[2] !== (void 0) ? arguments[2] : null;
            var recognizer = new PathRecognizer(path, handler);
            MapWrapper.set(this.matchers, recognizer.regex, recognizer);
            if (isPresent(alias)) {
              MapWrapper.set(this.names, alias, recognizer);
            }
          },
          recognize: function(url) {
            var solutions = [];
            MapWrapper.forEach(this.redirects, (function(target, path) {
              if (StringWrapper.startsWith(url, path)) {
                url = target + StringWrapper.substring(url, path.length);
              }
            }));
            MapWrapper.forEach(this.matchers, (function(pathRecognizer, regex) {
              var match;
              if (isPresent(match = RegExpWrapper.firstMatch(regex, url))) {
                var solution = StringMapWrapper.create();
                StringMapWrapper.set(solution, 'handler', pathRecognizer.handler);
                StringMapWrapper.set(solution, 'params', pathRecognizer.parseParams(url));
                if (url === '/') {
                  StringMapWrapper.set(solution, 'matchedUrl', '/');
                  StringMapWrapper.set(solution, 'unmatchedUrl', '');
                } else {
                  StringMapWrapper.set(solution, 'matchedUrl', match[0]);
                  var unmatchedUrl = StringWrapper.substring(url, match[0].length);
                  StringMapWrapper.set(solution, 'unmatchedUrl', unmatchedUrl);
                }
                ListWrapper.push(solutions, solution);
              }
            }));
            return solutions;
          },
          hasRoute: function(name) {
            return MapWrapper.contains(this.names, name);
          },
          generate: function(name, params) {
            var pathRecognizer = MapWrapper.get(this.names, name);
            return pathRecognizer.generate(params);
          }
        }, {});
      }());
      $__export("RouteRecognizer", RouteRecognizer);
      Object.defineProperty(RouteRecognizer.prototype.addRedirect, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(RouteRecognizer.prototype.addConfig, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.any], [assert.type.string]];
        }});
      Object.defineProperty(RouteRecognizer.prototype.recognize, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(RouteRecognizer.prototype.hasRoute, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(RouteRecognizer.prototype.generate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.any]];
        }});
    }
  };
});

System.register("angular2/src/router/route_registry", ["angular2/src/router/route_recognizer", "angular2/src/router/instruction", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/router/route_config_impl", "angular2/src/reflection/reflection"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/route_registry";
  var RouteRecognizer,
      Instruction,
      noopInstruction,
      List,
      ListWrapper,
      Map,
      MapWrapper,
      StringMap,
      StringMapWrapper,
      isPresent,
      isBlank,
      isType,
      StringWrapper,
      BaseException,
      RouteConfig,
      reflector,
      RouteRegistry;
  function handlerToLeafInstructions(context, parentComponent) {
    var children = StringMapWrapper.create();
    StringMapWrapper.forEach(context['handler']['components'], (function(component, outletName) {
      children[outletName] = new Instruction({
        component: component,
        params: context['params']
      });
    }));
    return new Instruction({
      component: parentComponent,
      children: children,
      matchedUrl: context['matchedUrl']
    });
  }
  function normalizeConfig(config) {
    if (StringMapWrapper.contains(config, 'component')) {
      var component = StringMapWrapper.get(config, 'component');
      var components = StringMapWrapper.create();
      StringMapWrapper.set(components, 'default', component);
      var newConfig = StringMapWrapper.create();
      StringMapWrapper.set(newConfig, 'components', components);
      StringMapWrapper.forEach(config, (function(value, key) {
        if (!StringWrapper.equals(key, 'component') && !StringWrapper.equals(key, 'components')) {
          StringMapWrapper.set(newConfig, key, value);
        }
      }));
      return newConfig;
    }
    return config;
  }
  return {
    setters: [function($__m) {
      RouteRecognizer = $__m.RouteRecognizer;
    }, function($__m) {
      Instruction = $__m.Instruction;
      noopInstruction = $__m.noopInstruction;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
      StringMap = $__m.StringMap;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      isType = $__m.isType;
      StringWrapper = $__m.StringWrapper;
      BaseException = $__m.BaseException;
    }, function($__m) {
      RouteConfig = $__m.RouteConfig;
    }, function($__m) {
      reflector = $__m.reflector;
    }],
    execute: function() {
      RouteRegistry = (function() {
        function RouteRegistry() {
          this._rules = MapWrapper.create();
        }
        return ($traceurRuntime.createClass)(RouteRegistry, {
          config: function(parentComponent, config) {
            var $__0 = this;
            if (!StringMapWrapper.contains(config, 'path')) {
              throw new BaseException('Route config does not contain "path"');
            }
            if (!StringMapWrapper.contains(config, 'component') && !StringMapWrapper.contains(config, 'components') && !StringMapWrapper.contains(config, 'redirectTo')) {
              throw new BaseException('Route config does not contain "component," "components," or "redirectTo"');
            }
            var recognizer;
            if (MapWrapper.contains(this._rules, parentComponent)) {
              recognizer = MapWrapper.get(this._rules, parentComponent);
            } else {
              recognizer = new RouteRecognizer();
              MapWrapper.set(this._rules, parentComponent, recognizer);
            }
            config = normalizeConfig(config);
            if (StringMapWrapper.contains(config, 'redirectTo')) {
              recognizer.addRedirect(StringMapWrapper.get(config, 'path'), StringMapWrapper.get(config, 'redirectTo'));
              return ;
            }
            var components = StringMapWrapper.get(config, 'components');
            StringMapWrapper.forEach(components, (function(component, _) {
              $__0.configFromComponent(component);
            }));
            recognizer.addConfig(config['path'], config, config['as']);
          },
          configFromComponent: function(component) {
            var $__0 = this;
            if (!isType(component)) {
              return ;
            }
            if (MapWrapper.contains(this._rules, component)) {
              return ;
            }
            var annotations = reflector.annotations(component);
            if (isPresent(annotations)) {
              for (var i = 0; i < annotations.length; i++) {
                var annotation = annotations[i];
                if (annotation instanceof RouteConfig) {
                  ListWrapper.forEach(annotation.configs, (function(config) {
                    $__0.config(component, config);
                  }));
                }
              }
            }
          },
          recognize: function(url, parentComponent) {
            var $__0 = this;
            var componentRecognizer = MapWrapper.get(this._rules, parentComponent);
            if (isBlank(componentRecognizer)) {
              return null;
            }
            var solutions = componentRecognizer.recognize(url);
            for (var i = 0; i < solutions.length; i++) {
              var candidate = solutions[i];
              if (candidate['unmatchedUrl'].length == 0) {
                return handlerToLeafInstructions(candidate, parentComponent);
              }
              var children = StringMapWrapper.create(),
                  allMapped = true;
              StringMapWrapper.forEach(candidate['handler']['components'], (function(component, name) {
                if (!allMapped) {
                  return ;
                }
                var childInstruction = $__0.recognize(candidate['unmatchedUrl'], component);
                if (isPresent(childInstruction)) {
                  childInstruction.params = candidate['params'];
                  children[name] = childInstruction;
                } else {
                  allMapped = false;
                }
              }));
              if (allMapped) {
                return new Instruction({
                  component: parentComponent,
                  children: children,
                  matchedUrl: candidate['matchedUrl']
                });
              }
            }
            return null;
          },
          generate: function(name, params, hostComponent) {
            var componentRecognizer = MapWrapper.get(this._rules, hostComponent);
            if (isPresent(componentRecognizer)) {
              return componentRecognizer.generate(name, params);
            }
          }
        }, {});
      }());
      $__export("RouteRegistry", RouteRegistry);
      Object.defineProperty(RouteRegistry.prototype.recognize, "parameters", {get: function() {
          return [[assert.type.string], []];
        }});
      Object.defineProperty(RouteRegistry.prototype.generate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.any], []];
        }});
      Object.defineProperty(normalizeConfig, "parameters", {get: function() {
          return [[StringMap]];
        }});
    }
  };
});

System.register("angular2/src/router/router_outlet", ["angular2/src/facade/async", "angular2/src/facade/lang", "angular2/src/core/annotations_impl/annotations", "angular2/src/core/annotations_impl/di", "angular2/core", "angular2/di", "angular2/src/router/router", "angular2/src/router/instruction"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/router_outlet";
  var Promise,
      PromiseWrapper,
      isBlank,
      Directive,
      Attribute,
      Compiler,
      ViewContainerRef,
      Injector,
      bind,
      routerMod,
      Instruction,
      RouteParams,
      RouterOutlet;
  return {
    setters: [function($__m) {
      Promise = $__m.Promise;
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      isBlank = $__m.isBlank;
    }, function($__m) {
      Directive = $__m.Directive;
    }, function($__m) {
      Attribute = $__m.Attribute;
    }, function($__m) {
      Compiler = $__m.Compiler;
      ViewContainerRef = $__m.ViewContainerRef;
    }, function($__m) {
      Injector = $__m.Injector;
      bind = $__m.bind;
    }, function($__m) {
      routerMod = $__m;
    }, function($__m) {
      Instruction = $__m.Instruction;
      RouteParams = $__m.RouteParams;
    }],
    execute: function() {
      RouterOutlet = (function() {
        function RouterOutlet(viewContainer, compiler, router, injector, nameAttr) {
          if (isBlank(nameAttr)) {
            nameAttr = 'default';
          }
          this._router = router;
          this._viewContainer = viewContainer;
          this._compiler = compiler;
          this._injector = injector;
          this._router.registerOutlet(this, nameAttr);
        }
        return ($traceurRuntime.createClass)(RouterOutlet, {
          activate: function(instruction) {
            var $__0 = this;
            return this._compiler.compileInHost(instruction.component).then((function(pv) {
              var outletInjector = $__0._injector.resolveAndCreateChild([bind(RouteParams).toValue(new RouteParams(instruction.params)), bind(routerMod.Router).toValue(instruction.router)]);
              $__0._viewContainer.clear();
              $__0._viewContainer.create(pv, 0, outletInjector);
            }));
          },
          canActivate: function(instruction) {
            return PromiseWrapper.resolve(true);
          },
          canDeactivate: function(instruction) {
            return PromiseWrapper.resolve(true);
          }
        }, {});
      }());
      $__export("RouterOutlet", RouterOutlet);
      Object.defineProperty(RouterOutlet, "annotations", {get: function() {
          return [new Directive({selector: 'router-outlet'})];
        }});
      Object.defineProperty(RouterOutlet, "parameters", {get: function() {
          return [[ViewContainerRef], [Compiler], [routerMod.Router], [Injector], [new Attribute('name')]];
        }});
      Object.defineProperty(RouterOutlet.prototype.activate, "parameters", {get: function() {
          return [[Instruction]];
        }});
      Object.defineProperty(RouterOutlet.prototype.canActivate, "parameters", {get: function() {
          return [[assert.type.any]];
        }});
      Object.defineProperty(RouterOutlet.prototype.canDeactivate, "parameters", {get: function() {
          return [[assert.type.any]];
        }});
    }
  };
});

System.register("angular2/src/router/router", ["angular2/src/facade/async", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/router/route_registry", "angular2/src/router/pipeline", "angular2/src/router/instruction", "angular2/src/router/router_outlet", "angular2/src/router/location"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/router";
  var Promise,
      PromiseWrapper,
      EventEmitter,
      ObservableWrapper,
      Map,
      MapWrapper,
      List,
      ListWrapper,
      isBlank,
      Type,
      RouteRegistry,
      Pipeline,
      Instruction,
      RouterOutlet,
      Location,
      Router,
      RootRouter,
      ChildRouter;
  function mapObjAsync(obj, fn) {
    return PromiseWrapper.all(mapObj(obj, fn));
  }
  function mapObj(obj, fn) {
    var result = ListWrapper.create();
    MapWrapper.forEach(obj, (function(value, key) {
      return ListWrapper.push(result, fn(value, key));
    }));
    return result;
  }
  return {
    setters: [function($__m) {
      Promise = $__m.Promise;
      PromiseWrapper = $__m.PromiseWrapper;
      EventEmitter = $__m.EventEmitter;
      ObservableWrapper = $__m.ObservableWrapper;
    }, function($__m) {
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      isBlank = $__m.isBlank;
      Type = $__m.Type;
    }, function($__m) {
      RouteRegistry = $__m.RouteRegistry;
    }, function($__m) {
      Pipeline = $__m.Pipeline;
    }, function($__m) {
      Instruction = $__m.Instruction;
    }, function($__m) {
      RouterOutlet = $__m.RouterOutlet;
    }, function($__m) {
      Location = $__m.Location;
    }],
    execute: function() {
      Router = (function() {
        function Router(registry, pipeline, location, parent, hostComponent) {
          this.hostComponent = hostComponent;
          this.navigating = false;
          this.parent = parent;
          this.previousUrl = null;
          this._outlets = MapWrapper.create();
          this._children = MapWrapper.create();
          this._location = location;
          this._registry = registry;
          this._pipeline = pipeline;
          this._subject = new EventEmitter();
        }
        return ($traceurRuntime.createClass)(Router, {
          childRouter: function() {
            var outletName = arguments[0] !== (void 0) ? arguments[0] : 'default';
            if (!MapWrapper.contains(this._children, outletName)) {
              MapWrapper.set(this._children, outletName, new ChildRouter(this, outletName));
            }
            return MapWrapper.get(this._children, outletName);
          },
          registerOutlet: function(outlet) {
            var name = arguments[1] !== (void 0) ? arguments[1] : 'default';
            MapWrapper.set(this._outlets, name, outlet);
            return this.renavigate();
          },
          config: function(config) {
            var $__0 = this;
            if (config instanceof List) {
              config.forEach((function(configObject) {
                $__0._registry.config($__0.hostComponent, configObject);
              }));
            } else {
              this._registry.config(this.hostComponent, config);
            }
            return this.renavigate();
          },
          navigate: function(url) {
            var $__0 = this;
            if (this.navigating) {
              return PromiseWrapper.resolve(true);
            }
            this.lastNavigationAttempt = url;
            var instruction = this.recognize(url);
            if (isBlank(instruction)) {
              return PromiseWrapper.resolve(false);
            }
            instruction.router = this;
            this._startNavigating();
            var result = this._pipeline.process(instruction).then((function(_) {
              $__0._location.go(instruction.matchedUrl);
            })).then((function(_) {
              ObservableWrapper.callNext($__0._subject, instruction.matchedUrl);
            })).then((function(_) {
              return $__0._finishNavigating();
            }));
            PromiseWrapper.catchError(result, (function(_) {
              return $__0._finishNavigating();
            }));
            return result;
          },
          _startNavigating: function() {
            this.navigating = true;
          },
          _finishNavigating: function() {
            this.navigating = false;
          },
          subscribe: function(onNext) {
            ObservableWrapper.subscribe(this._subject, onNext);
          },
          activateOutlets: function(instruction) {
            return this._queryOutlets((function(outlet, name) {
              return outlet.activate(instruction.getChildInstruction(name));
            })).then((function(_) {
              return instruction.mapChildrenAsync((function(instruction, _) {
                return instruction.router.activateOutlets(instruction);
              }));
            }));
          },
          traverseOutlets: function(fn) {
            var $__0 = this;
            return this._queryOutlets(fn).then((function(_) {
              return mapObjAsync($__0._children, (function(child, _) {
                return child.traverseOutlets(fn);
              }));
            }));
          },
          _queryOutlets: function(fn) {
            return mapObjAsync(this._outlets, fn);
          },
          recognize: function(url) {
            return this._registry.recognize(url, this.hostComponent);
          },
          renavigate: function() {
            var destination = isBlank(this.previousUrl) ? this.lastNavigationAttempt : this.previousUrl;
            if (this.navigating || isBlank(destination)) {
              return PromiseWrapper.resolve(false);
            }
            return this.navigate(destination);
          },
          generate: function(name, params) {
            return this._registry.generate(name, params, this.hostComponent);
          }
        }, {});
      }());
      $__export("Router", Router);
      Object.defineProperty(Router, "parameters", {get: function() {
          return [[RouteRegistry], [Pipeline], [Location], [Router], []];
        }});
      Object.defineProperty(Router.prototype.registerOutlet, "parameters", {get: function() {
          return [[RouterOutlet], []];
        }});
      Object.defineProperty(Router.prototype.config, "parameters", {get: function() {
          return [[assert.type.any]];
        }});
      Object.defineProperty(Router.prototype.navigate, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(Router.prototype.activateOutlets, "parameters", {get: function() {
          return [[Instruction]];
        }});
      Object.defineProperty(Router.prototype.recognize, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(Router.prototype.generate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.any]];
        }});
      RootRouter = (function($__super) {
        function RootRouter(registry, pipeline, location, hostComponent) {
          var $__0;
          $traceurRuntime.superConstructor(RootRouter).call(this, registry, pipeline, location, null, hostComponent);
          this._location.subscribe(($__0 = this, function(change) {
            return $__0.navigate(change['url']);
          }));
          this._registry.configFromComponent(hostComponent);
          this.navigate(location.path());
        }
        return ($traceurRuntime.createClass)(RootRouter, {}, {}, $__super);
      }(Router));
      $__export("RootRouter", RootRouter);
      Object.defineProperty(RootRouter, "parameters", {get: function() {
          return [[RouteRegistry], [Pipeline], [Location], [Type]];
        }});
      ChildRouter = (function($__super) {
        function ChildRouter(parent, hostComponent) {
          $traceurRuntime.superConstructor(ChildRouter).call(this, parent._registry, parent._pipeline, parent._location, parent, hostComponent);
          this.parent = parent;
        }
        return ($traceurRuntime.createClass)(ChildRouter, {}, {}, $__super);
      }(Router));
      Object.defineProperty(ChildRouter, "parameters", {get: function() {
          return [[Router], []];
        }});
      Object.defineProperty(mapObjAsync, "parameters", {get: function() {
          return [[Map], []];
        }});
      Object.defineProperty(mapObj, "parameters", {get: function() {
          return [[Map], []];
        }});
    }
  };
});

System.register("angular2/router", ["angular2/src/router/router", "angular2/src/router/router_outlet", "angular2/src/router/router_link", "angular2/src/router/instruction", "angular2/src/router/route_config_annotation", "angular2/src/router/route_config_decorator", "angular2/src/router/route_registry", "angular2/src/router/pipeline", "angular2/src/router/location", "angular2/src/core/application_tokens", "angular2/di"], function($__export) {
  "use strict";
  var __moduleName = "angular2/router";
  var Router,
      RootRouter,
      RouteRegistry,
      Pipeline,
      Location,
      appComponentAnnotatedTypeToken,
      bind,
      routerInjectables;
  var $__exportNames = {
    routerInjectables: true,
    undefined: true
  };
  var $__exportNames = {
    routerInjectables: true,
    undefined: true
  };
  return {
    setters: [function($__m) {
      Router = $__m.Router;
      RootRouter = $__m.RootRouter;
      $__export("Router", $__m.Router);
    }, function($__m) {
      $__export("RouterOutlet", $__m.RouterOutlet);
    }, function($__m) {
      $__export("RouterLink", $__m.RouterLink);
    }, function($__m) {
      $__export("RouteParams", $__m.RouteParams);
    }, function($__m) {
      Object.keys($__m).forEach(function(p) {
        if (!$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }, function($__m) {
      Object.keys($__m).forEach(function(p) {
        if (!$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }, function($__m) {
      RouteRegistry = $__m.RouteRegistry;
    }, function($__m) {
      Pipeline = $__m.Pipeline;
    }, function($__m) {
      Location = $__m.Location;
    }, function($__m) {
      appComponentAnnotatedTypeToken = $__m.appComponentAnnotatedTypeToken;
    }, function($__m) {
      bind = $__m.bind;
    }],
    execute: function() {
      routerInjectables = [RouteRegistry, Pipeline, Location, bind(Router).toFactory((function(registry, pipeline, location, meta) {
        return new RootRouter(registry, pipeline, location, meta.type);
      }), [RouteRegistry, Pipeline, Location, appComponentAnnotatedTypeToken])];
      $__export("routerInjectables", routerInjectables);
    }
  };
});

//# sourceMappingURL=router.dev.js.map