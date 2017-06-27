"format register";
System.register("angular2/src/router/instruction", ["angular2/src/core/facade/collection", "angular2/src/core/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/instruction";
  var StringMapWrapper,
      isBlank,
      normalizeBlank,
      RouteParams,
      Instruction,
      PrimaryInstruction,
      ComponentInstruction;
  function stringifyInstruction(instruction) {
    var params = instruction.component.urlParams.length > 0 ? ('?' + instruction.component.urlParams.join('&')) : '';
    return instruction.component.urlPath + stringifyAux(instruction) + stringifyPrimary(instruction.child) + params;
  }
  function stringifyPrimary(instruction) {
    if (isBlank(instruction)) {
      return '';
    }
    var params = instruction.component.urlParams.length > 0 ? (';' + instruction.component.urlParams.join(';')) : '';
    return '/' + instruction.component.urlPath + params + stringifyAux(instruction) + stringifyPrimary(instruction.child);
  }
  function stringifyAux(instruction) {
    var routes = [];
    StringMapWrapper.forEach(instruction.auxInstruction, (function(auxInstruction, _) {
      routes.push(stringifyPrimary(auxInstruction));
    }));
    if (routes.length > 0) {
      return '(' + routes.join('//') + ')';
    }
    return '';
  }
  $__export("stringifyInstruction", stringifyInstruction);
  return {
    setters: [function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
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
        function Instruction(component, child, auxInstruction) {
          this.component = component;
          this.child = child;
          this.auxInstruction = auxInstruction;
        }
        return ($traceurRuntime.createClass)(Instruction, {replaceChild: function(child) {
            return new Instruction(this.component, child, this.auxInstruction);
          }}, {});
      }());
      $__export("Instruction", Instruction);
      PrimaryInstruction = (function() {
        function PrimaryInstruction(component, child, auxUrls) {
          this.component = component;
          this.child = child;
          this.auxUrls = auxUrls;
        }
        return ($traceurRuntime.createClass)(PrimaryInstruction, {}, {});
      }());
      $__export("PrimaryInstruction", PrimaryInstruction);
      ComponentInstruction = (function() {
        function ComponentInstruction(urlPath, urlParams, _recognizer) {
          var params = arguments[3] !== (void 0) ? arguments[3] : null;
          this.urlPath = urlPath;
          this.urlParams = urlParams;
          this._recognizer = _recognizer;
          this.params = params;
          this.reuse = false;
        }
        return ($traceurRuntime.createClass)(ComponentInstruction, {
          get componentType() {
            return this._recognizer.handler.componentType;
          },
          resolveComponentType: function() {
            return this._recognizer.handler.resolveComponentType();
          },
          get specificity() {
            return this._recognizer.specificity;
          },
          get terminal() {
            return this._recognizer.terminal;
          },
          routeData: function() {
            return this._recognizer.handler.data;
          }
        }, {});
      }());
      $__export("ComponentInstruction", ComponentInstruction);
    }
  };
});

