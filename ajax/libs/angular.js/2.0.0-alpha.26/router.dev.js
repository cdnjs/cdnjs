"format register";
System.register("angular2/src/router/instruction", ["angular2/src/facade/collection", "angular2/src/facade/async", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/instruction";
  var StringMapWrapper,
      ListWrapper,
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
      StringMapWrapper = $__m.StringMapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
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
    }
  };
});

System.register("angular2/src/router/browser_location", ["angular2/src/dom/dom_adapter", "angular2/di"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/browser_location";
  var __decorate,
      __metadata,
      DOM,
      Injectable,
      BrowserLocation;
  return {
    setters: [function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Injectable = $__m.Injectable;
    }],
    execute: function() {
      __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
          case 2:
            return decorators.reduceRight(function(o, d) {
              return (d && d(o)) || o;
            }, target);
          case 3:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key)), void 0;
            }, void 0);
          case 4:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key, o)) || o;
            }, desc);
        }
      };
      __metadata = (this && this.__metadata) || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      BrowserLocation = (($traceurRuntime.createClass)(function() {
        this._location = DOM.getLocation();
        this._history = DOM.getHistory();
        this._baseHref = DOM.getBaseHref();
      }, {
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
      }, {}));
      $__export("BrowserLocation", BrowserLocation);
      $__export("BrowserLocation", BrowserLocation = __decorate([Injectable(), __metadata('design:paramtypes', [])], BrowserLocation));
    }
  };
});

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
    }
  };
});

System.register("angular2/src/router/route_config_impl", ["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/route_config_impl";
  var __decorate,
      __metadata,
      CONST,
      RouteConfig;
  return {
    setters: [function($__m) {
      CONST = $__m.CONST;
    }],
    execute: function() {
      __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
          case 2:
            return decorators.reduceRight(function(o, d) {
              return (d && d(o)) || o;
            }, target);
          case 3:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key)), void 0;
            }, void 0);
          case 4:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key, o)) || o;
            }, desc);
        }
      };
      __metadata = (this && this.__metadata) || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      RouteConfig = (($traceurRuntime.createClass)(function(configs) {
        this.configs = configs;
      }, {}, {}));
      $__export("RouteConfig", RouteConfig);
      $__export("RouteConfig", RouteConfig = __decorate([CONST(), __metadata('design:paramtypes', [Object])], RouteConfig));
    }
  };
});

System.register("angular2/src/router/pipeline", ["angular2/src/facade/async"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/pipeline";
  var PromiseWrapper,
      Pipeline;
  return {
    setters: [function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
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
            return processOne();
          }}, {});
      }());
      $__export("Pipeline", Pipeline);
    }
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

System.register("angular2/src/router/location", ["angular2/src/router/browser_location", "angular2/src/facade/lang", "angular2/src/facade/async", "angular2/di"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/location";
  var __decorate,
      __metadata,
      BrowserLocation,
      StringWrapper,
      EventEmitter,
      ObservableWrapper,
      Injectable,
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
    }, function($__m) {
      Injectable = $__m.Injectable;
    }],
    execute: function() {
      __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
          case 2:
            return decorators.reduceRight(function(o, d) {
              return (d && d(o)) || o;
            }, target);
          case 3:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key)), void 0;
            }, void 0);
          case 4:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key, o)) || o;
            }, desc);
        }
      };
      __metadata = (this && this.__metadata) || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      Location = (($traceurRuntime.createClass)(function(_browserLocation) {
        var $__0 = this;
        this._browserLocation = _browserLocation;
        this._subject = new EventEmitter();
        this._baseHref = stripIndexHtml(this._browserLocation.getBaseHref());
        this._browserLocation.onPopState((function(_) {
          return $__0._onPopState(_);
        }));
      }, {
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
      }, {}));
      $__export("Location", Location);
      $__export("Location", Location = __decorate([Injectable(), __metadata('design:paramtypes', [BrowserLocation])], Location));
    }
  };
});

