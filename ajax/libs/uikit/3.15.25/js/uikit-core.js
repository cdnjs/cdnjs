/*! UIkit 3.15.25 | https://www.getuikit.com | (c) 2014 - 2023 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('uikit', factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkit = factory());
})(this, (function () { 'use strict';

    const { hasOwnProperty, toString } = Object.prototype;
    function hasOwn(obj, key) {
      return hasOwnProperty.call(obj, key);
    }
    const hyphenateRe = /\B([A-Z])/g;
    const hyphenate = memoize((str) => str.replace(hyphenateRe, "-$1").toLowerCase());
    const camelizeRe = /-(\w)/g;
    const camelize = memoize((str) => str.replace(camelizeRe, toUpper));
    const ucfirst = memoize(
      (str) => str.length ? toUpper(null, str.charAt(0)) + str.slice(1) : ""
    );
    function toUpper(_, c) {
      return c ? c.toUpperCase() : "";
    }
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
      return element && (isNode(element) ? [element] : Array.from(element).filter(isNode)) || [];
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
    function sortBy$1(array, prop) {
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
    function cover$1(dimensions, maxDimensions) {
      dimensions = contain(dimensions, maxDimensions);
      for (const prop in dimensions) {
        dimensions = dimensions[prop] < maxDimensions[prop] ? ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
      }
      return dimensions;
    }
    const Dimensions = { ratio, contain, cover: cover$1 };
    function getIndex(i, elements, current = 0, finite = false) {
      elements = toNodes(elements);
      const { length } = elements;
      if (!length) {
        return -1;
      }
      i = isNumeric(i) ? toNumber(i) : i === "next" ? current + 1 : i === "previous" ? current - 1 : elements.indexOf(toNode(i));
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

    function ajax(url, options) {
      const env = {
        data: null,
        method: "GET",
        headers: {},
        xhr: new XMLHttpRequest(),
        beforeSend: noop,
        responseType: "",
        ...options
      };
      return Promise.resolve().then(() => env.beforeSend(env)).then(() => send(url, env));
    }
    function send(url, env) {
      return new Promise((resolve, reject) => {
        const { xhr } = env;
        for (const prop in env) {
          if (prop in xhr) {
            try {
              xhr[prop] = env[prop];
            } catch (e) {
            }
          }
        }
        xhr.open(env.method.toUpperCase(), url);
        for (const header in env.headers) {
          xhr.setRequestHeader(header, env.headers[header]);
        }
        on(xhr, "load", () => {
          if (xhr.status === 0 || xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
            resolve(xhr);
          } else {
            reject(
              assign(Error(xhr.statusText), {
                xhr,
                status: xhr.status
              })
            );
          }
        });
        on(xhr, "error", () => reject(assign(Error("Network Error"), { xhr })));
        on(xhr, "timeout", () => reject(assign(Error("Network Timeout"), { xhr })));
        xhr.send(env.data);
      });
    }
    function getImage(src, srcset, sizes) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onerror = (e) => {
          reject(e);
        };
        img.onload = () => {
          resolve(img);
        };
        sizes && (img.sizes = sizes);
        srcset && (img.srcset = srcset);
        img.src = src;
      });
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
    function css(element, property, value, priority = "") {
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
      return String(str).split(/\s|,/).filter(Boolean);
    }

    function transition$1(element, props, duration = 400, timing = "linear") {
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
      start: transition$1,
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
    function animate$2(element, animation, duration = 200, origin, out) {
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
      in: animate$2,
      out(element, animation, duration, origin) {
        return animate$2(element, animation, duration, origin, true);
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

    function observeIntersection(targets, cb, options, intersecting = true) {
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

    const strats = {};
    strats.events = strats.created = strats.beforeConnect = strats.connected = strats.beforeDisconnect = strats.disconnected = strats.destroy = concatStrat;
    strats.args = function(parentVal, childVal) {
      return childVal !== false && concatStrat(childVal || parentVal);
    };
    strats.update = function(parentVal, childVal) {
      return sortBy$1(
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
    strats.data = function(parentVal, childVal, vm) {
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
            return data && (youtube && data.id === id && data.event === "onReady" || vimeo && Number(data.player_id) === id);
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
        document: { documentElement }
      } = window;
      let viewportElement = scrollElement === scrollingElement(scrollElement) ? window : scrollElement;
      const { visualViewport } = window;
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
        const viewport = getViewport$2(element, target[i], viewportOffset, boundary, i);
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
    function getViewport$2(element, target, viewportOffset, boundary, i) {
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
        ajax: ajax,
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
        getImage: getImage,
        getIndex: getIndex,
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
        mergeOptions: mergeOptions,
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
        parseOptions: parseOptions,
        pause: pause,
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
        sortBy: sortBy$1,
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

    function globalAPI(UIkit) {
      const DATA = UIkit.data;
      UIkit.use = function(plugin) {
        if (plugin.installed) {
          return;
        }
        plugin.call(null, this);
        plugin.installed = true;
        return this;
      };
      UIkit.mixin = function(mixin, component) {
        component = (isString(component) ? UIkit.component(component) : component) || this;
        component.options = mergeOptions(component.options, mixin);
      };
      UIkit.extend = function(options) {
        options = options || {};
        const Super = this;
        const Sub = function UIkitComponent(options2) {
          this._init(options2);
        };
        Sub.prototype = Object.create(Super.prototype);
        Sub.prototype.constructor = Sub;
        Sub.options = mergeOptions(Super.options, options);
        Sub.super = Super;
        Sub.extend = Super.extend;
        return Sub;
      };
      UIkit.update = function(element, e) {
        element = element ? toNode(element) : document.body;
        for (const parentEl of parents(element).reverse()) {
          update(parentEl[DATA], e);
        }
        apply(element, (element2) => update(element2[DATA], e));
      };
      let container;
      Object.defineProperty(UIkit, "container", {
        get() {
          return container || document.body;
        },
        set(element) {
          container = $(element);
        }
      });
      function update(data, e) {
        if (!data) {
          return;
        }
        for (const name in data) {
          if (data[name]._connected) {
            data[name]._callUpdate(e);
          }
        }
      }
    }

    function hooksAPI(UIkit) {
      UIkit.prototype._callHook = function(hook) {
        var _a;
        (_a = this.$options[hook]) == null ? void 0 : _a.forEach((handler) => handler.call(this));
      };
      UIkit.prototype._callConnected = function() {
        if (this._connected) {
          return;
        }
        this._data = {};
        this._computed = {};
        this._initProps();
        this._callHook("beforeConnect");
        this._connected = true;
        this._initEvents();
        this._initObservers();
        this._callHook("connected");
        this._callUpdate();
      };
      UIkit.prototype._callDisconnected = function() {
        if (!this._connected) {
          return;
        }
        this._callHook("beforeDisconnect");
        this._disconnectObservers();
        this._unbindEvents();
        this._callHook("disconnected");
        this._connected = false;
        delete this._watch;
      };
      UIkit.prototype._callUpdate = function(e = "update") {
        if (!this._connected) {
          return;
        }
        if (e === "update" || e === "resize") {
          this._callWatches();
        }
        if (!this.$options.update) {
          return;
        }
        if (!this._updates) {
          this._updates = /* @__PURE__ */ new Set();
          fastdom.read(() => {
            if (this._connected) {
              runUpdates.call(this, this._updates);
            }
            delete this._updates;
          });
        }
        this._updates.add(e.type || e);
      };
      UIkit.prototype._callWatches = function() {
        if (this._watch) {
          return;
        }
        const initial = !hasOwn(this, "_watch");
        this._watch = fastdom.read(() => {
          if (this._connected) {
            runWatches.call(this, initial);
          }
          this._watch = null;
        });
      };
      function runUpdates(types) {
        for (const { read, write, events = [] } of this.$options.update) {
          if (!types.has("update") && !events.some((type) => types.has(type))) {
            continue;
          }
          let result;
          if (read) {
            result = read.call(this, this._data, types);
            if (result && isPlainObject(result)) {
              assign(this._data, result);
            }
          }
          if (write && result !== false) {
            fastdom.write(() => {
              if (this._connected) {
                write.call(this, this._data, types);
              }
            });
          }
        }
      }
      function runWatches(initial) {
        const {
          $options: { computed }
        } = this;
        const values = { ...this._computed };
        this._computed = {};
        for (const key in computed) {
          const { watch, immediate } = computed[key];
          if (watch && (initial && immediate || hasOwn(values, key) && !isEqual(values[key], this[key]))) {
            watch.call(this, this[key], values[key]);
          }
        }
      }
    }

    function stateAPI(UIkit) {
      let uid = 0;
      UIkit.prototype._init = function(options) {
        options = options || {};
        options.data = normalizeData(options, this.constructor.options);
        this.$options = mergeOptions(this.constructor.options, options, this);
        this.$el = null;
        this.$props = {};
        this._uid = uid++;
        this._initData();
        this._initMethods();
        this._initComputeds();
        this._callHook("created");
        if (options.el) {
          this.$mount(options.el);
        }
      };
      UIkit.prototype._initData = function() {
        const { data = {} } = this.$options;
        for (const key in data) {
          this.$props[key] = this[key] = data[key];
        }
      };
      UIkit.prototype._initMethods = function() {
        const { methods } = this.$options;
        if (methods) {
          for (const key in methods) {
            this[key] = methods[key].bind(this);
          }
        }
      };
      UIkit.prototype._initComputeds = function() {
        const { computed } = this.$options;
        this._computed = {};
        if (computed) {
          for (const key in computed) {
            registerComputed(this, key, computed[key]);
          }
        }
      };
      UIkit.prototype._initProps = function(props) {
        let key;
        props = props || getProps(this.$options);
        for (key in props) {
          if (!isUndefined(props[key])) {
            this.$props[key] = props[key];
          }
        }
        const exclude = [this.$options.computed, this.$options.methods];
        for (key in this.$props) {
          if (key in props && notIn(exclude, key)) {
            this[key] = this.$props[key];
          }
        }
      };
      UIkit.prototype._initEvents = function() {
        this._events = [];
        for (const event of this.$options.events || []) {
          if (hasOwn(event, "handler")) {
            registerEvent(this, event);
          } else {
            for (const key in event) {
              registerEvent(this, event[key], key);
            }
          }
        }
      };
      UIkit.prototype._unbindEvents = function() {
        this._events.forEach((unbind) => unbind());
        delete this._events;
      };
      UIkit.prototype._initObservers = function() {
        this._observers = [initPropsObserver(this), initChildListObserver(this)];
      };
      UIkit.prototype.registerObserver = function(...observer) {
        this._observers.push(...observer);
      };
      UIkit.prototype._disconnectObservers = function() {
        this._observers.forEach((observer) => observer == null ? void 0 : observer.disconnect());
      };
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
        value = props[key] === Boolean && value === "" ? true : coerce$1(props[key], value);
        if (prop === "target" && startsWith(value, "_")) {
          continue;
        }
        data$1[key] = value;
      }
      const options = parseOptions(data(el, id), args);
      for (const key in options) {
        const prop = camelize(key);
        if (!isUndefined(props[prop])) {
          data$1[prop] = coerce$1(props[prop], options[key]);
        }
      }
      return data$1;
    }
    function registerComputed(component, key, cb) {
      Object.defineProperty(component, key, {
        enumerable: true,
        get() {
          const { _computed, $props, $el } = component;
          if (!hasOwn(_computed, key)) {
            _computed[key] = (cb.get || cb).call(component, $props, $el);
          }
          return _computed[key];
        },
        set(value) {
          const { _computed } = component;
          _computed[key] = cb.set ? cb.set.call(component, value) : value;
          if (isUndefined(_computed[key])) {
            delete _computed[key];
          }
        }
      });
    }
    function registerEvent(component, event, key) {
      if (!isPlainObject(event)) {
        event = { name: key, handler: event };
      }
      let { name, el, handler, capture, passive, delegate, filter, self } = event;
      el = isFunction(el) ? el.call(component) : el || component.$el;
      if (isArray(el)) {
        el.forEach((el2) => registerEvent(component, { ...event, el: el2 }, key));
        return;
      }
      if (!el || filter && !filter.call(component)) {
        return;
      }
      component._events.push(
        on(
          el,
          name,
          delegate ? isString(delegate) ? delegate : delegate.call(component) : null,
          isString(handler) ? component[handler] : handler.bind(component),
          { passive, capture, self }
        )
      );
    }
    function notIn(options, key) {
      return options.every((arr) => !arr || !hasOwn(arr, key));
    }
    function coerce$1(type, value) {
      if (type === Boolean) {
        return toBoolean(value);
      } else if (type === Number) {
        return toNumber(value);
      } else if (type === "list") {
        return toList(value);
      }
      return type ? type(value) : value;
    }
    function toList(value) {
      return isArray(value) ? value : isString(value) ? value.split(/,(?![^(]*\))/).map((value2) => isNumeric(value2) ? toNumber(value2) : toBoolean(value2.trim())) : [value];
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
          data[key] = coerce$1(props[key], data[key]);
        }
      }
      return data;
    }
    function initChildListObserver(component) {
      let { el, computed } = component.$options;
      if (!computed) {
        return;
      }
      for (const key in computed) {
        if (computed[key].document) {
          el = el.ownerDocument;
          break;
        }
      }
      const observer = new MutationObserver(() => component._callWatches());
      observer.observe(el, {
        childList: true,
        subtree: true
      });
      return observer;
    }
    function initPropsObserver(component) {
      const { $options, $props } = component;
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
          component.$reset();
        }
      });
      observer.observe(el, {
        attributes: true,
        attributeFilter: filter.concat(filter.map((key) => `data-${key}`))
      });
      return observer;
    }

    function instanceAPI(UIkit) {
      const DATA = UIkit.data;
      UIkit.prototype.$create = function(component, element, data) {
        return UIkit[component](element, data);
      };
      UIkit.prototype.$mount = function(el) {
        const { name } = this.$options;
        if (!el[DATA]) {
          el[DATA] = {};
        }
        if (el[DATA][name]) {
          return;
        }
        el[DATA][name] = this;
        this.$el = this.$options.el = this.$options.el || el;
        if (within(el, document)) {
          this._callConnected();
        }
      };
      UIkit.prototype.$reset = function() {
        this._callDisconnected();
        this._callConnected();
      };
      UIkit.prototype.$destroy = function(removeEl = false) {
        const { el, name } = this.$options;
        if (el) {
          this._callDisconnected();
        }
        this._callHook("destroy");
        if (!(el == null ? void 0 : el[DATA])) {
          return;
        }
        delete el[DATA][name];
        if (!isEmpty(el[DATA])) {
          delete el[DATA];
        }
        if (removeEl) {
          remove$1(this.$el);
        }
      };
      UIkit.prototype.$emit = function(e) {
        this._callUpdate(e);
      };
      UIkit.prototype.$update = function(element = this.$el, e) {
        UIkit.update(element, e);
      };
      UIkit.prototype.$getComponent = UIkit.getComponent;
      Object.defineProperty(
        UIkit.prototype,
        "$container",
        Object.getOwnPropertyDescriptor(UIkit, "container")
      );
    }

    const components$2 = {};
    function componentAPI(UIkit) {
      const { data: DATA, prefix: PREFIX } = UIkit;
      UIkit.component = function(name, options) {
        var _a;
        name = hyphenate(name);
        const id = PREFIX + name;
        if (!options) {
          if (isPlainObject(components$2[id])) {
            components$2[id] = components$2[`data-${id}`] = UIkit.extend(components$2[id]);
          }
          return components$2[id];
        }
        name = camelize(name);
        UIkit[name] = function(element, data) {
          const component = UIkit.component(name);
          return component.options.functional ? new component({ data: isPlainObject(element) ? element : [...arguments] }) : element ? $$(element).map(init)[0] : init();
          function init(element2) {
            const instance = UIkit.getComponent(element2, name);
            if (instance) {
              if (data) {
                instance.$destroy();
              } else {
                return instance;
              }
            }
            return new component({ el: element2, data });
          }
        };
        const opt = isPlainObject(options) ? { ...options } : options.options;
        opt.id = id;
        opt.name = name;
        (_a = opt.install) == null ? void 0 : _a.call(opt, UIkit, opt, name);
        if (UIkit._initialized && !opt.functional) {
          requestAnimationFrame(() => UIkit[name](`[${id}],[data-${id}]`));
        }
        return components$2[id] = components$2[`data-${id}`] = isPlainObject(options) ? opt : options;
      };
      UIkit.getComponents = (element) => (element == null ? void 0 : element[DATA]) || {};
      UIkit.getComponent = (element, name) => UIkit.getComponents(element)[name];
      UIkit.connect = (node) => {
        if (node[DATA]) {
          for (const name in node[DATA]) {
            node[DATA][name]._callConnected();
          }
        }
        for (const attribute of node.getAttributeNames()) {
          const name = getComponentName(attribute);
          name && UIkit[name](node);
        }
      };
      UIkit.disconnect = (node) => {
        for (const name in node[DATA]) {
          node[DATA][name]._callDisconnected();
        }
      };
    }
    function getComponentName(attribute) {
      const cmp = components$2[attribute];
      return cmp && (isPlainObject(cmp) ? cmp : cmp.options).name;
    }

    const UIkit = function(options) {
      this._init(options);
    };
    UIkit.util = util;
    UIkit.data = "__uikit__";
    UIkit.prefix = "uk-";
    UIkit.options = {};
    UIkit.version = "3.15.25";
    globalAPI(UIkit);
    hooksAPI(UIkit);
    stateAPI(UIkit);
    componentAPI(UIkit);
    instanceAPI(UIkit);

    function boot(UIkit) {
      const { connect, disconnect } = UIkit;
      if (!inBrowser || !window.MutationObserver) {
        return;
      }
      requestAnimationFrame(function() {
        trigger(document, "uikit:init", UIkit);
        if (document.body) {
          apply(document.body, connect);
        }
        new MutationObserver((records) => records.forEach(applyChildListMutation)).observe(
          document,
          {
            childList: true,
            subtree: true
          }
        );
        new MutationObserver((records) => records.forEach(applyAttributeMutation)).observe(
          document,
          {
            attributes: true,
            subtree: true
          }
        );
        UIkit._initialized = true;
      });
      function applyChildListMutation({ addedNodes, removedNodes }) {
        for (const node of addedNodes) {
          apply(node, connect);
        }
        for (const node of removedNodes) {
          apply(node, disconnect);
        }
      }
      function applyAttributeMutation({ target, attributeName }) {
        var _a;
        const name = getComponentName(attributeName);
        if (name) {
          if (hasAttr(target, attributeName)) {
            UIkit[name](target);
            return;
          }
          (_a = UIkit.getComponent(target, name)) == null ? void 0 : _a.$destroy();
        }
      }
    }

    var Class = {
      connected() {
        addClass(this.$el, this.$options.id);
      }
    };

    var Lazyload = {
      data: {
        preload: 5
      },
      methods: {
        lazyload(observeTargets = this.$el, targets = this.$el) {
          this.registerObserver(
            observeIntersection(observeTargets, (entries, observer) => {
              for (const el of toNodes(isFunction(targets) ? targets() : targets)) {
                $$('[loading="lazy"]', el).slice(0, this.preload - 1).forEach((el2) => removeAttr(el2, "loading"));
              }
              for (const el of entries.filter(({ isIntersecting }) => isIntersecting).map(({ target }) => target)) {
                observer.unobserve(el);
              }
            })
          );
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
          return ["slide", "reveal"].some((transition) => startsWith(animation[0], transition));
        }
      },
      methods: {
        toggleElement(targets, toggle, animate) {
          return new Promise(
            (resolve) => Promise.all(
              toNodes(targets).map((el) => {
                const show = isBoolean(toggle) ? toggle : !this.isToggled(el);
                if (!trigger(el, `before${show ? "show" : "hide"}`, [this])) {
                  return Promise.reject();
                }
                const promise = (isFunction(animate) ? animate : animate === false || !this.hasAnimation ? toggleInstant : this.hasTransition ? toggleTransition : toggleAnimation)(el, show, this);
                const cls = show ? this.clsEnter : this.clsLeave;
                addClass(el, cls);
                trigger(el, show ? "show" : "hide", [this]);
                const done = () => {
                  removeClass(el, cls);
                  trigger(el, show ? "shown" : "hidden", [this]);
                };
                return promise ? promise.then(done, () => {
                  removeClass(el, cls);
                  return Promise.reject();
                }) : done();
              })
            ).then(resolve, noop)
          );
        },
        isToggled(el = this.$el) {
          [el] = toNodes(el);
          return hasClass(el, this.clsEnter) ? true : hasClass(el, this.clsLeave) ? false : this.cls ? hasClass(el, this.cls.split(" ")[0]) : isVisible(el);
        },
        _toggle(el, toggled) {
          if (!el) {
            return;
          }
          toggled = Boolean(toggled);
          let changed;
          if (this.cls) {
            changed = includes(this.cls, " ") || toggled !== hasClass(el, this.cls);
            changed && toggleClass(el, this.cls, includes(this.cls, " ") ? void 0 : toggled);
          } else {
            changed = toggled === el.hidden;
            changed && (el.hidden = !toggled);
          }
          $$("[autofocus]", el).some((el2) => isVisible(el2) ? el2.focus() || true : el2.blur());
          if (changed) {
            trigger(el, "toggled", [toggled, this]);
          }
        }
      }
    };
    function toggleInstant(el, show, { _toggle }) {
      Animation.cancel(el);
      Transition.cancel(el);
      return _toggle(el, show);
    }
    async function toggleTransition(el, show, { animation, duration, velocity, transition, _toggle }) {
      var _a;
      const [mode = "reveal", startProp = "top"] = ((_a = animation[0]) == null ? void 0 : _a.split("-")) || [];
      const dirs = [
        ["left", "right"],
        ["top", "bottom"]
      ];
      const dir = dirs[includes(dirs[0], startProp) ? 0 : 1];
      const end = dir[1] === startProp;
      const props = ["width", "height"];
      const dimProp = props[dirs.indexOf(dir)];
      const marginProp = `margin-${dir[0]}`;
      const marginStartProp = `margin-${startProp}`;
      let currentDim = dimensions(el)[dimProp];
      const inProgress = Transition.inProgress(el);
      await Transition.cancel(el);
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
      const dim = dimensions(el);
      const currentMargin = toFloat(css(el, marginProp));
      const marginStart = toFloat(css(el, marginStartProp));
      const endDim = dim[dimProp] + marginStart;
      if (!inProgress && !show) {
        currentDim += marginStart;
      }
      const [wrapper] = wrapInner(el, "<div>");
      css(wrapper, {
        boxSizing: "border-box",
        height: dim.height,
        width: dim.width,
        ...css(el, [
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
      css(el, {
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
        css(el, marginProp, endDim - currentDim + currentMargin);
        endProps[marginProp] = show ? currentMargin : endDim + currentMargin;
      }
      if (!end ^ mode === "reveal") {
        css(wrapper, marginProp, -endDim + currentDim);
        Transition.start(wrapper, { [marginProp]: show ? 0 : -endDim }, duration, transition);
      }
      try {
        await Transition.start(el, endProps, duration, transition);
      } finally {
        css(el, prevProps);
        unwrap(wrapper.firstChild);
        if (!show) {
          _toggle(el, false);
        }
      }
    }
    function toggleAnimation(el, show, cmp) {
      Animation.cancel(el);
      const { animation, duration, _toggle } = cmp;
      if (show) {
        _toggle(el, true);
        return Animation.in(el, animation[0], duration, cmp.origin);
      }
      return Animation.out(el, animation[1] || animation[0], duration, cmp.origin).then(
        () => _toggle(el, false)
      );
    }

    var Accordion = {
      mixins: [Class, Lazyload, Togglable],
      props: {
        animation: Boolean,
        targets: String,
        active: null,
        collapsible: Boolean,
        multiple: Boolean,
        toggle: String,
        content: String,
        offset: Number
      },
      data: {
        targets: "> *",
        active: false,
        animation: true,
        collapsible: true,
        multiple: false,
        clsOpen: "uk-open",
        toggle: "> .uk-accordion-title",
        content: "> .uk-accordion-content",
        offset: 0
      },
      computed: {
        items: {
          get({ targets }, $el) {
            return $$(targets, $el);
          },
          watch(items, prev) {
            if (prev || hasClass(items, this.clsOpen)) {
              return;
            }
            const active = this.active !== false && items[Number(this.active)] || !this.collapsible && items[0];
            if (active) {
              this.toggle(active, false);
            }
          },
          immediate: true
        },
        toggles({ toggle }) {
          return this.items.map((item) => $(toggle, item));
        },
        contents: {
          get({ content }) {
            return this.items.map((item) => $(content, item));
          },
          watch(items) {
            for (const el of items) {
              hide(
                el,
                !hasClass(
                  this.items.find((item) => within(el, item)),
                  this.clsOpen
                )
              );
            }
          },
          immediate: true
        }
      },
      connected() {
        this.lazyload();
      },
      events: [
        {
          name: "click",
          delegate() {
            return `${this.targets} ${this.$props.toggle}`;
          },
          async handler(e) {
            var _a;
            e.preventDefault();
            (_a = this._off) == null ? void 0 : _a.call(this);
            this._off = keepScrollPosition(e.target);
            await this.toggle(index(this.toggles, e.current));
            this._off();
          }
        }
      ],
      methods: {
        async toggle(item, animate) {
          item = this.items[getIndex(item, this.items)];
          let items = [item];
          const activeItems = filter(this.items, `.${this.clsOpen}`);
          if (!this.multiple && !includes(activeItems, items[0])) {
            items = items.concat(activeItems);
          }
          if (!this.collapsible && activeItems.length < 2 && includes(activeItems, item)) {
            return;
          }
          await Promise.all(
            items.map(
              (el) => this.toggleElement(el, !includes(activeItems, el), (el2, show) => {
                toggleClass(el2, this.clsOpen, show);
                attr($(this.$props.toggle, el2), "aria-expanded", show);
                if (animate === false || !this.animation) {
                  hide($(this.content, el2), !show);
                  return;
                }
                return transition(el2, show, this);
              })
            )
          );
        }
      }
    };
    function hide(el, hide2) {
      el && (el.hidden = hide2);
    }
    async function transition(el, show, { content, duration, velocity, transition: transition2 }) {
      var _a;
      content = ((_a = el._wrapper) == null ? void 0 : _a.firstElementChild) || $(content, el);
      if (!el._wrapper) {
        el._wrapper = wrapAll(content, "<div>");
      }
      const wrapper = el._wrapper;
      css(wrapper, "overflow", "hidden");
      const currentHeight = toFloat(css(wrapper, "height"));
      await Transition.cancel(wrapper);
      hide(content, false);
      const endHeight = sumBy(["marginTop", "marginBottom"], (prop) => css(content, prop)) + dimensions(content).height;
      const percent = currentHeight / endHeight;
      duration = (velocity * endHeight + duration) * (show ? 1 - percent : percent);
      css(wrapper, "height", currentHeight);
      await Transition.start(wrapper, { height: show ? endHeight : 0 }, duration, transition2);
      unwrap(content);
      delete el._wrapper;
      if (!show) {
        hide(content, true);
      }
    }
    function keepScrollPosition(el) {
      const [scrollParent] = scrollParents(el, true);
      let frame;
      (function scroll() {
        frame = requestAnimationFrame(() => {
          const { top } = el.getBoundingClientRect();
          if (top < 0) {
            scrollParent.scrollTop += top;
          }
          scroll();
        });
      })();
      return () => requestAnimationFrame(() => cancelAnimationFrame(frame));
    }

    var alert = {
      mixins: [Class, Togglable],
      args: "animation",
      props: {
        animation: Boolean,
        close: String
      },
      data: {
        animation: true,
        selClose: ".uk-alert-close",
        duration: 150
      },
      events: {
        name: "click",
        delegate() {
          return this.selClose;
        },
        handler(e) {
          e.preventDefault();
          this.close();
        }
      },
      methods: {
        async close() {
          await this.toggleElement(this.$el, false, animate$1);
          this.$destroy(true);
        }
      }
    };
    function animate$1(el, show, { duration, transition, velocity }) {
      const height = toFloat(css(el, "height"));
      css(el, "height", height);
      return Transition.start(
        el,
        {
          height: 0,
          marginTop: 0,
          marginBottom: 0,
          paddingTop: 0,
          paddingBottom: 0,
          borderTop: 0,
          borderBottom: 0,
          opacity: 0
        },
        velocity * height + duration,
        transition
      );
    }

    var Video = {
      args: "autoplay",
      props: {
        automute: Boolean,
        autoplay: Boolean
      },
      data: {
        automute: false,
        autoplay: true
      },
      connected() {
        this.inView = this.autoplay === "inview";
        if (this.inView && !hasAttr(this.$el, "preload")) {
          this.$el.preload = "none";
        }
        if (isTag(this.$el, "iframe") && !hasAttr(this.$el, "allow")) {
          this.$el.allow = "autoplay";
        }
        if (this.automute) {
          mute(this.$el);
        }
        this.registerObserver(observeIntersection(this.$el, () => this.$emit(), {}, false));
      },
      update: {
        read({ visible }) {
          if (!isVideo(this.$el)) {
            return false;
          }
          return {
            prev: visible,
            visible: isVisible(this.$el) && css(this.$el, "visibility") !== "hidden",
            inView: this.inView && isInView(this.$el)
          };
        },
        write({ prev, visible, inView }) {
          if (!visible || this.inView && !inView) {
            pause(this.$el);
          } else if (this.autoplay === true && !prev || this.inView && inView) {
            play(this.$el);
          }
        }
      }
    };

    var Resize = {
      connected() {
        var _a;
        this.registerObserver(
          observeResize(
            ((_a = this.$options.resizeTargets) == null ? void 0 : _a.call(this)) || this.$el,
            () => this.$emit("resize")
          )
        );
      }
    };

    var cover = {
      mixins: [Resize, Video],
      props: {
        width: Number,
        height: Number
      },
      data: {
        automute: true
      },
      events: {
        "load loadedmetadata"() {
          this.$emit("resize");
        }
      },
      resizeTargets() {
        return [this.$el, getPositionedParent(this.$el) || parent(this.$el)];
      },
      update: {
        read() {
          const { ratio, cover } = Dimensions;
          const { $el, width, height } = this;
          let dim = { width, height };
          if (!dim.width || !dim.height) {
            const intrinsic = {
              width: $el.naturalWidth || $el.videoWidth || $el.clientWidth,
              height: $el.naturalHeight || $el.videoHeight || $el.clientHeight
            };
            if (dim.width) {
              dim = ratio(intrinsic, "width", dim.width);
            } else if (height) {
              dim = ratio(intrinsic, "height", dim.height);
            } else {
              dim = intrinsic;
            }
          }
          const { offsetHeight: coverHeight, offsetWidth: coverWidth } = getPositionedParent($el) || parent($el);
          const coverDim = cover(dim, {
            width: coverWidth + (coverWidth % 2 ? 1 : 0),
            height: coverHeight + (coverHeight % 2 ? 1 : 0)
          });
          if (!coverDim.width || !coverDim.height) {
            return false;
          }
          return coverDim;
        },
        write({ height, width }) {
          css(this.$el, { height, width });
        },
        events: ["resize"]
      }
    };
    function getPositionedParent(el) {
      while (el = parent(el)) {
        if (css(el, "position") !== "static") {
          return el;
        }
      }
    }

    var Container = {
      props: {
        container: Boolean
      },
      data: {
        container: true
      },
      computed: {
        container({ container }) {
          return container === true && this.$container || container && $(container);
        }
      }
    };

    var Position = {
      props: {
        pos: String,
        offset: null,
        flip: Boolean,
        shift: Boolean,
        inset: Boolean
      },
      data: {
        pos: `bottom-${isRtl ? "right" : "left"}`,
        offset: false,
        flip: true,
        shift: true,
        inset: false
      },
      connected() {
        this.pos = this.$props.pos.split("-").concat("center").slice(0, 2);
        [this.dir, this.align] = this.pos;
        this.axis = includes(["top", "bottom"], this.dir) ? "y" : "x";
      },
      methods: {
        positionAt(element, target, boundary) {
          let offset = [this.getPositionOffset(element), this.getShiftOffset(element)];
          const placement = [this.flip && "flip", this.shift && "shift"];
          const attach = {
            element: [this.inset ? this.dir : flipPosition(this.dir), this.align],
            target: [this.dir, this.align]
          };
          if (this.axis === "y") {
            for (const prop in attach) {
              attach[prop].reverse();
            }
            offset.reverse();
            placement.reverse();
          }
          const [scrollElement] = scrollParents(element);
          const { scrollTop, scrollLeft } = scrollElement;
          const elDim = dimensions(element);
          css(element, { top: -elDim.height, left: -elDim.width });
          positionAt(element, target, {
            attach,
            offset,
            boundary,
            placement,
            viewportOffset: this.getViewportOffset(element)
          });
          scrollElement.scrollTop = scrollTop;
          scrollElement.scrollLeft = scrollLeft;
        },
        getPositionOffset(element) {
          return toPx(
            this.offset === false ? css(element, "--uk-position-offset") : this.offset,
            this.axis === "x" ? "width" : "height",
            element
          ) * (includes(["left", "top"], this.dir) ? -1 : 1) * (this.inset ? -1 : 1);
        },
        getShiftOffset(element) {
          return this.align === "center" ? 0 : toPx(
            css(element, "--uk-position-shift-offset"),
            this.axis === "y" ? "width" : "height",
            element
          ) * (includes(["left", "top"], this.align) ? 1 : -1);
        },
        getViewportOffset(element) {
          return toPx(css(element, "--uk-position-viewport-offset"));
        }
      }
    };

    const active$1 = [];
    var Modal = {
      mixins: [Class, Container, Togglable],
      props: {
        selPanel: String,
        selClose: String,
        escClose: Boolean,
        bgClose: Boolean,
        stack: Boolean
      },
      data: {
        cls: "uk-open",
        escClose: true,
        bgClose: true,
        overlay: true,
        stack: false
      },
      computed: {
        panel({ selPanel }, $el) {
          return $(selPanel, $el);
        },
        transitionElement() {
          return this.panel;
        },
        bgClose({ bgClose }) {
          return bgClose && this.panel;
        }
      },
      beforeDisconnect() {
        if (includes(active$1, this)) {
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
            if (!defaultPrevented && hash && isSameSiteAnchor(current) && !within(hash, this.$el) && $(hash, document.body)) {
              this.hide();
            } else if (matches(current, this.selClose)) {
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
            if (this.isToggled() === includes(active$1, this)) {
              this.toggle();
            }
          }
        },
        {
          name: "beforeshow",
          self: true,
          handler(e) {
            if (includes(active$1, this)) {
              return false;
            }
            if (!this.stack && active$1.length) {
              Promise.all(active$1.map((modal) => modal.hide())).then(this.show);
              e.preventDefault();
            } else {
              active$1.push(this);
            }
          }
        },
        {
          name: "show",
          self: true,
          handler() {
            if (this.stack) {
              css(this.$el, "zIndex", toFloat(css(this.$el, "zIndex")) + active$1.length);
            }
            const handlers = [
              this.overlay && preventBackgroundFocus(this),
              this.overlay && preventBackgroundScroll(this.$el),
              this.bgClose && listenForBackgroundClose(this),
              this.escClose && listenForEscClose$1(this)
            ];
            once(
              this.$el,
              "hidden",
              () => handlers.forEach((handler) => handler && handler()),
              { self: true }
            );
            addClass(document.documentElement, this.clsPage);
          }
        },
        {
          name: "shown",
          self: true,
          handler() {
            if (!isFocusable(this.$el)) {
              attr(this.$el, "tabindex", "-1");
            }
            if (!$(":focus", this.$el)) {
              this.$el.focus();
            }
          }
        },
        {
          name: "hidden",
          self: true,
          handler() {
            if (includes(active$1, this)) {
              active$1.splice(active$1.indexOf(this), 1);
            }
            css(this.$el, "zIndex", "");
            if (!active$1.some((modal) => modal.clsPage === this.clsPage)) {
              removeClass(document.documentElement, this.clsPage);
            }
          }
        }
      ],
      methods: {
        toggle() {
          return this.isToggled() ? this.hide() : this.show();
        },
        show() {
          if (this.container && parent(this.$el) !== this.container) {
            append(this.container, this.$el);
            return new Promise(
              (resolve) => requestAnimationFrame(() => this.show().then(resolve))
            );
          }
          return this.toggleElement(this.$el, true, animate);
        },
        hide() {
          return this.toggleElement(this.$el, false, animate);
        }
      }
    };
    function animate(el, show, { transitionElement, _toggle }) {
      return new Promise(
        (resolve, reject) => once(el, "show hide", () => {
          var _a;
          (_a = el._reject) == null ? void 0 : _a.call(el);
          el._reject = reject;
          _toggle(el, show);
          const off = once(
            transitionElement,
            "transitionstart",
            () => {
              once(transitionElement, "transitionend transitioncancel", resolve, {
                self: true
              });
              clearTimeout(timer);
            },
            { self: true }
          );
          const timer = setTimeout(() => {
            off();
            resolve();
          }, toMs(css(transitionElement, "transitionDuration")));
        })
      ).then(() => delete el._reject);
    }
    function toMs(time) {
      return time ? endsWith(time, "ms") ? toFloat(time) : toFloat(time) * 1e3 : 0;
    }
    function preventBackgroundFocus(modal) {
      return on(document, "focusin", (e) => {
        if (last(active$1) === modal && !within(e.target, modal.$el)) {
          modal.$el.focus();
        }
      });
    }
    function listenForBackgroundClose(modal) {
      return on(document, pointerDown, ({ target }) => {
        if (last(active$1) !== modal || modal.overlay && !within(target, modal.$el) || within(target, modal.panel)) {
          return;
        }
        once(
          document,
          `${pointerUp} ${pointerCancel} scroll`,
          ({ defaultPrevented, type, target: newTarget }) => {
            if (!defaultPrevented && type === pointerUp && target === newTarget) {
              modal.hide();
            }
          },
          true
        );
      });
    }
    function listenForEscClose$1(modal) {
      return on(document, "keydown", (e) => {
        if (e.keyCode === 27 && last(active$1) === modal) {
          modal.hide();
        }
      });
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
    function isSameSiteAnchor(a) {
      return ["origin", "pathname", "search"].every((part) => a[part] === location[part]);
    }

    let active;
    var drop = {
      mixins: [Container, Lazyload, Position, Togglable],
      args: "pos",
      props: {
        mode: "list",
        toggle: Boolean,
        boundary: Boolean,
        boundaryX: Boolean,
        boundaryY: Boolean,
        target: Boolean,
        targetX: Boolean,
        targetY: Boolean,
        stretch: Boolean,
        delayShow: Number,
        delayHide: Number,
        autoUpdate: Boolean,
        clsDrop: String,
        animateOut: Boolean,
        bgScroll: Boolean
      },
      data: {
        mode: ["click", "hover"],
        toggle: "- *",
        boundary: false,
        boundaryX: false,
        boundaryY: false,
        target: false,
        targetX: false,
        targetY: false,
        stretch: false,
        delayShow: 0,
        delayHide: 800,
        autoUpdate: true,
        clsDrop: false,
        animateOut: false,
        bgScroll: true,
        animation: ["uk-animation-fade"],
        cls: "uk-open",
        container: false
      },
      computed: {
        boundary({ boundary, boundaryX, boundaryY }, $el) {
          return [
            query(boundaryX || boundary, $el) || window,
            query(boundaryY || boundary, $el) || window
          ];
        },
        target({ target, targetX, targetY }, $el) {
          targetX = targetX || target || this.targetEl;
          targetY = targetY || target || this.targetEl;
          return [
            targetX === true ? window : query(targetX, $el),
            targetY === true ? window : query(targetY, $el)
          ];
        }
      },
      created() {
        this.tracker = new MouseTracker();
      },
      beforeConnect() {
        this.clsDrop = this.$props.clsDrop || `uk-${this.$options.name}`;
      },
      connected() {
        addClass(this.$el, this.clsDrop);
        if (this.toggle && !this.targetEl) {
          this.targetEl = createToggleComponent(this);
        }
        this._style = (({ width, height }) => ({ width, height }))(this.$el.style);
      },
      disconnected() {
        if (this.isActive()) {
          this.hide(false);
          active = null;
        }
        css(this.$el, this._style);
      },
      events: [
        {
          name: "click",
          delegate() {
            return `.${this.clsDrop}-close`;
          },
          handler(e) {
            e.preventDefault();
            this.hide(false);
          }
        },
        {
          name: "click",
          delegate() {
            return 'a[href*="#"]';
          },
          handler({ defaultPrevented, current }) {
            const { hash } = current;
            if (!defaultPrevented && hash && isSameSiteAnchor(current) && !within(hash, this.$el)) {
              this.hide(false);
            }
          }
        },
        {
          name: "beforescroll",
          handler() {
            this.hide(false);
          }
        },
        {
          name: "toggle",
          self: true,
          handler(e, toggle) {
            e.preventDefault();
            if (this.isToggled()) {
              this.hide(false);
            } else {
              this.show(toggle == null ? void 0 : toggle.$el, false);
            }
          }
        },
        {
          name: "toggleshow",
          self: true,
          handler(e, toggle) {
            e.preventDefault();
            this.show(toggle == null ? void 0 : toggle.$el);
          }
        },
        {
          name: "togglehide",
          self: true,
          handler(e) {
            e.preventDefault();
            if (!matches(this.$el, ":focus,:hover")) {
              this.hide();
            }
          }
        },
        {
          name: `${pointerEnter} focusin`,
          filter() {
            return includes(this.mode, "hover");
          },
          handler(e) {
            if (!isTouch(e)) {
              this.clearTimers();
            }
          }
        },
        {
          name: `${pointerLeave} focusout`,
          filter() {
            return includes(this.mode, "hover");
          },
          handler(e) {
            if (!isTouch(e) && e.relatedTarget) {
              this.hide();
            }
          }
        },
        {
          name: "toggled",
          self: true,
          handler(e, toggled) {
            if (!toggled) {
              return;
            }
            this.clearTimers();
            this.position();
          }
        },
        {
          name: "show",
          self: true,
          handler() {
            active = this;
            this.tracker.init();
            const handlers = [
              listenForBackgroundClick(this),
              listenForEscClose(this),
              listenForResize(this),
              this.autoUpdate && listenForScroll(this),
              !this.bgScroll && preventBackgroundScroll(this.$el)
            ];
            once(this.$el, "hide", () => handlers.forEach((handler) => handler && handler()), {
              self: true
            });
          }
        },
        {
          name: "beforehide",
          self: true,
          handler() {
            this.clearTimers();
          }
        },
        {
          name: "hide",
          handler({ target }) {
            if (this.$el !== target) {
              active = active === null && within(target, this.$el) && this.isToggled() ? this : active;
              return;
            }
            active = this.isActive() ? null : active;
            this.tracker.cancel();
          }
        }
      ],
      update: {
        write() {
          if (this.isToggled() && !hasClass(this.$el, this.clsEnter)) {
            this.position();
          }
        }
      },
      methods: {
        show(target = this.targetEl, delay = true) {
          if (this.isToggled() && target && this.targetEl && target !== this.targetEl) {
            this.hide(false, false);
          }
          this.targetEl = target;
          this.clearTimers();
          if (this.isActive()) {
            return;
          }
          if (active) {
            if (delay && active.isDelaying) {
              this.showTimer = setTimeout(() => matches(target, ":hover") && this.show(), 10);
              return;
            }
            let prev;
            while (active && prev !== active && !within(this.$el, active.$el)) {
              prev = active;
              active.hide(false, false);
            }
          }
          if (this.container && parent(this.$el) !== this.container) {
            append(this.container, this.$el);
          }
          this.showTimer = setTimeout(
            () => this.toggleElement(this.$el, true),
            delay && this.delayShow || 0
          );
        },
        hide(delay = true, animate = true) {
          const hide = () => this.toggleElement(this.$el, false, this.animateOut && animate);
          this.clearTimers();
          this.isDelaying = getPositionedElements(this.$el).some(
            (el) => this.tracker.movesTo(el)
          );
          if (delay && this.isDelaying) {
            this.hideTimer = setTimeout(this.hide, 50);
          } else if (delay && this.delayHide) {
            this.hideTimer = setTimeout(hide, this.delayHide);
          } else {
            hide();
          }
        },
        clearTimers() {
          clearTimeout(this.showTimer);
          clearTimeout(this.hideTimer);
          this.showTimer = null;
          this.hideTimer = null;
          this.isDelaying = false;
        },
        isActive() {
          return active === this;
        },
        position() {
          removeClass(this.$el, `${this.clsDrop}-stack`);
          css(this.$el, this._style);
          this.$el.hidden = true;
          const viewports = this.target.map((target) => getViewport$1(this.$el, target));
          const viewportOffset = this.getViewportOffset(this.$el);
          const dirs = [
            [0, ["x", "width", "left", "right"]],
            [1, ["y", "height", "top", "bottom"]]
          ];
          for (const [i, [axis, prop]] of dirs) {
            if (this.axis !== axis && includes([axis, true], this.stretch)) {
              css(this.$el, {
                [prop]: Math.min(
                  offset(this.boundary[i])[prop],
                  viewports[i][prop] - 2 * viewportOffset
                ),
                [`overflow-${axis}`]: "auto"
              });
            }
          }
          const maxWidth = viewports[0].width - 2 * viewportOffset;
          if (this.$el.offsetWidth > maxWidth) {
            addClass(this.$el, `${this.clsDrop}-stack`);
          }
          css(this.$el, "maxWidth", maxWidth);
          this.$el.hidden = false;
          this.positionAt(this.$el, this.target, this.boundary);
          for (const [i, [axis, prop, start, end]] of dirs) {
            if (this.axis === axis && includes([axis, true], this.stretch)) {
              const positionOffset = Math.abs(this.getPositionOffset(this.$el));
              const targetOffset = offset(this.target[i]);
              const elOffset = offset(this.$el);
              css(this.$el, {
                [prop]: (targetOffset[start] > elOffset[start] ? targetOffset[start] - Math.max(
                  offset(this.boundary[i])[start],
                  viewports[i][start] + viewportOffset
                ) : Math.min(
                  offset(this.boundary[i])[end],
                  viewports[i][end] - viewportOffset
                ) - targetOffset[end]) - positionOffset,
                [`overflow-${axis}`]: "auto"
              });
              this.positionAt(this.$el, this.target, this.boundary);
            }
          }
        }
      }
    };
    function getPositionedElements(el) {
      const result = [];
      apply(el, (el2) => css(el2, "position") !== "static" && result.push(el2));
      return result;
    }
    function getViewport$1(el, target) {
      return offsetViewport(overflowParents(target).find((parent2) => within(el, parent2)));
    }
    function createToggleComponent(drop) {
      const { $el } = drop.$create("toggle", query(drop.toggle, drop.$el), {
        target: drop.$el,
        mode: drop.mode
      });
      attr($el, "aria-haspopup", true);
      drop.lazyload($el);
      return $el;
    }
    function listenForResize(drop) {
      const update = () => drop.$emit();
      const off = on(window, "resize", update);
      const observer = observeResize(overflowParents(drop.$el).concat(drop.target), update);
      return () => {
        observer.disconnect();
        off();
      };
    }
    function listenForScroll(drop) {
      return on([document, ...overflowParents(drop.$el)], "scroll", () => drop.$emit(), {
        passive: true
      });
    }
    function listenForEscClose(drop) {
      return on(document, "keydown", (e) => {
        if (e.keyCode === 27) {
          drop.hide(false);
        }
      });
    }
    function listenForBackgroundClick(drop) {
      return on(document, pointerDown, ({ target }) => {
        if (!within(target, drop.$el)) {
          once(
            document,
            `${pointerUp} ${pointerCancel} scroll`,
            ({ defaultPrevented, type, target: newTarget }) => {
              if (!defaultPrevented && type === pointerUp && target === newTarget && !(drop.targetEl && within(target, drop.targetEl))) {
                drop.hide(false);
              }
            },
            true
          );
        }
      });
    }

    var formCustom = {
      mixins: [Class],
      args: "target",
      props: {
        target: Boolean
      },
      data: {
        target: false
      },
      computed: {
        input(_, $el) {
          return $(selInput, $el);
        },
        state() {
          return this.input.nextElementSibling;
        },
        target({ target }, $el) {
          return target && (target === true && parent(this.input) === $el && this.input.nextElementSibling || $(target, $el));
        }
      },
      update() {
        var _a;
        const { target, input } = this;
        if (!target) {
          return;
        }
        let option;
        const prop = isInput(target) ? "value" : "textContent";
        const prev = target[prop];
        const value = ((_a = input.files) == null ? void 0 : _a[0]) ? input.files[0].name : matches(input, "select") && (option = $$("option", input).filter((el) => el.selected)[0]) ? option.textContent : input.value;
        if (prev !== value) {
          target[prop] = value;
        }
      },
      events: [
        {
          name: "change",
          handler() {
            this.$emit();
          }
        },
        {
          name: "reset",
          el() {
            return closest(this.$el, "form");
          },
          handler() {
            this.$emit();
          }
        }
      ]
    };

    var Margin = {
      mixins: [Resize],
      props: {
        margin: String,
        firstColumn: Boolean
      },
      data: {
        margin: "uk-margin-small-top",
        firstColumn: "uk-first-column"
      },
      resizeTargets() {
        return [this.$el, ...toArray(this.$el.children)];
      },
      connected() {
        this.registerObserver(
          observeMutation(this.$el, () => this.$reset(), {
            childList: true,
            attributes: true,
            attributeFilter: ["style"]
          })
        );
      },
      update: {
        read() {
          const rows = getRows(this.$el.children);
          return {
            rows,
            columns: getColumns(rows)
          };
        },
        write({ columns, rows }) {
          for (const row of rows) {
            for (const column of row) {
              toggleClass(column, this.margin, rows[0] !== row);
              toggleClass(column, this.firstColumn, columns[0].includes(column));
            }
          }
        },
        events: ["resize"]
      }
    };
    function getRows(items) {
      return sortBy(items, "top", "bottom");
    }
    function getColumns(rows) {
      const columns = [];
      for (const row of rows) {
        const sorted = sortBy(row, "left", "right");
        for (let j = 0; j < sorted.length; j++) {
          columns[j] = columns[j] ? columns[j].concat(sorted[j]) : sorted[j];
        }
      }
      return isRtl ? columns.reverse() : columns;
    }
    function sortBy(items, startProp, endProp) {
      const sorted = [[]];
      for (const el of items) {
        if (!isVisible(el)) {
          continue;
        }
        let dim = getOffset(el);
        for (let i = sorted.length - 1; i >= 0; i--) {
          const current = sorted[i];
          if (!current[0]) {
            current.push(el);
            break;
          }
          let startDim;
          if (current[0].offsetParent === el.offsetParent) {
            startDim = getOffset(current[0]);
          } else {
            dim = getOffset(el, true);
            startDim = getOffset(current[0], true);
          }
          if (dim[startProp] >= startDim[endProp] - 1 && dim[startProp] !== startDim[startProp]) {
            sorted.push([el]);
            break;
          }
          if (dim[endProp] - 1 > startDim[startProp] || dim[startProp] === startDim[startProp]) {
            current.push(el);
            break;
          }
          if (i === 0) {
            sorted.unshift([el]);
            break;
          }
        }
      }
      return sorted;
    }
    function getOffset(element, offset = false) {
      let { offsetTop, offsetLeft, offsetHeight, offsetWidth } = element;
      if (offset) {
        [offsetTop, offsetLeft] = offsetPosition(element);
      }
      return {
        top: offsetTop,
        left: offsetLeft,
        bottom: offsetTop + offsetHeight,
        right: offsetLeft + offsetWidth
      };
    }

    var Scroll = {
      connected() {
        registerScrollListener(this._uid, () => this.$emit("scroll"));
      },
      disconnected() {
        unregisterScrollListener(this._uid);
      }
    };
    const scrollListeners = /* @__PURE__ */ new Map();
    let unbindScrollListener;
    function registerScrollListener(id, listener) {
      unbindScrollListener = unbindScrollListener || on(window, "scroll", () => scrollListeners.forEach((listener2) => listener2()), {
        passive: true,
        capture: true
      });
      scrollListeners.set(id, listener);
    }
    function unregisterScrollListener(id) {
      scrollListeners.delete(id);
      if (unbindScrollListener && !scrollListeners.size) {
        unbindScrollListener();
        unbindScrollListener = null;
      }
    }

    var grid = {
      extends: Margin,
      mixins: [Class],
      name: "grid",
      props: {
        masonry: Boolean,
        parallax: Number
      },
      data: {
        margin: "uk-grid-margin",
        clsStack: "uk-grid-stack",
        masonry: false,
        parallax: 0
      },
      connected() {
        this.masonry && addClass(this.$el, "uk-flex-top uk-flex-wrap-top");
        this.parallax && registerScrollListener(this._uid, () => this.$emit("scroll"));
      },
      disconnected() {
        unregisterScrollListener(this._uid);
      },
      update: [
        {
          write({ columns }) {
            toggleClass(this.$el, this.clsStack, columns.length < 2);
          },
          events: ["resize"]
        },
        {
          read(data) {
            let { columns, rows } = data;
            if (!columns.length || !this.masonry && !this.parallax || positionedAbsolute(this.$el)) {
              data.translates = false;
              return false;
            }
            let translates = false;
            const nodes = children(this.$el);
            const columnHeights = columns.map((column) => sumBy(column, "offsetHeight"));
            const margin = getMarginTop(nodes, this.margin) * (rows.length - 1);
            const elHeight = Math.max(...columnHeights) + margin;
            if (this.masonry) {
              columns = columns.map((column) => sortBy$1(column, "offsetTop"));
              translates = getTranslates(rows, columns);
            }
            let padding = Math.abs(this.parallax);
            if (padding) {
              padding = columnHeights.reduce(
                (newPadding, hgt, i) => Math.max(
                  newPadding,
                  hgt + margin + (i % 2 ? padding : padding / 8) - elHeight
                ),
                0
              );
            }
            return { padding, columns, translates, height: translates ? elHeight : "" };
          },
          write({ height, padding }) {
            css(this.$el, "paddingBottom", padding || "");
            height !== false && css(this.$el, "height", height);
          },
          events: ["resize"]
        },
        {
          read() {
            if (this.parallax && positionedAbsolute(this.$el)) {
              return false;
            }
            return {
              scrolled: this.parallax ? scrolledOver(this.$el) * Math.abs(this.parallax) : false
            };
          },
          write({ columns, scrolled, translates }) {
            if (scrolled === false && !translates) {
              return;
            }
            columns.forEach(
              (column, i) => column.forEach(
                (el, j) => css(
                  el,
                  "transform",
                  !scrolled && !translates ? "" : `translateY(${(translates && -translates[i][j]) + (scrolled ? i % 2 ? scrolled : scrolled / 8 : 0)}px)`
                )
              )
            );
          },
          events: ["scroll", "resize"]
        }
      ]
    };
    function positionedAbsolute(el) {
      return children(el).some((el2) => css(el2, "position") === "absolute");
    }
    function getTranslates(rows, columns) {
      const rowHeights = rows.map((row) => Math.max(...row.map((el) => el.offsetHeight)));
      return columns.map((elements) => {
        let prev = 0;
        return elements.map(
          (element, row) => prev += row ? rowHeights[row - 1] - elements[row - 1].offsetHeight : 0
        );
      });
    }
    function getMarginTop(nodes, cls) {
      const [node] = nodes.filter((el) => hasClass(el, cls));
      return toFloat(node ? css(node, "marginTop") : css(nodes[0], "paddingLeft"));
    }

    var heightMatch = {
      mixins: [Resize],
      args: "target",
      props: {
        target: String,
        row: Boolean
      },
      data: {
        target: "> *",
        row: true
      },
      computed: {
        elements: {
          get({ target }, $el) {
            return $$(target, $el);
          },
          watch() {
            this.$reset();
          }
        }
      },
      resizeTargets() {
        return [this.$el, ...this.elements];
      },
      update: {
        read() {
          return {
            rows: (this.row ? getRows(this.elements) : [this.elements]).map(match)
          };
        },
        write({ rows }) {
          for (const { heights, elements } of rows) {
            elements.forEach((el, i) => css(el, "minHeight", heights[i]));
          }
        },
        events: ["resize"]
      }
    };
    function match(elements) {
      if (elements.length < 2) {
        return { heights: [""], elements };
      }
      css(elements, "minHeight", "");
      let heights = elements.map(getHeight);
      const max = Math.max(...heights);
      return {
        heights: elements.map((el, i) => heights[i].toFixed(2) === max.toFixed(2) ? "" : max),
        elements
      };
    }
    function getHeight(element) {
      let style = false;
      if (!isVisible(element)) {
        style = element.style.display;
        css(element, "display", "block", "important");
      }
      const height = dimensions(element).height - boxModelAdjust(element, "height", "content-box");
      if (style !== false) {
        css(element, "display", style);
      }
      return height;
    }

    var heightViewport = {
      mixins: [Resize],
      props: {
        expand: Boolean,
        offsetTop: Boolean,
        offsetBottom: Boolean,
        minHeight: Number
      },
      data: {
        expand: false,
        offsetTop: false,
        offsetBottom: false,
        minHeight: 0
      },
      resizeTargets() {
        return [this.$el, ...scrollParents(this.$el)];
      },
      update: {
        read({ minHeight: prev }) {
          if (!isVisible(this.$el)) {
            return false;
          }
          let minHeight = "";
          const box = boxModelAdjust(this.$el, "height", "content-box");
          const { body, scrollingElement } = document;
          const [scrollElement] = scrollParents(this.$el);
          const { height: viewportHeight } = offsetViewport(
            scrollElement === body ? scrollingElement : scrollElement
          );
          if (this.expand) {
            minHeight = Math.max(
              viewportHeight - (dimensions(scrollElement).height - dimensions(this.$el).height) - box,
              0
            );
          } else {
            const isScrollingElement = scrollingElement === scrollElement || body === scrollElement;
            minHeight = `calc(${isScrollingElement ? "100vh" : `${viewportHeight}px`}`;
            if (this.offsetTop) {
              if (isScrollingElement) {
                const top = offsetPosition(this.$el)[0] - offsetPosition(scrollElement)[0];
                minHeight += top > 0 && top < viewportHeight / 2 ? ` - ${top}px` : "";
              } else {
                minHeight += ` - ${css(scrollElement, "paddingTop")}`;
              }
            }
            if (this.offsetBottom === true) {
              minHeight += ` - ${dimensions(this.$el.nextElementSibling).height}px`;
            } else if (isNumeric(this.offsetBottom)) {
              minHeight += ` - ${this.offsetBottom}vh`;
            } else if (this.offsetBottom && endsWith(this.offsetBottom, "px")) {
              minHeight += ` - ${toFloat(this.offsetBottom)}px`;
            } else if (isString(this.offsetBottom)) {
              minHeight += ` - ${dimensions(query(this.offsetBottom, this.$el)).height}px`;
            }
            minHeight += `${box ? ` - ${box}px` : ""})`;
          }
          return { minHeight, prev };
        },
        write({ minHeight }) {
          css(this.$el, { minHeight });
          if (this.minHeight && toFloat(css(this.$el, "minHeight")) < this.minHeight) {
            css(this.$el, "minHeight", this.minHeight);
          }
        },
        events: ["resize"]
      }
    };

    var SVG = {
      args: "src",
      props: {
        id: Boolean,
        icon: String,
        src: String,
        style: String,
        width: Number,
        height: Number,
        ratio: Number,
        class: String,
        strokeAnimation: Boolean,
        attributes: "list"
      },
      data: {
        ratio: 1,
        include: ["style", "class"],
        class: "",
        strokeAnimation: false
      },
      beforeConnect() {
        this.class += " uk-svg";
      },
      connected() {
        if (!this.icon && includes(this.src, "#")) {
          [this.src, this.icon] = this.src.split("#");
        }
        this.svg = this.getSvg().then((el) => {
          if (this._connected) {
            const svg = insertSVG(el, this.$el);
            if (this.svgEl && svg !== this.svgEl) {
              remove$1(this.svgEl);
            }
            this.applyAttributes(svg, el);
            return this.svgEl = svg;
          }
        }, noop);
        if (this.strokeAnimation) {
          this.svg.then((el) => {
            if (this._connected && el) {
              applyAnimation(el);
              this.registerObserver(
                observeIntersection(el, (records, observer) => {
                  applyAnimation(el);
                  observer.disconnect();
                })
              );
            }
          });
        }
      },
      disconnected() {
        this.svg.then((svg) => {
          if (this._connected) {
            return;
          }
          if (isVoidElement(this.$el)) {
            this.$el.hidden = false;
          }
          remove$1(svg);
          this.svgEl = null;
        });
        this.svg = null;
      },
      methods: {
        async getSvg() {
          if (isTag(this.$el, "img") && !this.$el.complete && this.$el.loading === "lazy") {
            return new Promise(
              (resolve) => once(this.$el, "load", () => resolve(this.getSvg()))
            );
          }
          return parseSVG(await loadSVG(this.src), this.icon) || Promise.reject("SVG not found.");
        },
        applyAttributes(el, ref) {
          for (const prop in this.$options.props) {
            if (includes(this.include, prop) && prop in this) {
              attr(el, prop, this[prop]);
            }
          }
          for (const attribute in this.attributes) {
            const [prop, value] = this.attributes[attribute].split(":", 2);
            attr(el, prop, value);
          }
          if (!this.id) {
            removeAttr(el, "id");
          }
          const props = ["width", "height"];
          let dimensions = props.map((prop) => this[prop]);
          if (!dimensions.some((val) => val)) {
            dimensions = props.map((prop) => attr(ref, prop));
          }
          const viewBox = attr(ref, "viewBox");
          if (viewBox && !dimensions.some((val) => val)) {
            dimensions = viewBox.split(" ").slice(2);
          }
          dimensions.forEach((val, i) => attr(el, props[i], toFloat(val) * this.ratio || null));
        }
      }
    };
    const loadSVG = memoize(async (src) => {
      if (src) {
        if (startsWith(src, "data:")) {
          return decodeURIComponent(src.split(",")[1]);
        } else {
          return (await fetch(src)).text();
        }
      } else {
        return Promise.reject();
      }
    });
    function parseSVG(svg, icon) {
      if (icon && includes(svg, "<symbol")) {
        svg = parseSymbols(svg, icon) || svg;
      }
      svg = $(svg.substr(svg.indexOf("<svg")));
      return (svg == null ? void 0 : svg.hasChildNodes()) && svg;
    }
    const symbolRe = /<symbol([^]*?id=(['"])(.+?)\2[^]*?<\/)symbol>/g;
    const symbols = {};
    function parseSymbols(svg, icon) {
      if (!symbols[svg]) {
        symbols[svg] = {};
        symbolRe.lastIndex = 0;
        let match;
        while (match = symbolRe.exec(svg)) {
          symbols[svg][match[3]] = `<svg xmlns="http://www.w3.org/2000/svg"${match[1]}svg>`;
        }
      }
      return symbols[svg][icon];
    }
    function applyAnimation(el) {
      const length = getMaxPathLength(el);
      if (length) {
        el.style.setProperty("--uk-animation-stroke", length);
      }
    }
    function getMaxPathLength(el) {
      return Math.ceil(
        Math.max(
          0,
          ...$$("[stroke]", el).map((stroke) => {
            try {
              return stroke.getTotalLength();
            } catch (e) {
              return 0;
            }
          })
        )
      );
    }
    function insertSVG(el, root) {
      if (isVoidElement(root) || isTag(root, "canvas")) {
        root.hidden = true;
        const next = root.nextElementSibling;
        return equals(el, next) ? next : after(root, el);
      }
      const last = root.lastElementChild;
      return equals(el, last) ? last : append(root, el);
    }
    function equals(el, other) {
      return isTag(el, "svg") && isTag(other, "svg") && el.innerHTML === other.innerHTML;
    }

    var closeIcon = "<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" xmlns=\"http://www.w3.org/2000/svg\"><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"1\" y1=\"1\" x2=\"13\" y2=\"13\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"13\" y1=\"1\" x2=\"1\" y2=\"13\"/></svg>";

    var closeLarge = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" x1=\"1\" y1=\"1\" x2=\"19\" y2=\"19\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" x1=\"19\" y1=\"1\" x2=\"1\" y2=\"19\"/></svg>";

    var marker = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"9\" y=\"4\" width=\"1\" height=\"11\"/><rect x=\"4\" y=\"9\" width=\"11\" height=\"1\"/></svg>";

    var navParentIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" viewBox=\"0 0 12 12\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" points=\"1 3.5 6 8.5 11 3.5\"/></svg>";

    var navParentIconLarge = "<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" points=\"1 4 7 10 13 4\"/></svg>";

    var navbarParentIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" viewBox=\"0 0 12 12\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" points=\"1 3.5 6 8.5 11 3.5\"/></svg>";

    var navbarToggleIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><style>.uk-navbar-toggle-animate svg>[class*=line-]{transition:.2s ease-in-out;transition-property:transform,opacity;transform-origin:center;opacity:1}.uk-navbar-toggle svg>.line-3{opacity:0}.uk-navbar-toggle-animate[aria-expanded=true] svg>.line-3{opacity:1}.uk-navbar-toggle-animate[aria-expanded=true] svg>.line-2{transform:rotate(45deg)}.uk-navbar-toggle-animate[aria-expanded=true] svg>.line-3{transform:rotate(-45deg)}.uk-navbar-toggle-animate[aria-expanded=true] svg>.line-1,.uk-navbar-toggle-animate[aria-expanded=true] svg>.line-4{opacity:0}.uk-navbar-toggle-animate[aria-expanded=true] svg>.line-1{transform:translateY(6px) scaleX(0)}.uk-navbar-toggle-animate[aria-expanded=true] svg>.line-4{transform:translateY(-6px) scaleX(0)}</style><rect class=\"line-1\" y=\"3\" width=\"20\" height=\"2\"/><rect class=\"line-2\" y=\"9\" width=\"20\" height=\"2\"/><rect class=\"line-3\" y=\"9\" width=\"20\" height=\"2\"/><rect class=\"line-4\" y=\"15\" width=\"20\" height=\"2\"/></svg>";

    var overlayIcon = "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"19\" y=\"0\" width=\"1\" height=\"40\"/><rect x=\"0\" y=\"19\" width=\"40\" height=\"1\"/></svg>";

    var paginationNext = "<svg width=\"7\" height=\"12\" viewBox=\"0 0 7 12\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"1 1 6 6 1 11\"/></svg>";

    var paginationPrevious = "<svg width=\"7\" height=\"12\" viewBox=\"0 0 7 12\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"6 1 1 6 6 11\"/></svg>";

    var searchIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" cx=\"9\" cy=\"9\" r=\"7\"/><path fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" d=\"M14,14 L18,18 L14,14 Z\"/></svg>";

    var searchLarge = "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.8\" cx=\"17.5\" cy=\"17.5\" r=\"16.5\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.8\" x1=\"38\" y1=\"39\" x2=\"29\" y2=\"30\"/></svg>";

    var searchNavbar = "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" cx=\"10.5\" cy=\"10.5\" r=\"9.5\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"23\" y1=\"23\" x2=\"17\" y2=\"17\"/></svg>";

    var slidenavNext = "<svg width=\"14\" height=\"24\" viewBox=\"0 0 14 24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" points=\"1.225,23 12.775,12 1.225,1 \"/></svg>";

    var slidenavNextLarge = "<svg width=\"25\" height=\"40\" viewBox=\"0 0 25 40\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"2\" points=\"4.002,38.547 22.527,20.024 4,1.5 \"/></svg>";

    var slidenavPrevious = "<svg width=\"14\" height=\"24\" viewBox=\"0 0 14 24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" points=\"12.775,1 1.225,12 12.775,23 \"/></svg>";

    var slidenavPreviousLarge = "<svg width=\"25\" height=\"40\" viewBox=\"0 0 25 40\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"2\" points=\"20.527,1.5 2,20.024 20.525,38.547 \"/></svg>";

    var spinner = "<svg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" cx=\"15\" cy=\"15\" r=\"14\"/></svg>";

    var subnavParentIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" viewBox=\"0 0 12 12\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" points=\"1 3.5 6 8.5 11 3.5\"/></svg>";

    var totop = "<svg width=\"18\" height=\"10\" viewBox=\"0 0 18 10\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"1 9 9 1 17 9 \"/></svg>";

    const icons = {
      spinner,
      totop,
      marker,
      "close-icon": closeIcon,
      "close-large": closeLarge,
      "nav-parent-icon": navParentIcon,
      "nav-parent-icon-large": navParentIconLarge,
      "navbar-parent-icon": navbarParentIcon,
      "navbar-toggle-icon": navbarToggleIcon,
      "overlay-icon": overlayIcon,
      "pagination-next": paginationNext,
      "pagination-previous": paginationPrevious,
      "search-icon": searchIcon,
      "search-large": searchLarge,
      "search-navbar": searchNavbar,
      "slidenav-next": slidenavNext,
      "slidenav-next-large": slidenavNextLarge,
      "slidenav-previous": slidenavPrevious,
      "slidenav-previous-large": slidenavPreviousLarge,
      "subnav-parent-icon": subnavParentIcon
    };
    const Icon = {
      install: install$1,
      extends: SVG,
      args: "icon",
      props: ["icon"],
      data: { include: [] },
      isIcon: true,
      beforeConnect() {
        addClass(this.$el, "uk-icon");
      },
      methods: {
        async getSvg() {
          const icon = getIcon(this.icon);
          if (!icon) {
            throw "Icon not found.";
          }
          return icon;
        }
      }
    };
    const IconComponent = {
      args: false,
      extends: Icon,
      data: (vm) => ({
        icon: hyphenate(vm.constructor.options.name)
      }),
      beforeConnect() {
        addClass(this.$el, this.$options.id);
      }
    };
    const NavParentIcon = {
      extends: IconComponent,
      beforeConnect() {
        const icon = this.$props.icon;
        this.icon = closest(this.$el, ".uk-nav-primary") ? `${icon}-large` : icon;
      }
    };
    const Slidenav = {
      extends: IconComponent,
      beforeConnect() {
        addClass(this.$el, "uk-slidenav");
        const icon = this.$props.icon;
        this.icon = hasClass(this.$el, "uk-slidenav-large") ? `${icon}-large` : icon;
      }
    };
    const Search = {
      extends: IconComponent,
      beforeConnect() {
        this.icon = hasClass(this.$el, "uk-search-icon") && parents(this.$el, ".uk-search-large").length ? "search-large" : parents(this.$el, ".uk-search-navbar").length ? "search-navbar" : this.$props.icon;
      }
    };
    const Close = {
      extends: IconComponent,
      beforeConnect() {
        this.icon = `close-${hasClass(this.$el, "uk-close-large") ? "large" : "icon"}`;
      }
    };
    const Spinner = {
      extends: IconComponent,
      methods: {
        async getSvg() {
          const icon = await Icon.methods.getSvg.call(this);
          if (this.ratio !== 1) {
            css($("circle", icon), "strokeWidth", 1 / this.ratio);
          }
          return icon;
        }
      }
    };
    const parsed = {};
    function install$1(UIkit) {
      UIkit.icon.add = (name, svg) => {
        const added = isString(name) ? { [name]: svg } : name;
        each(added, (svg2, name2) => {
          icons[name2] = svg2;
          delete parsed[name2];
        });
        if (UIkit._initialized) {
          apply(
            document.body,
            (el) => each(UIkit.getComponents(el), (cmp) => {
              cmp.$options.isIcon && cmp.icon in added && cmp.$reset();
            })
          );
        }
      };
    }
    function getIcon(icon) {
      if (!icons[icon]) {
        return null;
      }
      if (!parsed[icon]) {
        parsed[icon] = $((icons[applyRtl(icon)] || icons[icon]).trim());
      }
      return parsed[icon].cloneNode(true);
    }
    function applyRtl(icon) {
      return isRtl ? swap(swap(icon, "left", "right"), "previous", "next") : icon;
    }

    const nativeLazyLoad = inBrowser && "loading" in HTMLImageElement.prototype;
    var img = {
      args: "dataSrc",
      props: {
        dataSrc: String,
        sources: String,
        margin: String,
        target: String,
        loading: String
      },
      data: {
        dataSrc: "",
        sources: false,
        margin: "50%",
        target: false,
        loading: "lazy"
      },
      connected() {
        if (this.loading !== "lazy") {
          this.load();
          return;
        }
        const target = [this.$el, ...queryAll(this.$props.target, this.$el)];
        if (nativeLazyLoad && isImg(this.$el)) {
          this.$el.loading = "lazy";
          setSrcAttrs(this.$el);
          if (target.length === 1) {
            return;
          }
        }
        ensureSrcAttribute(this.$el);
        this.registerObserver(
          observeIntersection(
            target,
            (entries, observer) => {
              this.load();
              observer.disconnect();
            },
            { rootMargin: this.margin }
          )
        );
      },
      disconnected() {
        if (this._data.image) {
          this._data.image.onload = "";
        }
      },
      methods: {
        load() {
          if (this._data.image) {
            return this._data.image;
          }
          const image = isImg(this.$el) ? this.$el : getImageFromElement(this.$el, this.dataSrc, this.sources);
          removeAttr(image, "loading");
          setSrcAttrs(this.$el, image.currentSrc);
          return this._data.image = image;
        }
      }
    };
    function setSrcAttrs(el, src) {
      if (isImg(el)) {
        const parentNode = parent(el);
        const elements = isTag(parentNode, "picture") ? children(parentNode) : [el];
        elements.forEach((el2) => setSourceProps(el2, el2));
      } else if (src) {
        const change = !includes(el.style.backgroundImage, src);
        if (change) {
          css(el, "backgroundImage", `url(${escape(src)})`);
          trigger(el, createEvent("load", false));
        }
      }
    }
    const srcProps = ["data-src", "data-srcset", "sizes"];
    function setSourceProps(sourceEl, targetEl) {
      srcProps.forEach((prop) => {
        const value = data(sourceEl, prop);
        if (value) {
          attr(targetEl, prop.replace(/^(data-)+/, ""), value);
        }
      });
    }
    function getImageFromElement(el, src, sources) {
      const img = new Image();
      wrapInPicture(img, sources);
      setSourceProps(el, img);
      img.onload = () => {
        setSrcAttrs(el, img.currentSrc);
      };
      attr(img, "src", src);
      return img;
    }
    function wrapInPicture(img, sources) {
      sources = parseSources(sources);
      if (sources.length) {
        const picture = fragment("<picture>");
        for (const attrs of sources) {
          const source = fragment("<source>");
          attr(source, attrs);
          append(picture, source);
        }
        append(picture, img);
      }
    }
    function parseSources(sources) {
      if (!sources) {
        return [];
      }
      if (startsWith(sources, "[")) {
        try {
          sources = JSON.parse(sources);
        } catch (e) {
          sources = [];
        }
      } else {
        sources = parseOptions(sources);
      }
      if (!isArray(sources)) {
        sources = [sources];
      }
      return sources.filter((source) => !isEmpty(source));
    }
    function ensureSrcAttribute(el) {
      if (isImg(el) && !hasAttr(el, "src")) {
        attr(el, "src", 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"></svg>');
      }
    }
    function isImg(el) {
      return isTag(el, "img");
    }

    var Media = {
      props: {
        media: Boolean
      },
      data: {
        media: false
      },
      connected() {
        const media = toMedia(this.media, this.$el);
        this.matchMedia = true;
        if (media) {
          this.mediaObj = window.matchMedia(media);
          const handler = () => {
            this.matchMedia = this.mediaObj.matches;
            trigger(this.$el, createEvent("mediachange", false, true, [this.mediaObj]));
          };
          this.offMediaObj = on(this.mediaObj, "change", () => {
            handler();
            this.$emit("resize");
          });
          handler();
        }
      },
      disconnected() {
        var _a;
        (_a = this.offMediaObj) == null ? void 0 : _a.call(this);
      }
    };
    function toMedia(value, element) {
      if (isString(value)) {
        if (startsWith(value, "@")) {
          value = toFloat(css(element, `--uk-breakpoint-${value.substr(1)}`));
        } else if (isNaN(value)) {
          return value;
        }
      }
      return value && isNumeric(value) ? `(min-width: ${value}px)` : "";
    }

    var leader = {
      mixins: [Class, Media, Resize],
      props: {
        fill: String
      },
      data: {
        fill: "",
        clsWrapper: "uk-leader-fill",
        clsHide: "uk-leader-hide",
        attrFill: "data-fill"
      },
      computed: {
        fill({ fill }) {
          return fill || css(this.$el, "--uk-leader-fill-content");
        }
      },
      connected() {
        [this.wrapper] = wrapInner(this.$el, `<span class="${this.clsWrapper}">`);
      },
      disconnected() {
        unwrap(this.wrapper.childNodes);
      },
      update: {
        read() {
          const width = Math.trunc(this.$el.offsetWidth / 2);
          return {
            width,
            fill: this.fill,
            hide: !this.matchMedia
          };
        },
        write({ width, fill, hide }) {
          toggleClass(this.wrapper, this.clsHide, hide);
          attr(this.wrapper, this.attrFill, new Array(width).join(fill));
        },
        events: ["resize"]
      }
    };

    var modal = {
      install,
      mixins: [Modal],
      data: {
        clsPage: "uk-modal-page",
        selPanel: ".uk-modal-dialog",
        selClose: ".uk-modal-close, .uk-modal-close-default, .uk-modal-close-outside, .uk-modal-close-full"
      },
      events: [
        {
          name: "show",
          self: true,
          handler() {
            if (hasClass(this.panel, "uk-margin-auto-vertical")) {
              addClass(this.$el, "uk-flex");
            } else {
              css(this.$el, "display", "block");
            }
            height(this.$el);
          }
        },
        {
          name: "hidden",
          self: true,
          handler() {
            css(this.$el, "display", "");
            removeClass(this.$el, "uk-flex");
          }
        }
      ]
    };
    function install({ modal }) {
      modal.dialog = function(content, options) {
        const dialog = modal(
          `<div class="uk-modal"> <div class="uk-modal-dialog">${content}</div> </div>`,
          options
        );
        dialog.show();
        on(
          dialog.$el,
          "hidden",
          async () => {
            await Promise.resolve();
            dialog.$destroy(true);
          },
          { self: true }
        );
        return dialog;
      };
      modal.alert = function(message, options) {
        return openDialog(
          ({ labels }) => `<div class="uk-modal-body">${isString(message) ? message : html(message)}</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-primary uk-modal-close" autofocus>${labels.ok}</button> </div>`,
          options,
          (deferred) => deferred.resolve()
        );
      };
      modal.confirm = function(message, options) {
        return openDialog(
          ({ labels }) => `<form> <div class="uk-modal-body">${isString(message) ? message : html(message)}</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">${labels.cancel}</button> <button class="uk-button uk-button-primary" autofocus>${labels.ok}</button> </div> </form>`,
          options,
          (deferred) => deferred.reject()
        );
      };
      modal.prompt = function(message, value, options) {
        return openDialog(
          ({ labels }) => `<form class="uk-form-stacked"> <div class="uk-modal-body"> <label>${isString(message) ? message : html(message)}</label> <input class="uk-input" value="${value || ""}" autofocus> </div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">${labels.cancel}</button> <button class="uk-button uk-button-primary">${labels.ok}</button> </div> </form>`,
          options,
          (deferred) => deferred.resolve(null),
          (dialog) => $("input", dialog.$el).value
        );
      };
      modal.labels = {
        ok: "Ok",
        cancel: "Cancel"
      };
      function openDialog(tmpl, options, hideFn, submitFn) {
        options = { bgClose: false, escClose: true, labels: modal.labels, ...options };
        const dialog = modal.dialog(tmpl(options), options);
        const deferred = new Deferred();
        let resolved = false;
        on(dialog.$el, "submit", "form", (e) => {
          e.preventDefault();
          deferred.resolve(submitFn == null ? void 0 : submitFn(dialog));
          resolved = true;
          dialog.hide();
        });
        on(dialog.$el, "hide", () => !resolved && hideFn(deferred));
        deferred.promise.dialog = dialog;
        return deferred.promise;
      }
    }

    var nav = {
      extends: Accordion,
      data: {
        targets: "> .uk-parent",
        toggle: "> a",
        content: "> ul"
      }
    };

    var navbar = {
      mixins: [Class, Container],
      props: {
        dropdown: String,
        align: String,
        clsDrop: String,
        boundary: Boolean,
        dropbar: Boolean,
        dropbarAnchor: Boolean,
        duration: Number,
        mode: Boolean,
        offset: Boolean,
        stretch: Boolean,
        delayShow: Boolean,
        delayHide: Boolean,
        target: Boolean,
        targetX: Boolean,
        targetY: Boolean,
        animation: Boolean,
        animateOut: Boolean
      },
      data: {
        dropdown: ".uk-navbar-nav > li > a, .uk-navbar-item, .uk-navbar-toggle",
        align: isRtl ? "right" : "left",
        clsDrop: "uk-navbar-dropdown",
        boundary: true,
        dropbar: false,
        dropbarAnchor: false,
        duration: 200,
        container: false
      },
      computed: {
        dropbarAnchor({ dropbarAnchor }, $el) {
          return query(dropbarAnchor, $el) || $el;
        },
        dropbar: {
          get({ dropbar }) {
            if (!dropbar) {
              return null;
            }
            dropbar = this._dropbar || query(dropbar, this.$el) || $("+ .uk-navbar-dropbar", this.$el);
            return dropbar ? dropbar : this._dropbar = $("<div></div>");
          },
          watch(dropbar) {
            addClass(dropbar, "uk-dropbar", "uk-dropbar-top", "uk-navbar-dropbar");
          },
          immediate: true
        },
        dropContainer(_, $el) {
          return this.container || $el;
        },
        dropdowns: {
          get({ clsDrop }, $el) {
            var _a;
            const dropdowns = $$(`.${clsDrop}`, $el);
            if (this.dropContainer !== $el) {
              for (const el of $$(`.${clsDrop}`, this.dropContainer)) {
                const target = (_a = this.getDropdown(el)) == null ? void 0 : _a.targetEl;
                if (!includes(dropdowns, el) && target && within(target, this.$el)) {
                  dropdowns.push(el);
                }
              }
            }
            return dropdowns;
          },
          watch(dropdowns) {
            this.$create(
              "drop",
              dropdowns.filter((el) => !this.getDropdown(el)),
              {
                ...this.$props,
                flip: false,
                shift: true,
                pos: `bottom-${this.align}`,
                boundary: this.boundary === true ? this.$el : this.boundary
              }
            );
          },
          immediate: true
        },
        toggles: {
          get({ dropdown }, $el) {
            return $$(dropdown, $el);
          },
          watch() {
            const justify = hasClass(this.$el, "uk-navbar-justify");
            for (const container of $$(
              ".uk-navbar-nav, .uk-navbar-left, .uk-navbar-right",
              this.$el
            )) {
              css(container, "flexGrow", justify ? $$(this.dropdown, container).length : "");
            }
          },
          immediate: true
        }
      },
      disconnected() {
        this.dropbar && remove$1(this.dropbar);
        delete this._dropbar;
      },
      events: [
        {
          name: "mouseover focusin",
          delegate() {
            return this.dropdown;
          },
          handler({ current }) {
            const active2 = this.getActive();
            if (active2 && includes(active2.mode, "hover") && active2.targetEl && !within(active2.targetEl, current) && !active2.isDelaying) {
              active2.hide(false);
            }
          }
        },
        {
          name: "keydown",
          delegate() {
            return this.dropdown;
          },
          handler(e) {
            const { current, keyCode } = e;
            const active2 = this.getActive();
            if (keyCode === keyMap.DOWN && hasAttr(current, "aria-expanded")) {
              e.preventDefault();
              if (!active2 || active2.targetEl !== current) {
                current.click();
                once(
                  this.dropContainer,
                  "show",
                  ({ target }) => focusFirstFocusableElement(target)
                );
              } else {
                focusFirstFocusableElement(active2.$el);
              }
            }
            handleNavItemNavigation(e, this.toggles, active2);
          }
        },
        {
          name: "keydown",
          el() {
            return this.dropContainer;
          },
          delegate() {
            return `.${this.clsDrop}`;
          },
          handler(e) {
            var _a;
            const { current, keyCode } = e;
            if (!includes(this.dropdowns, current)) {
              return;
            }
            const active2 = this.getActive();
            const elements = $$(selFocusable, current);
            const i = findIndex(elements, (el) => matches(el, ":focus"));
            if (keyCode === keyMap.UP) {
              e.preventDefault();
              if (i > 0) {
                elements[i - 1].focus();
              }
            }
            if (keyCode === keyMap.DOWN) {
              e.preventDefault();
              if (i < elements.length - 1) {
                elements[i + 1].focus();
              }
            }
            if (keyCode === keyMap.ESC) {
              (_a = active2.targetEl) == null ? void 0 : _a.focus();
            }
            handleNavItemNavigation(e, this.toggles, active2);
          }
        },
        {
          name: "mouseleave",
          el() {
            return this.dropbar;
          },
          filter() {
            return this.dropbar;
          },
          handler() {
            const active2 = this.getActive();
            if (active2 && includes(active2.mode, "hover") && !this.dropdowns.some((el) => matches(el, ":hover"))) {
              active2.hide();
            }
          }
        },
        {
          name: "show",
          el() {
            return this.dropContainer;
          },
          filter() {
            return this.dropbar;
          },
          handler({ target }) {
            if (!this.isDropbarDrop(target)) {
              return;
            }
            if (this.dropbar.previousElementSibling !== this.dropbarAnchor) {
              after(this.dropbarAnchor, this.dropbar);
            }
            addClass(target, `${this.clsDrop}-dropbar`);
            const drop = this.getDropdown(target);
            const adjustHeight = () => {
              const targetOffsets = parents(target, `.${this.clsDrop}`).concat(target).map((el) => offset(el));
              const minTop = Math.min(...targetOffsets.map(({ top }) => top));
              const maxBottom = Math.max(...targetOffsets.map(({ bottom }) => bottom));
              const dropbarOffset = offset(this.dropbar);
              css(this.dropbar, "top", this.dropbar.offsetTop - (dropbarOffset.top - minTop));
              this.transitionTo(
                maxBottom - minTop + toFloat(css(target, "marginBottom")),
                target
              );
            };
            this._observer = observeResize([drop.$el, ...drop.target], adjustHeight);
            adjustHeight();
          }
        },
        {
          name: "beforehide",
          el() {
            return this.dropContainer;
          },
          filter() {
            return this.dropbar;
          },
          handler(e) {
            const active2 = this.getActive();
            if (matches(this.dropbar, ":hover") && active2.$el === e.target && !this.toggles.some((el) => active2.targetEl !== el && matches(el, ":focus"))) {
              e.preventDefault();
            }
          }
        },
        {
          name: "hide",
          el() {
            return this.dropContainer;
          },
          filter() {
            return this.dropbar;
          },
          handler({ target }) {
            var _a;
            if (!this.isDropbarDrop(target)) {
              return;
            }
            (_a = this._observer) == null ? void 0 : _a.disconnect();
            const active2 = this.getActive();
            if (!active2 || active2.$el === target) {
              this.transitionTo(0);
            }
          }
        }
      ],
      methods: {
        getActive() {
          var _a;
          return includes(this.dropdowns, (_a = active) == null ? void 0 : _a.$el) && active;
        },
        async transitionTo(newHeight, el) {
          const { dropbar } = this;
          const oldHeight = height(dropbar);
          el = oldHeight < newHeight && el;
          await Transition.cancel([el, dropbar]);
          css(el, "clipPath", `polygon(0 0,100% 0,100% ${oldHeight}px,0 ${oldHeight}px)`);
          height(dropbar, oldHeight);
          await Promise.all([
            Transition.start(dropbar, { height: newHeight }, this.duration),
            Transition.start(
              el,
              {
                clipPath: `polygon(0 0,100% 0,100% ${newHeight}px,0 ${newHeight}px)`
              },
              this.duration
            ).finally(() => css(el, { clipPath: "" }))
          ]).catch(noop);
        },
        getDropdown(el) {
          return this.$getComponent(el, "drop") || this.$getComponent(el, "dropdown");
        },
        isDropbarDrop(el) {
          return this.getDropdown(el) && hasClass(el, this.clsDrop);
        }
      }
    };
    function handleNavItemNavigation(e, toggles, active2) {
      var _a, _b, _c;
      const { current, keyCode } = e;
      const target = active2.targetEl || current;
      const i = toggles.indexOf(target);
      if (keyCode === keyMap.LEFT && i > 0) {
        (_a = active2.hide) == null ? void 0 : _a.call(active2, false);
        toggles[i - 1].focus();
      }
      if (keyCode === keyMap.RIGHT && i < toggles.length - 1) {
        (_b = active2.hide) == null ? void 0 : _b.call(active2, false);
        toggles[i + 1].focus();
      }
      if (keyCode === keyMap.TAB) {
        target.focus();
        (_c = active2.hide) == null ? void 0 : _c.call(active2, false);
      }
    }
    function focusFirstFocusableElement(el) {
      var _a;
      if (!$(":focus", el)) {
        (_a = $(selFocusable, el)) == null ? void 0 : _a.focus();
      }
    }
    const keyMap = {
      TAB: 9,
      ESC: 27,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40
    };

    var Swipe = {
      props: {
        swiping: Boolean
      },
      data: {
        swiping: true
      },
      computed: {
        swipeTarget(props, $el) {
          return $el;
        }
      },
      connected() {
        if (!this.swiping) {
          return;
        }
        registerEvent(this, {
          el: this.swipeTarget,
          name: pointerDown,
          passive: true,
          handler(e) {
            if (!isTouch(e)) {
              return;
            }
            const pos = getEventPos(e);
            const target = "tagName" in e.target ? e.target : parent(e.target);
            once(document, `${pointerUp} ${pointerCancel} scroll`, (e2) => {
              const { x, y } = getEventPos(e2);
              if (e2.type !== "scroll" && target && x && Math.abs(pos.x - x) > 100 || y && Math.abs(pos.y - y) > 100) {
                setTimeout(() => {
                  trigger(target, "swipe");
                  trigger(target, `swipe${swipeDirection(pos.x, pos.y, x, y)}`);
                });
              }
            });
          }
        });
      }
    };
    function swipeDirection(x1, y1, x2, y2) {
      return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? "Left" : "Right" : y1 - y2 > 0 ? "Up" : "Down";
    }

    var offcanvas = {
      mixins: [Modal, Swipe],
      args: "mode",
      props: {
        mode: String,
        flip: Boolean,
        overlay: Boolean
      },
      data: {
        mode: "slide",
        flip: false,
        overlay: false,
        clsPage: "uk-offcanvas-page",
        clsContainer: "uk-offcanvas-container",
        selPanel: ".uk-offcanvas-bar",
        clsFlip: "uk-offcanvas-flip",
        clsContainerAnimation: "uk-offcanvas-container-animation",
        clsSidebarAnimation: "uk-offcanvas-bar-animation",
        clsMode: "uk-offcanvas",
        clsOverlay: "uk-offcanvas-overlay",
        selClose: ".uk-offcanvas-close",
        container: false
      },
      computed: {
        clsFlip({ flip, clsFlip }) {
          return flip ? clsFlip : "";
        },
        clsOverlay({ overlay, clsOverlay }) {
          return overlay ? clsOverlay : "";
        },
        clsMode({ mode, clsMode }) {
          return `${clsMode}-${mode}`;
        },
        clsSidebarAnimation({ mode, clsSidebarAnimation }) {
          return mode === "none" || mode === "reveal" ? "" : clsSidebarAnimation;
        },
        clsContainerAnimation({ mode, clsContainerAnimation }) {
          return mode !== "push" && mode !== "reveal" ? "" : clsContainerAnimation;
        },
        transitionElement({ mode }) {
          return mode === "reveal" ? parent(this.panel) : this.panel;
        }
      },
      update: {
        read() {
          if (this.isToggled() && !isVisible(this.$el)) {
            this.hide();
          }
        },
        events: ["resize"]
      },
      events: [
        {
          name: "touchmove",
          self: true,
          passive: false,
          filter() {
            return this.overlay;
          },
          handler(e) {
            e.cancelable && e.preventDefault();
          }
        },
        {
          name: "show",
          self: true,
          handler() {
            if (this.mode === "reveal" && !hasClass(parent(this.panel), this.clsMode)) {
              wrapAll(this.panel, "<div>");
              addClass(parent(this.panel), this.clsMode);
            }
            const { body, scrollingElement } = document;
            addClass(body, this.clsContainer, this.clsFlip);
            css(body, "touch-action", "pan-y pinch-zoom");
            css(this.$el, "display", "block");
            css(this.panel, "maxWidth", scrollingElement.clientWidth);
            addClass(this.$el, this.clsOverlay);
            addClass(
              this.panel,
              this.clsSidebarAnimation,
              this.mode === "reveal" ? "" : this.clsMode
            );
            height(body);
            addClass(body, this.clsContainerAnimation);
            this.clsContainerAnimation && suppressUserScale();
          }
        },
        {
          name: "hide",
          self: true,
          handler() {
            removeClass(document.body, this.clsContainerAnimation);
            css(document.body, "touch-action", "");
          }
        },
        {
          name: "hidden",
          self: true,
          handler() {
            this.clsContainerAnimation && resumeUserScale();
            if (this.mode === "reveal") {
              unwrap(this.panel);
            }
            removeClass(this.panel, this.clsSidebarAnimation, this.clsMode);
            removeClass(this.$el, this.clsOverlay);
            css(this.$el, "display", "");
            css(this.panel, "maxWidth", "");
            removeClass(document.body, this.clsContainer, this.clsFlip);
          }
        },
        {
          name: "swipeLeft swipeRight",
          handler(e) {
            if (this.isToggled() && endsWith(e.type, "Left") ^ this.flip) {
              this.hide();
            }
          }
        }
      ]
    };
    function suppressUserScale() {
      getViewport().content += ",user-scalable=0";
    }
    function resumeUserScale() {
      const viewport = getViewport();
      viewport.content = viewport.content.replace(/,user-scalable=0$/, "");
    }
    function getViewport() {
      return $('meta[name="viewport"]', document.head) || append(document.head, '<meta name="viewport">');
    }

    var overflowAuto = {
      mixins: [Class, Resize],
      props: {
        selContainer: String,
        selContent: String,
        minHeight: Number
      },
      data: {
        selContainer: ".uk-modal",
        selContent: ".uk-modal-dialog",
        minHeight: 150
      },
      computed: {
        container({ selContainer }, $el) {
          return closest($el, selContainer);
        },
        content({ selContent }, $el) {
          return closest($el, selContent);
        }
      },
      resizeTargets() {
        return [this.container, this.content];
      },
      update: {
        read() {
          if (!this.content || !this.container || !isVisible(this.$el)) {
            return false;
          }
          return {
            max: Math.max(
              this.minHeight,
              height(this.container) - (dimensions(this.content).height - height(this.$el))
            )
          };
        },
        write({ max }) {
          css(this.$el, { minHeight: this.minHeight, maxHeight: max });
        },
        events: ["resize"]
      }
    };

    var responsive = {
      mixins: [Resize],
      props: ["width", "height"],
      resizeTargets() {
        return [this.$el, parent(this.$el)];
      },
      connected() {
        addClass(this.$el, "uk-responsive-width");
      },
      update: {
        read() {
          return isVisible(this.$el) && this.width && this.height ? { width: width(parent(this.$el)), height: this.height } : false;
        },
        write(dim) {
          height(
            this.$el,
            Dimensions.contain(
              {
                height: this.height,
                width: this.width
              },
              dim
            ).height
          );
        },
        events: ["resize"]
      }
    };

    var scroll = {
      props: {
        offset: Number
      },
      data: {
        offset: 0
      },
      connected() {
        registerClick(this);
      },
      disconnected() {
        unregisterClick(this);
      },
      methods: {
        async scrollTo(el) {
          el = el && $(el) || document.body;
          if (trigger(this.$el, "beforescroll", [this, el])) {
            await scrollIntoView(el, { offset: this.offset });
            trigger(this.$el, "scrolled", [this, el]);
          }
        }
      }
    };
    const components$1 = /* @__PURE__ */ new Set();
    function registerClick(cmp) {
      if (!components$1.size) {
        on(document, "click", clickHandler);
      }
      components$1.add(cmp);
    }
    function unregisterClick(cmp) {
      components$1.delete(cmp);
      if (!components$1.size) {
        off(document, "click", clickHandler);
      }
    }
    function clickHandler(e) {
      if (e.defaultPrevented) {
        return;
      }
      for (const component of components$1) {
        if (within(e.target, component.$el) && isSameSiteAnchor(component.$el)) {
          e.preventDefault();
          component.scrollTo(getTargetElement(component.$el));
        }
      }
    }
    function getTargetElement(el) {
      if (isSameSiteAnchor(el)) {
        const id = decodeURIComponent(el.hash).substring(1);
        return document.getElementById(id) || document.getElementsByName(id)[0];
      }
    }

    var scrollspy = {
      mixins: [Scroll],
      args: "cls",
      props: {
        cls: String,
        target: String,
        hidden: Boolean,
        margin: String,
        repeat: Boolean,
        delay: Number
      },
      data: () => ({
        cls: "",
        target: false,
        hidden: true,
        margin: "-1px",
        repeat: false,
        delay: 0,
        inViewClass: "uk-scrollspy-inview"
      }),
      computed: {
        elements: {
          get({ target }, $el) {
            return target ? $$(target, $el) : [$el];
          },
          watch(elements, prev) {
            if (this.hidden) {
              css(filter(elements, `:not(.${this.inViewClass})`), "opacity", 0);
            }
            if (!isEqual(elements, prev)) {
              this.$reset();
            }
          },
          immediate: true
        }
      },
      connected() {
        this._data.elements = /* @__PURE__ */ new Map();
        this.registerObserver(
          observeIntersection(
            this.elements,
            (records) => {
              const elements = this._data.elements;
              for (const { target: el, isIntersecting } of records) {
                if (!elements.has(el)) {
                  elements.set(el, {
                    cls: data(el, "uk-scrollspy-class") || this.cls
                  });
                }
                const state = elements.get(el);
                if (!this.repeat && state.show) {
                  continue;
                }
                state.show = isIntersecting;
              }
              this.$emit();
            },
            { rootMargin: this.margin },
            false
          )
        );
      },
      disconnected() {
        for (const [el, state] of this._data.elements.entries()) {
          removeClass(el, this.inViewClass, (state == null ? void 0 : state.cls) || "");
        }
      },
      update: [
        {
          write(data) {
            for (const [el, state] of data.elements.entries()) {
              if (state.show && !state.inview && !state.queued) {
                state.queued = true;
                data.promise = (data.promise || Promise.resolve()).then(() => new Promise((resolve) => setTimeout(resolve, this.delay))).then(() => {
                  this.toggle(el, true);
                  setTimeout(() => {
                    state.queued = false;
                    this.$emit();
                  }, 300);
                });
              } else if (!state.show && state.inview && !state.queued && this.repeat) {
                this.toggle(el, false);
              }
            }
          }
        }
      ],
      methods: {
        toggle(el, inview) {
          var _a;
          const state = this._data.elements.get(el);
          if (!state) {
            return;
          }
          (_a = state.off) == null ? void 0 : _a.call(state);
          css(el, "opacity", !inview && this.hidden ? 0 : "");
          toggleClass(el, this.inViewClass, inview);
          toggleClass(el, state.cls);
          if (/\buk-animation-/.test(state.cls)) {
            const removeAnimationClasses = () => removeClasses(el, "uk-animation-[\\w-]+");
            if (inview) {
              state.off = once(el, "animationcancel animationend", removeAnimationClasses);
            } else {
              removeAnimationClasses();
            }
          }
          trigger(el, inview ? "inview" : "outview");
          state.inview = inview;
          this.$update(el);
        }
      }
    };

    var scrollspyNav = {
      mixins: [Scroll],
      props: {
        cls: String,
        closest: String,
        scroll: Boolean,
        overflow: Boolean,
        offset: Number
      },
      data: {
        cls: "uk-active",
        closest: false,
        scroll: false,
        overflow: true,
        offset: 0
      },
      computed: {
        links: {
          get(_, $el) {
            return $$('a[href*="#"]', $el).filter((el) => el.hash && isSameSiteAnchor(el));
          },
          watch(links) {
            if (this.scroll) {
              this.$create("scroll", links, { offset: this.offset || 0 });
            }
          },
          immediate: true
        },
        elements({ closest: selector }) {
          return closest(this.links, selector || "*");
        }
      },
      update: [
        {
          read() {
            const targets = this.links.map(getTargetElement).filter(Boolean);
            const { length } = targets;
            if (!length || !isVisible(this.$el)) {
              return false;
            }
            const [scrollElement] = scrollParents(targets, true);
            const { scrollTop, scrollHeight } = scrollElement;
            const viewport = offsetViewport(scrollElement);
            const max = scrollHeight - viewport.height;
            let active = false;
            if (scrollTop === max) {
              active = length - 1;
            } else {
              for (let i = 0; i < targets.length; i++) {
                if (offset(targets[i]).top - viewport.top - this.offset > 0) {
                  break;
                }
                active = +i;
              }
              if (active === false && this.overflow) {
                active = 0;
              }
            }
            return { active };
          },
          write({ active }) {
            const changed = active !== false && !hasClass(this.elements[active], this.cls);
            this.links.forEach((el) => el.blur());
            for (let i = 0; i < this.elements.length; i++) {
              toggleClass(this.elements[i], this.cls, +i === active);
            }
            if (changed) {
              trigger(this.$el, "active", [active, this.elements[active]]);
            }
          },
          events: ["scroll", "resize"]
        }
      ]
    };

    var sticky = {
      mixins: [Class, Media, Resize, Scroll],
      props: {
        position: String,
        top: null,
        bottom: null,
        start: null,
        end: null,
        offset: String,
        overflowFlip: Boolean,
        animation: String,
        clsActive: String,
        clsInactive: String,
        clsFixed: String,
        clsBelow: String,
        selTarget: String,
        showOnUp: Boolean,
        targetOffset: Number
      },
      data: {
        position: "top",
        top: false,
        bottom: false,
        start: false,
        end: false,
        offset: 0,
        overflowFlip: false,
        animation: "",
        clsActive: "uk-active",
        clsInactive: "",
        clsFixed: "uk-sticky-fixed",
        clsBelow: "uk-sticky-below",
        selTarget: "",
        showOnUp: false,
        targetOffset: false
      },
      computed: {
        selTarget({ selTarget }, $el) {
          return selTarget && $(selTarget, $el) || $el;
        }
      },
      resizeTargets() {
        return document.documentElement;
      },
      connected() {
        this.start = coerce(this.start || this.top);
        this.end = coerce(this.end || this.bottom);
        this.placeholder = $("+ .uk-sticky-placeholder", this.$el) || $('<div class="uk-sticky-placeholder"></div>');
        this.isFixed = false;
        this.setActive(false);
        this.registerObserver(observeResize(this.$el, () => !this.isFixed && this.$emit("resize")));
      },
      disconnected() {
        if (this.isFixed) {
          this.hide();
          removeClass(this.selTarget, this.clsInactive);
        }
        reset(this.$el);
        remove$1(this.placeholder);
        this.placeholder = null;
      },
      events: [
        {
          name: "resize",
          el() {
            return [window, window.visualViewport];
          },
          handler() {
            this.$emit("resizeViewport");
          }
        },
        {
          name: "load hashchange popstate",
          el() {
            return window;
          },
          filter() {
            return this.targetOffset !== false;
          },
          handler() {
            const { scrollingElement } = document;
            if (!location.hash || scrollingElement.scrollTop === 0) {
              return;
            }
            setTimeout(() => {
              const targetOffset = offset($(location.hash));
              const elOffset = offset(this.$el);
              if (this.isFixed && intersectRect(targetOffset, elOffset)) {
                scrollingElement.scrollTop = targetOffset.top - elOffset.height - toPx(this.targetOffset, "height", this.placeholder) - toPx(this.offset, "height", this.placeholder);
              }
            });
          }
        }
      ],
      update: [
        {
          read({ height: height$1, width, margin, sticky }, types) {
            this.inactive = !this.matchMedia || !isVisible(this.$el);
            if (this.inactive) {
              return;
            }
            const hide = this.isFixed && types.has("resize") && !sticky;
            if (hide) {
              css(this.selTarget, "transition", "0s");
              this.hide();
            }
            if (!this.active) {
              ({ height: height$1, width } = offset(this.$el));
              margin = css(this.$el, "margin");
            }
            if (hide) {
              this.show();
              requestAnimationFrame(() => css(this.selTarget, "transition", ""));
            }
            const viewport = toPx("100vh", "height");
            const dynamicViewport = height(window);
            const maxScrollHeight = document.scrollingElement.scrollHeight - viewport;
            let position = this.position;
            if (this.overflowFlip && height$1 > viewport) {
              position = position === "top" ? "bottom" : "top";
            }
            const referenceElement = this.isFixed ? this.placeholder : this.$el;
            let offset$1 = toPx(this.offset, "height", sticky ? this.$el : referenceElement);
            if (position === "bottom" && (height$1 < dynamicViewport || this.overflowFlip)) {
              offset$1 += dynamicViewport - height$1;
            }
            const overflow = this.overflowFlip ? 0 : Math.max(0, height$1 + offset$1 - viewport);
            const topOffset = offset(referenceElement).top;
            const elHeight = offset(this.$el).height;
            const start = (this.start === false ? topOffset : parseProp(this.start, this.$el, topOffset)) - offset$1;
            const end = this.end === false ? maxScrollHeight : Math.min(
              maxScrollHeight,
              parseProp(this.end, this.$el, topOffset + height$1, true) - elHeight - offset$1 + overflow
            );
            sticky = maxScrollHeight && !this.showOnUp && start + offset$1 === topOffset && end === Math.min(
              maxScrollHeight,
              parseProp("!*", this.$el, 0, true) - elHeight - offset$1 + overflow
            ) && css(parent(this.$el), "overflowY") === "visible";
            return {
              start,
              end,
              offset: offset$1,
              overflow,
              topOffset,
              height: height$1,
              elHeight,
              width,
              margin,
              top: offsetPosition(referenceElement)[0],
              sticky
            };
          },
          write({ height, width, margin, offset, sticky }) {
            if (this.inactive || sticky || !this.isFixed) {
              reset(this.$el);
            }
            if (this.inactive) {
              return;
            }
            if (sticky) {
              height = width = margin = 0;
              css(this.$el, { position: "sticky", top: offset });
            }
            const { placeholder } = this;
            css(placeholder, { height, width, margin });
            if (!within(placeholder, document)) {
              placeholder.hidden = true;
            }
            (sticky ? before : after)(this.$el, placeholder);
          },
          events: ["resize", "resizeViewport"]
        },
        {
          read({
            scroll: prevScroll = 0,
            dir: prevDir = "down",
            overflow,
            overflowScroll = 0,
            start,
            end
          }) {
            const scroll = document.scrollingElement.scrollTop;
            const dir = prevScroll <= scroll ? "down" : "up";
            return {
              dir,
              prevDir,
              scroll,
              prevScroll,
              offsetParentTop: offset(
                (this.isFixed ? this.placeholder : this.$el).offsetParent
              ).top,
              overflowScroll: clamp(
                overflowScroll + clamp(scroll, start, end) - clamp(prevScroll, start, end),
                0,
                overflow
              )
            };
          },
          write(data, types) {
            const isScrollUpdate = types.has("scroll");
            const {
              initTimestamp = 0,
              dir,
              prevDir,
              scroll,
              prevScroll = 0,
              top,
              start,
              topOffset,
              height
            } = data;
            if (scroll < 0 || scroll === prevScroll && isScrollUpdate || this.showOnUp && !isScrollUpdate && !this.isFixed) {
              return;
            }
            const now = Date.now();
            if (now - initTimestamp > 300 || dir !== prevDir) {
              data.initScroll = scroll;
              data.initTimestamp = now;
            }
            if (this.showOnUp && !this.isFixed && Math.abs(data.initScroll - scroll) <= 30 && Math.abs(prevScroll - scroll) <= 10) {
              return;
            }
            if (this.inactive || scroll < start || this.showOnUp && (scroll <= start || dir === "down" && isScrollUpdate || dir === "up" && !this.isFixed && scroll <= topOffset + height)) {
              if (!this.isFixed) {
                if (Animation.inProgress(this.$el) && top > scroll) {
                  Animation.cancel(this.$el);
                  this.hide();
                }
                return;
              }
              if (this.animation && scroll > topOffset) {
                Animation.cancel(this.$el);
                Animation.out(this.$el, this.animation).then(() => this.hide(), noop);
              } else {
                this.hide();
              }
            } else if (this.isFixed) {
              this.update();
            } else if (this.animation && scroll > topOffset) {
              Animation.cancel(this.$el);
              this.show();
              Animation.in(this.$el, this.animation).catch(noop);
            } else {
              this.show();
            }
          },
          events: ["resize", "resizeViewport", "scroll"]
        }
      ],
      methods: {
        show() {
          this.isFixed = true;
          this.update();
          this.placeholder.hidden = false;
        },
        hide() {
          const { offset, sticky } = this._data;
          this.setActive(false);
          removeClass(this.$el, this.clsFixed, this.clsBelow);
          if (sticky) {
            css(this.$el, "top", offset);
          } else {
            css(this.$el, {
              position: "",
              top: "",
              width: "",
              marginTop: ""
            });
          }
          this.placeholder.hidden = true;
          this.isFixed = false;
        },
        update() {
          let {
            width,
            scroll = 0,
            overflow,
            overflowScroll = 0,
            start,
            end,
            offset,
            topOffset,
            height,
            elHeight,
            offsetParentTop,
            sticky
          } = this._data;
          const active = start !== 0 || scroll > start;
          if (!sticky) {
            let position = "fixed";
            if (scroll > end) {
              offset += end - offsetParentTop;
              position = "absolute";
            }
            css(this.$el, { position, width });
            css(this.$el, "marginTop", 0, "important");
          }
          if (overflow) {
            offset -= overflowScroll;
          }
          css(this.$el, "top", offset);
          this.setActive(active);
          toggleClass(
            this.$el,
            this.clsBelow,
            scroll > topOffset + (sticky ? Math.min(height, elHeight) : height)
          );
          addClass(this.$el, this.clsFixed);
        },
        setActive(active) {
          const prev = this.active;
          this.active = active;
          if (active) {
            replaceClass(this.selTarget, this.clsInactive, this.clsActive);
            prev !== active && trigger(this.$el, "active");
          } else {
            replaceClass(this.selTarget, this.clsActive, this.clsInactive);
            prev !== active && trigger(this.$el, "inactive");
          }
        }
      }
    };
    function parseProp(value, el, propOffset, padding) {
      if (!value) {
        return 0;
      }
      if (isNumeric(value) || isString(value) && value.match(/^-?\d/)) {
        return propOffset + toPx(value, "height", el, true);
      } else {
        const refElement = value === true ? parent(el) : query(value, el);
        return offset(refElement).bottom - (padding && refElement && within(el, refElement) ? toFloat(css(refElement, "paddingBottom")) : 0);
      }
    }
    function coerce(value) {
      if (value === "true") {
        return true;
      } else if (value === "false") {
        return false;
      }
      return value;
    }
    function reset(el) {
      css(el, { position: "", top: "", marginTop: "", width: "" });
    }

    var Switcher = {
      mixins: [Lazyload, Swipe, Togglable],
      args: "connect",
      props: {
        connect: String,
        toggle: String,
        itemNav: String,
        active: Number
      },
      data: {
        connect: "~.uk-switcher",
        toggle: "> * > :first-child",
        itemNav: false,
        active: 0,
        cls: "uk-active",
        attrItem: "uk-switcher-item"
      },
      computed: {
        connects: {
          get({ connect }, $el) {
            return queryAll(connect, $el);
          },
          watch(connects) {
            if (this.swiping) {
              css(connects, "touchAction", "pan-y pinch-zoom");
            }
          },
          document: true,
          immediate: true
        },
        connectChildren: {
          get() {
            return this.connects.map((el) => children(el)).flat();
          },
          watch() {
            const index = this.index();
            for (const el of this.connects) {
              children(el).forEach((child, i) => toggleClass(child, this.cls, i === index));
              this.lazyload(this.$el, children(el));
            }
          },
          immediate: true
        },
        toggles: {
          get({ toggle }, $el) {
            return $$(toggle, $el).filter(
              (el) => !matches(el, ".uk-disabled *, .uk-disabled, [disabled]")
            );
          },
          watch(toggles) {
            const active = this.index();
            this.show(~active ? active : toggles[this.active] || toggles[0]);
          },
          immediate: true
        },
        children() {
          return children(this.$el).filter(
            (child) => this.toggles.some((toggle) => within(toggle, child))
          );
        },
        swipeTarget() {
          return this.connects;
        }
      },
      events: [
        {
          name: "click",
          delegate() {
            return this.toggle;
          },
          handler(e) {
            e.preventDefault();
            this.show(e.current);
          }
        },
        {
          name: "click",
          el() {
            return this.connects.concat(this.itemNav ? queryAll(this.itemNav, this.$el) : []);
          },
          delegate() {
            return `[${this.attrItem}],[data-${this.attrItem}]`;
          },
          handler(e) {
            e.preventDefault();
            this.show(data(e.current, this.attrItem));
          }
        },
        {
          name: "swipeRight swipeLeft",
          filter() {
            return this.swiping;
          },
          el() {
            return this.connects;
          },
          handler({ type }) {
            this.show(endsWith(type, "Left") ? "next" : "previous");
          }
        }
      ],
      methods: {
        index() {
          return findIndex(this.children, (el) => hasClass(el, this.cls));
        },
        show(item) {
          const prev = this.index();
          const next = getIndex(item, this.toggles, prev);
          const active = getIndex(this.children[next], children(this.$el));
          children(this.$el).forEach((child, i) => {
            toggleClass(child, this.cls, active === i);
            attr(this.toggles[i], "aria-expanded", active === i);
          });
          const animate = prev >= 0 && prev !== next;
          this.connects.forEach(async ({ children: children2 }) => {
            await this.toggleElement(
              toNodes(children2).filter((child) => hasClass(child, this.cls)),
              false,
              animate
            );
            await this.toggleElement(children2[active], true, animate);
          });
        }
      }
    };

    var tab = {
      mixins: [Class],
      extends: Switcher,
      props: {
        media: Boolean
      },
      data: {
        media: 960,
        attrItem: "uk-tab-item"
      },
      connected() {
        const cls = hasClass(this.$el, "uk-tab-left") ? "uk-tab-left" : hasClass(this.$el, "uk-tab-right") ? "uk-tab-right" : false;
        if (cls) {
          this.$create("toggle", this.$el, { cls, mode: "media", media: this.media });
        }
      }
    };

    const KEY_SPACE = 32;
    var toggle = {
      mixins: [Lazyload, Media, Togglable],
      args: "target",
      props: {
        href: String,
        target: null,
        mode: "list",
        queued: Boolean
      },
      data: {
        href: false,
        target: false,
        mode: "click",
        queued: true
      },
      computed: {
        target: {
          get({ href, target }, $el) {
            target = queryAll(target || href, $el);
            return target.length && target || [$el];
          },
          watch() {
            this.updateAria();
            this.lazyload(this.$el, this.target);
          },
          document: true,
          immediate: true
        }
      },
      connected() {
        if (!includes(this.mode, "media") && !isFocusable(this.$el)) {
          attr(this.$el, "tabindex", "0");
        }
      },
      events: [
        {
          name: pointerDown,
          filter() {
            return includes(this.mode, "hover");
          },
          handler(e) {
            this._preventClick = null;
            if (!isTouch(e) || this._showState) {
              return;
            }
            trigger(this.$el, "focus");
            once(
              document,
              pointerDown,
              () => trigger(this.$el, "blur"),
              true,
              (e2) => !within(e2.target, this.$el)
            );
            if (includes(this.mode, "click")) {
              this._preventClick = true;
            }
          }
        },
        {
          name: `${pointerEnter} ${pointerLeave} focus blur`,
          filter() {
            return includes(this.mode, "hover");
          },
          handler(e) {
            if (isTouch(e)) {
              return;
            }
            const show = includes([pointerEnter, "focus"], e.type);
            const expanded = attr(this.$el, "aria-expanded");
            if (!show && (e.type === pointerLeave && matches(this.$el, ":focus") || e.type === "blur" && matches(this.$el, ":hover"))) {
              return;
            }
            if (this._showState && show && expanded !== this._showState) {
              if (!show) {
                this._showState = null;
              }
              return;
            }
            this._showState = show ? expanded : null;
            this.toggle(`toggle${show ? "show" : "hide"}`);
          }
        },
        {
          name: "keydown",
          filter() {
            return includes(this.mode, "click") && !isTag(this.$el, "input");
          },
          handler(e) {
            if (e.keyCode === KEY_SPACE) {
              e.preventDefault();
              this.$el.click();
            }
          }
        },
        {
          name: "click",
          filter() {
            return ["click", "hover"].some((mode) => includes(this.mode, mode));
          },
          handler(e) {
            let link;
            if (this._preventClick || closest(e.target, 'a[href="#"], a[href=""]') || (link = closest(e.target, "a[href]")) && (attr(this.$el, "aria-expanded") !== "true" || link.hash && matches(this.target, link.hash))) {
              e.preventDefault();
            }
            if (!this._preventClick && includes(this.mode, "click")) {
              this.toggle();
            }
          }
        },
        {
          name: "hide show",
          self: true,
          el() {
            return this.target;
          },
          handler({ target, type }) {
            this.updateAria(target === this.target[0] && type === "show");
          }
        },
        {
          name: "mediachange",
          filter() {
            return includes(this.mode, "media");
          },
          el() {
            return this.target;
          },
          handler(e, mediaObj) {
            if (mediaObj.matches ^ this.isToggled(this.target)) {
              this.toggle();
            }
          }
        }
      ],
      methods: {
        async toggle(type) {
          if (!trigger(this.target, type || "toggle", [this])) {
            return;
          }
          if (!this.queued) {
            return this.toggleElement(this.target);
          }
          const leaving = this.target.filter((el) => hasClass(el, this.clsLeave));
          if (leaving.length) {
            for (const el of this.target) {
              const isLeaving = includes(leaving, el);
              this.toggleElement(el, isLeaving, isLeaving);
            }
            return;
          }
          const toggled = this.target.filter(this.isToggled);
          await this.toggleElement(toggled, false);
          await this.toggleElement(
            this.target.filter((el) => !includes(toggled, el)),
            true
          );
        },
        updateAria(toggled) {
          if (includes(this.mode, "media")) {
            return;
          }
          attr(
            this.$el,
            "aria-expanded",
            isBoolean(toggled) ? toggled : this.isToggled(this.target)
          );
        }
      }
    };

    var components = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Accordion: Accordion,
        Alert: alert,
        Close: Close,
        Cover: cover,
        Drop: drop,
        Dropdown: drop,
        FormCustom: formCustom,
        Grid: grid,
        HeightMatch: heightMatch,
        HeightViewport: heightViewport,
        Icon: Icon,
        Img: img,
        Leader: leader,
        Margin: Margin,
        Marker: IconComponent,
        Modal: modal,
        Nav: nav,
        NavParentIcon: NavParentIcon,
        Navbar: navbar,
        NavbarParentIcon: IconComponent,
        NavbarToggleIcon: IconComponent,
        Offcanvas: offcanvas,
        OverflowAuto: overflowAuto,
        OverlayIcon: IconComponent,
        PaginationNext: IconComponent,
        PaginationPrevious: IconComponent,
        Responsive: responsive,
        Scroll: scroll,
        Scrollspy: scrollspy,
        ScrollspyNav: scrollspyNav,
        SearchIcon: Search,
        SlidenavNext: Slidenav,
        SlidenavPrevious: Slidenav,
        Spinner: Spinner,
        Sticky: sticky,
        SubnavParentIcon: IconComponent,
        Svg: SVG,
        Switcher: Switcher,
        Tab: tab,
        Toggle: toggle,
        Totop: IconComponent,
        Video: Video
    });

    each(components, (component, name) => UIkit.component(name, component));
    boot(UIkit);

    return UIkit;

}));
