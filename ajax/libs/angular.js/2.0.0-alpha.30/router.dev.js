"format register";
System.register("angular2/src/router/instruction", ["angular2/src/facade/collection", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/instruction";
  var StringMapWrapper,
      isPresent,
      isBlank,
      normalizeBlank,
      RouteParams,
      Instruction;
  function shouldReuseComponent(instr1, instr2) {
    return instr1.component == instr2.component && StringMapWrapper.equals(instr1.params(), instr2.params());
  }
  return {
    setters: [function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
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
        function Instruction(component, capturedUrl, _recognizer) {
          var child = arguments[3] !== (void 0) ? arguments[3] : null;
          this.component = component;
          this.capturedUrl = capturedUrl;
          this._recognizer = _recognizer;
          this.child = child;
          this.reuse = false;
          this.accumulatedUrl = capturedUrl;
          this.specificity = _recognizer.specificity;
          if (isPresent(child)) {
            this.child = child;
            this.specificity += child.specificity;
            var childUrl = child.accumulatedUrl;
            if (isPresent(childUrl)) {
              this.accumulatedUrl += childUrl;
            }
          }
        }
        return ($traceurRuntime.createClass)(Instruction, {
          params: function() {
            if (isBlank(this._params)) {
              this._params = this._recognizer.parseParams(this.capturedUrl);
            }
            return this._params;
          },
          hasChild: function() {
            return isPresent(this.child);
          },
          reuseComponentsFrom: function(oldInstruction) {
            var nextInstruction = this;
            while (nextInstruction.reuse = shouldReuseComponent(nextInstruction, oldInstruction) && isPresent(oldInstruction = oldInstruction.child) && isPresent(nextInstruction = nextInstruction.child))
              ;
          }
        }, {});
      }());
      $__export("Instruction", Instruction);
    }
  };
});