System.register("angular2/src/router/path_recognizer", ["angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/router/url"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/path_recognizer";
  var __decorate,
      __metadata,
      RegExpWrapper,
      StringWrapper,
      isPresent,
      BaseException,
      normalizeBlank,
      StringMapWrapper,
      ListWrapper,
      IMPLEMENTS,
      escapeRegex,
      Segment,
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
      RegExpWrapper = $__m.RegExpWrapper;
      StringWrapper = $__m.StringWrapper;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
      normalizeBlank = $__m.normalizeBlank;
      IMPLEMENTS = $__m.IMPLEMENTS;
    }, function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      escapeRegex = $__m.escapeRegex;
    }],
    execute: function() {
      __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
          case 2:
            return decorators.reduceRight(function(o, d) {
              return (d && d(o)) || o;
            }, target);
          case 3:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key)), void 0;
            }, void 0);
          case 4:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key, o)) || o;
            }, desc);
        }
      };
      __metadata = (this && this.__metadata) || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      Segment = (function() {
        function Segment() {}
        return ($traceurRuntime.createClass)(Segment, {}, {});
      }());
      $__export("Segment", Segment);
      StaticSegment = (function($__super) {
        function StaticSegment(string) {
          $traceurRuntime.superConstructor(StaticSegment).call(this);
          this.string = string;
          this.name = '';
          this.regex = escapeRegex(string);
        }
        return ($traceurRuntime.createClass)(StaticSegment, {generate: function(params) {
            return this.string;
          }}, {}, $__super);
      }(Segment));
      DynamicSegment = (($traceurRuntime.createClass)(function(name) {
        this.name = name;
        this.regex = "([^/]+)";
      }, {generate: function(params) {
          if (!StringMapWrapper.contains(params, this.name)) {
            throw new BaseException(("Route generator for '" + this.name + "' was not included in parameters passed."));
          }
          return normalizeBlank(StringMapWrapper.get(params, this.name));
        }}, {}));
      DynamicSegment = __decorate([IMPLEMENTS(Segment), __metadata('design:paramtypes', [String])], DynamicSegment);
      StarSegment = (function() {
        function StarSegment(name) {
          this.name = name;
          this.regex = "(.+)";
        }
        return ($traceurRuntime.createClass)(StarSegment, {generate: function(params) {
            return normalizeBlank(StringMapWrapper.get(params, this.name));
          }}, {});
      }());
      paramMatcher = RegExpWrapper.create("^:([^\/]+)$");
      wildcardMatcher = RegExpWrapper.create("^\\*([^\/]+)$");
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
    }
  };
});

System.register("angular2/src/router/router", ["angular2/src/facade/async", "angular2/src/facade/collection", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/router";
  var PromiseWrapper,
      EventEmitter,
      ObservableWrapper,
      MapWrapper,
      List,
      ListWrapper,
      isBlank,
      isPresent,
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
      PromiseWrapper = $__m.PromiseWrapper;
      EventEmitter = $__m.EventEmitter;
      ObservableWrapper = $__m.ObservableWrapper;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
    }],
    execute: function() {
      Router = (function() {
        function Router(_registry, _pipeline, parent, hostComponent) {
          this._registry = _registry;
          this._pipeline = _pipeline;
          this.parent = parent;
          this.hostComponent = hostComponent;
          this.navigating = false;
          this.previousUrl = null;
          this._outlets = MapWrapper.create();
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
      ChildRouter = (function($__super) {
        function ChildRouter(parent, hostComponent) {
          $traceurRuntime.superConstructor(ChildRouter).call(this, parent._registry, parent._pipeline, parent, hostComponent);
          this.parent = parent;
        }
        return ($traceurRuntime.createClass)(ChildRouter, {}, {}, $__super);
      }(Router));
    }
  };
});

