/*! UIkit 3.16.6 | https://www.getuikit.com | (c) 2014 - 2023 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitsortable', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitSortable = factory(global.UIkit.util));
})(this, (function (uikitUtil) { 'use strict';

    const hyphenateRe = /\B([A-Z])/g;
    const hyphenate = memoize((str) => str.replace(hyphenateRe, "-$1").toLowerCase());
    const ucfirst = memoize((str) => str.charAt(0).toUpperCase() + str.slice(1));
    function startsWith(str, search) {
      var _a;
      return (_a = str == null ? void 0 : str.startsWith) == null ? void 0 : _a.call(str, search);
    }
    const { isArray, from: toArray } = Array;
    function isFunction(obj) {
      return typeof obj === "function";
    }
    function isObject(obj) {
      return obj !== null && typeof obj === "object";
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
    function isString(value) {
      return typeof value === "string";
    }
    function isNumber(value) {
      return typeof value === "number";
    }
    function isNumeric(value) {
      return isNumber(value) || isString(value) && !isNaN(value - parseFloat(value));
    }
    function isUndefined(value) {
      return value === void 0;
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
    function each(obj, cb) {
      for (const key in obj) {
        if (false === cb(obj[key], key)) {
          return false;
        }
      }
      return true;
    }
    function sumBy(array, iteratee) {
      return array.reduce(
        (sum, item) => sum + toFloat(isFunction(iteratee) ? iteratee(item) : item[iteratee]),
        0
      );
    }
    function noop() {
    }
    function memoize(fn) {
      const cache = /* @__PURE__ */ Object.create(null);
      return (key) => cache[key] || (cache[key] = fn(key));
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
    function removeAttr(element, name) {
      toNodes(element).forEach((element2) => element2.removeAttribute(name));
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
    function children(element, selector) {
      element = toNode(element);
      const children2 = element ? toNodes(element.children) : [];
      return selector ? filter(children2, selector) : children2;
    }
    function index(element, ref) {
      return ref ? toNodes(element).indexOf(toNode(ref)) : children(parent(element)).indexOf(element);
    }

    function findAll(selector, context) {
      return toNodes(_query(selector, toNode(context), "querySelectorAll"));
    }
    const contextSelectorRe = /(^|[^\\],)\s*[!>+~-]/;
    const isContextSelector = memoize((selector) => selector.match(contextSelectorRe));
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

    const dirs = {
      width: ["left", "right"],
      height: ["top", "bottom"]
    };
    dimension("height");
    dimension("width");
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
        dirs[prop].map(ucfirst),
        (prop2) => toFloat(css(element, `padding${prop2}`)) + toFloat(css(element, `border${prop2}Width`))
      ) : 0;
    }

    const inBrowser = typeof window !== "undefined";

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

    function resize(options) {
      return observe(observeResize, options, "resize");
    }
    function mutation(options) {
      return observe(observeMutation, options);
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

    ({
      props: {
        margin: String,
        firstColumn: Boolean
      },
      data: {
        margin: "uk-margin-small-top",
        firstColumn: "uk-first-column"
      },
      observe: [
        mutation({
          options: {
            childList: true,
            attributes: true,
            attributeFilter: ["style"]
          }
        }),
        resize({
          target: ({ $el }) => [$el, ...uikitUtil.toArray($el.children)]
        })
      ],
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
              uikitUtil.toggleClass(column, this.margin, rows[0] !== row);
              uikitUtil.toggleClass(column, this.firstColumn, columns[0].includes(column));
            }
          }
        },
        events: ["resize"]
      }
    });
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
      return uikitUtil.isRtl ? columns.reverse() : columns;
    }
    function sortBy(items, startProp, endProp) {
      const sorted = [[]];
      for (const el of items) {
        if (!uikitUtil.isVisible(el)) {
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
        [offsetTop, offsetLeft] = uikitUtil.offsetPosition(element);
      }
      return {
        top: offsetTop,
        left: offsetLeft,
        bottom: offsetTop + offsetHeight,
        right: offsetLeft + offsetWidth
      };
    }

    const clsLeave = "uk-transition-leave";
    const clsEnter = "uk-transition-enter";
    function fade(action, target, duration, stagger = 0) {
      const index = transitionIndex(target, true);
      const propsIn = { opacity: 1 };
      const propsOut = { opacity: 0 };
      const wrapIndexFn = (fn) => () => index === transitionIndex(target) ? fn() : Promise.reject();
      const leaveFn = wrapIndexFn(async () => {
        uikitUtil.addClass(target, clsLeave);
        await Promise.all(
          getTransitionNodes(target).map(
            (child, i) => new Promise(
              (resolve) => setTimeout(
                () => uikitUtil.Transition.start(child, propsOut, duration / 2, "ease").then(
                  resolve
                ),
                i * stagger
              )
            )
          )
        );
        uikitUtil.removeClass(target, clsLeave);
      });
      const enterFn = wrapIndexFn(async () => {
        const oldHeight = uikitUtil.height(target);
        uikitUtil.addClass(target, clsEnter);
        action();
        uikitUtil.css(uikitUtil.children(target), { opacity: 0 });
        await awaitFrame$1();
        const nodes = uikitUtil.children(target);
        const newHeight = uikitUtil.height(target);
        uikitUtil.css(target, "alignContent", "flex-start");
        uikitUtil.height(target, oldHeight);
        const transitionNodes = getTransitionNodes(target);
        uikitUtil.css(nodes, propsOut);
        const transitions = transitionNodes.map(async (child, i) => {
          await awaitTimeout(i * stagger);
          await uikitUtil.Transition.start(child, propsIn, duration / 2, "ease");
        });
        if (oldHeight !== newHeight) {
          transitions.push(
            uikitUtil.Transition.start(
              target,
              { height: newHeight },
              duration / 2 + transitionNodes.length * stagger,
              "ease"
            )
          );
        }
        await Promise.all(transitions).then(() => {
          uikitUtil.removeClass(target, clsEnter);
          if (index === transitionIndex(target)) {
            uikitUtil.css(target, { height: "", alignContent: "" });
            uikitUtil.css(nodes, { opacity: "" });
            delete target.dataset.transition;
          }
        });
      });
      return uikitUtil.hasClass(target, clsLeave) ? waitTransitionend(target).then(enterFn) : uikitUtil.hasClass(target, clsEnter) ? waitTransitionend(target).then(leaveFn).then(enterFn) : leaveFn().then(enterFn);
    }
    function transitionIndex(target, next) {
      if (next) {
        target.dataset.transition = 1 + transitionIndex(target);
      }
      return uikitUtil.toNumber(target.dataset.transition) || 0;
    }
    function waitTransitionend(target) {
      return Promise.all(
        uikitUtil.children(target).filter(uikitUtil.Transition.inProgress).map(
          (el) => new Promise((resolve) => uikitUtil.once(el, "transitionend transitioncanceled", resolve))
        )
      );
    }
    function getTransitionNodes(target) {
      return getRows(uikitUtil.children(target)).reduce(
        (nodes, row) => nodes.concat(
          uikitUtil.sortBy(
            row.filter((el) => uikitUtil.isInView(el)),
            "offsetLeft"
          )
        ),
        []
      );
    }
    function awaitFrame$1() {
      return new Promise((resolve) => requestAnimationFrame(resolve));
    }
    function awaitTimeout(timeout) {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    }

    async function slide(action, target, duration) {
      await awaitFrame();
      let nodes = uikitUtil.children(target);
      const currentProps = nodes.map((el) => getProps(el, true));
      const targetProps = { ...uikitUtil.css(target, ["height", "padding"]), display: "block" };
      await Promise.all(nodes.concat(target).map(uikitUtil.Transition.cancel));
      action();
      nodes = nodes.concat(uikitUtil.children(target).filter((el) => !uikitUtil.includes(nodes, el)));
      await Promise.resolve();
      uikitUtil.fastdom.flush();
      const targetStyle = uikitUtil.attr(target, "style");
      const targetPropsTo = uikitUtil.css(target, ["height", "padding"]);
      const [propsTo, propsFrom] = getTransitionProps(target, nodes, currentProps);
      const attrsTo = nodes.map((el) => ({ style: uikitUtil.attr(el, "style") }));
      nodes.forEach((el, i) => propsFrom[i] && uikitUtil.css(el, propsFrom[i]));
      uikitUtil.css(target, targetProps);
      uikitUtil.trigger(target, "scroll");
      uikitUtil.fastdom.flush();
      await awaitFrame();
      const transitions = nodes.map((el, i) => uikitUtil.parent(el) === target && uikitUtil.Transition.start(el, propsTo[i], duration, "ease")).concat(uikitUtil.Transition.start(target, targetPropsTo, duration, "ease"));
      try {
        await Promise.all(transitions);
        nodes.forEach((el, i) => {
          uikitUtil.attr(el, attrsTo[i]);
          if (uikitUtil.parent(el) === target) {
            uikitUtil.css(el, "display", propsTo[i].opacity === 0 ? "none" : "");
          }
        });
        uikitUtil.attr(target, "style", targetStyle);
      } catch (e) {
        uikitUtil.attr(nodes, "style", "");
        resetProps(target, targetProps);
      }
    }
    function getProps(el, opacity) {
      const zIndex = uikitUtil.css(el, "zIndex");
      return uikitUtil.isVisible(el) ? {
        display: "",
        opacity: opacity ? uikitUtil.css(el, "opacity") : "0",
        pointerEvents: "none",
        position: "absolute",
        zIndex: zIndex === "auto" ? uikitUtil.index(el) : zIndex,
        ...getPositionWithMargin(el)
      } : false;
    }
    function getTransitionProps(target, nodes, currentProps) {
      const propsTo = nodes.map(
        (el, i) => uikitUtil.parent(el) && i in currentProps ? currentProps[i] ? uikitUtil.isVisible(el) ? getPositionWithMargin(el) : { opacity: 0 } : { opacity: uikitUtil.isVisible(el) ? 1 : 0 } : false
      );
      const propsFrom = propsTo.map((props, i) => {
        const from = uikitUtil.parent(nodes[i]) === target && (currentProps[i] || getProps(nodes[i]));
        if (!from) {
          return false;
        }
        if (!props) {
          delete from.opacity;
        } else if (!("opacity" in props)) {
          const { opacity } = from;
          if (opacity % 1) {
            props.opacity = 1;
          } else {
            delete from.opacity;
          }
        }
        return from;
      });
      return [propsTo, propsFrom];
    }
    function resetProps(el, props) {
      for (const prop in props) {
        uikitUtil.css(el, prop, "");
      }
    }
    function getPositionWithMargin(el) {
      const { height, width } = uikitUtil.offset(el);
      return {
        height,
        width,
        transform: "",
        ...uikitUtil.position(el),
        ...uikitUtil.css(el, ["marginTop", "marginLeft"])
      };
    }
    function awaitFrame() {
      return new Promise((resolve) => requestAnimationFrame(resolve));
    }

    var Animate = {
      props: {
        duration: Number,
        animation: Boolean
      },
      data: {
        duration: 150,
        animation: "slide"
      },
      methods: {
        animate(action, target = this.$el) {
          const name = this.animation;
          const animationFn = name === "fade" ? fade : name === "delayed-fade" ? (...args) => fade(...args, 40) : name ? slide : () => {
            action();
            return Promise.resolve();
          };
          return animationFn(action, target, this.duration).catch(uikitUtil.noop);
        }
      }
    };

    var Class = {
      connected() {
        uikitUtil.addClass(this.$el, this.$options.id);
      }
    };

    var Component = {
      mixins: [Class, Animate],
      props: {
        group: String,
        threshold: Number,
        clsItem: String,
        clsPlaceholder: String,
        clsDrag: String,
        clsDragState: String,
        clsBase: String,
        clsNoDrag: String,
        clsEmpty: String,
        clsCustom: String,
        handle: String
      },
      data: {
        group: false,
        threshold: 5,
        clsItem: "uk-sortable-item",
        clsPlaceholder: "uk-sortable-placeholder",
        clsDrag: "uk-sortable-drag",
        clsDragState: "uk-drag",
        clsBase: "uk-sortable",
        clsNoDrag: "uk-sortable-nodrag",
        clsEmpty: "uk-sortable-empty",
        clsCustom: "",
        handle: false,
        pos: {}
      },
      created() {
        for (const key of ["init", "start", "move", "end"]) {
          const fn = this[key];
          this[key] = (e) => {
            uikitUtil.assign(this.pos, uikitUtil.getEventPos(e));
            fn(e);
          };
        }
      },
      events: {
        name: uikitUtil.pointerDown,
        passive: false,
        handler: "init"
      },
      computed: {
        target() {
          return (this.$el.tBodies || [this.$el])[0];
        },
        items() {
          return uikitUtil.children(this.target);
        },
        isEmpty: {
          get() {
            return uikitUtil.isEmpty(this.items);
          },
          watch(empty) {
            uikitUtil.toggleClass(this.target, this.clsEmpty, empty);
          },
          immediate: true
        },
        handles: {
          get({ handle }, el) {
            return handle ? uikitUtil.$$(handle, el) : this.items;
          },
          watch(handles, prev) {
            uikitUtil.css(prev, { touchAction: "", userSelect: "" });
            uikitUtil.css(handles, { touchAction: uikitUtil.hasTouch ? "none" : "", userSelect: "none" });
          },
          immediate: true
        }
      },
      update: {
        write(data) {
          if (!this.drag || !uikitUtil.parent(this.placeholder)) {
            return;
          }
          const {
            pos: { x, y },
            origin: { offsetTop, offsetLeft },
            placeholder
          } = this;
          uikitUtil.css(this.drag, {
            top: y - offsetTop,
            left: x - offsetLeft
          });
          const sortable = this.getSortable(document.elementFromPoint(x, y));
          if (!sortable) {
            return;
          }
          const { items } = sortable;
          if (items.some(uikitUtil.Transition.inProgress)) {
            return;
          }
          const target = findTarget(items, { x, y });
          if (items.length && (!target || target === placeholder)) {
            return;
          }
          const previous = this.getSortable(placeholder);
          const insertTarget = findInsertTarget(
            sortable.target,
            target,
            placeholder,
            x,
            y,
            sortable === previous && data.moved !== target
          );
          if (insertTarget === false) {
            return;
          }
          if (insertTarget && placeholder === insertTarget) {
            return;
          }
          if (sortable !== previous) {
            previous.remove(placeholder);
            data.moved = target;
          } else {
            delete data.moved;
          }
          sortable.insert(placeholder, insertTarget);
          this.touched.add(sortable);
        },
        events: ["move"]
      },
      methods: {
        init(e) {
          const { target, button, defaultPrevented } = e;
          const [placeholder] = this.items.filter((el) => uikitUtil.within(target, el));
          if (!placeholder || defaultPrevented || button > 0 || uikitUtil.isInput(target) || uikitUtil.within(target, `.${this.clsNoDrag}`) || this.handle && !uikitUtil.within(target, this.handle)) {
            return;
          }
          e.preventDefault();
          this.touched = /* @__PURE__ */ new Set([this]);
          this.placeholder = placeholder;
          this.origin = { target, index: uikitUtil.index(placeholder), ...this.pos };
          uikitUtil.on(document, uikitUtil.pointerMove, this.move);
          uikitUtil.on(document, uikitUtil.pointerUp, this.end);
          if (!this.threshold) {
            this.start(e);
          }
        },
        start(e) {
          this.drag = appendDrag(this.$container, this.placeholder);
          const { left, top } = this.placeholder.getBoundingClientRect();
          uikitUtil.assign(this.origin, { offsetLeft: this.pos.x - left, offsetTop: this.pos.y - top });
          uikitUtil.addClass(this.drag, this.clsDrag, this.clsCustom);
          uikitUtil.addClass(this.placeholder, this.clsPlaceholder);
          uikitUtil.addClass(this.items, this.clsItem);
          uikitUtil.addClass(document.documentElement, this.clsDragState);
          uikitUtil.trigger(this.$el, "start", [this, this.placeholder]);
          trackScroll(this.pos);
          this.move(e);
        },
        move(e) {
          if (this.drag) {
            this.$emit("move");
          } else if (Math.abs(this.pos.x - this.origin.x) > this.threshold || Math.abs(this.pos.y - this.origin.y) > this.threshold) {
            this.start(e);
          }
        },
        end() {
          uikitUtil.off(document, uikitUtil.pointerMove, this.move);
          uikitUtil.off(document, uikitUtil.pointerUp, this.end);
          if (!this.drag) {
            return;
          }
          untrackScroll();
          const sortable = this.getSortable(this.placeholder);
          if (this === sortable) {
            if (this.origin.index !== uikitUtil.index(this.placeholder)) {
              uikitUtil.trigger(this.$el, "moved", [this, this.placeholder]);
            }
          } else {
            uikitUtil.trigger(sortable.$el, "added", [sortable, this.placeholder]);
            uikitUtil.trigger(this.$el, "removed", [this, this.placeholder]);
          }
          uikitUtil.trigger(this.$el, "stop", [this, this.placeholder]);
          uikitUtil.remove(this.drag);
          this.drag = null;
          for (const { clsPlaceholder, clsItem } of this.touched) {
            for (const sortable2 of this.touched) {
              uikitUtil.removeClass(sortable2.items, clsPlaceholder, clsItem);
            }
          }
          this.touched = null;
          uikitUtil.removeClass(document.documentElement, this.clsDragState);
        },
        insert(element, target) {
          uikitUtil.addClass(this.items, this.clsItem);
          const insert = () => target ? uikitUtil.before(target, element) : uikitUtil.append(this.target, element);
          this.animate(insert);
        },
        remove(element) {
          if (!uikitUtil.within(element, this.target)) {
            return;
          }
          this.animate(() => uikitUtil.remove(element));
        },
        getSortable(element) {
          do {
            const sortable = this.$getComponent(element, "sortable");
            if (sortable && (sortable === this || this.group !== false && sortable.group === this.group)) {
              return sortable;
            }
          } while (element = uikitUtil.parent(element));
        }
      }
    };
    let trackTimer;
    function trackScroll(pos) {
      let last = Date.now();
      trackTimer = setInterval(() => {
        let { x, y } = pos;
        y += document.scrollingElement.scrollTop;
        const dist = (Date.now() - last) * 0.3;
        last = Date.now();
        uikitUtil.scrollParents(document.elementFromPoint(x, pos.y)).reverse().some((scrollEl) => {
          let { scrollTop: scroll, scrollHeight } = scrollEl;
          const { top, bottom, height: height2 } = uikitUtil.offsetViewport(scrollEl);
          if (top < y && top + 35 > y) {
            scroll -= dist;
          } else if (bottom > y && bottom - 35 < y) {
            scroll += dist;
          } else {
            return;
          }
          if (scroll > 0 && scroll < scrollHeight - height2) {
            scrollEl.scrollTop = scroll;
            return true;
          }
        });
      }, 15);
    }
    function untrackScroll() {
      clearInterval(trackTimer);
    }
    function appendDrag(container, element) {
      let clone;
      if (uikitUtil.isTag(element, "li", "tr")) {
        clone = uikitUtil.$("<div>");
        uikitUtil.append(clone, element.cloneNode(true).children);
        for (const attribute of element.getAttributeNames()) {
          uikitUtil.attr(clone, attribute, element.getAttribute(attribute));
        }
      } else {
        clone = element.cloneNode(true);
      }
      uikitUtil.append(container, clone);
      uikitUtil.css(clone, "margin", "0", "important");
      uikitUtil.css(clone, {
        boxSizing: "border-box",
        width: element.offsetWidth,
        height: element.offsetHeight,
        padding: uikitUtil.css(element, "padding")
      });
      uikitUtil.height(clone.firstElementChild, uikitUtil.height(element.firstElementChild));
      return clone;
    }
    function findTarget(items, point) {
      return items[uikitUtil.findIndex(items, (item) => uikitUtil.pointInRect(point, item.getBoundingClientRect()))];
    }
    function findInsertTarget(list, target, placeholder, x, y, sameList) {
      if (!uikitUtil.children(list).length) {
        return;
      }
      const rect = target.getBoundingClientRect();
      if (!sameList) {
        if (!isHorizontal(list, placeholder)) {
          return y < rect.top + rect.height / 2 ? target : target.nextElementSibling;
        }
        return target;
      }
      const placeholderRect = placeholder.getBoundingClientRect();
      const sameRow = linesIntersect(
        [rect.top, rect.bottom],
        [placeholderRect.top, placeholderRect.bottom]
      );
      const [pointerPos, lengthProp, startProp, endProp] = sameRow ? [x, "width", "left", "right"] : [y, "height", "top", "bottom"];
      const diff = placeholderRect[lengthProp] < rect[lengthProp] ? rect[lengthProp] - placeholderRect[lengthProp] : 0;
      if (placeholderRect[startProp] < rect[startProp]) {
        if (diff && pointerPos < rect[startProp] + diff) {
          return false;
        }
        return target.nextElementSibling;
      }
      if (diff && pointerPos > rect[endProp] - diff) {
        return false;
      }
      return target;
    }
    function isHorizontal(list, placeholder) {
      const single = uikitUtil.children(list).length === 1;
      if (single) {
        uikitUtil.append(list, placeholder);
      }
      const items = uikitUtil.children(list);
      const isHorizontal2 = items.some((el, i) => {
        const rectA = el.getBoundingClientRect();
        return items.slice(i + 1).some((el2) => {
          const rectB = el2.getBoundingClientRect();
          return !linesIntersect([rectA.left, rectA.right], [rectB.left, rectB.right]);
        });
      });
      if (single) {
        uikitUtil.remove(placeholder);
      }
      return isHorizontal2;
    }
    function linesIntersect(lineA, lineB) {
      return lineA[1] > lineB[0] && lineB[1] > lineA[0];
    }

    if (typeof window !== "undefined" && window.UIkit) {
      window.UIkit.component("sortable", Component);
    }

    return Component;

}));
