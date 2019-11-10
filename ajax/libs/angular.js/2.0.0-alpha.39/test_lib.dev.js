"format register";
System.register("angular2/src/router/location_strategy", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var LocationStrategy = (function() {
    function LocationStrategy() {}
    return LocationStrategy;
  })();
  exports.LocationStrategy = LocationStrategy;
  global.define = __define;
  return module.exports;
});

System.register("angular2/src/core/compiler/xhr_mock", ["angular2/src/core/compiler/xhr", "angular2/src/core/facade/collection", "angular2/src/core/facade/lang", "angular2/src/core/facade/exceptions", "angular2/src/core/facade/async"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var xhr_1 = require("angular2/src/core/compiler/xhr");
  var collection_1 = require("angular2/src/core/facade/collection");
  var lang_1 = require("angular2/src/core/facade/lang");
  var exceptions_1 = require("angular2/src/core/facade/exceptions");
  var async_1 = require("angular2/src/core/facade/async");
  var MockXHR = (function(_super) {
    __extends(MockXHR, _super);
    function MockXHR() {
      _super.call(this);
      this._definitions = new collection_1.Map();
      this._expectations = [];
      this._requests = [];
    }
    MockXHR.prototype.get = function(url) {
      var request = new _PendingRequest(url);
      this._requests.push(request);
      return request.getPromise();
    };
    MockXHR.prototype.expect = function(url, response) {
      var expectation = new _Expectation(url, response);
      this._expectations.push(expectation);
    };
    MockXHR.prototype.when = function(url, response) {
      this._definitions.set(url, response);
    };
    MockXHR.prototype.flush = function() {
      if (this._requests.length === 0) {
        throw new exceptions_1.BaseException('No pending requests to flush');
      }
      do {
        var request = collection_1.ListWrapper.removeAt(this._requests, 0);
        this._processRequest(request);
      } while (this._requests.length > 0);
      this.verifyNoOustandingExpectations();
    };
    MockXHR.prototype.verifyNoOustandingExpectations = function() {
      if (this._expectations.length === 0)
        return ;
      var urls = [];
      for (var i = 0; i < this._expectations.length; i++) {
        var expectation = this._expectations[i];
        urls.push(expectation.url);
      }
      throw new exceptions_1.BaseException("Unsatisfied requests: " + collection_1.ListWrapper.join(urls, ', '));
    };
    MockXHR.prototype._processRequest = function(request) {
      var url = request.url;
      if (this._expectations.length > 0) {
        var expectation = this._expectations[0];
        if (expectation.url == url) {
          collection_1.ListWrapper.remove(this._expectations, expectation);
          request.complete(expectation.response);
          return ;
        }
      }
      if (this._definitions.has(url)) {
        var response = this._definitions.get(url);
        request.complete(lang_1.normalizeBlank(response));
        return ;
      }
      throw new exceptions_1.BaseException("Unexpected request " + url);
    };
    return MockXHR;
  })(xhr_1.XHR);
  exports.MockXHR = MockXHR;
  var _PendingRequest = (function() {
    function _PendingRequest(url) {
      this.url = url;
      this.completer = async_1.PromiseWrapper.completer();
    }
    _PendingRequest.prototype.complete = function(response) {
      if (lang_1.isBlank(response)) {
        this.completer.reject("Failed to load " + this.url, null);
      } else {
        this.completer.resolve(response);
      }
    };
    _PendingRequest.prototype.getPromise = function() {
      return this.completer.promise;
    };
    return _PendingRequest;
  })();
  var _Expectation = (function() {
    function _Expectation(url, response) {
      this.url = url;
      this.response = response;
    }
    return _Expectation;
  })();
  global.define = __define;
  return module.exports;
});

System.register("angular2/src/mock/mock_location_strategy", ["angular2/src/core/facade/async", "angular2/src/router/location_strategy"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var async_1 = require("angular2/src/core/facade/async");
  var location_strategy_1 = require("angular2/src/router/location_strategy");
  var MockLocationStrategy = (function(_super) {
    __extends(MockLocationStrategy, _super);
    function MockLocationStrategy() {
      _super.call(this);
      this.internalBaseHref = '/';
      this.internalPath = '/';
      this.internalTitle = '';
      this.urlChanges = [];
      this._subject = new async_1.EventEmitter();
    }
    MockLocationStrategy.prototype.simulatePopState = function(url) {
      this.internalPath = url;
      async_1.ObservableWrapper.callNext(this._subject, null);
    };
    MockLocationStrategy.prototype.path = function() {
      return this.internalPath;
    };
    MockLocationStrategy.prototype.simulateUrlPop = function(pathname) {
      async_1.ObservableWrapper.callNext(this._subject, {'url': pathname});
    };
    MockLocationStrategy.prototype.pushState = function(ctx, title, url) {
      this.internalTitle = title;
      this.internalPath = url;
      this.urlChanges.push(url);
    };
    MockLocationStrategy.prototype.onPopState = function(fn) {
      async_1.ObservableWrapper.subscribe(this._subject, fn);
    };
    MockLocationStrategy.prototype.getBaseHref = function() {
      return this.internalBaseHref;
    };
    MockLocationStrategy.prototype.back = function() {
      if (this.urlChanges.length > 0) {
        this.urlChanges.pop();
        var nextUrl = this.urlChanges.length > 0 ? this.urlChanges[this.urlChanges.length - 1] : '';
        this.simulatePopState(nextUrl);
      }
    };
    MockLocationStrategy.prototype.forward = function() {
      throw 'not implemented';
    };
    return MockLocationStrategy;
  })(location_strategy_1.LocationStrategy);
  exports.MockLocationStrategy = MockLocationStrategy;
  global.define = __define;
  return module.exports;
});

System.register("angular2/src/mock/view_resolver_mock", ["angular2/src/core/facade/collection", "angular2/src/core/facade/lang", "angular2/src/core/facade/exceptions", "angular2/src/core/metadata", "angular2/src/core/linker/view_resolver"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var collection_1 = require("angular2/src/core/facade/collection");
  var lang_1 = require("angular2/src/core/facade/lang");
  var exceptions_1 = require("angular2/src/core/facade/exceptions");
  var metadata_1 = require("angular2/src/core/metadata");
  var view_resolver_1 = require("angular2/src/core/linker/view_resolver");
  var MockViewResolver = (function(_super) {
    __extends(MockViewResolver, _super);
    function MockViewResolver() {
      _super.call(this);
      this._views = new collection_1.Map();
      this._inlineTemplates = new collection_1.Map();
      this._viewCache = new collection_1.Map();
      this._directiveOverrides = new collection_1.Map();
    }
    MockViewResolver.prototype.setView = function(component, view) {
      this._checkOverrideable(component);
      this._views.set(component, view);
    };
    MockViewResolver.prototype.setInlineTemplate = function(component, template) {
      this._checkOverrideable(component);
      this._inlineTemplates.set(component, template);
    };
    MockViewResolver.prototype.overrideViewDirective = function(component, from, to) {
      this._checkOverrideable(component);
      var overrides = this._directiveOverrides.get(component);
      if (lang_1.isBlank(overrides)) {
        overrides = new collection_1.Map();
        this._directiveOverrides.set(component, overrides);
      }
      overrides.set(from, to);
    };
    MockViewResolver.prototype.resolve = function(component) {
      var view = this._viewCache.get(component);
      if (lang_1.isPresent(view))
        return view;
      view = this._views.get(component);
      if (lang_1.isBlank(view)) {
        view = _super.prototype.resolve.call(this, component);
      }
      var directives = view.directives;
      var overrides = this._directiveOverrides.get(component);
      if (lang_1.isPresent(overrides) && lang_1.isPresent(directives)) {
        directives = collection_1.ListWrapper.clone(view.directives);
        collection_1.MapWrapper.forEach(overrides, function(to, from) {
          var srcIndex = directives.indexOf(from);
          if (srcIndex == -1) {
            throw new exceptions_1.BaseException("Overriden directive " + lang_1.stringify(from) + " not found in the template of " + lang_1.stringify(component));
          }
          directives[srcIndex] = to;
        });
        view = new metadata_1.ViewMetadata({
          template: view.template,
          templateUrl: view.templateUrl,
          directives: directives
        });
      }
      var inlineTemplate = this._inlineTemplates.get(component);
      if (lang_1.isPresent(inlineTemplate)) {
        view = new metadata_1.ViewMetadata({
          template: inlineTemplate,
          templateUrl: null,
          directives: view.directives
        });
      }
      this._viewCache.set(component, view);
      return view;
    };
    MockViewResolver.prototype._checkOverrideable = function(component) {
      var cached = this._viewCache.get(component);
      if (lang_1.isPresent(cached)) {
        throw new exceptions_1.BaseException("The component " + lang_1.stringify(component) + " has already been compiled, its configuration can not be changed");
      }
    };
    return MockViewResolver;
  })(view_resolver_1.ViewResolver);
  exports.MockViewResolver = MockViewResolver;
  global.define = __define;
  return module.exports;
});