System.register("angular2/src/router/lifecycle_annotations_impl", ["angular2/src/core/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/lifecycle_annotations_impl";
  var __decorate,
      __metadata,
      CONST,
      CONST_EXPR,
      RouteLifecycleHook,
      CanActivate,
      canReuse,
      canDeactivate,
      onActivate,
      onReuse,
      onDeactivate;
  return {
    setters: [function($__m) {
      CONST = $__m.CONST;
      CONST_EXPR = $__m.CONST_EXPR;
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
      RouteLifecycleHook = (($traceurRuntime.createClass)(function(name) {
        this.name = name;
      }, {}, {}));
      $__export("RouteLifecycleHook", RouteLifecycleHook);
      $__export("RouteLifecycleHook", RouteLifecycleHook = __decorate([CONST(), __metadata('design:paramtypes', [String])], RouteLifecycleHook));
      CanActivate = (($traceurRuntime.createClass)(function(fn) {
        this.fn = fn;
      }, {}, {}));
      $__export("CanActivate", CanActivate);
      $__export("CanActivate", CanActivate = __decorate([CONST(), __metadata('design:paramtypes', [Function])], CanActivate));
      canReuse = CONST_EXPR(new RouteLifecycleHook("canReuse"));
      $__export("canReuse", canReuse);
      canDeactivate = CONST_EXPR(new RouteLifecycleHook("canDeactivate"));
      $__export("canDeactivate", canDeactivate);
      onActivate = CONST_EXPR(new RouteLifecycleHook("onActivate"));
      $__export("onActivate", onActivate);
      onReuse = CONST_EXPR(new RouteLifecycleHook("onReuse"));
      $__export("onReuse", onReuse);
      onDeactivate = CONST_EXPR(new RouteLifecycleHook("onDeactivate"));
      $__export("onDeactivate", onDeactivate);
    }
  };
});

System.register("angular2/src/router/route_data", ["angular2/di", "angular2/src/core/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/route_data";
  var OpaqueToken,
      CONST_EXPR,
      ROUTE_DATA;
  return {
    setters: [function($__m) {
      OpaqueToken = $__m.OpaqueToken;
    }, function($__m) {
      CONST_EXPR = $__m.CONST_EXPR;
    }],
    execute: function() {
      ROUTE_DATA = CONST_EXPR(new OpaqueToken('routeData'));
      $__export("ROUTE_DATA", ROUTE_DATA);
    }
  };
});

System.register("angular2/src/router/lifecycle_annotations", ["angular2/src/core/util/decorators", "angular2/src/router/lifecycle_annotations_impl"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/lifecycle_annotations";
  var makeDecorator,
      CanActivateAnnotation,
      CanActivate;
  return {
    setters: [function($__m) {
      makeDecorator = $__m.makeDecorator;
    }, function($__m) {
      CanActivateAnnotation = $__m.CanActivate;
      $__export("canReuse", $__m.canReuse);
      $__export("canDeactivate", $__m.canDeactivate);
      $__export("onActivate", $__m.onActivate);
      $__export("onReuse", $__m.onReuse);
      $__export("onDeactivate", $__m.onDeactivate);
    }],
    execute: function() {
      CanActivate = makeDecorator(CanActivateAnnotation);
      $__export("CanActivate", CanActivate);
    }
  };
});

System.register("angular2/src/router/location_strategy", ["angular2/src/core/facade/lang"], function($__export) {
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

System.register("angular2/src/router/url_parser", ["angular2/src/core/facade/collection", "angular2/src/core/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/url_parser";
  var StringMapWrapper,
      isPresent,
      isBlank,
      BaseException,
      RegExpWrapper,
      CONST_EXPR,
      Url,
      RootUrl,
      SEGMENT_RE,
      UrlParser,
      parser;
  function pathSegmentsToUrl(pathSegments) {
    var url = new Url(pathSegments[pathSegments.length - 1]);
    for (var i = pathSegments.length - 2; i >= 0; i -= 1) {
      url = new Url(pathSegments[i], url);
    }
    return url;
  }
  function matchUrlSegment(str) {
    var match = RegExpWrapper.firstMatch(SEGMENT_RE, str);
    return isPresent(match) ? match[0] : null;
  }
  function serializeParams(paramMap) {
    var params = [];
    if (isPresent(paramMap)) {
      StringMapWrapper.forEach(paramMap, (function(value, key) {
        if (value == true) {
          params.push(key);
        } else {
          params.push(key + '=' + value);
        }
      }));
    }
    return params;
  }
  $__export("pathSegmentsToUrl", pathSegmentsToUrl);
  $__export("serializeParams", serializeParams);
  return {
    setters: [function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
      RegExpWrapper = $__m.RegExpWrapper;
      CONST_EXPR = $__m.CONST_EXPR;
    }],
    execute: function() {
      Url = (function() {
        function Url(path) {
          var child = arguments[1] !== (void 0) ? arguments[1] : null;
          var auxiliary = arguments[2] !== (void 0) ? arguments[2] : CONST_EXPR([]);
          var params = arguments[3] !== (void 0) ? arguments[3] : null;
          this.path = path;
          this.child = child;
          this.auxiliary = auxiliary;
          this.params = params;
        }
        return ($traceurRuntime.createClass)(Url, {
          toString: function() {
            return this.path + this._matrixParamsToString() + this._auxToString() + this._childString();
          },
          segmentToString: function() {
            return this.path + this._matrixParamsToString();
          },
          _auxToString: function() {
            return this.auxiliary.length > 0 ? ('(' + this.auxiliary.map((function(sibling) {
              return sibling.toString();
            })).join('//') + ')') : '';
          },
          _matrixParamsToString: function() {
            if (isBlank(this.params)) {
              return '';
            }
            return ';' + serializeParams(this.params).join(';');
          },
          _childString: function() {
            return isPresent(this.child) ? ('/' + this.child.toString()) : '';
          }
        }, {});
      }());
      $__export("Url", Url);
      RootUrl = (function($__super) {
        function RootUrl(path) {
          var child = arguments[1] !== (void 0) ? arguments[1] : null;
          var auxiliary = arguments[2] !== (void 0) ? arguments[2] : CONST_EXPR([]);
          var params = arguments[3] !== (void 0) ? arguments[3] : null;
          $traceurRuntime.superConstructor(RootUrl).call(this, path, child, auxiliary, params);
        }
        return ($traceurRuntime.createClass)(RootUrl, {
          toString: function() {
            return this.path + this._auxToString() + this._childString() + this._queryParamsToString();
          },
          segmentToString: function() {
            return this.path + this._queryParamsToString();
          },
          _queryParamsToString: function() {
            if (isBlank(this.params)) {
              return '';
            }
            return '?' + serializeParams(this.params).join('&');
          }
        }, {}, $__super);
      }(Url));
      $__export("RootUrl", RootUrl);
      SEGMENT_RE = RegExpWrapper.create('^[^\\/\\(\\)\\?;=&]+');
      UrlParser = (function() {
        function UrlParser() {}
        return ($traceurRuntime.createClass)(UrlParser, {
          peekStartsWith: function(str) {
            return this.remaining.startsWith(str);
          },
          capture: function(str) {
            if (!this.remaining.startsWith(str)) {
              throw new BaseException(("Expected \"" + str + "\"."));
            }
            this.remaining = this.remaining.substring(str.length);
          },
          parse: function(url) {
            this.remaining = url;
            if (url == '' || url == '/') {
              return new Url('');
            }
            return this.parseRoot();
          },
          parseRoot: function() {
            if (this.peekStartsWith('/')) {
              this.capture('/');
            }
            var path = matchUrlSegment(this.remaining);
            this.capture(path);
            var aux = [];
            if (this.peekStartsWith('(')) {
              aux = this.parseAuxiliaryRoutes();
            }
            if (this.peekStartsWith(';')) {
              this.parseMatrixParams();
            }
            var child = null;
            if (this.peekStartsWith('/') && !this.peekStartsWith('//')) {
              this.capture('/');
              child = this.parseSegment();
            }
            var queryParams = null;
            if (this.peekStartsWith('?')) {
              queryParams = this.parseQueryParams();
            }
            return new RootUrl(path, child, aux, queryParams);
          },
          parseSegment: function() {
            if (this.remaining.length == 0) {
              return null;
            }
            if (this.peekStartsWith('/')) {
              this.capture('/');
            }
            var path = matchUrlSegment(this.remaining);
            this.capture(path);
            var matrixParams = null;
            if (this.peekStartsWith(';')) {
              matrixParams = this.parseMatrixParams();
            }
            var aux = [];
            if (this.peekStartsWith('(')) {
              aux = this.parseAuxiliaryRoutes();
            }
            var child = null;
            if (this.peekStartsWith('/') && !this.peekStartsWith('//')) {
              this.capture('/');
              child = this.parseSegment();
            }
            return new Url(path, child, aux, matrixParams);
          },
          parseQueryParams: function() {
            var params = {};
            this.capture('?');
            this.parseParam(params);
            while (this.remaining.length > 0 && this.peekStartsWith('&')) {
              this.capture('&');
              this.parseParam(params);
            }
            return params;
          },
          parseMatrixParams: function() {
            var params = {};
            while (this.remaining.length > 0 && this.peekStartsWith(';')) {
              this.capture(';');
              this.parseParam(params);
            }
            return params;
          },
          parseParam: function(params) {
            var key = matchUrlSegment(this.remaining);
            if (isBlank(key)) {
              return ;
            }
            this.capture(key);
            var value = true;
            if (this.peekStartsWith('=')) {
              this.capture('=');
              var valueMatch = matchUrlSegment(this.remaining);
              if (isPresent(valueMatch)) {
                value = valueMatch;
                this.capture(value);
              }
            }
            params[key] = value;
          },
          parseAuxiliaryRoutes: function() {
            var routes = [];
            this.capture('(');
            while (!this.peekStartsWith(')') && this.remaining.length > 0) {
              routes.push(this.parseSegment());
              if (this.peekStartsWith('//')) {
                this.capture('//');
              }
            }
            this.capture(')');
            return routes;
          }
        }, {});
      }());
      $__export("UrlParser", UrlParser);
      parser = new UrlParser();
      $__export("parser", parser);
    }
  };
});

System.register("angular2/src/router/route_config_impl", ["angular2/src/core/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/route_config_impl";
  var __decorate,
      __metadata,
      CONST,
      RouteConfig,
      Route,
      AuxRoute,
      AsyncRoute,
      Redirect;
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
      $__export("RouteConfig", RouteConfig = __decorate([CONST(), __metadata('design:paramtypes', [Array])], RouteConfig));
      Route = (($traceurRuntime.createClass)(function($__2) {
        var $__3 = $__2,
            path = $__3.path,
            component = $__3.component,
            as = $__3.as,
            data = $__3.data;
        this.path = path;
        this.component = component;
        this.as = as;
        this.loader = null;
        this.redirectTo = null;
        this.data = data;
      }, {}, {}));
      $__export("Route", Route);
      $__export("Route", Route = __decorate([CONST(), __metadata('design:paramtypes', [Object])], Route));
      AuxRoute = (($traceurRuntime.createClass)(function($__2) {
        var $__3 = $__2,
            path = $__3.path,
            component = $__3.component,
            as = $__3.as;
        this.data = null;
        this.loader = null;
        this.redirectTo = null;
        this.path = path;
        this.component = component;
        this.as = as;
      }, {}, {}));
      $__export("AuxRoute", AuxRoute);
      $__export("AuxRoute", AuxRoute = __decorate([CONST(), __metadata('design:paramtypes', [Object])], AuxRoute));
      AsyncRoute = (($traceurRuntime.createClass)(function($__2) {
        var $__3 = $__2,
            path = $__3.path,
            loader = $__3.loader,
            as = $__3.as,
            data = $__3.data;
        this.path = path;
        this.loader = loader;
        this.as = as;
        this.data = data;
      }, {}, {}));
      $__export("AsyncRoute", AsyncRoute);
      $__export("AsyncRoute", AsyncRoute = __decorate([CONST(), __metadata('design:paramtypes', [Object])], AsyncRoute));
      Redirect = (($traceurRuntime.createClass)(function($__2) {
        var $__3 = $__2,
            path = $__3.path,
            redirectTo = $__3.redirectTo;
        this.as = null;
        this.loader = null;
        this.data = null;
        this.path = path;
        this.redirectTo = redirectTo;
      }, {}, {}));
      $__export("Redirect", Redirect);
      $__export("Redirect", Redirect = __decorate([CONST(), __metadata('design:paramtypes', [Object])], Redirect));
    }
  };
});

