"format register";
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

System.register("angular2/src/render/xhr_mock", ["angular2/src/render/xhr", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/facade/async"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/render/xhr_mock";
  var XHR,
      ListWrapper,
      Map,
      isBlank,
      normalizeBlank,
      BaseException,
      PromiseWrapper,
      MockXHR,
      _PendingRequest,
      _Expectation;
  return {
    setters: [function($__m) {
      XHR = $__m.XHR;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      Map = $__m.Map;
    }, function($__m) {
      isBlank = $__m.isBlank;
      normalizeBlank = $__m.normalizeBlank;
      BaseException = $__m.BaseException;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }],
    execute: function() {
      MockXHR = (function($__super) {
        function MockXHR() {
          $traceurRuntime.superConstructor(MockXHR).call(this);
          this._expectations = [];
          this._definitions = new Map();
          this._requests = [];
        }
        return ($traceurRuntime.createClass)(MockXHR, {
          get: function(url) {
            var request = new _PendingRequest(url);
            this._requests.push(request);
            return request.getPromise();
          },
          expect: function(url, response) {
            var expectation = new _Expectation(url, response);
            this._expectations.push(expectation);
          },
          when: function(url, response) {
            this._definitions.set(url, response);
          },
          flush: function() {
            if (this._requests.length === 0) {
              throw new BaseException('No pending requests to flush');
            }
            do {
              var request = ListWrapper.removeAt(this._requests, 0);
              this._processRequest(request);
            } while (this._requests.length > 0);
            this.verifyNoOustandingExpectations();
          },
          verifyNoOustandingExpectations: function() {
            if (this._expectations.length === 0)
              return ;
            var urls = [];
            for (var i = 0; i < this._expectations.length; i++) {
              var expectation = this._expectations[i];
              urls.push(expectation.url);
            }
            throw new BaseException(("Unsatisfied requests: " + ListWrapper.join(urls, ', ')));
          },
          _processRequest: function(request) {
            var url = request.url;
            if (this._expectations.length > 0) {
              var expectation = this._expectations[0];
              if (expectation.url == url) {
                ListWrapper.remove(this._expectations, expectation);
                request.complete(expectation.response);
                return ;
              }
            }
            if (this._definitions.has(url)) {
              var response = this._definitions.get(url);
              request.complete(normalizeBlank(response));
              return ;
            }
            throw new BaseException(("Unexpected request " + url));
          }
        }, {}, $__super);
      }(XHR));
      $__export("MockXHR", MockXHR);
      _PendingRequest = (function() {
        function _PendingRequest(url) {
          this.url = url;
          this.completer = PromiseWrapper.completer();
        }
        return ($traceurRuntime.createClass)(_PendingRequest, {
          complete: function(response) {
            if (isBlank(response)) {
              this.completer.reject(("Failed to load " + this.url), null);
            } else {
              this.completer.resolve(response);
            }
          },
          getPromise: function() {
            return this.completer.promise;
          }
        }, {});
      }());
      _Expectation = (function() {
        function _Expectation(url, response) {
          this.url = url;
          this.response = response;
        }
        return ($traceurRuntime.createClass)(_Expectation, {}, {});
      }());
    }
  };
});

System.register("angular2/src/mock/mock_location_strategy", ["angular2/src/facade/async", "angular2/src/router/location_strategy"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/mock/mock_location_strategy";
  var EventEmitter,
      ObservableWrapper,
      LocationStrategy,
      MockLocationStrategy;
  return {
    setters: [function($__m) {
      EventEmitter = $__m.EventEmitter;
      ObservableWrapper = $__m.ObservableWrapper;
    }, function($__m) {
      LocationStrategy = $__m.LocationStrategy;
    }],
    execute: function() {
      MockLocationStrategy = (function($__super) {
        function MockLocationStrategy() {
          $traceurRuntime.superConstructor(MockLocationStrategy).call(this);
          this.internalBaseHref = '/';
          this.internalPath = '/';
          this.internalTitle = '';
          this.urlChanges = [];
          this._subject = new EventEmitter();
        }
        return ($traceurRuntime.createClass)(MockLocationStrategy, {
          simulatePopState: function(url) {
            this.internalPath = url;
            ObservableWrapper.callNext(this._subject, null);
          },
          path: function() {
            return this.internalPath;
          },
          simulateUrlPop: function(pathname) {
            ObservableWrapper.callNext(this._subject, {'url': pathname});
          },
          pushState: function(ctx, title, url) {
            this.internalTitle = title;
            this.internalPath = url;
            this.urlChanges.push(url);
          },
          onPopState: function(fn) {
            ObservableWrapper.subscribe(this._subject, fn);
          },
          getBaseHref: function() {
            return this.internalBaseHref;
          }
        }, {}, $__super);
      }(LocationStrategy));
      $__export("MockLocationStrategy", MockLocationStrategy);
    }
  };
});

