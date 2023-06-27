/*! UIkit 3.16.15 | https://www.getuikit.com | (c) 2014 - 2023 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitslider_parallax', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitSlider_parallax = factory(global.UIkit.util));
})(this, (function (uikitUtil) { 'use strict';

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
            uikitUtil.trigger(this.$el, uikitUtil.createEvent("mediachange", false, true, [this.mediaObj]));
          };
          this.offMediaObj = uikitUtil.on(this.mediaObj, "change", () => {
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
      if (uikitUtil.isString(value)) {
        if (uikitUtil.startsWith(value, "@")) {
          value = uikitUtil.toFloat(uikitUtil.css(element, `--uk-breakpoint-${value.substr(1)}`));
        } else if (isNaN(value)) {
          return value;
        }
      }
      return value && uikitUtil.isNumeric(value) ? `(min-width: ${value}px)` : "";
    }

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
    function isUndefined(value) {
      return value === void 0;
    }
    function toNode(element) {
      return toNodes(element)[0];
    }
    function toNodes(element) {
      return isNode(element) ? [element] : Array.from(element || []).filter(isNode);
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
    function children(element, selector) {
      element = toNode(element);
      const children2 = element ? toArray(element.children) : [];
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
    function $$(selector, context) {
      return isHtml(selector) ? toNodes(fragment(selector)) : findAll(selector, context);
    }
    function isHtml(str) {
      return isString(str) && startsWith(str.trim(), "<");
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

    const props = {
      x: transformFn,
      y: transformFn,
      rotate: transformFn,
      scale: transformFn,
      color: colorFn,
      backgroundColor: colorFn,
      borderColor: colorFn,
      blur: filterFn,
      hue: filterFn,
      fopacity: filterFn,
      grayscale: filterFn,
      invert: filterFn,
      saturate: filterFn,
      sepia: filterFn,
      opacity: cssPropFn,
      stroke: strokeFn,
      bgx: backgroundFn,
      bgy: backgroundFn
    };
    const { keys } = Object;
    var Parallax = {
      mixins: [Media],
      props: fillObject(keys(props), "list"),
      data: fillObject(keys(props), void 0),
      computed: {
        props(properties, $el) {
          const stops = {};
          for (const prop in properties) {
            if (prop in props && !uikitUtil.isUndefined(properties[prop])) {
              stops[prop] = properties[prop].slice();
            }
          }
          const result = {};
          for (const prop in stops) {
            result[prop] = props[prop](prop, $el, stops[prop], stops);
          }
          return result;
        }
      },
      events: {
        load() {
          this.$emit();
        }
      },
      methods: {
        reset() {
          for (const prop in this.getCss(0)) {
            uikitUtil.css(this.$el, prop, "");
          }
        },
        getCss(percent) {
          const css2 = { transform: "", filter: "" };
          for (const prop in this.props) {
            this.props[prop](css2, percent);
          }
          css2.willChange = Object.keys(css2).filter((key) => css2[key] !== "").map(uikitUtil.propName).join(",");
          return css2;
        }
      }
    };
    function transformFn(prop, el, stops) {
      let unit = getUnit(stops) || { x: "px", y: "px", rotate: "deg" }[prop] || "";
      let transformFn2;
      if (prop === "x" || prop === "y") {
        prop = `translate${uikitUtil.ucfirst(prop)}`;
        transformFn2 = (stop) => uikitUtil.toFloat(uikitUtil.toFloat(stop).toFixed(unit === "px" ? 0 : 6));
      } else if (prop === "scale") {
        unit = "";
        transformFn2 = (stop) => getUnit([stop]) ? uikitUtil.toPx(stop, "width", el, true) / el.offsetWidth : stop;
      }
      if (stops.length === 1) {
        stops.unshift(prop === "scale" ? 1 : 0);
      }
      stops = parseStops(stops, transformFn2);
      return (css2, percent) => {
        css2.transform += ` ${prop}(${getValue(stops, percent)}${unit})`;
      };
    }
    function colorFn(prop, el, stops) {
      if (stops.length === 1) {
        stops.unshift(getCssValue(el, prop, ""));
      }
      stops = parseStops(stops, (stop) => parseColor(el, stop));
      return (css2, percent) => {
        const [start, end, p] = getStop(stops, percent);
        const value = start.map((value2, i) => {
          value2 += p * (end[i] - value2);
          return i === 3 ? uikitUtil.toFloat(value2) : parseInt(value2, 10);
        }).join(",");
        css2[prop] = `rgba(${value})`;
      };
    }
    function parseColor(el, color) {
      return getCssValue(el, "color", color).split(/[(),]/g).slice(1, -1).concat(1).slice(0, 4).map(uikitUtil.toFloat);
    }
    function filterFn(prop, el, stops) {
      if (stops.length === 1) {
        stops.unshift(0);
      }
      const unit = getUnit(stops) || { blur: "px", hue: "deg" }[prop] || "%";
      prop = { fopacity: "opacity", hue: "hue-rotate" }[prop] || prop;
      stops = parseStops(stops);
      return (css2, percent) => {
        const value = getValue(stops, percent);
        css2.filter += ` ${prop}(${value + unit})`;
      };
    }
    function cssPropFn(prop, el, stops) {
      if (stops.length === 1) {
        stops.unshift(getCssValue(el, prop, ""));
      }
      stops = parseStops(stops);
      return (css2, percent) => {
        css2[prop] = getValue(stops, percent);
      };
    }
    function strokeFn(prop, el, stops) {
      if (stops.length === 1) {
        stops.unshift(0);
      }
      const unit = getUnit(stops);
      const length = getMaxPathLength(el);
      stops = parseStops(stops.reverse(), (stop) => {
        stop = uikitUtil.toFloat(stop);
        return unit === "%" ? stop * length / 100 : stop;
      });
      if (!stops.some(([value]) => value)) {
        return uikitUtil.noop;
      }
      uikitUtil.css(el, "strokeDasharray", length);
      return (css2, percent) => {
        css2.strokeDashoffset = getValue(stops, percent);
      };
    }
    function backgroundFn(prop, el, stops, props2) {
      if (stops.length === 1) {
        stops.unshift(0);
      }
      const attr = prop === "bgy" ? "height" : "width";
      props2[prop] = parseStops(stops, (stop) => uikitUtil.toPx(stop, attr, el));
      const bgProps = ["bgx", "bgy"].filter((prop2) => prop2 in props2);
      if (bgProps.length === 2 && prop === "bgx") {
        return uikitUtil.noop;
      }
      if (getCssValue(el, "backgroundSize", "") === "cover") {
        return backgroundCoverFn(prop, el, stops, props2);
      }
      const positions = {};
      for (const prop2 of bgProps) {
        positions[prop2] = getBackgroundPos(el, prop2);
      }
      return setBackgroundPosFn(bgProps, positions, props2);
    }
    function backgroundCoverFn(prop, el, stops, props2) {
      const dimImage = getBackgroundImageDimensions(el);
      if (!dimImage.width) {
        return uikitUtil.noop;
      }
      const dimEl = {
        width: el.offsetWidth,
        height: el.offsetHeight
      };
      const bgProps = ["bgx", "bgy"].filter((prop2) => prop2 in props2);
      const positions = {};
      for (const prop2 of bgProps) {
        const values = props2[prop2].map(([value]) => value);
        const min = Math.min(...values);
        const max = Math.max(...values);
        const down = values.indexOf(min) < values.indexOf(max);
        const diff = max - min;
        positions[prop2] = `${(down ? -diff : 0) - (down ? min : max)}px`;
        dimEl[prop2 === "bgy" ? "height" : "width"] += diff;
      }
      const dim = uikitUtil.Dimensions.cover(dimImage, dimEl);
      for (const prop2 of bgProps) {
        const attr = prop2 === "bgy" ? "height" : "width";
        const overflow = dim[attr] - dimEl[attr];
        positions[prop2] = `max(${getBackgroundPos(el, prop2)},-${overflow}px) + ${positions[prop2]}`;
      }
      const fn = setBackgroundPosFn(bgProps, positions, props2);
      return (css2, percent) => {
        fn(css2, percent);
        css2.backgroundSize = `${dim.width}px ${dim.height}px`;
        css2.backgroundRepeat = "no-repeat";
      };
    }
    function getBackgroundPos(el, prop) {
      return getCssValue(el, `background-position-${prop.substr(-1)}`, "");
    }
    function setBackgroundPosFn(bgProps, positions, props2) {
      return function(css2, percent) {
        for (const prop of bgProps) {
          const value = getValue(props2[prop], percent);
          css2[`background-position-${prop.substr(-1)}`] = `calc(${positions[prop]} + ${value}px)`;
        }
      };
    }
    const dimensions = {};
    function getBackgroundImageDimensions(el) {
      const src = uikitUtil.css(el, "backgroundImage").replace(/^none|url\(["']?(.+?)["']?\)$/, "$1");
      if (dimensions[src]) {
        return dimensions[src];
      }
      const image = new Image();
      if (src) {
        image.src = src;
        if (!image.naturalWidth) {
          image.onload = () => {
            dimensions[src] = toDimensions(image);
            uikitUtil.trigger(el, uikitUtil.createEvent("load", false));
          };
          return toDimensions(image);
        }
      }
      return dimensions[src] = toDimensions(image);
    }
    function toDimensions(image) {
      return {
        width: image.naturalWidth,
        height: image.naturalHeight
      };
    }
    function parseStops(stops, fn = uikitUtil.toFloat) {
      const result = [];
      const { length } = stops;
      let nullIndex = 0;
      for (let i = 0; i < length; i++) {
        let [value, percent] = uikitUtil.isString(stops[i]) ? stops[i].trim().split(/ (?![^(]*\))/) : [stops[i]];
        value = fn(value);
        percent = percent ? uikitUtil.toFloat(percent) / 100 : null;
        if (i === 0) {
          if (percent === null) {
            percent = 0;
          } else if (percent) {
            result.push([value, 0]);
          }
        } else if (i === length - 1) {
          if (percent === null) {
            percent = 1;
          } else if (percent !== 1) {
            result.push([value, percent]);
            percent = 1;
          }
        }
        result.push([value, percent]);
        if (percent === null) {
          nullIndex++;
        } else if (nullIndex) {
          const leftPercent = result[i - nullIndex - 1][1];
          const p = (percent - leftPercent) / (nullIndex + 1);
          for (let j = nullIndex; j > 0; j--) {
            result[i - j][1] = leftPercent + p * (nullIndex - j + 1);
          }
          nullIndex = 0;
        }
      }
      return result;
    }
    function getStop(stops, percent) {
      const index = uikitUtil.findIndex(stops.slice(1), ([, targetPercent]) => percent <= targetPercent) + 1;
      return [
        stops[index - 1][0],
        stops[index][0],
        (percent - stops[index - 1][1]) / (stops[index][1] - stops[index - 1][1])
      ];
    }
    function getValue(stops, percent) {
      const [start, end, p] = getStop(stops, percent);
      return uikitUtil.isNumber(start) ? start + Math.abs(start - end) * p * (start < end ? 1 : -1) : +end;
    }
    const unitRe = /^-?\d+(\S+)?/;
    function getUnit(stops, defaultUnit) {
      var _a;
      for (const stop of stops) {
        const match = (_a = stop.match) == null ? void 0 : _a.call(stop, unitRe);
        if (match) {
          return match[1];
        }
      }
      return defaultUnit;
    }
    function getCssValue(el, prop, value) {
      const prev = el.style[prop];
      const val = uikitUtil.css(uikitUtil.css(el, prop, value), prop);
      el.style[prop] = prev;
      return val;
    }
    function fillObject(keys2, value) {
      return keys2.reduce((data, prop) => {
        data[prop] = value;
        return data;
      }, {});
    }

    var Component = {
      mixins: [Parallax],
      data: {
        selItem: "!li"
      },
      beforeConnect() {
        this.item = uikitUtil.query(this.selItem, this.$el);
      },
      disconnected() {
        this.item = null;
      },
      events: [
        {
          name: "itemin itemout",
          self: true,
          el() {
            return this.item;
          },
          handler({ type, detail: { percent, duration, timing, dir } }) {
            uikitUtil.fastdom.read(() => {
              if (!this.matchMedia) {
                return;
              }
              const propsFrom = this.getCss(getCurrentPercent(type, dir, percent));
              const propsTo = this.getCss(isIn(type) ? 0.5 : dir > 0 ? 1 : 0);
              uikitUtil.fastdom.write(() => {
                uikitUtil.css(this.$el, propsFrom);
                uikitUtil.Transition.start(this.$el, propsTo, duration, timing).catch(uikitUtil.noop);
              });
            });
          }
        },
        {
          name: "transitioncanceled transitionend",
          self: true,
          el() {
            return this.item;
          },
          handler() {
            uikitUtil.Transition.cancel(this.$el);
          }
        },
        {
          name: "itemtranslatein itemtranslateout",
          self: true,
          el() {
            return this.item;
          },
          handler({ type, detail: { percent, dir } }) {
            uikitUtil.fastdom.read(() => {
              if (!this.matchMedia) {
                this.reset();
                return;
              }
              const props = this.getCss(getCurrentPercent(type, dir, percent));
              uikitUtil.fastdom.write(() => uikitUtil.css(this.$el, props));
            });
          }
        }
      ]
    };
    function isIn(type) {
      return uikitUtil.endsWith(type, "in");
    }
    function getCurrentPercent(type, dir, percent) {
      percent /= 2;
      return isIn(type) ^ dir < 0 ? percent : 1 - percent;
    }

    if (typeof window !== "undefined" && window.UIkit) {
      window.UIkit.component("sliderParallax", Component);
    }

    return Component;

}));