System.register("angular2/mock", ["angular2/src/mock/mock_location_strategy", "angular2/src/router/location_strategy", "angular2/src/mock/view_resolver_mock", "angular2/src/core/compiler/xhr_mock"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  __export(require("angular2/src/mock/mock_location_strategy"));
  var location_strategy_1 = require("angular2/src/router/location_strategy");
  exports.LocationStrategy = location_strategy_1.LocationStrategy;
  var view_resolver_mock_1 = require("angular2/src/mock/view_resolver_mock");
  exports.MockViewResolver = view_resolver_mock_1.MockViewResolver;
  var xhr_mock_1 = require("angular2/src/core/compiler/xhr_mock");
  exports.MockXHR = xhr_mock_1.MockXHR;
  global.define = __define;
  return module.exports;
});

System.register("angular2/src/mock/animation_builder_mock", ["angular2/src/core/di", "angular2/src/animate/animation_builder", "angular2/src/animate/css_animation_builder", "angular2/src/animate/animation", "angular2/src/animate/browser_details"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
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
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var di_1 = require("angular2/src/core/di");
  var animation_builder_1 = require("angular2/src/animate/animation_builder");
  var css_animation_builder_1 = require("angular2/src/animate/css_animation_builder");
  var animation_1 = require("angular2/src/animate/animation");
  var browser_details_1 = require("angular2/src/animate/browser_details");
  var MockAnimationBuilder = (function(_super) {
    __extends(MockAnimationBuilder, _super);
    function MockAnimationBuilder() {
      _super.call(this, null);
    }
    MockAnimationBuilder.prototype.css = function() {
      return new MockCssAnimationBuilder();
    };
    MockAnimationBuilder = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [])], MockAnimationBuilder);
    return MockAnimationBuilder;
  })(animation_builder_1.AnimationBuilder);
  exports.MockAnimationBuilder = MockAnimationBuilder;
  var MockCssAnimationBuilder = (function(_super) {
    __extends(MockCssAnimationBuilder, _super);
    function MockCssAnimationBuilder() {
      _super.call(this, null);
    }
    MockCssAnimationBuilder.prototype.start = function(element) {
      return new MockAnimation(element, this.data);
    };
    return MockCssAnimationBuilder;
  })(css_animation_builder_1.CssAnimationBuilder);
  var MockBrowserAbstraction = (function(_super) {
    __extends(MockBrowserAbstraction, _super);
    function MockBrowserAbstraction() {
      _super.apply(this, arguments);
    }
    MockBrowserAbstraction.prototype.doesElapsedTimeIncludesDelay = function() {
      this.elapsedTimeIncludesDelay = false;
    };
    return MockBrowserAbstraction;
  })(browser_details_1.BrowserDetails);
  var MockAnimation = (function(_super) {
    __extends(MockAnimation, _super);
    function MockAnimation(element, data) {
      _super.call(this, element, data, new MockBrowserAbstraction());
    }
    MockAnimation.prototype.wait = function(callback) {
      this._callback = callback;
    };
    MockAnimation.prototype.flush = function() {
      this._callback(0);
      this._callback = null;
    };
    return MockAnimation;
  })(animation_1.Animation);
  global.define = __define;
  return module.exports;
});

System.register("angular2/src/mock/directive_resolver_mock", ["angular2/src/core/facade/collection", "angular2/src/core/facade/lang", "angular2/src/core/metadata", "angular2/src/core/linker/directive_resolver"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var collection_1 = require("angular2/src/core/facade/collection");
  var lang_1 = require("angular2/src/core/facade/lang");
  var metadata_1 = require("angular2/src/core/metadata");
  var directive_resolver_1 = require("angular2/src/core/linker/directive_resolver");
  var MockDirectiveResolver = (function(_super) {
    __extends(MockDirectiveResolver, _super);
    function MockDirectiveResolver() {
      _super.apply(this, arguments);
      this._bindingsOverrides = new collection_1.Map();
      this._viewBindingsOverrides = new collection_1.Map();
    }
    MockDirectiveResolver.prototype.resolve = function(type) {
      var dm = _super.prototype.resolve.call(this, type);
      var bindingsOverride = this._bindingsOverrides.get(type);
      var viewBindingsOverride = this._viewBindingsOverrides.get(type);
      var bindings = dm.bindings;
      if (lang_1.isPresent(bindingsOverride)) {
        bindings = dm.bindings.concat(bindingsOverride);
      }
      if (dm instanceof metadata_1.ComponentMetadata) {
        var viewBindings = dm.viewBindings;
        if (lang_1.isPresent(viewBindingsOverride)) {
          viewBindings = dm.viewBindings.concat(viewBindingsOverride);
        }
        return new metadata_1.ComponentMetadata({
          selector: dm.selector,
          inputs: dm.inputs,
          outputs: dm.outputs,
          host: dm.host,
          bindings: bindings,
          exportAs: dm.exportAs,
          moduleId: dm.moduleId,
          queries: dm.queries,
          changeDetection: dm.changeDetection,
          viewBindings: viewBindings
        });
      }
      return new metadata_1.DirectiveMetadata({
        selector: dm.selector,
        inputs: dm.inputs,
        outputs: dm.outputs,
        host: dm.host,
        bindings: bindings,
        exportAs: dm.exportAs,
        moduleId: dm.moduleId,
        queries: dm.queries
      });
    };
    MockDirectiveResolver.prototype.setBindingsOverride = function(type, bindings) {
      this._bindingsOverrides.set(type, bindings);
    };
    MockDirectiveResolver.prototype.setViewBindingsOverride = function(type, viewBindings) {
      this._viewBindingsOverrides.set(type, viewBindings);
    };
    return MockDirectiveResolver;
  })(directive_resolver_1.DirectiveResolver);
  exports.MockDirectiveResolver = MockDirectiveResolver;
  global.define = __define;
  return module.exports;
});

System.register("angular2/src/mock/ng_zone_mock", ["angular2/src/core/zone/ng_zone"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var ng_zone_1 = require("angular2/src/core/zone/ng_zone");
  var MockNgZone = (function(_super) {
    __extends(MockNgZone, _super);
    function MockNgZone() {
      _super.call(this, {enableLongStackTrace: false});
    }
    MockNgZone.prototype.run = function(fn) {
      return fn();
    };
    MockNgZone.prototype.runOutsideAngular = function(fn) {
      return fn();
    };
    MockNgZone.prototype.overrideOnEventDone = function(fn, opt_waitForAsync) {
      if (opt_waitForAsync === void 0) {
        opt_waitForAsync = false;
      }
      this._onEventDone = fn;
    };
    MockNgZone.prototype.simulateZoneExit = function() {
      this._onEventDone();
    };
    return MockNgZone;
  })(ng_zone_1.NgZone);
  exports.MockNgZone = MockNgZone;
  global.define = __define;
  return module.exports;
});

