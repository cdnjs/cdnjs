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
          },
          back: function() {
            if (this.urlChanges.length > 0) {
              this.urlChanges.pop();
              var nextUrl = this.urlChanges.length > 0 ? this.urlChanges[this.urlChanges.length - 1] : '';
              this.simulatePopState(nextUrl);
            }
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

System.register("angular2/src/mock/ng_zone_mock", ["angular2/src/core/zone/ng_zone"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/mock/ng_zone_mock";
  var NgZone,
      MockNgZone;
  return {
    setters: [function($__m) {
      NgZone = $__m.NgZone;
    }],
    execute: function() {
      MockNgZone = (function($__super) {
        function MockNgZone() {
          $traceurRuntime.superConstructor(MockNgZone).call(this, {enableLongStackTrace: false});
        }
        return ($traceurRuntime.createClass)(MockNgZone, {
          run: function(fn) {
            return fn();
          },
          runOutsideAngular: function(fn) {
            return fn();
          }
        }, {}, $__super);
      }(NgZone));
      $__export("MockNgZone", MockNgZone);
    }
  };
});

System.register("angular2/src/test_lib/utils", ["angular2/src/facade/collection", "angular2/src/dom/dom_adapter", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/test_lib/utils";
  var ListWrapper,
      MapWrapper,
      DOM,
      isString,
      RegExpWrapper,
      StringWrapper,
      Log,
      _RE_SPECIAL_CHARS,
      _ESCAPE_RE,
      _singleTagWhitelist;
  function dispatchEvent(element, eventType) {
    DOM.dispatchEvent(element, DOM.createEvent(eventType));
  }
  function el(html) {
    return DOM.firstChild(DOM.content(DOM.createTemplate(html)));
  }
  function containsRegexp(input) {
    return RegExpWrapper.create(StringWrapper.replaceAllMapped(input, _ESCAPE_RE, (function(match) {
      return ("\\" + match[0]);
    })));
  }
  function normalizeCSS(css) {
    css = StringWrapper.replaceAll(css, /\s+/g, ' ');
    css = StringWrapper.replaceAll(css, /:\s/g, ':');
    css = StringWrapper.replaceAll(css, /'/g, '"');
    css = StringWrapper.replaceAllMapped(css, /url\(\"(.+)\\"\)/g, (function(match) {
      return ("url(" + match[1] + ")");
    }));
    css = StringWrapper.replaceAllMapped(css, /\[(.+)=([^"\]]+)\]/g, (function(match) {
      return ("[" + match[1] + "=\"" + match[2] + "\"]");
    }));
    return css;
  }
  function stringifyElement(el) {
    var result = '';
    if (DOM.isElementNode(el)) {
      var tagName = StringWrapper.toLowerCase(DOM.tagName(el));
      result += ("<" + tagName);
      var attributeMap = DOM.attributeMap(el);
      var keys = [];
      MapWrapper.forEach(attributeMap, (function(v, k) {
        keys.push(k);
      }));
      ListWrapper.sort(keys);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var attValue = attributeMap.get(key);
        if (!isString(attValue)) {
          result += (" " + key);
        } else {
          result += (" " + key + "=\"" + attValue + "\"");
        }
      }
      result += '>';
      var children = DOM.childNodes(DOM.templateAwareRoot(el));
      for (var j = 0; j < children.length; j++) {
        result += stringifyElement(children[j]);
      }
      if (!ListWrapper.contains(_singleTagWhitelist, tagName)) {
        result += ("</" + tagName + ">");
      }
    } else if (DOM.isCommentNode(el)) {
      result += ("<!--" + DOM.nodeValue(el) + "-->");
    } else {
      result += DOM.getText(el);
    }
    return result;
  }
  $__export("dispatchEvent", dispatchEvent);
  $__export("el", el);
  $__export("containsRegexp", containsRegexp);
  $__export("normalizeCSS", normalizeCSS);
  $__export("stringifyElement", stringifyElement);
  return {
    setters: [function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      isString = $__m.isString;
      RegExpWrapper = $__m.RegExpWrapper;
      StringWrapper = $__m.StringWrapper;
    }],
    execute: function() {
      Log = (function() {
        function Log() {
          this._result = [];
        }
        return ($traceurRuntime.createClass)(Log, {
          add: function(value) {
            this._result.push(value);
          },
          fn: function(value) {
            var $__0 = this;
            return (function() {
              var a1 = arguments[0] !== (void 0) ? arguments[0] : null;
              var a2 = arguments[1] !== (void 0) ? arguments[1] : null;
              var a3 = arguments[2] !== (void 0) ? arguments[2] : null;
              var a4 = arguments[3] !== (void 0) ? arguments[3] : null;
              var a5 = arguments[4] !== (void 0) ? arguments[4] : null;
              $__0._result.push(value);
            });
          },
          result: function() {
            return ListWrapper.join(this._result, "; ");
          }
        }, {});
      }());
      $__export("Log", Log);
      _RE_SPECIAL_CHARS = ['-', '[', ']', '/', '{', '}', '\\', '(', ')', '*', '+', '?', '.', '^', '$', '|'];
      _ESCAPE_RE = RegExpWrapper.create(("[\\" + _RE_SPECIAL_CHARS.join('\\') + "]"));
      _singleTagWhitelist = ['br', 'hr', 'input'];
    }
  };
});

System.register("angular2/src/debug/debug_element", ["angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/dom/dom_adapter", "angular2/src/core/compiler/view_ref"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/debug/debug_element";
  var isPresent,
      ListWrapper,
      DOM,
      internalView,
      DebugElement,
      Scope,
      By;
  function inspectElement(elementRef) {
    return DebugElement.create(elementRef);
  }
  function asNativeElements(arr) {
    return arr.map((function(debugEl) {
      return debugEl.nativeElement;
    }));
  }
  $__export("inspectElement", inspectElement);
  $__export("asNativeElements", asNativeElements);
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      internalView = $__m.internalView;
    }],
    execute: function() {
      DebugElement = (function() {
        function DebugElement(_parentView, _boundElementIndex) {
          this._parentView = _parentView;
          this._boundElementIndex = _boundElementIndex;
          this._elementInjector = this._parentView.elementInjectors[this._boundElementIndex];
        }
        return ($traceurRuntime.createClass)(DebugElement, {
          get componentInstance() {
            if (!isPresent(this._elementInjector)) {
              return null;
            }
            return this._elementInjector.getComponent();
          },
          get nativeElement() {
            return this.elementRef.nativeElement;
          },
          get elementRef() {
            return this._parentView.elementRefs[this._boundElementIndex];
          },
          getDirectiveInstance: function(directiveIndex) {
            return this._elementInjector.getDirectiveAtIndex(directiveIndex);
          },
          get children() {
            return this._getChildElements(this._parentView, this._boundElementIndex);
          },
          get componentViewChildren() {
            var shadowView = this._parentView.getNestedView(this._boundElementIndex);
            if (!isPresent(shadowView)) {
              return [];
            }
            return this._getChildElements(shadowView, null);
          },
          triggerEventHandler: function(eventName, eventObj) {
            this._parentView.triggerEventHandlers(eventName, eventObj, this._boundElementIndex);
          },
          hasDirective: function(type) {
            if (!isPresent(this._elementInjector)) {
              return false;
            }
            return this._elementInjector.hasDirective(type);
          },
          inject: function(type) {
            if (!isPresent(this._elementInjector)) {
              return null;
            }
            return this._elementInjector.get(type);
          },
          getLocal: function(name) {
            return this._parentView.locals.get(name);
          },
          query: function(predicate) {
            var scope = arguments[1] !== (void 0) ? arguments[1] : Scope.all;
            var results = this.queryAll(predicate, scope);
            return results.length > 0 ? results[0] : null;
          },
          queryAll: function(predicate) {
            var scope = arguments[1] !== (void 0) ? arguments[1] : Scope.all;
            var elementsInScope = scope(this);
            return ListWrapper.filter(elementsInScope, predicate);
          },
          _getChildElements: function(view, parentBoundElementIndex) {
            var $__0 = this;
            var els = [];
            var parentElementBinder = null;
            if (isPresent(parentBoundElementIndex)) {
              parentElementBinder = view.proto.elementBinders[parentBoundElementIndex - view.elementOffset];
            }
            for (var i = 0; i < view.proto.elementBinders.length; ++i) {
              var binder = view.proto.elementBinders[i];
              if (binder.parent == parentElementBinder) {
                els.push(new DebugElement(view, view.elementOffset + i));
                var views = view.viewContainers[view.elementOffset + i];
                if (isPresent(views)) {
                  ListWrapper.forEach(views.views, (function(nextView) {
                    els = ListWrapper.concat(els, $__0._getChildElements(nextView, null));
                  }));
                }
              }
            }
            return els;
          }
        }, {create: function(elementRef) {
            return new DebugElement(internalView(elementRef.parentView), elementRef.boundElementIndex);
          }});
      }());
      $__export("DebugElement", DebugElement);
      Scope = (function() {
        function Scope() {}
        return ($traceurRuntime.createClass)(Scope, {}, {
          all: function(debugElement) {
            var scope = [];
            scope.push(debugElement);
            ListWrapper.forEach(debugElement.children, (function(child) {
              scope = ListWrapper.concat(scope, Scope.all(child));
            }));
            ListWrapper.forEach(debugElement.componentViewChildren, (function(child) {
              scope = ListWrapper.concat(scope, Scope.all(child));
            }));
            return scope;
          },
          light: function(debugElement) {
            var scope = [];
            ListWrapper.forEach(debugElement.children, (function(child) {
              scope.push(child);
              scope = ListWrapper.concat(scope, Scope.light(child));
            }));
            return scope;
          },
          view: function(debugElement) {
            var scope = [];
            ListWrapper.forEach(debugElement.componentViewChildren, (function(child) {
              scope.push(child);
              scope = ListWrapper.concat(scope, Scope.light(child));
            }));
            return scope;
          }
        });
      }());
      $__export("Scope", Scope);
      By = (function() {
        function By() {}
        return ($traceurRuntime.createClass)(By, {}, {
          all: function() {
            return (function(debugElement) {
              return true;
            });
          },
          css: function(selector) {
            return (function(debugElement) {
              return isPresent(debugElement.nativeElement) ? DOM.elementMatches(debugElement.nativeElement, selector) : false;
            });
          },
          directive: function(type) {
            return (function(debugElement) {
              return debugElement.hasDirective(type);
            });
          }
        });
      }());
      $__export("By", By);
    }
  };
});

