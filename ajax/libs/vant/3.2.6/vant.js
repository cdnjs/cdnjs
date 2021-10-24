(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue")) : typeof define === "function" && define.amd ? define(["exports", "vue"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.vant = {}, global.Vue));
})(this, function(exports2, vue) {
  "use strict";
  function noop$1() {
  }
  var extend = Object.assign;
  var inBrowser$1 = typeof window !== "undefined";
  function get(object, path) {
    var keys = path.split(".");
    var result = object;
    keys.forEach((key) => {
      var _result$key;
      result = (_result$key = result[key]) != null ? _result$key : "";
    });
    return result;
  }
  function pick(obj, keys, ignoreUndefined) {
    return keys.reduce((ret, key) => {
      if (!ignoreUndefined || obj[key] !== void 0) {
        ret[key] = obj[key];
      }
      return ret;
    }, {});
  }
  var unknownProp = null;
  var numericProp = [Number, String];
  var truthProp = {
    type: Boolean,
    default: true
  };
  var makeRequiredProp = (type) => ({
    type,
    required: true
  });
  var makeArrayProp = () => ({
    type: Array,
    default: () => []
  });
  var makeNumberProp = (defaultVal) => ({
    type: Number,
    default: defaultVal
  });
  var makeNumericProp = (defaultVal) => ({
    type: numericProp,
    default: defaultVal
  });
  var makeStringProp = (defaultVal) => ({
    type: String,
    default: defaultVal
  });
  var inBrowser = typeof window !== "undefined";
  function raf(fn) {
    return inBrowser ? requestAnimationFrame(fn) : -1;
  }
  function cancelRaf(id) {
    if (inBrowser) {
      cancelAnimationFrame(id);
    }
  }
  function doubleRaf(fn) {
    raf(() => raf(fn));
  }
  function isWindow(val) {
    return val === window;
  }
  function makeDOMRect(width, height) {
    return {
      top: 0,
      left: 0,
      right: width,
      bottom: height,
      width,
      height
    };
  }
  var useRect = (elementOrRef) => {
    var element = vue.unref(elementOrRef);
    if (isWindow(element)) {
      var width = element.innerWidth;
      var height = element.innerHeight;
      return makeDOMRect(width, height);
    }
    if (element && element.getBoundingClientRect) {
      return element.getBoundingClientRect();
    }
    return makeDOMRect(0, 0);
  };
  function useToggle(defaultValue = false) {
    var state = vue.ref(defaultValue);
    var toggle = (value = !state.value) => {
      state.value = value;
    };
    return [state, toggle];
  }
  function useParent(key) {
    var parent = vue.inject(key, null);
    if (parent) {
      var instance2 = vue.getCurrentInstance();
      var {
        link: _link,
        unlink: _unlink,
        internalChildren
      } = parent;
      _link(instance2);
      vue.onUnmounted(() => _unlink(instance2));
      var index2 = vue.computed(() => internalChildren.indexOf(instance2));
      return {
        parent,
        index: index2
      };
    }
    return {
      parent: null,
      index: vue.ref(-1)
    };
  }
  function flattenVNodes(children) {
    var result = [];
    var traverse = (children2) => {
      if (Array.isArray(children2)) {
        children2.forEach((child) => {
          if (vue.isVNode(child)) {
            var _child$component;
            result.push(child);
            if ((_child$component = child.component) != null && _child$component.subTree) {
              traverse(child.component.subTree.children);
            }
            if (child.children) {
              traverse(child.children);
            }
          }
        });
      }
    };
    traverse(children);
    return result;
  }
  function sortChildren(parent, publicChildren, internalChildren) {
    var vnodes = flattenVNodes(parent.subTree.children);
    internalChildren.sort((a, b) => vnodes.indexOf(a.vnode) - vnodes.indexOf(b.vnode));
    var orderedPublicChildren = internalChildren.map((item) => item.proxy);
    publicChildren.sort((a, b) => {
      var indexA = orderedPublicChildren.indexOf(a);
      var indexB = orderedPublicChildren.indexOf(b);
      return indexA - indexB;
    });
  }
  function useChildren(key) {
    var publicChildren = vue.reactive([]);
    var internalChildren = vue.reactive([]);
    var parent = vue.getCurrentInstance();
    var linkChildren = (value) => {
      var link = (child) => {
        if (child.proxy) {
          internalChildren.push(child);
          publicChildren.push(child.proxy);
          sortChildren(parent, publicChildren, internalChildren);
        }
      };
      var unlink = (child) => {
        var index2 = internalChildren.indexOf(child);
        publicChildren.splice(index2, 1);
        internalChildren.splice(index2, 1);
      };
      vue.provide(key, Object.assign({
        link,
        unlink,
        children: publicChildren,
        internalChildren
      }, value));
    };
    return {
      children: publicChildren,
      linkChildren
    };
  }
  var SECOND = 1e3;
  var MINUTE = 60 * SECOND;
  var HOUR = 60 * MINUTE;
  var DAY = 24 * HOUR;
  function parseTime(time) {
    var days = Math.floor(time / DAY);
    var hours = Math.floor(time % DAY / HOUR);
    var minutes = Math.floor(time % HOUR / MINUTE);
    var seconds = Math.floor(time % MINUTE / SECOND);
    var milliseconds = Math.floor(time % SECOND);
    return {
      total: time,
      days,
      hours,
      minutes,
      seconds,
      milliseconds
    };
  }
  function isSameSecond(time1, time2) {
    return Math.floor(time1 / 1e3) === Math.floor(time2 / 1e3);
  }
  function useCountDown(options) {
    var rafId;
    var endTime;
    var counting;
    var deactivated;
    var remain = vue.ref(options.time);
    var current = vue.computed(() => parseTime(remain.value));
    var pause = () => {
      counting = false;
      cancelRaf(rafId);
    };
    var getCurrentRemain = () => Math.max(endTime - Date.now(), 0);
    var setRemain = (value) => {
      remain.value = value;
      options.onChange == null ? void 0 : options.onChange(current.value);
      if (value === 0) {
        pause();
        options.onFinish == null ? void 0 : options.onFinish();
      }
    };
    var microTick = () => {
      rafId = raf(() => {
        if (counting) {
          setRemain(getCurrentRemain());
          if (remain.value > 0) {
            microTick();
          }
        }
      });
    };
    var macroTick = () => {
      rafId = raf(() => {
        if (counting) {
          var remainRemain = getCurrentRemain();
          if (!isSameSecond(remainRemain, remain.value) || remainRemain === 0) {
            setRemain(remainRemain);
          }
          if (remain.value > 0) {
            macroTick();
          }
        }
      });
    };
    var tick = () => {
      if (!inBrowser) {
        return;
      }
      if (options.millisecond) {
        microTick();
      } else {
        macroTick();
      }
    };
    var start2 = () => {
      if (!counting) {
        endTime = Date.now() + remain.value;
        counting = true;
        tick();
      }
    };
    var reset = (totalTime = options.time) => {
      pause();
      remain.value = totalTime;
    };
    vue.onBeforeUnmount(pause);
    vue.onActivated(() => {
      if (deactivated) {
        counting = true;
        deactivated = false;
        tick();
      }
    });
    vue.onDeactivated(() => {
      if (counting) {
        pause();
        deactivated = true;
      }
    });
    return {
      start: start2,
      pause,
      reset,
      current
    };
  }
  function onMountedOrActivated(hook) {
    var mounted;
    vue.onMounted(() => {
      hook();
      vue.nextTick(() => {
        mounted = true;
      });
    });
    vue.onActivated(() => {
      if (mounted) {
        hook();
      }
    });
  }
  function useEventListener(type, listener, options = {}) {
    if (!inBrowser) {
      return;
    }
    var {
      target = window,
      passive: passive2 = false,
      capture = false
    } = options;
    var attached;
    var add = (target2) => {
      var element = vue.unref(target2);
      if (element && !attached) {
        element.addEventListener(type, listener, {
          capture,
          passive: passive2
        });
        attached = true;
      }
    };
    var remove2 = (target2) => {
      var element = vue.unref(target2);
      if (element && attached) {
        element.removeEventListener(type, listener, capture);
        attached = false;
      }
    };
    vue.onUnmounted(() => remove2(target));
    vue.onDeactivated(() => remove2(target));
    onMountedOrActivated(() => add(target));
    if (vue.isRef(target)) {
      vue.watch(target, (val, oldVal) => {
        remove2(oldVal);
        add(val);
      });
    }
  }
  function useClickAway(target, listener, options = {}) {
    if (!inBrowser) {
      return;
    }
    var {
      eventName = "click"
    } = options;
    var onClick = (event) => {
      var element = vue.unref(target);
      if (element && !element.contains(event.target)) {
        listener(event);
      }
    };
    useEventListener(eventName, onClick, {
      target: document
    });
  }
  function useWindowSize() {
    var width = vue.ref(inBrowser ? window.innerWidth : 0);
    var height = vue.ref(inBrowser ? window.innerHeight : 0);
    var onResize = () => {
      width.value = window.innerWidth;
      height.value = window.innerHeight;
    };
    useEventListener("resize", onResize);
    useEventListener("orientationchange", onResize);
    return {
      width,
      height
    };
  }
  var overflowScrollReg = /scroll|auto/i;
  var defaultRoot = inBrowser ? window : void 0;
  function isElement$1(node) {
    var ELEMENT_NODE_TYPE = 1;
    return node.tagName !== "HTML" && node.tagName !== "BODY" && node.nodeType === ELEMENT_NODE_TYPE;
  }
  function getScrollParent$1(el, root = defaultRoot) {
    var node = el;
    while (node && node !== root && isElement$1(node)) {
      var {
        overflowY
      } = window.getComputedStyle(node);
      if (overflowScrollReg.test(overflowY)) {
        return node;
      }
      node = node.parentNode;
    }
    return root;
  }
  function useScrollParent(el, root = defaultRoot) {
    var scrollParent = vue.ref();
    vue.onMounted(() => {
      if (el.value) {
        scrollParent.value = getScrollParent$1(el.value, root);
      }
    });
    return scrollParent;
  }
  function usePageVisibility() {
    var visibility = vue.ref("visible");
    var setVisibility = () => {
      if (inBrowser) {
        visibility.value = document.hidden ? "hidden" : "visible";
      }
    };
    setVisibility();
    useEventListener("visibilitychange", setVisibility);
    return visibility;
  }
  var CUSTOM_FIELD_INJECTION_KEY = Symbol("van-field");
  function useCustomFieldValue(customValue) {
    var field = vue.inject(CUSTOM_FIELD_INJECTION_KEY, null);
    if (field && !field.customValue.value) {
      field.customValue.value = customValue;
      vue.watch(customValue, () => {
        field.resetValidation();
        field.validateWithTrigger("onChange");
      });
    }
  }
  var isDef = (val) => val !== void 0 && val !== null;
  var isFunction = (val) => typeof val === "function";
  var isObject$1 = (val) => val !== null && typeof val === "object";
  var isPromise = (val) => isObject$1(val) && isFunction(val.then) && isFunction(val.catch);
  var isDate = (val) => Object.prototype.toString.call(val) === "[object Date]" && !Number.isNaN(val.getTime());
  function isMobile(value) {
    value = value.replace(/[^-|\d]/g, "");
    return /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value);
  }
  var isNumeric = (val) => typeof val === "number" || /^\d+(\.\d+)?$/.test(val);
  var isIOS$1 = () => inBrowser$1 ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : false;
  function getScrollTop(el) {
    var top2 = "scrollTop" in el ? el.scrollTop : el.pageYOffset;
    return Math.max(top2, 0);
  }
  function setScrollTop(el, value) {
    if ("scrollTop" in el) {
      el.scrollTop = value;
    } else {
      el.scrollTo(el.scrollX, value);
    }
  }
  function getRootScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }
  function setRootScrollTop(value) {
    setScrollTop(window, value);
    setScrollTop(document.body, value);
  }
  function getElementTop(el, scroller) {
    if (el === window) {
      return 0;
    }
    var scrollTop = scroller ? getScrollTop(scroller) : getRootScrollTop();
    return useRect(el).top + scrollTop;
  }
  var isIOS = isIOS$1();
  function resetScroll() {
    if (isIOS) {
      setRootScrollTop(getRootScrollTop());
    }
  }
  var stopPropagation = (event) => event.stopPropagation();
  function preventDefault(event, isStopPropagation) {
    if (typeof event.cancelable !== "boolean" || event.cancelable) {
      event.preventDefault();
    }
    if (isStopPropagation) {
      stopPropagation(event);
    }
  }
  function trigger(target, type) {
    var inputEvent = document.createEvent("HTMLEvents");
    inputEvent.initEvent(type, true, true);
    target.dispatchEvent(inputEvent);
  }
  function isHidden(elementRef) {
    var el = vue.unref(elementRef);
    if (!el) {
      return false;
    }
    var style = window.getComputedStyle(el);
    var hidden = style.display === "none";
    var parentHidden = el.offsetParent === null && style.position !== "fixed";
    return hidden || parentHidden;
  }
  function addUnit(value) {
    if (!isDef(value)) {
      return void 0;
    }
    return isNumeric(value) ? value + "px" : String(value);
  }
  function getSizeStyle(originSize) {
    if (isDef(originSize)) {
      var size = addUnit(originSize);
      return {
        width: size,
        height: size
      };
    }
  }
  function getZIndexStyle(zIndex) {
    var style = {};
    if (zIndex !== void 0) {
      style.zIndex = +zIndex;
    }
    return style;
  }
  var rootFontSize;
  function getRootFontSize() {
    if (!rootFontSize) {
      var doc = document.documentElement;
      var fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize;
      rootFontSize = parseFloat(fontSize);
    }
    return rootFontSize;
  }
  function convertRem(value) {
    value = value.replace(/rem/g, "");
    return +value * getRootFontSize();
  }
  function convertVw(value) {
    value = value.replace(/vw/g, "");
    return +value * window.innerWidth / 100;
  }
  function convertVh(value) {
    value = value.replace(/vh/g, "");
    return +value * window.innerHeight / 100;
  }
  function unitToPx(value) {
    if (typeof value === "number") {
      return value;
    }
    if (inBrowser$1) {
      if (value.includes("rem")) {
        return convertRem(value);
      }
      if (value.includes("vw")) {
        return convertVw(value);
      }
      if (value.includes("vh")) {
        return convertVh(value);
      }
    }
    return parseFloat(value);
  }
  var camelizeRE = /-(\w)/g;
  var camelize = (str) => str.replace(camelizeRE, (_, c) => c.toUpperCase());
  var kebabCase = (str) => str.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "");
  function padZero(num, targetLength = 2) {
    var str = num + "";
    while (str.length < targetLength) {
      str = "0" + str;
    }
    return str;
  }
  var clamp = (num, min, max) => Math.min(Math.max(num, min), max);
  function trimExtraChar(value, char, regExp) {
    var index2 = value.indexOf(char);
    if (index2 === -1) {
      return value;
    }
    if (char === "-" && index2 !== 0) {
      return value.slice(0, index2);
    }
    return value.slice(0, index2 + 1) + value.slice(index2).replace(regExp, "");
  }
  function formatNumber(value, allowDot = true, allowMinus = true) {
    if (allowDot) {
      value = trimExtraChar(value, ".", /\./g);
    } else {
      value = value.split(".")[0];
    }
    if (allowMinus) {
      value = trimExtraChar(value, "-", /-/g);
    } else {
      value = value.replace(/-/, "");
    }
    var regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;
    return value.replace(regExp, "");
  }
  function addNumber(num1, num2) {
    var cardinal = Math.pow(10, 10);
    return Math.round((num1 + num2) * cardinal) / cardinal;
  }
  var {
    hasOwnProperty
  } = Object.prototype;
  function assignKey(to, from, key) {
    var val = from[key];
    if (!isDef(val)) {
      return;
    }
    if (!hasOwnProperty.call(to, key) || !isObject$1(val)) {
      to[key] = val;
    } else {
      to[key] = deepAssign(Object(to[key]), from[key]);
    }
  }
  function deepAssign(to, from) {
    Object.keys(from).forEach((key) => {
      assignKey(to, from, key);
    });
    return to;
  }
  var defaultMessages = {
    name: "\u59D3\u540D",
    tel: "\u7535\u8BDD",
    save: "\u4FDD\u5B58",
    confirm: "\u786E\u8BA4",
    cancel: "\u53D6\u6D88",
    delete: "\u5220\u9664",
    loading: "\u52A0\u8F7D\u4E2D...",
    noCoupon: "\u6682\u65E0\u4F18\u60E0\u5238",
    nameEmpty: "\u8BF7\u586B\u5199\u59D3\u540D",
    telInvalid: "\u8BF7\u586B\u5199\u6B63\u786E\u7684\u7535\u8BDD",
    vanCalendar: {
      end: "\u7ED3\u675F",
      start: "\u5F00\u59CB",
      title: "\u65E5\u671F\u9009\u62E9",
      confirm: "\u786E\u5B9A",
      startEnd: "\u5F00\u59CB/\u7ED3\u675F",
      weekdays: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"],
      monthTitle: (year, month) => year + "\u5E74" + month + "\u6708",
      rangePrompt: (maxRange) => "\u6700\u591A\u9009\u62E9 " + maxRange + " \u5929"
    },
    vanCascader: {
      select: "\u8BF7\u9009\u62E9"
    },
    vanContactCard: {
      addText: "\u6DFB\u52A0\u8054\u7CFB\u4EBA"
    },
    vanContactList: {
      addText: "\u65B0\u5EFA\u8054\u7CFB\u4EBA"
    },
    vanPagination: {
      prev: "\u4E0A\u4E00\u9875",
      next: "\u4E0B\u4E00\u9875"
    },
    vanPullRefresh: {
      pulling: "\u4E0B\u62C9\u5373\u53EF\u5237\u65B0...",
      loosing: "\u91CA\u653E\u5373\u53EF\u5237\u65B0..."
    },
    vanSubmitBar: {
      label: "\u5408\u8BA1\uFF1A"
    },
    vanCoupon: {
      unlimited: "\u65E0\u4F7F\u7528\u95E8\u69DB",
      discount: (discount) => discount + "\u6298",
      condition: (condition) => "\u6EE1" + condition + "\u5143\u53EF\u7528"
    },
    vanCouponCell: {
      title: "\u4F18\u60E0\u5238",
      count: (count) => count + "\u5F20\u53EF\u7528"
    },
    vanCouponList: {
      exchange: "\u5151\u6362",
      close: "\u4E0D\u4F7F\u7528\u4F18\u60E0\u5238",
      enable: "\u53EF\u7528",
      disabled: "\u4E0D\u53EF\u7528",
      placeholder: "\u8BF7\u8F93\u5165\u4F18\u60E0\u7801"
    },
    vanAddressEdit: {
      area: "\u5730\u533A",
      postal: "\u90AE\u653F\u7F16\u7801",
      areaEmpty: "\u8BF7\u9009\u62E9\u5730\u533A",
      addressEmpty: "\u8BF7\u586B\u5199\u8BE6\u7EC6\u5730\u5740",
      postalEmpty: "\u90AE\u653F\u7F16\u7801\u4E0D\u6B63\u786E",
      defaultAddress: "\u8BBE\u4E3A\u9ED8\u8BA4\u6536\u8D27\u5730\u5740"
    },
    vanAddressEditDetail: {
      label: "\u8BE6\u7EC6\u5730\u5740",
      placeholder: "\u8857\u9053\u95E8\u724C\u4FE1\u606F"
    },
    vanAddressList: {
      add: "\u65B0\u589E\u5730\u5740"
    }
  };
  var lang = vue.ref("zh-CN");
  var messages = vue.reactive({
    "zh-CN": defaultMessages
  });
  var Locale = {
    messages() {
      return messages[lang.value];
    },
    use(newLang, newMessages) {
      lang.value = newLang;
      this.add({
        [newLang]: newMessages
      });
    },
    add(newMessages = {}) {
      deepAssign(messages, newMessages);
    }
  };
  function createTranslate(name2) {
    var prefix2 = camelize(name2) + ".";
    return (path, ...args) => {
      var messages2 = Locale.messages();
      var message = get(messages2, prefix2 + path) || get(messages2, path);
      return isFunction(message) ? message(...args) : message;
    };
  }
  function genBem(name2, mods) {
    if (!mods) {
      return "";
    }
    if (typeof mods === "string") {
      return " " + name2 + "--" + mods;
    }
    if (Array.isArray(mods)) {
      return mods.reduce((ret, item) => ret + genBem(name2, item), "");
    }
    return Object.keys(mods).reduce((ret, key) => ret + (mods[key] ? genBem(name2, key) : ""), "");
  }
  function createBEM(name2) {
    return (el, mods) => {
      if (el && typeof el !== "string") {
        mods = el;
        el = "";
      }
      el = el ? name2 + "__" + el : name2;
      return "" + el + genBem(el, mods);
    };
  }
  function createNamespace(name2) {
    var prefixedName = "van-" + name2;
    return [prefixedName, createBEM(prefixedName), createTranslate(prefixedName)];
  }
  var BORDER = "van-hairline";
  var BORDER_TOP = BORDER + "--top";
  var BORDER_LEFT = BORDER + "--left";
  var BORDER_BOTTOM = BORDER + "--bottom";
  var BORDER_SURROUND = BORDER + "--surround";
  var BORDER_TOP_BOTTOM = BORDER + "--top-bottom";
  var BORDER_UNSET_TOP_BOTTOM = BORDER + "-unset--top-bottom";
  var FORM_KEY = Symbol("van-form");
  function callInterceptor(interceptor, {
    args = [],
    done,
    canceled
  }) {
    if (interceptor) {
      var returnVal = interceptor.apply(null, args);
      if (isPromise(returnVal)) {
        returnVal.then((value) => {
          if (value) {
            done();
          } else if (canceled) {
            canceled();
          }
        }).catch(noop$1);
      } else if (returnVal) {
        done();
      } else if (canceled) {
        canceled();
      }
    } else {
      done();
    }
  }
  function withInstall(options) {
    options.install = (app) => {
      var {
        name: name2
      } = options;
      app.component(name2, options);
      app.component(camelize("-" + name2), options);
    };
    return options;
  }
  var [name$1u, bem$1q] = createNamespace("action-bar");
  var ACTION_BAR_KEY = Symbol(name$1u);
  var _ActionBar = vue.defineComponent({
    name: name$1u,
    props: {
      safeAreaInsetBottom: truthProp
    },
    setup(props2, {
      slots
    }) {
      var {
        linkChildren
      } = useChildren(ACTION_BAR_KEY);
      linkChildren();
      return () => vue.createVNode("div", {
        "class": [bem$1q(), {
          "van-safe-area-bottom": props2.safeAreaInsetBottom
        }]
      }, [slots.default == null ? void 0 : slots.default()]);
    }
  });
  var ActionBar = withInstall(_ActionBar);
  function useExpose(apis) {
    var instance2 = vue.getCurrentInstance();
    if (instance2) {
      extend(instance2.proxy, apis);
    }
  }
  var routeProps = {
    to: [String, Object],
    url: String,
    replace: Boolean
  };
  function route(vm) {
    var router = vm.$router;
    var {
      to,
      url,
      replace
    } = vm;
    if (to && router) {
      router[replace ? "replace" : "push"](to);
    } else if (url) {
      replace ? location.replace(url) : location.href = url;
    }
  }
  function useRoute() {
    var vm = vue.getCurrentInstance().proxy;
    return () => route(vm);
  }
  var [name$1t, bem$1p] = createNamespace("badge");
  var _Badge = vue.defineComponent({
    name: name$1t,
    props: {
      dot: Boolean,
      max: numericProp,
      tag: makeStringProp("div"),
      color: String,
      offset: Array,
      content: numericProp,
      showZero: truthProp
    },
    setup(props2, {
      slots
    }) {
      var hasContent = () => {
        if (slots.content) {
          return true;
        }
        var {
          content,
          showZero
        } = props2;
        return isDef(content) && content !== "" && (showZero || content !== 0);
      };
      var renderContent = () => {
        var {
          dot,
          max,
          content
        } = props2;
        if (!dot && hasContent()) {
          if (slots.content) {
            return slots.content();
          }
          if (isDef(max) && isNumeric(content) && +content > max) {
            return max + "+";
          }
          return content;
        }
      };
      var style = vue.computed(() => {
        var style2 = {
          background: props2.color
        };
        if (props2.offset) {
          var [x, y] = props2.offset;
          if (slots.default) {
            style2.top = addUnit(y);
            if (typeof x === "number") {
              style2.right = addUnit(-x);
            } else {
              style2.right = x.startsWith("-") ? x.replace("-", "") : "-" + x;
            }
          } else {
            style2.marginTop = addUnit(y);
            style2.marginLeft = addUnit(x);
          }
        }
        return style2;
      });
      var renderBadge = () => {
        if (hasContent() || props2.dot) {
          return vue.createVNode("div", {
            "class": bem$1p({
              dot: props2.dot,
              fixed: !!slots.default
            }),
            "style": style.value
          }, [renderContent()]);
        }
      };
      return () => {
        if (slots.default) {
          var {
            tag
          } = props2;
          return vue.createVNode(tag, {
            "class": bem$1p("wrapper")
          }, {
            default: () => [slots.default(), renderBadge()]
          });
        }
        return renderBadge();
      };
    }
  });
  var Badge = withInstall(_Badge);
  var [name$1s, bem$1o] = createNamespace("config-provider");
  var CONFIG_PROVIDER_KEY = Symbol(name$1s);
  function mapThemeVarsToCSSVars(themeVars) {
    var cssVars = {};
    Object.keys(themeVars).forEach((key) => {
      cssVars["--van-" + kebabCase(key)] = themeVars[key];
    });
    return cssVars;
  }
  var _ConfigProvider = vue.defineComponent({
    name: name$1s,
    props: {
      tag: makeStringProp("div"),
      themeVars: Object,
      iconPrefix: String
    },
    setup(props2, {
      slots
    }) {
      var style = vue.computed(() => {
        if (props2.themeVars) {
          return mapThemeVarsToCSSVars(props2.themeVars);
        }
      });
      vue.provide(CONFIG_PROVIDER_KEY, props2);
      return () => vue.createVNode(props2.tag, {
        "class": bem$1o(),
        "style": style.value
      }, {
        default: () => [slots.default == null ? void 0 : slots.default()]
      });
    }
  });
  var [name$1r, bem$1n] = createNamespace("icon");
  var isImage = (name2) => name2 == null ? void 0 : name2.includes("/");
  var _Icon = vue.defineComponent({
    name: name$1r,
    props: {
      dot: Boolean,
      tag: makeStringProp("i"),
      name: String,
      size: numericProp,
      badge: numericProp,
      color: String,
      classPrefix: String
    },
    setup(props2, {
      slots
    }) {
      var config = vue.inject(CONFIG_PROVIDER_KEY, null);
      var classPrefix = vue.computed(() => props2.classPrefix || (config == null ? void 0 : config.iconPrefix) || bem$1n());
      return () => {
        var {
          tag,
          dot,
          name: name2,
          size,
          badge,
          color
        } = props2;
        var isImageIcon = isImage(name2);
        return vue.createVNode(Badge, {
          "dot": dot,
          "tag": tag,
          "content": badge,
          "class": [classPrefix.value, isImageIcon ? "" : classPrefix.value + "-" + name2],
          "style": {
            color,
            fontSize: addUnit(size)
          }
        }, {
          default: () => [slots.default == null ? void 0 : slots.default(), isImageIcon && vue.createVNode("img", {
            "class": bem$1n("image"),
            "src": name2
          }, null)]
        });
      };
    }
  });
  var Icon = withInstall(_Icon);
  var [name$1q, bem$1m] = createNamespace("loading");
  var SpinIcon = Array(12).fill(null).map((_, index2) => vue.createVNode("i", {
    "class": bem$1m("line", String(index2 + 1))
  }, null));
  var CircularIcon = vue.createVNode("svg", {
    "class": bem$1m("circular"),
    "viewBox": "25 25 50 50"
  }, [vue.createVNode("circle", {
    "cx": "50",
    "cy": "50",
    "r": "20",
    "fill": "none"
  }, null)]);
  var _Loading = vue.defineComponent({
    name: name$1q,
    props: {
      size: numericProp,
      type: makeStringProp("circular"),
      color: String,
      vertical: Boolean,
      textSize: numericProp,
      textColor: String
    },
    setup(props2, {
      slots
    }) {
      var spinnerStyle = vue.computed(() => extend({
        color: props2.color
      }, getSizeStyle(props2.size)));
      var renderText = () => {
        if (slots.default) {
          var _props$textColor;
          return vue.createVNode("span", {
            "class": bem$1m("text"),
            "style": {
              fontSize: addUnit(props2.textSize),
              color: (_props$textColor = props2.textColor) != null ? _props$textColor : props2.color
            }
          }, [slots.default()]);
        }
      };
      return () => {
        var {
          type,
          vertical
        } = props2;
        return vue.createVNode("div", {
          "class": bem$1m([type, {
            vertical
          }])
        }, [vue.createVNode("span", {
          "class": bem$1m("spinner", type),
          "style": spinnerStyle.value
        }, [type === "spinner" ? SpinIcon : CircularIcon]), renderText()]);
      };
    }
  });
  var Loading = withInstall(_Loading);
  var [name$1p, bem$1l] = createNamespace("button");
  var _Button = vue.defineComponent({
    name: name$1p,
    props: extend({}, routeProps, {
      tag: makeStringProp("button"),
      text: String,
      icon: String,
      type: makeStringProp("default"),
      size: makeStringProp("normal"),
      color: String,
      block: Boolean,
      plain: Boolean,
      round: Boolean,
      square: Boolean,
      loading: Boolean,
      hairline: Boolean,
      disabled: Boolean,
      iconPrefix: String,
      nativeType: makeStringProp("button"),
      loadingSize: numericProp,
      loadingText: String,
      loadingType: String,
      iconPosition: makeStringProp("left")
    }),
    emits: ["click"],
    setup(props2, {
      emit,
      slots
    }) {
      var route2 = useRoute();
      var renderLoadingIcon = () => {
        if (slots.loading) {
          return slots.loading();
        }
        return vue.createVNode(Loading, {
          "size": props2.loadingSize,
          "type": props2.loadingType,
          "class": bem$1l("loading")
        }, null);
      };
      var renderIcon = () => {
        if (props2.loading) {
          return renderLoadingIcon();
        }
        if (slots.icon) {
          return vue.createVNode("div", {
            "class": bem$1l("icon")
          }, [slots.icon()]);
        }
        if (props2.icon) {
          return vue.createVNode(Icon, {
            "name": props2.icon,
            "class": bem$1l("icon"),
            "classPrefix": props2.iconPrefix
          }, null);
        }
      };
      var renderText = () => {
        var text;
        if (props2.loading) {
          text = props2.loadingText;
        } else {
          text = slots.default ? slots.default() : props2.text;
        }
        if (text) {
          return vue.createVNode("span", {
            "class": bem$1l("text")
          }, [text]);
        }
      };
      var getStyle = () => {
        var {
          color,
          plain
        } = props2;
        if (color) {
          var style = {
            color: plain ? color : "white"
          };
          if (!plain) {
            style.background = color;
          }
          if (color.includes("gradient")) {
            style.border = 0;
          } else {
            style.borderColor = color;
          }
          return style;
        }
      };
      var onClick = (event) => {
        if (props2.loading) {
          event.preventDefault();
        } else if (!props2.disabled) {
          emit("click", event);
          route2();
        }
      };
      return () => {
        var {
          tag,
          type,
          size,
          block,
          round: round2,
          plain,
          square,
          loading,
          disabled,
          hairline,
          nativeType,
          iconPosition
        } = props2;
        var classes = [bem$1l([type, size, {
          plain,
          block,
          round: round2,
          square,
          loading,
          disabled,
          hairline
        }]), {
          [BORDER_SURROUND]: hairline
        }];
        return vue.createVNode(tag, {
          "type": nativeType,
          "class": classes,
          "style": getStyle(),
          "disabled": disabled,
          "onClick": onClick
        }, {
          default: () => [vue.createVNode("div", {
            "class": bem$1l("content")
          }, [iconPosition === "left" && renderIcon(), renderText(), iconPosition === "right" && renderIcon()])]
        });
      };
    }
  });
  var Button = withInstall(_Button);
  var [name$1o, bem$1k] = createNamespace("action-bar-button");
  var _ActionBarButton = vue.defineComponent({
    name: name$1o,
    props: extend({}, routeProps, {
      type: String,
      text: String,
      icon: String,
      color: String,
      loading: Boolean,
      disabled: Boolean
    }),
    setup(props2, {
      slots
    }) {
      var route2 = useRoute();
      var {
        parent,
        index: index2
      } = useParent(ACTION_BAR_KEY);
      var isFirst = vue.computed(() => {
        if (parent) {
          var prev = parent.children[index2.value - 1];
          return !(prev && "isButton" in prev);
        }
      });
      var isLast = vue.computed(() => {
        if (parent) {
          var next = parent.children[index2.value + 1];
          return !(next && "isButton" in next);
        }
      });
      useExpose({
        isButton: true
      });
      return () => {
        var {
          type,
          icon,
          text,
          color,
          loading,
          disabled
        } = props2;
        return vue.createVNode(Button, {
          "class": bem$1k([type, {
            last: isLast.value,
            first: isFirst.value
          }]),
          "size": "large",
          "type": type,
          "icon": icon,
          "color": color,
          "loading": loading,
          "disabled": disabled,
          "onClick": route2
        }, {
          default: () => [slots.default ? slots.default() : text]
        });
      };
    }
  });
  var ActionBarButton = withInstall(_ActionBarButton);
  var [name$1n, bem$1j] = createNamespace("action-bar-icon");
  var _ActionBarIcon = vue.defineComponent({
    name: name$1n,
    props: extend({}, routeProps, {
      dot: Boolean,
      text: String,
      icon: String,
      color: String,
      badge: numericProp,
      iconClass: unknownProp,
      iconPrefix: String
    }),
    setup(props2, {
      slots
    }) {
      var route2 = useRoute();
      useParent(ACTION_BAR_KEY);
      var renderIcon = () => {
        var {
          dot,
          badge,
          icon,
          color,
          iconClass,
          iconPrefix
        } = props2;
        if (slots.icon) {
          return vue.createVNode(Badge, {
            "dot": dot,
            "content": badge,
            "class": bem$1j("icon")
          }, {
            default: slots.icon
          });
        }
        return vue.createVNode(Icon, {
          "tag": "div",
          "dot": dot,
          "name": icon,
          "badge": badge,
          "color": color,
          "class": [bem$1j("icon"), iconClass],
          "classPrefix": iconPrefix
        }, null);
      };
      return () => vue.createVNode("div", {
        "role": "button",
        "class": bem$1j(),
        "tabindex": 0,
        "onClick": route2
      }, [renderIcon(), slots.default ? slots.default() : props2.text]);
    }
  });
  var ActionBarIcon = withInstall(_ActionBarIcon);
  var popupSharedProps = {
    show: Boolean,
    zIndex: numericProp,
    overlay: truthProp,
    duration: numericProp,
    teleport: [String, Object],
    lockScroll: truthProp,
    lazyRender: truthProp,
    beforeClose: Function,
    overlayStyle: Object,
    overlayClass: unknownProp,
    transitionAppear: Boolean,
    closeOnClickOverlay: truthProp
  };
  var popupSharedPropKeys = Object.keys(popupSharedProps);
  var MIN_DISTANCE = 10;
  function getDirection(x, y) {
    if (x > y && x > MIN_DISTANCE) {
      return "horizontal";
    }
    if (y > x && y > MIN_DISTANCE) {
      return "vertical";
    }
    return "";
  }
  function useTouch() {
    var startX = vue.ref(0);
    var startY = vue.ref(0);
    var deltaX = vue.ref(0);
    var deltaY = vue.ref(0);
    var offsetX = vue.ref(0);
    var offsetY = vue.ref(0);
    var direction = vue.ref("");
    var isVertical = () => direction.value === "vertical";
    var isHorizontal = () => direction.value === "horizontal";
    var reset = () => {
      deltaX.value = 0;
      deltaY.value = 0;
      offsetX.value = 0;
      offsetY.value = 0;
      direction.value = "";
    };
    var start2 = (event) => {
      reset();
      startX.value = event.touches[0].clientX;
      startY.value = event.touches[0].clientY;
    };
    var move = (event) => {
      var touch = event.touches[0];
      deltaX.value = touch.clientX < 0 ? 0 : touch.clientX - startX.value;
      deltaY.value = touch.clientY - startY.value;
      offsetX.value = Math.abs(deltaX.value);
      offsetY.value = Math.abs(deltaY.value);
      if (!direction.value) {
        direction.value = getDirection(offsetX.value, offsetY.value);
      }
    };
    return {
      move,
      start: start2,
      reset,
      startX,
      startY,
      deltaX,
      deltaY,
      offsetX,
      offsetY,
      direction,
      isVertical,
      isHorizontal
    };
  }
  var totalLockCount = 0;
  var BODY_LOCK_CLASS = "van-overflow-hidden";
  function useLockScroll(rootRef, shouldLock) {
    var touch = useTouch();
    var onTouchMove = (event) => {
      touch.move(event);
      var direction = touch.deltaY.value > 0 ? "10" : "01";
      var el = getScrollParent$1(event.target, rootRef.value);
      var {
        scrollHeight,
        offsetHeight,
        scrollTop
      } = el;
      var status = "11";
      if (scrollTop === 0) {
        status = offsetHeight >= scrollHeight ? "00" : "01";
      } else if (scrollTop + offsetHeight >= scrollHeight) {
        status = "10";
      }
      if (status !== "11" && touch.isVertical() && !(parseInt(status, 2) & parseInt(direction, 2))) {
        preventDefault(event, true);
      }
    };
    var lock = () => {
      document.addEventListener("touchstart", touch.start);
      document.addEventListener("touchmove", onTouchMove, {
        passive: false
      });
      if (!totalLockCount) {
        document.body.classList.add(BODY_LOCK_CLASS);
      }
      totalLockCount++;
    };
    var unlock = () => {
      if (totalLockCount) {
        document.removeEventListener("touchstart", touch.start);
        document.removeEventListener("touchmove", onTouchMove);
        totalLockCount--;
        if (!totalLockCount) {
          document.body.classList.remove(BODY_LOCK_CLASS);
        }
      }
    };
    var init = () => shouldLock() && lock();
    var destroy = () => shouldLock() && unlock();
    onMountedOrActivated(init);
    vue.onDeactivated(destroy);
    vue.onBeforeUnmount(destroy);
    vue.watch(shouldLock, (value) => {
      value ? lock() : unlock();
    });
  }
  function useLazyRender(show) {
    var inited = vue.ref(false);
    vue.watch(show, (value) => {
      if (value) {
        inited.value = value;
      }
    }, {
      immediate: true
    });
    return (render) => () => inited.value ? render() : null;
  }
  var POPUP_TOGGLE_KEY = Symbol();
  function onPopupReopen(callback) {
    var popupToggleStatus = vue.inject(POPUP_TOGGLE_KEY, null);
    if (popupToggleStatus) {
      vue.watch(popupToggleStatus, (show) => {
        if (show) {
          callback();
        }
      });
    }
  }
  var [name$1m, bem$1i] = createNamespace("overlay");
  var _Overlay = vue.defineComponent({
    name: name$1m,
    props: {
      show: Boolean,
      zIndex: numericProp,
      duration: numericProp,
      className: unknownProp,
      lockScroll: truthProp,
      customStyle: Object
    },
    setup(props2, {
      slots
    }) {
      var lazyRender = useLazyRender(() => props2.show);
      var preventTouchMove = (event) => {
        preventDefault(event, true);
      };
      var renderOverlay = lazyRender(() => {
        var style = extend(getZIndexStyle(props2.zIndex), props2.customStyle);
        if (isDef(props2.duration)) {
          style.animationDuration = props2.duration + "s";
        }
        return vue.withDirectives(vue.createVNode("div", {
          "style": style,
          "class": [bem$1i(), props2.className],
          "onTouchmove": props2.lockScroll ? preventTouchMove : noop$1
        }, [slots.default == null ? void 0 : slots.default()]), [[vue.vShow, props2.show]]);
      });
      return () => vue.createVNode(vue.Transition, {
        "name": "van-fade",
        "appear": true
      }, {
        default: renderOverlay
      });
    }
  });
  var Overlay = withInstall(_Overlay);
  var [name$1l, bem$1h] = createNamespace("popup");
  var globalZIndex = 2e3;
  var _Popup = vue.defineComponent({
    name: name$1l,
    inheritAttrs: false,
    props: extend({}, popupSharedProps, {
      round: Boolean,
      position: makeStringProp("center"),
      closeIcon: makeStringProp("cross"),
      closeable: Boolean,
      transition: String,
      iconPrefix: String,
      closeOnPopstate: Boolean,
      closeIconPosition: makeStringProp("top-right"),
      safeAreaInsetBottom: Boolean
    }),
    emits: ["open", "close", "click", "opened", "closed", "update:show", "click-overlay", "click-close-icon"],
    setup(props2, {
      emit,
      attrs,
      slots
    }) {
      var opened;
      var shouldReopen;
      var zIndex = vue.ref();
      var popupRef = vue.ref();
      var lazyRender = useLazyRender(() => props2.show || !props2.lazyRender);
      var style = vue.computed(() => {
        var style2 = {
          zIndex: zIndex.value
        };
        if (isDef(props2.duration)) {
          var key = props2.position === "center" ? "animationDuration" : "transitionDuration";
          style2[key] = props2.duration + "s";
        }
        return style2;
      });
      var open = () => {
        if (!opened) {
          if (props2.zIndex !== void 0) {
            globalZIndex = +props2.zIndex;
          }
          opened = true;
          zIndex.value = ++globalZIndex;
          emit("open");
        }
      };
      var close = () => {
        if (opened) {
          callInterceptor(props2.beforeClose, {
            done() {
              opened = false;
              emit("close");
              emit("update:show", false);
            }
          });
        }
      };
      var onClickOverlay = (event) => {
        emit("click-overlay", event);
        if (props2.closeOnClickOverlay) {
          close();
        }
      };
      var renderOverlay = () => {
        if (props2.overlay) {
          return vue.createVNode(Overlay, {
            "show": props2.show,
            "class": props2.overlayClass,
            "zIndex": zIndex.value,
            "duration": props2.duration,
            "customStyle": props2.overlayStyle,
            "onClick": onClickOverlay
          }, {
            default: slots["overlay-content"]
          });
        }
      };
      var onClickCloseIcon = (event) => {
        emit("click-close-icon", event);
        close();
      };
      var renderCloseIcon = () => {
        if (props2.closeable) {
          return vue.createVNode(Icon, {
            "role": "button",
            "tabindex": 0,
            "name": props2.closeIcon,
            "class": bem$1h("close-icon", props2.closeIconPosition),
            "classPrefix": props2.iconPrefix,
            "onClick": onClickCloseIcon
          }, null);
        }
      };
      var onClick = (event) => emit("click", event);
      var onOpened = () => emit("opened");
      var onClosed = () => emit("closed");
      var renderPopup = lazyRender(() => {
        var {
          round: round2,
          position,
          safeAreaInsetBottom
        } = props2;
        return vue.withDirectives(vue.createVNode("div", vue.mergeProps({
          "ref": popupRef,
          "style": style.value,
          "class": [bem$1h({
            round: round2,
            [position]: position
          }), {
            "van-safe-area-bottom": safeAreaInsetBottom
          }],
          "onClick": onClick
        }, attrs), [slots.default == null ? void 0 : slots.default(), renderCloseIcon()]), [[vue.vShow, props2.show]]);
      });
      var renderTransition = () => {
        var {
          position,
          transition,
          transitionAppear
        } = props2;
        var name2 = position === "center" ? "van-fade" : "van-popup-slide-" + position;
        return vue.createVNode(vue.Transition, {
          "name": transition || name2,
          "appear": transitionAppear,
          "onAfterEnter": onOpened,
          "onAfterLeave": onClosed
        }, {
          default: renderPopup
        });
      };
      vue.watch(() => props2.show, (value) => {
        if (value) {
          open();
        } else {
          opened = false;
          emit("close");
        }
      });
      useExpose({
        popupRef
      });
      useLockScroll(popupRef, () => props2.show && props2.lockScroll);
      useEventListener("popstate", () => {
        if (props2.closeOnPopstate) {
          close();
          shouldReopen = false;
        }
      });
      vue.onMounted(() => {
        if (props2.show) {
          open();
        }
      });
      vue.onActivated(() => {
        if (shouldReopen) {
          emit("update:show", true);
          shouldReopen = false;
        }
      });
      vue.onDeactivated(() => {
        if (props2.show) {
          close();
          shouldReopen = true;
        }
      });
      vue.provide(POPUP_TOGGLE_KEY, () => props2.show);
      return () => {
        if (props2.teleport) {
          return vue.createVNode(vue.Teleport, {
            "to": props2.teleport
          }, {
            default: () => [renderOverlay(), renderTransition()]
          });
        }
        return vue.createVNode(vue.Fragment, null, [renderOverlay(), renderTransition()]);
      };
    }
  });
  var Popup = withInstall(_Popup);
  var [name$1k, bem$1g] = createNamespace("action-sheet");
  var popupKeys$2 = [...popupSharedPropKeys, "round", "closeOnPopstate", "safeAreaInsetBottom"];
  var _ActionSheet = vue.defineComponent({
    name: name$1k,
    props: extend({}, popupSharedProps, {
      title: String,
      round: truthProp,
      actions: makeArrayProp(),
      closeIcon: makeStringProp("cross"),
      closeable: truthProp,
      cancelText: String,
      description: String,
      closeOnPopstate: truthProp,
      closeOnClickAction: Boolean,
      safeAreaInsetBottom: truthProp
    }),
    emits: ["select", "cancel", "update:show"],
    setup(props2, {
      slots,
      emit
    }) {
      var updateShow = (show) => emit("update:show", show);
      var onCancel = () => {
        updateShow(false);
        emit("cancel");
      };
      var renderHeader = () => {
        if (props2.title) {
          return vue.createVNode("div", {
            "class": bem$1g("header")
          }, [props2.title, props2.closeable && vue.createVNode(Icon, {
            "name": props2.closeIcon,
            "class": bem$1g("close"),
            "onClick": onCancel
          }, null)]);
        }
      };
      var renderCancel = () => {
        if (slots.cancel || props2.cancelText) {
          return [vue.createVNode("div", {
            "class": bem$1g("gap")
          }, null), vue.createVNode("button", {
            "type": "button",
            "class": bem$1g("cancel"),
            "onClick": onCancel
          }, [slots.cancel ? slots.cancel() : props2.cancelText])];
        }
      };
      var renderOption = (item, index2) => {
        var {
          name: name2,
          color,
          subname,
          loading,
          callback,
          disabled,
          className
        } = item;
        var Content = loading ? vue.createVNode(Loading, {
          "class": bem$1g("loading-icon")
        }, null) : [vue.createVNode("span", {
          "class": bem$1g("name")
        }, [name2]), subname && vue.createVNode("div", {
          "class": bem$1g("subname")
        }, [subname])];
        var onClick = () => {
          if (disabled || loading) {
            return;
          }
          if (callback) {
            callback(item);
          }
          if (props2.closeOnClickAction) {
            updateShow(false);
          }
          vue.nextTick(() => emit("select", item, index2));
        };
        return vue.createVNode("button", {
          "type": "button",
          "style": {
            color
          },
          "class": [bem$1g("item", {
            loading,
            disabled
          }), className],
          "onClick": onClick
        }, [Content]);
      };
      var renderDescription = () => {
        if (props2.description || slots.description) {
          var content = slots.description ? slots.description() : props2.description;
          return vue.createVNode("div", {
            "class": bem$1g("description")
          }, [content]);
        }
      };
      return () => vue.createVNode(Popup, vue.mergeProps({
        "class": bem$1g(),
        "position": "bottom",
        "onUpdate:show": updateShow
      }, pick(props2, popupKeys$2)), {
        default: () => [renderHeader(), renderDescription(), vue.createVNode("div", {
          "class": bem$1g("content")
        }, [props2.actions.map(renderOption), slots.default == null ? void 0 : slots.default()]), renderCancel()]
      });
    }
  });
  var ActionSheet = withInstall(_ActionSheet);
  function deepClone(obj) {
    if (!isDef(obj)) {
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map((item) => deepClone(item));
    }
    if (typeof obj === "object") {
      var to = {};
      Object.keys(obj).forEach((key) => {
        to[key] = deepClone(obj[key]);
      });
      return to;
    }
    return obj;
  }
  var DEFAULT_DURATION = 200;
  var MOMENTUM_LIMIT_TIME = 300;
  var MOMENTUM_LIMIT_DISTANCE = 15;
  var [name$1j, bem$1f] = createNamespace("picker-column");
  function getElementTranslateY(element) {
    var {
      transform
    } = window.getComputedStyle(element);
    var translateY = transform.slice(7, transform.length - 1).split(", ")[5];
    return Number(translateY);
  }
  var PICKER_KEY = Symbol(name$1j);
  var isOptionDisabled = (option) => isObject$1(option) && option.disabled;
  var Column = vue.defineComponent({
    name: name$1j,
    props: {
      textKey: makeRequiredProp(String),
      readonly: Boolean,
      allowHtml: Boolean,
      className: unknownProp,
      itemHeight: makeRequiredProp(Number),
      defaultIndex: makeNumberProp(0),
      swipeDuration: makeRequiredProp(numericProp),
      initialOptions: makeArrayProp(),
      visibleItemCount: makeRequiredProp(numericProp)
    },
    emits: ["change"],
    setup(props2, {
      emit,
      slots
    }) {
      var moving;
      var startOffset;
      var touchStartTime;
      var momentumOffset;
      var transitionEndTrigger;
      var wrapper = vue.ref();
      var state = vue.reactive({
        index: props2.defaultIndex,
        offset: 0,
        duration: 0,
        options: deepClone(props2.initialOptions)
      });
      var touch = useTouch();
      var count = () => state.options.length;
      var baseOffset = () => props2.itemHeight * (+props2.visibleItemCount - 1) / 2;
      var adjustIndex = (index2) => {
        index2 = clamp(index2, 0, count());
        for (var i = index2; i < count(); i++) {
          if (!isOptionDisabled(state.options[i]))
            return i;
        }
        for (var _i = index2 - 1; _i >= 0; _i--) {
          if (!isOptionDisabled(state.options[_i]))
            return _i;
        }
      };
      var setIndex = (index2, emitChange) => {
        index2 = adjustIndex(index2) || 0;
        var offset2 = -index2 * props2.itemHeight;
        var trigger2 = () => {
          if (index2 !== state.index) {
            state.index = index2;
            if (emitChange) {
              emit("change", index2);
            }
          }
        };
        if (moving && offset2 !== state.offset) {
          transitionEndTrigger = trigger2;
        } else {
          trigger2();
        }
        state.offset = offset2;
      };
      var setOptions = (options) => {
        if (JSON.stringify(options) !== JSON.stringify(state.options)) {
          state.options = deepClone(options);
          setIndex(props2.defaultIndex);
        }
      };
      var onClickItem = (index2) => {
        if (moving || props2.readonly) {
          return;
        }
        transitionEndTrigger = null;
        state.duration = DEFAULT_DURATION;
        setIndex(index2, true);
      };
      var getOptionText = (option) => {
        if (isObject$1(option) && props2.textKey in option) {
          return option[props2.textKey];
        }
        return option;
      };
      var getIndexByOffset = (offset2) => clamp(Math.round(-offset2 / props2.itemHeight), 0, count() - 1);
      var momentum = (distance, duration) => {
        var speed = Math.abs(distance / duration);
        distance = state.offset + speed / 3e-3 * (distance < 0 ? -1 : 1);
        var index2 = getIndexByOffset(distance);
        state.duration = +props2.swipeDuration;
        setIndex(index2, true);
      };
      var stopMomentum = () => {
        moving = false;
        state.duration = 0;
        if (transitionEndTrigger) {
          transitionEndTrigger();
          transitionEndTrigger = null;
        }
      };
      var onTouchStart = (event) => {
        if (props2.readonly) {
          return;
        }
        touch.start(event);
        if (moving) {
          var translateY = getElementTranslateY(wrapper.value);
          state.offset = Math.min(0, translateY - baseOffset());
          startOffset = state.offset;
        } else {
          startOffset = state.offset;
        }
        state.duration = 0;
        touchStartTime = Date.now();
        momentumOffset = startOffset;
        transitionEndTrigger = null;
      };
      var onTouchMove = (event) => {
        if (props2.readonly) {
          return;
        }
        touch.move(event);
        if (touch.isVertical()) {
          moving = true;
          preventDefault(event, true);
        }
        state.offset = clamp(startOffset + touch.deltaY.value, -(count() * props2.itemHeight), props2.itemHeight);
        var now = Date.now();
        if (now - touchStartTime > MOMENTUM_LIMIT_TIME) {
          touchStartTime = now;
          momentumOffset = state.offset;
        }
      };
      var onTouchEnd = () => {
        if (props2.readonly) {
          return;
        }
        var distance = state.offset - momentumOffset;
        var duration = Date.now() - touchStartTime;
        var allowMomentum = duration < MOMENTUM_LIMIT_TIME && Math.abs(distance) > MOMENTUM_LIMIT_DISTANCE;
        if (allowMomentum) {
          momentum(distance, duration);
          return;
        }
        var index2 = getIndexByOffset(state.offset);
        state.duration = DEFAULT_DURATION;
        setIndex(index2, true);
        setTimeout(() => {
          moving = false;
        }, 0);
      };
      var renderOptions = () => {
        var optionStyle = {
          height: props2.itemHeight + "px"
        };
        return state.options.map((option, index2) => {
          var text = getOptionText(option);
          var disabled = isOptionDisabled(option);
          var data = {
            role: "button",
            style: optionStyle,
            tabindex: disabled ? -1 : 0,
            class: bem$1f("item", {
              disabled,
              selected: index2 === state.index
            }),
            onClick: () => onClickItem(index2)
          };
          var childData = {
            class: "van-ellipsis",
            [props2.allowHtml ? "innerHTML" : "textContent"]: text
          };
          return vue.createVNode("li", data, [slots.option ? slots.option(option) : vue.createVNode("div", childData, null)]);
        });
      };
      var setValue = (value) => {
        var {
          options
        } = state;
        for (var i = 0; i < options.length; i++) {
          if (getOptionText(options[i]) === value) {
            return setIndex(i);
          }
        }
      };
      var getValue = () => state.options[state.index];
      setIndex(state.index);
      useParent(PICKER_KEY);
      useExpose({
        state,
        setIndex,
        getValue,
        setValue,
        setOptions,
        stopMomentum
      });
      vue.watch(() => props2.initialOptions, setOptions);
      vue.watch(() => props2.defaultIndex, (value) => setIndex(value));
      return () => vue.createVNode("div", {
        "class": [bem$1f(), props2.className],
        "onTouchstart": onTouchStart,
        "onTouchmove": onTouchMove,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, [vue.createVNode("ul", {
        "ref": wrapper,
        "style": {
          transform: "translate3d(0, " + (state.offset + baseOffset()) + "px, 0)",
          transitionDuration: state.duration + "ms",
          transitionProperty: state.duration ? "all" : "none"
        },
        "class": bem$1f("wrapper"),
        "onTransitionend": stopMomentum
      }, [renderOptions()])]);
    }
  });
  var [name$1i, bem$1e, t$i] = createNamespace("picker");
  var pickerProps = {
    title: String,
    loading: Boolean,
    readonly: Boolean,
    allowHtml: Boolean,
    itemHeight: makeNumericProp(44),
    showToolbar: truthProp,
    swipeDuration: makeNumericProp(1e3),
    visibleItemCount: makeNumericProp(6),
    cancelButtonText: String,
    confirmButtonText: String
  };
  var _Picker = vue.defineComponent({
    name: name$1i,
    props: extend({}, pickerProps, {
      columns: makeArrayProp(),
      valueKey: String,
      defaultIndex: makeNumericProp(0),
      toolbarPosition: makeStringProp("top"),
      columnsFieldNames: Object
    }),
    emits: ["confirm", "cancel", "change"],
    setup(props2, {
      emit,
      slots
    }) {
      var formattedColumns = vue.ref([]);
      var {
        text: textKey,
        values: valuesKey,
        children: childrenKey
      } = extend({
        text: props2.valueKey || "text",
        values: "values",
        children: "children"
      }, props2.columnsFieldNames);
      var {
        children,
        linkChildren
      } = useChildren(PICKER_KEY);
      linkChildren();
      var itemHeight = vue.computed(() => unitToPx(props2.itemHeight));
      var dataType = vue.computed(() => {
        var firstColumn = props2.columns[0];
        if (typeof firstColumn === "object") {
          if (childrenKey in firstColumn) {
            return "cascade";
          }
          if (valuesKey in firstColumn) {
            return "object";
          }
        }
        return "plain";
      });
      var formatCascade = () => {
        var formatted = [];
        var cursor = {
          [childrenKey]: props2.columns
        };
        while (cursor && cursor[childrenKey]) {
          var _cursor$defaultIndex;
          var _children = cursor[childrenKey];
          var defaultIndex = (_cursor$defaultIndex = cursor.defaultIndex) != null ? _cursor$defaultIndex : +props2.defaultIndex;
          while (_children[defaultIndex] && _children[defaultIndex].disabled) {
            if (defaultIndex < _children.length - 1) {
              defaultIndex++;
            } else {
              defaultIndex = 0;
              break;
            }
          }
          formatted.push({
            [valuesKey]: cursor[childrenKey],
            className: cursor.className,
            defaultIndex
          });
          cursor = _children[defaultIndex];
        }
        formattedColumns.value = formatted;
      };
      var format2 = () => {
        var {
          columns
        } = props2;
        if (dataType.value === "plain") {
          formattedColumns.value = [{
            [valuesKey]: columns
          }];
        } else if (dataType.value === "cascade") {
          formatCascade();
        } else {
          formattedColumns.value = columns;
        }
      };
      var getIndexes = () => children.map((child) => child.state.index);
      var setColumnValues = (index2, options) => {
        var column = children[index2];
        if (column) {
          column.setOptions(options);
        }
      };
      var onCascadeChange = (columnIndex) => {
        var cursor = {
          [childrenKey]: props2.columns
        };
        var indexes = getIndexes();
        for (var i = 0; i <= columnIndex; i++) {
          cursor = cursor[childrenKey][indexes[i]];
        }
        while (cursor && cursor[childrenKey]) {
          columnIndex++;
          setColumnValues(columnIndex, cursor[childrenKey]);
          cursor = cursor[childrenKey][cursor.defaultIndex || 0];
        }
      };
      var getChild = (index2) => children[index2];
      var getColumnValue = (index2) => {
        var column = getChild(index2);
        if (column) {
          return column.getValue();
        }
      };
      var setColumnValue = (index2, value) => {
        var column = getChild(index2);
        if (column) {
          column.setValue(value);
          if (dataType.value === "cascade") {
            onCascadeChange(index2);
          }
        }
      };
      var getColumnIndex = (index2) => {
        var column = getChild(index2);
        if (column) {
          return column.state.index;
        }
      };
      var setColumnIndex = (columnIndex, optionIndex) => {
        var column = getChild(columnIndex);
        if (column) {
          column.setIndex(optionIndex);
          if (dataType.value === "cascade") {
            onCascadeChange(columnIndex);
          }
        }
      };
      var getColumnValues = (index2) => {
        var column = getChild(index2);
        if (column) {
          return column.state.options;
        }
      };
      var getValues = () => children.map((child) => child.getValue());
      var setValues = (values) => {
        values.forEach((value, index2) => {
          setColumnValue(index2, value);
        });
      };
      var setIndexes = (indexes) => {
        indexes.forEach((optionIndex, columnIndex) => {
          setColumnIndex(columnIndex, optionIndex);
        });
      };
      var emitAction = (event) => {
        if (dataType.value === "plain") {
          emit(event, getColumnValue(0), getColumnIndex(0));
        } else {
          emit(event, getValues(), getIndexes());
        }
      };
      var onChange = (columnIndex) => {
        if (dataType.value === "cascade") {
          onCascadeChange(columnIndex);
        }
        if (dataType.value === "plain") {
          emit("change", getColumnValue(0), getColumnIndex(0));
        } else {
          emit("change", getValues(), columnIndex);
        }
      };
      var confirm = () => {
        children.forEach((child) => child.stopMomentum());
        emitAction("confirm");
      };
      var cancel = () => emitAction("cancel");
      var renderTitle = () => {
        if (slots.title) {
          return slots.title();
        }
        if (props2.title) {
          return vue.createVNode("div", {
            "class": [bem$1e("title"), "van-ellipsis"]
          }, [props2.title]);
        }
      };
      var renderCancel = () => {
        var text = props2.cancelButtonText || t$i("cancel");
        return vue.createVNode("button", {
          "type": "button",
          "class": bem$1e("cancel"),
          "onClick": cancel
        }, [slots.cancel ? slots.cancel() : text]);
      };
      var renderConfirm = () => {
        var text = props2.confirmButtonText || t$i("confirm");
        return vue.createVNode("button", {
          "type": "button",
          "class": bem$1e("confirm"),
          "onClick": confirm
        }, [slots.confirm ? slots.confirm() : text]);
      };
      var renderToolbar = () => {
        if (props2.showToolbar) {
          var slot = slots.toolbar || slots.default;
          return vue.createVNode("div", {
            "class": bem$1e("toolbar")
          }, [slot ? slot() : [renderCancel(), renderTitle(), renderConfirm()]]);
        }
      };
      var renderColumnItems = () => formattedColumns.value.map((item, columnIndex) => {
        var _item$defaultIndex;
        return vue.createVNode(Column, {
          "textKey": textKey,
          "readonly": props2.readonly,
          "allowHtml": props2.allowHtml,
          "className": item.className,
          "itemHeight": itemHeight.value,
          "defaultIndex": (_item$defaultIndex = item.defaultIndex) != null ? _item$defaultIndex : +props2.defaultIndex,
          "swipeDuration": props2.swipeDuration,
          "initialOptions": item[valuesKey],
          "visibleItemCount": props2.visibleItemCount,
          "onChange": () => onChange(columnIndex)
        }, {
          option: slots.option
        });
      });
      var renderColumns = () => {
        var wrapHeight = itemHeight.value * +props2.visibleItemCount;
        var frameStyle = {
          height: itemHeight.value + "px"
        };
        var columnsStyle = {
          height: wrapHeight + "px"
        };
        var maskStyle = {
          backgroundSize: "100% " + (wrapHeight - itemHeight.value) / 2 + "px"
        };
        return vue.createVNode("div", {
          "class": bem$1e("columns"),
          "style": columnsStyle,
          "onTouchmove": preventDefault
        }, [renderColumnItems(), vue.createVNode("div", {
          "class": bem$1e("mask"),
          "style": maskStyle
        }, null), vue.createVNode("div", {
          "class": [BORDER_UNSET_TOP_BOTTOM, bem$1e("frame")],
          "style": frameStyle
        }, null)]);
      };
      vue.watch(() => props2.columns, format2, {
        immediate: true
      });
      useExpose({
        confirm,
        getValues,
        setValues,
        getIndexes,
        setIndexes,
        getColumnIndex,
        setColumnIndex,
        getColumnValue,
        setColumnValue,
        getColumnValues,
        setColumnValues
      });
      return () => {
        var _slots$columnsTop, _slots$columnsBottom;
        return vue.createVNode("div", {
          "class": bem$1e()
        }, [props2.toolbarPosition === "top" ? renderToolbar() : null, props2.loading ? vue.createVNode(Loading, {
          "class": bem$1e("loading")
        }, null) : null, (_slots$columnsTop = slots["columns-top"]) == null ? void 0 : _slots$columnsTop.call(slots), renderColumns(), (_slots$columnsBottom = slots["columns-bottom"]) == null ? void 0 : _slots$columnsBottom.call(slots), props2.toolbarPosition === "bottom" ? renderToolbar() : null]);
      };
    }
  });
  var Picker = withInstall(_Picker);
  var [name$1h, bem$1d] = createNamespace("area");
  var EMPTY_CODE = "000000";
  var INHERIT_SLOTS = ["title", "cancel", "confirm", "toolbar", "columns-top", "columns-bottom"];
  var INHERIT_PROPS = ["title", "loading", "readonly", "itemHeight", "swipeDuration", "visibleItemCount", "cancelButtonText", "confirmButtonText"];
  var isOverseaCode = (code) => code[0] === "9";
  var props$r = extend({}, pickerProps, {
    value: String,
    columnsNum: makeNumericProp(3),
    columnsPlaceholder: makeArrayProp(),
    areaList: {
      type: Object,
      default: () => ({})
    },
    isOverseaCode: {
      type: Function,
      default: isOverseaCode
    }
  });
  var _Area = vue.defineComponent({
    name: name$1h,
    props: props$r,
    emits: ["change", "confirm", "cancel"],
    setup(props2, {
      emit,
      slots
    }) {
      var pickerRef = vue.ref();
      var state = vue.reactive({
        code: props2.value,
        columns: [{
          values: []
        }, {
          values: []
        }, {
          values: []
        }]
      });
      var areaList = vue.computed(() => {
        var {
          areaList: areaList2
        } = props2;
        return {
          province: areaList2.province_list || {},
          city: areaList2.city_list || {},
          county: areaList2.county_list || {}
        };
      });
      var placeholderMap = vue.computed(() => {
        var {
          columnsPlaceholder
        } = props2;
        return {
          province: columnsPlaceholder[0] || "",
          city: columnsPlaceholder[1] || "",
          county: columnsPlaceholder[2] || ""
        };
      });
      var getDefaultCode = () => {
        if (props2.columnsPlaceholder.length) {
          return EMPTY_CODE;
        }
        var {
          county,
          city
        } = areaList.value;
        var countyCodes = Object.keys(county);
        if (countyCodes[0]) {
          return countyCodes[0];
        }
        var cityCodes = Object.keys(city);
        if (cityCodes[0]) {
          return cityCodes[0];
        }
        return "";
      };
      var getColumnValues = (type, code) => {
        var column = [];
        if (type !== "province" && !code) {
          return column;
        }
        var list = areaList.value[type];
        column = Object.keys(list).map((listCode) => ({
          code: listCode,
          name: list[listCode]
        }));
        if (code) {
          if (type === "city" && props2.isOverseaCode(code)) {
            code = "9";
          }
          column = column.filter((item) => item.code.indexOf(code) === 0);
        }
        if (placeholderMap.value[type] && column.length) {
          var codeFill = "";
          if (type === "city") {
            codeFill = EMPTY_CODE.slice(2, 4);
          } else if (type === "county") {
            codeFill = EMPTY_CODE.slice(4, 6);
          }
          column.unshift({
            code: code + codeFill,
            name: placeholderMap.value[type]
          });
        }
        return column;
      };
      var getIndex = (type, code) => {
        var compareNum = code.length;
        if (type === "province") {
          compareNum = props2.isOverseaCode(code) ? 1 : 2;
        }
        if (type === "city") {
          compareNum = 4;
        }
        code = code.slice(0, compareNum);
        var list = getColumnValues(type, compareNum > 2 ? code.slice(0, compareNum - 2) : "");
        for (var i = 0; i < list.length; i++) {
          if (list[i].code.slice(0, compareNum) === code) {
            return i;
          }
        }
        return 0;
      };
      var setValues = () => {
        var code = state.code || getDefaultCode();
        var picker = pickerRef.value;
        var province = getColumnValues("province");
        var city = getColumnValues("city", code.slice(0, 2));
        if (!picker) {
          return;
        }
        picker.setColumnValues(0, province);
        picker.setColumnValues(1, city);
        if (city.length && code.slice(2, 4) === "00" && !props2.isOverseaCode(code)) {
          [{
            code
          }] = city;
        }
        picker.setColumnValues(2, getColumnValues("county", code.slice(0, 4)));
        picker.setIndexes([getIndex("province", code), getIndex("city", code), getIndex("county", code)]);
      };
      var parseValues = (values) => values.map((value, index2) => {
        if (value) {
          value = deepClone(value);
          if (!value.code || value.name === props2.columnsPlaceholder[index2]) {
            value.code = "";
            value.name = "";
          }
        }
        return value;
      });
      var getValues = () => {
        if (pickerRef.value) {
          var values = pickerRef.value.getValues().filter(Boolean);
          return parseValues(values);
        }
        return [];
      };
      var getArea = () => {
        var values = getValues();
        var area = {
          code: "",
          country: "",
          province: "",
          city: "",
          county: ""
        };
        if (!values.length) {
          return area;
        }
        var names = values.map((item) => item.name);
        var validValues = values.filter((value) => value.code);
        area.code = validValues.length ? validValues[validValues.length - 1].code : "";
        if (props2.isOverseaCode(area.code)) {
          area.country = names[1] || "";
          area.province = names[2] || "";
        } else {
          area.province = names[0] || "";
          area.city = names[1] || "";
          area.county = names[2] || "";
        }
        return area;
      };
      var reset = (newCode = "") => {
        state.code = newCode;
        setValues();
      };
      var onChange = (values, index2) => {
        state.code = values[index2].code;
        setValues();
        if (pickerRef.value) {
          var parsedValues = parseValues(pickerRef.value.getValues());
          emit("change", parsedValues, index2);
        }
      };
      var onConfirm = (values, index2) => {
        setValues();
        emit("confirm", parseValues(values), index2);
      };
      var onCancel = (...args) => emit("cancel", ...args);
      vue.onMounted(setValues);
      vue.watch(() => props2.value, (value) => {
        state.code = value;
        setValues();
      });
      vue.watch(() => props2.areaList, setValues, {
        deep: true
      });
      vue.watch(() => props2.columnsNum, () => vue.nextTick(setValues));
      useExpose({
        reset,
        getArea,
        getValues
      });
      return () => {
        var columns = state.columns.slice(0, +props2.columnsNum);
        return vue.createVNode(Picker, vue.mergeProps({
          "ref": pickerRef,
          "class": bem$1d(),
          "columns": columns,
          "columnsFieldNames": {
            text: "name"
          },
          "onChange": onChange,
          "onCancel": onCancel,
          "onConfirm": onConfirm
        }, pick(props2, INHERIT_PROPS)), pick(slots, INHERIT_SLOTS));
      };
    }
  });
  var Area = withInstall(_Area);
  var [name$1g, bem$1c] = createNamespace("cell");
  var cellProps = {
    icon: String,
    size: String,
    title: numericProp,
    value: numericProp,
    label: numericProp,
    center: Boolean,
    isLink: Boolean,
    border: truthProp,
    required: Boolean,
    iconPrefix: String,
    valueClass: unknownProp,
    labelClass: unknownProp,
    titleClass: unknownProp,
    titleStyle: null,
    arrowDirection: String,
    clickable: {
      type: Boolean,
      default: null
    }
  };
  var _Cell = vue.defineComponent({
    name: name$1g,
    props: extend({}, cellProps, routeProps),
    setup(props2, {
      slots
    }) {
      var route2 = useRoute();
      var renderLabel = () => {
        var showLabel = slots.label || isDef(props2.label);
        if (showLabel) {
          return vue.createVNode("div", {
            "class": [bem$1c("label"), props2.labelClass]
          }, [slots.label ? slots.label() : props2.label]);
        }
      };
      var renderTitle = () => {
        if (slots.title || isDef(props2.title)) {
          return vue.createVNode("div", {
            "class": [bem$1c("title"), props2.titleClass],
            "style": props2.titleStyle
          }, [slots.title ? slots.title() : vue.createVNode("span", null, [props2.title]), renderLabel()]);
        }
      };
      var renderValue = () => {
        var slot = slots.value || slots.default;
        var hasValue = slot || isDef(props2.value);
        if (hasValue) {
          var hasTitle = slots.title || isDef(props2.title);
          return vue.createVNode("div", {
            "class": [bem$1c("value", {
              alone: !hasTitle
            }), props2.valueClass]
          }, [slot ? slot() : vue.createVNode("span", null, [props2.value])]);
        }
      };
      var renderLeftIcon = () => {
        if (slots.icon) {
          return slots.icon();
        }
        if (props2.icon) {
          return vue.createVNode(Icon, {
            "name": props2.icon,
            "class": bem$1c("left-icon"),
            "classPrefix": props2.iconPrefix
          }, null);
        }
      };
      var renderRightIcon = () => {
        if (slots["right-icon"]) {
          return slots["right-icon"]();
        }
        if (props2.isLink) {
          var _name = props2.arrowDirection ? "arrow-" + props2.arrowDirection : "arrow";
          return vue.createVNode(Icon, {
            "name": _name,
            "class": bem$1c("right-icon")
          }, null);
        }
      };
      return () => {
        var _props$clickable;
        var {
          size,
          center,
          border,
          isLink,
          required
        } = props2;
        var clickable = (_props$clickable = props2.clickable) != null ? _props$clickable : isLink;
        var classes = {
          center,
          required,
          clickable,
          borderless: !border
        };
        if (size) {
          classes[size] = !!size;
        }
        return vue.createVNode("div", {
          "class": bem$1c(classes),
          "role": clickable ? "button" : void 0,
          "tabindex": clickable ? 0 : void 0,
          "onClick": route2
        }, [renderLeftIcon(), renderTitle(), renderValue(), renderRightIcon(), slots.extra == null ? void 0 : slots.extra()]);
      };
    }
  });
  var Cell = withInstall(_Cell);
  function isEmptyValue(value) {
    if (Array.isArray(value)) {
      return !value.length;
    }
    if (value === 0) {
      return false;
    }
    return !value;
  }
  function runSyncRule(value, rule) {
    if (rule.required && isEmptyValue(value)) {
      return false;
    }
    if (rule.pattern && !rule.pattern.test(String(value))) {
      return false;
    }
    return true;
  }
  function runRuleValidator(value, rule) {
    return new Promise((resolve) => {
      var returnVal = rule.validator(value, rule);
      if (isPromise(returnVal)) {
        return returnVal.then(resolve);
      }
      resolve(returnVal);
    });
  }
  function getRuleMessage(value, rule) {
    var {
      message
    } = rule;
    if (isFunction(message)) {
      return message(value, rule);
    }
    return message || "";
  }
  function startComposing(event) {
    event.target.composing = true;
  }
  function endComposing(event) {
    var {
      target
    } = event;
    if (target.composing) {
      target.composing = false;
      trigger(target, "input");
    }
  }
  function resizeTextarea(input, autosize) {
    var scrollTop = getRootScrollTop();
    input.style.height = "auto";
    var height = input.scrollHeight;
    if (isObject$1(autosize)) {
      var {
        maxHeight,
        minHeight
      } = autosize;
      if (maxHeight !== void 0) {
        height = Math.min(height, maxHeight);
      }
      if (minHeight !== void 0) {
        height = Math.max(height, minHeight);
      }
    }
    if (height) {
      input.style.height = height + "px";
      setRootScrollTop(scrollTop);
    }
  }
  function mapInputType(type) {
    if (type === "number") {
      return {
        type: "text",
        inputmode: "decimal"
      };
    }
    if (type === "digit") {
      return {
        type: "tel",
        inputmode: "numeric"
      };
    }
    return {
      type
    };
  }
  var [name$1f, bem$1b] = createNamespace("field");
  var fieldSharedProps = {
    id: String,
    name: String,
    leftIcon: String,
    rightIcon: String,
    autofocus: Boolean,
    clearable: Boolean,
    maxlength: numericProp,
    formatter: Function,
    clearIcon: makeStringProp("clear"),
    modelValue: makeNumericProp(""),
    inputAlign: String,
    placeholder: String,
    autocomplete: String,
    errorMessage: String,
    clearTrigger: makeStringProp("focus"),
    formatTrigger: makeStringProp("onChange"),
    error: {
      type: Boolean,
      default: null
    },
    disabled: {
      type: Boolean,
      default: null
    },
    readonly: {
      type: Boolean,
      default: null
    }
  };
  var props$q = extend({}, cellProps, fieldSharedProps, {
    rows: numericProp,
    type: makeStringProp("text"),
    rules: Array,
    autosize: [Boolean, Object],
    labelWidth: numericProp,
    labelClass: unknownProp,
    labelAlign: String,
    showWordLimit: Boolean,
    errorMessageAlign: String,
    colon: {
      type: Boolean,
      default: null
    }
  });
  var _Field = vue.defineComponent({
    name: name$1f,
    props: props$q,
    emits: ["blur", "focus", "clear", "keypress", "click-input", "click-left-icon", "click-right-icon", "update:modelValue"],
    setup(props2, {
      emit,
      slots
    }) {
      var state = vue.reactive({
        focused: false,
        validateFailed: false,
        validateMessage: ""
      });
      var inputRef = vue.ref();
      var customValue = vue.ref();
      var {
        parent: form
      } = useParent(FORM_KEY);
      var getModelValue = () => {
        var _props$modelValue;
        return String((_props$modelValue = props2.modelValue) != null ? _props$modelValue : "");
      };
      var getProp = (key) => {
        if (isDef(props2[key])) {
          return props2[key];
        }
        if (form && isDef(form.props[key])) {
          return form.props[key];
        }
      };
      var showClear = vue.computed(() => {
        var readonly = getProp("readonly");
        if (props2.clearable && !readonly) {
          var hasValue = getModelValue() !== "";
          var trigger2 = props2.clearTrigger === "always" || props2.clearTrigger === "focus" && state.focused;
          return hasValue && trigger2;
        }
        return false;
      });
      var formValue = vue.computed(() => {
        if (customValue.value && slots.input) {
          return customValue.value();
        }
        return props2.modelValue;
      });
      var runRules = (rules) => rules.reduce((promise, rule) => promise.then(() => {
        if (state.validateFailed) {
          return;
        }
        var {
          value
        } = formValue;
        if (rule.formatter) {
          value = rule.formatter(value, rule);
        }
        if (!runSyncRule(value, rule)) {
          state.validateFailed = true;
          state.validateMessage = getRuleMessage(value, rule);
          return;
        }
        if (rule.validator) {
          return runRuleValidator(value, rule).then((result) => {
            if (result && typeof result === "string") {
              state.validateFailed = true;
              state.validateMessage = result;
            } else if (result === false) {
              state.validateFailed = true;
              state.validateMessage = getRuleMessage(value, rule);
            }
          });
        }
      }), Promise.resolve());
      var resetValidation = () => {
        if (state.validateFailed) {
          state.validateFailed = false;
          state.validateMessage = "";
        }
      };
      var validate = (rules = props2.rules) => new Promise((resolve) => {
        resetValidation();
        if (rules) {
          runRules(rules).then(() => {
            if (state.validateFailed) {
              resolve({
                name: props2.name,
                message: state.validateMessage
              });
            } else {
              resolve();
            }
          });
        } else {
          resolve();
        }
      });
      var validateWithTrigger = (trigger2) => {
        if (form && props2.rules) {
          var defaultTrigger = form.props.validateTrigger === trigger2;
          var rules = props2.rules.filter((rule) => {
            if (rule.trigger) {
              return rule.trigger === trigger2;
            }
            return defaultTrigger;
          });
          if (rules.length) {
            validate(rules);
          }
        }
      };
      var limitValueLength = (value) => {
        var {
          maxlength
        } = props2;
        if (isDef(maxlength) && value.length > maxlength) {
          var modelValue = getModelValue();
          if (modelValue && modelValue.length === +maxlength) {
            return modelValue;
          }
          return value.slice(0, +maxlength);
        }
        return value;
      };
      var updateValue = (value, trigger2 = "onChange") => {
        value = limitValueLength(value);
        if (props2.type === "number" || props2.type === "digit") {
          var isNumber = props2.type === "number";
          value = formatNumber(value, isNumber, isNumber);
        }
        if (props2.formatter && trigger2 === props2.formatTrigger) {
          value = props2.formatter(value);
        }
        if (inputRef.value && inputRef.value.value !== value) {
          inputRef.value.value = value;
        }
        if (value !== props2.modelValue) {
          emit("update:modelValue", value);
        }
      };
      var onInput = (event) => {
        if (!event.target.composing) {
          updateValue(event.target.value);
        }
      };
      var blur = () => {
        var _inputRef$value;
        return (_inputRef$value = inputRef.value) == null ? void 0 : _inputRef$value.blur();
      };
      var focus = () => {
        var _inputRef$value2;
        return (_inputRef$value2 = inputRef.value) == null ? void 0 : _inputRef$value2.focus();
      };
      var onFocus = (event) => {
        state.focused = true;
        emit("focus", event);
        var readonly = getProp("readonly");
        if (readonly) {
          blur();
        }
      };
      var onBlur = (event) => {
        state.focused = false;
        updateValue(getModelValue(), "onBlur");
        emit("blur", event);
        validateWithTrigger("onBlur");
        resetScroll();
      };
      var onClickInput = (event) => emit("click-input", event);
      var onClickLeftIcon = (event) => emit("click-left-icon", event);
      var onClickRightIcon = (event) => emit("click-right-icon", event);
      var onClear = (event) => {
        preventDefault(event);
        emit("update:modelValue", "");
        emit("clear", event);
      };
      var showError = vue.computed(() => {
        if (typeof props2.error === "boolean") {
          return props2.error;
        }
        if (form && form.props.showError && state.validateFailed) {
          return true;
        }
      });
      var labelStyle = vue.computed(() => {
        var labelWidth = getProp("labelWidth");
        if (labelWidth) {
          return {
            width: addUnit(labelWidth)
          };
        }
      });
      var onKeypress = (event) => {
        var ENTER_CODE = 13;
        if (event.keyCode === ENTER_CODE) {
          var submitOnEnter = form && form.props.submitOnEnter;
          if (!submitOnEnter && props2.type !== "textarea") {
            preventDefault(event);
          }
          if (props2.type === "search") {
            blur();
          }
        }
        emit("keypress", event);
      };
      var adjustTextareaSize = () => {
        var input = inputRef.value;
        if (props2.type === "textarea" && props2.autosize && input) {
          resizeTextarea(input, props2.autosize);
        }
      };
      var renderInput = () => {
        var controlClass = bem$1b("control", [getProp("inputAlign"), {
          error: showError.value,
          custom: !!slots.input,
          "min-height": props2.type === "textarea" && !props2.autosize
        }]);
        if (slots.input) {
          return vue.createVNode("div", {
            "class": controlClass,
            "onClick": onClickInput
          }, [slots.input()]);
        }
        var inputAttrs = {
          id: props2.id,
          ref: inputRef,
          name: props2.name,
          rows: props2.rows !== void 0 ? +props2.rows : void 0,
          class: controlClass,
          value: props2.modelValue,
          disabled: getProp("disabled"),
          readonly: getProp("readonly"),
          autofocus: props2.autofocus,
          placeholder: props2.placeholder,
          autocomplete: props2.autocomplete,
          onBlur,
          onFocus,
          onInput,
          onClick: onClickInput,
          onChange: endComposing,
          onKeypress,
          onCompositionend: endComposing,
          onCompositionstart: startComposing
        };
        if (props2.type === "textarea") {
          return vue.createVNode("textarea", inputAttrs, null);
        }
        return vue.createVNode("input", vue.mergeProps(mapInputType(props2.type), inputAttrs), null);
      };
      var renderLeftIcon = () => {
        var leftIconSlot = slots["left-icon"];
        if (props2.leftIcon || leftIconSlot) {
          return vue.createVNode("div", {
            "class": bem$1b("left-icon"),
            "onClick": onClickLeftIcon
          }, [leftIconSlot ? leftIconSlot() : vue.createVNode(Icon, {
            "name": props2.leftIcon,
            "classPrefix": props2.iconPrefix
          }, null)]);
        }
      };
      var renderRightIcon = () => {
        var rightIconSlot = slots["right-icon"];
        if (props2.rightIcon || rightIconSlot) {
          return vue.createVNode("div", {
            "class": bem$1b("right-icon"),
            "onClick": onClickRightIcon
          }, [rightIconSlot ? rightIconSlot() : vue.createVNode(Icon, {
            "name": props2.rightIcon,
            "classPrefix": props2.iconPrefix
          }, null)]);
        }
      };
      var renderWordLimit = () => {
        if (props2.showWordLimit && props2.maxlength) {
          var count = getModelValue().length;
          return vue.createVNode("div", {
            "class": bem$1b("word-limit")
          }, [vue.createVNode("span", {
            "class": bem$1b("word-num")
          }, [count]), vue.createTextVNode("/"), props2.maxlength]);
        }
      };
      var renderMessage = () => {
        if (form && form.props.showErrorMessage === false) {
          return;
        }
        var message = props2.errorMessage || state.validateMessage;
        if (message) {
          var slot = slots["error-message"];
          var errorMessageAlign = getProp("errorMessageAlign");
          return vue.createVNode("div", {
            "class": bem$1b("error-message", errorMessageAlign)
          }, [slot ? slot({
            message
          }) : message]);
        }
      };
      var renderLabel = () => {
        var colon = getProp("colon") ? ":" : "";
        if (slots.label) {
          return [slots.label(), colon];
        }
        if (props2.label) {
          return vue.createVNode("label", {
            "for": props2.id
          }, [props2.label + colon]);
        }
      };
      var renderFieldBody = () => [vue.createVNode("div", {
        "class": bem$1b("body")
      }, [renderInput(), showClear.value && vue.createVNode(Icon, {
        "name": props2.clearIcon,
        "class": bem$1b("clear"),
        "onTouchstart": onClear
      }, null), renderRightIcon(), slots.button && vue.createVNode("div", {
        "class": bem$1b("button")
      }, [slots.button()])]), renderWordLimit(), renderMessage()];
      useExpose({
        blur,
        focus,
        validate,
        formValue,
        resetValidation
      });
      vue.provide(CUSTOM_FIELD_INJECTION_KEY, {
        customValue,
        resetValidation,
        validateWithTrigger
      });
      vue.watch(() => props2.modelValue, () => {
        updateValue(getModelValue());
        resetValidation();
        validateWithTrigger("onChange");
        vue.nextTick(adjustTextareaSize);
      });
      vue.onMounted(() => {
        updateValue(getModelValue(), props2.formatTrigger);
        vue.nextTick(adjustTextareaSize);
      });
      return () => {
        var disabled = getProp("disabled");
        var labelAlign = getProp("labelAlign");
        var Label = renderLabel();
        var LeftIcon = renderLeftIcon();
        return vue.createVNode(Cell, {
          "size": props2.size,
          "icon": props2.leftIcon,
          "class": bem$1b({
            error: showError.value,
            disabled,
            ["label-" + labelAlign]: labelAlign
          }),
          "center": props2.center,
          "border": props2.border,
          "isLink": props2.isLink,
          "clickable": props2.clickable,
          "titleStyle": labelStyle.value,
          "valueClass": bem$1b("value"),
          "titleClass": [bem$1b("label", [labelAlign, {
            required: props2.required
          }]), props2.labelClass],
          "arrowDirection": props2.arrowDirection
        }, {
          icon: LeftIcon ? () => LeftIcon : null,
          title: Label ? () => Label : null,
          value: renderFieldBody,
          extra: slots.extra
        });
      };
    }
  });
  var Field = withInstall(_Field);
  function usePopupState() {
    var state = vue.reactive({
      show: false
    });
    var toggle = (show) => {
      state.show = show;
    };
    var open = (props2) => {
      extend(state, props2, {
        transitionAppear: true
      });
      toggle(true);
    };
    var close = () => toggle(false);
    useExpose({
      open,
      close,
      toggle
    });
    return {
      open,
      close,
      state,
      toggle
    };
  }
  function mountComponent(RootComponent) {
    var app = vue.createApp(RootComponent);
    var root = document.createElement("div");
    document.body.appendChild(root);
    return {
      instance: app.mount(root),
      unmount() {
        app.unmount();
        document.body.removeChild(root);
      }
    };
  }
  var lockCount = 0;
  function lockClick(lock) {
    if (lock) {
      if (!lockCount) {
        document.body.classList.add("van-toast--unclickable");
      }
      lockCount++;
    } else if (lockCount) {
      lockCount--;
      if (!lockCount) {
        document.body.classList.remove("van-toast--unclickable");
      }
    }
  }
  var [name$1e, bem$1a] = createNamespace("toast");
  var popupProps$2 = ["show", "overlay", "transition", "overlayClass", "overlayStyle", "closeOnClickOverlay"];
  var VanToast = vue.defineComponent({
    name: name$1e,
    props: {
      icon: String,
      show: Boolean,
      type: makeStringProp("text"),
      overlay: Boolean,
      message: numericProp,
      iconSize: numericProp,
      duration: makeNumberProp(2e3),
      position: makeStringProp("middle"),
      className: unknownProp,
      iconPrefix: String,
      transition: makeStringProp("van-fade"),
      loadingType: String,
      forbidClick: Boolean,
      overlayClass: unknownProp,
      overlayStyle: Object,
      closeOnClick: Boolean,
      closeOnClickOverlay: Boolean
    },
    emits: ["update:show"],
    setup(props2, {
      emit
    }) {
      var timer2;
      var clickable = false;
      var toggleClickable = () => {
        var newValue = props2.show && props2.forbidClick;
        if (clickable !== newValue) {
          clickable = newValue;
          lockClick(clickable);
        }
      };
      var updateShow = (show) => emit("update:show", show);
      var onClick = () => {
        if (props2.closeOnClick) {
          updateShow(false);
        }
      };
      var clearTimer = () => clearTimeout(timer2);
      var renderIcon = () => {
        var {
          icon,
          type,
          iconSize,
          iconPrefix,
          loadingType
        } = props2;
        var hasIcon = icon || type === "success" || type === "fail";
        if (hasIcon) {
          return vue.createVNode(Icon, {
            "name": icon || type,
            "size": iconSize,
            "class": bem$1a("icon"),
            "classPrefix": iconPrefix
          }, null);
        }
        if (type === "loading") {
          return vue.createVNode(Loading, {
            "class": bem$1a("loading"),
            "size": iconSize,
            "type": loadingType
          }, null);
        }
      };
      var renderMessage = () => {
        var {
          type,
          message
        } = props2;
        if (isDef(message) && message !== "") {
          return type === "html" ? vue.createVNode("div", {
            "class": bem$1a("text"),
            "innerHTML": String(message)
          }, null) : vue.createVNode("div", {
            "class": bem$1a("text")
          }, [message]);
        }
      };
      vue.watch(() => [props2.show, props2.forbidClick], toggleClickable);
      vue.watch(() => [props2.show, props2.type, props2.message, props2.duration], () => {
        clearTimer();
        if (props2.show && props2.duration > 0) {
          timer2 = setTimeout(() => {
            updateShow(false);
          }, props2.duration);
        }
      });
      vue.onMounted(toggleClickable);
      vue.onUnmounted(toggleClickable);
      return () => vue.createVNode(Popup, vue.mergeProps({
        "class": [bem$1a([props2.position, {
          [props2.type]: !props2.icon
        }]), props2.className],
        "lockScroll": false,
        "onClick": onClick,
        "onClosed": clearTimer,
        "onUpdate:show": updateShow
      }, pick(props2, popupProps$2)), {
        default: () => [renderIcon(), renderMessage()]
      });
    }
  });
  var defaultOptions$1 = {
    icon: "",
    type: "text",
    message: "",
    className: "",
    overlay: false,
    onClose: void 0,
    onOpened: void 0,
    duration: 2e3,
    teleport: "body",
    iconSize: void 0,
    iconPrefix: void 0,
    position: "middle",
    transition: "van-fade",
    forbidClick: false,
    loadingType: void 0,
    overlayClass: "",
    overlayStyle: void 0,
    closeOnClick: false,
    closeOnClickOverlay: false
  };
  var queue = [];
  var allowMultiple = false;
  var currentOptions = extend({}, defaultOptions$1);
  var defaultOptionsMap = new Map();
  function parseOptions$1(message) {
    if (isObject$1(message)) {
      return message;
    }
    return {
      message
    };
  }
  function createInstance() {
    var {
      instance: instance2,
      unmount
    } = mountComponent({
      setup() {
        var message = vue.ref("");
        var {
          open,
          state,
          close,
          toggle
        } = usePopupState();
        var onClosed = () => {
          if (allowMultiple) {
            queue = queue.filter((item) => item !== instance2);
            unmount();
          }
        };
        var render = () => {
          var attrs = {
            onClosed,
            "onUpdate:show": toggle
          };
          return vue.createVNode(VanToast, vue.mergeProps(state, attrs), null);
        };
        vue.watch(message, (val) => {
          state.message = val;
        });
        vue.getCurrentInstance().render = render;
        return {
          open,
          clear: close,
          message
        };
      }
    });
    return instance2;
  }
  function getInstance() {
    if (!queue.length || allowMultiple) {
      var instance2 = createInstance();
      queue.push(instance2);
    }
    return queue[queue.length - 1];
  }
  function Toast(options = {}) {
    if (!inBrowser$1) {
      return {};
    }
    var toast = getInstance();
    var parsedOptions = parseOptions$1(options);
    toast.open(extend({}, currentOptions, defaultOptionsMap.get(parsedOptions.type || currentOptions.type), parsedOptions));
    return toast;
  }
  var createMethod = (type) => (options) => Toast(extend({
    type
  }, parseOptions$1(options)));
  Toast.loading = createMethod("loading");
  Toast.success = createMethod("success");
  Toast.fail = createMethod("fail");
  Toast.clear = (all) => {
    if (queue.length) {
      if (all) {
        queue.forEach((toast) => {
          toast.clear();
        });
        queue = [];
      } else if (!allowMultiple) {
        queue[0].clear();
      } else {
        var _queue$shift;
        (_queue$shift = queue.shift()) == null ? void 0 : _queue$shift.clear();
      }
    }
  };
  function setDefaultOptions(type, options) {
    if (typeof type === "string") {
      defaultOptionsMap.set(type, options);
    } else {
      extend(currentOptions, type);
    }
  }
  Toast.setDefaultOptions = setDefaultOptions;
  Toast.resetDefaultOptions = (type) => {
    if (typeof type === "string") {
      defaultOptionsMap.delete(type);
    } else {
      currentOptions = extend({}, defaultOptions$1);
      defaultOptionsMap.clear();
    }
  };
  Toast.allowMultiple = (value = true) => {
    allowMultiple = value;
  };
  Toast.install = (app) => {
    app.use(withInstall(VanToast));
    app.config.globalProperties.$toast = Toast;
  };
  var [name$1d, bem$19] = createNamespace("switch");
  var _Switch = vue.defineComponent({
    name: name$1d,
    props: {
      size: numericProp,
      loading: Boolean,
      disabled: Boolean,
      modelValue: unknownProp,
      activeColor: String,
      inactiveColor: String,
      activeValue: {
        type: unknownProp,
        default: true
      },
      inactiveValue: {
        type: unknownProp,
        default: false
      }
    },
    emits: ["change", "update:modelValue"],
    setup(props2, {
      emit
    }) {
      var isChecked = () => props2.modelValue === props2.activeValue;
      var onClick = () => {
        if (!props2.disabled && !props2.loading) {
          var newValue = isChecked() ? props2.inactiveValue : props2.activeValue;
          emit("update:modelValue", newValue);
          emit("change", newValue);
        }
      };
      var renderLoading = () => {
        if (props2.loading) {
          var color = isChecked() ? props2.activeColor : props2.inactiveColor;
          return vue.createVNode(Loading, {
            "class": bem$19("loading"),
            "color": color
          }, null);
        }
      };
      useCustomFieldValue(() => props2.modelValue);
      return () => {
        var {
          size,
          loading,
          disabled,
          activeColor,
          inactiveColor
        } = props2;
        var checked = isChecked();
        var style = {
          fontSize: addUnit(size),
          backgroundColor: checked ? activeColor : inactiveColor
        };
        return vue.createVNode("div", {
          "role": "switch",
          "class": bem$19({
            on: checked,
            loading,
            disabled
          }),
          "style": style,
          "aria-checked": checked,
          "onClick": onClick
        }, [vue.createVNode("div", {
          "class": bem$19("node")
        }, [renderLoading()])]);
      };
    }
  });
  var Switch = withInstall(_Switch);
  var [name$1c, bem$18, t$h] = createNamespace("address-edit-detail");
  var AddressEditDetail = vue.defineComponent({
    name: name$1c,
    props: {
      show: Boolean,
      value: String,
      focused: Boolean,
      detailRows: numericProp,
      searchResult: Array,
      errorMessage: String,
      detailMaxlength: numericProp,
      showSearchResult: Boolean
    },
    emits: ["blur", "focus", "input", "select-search"],
    setup(props2, {
      emit
    }) {
      var field = vue.ref();
      var showSearchResult = () => props2.focused && props2.searchResult && props2.showSearchResult;
      var onSelect = (express) => {
        emit("select-search", express);
        emit("input", ((express.address || "") + " " + (express.name || "")).trim());
      };
      var renderSearchTitle = (express) => {
        if (express.name) {
          var text = express.name.replace(props2.value, "<span class=" + bem$18("keyword") + ">" + props2.value + "</span>");
          return vue.createVNode("div", {
            "innerHTML": text
          }, null);
        }
      };
      var renderSearchResult = () => {
        if (!showSearchResult()) {
          return;
        }
        var {
          searchResult
        } = props2;
        return searchResult.map((express) => vue.createVNode(Cell, {
          "clickable": true,
          "key": express.name + express.address,
          "icon": "location-o",
          "label": express.address,
          "class": bem$18("search-item"),
          "border": false,
          "onClick": () => onSelect(express)
        }, {
          title: () => renderSearchTitle(express)
        }));
      };
      var onBlur = (event) => emit("blur", event);
      var onFocus = (event) => emit("focus", event);
      var onInput = (value) => emit("input", value);
      return () => {
        if (props2.show) {
          return vue.createVNode(vue.Fragment, null, [vue.createVNode(Field, {
            "autosize": true,
            "clearable": true,
            "ref": field,
            "class": bem$18(),
            "rows": props2.detailRows,
            "type": "textarea",
            "label": t$h("label"),
            "border": !showSearchResult(),
            "maxlength": props2.detailMaxlength,
            "modelValue": props2.value,
            "placeholder": t$h("placeholder"),
            "errorMessage": props2.errorMessage,
            "onBlur": onBlur,
            "onFocus": onFocus,
            "onUpdate:modelValue": onInput
          }, null), renderSearchResult()]);
        }
      };
    }
  });
  var [name$1b, bem$17, t$g] = createNamespace("address-edit");
  var DEFAULT_DATA = {
    name: "",
    tel: "",
    city: "",
    county: "",
    country: "",
    province: "",
    areaCode: "",
    isDefault: false,
    postalCode: "",
    addressDetail: ""
  };
  var isPostal = (value) => /^\d{6}$/.test(value);
  var props$p = {
    areaList: Object,
    isSaving: Boolean,
    isDeleting: Boolean,
    validator: Function,
    showArea: truthProp,
    showDetail: truthProp,
    showDelete: Boolean,
    showPostal: Boolean,
    disableArea: Boolean,
    searchResult: Array,
    telMaxlength: numericProp,
    showSetDefault: Boolean,
    saveButtonText: String,
    areaPlaceholder: String,
    deleteButtonText: String,
    showSearchResult: Boolean,
    detailRows: makeNumericProp(1),
    detailMaxlength: makeNumericProp(200),
    areaColumnsPlaceholder: makeArrayProp(),
    addressInfo: {
      type: Object,
      default: () => extend({}, DEFAULT_DATA)
    },
    telValidator: {
      type: Function,
      default: isMobile
    },
    postalValidator: {
      type: Function,
      default: isPostal
    }
  };
  var _AddressEdit = vue.defineComponent({
    name: name$1b,
    props: props$p,
    emits: ["save", "focus", "delete", "click-area", "change-area", "change-detail", "select-search", "change-default"],
    setup(props2, {
      emit,
      slots
    }) {
      var areaRef = vue.ref();
      var state = vue.reactive({
        data: {},
        showAreaPopup: false,
        detailFocused: false,
        errorInfo: {
          tel: "",
          name: "",
          areaCode: "",
          postalCode: "",
          addressDetail: ""
        }
      });
      var areaListLoaded = vue.computed(() => isObject$1(props2.areaList) && Object.keys(props2.areaList).length);
      var areaText = vue.computed(() => {
        var {
          country,
          province,
          city,
          county,
          areaCode
        } = state.data;
        if (areaCode) {
          var arr = [country, province, city, county];
          if (province && province === city) {
            arr.splice(1, 1);
          }
          return arr.filter(Boolean).join("/");
        }
        return "";
      });
      var hideBottomFields = vue.computed(() => {
        var _props$searchResult;
        return ((_props$searchResult = props2.searchResult) == null ? void 0 : _props$searchResult.length) && state.detailFocused;
      });
      var assignAreaValues = () => {
        if (areaRef.value) {
          var detail = areaRef.value.getArea();
          detail.areaCode = detail.code;
          delete detail.code;
          extend(state.data, detail);
        }
      };
      var onFocus = (key) => {
        state.errorInfo[key] = "";
        state.detailFocused = key === "addressDetail";
        emit("focus", key);
      };
      var getErrorMessage = (key) => {
        var value = String(state.data[key] || "").trim();
        if (props2.validator) {
          var message = props2.validator(key, value);
          if (message) {
            return message;
          }
        }
        switch (key) {
          case "name":
            return value ? "" : t$g("nameEmpty");
          case "tel":
            return props2.telValidator(value) ? "" : t$g("telInvalid");
          case "areaCode":
            return value ? "" : t$g("areaEmpty");
          case "addressDetail":
            return value ? "" : t$g("addressEmpty");
          case "postalCode":
            return value && !props2.postalValidator(value) ? t$g("postalEmpty") : "";
        }
      };
      var onSave = () => {
        var items = ["name", "tel"];
        if (props2.showArea) {
          items.push("areaCode");
        }
        if (props2.showDetail) {
          items.push("addressDetail");
        }
        if (props2.showPostal) {
          items.push("postalCode");
        }
        var isValid = items.every((item) => {
          var msg = getErrorMessage(item);
          if (msg) {
            state.errorInfo[item] = msg;
          }
          return !msg;
        });
        if (isValid && !props2.isSaving) {
          emit("save", state.data);
        }
      };
      var onChangeDetail = (val) => {
        state.data.addressDetail = val;
        emit("change-detail", val);
      };
      var onAreaConfirm = (values) => {
        values = values.filter(Boolean);
        if (values.some((value) => !value.code)) {
          Toast(t$g("areaEmpty"));
          return;
        }
        state.showAreaPopup = false;
        assignAreaValues();
        emit("change-area", values);
      };
      var onDelete = () => emit("delete", state.data);
      var getArea = () => areaRef.value ? areaRef.value.getValues() : [];
      var setAreaCode = (code) => {
        state.data.areaCode = code || "";
        if (code) {
          vue.nextTick(assignAreaValues);
        }
      };
      var onDetailBlur = () => {
        setTimeout(() => {
          state.detailFocused = false;
        });
      };
      var setAddressDetail = (value) => {
        state.data.addressDetail = value;
      };
      var renderSetDefaultCell = () => {
        if (props2.showSetDefault) {
          var _slots = {
            "right-icon": () => vue.createVNode(Switch, {
              "modelValue": state.data.isDefault,
              "onUpdate:modelValue": ($event) => state.data.isDefault = $event,
              "size": "24",
              "onChange": (event) => emit("change-default", event)
            }, null)
          };
          return vue.withDirectives(vue.createVNode(Cell, {
            "center": true,
            "title": t$g("defaultAddress"),
            "class": bem$17("default")
          }, _slots), [[vue.vShow, !hideBottomFields.value]]);
        }
        return null;
      };
      useExpose({
        getArea,
        setAreaCode,
        setAddressDetail
      });
      vue.watch(() => props2.areaList, () => setAreaCode(state.data.areaCode));
      vue.watch(() => props2.addressInfo, (value) => {
        state.data = extend({}, DEFAULT_DATA, value);
        setAreaCode(value.areaCode);
      }, {
        deep: true,
        immediate: true
      });
      return () => {
        var {
          data,
          errorInfo
        } = state;
        var {
          disableArea
        } = props2;
        return vue.createVNode("div", {
          "class": bem$17()
        }, [vue.createVNode("div", {
          "class": bem$17("fields")
        }, [vue.createVNode(Field, {
          "modelValue": data.name,
          "onUpdate:modelValue": ($event) => data.name = $event,
          "clearable": true,
          "label": t$g("name"),
          "placeholder": t$g("name"),
          "errorMessage": errorInfo.name,
          "onFocus": () => onFocus("name")
        }, null), vue.createVNode(Field, {
          "modelValue": data.tel,
          "onUpdate:modelValue": ($event) => data.tel = $event,
          "clearable": true,
          "type": "tel",
          "label": t$g("tel"),
          "maxlength": props2.telMaxlength,
          "placeholder": t$g("tel"),
          "errorMessage": errorInfo.tel,
          "onFocus": () => onFocus("tel")
        }, null), vue.withDirectives(vue.createVNode(Field, {
          "readonly": true,
          "label": t$g("area"),
          "is-link": !disableArea,
          "modelValue": areaText.value,
          "placeholder": props2.areaPlaceholder || t$g("area"),
          "errorMessage": errorInfo.areaCode,
          "onFocus": () => onFocus("areaCode"),
          "onClick": () => {
            emit("click-area");
            state.showAreaPopup = !disableArea;
          }
        }, null), [[vue.vShow, props2.showArea]]), vue.createVNode(AddressEditDetail, {
          "show": props2.showDetail,
          "value": data.addressDetail,
          "focused": state.detailFocused,
          "detailRows": props2.detailRows,
          "errorMessage": errorInfo.addressDetail,
          "searchResult": props2.searchResult,
          "detailMaxlength": props2.detailMaxlength,
          "showSearchResult": props2.showSearchResult,
          "onBlur": onDetailBlur,
          "onFocus": () => onFocus("addressDetail"),
          "onInput": onChangeDetail,
          "onSelect-search": (event) => emit("select-search", event)
        }, null), props2.showPostal && vue.withDirectives(vue.createVNode(Field, {
          "modelValue": data.postalCode,
          "onUpdate:modelValue": ($event) => data.postalCode = $event,
          "type": "tel",
          "label": t$g("postal"),
          "maxlength": "6",
          "placeholder": t$g("postal"),
          "errorMessage": errorInfo.postalCode,
          "onFocus": () => onFocus("postalCode")
        }, null), [[vue.vShow, !hideBottomFields.value]]), slots.default == null ? void 0 : slots.default()]), renderSetDefaultCell(), vue.withDirectives(vue.createVNode("div", {
          "class": bem$17("buttons")
        }, [vue.createVNode(Button, {
          "block": true,
          "round": true,
          "type": "danger",
          "text": props2.saveButtonText || t$g("save"),
          "class": bem$17("button"),
          "loading": props2.isSaving,
          "onClick": onSave
        }, null), props2.showDelete && vue.createVNode(Button, {
          "block": true,
          "round": true,
          "class": bem$17("button"),
          "loading": props2.isDeleting,
          "text": props2.deleteButtonText || t$g("delete"),
          "onClick": onDelete
        }, null)]), [[vue.vShow, !hideBottomFields.value]]), vue.createVNode(Popup, {
          "show": state.showAreaPopup,
          "onUpdate:show": ($event) => state.showAreaPopup = $event,
          "round": true,
          "teleport": "body",
          "position": "bottom",
          "lazyRender": false
        }, {
          default: () => [vue.createVNode(Area, {
            "ref": areaRef,
            "value": data.areaCode,
            "loading": !areaListLoaded.value,
            "areaList": props2.areaList,
            "columnsPlaceholder": props2.areaColumnsPlaceholder,
            "onConfirm": onAreaConfirm,
            "onCancel": () => {
              state.showAreaPopup = false;
            }
          }, null)]
        })]);
      };
    }
  });
  var AddressEdit = withInstall(_AddressEdit);
  var [name$1a, bem$16] = createNamespace("radio-group");
  var props$o = {
    disabled: Boolean,
    iconSize: numericProp,
    direction: String,
    modelValue: unknownProp,
    checkedColor: String
  };
  var RADIO_KEY = Symbol(name$1a);
  var _RadioGroup = vue.defineComponent({
    name: name$1a,
    props: props$o,
    emits: ["change", "update:modelValue"],
    setup(props2, {
      emit,
      slots
    }) {
      var {
        linkChildren
      } = useChildren(RADIO_KEY);
      var updateValue = (value) => emit("update:modelValue", value);
      vue.watch(() => props2.modelValue, (value) => emit("change", value));
      linkChildren({
        props: props2,
        updateValue
      });
      useCustomFieldValue(() => props2.modelValue);
      return () => vue.createVNode("div", {
        "class": bem$16([props2.direction]),
        "role": "radiogroup"
      }, [slots.default == null ? void 0 : slots.default()]);
    }
  });
  var RadioGroup = withInstall(_RadioGroup);
  var [name$19, bem$15] = createNamespace("tag");
  var _Tag = vue.defineComponent({
    name: name$19,
    props: {
      size: String,
      mark: Boolean,
      show: truthProp,
      type: makeStringProp("default"),
      color: String,
      plain: Boolean,
      round: Boolean,
      textColor: String,
      closeable: Boolean
    },
    emits: ["close"],
    setup(props2, {
      slots,
      emit
    }) {
      var onClose = (event) => {
        event.stopPropagation();
        emit("close", event);
      };
      var getStyle = () => {
        if (props2.plain) {
          return {
            color: props2.textColor || props2.color,
            borderColor: props2.color
          };
        }
        return {
          color: props2.textColor,
          background: props2.color
        };
      };
      var renderTag = () => {
        var {
          type,
          mark,
          plain,
          round: round2,
          size,
          closeable
        } = props2;
        var classes = {
          mark,
          plain,
          round: round2
        };
        if (size) {
          classes[size] = size;
        }
        var CloseIcon = closeable && vue.createVNode(Icon, {
          "name": "cross",
          "class": bem$15("close"),
          "onClick": onClose
        }, null);
        return vue.createVNode("span", {
          "style": getStyle(),
          "class": bem$15([classes, type])
        }, [slots.default == null ? void 0 : slots.default(), CloseIcon]);
      };
      return () => vue.createVNode(vue.Transition, {
        "name": props2.closeable ? "van-fade" : void 0
      }, {
        default: () => [props2.show ? renderTag() : null]
      });
    }
  });
  var Tag = withInstall(_Tag);
  var checkerProps = {
    name: unknownProp,
    shape: makeStringProp("round"),
    disabled: Boolean,
    iconSize: numericProp,
    modelValue: unknownProp,
    checkedColor: String,
    labelPosition: String,
    labelDisabled: Boolean
  };
  var Checker = vue.defineComponent({
    props: extend({}, checkerProps, {
      bem: makeRequiredProp(Function),
      role: String,
      parent: Object,
      checked: Boolean,
      bindGroup: truthProp
    }),
    emits: ["click", "toggle"],
    setup(props2, {
      emit,
      slots
    }) {
      var iconRef = vue.ref();
      var getParentProp = (name2) => {
        if (props2.parent && props2.bindGroup) {
          return props2.parent.props[name2];
        }
      };
      var disabled = vue.computed(() => getParentProp("disabled") || props2.disabled);
      var direction = vue.computed(() => getParentProp("direction"));
      var iconStyle = vue.computed(() => {
        var checkedColor = props2.checkedColor || getParentProp("checkedColor");
        if (checkedColor && props2.checked && !disabled.value) {
          return {
            borderColor: checkedColor,
            backgroundColor: checkedColor
          };
        }
      });
      var onClick = (event) => {
        var {
          target
        } = event;
        var icon = iconRef.value;
        var iconClicked = icon === target || (icon == null ? void 0 : icon.contains(target));
        if (!disabled.value && (iconClicked || !props2.labelDisabled)) {
          emit("toggle");
        }
        emit("click", event);
      };
      var renderIcon = () => {
        var {
          bem: bem2,
          shape,
          checked
        } = props2;
        var iconSize = props2.iconSize || getParentProp("iconSize");
        return vue.createVNode("div", {
          "ref": iconRef,
          "class": bem2("icon", [shape, {
            disabled: disabled.value,
            checked
          }]),
          "style": {
            fontSize: addUnit(iconSize)
          }
        }, [slots.icon ? slots.icon({
          checked,
          disabled: disabled.value
        }) : vue.createVNode(Icon, {
          "name": "success",
          "style": iconStyle.value
        }, null)]);
      };
      var renderLabel = () => {
        if (slots.default) {
          return vue.createVNode("span", {
            "class": props2.bem("label", [props2.labelPosition, {
              disabled: disabled.value
            }])
          }, [slots.default()]);
        }
      };
      return () => {
        var nodes = props2.labelPosition === "left" ? [renderLabel(), renderIcon()] : [renderIcon(), renderLabel()];
        return vue.createVNode("div", {
          "role": props2.role,
          "class": props2.bem([{
            disabled: disabled.value,
            "label-disabled": props2.labelDisabled
          }, direction.value]),
          "tabindex": disabled.value ? -1 : 0,
          "aria-checked": props2.checked,
          "onClick": onClick
        }, [nodes]);
      };
    }
  });
  var [name$18, bem$14] = createNamespace("radio");
  var _Radio = vue.defineComponent({
    name: name$18,
    props: checkerProps,
    emits: ["update:modelValue"],
    setup(props2, {
      emit,
      slots
    }) {
      var {
        parent
      } = useParent(RADIO_KEY);
      var checked = () => {
        var value = parent ? parent.props.modelValue : props2.modelValue;
        return value === props2.name;
      };
      var toggle = () => {
        if (parent) {
          parent.updateValue(props2.name);
        } else {
          emit("update:modelValue", props2.name);
        }
      };
      return () => vue.createVNode(Checker, vue.mergeProps({
        "bem": bem$14,
        "role": "radio",
        "parent": parent,
        "checked": checked(),
        "onToggle": toggle
      }, props2), pick(slots, ["default", "icon"]));
    }
  });
  var Radio = withInstall(_Radio);
  var [name$17, bem$13] = createNamespace("address-item");
  var AddressListItem = vue.defineComponent({
    name: name$17,
    props: {
      address: makeRequiredProp(Object),
      disabled: Boolean,
      switchable: Boolean,
      defaultTagText: String
    },
    emits: ["edit", "click", "select"],
    setup(props2, {
      slots,
      emit
    }) {
      var onClick = () => {
        if (props2.switchable) {
          emit("select");
        }
        emit("click");
      };
      var renderRightIcon = () => vue.createVNode(Icon, {
        "name": "edit",
        "class": bem$13("edit"),
        "onClick": (event) => {
          event.stopPropagation();
          emit("edit");
          emit("click");
        }
      }, null);
      var renderTag = () => {
        if (slots.tag) {
          return slots.tag(props2.address);
        }
        if (props2.address.isDefault && props2.defaultTagText) {
          return vue.createVNode(Tag, {
            "type": "danger",
            "round": true,
            "class": bem$13("tag")
          }, {
            default: () => [props2.defaultTagText]
          });
        }
      };
      var renderContent = () => {
        var {
          address,
          disabled,
          switchable
        } = props2;
        var Info = [vue.createVNode("div", {
          "class": bem$13("name")
        }, [address.name + " " + address.tel, renderTag()]), vue.createVNode("div", {
          "class": bem$13("address")
        }, [address.address])];
        if (switchable && !disabled) {
          return vue.createVNode(Radio, {
            "name": address.id,
            "iconSize": 18
          }, {
            default: () => [Info]
          });
        }
        return Info;
      };
      return () => {
        var {
          disabled
        } = props2;
        return vue.createVNode("div", {
          "class": bem$13({
            disabled
          }),
          "onClick": onClick
        }, [vue.createVNode(Cell, {
          "border": false,
          "valueClass": bem$13("value")
        }, {
          value: renderContent,
          "right-icon": renderRightIcon
        }), slots.bottom == null ? void 0 : slots.bottom(extend({}, props2.address, {
          disabled
        }))]);
      };
    }
  });
  var [name$16, bem$12, t$f] = createNamespace("address-list");
  var _AddressList = vue.defineComponent({
    name: name$16,
    props: {
      list: makeArrayProp(),
      modelValue: numericProp,
      switchable: truthProp,
      disabledText: String,
      disabledList: makeArrayProp(),
      addButtonText: String,
      defaultTagText: String
    },
    emits: ["add", "edit", "select", "click-item", "edit-disabled", "select-disabled", "update:modelValue"],
    setup(props2, {
      slots,
      emit
    }) {
      var renderItem = (item, index2, disabled) => {
        var onEdit = () => emit(disabled ? "edit-disabled" : "edit", item, index2);
        var onClick = () => emit("click-item", item, index2);
        var onSelect = () => {
          emit(disabled ? "select-disabled" : "select", item, index2);
          if (!disabled) {
            emit("update:modelValue", item.id);
          }
        };
        return vue.createVNode(AddressListItem, {
          "key": item.id,
          "address": item,
          "disabled": disabled,
          "switchable": props2.switchable,
          "defaultTagText": props2.defaultTagText,
          "onEdit": onEdit,
          "onClick": onClick,
          "onSelect": onSelect
        }, {
          bottom: slots["item-bottom"],
          tag: slots.tag
        });
      };
      var renderList = (list, disabled) => {
        if (list) {
          return list.map((item, index2) => renderItem(item, index2, disabled));
        }
      };
      var renderBottom = () => vue.createVNode("div", {
        "class": [bem$12("bottom"), "van-safe-area-bottom"]
      }, [vue.createVNode(Button, {
        "round": true,
        "block": true,
        "type": "danger",
        "text": props2.addButtonText || t$f("add"),
        "class": bem$12("add"),
        "onClick": () => emit("add")
      }, null)]);
      return () => {
        var List2 = renderList(props2.list);
        var DisabledList = renderList(props2.disabledList, true);
        var DisabledText = props2.disabledText && vue.createVNode("div", {
          "class": bem$12("disabled-text")
        }, [props2.disabledText]);
        return vue.createVNode("div", {
          "class": bem$12()
        }, [slots.top == null ? void 0 : slots.top(), vue.createVNode(RadioGroup, {
          "modelValue": props2.modelValue
        }, {
          default: () => [List2]
        }), DisabledText, DisabledList, slots.default == null ? void 0 : slots.default(), renderBottom()]);
      };
    }
  });
  var AddressList = withInstall(_AddressList);
  var [name$15, bem$11, t$e] = createNamespace("calendar");
  var formatMonthTitle = (date) => t$e("monthTitle", date.getFullYear(), date.getMonth() + 1);
  function compareMonth(date1, date2) {
    var year1 = date1.getFullYear();
    var year2 = date2.getFullYear();
    if (year1 === year2) {
      var month1 = date1.getMonth();
      var month2 = date2.getMonth();
      return month1 === month2 ? 0 : month1 > month2 ? 1 : -1;
    }
    return year1 > year2 ? 1 : -1;
  }
  function compareDay(day1, day2) {
    var compareMonthResult = compareMonth(day1, day2);
    if (compareMonthResult === 0) {
      var date1 = day1.getDate();
      var date2 = day2.getDate();
      return date1 === date2 ? 0 : date1 > date2 ? 1 : -1;
    }
    return compareMonthResult;
  }
  var cloneDate = (date) => new Date(date);
  var cloneDates = (dates) => Array.isArray(dates) ? dates.map(cloneDate) : cloneDate(dates);
  function getDayByOffset(date, offset2) {
    var cloned = cloneDate(date);
    cloned.setDate(cloned.getDate() + offset2);
    return cloned;
  }
  var getPrevDay = (date) => getDayByOffset(date, -1);
  var getNextDay = (date) => getDayByOffset(date, 1);
  var getToday = () => {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };
  function calcDateNum(date) {
    var day1 = date[0].getTime();
    var day2 = date[1].getTime();
    return (day2 - day1) / (1e3 * 60 * 60 * 24) + 1;
  }
  function useRefs() {
    var refs = vue.ref([]);
    vue.onBeforeUpdate(() => {
      refs.value = [];
    });
    var setRefs = (index2) => (el) => {
      refs.value[index2] = el;
    };
    return [refs, setRefs];
  }
  var sharedProps = extend({}, pickerProps, {
    filter: Function,
    columnsOrder: Array,
    formatter: {
      type: Function,
      default: (type, value) => value
    }
  });
  var pickerKeys = Object.keys(pickerProps);
  function times(n, iteratee) {
    var index2 = -1;
    var result = Array(n);
    while (++index2 < n) {
      result[index2] = iteratee(index2);
    }
    return result;
  }
  function getTrueValue(value) {
    if (!value) {
      return 0;
    }
    while (Number.isNaN(parseInt(value, 10))) {
      if (value.length > 1) {
        value = value.slice(1);
      } else {
        return 0;
      }
    }
    return parseInt(value, 10);
  }
  var getMonthEndDay = (year, month) => 32 - new Date(year, month - 1, 32).getDate();
  var useHeight = (element) => {
    var height = vue.ref();
    vue.onMounted(() => vue.nextTick(() => {
      height.value = useRect(element).height;
    }));
    return height;
  };
  var [name$14] = createNamespace("calendar-day");
  var CalendarDay = vue.defineComponent({
    name: name$14,
    props: {
      item: makeRequiredProp(Object),
      color: String,
      index: Number,
      offset: makeNumberProp(0),
      rowHeight: String
    },
    emits: ["click"],
    setup(props2, {
      emit,
      slots
    }) {
      var style = vue.computed(() => {
        var {
          item,
          index: index2,
          color,
          offset: offset2,
          rowHeight
        } = props2;
        var style2 = {
          height: rowHeight
        };
        if (item.type === "placeholder") {
          style2.width = "100%";
          return style2;
        }
        if (index2 === 0) {
          style2.marginLeft = 100 * offset2 / 7 + "%";
        }
        if (color) {
          switch (item.type) {
            case "end":
            case "start":
            case "start-end":
            case "multiple-middle":
            case "multiple-selected":
              style2.background = color;
              break;
            case "middle":
              style2.color = color;
              break;
          }
        }
        return style2;
      });
      var onClick = () => {
        if (props2.item.type !== "disabled") {
          emit("click", props2.item);
        }
      };
      var renderTopInfo = () => {
        var {
          topInfo
        } = props2.item;
        if (topInfo || slots["top-info"]) {
          return vue.createVNode("div", {
            "class": bem$11("top-info")
          }, [slots["top-info"] ? slots["top-info"](props2.item) : topInfo]);
        }
      };
      var renderBottomInfo = () => {
        var {
          bottomInfo
        } = props2.item;
        if (bottomInfo || slots["bottom-info"]) {
          return vue.createVNode("div", {
            "class": bem$11("bottom-info")
          }, [slots["bottom-info"] ? slots["bottom-info"](props2.item) : bottomInfo]);
        }
      };
      var renderContent = () => {
        var {
          item,
          color,
          rowHeight
        } = props2;
        var {
          type,
          text
        } = item;
        var Nodes = [renderTopInfo(), text, renderBottomInfo()];
        if (type === "selected") {
          return vue.createVNode("div", {
            "class": bem$11("selected-day"),
            "style": {
              width: rowHeight,
              height: rowHeight,
              background: color
            }
          }, [Nodes]);
        }
        return Nodes;
      };
      return () => {
        var {
          type,
          className
        } = props2.item;
        if (type === "placeholder") {
          return vue.createVNode("div", {
            "class": bem$11("day"),
            "style": style.value
          }, null);
        }
        return vue.createVNode("div", {
          "role": "gridcell",
          "style": style.value,
          "class": [bem$11("day", type), className],
          "tabindex": type === "disabled" ? void 0 : -1,
          "onClick": onClick
        }, [renderContent()]);
      };
    }
  });
  var [name$13] = createNamespace("calendar-month");
  var props$n = {
    date: makeRequiredProp(Date),
    type: String,
    color: String,
    minDate: makeRequiredProp(Date),
    maxDate: makeRequiredProp(Date),
    showMark: Boolean,
    rowHeight: numericProp,
    formatter: Function,
    lazyRender: Boolean,
    currentDate: [Date, Array],
    allowSameDay: Boolean,
    showSubtitle: Boolean,
    showMonthTitle: Boolean,
    firstDayOfWeek: Number
  };
  var CalendarMonth = vue.defineComponent({
    name: name$13,
    props: props$n,
    emits: ["click", "update-height"],
    setup(props2, {
      emit,
      slots
    }) {
      var [visible, setVisible] = useToggle();
      var daysRef = vue.ref();
      var monthRef = vue.ref();
      var height = useHeight(monthRef);
      var title = vue.computed(() => formatMonthTitle(props2.date));
      var rowHeight = vue.computed(() => addUnit(props2.rowHeight));
      var offset2 = vue.computed(() => {
        var realDay = props2.date.getDay();
        if (props2.firstDayOfWeek) {
          return (realDay + 7 - props2.firstDayOfWeek) % 7;
        }
        return realDay;
      });
      var totalDay = vue.computed(() => getMonthEndDay(props2.date.getFullYear(), props2.date.getMonth() + 1));
      var shouldRender = vue.computed(() => visible.value || !props2.lazyRender);
      var getTitle = () => title.value;
      var scrollIntoView = (body) => {
        var el = props2.showSubtitle ? daysRef.value : monthRef.value;
        if (el) {
          var scrollTop = useRect(el).top - useRect(body).top + body.scrollTop;
          setScrollTop(body, scrollTop);
        }
      };
      var getMultipleDayType = (day) => {
        var isSelected = (date) => props2.currentDate.some((item) => compareDay(item, date) === 0);
        if (isSelected(day)) {
          var prevDay = getPrevDay(day);
          var nextDay = getNextDay(day);
          var prevSelected = isSelected(prevDay);
          var nextSelected = isSelected(nextDay);
          if (prevSelected && nextSelected) {
            return "multiple-middle";
          }
          if (prevSelected) {
            return "end";
          }
          if (nextSelected) {
            return "start";
          }
          return "multiple-selected";
        }
        return "";
      };
      var getRangeDayType = (day) => {
        var [startDay, endDay] = props2.currentDate;
        if (!startDay) {
          return "";
        }
        var compareToStart = compareDay(day, startDay);
        if (!endDay) {
          return compareToStart === 0 ? "start" : "";
        }
        var compareToEnd = compareDay(day, endDay);
        if (props2.allowSameDay && compareToStart === 0 && compareToEnd === 0) {
          return "start-end";
        }
        if (compareToStart === 0) {
          return "start";
        }
        if (compareToEnd === 0) {
          return "end";
        }
        if (compareToStart > 0 && compareToEnd < 0) {
          return "middle";
        }
        return "";
      };
      var getDayType = (day) => {
        var {
          type,
          minDate,
          maxDate,
          currentDate
        } = props2;
        if (compareDay(day, minDate) < 0 || compareDay(day, maxDate) > 0) {
          return "disabled";
        }
        if (currentDate === null) {
          return "";
        }
        if (Array.isArray(currentDate)) {
          if (type === "multiple") {
            return getMultipleDayType(day);
          }
          if (type === "range") {
            return getRangeDayType(day);
          }
        } else if (type === "single") {
          return compareDay(day, currentDate) === 0 ? "selected" : "";
        }
        return "";
      };
      var getBottomInfo = (dayType) => {
        if (props2.type === "range") {
          if (dayType === "start" || dayType === "end") {
            return t$e(dayType);
          }
          if (dayType === "start-end") {
            return t$e("startEnd");
          }
        }
      };
      var renderTitle = () => {
        if (props2.showMonthTitle) {
          return vue.createVNode("div", {
            "class": bem$11("month-title")
          }, [title.value]);
        }
      };
      var renderMark = () => {
        if (props2.showMark && shouldRender.value) {
          return vue.createVNode("div", {
            "class": bem$11("month-mark")
          }, [props2.date.getMonth() + 1]);
        }
      };
      var placeholders = vue.computed(() => {
        var count = Math.ceil((totalDay.value + offset2.value) / 7);
        return Array(count).fill({
          type: "placeholder"
        });
      });
      var days = vue.computed(() => {
        var days2 = [];
        var year = props2.date.getFullYear();
        var month = props2.date.getMonth();
        for (var day = 1; day <= totalDay.value; day++) {
          var date = new Date(year, month, day);
          var type = getDayType(date);
          var config = {
            date,
            type,
            text: day,
            bottomInfo: getBottomInfo(type)
          };
          if (props2.formatter) {
            config = props2.formatter(config);
          }
          days2.push(config);
        }
        return days2;
      });
      var disabledDays = vue.computed(() => days.value.filter((day) => day.type === "disabled"));
      var renderDay = (item, index2) => vue.createVNode(CalendarDay, {
        "item": item,
        "index": index2,
        "color": props2.color,
        "offset": offset2.value,
        "rowHeight": rowHeight.value,
        "onClick": (item2) => emit("click", item2)
      }, pick(slots, ["top-info", "bottom-info"]));
      var renderDays = () => vue.createVNode("div", {
        "ref": daysRef,
        "role": "grid",
        "class": bem$11("days")
      }, [renderMark(), (shouldRender.value ? days : placeholders).value.map(renderDay)]);
      useExpose({
        getTitle,
        getHeight: () => height.value,
        setVisible,
        scrollIntoView,
        disabledDays
      });
      return () => vue.createVNode("div", {
        "class": bem$11("month"),
        "ref": monthRef
      }, [renderTitle(), renderDays()]);
    }
  });
  var [name$12] = createNamespace("calendar-header");
  var CalendarHeader = vue.defineComponent({
    name: name$12,
    props: {
      title: String,
      subtitle: String,
      showTitle: Boolean,
      showSubtitle: Boolean,
      firstDayOfWeek: Number
    },
    emits: ["click-subtitle"],
    setup(props2, {
      slots,
      emit
    }) {
      var renderTitle = () => {
        if (props2.showTitle) {
          var text = props2.title || t$e("title");
          var title = slots.title ? slots.title() : text;
          return vue.createVNode("div", {
            "class": bem$11("header-title")
          }, [title]);
        }
      };
      var onClickSubtitle = (event) => {
        emit("click-subtitle", event);
      };
      var renderSubtitle = () => {
        if (props2.showSubtitle) {
          var title = slots.subtitle ? slots.subtitle() : props2.subtitle;
          return vue.createVNode("div", {
            "class": bem$11("header-subtitle"),
            "onClick": onClickSubtitle
          }, [title]);
        }
      };
      var renderWeekDays = () => {
        var {
          firstDayOfWeek
        } = props2;
        var weekdays = t$e("weekdays");
        var renderWeekDays2 = [...weekdays.slice(firstDayOfWeek, 7), ...weekdays.slice(0, firstDayOfWeek)];
        return vue.createVNode("div", {
          "class": bem$11("weekdays")
        }, [renderWeekDays2.map((text) => vue.createVNode("span", {
          "class": bem$11("weekday")
        }, [text]))]);
      };
      return () => vue.createVNode("div", {
        "class": bem$11("header")
      }, [renderTitle(), renderSubtitle(), renderWeekDays()]);
    }
  });
  var props$m = {
    show: Boolean,
    type: makeStringProp("single"),
    title: String,
    color: String,
    round: truthProp,
    readonly: Boolean,
    poppable: truthProp,
    maxRange: makeNumericProp(null),
    position: makeStringProp("bottom"),
    teleport: [String, Object],
    showMark: truthProp,
    showTitle: truthProp,
    formatter: Function,
    rowHeight: numericProp,
    confirmText: String,
    rangePrompt: String,
    lazyRender: truthProp,
    showConfirm: truthProp,
    defaultDate: [Date, Array],
    allowSameDay: Boolean,
    showSubtitle: truthProp,
    closeOnPopstate: truthProp,
    showRangePrompt: truthProp,
    confirmDisabledText: String,
    closeOnClickOverlay: truthProp,
    safeAreaInsetBottom: truthProp,
    minDate: {
      type: Date,
      validator: isDate,
      default: getToday
    },
    maxDate: {
      type: Date,
      validator: isDate,
      default: () => {
        var now = getToday();
        return new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
      }
    },
    firstDayOfWeek: {
      type: numericProp,
      default: 0,
      validator: (val) => val >= 0 && val <= 6
    }
  };
  var _Calendar = vue.defineComponent({
    name: name$15,
    props: props$m,
    emits: ["select", "confirm", "unselect", "month-show", "over-range", "update:show", "click-subtitle"],
    setup(props2, {
      emit,
      slots
    }) {
      var limitDateRange = (date, minDate = props2.minDate, maxDate = props2.maxDate) => {
        if (compareDay(date, minDate) === -1) {
          return minDate;
        }
        if (compareDay(date, maxDate) === 1) {
          return maxDate;
        }
        return date;
      };
      var getInitialDate = (defaultDate = props2.defaultDate) => {
        var {
          type,
          minDate,
          maxDate
        } = props2;
        if (defaultDate === null) {
          return defaultDate;
        }
        var now = getToday();
        if (type === "range") {
          if (!Array.isArray(defaultDate)) {
            defaultDate = [];
          }
          var start2 = limitDateRange(defaultDate[0] || now, minDate, getPrevDay(maxDate));
          var end2 = limitDateRange(defaultDate[1] || now, getNextDay(minDate));
          return [start2, end2];
        }
        if (type === "multiple") {
          if (Array.isArray(defaultDate)) {
            return defaultDate.map((date) => limitDateRange(date));
          }
          return [limitDateRange(now)];
        }
        if (!defaultDate || Array.isArray(defaultDate)) {
          defaultDate = now;
        }
        return limitDateRange(defaultDate);
      };
      var bodyHeight;
      var bodyRef = vue.ref();
      var subtitle = vue.ref("");
      var currentDate = vue.ref(getInitialDate());
      var [monthRefs, setMonthRefs] = useRefs();
      var dayOffset = vue.computed(() => props2.firstDayOfWeek ? +props2.firstDayOfWeek % 7 : 0);
      var months = vue.computed(() => {
        var months2 = [];
        var cursor = new Date(props2.minDate);
        cursor.setDate(1);
        do {
          months2.push(new Date(cursor));
          cursor.setMonth(cursor.getMonth() + 1);
        } while (compareMonth(cursor, props2.maxDate) !== 1);
        return months2;
      });
      var buttonDisabled = vue.computed(() => {
        if (currentDate.value) {
          if (props2.type === "range") {
            return !currentDate.value[0] || !currentDate.value[1];
          }
          if (props2.type === "multiple") {
            return !currentDate.value.length;
          }
        }
        return !currentDate.value;
      });
      var onScroll = () => {
        var top2 = getScrollTop(bodyRef.value);
        var bottom2 = top2 + bodyHeight;
        var heights = months.value.map((item, index2) => monthRefs.value[index2].getHeight());
        var heightSum = heights.reduce((a, b) => a + b, 0);
        if (bottom2 > heightSum && top2 > 0) {
          return;
        }
        var height = 0;
        var currentMonth;
        var visibleRange = [-1, -1];
        for (var i = 0; i < months.value.length; i++) {
          var month = monthRefs.value[i];
          var visible = height <= bottom2 && height + heights[i] >= top2;
          if (visible) {
            visibleRange[1] = i;
            if (!currentMonth) {
              currentMonth = month;
              visibleRange[0] = i;
            }
            if (!monthRefs.value[i].showed) {
              monthRefs.value[i].showed = true;
              emit("month-show", {
                date: month.date,
                title: month.getTitle()
              });
            }
          }
          height += heights[i];
        }
        months.value.forEach((month2, index2) => {
          var visible2 = index2 >= visibleRange[0] - 1 && index2 <= visibleRange[1] + 1;
          monthRefs.value[index2].setVisible(visible2);
        });
        if (currentMonth) {
          subtitle.value = currentMonth.getTitle();
        }
      };
      var scrollToDate = (targetDate) => {
        raf(() => {
          months.value.some((month, index2) => {
            if (compareMonth(month, targetDate) === 0) {
              if (bodyRef.value) {
                monthRefs.value[index2].scrollIntoView(bodyRef.value);
              }
              return true;
            }
            return false;
          });
          onScroll();
        });
      };
      var scrollIntoView = () => {
        if (props2.poppable && !props2.show) {
          return;
        }
        if (currentDate.value) {
          var targetDate = props2.type === "single" ? currentDate.value : currentDate.value[0];
          scrollToDate(targetDate);
        } else {
          raf(onScroll);
        }
      };
      var init = () => {
        if (props2.poppable && !props2.show) {
          return;
        }
        raf(() => {
          bodyHeight = Math.floor(useRect(bodyRef).height);
          scrollIntoView();
        });
      };
      var reset = (date = getInitialDate()) => {
        currentDate.value = date;
        scrollIntoView();
      };
      var checkRange = (date) => {
        var {
          maxRange,
          rangePrompt,
          showRangePrompt
        } = props2;
        if (maxRange && calcDateNum(date) > maxRange) {
          if (showRangePrompt) {
            Toast(rangePrompt || t$e("rangePrompt", maxRange));
          }
          emit("over-range");
          return false;
        }
        return true;
      };
      var onConfirm = () => {
        var _currentDate$value;
        return emit("confirm", (_currentDate$value = currentDate.value) != null ? _currentDate$value : cloneDates(currentDate.value));
      };
      var select = (date, complete) => {
        var setCurrentDate = (date2) => {
          currentDate.value = date2;
          emit("select", cloneDates(date2));
        };
        if (complete && props2.type === "range") {
          var valid = checkRange(date);
          if (!valid) {
            if (props2.showConfirm) {
              setCurrentDate([date[0], getDayByOffset(date[0], +props2.maxRange - 1)]);
            } else {
              setCurrentDate(date);
            }
            return;
          }
        }
        setCurrentDate(date);
        if (complete && !props2.showConfirm) {
          onConfirm();
        }
      };
      var getDisabledDate = (disabledDays2, startDay, date) => {
        var _disabledDays$find;
        return (_disabledDays$find = disabledDays2.find((day) => compareDay(startDay, day.date) === -1 && compareDay(day.date, date) === -1)) == null ? void 0 : _disabledDays$find.date;
      };
      var disabledDays = vue.computed(() => monthRefs.value.reduce((arr, ref) => {
        var _ref$disabledDays$val, _ref$disabledDays;
        arr.push(...(_ref$disabledDays$val = (_ref$disabledDays = ref.disabledDays) == null ? void 0 : _ref$disabledDays.value) != null ? _ref$disabledDays$val : []);
        return arr;
      }, []));
      var onClickDay = (item) => {
        if (props2.readonly || !item.date) {
          return;
        }
        var {
          date
        } = item;
        var {
          type
        } = props2;
        if (type === "range") {
          if (!currentDate.value) {
            select([date]);
            return;
          }
          var [startDay, endDay] = currentDate.value;
          if (startDay && !endDay) {
            var compareToStart = compareDay(date, startDay);
            if (compareToStart === 1) {
              var disabledDay = getDisabledDate(disabledDays.value, startDay, date);
              if (disabledDay) {
                select([startDay, getPrevDay(disabledDay)]);
              } else {
                select([startDay, date], true);
              }
            } else if (compareToStart === -1) {
              select([date]);
            } else if (props2.allowSameDay) {
              select([date, date], true);
            }
          } else {
            select([date]);
          }
        } else if (type === "multiple") {
          if (!currentDate.value) {
            select([date]);
            return;
          }
          var dates = currentDate.value;
          var selectedIndex = dates.findIndex((dateItem) => compareDay(dateItem, date) === 0);
          if (selectedIndex !== -1) {
            var [unselectedDate] = dates.splice(selectedIndex, 1);
            emit("unselect", cloneDate(unselectedDate));
          } else if (props2.maxRange && dates.length >= props2.maxRange) {
            Toast(props2.rangePrompt || t$e("rangePrompt", props2.maxRange));
          } else {
            select([...dates, date]);
          }
        } else {
          select(date, true);
        }
      };
      var updateShow = (value) => emit("update:show", value);
      var renderMonth = (date, index2) => {
        var showMonthTitle = index2 !== 0 || !props2.showSubtitle;
        return vue.createVNode(CalendarMonth, vue.mergeProps({
          "ref": setMonthRefs(index2),
          "date": date,
          "currentDate": currentDate.value,
          "showMonthTitle": showMonthTitle,
          "firstDayOfWeek": dayOffset.value
        }, pick(props2, ["type", "color", "minDate", "maxDate", "showMark", "formatter", "rowHeight", "lazyRender", "showSubtitle", "allowSameDay"]), {
          "onClick": onClickDay
        }), pick(slots, ["top-info", "bottom-info"]));
      };
      var renderFooterButton = () => {
        if (slots.footer) {
          return slots.footer();
        }
        if (props2.showConfirm) {
          var slot = slots["confirm-text"];
          var disabled = buttonDisabled.value;
          var text = disabled ? props2.confirmDisabledText : props2.confirmText;
          return vue.createVNode(Button, {
            "round": true,
            "block": true,
            "type": "danger",
            "color": props2.color,
            "class": bem$11("confirm"),
            "disabled": disabled,
            "nativeType": "button",
            "onClick": onConfirm
          }, {
            default: () => [slot ? slot({
              disabled
            }) : text || t$e("confirm")]
          });
        }
      };
      var renderFooter = () => vue.createVNode("div", {
        "class": [bem$11("footer"), {
          "van-safe-area-bottom": props2.safeAreaInsetBottom
        }]
      }, [renderFooterButton()]);
      var renderCalendar = () => vue.createVNode("div", {
        "class": bem$11()
      }, [vue.createVNode(CalendarHeader, {
        "title": props2.title,
        "subtitle": subtitle.value,
        "showTitle": props2.showTitle,
        "showSubtitle": props2.showSubtitle,
        "firstDayOfWeek": dayOffset.value,
        "onClick-subtitle": (event) => emit("click-subtitle", event)
      }, pick(slots, ["title", "subtitle"])), vue.createVNode("div", {
        "ref": bodyRef,
        "class": bem$11("body"),
        "onScroll": onScroll
      }, [months.value.map(renderMonth)]), renderFooter()]);
      vue.watch(() => props2.show, init);
      vue.watch(() => [props2.type, props2.minDate, props2.maxDate], () => reset(getInitialDate(currentDate.value)));
      vue.watch(() => props2.defaultDate, (value = null) => {
        currentDate.value = value;
        scrollIntoView();
      });
      useExpose({
        reset,
        scrollToDate
      });
      onMountedOrActivated(init);
      return () => {
        if (props2.poppable) {
          return vue.createVNode(Popup, {
            "show": props2.show,
            "class": bem$11("popup"),
            "round": props2.round,
            "position": props2.position,
            "closeable": props2.showTitle || props2.showSubtitle,
            "teleport": props2.teleport,
            "closeOnPopstate": props2.closeOnPopstate,
            "closeOnClickOverlay": props2.closeOnClickOverlay,
            "onUpdate:show": updateShow
          }, {
            default: renderCalendar
          });
        }
        return renderCalendar();
      };
    }
  });
  var Calendar = withInstall(_Calendar);
  var [name$11, bem$10] = createNamespace("image");
  var _Image = vue.defineComponent({
    name: name$11,
    props: {
      src: String,
      alt: String,
      fit: String,
      round: Boolean,
      width: numericProp,
      height: numericProp,
      radius: numericProp,
      lazyLoad: Boolean,
      iconSize: numericProp,
      showError: truthProp,
      errorIcon: makeStringProp("photo-fail"),
      iconPrefix: String,
      showLoading: truthProp,
      loadingIcon: makeStringProp("photo")
    },
    emits: ["load", "error"],
    setup(props2, {
      emit,
      slots
    }) {
      var error = vue.ref(false);
      var loading = vue.ref(true);
      var imageRef = vue.ref();
      var {
        $Lazyload
      } = vue.getCurrentInstance().proxy;
      var style = vue.computed(() => {
        var style2 = {};
        if (isDef(props2.width)) {
          style2.width = addUnit(props2.width);
        }
        if (isDef(props2.height)) {
          style2.height = addUnit(props2.height);
        }
        if (isDef(props2.radius)) {
          style2.overflow = "hidden";
          style2.borderRadius = addUnit(props2.radius);
        }
        return style2;
      });
      vue.watch(() => props2.src, () => {
        error.value = false;
        loading.value = true;
      });
      var onLoad = (event) => {
        loading.value = false;
        emit("load", event);
      };
      var onError = (event) => {
        error.value = true;
        loading.value = false;
        emit("error", event);
      };
      var renderIcon = (name2, className, slot) => {
        if (slot) {
          return slot();
        }
        return vue.createVNode(Icon, {
          "name": name2,
          "size": props2.iconSize,
          "class": className,
          "classPrefix": props2.iconPrefix
        }, null);
      };
      var renderPlaceholder = () => {
        if (loading.value && props2.showLoading) {
          return vue.createVNode("div", {
            "class": bem$10("loading")
          }, [renderIcon(props2.loadingIcon, bem$10("loading-icon"), slots.loading)]);
        }
        if (error.value && props2.showError) {
          return vue.createVNode("div", {
            "class": bem$10("error")
          }, [renderIcon(props2.errorIcon, bem$10("error-icon"), slots.error)]);
        }
      };
      var renderImage = () => {
        if (error.value || !props2.src) {
          return;
        }
        var attrs = {
          alt: props2.alt,
          class: bem$10("img"),
          style: {
            objectFit: props2.fit
          }
        };
        if (props2.lazyLoad) {
          return vue.withDirectives(vue.createVNode("img", vue.mergeProps({
            "ref": imageRef
          }, attrs), null), [[vue.resolveDirective("lazy"), props2.src]]);
        }
        return vue.createVNode("img", vue.mergeProps({
          "src": props2.src,
          "onLoad": onLoad,
          "onError": onError
        }, attrs), null);
      };
      var onLazyLoaded = ({
        el
      }) => {
        if (el === imageRef.value && loading.value) {
          onLoad();
        }
      };
      var onLazyLoadError = ({
        el
      }) => {
        if (el === imageRef.value && !error.value) {
          onError();
        }
      };
      if ($Lazyload && inBrowser$1) {
        $Lazyload.$on("loaded", onLazyLoaded);
        $Lazyload.$on("error", onLazyLoadError);
        vue.onBeforeUnmount(() => {
          $Lazyload.$off("loaded", onLazyLoaded);
          $Lazyload.$off("error", onLazyLoadError);
        });
      }
      return () => vue.createVNode("div", {
        "class": bem$10({
          round: props2.round
        }),
        "style": style.value
      }, [renderImage(), renderPlaceholder(), slots.default == null ? void 0 : slots.default()]);
    }
  });
  var Image$1 = withInstall(_Image);
  var [name$10, bem$$] = createNamespace("card");
  var _Card = vue.defineComponent({
    name: name$10,
    props: {
      tag: String,
      num: numericProp,
      desc: String,
      thumb: String,
      title: String,
      price: numericProp,
      centered: Boolean,
      lazyLoad: Boolean,
      currency: makeStringProp("\xA5"),
      thumbLink: String,
      originPrice: numericProp
    },
    emits: ["click-thumb"],
    setup(props2, {
      slots,
      emit
    }) {
      var renderTitle = () => {
        if (slots.title) {
          return slots.title();
        }
        if (props2.title) {
          return vue.createVNode("div", {
            "class": [bem$$("title"), "van-multi-ellipsis--l2"]
          }, [props2.title]);
        }
      };
      var renderThumbTag = () => {
        if (slots.tag || props2.tag) {
          return vue.createVNode("div", {
            "class": bem$$("tag")
          }, [slots.tag ? slots.tag() : vue.createVNode(Tag, {
            "mark": true,
            "type": "danger"
          }, {
            default: () => [props2.tag]
          })]);
        }
      };
      var renderThumbImage = () => {
        if (slots.thumb) {
          return slots.thumb();
        }
        return vue.createVNode(Image$1, {
          "src": props2.thumb,
          "fit": "cover",
          "width": "100%",
          "height": "100%",
          "lazyLoad": props2.lazyLoad
        }, null);
      };
      var renderThumb = () => {
        if (slots.thumb || props2.thumb) {
          return vue.createVNode("a", {
            "href": props2.thumbLink,
            "class": bem$$("thumb"),
            "onClick": (event) => emit("click-thumb", event)
          }, [renderThumbImage(), renderThumbTag()]);
        }
      };
      var renderDesc = () => {
        if (slots.desc) {
          return slots.desc();
        }
        if (props2.desc) {
          return vue.createVNode("div", {
            "class": [bem$$("desc"), "van-ellipsis"]
          }, [props2.desc]);
        }
      };
      var renderPriceText = () => {
        var priceArr = props2.price.toString().split(".");
        return vue.createVNode("div", null, [vue.createVNode("span", {
          "class": bem$$("price-currency")
        }, [props2.currency]), vue.createVNode("span", {
          "class": bem$$("price-integer")
        }, [priceArr[0]]), vue.createTextVNode("."), vue.createVNode("span", {
          "class": bem$$("price-decimal")
        }, [priceArr[1]])]);
      };
      return () => {
        var _slots$priceTop;
        var showNum = slots.num || isDef(props2.num);
        var showPrice = slots.price || isDef(props2.price);
        var showOriginPrice = slots["origin-price"] || isDef(props2.originPrice);
        var showBottom = showNum || showPrice || showOriginPrice || slots.bottom;
        var Price = showPrice && vue.createVNode("div", {
          "class": bem$$("price")
        }, [slots.price ? slots.price() : renderPriceText()]);
        var OriginPrice = showOriginPrice && vue.createVNode("div", {
          "class": bem$$("origin-price")
        }, [slots["origin-price"] ? slots["origin-price"]() : props2.currency + " " + props2.originPrice]);
        var Num = showNum && vue.createVNode("div", {
          "class": bem$$("num")
        }, [slots.num ? slots.num() : "x" + props2.num]);
        var Footer = slots.footer && vue.createVNode("div", {
          "class": bem$$("footer")
        }, [slots.footer()]);
        var Bottom = showBottom && vue.createVNode("div", {
          "class": bem$$("bottom")
        }, [(_slots$priceTop = slots["price-top"]) == null ? void 0 : _slots$priceTop.call(slots), Price, OriginPrice, Num, slots.bottom == null ? void 0 : slots.bottom()]);
        return vue.createVNode("div", {
          "class": bem$$()
        }, [vue.createVNode("div", {
          "class": bem$$("header")
        }, [renderThumb(), vue.createVNode("div", {
          "class": bem$$("content", {
            centered: props2.centered
          })
        }, [vue.createVNode("div", null, [renderTitle(), renderDesc(), slots.tags == null ? void 0 : slots.tags()]), Bottom])]), Footer]);
      };
    }
  });
  var Card = withInstall(_Card);
  function scrollLeftTo(scroller, to, duration) {
    var count = 0;
    var from = scroller.scrollLeft;
    var frames = duration === 0 ? 1 : Math.round(duration * 1e3 / 16);
    function animate() {
      scroller.scrollLeft += (to - from) / frames;
      if (++count < frames) {
        raf(animate);
      }
    }
    animate();
  }
  function scrollTopTo(scroller, to, duration, callback) {
    var current = getScrollTop(scroller);
    var isDown = current < to;
    var frames = duration === 0 ? 1 : Math.round(duration * 1e3 / 16);
    var step = (to - current) / frames;
    function animate() {
      current += step;
      if (isDown && current > to || !isDown && current < to) {
        current = to;
      }
      setScrollTop(scroller, current);
      if (isDown && current < to || !isDown && current > to) {
        raf(animate);
      } else if (callback) {
        raf(callback);
      }
    }
    animate();
  }
  function useVisibilityChange(target, onChange) {
    if (!inBrowser$1 || !window.IntersectionObserver) {
      return;
    }
    var observer = new IntersectionObserver((entries) => {
      onChange(entries[0].intersectionRatio > 0);
    }, {
      root: document.body
    });
    var observe = () => {
      if (target.value) {
        observer.observe(target.value);
      }
    };
    var unobserve = () => {
      if (target.value) {
        observer.unobserve(target.value);
      }
    };
    vue.onDeactivated(unobserve);
    vue.onBeforeUnmount(unobserve);
    onMountedOrActivated(observe);
  }
  var [name$$, bem$_] = createNamespace("sticky");
  var _Sticky = vue.defineComponent({
    name: name$$,
    props: {
      zIndex: numericProp,
      position: makeStringProp("top"),
      container: Object,
      offsetTop: makeNumericProp(0),
      offsetBottom: makeNumericProp(0)
    },
    emits: ["scroll", "change"],
    setup(props2, {
      emit,
      slots
    }) {
      var root = vue.ref();
      var scrollParent = useScrollParent(root);
      var state = vue.reactive({
        fixed: false,
        width: 0,
        height: 0,
        transform: 0
      });
      var offset2 = vue.computed(() => unitToPx(props2.position === "top" ? props2.offsetTop : props2.offsetBottom));
      var rootStyle = vue.computed(() => {
        var {
          fixed,
          height,
          width
        } = state;
        if (fixed) {
          return {
            width: width + "px",
            height: height + "px"
          };
        }
      });
      var stickyStyle = vue.computed(() => {
        if (!state.fixed) {
          return;
        }
        var style = extend(getZIndexStyle(props2.zIndex), {
          width: state.width + "px",
          height: state.height + "px",
          [props2.position]: offset2.value + "px"
        });
        if (state.transform) {
          style.transform = "translate3d(0, " + state.transform + "px, 0)";
        }
        return style;
      });
      var emitScroll = (scrollTop) => emit("scroll", {
        scrollTop,
        isFixed: state.fixed
      });
      var onScroll = () => {
        if (!root.value || isHidden(root)) {
          return;
        }
        var {
          container,
          position
        } = props2;
        var rootRect = useRect(root);
        var scrollTop = getScrollTop(window);
        state.width = rootRect.width;
        state.height = rootRect.height;
        if (position === "top") {
          if (container) {
            var containerRect = useRect(container);
            var difference = containerRect.bottom - offset2.value - state.height;
            state.fixed = offset2.value > rootRect.top && containerRect.bottom > 0;
            state.transform = difference < 0 ? difference : 0;
          } else {
            state.fixed = offset2.value > rootRect.top;
          }
        } else {
          var {
            clientHeight
          } = document.documentElement;
          if (container) {
            var _containerRect = useRect(container);
            var _difference = clientHeight - _containerRect.top - offset2.value - state.height;
            state.fixed = clientHeight - offset2.value < rootRect.bottom && clientHeight > _containerRect.top;
            state.transform = _difference < 0 ? -_difference : 0;
          } else {
            state.fixed = clientHeight - offset2.value < rootRect.bottom;
          }
        }
        emitScroll(scrollTop);
      };
      vue.watch(() => state.fixed, (value) => emit("change", value));
      useEventListener("scroll", onScroll, {
        target: scrollParent
      });
      useVisibilityChange(root, onScroll);
      return () => vue.createVNode("div", {
        "ref": root,
        "style": rootStyle.value
      }, [vue.createVNode("div", {
        "class": bem$_({
          fixed: state.fixed
        }),
        "style": stickyStyle.value
      }, [slots.default == null ? void 0 : slots.default()])]);
    }
  });
  var Sticky = withInstall(_Sticky);
  var [name$_, bem$Z] = createNamespace("tab");
  var TabsTitle = vue.defineComponent({
    name: name$_,
    props: {
      dot: Boolean,
      type: String,
      color: String,
      title: String,
      badge: numericProp,
      isActive: Boolean,
      disabled: Boolean,
      scrollable: Boolean,
      activeColor: String,
      renderTitle: Function,
      inactiveColor: String,
      showZeroBadge: truthProp
    },
    setup(props2) {
      var style = vue.computed(() => {
        var style2 = {};
        var {
          type,
          color,
          disabled,
          isActive,
          activeColor,
          inactiveColor
        } = props2;
        var isCard = type === "card";
        if (color && isCard) {
          style2.borderColor = color;
          if (!disabled) {
            if (isActive) {
              style2.backgroundColor = color;
            } else {
              style2.color = color;
            }
          }
        }
        var titleColor = isActive ? activeColor : inactiveColor;
        if (titleColor) {
          style2.color = titleColor;
        }
        return style2;
      });
      var renderText = () => {
        var Text = vue.createVNode("span", {
          "class": bem$Z("text", {
            ellipsis: !props2.scrollable
          })
        }, [props2.renderTitle ? props2.renderTitle() : props2.title]);
        if (props2.dot || isDef(props2.badge) && props2.badge !== "") {
          return vue.createVNode(Badge, {
            "dot": props2.dot,
            "content": props2.badge,
            "showZero": props2.showZeroBadge
          }, {
            default: () => [Text]
          });
        }
        return Text;
      };
      return () => vue.createVNode("div", {
        "role": "tab",
        "class": [bem$Z({
          active: props2.isActive,
          disabled: props2.disabled
        })],
        "style": style.value,
        "aria-selected": props2.isActive
      }, [renderText()]);
    }
  });
  var [name$Z, bem$Y] = createNamespace("swipe");
  var props$l = {
    loop: truthProp,
    width: numericProp,
    height: numericProp,
    vertical: Boolean,
    autoplay: makeNumericProp(0),
    duration: makeNumericProp(500),
    touchable: truthProp,
    lazyRender: Boolean,
    initialSwipe: makeNumericProp(0),
    indicatorColor: String,
    showIndicators: truthProp,
    stopPropagation: truthProp
  };
  var SWIPE_KEY = Symbol(name$Z);
  var _Swipe = vue.defineComponent({
    name: name$Z,
    props: props$l,
    emits: ["change"],
    setup(props2, {
      emit,
      slots
    }) {
      var root = vue.ref();
      var state = vue.reactive({
        rect: null,
        width: 0,
        height: 0,
        offset: 0,
        active: 0,
        swiping: false
      });
      var touch = useTouch();
      var windowSize = useWindowSize();
      var {
        children,
        linkChildren
      } = useChildren(SWIPE_KEY);
      var count = vue.computed(() => children.length);
      var size = vue.computed(() => state[props2.vertical ? "height" : "width"]);
      var delta = vue.computed(() => props2.vertical ? touch.deltaY.value : touch.deltaX.value);
      var minOffset = vue.computed(() => {
        if (state.rect) {
          var base = props2.vertical ? state.rect.height : state.rect.width;
          return base - size.value * count.value;
        }
        return 0;
      });
      var maxCount = vue.computed(() => Math.ceil(Math.abs(minOffset.value) / size.value));
      var trackSize = vue.computed(() => count.value * size.value);
      var activeIndicator = vue.computed(() => (state.active + count.value) % count.value);
      var isCorrectDirection = vue.computed(() => {
        var expect = props2.vertical ? "vertical" : "horizontal";
        return touch.direction.value === expect;
      });
      var trackStyle = vue.computed(() => {
        var style = {
          transitionDuration: (state.swiping ? 0 : props2.duration) + "ms",
          transform: "translate" + (props2.vertical ? "Y" : "X") + "(" + state.offset + "px)"
        };
        if (size.value) {
          var mainAxis = props2.vertical ? "height" : "width";
          var crossAxis = props2.vertical ? "width" : "height";
          style[mainAxis] = trackSize.value + "px";
          style[crossAxis] = props2[crossAxis] ? props2[crossAxis] + "px" : "";
        }
        return style;
      });
      var getTargetActive = (pace) => {
        var {
          active
        } = state;
        if (pace) {
          if (props2.loop) {
            return clamp(active + pace, -1, count.value);
          }
          return clamp(active + pace, 0, maxCount.value);
        }
        return active;
      };
      var getTargetOffset = (targetActive, offset2 = 0) => {
        var currentPosition = targetActive * size.value;
        if (!props2.loop) {
          currentPosition = Math.min(currentPosition, -minOffset.value);
        }
        var targetOffset = offset2 - currentPosition;
        if (!props2.loop) {
          targetOffset = clamp(targetOffset, minOffset.value, 0);
        }
        return targetOffset;
      };
      var move = ({
        pace = 0,
        offset: offset2 = 0,
        emitChange
      }) => {
        if (count.value <= 1) {
          return;
        }
        var {
          active
        } = state;
        var targetActive = getTargetActive(pace);
        var targetOffset = getTargetOffset(targetActive, offset2);
        if (props2.loop) {
          if (children[0] && targetOffset !== minOffset.value) {
            var outRightBound = targetOffset < minOffset.value;
            children[0].setOffset(outRightBound ? trackSize.value : 0);
          }
          if (children[count.value - 1] && targetOffset !== 0) {
            var outLeftBound = targetOffset > 0;
            children[count.value - 1].setOffset(outLeftBound ? -trackSize.value : 0);
          }
        }
        state.active = targetActive;
        state.offset = targetOffset;
        if (emitChange && targetActive !== active) {
          emit("change", activeIndicator.value);
        }
      };
      var correctPosition = () => {
        state.swiping = true;
        if (state.active <= -1) {
          move({
            pace: count.value
          });
        } else if (state.active >= count.value) {
          move({
            pace: -count.value
          });
        }
      };
      var prev = () => {
        correctPosition();
        touch.reset();
        doubleRaf(() => {
          state.swiping = false;
          move({
            pace: -1,
            emitChange: true
          });
        });
      };
      var next = () => {
        correctPosition();
        touch.reset();
        doubleRaf(() => {
          state.swiping = false;
          move({
            pace: 1,
            emitChange: true
          });
        });
      };
      var autoplayTimer;
      var stopAutoplay = () => clearTimeout(autoplayTimer);
      var autoplay = () => {
        stopAutoplay();
        if (props2.autoplay > 0 && count.value > 1) {
          autoplayTimer = setTimeout(() => {
            next();
            autoplay();
          }, +props2.autoplay);
        }
      };
      var initialize = (active = +props2.initialSwipe) => {
        if (!root.value) {
          return;
        }
        if (!isHidden(root)) {
          var _props$width, _props$height;
          var rect = {
            width: root.value.offsetWidth,
            height: root.value.offsetHeight
          };
          state.rect = rect;
          state.width = +((_props$width = props2.width) != null ? _props$width : rect.width);
          state.height = +((_props$height = props2.height) != null ? _props$height : rect.height);
        }
        if (count.value) {
          active = Math.min(count.value - 1, active);
        }
        state.active = active;
        state.swiping = true;
        state.offset = getTargetOffset(active);
        children.forEach((swipe) => {
          swipe.setOffset(0);
        });
        autoplay();
      };
      var resize = () => initialize(state.active);
      var touchStartTime;
      var onTouchStart = (event) => {
        if (!props2.touchable)
          return;
        touch.start(event);
        touchStartTime = Date.now();
        stopAutoplay();
        correctPosition();
      };
      var onTouchMove = (event) => {
        if (props2.touchable && state.swiping) {
          touch.move(event);
          if (isCorrectDirection.value) {
            preventDefault(event, props2.stopPropagation);
            move({
              offset: delta.value
            });
          }
        }
      };
      var onTouchEnd = () => {
        if (!props2.touchable || !state.swiping) {
          return;
        }
        var duration = Date.now() - touchStartTime;
        var speed = delta.value / duration;
        var shouldSwipe = Math.abs(speed) > 0.25 || Math.abs(delta.value) > size.value / 2;
        if (shouldSwipe && isCorrectDirection.value) {
          var offset2 = props2.vertical ? touch.offsetY.value : touch.offsetX.value;
          var pace = 0;
          if (props2.loop) {
            pace = offset2 > 0 ? delta.value > 0 ? -1 : 1 : 0;
          } else {
            pace = -Math[delta.value > 0 ? "ceil" : "floor"](delta.value / size.value);
          }
          move({
            pace,
            emitChange: true
          });
        } else if (delta.value) {
          move({
            pace: 0
          });
        }
        state.swiping = false;
        autoplay();
      };
      var swipeTo = (index2, options = {}) => {
        correctPosition();
        touch.reset();
        doubleRaf(() => {
          var targetIndex;
          if (props2.loop && index2 === count.value) {
            targetIndex = state.active === 0 ? 0 : index2;
          } else {
            targetIndex = index2 % count.value;
          }
          if (options.immediate) {
            doubleRaf(() => {
              state.swiping = false;
            });
          } else {
            state.swiping = false;
          }
          move({
            pace: targetIndex - state.active,
            emitChange: true
          });
        });
      };
      var renderDot = (_, index2) => {
        var active = index2 === activeIndicator.value;
        var style = active ? {
          backgroundColor: props2.indicatorColor
        } : void 0;
        return vue.createVNode("i", {
          "style": style,
          "class": bem$Y("indicator", {
            active
          })
        }, null);
      };
      var renderIndicator = () => {
        if (slots.indicator) {
          return slots.indicator({
            active: activeIndicator.value
          });
        }
        if (props2.showIndicators && count.value > 1) {
          return vue.createVNode("div", {
            "class": bem$Y("indicators", {
              vertical: props2.vertical
            })
          }, [Array(count.value).fill("").map(renderDot)]);
        }
      };
      useExpose({
        prev,
        next,
        state,
        resize,
        swipeTo
      });
      linkChildren({
        size,
        props: props2,
        count,
        activeIndicator
      });
      vue.watch(() => props2.initialSwipe, (value) => initialize(+value));
      vue.watch(count, () => initialize(state.active));
      vue.watch(() => props2.autoplay, autoplay);
      vue.watch([windowSize.width, windowSize.height], resize);
      vue.watch(usePageVisibility(), (visible) => {
        if (visible === "visible") {
          autoplay();
        } else {
          stopAutoplay();
        }
      });
      vue.onMounted(initialize);
      vue.onActivated(() => initialize(state.active));
      onPopupReopen(() => initialize(state.active));
      vue.onDeactivated(stopAutoplay);
      vue.onBeforeUnmount(stopAutoplay);
      return () => vue.createVNode("div", {
        "ref": root,
        "class": bem$Y()
      }, [vue.createVNode("div", {
        "style": trackStyle.value,
        "class": bem$Y("track", {
          vertical: props2.vertical
        }),
        "onTouchstart": onTouchStart,
        "onTouchmove": onTouchMove,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, [slots.default == null ? void 0 : slots.default()]), renderIndicator()]);
    }
  });
  var Swipe = withInstall(_Swipe);
  var [name$Y, bem$X] = createNamespace("tabs");
  var TabsContent = vue.defineComponent({
    name: name$Y,
    props: {
      count: makeRequiredProp(Number),
      inited: Boolean,
      animated: Boolean,
      duration: makeRequiredProp(numericProp),
      swipeable: Boolean,
      lazyRender: Boolean,
      currentIndex: makeRequiredProp(Number)
    },
    emits: ["change"],
    setup(props2, {
      emit,
      slots
    }) {
      var swipeRef = vue.ref();
      var onChange = (index2) => emit("change", index2);
      var renderChildren = () => {
        var Content = slots.default == null ? void 0 : slots.default();
        if (props2.animated || props2.swipeable) {
          return vue.createVNode(Swipe, {
            "ref": swipeRef,
            "loop": false,
            "class": bem$X("track"),
            "duration": +props2.duration * 1e3,
            "touchable": props2.swipeable,
            "lazyRender": props2.lazyRender,
            "showIndicators": false,
            "onChange": onChange
          }, {
            default: () => [Content]
          });
        }
        return Content;
      };
      var swipeToCurrentTab = (index2) => {
        var swipe = swipeRef.value;
        if (swipe && swipe.state.active !== index2) {
          swipe.swipeTo(index2, {
            immediate: !props2.inited
          });
        }
      };
      vue.watch(() => props2.currentIndex, swipeToCurrentTab);
      vue.onMounted(() => {
        swipeToCurrentTab(props2.currentIndex);
      });
      return () => vue.createVNode("div", {
        "class": bem$X("content", {
          animated: props2.animated || props2.swipeable
        })
      }, [renderChildren()]);
    }
  });
  var [name$X, bem$W] = createNamespace("tabs");
  var props$k = {
    type: makeStringProp("line"),
    color: String,
    border: Boolean,
    sticky: Boolean,
    active: makeNumericProp(0),
    duration: makeNumericProp(0.3),
    animated: Boolean,
    ellipsis: truthProp,
    swipeable: Boolean,
    scrollspy: Boolean,
    offsetTop: makeNumericProp(0),
    background: String,
    lazyRender: truthProp,
    lineWidth: numericProp,
    lineHeight: numericProp,
    beforeChange: Function,
    swipeThreshold: makeNumericProp(5),
    titleActiveColor: String,
    titleInactiveColor: String
  };
  var TABS_KEY = Symbol(name$X);
  var _Tabs = vue.defineComponent({
    name: name$X,
    props: props$k,
    emits: ["click", "change", "scroll", "disabled", "rendered", "click-tab", "update:active"],
    setup(props2, {
      emit,
      slots
    }) {
      var tabHeight;
      var lockScroll;
      var stickyFixed;
      var root = vue.ref();
      var navRef = vue.ref();
      var wrapRef = vue.ref();
      var windowSize = useWindowSize();
      var scroller = useScrollParent(root);
      var [titleRefs, setTitleRefs] = useRefs();
      var {
        children,
        linkChildren
      } = useChildren(TABS_KEY);
      var state = vue.reactive({
        inited: false,
        position: "",
        lineStyle: {},
        currentIndex: -1
      });
      var scrollable = vue.computed(() => children.length > props2.swipeThreshold || !props2.ellipsis);
      var navStyle = vue.computed(() => ({
        borderColor: props2.color,
        background: props2.background
      }));
      var getTabName = (tab, index2) => {
        var _tab$name;
        return (_tab$name = tab.name) != null ? _tab$name : index2;
      };
      var currentName = vue.computed(() => {
        var activeTab = children[state.currentIndex];
        if (activeTab) {
          return getTabName(activeTab, state.currentIndex);
        }
      });
      var offsetTopPx = vue.computed(() => unitToPx(props2.offsetTop));
      var scrollOffset = vue.computed(() => {
        if (props2.sticky) {
          return offsetTopPx.value + tabHeight;
        }
        return 0;
      });
      var scrollIntoView = (immediate) => {
        var nav = navRef.value;
        var titles = titleRefs.value;
        if (!scrollable.value || !nav || !titles || !titles[state.currentIndex]) {
          return;
        }
        var title = titles[state.currentIndex].$el;
        var to = title.offsetLeft - (nav.offsetWidth - title.offsetWidth) / 2;
        scrollLeftTo(nav, to, immediate ? 0 : +props2.duration);
      };
      var setLine = () => {
        var shouldAnimate = state.inited;
        vue.nextTick(() => {
          var titles = titleRefs.value;
          if (!titles || !titles[state.currentIndex] || props2.type !== "line" || isHidden(root.value)) {
            return;
          }
          var title = titles[state.currentIndex].$el;
          var {
            lineWidth,
            lineHeight
          } = props2;
          var left2 = title.offsetLeft + title.offsetWidth / 2;
          var lineStyle = {
            width: addUnit(lineWidth),
            backgroundColor: props2.color,
            transform: "translateX(" + left2 + "px) translateX(-50%)"
          };
          if (shouldAnimate) {
            lineStyle.transitionDuration = props2.duration + "s";
          }
          if (isDef(lineHeight)) {
            var height = addUnit(lineHeight);
            lineStyle.height = height;
            lineStyle.borderRadius = height;
          }
          state.lineStyle = lineStyle;
        });
      };
      var findAvailableTab = (index2) => {
        var diff = index2 < state.currentIndex ? -1 : 1;
        while (index2 >= 0 && index2 < children.length) {
          if (!children[index2].disabled) {
            return index2;
          }
          index2 += diff;
        }
      };
      var setCurrentIndex = (currentIndex) => {
        var newIndex = findAvailableTab(currentIndex);
        if (!isDef(newIndex)) {
          return;
        }
        var newTab = children[newIndex];
        var newName = getTabName(newTab, newIndex);
        var shouldEmitChange = state.currentIndex !== null;
        state.currentIndex = newIndex;
        if (newName !== props2.active) {
          emit("update:active", newName);
          if (shouldEmitChange) {
            emit("change", newName, newTab.title);
          }
        }
      };
      var setCurrentIndexByName = (name2) => {
        var matched = children.find((tab, index3) => getTabName(tab, index3) === name2);
        var index2 = matched ? children.indexOf(matched) : 0;
        setCurrentIndex(index2);
      };
      var scrollToCurrentContent = (immediate = false) => {
        if (props2.scrollspy) {
          var target = children[state.currentIndex].$el;
          if (target && scroller.value) {
            var to = getElementTop(target, scroller.value) - scrollOffset.value;
            lockScroll = true;
            scrollTopTo(scroller.value, to, immediate ? 0 : +props2.duration, () => {
              lockScroll = false;
            });
          }
        }
      };
      var onClickTab = (item, index2, event) => {
        var {
          title,
          disabled
        } = children[index2];
        var name2 = getTabName(children[index2], index2);
        emit("click-tab", {
          name: name2,
          title,
          event,
          disabled
        });
        if (disabled) {
          emit("disabled", name2, title);
        } else {
          callInterceptor(props2.beforeChange, {
            args: [name2],
            done: () => {
              setCurrentIndex(index2);
              scrollToCurrentContent();
            }
          });
          emit("click", name2, title);
          route(item);
        }
      };
      var onStickyScroll = (params) => {
        stickyFixed = params.isFixed;
        emit("scroll", params);
      };
      var scrollTo = (name2) => {
        vue.nextTick(() => {
          setCurrentIndexByName(name2);
          scrollToCurrentContent(true);
        });
      };
      var getCurrentIndexOnScroll = () => {
        for (var index2 = 0; index2 < children.length; index2++) {
          var {
            top: top2
          } = useRect(children[index2].$el);
          if (top2 > scrollOffset.value) {
            return index2 === 0 ? 0 : index2 - 1;
          }
        }
        return children.length - 1;
      };
      var onScroll = () => {
        if (props2.scrollspy && !lockScroll) {
          var index2 = getCurrentIndexOnScroll();
          setCurrentIndex(index2);
        }
      };
      var renderNav = () => children.map((item, index2) => vue.createVNode(TabsTitle, vue.mergeProps({
        "ref": setTitleRefs(index2),
        "type": props2.type,
        "color": props2.color,
        "style": item.titleStyle,
        "class": item.titleClass,
        "isActive": index2 === state.currentIndex,
        "scrollable": scrollable.value,
        "renderTitle": item.$slots.title,
        "activeColor": props2.titleActiveColor,
        "inactiveColor": props2.titleInactiveColor,
        "onClick": (event) => onClickTab(item, index2, event)
      }, pick(item, ["dot", "badge", "title", "disabled", "showZeroBadge"])), null));
      var renderHeader = () => {
        var _slots$navLeft, _slots$navRight;
        var {
          type,
          border
        } = props2;
        return vue.createVNode("div", {
          "ref": wrapRef,
          "class": [bem$W("wrap", {
            scrollable: scrollable.value
          }), {
            [BORDER_TOP_BOTTOM]: type === "line" && border
          }]
        }, [vue.createVNode("div", {
          "ref": navRef,
          "role": "tablist",
          "class": bem$W("nav", [type, {
            complete: scrollable.value
          }]),
          "style": navStyle.value
        }, [(_slots$navLeft = slots["nav-left"]) == null ? void 0 : _slots$navLeft.call(slots), renderNav(), type === "line" && vue.createVNode("div", {
          "class": bem$W("line"),
          "style": state.lineStyle
        }, null), (_slots$navRight = slots["nav-right"]) == null ? void 0 : _slots$navRight.call(slots)])]);
      };
      vue.watch([() => props2.color, windowSize.width], setLine);
      vue.watch(() => props2.active, (value) => {
        if (value !== currentName.value) {
          setCurrentIndexByName(value);
        }
      });
      vue.watch(() => children.length, () => {
        if (state.inited) {
          setCurrentIndexByName(props2.active);
          setLine();
          vue.nextTick(() => {
            scrollIntoView(true);
          });
        }
      });
      vue.watch(() => state.currentIndex, () => {
        scrollIntoView();
        setLine();
        if (stickyFixed && !props2.scrollspy) {
          setRootScrollTop(Math.ceil(getElementTop(root.value) - offsetTopPx.value));
        }
      });
      var init = () => {
        setCurrentIndexByName(props2.active);
        vue.nextTick(() => {
          state.inited = true;
          if (wrapRef.value) {
            tabHeight = useRect(wrapRef.value).height;
          }
          scrollIntoView(true);
        });
      };
      var onRendered = (name2, title) => emit("rendered", name2, title);
      useExpose({
        resize: setLine,
        scrollTo
      });
      vue.onActivated(setLine);
      onPopupReopen(setLine);
      onMountedOrActivated(init);
      useEventListener("scroll", onScroll, {
        target: scroller
      });
      linkChildren({
        props: props2,
        setLine,
        onRendered,
        currentName,
        scrollIntoView
      });
      return () => {
        var _slots$navBottom, _slots$navBottom2;
        return vue.createVNode("div", {
          "ref": root,
          "class": bem$W([props2.type])
        }, [props2.sticky ? vue.createVNode(Sticky, {
          "container": root.value,
          "offsetTop": offsetTopPx.value,
          "onScroll": onStickyScroll
        }, {
          default: () => [renderHeader(), (_slots$navBottom = slots["nav-bottom"]) == null ? void 0 : _slots$navBottom.call(slots)]
        }) : [renderHeader(), (_slots$navBottom2 = slots["nav-bottom"]) == null ? void 0 : _slots$navBottom2.call(slots)], vue.createVNode(TabsContent, {
          "count": children.length,
          "inited": state.inited,
          "animated": props2.animated,
          "duration": props2.duration,
          "swipeable": props2.swipeable,
          "lazyRender": props2.lazyRender,
          "currentIndex": state.currentIndex,
          "onChange": setCurrentIndex
        }, {
          default: () => [slots.default == null ? void 0 : slots.default()]
        })]);
      };
    }
  });
  var TAB_STATUS_KEY = Symbol();
  var useTabStatus = () => vue.inject(TAB_STATUS_KEY, null);
  var [name$W, bem$V] = createNamespace("swipe-item");
  var _SwipeItem = vue.defineComponent({
    name: name$W,
    setup(props2, {
      slots
    }) {
      var rendered;
      var state = vue.reactive({
        offset: 0,
        inited: false,
        mounted: false
      });
      var {
        parent,
        index: index2
      } = useParent(SWIPE_KEY);
      if (!parent) {
        return;
      }
      var style = vue.computed(() => {
        var style2 = {};
        var {
          vertical
        } = parent.props;
        if (parent.size.value) {
          style2[vertical ? "height" : "width"] = parent.size.value + "px";
        }
        if (state.offset) {
          style2.transform = "translate" + (vertical ? "Y" : "X") + "(" + state.offset + "px)";
        }
        return style2;
      });
      var shouldRender = vue.computed(() => {
        var {
          loop,
          lazyRender
        } = parent.props;
        if (!lazyRender || rendered) {
          return true;
        }
        if (!state.mounted) {
          return false;
        }
        var active = parent.activeIndicator.value;
        var maxActive = parent.count.value - 1;
        var prevActive = active === 0 && loop ? maxActive : active - 1;
        var nextActive = active === maxActive && loop ? 0 : active + 1;
        rendered = index2.value === active || index2.value === prevActive || index2.value === nextActive;
        return rendered;
      });
      var setOffset = (offset2) => {
        state.offset = offset2;
      };
      vue.onMounted(() => {
        vue.nextTick(() => {
          state.mounted = true;
        });
      });
      useExpose({
        setOffset
      });
      return () => vue.createVNode("div", {
        "class": bem$V(),
        "style": style.value
      }, [shouldRender.value ? slots.default == null ? void 0 : slots.default() : null]);
    }
  });
  var SwipeItem = withInstall(_SwipeItem);
  var [name$V, bem$U] = createNamespace("tab");
  var _Tab = vue.defineComponent({
    name: name$V,
    props: extend({}, routeProps, {
      dot: Boolean,
      name: numericProp,
      badge: numericProp,
      title: String,
      disabled: Boolean,
      titleClass: unknownProp,
      titleStyle: [String, Object],
      showZeroBadge: truthProp
    }),
    setup(props2, {
      slots
    }) {
      var inited = vue.ref(false);
      var {
        parent,
        index: index2
      } = useParent(TABS_KEY);
      if (!parent) {
        return;
      }
      var getName = () => {
        var _props$name;
        return (_props$name = props2.name) != null ? _props$name : index2.value;
      };
      var init = () => {
        inited.value = true;
        if (parent.props.lazyRender) {
          vue.nextTick(() => {
            parent.onRendered(getName(), props2.title);
          });
        }
      };
      var active = vue.computed(() => {
        var isActive = getName() === parent.currentName.value;
        if (isActive && !inited.value) {
          init();
        }
        return isActive;
      });
      vue.watch(() => props2.title, () => {
        parent.setLine();
        parent.scrollIntoView();
      });
      vue.provide(TAB_STATUS_KEY, active);
      return () => {
        var {
          animated,
          swipeable,
          scrollspy,
          lazyRender
        } = parent.props;
        if (!slots.default && !animated) {
          return;
        }
        var show = scrollspy || active.value;
        if (animated || swipeable) {
          return vue.createVNode(SwipeItem, {
            "role": "tabpanel",
            "aria-hidden": !active.value,
            "class": bem$U("pane-wrapper", {
              inactive: !active.value
            })
          }, {
            default: () => [vue.createVNode("div", {
              "class": bem$U("pane")
            }, [slots.default == null ? void 0 : slots.default()])]
          });
        }
        var shouldRender = inited.value || scrollspy || !lazyRender;
        var Content = shouldRender ? slots.default == null ? void 0 : slots.default() : null;
        return vue.withDirectives(vue.createVNode("div", {
          "role": "tabpanel",
          "class": bem$U("pane")
        }, [Content]), [[vue.vShow, show]]);
      };
    }
  });
  var Tab = withInstall(_Tab);
  var Tabs = withInstall(_Tabs);
  var [name$U, bem$T, t$d] = createNamespace("cascader");
  var props$j = {
    title: String,
    options: makeArrayProp(),
    closeable: truthProp,
    swipeable: truthProp,
    closeIcon: makeStringProp("cross"),
    modelValue: numericProp,
    fieldNames: Object,
    placeholder: String,
    activeColor: String
  };
  var _Cascader = vue.defineComponent({
    name: name$U,
    props: props$j,
    emits: ["close", "change", "finish", "click-tab", "update:modelValue"],
    setup(props2, {
      slots,
      emit
    }) {
      var tabs = vue.ref([]);
      var activeTab = vue.ref(0);
      var {
        text: textKey,
        value: valueKey,
        children: childrenKey
      } = extend({
        text: "text",
        value: "value",
        children: "children"
      }, props2.fieldNames);
      var getSelectedOptionsByValue = (options, value) => {
        for (var option of options) {
          if (option[valueKey] === value) {
            return [option];
          }
          if (option[childrenKey]) {
            var selectedOptions = getSelectedOptionsByValue(option[childrenKey], value);
            if (selectedOptions) {
              return [option, ...selectedOptions];
            }
          }
        }
      };
      var updateTabs = () => {
        var {
          options,
          modelValue
        } = props2;
        if (modelValue !== void 0) {
          var selectedOptions = getSelectedOptionsByValue(options, modelValue);
          if (selectedOptions) {
            var optionsCursor = options;
            tabs.value = selectedOptions.map((option) => {
              var tab = {
                options: optionsCursor,
                selected: option
              };
              var next = optionsCursor.find((item) => item[valueKey] === option[valueKey]);
              if (next) {
                optionsCursor = next[childrenKey];
              }
              return tab;
            });
            if (optionsCursor) {
              tabs.value.push({
                options: optionsCursor,
                selected: null
              });
            }
            vue.nextTick(() => {
              activeTab.value = tabs.value.length - 1;
            });
            return;
          }
        }
        tabs.value = [{
          options,
          selected: null
        }];
      };
      var onSelect = (option, tabIndex) => {
        if (option.disabled) {
          return;
        }
        tabs.value[tabIndex].selected = option;
        if (tabs.value.length > tabIndex + 1) {
          tabs.value = tabs.value.slice(0, tabIndex + 1);
        }
        if (option[childrenKey]) {
          var nextTab = {
            options: option[childrenKey],
            selected: null
          };
          if (tabs.value[tabIndex + 1]) {
            tabs.value[tabIndex + 1] = nextTab;
          } else {
            tabs.value.push(nextTab);
          }
          vue.nextTick(() => {
            activeTab.value++;
          });
        }
        var selectedOptions = tabs.value.map((tab) => tab.selected).filter(Boolean);
        emit("update:modelValue", option[valueKey]);
        var params = {
          value: option[valueKey],
          tabIndex,
          selectedOptions
        };
        emit("change", params);
        if (!option[childrenKey]) {
          emit("finish", params);
        }
      };
      var onClose = () => emit("close");
      var onClickTab = ({
        name: name2,
        title
      }) => emit("click-tab", name2, title);
      var renderHeader = () => vue.createVNode("div", {
        "class": bem$T("header")
      }, [vue.createVNode("h2", {
        "class": bem$T("title")
      }, [slots.title ? slots.title() : props2.title]), props2.closeable ? vue.createVNode(Icon, {
        "name": props2.closeIcon,
        "class": bem$T("close-icon"),
        "onClick": onClose
      }, null) : null]);
      var renderOption = (option, selectedOption, tabIndex) => {
        var selected = selectedOption && option[valueKey] === selectedOption[valueKey];
        var color = option.color || (selected ? props2.activeColor : void 0);
        var Text = slots.option ? slots.option({
          option,
          selected
        }) : vue.createVNode("span", null, [option[textKey]]);
        return vue.createVNode("li", {
          "class": [bem$T("option", {
            selected,
            disabled: option.disabled
          }), option.className],
          "style": {
            color
          },
          "onClick": () => onSelect(option, tabIndex)
        }, [Text, selected ? vue.createVNode(Icon, {
          "name": "success",
          "class": bem$T("selected-icon")
        }, null) : null]);
      };
      var renderOptions = (options, selectedOption, tabIndex) => vue.createVNode("ul", {
        "class": bem$T("options")
      }, [options.map((option) => renderOption(option, selectedOption, tabIndex))]);
      var renderTab = (tab, tabIndex) => {
        var {
          options,
          selected
        } = tab;
        var placeholder = props2.placeholder || t$d("select");
        var title = selected ? selected[textKey] : placeholder;
        return vue.createVNode(Tab, {
          "title": title,
          "titleClass": bem$T("tab", {
            unselected: !selected
          })
        }, {
          default: () => [renderOptions(options, selected, tabIndex)]
        });
      };
      var renderTabs = () => vue.createVNode(Tabs, {
        "active": activeTab.value,
        "onUpdate:active": ($event) => activeTab.value = $event,
        "animated": true,
        "class": bem$T("tabs"),
        "color": props2.activeColor,
        "swipeThreshold": 0,
        "swipeable": props2.swipeable,
        "onClick-tab": onClickTab
      }, {
        default: () => [tabs.value.map(renderTab)]
      });
      updateTabs();
      vue.watch(() => props2.options, updateTabs, {
        deep: true
      });
      vue.watch(() => props2.modelValue, (value) => {
        if (value !== void 0) {
          var values = tabs.value.map((tab) => {
            var _tab$selected;
            return (_tab$selected = tab.selected) == null ? void 0 : _tab$selected[valueKey];
          });
          if (values.includes(value)) {
            return;
          }
        }
        updateTabs();
      });
      return () => vue.createVNode("div", {
        "class": bem$T()
      }, [renderHeader(), renderTabs()]);
    }
  });
  var Cascader = withInstall(_Cascader);
  var [name$T, bem$S] = createNamespace("cell-group");
  var _CellGroup = vue.defineComponent({
    name: name$T,
    inheritAttrs: false,
    props: {
      title: String,
      inset: Boolean,
      border: truthProp
    },
    setup(props2, {
      slots,
      attrs
    }) {
      var renderGroup = () => vue.createVNode("div", vue.mergeProps({
        "class": [bem$S({
          inset: props2.inset
        }), {
          [BORDER_TOP_BOTTOM]: props2.border && !props2.inset
        }]
      }, attrs), [slots.default == null ? void 0 : slots.default()]);
      var renderTitle = () => vue.createVNode("div", {
        "class": bem$S("title", {
          inset: props2.inset
        })
      }, [slots.title ? slots.title() : props2.title]);
      return () => {
        if (props2.title || slots.title) {
          return vue.createVNode(vue.Fragment, null, [renderTitle(), renderGroup()]);
        }
        return renderGroup();
      };
    }
  });
  var CellGroup = withInstall(_CellGroup);
  var [name$S, bem$R] = createNamespace("checkbox-group");
  var props$i = {
    max: numericProp,
    disabled: Boolean,
    iconSize: numericProp,
    direction: String,
    modelValue: makeArrayProp(),
    checkedColor: String
  };
  var CHECKBOX_GROUP_KEY = Symbol(name$S);
  var _CheckboxGroup = vue.defineComponent({
    name: name$S,
    props: props$i,
    emits: ["change", "update:modelValue"],
    setup(props2, {
      emit,
      slots
    }) {
      var {
        children,
        linkChildren
      } = useChildren(CHECKBOX_GROUP_KEY);
      var updateValue = (value) => emit("update:modelValue", value);
      var toggleAll = (options = {}) => {
        if (typeof options === "boolean") {
          options = {
            checked: options
          };
        }
        var {
          checked,
          skipDisabled
        } = options;
        var checkedChildren = children.filter((item) => {
          if (!item.props.bindGroup) {
            return false;
          }
          if (item.props.disabled && skipDisabled) {
            return item.checked.value;
          }
          return checked != null ? checked : !item.checked.value;
        });
        var names = checkedChildren.map((item) => item.name);
        updateValue(names);
      };
      vue.watch(() => props2.modelValue, (value) => emit("change", value));
      useExpose({
        toggleAll
      });
      useCustomFieldValue(() => props2.modelValue);
      linkChildren({
        props: props2,
        updateValue
      });
      return () => vue.createVNode("div", {
        "class": bem$R([props2.direction])
      }, [slots.default == null ? void 0 : slots.default()]);
    }
  });
  var [name$R, bem$Q] = createNamespace("checkbox");
  var props$h = extend({}, checkerProps, {
    bindGroup: truthProp
  });
  var _Checkbox = vue.defineComponent({
    name: name$R,
    props: props$h,
    emits: ["change", "update:modelValue"],
    setup(props2, {
      emit,
      slots
    }) {
      var {
        parent
      } = useParent(CHECKBOX_GROUP_KEY);
      var setParentValue = (checked2) => {
        var {
          name: name2
        } = props2;
        var {
          max,
          modelValue
        } = parent.props;
        var value = modelValue.slice();
        if (checked2) {
          var overlimit = max && value.length >= max;
          if (!overlimit && !value.includes(name2)) {
            value.push(name2);
            if (props2.bindGroup) {
              parent.updateValue(value);
            }
          }
        } else {
          var index2 = value.indexOf(name2);
          if (index2 !== -1) {
            value.splice(index2, 1);
            if (props2.bindGroup) {
              parent.updateValue(value);
            }
          }
        }
      };
      var checked = vue.computed(() => {
        if (parent && props2.bindGroup) {
          return parent.props.modelValue.indexOf(props2.name) !== -1;
        }
        return !!props2.modelValue;
      });
      var toggle = (newValue = !checked.value) => {
        if (parent && props2.bindGroup) {
          setParentValue(newValue);
        } else {
          emit("update:modelValue", newValue);
        }
      };
      vue.watch(() => props2.modelValue, (value) => emit("change", value));
      useExpose({
        toggle,
        props: props2,
        checked
      });
      useCustomFieldValue(() => props2.modelValue);
      return () => vue.createVNode(Checker, vue.mergeProps({
        "bem": bem$Q,
        "role": "checkbox",
        "parent": parent,
        "checked": checked.value,
        "onToggle": toggle
      }, props2), pick(slots, ["default", "icon"]));
    }
  });
  var Checkbox = withInstall(_Checkbox);
  var CheckboxGroup = withInstall(_CheckboxGroup);
  var [name$Q, bem$P] = createNamespace("circle");
  var uid = 0;
  var format = (rate) => Math.min(Math.max(+rate, 0), 100);
  function getPath(clockwise, viewBoxSize) {
    var sweepFlag = clockwise ? 1 : 0;
    return "M " + viewBoxSize / 2 + " " + viewBoxSize / 2 + " m 0, -500 a 500, 500 0 1, " + sweepFlag + " 0, 1000 a 500, 500 0 1, " + sweepFlag + " 0, -1000";
  }
  var _Circle = vue.defineComponent({
    name: name$Q,
    props: {
      text: String,
      size: numericProp,
      fill: makeStringProp("none"),
      rate: makeNumericProp(100),
      speed: makeNumericProp(0),
      color: [String, Object],
      clockwise: truthProp,
      layerColor: String,
      currentRate: makeNumberProp(0),
      strokeWidth: makeNumericProp(40),
      strokeLinecap: String,
      startPosition: makeStringProp("top")
    },
    emits: ["update:currentRate"],
    setup(props2, {
      emit,
      slots
    }) {
      var id = "van-circle-" + uid++;
      var viewBoxSize = vue.computed(() => +props2.strokeWidth + 1e3);
      var path = vue.computed(() => getPath(props2.clockwise, viewBoxSize.value));
      var svgStyle = vue.computed(() => {
        var ROTATE_ANGLE_MAP = {
          top: 0,
          right: 90,
          bottom: 180,
          left: 270
        };
        var angleValue = ROTATE_ANGLE_MAP[props2.startPosition];
        if (angleValue) {
          return {
            transform: "rotate(" + angleValue + "deg)"
          };
        }
      });
      vue.watch(() => props2.rate, (rate) => {
        var rafId;
        var startTime = Date.now();
        var startRate = props2.currentRate;
        var endRate = format(rate);
        var duration = Math.abs((startRate - endRate) * 1e3 / +props2.speed);
        var animate = () => {
          var now = Date.now();
          var progress = Math.min((now - startTime) / duration, 1);
          var rate2 = progress * (endRate - startRate) + startRate;
          emit("update:currentRate", format(parseFloat(rate2.toFixed(1))));
          if (endRate > startRate ? rate2 < endRate : rate2 > endRate) {
            rafId = raf(animate);
          }
        };
        if (props2.speed) {
          if (rafId) {
            cancelRaf(rafId);
          }
          rafId = raf(animate);
        } else {
          emit("update:currentRate", endRate);
        }
      }, {
        immediate: true
      });
      var renderHover = () => {
        var PERIMETER = 3140;
        var {
          strokeWidth,
          currentRate,
          strokeLinecap
        } = props2;
        var offset2 = PERIMETER * currentRate / 100;
        var color = isObject$1(props2.color) ? "url(#" + id + ")" : props2.color;
        var style = {
          stroke: color,
          strokeWidth: +strokeWidth + 1 + "px",
          strokeLinecap,
          strokeDasharray: offset2 + "px " + PERIMETER + "px"
        };
        return vue.createVNode("path", {
          "d": path.value,
          "style": style,
          "class": bem$P("hover"),
          "stroke": color
        }, null);
      };
      var renderLayer = () => {
        var style = {
          fill: props2.fill,
          stroke: props2.layerColor,
          strokeWidth: props2.strokeWidth + "px"
        };
        return vue.createVNode("path", {
          "class": bem$P("layer"),
          "style": style,
          "d": path.value
        }, null);
      };
      var renderGradient = () => {
        var {
          color
        } = props2;
        if (!isObject$1(color)) {
          return;
        }
        var Stops = Object.keys(color).sort((a, b) => parseFloat(a) - parseFloat(b)).map((key, index2) => vue.createVNode("stop", {
          "key": index2,
          "offset": key,
          "stop-color": color[key]
        }, null));
        return vue.createVNode("defs", null, [vue.createVNode("linearGradient", {
          "id": id,
          "x1": "100%",
          "y1": "0%",
          "x2": "0%",
          "y2": "0%"
        }, [Stops])]);
      };
      var renderText = () => {
        if (slots.default) {
          return slots.default();
        }
        if (props2.text) {
          return vue.createVNode("div", {
            "class": bem$P("text")
          }, [props2.text]);
        }
      };
      return () => vue.createVNode("div", {
        "class": bem$P(),
        "style": getSizeStyle(props2.size)
      }, [vue.createVNode("svg", {
        "viewBox": "0 0 " + viewBoxSize.value + " " + viewBoxSize.value,
        "style": svgStyle.value
      }, [renderGradient(), renderLayer(), renderHover()]), renderText()]);
    }
  });
  var Circle = withInstall(_Circle);
  var [name$P, bem$O] = createNamespace("row");
  var ROW_KEY = Symbol(name$P);
  var _Row = vue.defineComponent({
    name: name$P,
    props: {
      tag: makeStringProp("div"),
      wrap: truthProp,
      align: String,
      gutter: makeNumericProp(0),
      justify: String
    },
    setup(props2, {
      slots
    }) {
      var {
        children,
        linkChildren
      } = useChildren(ROW_KEY);
      var groups = vue.computed(() => {
        var groups2 = [[]];
        var totalSpan = 0;
        children.forEach((child, index2) => {
          totalSpan += Number(child.span);
          if (totalSpan > 24) {
            groups2.push([index2]);
            totalSpan -= 24;
          } else {
            groups2[groups2.length - 1].push(index2);
          }
        });
        return groups2;
      });
      var spaces = vue.computed(() => {
        var gutter = Number(props2.gutter);
        var spaces2 = [];
        if (!gutter) {
          return spaces2;
        }
        groups.value.forEach((group) => {
          var averagePadding = gutter * (group.length - 1) / group.length;
          group.forEach((item, index2) => {
            if (index2 === 0) {
              spaces2.push({
                right: averagePadding
              });
            } else {
              var left2 = gutter - spaces2[item - 1].right;
              var right2 = averagePadding - left2;
              spaces2.push({
                left: left2,
                right: right2
              });
            }
          });
        });
        return spaces2;
      });
      linkChildren({
        spaces
      });
      return () => {
        var {
          tag,
          wrap,
          align,
          justify
        } = props2;
        return vue.createVNode(tag, {
          "class": bem$O({
            ["align-" + align]: align,
            ["justify-" + justify]: justify,
            nowrap: !wrap
          })
        }, {
          default: () => [slots.default == null ? void 0 : slots.default()]
        });
      };
    }
  });
  var [name$O, bem$N] = createNamespace("col");
  var _Col = vue.defineComponent({
    name: name$O,
    props: {
      tag: makeStringProp("div"),
      span: makeNumericProp(0),
      offset: numericProp
    },
    setup(props2, {
      slots
    }) {
      var {
        parent,
        index: index2
      } = useParent(ROW_KEY);
      var style = vue.computed(() => {
        if (!parent) {
          return;
        }
        var {
          spaces
        } = parent;
        if (spaces && spaces.value && spaces.value[index2.value]) {
          var {
            left: left2,
            right: right2
          } = spaces.value[index2.value];
          return {
            paddingLeft: left2 ? left2 + "px" : null,
            paddingRight: right2 ? right2 + "px" : null
          };
        }
      });
      return () => {
        var {
          tag,
          span,
          offset: offset2
        } = props2;
        return vue.createVNode(tag, {
          "style": style.value,
          "class": bem$N({
            [span]: span,
            ["offset-" + offset2]: offset2
          })
        }, {
          default: () => [slots.default == null ? void 0 : slots.default()]
        });
      };
    }
  });
  var Col = withInstall(_Col);
  var [name$N, bem$M] = createNamespace("collapse");
  var COLLAPSE_KEY = Symbol(name$N);
  var _Collapse = vue.defineComponent({
    name: name$N,
    props: {
      border: truthProp,
      accordion: Boolean,
      modelValue: {
        type: [String, Number, Array],
        default: ""
      }
    },
    emits: ["change", "update:modelValue"],
    setup(props2, {
      emit,
      slots
    }) {
      var {
        linkChildren
      } = useChildren(COLLAPSE_KEY);
      var updateName = (name2) => {
        emit("change", name2);
        emit("update:modelValue", name2);
      };
      var toggle = (name2, expanded) => {
        var {
          accordion,
          modelValue
        } = props2;
        if (accordion) {
          updateName(name2 === modelValue ? "" : name2);
        } else if (expanded) {
          updateName(modelValue.concat(name2));
        } else {
          updateName(modelValue.filter((activeName) => activeName !== name2));
        }
      };
      var isExpanded = (name2) => {
        var {
          accordion,
          modelValue
        } = props2;
        return accordion ? modelValue === name2 : modelValue.includes(name2);
      };
      linkChildren({
        toggle,
        isExpanded
      });
      return () => vue.createVNode("div", {
        "class": [bem$M(), {
          [BORDER_TOP_BOTTOM]: props2.border
        }]
      }, [slots.default == null ? void 0 : slots.default()]);
    }
  });
  var Collapse = withInstall(_Collapse);
  var [name$M, bem$L] = createNamespace("collapse-item");
  var CELL_SLOTS = ["icon", "title", "value", "label", "right-icon"];
  var props$g = extend({}, cellProps, {
    name: numericProp,
    isLink: truthProp,
    disabled: Boolean,
    readonly: Boolean
  });
  var _CollapseItem = vue.defineComponent({
    name: name$M,
    props: props$g,
    setup(props2, {
      slots
    }) {
      var wrapperRef = vue.ref();
      var contentRef = vue.ref();
      var {
        parent,
        index: index2
      } = useParent(COLLAPSE_KEY);
      if (!parent) {
        return;
      }
      var name2 = vue.computed(() => {
        var _props$name;
        return (_props$name = props2.name) != null ? _props$name : index2.value;
      });
      var expanded = vue.computed(() => parent.isExpanded(name2.value));
      var show = vue.ref(expanded.value);
      var lazyRender = useLazyRender(show);
      var onTransitionEnd = () => {
        if (!expanded.value) {
          show.value = false;
        } else if (wrapperRef.value) {
          wrapperRef.value.style.height = "";
        }
      };
      vue.watch(expanded, (value, oldValue) => {
        if (oldValue === null) {
          return;
        }
        if (value) {
          show.value = true;
        }
        var tick = value ? vue.nextTick : raf;
        tick(() => {
          if (!contentRef.value || !wrapperRef.value) {
            return;
          }
          var {
            offsetHeight
          } = contentRef.value;
          if (offsetHeight) {
            var contentHeight = offsetHeight + "px";
            wrapperRef.value.style.height = value ? "0" : contentHeight;
            doubleRaf(() => {
              if (wrapperRef.value) {
                wrapperRef.value.style.height = value ? contentHeight : "0";
              }
            });
          } else {
            onTransitionEnd();
          }
        });
      });
      var toggle = (newValue = !expanded.value) => {
        parent.toggle(name2.value, newValue);
      };
      var onClickTitle = () => {
        if (!props2.disabled && !props2.readonly) {
          toggle();
        }
      };
      var renderTitle = () => {
        var {
          border,
          disabled,
          readonly
        } = props2;
        var attrs = pick(props2, Object.keys(cellProps));
        if (readonly) {
          attrs.isLink = false;
        }
        if (disabled || readonly) {
          attrs.clickable = false;
        }
        return vue.createVNode(Cell, vue.mergeProps({
          "role": "button",
          "class": bem$L("title", {
            disabled,
            expanded: expanded.value,
            borderless: !border
          }),
          "aria-expanded": String(expanded.value),
          "onClick": onClickTitle
        }, attrs), pick(slots, CELL_SLOTS));
      };
      var renderContent = lazyRender(() => vue.withDirectives(vue.createVNode("div", {
        "ref": wrapperRef,
        "class": bem$L("wrapper"),
        "onTransitionend": onTransitionEnd
      }, [vue.createVNode("div", {
        "ref": contentRef,
        "class": bem$L("content")
      }, [slots.default == null ? void 0 : slots.default()])]), [[vue.vShow, show.value]]));
      useExpose({
        toggle
      });
      return () => vue.createVNode("div", {
        "class": [bem$L({
          border: index2.value && props2.border
        })]
      }, [renderTitle(), renderContent()]);
    }
  });
  var CollapseItem = withInstall(_CollapseItem);
  var ConfigProvider = withInstall(_ConfigProvider);
  var [name$L, bem$K, t$c] = createNamespace("contact-card");
  var _ContactCard = vue.defineComponent({
    name: name$L,
    props: {
      tel: String,
      name: String,
      type: makeStringProp("add"),
      addText: String,
      editable: truthProp
    },
    emits: ["click"],
    setup(props2, {
      emit
    }) {
      var onClick = (event) => {
        if (props2.editable) {
          emit("click", event);
        }
      };
      var renderContent = () => {
        if (props2.type === "add") {
          return props2.addText || t$c("addText");
        }
        return [vue.createVNode("div", null, [t$c("name") + "\uFF1A" + props2.name]), vue.createVNode("div", null, [t$c("tel") + "\uFF1A" + props2.tel])];
      };
      return () => vue.createVNode(Cell, {
        "center": true,
        "icon": props2.type === "edit" ? "contact" : "add-square",
        "class": bem$K([props2.type]),
        "border": false,
        "isLink": props2.editable,
        "valueClass": bem$K("value"),
        "onClick": onClick
      }, {
        value: renderContent
      });
    }
  });
  var ContactCard = withInstall(_ContactCard);
  var [name$K, bem$J] = createNamespace("form");
  var props$f = {
    colon: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    showError: Boolean,
    labelWidth: numericProp,
    labelAlign: String,
    inputAlign: String,
    scrollToError: Boolean,
    validateFirst: Boolean,
    submitOnEnter: truthProp,
    validateTrigger: makeStringProp("onBlur"),
    showErrorMessage: truthProp,
    errorMessageAlign: String
  };
  var _Form = vue.defineComponent({
    name: name$K,
    props: props$f,
    emits: ["submit", "failed"],
    setup(props2, {
      emit,
      slots
    }) {
      var {
        children,
        linkChildren
      } = useChildren(FORM_KEY);
      var getFieldsByNames = (names) => {
        if (names) {
          return children.filter((field) => names.includes(field.name));
        }
        return children;
      };
      var validateSeq = (names) => new Promise((resolve, reject) => {
        var errors = [];
        var fields = getFieldsByNames(names);
        fields.reduce((promise, field) => promise.then(() => {
          if (!errors.length) {
            return field.validate().then((error) => {
              if (error) {
                errors.push(error);
              }
            });
          }
        }), Promise.resolve()).then(() => {
          if (errors.length) {
            reject(errors);
          } else {
            resolve();
          }
        });
      });
      var validateAll = (names) => new Promise((resolve, reject) => {
        var fields = getFieldsByNames(names);
        Promise.all(fields.map((item) => item.validate())).then((errors) => {
          errors = errors.filter(Boolean);
          if (errors.length) {
            reject(errors);
          } else {
            resolve();
          }
        });
      });
      var validateField = (name2) => {
        var matched = children.find((item) => item.name === name2);
        if (matched) {
          return new Promise((resolve, reject) => {
            matched.validate().then((error) => {
              if (error) {
                reject(error);
              } else {
                resolve();
              }
            });
          });
        }
        return Promise.reject();
      };
      var validate = (name2) => {
        if (typeof name2 === "string") {
          return validateField(name2);
        }
        return props2.validateFirst ? validateSeq(name2) : validateAll(name2);
      };
      var resetValidation = (name2) => {
        if (typeof name2 === "string") {
          name2 = [name2];
        }
        var fields = getFieldsByNames(name2);
        fields.forEach((item) => {
          item.resetValidation();
        });
      };
      var scrollToField = (name2, options) => {
        children.some((item) => {
          if (item.name === name2) {
            item.$el.scrollIntoView(options);
            return true;
          }
          return false;
        });
      };
      var getValues = () => children.reduce((form, field) => {
        form[field.name] = field.formValue.value;
        return form;
      }, {});
      var submit = () => {
        var values = getValues();
        validate().then(() => emit("submit", values)).catch((errors) => {
          emit("failed", {
            values,
            errors
          });
          if (props2.scrollToError && errors[0].name) {
            scrollToField(errors[0].name);
          }
        });
      };
      var onSubmit = (event) => {
        event.preventDefault();
        submit();
      };
      linkChildren({
        props: props2
      });
      useExpose({
        submit,
        validate,
        scrollToField,
        resetValidation
      });
      return () => vue.createVNode("form", {
        "class": bem$J(),
        "onSubmit": onSubmit
      }, [slots.default == null ? void 0 : slots.default()]);
    }
  });
  var Form = withInstall(_Form);
  var [name$J, bem$I, t$b] = createNamespace("contact-edit");
  var DEFAULT_CONTACT = {
    tel: "",
    name: ""
  };
  var _ContactEdit = vue.defineComponent({
    name: name$J,
    props: {
      isEdit: Boolean,
      isSaving: Boolean,
      isDeleting: Boolean,
      showSetDefault: Boolean,
      setDefaultLabel: String,
      contactInfo: {
        type: Object,
        default: () => extend({}, DEFAULT_CONTACT)
      },
      telValidator: {
        type: Function,
        default: isMobile
      }
    },
    emits: ["save", "delete", "change-default"],
    setup(props2, {
      emit
    }) {
      var contact = vue.reactive(extend({}, DEFAULT_CONTACT, props2.contactInfo));
      var onSave = () => {
        if (!props2.isSaving) {
          emit("save", contact);
        }
      };
      var onDelete = () => emit("delete", contact);
      var renderButtons = () => vue.createVNode("div", {
        "class": bem$I("buttons")
      }, [vue.createVNode(Button, {
        "block": true,
        "round": true,
        "type": "danger",
        "text": t$b("save"),
        "class": bem$I("button"),
        "loading": props2.isSaving,
        "nativeType": "submit"
      }, null), props2.isEdit && vue.createVNode(Button, {
        "block": true,
        "round": true,
        "text": t$b("delete"),
        "class": bem$I("button"),
        "loading": props2.isDeleting,
        "onClick": onDelete
      }, null)]);
      var renderSwitch = () => vue.createVNode(Switch, {
        "modelValue": contact.isDefault,
        "onUpdate:modelValue": ($event) => contact.isDefault = $event,
        "size": 24,
        "onChange": (checked) => emit("change-default", checked)
      }, null);
      var renderSetDefault = () => {
        if (props2.showSetDefault) {
          return vue.createVNode(Cell, {
            "title": props2.setDefaultLabel,
            "class": bem$I("switch-cell"),
            "border": false
          }, {
            "right-icon": renderSwitch
          });
        }
      };
      vue.watch(() => props2.contactInfo, (value) => extend(contact, DEFAULT_CONTACT, value));
      return () => vue.createVNode(Form, {
        "class": bem$I(),
        "onSubmit": onSave
      }, {
        default: () => [vue.createVNode("div", {
          "class": bem$I("fields")
        }, [vue.createVNode(Field, {
          "modelValue": contact.name,
          "onUpdate:modelValue": ($event) => contact.name = $event,
          "clearable": true,
          "label": t$b("name"),
          "rules": [{
            required: true,
            message: t$b("nameEmpty")
          }],
          "maxlength": "30",
          "placeholder": t$b("name")
        }, null), vue.createVNode(Field, {
          "modelValue": contact.tel,
          "onUpdate:modelValue": ($event) => contact.tel = $event,
          "clearable": true,
          "type": "tel",
          "label": t$b("tel"),
          "rules": [{
            validator: props2.telValidator,
            message: t$b("telInvalid")
          }],
          "placeholder": t$b("tel")
        }, null)]), renderSetDefault(), renderButtons()]
      });
    }
  });
  var ContactEdit = withInstall(_ContactEdit);
  var [name$I, bem$H, t$a] = createNamespace("contact-list");
  var _ContactList = vue.defineComponent({
    name: name$I,
    props: {
      list: Array,
      addText: String,
      modelValue: unknownProp,
      defaultTagText: String
    },
    emits: ["add", "edit", "select", "update:modelValue"],
    setup(props2, {
      emit
    }) {
      var renderItem = (item, index2) => {
        var onClick = () => {
          emit("update:modelValue", item.id);
          emit("select", item, index2);
        };
        var renderRightIcon = () => vue.createVNode(Radio, {
          "class": bem$H("radio"),
          "name": item.id,
          "iconSize": 16
        }, null);
        var renderEditIcon = () => vue.createVNode(Icon, {
          "name": "edit",
          "class": bem$H("edit"),
          "onClick": (event) => {
            event.stopPropagation();
            emit("edit", item, index2);
          }
        }, null);
        var renderContent = () => {
          var nodes = [item.name + "\uFF0C" + item.tel];
          if (item.isDefault && props2.defaultTagText) {
            nodes.push(vue.createVNode(Tag, {
              "type": "danger",
              "round": true,
              "class": bem$H("item-tag")
            }, {
              default: () => [props2.defaultTagText]
            }));
          }
          return nodes;
        };
        return vue.createVNode(Cell, {
          "key": item.id,
          "isLink": true,
          "center": true,
          "class": bem$H("item"),
          "valueClass": bem$H("item-value"),
          "onClick": onClick
        }, {
          icon: renderEditIcon,
          value: renderContent,
          "right-icon": renderRightIcon
        });
      };
      return () => vue.createVNode("div", {
        "class": bem$H()
      }, [vue.createVNode(RadioGroup, {
        "modelValue": props2.modelValue,
        "class": bem$H("group")
      }, {
        default: () => [props2.list && props2.list.map(renderItem)]
      }), vue.createVNode("div", {
        "class": [bem$H("bottom"), "van-safe-area-bottom"]
      }, [vue.createVNode(Button, {
        "round": true,
        "block": true,
        "type": "danger",
        "class": bem$H("add"),
        "text": props2.addText || t$a("addText"),
        "onClick": () => emit("add")
      }, null)])]);
    }
  });
  var ContactList = withInstall(_ContactList);
  function parseFormat(format2, currentTime) {
    var {
      days
    } = currentTime;
    var {
      hours,
      minutes,
      seconds,
      milliseconds
    } = currentTime;
    if (format2.includes("DD")) {
      format2 = format2.replace("DD", padZero(days));
    } else {
      hours += days * 24;
    }
    if (format2.includes("HH")) {
      format2 = format2.replace("HH", padZero(hours));
    } else {
      minutes += hours * 60;
    }
    if (format2.includes("mm")) {
      format2 = format2.replace("mm", padZero(minutes));
    } else {
      seconds += minutes * 60;
    }
    if (format2.includes("ss")) {
      format2 = format2.replace("ss", padZero(seconds));
    } else {
      milliseconds += seconds * 1e3;
    }
    if (format2.includes("S")) {
      var ms = padZero(milliseconds, 3);
      if (format2.includes("SSS")) {
        format2 = format2.replace("SSS", ms);
      } else if (format2.includes("SS")) {
        format2 = format2.replace("SS", ms.slice(0, 2));
      } else {
        format2 = format2.replace("S", ms.charAt(0));
      }
    }
    return format2;
  }
  var [name$H, bem$G] = createNamespace("count-down");
  var props$e = {
    time: makeNumericProp(0),
    format: makeStringProp("HH:mm:ss"),
    autoStart: truthProp,
    millisecond: Boolean
  };
  var _CountDown = vue.defineComponent({
    name: name$H,
    props: props$e,
    emits: ["change", "finish"],
    setup(props2, {
      emit,
      slots
    }) {
      var {
        start: start2,
        pause,
        reset,
        current
      } = useCountDown({
        time: +props2.time,
        millisecond: props2.millisecond,
        onChange: (current2) => emit("change", current2),
        onFinish: () => emit("finish")
      });
      var timeText = vue.computed(() => parseFormat(props2.format, current.value));
      var resetTime = () => {
        reset(+props2.time);
        if (props2.autoStart) {
          start2();
        }
      };
      vue.watch(() => props2.time, resetTime, {
        immediate: true
      });
      useExpose({
        start: start2,
        pause,
        reset: resetTime
      });
      return () => vue.createVNode("div", {
        "class": bem$G()
      }, [slots.default ? slots.default(current.value) : timeText.value]);
    }
  });
  var CountDown = withInstall(_CountDown);
  var [name$G, bem$F, t$9] = createNamespace("coupon");
  function getDate(timeStamp) {
    var date = new Date(timeStamp * 1e3);
    return date.getFullYear() + "." + padZero(date.getMonth() + 1) + "." + padZero(date.getDate());
  }
  var formatDiscount = (discount) => (discount / 10).toFixed(discount % 10 === 0 ? 0 : 1);
  var formatAmount = (amount) => (amount / 100).toFixed(amount % 100 === 0 ? 0 : amount % 10 === 0 ? 1 : 2);
  var _Coupon = vue.defineComponent({
    name: name$G,
    props: {
      chosen: Boolean,
      coupon: makeRequiredProp(Object),
      disabled: Boolean,
      currency: makeStringProp("\xA5")
    },
    setup(props2) {
      var validPeriod = vue.computed(() => {
        var {
          startAt,
          endAt
        } = props2.coupon;
        return getDate(startAt) + " - " + getDate(endAt);
      });
      var faceAmount = vue.computed(() => {
        var {
          coupon,
          currency
        } = props2;
        if (coupon.valueDesc) {
          return [coupon.valueDesc, vue.createVNode("span", null, [coupon.unitDesc || ""])];
        }
        if (coupon.denominations) {
          var denominations = formatAmount(coupon.denominations);
          return [vue.createVNode("span", null, [currency]), " " + denominations];
        }
        if (coupon.discount) {
          return t$9("discount", formatDiscount(coupon.discount));
        }
        return "";
      });
      var conditionMessage = vue.computed(() => {
        var condition = formatAmount(props2.coupon.originCondition || 0);
        return condition === "0" ? t$9("unlimited") : t$9("condition", condition);
      });
      return () => {
        var {
          chosen,
          coupon,
          disabled
        } = props2;
        var description = disabled && coupon.reason || coupon.description;
        return vue.createVNode("div", {
          "class": bem$F({
            disabled
          })
        }, [vue.createVNode("div", {
          "class": bem$F("content")
        }, [vue.createVNode("div", {
          "class": bem$F("head")
        }, [vue.createVNode("h2", {
          "class": bem$F("amount")
        }, [faceAmount.value]), vue.createVNode("p", {
          "class": bem$F("condition")
        }, [coupon.condition || conditionMessage.value])]), vue.createVNode("div", {
          "class": bem$F("body")
        }, [vue.createVNode("p", {
          "class": bem$F("name")
        }, [coupon.name]), vue.createVNode("p", {
          "class": bem$F("valid")
        }, [validPeriod.value]), !disabled && vue.createVNode(Checkbox, {
          "class": bem$F("corner"),
          "modelValue": chosen
        }, null)])]), description && vue.createVNode("p", {
          "class": bem$F("description")
        }, [description])]);
      };
    }
  });
  var Coupon = withInstall(_Coupon);
  var [name$F, bem$E, t$8] = createNamespace("coupon-cell");
  function formatValue(coupons, chosenCoupon, currency) {
    var coupon = coupons[+chosenCoupon];
    if (coupon) {
      var value = 0;
      if (isDef(coupon.value)) {
        ({
          value
        } = coupon);
      } else if (isDef(coupon.denominations)) {
        value = coupon.denominations;
      }
      return "-" + currency + " " + (value / 100).toFixed(2);
    }
    return coupons.length === 0 ? t$8("noCoupon") : t$8("count", coupons.length);
  }
  var _CouponCell = vue.defineComponent({
    name: name$F,
    props: {
      title: String,
      border: truthProp,
      editable: truthProp,
      coupons: makeArrayProp(),
      currency: makeStringProp("\xA5"),
      chosenCoupon: makeNumericProp(-1)
    },
    setup(props2) {
      return () => {
        var selected = props2.coupons[+props2.chosenCoupon];
        var value = formatValue(props2.coupons, props2.chosenCoupon, props2.currency);
        return vue.createVNode(Cell, {
          "class": bem$E(),
          "value": value,
          "title": props2.title || t$8("title"),
          "border": props2.border,
          "isLink": props2.editable,
          "valueClass": bem$E("value", {
            selected
          })
        }, null);
      };
    }
  });
  var CouponCell = withInstall(_CouponCell);
  var [name$E, bem$D, t$7] = createNamespace("coupon-list");
  var EMPTY_IMAGE = "https://img.yzcdn.cn/vant/coupon-empty.png";
  var _CouponList = vue.defineComponent({
    name: name$E,
    props: {
      code: makeStringProp(""),
      coupons: makeArrayProp(),
      currency: makeStringProp("\xA5"),
      showCount: truthProp,
      emptyImage: makeStringProp(EMPTY_IMAGE),
      chosenCoupon: makeNumberProp(-1),
      enabledTitle: String,
      disabledTitle: String,
      disabledCoupons: makeArrayProp(),
      showExchangeBar: truthProp,
      showCloseButton: truthProp,
      closeButtonText: String,
      inputPlaceholder: String,
      exchangeMinLength: makeNumberProp(1),
      exchangeButtonText: String,
      displayedCouponIndex: makeNumberProp(-1),
      exchangeButtonLoading: Boolean,
      exchangeButtonDisabled: Boolean
    },
    emits: ["change", "exchange", "update:code"],
    setup(props2, {
      emit,
      slots
    }) {
      var [couponRefs, setCouponRefs] = useRefs();
      var state = vue.reactive({
        tab: 0,
        code: props2.code
      });
      var buttonDisabled = vue.computed(() => !props2.exchangeButtonLoading && (props2.exchangeButtonDisabled || !state.code || state.code.length < props2.exchangeMinLength));
      var onExchange = () => {
        emit("exchange", state.code);
        if (!props2.code) {
          state.code = "";
        }
      };
      var scrollToCoupon = (index2) => {
        vue.nextTick(() => {
          if (couponRefs.value[index2]) {
            couponRefs.value[index2].scrollIntoView();
          }
        });
      };
      var renderEmpty = () => vue.createVNode("div", {
        "class": bem$D("empty")
      }, [vue.createVNode("img", {
        "src": props2.emptyImage
      }, null), vue.createVNode("p", null, [t$7("noCoupon")])]);
      var renderExchangeBar = () => {
        if (props2.showExchangeBar) {
          return vue.createVNode("div", {
            "class": bem$D("exchange-bar")
          }, [vue.createVNode(Field, {
            "modelValue": state.code,
            "onUpdate:modelValue": ($event) => state.code = $event,
            "clearable": true,
            "border": false,
            "class": bem$D("field"),
            "placeholder": props2.inputPlaceholder || t$7("placeholder"),
            "maxlength": "20"
          }, null), vue.createVNode(Button, {
            "plain": true,
            "type": "danger",
            "class": bem$D("exchange"),
            "text": props2.exchangeButtonText || t$7("exchange"),
            "loading": props2.exchangeButtonLoading,
            "disabled": buttonDisabled.value,
            "onClick": onExchange
          }, null)]);
        }
      };
      var renderCouponTab = () => {
        var _slots$listFooter;
        var {
          coupons
        } = props2;
        var count = props2.showCount ? " (" + coupons.length + ")" : "";
        var title = (props2.enabledTitle || t$7("enable")) + count;
        return vue.createVNode(Tab, {
          "title": title
        }, {
          default: () => [vue.createVNode("div", {
            "class": bem$D("list", {
              "with-bar": props2.showExchangeBar,
              "with-bottom": props2.showCloseButton
            })
          }, [coupons.map((coupon, index2) => vue.createVNode(Coupon, {
            "key": coupon.id,
            "ref": setCouponRefs(index2),
            "coupon": coupon,
            "chosen": index2 === props2.chosenCoupon,
            "currency": props2.currency,
            "onClick": () => emit("change", index2)
          }, null)), !coupons.length && renderEmpty(), (_slots$listFooter = slots["list-footer"]) == null ? void 0 : _slots$listFooter.call(slots)])]
        });
      };
      var renderDisabledTab = () => {
        var _slots$disabledList;
        var {
          disabledCoupons
        } = props2;
        var count = props2.showCount ? " (" + disabledCoupons.length + ")" : "";
        var title = (props2.disabledTitle || t$7("disabled")) + count;
        return vue.createVNode(Tab, {
          "title": title
        }, {
          default: () => [vue.createVNode("div", {
            "class": bem$D("list", {
              "with-bar": props2.showExchangeBar,
              "with-bottom": props2.showCloseButton
            })
          }, [disabledCoupons.map((coupon) => vue.createVNode(Coupon, {
            "disabled": true,
            "key": coupon.id,
            "coupon": coupon,
            "currency": props2.currency
          }, null)), !disabledCoupons.length && renderEmpty(), (_slots$disabledList = slots["disabled-list-footer"]) == null ? void 0 : _slots$disabledList.call(slots)])]
        });
      };
      vue.watch(() => props2.code, (value) => {
        state.code = value;
      });
      vue.watch(() => state.code, (value) => emit("update:code", value));
      vue.watch(() => props2.displayedCouponIndex, scrollToCoupon);
      vue.onMounted(() => {
        scrollToCoupon(props2.displayedCouponIndex);
      });
      return () => vue.createVNode("div", {
        "class": bem$D()
      }, [renderExchangeBar(), vue.createVNode(Tabs, {
        "active": state.tab,
        "onUpdate:active": ($event) => state.tab = $event,
        "class": bem$D("tab"),
        "border": false
      }, {
        default: () => [renderCouponTab(), renderDisabledTab()]
      }), vue.createVNode("div", {
        "class": bem$D("bottom")
      }, [vue.withDirectives(vue.createVNode(Button, {
        "round": true,
        "block": true,
        "type": "danger",
        "class": bem$D("close"),
        "text": props2.closeButtonText || t$7("close"),
        "onClick": () => emit("change", -1)
      }, null), [[vue.vShow, props2.showCloseButton]])])]);
    }
  });
  var CouponList = withInstall(_CouponList);
  var [name$D] = createNamespace("time-picker");
  var TimePicker = vue.defineComponent({
    name: name$D,
    props: extend({}, sharedProps, {
      minHour: makeNumericProp(0),
      maxHour: makeNumericProp(23),
      minMinute: makeNumericProp(0),
      maxMinute: makeNumericProp(59),
      modelValue: String
    }),
    emits: ["confirm", "cancel", "change", "update:modelValue"],
    setup(props2, {
      emit,
      slots
    }) {
      var formatValue2 = (value) => {
        var {
          minHour,
          maxHour,
          maxMinute,
          minMinute
        } = props2;
        if (!value) {
          value = padZero(minHour) + ":" + padZero(minMinute);
        }
        var [hour, minute] = value.split(":");
        hour = padZero(clamp(+hour, +minHour, +maxHour));
        minute = padZero(clamp(+minute, +minMinute, +maxMinute));
        return hour + ":" + minute;
      };
      var picker = vue.ref();
      var currentDate = vue.ref(formatValue2(props2.modelValue));
      var ranges = vue.computed(() => [{
        type: "hour",
        range: [+props2.minHour, +props2.maxHour]
      }, {
        type: "minute",
        range: [+props2.minMinute, +props2.maxMinute]
      }]);
      var originColumns = vue.computed(() => ranges.value.map(({
        type,
        range: rangeArr
      }) => {
        var values = times(rangeArr[1] - rangeArr[0] + 1, (index2) => padZero(rangeArr[0] + index2));
        if (props2.filter) {
          values = props2.filter(type, values);
        }
        return {
          type,
          values
        };
      }));
      var columns = vue.computed(() => originColumns.value.map((column) => ({
        values: column.values.map((value) => props2.formatter(column.type, value))
      })));
      var updateColumnValue = () => {
        var pair = currentDate.value.split(":");
        var values = [props2.formatter("hour", pair[0]), props2.formatter("minute", pair[1])];
        vue.nextTick(() => {
          var _picker$value;
          (_picker$value = picker.value) == null ? void 0 : _picker$value.setValues(values);
        });
      };
      var updateInnerValue = () => {
        var [hourIndex, minuteIndex] = picker.value.getIndexes();
        var [hourColumn, minuteColumn] = originColumns.value;
        var hour = hourColumn.values[hourIndex] || hourColumn.values[0];
        var minute = minuteColumn.values[minuteIndex] || minuteColumn.values[0];
        currentDate.value = formatValue2(hour + ":" + minute);
        updateColumnValue();
      };
      var onConfirm = () => emit("confirm", currentDate.value);
      var onCancel = () => emit("cancel");
      var onChange = () => {
        updateInnerValue();
        vue.nextTick(() => {
          vue.nextTick(() => emit("change", currentDate.value));
        });
      };
      vue.onMounted(() => {
        updateColumnValue();
        vue.nextTick(updateInnerValue);
      });
      vue.watch(columns, updateColumnValue);
      vue.watch(() => [props2.filter, props2.maxHour, props2.minMinute, props2.maxMinute], updateInnerValue);
      vue.watch(() => props2.minHour, () => {
        vue.nextTick(updateInnerValue);
      });
      vue.watch(currentDate, (value) => emit("update:modelValue", value));
      vue.watch(() => props2.modelValue, (value) => {
        value = formatValue2(value);
        if (value !== currentDate.value) {
          currentDate.value = value;
          updateColumnValue();
        }
      });
      useExpose({
        getPicker: () => picker.value
      });
      return () => vue.createVNode(Picker, vue.mergeProps({
        "ref": picker,
        "columns": columns.value,
        "onChange": onChange,
        "onCancel": onCancel,
        "onConfirm": onConfirm
      }, pick(props2, pickerKeys)), slots);
    }
  });
  var currentYear = new Date().getFullYear();
  var [name$C] = createNamespace("date-picker");
  var DatePicker = vue.defineComponent({
    name: name$C,
    props: extend({}, sharedProps, {
      type: makeStringProp("datetime"),
      modelValue: Date,
      minDate: {
        type: Date,
        default: () => new Date(currentYear - 10, 0, 1),
        validator: isDate
      },
      maxDate: {
        type: Date,
        default: () => new Date(currentYear + 10, 11, 31),
        validator: isDate
      }
    }),
    emits: ["confirm", "cancel", "change", "update:modelValue"],
    setup(props2, {
      emit,
      slots
    }) {
      var formatValue2 = (value) => {
        if (isDate(value)) {
          var timestamp = clamp(value.getTime(), props2.minDate.getTime(), props2.maxDate.getTime());
          return new Date(timestamp);
        }
        return void 0;
      };
      var picker = vue.ref();
      var currentDate = vue.ref(formatValue2(props2.modelValue));
      var getBoundary = (type, value) => {
        var boundary = props2[type + "Date"];
        var year = boundary.getFullYear();
        var month = 1;
        var date = 1;
        var hour = 0;
        var minute = 0;
        if (type === "max") {
          month = 12;
          date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1);
          hour = 23;
          minute = 59;
        }
        if (value.getFullYear() === year) {
          month = boundary.getMonth() + 1;
          if (value.getMonth() + 1 === month) {
            date = boundary.getDate();
            if (value.getDate() === date) {
              hour = boundary.getHours();
              if (value.getHours() === hour) {
                minute = boundary.getMinutes();
              }
            }
          }
        }
        return {
          [type + "Year"]: year,
          [type + "Month"]: month,
          [type + "Date"]: date,
          [type + "Hour"]: hour,
          [type + "Minute"]: minute
        };
      };
      var ranges = vue.computed(() => {
        var {
          maxYear,
          maxDate,
          maxMonth,
          maxHour,
          maxMinute
        } = getBoundary("max", currentDate.value || props2.minDate);
        var {
          minYear,
          minDate,
          minMonth,
          minHour,
          minMinute
        } = getBoundary("min", currentDate.value || props2.minDate);
        var result = [{
          type: "year",
          range: [minYear, maxYear]
        }, {
          type: "month",
          range: [minMonth, maxMonth]
        }, {
          type: "day",
          range: [minDate, maxDate]
        }, {
          type: "hour",
          range: [minHour, maxHour]
        }, {
          type: "minute",
          range: [minMinute, maxMinute]
        }];
        switch (props2.type) {
          case "date":
            result = result.slice(0, 3);
            break;
          case "year-month":
            result = result.slice(0, 2);
            break;
          case "month-day":
            result = result.slice(1, 3);
            break;
          case "datehour":
            result = result.slice(0, 4);
            break;
        }
        if (props2.columnsOrder) {
          var columnsOrder = props2.columnsOrder.concat(result.map((column) => column.type));
          result.sort((a, b) => columnsOrder.indexOf(a.type) - columnsOrder.indexOf(b.type));
        }
        return result;
      });
      var originColumns = vue.computed(() => ranges.value.map(({
        type,
        range: rangeArr
      }) => {
        var values = times(rangeArr[1] - rangeArr[0] + 1, (index2) => padZero(rangeArr[0] + index2));
        if (props2.filter) {
          values = props2.filter(type, values);
        }
        return {
          type,
          values
        };
      }));
      var columns = vue.computed(() => originColumns.value.map((column) => ({
        values: column.values.map((value) => props2.formatter(column.type, value))
      })));
      var updateColumnValue = () => {
        var value = currentDate.value || props2.minDate;
        var {
          formatter
        } = props2;
        var values = originColumns.value.map((column) => {
          switch (column.type) {
            case "year":
              return formatter("year", "" + value.getFullYear());
            case "month":
              return formatter("month", padZero(value.getMonth() + 1));
            case "day":
              return formatter("day", padZero(value.getDate()));
            case "hour":
              return formatter("hour", padZero(value.getHours()));
            case "minute":
              return formatter("minute", padZero(value.getMinutes()));
            default:
              return "";
          }
        });
        vue.nextTick(() => {
          var _picker$value;
          (_picker$value = picker.value) == null ? void 0 : _picker$value.setValues(values);
        });
      };
      var updateInnerValue = () => {
        var {
          type
        } = props2;
        var indexes = picker.value.getIndexes();
        var getValue = (type2) => {
          var index2 = 0;
          originColumns.value.forEach((column, columnIndex) => {
            if (type2 === column.type) {
              index2 = columnIndex;
            }
          });
          var {
            values
          } = originColumns.value[index2];
          return getTrueValue(values[indexes[index2]]);
        };
        var year;
        var month;
        var day;
        if (type === "month-day") {
          year = (currentDate.value || props2.minDate).getFullYear();
          month = getValue("month");
          day = getValue("day");
        } else {
          year = getValue("year");
          month = getValue("month");
          day = type === "year-month" ? 1 : getValue("day");
        }
        var maxDay = getMonthEndDay(year, month);
        day = day > maxDay ? maxDay : day;
        var hour = 0;
        var minute = 0;
        if (type === "datehour") {
          hour = getValue("hour");
        }
        if (type === "datetime") {
          hour = getValue("hour");
          minute = getValue("minute");
        }
        var value = new Date(year, month - 1, day, hour, minute);
        currentDate.value = formatValue2(value);
      };
      var onConfirm = () => {
        emit("update:modelValue", currentDate.value);
        emit("confirm", currentDate.value);
      };
      var onCancel = () => emit("cancel");
      var onChange = () => {
        updateInnerValue();
        vue.nextTick(() => {
          vue.nextTick(() => emit("change", currentDate.value));
        });
      };
      vue.onMounted(() => {
        updateColumnValue();
        vue.nextTick(updateInnerValue);
      });
      vue.watch(columns, updateColumnValue);
      vue.watch(currentDate, (value, oldValue) => emit("update:modelValue", oldValue ? value : null));
      vue.watch(() => [props2.filter, props2.maxDate], updateInnerValue);
      vue.watch(() => props2.minDate, () => {
        vue.nextTick(updateInnerValue);
      });
      vue.watch(() => props2.modelValue, (value) => {
        var _currentDate$value;
        value = formatValue2(value);
        if (value && value.valueOf() !== ((_currentDate$value = currentDate.value) == null ? void 0 : _currentDate$value.valueOf())) {
          currentDate.value = value;
        }
      });
      useExpose({
        getPicker: () => picker.value
      });
      return () => vue.createVNode(Picker, vue.mergeProps({
        "ref": picker,
        "columns": columns.value,
        "onChange": onChange,
        "onCancel": onCancel,
        "onConfirm": onConfirm
      }, pick(props2, pickerKeys)), slots);
    }
  });
  var [name$B, bem$C] = createNamespace("datetime-picker");
  var timePickerProps = Object.keys(TimePicker.props);
  var datePickerProps = Object.keys(DatePicker.props);
  var props$d = extend({}, TimePicker.props, DatePicker.props, {
    modelValue: [String, Date]
  });
  var _DatetimePicker = vue.defineComponent({
    name: name$B,
    props: props$d,
    setup(props2, {
      attrs,
      slots
    }) {
      var root = vue.ref();
      useExpose({
        getPicker: () => {
          var _root$value;
          return (_root$value = root.value) == null ? void 0 : _root$value.getPicker();
        }
      });
      return () => {
        var isTimePicker = props2.type === "time";
        var Component = isTimePicker ? TimePicker : DatePicker;
        var inheritProps = pick(props2, isTimePicker ? timePickerProps : datePickerProps);
        return vue.createVNode(Component, vue.mergeProps({
          "ref": root,
          "class": bem$C()
        }, inheritProps, attrs), slots);
      };
    }
  });
  var DatetimePicker = withInstall(_DatetimePicker);
  var [name$A, bem$B, t$6] = createNamespace("dialog");
  var popupKeys$1 = [...popupSharedPropKeys, "transition", "closeOnPopstate"];
  var VanDialog = vue.defineComponent({
    name: name$A,
    props: extend({}, popupSharedProps, {
      title: String,
      theme: String,
      width: numericProp,
      message: [String, Function],
      callback: Function,
      allowHtml: Boolean,
      className: unknownProp,
      transition: makeStringProp("van-dialog-bounce"),
      messageAlign: String,
      closeOnPopstate: truthProp,
      showCancelButton: Boolean,
      cancelButtonText: String,
      cancelButtonColor: String,
      confirmButtonText: String,
      confirmButtonColor: String,
      showConfirmButton: truthProp,
      closeOnClickOverlay: Boolean
    }),
    emits: ["confirm", "cancel", "update:show"],
    setup(props2, {
      emit,
      slots
    }) {
      var loading = vue.reactive({
        confirm: false,
        cancel: false
      });
      var updateShow = (value) => emit("update:show", value);
      var close = (action) => {
        updateShow(false);
        props2.callback == null ? void 0 : props2.callback(action);
      };
      var getActionHandler = (action) => () => {
        if (!props2.show) {
          return;
        }
        emit(action);
        if (props2.beforeClose) {
          loading[action] = true;
          callInterceptor(props2.beforeClose, {
            args: [action],
            done() {
              close(action);
              loading[action] = false;
            },
            canceled() {
              loading[action] = false;
            }
          });
        } else {
          close(action);
        }
      };
      var onCancel = getActionHandler("cancel");
      var onConfirm = getActionHandler("confirm");
      var renderTitle = () => {
        var title = slots.title ? slots.title() : props2.title;
        if (title) {
          return vue.createVNode("div", {
            "class": bem$B("header", {
              isolated: !props2.message && !slots.default
            })
          }, [title]);
        }
      };
      var renderMessage = (hasTitle) => {
        var {
          message,
          allowHtml,
          messageAlign
        } = props2;
        var classNames = bem$B("message", {
          "has-title": hasTitle,
          [messageAlign]: messageAlign
        });
        var content = isFunction(message) ? message() : message;
        if (allowHtml && typeof content === "string") {
          return vue.createVNode("div", {
            "class": classNames,
            "innerHTML": content
          }, null);
        }
        return vue.createVNode("div", {
          "class": classNames
        }, [content]);
      };
      var renderContent = () => {
        if (slots.default) {
          return vue.createVNode("div", {
            "class": bem$B("content")
          }, [slots.default()]);
        }
        var {
          title,
          message,
          allowHtml
        } = props2;
        if (message) {
          var hasTitle = !!(title || slots.title);
          return vue.createVNode("div", {
            "key": allowHtml ? 1 : 0,
            "class": bem$B("content", {
              isolated: !hasTitle
            })
          }, [renderMessage(hasTitle)]);
        }
      };
      var renderButtons = () => vue.createVNode("div", {
        "class": [BORDER_TOP, bem$B("footer")]
      }, [props2.showCancelButton && vue.createVNode(Button, {
        "size": "large",
        "text": props2.cancelButtonText || t$6("cancel"),
        "class": bem$B("cancel"),
        "style": {
          color: props2.cancelButtonColor
        },
        "loading": loading.cancel,
        "onClick": onCancel
      }, null), props2.showConfirmButton && vue.createVNode(Button, {
        "size": "large",
        "text": props2.confirmButtonText || t$6("confirm"),
        "class": [bem$B("confirm"), {
          [BORDER_LEFT]: props2.showCancelButton
        }],
        "style": {
          color: props2.confirmButtonColor
        },
        "loading": loading.confirm,
        "onClick": onConfirm
      }, null)]);
      var renderRoundButtons = () => vue.createVNode(ActionBar, {
        "class": bem$B("footer")
      }, {
        default: () => [props2.showCancelButton && vue.createVNode(ActionBarButton, {
          "type": "warning",
          "text": props2.cancelButtonText || t$6("cancel"),
          "class": bem$B("cancel"),
          "color": props2.cancelButtonColor,
          "loading": loading.cancel,
          "onClick": onCancel
        }, null), props2.showConfirmButton && vue.createVNode(ActionBarButton, {
          "type": "danger",
          "text": props2.confirmButtonText || t$6("confirm"),
          "class": bem$B("confirm"),
          "color": props2.confirmButtonColor,
          "loading": loading.confirm,
          "onClick": onConfirm
        }, null)]
      });
      var renderFooter = () => {
        if (slots.footer) {
          return slots.footer();
        }
        return props2.theme === "round-button" ? renderRoundButtons() : renderButtons();
      };
      return () => {
        var {
          width,
          title,
          theme,
          message,
          className
        } = props2;
        return vue.createVNode(Popup, vue.mergeProps({
          "role": "dialog",
          "class": [bem$B([theme]), className],
          "style": {
            width: addUnit(width)
          },
          "aria-labelledby": title || message,
          "onUpdate:show": updateShow
        }, pick(props2, popupKeys$1)), {
          default: () => [renderTitle(), renderContent(), renderFooter()]
        });
      };
    }
  });
  var instance$2;
  function initInstance$2() {
    var Wrapper = {
      setup() {
        var {
          state,
          toggle
        } = usePopupState();
        return () => vue.createVNode(VanDialog, vue.mergeProps(state, {
          "onUpdate:show": toggle
        }), null);
      }
    };
    ({
      instance: instance$2
    } = mountComponent(Wrapper));
  }
  function Dialog(options) {
    if (!inBrowser$1) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      if (!instance$2) {
        initInstance$2();
      }
      instance$2.open(extend({}, Dialog.currentOptions, options, {
        callback: (action) => {
          (action === "confirm" ? resolve : reject)(action);
        }
      }));
    });
  }
  Dialog.defaultOptions = {
    title: "",
    width: "",
    theme: null,
    message: "",
    overlay: true,
    callback: null,
    teleport: "body",
    className: "",
    allowHtml: false,
    lockScroll: true,
    transition: void 0,
    beforeClose: null,
    overlayClass: "",
    overlayStyle: void 0,
    messageAlign: "",
    cancelButtonText: "",
    cancelButtonColor: null,
    confirmButtonText: "",
    confirmButtonColor: null,
    showConfirmButton: true,
    showCancelButton: false,
    closeOnPopstate: true,
    closeOnClickOverlay: false
  };
  Dialog.currentOptions = extend({}, Dialog.defaultOptions);
  Dialog.alert = Dialog;
  Dialog.confirm = (options) => Dialog(extend({
    showCancelButton: true
  }, options));
  Dialog.close = () => {
    if (instance$2) {
      instance$2.toggle(false);
    }
  };
  Dialog.setDefaultOptions = (options) => {
    extend(Dialog.currentOptions, options);
  };
  Dialog.resetDefaultOptions = () => {
    Dialog.currentOptions = extend({}, Dialog.defaultOptions);
  };
  Dialog.Component = withInstall(VanDialog);
  Dialog.install = (app) => {
    app.use(Dialog.Component);
    app.config.globalProperties.$dialog = Dialog;
  };
  var [name$z, bem$A] = createNamespace("divider");
  var _Divider = vue.defineComponent({
    name: name$z,
    props: {
      dashed: Boolean,
      hairline: truthProp,
      contentPosition: makeStringProp("center")
    },
    setup(props2, {
      slots
    }) {
      return () => vue.createVNode("div", {
        "role": "separator",
        "class": bem$A({
          dashed: props2.dashed,
          hairline: props2.hairline,
          ["content-" + props2.contentPosition]: !!slots.default
        })
      }, [slots.default == null ? void 0 : slots.default()]);
    }
  });
  var Divider = withInstall(_Divider);
  var [name$y, bem$z] = createNamespace("dropdown-menu");
  var props$c = {
    overlay: truthProp,
    zIndex: numericProp,
    duration: makeNumericProp(0.2),
    direction: makeStringProp("down"),
    activeColor: String,
    closeOnClickOutside: truthProp,
    closeOnClickOverlay: truthProp
  };
  var DROPDOWN_KEY = Symbol(name$y);
  var _DropdownMenu = vue.defineComponent({
    name: name$y,
    props: props$c,
    setup(props2, {
      slots
    }) {
      var root = vue.ref();
      var barRef = vue.ref();
      var offset2 = vue.ref(0);
      var {
        children,
        linkChildren
      } = useChildren(DROPDOWN_KEY);
      var scrollParent = useScrollParent(root);
      var opened = vue.computed(() => children.some((item) => item.state.showWrapper));
      var barStyle = vue.computed(() => {
        if (opened.value && isDef(props2.zIndex)) {
          return {
            zIndex: +props2.zIndex + 1
          };
        }
      });
      var onClickAway = () => {
        if (props2.closeOnClickOutside) {
          children.forEach((item) => {
            item.toggle(false);
          });
        }
      };
      var updateOffset = () => {
        if (barRef.value) {
          var rect = useRect(barRef);
          if (props2.direction === "down") {
            offset2.value = rect.bottom;
          } else {
            offset2.value = window.innerHeight - rect.top;
          }
        }
      };
      var onScroll = () => {
        if (opened.value) {
          updateOffset();
        }
      };
      var toggleItem = (active) => {
        children.forEach((item, index2) => {
          if (index2 === active) {
            updateOffset();
            item.toggle();
          } else if (item.state.showPopup) {
            item.toggle(false, {
              immediate: true
            });
          }
        });
      };
      var renderTitle = (item, index2) => {
        var {
          showPopup
        } = item.state;
        var {
          disabled,
          titleClass
        } = item;
        return vue.createVNode("div", {
          "role": "button",
          "tabindex": disabled ? -1 : 0,
          "class": bem$z("item", {
            disabled
          }),
          "onClick": () => {
            if (!disabled) {
              toggleItem(index2);
            }
          }
        }, [vue.createVNode("span", {
          "class": [bem$z("title", {
            down: showPopup === (props2.direction === "down"),
            active: showPopup
          }), titleClass],
          "style": {
            color: showPopup ? props2.activeColor : ""
          }
        }, [vue.createVNode("div", {
          "class": "van-ellipsis"
        }, [item.renderTitle()])])]);
      };
      linkChildren({
        props: props2,
        offset: offset2
      });
      useClickAway(root, onClickAway);
      useEventListener("scroll", onScroll, {
        target: scrollParent
      });
      return () => vue.createVNode("div", {
        "ref": root,
        "class": bem$z()
      }, [vue.createVNode("div", {
        "ref": barRef,
        "style": barStyle.value,
        "class": bem$z("bar", {
          opened: opened.value
        })
      }, [children.map(renderTitle)]), slots.default == null ? void 0 : slots.default()]);
    }
  });
  var [name$x, bem$y] = createNamespace("dropdown-item");
  var props$b = {
    title: String,
    options: makeArrayProp(),
    disabled: Boolean,
    teleport: [String, Object],
    lazyRender: truthProp,
    modelValue: unknownProp,
    titleClass: unknownProp
  };
  var _DropdownItem = vue.defineComponent({
    name: name$x,
    props: props$b,
    emits: ["open", "opened", "close", "closed", "change", "update:modelValue"],
    setup(props2, {
      emit,
      slots
    }) {
      var state = vue.reactive({
        showPopup: false,
        transition: true,
        showWrapper: false
      });
      var {
        parent
      } = useParent(DROPDOWN_KEY);
      if (!parent) {
        return;
      }
      var getEmitter = (name2) => () => emit(name2);
      var onOpen = getEmitter("open");
      var onClose = getEmitter("close");
      var onOpened = getEmitter("opened");
      var onClosed = () => {
        state.showWrapper = false;
        emit("closed");
      };
      var onClickWrapper = (event) => {
        if (props2.teleport) {
          event.stopPropagation();
        }
      };
      var toggle = (show = !state.showPopup, options = {}) => {
        if (show === state.showPopup) {
          return;
        }
        state.showPopup = show;
        state.transition = !options.immediate;
        if (show) {
          state.showWrapper = true;
        }
      };
      var renderTitle = () => {
        if (slots.title) {
          return slots.title();
        }
        if (props2.title) {
          return props2.title;
        }
        var match = props2.options.find((option) => option.value === props2.modelValue);
        return match ? match.text : "";
      };
      var renderOption = (option) => {
        var {
          activeColor
        } = parent.props;
        var active = option.value === props2.modelValue;
        var onClick = () => {
          state.showPopup = false;
          if (option.value !== props2.modelValue) {
            emit("update:modelValue", option.value);
            emit("change", option.value);
          }
        };
        var renderIcon = () => {
          if (active) {
            return vue.createVNode(Icon, {
              "class": bem$y("icon"),
              "color": activeColor,
              "name": "success"
            }, null);
          }
        };
        return vue.createVNode(Cell, {
          "clickable": true,
          "key": option.value,
          "icon": option.icon,
          "title": option.text,
          "class": bem$y("option", {
            active
          }),
          "style": {
            color: active ? activeColor : ""
          },
          "onClick": onClick
        }, {
          value: renderIcon
        });
      };
      var renderContent = () => {
        var {
          offset: offset2
        } = parent;
        var {
          zIndex,
          overlay,
          duration,
          direction,
          closeOnClickOverlay
        } = parent.props;
        var style = getZIndexStyle(zIndex);
        if (direction === "down") {
          style.top = offset2.value + "px";
        } else {
          style.bottom = offset2.value + "px";
        }
        return vue.withDirectives(vue.createVNode("div", {
          "style": style,
          "class": bem$y([direction]),
          "onClick": onClickWrapper
        }, [vue.createVNode(Popup, {
          "show": state.showPopup,
          "onUpdate:show": ($event) => state.showPopup = $event,
          "class": bem$y("content"),
          "overlay": overlay,
          "position": direction === "down" ? "top" : "bottom",
          "duration": state.transition ? duration : 0,
          "lazyRender": props2.lazyRender,
          "overlayStyle": {
            position: "absolute"
          },
          "closeOnClickOverlay": closeOnClickOverlay,
          "onOpen": onOpen,
          "onClose": onClose,
          "onOpened": onOpened,
          "onClosed": onClosed
        }, {
          default: () => [props2.options.map(renderOption), slots.default == null ? void 0 : slots.default()]
        })]), [[vue.vShow, state.showWrapper]]);
      };
      useExpose({
        state,
        toggle,
        renderTitle
      });
      return () => {
        if (props2.teleport) {
          return vue.createVNode(vue.Teleport, {
            "to": props2.teleport
          }, {
            default: () => [renderContent()]
          });
        }
        return renderContent();
      };
    }
  });
  var DropdownItem = withInstall(_DropdownItem);
  var DropdownMenu = withInstall(_DropdownMenu);
  var prefix = "van-empty-network-";
  var renderStop = (color, offset2, opacity) => vue.createVNode("stop", {
    "stop-color": color,
    "offset": offset2 + "%",
    "stop-opacity": opacity
  }, null);
  var Network = vue.createVNode("svg", {
    "viewBox": "0 0 160 160"
  }, [vue.createVNode("defs", null, [vue.createVNode("linearGradient", {
    "id": prefix + "1",
    "x1": "64.022%",
    "y1": "100%",
    "x2": "64.022%"
  }, [renderStop("#FFF", 0, 0.5), renderStop("#F2F3F5", 100)]), vue.createVNode("linearGradient", {
    "id": prefix + "2",
    "x1": "50%",
    "x2": "50%",
    "y2": "84.459%"
  }, [renderStop("#EBEDF0", 0), renderStop("#DCDEE0", 100, 0)]), vue.createVNode("linearGradient", {
    "id": prefix + "3",
    "x1": "100%",
    "x2": "100%",
    "y2": "100%"
  }, [renderStop("#EAEDF0", 0), renderStop("#DCDEE0", 100)]), vue.createVNode("linearGradient", {
    "id": prefix + "4",
    "x1": "100%",
    "y1": "100%",
    "x2": "100%"
  }, [renderStop("#EAEDF0", 0), renderStop("#DCDEE0", 100)]), vue.createVNode("radialGradient", {
    "id": prefix + "5",
    "cx": "50%",
    "cy": "0%",
    "fx": "50%",
    "fy": "0%",
    "r": "100%",
    "gradientTransform": "matrix(0 1 -.54835 0 .5 -.5)"
  }, [renderStop("#EBEDF0", 0), renderStop("#FFF", 100, 0)])]), vue.createVNode("g", {
    "fill": "none"
  }, [vue.createVNode("g", {
    "opacity": ".8"
  }, [vue.createVNode("path", {
    "d": "M0 124V46h20v20h14v58H0z",
    "fill": "url(#" + prefix + "1)",
    "transform": "matrix(-1 0 0 1 36 7)"
  }, null), vue.createVNode("path", {
    "d": "M121 8h22.231v14H152v77.37h-31V8z",
    "fill": "url(#" + prefix + "1)",
    "transform": "translate(2 7)"
  }, null)]), vue.createVNode("path", {
    "fill": "url(#" + prefix + "5)",
    "d": "M0 139h160v21H0z"
  }, null), vue.createVNode("path", {
    "d": "M37 18a7 7 0 013 13.326v26.742c0 1.23-.997 2.227-2.227 2.227h-1.546A2.227 2.227 0 0134 58.068V31.326A7 7 0 0137 18z",
    "fill": "url(#" + prefix + "2)",
    "transform": "translate(43 36)"
  }, null), vue.createVNode("g", {
    "opacity": ".6",
    "stroke-linecap": "round",
    "stroke-width": "7"
  }, [vue.createVNode("path", {
    "d": "M20.875 11.136a18.868 18.868 0 00-5.284 13.121c0 5.094 2.012 9.718 5.284 13.12",
    "stroke": "url(#" + prefix + "3)",
    "transform": "translate(43 36)"
  }, null), vue.createVNode("path", {
    "d": "M9.849 0C3.756 6.225 0 14.747 0 24.146c0 9.398 3.756 17.92 9.849 24.145",
    "stroke": "url(#" + prefix + "3)",
    "transform": "translate(43 36)"
  }, null), vue.createVNode("path", {
    "d": "M57.625 11.136a18.868 18.868 0 00-5.284 13.121c0 5.094 2.012 9.718 5.284 13.12",
    "stroke": "url(#" + prefix + "4)",
    "transform": "rotate(-180 76.483 42.257)"
  }, null), vue.createVNode("path", {
    "d": "M73.216 0c-6.093 6.225-9.849 14.747-9.849 24.146 0 9.398 3.756 17.92 9.849 24.145",
    "stroke": "url(#" + prefix + "4)",
    "transform": "rotate(-180 89.791 42.146)"
  }, null)]), vue.createVNode("g", {
    "transform": "translate(31 105)"
  }, [vue.createVNode("rect", {
    "fill": "#EBEDF0",
    "width": "98",
    "height": "34",
    "rx": "2"
  }, null), vue.createVNode("rect", {
    "fill": "#FFF",
    "x": "9",
    "y": "8",
    "width": "80",
    "height": "18",
    "rx": "1.114"
  }, null), vue.createVNode("rect", {
    "fill": "#EBEDF0",
    "x": "15",
    "y": "12",
    "width": "18",
    "height": "6",
    "rx": "1.114"
  }, null)])])]);
  var [name$w, bem$x] = createNamespace("empty");
  var PRESET_IMAGES = ["error", "search", "default"];
  var _Empty = vue.defineComponent({
    name: name$w,
    props: {
      image: makeStringProp("default"),
      imageSize: numericProp,
      description: String
    },
    setup(props2, {
      slots
    }) {
      var renderImage = () => {
        if (slots.image) {
          return slots.image();
        }
        var {
          image
        } = props2;
        if (image === "network") {
          return Network;
        }
        if (PRESET_IMAGES.includes(image)) {
          image = "https://img.yzcdn.cn/vant/empty-image-" + image + ".png";
        }
        return vue.createVNode("img", {
          "src": image
        }, null);
      };
      var renderDescription = () => {
        var description = slots.description ? slots.description() : props2.description;
        if (description) {
          return vue.createVNode("p", {
            "class": bem$x("description")
          }, [description]);
        }
      };
      var renderBottom = () => {
        if (slots.default) {
          return vue.createVNode("div", {
            "class": bem$x("bottom")
          }, [slots.default()]);
        }
      };
      return () => vue.createVNode("div", {
        "class": bem$x()
      }, [vue.createVNode("div", {
        "class": bem$x("image"),
        "style": getSizeStyle(props2.imageSize)
      }, [renderImage()]), renderDescription(), renderBottom()]);
    }
  });
  var Empty = withInstall(_Empty);
  var [name$v, bem$w] = createNamespace("grid");
  var props$a = {
    square: Boolean,
    center: truthProp,
    border: truthProp,
    gutter: numericProp,
    reverse: Boolean,
    iconSize: numericProp,
    direction: String,
    clickable: Boolean,
    columnNum: makeNumericProp(4)
  };
  var GRID_KEY = Symbol(name$v);
  var _Grid = vue.defineComponent({
    name: name$v,
    props: props$a,
    setup(props2, {
      slots
    }) {
      var {
        linkChildren
      } = useChildren(GRID_KEY);
      linkChildren({
        props: props2
      });
      return () => vue.createVNode("div", {
        "style": {
          paddingLeft: addUnit(props2.gutter)
        },
        "class": [bem$w(), {
          [BORDER_TOP]: props2.border && !props2.gutter
        }]
      }, [slots.default == null ? void 0 : slots.default()]);
    }
  });
  var Grid = withInstall(_Grid);
  var [name$u, bem$v] = createNamespace("grid-item");
  var _GridItem = vue.defineComponent({
    name: name$u,
    props: extend({}, routeProps, {
      dot: Boolean,
      text: String,
      icon: String,
      badge: numericProp,
      iconColor: String,
      iconPrefix: String
    }),
    setup(props2, {
      slots
    }) {
      var {
        parent,
        index: index2
      } = useParent(GRID_KEY);
      var route2 = useRoute();
      if (!parent) {
        return;
      }
      var rootStyle = vue.computed(() => {
        var {
          square,
          gutter,
          columnNum
        } = parent.props;
        var percent = 100 / +columnNum + "%";
        var style = {
          flexBasis: percent
        };
        if (square) {
          style.paddingTop = percent;
        } else if (gutter) {
          var gutterValue = addUnit(gutter);
          style.paddingRight = gutterValue;
          if (index2.value >= columnNum) {
            style.marginTop = gutterValue;
          }
        }
        return style;
      });
      var contentStyle = vue.computed(() => {
        var {
          square,
          gutter
        } = parent.props;
        if (square && gutter) {
          var gutterValue = addUnit(gutter);
          return {
            right: gutterValue,
            bottom: gutterValue,
            height: "auto"
          };
        }
      });
      var renderIcon = () => {
        if (slots.icon) {
          return vue.createVNode(Badge, {
            "dot": props2.dot,
            "content": props2.badge
          }, {
            default: slots.icon
          });
        }
        if (props2.icon) {
          return vue.createVNode(Icon, {
            "dot": props2.dot,
            "name": props2.icon,
            "size": parent.props.iconSize,
            "badge": props2.badge,
            "class": bem$v("icon"),
            "classPrefix": props2.iconPrefix,
            "color": props2.iconColor
          }, null);
        }
      };
      var renderText = () => {
        if (slots.text) {
          return slots.text();
        }
        if (props2.text) {
          return vue.createVNode("span", {
            "class": bem$v("text")
          }, [props2.text]);
        }
      };
      var renderContent = () => {
        if (slots.default) {
          return slots.default();
        }
        return [renderIcon(), renderText()];
      };
      return () => {
        var {
          center,
          border,
          square,
          gutter,
          reverse,
          direction,
          clickable
        } = parent.props;
        var classes = [bem$v("content", [direction, {
          center,
          square,
          reverse,
          clickable,
          surround: border && gutter
        }]), {
          [BORDER]: border
        }];
        return vue.createVNode("div", {
          "class": [bem$v({
            square
          })],
          "style": rootStyle.value
        }, [vue.createVNode("div", {
          "role": clickable ? "button" : void 0,
          "class": classes,
          "style": contentStyle.value,
          "tabindex": clickable ? 0 : void 0,
          "onClick": route2
        }, [renderContent()])]);
      };
    }
  });
  var GridItem = withInstall(_GridItem);
  var getDistance = (touches) => Math.sqrt(Math.pow(touches[0].clientX - touches[1].clientX, 2) + Math.pow(touches[0].clientY - touches[1].clientY, 2));
  var bem$u = createNamespace("image-preview")[1];
  var ImagePreviewItem = vue.defineComponent({
    props: {
      src: String,
      show: Boolean,
      active: Number,
      minZoom: makeRequiredProp(numericProp),
      maxZoom: makeRequiredProp(numericProp),
      rootWidth: makeRequiredProp(Number),
      rootHeight: makeRequiredProp(Number)
    },
    emits: ["scale", "close"],
    setup(props2, {
      emit
    }) {
      var state = vue.reactive({
        scale: 1,
        moveX: 0,
        moveY: 0,
        moving: false,
        zooming: false,
        imageRatio: 0,
        displayWidth: 0,
        displayHeight: 0
      });
      var touch = useTouch();
      var vertical = vue.computed(() => {
        var {
          rootWidth,
          rootHeight
        } = props2;
        var rootRatio = rootHeight / rootWidth;
        return state.imageRatio > rootRatio;
      });
      var imageStyle = vue.computed(() => {
        var {
          scale,
          moveX,
          moveY,
          moving,
          zooming
        } = state;
        var style = {
          transitionDuration: zooming || moving ? "0s" : ".3s"
        };
        if (scale !== 1) {
          var offsetX = moveX / scale;
          var offsetY = moveY / scale;
          style.transform = "scale(" + scale + ", " + scale + ") translate(" + offsetX + "px, " + offsetY + "px)";
        }
        return style;
      });
      var maxMoveX = vue.computed(() => {
        if (state.imageRatio) {
          var {
            rootWidth,
            rootHeight
          } = props2;
          var displayWidth = vertical.value ? rootHeight / state.imageRatio : rootWidth;
          return Math.max(0, (state.scale * displayWidth - rootWidth) / 2);
        }
        return 0;
      });
      var maxMoveY = vue.computed(() => {
        if (state.imageRatio) {
          var {
            rootWidth,
            rootHeight
          } = props2;
          var displayHeight = vertical.value ? rootHeight : rootWidth * state.imageRatio;
          return Math.max(0, (state.scale * displayHeight - rootHeight) / 2);
        }
        return 0;
      });
      var setScale = (scale) => {
        scale = clamp(scale, +props2.minZoom, +props2.maxZoom);
        if (scale !== state.scale) {
          state.scale = scale;
          emit("scale", {
            scale,
            index: props2.active
          });
        }
      };
      var resetScale = () => {
        setScale(1);
        state.moveX = 0;
        state.moveY = 0;
      };
      var toggleScale = () => {
        var scale = state.scale > 1 ? 1 : 2;
        setScale(scale);
        state.moveX = 0;
        state.moveY = 0;
      };
      var startMoveX;
      var startMoveY;
      var startScale;
      var startDistance;
      var doubleTapTimer;
      var touchStartTime;
      var onTouchStart = (event) => {
        var {
          touches
        } = event;
        var {
          offsetX
        } = touch;
        touch.start(event);
        startMoveX = state.moveX;
        startMoveY = state.moveY;
        touchStartTime = Date.now();
        state.moving = touches.length === 1 && state.scale !== 1;
        state.zooming = touches.length === 2 && !offsetX.value;
        if (state.zooming) {
          startScale = state.scale;
          startDistance = getDistance(event.touches);
        }
      };
      var onTouchMove = (event) => {
        var {
          touches
        } = event;
        touch.move(event);
        if (state.moving || state.zooming) {
          preventDefault(event, true);
        }
        if (state.moving) {
          var {
            deltaX,
            deltaY
          } = touch;
          var moveX = deltaX.value + startMoveX;
          var moveY = deltaY.value + startMoveY;
          state.moveX = clamp(moveX, -maxMoveX.value, maxMoveX.value);
          state.moveY = clamp(moveY, -maxMoveY.value, maxMoveY.value);
        }
        if (state.zooming && touches.length === 2) {
          var distance = getDistance(touches);
          var scale = startScale * distance / startDistance;
          setScale(scale);
        }
      };
      var checkTap = () => {
        var {
          offsetX,
          offsetY
        } = touch;
        var deltaTime = Date.now() - touchStartTime;
        var TAP_TIME = 250;
        var TAP_OFFSET = 10;
        if (offsetX.value < TAP_OFFSET && offsetY.value < TAP_OFFSET && deltaTime < TAP_TIME) {
          if (doubleTapTimer) {
            clearTimeout(doubleTapTimer);
            doubleTapTimer = null;
            toggleScale();
          } else {
            doubleTapTimer = setTimeout(() => {
              emit("close");
              doubleTapTimer = null;
            }, TAP_TIME);
          }
        }
      };
      var onTouchEnd = (event) => {
        var stopPropagation2 = false;
        if (state.moving || state.zooming) {
          stopPropagation2 = true;
          if (state.moving && startMoveX === state.moveX && startMoveY === state.moveY) {
            stopPropagation2 = false;
          }
          if (!event.touches.length) {
            if (state.zooming) {
              state.moveX = clamp(state.moveX, -maxMoveX.value, maxMoveX.value);
              state.moveY = clamp(state.moveY, -maxMoveY.value, maxMoveY.value);
              state.zooming = false;
            }
            state.moving = false;
            startMoveX = 0;
            startMoveY = 0;
            startScale = 1;
            if (state.scale < 1) {
              resetScale();
            }
          }
        }
        preventDefault(event, stopPropagation2);
        checkTap();
        touch.reset();
      };
      var onLoad = (event) => {
        var {
          naturalWidth,
          naturalHeight
        } = event.target;
        state.imageRatio = naturalHeight / naturalWidth;
      };
      vue.watch(() => props2.active, resetScale);
      vue.watch(() => props2.show, (value) => {
        if (!value) {
          resetScale();
        }
      });
      return () => {
        var imageSlots = {
          loading: () => vue.createVNode(Loading, {
            "type": "spinner"
          }, null)
        };
        return vue.createVNode(SwipeItem, {
          "class": bem$u("swipe-item"),
          "onTouchstart": onTouchStart,
          "onTouchmove": onTouchMove,
          "onTouchend": onTouchEnd,
          "onTouchcancel": onTouchEnd
        }, {
          default: () => [vue.createVNode(Image$1, {
            "src": props2.src,
            "fit": "contain",
            "class": bem$u("image", {
              vertical: vertical.value
            }),
            "style": imageStyle.value,
            "onLoad": onLoad
          }, imageSlots)]
        });
      };
    }
  });
  var [name$t, bem$t] = createNamespace("image-preview");
  var popupProps$1 = ["show", "transition", "overlayStyle", "closeOnPopstate"];
  var props$9 = {
    show: Boolean,
    loop: truthProp,
    images: makeArrayProp(),
    minZoom: makeNumericProp(1 / 3),
    maxZoom: makeNumericProp(3),
    overlay: truthProp,
    closeable: Boolean,
    showIndex: truthProp,
    className: unknownProp,
    closeIcon: makeStringProp("clear"),
    transition: String,
    beforeClose: Function,
    overlayStyle: Object,
    swipeDuration: makeNumericProp(300),
    startPosition: makeNumericProp(0),
    showIndicators: Boolean,
    closeOnPopstate: truthProp,
    closeIconPosition: makeStringProp("top-right")
  };
  var VanImagePreview = vue.defineComponent({
    name: name$t,
    props: props$9,
    emits: ["scale", "close", "closed", "change", "update:show"],
    setup(props2, {
      emit,
      slots
    }) {
      var swipeRef = vue.ref();
      var windowSize = useWindowSize();
      var state = vue.reactive({
        active: 0,
        rootWidth: 0,
        rootHeight: 0
      });
      var resize = () => {
        if (swipeRef.value) {
          var rect = useRect(swipeRef.value.$el);
          state.rootWidth = rect.width;
          state.rootHeight = rect.height;
          swipeRef.value.resize();
        }
      };
      var emitScale = (args) => emit("scale", args);
      var updateShow = (show) => emit("update:show", show);
      var emitClose = () => {
        callInterceptor(props2.beforeClose, {
          args: [state.active],
          done: () => updateShow(false)
        });
      };
      var setActive = (active) => {
        if (active !== state.active) {
          state.active = active;
          emit("change", active);
        }
      };
      var renderIndex = () => {
        if (props2.showIndex) {
          return vue.createVNode("div", {
            "class": bem$t("index")
          }, [slots.index ? slots.index({
            index: state.active
          }) : state.active + 1 + " / " + props2.images.length]);
        }
      };
      var renderCover = () => {
        if (slots.cover) {
          return vue.createVNode("div", {
            "class": bem$t("cover")
          }, [slots.cover()]);
        }
      };
      var renderImages = () => vue.createVNode(Swipe, {
        "ref": swipeRef,
        "lazyRender": true,
        "loop": props2.loop,
        "class": bem$t("swipe"),
        "duration": props2.swipeDuration,
        "initialSwipe": props2.startPosition,
        "showIndicators": props2.showIndicators,
        "indicatorColor": "white",
        "onChange": setActive
      }, {
        default: () => [props2.images.map((image) => vue.createVNode(ImagePreviewItem, {
          "src": image,
          "show": props2.show,
          "active": state.active,
          "maxZoom": props2.maxZoom,
          "minZoom": props2.minZoom,
          "rootWidth": state.rootWidth,
          "rootHeight": state.rootHeight,
          "onScale": emitScale,
          "onClose": emitClose
        }, null))]
      });
      var renderClose = () => {
        if (props2.closeable) {
          return vue.createVNode(Icon, {
            "role": "button",
            "name": props2.closeIcon,
            "class": bem$t("close-icon", props2.closeIconPosition),
            "onClick": emitClose
          }, null);
        }
      };
      var onClosed = () => emit("closed");
      var swipeTo = (index2, options) => {
        var _swipeRef$value;
        return (_swipeRef$value = swipeRef.value) == null ? void 0 : _swipeRef$value.swipeTo(index2, options);
      };
      useExpose({
        swipeTo
      });
      vue.onMounted(resize);
      vue.watch([windowSize.width, windowSize.height], resize);
      vue.watch(() => props2.startPosition, (value) => setActive(+value));
      vue.watch(() => props2.show, (value) => {
        var {
          images,
          startPosition
        } = props2;
        if (value) {
          setActive(+startPosition);
          vue.nextTick(() => {
            resize();
            swipeTo(+startPosition, {
              immediate: true
            });
          });
        } else {
          emit("close", {
            index: state.active,
            url: images[state.active]
          });
        }
      });
      return () => vue.createVNode(Popup, vue.mergeProps({
        "class": [bem$t(), props2.className],
        "overlayClass": bem$t("overlay"),
        "onClosed": onClosed,
        "onUpdate:show": updateShow
      }, pick(props2, popupProps$1)), {
        default: () => [renderClose(), renderImages(), renderIndex(), renderCover()]
      });
    }
  });
  var instance$1;
  var defaultConfig = {
    loop: true,
    images: [],
    maxZoom: 3,
    minZoom: 1 / 3,
    onScale: void 0,
    onClose: void 0,
    onChange: void 0,
    teleport: "body",
    className: "",
    showIndex: true,
    closeable: false,
    closeIcon: "clear",
    transition: void 0,
    beforeClose: void 0,
    overlayStyle: void 0,
    startPosition: 0,
    swipeDuration: 300,
    showIndicators: false,
    closeOnPopstate: true,
    closeIconPosition: "top-right"
  };
  function initInstance$1() {
    ({
      instance: instance$1
    } = mountComponent({
      setup() {
        var {
          state,
          toggle
        } = usePopupState();
        var onClosed = () => {
          state.images = [];
        };
        return () => vue.createVNode(VanImagePreview, vue.mergeProps(state, {
          "onClosed": onClosed,
          "onUpdate:show": toggle
        }), null);
      }
    }));
  }
  var ImagePreview = (options, startPosition = 0) => {
    if (!inBrowser$1) {
      return;
    }
    if (!instance$1) {
      initInstance$1();
    }
    options = Array.isArray(options) ? {
      images: options,
      startPosition
    } : options;
    instance$1.open(extend({}, defaultConfig, options));
    return instance$1;
  };
  ImagePreview.Component = withInstall(VanImagePreview);
  ImagePreview.install = (app) => {
    app.use(ImagePreview.Component);
  };
  function genAlphabet() {
    var charCodeOfA = "A".charCodeAt(0);
    var indexList = Array(26).fill("").map((_, i) => String.fromCharCode(charCodeOfA + i));
    return indexList;
  }
  var [name$s, bem$s] = createNamespace("index-bar");
  var props$8 = {
    sticky: truthProp,
    zIndex: numericProp,
    teleport: [String, Object],
    highlightColor: String,
    stickyOffsetTop: makeNumberProp(0),
    indexList: {
      type: Array,
      default: genAlphabet
    }
  };
  var INDEX_BAR_KEY = Symbol(name$s);
  var _IndexBar = vue.defineComponent({
    name: name$s,
    props: props$8,
    emits: ["select", "change"],
    setup(props2, {
      emit,
      slots
    }) {
      var root = vue.ref();
      var activeAnchor = vue.ref("");
      var touch = useTouch();
      var scrollParent = useScrollParent(root);
      var {
        children,
        linkChildren
      } = useChildren(INDEX_BAR_KEY);
      linkChildren({
        props: props2
      });
      var sidebarStyle = vue.computed(() => {
        if (isDef(props2.zIndex)) {
          return {
            zIndex: +props2.zIndex + 1
          };
        }
      });
      var highlightStyle = vue.computed(() => {
        if (props2.highlightColor) {
          return {
            color: props2.highlightColor
          };
        }
      });
      var getActiveAnchor = (scrollTop, rects) => {
        for (var i = children.length - 1; i >= 0; i--) {
          var prevHeight = i > 0 ? rects[i - 1].height : 0;
          var reachTop = props2.sticky ? prevHeight + props2.stickyOffsetTop : 0;
          if (scrollTop + reachTop >= rects[i].top) {
            return i;
          }
        }
        return -1;
      };
      var onScroll = () => {
        if (isHidden(root)) {
          return;
        }
        var {
          sticky,
          indexList
        } = props2;
        var scrollTop = getScrollTop(scrollParent.value);
        var scrollParentRect = useRect(scrollParent);
        var rects = children.map((item) => item.getRect(scrollParent.value, scrollParentRect));
        var active = getActiveAnchor(scrollTop, rects);
        activeAnchor.value = indexList[active];
        if (sticky) {
          children.forEach((item, index2) => {
            var {
              state,
              $el
            } = item;
            if (index2 === active || index2 === active - 1) {
              var rect = $el.getBoundingClientRect();
              state.left = rect.left;
              state.width = rect.width;
            } else {
              state.left = null;
              state.width = null;
            }
            if (index2 === active) {
              state.active = true;
              state.top = Math.max(props2.stickyOffsetTop, rects[index2].top - scrollTop) + scrollParentRect.top;
            } else if (index2 === active - 1) {
              var activeItemTop = rects[active].top - scrollTop;
              state.active = activeItemTop > 0;
              state.top = activeItemTop + scrollParentRect.top - rects[index2].height;
            } else {
              state.active = false;
            }
          });
        }
      };
      var init = () => vue.nextTick(onScroll);
      useEventListener("scroll", onScroll, {
        target: scrollParent
      });
      vue.onMounted(init);
      vue.watch(() => props2.indexList, init);
      vue.watch(activeAnchor, (value) => {
        if (value) {
          emit("change", value);
        }
      });
      var renderIndexes = () => props2.indexList.map((index2) => {
        var active = index2 === activeAnchor.value;
        return vue.createVNode("span", {
          "class": bem$s("index", {
            active
          }),
          "style": active ? highlightStyle.value : void 0,
          "data-index": index2
        }, [index2]);
      });
      var scrollTo = (index2) => {
        index2 = String(index2);
        var match = children.find((item) => String(item.index) === index2);
        if (match) {
          match.$el.scrollIntoView();
          if (props2.sticky && props2.stickyOffsetTop) {
            setRootScrollTop(getRootScrollTop() - props2.stickyOffsetTop);
          }
          emit("select", match.index);
        }
      };
      var scrollToElement = (element) => {
        var {
          index: index2
        } = element.dataset;
        if (index2) {
          scrollTo(index2);
        }
      };
      var onClickSidebar = (event) => {
        scrollToElement(event.target);
      };
      var touchActiveIndex;
      var onTouchMove = (event) => {
        touch.move(event);
        if (touch.isVertical()) {
          preventDefault(event);
          var {
            clientX,
            clientY
          } = event.touches[0];
          var target = document.elementFromPoint(clientX, clientY);
          if (target) {
            var {
              index: index2
            } = target.dataset;
            if (index2 && touchActiveIndex !== index2) {
              touchActiveIndex = index2;
              scrollToElement(target);
            }
          }
        }
      };
      var renderSidebar = () => vue.createVNode("div", {
        "class": bem$s("sidebar"),
        "style": sidebarStyle.value,
        "onClick": onClickSidebar,
        "onTouchstart": touch.start,
        "onTouchmove": onTouchMove
      }, [renderIndexes()]);
      useExpose({
        scrollTo
      });
      return () => vue.createVNode("div", {
        "ref": root,
        "class": bem$s()
      }, [props2.teleport ? vue.createVNode(vue.Teleport, {
        "to": props2.teleport
      }, {
        default: () => [renderSidebar()]
      }) : renderSidebar(), slots.default == null ? void 0 : slots.default()]);
    }
  });
  var [name$r, bem$r] = createNamespace("index-anchor");
  var _IndexAnchor = vue.defineComponent({
    name: name$r,
    props: {
      index: numericProp
    },
    setup(props2, {
      slots
    }) {
      var state = vue.reactive({
        top: 0,
        left: null,
        rect: {
          top: 0,
          height: 0
        },
        width: null,
        active: false
      });
      var root = vue.ref();
      var {
        parent
      } = useParent(INDEX_BAR_KEY);
      if (!parent) {
        return;
      }
      var isSticky = () => state.active && parent.props.sticky;
      var anchorStyle = vue.computed(() => {
        var {
          zIndex,
          highlightColor
        } = parent.props;
        if (isSticky()) {
          return extend(getZIndexStyle(zIndex), {
            left: state.left ? state.left + "px" : void 0,
            width: state.width ? state.width + "px" : void 0,
            transform: state.top ? "translate3d(0, " + state.top + "px, 0)" : void 0,
            color: highlightColor
          });
        }
      });
      var getRect = (scrollParent, scrollParentRect) => {
        var rootRect = useRect(root);
        state.rect.height = rootRect.height;
        if (scrollParent === window || scrollParent === document.body) {
          state.rect.top = rootRect.top + getRootScrollTop();
        } else {
          state.rect.top = rootRect.top + getScrollTop(scrollParent) - scrollParentRect.top;
        }
        return state.rect;
      };
      useExpose({
        state,
        getRect
      });
      return () => {
        var sticky = isSticky();
        return vue.createVNode("div", {
          "ref": root,
          "style": {
            height: sticky ? state.rect.height + "px" : void 0
          }
        }, [vue.createVNode("div", {
          "style": anchorStyle.value,
          "class": [bem$r({
            sticky
          }), {
            [BORDER_BOTTOM]: sticky
          }]
        }, [slots.default ? slots.default() : props2.index])]);
      };
    }
  });
  var IndexAnchor = withInstall(_IndexAnchor);
  var IndexBar = withInstall(_IndexBar);
  var hasIntersectionObserver = inBrowser && "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype;
  var modeType = {
    event: "event",
    observer: "observer"
  };
  function remove(arr, item) {
    if (!arr.length)
      return;
    var index2 = arr.indexOf(item);
    if (index2 > -1)
      return arr.splice(index2, 1);
  }
  function getBestSelectionFromSrcset(el, scale) {
    if (el.tagName !== "IMG" || !el.getAttribute("data-srcset"))
      return;
    var options = el.getAttribute("data-srcset");
    var container = el.parentNode;
    var containerWidth = container.offsetWidth * scale;
    var spaceIndex;
    var tmpSrc;
    var tmpWidth;
    options = options.trim().split(",");
    var result = options.map((item) => {
      item = item.trim();
      spaceIndex = item.lastIndexOf(" ");
      if (spaceIndex === -1) {
        tmpSrc = item;
        tmpWidth = 999998;
      } else {
        tmpSrc = item.substr(0, spaceIndex);
        tmpWidth = parseInt(item.substr(spaceIndex + 1, item.length - spaceIndex - 2), 10);
      }
      return [tmpWidth, tmpSrc];
    });
    result.sort((a, b) => {
      if (a[0] < b[0]) {
        return 1;
      }
      if (a[0] > b[0]) {
        return -1;
      }
      if (a[0] === b[0]) {
        if (b[1].indexOf(".webp", b[1].length - 5) !== -1) {
          return 1;
        }
        if (a[1].indexOf(".webp", a[1].length - 5) !== -1) {
          return -1;
        }
      }
      return 0;
    });
    var bestSelectedSrc = "";
    var tmpOption;
    for (var i = 0; i < result.length; i++) {
      tmpOption = result[i];
      bestSelectedSrc = tmpOption[1];
      var next = result[i + 1];
      if (next && next[0] < containerWidth) {
        bestSelectedSrc = tmpOption[1];
        break;
      } else if (!next) {
        bestSelectedSrc = tmpOption[1];
        break;
      }
    }
    return bestSelectedSrc;
  }
  var getDPR = (scale = 1) => inBrowser ? window.devicePixelRatio || scale : scale;
  function supportWebp() {
    if (!inBrowser)
      return false;
    var support = true;
    try {
      var elem = document.createElement("canvas");
      if (elem.getContext && elem.getContext("2d")) {
        support = elem.toDataURL("image/webp").indexOf("data:image/webp") === 0;
      }
    } catch (err) {
      support = false;
    }
    return support;
  }
  function throttle(action, delay) {
    var timeout = null;
    var lastRun = 0;
    return function(...args) {
      if (timeout) {
        return;
      }
      var elapsed = Date.now() - lastRun;
      var runCallback = () => {
        lastRun = Date.now();
        timeout = false;
        action.apply(this, args);
      };
      if (elapsed >= delay) {
        runCallback();
      } else {
        timeout = setTimeout(runCallback, delay);
      }
    };
  }
  function on(el, type, func) {
    el.addEventListener(type, func, {
      capture: false,
      passive: true
    });
  }
  function off(el, type, func) {
    el.removeEventListener(type, func, false);
  }
  var loadImageAsync = (item, resolve, reject) => {
    var image = new Image();
    if (!item || !item.src) {
      var err = new Error("image src is required");
      return reject(err);
    }
    image.src = item.src;
    if (item.cors) {
      image.crossOrigin = item.cors;
    }
    image.onload = () => resolve({
      naturalHeight: image.naturalHeight,
      naturalWidth: image.naturalWidth,
      src: image.src
    });
    image.onerror = (e) => reject(e);
  };
  function isObject(obj) {
    return obj !== null && typeof obj === "object";
  }
  function noop() {
  }
  class ImageCache {
    constructor({
      max
    }) {
      this.options = {
        max: max || 100
      };
      this._caches = [];
    }
    has(key) {
      return this._caches.indexOf(key) > -1;
    }
    add(key) {
      if (this.has(key))
        return;
      this._caches.push(key);
      if (this._caches.length > this.options.max) {
        this.free();
      }
    }
    free() {
      this._caches.shift();
    }
  }
  class ReactiveListener {
    constructor({
      el,
      src,
      error,
      loading,
      bindType,
      $parent,
      options,
      cors,
      elRenderer,
      imageCache
    }) {
      this.el = el;
      this.src = src;
      this.error = error;
      this.loading = loading;
      this.bindType = bindType;
      this.attempt = 0;
      this.cors = cors;
      this.naturalHeight = 0;
      this.naturalWidth = 0;
      this.options = options;
      this.rect = null;
      this.$parent = $parent;
      this.elRenderer = elRenderer;
      this._imageCache = imageCache;
      this.performanceData = {
        loadStart: 0,
        loadEnd: 0
      };
      this.filter();
      this.initState();
      this.render("loading", false);
    }
    initState() {
      if ("dataset" in this.el) {
        this.el.dataset.src = this.src;
      } else {
        this.el.setAttribute("data-src", this.src);
      }
      this.state = {
        loading: false,
        error: false,
        loaded: false,
        rendered: false
      };
    }
    record(event) {
      this.performanceData[event] = Date.now();
    }
    update({
      src,
      loading,
      error
    }) {
      var oldSrc = this.src;
      this.src = src;
      this.loading = loading;
      this.error = error;
      this.filter();
      if (oldSrc !== this.src) {
        this.attempt = 0;
        this.initState();
      }
    }
    getRect() {
      this.rect = this.el.getBoundingClientRect();
    }
    checkInView() {
      this.getRect();
      return this.rect.top < window.innerHeight * this.options.preLoad && this.rect.bottom > this.options.preLoadTop && this.rect.left < window.innerWidth * this.options.preLoad && this.rect.right > 0;
    }
    filter() {
      Object.keys(this.options.filter).forEach((key) => {
        this.options.filter[key](this, this.options);
      });
    }
    renderLoading(cb) {
      this.state.loading = true;
      loadImageAsync({
        src: this.loading,
        cors: this.cors
      }, () => {
        this.render("loading", false);
        this.state.loading = false;
        cb();
      }, () => {
        cb();
        this.state.loading = false;
      });
    }
    load(onFinish = noop) {
      if (this.attempt > this.options.attempt - 1 && this.state.error) {
        onFinish();
        return;
      }
      if (this.state.rendered && this.state.loaded)
        return;
      if (this._imageCache.has(this.src)) {
        this.state.loaded = true;
        this.render("loaded", true);
        this.state.rendered = true;
        return onFinish();
      }
      this.renderLoading(() => {
        var _this$options$adapter, _this$options$adapter2;
        this.attempt++;
        (_this$options$adapter = (_this$options$adapter2 = this.options.adapter).beforeLoad) == null ? void 0 : _this$options$adapter.call(_this$options$adapter2, this, this.options);
        this.record("loadStart");
        loadImageAsync({
          src: this.src,
          cors: this.cors
        }, (data) => {
          this.naturalHeight = data.naturalHeight;
          this.naturalWidth = data.naturalWidth;
          this.state.loaded = true;
          this.state.error = false;
          this.record("loadEnd");
          this.render("loaded", false);
          this.state.rendered = true;
          this._imageCache.add(this.src);
          onFinish();
        }, (err) => {
          !this.options.silent && console.error(err);
          this.state.error = true;
          this.state.loaded = false;
          this.render("error", false);
        });
      });
    }
    render(state, cache) {
      this.elRenderer(this, state, cache);
    }
    performance() {
      var state = "loading";
      var time = 0;
      if (this.state.loaded) {
        state = "loaded";
        time = (this.performanceData.loadEnd - this.performanceData.loadStart) / 1e3;
      }
      if (this.state.error)
        state = "error";
      return {
        src: this.src,
        state,
        time
      };
    }
    $destroy() {
      this.el = null;
      this.src = null;
      this.error = null;
      this.loading = null;
      this.bindType = null;
      this.attempt = 0;
    }
  }
  var DEFAULT_URL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  var DEFAULT_EVENTS = ["scroll", "wheel", "mousewheel", "resize", "animationend", "transitionend", "touchmove"];
  var DEFAULT_OBSERVER_OPTIONS = {
    rootMargin: "0px",
    threshold: 0
  };
  function Lazy() {
    return class Lazy {
      constructor({
        preLoad,
        error,
        throttleWait,
        preLoadTop,
        dispatchEvent,
        loading,
        attempt,
        silent = true,
        scale,
        listenEvents,
        filter,
        adapter,
        observer,
        observerOptions
      }) {
        this.mode = modeType.event;
        this.ListenerQueue = [];
        this.TargetIndex = 0;
        this.TargetQueue = [];
        this.options = {
          silent,
          dispatchEvent: !!dispatchEvent,
          throttleWait: throttleWait || 200,
          preLoad: preLoad || 1.3,
          preLoadTop: preLoadTop || 0,
          error: error || DEFAULT_URL,
          loading: loading || DEFAULT_URL,
          attempt: attempt || 3,
          scale: scale || getDPR(scale),
          ListenEvents: listenEvents || DEFAULT_EVENTS,
          hasbind: false,
          supportWebp: supportWebp(),
          filter: filter || {},
          adapter: adapter || {},
          observer: !!observer,
          observerOptions: observerOptions || DEFAULT_OBSERVER_OPTIONS
        };
        this._initEvent();
        this._imageCache = new ImageCache({
          max: 200
        });
        this.lazyLoadHandler = throttle(this._lazyLoadHandler.bind(this), this.options.throttleWait);
        this.setMode(this.options.observer ? modeType.observer : modeType.event);
      }
      config(options = {}) {
        Object.assign(this.options, options);
      }
      performance() {
        return this.ListenerQueue.map((item) => item.performance());
      }
      addLazyBox(vm) {
        this.ListenerQueue.push(vm);
        if (inBrowser) {
          this._addListenerTarget(window);
          this._observer && this._observer.observe(vm.el);
          if (vm.$el && vm.$el.parentNode) {
            this._addListenerTarget(vm.$el.parentNode);
          }
        }
      }
      add(el, binding, vnode) {
        if (this.ListenerQueue.some((item) => item.el === el)) {
          this.update(el, binding);
          return vue.nextTick(this.lazyLoadHandler);
        }
        var value = this._valueFormatter(binding.value);
        var {
          src
        } = value;
        vue.nextTick(() => {
          src = getBestSelectionFromSrcset(el, this.options.scale) || src;
          this._observer && this._observer.observe(el);
          var container = Object.keys(binding.modifiers)[0];
          var $parent;
          if (container) {
            $parent = vnode.context.$refs[container];
            $parent = $parent ? $parent.$el || $parent : document.getElementById(container);
          }
          if (!$parent) {
            $parent = getScrollParent$1(el);
          }
          var newListener = new ReactiveListener({
            bindType: binding.arg,
            $parent,
            el,
            src,
            loading: value.loading,
            error: value.error,
            cors: value.cors,
            elRenderer: this._elRenderer.bind(this),
            options: this.options,
            imageCache: this._imageCache
          });
          this.ListenerQueue.push(newListener);
          if (inBrowser) {
            this._addListenerTarget(window);
            this._addListenerTarget($parent);
          }
          this.lazyLoadHandler();
          vue.nextTick(() => this.lazyLoadHandler());
        });
      }
      update(el, binding, vnode) {
        var value = this._valueFormatter(binding.value);
        var {
          src
        } = value;
        src = getBestSelectionFromSrcset(el, this.options.scale) || src;
        var exist = this.ListenerQueue.find((item) => item.el === el);
        if (!exist) {
          this.add(el, binding, vnode);
        } else {
          exist.update({
            src,
            error: value.error,
            loading: value.loading
          });
        }
        if (this._observer) {
          this._observer.unobserve(el);
          this._observer.observe(el);
        }
        this.lazyLoadHandler();
        vue.nextTick(() => this.lazyLoadHandler());
      }
      remove(el) {
        if (!el)
          return;
        this._observer && this._observer.unobserve(el);
        var existItem = this.ListenerQueue.find((item) => item.el === el);
        if (existItem) {
          this._removeListenerTarget(existItem.$parent);
          this._removeListenerTarget(window);
          remove(this.ListenerQueue, existItem);
          existItem.$destroy();
        }
      }
      removeComponent(vm) {
        if (!vm)
          return;
        remove(this.ListenerQueue, vm);
        this._observer && this._observer.unobserve(vm.el);
        if (vm.$parent && vm.$el.parentNode) {
          this._removeListenerTarget(vm.$el.parentNode);
        }
        this._removeListenerTarget(window);
      }
      setMode(mode) {
        if (!hasIntersectionObserver && mode === modeType.observer) {
          mode = modeType.event;
        }
        this.mode = mode;
        if (mode === modeType.event) {
          if (this._observer) {
            this.ListenerQueue.forEach((listener) => {
              this._observer.unobserve(listener.el);
            });
            this._observer = null;
          }
          this.TargetQueue.forEach((target) => {
            this._initListen(target.el, true);
          });
        } else {
          this.TargetQueue.forEach((target) => {
            this._initListen(target.el, false);
          });
          this._initIntersectionObserver();
        }
      }
      _addListenerTarget(el) {
        if (!el)
          return;
        var target = this.TargetQueue.find((target2) => target2.el === el);
        if (!target) {
          target = {
            el,
            id: ++this.TargetIndex,
            childrenCount: 1,
            listened: true
          };
          this.mode === modeType.event && this._initListen(target.el, true);
          this.TargetQueue.push(target);
        } else {
          target.childrenCount++;
        }
        return this.TargetIndex;
      }
      _removeListenerTarget(el) {
        this.TargetQueue.forEach((target, index2) => {
          if (target.el === el) {
            target.childrenCount--;
            if (!target.childrenCount) {
              this._initListen(target.el, false);
              this.TargetQueue.splice(index2, 1);
              target = null;
            }
          }
        });
      }
      _initListen(el, start2) {
        this.options.ListenEvents.forEach((evt) => (start2 ? on : off)(el, evt, this.lazyLoadHandler));
      }
      _initEvent() {
        this.Event = {
          listeners: {
            loading: [],
            loaded: [],
            error: []
          }
        };
        this.$on = (event, func) => {
          if (!this.Event.listeners[event])
            this.Event.listeners[event] = [];
          this.Event.listeners[event].push(func);
        };
        this.$once = (event, func) => {
          var on2 = (...args) => {
            this.$off(event, on2);
            func.apply(this, args);
          };
          this.$on(event, on2);
        };
        this.$off = (event, func) => {
          if (!func) {
            if (!this.Event.listeners[event])
              return;
            this.Event.listeners[event].length = 0;
            return;
          }
          remove(this.Event.listeners[event], func);
        };
        this.$emit = (event, context, inCache) => {
          if (!this.Event.listeners[event])
            return;
          this.Event.listeners[event].forEach((func) => func(context, inCache));
        };
      }
      _lazyLoadHandler() {
        var freeList = [];
        this.ListenerQueue.forEach((listener) => {
          if (!listener.el || !listener.el.parentNode) {
            freeList.push(listener);
          }
          var catIn = listener.checkInView();
          if (!catIn)
            return;
          listener.load();
        });
        freeList.forEach((item) => {
          remove(this.ListenerQueue, item);
          item.$destroy();
        });
      }
      _initIntersectionObserver() {
        if (!hasIntersectionObserver) {
          return;
        }
        this._observer = new IntersectionObserver(this._observerHandler.bind(this), this.options.observerOptions);
        if (this.ListenerQueue.length) {
          this.ListenerQueue.forEach((listener) => {
            this._observer.observe(listener.el);
          });
        }
      }
      _observerHandler(entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.ListenerQueue.forEach((listener) => {
              if (listener.el === entry.target) {
                if (listener.state.loaded)
                  return this._observer.unobserve(listener.el);
                listener.load();
              }
            });
          }
        });
      }
      _elRenderer(listener, state, cache) {
        if (!listener.el)
          return;
        var {
          el,
          bindType
        } = listener;
        var src;
        switch (state) {
          case "loading":
            src = listener.loading;
            break;
          case "error":
            src = listener.error;
            break;
          default:
            ({
              src
            } = listener);
            break;
        }
        if (bindType) {
          el.style[bindType] = 'url("' + src + '")';
        } else if (el.getAttribute("src") !== src) {
          el.setAttribute("src", src);
        }
        el.setAttribute("lazy", state);
        this.$emit(state, listener, cache);
        this.options.adapter[state] && this.options.adapter[state](listener, this.options);
        if (this.options.dispatchEvent) {
          var event = new CustomEvent(state, {
            detail: listener
          });
          el.dispatchEvent(event);
        }
      }
      _valueFormatter(value) {
        var src = value;
        var {
          loading,
          error
        } = this.options;
        if (isObject(value)) {
          ({
            src
          } = value);
          loading = value.loading || this.options.loading;
          error = value.error || this.options.error;
        }
        return {
          src,
          loading,
          error
        };
      }
    };
  }
  var LazyComponent = (lazy) => ({
    props: {
      tag: {
        type: String,
        default: "div"
      }
    },
    emits: ["show"],
    render() {
      return vue.h(this.tag, this.show && this.$slots.default ? this.$slots.default() : null);
    },
    data() {
      return {
        el: null,
        state: {
          loaded: false
        },
        rect: {},
        show: false
      };
    },
    mounted() {
      this.el = this.$el;
      lazy.addLazyBox(this);
      lazy.lazyLoadHandler();
    },
    beforeUnmount() {
      lazy.removeComponent(this);
    },
    methods: {
      getRect() {
        this.rect = this.$el.getBoundingClientRect();
      },
      checkInView() {
        this.getRect();
        return inBrowser && this.rect.top < window.innerHeight * lazy.options.preLoad && this.rect.bottom > 0 && this.rect.left < window.innerWidth * lazy.options.preLoad && this.rect.right > 0;
      },
      load() {
        this.show = true;
        this.state.loaded = true;
        this.$emit("show", this);
      },
      destroy() {
        return this.$destroy;
      }
    }
  });
  var defaultOptions = {
    selector: "img"
  };
  class LazyContainer {
    constructor({
      el,
      binding,
      vnode,
      lazy
    }) {
      this.el = null;
      this.vnode = vnode;
      this.binding = binding;
      this.options = {};
      this.lazy = lazy;
      this._queue = [];
      this.update({
        el,
        binding
      });
    }
    update({
      el,
      binding
    }) {
      this.el = el;
      this.options = Object.assign({}, defaultOptions, binding.value);
      var imgs = this.getImgs();
      imgs.forEach((el2) => {
        this.lazy.add(el2, Object.assign({}, this.binding, {
          value: {
            src: "dataset" in el2 ? el2.dataset.src : el2.getAttribute("data-src"),
            error: ("dataset" in el2 ? el2.dataset.error : el2.getAttribute("data-error")) || this.options.error,
            loading: ("dataset" in el2 ? el2.dataset.loading : el2.getAttribute("data-loading")) || this.options.loading
          }
        }), this.vnode);
      });
    }
    getImgs() {
      return Array.from(this.el.querySelectorAll(this.options.selector));
    }
    clear() {
      var imgs = this.getImgs();
      imgs.forEach((el) => this.lazy.remove(el));
      this.vnode = null;
      this.binding = null;
      this.lazy = null;
    }
  }
  class LazyContainerManager {
    constructor({
      lazy
    }) {
      this.lazy = lazy;
      this._queue = [];
    }
    bind(el, binding, vnode) {
      var container = new LazyContainer({
        el,
        binding,
        vnode,
        lazy: this.lazy
      });
      this._queue.push(container);
    }
    update(el, binding, vnode) {
      var container = this._queue.find((item) => item.el === el);
      if (!container)
        return;
      container.update({
        el,
        binding,
        vnode
      });
    }
    unbind(el) {
      var container = this._queue.find((item) => item.el === el);
      if (!container)
        return;
      container.clear();
      remove(this._queue, container);
    }
  }
  var LazyImage = (lazyManager) => ({
    props: {
      src: [String, Object],
      tag: {
        type: String,
        default: "img"
      }
    },
    render(h) {
      return h(this.tag, {
        attrs: {
          src: this.renderSrc
        }
      }, this.$slots.default);
    },
    data() {
      return {
        el: null,
        options: {
          src: "",
          error: "",
          loading: "",
          attempt: lazyManager.options.attempt
        },
        state: {
          loaded: false,
          error: false,
          attempt: 0
        },
        rect: {},
        renderSrc: ""
      };
    },
    watch: {
      src() {
        this.init();
        lazyManager.addLazyBox(this);
        lazyManager.lazyLoadHandler();
      }
    },
    created() {
      this.init();
      this.renderSrc = this.options.loading;
    },
    mounted() {
      this.el = this.$el;
      lazyManager.addLazyBox(this);
      lazyManager.lazyLoadHandler();
    },
    beforeUnmount() {
      lazyManager.removeComponent(this);
    },
    methods: {
      init() {
        var {
          src,
          loading,
          error
        } = lazyManager._valueFormatter(this.src);
        this.state.loaded = false;
        this.options.src = src;
        this.options.error = error;
        this.options.loading = loading;
        this.renderSrc = this.options.loading;
      },
      getRect() {
        this.rect = this.$el.getBoundingClientRect();
      },
      checkInView() {
        this.getRect();
        return inBrowser && this.rect.top < window.innerHeight * lazyManager.options.preLoad && this.rect.bottom > 0 && this.rect.left < window.innerWidth * lazyManager.options.preLoad && this.rect.right > 0;
      },
      load(onFinish = noop) {
        if (this.state.attempt > this.options.attempt - 1 && this.state.error) {
          onFinish();
          return;
        }
        var {
          src
        } = this.options;
        loadImageAsync({
          src
        }, ({
          src: src2
        }) => {
          this.renderSrc = src2;
          this.state.loaded = true;
        }, () => {
          this.state.attempt++;
          this.renderSrc = this.options.error;
          this.state.error = true;
        });
      }
    }
  });
  var Lazyload = {
    install(app, options = {}) {
      var LazyClass = Lazy();
      var lazy = new LazyClass(options);
      var lazyContainer = new LazyContainerManager({
        lazy
      });
      app.config.globalProperties.$Lazyload = lazy;
      if (options.lazyComponent) {
        app.component("LazyComponent", LazyComponent(lazy));
      }
      if (options.lazyImage) {
        app.component("LazyImage", LazyImage(lazy));
      }
      app.directive("lazy", {
        beforeMount: lazy.add.bind(lazy),
        updated: lazy.update.bind(lazy),
        unmounted: lazy.remove.bind(lazy)
      });
      app.directive("lazy-container", {
        beforeMount: lazyContainer.bind.bind(lazyContainer),
        updated: lazyContainer.update.bind(lazyContainer),
        unmounted: lazyContainer.unbind.bind(lazyContainer)
      });
    }
  };
  var [name$q, bem$q, t$5] = createNamespace("list");
  var props$7 = {
    error: Boolean,
    offset: makeNumericProp(300),
    loading: Boolean,
    finished: Boolean,
    errorText: String,
    direction: makeStringProp("down"),
    loadingText: String,
    finishedText: String,
    immediateCheck: truthProp
  };
  var _List = vue.defineComponent({
    name: name$q,
    props: props$7,
    emits: ["load", "update:error", "update:loading"],
    setup(props2, {
      emit,
      slots
    }) {
      var loading = vue.ref(false);
      var root = vue.ref();
      var placeholder = vue.ref();
      var tabStatus = useTabStatus();
      var scrollParent = useScrollParent(root);
      var check = () => {
        vue.nextTick(() => {
          if (loading.value || props2.finished || props2.error || (tabStatus == null ? void 0 : tabStatus.value) === false) {
            return;
          }
          var {
            offset: offset2,
            direction
          } = props2;
          var scrollParentRect = useRect(scrollParent);
          if (!scrollParentRect.height || isHidden(root)) {
            return;
          }
          var isReachEdge = false;
          var placeholderRect = useRect(placeholder);
          if (direction === "up") {
            isReachEdge = scrollParentRect.top - placeholderRect.top <= offset2;
          } else {
            isReachEdge = placeholderRect.bottom - scrollParentRect.bottom <= offset2;
          }
          if (isReachEdge) {
            loading.value = true;
            emit("update:loading", true);
            emit("load");
          }
        });
      };
      var renderFinishedText = () => {
        if (props2.finished) {
          var text = slots.finished ? slots.finished() : props2.finishedText;
          if (text) {
            return vue.createVNode("div", {
              "class": bem$q("finished-text")
            }, [text]);
          }
        }
      };
      var clickErrorText = () => {
        emit("update:error", false);
        check();
      };
      var renderErrorText = () => {
        if (props2.error) {
          var text = slots.error ? slots.error() : props2.errorText;
          if (text) {
            return vue.createVNode("div", {
              "class": bem$q("error-text"),
              "onClick": clickErrorText
            }, [text]);
          }
        }
      };
      var renderLoading = () => {
        if (loading.value && !props2.finished) {
          return vue.createVNode("div", {
            "class": bem$q("loading")
          }, [slots.loading ? slots.loading() : vue.createVNode(Loading, {
            "class": bem$q("loading-icon")
          }, {
            default: () => [props2.loadingText || t$5("loading")]
          })]);
        }
      };
      vue.watch([() => props2.loading, () => props2.finished, () => props2.error], check);
      if (tabStatus) {
        vue.watch(tabStatus, (tabActive) => {
          if (tabActive) {
            check();
          }
        });
      }
      vue.onUpdated(() => {
        loading.value = props2.loading;
      });
      vue.onMounted(() => {
        if (props2.immediateCheck) {
          check();
        }
      });
      useExpose({
        check
      });
      useEventListener("scroll", check, {
        target: scrollParent
      });
      return () => {
        var Content = slots.default == null ? void 0 : slots.default();
        var Placeholder = vue.createVNode("div", {
          "ref": placeholder,
          "class": bem$q("placeholder")
        }, null);
        return vue.createVNode("div", {
          "ref": root,
          "role": "feed",
          "class": bem$q(),
          "aria-busy": loading.value
        }, [props2.direction === "down" ? Content : Placeholder, renderLoading(), renderFinishedText(), renderErrorText(), props2.direction === "up" ? Content : Placeholder]);
      };
    }
  });
  var List = withInstall(_List);
  function usePlaceholder(contentRef, bem2) {
    var height = useHeight(contentRef);
    return (renderContent) => vue.createVNode("div", {
      "class": bem2("placeholder"),
      "style": {
        height: height.value ? height.value + "px" : void 0
      }
    }, [renderContent()]);
  }
  var [name$p, bem$p] = createNamespace("nav-bar");
  var _NavBar = vue.defineComponent({
    name: name$p,
    props: {
      title: String,
      fixed: Boolean,
      zIndex: numericProp,
      border: truthProp,
      leftText: String,
      rightText: String,
      leftArrow: Boolean,
      placeholder: Boolean,
      safeAreaInsetTop: Boolean
    },
    emits: ["click-left", "click-right"],
    setup(props2, {
      emit,
      slots
    }) {
      var navBarRef = vue.ref();
      var renderPlaceholder = usePlaceholder(navBarRef, bem$p);
      var onClickLeft = (event) => emit("click-left", event);
      var onClickRight = (event) => emit("click-right", event);
      var renderLeft = () => {
        if (slots.left) {
          return slots.left();
        }
        return [props2.leftArrow && vue.createVNode(Icon, {
          "class": bem$p("arrow"),
          "name": "arrow-left"
        }, null), props2.leftText && vue.createVNode("span", {
          "class": bem$p("text")
        }, [props2.leftText])];
      };
      var renderRight = () => {
        if (slots.right) {
          return slots.right();
        }
        return vue.createVNode("span", {
          "class": bem$p("text")
        }, [props2.rightText]);
      };
      var renderNavBar = () => {
        var {
          title,
          fixed,
          border,
          zIndex
        } = props2;
        var style = getZIndexStyle(zIndex);
        var hasLeft = props2.leftArrow || props2.leftText || slots.left;
        var hasRight = props2.rightText || slots.right;
        return vue.createVNode("div", {
          "ref": navBarRef,
          "style": style,
          "class": [bem$p({
            fixed,
            "safe-area-inset-top": props2.safeAreaInsetTop
          }), {
            [BORDER_BOTTOM]: border
          }]
        }, [vue.createVNode("div", {
          "class": bem$p("content")
        }, [hasLeft && vue.createVNode("div", {
          "class": bem$p("left"),
          "onClick": onClickLeft
        }, [renderLeft()]), vue.createVNode("div", {
          "class": [bem$p("title"), "van-ellipsis"]
        }, [slots.title ? slots.title() : title]), hasRight && vue.createVNode("div", {
          "class": bem$p("right"),
          "onClick": onClickRight
        }, [renderRight()])])]);
      };
      return () => {
        if (props2.fixed && props2.placeholder) {
          return renderPlaceholder(renderNavBar);
        }
        return renderNavBar();
      };
    }
  });
  var NavBar = withInstall(_NavBar);
  var [name$o, bem$o] = createNamespace("notice-bar");
  var props$6 = {
    text: String,
    mode: String,
    color: String,
    delay: makeNumericProp(1),
    speed: makeNumericProp(60),
    leftIcon: String,
    wrapable: Boolean,
    background: String,
    scrollable: {
      type: Boolean,
      default: null
    }
  };
  var _NoticeBar = vue.defineComponent({
    name: name$o,
    props: props$6,
    emits: ["close", "replay"],
    setup(props2, {
      emit,
      slots
    }) {
      var wrapWidth = 0;
      var contentWidth = 0;
      var startTimer;
      var wrapRef = vue.ref();
      var contentRef = vue.ref();
      var state = vue.reactive({
        show: true,
        offset: 0,
        duration: 0
      });
      var renderLeftIcon = () => {
        if (slots["left-icon"]) {
          return slots["left-icon"]();
        }
        if (props2.leftIcon) {
          return vue.createVNode(Icon, {
            "class": bem$o("left-icon"),
            "name": props2.leftIcon
          }, null);
        }
      };
      var getRightIconName = () => {
        if (props2.mode === "closeable") {
          return "cross";
        }
        if (props2.mode === "link") {
          return "arrow";
        }
      };
      var onClickRightIcon = (event) => {
        if (props2.mode === "closeable") {
          state.show = false;
          emit("close", event);
        }
      };
      var renderRightIcon = () => {
        if (slots["right-icon"]) {
          return slots["right-icon"]();
        }
        var name2 = getRightIconName();
        if (name2) {
          return vue.createVNode(Icon, {
            "name": name2,
            "class": bem$o("right-icon"),
            "onClick": onClickRightIcon
          }, null);
        }
      };
      var onTransitionEnd = () => {
        state.offset = wrapWidth;
        state.duration = 0;
        raf(() => {
          doubleRaf(() => {
            state.offset = -contentWidth;
            state.duration = (contentWidth + wrapWidth) / +props2.speed;
            emit("replay");
          });
        });
      };
      var renderMarquee = () => {
        var ellipsis = props2.scrollable === false && !props2.wrapable;
        var style = {
          transform: state.offset ? "translateX(" + state.offset + "px)" : "",
          transitionDuration: state.duration + "s"
        };
        return vue.createVNode("div", {
          "ref": wrapRef,
          "role": "marquee",
          "class": bem$o("wrap")
        }, [vue.createVNode("div", {
          "ref": contentRef,
          "style": style,
          "class": [bem$o("content"), {
            "van-ellipsis": ellipsis
          }],
          "onTransitionend": onTransitionEnd
        }, [slots.default ? slots.default() : props2.text])]);
      };
      var reset = () => {
        var {
          delay,
          speed,
          scrollable
        } = props2;
        var ms = isDef(delay) ? +delay * 1e3 : 0;
        wrapWidth = 0;
        contentWidth = 0;
        state.offset = 0;
        state.duration = 0;
        clearTimeout(startTimer);
        startTimer = setTimeout(() => {
          if (!wrapRef.value || !contentRef.value || scrollable === false) {
            return;
          }
          var wrapRefWidth = useRect(wrapRef).width;
          var contentRefWidth = useRect(contentRef).width;
          if (scrollable || contentRefWidth > wrapRefWidth) {
            doubleRaf(() => {
              wrapWidth = wrapRefWidth;
              contentWidth = contentRefWidth;
              state.offset = -contentWidth;
              state.duration = contentWidth / +speed;
            });
          }
        }, ms);
      };
      onPopupReopen(reset);
      onMountedOrActivated(reset);
      useEventListener("pageshow", reset);
      useExpose({
        reset
      });
      vue.watch(() => [props2.text, props2.scrollable], reset);
      return () => {
        var {
          color,
          wrapable,
          background
        } = props2;
        return vue.withDirectives(vue.createVNode("div", {
          "role": "alert",
          "class": bem$o({
            wrapable
          }),
          "style": {
            color,
            background
          }
        }, [renderLeftIcon(), renderMarquee(), renderRightIcon()]), [[vue.vShow, state.show]]);
      };
    }
  });
  var NoticeBar = withInstall(_NoticeBar);
  var [name$n, bem$n] = createNamespace("notify");
  var VanNotify = vue.defineComponent({
    name: name$n,
    props: extend({}, popupSharedProps, {
      type: makeStringProp("danger"),
      color: String,
      message: numericProp,
      className: unknownProp,
      background: String,
      lockScroll: Boolean
    }),
    emits: ["update:show"],
    setup(props2, {
      emit,
      slots
    }) {
      var updateShow = (show) => emit("update:show", show);
      return () => vue.createVNode(Popup, {
        "show": props2.show,
        "class": [bem$n([props2.type]), props2.className],
        "style": {
          color: props2.color,
          background: props2.background
        },
        "overlay": false,
        "position": "top",
        "duration": 0.2,
        "lockScroll": props2.lockScroll,
        "onUpdate:show": updateShow
      }, {
        default: () => [slots.default ? slots.default() : props2.message]
      });
    }
  });
  var timer;
  var instance;
  var parseOptions = (message) => isObject$1(message) ? message : {
    message
  };
  function initInstance() {
    ({
      instance
    } = mountComponent({
      setup() {
        var {
          state,
          toggle
        } = usePopupState();
        return () => vue.createVNode(VanNotify, vue.mergeProps(state, {
          "onUpdate:show": toggle
        }), null);
      }
    }));
  }
  function Notify(options) {
    if (!inBrowser$1) {
      return;
    }
    if (!instance) {
      initInstance();
    }
    options = extend({}, Notify.currentOptions, parseOptions(options));
    instance.open(options);
    clearTimeout(timer);
    if (options.duration > 0) {
      timer = window.setTimeout(Notify.clear, options.duration);
    }
    return instance;
  }
  var getDefaultOptions = () => ({
    type: "danger",
    color: void 0,
    message: "",
    onClose: void 0,
    onClick: void 0,
    onOpened: void 0,
    duration: 3e3,
    className: "",
    lockScroll: false,
    background: void 0
  });
  Notify.clear = () => {
    if (instance) {
      instance.toggle(false);
    }
  };
  Notify.currentOptions = getDefaultOptions();
  Notify.setDefaultOptions = (options) => {
    extend(Notify.currentOptions, options);
  };
  Notify.resetDefaultOptions = () => {
    Notify.currentOptions = getDefaultOptions();
  };
  Notify.Component = withInstall(VanNotify);
  Notify.install = (app) => {
    app.use(Notify.Component);
    app.config.globalProperties.$notify = Notify;
  };
  var [name$m, bem$m] = createNamespace("key");
  var CollapseIcon = vue.createVNode("svg", {
    "class": bem$m("collapse-icon"),
    "viewBox": "0 0 30 24"
  }, [vue.createVNode("path", {
    "d": "M25.877 12.843h-1.502c-.188 0-.188 0-.188.19v1.512c0 .188 0 .188.188.188h1.5c.187 0 .187 0 .187-.188v-1.511c0-.19 0-.191-.185-.191zM17.999 10.2c0 .188 0 .188.188.188h1.687c.188 0 .188 0 .188-.188V8.688c0-.187.004-.187-.186-.19h-1.69c-.187 0-.187 0-.187.19V10.2zm2.25-3.967h1.5c.188 0 .188 0 .188-.188v-1.7c0-.19 0-.19-.188-.19h-1.5c-.189 0-.189 0-.189.19v1.7c0 .188 0 .188.19.188zm2.063 4.157h3.563c.187 0 .187 0 .187-.189V4.346c0-.19.004-.19-.185-.19h-1.69c-.187 0-.187 0-.187.188v4.155h-1.688c-.187 0-.187 0-.187.189v1.514c0 .19 0 .19.187.19zM14.812 24l2.812-3.4H12l2.813 3.4zm-9-11.157H4.31c-.188 0-.188 0-.188.19v1.512c0 .188 0 .188.188.188h1.502c.187 0 .187 0 .187-.188v-1.511c0-.19.01-.191-.189-.191zm15.937 0H8.25c-.188 0-.188 0-.188.19v1.512c0 .188 0 .188.188.188h13.5c.188 0 .188 0 .188-.188v-1.511c0-.19 0-.191-.188-.191zm-11.438-2.454h1.5c.188 0 .188 0 .188-.188V8.688c0-.187 0-.187-.188-.189h-1.5c-.187 0-.187 0-.187.189V10.2c0 .188 0 .188.187.188zM27.94 0c.563 0 .917.21 1.313.567.518.466.748.757.748 1.51v14.92c0 .567-.188 1.134-.562 1.512-.376.378-.938.566-1.313.566H2.063c-.563 0-.938-.188-1.313-.566-.562-.378-.75-.945-.75-1.511V2.078C0 1.51.188.944.562.567.938.189 1.5 0 1.875 0zm-.062 2H2v14.92h25.877V2zM5.81 4.157c.19 0 .19 0 .19.189v1.762c-.003.126-.024.126-.188.126H4.249c-.126-.003-.126-.023-.126-.188v-1.7c-.187-.19 0-.19.188-.19zm10.5 2.077h1.503c.187 0 .187 0 .187-.188v-1.7c0-.19 0-.19-.187-.19h-1.502c-.188 0-.188.001-.188.19v1.7c0 .188 0 .188.188.188zM7.875 8.5c.187 0 .187.002.187.189V10.2c0 .188 0 .188-.187.188H4.249c-.126-.002-.126-.023-.126-.188V8.625c.003-.126.024-.126.188-.126zm7.875 0c.19.002.19.002.19.189v1.575c-.003.126-.024.126-.19.126h-1.563c-.126-.002-.126-.023-.126-.188V8.625c.002-.126.023-.126.189-.126zm-6-4.342c.187 0 .187 0 .187.189v1.7c0 .188 0 .188-.187.188H8.187c-.126-.003-.126-.023-.126-.188V4.283c.003-.126.024-.126.188-.126zm3.94 0c.185 0 .372 0 .372.189v1.762c-.002.126-.023.126-.187.126h-1.75C12 6.231 12 6.211 12 6.046v-1.7c0-.19.187-.19.187-.19z",
    "fill": "currentColor"
  }, null)]);
  var DeleteIcon = vue.createVNode("svg", {
    "class": bem$m("delete-icon"),
    "viewBox": "0 0 32 22"
  }, [vue.createVNode("path", {
    "d": "M28.016 0A3.991 3.991 0 0132 3.987v14.026c0 2.2-1.787 3.987-3.98 3.987H10.382c-.509 0-.996-.206-1.374-.585L.89 13.09C.33 12.62 0 11.84 0 11.006c0-.86.325-1.62.887-2.08L9.01.585A1.936 1.936 0 0110.383 0zm0 1.947H10.368L2.24 10.28c-.224.226-.312.432-.312.73 0 .287.094.51.312.729l8.128 8.333h17.648a2.041 2.041 0 002.037-2.04V3.987c0-1.127-.915-2.04-2.037-2.04zM23.028 6a.96.96 0 01.678.292.95.95 0 01-.003 1.377l-3.342 3.348 3.326 3.333c.189.188.292.43.292.679 0 .248-.103.49-.292.679a.96.96 0 01-.678.292.959.959 0 01-.677-.292L18.99 12.36l-3.343 3.345a.96.96 0 01-.677.292.96.96 0 01-.678-.292.962.962 0 01-.292-.68c0-.248.104-.49.292-.679l3.342-3.348-3.342-3.348A.963.963 0 0114 6.971c0-.248.104-.49.292-.679A.96.96 0 0114.97 6a.96.96 0 01.677.292l3.358 3.348 3.345-3.348A.96.96 0 0123.028 6z",
    "fill": "currentColor"
  }, null)]);
  var NumberKeyboardKey = vue.defineComponent({
    name: name$m,
    props: {
      type: String,
      text: numericProp,
      color: String,
      wider: Boolean,
      large: Boolean,
      loading: Boolean
    },
    emits: ["press"],
    setup(props2, {
      emit,
      slots
    }) {
      var active = vue.ref(false);
      var touch = useTouch();
      var onTouchStart = (event) => {
        touch.start(event);
        active.value = true;
      };
      var onTouchMove = (event) => {
        touch.move(event);
        if (touch.direction.value) {
          active.value = false;
        }
      };
      var onTouchEnd = (event) => {
        if (active.value) {
          if (!slots.default) {
            event.preventDefault();
          }
          active.value = false;
          emit("press", props2.text, props2.type);
        }
      };
      var renderContent = () => {
        if (props2.loading) {
          return vue.createVNode(Loading, {
            "class": bem$m("loading-icon")
          }, null);
        }
        var text = slots.default ? slots.default() : props2.text;
        switch (props2.type) {
          case "delete":
            return text || DeleteIcon;
          case "extra":
            return text || CollapseIcon;
          default:
            return text;
        }
      };
      return () => vue.createVNode("div", {
        "class": bem$m("wrapper", {
          wider: props2.wider
        }),
        "onTouchstart": onTouchStart,
        "onTouchmove": onTouchMove,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, [vue.createVNode("div", {
        "role": "button",
        "tabindex": 0,
        "class": bem$m([props2.color, {
          large: props2.large,
          active: active.value,
          delete: props2.type === "delete"
        }])
      }, [renderContent()])]);
    }
  });
  var [name$l, bem$l] = createNamespace("number-keyboard");
  var _NumberKeyboard = vue.defineComponent({
    name: name$l,
    props: {
      show: Boolean,
      title: String,
      theme: makeStringProp("default"),
      zIndex: numericProp,
      teleport: [String, Object],
      maxlength: makeNumericProp(Infinity),
      modelValue: makeStringProp(""),
      transition: truthProp,
      blurOnClose: truthProp,
      showDeleteKey: truthProp,
      randomKeyOrder: Boolean,
      closeButtonText: String,
      deleteButtonText: String,
      closeButtonLoading: Boolean,
      hideOnClickOutside: truthProp,
      safeAreaInsetBottom: truthProp,
      extraKey: {
        type: [String, Array],
        default: ""
      }
    },
    emits: ["show", "hide", "blur", "input", "close", "delete", "update:modelValue"],
    setup(props2, {
      emit,
      slots
    }) {
      var root = vue.ref();
      var genBasicKeys = () => {
        var keys2 = Array(9).fill("").map((_, i) => ({
          text: i + 1
        }));
        if (props2.randomKeyOrder) {
          keys2.sort(() => Math.random() > 0.5 ? 1 : -1);
        }
        return keys2;
      };
      var genDefaultKeys = () => [...genBasicKeys(), {
        text: props2.extraKey,
        type: "extra"
      }, {
        text: 0
      }, {
        text: props2.showDeleteKey ? props2.deleteButtonText : "",
        type: props2.showDeleteKey ? "delete" : ""
      }];
      var genCustomKeys = () => {
        var keys2 = genBasicKeys();
        var {
          extraKey
        } = props2;
        var extraKeys = Array.isArray(extraKey) ? extraKey : [extraKey];
        if (extraKeys.length === 1) {
          keys2.push({
            text: 0,
            wider: true
          }, {
            text: extraKeys[0],
            type: "extra"
          });
        } else if (extraKeys.length === 2) {
          keys2.push({
            text: extraKeys[0],
            type: "extra"
          }, {
            text: 0
          }, {
            text: extraKeys[1],
            type: "extra"
          });
        }
        return keys2;
      };
      var keys = vue.computed(() => props2.theme === "custom" ? genCustomKeys() : genDefaultKeys());
      var onBlur = () => {
        if (props2.show) {
          emit("blur");
        }
      };
      var onClose = () => {
        emit("close");
        if (props2.blurOnClose) {
          onBlur();
        }
      };
      var onAnimationEnd = () => emit(props2.show ? "show" : "hide");
      var onPress = (text, type) => {
        if (text === "") {
          if (type === "extra") {
            onBlur();
          }
          return;
        }
        var value = props2.modelValue;
        if (type === "delete") {
          emit("delete");
          emit("update:modelValue", value.slice(0, value.length - 1));
        } else if (type === "close") {
          onClose();
        } else if (value.length < props2.maxlength) {
          emit("input", text);
          emit("update:modelValue", value + text);
        }
      };
      var renderTitle = () => {
        var {
          title,
          theme,
          closeButtonText
        } = props2;
        var leftSlot = slots["title-left"];
        var showClose = closeButtonText && theme === "default";
        var showTitle = title || showClose || leftSlot;
        if (!showTitle) {
          return;
        }
        return vue.createVNode("div", {
          "class": bem$l("header")
        }, [leftSlot && vue.createVNode("span", {
          "class": bem$l("title-left")
        }, [leftSlot()]), title && vue.createVNode("h2", {
          "class": bem$l("title")
        }, [title]), showClose && vue.createVNode("button", {
          "type": "button",
          "class": bem$l("close"),
          "onClick": onClose
        }, [closeButtonText])]);
      };
      var renderKeys = () => keys.value.map((key) => {
        var keySlots = {};
        if (key.type === "delete") {
          keySlots.default = slots.delete;
        }
        if (key.type === "extra") {
          keySlots.default = slots["extra-key"];
        }
        return vue.createVNode(NumberKeyboardKey, {
          "key": key.text,
          "text": key.text,
          "type": key.type,
          "wider": key.wider,
          "color": key.color,
          "onPress": onPress
        }, keySlots);
      });
      var renderSidebar = () => {
        if (props2.theme === "custom") {
          return vue.createVNode("div", {
            "class": bem$l("sidebar")
          }, [props2.showDeleteKey && vue.createVNode(NumberKeyboardKey, {
            "large": true,
            "text": props2.deleteButtonText,
            "type": "delete",
            "onPress": onPress
          }, {
            delete: slots.delete
          }), vue.createVNode(NumberKeyboardKey, {
            "large": true,
            "text": props2.closeButtonText,
            "type": "close",
            "color": "blue",
            "loading": props2.closeButtonLoading,
            "onPress": onPress
          }, null)]);
        }
      };
      vue.watch(() => props2.show, (value) => {
        if (!props2.transition) {
          emit(value ? "show" : "hide");
        }
      });
      if (props2.hideOnClickOutside) {
        useClickAway(root, onBlur, {
          eventName: "touchstart"
        });
      }
      return () => {
        var Title = renderTitle();
        var Content = vue.createVNode(vue.Transition, {
          "name": props2.transition ? "van-slide-up" : ""
        }, {
          default: () => [vue.withDirectives(vue.createVNode("div", {
            "ref": root,
            "style": getZIndexStyle(props2.zIndex),
            "class": bem$l({
              unfit: !props2.safeAreaInsetBottom,
              "with-title": !!Title
            }),
            "onTouchstart": stopPropagation,
            "onAnimationend": onAnimationEnd,
            "onWebkitAnimationEnd": onAnimationEnd
          }, [Title, vue.createVNode("div", {
            "class": bem$l("body")
          }, [vue.createVNode("div", {
            "class": bem$l("keys")
          }, [renderKeys()]), renderSidebar()])]), [[vue.vShow, props2.show]])]
        });
        if (props2.teleport) {
          return vue.createVNode(vue.Teleport, {
            "to": props2.teleport
          }, {
            default: () => [Content]
          });
        }
        return Content;
      };
    }
  });
  var NumberKeyboard = withInstall(_NumberKeyboard);
  var [name$k, bem$k, t$4] = createNamespace("pagination");
  var makePage = (number, text, active) => ({
    number,
    text,
    active
  });
  var _Pagination = vue.defineComponent({
    name: name$k,
    props: {
      mode: makeStringProp("multi"),
      prevText: String,
      nextText: String,
      pageCount: makeNumericProp(0),
      modelValue: makeNumberProp(0),
      totalItems: makeNumericProp(0),
      showPageSize: makeNumericProp(5),
      itemsPerPage: makeNumericProp(10),
      forceEllipses: Boolean
    },
    emits: ["change", "update:modelValue"],
    setup(props2, {
      emit,
      slots
    }) {
      var count = vue.computed(() => {
        var {
          pageCount,
          totalItems,
          itemsPerPage
        } = props2;
        var count2 = +pageCount || Math.ceil(+totalItems / +itemsPerPage);
        return Math.max(1, count2);
      });
      var pages = vue.computed(() => {
        var items = [];
        var pageCount = count.value;
        var showPageSize = +props2.showPageSize;
        var {
          modelValue,
          forceEllipses
        } = props2;
        if (props2.mode !== "multi") {
          return items;
        }
        var startPage = 1;
        var endPage = pageCount;
        var isMaxSized = showPageSize < pageCount;
        if (isMaxSized) {
          startPage = Math.max(modelValue - Math.floor(showPageSize / 2), 1);
          endPage = startPage + showPageSize - 1;
          if (endPage > pageCount) {
            endPage = pageCount;
            startPage = endPage - showPageSize + 1;
          }
        }
        for (var number = startPage; number <= endPage; number++) {
          var page = makePage(number, number, number === modelValue);
          items.push(page);
        }
        if (isMaxSized && showPageSize > 0 && forceEllipses) {
          if (startPage > 1) {
            var prevPages = makePage(startPage - 1, "...");
            items.unshift(prevPages);
          }
          if (endPage < pageCount) {
            var nextPages = makePage(endPage + 1, "...");
            items.push(nextPages);
          }
        }
        return items;
      });
      var select = (page, emitChange) => {
        page = Math.min(count.value, Math.max(1, page));
        if (props2.modelValue !== page) {
          emit("update:modelValue", page);
          if (emitChange) {
            emit("change", page);
          }
        }
      };
      vue.watch(() => props2.modelValue, (value) => {
        select(value);
      }, {
        immediate: true
      });
      var renderDesc = () => {
        if (props2.mode !== "multi") {
          return vue.createVNode("li", {
            "class": bem$k("page-desc")
          }, [slots.pageDesc ? slots.pageDesc() : props2.modelValue + "/" + count.value]);
        }
      };
      return () => {
        var value = props2.modelValue;
        var simple = props2.mode !== "multi";
        var onSelect = (value2) => () => select(value2, true);
        return vue.createVNode("ul", {
          "class": bem$k({
            simple
          })
        }, [vue.createVNode("li", {
          "class": [bem$k("item", {
            disabled: value === 1
          }), bem$k("prev"), BORDER],
          "onClick": onSelect(value - 1)
        }, [slots["prev-text"] ? slots["prev-text"]() : props2.prevText || t$4("prev")]), pages.value.map((page) => vue.createVNode("li", {
          "class": [bem$k("item", {
            active: page.active
          }), bem$k("page"), BORDER],
          "onClick": onSelect(page.number)
        }, [slots.page ? slots.page(page) : page.text])), renderDesc(), vue.createVNode("li", {
          "class": [bem$k("item", {
            disabled: value === count.value
          }), bem$k("next"), BORDER],
          "onClick": onSelect(value + 1)
        }, [slots["next-text"] ? slots["next-text"]() : props2.nextText || t$4("next")])]);
      };
    }
  });
  var Pagination = withInstall(_Pagination);
  var [name$j, bem$j] = createNamespace("password-input");
  var _PasswordInput = vue.defineComponent({
    name: name$j,
    props: {
      info: String,
      mask: truthProp,
      value: makeStringProp(""),
      gutter: numericProp,
      length: makeNumericProp(6),
      focused: Boolean,
      errorInfo: String
    },
    emits: ["focus"],
    setup(props2, {
      emit
    }) {
      var onTouchStart = (event) => {
        event.stopPropagation();
        emit("focus", event);
      };
      var renderPoints = () => {
        var Points = [];
        var {
          mask,
          value,
          length,
          gutter,
          focused
        } = props2;
        for (var i = 0; i < length; i++) {
          var char = value[i];
          var showBorder = i !== 0 && !gutter;
          var showCursor = focused && i === value.length;
          var style = void 0;
          if (i !== 0 && gutter) {
            style = {
              marginLeft: addUnit(gutter)
            };
          }
          Points.push(vue.createVNode("li", {
            "class": [{
              [BORDER_LEFT]: showBorder
            }, bem$j("item", {
              focus: showCursor
            })],
            "style": style
          }, [mask ? vue.createVNode("i", {
            "style": {
              visibility: char ? "visible" : "hidden"
            }
          }, null) : char, showCursor && vue.createVNode("div", {
            "class": bem$j("cursor")
          }, null)]));
        }
        return Points;
      };
      return () => {
        var info = props2.errorInfo || props2.info;
        return vue.createVNode("div", {
          "class": bem$j()
        }, [vue.createVNode("ul", {
          "class": [bem$j("security"), {
            [BORDER_SURROUND]: !props2.gutter
          }],
          "onTouchstart": onTouchStart
        }, [renderPoints()]), info && vue.createVNode("div", {
          "class": bem$j(props2.errorInfo ? "error-info" : "info")
        }, [info])]);
      };
    }
  });
  var PasswordInput = withInstall(_PasswordInput);
  function getBoundingClientRect(element) {
    var rect = element.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      x: rect.left,
      y: rect.top
    };
  }
  function getWindow(node) {
    if (node == null) {
      return window;
    }
    if (node.toString() !== "[object Window]") {
      var ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView || window : window;
    }
    return node;
  }
  function getWindowScroll(node) {
    var win = getWindow(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
      scrollLeft,
      scrollTop
    };
  }
  function isElement(node) {
    var OwnElement = getWindow(node).Element;
    return node instanceof OwnElement || node instanceof Element;
  }
  function isHTMLElement(node) {
    var OwnElement = getWindow(node).HTMLElement;
    return node instanceof OwnElement || node instanceof HTMLElement;
  }
  function isShadowRoot(node) {
    if (typeof ShadowRoot === "undefined") {
      return false;
    }
    var OwnElement = getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
  }
  function getHTMLElementScroll(element) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  function getNodeScroll(node) {
    if (node === getWindow(node) || !isHTMLElement(node)) {
      return getWindowScroll(node);
    } else {
      return getHTMLElementScroll(node);
    }
  }
  function getNodeName(element) {
    return element ? (element.nodeName || "").toLowerCase() : null;
  }
  function getDocumentElement(element) {
    return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
  }
  function getWindowScrollBarX(element) {
    return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
  }
  function getComputedStyle(element) {
    return getWindow(element).getComputedStyle(element);
  }
  function isScrollParent(element) {
    var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
  }
  function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) {
      isFixed = false;
    }
    var documentElement = getDocumentElement(offsetParent);
    var rect = getBoundingClientRect(elementOrVirtualElement);
    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    var offsets = {
      x: 0,
      y: 0
    };
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        offsets = getBoundingClientRect(offsetParent);
        offsets.x += offsetParent.clientLeft;
        offsets.y += offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }
    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }
  function getLayoutRect(element) {
    var clientRect = getBoundingClientRect(element);
    var width = element.offsetWidth;
    var height = element.offsetHeight;
    if (Math.abs(clientRect.width - width) <= 1) {
      width = clientRect.width;
    }
    if (Math.abs(clientRect.height - height) <= 1) {
      height = clientRect.height;
    }
    return {
      x: element.offsetLeft,
      y: element.offsetTop,
      width,
      height
    };
  }
  function getParentNode(element) {
    if (getNodeName(element) === "html") {
      return element;
    }
    return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
  }
  function getScrollParent(node) {
    if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
      return node.ownerDocument.body;
    }
    if (isHTMLElement(node) && isScrollParent(node)) {
      return node;
    }
    return getScrollParent(getParentNode(node));
  }
  function listScrollParents(element, list) {
    var _element$ownerDocumen;
    if (list === void 0) {
      list = [];
    }
    var scrollParent = getScrollParent(element);
    var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
    var win = getWindow(scrollParent);
    var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
    var updatedList = list.concat(target);
    return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
  }
  function isTableElement(element) {
    return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
  }
  function getTrueOffsetParent(element) {
    if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
      return null;
    }
    return element.offsetParent;
  }
  function getContainingBlock(element) {
    var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
    var isIE = navigator.userAgent.indexOf("Trident") !== -1;
    if (isIE && isHTMLElement(element)) {
      var elementCss = getComputedStyle(element);
      if (elementCss.position === "fixed") {
        return null;
      }
    }
    var currentNode = getParentNode(element);
    while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
      var css = getComputedStyle(currentNode);
      if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
        return currentNode;
      } else {
        currentNode = currentNode.parentNode;
      }
    }
    return null;
  }
  function getOffsetParent(element) {
    var window2 = getWindow(element);
    var offsetParent = getTrueOffsetParent(element);
    while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
      offsetParent = getTrueOffsetParent(offsetParent);
    }
    if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
      return window2;
    }
    return offsetParent || getContainingBlock(element) || window2;
  }
  var top = "top";
  var bottom = "bottom";
  var right = "right";
  var left = "left";
  var auto = "auto";
  var basePlacements = [top, bottom, right, left];
  var start = "start";
  var end = "end";
  var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
    return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
  }, []);
  var beforeRead = "beforeRead";
  var read = "read";
  var afterRead = "afterRead";
  var beforeMain = "beforeMain";
  var main = "main";
  var afterMain = "afterMain";
  var beforeWrite = "beforeWrite";
  var write = "write";
  var afterWrite = "afterWrite";
  var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
  function order(modifiers) {
    var map = new Map();
    var visited = new Set();
    var result = [];
    modifiers.forEach(function(modifier) {
      map.set(modifier.name, modifier);
    });
    function sort(modifier) {
      visited.add(modifier.name);
      var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
      requires.forEach(function(dep) {
        if (!visited.has(dep)) {
          var depModifier = map.get(dep);
          if (depModifier) {
            sort(depModifier);
          }
        }
      });
      result.push(modifier);
    }
    modifiers.forEach(function(modifier) {
      if (!visited.has(modifier.name)) {
        sort(modifier);
      }
    });
    return result;
  }
  function orderModifiers(modifiers) {
    var orderedModifiers = order(modifiers);
    return modifierPhases.reduce(function(acc, phase) {
      return acc.concat(orderedModifiers.filter(function(modifier) {
        return modifier.phase === phase;
      }));
    }, []);
  }
  function debounce(fn) {
    var pending;
    return function() {
      if (!pending) {
        pending = new Promise(function(resolve) {
          Promise.resolve().then(function() {
            pending = void 0;
            resolve(fn());
          });
        });
      }
      return pending;
    };
  }
  function getBasePlacement(placement) {
    return placement.split("-")[0];
  }
  function mergeByName(modifiers) {
    var merged = modifiers.reduce(function(merged2, current) {
      var existing = merged2[current.name];
      merged2[current.name] = existing ? Object.assign({}, existing, current, {
        options: Object.assign({}, existing.options, current.options),
        data: Object.assign({}, existing.data, current.data)
      }) : current;
      return merged2;
    }, {});
    return Object.keys(merged).map(function(key) {
      return merged[key];
    });
  }
  var round = Math.round;
  function getVariation(placement) {
    return placement.split("-")[1];
  }
  function getMainAxisFromPlacement(placement) {
    return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
  }
  function computeOffsets(_ref) {
    var reference = _ref.reference, element = _ref.element, placement = _ref.placement;
    var basePlacement = placement ? getBasePlacement(placement) : null;
    var variation = placement ? getVariation(placement) : null;
    var commonX = reference.x + reference.width / 2 - element.width / 2;
    var commonY = reference.y + reference.height / 2 - element.height / 2;
    var offsets;
    switch (basePlacement) {
      case top:
        offsets = {
          x: commonX,
          y: reference.y - element.height
        };
        break;
      case bottom:
        offsets = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;
      case right:
        offsets = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;
      case left:
        offsets = {
          x: reference.x - element.width,
          y: commonY
        };
        break;
      default:
        offsets = {
          x: reference.x,
          y: reference.y
        };
    }
    var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
    if (mainAxis != null) {
      var len = mainAxis === "y" ? "height" : "width";
      switch (variation) {
        case start:
          offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
          break;
        case end:
          offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
          break;
      }
    }
    return offsets;
  }
  var DEFAULT_OPTIONS = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
  };
  function areValidElements() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return !args.some(function(element) {
      return !(element && typeof element.getBoundingClientRect === "function");
    });
  }
  function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) {
      generatorOptions = {};
    }
    var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions2 = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper2(reference, popper, options) {
      if (options === void 0) {
        options = defaultOptions2;
      }
      var state = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions2),
        modifiersData: {},
        elements: {
          reference,
          popper
        },
        attributes: {},
        styles: {}
      };
      var effectCleanupFns = [];
      var isDestroyed = false;
      var instance2 = {
        state,
        setOptions: function setOptions(options2) {
          cleanupModifierEffects();
          state.options = Object.assign({}, defaultOptions2, state.options, options2);
          state.scrollParents = {
            reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
            popper: listScrollParents(popper)
          };
          var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
          state.orderedModifiers = orderedModifiers.filter(function(m) {
            return m.enabled;
          });
          runModifierEffects();
          return instance2.update();
        },
        forceUpdate: function forceUpdate() {
          if (isDestroyed) {
            return;
          }
          var _state$elements = state.elements, reference2 = _state$elements.reference, popper2 = _state$elements.popper;
          if (!areValidElements(reference2, popper2)) {
            return;
          }
          state.rects = {
            reference: getCompositeRect(reference2, getOffsetParent(popper2), state.options.strategy === "fixed"),
            popper: getLayoutRect(popper2)
          };
          state.reset = false;
          state.placement = state.options.placement;
          state.orderedModifiers.forEach(function(modifier) {
            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
          });
          for (var index2 = 0; index2 < state.orderedModifiers.length; index2++) {
            if (state.reset === true) {
              state.reset = false;
              index2 = -1;
              continue;
            }
            var _state$orderedModifie = state.orderedModifiers[index2], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name2 = _state$orderedModifie.name;
            if (typeof fn === "function") {
              state = fn({
                state,
                options: _options,
                name: name2,
                instance: instance2
              }) || state;
            }
          }
        },
        update: debounce(function() {
          return new Promise(function(resolve) {
            instance2.forceUpdate();
            resolve(state);
          });
        }),
        destroy: function destroy() {
          cleanupModifierEffects();
          isDestroyed = true;
        }
      };
      if (!areValidElements(reference, popper)) {
        return instance2;
      }
      instance2.setOptions(options).then(function(state2) {
        if (!isDestroyed && options.onFirstUpdate) {
          options.onFirstUpdate(state2);
        }
      });
      function runModifierEffects() {
        state.orderedModifiers.forEach(function(_ref3) {
          var name2 = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect2 = _ref3.effect;
          if (typeof effect2 === "function") {
            var cleanupFn = effect2({
              state,
              name: name2,
              instance: instance2,
              options: options2
            });
            var noopFn = function noopFn2() {
            };
            effectCleanupFns.push(cleanupFn || noopFn);
          }
        });
      }
      function cleanupModifierEffects() {
        effectCleanupFns.forEach(function(fn) {
          return fn();
        });
        effectCleanupFns = [];
      }
      return instance2;
    };
  }
  var passive = {
    passive: true
  };
  function effect(_ref) {
    var state = _ref.state, instance2 = _ref.instance, options = _ref.options;
    var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
    var window2 = getWindow(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.addEventListener("scroll", instance2.update, passive);
      });
    }
    if (resize) {
      window2.addEventListener("resize", instance2.update, passive);
    }
    return function() {
      if (scroll) {
        scrollParents.forEach(function(scrollParent) {
          scrollParent.removeEventListener("scroll", instance2.update, passive);
        });
      }
      if (resize) {
        window2.removeEventListener("resize", instance2.update, passive);
      }
    };
  }
  var eventListeners = {
    name: "eventListeners",
    enabled: true,
    phase: "write",
    fn: function fn() {
    },
    effect,
    data: {}
  };
  function popperOffsets(_ref) {
    var state = _ref.state, name2 = _ref.name;
    state.modifiersData[name2] = computeOffsets({
      reference: state.rects.reference,
      element: state.rects.popper,
      strategy: "absolute",
      placement: state.placement
    });
  }
  var popperOffsets$1 = {
    name: "popperOffsets",
    enabled: true,
    phase: "read",
    fn: popperOffsets,
    data: {}
  };
  var unsetSides = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
  };
  function roundOffsetsByDPR(_ref) {
    var x = _ref.x, y = _ref.y;
    var win = window;
    var dpr = win.devicePixelRatio || 1;
    return {
      x: round(round(x * dpr) / dpr) || 0,
      y: round(round(y * dpr) / dpr) || 0
    };
  }
  function mapToStyles(_ref2) {
    var _Object$assign2;
    var popper = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets;
    var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === "function" ? roundOffsets(offsets) : offsets, _ref3$x = _ref3.x, x = _ref3$x === void 0 ? 0 : _ref3$x, _ref3$y = _ref3.y, y = _ref3$y === void 0 ? 0 : _ref3$y;
    var hasX = offsets.hasOwnProperty("x");
    var hasY = offsets.hasOwnProperty("y");
    var sideX = left;
    var sideY = top;
    var win = window;
    if (adaptive) {
      var offsetParent = getOffsetParent(popper);
      var heightProp = "clientHeight";
      var widthProp = "clientWidth";
      if (offsetParent === getWindow(popper)) {
        offsetParent = getDocumentElement(popper);
        if (getComputedStyle(offsetParent).position !== "static") {
          heightProp = "scrollHeight";
          widthProp = "scrollWidth";
        }
      }
      offsetParent = offsetParent;
      if (placement === top) {
        sideY = bottom;
        y -= offsetParent[heightProp] - popperRect.height;
        y *= gpuAcceleration ? 1 : -1;
      }
      if (placement === left) {
        sideX = right;
        x -= offsetParent[widthProp] - popperRect.width;
        x *= gpuAcceleration ? 1 : -1;
      }
    }
    var commonStyles = Object.assign({
      position
    }, adaptive && unsetSides);
    if (gpuAcceleration) {
      var _Object$assign;
      return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }
    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
  }
  function computeStyles(_ref4) {
    var state = _ref4.state, options = _ref4.options;
    var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
    var commonStyles = {
      placement: getBasePlacement(state.placement),
      popper: state.elements.popper,
      popperRect: state.rects.popper,
      gpuAcceleration
    };
    if (state.modifiersData.popperOffsets != null) {
      state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.popperOffsets,
        position: state.options.strategy,
        adaptive,
        roundOffsets
      })));
    }
    if (state.modifiersData.arrow != null) {
      state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.arrow,
        position: "absolute",
        adaptive: false,
        roundOffsets
      })));
    }
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      "data-popper-placement": state.placement
    });
  }
  var computeStyles$1 = {
    name: "computeStyles",
    enabled: true,
    phase: "beforeWrite",
    fn: computeStyles,
    data: {}
  };
  function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function(name2) {
      var style = state.styles[name2] || {};
      var attributes = state.attributes[name2] || {};
      var element = state.elements[name2];
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(name3) {
        var value = attributes[name3];
        if (value === false) {
          element.removeAttribute(name3);
        } else {
          element.setAttribute(name3, value === true ? "" : value);
        }
      });
    });
  }
  function effect$1(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: {
        position: "absolute"
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;
    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }
    return function() {
      Object.keys(state.elements).forEach(function(name2) {
        var element = state.elements[name2];
        var attributes = state.attributes[name2] || {};
        var styleProperties = Object.keys(state.styles.hasOwnProperty(name2) ? state.styles[name2] : initialStyles[name2]);
        var style = styleProperties.reduce(function(style2, property) {
          style2[property] = "";
          return style2;
        }, {});
        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        }
        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function(attribute) {
          element.removeAttribute(attribute);
        });
      });
    };
  }
  var applyStyles$1 = {
    name: "applyStyles",
    enabled: true,
    phase: "write",
    fn: applyStyles,
    effect: effect$1,
    requires: ["computeStyles"]
  };
  var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
  var createPopper = /* @__PURE__ */ popperGenerator({
    defaultModifiers
  });
  function distanceAndSkiddingToXY(placement, rects, offset2) {
    var basePlacement = getBasePlacement(placement);
    var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
    var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
      placement
    })) : offset2, skidding = _ref[0], distance = _ref[1];
    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
    return [left, right].indexOf(basePlacement) >= 0 ? {
      x: distance,
      y: skidding
    } : {
      x: skidding,
      y: distance
    };
  }
  function offset(_ref2) {
    var state = _ref2.state, options = _ref2.options, name2 = _ref2.name;
    var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
    var data = placements.reduce(function(acc, placement) {
      acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
      return acc;
    }, {});
    var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
    if (state.modifiersData.popperOffsets != null) {
      state.modifiersData.popperOffsets.x += x;
      state.modifiersData.popperOffsets.y += y;
    }
    state.modifiersData[name2] = data;
  }
  var offset$1 = {
    name: "offset",
    enabled: true,
    phase: "main",
    requires: ["popperOffsets"],
    fn: offset
  };
  var [name$i, bem$i] = createNamespace("popover");
  var popupProps = ["show", "overlay", "duration", "teleport", "overlayStyle", "overlayClass", "closeOnClickOverlay"];
  var _Popover = vue.defineComponent({
    name: name$i,
    props: {
      show: Boolean,
      theme: makeStringProp("light"),
      overlay: Boolean,
      actions: makeArrayProp(),
      trigger: makeStringProp("click"),
      duration: numericProp,
      showArrow: truthProp,
      placement: makeStringProp("bottom"),
      iconPrefix: String,
      overlayClass: unknownProp,
      overlayStyle: Object,
      closeOnClickAction: truthProp,
      closeOnClickOverlay: truthProp,
      closeOnClickOutside: truthProp,
      offset: {
        type: Array,
        default: () => [0, 8]
      },
      teleport: {
        type: [String, Object],
        default: "body"
      }
    },
    emits: ["select", "touchstart", "update:show"],
    setup(props2, {
      emit,
      slots,
      attrs
    }) {
      var popper;
      var wrapperRef = vue.ref();
      var popoverRef = vue.ref();
      var createPopperInstance = () => {
        if (wrapperRef.value && popoverRef.value) {
          return createPopper(wrapperRef.value, popoverRef.value.popupRef.value, {
            placement: props2.placement,
            modifiers: [{
              name: "computeStyles",
              options: {
                adaptive: false,
                gpuAcceleration: false
              }
            }, extend({}, offset$1, {
              options: {
                offset: props2.offset
              }
            })]
          });
        }
        return null;
      };
      var updateLocation = () => {
        vue.nextTick(() => {
          if (!props2.show) {
            return;
          }
          if (!popper) {
            popper = createPopperInstance();
          } else {
            popper.setOptions({
              placement: props2.placement
            });
          }
        });
      };
      var updateShow = (value) => emit("update:show", value);
      var onClickWrapper = () => {
        if (props2.trigger === "click") {
          updateShow(!props2.show);
        }
      };
      var onTouchstart = (event) => {
        event.stopPropagation();
        emit("touchstart", event);
      };
      var onClickAction = (action, index2) => {
        if (action.disabled) {
          return;
        }
        emit("select", action, index2);
        if (props2.closeOnClickAction) {
          updateShow(false);
        }
      };
      var onClickAway = () => {
        if (props2.closeOnClickOutside && (!props2.overlay || props2.closeOnClickOverlay)) {
          updateShow(false);
        }
      };
      var renderAction = (action, index2) => {
        var {
          icon,
          text,
          color,
          disabled,
          className
        } = action;
        return vue.createVNode("div", {
          "role": "menuitem",
          "class": [bem$i("action", {
            disabled,
            "with-icon": icon
          }), className],
          "style": {
            color
          },
          "onClick": () => onClickAction(action, index2)
        }, [icon && vue.createVNode(Icon, {
          "name": icon,
          "classPrefix": props2.iconPrefix,
          "class": bem$i("action-icon")
        }, null), vue.createVNode("div", {
          "class": [bem$i("action-text"), BORDER_BOTTOM]
        }, [text])]);
      };
      vue.onMounted(updateLocation);
      vue.onBeforeUnmount(() => {
        if (popper) {
          popper.destroy();
          popper = null;
        }
      });
      vue.watch(() => [props2.show, props2.placement], updateLocation);
      useClickAway(wrapperRef, onClickAway, {
        eventName: "touchstart"
      });
      return () => vue.createVNode(vue.Fragment, null, [vue.createVNode("span", {
        "ref": wrapperRef,
        "class": bem$i("wrapper"),
        "onClick": onClickWrapper
      }, [slots.reference == null ? void 0 : slots.reference()]), vue.createVNode(Popup, vue.mergeProps({
        "ref": popoverRef,
        "class": bem$i([props2.theme]),
        "position": "",
        "transition": "van-popover-zoom",
        "lockScroll": false,
        "onTouchstart": onTouchstart,
        "onUpdate:show": updateShow
      }, attrs, pick(props2, popupProps)), {
        default: () => [props2.showArrow && vue.createVNode("div", {
          "class": bem$i("arrow")
        }, null), vue.createVNode("div", {
          "role": "menu",
          "class": bem$i("content")
        }, [slots.default ? slots.default() : props2.actions.map(renderAction)])]
      })]);
    }
  });
  var Popover = withInstall(_Popover);
  var [name$h, bem$h] = createNamespace("progress");
  var props$5 = {
    color: String,
    inactive: Boolean,
    pivotText: String,
    textColor: String,
    showPivot: truthProp,
    pivotColor: String,
    trackColor: String,
    strokeWidth: numericProp,
    percentage: {
      type: numericProp,
      default: 0,
      validator: (value) => value >= 0 && value <= 100
    }
  };
  var _Progress = vue.defineComponent({
    name: name$h,
    props: props$5,
    setup(props2) {
      var background = vue.computed(() => props2.inactive ? void 0 : props2.color);
      var renderPivot = () => {
        var {
          textColor,
          pivotText,
          pivotColor,
          percentage
        } = props2;
        var text = pivotText != null ? pivotText : percentage + "%";
        if (props2.showPivot && text) {
          var style = {
            color: textColor,
            left: +percentage + "%",
            transform: "translate(-" + +percentage + "%,-50%)",
            background: pivotColor || background.value
          };
          return vue.createVNode("span", {
            "style": style,
            "class": bem$h("pivot", {
              inactive: props2.inactive
            })
          }, [text]);
        }
      };
      return () => {
        var {
          trackColor,
          percentage,
          strokeWidth
        } = props2;
        var rootStyle = {
          background: trackColor,
          height: addUnit(strokeWidth)
        };
        var portionStyle = {
          background: background.value,
          transform: "scaleX(" + +percentage / 100 + ")"
        };
        return vue.createVNode("div", {
          "class": bem$h(),
          "style": rootStyle
        }, [vue.createVNode("span", {
          "class": bem$h("portion", {
            inactive: props2.inactive
          }),
          "style": portionStyle
        }, null), renderPivot()]);
      };
    }
  });
  var Progress = withInstall(_Progress);
  var [name$g, bem$g, t$3] = createNamespace("pull-refresh");
  var DEFAULT_HEAD_HEIGHT = 50;
  var TEXT_STATUS = ["pulling", "loosing", "success"];
  var _PullRefresh = vue.defineComponent({
    name: name$g,
    props: {
      disabled: Boolean,
      modelValue: Boolean,
      headHeight: makeNumericProp(DEFAULT_HEAD_HEIGHT),
      successText: String,
      pullingText: String,
      loosingText: String,
      loadingText: String,
      pullDistance: numericProp,
      successDuration: makeNumericProp(500),
      animationDuration: makeNumericProp(300)
    },
    emits: ["refresh", "update:modelValue"],
    setup(props2, {
      emit,
      slots
    }) {
      var reachTop;
      var root = vue.ref();
      var scrollParent = useScrollParent(root);
      var state = vue.reactive({
        status: "normal",
        distance: 0,
        duration: 0
      });
      var touch = useTouch();
      var getHeadStyle = () => {
        if (props2.headHeight !== DEFAULT_HEAD_HEIGHT) {
          return {
            height: props2.headHeight + "px"
          };
        }
      };
      var isTouchable = () => state.status !== "loading" && state.status !== "success" && !props2.disabled;
      var ease = (distance) => {
        var pullDistance = +(props2.pullDistance || props2.headHeight);
        if (distance > pullDistance) {
          if (distance < pullDistance * 2) {
            distance = pullDistance + (distance - pullDistance) / 2;
          } else {
            distance = pullDistance * 1.5 + (distance - pullDistance * 2) / 4;
          }
        }
        return Math.round(distance);
      };
      var setStatus = (distance, isLoading) => {
        var pullDistance = +(props2.pullDistance || props2.headHeight);
        state.distance = distance;
        if (isLoading) {
          state.status = "loading";
        } else if (distance === 0) {
          state.status = "normal";
        } else if (distance < pullDistance) {
          state.status = "pulling";
        } else {
          state.status = "loosing";
        }
      };
      var getStatusText = () => {
        var {
          status
        } = state;
        if (status === "normal") {
          return "";
        }
        return props2[status + "Text"] || t$3(status);
      };
      var renderStatus = () => {
        var {
          status,
          distance
        } = state;
        if (slots[status]) {
          return slots[status]({
            distance
          });
        }
        var nodes = [];
        if (TEXT_STATUS.includes(status)) {
          nodes.push(vue.createVNode("div", {
            "class": bem$g("text")
          }, [getStatusText()]));
        }
        if (status === "loading") {
          nodes.push(vue.createVNode(Loading, {
            "class": bem$g("loading")
          }, {
            default: getStatusText
          }));
        }
        return nodes;
      };
      var showSuccessTip = () => {
        state.status = "success";
        setTimeout(() => {
          setStatus(0);
        }, +props2.successDuration);
      };
      var checkPosition = (event) => {
        reachTop = getScrollTop(scrollParent.value) === 0;
        if (reachTop) {
          state.duration = 0;
          touch.start(event);
        }
      };
      var onTouchStart = (event) => {
        if (isTouchable()) {
          checkPosition(event);
        }
      };
      var onTouchMove = (event) => {
        if (isTouchable()) {
          if (!reachTop) {
            checkPosition(event);
          }
          var {
            deltaY
          } = touch;
          touch.move(event);
          if (reachTop && deltaY.value >= 0 && touch.isVertical()) {
            preventDefault(event);
            setStatus(ease(deltaY.value));
          }
        }
      };
      var onTouchEnd = () => {
        if (reachTop && touch.deltaY.value && isTouchable()) {
          state.duration = +props2.animationDuration;
          if (state.status === "loosing") {
            setStatus(+props2.headHeight, true);
            emit("update:modelValue", true);
            vue.nextTick(() => emit("refresh"));
          } else {
            setStatus(0);
          }
        }
      };
      vue.watch(() => props2.modelValue, (value) => {
        state.duration = +props2.animationDuration;
        if (value) {
          setStatus(+props2.headHeight, true);
        } else if (slots.success || props2.successText) {
          showSuccessTip();
        } else {
          setStatus(0, false);
        }
      });
      return () => {
        var trackStyle = {
          transitionDuration: state.duration + "ms",
          transform: state.distance ? "translate3d(0," + state.distance + "px, 0)" : ""
        };
        return vue.createVNode("div", {
          "ref": root,
          "class": bem$g()
        }, [vue.createVNode("div", {
          "class": bem$g("track"),
          "style": trackStyle,
          "onTouchstart": onTouchStart,
          "onTouchmove": onTouchMove,
          "onTouchend": onTouchEnd,
          "onTouchcancel": onTouchEnd
        }, [vue.createVNode("div", {
          "class": bem$g("head"),
          "style": getHeadStyle()
        }, [renderStatus()]), slots.default == null ? void 0 : slots.default()])]);
      };
    }
  });
  var PullRefresh = withInstall(_PullRefresh);
  var [name$f, bem$f] = createNamespace("rate");
  function getRateStatus(value, index2, allowHalf, readonly) {
    if (value >= index2) {
      return {
        status: "full",
        value: 1
      };
    }
    if (value + 0.5 >= index2 && allowHalf && !readonly) {
      return {
        status: "half",
        value: 0.5
      };
    }
    if (value + 1 >= index2 && allowHalf && readonly) {
      var cardinal = Math.pow(10, 10);
      return {
        status: "half",
        value: Math.round((value - index2 + 1) * cardinal) / cardinal
      };
    }
    return {
      status: "void",
      value: 0
    };
  }
  var _Rate = vue.defineComponent({
    name: name$f,
    props: {
      size: numericProp,
      icon: makeStringProp("star"),
      color: String,
      count: makeNumericProp(5),
      gutter: numericProp,
      readonly: Boolean,
      disabled: Boolean,
      voidIcon: makeStringProp("star-o"),
      allowHalf: Boolean,
      voidColor: String,
      touchable: truthProp,
      iconPrefix: String,
      modelValue: makeNumberProp(0),
      disabledColor: String
    },
    emits: ["change", "update:modelValue"],
    setup(props2, {
      emit
    }) {
      var touch = useTouch();
      var [itemRefs, setItemRefs] = useRefs();
      var untouchable = () => props2.readonly || props2.disabled || !props2.touchable;
      var list = vue.computed(() => Array(+props2.count).fill("").map((_, i) => getRateStatus(props2.modelValue, i + 1, props2.allowHalf, props2.readonly)));
      var ranges;
      var updateRanges = () => {
        var rects = itemRefs.value.map(useRect);
        ranges = [];
        rects.forEach((rect, index2) => {
          if (props2.allowHalf) {
            ranges.push({
              score: index2 + 0.5,
              left: rect.left
            }, {
              score: index2 + 1,
              left: rect.left + rect.width / 2
            });
          } else {
            ranges.push({
              score: index2 + 1,
              left: rect.left
            });
          }
        });
      };
      var getScoreByPosition = (x) => {
        for (var i = ranges.length - 1; i > 0; i--) {
          if (x > ranges[i].left) {
            return ranges[i].score;
          }
        }
        return props2.allowHalf ? 0.5 : 1;
      };
      var select = (index2) => {
        if (!props2.disabled && !props2.readonly && index2 !== props2.modelValue) {
          emit("update:modelValue", index2);
          emit("change", index2);
        }
      };
      var onTouchStart = (event) => {
        if (untouchable()) {
          return;
        }
        touch.start(event);
        updateRanges();
      };
      var onTouchMove = (event) => {
        if (untouchable()) {
          return;
        }
        touch.move(event);
        if (touch.isHorizontal()) {
          var {
            clientX
          } = event.touches[0];
          preventDefault(event);
          select(getScoreByPosition(clientX));
        }
      };
      var renderStar = (item, index2) => {
        var {
          icon,
          size,
          color,
          count,
          gutter,
          voidIcon,
          disabled,
          voidColor,
          allowHalf,
          iconPrefix,
          disabledColor
        } = props2;
        var score = index2 + 1;
        var isFull = item.status === "full";
        var isVoid = item.status === "void";
        var renderHalf = allowHalf && item.value > 0 && item.value < 1;
        var style;
        if (gutter && score !== +count) {
          style = {
            paddingRight: addUnit(gutter)
          };
        }
        var onClickItem = (event) => {
          updateRanges();
          select(allowHalf ? getScoreByPosition(event.clientX) : score);
        };
        return vue.createVNode("div", {
          "key": index2,
          "ref": setItemRefs(index2),
          "role": "radio",
          "style": style,
          "class": bem$f("item"),
          "tabindex": 0,
          "aria-setsize": +count,
          "aria-posinset": score,
          "aria-checked": !isVoid,
          "onClick": onClickItem
        }, [vue.createVNode(Icon, {
          "size": size,
          "name": isFull ? icon : voidIcon,
          "class": bem$f("icon", {
            disabled,
            full: isFull
          }),
          "color": disabled ? disabledColor : isFull ? color : voidColor,
          "classPrefix": iconPrefix
        }, null), renderHalf && vue.createVNode(Icon, {
          "size": size,
          "style": {
            width: item.value + "em"
          },
          "name": isVoid ? voidIcon : icon,
          "class": bem$f("icon", ["half", {
            disabled,
            full: !isVoid
          }]),
          "color": disabled ? disabledColor : isVoid ? voidColor : color,
          "classPrefix": iconPrefix
        }, null)]);
      };
      useCustomFieldValue(() => props2.modelValue);
      return () => vue.createVNode("div", {
        "role": "radiogroup",
        "class": bem$f({
          readonly: props2.readonly,
          disabled: props2.disabled
        }),
        "tabindex": 0,
        "onTouchstart": onTouchStart,
        "onTouchmove": onTouchMove
      }, [list.value.map(renderStar)]);
    }
  });
  var Rate = withInstall(_Rate);
  var Row = withInstall(_Row);
  var [name$e, bem$e, t$2] = createNamespace("search");
  var props$4 = extend({}, fieldSharedProps, {
    label: String,
    shape: makeStringProp("square"),
    leftIcon: makeStringProp("search"),
    clearable: truthProp,
    actionText: String,
    background: String,
    showAction: Boolean
  });
  var _Search = vue.defineComponent({
    name: name$e,
    props: props$4,
    emits: ["search", "cancel", "update:modelValue"],
    setup(props2, {
      emit,
      slots,
      attrs
    }) {
      var filedRef = vue.ref();
      var onCancel = () => {
        if (!slots.action) {
          emit("update:modelValue", "");
          emit("cancel");
        }
      };
      var onKeypress = (event) => {
        var ENTER_CODE = 13;
        if (event.keyCode === ENTER_CODE) {
          preventDefault(event);
          emit("search", props2.modelValue);
        }
      };
      var renderLabel = () => {
        if (slots.label || props2.label) {
          return vue.createVNode("label", {
            "class": bem$e("label"),
            "for": props2.id
          }, [slots.label ? slots.label() : props2.label]);
        }
      };
      var renderAction = () => {
        if (props2.showAction) {
          var text = props2.actionText || t$2("cancel");
          return vue.createVNode("div", {
            "class": bem$e("action"),
            "role": "button",
            "tabindex": 0,
            "onClick": onCancel
          }, [slots.action ? slots.action() : text]);
        }
      };
      var blur = () => {
        var _filedRef$value;
        return (_filedRef$value = filedRef.value) == null ? void 0 : _filedRef$value.blur();
      };
      var focus = () => {
        var _filedRef$value2;
        return (_filedRef$value2 = filedRef.value) == null ? void 0 : _filedRef$value2.focus();
      };
      var fieldPropNames = Object.keys(fieldSharedProps);
      var renderField = () => {
        var fieldAttrs = extend({}, attrs, pick(props2, fieldPropNames));
        var onInput = (value) => emit("update:modelValue", value);
        return vue.createVNode(Field, vue.mergeProps({
          "ref": filedRef,
          "type": "search",
          "class": bem$e("field"),
          "border": false,
          "onKeypress": onKeypress,
          "onUpdate:modelValue": onInput
        }, fieldAttrs), pick(slots, ["left-icon", "right-icon"]));
      };
      useExpose({
        focus,
        blur
      });
      return () => vue.createVNode("div", {
        "class": bem$e({
          "show-action": props2.showAction
        }),
        "style": {
          background: props2.background
        }
      }, [slots.left == null ? void 0 : slots.left(), vue.createVNode("div", {
        "class": bem$e("content", props2.shape)
      }, [renderLabel(), renderField()]), renderAction()]);
    }
  });
  var Search = withInstall(_Search);
  var PRESET_ICONS = ["qq", "link", "weibo", "wechat", "poster", "qrcode", "weapp-qrcode", "wechat-moments"];
  var popupKeys = [...popupSharedPropKeys, "round", "closeOnPopstate", "safeAreaInsetBottom"];
  function getIconURL(icon) {
    if (PRESET_ICONS.includes(icon)) {
      return "https://img.yzcdn.cn/vant/share-sheet-" + icon + ".png";
    }
    return icon;
  }
  var [name$d, bem$d, t$1] = createNamespace("share-sheet");
  var _ShareSheet = vue.defineComponent({
    name: name$d,
    props: extend({}, popupSharedProps, {
      title: String,
      round: truthProp,
      options: makeArrayProp(),
      cancelText: String,
      description: String,
      closeOnPopstate: truthProp,
      safeAreaInsetBottom: truthProp
    }),
    emits: ["cancel", "select", "update:show"],
    setup(props2, {
      emit,
      slots
    }) {
      var updateShow = (value) => emit("update:show", value);
      var onCancel = () => {
        updateShow(false);
        emit("cancel");
      };
      var onSelect = (option, index2) => emit("select", option, index2);
      var renderHeader = () => {
        var title = slots.title ? slots.title() : props2.title;
        var description = slots.description ? slots.description() : props2.description;
        if (title || description) {
          return vue.createVNode("div", {
            "class": bem$d("header")
          }, [title && vue.createVNode("h2", {
            "class": bem$d("title")
          }, [title]), description && vue.createVNode("span", {
            "class": bem$d("description")
          }, [description])]);
        }
      };
      var renderOption = (option, index2) => {
        var {
          name: name2,
          icon,
          className,
          description
        } = option;
        return vue.createVNode("div", {
          "role": "button",
          "tabindex": 0,
          "class": [bem$d("option"), className],
          "onClick": () => onSelect(option, index2)
        }, [vue.createVNode("img", {
          "src": getIconURL(icon),
          "class": bem$d("icon")
        }, null), name2 && vue.createVNode("span", {
          "class": bem$d("name")
        }, [name2]), description && vue.createVNode("span", {
          "class": bem$d("option-description")
        }, [description])]);
      };
      var renderOptions = (options, border) => vue.createVNode("div", {
        "class": bem$d("options", {
          border
        })
      }, [options.map(renderOption)]);
      var renderRows = () => {
        var {
          options
        } = props2;
        if (Array.isArray(options[0])) {
          return options.map((item, index2) => renderOptions(item, index2 !== 0));
        }
        return renderOptions(options);
      };
      var renderCancelButton = () => {
        var _props$cancelText;
        var cancelText = (_props$cancelText = props2.cancelText) != null ? _props$cancelText : t$1("cancel");
        if (slots.cancel || cancelText) {
          return vue.createVNode("button", {
            "type": "button",
            "class": bem$d("cancel"),
            "onClick": onCancel
          }, [slots.cancel ? slots.cancel() : cancelText]);
        }
      };
      return () => vue.createVNode(Popup, vue.mergeProps({
        "class": bem$d(),
        "position": "bottom",
        "onUpdate:show": updateShow
      }, pick(props2, popupKeys)), {
        default: () => [renderHeader(), renderRows(), renderCancelButton()]
      });
    }
  });
  var ShareSheet = withInstall(_ShareSheet);
  var [name$c, bem$c] = createNamespace("sidebar");
  var SIDEBAR_KEY = Symbol(name$c);
  var _Sidebar = vue.defineComponent({
    name: name$c,
    props: {
      modelValue: makeNumericProp(0)
    },
    emits: ["change", "update:modelValue"],
    setup(props2, {
      emit,
      slots
    }) {
      var {
        linkChildren
      } = useChildren(SIDEBAR_KEY);
      var getActive = () => +props2.modelValue;
      var setActive = (value) => {
        if (value !== getActive()) {
          emit("update:modelValue", value);
          emit("change", value);
        }
      };
      linkChildren({
        getActive,
        setActive
      });
      return () => vue.createVNode("div", {
        "class": bem$c()
      }, [slots.default == null ? void 0 : slots.default()]);
    }
  });
  var Sidebar = withInstall(_Sidebar);
  var [name$b, bem$b] = createNamespace("sidebar-item");
  var _SidebarItem = vue.defineComponent({
    name: name$b,
    props: extend({}, routeProps, {
      dot: Boolean,
      title: String,
      badge: numericProp,
      disabled: Boolean
    }),
    emits: ["click"],
    setup(props2, {
      emit,
      slots
    }) {
      var route2 = useRoute();
      var {
        parent,
        index: index2
      } = useParent(SIDEBAR_KEY);
      if (!parent) {
        return;
      }
      var onClick = () => {
        if (props2.disabled) {
          return;
        }
        emit("click", index2.value);
        parent.setActive(index2.value);
        route2();
      };
      return () => {
        var {
          dot,
          badge,
          title,
          disabled
        } = props2;
        var selected = index2.value === parent.getActive();
        return vue.createVNode("a", {
          "class": bem$b({
            select: selected,
            disabled
          }),
          "onClick": onClick
        }, [vue.createVNode(Badge, {
          "dot": dot,
          "content": badge,
          "class": bem$b("text")
        }, {
          default: () => [slots.title ? slots.title() : title]
        })]);
      };
    }
  });
  var SidebarItem = withInstall(_SidebarItem);
  var [name$a, bem$a] = createNamespace("skeleton");
  var DEFAULT_ROW_WIDTH = "100%";
  var DEFAULT_LAST_ROW_WIDTH = "60%";
  var _Skeleton = vue.defineComponent({
    name: name$a,
    props: {
      row: makeNumericProp(0),
      title: Boolean,
      round: Boolean,
      avatar: Boolean,
      loading: truthProp,
      animate: truthProp,
      avatarSize: numericProp,
      titleWidth: numericProp,
      avatarShape: makeStringProp("round"),
      rowWidth: {
        type: [Number, String, Array],
        default: DEFAULT_ROW_WIDTH
      }
    },
    setup(props2, {
      slots
    }) {
      var renderAvatar = () => {
        if (props2.avatar) {
          return vue.createVNode("div", {
            "class": bem$a("avatar", props2.avatarShape),
            "style": getSizeStyle(props2.avatarSize)
          }, null);
        }
      };
      var renderTitle = () => {
        if (props2.title) {
          return vue.createVNode("h3", {
            "class": bem$a("title"),
            "style": {
              width: addUnit(props2.titleWidth)
            }
          }, null);
        }
      };
      var getRowWidth = (index2) => {
        var {
          rowWidth
        } = props2;
        if (rowWidth === DEFAULT_ROW_WIDTH && index2 === +props2.row - 1) {
          return DEFAULT_LAST_ROW_WIDTH;
        }
        if (Array.isArray(rowWidth)) {
          return rowWidth[index2];
        }
        return rowWidth;
      };
      var renderRows = () => Array(props2.row).fill("").map((_, i) => vue.createVNode("div", {
        "class": bem$a("row"),
        "style": {
          width: addUnit(getRowWidth(i))
        }
      }, null));
      return () => {
        if (!props2.loading) {
          return slots.default == null ? void 0 : slots.default();
        }
        return vue.createVNode("div", {
          "class": bem$a({
            animate: props2.animate,
            round: props2.round
          })
        }, [renderAvatar(), vue.createVNode("div", {
          "class": bem$a("content")
        }, [renderTitle(), renderRows()])]);
      };
    }
  });
  var Skeleton = withInstall(_Skeleton);
  var [name$9, bem$9] = createNamespace("slider");
  var _Slider = vue.defineComponent({
    name: name$9,
    props: {
      min: makeNumericProp(0),
      max: makeNumericProp(100),
      step: makeNumericProp(1),
      range: Boolean,
      reverse: Boolean,
      disabled: Boolean,
      readonly: Boolean,
      vertical: Boolean,
      barHeight: numericProp,
      buttonSize: numericProp,
      activeColor: String,
      inactiveColor: String,
      modelValue: {
        type: [Number, Array],
        default: 0
      }
    },
    emits: ["change", "drag-end", "drag-start", "update:modelValue"],
    setup(props2, {
      emit,
      slots
    }) {
      var buttonIndex;
      var current;
      var startValue;
      var root = vue.ref();
      var dragStatus = vue.ref();
      var touch = useTouch();
      var scope = vue.computed(() => Number(props2.max) - Number(props2.min));
      var wrapperStyle = vue.computed(() => {
        var crossAxis = props2.vertical ? "width" : "height";
        return {
          background: props2.inactiveColor,
          [crossAxis]: addUnit(props2.barHeight)
        };
      });
      var isRange = (val) => props2.range && Array.isArray(val);
      var calcMainAxis = () => {
        var {
          modelValue,
          min
        } = props2;
        if (isRange(modelValue)) {
          return (modelValue[1] - modelValue[0]) * 100 / scope.value + "%";
        }
        return (modelValue - Number(min)) * 100 / scope.value + "%";
      };
      var calcOffset = () => {
        var {
          modelValue,
          min
        } = props2;
        if (isRange(modelValue)) {
          return (modelValue[0] - Number(min)) * 100 / scope.value + "%";
        }
        return "0%";
      };
      var barStyle = vue.computed(() => {
        var mainAxis = props2.vertical ? "height" : "width";
        var style = {
          [mainAxis]: calcMainAxis(),
          background: props2.activeColor
        };
        if (dragStatus.value) {
          style.transition = "none";
        }
        var getPositionKey = () => {
          if (props2.vertical) {
            return props2.reverse ? "bottom" : "top";
          }
          return props2.reverse ? "right" : "left";
        };
        style[getPositionKey()] = calcOffset();
        return style;
      });
      var format2 = (value) => {
        var min = +props2.min;
        var max = +props2.max;
        var step = +props2.step;
        value = clamp(value, min, max);
        var diff = Math.round((value - min) / step) * step;
        return addNumber(min, diff);
      };
      var isSameValue = (newValue, oldValue) => JSON.stringify(newValue) === JSON.stringify(oldValue);
      var handleRangeValue = (value) => {
        var _value$, _value$2;
        var left2 = (_value$ = value[0]) != null ? _value$ : Number(props2.min);
        var right2 = (_value$2 = value[1]) != null ? _value$2 : Number(props2.max);
        return left2 > right2 ? [right2, left2] : [left2, right2];
      };
      var updateValue = (value, end2) => {
        if (isRange(value)) {
          value = handleRangeValue(value).map(format2);
        } else {
          value = format2(value);
        }
        if (!isSameValue(value, props2.modelValue)) {
          emit("update:modelValue", value);
        }
        if (end2 && !isSameValue(value, startValue)) {
          emit("change", value);
        }
      };
      var onClick = (event) => {
        event.stopPropagation();
        if (props2.disabled || props2.readonly) {
          return;
        }
        var {
          min,
          reverse,
          vertical,
          modelValue
        } = props2;
        var rect = useRect(root);
        var getDelta = () => {
          if (vertical) {
            if (reverse) {
              return rect.bottom - event.clientY;
            }
            return event.clientY - rect.top;
          }
          if (reverse) {
            return rect.right - event.clientX;
          }
          return event.clientX - rect.left;
        };
        var total = vertical ? rect.height : rect.width;
        var value = Number(min) + getDelta() / total * scope.value;
        if (isRange(modelValue)) {
          var [left2, right2] = modelValue;
          var middle = (left2 + right2) / 2;
          if (value <= middle) {
            updateValue([value, right2], true);
          } else {
            updateValue([left2, value], true);
          }
        } else {
          updateValue(value, true);
        }
      };
      var onTouchStart = (event) => {
        if (props2.disabled || props2.readonly) {
          return;
        }
        touch.start(event);
        current = props2.modelValue;
        if (isRange(current)) {
          startValue = current.map(format2);
        } else {
          startValue = format2(current);
        }
        dragStatus.value = "start";
      };
      var onTouchMove = (event) => {
        if (props2.disabled || props2.readonly) {
          return;
        }
        if (dragStatus.value === "start") {
          emit("drag-start", event);
        }
        preventDefault(event, true);
        touch.move(event);
        dragStatus.value = "dragging";
        var rect = useRect(root);
        var delta = props2.vertical ? touch.deltaY.value : touch.deltaX.value;
        var total = props2.vertical ? rect.height : rect.width;
        var diff = delta / total * scope.value;
        if (props2.reverse) {
          diff = -diff;
        }
        if (isRange(startValue)) {
          var index2 = props2.reverse ? 1 - buttonIndex : buttonIndex;
          current[index2] = startValue[index2] + diff;
        } else {
          current = startValue + diff;
        }
        updateValue(current);
      };
      var onTouchEnd = (event) => {
        if (props2.disabled || props2.readonly) {
          return;
        }
        if (dragStatus.value === "dragging") {
          updateValue(current, true);
          emit("drag-end", event);
        }
        dragStatus.value = "";
      };
      var getButtonClassName = (index2) => {
        if (typeof index2 === "number") {
          var position = ["left", "right"];
          return bem$9("button-wrapper", position[index2]);
        }
        return bem$9("button-wrapper", props2.reverse ? "left" : "right");
      };
      var renderButtonContent = (value, index2) => {
        if (typeof index2 === "number") {
          var slot = slots[index2 === 0 ? "left-button" : "right-button"];
          if (slot) {
            return slot({
              value
            });
          }
        }
        if (slots.button) {
          return slots.button({
            value
          });
        }
        return vue.createVNode("div", {
          "class": bem$9("button"),
          "style": getSizeStyle(props2.buttonSize)
        }, null);
      };
      var renderButton = (index2) => {
        var current2 = typeof index2 === "number" ? props2.modelValue[index2] : props2.modelValue;
        return vue.createVNode("div", {
          "role": "slider",
          "class": getButtonClassName(index2),
          "tabindex": props2.disabled || props2.readonly ? -1 : 0,
          "aria-valuemin": +props2.min,
          "aria-valuenow": current2,
          "aria-valuemax": +props2.max,
          "aria-orientation": props2.vertical ? "vertical" : "horizontal",
          "onTouchstart": (event) => {
            if (typeof index2 === "number") {
              buttonIndex = index2;
            }
            onTouchStart(event);
          },
          "onTouchmove": onTouchMove,
          "onTouchend": onTouchEnd,
          "onTouchcancel": onTouchEnd,
          "onClick": stopPropagation
        }, [renderButtonContent(current2, index2)]);
      };
      updateValue(props2.modelValue);
      useCustomFieldValue(() => props2.modelValue);
      return () => vue.createVNode("div", {
        "ref": root,
        "style": wrapperStyle.value,
        "class": bem$9({
          vertical: props2.vertical,
          disabled: props2.disabled
        }),
        "onClick": onClick
      }, [vue.createVNode("div", {
        "class": bem$9("bar"),
        "style": barStyle.value
      }, [props2.range ? [renderButton(0), renderButton(1)] : renderButton()])]);
    }
  });
  var Slider = withInstall(_Slider);
  var [name$8, bem$8] = createNamespace("steps");
  var props$3 = {
    active: makeNumericProp(0),
    direction: makeStringProp("horizontal"),
    activeIcon: makeStringProp("checked"),
    iconPrefix: String,
    finishIcon: String,
    activeColor: String,
    inactiveIcon: String,
    inactiveColor: String
  };
  var STEPS_KEY = Symbol(name$8);
  var _Steps = vue.defineComponent({
    name: name$8,
    props: props$3,
    emits: ["click-step"],
    setup(props2, {
      emit,
      slots
    }) {
      var {
        linkChildren
      } = useChildren(STEPS_KEY);
      var onClickStep = (index2) => emit("click-step", index2);
      linkChildren({
        props: props2,
        onClickStep
      });
      return () => vue.createVNode("div", {
        "class": bem$8([props2.direction])
      }, [vue.createVNode("div", {
        "class": bem$8("items")
      }, [slots.default == null ? void 0 : slots.default()])]);
    }
  });
  var [name$7, bem$7] = createNamespace("step");
  var _Step = vue.defineComponent({
    name: name$7,
    setup(props2, {
      slots
    }) {
      var {
        parent,
        index: index2
      } = useParent(STEPS_KEY);
      if (!parent) {
        return;
      }
      var parentProps = parent.props;
      var getStatus = () => {
        var active = +parentProps.active;
        if (index2.value < active) {
          return "finish";
        }
        return index2.value === active ? "process" : "waiting";
      };
      var isActive = () => getStatus() === "process";
      var lineStyle = vue.computed(() => ({
        background: getStatus() === "finish" ? parentProps.activeColor : parentProps.inactiveColor
      }));
      var titleStyle = vue.computed(() => {
        if (isActive()) {
          return {
            color: parentProps.activeColor
          };
        }
        if (!getStatus()) {
          return {
            color: parentProps.inactiveColor
          };
        }
      });
      var onClickStep = () => parent.onClickStep(index2.value);
      var renderCircle = () => {
        var {
          iconPrefix,
          finishIcon,
          activeIcon,
          activeColor,
          inactiveIcon
        } = parentProps;
        if (isActive()) {
          if (slots["active-icon"]) {
            return slots["active-icon"]();
          }
          return vue.createVNode(Icon, {
            "class": bem$7("icon", "active"),
            "name": activeIcon,
            "color": activeColor,
            "classPrefix": iconPrefix
          }, null);
        }
        if (getStatus() === "finish" && (finishIcon || slots["finish-icon"])) {
          if (slots["finish-icon"]) {
            return slots["finish-icon"]();
          }
          return vue.createVNode(Icon, {
            "class": bem$7("icon", "finish"),
            "name": finishIcon,
            "color": activeColor,
            "classPrefix": iconPrefix
          }, null);
        }
        if (slots["inactive-icon"]) {
          return slots["inactive-icon"]();
        }
        if (inactiveIcon) {
          return vue.createVNode(Icon, {
            "class": bem$7("icon"),
            "name": inactiveIcon,
            "classPrefix": iconPrefix
          }, null);
        }
        return vue.createVNode("i", {
          "class": bem$7("circle"),
          "style": lineStyle.value
        }, null);
      };
      return () => {
        var status = getStatus();
        return vue.createVNode("div", {
          "class": [BORDER, bem$7([parentProps.direction, {
            [status]: status
          }])]
        }, [vue.createVNode("div", {
          "class": bem$7("title", {
            active: isActive()
          }),
          "style": titleStyle.value,
          "onClick": onClickStep
        }, [slots.default == null ? void 0 : slots.default()]), vue.createVNode("div", {
          "class": bem$7("circle-container"),
          "onClick": onClickStep
        }, [renderCircle()]), vue.createVNode("div", {
          "class": bem$7("line"),
          "style": lineStyle.value
        }, null)]);
      };
    }
  });
  var Step = withInstall(_Step);
  var [name$6, bem$6] = createNamespace("stepper");
  var LONG_PRESS_INTERVAL = 200;
  var LONG_PRESS_START_TIME = 600;
  var isEqual = (value1, value2) => String(value1) === String(value2);
  var _Stepper = vue.defineComponent({
    name: name$6,
    props: {
      min: makeNumericProp(1),
      max: makeNumericProp(Infinity),
      name: makeNumericProp(""),
      step: makeNumericProp(1),
      theme: String,
      integer: Boolean,
      disabled: Boolean,
      showPlus: truthProp,
      showMinus: truthProp,
      showInput: truthProp,
      longPress: truthProp,
      allowEmpty: Boolean,
      modelValue: numericProp,
      inputWidth: numericProp,
      buttonSize: numericProp,
      placeholder: String,
      disablePlus: Boolean,
      disableMinus: Boolean,
      disableInput: Boolean,
      beforeChange: Function,
      defaultValue: makeNumericProp(1),
      decimalLength: numericProp
    },
    emits: ["plus", "blur", "minus", "focus", "change", "overlimit", "update:modelValue"],
    setup(props2, {
      emit
    }) {
      var format2 = (value) => {
        var {
          min,
          max,
          allowEmpty,
          decimalLength
        } = props2;
        if (allowEmpty && value === "") {
          return value;
        }
        value = formatNumber(String(value), !props2.integer);
        value = value === "" ? 0 : +value;
        value = Number.isNaN(value) ? +min : value;
        value = Math.max(Math.min(+max, value), +min);
        if (isDef(decimalLength)) {
          value = value.toFixed(+decimalLength);
        }
        return value;
      };
      var getInitialValue = () => {
        var _props$modelValue;
        var defaultValue = (_props$modelValue = props2.modelValue) != null ? _props$modelValue : props2.defaultValue;
        var value = format2(defaultValue);
        if (!isEqual(value, props2.modelValue)) {
          emit("update:modelValue", value);
        }
        return value;
      };
      var actionType;
      var inputRef = vue.ref();
      var current = vue.ref(getInitialValue());
      var minusDisabled = vue.computed(() => props2.disabled || props2.disableMinus || current.value <= +props2.min);
      var plusDisabled = vue.computed(() => props2.disabled || props2.disablePlus || current.value >= +props2.max);
      var inputStyle = vue.computed(() => ({
        width: addUnit(props2.inputWidth),
        height: addUnit(props2.buttonSize)
      }));
      var buttonStyle = vue.computed(() => getSizeStyle(props2.buttonSize));
      var check = () => {
        var value = format2(current.value);
        if (!isEqual(value, current.value)) {
          current.value = value;
        }
      };
      var setValue = (value) => {
        if (props2.beforeChange) {
          callInterceptor(props2.beforeChange, {
            args: [value],
            done() {
              current.value = value;
            }
          });
        } else {
          current.value = value;
        }
      };
      var onChange = () => {
        if (actionType === "plus" && plusDisabled.value || actionType === "minus" && minusDisabled.value) {
          emit("overlimit", actionType);
          return;
        }
        var diff = actionType === "minus" ? -props2.step : +props2.step;
        var value = format2(addNumber(+current.value, diff));
        setValue(value);
        emit(actionType);
      };
      var onInput = (event) => {
        var input = event.target;
        var {
          value
        } = input;
        var {
          decimalLength
        } = props2;
        var formatted = formatNumber(String(value), !props2.integer);
        if (isDef(decimalLength) && formatted.includes(".")) {
          var pair = formatted.split(".");
          formatted = pair[0] + "." + pair[1].slice(0, +decimalLength);
        }
        if (props2.beforeChange) {
          input.value = String(current.value);
        } else if (!isEqual(value, formatted)) {
          input.value = formatted;
        }
        var isNumeric2 = formatted === String(+formatted);
        setValue(isNumeric2 ? +formatted : formatted);
      };
      var onFocus = (event) => {
        if (props2.disableInput) {
          var _inputRef$value;
          (_inputRef$value = inputRef.value) == null ? void 0 : _inputRef$value.blur();
        } else {
          emit("focus", event);
        }
      };
      var onBlur = (event) => {
        var input = event.target;
        var value = format2(input.value);
        input.value = String(value);
        current.value = value;
        vue.nextTick(() => {
          emit("blur", event);
          resetScroll();
        });
      };
      var isLongPress;
      var longPressTimer;
      var longPressStep = () => {
        longPressTimer = setTimeout(() => {
          onChange();
          longPressStep();
        }, LONG_PRESS_INTERVAL);
      };
      var onTouchStart = () => {
        if (props2.longPress) {
          isLongPress = false;
          clearTimeout(longPressTimer);
          longPressTimer = setTimeout(() => {
            isLongPress = true;
            onChange();
            longPressStep();
          }, LONG_PRESS_START_TIME);
        }
      };
      var onTouchEnd = (event) => {
        if (props2.longPress) {
          clearTimeout(longPressTimer);
          if (isLongPress) {
            preventDefault(event);
          }
        }
      };
      var onMousedown = (event) => {
        if (props2.disableInput) {
          event.preventDefault();
        }
      };
      var createListeners = (type) => ({
        onClick: (event) => {
          event.preventDefault();
          actionType = type;
          onChange();
        },
        onTouchstart: () => {
          actionType = type;
          onTouchStart();
        },
        onTouchend: onTouchEnd,
        onTouchcancel: onTouchEnd
      });
      vue.watch([() => props2.max, () => props2.min, () => props2.integer, () => props2.decimalLength], check);
      vue.watch(() => props2.modelValue, (value) => {
        if (!isEqual(value, current.value)) {
          current.value = format2(value);
        }
      });
      vue.watch(current, (value) => {
        emit("update:modelValue", value);
        emit("change", value, {
          name: props2.name
        });
      });
      useCustomFieldValue(() => props2.modelValue);
      return () => vue.createVNode("div", {
        "class": bem$6([props2.theme])
      }, [vue.withDirectives(vue.createVNode("button", vue.mergeProps({
        "type": "button",
        "style": buttonStyle.value,
        "class": bem$6("minus", {
          disabled: minusDisabled.value
        })
      }, createListeners("minus")), null), [[vue.vShow, props2.showMinus]]), vue.withDirectives(vue.createVNode("input", {
        "ref": inputRef,
        "type": props2.integer ? "tel" : "text",
        "role": "spinbutton",
        "class": bem$6("input"),
        "value": current.value,
        "style": inputStyle.value,
        "disabled": props2.disabled,
        "readonly": props2.disableInput,
        "inputmode": props2.integer ? "numeric" : "decimal",
        "placeholder": props2.placeholder,
        "aria-valuemax": +props2.max,
        "aria-valuemin": +props2.min,
        "aria-valuenow": +current.value,
        "onBlur": onBlur,
        "onInput": onInput,
        "onFocus": onFocus,
        "onMousedown": onMousedown
      }, null), [[vue.vShow, props2.showInput]]), vue.withDirectives(vue.createVNode("button", vue.mergeProps({
        "type": "button",
        "style": buttonStyle.value,
        "class": bem$6("plus", {
          disabled: plusDisabled.value
        })
      }, createListeners("plus")), null), [[vue.vShow, props2.showPlus]])]);
    }
  });
  var Stepper = withInstall(_Stepper);
  var Steps = withInstall(_Steps);
  var [name$5, bem$5, t] = createNamespace("submit-bar");
  var _SubmitBar = vue.defineComponent({
    name: name$5,
    props: {
      tip: String,
      label: String,
      price: Number,
      tipIcon: String,
      loading: Boolean,
      currency: makeStringProp("\xA5"),
      disabled: Boolean,
      textAlign: String,
      buttonText: String,
      buttonType: makeStringProp("danger"),
      buttonColor: String,
      suffixLabel: String,
      decimalLength: makeNumericProp(2),
      safeAreaInsetBottom: truthProp
    },
    emits: ["submit"],
    setup(props2, {
      emit,
      slots
    }) {
      var renderText = () => {
        var {
          price,
          label,
          currency,
          textAlign,
          suffixLabel,
          decimalLength
        } = props2;
        if (typeof price === "number") {
          var pricePair = (price / 100).toFixed(+decimalLength).split(".");
          var decimal = decimalLength ? "." + pricePair[1] : "";
          return vue.createVNode("div", {
            "class": bem$5("text"),
            "style": {
              textAlign
            }
          }, [vue.createVNode("span", null, [label || t("label")]), vue.createVNode("span", {
            "class": bem$5("price")
          }, [currency, vue.createVNode("span", {
            "class": bem$5("price-integer")
          }, [pricePair[0]]), decimal]), suffixLabel && vue.createVNode("span", {
            "class": bem$5("suffix-label")
          }, [suffixLabel])]);
        }
      };
      var renderTip = () => {
        var {
          tip,
          tipIcon
        } = props2;
        if (slots.tip || tip) {
          return vue.createVNode("div", {
            "class": bem$5("tip")
          }, [tipIcon && vue.createVNode(Icon, {
            "class": bem$5("tip-icon"),
            "name": tipIcon
          }, null), tip && vue.createVNode("span", {
            "class": bem$5("tip-text")
          }, [tip]), slots.tip == null ? void 0 : slots.tip()]);
        }
      };
      var onClickButton = () => emit("submit");
      var renderButton = () => {
        if (slots.button) {
          return slots.button();
        }
        return vue.createVNode(Button, {
          "round": true,
          "type": props2.buttonType,
          "text": props2.buttonText,
          "class": bem$5("button", props2.buttonType),
          "color": props2.buttonColor,
          "loading": props2.loading,
          "disabled": props2.disabled,
          "onClick": onClickButton
        }, null);
      };
      return () => vue.createVNode("div", {
        "class": [bem$5(), {
          "van-safe-area-bottom": props2.safeAreaInsetBottom
        }]
      }, [slots.top == null ? void 0 : slots.top(), renderTip(), vue.createVNode("div", {
        "class": bem$5("bar")
      }, [slots.default == null ? void 0 : slots.default(), renderText(), renderButton()])]);
    }
  });
  var SubmitBar = withInstall(_SubmitBar);
  var [name$4, bem$4] = createNamespace("swipe-cell");
  var props$2 = {
    name: makeNumericProp(""),
    disabled: Boolean,
    leftWidth: numericProp,
    rightWidth: numericProp,
    beforeClose: Function,
    stopPropagation: Boolean
  };
  var _SwipeCell = vue.defineComponent({
    name: name$4,
    props: props$2,
    emits: ["open", "close", "click"],
    setup(props2, {
      emit,
      slots
    }) {
      var opened;
      var lockClick2;
      var startOffset;
      var root = vue.ref();
      var leftRef = vue.ref();
      var rightRef = vue.ref();
      var state = vue.reactive({
        offset: 0,
        dragging: false
      });
      var touch = useTouch();
      var getWidthByRef = (ref) => ref.value ? useRect(ref).width : 0;
      var leftWidth = vue.computed(() => isDef(props2.leftWidth) ? +props2.leftWidth : getWidthByRef(leftRef));
      var rightWidth = vue.computed(() => isDef(props2.rightWidth) ? +props2.rightWidth : getWidthByRef(rightRef));
      var open = (side) => {
        opened = true;
        state.offset = side === "left" ? leftWidth.value : -rightWidth.value;
        emit("open", {
          name: props2.name,
          position: side
        });
      };
      var close = (position) => {
        state.offset = 0;
        if (opened) {
          opened = false;
          emit("close", {
            name: props2.name,
            position
          });
        }
      };
      var toggle = (side) => {
        var offset2 = Math.abs(state.offset);
        var THRESHOLD = 0.15;
        var threshold = opened ? 1 - THRESHOLD : THRESHOLD;
        var width = side === "left" ? leftWidth.value : rightWidth.value;
        if (width && offset2 > width * threshold) {
          open(side);
        } else {
          close(side);
        }
      };
      var onTouchStart = (event) => {
        if (!props2.disabled) {
          startOffset = state.offset;
          touch.start(event);
        }
      };
      var onTouchMove = (event) => {
        if (props2.disabled) {
          return;
        }
        var {
          deltaX
        } = touch;
        touch.move(event);
        if (touch.isHorizontal()) {
          lockClick2 = true;
          state.dragging = true;
          var isEdge = !opened || deltaX.value * startOffset < 0;
          if (isEdge) {
            preventDefault(event, props2.stopPropagation);
          }
          state.offset = clamp(deltaX.value + startOffset, -rightWidth.value, leftWidth.value);
        }
      };
      var onTouchEnd = () => {
        if (state.dragging) {
          state.dragging = false;
          toggle(state.offset > 0 ? "left" : "right");
          setTimeout(() => {
            lockClick2 = false;
          }, 0);
        }
      };
      var onClick = (position = "outside") => {
        emit("click", position);
        if (opened && !lockClick2) {
          callInterceptor(props2.beforeClose, {
            args: [{
              name: props2.name,
              position
            }],
            done: () => close(position)
          });
        }
      };
      var getClickHandler = (position, stop) => (event) => {
        if (stop) {
          event.stopPropagation();
        }
        onClick(position);
      };
      var renderSideContent = (side, ref) => {
        var contentSlot = slots[side];
        if (contentSlot) {
          return vue.createVNode("div", {
            "ref": ref,
            "class": bem$4(side),
            "onClick": getClickHandler(side, true)
          }, [contentSlot()]);
        }
      };
      useExpose({
        open,
        close
      });
      useClickAway(root, () => onClick("outside"), {
        eventName: "touchstart"
      });
      return () => {
        var wrapperStyle = {
          transform: "translate3d(" + state.offset + "px, 0, 0)",
          transitionDuration: state.dragging ? "0s" : ".6s"
        };
        return vue.createVNode("div", {
          "ref": root,
          "class": bem$4(),
          "onClick": getClickHandler("cell"),
          "onTouchstart": onTouchStart,
          "onTouchmove": onTouchMove,
          "onTouchend": onTouchEnd,
          "onTouchcancel": onTouchEnd
        }, [vue.createVNode("div", {
          "class": bem$4("wrapper"),
          "style": wrapperStyle
        }, [renderSideContent("left", leftRef), slots.default == null ? void 0 : slots.default(), renderSideContent("right", rightRef)])]);
      };
    }
  });
  var SwipeCell = withInstall(_SwipeCell);
  var [name$3, bem$3] = createNamespace("tabbar");
  var props$1 = {
    route: Boolean,
    fixed: truthProp,
    border: truthProp,
    zIndex: numericProp,
    placeholder: Boolean,
    activeColor: String,
    beforeChange: Function,
    inactiveColor: String,
    modelValue: makeNumericProp(0),
    safeAreaInsetBottom: {
      type: Boolean,
      default: null
    }
  };
  var TABBAR_KEY = Symbol(name$3);
  var _Tabbar = vue.defineComponent({
    name: name$3,
    props: props$1,
    emits: ["change", "update:modelValue"],
    setup(props2, {
      emit,
      slots
    }) {
      var root = vue.ref();
      var {
        linkChildren
      } = useChildren(TABBAR_KEY);
      var renderPlaceholder = usePlaceholder(root, bem$3);
      var enableSafeArea = () => {
        var _props$safeAreaInsetB;
        return (_props$safeAreaInsetB = props2.safeAreaInsetBottom) != null ? _props$safeAreaInsetB : props2.fixed;
      };
      var renderTabbar = () => {
        var {
          fixed,
          zIndex,
          border
        } = props2;
        return vue.createVNode("div", {
          "ref": root,
          "style": getZIndexStyle(zIndex),
          "class": [bem$3({
            fixed
          }), {
            [BORDER_TOP_BOTTOM]: border,
            "van-safe-area-bottom": enableSafeArea()
          }]
        }, [slots.default == null ? void 0 : slots.default()]);
      };
      var setActive = (active) => {
        if (active !== props2.modelValue) {
          callInterceptor(props2.beforeChange, {
            args: [active],
            done() {
              emit("update:modelValue", active);
              emit("change", active);
            }
          });
        }
      };
      linkChildren({
        props: props2,
        setActive
      });
      return () => {
        if (props2.fixed && props2.placeholder) {
          return renderPlaceholder(renderTabbar);
        }
        return renderTabbar();
      };
    }
  });
  var Tabbar = withInstall(_Tabbar);
  var [name$2, bem$2] = createNamespace("tabbar-item");
  var _TabbarItem = vue.defineComponent({
    name: name$2,
    props: extend({}, routeProps, {
      dot: Boolean,
      icon: String,
      name: numericProp,
      badge: numericProp,
      iconPrefix: String
    }),
    emits: ["click"],
    setup(props2, {
      emit,
      slots
    }) {
      var route2 = useRoute();
      var vm = vue.getCurrentInstance().proxy;
      var {
        parent,
        index: index2
      } = useParent(TABBAR_KEY);
      if (!parent) {
        return;
      }
      var active = vue.computed(() => {
        var {
          route: route3,
          modelValue
        } = parent.props;
        if (route3 && "$route" in vm) {
          var {
            $route
          } = vm;
          var {
            to
          } = props2;
          var config = isObject$1(to) ? to : {
            path: to
          };
          var pathMatched = "path" in config && config.path === $route.path;
          var nameMatched = "name" in config && config.name === $route.name;
          return pathMatched || nameMatched;
        }
        return (props2.name || index2.value) === modelValue;
      });
      var onClick = (event) => {
        var _props$name;
        parent.setActive((_props$name = props2.name) != null ? _props$name : index2.value);
        emit("click", event);
        route2();
      };
      var renderIcon = () => {
        if (slots.icon) {
          return slots.icon({
            active: active.value
          });
        }
        if (props2.icon) {
          return vue.createVNode(Icon, {
            "name": props2.icon,
            "classPrefix": props2.iconPrefix
          }, null);
        }
      };
      return () => {
        var {
          dot,
          badge
        } = props2;
        var {
          activeColor,
          inactiveColor
        } = parent.props;
        var color = active.value ? activeColor : inactiveColor;
        return vue.createVNode("div", {
          "class": bem$2({
            active: active.value
          }),
          "style": {
            color
          },
          "onClick": onClick
        }, [vue.createVNode(Badge, {
          "dot": dot,
          "content": badge,
          "class": bem$2("icon")
        }, {
          default: renderIcon
        }), vue.createVNode("div", {
          "class": bem$2("text")
        }, [slots.default == null ? void 0 : slots.default({
          active: active.value
        })])]);
      };
    }
  });
  var TabbarItem = withInstall(_TabbarItem);
  var [name$1, bem$1] = createNamespace("tree-select");
  var _TreeSelect = vue.defineComponent({
    name: name$1,
    props: {
      max: makeNumericProp(Infinity),
      items: makeArrayProp(),
      height: makeNumericProp(300),
      selectedIcon: makeStringProp("success"),
      mainActiveIndex: makeNumericProp(0),
      activeId: {
        type: [Number, String, Array],
        default: 0
      }
    },
    emits: ["click-nav", "click-item", "update:activeId", "update:mainActiveIndex"],
    setup(props2, {
      emit,
      slots
    }) {
      var isActiveItem = (id) => Array.isArray(props2.activeId) ? props2.activeId.includes(id) : props2.activeId === id;
      var renderSubItem = (item) => {
        var onClick = () => {
          if (item.disabled) {
            return;
          }
          var activeId;
          if (Array.isArray(props2.activeId)) {
            activeId = props2.activeId.slice();
            var index2 = activeId.indexOf(item.id);
            if (index2 !== -1) {
              activeId.splice(index2, 1);
            } else if (activeId.length < props2.max) {
              activeId.push(item.id);
            }
          } else {
            activeId = item.id;
          }
          emit("update:activeId", activeId);
          emit("click-item", item);
        };
        return vue.createVNode("div", {
          "key": item.id,
          "class": ["van-ellipsis", bem$1("item", {
            active: isActiveItem(item.id),
            disabled: item.disabled
          })],
          "onClick": onClick
        }, [item.text, isActiveItem(item.id) && vue.createVNode(Icon, {
          "name": props2.selectedIcon,
          "class": bem$1("selected")
        }, null)]);
      };
      var onSidebarChange = (index2) => {
        emit("update:mainActiveIndex", index2);
        emit("click-nav", index2);
      };
      var renderSidebar = () => {
        var Items = props2.items.map((item) => vue.createVNode(SidebarItem, {
          "dot": item.dot,
          "title": item.text,
          "badge": item.badge,
          "class": [bem$1("nav-item"), item.className],
          "disabled": item.disabled
        }, null));
        return vue.createVNode(Sidebar, {
          "class": bem$1("nav"),
          "modelValue": props2.mainActiveIndex,
          "onChange": onSidebarChange
        }, {
          default: () => [Items]
        });
      };
      var renderContent = () => {
        if (slots.content) {
          return slots.content();
        }
        var selected = props2.items[+props2.mainActiveIndex] || {};
        if (selected.children) {
          return selected.children.map(renderSubItem);
        }
      };
      return () => vue.createVNode("div", {
        "class": bem$1(),
        "style": {
          height: addUnit(props2.height)
        }
      }, [renderSidebar(), vue.createVNode("div", {
        "class": bem$1("content")
      }, [renderContent()])]);
    }
  });
  var TreeSelect = withInstall(_TreeSelect);
  var [name, bem] = createNamespace("uploader");
  var toArray = (item) => Array.isArray(item) ? item : [item];
  function readFileContent(file, resultType) {
    return new Promise((resolve) => {
      if (resultType === "file") {
        resolve();
        return;
      }
      var reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      if (resultType === "dataUrl") {
        reader.readAsDataURL(file);
      } else if (resultType === "text") {
        reader.readAsText(file);
      }
    });
  }
  function isOversize(items, maxSize) {
    return toArray(items).some((item) => {
      if (item.file) {
        if (isFunction(maxSize)) {
          return maxSize(item.file);
        }
        return item.file.size > maxSize;
      }
      return false;
    });
  }
  function filterFiles(items, maxSize) {
    var valid = [];
    var invalid = [];
    items.forEach((item) => {
      if (isOversize(item, maxSize)) {
        invalid.push(item);
      } else {
        valid.push(item);
      }
    });
    return {
      valid,
      invalid
    };
  }
  var IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
  var isImageUrl = (url) => IMAGE_REGEXP.test(url);
  function isImageFile(item) {
    if (item.isImage) {
      return true;
    }
    if (item.file && item.file.type) {
      return item.file.type.indexOf("image") === 0;
    }
    if (item.url) {
      return isImageUrl(item.url);
    }
    if (typeof item.content === "string") {
      return item.content.indexOf("data:image") === 0;
    }
    return false;
  }
  var UploaderPreviewItem = vue.defineComponent({
    props: {
      name: numericProp,
      item: makeRequiredProp(Object),
      index: Number,
      imageFit: String,
      lazyLoad: Boolean,
      deletable: Boolean,
      previewSize: numericProp,
      beforeDelete: Function
    },
    emits: ["delete", "preview"],
    setup(props2, {
      emit,
      slots
    }) {
      var renderMask = () => {
        var {
          status,
          message
        } = props2.item;
        if (status === "uploading" || status === "failed") {
          var MaskIcon = status === "failed" ? vue.createVNode(Icon, {
            "name": "close",
            "class": bem("mask-icon")
          }, null) : vue.createVNode(Loading, {
            "class": bem("loading")
          }, null);
          var showMessage = isDef(message) && message !== "";
          return vue.createVNode("div", {
            "class": bem("mask")
          }, [MaskIcon, showMessage && vue.createVNode("div", {
            "class": bem("mask-message")
          }, [message])]);
        }
      };
      var onDelete = (event) => {
        var {
          name: name2,
          item,
          index: index2,
          beforeDelete
        } = props2;
        event.stopPropagation();
        callInterceptor(beforeDelete, {
          args: [item, {
            name: name2,
            index: index2
          }],
          done: () => emit("delete")
        });
      };
      var onPreview = () => emit("preview");
      var renderDeleteIcon = () => {
        if (props2.deletable && props2.item.status !== "uploading") {
          return vue.createVNode("div", {
            "class": bem("preview-delete"),
            "onClick": onDelete
          }, [vue.createVNode(Icon, {
            "name": "cross",
            "class": bem("preview-delete-icon")
          }, null)]);
        }
      };
      var renderCover = () => {
        if (slots["preview-cover"]) {
          var {
            index: index2,
            item
          } = props2;
          return vue.createVNode("div", {
            "class": bem("preview-cover")
          }, [slots["preview-cover"](extend({
            index: index2
          }, item))]);
        }
      };
      var renderPreview = () => {
        var {
          item
        } = props2;
        if (isImageFile(item)) {
          return vue.createVNode(Image$1, {
            "fit": props2.imageFit,
            "src": item.content || item.url,
            "class": bem("preview-image"),
            "width": props2.previewSize,
            "height": props2.previewSize,
            "lazyLoad": props2.lazyLoad,
            "onClick": onPreview
          }, {
            default: renderCover
          });
        }
        return vue.createVNode("div", {
          "class": bem("file"),
          "style": getSizeStyle(props2.previewSize)
        }, [vue.createVNode(Icon, {
          "class": bem("file-icon"),
          "name": "description"
        }, null), vue.createVNode("div", {
          "class": [bem("file-name"), "van-ellipsis"]
        }, [item.file ? item.file.name : item.url]), renderCover()]);
      };
      return () => vue.createVNode("div", {
        "class": bem("preview")
      }, [renderPreview(), renderMask(), renderDeleteIcon()]);
    }
  });
  var props = {
    name: makeNumericProp(""),
    accept: makeStringProp("image/*"),
    capture: String,
    multiple: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    lazyLoad: Boolean,
    maxCount: makeNumericProp(Infinity),
    imageFit: makeStringProp("cover"),
    resultType: makeStringProp("dataUrl"),
    uploadIcon: makeStringProp("photograph"),
    uploadText: String,
    deletable: truthProp,
    afterRead: Function,
    showUpload: truthProp,
    modelValue: makeArrayProp(),
    beforeRead: Function,
    beforeDelete: Function,
    previewSize: numericProp,
    previewImage: truthProp,
    previewOptions: Object,
    previewFullImage: truthProp,
    maxSize: {
      type: [Number, String, Function],
      default: Infinity
    }
  };
  var _Uploader = vue.defineComponent({
    name,
    props,
    emits: ["delete", "oversize", "click-upload", "close-preview", "click-preview", "update:modelValue"],
    setup(props2, {
      emit,
      slots
    }) {
      var inputRef = vue.ref();
      var getDetail = (index2 = props2.modelValue.length) => ({
        name: props2.name,
        index: index2
      });
      var resetInput = () => {
        if (inputRef.value) {
          inputRef.value.value = "";
        }
      };
      var onAfterRead = (items) => {
        resetInput();
        if (isOversize(items, props2.maxSize)) {
          if (Array.isArray(items)) {
            var result = filterFiles(items, props2.maxSize);
            items = result.valid;
            emit("oversize", result.invalid, getDetail());
            if (!items.length) {
              return;
            }
          } else {
            emit("oversize", items, getDetail());
            return;
          }
        }
        items = vue.reactive(items);
        emit("update:modelValue", [...props2.modelValue, ...toArray(items)]);
        if (props2.afterRead) {
          props2.afterRead(items, getDetail());
        }
      };
      var readFile = (files) => {
        var {
          maxCount,
          modelValue,
          resultType
        } = props2;
        if (Array.isArray(files)) {
          var remainCount = +maxCount - modelValue.length;
          if (files.length > remainCount) {
            files = files.slice(0, remainCount);
          }
          Promise.all(files.map((file) => readFileContent(file, resultType))).then((contents) => {
            var fileList = files.map((file, index2) => {
              var result = {
                file,
                status: "",
                message: ""
              };
              if (contents[index2]) {
                result.content = contents[index2];
              }
              return result;
            });
            onAfterRead(fileList);
          });
        } else {
          readFileContent(files, resultType).then((content) => {
            var result = {
              file: files,
              status: "",
              message: ""
            };
            if (content) {
              result.content = content;
            }
            onAfterRead(result);
          });
        }
      };
      var onChange = (event) => {
        var {
          files
        } = event.target;
        if (props2.disabled || !files || !files.length) {
          return;
        }
        var file = files.length === 1 ? files[0] : [].slice.call(files);
        if (props2.beforeRead) {
          var response = props2.beforeRead(file, getDetail());
          if (!response) {
            resetInput();
            return;
          }
          if (isPromise(response)) {
            response.then((data) => {
              if (data) {
                readFile(data);
              } else {
                readFile(file);
              }
            }).catch(resetInput);
            return;
          }
        }
        readFile(file);
      };
      var imagePreview;
      var onClosePreview = () => emit("close-preview");
      var previewImage = (item) => {
        if (props2.previewFullImage) {
          var imageFiles = props2.modelValue.filter(isImageFile);
          var images = imageFiles.map((item2) => item2.content || item2.url).filter(Boolean);
          imagePreview = ImagePreview(extend({
            images,
            startPosition: imageFiles.indexOf(item),
            onClose: onClosePreview
          }, props2.previewOptions));
        }
      };
      var closeImagePreview = () => {
        if (imagePreview) {
          imagePreview.close();
        }
      };
      var deleteFile = (item, index2) => {
        var fileList = props2.modelValue.slice(0);
        fileList.splice(index2, 1);
        emit("update:modelValue", fileList);
        emit("delete", item, getDetail(index2));
      };
      var renderPreviewItem = (item, index2) => {
        var needPickData = ["imageFit", "deletable", "previewSize", "beforeDelete"];
        var previewData = extend(pick(props2, needPickData), pick(item, needPickData, true));
        return vue.createVNode(UploaderPreviewItem, vue.mergeProps({
          "item": item,
          "index": index2,
          "onClick": () => emit("click-preview", item, getDetail(index2)),
          "onDelete": () => deleteFile(item, index2),
          "onPreview": () => previewImage(item)
        }, pick(props2, ["name", "lazyLoad"]), previewData), {
          "preview-cover": slots["preview-cover"]
        });
      };
      var renderPreviewList = () => {
        if (props2.previewImage) {
          return props2.modelValue.map(renderPreviewItem);
        }
      };
      var onClickUpload = (event) => emit("click-upload", event);
      var renderUpload = () => {
        if (props2.modelValue.length >= props2.maxCount || !props2.showUpload) {
          return;
        }
        var Input = props2.readonly ? null : vue.createVNode("input", {
          "ref": inputRef,
          "type": "file",
          "class": bem("input"),
          "accept": props2.accept,
          "capture": props2.capture,
          "multiple": props2.multiple,
          "disabled": props2.disabled,
          "onChange": onChange
        }, null);
        if (slots.default) {
          return vue.createVNode("div", {
            "class": bem("input-wrapper"),
            "onClick": onClickUpload
          }, [slots.default(), Input]);
        }
        return vue.createVNode("div", {
          "class": bem("upload", {
            readonly: props2.readonly
          }),
          "style": getSizeStyle(props2.previewSize),
          "onClick": onClickUpload
        }, [vue.createVNode(Icon, {
          "name": props2.uploadIcon,
          "class": bem("upload-icon")
        }, null), props2.uploadText && vue.createVNode("span", {
          "class": bem("upload-text")
        }, [props2.uploadText]), Input]);
      };
      var chooseFile = () => {
        if (inputRef.value && !props2.disabled) {
          inputRef.value.click();
        }
      };
      useExpose({
        chooseFile,
        closeImagePreview
      });
      useCustomFieldValue(() => props2.modelValue);
      return () => vue.createVNode("div", {
        "class": bem()
      }, [vue.createVNode("div", {
        "class": bem("wrapper", {
          disabled: props2.disabled
        })
      }, [renderPreviewList(), renderUpload()])]);
    }
  });
  var Uploader = withInstall(_Uploader);
  var version = "3.2.6";
  function install(app) {
    var components = [ActionBar, ActionBarButton, ActionBarIcon, ActionSheet, AddressEdit, AddressList, Area, Badge, Button, Calendar, Card, Cascader, Cell, CellGroup, Checkbox, CheckboxGroup, Circle, Col, Collapse, CollapseItem, ConfigProvider, ContactCard, ContactEdit, ContactList, CountDown, Coupon, CouponCell, CouponList, DatetimePicker, Dialog, Divider, DropdownItem, DropdownMenu, Empty, Field, Form, Grid, GridItem, Icon, Image$1, ImagePreview, IndexAnchor, IndexBar, List, Loading, Locale, NavBar, NoticeBar, Notify, NumberKeyboard, Overlay, Pagination, PasswordInput, Picker, Popover, Popup, Progress, PullRefresh, Radio, RadioGroup, Rate, Row, Search, ShareSheet, Sidebar, SidebarItem, Skeleton, Slider, Step, Stepper, Steps, Sticky, SubmitBar, Swipe, SwipeCell, SwipeItem, Switch, Tab, Tabbar, TabbarItem, Tabs, Tag, Toast, TreeSelect, Uploader];
    components.forEach((item) => {
      if (item.install) {
        app.use(item);
      } else if (item.name) {
        app.component(item.name, item);
      }
    });
  }
  var index = {
    install,
    version
  };
  exports2.ActionBar = ActionBar;
  exports2.ActionBarButton = ActionBarButton;
  exports2.ActionBarIcon = ActionBarIcon;
  exports2.ActionSheet = ActionSheet;
  exports2.AddressEdit = AddressEdit;
  exports2.AddressList = AddressList;
  exports2.Area = Area;
  exports2.Badge = Badge;
  exports2.Button = Button;
  exports2.Calendar = Calendar;
  exports2.Card = Card;
  exports2.Cascader = Cascader;
  exports2.Cell = Cell;
  exports2.CellGroup = CellGroup;
  exports2.Checkbox = Checkbox;
  exports2.CheckboxGroup = CheckboxGroup;
  exports2.Circle = Circle;
  exports2.Col = Col;
  exports2.Collapse = Collapse;
  exports2.CollapseItem = CollapseItem;
  exports2.ConfigProvider = ConfigProvider;
  exports2.ContactCard = ContactCard;
  exports2.ContactEdit = ContactEdit;
  exports2.ContactList = ContactList;
  exports2.CountDown = CountDown;
  exports2.Coupon = Coupon;
  exports2.CouponCell = CouponCell;
  exports2.CouponList = CouponList;
  exports2.DatetimePicker = DatetimePicker;
  exports2.Dialog = Dialog;
  exports2.Divider = Divider;
  exports2.DropdownItem = DropdownItem;
  exports2.DropdownMenu = DropdownMenu;
  exports2.Empty = Empty;
  exports2.Field = Field;
  exports2.Form = Form;
  exports2.Grid = Grid;
  exports2.GridItem = GridItem;
  exports2.Icon = Icon;
  exports2.Image = Image$1;
  exports2.ImagePreview = ImagePreview;
  exports2.IndexAnchor = IndexAnchor;
  exports2.IndexBar = IndexBar;
  exports2.Lazyload = Lazyload;
  exports2.List = List;
  exports2.Loading = Loading;
  exports2.Locale = Locale;
  exports2.NavBar = NavBar;
  exports2.NoticeBar = NoticeBar;
  exports2.Notify = Notify;
  exports2.NumberKeyboard = NumberKeyboard;
  exports2.Overlay = Overlay;
  exports2.Pagination = Pagination;
  exports2.PasswordInput = PasswordInput;
  exports2.Picker = Picker;
  exports2.Popover = Popover;
  exports2.Popup = Popup;
  exports2.Progress = Progress;
  exports2.PullRefresh = PullRefresh;
  exports2.Radio = Radio;
  exports2.RadioGroup = RadioGroup;
  exports2.Rate = Rate;
  exports2.Row = Row;
  exports2.Search = Search;
  exports2.ShareSheet = ShareSheet;
  exports2.Sidebar = Sidebar;
  exports2.SidebarItem = SidebarItem;
  exports2.Skeleton = Skeleton;
  exports2.Slider = Slider;
  exports2.Step = Step;
  exports2.Stepper = Stepper;
  exports2.Steps = Steps;
  exports2.Sticky = Sticky;
  exports2.SubmitBar = SubmitBar;
  exports2.Swipe = Swipe;
  exports2.SwipeCell = SwipeCell;
  exports2.SwipeItem = SwipeItem;
  exports2.Switch = Switch;
  exports2.Tab = Tab;
  exports2.Tabbar = Tabbar;
  exports2.TabbarItem = TabbarItem;
  exports2.Tabs = Tabs;
  exports2.Tag = Tag;
  exports2.Toast = Toast;
  exports2.TreeSelect = TreeSelect;
  exports2.Uploader = Uploader;
  exports2["default"] = index;
  exports2.install = install;
  exports2.version = version;
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2[Symbol.toStringTag] = "Module";
});
