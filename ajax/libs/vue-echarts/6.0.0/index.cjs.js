'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vueDemi = require('vue-demi');
var core = require('echarts/core');
var resizeDetector = require('resize-detector');

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
    function makePublicMethods() {
        var methods = Object.create(null);
        METHOD_NAMES.forEach(function (name) {
            methods[name] = makePublicMethod(name);
        });
        return methods;
    }
    return makePublicMethods();
}

function useAutoresize(chart, autoresize, root) {
    var resizeListener = null;
    vueDemi.watch([root, chart, autoresize], function (_a, _, cleanup) {
        var root = _a[0], chart = _a[1], autoresize = _a[2];
        if (root && chart && autoresize) {
            resizeListener = core.throttle(function () {
                chart.resize();
            }, 100);
            resizeDetector.addListener(root, resizeListener);
        }
        cleanup(function () {
            if (resizeListener && root) {
                resizeDetector.removeListener(root, resizeListener);
            }
        });
    });
}
var autoresizeProps = {
    autoresize: Boolean
};

var LOADING_OPTIONS_KEY = "ecLoadingOptions";
function useLoading(chart, loading, loadingOptions) {
    var defaultLoadingOptions = vueDemi.inject(LOADING_OPTIONS_KEY, {});
    var realLoadingOptions = vueDemi.computed(function () { return (__assign(__assign({}, vueDemi.unref(defaultLoadingOptions)), loadingOptions === null || loadingOptions === void 0 ? void 0 : loadingOptions.value)); });
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

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "x-vue-echarts{display:block;width:100%;height:100%}";
n(css,{});

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
if (vueDemi.Vue2) {
    vueDemi.Vue2.config.ignoredElements.push(TAG_NAME);
}
var THEME_KEY = "ecTheme";
var INIT_OPTIONS_KEY = "ecInitOptions";
var UPDATE_OPTIONS_KEY = "ecUpdateOptions";
var ECharts = vueDemi.defineComponent({
    name: "echarts",
    props: __assign(__assign({ option: Object, theme: {
            type: [Object, String]
        }, initOptions: Object, updateOptions: Object, group: String, manualUpdate: Boolean }, autoresizeProps), loadingProps),
    inheritAttrs: false,
    setup: function (props, _a) {
        var attrs = _a.attrs, listeners = _a.listeners;
        var root = vueDemi.shallowRef();
        var chart = vueDemi.shallowRef();
        var manualOption = vueDemi.shallowRef();
        var defaultTheme = vueDemi.inject(THEME_KEY, null);
        var defaultInitOptions = vueDemi.inject(INIT_OPTIONS_KEY, null);
        var defaultUpdateOptions = vueDemi.inject(UPDATE_OPTIONS_KEY, null);
        var _b = vueDemi.toRefs(props), autoresize = _b.autoresize, manualUpdate = _b.manualUpdate, loading = _b.loading, loadingOptions = _b.loadingOptions;
        var realOption = vueDemi.computed(function () { return manualOption.value || props.option || Object.create(null); });
        var realTheme = vueDemi.computed(function () { return props.theme || vueDemi.unref(defaultTheme) || {}; });
        var realInitOptions = vueDemi.computed(function () { return props.initOptions || vueDemi.unref(defaultInitOptions) || {}; });
        var realUpdateOptions = vueDemi.computed(function () { return props.updateOptions || vueDemi.unref(defaultUpdateOptions) || {}; });
        var nonEventAttrs = vueDemi.computed(function () { return omitOn(attrs); });
        function init(option) {
            if (chart.value || !root.value) {
                return;
            }
            var instance = (chart.value = core.init(root.value, realTheme.value, realInitOptions.value));
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
            function resize() {
                if (instance && !instance.isDisposed()) {
                    try {
                        instance.resize();
                    }
                    catch (e) {
                        if (e.message === "Cannot read property 'get' of undefined") {
                            return;
                        }
                        throw e;
                    }
                }
            }
            function commit() {
                instance.setOption(option || realOption.value, realUpdateOptions.value);
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
                unwatchOption = vueDemi.watch(function () { return props.option; }, function (option) {
                    if (!option) {
                        return;
                    }
                    if (!chart.value) {
                        init();
                    }
                    else {
                        chart.value.setOption(option, realUpdateOptions.value);
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
        var publicApi = usePublicAPI(chart, init);
        useLoading(chart, loading, loadingOptions);
        useAutoresize(chart, autoresize, root);
        vueDemi.onMounted(function () {
            if (props.option) {
                init();
            }
        });
        vueDemi.onUnmounted(cleanup);
        return __assign({ chart: chart,
            root: root,
            setOption: setOption,
            nonEventAttrs: nonEventAttrs }, publicApi);
    },
    render: function () {
        var attrs = __assign({}, this.nonEventAttrs);
        attrs.ref = "root";
        attrs.class = attrs.class ? ["echarts"].concat(attrs.class) : "echarts";
        return vueDemi.h(TAG_NAME, attrs);
    }
});

exports.INIT_OPTIONS_KEY = INIT_OPTIONS_KEY;
exports.LOADING_OPTIONS_KEY = LOADING_OPTIONS_KEY;
exports.THEME_KEY = THEME_KEY;
exports.UPDATE_OPTIONS_KEY = UPDATE_OPTIONS_KEY;
exports.default = ECharts;
//# sourceMappingURL=index.cjs.js.map
