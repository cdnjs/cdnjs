/*! UIkit 3.13.0 | https://www.getuikit.com | (c) 2014 - 2022 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitparallax', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitParallax = factory(global.UIkit.util));
})(this, (function (uikitUtil) { 'use strict';

    var Resize = {
      connected() {var _this$$options$resize;
        this.registerObserver(
        uikitUtil.observeResize(((_this$$options$resize = this.$options.resizeTargets) == null ? void 0 : _this$$options$resize.call(this)) || this.$el, () =>
        this.$emit('resize')));


      } };

    var Scroll = {
      connected() {
        registerScrollListener(this._uid, () => this.$emit('scroll'));
      },

      disconnected() {
        unregisterScrollListener(this._uid);
      } };


    const scrollListeners = new Map();
    let unbindScrollListener;
    function registerScrollListener(id, listener) {
      unbindScrollListener =
      unbindScrollListener ||
      uikitUtil.on(window, 'scroll', () => scrollListeners.forEach((listener) => listener()), {
        passive: true,
        capture: true });


      scrollListeners.set(id, listener);
    }

    function unregisterScrollListener(id) {
      scrollListeners.delete(id);
      if (unbindScrollListener && !scrollListeners.size) {
        unbindScrollListener();
        unbindScrollListener = null;
      }
    }

    var Media = {
      props: {
        media: Boolean },


      data: {
        media: false },


      connected() {
        const media = toMedia(this.media);
        this.mediaObj = window.matchMedia(media);
        const handler = () => {
          this.matchMedia = this.mediaObj.matches;
          uikitUtil.trigger(this.$el, uikitUtil.createEvent('mediachange', false, true, [this.mediaObj]));
        };
        this.offMediaObj = uikitUtil.on(this.mediaObj, 'change', () => {
          handler();
          this.$emit('resize');
        });
        handler();
      },

      disconnected() {var _this$offMediaObj;
        (_this$offMediaObj = this.offMediaObj) == null ? void 0 : _this$offMediaObj.call(this);
      } };


    function toMedia(value) {
      if (uikitUtil.isString(value)) {
        if (uikitUtil.startsWith(value, '@')) {
          const name = "breakpoint-" + value.substr(1);
          value = uikitUtil.toFloat(uikitUtil.getCssVar(name));
        } else if (isNaN(value)) {
          return value;
        }
      }

      return value && uikitUtil.isNumeric(value) ? "(min-width: " + value + "px)" : '';
    }

    uikitUtil.memoize(async (src) => {
      if (src) {
        if (uikitUtil.startsWith(src, 'data:')) {
          return decodeURIComponent(src.split(',')[1]);
        } else {
          return (await fetch(src)).text();
        }
      } else {
        return Promise.reject();
      }
    });

    function getMaxPathLength(el) {
      return Math.ceil(
      Math.max(
      0,
      ...uikitUtil.$$('[stroke]', el).map((stroke) => {
        try {
          return stroke.getTotalLength();
        } catch (e) {
          return 0;
        }
      })));


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
      bgy: backgroundFn };


    const { keys } = Object;

    var Parallax = {
      mixins: [Media],

      props: fillObject(keys(props), 'list'),

      data: fillObject(keys(props), undefined),

      computed: {
        props(properties, $el) {
          return keys(props).reduce((result, prop) => {
            if (!uikitUtil.isUndefined(properties[prop])) {
              result[prop] = props[prop](prop, $el, properties[prop].slice());
            }
            return result;
          }, {});
        } },


      events: {
        load() {
          this.$emit();
        } },


      methods: {
        reset() {
          uikitUtil.each(this.getCss(0), (_, prop) => uikitUtil.css(this.$el, prop, ''));
        },

        getCss(percent) {
          const css = { transform: '', filter: '' };
          for (const prop in this.props) {
            this.props[prop](css, percent);
          }
          return css;
        } } };



    function transformFn(prop, el, stops) {
      const unit = getUnit(stops) || { x: 'px', y: 'px', rotate: 'deg' }[prop] || '';
      let transformFn;

      if (prop === 'x' || prop === 'y') {
        prop = "translate" + uikitUtil.ucfirst(prop);
        transformFn = (stop) => uikitUtil.toFloat(uikitUtil.toFloat(stop).toFixed(unit === 'px' ? 0 : 6));
      }

      if (stops.length === 1) {
        stops.unshift(prop === 'scale' ? 1 : 0);
      }

      stops = parseStops(stops, transformFn);

      return (css, percent) => {
        css.transform += " " + prop + "(" + getValue(stops, percent) + unit + ")";
      };
    }

    function colorFn(prop, el, stops) {
      if (stops.length === 1) {
        stops.unshift(getCssValue(el, prop, ''));
      }

      stops = parseStops(stops, (stop) => parseColor(el, stop));

      return (css, percent) => {
        const [start, end, p] = getStop(stops, percent);
        const value = start.
        map((value, i) => {
          value += p * (end[i] - value);
          return i === 3 ? uikitUtil.toFloat(value) : parseInt(value, 10);
        }).
        join(',');
        css[prop] = "rgba(" + value + ")";
      };
    }

    function parseColor(el, color) {
      return getCssValue(el, 'color', color).
      split(/[(),]/g).
      slice(1, -1).
      concat(1).
      slice(0, 4).
      map(uikitUtil.toFloat);
    }

    function filterFn(prop, el, stops) {
      if (stops.length === 1) {
        stops.unshift(0);
      }

      const unit = getUnit(stops) || { blur: 'px', hue: 'deg' }[prop] || '%';
      prop = { fopacity: 'opacity', hue: 'hue-rotate' }[prop] || prop;
      stops = parseStops(stops);

      return (css, percent) => {
        const value = getValue(stops, percent);
        css.filter += " " + prop + "(" + (value + unit) + ")";
      };
    }

    function cssPropFn(prop, el, stops) {
      if (stops.length === 1) {
        stops.unshift(getCssValue(el, prop, ''));
      }

      stops = parseStops(stops);

      return (css, percent) => {
        css[prop] = getValue(stops, percent);
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
        return unit === '%' ? stop * length / 100 : stop;
      });

      if (!stops.some((_ref) => {let [value] = _ref;return value;})) {
        return uikitUtil.noop;
      }

      uikitUtil.css(el, 'strokeDasharray', length);

      return (css, percent) => {
        css.strokeDashoffset = getValue(stops, percent);
      };
    }

    function backgroundFn(prop, el, stops) {
      if (stops.length === 1) {
        stops.unshift(0);
      }

      prop = prop.substr(-1);
      const attr = prop === 'y' ? 'height' : 'width';
      stops = parseStops(stops, (stop) => uikitUtil.toPx(stop, attr, el));

      const bgPos = getCssValue(el, "background-position-" + prop, '');

      return getCssValue(el, 'backgroundSize', '') === 'cover' ?
      backgroundCoverFn(prop, el, stops, bgPos, attr) :
      setBackgroundPosFn(prop, stops, bgPos);
    }

    function backgroundCoverFn(prop, el, stops, bgPos, attr) {
      const dimImage = getBackgroundImageDimensions(el);

      if (!dimImage.width) {
        return uikitUtil.noop;
      }

      const values = stops.map((_ref2) => {let [value] = _ref2;return value;});
      const min = Math.min(...values);
      const max = Math.max(...values);
      const down = values.indexOf(min) < values.indexOf(max);

      const diff = max - min;
      let pos = (down ? -diff : 0) - (down ? min : max);

      const dimEl = {
        width: el.offsetWidth,
        height: el.offsetHeight };


      const baseDim = uikitUtil.Dimensions.cover(dimImage, dimEl);
      const span = baseDim[attr] - dimEl[attr];

      if (span < diff) {
        dimEl[attr] = baseDim[attr] + diff - span;
      } else if (span > diff) {
        const posPercentage = dimEl[attr] / uikitUtil.toPx(bgPos, attr, el, true);

        if (posPercentage) {
          pos -= (span - diff) / posPercentage;
        }
      }

      const dim = uikitUtil.Dimensions.cover(dimImage, dimEl);

      const fn = setBackgroundPosFn(prop, stops, pos + "px");
      return (css, percent) => {
        fn(css, percent);
        css.backgroundSize = dim.width + "px " + dim.height + "px";
        css.backgroundRepeat = 'no-repeat';
      };
    }

    function setBackgroundPosFn(prop, stops, pos) {
      return function (css, percent) {
        css["background-position-" + prop] = "calc(" + pos + " + " + getValue(stops, percent) + "px)";
      };
    }

    const dimensions = {};
    function getBackgroundImageDimensions(el) {
      const src = uikitUtil.css(el, 'backgroundImage').replace(/^none|url\(["']?(.+?)["']?\)$/, '$1');

      if (dimensions[src]) {
        return dimensions[src];
      }

      const image = new Image();
      if (src) {
        image.src = src;

        if (!image.naturalWidth) {
          image.onload = () => {
            dimensions[src] = toDimensions(image);
            uikitUtil.trigger(el, uikitUtil.createEvent('load', false));
          };
          return toDimensions(image);
        }
      }

      return dimensions[src] = toDimensions(image);
    }

    function toDimensions(image) {
      return {
        width: image.naturalWidth,
        height: image.naturalHeight };

    }

    function parseStops(stops, fn) {if (fn === void 0) {fn = uikitUtil.toFloat;}
      const result = [];
      const { length } = stops;
      let nullIndex = 0;
      for (let i = 0; i < length; i++) {
        let [value, percent] = uikitUtil.isString(stops[i]) ? stops[i].trim().split(' ') : [stops[i]];
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
      const index = uikitUtil.findIndex(stops.slice(1), (_ref3) => {let [, targetPercent] = _ref3;return percent <= targetPercent;}) + 1;
      return [
      stops[index - 1][0],
      stops[index][0],
      (percent - stops[index - 1][1]) / (stops[index][1] - stops[index - 1][1])];

    }

    function getValue(stops, percent) {
      const [start, end, p] = getStop(stops, percent);
      return uikitUtil.isNumber(start) ? start + Math.abs(start - end) * p * (start < end ? 1 : -1) : +end;
    }

    const unitRe = /^-?\d+([^\s]*)/;
    function getUnit(stops, defaultUnit) {
      for (const stop of stops) {
        const match = stop.match == null ? void 0 : stop.match(unitRe);
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

    function fillObject(keys, value) {
      return keys.reduce((data, prop) => {
        data[prop] = value;
        return data;
      }, {});
    }

    var Component = {
      mixins: [Parallax, Resize, Scroll],

      props: {
        target: String,
        viewport: Number, // Deprecated
        easing: Number,
        start: String,
        end: String },


      data: {
        target: false,
        viewport: 1,
        easing: 1,
        start: 0,
        end: 0 },


      computed: {
        target(_ref, $el) {let { target } = _ref;
          return getOffsetElement(target && uikitUtil.query(target, $el) || $el);
        },

        start(_ref2) {let { start } = _ref2;
          return uikitUtil.toPx(start, 'height', this.target, true);
        },

        end(_ref3) {let { end, viewport } = _ref3;
          return uikitUtil.toPx(
          end || (viewport = (1 - viewport) * 100) && viewport + "vh+" + viewport + "%",
          'height',
          this.target,
          true);

        } },


      update: {
        read(_ref4, types) {let { percent } = _ref4;
          if (!types.has('scroll')) {
            percent = false;
          }

          if (!this.matchMedia) {
            return;
          }

          const prev = percent;
          percent = ease(uikitUtil.scrolledOver(this.target, this.start, this.end), this.easing);

          return {
            percent,
            style: prev === percent ? false : this.getCss(percent) };

        },

        write(_ref5) {let { style } = _ref5;
          if (!this.matchMedia) {
            this.reset();
            return;
          }

          style && uikitUtil.css(this.$el, style);
        },

        events: ['scroll', 'resize'] } };



    function ease(percent, easing) {
      return easing >= 0 ? Math.pow(percent, easing + 1) : 1 - Math.pow(1 - percent, -easing + 1);
    }

    // SVG elements do not inherit from HTMLElement
    function getOffsetElement(el) {
      return el ? 'offsetTop' in el ? el : getOffsetElement(uikitUtil.parent(el)) : document.documentElement;
    }

    if (typeof window !== 'undefined' && window.UIkit) {
      window.UIkit.component('parallax', Component);
    }

    return Component;

}));
