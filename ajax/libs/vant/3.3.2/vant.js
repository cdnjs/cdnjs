(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue")) : typeof define === "function" && define.amd ? define(["exports", "vue"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.vant = {}, global.Vue));
})(this, function(exports2, vue) {
  "use strict";
  function noop() {
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
  const inBrowser = typeof window !== "undefined";
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
  const isWindow = (val) => val === window;
  const makeDOMRect = (width2, height2) => ({
    top: 0,
    left: 0,
    right: width2,
    bottom: height2,
    width: width2,
    height: height2
  });
  const useRect = (elementOrRef) => {
    const element = vue.unref(elementOrRef);
    if (isWindow(element)) {
      const width2 = element.innerWidth;
      const height2 = element.innerHeight;
      return makeDOMRect(width2, height2);
    }
    if (element == null ? void 0 : element.getBoundingClientRect) {
      return element.getBoundingClientRect();
    }
    return makeDOMRect(0, 0);
  };
  function useToggle(defaultValue = false) {
    const state = vue.ref(defaultValue);
    const toggle = (value = !state.value) => {
      state.value = value;
    };
    return [state, toggle];
  }
  function useParent(key) {
    const parent = vue.inject(key, null);
    if (parent) {
      const instance2 = vue.getCurrentInstance();
      const { link, unlink, internalChildren } = parent;
      link(instance2);
      vue.onUnmounted(() => unlink(instance2));
      const index2 = vue.computed(() => internalChildren.indexOf(instance2));
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
    const result = [];
    const traverse = (children2) => {
      if (Array.isArray(children2)) {
        children2.forEach((child) => {
          var _a;
          if (vue.isVNode(child)) {
            result.push(child);
            if ((_a = child.component) == null ? void 0 : _a.subTree) {
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
    const vnodes = flattenVNodes(parent.subTree.children);
    internalChildren.sort((a, b) => vnodes.indexOf(a.vnode) - vnodes.indexOf(b.vnode));
    const orderedPublicChildren = internalChildren.map((item) => item.proxy);
    publicChildren.sort((a, b) => {
      const indexA = orderedPublicChildren.indexOf(a);
      const indexB = orderedPublicChildren.indexOf(b);
      return indexA - indexB;
    });
  }
  function useChildren(key) {
    const publicChildren = vue.reactive([]);
    const internalChildren = vue.reactive([]);
    const parent = vue.getCurrentInstance();
    const linkChildren = (value) => {
      const link = (child) => {
        if (child.proxy) {
          internalChildren.push(child);
          publicChildren.push(child.proxy);
          sortChildren(parent, publicChildren, internalChildren);
        }
      };
      const unlink = (child) => {
        const index2 = internalChildren.indexOf(child);
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
  const SECOND = 1e3;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  function parseTime(time) {
    const days = Math.floor(time / DAY);
    const hours = Math.floor(time % DAY / HOUR);
    const minutes = Math.floor(time % HOUR / MINUTE);
    const seconds = Math.floor(time % MINUTE / SECOND);
    const milliseconds = Math.floor(time % SECOND);
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
    let rafId;
    let endTime;
    let counting;
    let deactivated;
    const remain = vue.ref(options.time);
    const current2 = vue.computed(() => parseTime(remain.value));
    const pause = () => {
      counting = false;
      cancelRaf(rafId);
    };
    const getCurrentRemain = () => Math.max(endTime - Date.now(), 0);
    const setRemain = (value) => {
      var _a, _b;
      remain.value = value;
      (_a = options.onChange) == null ? void 0 : _a.call(options, current2.value);
      if (value === 0) {
        pause();
        (_b = options.onFinish) == null ? void 0 : _b.call(options);
      }
    };
    const microTick = () => {
      rafId = raf(() => {
        if (counting) {
          setRemain(getCurrentRemain());
          if (remain.value > 0) {
            microTick();
          }
        }
      });
    };
    const macroTick = () => {
      rafId = raf(() => {
        if (counting) {
          const remainRemain = getCurrentRemain();
          if (!isSameSecond(remainRemain, remain.value) || remainRemain === 0) {
            setRemain(remainRemain);
          }
          if (remain.value > 0) {
            macroTick();
          }
        }
      });
    };
    const tick = () => {
      if (!inBrowser) {
        return;
      }
      if (options.millisecond) {
        microTick();
      } else {
        macroTick();
      }
    };
    const start2 = () => {
      if (!counting) {
        endTime = Date.now() + remain.value;
        counting = true;
        tick();
      }
    };
    const reset = (totalTime = options.time) => {
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
      current: current2
    };
  }
  function onMountedOrActivated(hook) {
    let mounted;
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
    const { target = window, passive: passive2 = false, capture = false } = options;
    let attached;
    const add = (target2) => {
      const element = vue.unref(target2);
      if (element && !attached) {
        element.addEventListener(type, listener, { capture, passive: passive2 });
        attached = true;
      }
    };
    const remove2 = (target2) => {
      const element = vue.unref(target2);
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
    const { eventName = "click" } = options;
    const onClick = (event) => {
      const element = vue.unref(target);
      if (element && !element.contains(event.target)) {
        listener(event);
      }
    };
    useEventListener(eventName, onClick, { target: document });
  }
  let width;
  let height;
  function useWindowSize() {
    if (!width) {
      width = vue.ref(0);
      height = vue.ref(0);
      if (inBrowser) {
        const update = () => {
          width.value = window.innerWidth;
          height.value = window.innerHeight;
        };
        update();
        window.addEventListener("resize", update, { passive: true });
        window.addEventListener("orientationchange", update, { passive: true });
      }
    }
    return { width, height };
  }
  const overflowScrollReg = /scroll|auto/i;
  const defaultRoot = inBrowser ? window : void 0;
  function isElement$1(node) {
    const ELEMENT_NODE_TYPE = 1;
    return node.tagName !== "HTML" && node.tagName !== "BODY" && node.nodeType === ELEMENT_NODE_TYPE;
  }
  function getScrollParent$1(el, root = defaultRoot) {
    let node = el;
    while (node && node !== root && isElement$1(node)) {
      const { overflowY } = window.getComputedStyle(node);
      if (overflowScrollReg.test(overflowY)) {
        return node;
      }
      node = node.parentNode;
    }
    return root;
  }
  function useScrollParent(el, root = defaultRoot) {
    const scrollParent = vue.ref();
    vue.onMounted(() => {
      if (el.value) {
        scrollParent.value = getScrollParent$1(el.value, root);
      }
    });
    return scrollParent;
  }
  let visibility;
  function usePageVisibility() {
    if (!visibility) {
      visibility = vue.ref("visible");
      if (inBrowser) {
        const update = () => {
          visibility.value = document.hidden ? "hidden" : "visible";
        };
        update();
        window.addEventListener("visibilitychange", update);
      }
    }
    return visibility;
  }
  const CUSTOM_FIELD_INJECTION_KEY = Symbol("van-field");
  function useCustomFieldValue(customValue) {
    const field = vue.inject(CUSTOM_FIELD_INJECTION_KEY, null);
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
  var isObject = (val) => val !== null && typeof val === "object";
  var isPromise = (val) => isObject(val) && isFunction(val.then) && isFunction(val.catch);
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
  var {
    width: windowWidth,
    height: windowHeight
  } = useWindowSize();
  function addUnit(value) {
    if (isDef(value)) {
      return isNumeric(value) ? value + "px" : String(value);
    }
    return void 0;
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
    return +value * windowWidth.value / 100;
  }
  function convertVh(value) {
    value = value.replace(/vh/g, "");
    return +value * windowHeight.value / 100;
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
  function padZero(num, targetLength) {
    if (targetLength === void 0) {
      targetLength = 2;
    }
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
  function formatNumber(value, allowDot, allowMinus) {
    if (allowDot === void 0) {
      allowDot = true;
    }
    if (allowMinus === void 0) {
      allowMinus = true;
    }
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
    if (!hasOwnProperty.call(to, key) || !isObject(val)) {
      to[key] = val;
    } else {
      to[key] = deepAssign(Object(to[key]), val);
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
    add(newMessages) {
      if (newMessages === void 0) {
        newMessages = {};
      }
      deepAssign(messages, newMessages);
    }
  };
  function createTranslate(name2) {
    var prefix2 = camelize(name2) + ".";
    return function(path) {
      var messages2 = Locale.messages();
      var message = get(messages2, prefix2 + path) || get(messages2, path);
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
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
  var HAPTICS_FEEDBACK = "van-haptics-feedback";
  var FORM_KEY = Symbol("van-form");
  function callInterceptor(interceptor, _ref) {
    var {
      args = [],
      done,
      canceled
    } = _ref;
    if (interceptor) {
      var returnVal = interceptor.apply(null, args);
      if (isPromise(returnVal)) {
        returnVal.then((value) => {
          if (value) {
            done();
          } else if (canceled) {
            canceled();
          }
        }).catch(noop);
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
  var actionBarProps = {
    safeAreaInsetBottom: truthProp
  };
  var _ActionBar = vue.defineComponent({
    name: name$1u,
    props: actionBarProps,
    setup(props, _ref) {
      var {
        slots
      } = _ref;
      var {
        linkChildren
      } = useChildren(ACTION_BAR_KEY);
      linkChildren();
      return () => vue.createVNode("div", {
        "class": [bem$1q(), {
          "van-safe-area-bottom": props.safeAreaInsetBottom
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
  function route(_ref) {
    var {
      to,
      url,
      replace,
      $router: router
    } = _ref;
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
  var badgeProps = {
    dot: Boolean,
    max: numericProp,
    tag: makeStringProp("div"),
    color: String,
    offset: Array,
    content: numericProp,
    showZero: truthProp
  };
  var _Badge = vue.defineComponent({
    name: name$1t,
    props: badgeProps,
    setup(props, _ref) {
      var {
        slots
      } = _ref;
      var hasContent = () => {
        if (slots.content) {
          return true;
        }
        var {
          content,
          showZero
        } = props;
        return isDef(content) && content !== "" && (showZero || content !== 0);
      };
      var renderContent = () => {
        var {
          dot,
          max,
          content
        } = props;
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
          background: props.color
        };
        if (props.offset) {
          var [x, y] = props.offset;
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
        if (hasContent() || props.dot) {
          return vue.createVNode("div", {
            "class": bem$1p({
              dot: props.dot,
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
          } = props;
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
  var configProviderProps = {
    tag: makeStringProp("div"),
    themeVars: Object,
    iconPrefix: String
  };
  function mapThemeVarsToCSSVars(themeVars) {
    var cssVars = {};
    Object.keys(themeVars).forEach((key) => {
      cssVars["--van-" + kebabCase(key)] = themeVars[key];
    });
    return cssVars;
  }
  var _ConfigProvider = vue.defineComponent({
    name: name$1s,
    props: configProviderProps,
    setup(props, _ref) {
      var {
        slots
      } = _ref;
      var style = vue.computed(() => {
        if (props.themeVars) {
          return mapThemeVarsToCSSVars(props.themeVars);
        }
      });
      vue.provide(CONFIG_PROVIDER_KEY, props);
      return () => vue.createVNode(props.tag, {
        "class": bem$1o(),
        "style": style.value
      }, {
        default: () => [slots.default == null ? void 0 : slots.default()]
      });
    }
  });
  var [name$1r, bem$1n] = createNamespace("icon");
  var isImage = (name2) => name2 == null ? void 0 : name2.includes("/");
  var iconProps = {
    dot: Boolean,
    tag: makeStringProp("i"),
    name: String,
    size: numericProp,
    badge: numericProp,
    color: String,
    classPrefix: String
  };
  var _Icon = vue.defineComponent({
    name: name$1r,
    props: iconProps,
    setup(props, _ref) {
      var {
        slots
      } = _ref;
      var config = vue.inject(CONFIG_PROVIDER_KEY, null);
      var classPrefix = vue.computed(() => props.classPrefix || (config == null ? void 0 : config.iconPrefix) || bem$1n());
      return () => {
        var {
          tag,
          dot,
          name: name2,
          size,
          badge,
          color
        } = props;
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
  var loadingProps = {
    size: numericProp,
    type: makeStringProp("circular"),
    color: String,
    vertical: Boolean,
    textSize: numericProp,
    textColor: String
  };
  var _Loading = vue.defineComponent({
    name: name$1q,
    props: loadingProps,
    setup(props, _ref) {
      var {
        slots
      } = _ref;
      var spinnerStyle = vue.computed(() => extend({
        color: props.color
      }, getSizeStyle(props.size)));
      var renderText = () => {
        if (slots.default) {
          var _props$textColor;
          return vue.createVNode("span", {
            "class": bem$1m("text"),
            "style": {
              fontSize: addUnit(props.textSize),
              color: (_props$textColor = props.textColor) != null ? _props$textColor : props.color
            }
          }, [slots.default()]);
        }
      };
      return () => {
        var {
          type,
          vertical
        } = props;
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
  var buttonProps = extend({}, routeProps, {
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
  });
  var _Button = vue.defineComponent({
    name: name$1p,
    props: buttonProps,
    emits: ["click"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var route2 = useRoute();
      var renderLoadingIcon = () => {
        if (slots.loading) {
          return slots.loading();
        }
        return vue.createVNode(Loading, {
          "size": props.loadingSize,
          "type": props.loadingType,
          "class": bem$1l("loading")
        }, null);
      };
      var renderIcon = () => {
        if (props.loading) {
          return renderLoadingIcon();
        }
        if (slots.icon) {
          return vue.createVNode("div", {
            "class": bem$1l("icon")
          }, [slots.icon()]);
        }
        if (props.icon) {
          return vue.createVNode(Icon, {
            "name": props.icon,
            "class": bem$1l("icon"),
            "classPrefix": props.iconPrefix
          }, null);
        }
      };
      var renderText = () => {
        var text;
        if (props.loading) {
          text = props.loadingText;
        } else {
          text = slots.default ? slots.default() : props.text;
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
        } = props;
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
        if (props.loading) {
          preventDefault(event);
        } else if (!props.disabled) {
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
        } = props;
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
  var actionBarButtonProps = extend({}, routeProps, {
    type: String,
    text: String,
    icon: String,
    color: String,
    loading: Boolean,
    disabled: Boolean
  });
  var _ActionBarButton = vue.defineComponent({
    name: name$1o,
    props: actionBarButtonProps,
    setup(props, _ref) {
      var {
        slots
      } = _ref;
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
        } = props;
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
  var actionBarIconProps = extend({}, routeProps, {
    dot: Boolean,
    text: String,
    icon: String,
    color: String,
    badge: numericProp,
    iconClass: unknownProp,
    iconPrefix: String
  });
  var _ActionBarIcon = vue.defineComponent({
    name: name$1n,
    props: actionBarIconProps,
    setup(props, _ref) {
      var {
        slots
      } = _ref;
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
        } = props;
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
      }, [renderIcon(), slots.default ? slots.default() : props.text]);
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
  var overlayProps = {
    show: Boolean,
    zIndex: numericProp,
    duration: numericProp,
    className: unknownProp,
    lockScroll: truthProp,
    customStyle: Object
  };
  var _Overlay = vue.defineComponent({
    name: name$1m,
    props: overlayProps,
    setup(props, _ref) {
      var {
        slots
      } = _ref;
      var lazyRender = useLazyRender(() => props.show);
      var preventTouchMove = (event) => {
        preventDefault(event, true);
      };
      var renderOverlay = lazyRender(() => {
        var style = extend(getZIndexStyle(props.zIndex), props.customStyle);
        if (isDef(props.duration)) {
          style.animationDuration = props.duration + "s";
        }
        return vue.withDirectives(vue.createVNode("div", {
          "style": style,
          "class": [bem$1i(), props.className],
          "onTouchmove": props.lockScroll ? preventTouchMove : noop
        }, [slots.default == null ? void 0 : slots.default()]), [[vue.vShow, props.show]]);
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
  var popupProps$2 = extend({}, popupSharedProps, {
    round: Boolean,
    position: makeStringProp("center"),
    closeIcon: makeStringProp("cross"),
    closeable: Boolean,
    transition: String,
    iconPrefix: String,
    closeOnPopstate: Boolean,
    closeIconPosition: makeStringProp("top-right"),
    safeAreaInsetBottom: Boolean
  });
  var [name$1l, bem$1h] = createNamespace("popup");
  var globalZIndex = 2e3;
  var _Popup = vue.defineComponent({
    name: name$1l,
    inheritAttrs: false,
    props: popupProps$2,
    emits: ["open", "close", "opened", "closed", "update:show", "click-overlay", "click-close-icon"],
    setup(props, _ref) {
      var {
        emit,
        attrs,
        slots
      } = _ref;
      var opened;
      var shouldReopen;
      var zIndex = vue.ref();
      var popupRef = vue.ref();
      var lazyRender = useLazyRender(() => props.show || !props.lazyRender);
      var style = vue.computed(() => {
        var style2 = {
          zIndex: zIndex.value
        };
        if (isDef(props.duration)) {
          var key = props.position === "center" ? "animationDuration" : "transitionDuration";
          style2[key] = props.duration + "s";
        }
        return style2;
      });
      var open = () => {
        if (!opened) {
          if (props.zIndex !== void 0) {
            globalZIndex = +props.zIndex;
          }
          opened = true;
          zIndex.value = ++globalZIndex;
          emit("open");
        }
      };
      var close = () => {
        if (opened) {
          callInterceptor(props.beforeClose, {
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
        if (props.closeOnClickOverlay) {
          close();
        }
      };
      var renderOverlay = () => {
        if (props.overlay) {
          return vue.createVNode(Overlay, {
            "show": props.show,
            "class": props.overlayClass,
            "zIndex": zIndex.value,
            "duration": props.duration,
            "customStyle": props.overlayStyle,
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
        if (props.closeable) {
          return vue.createVNode(Icon, {
            "role": "button",
            "tabindex": 0,
            "name": props.closeIcon,
            "class": [bem$1h("close-icon", props.closeIconPosition), HAPTICS_FEEDBACK],
            "classPrefix": props.iconPrefix,
            "onClick": onClickCloseIcon
          }, null);
        }
      };
      var onOpened = () => emit("opened");
      var onClosed = () => emit("closed");
      var renderPopup = lazyRender(() => {
        var {
          round: round2,
          position,
          safeAreaInsetBottom
        } = props;
        return vue.withDirectives(vue.createVNode("div", vue.mergeProps({
          "ref": popupRef,
          "style": style.value,
          "class": [bem$1h({
            round: round2,
            [position]: position
          }), {
            "van-safe-area-bottom": safeAreaInsetBottom
          }]
        }, attrs), [slots.default == null ? void 0 : slots.default(), renderCloseIcon()]), [[vue.vShow, props.show]]);
      });
      var renderTransition = () => {
        var {
          position,
          transition,
          transitionAppear
        } = props;
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
      vue.watch(() => props.show, (value) => {
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
      useLockScroll(popupRef, () => props.show && props.lockScroll);
      useEventListener("popstate", () => {
        if (props.closeOnPopstate) {
          close();
          shouldReopen = false;
        }
      });
      vue.onMounted(() => {
        if (props.show) {
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
        if (props.show) {
          close();
          shouldReopen = true;
        }
      });
      vue.provide(POPUP_TOGGLE_KEY, () => props.show);
      return () => {
        if (props.teleport) {
          return vue.createVNode(vue.Teleport, {
            "to": props.teleport
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
  var actionSheetProps = extend({}, popupSharedProps, {
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
  });
  var popupInheritKeys$2 = [...popupSharedPropKeys, "round", "closeOnPopstate", "safeAreaInsetBottom"];
  var _ActionSheet = vue.defineComponent({
    name: name$1k,
    props: actionSheetProps,
    emits: ["select", "cancel", "update:show"],
    setup(props, _ref) {
      var {
        slots,
        emit
      } = _ref;
      var updateShow = (show) => emit("update:show", show);
      var onCancel = () => {
        updateShow(false);
        emit("cancel");
      };
      var renderHeader = () => {
        if (props.title) {
          return vue.createVNode("div", {
            "class": bem$1g("header")
          }, [props.title, props.closeable && vue.createVNode(Icon, {
            "name": props.closeIcon,
            "class": [bem$1g("close"), HAPTICS_FEEDBACK],
            "onClick": onCancel
          }, null)]);
        }
      };
      var renderCancel = () => {
        if (slots.cancel || props.cancelText) {
          return [vue.createVNode("div", {
            "class": bem$1g("gap")
          }, null), vue.createVNode("button", {
            "type": "button",
            "class": bem$1g("cancel"),
            "onClick": onCancel
          }, [slots.cancel ? slots.cancel() : props.cancelText])];
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
          if (props.closeOnClickAction) {
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
        if (props.description || slots.description) {
          var content = slots.description ? slots.description() : props.description;
          return vue.createVNode("div", {
            "class": bem$1g("description")
          }, [content]);
        }
      };
      return () => vue.createVNode(Popup, vue.mergeProps({
        "class": bem$1g(),
        "position": "bottom",
        "onUpdate:show": updateShow
      }, pick(props, popupInheritKeys$2)), {
        default: () => [renderHeader(), renderDescription(), vue.createVNode("div", {
          "class": bem$1g("content")
        }, [props.actions.map(renderOption), slots.default == null ? void 0 : slots.default()]), renderCancel()]
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
    if (isObject(obj)) {
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
  var isOptionDisabled = (option) => isObject(option) && option.disabled;
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
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var moving;
      var startOffset;
      var touchStartTime;
      var momentumOffset;
      var transitionEndTrigger;
      var wrapper = vue.ref();
      var state = vue.reactive({
        index: props.defaultIndex,
        offset: 0,
        duration: 0,
        options: deepClone(props.initialOptions)
      });
      var touch = useTouch();
      var count = () => state.options.length;
      var baseOffset = () => props.itemHeight * (+props.visibleItemCount - 1) / 2;
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
        var offset2 = -index2 * props.itemHeight;
        var trigger = () => {
          if (index2 !== state.index) {
            state.index = index2;
            if (emitChange) {
              emit("change", index2);
            }
          }
        };
        if (moving && offset2 !== state.offset) {
          transitionEndTrigger = trigger;
        } else {
          trigger();
        }
        state.offset = offset2;
      };
      var setOptions = (options) => {
        if (JSON.stringify(options) !== JSON.stringify(state.options)) {
          state.options = deepClone(options);
          setIndex(props.defaultIndex);
        }
      };
      var onClickItem = (index2) => {
        if (moving || props.readonly) {
          return;
        }
        transitionEndTrigger = null;
        state.duration = DEFAULT_DURATION;
        setIndex(index2, true);
      };
      var getOptionText = (option) => {
        if (isObject(option) && props.textKey in option) {
          return option[props.textKey];
        }
        return option;
      };
      var getIndexByOffset = (offset2) => clamp(Math.round(-offset2 / props.itemHeight), 0, count() - 1);
      var momentum = (distance, duration) => {
        var speed = Math.abs(distance / duration);
        distance = state.offset + speed / 3e-3 * (distance < 0 ? -1 : 1);
        var index2 = getIndexByOffset(distance);
        state.duration = +props.swipeDuration;
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
        if (props.readonly) {
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
        if (props.readonly) {
          return;
        }
        touch.move(event);
        if (touch.isVertical()) {
          moving = true;
          preventDefault(event, true);
        }
        state.offset = clamp(startOffset + touch.deltaY.value, -(count() * props.itemHeight), props.itemHeight);
        var now = Date.now();
        if (now - touchStartTime > MOMENTUM_LIMIT_TIME) {
          touchStartTime = now;
          momentumOffset = state.offset;
        }
      };
      var onTouchEnd = () => {
        if (props.readonly) {
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
          height: props.itemHeight + "px"
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
            [props.allowHtml ? "innerHTML" : "textContent"]: text
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
      vue.watch(() => props.initialOptions, setOptions);
      vue.watch(() => props.defaultIndex, (value) => setIndex(value));
      return () => vue.createVNode("div", {
        "class": [bem$1f(), props.className],
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
  var [name$1i, bem$1e, t$j] = createNamespace("picker");
  var pickerSharedProps = {
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
  var pickerProps = extend({}, pickerSharedProps, {
    columns: makeArrayProp(),
    valueKey: String,
    defaultIndex: makeNumericProp(0),
    toolbarPosition: makeStringProp("top"),
    columnsFieldNames: Object
  });
  var _Picker = vue.defineComponent({
    name: name$1i,
    props: pickerProps,
    emits: ["confirm", "cancel", "change"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var formattedColumns = vue.ref([]);
      var {
        text: textKey,
        values: valuesKey,
        children: childrenKey
      } = extend({
        text: props.valueKey || "text",
        values: "values",
        children: "children"
      }, props.columnsFieldNames);
      var {
        children,
        linkChildren
      } = useChildren(PICKER_KEY);
      linkChildren();
      var itemHeight = vue.computed(() => unitToPx(props.itemHeight));
      var dataType = vue.computed(() => {
        var firstColumn = props.columns[0];
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
          [childrenKey]: props.columns
        };
        while (cursor && cursor[childrenKey]) {
          var _cursor$defaultIndex;
          var _children = cursor[childrenKey];
          var defaultIndex = (_cursor$defaultIndex = cursor.defaultIndex) != null ? _cursor$defaultIndex : +props.defaultIndex;
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
        } = props;
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
          [childrenKey]: props.columns
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
        if (props.title) {
          return vue.createVNode("div", {
            "class": [bem$1e("title"), "van-ellipsis"]
          }, [props.title]);
        }
      };
      var renderCancel = () => {
        var text = props.cancelButtonText || t$j("cancel");
        return vue.createVNode("button", {
          "type": "button",
          "class": [bem$1e("cancel"), HAPTICS_FEEDBACK],
          "onClick": cancel
        }, [slots.cancel ? slots.cancel() : text]);
      };
      var renderConfirm = () => {
        var text = props.confirmButtonText || t$j("confirm");
        return vue.createVNode("button", {
          "type": "button",
          "class": [bem$1e("confirm"), HAPTICS_FEEDBACK],
          "onClick": confirm
        }, [slots.confirm ? slots.confirm() : text]);
      };
      var renderToolbar = () => {
        if (props.showToolbar) {
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
          "readonly": props.readonly,
          "allowHtml": props.allowHtml,
          "className": item.className,
          "itemHeight": itemHeight.value,
          "defaultIndex": (_item$defaultIndex = item.defaultIndex) != null ? _item$defaultIndex : +props.defaultIndex,
          "swipeDuration": props.swipeDuration,
          "initialOptions": item[valuesKey],
          "visibleItemCount": props.visibleItemCount,
          "onChange": () => onChange(columnIndex)
        }, {
          option: slots.option
        });
      });
      var renderColumns = () => {
        var wrapHeight = itemHeight.value * +props.visibleItemCount;
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
      vue.watch(() => props.columns, format2, {
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
        }, [props.toolbarPosition === "top" ? renderToolbar() : null, props.loading ? vue.createVNode(Loading, {
          "class": bem$1e("loading")
        }, null) : null, (_slots$columnsTop = slots["columns-top"]) == null ? void 0 : _slots$columnsTop.call(slots), renderColumns(), (_slots$columnsBottom = slots["columns-bottom"]) == null ? void 0 : _slots$columnsBottom.call(slots), props.toolbarPosition === "bottom" ? renderToolbar() : null]);
      };
    }
  });
  var Picker = withInstall(_Picker);
  var [name$1h, bem$1d] = createNamespace("area");
  var EMPTY_CODE = "000000";
  var INHERIT_SLOTS = ["title", "cancel", "confirm", "toolbar", "columns-top", "columns-bottom"];
  var INHERIT_PROPS = ["title", "loading", "readonly", "itemHeight", "swipeDuration", "visibleItemCount", "cancelButtonText", "confirmButtonText"];
  var isOverseaCode = (code) => code[0] === "9";
  var areaProps = extend({}, pickerSharedProps, {
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
    props: areaProps,
    emits: ["change", "confirm", "cancel"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var pickerRef = vue.ref();
      var state = vue.reactive({
        code: props.value,
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
        } = props;
        return {
          province: areaList2.province_list || {},
          city: areaList2.city_list || {},
          county: areaList2.county_list || {}
        };
      });
      var placeholderMap = vue.computed(() => {
        var {
          columnsPlaceholder
        } = props;
        return {
          province: columnsPlaceholder[0] || "",
          city: columnsPlaceholder[1] || "",
          county: columnsPlaceholder[2] || ""
        };
      });
      var getDefaultCode = () => {
        if (props.columnsPlaceholder.length) {
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
          if (type === "city" && props.isOverseaCode(code)) {
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
          compareNum = props.isOverseaCode(code) ? 1 : 2;
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
        if (city.length && code.slice(2, 4) === "00" && !props.isOverseaCode(code)) {
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
          if (!value.code || value.name === props.columnsPlaceholder[index2]) {
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
        if (props.isOverseaCode(area.code)) {
          area.country = names[1] || "";
          area.province = names[2] || "";
        } else {
          area.province = names[0] || "";
          area.city = names[1] || "";
          area.county = names[2] || "";
        }
        return area;
      };
      var reset = function(newCode) {
        if (newCode === void 0) {
          newCode = "";
        }
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
      var onCancel = function() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return emit("cancel", ...args);
      };
      vue.onMounted(setValues);
      vue.watch(() => props.value, (value) => {
        state.code = value;
        setValues();
      });
      vue.watch(() => props.areaList, setValues, {
        deep: true
      });
      vue.watch(() => props.columnsNum, () => vue.nextTick(setValues));
      useExpose({
        reset,
        getArea,
        getValues
      });
      return () => {
        var columns = state.columns.slice(0, +props.columnsNum);
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
        }, pick(props, INHERIT_PROPS)), pick(slots, INHERIT_SLOTS));
      };
    }
  });
  var Area = withInstall(_Area);
  var [name$1g, bem$1c] = createNamespace("cell");
  var cellSharedProps = {
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
  var cellProps = extend({}, cellSharedProps, routeProps);
  var _Cell = vue.defineComponent({
    name: name$1g,
    props: cellProps,
    setup(props, _ref) {
      var {
        slots
      } = _ref;
      var route2 = useRoute();
      var renderLabel = () => {
        var showLabel = slots.label || isDef(props.label);
        if (showLabel) {
          return vue.createVNode("div", {
            "class": [bem$1c("label"), props.labelClass]
          }, [slots.label ? slots.label() : props.label]);
        }
      };
      var renderTitle = () => {
        if (slots.title || isDef(props.title)) {
          return vue.createVNode("div", {
            "class": [bem$1c("title"), props.titleClass],
            "style": props.titleStyle
          }, [slots.title ? slots.title() : vue.createVNode("span", null, [props.title]), renderLabel()]);
        }
      };
      var renderValue = () => {
        var slot = slots.value || slots.default;
        var hasValue = slot || isDef(props.value);
        if (hasValue) {
          var hasTitle = slots.title || isDef(props.title);
          return vue.createVNode("div", {
            "class": [bem$1c("value", {
              alone: !hasTitle
            }), props.valueClass]
          }, [slot ? slot() : vue.createVNode("span", null, [props.value])]);
        }
      };
      var renderLeftIcon = () => {
        if (slots.icon) {
          return slots.icon();
        }
        if (props.icon) {
          return vue.createVNode(Icon, {
            "name": props.icon,
            "class": bem$1c("left-icon"),
            "classPrefix": props.iconPrefix
          }, null);
        }
      };
      var renderRightIcon = () => {
        if (slots["right-icon"]) {
          return slots["right-icon"]();
        }
        if (props.isLink) {
          var _name = props.arrowDirection ? "arrow-" + props.arrowDirection : "arrow";
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
        } = props;
        var clickable = (_props$clickable = props.clickable) != null ? _props$clickable : isLink;
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
  var [name$1f, bem$1b] = createNamespace("form");
  var formProps = {
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
    name: name$1f,
    props: formProps,
    emits: ["submit", "failed"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
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
        return props.validateFirst ? validateSeq(name2) : validateAll(name2);
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
          if (props.scrollToError && errors[0].name) {
            scrollToField(errors[0].name);
          }
        });
      };
      var onSubmit = (event) => {
        preventDefault(event);
        submit();
      };
      linkChildren({
        props
      });
      useExpose({
        submit,
        validate,
        scrollToField,
        resetValidation
      });
      return () => vue.createVNode("form", {
        "class": bem$1b(),
        "onSubmit": onSubmit
      }, [slots.default == null ? void 0 : slots.default()]);
    }
  });
  var Form = withInstall(_Form);
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
  function startComposing(_ref) {
    var {
      target
    } = _ref;
    target.composing = true;
  }
  function endComposing(_ref2) {
    var {
      target
    } = _ref2;
    if (target.composing) {
      target.composing = false;
      target.dispatchEvent(new Event("input"));
    }
  }
  function resizeTextarea(input, autosize) {
    var scrollTop = getRootScrollTop();
    input.style.height = "auto";
    var height2 = input.scrollHeight;
    if (isObject(autosize)) {
      var {
        maxHeight,
        minHeight
      } = autosize;
      if (maxHeight !== void 0) {
        height2 = Math.min(height2, maxHeight);
      }
      if (minHeight !== void 0) {
        height2 = Math.max(height2, minHeight);
      }
    }
    if (height2) {
      input.style.height = height2 + "px";
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
  var current = 0;
  function useId() {
    var vm = vue.getCurrentInstance();
    var {
      name: name2 = "unknown"
    } = (vm == null ? void 0 : vm.type) || {};
    return name2 + "-" + ++current;
  }
  var [name$1e, bem$1a] = createNamespace("field");
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
  var fieldProps = extend({}, cellSharedProps, fieldSharedProps, {
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
    name: name$1e,
    props: fieldProps,
    emits: ["blur", "focus", "clear", "keypress", "click-input", "click-left-icon", "click-right-icon", "update:modelValue"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var id = useId();
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
        return String((_props$modelValue = props.modelValue) != null ? _props$modelValue : "");
      };
      var getProp = (key) => {
        if (isDef(props[key])) {
          return props[key];
        }
        if (form && isDef(form.props[key])) {
          return form.props[key];
        }
      };
      var showClear = vue.computed(() => {
        var readonly = getProp("readonly");
        if (props.clearable && !readonly) {
          var hasValue = getModelValue() !== "";
          var trigger = props.clearTrigger === "always" || props.clearTrigger === "focus" && state.focused;
          return hasValue && trigger;
        }
        return false;
      });
      var formValue = vue.computed(() => {
        if (customValue.value && slots.input) {
          return customValue.value();
        }
        return props.modelValue;
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
      var validate = function(rules) {
        if (rules === void 0) {
          rules = props.rules;
        }
        return new Promise((resolve) => {
          resetValidation();
          if (rules) {
            runRules(rules).then(() => {
              if (state.validateFailed) {
                resolve({
                  name: props.name,
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
      };
      var validateWithTrigger = (trigger) => {
        if (form && props.rules) {
          var defaultTrigger = form.props.validateTrigger === trigger;
          var rules = props.rules.filter((rule) => {
            if (rule.trigger) {
              return rule.trigger === trigger;
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
        } = props;
        if (isDef(maxlength) && value.length > maxlength) {
          var modelValue = getModelValue();
          if (modelValue && modelValue.length === +maxlength) {
            return modelValue;
          }
          return value.slice(0, +maxlength);
        }
        return value;
      };
      var updateValue = function(value, trigger) {
        if (trigger === void 0) {
          trigger = "onChange";
        }
        value = limitValueLength(value);
        if (props.type === "number" || props.type === "digit") {
          var isNumber = props.type === "number";
          value = formatNumber(value, isNumber, isNumber);
        }
        if (props.formatter && trigger === props.formatTrigger) {
          value = props.formatter(value);
        }
        if (inputRef.value && inputRef.value.value !== value) {
          inputRef.value.value = value;
        }
        if (value !== props.modelValue) {
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
      var adjustTextareaSize = () => {
        var input = inputRef.value;
        if (props.type === "textarea" && props.autosize && input) {
          resizeTextarea(input, props.autosize);
        }
      };
      var onFocus = (event) => {
        state.focused = true;
        emit("focus", event);
        vue.nextTick(adjustTextareaSize);
        if (getProp("readonly")) {
          blur();
        }
      };
      var onBlur = (event) => {
        if (getProp("readonly")) {
          return;
        }
        state.focused = false;
        updateValue(getModelValue(), "onBlur");
        emit("blur", event);
        validateWithTrigger("onBlur");
        vue.nextTick(adjustTextareaSize);
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
        if (typeof props.error === "boolean") {
          return props.error;
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
          if (!submitOnEnter && props.type !== "textarea") {
            preventDefault(event);
          }
          if (props.type === "search") {
            blur();
          }
        }
        emit("keypress", event);
      };
      var getInputId = () => props.id || id + "-input";
      var renderInput = () => {
        var controlClass = bem$1a("control", [getProp("inputAlign"), {
          error: showError.value,
          custom: !!slots.input,
          "min-height": props.type === "textarea" && !props.autosize
        }]);
        if (slots.input) {
          return vue.createVNode("div", {
            "class": controlClass,
            "onClick": onClickInput
          }, [slots.input()]);
        }
        var inputAttrs = {
          id: getInputId(),
          ref: inputRef,
          name: props.name,
          rows: props.rows !== void 0 ? +props.rows : void 0,
          class: controlClass,
          value: props.modelValue,
          disabled: getProp("disabled"),
          readonly: getProp("readonly"),
          autofocus: props.autofocus,
          placeholder: props.placeholder,
          autocomplete: props.autocomplete,
          "aria-labelledby": props.label ? id + "-label" : void 0,
          onBlur,
          onFocus,
          onInput,
          onClick: onClickInput,
          onChange: endComposing,
          onKeypress,
          onCompositionend: endComposing,
          onCompositionstart: startComposing
        };
        if (props.type === "textarea") {
          return vue.createVNode("textarea", inputAttrs, null);
        }
        return vue.createVNode("input", vue.mergeProps(mapInputType(props.type), inputAttrs), null);
      };
      var renderLeftIcon = () => {
        var leftIconSlot = slots["left-icon"];
        if (props.leftIcon || leftIconSlot) {
          return vue.createVNode("div", {
            "class": bem$1a("left-icon"),
            "onClick": onClickLeftIcon
          }, [leftIconSlot ? leftIconSlot() : vue.createVNode(Icon, {
            "name": props.leftIcon,
            "classPrefix": props.iconPrefix
          }, null)]);
        }
      };
      var renderRightIcon = () => {
        var rightIconSlot = slots["right-icon"];
        if (props.rightIcon || rightIconSlot) {
          return vue.createVNode("div", {
            "class": bem$1a("right-icon"),
            "onClick": onClickRightIcon
          }, [rightIconSlot ? rightIconSlot() : vue.createVNode(Icon, {
            "name": props.rightIcon,
            "classPrefix": props.iconPrefix
          }, null)]);
        }
      };
      var renderWordLimit = () => {
        if (props.showWordLimit && props.maxlength) {
          var count = getModelValue().length;
          return vue.createVNode("div", {
            "class": bem$1a("word-limit")
          }, [vue.createVNode("span", {
            "class": bem$1a("word-num")
          }, [count]), vue.createTextVNode("/"), props.maxlength]);
        }
      };
      var renderMessage = () => {
        if (form && form.props.showErrorMessage === false) {
          return;
        }
        var message = props.errorMessage || state.validateMessage;
        if (message) {
          var slot = slots["error-message"];
          var errorMessageAlign = getProp("errorMessageAlign");
          return vue.createVNode("div", {
            "class": bem$1a("error-message", errorMessageAlign)
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
        if (props.label) {
          return vue.createVNode("label", {
            "id": id + "-label",
            "for": getInputId()
          }, [props.label + colon]);
        }
      };
      var renderFieldBody = () => [vue.createVNode("div", {
        "class": bem$1a("body")
      }, [renderInput(), showClear.value && vue.createVNode(Icon, {
        "name": props.clearIcon,
        "class": bem$1a("clear"),
        "onTouchstart": onClear
      }, null), renderRightIcon(), slots.button && vue.createVNode("div", {
        "class": bem$1a("button")
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
      vue.watch(() => props.modelValue, () => {
        updateValue(getModelValue());
        resetValidation();
        validateWithTrigger("onChange");
        vue.nextTick(adjustTextareaSize);
      });
      vue.onMounted(() => {
        updateValue(getModelValue(), props.formatTrigger);
        vue.nextTick(adjustTextareaSize);
      });
      return () => {
        var disabled = getProp("disabled");
        var labelAlign = getProp("labelAlign");
        var Label = renderLabel();
        var LeftIcon = renderLeftIcon();
        return vue.createVNode(Cell, {
          "size": props.size,
          "icon": props.leftIcon,
          "class": bem$1a({
            error: showError.value,
            disabled,
            ["label-" + labelAlign]: labelAlign
          }),
          "center": props.center,
          "border": props.border,
          "isLink": props.isLink,
          "clickable": props.clickable,
          "titleStyle": labelStyle.value,
          "valueClass": bem$1a("value"),
          "titleClass": [bem$1a("label", [labelAlign, {
            required: props.required
          }]), props.labelClass],
          "arrowDirection": props.arrowDirection
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
    var open = (props) => {
      extend(state, props, {
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
  var [name$1d, bem$19] = createNamespace("toast");
  var popupInheritProps = ["show", "overlay", "transition", "overlayClass", "overlayStyle", "closeOnClickOverlay"];
  var toastProps = {
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
  };
  var VanToast = vue.defineComponent({
    name: name$1d,
    props: toastProps,
    emits: ["update:show"],
    setup(props, _ref) {
      var {
        emit
      } = _ref;
      var timer2;
      var clickable = false;
      var toggleClickable = () => {
        var newValue = props.show && props.forbidClick;
        if (clickable !== newValue) {
          clickable = newValue;
          lockClick(clickable);
        }
      };
      var updateShow = (show) => emit("update:show", show);
      var onClick = () => {
        if (props.closeOnClick) {
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
        } = props;
        var hasIcon = icon || type === "success" || type === "fail";
        if (hasIcon) {
          return vue.createVNode(Icon, {
            "name": icon || type,
            "size": iconSize,
            "class": bem$19("icon"),
            "classPrefix": iconPrefix
          }, null);
        }
        if (type === "loading") {
          return vue.createVNode(Loading, {
            "class": bem$19("loading"),
            "size": iconSize,
            "type": loadingType
          }, null);
        }
      };
      var renderMessage = () => {
        var {
          type,
          message
        } = props;
        if (isDef(message) && message !== "") {
          return type === "html" ? vue.createVNode("div", {
            "class": bem$19("text"),
            "innerHTML": String(message)
          }, null) : vue.createVNode("div", {
            "class": bem$19("text")
          }, [message]);
        }
      };
      vue.watch(() => [props.show, props.forbidClick], toggleClickable);
      vue.watch(() => [props.show, props.type, props.message, props.duration], () => {
        clearTimer();
        if (props.show && props.duration > 0) {
          timer2 = setTimeout(() => {
            updateShow(false);
          }, props.duration);
        }
      });
      vue.onMounted(toggleClickable);
      vue.onUnmounted(toggleClickable);
      return () => vue.createVNode(Popup, vue.mergeProps({
        "class": [bem$19([props.position, {
          [props.type]: !props.icon
        }]), props.className],
        "lockScroll": false,
        "onClick": onClick,
        "onClosed": clearTimer,
        "onUpdate:show": updateShow
      }, pick(props, popupInheritProps)), {
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
    if (isObject(message)) {
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
  function Toast(options) {
    if (options === void 0) {
      options = {};
    }
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
  Toast.allowMultiple = function(value) {
    if (value === void 0) {
      value = true;
    }
    allowMultiple = value;
  };
  Toast.install = (app) => {
    app.use(withInstall(VanToast));
    app.config.globalProperties.$toast = Toast;
  };
  var [name$1c, bem$18] = createNamespace("switch");
  var switchProps = {
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
  };
  var _Switch = vue.defineComponent({
    name: name$1c,
    props: switchProps,
    emits: ["change", "update:modelValue"],
    setup(props, _ref) {
      var {
        emit
      } = _ref;
      var isChecked = () => props.modelValue === props.activeValue;
      var onClick = () => {
        if (!props.disabled && !props.loading) {
          var newValue = isChecked() ? props.inactiveValue : props.activeValue;
          emit("update:modelValue", newValue);
          emit("change", newValue);
        }
      };
      var renderLoading = () => {
        if (props.loading) {
          var color = isChecked() ? props.activeColor : props.inactiveColor;
          return vue.createVNode(Loading, {
            "class": bem$18("loading"),
            "color": color
          }, null);
        }
      };
      useCustomFieldValue(() => props.modelValue);
      return () => {
        var {
          size,
          loading,
          disabled,
          activeColor,
          inactiveColor
        } = props;
        var checked = isChecked();
        var style = {
          fontSize: addUnit(size),
          backgroundColor: checked ? activeColor : inactiveColor
        };
        return vue.createVNode("div", {
          "role": "switch",
          "class": bem$18({
            on: checked,
            loading,
            disabled
          }),
          "style": style,
          "tabindex": disabled ? void 0 : 0,
          "aria-checked": checked,
          "onClick": onClick
        }, [vue.createVNode("div", {
          "class": bem$18("node")
        }, [renderLoading()])]);
      };
    }
  });
  var Switch = withInstall(_Switch);
  var [name$1b, bem$17, t$i] = createNamespace("address-edit-detail");
  var AddressEditDetail = vue.defineComponent({
    name: name$1b,
    props: {
      show: Boolean,
      rows: numericProp,
      value: String,
      rules: Array,
      focused: Boolean,
      maxlength: numericProp,
      searchResult: Array,
      showSearchResult: Boolean
    },
    emits: ["blur", "focus", "input", "select-search"],
    setup(props, _ref) {
      var {
        emit
      } = _ref;
      var field = vue.ref();
      var showSearchResult = () => props.focused && props.searchResult && props.showSearchResult;
      var onSelect = (express) => {
        emit("select-search", express);
        emit("input", ((express.address || "") + " " + (express.name || "")).trim());
      };
      var renderSearchTitle = (express) => {
        if (express.name) {
          var text = express.name.replace(props.value, "<span class=" + bem$17("keyword") + ">" + props.value + "</span>");
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
        } = props;
        return searchResult.map((express) => vue.createVNode(Cell, {
          "clickable": true,
          "key": express.name + express.address,
          "icon": "location-o",
          "label": express.address,
          "class": bem$17("search-item"),
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
        if (props.show) {
          return vue.createVNode(vue.Fragment, null, [vue.createVNode(Field, {
            "autosize": true,
            "clearable": true,
            "ref": field,
            "class": bem$17(),
            "rows": props.rows,
            "type": "textarea",
            "rules": props.rules,
            "label": t$i("label"),
            "border": !showSearchResult(),
            "maxlength": props.maxlength,
            "modelValue": props.value,
            "placeholder": t$i("placeholder"),
            "onBlur": onBlur,
            "onFocus": onFocus,
            "onUpdate:modelValue": onInput
          }, null), renderSearchResult()]);
        }
      };
    }
  });
  var [name$1a, bem$16, t$h] = createNamespace("address-edit");
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
  var addressEditProps = {
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
    name: name$1a,
    props: addressEditProps,
    emits: ["save", "focus", "delete", "click-area", "change-area", "change-detail", "select-search", "change-default"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var areaRef = vue.ref();
      var data = vue.reactive({});
      var showAreaPopup = vue.ref(false);
      var detailFocused = vue.ref(false);
      var areaListLoaded = vue.computed(() => isObject(props.areaList) && Object.keys(props.areaList).length);
      var areaText = vue.computed(() => {
        var {
          country,
          province,
          city,
          county,
          areaCode
        } = data;
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
        return ((_props$searchResult = props.searchResult) == null ? void 0 : _props$searchResult.length) && detailFocused.value;
      });
      var assignAreaValues = () => {
        if (areaRef.value) {
          var detail = areaRef.value.getArea();
          detail.areaCode = detail.code;
          delete detail.code;
          extend(data, detail);
        }
      };
      var onFocus = (key) => {
        detailFocused.value = key === "addressDetail";
        emit("focus", key);
      };
      var rules = vue.computed(() => {
        var {
          validator,
          telValidator,
          postalValidator
        } = props;
        var makeRule = (name2, emptyMessage) => ({
          validator: (value) => {
            if (validator) {
              var message = validator(name2, value);
              if (message) {
                return message;
              }
            }
            if (!value) {
              return emptyMessage;
            }
            return true;
          }
        });
        return {
          name: [makeRule("name", t$h("nameEmpty"))],
          tel: [makeRule("tel", t$h("telInvalid")), {
            validator: telValidator,
            message: t$h("telInvalid")
          }],
          areaCode: [makeRule("areaCode", t$h("areaEmpty"))],
          addressDetail: [makeRule("addressDetail", t$h("addressEmpty"))],
          postalCode: [makeRule("addressDetail", t$h("postalEmpty")), {
            validator: postalValidator,
            message: t$h("postalEmpty")
          }]
        };
      });
      var onSave = () => emit("save", data);
      var onChangeDetail = (val) => {
        data.addressDetail = val;
        emit("change-detail", val);
      };
      var onAreaConfirm = (values) => {
        values = values.filter(Boolean);
        if (values.some((value) => !value.code)) {
          Toast(t$h("areaEmpty"));
        } else {
          showAreaPopup.value = false;
          assignAreaValues();
          emit("change-area", values);
        }
      };
      var onDelete = () => emit("delete", data);
      var getArea = () => {
        var _areaRef$value;
        return ((_areaRef$value = areaRef.value) == null ? void 0 : _areaRef$value.getValues()) || [];
      };
      var setAreaCode = (code) => {
        data.areaCode = code || "";
        if (code) {
          vue.nextTick(assignAreaValues);
        }
      };
      var onDetailBlur = () => {
        setTimeout(() => {
          detailFocused.value = false;
        });
      };
      var setAddressDetail = (value) => {
        data.addressDetail = value;
      };
      var renderSetDefaultCell = () => {
        if (props.showSetDefault) {
          var _slots = {
            "right-icon": () => vue.createVNode(Switch, {
              "modelValue": data.isDefault,
              "onUpdate:modelValue": ($event) => data.isDefault = $event,
              "size": "24",
              "onChange": (event) => emit("change-default", event)
            }, null)
          };
          return vue.withDirectives(vue.createVNode(Cell, {
            "center": true,
            "title": t$h("defaultAddress"),
            "class": bem$16("default")
          }, _slots), [[vue.vShow, !hideBottomFields.value]]);
        }
      };
      useExpose({
        getArea,
        setAreaCode,
        setAddressDetail
      });
      vue.watch(() => props.areaList, () => setAreaCode(data.areaCode));
      vue.watch(() => props.addressInfo, (value) => {
        extend(data, DEFAULT_DATA, value);
        setAreaCode(value.areaCode);
      }, {
        deep: true,
        immediate: true
      });
      return () => {
        var {
          disableArea
        } = props;
        return vue.createVNode(Form, {
          "class": bem$16(),
          "onSubmit": onSave
        }, {
          default: () => [vue.createVNode("div", {
            "class": bem$16("fields")
          }, [vue.createVNode(Field, {
            "modelValue": data.name,
            "onUpdate:modelValue": ($event) => data.name = $event,
            "clearable": true,
            "label": t$h("name"),
            "rules": rules.value.name,
            "placeholder": t$h("name"),
            "onFocus": () => onFocus("name")
          }, null), vue.createVNode(Field, {
            "modelValue": data.tel,
            "onUpdate:modelValue": ($event) => data.tel = $event,
            "clearable": true,
            "type": "tel",
            "label": t$h("tel"),
            "rules": rules.value.tel,
            "maxlength": props.telMaxlength,
            "placeholder": t$h("tel"),
            "onFocus": () => onFocus("tel")
          }, null), vue.withDirectives(vue.createVNode(Field, {
            "readonly": true,
            "label": t$h("area"),
            "is-link": !disableArea,
            "modelValue": areaText.value,
            "rules": rules.value.areaCode,
            "placeholder": props.areaPlaceholder || t$h("area"),
            "onFocus": () => onFocus("areaCode"),
            "onClick": () => {
              emit("click-area");
              showAreaPopup.value = !disableArea;
            }
          }, null), [[vue.vShow, props.showArea]]), vue.createVNode(AddressEditDetail, {
            "show": props.showDetail,
            "rows": props.detailRows,
            "rules": rules.value.addressDetail,
            "value": data.addressDetail,
            "focused": detailFocused.value,
            "maxlength": props.detailMaxlength,
            "searchResult": props.searchResult,
            "showSearchResult": props.showSearchResult,
            "onBlur": onDetailBlur,
            "onFocus": () => onFocus("addressDetail"),
            "onInput": onChangeDetail,
            "onSelect-search": (event) => emit("select-search", event)
          }, null), props.showPostal && vue.withDirectives(vue.createVNode(Field, {
            "modelValue": data.postalCode,
            "onUpdate:modelValue": ($event) => data.postalCode = $event,
            "type": "tel",
            "rules": rules.value.postalCode,
            "label": t$h("postal"),
            "maxlength": "6",
            "placeholder": t$h("postal"),
            "onFocus": () => onFocus("postalCode")
          }, null), [[vue.vShow, !hideBottomFields.value]]), slots.default == null ? void 0 : slots.default()]), renderSetDefaultCell(), vue.withDirectives(vue.createVNode("div", {
            "class": bem$16("buttons")
          }, [vue.createVNode(Button, {
            "block": true,
            "round": true,
            "type": "danger",
            "text": props.saveButtonText || t$h("save"),
            "class": bem$16("button"),
            "loading": props.isSaving,
            "nativeType": "submit"
          }, null), props.showDelete && vue.createVNode(Button, {
            "block": true,
            "round": true,
            "class": bem$16("button"),
            "loading": props.isDeleting,
            "text": props.deleteButtonText || t$h("delete"),
            "onClick": onDelete
          }, null)]), [[vue.vShow, !hideBottomFields.value]]), vue.createVNode(Popup, {
            "show": showAreaPopup.value,
            "onUpdate:show": ($event) => showAreaPopup.value = $event,
            "round": true,
            "teleport": "body",
            "position": "bottom",
            "lazyRender": false
          }, {
            default: () => [vue.createVNode(Area, {
              "ref": areaRef,
              "value": data.areaCode,
              "loading": !areaListLoaded.value,
              "areaList": props.areaList,
              "columnsPlaceholder": props.areaColumnsPlaceholder,
              "onConfirm": onAreaConfirm,
              "onCancel": () => {
                showAreaPopup.value = false;
              }
            }, null)]
          })]
        });
      };
    }
  });
  var AddressEdit = withInstall(_AddressEdit);
  var [name$19, bem$15] = createNamespace("radio-group");
  var radioGroupProps = {
    disabled: Boolean,
    iconSize: numericProp,
    direction: String,
    modelValue: unknownProp,
    checkedColor: String
  };
  var RADIO_KEY = Symbol(name$19);
  var _RadioGroup = vue.defineComponent({
    name: name$19,
    props: radioGroupProps,
    emits: ["change", "update:modelValue"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var {
        linkChildren
      } = useChildren(RADIO_KEY);
      var updateValue = (value) => emit("update:modelValue", value);
      vue.watch(() => props.modelValue, (value) => emit("change", value));
      linkChildren({
        props,
        updateValue
      });
      useCustomFieldValue(() => props.modelValue);
      return () => vue.createVNode("div", {
        "class": bem$15([props.direction]),
        "role": "radiogroup"
      }, [slots.default == null ? void 0 : slots.default()]);
    }
  });
  var RadioGroup = withInstall(_RadioGroup);
  var [name$18, bem$14] = createNamespace("tag");
  var tagProps = {
    size: String,
    mark: Boolean,
    show: truthProp,
    type: makeStringProp("default"),
    color: String,
    plain: Boolean,
    round: Boolean,
    textColor: String,
    closeable: Boolean
  };
  var _Tag = vue.defineComponent({
    name: name$18,
    props: tagProps,
    emits: ["close"],
    setup(props, _ref) {
      var {
        slots,
        emit
      } = _ref;
      var onClose = (event) => {
        event.stopPropagation();
        emit("close", event);
      };
      var getStyle = () => {
        if (props.plain) {
          return {
            color: props.textColor || props.color,
            borderColor: props.color
          };
        }
        return {
          color: props.textColor,
          background: props.color
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
        } = props;
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
          "class": bem$14("close"),
          "onClick": onClose
        }, null);
        return vue.createVNode("span", {
          "style": getStyle(),
          "class": bem$14([classes, type])
        }, [slots.default == null ? void 0 : slots.default(), CloseIcon]);
      };
      return () => vue.createVNode(vue.Transition, {
        "name": props.closeable ? "van-fade" : void 0
      }, {
        default: () => [props.show ? renderTag() : null]
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
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var iconRef = vue.ref();
      var getParentProp = (name2) => {
        if (props.parent && props.bindGroup) {
          return props.parent.props[name2];
        }
      };
      var disabled = vue.computed(() => getParentProp("disabled") || props.disabled);
      var direction = vue.computed(() => getParentProp("direction"));
      var iconStyle = vue.computed(() => {
        var checkedColor = props.checkedColor || getParentProp("checkedColor");
        if (checkedColor && props.checked && !disabled.value) {
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
        if (!disabled.value && (iconClicked || !props.labelDisabled)) {
          emit("toggle");
        }
        emit("click", event);
      };
      var renderIcon = () => {
        var {
          bem: bem2,
          shape,
          checked
        } = props;
        var iconSize = props.iconSize || getParentProp("iconSize");
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
            "class": props.bem("label", [props.labelPosition, {
              disabled: disabled.value
            }])
          }, [slots.default()]);
        }
      };
      return () => {
        var nodes = props.labelPosition === "left" ? [renderLabel(), renderIcon()] : [renderIcon(), renderLabel()];
        return vue.createVNode("div", {
          "role": props.role,
          "class": props.bem([{
            disabled: disabled.value,
            "label-disabled": props.labelDisabled
          }, direction.value]),
          "tabindex": disabled.value ? void 0 : 0,
          "aria-checked": props.checked,
          "onClick": onClick
        }, [nodes]);
      };
    }
  });
  var [name$17, bem$13] = createNamespace("radio");
  var _Radio = vue.defineComponent({
    name: name$17,
    props: checkerProps,
    emits: ["update:modelValue"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var {
        parent
      } = useParent(RADIO_KEY);
      var checked = () => {
        var value = parent ? parent.props.modelValue : props.modelValue;
        return value === props.name;
      };
      var toggle = () => {
        if (parent) {
          parent.updateValue(props.name);
        } else {
          emit("update:modelValue", props.name);
        }
      };
      return () => vue.createVNode(Checker, vue.mergeProps({
        "bem": bem$13,
        "role": "radio",
        "parent": parent,
        "checked": checked(),
        "onToggle": toggle
      }, props), pick(slots, ["default", "icon"]));
    }
  });
  var Radio = withInstall(_Radio);
  var [name$16, bem$12] = createNamespace("address-item");
  var AddressListItem = vue.defineComponent({
    name: name$16,
    props: {
      address: makeRequiredProp(Object),
      disabled: Boolean,
      switchable: Boolean,
      defaultTagText: String
    },
    emits: ["edit", "click", "select"],
    setup(props, _ref) {
      var {
        slots,
        emit
      } = _ref;
      var onClick = () => {
        if (props.switchable) {
          emit("select");
        }
        emit("click");
      };
      var renderRightIcon = () => vue.createVNode(Icon, {
        "name": "edit",
        "class": bem$12("edit"),
        "onClick": (event) => {
          event.stopPropagation();
          emit("edit");
          emit("click");
        }
      }, null);
      var renderTag = () => {
        if (slots.tag) {
          return slots.tag(props.address);
        }
        if (props.address.isDefault && props.defaultTagText) {
          return vue.createVNode(Tag, {
            "type": "danger",
            "round": true,
            "class": bem$12("tag")
          }, {
            default: () => [props.defaultTagText]
          });
        }
      };
      var renderContent = () => {
        var {
          address,
          disabled,
          switchable
        } = props;
        var Info = [vue.createVNode("div", {
          "class": bem$12("name")
        }, [address.name + " " + address.tel, renderTag()]), vue.createVNode("div", {
          "class": bem$12("address")
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
        } = props;
        return vue.createVNode("div", {
          "class": bem$12({
            disabled
          }),
          "onClick": onClick
        }, [vue.createVNode(Cell, {
          "border": false,
          "valueClass": bem$12("value")
        }, {
          value: renderContent,
          "right-icon": renderRightIcon
        }), slots.bottom == null ? void 0 : slots.bottom(extend({}, props.address, {
          disabled
        }))]);
      };
    }
  });
  var [name$15, bem$11, t$g] = createNamespace("address-list");
  var addressListProps = {
    list: makeArrayProp(),
    modelValue: numericProp,
    switchable: truthProp,
    disabledText: String,
    disabledList: makeArrayProp(),
    addButtonText: String,
    defaultTagText: String
  };
  var _AddressList = vue.defineComponent({
    name: name$15,
    props: addressListProps,
    emits: ["add", "edit", "select", "click-item", "edit-disabled", "select-disabled", "update:modelValue"],
    setup(props, _ref) {
      var {
        slots,
        emit
      } = _ref;
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
          "switchable": props.switchable,
          "defaultTagText": props.defaultTagText,
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
        "class": [bem$11("bottom"), "van-safe-area-bottom"]
      }, [vue.createVNode(Button, {
        "round": true,
        "block": true,
        "type": "danger",
        "text": props.addButtonText || t$g("add"),
        "class": bem$11("add"),
        "onClick": () => emit("add")
      }, null)]);
      return () => {
        var List2 = renderList(props.list);
        var DisabledList = renderList(props.disabledList, true);
        var DisabledText = props.disabledText && vue.createVNode("div", {
          "class": bem$11("disabled-text")
        }, [props.disabledText]);
        return vue.createVNode("div", {
          "class": bem$11()
        }, [slots.top == null ? void 0 : slots.top(), vue.createVNode(RadioGroup, {
          "modelValue": props.modelValue
        }, {
          default: () => [List2]
        }), DisabledText, DisabledList, slots.default == null ? void 0 : slots.default(), renderBottom()]);
      };
    }
  });
  var AddressList = withInstall(_AddressList);
  var [name$14, bem$10, t$f] = createNamespace("calendar");
  var formatMonthTitle = (date) => t$f("monthTitle", date.getFullYear(), date.getMonth() + 1);
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
  var sharedProps = extend({}, pickerSharedProps, {
    filter: Function,
    columnsOrder: Array,
    formatter: {
      type: Function,
      default: (type, value) => value
    }
  });
  var pickerInheritKeys = Object.keys(pickerSharedProps);
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
    var height2 = vue.ref();
    vue.onMounted(() => vue.nextTick(() => {
      height2.value = useRect(element).height;
    }));
    return height2;
  };
  var [name$13] = createNamespace("calendar-day");
  var CalendarDay = vue.defineComponent({
    name: name$13,
    props: {
      item: makeRequiredProp(Object),
      color: String,
      index: Number,
      offset: makeNumberProp(0),
      rowHeight: String
    },
    emits: ["click"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var style = vue.computed(() => {
        var {
          item,
          index: index2,
          color,
          offset: offset2,
          rowHeight
        } = props;
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
        if (props.item.type !== "disabled") {
          emit("click", props.item);
        }
      };
      var renderTopInfo = () => {
        var {
          topInfo
        } = props.item;
        if (topInfo || slots["top-info"]) {
          return vue.createVNode("div", {
            "class": bem$10("top-info")
          }, [slots["top-info"] ? slots["top-info"](props.item) : topInfo]);
        }
      };
      var renderBottomInfo = () => {
        var {
          bottomInfo
        } = props.item;
        if (bottomInfo || slots["bottom-info"]) {
          return vue.createVNode("div", {
            "class": bem$10("bottom-info")
          }, [slots["bottom-info"] ? slots["bottom-info"](props.item) : bottomInfo]);
        }
      };
      var renderContent = () => {
        var {
          item,
          color,
          rowHeight
        } = props;
        var {
          type,
          text
        } = item;
        var Nodes = [renderTopInfo(), text, renderBottomInfo()];
        if (type === "selected") {
          return vue.createVNode("div", {
            "class": bem$10("selected-day"),
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
        } = props.item;
        if (type === "placeholder") {
          return vue.createVNode("div", {
            "class": bem$10("day"),
            "style": style.value
          }, null);
        }
        return vue.createVNode("div", {
          "role": "gridcell",
          "style": style.value,
          "class": [bem$10("day", type), className],
          "tabindex": type === "disabled" ? void 0 : -1,
          "onClick": onClick
        }, [renderContent()]);
      };
    }
  });
  var [name$12] = createNamespace("calendar-month");
  var calendarMonthProps = {
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
    name: name$12,
    props: calendarMonthProps,
    emits: ["click", "update-height"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var [visible, setVisible] = useToggle();
      var daysRef = vue.ref();
      var monthRef = vue.ref();
      var height2 = useHeight(monthRef);
      var title = vue.computed(() => formatMonthTitle(props.date));
      var rowHeight = vue.computed(() => addUnit(props.rowHeight));
      var offset2 = vue.computed(() => {
        var realDay = props.date.getDay();
        if (props.firstDayOfWeek) {
          return (realDay + 7 - props.firstDayOfWeek) % 7;
        }
        return realDay;
      });
      var totalDay = vue.computed(() => getMonthEndDay(props.date.getFullYear(), props.date.getMonth() + 1));
      var shouldRender = vue.computed(() => visible.value || !props.lazyRender);
      var getTitle = () => title.value;
      var getMultipleDayType = (day) => {
        var isSelected = (date) => props.currentDate.some((item) => compareDay(item, date) === 0);
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
        var [startDay, endDay] = props.currentDate;
        if (!startDay) {
          return "";
        }
        var compareToStart = compareDay(day, startDay);
        if (!endDay) {
          return compareToStart === 0 ? "start" : "";
        }
        var compareToEnd = compareDay(day, endDay);
        if (props.allowSameDay && compareToStart === 0 && compareToEnd === 0) {
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
        } = props;
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
        if (props.type === "range") {
          if (dayType === "start" || dayType === "end") {
            return t$f(dayType);
          }
          if (dayType === "start-end") {
            return t$f("startEnd");
          }
        }
      };
      var renderTitle = () => {
        if (props.showMonthTitle) {
          return vue.createVNode("div", {
            "class": bem$10("month-title")
          }, [title.value]);
        }
      };
      var renderMark = () => {
        if (props.showMark && shouldRender.value) {
          return vue.createVNode("div", {
            "class": bem$10("month-mark")
          }, [props.date.getMonth() + 1]);
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
        var year = props.date.getFullYear();
        var month = props.date.getMonth();
        for (var day = 1; day <= totalDay.value; day++) {
          var date = new Date(year, month, day);
          var type = getDayType(date);
          var config = {
            date,
            type,
            text: day,
            bottomInfo: getBottomInfo(type)
          };
          if (props.formatter) {
            config = props.formatter(config);
          }
          days2.push(config);
        }
        return days2;
      });
      var disabledDays = vue.computed(() => days.value.filter((day) => day.type === "disabled"));
      var scrollToDate = (body, targetDate) => {
        if (daysRef.value) {
          var daysRect = useRect(daysRef.value);
          var totalRows = placeholders.value.length;
          var currentRow = Math.ceil((targetDate.getDate() + offset2.value) / 7);
          var rowOffset = (currentRow - 1) * daysRect.height / totalRows;
          setScrollTop(body, daysRect.top + rowOffset + body.scrollTop - useRect(body).top);
        }
      };
      var renderDay = (item, index2) => vue.createVNode(CalendarDay, {
        "item": item,
        "index": index2,
        "color": props.color,
        "offset": offset2.value,
        "rowHeight": rowHeight.value,
        "onClick": (item2) => emit("click", item2)
      }, pick(slots, ["top-info", "bottom-info"]));
      var renderDays = () => vue.createVNode("div", {
        "ref": daysRef,
        "role": "grid",
        "class": bem$10("days")
      }, [renderMark(), (shouldRender.value ? days : placeholders).value.map(renderDay)]);
      useExpose({
        getTitle,
        getHeight: () => height2.value,
        setVisible,
        scrollToDate,
        disabledDays
      });
      return () => vue.createVNode("div", {
        "class": bem$10("month"),
        "ref": monthRef
      }, [renderTitle(), renderDays()]);
    }
  });
  var [name$11] = createNamespace("calendar-header");
  var CalendarHeader = vue.defineComponent({
    name: name$11,
    props: {
      title: String,
      subtitle: String,
      showTitle: Boolean,
      showSubtitle: Boolean,
      firstDayOfWeek: Number
    },
    emits: ["click-subtitle"],
    setup(props, _ref) {
      var {
        slots,
        emit
      } = _ref;
      var renderTitle = () => {
        if (props.showTitle) {
          var text = props.title || t$f("title");
          var title = slots.title ? slots.title() : text;
          return vue.createVNode("div", {
            "class": bem$10("header-title")
          }, [title]);
        }
      };
      var onClickSubtitle = (event) => emit("click-subtitle", event);
      var renderSubtitle = () => {
        if (props.showSubtitle) {
          var title = slots.subtitle ? slots.subtitle() : props.subtitle;
          return vue.createVNode("div", {
            "class": bem$10("header-subtitle"),
            "onClick": onClickSubtitle
          }, [title]);
        }
      };
      var renderWeekDays = () => {
        var {
          firstDayOfWeek
        } = props;
        var weekdays = t$f("weekdays");
        var renderWeekDays2 = [...weekdays.slice(firstDayOfWeek, 7), ...weekdays.slice(0, firstDayOfWeek)];
        return vue.createVNode("div", {
          "class": bem$10("weekdays")
        }, [renderWeekDays2.map((text) => vue.createVNode("span", {
          "class": bem$10("weekday")
        }, [text]))]);
      };
      return () => vue.createVNode("div", {
        "class": bem$10("header")
      }, [renderTitle(), renderSubtitle(), renderWeekDays()]);
    }
  });
  var calendarProps = {
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
    name: name$14,
    props: calendarProps,
    emits: ["select", "confirm", "unselect", "month-show", "over-range", "update:show", "click-subtitle"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var limitDateRange = function(date, minDate, maxDate) {
        if (minDate === void 0) {
          minDate = props.minDate;
        }
        if (maxDate === void 0) {
          maxDate = props.maxDate;
        }
        if (compareDay(date, minDate) === -1) {
          return minDate;
        }
        if (compareDay(date, maxDate) === 1) {
          return maxDate;
        }
        return date;
      };
      var getInitialDate = function(defaultDate) {
        if (defaultDate === void 0) {
          defaultDate = props.defaultDate;
        }
        var {
          type,
          minDate,
          maxDate
        } = props;
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
      var dayOffset = vue.computed(() => props.firstDayOfWeek ? +props.firstDayOfWeek % 7 : 0);
      var months = vue.computed(() => {
        var months2 = [];
        var cursor = new Date(props.minDate);
        cursor.setDate(1);
        do {
          months2.push(new Date(cursor));
          cursor.setMonth(cursor.getMonth() + 1);
        } while (compareMonth(cursor, props.maxDate) !== 1);
        return months2;
      });
      var buttonDisabled = vue.computed(() => {
        if (currentDate.value) {
          if (props.type === "range") {
            return !currentDate.value[0] || !currentDate.value[1];
          }
          if (props.type === "multiple") {
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
        var height2 = 0;
        var currentMonth;
        var visibleRange = [-1, -1];
        for (var i = 0; i < months.value.length; i++) {
          var month = monthRefs.value[i];
          var visible = height2 <= bottom2 && height2 + heights[i] >= top2;
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
          height2 += heights[i];
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
                monthRefs.value[index2].scrollToDate(bodyRef.value, targetDate);
              }
              return true;
            }
            return false;
          });
          onScroll();
        });
      };
      var scrollToCurrentDate = () => {
        if (props.poppable && !props.show) {
          return;
        }
        if (currentDate.value) {
          var targetDate = props.type === "single" ? currentDate.value : currentDate.value[0];
          scrollToDate(targetDate);
        } else {
          raf(onScroll);
        }
      };
      var init = () => {
        if (props.poppable && !props.show) {
          return;
        }
        raf(() => {
          bodyHeight = Math.floor(useRect(bodyRef).height);
          scrollToCurrentDate();
        });
      };
      var reset = function(date) {
        if (date === void 0) {
          date = getInitialDate();
        }
        currentDate.value = date;
        scrollToCurrentDate();
      };
      var checkRange = (date) => {
        var {
          maxRange,
          rangePrompt,
          showRangePrompt
        } = props;
        if (maxRange && calcDateNum(date) > maxRange) {
          if (showRangePrompt) {
            Toast(rangePrompt || t$f("rangePrompt", maxRange));
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
        if (complete && props.type === "range") {
          var valid = checkRange(date);
          if (!valid) {
            setCurrentDate([date[0], getDayByOffset(date[0], +props.maxRange - 1)]);
            return;
          }
        }
        setCurrentDate(date);
        if (complete && !props.showConfirm) {
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
        if (props.readonly || !item.date) {
          return;
        }
        var {
          date
        } = item;
        var {
          type
        } = props;
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
            } else if (props.allowSameDay) {
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
          } else if (props.maxRange && dates.length >= props.maxRange) {
            Toast(props.rangePrompt || t$f("rangePrompt", props.maxRange));
          } else {
            select([...dates, date]);
          }
        } else {
          select(date, true);
        }
      };
      var updateShow = (value) => emit("update:show", value);
      var renderMonth = (date, index2) => {
        var showMonthTitle = index2 !== 0 || !props.showSubtitle;
        return vue.createVNode(CalendarMonth, vue.mergeProps({
          "ref": setMonthRefs(index2),
          "date": date,
          "currentDate": currentDate.value,
          "showMonthTitle": showMonthTitle,
          "firstDayOfWeek": dayOffset.value
        }, pick(props, ["type", "color", "minDate", "maxDate", "showMark", "formatter", "rowHeight", "lazyRender", "showSubtitle", "allowSameDay"]), {
          "onClick": onClickDay
        }), pick(slots, ["top-info", "bottom-info"]));
      };
      var renderFooterButton = () => {
        if (slots.footer) {
          return slots.footer();
        }
        if (props.showConfirm) {
          var slot = slots["confirm-text"];
          var disabled = buttonDisabled.value;
          var text = disabled ? props.confirmDisabledText : props.confirmText;
          return vue.createVNode(Button, {
            "round": true,
            "block": true,
            "type": "danger",
            "color": props.color,
            "class": bem$10("confirm"),
            "disabled": disabled,
            "nativeType": "button",
            "onClick": onConfirm
          }, {
            default: () => [slot ? slot({
              disabled
            }) : text || t$f("confirm")]
          });
        }
      };
      var renderFooter = () => vue.createVNode("div", {
        "class": [bem$10("footer"), {
          "van-safe-area-bottom": props.safeAreaInsetBottom
        }]
      }, [renderFooterButton()]);
      var renderCalendar = () => vue.createVNode("div", {
        "class": bem$10()
      }, [vue.createVNode(CalendarHeader, {
        "title": props.title,
        "subtitle": subtitle.value,
        "showTitle": props.showTitle,
        "showSubtitle": props.showSubtitle,
        "firstDayOfWeek": dayOffset.value,
        "onClick-subtitle": (event) => emit("click-subtitle", event)
      }, pick(slots, ["title", "subtitle"])), vue.createVNode("div", {
        "ref": bodyRef,
        "class": bem$10("body"),
        "onScroll": onScroll
      }, [months.value.map(renderMonth)]), renderFooter()]);
      vue.watch(() => props.show, init);
      vue.watch(() => [props.type, props.minDate, props.maxDate], () => reset(getInitialDate(currentDate.value)));
      vue.watch(() => props.defaultDate, function(value) {
        if (value === void 0) {
          value = null;
        }
        currentDate.value = value;
        scrollToCurrentDate();
      });
      useExpose({
        reset,
        scrollToDate
      });
      onMountedOrActivated(init);
      return () => {
        if (props.poppable) {
          return vue.createVNode(Popup, {
            "show": props.show,
            "class": bem$10("popup"),
            "round": props.round,
            "position": props.position,
            "closeable": props.showTitle || props.showSubtitle,
            "teleport": props.teleport,
            "closeOnPopstate": props.closeOnPopstate,
            "closeOnClickOverlay": props.closeOnClickOverlay,
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
  var [name$10, bem$$] = createNamespace("image");
  var imageProps = {
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
  };
  var _Image = vue.defineComponent({
    name: name$10,
    props: imageProps,
    emits: ["load", "error"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var error = vue.ref(false);
      var loading = vue.ref(true);
      var imageRef = vue.ref();
      var {
        $Lazyload
      } = vue.getCurrentInstance().proxy;
      var style = vue.computed(() => {
        var style2 = {
          width: addUnit(props.width),
          height: addUnit(props.height)
        };
        if (isDef(props.radius)) {
          style2.overflow = "hidden";
          style2.borderRadius = addUnit(props.radius);
        }
        return style2;
      });
      vue.watch(() => props.src, () => {
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
          "size": props.iconSize,
          "class": className,
          "classPrefix": props.iconPrefix
        }, null);
      };
      var renderPlaceholder = () => {
        if (loading.value && props.showLoading) {
          return vue.createVNode("div", {
            "class": bem$$("loading")
          }, [renderIcon(props.loadingIcon, bem$$("loading-icon"), slots.loading)]);
        }
        if (error.value && props.showError) {
          return vue.createVNode("div", {
            "class": bem$$("error")
          }, [renderIcon(props.errorIcon, bem$$("error-icon"), slots.error)]);
        }
      };
      var renderImage = () => {
        if (error.value || !props.src) {
          return;
        }
        var attrs = {
          alt: props.alt,
          class: bem$$("img"),
          style: {
            objectFit: props.fit
          }
        };
        if (props.lazyLoad) {
          return vue.withDirectives(vue.createVNode("img", vue.mergeProps({
            "ref": imageRef
          }, attrs), null), [[vue.resolveDirective("lazy"), props.src]]);
        }
        return vue.createVNode("img", vue.mergeProps({
          "src": props.src,
          "onLoad": onLoad,
          "onError": onError
        }, attrs), null);
      };
      var onLazyLoaded = (_ref2) => {
        var {
          el
        } = _ref2;
        if (el === imageRef.value && loading.value) {
          onLoad();
        }
      };
      var onLazyLoadError = (_ref3) => {
        var {
          el
        } = _ref3;
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
        "class": bem$$({
          round: props.round
        }),
        "style": style.value
      }, [renderImage(), renderPlaceholder(), slots.default == null ? void 0 : slots.default()]);
    }
  });
  var Image$1 = withInstall(_Image);
  var [name$$, bem$_] = createNamespace("card");
  var cardProps = {
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
  };
  var _Card = vue.defineComponent({
    name: name$$,
    props: cardProps,
    emits: ["click-thumb"],
    setup(props, _ref) {
      var {
        slots,
        emit
      } = _ref;
      var renderTitle = () => {
        if (slots.title) {
          return slots.title();
        }
        if (props.title) {
          return vue.createVNode("div", {
            "class": [bem$_("title"), "van-multi-ellipsis--l2"]
          }, [props.title]);
        }
      };
      var renderThumbTag = () => {
        if (slots.tag || props.tag) {
          return vue.createVNode("div", {
            "class": bem$_("tag")
          }, [slots.tag ? slots.tag() : vue.createVNode(Tag, {
            "mark": true,
            "type": "danger"
          }, {
            default: () => [props.tag]
          })]);
        }
      };
      var renderThumbImage = () => {
        if (slots.thumb) {
          return slots.thumb();
        }
        return vue.createVNode(Image$1, {
          "src": props.thumb,
          "fit": "cover",
          "width": "100%",
          "height": "100%",
          "lazyLoad": props.lazyLoad
        }, null);
      };
      var renderThumb = () => {
        if (slots.thumb || props.thumb) {
          return vue.createVNode("a", {
            "href": props.thumbLink,
            "class": bem$_("thumb"),
            "onClick": (event) => emit("click-thumb", event)
          }, [renderThumbImage(), renderThumbTag()]);
        }
      };
      var renderDesc = () => {
        if (slots.desc) {
          return slots.desc();
        }
        if (props.desc) {
          return vue.createVNode("div", {
            "class": [bem$_("desc"), "van-ellipsis"]
          }, [props.desc]);
        }
      };
      var renderPriceText = () => {
        var priceArr = props.price.toString().split(".");
        return vue.createVNode("div", null, [vue.createVNode("span", {
          "class": bem$_("price-currency")
        }, [props.currency]), vue.createVNode("span", {
          "class": bem$_("price-integer")
        }, [priceArr[0]]), vue.createTextVNode("."), vue.createVNode("span", {
          "class": bem$_("price-decimal")
        }, [priceArr[1]])]);
      };
      return () => {
        var _slots$priceTop;
        var showNum = slots.num || isDef(props.num);
        var showPrice = slots.price || isDef(props.price);
        var showOriginPrice = slots["origin-price"] || isDef(props.originPrice);
        var showBottom = showNum || showPrice || showOriginPrice || slots.bottom;
        var Price = showPrice && vue.createVNode("div", {
          "class": bem$_("price")
        }, [slots.price ? slots.price() : renderPriceText()]);
        var OriginPrice = showOriginPrice && vue.createVNode("div", {
          "class": bem$_("origin-price")
        }, [slots["origin-price"] ? slots["origin-price"]() : props.currency + " " + props.originPrice]);
        var Num = showNum && vue.createVNode("div", {
          "class": bem$_("num")
        }, [slots.num ? slots.num() : "x" + props.num]);
        var Footer = slots.footer && vue.createVNode("div", {
          "class": bem$_("footer")
        }, [slots.footer()]);
        var Bottom = showBottom && vue.createVNode("div", {
          "class": bem$_("bottom")
        }, [(_slots$priceTop = slots["price-top"]) == null ? void 0 : _slots$priceTop.call(slots), Price, OriginPrice, Num, slots.bottom == null ? void 0 : slots.bottom()]);
        return vue.createVNode("div", {
          "class": bem$_()
        }, [vue.createVNode("div", {
          "class": bem$_("header")
        }, [renderThumb(), vue.createVNode("div", {
          "class": bem$_("content", {
            centered: props.centered
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
    var current2 = getScrollTop(scroller);
    var isDown = current2 < to;
    var frames = duration === 0 ? 1 : Math.round(duration * 1e3 / 16);
    var step = (to - current2) / frames;
    function animate() {
      current2 += step;
      if (isDown && current2 > to || !isDown && current2 < to) {
        current2 = to;
      }
      setScrollTop(scroller, current2);
      if (isDown && current2 < to || !isDown && current2 > to) {
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
  var [name$_, bem$Z] = createNamespace("sticky");
  var stickyProps = {
    zIndex: numericProp,
    position: makeStringProp("top"),
    container: Object,
    offsetTop: makeNumericProp(0),
    offsetBottom: makeNumericProp(0)
  };
  var _Sticky = vue.defineComponent({
    name: name$_,
    props: stickyProps,
    emits: ["scroll", "change"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var root = vue.ref();
      var scrollParent = useScrollParent(root);
      var state = vue.reactive({
        fixed: false,
        width: 0,
        height: 0,
        transform: 0
      });
      var offset2 = vue.computed(() => unitToPx(props.position === "top" ? props.offsetTop : props.offsetBottom));
      var rootStyle = vue.computed(() => {
        var {
          fixed,
          height: height2,
          width: width2
        } = state;
        if (fixed) {
          return {
            width: width2 + "px",
            height: height2 + "px"
          };
        }
      });
      var stickyStyle = vue.computed(() => {
        if (!state.fixed) {
          return;
        }
        var style = extend(getZIndexStyle(props.zIndex), {
          width: state.width + "px",
          height: state.height + "px",
          [props.position]: offset2.value + "px"
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
        } = props;
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
        "class": bem$Z({
          fixed: state.fixed
        }),
        "style": stickyStyle.value
      }, [slots.default == null ? void 0 : slots.default()])]);
    }
  });
  var Sticky = withInstall(_Sticky);
  var [name$Z, bem$Y] = createNamespace("tab");
  var TabsTitle = vue.defineComponent({
    name: name$Z,
    props: {
      id: String,
      dot: Boolean,
      type: String,
      color: String,
      title: String,
      badge: numericProp,
      isActive: Boolean,
      disabled: Boolean,
      controls: String,
      scrollable: Boolean,
      activeColor: String,
      renderTitle: Function,
      inactiveColor: String,
      showZeroBadge: truthProp
    },
    setup(props) {
      var style = vue.computed(() => {
        var style2 = {};
        var {
          type,
          color,
          disabled,
          isActive,
          activeColor,
          inactiveColor
        } = props;
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
          "class": bem$Y("text", {
            ellipsis: !props.scrollable
          })
        }, [props.renderTitle ? props.renderTitle() : props.title]);
        if (props.dot || isDef(props.badge) && props.badge !== "") {
          return vue.createVNode(Badge, {
            "dot": props.dot,
            "content": props.badge,
            "showZero": props.showZeroBadge
          }, {
            default: () => [Text]
          });
        }
        return Text;
      };
      return () => vue.createVNode("div", {
        "id": props.id,
        "role": "tab",
        "class": [bem$Y({
          active: props.isActive,
          disabled: props.disabled
        })],
        "style": style.value,
        "tabindex": props.disabled ? void 0 : props.isActive ? 0 : -1,
        "aria-selected": props.isActive,
        "aria-disabled": props.disabled || void 0,
        "aria-controls": props.controls
      }, [renderText()]);
    }
  });
  var [name$Y, bem$X] = createNamespace("swipe");
  var swipeProps = {
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
  var SWIPE_KEY = Symbol(name$Y);
  var _Swipe = vue.defineComponent({
    name: name$Y,
    props: swipeProps,
    emits: ["change"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
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
      var {
        children,
        linkChildren
      } = useChildren(SWIPE_KEY);
      var count = vue.computed(() => children.length);
      var size = vue.computed(() => state[props.vertical ? "height" : "width"]);
      var delta = vue.computed(() => props.vertical ? touch.deltaY.value : touch.deltaX.value);
      var minOffset = vue.computed(() => {
        if (state.rect) {
          var base = props.vertical ? state.rect.height : state.rect.width;
          return base - size.value * count.value;
        }
        return 0;
      });
      var maxCount = vue.computed(() => Math.ceil(Math.abs(minOffset.value) / size.value));
      var trackSize = vue.computed(() => count.value * size.value);
      var activeIndicator = vue.computed(() => (state.active + count.value) % count.value);
      var isCorrectDirection = vue.computed(() => {
        var expect = props.vertical ? "vertical" : "horizontal";
        return touch.direction.value === expect;
      });
      var trackStyle = vue.computed(() => {
        var style = {
          transitionDuration: (state.swiping ? 0 : props.duration) + "ms",
          transform: "translate" + (props.vertical ? "Y" : "X") + "(" + state.offset + "px)"
        };
        if (size.value) {
          var mainAxis = props.vertical ? "height" : "width";
          var crossAxis = props.vertical ? "width" : "height";
          style[mainAxis] = trackSize.value + "px";
          style[crossAxis] = props[crossAxis] ? props[crossAxis] + "px" : "";
        }
        return style;
      });
      var getTargetActive = (pace) => {
        var {
          active
        } = state;
        if (pace) {
          if (props.loop) {
            return clamp(active + pace, -1, count.value);
          }
          return clamp(active + pace, 0, maxCount.value);
        }
        return active;
      };
      var getTargetOffset = function(targetActive, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var currentPosition = targetActive * size.value;
        if (!props.loop) {
          currentPosition = Math.min(currentPosition, -minOffset.value);
        }
        var targetOffset = offset2 - currentPosition;
        if (!props.loop) {
          targetOffset = clamp(targetOffset, minOffset.value, 0);
        }
        return targetOffset;
      };
      var move = (_ref2) => {
        var {
          pace = 0,
          offset: offset2 = 0,
          emitChange
        } = _ref2;
        if (count.value <= 1) {
          return;
        }
        var {
          active
        } = state;
        var targetActive = getTargetActive(pace);
        var targetOffset = getTargetOffset(targetActive, offset2);
        if (props.loop) {
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
        if (props.autoplay > 0 && count.value > 1) {
          autoplayTimer = setTimeout(() => {
            next();
            autoplay();
          }, +props.autoplay);
        }
      };
      var initialize = function(active) {
        if (active === void 0) {
          active = +props.initialSwipe;
        }
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
          state.width = +((_props$width = props.width) != null ? _props$width : rect.width);
          state.height = +((_props$height = props.height) != null ? _props$height : rect.height);
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
        if (!props.touchable)
          return;
        touch.start(event);
        touchStartTime = Date.now();
        stopAutoplay();
        correctPosition();
      };
      var onTouchMove = (event) => {
        if (props.touchable && state.swiping) {
          touch.move(event);
          var shouldPrevent = isCorrectDirection.value || touch.offsetY.value > touch.offsetX.value === props.vertical;
          if (shouldPrevent) {
            preventDefault(event, props.stopPropagation);
          }
          if (isCorrectDirection.value) {
            move({
              offset: delta.value
            });
          }
        }
      };
      var onTouchEnd = () => {
        if (!props.touchable || !state.swiping) {
          return;
        }
        var duration = Date.now() - touchStartTime;
        var speed = delta.value / duration;
        var shouldSwipe = Math.abs(speed) > 0.25 || Math.abs(delta.value) > size.value / 2;
        if (shouldSwipe && isCorrectDirection.value) {
          var offset2 = props.vertical ? touch.offsetY.value : touch.offsetX.value;
          var pace = 0;
          if (props.loop) {
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
      var swipeTo = function(index2, options) {
        if (options === void 0) {
          options = {};
        }
        correctPosition();
        touch.reset();
        doubleRaf(() => {
          var targetIndex;
          if (props.loop && index2 === count.value) {
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
          backgroundColor: props.indicatorColor
        } : void 0;
        return vue.createVNode("i", {
          "style": style,
          "class": bem$X("indicator", {
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
        if (props.showIndicators && count.value > 1) {
          return vue.createVNode("div", {
            "class": bem$X("indicators", {
              vertical: props.vertical
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
        props,
        count,
        activeIndicator
      });
      vue.watch(() => props.initialSwipe, (value) => initialize(+value));
      vue.watch(count, () => initialize(state.active));
      vue.watch(() => props.autoplay, autoplay);
      vue.watch([windowWidth, windowHeight], resize);
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
        "class": bem$X()
      }, [vue.createVNode("div", {
        "style": trackStyle.value,
        "class": bem$X("track", {
          vertical: props.vertical
        }),
        "onTouchstart": onTouchStart,
        "onTouchmove": onTouchMove,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, [slots.default == null ? void 0 : slots.default()]), renderIndicator()]);
    }
  });
  var Swipe = withInstall(_Swipe);
  var [name$X, bem$W] = createNamespace("tabs");
  var TabsContent = vue.defineComponent({
    name: name$X,
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
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var swipeRef = vue.ref();
      var onChange = (index2) => emit("change", index2);
      var renderChildren = () => {
        var Content = slots.default == null ? void 0 : slots.default();
        if (props.animated || props.swipeable) {
          return vue.createVNode(Swipe, {
            "ref": swipeRef,
            "loop": false,
            "class": bem$W("track"),
            "duration": +props.duration * 1e3,
            "touchable": props.swipeable,
            "lazyRender": props.lazyRender,
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
            immediate: !props.inited
          });
        }
      };
      vue.watch(() => props.currentIndex, swipeToCurrentTab);
      vue.onMounted(() => {
        swipeToCurrentTab(props.currentIndex);
      });
      return () => vue.createVNode("div", {
        "class": bem$W("content", {
          animated: props.animated || props.swipeable
        })
      }, [renderChildren()]);
    }
  });
  var [name$W, bem$V] = createNamespace("tabs");
  var tabsProps = {
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
  var TABS_KEY = Symbol(name$W);
  var _Tabs = vue.defineComponent({
    name: name$W,
    props: tabsProps,
    emits: ["click", "change", "scroll", "disabled", "rendered", "click-tab", "update:active"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var tabHeight;
      var lockScroll;
      var stickyFixed;
      var root = vue.ref();
      var navRef = vue.ref();
      var wrapRef = vue.ref();
      var id = useId();
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
      var scrollable = vue.computed(() => children.length > props.swipeThreshold || !props.ellipsis);
      var navStyle = vue.computed(() => ({
        borderColor: props.color,
        background: props.background
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
      var offsetTopPx = vue.computed(() => unitToPx(props.offsetTop));
      var scrollOffset = vue.computed(() => {
        if (props.sticky) {
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
        scrollLeftTo(nav, to, immediate ? 0 : +props.duration);
      };
      var setLine = () => {
        var shouldAnimate = state.inited;
        vue.nextTick(() => {
          var titles = titleRefs.value;
          if (!titles || !titles[state.currentIndex] || props.type !== "line" || isHidden(root.value)) {
            return;
          }
          var title = titles[state.currentIndex].$el;
          var {
            lineWidth,
            lineHeight
          } = props;
          var left2 = title.offsetLeft + title.offsetWidth / 2;
          var lineStyle = {
            width: addUnit(lineWidth),
            backgroundColor: props.color,
            transform: "translateX(" + left2 + "px) translateX(-50%)"
          };
          if (shouldAnimate) {
            lineStyle.transitionDuration = props.duration + "s";
          }
          if (isDef(lineHeight)) {
            var height2 = addUnit(lineHeight);
            lineStyle.height = height2;
            lineStyle.borderRadius = height2;
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
        if (newName !== props.active) {
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
      var scrollToCurrentContent = function(immediate) {
        if (immediate === void 0) {
          immediate = false;
        }
        if (props.scrollspy) {
          var target = children[state.currentIndex].$el;
          if (target && scroller.value) {
            var to = getElementTop(target, scroller.value) - scrollOffset.value;
            lockScroll = true;
            scrollTopTo(scroller.value, to, immediate ? 0 : +props.duration, () => {
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
        if (disabled) {
          emit("disabled", name2, title);
        } else {
          callInterceptor(props.beforeChange, {
            args: [name2],
            done: () => {
              setCurrentIndex(index2);
              scrollToCurrentContent();
            }
          });
          emit("click", name2, title);
          route(item);
        }
        emit("click-tab", {
          name: name2,
          title,
          event,
          disabled
        });
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
        if (props.scrollspy && !lockScroll) {
          var index2 = getCurrentIndexOnScroll();
          setCurrentIndex(index2);
        }
      };
      var renderNav = () => children.map((item, index2) => vue.createVNode(TabsTitle, vue.mergeProps({
        "id": id + "-" + index2,
        "ref": setTitleRefs(index2),
        "type": props.type,
        "color": props.color,
        "style": item.titleStyle,
        "class": item.titleClass,
        "isActive": index2 === state.currentIndex,
        "controls": item.id,
        "scrollable": scrollable.value,
        "renderTitle": item.$slots.title,
        "activeColor": props.titleActiveColor,
        "inactiveColor": props.titleInactiveColor,
        "onClick": (event) => onClickTab(item, index2, event)
      }, pick(item, ["dot", "badge", "title", "disabled", "showZeroBadge"])), null));
      var renderHeader = () => {
        var _slots$navLeft, _slots$navRight;
        var {
          type,
          border
        } = props;
        return vue.createVNode("div", {
          "ref": wrapRef,
          "class": [bem$V("wrap", {
            scrollable: scrollable.value
          }), {
            [BORDER_TOP_BOTTOM]: type === "line" && border
          }]
        }, [vue.createVNode("div", {
          "ref": navRef,
          "role": "tablist",
          "class": bem$V("nav", [type, {
            complete: scrollable.value
          }]),
          "style": navStyle.value,
          "aria-orientation": "horizontal"
        }, [(_slots$navLeft = slots["nav-left"]) == null ? void 0 : _slots$navLeft.call(slots), renderNav(), type === "line" && vue.createVNode("div", {
          "class": bem$V("line"),
          "style": state.lineStyle
        }, null), (_slots$navRight = slots["nav-right"]) == null ? void 0 : _slots$navRight.call(slots)])]);
      };
      vue.watch([() => props.color, windowWidth], setLine);
      vue.watch(() => props.active, (value) => {
        if (value !== currentName.value) {
          setCurrentIndexByName(value);
        }
      });
      vue.watch(() => children.length, () => {
        if (state.inited) {
          setCurrentIndexByName(props.active);
          setLine();
          vue.nextTick(() => {
            scrollIntoView(true);
          });
        }
      });
      vue.watch(() => state.currentIndex, () => {
        scrollIntoView();
        setLine();
        if (stickyFixed && !props.scrollspy) {
          setRootScrollTop(Math.ceil(getElementTop(root.value) - offsetTopPx.value));
        }
      });
      var init = () => {
        setCurrentIndexByName(props.active);
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
        id,
        props,
        setLine,
        onRendered,
        currentName,
        scrollIntoView
      });
      return () => {
        var _slots$navBottom, _slots$navBottom2;
        return vue.createVNode("div", {
          "ref": root,
          "class": bem$V([props.type])
        }, [props.sticky ? vue.createVNode(Sticky, {
          "container": root.value,
          "offsetTop": offsetTopPx.value,
          "onScroll": onStickyScroll
        }, {
          default: () => [renderHeader(), (_slots$navBottom = slots["nav-bottom"]) == null ? void 0 : _slots$navBottom.call(slots)]
        }) : [renderHeader(), (_slots$navBottom2 = slots["nav-bottom"]) == null ? void 0 : _slots$navBottom2.call(slots)], vue.createVNode(TabsContent, {
          "count": children.length,
          "inited": state.inited,
          "animated": props.animated,
          "duration": props.duration,
          "swipeable": props.swipeable,
          "lazyRender": props.lazyRender,
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
  var [name$V, bem$U] = createNamespace("swipe-item");
  var _SwipeItem = vue.defineComponent({
    name: name$V,
    setup(props, _ref) {
      var {
        slots
      } = _ref;
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
        "class": bem$U(),
        "style": style.value
      }, [shouldRender.value ? slots.default == null ? void 0 : slots.default() : null]);
    }
  });
  var SwipeItem = withInstall(_SwipeItem);
  var [name$U, bem$T] = createNamespace("tab");
  var tabProps = extend({}, routeProps, {
    dot: Boolean,
    name: numericProp,
    badge: numericProp,
    title: String,
    disabled: Boolean,
    titleClass: unknownProp,
    titleStyle: [String, Object],
    showZeroBadge: truthProp
  });
  var _Tab = vue.defineComponent({
    name: name$U,
    props: tabProps,
    setup(props, _ref) {
      var {
        slots
      } = _ref;
      var id = useId();
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
        return (_props$name = props.name) != null ? _props$name : index2.value;
      };
      var init = () => {
        inited.value = true;
        if (parent.props.lazyRender) {
          vue.nextTick(() => {
            parent.onRendered(getName(), props.title);
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
      vue.watch(() => props.title, () => {
        parent.setLine();
        parent.scrollIntoView();
      });
      vue.provide(TAB_STATUS_KEY, active);
      return () => {
        var label = parent.id + "-" + index2.value;
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
            "id": id,
            "role": "tabpanel",
            "class": bem$T("panel-wrapper", {
              inactive: !active.value
            }),
            "tabindex": active.value ? 0 : -1,
            "aria-hidden": !active.value,
            "aria-labelledby": label
          }, {
            default: () => [vue.createVNode("div", {
              "class": bem$T("panel")
            }, [slots.default == null ? void 0 : slots.default()])]
          });
        }
        var shouldRender = inited.value || scrollspy || !lazyRender;
        var Content = shouldRender ? slots.default == null ? void 0 : slots.default() : null;
        useExpose({
          id
        });
        return vue.withDirectives(vue.createVNode("div", {
          "id": id,
          "role": "tabpanel",
          "class": bem$T("panel"),
          "tabindex": show ? 0 : -1,
          "aria-labelledby": label
        }, [Content]), [[vue.vShow, show]]);
      };
    }
  });
  var Tab = withInstall(_Tab);
  var Tabs = withInstall(_Tabs);
  var [name$T, bem$S, t$e] = createNamespace("cascader");
  var cascaderProps = {
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
    name: name$T,
    props: cascaderProps,
    emits: ["close", "change", "finish", "click-tab", "update:modelValue"],
    setup(props, _ref) {
      var {
        slots,
        emit
      } = _ref;
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
      }, props.fieldNames);
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
        } = props;
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
      var onClickTab = (_ref2) => {
        var {
          name: name2,
          title
        } = _ref2;
        return emit("click-tab", name2, title);
      };
      var renderHeader = () => vue.createVNode("div", {
        "class": bem$S("header")
      }, [vue.createVNode("h2", {
        "class": bem$S("title")
      }, [slots.title ? slots.title() : props.title]), props.closeable ? vue.createVNode(Icon, {
        "name": props.closeIcon,
        "class": [bem$S("close-icon"), HAPTICS_FEEDBACK],
        "onClick": onClose
      }, null) : null]);
      var renderOption = (option, selectedOption, tabIndex) => {
        var {
          disabled
        } = option;
        var selected = !!(selectedOption && option[valueKey] === selectedOption[valueKey]);
        var color = option.color || (selected ? props.activeColor : void 0);
        var Text = slots.option ? slots.option({
          option,
          selected
        }) : vue.createVNode("span", null, [option[textKey]]);
        return vue.createVNode("li", {
          "role": "menuitemradio",
          "class": [bem$S("option", {
            selected,
            disabled
          }), option.className],
          "style": {
            color
          },
          "tabindex": disabled ? void 0 : selected ? 0 : -1,
          "aria-checked": selected,
          "aria-disabled": disabled || void 0,
          "onClick": () => onSelect(option, tabIndex)
        }, [Text, selected ? vue.createVNode(Icon, {
          "name": "success",
          "class": bem$S("selected-icon")
        }, null) : null]);
      };
      var renderOptions = (options, selectedOption, tabIndex) => vue.createVNode("ul", {
        "role": "menu",
        "class": bem$S("options")
      }, [options.map((option) => renderOption(option, selectedOption, tabIndex))]);
      var renderTab = (tab, tabIndex) => {
        var _slots$optionsTop, _slots$optionsBottom;
        var {
          options,
          selected
        } = tab;
        var placeholder = props.placeholder || t$e("select");
        var title = selected ? selected[textKey] : placeholder;
        return vue.createVNode(Tab, {
          "title": title,
          "titleClass": bem$S("tab", {
            unselected: !selected
          })
        }, {
          default: () => [(_slots$optionsTop = slots["options-top"]) == null ? void 0 : _slots$optionsTop.call(slots, {
            tabIndex
          }), renderOptions(options, selected, tabIndex), (_slots$optionsBottom = slots["options-bottom"]) == null ? void 0 : _slots$optionsBottom.call(slots, {
            tabIndex
          })]
        });
      };
      var renderTabs = () => vue.createVNode(Tabs, {
        "active": activeTab.value,
        "onUpdate:active": ($event) => activeTab.value = $event,
        "animated": true,
        "class": bem$S("tabs"),
        "color": props.activeColor,
        "swipeThreshold": 0,
        "swipeable": props.swipeable,
        "onClick-tab": onClickTab
      }, {
        default: () => [tabs.value.map(renderTab)]
      });
      updateTabs();
      vue.watch(() => props.options, updateTabs, {
        deep: true
      });
      vue.watch(() => props.modelValue, (value) => {
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
        "class": bem$S()
      }, [renderHeader(), renderTabs()]);
    }
  });
  var Cascader = withInstall(_Cascader);
  var [name$S, bem$R] = createNamespace("cell-group");
  var cellGroupProps = {
    title: String,
    inset: Boolean,
    border: truthProp
  };
  var _CellGroup = vue.defineComponent({
    name: name$S,
    inheritAttrs: false,
    props: cellGroupProps,
    setup(props, _ref) {
      var {
        slots,
        attrs
      } = _ref;
      var renderGroup = () => vue.createVNode("div", vue.mergeProps({
        "class": [bem$R({
          inset: props.inset
        }), {
          [BORDER_TOP_BOTTOM]: props.border && !props.inset
        }]
      }, attrs), [slots.default == null ? void 0 : slots.default()]);
      var renderTitle = () => vue.createVNode("div", {
        "class": bem$R("title", {
          inset: props.inset
        })
      }, [slots.title ? slots.title() : props.title]);
      return () => {
        if (props.title || slots.title) {
          return vue.createVNode(vue.Fragment, null, [renderTitle(), renderGroup()]);
        }
        return renderGroup();
      };
    }
  });
  var CellGroup = withInstall(_CellGroup);
  var [name$R, bem$Q] = createNamespace("checkbox-group");
  var checkboxGroupProps = {
    max: numericProp,
    disabled: Boolean,
    iconSize: numericProp,
    direction: String,
    modelValue: makeArrayProp(),
    checkedColor: String
  };
  var CHECKBOX_GROUP_KEY = Symbol(name$R);
  var _CheckboxGroup = vue.defineComponent({
    name: name$R,
    props: checkboxGroupProps,
    emits: ["change", "update:modelValue"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var {
        children,
        linkChildren
      } = useChildren(CHECKBOX_GROUP_KEY);
      var updateValue = (value) => emit("update:modelValue", value);
      var toggleAll = function(options) {
        if (options === void 0) {
          options = {};
        }
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
      vue.watch(() => props.modelValue, (value) => emit("change", value));
      useExpose({
        toggleAll
      });
      useCustomFieldValue(() => props.modelValue);
      linkChildren({
        props,
        updateValue
      });
      return () => vue.createVNode("div", {
        "class": bem$Q([props.direction])
      }, [slots.default == null ? void 0 : slots.default()]);
    }
  });
  var [name$Q, bem$P] = createNamespace("checkbox");
  var checkboxProps = extend({}, checkerProps, {
    bindGroup: truthProp
  });
  var _Checkbox = vue.defineComponent({
    name: name$Q,
    props: checkboxProps,
    emits: ["change", "update:modelValue"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var {
        parent
      } = useParent(CHECKBOX_GROUP_KEY);
      var setParentValue = (checked2) => {
        var {
          name: name2
        } = props;
        var {
          max,
          modelValue
        } = parent.props;
        var value = modelValue.slice();
        if (checked2) {
          var overlimit = max && value.length >= max;
          if (!overlimit && !value.includes(name2)) {
            value.push(name2);
            if (props.bindGroup) {
              parent.updateValue(value);
            }
          }
        } else {
          var index2 = value.indexOf(name2);
          if (index2 !== -1) {
            value.splice(index2, 1);
            if (props.bindGroup) {
              parent.updateValue(value);
            }
          }
        }
      };
      var checked = vue.computed(() => {
        if (parent && props.bindGroup) {
          return parent.props.modelValue.indexOf(props.name) !== -1;
        }
        return !!props.modelValue;
      });
      var toggle = function(newValue) {
        if (newValue === void 0) {
          newValue = !checked.value;
        }
        if (parent && props.bindGroup) {
          setParentValue(newValue);
        } else {
          emit("update:modelValue", newValue);
        }
      };
      vue.watch(() => props.modelValue, (value) => emit("change", value));
      useExpose({
        toggle,
        props,
        checked
      });
      useCustomFieldValue(() => props.modelValue);
      return () => vue.createVNode(Checker, vue.mergeProps({
        "bem": bem$P,
        "role": "checkbox",
        "parent": parent,
        "checked": checked.value,
        "onToggle": toggle
      }, props), pick(slots, ["default", "icon"]));
    }
  });
  var Checkbox = withInstall(_Checkbox);
  var CheckboxGroup = withInstall(_CheckboxGroup);
  var [name$P, bem$O] = createNamespace("circle");
  var uid = 0;
  var format = (rate) => Math.min(Math.max(+rate, 0), 100);
  function getPath(clockwise, viewBoxSize) {
    var sweepFlag = clockwise ? 1 : 0;
    return "M " + viewBoxSize / 2 + " " + viewBoxSize / 2 + " m 0, -500 a 500, 500 0 1, " + sweepFlag + " 0, 1000 a 500, 500 0 1, " + sweepFlag + " 0, -1000";
  }
  var circleProps = {
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
  };
  var _Circle = vue.defineComponent({
    name: name$P,
    props: circleProps,
    emits: ["update:currentRate"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var id = "van-circle-" + uid++;
      var viewBoxSize = vue.computed(() => +props.strokeWidth + 1e3);
      var path = vue.computed(() => getPath(props.clockwise, viewBoxSize.value));
      var svgStyle = vue.computed(() => {
        var ROTATE_ANGLE_MAP = {
          top: 0,
          right: 90,
          bottom: 180,
          left: 270
        };
        var angleValue = ROTATE_ANGLE_MAP[props.startPosition];
        if (angleValue) {
          return {
            transform: "rotate(" + angleValue + "deg)"
          };
        }
      });
      vue.watch(() => props.rate, (rate) => {
        var rafId;
        var startTime = Date.now();
        var startRate = props.currentRate;
        var endRate = format(rate);
        var duration = Math.abs((startRate - endRate) * 1e3 / +props.speed);
        var animate = () => {
          var now = Date.now();
          var progress = Math.min((now - startTime) / duration, 1);
          var rate2 = progress * (endRate - startRate) + startRate;
          emit("update:currentRate", format(parseFloat(rate2.toFixed(1))));
          if (endRate > startRate ? rate2 < endRate : rate2 > endRate) {
            rafId = raf(animate);
          }
        };
        if (props.speed) {
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
        } = props;
        var offset2 = PERIMETER * currentRate / 100;
        var color = isObject(props.color) ? "url(#" + id + ")" : props.color;
        var style = {
          stroke: color,
          strokeWidth: +strokeWidth + 1 + "px",
          strokeLinecap,
          strokeDasharray: offset2 + "px " + PERIMETER + "px"
        };
        return vue.createVNode("path", {
          "d": path.value,
          "style": style,
          "class": bem$O("hover"),
          "stroke": color
        }, null);
      };
      var renderLayer = () => {
        var style = {
          fill: props.fill,
          stroke: props.layerColor,
          strokeWidth: props.strokeWidth + "px"
        };
        return vue.createVNode("path", {
          "class": bem$O("layer"),
          "style": style,
          "d": path.value
        }, null);
      };
      var renderGradient = () => {
        var {
          color
        } = props;
        if (!isObject(color)) {
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
        if (props.text) {
          return vue.createVNode("div", {
            "class": bem$O("text")
          }, [props.text]);
        }
      };
      return () => vue.createVNode("div", {
        "class": bem$O(),
        "style": getSizeStyle(props.size)
      }, [vue.createVNode("svg", {
        "viewBox": "0 0 " + viewBoxSize.value + " " + viewBoxSize.value,
        "style": svgStyle.value
      }, [renderGradient(), renderLayer(), renderHover()]), renderText()]);
    }
  });
  var Circle = withInstall(_Circle);
  var [name$O, bem$N] = createNamespace("row");
  var ROW_KEY = Symbol(name$O);
  var rowProps = {
    tag: makeStringProp("div"),
    wrap: truthProp,
    align: String,
    gutter: makeNumericProp(0),
    justify: String
  };
  var _Row = vue.defineComponent({
    name: name$O,
    props: rowProps,
    setup(props, _ref) {
      var {
        slots
      } = _ref;
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
        var gutter = Number(props.gutter);
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
        } = props;
        return vue.createVNode(tag, {
          "class": bem$N({
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
  var [name$N, bem$M] = createNamespace("col");
  var colProps = {
    tag: makeStringProp("div"),
    span: makeNumericProp(0),
    offset: numericProp
  };
  var _Col = vue.defineComponent({
    name: name$N,
    props: colProps,
    setup(props, _ref) {
      var {
        slots
      } = _ref;
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
        } = props;
        return vue.createVNode(tag, {
          "style": style.value,
          "class": bem$M({
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
  var [name$M, bem$L] = createNamespace("collapse");
  var COLLAPSE_KEY = Symbol(name$M);
  var collapseProps = {
    border: truthProp,
    accordion: Boolean,
    modelValue: {
      type: [String, Number, Array],
      default: ""
    }
  };
  var _Collapse = vue.defineComponent({
    name: name$M,
    props: collapseProps,
    emits: ["change", "update:modelValue"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
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
        } = props;
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
        } = props;
        return accordion ? modelValue === name2 : modelValue.includes(name2);
      };
      linkChildren({
        toggle,
        isExpanded
      });
      return () => vue.createVNode("div", {
        "class": [bem$L(), {
          [BORDER_TOP_BOTTOM]: props.border
        }]
      }, [slots.default == null ? void 0 : slots.default()]);
    }
  });
  var Collapse = withInstall(_Collapse);
  var [name$L, bem$K] = createNamespace("collapse-item");
  var CELL_SLOTS = ["icon", "title", "value", "label", "right-icon"];
  var collapseItemProps = extend({}, cellSharedProps, {
    name: numericProp,
    isLink: truthProp,
    disabled: Boolean,
    readonly: Boolean
  });
  var _CollapseItem = vue.defineComponent({
    name: name$L,
    props: collapseItemProps,
    setup(props, _ref) {
      var {
        slots
      } = _ref;
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
        return (_props$name = props.name) != null ? _props$name : index2.value;
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
      var toggle = function(newValue) {
        if (newValue === void 0) {
          newValue = !expanded.value;
        }
        parent.toggle(name2.value, newValue);
      };
      var onClickTitle = () => {
        if (!props.disabled && !props.readonly) {
          toggle();
        }
      };
      var renderTitle = () => {
        var {
          border,
          disabled,
          readonly
        } = props;
        var attrs = pick(props, Object.keys(cellSharedProps));
        if (readonly) {
          attrs.isLink = false;
        }
        if (disabled || readonly) {
          attrs.clickable = false;
        }
        return vue.createVNode(Cell, vue.mergeProps({
          "role": "button",
          "class": bem$K("title", {
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
        "class": bem$K("wrapper"),
        "onTransitionend": onTransitionEnd
      }, [vue.createVNode("div", {
        "ref": contentRef,
        "class": bem$K("content")
      }, [slots.default == null ? void 0 : slots.default()])]), [[vue.vShow, show.value]]));
      useExpose({
        toggle
      });
      return () => vue.createVNode("div", {
        "class": [bem$K({
          border: index2.value && props.border
        })]
      }, [renderTitle(), renderContent()]);
    }
  });
  var CollapseItem = withInstall(_CollapseItem);
  var ConfigProvider = withInstall(_ConfigProvider);
  var [name$K, bem$J, t$d] = createNamespace("contact-card");
  var contactCardProps = {
    tel: String,
    name: String,
    type: makeStringProp("add"),
    addText: String,
    editable: truthProp
  };
  var _ContactCard = vue.defineComponent({
    name: name$K,
    props: contactCardProps,
    emits: ["click"],
    setup(props, _ref) {
      var {
        emit
      } = _ref;
      var onClick = (event) => {
        if (props.editable) {
          emit("click", event);
        }
      };
      var renderContent = () => {
        if (props.type === "add") {
          return props.addText || t$d("addText");
        }
        return [vue.createVNode("div", null, [t$d("name") + "\uFF1A" + props.name]), vue.createVNode("div", null, [t$d("tel") + "\uFF1A" + props.tel])];
      };
      return () => vue.createVNode(Cell, {
        "center": true,
        "icon": props.type === "edit" ? "contact" : "add-square",
        "class": bem$J([props.type]),
        "border": false,
        "isLink": props.editable,
        "valueClass": bem$J("value"),
        "onClick": onClick
      }, {
        value: renderContent
      });
    }
  });
  var ContactCard = withInstall(_ContactCard);
  var [name$J, bem$I, t$c] = createNamespace("contact-edit");
  var DEFAULT_CONTACT = {
    tel: "",
    name: ""
  };
  var contactEditProps = {
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
  };
  var _ContactEdit = vue.defineComponent({
    name: name$J,
    props: contactEditProps,
    emits: ["save", "delete", "change-default"],
    setup(props, _ref) {
      var {
        emit
      } = _ref;
      var contact = vue.reactive(extend({}, DEFAULT_CONTACT, props.contactInfo));
      var onSave = () => {
        if (!props.isSaving) {
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
        "text": t$c("save"),
        "class": bem$I("button"),
        "loading": props.isSaving,
        "nativeType": "submit"
      }, null), props.isEdit && vue.createVNode(Button, {
        "block": true,
        "round": true,
        "text": t$c("delete"),
        "class": bem$I("button"),
        "loading": props.isDeleting,
        "onClick": onDelete
      }, null)]);
      var renderSwitch = () => vue.createVNode(Switch, {
        "modelValue": contact.isDefault,
        "onUpdate:modelValue": ($event) => contact.isDefault = $event,
        "size": 24,
        "onChange": (checked) => emit("change-default", checked)
      }, null);
      var renderSetDefault = () => {
        if (props.showSetDefault) {
          return vue.createVNode(Cell, {
            "title": props.setDefaultLabel,
            "class": bem$I("switch-cell"),
            "border": false
          }, {
            "right-icon": renderSwitch
          });
        }
      };
      vue.watch(() => props.contactInfo, (value) => extend(contact, DEFAULT_CONTACT, value));
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
          "label": t$c("name"),
          "rules": [{
            required: true,
            message: t$c("nameEmpty")
          }],
          "maxlength": "30",
          "placeholder": t$c("name")
        }, null), vue.createVNode(Field, {
          "modelValue": contact.tel,
          "onUpdate:modelValue": ($event) => contact.tel = $event,
          "clearable": true,
          "type": "tel",
          "label": t$c("tel"),
          "rules": [{
            validator: props.telValidator,
            message: t$c("telInvalid")
          }],
          "placeholder": t$c("tel")
        }, null)]), renderSetDefault(), renderButtons()]
      });
    }
  });
  var ContactEdit = withInstall(_ContactEdit);
  var [name$I, bem$H, t$b] = createNamespace("contact-list");
  var contactListProps = {
    list: Array,
    addText: String,
    modelValue: unknownProp,
    defaultTagText: String
  };
  var _ContactList = vue.defineComponent({
    name: name$I,
    props: contactListProps,
    emits: ["add", "edit", "select", "update:modelValue"],
    setup(props, _ref) {
      var {
        emit
      } = _ref;
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
          if (item.isDefault && props.defaultTagText) {
            nodes.push(vue.createVNode(Tag, {
              "type": "danger",
              "round": true,
              "class": bem$H("item-tag")
            }, {
              default: () => [props.defaultTagText]
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
        "modelValue": props.modelValue,
        "class": bem$H("group")
      }, {
        default: () => [props.list && props.list.map(renderItem)]
      }), vue.createVNode("div", {
        "class": [bem$H("bottom"), "van-safe-area-bottom"]
      }, [vue.createVNode(Button, {
        "round": true,
        "block": true,
        "type": "danger",
        "class": bem$H("add"),
        "text": props.addText || t$b("addText"),
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
  var countDownProps = {
    time: makeNumericProp(0),
    format: makeStringProp("HH:mm:ss"),
    autoStart: truthProp,
    millisecond: Boolean
  };
  var _CountDown = vue.defineComponent({
    name: name$H,
    props: countDownProps,
    emits: ["change", "finish"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var {
        start: start2,
        pause,
        reset,
        current: current2
      } = useCountDown({
        time: +props.time,
        millisecond: props.millisecond,
        onChange: (current3) => emit("change", current3),
        onFinish: () => emit("finish")
      });
      var timeText = vue.computed(() => parseFormat(props.format, current2.value));
      var resetTime = () => {
        reset(+props.time);
        if (props.autoStart) {
          start2();
        }
      };
      vue.watch(() => props.time, resetTime, {
        immediate: true
      });
      useExpose({
        start: start2,
        pause,
        reset: resetTime
      });
      return () => vue.createVNode("div", {
        "role": "timer",
        "class": bem$G()
      }, [slots.default ? slots.default(current2.value) : timeText.value]);
    }
  });
  var CountDown = withInstall(_CountDown);
  function getDate(timeStamp) {
    var date = new Date(timeStamp * 1e3);
    return date.getFullYear() + "." + padZero(date.getMonth() + 1) + "." + padZero(date.getDate());
  }
  var formatDiscount = (discount) => (discount / 10).toFixed(discount % 10 === 0 ? 0 : 1);
  var formatAmount = (amount) => (amount / 100).toFixed(amount % 100 === 0 ? 0 : amount % 10 === 0 ? 1 : 2);
  var [name$G, bem$F, t$a] = createNamespace("coupon");
  var _Coupon = vue.defineComponent({
    name: name$G,
    props: {
      chosen: Boolean,
      coupon: makeRequiredProp(Object),
      disabled: Boolean,
      currency: makeStringProp("\xA5")
    },
    setup(props) {
      var validPeriod = vue.computed(() => {
        var {
          startAt,
          endAt
        } = props.coupon;
        return getDate(startAt) + " - " + getDate(endAt);
      });
      var faceAmount = vue.computed(() => {
        var {
          coupon,
          currency
        } = props;
        if (coupon.valueDesc) {
          return [coupon.valueDesc, vue.createVNode("span", null, [coupon.unitDesc || ""])];
        }
        if (coupon.denominations) {
          var denominations = formatAmount(coupon.denominations);
          return [vue.createVNode("span", null, [currency]), " " + denominations];
        }
        if (coupon.discount) {
          return t$a("discount", formatDiscount(coupon.discount));
        }
        return "";
      });
      var conditionMessage = vue.computed(() => {
        var condition = formatAmount(props.coupon.originCondition || 0);
        return condition === "0" ? t$a("unlimited") : t$a("condition", condition);
      });
      return () => {
        var {
          chosen,
          coupon,
          disabled
        } = props;
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
  var [name$F, bem$E, t$9] = createNamespace("coupon-cell");
  var couponCellProps = {
    title: String,
    border: truthProp,
    editable: truthProp,
    coupons: makeArrayProp(),
    currency: makeStringProp("\xA5"),
    chosenCoupon: makeNumericProp(-1)
  };
  function formatValue(_ref) {
    var {
      coupons,
      chosenCoupon,
      currency
    } = _ref;
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
    return coupons.length === 0 ? t$9("noCoupon") : t$9("count", coupons.length);
  }
  var _CouponCell = vue.defineComponent({
    name: name$F,
    props: couponCellProps,
    setup(props) {
      return () => {
        var selected = props.coupons[+props.chosenCoupon];
        return vue.createVNode(Cell, {
          "class": bem$E(),
          "value": formatValue(props),
          "title": props.title || t$9("title"),
          "border": props.border,
          "isLink": props.editable,
          "valueClass": bem$E("value", {
            selected
          })
        }, null);
      };
    }
  });
  var CouponCell = withInstall(_CouponCell);
  var [name$E, bem$D, t$8] = createNamespace("coupon-list");
  var EMPTY_IMAGE = "https://img.yzcdn.cn/vant/coupon-empty.png";
  var couponListProps = {
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
  };
  var _CouponList = vue.defineComponent({
    name: name$E,
    props: couponListProps,
    emits: ["change", "exchange", "update:code"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var [couponRefs, setCouponRefs] = useRefs();
      var root = vue.ref();
      var barRef = vue.ref();
      var activeTab = vue.ref(0);
      var listHeight = vue.ref(0);
      var currentCode = vue.ref(props.code);
      var buttonDisabled = vue.computed(() => !props.exchangeButtonLoading && (props.exchangeButtonDisabled || !currentCode.value || currentCode.value.length < props.exchangeMinLength));
      var updateListHeight = () => {
        var TABS_HEIGHT = 44;
        var rootHeight = useRect(root).height;
        var headerHeight = useRect(barRef).height + TABS_HEIGHT;
        listHeight.value = (rootHeight > headerHeight ? rootHeight : windowHeight.value) - headerHeight;
      };
      var onExchange = () => {
        emit("exchange", currentCode.value);
        if (!props.code) {
          currentCode.value = "";
        }
      };
      var scrollToCoupon = (index2) => {
        vue.nextTick(() => {
          var _couponRefs$value$ind;
          return (_couponRefs$value$ind = couponRefs.value[index2]) == null ? void 0 : _couponRefs$value$ind.scrollIntoView();
        });
      };
      var renderEmpty = () => vue.createVNode("div", {
        "class": bem$D("empty")
      }, [vue.createVNode("img", {
        "src": props.emptyImage
      }, null), vue.createVNode("p", null, [t$8("noCoupon")])]);
      var renderExchangeBar = () => {
        if (props.showExchangeBar) {
          return vue.createVNode("div", {
            "ref": barRef,
            "class": bem$D("exchange-bar")
          }, [vue.createVNode(Field, {
            "modelValue": currentCode.value,
            "onUpdate:modelValue": ($event) => currentCode.value = $event,
            "clearable": true,
            "border": false,
            "class": bem$D("field"),
            "placeholder": props.inputPlaceholder || t$8("placeholder"),
            "maxlength": "20"
          }, null), vue.createVNode(Button, {
            "plain": true,
            "type": "danger",
            "class": bem$D("exchange"),
            "text": props.exchangeButtonText || t$8("exchange"),
            "loading": props.exchangeButtonLoading,
            "disabled": buttonDisabled.value,
            "onClick": onExchange
          }, null)]);
        }
      };
      var renderCouponTab = () => {
        var _slots$listFooter;
        var {
          coupons
        } = props;
        var count = props.showCount ? " (" + coupons.length + ")" : "";
        var title = (props.enabledTitle || t$8("enable")) + count;
        return vue.createVNode(Tab, {
          "title": title
        }, {
          default: () => [vue.createVNode("div", {
            "class": bem$D("list", {
              "with-bottom": props.showCloseButton
            }),
            "style": {
              height: listHeight.value + "px"
            }
          }, [coupons.map((coupon, index2) => vue.createVNode(Coupon, {
            "key": coupon.id,
            "ref": setCouponRefs(index2),
            "coupon": coupon,
            "chosen": index2 === props.chosenCoupon,
            "currency": props.currency,
            "onClick": () => emit("change", index2)
          }, null)), !coupons.length && renderEmpty(), (_slots$listFooter = slots["list-footer"]) == null ? void 0 : _slots$listFooter.call(slots)])]
        });
      };
      var renderDisabledTab = () => {
        var _slots$disabledList;
        var {
          disabledCoupons
        } = props;
        var count = props.showCount ? " (" + disabledCoupons.length + ")" : "";
        var title = (props.disabledTitle || t$8("disabled")) + count;
        return vue.createVNode(Tab, {
          "title": title
        }, {
          default: () => [vue.createVNode("div", {
            "class": bem$D("list", {
              "with-bottom": props.showCloseButton
            }),
            "style": {
              height: listHeight.value + "px"
            }
          }, [disabledCoupons.map((coupon) => vue.createVNode(Coupon, {
            "disabled": true,
            "key": coupon.id,
            "coupon": coupon,
            "currency": props.currency
          }, null)), !disabledCoupons.length && renderEmpty(), (_slots$disabledList = slots["disabled-list-footer"]) == null ? void 0 : _slots$disabledList.call(slots)])]
        });
      };
      vue.watch(() => props.code, (value) => {
        currentCode.value = value;
      });
      vue.watch(windowHeight, updateListHeight);
      vue.watch(currentCode, (value) => emit("update:code", value));
      vue.watch(() => props.displayedCouponIndex, scrollToCoupon);
      vue.onMounted(() => {
        updateListHeight();
        scrollToCoupon(props.displayedCouponIndex);
      });
      return () => vue.createVNode("div", {
        "ref": root,
        "class": bem$D()
      }, [renderExchangeBar(), vue.createVNode(Tabs, {
        "active": activeTab.value,
        "onUpdate:active": ($event) => activeTab.value = $event,
        "class": bem$D("tab")
      }, {
        default: () => [renderCouponTab(), renderDisabledTab()]
      }), vue.createVNode("div", {
        "class": bem$D("bottom")
      }, [vue.withDirectives(vue.createVNode(Button, {
        "round": true,
        "block": true,
        "type": "danger",
        "class": bem$D("close"),
        "text": props.closeButtonText || t$8("close"),
        "onClick": () => emit("change", -1)
      }, null), [[vue.vShow, props.showCloseButton]])])]);
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
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var formatValue2 = (value) => {
        var {
          minHour,
          maxHour,
          maxMinute,
          minMinute
        } = props;
        if (!value) {
          value = padZero(minHour) + ":" + padZero(minMinute);
        }
        var [hour, minute] = value.split(":");
        hour = padZero(clamp(+hour, +minHour, +maxHour));
        minute = padZero(clamp(+minute, +minMinute, +maxMinute));
        return hour + ":" + minute;
      };
      var picker = vue.ref();
      var currentDate = vue.ref(formatValue2(props.modelValue));
      var ranges = vue.computed(() => [{
        type: "hour",
        range: [+props.minHour, +props.maxHour]
      }, {
        type: "minute",
        range: [+props.minMinute, +props.maxMinute]
      }]);
      var originColumns = vue.computed(() => ranges.value.map((_ref2) => {
        var {
          type,
          range: rangeArr
        } = _ref2;
        var values = times(rangeArr[1] - rangeArr[0] + 1, (index2) => padZero(rangeArr[0] + index2));
        if (props.filter) {
          values = props.filter(type, values);
        }
        return {
          type,
          values
        };
      }));
      var columns = vue.computed(() => originColumns.value.map((column) => ({
        values: column.values.map((value) => props.formatter(column.type, value))
      })));
      var updateColumnValue = () => {
        var pair = currentDate.value.split(":");
        var values = [props.formatter("hour", pair[0]), props.formatter("minute", pair[1])];
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
      vue.watch(() => [props.filter, props.maxHour, props.minMinute, props.maxMinute], updateInnerValue);
      vue.watch(() => props.minHour, () => {
        vue.nextTick(updateInnerValue);
      });
      vue.watch(currentDate, (value) => emit("update:modelValue", value));
      vue.watch(() => props.modelValue, (value) => {
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
      }, pick(props, pickerInheritKeys)), slots);
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
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var formatValue2 = (value) => {
        if (isDate(value)) {
          var timestamp = clamp(value.getTime(), props.minDate.getTime(), props.maxDate.getTime());
          return new Date(timestamp);
        }
        return void 0;
      };
      var picker = vue.ref();
      var currentDate = vue.ref(formatValue2(props.modelValue));
      var getBoundary = (type, value) => {
        var boundary = props[type + "Date"];
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
        } = getBoundary("max", currentDate.value || props.minDate);
        var {
          minYear,
          minDate,
          minMonth,
          minHour,
          minMinute
        } = getBoundary("min", currentDate.value || props.minDate);
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
        switch (props.type) {
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
        if (props.columnsOrder) {
          var columnsOrder = props.columnsOrder.concat(result.map((column) => column.type));
          result.sort((a, b) => columnsOrder.indexOf(a.type) - columnsOrder.indexOf(b.type));
        }
        return result;
      });
      var originColumns = vue.computed(() => ranges.value.map((_ref2) => {
        var {
          type,
          range: rangeArr
        } = _ref2;
        var values = times(rangeArr[1] - rangeArr[0] + 1, (index2) => padZero(rangeArr[0] + index2));
        if (props.filter) {
          values = props.filter(type, values);
        }
        return {
          type,
          values
        };
      }));
      var columns = vue.computed(() => originColumns.value.map((column) => ({
        values: column.values.map((value) => props.formatter(column.type, value))
      })));
      var updateColumnValue = () => {
        var value = currentDate.value || props.minDate;
        var {
          formatter
        } = props;
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
        } = props;
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
          year = (currentDate.value || props.minDate).getFullYear();
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
      vue.watch(() => [props.filter, props.maxDate], updateInnerValue);
      vue.watch(() => props.minDate, () => {
        vue.nextTick(updateInnerValue);
      });
      vue.watch(() => props.modelValue, (value) => {
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
      }, pick(props, pickerInheritKeys)), slots);
    }
  });
  var [name$B, bem$C] = createNamespace("datetime-picker");
  var timePickerPropKeys = Object.keys(TimePicker.props);
  var datePickerPropKeys = Object.keys(DatePicker.props);
  var datetimePickerProps = extend({}, TimePicker.props, DatePicker.props, {
    modelValue: [String, Date]
  });
  var _DatetimePicker = vue.defineComponent({
    name: name$B,
    props: datetimePickerProps,
    setup(props, _ref) {
      var {
        attrs,
        slots
      } = _ref;
      var root = vue.ref();
      useExpose({
        getPicker: () => {
          var _root$value;
          return (_root$value = root.value) == null ? void 0 : _root$value.getPicker();
        }
      });
      return () => {
        var isTimePicker = props.type === "time";
        var Component = isTimePicker ? TimePicker : DatePicker;
        var inheritProps = pick(props, isTimePicker ? timePickerPropKeys : datePickerPropKeys);
        return vue.createVNode(Component, vue.mergeProps({
          "ref": root,
          "class": bem$C()
        }, inheritProps, attrs), slots);
      };
    }
  });
  var DatetimePicker = withInstall(_DatetimePicker);
  var [name$A, bem$B, t$7] = createNamespace("dialog");
  var dialogProps = extend({}, popupSharedProps, {
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
  });
  var popupInheritKeys$1 = [...popupSharedPropKeys, "transition", "closeOnPopstate"];
  var VanDialog = vue.defineComponent({
    name: name$A,
    props: dialogProps,
    emits: ["confirm", "cancel", "update:show"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var loading = vue.reactive({
        confirm: false,
        cancel: false
      });
      var updateShow = (value) => emit("update:show", value);
      var close = (action) => {
        updateShow(false);
        props.callback == null ? void 0 : props.callback(action);
      };
      var getActionHandler = (action) => () => {
        if (!props.show) {
          return;
        }
        emit(action);
        if (props.beforeClose) {
          loading[action] = true;
          callInterceptor(props.beforeClose, {
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
        var title = slots.title ? slots.title() : props.title;
        if (title) {
          return vue.createVNode("div", {
            "class": bem$B("header", {
              isolated: !props.message && !slots.default
            })
          }, [title]);
        }
      };
      var renderMessage = (hasTitle) => {
        var {
          message,
          allowHtml,
          messageAlign
        } = props;
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
        } = props;
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
      }, [props.showCancelButton && vue.createVNode(Button, {
        "size": "large",
        "text": props.cancelButtonText || t$7("cancel"),
        "class": bem$B("cancel"),
        "style": {
          color: props.cancelButtonColor
        },
        "loading": loading.cancel,
        "onClick": onCancel
      }, null), props.showConfirmButton && vue.createVNode(Button, {
        "size": "large",
        "text": props.confirmButtonText || t$7("confirm"),
        "class": [bem$B("confirm"), {
          [BORDER_LEFT]: props.showCancelButton
        }],
        "style": {
          color: props.confirmButtonColor
        },
        "loading": loading.confirm,
        "onClick": onConfirm
      }, null)]);
      var renderRoundButtons = () => vue.createVNode(ActionBar, {
        "class": bem$B("footer")
      }, {
        default: () => [props.showCancelButton && vue.createVNode(ActionBarButton, {
          "type": "warning",
          "text": props.cancelButtonText || t$7("cancel"),
          "class": bem$B("cancel"),
          "color": props.cancelButtonColor,
          "loading": loading.cancel,
          "onClick": onCancel
        }, null), props.showConfirmButton && vue.createVNode(ActionBarButton, {
          "type": "danger",
          "text": props.confirmButtonText || t$7("confirm"),
          "class": bem$B("confirm"),
          "color": props.confirmButtonColor,
          "loading": loading.confirm,
          "onClick": onConfirm
        }, null)]
      });
      var renderFooter = () => {
        if (slots.footer) {
          return slots.footer();
        }
        return props.theme === "round-button" ? renderRoundButtons() : renderButtons();
      };
      return () => {
        var {
          width: width2,
          title,
          theme,
          message,
          className
        } = props;
        return vue.createVNode(Popup, vue.mergeProps({
          "role": "dialog",
          "class": [bem$B([theme]), className],
          "style": {
            width: addUnit(width2)
          },
          "aria-labelledby": title || message,
          "onUpdate:show": updateShow
        }, pick(props, popupInheritKeys$1)), {
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
  var dividerProps = {
    dashed: Boolean,
    hairline: truthProp,
    contentPosition: makeStringProp("center")
  };
  var _Divider = vue.defineComponent({
    name: name$z,
    props: dividerProps,
    setup(props, _ref) {
      var {
        slots
      } = _ref;
      return () => vue.createVNode("div", {
        "role": "separator",
        "class": bem$A({
          dashed: props.dashed,
          hairline: props.hairline,
          ["content-" + props.contentPosition]: !!slots.default
        })
      }, [slots.default == null ? void 0 : slots.default()]);
    }
  });
  var Divider = withInstall(_Divider);
  var [name$y, bem$z] = createNamespace("dropdown-menu");
  var dropdownMenuProps = {
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
    props: dropdownMenuProps,
    setup(props, _ref) {
      var {
        slots
      } = _ref;
      var id = useId();
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
        if (opened.value && isDef(props.zIndex)) {
          return {
            zIndex: +props.zIndex + 1
          };
        }
      });
      var onClickAway = () => {
        if (props.closeOnClickOutside) {
          children.forEach((item) => {
            item.toggle(false);
          });
        }
      };
      var updateOffset = () => {
        if (barRef.value) {
          var rect = useRect(barRef);
          if (props.direction === "down") {
            offset2.value = rect.bottom;
          } else {
            offset2.value = windowHeight.value - rect.top;
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
          "id": id + "-" + index2,
          "role": "button",
          "tabindex": disabled ? void 0 : 0,
          "class": [bem$z("item", {
            disabled
          }), {
            [HAPTICS_FEEDBACK]: !disabled
          }],
          "onClick": () => {
            if (!disabled) {
              toggleItem(index2);
            }
          }
        }, [vue.createVNode("span", {
          "class": [bem$z("title", {
            down: showPopup === (props.direction === "down"),
            active: showPopup
          }), titleClass],
          "style": {
            color: showPopup ? props.activeColor : ""
          }
        }, [vue.createVNode("div", {
          "class": "van-ellipsis"
        }, [item.renderTitle()])])]);
      };
      linkChildren({
        id,
        props,
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
  var dropdownItemProps = {
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
    props: dropdownItemProps,
    emits: ["open", "opened", "close", "closed", "change", "update:modelValue"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var state = vue.reactive({
        showPopup: false,
        transition: true,
        showWrapper: false
      });
      var {
        parent,
        index: index2
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
        if (props.teleport) {
          event.stopPropagation();
        }
      };
      var toggle = function(show, options) {
        if (show === void 0) {
          show = !state.showPopup;
        }
        if (options === void 0) {
          options = {};
        }
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
        if (props.title) {
          return props.title;
        }
        var match = props.options.find((option) => option.value === props.modelValue);
        return match ? match.text : "";
      };
      var renderOption = (option) => {
        var {
          activeColor
        } = parent.props;
        var active = option.value === props.modelValue;
        var onClick = () => {
          state.showPopup = false;
          if (option.value !== props.modelValue) {
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
          "role": "menuitem",
          "key": option.value,
          "icon": option.icon,
          "title": option.text,
          "class": bem$y("option", {
            active
          }),
          "style": {
            color: active ? activeColor : ""
          },
          "tabindex": active ? 0 : -1,
          "clickable": true,
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
          "role": "menu",
          "class": bem$y("content"),
          "overlay": overlay,
          "position": direction === "down" ? "top" : "bottom",
          "duration": state.transition ? duration : 0,
          "lazyRender": props.lazyRender,
          "overlayStyle": {
            position: "absolute"
          },
          "aria-labelledby": parent.id + "-" + index2.value,
          "closeOnClickOverlay": closeOnClickOverlay,
          "onOpen": onOpen,
          "onClose": onClose,
          "onOpened": onOpened,
          "onClosed": onClosed
        }, {
          default: () => [props.options.map(renderOption), slots.default == null ? void 0 : slots.default()]
        })]), [[vue.vShow, state.showWrapper]]);
      };
      useExpose({
        state,
        toggle,
        renderTitle
      });
      return () => {
        if (props.teleport) {
          return vue.createVNode(vue.Teleport, {
            "to": props.teleport
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
    "x1": "64%",
    "y1": "100%",
    "x2": "64%"
  }, [renderStop("#FFF", 0, 0.5), renderStop("#F2F3F5", 100)]), vue.createVNode("linearGradient", {
    "id": prefix + "2",
    "x1": "50%",
    "x2": "50%",
    "y2": "84%"
  }, [renderStop("#EBEDF0", 0), renderStop("#DCDEE0", 100, 0)]), vue.createVNode("linearGradient", {
    "id": prefix + "3",
    "x1": "100%",
    "x2": "100%",
    "y2": "100%"
  }, [renderStop("#EAEDF0", 0), renderStop("#DCDEE0", 100)]), vue.createVNode("radialGradient", {
    "id": prefix + "4",
    "cx": "50%",
    "cy": "0%",
    "fx": "50%",
    "fy": "0%",
    "r": "100%",
    "gradientTransform": "matrix(0 1 -.54 0 .5 -.5)"
  }, [renderStop("#EBEDF0", 0), renderStop("#FFF", 100, 0)])]), vue.createVNode("g", {
    "fill": "none"
  }, [vue.createVNode("g", {
    "opacity": ".8"
  }, [vue.createVNode("path", {
    "d": "M36 131V53H16v20H2v58h34z",
    "fill": "url(#" + prefix + "1)"
  }, null), vue.createVNode("path", {
    "d": "M123 15h22v14h9v77h-31V15z",
    "fill": "url(#" + prefix + "1)"
  }, null)]), vue.createVNode("path", {
    "fill": "url(#" + prefix + "4)",
    "d": "M0 139h160v21H0z"
  }, null), vue.createVNode("path", {
    "d": "M80 54a7 7 0 0 1 3 13v27l-2 2h-2a2 2 0 0 1-2-2V67a7 7 0 0 1 3-13z",
    "fill": "url(#" + prefix + "2)"
  }, null), vue.createVNode("g", {
    "opacity": ".6",
    "stroke-linecap": "round",
    "stroke-width": "7"
  }, [vue.createVNode("path", {
    "d": "M64 47a19 19 0 0 0-5 13c0 5 2 10 5 13",
    "stroke": "url(#" + prefix + "3)"
  }, null), vue.createVNode("path", {
    "d": "M53 36a34 34 0 0 0 0 48",
    "stroke": "url(#" + prefix + "3)"
  }, null), vue.createVNode("path", {
    "d": "M95 73a19 19 0 0 0 6-13c0-5-2-9-6-13",
    "stroke": "url(#" + prefix + "3)"
  }, null), vue.createVNode("path", {
    "d": "M106 84a34 34 0 0 0 0-48",
    "stroke": "url(#" + prefix + "3)"
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
    "rx": "1.1"
  }, null), vue.createVNode("rect", {
    "fill": "#EBEDF0",
    "x": "15",
    "y": "12",
    "width": "18",
    "height": "6",
    "rx": "1.1"
  }, null)])])]);
  var [name$w, bem$x] = createNamespace("empty");
  var PRESET_IMAGES = ["error", "search", "default"];
  var emptyProps = {
    image: makeStringProp("default"),
    imageSize: numericProp,
    description: String
  };
  var _Empty = vue.defineComponent({
    name: name$w,
    props: emptyProps,
    setup(props, _ref) {
      var {
        slots
      } = _ref;
      var renderImage = () => {
        if (slots.image) {
          return slots.image();
        }
        var {
          image
        } = props;
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
        var description = slots.description ? slots.description() : props.description;
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
        "style": getSizeStyle(props.imageSize)
      }, [renderImage()]), renderDescription(), renderBottom()]);
    }
  });
  var Empty = withInstall(_Empty);
  var [name$v, bem$w] = createNamespace("grid");
  var gridProps = {
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
    props: gridProps,
    setup(props, _ref) {
      var {
        slots
      } = _ref;
      var {
        linkChildren
      } = useChildren(GRID_KEY);
      linkChildren({
        props
      });
      return () => vue.createVNode("div", {
        "style": {
          paddingLeft: addUnit(props.gutter)
        },
        "class": [bem$w(), {
          [BORDER_TOP]: props.border && !props.gutter
        }]
      }, [slots.default == null ? void 0 : slots.default()]);
    }
  });
  var Grid = withInstall(_Grid);
  var [name$u, bem$v] = createNamespace("grid-item");
  var gridItemProps = extend({}, routeProps, {
    dot: Boolean,
    text: String,
    icon: String,
    badge: numericProp,
    iconColor: String,
    iconPrefix: String
  });
  var _GridItem = vue.defineComponent({
    name: name$u,
    props: gridItemProps,
    setup(props, _ref) {
      var {
        slots
      } = _ref;
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
            "dot": props.dot,
            "content": props.badge
          }, {
            default: slots.icon
          });
        }
        if (props.icon) {
          return vue.createVNode(Icon, {
            "dot": props.dot,
            "name": props.icon,
            "size": parent.props.iconSize,
            "badge": props.badge,
            "class": bem$v("icon"),
            "classPrefix": props.iconPrefix,
            "color": props.iconColor
          }, null);
        }
      };
      var renderText = () => {
        if (slots.text) {
          return slots.text();
        }
        if (props.text) {
          return vue.createVNode("span", {
            "class": bem$v("text")
          }, [props.text]);
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
    setup(props, _ref) {
      var {
        emit
      } = _ref;
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
        } = props;
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
          } = props;
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
          } = props;
          var displayHeight = vertical.value ? rootHeight : rootWidth * state.imageRatio;
          return Math.max(0, (state.scale * displayHeight - rootHeight) / 2);
        }
        return 0;
      });
      var setScale = (scale) => {
        scale = clamp(scale, +props.minZoom, +props.maxZoom);
        if (scale !== state.scale) {
          state.scale = scale;
          emit("scale", {
            scale,
            index: props.active
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
      vue.watch(() => props.active, resetScale);
      vue.watch(() => props.show, (value) => {
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
            "src": props.src,
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
  var imagePreviewProps = {
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
    props: imagePreviewProps,
    emits: ["scale", "close", "closed", "change", "update:show"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var swipeRef = vue.ref();
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
        callInterceptor(props.beforeClose, {
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
        if (props.showIndex) {
          return vue.createVNode("div", {
            "class": bem$t("index")
          }, [slots.index ? slots.index({
            index: state.active
          }) : state.active + 1 + " / " + props.images.length]);
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
        "loop": props.loop,
        "class": bem$t("swipe"),
        "duration": props.swipeDuration,
        "initialSwipe": props.startPosition,
        "showIndicators": props.showIndicators,
        "indicatorColor": "white",
        "onChange": setActive
      }, {
        default: () => [props.images.map((image) => vue.createVNode(ImagePreviewItem, {
          "src": image,
          "show": props.show,
          "active": state.active,
          "maxZoom": props.maxZoom,
          "minZoom": props.minZoom,
          "rootWidth": state.rootWidth,
          "rootHeight": state.rootHeight,
          "onScale": emitScale,
          "onClose": emitClose
        }, null))]
      });
      var renderClose = () => {
        if (props.closeable) {
          return vue.createVNode(Icon, {
            "role": "button",
            "name": props.closeIcon,
            "class": [bem$t("close-icon", props.closeIconPosition), HAPTICS_FEEDBACK],
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
      vue.watch([windowWidth, windowHeight], resize);
      vue.watch(() => props.startPosition, (value) => setActive(+value));
      vue.watch(() => props.show, (value) => {
        var {
          images,
          startPosition
        } = props;
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
        "class": [bem$t(), props.className],
        "overlayClass": bem$t("overlay"),
        "onClosed": onClosed,
        "onUpdate:show": updateShow
      }, pick(props, popupProps$1)), {
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
  var ImagePreview = function(options, startPosition) {
    if (startPosition === void 0) {
      startPosition = 0;
    }
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
  var indexBarProps = {
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
    props: indexBarProps,
    emits: ["select", "change"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var root = vue.ref();
      var activeAnchor = vue.ref("");
      var touch = useTouch();
      var scrollParent = useScrollParent(root);
      var {
        children,
        linkChildren
      } = useChildren(INDEX_BAR_KEY);
      linkChildren({
        props
      });
      var sidebarStyle = vue.computed(() => {
        if (isDef(props.zIndex)) {
          return {
            zIndex: +props.zIndex + 1
          };
        }
      });
      var highlightStyle = vue.computed(() => {
        if (props.highlightColor) {
          return {
            color: props.highlightColor
          };
        }
      });
      var getActiveAnchor = (scrollTop, rects) => {
        for (var i = children.length - 1; i >= 0; i--) {
          var prevHeight = i > 0 ? rects[i - 1].height : 0;
          var reachTop = props.sticky ? prevHeight + props.stickyOffsetTop : 0;
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
        } = props;
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
              state.top = Math.max(props.stickyOffsetTop, rects[index2].top - scrollTop) + scrollParentRect.top;
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
      vue.watch(() => props.indexList, init);
      vue.watch(activeAnchor, (value) => {
        if (value) {
          emit("change", value);
        }
      });
      var renderIndexes = () => props.indexList.map((index2) => {
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
          if (props.sticky && props.stickyOffsetTop) {
            setRootScrollTop(getRootScrollTop() - props.stickyOffsetTop);
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
      }, [props.teleport ? vue.createVNode(vue.Teleport, {
        "to": props.teleport
      }, {
        default: () => [renderSidebar()]
      }) : renderSidebar(), slots.default == null ? void 0 : slots.default()]);
    }
  });
  var [name$r, bem$r] = createNamespace("index-anchor");
  var indexAnchorProps = {
    index: numericProp
  };
  var _IndexAnchor = vue.defineComponent({
    name: name$r,
    props: indexAnchorProps,
    setup(props, _ref) {
      var {
        slots
      } = _ref;
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
        }, [slots.default ? slots.default() : props.index])]);
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
  var getDPR = function(scale) {
    if (scale === void 0) {
      scale = 1;
    }
    return inBrowser ? window.devicePixelRatio || scale : scale;
  };
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
    return function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
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
      return reject(new Error("image src is required"));
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
  class ImageCache {
    constructor(_ref) {
      var {
        max
      } = _ref;
      this.options = {
        max: max || 100
      };
      this.caches = [];
    }
    has(key) {
      return this.caches.indexOf(key) > -1;
    }
    add(key) {
      if (this.has(key))
        return;
      this.caches.push(key);
      if (this.caches.length > this.options.max) {
        this.free();
      }
    }
    free() {
      this.caches.shift();
    }
  }
  class ReactiveListener {
    constructor(_ref) {
      var {
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
      } = _ref;
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
      this.$parent = $parent;
      this.elRenderer = elRenderer;
      this.imageCache = imageCache;
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
    update(_ref2) {
      var {
        src,
        loading,
        error
      } = _ref2;
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
    checkInView() {
      var rect = useRect(this.el);
      return rect.top < window.innerHeight * this.options.preLoad && rect.bottom > this.options.preLoadTop && rect.left < window.innerWidth * this.options.preLoad && rect.right > 0;
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
    load(onFinish) {
      if (onFinish === void 0) {
        onFinish = noop;
      }
      if (this.attempt > this.options.attempt - 1 && this.state.error) {
        onFinish();
        return;
      }
      if (this.state.rendered && this.state.loaded)
        return;
      if (this.imageCache.has(this.src)) {
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
          this.imageCache.add(this.src);
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
      constructor(_ref) {
        var {
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
        } = _ref;
        this.mode = modeType.event;
        this.listeners = [];
        this.targetIndex = 0;
        this.targets = [];
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
          supportWebp: supportWebp(),
          filter: filter || {},
          adapter: adapter || {},
          observer: !!observer,
          observerOptions: observerOptions || DEFAULT_OBSERVER_OPTIONS
        };
        this.initEvent();
        this.imageCache = new ImageCache({
          max: 200
        });
        this.lazyLoadHandler = throttle(this.lazyLoadHandler.bind(this), this.options.throttleWait);
        this.setMode(this.options.observer ? modeType.observer : modeType.event);
      }
      config(options) {
        if (options === void 0) {
          options = {};
        }
        Object.assign(this.options, options);
      }
      performance() {
        return this.listeners.map((item) => item.performance());
      }
      addLazyBox(vm) {
        this.listeners.push(vm);
        if (inBrowser) {
          this.addListenerTarget(window);
          this.observer && this.observer.observe(vm.el);
          if (vm.$el && vm.$el.parentNode) {
            this.addListenerTarget(vm.$el.parentNode);
          }
        }
      }
      add(el, binding, vnode) {
        if (this.listeners.some((item) => item.el === el)) {
          this.update(el, binding);
          return vue.nextTick(this.lazyLoadHandler);
        }
        var value = this.valueFormatter(binding.value);
        var {
          src
        } = value;
        vue.nextTick(() => {
          src = getBestSelectionFromSrcset(el, this.options.scale) || src;
          this.observer && this.observer.observe(el);
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
            elRenderer: this.elRenderer.bind(this),
            options: this.options,
            imageCache: this.imageCache
          });
          this.listeners.push(newListener);
          if (inBrowser) {
            this.addListenerTarget(window);
            this.addListenerTarget($parent);
          }
          this.lazyLoadHandler();
          vue.nextTick(() => this.lazyLoadHandler());
        });
      }
      update(el, binding, vnode) {
        var value = this.valueFormatter(binding.value);
        var {
          src
        } = value;
        src = getBestSelectionFromSrcset(el, this.options.scale) || src;
        var exist = this.listeners.find((item) => item.el === el);
        if (!exist) {
          this.add(el, binding, vnode);
        } else {
          exist.update({
            src,
            error: value.error,
            loading: value.loading
          });
        }
        if (this.observer) {
          this.observer.unobserve(el);
          this.observer.observe(el);
        }
        this.lazyLoadHandler();
        vue.nextTick(() => this.lazyLoadHandler());
      }
      remove(el) {
        if (!el)
          return;
        this.observer && this.observer.unobserve(el);
        var existItem = this.listeners.find((item) => item.el === el);
        if (existItem) {
          this.removeListenerTarget(existItem.$parent);
          this.removeListenerTarget(window);
          remove(this.listeners, existItem);
          existItem.$destroy();
        }
      }
      removeComponent(vm) {
        if (!vm)
          return;
        remove(this.listeners, vm);
        this.observer && this.observer.unobserve(vm.el);
        if (vm.$parent && vm.$el.parentNode) {
          this.removeListenerTarget(vm.$el.parentNode);
        }
        this.removeListenerTarget(window);
      }
      setMode(mode) {
        if (!hasIntersectionObserver && mode === modeType.observer) {
          mode = modeType.event;
        }
        this.mode = mode;
        if (mode === modeType.event) {
          if (this.observer) {
            this.listeners.forEach((listener) => {
              this.observer.unobserve(listener.el);
            });
            this.observer = null;
          }
          this.targets.forEach((target) => {
            this.initListen(target.el, true);
          });
        } else {
          this.targets.forEach((target) => {
            this.initListen(target.el, false);
          });
          this.initIntersectionObserver();
        }
      }
      addListenerTarget(el) {
        if (!el)
          return;
        var target = this.targets.find((target2) => target2.el === el);
        if (!target) {
          target = {
            el,
            id: ++this.targetIndex,
            childrenCount: 1,
            listened: true
          };
          this.mode === modeType.event && this.initListen(target.el, true);
          this.targets.push(target);
        } else {
          target.childrenCount++;
        }
        return this.targetIndex;
      }
      removeListenerTarget(el) {
        this.targets.forEach((target, index2) => {
          if (target.el === el) {
            target.childrenCount--;
            if (!target.childrenCount) {
              this.initListen(target.el, false);
              this.targets.splice(index2, 1);
              target = null;
            }
          }
        });
      }
      initListen(el, start2) {
        this.options.ListenEvents.forEach((evt) => (start2 ? on : off)(el, evt, this.lazyLoadHandler));
      }
      initEvent() {
        var _this = this;
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
          var on2 = function() {
            _this.$off(event, on2);
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            func.apply(_this, args);
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
      lazyLoadHandler() {
        var freeList = [];
        this.listeners.forEach((listener) => {
          if (!listener.el || !listener.el.parentNode) {
            freeList.push(listener);
          }
          var catIn = listener.checkInView();
          if (!catIn)
            return;
          listener.load();
        });
        freeList.forEach((item) => {
          remove(this.listeners, item);
          item.$destroy();
        });
      }
      initIntersectionObserver() {
        if (!hasIntersectionObserver) {
          return;
        }
        this.observer = new IntersectionObserver(this.observerHandler.bind(this), this.options.observerOptions);
        if (this.listeners.length) {
          this.listeners.forEach((listener) => {
            this.observer.observe(listener.el);
          });
        }
      }
      observerHandler(entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.listeners.forEach((listener) => {
              if (listener.el === entry.target) {
                if (listener.state.loaded)
                  return this.observer.unobserve(listener.el);
                listener.load();
              }
            });
          }
        });
      }
      elRenderer(listener, state, cache) {
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
      valueFormatter(value) {
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
      checkInView() {
        var rect = useRect(this.$el);
        return inBrowser && rect.top < window.innerHeight * lazy.options.preLoad && rect.bottom > 0 && rect.left < window.innerWidth * lazy.options.preLoad && rect.right > 0;
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
    constructor(_ref) {
      var {
        el,
        binding,
        vnode,
        lazy
      } = _ref;
      this.el = null;
      this.vnode = vnode;
      this.binding = binding;
      this.options = {};
      this.lazy = lazy;
      this.queue = [];
      this.update({
        el,
        binding
      });
    }
    update(_ref2) {
      var {
        el,
        binding
      } = _ref2;
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
    constructor(_ref3) {
      var {
        lazy
      } = _ref3;
      this.lazy = lazy;
      this.queue = [];
    }
    bind(el, binding, vnode) {
      var container = new LazyContainer({
        el,
        binding,
        vnode,
        lazy: this.lazy
      });
      this.queue.push(container);
    }
    update(el, binding, vnode) {
      var container = this.queue.find((item) => item.el === el);
      if (!container)
        return;
      container.update({
        el,
        binding,
        vnode
      });
    }
    unbind(el) {
      var container = this.queue.find((item) => item.el === el);
      if (!container)
        return;
      container.clear();
      remove(this.queue, container);
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
        } = lazyManager.valueFormatter(this.src);
        this.state.loaded = false;
        this.options.src = src;
        this.options.error = error;
        this.options.loading = loading;
        this.renderSrc = this.options.loading;
      },
      checkInView() {
        var rect = useRect(this.$el);
        return rect.top < window.innerHeight * lazyManager.options.preLoad && rect.bottom > 0 && rect.left < window.innerWidth * lazyManager.options.preLoad && rect.right > 0;
      },
      load(onFinish) {
        if (onFinish === void 0) {
          onFinish = noop;
        }
        if (this.state.attempt > this.options.attempt - 1 && this.state.error) {
          onFinish();
          return;
        }
        var {
          src
        } = this.options;
        loadImageAsync({
          src
        }, (_ref) => {
          var {
            src: src2
          } = _ref;
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
    install(app, options) {
      if (options === void 0) {
        options = {};
      }
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
  var [name$q, bem$q, t$6] = createNamespace("list");
  var listProps = {
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
    props: listProps,
    emits: ["load", "update:error", "update:loading"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var loading = vue.ref(false);
      var root = vue.ref();
      var placeholder = vue.ref();
      var tabStatus = useTabStatus();
      var scrollParent = useScrollParent(root);
      var check = () => {
        vue.nextTick(() => {
          if (loading.value || props.finished || props.error || (tabStatus == null ? void 0 : tabStatus.value) === false) {
            return;
          }
          var {
            offset: offset2,
            direction
          } = props;
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
        if (props.finished) {
          var text = slots.finished ? slots.finished() : props.finishedText;
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
        if (props.error) {
          var text = slots.error ? slots.error() : props.errorText;
          if (text) {
            return vue.createVNode("div", {
              "role": "button",
              "class": bem$q("error-text"),
              "tabindex": 0,
              "onClick": clickErrorText
            }, [text]);
          }
        }
      };
      var renderLoading = () => {
        if (loading.value && !props.finished) {
          return vue.createVNode("div", {
            "class": bem$q("loading")
          }, [slots.loading ? slots.loading() : vue.createVNode(Loading, {
            "class": bem$q("loading-icon")
          }, {
            default: () => [props.loadingText || t$6("loading")]
          })]);
        }
      };
      vue.watch(() => [props.loading, props.finished, props.error], check);
      if (tabStatus) {
        vue.watch(tabStatus, (tabActive) => {
          if (tabActive) {
            check();
          }
        });
      }
      vue.onUpdated(() => {
        loading.value = props.loading;
      });
      vue.onMounted(() => {
        if (props.immediateCheck) {
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
        }, [props.direction === "down" ? Content : Placeholder, renderLoading(), renderFinishedText(), renderErrorText(), props.direction === "up" ? Content : Placeholder]);
      };
    }
  });
  var List = withInstall(_List);
  function usePlaceholder(contentRef, bem2) {
    var height2 = useHeight(contentRef);
    return (renderContent) => vue.createVNode("div", {
      "class": bem2("placeholder"),
      "style": {
        height: height2.value ? height2.value + "px" : void 0
      }
    }, [renderContent()]);
  }
  var [name$p, bem$p] = createNamespace("nav-bar");
  var navBarProps = {
    title: String,
    fixed: Boolean,
    zIndex: numericProp,
    border: truthProp,
    leftText: String,
    rightText: String,
    leftArrow: Boolean,
    placeholder: Boolean,
    safeAreaInsetTop: Boolean
  };
  var _NavBar = vue.defineComponent({
    name: name$p,
    props: navBarProps,
    emits: ["click-left", "click-right"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var navBarRef = vue.ref();
      var renderPlaceholder = usePlaceholder(navBarRef, bem$p);
      var onClickLeft = (event) => emit("click-left", event);
      var onClickRight = (event) => emit("click-right", event);
      var renderLeft = () => {
        if (slots.left) {
          return slots.left();
        }
        return [props.leftArrow && vue.createVNode(Icon, {
          "class": bem$p("arrow"),
          "name": "arrow-left"
        }, null), props.leftText && vue.createVNode("span", {
          "class": bem$p("text")
        }, [props.leftText])];
      };
      var renderRight = () => {
        if (slots.right) {
          return slots.right();
        }
        return vue.createVNode("span", {
          "class": bem$p("text")
        }, [props.rightText]);
      };
      var renderNavBar = () => {
        var {
          title,
          fixed,
          border,
          zIndex
        } = props;
        var style = getZIndexStyle(zIndex);
        var hasLeft = props.leftArrow || props.leftText || slots.left;
        var hasRight = props.rightText || slots.right;
        return vue.createVNode("div", {
          "ref": navBarRef,
          "style": style,
          "class": [bem$p({
            fixed,
            "safe-area-inset-top": props.safeAreaInsetTop
          }), {
            [BORDER_BOTTOM]: border
          }]
        }, [vue.createVNode("div", {
          "class": bem$p("content")
        }, [hasLeft && vue.createVNode("div", {
          "class": [bem$p("left"), HAPTICS_FEEDBACK],
          "onClick": onClickLeft
        }, [renderLeft()]), vue.createVNode("div", {
          "class": [bem$p("title"), "van-ellipsis"]
        }, [slots.title ? slots.title() : title]), hasRight && vue.createVNode("div", {
          "class": [bem$p("right"), HAPTICS_FEEDBACK],
          "onClick": onClickRight
        }, [renderRight()])])]);
      };
      return () => {
        if (props.fixed && props.placeholder) {
          return renderPlaceholder(renderNavBar);
        }
        return renderNavBar();
      };
    }
  });
  var NavBar = withInstall(_NavBar);
  var [name$o, bem$o] = createNamespace("notice-bar");
  var noticeBarProps = {
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
    props: noticeBarProps,
    emits: ["close", "replay"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
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
        if (props.leftIcon) {
          return vue.createVNode(Icon, {
            "class": bem$o("left-icon"),
            "name": props.leftIcon
          }, null);
        }
      };
      var getRightIconName = () => {
        if (props.mode === "closeable") {
          return "cross";
        }
        if (props.mode === "link") {
          return "arrow";
        }
      };
      var onClickRightIcon = (event) => {
        if (props.mode === "closeable") {
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
            state.duration = (contentWidth + wrapWidth) / +props.speed;
            emit("replay");
          });
        });
      };
      var renderMarquee = () => {
        var ellipsis = props.scrollable === false && !props.wrapable;
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
        }, [slots.default ? slots.default() : props.text])]);
      };
      var reset = () => {
        var {
          delay,
          speed,
          scrollable
        } = props;
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
      vue.watch(() => [props.text, props.scrollable], reset);
      return () => {
        var {
          color,
          wrapable,
          background
        } = props;
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
  var notifyProps = extend({}, popupSharedProps, {
    type: makeStringProp("danger"),
    color: String,
    message: numericProp,
    className: unknownProp,
    background: String,
    lockScroll: Boolean
  });
  var VanNotify = vue.defineComponent({
    name: name$n,
    props: notifyProps,
    emits: ["update:show"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var updateShow = (show) => emit("update:show", show);
      return () => vue.createVNode(Popup, {
        "show": props.show,
        "class": [bem$n([props.type]), props.className],
        "style": {
          color: props.color,
          background: props.background
        },
        "overlay": false,
        "position": "top",
        "duration": 0.2,
        "lockScroll": props.lockScroll,
        "onUpdate:show": updateShow
      }, {
        default: () => [slots.default ? slots.default() : props.message]
      });
    }
  });
  var timer;
  var instance;
  var parseOptions = (message) => isObject(message) ? message : {
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
    "d": "M26 13h-2v2h2v-2zm-8-3h2V8h-2v2zm2-4h2V4h-2v2zm2 4h4V4h-2v4h-2v2zm-7 14 3-3h-6l3 3zM6 13H4v2h2v-2zm16 0H8v2h14v-2zm-12-3h2V8h-2v2zM28 0l1 1 1 1v15l-1 2H1l-1-2V2l1-1 1-1zm0 2H2v15h26V2zM6 4v2H4V4zm10 2h2V4h-2v2zM8 9v1H4V8zm8 0v1h-2V8zm-6-5v2H8V4zm4 0v2h-2V4z",
    "fill": "currentColor"
  }, null)]);
  var DeleteIcon = vue.createVNode("svg", {
    "class": bem$m("delete-icon"),
    "viewBox": "0 0 32 22"
  }, [vue.createVNode("path", {
    "d": "M28 0a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H10.4a2 2 0 0 1-1.4-.6L1 13.1c-.6-.5-.9-1.3-.9-2 0-1 .3-1.7.9-2.2L9 .6a2 2 0 0 1 1.4-.6zm0 2H10.4l-8.2 8.3a1 1 0 0 0-.3.7c0 .3.1.5.3.7l8.2 8.4H28a2 2 0 0 0 2-2V4c0-1.1-.9-2-2-2zm-5 4a1 1 0 0 1 .7.3 1 1 0 0 1 0 1.4L20.4 11l3.3 3.3c.2.2.3.5.3.7 0 .3-.1.5-.3.7a1 1 0 0 1-.7.3 1 1 0 0 1-.7-.3L19 12.4l-3.4 3.3a1 1 0 0 1-.6.3 1 1 0 0 1-.7-.3 1 1 0 0 1-.3-.7c0-.2.1-.5.3-.7l3.3-3.3-3.3-3.3A1 1 0 0 1 14 7c0-.3.1-.5.3-.7A1 1 0 0 1 15 6a1 1 0 0 1 .6.3L19 9.6l3.3-3.3A1 1 0 0 1 23 6z",
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
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
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
            preventDefault(event);
          }
          active.value = false;
          emit("press", props.text, props.type);
        }
      };
      var renderContent = () => {
        if (props.loading) {
          return vue.createVNode(Loading, {
            "class": bem$m("loading-icon")
          }, null);
        }
        var text = slots.default ? slots.default() : props.text;
        switch (props.type) {
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
          wider: props.wider
        }),
        "onTouchstart": onTouchStart,
        "onTouchmove": onTouchMove,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, [vue.createVNode("div", {
        "role": "button",
        "tabindex": 0,
        "class": bem$m([props.color, {
          large: props.large,
          active: active.value,
          delete: props.type === "delete"
        }])
      }, [renderContent()])]);
    }
  });
  var [name$l, bem$l] = createNamespace("number-keyboard");
  var numberKeyboardProps = {
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
  };
  var _NumberKeyboard = vue.defineComponent({
    name: name$l,
    props: numberKeyboardProps,
    emits: ["show", "hide", "blur", "input", "close", "delete", "update:modelValue"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var root = vue.ref();
      var genBasicKeys = () => {
        var keys2 = Array(9).fill("").map((_, i) => ({
          text: i + 1
        }));
        if (props.randomKeyOrder) {
          keys2.sort(() => Math.random() > 0.5 ? 1 : -1);
        }
        return keys2;
      };
      var genDefaultKeys = () => [...genBasicKeys(), {
        text: props.extraKey,
        type: "extra"
      }, {
        text: 0
      }, {
        text: props.showDeleteKey ? props.deleteButtonText : "",
        type: props.showDeleteKey ? "delete" : ""
      }];
      var genCustomKeys = () => {
        var keys2 = genBasicKeys();
        var {
          extraKey
        } = props;
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
      var keys = vue.computed(() => props.theme === "custom" ? genCustomKeys() : genDefaultKeys());
      var onBlur = () => {
        if (props.show) {
          emit("blur");
        }
      };
      var onClose = () => {
        emit("close");
        if (props.blurOnClose) {
          onBlur();
        }
      };
      var onAnimationEnd = () => emit(props.show ? "show" : "hide");
      var onPress = (text, type) => {
        if (text === "") {
          if (type === "extra") {
            onBlur();
          }
          return;
        }
        var value = props.modelValue;
        if (type === "delete") {
          emit("delete");
          emit("update:modelValue", value.slice(0, value.length - 1));
        } else if (type === "close") {
          onClose();
        } else if (value.length < props.maxlength) {
          emit("input", text);
          emit("update:modelValue", value + text);
        }
      };
      var renderTitle = () => {
        var {
          title,
          theme,
          closeButtonText
        } = props;
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
          "class": [bem$l("close"), HAPTICS_FEEDBACK],
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
        if (props.theme === "custom") {
          return vue.createVNode("div", {
            "class": bem$l("sidebar")
          }, [props.showDeleteKey && vue.createVNode(NumberKeyboardKey, {
            "large": true,
            "text": props.deleteButtonText,
            "type": "delete",
            "onPress": onPress
          }, {
            delete: slots.delete
          }), vue.createVNode(NumberKeyboardKey, {
            "large": true,
            "text": props.closeButtonText,
            "type": "close",
            "color": "blue",
            "loading": props.closeButtonLoading,
            "onPress": onPress
          }, null)]);
        }
      };
      vue.watch(() => props.show, (value) => {
        if (!props.transition) {
          emit(value ? "show" : "hide");
        }
      });
      if (props.hideOnClickOutside) {
        useClickAway(root, onBlur, {
          eventName: "touchstart"
        });
      }
      return () => {
        var Title = renderTitle();
        var Content = vue.createVNode(vue.Transition, {
          "name": props.transition ? "van-slide-up" : ""
        }, {
          default: () => [vue.withDirectives(vue.createVNode("div", {
            "ref": root,
            "style": getZIndexStyle(props.zIndex),
            "class": bem$l({
              unfit: !props.safeAreaInsetBottom,
              "with-title": !!Title
            }),
            "onTouchstart": stopPropagation,
            "onAnimationend": onAnimationEnd,
            "onWebkitAnimationEnd": onAnimationEnd
          }, [Title, vue.createVNode("div", {
            "class": bem$l("body")
          }, [vue.createVNode("div", {
            "class": bem$l("keys")
          }, [renderKeys()]), renderSidebar()])]), [[vue.vShow, props.show]])]
        });
        if (props.teleport) {
          return vue.createVNode(vue.Teleport, {
            "to": props.teleport
          }, {
            default: () => [Content]
          });
        }
        return Content;
      };
    }
  });
  var NumberKeyboard = withInstall(_NumberKeyboard);
  var [name$k, bem$k, t$5] = createNamespace("pagination");
  var makePage = (number, text, active) => ({
    number,
    text,
    active
  });
  var paginationProps = {
    mode: makeStringProp("multi"),
    prevText: String,
    nextText: String,
    pageCount: makeNumericProp(0),
    modelValue: makeNumberProp(0),
    totalItems: makeNumericProp(0),
    showPageSize: makeNumericProp(5),
    itemsPerPage: makeNumericProp(10),
    forceEllipses: Boolean
  };
  var _Pagination = vue.defineComponent({
    name: name$k,
    props: paginationProps,
    emits: ["change", "update:modelValue"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var count = vue.computed(() => {
        var {
          pageCount,
          totalItems,
          itemsPerPage
        } = props;
        var count2 = +pageCount || Math.ceil(+totalItems / +itemsPerPage);
        return Math.max(1, count2);
      });
      var pages = vue.computed(() => {
        var items = [];
        var pageCount = count.value;
        var showPageSize = +props.showPageSize;
        var {
          modelValue,
          forceEllipses
        } = props;
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
      var updateModelValue = (value, emitChange) => {
        value = clamp(value, 1, count.value);
        if (props.modelValue !== value) {
          emit("update:modelValue", value);
          if (emitChange) {
            emit("change", value);
          }
        }
      };
      vue.watchEffect(() => updateModelValue(props.modelValue));
      var renderDesc = () => vue.createVNode("li", {
        "class": bem$k("page-desc")
      }, [slots.pageDesc ? slots.pageDesc() : props.modelValue + "/" + count.value]);
      var renderPrevButton = () => {
        var {
          mode,
          modelValue
        } = props;
        var slot = slots["prev-text"];
        var disabled = modelValue === 1;
        return vue.createVNode("li", {
          "class": [bem$k("item", {
            disabled,
            border: mode === "simple",
            prev: true
          }), BORDER_SURROUND]
        }, [vue.createVNode("button", {
          "type": "button",
          "disabled": disabled,
          "onClick": () => updateModelValue(modelValue - 1)
        }, [slot ? slot() : props.prevText || t$5("prev")])]);
      };
      var renderNextButton = () => {
        var {
          mode,
          modelValue
        } = props;
        var slot = slots["next-text"];
        var disabled = modelValue === count.value;
        return vue.createVNode("li", {
          "class": [bem$k("item", {
            disabled,
            border: mode === "simple",
            next: true
          }), BORDER_SURROUND]
        }, [vue.createVNode("button", {
          "type": "button",
          "disabled": disabled,
          "onClick": () => updateModelValue(modelValue + 1)
        }, [slot ? slot() : props.nextText || t$5("next")])]);
      };
      var renderPages = () => pages.value.map((page) => vue.createVNode("li", {
        "class": [bem$k("item", {
          active: page.active,
          page: true
        }), BORDER_SURROUND]
      }, [vue.createVNode("button", {
        "type": "button",
        "aria-current": page.active || void 0,
        "onClick": () => updateModelValue(page.number)
      }, [slots.page ? slots.page(page) : page.text])]));
      return () => vue.createVNode("nav", {
        "role": "navigation",
        "class": bem$k()
      }, [vue.createVNode("ul", {
        "class": bem$k("items")
      }, [renderPrevButton(), props.mode === "simple" ? renderDesc() : renderPages(), renderNextButton()])]);
    }
  });
  var Pagination = withInstall(_Pagination);
  var [name$j, bem$j] = createNamespace("password-input");
  var passwordInputProps = {
    info: String,
    mask: truthProp,
    value: makeStringProp(""),
    gutter: numericProp,
    length: makeNumericProp(6),
    focused: Boolean,
    errorInfo: String
  };
  var _PasswordInput = vue.defineComponent({
    name: name$j,
    props: passwordInputProps,
    emits: ["focus"],
    setup(props, _ref) {
      var {
        emit
      } = _ref;
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
        } = props;
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
        var info = props.errorInfo || props.info;
        return vue.createVNode("div", {
          "class": bem$j()
        }, [vue.createVNode("ul", {
          "class": [bem$j("security"), {
            [BORDER_SURROUND]: !props.gutter
          }],
          "onTouchstart": onTouchStart
        }, [renderPoints()]), info && vue.createVNode("div", {
          "class": bem$j(props.errorInfo ? "error-info" : "info")
        }, [info])]);
      };
    }
  });
  var PasswordInput = withInstall(_PasswordInput);
  function getBoundingClientRect(element, includeScale) {
    var rect = element.getBoundingClientRect();
    var scaleX = 1;
    var scaleY = 1;
    return {
      width: rect.width / scaleX,
      height: rect.height / scaleY,
      top: rect.top / scaleY,
      right: rect.right / scaleX,
      bottom: rect.bottom / scaleY,
      left: rect.left / scaleX,
      x: rect.left / scaleX,
      y: rect.top / scaleY
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
  function isElementScaled(element) {
    var rect = element.getBoundingClientRect();
    var scaleX = rect.width / element.offsetWidth || 1;
    var scaleY = rect.height / element.offsetHeight || 1;
    return scaleX !== 1 || scaleY !== 1;
  }
  function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) {
      isFixed = false;
    }
    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    isHTMLElement(offsetParent) && isElementScaled(offsetParent);
    var documentElement = getDocumentElement(offsetParent);
    var rect = getBoundingClientRect(elementOrVirtualElement);
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
    var width2 = element.offsetWidth;
    var height2 = element.offsetHeight;
    if (Math.abs(clientRect.width - width2) <= 1) {
      width2 = clientRect.width;
    }
    if (Math.abs(clientRect.height - height2) <= 1) {
      height2 = clientRect.height;
    }
    return {
      x: element.offsetLeft,
      y: element.offsetTop,
      width: width2,
      height: height2
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
    var merged = modifiers.reduce(function(merged2, current2) {
      var existing = merged2[current2.name];
      merged2[current2.name] = existing ? Object.assign({}, existing, current2, {
        options: Object.assign({}, existing.options, current2.options),
        data: Object.assign({}, existing.data, current2.data)
      }) : current2;
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
        setOptions: function setOptions(setOptionsAction) {
          var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
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
  function effect$1(_ref) {
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
    effect: effect$1,
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
    var popper = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets;
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
        if (getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
          heightProp = "scrollHeight";
          widthProp = "scrollWidth";
        }
      }
      offsetParent = offsetParent;
      if (placement === top || (placement === left || placement === right) && variation === end) {
        sideY = bottom;
        y -= offsetParent[heightProp] - popperRect.height;
        y *= gpuAcceleration ? 1 : -1;
      }
      if (placement === left || (placement === top || placement === bottom) && variation === end) {
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
      return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }
    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
  }
  function computeStyles(_ref4) {
    var state = _ref4.state, options = _ref4.options;
    var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
    var commonStyles = {
      placement: getBasePlacement(state.placement),
      variation: getVariation(state.placement),
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
  function effect(_ref2) {
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
    effect,
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
  var popoverProps = {
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
  };
  var _Popover = vue.defineComponent({
    name: name$i,
    props: popoverProps,
    emits: ["select", "touchstart", "update:show"],
    setup(props, _ref) {
      var {
        emit,
        slots,
        attrs
      } = _ref;
      var popper;
      var wrapperRef = vue.ref();
      var popoverRef = vue.ref();
      var createPopperInstance = () => {
        if (wrapperRef.value && popoverRef.value) {
          return createPopper(wrapperRef.value, popoverRef.value.popupRef.value, {
            placement: props.placement,
            modifiers: [{
              name: "computeStyles",
              options: {
                adaptive: false,
                gpuAcceleration: false
              }
            }, extend({}, offset$1, {
              options: {
                offset: props.offset
              }
            })]
          });
        }
        return null;
      };
      var updateLocation = () => {
        vue.nextTick(() => {
          if (!props.show) {
            return;
          }
          if (!popper) {
            popper = createPopperInstance();
          } else {
            popper.setOptions({
              placement: props.placement
            });
          }
        });
      };
      var updateShow = (value) => emit("update:show", value);
      var onClickWrapper = () => {
        if (props.trigger === "click") {
          updateShow(!props.show);
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
        if (props.closeOnClickAction) {
          updateShow(false);
        }
      };
      var onClickAway = () => {
        if (props.closeOnClickOutside && (!props.overlay || props.closeOnClickOverlay)) {
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
          "tabindex": disabled ? void 0 : 0,
          "aria-disabled": disabled || void 0,
          "onClick": () => onClickAction(action, index2)
        }, [icon && vue.createVNode(Icon, {
          "name": icon,
          "classPrefix": props.iconPrefix,
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
      vue.watch(() => [props.show, props.placement], updateLocation);
      useClickAway(wrapperRef, onClickAway, {
        eventName: "touchstart"
      });
      return () => vue.createVNode(vue.Fragment, null, [vue.createVNode("span", {
        "ref": wrapperRef,
        "class": bem$i("wrapper"),
        "onClick": onClickWrapper
      }, [slots.reference == null ? void 0 : slots.reference()]), vue.createVNode(Popup, vue.mergeProps({
        "ref": popoverRef,
        "class": bem$i([props.theme]),
        "position": "",
        "transition": "van-popover-zoom",
        "lockScroll": false,
        "onTouchstart": onTouchstart,
        "onUpdate:show": updateShow
      }, attrs, pick(props, popupProps)), {
        default: () => [props.showArrow && vue.createVNode("div", {
          "class": bem$i("arrow")
        }, null), vue.createVNode("div", {
          "role": "menu",
          "class": bem$i("content")
        }, [slots.default ? slots.default() : props.actions.map(renderAction)])]
      })]);
    }
  });
  var Popover = withInstall(_Popover);
  var [name$h, bem$h] = createNamespace("progress");
  var progressProps = {
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
    props: progressProps,
    setup(props) {
      var background = vue.computed(() => props.inactive ? void 0 : props.color);
      var renderPivot = () => {
        var {
          textColor,
          pivotText,
          pivotColor,
          percentage
        } = props;
        var text = pivotText != null ? pivotText : percentage + "%";
        if (props.showPivot && text) {
          var style = {
            color: textColor,
            left: +percentage + "%",
            transform: "translate(-" + +percentage + "%,-50%)",
            background: pivotColor || background.value
          };
          return vue.createVNode("span", {
            "style": style,
            "class": bem$h("pivot", {
              inactive: props.inactive
            })
          }, [text]);
        }
      };
      return () => {
        var {
          trackColor,
          percentage,
          strokeWidth
        } = props;
        var rootStyle = {
          background: trackColor,
          height: addUnit(strokeWidth)
        };
        var portionStyle = {
          width: percentage + "%",
          background: background.value
        };
        return vue.createVNode("div", {
          "class": bem$h(),
          "style": rootStyle
        }, [vue.createVNode("span", {
          "class": bem$h("portion", {
            inactive: props.inactive
          }),
          "style": portionStyle
        }, null), renderPivot()]);
      };
    }
  });
  var Progress = withInstall(_Progress);
  var [name$g, bem$g, t$4] = createNamespace("pull-refresh");
  var DEFAULT_HEAD_HEIGHT = 50;
  var TEXT_STATUS = ["pulling", "loosing", "success"];
  var pullRefreshProps = {
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
  };
  var _PullRefresh = vue.defineComponent({
    name: name$g,
    props: pullRefreshProps,
    emits: ["refresh", "update:modelValue"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
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
        if (props.headHeight !== DEFAULT_HEAD_HEIGHT) {
          return {
            height: props.headHeight + "px"
          };
        }
      };
      var isTouchable = () => state.status !== "loading" && state.status !== "success" && !props.disabled;
      var ease = (distance) => {
        var pullDistance = +(props.pullDistance || props.headHeight);
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
        var pullDistance = +(props.pullDistance || props.headHeight);
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
        return props[status + "Text"] || t$4(status);
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
        }, +props.successDuration);
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
          state.duration = +props.animationDuration;
          if (state.status === "loosing") {
            setStatus(+props.headHeight, true);
            emit("update:modelValue", true);
            vue.nextTick(() => emit("refresh"));
          } else {
            setStatus(0);
          }
        }
      };
      vue.watch(() => props.modelValue, (value) => {
        state.duration = +props.animationDuration;
        if (value) {
          setStatus(+props.headHeight, true);
        } else if (slots.success || props.successText) {
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
  var rateProps = {
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
  };
  var _Rate = vue.defineComponent({
    name: name$f,
    props: rateProps,
    emits: ["change", "update:modelValue"],
    setup(props, _ref) {
      var {
        emit
      } = _ref;
      var touch = useTouch();
      var [itemRefs, setItemRefs] = useRefs();
      var untouchable = () => props.readonly || props.disabled || !props.touchable;
      var list = vue.computed(() => Array(+props.count).fill("").map((_, i) => getRateStatus(props.modelValue, i + 1, props.allowHalf, props.readonly)));
      var ranges;
      var updateRanges = () => {
        var rects = itemRefs.value.map(useRect);
        ranges = [];
        rects.forEach((rect, index2) => {
          if (props.allowHalf) {
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
        return props.allowHalf ? 0.5 : 1;
      };
      var select = (index2) => {
        if (!props.disabled && !props.readonly && index2 !== props.modelValue) {
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
        } = props;
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
          "tabindex": disabled ? void 0 : 0,
          "aria-setsize": count,
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
      useCustomFieldValue(() => props.modelValue);
      return () => vue.createVNode("div", {
        "role": "radiogroup",
        "class": bem$f({
          readonly: props.readonly,
          disabled: props.disabled
        }),
        "tabindex": props.disabled ? void 0 : 0,
        "aria-disabled": props.disabled,
        "aria-readonly": props.readonly,
        "onTouchstart": onTouchStart,
        "onTouchmove": onTouchMove
      }, [list.value.map(renderStar)]);
    }
  });
  var Rate = withInstall(_Rate);
  var Row = withInstall(_Row);
  var [name$e, bem$e, t$3] = createNamespace("search");
  var searchProps = extend({}, fieldSharedProps, {
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
    props: searchProps,
    emits: ["search", "cancel", "update:modelValue"],
    setup(props, _ref) {
      var {
        emit,
        slots,
        attrs
      } = _ref;
      var id = useId();
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
          emit("search", props.modelValue);
        }
      };
      var getInputId = () => props.id || id + "-input";
      var renderLabel = () => {
        if (slots.label || props.label) {
          return vue.createVNode("label", {
            "class": bem$e("label"),
            "for": getInputId()
          }, [slots.label ? slots.label() : props.label]);
        }
      };
      var renderAction = () => {
        if (props.showAction) {
          var text = props.actionText || t$3("cancel");
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
        var fieldAttrs = extend({}, attrs, pick(props, fieldPropNames), {
          id: getInputId()
        });
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
          "show-action": props.showAction
        }),
        "style": {
          background: props.background
        }
      }, [slots.left == null ? void 0 : slots.left(), vue.createVNode("div", {
        "class": bem$e("content", props.shape)
      }, [renderLabel(), renderField()]), renderAction()]);
    }
  });
  var Search = withInstall(_Search);
  var PRESET_ICONS = ["qq", "link", "weibo", "wechat", "poster", "qrcode", "weapp-qrcode", "wechat-moments"];
  var popupInheritKeys = [...popupSharedPropKeys, "round", "closeOnPopstate", "safeAreaInsetBottom"];
  function getIconURL(icon) {
    if (PRESET_ICONS.includes(icon)) {
      return "https://img.yzcdn.cn/vant/share-sheet-" + icon + ".png";
    }
    return icon;
  }
  var [name$d, bem$d, t$2] = createNamespace("share-sheet");
  var shareSheetProps = extend({}, popupSharedProps, {
    title: String,
    round: truthProp,
    options: makeArrayProp(),
    cancelText: String,
    description: String,
    closeOnPopstate: truthProp,
    safeAreaInsetBottom: truthProp
  });
  var _ShareSheet = vue.defineComponent({
    name: name$d,
    props: shareSheetProps,
    emits: ["cancel", "select", "update:show"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var updateShow = (value) => emit("update:show", value);
      var onCancel = () => {
        updateShow(false);
        emit("cancel");
      };
      var onSelect = (option, index2) => emit("select", option, index2);
      var renderHeader = () => {
        var title = slots.title ? slots.title() : props.title;
        var description = slots.description ? slots.description() : props.description;
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
          "class": [bem$d("option"), className, HAPTICS_FEEDBACK],
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
        } = props;
        if (Array.isArray(options[0])) {
          return options.map((item, index2) => renderOptions(item, index2 !== 0));
        }
        return renderOptions(options);
      };
      var renderCancelButton = () => {
        var _props$cancelText;
        var cancelText = (_props$cancelText = props.cancelText) != null ? _props$cancelText : t$2("cancel");
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
      }, pick(props, popupInheritKeys)), {
        default: () => [renderHeader(), renderRows(), renderCancelButton()]
      });
    }
  });
  var ShareSheet = withInstall(_ShareSheet);
  var [name$c, bem$c] = createNamespace("sidebar");
  var SIDEBAR_KEY = Symbol(name$c);
  var sidebarProps = {
    modelValue: makeNumericProp(0)
  };
  var _Sidebar = vue.defineComponent({
    name: name$c,
    props: sidebarProps,
    emits: ["change", "update:modelValue"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var {
        linkChildren
      } = useChildren(SIDEBAR_KEY);
      var getActive = () => +props.modelValue;
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
        "role": "tablist",
        "class": bem$c()
      }, [slots.default == null ? void 0 : slots.default()]);
    }
  });
  var Sidebar = withInstall(_Sidebar);
  var [name$b, bem$b] = createNamespace("sidebar-item");
  var sidebarItemProps = extend({}, routeProps, {
    dot: Boolean,
    title: String,
    badge: numericProp,
    disabled: Boolean
  });
  var _SidebarItem = vue.defineComponent({
    name: name$b,
    props: sidebarItemProps,
    emits: ["click"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var route2 = useRoute();
      var {
        parent,
        index: index2
      } = useParent(SIDEBAR_KEY);
      if (!parent) {
        return;
      }
      var onClick = () => {
        if (props.disabled) {
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
        } = props;
        var selected = index2.value === parent.getActive();
        return vue.createVNode("div", {
          "role": "tab",
          "class": bem$b({
            select: selected,
            disabled
          }),
          "tabindex": disabled ? void 0 : 0,
          "aria-selected": selected,
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
  var skeletonProps = {
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
  };
  var _Skeleton = vue.defineComponent({
    name: name$a,
    props: skeletonProps,
    setup(props, _ref) {
      var {
        slots
      } = _ref;
      var renderAvatar = () => {
        if (props.avatar) {
          return vue.createVNode("div", {
            "class": bem$a("avatar", props.avatarShape),
            "style": getSizeStyle(props.avatarSize)
          }, null);
        }
      };
      var renderTitle = () => {
        if (props.title) {
          return vue.createVNode("h3", {
            "class": bem$a("title"),
            "style": {
              width: addUnit(props.titleWidth)
            }
          }, null);
        }
      };
      var getRowWidth = (index2) => {
        var {
          rowWidth
        } = props;
        if (rowWidth === DEFAULT_ROW_WIDTH && index2 === +props.row - 1) {
          return DEFAULT_LAST_ROW_WIDTH;
        }
        if (Array.isArray(rowWidth)) {
          return rowWidth[index2];
        }
        return rowWidth;
      };
      var renderRows = () => Array(props.row).fill("").map((_, i) => vue.createVNode("div", {
        "class": bem$a("row"),
        "style": {
          width: addUnit(getRowWidth(i))
        }
      }, null));
      return () => {
        if (!props.loading) {
          return slots.default == null ? void 0 : slots.default();
        }
        return vue.createVNode("div", {
          "class": bem$a({
            animate: props.animate,
            round: props.round
          })
        }, [renderAvatar(), vue.createVNode("div", {
          "class": bem$a("content")
        }, [renderTitle(), renderRows()])]);
      };
    }
  });
  var Skeleton = withInstall(_Skeleton);
  var [name$9, bem$9] = createNamespace("slider");
  var sliderProps = {
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
  };
  var _Slider = vue.defineComponent({
    name: name$9,
    props: sliderProps,
    emits: ["change", "drag-end", "drag-start", "update:modelValue"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var buttonIndex;
      var current2;
      var startValue;
      var root = vue.ref();
      var dragStatus = vue.ref();
      var touch = useTouch();
      var scope = vue.computed(() => Number(props.max) - Number(props.min));
      var wrapperStyle = vue.computed(() => {
        var crossAxis = props.vertical ? "width" : "height";
        return {
          background: props.inactiveColor,
          [crossAxis]: addUnit(props.barHeight)
        };
      });
      var isRange = (val) => props.range && Array.isArray(val);
      var calcMainAxis = () => {
        var {
          modelValue,
          min
        } = props;
        if (isRange(modelValue)) {
          return (modelValue[1] - modelValue[0]) * 100 / scope.value + "%";
        }
        return (modelValue - Number(min)) * 100 / scope.value + "%";
      };
      var calcOffset = () => {
        var {
          modelValue,
          min
        } = props;
        if (isRange(modelValue)) {
          return (modelValue[0] - Number(min)) * 100 / scope.value + "%";
        }
        return "0%";
      };
      var barStyle = vue.computed(() => {
        var mainAxis = props.vertical ? "height" : "width";
        var style = {
          [mainAxis]: calcMainAxis(),
          background: props.activeColor
        };
        if (dragStatus.value) {
          style.transition = "none";
        }
        var getPositionKey = () => {
          if (props.vertical) {
            return props.reverse ? "bottom" : "top";
          }
          return props.reverse ? "right" : "left";
        };
        style[getPositionKey()] = calcOffset();
        return style;
      });
      var format2 = (value) => {
        var min = +props.min;
        var max = +props.max;
        var step = +props.step;
        value = clamp(value, min, max);
        var diff = Math.round((value - min) / step) * step;
        return addNumber(min, diff);
      };
      var isSameValue = (newValue, oldValue) => JSON.stringify(newValue) === JSON.stringify(oldValue);
      var handleRangeValue = (value) => {
        var _value$, _value$2;
        var left2 = (_value$ = value[0]) != null ? _value$ : Number(props.min);
        var right2 = (_value$2 = value[1]) != null ? _value$2 : Number(props.max);
        return left2 > right2 ? [right2, left2] : [left2, right2];
      };
      var updateValue = (value, end2) => {
        if (isRange(value)) {
          value = handleRangeValue(value).map(format2);
        } else {
          value = format2(value);
        }
        if (!isSameValue(value, props.modelValue)) {
          emit("update:modelValue", value);
        }
        if (end2 && !isSameValue(value, startValue)) {
          emit("change", value);
        }
      };
      var onClick = (event) => {
        event.stopPropagation();
        if (props.disabled || props.readonly) {
          return;
        }
        var {
          min,
          reverse,
          vertical,
          modelValue
        } = props;
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
        if (props.disabled || props.readonly) {
          return;
        }
        touch.start(event);
        current2 = props.modelValue;
        if (isRange(current2)) {
          startValue = current2.map(format2);
        } else {
          startValue = format2(current2);
        }
        dragStatus.value = "start";
      };
      var onTouchMove = (event) => {
        if (props.disabled || props.readonly) {
          return;
        }
        if (dragStatus.value === "start") {
          emit("drag-start", event);
        }
        preventDefault(event, true);
        touch.move(event);
        dragStatus.value = "dragging";
        var rect = useRect(root);
        var delta = props.vertical ? touch.deltaY.value : touch.deltaX.value;
        var total = props.vertical ? rect.height : rect.width;
        var diff = delta / total * scope.value;
        if (props.reverse) {
          diff = -diff;
        }
        if (isRange(startValue)) {
          var index2 = props.reverse ? 1 - buttonIndex : buttonIndex;
          current2[index2] = startValue[index2] + diff;
        } else {
          current2 = startValue + diff;
        }
        updateValue(current2);
      };
      var onTouchEnd = (event) => {
        if (props.disabled || props.readonly) {
          return;
        }
        if (dragStatus.value === "dragging") {
          updateValue(current2, true);
          emit("drag-end", event);
        }
        dragStatus.value = "";
      };
      var getButtonClassName = (index2) => {
        if (typeof index2 === "number") {
          var position = ["left", "right"];
          return bem$9("button-wrapper", position[index2]);
        }
        return bem$9("button-wrapper", props.reverse ? "left" : "right");
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
          "style": getSizeStyle(props.buttonSize)
        }, null);
      };
      var renderButton = (index2) => {
        var current3 = typeof index2 === "number" ? props.modelValue[index2] : props.modelValue;
        return vue.createVNode("div", {
          "role": "slider",
          "class": getButtonClassName(index2),
          "tabindex": props.disabled ? void 0 : 0,
          "aria-valuemin": props.min,
          "aria-valuenow": current3,
          "aria-valuemax": props.max,
          "aria-disabled": props.disabled || void 0,
          "aria-readonly": props.readonly || void 0,
          "aria-orientation": props.vertical ? "vertical" : "horizontal",
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
        }, [renderButtonContent(current3, index2)]);
      };
      updateValue(props.modelValue);
      useCustomFieldValue(() => props.modelValue);
      return () => vue.createVNode("div", {
        "ref": root,
        "style": wrapperStyle.value,
        "class": bem$9({
          vertical: props.vertical,
          disabled: props.disabled
        }),
        "onClick": onClick
      }, [vue.createVNode("div", {
        "class": bem$9("bar"),
        "style": barStyle.value
      }, [props.range ? [renderButton(0), renderButton(1)] : renderButton()])]);
    }
  });
  var Slider = withInstall(_Slider);
  var [name$8, bem$8] = createNamespace("steps");
  var stepsProps = {
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
    props: stepsProps,
    emits: ["click-step"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var {
        linkChildren
      } = useChildren(STEPS_KEY);
      var onClickStep = (index2) => emit("click-step", index2);
      linkChildren({
        props,
        onClickStep
      });
      return () => vue.createVNode("div", {
        "class": bem$8([props.direction])
      }, [vue.createVNode("div", {
        "class": bem$8("items")
      }, [slots.default == null ? void 0 : slots.default()])]);
    }
  });
  var [name$7, bem$7] = createNamespace("step");
  var _Step = vue.defineComponent({
    name: name$7,
    setup(props, _ref) {
      var {
        slots
      } = _ref;
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
  var stepperProps = {
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
  };
  var _Stepper = vue.defineComponent({
    name: name$6,
    props: stepperProps,
    emits: ["plus", "blur", "minus", "focus", "change", "overlimit", "update:modelValue"],
    setup(props, _ref) {
      var {
        emit
      } = _ref;
      var format2 = (value) => {
        var {
          min,
          max,
          allowEmpty,
          decimalLength
        } = props;
        if (allowEmpty && value === "") {
          return value;
        }
        value = formatNumber(String(value), !props.integer);
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
        var defaultValue = (_props$modelValue = props.modelValue) != null ? _props$modelValue : props.defaultValue;
        var value = format2(defaultValue);
        if (!isEqual(value, props.modelValue)) {
          emit("update:modelValue", value);
        }
        return value;
      };
      var actionType;
      var inputRef = vue.ref();
      var current2 = vue.ref(getInitialValue());
      var minusDisabled = vue.computed(() => props.disabled || props.disableMinus || current2.value <= +props.min);
      var plusDisabled = vue.computed(() => props.disabled || props.disablePlus || current2.value >= +props.max);
      var inputStyle = vue.computed(() => ({
        width: addUnit(props.inputWidth),
        height: addUnit(props.buttonSize)
      }));
      var buttonStyle = vue.computed(() => getSizeStyle(props.buttonSize));
      var check = () => {
        var value = format2(current2.value);
        if (!isEqual(value, current2.value)) {
          current2.value = value;
        }
      };
      var setValue = (value) => {
        if (props.beforeChange) {
          callInterceptor(props.beforeChange, {
            args: [value],
            done() {
              current2.value = value;
            }
          });
        } else {
          current2.value = value;
        }
      };
      var onChange = () => {
        if (actionType === "plus" && plusDisabled.value || actionType === "minus" && minusDisabled.value) {
          emit("overlimit", actionType);
          return;
        }
        var diff = actionType === "minus" ? -props.step : +props.step;
        var value = format2(addNumber(+current2.value, diff));
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
        } = props;
        var formatted = formatNumber(String(value), !props.integer);
        if (isDef(decimalLength) && formatted.includes(".")) {
          var pair = formatted.split(".");
          formatted = pair[0] + "." + pair[1].slice(0, +decimalLength);
        }
        if (props.beforeChange) {
          input.value = String(current2.value);
        } else if (!isEqual(value, formatted)) {
          input.value = formatted;
        }
        var isNumeric2 = formatted === String(+formatted);
        setValue(isNumeric2 ? +formatted : formatted);
      };
      var onFocus = (event) => {
        if (props.disableInput) {
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
        current2.value = value;
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
        if (props.longPress) {
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
        if (props.longPress) {
          clearTimeout(longPressTimer);
          if (isLongPress) {
            preventDefault(event);
          }
        }
      };
      var onMousedown = (event) => {
        if (props.disableInput) {
          preventDefault(event);
        }
      };
      var createListeners = (type) => ({
        onClick: (event) => {
          preventDefault(event);
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
      vue.watch(() => [props.max, props.min, props.integer, props.decimalLength], check);
      vue.watch(() => props.modelValue, (value) => {
        if (!isEqual(value, current2.value)) {
          current2.value = format2(value);
        }
      });
      vue.watch(current2, (value) => {
        emit("update:modelValue", value);
        emit("change", value, {
          name: props.name
        });
      });
      useCustomFieldValue(() => props.modelValue);
      return () => vue.createVNode("div", {
        "role": "group",
        "class": bem$6([props.theme])
      }, [vue.withDirectives(vue.createVNode("button", vue.mergeProps({
        "type": "button",
        "style": buttonStyle.value,
        "class": [bem$6("minus", {
          disabled: minusDisabled.value
        }), {
          [HAPTICS_FEEDBACK]: !minusDisabled.value
        }],
        "aria-disabled": minusDisabled.value || void 0
      }, createListeners("minus")), null), [[vue.vShow, props.showMinus]]), vue.withDirectives(vue.createVNode("input", {
        "ref": inputRef,
        "type": props.integer ? "tel" : "text",
        "role": "spinbutton",
        "class": bem$6("input"),
        "value": current2.value,
        "style": inputStyle.value,
        "disabled": props.disabled,
        "readonly": props.disableInput,
        "inputmode": props.integer ? "numeric" : "decimal",
        "placeholder": props.placeholder,
        "aria-valuemax": props.max,
        "aria-valuemin": props.min,
        "aria-valuenow": current2.value,
        "onBlur": onBlur,
        "onInput": onInput,
        "onFocus": onFocus,
        "onMousedown": onMousedown
      }, null), [[vue.vShow, props.showInput]]), vue.withDirectives(vue.createVNode("button", vue.mergeProps({
        "type": "button",
        "style": buttonStyle.value,
        "class": [bem$6("plus", {
          disabled: plusDisabled.value
        }), {
          [HAPTICS_FEEDBACK]: !plusDisabled.value
        }],
        "aria-disabled": plusDisabled.value || void 0
      }, createListeners("plus")), null), [[vue.vShow, props.showPlus]])]);
    }
  });
  var Stepper = withInstall(_Stepper);
  var Steps = withInstall(_Steps);
  var [name$5, bem$5, t$1] = createNamespace("submit-bar");
  var submitBarProps = {
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
  };
  var _SubmitBar = vue.defineComponent({
    name: name$5,
    props: submitBarProps,
    emits: ["submit"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var renderText = () => {
        var {
          price,
          label,
          currency,
          textAlign,
          suffixLabel,
          decimalLength
        } = props;
        if (typeof price === "number") {
          var pricePair = (price / 100).toFixed(+decimalLength).split(".");
          var decimal = decimalLength ? "." + pricePair[1] : "";
          return vue.createVNode("div", {
            "class": bem$5("text"),
            "style": {
              textAlign
            }
          }, [vue.createVNode("span", null, [label || t$1("label")]), vue.createVNode("span", {
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
        } = props;
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
          "type": props.buttonType,
          "text": props.buttonText,
          "class": bem$5("button", props.buttonType),
          "color": props.buttonColor,
          "loading": props.loading,
          "disabled": props.disabled,
          "onClick": onClickButton
        }, null);
      };
      return () => vue.createVNode("div", {
        "class": [bem$5(), {
          "van-safe-area-bottom": props.safeAreaInsetBottom
        }]
      }, [slots.top == null ? void 0 : slots.top(), renderTip(), vue.createVNode("div", {
        "class": bem$5("bar")
      }, [slots.default == null ? void 0 : slots.default(), renderText(), renderButton()])]);
    }
  });
  var SubmitBar = withInstall(_SubmitBar);
  var [name$4, bem$4] = createNamespace("swipe-cell");
  var swipeCellProps = {
    name: makeNumericProp(""),
    disabled: Boolean,
    leftWidth: numericProp,
    rightWidth: numericProp,
    beforeClose: Function,
    stopPropagation: Boolean
  };
  var _SwipeCell = vue.defineComponent({
    name: name$4,
    props: swipeCellProps,
    emits: ["open", "close", "click"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
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
      var leftWidth = vue.computed(() => isDef(props.leftWidth) ? +props.leftWidth : getWidthByRef(leftRef));
      var rightWidth = vue.computed(() => isDef(props.rightWidth) ? +props.rightWidth : getWidthByRef(rightRef));
      var open = (side) => {
        opened = true;
        state.offset = side === "left" ? leftWidth.value : -rightWidth.value;
        emit("open", {
          name: props.name,
          position: side
        });
      };
      var close = (position) => {
        state.offset = 0;
        if (opened) {
          opened = false;
          emit("close", {
            name: props.name,
            position
          });
        }
      };
      var toggle = (side) => {
        var offset2 = Math.abs(state.offset);
        var THRESHOLD = 0.15;
        var threshold = opened ? 1 - THRESHOLD : THRESHOLD;
        var width2 = side === "left" ? leftWidth.value : rightWidth.value;
        if (width2 && offset2 > width2 * threshold) {
          open(side);
        } else {
          close(side);
        }
      };
      var onTouchStart = (event) => {
        if (!props.disabled) {
          startOffset = state.offset;
          touch.start(event);
        }
      };
      var onTouchMove = (event) => {
        if (props.disabled) {
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
            preventDefault(event, props.stopPropagation);
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
      var onClick = function(position) {
        if (position === void 0) {
          position = "outside";
        }
        emit("click", position);
        if (opened && !lockClick2) {
          callInterceptor(props.beforeClose, {
            args: [{
              name: props.name,
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
  var tabbarProps = {
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
    props: tabbarProps,
    emits: ["change", "update:modelValue"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var root = vue.ref();
      var {
        linkChildren
      } = useChildren(TABBAR_KEY);
      var renderPlaceholder = usePlaceholder(root, bem$3);
      var enableSafeArea = () => {
        var _props$safeAreaInsetB;
        return (_props$safeAreaInsetB = props.safeAreaInsetBottom) != null ? _props$safeAreaInsetB : props.fixed;
      };
      var renderTabbar = () => {
        var {
          fixed,
          zIndex,
          border
        } = props;
        return vue.createVNode("div", {
          "ref": root,
          "role": "tablist",
          "style": getZIndexStyle(zIndex),
          "class": [bem$3({
            fixed
          }), {
            [BORDER_TOP_BOTTOM]: border,
            "van-safe-area-bottom": enableSafeArea()
          }]
        }, [slots.default == null ? void 0 : slots.default()]);
      };
      var setActive = (active, afterChange) => {
        callInterceptor(props.beforeChange, {
          args: [active],
          done() {
            emit("update:modelValue", active);
            emit("change", active);
            afterChange();
          }
        });
      };
      linkChildren({
        props,
        setActive
      });
      return () => {
        if (props.fixed && props.placeholder) {
          return renderPlaceholder(renderTabbar);
        }
        return renderTabbar();
      };
    }
  });
  var Tabbar = withInstall(_Tabbar);
  var [name$2, bem$2] = createNamespace("tabbar-item");
  var tabbarItemProps = extend({}, routeProps, {
    dot: Boolean,
    icon: String,
    name: numericProp,
    badge: numericProp,
    iconPrefix: String
  });
  var _TabbarItem = vue.defineComponent({
    name: name$2,
    props: tabbarItemProps,
    emits: ["click"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
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
        var _props$name;
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
          } = props;
          var config = isObject(to) ? to : {
            path: to
          };
          return !!$route.matched.find((val) => {
            var pathMatched = "path" in config && config.path === val.path;
            var nameMatched = "name" in config && config.name === val.name;
            return pathMatched || nameMatched;
          });
        }
        return ((_props$name = props.name) != null ? _props$name : index2.value) === modelValue;
      });
      var onClick = (event) => {
        if (!active.value) {
          var _props$name2;
          parent.setActive((_props$name2 = props.name) != null ? _props$name2 : index2.value, route2);
        }
        emit("click", event);
      };
      var renderIcon = () => {
        if (slots.icon) {
          return slots.icon({
            active: active.value
          });
        }
        if (props.icon) {
          return vue.createVNode(Icon, {
            "name": props.icon,
            "classPrefix": props.iconPrefix
          }, null);
        }
      };
      return () => {
        var {
          dot,
          badge
        } = props;
        var {
          activeColor,
          inactiveColor
        } = parent.props;
        var color = active.value ? activeColor : inactiveColor;
        return vue.createVNode("div", {
          "role": "tab",
          "class": bem$2({
            active: active.value
          }),
          "style": {
            color
          },
          "tabindex": 0,
          "aria-selected": active.value,
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
  var treeSelectProps = {
    max: makeNumericProp(Infinity),
    items: makeArrayProp(),
    height: makeNumericProp(300),
    selectedIcon: makeStringProp("success"),
    mainActiveIndex: makeNumericProp(0),
    activeId: {
      type: [Number, String, Array],
      default: 0
    }
  };
  var _TreeSelect = vue.defineComponent({
    name: name$1,
    props: treeSelectProps,
    emits: ["click-nav", "click-item", "update:activeId", "update:mainActiveIndex"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var isActiveItem = (id) => Array.isArray(props.activeId) ? props.activeId.includes(id) : props.activeId === id;
      var renderSubItem = (item) => {
        var onClick = () => {
          if (item.disabled) {
            return;
          }
          var activeId;
          if (Array.isArray(props.activeId)) {
            activeId = props.activeId.slice();
            var index2 = activeId.indexOf(item.id);
            if (index2 !== -1) {
              activeId.splice(index2, 1);
            } else if (activeId.length < props.max) {
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
          "name": props.selectedIcon,
          "class": bem$1("selected")
        }, null)]);
      };
      var onSidebarChange = (index2) => {
        emit("update:mainActiveIndex", index2);
        emit("click-nav", index2);
      };
      var renderSidebar = () => {
        var Items = props.items.map((item) => vue.createVNode(SidebarItem, {
          "dot": item.dot,
          "title": item.text,
          "badge": item.badge,
          "class": [bem$1("nav-item"), item.className],
          "disabled": item.disabled
        }, null));
        return vue.createVNode(Sidebar, {
          "class": bem$1("nav"),
          "modelValue": props.mainActiveIndex,
          "onChange": onSidebarChange
        }, {
          default: () => [Items]
        });
      };
      var renderContent = () => {
        if (slots.content) {
          return slots.content();
        }
        var selected = props.items[+props.mainActiveIndex] || {};
        if (selected.children) {
          return selected.children.map(renderSubItem);
        }
      };
      return () => vue.createVNode("div", {
        "class": bem$1(),
        "style": {
          height: addUnit(props.height)
        }
      }, [renderSidebar(), vue.createVNode("div", {
        "class": bem$1("content")
      }, [renderContent()])]);
    }
  });
  var TreeSelect = withInstall(_TreeSelect);
  var [name, bem, t] = createNamespace("uploader");
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
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var renderMask = () => {
        var {
          status,
          message
        } = props.item;
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
        } = props;
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
        if (props.deletable && props.item.status !== "uploading") {
          return vue.createVNode("div", {
            "role": "button",
            "class": bem("preview-delete"),
            "tabindex": 0,
            "aria-label": t("delete"),
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
          } = props;
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
        } = props;
        if (isImageFile(item)) {
          return vue.createVNode(Image$1, {
            "fit": props.imageFit,
            "src": item.content || item.url,
            "class": bem("preview-image"),
            "width": props.previewSize,
            "height": props.previewSize,
            "lazyLoad": props.lazyLoad,
            "onClick": onPreview
          }, {
            default: renderCover
          });
        }
        return vue.createVNode("div", {
          "class": bem("file"),
          "style": getSizeStyle(props.previewSize)
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
  var uploaderProps = {
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
    props: uploaderProps,
    emits: ["delete", "oversize", "click-upload", "close-preview", "click-preview", "update:modelValue"],
    setup(props, _ref) {
      var {
        emit,
        slots
      } = _ref;
      var inputRef = vue.ref();
      var getDetail = function(index2) {
        if (index2 === void 0) {
          index2 = props.modelValue.length;
        }
        return {
          name: props.name,
          index: index2
        };
      };
      var resetInput = () => {
        if (inputRef.value) {
          inputRef.value.value = "";
        }
      };
      var onAfterRead = (items) => {
        resetInput();
        if (isOversize(items, props.maxSize)) {
          if (Array.isArray(items)) {
            var result = filterFiles(items, props.maxSize);
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
        emit("update:modelValue", [...props.modelValue, ...toArray(items)]);
        if (props.afterRead) {
          props.afterRead(items, getDetail());
        }
      };
      var readFile = (files) => {
        var {
          maxCount,
          modelValue,
          resultType
        } = props;
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
        if (props.disabled || !files || !files.length) {
          return;
        }
        var file = files.length === 1 ? files[0] : [].slice.call(files);
        if (props.beforeRead) {
          var response = props.beforeRead(file, getDetail());
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
        if (props.previewFullImage) {
          var imageFiles = props.modelValue.filter(isImageFile);
          var images = imageFiles.map((item2) => item2.content || item2.url).filter(Boolean);
          imagePreview = ImagePreview(extend({
            images,
            startPosition: imageFiles.indexOf(item),
            onClose: onClosePreview
          }, props.previewOptions));
        }
      };
      var closeImagePreview = () => {
        if (imagePreview) {
          imagePreview.close();
        }
      };
      var deleteFile = (item, index2) => {
        var fileList = props.modelValue.slice(0);
        fileList.splice(index2, 1);
        emit("update:modelValue", fileList);
        emit("delete", item, getDetail(index2));
      };
      var renderPreviewItem = (item, index2) => {
        var needPickData = ["imageFit", "deletable", "previewSize", "beforeDelete"];
        var previewData = extend(pick(props, needPickData), pick(item, needPickData, true));
        return vue.createVNode(UploaderPreviewItem, vue.mergeProps({
          "item": item,
          "index": index2,
          "onClick": () => emit("click-preview", item, getDetail(index2)),
          "onDelete": () => deleteFile(item, index2),
          "onPreview": () => previewImage(item)
        }, pick(props, ["name", "lazyLoad"]), previewData), {
          "preview-cover": slots["preview-cover"]
        });
      };
      var renderPreviewList = () => {
        if (props.previewImage) {
          return props.modelValue.map(renderPreviewItem);
        }
      };
      var onClickUpload = (event) => emit("click-upload", event);
      var renderUpload = () => {
        if (props.modelValue.length >= props.maxCount || !props.showUpload) {
          return;
        }
        var Input = props.readonly ? null : vue.createVNode("input", {
          "ref": inputRef,
          "type": "file",
          "class": bem("input"),
          "accept": props.accept,
          "capture": props.capture,
          "multiple": props.multiple,
          "disabled": props.disabled,
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
            readonly: props.readonly
          }),
          "style": getSizeStyle(props.previewSize),
          "onClick": onClickUpload
        }, [vue.createVNode(Icon, {
          "name": props.uploadIcon,
          "class": bem("upload-icon")
        }, null), props.uploadText && vue.createVNode("span", {
          "class": bem("upload-text")
        }, [props.uploadText]), Input]);
      };
      var chooseFile = () => {
        if (inputRef.value && !props.disabled) {
          inputRef.value.click();
        }
      };
      useExpose({
        chooseFile,
        closeImagePreview
      });
      useCustomFieldValue(() => props.modelValue);
      return () => vue.createVNode("div", {
        "class": bem()
      }, [vue.createVNode("div", {
        "class": bem("wrapper", {
          disabled: props.disabled
        })
      }, [renderPreviewList(), renderUpload()])]);
    }
  });
  var Uploader = withInstall(_Uploader);
  var version = "3.3.2";
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
