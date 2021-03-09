import { watch, inject, computed, unref, watchEffect, defineComponent, ref, shallowRef, toRefs, toRef, onMounted, onUnmounted, h, Vue2, nextTick } from 'vue-demi';
import { throttle, init } from 'echarts/core';
import { addListener, removeListener } from 'resize-detector';

/*! *****************************************************************************
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
function usePublicAPI(chart, init) {
    function makePublicMethod(name) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!chart.value) {
                init();
            }
            if (!chart.value) {
                throw new Error("ECharts is not initialized yet.");
            }
            return chart.value[name].apply(chart.value, args);
        };
    }
    function makeAnyMethod(name) {
        return makePublicMethod(name);
    }
    function makePublicMethods() {
        var methods = Object.create(null);
        METHOD_NAMES.forEach(function (name) {
            methods[name] = makePublicMethod(name);
        });
        return methods;
    }
    return __assign(__assign({}, makePublicMethods()), { dispatchAction: makeAnyMethod("dispatchAction"), getDataURL: makeAnyMethod("getDataURL"), getConnectedDataURL: makeAnyMethod("getConnectedDataURL") });
}

function useAutoresize(chart, autoresize, root, option) {
    var resizeListener = null;
    var lastArea = 0;
    function getArea() {
        var el = root.value;
        if (!el) {
            return 0;
        }
        return el.offsetWidth * el.offsetHeight;
    }
    watch([root, chart, autoresize], function (_a, _, cleanup) {
        var root = _a[0], chart = _a[1], autoresize = _a[2];
        if (root && chart && autoresize) {
            lastArea = getArea();
            resizeListener = throttle(function () {
                if (lastArea === 0) {
                    chart.setOption(Object.create(null), true);
                    chart.resize();
                    chart.setOption(option.value, true);
                }
                else {
                    chart.resize();
                }
                lastArea = getArea();
            }, 100);
            addListener(root, resizeListener);
        }
        cleanup(function () {
            if (resizeListener && root) {
                lastArea = 0;
                removeListener(root, resizeListener);
            }
        });
    });
}
var autoresizeProps = {
    autoresize: Boolean
};

var LOADING_OPTIONS_KEY = "ecLoadingOptions";
function useLoading(chart, loading, loadingOptions) {
    var defaultLoadingOptions = inject(LOADING_OPTIONS_KEY, {});
    var realLoadingOptions = computed(function () { return (__assign(__assign({}, unref(defaultLoadingOptions)), loadingOptions === null || loadingOptions === void 0 ? void 0 : loadingOptions.value)); });
    watchEffect(function () {
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

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "x-vue-echarts{display:block;width:100%;height:100%}";
styleInject(css_248z);

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

var TAG_NAME = "x-vue-echarts";
if (Vue2) {
    Vue2.config.ignoredElements.push(TAG_NAME);
}
var THEME_KEY = "ecTheme";
var INIT_OPTIONS_KEY = "ecInitOptions";
var UPDATE_OPTIONS_KEY = "ecUpdateOptions";
var ECharts = defineComponent({
    name: "echarts",
    props: __assign(__assign({ option: Object, theme: {
            type: [Object, String]
        }, initOptions: Object, updateOptions: Object, group: String, manualUpdate: Boolean }, autoresizeProps), loadingProps),
    inheritAttrs: false,
    setup: function (props, _a) {
        var attrs = _a.attrs, listeners = _a.listeners;
        var root = ref();
        var chart = shallowRef();
        var manualOption = shallowRef();
        var defaultTheme = inject(THEME_KEY, null);
        var defaultInitOptions = inject(INIT_OPTIONS_KEY, null);
        var defaultUpdateOptions = inject(UPDATE_OPTIONS_KEY, null);
        var realOption = computed(function () { return manualOption.value || props.option || Object.create(null); });
        var realTheme = computed(function () { return props.theme || unref(defaultTheme) || {}; });
        var realInitOptions = computed(function () { return props.initOptions || unref(defaultInitOptions) || {}; });
        var realUpdateOptions = computed(function () { return props.updateOptions || unref(defaultUpdateOptions) || {}; });
        var _b = toRefs(props), autoresize = _b.autoresize, manualUpdate = _b.manualUpdate, loading = _b.loading;
        var theme = toRef(props, "theme");
        var initOptions = toRef(props, "initOptions");
        var loadingOptions = toRef(props, "loadingOptions");
        var nonEventAttrs = computed(function () { return omitOn(attrs); });
        function init$1(option) {
            if (chart.value || !root.value) {
                return;
            }
            var instance = (chart.value = init(root.value, realTheme.value, realInitOptions.value));
            if (props.group) {
                instance.group = props.group;
            }
            var realListeners = listeners;
            if (!realListeners) {
                realListeners = {};
                Object.keys(attrs)
                    .filter(function (key) { return key.indexOf("on") === 0 && key.length > 2; })
                    .forEach(function (key) {
                    var event = key.charAt(2).toLowerCase() + key.slice(3);
                    realListeners[event] = attrs[key];
                });
            }
            Object.keys(realListeners).forEach(function (key) {
                var handler = realListeners[key];
                if (!handler) {
                    return;
                }
                if (key.indexOf("zr:") === 0) {
                    instance.getZr().on(key.slice(3).toLowerCase(), handler);
                }
                else {
                    instance.on(key.toLowerCase(), handler);
                }
            });
            instance.setOption(option || realOption.value, realUpdateOptions.value);
            function resize() {
                if (instance && !instance.isDisposed()) {
                    instance.resize();
                }
            }
            nextTick(resize);
            setTimeout(resize);
        }
        function setOption(option, updateOptions) {
            if (props.manualUpdate) {
                manualOption.value = option;
            }
            if (!chart.value) {
                init$1(option);
            }
            else {
                chart.value.setOption(option, __assign(__assign({}, realUpdateOptions.value), updateOptions));
            }
        }
        function cleanup() {
            if (chart.value) {
                chart.value.dispose();
                chart.value = undefined;
            }
        }
        var unwatchOption = null;
        watch(manualUpdate, function (manualUpdate) {
            if (typeof unwatchOption === "function") {
                unwatchOption();
                unwatchOption = null;
            }
            if (!manualUpdate) {
                unwatchOption = watch(function () { return props.option; }, function (option) {
                    if (!option) {
                        return;
                    }
                    if (!chart.value) {
                        init$1();
                    }
                    else {
                        chart.value.setOption(option, props.updateOptions);
                    }
                }, { deep: true });
            }
        }, {
            immediate: true
        });
        watch([theme, initOptions], function () {
            cleanup();
            init$1();
        }, {
            deep: true
        });
        watchEffect(function () {
            if (props.group && chart.value) {
                chart.value.group = props.group;
            }
        });
        var publicApi = usePublicAPI(chart, init$1);
        useLoading(chart, loading, loadingOptions);
        useAutoresize(chart, autoresize, root, realOption);
        onMounted(function () {
            if (props.option) {
                init$1();
            }
        });
        onUnmounted(cleanup);
        var exposed = __assign({ root: root,
            setOption: setOption,
            nonEventAttrs: nonEventAttrs }, publicApi);
        Object.defineProperty(exposed, "chart", {
            get: function () {
                return unref(chart);
            }
        });
        return exposed;
    },
    render: function () {
        var attrs = __assign({}, this.nonEventAttrs);
        attrs.ref = "root";
        attrs.class = attrs.class ? ["echarts"].concat(attrs.class) : "echarts";
        return h(TAG_NAME, attrs);
    }
});

export default ECharts;
export { INIT_OPTIONS_KEY, LOADING_OPTIONS_KEY, THEME_KEY, UPDATE_OPTIONS_KEY };
//# sourceMappingURL=index.esm.js.map