System.register("angular2/src/test_lib/utils", ["angular2/src/core/facade/collection", "angular2/src/core/dom/dom_adapter", "angular2/src/core/facade/lang"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var collection_1 = require("angular2/src/core/facade/collection");
  var dom_adapter_1 = require("angular2/src/core/dom/dom_adapter");
  var lang_1 = require("angular2/src/core/facade/lang");
  var Log = (function() {
    function Log() {
      this._result = [];
    }
    Log.prototype.add = function(value) {
      this._result.push(value);
    };
    Log.prototype.fn = function(value) {
      var _this = this;
      return function(a1, a2, a3, a4, a5) {
        if (a1 === void 0) {
          a1 = null;
        }
        if (a2 === void 0) {
          a2 = null;
        }
        if (a3 === void 0) {
          a3 = null;
        }
        if (a4 === void 0) {
          a4 = null;
        }
        if (a5 === void 0) {
          a5 = null;
        }
        _this._result.push(value);
      };
    };
    Log.prototype.clear = function() {
      this._result = [];
    };
    Log.prototype.result = function() {
      return collection_1.ListWrapper.join(this._result, "; ");
    };
    return Log;
  })();
  exports.Log = Log;
  var BrowserDetection = (function() {
    function BrowserDetection(ua) {
      if (lang_1.isPresent(ua)) {
        this._ua = ua;
      } else {
        this._ua = lang_1.isPresent(dom_adapter_1.DOM) ? dom_adapter_1.DOM.getUserAgent() : '';
      }
    }
    Object.defineProperty(BrowserDetection.prototype, "isFirefox", {
      get: function() {
        return this._ua.indexOf('Firefox') > -1;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isAndroid", {
      get: function() {
        return this._ua.indexOf('Mozilla/5.0') > -1 && this._ua.indexOf('Android') > -1 && this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Chrome') == -1;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isEdge", {
      get: function() {
        return this._ua.indexOf('Edge') > -1;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isIE", {
      get: function() {
        return this._ua.indexOf('Trident') > -1;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isWebkit", {
      get: function() {
        return this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Edge') == -1;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isIOS7", {
      get: function() {
        return this._ua.indexOf('iPhone OS 7') > -1 || this._ua.indexOf('iPad OS 7') > -1;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isSlow", {
      get: function() {
        return this.isAndroid || this.isIE || this.isIOS7;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "supportsIntlApi", {
      get: function() {
        return this._ua.indexOf('Chrome/4') > -1 && this._ua.indexOf('Edge') == -1;
      },
      enumerable: true,
      configurable: true
    });
    return BrowserDetection;
  })();
  exports.BrowserDetection = BrowserDetection;
  exports.browserDetection = new BrowserDetection(null);
  function dispatchEvent(element, eventType) {
    dom_adapter_1.DOM.dispatchEvent(element, dom_adapter_1.DOM.createEvent(eventType));
  }
  exports.dispatchEvent = dispatchEvent;
  function el(html) {
    return dom_adapter_1.DOM.firstChild(dom_adapter_1.DOM.content(dom_adapter_1.DOM.createTemplate(html)));
  }
  exports.el = el;
  var _RE_SPECIAL_CHARS = ['-', '[', ']', '/', '{', '}', '\\', '(', ')', '*', '+', '?', '.', '^', '$', '|'];
  var _ESCAPE_RE = lang_1.RegExpWrapper.create("[\\" + _RE_SPECIAL_CHARS.join('\\') + "]");
  function containsRegexp(input) {
    return lang_1.RegExpWrapper.create(lang_1.StringWrapper.replaceAllMapped(input, _ESCAPE_RE, function(match) {
      return ("\\" + match[0]);
    }));
  }
  exports.containsRegexp = containsRegexp;
  function normalizeCSS(css) {
    css = lang_1.StringWrapper.replaceAll(css, /\s+/g, ' ');
    css = lang_1.StringWrapper.replaceAll(css, /:\s/g, ':');
    css = lang_1.StringWrapper.replaceAll(css, /'/g, '"');
    css = lang_1.StringWrapper.replaceAll(css, / }/g, '}');
    css = lang_1.StringWrapper.replaceAllMapped(css, /url\(\"(.+)\\"\)/g, function(match) {
      return ("url(" + match[1] + ")");
    });
    css = lang_1.StringWrapper.replaceAllMapped(css, /\[(.+)=([^"\]]+)\]/g, function(match) {
      return ("[" + match[1] + "=\"" + match[2] + "\"]");
    });
    return css;
  }
  exports.normalizeCSS = normalizeCSS;
  var _singleTagWhitelist = ['br', 'hr', 'input'];
  function stringifyElement(el) {
    var result = '';
    if (dom_adapter_1.DOM.isElementNode(el)) {
      var tagName = lang_1.StringWrapper.toLowerCase(dom_adapter_1.DOM.tagName(el));
      result += "<" + tagName;
      var attributeMap = dom_adapter_1.DOM.attributeMap(el);
      var keys = [];
      collection_1.MapWrapper.forEach(attributeMap, function(v, k) {
        keys.push(k);
      });
      collection_1.ListWrapper.sort(keys);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var attValue = attributeMap.get(key);
        if (!lang_1.isString(attValue)) {
          result += " " + key;
        } else {
          result += " " + key + "=\"" + attValue + "\"";
        }
      }
      result += '>';
      var childrenRoot = dom_adapter_1.DOM.templateAwareRoot(el);
      var children = lang_1.isPresent(childrenRoot) ? dom_adapter_1.DOM.childNodes(childrenRoot) : [];
      for (var j = 0; j < children.length; j++) {
        result += stringifyElement(children[j]);
      }
      if (!collection_1.ListWrapper.contains(_singleTagWhitelist, tagName)) {
        result += "</" + tagName + ">";
      }
    } else if (dom_adapter_1.DOM.isCommentNode(el)) {
      result += "<!--" + dom_adapter_1.DOM.nodeValue(el) + "-->";
    } else {
      result += dom_adapter_1.DOM.getText(el);
    }
    return result;
  }
  exports.stringifyElement = stringifyElement;
  global.define = __define;
  return module.exports;
});

System.register("angular2/src/web_workers/shared/api", ["angular2/src/core/facade/lang", "angular2/src/core/di"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var lang_1 = require("angular2/src/core/facade/lang");
  var di_1 = require("angular2/src/core/di");
  exports.ON_WEB_WORKER = lang_1.CONST_EXPR(new di_1.OpaqueToken('WebWorker.onWebWorker'));
  var WebWorkerElementRef = (function() {
    function WebWorkerElementRef(renderView, boundElementIndex) {
      this.renderView = renderView;
      this.boundElementIndex = boundElementIndex;
    }
    return WebWorkerElementRef;
  })();
  exports.WebWorkerElementRef = WebWorkerElementRef;
  var WebWorkerTemplateCmd = (function() {
    function WebWorkerTemplateCmd() {}
    WebWorkerTemplateCmd.prototype.visit = function(visitor, context) {
      return null;
    };
    return WebWorkerTemplateCmd;
  })();
  exports.WebWorkerTemplateCmd = WebWorkerTemplateCmd;
  var WebWorkerTextCmd = (function() {
    function WebWorkerTextCmd(isBound, ngContentIndex, value) {
      this.isBound = isBound;
      this.ngContentIndex = ngContentIndex;
      this.value = value;
    }
    WebWorkerTextCmd.prototype.visit = function(visitor, context) {
      return visitor.visitText(this, context);
    };
    return WebWorkerTextCmd;
  })();
  exports.WebWorkerTextCmd = WebWorkerTextCmd;
  var WebWorkerNgContentCmd = (function() {
    function WebWorkerNgContentCmd(ngContentIndex) {
      this.ngContentIndex = ngContentIndex;
    }
    WebWorkerNgContentCmd.prototype.visit = function(visitor, context) {
      return visitor.visitNgContent(this, context);
    };
    return WebWorkerNgContentCmd;
  })();
  exports.WebWorkerNgContentCmd = WebWorkerNgContentCmd;
  var WebWorkerBeginElementCmd = (function() {
    function WebWorkerBeginElementCmd(isBound, ngContentIndex, name, attrNameAndValues, eventTargetAndNames) {
      this.isBound = isBound;
      this.ngContentIndex = ngContentIndex;
      this.name = name;
      this.attrNameAndValues = attrNameAndValues;
      this.eventTargetAndNames = eventTargetAndNames;
    }
    WebWorkerBeginElementCmd.prototype.visit = function(visitor, context) {
      return visitor.visitBeginElement(this, context);
    };
    return WebWorkerBeginElementCmd;
  })();
  exports.WebWorkerBeginElementCmd = WebWorkerBeginElementCmd;
  var WebWorkerEndElementCmd = (function() {
    function WebWorkerEndElementCmd() {}
    WebWorkerEndElementCmd.prototype.visit = function(visitor, context) {
      return visitor.visitEndElement(context);
    };
    return WebWorkerEndElementCmd;
  })();
  exports.WebWorkerEndElementCmd = WebWorkerEndElementCmd;
  var WebWorkerBeginComponentCmd = (function() {
    function WebWorkerBeginComponentCmd(isBound, ngContentIndex, name, attrNameAndValues, eventTargetAndNames, nativeShadow, templateId) {
      this.isBound = isBound;
      this.ngContentIndex = ngContentIndex;
      this.name = name;
      this.attrNameAndValues = attrNameAndValues;
      this.eventTargetAndNames = eventTargetAndNames;
      this.nativeShadow = nativeShadow;
      this.templateId = templateId;
    }
    WebWorkerBeginComponentCmd.prototype.visit = function(visitor, context) {
      return visitor.visitBeginComponent(this, context);
    };
    return WebWorkerBeginComponentCmd;
  })();
  exports.WebWorkerBeginComponentCmd = WebWorkerBeginComponentCmd;
  var WebWorkerEndComponentCmd = (function() {
    function WebWorkerEndComponentCmd() {}
    WebWorkerEndComponentCmd.prototype.visit = function(visitor, context) {
      return visitor.visitEndComponent(context);
    };
    return WebWorkerEndComponentCmd;
  })();
  exports.WebWorkerEndComponentCmd = WebWorkerEndComponentCmd;
  var WebWorkerEmbeddedTemplateCmd = (function() {
    function WebWorkerEmbeddedTemplateCmd(isBound, ngContentIndex, name, attrNameAndValues, eventTargetAndNames, isMerged, children) {
      this.isBound = isBound;
      this.ngContentIndex = ngContentIndex;
      this.name = name;
      this.attrNameAndValues = attrNameAndValues;
      this.eventTargetAndNames = eventTargetAndNames;
      this.isMerged = isMerged;
      this.children = children;
    }
    WebWorkerEmbeddedTemplateCmd.prototype.visit = function(visitor, context) {
      return visitor.visitEmbeddedTemplate(this, context);
    };
    return WebWorkerEmbeddedTemplateCmd;
  })();
  exports.WebWorkerEmbeddedTemplateCmd = WebWorkerEmbeddedTemplateCmd;
  global.define = __define;
  return module.exports;
});

System.register("angular2/src/web_workers/shared/render_proto_view_ref_store", ["angular2/src/core/di", "angular2/src/core/render/api", "angular2/src/web_workers/shared/api"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
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
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var di_1 = require("angular2/src/core/di");
  var api_1 = require("angular2/src/core/render/api");
  var api_2 = require("angular2/src/web_workers/shared/api");
  var RenderProtoViewRefStore = (function() {
    function RenderProtoViewRefStore(onWebworker) {
      this._lookupByIndex = new Map();
      this._lookupByProtoView = new Map();
      this._nextIndex = 0;
      this._onWebworker = onWebworker;
    }
    RenderProtoViewRefStore.prototype.allocate = function() {
      var index = this._nextIndex++;
      var result = new WebWorkerRenderProtoViewRef(index);
      this.store(result, index);
      return result;
    };
    RenderProtoViewRefStore.prototype.store = function(ref, index) {
      this._lookupByProtoView.set(ref, index);
      this._lookupByIndex.set(index, ref);
    };
    RenderProtoViewRefStore.prototype.deserialize = function(index) {
      if (index == null) {
        return null;
      }
      return this._lookupByIndex.get(index);
    };
    RenderProtoViewRefStore.prototype.serialize = function(ref) {
      if (ref == null) {
        return null;
      }
      if (this._onWebworker) {
        return ref.refNumber;
      } else {
        return this._lookupByProtoView.get(ref);
      }
    };
    RenderProtoViewRefStore = __decorate([di_1.Injectable(), __param(0, di_1.Inject(api_2.ON_WEB_WORKER)), __metadata('design:paramtypes', [Object])], RenderProtoViewRefStore);
    return RenderProtoViewRefStore;
  })();
  exports.RenderProtoViewRefStore = RenderProtoViewRefStore;
  var WebWorkerRenderProtoViewRef = (function(_super) {
    __extends(WebWorkerRenderProtoViewRef, _super);
    function WebWorkerRenderProtoViewRef(refNumber) {
      _super.call(this);
      this.refNumber = refNumber;
    }
    return WebWorkerRenderProtoViewRef;
  })(api_1.RenderProtoViewRef);
  exports.WebWorkerRenderProtoViewRef = WebWorkerRenderProtoViewRef;
  global.define = __define;
  return module.exports;
});

System.register("angular2/src/web_workers/shared/render_view_with_fragments_store", ["angular2/src/core/di", "angular2/src/core/render/api", "angular2/src/web_workers/shared/api", "angular2/src/core/facade/collection"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
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
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var di_1 = require("angular2/src/core/di");
  var api_1 = require("angular2/src/core/render/api");
  var api_2 = require("angular2/src/web_workers/shared/api");
  var collection_1 = require("angular2/src/core/facade/collection");
  var RenderViewWithFragmentsStore = (function() {
    function RenderViewWithFragmentsStore(onWebWorker) {
      this._nextIndex = 0;
      this._onWebWorker = onWebWorker;
      this._lookupByIndex = new Map();
      this._lookupByView = new Map();
      this._viewFragments = new Map();
    }
    RenderViewWithFragmentsStore.prototype.allocate = function(fragmentCount) {
      var initialIndex = this._nextIndex;
      var viewRef = new WebWorkerRenderViewRef(this._nextIndex++);
      var fragmentRefs = collection_1.ListWrapper.createGrowableSize(fragmentCount);
      for (var i = 0; i < fragmentCount; i++) {
        fragmentRefs[i] = new WebWorkerRenderFragmentRef(this._nextIndex++);
      }
      var renderViewWithFragments = new api_1.RenderViewWithFragments(viewRef, fragmentRefs);
      this.store(renderViewWithFragments, initialIndex);
      return renderViewWithFragments;
    };
    RenderViewWithFragmentsStore.prototype.store = function(view, startIndex) {
      var _this = this;
      this._lookupByIndex.set(startIndex, view.viewRef);
      this._lookupByView.set(view.viewRef, startIndex);
      startIndex++;
      collection_1.ListWrapper.forEach(view.fragmentRefs, function(ref) {
        _this._lookupByIndex.set(startIndex, ref);
        _this._lookupByView.set(ref, startIndex);
        startIndex++;
      });
      this._viewFragments.set(view.viewRef, view.fragmentRefs);
    };
    RenderViewWithFragmentsStore.prototype.remove = function(view) {
      var _this = this;
      this._removeRef(view);
      var fragments = this._viewFragments.get(view);
      fragments.forEach(function(fragment) {
        _this._removeRef(fragment);
      });
      collection_1.MapWrapper.delete(this._viewFragments, view);
    };
    RenderViewWithFragmentsStore.prototype._removeRef = function(ref) {
      var index = this._lookupByView.get(ref);
      collection_1.MapWrapper.delete(this._lookupByView, ref);
      collection_1.MapWrapper.delete(this._lookupByIndex, index);
    };
    RenderViewWithFragmentsStore.prototype.serializeRenderViewRef = function(viewRef) {
      return this._serializeRenderFragmentOrViewRef(viewRef);
    };
    RenderViewWithFragmentsStore.prototype.serializeRenderFragmentRef = function(fragmentRef) {
      return this._serializeRenderFragmentOrViewRef(fragmentRef);
    };
    RenderViewWithFragmentsStore.prototype.deserializeRenderViewRef = function(ref) {
      if (ref == null) {
        return null;
      }
      return this._retrieve(ref);
    };
    RenderViewWithFragmentsStore.prototype.deserializeRenderFragmentRef = function(ref) {
      if (ref == null) {
        return null;
      }
      return this._retrieve(ref);
    };
    RenderViewWithFragmentsStore.prototype._retrieve = function(ref) {
      if (ref == null) {
        return null;
      }
      if (!this._lookupByIndex.has(ref)) {
        return null;
      }
      return this._lookupByIndex.get(ref);
    };
    RenderViewWithFragmentsStore.prototype._serializeRenderFragmentOrViewRef = function(ref) {
      if (ref == null) {
        return null;
      }
      if (this._onWebWorker) {
        return ref.serialize();
      } else {
        return this._lookupByView.get(ref);
      }
    };
    RenderViewWithFragmentsStore.prototype.serializeViewWithFragments = function(view) {
      var _this = this;
      if (view == null) {
        return null;
      }
      if (this._onWebWorker) {
        return {
          'viewRef': view.viewRef.serialize(),
          'fragmentRefs': collection_1.ListWrapper.map(view.fragmentRefs, function(val) {
            return val.serialize();
          })
        };
      } else {
        return {
          'viewRef': this._lookupByView.get(view.viewRef),
          'fragmentRefs': collection_1.ListWrapper.map(view.fragmentRefs, function(val) {
            return _this._lookupByView.get(val);
          })
        };
      }
    };
    RenderViewWithFragmentsStore.prototype.deserializeViewWithFragments = function(obj) {
      var _this = this;
      if (obj == null) {
        return null;
      }
      var viewRef = this.deserializeRenderViewRef(obj['viewRef']);
      var fragments = collection_1.ListWrapper.map(obj['fragmentRefs'], function(val) {
        return _this.deserializeRenderFragmentRef(val);
      });
      return new api_1.RenderViewWithFragments(viewRef, fragments);
    };
    RenderViewWithFragmentsStore = __decorate([di_1.Injectable(), __param(0, di_1.Inject(api_2.ON_WEB_WORKER)), __metadata('design:paramtypes', [Object])], RenderViewWithFragmentsStore);
    return RenderViewWithFragmentsStore;
  })();
  exports.RenderViewWithFragmentsStore = RenderViewWithFragmentsStore;
  var WebWorkerRenderViewRef = (function(_super) {
    __extends(WebWorkerRenderViewRef, _super);
    function WebWorkerRenderViewRef(refNumber) {
      _super.call(this);
      this.refNumber = refNumber;
    }
    WebWorkerRenderViewRef.prototype.serialize = function() {
      return this.refNumber;
    };
    WebWorkerRenderViewRef.deserialize = function(ref) {
      return new WebWorkerRenderViewRef(ref);
    };
    return WebWorkerRenderViewRef;
  })(api_1.RenderViewRef);
  exports.WebWorkerRenderViewRef = WebWorkerRenderViewRef;
  var WebWorkerRenderFragmentRef = (function(_super) {
    __extends(WebWorkerRenderFragmentRef, _super);
    function WebWorkerRenderFragmentRef(refNumber) {
      _super.call(this);
      this.refNumber = refNumber;
    }
    WebWorkerRenderFragmentRef.prototype.serialize = function() {
      return this.refNumber;
    };
    WebWorkerRenderFragmentRef.deserialize = function(ref) {
      return new WebWorkerRenderFragmentRef(ref);
    };
    return WebWorkerRenderFragmentRef;
  })(api_1.RenderFragmentRef);
  exports.WebWorkerRenderFragmentRef = WebWorkerRenderFragmentRef;
  global.define = __define;
  return module.exports;
});

System.register("angular2/src/test_lib/fake_async", ["angular2/src/core/facade/lang", "angular2/src/core/facade/exceptions", "angular2/src/core/facade/collection"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var lang_1 = require("angular2/src/core/facade/lang");
  var exceptions_1 = require("angular2/src/core/facade/exceptions");
  var collection_1 = require("angular2/src/core/facade/collection");
  var _scheduler;
  var _microtasks = [];
  var _pendingPeriodicTimers = [];
  var _pendingTimers = [];
  function fakeAsync(fn) {
    if (lang_1.global.zone._inFakeAsyncZone) {
      throw new Error('fakeAsync() calls can not be nested');
    }
    var fakeAsyncZone = lang_1.global.zone.fork({
      setTimeout: _setTimeout,
      clearTimeout: _clearTimeout,
      setInterval: _setInterval,
      clearInterval: _clearInterval,
      scheduleMicrotask: _scheduleMicrotask,
      _inFakeAsyncZone: true
    });
    return function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
      }
      _scheduler = new jasmine.DelayedFunctionScheduler();
      clearPendingTimers();
      var res = fakeAsyncZone.run(function() {
        var res = fn.apply(void 0, args);
        flushMicrotasks();
        return res;
      });
      if (_pendingPeriodicTimers.length > 0) {
        throw new exceptions_1.BaseException(_pendingPeriodicTimers.length + " periodic timer(s) still in the queue.");
      }
      if (_pendingTimers.length > 0) {
        throw new exceptions_1.BaseException(_pendingTimers.length + " timer(s) still in the queue.");
      }
      _scheduler = null;
      collection_1.ListWrapper.clear(_microtasks);
      return res;
    };
  }
  exports.fakeAsync = fakeAsync;
  function clearPendingTimers() {
    collection_1.ListWrapper.clear(_microtasks);
    collection_1.ListWrapper.clear(_pendingPeriodicTimers);
    collection_1.ListWrapper.clear(_pendingTimers);
  }
  exports.clearPendingTimers = clearPendingTimers;
  function tick(millis) {
    if (millis === void 0) {
      millis = 0;
    }
    _assertInFakeAsyncZone();
    flushMicrotasks();
    _scheduler.tick(millis);
  }
  exports.tick = tick;
  function flushMicrotasks() {
    _assertInFakeAsyncZone();
    while (_microtasks.length > 0) {
      var microtask = collection_1.ListWrapper.removeAt(_microtasks, 0);
      microtask();
    }
  }
  exports.flushMicrotasks = flushMicrotasks;
  function _setTimeout(fn, delay) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    var cb = _fnAndFlush(fn);
    var id = _scheduler.scheduleFunction(cb, delay, args);
    _pendingTimers.push(id);
    _scheduler.scheduleFunction(_dequeueTimer(id), delay);
    return id;
  }
  function _clearTimeout(id) {
    _dequeueTimer(id);
    return _scheduler.removeFunctionWithId(id);
  }
  function _setInterval(fn, interval) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    var cb = _fnAndFlush(fn);
    var id = _scheduler.scheduleFunction(cb, interval, args, true);
    _pendingPeriodicTimers.push(id);
    return id;
  }
  function _clearInterval(id) {
    collection_1.ListWrapper.remove(_pendingPeriodicTimers, id);
    return _scheduler.removeFunctionWithId(id);
  }
  function _fnAndFlush(fn) {
    return function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
      }
      fn.apply(lang_1.global, args);
      flushMicrotasks();
    };
  }
  function _scheduleMicrotask(microtask) {
    _microtasks.push(microtask);
  }
  function _dequeueTimer(id) {
    return function() {
      collection_1.ListWrapper.remove(_pendingTimers, id);
    };
  }
  function _assertInFakeAsyncZone() {
    if (!lang_1.global.zone || !lang_1.global.zone._inFakeAsyncZone) {
      throw new Error('The code should be running in the fakeAsync zone to call this function');
    }
  }
  global.define = __define;
  return module.exports;
});

System.register("angular2/src/test_lib/test_component_builder", ["angular2/src/core/di", "angular2/src/core/facade/lang", "angular2/src/core/facade/collection", "angular2/src/core/linker/directive_resolver", "angular2/src/core/linker/view_resolver", "angular2/src/core/linker/view_ref", "angular2/src/core/linker/dynamic_component_loader", "angular2/src/test_lib/utils", "angular2/src/core/render/render", "angular2/src/core/dom/dom_adapter", "angular2/src/core/debug/debug_element"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
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
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var di_1 = require("angular2/src/core/di");
  var lang_1 = require("angular2/src/core/facade/lang");
  var collection_1 = require("angular2/src/core/facade/collection");
  var directive_resolver_1 = require("angular2/src/core/linker/directive_resolver");
  var view_resolver_1 = require("angular2/src/core/linker/view_resolver");
  var view_ref_1 = require("angular2/src/core/linker/view_ref");
  var dynamic_component_loader_1 = require("angular2/src/core/linker/dynamic_component_loader");
  var utils_1 = require("angular2/src/test_lib/utils");
  var render_1 = require("angular2/src/core/render/render");
  var dom_adapter_1 = require("angular2/src/core/dom/dom_adapter");
  var debug_element_1 = require("angular2/src/core/debug/debug_element");
  var RootTestComponent = (function() {
    function RootTestComponent(componentRef) {
      this.debugElement = new debug_element_1.DebugElement(view_ref_1.internalView(componentRef.hostView), 0);
      this._componentParentView = view_ref_1.internalView(componentRef.hostView);
      this._componentRef = componentRef;
    }
    RootTestComponent.prototype.detectChanges = function() {
      this._componentParentView.changeDetector.detectChanges();
      this._componentParentView.changeDetector.checkNoChanges();
    };
    RootTestComponent.prototype.destroy = function() {
      this._componentRef.dispose();
    };
    return RootTestComponent;
  })();
  exports.RootTestComponent = RootTestComponent;
  var _nextRootElementId = 0;
  var TestComponentBuilder = (function() {
    function TestComponentBuilder(_injector) {
      this._injector = _injector;
      this._bindingsOverrides = new Map();
      this._directiveOverrides = new Map();
      this._templateOverrides = new Map();
      this._viewBindingsOverrides = new Map();
      this._viewOverrides = new Map();
    }
    TestComponentBuilder.prototype._clone = function() {
      var clone = new TestComponentBuilder(this._injector);
      clone._viewOverrides = collection_1.MapWrapper.clone(this._viewOverrides);
      clone._directiveOverrides = collection_1.MapWrapper.clone(this._directiveOverrides);
      clone._templateOverrides = collection_1.MapWrapper.clone(this._templateOverrides);
      return clone;
    };
    TestComponentBuilder.prototype.overrideTemplate = function(componentType, template) {
      var clone = this._clone();
      clone._templateOverrides.set(componentType, template);
      return clone;
    };
    TestComponentBuilder.prototype.overrideView = function(componentType, view) {
      var clone = this._clone();
      clone._viewOverrides.set(componentType, view);
      return clone;
    };
    TestComponentBuilder.prototype.overrideDirective = function(componentType, from, to) {
      var clone = this._clone();
      var overridesForComponent = clone._directiveOverrides.get(componentType);
      if (!lang_1.isPresent(overridesForComponent)) {
        clone._directiveOverrides.set(componentType, new Map());
        overridesForComponent = clone._directiveOverrides.get(componentType);
      }
      overridesForComponent.set(from, to);
      return clone;
    };
    TestComponentBuilder.prototype.overrideBindings = function(type, bindings) {
      var clone = this._clone();
      clone._bindingsOverrides.set(type, bindings);
      return clone;
    };
    TestComponentBuilder.prototype.overrideViewBindings = function(type, bindings) {
      var clone = this._clone();
      clone._viewBindingsOverrides.set(type, bindings);
      return clone;
    };
    TestComponentBuilder.prototype.createAsync = function(rootComponentType) {
      var mockDirectiveResolver = this._injector.get(directive_resolver_1.DirectiveResolver);
      var mockViewResolver = this._injector.get(view_resolver_1.ViewResolver);
      collection_1.MapWrapper.forEach(this._viewOverrides, function(view, type) {
        mockViewResolver.setView(type, view);
      });
      collection_1.MapWrapper.forEach(this._templateOverrides, function(template, type) {
        mockViewResolver.setInlineTemplate(type, template);
      });
      collection_1.MapWrapper.forEach(this._directiveOverrides, function(overrides, component) {
        collection_1.MapWrapper.forEach(overrides, function(to, from) {
          mockViewResolver.overrideViewDirective(component, from, to);
        });
      });
      this._bindingsOverrides.forEach(function(bindings, type) {
        return mockDirectiveResolver.setBindingsOverride(type, bindings);
      });
      this._viewBindingsOverrides.forEach(function(bindings, type) {
        return mockDirectiveResolver.setViewBindingsOverride(type, bindings);
      });
      var rootElId = "root" + _nextRootElementId++;
      var rootEl = utils_1.el("<div id=\"" + rootElId + "\"></div>");
      var doc = this._injector.get(render_1.DOCUMENT);
      var oldRoots = dom_adapter_1.DOM.querySelectorAll(doc, '[id^=root]');
      for (var i = 0; i < oldRoots.length; i++) {
        dom_adapter_1.DOM.remove(oldRoots[i]);
      }
      dom_adapter_1.DOM.appendChild(doc.body, rootEl);
      return this._injector.get(dynamic_component_loader_1.DynamicComponentLoader).loadAsRoot(rootComponentType, "#" + rootElId, this._injector).then(function(componentRef) {
        return new RootTestComponent(componentRef);
      });
    };
    TestComponentBuilder = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [di_1.Injector])], TestComponentBuilder);
    return TestComponentBuilder;
  })();
  exports.TestComponentBuilder = TestComponentBuilder;
  global.define = __define;
  return module.exports;
});