System.register("angular2/src/router/async_route_handler", ["angular2/src/core/facade/lang"], function($__export) {
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
        function AsyncRouteHandler(_loader, data) {
          this._loader = _loader;
          this.data = data;
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

System.register("angular2/src/router/sync_route_handler", ["angular2/src/core/facade/async"], function($__export) {
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
        function SyncRouteHandler(componentType, data) {
          this.componentType = componentType;
          this.data = data;
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

System.register("angular2/src/router/route_config_decorator", ["angular2/src/router/route_config_impl", "angular2/src/core/util/decorators"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/route_config_decorator";
  var RouteConfigAnnotation,
      makeDecorator,
      RouteConfig;
  return {
    setters: [function($__m) {
      RouteConfigAnnotation = $__m.RouteConfig;
      $__export("Route", $__m.Route);
      $__export("Redirect", $__m.Redirect);
      $__export("AuxRoute", $__m.AuxRoute);
      $__export("AsyncRoute", $__m.AsyncRoute);
    }, function($__m) {
      makeDecorator = $__m.makeDecorator;
    }],
    execute: function() {
      RouteConfig = makeDecorator(RouteConfigAnnotation);
      $__export("RouteConfig", RouteConfig);
    }
  };
});

System.register("angular2/src/router/hash_location_strategy", ["angular2/src/core/dom/dom_adapter", "angular2/di", "angular2/src/router/location_strategy"], function($__export) {
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
            var path = this._location.hash;
            return path.length > 0 ? path.substring(1) : path;
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

System.register("angular2/src/router/path_location_strategy", ["angular2/src/core/dom/dom_adapter", "angular2/di", "angular2/src/router/location_strategy"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/path_location_strategy";
  var __decorate,
      __metadata,
      DOM,
      Injectable,
      LocationStrategy,
      PathLocationStrategy;
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
      PathLocationStrategy = (function($__super) {
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
      $__export("PathLocationStrategy", PathLocationStrategy);
      $__export("PathLocationStrategy", PathLocationStrategy = __decorate([Injectable(), __metadata('design:paramtypes', [])], PathLocationStrategy));
    }
  };
});

System.register("angular2/src/router/pipeline", ["angular2/src/core/facade/async", "angular2/di"], function($__export) {
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

System.register("angular2/src/router/route_definition", [], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/route_definition";
  return {
    setters: [],
    execute: function() {}
  };
});

System.register("angular2/src/router/location", ["angular2/src/router/location_strategy", "angular2/src/core/facade/lang", "angular2/src/core/facade/async", "angular2/di"], function($__export) {
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
      BaseException,
      isBlank,
      OpaqueToken,
      Injectable,
      Optional,
      Inject,
      APP_BASE_HREF,
      Location;
  function _stripBaseHref(baseHref, url) {
    if (baseHref.length > 0 && url.startsWith(baseHref)) {
      return url.substring(baseHref.length);
    }
    return url;
  }
  function _addBaseHref(baseHref, url) {
    if (!url.startsWith(baseHref)) {
      return baseHref + url;
    }
    return url;
  }
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
      BaseException = $__m.BaseException;
      isBlank = $__m.isBlank;
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
      APP_BASE_HREF = CONST_EXPR(new OpaqueToken('appBaseHref'));
      $__export("APP_BASE_HREF", APP_BASE_HREF);
      Location = (($traceurRuntime.createClass)(function(platformStrategy, href) {
        var $__0 = this;
        this.platformStrategy = platformStrategy;
        this._subject = new EventEmitter();
        var browserBaseHref = isPresent(href) ? href : this.platformStrategy.getBaseHref();
        if (isBlank(browserBaseHref)) {
          throw new BaseException("No base href set. Either provide a binding to \"appBaseHrefToken\" or add a base element.");
        }
        this._baseHref = stripTrailingSlash(stripIndexHtml(browserBaseHref));
        this.platformStrategy.onPopState((function(_) {
          ObservableWrapper.callNext($__0._subject, {
            'url': $__0.path(),
            'pop': true
          });
        }));
      }, {
        path: function() {
          return this.normalize(this.platformStrategy.path());
        },
        normalize: function(url) {
          return stripTrailingSlash(_stripBaseHref(this._baseHref, stripIndexHtml(url)));
        },
        normalizeAbsolutely: function(url) {
          if (!url.startsWith('/')) {
            url = '/' + url;
          }
          return stripTrailingSlash(_addBaseHref(this._baseHref, url));
        },
        go: function(url) {
          var finalUrl = this.normalizeAbsolutely(url);
          this.platformStrategy.pushState(null, '', finalUrl);
        },
        forward: function() {
          this.platformStrategy.forward();
        },
        back: function() {
          this.platformStrategy.back();
        },
        subscribe: function(onNext) {
          var onThrow = arguments[1] !== (void 0) ? arguments[1] : null;
          var onReturn = arguments[2] !== (void 0) ? arguments[2] : null;
          ObservableWrapper.subscribe(this._subject, onNext, onThrow, onReturn);
        }
      }, {}));
      $__export("Location", Location);
      $__export("Location", Location = __decorate([Injectable(), __param(1, Optional()), __param(1, Inject(APP_BASE_HREF)), __metadata('design:paramtypes', [LocationStrategy, String])], Location));
    }
  };
});

System.register("angular2/src/router/path_recognizer", ["angular2/src/core/facade/lang", "angular2/src/core/facade/collection", "angular2/src/router/url_parser", "angular2/src/router/instruction"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/path_recognizer";
  var RegExpWrapper,
      StringWrapper,
      isPresent,
      isBlank,
      BaseException,
      Map,
      StringMapWrapper,
      ListWrapper,
      RootUrl,
      serializeParams,
      ComponentInstruction,
      TouchMap,
      ContinuationSegment,
      StaticSegment,
      DynamicSegment,
      StarSegment,
      paramMatcher,
      wildcardMatcher,
      RESERVED_CHARS,
      PathMatch,
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
      } else {
        results.push(new StaticSegment(segment));
        specificity += 100 * (100 - i);
      }
    }
    var result = StringMapWrapper.create();
    StringMapWrapper.set(result, 'segments', results);
    StringMapWrapper.set(result, 'specificity', specificity);
    return result;
  }
  function pathDslHash(segments) {
    return segments.map((function(segment) {
      if (segment instanceof StarSegment) {
        return '*';
      } else if (segment instanceof ContinuationSegment) {
        return '...';
      } else if (segment instanceof DynamicSegment) {
        return ':';
      } else if (segment instanceof StaticSegment) {
        return segment.path;
      }
    })).join('/');
  }
  function splitBySlash(url) {
    return url.split('/');
  }
  function assertPath(path) {
    if (StringWrapper.contains(path, '#')) {
      throw new BaseException(("Path \"" + path + "\" should not include \"#\". Use \"HashLocationStrategy\" instead."));
    }
    var illegalCharacter = RegExpWrapper.firstMatch(RESERVED_CHARS, path);
    if (isPresent(illegalCharacter)) {
      throw new BaseException(("Path \"" + path + "\" contains \"" + illegalCharacter[0] + "\" which is not allowed in a route config."));
    }
  }
  return {
    setters: [function($__m) {
      RegExpWrapper = $__m.RegExpWrapper;
      StringWrapper = $__m.StringWrapper;
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
    }, function($__m) {
      Map = $__m.Map;
      StringMapWrapper = $__m.StringMapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      RootUrl = $__m.RootUrl;
      serializeParams = $__m.serializeParams;
    }, function($__m) {
      ComponentInstruction = $__m.ComponentInstruction;
    }],
    execute: function() {
      TouchMap = (function() {
        function TouchMap(map) {
          var $__0 = this;
          this.map = {};
          this.keys = {};
          if (isPresent(map)) {
            StringMapWrapper.forEach(map, (function(value, key) {
              $__0.map[key] = isPresent(value) ? value.toString() : null;
              $__0.keys[key] = true;
            }));
          }
        }
        return ($traceurRuntime.createClass)(TouchMap, {
          get: function(key) {
            StringMapWrapper.delete(this.keys, key);
            return this.map[key];
          },
          getUnused: function() {
            var $__0 = this;
            var unused = StringMapWrapper.create();
            var keys = StringMapWrapper.keys(this.keys);
            ListWrapper.forEach(keys, (function(key) {
              unused[key] = StringMapWrapper.get($__0.map, key);
            }));
            return unused;
          }
        }, {});
      }());
      $__export("TouchMap", TouchMap);
      ContinuationSegment = (function() {
        function ContinuationSegment() {
          this.name = '';
        }
        return ($traceurRuntime.createClass)(ContinuationSegment, {
          generate: function(params) {
            return '';
          },
          match: function(path) {
            return true;
          }
        }, {});
      }());
      StaticSegment = (function() {
        function StaticSegment(path) {
          this.path = path;
          this.name = '';
        }
        return ($traceurRuntime.createClass)(StaticSegment, {
          match: function(path) {
            return path == this.path;
          },
          generate: function(params) {
            return this.path;
          }
        }, {});
      }());
      DynamicSegment = (function() {
        function DynamicSegment(name) {
          this.name = name;
        }
        return ($traceurRuntime.createClass)(DynamicSegment, {
          match: function(path) {
            return true;
          },
          generate: function(params) {
            if (!StringMapWrapper.contains(params.map, this.name)) {
              throw new BaseException(("Route generator for '" + this.name + "' was not included in parameters passed."));
            }
            return normalizeString(params.get(this.name));
          }
        }, {});
      }());
      StarSegment = (function() {
        function StarSegment(name) {
          this.name = name;
        }
        return ($traceurRuntime.createClass)(StarSegment, {
          match: function(path) {
            return true;
          },
          generate: function(params) {
            return normalizeString(params.get(this.name));
          }
        }, {});
      }());
      paramMatcher = /^:([^\/]+)$/g;
      wildcardMatcher = /^\*([^\/]+)$/g;
      RESERVED_CHARS = RegExpWrapper.create('//|\\(|\\)|;|\\?|=');
      PathMatch = (function() {
        function PathMatch(instruction, remaining, remainingAux) {
          this.instruction = instruction;
          this.remaining = remaining;
          this.remainingAux = remainingAux;
        }
        return ($traceurRuntime.createClass)(PathMatch, {}, {});
      }());
      $__export("PathMatch", PathMatch);
      PathRecognizer = (function() {
        function PathRecognizer(path, handler) {
          this.path = path;
          this.handler = handler;
          this.terminal = true;
          this.cache = new Map();
          assertPath(path);
          var parsed = parsePathString(path);
          this._segments = parsed['segments'];
          this.specificity = parsed['specificity'];
          this.hash = pathDslHash(this._segments);
          var lastSegment = this._segments[this._segments.length - 1];
          this.terminal = !(lastSegment instanceof ContinuationSegment);
        }
        return ($traceurRuntime.createClass)(PathRecognizer, {
          recognize: function(beginningSegment) {
            var nextSegment = beginningSegment;
            var currentSegment;
            var positionalParams = {};
            var captured = [];
            for (var i = 0; i < this._segments.length; i += 1) {
              var segment = this._segments[i];
              currentSegment = nextSegment;
              if (segment instanceof ContinuationSegment) {
                break;
              }
              if (isBlank(currentSegment)) {
                return null;
              }
              captured.push(currentSegment.path);
              if (segment instanceof StarSegment) {
                positionalParams[segment.name] = currentSegment.toString();
                nextSegment = null;
                break;
              }
              if (segment instanceof DynamicSegment) {
                positionalParams[segment.name] = currentSegment.path;
              } else if (!segment.match(currentSegment.path)) {
                return null;
              }
              nextSegment = currentSegment.child;
            }
            if (this.terminal && isPresent(nextSegment)) {
              return null;
            }
            var urlPath = captured.join('/');
            var auxiliary;
            var instruction;
            var urlParams;
            var allParams;
            if (isPresent(currentSegment)) {
              var paramsSegment = beginningSegment instanceof RootUrl ? beginningSegment : currentSegment;
              allParams = isPresent(paramsSegment.params) ? StringMapWrapper.merge(paramsSegment.params, positionalParams) : positionalParams;
              urlParams = serializeParams(paramsSegment.params);
              auxiliary = currentSegment.auxiliary;
            } else {
              allParams = positionalParams;
              auxiliary = [];
              urlParams = [];
            }
            instruction = this._getInstruction(urlPath, urlParams, this, allParams);
            return new PathMatch(instruction, nextSegment, auxiliary);
          },
          generate: function(params) {
            var paramTokens = new TouchMap(params);
            var path = [];
            for (var i = 0; i < this._segments.length; i++) {
              var segment = this._segments[i];
              if (!(segment instanceof ContinuationSegment)) {
                path.push(segment.generate(paramTokens));
              }
            }
            var urlPath = path.join('/');
            var nonPositionalParams = paramTokens.getUnused();
            var urlParams = serializeParams(nonPositionalParams);
            return this._getInstruction(urlPath, urlParams, this, params);
          },
          _getInstruction: function(urlPath, urlParams, _recognizer, params) {
            var hashKey = urlPath + '?' + urlParams.join('?');
            if (this.cache.has(hashKey)) {
              return this.cache.get(hashKey);
            }
            var instruction = new ComponentInstruction(urlPath, urlParams, _recognizer, params);
            this.cache.set(hashKey, instruction);
            return instruction;
          }
        }, {});
      }());
      $__export("PathRecognizer", PathRecognizer);
    }
  };
});

System.register("angular2/src/router/route_config_nomalizer", ["angular2/src/router/route_config_decorator", "angular2/src/core/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/route_config_nomalizer";
  var AsyncRoute,
      AuxRoute,
      Route,
      Redirect,
      BaseException;
  function normalizeRouteConfig(config) {
    if (config instanceof Route || config instanceof Redirect || config instanceof AsyncRoute || config instanceof AuxRoute) {
      return config;
    }
    if ((!config.component) == (!config.redirectTo)) {
      throw new BaseException("Route config should contain exactly one \"component\", \"loader\", or \"redirectTo\" property.");
    }
    if (config.component) {
      if (typeof config.component == 'object') {
        var componentDefinitionObject = config.component;
        if (componentDefinitionObject.type == 'constructor') {
          return new Route({
            path: config.path,
            component: componentDefinitionObject.constructor,
            as: config.as
          });
        } else if (componentDefinitionObject.type == 'loader') {
          return new AsyncRoute({
            path: config.path,
            loader: componentDefinitionObject.loader,
            as: config.as
          });
        } else {
          throw new BaseException(("Invalid component type \"" + componentDefinitionObject.type + "\". Valid types are \"constructor\" and \"loader\"."));
        }
      }
      return new Route(config);
    }
    if (config.redirectTo) {
      return new Redirect({
        path: config.path,
        redirectTo: config.redirectTo
      });
    }
    return config;
  }
  $__export("normalizeRouteConfig", normalizeRouteConfig);
  return {
    setters: [function($__m) {
      AsyncRoute = $__m.AsyncRoute;
      AuxRoute = $__m.AuxRoute;
      Route = $__m.Route;
      Redirect = $__m.Redirect;
    }, function($__m) {
      BaseException = $__m.BaseException;
    }],
    execute: function() {
    }
  };
});

System.register("angular2/src/router/route_lifecycle_reflector", ["angular2/src/core/facade/lang", "angular2/src/router/lifecycle_annotations_impl", "angular2/src/core/reflection/reflection"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/route_lifecycle_reflector";
  var Type,
      CanActivate,
      reflector;
  function hasLifecycleHook(e, type) {
    if (!(type instanceof Type))
      return false;
    return e.name in type.prototype;
  }
  function getCanActivateHook(type) {
    var annotations = reflector.annotations(type);
    for (var i = 0; i < annotations.length; i += 1) {
      var annotation = annotations[i];
      if (annotation instanceof CanActivate) {
        return annotation.fn;
      }
    }
    return null;
  }
  $__export("hasLifecycleHook", hasLifecycleHook);
  $__export("getCanActivateHook", getCanActivateHook);
  return {
    setters: [function($__m) {
      Type = $__m.Type;
    }, function($__m) {
      CanActivate = $__m.CanActivate;
    }, function($__m) {
      reflector = $__m.reflector;
    }],
    execute: function() {
    }
  };
});

System.register("angular2/src/router/router_link", ["angular2/src/core/metadata", "angular2/src/router/router", "angular2/src/router/location", "angular2/src/router/instruction"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/router_link";
  var __decorate,
      __metadata,
      Directive,
      Router,
      Location,
      stringifyInstruction,
      RouterLink;
  return {
    setters: [function($__m) {
      Directive = $__m.Directive;
    }, function($__m) {
      Router = $__m.Router;
    }, function($__m) {
      Location = $__m.Location;
    }, function($__m) {
      stringifyInstruction = $__m.stringifyInstruction;
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
        get isRouteActive() {
          return this._router.isRouteActive(this._navigationInstruction);
        },
        set routeParams(changes) {
          this._routeParams = changes;
          this._navigationInstruction = this._router.generate(this._routeParams);
          var navigationHref = '/' + stringifyInstruction(this._navigationInstruction);
          this.visibleHref = this._location.normalizeAbsolutely(navigationHref);
        },
        onClick: function() {
          this._router.navigateInstruction(this._navigationInstruction);
          return false;
        }
      }, {}));
      $__export("RouterLink", RouterLink);
      $__export("RouterLink", RouterLink = __decorate([Directive({
        selector: '[router-link]',
        properties: ['routeParams: routerLink'],
        host: {
          '(click)': 'onClick()',
          '[attr.href]': 'visibleHref',
          '[class.router-link-active]': 'isRouteActive'
        }
      }), __metadata('design:paramtypes', [Router, Location])], RouterLink));
    }
  };
});

System.register("angular2/src/router/route_recognizer", ["angular2/src/core/facade/lang", "angular2/src/core/facade/collection", "angular2/src/router/path_recognizer", "angular2/src/router/route_config_impl", "angular2/src/router/async_route_handler", "angular2/src/router/sync_route_handler", "angular2/src/router/url_parser"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/route_recognizer";
  var isBlank,
      isPresent,
      BaseException,
      Map,
      PathRecognizer,
      Route,
      AsyncRoute,
      AuxRoute,
      Redirect,
      AsyncRouteHandler,
      SyncRouteHandler,
      Url,
      RouteRecognizer,
      Redirector;
  return {
    setters: [function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
    }, function($__m) {
      Map = $__m.Map;
    }, function($__m) {
      PathRecognizer = $__m.PathRecognizer;
    }, function($__m) {
      Route = $__m.Route;
      AsyncRoute = $__m.AsyncRoute;
      AuxRoute = $__m.AuxRoute;
      Redirect = $__m.Redirect;
    }, function($__m) {
      AsyncRouteHandler = $__m.AsyncRouteHandler;
    }, function($__m) {
      SyncRouteHandler = $__m.SyncRouteHandler;
    }, function($__m) {
      Url = $__m.Url;
    }],
    execute: function() {
      RouteRecognizer = (function() {
        function RouteRecognizer() {
          this.names = new Map();
          this.auxRoutes = new Map();
          this.matchers = [];
          this.redirects = [];
        }
        return ($traceurRuntime.createClass)(RouteRecognizer, {
          config: function(config) {
            var handler;
            if (config instanceof AuxRoute) {
              handler = new SyncRouteHandler(config.component, config.data);
              var path = config.path.startsWith('/') ? config.path.substring(1) : config.path;
              var recognizer = new PathRecognizer(config.path, handler);
              this.auxRoutes.set(path, recognizer);
              return recognizer.terminal;
            }
            if (config instanceof Redirect) {
              this.redirects.push(new Redirector(config.path, config.redirectTo));
              return true;
            }
            if (config instanceof Route) {
              handler = new SyncRouteHandler(config.component, config.data);
            } else if (config instanceof AsyncRoute) {
              handler = new AsyncRouteHandler(config.loader, config.data);
            }
            var recognizer = new PathRecognizer(config.path, handler);
            this.matchers.forEach((function(matcher) {
              if (recognizer.hash == matcher.hash) {
                throw new BaseException(("Configuration '" + config.path + "' conflicts with existing route '" + matcher.path + "'"));
              }
            }));
            this.matchers.push(recognizer);
            if (isPresent(config.as)) {
              this.names.set(config.as, recognizer);
            }
            return recognizer.terminal;
          },
          recognize: function(urlParse) {
            var solutions = [];
            urlParse = this._redirect(urlParse);
            this.matchers.forEach((function(pathRecognizer) {
              var pathMatch = pathRecognizer.recognize(urlParse);
              if (isPresent(pathMatch)) {
                solutions.push(pathMatch);
              }
            }));
            return solutions;
          },
          _redirect: function(urlParse) {
            for (var i = 0; i < this.redirects.length; i += 1) {
              var redirector = this.redirects[i];
              var redirectedUrl = redirector.redirect(urlParse);
              if (isPresent(redirectedUrl)) {
                return redirectedUrl;
              }
            }
            return urlParse;
          },
          recognizeAuxiliary: function(urlParse) {
            var pathRecognizer = this.auxRoutes.get(urlParse.path);
            if (isBlank(pathRecognizer)) {
              return null;
            }
            return pathRecognizer.recognize(urlParse);
          },
          hasRoute: function(name) {
            return this.names.has(name);
          },
          generate: function(name, params) {
            var pathRecognizer = this.names.get(name);
            if (isBlank(pathRecognizer)) {
              return null;
            }
            return pathRecognizer.generate(params);
          }
        }, {});
      }());
      $__export("RouteRecognizer", RouteRecognizer);
      Redirector = (function() {
        function Redirector(path, redirectTo) {
          this.segments = [];
          this.toSegments = [];
          if (path.startsWith('/')) {
            path = path.substring(1);
          }
          this.segments = path.split('/');
          if (redirectTo.startsWith('/')) {
            redirectTo = redirectTo.substring(1);
          }
          this.toSegments = redirectTo.split('/');
        }
        return ($traceurRuntime.createClass)(Redirector, {redirect: function(urlParse) {
            for (var i = 0; i < this.segments.length; i += 1) {
              if (isBlank(urlParse)) {
                return null;
              }
              var segment = this.segments[i];
              if (segment != urlParse.path) {
                return null;
              }
              urlParse = urlParse.child;
            }
            for (var i = this.toSegments.length - 1; i >= 0; i -= 1) {
              var segment$__1 = this.toSegments[i];
              urlParse = new Url(segment$__1, urlParse);
            }
            return urlParse;
          }}, {});
      }());
      $__export("Redirector", Redirector);
    }
  };
});

System.register("angular2/src/router/router", ["angular2/src/core/facade/async", "angular2/src/core/facade/collection", "angular2/src/core/facade/lang", "angular2/src/router/instruction", "angular2/src/router/route_lifecycle_reflector"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/router";
  var PromiseWrapper,
      EventEmitter,
      ObservableWrapper,
      Map,
      StringMapWrapper,
      MapWrapper,
      ListWrapper,
      isBlank,
      isString,
      StringWrapper,
      isPresent,
      BaseException,
      stringifyInstruction,
      getCanActivateHook,
      _resolveToTrue,
      _resolveToFalse,
      Router,
      RootRouter,
      ChildRouter,
      SLASH;
  function splitAndFlattenLinkParams(linkParams) {
    return ListWrapper.reduce(linkParams, (function(accumulation, item) {
      if (isString(item)) {
        return accumulation.concat(StringWrapper.split(item, SLASH));
      }
      accumulation.push(item);
      return accumulation;
    }), []);
  }
  function canActivateOne(nextInstruction, prevInstruction) {
    var next = _resolveToTrue;
    if (isPresent(nextInstruction.child)) {
      next = canActivateOne(nextInstruction.child, isPresent(prevInstruction) ? prevInstruction.child : null);
    }
    return next.then((function(result) {
      if (result == false) {
        return false;
      }
      if (nextInstruction.component.reuse) {
        return true;
      }
      var hook = getCanActivateHook(nextInstruction.component.componentType);
      if (isPresent(hook)) {
        return hook(nextInstruction.component, isPresent(prevInstruction) ? prevInstruction.component : null);
      }
      return true;
    }));
  }
  return {
    setters: [function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
      EventEmitter = $__m.EventEmitter;
      ObservableWrapper = $__m.ObservableWrapper;
    }, function($__m) {
      Map = $__m.Map;
      StringMapWrapper = $__m.StringMapWrapper;
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isString = $__m.isString;
      StringWrapper = $__m.StringWrapper;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
    }, function($__m) {
      stringifyInstruction = $__m.stringifyInstruction;
    }, function($__m) {
      getCanActivateHook = $__m.getCanActivateHook;
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
          this._currentInstruction = null;
          this._currentNavigation = _resolveToTrue;
          this._outlet = null;
          this._auxRouters = new Map();
          this._subject = new EventEmitter();
        }
        return ($traceurRuntime.createClass)(Router, {
          childRouter: function(hostComponent) {
            return this._childRouter = new ChildRouter(this, hostComponent);
          },
          auxRouter: function(hostComponent) {
            return new ChildRouter(this, hostComponent);
          },
          registerPrimaryOutlet: function(outlet) {
            if (isPresent(outlet.name)) {
              throw new BaseException("registerAuxOutlet expects to be called with an unnamed outlet.");
            }
            this._outlet = outlet;
            if (isPresent(this._currentInstruction)) {
              return this.commit(this._currentInstruction, false);
            }
            return _resolveToTrue;
          },
          registerAuxOutlet: function(outlet) {
            var outletName = outlet.name;
            if (isBlank(outletName)) {
              throw new BaseException("registerAuxOutlet expects to be called with an outlet with a name.");
            }
            var router = this.auxRouter(this.hostComponent);
            this._auxRouters.set(outletName, router);
            router._outlet = outlet;
            var auxInstruction;
            if (isPresent(this._currentInstruction) && isPresent(auxInstruction = this._currentInstruction.auxInstruction[outletName])) {
              return router.commit(auxInstruction);
            }
            return _resolveToTrue;
          },
          isRouteActive: function(instruction) {
            var router = this;
            while (isPresent(router.parent) && isPresent(instruction.child)) {
              router = router.parent;
              instruction = instruction.child;
            }
            return isPresent(this._currentInstruction) && this._currentInstruction.component == instruction.component;
          },
          config: function(definitions) {
            var $__0 = this;
            definitions.forEach((function(routeDefinition) {
              $__0.registry.config($__0.hostComponent, routeDefinition);
            }));
            return this.renavigate();
          },
          navigate: function(url) {
            var _skipLocationChange = arguments[1] !== (void 0) ? arguments[1] : false;
            var $__0 = this;
            return this._currentNavigation = this._currentNavigation.then((function(_) {
              $__0.lastNavigationAttempt = url;
              $__0._startNavigating();
              return $__0._afterPromiseFinishNavigating($__0.recognize(url).then((function(instruction) {
                if (isBlank(instruction)) {
                  return false;
                }
                return $__0._navigate(instruction, _skipLocationChange);
              })));
            }));
          },
          navigateInstruction: function(instruction) {
            var _skipLocationChange = arguments[1] !== (void 0) ? arguments[1] : false;
            var $__0 = this;
            if (isBlank(instruction)) {
              return _resolveToFalse;
            }
            return this._currentNavigation = this._currentNavigation.then((function(_) {
              $__0._startNavigating();
              return $__0._afterPromiseFinishNavigating($__0._navigate(instruction, _skipLocationChange));
            }));
          },
          _navigate: function(instruction, _skipLocationChange) {
            var $__0 = this;
            return this._settleInstruction(instruction).then((function(_) {
              return $__0._canReuse(instruction);
            })).then((function(_) {
              return $__0._canActivate(instruction);
            })).then((function(result) {
              if (!result) {
                return false;
              }
              return $__0._canDeactivate(instruction).then((function(result) {
                if (result) {
                  return $__0.commit(instruction, _skipLocationChange).then((function(_) {
                    $__0._emitNavigationFinish(stringifyInstruction(instruction));
                    return true;
                  }));
                }
              }));
            }));
          },
          _settleInstruction: function(instruction) {
            var $__0 = this;
            var unsettledInstructions = [];
            if (isBlank(instruction.component.componentType)) {
              unsettledInstructions.push(instruction.component.resolveComponentType());
            }
            if (isPresent(instruction.child)) {
              unsettledInstructions.push(this._settleInstruction(instruction.child));
            }
            StringMapWrapper.forEach(instruction.auxInstruction, (function(instruction, _) {
              unsettledInstructions.push($__0._settleInstruction(instruction));
            }));
            return PromiseWrapper.all(unsettledInstructions);
          },
          _emitNavigationFinish: function(url) {
            ObservableWrapper.callNext(this._subject, url);
          },
          _afterPromiseFinishNavigating: function(promise) {
            var $__0 = this;
            return PromiseWrapper.catchError(promise.then((function(_) {
              return $__0._finishNavigating();
            })), (function(err) {
              $__0._finishNavigating();
              throw err;
            }));
          },
          _canReuse: function(instruction) {
            var $__0 = this;
            if (isBlank(this._outlet)) {
              return _resolveToFalse;
            }
            return this._outlet.canReuse(instruction.component).then((function(result) {
              instruction.component.reuse = result;
              if (isPresent($__0._childRouter) && isPresent(instruction.child)) {
                return $__0._childRouter._canReuse(instruction.child);
              }
            }));
          },
          _canActivate: function(nextInstruction) {
            return canActivateOne(nextInstruction, this._currentInstruction);
          },
          _canDeactivate: function(instruction) {
            var $__0 = this;
            if (isBlank(this._outlet)) {
              return _resolveToTrue;
            }
            var next;
            var childInstruction = null;
            var reuse = false;
            var componentInstruction = null;
            if (isPresent(instruction)) {
              childInstruction = instruction.child;
              componentInstruction = instruction.component;
              reuse = instruction.component.reuse;
            }
            if (reuse) {
              next = _resolveToTrue;
            } else {
              next = this._outlet.canDeactivate(componentInstruction);
            }
            return next.then((function(result) {
              if (result == false) {
                return false;
              }
              if (isPresent($__0._childRouter)) {
                return $__0._childRouter._canDeactivate(childInstruction);
              }
              return true;
            }));
          },
          commit: function(instruction) {
            var _skipLocationChange = arguments[1] !== (void 0) ? arguments[1] : false;
            var $__0 = this;
            this._currentInstruction = instruction;
            var next = _resolveToTrue;
            if (isPresent(this._outlet)) {
              var componentInstruction = instruction.component;
              if (componentInstruction.reuse) {
                next = this._outlet.reuse(componentInstruction);
              } else {
                next = this.deactivate(instruction).then((function(_) {
                  return $__0._outlet.activate(componentInstruction);
                }));
              }
              if (isPresent(instruction.child)) {
                next = next.then((function(_) {
                  if (isPresent($__0._childRouter)) {
                    return $__0._childRouter.commit(instruction.child);
                  }
                }));
              }
            }
            var promises = [];
            MapWrapper.forEach(this._auxRouters, (function(router, name) {
              promises.push(router.commit(instruction.auxInstruction[name]));
            }));
            return next.then((function(_) {
              return PromiseWrapper.all(promises);
            }));
          },
          _startNavigating: function() {
            this.navigating = true;
          },
          _finishNavigating: function() {
            this.navigating = false;
          },
          subscribe: function(onNext) {
            return ObservableWrapper.subscribe(this._subject, onNext);
          },
          deactivate: function(instruction) {
            var $__0 = this;
            var childInstruction = null;
            var componentInstruction = null;
            if (isPresent(instruction)) {
              childInstruction = instruction.child;
              componentInstruction = instruction.component;
            }
            var next = _resolveToTrue;
            if (isPresent(this._childRouter)) {
              next = this._childRouter.deactivate(childInstruction);
            }
            if (isPresent(this._outlet)) {
              next = next.then((function(_) {
                return $__0._outlet.deactivate(componentInstruction);
              }));
            }
            return next;
          },
          recognize: function(url) {
            return this.registry.recognize(url, this.hostComponent);
          },
          renavigate: function() {
            if (isBlank(this.lastNavigationAttempt)) {
              return this._currentNavigation;
            }
            return this.navigate(this.lastNavigationAttempt);
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
            var url = [];
            var parent = router.parent;
            while (isPresent(parent)) {
              url.unshift(parent._currentInstruction);
              parent = parent.parent;
            }
            var nextInstruction = this.registry.generate(rest, router.hostComponent);
            while (url.length > 0) {
              nextInstruction = url.pop().replaceChild(nextInstruction);
            }
            return nextInstruction;
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
            return $__0.navigate(change['url'], isPresent(change['pop']));
          }));
          this.registry.configFromComponent(hostComponent);
          this.navigate(location.path());
        }
        return ($traceurRuntime.createClass)(RootRouter, {commit: function(instruction) {
            var _skipLocationChange = arguments[1] !== (void 0) ? arguments[1] : false;
            var $__0 = this;
            var emitUrl = stringifyInstruction(instruction);
            if (emitUrl.length > 0) {
              emitUrl = '/' + emitUrl;
            }
            var promise = $traceurRuntime.superGet(this, RootRouter.prototype, "commit").call(this, instruction);
            if (!_skipLocationChange) {
              promise = promise.then((function(_) {
                $__0._location.go(emitUrl);
              }));
            }
            return promise;
          }}, {}, $__super);
      }(Router));
      $__export("RootRouter", RootRouter);
      ChildRouter = (function($__super) {
        function ChildRouter(parent, hostComponent) {
          $traceurRuntime.superConstructor(ChildRouter).call(this, parent.registry, parent._pipeline, parent, hostComponent);
          this.parent = parent;
        }
        return ($traceurRuntime.createClass)(ChildRouter, {
          navigate: function(url) {
            var _skipLocationChange = arguments[1] !== (void 0) ? arguments[1] : false;
            return this.parent.navigate(url, _skipLocationChange);
          },
          navigateInstruction: function(instruction) {
            var _skipLocationChange = arguments[1] !== (void 0) ? arguments[1] : false;
            return this.parent.navigateInstruction(instruction, _skipLocationChange);
          }
        }, {}, $__super);
      }(Router));
      SLASH = new RegExp('/');
    }
  };
});

