(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue")) : typeof define === "function" && define.amd ? define(["exports", "vue"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.vant = {}, global.Vue));
})(this, function(exports2, vue) {
  "use strict";
  const isDef = (val) => val !== void 0 && val !== null;
  const isFunction = (val) => typeof val === "function";
  const isObject = (val) => val !== null && typeof val === "object";
  const isPromise = (val) => isObject(val) && isFunction(val.then) && isFunction(val.catch);
  const isDate = (val) => Object.prototype.toString.call(val) === "[object Date]" && !Number.isNaN(val.getTime());
  function isMobile(value) {
    value = value.replace(/[^-|\d]/g, "");
    return /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value);
  }
  const isNumeric = (val) => typeof val === "number" || /^\d+(\.\d+)?$/.test(val);
  const isIOS$1 = () => inBrowser$1 ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : false;
  function noop() {
  }
  const extend = Object.assign;
  const inBrowser$1 = typeof window !== "undefined";
  function get(object, path) {
    const keys = path.split(".");
    let result = object;
    keys.forEach((key) => {
      var _a;
      result = isObject(result) ? (_a = result[key]) != null ? _a : "" : "";
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
  const toArray = (item) => Array.isArray(item) ? item : [item];
  const unknownProp = null;
  const numericProp = [Number, String];
  const truthProp = {
    type: Boolean,
    default: true
  };
  const makeRequiredProp = (type) => ({
    type,
    required: true
  });
  const makeArrayProp = () => ({
    type: Array,
    default: () => []
  });
  const makeNumberProp = (defaultVal) => ({
    type: Number,
    default: defaultVal
  });
  const makeNumericProp = (defaultVal) => ({
    type: numericProp,
    default: defaultVal
  });
  const makeStringProp = (defaultVal) => ({
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
  var isWindow = (val) => val === window;
  var makeDOMRect = (width2, height2) => ({
    top: 0,
    left: 0,
    right: width2,
    bottom: height2,
    width: width2,
    height: height2
  });
  var useRect = (elementOrRef) => {
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
      const index = vue.computed(() => internalChildren.indexOf(instance2));
      return {
        parent,
        index
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
              result.push(child.component.subTree);
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
    internalChildren.sort(
      (a, b) => vnodes.indexOf(a.vnode) - vnodes.indexOf(b.vnode)
    );
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
        const index = internalChildren.indexOf(child);
        publicChildren.splice(index, 1);
        internalChildren.splice(index, 1);
      };
      vue.provide(
        key,
        Object.assign(
          {
            link,
            unlink,
            children: publicChildren,
            internalChildren
          },
          value
        )
      );
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
        element.addEventListener(type, listener, {
          capture,
          passive: passive2
        });
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
      const targets = Array.isArray(target) ? target : [target];
      const isClickAway = targets.every((item) => {
        const element = vue.unref(item);
        return element && !element.contains(event.target);
      });
      if (isClickAway) {
        listener(event);
      }
    };
    useEventListener(eventName, onClick, { target: document });
  }
  var width;
  var height;
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
  var overflowScrollReg = /scroll|auto|overlay/i;
  var defaultRoot = inBrowser ? window : void 0;
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
  var visibility;
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
  var CUSTOM_FIELD_INJECTION_KEY = Symbol("van-field");
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
  function getScrollTop(el) {
    const top2 = "scrollTop" in el ? el.scrollTop : el.pageYOffset;
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
    const scrollTop = scroller ? getScrollTop(scroller) : getRootScrollTop();
    return useRect(el).top + scrollTop;
  }
  const isIOS = isIOS$1();
  function resetScroll() {
    if (isIOS) {
      setRootScrollTop(getRootScrollTop());
    }
  }
  const stopPropagation = (event) => event.stopPropagation();
  function preventDefault(event, isStopPropagation) {
    if (typeof event.cancelable !== "boolean" || event.cancelable) {
      event.preventDefault();
    }
    if (isStopPropagation) {
      stopPropagation(event);
    }
  }
  function isHidden(elementRef) {
    const el = vue.unref(elementRef);
    if (!el) {
      return false;
    }
    const style = window.getComputedStyle(el);
    const hidden = style.display === "none";
    const parentHidden = el.offsetParent === null && style.position !== "fixed";
    return hidden || parentHidden;
  }
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  function addUnit(value) {
    if (isDef(value)) {
      return isNumeric(value) ? `${value}px` : String(value);
    }
    return void 0;
  }
  function getSizeStyle(originSize) {
    if (isDef(originSize)) {
      if (Array.isArray(originSize)) {
        return {
          width: addUnit(originSize[0]),
          height: addUnit(originSize[1])
        };
      }
      const size = addUnit(originSize);
      return {
        width: size,
        height: size
      };
    }
  }
  function getZIndexStyle(zIndex) {
    const style = {};
    if (zIndex !== void 0) {
      style.zIndex = +zIndex;
    }
    return style;
  }
  let rootFontSize;
  function getRootFontSize() {
    if (!rootFontSize) {
      const doc = document.documentElement;
      const fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize;
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
  const camelizeRE = /-(\w)/g;
  const camelize = (str) => str.replace(camelizeRE, (_, c) => c.toUpperCase());
  const kebabCase = (str) => str.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "");
  function padZero(num, targetLength = 2) {
    let str = num + "";
    while (str.length < targetLength) {
      str = "0" + str;
    }
    return str;
  }
  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
  function trimExtraChar(value, char, regExp) {
    const index = value.indexOf(char);
    if (index === -1) {
      return value;
    }
    if (char === "-" && index !== 0) {
      return value.slice(0, index);
    }
    return value.slice(0, index + 1) + value.slice(index).replace(regExp, "");
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
    const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;
    return value.replace(regExp, "");
  }
  function addNumber(num1, num2) {
    const cardinal = 10 ** 10;
    return Math.round((num1 + num2) * cardinal) / cardinal;
  }
  const { hasOwnProperty } = Object.prototype;
  function assignKey(to, from, key) {
    const val = from[key];
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
  var stdin_default$1E = {
    name: "\u59D3\u540D",
    tel: "\u7535\u8BDD",
    save: "\u4FDD\u5B58",
    confirm: "\u786E\u8BA4",
    cancel: "\u53D6\u6D88",
    delete: "\u5220\u9664",
    loading: "\u52A0\u8F7D\u4E2D...",
    noCoupon: "\u6682\u65E0\u4F18\u60E0\u5238",
    nameEmpty: "\u8BF7\u586B\u5199\u59D3\u540D",
    addContact: "\u6DFB\u52A0\u8054\u7CFB\u4EBA",
    telInvalid: "\u8BF7\u586B\u5199\u6B63\u786E\u7684\u7535\u8BDD",
    vanCalendar: {
      end: "\u7ED3\u675F",
      start: "\u5F00\u59CB",
      title: "\u65E5\u671F\u9009\u62E9",
      weekdays: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"],
      monthTitle: (year, month) => `${year}\u5E74${month}\u6708`,
      rangePrompt: (maxRange) => `\u6700\u591A\u9009\u62E9 ${maxRange} \u5929`
    },
    vanCascader: {
      select: "\u8BF7\u9009\u62E9"
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
      label: "\u5408\u8BA1:"
    },
    vanCoupon: {
      unlimited: "\u65E0\u95E8\u69DB",
      discount: (discount) => `${discount}\u6298`,
      condition: (condition) => `\u6EE1${condition}\u5143\u53EF\u7528`
    },
    vanCouponCell: {
      title: "\u4F18\u60E0\u5238",
      count: (count) => `${count}\u5F20\u53EF\u7528`
    },
    vanCouponList: {
      exchange: "\u5151\u6362",
      close: "\u4E0D\u4F7F\u7528",
      enable: "\u53EF\u7528",
      disabled: "\u4E0D\u53EF\u7528",
      placeholder: "\u8F93\u5165\u4F18\u60E0\u7801"
    },
    vanAddressEdit: {
      area: "\u5730\u533A",
      postal: "\u90AE\u653F\u7F16\u7801",
      areaEmpty: "\u8BF7\u9009\u62E9\u5730\u533A",
      addressEmpty: "\u8BF7\u586B\u5199\u8BE6\u7EC6\u5730\u5740",
      postalEmpty: "\u90AE\u653F\u7F16\u7801\u4E0D\u6B63\u786E",
      addressDetail: "\u8BE6\u7EC6\u5730\u5740",
      defaultAddress: "\u8BBE\u4E3A\u9ED8\u8BA4\u6536\u8D27\u5730\u5740"
    },
    vanAddressList: {
      add: "\u65B0\u589E\u5730\u5740"
    }
  };
  const lang = vue.ref("zh-CN");
  const messages = vue.reactive({
    "zh-CN": stdin_default$1E
  });
  const Locale = {
    messages() {
      return messages[lang.value];
    },
    use(newLang, newMessages) {
      lang.value = newLang;
      this.add({ [newLang]: newMessages });
    },
    add(newMessages = {}) {
      deepAssign(messages, newMessages);
    }
  };
  var stdin_default$1D = Locale;
  function createTranslate(name2) {
    const prefix = camelize(name2) + ".";
    return (path, ...args) => {
      const messages2 = stdin_default$1D.messages();
      const message = get(messages2, prefix + path) || get(messages2, path);
      return isFunction(message) ? message(...args) : message;
    };
  }
  function genBem(name2, mods) {
    if (!mods) {
      return "";
    }
    if (typeof mods === "string") {
      return ` ${name2}--${mods}`;
    }
    if (Array.isArray(mods)) {
      return mods.reduce(
        (ret, item) => ret + genBem(name2, item),
        ""
      );
    }
    return Object.keys(mods).reduce(
      (ret, key) => ret + (mods[key] ? genBem(name2, key) : ""),
      ""
    );
  }
  function createBEM(name2) {
    return (el, mods) => {
      if (el && typeof el !== "string") {
        mods = el;
        el = "";
      }
      el = el ? `${name2}__${el}` : name2;
      return `${el}${genBem(el, mods)}`;
    };
  }
  function createNamespace(name2) {
    const prefixedName = `van-${name2}`;
    return [
      prefixedName,
      createBEM(prefixedName),
      createTranslate(prefixedName)
    ];
  }
  const BORDER = "van-hairline";
  const BORDER_TOP = `${BORDER}--top`;
  const BORDER_LEFT = `${BORDER}--left`;
  const BORDER_BOTTOM = `${BORDER}--bottom`;
  const BORDER_SURROUND = `${BORDER}--surround`;
  const BORDER_TOP_BOTTOM = `${BORDER}--top-bottom`;
  const BORDER_UNSET_TOP_BOTTOM = `${BORDER}-unset--top-bottom`;
  const HAPTICS_FEEDBACK = "van-haptics-feedback";
  const FORM_KEY = Symbol("van-form");
  function callInterceptor(interceptor, {
    args = [],
    done,
    canceled
  }) {
    if (interceptor) {
      const returnVal = interceptor.apply(null, args);
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
      const { name: name2 } = options;
      if (name2) {
        app.component(name2, options);
        app.component(camelize(`-${name2}`), options);
      }
    };
    return options;
  }
  const POPUP_TOGGLE_KEY = Symbol();
  function onPopupReopen(callback) {
    const popupToggleStatus = vue.inject(POPUP_TOGGLE_KEY, null);
    if (popupToggleStatus) {
      vue.watch(popupToggleStatus, (show) => {
        if (show) {
          callback();
        }
      });
    }
  }
  const useHeight = (element, withSafeArea) => {
    const height2 = vue.ref();
    const setHeight = () => {
      height2.value = useRect(element).height;
    };
    vue.onMounted(() => {
      vue.nextTick(setHeight);
      if (withSafeArea) {
        for (let i = 1; i <= 3; i++) {
          setTimeout(setHeight, 100 * i);
        }
      }
    });
    onPopupReopen(() => vue.nextTick(setHeight));
    return height2;
  };
  function usePlaceholder(contentRef, bem2) {
    const height2 = useHeight(contentRef, true);
    return (renderContent) => vue.createVNode("div", {
      "class": bem2("placeholder"),
      "style": {
        height: height2.value ? `${height2.value}px` : void 0
      }
    }, [renderContent()]);
  }
  const [name$1v, bem$1r] = createNamespace("action-bar");
  const ACTION_BAR_KEY = Symbol(name$1v);
  const actionBarProps = {
    placeholder: Boolean,
    safeAreaInsetBottom: truthProp
  };
  var stdin_default$1C = vue.defineComponent({
    name: name$1v,
    props: actionBarProps,
    setup(props, {
      slots
    }) {
      const root = vue.ref();
      const renderPlaceholder = usePlaceholder(root, bem$1r);
      const {
        linkChildren
      } = useChildren(ACTION_BAR_KEY);
      linkChildren();
      const renderActionBar = () => {
        var _a;
        return vue.createVNode("div", {
          "ref": root,
          "class": [bem$1r(), {
            "van-safe-area-bottom": props.safeAreaInsetBottom
          }]
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
      };
      return () => {
        if (props.placeholder) {
          return renderPlaceholder(renderActionBar);
        }
        return renderActionBar();
      };
    }
  });
  const ActionBar = withInstall(stdin_default$1C);
  function useExpose(apis) {
    const instance2 = vue.getCurrentInstance();
    if (instance2) {
      extend(instance2.proxy, apis);
    }
  }
  const routeProps = {
    to: [String, Object],
    url: String,
    replace: Boolean
  };
  function route({
    to,
    url,
    replace,
    $router: router
  }) {
    if (to && router) {
      router[replace ? "replace" : "push"](to);
    } else if (url) {
      replace ? location.replace(url) : location.href = url;
    }
  }
  function useRoute() {
    const vm = vue.getCurrentInstance().proxy;
    return () => route(vm);
  }
  const [name$1u, bem$1q] = createNamespace("badge");
  const badgeProps = {
    dot: Boolean,
    max: numericProp,
    tag: makeStringProp("div"),
    color: String,
    offset: Array,
    content: numericProp,
    showZero: truthProp,
    position: makeStringProp("top-right")
  };
  var stdin_default$1B = vue.defineComponent({
    name: name$1u,
    props: badgeProps,
    setup(props, {
      slots
    }) {
      const hasContent = () => {
        if (slots.content) {
          return true;
        }
        const {
          content,
          showZero
        } = props;
        return isDef(content) && content !== "" && (showZero || content !== 0 && content !== "0");
      };
      const renderContent = () => {
        const {
          dot,
          max,
          content
        } = props;
        if (!dot && hasContent()) {
          if (slots.content) {
            return slots.content();
          }
          if (isDef(max) && isNumeric(content) && +content > max) {
            return `${max}+`;
          }
          return content;
        }
      };
      const style = vue.computed(() => {
        const style2 = {
          background: props.color
        };
        if (props.offset) {
          const [x, y] = props.offset;
          if (slots.default) {
            style2.top = addUnit(y);
            if (typeof x === "number") {
              style2.right = addUnit(-x);
            } else {
              style2.right = x.startsWith("-") ? x.replace("-", "") : `-${x}`;
            }
          } else {
            style2.marginTop = addUnit(y);
            style2.marginLeft = addUnit(x);
          }
        }
        return style2;
      });
      const renderBadge = () => {
        if (hasContent() || props.dot) {
          return vue.createVNode("div", {
            "class": bem$1q([props.position, {
              dot: props.dot,
              fixed: !!slots.default
            }]),
            "style": style.value
          }, [renderContent()]);
        }
      };
      return () => {
        if (slots.default) {
          const {
            tag
          } = props;
          return vue.createVNode(tag, {
            "class": bem$1q("wrapper")
          }, {
            default: () => [slots.default(), renderBadge()]
          });
        }
        return renderBadge();
      };
    }
  });
  const Badge = withInstall(stdin_default$1B);
  let globalZIndex = 2e3;
  const useGlobalZIndex = () => ++globalZIndex;
  const setGlobalZIndex = (val) => {
    globalZIndex = val;
  };
  const [name$1t, bem$1p] = createNamespace("config-provider");
  const CONFIG_PROVIDER_KEY = Symbol(name$1t);
  const configProviderProps = {
    tag: makeStringProp("div"),
    zIndex: Number,
    themeVars: Object,
    iconPrefix: String
  };
  function mapThemeVarsToCSSVars(themeVars) {
    const cssVars = {};
    Object.keys(themeVars).forEach((key) => {
      cssVars[`--van-${kebabCase(key)}`] = themeVars[key];
    });
    return cssVars;
  }
  var stdin_default$1A = vue.defineComponent({
    name: name$1t,
    props: configProviderProps,
    setup(props, {
      slots
    }) {
      const style = vue.computed(() => {
        if (props.themeVars) {
          return mapThemeVarsToCSSVars(props.themeVars);
        }
      });
      vue.provide(CONFIG_PROVIDER_KEY, props);
      vue.watchEffect(() => {
        if (props.zIndex !== void 0) {
          setGlobalZIndex(props.zIndex);
        }
      });
      return () => vue.createVNode(props.tag, {
        "class": bem$1p(),
        "style": style.value
      }, {
        default: () => {
          var _a;
          return [(_a = slots.default) == null ? void 0 : _a.call(slots)];
        }
      });
    }
  });
  const [name$1s, bem$1o] = createNamespace("icon");
  const isImage = (name2) => name2 == null ? void 0 : name2.includes("/");
  const iconProps = {
    dot: Boolean,
    tag: makeStringProp("i"),
    name: String,
    size: numericProp,
    badge: numericProp,
    color: String,
    badgeProps: Object,
    classPrefix: String
  };
  var stdin_default$1z = vue.defineComponent({
    name: name$1s,
    props: iconProps,
    setup(props, {
      slots
    }) {
      const config = vue.inject(CONFIG_PROVIDER_KEY, null);
      const classPrefix = vue.computed(() => props.classPrefix || (config == null ? void 0 : config.iconPrefix) || bem$1o());
      return () => {
        const {
          tag,
          dot,
          name: name2,
          size,
          badge,
          color
        } = props;
        const isImageIcon = isImage(name2);
        return vue.createVNode(Badge, vue.mergeProps({
          "dot": dot,
          "tag": tag,
          "class": [classPrefix.value, isImageIcon ? "" : `${classPrefix.value}-${name2}`],
          "style": {
            color,
            fontSize: addUnit(size)
          },
          "content": badge
        }, props.badgeProps), {
          default: () => {
            var _a;
            return [(_a = slots.default) == null ? void 0 : _a.call(slots), isImageIcon && vue.createVNode("img", {
              "class": bem$1o("image"),
              "src": name2
            }, null)];
          }
        });
      };
    }
  });
  const Icon = withInstall(stdin_default$1z);
  const [name$1r, bem$1n] = createNamespace("loading");
  const SpinIcon = Array(12).fill(null).map((_, index) => vue.createVNode("i", {
    "class": bem$1n("line", String(index + 1))
  }, null));
  const CircularIcon = vue.createVNode("svg", {
    "class": bem$1n("circular"),
    "viewBox": "25 25 50 50"
  }, [vue.createVNode("circle", {
    "cx": "50",
    "cy": "50",
    "r": "20",
    "fill": "none"
  }, null)]);
  const loadingProps = {
    size: numericProp,
    type: makeStringProp("circular"),
    color: String,
    vertical: Boolean,
    textSize: numericProp,
    textColor: String
  };
  var stdin_default$1y = vue.defineComponent({
    name: name$1r,
    props: loadingProps,
    setup(props, {
      slots
    }) {
      const spinnerStyle = vue.computed(() => extend({
        color: props.color
      }, getSizeStyle(props.size)));
      const renderText = () => {
        var _a;
        if (slots.default) {
          return vue.createVNode("span", {
            "class": bem$1n("text"),
            "style": {
              fontSize: addUnit(props.textSize),
              color: (_a = props.textColor) != null ? _a : props.color
            }
          }, [slots.default()]);
        }
      };
      return () => {
        const {
          type,
          vertical
        } = props;
        return vue.createVNode("div", {
          "class": bem$1n([type, {
            vertical
          }]),
          "aria-live": "polite",
          "aria-busy": true
        }, [vue.createVNode("span", {
          "class": bem$1n("spinner", type),
          "style": spinnerStyle.value
        }, [type === "spinner" ? SpinIcon : CircularIcon]), renderText()]);
      };
    }
  });
  const Loading = withInstall(stdin_default$1y);
  const [name$1q, bem$1m] = createNamespace("button");
  const buttonProps = extend({}, routeProps, {
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
  var stdin_default$1x = vue.defineComponent({
    name: name$1q,
    props: buttonProps,
    emits: ["click"],
    setup(props, {
      emit,
      slots
    }) {
      const route2 = useRoute();
      const renderLoadingIcon = () => {
        if (slots.loading) {
          return slots.loading();
        }
        return vue.createVNode(Loading, {
          "size": props.loadingSize,
          "type": props.loadingType,
          "class": bem$1m("loading")
        }, null);
      };
      const renderIcon = () => {
        if (props.loading) {
          return renderLoadingIcon();
        }
        if (slots.icon) {
          return vue.createVNode("div", {
            "class": bem$1m("icon")
          }, [slots.icon()]);
        }
        if (props.icon) {
          return vue.createVNode(Icon, {
            "name": props.icon,
            "class": bem$1m("icon"),
            "classPrefix": props.iconPrefix
          }, null);
        }
      };
      const renderText = () => {
        let text;
        if (props.loading) {
          text = props.loadingText;
        } else {
          text = slots.default ? slots.default() : props.text;
        }
        if (text) {
          return vue.createVNode("span", {
            "class": bem$1m("text")
          }, [text]);
        }
      };
      const getStyle = () => {
        const {
          color,
          plain
        } = props;
        if (color) {
          const style = {
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
      const onClick = (event) => {
        if (props.loading) {
          preventDefault(event);
        } else if (!props.disabled) {
          emit("click", event);
          route2();
        }
      };
      return () => {
        const {
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
        const classes = [bem$1m([type, size, {
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
            "class": bem$1m("content")
          }, [iconPosition === "left" && renderIcon(), renderText(), iconPosition === "right" && renderIcon()])]
        });
      };
    }
  });
  const Button = withInstall(stdin_default$1x);
  const [name$1p, bem$1l] = createNamespace("action-bar-button");
  const actionBarButtonProps = extend({}, routeProps, {
    type: String,
    text: String,
    icon: String,
    color: String,
    loading: Boolean,
    disabled: Boolean
  });
  var stdin_default$1w = vue.defineComponent({
    name: name$1p,
    props: actionBarButtonProps,
    setup(props, {
      slots
    }) {
      const route2 = useRoute();
      const {
        parent,
        index
      } = useParent(ACTION_BAR_KEY);
      const isFirst = vue.computed(() => {
        if (parent) {
          const prev = parent.children[index.value - 1];
          return !(prev && "isButton" in prev);
        }
      });
      const isLast = vue.computed(() => {
        if (parent) {
          const next = parent.children[index.value + 1];
          return !(next && "isButton" in next);
        }
      });
      useExpose({
        isButton: true
      });
      return () => {
        const {
          type,
          icon,
          text,
          color,
          loading,
          disabled
        } = props;
        return vue.createVNode(Button, {
          "class": bem$1l([type, {
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
  const ActionBarButton = withInstall(stdin_default$1w);
  const [name$1o, bem$1k] = createNamespace("action-bar-icon");
  const actionBarIconProps = extend({}, routeProps, {
    dot: Boolean,
    text: String,
    icon: String,
    color: String,
    badge: numericProp,
    iconClass: unknownProp,
    badgeProps: Object,
    iconPrefix: String
  });
  var stdin_default$1v = vue.defineComponent({
    name: name$1o,
    props: actionBarIconProps,
    setup(props, {
      slots
    }) {
      const route2 = useRoute();
      useParent(ACTION_BAR_KEY);
      const renderIcon = () => {
        const {
          dot,
          badge,
          icon,
          color,
          iconClass,
          badgeProps: badgeProps2,
          iconPrefix
        } = props;
        if (slots.icon) {
          return vue.createVNode(Badge, vue.mergeProps({
            "dot": dot,
            "class": bem$1k("icon"),
            "content": badge
          }, badgeProps2), {
            default: slots.icon
          });
        }
        return vue.createVNode(Icon, {
          "tag": "div",
          "dot": dot,
          "name": icon,
          "badge": badge,
          "color": color,
          "class": [bem$1k("icon"), iconClass],
          "badgeProps": badgeProps2,
          "classPrefix": iconPrefix
        }, null);
      };
      return () => vue.createVNode("div", {
        "role": "button",
        "class": bem$1k(),
        "tabindex": 0,
        "onClick": route2
      }, [renderIcon(), slots.default ? slots.default() : props.text]);
    }
  });
  const ActionBarIcon = withInstall(stdin_default$1v);
  const popupSharedProps = {
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
  const popupSharedPropKeys = Object.keys(
    popupSharedProps
  );
  function getDirection(x, y) {
    if (x > y) {
      return "horizontal";
    }
    if (y > x) {
      return "vertical";
    }
    return "";
  }
  function useTouch() {
    const startX = vue.ref(0);
    const startY = vue.ref(0);
    const deltaX = vue.ref(0);
    const deltaY = vue.ref(0);
    const offsetX = vue.ref(0);
    const offsetY = vue.ref(0);
    const direction = vue.ref("");
    const isVertical = () => direction.value === "vertical";
    const isHorizontal = () => direction.value === "horizontal";
    const reset = () => {
      deltaX.value = 0;
      deltaY.value = 0;
      offsetX.value = 0;
      offsetY.value = 0;
      direction.value = "";
    };
    const start2 = (event) => {
      reset();
      startX.value = event.touches[0].clientX;
      startY.value = event.touches[0].clientY;
    };
    const move = (event) => {
      const touch = event.touches[0];
      deltaX.value = (touch.clientX < 0 ? 0 : touch.clientX) - startX.value;
      deltaY.value = touch.clientY - startY.value;
      offsetX.value = Math.abs(deltaX.value);
      offsetY.value = Math.abs(deltaY.value);
      const LOCK_DIRECTION_DISTANCE = 10;
      if (!direction.value || offsetX.value < LOCK_DIRECTION_DISTANCE && offsetY.value < LOCK_DIRECTION_DISTANCE) {
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
  let totalLockCount = 0;
  const BODY_LOCK_CLASS = "van-overflow-hidden";
  function useLockScroll(rootRef, shouldLock) {
    const touch = useTouch();
    const DIRECTION_UP = "01";
    const DIRECTION_DOWN = "10";
    const onTouchMove = (event) => {
      touch.move(event);
      const direction = touch.deltaY.value > 0 ? DIRECTION_DOWN : DIRECTION_UP;
      const el = getScrollParent$1(
        event.target,
        rootRef.value
      );
      const { scrollHeight, offsetHeight, scrollTop } = el;
      let status = "11";
      if (scrollTop === 0) {
        status = offsetHeight >= scrollHeight ? "00" : "01";
      } else if (scrollTop + offsetHeight >= scrollHeight) {
        status = "10";
      }
      if (status !== "11" && touch.isVertical() && !(parseInt(status, 2) & parseInt(direction, 2))) {
        preventDefault(event, true);
      }
    };
    const lock = () => {
      document.addEventListener("touchstart", touch.start);
      document.addEventListener("touchmove", onTouchMove, { passive: false });
      if (!totalLockCount) {
        document.body.classList.add(BODY_LOCK_CLASS);
      }
      totalLockCount++;
    };
    const unlock = () => {
      if (totalLockCount) {
        document.removeEventListener("touchstart", touch.start);
        document.removeEventListener("touchmove", onTouchMove);
        totalLockCount--;
        if (!totalLockCount) {
          document.body.classList.remove(BODY_LOCK_CLASS);
        }
      }
    };
    const init = () => shouldLock() && lock();
    const destroy = () => shouldLock() && unlock();
    onMountedOrActivated(init);
    vue.onDeactivated(destroy);
    vue.onBeforeUnmount(destroy);
    vue.watch(shouldLock, (value) => {
      value ? lock() : unlock();
    });
  }
  function useLazyRender(show) {
    const inited = vue.ref(false);
    vue.watch(
      show,
      (value) => {
        if (value) {
          inited.value = value;
        }
      },
      { immediate: true }
    );
    return (render) => () => inited.value ? render() : null;
  }
  const [name$1n, bem$1j] = createNamespace("overlay");
  const overlayProps = {
    show: Boolean,
    zIndex: numericProp,
    duration: numericProp,
    className: unknownProp,
    lockScroll: truthProp,
    lazyRender: truthProp,
    customStyle: Object
  };
  var stdin_default$1u = vue.defineComponent({
    name: name$1n,
    props: overlayProps,
    setup(props, {
      slots
    }) {
      const root = vue.ref();
      const lazyRender = useLazyRender(() => props.show || !props.lazyRender);
      const onTouchMove = (event) => {
        if (props.lockScroll) {
          preventDefault(event, true);
        }
      };
      const renderOverlay = lazyRender(() => {
        var _a;
        const style = extend(getZIndexStyle(props.zIndex), props.customStyle);
        if (isDef(props.duration)) {
          style.animationDuration = `${props.duration}s`;
        }
        return vue.withDirectives(vue.createVNode("div", {
          "ref": root,
          "style": style,
          "class": [bem$1j(), props.className]
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), [[vue.vShow, props.show]]);
      });
      useEventListener("touchmove", onTouchMove, {
        target: root
      });
      return () => vue.createVNode(vue.Transition, {
        "name": "van-fade",
        "appear": true
      }, {
        default: renderOverlay
      });
    }
  });
  const Overlay = withInstall(stdin_default$1u);
  const popupProps$2 = extend({}, popupSharedProps, {
    round: Boolean,
    position: makeStringProp("center"),
    closeIcon: makeStringProp("cross"),
    closeable: Boolean,
    transition: String,
    iconPrefix: String,
    closeOnPopstate: Boolean,
    closeIconPosition: makeStringProp("top-right"),
    safeAreaInsetTop: Boolean,
    safeAreaInsetBottom: Boolean
  });
  const [name$1m, bem$1i] = createNamespace("popup");
  var stdin_default$1t = vue.defineComponent({
    name: name$1m,
    inheritAttrs: false,
    props: popupProps$2,
    emits: ["open", "close", "opened", "closed", "keydown", "update:show", "click-overlay", "click-close-icon"],
    setup(props, {
      emit,
      attrs,
      slots
    }) {
      let opened;
      let shouldReopen;
      const zIndex = vue.ref();
      const popupRef = vue.ref();
      const lazyRender = useLazyRender(() => props.show || !props.lazyRender);
      const style = vue.computed(() => {
        const style2 = {
          zIndex: zIndex.value
        };
        if (isDef(props.duration)) {
          const key = props.position === "center" ? "animationDuration" : "transitionDuration";
          style2[key] = `${props.duration}s`;
        }
        return style2;
      });
      const open = () => {
        if (!opened) {
          opened = true;
          zIndex.value = props.zIndex !== void 0 ? +props.zIndex : useGlobalZIndex();
          emit("open");
        }
      };
      const close = () => {
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
      const onClickOverlay = (event) => {
        emit("click-overlay", event);
        if (props.closeOnClickOverlay) {
          close();
        }
      };
      const renderOverlay = () => {
        if (props.overlay) {
          return vue.createVNode(Overlay, {
            "show": props.show,
            "class": props.overlayClass,
            "zIndex": zIndex.value,
            "duration": props.duration,
            "customStyle": props.overlayStyle,
            "role": props.closeOnClickOverlay ? "button" : void 0,
            "tabindex": props.closeOnClickOverlay ? 0 : void 0,
            "onClick": onClickOverlay
          }, {
            default: slots["overlay-content"]
          });
        }
      };
      const onClickCloseIcon = (event) => {
        emit("click-close-icon", event);
        close();
      };
      const renderCloseIcon = () => {
        if (props.closeable) {
          return vue.createVNode(Icon, {
            "role": "button",
            "tabindex": 0,
            "name": props.closeIcon,
            "class": [bem$1i("close-icon", props.closeIconPosition), HAPTICS_FEEDBACK],
            "classPrefix": props.iconPrefix,
            "onClick": onClickCloseIcon
          }, null);
        }
      };
      const onOpened = () => emit("opened");
      const onClosed = () => emit("closed");
      const onKeydown = (event) => emit("keydown", event);
      const renderPopup = lazyRender(() => {
        var _a;
        const {
          round: round2,
          position,
          safeAreaInsetTop,
          safeAreaInsetBottom
        } = props;
        return vue.withDirectives(vue.createVNode("div", vue.mergeProps({
          "ref": popupRef,
          "style": style.value,
          "role": "dialog",
          "tabindex": 0,
          "class": [bem$1i({
            round: round2,
            [position]: position
          }), {
            "van-safe-area-top": safeAreaInsetTop,
            "van-safe-area-bottom": safeAreaInsetBottom
          }],
          "onKeydown": onKeydown
        }, attrs), [(_a = slots.default) == null ? void 0 : _a.call(slots), renderCloseIcon()]), [[vue.vShow, props.show]]);
      });
      const renderTransition = () => {
        const {
          position,
          transition,
          transitionAppear
        } = props;
        const name2 = position === "center" ? "van-fade" : `van-popup-slide-${position}`;
        return vue.createVNode(vue.Transition, {
          "name": transition || name2,
          "appear": transitionAppear,
          "onAfterEnter": onOpened,
          "onAfterLeave": onClosed
        }, {
          default: renderPopup
        });
      };
      vue.watch(() => props.show, (show) => {
        if (show && !opened) {
          open();
          if (attrs.tabindex === 0) {
            vue.nextTick(() => {
              var _a;
              (_a = popupRef.value) == null ? void 0 : _a.focus();
            });
          }
        }
        if (!show && opened) {
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
        if (props.show && props.teleport) {
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
  const Popup = withInstall(stdin_default$1t);
  const [name$1l, bem$1h] = createNamespace("action-sheet");
  const actionSheetProps = extend({}, popupSharedProps, {
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
  const popupInheritKeys$2 = [...popupSharedPropKeys, "round", "closeOnPopstate", "safeAreaInsetBottom"];
  var stdin_default$1s = vue.defineComponent({
    name: name$1l,
    props: actionSheetProps,
    emits: ["select", "cancel", "update:show"],
    setup(props, {
      slots,
      emit
    }) {
      const updateShow = (show) => emit("update:show", show);
      const onCancel = () => {
        updateShow(false);
        emit("cancel");
      };
      const renderHeader = () => {
        if (props.title) {
          return vue.createVNode("div", {
            "class": bem$1h("header")
          }, [props.title, props.closeable && vue.createVNode(Icon, {
            "name": props.closeIcon,
            "class": [bem$1h("close"), HAPTICS_FEEDBACK],
            "onClick": onCancel
          }, null)]);
        }
      };
      const renderCancel = () => {
        if (slots.cancel || props.cancelText) {
          return [vue.createVNode("div", {
            "class": bem$1h("gap")
          }, null), vue.createVNode("button", {
            "type": "button",
            "class": bem$1h("cancel"),
            "onClick": onCancel
          }, [slots.cancel ? slots.cancel() : props.cancelText])];
        }
      };
      const renderActionContent = (action, index) => {
        if (action.loading) {
          return vue.createVNode(Loading, {
            "class": bem$1h("loading-icon")
          }, null);
        }
        if (slots.action) {
          return slots.action({
            action,
            index
          });
        }
        return [vue.createVNode("span", {
          "class": bem$1h("name")
        }, [action.name]), action.subname && vue.createVNode("div", {
          "class": bem$1h("subname")
        }, [action.subname])];
      };
      const renderAction = (action, index) => {
        const {
          color,
          loading,
          callback,
          disabled,
          className
        } = action;
        const onClick = () => {
          if (disabled || loading) {
            return;
          }
          if (callback) {
            callback(action);
          }
          if (props.closeOnClickAction) {
            updateShow(false);
          }
          vue.nextTick(() => emit("select", action, index));
        };
        return vue.createVNode("button", {
          "type": "button",
          "style": {
            color
          },
          "class": [bem$1h("item", {
            loading,
            disabled
          }), className],
          "onClick": onClick
        }, [renderActionContent(action, index)]);
      };
      const renderDescription = () => {
        if (props.description || slots.description) {
          const content = slots.description ? slots.description() : props.description;
          return vue.createVNode("div", {
            "class": bem$1h("description")
          }, [content]);
        }
      };
      return () => vue.createVNode(Popup, vue.mergeProps({
        "class": bem$1h(),
        "position": "bottom",
        "onUpdate:show": updateShow
      }, pick(props, popupInheritKeys$2)), {
        default: () => {
          var _a;
          return [renderHeader(), renderDescription(), vue.createVNode("div", {
            "class": bem$1h("content")
          }, [props.actions.map(renderAction), (_a = slots.default) == null ? void 0 : _a.call(slots)]), renderCancel()];
        }
      });
    }
  });
  const ActionSheet = withInstall(stdin_default$1s);
  function deepClone(obj) {
    if (!isDef(obj)) {
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map((item) => deepClone(item));
    }
    if (isObject(obj)) {
      const to = {};
      Object.keys(obj).forEach((key) => {
        to[key] = deepClone(obj[key]);
      });
      return to;
    }
    return obj;
  }
  const DEFAULT_DURATION = 200;
  const MOMENTUM_LIMIT_TIME = 300;
  const MOMENTUM_LIMIT_DISTANCE = 15;
  const [name$1k, bem$1g] = createNamespace("picker-column");
  function getElementTranslateY(element) {
    const {
      transform
    } = window.getComputedStyle(element);
    const translateY = transform.slice(7, transform.length - 1).split(", ")[5];
    return Number(translateY);
  }
  const PICKER_KEY = Symbol(name$1k);
  const isOptionDisabled = (option) => isObject(option) && option.disabled;
  var stdin_default$1r = vue.defineComponent({
    name: name$1k,
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
    setup(props, {
      emit,
      slots
    }) {
      let moving;
      let startOffset;
      let touchStartTime;
      let momentumOffset;
      let transitionEndTrigger;
      const root = vue.ref();
      const wrapper = vue.ref();
      const state = vue.reactive({
        index: props.defaultIndex,
        offset: 0,
        duration: 0,
        options: deepClone(props.initialOptions)
      });
      const touch = useTouch();
      const count = () => state.options.length;
      const baseOffset = () => props.itemHeight * (+props.visibleItemCount - 1) / 2;
      const adjustIndex = (index) => {
        index = clamp(index, 0, count());
        for (let i = index; i < count(); i++) {
          if (!isOptionDisabled(state.options[i]))
            return i;
        }
        for (let i = index - 1; i >= 0; i--) {
          if (!isOptionDisabled(state.options[i]))
            return i;
        }
      };
      const setIndex = (index, emitChange) => {
        index = adjustIndex(index) || 0;
        const offset2 = -index * props.itemHeight;
        const trigger = () => {
          if (index !== state.index) {
            state.index = index;
            if (emitChange) {
              emit("change", index);
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
      const setOptions = (options) => {
        if (JSON.stringify(options) !== JSON.stringify(state.options)) {
          state.options = deepClone(options);
          setIndex(props.defaultIndex);
        }
      };
      const onClickItem = (index) => {
        if (moving || props.readonly) {
          return;
        }
        transitionEndTrigger = null;
        state.duration = DEFAULT_DURATION;
        setIndex(index, true);
      };
      const getOptionText = (option) => {
        if (isObject(option) && props.textKey in option) {
          return option[props.textKey];
        }
        return option;
      };
      const getIndexByOffset = (offset2) => clamp(Math.round(-offset2 / props.itemHeight), 0, count() - 1);
      const momentum = (distance, duration) => {
        const speed = Math.abs(distance / duration);
        distance = state.offset + speed / 3e-3 * (distance < 0 ? -1 : 1);
        const index = getIndexByOffset(distance);
        state.duration = +props.swipeDuration;
        setIndex(index, true);
      };
      const stopMomentum = () => {
        moving = false;
        state.duration = 0;
        if (transitionEndTrigger) {
          transitionEndTrigger();
          transitionEndTrigger = null;
        }
      };
      const onTouchStart = (event) => {
        if (props.readonly) {
          return;
        }
        touch.start(event);
        if (moving) {
          const translateY = getElementTranslateY(wrapper.value);
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
      const onTouchMove = (event) => {
        if (props.readonly) {
          return;
        }
        touch.move(event);
        if (touch.isVertical()) {
          moving = true;
          preventDefault(event, true);
        }
        state.offset = clamp(startOffset + touch.deltaY.value, -(count() * props.itemHeight), props.itemHeight);
        const now = Date.now();
        if (now - touchStartTime > MOMENTUM_LIMIT_TIME) {
          touchStartTime = now;
          momentumOffset = state.offset;
        }
      };
      const onTouchEnd = () => {
        if (props.readonly) {
          return;
        }
        const distance = state.offset - momentumOffset;
        const duration = Date.now() - touchStartTime;
        const allowMomentum = duration < MOMENTUM_LIMIT_TIME && Math.abs(distance) > MOMENTUM_LIMIT_DISTANCE;
        if (allowMomentum) {
          momentum(distance, duration);
          return;
        }
        const index = getIndexByOffset(state.offset);
        state.duration = DEFAULT_DURATION;
        setIndex(index, true);
        setTimeout(() => {
          moving = false;
        }, 0);
      };
      const renderOptions = () => {
        const optionStyle = {
          height: `${props.itemHeight}px`
        };
        return state.options.map((option, index) => {
          const text = getOptionText(option);
          const disabled = isOptionDisabled(option);
          const data = {
            role: "button",
            style: optionStyle,
            tabindex: disabled ? -1 : 0,
            class: bem$1g("item", {
              disabled,
              selected: index === state.index
            }),
            onClick: () => onClickItem(index)
          };
          const childData = {
            class: "van-ellipsis",
            [props.allowHtml ? "innerHTML" : "textContent"]: text
          };
          return vue.createVNode("li", data, [slots.option ? slots.option(option) : vue.createVNode("div", childData, null)]);
        });
      };
      const setValue = (value) => {
        const {
          options
        } = state;
        for (let i = 0; i < options.length; i++) {
          if (getOptionText(options[i]) === value) {
            return setIndex(i);
          }
        }
      };
      const getValue = () => state.options[state.index];
      const hasOptions = () => state.options.length;
      setIndex(state.index);
      useParent(PICKER_KEY);
      useExpose({
        state,
        setIndex,
        getValue,
        setValue,
        setOptions,
        hasOptions,
        stopMomentum
      });
      vue.watch(() => props.initialOptions, setOptions);
      vue.watch(() => props.defaultIndex, (value) => setIndex(value));
      useEventListener("touchmove", onTouchMove, {
        target: root
      });
      return () => vue.createVNode("div", {
        "ref": root,
        "class": [bem$1g(), props.className],
        "onTouchstartPassive": onTouchStart,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, [vue.createVNode("ul", {
        "ref": wrapper,
        "style": {
          transform: `translate3d(0, ${state.offset + baseOffset()}px, 0)`,
          transitionDuration: `${state.duration}ms`,
          transitionProperty: state.duration ? "all" : "none"
        },
        "class": bem$1g("wrapper"),
        "onTransitionend": stopMomentum
      }, [renderOptions()])]);
    }
  });
  const [name$1j, bem$1f, t$j] = createNamespace("picker");
  const pickerSharedProps = {
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
  const pickerProps = extend({}, pickerSharedProps, {
    columns: makeArrayProp(),
    valueKey: String,
    defaultIndex: makeNumericProp(0),
    toolbarPosition: makeStringProp("top"),
    columnsFieldNames: Object
  });
  var stdin_default$1q = vue.defineComponent({
    name: name$1j,
    props: pickerProps,
    emits: ["confirm", "cancel", "change"],
    setup(props, {
      emit,
      slots
    }) {
      const hasOptions = vue.ref(false);
      const columnsRef = vue.ref();
      const formattedColumns = vue.ref([]);
      const columnsFieldNames = vue.computed(() => {
        const {
          columnsFieldNames: columnsFieldNames2
        } = props;
        return {
          text: (columnsFieldNames2 == null ? void 0 : columnsFieldNames2.text) || props.valueKey || "text",
          values: (columnsFieldNames2 == null ? void 0 : columnsFieldNames2.values) || "values",
          children: (columnsFieldNames2 == null ? void 0 : columnsFieldNames2.children) || "children"
        };
      });
      const {
        children,
        linkChildren
      } = useChildren(PICKER_KEY);
      linkChildren();
      const itemHeight = vue.computed(() => unitToPx(props.itemHeight));
      const dataType = vue.computed(() => {
        const firstColumn = props.columns[0];
        if (typeof firstColumn === "object") {
          if (columnsFieldNames.value.children in firstColumn) {
            return "cascade";
          }
          if (columnsFieldNames.value.values in firstColumn) {
            return "object";
          }
        }
        return "plain";
      });
      const formatCascade = () => {
        var _a;
        const formatted = [];
        let cursor = {
          [columnsFieldNames.value.children]: props.columns
        };
        while (cursor && cursor[columnsFieldNames.value.children]) {
          const children2 = cursor[columnsFieldNames.value.children];
          let defaultIndex = (_a = cursor.defaultIndex) != null ? _a : +props.defaultIndex;
          while (children2[defaultIndex] && children2[defaultIndex].disabled) {
            if (defaultIndex < children2.length - 1) {
              defaultIndex++;
            } else {
              defaultIndex = 0;
              break;
            }
          }
          formatted.push({
            [columnsFieldNames.value.values]: cursor[columnsFieldNames.value.children],
            className: cursor.className,
            defaultIndex
          });
          cursor = children2[defaultIndex];
        }
        formattedColumns.value = formatted;
      };
      const format2 = () => {
        const {
          columns
        } = props;
        if (dataType.value === "plain") {
          formattedColumns.value = [{
            [columnsFieldNames.value.values]: columns
          }];
        } else if (dataType.value === "cascade") {
          formatCascade();
        } else {
          formattedColumns.value = columns;
        }
        hasOptions.value = formattedColumns.value.some((item) => item[columnsFieldNames.value.values] && item[columnsFieldNames.value.values].length !== 0) || children.some((item) => item.hasOptions);
      };
      const getIndexes = () => children.map((child) => child.state.index);
      const setColumnValues = (index, options) => {
        const column = children[index];
        if (column) {
          column.setOptions(options);
          hasOptions.value = true;
        }
      };
      const onCascadeChange = (columnIndex) => {
        let cursor = {
          [columnsFieldNames.value.children]: props.columns
        };
        const indexes = getIndexes();
        for (let i = 0; i <= columnIndex; i++) {
          cursor = cursor[columnsFieldNames.value.children][indexes[i]];
        }
        while (cursor && cursor[columnsFieldNames.value.children]) {
          columnIndex++;
          setColumnValues(columnIndex, cursor[columnsFieldNames.value.children]);
          cursor = cursor[columnsFieldNames.value.children][cursor.defaultIndex || 0];
        }
      };
      const getChild = (index) => children[index];
      const getColumnValue = (index) => {
        const column = getChild(index);
        if (column) {
          return column.getValue();
        }
      };
      const setColumnValue = (index, value) => {
        const column = getChild(index);
        if (column) {
          column.setValue(value);
          if (dataType.value === "cascade") {
            onCascadeChange(index);
          }
        }
      };
      const getColumnIndex = (index) => {
        const column = getChild(index);
        if (column) {
          return column.state.index;
        }
      };
      const setColumnIndex = (columnIndex, optionIndex) => {
        const column = getChild(columnIndex);
        if (column) {
          column.setIndex(optionIndex);
          if (dataType.value === "cascade") {
            onCascadeChange(columnIndex);
          }
        }
      };
      const getColumnValues = (index) => {
        const column = getChild(index);
        if (column) {
          return column.state.options;
        }
      };
      const getValues = () => children.map((child) => child.getValue());
      const setValues = (values) => {
        values.forEach((value, index) => {
          setColumnValue(index, value);
        });
      };
      const setIndexes = (indexes) => {
        indexes.forEach((optionIndex, columnIndex) => {
          setColumnIndex(columnIndex, optionIndex);
        });
      };
      const emitAction = (event) => {
        if (dataType.value === "plain") {
          emit(event, getColumnValue(0), getColumnIndex(0));
        } else {
          emit(event, getValues(), getIndexes());
        }
      };
      const onChange = (columnIndex) => {
        if (dataType.value === "cascade") {
          onCascadeChange(columnIndex);
        }
        if (dataType.value === "plain") {
          emit("change", getColumnValue(0), getColumnIndex(0));
        } else {
          emit("change", getValues(), columnIndex);
        }
      };
      const confirm = () => {
        children.forEach((child) => child.stopMomentum());
        emitAction("confirm");
      };
      const cancel = () => emitAction("cancel");
      const renderTitle = () => {
        if (slots.title) {
          return slots.title();
        }
        if (props.title) {
          return vue.createVNode("div", {
            "class": [bem$1f("title"), "van-ellipsis"]
          }, [props.title]);
        }
      };
      const renderCancel = () => {
        const text = props.cancelButtonText || t$j("cancel");
        return vue.createVNode("button", {
          "type": "button",
          "class": [bem$1f("cancel"), HAPTICS_FEEDBACK],
          "onClick": cancel
        }, [slots.cancel ? slots.cancel() : text]);
      };
      const renderConfirm = () => {
        const text = props.confirmButtonText || t$j("confirm");
        return vue.createVNode("button", {
          "type": "button",
          "class": [bem$1f("confirm"), HAPTICS_FEEDBACK],
          "onClick": confirm
        }, [slots.confirm ? slots.confirm() : text]);
      };
      const renderToolbar = () => {
        if (props.showToolbar) {
          const slot = slots.toolbar || slots.default;
          return vue.createVNode("div", {
            "class": bem$1f("toolbar")
          }, [slot ? slot() : [renderCancel(), renderTitle(), renderConfirm()]]);
        }
      };
      const renderColumnItems = () => formattedColumns.value.map((item, columnIndex) => {
        var _a;
        return vue.createVNode(stdin_default$1r, {
          "textKey": columnsFieldNames.value.text,
          "readonly": props.readonly,
          "allowHtml": props.allowHtml,
          "className": item.className,
          "itemHeight": itemHeight.value,
          "defaultIndex": (_a = item.defaultIndex) != null ? _a : +props.defaultIndex,
          "swipeDuration": props.swipeDuration,
          "initialOptions": item[columnsFieldNames.value.values],
          "visibleItemCount": props.visibleItemCount,
          "onChange": () => onChange(columnIndex)
        }, {
          option: slots.option
        });
      });
      const renderMask = (wrapHeight) => {
        if (hasOptions.value) {
          const frameStyle = {
            height: `${itemHeight.value}px`
          };
          const maskStyle = {
            backgroundSize: `100% ${(wrapHeight - itemHeight.value) / 2}px`
          };
          return [vue.createVNode("div", {
            "class": bem$1f("mask"),
            "style": maskStyle
          }, null), vue.createVNode("div", {
            "class": [BORDER_UNSET_TOP_BOTTOM, bem$1f("frame")],
            "style": frameStyle
          }, null)];
        }
      };
      const renderColumns = () => {
        const wrapHeight = itemHeight.value * +props.visibleItemCount;
        const columnsStyle = {
          height: `${wrapHeight}px`
        };
        return vue.createVNode("div", {
          "ref": columnsRef,
          "class": bem$1f("columns"),
          "style": columnsStyle
        }, [renderColumnItems(), renderMask(wrapHeight)]);
      };
      vue.watch(() => props.columns, format2, {
        immediate: true
      });
      useEventListener("touchmove", preventDefault, {
        target: columnsRef
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
        var _a, _b;
        return vue.createVNode("div", {
          "class": bem$1f()
        }, [props.toolbarPosition === "top" ? renderToolbar() : null, props.loading ? vue.createVNode(Loading, {
          "class": bem$1f("loading")
        }, null) : null, (_a = slots["columns-top"]) == null ? void 0 : _a.call(slots), renderColumns(), (_b = slots["columns-bottom"]) == null ? void 0 : _b.call(slots), props.toolbarPosition === "bottom" ? renderToolbar() : null]);
      };
    }
  });
  const Picker = withInstall(stdin_default$1q);
  const [name$1i, bem$1e] = createNamespace("area");
  const EMPTY_CODE = "000000";
  const INHERIT_SLOTS = ["title", "cancel", "confirm", "toolbar", "columns-top", "columns-bottom"];
  const INHERIT_PROPS = ["title", "loading", "readonly", "itemHeight", "swipeDuration", "visibleItemCount", "cancelButtonText", "confirmButtonText"];
  const isOverseaCode = (code) => code[0] === "9";
  const areaProps = extend({}, pickerSharedProps, {
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
  var stdin_default$1p = vue.defineComponent({
    name: name$1i,
    props: areaProps,
    emits: ["change", "confirm", "cancel"],
    setup(props, {
      emit,
      slots
    }) {
      const pickerRef = vue.ref();
      const state = vue.reactive({
        code: props.value,
        columns: [{
          values: []
        }, {
          values: []
        }, {
          values: []
        }]
      });
      const areaList = vue.computed(() => {
        const {
          areaList: areaList2
        } = props;
        return {
          province: areaList2.province_list || {},
          city: areaList2.city_list || {},
          county: areaList2.county_list || {}
        };
      });
      const placeholderMap = vue.computed(() => {
        const {
          columnsPlaceholder
        } = props;
        return {
          province: columnsPlaceholder[0] || "",
          city: columnsPlaceholder[1] || "",
          county: columnsPlaceholder[2] || ""
        };
      });
      const getDefaultCode = () => {
        if (props.columnsPlaceholder.length) {
          return EMPTY_CODE;
        }
        const {
          county,
          city
        } = areaList.value;
        const countyCodes = Object.keys(county);
        if (countyCodes[0]) {
          return countyCodes[0];
        }
        const cityCodes = Object.keys(city);
        if (cityCodes[0]) {
          return cityCodes[0];
        }
        return "";
      };
      const getColumnValues = (type, code) => {
        let column = [];
        if (type !== "province" && !code) {
          return column;
        }
        const list = areaList.value[type];
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
          let codeFill = "";
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
      const getIndex = (type, code) => {
        let compareNum = code.length;
        if (type === "province") {
          compareNum = props.isOverseaCode(code) ? 1 : 2;
        }
        if (type === "city") {
          compareNum = 4;
        }
        code = code.slice(0, compareNum);
        const list = getColumnValues(type, compareNum > 2 ? code.slice(0, compareNum - 2) : "");
        for (let i = 0; i < list.length; i++) {
          if (list[i].code.slice(0, compareNum) === code) {
            return i;
          }
        }
        return 0;
      };
      const setValues = () => {
        const picker = pickerRef.value;
        if (!picker) {
          return;
        }
        let code = state.code || getDefaultCode();
        const province = getColumnValues("province");
        const city = getColumnValues("city", code.slice(0, 2));
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
      const parseValues = (values) => values.map((value, index) => {
        if (value) {
          value = deepClone(value);
          if (!value.code || value.name === props.columnsPlaceholder[index]) {
            value.code = "";
            value.name = "";
          }
        }
        return value;
      });
      const getValues = () => {
        if (pickerRef.value) {
          const values = pickerRef.value.getValues().filter(Boolean);
          return parseValues(values);
        }
        return [];
      };
      const getArea = () => {
        const values = getValues();
        const area = {
          code: "",
          country: "",
          province: "",
          city: "",
          county: ""
        };
        if (!values.length) {
          return area;
        }
        const names = values.map((item) => item.name);
        const validValues = values.filter((value) => value.code);
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
      const reset = (newCode = "") => {
        state.code = newCode;
        setValues();
      };
      const onChange = (values, index) => {
        state.code = values[index].code;
        setValues();
        if (pickerRef.value) {
          const parsedValues = parseValues(pickerRef.value.getValues());
          emit("change", parsedValues, index);
        }
      };
      const onConfirm = (values, index) => {
        setValues();
        emit("confirm", parseValues(values), index);
      };
      const onCancel = (...args) => emit("cancel", ...args);
      vue.onMounted(setValues);
      vue.watch(() => props.value, (value) => {
        state.code = value;
        setValues();
      });
      vue.watch(() => props.areaList, setValues, {
        deep: true
      });
      vue.watch(() => props.columnsNum, () => {
        vue.nextTick(setValues);
      });
      useExpose({
        reset,
        getArea,
        getValues
      });
      return () => {
        const columns = state.columns.slice(0, +props.columnsNum);
        return vue.createVNode(Picker, vue.mergeProps({
          "ref": pickerRef,
          "class": bem$1e(),
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
  const Area = withInstall(stdin_default$1p);
  const [name$1h, bem$1d] = createNamespace("cell");
  const cellSharedProps = {
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
  const cellProps = extend({}, cellSharedProps, routeProps);
  var stdin_default$1o = vue.defineComponent({
    name: name$1h,
    props: cellProps,
    setup(props, {
      slots
    }) {
      const route2 = useRoute();
      const renderLabel = () => {
        const showLabel = slots.label || isDef(props.label);
        if (showLabel) {
          return vue.createVNode("div", {
            "class": [bem$1d("label"), props.labelClass]
          }, [slots.label ? slots.label() : props.label]);
        }
      };
      const renderTitle = () => {
        if (slots.title || isDef(props.title)) {
          return vue.createVNode("div", {
            "class": [bem$1d("title"), props.titleClass],
            "style": props.titleStyle
          }, [slots.title ? slots.title() : vue.createVNode("span", null, [props.title]), renderLabel()]);
        }
      };
      const renderValue = () => {
        const slot = slots.value || slots.default;
        const hasValue = slot || isDef(props.value);
        if (hasValue) {
          const hasTitle = slots.title || isDef(props.title);
          return vue.createVNode("div", {
            "class": [bem$1d("value", {
              alone: !hasTitle
            }), props.valueClass]
          }, [slot ? slot() : vue.createVNode("span", null, [props.value])]);
        }
      };
      const renderLeftIcon = () => {
        if (slots.icon) {
          return slots.icon();
        }
        if (props.icon) {
          return vue.createVNode(Icon, {
            "name": props.icon,
            "class": bem$1d("left-icon"),
            "classPrefix": props.iconPrefix
          }, null);
        }
      };
      const renderRightIcon = () => {
        if (slots["right-icon"]) {
          return slots["right-icon"]();
        }
        if (props.isLink) {
          const name2 = props.arrowDirection && props.arrowDirection !== "right" ? `arrow-${props.arrowDirection}` : "arrow";
          return vue.createVNode(Icon, {
            "name": name2,
            "class": bem$1d("right-icon")
          }, null);
        }
      };
      return () => {
        var _a, _b;
        const {
          size,
          center,
          border,
          isLink,
          required
        } = props;
        const clickable = (_a = props.clickable) != null ? _a : isLink;
        const classes = {
          center,
          required,
          clickable,
          borderless: !border
        };
        if (size) {
          classes[size] = !!size;
        }
        return vue.createVNode("div", {
          "class": bem$1d(classes),
          "role": clickable ? "button" : void 0,
          "tabindex": clickable ? 0 : void 0,
          "onClick": route2
        }, [renderLeftIcon(), renderTitle(), renderValue(), renderRightIcon(), (_b = slots.extra) == null ? void 0 : _b.call(slots)]);
      };
    }
  });
  const Cell = withInstall(stdin_default$1o);
  const [name$1g, bem$1c] = createNamespace("form");
  const formProps = {
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
    showErrorMessage: truthProp,
    errorMessageAlign: String,
    validateTrigger: {
      type: [String, Array],
      default: "onBlur"
    }
  };
  var stdin_default$1n = vue.defineComponent({
    name: name$1g,
    props: formProps,
    emits: ["submit", "failed"],
    setup(props, {
      emit,
      slots
    }) {
      const {
        children,
        linkChildren
      } = useChildren(FORM_KEY);
      const getFieldsByNames = (names) => {
        if (names) {
          return children.filter((field) => names.includes(field.name));
        }
        return children;
      };
      const validateSeq = (names) => new Promise((resolve, reject) => {
        const errors = [];
        const fields = getFieldsByNames(names);
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
      const validateAll = (names) => new Promise((resolve, reject) => {
        const fields = getFieldsByNames(names);
        Promise.all(fields.map((item) => item.validate())).then((errors) => {
          errors = errors.filter(Boolean);
          if (errors.length) {
            reject(errors);
          } else {
            resolve();
          }
        });
      });
      const validateField = (name2) => {
        const matched = children.find((item) => item.name === name2);
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
      const validate = (name2) => {
        if (typeof name2 === "string") {
          return validateField(name2);
        }
        return props.validateFirst ? validateSeq(name2) : validateAll(name2);
      };
      const resetValidation = (name2) => {
        if (typeof name2 === "string") {
          name2 = [name2];
        }
        const fields = getFieldsByNames(name2);
        fields.forEach((item) => {
          item.resetValidation();
        });
      };
      const getValidationStatus = () => children.reduce((form, field) => {
        form[field.name] = field.getValidationStatus();
        return form;
      }, {});
      const scrollToField = (name2, options) => {
        children.some((item) => {
          if (item.name === name2) {
            item.$el.scrollIntoView(options);
            return true;
          }
          return false;
        });
      };
      const getValues = () => children.reduce((form, field) => {
        form[field.name] = field.formValue.value;
        return form;
      }, {});
      const submit = () => {
        const values = getValues();
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
      const onSubmit = (event) => {
        preventDefault(event);
        submit();
      };
      linkChildren({
        props
      });
      useExpose({
        submit,
        validate,
        getValues,
        scrollToField,
        resetValidation,
        getValidationStatus
      });
      return () => {
        var _a;
        return vue.createVNode("form", {
          "class": bem$1c(),
          "onSubmit": onSubmit
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
      };
    }
  });
  const Form = withInstall(stdin_default$1n);
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
    if (isEmptyValue(value)) {
      if (rule.required) {
        return false;
      }
      if (rule.validateEmpty === false) {
        return true;
      }
    }
    if (rule.pattern && !rule.pattern.test(String(value))) {
      return false;
    }
    return true;
  }
  function runRuleValidator(value, rule) {
    return new Promise((resolve) => {
      const returnVal = rule.validator(value, rule);
      if (isPromise(returnVal)) {
        returnVal.then(resolve);
        return;
      }
      resolve(returnVal);
    });
  }
  function getRuleMessage(value, rule) {
    const { message } = rule;
    if (isFunction(message)) {
      return message(value, rule);
    }
    return message || "";
  }
  function startComposing({ target }) {
    target.composing = true;
  }
  function endComposing({ target }) {
    if (target.composing) {
      target.composing = false;
      target.dispatchEvent(new Event("input"));
    }
  }
  function resizeTextarea(input, autosize) {
    const scrollTop = getRootScrollTop();
    input.style.height = "auto";
    let height2 = input.scrollHeight;
    if (isObject(autosize)) {
      const { maxHeight, minHeight } = autosize;
      if (maxHeight !== void 0) {
        height2 = Math.min(height2, maxHeight);
      }
      if (minHeight !== void 0) {
        height2 = Math.max(height2, minHeight);
      }
    }
    if (height2) {
      input.style.height = `${height2}px`;
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
    return { type };
  }
  function getStringLength(str) {
    return [...str].length;
  }
  function cutString(str, maxlength) {
    return [...str].slice(0, maxlength).join("");
  }
  let current = 0;
  function useId() {
    const vm = vue.getCurrentInstance();
    const { name: name2 = "unknown" } = (vm == null ? void 0 : vm.type) || {};
    return `${name2}-${++current}`;
  }
  const [name$1f, bem$1b] = createNamespace("field");
  const fieldSharedProps = {
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
    enterkeyhint: String,
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
  const fieldProps = extend({}, cellSharedProps, fieldSharedProps, {
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
  var stdin_default$1m = vue.defineComponent({
    name: name$1f,
    props: fieldProps,
    emits: ["blur", "focus", "clear", "keypress", "click-input", "end-validate", "start-validate", "click-left-icon", "click-right-icon", "update:modelValue"],
    setup(props, {
      emit,
      slots
    }) {
      const id = useId();
      const state = vue.reactive({
        status: "unvalidated",
        focused: false,
        validateMessage: ""
      });
      const inputRef = vue.ref();
      const clearIconRef = vue.ref();
      const customValue = vue.ref();
      const {
        parent: form
      } = useParent(FORM_KEY);
      const getModelValue = () => {
        var _a;
        return String((_a = props.modelValue) != null ? _a : "");
      };
      const getProp = (key) => {
        if (isDef(props[key])) {
          return props[key];
        }
        if (form && isDef(form.props[key])) {
          return form.props[key];
        }
      };
      const showClear = vue.computed(() => {
        const readonly = getProp("readonly");
        if (props.clearable && !readonly) {
          const hasValue = getModelValue() !== "";
          const trigger = props.clearTrigger === "always" || props.clearTrigger === "focus" && state.focused;
          return hasValue && trigger;
        }
        return false;
      });
      const formValue = vue.computed(() => {
        if (customValue.value && slots.input) {
          return customValue.value();
        }
        return props.modelValue;
      });
      const runRules = (rules) => rules.reduce((promise, rule) => promise.then(() => {
        if (state.status === "failed") {
          return;
        }
        let {
          value
        } = formValue;
        if (rule.formatter) {
          value = rule.formatter(value, rule);
        }
        if (!runSyncRule(value, rule)) {
          state.status = "failed";
          state.validateMessage = getRuleMessage(value, rule);
          return;
        }
        if (rule.validator) {
          if (isEmptyValue(value) && rule.validateEmpty === false) {
            return;
          }
          return runRuleValidator(value, rule).then((result) => {
            if (result && typeof result === "string") {
              state.status = "failed";
              state.validateMessage = result;
            } else if (result === false) {
              state.status = "failed";
              state.validateMessage = getRuleMessage(value, rule);
            }
          });
        }
      }), Promise.resolve());
      const resetValidation = () => {
        state.status = "unvalidated";
        state.validateMessage = "";
      };
      const endValidate = () => emit("end-validate", {
        status: state.status
      });
      const validate = (rules = props.rules) => new Promise((resolve) => {
        resetValidation();
        if (rules) {
          emit("start-validate");
          runRules(rules).then(() => {
            if (state.status === "failed") {
              resolve({
                name: props.name,
                message: state.validateMessage
              });
              endValidate();
            } else {
              state.status = "passed";
              resolve();
              endValidate();
            }
          });
        } else {
          resolve();
        }
      });
      const validateWithTrigger = (trigger) => {
        if (form && props.rules) {
          const {
            validateTrigger
          } = form.props;
          const defaultTrigger = toArray(validateTrigger).includes(trigger);
          const rules = props.rules.filter((rule) => {
            if (rule.trigger) {
              return toArray(rule.trigger).includes(trigger);
            }
            return defaultTrigger;
          });
          if (rules.length) {
            validate(rules);
          }
        }
      };
      const limitValueLength = (value) => {
        var _a;
        const {
          maxlength
        } = props;
        if (isDef(maxlength) && getStringLength(value) > maxlength) {
          const modelValue = getModelValue();
          if (modelValue && getStringLength(modelValue) === +maxlength) {
            return modelValue;
          }
          const selectionEnd = (_a = inputRef.value) == null ? void 0 : _a.selectionEnd;
          if (state.focused && selectionEnd) {
            const valueArr = [...value];
            const exceededLength = valueArr.length - +maxlength;
            valueArr.splice(selectionEnd - exceededLength, exceededLength);
            return valueArr.join("");
          }
          return cutString(value, +maxlength);
        }
        return value;
      };
      const updateValue = (value, trigger = "onChange") => {
        const originalValue = value;
        value = limitValueLength(value);
        const limitDiffLen = getStringLength(originalValue) - getStringLength(value);
        if (props.type === "number" || props.type === "digit") {
          const isNumber = props.type === "number";
          value = formatNumber(value, isNumber, isNumber);
        }
        let formatterDiffLen = 0;
        if (props.formatter && trigger === props.formatTrigger) {
          const {
            formatter,
            maxlength
          } = props;
          value = formatter(value);
          if (isDef(maxlength) && getStringLength(value) > maxlength) {
            value = cutString(value, +maxlength);
          }
          if (inputRef.value && state.focused) {
            const {
              selectionEnd
            } = inputRef.value;
            const bcoVal = cutString(originalValue, selectionEnd);
            formatterDiffLen = getStringLength(formatter(bcoVal)) - getStringLength(bcoVal);
          }
        }
        if (inputRef.value && inputRef.value.value !== value) {
          if (state.focused) {
            let {
              selectionStart,
              selectionEnd
            } = inputRef.value;
            inputRef.value.value = value;
            if (isDef(selectionStart) && isDef(selectionEnd)) {
              const valueLen = getStringLength(value);
              if (limitDiffLen) {
                selectionStart -= limitDiffLen;
                selectionEnd -= limitDiffLen;
              } else if (formatterDiffLen) {
                selectionStart += formatterDiffLen;
                selectionEnd += formatterDiffLen;
              }
              inputRef.value.setSelectionRange(Math.min(selectionStart, valueLen), Math.min(selectionEnd, valueLen));
            }
          } else {
            inputRef.value.value = value;
          }
        }
        if (value !== props.modelValue) {
          emit("update:modelValue", value);
        }
      };
      const onInput = (event) => {
        if (!event.target.composing) {
          updateValue(event.target.value);
        }
      };
      const blur = () => {
        var _a;
        return (_a = inputRef.value) == null ? void 0 : _a.blur();
      };
      const focus = () => {
        var _a;
        return (_a = inputRef.value) == null ? void 0 : _a.focus();
      };
      const adjustTextareaSize = () => {
        const input = inputRef.value;
        if (props.type === "textarea" && props.autosize && input) {
          resizeTextarea(input, props.autosize);
        }
      };
      const onFocus = (event) => {
        state.focused = true;
        emit("focus", event);
        vue.nextTick(adjustTextareaSize);
        if (getProp("readonly")) {
          blur();
        }
      };
      const onBlur = (event) => {
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
      const onClickInput = (event) => emit("click-input", event);
      const onClickLeftIcon = (event) => emit("click-left-icon", event);
      const onClickRightIcon = (event) => emit("click-right-icon", event);
      const onClear = (event) => {
        preventDefault(event);
        emit("update:modelValue", "");
        emit("clear", event);
      };
      const showError = vue.computed(() => {
        if (typeof props.error === "boolean") {
          return props.error;
        }
        if (form && form.props.showError && state.status === "failed") {
          return true;
        }
      });
      const labelStyle = vue.computed(() => {
        const labelWidth = getProp("labelWidth");
        if (labelWidth) {
          return {
            width: addUnit(labelWidth)
          };
        }
      });
      const onKeypress = (event) => {
        const ENTER_CODE = 13;
        if (event.keyCode === ENTER_CODE) {
          const submitOnEnter = form && form.props.submitOnEnter;
          if (!submitOnEnter && props.type !== "textarea") {
            preventDefault(event);
          }
          if (props.type === "search") {
            blur();
          }
        }
        emit("keypress", event);
      };
      const getInputId = () => props.id || `${id}-input`;
      const getValidationStatus = () => state.status;
      const renderInput = () => {
        const controlClass = bem$1b("control", [getProp("inputAlign"), {
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
        const inputAttrs = {
          id: getInputId(),
          ref: inputRef,
          name: props.name,
          rows: props.rows !== void 0 ? +props.rows : void 0,
          class: controlClass,
          disabled: getProp("disabled"),
          readonly: getProp("readonly"),
          autofocus: props.autofocus,
          placeholder: props.placeholder,
          autocomplete: props.autocomplete,
          enterkeyhint: props.enterkeyhint,
          "aria-labelledby": props.label ? `${id}-label` : void 0,
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
      const renderLeftIcon = () => {
        const leftIconSlot = slots["left-icon"];
        if (props.leftIcon || leftIconSlot) {
          return vue.createVNode("div", {
            "class": bem$1b("left-icon"),
            "onClick": onClickLeftIcon
          }, [leftIconSlot ? leftIconSlot() : vue.createVNode(Icon, {
            "name": props.leftIcon,
            "classPrefix": props.iconPrefix
          }, null)]);
        }
      };
      const renderRightIcon = () => {
        const rightIconSlot = slots["right-icon"];
        if (props.rightIcon || rightIconSlot) {
          return vue.createVNode("div", {
            "class": bem$1b("right-icon"),
            "onClick": onClickRightIcon
          }, [rightIconSlot ? rightIconSlot() : vue.createVNode(Icon, {
            "name": props.rightIcon,
            "classPrefix": props.iconPrefix
          }, null)]);
        }
      };
      const renderWordLimit = () => {
        if (props.showWordLimit && props.maxlength) {
          const count = getStringLength(getModelValue());
          return vue.createVNode("div", {
            "class": bem$1b("word-limit")
          }, [vue.createVNode("span", {
            "class": bem$1b("word-num")
          }, [count]), vue.createTextVNode("/"), props.maxlength]);
        }
      };
      const renderMessage = () => {
        if (form && form.props.showErrorMessage === false) {
          return;
        }
        const message = props.errorMessage || state.validateMessage;
        if (message) {
          const slot = slots["error-message"];
          const errorMessageAlign = getProp("errorMessageAlign");
          return vue.createVNode("div", {
            "class": bem$1b("error-message", errorMessageAlign)
          }, [slot ? slot({
            message
          }) : message]);
        }
      };
      const renderLabel = () => {
        const colon = getProp("colon") ? ":" : "";
        if (slots.label) {
          return [slots.label(), colon];
        }
        if (props.label) {
          return vue.createVNode("label", {
            "id": `${id}-label`,
            "for": getInputId()
          }, [props.label + colon]);
        }
      };
      const renderFieldBody = () => [vue.createVNode("div", {
        "class": bem$1b("body")
      }, [renderInput(), showClear.value && vue.createVNode(Icon, {
        "ref": clearIconRef,
        "name": props.clearIcon,
        "class": bem$1b("clear")
      }, null), renderRightIcon(), slots.button && vue.createVNode("div", {
        "class": bem$1b("button")
      }, [slots.button()])]), renderWordLimit(), renderMessage()];
      useExpose({
        blur,
        focus,
        validate,
        formValue,
        resetValidation,
        getValidationStatus
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
      useEventListener("touchstart", onClear, {
        target: vue.computed(() => {
          var _a;
          return (_a = clearIconRef.value) == null ? void 0 : _a.$el;
        })
      });
      return () => {
        const disabled = getProp("disabled");
        const labelAlign = getProp("labelAlign");
        const Label = renderLabel();
        const LeftIcon = renderLeftIcon();
        return vue.createVNode(Cell, {
          "size": props.size,
          "icon": props.leftIcon,
          "class": bem$1b({
            error: showError.value,
            disabled,
            [`label-${labelAlign}`]: labelAlign
          }),
          "center": props.center,
          "border": props.border,
          "isLink": props.isLink,
          "clickable": props.clickable,
          "titleStyle": labelStyle.value,
          "valueClass": bem$1b("value"),
          "titleClass": [bem$1b("label", [labelAlign, {
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
  const Field = withInstall(stdin_default$1m);
  function usePopupState() {
    const state = vue.reactive({
      show: false
    });
    const toggle = (show) => {
      state.show = show;
    };
    const open = (props) => {
      extend(state, props, { transitionAppear: true });
      toggle(true);
    };
    const close = () => toggle(false);
    useExpose({ open, close, toggle });
    return {
      open,
      close,
      state,
      toggle
    };
  }
  function mountComponent(RootComponent) {
    const app = vue.createApp(RootComponent);
    const root = document.createElement("div");
    document.body.appendChild(root);
    return {
      instance: app.mount(root),
      unmount() {
        app.unmount();
        document.body.removeChild(root);
      }
    };
  }
  let lockCount = 0;
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
  const [name$1e, bem$1a] = createNamespace("toast");
  const popupInheritProps = ["show", "overlay", "teleport", "transition", "overlayClass", "overlayStyle", "closeOnClickOverlay"];
  const toastProps = {
    icon: String,
    show: Boolean,
    type: makeStringProp("text"),
    overlay: Boolean,
    message: numericProp,
    iconSize: numericProp,
    duration: makeNumberProp(2e3),
    position: makeStringProp("middle"),
    teleport: [String, Object],
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
  var stdin_default$1l = vue.defineComponent({
    name: name$1e,
    props: toastProps,
    emits: ["update:show"],
    setup(props, {
      emit
    }) {
      let timer2;
      let clickable = false;
      const toggleClickable = () => {
        const newValue = props.show && props.forbidClick;
        if (clickable !== newValue) {
          clickable = newValue;
          lockClick(clickable);
        }
      };
      const updateShow = (show) => emit("update:show", show);
      const onClick = () => {
        if (props.closeOnClick) {
          updateShow(false);
        }
      };
      const clearTimer = () => clearTimeout(timer2);
      const renderIcon = () => {
        const {
          icon,
          type,
          iconSize,
          iconPrefix,
          loadingType
        } = props;
        const hasIcon = icon || type === "success" || type === "fail";
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
      const renderMessage = () => {
        const {
          type,
          message
        } = props;
        if (isDef(message) && message !== "") {
          return type === "html" ? vue.createVNode("div", {
            "key": 0,
            "class": bem$1a("text"),
            "innerHTML": String(message)
          }, null) : vue.createVNode("div", {
            "class": bem$1a("text")
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
        "class": [bem$1a([props.position, {
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
  const defaultOptions$1 = {
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
  let queue = [];
  let allowMultiple = false;
  let currentOptions = extend({}, defaultOptions$1);
  const defaultOptionsMap = /* @__PURE__ */ new Map();
  function parseOptions$1(message) {
    if (isObject(message)) {
      return message;
    }
    return {
      message
    };
  }
  function createInstance() {
    const {
      instance: instance2,
      unmount
    } = mountComponent({
      setup() {
        const message = vue.ref("");
        const {
          open,
          state,
          close,
          toggle
        } = usePopupState();
        const onClosed = () => {
          if (allowMultiple) {
            queue = queue.filter((item) => item !== instance2);
            unmount();
          }
        };
        const render = () => {
          const attrs = {
            onClosed,
            "onUpdate:show": toggle
          };
          return vue.createVNode(stdin_default$1l, vue.mergeProps(state, attrs), null);
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
      const instance2 = createInstance();
      queue.push(instance2);
    }
    return queue[queue.length - 1];
  }
  function Toast(options = {}) {
    if (!inBrowser$1) {
      return {};
    }
    const toast = getInstance();
    const parsedOptions = parseOptions$1(options);
    toast.open(extend({}, currentOptions, defaultOptionsMap.get(parsedOptions.type || currentOptions.type), parsedOptions));
    return toast;
  }
  const createMethod = (type) => (options) => Toast(extend({
    type
  }, parseOptions$1(options)));
  Toast.loading = createMethod("loading");
  Toast.success = createMethod("success");
  Toast.fail = createMethod("fail");
  Toast.clear = (all) => {
    var _a;
    if (queue.length) {
      if (all) {
        queue.forEach((toast) => {
          toast.clear();
        });
        queue = [];
      } else if (!allowMultiple) {
        queue[0].clear();
      } else {
        (_a = queue.shift()) == null ? void 0 : _a.clear();
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
    app.use(withInstall(stdin_default$1l));
    app.config.globalProperties.$toast = Toast;
  };
  const [name$1d, bem$19] = createNamespace("switch");
  const switchProps = {
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
  var stdin_default$1k = vue.defineComponent({
    name: name$1d,
    props: switchProps,
    emits: ["change", "update:modelValue"],
    setup(props, {
      emit,
      slots
    }) {
      const isChecked = () => props.modelValue === props.activeValue;
      const onClick = () => {
        if (!props.disabled && !props.loading) {
          const newValue = isChecked() ? props.inactiveValue : props.activeValue;
          emit("update:modelValue", newValue);
          emit("change", newValue);
        }
      };
      const renderLoading = () => {
        if (props.loading) {
          const color = isChecked() ? props.activeColor : props.inactiveColor;
          return vue.createVNode(Loading, {
            "class": bem$19("loading"),
            "color": color
          }, null);
        }
        if (slots.node) {
          return slots.node();
        }
      };
      useCustomFieldValue(() => props.modelValue);
      return () => {
        var _a;
        const {
          size,
          loading,
          disabled,
          activeColor,
          inactiveColor
        } = props;
        const checked = isChecked();
        const style = {
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
          "tabindex": disabled ? void 0 : 0,
          "aria-checked": checked,
          "onClick": onClick
        }, [vue.createVNode("div", {
          "class": bem$19("node")
        }, [renderLoading()]), (_a = slots.background) == null ? void 0 : _a.call(slots)]);
      };
    }
  });
  const Switch = withInstall(stdin_default$1k);
  const [name$1c, bem$18] = createNamespace("address-edit-detail");
  const t$i = createNamespace("address-edit")[2];
  var stdin_default$1j = vue.defineComponent({
    name: name$1c,
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
    setup(props, {
      emit
    }) {
      const field = vue.ref();
      const showSearchResult = () => props.focused && props.searchResult && props.showSearchResult;
      const onSelect = (express) => {
        emit("select-search", express);
        emit("input", `${express.address || ""} ${express.name || ""}`.trim());
      };
      const renderSearchTitle = (express) => {
        if (express.name) {
          const text = express.name.replace(props.value, `<span class=${bem$18("keyword")}>${props.value}</span>`);
          return vue.createVNode("div", {
            "innerHTML": text
          }, null);
        }
      };
      const renderSearchResult = () => {
        if (!showSearchResult()) {
          return;
        }
        const {
          searchResult
        } = props;
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
      const onBlur = (event) => emit("blur", event);
      const onFocus = (event) => emit("focus", event);
      const onInput = (value) => emit("input", value);
      return () => {
        if (props.show) {
          return vue.createVNode(vue.Fragment, null, [vue.createVNode(Field, {
            "autosize": true,
            "clearable": true,
            "ref": field,
            "class": bem$18(),
            "rows": props.rows,
            "type": "textarea",
            "rules": props.rules,
            "label": t$i("addressDetail"),
            "border": !showSearchResult(),
            "maxlength": props.maxlength,
            "modelValue": props.value,
            "placeholder": t$i("addressDetail"),
            "onBlur": onBlur,
            "onFocus": onFocus,
            "onUpdate:modelValue": onInput
          }, null), renderSearchResult()]);
        }
      };
    }
  });
  const [name$1b, bem$17, t$h] = createNamespace("address-edit");
  const DEFAULT_DATA = {
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
  const isPostal = (value) => /^\d{6}$/.test(value);
  const addressEditProps = {
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
  var stdin_default$1i = vue.defineComponent({
    name: name$1b,
    props: addressEditProps,
    emits: ["save", "focus", "delete", "click-area", "change-area", "change-detail", "select-search", "change-default"],
    setup(props, {
      emit,
      slots
    }) {
      const areaRef = vue.ref();
      const data = vue.reactive({});
      const showAreaPopup = vue.ref(false);
      const detailFocused = vue.ref(false);
      const areaListLoaded = vue.computed(() => isObject(props.areaList) && Object.keys(props.areaList).length);
      const areaText = vue.computed(() => {
        const {
          country,
          province,
          city,
          county,
          areaCode
        } = data;
        if (areaCode) {
          const arr = [country, province, city, county];
          if (province && province === city) {
            arr.splice(1, 1);
          }
          return arr.filter(Boolean).join("/");
        }
        return "";
      });
      const hideBottomFields = vue.computed(() => {
        var _a;
        return ((_a = props.searchResult) == null ? void 0 : _a.length) && detailFocused.value;
      });
      const assignAreaValues = () => {
        if (areaRef.value) {
          const detail = areaRef.value.getArea();
          detail.areaCode = detail.code;
          delete detail.code;
          extend(data, detail);
        }
      };
      const onFocus = (key) => {
        detailFocused.value = key === "addressDetail";
        emit("focus", key);
      };
      const rules = vue.computed(() => {
        const {
          validator,
          telValidator,
          postalValidator
        } = props;
        const makeRule = (name2, emptyMessage) => ({
          validator: (value) => {
            if (validator) {
              const message = validator(name2, value);
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
      const onSave = () => emit("save", data);
      const onChangeDetail = (val) => {
        data.addressDetail = val;
        emit("change-detail", val);
      };
      const onAreaConfirm = (values) => {
        values = values.filter(Boolean);
        if (values.some((value) => !value.code)) {
          Toast(t$h("areaEmpty"));
        } else {
          showAreaPopup.value = false;
          assignAreaValues();
          emit("change-area", values);
        }
      };
      const onDelete = () => emit("delete", data);
      const getArea = () => {
        var _a;
        return ((_a = areaRef.value) == null ? void 0 : _a.getValues()) || [];
      };
      const setAreaCode = (code) => {
        data.areaCode = code || "";
        if (code) {
          vue.nextTick(assignAreaValues);
        }
      };
      const onDetailBlur = () => {
        setTimeout(() => {
          detailFocused.value = false;
        });
      };
      const setAddressDetail = (value) => {
        data.addressDetail = value;
      };
      const renderSetDefaultCell = () => {
        if (props.showSetDefault) {
          const slots2 = {
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
            "class": bem$17("default")
          }, slots2), [[vue.vShow, !hideBottomFields.value]]);
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
        const {
          disableArea
        } = props;
        return vue.createVNode(Form, {
          "class": bem$17(),
          "onSubmit": onSave
        }, {
          default: () => {
            var _a;
            return [vue.createVNode("div", {
              "class": bem$17("fields")
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
            }, null), [[vue.vShow, props.showArea]]), vue.createVNode(stdin_default$1j, {
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
            }, null), [[vue.vShow, !hideBottomFields.value]]), (_a = slots.default) == null ? void 0 : _a.call(slots)]), renderSetDefaultCell(), vue.withDirectives(vue.createVNode("div", {
              "class": bem$17("buttons")
            }, [vue.createVNode(Button, {
              "block": true,
              "round": true,
              "type": "danger",
              "text": props.saveButtonText || t$h("save"),
              "class": bem$17("button"),
              "loading": props.isSaving,
              "nativeType": "submit"
            }, null), props.showDelete && vue.createVNode(Button, {
              "block": true,
              "round": true,
              "class": bem$17("button"),
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
            })];
          }
        });
      };
    }
  });
  const AddressEdit = withInstall(stdin_default$1i);
  const [name$1a, bem$16] = createNamespace("radio-group");
  const radioGroupProps = {
    disabled: Boolean,
    iconSize: numericProp,
    direction: String,
    modelValue: unknownProp,
    checkedColor: String
  };
  const RADIO_KEY = Symbol(name$1a);
  var stdin_default$1h = vue.defineComponent({
    name: name$1a,
    props: radioGroupProps,
    emits: ["change", "update:modelValue"],
    setup(props, {
      emit,
      slots
    }) {
      const {
        linkChildren
      } = useChildren(RADIO_KEY);
      const updateValue = (value) => emit("update:modelValue", value);
      vue.watch(() => props.modelValue, (value) => emit("change", value));
      linkChildren({
        props,
        updateValue
      });
      useCustomFieldValue(() => props.modelValue);
      return () => {
        var _a;
        return vue.createVNode("div", {
          "class": bem$16([props.direction]),
          "role": "radiogroup"
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
      };
    }
  });
  const RadioGroup = withInstall(stdin_default$1h);
  const [name$19, bem$15] = createNamespace("tag");
  const tagProps = {
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
  var stdin_default$1g = vue.defineComponent({
    name: name$19,
    props: tagProps,
    emits: ["close"],
    setup(props, {
      slots,
      emit
    }) {
      const onClose = (event) => {
        event.stopPropagation();
        emit("close", event);
      };
      const getStyle = () => {
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
      const renderTag = () => {
        var _a;
        const {
          type,
          mark,
          plain,
          round: round2,
          size,
          closeable
        } = props;
        const classes = {
          mark,
          plain,
          round: round2
        };
        if (size) {
          classes[size] = size;
        }
        const CloseIcon = closeable && vue.createVNode(Icon, {
          "name": "cross",
          "class": [bem$15("close"), HAPTICS_FEEDBACK],
          "onClick": onClose
        }, null);
        return vue.createVNode("span", {
          "style": getStyle(),
          "class": bem$15([classes, type])
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots), CloseIcon]);
      };
      return () => vue.createVNode(vue.Transition, {
        "name": props.closeable ? "van-fade" : void 0
      }, {
        default: () => [props.show ? renderTag() : null]
      });
    }
  });
  const Tag = withInstall(stdin_default$1g);
  const checkerProps = {
    name: unknownProp,
    shape: makeStringProp("round"),
    disabled: Boolean,
    iconSize: numericProp,
    modelValue: unknownProp,
    checkedColor: String,
    labelPosition: String,
    labelDisabled: Boolean
  };
  var stdin_default$1f = vue.defineComponent({
    props: extend({}, checkerProps, {
      bem: makeRequiredProp(Function),
      role: String,
      parent: Object,
      checked: Boolean,
      bindGroup: truthProp
    }),
    emits: ["click", "toggle"],
    setup(props, {
      emit,
      slots
    }) {
      const iconRef = vue.ref();
      const getParentProp = (name2) => {
        if (props.parent && props.bindGroup) {
          return props.parent.props[name2];
        }
      };
      const disabled = vue.computed(() => getParentProp("disabled") || props.disabled);
      const direction = vue.computed(() => getParentProp("direction"));
      const iconStyle = vue.computed(() => {
        const checkedColor = props.checkedColor || getParentProp("checkedColor");
        if (checkedColor && props.checked && !disabled.value) {
          return {
            borderColor: checkedColor,
            backgroundColor: checkedColor
          };
        }
      });
      const onClick = (event) => {
        const {
          target
        } = event;
        const icon = iconRef.value;
        const iconClicked = icon === target || (icon == null ? void 0 : icon.contains(target));
        if (!disabled.value && (iconClicked || !props.labelDisabled)) {
          emit("toggle");
        }
        emit("click", event);
      };
      const renderIcon = () => {
        const {
          bem: bem2,
          shape,
          checked
        } = props;
        const iconSize = props.iconSize || getParentProp("iconSize");
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
      const renderLabel = () => {
        if (slots.default) {
          return vue.createVNode("span", {
            "class": props.bem("label", [props.labelPosition, {
              disabled: disabled.value
            }])
          }, [slots.default()]);
        }
      };
      return () => {
        const nodes = props.labelPosition === "left" ? [renderLabel(), renderIcon()] : [renderIcon(), renderLabel()];
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
  const [name$18, bem$14] = createNamespace("radio");
  var stdin_default$1e = vue.defineComponent({
    name: name$18,
    props: checkerProps,
    emits: ["update:modelValue"],
    setup(props, {
      emit,
      slots
    }) {
      const {
        parent
      } = useParent(RADIO_KEY);
      const checked = () => {
        const value = parent ? parent.props.modelValue : props.modelValue;
        return value === props.name;
      };
      const toggle = () => {
        if (parent) {
          parent.updateValue(props.name);
        } else {
          emit("update:modelValue", props.name);
        }
      };
      return () => vue.createVNode(stdin_default$1f, vue.mergeProps({
        "bem": bem$14,
        "role": "radio",
        "parent": parent,
        "checked": checked(),
        "onToggle": toggle
      }, props), pick(slots, ["default", "icon"]));
    }
  });
  const Radio = withInstall(stdin_default$1e);
  const [name$17, bem$13] = createNamespace("address-item");
  var stdin_default$1d = vue.defineComponent({
    name: name$17,
    props: {
      address: makeRequiredProp(Object),
      disabled: Boolean,
      switchable: Boolean,
      defaultTagText: String
    },
    emits: ["edit", "click", "select"],
    setup(props, {
      slots,
      emit
    }) {
      const onClick = () => {
        if (props.switchable) {
          emit("select");
        }
        emit("click");
      };
      const renderRightIcon = () => vue.createVNode(Icon, {
        "name": "edit",
        "class": bem$13("edit"),
        "onClick": (event) => {
          event.stopPropagation();
          emit("edit");
          emit("click");
        }
      }, null);
      const renderTag = () => {
        if (slots.tag) {
          return slots.tag(props.address);
        }
        if (props.address.isDefault && props.defaultTagText) {
          return vue.createVNode(Tag, {
            "type": "danger",
            "round": true,
            "class": bem$13("tag")
          }, {
            default: () => [props.defaultTagText]
          });
        }
      };
      const renderContent = () => {
        const {
          address,
          disabled,
          switchable
        } = props;
        const Info = [vue.createVNode("div", {
          "class": bem$13("name")
        }, [`${address.name} ${address.tel}`, renderTag()]), vue.createVNode("div", {
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
        var _a;
        const {
          disabled
        } = props;
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
        }), (_a = slots.bottom) == null ? void 0 : _a.call(slots, extend({}, props.address, {
          disabled
        }))]);
      };
    }
  });
  const [name$16, bem$12, t$g] = createNamespace("address-list");
  const addressListProps = {
    list: makeArrayProp(),
    modelValue: numericProp,
    switchable: truthProp,
    disabledText: String,
    disabledList: makeArrayProp(),
    addButtonText: String,
    defaultTagText: String
  };
  var stdin_default$1c = vue.defineComponent({
    name: name$16,
    props: addressListProps,
    emits: ["add", "edit", "select", "click-item", "edit-disabled", "select-disabled", "update:modelValue"],
    setup(props, {
      slots,
      emit
    }) {
      const renderItem = (item, index, disabled) => {
        const onEdit = () => emit(disabled ? "edit-disabled" : "edit", item, index);
        const onClick = () => emit("click-item", item, index);
        const onSelect = () => {
          emit(disabled ? "select-disabled" : "select", item, index);
          if (!disabled) {
            emit("update:modelValue", item.id);
          }
        };
        return vue.createVNode(stdin_default$1d, {
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
      const renderList = (list, disabled) => {
        if (list) {
          return list.map((item, index) => renderItem(item, index, disabled));
        }
      };
      const renderBottom = () => vue.createVNode("div", {
        "class": [bem$12("bottom"), "van-safe-area-bottom"]
      }, [vue.createVNode(Button, {
        "round": true,
        "block": true,
        "type": "danger",
        "text": props.addButtonText || t$g("add"),
        "class": bem$12("add"),
        "onClick": () => emit("add")
      }, null)]);
      return () => {
        var _a, _b;
        const List2 = renderList(props.list);
        const DisabledList = renderList(props.disabledList, true);
        const DisabledText = props.disabledText && vue.createVNode("div", {
          "class": bem$12("disabled-text")
        }, [props.disabledText]);
        return vue.createVNode("div", {
          "class": bem$12()
        }, [(_a = slots.top) == null ? void 0 : _a.call(slots), vue.createVNode(RadioGroup, {
          "modelValue": props.modelValue
        }, {
          default: () => [List2]
        }), DisabledText, DisabledList, (_b = slots.default) == null ? void 0 : _b.call(slots), renderBottom()]);
      };
    }
  });
  const AddressList = withInstall(stdin_default$1c);
  const [name$15, bem$11, t$f] = createNamespace("calendar");
  const formatMonthTitle = (date) => t$f("monthTitle", date.getFullYear(), date.getMonth() + 1);
  function compareMonth(date1, date2) {
    const year1 = date1.getFullYear();
    const year2 = date2.getFullYear();
    if (year1 === year2) {
      const month1 = date1.getMonth();
      const month2 = date2.getMonth();
      return month1 === month2 ? 0 : month1 > month2 ? 1 : -1;
    }
    return year1 > year2 ? 1 : -1;
  }
  function compareDay(day1, day2) {
    const compareMonthResult = compareMonth(day1, day2);
    if (compareMonthResult === 0) {
      const date1 = day1.getDate();
      const date2 = day2.getDate();
      return date1 === date2 ? 0 : date1 > date2 ? 1 : -1;
    }
    return compareMonthResult;
  }
  const cloneDate = (date) => new Date(date);
  const cloneDates = (dates) => Array.isArray(dates) ? dates.map(cloneDate) : cloneDate(dates);
  function getDayByOffset(date, offset2) {
    const cloned = cloneDate(date);
    cloned.setDate(cloned.getDate() + offset2);
    return cloned;
  }
  const getPrevDay = (date) => getDayByOffset(date, -1);
  const getNextDay = (date) => getDayByOffset(date, 1);
  const getToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };
  function calcDateNum(date) {
    const day1 = date[0].getTime();
    const day2 = date[1].getTime();
    return (day2 - day1) / (1e3 * 60 * 60 * 24) + 1;
  }
  function useRefs() {
    const refs = vue.ref([]);
    const cache = [];
    vue.onBeforeUpdate(() => {
      refs.value = [];
    });
    const setRefs = (index) => {
      if (!cache[index]) {
        cache[index] = (el) => {
          refs.value[index] = el;
        };
      }
      return cache[index];
    };
    return [refs, setRefs];
  }
  const sharedProps = extend({}, pickerSharedProps, {
    filter: Function,
    columnsOrder: Array,
    formatter: {
      type: Function,
      default: (type, value) => value
    }
  });
  const pickerInheritKeys = Object.keys(pickerSharedProps);
  function times(n, iteratee) {
    if (n < 0) {
      return [];
    }
    const result = Array(n);
    let index = -1;
    while (++index < n) {
      result[index] = iteratee(index);
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
  const getMonthEndDay = (year, month) => 32 - new Date(year, month - 1, 32).getDate();
  const proxyPickerMethods = (picker, callback) => {
    const methods = [
      "setValues",
      "setIndexes",
      "setColumnIndex",
      "setColumnValue"
    ];
    return new Proxy(picker, {
      get: (target, prop) => {
        if (methods.includes(prop)) {
          return (...args) => {
            target[prop](...args);
            callback();
          };
        }
        return target[prop];
      }
    });
  };
  const [name$14] = createNamespace("calendar-day");
  var stdin_default$1b = vue.defineComponent({
    name: name$14,
    props: {
      item: makeRequiredProp(Object),
      color: String,
      index: Number,
      offset: makeNumberProp(0),
      rowHeight: String
    },
    emits: ["click"],
    setup(props, {
      emit,
      slots
    }) {
      const style = vue.computed(() => {
        var _a;
        const {
          item,
          index,
          color,
          offset: offset2,
          rowHeight
        } = props;
        const style2 = {
          height: rowHeight
        };
        if (item.type === "placeholder") {
          style2.width = "100%";
          return style2;
        }
        if (index === 0) {
          style2.marginLeft = `${100 * offset2 / 7}%`;
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
        if (offset2 + (((_a = item.date) == null ? void 0 : _a.getDate()) || 1) > 28) {
          style2.marginBottom = 0;
        }
        return style2;
      });
      const onClick = () => {
        if (props.item.type !== "disabled") {
          emit("click", props.item);
        }
      };
      const renderTopInfo = () => {
        const {
          topInfo
        } = props.item;
        if (topInfo || slots["top-info"]) {
          return vue.createVNode("div", {
            "class": bem$11("top-info")
          }, [slots["top-info"] ? slots["top-info"](props.item) : topInfo]);
        }
      };
      const renderBottomInfo = () => {
        const {
          bottomInfo
        } = props.item;
        if (bottomInfo || slots["bottom-info"]) {
          return vue.createVNode("div", {
            "class": bem$11("bottom-info")
          }, [slots["bottom-info"] ? slots["bottom-info"](props.item) : bottomInfo]);
        }
      };
      const renderContent = () => {
        const {
          item,
          color,
          rowHeight
        } = props;
        const {
          type,
          text
        } = item;
        const Nodes = [renderTopInfo(), text, renderBottomInfo()];
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
        const {
          type,
          className
        } = props.item;
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
  const [name$13] = createNamespace("calendar-month");
  const calendarMonthProps = {
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
  var stdin_default$1a = vue.defineComponent({
    name: name$13,
    props: calendarMonthProps,
    emits: ["click", "update-height"],
    setup(props, {
      emit,
      slots
    }) {
      const [visible, setVisible] = useToggle();
      const daysRef = vue.ref();
      const monthRef = vue.ref();
      const height2 = useHeight(monthRef);
      const title = vue.computed(() => formatMonthTitle(props.date));
      const rowHeight = vue.computed(() => addUnit(props.rowHeight));
      const offset2 = vue.computed(() => {
        const realDay = props.date.getDay();
        if (props.firstDayOfWeek) {
          return (realDay + 7 - props.firstDayOfWeek) % 7;
        }
        return realDay;
      });
      const totalDay = vue.computed(() => getMonthEndDay(props.date.getFullYear(), props.date.getMonth() + 1));
      const shouldRender = vue.computed(() => visible.value || !props.lazyRender);
      const getTitle = () => title.value;
      const getMultipleDayType = (day) => {
        const isSelected = (date) => props.currentDate.some((item) => compareDay(item, date) === 0);
        if (isSelected(day)) {
          const prevDay = getPrevDay(day);
          const nextDay = getNextDay(day);
          const prevSelected = isSelected(prevDay);
          const nextSelected = isSelected(nextDay);
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
      const getRangeDayType = (day) => {
        const [startDay, endDay] = props.currentDate;
        if (!startDay) {
          return "";
        }
        const compareToStart = compareDay(day, startDay);
        if (!endDay) {
          return compareToStart === 0 ? "start" : "";
        }
        const compareToEnd = compareDay(day, endDay);
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
      const getDayType = (day) => {
        const {
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
      const getBottomInfo = (dayType) => {
        if (props.type === "range") {
          if (dayType === "start" || dayType === "end") {
            return t$f(dayType);
          }
          if (dayType === "start-end") {
            return `${t$f("start")}/${t$f("end")}`;
          }
        }
      };
      const renderTitle = () => {
        if (props.showMonthTitle) {
          return vue.createVNode("div", {
            "class": bem$11("month-title")
          }, [title.value]);
        }
      };
      const renderMark = () => {
        if (props.showMark && shouldRender.value) {
          return vue.createVNode("div", {
            "class": bem$11("month-mark")
          }, [props.date.getMonth() + 1]);
        }
      };
      const placeholders = vue.computed(() => {
        const count = Math.ceil((totalDay.value + offset2.value) / 7);
        return Array(count).fill({
          type: "placeholder"
        });
      });
      const days = vue.computed(() => {
        const days2 = [];
        const year = props.date.getFullYear();
        const month = props.date.getMonth();
        for (let day = 1; day <= totalDay.value; day++) {
          const date = new Date(year, month, day);
          const type = getDayType(date);
          let config = {
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
      const disabledDays = vue.computed(() => days.value.filter((day) => day.type === "disabled"));
      const scrollToDate = (body, targetDate) => {
        if (daysRef.value) {
          const daysRect = useRect(daysRef.value);
          const totalRows = placeholders.value.length;
          const currentRow = Math.ceil((targetDate.getDate() + offset2.value) / 7);
          const rowOffset = (currentRow - 1) * daysRect.height / totalRows;
          setScrollTop(body, daysRect.top + rowOffset + body.scrollTop - useRect(body).top);
        }
      };
      const renderDay = (item, index) => vue.createVNode(stdin_default$1b, {
        "item": item,
        "index": index,
        "color": props.color,
        "offset": offset2.value,
        "rowHeight": rowHeight.value,
        "onClick": (item2) => emit("click", item2)
      }, pick(slots, ["top-info", "bottom-info"]));
      const renderDays = () => vue.createVNode("div", {
        "ref": daysRef,
        "role": "grid",
        "class": bem$11("days")
      }, [renderMark(), (shouldRender.value ? days : placeholders).value.map(renderDay)]);
      useExpose({
        getTitle,
        getHeight: () => height2.value,
        setVisible,
        scrollToDate,
        disabledDays
      });
      return () => vue.createVNode("div", {
        "class": bem$11("month"),
        "ref": monthRef
      }, [renderTitle(), renderDays()]);
    }
  });
  const [name$12] = createNamespace("calendar-header");
  var stdin_default$19 = vue.defineComponent({
    name: name$12,
    props: {
      title: String,
      subtitle: String,
      showTitle: Boolean,
      showSubtitle: Boolean,
      firstDayOfWeek: Number
    },
    emits: ["click-subtitle"],
    setup(props, {
      slots,
      emit
    }) {
      const renderTitle = () => {
        if (props.showTitle) {
          const text = props.title || t$f("title");
          const title = slots.title ? slots.title() : text;
          return vue.createVNode("div", {
            "class": bem$11("header-title")
          }, [title]);
        }
      };
      const onClickSubtitle = (event) => emit("click-subtitle", event);
      const renderSubtitle = () => {
        if (props.showSubtitle) {
          const title = slots.subtitle ? slots.subtitle() : props.subtitle;
          return vue.createVNode("div", {
            "class": bem$11("header-subtitle"),
            "onClick": onClickSubtitle
          }, [title]);
        }
      };
      const renderWeekDays = () => {
        const {
          firstDayOfWeek
        } = props;
        const weekdays = t$f("weekdays");
        const renderWeekDays2 = [...weekdays.slice(firstDayOfWeek, 7), ...weekdays.slice(0, firstDayOfWeek)];
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
  const calendarProps = {
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
    safeAreaInsetTop: Boolean,
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
        const now = getToday();
        return new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
      }
    },
    firstDayOfWeek: {
      type: numericProp,
      default: 0,
      validator: (val) => val >= 0 && val <= 6
    }
  };
  var stdin_default$18 = vue.defineComponent({
    name: name$15,
    props: calendarProps,
    emits: ["select", "confirm", "unselect", "month-show", "over-range", "update:show", "click-subtitle"],
    setup(props, {
      emit,
      slots
    }) {
      const limitDateRange = (date, minDate = props.minDate, maxDate = props.maxDate) => {
        if (compareDay(date, minDate) === -1) {
          return minDate;
        }
        if (compareDay(date, maxDate) === 1) {
          return maxDate;
        }
        return date;
      };
      const getInitialDate = (defaultDate = props.defaultDate) => {
        const {
          type,
          minDate,
          maxDate,
          allowSameDay
        } = props;
        if (defaultDate === null) {
          return defaultDate;
        }
        const now = getToday();
        if (type === "range") {
          if (!Array.isArray(defaultDate)) {
            defaultDate = [];
          }
          const start2 = limitDateRange(defaultDate[0] || now, minDate, allowSameDay ? maxDate : getPrevDay(maxDate));
          const end2 = limitDateRange(defaultDate[1] || now, allowSameDay ? minDate : getNextDay(minDate));
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
      let bodyHeight;
      const bodyRef = vue.ref();
      const subtitle = vue.ref("");
      const currentDate = vue.ref(getInitialDate());
      const [monthRefs, setMonthRefs] = useRefs();
      const dayOffset = vue.computed(() => props.firstDayOfWeek ? +props.firstDayOfWeek % 7 : 0);
      const months = vue.computed(() => {
        const months2 = [];
        const cursor = new Date(props.minDate);
        cursor.setDate(1);
        do {
          months2.push(new Date(cursor));
          cursor.setMonth(cursor.getMonth() + 1);
        } while (compareMonth(cursor, props.maxDate) !== 1);
        return months2;
      });
      const buttonDisabled = vue.computed(() => {
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
      const getSelectedDate = () => currentDate.value;
      const onScroll = () => {
        const top2 = getScrollTop(bodyRef.value);
        const bottom2 = top2 + bodyHeight;
        const heights = months.value.map((item, index) => monthRefs.value[index].getHeight());
        const heightSum = heights.reduce((a, b) => a + b, 0);
        if (bottom2 > heightSum && top2 > 0) {
          return;
        }
        let height2 = 0;
        let currentMonth;
        const visibleRange = [-1, -1];
        for (let i = 0; i < months.value.length; i++) {
          const month = monthRefs.value[i];
          const visible = height2 <= bottom2 && height2 + heights[i] >= top2;
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
        months.value.forEach((month, index) => {
          const visible = index >= visibleRange[0] - 1 && index <= visibleRange[1] + 1;
          monthRefs.value[index].setVisible(visible);
        });
        if (currentMonth) {
          subtitle.value = currentMonth.getTitle();
        }
      };
      const scrollToDate = (targetDate) => {
        raf(() => {
          months.value.some((month, index) => {
            if (compareMonth(month, targetDate) === 0) {
              if (bodyRef.value) {
                monthRefs.value[index].scrollToDate(bodyRef.value, targetDate);
              }
              return true;
            }
            return false;
          });
          onScroll();
        });
      };
      const scrollToCurrentDate = () => {
        if (props.poppable && !props.show) {
          return;
        }
        if (currentDate.value) {
          const targetDate = props.type === "single" ? currentDate.value : currentDate.value[0];
          if (isDate(targetDate)) {
            scrollToDate(targetDate);
          }
        } else {
          raf(onScroll);
        }
      };
      const init = () => {
        if (props.poppable && !props.show) {
          return;
        }
        raf(() => {
          bodyHeight = Math.floor(useRect(bodyRef).height);
        });
        scrollToCurrentDate();
      };
      const reset = (date = getInitialDate()) => {
        currentDate.value = date;
        scrollToCurrentDate();
      };
      const checkRange = (date) => {
        const {
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
      const onConfirm = () => {
        var _a;
        return emit("confirm", (_a = currentDate.value) != null ? _a : cloneDates(currentDate.value));
      };
      const select = (date, complete) => {
        const setCurrentDate = (date2) => {
          currentDate.value = date2;
          emit("select", cloneDates(date2));
        };
        if (complete && props.type === "range") {
          const valid = checkRange(date);
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
      const getDisabledDate = (disabledDays2, startDay, date) => {
        var _a;
        return (_a = disabledDays2.find((day) => compareDay(startDay, day.date) === -1 && compareDay(day.date, date) === -1)) == null ? void 0 : _a.date;
      };
      const disabledDays = vue.computed(() => monthRefs.value.reduce((arr, ref2) => {
        var _a, _b;
        arr.push(...(_b = (_a = ref2.disabledDays) == null ? void 0 : _a.value) != null ? _b : []);
        return arr;
      }, []));
      const onClickDay = (item) => {
        if (props.readonly || !item.date) {
          return;
        }
        const {
          date
        } = item;
        const {
          type
        } = props;
        if (type === "range") {
          if (!currentDate.value) {
            select([date]);
            return;
          }
          const [startDay, endDay] = currentDate.value;
          if (startDay && !endDay) {
            const compareToStart = compareDay(date, startDay);
            if (compareToStart === 1) {
              const disabledDay = getDisabledDate(disabledDays.value, startDay, date);
              if (disabledDay) {
                const endDay2 = getPrevDay(disabledDay);
                if (compareDay(startDay, endDay2) === -1) {
                  select([startDay, endDay2]);
                } else {
                  select([date]);
                }
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
          const dates = currentDate.value;
          const selectedIndex = dates.findIndex((dateItem) => compareDay(dateItem, date) === 0);
          if (selectedIndex !== -1) {
            const [unselectedDate] = dates.splice(selectedIndex, 1);
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
      const updateShow = (value) => emit("update:show", value);
      const renderMonth = (date, index) => {
        const showMonthTitle = index !== 0 || !props.showSubtitle;
        return vue.createVNode(stdin_default$1a, vue.mergeProps({
          "ref": setMonthRefs(index),
          "date": date,
          "currentDate": currentDate.value,
          "showMonthTitle": showMonthTitle,
          "firstDayOfWeek": dayOffset.value
        }, pick(props, ["type", "color", "minDate", "maxDate", "showMark", "formatter", "rowHeight", "lazyRender", "showSubtitle", "allowSameDay"]), {
          "onClick": onClickDay
        }), pick(slots, ["top-info", "bottom-info"]));
      };
      const renderFooterButton = () => {
        if (slots.footer) {
          return slots.footer();
        }
        if (props.showConfirm) {
          const slot = slots["confirm-text"];
          const disabled = buttonDisabled.value;
          const text = disabled ? props.confirmDisabledText : props.confirmText;
          return vue.createVNode(Button, {
            "round": true,
            "block": true,
            "type": "danger",
            "color": props.color,
            "class": bem$11("confirm"),
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
      const renderFooter = () => vue.createVNode("div", {
        "class": [bem$11("footer"), {
          "van-safe-area-bottom": props.safeAreaInsetBottom
        }]
      }, [renderFooterButton()]);
      const renderCalendar = () => vue.createVNode("div", {
        "class": bem$11()
      }, [vue.createVNode(stdin_default$19, {
        "title": props.title,
        "subtitle": subtitle.value,
        "showTitle": props.showTitle,
        "showSubtitle": props.showSubtitle,
        "firstDayOfWeek": dayOffset.value,
        "onClick-subtitle": (event) => emit("click-subtitle", event)
      }, pick(slots, ["title", "subtitle"])), vue.createVNode("div", {
        "ref": bodyRef,
        "class": bem$11("body"),
        "onScroll": onScroll
      }, [months.value.map(renderMonth)]), renderFooter()]);
      vue.watch(() => props.show, init);
      vue.watch(() => [props.type, props.minDate, props.maxDate], () => reset(getInitialDate(currentDate.value)));
      vue.watch(() => props.defaultDate, (value = null) => {
        currentDate.value = value;
        scrollToCurrentDate();
      });
      useExpose({
        reset,
        scrollToDate,
        getSelectedDate
      });
      onMountedOrActivated(init);
      return () => {
        if (props.poppable) {
          return vue.createVNode(Popup, {
            "show": props.show,
            "class": bem$11("popup"),
            "round": props.round,
            "position": props.position,
            "closeable": props.showTitle || props.showSubtitle,
            "teleport": props.teleport,
            "closeOnPopstate": props.closeOnPopstate,
            "safeAreaInsetTop": props.safeAreaInsetTop,
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
  const Calendar = withInstall(stdin_default$18);
  const [name$11, bem$10] = createNamespace("image");
  const imageProps = {
    src: String,
    alt: String,
    fit: String,
    position: String,
    round: Boolean,
    block: Boolean,
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
  var stdin_default$17 = vue.defineComponent({
    name: name$11,
    props: imageProps,
    emits: ["load", "error"],
    setup(props, {
      emit,
      slots
    }) {
      const error = vue.ref(false);
      const loading = vue.ref(true);
      const imageRef = vue.ref();
      const {
        $Lazyload
      } = vue.getCurrentInstance().proxy;
      const style = vue.computed(() => {
        const style2 = {
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
      const onLoad = (event) => {
        loading.value = false;
        emit("load", event);
      };
      const onError = (event) => {
        error.value = true;
        loading.value = false;
        emit("error", event);
      };
      const renderIcon = (name2, className, slot) => {
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
      const renderPlaceholder = () => {
        if (loading.value && props.showLoading) {
          return vue.createVNode("div", {
            "class": bem$10("loading")
          }, [renderIcon(props.loadingIcon, bem$10("loading-icon"), slots.loading)]);
        }
        if (error.value && props.showError) {
          return vue.createVNode("div", {
            "class": bem$10("error")
          }, [renderIcon(props.errorIcon, bem$10("error-icon"), slots.error)]);
        }
      };
      const renderImage = () => {
        if (error.value || !props.src) {
          return;
        }
        const attrs = {
          alt: props.alt,
          class: bem$10("img"),
          style: {
            objectFit: props.fit,
            objectPosition: props.position
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
      const onLazyLoaded = ({
        el
      }) => {
        const check = () => {
          if (el === imageRef.value && loading.value) {
            onLoad();
          }
        };
        if (imageRef.value) {
          check();
        } else {
          vue.nextTick(check);
        }
      };
      const onLazyLoadError = ({
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
      return () => {
        var _a;
        return vue.createVNode("div", {
          "class": bem$10({
            round: props.round,
            block: props.block
          }),
          "style": style.value
        }, [renderImage(), renderPlaceholder(), (_a = slots.default) == null ? void 0 : _a.call(slots)]);
      };
    }
  });
  const Image$1 = withInstall(stdin_default$17);
  const [name$10, bem$$] = createNamespace("card");
  const cardProps = {
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
  var stdin_default$16 = vue.defineComponent({
    name: name$10,
    props: cardProps,
    emits: ["click-thumb"],
    setup(props, {
      slots,
      emit
    }) {
      const renderTitle = () => {
        if (slots.title) {
          return slots.title();
        }
        if (props.title) {
          return vue.createVNode("div", {
            "class": [bem$$("title"), "van-multi-ellipsis--l2"]
          }, [props.title]);
        }
      };
      const renderThumbTag = () => {
        if (slots.tag || props.tag) {
          return vue.createVNode("div", {
            "class": bem$$("tag")
          }, [slots.tag ? slots.tag() : vue.createVNode(Tag, {
            "mark": true,
            "type": "danger"
          }, {
            default: () => [props.tag]
          })]);
        }
      };
      const renderThumbImage = () => {
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
      const renderThumb = () => {
        if (slots.thumb || props.thumb) {
          return vue.createVNode("a", {
            "href": props.thumbLink,
            "class": bem$$("thumb"),
            "onClick": (event) => emit("click-thumb", event)
          }, [renderThumbImage(), renderThumbTag()]);
        }
      };
      const renderDesc = () => {
        if (slots.desc) {
          return slots.desc();
        }
        if (props.desc) {
          return vue.createVNode("div", {
            "class": [bem$$("desc"), "van-ellipsis"]
          }, [props.desc]);
        }
      };
      const renderPriceText = () => {
        const priceArr = props.price.toString().split(".");
        return vue.createVNode("div", null, [vue.createVNode("span", {
          "class": bem$$("price-currency")
        }, [props.currency]), vue.createVNode("span", {
          "class": bem$$("price-integer")
        }, [priceArr[0]]), vue.createTextVNode("."), vue.createVNode("span", {
          "class": bem$$("price-decimal")
        }, [priceArr[1]])]);
      };
      return () => {
        var _a, _b, _c;
        const showNum = slots.num || isDef(props.num);
        const showPrice = slots.price || isDef(props.price);
        const showOriginPrice = slots["origin-price"] || isDef(props.originPrice);
        const showBottom = showNum || showPrice || showOriginPrice || slots.bottom;
        const Price = showPrice && vue.createVNode("div", {
          "class": bem$$("price")
        }, [slots.price ? slots.price() : renderPriceText()]);
        const OriginPrice = showOriginPrice && vue.createVNode("div", {
          "class": bem$$("origin-price")
        }, [slots["origin-price"] ? slots["origin-price"]() : `${props.currency} ${props.originPrice}`]);
        const Num = showNum && vue.createVNode("div", {
          "class": bem$$("num")
        }, [slots.num ? slots.num() : `x${props.num}`]);
        const Footer = slots.footer && vue.createVNode("div", {
          "class": bem$$("footer")
        }, [slots.footer()]);
        const Bottom = showBottom && vue.createVNode("div", {
          "class": bem$$("bottom")
        }, [(_a = slots["price-top"]) == null ? void 0 : _a.call(slots), Price, OriginPrice, Num, (_b = slots.bottom) == null ? void 0 : _b.call(slots)]);
        return vue.createVNode("div", {
          "class": bem$$()
        }, [vue.createVNode("div", {
          "class": bem$$("header")
        }, [renderThumb(), vue.createVNode("div", {
          "class": bem$$("content", {
            centered: props.centered
          })
        }, [vue.createVNode("div", null, [renderTitle(), renderDesc(), (_c = slots.tags) == null ? void 0 : _c.call(slots)]), Bottom])]), Footer]);
      };
    }
  });
  const Card = withInstall(stdin_default$16);
  function scrollLeftTo(scroller, to, duration) {
    let count = 0;
    const from = scroller.scrollLeft;
    const frames = duration === 0 ? 1 : Math.round(duration * 1e3 / 16);
    function animate() {
      scroller.scrollLeft += (to - from) / frames;
      if (++count < frames) {
        raf(animate);
      }
    }
    animate();
  }
  function scrollTopTo(scroller, to, duration, callback) {
    let current2 = getScrollTop(scroller);
    const isDown = current2 < to;
    const frames = duration === 0 ? 1 : Math.round(duration * 1e3 / 16);
    const step = (to - current2) / frames;
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
    const observer = new IntersectionObserver(
      (entries) => {
        onChange(entries[0].intersectionRatio > 0);
      },
      { root: document.body }
    );
    const observe = () => {
      if (target.value) {
        observer.observe(target.value);
      }
    };
    const unobserve = () => {
      if (target.value) {
        observer.unobserve(target.value);
      }
    };
    vue.onDeactivated(unobserve);
    vue.onBeforeUnmount(unobserve);
    onMountedOrActivated(observe);
  }
  const [name$$, bem$_] = createNamespace("sticky");
  const stickyProps = {
    zIndex: numericProp,
    position: makeStringProp("top"),
    container: Object,
    offsetTop: makeNumericProp(0),
    offsetBottom: makeNumericProp(0)
  };
  var stdin_default$15 = vue.defineComponent({
    name: name$$,
    props: stickyProps,
    emits: ["scroll", "change"],
    setup(props, {
      emit,
      slots
    }) {
      const root = vue.ref();
      const scrollParent = useScrollParent(root);
      const state = vue.reactive({
        fixed: false,
        width: 0,
        height: 0,
        transform: 0
      });
      const offset2 = vue.computed(() => unitToPx(props.position === "top" ? props.offsetTop : props.offsetBottom));
      const rootStyle = vue.computed(() => {
        const {
          fixed,
          height: height2,
          width: width2
        } = state;
        if (fixed) {
          return {
            width: `${width2}px`,
            height: `${height2}px`
          };
        }
      });
      const stickyStyle = vue.computed(() => {
        if (!state.fixed) {
          return;
        }
        const style = extend(getZIndexStyle(props.zIndex), {
          width: `${state.width}px`,
          height: `${state.height}px`,
          [props.position]: `${offset2.value}px`
        });
        if (state.transform) {
          style.transform = `translate3d(0, ${state.transform}px, 0)`;
        }
        return style;
      });
      const emitScroll = (scrollTop) => emit("scroll", {
        scrollTop,
        isFixed: state.fixed
      });
      const onScroll = () => {
        if (!root.value || isHidden(root)) {
          return;
        }
        const {
          container,
          position
        } = props;
        const rootRect = useRect(root);
        const scrollTop = getScrollTop(window);
        state.width = rootRect.width;
        state.height = rootRect.height;
        if (position === "top") {
          if (container) {
            const containerRect = useRect(container);
            const difference = containerRect.bottom - offset2.value - state.height;
            state.fixed = offset2.value > rootRect.top && containerRect.bottom > 0;
            state.transform = difference < 0 ? difference : 0;
          } else {
            state.fixed = offset2.value > rootRect.top;
          }
        } else {
          const {
            clientHeight
          } = document.documentElement;
          if (container) {
            const containerRect = useRect(container);
            const difference = clientHeight - containerRect.top - offset2.value - state.height;
            state.fixed = clientHeight - offset2.value < rootRect.bottom && clientHeight > containerRect.top;
            state.transform = difference < 0 ? -difference : 0;
          } else {
            state.fixed = clientHeight - offset2.value < rootRect.bottom;
          }
        }
        emitScroll(scrollTop);
      };
      vue.watch(() => state.fixed, (value) => emit("change", value));
      useEventListener("scroll", onScroll, {
        target: scrollParent,
        passive: true
      });
      useVisibilityChange(root, onScroll);
      return () => {
        var _a;
        return vue.createVNode("div", {
          "ref": root,
          "style": rootStyle.value
        }, [vue.createVNode("div", {
          "class": bem$_({
            fixed: state.fixed
          }),
          "style": stickyStyle.value
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]);
      };
    }
  });
  const Sticky = withInstall(stdin_default$15);
  const [name$_, bem$Z] = createNamespace("tab");
  var stdin_default$14 = vue.defineComponent({
    name: name$_,
    props: {
      id: String,
      dot: Boolean,
      type: String,
      color: String,
      title: String,
      badge: numericProp,
      shrink: Boolean,
      isActive: Boolean,
      disabled: Boolean,
      controls: String,
      scrollable: Boolean,
      activeColor: String,
      inactiveColor: String,
      showZeroBadge: truthProp
    },
    setup(props, {
      slots
    }) {
      const style = vue.computed(() => {
        const style2 = {};
        const {
          type,
          color,
          disabled,
          isActive,
          activeColor,
          inactiveColor
        } = props;
        const isCard = type === "card";
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
        const titleColor = isActive ? activeColor : inactiveColor;
        if (titleColor) {
          style2.color = titleColor;
        }
        return style2;
      });
      const renderText = () => {
        const Text2 = vue.createVNode("span", {
          "class": bem$Z("text", {
            ellipsis: !props.scrollable
          })
        }, [slots.title ? slots.title() : props.title]);
        if (props.dot || isDef(props.badge) && props.badge !== "") {
          return vue.createVNode(Badge, {
            "dot": props.dot,
            "content": props.badge,
            "showZero": props.showZeroBadge
          }, {
            default: () => [Text2]
          });
        }
        return Text2;
      };
      return () => vue.createVNode("div", {
        "id": props.id,
        "role": "tab",
        "class": [bem$Z([props.type, {
          grow: props.scrollable && !props.shrink,
          shrink: props.shrink,
          active: props.isActive,
          disabled: props.disabled
        }])],
        "style": style.value,
        "tabindex": props.disabled ? void 0 : props.isActive ? 0 : -1,
        "aria-selected": props.isActive,
        "aria-disabled": props.disabled || void 0,
        "aria-controls": props.controls
      }, [renderText()]);
    }
  });
  const [name$Z, bem$Y] = createNamespace("swipe");
  const swipeProps = {
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
  const SWIPE_KEY = Symbol(name$Z);
  var stdin_default$13 = vue.defineComponent({
    name: name$Z,
    props: swipeProps,
    emits: ["change"],
    setup(props, {
      emit,
      slots
    }) {
      const root = vue.ref();
      const track = vue.ref();
      const state = vue.reactive({
        rect: null,
        width: 0,
        height: 0,
        offset: 0,
        active: 0,
        swiping: false
      });
      const touch = useTouch();
      const {
        children,
        linkChildren
      } = useChildren(SWIPE_KEY);
      const count = vue.computed(() => children.length);
      const size = vue.computed(() => state[props.vertical ? "height" : "width"]);
      const delta = vue.computed(() => props.vertical ? touch.deltaY.value : touch.deltaX.value);
      const minOffset = vue.computed(() => {
        if (state.rect) {
          const base = props.vertical ? state.rect.height : state.rect.width;
          return base - size.value * count.value;
        }
        return 0;
      });
      const maxCount = vue.computed(() => Math.ceil(Math.abs(minOffset.value) / size.value));
      const trackSize = vue.computed(() => count.value * size.value);
      const activeIndicator = vue.computed(() => (state.active + count.value) % count.value);
      const isCorrectDirection = vue.computed(() => {
        const expect = props.vertical ? "vertical" : "horizontal";
        return touch.direction.value === expect;
      });
      const trackStyle = vue.computed(() => {
        const style = {
          transitionDuration: `${state.swiping ? 0 : props.duration}ms`,
          transform: `translate${props.vertical ? "Y" : "X"}(${state.offset}px)`
        };
        if (size.value) {
          const mainAxis = props.vertical ? "height" : "width";
          const crossAxis = props.vertical ? "width" : "height";
          style[mainAxis] = `${trackSize.value}px`;
          style[crossAxis] = props[crossAxis] ? `${props[crossAxis]}px` : "";
        }
        return style;
      });
      const getTargetActive = (pace) => {
        const {
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
      const getTargetOffset = (targetActive, offset2 = 0) => {
        let currentPosition = targetActive * size.value;
        if (!props.loop) {
          currentPosition = Math.min(currentPosition, -minOffset.value);
        }
        let targetOffset = offset2 - currentPosition;
        if (!props.loop) {
          targetOffset = clamp(targetOffset, minOffset.value, 0);
        }
        return targetOffset;
      };
      const move = ({
        pace = 0,
        offset: offset2 = 0,
        emitChange
      }) => {
        if (count.value <= 1) {
          return;
        }
        const {
          active
        } = state;
        const targetActive = getTargetActive(pace);
        const targetOffset = getTargetOffset(targetActive, offset2);
        if (props.loop) {
          if (children[0] && targetOffset !== minOffset.value) {
            const outRightBound = targetOffset < minOffset.value;
            children[0].setOffset(outRightBound ? trackSize.value : 0);
          }
          if (children[count.value - 1] && targetOffset !== 0) {
            const outLeftBound = targetOffset > 0;
            children[count.value - 1].setOffset(outLeftBound ? -trackSize.value : 0);
          }
        }
        state.active = targetActive;
        state.offset = targetOffset;
        if (emitChange && targetActive !== active) {
          emit("change", activeIndicator.value);
        }
      };
      const correctPosition = () => {
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
      const prev = () => {
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
      const next = () => {
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
      let autoplayTimer;
      const stopAutoplay = () => clearTimeout(autoplayTimer);
      const autoplay = () => {
        stopAutoplay();
        if (props.autoplay > 0 && count.value > 1) {
          autoplayTimer = setTimeout(() => {
            next();
            autoplay();
          }, +props.autoplay);
        }
      };
      const initialize = (active = +props.initialSwipe) => {
        if (!root.value) {
          return;
        }
        const cb = () => {
          var _a, _b;
          if (!isHidden(root)) {
            const rect = {
              width: root.value.offsetWidth,
              height: root.value.offsetHeight
            };
            state.rect = rect;
            state.width = +((_a = props.width) != null ? _a : rect.width);
            state.height = +((_b = props.height) != null ? _b : rect.height);
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
        if (isHidden(root)) {
          vue.nextTick().then(cb);
        } else {
          cb();
        }
      };
      const resize = () => initialize(state.active);
      let touchStartTime;
      const onTouchStart = (event) => {
        if (!props.touchable)
          return;
        touch.start(event);
        touchStartTime = Date.now();
        stopAutoplay();
        correctPosition();
      };
      const onTouchMove = (event) => {
        if (props.touchable && state.swiping) {
          touch.move(event);
          if (isCorrectDirection.value) {
            const isEdgeTouch = !props.loop && (state.active === 0 && delta.value > 0 || state.active === count.value - 1 && delta.value < 0);
            if (!isEdgeTouch) {
              preventDefault(event, props.stopPropagation);
              move({
                offset: delta.value
              });
            }
          }
        }
      };
      const onTouchEnd = () => {
        if (!props.touchable || !state.swiping) {
          return;
        }
        const duration = Date.now() - touchStartTime;
        const speed = delta.value / duration;
        const shouldSwipe = Math.abs(speed) > 0.25 || Math.abs(delta.value) > size.value / 2;
        if (shouldSwipe && isCorrectDirection.value) {
          const offset2 = props.vertical ? touch.offsetY.value : touch.offsetX.value;
          let pace = 0;
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
      const swipeTo = (index, options = {}) => {
        correctPosition();
        touch.reset();
        doubleRaf(() => {
          let targetIndex;
          if (props.loop && index === count.value) {
            targetIndex = state.active === 0 ? 0 : index;
          } else {
            targetIndex = index % count.value;
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
      const renderDot = (_, index) => {
        const active = index === activeIndicator.value;
        const style = active ? {
          backgroundColor: props.indicatorColor
        } : void 0;
        return vue.createVNode("i", {
          "style": style,
          "class": bem$Y("indicator", {
            active
          })
        }, null);
      };
      const renderIndicator = () => {
        if (slots.indicator) {
          return slots.indicator({
            active: activeIndicator.value,
            total: count.value
          });
        }
        if (props.showIndicators && count.value > 1) {
          return vue.createVNode("div", {
            "class": bem$Y("indicators", {
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
      useEventListener("touchmove", onTouchMove, {
        target: track
      });
      return () => {
        var _a;
        return vue.createVNode("div", {
          "ref": root,
          "class": bem$Y()
        }, [vue.createVNode("div", {
          "ref": track,
          "style": trackStyle.value,
          "class": bem$Y("track", {
            vertical: props.vertical
          }),
          "onTouchstartPassive": onTouchStart,
          "onTouchend": onTouchEnd,
          "onTouchcancel": onTouchEnd
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), renderIndicator()]);
      };
    }
  });
  const Swipe = withInstall(stdin_default$13);
  const [name$Y, bem$X] = createNamespace("tabs");
  var stdin_default$12 = vue.defineComponent({
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
    setup(props, {
      emit,
      slots
    }) {
      const swipeRef = vue.ref();
      const onChange = (index) => emit("change", index);
      const renderChildren = () => {
        var _a;
        const Content = (_a = slots.default) == null ? void 0 : _a.call(slots);
        if (props.animated || props.swipeable) {
          return vue.createVNode(Swipe, {
            "ref": swipeRef,
            "loop": false,
            "class": bem$X("track"),
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
      const swipeToCurrentTab = (index) => {
        const swipe = swipeRef.value;
        if (swipe && swipe.state.active !== index) {
          swipe.swipeTo(index, {
            immediate: !props.inited
          });
        }
      };
      vue.watch(() => props.currentIndex, swipeToCurrentTab);
      vue.onMounted(() => {
        swipeToCurrentTab(props.currentIndex);
      });
      useExpose({
        swipeRef
      });
      return () => vue.createVNode("div", {
        "class": bem$X("content", {
          animated: props.animated || props.swipeable
        })
      }, [renderChildren()]);
    }
  });
  const [name$X, bem$W] = createNamespace("tabs");
  const tabsProps = {
    type: makeStringProp("line"),
    color: String,
    border: Boolean,
    sticky: Boolean,
    shrink: Boolean,
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
  const TABS_KEY = Symbol(name$X);
  var stdin_default$11 = vue.defineComponent({
    name: name$X,
    props: tabsProps,
    emits: ["click", "change", "scroll", "disabled", "rendered", "click-tab", "update:active"],
    setup(props, {
      emit,
      slots
    }) {
      let tabHeight;
      let lockScroll;
      let stickyFixed;
      const root = vue.ref();
      const navRef = vue.ref();
      const wrapRef = vue.ref();
      const contentRef = vue.ref();
      const id = useId();
      const scroller = useScrollParent(root);
      const [titleRefs, setTitleRefs] = useRefs();
      const {
        children,
        linkChildren
      } = useChildren(TABS_KEY);
      const state = vue.reactive({
        inited: false,
        position: "",
        lineStyle: {},
        currentIndex: -1
      });
      const scrollable = vue.computed(() => children.length > props.swipeThreshold || !props.ellipsis || props.shrink);
      const navStyle = vue.computed(() => ({
        borderColor: props.color,
        background: props.background
      }));
      const getTabName = (tab, index) => {
        var _a2;
        return (_a2 = tab.name) != null ? _a2 : index;
      };
      const currentName = vue.computed(() => {
        const activeTab = children[state.currentIndex];
        if (activeTab) {
          return getTabName(activeTab, state.currentIndex);
        }
      });
      const offsetTopPx = vue.computed(() => unitToPx(props.offsetTop));
      const scrollOffset = vue.computed(() => {
        if (props.sticky) {
          return offsetTopPx.value + tabHeight;
        }
        return 0;
      });
      const scrollIntoView = (immediate) => {
        const nav = navRef.value;
        const titles = titleRefs.value;
        if (!scrollable.value || !nav || !titles || !titles[state.currentIndex]) {
          return;
        }
        const title = titles[state.currentIndex].$el;
        const to = title.offsetLeft - (nav.offsetWidth - title.offsetWidth) / 2;
        scrollLeftTo(nav, to, immediate ? 0 : +props.duration);
      };
      const setLine = () => {
        const shouldAnimate = state.inited;
        vue.nextTick(() => {
          const titles = titleRefs.value;
          if (!titles || !titles[state.currentIndex] || props.type !== "line" || isHidden(root.value)) {
            return;
          }
          const title = titles[state.currentIndex].$el;
          const {
            lineWidth,
            lineHeight
          } = props;
          const left2 = title.offsetLeft + title.offsetWidth / 2;
          const lineStyle = {
            width: addUnit(lineWidth),
            backgroundColor: props.color,
            transform: `translateX(${left2}px) translateX(-50%)`
          };
          if (shouldAnimate) {
            lineStyle.transitionDuration = `${props.duration}s`;
          }
          if (isDef(lineHeight)) {
            const height2 = addUnit(lineHeight);
            lineStyle.height = height2;
            lineStyle.borderRadius = height2;
          }
          state.lineStyle = lineStyle;
        });
      };
      const findAvailableTab = (index) => {
        const diff = index < state.currentIndex ? -1 : 1;
        while (index >= 0 && index < children.length) {
          if (!children[index].disabled) {
            return index;
          }
          index += diff;
        }
      };
      const setCurrentIndex = (currentIndex, skipScrollIntoView) => {
        const newIndex = findAvailableTab(currentIndex);
        if (!isDef(newIndex)) {
          return;
        }
        const newTab = children[newIndex];
        const newName = getTabName(newTab, newIndex);
        const shouldEmitChange = state.currentIndex !== null;
        if (state.currentIndex !== newIndex) {
          state.currentIndex = newIndex;
          if (!skipScrollIntoView) {
            scrollIntoView();
          }
          setLine();
        }
        if (newName !== props.active) {
          emit("update:active", newName);
          if (shouldEmitChange) {
            emit("change", newName, newTab.title);
          }
        }
        if (stickyFixed && !props.scrollspy) {
          setRootScrollTop(Math.ceil(getElementTop(root.value) - offsetTopPx.value));
        }
      };
      const setCurrentIndexByName = (name2, skipScrollIntoView) => {
        const matched = children.find((tab, index2) => getTabName(tab, index2) === name2);
        const index = matched ? children.indexOf(matched) : 0;
        setCurrentIndex(index, skipScrollIntoView);
      };
      const scrollToCurrentContent = (immediate = false) => {
        if (props.scrollspy) {
          const target = children[state.currentIndex].$el;
          if (target && scroller.value) {
            const to = getElementTop(target, scroller.value) - scrollOffset.value;
            lockScroll = true;
            scrollTopTo(scroller.value, to, immediate ? 0 : +props.duration, () => {
              lockScroll = false;
            });
          }
        }
      };
      const onClickTab = (item, index, event) => {
        const {
          title,
          disabled
        } = children[index];
        const name2 = getTabName(children[index], index);
        if (disabled) {
          emit("disabled", name2, title);
        } else {
          callInterceptor(props.beforeChange, {
            args: [name2],
            done: () => {
              setCurrentIndex(index);
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
      const onStickyScroll = (params) => {
        stickyFixed = params.isFixed;
        emit("scroll", params);
      };
      const scrollTo = (name2) => {
        vue.nextTick(() => {
          setCurrentIndexByName(name2);
          scrollToCurrentContent(true);
        });
      };
      const getCurrentIndexOnScroll = () => {
        for (let index = 0; index < children.length; index++) {
          const {
            top: top2
          } = useRect(children[index].$el);
          if (top2 > scrollOffset.value) {
            return index === 0 ? 0 : index - 1;
          }
        }
        return children.length - 1;
      };
      const onScroll = () => {
        if (props.scrollspy && !lockScroll) {
          const index = getCurrentIndexOnScroll();
          setCurrentIndex(index);
        }
      };
      const renderNav = () => children.map((item, index) => vue.createVNode(stdin_default$14, vue.mergeProps({
        "key": item.id,
        "id": `${id}-${index}`,
        "ref": setTitleRefs(index),
        "type": props.type,
        "color": props.color,
        "style": item.titleStyle,
        "class": item.titleClass,
        "shrink": props.shrink,
        "isActive": index === state.currentIndex,
        "controls": item.id,
        "scrollable": scrollable.value,
        "activeColor": props.titleActiveColor,
        "inactiveColor": props.titleInactiveColor,
        "onClick": (event) => onClickTab(item, index, event)
      }, pick(item, ["dot", "badge", "title", "disabled", "showZeroBadge"])), {
        title: item.$slots.title
      }));
      const renderLine = () => {
        if (props.type === "line" && children.length) {
          return vue.createVNode("div", {
            "class": bem$W("line"),
            "style": state.lineStyle
          }, null);
        }
      };
      const renderHeader = () => {
        var _a2, _b2, _c;
        const {
          type,
          border,
          sticky
        } = props;
        const Header = [vue.createVNode("div", {
          "ref": sticky ? void 0 : wrapRef,
          "class": [bem$W("wrap"), {
            [BORDER_TOP_BOTTOM]: type === "line" && border
          }]
        }, [vue.createVNode("div", {
          "ref": navRef,
          "role": "tablist",
          "class": bem$W("nav", [type, {
            shrink: props.shrink,
            complete: scrollable.value
          }]),
          "style": navStyle.value,
          "aria-orientation": "horizontal"
        }, [(_a2 = slots["nav-left"]) == null ? void 0 : _a2.call(slots), renderNav(), renderLine(), (_b2 = slots["nav-right"]) == null ? void 0 : _b2.call(slots)])]), (_c = slots["nav-bottom"]) == null ? void 0 : _c.call(slots)];
        if (sticky) {
          return vue.createVNode("div", {
            "ref": wrapRef
          }, [Header]);
        }
        return Header;
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
      const init = () => {
        setCurrentIndexByName(props.active, true);
        vue.nextTick(() => {
          state.inited = true;
          if (wrapRef.value) {
            tabHeight = useRect(wrapRef.value).height;
          }
          scrollIntoView(true);
        });
      };
      const onRendered = (name2, title) => emit("rendered", name2, title);
      const resize = () => {
        setLine();
        vue.nextTick(() => {
          var _a2, _b2;
          return (_b2 = (_a2 = contentRef.value) == null ? void 0 : _a2.swipeRef.value) == null ? void 0 : _b2.resize();
        });
      };
      useExpose({
        resize,
        scrollTo
      });
      vue.onActivated(setLine);
      onPopupReopen(setLine);
      onMountedOrActivated(init);
      useEventListener("scroll", onScroll, {
        target: scroller,
        passive: true
      });
      linkChildren({
        id,
        props,
        setLine,
        onRendered,
        currentName,
        scrollIntoView
      });
      return () => vue.createVNode("div", {
        "ref": root,
        "class": bem$W([props.type])
      }, [props.sticky ? vue.createVNode(Sticky, {
        "container": root.value,
        "offsetTop": offsetTopPx.value,
        "onScroll": onStickyScroll
      }, {
        default: () => [renderHeader()]
      }) : renderHeader(), vue.createVNode(stdin_default$12, {
        "ref": contentRef,
        "count": children.length,
        "inited": state.inited,
        "animated": props.animated,
        "duration": props.duration,
        "swipeable": props.swipeable,
        "lazyRender": props.lazyRender,
        "currentIndex": state.currentIndex,
        "onChange": setCurrentIndex
      }, {
        default: () => {
          var _a2;
          return [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)];
        }
      })]);
    }
  });
  const TAB_STATUS_KEY = Symbol();
  const useTabStatus = () => vue.inject(TAB_STATUS_KEY, null);
  const [name$W, bem$V] = createNamespace("swipe-item");
  var stdin_default$10 = vue.defineComponent({
    name: name$W,
    setup(props, {
      slots
    }) {
      let rendered;
      const state = vue.reactive({
        offset: 0,
        inited: false,
        mounted: false
      });
      const {
        parent,
        index
      } = useParent(SWIPE_KEY);
      if (!parent) {
        return;
      }
      const style = vue.computed(() => {
        const style2 = {};
        const {
          vertical
        } = parent.props;
        if (parent.size.value) {
          style2[vertical ? "height" : "width"] = `${parent.size.value}px`;
        }
        if (state.offset) {
          style2.transform = `translate${vertical ? "Y" : "X"}(${state.offset}px)`;
        }
        return style2;
      });
      const shouldRender = vue.computed(() => {
        const {
          loop,
          lazyRender
        } = parent.props;
        if (!lazyRender || rendered) {
          return true;
        }
        if (!state.mounted) {
          return false;
        }
        const active = parent.activeIndicator.value;
        const maxActive = parent.count.value - 1;
        const prevActive = active === 0 && loop ? maxActive : active - 1;
        const nextActive = active === maxActive && loop ? 0 : active + 1;
        rendered = index.value === active || index.value === prevActive || index.value === nextActive;
        return rendered;
      });
      const setOffset = (offset2) => {
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
      return () => {
        var _a;
        return vue.createVNode("div", {
          "class": bem$V(),
          "style": style.value
        }, [shouldRender.value ? (_a = slots.default) == null ? void 0 : _a.call(slots) : null]);
      };
    }
  });
  const SwipeItem = withInstall(stdin_default$10);
  const [name$V, bem$U] = createNamespace("tab");
  const tabProps = extend({}, routeProps, {
    dot: Boolean,
    name: numericProp,
    badge: numericProp,
    title: String,
    disabled: Boolean,
    titleClass: unknownProp,
    titleStyle: [String, Object],
    showZeroBadge: truthProp
  });
  var stdin_default$$ = vue.defineComponent({
    name: name$V,
    props: tabProps,
    setup(props, {
      slots
    }) {
      const id = useId();
      const inited = vue.ref(false);
      const {
        parent,
        index
      } = useParent(TABS_KEY);
      if (!parent) {
        return;
      }
      const getName = () => {
        var _a;
        return (_a = props.name) != null ? _a : index.value;
      };
      const init = () => {
        inited.value = true;
        if (parent.props.lazyRender) {
          vue.nextTick(() => {
            parent.onRendered(getName(), props.title);
          });
        }
      };
      const active = vue.computed(() => {
        const isActive = getName() === parent.currentName.value;
        if (isActive && !inited.value) {
          init();
        }
        return isActive;
      });
      const hasInactiveClass = vue.ref(!active.value);
      vue.watch(active, (val) => {
        if (val) {
          hasInactiveClass.value = false;
        } else {
          doubleRaf(() => {
            hasInactiveClass.value = true;
          });
        }
      });
      vue.watch(() => props.title, () => {
        parent.setLine();
        parent.scrollIntoView();
      });
      vue.provide(TAB_STATUS_KEY, active);
      return () => {
        var _a;
        const label = `${parent.id}-${index.value}`;
        const {
          animated,
          swipeable,
          scrollspy,
          lazyRender
        } = parent.props;
        if (!slots.default && !animated) {
          return;
        }
        const show = scrollspy || active.value;
        if (animated || swipeable) {
          return vue.createVNode(SwipeItem, {
            "id": id,
            "role": "tabpanel",
            "class": bem$U("panel-wrapper", {
              inactive: hasInactiveClass.value
            }),
            "tabindex": active.value ? 0 : -1,
            "aria-hidden": !active.value,
            "aria-labelledby": label
          }, {
            default: () => {
              var _a2;
              return [vue.createVNode("div", {
                "class": bem$U("panel")
              }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)])];
            }
          });
        }
        const shouldRender = inited.value || scrollspy || !lazyRender;
        const Content = shouldRender ? (_a = slots.default) == null ? void 0 : _a.call(slots) : null;
        useExpose({
          id
        });
        return vue.withDirectives(vue.createVNode("div", {
          "id": id,
          "role": "tabpanel",
          "class": bem$U("panel"),
          "tabindex": show ? 0 : -1,
          "aria-labelledby": label
        }, [Content]), [[vue.vShow, show]]);
      };
    }
  });
  const Tab = withInstall(stdin_default$$);
  const Tabs = withInstall(stdin_default$11);
  const [name$U, bem$T, t$e] = createNamespace("cascader");
  const cascaderProps = {
    title: String,
    options: makeArrayProp(),
    closeable: truthProp,
    swipeable: truthProp,
    closeIcon: makeStringProp("cross"),
    showHeader: truthProp,
    modelValue: numericProp,
    fieldNames: Object,
    placeholder: String,
    activeColor: String
  };
  var stdin_default$_ = vue.defineComponent({
    name: name$U,
    props: cascaderProps,
    emits: ["close", "change", "finish", "click-tab", "update:modelValue"],
    setup(props, {
      slots,
      emit
    }) {
      const tabs = vue.ref([]);
      const activeTab = vue.ref(0);
      const {
        text: textKey,
        value: valueKey,
        children: childrenKey
      } = extend({
        text: "text",
        value: "value",
        children: "children"
      }, props.fieldNames);
      const getSelectedOptionsByValue = (options, value) => {
        for (const option of options) {
          if (option[valueKey] === value) {
            return [option];
          }
          if (option[childrenKey]) {
            const selectedOptions = getSelectedOptionsByValue(option[childrenKey], value);
            if (selectedOptions) {
              return [option, ...selectedOptions];
            }
          }
        }
      };
      const updateTabs = () => {
        const {
          options,
          modelValue
        } = props;
        if (modelValue !== void 0) {
          const selectedOptions = getSelectedOptionsByValue(options, modelValue);
          if (selectedOptions) {
            let optionsCursor = options;
            tabs.value = selectedOptions.map((option) => {
              const tab = {
                options: optionsCursor,
                selected: option
              };
              const next = optionsCursor.find((item) => item[valueKey] === option[valueKey]);
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
      const onSelect = (option, tabIndex) => {
        if (option.disabled) {
          return;
        }
        tabs.value[tabIndex].selected = option;
        if (tabs.value.length > tabIndex + 1) {
          tabs.value = tabs.value.slice(0, tabIndex + 1);
        }
        if (option[childrenKey]) {
          const nextTab = {
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
        const selectedOptions = tabs.value.map((tab) => tab.selected).filter(Boolean);
        emit("update:modelValue", option[valueKey]);
        const params = {
          value: option[valueKey],
          tabIndex,
          selectedOptions
        };
        emit("change", params);
        if (!option[childrenKey]) {
          emit("finish", params);
        }
      };
      const onClose = () => emit("close");
      const onClickTab = ({
        name: name2,
        title
      }) => emit("click-tab", name2, title);
      const renderHeader = () => props.showHeader ? vue.createVNode("div", {
        "class": bem$T("header")
      }, [vue.createVNode("h2", {
        "class": bem$T("title")
      }, [slots.title ? slots.title() : props.title]), props.closeable ? vue.createVNode(Icon, {
        "name": props.closeIcon,
        "class": [bem$T("close-icon"), HAPTICS_FEEDBACK],
        "onClick": onClose
      }, null) : null]) : null;
      const renderOption = (option, selectedOption, tabIndex) => {
        const {
          disabled
        } = option;
        const selected = !!(selectedOption && option[valueKey] === selectedOption[valueKey]);
        const color = option.color || (selected ? props.activeColor : void 0);
        const Text2 = slots.option ? slots.option({
          option,
          selected
        }) : vue.createVNode("span", null, [option[textKey]]);
        return vue.createVNode("li", {
          "role": "menuitemradio",
          "class": [bem$T("option", {
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
        }, [Text2, selected ? vue.createVNode(Icon, {
          "name": "success",
          "class": bem$T("selected-icon")
        }, null) : null]);
      };
      const renderOptions = (options, selectedOption, tabIndex) => vue.createVNode("ul", {
        "role": "menu",
        "class": bem$T("options")
      }, [options.map((option) => renderOption(option, selectedOption, tabIndex))]);
      const renderTab = (tab, tabIndex) => {
        const {
          options,
          selected
        } = tab;
        const placeholder = props.placeholder || t$e("select");
        const title = selected ? selected[textKey] : placeholder;
        return vue.createVNode(Tab, {
          "title": title,
          "titleClass": bem$T("tab", {
            unselected: !selected
          })
        }, {
          default: () => {
            var _a, _b;
            return [(_a = slots["options-top"]) == null ? void 0 : _a.call(slots, {
              tabIndex
            }), renderOptions(options, selected, tabIndex), (_b = slots["options-bottom"]) == null ? void 0 : _b.call(slots, {
              tabIndex
            })];
          }
        });
      };
      const renderTabs = () => vue.createVNode(Tabs, {
        "active": activeTab.value,
        "onUpdate:active": ($event) => activeTab.value = $event,
        "shrink": true,
        "animated": true,
        "class": bem$T("tabs"),
        "color": props.activeColor,
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
          const values = tabs.value.map((tab) => {
            var _a;
            return (_a = tab.selected) == null ? void 0 : _a[valueKey];
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
  const Cascader = withInstall(stdin_default$_);
  const [name$T, bem$S] = createNamespace("cell-group");
  const cellGroupProps = {
    title: String,
    inset: Boolean,
    border: truthProp
  };
  var stdin_default$Z = vue.defineComponent({
    name: name$T,
    inheritAttrs: false,
    props: cellGroupProps,
    setup(props, {
      slots,
      attrs
    }) {
      const renderGroup = () => {
        var _a;
        return vue.createVNode("div", vue.mergeProps({
          "class": [bem$S({
            inset: props.inset
          }), {
            [BORDER_TOP_BOTTOM]: props.border && !props.inset
          }]
        }, attrs), [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
      };
      const renderTitle = () => vue.createVNode("div", {
        "class": bem$S("title", {
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
  const CellGroup = withInstall(stdin_default$Z);
  const [name$S, bem$R] = createNamespace("checkbox-group");
  const checkboxGroupProps = {
    max: numericProp,
    disabled: Boolean,
    iconSize: numericProp,
    direction: String,
    modelValue: makeArrayProp(),
    checkedColor: String
  };
  const CHECKBOX_GROUP_KEY = Symbol(name$S);
  var stdin_default$Y = vue.defineComponent({
    name: name$S,
    props: checkboxGroupProps,
    emits: ["change", "update:modelValue"],
    setup(props, {
      emit,
      slots
    }) {
      const {
        children,
        linkChildren
      } = useChildren(CHECKBOX_GROUP_KEY);
      const updateValue = (value) => emit("update:modelValue", value);
      const toggleAll = (options = {}) => {
        if (typeof options === "boolean") {
          options = {
            checked: options
          };
        }
        const {
          checked,
          skipDisabled
        } = options;
        const checkedChildren = children.filter((item) => {
          if (!item.props.bindGroup) {
            return false;
          }
          if (item.props.disabled && skipDisabled) {
            return item.checked.value;
          }
          return checked != null ? checked : !item.checked.value;
        });
        const names = checkedChildren.map((item) => item.name);
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
      return () => {
        var _a;
        return vue.createVNode("div", {
          "class": bem$R([props.direction])
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
      };
    }
  });
  const [name$R, bem$Q] = createNamespace("checkbox");
  const checkboxProps = extend({}, checkerProps, {
    bindGroup: truthProp
  });
  var stdin_default$X = vue.defineComponent({
    name: name$R,
    props: checkboxProps,
    emits: ["change", "update:modelValue"],
    setup(props, {
      emit,
      slots
    }) {
      const {
        parent
      } = useParent(CHECKBOX_GROUP_KEY);
      const setParentValue = (checked2) => {
        const {
          name: name2
        } = props;
        const {
          max,
          modelValue
        } = parent.props;
        const value = modelValue.slice();
        if (checked2) {
          const overlimit = max && value.length >= max;
          if (!overlimit && !value.includes(name2)) {
            value.push(name2);
            if (props.bindGroup) {
              parent.updateValue(value);
            }
          }
        } else {
          const index = value.indexOf(name2);
          if (index !== -1) {
            value.splice(index, 1);
            if (props.bindGroup) {
              parent.updateValue(value);
            }
          }
        }
      };
      const checked = vue.computed(() => {
        if (parent && props.bindGroup) {
          return parent.props.modelValue.indexOf(props.name) !== -1;
        }
        return !!props.modelValue;
      });
      const toggle = (newValue = !checked.value) => {
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
      return () => vue.createVNode(stdin_default$1f, vue.mergeProps({
        "bem": bem$Q,
        "role": "checkbox",
        "parent": parent,
        "checked": checked.value,
        "onToggle": toggle
      }, props), pick(slots, ["default", "icon"]));
    }
  });
  const Checkbox = withInstall(stdin_default$X);
  const CheckboxGroup = withInstall(stdin_default$Y);
  const [name$Q, bem$P] = createNamespace("circle");
  let uid = 0;
  const format$1 = (rate) => Math.min(Math.max(+rate, 0), 100);
  function getPath(clockwise, viewBoxSize) {
    const sweepFlag = clockwise ? 1 : 0;
    return `M ${viewBoxSize / 2} ${viewBoxSize / 2} m 0, -500 a 500, 500 0 1, ${sweepFlag} 0, 1000 a 500, 500 0 1, ${sweepFlag} 0, -1000`;
  }
  const circleProps = {
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
  var stdin_default$W = vue.defineComponent({
    name: name$Q,
    props: circleProps,
    emits: ["update:currentRate"],
    setup(props, {
      emit,
      slots
    }) {
      const id = `van-circle-${uid++}`;
      const viewBoxSize = vue.computed(() => +props.strokeWidth + 1e3);
      const path = vue.computed(() => getPath(props.clockwise, viewBoxSize.value));
      const svgStyle = vue.computed(() => {
        const ROTATE_ANGLE_MAP = {
          top: 0,
          right: 90,
          bottom: 180,
          left: 270
        };
        const angleValue = ROTATE_ANGLE_MAP[props.startPosition];
        if (angleValue) {
          return {
            transform: `rotate(${angleValue}deg)`
          };
        }
      });
      vue.watch(() => props.rate, (rate) => {
        let rafId;
        const startTime = Date.now();
        const startRate = props.currentRate;
        const endRate = format$1(rate);
        const duration = Math.abs((startRate - endRate) * 1e3 / +props.speed);
        const animate = () => {
          const now = Date.now();
          const progress = Math.min((now - startTime) / duration, 1);
          const rate2 = progress * (endRate - startRate) + startRate;
          emit("update:currentRate", format$1(parseFloat(rate2.toFixed(1))));
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
      const renderHover = () => {
        const PERIMETER = 3140;
        const {
          strokeWidth,
          currentRate,
          strokeLinecap
        } = props;
        const offset2 = PERIMETER * currentRate / 100;
        const color = isObject(props.color) ? `url(#${id})` : props.color;
        const style = {
          stroke: color,
          strokeWidth: `${+strokeWidth + 1}px`,
          strokeLinecap,
          strokeDasharray: `${offset2}px ${PERIMETER}px`
        };
        return vue.createVNode("path", {
          "d": path.value,
          "style": style,
          "class": bem$P("hover"),
          "stroke": color
        }, null);
      };
      const renderLayer = () => {
        const style = {
          fill: props.fill,
          stroke: props.layerColor,
          strokeWidth: `${props.strokeWidth}px`
        };
        return vue.createVNode("path", {
          "class": bem$P("layer"),
          "style": style,
          "d": path.value
        }, null);
      };
      const renderGradient = () => {
        const {
          color
        } = props;
        if (!isObject(color)) {
          return;
        }
        const Stops = Object.keys(color).sort((a, b) => parseFloat(a) - parseFloat(b)).map((key, index) => vue.createVNode("stop", {
          "key": index,
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
      const renderText = () => {
        if (slots.default) {
          return slots.default();
        }
        if (props.text) {
          return vue.createVNode("div", {
            "class": bem$P("text")
          }, [props.text]);
        }
      };
      return () => vue.createVNode("div", {
        "class": bem$P(),
        "style": getSizeStyle(props.size)
      }, [vue.createVNode("svg", {
        "viewBox": `0 0 ${viewBoxSize.value} ${viewBoxSize.value}`,
        "style": svgStyle.value
      }, [renderGradient(), renderLayer(), renderHover()]), renderText()]);
    }
  });
  const Circle = withInstall(stdin_default$W);
  const [name$P, bem$O] = createNamespace("row");
  const ROW_KEY = Symbol(name$P);
  const rowProps = {
    tag: makeStringProp("div"),
    wrap: truthProp,
    align: String,
    gutter: makeNumericProp(0),
    justify: String
  };
  var stdin_default$V = vue.defineComponent({
    name: name$P,
    props: rowProps,
    setup(props, {
      slots
    }) {
      const {
        children,
        linkChildren
      } = useChildren(ROW_KEY);
      const groups = vue.computed(() => {
        const groups2 = [[]];
        let totalSpan = 0;
        children.forEach((child, index) => {
          totalSpan += Number(child.span);
          if (totalSpan > 24) {
            groups2.push([index]);
            totalSpan -= 24;
          } else {
            groups2[groups2.length - 1].push(index);
          }
        });
        return groups2;
      });
      const spaces = vue.computed(() => {
        const gutter = Number(props.gutter);
        const spaces2 = [];
        if (!gutter) {
          return spaces2;
        }
        groups.value.forEach((group) => {
          const averagePadding = gutter * (group.length - 1) / group.length;
          group.forEach((item, index) => {
            if (index === 0) {
              spaces2.push({
                right: averagePadding
              });
            } else {
              const left2 = gutter - spaces2[item - 1].right;
              const right2 = averagePadding - left2;
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
        const {
          tag,
          wrap,
          align,
          justify
        } = props;
        return vue.createVNode(tag, {
          "class": bem$O({
            [`align-${align}`]: align,
            [`justify-${justify}`]: justify,
            nowrap: !wrap
          })
        }, {
          default: () => {
            var _a;
            return [(_a = slots.default) == null ? void 0 : _a.call(slots)];
          }
        });
      };
    }
  });
  const [name$O, bem$N] = createNamespace("col");
  const colProps = {
    tag: makeStringProp("div"),
    span: makeNumericProp(0),
    offset: numericProp
  };
  var stdin_default$U = vue.defineComponent({
    name: name$O,
    props: colProps,
    setup(props, {
      slots
    }) {
      const {
        parent,
        index
      } = useParent(ROW_KEY);
      const style = vue.computed(() => {
        if (!parent) {
          return;
        }
        const {
          spaces
        } = parent;
        if (spaces && spaces.value && spaces.value[index.value]) {
          const {
            left: left2,
            right: right2
          } = spaces.value[index.value];
          return {
            paddingLeft: left2 ? `${left2}px` : null,
            paddingRight: right2 ? `${right2}px` : null
          };
        }
      });
      return () => {
        const {
          tag,
          span,
          offset: offset2
        } = props;
        return vue.createVNode(tag, {
          "style": style.value,
          "class": bem$N({
            [span]: span,
            [`offset-${offset2}`]: offset2
          })
        }, {
          default: () => {
            var _a;
            return [(_a = slots.default) == null ? void 0 : _a.call(slots)];
          }
        });
      };
    }
  });
  const Col = withInstall(stdin_default$U);
  const [name$N, bem$M] = createNamespace("collapse");
  const COLLAPSE_KEY = Symbol(name$N);
  const collapseProps = {
    border: truthProp,
    accordion: Boolean,
    modelValue: {
      type: [String, Number, Array],
      default: ""
    }
  };
  var stdin_default$T = vue.defineComponent({
    name: name$N,
    props: collapseProps,
    emits: ["change", "update:modelValue"],
    setup(props, {
      emit,
      slots
    }) {
      const {
        linkChildren,
        children
      } = useChildren(COLLAPSE_KEY);
      const updateName = (name2) => {
        emit("change", name2);
        emit("update:modelValue", name2);
      };
      const toggle = (name2, expanded) => {
        const {
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
      const toggleAll = (options = {}) => {
        if (props.accordion) {
          return;
        }
        if (typeof options === "boolean") {
          options = {
            expanded: options
          };
        }
        const {
          expanded,
          skipDisabled
        } = options;
        const expandedChildren = children.filter((item) => {
          if (item.disabled && skipDisabled) {
            return item.expanded.value;
          }
          return expanded != null ? expanded : !item.expanded.value;
        });
        const names = expandedChildren.map((item) => item.itemName.value);
        updateName(names);
      };
      const isExpanded = (name2) => {
        const {
          accordion,
          modelValue
        } = props;
        return accordion ? modelValue === name2 : modelValue.includes(name2);
      };
      useExpose({
        toggleAll
      });
      linkChildren({
        toggle,
        isExpanded
      });
      return () => {
        var _a;
        return vue.createVNode("div", {
          "class": [bem$M(), {
            [BORDER_TOP_BOTTOM]: props.border
          }]
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
      };
    }
  });
  const Collapse = withInstall(stdin_default$T);
  const [name$M, bem$L] = createNamespace("collapse-item");
  const CELL_SLOTS = ["icon", "title", "value", "label", "right-icon"];
  const collapseItemProps = extend({}, cellSharedProps, {
    name: numericProp,
    isLink: truthProp,
    disabled: Boolean,
    readonly: Boolean,
    lazyRender: truthProp
  });
  var stdin_default$S = vue.defineComponent({
    name: name$M,
    props: collapseItemProps,
    setup(props, {
      slots
    }) {
      const wrapperRef = vue.ref();
      const contentRef = vue.ref();
      const {
        parent,
        index
      } = useParent(COLLAPSE_KEY);
      if (!parent) {
        return;
      }
      const name2 = vue.computed(() => {
        var _a;
        return (_a = props.name) != null ? _a : index.value;
      });
      const expanded = vue.computed(() => parent.isExpanded(name2.value));
      const show = vue.ref(expanded.value);
      const lazyRender = useLazyRender(() => show.value || !props.lazyRender);
      const onTransitionEnd = () => {
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
        const tick = value ? vue.nextTick : raf;
        tick(() => {
          if (!contentRef.value || !wrapperRef.value) {
            return;
          }
          const {
            offsetHeight
          } = contentRef.value;
          if (offsetHeight) {
            const contentHeight = `${offsetHeight}px`;
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
      const toggle = (newValue = !expanded.value) => {
        parent.toggle(name2.value, newValue);
      };
      const onClickTitle = () => {
        if (!props.disabled && !props.readonly) {
          toggle();
        }
      };
      const renderTitle = () => {
        const {
          border,
          disabled,
          readonly
        } = props;
        const attrs = pick(props, Object.keys(cellSharedProps));
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
      const renderContent = lazyRender(() => {
        var _a;
        return vue.withDirectives(vue.createVNode("div", {
          "ref": wrapperRef,
          "class": bem$L("wrapper"),
          "onTransitionend": onTransitionEnd
        }, [vue.createVNode("div", {
          "ref": contentRef,
          "class": bem$L("content")
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]), [[vue.vShow, show.value]]);
      });
      useExpose({
        toggle,
        expanded,
        itemName: name2
      });
      return () => vue.createVNode("div", {
        "class": [bem$L({
          border: index.value && props.border
        })]
      }, [renderTitle(), renderContent()]);
    }
  });
  const CollapseItem = withInstall(stdin_default$S);
  const ConfigProvider = withInstall(stdin_default$1A);
  const [name$L, bem$K, t$d] = createNamespace("contact-card");
  const contactCardProps = {
    tel: String,
    name: String,
    type: makeStringProp("add"),
    addText: String,
    editable: truthProp
  };
  var stdin_default$R = vue.defineComponent({
    name: name$L,
    props: contactCardProps,
    emits: ["click"],
    setup(props, {
      emit
    }) {
      const onClick = (event) => {
        if (props.editable) {
          emit("click", event);
        }
      };
      const renderContent = () => {
        if (props.type === "add") {
          return props.addText || t$d("addContact");
        }
        return [vue.createVNode("div", null, [`${t$d("name")}\uFF1A${props.name}`]), vue.createVNode("div", null, [`${t$d("tel")}\uFF1A${props.tel}`])];
      };
      return () => vue.createVNode(Cell, {
        "center": true,
        "icon": props.type === "edit" ? "contact" : "add-square",
        "class": bem$K([props.type]),
        "border": false,
        "isLink": props.editable,
        "valueClass": bem$K("value"),
        "onClick": onClick
      }, {
        value: renderContent
      });
    }
  });
  const ContactCard = withInstall(stdin_default$R);
  const [name$K, bem$J, t$c] = createNamespace("contact-edit");
  const DEFAULT_CONTACT = {
    tel: "",
    name: ""
  };
  const contactEditProps = {
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
  var stdin_default$Q = vue.defineComponent({
    name: name$K,
    props: contactEditProps,
    emits: ["save", "delete", "change-default"],
    setup(props, {
      emit
    }) {
      const contact = vue.reactive(extend({}, DEFAULT_CONTACT, props.contactInfo));
      const onSave = () => {
        if (!props.isSaving) {
          emit("save", contact);
        }
      };
      const onDelete = () => emit("delete", contact);
      const renderButtons = () => vue.createVNode("div", {
        "class": bem$J("buttons")
      }, [vue.createVNode(Button, {
        "block": true,
        "round": true,
        "type": "danger",
        "text": t$c("save"),
        "class": bem$J("button"),
        "loading": props.isSaving,
        "nativeType": "submit"
      }, null), props.isEdit && vue.createVNode(Button, {
        "block": true,
        "round": true,
        "text": t$c("delete"),
        "class": bem$J("button"),
        "loading": props.isDeleting,
        "onClick": onDelete
      }, null)]);
      const renderSwitch = () => vue.createVNode(Switch, {
        "modelValue": contact.isDefault,
        "onUpdate:modelValue": ($event) => contact.isDefault = $event,
        "size": 24,
        "onChange": (checked) => emit("change-default", checked)
      }, null);
      const renderSetDefault = () => {
        if (props.showSetDefault) {
          return vue.createVNode(Cell, {
            "title": props.setDefaultLabel,
            "class": bem$J("switch-cell"),
            "border": false
          }, {
            "right-icon": renderSwitch
          });
        }
      };
      vue.watch(() => props.contactInfo, (value) => extend(contact, DEFAULT_CONTACT, value));
      return () => vue.createVNode(Form, {
        "class": bem$J(),
        "onSubmit": onSave
      }, {
        default: () => [vue.createVNode("div", {
          "class": bem$J("fields")
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
  const ContactEdit = withInstall(stdin_default$Q);
  const [name$J, bem$I, t$b] = createNamespace("contact-list");
  const contactListProps = {
    list: Array,
    addText: String,
    modelValue: unknownProp,
    defaultTagText: String
  };
  var stdin_default$P = vue.defineComponent({
    name: name$J,
    props: contactListProps,
    emits: ["add", "edit", "select", "update:modelValue"],
    setup(props, {
      emit
    }) {
      const renderItem = (item, index) => {
        const onClick = () => {
          emit("update:modelValue", item.id);
          emit("select", item, index);
        };
        const renderRightIcon = () => vue.createVNode(Radio, {
          "class": bem$I("radio"),
          "name": item.id,
          "iconSize": 16
        }, null);
        const renderEditIcon = () => vue.createVNode(Icon, {
          "name": "edit",
          "class": bem$I("edit"),
          "onClick": (event) => {
            event.stopPropagation();
            emit("edit", item, index);
          }
        }, null);
        const renderContent = () => {
          const nodes = [`${item.name}\uFF0C${item.tel}`];
          if (item.isDefault && props.defaultTagText) {
            nodes.push(vue.createVNode(Tag, {
              "type": "danger",
              "round": true,
              "class": bem$I("item-tag")
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
          "class": bem$I("item"),
          "valueClass": bem$I("item-value"),
          "onClick": onClick
        }, {
          icon: renderEditIcon,
          value: renderContent,
          "right-icon": renderRightIcon
        });
      };
      return () => vue.createVNode("div", {
        "class": bem$I()
      }, [vue.createVNode(RadioGroup, {
        "modelValue": props.modelValue,
        "class": bem$I("group")
      }, {
        default: () => [props.list && props.list.map(renderItem)]
      }), vue.createVNode("div", {
        "class": [bem$I("bottom"), "van-safe-area-bottom"]
      }, [vue.createVNode(Button, {
        "round": true,
        "block": true,
        "type": "danger",
        "class": bem$I("add"),
        "text": props.addText || t$b("addContact"),
        "onClick": () => emit("add")
      }, null)])]);
    }
  });
  const ContactList = withInstall(stdin_default$P);
  function parseFormat(format2, currentTime) {
    const { days } = currentTime;
    let { hours, minutes, seconds, milliseconds } = currentTime;
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
      const ms = padZero(milliseconds, 3);
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
  const [name$I, bem$H] = createNamespace("count-down");
  const countDownProps = {
    time: makeNumericProp(0),
    format: makeStringProp("HH:mm:ss"),
    autoStart: truthProp,
    millisecond: Boolean
  };
  var stdin_default$O = vue.defineComponent({
    name: name$I,
    props: countDownProps,
    emits: ["change", "finish"],
    setup(props, {
      emit,
      slots
    }) {
      const {
        start: start2,
        pause,
        reset,
        current: current2
      } = useCountDown({
        time: +props.time,
        millisecond: props.millisecond,
        onChange: (current22) => emit("change", current22),
        onFinish: () => emit("finish")
      });
      const timeText = vue.computed(() => parseFormat(props.format, current2.value));
      const resetTime = () => {
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
        "class": bem$H()
      }, [slots.default ? slots.default(current2.value) : timeText.value]);
    }
  });
  const CountDown = withInstall(stdin_default$O);
  function getDate(timeStamp) {
    const date = new Date(timeStamp * 1e3);
    return `${date.getFullYear()}.${padZero(date.getMonth() + 1)}.${padZero(
      date.getDate()
    )}`;
  }
  const formatDiscount = (discount) => (discount / 10).toFixed(discount % 10 === 0 ? 0 : 1);
  const formatAmount = (amount) => (amount / 100).toFixed(amount % 100 === 0 ? 0 : amount % 10 === 0 ? 1 : 2);
  const [name$H, bem$G, t$a] = createNamespace("coupon");
  var stdin_default$N = vue.defineComponent({
    name: name$H,
    props: {
      chosen: Boolean,
      coupon: makeRequiredProp(Object),
      disabled: Boolean,
      currency: makeStringProp("\xA5")
    },
    setup(props) {
      const validPeriod = vue.computed(() => {
        const {
          startAt,
          endAt
        } = props.coupon;
        return `${getDate(startAt)} - ${getDate(endAt)}`;
      });
      const faceAmount = vue.computed(() => {
        const {
          coupon,
          currency
        } = props;
        if (coupon.valueDesc) {
          return [coupon.valueDesc, vue.createVNode("span", null, [coupon.unitDesc || ""])];
        }
        if (coupon.denominations) {
          const denominations = formatAmount(coupon.denominations);
          return [vue.createVNode("span", null, [currency]), ` ${denominations}`];
        }
        if (coupon.discount) {
          return t$a("discount", formatDiscount(coupon.discount));
        }
        return "";
      });
      const conditionMessage = vue.computed(() => {
        const condition = formatAmount(props.coupon.originCondition || 0);
        return condition === "0" ? t$a("unlimited") : t$a("condition", condition);
      });
      return () => {
        const {
          chosen,
          coupon,
          disabled
        } = props;
        const description = disabled && coupon.reason || coupon.description;
        return vue.createVNode("div", {
          "class": bem$G({
            disabled
          })
        }, [vue.createVNode("div", {
          "class": bem$G("content")
        }, [vue.createVNode("div", {
          "class": bem$G("head")
        }, [vue.createVNode("h2", {
          "class": bem$G("amount")
        }, [faceAmount.value]), vue.createVNode("p", {
          "class": bem$G("condition")
        }, [coupon.condition || conditionMessage.value])]), vue.createVNode("div", {
          "class": bem$G("body")
        }, [vue.createVNode("p", {
          "class": bem$G("name")
        }, [coupon.name]), vue.createVNode("p", {
          "class": bem$G("valid")
        }, [validPeriod.value]), !disabled && vue.createVNode(Checkbox, {
          "class": bem$G("corner"),
          "modelValue": chosen
        }, null)])]), description && vue.createVNode("p", {
          "class": bem$G("description")
        }, [description])]);
      };
    }
  });
  const Coupon = withInstall(stdin_default$N);
  const [name$G, bem$F, t$9] = createNamespace("coupon-cell");
  const couponCellProps = {
    title: String,
    border: truthProp,
    editable: truthProp,
    coupons: makeArrayProp(),
    currency: makeStringProp("\xA5"),
    chosenCoupon: makeNumericProp(-1)
  };
  function formatValue({
    coupons,
    chosenCoupon,
    currency
  }) {
    const coupon = coupons[+chosenCoupon];
    if (coupon) {
      let value = 0;
      if (isDef(coupon.value)) {
        ({
          value
        } = coupon);
      } else if (isDef(coupon.denominations)) {
        value = coupon.denominations;
      }
      return `-${currency} ${(value / 100).toFixed(2)}`;
    }
    return coupons.length === 0 ? t$9("noCoupon") : t$9("count", coupons.length);
  }
  var stdin_default$M = vue.defineComponent({
    name: name$G,
    props: couponCellProps,
    setup(props) {
      return () => {
        const selected = props.coupons[+props.chosenCoupon];
        return vue.createVNode(Cell, {
          "class": bem$F(),
          "value": formatValue(props),
          "title": props.title || t$9("title"),
          "border": props.border,
          "isLink": props.editable,
          "valueClass": bem$F("value", {
            selected
          })
        }, null);
      };
    }
  });
  const CouponCell = withInstall(stdin_default$M);
  const [name$F, bem$E] = createNamespace("empty");
  const emptyProps = {
    image: makeStringProp("default"),
    imageSize: [Number, String, Array],
    description: String
  };
  var stdin_default$L = vue.defineComponent({
    name: name$F,
    props: emptyProps,
    setup(props, {
      slots
    }) {
      const renderDescription = () => {
        const description = slots.description ? slots.description() : props.description;
        if (description) {
          return vue.createVNode("p", {
            "class": bem$E("description")
          }, [description]);
        }
      };
      const renderBottom = () => {
        if (slots.default) {
          return vue.createVNode("div", {
            "class": bem$E("bottom")
          }, [slots.default()]);
        }
      };
      const baseId = useId();
      const getId = (num) => `${baseId}-${num}`;
      const getUrlById = (num) => `url(#${getId(num)})`;
      const renderStop = (color, offset2, opacity) => vue.createVNode("stop", {
        "stop-color": color,
        "offset": `${offset2}%`,
        "stop-opacity": opacity
      }, null);
      const renderStops = (fromColor, toColor) => [renderStop(fromColor, 0), renderStop(toColor, 100)];
      const renderShadow = (id) => [vue.createVNode("defs", null, [vue.createVNode("radialGradient", {
        "id": getId(id),
        "cx": "50%",
        "cy": "54%",
        "fx": "50%",
        "fy": "54%",
        "r": "297%",
        "gradientTransform": "matrix(-.16 0 0 -.33 .58 .72)"
      }, [renderStop("#EBEDF0", 0), renderStop("#F2F3F5", 100, 0.3)])]), vue.createVNode("ellipse", {
        "fill": getUrlById(id),
        "opacity": ".8",
        "cx": "80",
        "cy": "140",
        "rx": "46",
        "ry": "8"
      }, null)];
      const renderBuilding = () => [vue.createVNode("defs", null, [vue.createVNode("linearGradient", {
        "id": getId("a"),
        "x1": "64%",
        "y1": "100%",
        "x2": "64%"
      }, [renderStop("#FFF", 0, 0.5), renderStop("#F2F3F5", 100)])]), vue.createVNode("g", {
        "opacity": ".8"
      }, [vue.createVNode("path", {
        "d": "M36 131V53H16v20H2v58h34z",
        "fill": getUrlById("a")
      }, null), vue.createVNode("path", {
        "d": "M123 15h22v14h9v77h-31V15z",
        "fill": getUrlById("a")
      }, null)])];
      const renderCloud = () => [vue.createVNode("defs", null, [vue.createVNode("linearGradient", {
        "id": getId("b"),
        "x1": "64%",
        "y1": "97%",
        "x2": "64%",
        "y2": "0%"
      }, [renderStop("#F2F3F5", 0, 0.3), renderStop("#F2F3F5", 100)])]), vue.createVNode("g", {
        "opacity": ".8"
      }, [vue.createVNode("path", {
        "d": "M87 6c3 0 7 3 8 6a8 8 0 1 1-1 16H80a7 7 0 0 1-8-6c0-4 3-7 6-7 0-5 4-9 9-9Z",
        "fill": getUrlById("b")
      }, null), vue.createVNode("path", {
        "d": "M19 23c2 0 3 1 4 3 2 0 4 2 4 4a4 4 0 0 1-4 3v1h-7v-1l-1 1c-2 0-3-2-3-4 0-1 1-3 3-3 0-2 2-4 4-4Z",
        "fill": getUrlById("b")
      }, null)])];
      const renderNetwork = () => vue.createVNode("svg", {
        "viewBox": "0 0 160 160"
      }, [vue.createVNode("defs", null, [vue.createVNode("linearGradient", {
        "id": getId(1),
        "x1": "64%",
        "y1": "100%",
        "x2": "64%"
      }, [renderStop("#FFF", 0, 0.5), renderStop("#F2F3F5", 100)]), vue.createVNode("linearGradient", {
        "id": getId(2),
        "x1": "50%",
        "x2": "50%",
        "y2": "84%"
      }, [renderStop("#EBEDF0", 0), renderStop("#DCDEE0", 100, 0)]), vue.createVNode("linearGradient", {
        "id": getId(3),
        "x1": "100%",
        "x2": "100%",
        "y2": "100%"
      }, [renderStops("#EAEDF0", "#DCDEE0")]), vue.createVNode("radialGradient", {
        "id": getId(4),
        "cx": "50%",
        "cy": "0%",
        "fx": "50%",
        "fy": "0%",
        "r": "100%",
        "gradientTransform": "matrix(0 1 -.54 0 .5 -.5)"
      }, [renderStop("#EBEDF0", 0), renderStop("#FFF", 100, 0)])]), vue.createVNode("g", {
        "fill": "none"
      }, [renderBuilding(), vue.createVNode("path", {
        "fill": getUrlById(4),
        "d": "M0 139h160v21H0z"
      }, null), vue.createVNode("path", {
        "d": "M80 54a7 7 0 0 1 3 13v27l-2 2h-2a2 2 0 0 1-2-2V67a7 7 0 0 1 3-13z",
        "fill": getUrlById(2)
      }, null), vue.createVNode("g", {
        "opacity": ".6",
        "stroke-linecap": "round",
        "stroke-width": "7"
      }, [vue.createVNode("path", {
        "d": "M64 47a19 19 0 0 0-5 13c0 5 2 10 5 13",
        "stroke": getUrlById(3)
      }, null), vue.createVNode("path", {
        "d": "M53 36a34 34 0 0 0 0 48",
        "stroke": getUrlById(3)
      }, null), vue.createVNode("path", {
        "d": "M95 73a19 19 0 0 0 6-13c0-5-2-9-6-13",
        "stroke": getUrlById(3)
      }, null), vue.createVNode("path", {
        "d": "M106 84a34 34 0 0 0 0-48",
        "stroke": getUrlById(3)
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
      const renderMaterial = () => vue.createVNode("svg", {
        "viewBox": "0 0 160 160"
      }, [vue.createVNode("defs", null, [vue.createVNode("linearGradient", {
        "x1": "50%",
        "x2": "50%",
        "y2": "100%",
        "id": getId(5)
      }, [renderStops("#F2F3F5", "#DCDEE0")]), vue.createVNode("linearGradient", {
        "x1": "95%",
        "y1": "48%",
        "x2": "5.5%",
        "y2": "51%",
        "id": getId(6)
      }, [renderStops("#EAEDF1", "#DCDEE0")]), vue.createVNode("linearGradient", {
        "y1": "45%",
        "x2": "100%",
        "y2": "54%",
        "id": getId(7)
      }, [renderStops("#EAEDF1", "#DCDEE0")])]), renderBuilding(), renderCloud(), vue.createVNode("g", {
        "transform": "translate(36 50)",
        "fill": "none"
      }, [vue.createVNode("g", {
        "transform": "translate(8)"
      }, [vue.createVNode("rect", {
        "fill": "#EBEDF0",
        "opacity": ".6",
        "x": "38",
        "y": "13",
        "width": "36",
        "height": "53",
        "rx": "2"
      }, null), vue.createVNode("rect", {
        "fill": getUrlById(5),
        "width": "64",
        "height": "66",
        "rx": "2"
      }, null), vue.createVNode("rect", {
        "fill": "#FFF",
        "x": "6",
        "y": "6",
        "width": "52",
        "height": "55",
        "rx": "1"
      }, null), vue.createVNode("g", {
        "transform": "translate(15 17)",
        "fill": getUrlById(6)
      }, [vue.createVNode("rect", {
        "width": "34",
        "height": "6",
        "rx": "1"
      }, null), vue.createVNode("path", {
        "d": "M0 14h34v6H0z"
      }, null), vue.createVNode("rect", {
        "y": "28",
        "width": "34",
        "height": "6",
        "rx": "1"
      }, null)])]), vue.createVNode("rect", {
        "fill": getUrlById(7),
        "y": "61",
        "width": "88",
        "height": "28",
        "rx": "1"
      }, null), vue.createVNode("rect", {
        "fill": "#F7F8FA",
        "x": "29",
        "y": "72",
        "width": "30",
        "height": "6",
        "rx": "1"
      }, null)])]);
      const renderError = () => vue.createVNode("svg", {
        "viewBox": "0 0 160 160"
      }, [vue.createVNode("defs", null, [vue.createVNode("linearGradient", {
        "x1": "50%",
        "x2": "50%",
        "y2": "100%",
        "id": getId(8)
      }, [renderStops("#EAEDF1", "#DCDEE0")])]), renderBuilding(), renderCloud(), renderShadow("c"), vue.createVNode("path", {
        "d": "m59 60 21 21 21-21h3l9 9v3L92 93l21 21v3l-9 9h-3l-21-21-21 21h-3l-9-9v-3l21-21-21-21v-3l9-9h3Z",
        "fill": getUrlById(8)
      }, null)]);
      const renderSearch = () => vue.createVNode("svg", {
        "viewBox": "0 0 160 160"
      }, [vue.createVNode("defs", null, [vue.createVNode("linearGradient", {
        "x1": "50%",
        "y1": "100%",
        "x2": "50%",
        "id": getId(9)
      }, [renderStops("#EEE", "#D8D8D8")]), vue.createVNode("linearGradient", {
        "x1": "100%",
        "y1": "50%",
        "y2": "50%",
        "id": getId(10)
      }, [renderStops("#F2F3F5", "#DCDEE0")]), vue.createVNode("linearGradient", {
        "x1": "50%",
        "x2": "50%",
        "y2": "100%",
        "id": getId(11)
      }, [renderStops("#F2F3F5", "#DCDEE0")]), vue.createVNode("linearGradient", {
        "x1": "50%",
        "x2": "50%",
        "y2": "100%",
        "id": getId(12)
      }, [renderStops("#FFF", "#F7F8FA")])]), renderBuilding(), renderCloud(), renderShadow("d"), vue.createVNode("g", {
        "transform": "rotate(-45 113 -4)",
        "fill": "none"
      }, [vue.createVNode("rect", {
        "fill": getUrlById(9),
        "x": "24",
        "y": "52.8",
        "width": "5.8",
        "height": "19",
        "rx": "1"
      }, null), vue.createVNode("rect", {
        "fill": getUrlById(10),
        "x": "22.1",
        "y": "67.3",
        "width": "9.9",
        "height": "28",
        "rx": "1"
      }, null), vue.createVNode("circle", {
        "stroke": getUrlById(11),
        "stroke-width": "8",
        "cx": "27",
        "cy": "27",
        "r": "27"
      }, null), vue.createVNode("circle", {
        "fill": getUrlById(12),
        "cx": "27",
        "cy": "27",
        "r": "16"
      }, null), vue.createVNode("path", {
        "d": "M37 7c-8 0-15 5-16 12",
        "stroke": getUrlById(11),
        "stroke-width": "3",
        "opacity": ".5",
        "stroke-linecap": "round",
        "transform": "rotate(45 29 13)"
      }, null)])]);
      const renderImage = () => {
        var _a;
        if (slots.image) {
          return slots.image();
        }
        const PRESET_IMAGES = {
          error: renderError,
          search: renderSearch,
          network: renderNetwork,
          default: renderMaterial
        };
        return ((_a = PRESET_IMAGES[props.image]) == null ? void 0 : _a.call(PRESET_IMAGES)) || vue.createVNode("img", {
          "src": props.image
        }, null);
      };
      return () => vue.createVNode("div", {
        "class": bem$E()
      }, [vue.createVNode("div", {
        "class": bem$E("image"),
        "style": getSizeStyle(props.imageSize)
      }, [renderImage()]), renderDescription(), renderBottom()]);
    }
  });
  const Empty = withInstall(stdin_default$L);
  const [name$E, bem$D, t$8] = createNamespace("coupon-list");
  const couponListProps = {
    code: makeStringProp(""),
    coupons: makeArrayProp(),
    currency: makeStringProp("\xA5"),
    showCount: truthProp,
    emptyImage: String,
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
  var stdin_default$K = vue.defineComponent({
    name: name$E,
    props: couponListProps,
    emits: ["change", "exchange", "update:code"],
    setup(props, {
      emit,
      slots
    }) {
      const [couponRefs, setCouponRefs] = useRefs();
      const root = vue.ref();
      const barRef = vue.ref();
      const activeTab = vue.ref(0);
      const listHeight = vue.ref(0);
      const currentCode = vue.ref(props.code);
      const buttonDisabled = vue.computed(() => !props.exchangeButtonLoading && (props.exchangeButtonDisabled || !currentCode.value || currentCode.value.length < props.exchangeMinLength));
      const updateListHeight = () => {
        const TABS_HEIGHT = 44;
        const rootHeight = useRect(root).height;
        const headerHeight = useRect(barRef).height + TABS_HEIGHT;
        listHeight.value = (rootHeight > headerHeight ? rootHeight : windowHeight.value) - headerHeight;
      };
      const onExchange = () => {
        emit("exchange", currentCode.value);
        if (!props.code) {
          currentCode.value = "";
        }
      };
      const scrollToCoupon = (index) => {
        vue.nextTick(() => {
          var _a;
          return (_a = couponRefs.value[index]) == null ? void 0 : _a.scrollIntoView();
        });
      };
      const renderEmpty = () => vue.createVNode(Empty, {
        "image": props.emptyImage
      }, {
        default: () => [vue.createVNode("p", {
          "class": bem$D("empty-tip")
        }, [t$8("noCoupon")])]
      });
      const renderExchangeBar = () => {
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
      const renderCouponTab = () => {
        const {
          coupons
        } = props;
        const count = props.showCount ? ` (${coupons.length})` : "";
        const title = (props.enabledTitle || t$8("enable")) + count;
        return vue.createVNode(Tab, {
          "title": title
        }, {
          default: () => {
            var _a;
            return [vue.createVNode("div", {
              "class": bem$D("list", {
                "with-bottom": props.showCloseButton
              }),
              "style": {
                height: `${listHeight.value}px`
              }
            }, [coupons.map((coupon, index) => vue.createVNode(Coupon, {
              "key": coupon.id,
              "ref": setCouponRefs(index),
              "coupon": coupon,
              "chosen": index === props.chosenCoupon,
              "currency": props.currency,
              "onClick": () => emit("change", index)
            }, null)), !coupons.length && renderEmpty(), (_a = slots["list-footer"]) == null ? void 0 : _a.call(slots)])];
          }
        });
      };
      const renderDisabledTab = () => {
        const {
          disabledCoupons
        } = props;
        const count = props.showCount ? ` (${disabledCoupons.length})` : "";
        const title = (props.disabledTitle || t$8("disabled")) + count;
        return vue.createVNode(Tab, {
          "title": title
        }, {
          default: () => {
            var _a;
            return [vue.createVNode("div", {
              "class": bem$D("list", {
                "with-bottom": props.showCloseButton
              }),
              "style": {
                height: `${listHeight.value}px`
              }
            }, [disabledCoupons.map((coupon) => vue.createVNode(Coupon, {
              "disabled": true,
              "key": coupon.id,
              "coupon": coupon,
              "currency": props.currency
            }, null)), !disabledCoupons.length && renderEmpty(), (_a = slots["disabled-list-footer"]) == null ? void 0 : _a.call(slots)])];
          }
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
  const CouponList = withInstall(stdin_default$K);
  const [name$D] = createNamespace("time-picker");
  var stdin_default$J = vue.defineComponent({
    name: name$D,
    props: extend({}, sharedProps, {
      minHour: makeNumericProp(0),
      maxHour: makeNumericProp(23),
      minMinute: makeNumericProp(0),
      maxMinute: makeNumericProp(59),
      modelValue: String
    }),
    emits: ["confirm", "cancel", "change", "update:modelValue"],
    setup(props, {
      emit,
      slots
    }) {
      const formatValue2 = (value) => {
        const {
          minHour,
          maxHour,
          maxMinute,
          minMinute
        } = props;
        if (!value) {
          value = `${padZero(minHour)}:${padZero(minMinute)}`;
        }
        let [hour, minute] = value.split(":");
        hour = padZero(clamp(+hour, +minHour, +maxHour));
        minute = padZero(clamp(+minute, +minMinute, +maxMinute));
        return `${hour}:${minute}`;
      };
      const picker = vue.ref();
      const currentDate = vue.ref(formatValue2(props.modelValue));
      const ranges = vue.computed(() => [{
        type: "hour",
        range: [+props.minHour, +props.maxHour]
      }, {
        type: "minute",
        range: [+props.minMinute, +props.maxMinute]
      }]);
      const originColumns = vue.computed(() => ranges.value.map(({
        type,
        range: rangeArr
      }) => {
        let values = times(rangeArr[1] - rangeArr[0] + 1, (index) => padZero(rangeArr[0] + index));
        if (props.filter) {
          values = props.filter(type, values);
        }
        return {
          type,
          values
        };
      }));
      const columns = vue.computed(() => originColumns.value.map((column) => ({
        values: column.values.map((value) => props.formatter(column.type, value))
      })));
      const updateColumnValue = () => {
        const pair = currentDate.value.split(":");
        const values = [props.formatter("hour", pair[0]), props.formatter("minute", pair[1])];
        vue.nextTick(() => {
          var _a;
          (_a = picker.value) == null ? void 0 : _a.setValues(values);
        });
      };
      const updateInnerValue = () => {
        const [hourIndex, minuteIndex] = picker.value.getIndexes();
        const [hourColumn, minuteColumn] = originColumns.value;
        const hour = hourColumn.values[hourIndex] || hourColumn.values[0];
        const minute = minuteColumn.values[minuteIndex] || minuteColumn.values[0];
        currentDate.value = formatValue2(`${hour}:${minute}`);
        updateColumnValue();
      };
      const onConfirm = () => emit("confirm", currentDate.value);
      const onCancel = () => emit("cancel");
      const onChange = () => {
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
        getPicker: () => picker.value && proxyPickerMethods(picker.value, updateInnerValue)
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
  const currentYear = new Date().getFullYear();
  const [name$C] = createNamespace("date-picker");
  var stdin_default$I = vue.defineComponent({
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
    setup(props, {
      emit,
      slots
    }) {
      const formatValue2 = (value) => {
        if (isDate(value)) {
          const timestamp = clamp(value.getTime(), props.minDate.getTime(), props.maxDate.getTime());
          return new Date(timestamp);
        }
        return void 0;
      };
      const picker = vue.ref();
      const currentDate = vue.ref(formatValue2(props.modelValue));
      const getBoundary = (type, value) => {
        const boundary = props[`${type}Date`];
        const year = boundary.getFullYear();
        let month = 1;
        let date = 1;
        let hour = 0;
        let minute = 0;
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
          [`${type}Year`]: year,
          [`${type}Month`]: month,
          [`${type}Date`]: date,
          [`${type}Hour`]: hour,
          [`${type}Minute`]: minute
        };
      };
      const ranges = vue.computed(() => {
        const {
          maxYear,
          maxDate,
          maxMonth,
          maxHour,
          maxMinute
        } = getBoundary("max", currentDate.value || props.minDate);
        const {
          minYear,
          minDate,
          minMonth,
          minHour,
          minMinute
        } = getBoundary("min", currentDate.value || props.minDate);
        let result = [{
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
          const columnsOrder = props.columnsOrder.concat(result.map((column) => column.type));
          result.sort((a, b) => columnsOrder.indexOf(a.type) - columnsOrder.indexOf(b.type));
        }
        return result;
      });
      const originColumns = vue.computed(() => ranges.value.map(({
        type,
        range: rangeArr
      }) => {
        let values = times(rangeArr[1] - rangeArr[0] + 1, (index) => padZero(rangeArr[0] + index));
        if (props.filter) {
          values = props.filter(type, values);
        }
        return {
          type,
          values
        };
      }));
      const columns = vue.computed(() => originColumns.value.map((column) => ({
        values: column.values.map((value) => props.formatter(column.type, value))
      })));
      const updateColumnValue = () => {
        const value = currentDate.value || props.minDate;
        const {
          formatter
        } = props;
        const values = originColumns.value.map((column) => {
          switch (column.type) {
            case "year":
              return formatter("year", `${value.getFullYear()}`);
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
          var _a;
          (_a = picker.value) == null ? void 0 : _a.setValues(values);
        });
      };
      const updateInnerValue = () => {
        const {
          type
        } = props;
        const indexes = picker.value.getIndexes();
        const getValue = (type2) => {
          let index = 0;
          originColumns.value.forEach((column, columnIndex) => {
            if (type2 === column.type) {
              index = columnIndex;
            }
          });
          const {
            values
          } = originColumns.value[index];
          return getTrueValue(values[indexes[index]]);
        };
        let year;
        let month;
        let day;
        if (type === "month-day") {
          year = (currentDate.value || props.minDate).getFullYear();
          month = getValue("month");
          day = getValue("day");
        } else {
          year = getValue("year");
          month = getValue("month");
          day = type === "year-month" ? 1 : getValue("day");
        }
        const maxDay = getMonthEndDay(year, month);
        day = day > maxDay ? maxDay : day;
        let hour = 0;
        let minute = 0;
        if (type === "datehour") {
          hour = getValue("hour");
        }
        if (type === "datetime") {
          hour = getValue("hour");
          minute = getValue("minute");
        }
        const value = new Date(year, month - 1, day, hour, minute);
        currentDate.value = formatValue2(value);
      };
      const onConfirm = () => {
        emit("update:modelValue", currentDate.value);
        emit("confirm", currentDate.value);
      };
      const onCancel = () => emit("cancel");
      const onChange = () => {
        updateInnerValue();
        vue.nextTick(() => {
          updateInnerValue();
          vue.nextTick(() => emit("change", currentDate.value));
        });
      };
      vue.onMounted(() => {
        updateColumnValue();
        vue.nextTick(updateInnerValue);
      });
      vue.watch(columns, updateColumnValue);
      vue.watch(currentDate, (value, oldValue) => emit("update:modelValue", oldValue ? value : null));
      vue.watch(() => [props.filter, props.minDate, props.maxDate], () => {
        vue.nextTick(updateInnerValue);
      });
      vue.watch(() => props.modelValue, (value) => {
        var _a;
        value = formatValue2(value);
        if (value && value.valueOf() !== ((_a = currentDate.value) == null ? void 0 : _a.valueOf())) {
          currentDate.value = value;
        }
      });
      useExpose({
        getPicker: () => picker.value && proxyPickerMethods(picker.value, updateInnerValue)
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
  const [name$B, bem$C] = createNamespace("datetime-picker");
  const timePickerPropKeys = Object.keys(stdin_default$J.props);
  const datePickerPropKeys = Object.keys(stdin_default$I.props);
  const datetimePickerProps = extend({}, stdin_default$J.props, stdin_default$I.props, {
    modelValue: [String, Date]
  });
  var stdin_default$H = vue.defineComponent({
    name: name$B,
    props: datetimePickerProps,
    setup(props, {
      attrs,
      slots
    }) {
      const root = vue.ref();
      useExpose({
        getPicker: () => {
          var _a;
          return (_a = root.value) == null ? void 0 : _a.getPicker();
        }
      });
      return () => {
        const isTimePicker = props.type === "time";
        const Component = isTimePicker ? stdin_default$J : stdin_default$I;
        const inheritProps = pick(props, isTimePicker ? timePickerPropKeys : datePickerPropKeys);
        return vue.createVNode(Component, vue.mergeProps({
          "ref": root,
          "class": bem$C()
        }, inheritProps, attrs), slots);
      };
    }
  });
  const DatetimePicker = withInstall(stdin_default$H);
  const [name$A, bem$B, t$7] = createNamespace("dialog");
  const dialogProps = extend({}, popupSharedProps, {
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
    cancelButtonDisabled: Boolean,
    confirmButtonText: String,
    confirmButtonColor: String,
    confirmButtonDisabled: Boolean,
    showConfirmButton: truthProp,
    closeOnClickOverlay: Boolean
  });
  const popupInheritKeys$1 = [...popupSharedPropKeys, "transition", "closeOnPopstate"];
  var stdin_default$G = vue.defineComponent({
    name: name$A,
    props: dialogProps,
    emits: ["confirm", "cancel", "keydown", "update:show"],
    setup(props, {
      emit,
      slots
    }) {
      const root = vue.ref();
      const loading = vue.reactive({
        confirm: false,
        cancel: false
      });
      const updateShow = (value) => emit("update:show", value);
      const close = (action) => {
        var _a;
        updateShow(false);
        (_a = props.callback) == null ? void 0 : _a.call(props, action);
      };
      const getActionHandler = (action) => () => {
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
      const onCancel = getActionHandler("cancel");
      const onConfirm = getActionHandler("confirm");
      const onKeydown = vue.withKeys((event) => {
        var _a, _b;
        if (event.target !== ((_b = (_a = root.value) == null ? void 0 : _a.popupRef) == null ? void 0 : _b.value)) {
          return;
        }
        const onEventType = {
          Enter: props.showConfirmButton ? onConfirm : noop,
          Escape: props.showCancelButton ? onCancel : noop
        };
        onEventType[event.key]();
        emit("keydown", event);
      }, ["enter", "esc"]);
      const renderTitle = () => {
        const title = slots.title ? slots.title() : props.title;
        if (title) {
          return vue.createVNode("div", {
            "class": bem$B("header", {
              isolated: !props.message && !slots.default
            })
          }, [title]);
        }
      };
      const renderMessage = (hasTitle) => {
        const {
          message,
          allowHtml,
          messageAlign
        } = props;
        const classNames = bem$B("message", {
          "has-title": hasTitle,
          [messageAlign]: messageAlign
        });
        const content = isFunction(message) ? message() : message;
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
      const renderContent = () => {
        if (slots.default) {
          return vue.createVNode("div", {
            "class": bem$B("content")
          }, [slots.default()]);
        }
        const {
          title,
          message,
          allowHtml
        } = props;
        if (message) {
          const hasTitle = !!(title || slots.title);
          return vue.createVNode("div", {
            "key": allowHtml ? 1 : 0,
            "class": bem$B("content", {
              isolated: !hasTitle
            })
          }, [renderMessage(hasTitle)]);
        }
      };
      const renderButtons = () => vue.createVNode("div", {
        "class": [BORDER_TOP, bem$B("footer")]
      }, [props.showCancelButton && vue.createVNode(Button, {
        "size": "large",
        "text": props.cancelButtonText || t$7("cancel"),
        "class": bem$B("cancel"),
        "style": {
          color: props.cancelButtonColor
        },
        "loading": loading.cancel,
        "disabled": props.cancelButtonDisabled,
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
        "disabled": props.confirmButtonDisabled,
        "onClick": onConfirm
      }, null)]);
      const renderRoundButtons = () => vue.createVNode(ActionBar, {
        "class": bem$B("footer")
      }, {
        default: () => [props.showCancelButton && vue.createVNode(ActionBarButton, {
          "type": "warning",
          "text": props.cancelButtonText || t$7("cancel"),
          "class": bem$B("cancel"),
          "color": props.cancelButtonColor,
          "loading": loading.cancel,
          "disabled": props.cancelButtonDisabled,
          "onClick": onCancel
        }, null), props.showConfirmButton && vue.createVNode(ActionBarButton, {
          "type": "danger",
          "text": props.confirmButtonText || t$7("confirm"),
          "class": bem$B("confirm"),
          "color": props.confirmButtonColor,
          "loading": loading.confirm,
          "disabled": props.confirmButtonDisabled,
          "onClick": onConfirm
        }, null)]
      });
      const renderFooter = () => {
        if (slots.footer) {
          return slots.footer();
        }
        return props.theme === "round-button" ? renderRoundButtons() : renderButtons();
      };
      return () => {
        const {
          width: width2,
          title,
          theme,
          message,
          className
        } = props;
        return vue.createVNode(Popup, vue.mergeProps({
          "ref": root,
          "role": "dialog",
          "class": [bem$B([theme]), className],
          "style": {
            width: addUnit(width2)
          },
          "tabindex": 0,
          "aria-labelledby": title || message,
          "onKeydown": onKeydown,
          "onUpdate:show": updateShow
        }, pick(props, popupInheritKeys$1)), {
          default: () => [renderTitle(), renderContent(), renderFooter()]
        });
      };
    }
  });
  let instance$2;
  function initInstance$2() {
    const Wrapper = {
      setup() {
        const {
          state,
          toggle
        } = usePopupState();
        return () => vue.createVNode(stdin_default$G, vue.mergeProps(state, {
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
    cancelButtonDisabled: false,
    confirmButtonText: "",
    confirmButtonColor: null,
    confirmButtonDisabled: false,
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
  Dialog.Component = withInstall(stdin_default$G);
  Dialog.install = (app) => {
    app.use(Dialog.Component);
    app.config.globalProperties.$dialog = Dialog;
  };
  const [name$z, bem$A] = createNamespace("divider");
  const dividerProps = {
    dashed: Boolean,
    hairline: truthProp,
    contentPosition: makeStringProp("center")
  };
  var stdin_default$F = vue.defineComponent({
    name: name$z,
    props: dividerProps,
    setup(props, {
      slots
    }) {
      return () => {
        var _a;
        return vue.createVNode("div", {
          "role": "separator",
          "class": bem$A({
            dashed: props.dashed,
            hairline: props.hairline,
            [`content-${props.contentPosition}`]: !!slots.default
          })
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
      };
    }
  });
  const Divider = withInstall(stdin_default$F);
  const [name$y, bem$z] = createNamespace("dropdown-menu");
  const dropdownMenuProps = {
    overlay: truthProp,
    zIndex: numericProp,
    duration: makeNumericProp(0.2),
    direction: makeStringProp("down"),
    activeColor: String,
    closeOnClickOutside: truthProp,
    closeOnClickOverlay: truthProp
  };
  const DROPDOWN_KEY = Symbol(name$y);
  var stdin_default$E = vue.defineComponent({
    name: name$y,
    props: dropdownMenuProps,
    setup(props, {
      slots
    }) {
      const id = useId();
      const root = vue.ref();
      const barRef = vue.ref();
      const offset2 = vue.ref(0);
      const {
        children,
        linkChildren
      } = useChildren(DROPDOWN_KEY);
      const scrollParent = useScrollParent(root);
      const opened = vue.computed(() => children.some((item) => item.state.showWrapper));
      const barStyle = vue.computed(() => {
        if (opened.value && isDef(props.zIndex)) {
          return {
            zIndex: +props.zIndex + 1
          };
        }
      });
      const onClickAway = () => {
        if (props.closeOnClickOutside) {
          children.forEach((item) => {
            item.toggle(false);
          });
        }
      };
      const updateOffset = () => {
        if (barRef.value) {
          const rect = useRect(barRef);
          if (props.direction === "down") {
            offset2.value = rect.bottom;
          } else {
            offset2.value = windowHeight.value - rect.top;
          }
        }
      };
      const onScroll = () => {
        if (opened.value) {
          updateOffset();
        }
      };
      const toggleItem = (active) => {
        children.forEach((item, index) => {
          if (index === active) {
            updateOffset();
            item.toggle();
          } else if (item.state.showPopup) {
            item.toggle(false, {
              immediate: true
            });
          }
        });
      };
      const renderTitle = (item, index) => {
        const {
          showPopup
        } = item.state;
        const {
          disabled,
          titleClass
        } = item;
        return vue.createVNode("div", {
          "id": `${id}-${index}`,
          "role": "button",
          "tabindex": disabled ? void 0 : 0,
          "class": [bem$z("item", {
            disabled
          }), {
            [HAPTICS_FEEDBACK]: !disabled
          }],
          "onClick": () => {
            if (!disabled) {
              toggleItem(index);
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
        target: scrollParent,
        passive: true
      });
      return () => {
        var _a;
        return vue.createVNode("div", {
          "ref": root,
          "class": bem$z()
        }, [vue.createVNode("div", {
          "ref": barRef,
          "style": barStyle.value,
          "class": bem$z("bar", {
            opened: opened.value
          })
        }, [children.map(renderTitle)]), (_a = slots.default) == null ? void 0 : _a.call(slots)]);
      };
    }
  });
  const [name$x, bem$y] = createNamespace("dropdown-item");
  const dropdownItemProps = {
    title: String,
    options: makeArrayProp(),
    disabled: Boolean,
    teleport: [String, Object],
    lazyRender: truthProp,
    modelValue: unknownProp,
    titleClass: unknownProp
  };
  var stdin_default$D = vue.defineComponent({
    name: name$x,
    props: dropdownItemProps,
    emits: ["open", "opened", "close", "closed", "change", "update:modelValue"],
    setup(props, {
      emit,
      slots
    }) {
      const state = vue.reactive({
        showPopup: false,
        transition: true,
        showWrapper: false
      });
      const {
        parent,
        index
      } = useParent(DROPDOWN_KEY);
      if (!parent) {
        return;
      }
      const getEmitter = (name2) => () => emit(name2);
      const onOpen = getEmitter("open");
      const onClose = getEmitter("close");
      const onOpened = getEmitter("opened");
      const onClosed = () => {
        state.showWrapper = false;
        emit("closed");
      };
      const onClickWrapper = (event) => {
        if (props.teleport) {
          event.stopPropagation();
        }
      };
      const toggle = (show = !state.showPopup, options = {}) => {
        if (show === state.showPopup) {
          return;
        }
        state.showPopup = show;
        state.transition = !options.immediate;
        if (show) {
          state.showWrapper = true;
        }
      };
      const renderTitle = () => {
        if (slots.title) {
          return slots.title();
        }
        if (props.title) {
          return props.title;
        }
        const match = props.options.find((option) => option.value === props.modelValue);
        return match ? match.text : "";
      };
      const renderOption = (option) => {
        const {
          activeColor
        } = parent.props;
        const active = option.value === props.modelValue;
        const onClick = () => {
          state.showPopup = false;
          if (option.value !== props.modelValue) {
            emit("update:modelValue", option.value);
            emit("change", option.value);
          }
        };
        const renderIcon = () => {
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
      const renderContent = () => {
        const {
          offset: offset2
        } = parent;
        const {
          zIndex,
          overlay,
          duration,
          direction,
          closeOnClickOverlay
        } = parent.props;
        const style = getZIndexStyle(zIndex);
        if (direction === "down") {
          style.top = `${offset2.value}px`;
        } else {
          style.bottom = `${offset2.value}px`;
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
          "aria-labelledby": `${parent.id}-${index.value}`,
          "closeOnClickOverlay": closeOnClickOverlay,
          "onOpen": onOpen,
          "onClose": onClose,
          "onOpened": onOpened,
          "onClosed": onClosed
        }, {
          default: () => {
            var _a;
            return [props.options.map(renderOption), (_a = slots.default) == null ? void 0 : _a.call(slots)];
          }
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
  const DropdownItem = withInstall(stdin_default$D);
  const DropdownMenu = withInstall(stdin_default$E);
  const [name$w, bem$x] = createNamespace("grid");
  const gridProps = {
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
  const GRID_KEY = Symbol(name$w);
  var stdin_default$C = vue.defineComponent({
    name: name$w,
    props: gridProps,
    setup(props, {
      slots
    }) {
      const {
        linkChildren
      } = useChildren(GRID_KEY);
      linkChildren({
        props
      });
      return () => {
        var _a;
        return vue.createVNode("div", {
          "style": {
            paddingLeft: addUnit(props.gutter)
          },
          "class": [bem$x(), {
            [BORDER_TOP]: props.border && !props.gutter
          }]
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
      };
    }
  });
  const Grid = withInstall(stdin_default$C);
  const [name$v, bem$w] = createNamespace("grid-item");
  const gridItemProps = extend({}, routeProps, {
    dot: Boolean,
    text: String,
    icon: String,
    badge: numericProp,
    iconColor: String,
    iconPrefix: String,
    badgeProps: Object
  });
  var stdin_default$B = vue.defineComponent({
    name: name$v,
    props: gridItemProps,
    setup(props, {
      slots
    }) {
      const {
        parent,
        index
      } = useParent(GRID_KEY);
      const route2 = useRoute();
      if (!parent) {
        return;
      }
      const rootStyle = vue.computed(() => {
        const {
          square,
          gutter,
          columnNum
        } = parent.props;
        const percent = `${100 / +columnNum}%`;
        const style = {
          flexBasis: percent
        };
        if (square) {
          style.paddingTop = percent;
        } else if (gutter) {
          const gutterValue = addUnit(gutter);
          style.paddingRight = gutterValue;
          if (index.value >= columnNum) {
            style.marginTop = gutterValue;
          }
        }
        return style;
      });
      const contentStyle = vue.computed(() => {
        const {
          square,
          gutter
        } = parent.props;
        if (square && gutter) {
          const gutterValue = addUnit(gutter);
          return {
            right: gutterValue,
            bottom: gutterValue,
            height: "auto"
          };
        }
      });
      const renderIcon = () => {
        if (slots.icon) {
          return vue.createVNode(Badge, vue.mergeProps({
            "dot": props.dot,
            "content": props.badge
          }, props.badgeProps), {
            default: slots.icon
          });
        }
        if (props.icon) {
          return vue.createVNode(Icon, {
            "dot": props.dot,
            "name": props.icon,
            "size": parent.props.iconSize,
            "badge": props.badge,
            "class": bem$w("icon"),
            "color": props.iconColor,
            "badgeProps": props.badgeProps,
            "classPrefix": props.iconPrefix
          }, null);
        }
      };
      const renderText = () => {
        if (slots.text) {
          return slots.text();
        }
        if (props.text) {
          return vue.createVNode("span", {
            "class": bem$w("text")
          }, [props.text]);
        }
      };
      const renderContent = () => {
        if (slots.default) {
          return slots.default();
        }
        return [renderIcon(), renderText()];
      };
      return () => {
        const {
          center,
          border,
          square,
          gutter,
          reverse,
          direction,
          clickable
        } = parent.props;
        const classes = [bem$w("content", [direction, {
          center,
          square,
          reverse,
          clickable,
          surround: border && gutter
        }]), {
          [BORDER]: border
        }];
        return vue.createVNode("div", {
          "class": [bem$w({
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
  const GridItem = withInstall(stdin_default$B);
  const getDistance = (touches) => Math.sqrt((touches[0].clientX - touches[1].clientX) ** 2 + (touches[0].clientY - touches[1].clientY) ** 2);
  const bem$v = createNamespace("image-preview")[1];
  var stdin_default$A = vue.defineComponent({
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
    setup(props, {
      emit,
      slots
    }) {
      const state = vue.reactive({
        scale: 1,
        moveX: 0,
        moveY: 0,
        moving: false,
        zooming: false,
        imageRatio: 0,
        displayWidth: 0,
        displayHeight: 0
      });
      const touch = useTouch();
      const swipeItem = vue.ref();
      const vertical = vue.computed(() => {
        const {
          rootWidth,
          rootHeight
        } = props;
        const rootRatio = rootHeight / rootWidth;
        return state.imageRatio > rootRatio;
      });
      const imageStyle = vue.computed(() => {
        const {
          scale,
          moveX,
          moveY,
          moving,
          zooming
        } = state;
        const style = {
          transitionDuration: zooming || moving ? "0s" : ".3s"
        };
        if (scale !== 1) {
          const offsetX = moveX / scale;
          const offsetY = moveY / scale;
          style.transform = `scale(${scale}, ${scale}) translate(${offsetX}px, ${offsetY}px)`;
        }
        return style;
      });
      const maxMoveX = vue.computed(() => {
        if (state.imageRatio) {
          const {
            rootWidth,
            rootHeight
          } = props;
          const displayWidth = vertical.value ? rootHeight / state.imageRatio : rootWidth;
          return Math.max(0, (state.scale * displayWidth - rootWidth) / 2);
        }
        return 0;
      });
      const maxMoveY = vue.computed(() => {
        if (state.imageRatio) {
          const {
            rootWidth,
            rootHeight
          } = props;
          const displayHeight = vertical.value ? rootHeight : rootWidth * state.imageRatio;
          return Math.max(0, (state.scale * displayHeight - rootHeight) / 2);
        }
        return 0;
      });
      const setScale = (scale) => {
        scale = clamp(scale, +props.minZoom, +props.maxZoom + 1);
        if (scale !== state.scale) {
          state.scale = scale;
          emit("scale", {
            scale,
            index: props.active
          });
        }
      };
      const resetScale = () => {
        setScale(1);
        state.moveX = 0;
        state.moveY = 0;
      };
      const toggleScale = () => {
        const scale = state.scale > 1 ? 1 : 2;
        setScale(scale);
        state.moveX = 0;
        state.moveY = 0;
      };
      let fingerNum;
      let startMoveX;
      let startMoveY;
      let startScale;
      let startDistance;
      let doubleTapTimer;
      let touchStartTime;
      const onTouchStart = (event) => {
        const {
          touches
        } = event;
        const {
          offsetX
        } = touch;
        touch.start(event);
        fingerNum = touches.length;
        startMoveX = state.moveX;
        startMoveY = state.moveY;
        touchStartTime = Date.now();
        state.moving = fingerNum === 1 && state.scale !== 1;
        state.zooming = fingerNum === 2 && !offsetX.value;
        if (state.zooming) {
          startScale = state.scale;
          startDistance = getDistance(event.touches);
        }
      };
      const onTouchMove = (event) => {
        const {
          touches
        } = event;
        touch.move(event);
        if (state.moving || state.zooming) {
          preventDefault(event, true);
        }
        if (state.moving) {
          const {
            deltaX,
            deltaY
          } = touch;
          const moveX = deltaX.value + startMoveX;
          const moveY = deltaY.value + startMoveY;
          state.moveX = clamp(moveX, -maxMoveX.value, maxMoveX.value);
          state.moveY = clamp(moveY, -maxMoveY.value, maxMoveY.value);
        }
        if (state.zooming && touches.length === 2) {
          const distance = getDistance(touches);
          const scale = startScale * distance / startDistance;
          setScale(scale);
        }
      };
      const checkTap = () => {
        if (fingerNum > 1) {
          return;
        }
        const {
          offsetX,
          offsetY
        } = touch;
        const deltaTime = Date.now() - touchStartTime;
        const TAP_TIME = 250;
        const TAP_OFFSET = 5;
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
      const onTouchEnd = (event) => {
        let stopPropagation2 = false;
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
            if (state.scale > props.maxZoom) {
              state.scale = +props.maxZoom;
            }
          }
        }
        preventDefault(event, stopPropagation2);
        checkTap();
        touch.reset();
      };
      const onLoad = (event) => {
        const {
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
      useEventListener("touchmove", onTouchMove, {
        target: vue.computed(() => {
          var _a;
          return (_a = swipeItem.value) == null ? void 0 : _a.$el;
        })
      });
      return () => {
        const imageSlots = {
          loading: () => vue.createVNode(Loading, {
            "type": "spinner"
          }, null)
        };
        return vue.createVNode(SwipeItem, {
          "ref": swipeItem,
          "class": bem$v("swipe-item"),
          "onTouchstartPassive": onTouchStart,
          "onTouchend": onTouchEnd,
          "onTouchcancel": onTouchEnd
        }, {
          default: () => [slots.image ? vue.createVNode("div", {
            "class": bem$v("image-wrap")
          }, [slots.image({
            src: props.src
          })]) : vue.createVNode(Image$1, {
            "src": props.src,
            "fit": "contain",
            "class": bem$v("image", {
              vertical: vertical.value
            }),
            "style": imageStyle.value,
            "onLoad": onLoad
          }, imageSlots)]
        });
      };
    }
  });
  const [name$u, bem$u] = createNamespace("image-preview");
  const popupProps$1 = ["show", "transition", "overlayStyle", "closeOnPopstate"];
  const imagePreviewProps = {
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
    overlayClass: unknownProp,
    overlayStyle: Object,
    swipeDuration: makeNumericProp(300),
    startPosition: makeNumericProp(0),
    showIndicators: Boolean,
    closeOnPopstate: truthProp,
    closeIconPosition: makeStringProp("top-right")
  };
  var stdin_default$z = vue.defineComponent({
    name: name$u,
    props: imagePreviewProps,
    emits: ["scale", "close", "closed", "change", "update:show"],
    setup(props, {
      emit,
      slots
    }) {
      const swipeRef = vue.ref();
      const state = vue.reactive({
        active: 0,
        rootWidth: 0,
        rootHeight: 0
      });
      const resize = () => {
        if (swipeRef.value) {
          const rect = useRect(swipeRef.value.$el);
          state.rootWidth = rect.width;
          state.rootHeight = rect.height;
          swipeRef.value.resize();
        }
      };
      const emitScale = (args) => emit("scale", args);
      const updateShow = (show) => emit("update:show", show);
      const emitClose = () => {
        callInterceptor(props.beforeClose, {
          args: [state.active],
          done: () => updateShow(false)
        });
      };
      const setActive = (active) => {
        if (active !== state.active) {
          state.active = active;
          emit("change", active);
        }
      };
      const renderIndex = () => {
        if (props.showIndex) {
          return vue.createVNode("div", {
            "class": bem$u("index")
          }, [slots.index ? slots.index({
            index: state.active
          }) : `${state.active + 1} / ${props.images.length}`]);
        }
      };
      const renderCover = () => {
        if (slots.cover) {
          return vue.createVNode("div", {
            "class": bem$u("cover")
          }, [slots.cover()]);
        }
      };
      const renderImages = () => vue.createVNode(Swipe, {
        "ref": swipeRef,
        "lazyRender": true,
        "loop": props.loop,
        "class": bem$u("swipe"),
        "duration": props.swipeDuration,
        "initialSwipe": props.startPosition,
        "showIndicators": props.showIndicators,
        "indicatorColor": "white",
        "onChange": setActive
      }, {
        default: () => [props.images.map((image) => vue.createVNode(stdin_default$A, {
          "src": image,
          "show": props.show,
          "active": state.active,
          "maxZoom": props.maxZoom,
          "minZoom": props.minZoom,
          "rootWidth": state.rootWidth,
          "rootHeight": state.rootHeight,
          "onScale": emitScale,
          "onClose": emitClose
        }, {
          image: slots.image
        }))]
      });
      const renderClose = () => {
        if (props.closeable) {
          return vue.createVNode(Icon, {
            "role": "button",
            "name": props.closeIcon,
            "class": [bem$u("close-icon", props.closeIconPosition), HAPTICS_FEEDBACK],
            "onClick": emitClose
          }, null);
        }
      };
      const onClosed = () => emit("closed");
      const swipeTo = (index, options) => {
        var _a;
        return (_a = swipeRef.value) == null ? void 0 : _a.swipeTo(index, options);
      };
      useExpose({
        swipeTo
      });
      vue.onMounted(resize);
      vue.watch([windowWidth, windowHeight], resize);
      vue.watch(() => props.startPosition, (value) => setActive(+value));
      vue.watch(() => props.show, (value) => {
        const {
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
        "class": [bem$u(), props.className],
        "overlayClass": [bem$u("overlay"), props.overlayClass],
        "onClosed": onClosed,
        "onUpdate:show": updateShow
      }, pick(props, popupProps$1)), {
        default: () => [renderClose(), renderImages(), renderIndex(), renderCover()]
      });
    }
  });
  let instance$1;
  const defaultConfig = {
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
    overlayClass: void 0,
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
        const {
          state,
          toggle
        } = usePopupState();
        const onClosed = () => {
          state.images = [];
        };
        return () => vue.createVNode(stdin_default$z, vue.mergeProps(state, {
          "onClosed": onClosed,
          "onUpdate:show": toggle
        }), null);
      }
    }));
  }
  const ImagePreview = (options, startPosition = 0) => {
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
  ImagePreview.Component = withInstall(stdin_default$z);
  ImagePreview.install = (app) => {
    app.use(ImagePreview.Component);
  };
  function genAlphabet() {
    const charCodeOfA = "A".charCodeAt(0);
    const indexList = Array(26).fill("").map((_, i) => String.fromCharCode(charCodeOfA + i));
    return indexList;
  }
  const [name$t, bem$t] = createNamespace("index-bar");
  const indexBarProps = {
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
  const INDEX_BAR_KEY = Symbol(name$t);
  var stdin_default$y = vue.defineComponent({
    name: name$t,
    props: indexBarProps,
    emits: ["select", "change"],
    setup(props, {
      emit,
      slots
    }) {
      const root = vue.ref();
      const sidebar = vue.ref();
      const activeAnchor = vue.ref("");
      const touch = useTouch();
      const scrollParent = useScrollParent(root);
      const {
        children,
        linkChildren
      } = useChildren(INDEX_BAR_KEY);
      let selectActiveIndex;
      linkChildren({
        props
      });
      const sidebarStyle = vue.computed(() => {
        if (isDef(props.zIndex)) {
          return {
            zIndex: +props.zIndex + 1
          };
        }
      });
      const highlightStyle = vue.computed(() => {
        if (props.highlightColor) {
          return {
            color: props.highlightColor
          };
        }
      });
      const getActiveAnchor = (scrollTop, rects) => {
        for (let i = children.length - 1; i >= 0; i--) {
          const prevHeight = i > 0 ? rects[i - 1].height : 0;
          const reachTop = props.sticky ? prevHeight + props.stickyOffsetTop : 0;
          if (scrollTop + reachTop >= rects[i].top) {
            return i;
          }
        }
        return -1;
      };
      const getMatchAnchor = (index) => children.find((item) => String(item.index) === index);
      const onScroll = () => {
        if (isHidden(root)) {
          return;
        }
        const {
          sticky,
          indexList
        } = props;
        const scrollTop = getScrollTop(scrollParent.value);
        const scrollParentRect = useRect(scrollParent);
        const rects = children.map((item) => item.getRect(scrollParent.value, scrollParentRect));
        let active = -1;
        if (selectActiveIndex) {
          const match = getMatchAnchor(selectActiveIndex);
          if (match) {
            const rect = match.getRect(scrollParent.value, scrollParentRect);
            active = getActiveAnchor(rect.top, rects);
          }
        } else {
          active = getActiveAnchor(scrollTop, rects);
        }
        activeAnchor.value = indexList[active];
        if (sticky) {
          children.forEach((item, index) => {
            const {
              state,
              $el
            } = item;
            if (index === active || index === active - 1) {
              const rect = $el.getBoundingClientRect();
              state.left = rect.left;
              state.width = rect.width;
            } else {
              state.left = null;
              state.width = null;
            }
            if (index === active) {
              state.active = true;
              state.top = Math.max(props.stickyOffsetTop, rects[index].top - scrollTop) + scrollParentRect.top;
            } else if (index === active - 1 && selectActiveIndex === "") {
              const activeItemTop = rects[active].top - scrollTop;
              state.active = activeItemTop > 0;
              state.top = activeItemTop + scrollParentRect.top - rects[index].height;
            } else {
              state.active = false;
            }
          });
        }
        selectActiveIndex = "";
      };
      const init = () => {
        vue.nextTick(onScroll);
      };
      useEventListener("scroll", onScroll, {
        target: scrollParent,
        passive: true
      });
      vue.onMounted(init);
      vue.watch(() => props.indexList, init);
      vue.watch(activeAnchor, (value) => {
        if (value) {
          emit("change", value);
        }
      });
      const renderIndexes = () => props.indexList.map((index) => {
        const active = index === activeAnchor.value;
        return vue.createVNode("span", {
          "class": bem$t("index", {
            active
          }),
          "style": active ? highlightStyle.value : void 0,
          "data-index": index
        }, [index]);
      });
      const scrollTo = (index) => {
        selectActiveIndex = String(index);
        const match = getMatchAnchor(selectActiveIndex);
        if (match) {
          const scrollTop = getScrollTop(scrollParent.value);
          const scrollParentRect = useRect(scrollParent);
          const {
            offsetHeight
          } = document.documentElement;
          match.$el.scrollIntoView();
          if (scrollTop === offsetHeight - scrollParentRect.height) {
            onScroll();
            return;
          }
          if (props.sticky && props.stickyOffsetTop) {
            setRootScrollTop(getRootScrollTop() - props.stickyOffsetTop);
          }
          emit("select", match.index);
        }
      };
      const scrollToElement = (element) => {
        const {
          index
        } = element.dataset;
        if (index) {
          scrollTo(index);
        }
      };
      const onClickSidebar = (event) => {
        scrollToElement(event.target);
      };
      let touchActiveIndex;
      const onTouchMove = (event) => {
        touch.move(event);
        if (touch.isVertical()) {
          preventDefault(event);
          const {
            clientX,
            clientY
          } = event.touches[0];
          const target = document.elementFromPoint(clientX, clientY);
          if (target) {
            const {
              index
            } = target.dataset;
            if (index && touchActiveIndex !== index) {
              touchActiveIndex = index;
              scrollToElement(target);
            }
          }
        }
      };
      const renderSidebar = () => vue.createVNode("div", {
        "ref": sidebar,
        "class": bem$t("sidebar"),
        "style": sidebarStyle.value,
        "onClick": onClickSidebar,
        "onTouchstartPassive": touch.start
      }, [renderIndexes()]);
      useExpose({
        scrollTo
      });
      useEventListener("touchmove", onTouchMove, {
        target: sidebar
      });
      return () => {
        var _a;
        return vue.createVNode("div", {
          "ref": root,
          "class": bem$t()
        }, [props.teleport ? vue.createVNode(vue.Teleport, {
          "to": props.teleport
        }, {
          default: () => [renderSidebar()]
        }) : renderSidebar(), (_a = slots.default) == null ? void 0 : _a.call(slots)]);
      };
    }
  });
  const [name$s, bem$s] = createNamespace("index-anchor");
  const indexAnchorProps = {
    index: numericProp
  };
  var stdin_default$x = vue.defineComponent({
    name: name$s,
    props: indexAnchorProps,
    setup(props, {
      slots
    }) {
      const state = vue.reactive({
        top: 0,
        left: null,
        rect: {
          top: 0,
          height: 0
        },
        width: null,
        active: false
      });
      const root = vue.ref();
      const {
        parent
      } = useParent(INDEX_BAR_KEY);
      if (!parent) {
        return;
      }
      const isSticky = () => state.active && parent.props.sticky;
      const anchorStyle = vue.computed(() => {
        const {
          zIndex,
          highlightColor
        } = parent.props;
        if (isSticky()) {
          return extend(getZIndexStyle(zIndex), {
            left: state.left ? `${state.left}px` : void 0,
            width: state.width ? `${state.width}px` : void 0,
            transform: state.top ? `translate3d(0, ${state.top}px, 0)` : void 0,
            color: highlightColor
          });
        }
      });
      const getRect = (scrollParent, scrollParentRect) => {
        const rootRect = useRect(root);
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
        const sticky = isSticky();
        return vue.createVNode("div", {
          "ref": root,
          "style": {
            height: sticky ? `${state.rect.height}px` : void 0
          }
        }, [vue.createVNode("div", {
          "style": anchorStyle.value,
          "class": [bem$s({
            sticky
          }), {
            [BORDER_BOTTOM]: sticky
          }]
        }, [slots.default ? slots.default() : props.index])]);
      };
    }
  });
  const IndexAnchor = withInstall(stdin_default$x);
  const IndexBar = withInstall(stdin_default$y);
  const [name$r, bem$r, t$6] = createNamespace("list");
  const listProps = {
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
  var stdin_default$w = vue.defineComponent({
    name: name$r,
    props: listProps,
    emits: ["load", "update:error", "update:loading"],
    setup(props, {
      emit,
      slots
    }) {
      const loading = vue.ref(props.loading);
      const root = vue.ref();
      const placeholder = vue.ref();
      const tabStatus = useTabStatus();
      const scrollParent = useScrollParent(root);
      const check = () => {
        vue.nextTick(() => {
          if (loading.value || props.finished || props.error || (tabStatus == null ? void 0 : tabStatus.value) === false) {
            return;
          }
          const {
            offset: offset2,
            direction
          } = props;
          const scrollParentRect = useRect(scrollParent);
          if (!scrollParentRect.height || isHidden(root)) {
            return;
          }
          let isReachEdge = false;
          const placeholderRect = useRect(placeholder);
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
      const renderFinishedText = () => {
        if (props.finished) {
          const text = slots.finished ? slots.finished() : props.finishedText;
          if (text) {
            return vue.createVNode("div", {
              "class": bem$r("finished-text")
            }, [text]);
          }
        }
      };
      const clickErrorText = () => {
        emit("update:error", false);
        check();
      };
      const renderErrorText = () => {
        if (props.error) {
          const text = slots.error ? slots.error() : props.errorText;
          if (text) {
            return vue.createVNode("div", {
              "role": "button",
              "class": bem$r("error-text"),
              "tabindex": 0,
              "onClick": clickErrorText
            }, [text]);
          }
        }
      };
      const renderLoading = () => {
        if (loading.value && !props.finished) {
          return vue.createVNode("div", {
            "class": bem$r("loading")
          }, [slots.loading ? slots.loading() : vue.createVNode(Loading, {
            "class": bem$r("loading-icon")
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
        target: scrollParent,
        passive: true
      });
      return () => {
        var _a;
        const Content = (_a = slots.default) == null ? void 0 : _a.call(slots);
        const Placeholder = vue.createVNode("div", {
          "ref": placeholder,
          "class": bem$r("placeholder")
        }, null);
        return vue.createVNode("div", {
          "ref": root,
          "role": "feed",
          "class": bem$r(),
          "aria-busy": loading.value
        }, [props.direction === "down" ? Content : Placeholder, renderLoading(), renderFinishedText(), renderErrorText(), props.direction === "up" ? Content : Placeholder]);
      };
    }
  });
  const List = withInstall(stdin_default$w);
  const [name$q, bem$q] = createNamespace("nav-bar");
  const navBarProps = {
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
  var stdin_default$v = vue.defineComponent({
    name: name$q,
    props: navBarProps,
    emits: ["click-left", "click-right"],
    setup(props, {
      emit,
      slots
    }) {
      const navBarRef = vue.ref();
      const renderPlaceholder = usePlaceholder(navBarRef, bem$q);
      const onClickLeft = (event) => emit("click-left", event);
      const onClickRight = (event) => emit("click-right", event);
      const renderLeft = () => {
        if (slots.left) {
          return slots.left();
        }
        return [props.leftArrow && vue.createVNode(Icon, {
          "class": bem$q("arrow"),
          "name": "arrow-left"
        }, null), props.leftText && vue.createVNode("span", {
          "class": bem$q("text")
        }, [props.leftText])];
      };
      const renderRight = () => {
        if (slots.right) {
          return slots.right();
        }
        return vue.createVNode("span", {
          "class": bem$q("text")
        }, [props.rightText]);
      };
      const renderNavBar = () => {
        const {
          title,
          fixed,
          border,
          zIndex
        } = props;
        const style = getZIndexStyle(zIndex);
        const hasLeft = props.leftArrow || props.leftText || slots.left;
        const hasRight = props.rightText || slots.right;
        return vue.createVNode("div", {
          "ref": navBarRef,
          "style": style,
          "class": [bem$q({
            fixed
          }), {
            [BORDER_BOTTOM]: border,
            "van-safe-area-top": props.safeAreaInsetTop
          }]
        }, [vue.createVNode("div", {
          "class": bem$q("content")
        }, [hasLeft && vue.createVNode("div", {
          "class": [bem$q("left"), HAPTICS_FEEDBACK],
          "onClick": onClickLeft
        }, [renderLeft()]), vue.createVNode("div", {
          "class": [bem$q("title"), "van-ellipsis"]
        }, [slots.title ? slots.title() : title]), hasRight && vue.createVNode("div", {
          "class": [bem$q("right"), HAPTICS_FEEDBACK],
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
  const NavBar = withInstall(stdin_default$v);
  const [name$p, bem$p] = createNamespace("notice-bar");
  const noticeBarProps = {
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
  var stdin_default$u = vue.defineComponent({
    name: name$p,
    props: noticeBarProps,
    emits: ["close", "replay"],
    setup(props, {
      emit,
      slots
    }) {
      let wrapWidth = 0;
      let contentWidth = 0;
      let startTimer;
      const wrapRef = vue.ref();
      const contentRef = vue.ref();
      const state = vue.reactive({
        show: true,
        offset: 0,
        duration: 0
      });
      const renderLeftIcon = () => {
        if (slots["left-icon"]) {
          return slots["left-icon"]();
        }
        if (props.leftIcon) {
          return vue.createVNode(Icon, {
            "class": bem$p("left-icon"),
            "name": props.leftIcon
          }, null);
        }
      };
      const getRightIconName = () => {
        if (props.mode === "closeable") {
          return "cross";
        }
        if (props.mode === "link") {
          return "arrow";
        }
      };
      const onClickRightIcon = (event) => {
        if (props.mode === "closeable") {
          state.show = false;
          emit("close", event);
        }
      };
      const renderRightIcon = () => {
        if (slots["right-icon"]) {
          return slots["right-icon"]();
        }
        const name2 = getRightIconName();
        if (name2) {
          return vue.createVNode(Icon, {
            "name": name2,
            "class": bem$p("right-icon"),
            "onClick": onClickRightIcon
          }, null);
        }
      };
      const onTransitionEnd = () => {
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
      const renderMarquee = () => {
        const ellipsis = props.scrollable === false && !props.wrapable;
        const style = {
          transform: state.offset ? `translateX(${state.offset}px)` : "",
          transitionDuration: `${state.duration}s`
        };
        return vue.createVNode("div", {
          "ref": wrapRef,
          "role": "marquee",
          "class": bem$p("wrap")
        }, [vue.createVNode("div", {
          "ref": contentRef,
          "style": style,
          "class": [bem$p("content"), {
            "van-ellipsis": ellipsis
          }],
          "onTransitionend": onTransitionEnd
        }, [slots.default ? slots.default() : props.text])]);
      };
      const reset = () => {
        const {
          delay,
          speed,
          scrollable
        } = props;
        const ms = isDef(delay) ? +delay * 1e3 : 0;
        wrapWidth = 0;
        contentWidth = 0;
        state.offset = 0;
        state.duration = 0;
        clearTimeout(startTimer);
        startTimer = setTimeout(() => {
          if (!wrapRef.value || !contentRef.value || scrollable === false) {
            return;
          }
          const wrapRefWidth = useRect(wrapRef).width;
          const contentRefWidth = useRect(contentRef).width;
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
        const {
          color,
          wrapable,
          background
        } = props;
        return vue.withDirectives(vue.createVNode("div", {
          "role": "alert",
          "class": bem$p({
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
  const NoticeBar = withInstall(stdin_default$u);
  const [name$o, bem$o] = createNamespace("notify");
  const notifyProps = extend({}, popupSharedProps, {
    type: makeStringProp("danger"),
    color: String,
    message: numericProp,
    position: makeStringProp("top"),
    className: unknownProp,
    background: String,
    lockScroll: Boolean
  });
  var stdin_default$t = vue.defineComponent({
    name: name$o,
    props: notifyProps,
    emits: ["update:show"],
    setup(props, {
      emit,
      slots
    }) {
      const updateShow = (show) => emit("update:show", show);
      return () => vue.createVNode(Popup, {
        "show": props.show,
        "class": [bem$o([props.type]), props.className],
        "style": {
          color: props.color,
          background: props.background
        },
        "overlay": false,
        "position": props.position,
        "duration": 0.2,
        "lockScroll": props.lockScroll,
        "onUpdate:show": updateShow
      }, {
        default: () => [slots.default ? slots.default() : props.message]
      });
    }
  });
  let timer;
  let instance;
  const parseOptions = (message) => isObject(message) ? message : {
    message
  };
  function initInstance() {
    ({
      instance
    } = mountComponent({
      setup() {
        const {
          state,
          toggle
        } = usePopupState();
        return () => vue.createVNode(stdin_default$t, vue.mergeProps(state, {
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
  const getDefaultOptions = () => ({
    type: "danger",
    color: void 0,
    message: "",
    onClose: void 0,
    onClick: void 0,
    onOpened: void 0,
    duration: 3e3,
    position: void 0,
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
  Notify.Component = withInstall(stdin_default$t);
  Notify.install = (app) => {
    app.use(Notify.Component);
    app.config.globalProperties.$notify = Notify;
  };
  const [name$n, bem$n] = createNamespace("key");
  const CollapseIcon = vue.createVNode("svg", {
    "class": bem$n("collapse-icon"),
    "viewBox": "0 0 30 24"
  }, [vue.createVNode("path", {
    "d": "M26 13h-2v2h2v-2zm-8-3h2V8h-2v2zm2-4h2V4h-2v2zm2 4h4V4h-2v4h-2v2zm-7 14 3-3h-6l3 3zM6 13H4v2h2v-2zm16 0H8v2h14v-2zm-12-3h2V8h-2v2zM28 0l1 1 1 1v15l-1 2H1l-1-2V2l1-1 1-1zm0 2H2v15h26V2zM6 4v2H4V4zm10 2h2V4h-2v2zM8 9v1H4V8zm8 0v1h-2V8zm-6-5v2H8V4zm4 0v2h-2V4z",
    "fill": "currentColor"
  }, null)]);
  const DeleteIcon = vue.createVNode("svg", {
    "class": bem$n("delete-icon"),
    "viewBox": "0 0 32 22"
  }, [vue.createVNode("path", {
    "d": "M28 0a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H10.4a2 2 0 0 1-1.4-.6L1 13.1c-.6-.5-.9-1.3-.9-2 0-1 .3-1.7.9-2.2L9 .6a2 2 0 0 1 1.4-.6zm0 2H10.4l-8.2 8.3a1 1 0 0 0-.3.7c0 .3.1.5.3.7l8.2 8.4H28a2 2 0 0 0 2-2V4c0-1.1-.9-2-2-2zm-5 4a1 1 0 0 1 .7.3 1 1 0 0 1 0 1.4L20.4 11l3.3 3.3c.2.2.3.5.3.7 0 .3-.1.5-.3.7a1 1 0 0 1-.7.3 1 1 0 0 1-.7-.3L19 12.4l-3.4 3.3a1 1 0 0 1-.6.3 1 1 0 0 1-.7-.3 1 1 0 0 1-.3-.7c0-.2.1-.5.3-.7l3.3-3.3-3.3-3.3A1 1 0 0 1 14 7c0-.3.1-.5.3-.7A1 1 0 0 1 15 6a1 1 0 0 1 .6.3L19 9.6l3.3-3.3A1 1 0 0 1 23 6z",
    "fill": "currentColor"
  }, null)]);
  var stdin_default$s = vue.defineComponent({
    name: name$n,
    props: {
      type: String,
      text: numericProp,
      color: String,
      wider: Boolean,
      large: Boolean,
      loading: Boolean
    },
    emits: ["press"],
    setup(props, {
      emit,
      slots
    }) {
      const active = vue.ref(false);
      const touch = useTouch();
      const onTouchStart = (event) => {
        touch.start(event);
        active.value = true;
      };
      const onTouchMove = (event) => {
        touch.move(event);
        if (touch.direction.value) {
          active.value = false;
        }
      };
      const onTouchEnd = (event) => {
        if (active.value) {
          if (!slots.default) {
            preventDefault(event);
          }
          active.value = false;
          emit("press", props.text, props.type);
        }
      };
      const renderContent = () => {
        if (props.loading) {
          return vue.createVNode(Loading, {
            "class": bem$n("loading-icon")
          }, null);
        }
        const text = slots.default ? slots.default() : props.text;
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
        "class": bem$n("wrapper", {
          wider: props.wider
        }),
        "onTouchstartPassive": onTouchStart,
        "onTouchmovePassive": onTouchMove,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, [vue.createVNode("div", {
        "role": "button",
        "tabindex": 0,
        "class": bem$n([props.color, {
          large: props.large,
          active: active.value,
          delete: props.type === "delete"
        }])
      }, [renderContent()])]);
    }
  });
  const [name$m, bem$m] = createNamespace("number-keyboard");
  const numberKeyboardProps = {
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
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  var stdin_default$r = vue.defineComponent({
    name: name$m,
    inheritAttrs: false,
    props: numberKeyboardProps,
    emits: ["show", "hide", "blur", "input", "close", "delete", "update:modelValue"],
    setup(props, {
      emit,
      slots,
      attrs
    }) {
      const root = vue.ref();
      const genBasicKeys = () => {
        const keys2 = Array(9).fill("").map((_, i) => ({
          text: i + 1
        }));
        if (props.randomKeyOrder) {
          shuffle(keys2);
        }
        return keys2;
      };
      const genDefaultKeys = () => [...genBasicKeys(), {
        text: props.extraKey,
        type: "extra"
      }, {
        text: 0
      }, {
        text: props.showDeleteKey ? props.deleteButtonText : "",
        type: props.showDeleteKey ? "delete" : ""
      }];
      const genCustomKeys = () => {
        const keys2 = genBasicKeys();
        const {
          extraKey
        } = props;
        const extraKeys = Array.isArray(extraKey) ? extraKey : [extraKey];
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
      const keys = vue.computed(() => props.theme === "custom" ? genCustomKeys() : genDefaultKeys());
      const onBlur = () => {
        if (props.show) {
          emit("blur");
        }
      };
      const onClose = () => {
        emit("close");
        if (props.blurOnClose) {
          onBlur();
        }
      };
      const onAnimationEnd = () => emit(props.show ? "show" : "hide");
      const onPress = (text, type) => {
        if (text === "") {
          if (type === "extra") {
            onBlur();
          }
          return;
        }
        const value = props.modelValue;
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
      const renderTitle = () => {
        const {
          title,
          theme,
          closeButtonText
        } = props;
        const leftSlot = slots["title-left"];
        const showClose = closeButtonText && theme === "default";
        const showTitle = title || showClose || leftSlot;
        if (!showTitle) {
          return;
        }
        return vue.createVNode("div", {
          "class": bem$m("header")
        }, [leftSlot && vue.createVNode("span", {
          "class": bem$m("title-left")
        }, [leftSlot()]), title && vue.createVNode("h2", {
          "class": bem$m("title")
        }, [title]), showClose && vue.createVNode("button", {
          "type": "button",
          "class": [bem$m("close"), HAPTICS_FEEDBACK],
          "onClick": onClose
        }, [closeButtonText])]);
      };
      const renderKeys = () => keys.value.map((key) => {
        const keySlots = {};
        if (key.type === "delete") {
          keySlots.default = slots.delete;
        }
        if (key.type === "extra") {
          keySlots.default = slots["extra-key"];
        }
        return vue.createVNode(stdin_default$s, {
          "key": key.text,
          "text": key.text,
          "type": key.type,
          "wider": key.wider,
          "color": key.color,
          "onPress": onPress
        }, keySlots);
      });
      const renderSidebar = () => {
        if (props.theme === "custom") {
          return vue.createVNode("div", {
            "class": bem$m("sidebar")
          }, [props.showDeleteKey && vue.createVNode(stdin_default$s, {
            "large": true,
            "text": props.deleteButtonText,
            "type": "delete",
            "onPress": onPress
          }, {
            delete: slots.delete
          }), vue.createVNode(stdin_default$s, {
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
        const Title = renderTitle();
        const Content = vue.createVNode(vue.Transition, {
          "name": props.transition ? "van-slide-up" : ""
        }, {
          default: () => [vue.withDirectives(vue.createVNode("div", vue.mergeProps({
            "ref": root,
            "style": getZIndexStyle(props.zIndex),
            "class": bem$m({
              unfit: !props.safeAreaInsetBottom,
              "with-title": !!Title
            }),
            "onAnimationend": onAnimationEnd,
            "onTouchstartPassive": stopPropagation
          }, attrs), [Title, vue.createVNode("div", {
            "class": bem$m("body")
          }, [vue.createVNode("div", {
            "class": bem$m("keys")
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
  const NumberKeyboard = withInstall(stdin_default$r);
  const [name$l, bem$l, t$5] = createNamespace("pagination");
  const makePage = (number, text, active) => ({
    number,
    text,
    active
  });
  const paginationProps = {
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
  var stdin_default$q = vue.defineComponent({
    name: name$l,
    props: paginationProps,
    emits: ["change", "update:modelValue"],
    setup(props, {
      emit,
      slots
    }) {
      const count = vue.computed(() => {
        const {
          pageCount,
          totalItems,
          itemsPerPage
        } = props;
        const count2 = +pageCount || Math.ceil(+totalItems / +itemsPerPage);
        return Math.max(1, count2);
      });
      const pages = vue.computed(() => {
        const items = [];
        const pageCount = count.value;
        const showPageSize = +props.showPageSize;
        const {
          modelValue,
          forceEllipses
        } = props;
        let startPage = 1;
        let endPage = pageCount;
        const isMaxSized = showPageSize < pageCount;
        if (isMaxSized) {
          startPage = Math.max(modelValue - Math.floor(showPageSize / 2), 1);
          endPage = startPage + showPageSize - 1;
          if (endPage > pageCount) {
            endPage = pageCount;
            startPage = endPage - showPageSize + 1;
          }
        }
        for (let number = startPage; number <= endPage; number++) {
          const page = makePage(number, number, number === modelValue);
          items.push(page);
        }
        if (isMaxSized && showPageSize > 0 && forceEllipses) {
          if (startPage > 1) {
            const prevPages = makePage(startPage - 1, "...");
            items.unshift(prevPages);
          }
          if (endPage < pageCount) {
            const nextPages = makePage(endPage + 1, "...");
            items.push(nextPages);
          }
        }
        return items;
      });
      const updateModelValue = (value, emitChange) => {
        value = clamp(value, 1, count.value);
        if (props.modelValue !== value) {
          emit("update:modelValue", value);
          if (emitChange) {
            emit("change", value);
          }
        }
      };
      vue.watchEffect(() => updateModelValue(props.modelValue));
      const renderDesc = () => vue.createVNode("li", {
        "class": bem$l("page-desc")
      }, [slots.pageDesc ? slots.pageDesc() : `${props.modelValue}/${count.value}`]);
      const renderPrevButton = () => {
        const {
          mode,
          modelValue
        } = props;
        const slot = slots["prev-text"];
        const disabled = modelValue === 1;
        return vue.createVNode("li", {
          "class": [bem$l("item", {
            disabled,
            border: mode === "simple",
            prev: true
          }), BORDER_SURROUND]
        }, [vue.createVNode("button", {
          "type": "button",
          "disabled": disabled,
          "onClick": () => updateModelValue(modelValue - 1, true)
        }, [slot ? slot() : props.prevText || t$5("prev")])]);
      };
      const renderNextButton = () => {
        const {
          mode,
          modelValue
        } = props;
        const slot = slots["next-text"];
        const disabled = modelValue === count.value;
        return vue.createVNode("li", {
          "class": [bem$l("item", {
            disabled,
            border: mode === "simple",
            next: true
          }), BORDER_SURROUND]
        }, [vue.createVNode("button", {
          "type": "button",
          "disabled": disabled,
          "onClick": () => updateModelValue(modelValue + 1, true)
        }, [slot ? slot() : props.nextText || t$5("next")])]);
      };
      const renderPages = () => pages.value.map((page) => vue.createVNode("li", {
        "class": [bem$l("item", {
          active: page.active,
          page: true
        }), BORDER_SURROUND]
      }, [vue.createVNode("button", {
        "type": "button",
        "aria-current": page.active || void 0,
        "onClick": () => updateModelValue(page.number, true)
      }, [slots.page ? slots.page(page) : page.text])]));
      return () => vue.createVNode("nav", {
        "role": "navigation",
        "class": bem$l()
      }, [vue.createVNode("ul", {
        "class": bem$l("items")
      }, [renderPrevButton(), props.mode === "simple" ? renderDesc() : renderPages(), renderNextButton()])]);
    }
  });
  const Pagination = withInstall(stdin_default$q);
  const [name$k, bem$k] = createNamespace("password-input");
  const passwordInputProps = {
    info: String,
    mask: truthProp,
    value: makeStringProp(""),
    gutter: numericProp,
    length: makeNumericProp(6),
    focused: Boolean,
    errorInfo: String
  };
  var stdin_default$p = vue.defineComponent({
    name: name$k,
    props: passwordInputProps,
    emits: ["focus"],
    setup(props, {
      emit
    }) {
      const onTouchStart = (event) => {
        event.stopPropagation();
        emit("focus", event);
      };
      const renderPoints = () => {
        const Points = [];
        const {
          mask,
          value,
          length,
          gutter,
          focused
        } = props;
        for (let i = 0; i < length; i++) {
          const char = value[i];
          const showBorder = i !== 0 && !gutter;
          const showCursor = focused && i === value.length;
          let style;
          if (i !== 0 && gutter) {
            style = {
              marginLeft: addUnit(gutter)
            };
          }
          Points.push(vue.createVNode("li", {
            "class": [{
              [BORDER_LEFT]: showBorder
            }, bem$k("item", {
              focus: showCursor
            })],
            "style": style
          }, [mask ? vue.createVNode("i", {
            "style": {
              visibility: char ? "visible" : "hidden"
            }
          }, null) : char, showCursor && vue.createVNode("div", {
            "class": bem$k("cursor")
          }, null)]));
        }
        return Points;
      };
      return () => {
        const info = props.errorInfo || props.info;
        return vue.createVNode("div", {
          "class": bem$k()
        }, [vue.createVNode("ul", {
          "class": [bem$k("security"), {
            [BORDER_SURROUND]: !props.gutter
          }],
          "onTouchstartPassive": onTouchStart
        }, [renderPoints()]), info && vue.createVNode("div", {
          "class": bem$k(props.errorInfo ? "error-info" : "info")
        }, [info])]);
      };
    }
  });
  const PasswordInput = withInstall(stdin_default$p);
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
  var round = Math.round;
  function getUAString() {
    var uaData = navigator.userAgentData;
    if (uaData != null && uaData.brands) {
      return uaData.brands.map(function(item) {
        return item.brand + "/" + item.version;
      }).join(" ");
    }
    return navigator.userAgent;
  }
  function isLayoutViewport() {
    return !/^((?!chrome|android).)*safari/i.test(getUAString());
  }
  function getBoundingClientRect(element, includeScale, isFixedStrategy) {
    if (includeScale === void 0) {
      includeScale = false;
    }
    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }
    var clientRect = element.getBoundingClientRect();
    var scaleX = 1;
    var scaleY = 1;
    if (includeScale && isHTMLElement(element)) {
      scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
      scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
    }
    var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
    var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
    var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
    var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
    var width2 = clientRect.width / scaleX;
    var height2 = clientRect.height / scaleY;
    return {
      width: width2,
      height: height2,
      top: y,
      right: x + width2,
      bottom: y + height2,
      left: x,
      x,
      y
    };
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
    var scaleX = round(rect.width) / element.offsetWidth || 1;
    var scaleY = round(rect.height) / element.offsetHeight || 1;
    return scaleX !== 1 || scaleY !== 1;
  }
  function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) {
      isFixed = false;
    }
    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
    var documentElement = getDocumentElement(offsetParent);
    var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
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
        offsets = getBoundingClientRect(offsetParent, true);
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
    var isFirefox = /firefox/i.test(getUAString());
    var isIE = /Trident/i.test(getUAString());
    if (isIE && isHTMLElement(element)) {
      var elementCss = getComputedStyle(element);
      if (elementCss.position === "fixed") {
        return null;
      }
    }
    var currentNode = getParentNode(element);
    if (isShadowRoot(currentNode)) {
      currentNode = currentNode.host;
    }
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
    var map = /* @__PURE__ */ new Map();
    var visited = /* @__PURE__ */ new Set();
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
  function debounce(fn2) {
    var pending;
    return function() {
      if (!pending) {
        pending = new Promise(function(resolve) {
          Promise.resolve().then(function() {
            pending = void 0;
            resolve(fn2());
          });
        });
      }
      return pending;
    };
  }
  function format(str) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return [].concat(args).reduce(function(p, c) {
      return p.replace(/%s/, c);
    }, str);
  }
  var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
  var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
  var VALID_PROPERTIES = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
  function validateModifiers(modifiers) {
    modifiers.forEach(function(modifier) {
      [].concat(Object.keys(modifier), VALID_PROPERTIES).filter(function(value, index, self2) {
        return self2.indexOf(value) === index;
      }).forEach(function(key) {
        switch (key) {
          case "name":
            if (typeof modifier.name !== "string") {
              console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', '"' + String(modifier.name) + '"'));
            }
            break;
          case "enabled":
            if (typeof modifier.enabled !== "boolean") {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', '"' + String(modifier.enabled) + '"'));
            }
            break;
          case "phase":
            if (modifierPhases.indexOf(modifier.phase) < 0) {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(", "), '"' + String(modifier.phase) + '"'));
            }
            break;
          case "fn":
            if (typeof modifier.fn !== "function") {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', '"' + String(modifier.fn) + '"'));
            }
            break;
          case "effect":
            if (modifier.effect != null && typeof modifier.effect !== "function") {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', '"' + String(modifier.fn) + '"'));
            }
            break;
          case "requires":
            if (modifier.requires != null && !Array.isArray(modifier.requires)) {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', '"' + String(modifier.requires) + '"'));
            }
            break;
          case "requiresIfExists":
            if (!Array.isArray(modifier.requiresIfExists)) {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', '"' + String(modifier.requiresIfExists) + '"'));
            }
            break;
          case "options":
          case "data":
            break;
          default:
            console.error('PopperJS: an invalid property has been provided to the "' + modifier.name + '" modifier, valid properties are ' + VALID_PROPERTIES.map(function(s) {
              return '"' + s + '"';
            }).join(", ") + '; but "' + key + '" was provided.');
        }
        modifier.requires && modifier.requires.forEach(function(requirement) {
          if (modifiers.find(function(mod) {
            return mod.name === requirement;
          }) == null) {
            console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
          }
        });
      });
    });
  }
  function uniqueBy(arr, fn2) {
    var identifiers = /* @__PURE__ */ new Set();
    return arr.filter(function(item) {
      var identifier = fn2(item);
      if (!identifiers.has(identifier)) {
        identifiers.add(identifier);
        return true;
      }
    });
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
  var INVALID_ELEMENT_ERROR = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
  var INFINITE_LOOP_ERROR = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
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
          {
            var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function(_ref) {
              var name2 = _ref.name;
              return name2;
            });
            validateModifiers(modifiers);
            if (getBasePlacement(state.options.placement) === auto) {
              var flipModifier = state.orderedModifiers.find(function(_ref2) {
                var name2 = _ref2.name;
                return name2 === "flip";
              });
              if (!flipModifier) {
                console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
              }
            }
            var _getComputedStyle = getComputedStyle(popper), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft;
            if ([marginTop, marginRight, marginBottom, marginLeft].some(function(margin) {
              return parseFloat(margin);
            })) {
              console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
            }
          }
          runModifierEffects();
          return instance2.update();
        },
        forceUpdate: function forceUpdate() {
          if (isDestroyed) {
            return;
          }
          var _state$elements = state.elements, reference2 = _state$elements.reference, popper2 = _state$elements.popper;
          if (!areValidElements(reference2, popper2)) {
            {
              console.error(INVALID_ELEMENT_ERROR);
            }
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
          var __debug_loops__ = 0;
          for (var index = 0; index < state.orderedModifiers.length; index++) {
            {
              __debug_loops__ += 1;
              if (__debug_loops__ > 100) {
                console.error(INFINITE_LOOP_ERROR);
                break;
              }
            }
            if (state.reset === true) {
              state.reset = false;
              index = -1;
              continue;
            }
            var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name2 = _state$orderedModifie.name;
            if (typeof fn2 === "function") {
              state = fn2({
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
        {
          console.error(INVALID_ELEMENT_ERROR);
        }
        return instance2;
      }
      instance2.setOptions(options).then(function(state2) {
        if (!isDestroyed && options.onFirstUpdate) {
          options.onFirstUpdate(state2);
        }
      });
      function runModifierEffects() {
        state.orderedModifiers.forEach(function(_ref3) {
          var name2 = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect3 = _ref3.effect;
          if (typeof effect3 === "function") {
            var cleanupFn = effect3({
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
        effectCleanupFns.forEach(function(fn2) {
          return fn2();
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
  var eventListeners_default = {
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
  var popperOffsets_default = {
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
      x: round(x * dpr) / dpr || 0,
      y: round(y * dpr) / dpr || 0
    };
  }
  function mapToStyles(_ref2) {
    var _Object$assign2;
    var popper = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
    var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
    var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
      x,
      y
    }) : {
      x,
      y
    };
    x = _ref3.x;
    y = _ref3.y;
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
        var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
        y -= offsetY - popperRect.height;
        y *= gpuAcceleration ? 1 : -1;
      }
      if (placement === left || (placement === top || placement === bottom) && variation === end) {
        sideX = right;
        var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
        x -= offsetX - popperRect.width;
        x *= gpuAcceleration ? 1 : -1;
      }
    }
    var commonStyles = Object.assign({
      position
    }, adaptive && unsetSides);
    var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
      x,
      y
    }) : {
      x,
      y
    };
    x = _ref4.x;
    y = _ref4.y;
    if (gpuAcceleration) {
      var _Object$assign;
      return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }
    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
  }
  function computeStyles(_ref5) {
    var state = _ref5.state, options = _ref5.options;
    var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
    {
      var transitionProperty = getComputedStyle(state.elements.popper).transitionProperty || "";
      if (adaptive && ["transform", "top", "right", "bottom", "left"].some(function(property) {
        return transitionProperty.indexOf(property) >= 0;
      })) {
        console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
      }
    }
    var commonStyles = {
      placement: getBasePlacement(state.placement),
      variation: getVariation(state.placement),
      popper: state.elements.popper,
      popperRect: state.rects.popper,
      gpuAcceleration,
      isFixed: state.options.strategy === "fixed"
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
  var computeStyles_default = {
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
      Object.keys(attributes).forEach(function(name22) {
        var value = attributes[name22];
        if (value === false) {
          element.removeAttribute(name22);
        } else {
          element.setAttribute(name22, value === true ? "" : value);
        }
      });
    });
  }
  function effect2(_ref2) {
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
  var applyStyles_default = {
    name: "applyStyles",
    enabled: true,
    phase: "write",
    fn: applyStyles,
    effect: effect2,
    requires: ["computeStyles"]
  };
  var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default];
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
  var offset_default = {
    name: "offset",
    enabled: true,
    phase: "main",
    requires: ["popperOffsets"],
    fn: offset
  };
  const [name$j, bem$j] = createNamespace("popover");
  const popupProps = ["show", "overlay", "duration", "teleport", "overlayStyle", "overlayClass", "closeOnClickOverlay"];
  const popoverProps = {
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
  var stdin_default$o = vue.defineComponent({
    name: name$j,
    props: popoverProps,
    emits: ["select", "touchstart", "update:show"],
    setup(props, {
      emit,
      slots,
      attrs
    }) {
      let popper;
      const popupRef = vue.ref();
      const wrapperRef = vue.ref();
      const popoverRef = vue.ref();
      const getPopoverOptions = () => ({
        placement: props.placement,
        modifiers: [{
          name: "computeStyles",
          options: {
            adaptive: false,
            gpuAcceleration: false
          }
        }, extend({}, offset_default, {
          options: {
            offset: props.offset
          }
        })]
      });
      const createPopperInstance = () => {
        if (wrapperRef.value && popoverRef.value) {
          return createPopper(wrapperRef.value, popoverRef.value.popupRef.value, getPopoverOptions());
        }
        return null;
      };
      const updateLocation = () => {
        vue.nextTick(() => {
          if (!props.show) {
            return;
          }
          if (!popper) {
            popper = createPopperInstance();
          } else {
            popper.setOptions(getPopoverOptions());
          }
        });
      };
      const updateShow = (value) => emit("update:show", value);
      const onClickWrapper = () => {
        if (props.trigger === "click") {
          updateShow(!props.show);
        }
      };
      const onClickAction = (action, index) => {
        if (action.disabled) {
          return;
        }
        emit("select", action, index);
        if (props.closeOnClickAction) {
          updateShow(false);
        }
      };
      const onClickAway = () => {
        if (props.show && props.closeOnClickOutside && (!props.overlay || props.closeOnClickOverlay)) {
          updateShow(false);
        }
      };
      const renderActionContent = (action, index) => {
        if (slots.action) {
          return slots.action({
            action,
            index
          });
        }
        return [action.icon && vue.createVNode(Icon, {
          "name": action.icon,
          "classPrefix": props.iconPrefix,
          "class": bem$j("action-icon")
        }, null), vue.createVNode("div", {
          "class": [bem$j("action-text"), BORDER_BOTTOM]
        }, [action.text])];
      };
      const renderAction = (action, index) => {
        const {
          icon,
          color,
          disabled,
          className
        } = action;
        return vue.createVNode("div", {
          "role": "menuitem",
          "class": [bem$j("action", {
            disabled,
            "with-icon": icon
          }), className],
          "style": {
            color
          },
          "tabindex": disabled ? void 0 : 0,
          "aria-disabled": disabled || void 0,
          "onClick": () => onClickAction(action, index)
        }, [renderActionContent(action, index)]);
      };
      vue.onMounted(() => {
        updateLocation();
        vue.watchEffect(() => {
          var _a;
          popupRef.value = (_a = popoverRef.value) == null ? void 0 : _a.popupRef.value;
        });
      });
      vue.onBeforeUnmount(() => {
        if (popper) {
          popper.destroy();
          popper = null;
        }
      });
      vue.watch(() => [props.show, props.offset, props.placement], updateLocation);
      useClickAway([wrapperRef, popupRef], onClickAway, {
        eventName: "touchstart"
      });
      return () => {
        var _a;
        return vue.createVNode(vue.Fragment, null, [vue.createVNode("span", {
          "ref": wrapperRef,
          "class": bem$j("wrapper"),
          "onClick": onClickWrapper
        }, [(_a = slots.reference) == null ? void 0 : _a.call(slots)]), vue.createVNode(Popup, vue.mergeProps({
          "ref": popoverRef,
          "class": bem$j([props.theme]),
          "position": "",
          "transition": "van-popover-zoom",
          "lockScroll": false,
          "onUpdate:show": updateShow
        }, attrs, pick(props, popupProps)), {
          default: () => [props.showArrow && vue.createVNode("div", {
            "class": bem$j("arrow")
          }, null), vue.createVNode("div", {
            "role": "menu",
            "class": bem$j("content")
          }, [slots.default ? slots.default() : props.actions.map(renderAction)])]
        })]);
      };
    }
  });
  const Popover = withInstall(stdin_default$o);
  const [name$i, bem$i] = createNamespace("progress");
  const progressProps = {
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
  var stdin_default$n = vue.defineComponent({
    name: name$i,
    props: progressProps,
    setup(props) {
      const background = vue.computed(() => props.inactive ? void 0 : props.color);
      const renderPivot = () => {
        const {
          textColor,
          pivotText,
          pivotColor,
          percentage
        } = props;
        const text = pivotText != null ? pivotText : `${percentage}%`;
        if (props.showPivot && text) {
          const style = {
            color: textColor,
            left: `${+percentage}%`,
            transform: `translate(-${+percentage}%,-50%)`,
            background: pivotColor || background.value
          };
          return vue.createVNode("span", {
            "style": style,
            "class": bem$i("pivot", {
              inactive: props.inactive
            })
          }, [text]);
        }
      };
      return () => {
        const {
          trackColor,
          percentage,
          strokeWidth
        } = props;
        const rootStyle = {
          background: trackColor,
          height: addUnit(strokeWidth)
        };
        const portionStyle = {
          width: `${percentage}%`,
          background: background.value
        };
        return vue.createVNode("div", {
          "class": bem$i(),
          "style": rootStyle
        }, [vue.createVNode("span", {
          "class": bem$i("portion", {
            inactive: props.inactive
          }),
          "style": portionStyle
        }, null), renderPivot()]);
      };
    }
  });
  const Progress = withInstall(stdin_default$n);
  const [name$h, bem$h, t$4] = createNamespace("pull-refresh");
  const DEFAULT_HEAD_HEIGHT = 50;
  const TEXT_STATUS = ["pulling", "loosing", "success"];
  const pullRefreshProps = {
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
  var stdin_default$m = vue.defineComponent({
    name: name$h,
    props: pullRefreshProps,
    emits: ["change", "refresh", "update:modelValue"],
    setup(props, {
      emit,
      slots
    }) {
      let reachTop;
      const root = vue.ref();
      const track = vue.ref();
      const scrollParent = useScrollParent(root);
      const state = vue.reactive({
        status: "normal",
        distance: 0,
        duration: 0
      });
      const touch = useTouch();
      const getHeadStyle = () => {
        if (props.headHeight !== DEFAULT_HEAD_HEIGHT) {
          return {
            height: `${props.headHeight}px`
          };
        }
      };
      const isTouchable = () => state.status !== "loading" && state.status !== "success" && !props.disabled;
      const ease = (distance) => {
        const pullDistance = +(props.pullDistance || props.headHeight);
        if (distance > pullDistance) {
          if (distance < pullDistance * 2) {
            distance = pullDistance + (distance - pullDistance) / 2;
          } else {
            distance = pullDistance * 1.5 + (distance - pullDistance * 2) / 4;
          }
        }
        return Math.round(distance);
      };
      const setStatus = (distance, isLoading) => {
        const pullDistance = +(props.pullDistance || props.headHeight);
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
        emit("change", {
          status: state.status,
          distance
        });
      };
      const getStatusText = () => {
        const {
          status
        } = state;
        if (status === "normal") {
          return "";
        }
        return props[`${status}Text`] || t$4(status);
      };
      const renderStatus = () => {
        const {
          status,
          distance
        } = state;
        if (slots[status]) {
          return slots[status]({
            distance
          });
        }
        const nodes = [];
        if (TEXT_STATUS.includes(status)) {
          nodes.push(vue.createVNode("div", {
            "class": bem$h("text")
          }, [getStatusText()]));
        }
        if (status === "loading") {
          nodes.push(vue.createVNode(Loading, {
            "class": bem$h("loading")
          }, {
            default: getStatusText
          }));
        }
        return nodes;
      };
      const showSuccessTip = () => {
        state.status = "success";
        setTimeout(() => {
          setStatus(0);
        }, +props.successDuration);
      };
      const checkPosition = (event) => {
        reachTop = getScrollTop(scrollParent.value) === 0;
        if (reachTop) {
          state.duration = 0;
          touch.start(event);
        }
      };
      const onTouchStart = (event) => {
        if (isTouchable()) {
          checkPosition(event);
        }
      };
      const onTouchMove = (event) => {
        if (isTouchable()) {
          if (!reachTop) {
            checkPosition(event);
          }
          const {
            deltaY
          } = touch;
          touch.move(event);
          if (reachTop && deltaY.value >= 0 && touch.isVertical()) {
            preventDefault(event);
            setStatus(ease(deltaY.value));
          }
        }
      };
      const onTouchEnd = () => {
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
      useEventListener("touchmove", onTouchMove, {
        target: track
      });
      return () => {
        var _a;
        const trackStyle = {
          transitionDuration: `${state.duration}ms`,
          transform: state.distance ? `translate3d(0,${state.distance}px, 0)` : ""
        };
        return vue.createVNode("div", {
          "ref": root,
          "class": bem$h()
        }, [vue.createVNode("div", {
          "ref": track,
          "class": bem$h("track"),
          "style": trackStyle,
          "onTouchstartPassive": onTouchStart,
          "onTouchend": onTouchEnd,
          "onTouchcancel": onTouchEnd
        }, [vue.createVNode("div", {
          "class": bem$h("head"),
          "style": getHeadStyle()
        }, [renderStatus()]), (_a = slots.default) == null ? void 0 : _a.call(slots)])]);
      };
    }
  });
  const PullRefresh = withInstall(stdin_default$m);
  const [name$g, bem$g] = createNamespace("rate");
  function getRateStatus(value, index, allowHalf, readonly) {
    if (value >= index) {
      return {
        status: "full",
        value: 1
      };
    }
    if (value + 0.5 >= index && allowHalf && !readonly) {
      return {
        status: "half",
        value: 0.5
      };
    }
    if (value + 1 >= index && allowHalf && readonly) {
      const cardinal = 10 ** 10;
      return {
        status: "half",
        value: Math.round((value - index + 1) * cardinal) / cardinal
      };
    }
    return {
      status: "void",
      value: 0
    };
  }
  const rateProps = {
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
  var stdin_default$l = vue.defineComponent({
    name: name$g,
    props: rateProps,
    emits: ["change", "update:modelValue"],
    setup(props, {
      emit
    }) {
      const touch = useTouch();
      const [itemRefs, setItemRefs] = useRefs();
      const groupRef = vue.ref();
      const untouchable = () => props.readonly || props.disabled || !props.touchable;
      const list = vue.computed(() => Array(+props.count).fill("").map((_, i) => getRateStatus(props.modelValue, i + 1, props.allowHalf, props.readonly)));
      let ranges;
      let groupRefRect;
      let minRectTop = Number.MAX_SAFE_INTEGER;
      let maxRectTop = Number.MIN_SAFE_INTEGER;
      const updateRanges = () => {
        groupRefRect = useRect(groupRef);
        const rects = itemRefs.value.map(useRect);
        ranges = [];
        rects.forEach((rect, index) => {
          minRectTop = Math.min(rect.top, minRectTop);
          maxRectTop = Math.max(rect.top, maxRectTop);
          if (props.allowHalf) {
            ranges.push({
              score: index + 0.5,
              left: rect.left,
              top: rect.top,
              height: rect.height
            }, {
              score: index + 1,
              left: rect.left + rect.width / 2,
              top: rect.top,
              height: rect.height
            });
          } else {
            ranges.push({
              score: index + 1,
              left: rect.left,
              top: rect.top,
              height: rect.height
            });
          }
        });
      };
      const getScoreByPosition = (x, y) => {
        for (let i = ranges.length - 1; i > 0; i--) {
          if (y >= groupRefRect.top && y <= groupRefRect.bottom) {
            if (x > ranges[i].left && y >= ranges[i].top && y <= ranges[i].top + ranges[i].height) {
              return ranges[i].score;
            }
          } else {
            const curTop = y < groupRefRect.top ? minRectTop : maxRectTop;
            if (x > ranges[i].left && ranges[i].top === curTop) {
              return ranges[i].score;
            }
          }
        }
        return props.allowHalf ? 0.5 : 1;
      };
      const select = (index) => {
        if (!props.disabled && !props.readonly && index !== props.modelValue) {
          emit("update:modelValue", index);
          emit("change", index);
        }
      };
      const onTouchStart = (event) => {
        if (untouchable()) {
          return;
        }
        touch.start(event);
        updateRanges();
      };
      const onTouchMove = (event) => {
        if (untouchable()) {
          return;
        }
        touch.move(event);
        if (touch.isHorizontal()) {
          const {
            clientX,
            clientY
          } = event.touches[0];
          preventDefault(event);
          select(getScoreByPosition(clientX, clientY));
        }
      };
      const renderStar = (item, index) => {
        const {
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
        const score = index + 1;
        const isFull = item.status === "full";
        const isVoid = item.status === "void";
        const renderHalf = allowHalf && item.value > 0 && item.value < 1;
        let style;
        if (gutter && score !== +count) {
          style = {
            paddingRight: addUnit(gutter)
          };
        }
        const onClickItem = (event) => {
          updateRanges();
          select(allowHalf ? getScoreByPosition(event.clientX, event.clientY) : score);
        };
        return vue.createVNode("div", {
          "key": index,
          "ref": setItemRefs(index),
          "role": "radio",
          "style": style,
          "class": bem$g("item"),
          "tabindex": disabled ? void 0 : 0,
          "aria-setsize": count,
          "aria-posinset": score,
          "aria-checked": !isVoid,
          "onClick": onClickItem
        }, [vue.createVNode(Icon, {
          "size": size,
          "name": isFull ? icon : voidIcon,
          "class": bem$g("icon", {
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
          "class": bem$g("icon", ["half", {
            disabled,
            full: !isVoid
          }]),
          "color": disabled ? disabledColor : isVoid ? voidColor : color,
          "classPrefix": iconPrefix
        }, null)]);
      };
      useCustomFieldValue(() => props.modelValue);
      useEventListener("touchmove", onTouchMove, {
        target: groupRef
      });
      return () => vue.createVNode("div", {
        "ref": groupRef,
        "role": "radiogroup",
        "class": bem$g({
          readonly: props.readonly,
          disabled: props.disabled
        }),
        "tabindex": props.disabled ? void 0 : 0,
        "aria-disabled": props.disabled,
        "aria-readonly": props.readonly,
        "onTouchstartPassive": onTouchStart
      }, [list.value.map(renderStar)]);
    }
  });
  const Rate = withInstall(stdin_default$l);
  const Row = withInstall(stdin_default$V);
  const [name$f, bem$f, t$3] = createNamespace("search");
  const searchProps = extend({}, fieldSharedProps, {
    label: String,
    shape: makeStringProp("square"),
    leftIcon: makeStringProp("search"),
    clearable: truthProp,
    actionText: String,
    background: String,
    showAction: Boolean
  });
  var stdin_default$k = vue.defineComponent({
    name: name$f,
    props: searchProps,
    emits: ["blur", "focus", "clear", "search", "cancel", "click-input", "click-left-icon", "click-right-icon", "update:modelValue"],
    setup(props, {
      emit,
      slots,
      attrs
    }) {
      const id = useId();
      const filedRef = vue.ref();
      const onCancel = () => {
        if (!slots.action) {
          emit("update:modelValue", "");
          emit("cancel");
        }
      };
      const onKeypress = (event) => {
        const ENTER_CODE = 13;
        if (event.keyCode === ENTER_CODE) {
          preventDefault(event);
          emit("search", props.modelValue);
        }
      };
      const getInputId = () => props.id || `${id}-input`;
      const renderLabel = () => {
        if (slots.label || props.label) {
          return vue.createVNode("label", {
            "class": bem$f("label"),
            "for": getInputId()
          }, [slots.label ? slots.label() : props.label]);
        }
      };
      const renderAction = () => {
        if (props.showAction) {
          const text = props.actionText || t$3("cancel");
          return vue.createVNode("div", {
            "class": bem$f("action"),
            "role": "button",
            "tabindex": 0,
            "onClick": onCancel
          }, [slots.action ? slots.action() : text]);
        }
      };
      const blur = () => {
        var _a;
        return (_a = filedRef.value) == null ? void 0 : _a.blur();
      };
      const focus = () => {
        var _a;
        return (_a = filedRef.value) == null ? void 0 : _a.focus();
      };
      const onBlur = (event) => emit("blur", event);
      const onFocus = (event) => emit("focus", event);
      const onClear = (event) => emit("clear", event);
      const onClickInput = (event) => emit("click-input", event);
      const onClickLeftIcon = (event) => emit("click-left-icon", event);
      const onClickRightIcon = (event) => emit("click-right-icon", event);
      const fieldPropNames = Object.keys(fieldSharedProps);
      const renderField = () => {
        const fieldAttrs = extend({}, attrs, pick(props, fieldPropNames), {
          id: getInputId()
        });
        const onInput = (value) => emit("update:modelValue", value);
        return vue.createVNode(Field, vue.mergeProps({
          "ref": filedRef,
          "type": "search",
          "class": bem$f("field"),
          "border": false,
          "onBlur": onBlur,
          "onFocus": onFocus,
          "onClear": onClear,
          "onKeypress": onKeypress,
          "onClick-input": onClickInput,
          "onClick-left-icon": onClickLeftIcon,
          "onClick-right-icon": onClickRightIcon,
          "onUpdate:modelValue": onInput
        }, fieldAttrs), pick(slots, ["left-icon", "right-icon"]));
      };
      useExpose({
        focus,
        blur
      });
      return () => {
        var _a;
        return vue.createVNode("div", {
          "class": bem$f({
            "show-action": props.showAction
          }),
          "style": {
            background: props.background
          }
        }, [(_a = slots.left) == null ? void 0 : _a.call(slots), vue.createVNode("div", {
          "class": bem$f("content", props.shape)
        }, [renderLabel(), renderField()]), renderAction()]);
      };
    }
  });
  const Search = withInstall(stdin_default$k);
  const popupInheritKeys = [...popupSharedPropKeys, "round", "closeOnPopstate", "safeAreaInsetBottom"];
  const iconMap = {
    qq: "qq",
    link: "link-o",
    weibo: "weibo",
    qrcode: "qr",
    poster: "photo-o",
    wechat: "wechat",
    "weapp-qrcode": "miniprogram-o",
    "wechat-moments": "wechat-moments"
  };
  const [name$e, bem$e, t$2] = createNamespace("share-sheet");
  const shareSheetProps = extend({}, popupSharedProps, {
    title: String,
    round: truthProp,
    options: makeArrayProp(),
    cancelText: String,
    description: String,
    closeOnPopstate: truthProp,
    safeAreaInsetBottom: truthProp
  });
  var stdin_default$j = vue.defineComponent({
    name: name$e,
    props: shareSheetProps,
    emits: ["cancel", "select", "update:show"],
    setup(props, {
      emit,
      slots
    }) {
      const updateShow = (value) => emit("update:show", value);
      const onCancel = () => {
        updateShow(false);
        emit("cancel");
      };
      const onSelect = (option, index) => emit("select", option, index);
      const renderHeader = () => {
        const title = slots.title ? slots.title() : props.title;
        const description = slots.description ? slots.description() : props.description;
        if (title || description) {
          return vue.createVNode("div", {
            "class": bem$e("header")
          }, [title && vue.createVNode("h2", {
            "class": bem$e("title")
          }, [title]), description && vue.createVNode("span", {
            "class": bem$e("description")
          }, [description])]);
        }
      };
      const renderIcon = (icon) => {
        if (iconMap[icon]) {
          return vue.createVNode("div", {
            "class": bem$e("icon", [icon])
          }, [vue.createVNode(Icon, {
            "name": iconMap[icon] || icon
          }, null)]);
        }
        return vue.createVNode("img", {
          "src": icon,
          "class": bem$e("image-icon")
        }, null);
      };
      const renderOption = (option, index) => {
        const {
          name: name2,
          icon,
          className,
          description
        } = option;
        return vue.createVNode("div", {
          "role": "button",
          "tabindex": 0,
          "class": [bem$e("option"), className, HAPTICS_FEEDBACK],
          "onClick": () => onSelect(option, index)
        }, [renderIcon(icon), name2 && vue.createVNode("span", {
          "class": bem$e("name")
        }, [name2]), description && vue.createVNode("span", {
          "class": bem$e("option-description")
        }, [description])]);
      };
      const renderOptions = (options, border) => vue.createVNode("div", {
        "class": bem$e("options", {
          border
        })
      }, [options.map(renderOption)]);
      const renderRows = () => {
        const {
          options
        } = props;
        if (Array.isArray(options[0])) {
          return options.map((item, index) => renderOptions(item, index !== 0));
        }
        return renderOptions(options);
      };
      const renderCancelButton = () => {
        var _a;
        const cancelText = (_a = props.cancelText) != null ? _a : t$2("cancel");
        if (slots.cancel || cancelText) {
          return vue.createVNode("button", {
            "type": "button",
            "class": bem$e("cancel"),
            "onClick": onCancel
          }, [slots.cancel ? slots.cancel() : cancelText]);
        }
      };
      return () => vue.createVNode(Popup, vue.mergeProps({
        "class": bem$e(),
        "position": "bottom",
        "onUpdate:show": updateShow
      }, pick(props, popupInheritKeys)), {
        default: () => [renderHeader(), renderRows(), renderCancelButton()]
      });
    }
  });
  const ShareSheet = withInstall(stdin_default$j);
  const [name$d, bem$d] = createNamespace("sidebar");
  const SIDEBAR_KEY = Symbol(name$d);
  const sidebarProps = {
    modelValue: makeNumericProp(0)
  };
  var stdin_default$i = vue.defineComponent({
    name: name$d,
    props: sidebarProps,
    emits: ["change", "update:modelValue"],
    setup(props, {
      emit,
      slots
    }) {
      const {
        linkChildren
      } = useChildren(SIDEBAR_KEY);
      const getActive = () => +props.modelValue;
      const setActive = (value) => {
        if (value !== getActive()) {
          emit("update:modelValue", value);
          emit("change", value);
        }
      };
      linkChildren({
        getActive,
        setActive
      });
      return () => {
        var _a;
        return vue.createVNode("div", {
          "role": "tablist",
          "class": bem$d()
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
      };
    }
  });
  const Sidebar = withInstall(stdin_default$i);
  const [name$c, bem$c] = createNamespace("sidebar-item");
  const sidebarItemProps = extend({}, routeProps, {
    dot: Boolean,
    title: String,
    badge: numericProp,
    disabled: Boolean,
    badgeProps: Object
  });
  var stdin_default$h = vue.defineComponent({
    name: name$c,
    props: sidebarItemProps,
    emits: ["click"],
    setup(props, {
      emit,
      slots
    }) {
      const route2 = useRoute();
      const {
        parent,
        index
      } = useParent(SIDEBAR_KEY);
      if (!parent) {
        return;
      }
      const onClick = () => {
        if (props.disabled) {
          return;
        }
        emit("click", index.value);
        parent.setActive(index.value);
        route2();
      };
      return () => {
        const {
          dot,
          badge,
          title,
          disabled
        } = props;
        const selected = index.value === parent.getActive();
        return vue.createVNode("div", {
          "role": "tab",
          "class": bem$c({
            select: selected,
            disabled
          }),
          "tabindex": disabled ? void 0 : 0,
          "aria-selected": selected,
          "onClick": onClick
        }, [vue.createVNode(Badge, vue.mergeProps({
          "dot": dot,
          "class": bem$c("text"),
          "content": badge
        }, props.badgeProps), {
          default: () => [slots.title ? slots.title() : title]
        })]);
      };
    }
  });
  const SidebarItem = withInstall(stdin_default$h);
  const [name$b, bem$b] = createNamespace("skeleton");
  const DEFAULT_ROW_WIDTH = "100%";
  const DEFAULT_LAST_ROW_WIDTH = "60%";
  const skeletonProps = {
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
  var stdin_default$g = vue.defineComponent({
    name: name$b,
    inheritAttrs: false,
    props: skeletonProps,
    setup(props, {
      slots,
      attrs
    }) {
      const renderAvatar = () => {
        if (props.avatar) {
          return vue.createVNode("div", {
            "class": bem$b("avatar", props.avatarShape),
            "style": getSizeStyle(props.avatarSize)
          }, null);
        }
      };
      const renderTitle = () => {
        if (props.title) {
          return vue.createVNode("h3", {
            "class": bem$b("title"),
            "style": {
              width: addUnit(props.titleWidth)
            }
          }, null);
        }
      };
      const getRowWidth = (index) => {
        const {
          rowWidth
        } = props;
        if (rowWidth === DEFAULT_ROW_WIDTH && index === +props.row - 1) {
          return DEFAULT_LAST_ROW_WIDTH;
        }
        if (Array.isArray(rowWidth)) {
          return rowWidth[index];
        }
        return rowWidth;
      };
      const renderRows = () => Array(+props.row).fill("").map((_, i) => vue.createVNode("div", {
        "class": bem$b("row"),
        "style": {
          width: addUnit(getRowWidth(i))
        }
      }, null));
      return () => {
        var _a;
        if (!props.loading) {
          return (_a = slots.default) == null ? void 0 : _a.call(slots);
        }
        return vue.createVNode("div", vue.mergeProps({
          "class": bem$b({
            animate: props.animate,
            round: props.round
          })
        }, attrs), [renderAvatar(), vue.createVNode("div", {
          "class": bem$b("content")
        }, [renderTitle(), renderRows()])]);
      };
    }
  });
  const Skeleton = withInstall(stdin_default$g);
  const [name$a, bem$a] = createNamespace("slider");
  const sliderProps = {
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
  var stdin_default$f = vue.defineComponent({
    name: name$a,
    props: sliderProps,
    emits: ["change", "drag-end", "drag-start", "update:modelValue"],
    setup(props, {
      emit,
      slots
    }) {
      let buttonIndex;
      let current2;
      let startValue;
      const root = vue.ref();
      const slider = vue.ref();
      const dragStatus = vue.ref();
      const touch = useTouch();
      const scope = vue.computed(() => Number(props.max) - Number(props.min));
      const wrapperStyle = vue.computed(() => {
        const crossAxis = props.vertical ? "width" : "height";
        return {
          background: props.inactiveColor,
          [crossAxis]: addUnit(props.barHeight)
        };
      });
      const isRange = (val) => props.range && Array.isArray(val);
      const calcMainAxis = () => {
        const {
          modelValue,
          min
        } = props;
        if (isRange(modelValue)) {
          return `${(modelValue[1] - modelValue[0]) * 100 / scope.value}%`;
        }
        return `${(modelValue - Number(min)) * 100 / scope.value}%`;
      };
      const calcOffset = () => {
        const {
          modelValue,
          min
        } = props;
        if (isRange(modelValue)) {
          return `${(modelValue[0] - Number(min)) * 100 / scope.value}%`;
        }
        return "0%";
      };
      const barStyle = vue.computed(() => {
        const mainAxis = props.vertical ? "height" : "width";
        const style = {
          [mainAxis]: calcMainAxis(),
          background: props.activeColor
        };
        if (dragStatus.value) {
          style.transition = "none";
        }
        const getPositionKey = () => {
          if (props.vertical) {
            return props.reverse ? "bottom" : "top";
          }
          return props.reverse ? "right" : "left";
        };
        style[getPositionKey()] = calcOffset();
        return style;
      });
      const format2 = (value) => {
        const min = +props.min;
        const max = +props.max;
        const step = +props.step;
        value = clamp(value, min, max);
        const diff = Math.round((value - min) / step) * step;
        return addNumber(min, diff);
      };
      const isSameValue = (newValue, oldValue) => JSON.stringify(newValue) === JSON.stringify(oldValue);
      const handleRangeValue = (value) => {
        var _a, _b;
        const left2 = (_a = value[0]) != null ? _a : Number(props.min);
        const right2 = (_b = value[1]) != null ? _b : Number(props.max);
        return left2 > right2 ? [right2, left2] : [left2, right2];
      };
      const updateValue = (value, end2) => {
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
      const onClick = (event) => {
        event.stopPropagation();
        if (props.disabled || props.readonly) {
          return;
        }
        const {
          min,
          reverse,
          vertical,
          modelValue
        } = props;
        const rect = useRect(root);
        const getDelta = () => {
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
        const total = vertical ? rect.height : rect.width;
        const value = Number(min) + getDelta() / total * scope.value;
        if (isRange(modelValue)) {
          const [left2, right2] = modelValue;
          const middle = (left2 + right2) / 2;
          if (value <= middle) {
            updateValue([value, right2], true);
          } else {
            updateValue([left2, value], true);
          }
        } else {
          updateValue(value, true);
        }
      };
      const onTouchStart = (event) => {
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
      const onTouchMove = (event) => {
        if (props.disabled || props.readonly) {
          return;
        }
        if (dragStatus.value === "start") {
          emit("drag-start", event);
        }
        preventDefault(event, true);
        touch.move(event);
        dragStatus.value = "dragging";
        const rect = useRect(root);
        const delta = props.vertical ? touch.deltaY.value : touch.deltaX.value;
        const total = props.vertical ? rect.height : rect.width;
        let diff = delta / total * scope.value;
        if (props.reverse) {
          diff = -diff;
        }
        if (isRange(startValue)) {
          const index = props.reverse ? 1 - buttonIndex : buttonIndex;
          current2[index] = startValue[index] + diff;
        } else {
          current2 = startValue + diff;
        }
        updateValue(current2);
      };
      const onTouchEnd = (event) => {
        if (props.disabled || props.readonly) {
          return;
        }
        if (dragStatus.value === "dragging") {
          updateValue(current2, true);
          emit("drag-end", event);
        }
        dragStatus.value = "";
      };
      const getButtonClassName = (index) => {
        if (typeof index === "number") {
          const position = ["left", "right"];
          return bem$a(`button-wrapper`, position[index]);
        }
        return bem$a("button-wrapper", props.reverse ? "left" : "right");
      };
      const renderButtonContent = (value, index) => {
        if (typeof index === "number") {
          const slot = slots[index === 0 ? "left-button" : "right-button"];
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
          "class": bem$a("button"),
          "style": getSizeStyle(props.buttonSize)
        }, null);
      };
      const renderButton = (index) => {
        const current22 = typeof index === "number" ? props.modelValue[index] : props.modelValue;
        return vue.createVNode("div", {
          "ref": slider,
          "role": "slider",
          "class": getButtonClassName(index),
          "tabindex": props.disabled ? void 0 : 0,
          "aria-valuemin": props.min,
          "aria-valuenow": current22,
          "aria-valuemax": props.max,
          "aria-disabled": props.disabled || void 0,
          "aria-readonly": props.readonly || void 0,
          "aria-orientation": props.vertical ? "vertical" : "horizontal",
          "onTouchstartPassive": (event) => {
            if (typeof index === "number") {
              buttonIndex = index;
            }
            onTouchStart(event);
          },
          "onTouchend": onTouchEnd,
          "onTouchcancel": onTouchEnd,
          "onClick": stopPropagation
        }, [renderButtonContent(current22, index)]);
      };
      updateValue(props.modelValue);
      useCustomFieldValue(() => props.modelValue);
      useEventListener("touchmove", onTouchMove, {
        target: slider
      });
      return () => vue.createVNode("div", {
        "ref": root,
        "style": wrapperStyle.value,
        "class": bem$a({
          vertical: props.vertical,
          disabled: props.disabled
        }),
        "onClick": onClick
      }, [vue.createVNode("div", {
        "class": bem$a("bar"),
        "style": barStyle.value
      }, [props.range ? [renderButton(0), renderButton(1)] : renderButton()])]);
    }
  });
  const Slider = withInstall(stdin_default$f);
  const [name$9, bem$9] = createNamespace("space");
  const spaceProps = {
    align: String,
    direction: {
      type: String,
      default: "horizontal"
    },
    size: {
      type: [Number, String, Array],
      default: 8
    },
    wrap: Boolean,
    fill: Boolean
  };
  function filterEmpty(children = []) {
    const nodes = [];
    children.forEach((child) => {
      if (Array.isArray(child)) {
        nodes.push(...child);
      } else if (child.type === vue.Fragment) {
        nodes.push(...filterEmpty(child.children));
      } else {
        nodes.push(child);
      }
    });
    return nodes.filter((c) => {
      var _a;
      return !(c && (typeof Comment !== "undefined" && c.type === Comment || c.type === vue.Fragment && ((_a = c.children) == null ? void 0 : _a.length) === 0 || c.type === Text && c.children.trim() === ""));
    });
  }
  var stdin_default$e = vue.defineComponent({
    name: name$9,
    props: spaceProps,
    setup(props, {
      slots
    }) {
      const mergedAlign = vue.computed(() => {
        var _a;
        return (_a = props.align) != null ? _a : props.direction === "horizontal" ? "center" : "";
      });
      const getMargin = (size) => {
        if (typeof size === "number") {
          return size + "px";
        }
        return size;
      };
      const getMarginStyle = (isLast) => {
        const style = {};
        const marginRight = `${getMargin(Array.isArray(props.size) ? props.size[0] : props.size)}`;
        const marginBottom = `${getMargin(Array.isArray(props.size) ? props.size[1] : props.size)}`;
        if (isLast) {
          return props.wrap ? {
            marginBottom
          } : {};
        }
        if (props.direction === "horizontal") {
          style.marginRight = marginRight;
        }
        if (props.direction === "vertical" || props.wrap) {
          style.marginBottom = marginBottom;
        }
        return style;
      };
      return () => {
        var _a;
        const children = filterEmpty((_a = slots.default) == null ? void 0 : _a.call(slots));
        return vue.createVNode("div", {
          "class": [bem$9({
            [props.direction]: props.direction,
            [`align-${mergedAlign.value}`]: mergedAlign.value,
            wrap: props.wrap,
            fill: props.fill
          })]
        }, [children.map((c, i) => vue.createVNode("div", {
          "key": `item-${i}`,
          "class": `${name$9}-item`,
          "style": getMarginStyle(i === children.length - 1)
        }, [c]))]);
      };
    }
  });
  const Space = withInstall(stdin_default$e);
  const [name$8, bem$8] = createNamespace("steps");
  const stepsProps = {
    active: makeNumericProp(0),
    direction: makeStringProp("horizontal"),
    activeIcon: makeStringProp("checked"),
    iconPrefix: String,
    finishIcon: String,
    activeColor: String,
    inactiveIcon: String,
    inactiveColor: String
  };
  const STEPS_KEY = Symbol(name$8);
  var stdin_default$d = vue.defineComponent({
    name: name$8,
    props: stepsProps,
    emits: ["click-step"],
    setup(props, {
      emit,
      slots
    }) {
      const {
        linkChildren
      } = useChildren(STEPS_KEY);
      const onClickStep = (index) => emit("click-step", index);
      linkChildren({
        props,
        onClickStep
      });
      return () => {
        var _a;
        return vue.createVNode("div", {
          "class": bem$8([props.direction])
        }, [vue.createVNode("div", {
          "class": bem$8("items")
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]);
      };
    }
  });
  const [name$7, bem$7] = createNamespace("step");
  var stdin_default$c = vue.defineComponent({
    name: name$7,
    setup(props, {
      slots
    }) {
      const {
        parent,
        index
      } = useParent(STEPS_KEY);
      if (!parent) {
        return;
      }
      const parentProps = parent.props;
      const getStatus = () => {
        const active = +parentProps.active;
        if (index.value < active) {
          return "finish";
        }
        return index.value === active ? "process" : "waiting";
      };
      const isActive = () => getStatus() === "process";
      const lineStyle = vue.computed(() => ({
        background: getStatus() === "finish" ? parentProps.activeColor : parentProps.inactiveColor
      }));
      const titleStyle = vue.computed(() => {
        if (isActive()) {
          return {
            color: parentProps.activeColor
          };
        }
        if (getStatus() === "waiting") {
          return {
            color: parentProps.inactiveColor
          };
        }
      });
      const onClickStep = () => parent.onClickStep(index.value);
      const renderCircle = () => {
        const {
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
        var _a;
        const status = getStatus();
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
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), vue.createVNode("div", {
          "class": bem$7("circle-container"),
          "onClick": onClickStep
        }, [renderCircle()]), vue.createVNode("div", {
          "class": bem$7("line"),
          "style": lineStyle.value
        }, null)]);
      };
    }
  });
  const Step = withInstall(stdin_default$c);
  const [name$6, bem$6] = createNamespace("stepper");
  const LONG_PRESS_INTERVAL = 200;
  const LONG_PRESS_START_TIME = 600;
  const isEqual = (value1, value2) => String(value1) === String(value2);
  const stepperProps = {
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
  var stdin_default$b = vue.defineComponent({
    name: name$6,
    props: stepperProps,
    emits: ["plus", "blur", "minus", "focus", "change", "overlimit", "update:modelValue"],
    setup(props, {
      emit
    }) {
      const format2 = (value) => {
        const {
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
      const getInitialValue = () => {
        var _a;
        const defaultValue = (_a = props.modelValue) != null ? _a : props.defaultValue;
        const value = format2(defaultValue);
        if (!isEqual(value, props.modelValue)) {
          emit("update:modelValue", value);
        }
        return value;
      };
      let actionType;
      const inputRef = vue.ref();
      const current2 = vue.ref(getInitialValue());
      const minusDisabled = vue.computed(() => props.disabled || props.disableMinus || current2.value <= +props.min);
      const plusDisabled = vue.computed(() => props.disabled || props.disablePlus || current2.value >= +props.max);
      const inputStyle = vue.computed(() => ({
        width: addUnit(props.inputWidth),
        height: addUnit(props.buttonSize)
      }));
      const buttonStyle = vue.computed(() => getSizeStyle(props.buttonSize));
      const check = () => {
        const value = format2(current2.value);
        if (!isEqual(value, current2.value)) {
          current2.value = value;
        }
      };
      const setValue = (value) => {
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
      const onChange = () => {
        if (actionType === "plus" && plusDisabled.value || actionType === "minus" && minusDisabled.value) {
          emit("overlimit", actionType);
          return;
        }
        const diff = actionType === "minus" ? -props.step : +props.step;
        const value = format2(addNumber(+current2.value, diff));
        setValue(value);
        emit(actionType);
      };
      const onInput = (event) => {
        const input = event.target;
        const {
          value
        } = input;
        const {
          decimalLength
        } = props;
        let formatted = formatNumber(String(value), !props.integer);
        if (isDef(decimalLength) && formatted.includes(".")) {
          const pair = formatted.split(".");
          formatted = `${pair[0]}.${pair[1].slice(0, +decimalLength)}`;
        }
        if (props.beforeChange) {
          input.value = String(current2.value);
        } else if (!isEqual(value, formatted)) {
          input.value = formatted;
        }
        const isNumeric2 = formatted === String(+formatted);
        setValue(isNumeric2 ? +formatted : formatted);
      };
      const onFocus = (event) => {
        var _a;
        if (props.disableInput) {
          (_a = inputRef.value) == null ? void 0 : _a.blur();
        } else {
          emit("focus", event);
        }
      };
      const onBlur = (event) => {
        const input = event.target;
        const value = format2(input.value);
        input.value = String(value);
        current2.value = value;
        vue.nextTick(() => {
          emit("blur", event);
          resetScroll();
        });
      };
      let isLongPress;
      let longPressTimer;
      const longPressStep = () => {
        longPressTimer = setTimeout(() => {
          onChange();
          longPressStep();
        }, LONG_PRESS_INTERVAL);
      };
      const onTouchStart = () => {
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
      const onTouchEnd = (event) => {
        if (props.longPress) {
          clearTimeout(longPressTimer);
          if (isLongPress) {
            preventDefault(event);
          }
        }
      };
      const onMousedown = (event) => {
        if (props.disableInput) {
          preventDefault(event);
        }
      };
      const createListeners = (type) => ({
        onClick: (event) => {
          preventDefault(event);
          actionType = type;
          onChange();
        },
        onTouchstartPassive: () => {
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
  const Stepper = withInstall(stdin_default$b);
  const Steps = withInstall(stdin_default$d);
  const [name$5, bem$5, t$1] = createNamespace("submit-bar");
  const submitBarProps = {
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
    placeholder: Boolean,
    decimalLength: makeNumericProp(2),
    safeAreaInsetBottom: truthProp
  };
  var stdin_default$a = vue.defineComponent({
    name: name$5,
    props: submitBarProps,
    emits: ["submit"],
    setup(props, {
      emit,
      slots
    }) {
      const root = vue.ref();
      const renderPlaceholder = usePlaceholder(root, bem$5);
      const renderText = () => {
        const {
          price,
          label,
          currency,
          textAlign,
          suffixLabel,
          decimalLength
        } = props;
        if (typeof price === "number") {
          const pricePair = (price / 100).toFixed(+decimalLength).split(".");
          const decimal = decimalLength ? `.${pricePair[1]}` : "";
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
      const renderTip = () => {
        var _a;
        const {
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
          }, [tip]), (_a = slots.tip) == null ? void 0 : _a.call(slots)]);
        }
      };
      const onClickButton = () => emit("submit");
      const renderButton = () => {
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
      const renderSubmitBar = () => {
        var _a, _b;
        return vue.createVNode("div", {
          "ref": root,
          "class": [bem$5(), {
            "van-safe-area-bottom": props.safeAreaInsetBottom
          }]
        }, [(_a = slots.top) == null ? void 0 : _a.call(slots), renderTip(), vue.createVNode("div", {
          "class": bem$5("bar")
        }, [(_b = slots.default) == null ? void 0 : _b.call(slots), renderText(), renderButton()])]);
      };
      return () => {
        if (props.placeholder) {
          return renderPlaceholder(renderSubmitBar);
        }
        return renderSubmitBar();
      };
    }
  });
  const SubmitBar = withInstall(stdin_default$a);
  const [name$4, bem$4] = createNamespace("swipe-cell");
  const swipeCellProps = {
    name: makeNumericProp(""),
    disabled: Boolean,
    leftWidth: numericProp,
    rightWidth: numericProp,
    beforeClose: Function,
    stopPropagation: Boolean
  };
  var stdin_default$9 = vue.defineComponent({
    name: name$4,
    props: swipeCellProps,
    emits: ["open", "close", "click"],
    setup(props, {
      emit,
      slots
    }) {
      let opened;
      let lockClick2;
      let startOffset;
      const root = vue.ref();
      const leftRef = vue.ref();
      const rightRef = vue.ref();
      const state = vue.reactive({
        offset: 0,
        dragging: false
      });
      const touch = useTouch();
      const getWidthByRef = (ref2) => ref2.value ? useRect(ref2).width : 0;
      const leftWidth = vue.computed(() => isDef(props.leftWidth) ? +props.leftWidth : getWidthByRef(leftRef));
      const rightWidth = vue.computed(() => isDef(props.rightWidth) ? +props.rightWidth : getWidthByRef(rightRef));
      const open = (side) => {
        state.offset = side === "left" ? leftWidth.value : -rightWidth.value;
        if (!opened) {
          opened = true;
          emit("open", {
            name: props.name,
            position: side
          });
        }
      };
      const close = (position) => {
        state.offset = 0;
        if (opened) {
          opened = false;
          emit("close", {
            name: props.name,
            position
          });
        }
      };
      const toggle = (side) => {
        const offset2 = Math.abs(state.offset);
        const THRESHOLD = 0.15;
        const threshold = opened ? 1 - THRESHOLD : THRESHOLD;
        const width2 = side === "left" ? leftWidth.value : rightWidth.value;
        if (width2 && offset2 > width2 * threshold) {
          open(side);
        } else {
          close(side);
        }
      };
      const onTouchStart = (event) => {
        if (!props.disabled) {
          startOffset = state.offset;
          touch.start(event);
        }
      };
      const onTouchMove = (event) => {
        if (props.disabled) {
          return;
        }
        const {
          deltaX
        } = touch;
        touch.move(event);
        if (touch.isHorizontal()) {
          lockClick2 = true;
          state.dragging = true;
          const isEdge = !opened || deltaX.value * startOffset < 0;
          if (isEdge) {
            preventDefault(event, props.stopPropagation);
          }
          state.offset = clamp(deltaX.value + startOffset, -rightWidth.value, leftWidth.value);
        }
      };
      const onTouchEnd = () => {
        if (state.dragging) {
          state.dragging = false;
          toggle(state.offset > 0 ? "left" : "right");
          setTimeout(() => {
            lockClick2 = false;
          }, 0);
        }
      };
      const onClick = (position = "outside") => {
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
      const getClickHandler = (position, stop) => (event) => {
        if (stop) {
          event.stopPropagation();
        }
        onClick(position);
      };
      const renderSideContent = (side, ref2) => {
        const contentSlot = slots[side];
        if (contentSlot) {
          return vue.createVNode("div", {
            "ref": ref2,
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
      useEventListener("touchmove", onTouchMove, {
        target: root
      });
      return () => {
        var _a;
        const wrapperStyle = {
          transform: `translate3d(${state.offset}px, 0, 0)`,
          transitionDuration: state.dragging ? "0s" : ".6s"
        };
        return vue.createVNode("div", {
          "ref": root,
          "class": bem$4(),
          "onClick": getClickHandler("cell", lockClick2),
          "onTouchstartPassive": onTouchStart,
          "onTouchend": onTouchEnd,
          "onTouchcancel": onTouchEnd
        }, [vue.createVNode("div", {
          "class": bem$4("wrapper"),
          "style": wrapperStyle
        }, [renderSideContent("left", leftRef), (_a = slots.default) == null ? void 0 : _a.call(slots), renderSideContent("right", rightRef)])]);
      };
    }
  });
  const SwipeCell = withInstall(stdin_default$9);
  const [name$3, bem$3] = createNamespace("tabbar");
  const tabbarProps = {
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
  const TABBAR_KEY = Symbol(name$3);
  var stdin_default$8 = vue.defineComponent({
    name: name$3,
    props: tabbarProps,
    emits: ["change", "update:modelValue"],
    setup(props, {
      emit,
      slots
    }) {
      const root = vue.ref();
      const {
        linkChildren
      } = useChildren(TABBAR_KEY);
      const renderPlaceholder = usePlaceholder(root, bem$3);
      const enableSafeArea = () => {
        var _a;
        return (_a = props.safeAreaInsetBottom) != null ? _a : props.fixed;
      };
      const renderTabbar = () => {
        var _a;
        const {
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
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
      };
      const setActive = (active, afterChange) => {
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
  const Tabbar = withInstall(stdin_default$8);
  const [name$2, bem$2] = createNamespace("tabbar-item");
  const tabbarItemProps = extend({}, routeProps, {
    dot: Boolean,
    icon: String,
    name: numericProp,
    badge: numericProp,
    badgeProps: Object,
    iconPrefix: String
  });
  var stdin_default$7 = vue.defineComponent({
    name: name$2,
    props: tabbarItemProps,
    emits: ["click"],
    setup(props, {
      emit,
      slots
    }) {
      const route2 = useRoute();
      const vm = vue.getCurrentInstance().proxy;
      const {
        parent,
        index
      } = useParent(TABBAR_KEY);
      if (!parent) {
        return;
      }
      const active = vue.computed(() => {
        var _a;
        const {
          route: route22,
          modelValue
        } = parent.props;
        if (route22 && "$route" in vm) {
          const {
            $route
          } = vm;
          const {
            to
          } = props;
          const config = isObject(to) ? to : {
            path: to
          };
          return !!$route.matched.find((val) => {
            const pathMatched = "path" in config && config.path === val.path;
            const nameMatched = "name" in config && config.name === val.name;
            return pathMatched || nameMatched;
          });
        }
        return ((_a = props.name) != null ? _a : index.value) === modelValue;
      });
      const onClick = (event) => {
        var _a;
        if (!active.value) {
          parent.setActive((_a = props.name) != null ? _a : index.value, route2);
        }
        emit("click", event);
      };
      const renderIcon = () => {
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
        var _a;
        const {
          dot,
          badge
        } = props;
        const {
          activeColor,
          inactiveColor
        } = parent.props;
        const color = active.value ? activeColor : inactiveColor;
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
        }, [vue.createVNode(Badge, vue.mergeProps({
          "dot": dot,
          "class": bem$2("icon"),
          "content": badge
        }, props.badgeProps), {
          default: renderIcon
        }), vue.createVNode("div", {
          "class": bem$2("text")
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots, {
          active: active.value
        })])]);
      };
    }
  });
  const TabbarItem = withInstall(stdin_default$7);
  const [name$1, bem$1] = createNamespace("tree-select");
  const treeSelectProps = {
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
  var stdin_default$6 = vue.defineComponent({
    name: name$1,
    props: treeSelectProps,
    emits: ["click-nav", "click-item", "update:activeId", "update:mainActiveIndex"],
    setup(props, {
      emit,
      slots
    }) {
      const isActiveItem = (id) => Array.isArray(props.activeId) ? props.activeId.includes(id) : props.activeId === id;
      const renderSubItem = (item) => {
        const onClick = () => {
          if (item.disabled) {
            return;
          }
          let activeId;
          if (Array.isArray(props.activeId)) {
            activeId = props.activeId.slice();
            const index = activeId.indexOf(item.id);
            if (index !== -1) {
              activeId.splice(index, 1);
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
      const onSidebarChange = (index) => {
        emit("update:mainActiveIndex", index);
      };
      const onClickSidebarItem = (index) => emit("click-nav", index);
      const renderSidebar = () => {
        const Items = props.items.map((item) => vue.createVNode(SidebarItem, {
          "dot": item.dot,
          "title": item.text,
          "badge": item.badge,
          "class": [bem$1("nav-item"), item.className],
          "disabled": item.disabled,
          "onClick": onClickSidebarItem
        }, null));
        return vue.createVNode(Sidebar, {
          "class": bem$1("nav"),
          "modelValue": props.mainActiveIndex,
          "onChange": onSidebarChange
        }, {
          default: () => [Items]
        });
      };
      const renderContent = () => {
        if (slots.content) {
          return slots.content();
        }
        const selected = props.items[+props.mainActiveIndex] || {};
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
  const TreeSelect = withInstall(stdin_default$6);
  const [name, bem, t] = createNamespace("uploader");
  function readFileContent(file, resultType) {
    return new Promise((resolve) => {
      if (resultType === "file") {
        resolve();
        return;
      }
      const reader = new FileReader();
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
    const valid = [];
    const invalid = [];
    items.forEach((item) => {
      if (isOversize(item, maxSize)) {
        invalid.push(item);
      } else {
        valid.push(item);
      }
    });
    return { valid, invalid };
  }
  const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg|avif)/i;
  const isImageUrl = (url) => IMAGE_REGEXP.test(url);
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
  var stdin_default$5 = vue.defineComponent({
    props: {
      name: numericProp,
      item: makeRequiredProp(Object),
      index: Number,
      imageFit: String,
      lazyLoad: Boolean,
      deletable: Boolean,
      previewSize: [Number, String, Array],
      beforeDelete: Function
    },
    emits: ["delete", "preview"],
    setup(props, {
      emit,
      slots
    }) {
      const renderMask = () => {
        const {
          status,
          message
        } = props.item;
        if (status === "uploading" || status === "failed") {
          const MaskIcon = status === "failed" ? vue.createVNode(Icon, {
            "name": "close",
            "class": bem("mask-icon")
          }, null) : vue.createVNode(Loading, {
            "class": bem("loading")
          }, null);
          const showMessage = isDef(message) && message !== "";
          return vue.createVNode("div", {
            "class": bem("mask")
          }, [MaskIcon, showMessage && vue.createVNode("div", {
            "class": bem("mask-message")
          }, [message])]);
        }
      };
      const onDelete = (event) => {
        const {
          name: name2,
          item,
          index,
          beforeDelete
        } = props;
        event.stopPropagation();
        callInterceptor(beforeDelete, {
          args: [item, {
            name: name2,
            index
          }],
          done: () => emit("delete")
        });
      };
      const onPreview = () => emit("preview");
      const renderDeleteIcon = () => {
        if (props.deletable && props.item.status !== "uploading") {
          const slot = slots["preview-delete"];
          return vue.createVNode("div", {
            "role": "button",
            "class": bem("preview-delete", {
              shadow: !slot
            }),
            "tabindex": 0,
            "aria-label": t("delete"),
            "onClick": onDelete
          }, [slot ? slot() : vue.createVNode(Icon, {
            "name": "cross",
            "class": bem("preview-delete-icon")
          }, null)]);
        }
      };
      const renderCover = () => {
        if (slots["preview-cover"]) {
          const {
            index,
            item
          } = props;
          return vue.createVNode("div", {
            "class": bem("preview-cover")
          }, [slots["preview-cover"](extend({
            index
          }, item))]);
        }
      };
      const renderPreview = () => {
        const {
          item,
          lazyLoad,
          imageFit,
          previewSize
        } = props;
        if (isImageFile(item)) {
          return vue.createVNode(Image$1, {
            "fit": imageFit,
            "src": item.objectUrl || item.content || item.url,
            "class": bem("preview-image"),
            "width": Array.isArray(previewSize) ? previewSize[0] : previewSize,
            "height": Array.isArray(previewSize) ? previewSize[1] : previewSize,
            "lazyLoad": lazyLoad,
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
  const uploaderProps = {
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
    previewSize: [Number, String, Array],
    previewImage: truthProp,
    previewOptions: Object,
    previewFullImage: truthProp,
    maxSize: {
      type: [Number, String, Function],
      default: Infinity
    }
  };
  var stdin_default$4 = vue.defineComponent({
    name,
    props: uploaderProps,
    emits: ["delete", "oversize", "click-upload", "close-preview", "click-preview", "update:modelValue"],
    setup(props, {
      emit,
      slots
    }) {
      const inputRef = vue.ref();
      const urls = [];
      const getDetail = (index = props.modelValue.length) => ({
        name: props.name,
        index
      });
      const resetInput = () => {
        if (inputRef.value) {
          inputRef.value.value = "";
        }
      };
      const onAfterRead = (items) => {
        resetInput();
        if (isOversize(items, props.maxSize)) {
          if (Array.isArray(items)) {
            const result = filterFiles(items, props.maxSize);
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
      const readFile = (files) => {
        const {
          maxCount,
          modelValue,
          resultType
        } = props;
        if (Array.isArray(files)) {
          const remainCount = +maxCount - modelValue.length;
          if (files.length > remainCount) {
            files = files.slice(0, remainCount);
          }
          Promise.all(files.map((file) => readFileContent(file, resultType))).then((contents) => {
            const fileList = files.map((file, index) => {
              const result = {
                file,
                status: "",
                message: "",
                objectUrl: URL.createObjectURL(file)
              };
              if (contents[index]) {
                result.content = contents[index];
              }
              return result;
            });
            onAfterRead(fileList);
          });
        } else {
          readFileContent(files, resultType).then((content) => {
            const result = {
              file: files,
              status: "",
              message: "",
              objectUrl: URL.createObjectURL(files)
            };
            if (content) {
              result.content = content;
            }
            onAfterRead(result);
          });
        }
      };
      const onChange = (event) => {
        const {
          files
        } = event.target;
        if (props.disabled || !files || !files.length) {
          return;
        }
        const file = files.length === 1 ? files[0] : [].slice.call(files);
        if (props.beforeRead) {
          const response = props.beforeRead(file, getDetail());
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
      let imagePreview;
      const onClosePreview = () => emit("close-preview");
      const previewImage = (item) => {
        if (props.previewFullImage) {
          const imageFiles = props.modelValue.filter(isImageFile);
          const images = imageFiles.map((item2) => {
            if (item2.objectUrl && !item2.url && item2.status !== "failed") {
              item2.url = item2.objectUrl;
              urls.push(item2.url);
            }
            return item2.url;
          }).filter(Boolean);
          imagePreview = ImagePreview(extend({
            images,
            startPosition: imageFiles.indexOf(item),
            onClose: onClosePreview
          }, props.previewOptions));
        }
      };
      const closeImagePreview = () => {
        if (imagePreview) {
          imagePreview.close();
        }
      };
      const deleteFile = (item, index) => {
        const fileList = props.modelValue.slice(0);
        fileList.splice(index, 1);
        emit("update:modelValue", fileList);
        emit("delete", item, getDetail(index));
      };
      const renderPreviewItem = (item, index) => {
        const needPickData = ["imageFit", "deletable", "previewSize", "beforeDelete"];
        const previewData = extend(pick(props, needPickData), pick(item, needPickData, true));
        return vue.createVNode(stdin_default$5, vue.mergeProps({
          "item": item,
          "index": index,
          "onClick": () => emit("click-preview", item, getDetail(index)),
          "onDelete": () => deleteFile(item, index),
          "onPreview": () => previewImage(item)
        }, pick(props, ["name", "lazyLoad"]), previewData), pick(slots, ["preview-cover", "preview-delete"]));
      };
      const renderPreviewList = () => {
        if (props.previewImage) {
          return props.modelValue.map(renderPreviewItem);
        }
      };
      const onClickUpload = (event) => emit("click-upload", event);
      const renderUpload = () => {
        if (props.modelValue.length >= props.maxCount || !props.showUpload) {
          return;
        }
        const Input = props.readonly ? null : vue.createVNode("input", {
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
      const chooseFile = () => {
        if (inputRef.value && !props.disabled) {
          inputRef.value.click();
        }
      };
      vue.onBeforeUnmount(() => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      });
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
  const Uploader = withInstall(stdin_default$4);
  const hasIntersectionObserver = inBrowser && "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype;
  const modeType = {
    event: "event",
    observer: "observer"
  };
  function remove(arr, item) {
    if (!arr.length)
      return;
    const index = arr.indexOf(item);
    if (index > -1)
      return arr.splice(index, 1);
  }
  function getBestSelectionFromSrcset(el, scale) {
    if (el.tagName !== "IMG" || !el.getAttribute("data-srcset"))
      return;
    let options = el.getAttribute("data-srcset");
    const container = el.parentNode;
    const containerWidth = container.offsetWidth * scale;
    let spaceIndex;
    let tmpSrc;
    let tmpWidth;
    options = options.trim().split(",");
    const result = options.map((item) => {
      item = item.trim();
      spaceIndex = item.lastIndexOf(" ");
      if (spaceIndex === -1) {
        tmpSrc = item;
        tmpWidth = 999998;
      } else {
        tmpSrc = item.substr(0, spaceIndex);
        tmpWidth = parseInt(
          item.substr(spaceIndex + 1, item.length - spaceIndex - 2),
          10
        );
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
    let bestSelectedSrc = "";
    let tmpOption;
    for (let i = 0; i < result.length; i++) {
      tmpOption = result[i];
      bestSelectedSrc = tmpOption[1];
      const next = result[i + 1];
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
  const getDPR = (scale = 1) => inBrowser ? window.devicePixelRatio || scale : scale;
  function supportWebp() {
    if (!inBrowser)
      return false;
    let support = true;
    try {
      const elem = document.createElement("canvas");
      if (elem.getContext && elem.getContext("2d")) {
        support = elem.toDataURL("image/webp").indexOf("data:image/webp") === 0;
      }
    } catch (err) {
      support = false;
    }
    return support;
  }
  function throttle(action, delay) {
    let timeout = null;
    let lastRun = 0;
    return function(...args) {
      if (timeout) {
        return;
      }
      const elapsed = Date.now() - lastRun;
      const runCallback = () => {
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
  const loadImageAsync = (item, resolve, reject) => {
    const image = new Image();
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
    constructor({ max }) {
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
    update({ src, loading, error }) {
      const oldSrc = this.src;
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
      const rect = useRect(this.el);
      return rect.top < window.innerHeight * this.options.preLoad && rect.bottom > this.options.preLoadTop && rect.left < window.innerWidth * this.options.preLoad && rect.right > 0;
    }
    filter() {
      Object.keys(this.options.filter).forEach((key) => {
        this.options.filter[key](this, this.options);
      });
    }
    renderLoading(cb) {
      this.state.loading = true;
      loadImageAsync(
        {
          src: this.loading,
          cors: this.cors
        },
        () => {
          this.render("loading", false);
          this.state.loading = false;
          cb();
        },
        () => {
          cb();
          this.state.loading = false;
        }
      );
    }
    load(onFinish = noop) {
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
        var _a, _b;
        this.attempt++;
        (_b = (_a = this.options.adapter).beforeLoad) == null ? void 0 : _b.call(_a, this, this.options);
        this.record("loadStart");
        loadImageAsync(
          {
            src: this.src,
            cors: this.cors
          },
          (data) => {
            this.naturalHeight = data.naturalHeight;
            this.naturalWidth = data.naturalWidth;
            this.state.loaded = true;
            this.state.error = false;
            this.record("loadEnd");
            this.render("loaded", false);
            this.state.rendered = true;
            this.imageCache.add(this.src);
            onFinish();
          },
          (err) => {
            !this.options.silent && console.error(err);
            this.state.error = true;
            this.state.loaded = false;
            this.render("error", false);
          }
        );
      });
    }
    render(state, cache) {
      this.elRenderer(this, state, cache);
    }
    performance() {
      let state = "loading";
      let time = 0;
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
  const DEFAULT_URL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  const DEFAULT_EVENTS = [
    "scroll",
    "wheel",
    "mousewheel",
    "resize",
    "animationend",
    "transitionend",
    "touchmove"
  ];
  const DEFAULT_OBSERVER_OPTIONS = {
    rootMargin: "0px",
    threshold: 0
  };
  function stdin_default$3() {
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
        this.imageCache = new ImageCache({ max: 200 });
        this.lazyLoadHandler = throttle(
          this.lazyLoadHandler.bind(this),
          this.options.throttleWait
        );
        this.setMode(this.options.observer ? modeType.observer : modeType.event);
      }
      config(options = {}) {
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
        const value = this.valueFormatter(binding.value);
        let { src } = value;
        vue.nextTick(() => {
          src = getBestSelectionFromSrcset(el, this.options.scale) || src;
          this.observer && this.observer.observe(el);
          const container = Object.keys(binding.modifiers)[0];
          let $parent;
          if (container) {
            $parent = vnode.context.$refs[container];
            $parent = $parent ? $parent.$el || $parent : document.getElementById(container);
          }
          if (!$parent) {
            $parent = getScrollParent$1(el);
          }
          const newListener = new ReactiveListener({
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
        const value = this.valueFormatter(binding.value);
        let { src } = value;
        src = getBestSelectionFromSrcset(el, this.options.scale) || src;
        const exist = this.listeners.find((item) => item.el === el);
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
        const existItem = this.listeners.find((item) => item.el === el);
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
        let target = this.targets.find((target2) => target2.el === el);
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
        this.targets.forEach((target, index) => {
          if (target.el === el) {
            target.childrenCount--;
            if (!target.childrenCount) {
              this.initListen(target.el, false);
              this.targets.splice(index, 1);
              target = null;
            }
          }
        });
      }
      initListen(el, start2) {
        this.options.ListenEvents.forEach(
          (evt) => (start2 ? on : off)(el, evt, this.lazyLoadHandler)
        );
      }
      initEvent() {
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
          const on2 = (...args) => {
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
      lazyLoadHandler() {
        const freeList = [];
        this.listeners.forEach((listener) => {
          if (!listener.el || !listener.el.parentNode) {
            freeList.push(listener);
          }
          const catIn = listener.checkInView();
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
        this.observer = new IntersectionObserver(
          this.observerHandler.bind(this),
          this.options.observerOptions
        );
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
        const { el, bindType } = listener;
        let src;
        switch (state) {
          case "loading":
            src = listener.loading;
            break;
          case "error":
            src = listener.error;
            break;
          default:
            ({ src } = listener);
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
          const event = new CustomEvent(state, {
            detail: listener
          });
          el.dispatchEvent(event);
        }
      }
      valueFormatter(value) {
        let src = value;
        let { loading, error } = this.options;
        if (isObject(value)) {
          ({ src } = value);
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
  var stdin_default$2 = (lazy) => ({
    props: {
      tag: {
        type: String,
        default: "div"
      }
    },
    emits: ["show"],
    render() {
      return vue.h(
        this.tag,
        this.show && this.$slots.default ? this.$slots.default() : null
      );
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
        const rect = useRect(this.$el);
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
  const defaultOptions = {
    selector: "img"
  };
  class LazyContainer {
    constructor({ el, binding, vnode, lazy }) {
      this.el = null;
      this.vnode = vnode;
      this.binding = binding;
      this.options = {};
      this.lazy = lazy;
      this.queue = [];
      this.update({ el, binding });
    }
    update({ el, binding }) {
      this.el = el;
      this.options = Object.assign({}, defaultOptions, binding.value);
      const imgs = this.getImgs();
      imgs.forEach((el2) => {
        this.lazy.add(
          el2,
          Object.assign({}, this.binding, {
            value: {
              src: "dataset" in el2 ? el2.dataset.src : el2.getAttribute("data-src"),
              error: ("dataset" in el2 ? el2.dataset.error : el2.getAttribute("data-error")) || this.options.error,
              loading: ("dataset" in el2 ? el2.dataset.loading : el2.getAttribute("data-loading")) || this.options.loading
            }
          }),
          this.vnode
        );
      });
    }
    getImgs() {
      return Array.from(this.el.querySelectorAll(this.options.selector));
    }
    clear() {
      const imgs = this.getImgs();
      imgs.forEach((el) => this.lazy.remove(el));
      this.vnode = null;
      this.binding = null;
      this.lazy = null;
    }
  }
  class LazyContainerManager {
    constructor({ lazy }) {
      this.lazy = lazy;
      this.queue = [];
    }
    bind(el, binding, vnode) {
      const container = new LazyContainer({
        el,
        binding,
        vnode,
        lazy: this.lazy
      });
      this.queue.push(container);
    }
    update(el, binding, vnode) {
      const container = this.queue.find((item) => item.el === el);
      if (!container)
        return;
      container.update({ el, binding, vnode });
    }
    unbind(el) {
      const container = this.queue.find((item) => item.el === el);
      if (!container)
        return;
      container.clear();
      remove(this.queue, container);
    }
  }
  var stdin_default$1 = (lazyManager) => ({
    props: {
      src: [String, Object],
      tag: {
        type: String,
        default: "img"
      }
    },
    render() {
      var _a, _b;
      return vue.h(
        this.tag,
        {
          src: this.renderSrc
        },
        (_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)
      );
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
        const { src, loading, error } = lazyManager.valueFormatter(this.src);
        this.state.loaded = false;
        this.options.src = src;
        this.options.error = error;
        this.options.loading = loading;
        this.renderSrc = this.options.loading;
      },
      checkInView() {
        const rect = useRect(this.$el);
        return rect.top < window.innerHeight * lazyManager.options.preLoad && rect.bottom > 0 && rect.left < window.innerWidth * lazyManager.options.preLoad && rect.right > 0;
      },
      load(onFinish = noop) {
        if (this.state.attempt > this.options.attempt - 1 && this.state.error) {
          onFinish();
          return;
        }
        const { src } = this.options;
        loadImageAsync(
          { src },
          ({ src: src2 }) => {
            this.renderSrc = src2;
            this.state.loaded = true;
          },
          () => {
            this.state.attempt++;
            this.renderSrc = this.options.error;
            this.state.error = true;
          }
        );
      }
    }
  });
  const Lazyload = {
    install(app, options = {}) {
      const LazyClass = stdin_default$3();
      const lazy = new LazyClass(options);
      const lazyContainer = new LazyContainerManager({ lazy });
      app.config.globalProperties.$Lazyload = lazy;
      if (options.lazyComponent) {
        app.component("LazyComponent", stdin_default$2(lazy));
      }
      if (options.lazyImage) {
        app.component("LazyImage", stdin_default$1(lazy));
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
  const version = "3.6.12";
  function install(app) {
    const components = [
      ActionBar,
      ActionBarButton,
      ActionBarIcon,
      ActionSheet,
      AddressEdit,
      AddressList,
      Area,
      Badge,
      Button,
      Calendar,
      Card,
      Cascader,
      Cell,
      CellGroup,
      Checkbox,
      CheckboxGroup,
      Circle,
      Col,
      Collapse,
      CollapseItem,
      ConfigProvider,
      ContactCard,
      ContactEdit,
      ContactList,
      CountDown,
      Coupon,
      CouponCell,
      CouponList,
      DatetimePicker,
      Dialog,
      Divider,
      DropdownItem,
      DropdownMenu,
      Empty,
      Field,
      Form,
      Grid,
      GridItem,
      Icon,
      Image$1,
      ImagePreview,
      IndexAnchor,
      IndexBar,
      List,
      Loading,
      Locale,
      NavBar,
      NoticeBar,
      Notify,
      NumberKeyboard,
      Overlay,
      Pagination,
      PasswordInput,
      Picker,
      Popover,
      Popup,
      Progress,
      PullRefresh,
      Radio,
      RadioGroup,
      Rate,
      Row,
      Search,
      ShareSheet,
      Sidebar,
      SidebarItem,
      Skeleton,
      Slider,
      Space,
      Step,
      Stepper,
      Steps,
      Sticky,
      SubmitBar,
      Swipe,
      SwipeCell,
      SwipeItem,
      Switch,
      Tab,
      Tabbar,
      TabbarItem,
      Tabs,
      Tag,
      Toast,
      TreeSelect,
      Uploader
    ];
    components.forEach((item) => {
      if (item.install) {
        app.use(item);
      } else if (item.name) {
        app.component(item.name, item);
      }
    });
  }
  var stdin_default = {
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
  exports2.Space = Space;
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
  exports2.default = stdin_default;
  exports2.install = install;
  exports2.version = version;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
