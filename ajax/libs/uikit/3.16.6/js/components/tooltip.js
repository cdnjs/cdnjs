/*! UIkit 3.16.6 | https://www.getuikit.com | (c) 2014 - 2023 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikittooltip', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitTooltip = factory(global.UIkit.util));
})(this, (function (uikitUtil) { 'use strict';

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

    var Position = {
      props: {
        pos: String,
        offset: null,
        flip: Boolean,
        shift: Boolean,
        inset: Boolean
      },
      data: {
        pos: `bottom-${uikitUtil.isRtl ? "right" : "left"}`,
        offset: false,
        flip: true,
        shift: true,
        inset: false
      },
      connected() {
        this.pos = this.$props.pos.split("-").concat("center").slice(0, 2);
        [this.dir, this.align] = this.pos;
        this.axis = uikitUtil.includes(["top", "bottom"], this.dir) ? "y" : "x";
      },
      methods: {
        positionAt(element, target, boundary) {
          let offset = [this.getPositionOffset(element), this.getShiftOffset(element)];
          const placement = [this.flip && "flip", this.shift && "shift"];
          const attach = {
            element: [this.inset ? this.dir : uikitUtil.flipPosition(this.dir), this.align],
            target: [this.dir, this.align]
          };
          if (this.axis === "y") {
            for (const prop in attach) {
              attach[prop].reverse();
            }
            offset.reverse();
            placement.reverse();
          }
          const restoreScrollPosition = storeScrollPosition(element);
          const elDim = uikitUtil.dimensions(element);
          uikitUtil.css(element, { top: -elDim.height, left: -elDim.width });
          uikitUtil.positionAt(element, target, {
            attach,
            offset,
            boundary,
            placement,
            viewportOffset: this.getViewportOffset(element)
          });
          restoreScrollPosition();
        },
        getPositionOffset(element) {
          return uikitUtil.toPx(
            this.offset === false ? uikitUtil.css(element, "--uk-position-offset") : this.offset,
            this.axis === "x" ? "width" : "height",
            element
          ) * (uikitUtil.includes(["left", "top"], this.dir) ? -1 : 1) * (this.inset ? -1 : 1);
        },
        getShiftOffset(element) {
          return this.align === "center" ? 0 : uikitUtil.toPx(
            uikitUtil.css(element, "--uk-position-shift-offset"),
            this.axis === "y" ? "width" : "height",
            element
          ) * (uikitUtil.includes(["left", "top"], this.align) ? 1 : -1);
        },
        getViewportOffset(element) {
          return uikitUtil.toPx(uikitUtil.css(element, "--uk-position-viewport-offset"));
        }
      }
    };
    function storeScrollPosition(element) {
      const [scrollElement] = uikitUtil.scrollParents(element);
      const { scrollTop } = scrollElement;
      return () => {
        if (scrollTop !== scrollElement.scrollTop) {
          scrollElement.scrollTop = scrollTop;
        }
      };
    }

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

    function addClass(element, ...args) {
      apply$1(element, args, "add");
    }
    function removeClass(element, ...args) {
      apply$1(element, args, "remove");
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
    function apply$1(element, args, fn) {
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
    function apply(node, fn) {
      if (!isElement(node)) {
        return;
      }
      fn(node);
      node = node.firstElementChild;
      while (node) {
        const next = node.nextElementSibling;
        apply(node, fn);
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

    const inBrowser = typeof window !== "undefined";
    const isRtl = inBrowser && document.dir === "rtl";
    const hasTouch = inBrowser && "ontouchstart" in window;
    const hasPointerEvents = inBrowser && window.PointerEvent;
    const pointerDown = hasPointerEvents ? "pointerdown" : hasTouch ? "touchstart" : "mousedown";
    const pointerMove = hasPointerEvents ? "pointermove" : hasTouch ? "touchmove" : "mousemove";
    const pointerUp = hasPointerEvents ? "pointerup" : hasTouch ? "touchend" : "mouseup";
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
        return observe(ResizeObserver, targets, cb, options);
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
      return observe(MutationObserver, targets, cb, options);
    }
    function observe(Observer, targets, cb, options) {
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
        apply: apply,
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
        pointerDown: pointerDown,
        pointerEnter: pointerEnter,
        pointerLeave: pointerLeave,
        pointerMove: pointerMove,
        pointerUp: pointerUp,
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
      apply(element, (element2) => updateElement(element2, e));
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

    var Component = {
      mixins: [Container, Togglable, Position],
      args: "title",
      props: {
        delay: Number,
        title: String
      },
      data: {
        pos: "top",
        title: "",
        delay: 0,
        animation: ["uk-animation-scale-up"],
        duration: 100,
        cls: "uk-active"
      },
      beforeConnect() {
        this.id = generateId(this);
        this._hasTitle = uikitUtil.hasAttr(this.$el, "title");
        uikitUtil.attr(this.$el, {
          title: "",
          "aria-describedby": this.id
        });
        makeFocusable(this.$el);
      },
      disconnected() {
        this.hide();
        if (!uikitUtil.attr(this.$el, "title")) {
          uikitUtil.attr(this.$el, "title", this._hasTitle ? this.title : null);
        }
      },
      methods: {
        show() {
          if (this.isToggled(this.tooltip || null) || !this.title) {
            return;
          }
          clearTimeout(this.showTimer);
          this.showTimer = setTimeout(this._show, this.delay);
        },
        async hide() {
          if (uikitUtil.matches(this.$el, "input:focus")) {
            return;
          }
          clearTimeout(this.showTimer);
          if (!this.isToggled(this.tooltip || null)) {
            return;
          }
          await this.toggleElement(this.tooltip, false, false);
          uikitUtil.remove(this.tooltip);
          this.tooltip = null;
        },
        _show() {
          this.tooltip = uikitUtil.append(
            this.container,
            `<div id="${this.id}" class="uk-${this.$options.name}" role="tooltip"> <div class="uk-${this.$options.name}-inner">${this.title}</div> </div>`
          );
          uikitUtil.on(this.tooltip, "toggled", (e, toggled) => {
            if (!toggled) {
              return;
            }
            const update = () => this.positionAt(this.tooltip, this.$el);
            update();
            const [dir, align] = getAlignment(this.tooltip, this.$el, this.pos);
            this.origin = this.axis === "y" ? `${uikitUtil.flipPosition(dir)}-${align}` : `${align}-${uikitUtil.flipPosition(dir)}`;
            const handlers = [
              uikitUtil.once(
                document,
                `keydown ${uikitUtil.pointerDown}`,
                this.hide,
                false,
                (e2) => e2.type === uikitUtil.pointerDown && !uikitUtil.within(e2.target, this.$el) || e2.type === "keydown" && e2.keyCode === keyMap.ESC
              ),
              uikitUtil.on([document, ...uikitUtil.overflowParents(this.$el)], "scroll", update, {
                passive: true
              })
            ];
            uikitUtil.once(this.tooltip, "hide", () => handlers.forEach((handler) => handler()), {
              self: true
            });
          });
          this.toggleElement(this.tooltip, true);
        }
      },
      events: {
        focus: "show",
        blur: "hide",
        [`${uikitUtil.pointerEnter} ${uikitUtil.pointerLeave}`](e) {
          if (!uikitUtil.isTouch(e)) {
            this[e.type === uikitUtil.pointerEnter ? "show" : "hide"]();
          }
        },
        // Clicking a button does not give it focus on all browsers and platforms
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#clicking_and_focus
        [uikitUtil.pointerDown](e) {
          if (uikitUtil.isTouch(e)) {
            this.show();
          }
        }
      }
    };
    function makeFocusable(el) {
      if (!uikitUtil.isFocusable(el)) {
        uikitUtil.attr(el, "tabindex", "0");
      }
    }
    function getAlignment(el, target, [dir, align]) {
      const elOffset = uikitUtil.offset(el);
      const targetOffset = uikitUtil.offset(target);
      const properties = [
        ["left", "right"],
        ["top", "bottom"]
      ];
      for (const props2 of properties) {
        if (elOffset[props2[0]] >= targetOffset[props2[1]]) {
          dir = props2[1];
          break;
        }
        if (elOffset[props2[1]] <= targetOffset[props2[0]]) {
          dir = props2[0];
          break;
        }
      }
      const props = uikitUtil.includes(properties[0], dir) ? properties[1] : properties[0];
      if (elOffset[props[0]] === targetOffset[props[0]]) {
        align = props[0];
      } else if (elOffset[props[1]] === targetOffset[props[1]]) {
        align = props[1];
      } else {
        align = "center";
      }
      return [dir, align];
    }

    if (typeof window !== "undefined" && window.UIkit) {
      window.UIkit.component("tooltip", Component);
    }

    return Component;

}));
