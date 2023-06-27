/*! UIkit 3.16.15 | https://www.getuikit.com | (c) 2014 - 2023 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitslider', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitSlider = factory(global.UIkit.util));
})(this, (function (util) { 'use strict';

    var Class = {
      connected() {
        util.addClass(this.$el, this.$options.id);
      }
    };

    function resize(options) {
      return observe(util.observeResize, options, "resize");
    }
    function intersection(options) {
      return observe(util.observeIntersection, options);
    }
    function lazyload(options = {}) {
      return intersection({
        handler: function(entries, observer) {
          const { targets = this.$el, preload = 5 } = options;
          for (const el of util.toNodes(util.isFunction(targets) ? targets(this) : targets)) {
            util.$$('[loading="lazy"]', el).slice(0, preload - 1).forEach((el2) => util.removeAttr(el2, "loading"));
          }
          for (const el of entries.filter(({ isIntersecting }) => isIntersecting).map(({ target }) => target)) {
            observer.unobserve(el);
          }
        },
        ...options
      });
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

    function generateId(instance, el = instance.$el, postfix = "") {
      if (el.id) {
        return el.id;
      }
      let id = `${instance.$options.id}-${instance._uid}${postfix}`;
      if (util.$(`#${id}`)) {
        id = generateId(instance, el, `${postfix}-2`);
      }
      return id;
    }

    var SliderNav = {
      i18n: {
        next: "Next slide",
        previous: "Previous slide",
        slideX: "Slide %s",
        slideLabel: "%s of %s",
        role: "String"
      },
      data: {
        selNav: false,
        role: "region"
      },
      computed: {
        nav({ selNav }, $el) {
          return util.$(selNav, $el);
        },
        navChildren() {
          return util.children(this.nav);
        },
        selNavItem({ attrItem }) {
          return `[${attrItem}],[data-${attrItem}]`;
        },
        navItems(_, $el) {
          return util.$$(this.selNavItem, $el);
        }
      },
      watch: {
        nav(nav, prev) {
          util.attr(nav, "role", "tablist");
          if (prev) {
            this.$emit();
          }
        },
        list(list) {
          util.attr(list, "role", "presentation");
        },
        navChildren(children2) {
          util.attr(children2, "role", "presentation");
        },
        navItems(items) {
          for (const el of items) {
            const cmd = util.data(el, this.attrItem);
            const button = util.$("a,button", el) || el;
            let ariaLabel;
            let ariaControls = null;
            if (util.isNumeric(cmd)) {
              const item = util.toNumber(cmd);
              const slide = this.slides[item];
              if (slide) {
                if (!slide.id) {
                  slide.id = generateId(this, slide, `-item-${cmd}`);
                }
                ariaControls = slide.id;
              }
              ariaLabel = this.t("slideX", util.toFloat(cmd) + 1);
              util.attr(button, "role", "tab");
            } else {
              if (this.list) {
                if (!this.list.id) {
                  this.list.id = generateId(this, this.list, "-items");
                }
                ariaControls = this.list.id;
              }
              ariaLabel = this.t(cmd);
            }
            util.attr(button, {
              "aria-controls": ariaControls,
              "aria-label": util.attr(button, "aria-label") || ariaLabel
            });
          }
        },
        slides(slides) {
          slides.forEach(
            (slide, i) => util.attr(slide, {
              role: this.nav ? "tabpanel" : "group",
              "aria-label": this.t("slideLabel", i + 1, this.length),
              "aria-roledescription": this.nav ? null : "slide"
            })
          );
        },
        length(length) {
          const navLength = this.navChildren.length;
          if (this.nav && length !== navLength) {
            util.empty(this.nav);
            for (let i = 0; i < length; i++) {
              util.append(this.nav, `<li ${this.attrItem}="${i}"><a href></a></li>`);
            }
          }
        }
      },
      connected() {
        util.attr(this.$el, {
          role: this.role,
          ariaRoleDescription: "carousel"
        });
      },
      update: [
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
            if (util.closest(e.target, "a,button") && (e.type === "click" || e.keyCode === keyMap.SPACE)) {
              e.preventDefault();
              this.show(util.data(e.current, this.attrItem));
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
            const cmd = util.data(current, this.attrItem);
            if (!util.isNumeric(cmd)) {
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
            const cmd = util.data(el, this.attrItem);
            const button = util.$("a,button", el) || el;
            if (util.isNumeric(cmd)) {
              const item = util.toNumber(cmd);
              const active = item === index;
              util.toggleClass(el, this.clsActive, active);
              util.attr(button, {
                "aria-selected": active,
                tabindex: active ? null : -1
              });
              if (active) {
                focusEl = button;
              }
              focus = focus || util.matches(button, ":focus");
            } else {
              util.toggleClass(
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
            const pos = util.getEventPos(e).x * (util.isRtl ? -1 : 1);
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
            if (!this.draggable || !util.isTouch(e) && hasSelectableText(e.target) || util.closest(e.target, util.selInput) || e.button > 0 || this.length < 2) {
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
          handler: util.noop,
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
          util.on(document, pointerMove, this.move, pointerOptions);
          util.on(document, pointerUp, this.end, pointerUpOptions);
          util.css(this.list, "userSelect", "none");
        },
        move(e) {
          const distance = this.pos - this.drag;
          if (distance === 0 || this.prevPos === this.pos || !this.dragging && Math.abs(distance) < this.threshold) {
            return;
          }
          util.css(this.list, "pointerEvents", "none");
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
          [this.index, this.prevIndex].filter((i) => !util.includes([nextIndex, prevIndex], i)).forEach((i) => {
            util.trigger(slides[i], "itemhidden", [this]);
            if (edge) {
              itemShown = true;
              this.prevIndex = prevIndex;
            }
          });
          if (this.index === prevIndex && this.prevIndex !== prevIndex || itemShown) {
            util.trigger(slides[this.index], "itemshown", [this]);
          }
          if (changed) {
            this.prevIndex = prevIndex;
            this.index = nextIndex;
            !edge && util.trigger(prev, "beforeitemhide", [this]);
            util.trigger(next, "beforeitemshow", [this]);
          }
          this._transitioner = this._translate(Math.abs(this.percent), prev, !edge && next);
          if (changed) {
            !edge && util.trigger(prev, "itemhide", [this]);
            util.trigger(next, "itemshow", [this]);
          }
        },
        end() {
          util.off(document, pointerMove, this.move, pointerOptions);
          util.off(document, pointerUp, this.end, pointerUpOptions);
          if (this.dragging) {
            this.dragging = null;
            if (this.index === this.prevIndex) {
              this.percent = 1 - this.percent;
              this.dir *= -1;
              this._show(false, this.index, true);
              this._transitioner = null;
            } else {
              const dirChange = (util.isRtl ? this.dir * (util.isRtl ? 1 : -1) : this.dir) < 0 === this.prevPos > this.pos;
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
          util.css(this.list, { userSelect: "", pointerEvents: "" });
          this.drag = this.percent = null;
        }
      }
    };
    function hasSelectableText(el) {
      return util.css(el, "userSelect") !== "none" && util.toArray(el.childNodes).some((el2) => el2.nodeType === 3 && el2.textContent.trim());
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
        util.attr(this.list, "aria-live", this.autoplay ? "off" : "polite");
        this.autoplay && this.startAutoplay();
      },
      disconnected() {
        this.stopAutoplay();
      },
      update() {
        util.attr(this.slides, "tabindex", "-1");
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
        }
      ],
      methods: {
        startAutoplay() {
          this.stopAutoplay();
          this.interval = setInterval(() => {
            if (!(this.stack.length || this.draggable && util.matches(this.$el, ":focus-within") || this.pauseOnHover && util.matches(this.$el, ":hover"))) {
              this.show("next");
            }
          }, this.autoplayInterval);
        },
        stopAutoplay() {
          clearInterval(this.interval);
        }
      }
    };

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
        util.removeClass(this.slides, this.clsActive);
      },
      computed: {
        duration({ velocity }, $el) {
          return speedUp($el.offsetWidth / velocity);
        },
        list({ selList }, $el) {
          return util.$(selList, $el);
        },
        maxIndex() {
          return this.length - 1;
        },
        slides() {
          return util.children(this.list);
        },
        length() {
          return this.slides.length;
        }
      },
      watch: {
        slides(slides, prev) {
          if (prev) {
            this.$emit();
          }
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
          const prev = util.hasClass(this.slides, this.clsActive) && this.slides[prevIndex];
          const nextIndex = this.getIndex(index, this.index);
          const next = this.slides[nextIndex];
          if (prev === next) {
            reset();
            return;
          }
          this.dir = getDirection(index, prevIndex);
          this.prevIndex = prevIndex;
          this.index = nextIndex;
          if (prev && !util.trigger(prev, "beforeitemhide", [this]) || !util.trigger(next, "beforeitemshow", [this, prev])) {
            this.index = this.prevIndex;
            reset();
            return;
          }
          const promise = this._show(prev, next, force).then(() => {
            prev && util.trigger(prev, "itemhidden", [this]);
            util.trigger(next, "itemshown", [this]);
            stack.shift();
            this._transitioner = null;
            requestAnimationFrame(() => stack.length && this.show(stack.shift(), true));
          });
          prev && util.trigger(prev, "itemhide", [this]);
          util.trigger(next, "itemshow", [this]);
          return promise;
        },
        getIndex(index = this.index, prev = this.index) {
          return util.clamp(
            util.getIndex(index, this.slides, prev, this.finite),
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
            util.isNumber(prev) ? this.slides[prev] : prev,
            util.isNumber(next) ? this.slides[next] : next,
            dir * (util.isRtl ? -1 : 1),
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

    var SliderReactive = {
      update: {
        write() {
          if (this.stack.length || this.dragging) {
            return;
          }
          const index = this.getValidIndex(this.index);
          if (!~this.prevIndex || this.index !== index) {
            this.show(index);
          } else {
            this._translate(1, this.prevIndex, this.index);
          }
        },
        events: ["resize"]
      }
    };

    var SliderPreload = {
      observe: lazyload({
        target: ({ slides }) => slides,
        targets: (instance) => instance.getAdjacentSlides()
      })
    };

    function translate(value = 0, unit = "%") {
      value += value ? unit : "";
      return `translate3d(${value}, 0, 0)`;
    }

    function Transitioner(prev, next, dir, { center, easing, list }) {
      const deferred = new util.Deferred();
      const from = prev ? getLeft(prev, list, center) : getLeft(next, list, center) + util.dimensions(next).width * dir;
      const to = next ? getLeft(next, list, center) : from + util.dimensions(prev).width * dir * (util.isRtl ? -1 : 1);
      return {
        dir,
        show(duration, percent = 0, linear) {
          const timing = linear ? "linear" : easing;
          duration -= Math.round(duration * util.clamp(percent, -1, 1));
          this.translate(percent);
          percent = prev ? percent : util.clamp(percent, 0, 1);
          triggerUpdate(this.getItemIn(), "itemin", { percent, duration, timing, dir });
          prev && triggerUpdate(this.getItemIn(true), "itemout", {
            percent: 1 - percent,
            duration,
            timing,
            dir
          });
          util.Transition.start(
            list,
            { transform: translate(-to * (util.isRtl ? -1 : 1), "px") },
            duration,
            timing
          ).then(deferred.resolve, util.noop);
          return deferred.promise;
        },
        cancel() {
          util.Transition.cancel(list);
        },
        reset() {
          util.css(list, "transform", "");
        },
        forward(duration, percent = this.percent()) {
          util.Transition.cancel(list);
          return this.show(duration, percent, true);
        },
        translate(percent) {
          const distance = this.getDistance() * dir * (util.isRtl ? -1 : 1);
          util.css(
            list,
            "transform",
            translate(
              util.clamp(
                -to + (distance - distance * percent),
                -getWidth(list),
                util.dimensions(list).width
              ) * (util.isRtl ? -1 : 1),
              "px"
            )
          );
          const actives = this.getActives();
          const itemIn = this.getItemIn();
          const itemOut = this.getItemIn(true);
          percent = prev ? util.clamp(percent, -1, 1) : 0;
          for (const slide of util.children(list)) {
            const isActive = util.includes(actives, slide);
            const isIn = slide === itemIn;
            const isOut = slide === itemOut;
            const translateIn = isIn || !isOut && (isActive || dir * (util.isRtl ? -1 : 1) === -1 ^ getElLeft(slide, list) > getElLeft(prev || next));
            triggerUpdate(slide, `itemtranslate${translateIn ? "in" : "out"}`, {
              dir,
              percent: isOut ? 1 - percent : isIn ? percent : isActive ? 1 : 0
            });
          }
        },
        percent() {
          return Math.abs(
            (util.css(list, "transform").split(",")[4] * (util.isRtl ? -1 : 1) + from) / (to - from)
          );
        },
        getDistance() {
          return Math.abs(to - from);
        },
        getItemIn(out = false) {
          let actives = this.getActives();
          let nextActives = inView(list, getLeft(next || prev, list, center));
          if (out) {
            const temp = actives;
            actives = nextActives;
            nextActives = temp;
          }
          return nextActives[util.findIndex(nextActives, (el) => !util.includes(actives, el))];
        },
        getActives() {
          return inView(list, getLeft(prev || next, list, center));
        }
      };
    }
    function getLeft(el, list, center) {
      const left = getElLeft(el, list);
      return center ? left - centerEl(el, list) : Math.min(left, getMax(list));
    }
    function getMax(list) {
      return Math.max(0, getWidth(list) - util.dimensions(list).width);
    }
    function getWidth(list) {
      return util.sumBy(util.children(list), (el) => util.dimensions(el).width);
    }
    function centerEl(el, list) {
      return util.dimensions(list).width / 2 - util.dimensions(el).width / 2;
    }
    function getElLeft(el, list) {
      return el && (util.position(el).left + (util.isRtl ? util.dimensions(el).width - util.dimensions(list).width : 0)) * (util.isRtl ? -1 : 1) || 0;
    }
    function inView(list, listLeft) {
      listLeft -= 1;
      const listWidth = util.dimensions(list).width;
      const listRight = listLeft + listWidth + 2;
      return util.children(list).filter((slide) => {
        const slideLeft = getElLeft(slide, list);
        const slideRight = slideLeft + Math.min(util.dimensions(slide).width, listWidth);
        return slideLeft >= listLeft && slideRight <= listRight;
      });
    }
    function triggerUpdate(el, type, data) {
      util.trigger(el, util.createEvent(type, false, false, data));
    }

    var Component = {
      mixins: [Class, Slider, SliderReactive, SliderPreload],
      props: {
        center: Boolean,
        sets: Boolean
      },
      data: {
        center: false,
        sets: false,
        attrItem: "uk-slider-item",
        selList: ".uk-slider-items",
        selNav: ".uk-slider-nav",
        clsContainer: "uk-slider-container",
        Transitioner
      },
      computed: {
        avgWidth() {
          return getWidth(this.list) / this.length;
        },
        finite({ finite }) {
          return finite || isFinite(this.list, this.center);
        },
        maxIndex() {
          if (!this.finite || this.center && !this.sets) {
            return this.length - 1;
          }
          if (this.center) {
            return util.last(this.sets);
          }
          let lft = 0;
          const max = getMax(this.list);
          const index = util.findIndex(this.slides, (el) => {
            if (lft >= max) {
              return true;
            }
            lft += util.dimensions(el).width;
          });
          return ~index ? index : this.length - 1;
        },
        sets({ sets: enabled }) {
          if (!enabled) {
            return;
          }
          let left = 0;
          const sets = [];
          const width = util.dimensions(this.list).width;
          for (let i = 0; i < this.length; i++) {
            const slideWidth = util.dimensions(this.slides[i]).width;
            if (left + slideWidth > width) {
              left = 0;
            }
            if (this.center) {
              if (left < width / 2 && left + slideWidth + util.dimensions(this.slides[+i + 1]).width / 2 > width / 2) {
                sets.push(+i);
                left = width / 2 - slideWidth / 2;
              }
            } else if (left === 0) {
              sets.push(Math.min(+i, this.maxIndex));
            }
            left += slideWidth;
          }
          if (sets.length) {
            return sets;
          }
        },
        transitionOptions() {
          return {
            center: this.center,
            list: this.list
          };
        },
        slides() {
          return util.children(this.list).filter(util.isVisible);
        }
      },
      connected() {
        util.toggleClass(this.$el, this.clsContainer, !util.$(`.${this.clsContainer}`, this.$el));
      },
      observe: resize({
        target: ({ slides }) => slides
      }),
      update: {
        write() {
          for (const el of this.navItems) {
            const index = util.toNumber(util.data(el, this.attrItem));
            if (index !== false) {
              el.hidden = !this.maxIndex || index > this.maxIndex || this.sets && !util.includes(this.sets, index);
            }
          }
          if (this.length && !this.dragging && !this.stack.length) {
            this.reorder();
            this._translate(1);
          }
          this.updateActiveClasses();
        },
        events: ["resize"]
      },
      events: {
        beforeitemshow(e) {
          if (!this.dragging && this.sets && this.stack.length < 2 && !util.includes(this.sets, this.index)) {
            this.index = this.getValidIndex();
          }
          const diff = Math.abs(
            this.index - this.prevIndex + (this.dir > 0 && this.index < this.prevIndex || this.dir < 0 && this.index > this.prevIndex ? (this.maxIndex + 1) * this.dir : 0)
          );
          if (!this.dragging && diff > 1) {
            for (let i = 0; i < diff; i++) {
              this.stack.splice(1, 0, this.dir > 0 ? "next" : "previous");
            }
            e.preventDefault();
            return;
          }
          const index = this.dir < 0 || !this.slides[this.prevIndex] ? this.index : this.prevIndex;
          this.duration = speedUp(this.avgWidth / this.velocity) * (util.dimensions(this.slides[index]).width / this.avgWidth);
          this.reorder();
        },
        itemshow() {
          if (~this.prevIndex) {
            util.addClass(this._getTransitioner().getItemIn(), this.clsActive);
          }
        },
        itemshown() {
          this.updateActiveClasses();
        }
      },
      methods: {
        reorder() {
          if (this.finite) {
            util.css(this.slides, "order", "");
            return;
          }
          const index = this.dir > 0 && this.slides[this.prevIndex] ? this.prevIndex : this.index;
          this.slides.forEach(
            (slide, i) => util.css(
              slide,
              "order",
              this.dir > 0 && i < index ? 1 : this.dir < 0 && i >= this.index ? -1 : ""
            )
          );
          if (!this.center) {
            return;
          }
          const next = this.slides[index];
          let width = util.dimensions(this.list).width / 2 - util.dimensions(next).width / 2;
          let j = 0;
          while (width > 0) {
            const slideIndex = this.getIndex(--j + index, index);
            const slide = this.slides[slideIndex];
            util.css(slide, "order", slideIndex > index ? -2 : -1);
            width -= util.dimensions(slide).width;
          }
        },
        updateActiveClasses() {
          const actives = this._getTransitioner(this.index).getActives();
          const activeClasses = [
            this.clsActive,
            (!this.sets || util.includes(this.sets, util.toFloat(this.index))) && this.clsActivated || ""
          ];
          for (const slide of this.slides) {
            const active = util.includes(actives, slide);
            util.toggleClass(slide, activeClasses, active);
            util.attr(slide, "aria-hidden", !active);
            for (const focusable of util.$$(util.selFocusable, slide)) {
              if (!util.hasOwn(focusable, "_tabindex")) {
                focusable._tabindex = util.attr(focusable, "tabindex");
              }
              util.attr(focusable, "tabindex", active ? focusable._tabindex : -1);
            }
          }
        },
        getValidIndex(index = this.index, prevIndex = this.prevIndex) {
          index = this.getIndex(index, prevIndex);
          if (!this.sets) {
            return index;
          }
          let prev;
          do {
            if (util.includes(this.sets, index)) {
              return index;
            }
            prev = index;
            index = this.getIndex(index + this.dir, prevIndex);
          } while (index !== prev);
          return index;
        },
        getAdjacentSlides() {
          const { width } = util.dimensions(this.list);
          const left = -width;
          const right = width * 2;
          const slideWidth = util.dimensions(this.slides[this.index]).width;
          const slideLeft = this.center ? width / 2 - slideWidth / 2 : 0;
          const slides = /* @__PURE__ */ new Set();
          for (const i of [-1, 1]) {
            let currentLeft = slideLeft + (i > 0 ? slideWidth : 0);
            let j = 0;
            do {
              const slide = this.slides[this.getIndex(this.index + i + j++ * i)];
              currentLeft += util.dimensions(slide).width * i;
              slides.add(slide);
            } while (this.length > j && currentLeft > left && currentLeft < right);
          }
          return Array.from(slides);
        }
      }
    };
    function isFinite(list, center) {
      if (!list || list.length < 2) {
        return true;
      }
      const { width: listWidth } = util.dimensions(list);
      if (!center) {
        return Math.ceil(getWidth(list)) < Math.trunc(listWidth + getMaxElWidth(list));
      }
      const slides = util.children(list);
      const listHalf = Math.trunc(listWidth / 2);
      for (const index in slides) {
        const slide = slides[index];
        const slideWidth = util.dimensions(slide).width;
        const slidesInView = /* @__PURE__ */ new Set([slide]);
        let diff = 0;
        for (const i of [-1, 1]) {
          let left = slideWidth / 2;
          let j = 0;
          while (left < listHalf) {
            const nextSlide = slides[util.getIndex(+index + i + j++ * i, slides)];
            if (slidesInView.has(nextSlide)) {
              return true;
            }
            left += util.dimensions(nextSlide).width;
            slidesInView.add(nextSlide);
          }
          diff = Math.max(
            diff,
            slideWidth / 2 + util.dimensions(slides[util.getIndex(+index + i, slides)]).width / 2 - (left - listHalf)
          );
        }
        if (diff > util.sumBy(
          slides.filter((slide2) => !slidesInView.has(slide2)),
          (slide2) => util.dimensions(slide2).width
        )) {
          return true;
        }
      }
      return false;
    }
    function getMaxElWidth(list) {
      return Math.max(0, ...util.children(list).map((el) => util.dimensions(el).width));
    }

    if (typeof window !== "undefined" && window.UIkit) {
      window.UIkit.component("slider", Component);
    }

    return Component;

}));