System.register("angular2/src/router/router_link", ["angular2/src/core/annotations/annotations", "angular2/src/core/annotations/decorators", "angular2/core", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/dom/dom_adapter", "angular2/src/router/router", "angular2/src/router/location"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/router_link";
  var __decorate,
      __metadata,
      onAllChangesDone,
      Directive,
      ElementRef,
      StringMapWrapper,
      isPresent,
      DOM,
      Router,
      Location,
      RouterLink;
  return {
    setters: [function($__m) {
      onAllChangesDone = $__m.onAllChangesDone;
    }, function($__m) {
      Directive = $__m.Directive;
    }, function($__m) {
      ElementRef = $__m.ElementRef;
    }, function($__m) {
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
      __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
          case 2:
            return decorators.reduceRight(function(o, d) {
              return (d && d(o)) || o;
            }, target);
          case 3:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key)), void 0;
            }, void 0);
          case 4:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key, o)) || o;
            }, desc);
        }
      };
      __metadata = (this && this.__metadata) || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      RouterLink = (($traceurRuntime.createClass)(function(elementRef, _router, _location) {
        var $__0 = this;
        this._router = _router;
        this._location = _location;
        this._domEl = elementRef.domElement;
        this._params = StringMapWrapper.create();
        DOM.on(this._domEl, 'click', (function(evt) {
          DOM.preventDefault(evt);
          $__0._router.navigate($__0._navigationHref);
        }));
      }, {
        set route(changes) {
          this._route = changes;
        },
        set params(changes) {
          this._params = changes;
        },
        onAllChangesDone: function() {
          if (isPresent(this._route) && isPresent(this._params)) {
            this._navigationHref = this._router.generate(this._route, this._params);
            this._visibleHref = this._location.normalizeAbsolutely(this._navigationHref);
            DOM.setAttribute(this._domEl, 'href', this._visibleHref);
          }
        }
      }, {}));
      $__export("RouterLink", RouterLink);
      $__export("RouterLink", RouterLink = __decorate([Directive({
        selector: '[router-link]',
        properties: ['route: routerLink', 'params: routerParams'],
        lifecycle: [onAllChangesDone]
      }), __metadata('design:paramtypes', [ElementRef, Router, Location])], RouterLink));
    }
  };
});

System.register("angular2/src/router/route_recognizer", ["angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/router/path_recognizer"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/route_recognizer";
  var RegExpWrapper,
      StringWrapper,
      isPresent,
      BaseException,
      MapWrapper,
      ListWrapper,
      PathRecognizer,
      RouteRecognizer,
      RouteMatch;
  return {
    setters: [function($__m) {
      RegExpWrapper = $__m.RegExpWrapper;
      StringWrapper = $__m.StringWrapper;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
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
      Instruction,
      ListWrapper,
      MapWrapper,
      StringMapWrapper,
      isPresent,
      isBlank,
      isType,
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
    }, function($__m) {
      Instruction = $__m.Instruction;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      isType = $__m.isType;
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
    }
  };
});

System.register("angular2/src/router/router_outlet", ["angular2/src/facade/async", "angular2/src/facade/lang", "angular2/src/core/annotations/decorators", "angular2/core", "angular2/di", "angular2/src/router/router", "angular2/src/router/instruction"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/router_outlet";
  var __decorate,
      __metadata,
      __param,
      PromiseWrapper,
      isBlank,
      isPresent,
      Directive,
      Attribute,
      DynamicComponentLoader,
      ElementRef,
      Injector,
      bind,
      routerMod,
      RouteParams,
      RouterOutlet;
  return {
    setters: [function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
    }, function($__m) {
      Directive = $__m.Directive;
      Attribute = $__m.Attribute;
    }, function($__m) {
      DynamicComponentLoader = $__m.DynamicComponentLoader;
      ElementRef = $__m.ElementRef;
    }, function($__m) {
      Injector = $__m.Injector;
      bind = $__m.bind;
    }, function($__m) {
      routerMod = $__m;
    }, function($__m) {
      RouteParams = $__m.RouteParams;
    }],
    execute: function() {
      __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
          case 2:
            return decorators.reduceRight(function(o, d) {
              return (d && d(o)) || o;
            }, target);
          case 3:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key)), void 0;
            }, void 0);
          case 4:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key, o)) || o;
            }, desc);
        }
      };
      __metadata = (this && this.__metadata) || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      __param = (this && this.__param) || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      RouterOutlet = (($traceurRuntime.createClass)(function(elementRef, _loader, _parentRouter, _injector, nameAttr) {
        this._loader = _loader;
        this._parentRouter = _parentRouter;
        this._injector = _injector;
        if (isBlank(nameAttr)) {
          nameAttr = 'default';
        }
        this._elementRef = elementRef;
        this._childRouter = null;
        this._componentRef = null;
        this._currentInstruction = null;
        this._parentRouter.registerOutlet(this, nameAttr);
      }, {
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
      }, {}));
      $__export("RouterOutlet", RouterOutlet);
      $__export("RouterOutlet", RouterOutlet = __decorate([Directive({selector: 'router-outlet'}), __param(4, Attribute('name')), __metadata('design:paramtypes', [ElementRef, DynamicComponentLoader, routerMod.Router, Injector, String])], RouterOutlet));
    }
  };
});