System.register("angular2/src/debug/debug_element_view_listener", ["angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/di", "angular2/src/core/compiler/view_listener", "angular2/src/dom/dom_adapter", "angular2/src/render/api", "angular2/src/debug/debug_element"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/debug/debug_element_view_listener";
  var __decorate,
      __metadata,
      isPresent,
      NumberWrapper,
      MapWrapper,
      Map,
      ListWrapper,
      Injectable,
      bind,
      AppViewListener,
      DOM,
      Renderer,
      DebugElement,
      NG_ID_PROPERTY,
      INSPECT_GLOBAL_NAME,
      NG_ID_SEPARATOR,
      _allIdsByView,
      _allViewsById,
      _nextId,
      DebugElementViewListener,
      ELEMENT_PROBE_CONFIG;
  function _setElementId(element, indices) {
    if (isPresent(element)) {
      DOM.setData(element, NG_ID_PROPERTY, ListWrapper.join(indices, NG_ID_SEPARATOR));
    }
  }
  function _getElementId(element) {
    var elId = DOM.getData(element, NG_ID_PROPERTY);
    if (isPresent(elId)) {
      return ListWrapper.map(elId.split(NG_ID_SEPARATOR), (function(partStr) {
        return NumberWrapper.parseInt(partStr, 10);
      }));
    } else {
      return null;
    }
  }
  function inspectNativeElement(element) {
    var elId = _getElementId(element);
    if (isPresent(elId)) {
      var view = _allViewsById.get(elId[0]);
      if (isPresent(view)) {
        return new DebugElement(view, elId[1]);
      }
    }
    return null;
  }
  $__export("inspectNativeElement", inspectNativeElement);
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
      NumberWrapper = $__m.NumberWrapper;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
      Map = $__m.Map;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      Injectable = $__m.Injectable;
      bind = $__m.bind;
    }, function($__m) {
      AppViewListener = $__m.AppViewListener;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Renderer = $__m.Renderer;
    }, function($__m) {
      DebugElement = $__m.DebugElement;
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
      NG_ID_PROPERTY = 'ngid';
      INSPECT_GLOBAL_NAME = 'ngProbe';
      NG_ID_SEPARATOR = '#';
      _allIdsByView = new Map();
      _allViewsById = new Map();
      _nextId = 0;
      DebugElementViewListener = (($traceurRuntime.createClass)(function(_renderer) {
        this._renderer = _renderer;
        DOM.setGlobalVar(INSPECT_GLOBAL_NAME, inspectNativeElement);
      }, {
        viewCreated: function(view) {
          var viewId = _nextId++;
          _allViewsById.set(viewId, view);
          _allIdsByView.set(view, viewId);
          for (var i = 0; i < view.elementRefs.length; i++) {
            var el = view.elementRefs[i];
            _setElementId(this._renderer.getNativeElementSync(el), [viewId, i]);
          }
        },
        viewDestroyed: function(view) {
          var viewId = _allIdsByView.get(view);
          MapWrapper.delete(_allIdsByView, view);
          MapWrapper.delete(_allViewsById, viewId);
        }
      }, {}));
      $__export("DebugElementViewListener", DebugElementViewListener);
      $__export("DebugElementViewListener", DebugElementViewListener = __decorate([Injectable(), __metadata('design:paramtypes', [Renderer])], DebugElementViewListener));
      ELEMENT_PROBE_CONFIG = [DebugElementViewListener, bind(AppViewListener).toAlias(DebugElementViewListener)];
      $__export("ELEMENT_PROBE_CONFIG", ELEMENT_PROBE_CONFIG);
    }
  };
});

System.register("angular2/src/web-workers/shared/api", ["angular2/src/facade/lang", "angular2/di"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/web-workers/shared/api";
  var CONST_EXPR,
      OpaqueToken,
      ON_WEBWORKER,
      WorkerElementRef;
  return {
    setters: [function($__m) {
      CONST_EXPR = $__m.CONST_EXPR;
    }, function($__m) {
      OpaqueToken = $__m.OpaqueToken;
    }],
    execute: function() {
      ON_WEBWORKER = CONST_EXPR(new OpaqueToken('WebWorker.onWebWorker'));
      $__export("ON_WEBWORKER", ON_WEBWORKER);
      WorkerElementRef = (function() {
        function WorkerElementRef(renderView, renderBoundElementIndex) {
          this.renderView = renderView;
          this.renderBoundElementIndex = renderBoundElementIndex;
        }
        return ($traceurRuntime.createClass)(WorkerElementRef, {}, {});
      }());
      $__export("WorkerElementRef", WorkerElementRef);
    }
  };
});

System.register("angular2/src/web-workers/shared/render_proto_view_ref_store", ["angular2/di", "angular2/src/render/api", "angular2/src/web-workers/shared/api"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/web-workers/shared/render_proto_view_ref_store";
  var __decorate,
      __metadata,
      __param,
      Injectable,
      Inject,
      RenderProtoViewRef,
      ON_WEBWORKER,
      RenderProtoViewRefStore,
      WebworkerRenderProtoViewRef;
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
      Inject = $__m.Inject;
    }, function($__m) {
      RenderProtoViewRef = $__m.RenderProtoViewRef;
    }, function($__m) {
      ON_WEBWORKER = $__m.ON_WEBWORKER;
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
      RenderProtoViewRefStore = (($traceurRuntime.createClass)(function(onWebworker) {
        this._lookupByIndex = new Map();
        this._lookupByProtoView = new Map();
        this._nextIndex = 0;
        this._onWebworker = onWebworker;
      }, {
        storeRenderProtoViewRef: function(ref) {
          if (this._lookupByProtoView.has(ref)) {
            return this._lookupByProtoView.get(ref);
          } else {
            this._lookupByIndex.set(this._nextIndex, ref);
            this._lookupByProtoView.set(ref, this._nextIndex);
            return this._nextIndex++;
          }
        },
        retreiveRenderProtoViewRef: function(index) {
          return this._lookupByIndex.get(index);
        },
        deserialize: function(index) {
          if (index == null) {
            return null;
          }
          if (this._onWebworker) {
            return new WebworkerRenderProtoViewRef(index);
          } else {
            return this.retreiveRenderProtoViewRef(index);
          }
        },
        serialize: function(ref) {
          if (ref == null) {
            return null;
          }
          if (this._onWebworker) {
            return ref.refNumber;
          } else {
            return this.storeRenderProtoViewRef(ref);
          }
        }
      }, {}));
      $__export("RenderProtoViewRefStore", RenderProtoViewRefStore);
      $__export("RenderProtoViewRefStore", RenderProtoViewRefStore = __decorate([Injectable(), __param(0, Inject(ON_WEBWORKER)), __metadata('design:paramtypes', [Object])], RenderProtoViewRefStore));
      WebworkerRenderProtoViewRef = (function($__super) {
        function WebworkerRenderProtoViewRef(refNumber) {
          $traceurRuntime.superConstructor(WebworkerRenderProtoViewRef).call(this);
          this.refNumber = refNumber;
        }
        return ($traceurRuntime.createClass)(WebworkerRenderProtoViewRef, {}, {}, $__super);
      }(RenderProtoViewRef));
      $__export("WebworkerRenderProtoViewRef", WebworkerRenderProtoViewRef);
    }
  };
});