System.register("angular2/src/mock/view_resolver_mock", ["angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/core/annotations_impl/view", "angular2/src/core/compiler/view_resolver"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/mock/view_resolver_mock";
  var Map,
      MapWrapper,
      ListWrapper,
      isPresent,
      BaseException,
      stringify,
      isBlank,
      View,
      ViewResolver,
      MockViewResolver;
  return {
    setters: [function($__m) {
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
      stringify = $__m.stringify;
      isBlank = $__m.isBlank;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      ViewResolver = $__m.ViewResolver;
    }],
    execute: function() {
      MockViewResolver = (function($__super) {
        function MockViewResolver() {
          $traceurRuntime.superConstructor(MockViewResolver).call(this);
          this._views = new Map();
          this._inlineTemplates = new Map();
          this._viewCache = new Map();
          this._directiveOverrides = new Map();
        }
        return ($traceurRuntime.createClass)(MockViewResolver, {
          setView: function(component, view) {
            this._checkOverrideable(component);
            this._views.set(component, view);
          },
          setInlineTemplate: function(component, template) {
            this._checkOverrideable(component);
            this._inlineTemplates.set(component, template);
          },
          overrideViewDirective: function(component, from, to) {
            this._checkOverrideable(component);
            var overrides = this._directiveOverrides.get(component);
            if (isBlank(overrides)) {
              overrides = new Map();
              this._directiveOverrides.set(component, overrides);
            }
            overrides.set(from, to);
          },
          resolve: function(component) {
            var view = this._viewCache.get(component);
            if (isPresent(view))
              return view;
            view = this._views.get(component);
            if (isBlank(view)) {
              view = $traceurRuntime.superGet(this, MockViewResolver.prototype, "resolve").call(this, component);
            }
            var directives = view.directives;
            var overrides = this._directiveOverrides.get(component);
            if (isPresent(overrides) && isPresent(directives)) {
              directives = ListWrapper.clone(view.directives);
              MapWrapper.forEach(overrides, (function(to, from) {
                var srcIndex = directives.indexOf(from);
                if (srcIndex == -1) {
                  throw new BaseException(("Overriden directive " + stringify(from) + " not found in the template of " + stringify(component)));
                }
                directives[srcIndex] = to;
              }));
              view = new View({
                template: view.template,
                templateUrl: view.templateUrl,
                directives: directives
              });
            }
            var inlineTemplate = this._inlineTemplates.get(component);
            if (isPresent(inlineTemplate)) {
              view = new View({
                template: inlineTemplate,
                templateUrl: null,
                directives: view.directives
              });
            }
            this._viewCache.set(component, view);
            return view;
          },
          _checkOverrideable: function(component) {
            var cached = this._viewCache.get(component);
            if (isPresent(cached)) {
              throw new BaseException(("The component " + stringify(component) + " has already been compiled, its configuration can not be changed"));
            }
          }
        }, {}, $__super);
      }(ViewResolver));
      $__export("MockViewResolver", MockViewResolver);
    }
  };
});

System.register("angular2/mock", ["angular2/src/mock/mock_location_strategy", "angular2/src/router/location_strategy", "angular2/src/mock/view_resolver_mock", "angular2/src/render/xhr_mock"], function($__export) {
  "use strict";
  var __moduleName = "angular2/mock";
  var $__exportNames = {undefined: true};
  return {
    setters: [function($__m) {
      Object.keys($__m).forEach(function(p) {
        if (!$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }, function($__m) {
      $__export("LocationStrategy", $__m.LocationStrategy);
    }, function($__m) {
      $__export("MockViewResolver", $__m.MockViewResolver);
    }, function($__m) {
      $__export("MockXHR", $__m.MockXHR);
    }],
    execute: function() {}
  };
});

//# sourceMappingURL=mock.dev.js.map