System.register("angular2/router", ["angular2/src/router/router", "angular2/src/router/router_outlet", "angular2/src/router/router_link", "angular2/src/router/instruction", "angular2/src/router/route_registry", "angular2/src/router/browser_location", "angular2/src/router/location", "angular2/src/router/pipeline", "angular2/src/router/route_config_decorator", "angular2/src/core/application_tokens", "angular2/di", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/router";
  var BrowserLocation,
      Router,
      RootRouter,
      RouterOutlet,
      RouterLink,
      RouteRegistry,
      Pipeline,
      Location,
      appComponentTypeToken,
      bind,
      CONST_EXPR,
      routerDirectives,
      routerInjectables;
  var $__exportNames = {
    routerDirectives: true,
    routerInjectables: true,
    undefined: true
  };
  return {
    setters: [function($__m) {
      Router = $__m.Router;
      RootRouter = $__m.RootRouter;
      $__export("Router", $__m.Router);
      $__export("RootRouter", $__m.RootRouter);
    }, function($__m) {
      RouterOutlet = $__m.RouterOutlet;
      $__export("RouterOutlet", $__m.RouterOutlet);
    }, function($__m) {
      RouterLink = $__m.RouterLink;
      $__export("RouterLink", $__m.RouterLink);
    }, function($__m) {
      $__export("RouteParams", $__m.RouteParams);
    }, function($__m) {
      RouteRegistry = $__m.RouteRegistry;
      $__export("RouteRegistry", $__m.RouteRegistry);
    }, function($__m) {
      BrowserLocation = $__m.BrowserLocation;
      $__export("BrowserLocation", $__m.BrowserLocation);
    }, function($__m) {
      Location = $__m.Location;
      $__export("Location", $__m.Location);
    }, function($__m) {
      Pipeline = $__m.Pipeline;
      $__export("Pipeline", $__m.Pipeline);
    }, function($__m) {
      Object.keys($__m).forEach(function(p) {
        if (!$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }, function($__m) {
      appComponentTypeToken = $__m.appComponentTypeToken;
    }, function($__m) {
      bind = $__m.bind;
    }, function($__m) {
      CONST_EXPR = $__m.CONST_EXPR;
    }],
    execute: function() {
      routerDirectives = CONST_EXPR([RouterOutlet, RouterLink]);
      $__export("routerDirectives", routerDirectives);
      routerInjectables = [RouteRegistry, Pipeline, BrowserLocation, Location, bind(Router).toFactory((function(registry, pipeline, location, appRoot) {
        return new RootRouter(registry, pipeline, location, appRoot);
      }), [RouteRegistry, Pipeline, Location, appComponentTypeToken])];
      $__export("routerInjectables", routerInjectables);
    }
  };
});

//# sourceMappingURL=router.dev.js.map