System.register("angular2/src/router/route_registry", ["angular2/src/router/route_recognizer", "angular2/src/router/instruction", "angular2/src/core/facade/collection", "angular2/src/core/facade/async", "angular2/src/core/facade/lang", "angular2/src/router/route_config_impl", "angular2/src/core/reflection/reflection", "angular2/di", "angular2/src/router/route_config_nomalizer", "angular2/src/router/url_parser"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/route_registry";
  var __decorate,
      __metadata,
      RouteRecognizer,
      Instruction,
      PrimaryInstruction,
      ListWrapper,
      Map,
      PromiseWrapper,
      isPresent,
      isBlank,
      isType,
      isString,
      isStringMap,
      BaseException,
      getTypeNameForDebugging,
      RouteConfig,
      Route,
      AuxRoute,
      reflector,
      Injectable,
      normalizeRouteConfig,
      parser,
      pathSegmentsToUrl,
      _resolveToNull,
      RouteRegistry;
  function mostSpecific(instructions) {
    return ListWrapper.maximum(instructions, (function(instruction) {
      return instruction.component.specificity;
    }));
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
  function assertComponentExists(component, path) {
    if (!isType(component)) {
      throw new BaseException(("Component for route \"" + path + "\" is not defined, or is not a class."));
    }
  }
  return {
    setters: [function($__m) {
      RouteRecognizer = $__m.RouteRecognizer;
    }, function($__m) {
      Instruction = $__m.Instruction;
      PrimaryInstruction = $__m.PrimaryInstruction;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      Map = $__m.Map;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      isType = $__m.isType;
      isString = $__m.isString;
      isStringMap = $__m.isStringMap;
      BaseException = $__m.BaseException;
      getTypeNameForDebugging = $__m.getTypeNameForDebugging;
    }, function($__m) {
      RouteConfig = $__m.RouteConfig;
      Route = $__m.Route;
      AuxRoute = $__m.AuxRoute;
    }, function($__m) {
      reflector = $__m.reflector;
    }, function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      normalizeRouteConfig = $__m.normalizeRouteConfig;
    }, function($__m) {
      parser = $__m.parser;
      pathSegmentsToUrl = $__m.pathSegmentsToUrl;
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
      _resolveToNull = PromiseWrapper.resolve(null);
      RouteRegistry = (($traceurRuntime.createClass)(function() {
        this._rules = new Map();
      }, {
        config: function(parentComponent, config) {
          config = normalizeRouteConfig(config);
          if (config instanceof Route) {
            assertComponentExists(config.component, config.path);
          } else if (config instanceof AuxRoute) {
            assertComponentExists(config.component, config.path);
          }
          var recognizer = this._rules.get(parentComponent);
          if (isBlank(recognizer)) {
            recognizer = new RouteRecognizer();
            this._rules.set(parentComponent, recognizer);
          }
          var terminal = recognizer.config(config);
          if (config instanceof Route) {
            if (terminal) {
              assertTerminalComponent(config.component, config.path);
            } else {
              this.configFromComponent(config.component);
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
          var parsedUrl = parser.parse(url);
          return this._recognize(parsedUrl, parentComponent);
        },
        _recognize: function(parsedUrl, parentComponent) {
          var $__0 = this;
          return this._recognizePrimaryRoute(parsedUrl, parentComponent).then((function(instruction) {
            return $__0._completeAuxiliaryRouteMatches(instruction, parentComponent);
          }));
        },
        _recognizePrimaryRoute: function(parsedUrl, parentComponent) {
          var $__0 = this;
          var componentRecognizer = this._rules.get(parentComponent);
          if (isBlank(componentRecognizer)) {
            return PromiseWrapper.resolve(null);
          }
          var possibleMatches = componentRecognizer.recognize(parsedUrl);
          var matchPromises = ListWrapper.map(possibleMatches, (function(candidate) {
            return $__0._completePrimaryRouteMatch(candidate);
          }));
          return PromiseWrapper.all(matchPromises).then(mostSpecific);
        },
        _completePrimaryRouteMatch: function(partialMatch) {
          var $__0 = this;
          var instruction = partialMatch.instruction;
          return instruction.resolveComponentType().then((function(componentType) {
            $__0.configFromComponent(componentType);
            if (isBlank(partialMatch.remaining)) {
              if (instruction.terminal) {
                return new PrimaryInstruction(instruction, null, partialMatch.remainingAux);
              } else {
                return null;
              }
            }
            return $__0._recognizePrimaryRoute(partialMatch.remaining, componentType).then((function(childInstruction) {
              if (isBlank(childInstruction)) {
                return null;
              } else {
                return new PrimaryInstruction(instruction, childInstruction, partialMatch.remainingAux);
              }
            }));
          }));
        },
        _completeAuxiliaryRouteMatches: function(instruction, parentComponent) {
          var $__0 = this;
          if (isBlank(instruction)) {
            return _resolveToNull;
          }
          var componentRecognizer = this._rules.get(parentComponent);
          var auxInstructions = {};
          var promises = instruction.auxUrls.map((function(auxSegment) {
            var match = componentRecognizer.recognizeAuxiliary(auxSegment);
            if (isBlank(match)) {
              return _resolveToNull;
            }
            return $__0._completePrimaryRouteMatch(match).then((function(auxInstruction) {
              if (isPresent(auxInstruction)) {
                return $__0._completeAuxiliaryRouteMatches(auxInstruction, parentComponent).then((function(finishedAuxRoute) {
                  auxInstructions[auxSegment.path] = finishedAuxRoute;
                }));
              }
            }));
          }));
          return PromiseWrapper.all(promises).then((function(_) {
            if (isBlank(instruction.child)) {
              return new Instruction(instruction.component, null, auxInstructions);
            }
            return $__0._completeAuxiliaryRouteMatches(instruction.child, instruction.component.componentType).then((function(completeChild) {
              return new Instruction(instruction.component, completeChild, auxInstructions);
            }));
          }));
        },
        generate: function(linkParams, parentComponent) {
          var segments = [];
          var componentCursor = parentComponent;
          for (var i = 0; i < linkParams.length; i += 1) {
            var segment = linkParams[i];
            if (isBlank(componentCursor)) {
              throw new BaseException(("Could not find route named \"" + segment + "\"."));
            }
            if (!isString(segment)) {
              throw new BaseException(("Unexpected segment \"" + segment + "\" in link DSL. Expected a string."));
            } else if (segment == '' || segment == '.' || segment == '..') {
              throw new BaseException(("\"" + segment + "/\" is only allowed at the beginning of a link DSL."));
            }
            var params = {};
            if (i + 1 < linkParams.length) {
              var nextSegment = linkParams[i + 1];
              if (isStringMap(nextSegment)) {
                params = nextSegment;
                i += 1;
              }
            }
            var componentRecognizer = this._rules.get(componentCursor);
            if (isBlank(componentRecognizer)) {
              throw new BaseException(("Component \"" + getTypeNameForDebugging(componentCursor) + "\" has no route config."));
            }
            var response = componentRecognizer.generate(segment, params);
            if (isBlank(response)) {
              throw new BaseException(("Component \"" + getTypeNameForDebugging(componentCursor) + "\" has no route named \"" + segment + "\"."));
            }
            segments.push(response);
            componentCursor = response.componentType;
          }
          var instruction = this._generateRedirects(componentCursor);
          while (segments.length > 0) {
            instruction = new Instruction(segments.pop(), instruction, {});
          }
          return instruction;
        },
        _generateRedirects: function(componentCursor) {
          if (isBlank(componentCursor)) {
            return null;
          }
          var componentRecognizer = this._rules.get(componentCursor);
          if (isBlank(componentRecognizer)) {
            return null;
          }
          for (var i = 0; i < componentRecognizer.redirects.length; i += 1) {
            var redirect = componentRecognizer.redirects[i];
            if (redirect.segments.length == 1 && redirect.segments[0] == '') {
              var toSegments = pathSegmentsToUrl(redirect.toSegments);
              var matches = componentRecognizer.recognize(toSegments);
              var primaryInstruction = ListWrapper.maximum(matches, (function(match) {
                return match.instruction.specificity;
              }));
              if (isPresent(primaryInstruction)) {
                var child = this._generateRedirects(primaryInstruction.instruction.componentType);
                return new Instruction(primaryInstruction.instruction, child, {});
              }
              return null;
            }
          }
          return null;
        }
      }, {}));
      $__export("RouteRegistry", RouteRegistry);
      $__export("RouteRegistry", RouteRegistry = __decorate([Injectable(), __metadata('design:paramtypes', [])], RouteRegistry));
    }
  };
});

System.register("angular2/src/router/router_outlet", ["angular2/src/core/facade/async", "angular2/src/core/facade/collection", "angular2/src/core/facade/lang", "angular2/src/core/metadata", "angular2/core", "angular2/di", "angular2/src/router/router", "angular2/src/router/instruction", "angular2/src/router/route_data", "angular2/src/router/lifecycle_annotations", "angular2/src/router/route_lifecycle_reflector"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/router/router_outlet";
  var __decorate,
      __metadata,
      __param,
      PromiseWrapper,
      StringMapWrapper,
      isBlank,
      isPresent,
      BaseException,
      Directive,
      Attribute,
      DynamicComponentLoader,
      ElementRef,
      Injector,
      bind,
      routerMod,
      RouteParams,
      ROUTE_DATA,
      hookMod,
      hasLifecycleHook,
      _resolveToTrue,
      RouterOutlet;
  return {
    setters: [function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
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
    }, function($__m) {
      ROUTE_DATA = $__m.ROUTE_DATA;
    }, function($__m) {
      hookMod = $__m;
    }, function($__m) {
      hasLifecycleHook = $__m.hasLifecycleHook;
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
      _resolveToTrue = PromiseWrapper.resolve(true);
      RouterOutlet = (($traceurRuntime.createClass)(function(_elementRef, _loader, _parentRouter, nameAttr) {
        this._elementRef = _elementRef;
        this._loader = _loader;
        this._parentRouter = _parentRouter;
        this.name = null;
        this._componentRef = null;
        this._currentInstruction = null;
        if (isPresent(nameAttr)) {
          this.name = nameAttr;
          this._parentRouter.registerAuxOutlet(this);
        } else {
          this._parentRouter.registerPrimaryOutlet(this);
        }
      }, {
        activate: function(nextInstruction) {
          var $__0 = this;
          var previousInstruction = this._currentInstruction;
          this._currentInstruction = nextInstruction;
          var componentType = nextInstruction.componentType;
          var childRouter = this._parentRouter.childRouter(componentType);
          var bindings = Injector.resolve([bind(ROUTE_DATA).toValue(nextInstruction.routeData()), bind(RouteParams).toValue(new RouteParams(nextInstruction.params)), bind(routerMod.Router).toValue(childRouter)]);
          return this._loader.loadNextToLocation(componentType, this._elementRef, bindings).then((function(componentRef) {
            $__0._componentRef = componentRef;
            if (hasLifecycleHook(hookMod.onActivate, componentType)) {
              return $__0._componentRef.instance.onActivate(nextInstruction, previousInstruction);
            }
          }));
        },
        reuse: function(nextInstruction) {
          var previousInstruction = this._currentInstruction;
          this._currentInstruction = nextInstruction;
          if (isBlank(this._componentRef)) {
            throw new BaseException("Cannot reuse an outlet that does not contain a component.");
          }
          return PromiseWrapper.resolve(hasLifecycleHook(hookMod.onReuse, this._currentInstruction.componentType) ? this._componentRef.instance.onReuse(nextInstruction, previousInstruction) : true);
        },
        deactivate: function(nextInstruction) {
          var $__0 = this;
          var next = _resolveToTrue;
          if (isPresent(this._componentRef) && isPresent(this._currentInstruction) && hasLifecycleHook(hookMod.onDeactivate, this._currentInstruction.componentType)) {
            next = PromiseWrapper.resolve(this._componentRef.instance.onDeactivate(nextInstruction, this._currentInstruction));
          }
          return next.then((function(_) {
            if (isPresent($__0._componentRef)) {
              $__0._componentRef.dispose();
              $__0._componentRef = null;
            }
          }));
        },
        canDeactivate: function(nextInstruction) {
          if (isBlank(this._currentInstruction)) {
            return _resolveToTrue;
          }
          if (hasLifecycleHook(hookMod.canDeactivate, this._currentInstruction.componentType)) {
            return PromiseWrapper.resolve(this._componentRef.instance.canDeactivate(nextInstruction, this._currentInstruction));
          }
          return _resolveToTrue;
        },
        canReuse: function(nextInstruction) {
          var result;
          if (isBlank(this._currentInstruction) || this._currentInstruction.componentType != nextInstruction.componentType) {
            result = false;
          } else if (hasLifecycleHook(hookMod.canReuse, this._currentInstruction.componentType)) {
            result = this._componentRef.instance.canReuse(nextInstruction, this._currentInstruction);
          } else {
            result = nextInstruction == this._currentInstruction || (isPresent(nextInstruction.params) && isPresent(this._currentInstruction.params) && StringMapWrapper.equals(nextInstruction.params, this._currentInstruction.params));
          }
          return PromiseWrapper.resolve(result);
        }
      }, {}));
      $__export("RouterOutlet", RouterOutlet);
      $__export("RouterOutlet", RouterOutlet = __decorate([Directive({selector: 'router-outlet'}), __param(3, Attribute('name')), __metadata('design:paramtypes', [ElementRef, DynamicComponentLoader, routerMod.Router, String])], RouterOutlet));
    }
  };
});

System.register("angular2/router", ["angular2/src/router/router", "angular2/src/router/router_outlet", "angular2/src/router/router_link", "angular2/src/router/instruction", "angular2/src/router/route_registry", "angular2/src/router/location_strategy", "angular2/src/router/hash_location_strategy", "angular2/src/router/path_location_strategy", "angular2/src/router/location", "angular2/src/router/pipeline", "angular2/src/router/route_config_decorator", "angular2/src/router/route_definition", "angular2/src/router/lifecycle_annotations", "angular2/src/router/url_parser", "angular2/angular2", "angular2/src/router/route_data", "angular2/src/core/application_tokens", "angular2/di", "angular2/src/core/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/router";
  var LocationStrategy,
      PathLocationStrategy,
      Router,
      RootRouter,
      RouterOutlet,
      RouterLink,
      RouteRegistry,
      Pipeline,
      Location,
      APP_COMPONENT,
      Binding,
      CONST_EXPR,
      ROUTER_DIRECTIVES,
      ROUTER_BINDINGS;
  function routerFactory(registry, pipeline, location, appRoot) {
    return new RootRouter(registry, pipeline, location, appRoot);
  }
  var $__exportNames = {
    ROUTER_DIRECTIVES: true,
    ROUTER_BINDINGS: true,
    undefined: true
  };
  var $__exportNames = {
    ROUTER_DIRECTIVES: true,
    ROUTER_BINDINGS: true,
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
      $__export("Instruction", $__m.Instruction);
      $__export("ComponentInstruction", $__m.ComponentInstruction);
    }, function($__m) {
      RouteRegistry = $__m.RouteRegistry;
      $__export("RouteRegistry", $__m.RouteRegistry);
    }, function($__m) {
      LocationStrategy = $__m.LocationStrategy;
      $__export("LocationStrategy", $__m.LocationStrategy);
    }, function($__m) {
      $__export("HashLocationStrategy", $__m.HashLocationStrategy);
    }, function($__m) {
      PathLocationStrategy = $__m.PathLocationStrategy;
      $__export("PathLocationStrategy", $__m.PathLocationStrategy);
    }, function($__m) {
      Location = $__m.Location;
      $__export("Location", $__m.Location);
      $__export("APP_BASE_HREF", $__m.APP_BASE_HREF);
    }, function($__m) {
      Pipeline = $__m.Pipeline;
      $__export("Pipeline", $__m.Pipeline);
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
      $__export("CanActivate", $__m.CanActivate);
    }, function($__m) {
      $__export("Url", $__m.Url);
    }, function($__m) {
      $__export("OpaqueToken", $__m.OpaqueToken);
    }, function($__m) {
      $__export("ROUTE_DATA", $__m.ROUTE_DATA);
    }, function($__m) {
      APP_COMPONENT = $__m.APP_COMPONENT;
    }, function($__m) {
      Binding = $__m.Binding;
    }, function($__m) {
      CONST_EXPR = $__m.CONST_EXPR;
    }],
    execute: function() {
      ROUTER_DIRECTIVES = CONST_EXPR([RouterOutlet, RouterLink]);
      $__export("ROUTER_DIRECTIVES", ROUTER_DIRECTIVES);
      ROUTER_BINDINGS = CONST_EXPR([RouteRegistry, Pipeline, CONST_EXPR(new Binding(LocationStrategy, {toClass: PathLocationStrategy})), Location, CONST_EXPR(new Binding(Router, {
        toFactory: routerFactory,
        deps: CONST_EXPR([RouteRegistry, Pipeline, Location, APP_COMPONENT])
      }))]);
      $__export("ROUTER_BINDINGS", ROUTER_BINDINGS);
    }
  };
});

//# sourceMappingURL=router.dev.js.map