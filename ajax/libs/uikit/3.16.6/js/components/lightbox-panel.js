/*! UIkit 3.16.6 | https://www.getuikit.com | (c) 2014 - 2023 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitlightbox_panel', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitLightbox_panel = factory(global.UIkit.util));
})(this, (function (uikitUtil) { 'use strict';

    var Animations$1 = {
      slide: {
        show(dir) {
          return [{ transform: translate(dir * -100) }, { transform: translate() }];
        },
        percent(current) {
          return translated(current);
        },
        translate(percent, dir) {
          return [
            { transform: translate(dir * -100 * percent) },
            { transform: translate(dir * 100 * (1 - percent)) }
          ];
        }
      }
    };
    function translated(el) {
      return Math.abs(uikitUtil.css(el, "transform").split(",")[4] / el.offsetWidth) || 0;
    }
    function translate(value = 0, unit = "%") {
      value += value ? unit : "";
      return `translate3d(${value}, 0, 0)`;
    }
    function scale3d(value) {
      return `scale3d(${value}, ${value}, 1)`;
    }

    var Animations = {
      ...Animations$1,
      fade: {
        show() {
          return [{ opacity: 0 }, { opacity: 1 }];
        },
        percent(current) {
          return 1 - uikitUtil.css(current, "opacity");
        },
        translate(percent) {
          return [{ opacity: 1 - percent }, { opacity: percent }];
        }
      },
      scale: {
        show() {
          return [
            { opacity: 0, transform: scale3d(1 - 0.2) },
            { opacity: 1, transform: scale3d(1) }
          ];
        },
        percent(current) {
          return 1 - uikitUtil.css(current, "opacity");
        },
        translate(percent) {
          return [
            { opacity: 1 - percent, transform: scale3d(1 - 0.2 * percent) },
            { opacity: percent, transform: scale3d(1 - 0.2 + 0.2 * percent) }
          ];
        }
      }
    };

    var Class = {
      connected() {
        uikitUtil.addClass(this.$el, this.$options.id);
      }
    };

    var Container = {
      props: {
        container: Boolean
      },
      data: {
        container: true
      },
      computed: {
        container({ container }) {
          return container === true && this.$container || container && uikitUtil.$(container);
        }
      }
    };

    var Togglable = {
      props: {
        cls: Boolean,
        animation: "list",
        duration: Number,
        velocity: Number,
        origin: String,
        transition: String
      },
      data: {
        cls: false,
        animation: [false],
        duration: 200,
        velocity: 0.2,
        origin: false,
        transition: "ease",
        clsEnter: "uk-togglabe-enter",
        clsLeave: "uk-togglabe-leave"
      },
      computed: {
        hasAnimation({ animation }) {
          return !!animation[0];
        },
        hasTransition({ animation }) {
          return ["slide", "reveal"].some((transition) => uikitUtil.startsWith(animation[0], transition));
        }
      },
      methods: {
        toggleElement(targets, toggle, animate) {
          return new Promise(
            (resolve) => Promise.all(
              uikitUtil.toNodes(targets).map((el) => {
                const show = uikitUtil.isBoolean(toggle) ? toggle : !this.isToggled(el);
                if (!uikitUtil.trigger(el, `before${show ? "show" : "hide"}`, [this])) {
                  return Promise.reject();
                }
                const promise = (uikitUtil.isFunction(animate) ? animate : animate === false || !this.hasAnimation ? toggleInstant : this.hasTransition ? toggleTransition : toggleAnimation)(el, show, this);
                const cls = show ? this.clsEnter : this.clsLeave;
                uikitUtil.addClass(el, cls);
                uikitUtil.trigger(el, show ? "show" : "hide", [this]);
                const done = () => {
                  uikitUtil.removeClass(el, cls);
                  uikitUtil.trigger(el, show ? "shown" : "hidden", [this]);
                };
                return promise ? promise.then(done, () => {
                  uikitUtil.removeClass(el, cls);
                  return Promise.reject();
                }) : done();
              })
            ).then(resolve, uikitUtil.noop)
          );
        },
        isToggled(el = this.$el) {
          [el] = uikitUtil.toNodes(el);
          return uikitUtil.hasClass(el, this.clsEnter) ? true : uikitUtil.hasClass(el, this.clsLeave) ? false : this.cls ? uikitUtil.hasClass(el, this.cls.split(" ")[0]) : uikitUtil.isVisible(el);
        },
        _toggle(el, toggled) {
          if (!el) {
            return;
          }
          toggled = Boolean(toggled);
          let changed;
          if (this.cls) {
            changed = uikitUtil.includes(this.cls, " ") || toggled !== uikitUtil.hasClass(el, this.cls);
            changed && uikitUtil.toggleClass(el, this.cls, uikitUtil.includes(this.cls, " ") ? void 0 : toggled);
          } else {
            changed = toggled === el.hidden;
            changed && (el.hidden = !toggled);
          }
          uikitUtil.$$("[autofocus]", el).some((el2) => uikitUtil.isVisible(el2) ? el2.focus() || true : el2.blur());
          if (changed) {
            uikitUtil.trigger(el, "toggled", [toggled, this]);
          }
        }
      }
    };
    function toggleInstant(el, show, { _toggle }) {
      uikitUtil.Animation.cancel(el);
      uikitUtil.Transition.cancel(el);
      return _toggle(el, show);
    }
    async function toggleTransition(el, show, { animation, duration, velocity, transition, _toggle }) {
      var _a;
      const [mode = "reveal", startProp = "top"] = ((_a = animation[0]) == null ? void 0 : _a.split("-")) || [];
      const dirs = [
        ["left", "right"],
        ["top", "bottom"]
      ];
      const dir = dirs[uikitUtil.includes(dirs[0], startProp) ? 0 : 1];
      const end = dir[1] === startProp;
      const props = ["width", "height"];
      const dimProp = props[dirs.indexOf(dir)];
      const marginProp = `margin-${dir[0]}`;
      const marginStartProp = `margin-${startProp}`;
      let currentDim = uikitUtil.dimensions(el)[dimProp];
      const inProgress = uikitUtil.Transition.inProgress(el);
      await uikitUtil.Transition.cancel(el);
      if (show) {
        _toggle(el, true);
      }
      const prevProps = Object.fromEntries(
        [
          "padding",
          "border",
          "width",
          "height",
          "minWidth",
          "minHeight",
          "overflowY",
          "overflowX",
          marginProp,
          marginStartProp
        ].map((key) => [key, el.style[key]])
      );
      const dim = uikitUtil.dimensions(el);
      const currentMargin = uikitUtil.toFloat(uikitUtil.css(el, marginProp));
      const marginStart = uikitUtil.toFloat(uikitUtil.css(el, marginStartProp));
      const endDim = dim[dimProp] + marginStart;
      if (!inProgress && !show) {
        currentDim += marginStart;
      }
      const [wrapper] = uikitUtil.wrapInner(el, "<div>");
      uikitUtil.css(wrapper, {
        boxSizing: "border-box",
        height: dim.height,
        width: dim.width,
        ...uikitUtil.css(el, [
          "overflow",
          "padding",
          "borderTop",
          "borderRight",
          "borderBottom",
          "borderLeft",
          "borderImage",
          marginStartProp
        ])
      });
      uikitUtil.css(el, {
        padding: 0,
        border: 0,
        minWidth: 0,
        minHeight: 0,
        [marginStartProp]: 0,
        width: dim.width,
        height: dim.height,
        overflow: "hidden",
        [dimProp]: currentDim
      });
      const percent = currentDim / endDim;
      duration = (velocity * endDim + duration) * (show ? 1 - percent : percent);
      const endProps = { [dimProp]: show ? endDim : 0 };
      if (end) {
        uikitUtil.css(el, marginProp, endDim - currentDim + currentMargin);
        endProps[marginProp] = show ? currentMargin : endDim + currentMargin;
      }
      if (!end ^ mode === "reveal") {
        uikitUtil.css(wrapper, marginProp, -endDim + currentDim);
        uikitUtil.Transition.start(wrapper, { [marginProp]: show ? 0 : -endDim }, duration, transition);
      }
      try {
        await uikitUtil.Transition.start(el, endProps, duration, transition);
      } finally {
        uikitUtil.css(el, prevProps);
        uikitUtil.unwrap(wrapper.firstChild);
        if (!show) {
          _toggle(el, false);
        }
      }
    }
    function toggleAnimation(el, show, cmp) {
      uikitUtil.Animation.cancel(el);
      const { animation, duration, _toggle } = cmp;
      if (show) {
        _toggle(el, true);
        return uikitUtil.Animation.in(el, animation[0], duration, cmp.origin);
      }
      return uikitUtil.Animation.out(el, animation[1] || animation[0], duration, cmp.origin).then(
        () => _toggle(el, false)
      );
    }

    const { hasOwnProperty, toString } = Object.prototype;
    function hasOwn(obj, key) {
      return hasOwnProperty.call(obj, key);
    }
    const hyphenateRe = /\B([A-Z])/g;
    const hyphenate = memoize((str) => str.replace(hyphenateRe, "-$1").toLowerCase());
    const camelizeRe = /-(\w)/g;
    const camelize = memoize(
      (str) => (str.charAt(0).toLowerCase() + str.slice(1)).replace(camelizeRe, (_, c) => c.toUpperCase())
    );
    const ucfirst = memoize((str) => str.charAt(0).toUpperCase() + str.slice(1));
    function startsWith(str, search) {
      var _a;
      return (_a = str == null ? void 0 : str.startsWith) == null ? void 0 : _a.call(str, search);
    }
    function endsWith(str, search) {
      var _a;
      return (_a = str == null ? void 0 : str.endsWith) == null ? void 0 : _a.call(str, search);
    }
    function includes(obj, search) {
      var _a;
      return (_a = obj == null ? void 0 : obj.includes) == null ? void 0 : _a.call(obj, search);
    }
    function findIndex(array, predicate) {
      var _a;
      return (_a = array == null ? void 0 : array.findIndex) == null ? void 0 : _a.call(array, predicate);
    }
    const { isArray, from: toArray } = Array;
    const { assign } = Object;
    function isFunction(obj) {
      return typeof obj === "function";
    }
    function isObject(obj) {
      return obj !== null && typeof obj === "object";
    }
    function isPlainObject(obj) {
      return toString.call(obj) === "[object Object]";
    }
    function isWindow(obj) {
      return isObject(obj) && obj === obj.window;
    }
    function isDocument(obj) {
      return nodeType(obj) === 9;
    }
    function isNode(obj) {
      return nodeType(obj) >= 1;
    }
    function isElement(obj) {
      return nodeType(obj) === 1;
    }
    function nodeType(obj) {
      return !isWindow(obj) && isObject(obj) && obj.nodeType;
    }
    function isBoolean(value) {
      return typeof value === "boolean";
    }
    function isString(value) {
      return typeof value === "string";
    }
    function isNumber(value) {
      return typeof value === "number";
    }
    function isNumeric(value) {
      return isNumber(value) || isString(value) && !isNaN(value - parseFloat(value));
    }
    function isEmpty(obj) {
      return !(isArray(obj) ? obj.length : isObject(obj) ? Object.keys(obj).length : false);
    }
    function isUndefined(value) {
      return value === void 0;
    }
    function toBoolean(value) {
      return isBoolean(value) ? value : value === "true" || value === "1" || value === "" ? true : value === "false" || value === "0" ? false : value;
    }
    function toNumber(value) {
      const number = Number(value);
      return isNaN(number) ? false : number;
    }
    function toFloat(value) {
      return parseFloat(value) || 0;
    }
    function toNode(element) {
      return toNodes(element)[0];
    }
    function toNodes(element) {
      return isNode(element) ? [element] : Array.from(element || []).filter(isNode);
    }
    function toWindow(element) {
      if (isWindow(element)) {
        return element;
      }
      element = toNode(element);
      const document = isDocument(element) ? element : element == null ? void 0 : element.ownerDocument;
      return (document == null ? void 0 : document.defaultView) || window;
    }
    function isEqual(value, other) {
      return value === other || isObject(value) && isObject(other) && Object.keys(value).length === Object.keys(other).length && each(value, (val, key) => val === other[key]);
    }
    function swap(value, a, b) {
      return value.replace(new RegExp(`${a}|${b}`, "g"), (match) => match === a ? b : a);
    }
    function last(array) {
      return array[array.length - 1];
    }
    function each(obj, cb) {
      for (const key in obj) {
        if (false === cb(obj[key], key)) {
          return false;
        }
      }
      return true;
    }
    function sortBy(array, prop) {
      return array.slice().sort(
        ({ [prop]: propA = 0 }, { [prop]: propB = 0 }) => propA > propB ? 1 : propB > propA ? -1 : 0
      );
    }
    function sumBy(array, iteratee) {
      return array.reduce(
        (sum, item) => sum + toFloat(isFunction(iteratee) ? iteratee(item) : item[iteratee]),
        0
      );
    }
    function uniqueBy(array, prop) {
      const seen = /* @__PURE__ */ new Set();
      return array.filter(({ [prop]: check }) => seen.has(check) ? false : seen.add(check));
    }
    function pick(obj, props) {
      return props.reduce((res, prop) => ({ ...res, [prop]: obj[prop] }), {});
    }
    function clamp(number, min = 0, max = 1) {
      return Math.min(Math.max(toNumber(number) || 0, min), max);
    }
    function noop() {
    }
    function intersectRect(...rects) {
      return [
        ["bottom", "top"],
        ["right", "left"]
      ].every(
        ([minProp, maxProp]) => Math.min(...rects.map(({ [minProp]: min }) => min)) - Math.max(...rects.map(({ [maxProp]: max }) => max)) > 0
      );
    }
    function pointInRect(point, rect) {
      return point.x <= rect.right && point.x >= rect.left && point.y <= rect.bottom && point.y >= rect.top;
    }
    function ratio(dimensions, prop, value) {
      const aProp = prop === "width" ? "height" : "width";
      return {
        [aProp]: dimensions[prop] ? Math.round(value * dimensions[aProp] / dimensions[prop]) : dimensions[aProp],
        [prop]: value
      };
    }
    function contain(dimensions, maxDimensions) {
      dimensions = { ...dimensions };
      for (const prop in dimensions) {
        dimensions = dimensions[prop] > maxDimensions[prop] ? ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
      }
      return dimensions;
    }
    function cover(dimensions, maxDimensions) {
      dimensions = contain(dimensions, maxDimensions);
      for (const prop in dimensions) {
        dimensions = dimensions[prop] < maxDimensions[prop] ? ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
      }
      return dimensions;
    }
    const Dimensions = { ratio, contain, cover };
    function getIndex(i, elements, current = 0, finite = false) {
      elements = toNodes(elements);
      const { length } = elements;
      if (!length) {
        return -1;
      }
      i = isNumeric(i) ? toNumber(i) : i === "next" ? current + 1 : i === "previous" ? current - 1 : i === "last" ? length - 1 : elements.indexOf(toNode(i));
      if (finite) {
        return clamp(i, 0, length - 1);
      }
      i %= length;
      return i < 0 ? i + length : i;
    }
    function memoize(fn) {
      const cache = /* @__PURE__ */ Object.create(null);
      return (key) => cache[key] || (cache[key] = fn(key));
    }
    class Deferred {
      constructor() {
        this.promise = new Promise((resolve, reject) => {
          this.reject = reject;
          this.resolve = resolve;
        });
      }
    }

    function attr(element, name, value) {
      var _a;
      if (isObject(name)) {
        for (const key in name) {
          attr(element, key, name[key]);
        }
        return;
      }
      if (isUndefined(value)) {
        return (_a = toNode(element)) == null ? void 0 : _a.getAttribute(name);
      } else {
        for (const el of toNodes(element)) {
          if (isFunction(value)) {
            value = value.call(el, attr(el, name));
          }
          if (value === null) {
            removeAttr(el, name);
          } else {
            el.setAttribute(name, value);
          }
        }
      }
    }
    function hasAttr(element, name) {
      return toNodes(element).some((element2) => element2.hasAttribute(name));
    }
    function removeAttr(element, name) {
      toNodes(element).forEach((element2) => element2.removeAttribute(name));
    }
    function data(element, attribute) {
      for (const name of [attribute, `data-${attribute}`]) {
        if (hasAttr(element, name)) {
          return attr(element, name);
        }
      }
    }

    const voidElements = {
      area: true,
      base: true,
      br: true,
      col: true,
      embed: true,
      hr: true,
      img: true,
      input: true,
      keygen: true,
      link: true,
      meta: true,
      param: true,
      source: true,
      track: true,
      wbr: true
    };
    function isVoidElement(element) {
      return toNodes(element).some((element2) => voidElements[element2.tagName.toLowerCase()]);
    }
    function isVisible(element) {
      return toNodes(element).some(
        (element2) => element2.offsetWidth || element2.offsetHeight || element2.getClientRects().length
      );
    }
    const selInput = "input,select,textarea,button";
    function isInput(element) {
      return toNodes(element).some((element2) => matches(element2, selInput));
    }
    const selFocusable = `${selInput},a[href],[tabindex]`;
    function isFocusable(element) {
      return matches(element, selFocusable);
    }
    function parent(element) {
      var _a;
      return (_a = toNode(element)) == null ? void 0 : _a.parentElement;
    }
    function filter(element, selector) {
      return toNodes(element).filter((element2) => matches(element2, selector));
    }
    function matches(element, selector) {
      return toNodes(element).some((element2) => element2.matches(selector));
    }
    function closest(element, selector) {
      return isElement(element) ? element.closest(startsWith(selector, ">") ? selector.slice(1) : selector) : toNodes(element).map((element2) => closest(element2, selector)).filter(Boolean);
    }
    function within(element, selector) {
      return isString(selector) ? !!closest(element, selector) : toNode(selector).contains(toNode(element));
    }
    function parents(element, selector) {
      const elements = [];
      while (element = parent(element)) {
        if (!selector || matches(element, selector)) {
          elements.push(element);
        }
      }
      return elements;
    }
    function children(element, selector) {
      element = toNode(element);
      const children2 = element ? toNodes(element.children) : [];
      return selector ? filter(children2, selector) : children2;
    }
    function index(element, ref) {
      return ref ? toNodes(element).indexOf(toNode(ref)) : children(parent(element)).indexOf(element);
    }
    function isSameSiteAnchor(el) {
      el = toNode(el);
      return el && ["origin", "pathname", "search"].every((part) => el[part] === location[part]);
    }
    function getTargetedElement(el) {
      if (isSameSiteAnchor(el)) {
        el = toNode(el);
        const id = decodeURIComponent(el.hash).substring(1);
        return document.getElementById(id) || document.getElementsByName(id)[0];
      }
    }

    function query(selector, context) {
      return find(selector, getContext(selector, context));
    }
    function queryAll(selector, context) {
      return findAll(selector, getContext(selector, context));
    }
    function find(selector, context) {
      return toNode(_query(selector, toNode(context), "querySelector"));
    }
    function findAll(selector, context) {
      return toNodes(_query(selector, toNode(context), "querySelectorAll"));
    }
    const contextSelectorRe = /(^|[^\\],)\s*[!>+~-]/;
    const isContextSelector = memoize((selector) => selector.match(contextSelectorRe));
    function getContext(selector, context = document) {
      return isString(selector) && isContextSelector(selector) || isDocument(context) ? context : context.ownerDocument;
    }
    const contextSanitizeRe = /([!>+~-])(?=\s+[!>+~-]|\s*$)/g;
    const sanatize = memoize((selector) => selector.replace(contextSanitizeRe, "$1 *"));
    function _query(selector, context = document, queryFn) {
      if (!selector || !isString(selector)) {
        return selector;
      }
      selector = sanatize(selector);
      if (isContextSelector(selector)) {
        const split = splitSelector(selector);
        selector = "";
        for (let sel of split) {
          let ctx = context;
          if (sel[0] === "!") {
            const selectors = sel.substr(1).trim().split(" ");
            ctx = closest(parent(context), selectors[0]);
            sel = selectors.slice(1).join(" ").trim();
            if (!sel.length && split.length === 1) {
              return ctx;
            }
          }
          if (sel[0] === "-") {
            const selectors = sel.substr(1).trim().split(" ");
            const prev = (ctx || context).previousElementSibling;
            ctx = matches(prev, sel.substr(1)) ? prev : null;
            sel = selectors.slice(1).join(" ");
          }
          if (ctx) {
            selector += `${selector ? "," : ""}${domPath(ctx)} ${sel}`;
          }
        }
        context = document;
      }
      try {
        return context[queryFn](selector);
      } catch (e) {
        return null;
      }
    }
    const selectorRe = /.*?[^\\](?:,|$)/g;
    const splitSelector = memoize(
      (selector) => selector.match(selectorRe).map((selector2) => selector2.replace(/,$/, "").trim())
    );
    function domPath(element) {
      const names = [];
      while (element.parentNode) {
        const id = attr(element, "id");
        if (id) {
          names.unshift(`#${escape(id)}`);
          break;
        } else {
          let { tagName } = element;
          if (tagName !== "HTML") {
            tagName += `:nth-child(${index(element) + 1})`;
          }
          names.unshift(tagName);
          element = element.parentNode;
        }
      }
      return names.join(" > ");
    }
    function escape(css) {
      return isString(css) ? CSS.escape(css) : "";
    }

    function on(...args) {
      let [targets, types, selector, listener, useCapture = false] = getArgs(args);
      if (listener.length > 1) {
        listener = detail(listener);
      }
      if (useCapture == null ? void 0 : useCapture.self) {
        listener = selfFilter(listener);
      }
      if (selector) {
        listener = delegate(selector, listener);
      }
      for (const type of types) {
        for (const target of targets) {
          target.addEventListener(type, listener, useCapture);
        }
      }
      return () => off(targets, types, listener, useCapture);
    }
    function off(...args) {
      let [targets, types, , listener, useCapture = false] = getArgs(args);
      for (const type of types) {
        for (const target of targets) {
          target.removeEventListener(type, listener, useCapture);
        }
      }
    }
    function once(...args) {
      const [element, types, selector, listener, useCapture = false, condition] = getArgs(args);
      const off2 = on(
        element,
        types,
        selector,
        (e) => {
          const result = !condition || condition(e);
          if (result) {
            off2();
            listener(e, result);
          }
        },
        useCapture
      );
      return off2;
    }
    function trigger(targets, event, detail2) {
      return toEventTargets(targets).every(
        (target) => target.dispatchEvent(createEvent(event, true, true, detail2))
      );
    }
    function createEvent(e, bubbles = true, cancelable = false, detail2) {
      if (isString(e)) {
        e = new CustomEvent(e, { bubbles, cancelable, detail: detail2 });
      }
      return e;
    }
    function getArgs(args) {
      args[0] = toEventTargets(args[0]);
      if (isString(args[1])) {
        args[1] = args[1].split(" ");
      }
      if (isFunction(args[2])) {
        args.splice(2, 0, false);
      }
      return args;
    }
    function delegate(selector, listener) {
      return (e) => {
        const current = selector[0] === ">" ? findAll(selector, e.currentTarget).reverse().filter((element) => within(e.target, element))[0] : closest(e.target, selector);
        if (current) {
          e.current = current;
          listener.call(this, e);
          delete e.current;
        }
      };
    }
    function detail(listener) {
      return (e) => isArray(e.detail) ? listener(e, ...e.detail) : listener(e);
    }
    function selfFilter(listener) {
      return function(e) {
        if (e.target === e.currentTarget || e.target === e.current) {
          return listener.call(null, e);
        }
      };
    }
    function isEventTarget(target) {
      return target && "addEventListener" in target;
    }
    function toEventTarget(target) {
      return isEventTarget(target) ? target : toNode(target);
    }
    function toEventTargets(target) {
      return isArray(target) ? target.map(toEventTarget).filter(Boolean) : isString(target) ? findAll(target) : isEventTarget(target) ? [target] : toNodes(target);
    }
    function isTouch(e) {
      return e.pointerType === "touch" || !!e.touches;
    }
    function getEventPos(e) {
      var _a, _b;
      const { clientX: x, clientY: y } = ((_a = e.touches) == null ? void 0 : _a[0]) || ((_b = e.changedTouches) == null ? void 0 : _b[0]) || e;
      return { x, y };
    }

    const cssNumber = {
      "animation-iteration-count": true,
      "column-count": true,
      "fill-opacity": true,
      "flex-grow": true,
      "flex-shrink": true,
      "font-weight": true,
      "line-height": true,
      opacity: true,
      order: true,
      orphans: true,
      "stroke-dasharray": true,
      "stroke-dashoffset": true,
      widows: true,
      "z-index": true,
      zoom: true
    };
    function css(element, property, value, priority) {
      const elements = toNodes(element);
      for (const element2 of elements) {
        if (isString(property)) {
          property = propName(property);
          if (isUndefined(value)) {
            return getComputedStyle(element2).getPropertyValue(property);
          } else {
            element2.style.setProperty(
              property,
              isNumeric(value) && !cssNumber[property] ? `${value}px` : value || isNumber(value) ? value : "",
              priority
            );
          }
        } else if (isArray(property)) {
          const props = {};
          for (const prop of property) {
            props[prop] = css(element2, prop);
          }
          return props;
        } else if (isObject(property)) {
          priority = value;
          each(property, (value2, property2) => css(element2, property2, value2, priority));
        }
      }
      return elements[0];
    }
    const propName = memoize((name) => vendorPropName(name));
    function vendorPropName(name) {
      if (startsWith(name, "--")) {
        return name;
      }
      name = hyphenate(name);
      const { style } = document.documentElement;
      if (name in style) {
        return name;
      }
      for (const prefix of ["webkit", "moz"]) {
        const prefixedName = `-${prefix}-${name}`;
        if (prefixedName in style) {
          return prefixedName;
        }
      }
    }

    function ready(fn) {
      if (document.readyState !== "loading") {
        fn();
        return;
      }
      once(document, "DOMContentLoaded", fn);
    }
    function isTag(element, ...tagNames) {
      return tagNames.some((tagName) => {
        var _a;
        return ((_a = element == null ? void 0 : element.tagName) == null ? void 0 : _a.toLowerCase()) === tagName.toLowerCase();
      });
    }
    function empty(element) {
      element = $(element);
      element.innerHTML = "";
      return element;
    }
    function html(parent2, html2) {
      return isUndefined(html2) ? $(parent2).innerHTML : append(empty(parent2), html2);
    }
    const prepend = applyFn("prepend");
    const append = applyFn("append");
    const before = applyFn("before");
    const after = applyFn("after");
    function applyFn(fn) {
      return function(ref, element) {
        var _a;
        const nodes = toNodes(isString(element) ? fragment(element) : element);
        (_a = $(ref)) == null ? void 0 : _a[fn](...nodes);
        return unwrapSingle(nodes);
      };
    }
    function remove$1(element) {
      toNodes(element).forEach((element2) => element2.remove());
    }
    function wrapAll(element, structure) {
      structure = toNode(before(element, structure));
      while (structure.firstChild) {
        structure = structure.firstChild;
      }
      append(structure, element);
      return structure;
    }
    function wrapInner(element, structure) {
      return toNodes(
        toNodes(element).map(
          (element2) => element2.hasChildNodes() ? wrapAll(toNodes(element2.childNodes), structure) : append(element2, structure)
        )
      );
    }
    function unwrap(element) {
      toNodes(element).map(parent).filter((value, index, self) => self.indexOf(value) === index).forEach((parent2) => parent2.replaceWith(...parent2.childNodes));
    }
    const fragmentRe = /^\s*<(\w+|!)[^>]*>/;
    const singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
    function fragment(html2) {
      const matches = singleTagRe.exec(html2);
      if (matches) {
        return document.createElement(matches[1]);
      }
      const container = document.createElement("div");
      if (fragmentRe.test(html2)) {
        container.insertAdjacentHTML("beforeend", html2.trim());
      } else {
        container.textContent = html2;
      }
      return unwrapSingle(container.childNodes);
    }
    function unwrapSingle(nodes) {
      return nodes.length > 1 ? nodes : nodes[0];
    }
    function apply$1(node, fn) {
      if (!isElement(node)) {
        return;
      }
      fn(node);
      node = node.firstElementChild;
      while (node) {
        const next = node.nextElementSibling;
        apply$1(node, fn);
        node = next;
      }
    }
    function $(selector, context) {
      return isHtml(selector) ? toNode(fragment(selector)) : find(selector, context);
    }
    function $$(selector, context) {
      return isHtml(selector) ? toNodes(fragment(selector)) : findAll(selector, context);
    }
    function isHtml(str) {
      return isString(str) && startsWith(str.trim(), "<");
    }

    const dirs$1 = {
      width: ["left", "right"],
      height: ["top", "bottom"]
    };
    function dimensions(element) {
      const rect = isElement(element) ? toNode(element).getBoundingClientRect() : { height: height(element), width: width(element), top: 0, left: 0 };
      return {
        height: rect.height,
        width: rect.width,
        top: rect.top,
        left: rect.left,
        bottom: rect.top + rect.height,
        right: rect.left + rect.width
      };
    }
    function offset(element, coordinates) {
      const currentOffset = dimensions(element);
      if (element) {
        const { scrollY, scrollX } = toWindow(element);
        const offsetBy = { height: scrollY, width: scrollX };
        for (const dir in dirs$1) {
          for (const prop of dirs$1[dir]) {
            currentOffset[prop] += offsetBy[dir];
          }
        }
      }
      if (!coordinates) {
        return currentOffset;
      }
      const pos = css(element, "position");
      each(
        css(element, ["left", "top"]),
        (value, prop) => css(
          element,
          prop,
          coordinates[prop] - currentOffset[prop] + toFloat(pos === "absolute" && value === "auto" ? position(element)[prop] : value)
        )
      );
    }
    function position(element) {
      let { top, left } = offset(element);
      const {
        ownerDocument: { body, documentElement },
        offsetParent
      } = toNode(element);
      let parent = offsetParent || documentElement;
      while (parent && (parent === body || parent === documentElement) && css(parent, "position") === "static") {
        parent = parent.parentNode;
      }
      if (isElement(parent)) {
        const parentOffset = offset(parent);
        top -= parentOffset.top + toFloat(css(parent, "borderTopWidth"));
        left -= parentOffset.left + toFloat(css(parent, "borderLeftWidth"));
      }
      return {
        top: top - toFloat(css(element, "marginTop")),
        left: left - toFloat(css(element, "marginLeft"))
      };
    }
    function offsetPosition(element) {
      element = toNode(element);
      const offset2 = [element.offsetTop, element.offsetLeft];
      while (element = element.offsetParent) {
        offset2[0] += element.offsetTop + toFloat(css(element, `borderTopWidth`));
        offset2[1] += element.offsetLeft + toFloat(css(element, `borderLeftWidth`));
        if (css(element, "position") === "fixed") {
          const win = toWindow(element);
          offset2[0] += win.scrollY;
          offset2[1] += win.scrollX;
          return offset2;
        }
      }
      return offset2;
    }
    const height = dimension("height");
    const width = dimension("width");
    function dimension(prop) {
      const propName = ucfirst(prop);
      return (element, value) => {
        if (isUndefined(value)) {
          if (isWindow(element)) {
            return element[`inner${propName}`];
          }
          if (isDocument(element)) {
            const doc = element.documentElement;
            return Math.max(doc[`offset${propName}`], doc[`scroll${propName}`]);
          }
          element = toNode(element);
          value = css(element, prop);
          value = value === "auto" ? element[`offset${propName}`] : toFloat(value) || 0;
          return value - boxModelAdjust(element, prop);
        } else {
          return css(
            element,
            prop,
            !value && value !== 0 ? "" : +value + boxModelAdjust(element, prop) + "px"
          );
        }
      };
    }
    function boxModelAdjust(element, prop, sizing = "border-box") {
      return css(element, "boxSizing") === sizing ? sumBy(
        dirs$1[prop].map(ucfirst),
        (prop2) => toFloat(css(element, `padding${prop2}`)) + toFloat(css(element, `border${prop2}Width`))
      ) : 0;
    }
    function flipPosition(pos) {
      for (const dir in dirs$1) {
        for (const i in dirs$1[dir]) {
          if (dirs$1[dir][i] === pos) {
            return dirs$1[dir][1 - i];
          }
        }
      }
      return pos;
    }
    function toPx(value, property = "width", element = window, offsetDim = false) {
      if (!isString(value)) {
        return toFloat(value);
      }
      return sumBy(parseCalc(value), (value2) => {
        const unit = parseUnit(value2);
        return unit ? percent(
          unit === "vh" ? getViewportHeight() : unit === "vw" ? width(toWindow(element)) : offsetDim ? element[`offset${ucfirst(property)}`] : dimensions(element)[property],
          value2
        ) : value2;
      });
    }
    const calcRe = /-?\d+(?:\.\d+)?(?:v[wh]|%|px)?/g;
    const parseCalc = memoize((calc) => calc.toString().replace(/\s/g, "").match(calcRe) || []);
    const unitRe = /(?:v[hw]|%)$/;
    const parseUnit = memoize((str) => (str.match(unitRe) || [])[0]);
    function percent(base, value) {
      return base * toFloat(value) / 100;
    }
    let vh;
    let vhEl;
    function getViewportHeight() {
      if (vh) {
        return vh;
      }
      if (!vhEl) {
        vhEl = $("<div>");
        css(vhEl, {
          height: "100vh",
          position: "fixed"
        });
        on(window, "resize", () => vh = null);
      }
      append(document.body, vhEl);
      vh = vhEl.clientHeight;
      remove$1(vhEl);
      return vh;
    }

    function isInView(element, offsetTop = 0, offsetLeft = 0) {
      if (!isVisible(element)) {
        return false;
      }
      return intersectRect(
        ...overflowParents(element).map((parent) => {
          const { top, left, bottom, right } = offsetViewport(parent);
          return {
            top: top - offsetTop,
            left: left - offsetLeft,
            bottom: bottom + offsetTop,
            right: right + offsetLeft
          };
        }).concat(offset(element))
      );
    }
    function scrollIntoView(element, { offset: offsetBy = 0 } = {}) {
      const parents2 = isVisible(element) ? scrollParents(element, false, ["hidden"]) : [];
      return parents2.reduce(
        (fn, scrollElement, i) => {
          const { scrollTop, scrollHeight, offsetHeight } = scrollElement;
          const viewport = offsetViewport(scrollElement);
          const maxScroll = scrollHeight - viewport.height;
          const { height: elHeight, top: elTop } = parents2[i - 1] ? offsetViewport(parents2[i - 1]) : offset(element);
          let top = Math.ceil(elTop - viewport.top - offsetBy + scrollTop);
          if (offsetBy > 0 && offsetHeight < elHeight + offsetBy) {
            top += offsetBy;
          } else {
            offsetBy = 0;
          }
          if (top > maxScroll) {
            offsetBy -= top - maxScroll;
            top = maxScroll;
          } else if (top < 0) {
            offsetBy -= top;
            top = 0;
          }
          return () => scrollTo(scrollElement, top - scrollTop).then(fn);
        },
        () => Promise.resolve()
      )();
      function scrollTo(element2, top) {
        return new Promise((resolve) => {
          const scroll = element2.scrollTop;
          const duration = getDuration(Math.abs(top));
          const start = Date.now();
          (function step() {
            const percent = ease(clamp((Date.now() - start) / duration));
            element2.scrollTop = scroll + top * percent;
            if (percent === 1) {
              resolve();
            } else {
              requestAnimationFrame(step);
            }
          })();
        });
      }
      function getDuration(dist) {
        return 40 * Math.pow(dist, 0.375);
      }
      function ease(k) {
        return 0.5 * (1 - Math.cos(Math.PI * k));
      }
    }
    function scrolledOver(element, startOffset = 0, endOffset = 0) {
      if (!isVisible(element)) {
        return 0;
      }
      const [scrollElement] = scrollParents(element, true);
      const { scrollHeight, scrollTop } = scrollElement;
      const { height: viewportHeight } = offsetViewport(scrollElement);
      const maxScroll = scrollHeight - viewportHeight;
      const elementOffsetTop = offsetPosition(element)[0] - offsetPosition(scrollElement)[0];
      const start = Math.max(0, elementOffsetTop - viewportHeight + startOffset);
      const end = Math.min(maxScroll, elementOffsetTop + element.offsetHeight - endOffset);
      return clamp((scrollTop - start) / (end - start));
    }
    function scrollParents(element, scrollable = false, props = []) {
      const scrollEl = scrollingElement(element);
      let ancestors = parents(element).reverse();
      ancestors = ancestors.slice(ancestors.indexOf(scrollEl) + 1);
      const fixedIndex = findIndex(ancestors, (el) => css(el, "position") === "fixed");
      if (~fixedIndex) {
        ancestors = ancestors.slice(fixedIndex);
      }
      return [scrollEl].concat(
        ancestors.filter(
          (parent) => css(parent, "overflow").split(" ").some((prop) => includes(["auto", "scroll", ...props], prop)) && (!scrollable || parent.scrollHeight > offsetViewport(parent).height)
        )
      ).reverse();
    }
    function overflowParents(element) {
      return scrollParents(element, false, ["hidden", "clip"]);
    }
    function offsetViewport(scrollElement) {
      const window = toWindow(scrollElement);
      const {
        visualViewport,
        document: { documentElement }
      } = window;
      let viewportElement = scrollElement === scrollingElement(scrollElement) ? window : scrollElement;
      if (isWindow(viewportElement) && visualViewport) {
        let { height, width, scale, pageTop: top, pageLeft: left } = visualViewport;
        height = Math.round(height * scale);
        width = Math.round(width * scale);
        return { height, width, top, left, bottom: top + height, right: left + width };
      }
      let rect = offset(viewportElement);
      if (css(viewportElement, "display") === "inline") {
        return rect;
      }
      for (let [prop, dir, start, end] of [
        ["width", "x", "left", "right"],
        ["height", "y", "top", "bottom"]
      ]) {
        if (isWindow(viewportElement)) {
          viewportElement = documentElement;
        } else {
          rect[start] += toFloat(css(viewportElement, `border-${start}-width`));
        }
        rect[prop] = rect[dir] = viewportElement[`client${ucfirst(prop)}`];
        rect[end] = rect[prop] + rect[start];
      }
      return rect;
    }
    function scrollingElement(element) {
      return toWindow(element).document.scrollingElement;
    }

    let prevented;
    function preventBackgroundScroll(el) {
      const off = on(
        el,
        "touchmove",
        (e) => {
          if (e.targetTouches.length !== 1) {
            return;
          }
          let [{ scrollHeight, clientHeight }] = scrollParents(e.target);
          if (clientHeight >= scrollHeight && e.cancelable) {
            e.preventDefault();
          }
        },
        { passive: false }
      );
      if (prevented) {
        return off;
      }
      prevented = true;
      const { scrollingElement } = document;
      css(scrollingElement, {
        overflowY: CSS.supports("overflow", "clip") ? "clip" : "hidden",
        touchAction: "none",
        paddingRight: width(window) - scrollingElement.clientWidth || ""
      });
      return () => {
        prevented = false;
        off();
        css(scrollingElement, { overflowY: "", touchAction: "", paddingRight: "" });
      };
    }

    const active = [];
    var Modal = {
      mixins: [Class, Container, Togglable],
      props: {
        selPanel: String,
        selClose: String,
        escClose: Boolean,
        bgClose: Boolean,
        stack: Boolean,
        role: String
      },
      data: {
        cls: "uk-open",
        escClose: true,
        bgClose: true,
        overlay: true,
        stack: false,
        role: "dialog"
      },
      computed: {
        panel({ selPanel }, $el) {
          return uikitUtil.$(selPanel, $el);
        },
        transitionElement() {
          return this.panel;
        },
        bgClose({ bgClose }) {
          return bgClose && this.panel;
        }
      },
      connected() {
        uikitUtil.attr(this.panel || this.$el, "role", this.role);
        if (this.overlay) {
          uikitUtil.attr(this.panel || this.$el, "aria-modal", true);
        }
      },
      beforeDisconnect() {
        if (uikitUtil.includes(active, this)) {
          this.toggleElement(this.$el, false, false);
        }
      },
      events: [
        {
          name: "click",
          delegate() {
            return `${this.selClose},a[href*="#"]`;
          },
          handler(e) {
            const { current, defaultPrevented } = e;
            const { hash } = current;
            if (!defaultPrevented && hash && uikitUtil.isSameSiteAnchor(current) && !uikitUtil.within(hash, this.$el) && uikitUtil.$(hash, document.body)) {
              this.hide();
            } else if (uikitUtil.matches(current, this.selClose)) {
              e.preventDefault();
              this.hide();
            }
          }
        },
        {
          name: "toggle",
          self: true,
          handler(e) {
            if (e.defaultPrevented) {
              return;
            }
            e.preventDefault();
            if (this.isToggled() === uikitUtil.includes(active, this)) {
              this.toggle();
            }
          }
        },
        {
          name: "beforeshow",
          self: true,
          handler(e) {
            if (uikitUtil.includes(active, this)) {
              return false;
            }
            if (!this.stack && active.length) {
              Promise.all(active.map((modal) => modal.hide())).then(this.show);
              e.preventDefault();
            } else {
              active.push(this);
            }
          }
        },
        {
          name: "show",
          self: true,
          handler() {
            if (this.stack) {
              uikitUtil.css(this.$el, "zIndex", uikitUtil.toFloat(uikitUtil.css(this.$el, "zIndex")) + active.length);
            }
            const handlers = [
              this.overlay && preventBackgroundFocus(this),
              this.overlay && preventBackgroundScroll(this.$el),
              this.bgClose && listenForBackgroundClose(this),
              this.escClose && listenForEscClose(this)
            ];
            uikitUtil.once(
              this.$el,
              "hidden",
              () => handlers.forEach((handler) => handler && handler()),
              { self: true }
            );
            uikitUtil.addClass(document.documentElement, this.clsPage);
          }
        },
        {
          name: "shown",
          self: true,
          handler() {
            if (!uikitUtil.isFocusable(this.$el)) {
              uikitUtil.attr(this.$el, "tabindex", "-1");
            }
            if (!uikitUtil.matches(this.$el, ":focus-within")) {
              this.$el.focus();
            }
          }
        },
        {
          name: "hidden",
          self: true,
          handler() {
            if (uikitUtil.includes(active, this)) {
              active.splice(active.indexOf(this), 1);
            }
            uikitUtil.css(this.$el, "zIndex", "");
            if (!active.some((modal) => modal.clsPage === this.clsPage)) {
              uikitUtil.removeClass(document.documentElement, this.clsPage);
            }
          }
        }
      ],
      methods: {
        toggle() {
          return this.isToggled() ? this.hide() : this.show();
        },
        show() {
          if (this.container && uikitUtil.parent(this.$el) !== this.container) {
            uikitUtil.append(this.container, this.$el);
            return new Promise(
              (resolve) => requestAnimationFrame(() => this.show().then(resolve))
            );
          }
          return this.toggleElement(this.$el, true, animate$1);
        },
        hide() {
          return this.toggleElement(this.$el, false, animate$1);
        }
      }
    };
    function animate$1(el, show, { transitionElement, _toggle }) {
      return new Promise(
        (resolve, reject) => uikitUtil.once(el, "show hide", () => {
          var _a;
          (_a = el._reject) == null ? void 0 : _a.call(el);
          el._reject = reject;
          _toggle(el, show);
          const off = uikitUtil.once(
            transitionElement,
            "transitionstart",
            () => {
              uikitUtil.once(transitionElement, "transitionend transitioncancel", resolve, {
                self: true
              });
              clearTimeout(timer);
            },
            { self: true }
          );
          const timer = setTimeout(() => {
            off();
            resolve();
          }, toMs(uikitUtil.css(transitionElement, "transitionDuration")));
        })
      ).then(() => delete el._reject);
    }
    function toMs(time) {
      return time ? uikitUtil.endsWith(time, "ms") ? uikitUtil.toFloat(time) : uikitUtil.toFloat(time) * 1e3 : 0;
    }
    function preventBackgroundFocus(modal) {
      return uikitUtil.on(document, "focusin", (e) => {
        if (uikitUtil.last(active) === modal && !uikitUtil.within(e.target, modal.$el)) {
          modal.$el.focus();
        }
      });
    }
    function listenForBackgroundClose(modal) {
      return uikitUtil.on(document, uikitUtil.pointerDown, ({ target }) => {
        if (uikitUtil.last(active) !== modal || modal.overlay && !uikitUtil.within(target, modal.$el) || uikitUtil.within(target, modal.panel)) {
          return;
        }
        uikitUtil.once(
          document,
          `${uikitUtil.pointerUp} ${uikitUtil.pointerCancel} scroll`,
          ({ defaultPrevented, type, target: newTarget }) => {
            if (!defaultPrevented && type === uikitUtil.pointerUp && target === newTarget) {
              modal.hide();
            }
          },
          true
        );
      });
    }
    function listenForEscClose(modal) {
      return uikitUtil.on(document, "keydown", (e) => {
        if (e.keyCode === 27 && uikitUtil.last(active) === modal) {
          modal.hide();
        }
      });
    }

    function Transitioner(prev, next, dir, { animation, easing }) {
      const { percent, translate, show = uikitUtil.noop } = animation;
      const props = show(dir);
      const deferred = new uikitUtil.Deferred();
      return {
        dir,
        show(duration, percent2 = 0, linear) {
          const timing = linear ? "linear" : easing;
          duration -= Math.round(duration * uikitUtil.clamp(percent2, -1, 1));
          this.translate(percent2);
          triggerUpdate(next, "itemin", { percent: percent2, duration, timing, dir });
          triggerUpdate(prev, "itemout", { percent: 1 - percent2, duration, timing, dir });
          Promise.all([
            uikitUtil.Transition.start(next, props[1], duration, timing),
            uikitUtil.Transition.start(prev, props[0], duration, timing)
          ]).then(() => {
            this.reset();
            deferred.resolve();
          }, uikitUtil.noop);
          return deferred.promise;
        },
        cancel() {
          uikitUtil.Transition.cancel([next, prev]);
        },
        reset() {
          for (const prop in props[0]) {
            uikitUtil.css([next, prev], prop, "");
          }
        },
        forward(duration, percent2 = this.percent()) {
          uikitUtil.Transition.cancel([next, prev]);
          return this.show(duration, percent2, true);
        },
        translate(percent2) {
          this.reset();
          const props2 = translate(percent2, dir);
          uikitUtil.css(next, props2[1]);
          uikitUtil.css(prev, props2[0]);
          triggerUpdate(next, "itemtranslatein", { percent: percent2, dir });
          triggerUpdate(prev, "itemtranslateout", { percent: 1 - percent2, dir });
        },
        percent() {
          return percent(prev || next, next, dir);
        },
        getDistance() {
          return prev == null ? void 0 : prev.offsetWidth;
        }
      };
    }
    function triggerUpdate(el, type, data) {
      uikitUtil.trigger(el, uikitUtil.createEvent(type, false, false, data));
    }

    var I18n = {
      props: {
        i18n: Object
      },
      data: {
        i18n: null
      },
      methods: {
        t(key, ...params) {
          var _a, _b, _c;
          let i = 0;
          return ((_c = ((_a = this.i18n) == null ? void 0 : _a[key]) || ((_b = this.$options.i18n) == null ? void 0 : _b[key])) == null ? void 0 : _c.replace(
            /%s/g,
            () => params[i++] || ""
          )) || "";
        }
      }
    };

    const keyMap = {
      TAB: 9,
      ESC: 27,
      SPACE: 32,
      END: 35,
      HOME: 36,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40
    };

    function addClass(element, ...args) {
      apply(element, args, "add");
    }
    function removeClass(element, ...args) {
      apply(element, args, "remove");
    }
    function removeClasses(element, cls) {
      attr(
        element,
        "class",
        (value) => (value || "").replace(new RegExp(`\\b${cls}\\b\\s?`, "g"), "")
      );
    }
    function replaceClass(element, ...args) {
      args[0] && removeClass(element, args[0]);
      args[1] && addClass(element, args[1]);
    }
    function hasClass(element, cls) {
      [cls] = getClasses(cls);
      return !!cls && toNodes(element).some((node) => node.classList.contains(cls));
    }
    function toggleClass(element, cls, force) {
      const classes = getClasses(cls);
      if (!isUndefined(force)) {
        force = !!force;
      }
      for (const node of toNodes(element)) {
        for (const cls2 of classes) {
          node.classList.toggle(cls2, force);
        }
      }
    }
    function apply(element, args, fn) {
      args = args.reduce((args2, arg) => args2.concat(getClasses(arg)), []);
      for (const node of toNodes(element)) {
        node.classList[fn](...args);
      }
    }
    function getClasses(str) {
      return String(str).split(/[ ,]/).filter(Boolean);
    }

    function transition(element, props, duration = 400, timing = "linear") {
      duration = Math.round(duration);
      return Promise.all(
        toNodes(element).map(
          (element2) => new Promise((resolve, reject) => {
            for (const name in props) {
              const value = css(element2, name);
              if (value === "") {
                css(element2, name, value);
              }
            }
            const timer = setTimeout(() => trigger(element2, "transitionend"), duration);
            once(
              element2,
              "transitionend transitioncanceled",
              ({ type }) => {
                clearTimeout(timer);
                removeClass(element2, "uk-transition");
                css(element2, {
                  transitionProperty: "",
                  transitionDuration: "",
                  transitionTimingFunction: ""
                });
                type === "transitioncanceled" ? reject() : resolve(element2);
              },
              { self: true }
            );
            addClass(element2, "uk-transition");
            css(element2, {
              transitionProperty: Object.keys(props).map(propName).join(","),
              transitionDuration: `${duration}ms`,
              transitionTimingFunction: timing,
              ...props
            });
          })
        )
      );
    }
    const Transition = {
      start: transition,
      async stop(element) {
        trigger(element, "transitionend");
        await Promise.resolve();
      },
      async cancel(element) {
        trigger(element, "transitioncanceled");
        await Promise.resolve();
      },
      inProgress(element) {
        return hasClass(element, "uk-transition");
      }
    };
    const animationPrefix = "uk-animation-";
    function animate(element, animation, duration = 200, origin, out) {
      return Promise.all(
        toNodes(element).map(
          (element2) => new Promise((resolve, reject) => {
            trigger(element2, "animationcanceled");
            const timer = setTimeout(() => trigger(element2, "animationend"), duration);
            once(
              element2,
              "animationend animationcanceled",
              ({ type }) => {
                clearTimeout(timer);
                type === "animationcanceled" ? reject() : resolve(element2);
                css(element2, "animationDuration", "");
                removeClasses(element2, `${animationPrefix}\\S*`);
              },
              { self: true }
            );
            css(element2, "animationDuration", `${duration}ms`);
            addClass(element2, animation, animationPrefix + (out ? "leave" : "enter"));
            if (startsWith(animation, animationPrefix)) {
              origin && addClass(element2, `uk-transform-origin-${origin}`);
              out && addClass(element2, `${animationPrefix}reverse`);
            }
          })
        )
      );
    }
    const inProgressRe = new RegExp(`${animationPrefix}(enter|leave)`);
    const Animation = {
      in: animate,
      out(element, animation, duration, origin) {
        return animate(element, animation, duration, origin, true);
      },
      inProgress(element) {
        return inProgressRe.test(attr(element, "class"));
      },
      cancel(element) {
        trigger(element, "animationcanceled");
      }
    };

    const inBrowser = typeof window !== "undefined";
    const isRtl = inBrowser && document.dir === "rtl";
    const hasTouch = inBrowser && "ontouchstart" in window;
    const hasPointerEvents = inBrowser && window.PointerEvent;
    const pointerDown$1 = hasPointerEvents ? "pointerdown" : hasTouch ? "touchstart" : "mousedown";
    const pointerMove$1 = hasPointerEvents ? "pointermove" : hasTouch ? "touchmove" : "mousemove";
    const pointerUp$1 = hasPointerEvents ? "pointerup" : hasTouch ? "touchend" : "mouseup";
    const pointerEnter = hasPointerEvents ? "pointerenter" : hasTouch ? "" : "mouseenter";
    const pointerLeave = hasPointerEvents ? "pointerleave" : hasTouch ? "" : "mouseleave";
    const pointerCancel = hasPointerEvents ? "pointercancel" : "touchcancel";

    const fastdom = {
      reads: [],
      writes: [],
      read(task) {
        this.reads.push(task);
        scheduleFlush();
        return task;
      },
      write(task) {
        this.writes.push(task);
        scheduleFlush();
        return task;
      },
      clear(task) {
        remove(this.reads, task);
        remove(this.writes, task);
      },
      flush
    };
    function flush(recursion) {
      runTasks(fastdom.reads);
      runTasks(fastdom.writes.splice(0));
      fastdom.scheduled = false;
      if (fastdom.reads.length || fastdom.writes.length) {
        scheduleFlush(recursion + 1);
      }
    }
    const RECURSION_LIMIT = 4;
    function scheduleFlush(recursion) {
      if (fastdom.scheduled) {
        return;
      }
      fastdom.scheduled = true;
      if (recursion && recursion < RECURSION_LIMIT) {
        Promise.resolve().then(() => flush(recursion));
      } else {
        requestAnimationFrame(() => flush(1));
      }
    }
    function runTasks(tasks) {
      let task;
      while (task = tasks.shift()) {
        try {
          task();
        } catch (e) {
          console.error(e);
        }
      }
    }
    function remove(array, item) {
      const index = array.indexOf(item);
      return ~index && array.splice(index, 1);
    }

    function MouseTracker() {
    }
    MouseTracker.prototype = {
      positions: [],
      init() {
        this.positions = [];
        let position;
        this.unbind = on(document, "mousemove", (e) => position = getEventPos(e));
        this.interval = setInterval(() => {
          if (!position) {
            return;
          }
          this.positions.push(position);
          if (this.positions.length > 5) {
            this.positions.shift();
          }
        }, 50);
      },
      cancel() {
        var _a;
        (_a = this.unbind) == null ? void 0 : _a.call(this);
        clearInterval(this.interval);
      },
      movesTo(target) {
        if (this.positions.length < 2) {
          return false;
        }
        const p = target.getBoundingClientRect();
        const { left, right, top, bottom } = p;
        const [prevPosition] = this.positions;
        const position = last(this.positions);
        const path = [prevPosition, position];
        if (pointInRect(position, p)) {
          return false;
        }
        const diagonals = [
          [
            { x: left, y: top },
            { x: right, y: bottom }
          ],
          [
            { x: left, y: bottom },
            { x: right, y: top }
          ]
        ];
        return diagonals.some((diagonal) => {
          const intersection = intersect(path, diagonal);
          return intersection && pointInRect(intersection, p);
        });
      }
    };
    function intersect([{ x: x1, y: y1 }, { x: x2, y: y2 }], [{ x: x3, y: y3 }, { x: x4, y: y4 }]) {
      const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
      if (denominator === 0) {
        return false;
      }
      const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
      if (ua < 0) {
        return false;
      }
      return { x: x1 + ua * (x2 - x1), y: y1 + ua * (y2 - y1) };
    }

    function observeIntersection(targets, cb, options = {}, intersecting = true) {
      const observer = new IntersectionObserver(
        intersecting ? (entries, observer2) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            cb(entries, observer2);
          }
        } : cb,
        options
      );
      for (const el of toNodes(targets)) {
        observer.observe(el);
      }
      return observer;
    }
    const hasResizeObserver = inBrowser && window.ResizeObserver;
    function observeResize(targets, cb, options = { box: "border-box" }) {
      if (hasResizeObserver) {
        return observe$1(ResizeObserver, targets, cb, options);
      }
      initResizeListener();
      listeners.add(cb);
      return {
        observe: noop,
        unobserve: noop,
        disconnect() {
          listeners.delete(cb);
        }
      };
    }
    let listeners;
    function initResizeListener() {
      if (listeners) {
        return;
      }
      listeners = /* @__PURE__ */ new Set();
      let pendingResize;
      const handleResize = () => {
        if (pendingResize) {
          return;
        }
        pendingResize = true;
        requestAnimationFrame(() => pendingResize = false);
        for (const listener of listeners) {
          listener();
        }
      };
      on(window, "load resize", handleResize);
      on(document, "loadedmetadata load", handleResize, true);
    }
    function observeMutation(targets, cb, options) {
      return observe$1(MutationObserver, targets, cb, options);
    }
    function observe$1(Observer, targets, cb, options) {
      const observer = new Observer(cb);
      for (const el of toNodes(targets)) {
        observer.observe(el, options);
      }
      return observer;
    }

    function play(el) {
      if (isIFrame(el)) {
        call(el, { func: "playVideo", method: "play" });
      }
      if (isHTML5(el)) {
        try {
          el.play().catch(noop);
        } catch (e) {
        }
      }
    }
    function pause(el) {
      if (isIFrame(el)) {
        call(el, { func: "pauseVideo", method: "pause" });
      }
      if (isHTML5(el)) {
        el.pause();
      }
    }
    function mute(el) {
      if (isIFrame(el)) {
        call(el, { func: "mute", method: "setVolume", value: 0 });
      }
      if (isHTML5(el)) {
        el.muted = true;
      }
    }
    function isVideo(el) {
      return isHTML5(el) || isIFrame(el);
    }
    function isHTML5(el) {
      return isTag(el, "video");
    }
    function isIFrame(el) {
      return isTag(el, "iframe") && (isYoutube(el) || isVimeo(el));
    }
    function isYoutube(el) {
      return !!el.src.match(
        /\/\/.*?youtube(-nocookie)?\.[a-z]+\/(watch\?v=[^&\s]+|embed)|youtu\.be\/.*/
      );
    }
    function isVimeo(el) {
      return !!el.src.match(/vimeo\.com\/video\/.*/);
    }
    async function call(el, cmd) {
      await enableApi(el);
      post(el, cmd);
    }
    function post(el, cmd) {
      try {
        el.contentWindow.postMessage(JSON.stringify({ event: "command", ...cmd }), "*");
      } catch (e) {
      }
    }
    const stateKey = "_ukPlayer";
    let counter = 0;
    function enableApi(el) {
      if (el[stateKey]) {
        return el[stateKey];
      }
      const youtube = isYoutube(el);
      const vimeo = isVimeo(el);
      const id = ++counter;
      let poller;
      return el[stateKey] = new Promise((resolve) => {
        youtube && once(el, "load", () => {
          const listener = () => post(el, { event: "listening", id });
          poller = setInterval(listener, 100);
          listener();
        });
        once(window, "message", resolve, false, ({ data }) => {
          try {
            data = JSON.parse(data);
            return youtube && (data == null ? void 0 : data.id) === id && data.event === "onReady" || vimeo && Number(data == null ? void 0 : data.player_id) === id;
          } catch (e) {
          }
        });
        el.src = `${el.src}${includes(el.src, "?") ? "&" : "?"}${youtube ? "enablejsapi=1" : `api=1&player_id=${id}`}`;
      }).then(() => clearInterval(poller));
    }

    const dirs = [
      ["width", "x", "left", "right"],
      ["height", "y", "top", "bottom"]
    ];
    function positionAt(element, target, options) {
      options = {
        attach: {
          element: ["left", "top"],
          target: ["left", "top"],
          ...options.attach
        },
        offset: [0, 0],
        placement: [],
        ...options
      };
      if (!isArray(target)) {
        target = [target, target];
      }
      offset(element, getPosition(element, target, options));
    }
    function getPosition(element, target, options) {
      const position = attachTo(element, target, options);
      const { boundary, viewportOffset = 0, placement } = options;
      let offsetPosition = position;
      for (const [i, [prop, , start, end]] of Object.entries(dirs)) {
        const viewport = getViewport(element, target[i], viewportOffset, boundary, i);
        if (isWithin(position, viewport, i)) {
          continue;
        }
        let offsetBy = 0;
        if (placement[i] === "flip") {
          const attach = options.attach.target[i];
          if (attach === end && position[end] <= viewport[end] || attach === start && position[start] >= viewport[start]) {
            continue;
          }
          offsetBy = flip(element, target, options, i)[start] - position[start];
          const scrollArea = getScrollArea(element, target[i], viewportOffset, i);
          if (!isWithin(applyOffset(position, offsetBy, i), scrollArea, i)) {
            if (isWithin(position, scrollArea, i)) {
              continue;
            }
            if (options.recursion) {
              return false;
            }
            const newPos = flipAxis(element, target, options);
            if (newPos && isWithin(newPos, scrollArea, 1 - i)) {
              return newPos;
            }
            continue;
          }
        } else if (placement[i] === "shift") {
          const targetDim = offset(target[i]);
          const { offset: elOffset } = options;
          offsetBy = clamp(
            clamp(position[start], viewport[start], viewport[end] - position[prop]),
            targetDim[start] - position[prop] + elOffset[i],
            targetDim[end] - elOffset[i]
          ) - position[start];
        }
        offsetPosition = applyOffset(offsetPosition, offsetBy, i);
      }
      return offsetPosition;
    }
    function attachTo(element, target, options) {
      let { attach, offset: offsetBy } = {
        attach: {
          element: ["left", "top"],
          target: ["left", "top"],
          ...options.attach
        },
        offset: [0, 0],
        ...options
      };
      let elOffset = offset(element);
      for (const [i, [prop, , start, end]] of Object.entries(dirs)) {
        const targetOffset = attach.target[i] === attach.element[i] ? offsetViewport(target[i]) : offset(target[i]);
        elOffset = applyOffset(
          elOffset,
          targetOffset[start] - elOffset[start] + moveBy(attach.target[i], end, targetOffset[prop]) - moveBy(attach.element[i], end, elOffset[prop]) + +offsetBy[i],
          i
        );
      }
      return elOffset;
    }
    function applyOffset(position, offset2, i) {
      const [, dir, start, end] = dirs[i];
      const newPos = { ...position };
      newPos[start] = position[dir] = position[start] + offset2;
      newPos[end] += offset2;
      return newPos;
    }
    function moveBy(attach, end, dim) {
      return attach === "center" ? dim / 2 : attach === end ? dim : 0;
    }
    function getViewport(element, target, viewportOffset, boundary, i) {
      let viewport = getIntersectionArea(...commonScrollParents(element, target).map(offsetViewport));
      if (viewportOffset) {
        viewport[dirs[i][2]] += viewportOffset;
        viewport[dirs[i][3]] -= viewportOffset;
      }
      if (boundary) {
        viewport = getIntersectionArea(
          viewport,
          offset(isArray(boundary) ? boundary[i] : boundary)
        );
      }
      return viewport;
    }
    function getScrollArea(element, target, viewportOffset, i) {
      const [prop, axis, start, end] = dirs[i];
      const [scrollElement] = commonScrollParents(element, target);
      const viewport = offsetViewport(scrollElement);
      if (["auto", "scroll"].includes(css(scrollElement, `overflow-${axis}`))) {
        viewport[start] -= scrollElement[`scroll${ucfirst(start)}`];
        viewport[end] = viewport[start] + scrollElement[`scroll${ucfirst(prop)}`];
      }
      viewport[start] += viewportOffset;
      viewport[end] -= viewportOffset;
      return viewport;
    }
    function commonScrollParents(element, target) {
      return overflowParents(target).filter((parent) => within(element, parent));
    }
    function getIntersectionArea(...rects) {
      let area = {};
      for (const rect of rects) {
        for (const [, , start, end] of dirs) {
          area[start] = Math.max(area[start] || 0, rect[start]);
          area[end] = Math.min(...[area[end], rect[end]].filter(Boolean));
        }
      }
      return area;
    }
    function isWithin(positionA, positionB, i) {
      const [, , start, end] = dirs[i];
      return positionA[start] >= positionB[start] && positionA[end] <= positionB[end];
    }
    function flip(element, target, { offset: offset2, attach }, i) {
      return attachTo(element, target, {
        attach: {
          element: flipAttach(attach.element, i),
          target: flipAttach(attach.target, i)
        },
        offset: flipOffset(offset2, i)
      });
    }
    function flipAxis(element, target, options) {
      return getPosition(element, target, {
        ...options,
        attach: {
          element: options.attach.element.map(flipAttachAxis).reverse(),
          target: options.attach.target.map(flipAttachAxis).reverse()
        },
        offset: options.offset.reverse(),
        placement: options.placement.reverse(),
        recursion: true
      });
    }
    function flipAttach(attach, i) {
      const newAttach = [...attach];
      const index = dirs[i].indexOf(attach[i]);
      if (~index) {
        newAttach[i] = dirs[i][1 - index % 2 + 2];
      }
      return newAttach;
    }
    function flipAttachAxis(prop) {
      for (let i = 0; i < dirs.length; i++) {
        const index = dirs[i].indexOf(prop);
        if (~index) {
          return dirs[1 - i][index % 2 + 2];
        }
      }
    }
    function flipOffset(offset2, i) {
      offset2 = [...offset2];
      offset2[i] *= -1;
      return offset2;
    }

    var util = /*#__PURE__*/Object.freeze({
        __proto__: null,
        $: $,
        $$: $$,
        Animation: Animation,
        Deferred: Deferred,
        Dimensions: Dimensions,
        MouseTracker: MouseTracker,
        Transition: Transition,
        addClass: addClass,
        after: after,
        append: append,
        apply: apply$1,
        assign: assign,
        attr: attr,
        before: before,
        boxModelAdjust: boxModelAdjust,
        camelize: camelize,
        children: children,
        clamp: clamp,
        closest: closest,
        createEvent: createEvent,
        css: css,
        data: data,
        dimensions: dimensions,
        each: each,
        empty: empty,
        endsWith: endsWith,
        escape: escape,
        fastdom: fastdom,
        filter: filter,
        find: find,
        findAll: findAll,
        findIndex: findIndex,
        flipPosition: flipPosition,
        fragment: fragment,
        getEventPos: getEventPos,
        getIndex: getIndex,
        getTargetedElement: getTargetedElement,
        hasAttr: hasAttr,
        hasClass: hasClass,
        hasOwn: hasOwn,
        hasTouch: hasTouch,
        height: height,
        html: html,
        hyphenate: hyphenate,
        inBrowser: inBrowser,
        includes: includes,
        index: index,
        intersectRect: intersectRect,
        isArray: isArray,
        isBoolean: isBoolean,
        isDocument: isDocument,
        isElement: isElement,
        isEmpty: isEmpty,
        isEqual: isEqual,
        isFocusable: isFocusable,
        isFunction: isFunction,
        isInView: isInView,
        isInput: isInput,
        isNode: isNode,
        isNumber: isNumber,
        isNumeric: isNumeric,
        isObject: isObject,
        isPlainObject: isPlainObject,
        isRtl: isRtl,
        isSameSiteAnchor: isSameSiteAnchor,
        isString: isString,
        isTag: isTag,
        isTouch: isTouch,
        isUndefined: isUndefined,
        isVideo: isVideo,
        isVisible: isVisible,
        isVoidElement: isVoidElement,
        isWindow: isWindow,
        last: last,
        matches: matches,
        memoize: memoize,
        mute: mute,
        noop: noop,
        observeIntersection: observeIntersection,
        observeMutation: observeMutation,
        observeResize: observeResize,
        off: off,
        offset: offset,
        offsetPosition: offsetPosition,
        offsetViewport: offsetViewport,
        on: on,
        once: once,
        overflowParents: overflowParents,
        parent: parent,
        parents: parents,
        pause: pause,
        pick: pick,
        play: play,
        pointInRect: pointInRect,
        pointerCancel: pointerCancel,
        pointerDown: pointerDown$1,
        pointerEnter: pointerEnter,
        pointerLeave: pointerLeave,
        pointerMove: pointerMove$1,
        pointerUp: pointerUp$1,
        position: position,
        positionAt: positionAt,
        prepend: prepend,
        propName: propName,
        query: query,
        queryAll: queryAll,
        ready: ready,
        remove: remove$1,
        removeAttr: removeAttr,
        removeClass: removeClass,
        removeClasses: removeClasses,
        replaceClass: replaceClass,
        scrollIntoView: scrollIntoView,
        scrollParents: scrollParents,
        scrolledOver: scrolledOver,
        selFocusable: selFocusable,
        selInput: selInput,
        sortBy: sortBy,
        startsWith: startsWith,
        sumBy: sumBy,
        swap: swap,
        toArray: toArray,
        toBoolean: toBoolean,
        toEventTargets: toEventTargets,
        toFloat: toFloat,
        toNode: toNode,
        toNodes: toNodes,
        toNumber: toNumber,
        toPx: toPx,
        toWindow: toWindow,
        toggleClass: toggleClass,
        trigger: trigger,
        ucfirst: ucfirst,
        uniqueBy: uniqueBy,
        unwrap: unwrap,
        width: width,
        within: within,
        wrapAll: wrapAll,
        wrapInner: wrapInner
    });

    function initObservers(instance) {
      instance._observers = [];
      instance._observerUpdates = /* @__PURE__ */ new Map();
      for (const observer of instance.$options.observe || []) {
        if (hasOwn(observer, "handler")) {
          registerObservable(instance, observer);
        } else {
          for (const key in observer) {
            registerObservable(instance, observer[key], key);
          }
        }
      }
    }
    function registerObserver(instance, ...observer) {
      instance._observers.push(...observer);
    }
    function disconnectObservers(instance) {
      for (const observer of instance._observers) {
        observer == null ? void 0 : observer.disconnect();
        instance._observerUpdates.delete(observer);
      }
    }
    function callObserverUpdates(instance) {
      for (const [observer, update] of instance._observerUpdates) {
        update(observer);
      }
    }
    function registerObservable(instance, observable, key) {
      let {
        observe,
        target = instance.$el,
        handler,
        options,
        filter,
        args
      } = isPlainObject(observable) ? observable : { type: key, handler: observable };
      if (filter && !filter.call(instance, instance)) {
        return;
      }
      const targets = isFunction(target) ? target.call(instance, instance) : target;
      handler = isString(handler) ? instance[handler] : handler.bind(instance);
      if (isFunction(options)) {
        options = options.call(instance, instance);
      }
      const observer = observe(targets, handler, options, args);
      if (isFunction(target) && isArray(targets) && observer.unobserve) {
        instance._observerUpdates.set(observer, watchChange(instance, target, targets));
      }
      registerObserver(instance, observer);
    }
    function watchChange(instance, targetFn, targets) {
      return (observer) => {
        const newTargets = targetFn.call(instance, instance);
        if (isEqual(targets, newTargets)) {
          return;
        }
        targets.forEach((target) => !includes(newTargets, target) && observer.unobserve(target));
        newTargets.forEach((target) => !includes(targets, target) && observer.observe(target));
        targets.splice(0, targets.length, ...newTargets);
      };
    }

    function callWatches(instance) {
      if (instance._watch) {
        return;
      }
      const initial = !hasOwn(instance, "_watch");
      instance._watch = fastdom.read(() => {
        if (instance._connected) {
          runWatches(instance, initial);
        }
        instance._watch = null;
      });
    }
    function runWatches(instance, initial) {
      const values = { ...instance._computed };
      instance._computed = {};
      for (const [key, { watch, immediate }] of Object.entries(instance.$options.computed || {})) {
        if (watch && (initial && immediate || hasOwn(values, key) && !isEqual(values[key], instance[key]))) {
          watch.call(instance, instance[key], initial ? void 0 : values[key]);
        }
      }
      callObserverUpdates(instance);
    }

    function callUpdate(instance, e = "update") {
      if (!instance._connected) {
        return;
      }
      if (e === "update" || e === "resize") {
        callWatches(instance);
      }
      if (!instance.$options.update) {
        return;
      }
      if (!instance._updates) {
        instance._updates = /* @__PURE__ */ new Set();
        fastdom.read(() => {
          if (instance._connected) {
            runUpdates(instance, instance._updates);
          }
          delete instance._updates;
        });
      }
      instance._updates.add(e.type || e);
    }
    function runUpdates(instance, types) {
      for (const { read, write, events = [] } of instance.$options.update) {
        if (!types.has("update") && !events.some((type) => types.has(type))) {
          continue;
        }
        let result;
        if (read) {
          result = read.call(instance, instance._data, types);
          if (result && isPlainObject(result)) {
            assign(instance._data, result);
          }
        }
        if (write && result !== false) {
          fastdom.write(() => {
            if (instance._connected) {
              write.call(instance, instance._data, types);
            }
          });
        }
      }
    }
    function initUpdateObserver(instance) {
      let { el, computed, observe } = instance.$options;
      if (!computed && !(observe == null ? void 0 : observe.some((options) => isFunction(options.target)))) {
        return;
      }
      for (const key in computed || {}) {
        if (computed[key].document) {
          el = el.ownerDocument;
          break;
        }
      }
      const observer = new MutationObserver(() => callWatches(instance));
      observer.observe(el, {
        childList: true,
        subtree: true
      });
      registerObserver(instance, observer);
    }

    function initEvents(instance) {
      instance._events = [];
      for (const event of instance.$options.events || []) {
        if (hasOwn(event, "handler")) {
          registerEvent(instance, event);
        } else {
          for (const key in event) {
            registerEvent(instance, event[key], key);
          }
        }
      }
    }
    function unbindEvents(instance) {
      instance._events.forEach((unbind) => unbind());
      delete instance._events;
    }
    function registerEvent(instance, event, key) {
      let { name, el, handler, capture, passive, delegate, filter, self } = isPlainObject(event) ? event : { name: key, handler: event };
      el = isFunction(el) ? el.call(instance, instance) : el || instance.$el;
      if (isArray(el)) {
        el.forEach((el2) => registerEvent(instance, { ...event, el: el2 }, key));
        return;
      }
      if (!el || filter && !filter.call(instance)) {
        return;
      }
      instance._events.push(
        on(
          el,
          name,
          delegate ? isString(delegate) ? delegate : delegate.call(instance, instance) : null,
          isString(handler) ? instance[handler] : handler.bind(instance),
          { passive, capture, self }
        )
      );
    }

    const strats = {};
    strats.events = strats.observe = strats.created = strats.beforeConnect = strats.connected = strats.beforeDisconnect = strats.disconnected = strats.destroy = concatStrat;
    strats.args = function(parentVal, childVal) {
      return childVal !== false && concatStrat(childVal || parentVal);
    };
    strats.update = function(parentVal, childVal) {
      return sortBy(
        concatStrat(parentVal, isFunction(childVal) ? { read: childVal } : childVal),
        "order"
      );
    };
    strats.props = function(parentVal, childVal) {
      if (isArray(childVal)) {
        const value = {};
        for (const key of childVal) {
          value[key] = String;
        }
        childVal = value;
      }
      return strats.methods(parentVal, childVal);
    };
    strats.computed = strats.methods = function(parentVal, childVal) {
      return childVal ? parentVal ? { ...parentVal, ...childVal } : childVal : parentVal;
    };
    strats.i18n = strats.data = function(parentVal, childVal, vm) {
      if (!vm) {
        if (!childVal) {
          return parentVal;
        }
        if (!parentVal) {
          return childVal;
        }
        return function(vm2) {
          return mergeFnData(parentVal, childVal, vm2);
        };
      }
      return mergeFnData(parentVal, childVal, vm);
    };
    function mergeFnData(parentVal, childVal, vm) {
      return strats.computed(
        isFunction(parentVal) ? parentVal.call(vm, vm) : parentVal,
        isFunction(childVal) ? childVal.call(vm, vm) : childVal
      );
    }
    function concatStrat(parentVal, childVal) {
      parentVal = parentVal && !isArray(parentVal) ? [parentVal] : parentVal;
      return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
    }
    function defaultStrat(parentVal, childVal) {
      return isUndefined(childVal) ? parentVal : childVal;
    }
    function mergeOptions(parent, child, vm) {
      const options = {};
      if (isFunction(child)) {
        child = child.options;
      }
      if (child.extends) {
        parent = mergeOptions(parent, child.extends, vm);
      }
      if (child.mixins) {
        for (const mixin of child.mixins) {
          parent = mergeOptions(parent, mixin, vm);
        }
      }
      for (const key in parent) {
        mergeKey(key);
      }
      for (const key in child) {
        if (!hasOwn(parent, key)) {
          mergeKey(key);
        }
      }
      function mergeKey(key) {
        options[key] = (strats[key] || defaultStrat)(parent[key], child[key], vm);
      }
      return options;
    }
    function parseOptions(options, args = []) {
      try {
        return options ? startsWith(options, "{") ? JSON.parse(options) : args.length && !includes(options, ":") ? { [args[0]]: options } : options.split(";").reduce((options2, option) => {
          const [key, value] = option.split(/:(.*)/);
          if (key && !isUndefined(value)) {
            options2[key.trim()] = value.trim();
          }
          return options2;
        }, {}) : {};
      } catch (e) {
        return {};
      }
    }
    function coerce(type, value) {
      if (type === Boolean) {
        return toBoolean(value);
      } else if (type === Number) {
        return toNumber(value);
      } else if (type === "list") {
        return toList(value);
      } else if (type === Object && isString(value)) {
        return parseOptions(value);
      }
      return type ? type(value) : value;
    }
    function toList(value) {
      return isArray(value) ? value : isString(value) ? value.split(/,(?![^(]*\))/).map((value2) => isNumeric(value2) ? toNumber(value2) : toBoolean(value2.trim())) : [value];
    }

    function initProps(instance) {
      const props = getProps(instance.$options);
      for (let key in props) {
        if (!isUndefined(props[key])) {
          instance.$props[key] = props[key];
        }
      }
      const exclude = [instance.$options.computed, instance.$options.methods];
      for (let key in instance.$props) {
        if (key in props && notIn(exclude, key)) {
          instance[key] = instance.$props[key];
        }
      }
    }
    function getProps(opts) {
      const data$1 = {};
      const { args = [], props = {}, el, id } = opts;
      if (!props) {
        return data$1;
      }
      for (const key in props) {
        const prop = hyphenate(key);
        let value = data(el, prop);
        if (isUndefined(value)) {
          continue;
        }
        value = props[key] === Boolean && value === "" ? true : coerce(props[key], value);
        if (prop === "target" && startsWith(value, "_")) {
          continue;
        }
        data$1[key] = value;
      }
      const options = parseOptions(data(el, id), args);
      for (const key in options) {
        const prop = camelize(key);
        if (!isUndefined(props[prop])) {
          data$1[prop] = coerce(props[prop], options[key]);
        }
      }
      return data$1;
    }
    function notIn(options, key) {
      return options.every((arr) => !arr || !hasOwn(arr, key));
    }
    function initPropsObserver(instance) {
      const { $options, $props } = instance;
      const { id, attrs, props, el } = $options;
      if (!props || attrs === false) {
        return;
      }
      const attributes = isArray(attrs) ? attrs : Object.keys(props);
      const filter = attributes.map((key) => hyphenate(key)).concat(id);
      const observer = new MutationObserver((records) => {
        const data = getProps($options);
        if (records.some(({ attributeName }) => {
          const prop = attributeName.replace("data-", "");
          return (prop === id ? attributes : [camelize(prop), camelize(attributeName)]).some(
            (prop2) => !isUndefined(data[prop2]) && data[prop2] !== $props[prop2]
          );
        })) {
          instance.$reset();
        }
      });
      observer.observe(el, {
        attributes: true,
        attributeFilter: filter.concat(filter.map((key) => `data-${key}`))
      });
      registerObserver(instance, observer);
    }

    function callHook(instance, hook) {
      var _a;
      (_a = instance.$options[hook]) == null ? void 0 : _a.forEach((handler) => handler.call(instance));
    }
    function callConnected(instance) {
      if (instance._connected) {
        return;
      }
      instance._data = {};
      instance._computed = {};
      initProps(instance);
      callHook(instance, "beforeConnect");
      instance._connected = true;
      initEvents(instance);
      initObservers(instance);
      initPropsObserver(instance);
      initUpdateObserver(instance);
      callHook(instance, "connected");
      callUpdate(instance);
    }
    function callDisconnected(instance) {
      if (!instance._connected) {
        return;
      }
      callHook(instance, "beforeDisconnect");
      disconnectObservers(instance);
      unbindEvents(instance);
      callHook(instance, "disconnected");
      instance._connected = false;
      delete instance._watch;
    }

    function initComputed(instance) {
      const { computed } = instance.$options;
      instance._computed = {};
      if (computed) {
        for (const key in computed) {
          registerComputed(instance, key, computed[key]);
        }
      }
    }
    function registerComputed(instance, key, cb) {
      Object.defineProperty(instance, key, {
        enumerable: true,
        get() {
          const { _computed, $props, $el } = instance;
          if (!hasOwn(_computed, key)) {
            _computed[key] = (cb.get || cb).call(instance, $props, $el);
          }
          return _computed[key];
        },
        set(value) {
          const { _computed } = instance;
          _computed[key] = cb.set ? cb.set.call(instance, value) : value;
          if (isUndefined(_computed[key])) {
            delete _computed[key];
          }
        }
      });
    }

    let uid = 0;
    function init(instance, options = {}) {
      options.data = normalizeData(options, instance.constructor.options);
      instance.$options = mergeOptions(instance.constructor.options, options, instance);
      instance.$props = {};
      instance._uid = uid++;
      initData(instance);
      initMethods(instance);
      initComputed(instance);
      callHook(instance, "created");
      if (options.el) {
        instance.$mount(options.el);
      }
    }
    function initData(instance) {
      const { data = {} } = instance.$options;
      for (const key in data) {
        instance.$props[key] = instance[key] = data[key];
      }
    }
    function initMethods(instance) {
      const { methods } = instance.$options;
      if (methods) {
        for (const key in methods) {
          instance[key] = methods[key].bind(instance);
        }
      }
    }
    function normalizeData({ data = {} }, { args = [], props = {} }) {
      if (isArray(data)) {
        data = data.slice(0, args.length).reduce((data2, value, index) => {
          if (isPlainObject(value)) {
            assign(data2, value);
          } else {
            data2[args[index]] = value;
          }
          return data2;
        }, {});
      }
      for (const key in data) {
        if (isUndefined(data[key])) {
          delete data[key];
        } else if (props[key]) {
          data[key] = coerce(props[key], data[key]);
        }
      }
      return data;
    }

    const App = function(options) {
      init(this, options);
    };
    App.util = util;
    App.options = {};
    App.version = "3.16.6";

    const PREFIX = "uk-";
    const DATA = "__uikit__";
    const components = {};
    function component(name, options) {
      var _a;
      const id = PREFIX + hyphenate(name);
      if (!options) {
        if (isPlainObject(components[id])) {
          components[id] = App.extend(components[id]);
        }
        return components[id];
      }
      name = camelize(name);
      App[name] = (element, data) => createComponent(name, element, data);
      const opt = isPlainObject(options) ? { ...options } : options.options;
      opt.id = id;
      opt.name = name;
      (_a = opt.install) == null ? void 0 : _a.call(opt, App, opt, name);
      if (App._initialized && !opt.functional) {
        requestAnimationFrame(() => createComponent(name, `[${id}],[data-${id}]`));
      }
      return components[id] = opt;
    }
    function createComponent(name, element, data, ...args) {
      const Component = component(name);
      return Component.options.functional ? new Component({ data: isPlainObject(element) ? element : [element, data, ...args] }) : element ? $$(element).map(init)[0] : init();
      function init(element2) {
        const instance = getComponent(element2, name);
        if (instance) {
          if (data) {
            instance.$destroy();
          } else {
            return instance;
          }
        }
        return new Component({ el: element2, data });
      }
    }
    function getComponents(element) {
      return (element == null ? void 0 : element[DATA]) || {};
    }
    function getComponent(element, name) {
      return getComponents(element)[name];
    }
    function attachToElement(element, instance) {
      if (!element[DATA]) {
        element[DATA] = {};
      }
      element[DATA][instance.$options.name] = instance;
    }
    function detachFromElement(element, instance) {
      var _a;
      (_a = element[DATA]) == null ? true : delete _a[instance.$options.name];
      if (!isEmpty(element[DATA])) {
        delete element[DATA];
      }
    }

    App.component = component;
    App.getComponents = getComponents;
    App.getComponent = getComponent;
    App.use = function(plugin) {
      if (plugin.installed) {
        return;
      }
      plugin.call(null, this);
      plugin.installed = true;
      return this;
    };
    App.mixin = function(mixin, component2) {
      component2 = (isString(component2) ? this.component(component2) : component2) || this;
      component2.options = mergeOptions(component2.options, mixin);
    };
    App.extend = function(options) {
      options = options || {};
      const Super = this;
      const Sub = function UIkitComponent(options2) {
        init(this, options2);
      };
      Sub.prototype = Object.create(Super.prototype);
      Sub.prototype.constructor = Sub;
      Sub.options = mergeOptions(Super.options, options);
      Sub.super = Super;
      Sub.extend = Super.extend;
      return Sub;
    };
    function update(element, e) {
      element = element ? toNode(element) : document.body;
      for (const parentEl of parents(element).reverse()) {
        updateElement(parentEl, e);
      }
      apply$1(element, (element2) => updateElement(element2, e));
    }
    App.update = update;
    function updateElement(element, e) {
      const components = getComponents(element);
      for (const name in components) {
        callUpdate(components[name], e);
      }
    }
    let container;
    Object.defineProperty(App, "container", {
      get() {
        return container || document.body;
      },
      set(element) {
        container = $(element);
      }
    });

    App.prototype.$mount = function(el) {
      const instance = this;
      attachToElement(el, instance);
      instance.$options.el = el;
      if (within(el, document)) {
        callConnected(instance);
      }
    };
    App.prototype.$destroy = function(removeEl = false) {
      const instance = this;
      const { el } = instance.$options;
      if (el) {
        callDisconnected(instance);
      }
      callHook(instance, "destroy");
      detachFromElement(el, instance);
      if (removeEl) {
        remove$1(instance.$el);
      }
    };
    App.prototype.$create = createComponent;
    App.prototype.$emit = function(e) {
      callUpdate(this, e);
    };
    App.prototype.$update = function(element = this.$el, e) {
      update(element, e);
    };
    App.prototype.$reset = function() {
      callDisconnected(this);
      callConnected(this);
    };
    App.prototype.$getComponent = getComponent;
    Object.defineProperties(App.prototype, {
      $el: {
        get() {
          return this.$options.el;
        }
      },
      $container: Object.getOwnPropertyDescriptor(App, "container")
    });
    function generateId(instance, el = instance.$el, postfix = "") {
      if (el.id) {
        return el.id;
      }
      let id = `${instance.$options.id}-${instance._uid}${postfix}`;
      if ($(`#${id}`)) {
        id = generateId(instance, el, `${postfix}-2`);
      }
      return id;
    }

    var SliderNav = {
      i18n: {
        next: "Next slide",
        previous: "Previous slide",
        slideX: "Slide %s",
        slideLabel: "%s of %s"
      },
      data: {
        selNav: false
      },
      computed: {
        nav: {
          get({ selNav }, $el) {
            return uikitUtil.$(selNav, $el);
          },
          watch(nav, prev) {
            uikitUtil.attr(nav, "role", "tablist");
            if (prev) {
              this.$emit();
            }
          },
          immediate: true
        },
        selNavItem({ attrItem }) {
          return `[${attrItem}],[data-${attrItem}]`;
        },
        navItems: {
          get(_, $el) {
            return uikitUtil.$$(this.selNavItem, $el);
          },
          watch() {
            this.$emit();
          }
        }
      },
      connected() {
        uikitUtil.attr(this.$el, "aria-roledescription", "carousel");
      },
      update: [
        {
          write() {
            this.slides.forEach(
              (slide, i) => uikitUtil.attr(slide, {
                role: this.nav ? "tabpanel" : "group",
                "aria-label": this.t("slideLabel", i + 1, this.length),
                "aria-roledescription": this.nav ? null : "slide"
              })
            );
            if (this.nav && this.length !== this.nav.children.length) {
              uikitUtil.html(
                this.nav,
                this.slides.map((_, i) => `<li ${this.attrItem}="${i}"><a href></a></li>`).join("")
              );
            }
            uikitUtil.attr(uikitUtil.children(this.nav).concat(this.list), "role", "presentation");
            for (const el of this.navItems) {
              const cmd = uikitUtil.data(el, this.attrItem);
              const button = uikitUtil.$("a,button", el) || el;
              let ariaLabel;
              let ariaControls = null;
              if (uikitUtil.isNumeric(cmd)) {
                const item = uikitUtil.toNumber(cmd);
                const slide = this.slides[item];
                if (slide) {
                  if (!slide.id) {
                    slide.id = generateId(this, slide, `-item-${cmd}`);
                  }
                  ariaControls = slide.id;
                }
                ariaLabel = this.t("slideX", uikitUtil.toFloat(cmd) + 1);
                uikitUtil.attr(button, "role", "tab");
              } else {
                if (this.list) {
                  if (!this.list.id) {
                    this.list.id = generateId(this, this.list, "-items");
                  }
                  ariaControls = this.list.id;
                }
                ariaLabel = this.t(cmd);
              }
              uikitUtil.attr(button, {
                "aria-controls": ariaControls,
                "aria-label": uikitUtil.attr(button, "aria-label") || ariaLabel
              });
            }
          }
        },
        {
          write() {
            this.navItems.concat(this.nav).forEach((el) => el && (el.hidden = !this.maxIndex));
            this.updateNav();
          },
          events: ["resize"]
        }
      ],
      events: [
        {
          name: "click keydown",
          delegate() {
            return this.selNavItem;
          },
          handler(e) {
            if (uikitUtil.closest(e.target, "a,button") && (e.type === "click" || e.keyCode === keyMap.SPACE)) {
              e.preventDefault();
              this.show(uikitUtil.data(e.current, this.attrItem));
            }
          }
        },
        {
          name: "itemshow",
          handler: "updateNav"
        },
        {
          name: "keydown",
          delegate() {
            return this.selNavItem;
          },
          handler(e) {
            const { current, keyCode } = e;
            const cmd = uikitUtil.data(current, this.attrItem);
            if (!uikitUtil.isNumeric(cmd)) {
              return;
            }
            let i = keyCode === keyMap.HOME ? 0 : keyCode === keyMap.END ? "last" : keyCode === keyMap.LEFT ? "previous" : keyCode === keyMap.RIGHT ? "next" : -1;
            if (~i) {
              e.preventDefault();
              this.show(i);
            }
          }
        }
      ],
      methods: {
        updateNav() {
          const index = this.getValidIndex();
          let focus;
          let focusEl;
          for (const el of this.navItems) {
            const cmd = uikitUtil.data(el, this.attrItem);
            const button = uikitUtil.$("a,button", el) || el;
            if (uikitUtil.isNumeric(cmd)) {
              const item = uikitUtil.toNumber(cmd);
              const active = item === index;
              uikitUtil.toggleClass(el, this.clsActive, active);
              uikitUtil.attr(button, {
                "aria-selected": active,
                tabindex: active ? null : -1
              });
              if (active) {
                focusEl = button;
              }
              focus = focus || uikitUtil.matches(button, ":focus");
            } else {
              uikitUtil.toggleClass(
                el,
                "uk-invisible",
                this.finite && (cmd === "previous" && index === 0 || cmd === "next" && index >= this.maxIndex)
              );
            }
            if (focus && focusEl) {
              focusEl.focus();
            }
          }
        }
      }
    };

    const pointerOptions = { passive: false, capture: true };
    const pointerUpOptions = { passive: true, capture: true };
    const pointerDown = "touchstart mousedown";
    const pointerMove = "touchmove mousemove";
    const pointerUp = "touchend touchcancel mouseup click input scroll";
    var SliderDrag = {
      props: {
        draggable: Boolean
      },
      data: {
        draggable: true,
        threshold: 10
      },
      created() {
        for (const key of ["start", "move", "end"]) {
          const fn = this[key];
          this[key] = (e) => {
            const pos = uikitUtil.getEventPos(e).x * (uikitUtil.isRtl ? -1 : 1);
            this.prevPos = pos === this.pos ? this.prevPos : this.pos;
            this.pos = pos;
            fn(e);
          };
        }
      },
      events: [
        {
          name: pointerDown,
          passive: true,
          delegate() {
            return `${this.selList} > *`;
          },
          handler(e) {
            if (!this.draggable || !uikitUtil.isTouch(e) && hasSelectableText(e.target) || uikitUtil.closest(e.target, uikitUtil.selInput) || e.button > 0 || this.length < 2) {
              return;
            }
            this.start(e);
          }
        },
        {
          name: "dragstart",
          handler(e) {
            e.preventDefault();
          }
        },
        {
          // iOS workaround for slider stopping if swiping fast
          name: pointerMove,
          el() {
            return this.list;
          },
          handler: uikitUtil.noop,
          ...pointerOptions
        }
      ],
      methods: {
        start() {
          this.drag = this.pos;
          if (this._transitioner) {
            this.percent = this._transitioner.percent();
            this.drag += this._transitioner.getDistance() * this.percent * this.dir;
            this._transitioner.cancel();
            this._transitioner.translate(this.percent);
            this.dragging = true;
            this.stack = [];
          } else {
            this.prevIndex = this.index;
          }
          uikitUtil.on(document, pointerMove, this.move, pointerOptions);
          uikitUtil.on(document, pointerUp, this.end, pointerUpOptions);
          uikitUtil.css(this.list, "userSelect", "none");
        },
        move(e) {
          const distance = this.pos - this.drag;
          if (distance === 0 || this.prevPos === this.pos || !this.dragging && Math.abs(distance) < this.threshold) {
            return;
          }
          uikitUtil.css(this.list, "pointerEvents", "none");
          e.cancelable && e.preventDefault();
          this.dragging = true;
          this.dir = distance < 0 ? 1 : -1;
          const { slides } = this;
          let { prevIndex } = this;
          let dis = Math.abs(distance);
          let nextIndex = this.getIndex(prevIndex + this.dir, prevIndex);
          let width = this._getDistance(prevIndex, nextIndex) || slides[prevIndex].offsetWidth;
          while (nextIndex !== prevIndex && dis > width) {
            this.drag -= width * this.dir;
            prevIndex = nextIndex;
            dis -= width;
            nextIndex = this.getIndex(prevIndex + this.dir, prevIndex);
            width = this._getDistance(prevIndex, nextIndex) || slides[prevIndex].offsetWidth;
          }
          this.percent = dis / width;
          const prev = slides[prevIndex];
          const next = slides[nextIndex];
          const changed = this.index !== nextIndex;
          const edge = prevIndex === nextIndex;
          let itemShown;
          [this.index, this.prevIndex].filter((i) => !uikitUtil.includes([nextIndex, prevIndex], i)).forEach((i) => {
            uikitUtil.trigger(slides[i], "itemhidden", [this]);
            if (edge) {
              itemShown = true;
              this.prevIndex = prevIndex;
            }
          });
          if (this.index === prevIndex && this.prevIndex !== prevIndex || itemShown) {
            uikitUtil.trigger(slides[this.index], "itemshown", [this]);
          }
          if (changed) {
            this.prevIndex = prevIndex;
            this.index = nextIndex;
            !edge && uikitUtil.trigger(prev, "beforeitemhide", [this]);
            uikitUtil.trigger(next, "beforeitemshow", [this]);
          }
          this._transitioner = this._translate(Math.abs(this.percent), prev, !edge && next);
          if (changed) {
            !edge && uikitUtil.trigger(prev, "itemhide", [this]);
            uikitUtil.trigger(next, "itemshow", [this]);
          }
        },
        end() {
          uikitUtil.off(document, pointerMove, this.move, pointerOptions);
          uikitUtil.off(document, pointerUp, this.end, pointerUpOptions);
          if (this.dragging) {
            this.dragging = null;
            if (this.index === this.prevIndex) {
              this.percent = 1 - this.percent;
              this.dir *= -1;
              this._show(false, this.index, true);
              this._transitioner = null;
            } else {
              const dirChange = (uikitUtil.isRtl ? this.dir * (uikitUtil.isRtl ? 1 : -1) : this.dir) < 0 === this.prevPos > this.pos;
              this.index = dirChange ? this.index : this.prevIndex;
              if (dirChange) {
                this.percent = 1 - this.percent;
              }
              this.show(
                this.dir > 0 && !dirChange || this.dir < 0 && dirChange ? "next" : "previous",
                true
              );
            }
          }
          uikitUtil.css(this.list, { userSelect: "", pointerEvents: "" });
          this.drag = this.percent = null;
        }
      }
    };
    function hasSelectableText(el) {
      return uikitUtil.css(el, "userSelect") !== "none" && uikitUtil.toNodes(el.childNodes).some((el2) => el2.nodeType === 3 && el2.textContent.trim());
    }

    var SliderAutoplay = {
      props: {
        autoplay: Boolean,
        autoplayInterval: Number,
        pauseOnHover: Boolean
      },
      data: {
        autoplay: false,
        autoplayInterval: 7e3,
        pauseOnHover: true
      },
      connected() {
        uikitUtil.attr(this.list, "aria-live", "polite");
        this.autoplay && this.startAutoplay();
      },
      disconnected() {
        this.stopAutoplay();
      },
      update() {
        uikitUtil.attr(this.slides, "tabindex", "-1");
      },
      events: [
        {
          name: "visibilitychange",
          el() {
            return document;
          },
          filter() {
            return this.autoplay;
          },
          handler() {
            if (document.hidden) {
              this.stopAutoplay();
            } else {
              this.startAutoplay();
            }
          }
        },
        {
          name: `${uikitUtil.pointerEnter} focusin`,
          filter() {
            return this.autoplay;
          },
          handler(e) {
            if (e.type !== uikitUtil.pointerEnter || this.pauseOnHover) {
              this.stopAutoplay();
            }
          }
        },
        {
          name: `${uikitUtil.pointerLeave} focusout`,
          filter() {
            return this.autoplay;
          },
          handler(e) {
            if (e.type !== uikitUtil.pointerLeave || this.pauseOnHover) {
              this.startAutoplay();
            }
          }
        }
      ],
      methods: {
        startAutoplay() {
          if (this.draggable && uikitUtil.matches(this.$el, ":focus-within") || this.pauseOnHover && uikitUtil.matches(this.$el, ":hover")) {
            return;
          }
          this.stopAutoplay();
          this.interval = setInterval(
            () => !this.stack.length && this.show("next"),
            this.autoplayInterval
          );
          uikitUtil.attr(this.list, "aria-live", "off");
        },
        stopAutoplay() {
          clearInterval(this.interval);
          uikitUtil.attr(this.list, "aria-live", "polite");
        }
      }
    };

    function resize(options) {
      return observe(observeResize, options, "resize");
    }
    function observe(observe2, options, emit) {
      return {
        observe: observe2,
        handler() {
          this.$emit(emit);
        },
        ...options
      };
    }

    var Slider = {
      mixins: [SliderAutoplay, SliderDrag, SliderNav, I18n],
      props: {
        clsActivated: Boolean,
        easing: String,
        index: Number,
        finite: Boolean,
        velocity: Number
      },
      data: () => ({
        easing: "ease",
        finite: false,
        velocity: 1,
        index: 0,
        prevIndex: -1,
        stack: [],
        percent: 0,
        clsActive: "uk-active",
        clsActivated: false,
        Transitioner: false,
        transitionOptions: {}
      }),
      connected() {
        this.prevIndex = -1;
        this.index = this.getValidIndex(this.$props.index);
        this.stack = [];
      },
      disconnected() {
        uikitUtil.removeClass(this.slides, this.clsActive);
      },
      computed: {
        duration({ velocity }, $el) {
          return speedUp($el.offsetWidth / velocity);
        },
        list({ selList }, $el) {
          return uikitUtil.$(selList, $el);
        },
        maxIndex() {
          return this.length - 1;
        },
        slides: {
          get() {
            return uikitUtil.children(this.list);
          },
          watch() {
            this.$emit();
          }
        },
        length() {
          return this.slides.length;
        }
      },
      observe: resize(),
      methods: {
        show(index, force = false) {
          var _a;
          if (this.dragging || !this.length) {
            return;
          }
          const { stack } = this;
          const queueIndex = force ? 0 : stack.length;
          const reset = () => {
            stack.splice(queueIndex, 1);
            if (stack.length) {
              this.show(stack.shift(), true);
            }
          };
          stack[force ? "unshift" : "push"](index);
          if (!force && stack.length > 1) {
            if (stack.length === 2) {
              (_a = this._transitioner) == null ? void 0 : _a.forward(Math.min(this.duration, 200));
            }
            return;
          }
          const prevIndex = this.getIndex(this.index);
          const prev = uikitUtil.hasClass(this.slides, this.clsActive) && this.slides[prevIndex];
          const nextIndex = this.getIndex(index, this.index);
          const next = this.slides[nextIndex];
          if (prev === next) {
            reset();
            return;
          }
          this.dir = getDirection(index, prevIndex);
          this.prevIndex = prevIndex;
          this.index = nextIndex;
          if (prev && !uikitUtil.trigger(prev, "beforeitemhide", [this]) || !uikitUtil.trigger(next, "beforeitemshow", [this, prev])) {
            this.index = this.prevIndex;
            reset();
            return;
          }
          const promise = this._show(prev, next, force).then(() => {
            prev && uikitUtil.trigger(prev, "itemhidden", [this]);
            uikitUtil.trigger(next, "itemshown", [this]);
            stack.shift();
            this._transitioner = null;
            requestAnimationFrame(() => stack.length && this.show(stack.shift(), true));
          });
          prev && uikitUtil.trigger(prev, "itemhide", [this]);
          uikitUtil.trigger(next, "itemshow", [this]);
          return promise;
        },
        getIndex(index = this.index, prev = this.index) {
          return uikitUtil.clamp(
            uikitUtil.getIndex(index, this.slides, prev, this.finite),
            0,
            Math.max(0, this.maxIndex)
          );
        },
        getValidIndex(index = this.index, prevIndex = this.prevIndex) {
          return this.getIndex(index, prevIndex);
        },
        _show(prev, next, force) {
          this._transitioner = this._getTransitioner(prev, next, this.dir, {
            easing: force ? next.offsetWidth < 600 ? "cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "cubic-bezier(0.165, 0.84, 0.44, 1)" : this.easing,
            ...this.transitionOptions
          });
          if (!force && !prev) {
            this._translate(1);
            return Promise.resolve();
          }
          const { length } = this.stack;
          return this._transitioner[length > 1 ? "forward" : "show"](
            length > 1 ? Math.min(this.duration, 75 + 75 / (length - 1)) : this.duration,
            this.percent
          );
        },
        _getDistance(prev, next) {
          return this._getTransitioner(prev, prev !== next && next).getDistance();
        },
        _translate(percent, prev = this.prevIndex, next = this.index) {
          const transitioner = this._getTransitioner(prev === next ? false : prev, next);
          transitioner.translate(percent);
          return transitioner;
        },
        _getTransitioner(prev = this.prevIndex, next = this.index, dir = this.dir || 1, options = this.transitionOptions) {
          return new this.Transitioner(
            uikitUtil.isNumber(prev) ? this.slides[prev] : prev,
            uikitUtil.isNumber(next) ? this.slides[next] : next,
            dir * (uikitUtil.isRtl ? -1 : 1),
            options
          );
        }
      }
    };
    function getDirection(index, prevIndex) {
      return index === "next" ? 1 : index === "previous" ? -1 : index < prevIndex ? -1 : 1;
    }
    function speedUp(x) {
      return 0.5 * x + 300;
    }

    var Slideshow = {
      mixins: [Slider],
      props: {
        animation: String
      },
      data: {
        animation: "slide",
        clsActivated: "uk-transition-active",
        Animations: Animations$1,
        Transitioner
      },
      computed: {
        animation({ animation, Animations: Animations2 }) {
          return { ...Animations2[animation] || Animations2.slide, name: animation };
        },
        transitionOptions() {
          return { animation: this.animation };
        }
      },
      events: {
        beforeitemshow({ target }) {
          uikitUtil.addClass(target, this.clsActive);
        },
        itemshown({ target }) {
          uikitUtil.addClass(target, this.clsActivated);
        },
        itemhidden({ target }) {
          uikitUtil.removeClass(target, this.clsActive, this.clsActivated);
        }
      }
    };

    var Component = {
      mixins: [Modal, Slideshow],
      functional: true,
      props: {
        delayControls: Number,
        preload: Number,
        videoAutoplay: Boolean,
        template: String
      },
      data: () => ({
        preload: 1,
        videoAutoplay: false,
        delayControls: 3e3,
        items: [],
        cls: "uk-open",
        clsPage: "uk-lightbox-page",
        selList: ".uk-lightbox-items",
        attrItem: "uk-lightbox-item",
        selClose: ".uk-close-large",
        selCaption: ".uk-lightbox-caption",
        pauseOnHover: false,
        velocity: 2,
        Animations,
        template: `<div class="uk-lightbox uk-overflow-hidden"> <ul class="uk-lightbox-items"></ul> <div class="uk-lightbox-toolbar uk-position-top uk-text-right uk-transition-slide-top uk-transition-opaque"> <button class="uk-lightbox-toolbar-icon uk-close-large" type="button" uk-close></button> </div> <a class="uk-lightbox-button uk-position-center-left uk-position-medium uk-transition-fade" href uk-slidenav-previous uk-lightbox-item="previous"></a> <a class="uk-lightbox-button uk-position-center-right uk-position-medium uk-transition-fade" href uk-slidenav-next uk-lightbox-item="next"></a> <div class="uk-lightbox-toolbar uk-lightbox-caption uk-position-bottom uk-text-center uk-transition-slide-bottom uk-transition-opaque"></div> </div>`
      }),
      created() {
        const $el = uikitUtil.$(this.template);
        const list = uikitUtil.$(this.selList, $el);
        this.items.forEach(() => uikitUtil.append(list, "<li>"));
        const close = uikitUtil.$("[uk-close]", $el);
        const closeLabel = this.t("close");
        if (close && closeLabel) {
          close.dataset.i18n = JSON.stringify({ label: closeLabel });
        }
        this.$mount(uikitUtil.append(this.container, $el));
      },
      computed: {
        caption({ selCaption }, $el) {
          return uikitUtil.$(selCaption, $el);
        }
      },
      events: [
        {
          name: `${uikitUtil.pointerMove} ${uikitUtil.pointerDown} keydown`,
          handler: "showControls"
        },
        {
          name: "click",
          self: true,
          delegate() {
            return `${this.selList} > *`;
          },
          handler(e) {
            if (!e.defaultPrevented) {
              this.hide();
            }
          }
        },
        {
          name: "shown",
          self: true,
          handler() {
            this.showControls();
          }
        },
        {
          name: "hide",
          self: true,
          handler() {
            this.hideControls();
            uikitUtil.removeClass(this.slides, this.clsActive);
            uikitUtil.Transition.stop(this.slides);
          }
        },
        {
          name: "hidden",
          self: true,
          handler() {
            this.$destroy(true);
          }
        },
        {
          name: "keyup",
          el() {
            return document;
          },
          handler({ keyCode }) {
            if (!this.isToggled(this.$el) || !this.draggable) {
              return;
            }
            let i = -1;
            if (keyCode === keyMap.LEFT) {
              i = "previous";
            } else if (keyCode === keyMap.RIGHT) {
              i = "next";
            } else if (keyCode === keyMap.HOME) {
              i = 0;
            } else if (keyCode === keyMap.END) {
              i = "last";
            }
            if (~i) {
              this.show(i);
            }
          }
        },
        {
          name: "beforeitemshow",
          handler(e) {
            if (this.isToggled()) {
              return;
            }
            this.draggable = false;
            e.preventDefault();
            this.toggleElement(this.$el, true, false);
            this.animation = Animations["scale"];
            uikitUtil.removeClass(e.target, this.clsActive);
            this.stack.splice(1, 0, this.index);
          }
        },
        {
          name: "itemshow",
          handler() {
            uikitUtil.html(this.caption, this.getItem().caption || "");
            for (let j = -this.preload; j <= this.preload; j++) {
              this.loadItem(this.index + j);
            }
          }
        },
        {
          name: "itemshown",
          handler() {
            this.draggable = this.$props.draggable;
          }
        },
        {
          name: "itemload",
          async handler(_, item) {
            const { source: src, type, alt = "", poster, attrs = {} } = item;
            this.setItem(item, "<span uk-spinner></span>");
            if (!src) {
              return;
            }
            let matches;
            const iframeAttrs = {
              allowfullscreen: "",
              style: "max-width: 100%; box-sizing: border-box;",
              "uk-responsive": "",
              "uk-video": `${this.videoAutoplay}`
            };
            if (type === "image" || src.match(/\.(avif|jpe?g|jfif|a?png|gif|svg|webp)($|\?)/i)) {
              const img = createEl("img", { src, alt, ...attrs });
              uikitUtil.on(img, "load", () => this.setItem(item, img));
              uikitUtil.on(img, "error", () => this.setError(item));
            } else if (type === "video" || src.match(/\.(mp4|webm|ogv)($|\?)/i)) {
              const video = createEl("video", {
                src,
                poster,
                controls: "",
                playsinline: "",
                "uk-video": `${this.videoAutoplay}`,
                ...attrs
              });
              uikitUtil.on(video, "loadedmetadata", () => this.setItem(item, video));
              uikitUtil.on(video, "error", () => this.setError(item));
            } else if (type === "iframe" || src.match(/\.(html|php)($|\?)/i)) {
              this.setItem(
                item,
                createEl("iframe", {
                  src,
                  allowfullscreen: "",
                  class: "uk-lightbox-iframe",
                  ...attrs
                })
              );
            } else if (matches = src.match(
              /\/\/(?:.*?youtube(-nocookie)?\..*?(?:[?&]v=|\/shorts\/)|youtu\.be\/)([\w-]{11})[&?]?(.*)?/
            )) {
              this.setItem(
                item,
                createEl("iframe", {
                  src: `https://www.youtube${matches[1] || ""}.com/embed/${matches[2]}${matches[3] ? `?${matches[3]}` : ""}`,
                  width: 1920,
                  height: 1080,
                  ...iframeAttrs,
                  ...attrs
                })
              );
            } else if (matches = src.match(/\/\/.*?vimeo\.[a-z]+\/(\d+)[&?]?(.*)?/)) {
              try {
                const { height, width } = await (await fetch(
                  `https://vimeo.com/api/oembed.json?maxwidth=1920&url=${encodeURI(
                src
              )}`,
                  { credentials: "omit" }
                )).json();
                this.setItem(
                  item,
                  createEl("iframe", {
                    src: `https://player.vimeo.com/video/${matches[1]}${matches[2] ? `?${matches[2]}` : ""}`,
                    width,
                    height,
                    ...iframeAttrs,
                    ...attrs
                  })
                );
              } catch (e) {
                this.setError(item);
              }
            }
          }
        }
      ],
      methods: {
        loadItem(index = this.index) {
          const item = this.getItem(index);
          if (!this.getSlide(item).childElementCount) {
            uikitUtil.trigger(this.$el, "itemload", [item]);
          }
        },
        getItem(index = this.index) {
          return this.items[uikitUtil.getIndex(index, this.slides)];
        },
        setItem(item, content) {
          uikitUtil.trigger(this.$el, "itemloaded", [this, uikitUtil.html(this.getSlide(item), content)]);
        },
        getSlide(item) {
          return this.slides[this.items.indexOf(item)];
        },
        setError(item) {
          this.setItem(item, '<span uk-icon="icon: bolt; ratio: 2"></span>');
        },
        showControls() {
          clearTimeout(this.controlsTimer);
          this.controlsTimer = setTimeout(this.hideControls, this.delayControls);
          uikitUtil.addClass(this.$el, "uk-active", "uk-transition-active");
        },
        hideControls() {
          uikitUtil.removeClass(this.$el, "uk-active", "uk-transition-active");
        }
      }
    };
    function createEl(tag, attrs) {
      const el = uikitUtil.fragment(`<${tag}>`);
      uikitUtil.attr(el, attrs);
      return el;
    }

    if (typeof window !== "undefined" && window.UIkit) {
      window.UIkit.component("lightboxPanel", Component);
    }

    return Component;

}));
