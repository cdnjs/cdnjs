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
      normalizeBlank,
      RouteParams,
      Instruction;
  function shouldReuseComponent(instr1, instr2) {
    return instr1.component == instr2.component && StringMapWrapper.equals(instr1.params, instr2.params);
  }
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
      normalizeBlank = $__m.normalizeBlank;
    }],
    execute: function() {
      RouteParams = (function() {
        function RouteParams(params) {
          this.params = params;
        }
        return ($traceurRuntime.createClass)(RouteParams, {get: function(param) {
            return normalizeBlank(StringMapWrapper.get(this.params, param));
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
              matchedUrl = $__2.matchedUrl,
              parentSpecificity = $__2.parentSpecificity;
          var $__0 = this;
          this.reuse = false;
          this.capturedUrl = matchedUrl;
          this.accumulatedUrl = matchedUrl;
          this.specificity = parentSpecificity;
          if (isPresent(children)) {
            this._children = children;
            var childUrl;
            StringMapWrapper.forEach(this._children, (function(child, _) {
              childUrl = child.accumulatedUrl;
              $__0.specificity += child.specificity;
            }));
            if (isPresent(childUrl)) {
              this.accumulatedUrl += childUrl;
            }
          } else {
            this._children = StringMapWrapper.create();
          }
          this.component = component;
          this.params = params;
        }
        return ($traceurRuntime.createClass)(Instruction, {
          hasChild: function(outletName) {
            return StringMapWrapper.contains(this._children, outletName);
          },
          getChild: function(outletName) {
            return StringMapWrapper.get(this._children, outletName);
          },
          forEachChild: function(fn) {
            StringMapWrapper.forEach(this._children, fn);
          },
          traverseSync: function(fn) {
            this.forEachChild(fn);
            this.forEachChild((function(childInstruction, _) {
              return childInstruction.traverseSync(fn);
            }));
          },
          reuseComponentsFrom: function(oldInstruction) {
            this.traverseSync((function(childInstruction, outletName) {
              var oldInstructionChild = oldInstruction.getChild(outletName);
              if (shouldReuseComponent(childInstruction, oldInstructionChild)) {
                childInstruction.reuse = true;
              }
            }));
          }
        }, {});
      }());
      $__export("Instruction", Instruction);
      Object.defineProperty(Instruction.prototype.hasChild, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(Instruction.prototype.getChild, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(Instruction.prototype.forEachChild, "parameters", {get: function() {
          return [[Function]];
        }});
      Object.defineProperty(Instruction.prototype.traverseSync, "parameters", {get: function() {
          return [[Function]];
        }});
      Object.defineProperty(Instruction.prototype.reuseComponentsFrom, "parameters", {get: function() {
          return [[Instruction]];
        }});
      Object.defineProperty(shouldReuseComponent, "parameters", {get: function() {
          return [[Instruction], [Instruction]];
        }});
      Object.defineProperty(mapObjAsync, "parameters", {get: function() {
          return [[StringMap], []];
        }});
      Object.defineProperty(mapObj, "parameters", {get: function() {
          return [[StringMap], [Function]];
        }});
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

System.register("angular2/src/router/browser_location", ["angular2/src/dom/dom_adapter"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/browser_location";
  var DOM,
      BrowserLocation;
  return {
    setters: [function($__m) {
      DOM = $__m.DOM;
    }],
    execute: function() {
      BrowserLocation = (function() {
        function BrowserLocation() {
          this._location = DOM.getLocation();
          this._history = DOM.getHistory();
          this._baseHref = DOM.getBaseHref();
        }
        return ($traceurRuntime.createClass)(BrowserLocation, {
          onPopState: function(fn) {
            DOM.getGlobalEventTarget('window').addEventListener('popstate', fn, false);
          },
          getBaseHref: function() {
            return this._baseHref;
          },
          path: function() {
            return this._location.pathname;
          },
          pushState: function(state, title, url) {
            this._history.pushState(state, title, url);
          },
          forward: function() {
            this._history.forward();
          },
          back: function() {
            this._history.back();
          }
        }, {});
      }());
      $__export("BrowserLocation", BrowserLocation);
      Object.defineProperty(BrowserLocation.prototype.onPopState, "parameters", {get: function() {
          return [[Function]];
        }});
      Object.defineProperty(BrowserLocation.prototype.pushState, "parameters", {get: function() {
          return [[assert.type.any], [assert.type.string], [assert.type.string]];
        }});
    }
  };
});

System.register("angular2/src/router/router_link", ["angular2/src/core/annotations_impl/annotations", "angular2/core", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/dom/dom_adapter", "angular2/src/router/router", "angular2/src/router/location"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/router_link";
  var Directive,
      onAllChangesDone,
      ElementRef,
      StringMap,
      StringMapWrapper,
      isPresent,
      DOM,
      Router,
      Location,
      RouterLink;
  return {
    setters: [function($__m) {
      Directive = $__m.Directive;
      onAllChangesDone = $__m.onAllChangesDone;
    }, function($__m) {
      ElementRef = $__m.ElementRef;
    }, function($__m) {
      StringMap = $__m.StringMap;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Router = $__m.Router;
    }, function($__m) {
      Location = $__m.Location;
    }],
    execute: function() {
      RouterLink = (function() {
        function RouterLink(elementRef, router, location) {
          var $__0 = this;
          this._domEl = elementRef.domElement;
          this._router = router;
          this._location = location;
          this._params = StringMapWrapper.create();
          DOM.on(this._domEl, 'click', (function(evt) {
            evt.preventDefault();
            $__0._router.navigate($__0._href);
          }));
        }
        return ($traceurRuntime.createClass)(RouterLink, {
          set route(changes) {
            this._route = changes;
          },
          set params(changes) {
            this._params = changes;
          },
          onAllChangesDone: function() {
            if (isPresent(this._route) && isPresent(this._params)) {
              var newHref = this._router.generate(this._route, this._params);
              this._href = this._location.normalizeAbsolutely(newHref);
              DOM.setAttribute(this._domEl, 'href', this._href);
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
            },
            lifecycle: [onAllChangesDone]
          })];
        }});
      Object.defineProperty(RouterLink, "parameters", {get: function() {
          return [[ElementRef], [Router], [Location]];
        }});
      Object.defineProperty(Object.getOwnPropertyDescriptor(RouterLink.prototype, "route").set, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(Object.getOwnPropertyDescriptor(RouterLink.prototype, "params").set, "parameters", {get: function() {
          return [[StringMap]];
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
      isBlank,
      BaseException,
      normalizeBlank,
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
      PathRecognizer;
  function parsePathString(route) {
    if (route[0] === "/") {
      route = StringWrapper.substring(route, 1);
    }
    var segments = splitBySlash(route);
    var results = ListWrapper.create();
    var specificity = 0;
    if (segments.length > 98) {
      throw new BaseException(("'" + route + "' has more than the maximum supported number of segments."));
    }
    for (var i = 0; i < segments.length; i++) {
      var segment = segments[i],
          match = void 0;
      if (isPresent(match = RegExpWrapper.firstMatch(paramMatcher, segment))) {
        ListWrapper.push(results, new DynamicSegment(match[1]));
        specificity += (100 - i);
      } else if (isPresent(match = RegExpWrapper.firstMatch(wildcardMatcher, segment))) {
        ListWrapper.push(results, new StarSegment(match[1]));
      } else if (segment.length > 0) {
        ListWrapper.push(results, new StaticSegment(segment));
        specificity += 100 * (100 - i);
      }
    }
    return {
      segments: results,
      specificity: specificity
    };
  }
  function splitBySlash(url) {
    return url.split('/');
  }
  return {
    setters: [function($__m) {
      RegExp = $__m.RegExp;
      RegExpWrapper = $__m.RegExpWrapper;
      RegExpMatcherWrapper = $__m.RegExpMatcherWrapper;
      StringWrapper = $__m.StringWrapper;
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
      normalizeBlank = $__m.normalizeBlank;
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
            if (!StringMapWrapper.contains(params, this.name)) {
              throw new BaseException(("Route generator for '" + this.name + "' was not included in parameters passed."));
            }
            return normalizeBlank(StringMapWrapper.get(params, this.name));
          }}, {});
      }());
      Object.defineProperty(DynamicSegment, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(DynamicSegment.prototype.generate, "parameters", {get: function() {
          return [[assert.genericType(StringMap, assert.type.string, assert.type.string)]];
        }});
      StarSegment = (function() {
        function StarSegment(name) {
          this.name = name;
          this.regex = "(.+)";
        }
        return ($traceurRuntime.createClass)(StarSegment, {generate: function(params) {
            return normalizeBlank(StringMapWrapper.get(params, this.name));
          }}, {});
      }());
      Object.defineProperty(StarSegment, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(StarSegment.prototype.generate, "parameters", {get: function() {
          return [[assert.genericType(StringMap, assert.type.string, assert.type.string)]];
        }});
      paramMatcher = RegExpWrapper.create("^:([^\/]+)$");
      wildcardMatcher = RegExpWrapper.create("^\\*([^\/]+)$");
      Object.defineProperty(parsePathString, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(splitBySlash, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      PathRecognizer = (function() {
        function PathRecognizer(path, handler) {
          this.path = path;
          this.handler = handler;
          this.segments = [];
          var parsed = parsePathString(path);
          var specificity = parsed['specificity'];
          var segments = parsed['segments'];
          var regexString = '^';
          ListWrapper.forEach(segments, (function(segment) {
            regexString += '/' + segment.regex;
          }));
          this.regex = RegExpWrapper.create(regexString);
          this.segments = segments;
          this.specificity = specificity;
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
          return [[assert.genericType(StringMap, assert.type.string, assert.type.string)]];
        }});
    }
  };
});

System.register("angular2/src/router/location", ["angular2/src/router/browser_location", "angular2/src/facade/lang", "angular2/src/facade/async"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/location";
  var BrowserLocation,
      StringWrapper,
      EventEmitter,
      ObservableWrapper,
      Location;
  function stripIndexHtml(url) {
    if (url.length > 10 && StringWrapper.substring(url, url.length - 11) == '/index.html') {
      return StringWrapper.substring(url, 0, url.length - 11);
    }
    return url;
  }
  return {
    setters: [function($__m) {
      BrowserLocation = $__m.BrowserLocation;
    }, function($__m) {
      StringWrapper = $__m.StringWrapper;
    }, function($__m) {
      EventEmitter = $__m.EventEmitter;
      ObservableWrapper = $__m.ObservableWrapper;
    }],
    execute: function() {
      Location = (function() {
        function Location(browserLocation) {
          var $__0 = this;
          this._subject = new EventEmitter();
          this._browserLocation = browserLocation;
          this._baseHref = stripIndexHtml(this._browserLocation.getBaseHref());
          this._browserLocation.onPopState((function(_) {
            return $__0._onPopState(_);
          }));
        }
        return ($traceurRuntime.createClass)(Location, {
          _onPopState: function(_) {
            ObservableWrapper.callNext(this._subject, {'url': this.path()});
          },
          path: function() {
            return this.normalize(this._browserLocation.path());
          },
          normalize: function(url) {
            return this._stripBaseHref(stripIndexHtml(url));
          },
          normalizeAbsolutely: function(url) {
            if (url[0] != '/') {
              url = '/' + url;
            }
            return this._addBaseHref(url);
          },
          _stripBaseHref: function(url) {
            if (this._baseHref.length > 0 && StringWrapper.startsWith(url, this._baseHref)) {
              return StringWrapper.substring(url, this._baseHref.length);
            }
            return url;
          },
          _addBaseHref: function(url) {
            if (!StringWrapper.startsWith(url, this._baseHref)) {
              return this._baseHref + url;
            }
            return url;
          },
          go: function(url) {
            var finalUrl = this.normalizeAbsolutely(url);
            this._browserLocation.pushState(null, '', finalUrl);
          },
          forward: function() {
            this._browserLocation.forward();
          },
          back: function() {
            this._browserLocation.back();
          },
          subscribe: function(onNext) {
            var onThrow = arguments[1] !== (void 0) ? arguments[1] : null;
            var onReturn = arguments[2] !== (void 0) ? arguments[2] : null;
            ObservableWrapper.subscribe(this._subject, onNext, onThrow, onReturn);
          }
        }, {});
      }());
      $__export("Location", Location);
      Object.defineProperty(Location, "parameters", {get: function() {
          return [[BrowserLocation]];
        }});
      Object.defineProperty(Location.prototype.normalize, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(Location.prototype.normalizeAbsolutely, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(Location.prototype._stripBaseHref, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(Location.prototype._addBaseHref, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(Location.prototype.go, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(stripIndexHtml, "parameters", {get: function() {
          return [[assert.type.string]];
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
      BaseException,
      Map,
      MapWrapper,
      List,
      ListWrapper,
      StringMap,
      StringMapWrapper,
      PathRecognizer,
      RouteRecognizer,
      RouteMatch;
  return {
    setters: [function($__m) {
      RegExp = $__m.RegExp;
      RegExpWrapper = $__m.RegExpWrapper;
      StringWrapper = $__m.StringWrapper;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
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
            MapWrapper.forEach(this.matchers, (function(matcher, _) {
              if (recognizer.regex.toString() == matcher.regex.toString()) {
                throw new BaseException(("Configuration '" + path + "' conflicts with existing route '" + matcher.path + "'"));
              }
            }));
            MapWrapper.set(this.matchers, recognizer.regex, recognizer);
            if (isPresent(alias)) {
              MapWrapper.set(this.names, alias, recognizer);
            }
          },
          recognize: function(url) {
            var solutions = ListWrapper.create();
            MapWrapper.forEach(this.redirects, (function(target, path) {
              if (StringWrapper.startsWith(url, path)) {
                url = target + StringWrapper.substring(url, path.length);
              }
            }));
            MapWrapper.forEach(this.matchers, (function(pathRecognizer, regex) {
              var match;
              if (isPresent(match = RegExpWrapper.firstMatch(regex, url))) {
                var matchedUrl = '/';
                var unmatchedUrl = '';
                if (url != '/') {
                  matchedUrl = match[0];
                  unmatchedUrl = StringWrapper.substring(url, match[0].length);
                }
                ListWrapper.push(solutions, new RouteMatch({
                  specificity: pathRecognizer.specificity,
                  handler: pathRecognizer.handler,
                  params: pathRecognizer.parseParams(url),
                  matchedUrl: matchedUrl,
                  unmatchedUrl: unmatchedUrl
                }));
              }
            }));
            return solutions;
          },
          hasRoute: function(name) {
            return MapWrapper.contains(this.names, name);
          },
          generate: function(name, params) {
            var pathRecognizer = MapWrapper.get(this.names, name);
            return isPresent(pathRecognizer) ? pathRecognizer.generate(params) : null;
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
      RouteMatch = (function() {
        function RouteMatch() {
          var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
              specificity = $__1.specificity,
              handler = $__1.handler,
              params = $__1.params,
              matchedUrl = $__1.matchedUrl,
              unmatchedUrl = $__1.unmatchedUrl;
          this.specificity = specificity;
          this.handler = handler;
          this.params = params;
          this.matchedUrl = matchedUrl;
          this.unmatchedUrl = unmatchedUrl;
        }
        return ($traceurRuntime.createClass)(RouteMatch, {}, {});
      }());
      $__export("RouteMatch", RouteMatch);
    }
  };
});

System.register("angular2/src/router/route_registry", ["angular2/src/router/route_recognizer", "angular2/src/router/instruction", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/router/route_config_impl", "angular2/src/reflection/reflection"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/route_registry";
  var RouteRecognizer,
      RouteMatch,
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
  function routeMatchToInstruction(routeMatch, parentComponent) {
    var children = StringMapWrapper.create();
    var components = StringMapWrapper.get(routeMatch.handler, 'components');
    StringMapWrapper.forEach(components, (function(component, outletName) {
      children[outletName] = new Instruction({
        component: component,
        params: routeMatch.params,
        parentSpecificity: 0
      });
    }));
    return new Instruction({
      component: parentComponent,
      children: children,
      matchedUrl: routeMatch.matchedUrl,
      parentSpecificity: routeMatch.specificity
    });
  }
  function normalizeConfig(config) {
    if (!StringMapWrapper.contains(config, 'component')) {
      return config;
    }
    var newConfig = {'components': {'default': config['component']}};
    StringMapWrapper.forEach(config, (function(value, key) {
      if (key != 'component' && key != 'components') {
        newConfig[key] = value;
      }
    }));
    return newConfig;
  }
  return {
    setters: [function($__m) {
      RouteRecognizer = $__m.RouteRecognizer;
      RouteMatch = $__m.RouteMatch;
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
            var recognizer = MapWrapper.get(this._rules, parentComponent);
            if (isBlank(recognizer)) {
              recognizer = new RouteRecognizer();
              MapWrapper.set(this._rules, parentComponent, recognizer);
            }
            config = normalizeConfig(config);
            if (StringMapWrapper.contains(config, 'redirectTo')) {
              recognizer.addRedirect(config['path'], config['redirectTo']);
              return ;
            }
            var components = config['components'];
            StringMapWrapper.forEach(components, (function(component, _) {
              return $__0.configFromComponent(component);
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
                    return $__0.config(component, config);
                  }));
                }
              }
            }
          },
          recognize: function(url, parentComponent) {
            var componentRecognizer = MapWrapper.get(this._rules, parentComponent);
            if (isBlank(componentRecognizer)) {
              return null;
            }
            var possibleMatches = componentRecognizer.recognize(url);
            var fullSolutions = ListWrapper.create();
            for (var i = 0; i < possibleMatches.length; i++) {
              var candidate = possibleMatches[i];
              if (candidate.unmatchedUrl.length == 0) {
                ListWrapper.push(fullSolutions, routeMatchToInstruction(candidate, parentComponent));
              } else {
                var children = StringMapWrapper.create(),
                    allChildrenMatch = true,
                    components = StringMapWrapper.get(candidate.handler, 'components');
                var componentNames = StringMapWrapper.keys(components);
                for (var nameIndex = 0; nameIndex < componentNames.length; nameIndex++) {
                  var name = componentNames[nameIndex];
                  var component = StringMapWrapper.get(components, name);
                  var childInstruction = this.recognize(candidate.unmatchedUrl, component);
                  if (isPresent(childInstruction)) {
                    childInstruction.params = candidate.params;
                    children[name] = childInstruction;
                  } else {
                    allChildrenMatch = false;
                    break;
                  }
                }
                if (allChildrenMatch) {
                  ListWrapper.push(fullSolutions, new Instruction({
                    component: parentComponent,
                    children: children,
                    matchedUrl: candidate.matchedUrl,
                    parentSpecificity: candidate.specificity
                  }));
                }
              }
            }
            if (fullSolutions.length > 0) {
              var mostSpecificSolution = fullSolutions[0];
              for (var solutionIndex = 1; solutionIndex < fullSolutions.length; solutionIndex++) {
                var solution = fullSolutions[solutionIndex];
                if (solution.specificity > mostSpecificSolution.specificity) {
                  mostSpecificSolution = solution;
                }
              }
              return mostSpecificSolution;
            }
            return null;
          },
          generate: function(name, params, hostComponent) {
            var componentRecognizer = MapWrapper.get(this._rules, hostComponent);
            return isPresent(componentRecognizer) ? componentRecognizer.generate(name, params) : null;
          }
        }, {});
      }());
      $__export("RouteRegistry", RouteRegistry);
      Object.defineProperty(RouteRegistry.prototype.config, "parameters", {get: function() {
          return [[], [assert.genericType(StringMap, assert.type.string, assert.type.any)]];
        }});
      Object.defineProperty(RouteRegistry.prototype.recognize, "parameters", {get: function() {
          return [[assert.type.string], []];
        }});
      Object.defineProperty(RouteRegistry.prototype.generate, "parameters", {get: function() {
          return [[assert.type.string], [assert.genericType(StringMap, assert.type.string, assert.type.string)], []];
        }});
      Object.defineProperty(routeMatchToInstruction, "parameters", {get: function() {
          return [[RouteMatch], []];
        }});
      Object.defineProperty(normalizeConfig, "parameters", {get: function() {
          return [[assert.genericType(StringMap, assert.type.string, assert.type.any)]];
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
      isPresent,
      Directive,
      Attribute,
      DynamicComponentLoader,
      ComponentRef,
      ElementRef,
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
      isPresent = $__m.isPresent;
    }, function($__m) {
      Directive = $__m.Directive;
    }, function($__m) {
      Attribute = $__m.Attribute;
    }, function($__m) {
      DynamicComponentLoader = $__m.DynamicComponentLoader;
      ComponentRef = $__m.ComponentRef;
      ElementRef = $__m.ElementRef;
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
        function RouterOutlet(elementRef, loader, router, injector, nameAttr) {
          if (isBlank(nameAttr)) {
            nameAttr = 'default';
          }
          this._loader = loader;
          this._parentRouter = router;
          this._elementRef = elementRef;
          this._injector = injector;
          this._childRouter = null;
          this._componentRef = null;
          this._currentInstruction = null;
          this._parentRouter.registerOutlet(this, nameAttr);
        }
        return ($traceurRuntime.createClass)(RouterOutlet, {
          activate: function(instruction) {
            var $__0 = this;
            if ((instruction == this._currentInstruction) || instruction.reuse && isPresent(this._childRouter)) {
              return this._childRouter.commit(instruction);
            }
            this._currentInstruction = instruction;
            this._childRouter = this._parentRouter.childRouter(instruction.component);
            var outletInjector = this._injector.resolveAndCreateChild([bind(RouteParams).toValue(new RouteParams(instruction.params)), bind(routerMod.Router).toValue(this._childRouter)]);
            if (isPresent(this._componentRef)) {
              this._componentRef.dispose();
            }
            return this._loader.loadNextToExistingLocation(instruction.component, this._elementRef, outletInjector).then((function(componentRef) {
              $__0._componentRef = componentRef;
              return $__0._childRouter.commit(instruction);
            }));
          },
          deactivate: function() {
            var $__0 = this;
            return (isPresent(this._childRouter) ? this._childRouter.deactivate() : PromiseWrapper.resolve(true)).then((function(_) {
              return $__0._componentRef.dispose();
            }));
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
          return [[ElementRef], [DynamicComponentLoader], [routerMod.Router], [Injector], [String, new Attribute('name')]];
        }});
      Object.defineProperty(RouterOutlet.prototype.activate, "parameters", {get: function() {
          return [[Instruction]];
        }});
      Object.defineProperty(RouterOutlet.prototype.canDeactivate, "parameters", {get: function() {
          return [[Instruction]];
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
      isPresent,
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
      isPresent = $__m.isPresent;
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
        function Router(registry, pipeline, parent, hostComponent) {
          this.hostComponent = hostComponent;
          this.navigating = false;
          this.parent = parent;
          this.previousUrl = null;
          this._outlets = MapWrapper.create();
          this._registry = registry;
          this._pipeline = pipeline;
          this._subject = new EventEmitter();
          this._currentInstruction = null;
        }
        return ($traceurRuntime.createClass)(Router, {
          childRouter: function(hostComponent) {
            return new ChildRouter(this, hostComponent);
          },
          registerOutlet: function(outlet) {
            var name = arguments[1] !== (void 0) ? arguments[1] : 'default';
            MapWrapper.set(this._outlets, name, outlet);
            if (isPresent(this._currentInstruction)) {
              var childInstruction = this._currentInstruction.getChild(name);
              return outlet.activate(childInstruction);
            }
            return PromiseWrapper.resolve(true);
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
            var matchedInstruction = this.recognize(url);
            if (isBlank(matchedInstruction)) {
              return PromiseWrapper.resolve(false);
            }
            if (isPresent(this._currentInstruction)) {
              matchedInstruction.reuseComponentsFrom(this._currentInstruction);
            }
            this._startNavigating();
            var result = this.commit(matchedInstruction).then((function(_) {
              ObservableWrapper.callNext($__0._subject, matchedInstruction.accumulatedUrl);
              $__0._finishNavigating();
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
          commit: function(instruction) {
            var $__0 = this;
            this._currentInstruction = instruction;
            var toDeactivate = ListWrapper.create();
            MapWrapper.forEach(this._outlets, (function(outlet, outletName) {
              if (!instruction.hasChild(outletName)) {
                MapWrapper.delete($__0._outlets, outletName);
                ListWrapper.push(toDeactivate, outlet);
              }
            }));
            return PromiseWrapper.all(ListWrapper.map(toDeactivate, (function(outlet) {
              return outlet.deactivate();
            }))).then((function(_) {
              return $__0.activate(instruction);
            }));
          },
          deactivate: function() {
            return this._eachOutletAsync((function(outlet) {
              return outlet.deactivate;
            }));
          },
          activate: function(instruction) {
            return this._eachOutletAsync((function(outlet, name) {
              return outlet.activate(instruction.getChild(name));
            }));
          },
          _eachOutletAsync: function(fn) {
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
          return [[RouteRegistry], [Pipeline], [Router], [assert.type.any]];
        }});
      Object.defineProperty(Router.prototype.childRouter, "parameters", {get: function() {
          return [[assert.type.any]];
        }});
      Object.defineProperty(Router.prototype.registerOutlet, "parameters", {get: function() {
          return [[RouterOutlet], [assert.type.string]];
        }});
      Object.defineProperty(Router.prototype.config, "parameters", {get: function() {
          return [[assert.type.any]];
        }});
      Object.defineProperty(Router.prototype.navigate, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(Router.prototype.commit, "parameters", {get: function() {
          return [[Instruction]];
        }});
      Object.defineProperty(Router.prototype.activate, "parameters", {get: function() {
          return [[Instruction]];
        }});
      Object.defineProperty(Router.prototype.recognize, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(Router.prototype.generate, "parameters", {get: function() {
          return [[assert.type.string], [assert.genericType(StringMap, assert.type.string, assert.type.string)]];
        }});
      RootRouter = (function($__super) {
        function RootRouter(registry, pipeline, location, hostComponent) {
          var $__0;
          $traceurRuntime.superConstructor(RootRouter).call(this, registry, pipeline, null, hostComponent);
          this._location = location;
          this._location.subscribe(($__0 = this, function(change) {
            return $__0.navigate(change['url']);
          }));
          this._registry.configFromComponent(hostComponent);
          this.navigate(location.path());
        }
        return ($traceurRuntime.createClass)(RootRouter, {commit: function(instruction) {
            var $__0 = this;
            return $traceurRuntime.superGet(this, RootRouter.prototype, "commit").call(this, instruction).then((function(_) {
              $__0._location.go(instruction.accumulatedUrl);
            }));
          }}, {}, $__super);
      }(Router));
      $__export("RootRouter", RootRouter);
      Object.defineProperty(RootRouter, "parameters", {get: function() {
          return [[RouteRegistry], [Pipeline], [Location], [Type]];
        }});
      ChildRouter = (function($__super) {
        function ChildRouter(parent, hostComponent) {
          $traceurRuntime.superConstructor(ChildRouter).call(this, parent._registry, parent._pipeline, parent, hostComponent);
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

System.register("angular2/router", ["angular2/src/router/router", "angular2/src/router/router_outlet", "angular2/src/router/router_link", "angular2/src/router/instruction", "angular2/src/router/route_config_annotation", "angular2/src/router/route_config_decorator", "angular2/src/router/browser_location", "angular2/src/router/route_registry", "angular2/src/router/pipeline", "angular2/src/router/location", "angular2/src/core/application_tokens", "angular2/di"], function($__export) {
  "use strict";
  var __moduleName = "angular2/router";
  var BrowserLocation,
      Router,
      RootRouter,
      RouteRegistry,
      Pipeline,
      Location,
      appComponentTypeToken,
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
      BrowserLocation = $__m.BrowserLocation;
    }, function($__m) {
      RouteRegistry = $__m.RouteRegistry;
    }, function($__m) {
      Pipeline = $__m.Pipeline;
    }, function($__m) {
      Location = $__m.Location;
    }, function($__m) {
      appComponentTypeToken = $__m.appComponentTypeToken;
    }, function($__m) {
      bind = $__m.bind;
    }],
    execute: function() {
      routerInjectables = [RouteRegistry, Pipeline, BrowserLocation, Location, bind(Router).toFactory((function(registry, pipeline, location, appRoot) {
        return new RootRouter(registry, pipeline, location, appRoot);
      }), [RouteRegistry, Pipeline, Location, appComponentTypeToken])];
      $__export("routerInjectables", routerInjectables);
    }
  };
});

//# sourceMappingURL=router.dev.js.map