System.register("angular2/src/web_workers/shared/serializer", ["angular2/src/core/facade/lang", "angular2/src/core/facade/exceptions", "angular2/src/core/facade/collection", "angular2/src/core/render/api", "angular2/src/web_workers/shared/api", "angular2/src/core/di", "angular2/src/web_workers/shared/render_proto_view_ref_store", "angular2/src/web_workers/shared/render_view_with_fragments_store"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
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
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var lang_1 = require("angular2/src/core/facade/lang");
  var exceptions_1 = require("angular2/src/core/facade/exceptions");
  var collection_1 = require("angular2/src/core/facade/collection");
  var api_1 = require("angular2/src/core/render/api");
  var api_2 = require("angular2/src/web_workers/shared/api");
  var di_1 = require("angular2/src/core/di");
  var render_proto_view_ref_store_1 = require("angular2/src/web_workers/shared/render_proto_view_ref_store");
  var render_view_with_fragments_store_1 = require("angular2/src/web_workers/shared/render_view_with_fragments_store");
  exports.PRIMITIVE = String;
  var Serializer = (function() {
    function Serializer(_protoViewStore, _renderViewStore) {
      this._protoViewStore = _protoViewStore;
      this._renderViewStore = _renderViewStore;
    }
    Serializer.prototype.serialize = function(obj, type) {
      var _this = this;
      if (!lang_1.isPresent(obj)) {
        return null;
      }
      if (lang_1.isArray(obj)) {
        var serializedObj = [];
        collection_1.ListWrapper.forEach(obj, function(val) {
          serializedObj.push(_this.serialize(val, type));
        });
        return serializedObj;
      }
      if (type == exports.PRIMITIVE) {
        return obj;
      }
      if (type == api_1.RenderProtoViewRef) {
        return this._protoViewStore.serialize(obj);
      } else if (type == api_1.RenderViewRef) {
        return this._renderViewStore.serializeRenderViewRef(obj);
      } else if (type == api_1.RenderFragmentRef) {
        return this._renderViewStore.serializeRenderFragmentRef(obj);
      } else if (type == api_2.WebWorkerElementRef) {
        return this._serializeWorkerElementRef(obj);
      } else if (type == api_2.WebWorkerTemplateCmd) {
        return serializeTemplateCmd(obj);
      } else {
        throw new exceptions_1.BaseException("No serializer for " + type.toString());
      }
    };
    Serializer.prototype.deserialize = function(map, type, data) {
      var _this = this;
      if (!lang_1.isPresent(map)) {
        return null;
      }
      if (lang_1.isArray(map)) {
        var obj = [];
        collection_1.ListWrapper.forEach(map, function(val) {
          obj.push(_this.deserialize(val, type, data));
        });
        return obj;
      }
      if (type == exports.PRIMITIVE) {
        return map;
      }
      if (type == api_1.RenderProtoViewRef) {
        return this._protoViewStore.deserialize(map);
      } else if (type == api_1.RenderViewRef) {
        return this._renderViewStore.deserializeRenderViewRef(map);
      } else if (type == api_1.RenderFragmentRef) {
        return this._renderViewStore.deserializeRenderFragmentRef(map);
      } else if (type == api_2.WebWorkerElementRef) {
        return this._deserializeWorkerElementRef(map);
      } else if (type == api_2.WebWorkerTemplateCmd) {
        return deserializeTemplateCmd(map);
      } else {
        throw new exceptions_1.BaseException("No deserializer for " + type.toString());
      }
    };
    Serializer.prototype.mapToObject = function(map, type) {
      var _this = this;
      var object = {};
      var serialize = lang_1.isPresent(type);
      collection_1.MapWrapper.forEach(map, function(value, key) {
        if (serialize) {
          object[key] = _this.serialize(value, type);
        } else {
          object[key] = value;
        }
      });
      return object;
    };
    Serializer.prototype.objectToMap = function(obj, type, data) {
      var _this = this;
      if (lang_1.isPresent(type)) {
        var map = new collection_1.Map();
        collection_1.StringMapWrapper.forEach(obj, function(val, key) {
          map.set(key, _this.deserialize(val, type, data));
        });
        return map;
      } else {
        return collection_1.MapWrapper.createFromStringMap(obj);
      }
    };
    Serializer.prototype.allocateRenderViews = function(fragmentCount) {
      this._renderViewStore.allocate(fragmentCount);
    };
    Serializer.prototype._serializeWorkerElementRef = function(elementRef) {
      return {
        'renderView': this.serialize(elementRef.renderView, api_1.RenderViewRef),
        'boundElementIndex': elementRef.boundElementIndex
      };
    };
    Serializer.prototype._deserializeWorkerElementRef = function(map) {
      return new api_2.WebWorkerElementRef(this.deserialize(map['renderView'], api_1.RenderViewRef), map['boundElementIndex']);
    };
    Serializer = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [render_proto_view_ref_store_1.RenderProtoViewRefStore, render_view_with_fragments_store_1.RenderViewWithFragmentsStore])], Serializer);
    return Serializer;
  })();
  exports.Serializer = Serializer;
  function serializeTemplateCmd(cmd) {
    return cmd.visit(RENDER_TEMPLATE_CMD_SERIALIZER, null);
  }
  function deserializeTemplateCmd(data) {
    return RENDER_TEMPLATE_CMD_DESERIALIZERS[data['deserializerIndex']](data);
  }
  var RenderTemplateCmdSerializer = (function() {
    function RenderTemplateCmdSerializer() {}
    RenderTemplateCmdSerializer.prototype.visitText = function(cmd, context) {
      return {
        'deserializerIndex': 0,
        'isBound': cmd.isBound,
        'ngContentIndex': cmd.ngContentIndex,
        'value': cmd.value
      };
    };
    RenderTemplateCmdSerializer.prototype.visitNgContent = function(cmd, context) {
      return {
        'deserializerIndex': 1,
        'ngContentIndex': cmd.ngContentIndex
      };
    };
    RenderTemplateCmdSerializer.prototype.visitBeginElement = function(cmd, context) {
      return {
        'deserializerIndex': 2,
        'isBound': cmd.isBound,
        'ngContentIndex': cmd.ngContentIndex,
        'name': cmd.name,
        'attrNameAndValues': cmd.attrNameAndValues,
        'eventTargetAndNames': cmd.eventTargetAndNames
      };
    };
    RenderTemplateCmdSerializer.prototype.visitEndElement = function(context) {
      return {'deserializerIndex': 3};
    };
    RenderTemplateCmdSerializer.prototype.visitBeginComponent = function(cmd, context) {
      return {
        'deserializerIndex': 4,
        'isBound': cmd.isBound,
        'ngContentIndex': cmd.ngContentIndex,
        'name': cmd.name,
        'attrNameAndValues': cmd.attrNameAndValues,
        'eventTargetAndNames': cmd.eventTargetAndNames,
        'nativeShadow': cmd.nativeShadow,
        'templateId': cmd.templateId
      };
    };
    RenderTemplateCmdSerializer.prototype.visitEndComponent = function(context) {
      return {'deserializerIndex': 5};
    };
    RenderTemplateCmdSerializer.prototype.visitEmbeddedTemplate = function(cmd, context) {
      var _this = this;
      var children = cmd.children.map(function(child) {
        return child.visit(_this, null);
      });
      return {
        'deserializerIndex': 6,
        'isBound': cmd.isBound,
        'ngContentIndex': cmd.ngContentIndex,
        'name': cmd.name,
        'attrNameAndValues': cmd.attrNameAndValues,
        'eventTargetAndNames': cmd.eventTargetAndNames,
        'isMerged': cmd.isMerged,
        'children': children
      };
    };
    return RenderTemplateCmdSerializer;
  })();
  var RENDER_TEMPLATE_CMD_SERIALIZER = new RenderTemplateCmdSerializer();
  var RENDER_TEMPLATE_CMD_DESERIALIZERS = [function(data) {
    return new api_2.WebWorkerTextCmd(data['isBound'], data['ngContentIndex'], data['value']);
  }, function(data) {
    return new api_2.WebWorkerNgContentCmd(data['ngContentIndex']);
  }, function(data) {
    return new api_2.WebWorkerBeginElementCmd(data['isBound'], data['ngContentIndex'], data['name'], data['attrNameAndValues'], data['eventTargetAndNames']);
  }, function(data) {
    return new api_2.WebWorkerEndElementCmd();
  }, function(data) {
    return new api_2.WebWorkerBeginComponentCmd(data['isBound'], data['ngContentIndex'], data['name'], data['attrNameAndValues'], data['eventTargetAndNames'], data['nativeShadow'], data['templateId']);
  }, function(data) {
    return new api_2.WebWorkerEndComponentCmd();
  }, function(data) {
    return new api_2.WebWorkerEmbeddedTemplateCmd(data['isBound'], data['ngContentIndex'], data['name'], data['attrNameAndValues'], data['eventTargetAndNames'], data['isMerged'], data['children'].map(function(childData) {
      return deserializeTemplateCmd(childData);
    }));
  }];
  global.define = __define;
  return module.exports;
});

