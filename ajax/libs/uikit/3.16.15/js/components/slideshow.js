/*! UIkit 3.16.15 | https://www.getuikit.com | (c) 2014 - 2023 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitslideshow', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitSlideshow = factory(global.UIkit.util));
})(this, (function (util) { 'use strict';

    var Class = {
      connected() {
        util.addClass(this.$el, this.$options.id);
      }
    };

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
      return Math.abs(util.css(el, "transform").split(",")[4] / el.offsetWidth) || 0;
    }
    function translate(value = 0, unit = "%") {
      value += value ? unit : "";
      return `translate3d(${value}, 0, 0)`;
    }
    function scale3d(value) {
      return `scale3d(${value}, ${value}, 1)`;
    }

    function Transitioner(prev, next, dir, { animation, easing }) {
      const { percent, translate, show = util.noop } = animation;
      const props = show(dir);
      const deferred = new util.Deferred();
      return {
        dir,
        show(duration, percent2 = 0, linear) {
          const timing = linear ? "linear" : easing;
          duration -= Math.round(duration * util.clamp(percent2, -1, 1));
          this.translate(percent2);
          triggerUpdate(next, "itemin", { percent: percent2, duration, timing, dir });
          triggerUpdate(prev, "itemout", { percent: 1 - percent2, duration, timing, dir });
          Promise.all([
            util.Transition.start(next, props[1], duration, timing),
            util.Transition.start(prev, props[0], duration, timing)
          ]).then(() => {
            this.reset();
            deferred.resolve();
          }, util.noop);
          return deferred.promise;
        },
        cancel() {
          util.Transition.cancel([next, prev]);
        },
        reset() {
          for (const prop in props[0]) {
            util.css([next, prev], prop, "");
          }
        },
        forward(duration, percent2 = this.percent()) {
          util.Transition.cancel([next, prev]);
          return this.show(duration, percent2, true);
        },
        translate(percent2) {
          this.reset();
          const props2 = translate(percent2, dir);
          util.css(next, props2[1]);
          util.css(prev, props2[0]);
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
      util.trigger(el, util.createEvent(type, false, false, data));
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
          util.addClass(target, this.clsActive);
        },
        itemshown({ target }) {
          util.addClass(target, this.clsActivated);
        },
        itemhidden({ target }) {
          util.removeClass(target, this.clsActive, this.clsActivated);
        }
      }
    };

    var Animations = {
      ...Animations$1,
      fade: {
        show() {
          return [{ opacity: 0, zIndex: 0 }, { zIndex: -1 }];
        },
        percent(current) {
          return 1 - util.css(current, "opacity");
        },
        translate(percent) {
          return [{ opacity: 1 - percent, zIndex: 0 }, { zIndex: -1 }];
        }
      },
      scale: {
        show() {
          return [{ opacity: 0, transform: scale3d(1 + 0.5), zIndex: 0 }, { zIndex: -1 }];
        },
        percent(current) {
          return 1 - util.css(current, "opacity");
        },
        translate(percent) {
          return [
            { opacity: 1 - percent, transform: scale3d(1 + 0.5 * percent), zIndex: 0 },
            { zIndex: -1 }
          ];
        }
      },
      pull: {
        show(dir) {
          return dir < 0 ? [
            { transform: translate(30), zIndex: -1 },
            { transform: translate(), zIndex: 0 }
          ] : [
            { transform: translate(-100), zIndex: 0 },
            { transform: translate(), zIndex: -1 }
          ];
        },
        percent(current, next, dir) {
          return dir < 0 ? 1 - translated(next) : translated(current);
        },
        translate(percent, dir) {
          return dir < 0 ? [
            { transform: translate(30 * percent), zIndex: -1 },
            { transform: translate(-100 * (1 - percent)), zIndex: 0 }
          ] : [
            { transform: translate(-percent * 100), zIndex: 0 },
            { transform: translate(30 * (1 - percent)), zIndex: -1 }
          ];
        }
      },
      push: {
        show(dir) {
          return dir < 0 ? [
            { transform: translate(100), zIndex: 0 },
            { transform: translate(), zIndex: -1 }
          ] : [
            { transform: translate(-30), zIndex: -1 },
            { transform: translate(), zIndex: 0 }
          ];
        },
        percent(current, next, dir) {
          return dir > 0 ? 1 - translated(next) : translated(current);
        },
        translate(percent, dir) {
          return dir < 0 ? [
            { transform: translate(percent * 100), zIndex: 0 },
            { transform: translate(-30 * (1 - percent)), zIndex: -1 }
          ] : [
            { transform: translate(-30 * percent), zIndex: -1 },
            { transform: translate(100 * (1 - percent)), zIndex: 0 }
          ];
        }
      }
    };

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

    var Component = {
      mixins: [Class, Slideshow, SliderReactive, SliderPreload],
      props: {
        ratio: String,
        minHeight: Number,
        maxHeight: Number
      },
      data: {
        ratio: "16:9",
        minHeight: false,
        maxHeight: false,
        selList: ".uk-slideshow-items",
        attrItem: "uk-slideshow-item",
        selNav: ".uk-slideshow-nav",
        Animations
      },
      update: {
        read() {
          if (!this.list) {
            return false;
          }
          let [width, height] = this.ratio.split(":").map(Number);
          height = height * this.list.offsetWidth / width || 0;
          if (this.minHeight) {
            height = Math.max(this.minHeight, height);
          }
          if (this.maxHeight) {
            height = Math.min(this.maxHeight, height);
          }
          return { height: height - util.boxModelAdjust(this.list, "height", "content-box") };
        },
        write({ height }) {
          height > 0 && util.css(this.list, "minHeight", height);
        },
        events: ["resize"]
      },
      methods: {
        getAdjacentSlides() {
          return [1, -1].map((i) => this.slides[this.getIndex(this.index + i)]);
        }
      }
    };

    if (typeof window !== "undefined" && window.UIkit) {
      window.UIkit.component("slideshow", Component);
    }

    return Component;

}));
