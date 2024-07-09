
var VueDemi = (function (VueDemi, Vue, VueCompositionAPI) {
  if (VueDemi.install) {
    return VueDemi
  }
  if (!Vue) {
    console.error('[vue-demi] no Vue instance found, please be sure to import `vue` before `vue-demi`.')
    return VueDemi
  }

  // Vue 2.7
  if (Vue.version.slice(0, 4) === '2.7.') {
    for (var key in Vue) {
      VueDemi[key] = Vue[key]
    }
    VueDemi.isVue2 = true
    VueDemi.isVue3 = false
    VueDemi.install = function () {}
    VueDemi.Vue = Vue
    VueDemi.Vue2 = Vue
    VueDemi.version = Vue.version
    VueDemi.warn = Vue.util.warn
    function createApp(rootComponent, rootProps) {
      var vm
      var provide = {}
      var app = {
        config: Vue.config,
        use: Vue.use.bind(Vue),
        mixin: Vue.mixin.bind(Vue),
        component: Vue.component.bind(Vue),
        provide: function (key, value) {
          provide[key] = value
          return this
        },
        directive: function (name, dir) {
          if (dir) {
            Vue.directive(name, dir)
            return app
          } else {
            return Vue.directive(name)
          }
        },
        mount: function (el, hydrating) {
          if (!vm) {
            vm = new Vue(Object.assign({ propsData: rootProps }, rootComponent, { provide: Object.assign(provide, rootComponent.provide) }))
            vm.$mount(el, hydrating)
            return vm
          } else {
            return vm
          }
        },
        unmount: function () {
          if (vm) {
            vm.$destroy()
            vm = undefined
          }
        },
      }
      return app
    }
    VueDemi.createApp = createApp
  }
  // Vue 2.6.x
  else if (Vue.version.slice(0, 2) === '2.') {
    if (VueCompositionAPI) {
      for (var key in VueCompositionAPI) {
        VueDemi[key] = VueCompositionAPI[key]
      }
      VueDemi.isVue2 = true
      VueDemi.isVue3 = false
      VueDemi.install = function () {}
      VueDemi.Vue = Vue
      VueDemi.Vue2 = Vue
      VueDemi.version = Vue.version
    } else {
      console.error('[vue-demi] no VueCompositionAPI instance found, please be sure to import `@vue/composition-api` before `vue-demi`.')
    }
  }
  // Vue 3
  else if (Vue.version.slice(0, 2) === '3.') {
    for (var key in Vue) {
      VueDemi[key] = Vue[key]
    }
    VueDemi.isVue2 = false
    VueDemi.isVue3 = true
    VueDemi.install = function () {}
    VueDemi.Vue = Vue
    VueDemi.Vue2 = undefined
    VueDemi.version = Vue.version
    VueDemi.set = function (target, key, val) {
      if (Array.isArray(target)) {
        target.length = Math.max(target.length, key)
        target.splice(key, 1, val)
        return val
      }
      target[key] = val
      return val
    }
    VueDemi.del = function (target, key) {
      if (Array.isArray(target)) {
        target.splice(key, 1)
        return
      }
      delete target[key]
    }
  } else {
    console.error('[vue-demi] Vue version ' + Vue.version + ' is unsupported.')
  }
  return VueDemi
})(
  (this.VueDemi = this.VueDemi || (typeof VueDemi !== 'undefined' ? VueDemi : {})),
  this.Vue || (typeof Vue !== 'undefined' ? Vue : undefined),
  this.VueCompositionAPI || (typeof VueCompositionAPI !== 'undefined' ? VueCompositionAPI : undefined)
);
;
;
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('echarts'), require('vue-demi'), require('echarts/core')) :
    typeof define === 'function' && define.amd ? define(['echarts', 'vue-demi', 'echarts/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VueECharts = factory(global.echarts, global.VueDemi, global.echarts));
})(this, (function (echarts, vueDemi, core) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    var METHOD_NAMES = [
        "getWidth",
        "getHeight",
        "getDom",
        "getOption",
        "resize",
        "dispatchAction",
        "convertToPixel",
        "convertFromPixel",
        "containPixel",
        "getDataURL",
        "getConnectedDataURL",
        "appendData",
        "clear",
        "isDisposed",
        "dispose"
    ];
    function usePublicAPI(chart) {
        function makePublicMethod(name) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (!chart.value) {
                    throw new Error("ECharts is not initialized yet.");
                }
                return chart.value[name].apply(chart.value, args);
            };
        }
        function makePublicMethods() {
            var methods = Object.create(null);
            METHOD_NAMES.forEach(function (name) {
                methods[name] = makePublicMethod(name);
            });
            return methods;
        }
        return makePublicMethods();
    }

    var raf = null;
    function requestAnimationFrame (callback) {
      if (!raf) {
        raf = (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          function (callback) {
            return setTimeout(callback, 16)
          }
        ).bind(window);
      }
      return raf(callback)
    }

    var caf = null;
    function cancelAnimationFrame (id) {
      if (!caf) {
        caf = (
          window.cancelAnimationFrame ||
          window.webkitCancelAnimationFrame ||
          window.mozCancelAnimationFrame ||
          function (id) {
            clearTimeout(id);
          }
        ).bind(window);
      }

      caf(id);
    }

    function createStyles (styleText) {
      var style = document.createElement('style');

      if (style.styleSheet) {
        style.styleSheet.cssText = styleText;
      } else {
        style.appendChild(document.createTextNode(styleText));
      }
      (document.querySelector('head') || document.body).appendChild(style);
      return style
    }

    function createElement (tagName, props) {
      if ( props === void 0 ) props = {};

      var elem = document.createElement(tagName);
      Object.keys(props).forEach(function (key) {
        elem[key] = props[key];
      });
      return elem
    }

    function getComputedStyle (elem, prop, pseudo) {
      // for older versions of Firefox, `getComputedStyle` required
      // the second argument and may return `null` for some elements
      // when `display: none`
      var computedStyle = window.getComputedStyle(elem, pseudo || null) || {
        display: 'none'
      };

      return computedStyle[prop]
    }

    function getRenderInfo (elem) {
      if (!document.documentElement.contains(elem)) {
        return {
          detached: true,
          rendered: false
        }
      }

      var current = elem;
      while (current !== document) {
        if (getComputedStyle(current, 'display') === 'none') {
          return {
            detached: false,
            rendered: false
          }
        }
        current = current.parentNode;
      }

      return {
        detached: false,
        rendered: true
      }
    }

    var css_248z = ".resize-triggers{visibility:hidden;opacity:0;pointer-events:none}.resize-contract-trigger,.resize-contract-trigger:before,.resize-expand-trigger,.resize-triggers{content:\"\";position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden}.resize-contract-trigger,.resize-expand-trigger{background:#eee;overflow:auto}.resize-contract-trigger:before{width:200%;height:200%}";

    var total = 0;
    var style = null;

    function addListener (elem, callback) {
      if (!elem.__resize_mutation_handler__) {
        elem.__resize_mutation_handler__ = handleMutation.bind(elem);
      }

      var listeners = elem.__resize_listeners__;

      if (!listeners) {
        elem.__resize_listeners__ = [];
        if (window.ResizeObserver) {
          var offsetWidth = elem.offsetWidth;
          var offsetHeight = elem.offsetHeight;
          var ro = new ResizeObserver(function () {
            if (!elem.__resize_observer_triggered__) {
              elem.__resize_observer_triggered__ = true;
              if (elem.offsetWidth === offsetWidth && elem.offsetHeight === offsetHeight) {
                return
              }
            }
            runCallbacks(elem);
          });

          // initially display none won't trigger ResizeObserver callback
          var ref = getRenderInfo(elem);
          var detached = ref.detached;
          var rendered = ref.rendered;
          elem.__resize_observer_triggered__ = detached === false && rendered === false;
          elem.__resize_observer__ = ro;
          ro.observe(elem);
        } else if (elem.attachEvent && elem.addEventListener) {
          // targeting IE9/10
          elem.__resize_legacy_resize_handler__ = function handleLegacyResize () {
            runCallbacks(elem);
          };
          elem.attachEvent('onresize', elem.__resize_legacy_resize_handler__);
          document.addEventListener('DOMSubtreeModified', elem.__resize_mutation_handler__);
        } else {
          if (!total) {
            style = createStyles(css_248z);
          }
          initTriggers(elem);

          elem.__resize_rendered__ = getRenderInfo(elem).rendered;
          if (window.MutationObserver) {
            var mo = new MutationObserver(elem.__resize_mutation_handler__);
            mo.observe(document, {
              attributes: true,
              childList: true,
              characterData: true,
              subtree: true
            });
            elem.__resize_mutation_observer__ = mo;
          }
        }
      }

      elem.__resize_listeners__.push(callback);
      total++;
    }

    function removeListener (elem, callback) {
      var listeners = elem.__resize_listeners__;
      if (!listeners) {
        return
      }

      if (callback) {
        listeners.splice(listeners.indexOf(callback), 1);
      }

      // no listeners exist, or removing all listeners
      if (!listeners.length || !callback) {
        // targeting IE9/10
        if (elem.detachEvent && elem.removeEventListener) {
          elem.detachEvent('onresize', elem.__resize_legacy_resize_handler__);
          document.removeEventListener('DOMSubtreeModified', elem.__resize_mutation_handler__);
          return
        }

        if (elem.__resize_observer__) {
          elem.__resize_observer__.unobserve(elem);
          elem.__resize_observer__.disconnect();
          elem.__resize_observer__ = null;
        } else {
          if (elem.__resize_mutation_observer__) {
            elem.__resize_mutation_observer__.disconnect();
            elem.__resize_mutation_observer__ = null;
          }
          elem.removeEventListener('scroll', handleScroll);
          elem.removeChild(elem.__resize_triggers__.triggers);
          elem.__resize_triggers__ = null;
        }
        elem.__resize_listeners__ = null;
      }

      if (!--total && style) {
        style.parentNode.removeChild(style);
      }
    }

    function getUpdatedSize (elem) {
      var ref = elem.__resize_last__;
      var width = ref.width;
      var height = ref.height;
      var offsetWidth = elem.offsetWidth;
      var offsetHeight = elem.offsetHeight;
      if (offsetWidth !== width || offsetHeight !== height) {
        return {
          width: offsetWidth,
          height: offsetHeight
        }
      }
      return null
    }

    function handleMutation () {
      // `this` denotes the scrolling element
      var ref = getRenderInfo(this);
      var rendered = ref.rendered;
      var detached = ref.detached;
      if (rendered !== this.__resize_rendered__) {
        if (!detached && this.__resize_triggers__) {
          resetTriggers(this);
          this.addEventListener('scroll', handleScroll, true);
        }
        this.__resize_rendered__ = rendered;
        runCallbacks(this);
      }
    }

    function handleScroll () {
      var this$1$1 = this;

      // `this` denotes the scrolling element
      resetTriggers(this);
      if (this.__resize_raf__) {
        cancelAnimationFrame(this.__resize_raf__);
      }
      this.__resize_raf__ = requestAnimationFrame(function () {
        var updated = getUpdatedSize(this$1$1);
        if (updated) {
          this$1$1.__resize_last__ = updated;
          runCallbacks(this$1$1);
        }
      });
    }

    function runCallbacks (elem) {
      if (!elem || !elem.__resize_listeners__) {
        return
      }
      elem.__resize_listeners__.forEach(function (callback) {
        callback.call(elem, elem);
      });
    }

    function initTriggers (elem) {
      var position = getComputedStyle(elem, 'position');
      if (!position || position === 'static') {
        elem.style.position = 'relative';
      }

      elem.__resize_old_position__ = position;
      elem.__resize_last__ = {};

      var triggers = createElement('div', {
        className: 'resize-triggers'
      });
      var expand = createElement('div', {
        className: 'resize-expand-trigger'
      });
      var expandChild = createElement('div');
      var contract = createElement('div', {
        className: 'resize-contract-trigger'
      });
      expand.appendChild(expandChild);
      triggers.appendChild(expand);
      triggers.appendChild(contract);
      elem.appendChild(triggers);

      elem.__resize_triggers__ = {
        triggers: triggers,
        expand: expand,
        expandChild: expandChild,
        contract: contract
      };

      resetTriggers(elem);
      elem.addEventListener('scroll', handleScroll, true);

      elem.__resize_last__ = {
        width: elem.offsetWidth,
        height: elem.offsetHeight
      };
    }

    function resetTriggers (elem) {
      var ref = elem.__resize_triggers__;
      var expand = ref.expand;
      var expandChild = ref.expandChild;
      var contract = ref.contract;

      // batch read
      var csw = contract.scrollWidth;
      var csh = contract.scrollHeight;
      var eow = expand.offsetWidth;
      var eoh = expand.offsetHeight;
      var esw = expand.scrollWidth;
      var esh = expand.scrollHeight;

      // batch write
      contract.scrollLeft = csw;
      contract.scrollTop = csh;
      expandChild.style.width = eow + 1 + 'px';
      expandChild.style.height = eoh + 1 + 'px';
      expand.scrollLeft = esw;
      expand.scrollTop = esh;
    }

    function useAutoresize(chart, autoresize, root) {
        var resizeListener = null;
        vueDemi.watch([root, chart, autoresize], function (_a, _, cleanup) {
            var root = _a[0], chart = _a[1], autoresize = _a[2];
            if (root && chart && autoresize) {
                var autoresizeOptions = autoresize === true ? {} : autoresize;
                var _b = autoresizeOptions.throttle, wait = _b === void 0 ? 100 : _b, onResize_1 = autoresizeOptions.onResize;
                var callback = function () {
                    chart.resize();
                    onResize_1 === null || onResize_1 === void 0 ? void 0 : onResize_1();
                };
                resizeListener = wait ? core.throttle(callback, wait) : callback;
                addListener(root, resizeListener);
            }
            cleanup(function () {
                if (root && resizeListener) {
                    removeListener(root, resizeListener);
                }
            });
        });
    }
    var autoresizeProps = {
        autoresize: [Boolean, Object]
    };

    var onRE = /^on[^a-z]/;
    var isOn = function (key) { return onRE.test(key); };
    function omitOn(attrs) {
        var result = {};
        for (var key in attrs) {
            if (!isOn(key)) {
                result[key] = attrs[key];
            }
        }
        return result;
    }
    function unwrapInjected(injection, defaultValue) {
        var value = vueDemi.isRef(injection) ? vueDemi.unref(injection) : injection;
        if (value && typeof value === "object" && "value" in value) {
            return value.value || defaultValue;
        }
        return value || defaultValue;
    }

    var LOADING_OPTIONS_KEY = "ecLoadingOptions";
    function useLoading(chart, loading, loadingOptions) {
        var defaultLoadingOptions = vueDemi.inject(LOADING_OPTIONS_KEY, {});
        var realLoadingOptions = vueDemi.computed(function () { return (__assign(__assign({}, unwrapInjected(defaultLoadingOptions, {})), loadingOptions === null || loadingOptions === void 0 ? void 0 : loadingOptions.value)); });
        vueDemi.watchEffect(function () {
            var instance = chart.value;
            if (!instance) {
                return;
            }
            if (loading.value) {
                instance.showLoading(realLoadingOptions.value);
            }
            else {
                instance.hideLoading();
            }
        });
    }
    var loadingProps = {
        loading: Boolean,
        loadingOptions: Object
    };

    var registered = null;
    var TAG_NAME = "x-vue-echarts";
    function register() {
        if (registered != null) {
            return registered;
        }
        if (typeof HTMLElement === "undefined" ||
            typeof customElements === "undefined") {
            return (registered = false);
        }
        try {
            var reg = new Function("tag", "class EChartsElement extends HTMLElement {\n  __dispose = null;\n\n  disconnectedCallback() {\n    if (this.__dispose) {\n      this.__dispose();\n      this.__dispose = null;\n    }\n  }\n}\n\nif (customElements.get(tag) == null) {\n  customElements.define(tag, EChartsElement);\n}\n");
            reg(TAG_NAME);
        }
        catch (e) {
            return (registered = false);
        }
        return (registered = true);
    }

    var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

    var css = "x-vue-echarts{display:flex;flex-direction:column;width:100%;height:100%;min-width:0}\n.vue-echarts-inner{flex-grow:1;min-width:0;width:auto!important;height:auto!important}\n";
    n(css,{});

    var wcRegistered = register();
    if (vueDemi.Vue2) {
        vueDemi.Vue2.config.ignoredElements.push(TAG_NAME);
    }
    var THEME_KEY = "ecTheme";
    var INIT_OPTIONS_KEY = "ecInitOptions";
    var UPDATE_OPTIONS_KEY = "ecUpdateOptions";
    var NATIVE_EVENT_RE = /(^&?~?!?)native:/;
    var ECharts = vueDemi.defineComponent({
        name: "echarts",
        props: __assign(__assign({ option: Object, theme: {
                type: [Object, String]
            }, initOptions: Object, updateOptions: Object, group: String, manualUpdate: Boolean }, autoresizeProps), loadingProps),
        emits: {},
        inheritAttrs: false,
        setup: function (props, _a) {
            var attrs = _a.attrs;
            var root = vueDemi.shallowRef();
            var inner = vueDemi.shallowRef();
            var chart = vueDemi.shallowRef();
            var manualOption = vueDemi.shallowRef();
            var defaultTheme = vueDemi.inject(THEME_KEY, null);
            var defaultInitOptions = vueDemi.inject(INIT_OPTIONS_KEY, null);
            var defaultUpdateOptions = vueDemi.inject(UPDATE_OPTIONS_KEY, null);
            var _b = vueDemi.toRefs(props), autoresize = _b.autoresize, manualUpdate = _b.manualUpdate, loading = _b.loading, loadingOptions = _b.loadingOptions;
            var realOption = vueDemi.computed(function () { return manualOption.value || props.option || null; });
            var realTheme = vueDemi.computed(function () { return props.theme || unwrapInjected(defaultTheme, {}); });
            var realInitOptions = vueDemi.computed(function () { return props.initOptions || unwrapInjected(defaultInitOptions, {}); });
            var realUpdateOptions = vueDemi.computed(function () { return props.updateOptions || unwrapInjected(defaultUpdateOptions, {}); });
            var nonEventAttrs = vueDemi.computed(function () { return omitOn(attrs); });
            var nativeListeners = {};
            var listeners = vueDemi.getCurrentInstance().proxy.$listeners;
            var realListeners = {};
            if (!listeners) {
                Object.keys(attrs)
                    .filter(function (key) { return isOn(key); })
                    .forEach(function (key) {
                    var event = key.charAt(2).toLowerCase() + key.slice(3);
                    if (event.indexOf("native:") === 0) {
                        var nativeKey = "on".concat(event.charAt(7).toUpperCase()).concat(event.slice(8));
                        nativeListeners[nativeKey] = attrs[key];
                        return;
                    }
                    if (event.substring(event.length - 4) === "Once") {
                        event = "~".concat(event.substring(0, event.length - 4));
                    }
                    realListeners[event] = attrs[key];
                });
            }
            else {
                Object.keys(listeners).forEach(function (key) {
                    if (NATIVE_EVENT_RE.test(key)) {
                        nativeListeners[key.replace(NATIVE_EVENT_RE, "$1")] = listeners[key];
                    }
                    else {
                        realListeners[key] = listeners[key];
                    }
                });
            }
            function init(option) {
                if (!inner.value) {
                    return;
                }
                var instance = (chart.value = core.init(inner.value, realTheme.value, realInitOptions.value));
                if (props.group) {
                    instance.group = props.group;
                }
                Object.keys(realListeners).forEach(function (key) {
                    var handler = realListeners[key];
                    if (!handler) {
                        return;
                    }
                    var event = key.toLowerCase();
                    if (event.charAt(0) === "~") {
                        event = event.substring(1);
                        handler.__once__ = true;
                    }
                    var target = instance;
                    if (event.indexOf("zr:") === 0) {
                        target = instance.getZr();
                        event = event.substring(3);
                    }
                    if (handler.__once__) {
                        delete handler.__once__;
                        var raw_1 = handler;
                        handler = function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            raw_1.apply(void 0, args);
                            target.off(event, handler);
                        };
                    }
                    target.on(event, handler);
                });
                function resize() {
                    if (instance && !instance.isDisposed()) {
                        instance.resize();
                    }
                }
                function commit() {
                    var opt = option || realOption.value;
                    if (opt) {
                        instance.setOption(opt, realUpdateOptions.value);
                    }
                }
                if (autoresize.value) {
                    vueDemi.nextTick(function () {
                        resize();
                        commit();
                    });
                }
                else {
                    commit();
                }
            }
            function setOption(option, updateOptions) {
                if (props.manualUpdate) {
                    manualOption.value = option;
                }
                if (!chart.value) {
                    init(option);
                }
                else {
                    chart.value.setOption(option, updateOptions || {});
                }
            }
            function cleanup() {
                if (chart.value) {
                    chart.value.dispose();
                    chart.value = undefined;
                }
            }
            var unwatchOption = null;
            vueDemi.watch(manualUpdate, function (manualUpdate) {
                if (typeof unwatchOption === "function") {
                    unwatchOption();
                    unwatchOption = null;
                }
                if (!manualUpdate) {
                    unwatchOption = vueDemi.watch(function () { return props.option; }, function (option, oldOption) {
                        if (!option) {
                            return;
                        }
                        if (!chart.value) {
                            init();
                        }
                        else {
                            chart.value.setOption(option, __assign({ notMerge: option !== oldOption }, realUpdateOptions.value));
                        }
                    }, { deep: true });
                }
            }, {
                immediate: true
            });
            vueDemi.watch([realTheme, realInitOptions], function () {
                cleanup();
                init();
            }, {
                deep: true
            });
            vueDemi.watchEffect(function () {
                if (props.group && chart.value) {
                    chart.value.group = props.group;
                }
            });
            var publicApi = usePublicAPI(chart);
            useLoading(chart, loading, loadingOptions);
            useAutoresize(chart, autoresize, inner);
            vueDemi.onMounted(function () {
                init();
            });
            vueDemi.onBeforeUnmount(function () {
                if (wcRegistered && root.value) {
                    root.value.__dispose = cleanup;
                }
                else {
                    cleanup();
                }
            });
            return __assign({ chart: chart, root: root, inner: inner, setOption: setOption, nonEventAttrs: nonEventAttrs, nativeListeners: nativeListeners }, publicApi);
        },
        render: function () {
            var attrs = (vueDemi.Vue2
                ? { attrs: this.nonEventAttrs, on: this.nativeListeners }
                : __assign(__assign({}, this.nonEventAttrs), this.nativeListeners));
            attrs.ref = "root";
            attrs["class"] = attrs["class"] ? ["echarts"].concat(attrs["class"]) : "echarts";
            return vueDemi.h(TAG_NAME, attrs, [
                vueDemi.h("div", { ref: "inner", "class": "vue-echarts-inner" })
            ]);
        }
    });

    var exported = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': ECharts,
        LOADING_OPTIONS_KEY: LOADING_OPTIONS_KEY,
        THEME_KEY: THEME_KEY,
        INIT_OPTIONS_KEY: INIT_OPTIONS_KEY,
        UPDATE_OPTIONS_KEY: UPDATE_OPTIONS_KEY
    });

    var global = __assign(__assign({}, ECharts), exported);

    return global;

}));
//# sourceMappingURL=index.umd.js.map