System.register("angular2/src/test_lib/test_injector", ["angular2/src/core/di", "angular2/src/core/pipes", "angular2/src/animate/animation_builder", "angular2/src/mock/animation_builder_mock", "angular2/src/core/linker/proto_view_factory", "angular2/src/core/reflection/reflection", "angular2/src/core/change_detection/change_detection", "angular2/src/core/facade/exceptions", "angular2/src/core/linker/view_resolver", "angular2/src/core/linker/directive_resolver", "angular2/src/core/linker/pipe_resolver", "angular2/src/core/linker/dynamic_component_loader", "angular2/src/core/compiler/xhr", "angular2/src/core/zone/ng_zone", "angular2/src/core/dom/dom_adapter", "angular2/src/core/render/dom/events/event_manager", "angular2/src/mock/directive_resolver_mock", "angular2/src/mock/view_resolver_mock", "angular2/src/core/compiler/xhr_mock", "angular2/src/mock/mock_location_strategy", "angular2/src/router/location_strategy", "angular2/src/mock/ng_zone_mock", "angular2/src/test_lib/test_component_builder", "angular2/src/core/di", "angular2/src/core/debug", "angular2/src/core/facade/collection", "angular2/src/core/facade/lang", "angular2/src/core/linker/view_pool", "angular2/src/core/linker/view_manager", "angular2/src/core/linker/view_manager_utils", "angular2/src/core/render/api", "angular2/src/core/render/render", "angular2/src/core/application_tokens", "angular2/src/web_workers/shared/serializer", "angular2/src/test_lib/utils", "angular2/src/core/compiler/compiler"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var di_1 = require("angular2/src/core/di");
  var pipes_1 = require("angular2/src/core/pipes");
  var animation_builder_1 = require("angular2/src/animate/animation_builder");
  var animation_builder_mock_1 = require("angular2/src/mock/animation_builder_mock");
  var proto_view_factory_1 = require("angular2/src/core/linker/proto_view_factory");
  var reflection_1 = require("angular2/src/core/reflection/reflection");
  var change_detection_1 = require("angular2/src/core/change_detection/change_detection");
  var exceptions_1 = require("angular2/src/core/facade/exceptions");
  var view_resolver_1 = require("angular2/src/core/linker/view_resolver");
  var directive_resolver_1 = require("angular2/src/core/linker/directive_resolver");
  var pipe_resolver_1 = require("angular2/src/core/linker/pipe_resolver");
  var dynamic_component_loader_1 = require("angular2/src/core/linker/dynamic_component_loader");
  var xhr_1 = require("angular2/src/core/compiler/xhr");
  var ng_zone_1 = require("angular2/src/core/zone/ng_zone");
  var dom_adapter_1 = require("angular2/src/core/dom/dom_adapter");
  var event_manager_1 = require("angular2/src/core/render/dom/events/event_manager");
  var directive_resolver_mock_1 = require("angular2/src/mock/directive_resolver_mock");
  var view_resolver_mock_1 = require("angular2/src/mock/view_resolver_mock");
  var xhr_mock_1 = require("angular2/src/core/compiler/xhr_mock");
  var mock_location_strategy_1 = require("angular2/src/mock/mock_location_strategy");
  var location_strategy_1 = require("angular2/src/router/location_strategy");
  var ng_zone_mock_1 = require("angular2/src/mock/ng_zone_mock");
  var test_component_builder_1 = require("angular2/src/test_lib/test_component_builder");
  var di_2 = require("angular2/src/core/di");
  var debug_1 = require("angular2/src/core/debug");
  var collection_1 = require("angular2/src/core/facade/collection");
  var lang_1 = require("angular2/src/core/facade/lang");
  var view_pool_1 = require("angular2/src/core/linker/view_pool");
  var view_manager_1 = require("angular2/src/core/linker/view_manager");
  var view_manager_utils_1 = require("angular2/src/core/linker/view_manager_utils");
  var api_1 = require("angular2/src/core/render/api");
  var render_1 = require("angular2/src/core/render/render");
  var application_tokens_1 = require("angular2/src/core/application_tokens");
  var serializer_1 = require("angular2/src/web_workers/shared/serializer");
  var utils_1 = require("angular2/src/test_lib/utils");
  var compiler_1 = require("angular2/src/core/compiler/compiler");
  function _getRootBindings() {
    return [di_1.bind(reflection_1.Reflector).toValue(reflection_1.reflector)];
  }
  function _getAppBindings() {
    var appDoc;
    try {
      appDoc = dom_adapter_1.DOM.defaultDoc();
    } catch (e) {
      appDoc = null;
    }
    return [compiler_1.compilerBindings(), di_1.bind(change_detection_1.ChangeDetectorGenConfig).toValue(new change_detection_1.ChangeDetectorGenConfig(true, true, false, true)), di_1.bind(render_1.DOCUMENT).toValue(appDoc), render_1.DomRenderer, di_1.bind(api_1.Renderer).toAlias(render_1.DomRenderer), di_1.bind(application_tokens_1.APP_ID).toValue('a'), render_1.DomSharedStylesHost, di_1.bind(render_1.SharedStylesHost).toAlias(render_1.DomSharedStylesHost), view_pool_1.AppViewPool, view_manager_1.AppViewManager, view_manager_utils_1.AppViewManagerUtils, serializer_1.Serializer, debug_1.ELEMENT_PROBE_BINDINGS, di_1.bind(view_pool_1.APP_VIEW_POOL_CAPACITY).toValue(500), proto_view_factory_1.ProtoViewFactory, di_1.bind(directive_resolver_1.DirectiveResolver).toClass(directive_resolver_mock_1.MockDirectiveResolver), di_1.bind(view_resolver_1.ViewResolver).toClass(view_resolver_mock_1.MockViewResolver), pipes_1.DEFAULT_PIPES, di_1.bind(change_detection_1.IterableDiffers).toValue(change_detection_1.defaultIterableDiffers), di_1.bind(change_detection_1.KeyValueDiffers).toValue(change_detection_1.defaultKeyValueDiffers), utils_1.Log, dynamic_component_loader_1.DynamicComponentLoader, pipe_resolver_1.PipeResolver, di_1.bind(exceptions_1.ExceptionHandler).toValue(new exceptions_1.ExceptionHandler(dom_adapter_1.DOM)), di_1.bind(location_strategy_1.LocationStrategy).toClass(mock_location_strategy_1.MockLocationStrategy), di_1.bind(xhr_1.XHR).toClass(xhr_mock_1.MockXHR), test_component_builder_1.TestComponentBuilder, di_1.bind(ng_zone_1.NgZone).toClass(ng_zone_mock_1.MockNgZone), di_1.bind(animation_builder_1.AnimationBuilder).toClass(animation_builder_mock_1.MockAnimationBuilder), event_manager_1.EventManager, new di_1.Binding(event_manager_1.EVENT_MANAGER_PLUGINS, {
      toClass: event_manager_1.DomEventsPlugin,
      multi: true
    })];
  }
  function createTestInjector(bindings) {
    var rootInjector = di_2.Injector.resolveAndCreate(_getRootBindings());
    return rootInjector.resolveAndCreateChild(collection_1.ListWrapper.concat(_getAppBindings(), bindings));
  }
  exports.createTestInjector = createTestInjector;
  function inject(tokens, fn) {
    return new FunctionWithParamTokens(tokens, fn);
  }
  exports.inject = inject;
  var FunctionWithParamTokens = (function() {
    function FunctionWithParamTokens(_tokens, _fn) {
      this._tokens = _tokens;
      this._fn = _fn;
    }
    FunctionWithParamTokens.prototype.execute = function(injector) {
      var params = collection_1.ListWrapper.map(this._tokens, function(t) {
        return injector.get(t);
      });
      return lang_1.FunctionWrapper.apply(this._fn, params);
    };
    FunctionWithParamTokens.prototype.hasToken = function(token) {
      return this._tokens.indexOf(token) > -1;
    };
    return FunctionWithParamTokens;
  })();
  exports.FunctionWithParamTokens = FunctionWithParamTokens;
  global.define = __define;
  return module.exports;
});