System.register("angular2/src/web-workers/shared/render_view_with_fragments_store", ["angular2/di", "angular2/src/render/api", "angular2/src/web-workers/shared/api", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/web-workers/shared/render_view_with_fragments_store";
  var __decorate,
      __metadata,
      __param,
      Injectable,
      Inject,
      RenderViewRef,
      RenderFragmentRef,
      RenderViewWithFragments,
      ON_WEBWORKER,
      ListWrapper,
      RenderViewWithFragmentsStore,
      WorkerRenderViewRef,
      WorkerRenderFragmentRef;
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
      Inject = $__m.Inject;
    }, function($__m) {
      RenderViewRef = $__m.RenderViewRef;
      RenderFragmentRef = $__m.RenderFragmentRef;
      RenderViewWithFragments = $__m.RenderViewWithFragments;
    }, function($__m) {
      ON_WEBWORKER = $__m.ON_WEBWORKER;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
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
      RenderViewWithFragmentsStore = (($traceurRuntime.createClass)(function(onWebWorker) {
        this._nextIndex = 0;
        this._onWebWorker = onWebWorker;
        this._lookupByIndex = new Map();
        this._lookupByView = new Map();
      }, {
        allocate: function(fragmentCount) {
          var initialIndex = this._nextIndex;
          var viewRef = new WorkerRenderViewRef(this._nextIndex++);
          var fragmentRefs = ListWrapper.createGrowableSize(fragmentCount);
          for (var i = 0; i < fragmentCount; i++) {
            fragmentRefs[i] = new WorkerRenderFragmentRef(this._nextIndex++);
          }
          var renderViewWithFragments = new RenderViewWithFragments(viewRef, fragmentRefs);
          this.store(renderViewWithFragments, initialIndex);
          return renderViewWithFragments;
        },
        store: function(view, startIndex) {
          var $__0 = this;
          this._lookupByIndex.set(startIndex, view.viewRef);
          this._lookupByView.set(view.viewRef, startIndex);
          startIndex++;
          ListWrapper.forEach(view.fragmentRefs, (function(ref) {
            $__0._lookupByIndex.set(startIndex, ref);
            $__0._lookupByView.set(ref, startIndex);
            startIndex++;
          }));
        },
        retreive: function(ref) {
          if (ref == null) {
            return null;
          }
          return this._lookupByIndex.get(ref);
        },
        serializeRenderViewRef: function(viewRef) {
          return this._serializeRenderFragmentOrViewRef(viewRef);
        },
        serializeRenderFragmentRef: function(fragmentRef) {
          return this._serializeRenderFragmentOrViewRef(fragmentRef);
        },
        deserializeRenderViewRef: function(ref) {
          if (ref == null) {
            return null;
          }
          return this.retreive(ref);
        },
        deserializeRenderFragmentRef: function(ref) {
          if (ref == null) {
            return null;
          }
          return this.retreive(ref);
        },
        _serializeRenderFragmentOrViewRef: function(ref) {
          if (ref == null) {
            return null;
          }
          if (this._onWebWorker) {
            return ref.serialize();
          } else {
            return this._lookupByView.get(ref);
          }
        },
        serializeViewWithFragments: function(view) {
          var $__0 = this;
          if (view == null) {
            return null;
          }
          if (this._onWebWorker) {
            return {
              'viewRef': view.viewRef.serialize(),
              'fragmentRefs': ListWrapper.map(view.fragmentRefs, (function(val) {
                return val.serialize();
              }))
            };
          } else {
            return {
              'viewRef': this._lookupByView.get(view.viewRef),
              'fragmentRefs': ListWrapper.map(view.fragmentRefs, (function(val) {
                return $__0._lookupByView.get(val);
              }))
            };
          }
        },
        deserializeViewWithFragments: function(obj) {
          var $__0 = this;
          if (obj == null) {
            return null;
          }
          var viewRef = this.deserializeRenderViewRef(obj['viewRef']);
          var fragments = ListWrapper.map(obj['fragmentRefs'], (function(val) {
            return $__0.deserializeRenderFragmentRef(val);
          }));
          return new RenderViewWithFragments(viewRef, fragments);
        }
      }, {}));
      $__export("RenderViewWithFragmentsStore", RenderViewWithFragmentsStore);
      $__export("RenderViewWithFragmentsStore", RenderViewWithFragmentsStore = __decorate([Injectable(), __param(0, Inject(ON_WEBWORKER)), __metadata('design:paramtypes', [Object])], RenderViewWithFragmentsStore));
      WorkerRenderViewRef = (function($__super) {
        function WorkerRenderViewRef(refNumber) {
          $traceurRuntime.superConstructor(WorkerRenderViewRef).call(this);
          this.refNumber = refNumber;
        }
        return ($traceurRuntime.createClass)(WorkerRenderViewRef, {serialize: function() {
            return this.refNumber;
          }}, {deserialize: function(ref) {
            return new WorkerRenderViewRef(ref);
          }}, $__super);
      }(RenderViewRef));
      $__export("WorkerRenderViewRef", WorkerRenderViewRef);
      WorkerRenderFragmentRef = (function($__super) {
        function WorkerRenderFragmentRef(refNumber) {
          $traceurRuntime.superConstructor(WorkerRenderFragmentRef).call(this);
          this.refNumber = refNumber;
        }
        return ($traceurRuntime.createClass)(WorkerRenderFragmentRef, {serialize: function() {
            return this.refNumber;
          }}, {deserialize: function(ref) {
            return new WorkerRenderFragmentRef(ref);
          }}, $__super);
      }(RenderFragmentRef));
      $__export("WorkerRenderFragmentRef", WorkerRenderFragmentRef);
    }
  };
});