System.register("angular2/src/router/location_strategy", ["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/location_strategy";
  var BaseException,
      LocationStrategy;
  function _abstract() {
    return new BaseException('This method is abstract');
  }
  return {
    setters: [function($__m) {
      BaseException = $__m.BaseException;
    }],
    execute: function() {
      LocationStrategy = (function() {
        function LocationStrategy() {}
        return ($traceurRuntime.createClass)(LocationStrategy, {
          path: function() {
            throw _abstract();
          },
          pushState: function(ctx, title, url) {
            throw _abstract();
          },
          forward: function() {
            throw _abstract();
          },
          back: function() {
            throw _abstract();
          },
          onPopState: function(fn) {
            throw _abstract();
          },
          getBaseHref: function() {
            throw _abstract();
          }
        }, {});
      }());
      $__export("LocationStrategy", LocationStrategy);
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

System.register("angular2/src/router/async_route_handler", ["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/async_route_handler";
  var isPresent,
      AsyncRouteHandler;
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
    }],
    execute: function() {
      AsyncRouteHandler = (function() {
        function AsyncRouteHandler(_loader) {
          this._loader = _loader;
          this._resolvedComponent = null;
        }
        return ($traceurRuntime.createClass)(AsyncRouteHandler, {resolveComponentType: function() {
            var $__0 = this;
            if (isPresent(this._resolvedComponent)) {
              return this._resolvedComponent;
            }
            return this._resolvedComponent = this._loader().then((function(componentType) {
              $__0.componentType = componentType;
              return componentType;
            }));
          }}, {});
      }());
      $__export("AsyncRouteHandler", AsyncRouteHandler);
    }
  };
});

System.register("angular2/src/router/sync_route_handler", ["angular2/src/facade/async"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/sync_route_handler";
  var PromiseWrapper,
      SyncRouteHandler;
  return {
    setters: [function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }],
    execute: function() {
      SyncRouteHandler = (function() {
        function SyncRouteHandler(componentType) {
          this.componentType = componentType;
          this._resolvedComponent = null;
          this._resolvedComponent = PromiseWrapper.resolve(componentType);
        }
        return ($traceurRuntime.createClass)(SyncRouteHandler, {resolveComponentType: function() {
            return this._resolvedComponent;
          }}, {});
      }());
      $__export("SyncRouteHandler", SyncRouteHandler);
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

System.register("angular2/src/router/hash_location_strategy", ["angular2/src/dom/dom_adapter", "angular2/di", "angular2/src/router/location_strategy"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/hash_location_strategy";
  var __decorate,
      __metadata,
      DOM,
      Injectable,
      LocationStrategy,
      HashLocationStrategy;
  return {
    setters: [function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      LocationStrategy = $__m.LocationStrategy;
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
      HashLocationStrategy = (function($__super) {
        function $__0() {
          $traceurRuntime.superConstructor($__0).call(this);
          this._location = DOM.getLocation();
          this._history = DOM.getHistory();
        }
        return ($traceurRuntime.createClass)($__0, {
          onPopState: function(fn) {
            DOM.getGlobalEventTarget('window').addEventListener('popstate', fn, false);
          },
          getBaseHref: function() {
            return '';
          },
          path: function() {
            return this._location.hash;
          },
          pushState: function(state, title, url) {
            this._history.pushState(state, title, '#' + url);
          },
          forward: function() {
            this._history.forward();
          },
          back: function() {
            this._history.back();
          }
        }, {}, $__super);
      }(LocationStrategy));
      $__export("HashLocationStrategy", HashLocationStrategy);
      $__export("HashLocationStrategy", HashLocationStrategy = __decorate([Injectable(), __metadata('design:paramtypes', [])], HashLocationStrategy));
    }
  };
});

System.register("angular2/src/router/html5_location_strategy", ["angular2/src/dom/dom_adapter", "angular2/di", "angular2/src/router/location_strategy"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/html5_location_strategy";
  var __decorate,
      __metadata,
      DOM,
      Injectable,
      LocationStrategy,
      HTML5LocationStrategy;
  return {
    setters: [function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      LocationStrategy = $__m.LocationStrategy;
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
      HTML5LocationStrategy = (function($__super) {
        function $__0() {
          $traceurRuntime.superConstructor($__0).call(this);
          this._location = DOM.getLocation();
          this._history = DOM.getHistory();
          this._baseHref = DOM.getBaseHref();
        }
        return ($traceurRuntime.createClass)($__0, {
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
        }, {}, $__super);
      }(LocationStrategy));
      $__export("HTML5LocationStrategy", HTML5LocationStrategy);
      $__export("HTML5LocationStrategy", HTML5LocationStrategy = __decorate([Injectable(), __metadata('design:paramtypes', [])], HTML5LocationStrategy));
    }
  };
});

System.register("angular2/src/router/pipeline", ["angular2/src/facade/async", "angular2/di"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/pipeline";
  var __decorate,
      __metadata,
      PromiseWrapper,
      Injectable,
      Pipeline;
  return {
    setters: [function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
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
      Pipeline = (($traceurRuntime.createClass)(function() {
        this.steps = [(function(instruction) {
          return instruction.router.activateOutlets(instruction);
        })];
      }, {process: function(instruction) {
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
        }}, {}));
      $__export("Pipeline", Pipeline);
      $__export("Pipeline", Pipeline = __decorate([Injectable(), __metadata('design:paramtypes', [])], Pipeline));
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

System.register("angular2/src/router/location", ["angular2/src/router/location_strategy", "angular2/src/facade/lang", "angular2/src/facade/async", "angular2/di"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/location";
  var __decorate,
      __metadata,
      __param,
      LocationStrategy,
      isPresent,
      CONST_EXPR,
      EventEmitter,
      ObservableWrapper,
      OpaqueToken,
      Injectable,
      Optional,
      Inject,
      appBaseHrefToken,
      Location;
  function stripIndexHtml(url) {
    if (/\/index.html$/g.test(url)) {
      return url.substring(0, url.length - 11);
    }
    return url;
  }
  function stripTrailingSlash(url) {
    if (/\/$/g.test(url)) {
      url = url.substring(0, url.length - 1);
    }
    return url;
  }
  return {
    setters: [function($__m) {
      LocationStrategy = $__m.LocationStrategy;
    }, function($__m) {
      isPresent = $__m.isPresent;
      CONST_EXPR = $__m.CONST_EXPR;
    }, function($__m) {
      EventEmitter = $__m.EventEmitter;
      ObservableWrapper = $__m.ObservableWrapper;
    }, function($__m) {
      OpaqueToken = $__m.OpaqueToken;
      Injectable = $__m.Injectable;
      Optional = $__m.Optional;
      Inject = $__m.Inject;
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
      appBaseHrefToken = CONST_EXPR(new OpaqueToken('locationHrefToken'));
      $__export("appBaseHrefToken", appBaseHrefToken);
      Location = (($traceurRuntime.createClass)(function(_platformStrategy, href) {
        var $__0 = this;
        this._platformStrategy = _platformStrategy;
        this._subject = new EventEmitter();
        this._baseHref = stripTrailingSlash(stripIndexHtml(isPresent(href) ? href : this._platformStrategy.getBaseHref()));
        this._platformStrategy.onPopState((function(_) {
          return $__0._onPopState(_);
        }));
      }, {
        _onPopState: function(_) {
          ObservableWrapper.callNext(this._subject, {'url': this.path()});
        },
        path: function() {
          return this.normalize(this._platformStrategy.path());
        },
        normalize: function(url) {
          return stripTrailingSlash(this._stripBaseHref(stripIndexHtml(url)));
        },
        normalizeAbsolutely: function(url) {
          if (!url.startsWith('/')) {
            url = '/' + url;
          }
          return stripTrailingSlash(this._addBaseHref(url));
        },
        _stripBaseHref: function(url) {
          if (this._baseHref.length > 0 && url.startsWith(this._baseHref)) {
            return url.substring(this._baseHref.length);
          }
          return url;
        },
        _addBaseHref: function(url) {
          if (!url.startsWith(this._baseHref)) {
            return this._baseHref + url;
          }
          return url;
        },
        go: function(url) {
          var finalUrl = this.normalizeAbsolutely(url);
          this._platformStrategy.pushState(null, '', finalUrl);
        },
        forward: function() {
          this._platformStrategy.forward();
        },
        back: function() {
          this._platformStrategy.back();
        },
        subscribe: function(onNext) {
          var onThrow = arguments[1] !== (void 0) ? arguments[1] : null;
          var onReturn = arguments[2] !== (void 0) ? arguments[2] : null;
          ObservableWrapper.subscribe(this._subject, onNext, onThrow, onReturn);
        }
      }, {}));
      $__export("Location", Location);
      $__export("Location", Location = __decorate([Injectable(), __param(1, Optional()), __param(1, Inject(appBaseHrefToken)), __metadata('design:paramtypes', [LocationStrategy, String])], Location));
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
      isBlank,
      BaseException,
      StringMapWrapper,
      ListWrapper,
      IMPLEMENTS,
      escapeRegex,
      Segment,
      ContinuationSegment,
      StaticSegment,
      DynamicSegment,
      StarSegment,
      paramMatcher,
      wildcardMatcher,
      PathRecognizer;
  function normalizeString(obj) {
    if (isBlank(obj)) {
      return null;
    } else {
      return obj.toString();
    }
  }
  function parsePathString(route) {
    if (StringWrapper.startsWith(route, "/")) {
      route = StringWrapper.substring(route, 1);
    }
    var segments = splitBySlash(route);
    var results = [];
    var specificity = 0;
    if (segments.length > 98) {
      throw new BaseException(("'" + route + "' has more than the maximum supported number of segments."));
    }
    var limit = segments.length - 1;
    for (var i = 0; i <= limit; i++) {
      var segment = segments[i],
          match = void 0;
      if (isPresent(match = RegExpWrapper.firstMatch(paramMatcher, segment))) {
        results.push(new DynamicSegment(match[1]));
        specificity += (100 - i);
      } else if (isPresent(match = RegExpWrapper.firstMatch(wildcardMatcher, segment))) {
        results.push(new StarSegment(match[1]));
      } else if (segment == '...') {
        if (i < limit) {
          throw new BaseException(("Unexpected \"...\" before the end of the path for \"" + route + "\"."));
        }
        results.push(new ContinuationSegment());
      } else if (segment.length > 0) {
        results.push(new StaticSegment(segment));
        specificity += 100 * (100 - i);
      }
    }
    var result = StringMapWrapper.create();
    StringMapWrapper.set(result, 'segments', results);
    StringMapWrapper.set(result, 'specificity', specificity);
    return result;
  }
  function splitBySlash(url) {
    return url.split('/');
  }
  return {
    setters: [function($__m) {
      RegExpWrapper = $__m.RegExpWrapper;
      StringWrapper = $__m.StringWrapper;
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
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
      ContinuationSegment = (function($__super) {
        function ContinuationSegment() {
          $traceurRuntime.superConstructor(ContinuationSegment).apply(this, arguments);
        }
        return ($traceurRuntime.createClass)(ContinuationSegment, {generate: function(params) {
            return '';
          }}, {}, $__super);
      }(Segment));
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
          return normalizeString(StringMapWrapper.get(params, this.name));
        }}, {}));
      DynamicSegment = __decorate([IMPLEMENTS(Segment), __metadata('design:paramtypes', [String])], DynamicSegment);
      StarSegment = (function() {
        function StarSegment(name) {
          this.name = name;
          this.regex = "(.+)";
        }
        return ($traceurRuntime.createClass)(StarSegment, {generate: function(params) {
            return normalizeString(StringMapWrapper.get(params, this.name));
          }}, {});
      }());
      paramMatcher = RegExpWrapper.create("^:([^\/]+)$");
      wildcardMatcher = RegExpWrapper.create("^\\*([^\/]+)$");
      PathRecognizer = (function() {
        function PathRecognizer(path, handler) {
          var $__0 = this;
          this.path = path;
          this.handler = handler;
          this.terminal = true;
          var parsed = parsePathString(path);
          var specificity = parsed['specificity'];
          var segments = parsed['segments'];
          var regexString = '^';
          ListWrapper.forEach(segments, (function(segment) {
            if (segment instanceof ContinuationSegment) {
              $__0.terminal = false;
            } else {
              regexString += '/' + segment.regex;
            }
          }));
          if (this.terminal) {
            regexString += '$';
          }
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
              if (segment instanceof ContinuationSegment) {
                continue;
              }
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
              return segment.generate(params);
            })), '/');
          },
          resolveComponentType: function() {
            return this.handler.resolveComponentType();
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
      ListWrapper,
      isBlank,
      isString,
      StringWrapper,
      isPresent,
      isArray,
      BaseException,
      _resolveToTrue,
      _resolveToFalse,
      Router,
      RootRouter,
      ChildRouter,
      SLASH;
  function splitAndFlattenLinkParams(linkParams) {
    return ListWrapper.reduce(linkParams, (function(accumulation, item) {
      if (isString(item)) {
        return ListWrapper.concat(accumulation, StringWrapper.split(item, SLASH));
      }
      accumulation.push(item);
      return accumulation;
    }), []);
  }
  return {
    setters: [function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
      EventEmitter = $__m.EventEmitter;
      ObservableWrapper = $__m.ObservableWrapper;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isString = $__m.isString;
      StringWrapper = $__m.StringWrapper;
      isPresent = $__m.isPresent;
      isArray = $__m.isArray;
      BaseException = $__m.BaseException;
    }],
    execute: function() {
      _resolveToTrue = PromiseWrapper.resolve(true);
      _resolveToFalse = PromiseWrapper.resolve(false);
      Router = (function() {
        function Router(registry, _pipeline, parent, hostComponent) {
          this.registry = registry;
          this._pipeline = _pipeline;
          this.parent = parent;
          this.hostComponent = hostComponent;
          this.navigating = false;
          this.previousUrl = null;
          this._currentInstruction = null;
          this._currentNavigation = _resolveToTrue;
          this._outlet = null;
          this._subject = new EventEmitter();
        }
        return ($traceurRuntime.createClass)(Router, {
          childRouter: function(hostComponent) {
            return new ChildRouter(this, hostComponent);
          },
          registerOutlet: function(outlet) {
            this._outlet = outlet;
            if (isPresent(this._currentInstruction)) {
              return outlet.activate(this._currentInstruction);
            }
            return _resolveToTrue;
          },
          config: function(config) {
            var $__0 = this;
            if (isArray(config)) {
              config.forEach((function(configObject) {
                $__0.registry.config($__0.hostComponent, configObject);
              }));
            } else {
              this.registry.config(this.hostComponent, config);
            }
            return this.renavigate();
          },
          navigate: function(url) {
            var $__0 = this;
            if (this.navigating) {
              return this._currentNavigation;
            }
            this.lastNavigationAttempt = url;
            return this._currentNavigation = this.recognize(url).then((function(matchedInstruction) {
              if (isBlank(matchedInstruction)) {
                return _resolveToFalse;
              }
              if (isPresent($__0._currentInstruction)) {
                matchedInstruction.reuseComponentsFrom($__0._currentInstruction);
              }
              $__0._startNavigating();
              var result = $__0.commit(matchedInstruction).then((function(_) {
                $__0._finishNavigating();
                ObservableWrapper.callNext($__0._subject, matchedInstruction.accumulatedUrl);
              }));
              return PromiseWrapper.catchError(result, (function(err) {
                $__0._finishNavigating();
                throw err;
              }));
            }));
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
            this._currentInstruction = instruction;
            if (isPresent(this._outlet)) {
              return this._outlet.activate(instruction);
            }
            return _resolveToTrue;
          },
          deactivate: function() {
            if (isPresent(this._outlet)) {
              return this._outlet.deactivate();
            }
            return _resolveToTrue;
          },
          recognize: function(url) {
            return this.registry.recognize(url, this.hostComponent);
          },
          renavigate: function() {
            var destination = isBlank(this.previousUrl) ? this.lastNavigationAttempt : this.previousUrl;
            if (isBlank(destination)) {
              return this._currentNavigation;
            }
            return this.navigate(destination);
          },
          generate: function(linkParams) {
            var normalizedLinkParams = splitAndFlattenLinkParams(linkParams);
            var first = ListWrapper.first(normalizedLinkParams);
            var rest = ListWrapper.slice(normalizedLinkParams, 1);
            var router = this;
            if (first == '') {
              while (isPresent(router.parent)) {
                router = router.parent;
              }
            } else if (first == '..') {
              router = router.parent;
              while (ListWrapper.first(rest) == '..') {
                rest = ListWrapper.slice(rest, 1);
                router = router.parent;
                if (isBlank(router)) {
                  throw new BaseException(("Link \"" + ListWrapper.toJSON(linkParams) + "\" has too many \"../\" segments."));
                }
              }
            } else if (first != '.') {
              throw new BaseException(("Link \"" + ListWrapper.toJSON(linkParams) + "\" must start with \"/\", \"./\", or \"../\""));
            }
            if (rest[rest.length - 1] == '') {
              ListWrapper.removeLast(rest);
            }
            if (rest.length < 1) {
              var msg = ("Link \"" + ListWrapper.toJSON(linkParams) + "\" must include a route name.");
              throw new BaseException(msg);
            }
            var url = '';
            if (isPresent(router.parent) && isPresent(router.parent._currentInstruction)) {
              url = router.parent._currentInstruction.capturedUrl;
            }
            return url + '/' + this.registry.generate(rest, router.hostComponent);
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
          this.registry.configFromComponent(hostComponent);
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
          $traceurRuntime.superConstructor(ChildRouter).call(this, parent.registry, parent._pipeline, parent, hostComponent);
          this.parent = parent;
        }
        return ($traceurRuntime.createClass)(ChildRouter, {navigate: function(url) {
            return this.parent.navigate(url);
          }}, {}, $__super);
      }(Router));
      SLASH = new RegExp('/');
    }
  };
});

System.register("angular2/src/router/router_link", ["angular2/src/core/annotations/decorators", "angular2/src/router/router", "angular2/src/router/location"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/router_link";
  var __decorate,
      __metadata,
      Directive,
      Router,
      Location,
      RouterLink;
  return {
    setters: [function($__m) {
      Directive = $__m.Directive;
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
      RouterLink = (($traceurRuntime.createClass)(function(_router, _location) {
        this._router = _router;
        this._location = _location;
      }, {
        set routeParams(changes) {
          this._routeParams = changes;
          this._navigationHref = this._router.generate(this._routeParams);
          this.visibleHref = this._location.normalizeAbsolutely(this._navigationHref);
        },
        onClick: function() {
          this._router.navigate(this._navigationHref);
          return false;
        }
      }, {}));
      $__export("RouterLink", RouterLink);
      $__export("RouterLink", RouterLink = __decorate([Directive({
        selector: '[router-link]',
        properties: ['routeParams: routerLink'],
        host: {
          '(^click)': 'onClick()',
          '[attr.href]': 'visibleHref'
        }
      }), __metadata('design:paramtypes', [Router, Location])], RouterLink));
    }
  };
});

System.register("angular2/src/router/route_recognizer", ["angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/router/path_recognizer", "angular2/src/router/async_route_handler", "angular2/src/router/sync_route_handler"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/route_recognizer";
  var RegExpWrapper,
      isBlank,
      isPresent,
      isType,
      isStringMap,
      BaseException,
      Map,
      MapWrapper,
      PathRecognizer,
      AsyncRouteHandler,
      SyncRouteHandler,
      RouteRecognizer,
      RouteMatch;
  function configObjToHandler(config) {
    if (isType(config)) {
      return new SyncRouteHandler(config);
    } else if (isStringMap(config)) {
      if (isBlank(config['type'])) {
        throw new BaseException("Component declaration when provided as a map should include a 'type' property");
      }
      var componentType = config['type'];
      if (componentType == 'constructor') {
        return new SyncRouteHandler(config['constructor']);
      } else if (componentType == 'loader') {
        return new AsyncRouteHandler(config['loader']);
      } else {
        throw new BaseException("oops");
      }
    }
    throw new BaseException(("Unexpected component \"" + config + "\"."));
  }
  return {
    setters: [function($__m) {
      RegExpWrapper = $__m.RegExpWrapper;
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      isType = $__m.isType;
      isStringMap = $__m.isStringMap;
      BaseException = $__m.BaseException;
    }, function($__m) {
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      PathRecognizer = $__m.PathRecognizer;
    }, function($__m) {
      AsyncRouteHandler = $__m.AsyncRouteHandler;
    }, function($__m) {
      SyncRouteHandler = $__m.SyncRouteHandler;
    }],
    execute: function() {
      RouteRecognizer = (function() {
        function RouteRecognizer() {
          this.names = new Map();
          this.redirects = new Map();
          this.matchers = new Map();
        }
        return ($traceurRuntime.createClass)(RouteRecognizer, {
          addRedirect: function(path, target) {
            if (path == '/') {
              path = '';
            }
            this.redirects.set(path, target);
          },
          addConfig: function(path, handlerObj) {
            var alias = arguments[2] !== (void 0) ? arguments[2] : null;
            var handler = configObjToHandler(handlerObj['component']);
            var recognizer = new PathRecognizer(path, handler);
            MapWrapper.forEach(this.matchers, (function(matcher, _) {
              if (recognizer.regex.toString() == matcher.regex.toString()) {
                throw new BaseException(("Configuration '" + path + "' conflicts with existing route '" + matcher.path + "'"));
              }
            }));
            this.matchers.set(recognizer.regex, recognizer);
            if (isPresent(alias)) {
              this.names.set(alias, recognizer);
            }
            return recognizer.terminal;
          },
          recognize: function(url) {
            var solutions = [];
            if (url.length > 0 && url[url.length - 1] == '/') {
              url = url.substring(0, url.length - 1);
            }
            MapWrapper.forEach(this.redirects, (function(target, path) {
              if (path == '/' || path == '') {
                if (path == url) {
                  url = target;
                }
              } else if (url.startsWith(path)) {
                url = target + url.substring(path.length);
              }
            }));
            MapWrapper.forEach(this.matchers, (function(pathRecognizer, regex) {
              var match;
              if (isPresent(match = RegExpWrapper.firstMatch(regex, url))) {
                var matchedUrl = '/';
                var unmatchedUrl = '';
                if (url != '/') {
                  matchedUrl = match[0];
                  unmatchedUrl = url.substring(match[0].length);
                }
                solutions.push(new RouteMatch(pathRecognizer, matchedUrl, unmatchedUrl));
              }
            }));
            return solutions;
          },
          hasRoute: function(name) {
            return this.names.has(name);
          },
          generate: function(name, params) {
            var pathRecognizer = this.names.get(name);
            if (isBlank(pathRecognizer)) {
              return null;
            }
            var url = pathRecognizer.generate(params);
            return {
              url: url,
              'nextComponent': pathRecognizer.handler.componentType
            };
          }
        }, {});
      }());
      $__export("RouteRecognizer", RouteRecognizer);
      RouteMatch = (function() {
        function RouteMatch(recognizer, matchedUrl, unmatchedUrl) {
          this.recognizer = recognizer;
          this.matchedUrl = matchedUrl;
          this.unmatchedUrl = unmatchedUrl;
        }
        return ($traceurRuntime.createClass)(RouteMatch, {params: function() {
            return this.recognizer.parseParams(this.matchedUrl);
          }}, {});
      }());
      $__export("RouteMatch", RouteMatch);
    }
  };
});

System.register("angular2/src/router/route_registry", ["angular2/src/router/route_recognizer", "angular2/src/router/instruction", "angular2/src/facade/collection", "angular2/src/facade/async", "angular2/src/facade/lang", "angular2/src/router/route_config_impl", "angular2/src/reflection/reflection", "angular2/di"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/route_registry";
  var __decorate,
      __metadata,
      RouteRecognizer,
      Instruction,
      ListWrapper,
      Map,
      StringMapWrapper,
      PromiseWrapper,
      isPresent,
      isBlank,
      isType,
      isString,
      isStringMap,
      BaseException,
      RouteConfig,
      reflector,
      Injectable,
      RouteRegistry,
      ALLOWED_TARGETS,
      VALID_COMPONENT_TYPES;
  function assertValidConfig(config) {
    if (!StringMapWrapper.contains(config, 'path')) {
      throw new BaseException("Route config should contain a \"path\" property");
    }
    var targets = 0;
    ListWrapper.forEach(ALLOWED_TARGETS, (function(target) {
      if (StringMapWrapper.contains(config, target)) {
        targets += 1;
      }
    }));
    if (targets != 1) {
      throw new BaseException("Route config should contain exactly one 'component', or 'redirectTo' property");
    }
  }
  function normalizeComponentDeclaration(config) {
    if (isType(config)) {
      return {
        'constructor': config,
        'type': 'constructor'
      };
    } else if (isStringMap(config)) {
      if (isBlank(config['type'])) {
        throw new BaseException("Component declaration when provided as a map should include a 'type' property");
      }
      var componentType = config['type'];
      if (!ListWrapper.contains(VALID_COMPONENT_TYPES, componentType)) {
        throw new BaseException(("Invalid component type '" + componentType + "'"));
      }
      return config;
    } else {
      throw new BaseException("Component declaration should be either a Map or a Type");
    }
  }
  function mostSpecific(instructions) {
    var mostSpecificSolution = instructions[0];
    for (var solutionIndex = 1; solutionIndex < instructions.length; solutionIndex++) {
      var solution = instructions[solutionIndex];
      if (solution.specificity > mostSpecificSolution.specificity) {
        mostSpecificSolution = solution;
      }
    }
    return mostSpecificSolution;
  }
  function assertTerminalComponent(component, path) {
    if (!isType(component)) {
      return ;
    }
    var annotations = reflector.annotations(component);
    if (isPresent(annotations)) {
      for (var i = 0; i < annotations.length; i++) {
        var annotation = annotations[i];
        if (annotation instanceof RouteConfig) {
          throw new BaseException(("Child routes are not allowed for \"" + path + "\". Use \"...\" on the parent's route path."));
        }
      }
    }
  }
  return {
    setters: [function($__m) {
      RouteRecognizer = $__m.RouteRecognizer;
    }, function($__m) {
      Instruction = $__m.Instruction;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      Map = $__m.Map;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      isType = $__m.isType;
      isString = $__m.isString;
      isStringMap = $__m.isStringMap;
      BaseException = $__m.BaseException;
    }, function($__m) {
      RouteConfig = $__m.RouteConfig;
    }, function($__m) {
      reflector = $__m.reflector;
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
      RouteRegistry = (($traceurRuntime.createClass)(function() {
        this._rules = new Map();
      }, {
        config: function(parentComponent, config) {
          assertValidConfig(config);
          var recognizer = this._rules.get(parentComponent);
          if (isBlank(recognizer)) {
            recognizer = new RouteRecognizer();
            this._rules.set(parentComponent, recognizer);
          }
          if (StringMapWrapper.contains(config, 'redirectTo')) {
            recognizer.addRedirect(config['path'], config['redirectTo']);
            return ;
          }
          config = StringMapWrapper.merge(config, {'component': normalizeComponentDeclaration(config['component'])});
          var component = config['component'];
          var terminal = recognizer.addConfig(config['path'], config, config['as']);
          if (component['type'] == 'constructor') {
            if (terminal) {
              assertTerminalComponent(component['constructor'], config['path']);
            } else {
              this.configFromComponent(component['constructor']);
            }
          }
        },
        configFromComponent: function(component) {
          var $__0 = this;
          if (!isType(component)) {
            return ;
          }
          if (this._rules.has(component)) {
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
          var $__0 = this;
          var componentRecognizer = this._rules.get(parentComponent);
          if (isBlank(componentRecognizer)) {
            return PromiseWrapper.resolve(null);
          }
          var possibleMatches = componentRecognizer.recognize(url);
          var matchPromises = ListWrapper.map(possibleMatches, (function(candidate) {
            return $__0._completeRouteMatch(candidate);
          }));
          return PromiseWrapper.all(matchPromises).then((function(solutions) {
            var fullSolutions = ListWrapper.filter(solutions, (function(solution) {
              return isPresent(solution);
            }));
            if (fullSolutions.length > 0) {
              return mostSpecific(fullSolutions);
            }
            return null;
          }));
        },
        _completeRouteMatch: function(partialMatch) {
          var $__0 = this;
          var recognizer = partialMatch.recognizer;
          var handler = recognizer.handler;
          return handler.resolveComponentType().then((function(componentType) {
            $__0.configFromComponent(componentType);
            if (partialMatch.unmatchedUrl.length == 0) {
              return new Instruction(componentType, partialMatch.matchedUrl, recognizer);
            }
            return $__0.recognize(partialMatch.unmatchedUrl, componentType).then((function(childInstruction) {
              if (isBlank(childInstruction)) {
                return null;
              } else {
                return new Instruction(componentType, partialMatch.matchedUrl, recognizer, childInstruction);
              }
            }));
          }));
        },
        generate: function(linkParams, parentComponent) {
          var url = '';
          var componentCursor = parentComponent;
          for (var i = 0; i < linkParams.length; i += 1) {
            var segment = linkParams[i];
            if (!isString(segment)) {
              throw new BaseException(("Unexpected segment \"" + segment + "\" in link DSL. Expected a string."));
            } else if (segment == '' || segment == '.' || segment == '..') {
              throw new BaseException(("\"" + segment + "/\" is only allowed at the beginning of a link DSL."));
            }
            var params = null;
            if (i + 1 < linkParams.length) {
              var nextSegment = linkParams[i + 1];
              if (isStringMap(nextSegment)) {
                params = nextSegment;
                i += 1;
              }
            }
            var componentRecognizer = this._rules.get(componentCursor);
            if (isBlank(componentRecognizer)) {
              throw new BaseException(("Could not find route config for \"" + segment + "\"."));
            }
            var response = componentRecognizer.generate(segment, params);
            url += response['url'];
            componentCursor = response['nextComponent'];
          }
          return url;
        }
      }, {}));
      $__export("RouteRegistry", RouteRegistry);
      $__export("RouteRegistry", RouteRegistry = __decorate([Injectable(), __metadata('design:paramtypes', [])], RouteRegistry));
      ALLOWED_TARGETS = ['component', 'redirectTo'];
      VALID_COMPONENT_TYPES = ['constructor', 'loader'];
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
      RouterOutlet = (($traceurRuntime.createClass)(function(_elementRef, _loader, _parentRouter, nameAttr) {
        this._elementRef = _elementRef;
        this._loader = _loader;
        this._parentRouter = _parentRouter;
        this._childRouter = null;
        this._componentRef = null;
        this._currentInstruction = null;
        this._parentRouter.registerOutlet(this);
      }, {
        activate: function(instruction) {
          var $__0 = this;
          if ((instruction == this._currentInstruction || instruction.reuse) && isPresent(this._childRouter)) {
            return this._childRouter.commit(instruction.child);
          }
          this._currentInstruction = instruction;
          this._childRouter = this._parentRouter.childRouter(instruction.component);
          var params = new RouteParams(instruction.params());
          var bindings = Injector.resolve([bind(RouteParams).toValue(params), bind(routerMod.Router).toValue(this._childRouter)]);
          return this.deactivate().then((function(_) {
            return $__0._loader.loadNextToLocation(instruction.component, $__0._elementRef, bindings);
          })).then((function(componentRef) {
            $__0._componentRef = componentRef;
            return $__0._childRouter.commit(instruction.child);
          }));
        },
        deactivate: function() {
          var $__0 = this;
          return (isPresent(this._childRouter) ? this._childRouter.deactivate() : PromiseWrapper.resolve(true)).then((function(_) {
            if (isPresent($__0._componentRef)) {
              $__0._componentRef.dispose();
              $__0._componentRef = null;
            }
          }));
        },
        canDeactivate: function(instruction) {
          return PromiseWrapper.resolve(true);
        }
      }, {}));
      $__export("RouterOutlet", RouterOutlet);
      $__export("RouterOutlet", RouterOutlet = __decorate([Directive({selector: 'router-outlet'}), __param(3, Attribute('name')), __metadata('design:paramtypes', [ElementRef, DynamicComponentLoader, routerMod.Router, String])], RouterOutlet));
    }
  };
});

System.register("angular2/router", ["angular2/src/router/router", "angular2/src/router/router_outlet", "angular2/src/router/router_link", "angular2/src/router/instruction", "angular2/src/router/route_registry", "angular2/src/router/location_strategy", "angular2/src/router/hash_location_strategy", "angular2/src/router/html5_location_strategy", "angular2/src/router/location", "angular2/src/router/pipeline", "angular2/src/router/route_config_decorator", "angular2/src/core/application_tokens", "angular2/di", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/router";
  var LocationStrategy,
      HTML5LocationStrategy,
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
      LocationStrategy = $__m.LocationStrategy;
      $__export("LocationStrategy", $__m.LocationStrategy);
    }, function($__m) {
      $__export("HashLocationStrategy", $__m.HashLocationStrategy);
    }, function($__m) {
      HTML5LocationStrategy = $__m.HTML5LocationStrategy;
      $__export("HTML5LocationStrategy", $__m.HTML5LocationStrategy);
    }, function($__m) {
      Location = $__m.Location;
      $__export("Location", $__m.Location);
      $__export("appBaseHrefToken", $__m.appBaseHrefToken);
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
      routerInjectables = [RouteRegistry, Pipeline, bind(LocationStrategy).toClass(HTML5LocationStrategy), Location, bind(Router).toFactory((function(registry, pipeline, location, appRoot) {
        return new RootRouter(registry, pipeline, location, appRoot);
      }), [RouteRegistry, Pipeline, Location, appComponentTypeToken])];
      $__export("routerInjectables", routerInjectables);
    }
  };
});

//# sourceMappingURL=router.dev.js.map