System.register("angular2/src/test_lib/test_lib", ["angular2/src/core/dom/dom_adapter", "angular2/src/core/facade/collection", "angular2/src/core/facade/lang", "angular2/src/core/di", "angular2/src/test_lib/test_injector", "angular2/src/test_lib/utils", "angular2/src/test_lib/test_injector"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var dom_adapter_1 = require("angular2/src/core/dom/dom_adapter");
  var collection_1 = require("angular2/src/core/facade/collection");
  var lang_1 = require("angular2/src/core/facade/lang");
  var di_1 = require("angular2/src/core/di");
  var test_injector_1 = require("angular2/src/test_lib/test_injector");
  var utils_1 = require("angular2/src/test_lib/utils");
  var test_injector_2 = require("angular2/src/test_lib/test_injector");
  exports.inject = test_injector_2.inject;
  exports.proxy = function(t) {
    return t;
  };
  var _global = (typeof window === 'undefined' ? lang_1.global : window);
  exports.afterEach = _global.afterEach;
  exports.expect = _global.expect;
  var AsyncTestCompleter = (function() {
    function AsyncTestCompleter(_done) {
      this._done = _done;
    }
    AsyncTestCompleter.prototype.done = function() {
      this._done();
    };
    return AsyncTestCompleter;
  })();
  exports.AsyncTestCompleter = AsyncTestCompleter;
  var jsmBeforeEach = _global.beforeEach;
  var jsmDescribe = _global.describe;
  var jsmDDescribe = _global.fdescribe;
  var jsmXDescribe = _global.xdescribe;
  var jsmIt = _global.it;
  var jsmIIt = _global.fit;
  var jsmXIt = _global.xit;
  var runnerStack = [];
  var inIt = false;
  var globalTimeOut = utils_1.browserDetection.isSlow ? 3000 : jasmine.DEFAULT_TIMEOUT_INTERVAL;
  var testBindings;
  var BeforeEachRunner = (function() {
    function BeforeEachRunner(_parent) {
      this._parent = _parent;
      this._fns = [];
    }
    BeforeEachRunner.prototype.beforeEach = function(fn) {
      this._fns.push(fn);
    };
    BeforeEachRunner.prototype.run = function(injector) {
      if (this._parent)
        this._parent.run(injector);
      this._fns.forEach(function(fn) {
        return lang_1.isFunction(fn) ? fn() : fn.execute(injector);
      });
    };
    return BeforeEachRunner;
  })();
  jsmBeforeEach(function() {
    testBindings = [];
  });
  function _describe(jsmFn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    var parentRunner = runnerStack.length === 0 ? null : runnerStack[runnerStack.length - 1];
    var runner = new BeforeEachRunner(parentRunner);
    runnerStack.push(runner);
    var suite = jsmFn.apply(void 0, args);
    runnerStack.pop();
    return suite;
  }
  function describe() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i - 0] = arguments[_i];
    }
    return _describe.apply(void 0, [jsmDescribe].concat(args));
  }
  exports.describe = describe;
  function ddescribe() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i - 0] = arguments[_i];
    }
    return _describe.apply(void 0, [jsmDDescribe].concat(args));
  }
  exports.ddescribe = ddescribe;
  function xdescribe() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i - 0] = arguments[_i];
    }
    return _describe.apply(void 0, [jsmXDescribe].concat(args));
  }
  exports.xdescribe = xdescribe;
  function beforeEach(fn) {
    if (runnerStack.length > 0) {
      runnerStack[runnerStack.length - 1].beforeEach(fn);
    } else {
      jsmBeforeEach(fn);
    }
  }
  exports.beforeEach = beforeEach;
  function beforeEachBindings(fn) {
    jsmBeforeEach(function() {
      var bindings = fn();
      if (!bindings)
        return ;
      testBindings = testBindings.concat(bindings);
    });
  }
  exports.beforeEachBindings = beforeEachBindings;
  function _it(jsmFn, name, testFn, testTimeOut) {
    var runner = runnerStack[runnerStack.length - 1];
    var timeOut = lang_1.Math.max(globalTimeOut, testTimeOut);
    if (testFn instanceof test_injector_1.FunctionWithParamTokens) {
      if (testFn.hasToken(AsyncTestCompleter)) {
        jsmFn(name, function(done) {
          var completerBinding = di_1.bind(AsyncTestCompleter).toFactory(function() {
            if (!inIt)
              throw new Error('AsyncTestCompleter can only be injected in an "it()"');
            return new AsyncTestCompleter(done);
          });
          var injector = test_injector_1.createTestInjector(testBindings.concat([completerBinding]));
          runner.run(injector);
          inIt = true;
          testFn.execute(injector);
          inIt = false;
        }, timeOut);
      } else {
        jsmFn(name, function() {
          var injector = test_injector_1.createTestInjector(testBindings);
          runner.run(injector);
          testFn.execute(injector);
        }, timeOut);
      }
    } else {
      if (testFn.length === 0) {
        jsmFn(name, function() {
          var injector = test_injector_1.createTestInjector(testBindings);
          runner.run(injector);
          testFn();
        }, timeOut);
      } else {
        jsmFn(name, function(done) {
          var injector = test_injector_1.createTestInjector(testBindings);
          runner.run(injector);
          testFn(done);
        }, timeOut);
      }
    }
  }
  function it(name, fn, timeOut) {
    if (timeOut === void 0) {
      timeOut = null;
    }
    return _it(jsmIt, name, fn, timeOut);
  }
  exports.it = it;
  function xit(name, fn, timeOut) {
    if (timeOut === void 0) {
      timeOut = null;
    }
    return _it(jsmXIt, name, fn, timeOut);
  }
  exports.xit = xit;
  function iit(name, fn, timeOut) {
    if (timeOut === void 0) {
      timeOut = null;
    }
    return _it(jsmIIt, name, fn, timeOut);
  }
  exports.iit = iit;
  Map.prototype['jasmineToString'] = function() {
    var m = this;
    if (!m) {
      return '' + m;
    }
    var res = [];
    m.forEach(function(v, k) {
      res.push(k + ":" + v);
    });
    return "{ " + res.join(',') + " }";
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
              actual.forEach(function(v, k) {
                pass = pass && util.equals(v, expected.get(k));
              });
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
      toHaveCssClass: function() {
        return {
          compare: buildError(false),
          negativeCompare: buildError(true)
        };
        function buildError(isNot) {
          return function(actual, className) {
            return {
              pass: dom_adapter_1.DOM.hasClass(actual, className) == !isNot,
              get message() {
                return "Expected " + actual.outerHTML + " " + (isNot ? 'not ' : '') + "to contain the CSS class \"" + className + "\"";
              }
            };
          };
        }
      },
      toContainError: function() {
        return {compare: function(actual, expectedText) {
            var errorMessage = actual.toString();
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
              var errorMessage = e.toString();
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
            intProps.forEach(function(k) {
              if (!actualObject.constructor.prototype[k])
                missedMethods.push(k);
            });
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
  var SpyObject = (function() {
    function SpyObject(type) {
      if (type === void 0) {
        type = null;
      }
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
    SpyObject.prototype.noSuchMethod = function(args) {};
    SpyObject.prototype.spy = function(name) {
      if (!this[name]) {
        this[name] = this._createGuinnessCompatibleSpy(name);
      }
      return this[name];
    };
    SpyObject.prototype.prop = function(name, value) {
      this[name] = value;
    };
    SpyObject.stub = function(object, config, overrides) {
      if (object === void 0) {
        object = null;
      }
      if (config === void 0) {
        config = null;
      }
      if (overrides === void 0) {
        overrides = null;
      }
      if (!(object instanceof SpyObject)) {
        overrides = config;
        config = object;
        object = new SpyObject();
      }
      var m = collection_1.StringMapWrapper.merge(config, overrides);
      collection_1.StringMapWrapper.forEach(m, function(value, key) {
        object.spy(key).andReturn(value);
      });
      return object;
    };
    SpyObject.prototype._createGuinnessCompatibleSpy = function(name) {
      var newSpy = jasmine.createSpy(name);
      newSpy.andCallFake = newSpy.and.callFake;
      newSpy.andReturn = newSpy.and.returnValue;
      newSpy.reset = newSpy.calls.reset;
      newSpy.and.returnValue(null);
      return newSpy;
    };
    return SpyObject;
  })();
  exports.SpyObject = SpyObject;
  function elementText(n) {
    var hasNodes = function(n) {
      var children = dom_adapter_1.DOM.childNodes(n);
      return children && children.length > 0;
    };
    if (n instanceof Array) {
      return n.map(function(nn) {
        return elementText(nn);
      }).join("");
    }
    if (dom_adapter_1.DOM.isCommentNode(n)) {
      return '';
    }
    if (dom_adapter_1.DOM.isElementNode(n) && dom_adapter_1.DOM.tagName(n) == 'CONTENT') {
      return elementText(Array.prototype.slice.apply(dom_adapter_1.DOM.getDistributedNodes(n)));
    }
    if (dom_adapter_1.DOM.hasShadowRoot(n)) {
      return elementText(dom_adapter_1.DOM.childNodesAsList(dom_adapter_1.DOM.getShadowRoot(n)));
    }
    if (hasNodes(n)) {
      return elementText(dom_adapter_1.DOM.childNodesAsList(n));
    }
    return dom_adapter_1.DOM.getText(n);
  }
  function isInInnerZone() {
    return lang_1.global.zone._innerZone === true;
  }
  exports.isInInnerZone = isInInnerZone;
  global.define = __define;
  return module.exports;
});

System.register("angular2/test", ["angular2/src/test_lib/test_lib", "angular2/src/test_lib/test_component_builder", "angular2/src/test_lib/test_injector", "angular2/src/test_lib/fake_async"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  __export(require("angular2/src/test_lib/test_lib"));
  __export(require("angular2/src/test_lib/test_component_builder"));
  __export(require("angular2/src/test_lib/test_injector"));
  __export(require("angular2/src/test_lib/fake_async"));
  global.define = __define;
  return module.exports;
});

//# sourceMappingURL=test_lib.dev.js.map