System.register("angular2/debug", ["angular2/src/debug/debug_element", "angular2/src/debug/debug_element_view_listener"], function($__export) {
  "use strict";
  var __moduleName = "angular2/debug";
  var $__exportNames = {undefined: true};
  return {
    setters: [function($__m) {
      Object.keys($__m).forEach(function(p) {
        if (!$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }, function($__m) {
      $__export("inspectNativeElement", $__m.inspectNativeElement);
      $__export("ELEMENT_PROBE_CONFIG", $__m.ELEMENT_PROBE_CONFIG);
    }],
    execute: function() {}
  };
});

System.register("angular2/src/web-workers/shared/serializer", ["angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/render/api", "angular2/src/web-workers/shared/api", "angular2/src/change_detection/change_detection", "angular2/src/change_detection/parser/parser", "angular2/di", "angular2/src/web-workers/shared/render_proto_view_ref_store", "angular2/src/web-workers/shared/render_view_with_fragments_store"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/web-workers/shared/serializer";
  var __decorate,
      __metadata,
      isArray,
      isPresent,
      serializeEnum,
      deserializeEnum,
      BaseException,
      List,
      ListWrapper,
      Map,
      StringMapWrapper,
      MapWrapper,
      ProtoViewDto,
      DirectiveMetadata,
      ElementBinder,
      DirectiveBinder,
      ElementPropertyBinding,
      EventBinding,
      ViewDefinition,
      RenderProtoViewRef,
      RenderProtoViewMergeMapping,
      RenderViewRef,
      RenderFragmentRef,
      ViewType,
      ViewEncapsulation,
      PropertyBindingType,
      WorkerElementRef,
      ASTWithSource,
      Parser,
      Injectable,
      RenderProtoViewRefStore,
      RenderViewWithFragmentsStore,
      Serializer;
  return {
    setters: [function($__m) {
      isArray = $__m.isArray;
      isPresent = $__m.isPresent;
      serializeEnum = $__m.serializeEnum;
      deserializeEnum = $__m.deserializeEnum;
      BaseException = $__m.BaseException;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      Map = $__m.Map;
      StringMapWrapper = $__m.StringMapWrapper;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      ProtoViewDto = $__m.ProtoViewDto;
      DirectiveMetadata = $__m.DirectiveMetadata;
      ElementBinder = $__m.ElementBinder;
      DirectiveBinder = $__m.DirectiveBinder;
      ElementPropertyBinding = $__m.ElementPropertyBinding;
      EventBinding = $__m.EventBinding;
      ViewDefinition = $__m.ViewDefinition;
      RenderProtoViewRef = $__m.RenderProtoViewRef;
      RenderProtoViewMergeMapping = $__m.RenderProtoViewMergeMapping;
      RenderViewRef = $__m.RenderViewRef;
      RenderFragmentRef = $__m.RenderFragmentRef;
      ViewType = $__m.ViewType;
      ViewEncapsulation = $__m.ViewEncapsulation;
      PropertyBindingType = $__m.PropertyBindingType;
    }, function($__m) {
      WorkerElementRef = $__m.WorkerElementRef;
    }, function($__m) {
      ASTWithSource = $__m.ASTWithSource;
    }, function($__m) {
      Parser = $__m.Parser;
    }, function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      RenderProtoViewRefStore = $__m.RenderProtoViewRefStore;
    }, function($__m) {
      RenderViewWithFragmentsStore = $__m.RenderViewWithFragmentsStore;
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
      Serializer = (($traceurRuntime.createClass)(function(_parser, _protoViewStore, _renderViewStore) {
        this._parser = _parser;
        this._protoViewStore = _protoViewStore;
        this._renderViewStore = _renderViewStore;
        this._enumRegistry = new Map();
        var viewTypeMap = new Map();
        viewTypeMap[0] = ViewType.HOST;
        viewTypeMap[1] = ViewType.COMPONENT;
        viewTypeMap[2] = ViewType.EMBEDDED;
        this._enumRegistry.set(ViewType, viewTypeMap);
        var viewEncapsulationMap = new Map();
        viewEncapsulationMap[0] = ViewEncapsulation.EMULATED;
        viewEncapsulationMap[1] = ViewEncapsulation.NATIVE;
        viewEncapsulationMap[2] = ViewEncapsulation.NONE;
        this._enumRegistry.set(ViewEncapsulation, viewEncapsulationMap);
        var propertyBindingTypeMap = new Map();
        propertyBindingTypeMap[0] = PropertyBindingType.PROPERTY;
        propertyBindingTypeMap[1] = PropertyBindingType.ATTRIBUTE;
        propertyBindingTypeMap[2] = PropertyBindingType.CLASS;
        propertyBindingTypeMap[3] = PropertyBindingType.STYLE;
        this._enumRegistry.set(PropertyBindingType, propertyBindingTypeMap);
      }, {
        serialize: function(obj, type) {
          var $__0 = this;
          if (!isPresent(obj)) {
            return null;
          }
          if (isArray(obj)) {
            var serializedObj = [];
            ListWrapper.forEach(obj, (function(val) {
              serializedObj.push($__0.serialize(val, type));
            }));
            return serializedObj;
          }
          if (type == String) {
            return obj;
          }
          if (type == ViewDefinition) {
            return this._serializeViewDefinition(obj);
          } else if (type == DirectiveBinder) {
            return this._serializeDirectiveBinder(obj);
          } else if (type == ProtoViewDto) {
            return this._serializeProtoViewDto(obj);
          } else if (type == ElementBinder) {
            return this._serializeElementBinder(obj);
          } else if (type == DirectiveMetadata) {
            return this._serializeDirectiveMetadata(obj);
          } else if (type == ASTWithSource) {
            return this._serializeASTWithSource(obj);
          } else if (type == RenderProtoViewRef) {
            return this._protoViewStore.serialize(obj);
          } else if (type == RenderProtoViewMergeMapping) {
            return this._serializeRenderProtoViewMergeMapping(obj);
          } else if (type == RenderViewRef) {
            return this._renderViewStore.serializeRenderViewRef(obj);
          } else if (type == RenderFragmentRef) {
            return this._renderViewStore.serializeRenderFragmentRef(obj);
          } else if (type == WorkerElementRef) {
            return this._serializeWorkerElementRef(obj);
          } else if (type == ElementPropertyBinding) {
            return this._serializeElementPropertyBinding(obj);
          } else if (type == EventBinding) {
            return this._serializeEventBinding(obj);
          } else {
            throw new BaseException("No serializer for " + type.toString());
          }
        },
        deserialize: function(map, type, data) {
          var $__0 = this;
          if (!isPresent(map)) {
            return null;
          }
          if (isArray(map)) {
            var obj = new List();
            ListWrapper.forEach(map, (function(val) {
              obj.push($__0.deserialize(val, type, data));
            }));
            return obj;
          }
          if (type == String) {
            return map;
          }
          if (type == ViewDefinition) {
            return this._deserializeViewDefinition(map);
          } else if (type == DirectiveBinder) {
            return this._deserializeDirectiveBinder(map);
          } else if (type == ProtoViewDto) {
            return this._deserializeProtoViewDto(map);
          } else if (type == DirectiveMetadata) {
            return this._deserializeDirectiveMetadata(map);
          } else if (type == ElementBinder) {
            return this._deserializeElementBinder(map);
          } else if (type == ASTWithSource) {
            return this._deserializeASTWithSource(map, data);
          } else if (type == RenderProtoViewRef) {
            return this._protoViewStore.deserialize(map);
          } else if (type == RenderProtoViewMergeMapping) {
            return this._deserializeRenderProtoViewMergeMapping(map);
          } else if (type == RenderViewRef) {
            return this._renderViewStore.deserializeRenderViewRef(map);
          } else if (type == RenderFragmentRef) {
            return this._renderViewStore.deserializeRenderFragmentRef(map);
          } else if (type == WorkerElementRef) {
            return this._deserializeWorkerElementRef(map);
          } else if (type == EventBinding) {
            return this._deserializeEventBinding(map);
          } else if (type == ElementPropertyBinding) {
            return this._deserializeElementPropertyBinding(map);
          } else {
            throw new BaseException("No deserializer for " + type.toString());
          }
        },
        mapToObject: function(map, type) {
          var $__0 = this;
          var object = {};
          var serialize = isPresent(type);
          MapWrapper.forEach(map, (function(value, key) {
            if (serialize) {
              object[key] = $__0.serialize(value, type);
            } else {
              object[key] = value;
            }
          }));
          return object;
        },
        objectToMap: function(obj, type, data) {
          var $__0 = this;
          if (isPresent(type)) {
            var map = new Map();
            StringMapWrapper.forEach(obj, (function(val, key) {
              map.set(key, $__0.deserialize(val, type, data));
            }));
            return map;
          } else {
            return MapWrapper.createFromStringMap(obj);
          }
        },
        allocateRenderViews: function(fragmentCount) {
          this._renderViewStore.allocate(fragmentCount);
        },
        _serializeElementPropertyBinding: function(binding) {
          return {
            'type': serializeEnum(binding.type),
            'astWithSource': this.serialize(binding.astWithSource, ASTWithSource),
            'property': binding.property,
            'unit': binding.unit
          };
        },
        _deserializeElementPropertyBinding: function(map) {
          var type = deserializeEnum(map['type'], this._enumRegistry.get(PropertyBindingType));
          var ast = this.deserialize(map['astWithSource'], ASTWithSource, "binding");
          return new ElementPropertyBinding(type, ast, map['property'], map['unit']);
        },
        _serializeEventBinding: function(binding) {
          return {
            'fullName': binding.fullName,
            'source': this.serialize(binding.source, ASTWithSource)
          };
        },
        _deserializeEventBinding: function(map) {
          return new EventBinding(map['fullName'], this.deserialize(map['source'], ASTWithSource, "action"));
        },
        _serializeWorkerElementRef: function(elementRef) {
          return {
            'renderView': this.serialize(elementRef.renderView, RenderViewRef),
            'renderBoundElementIndex': elementRef.renderBoundElementIndex
          };
        },
        _deserializeWorkerElementRef: function(map) {
          return new WorkerElementRef(this.deserialize(map['renderView'], RenderViewRef), map['renderBoundElementIndex']);
        },
        _serializeRenderProtoViewMergeMapping: function(mapping) {
          return {
            'mergedProtoViewRef': this._protoViewStore.serialize(mapping.mergedProtoViewRef),
            'fragmentCount': mapping.fragmentCount,
            'mappedElementIndices': mapping.mappedElementIndices,
            'mappedElementCount': mapping.mappedElementCount,
            'mappedTextIndices': mapping.mappedTextIndices,
            'hostElementIndicesByViewIndex': mapping.hostElementIndicesByViewIndex,
            'nestedViewCountByViewIndex': mapping.nestedViewCountByViewIndex
          };
        },
        _deserializeRenderProtoViewMergeMapping: function(obj) {
          return new RenderProtoViewMergeMapping(this._protoViewStore.deserialize(obj['mergedProtoViewRef']), obj['fragmentCount'], obj['mappedElementIndices'], obj['mappedElementCount'], obj['mappedTextIndices'], obj['hostElementIndicesByViewIndex'], obj['nestedViewCountByViewIndex']);
        },
        _serializeASTWithSource: function(tree) {
          return {
            'input': tree.source,
            'location': tree.location
          };
        },
        _deserializeASTWithSource: function(obj, data) {
          var ast;
          switch (data) {
            case "action":
              ast = this._parser.parseAction(obj['input'], obj['location']);
              break;
            case "binding":
              ast = this._parser.parseBinding(obj['input'], obj['location']);
              break;
            case "interpolation":
              ast = this._parser.parseInterpolation(obj['input'], obj['location']);
              break;
            default:
              throw "No AST deserializer for " + data;
          }
          return ast;
        },
        _serializeViewDefinition: function(view) {
          return {
            'componentId': view.componentId,
            'templateAbsUrl': view.templateAbsUrl,
            'template': view.template,
            'directives': this.serialize(view.directives, DirectiveMetadata),
            'styleAbsUrls': view.styleAbsUrls,
            'styles': view.styles,
            'encapsulation': serializeEnum(view.encapsulation)
          };
        },
        _deserializeViewDefinition: function(obj) {
          return new ViewDefinition({
            componentId: obj['componentId'],
            templateAbsUrl: obj['templateAbsUrl'],
            template: obj['template'],
            directives: this.deserialize(obj['directives'], DirectiveMetadata),
            styleAbsUrls: obj['styleAbsUrls'],
            styles: obj['styles'],
            encapsulation: deserializeEnum(obj['encapsulation'], this._enumRegistry.get(ViewEncapsulation))
          });
        },
        _serializeDirectiveBinder: function(binder) {
          return {
            'directiveIndex': binder.directiveIndex,
            'propertyBindings': this.mapToObject(binder.propertyBindings, ASTWithSource),
            'eventBindings': this.serialize(binder.eventBindings, EventBinding),
            'hostPropertyBindings': this.serialize(binder.hostPropertyBindings, ElementPropertyBinding)
          };
        },
        _deserializeDirectiveBinder: function(obj) {
          return new DirectiveBinder({
            directiveIndex: obj['directiveIndex'],
            propertyBindings: this.objectToMap(obj['propertyBindings'], ASTWithSource, "binding"),
            eventBindings: this.deserialize(obj['eventBindings'], EventBinding),
            hostPropertyBindings: this.deserialize(obj['hostPropertyBindings'], ElementPropertyBinding)
          });
        },
        _serializeElementBinder: function(binder) {
          return {
            'index': binder.index,
            'parentIndex': binder.parentIndex,
            'distanceToParent': binder.distanceToParent,
            'directives': this.serialize(binder.directives, DirectiveBinder),
            'nestedProtoView': this.serialize(binder.nestedProtoView, ProtoViewDto),
            'propertyBindings': this.serialize(binder.propertyBindings, ElementPropertyBinding),
            'variableBindings': this.mapToObject(binder.variableBindings),
            'eventBindings': this.serialize(binder.eventBindings, EventBinding),
            'readAttributes': this.mapToObject(binder.readAttributes)
          };
        },
        _deserializeElementBinder: function(obj) {
          return new ElementBinder({
            index: obj['index'],
            parentIndex: obj['parentIndex'],
            distanceToParent: obj['distanceToParent'],
            directives: this.deserialize(obj['directives'], DirectiveBinder),
            nestedProtoView: this.deserialize(obj['nestedProtoView'], ProtoViewDto),
            propertyBindings: this.deserialize(obj['propertyBindings'], ElementPropertyBinding),
            variableBindings: this.objectToMap(obj['variableBindings']),
            eventBindings: this.deserialize(obj['eventBindings'], EventBinding),
            readAttributes: this.objectToMap(obj['readAttributes'])
          });
        },
        _serializeProtoViewDto: function(view) {
          return {
            'render': this._protoViewStore.serialize(view.render),
            'elementBinders': this.serialize(view.elementBinders, ElementBinder),
            'variableBindings': this.mapToObject(view.variableBindings),
            'type': serializeEnum(view.type),
            'textBindings': this.serialize(view.textBindings, ASTWithSource),
            'transitiveNgContentCount': view.transitiveNgContentCount
          };
        },
        _deserializeProtoViewDto: function(obj) {
          return new ProtoViewDto({
            render: this._protoViewStore.deserialize(obj["render"]),
            elementBinders: this.deserialize(obj['elementBinders'], ElementBinder),
            variableBindings: this.objectToMap(obj['variableBindings']),
            textBindings: this.deserialize(obj['textBindings'], ASTWithSource, "interpolation"),
            type: deserializeEnum(obj['type'], this._enumRegistry.get(ViewType)),
            transitiveNgContentCount: obj['transitiveNgContentCount']
          });
        },
        _serializeDirectiveMetadata: function(meta) {
          var obj = {
            'id': meta.id,
            'selector': meta.selector,
            'compileChildren': meta.compileChildren,
            'events': meta.events,
            'properties': meta.properties,
            'readAttributes': meta.readAttributes,
            'type': meta.type,
            'callOnDestroy': meta.callOnDestroy,
            'callOnChange': meta.callOnChange,
            'callOnCheck': meta.callOnCheck,
            'callOnInit': meta.callOnInit,
            'callOnAllChangesDone': meta.callOnAllChangesDone,
            'changeDetection': meta.changeDetection,
            'exportAs': meta.exportAs,
            'hostProperties': this.mapToObject(meta.hostProperties),
            'hostListeners': this.mapToObject(meta.hostListeners),
            'hostActions': this.mapToObject(meta.hostActions),
            'hostAttributes': this.mapToObject(meta.hostAttributes)
          };
          return obj;
        },
        _deserializeDirectiveMetadata: function(obj) {
          return new DirectiveMetadata({
            id: obj['id'],
            selector: obj['selector'],
            compileChildren: obj['compileChildren'],
            hostProperties: this.objectToMap(obj['hostProperties']),
            hostListeners: this.objectToMap(obj['hostListeners']),
            hostActions: this.objectToMap(obj['hostActions']),
            hostAttributes: this.objectToMap(obj['hostAttributes']),
            properties: obj['properties'],
            readAttributes: obj['readAttributes'],
            type: obj['type'],
            exportAs: obj['exportAs'],
            callOnDestroy: obj['callOnDestroy'],
            callOnChange: obj['callOnChange'],
            callOnCheck: obj['callOnCheck'],
            callOnInit: obj['callOnInit'],
            callOnAllChangesDone: obj['callOnAllChangesDone'],
            changeDetection: obj['changeDetection'],
            events: obj['events']
          });
        }
      }, {}));
      $__export("Serializer", Serializer);
      $__export("Serializer", Serializer = __decorate([Injectable(), __metadata('design:paramtypes', [Parser, RenderProtoViewRefStore, RenderViewWithFragmentsStore])], Serializer));
    }
  };
});

System.register("angular2/src/test_lib/test_component_builder", ["angular2/di", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/core/compiler/view_resolver", "angular2/src/core/compiler/view_ref", "angular2/src/core/compiler/dynamic_component_loader", "angular2/src/test_lib/utils", "angular2/src/render/render", "angular2/src/dom/dom_adapter", "angular2/src/debug/debug_element"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/test_lib/test_component_builder";
  var __decorate,
      __metadata,
      Injector,
      Injectable,
      isPresent,
      MapWrapper,
      ViewResolver,
      internalView,
      DynamicComponentLoader,
      el,
      DOCUMENT_TOKEN,
      DOM,
      DebugElement,
      RootTestComponent,
      _nextRootElementId,
      TestComponentBuilder;
  return {
    setters: [function($__m) {
      Injector = $__m.Injector;
      Injectable = $__m.Injectable;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      ViewResolver = $__m.ViewResolver;
    }, function($__m) {
      internalView = $__m.internalView;
    }, function($__m) {
      DynamicComponentLoader = $__m.DynamicComponentLoader;
    }, function($__m) {
      el = $__m.el;
    }, function($__m) {
      DOCUMENT_TOKEN = $__m.DOCUMENT_TOKEN;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      DebugElement = $__m.DebugElement;
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
      RootTestComponent = (function($__super) {
        function RootTestComponent(componentRef) {
          $traceurRuntime.superConstructor(RootTestComponent).call(this, internalView(componentRef.hostView), 0);
          this._componentParentView = internalView(componentRef.hostView);
          this._componentRef = componentRef;
        }
        return ($traceurRuntime.createClass)(RootTestComponent, {
          detectChanges: function() {
            this._componentParentView.changeDetector.detectChanges();
            this._componentParentView.changeDetector.checkNoChanges();
          },
          destroy: function() {
            this._componentRef.dispose();
          }
        }, {}, $__super);
      }(DebugElement));
      $__export("RootTestComponent", RootTestComponent);
      _nextRootElementId = 0;
      TestComponentBuilder = (($traceurRuntime.createClass)(function(injector) {
        this._injector = injector;
        this._viewOverrides = new Map();
        this._directiveOverrides = new Map();
        this._templateOverrides = new Map();
      }, {
        _clone: function() {
          var clone = new TestComponentBuilder(this._injector);
          clone._viewOverrides = MapWrapper.clone(this._viewOverrides);
          clone._directiveOverrides = MapWrapper.clone(this._directiveOverrides);
          clone._templateOverrides = MapWrapper.clone(this._templateOverrides);
          return clone;
        },
        overrideTemplate: function(componentType, template) {
          var clone = this._clone();
          clone._templateOverrides.set(componentType, template);
          return clone;
        },
        overrideView: function(componentType, view) {
          var clone = this._clone();
          clone._viewOverrides.set(componentType, view);
          return clone;
        },
        overrideDirective: function(componentType, from, to) {
          var clone = this._clone();
          var overridesForComponent = clone._directiveOverrides.get(componentType);
          if (!isPresent(overridesForComponent)) {
            clone._directiveOverrides.set(componentType, new Map());
            overridesForComponent = clone._directiveOverrides.get(componentType);
          }
          overridesForComponent.set(from, to);
          return clone;
        },
        createAsync: function(rootComponentType) {
          var mockViewResolver = this._injector.get(ViewResolver);
          MapWrapper.forEach(this._viewOverrides, (function(view, type) {
            mockViewResolver.setView(type, view);
          }));
          MapWrapper.forEach(this._templateOverrides, (function(template, type) {
            mockViewResolver.setInlineTemplate(type, template);
          }));
          MapWrapper.forEach(this._directiveOverrides, (function(overrides, component) {
            MapWrapper.forEach(overrides, (function(to, from) {
              mockViewResolver.overrideViewDirective(component, from, to);
            }));
          }));
          var rootElId = ("root" + _nextRootElementId++);
          var rootEl = el(("<div id=\"" + rootElId + "\"></div>"));
          var doc = this._injector.get(DOCUMENT_TOKEN);
          DOM.appendChild(doc.body, rootEl);
          return this._injector.get(DynamicComponentLoader).loadAsRoot(rootComponentType, ("#" + rootElId), this._injector).then((function(componentRef) {
            return new RootTestComponent(componentRef);
          }));
        }
      }, {}));
      $__export("TestComponentBuilder", TestComponentBuilder);
      $__export("TestComponentBuilder", TestComponentBuilder = __decorate([Injectable(), __metadata('design:paramtypes', [Injector])], TestComponentBuilder));
    }
  };
});

System.register("angular2/src/test_lib/test_injector", ["angular2/di", "angular2/src/core/compiler/compiler", "angular2/src/reflection/reflection", "angular2/src/change_detection/change_detection", "angular2/src/core/exception_handler", "angular2/src/render/dom/compiler/view_loader", "angular2/src/core/compiler/view_resolver", "angular2/src/core/compiler/directive_resolver", "angular2/src/core/compiler/dynamic_component_loader", "angular2/src/render/xhr", "angular2/src/core/compiler/component_url_mapper", "angular2/src/services/url_resolver", "angular2/src/services/app_root_url", "angular2/src/services/anchor_based_app_root_url", "angular2/src/render/dom/compiler/style_url_resolver", "angular2/src/render/dom/compiler/style_inliner", "angular2/src/core/zone/ng_zone", "angular2/src/dom/dom_adapter", "angular2/src/render/dom/events/event_manager", "angular2/src/mock/view_resolver_mock", "angular2/src/render/xhr_mock", "angular2/src/mock/mock_location_strategy", "angular2/src/router/location_strategy", "angular2/src/mock/ng_zone_mock", "angular2/src/test_lib/test_component_builder", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/core/compiler/view_pool", "angular2/src/core/compiler/view_manager", "angular2/src/core/compiler/view_manager_utils", "angular2/debug", "angular2/src/core/compiler/proto_view_factory", "angular2/src/render/api", "angular2/src/render/render", "angular2/src/render/dom/schema/element_schema_registry", "angular2/src/render/dom/schema/dom_element_schema_registry", "angular2/src/web-workers/shared/serializer", "angular2/src/test_lib/utils"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/test_lib/test_injector";
  var bind,
      Compiler,
      CompilerCache,
      Reflector,
      reflector,
      Parser,
      Lexer,
      ChangeDetection,
      DynamicChangeDetection,
      Pipes,
      defaultPipes,
      IterableDiffers,
      defaultIterableDiffers,
      KeyValueDiffers,
      defaultKeyValueDiffers,
      ExceptionHandler,
      ViewLoader,
      ViewResolver,
      DirectiveResolver,
      DynamicComponentLoader,
      XHR,
      ComponentUrlMapper,
      UrlResolver,
      AppRootUrl,
      AnchorBasedAppRootUrl,
      StyleUrlResolver,
      StyleInliner,
      NgZone,
      DOM,
      EventManager,
      DomEventsPlugin,
      MockViewResolver,
      MockXHR,
      MockLocationStrategy,
      LocationStrategy,
      MockNgZone,
      TestComponentBuilder,
      Injector,
      ListWrapper,
      FunctionWrapper,
      AppViewPool,
      APP_VIEW_POOL_CAPACITY,
      AppViewManager,
      AppViewManagerUtils,
      ELEMENT_PROBE_CONFIG,
      ProtoViewFactory,
      RenderCompiler,
      Renderer,
      DomRenderer,
      DOCUMENT_TOKEN,
      DOM_REFLECT_PROPERTIES_AS_ATTRIBUTES,
      DefaultDomCompiler,
      APP_ID_TOKEN,
      SharedStylesHost,
      DomSharedStylesHost,
      MAX_IN_MEMORY_ELEMENTS_PER_TEMPLATE_TOKEN,
      TemplateCloner,
      ElementSchemaRegistry,
      DomElementSchemaRegistry,
      Serializer,
      Log,
      FunctionWithParamTokens;
  function _getRootBindings() {
    return [bind(Reflector).toValue(reflector)];
  }
  function _getAppBindings() {
    var appDoc;
    try {
      appDoc = DOM.createHtmlDocument();
    } catch (e) {
      appDoc = null;
    }
    return [bind(DOCUMENT_TOKEN).toValue(appDoc), DomRenderer, bind(Renderer).toAlias(DomRenderer), bind(APP_ID_TOKEN).toValue('a'), TemplateCloner, bind(MAX_IN_MEMORY_ELEMENTS_PER_TEMPLATE_TOKEN).toValue(-1), DefaultDomCompiler, bind(RenderCompiler).toAlias(DefaultDomCompiler), bind(ElementSchemaRegistry).toValue(new DomElementSchemaRegistry()), DomSharedStylesHost, bind(SharedStylesHost).toAlias(DomSharedStylesHost), bind(DOM_REFLECT_PROPERTIES_AS_ATTRIBUTES).toValue(false), ProtoViewFactory, AppViewPool, AppViewManager, AppViewManagerUtils, Serializer, ELEMENT_PROBE_CONFIG, bind(APP_VIEW_POOL_CAPACITY).toValue(500), Compiler, CompilerCache, bind(ViewResolver).toClass(MockViewResolver), bind(Pipes).toValue(defaultPipes), bind(IterableDiffers).toValue(defaultIterableDiffers), bind(KeyValueDiffers).toValue(defaultKeyValueDiffers), bind(ChangeDetection).toClass(DynamicChangeDetection), Log, ViewLoader, DynamicComponentLoader, DirectiveResolver, Parser, Lexer, bind(ExceptionHandler).toValue(new ExceptionHandler(DOM)), bind(LocationStrategy).toClass(MockLocationStrategy), bind(XHR).toClass(MockXHR), ComponentUrlMapper, UrlResolver, AnchorBasedAppRootUrl, bind(AppRootUrl).toAlias(AnchorBasedAppRootUrl), StyleUrlResolver, StyleInliner, TestComponentBuilder, bind(NgZone).toClass(MockNgZone), bind(EventManager).toFactory((function(zone) {
      var plugins = [new DomEventsPlugin()];
      return new EventManager(plugins, zone);
    }), [NgZone])];
  }
  function createTestInjector(bindings) {
    var rootInjector = Injector.resolveAndCreate(_getRootBindings());
    return rootInjector.resolveAndCreateChild(ListWrapper.concat(_getAppBindings(), bindings));
  }
  function inject(tokens, fn) {
    return new FunctionWithParamTokens(tokens, fn);
  }
  $__export("createTestInjector", createTestInjector);
  $__export("inject", inject);
  return {
    setters: [function($__m) {
      bind = $__m.bind;
      Injector = $__m.Injector;
    }, function($__m) {
      Compiler = $__m.Compiler;
      CompilerCache = $__m.CompilerCache;
    }, function($__m) {
      Reflector = $__m.Reflector;
      reflector = $__m.reflector;
    }, function($__m) {
      Parser = $__m.Parser;
      Lexer = $__m.Lexer;
      ChangeDetection = $__m.ChangeDetection;
      DynamicChangeDetection = $__m.DynamicChangeDetection;
      Pipes = $__m.Pipes;
      defaultPipes = $__m.defaultPipes;
      IterableDiffers = $__m.IterableDiffers;
      defaultIterableDiffers = $__m.defaultIterableDiffers;
      KeyValueDiffers = $__m.KeyValueDiffers;
      defaultKeyValueDiffers = $__m.defaultKeyValueDiffers;
    }, function($__m) {
      ExceptionHandler = $__m.ExceptionHandler;
    }, function($__m) {
      ViewLoader = $__m.ViewLoader;
    }, function($__m) {
      ViewResolver = $__m.ViewResolver;
    }, function($__m) {
      DirectiveResolver = $__m.DirectiveResolver;
    }, function($__m) {
      DynamicComponentLoader = $__m.DynamicComponentLoader;
    }, function($__m) {
      XHR = $__m.XHR;
    }, function($__m) {
      ComponentUrlMapper = $__m.ComponentUrlMapper;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
    }, function($__m) {
      AppRootUrl = $__m.AppRootUrl;
    }, function($__m) {
      AnchorBasedAppRootUrl = $__m.AnchorBasedAppRootUrl;
    }, function($__m) {
      StyleUrlResolver = $__m.StyleUrlResolver;
    }, function($__m) {
      StyleInliner = $__m.StyleInliner;
    }, function($__m) {
      NgZone = $__m.NgZone;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      EventManager = $__m.EventManager;
      DomEventsPlugin = $__m.DomEventsPlugin;
    }, function($__m) {
      MockViewResolver = $__m.MockViewResolver;
    }, function($__m) {
      MockXHR = $__m.MockXHR;
    }, function($__m) {
      MockLocationStrategy = $__m.MockLocationStrategy;
    }, function($__m) {
      LocationStrategy = $__m.LocationStrategy;
    }, function($__m) {
      MockNgZone = $__m.MockNgZone;
    }, function($__m) {
      TestComponentBuilder = $__m.TestComponentBuilder;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      FunctionWrapper = $__m.FunctionWrapper;
    }, function($__m) {
      AppViewPool = $__m.AppViewPool;
      APP_VIEW_POOL_CAPACITY = $__m.APP_VIEW_POOL_CAPACITY;
    }, function($__m) {
      AppViewManager = $__m.AppViewManager;
    }, function($__m) {
      AppViewManagerUtils = $__m.AppViewManagerUtils;
    }, function($__m) {
      ELEMENT_PROBE_CONFIG = $__m.ELEMENT_PROBE_CONFIG;
    }, function($__m) {
      ProtoViewFactory = $__m.ProtoViewFactory;
    }, function($__m) {
      RenderCompiler = $__m.RenderCompiler;
      Renderer = $__m.Renderer;
    }, function($__m) {
      DomRenderer = $__m.DomRenderer;
      DOCUMENT_TOKEN = $__m.DOCUMENT_TOKEN;
      DOM_REFLECT_PROPERTIES_AS_ATTRIBUTES = $__m.DOM_REFLECT_PROPERTIES_AS_ATTRIBUTES;
      DefaultDomCompiler = $__m.DefaultDomCompiler;
      APP_ID_TOKEN = $__m.APP_ID_TOKEN;
      SharedStylesHost = $__m.SharedStylesHost;
      DomSharedStylesHost = $__m.DomSharedStylesHost;
      MAX_IN_MEMORY_ELEMENTS_PER_TEMPLATE_TOKEN = $__m.MAX_IN_MEMORY_ELEMENTS_PER_TEMPLATE_TOKEN;
      TemplateCloner = $__m.TemplateCloner;
    }, function($__m) {
      ElementSchemaRegistry = $__m.ElementSchemaRegistry;
    }, function($__m) {
      DomElementSchemaRegistry = $__m.DomElementSchemaRegistry;
    }, function($__m) {
      Serializer = $__m.Serializer;
    }, function($__m) {
      Log = $__m.Log;
    }],
    execute: function() {
      FunctionWithParamTokens = (function() {
        function FunctionWithParamTokens(tokens, fn) {
          this._tokens = tokens;
          this._fn = fn;
        }
        return ($traceurRuntime.createClass)(FunctionWithParamTokens, {execute: function(injector) {
            var params = ListWrapper.map(this._tokens, (function(t) {
              return injector.get(t);
            }));
            return FunctionWrapper.apply(this._fn, params);
          }}, {});
      }());
      $__export("FunctionWithParamTokens", FunctionWithParamTokens);
    }
  };
});

System.register("angular2/src/test_lib/test_lib", ["angular2/src/dom/dom_adapter", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/di", "angular2/src/core/exception_handler", "angular2/src/test_lib/test_injector"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/test_lib/test_lib";
  var DOM,
      StringMapWrapper,
      global,
      bind,
      ExceptionHandler,
      createTestInjector,
      FunctionWithParamTokens,
      inject,
      _global,
      afterEach,
      expect,
      IS_DARTIUM,
      AsyncTestCompleter,
      jsmBeforeEach,
      jsmDescribe,
      jsmDDescribe,
      jsmXDescribe,
      jsmIt,
      jsmIIt,
      jsmXIt,
      runnerStack,
      inIt,
      testBindings,
      BeforeEachRunner,
      SpyObject;
  function proxy() {
    return (function(t) {
      return t;
    });
  }
  function _describe(jsmFn) {
    for (var args = [],
        $__1 = 1; $__1 < arguments.length; $__1++)
      args[$__1 - 1] = arguments[$__1];
    var parentRunner = runnerStack.length === 0 ? null : runnerStack[runnerStack.length - 1];
    var runner = new BeforeEachRunner(parentRunner);
    runnerStack.push(runner);
    var suite = jsmFn.apply((void 0), $traceurRuntime.spread(args));
    runnerStack.pop();
    return suite;
  }
  function describe() {
    for (var args = [],
        $__2 = 0; $__2 < arguments.length; $__2++)
      args[$__2] = arguments[$__2];
    return _describe.apply((void 0), $traceurRuntime.spread([jsmDescribe], args));
  }
  function ddescribe() {
    for (var args = [],
        $__3 = 0; $__3 < arguments.length; $__3++)
      args[$__3] = arguments[$__3];
    return _describe.apply((void 0), $traceurRuntime.spread([jsmDDescribe], args));
  }
  function xdescribe() {
    for (var args = [],
        $__4 = 0; $__4 < arguments.length; $__4++)
      args[$__4] = arguments[$__4];
    return _describe.apply((void 0), $traceurRuntime.spread([jsmXDescribe], args));
  }
  function beforeEach(fn) {
    if (runnerStack.length > 0) {
      var runner = runnerStack[runnerStack.length - 1];
      if (!(fn instanceof FunctionWithParamTokens)) {
        fn = inject([], fn);
      }
      runner.beforeEach(fn);
    } else {
      jsmBeforeEach(fn);
    }
  }
  function beforeEachBindings(fn) {
    jsmBeforeEach((function() {
      var bindings = fn();
      if (!bindings)
        return ;
      testBindings = $traceurRuntime.spread(testBindings, bindings);
    }));
  }
  function _it(jsmFn, name, fn, timeOut) {
    var runner = runnerStack[runnerStack.length - 1];
    jsmFn(name, function(done) {
      var async = false;
      var completerBinding = bind(AsyncTestCompleter).toFactory((function() {
        if (!inIt)
          throw new Error('AsyncTestCompleter can only be injected in an "it()"');
        async = true;
        return new AsyncTestCompleter(done);
      }));
      var injector = createTestInjector($traceurRuntime.spread(testBindings, [completerBinding]));
      runner.run(injector);
      if (!(fn instanceof FunctionWithParamTokens)) {
        fn = inject([], fn);
      }
      inIt = true;
      fn.execute(injector);
      inIt = false;
      if (!async)
        done();
    }, timeOut);
  }
  function it(name, fn) {
    var timeOut = arguments[2] !== (void 0) ? arguments[2] : null;
    return _it(jsmIt, name, fn, timeOut);
  }
  function xit(name, fn) {
    var timeOut = arguments[2] !== (void 0) ? arguments[2] : null;
    return _it(jsmXIt, name, fn, timeOut);
  }
  function iit(name, fn) {
    var timeOut = arguments[2] !== (void 0) ? arguments[2] : null;
    return _it(jsmIIt, name, fn, timeOut);
  }
  function elementText(n) {
    var hasNodes = (function(n) {
      var children = DOM.childNodes(n);
      return children && children.length > 0;
    });
    if (n instanceof Array) {
      return n.map((function(nn) {
        return elementText(nn);
      })).join("");
    }
    if (DOM.isCommentNode(n)) {
      return '';
    }
    if (DOM.isElementNode(n) && DOM.tagName(n) == 'CONTENT') {
      return elementText(Array.prototype.slice.apply(DOM.getDistributedNodes(n)));
    }
    if (DOM.hasShadowRoot(n)) {
      return elementText(DOM.childNodesAsList(DOM.getShadowRoot(n)));
    }
    if (hasNodes(n)) {
      return elementText(DOM.childNodesAsList(n));
    }
    return DOM.getText(n);
  }
  function isInInnerZone() {
    return global.zone._innerZone === true;
  }
  $__export("proxy", proxy);
  $__export("describe", describe);
  $__export("ddescribe", ddescribe);
  $__export("xdescribe", xdescribe);
  $__export("beforeEach", beforeEach);
  $__export("beforeEachBindings", beforeEachBindings);
  $__export("it", it);
  $__export("xit", xit);
  $__export("iit", iit);
  $__export("isInInnerZone", isInInnerZone);
  return {
    setters: [function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      global = $__m.global;
    }, function($__m) {
      bind = $__m.bind;
    }, function($__m) {
      ExceptionHandler = $__m.ExceptionHandler;
    }, function($__m) {
      createTestInjector = $__m.createTestInjector;
      FunctionWithParamTokens = $__m.FunctionWithParamTokens;
      inject = $__m.inject;
      $__export("inject", $__m.inject);
    }],
    execute: function() {
      _global = (typeof window === 'undefined' ? global : window);
      afterEach = _global.afterEach;
      $__export("afterEach", afterEach);
      expect = _global.expect;
      $__export("expect", expect);
      IS_DARTIUM = false;
      $__export("IS_DARTIUM", IS_DARTIUM);
      AsyncTestCompleter = (function() {
        function AsyncTestCompleter(done) {
          this._done = done;
        }
        return ($traceurRuntime.createClass)(AsyncTestCompleter, {done: function() {
            this._done();
          }}, {});
      }());
      $__export("AsyncTestCompleter", AsyncTestCompleter);
      jsmBeforeEach = _global.beforeEach;
      jsmDescribe = _global.describe;
      jsmDDescribe = _global.fdescribe;
      jsmXDescribe = _global.xdescribe;
      jsmIt = _global.it;
      jsmIIt = _global.fit;
      jsmXIt = _global.xit;
      runnerStack = [];
      inIt = false;
      BeforeEachRunner = (function() {
        function BeforeEachRunner(parent) {
          this._fns = [];
          this._parent = parent;
        }
        return ($traceurRuntime.createClass)(BeforeEachRunner, {
          beforeEach: function(fn) {
            this._fns.push(fn);
          },
          run: function(injector) {
            if (this._parent)
              this._parent.run(injector);
            this._fns.forEach((function(fn) {
              return fn.execute(injector);
            }));
          }
        }, {});
      }());
      jsmBeforeEach((function() {
        testBindings = [];
      }));
      Map.prototype['jasmineToString'] = function() {
        var m = this;
        if (!m) {
          return '' + m;
        }
        var res = [];
        m.forEach((function(v, k) {
          res.push((k + ":" + v));
        }));
        return ("{ " + res.join(',') + " }");
      };
      _global.beforeEach(function() {
        jasmine.addMatchers({
          toEqual: function(util, customEqualityTesters) {
            return {compare: function(actual, expected) {
                return {pass: util.equals(actual, expected, [compareMap])};
              }};
            function compareMap(actual, expected) {
              if (actual instanceof Map) {
                var pass = actual.size === expected.size;
                if (pass) {
                  actual.forEach((function(v, k) {
                    pass = pass && util.equals(v, expected.get(k));
                  }));
                }
                return pass;
              } else {
                return undefined;
              }
            }
          },
          toBePromise: function() {
            return {compare: function(actual, expectedClass) {
                var pass = typeof actual === 'object' && typeof actual.then === 'function';
                return {
                  pass: pass,
                  get message() {
                    return 'Expected ' + actual + ' to be a promise';
                  }
                };
              }};
          },
          toBeAnInstanceOf: function() {
            return {compare: function(actual, expectedClass) {
                var pass = typeof actual === 'object' && actual instanceof expectedClass;
                return {
                  pass: pass,
                  get message() {
                    return 'Expected ' + actual + ' to be an instance of ' + expectedClass;
                  }
                };
              }};
          },
          toHaveText: function() {
            return {compare: function(actual, expectedText) {
                var actualText = elementText(actual);
                return {
                  pass: actualText == expectedText,
                  get message() {
                    return 'Expected ' + actualText + ' to be equal to ' + expectedText;
                  }
                };
              }};
          },
          toContainError: function() {
            return {compare: function(actual, expectedText) {
                var errorMessage = ExceptionHandler.exceptionToString(actual);
                return {
                  pass: errorMessage.indexOf(expectedText) > -1,
                  get message() {
                    return 'Expected ' + errorMessage + ' to contain ' + expectedText;
                  }
                };
              }};
          },
          toThrowErrorWith: function() {
            return {compare: function(actual, expectedText) {
                try {
                  actual();
                  return {
                    pass: false,
                    get message() {
                      return "Was expected to throw, but did not throw";
                    }
                  };
                } catch (e) {
                  var errorMessage = ExceptionHandler.exceptionToString(e);
                  return {
                    pass: errorMessage.indexOf(expectedText) > -1,
                    get message() {
                      return 'Expected ' + errorMessage + ' to contain ' + expectedText;
                    }
                  };
                }
              }};
          },
          toImplement: function() {
            return {compare: function(actualObject, expectedInterface) {
                var objProps = Object.keys(actualObject.constructor.prototype);
                var intProps = Object.keys(expectedInterface.prototype);
                var missedMethods = [];
                intProps.forEach((function(k) {
                  if (!actualObject.constructor.prototype[k])
                    missedMethods.push(k);
                }));
                return {
                  pass: missedMethods.length == 0,
                  get message() {
                    return 'Expected ' + actualObject + ' to have the following methods: ' + missedMethods.join(", ");
                  }
                };
              }};
          }
        });
      });
      SpyObject = (function() {
        function SpyObject() {
          var type = arguments[0] !== (void 0) ? arguments[0] : null;
          if (type) {
            for (var prop in type.prototype) {
              var m = null;
              try {
                m = type.prototype[prop];
              } catch (e) {}
              if (typeof m === 'function') {
                this.spy(prop);
              }
            }
          }
        }
        return ($traceurRuntime.createClass)(SpyObject, {
          noSuchMethod: function(args) {},
          spy: function(name) {
            if (!this[name]) {
              this[name] = this._createGuinnessCompatibleSpy(name);
            }
            return this[name];
          },
          rttsAssert: function(value) {
            return true;
          },
          _createGuinnessCompatibleSpy: function(name) {
            var newSpy = jasmine.createSpy(name);
            newSpy.andCallFake = newSpy.and.callFake;
            newSpy.andReturn = newSpy.and.returnValue;
            newSpy.reset = newSpy.calls.reset;
            newSpy.and.returnValue(null);
            return newSpy;
          }
        }, {stub: function() {
            var object = arguments[0] !== (void 0) ? arguments[0] : null;
            var config = arguments[1] !== (void 0) ? arguments[1] : null;
            var overrides = arguments[2] !== (void 0) ? arguments[2] : null;
            if (!(object instanceof SpyObject)) {
              overrides = config;
              config = object;
              object = new SpyObject();
            }
            var m = StringMapWrapper.merge(config, overrides);
            StringMapWrapper.forEach(m, (function(value, key) {
              object.spy(key).andReturn(value);
            }));
            return object;
          }});
      }());
      $__export("SpyObject", SpyObject);
    }
  };
});

System.register("angular2/test", ["angular2/src/test_lib/test_lib", "angular2/src/test_lib/test_component_builder", "angular2/src/test_lib/test_injector", "angular2/debug"], function($__export) {
  "use strict";
  var __moduleName = "angular2/test";
  var $__exportNames = {};
  var $__exportNames = {};
  var $__exportNames = {};
  var $__exportNames = {};
  return {
    setters: [function($__m) {
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
      Object.keys($__m).forEach(function(p) {
        if (!$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }, function($__m) {
      Object.keys($__m).forEach(function(p) {
        if (!$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }],
    execute: function() {}
  };
});

//# sourceMappingURL=test_lib.dev.js.map