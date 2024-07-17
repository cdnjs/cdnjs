/*! UIkit 3.21.7 | https://www.getuikit.com | (c) 2014 - 2024 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitlightbox_panel', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitLightbox_panel = factory(global.UIkit.util));
})(this, (function (util) { 'use strict';

    let prevented;
    function preventBackgroundScroll(el) {
      const off = util.on(
        el,
        "touchstart",
        (e) => {
          if (e.targetTouches.length !== 1 || util.matches(e.target, 'input[type="range"')) {
            return;
          }
          let prev = util.getEventPos(e).y;
          const offMove = util.on(
            el,
            "touchmove",
            (e2) => {
              const pos = util.getEventPos(e2).y;
              if (pos === prev) {
                return;
              }
              prev = pos;
              if (!util.scrollParents(e2.target).some((scrollParent) => {
                if (!el.contains(scrollParent)) {
                  return false;
                }
                let { scrollHeight, clientHeight } = scrollParent;
                return clientHeight < scrollHeight;
              })) {
                e2.preventDefault();
              }
            },
            { passive: false }
          );
          util.once(el, "scroll touchend touchcanel", offMove, { capture: true });
        },
        { passive: true }
      );
      if (prevented) {
        return off;
      }
      prevented = true;
      const { scrollingElement } = document;
      util.css(scrollingElement, {
        overflowY: CSS.supports("overflow", "clip") ? "clip" : "hidden",
        touchAction: "none",
        paddingRight: util.width(window) - scrollingElement.clientWidth || ""
      });
      return () => {
        prevented = false;
        off();
        util.css(scrollingElement, { overflowY: "", touchAction: "", paddingRight: "" });
      };
    }

    var Class = {
      connected() {
        util.addClass(this.$el, this.$options.id);
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
          return container === true && this.$container || container && util.$(container);
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
        clsEnter: "uk-togglable-enter",
        clsLeave: "uk-togglable-leave"
      },
      computed: {
        hasAnimation: ({ animation }) => !!animation[0],
        hasTransition: ({ animation }) => ["slide", "reveal"].some((transition) => util.startsWith(animation[0], transition))
      },
      methods: {
        async toggleElement(targets, toggle, animate) {
          try {
            await Promise.all(
              util.toNodes(targets).map((el) => {
                const show = util.isBoolean(toggle) ? toggle : !this.isToggled(el);
                if (!util.trigger(el, `before${show ? "show" : "hide"}`, [this])) {
                  return Promise.reject();
                }
                const promise = (util.isFunction(animate) ? animate : animate === false || !this.hasAnimation ? toggleInstant : this.hasTransition ? toggleTransition : toggleAnimation)(el, show, this);
                const cls = show ? this.clsEnter : this.clsLeave;
                util.addClass(el, cls);
                util.trigger(el, show ? "show" : "hide", [this]);
                const done = () => {
                  util.removeClass(el, cls);
                  util.trigger(el, show ? "shown" : "hidden", [this]);
                };
                return promise ? promise.then(done, () => {
                  util.removeClass(el, cls);
                  return Promise.reject();
                }) : done();
              })
            );
            return true;
          } catch (e) {
            return false;
          }
        },
        isToggled(el = this.$el) {
          el = util.toNode(el);
          return util.hasClass(el, this.clsEnter) ? true : util.hasClass(el, this.clsLeave) ? false : this.cls ? util.hasClass(el, this.cls.split(" ")[0]) : util.isVisible(el);
        },
        _toggle(el, toggled) {
          if (!el) {
            return;
          }
          toggled = Boolean(toggled);
          let changed;
          if (this.cls) {
            changed = util.includes(this.cls, " ") || toggled !== util.hasClass(el, this.cls);
            changed && util.toggleClass(el, this.cls, util.includes(this.cls, " ") ? void 0 : toggled);
          } else {
            changed = toggled === el.hidden;
            changed && (el.hidden = !toggled);
          }
          util.$$("[autofocus]", el).some((el2) => util.isVisible(el2) ? el2.focus() || true : el2.blur());
          if (changed) {
            util.trigger(el, "toggled", [toggled, this]);
          }
        }
      }
    };
    function toggleInstant(el, show, { _toggle }) {
      util.Animation.cancel(el);
      util.Transition.cancel(el);
      return _toggle(el, show);
    }
    async function toggleTransition(el, show, { animation, duration, velocity, transition, _toggle }) {
      var _a;
      const [mode = "reveal", startProp = "top"] = ((_a = animation[0]) == null ? void 0 : _a.split("-")) || [];
      const dirs = [
        ["left", "right"],
        ["top", "bottom"]
      ];
      const dir = dirs[util.includes(dirs[0], startProp) ? 0 : 1];
      const end = dir[1] === startProp;
      const props = ["width", "height"];
      const dimProp = props[dirs.indexOf(dir)];
      const marginProp = `margin-${dir[0]}`;
      const marginStartProp = `margin-${startProp}`;
      let currentDim = util.dimensions(el)[dimProp];
      const inProgress = util.Transition.inProgress(el);
      await util.Transition.cancel(el);
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
      const dim = util.dimensions(el);
      const currentMargin = util.toFloat(util.css(el, marginProp));
      const marginStart = util.toFloat(util.css(el, marginStartProp));
      const endDim = dim[dimProp] + marginStart;
      if (!inProgress && !show) {
        currentDim += marginStart;
      }
      const [wrapper] = util.wrapInner(el, "<div>");
      util.css(wrapper, {
        boxSizing: "border-box",
        height: dim.height,
        width: dim.width,
        ...util.css(el, [
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
      util.css(el, {
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
        util.css(el, marginProp, endDim - currentDim + currentMargin);
        endProps[marginProp] = show ? currentMargin : endDim + currentMargin;
      }
      if (!end ^ mode === "reveal") {
        util.css(wrapper, marginProp, -endDim + currentDim);
        util.Transition.start(wrapper, { [marginProp]: show ? 0 : -endDim }, duration, transition);
      }
      try {
        await util.Transition.start(el, endProps, duration, transition);
      } finally {
        util.css(el, prevProps);
        util.unwrap(wrapper.firstChild);
        if (!show) {
          _toggle(el, false);
        }
      }
    }
    function toggleAnimation(el, show, cmp) {
      const { animation, duration, _toggle } = cmp;
      if (show) {
        _toggle(el, true);
        return util.Animation.in(el, animation[0], duration, cmp.origin);
      }
      return util.Animation.out(el, animation[1] || animation[0], duration, cmp.origin).then(
        () => _toggle(el, false)
      );
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
        panel: ({ selPanel }, $el) => util.$(selPanel, $el),
        transitionElement() {
          return this.panel;
        },
        bgClose({ bgClose }) {
          return bgClose && this.panel;
        }
      },
      connected() {
        util.attr(this.panel || this.$el, "role", this.role);
        if (this.overlay) {
          util.attr(this.panel || this.$el, "aria-modal", true);
        }
      },
      beforeDisconnect() {
        if (util.includes(active, this)) {
          this.toggleElement(this.$el, false, false);
        }
      },
      events: [
        {
          name: "click",
          delegate: ({ selClose }) => `${selClose},a[href*="#"]`,
          handler(e) {
            const { current, defaultPrevented } = e;
            const { hash } = current;
            if (!defaultPrevented && hash && util.isSameSiteAnchor(current) && !this.$el.contains(util.$(hash))) {
              this.hide();
            } else if (util.matches(current, this.selClose)) {
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
            if (this.isToggled() === util.includes(active, this)) {
              this.toggle();
            }
          }
        },
        {
          name: "beforeshow",
          self: true,
          handler(e) {
            if (util.includes(active, this)) {
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
              util.css(this.$el, "zIndex", util.toFloat(util.css(this.$el, "zIndex")) + active.length);
            }
            const handlers = [
              this.overlay && preventBackgroundFocus(this),
              this.overlay && preventBackgroundScroll(this.$el),
              this.bgClose && listenForBackgroundClose(this),
              this.escClose && listenForEscClose(this)
            ];
            util.once(
              this.$el,
              "hidden",
              () => handlers.forEach((handler) => handler && handler()),
              { self: true }
            );
            util.addClass(document.documentElement, this.clsPage);
          }
        },
        {
          name: "shown",
          self: true,
          handler() {
            if (!util.isFocusable(this.$el)) {
              util.attr(this.$el, "tabindex", "-1");
            }
            if (!util.matches(this.$el, ":focus-within")) {
              this.$el.focus();
            }
          }
        },
        {
          name: "hidden",
          self: true,
          handler() {
            if (util.includes(active, this)) {
              active.splice(active.indexOf(this), 1);
            }
            util.css(this.$el, "zIndex", "");
            if (!active.some((modal) => modal.clsPage === this.clsPage)) {
              util.removeClass(document.documentElement, this.clsPage);
            }
          }
        }
      ],
      methods: {
        toggle() {
          return this.isToggled() ? this.hide() : this.show();
        },
        show() {
          if (this.container && util.parent(this.$el) !== this.container) {
            util.append(this.container, this.$el);
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
        (resolve, reject) => util.once(el, "show hide", () => {
          var _a;
          (_a = el._reject) == null ? void 0 : _a.call(el);
          el._reject = reject;
          _toggle(el, show);
          const off = util.once(
            transitionElement,
            "transitionstart",
            () => {
              util.once(transitionElement, "transitionend transitioncancel", resolve, {
                self: true
              });
              clearTimeout(timer);
            },
            { self: true }
          );
          const timer = setTimeout(
            () => {
              off();
              resolve();
            },
            toMs(util.css(transitionElement, "transitionDuration"))
          );
        })
      ).then(() => delete el._reject);
    }
    function toMs(time) {
      return time ? util.endsWith(time, "ms") ? util.toFloat(time) : util.toFloat(time) * 1e3 : 0;
    }
    function preventBackgroundFocus(modal) {
      return util.on(document, "focusin", (e) => {
        if (util.last(active) === modal && !modal.$el.contains(e.target)) {
          modal.$el.focus();
        }
      });
    }
    function listenForBackgroundClose(modal) {
      return util.on(document, util.pointerDown, ({ target }) => {
        if (util.last(active) !== modal || modal.overlay && !modal.$el.contains(target) || modal.panel.contains(target)) {
          return;
        }
        util.once(
          document,
          `${util.pointerUp} ${util.pointerCancel} scroll`,
          ({ defaultPrevented, type, target: newTarget }) => {
            if (!defaultPrevented && type === util.pointerUp && target === newTarget) {
              modal.hide();
            }
          },
          true
        );
      });
    }
    function listenForEscClose(modal) {
      return util.on(document, "keydown", (e) => {
        if (e.keyCode === 27 && util.last(active) === modal) {
          modal.hide();
        }
      });
    }

    function callUpdate(instance, e = "update") {
      if (!instance._connected) {
        return;
      }
      if (!instance._updates.length) {
        return;
      }
      if (!instance._queued) {
        instance._queued = /* @__PURE__ */ new Set();
        util.fastdom.read(() => {
          if (instance._connected) {
            runUpdates(instance, instance._queued);
          }
          instance._queued = null;
        });
      }
      instance._queued.add(e.type || e);
    }
    function runUpdates(instance, types) {
      for (const { read, write, events = [] } of instance._updates) {
        if (!types.has("update") && !events.some((type) => types.has(type))) {
          continue;
        }
        let result;
        if (read) {
          result = read.call(instance, instance._data, types);
          if (result && util.isPlainObject(result)) {
            util.assign(instance._data, result);
          }
        }
        if (write && result !== false) {
          util.fastdom.write(() => {
            if (instance._connected) {
              write.call(instance, instance._data, types);
            }
          });
        }
      }
    }

    function resize(options) {
      return observe(util.observeResize, options, "resize");
    }
    function observe(observe2, options, emit) {
      return {
        observe: observe2,
        handler() {
          callUpdate(this, emit);
        },
        ...options
      };
    }

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
      return Math.abs(new DOMMatrix(util.css(el, "transform")).m41 / el.offsetWidth);
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
      const { promise, resolve } = withResolvers();
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
            resolve();
          }, util.noop);
          return promise;
        },
        cancel() {
          return util.Transition.cancel([next, prev]);
        },
        reset() {
          for (const prop in props[0]) {
            util.css([next, prev], prop, "");
          }
        },
        async forward(duration, percent2 = this.percent()) {
          await this.cancel();
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
    function withResolvers() {
      let resolve;
      return { promise: new Promise((res) => resolve = res), resolve };
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
          el: () => document,
          filter: ({ autoplay }) => autoplay,
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
            if (!(this.stack.length || this.draggable && util.matches(this.$el, ":focus-within") && !util.matches(this.$el, ":focus") || this.pauseOnHover && util.matches(this.$el, ":hover"))) {
              this.show("next");
            }
          }, this.autoplayInterval);
        },
        stopAutoplay() {
          clearInterval(this.interval);
        }
      }
    };

    const pointerOptions = { passive: false, capture: true };
    const pointerUpOptions = { passive: true, capture: true };
    const pointerDown = "touchstart mousedown";
    const pointerMove = "touchmove mousemove";
    const pointerUp = "touchend touchcancel mouseup click input scroll";
    const preventClick = (e) => e.preventDefault();
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
          delegate: ({ selList }) => `${selList} > *`,
          handler(e) {
            if (!this.draggable || this.parallax || !util.isTouch(e) && hasSelectableText(e.target) || e.target.closest(util.selInput) || e.button > 0 || this.length < 2) {
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
          el: ({ list }) => list,
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
          if (!this.dragging) {
            util.on(this.list, "click", preventClick, pointerOptions);
          }
          e.cancelable && e.preventDefault();
          this.dragging = true;
          this.dir = distance < 0 ? 1 : -1;
          let { slides, prevIndex } = this;
          let dis = Math.abs(distance);
          let nextIndex = this.getIndex(prevIndex + this.dir);
          let width = getDistance.call(this, prevIndex, nextIndex);
          while (nextIndex !== prevIndex && dis > width) {
            this.drag -= width * this.dir;
            prevIndex = nextIndex;
            dis -= width;
            nextIndex = this.getIndex(prevIndex + this.dir);
            width = getDistance.call(this, prevIndex, nextIndex);
          }
          this.percent = dis / width;
          const prev = slides[prevIndex];
          const next = slides[nextIndex];
          const changed = this.index !== nextIndex;
          const edge = prevIndex === nextIndex;
          let itemShown;
          for (const i of [this.index, this.prevIndex]) {
            if (!util.includes([nextIndex, prevIndex], i)) {
              util.trigger(slides[i], "itemhidden", [this]);
              if (edge) {
                itemShown = true;
                this.prevIndex = prevIndex;
              }
            }
          }
          if (this.index === prevIndex && this.prevIndex !== prevIndex || itemShown) {
            util.trigger(slides[this.index], "itemshown", [this]);
          }
          if (changed) {
            this.prevIndex = prevIndex;
            this.index = nextIndex;
            if (!edge) {
              util.trigger(prev, "beforeitemhide", [this]);
              util.trigger(prev, "itemhide", [this]);
            }
            util.trigger(next, "beforeitemshow", [this]);
            util.trigger(next, "itemshow", [this]);
          }
          this._transitioner = this._translate(Math.abs(this.percent), prev, !edge && next);
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
          setTimeout(() => util.off(this.list, "click", preventClick, pointerOptions));
          util.css(this.list, { userSelect: "" });
          this.drag = this.percent = null;
        }
      }
    };
    function getDistance(prev, next) {
      return this._getTransitioner(prev, prev !== next && next).getDistance() || this.slides[prev].offsetWidth;
    }
    function hasSelectableText(el) {
      return util.css(el, "userSelect") !== "none" && util.toArray(el.childNodes).some((el2) => el2.nodeType === 3 && el2.textContent.trim());
    }

    util.memoize((id, props) => {
      const attributes = Object.keys(props);
      const filter = attributes.concat(id).map((key) => [util.hyphenate(key), `data-${util.hyphenate(key)}`]).flat();
      return { attributes, filter };
    });

    let id = 1;
    function generateId(instance, el = null) {
      return (el == null ? void 0 : el.id) || `${instance.$options.id}-${id++}`;
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
        nav: ({ selNav }, $el) => util.$(selNav, $el),
        navChildren() {
          return util.children(this.nav);
        },
        selNavItem: ({ attrItem }) => `[${attrItem}],[data-${attrItem}]`,
        navItems(_, $el) {
          return util.$$(this.selNavItem, $el);
        }
      },
      watch: {
        nav(nav, prev) {
          util.attr(nav, "role", "tablist");
          this.padNavitems();
          if (prev) {
            this.$emit();
          }
        },
        list(list) {
          if (util.isTag(list, "ul")) {
            util.attr(list, "role", "presentation");
          }
        },
        navChildren(children2) {
          util.attr(children2, "role", "presentation");
          this.padNavitems();
          this.updateNav();
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
                  slide.id = generateId(this, slide);
                }
                ariaControls = slide.id;
              }
              ariaLabel = this.t("slideX", util.toFloat(cmd) + 1);
              util.attr(button, "role", "tab");
            } else {
              if (this.list) {
                if (!this.list.id) {
                  this.list.id = generateId(this, this.list);
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
          this.padNavitems();
        }
      },
      connected() {
        util.attr(this.$el, {
          role: this.role,
          "aria-roledescription": "carousel"
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
          delegate: ({ selNavItem }) => selNavItem,
          filter: ({ parallax }) => !parallax,
          handler(e) {
            if (e.target.closest("a,button") && (e.type === "click" || e.keyCode === keyMap.SPACE)) {
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
          delegate: ({ selNavItem }) => selNavItem,
          filter: ({ parallax }) => !parallax,
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
          for (const el of this.navItems) {
            const cmd = util.data(el, this.attrItem);
            const button = util.$("a,button", el) || el;
            if (util.isNumeric(cmd)) {
              const item = util.toNumber(cmd);
              const active = item === index;
              util.toggleClass(el, this.clsActive, active);
              util.toggleClass(button, "uk-disabled", this.parallax);
              util.attr(button, {
                "aria-selected": active,
                tabindex: active && !this.parallax ? null : -1
              });
              if (active && button && util.matches(util.parent(el), ":focus-within")) {
                button.focus();
              }
            } else {
              util.toggleClass(
                el,
                "uk-invisible",
                this.finite && (cmd === "previous" && index === 0 || cmd === "next" && index >= this.maxIndex)
              );
            }
          }
        },
        padNavitems() {
          if (!this.nav) {
            return;
          }
          const children2 = [];
          for (let i = 0; i < this.length; i++) {
            const attr2 = `${this.attrItem}="${i}"`;
            children2[i] = this.navChildren.findLast((el) => el.matches(`[${attr2}]`)) || util.$(`<li ${attr2}><a href></a></li>`);
          }
          if (!util.isEqual(children2, this.navChildren)) {
            util.html(this.nav, children2);
          }
        }
      }
    };

    const easeOutQuad = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    const easeOutQuart = "cubic-bezier(0.165, 0.84, 0.44, 1)";
    var Slider = {
      mixins: [SliderAutoplay, SliderDrag, SliderNav, I18n],
      props: {
        clsActivated: String,
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
        clsActivated: "",
        clsEnter: "uk-slide-enter",
        clsLeave: "uk-slide-leave",
        clsSlideActive: "uk-slide-active",
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
        duration: ({ velocity }, $el) => speedUp($el.offsetWidth / velocity),
        list: ({ selList }, $el) => util.$(selList, $el),
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
      events: {
        itemshow({ target }) {
          util.addClass(target, this.clsEnter, this.clsSlideActive);
        },
        itemshown({ target }) {
          util.removeClass(target, this.clsEnter);
        },
        itemhide({ target }) {
          util.addClass(target, this.clsLeave);
        },
        itemhidden({ target }) {
          util.removeClass(target, this.clsLeave, this.clsSlideActive);
        }
      },
      methods: {
        show(index, force = false) {
          var _a;
          if (this.dragging || !this.length || this.parallax) {
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
            if (stack.length) {
              requestAnimationFrame(() => stack.length && this.show(stack.shift(), true));
            }
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
        async _show(prev, next, force) {
          this._transitioner = this._getTransitioner(prev, next, this.dir, {
            easing: force ? next.offsetWidth < 600 ? easeOutQuad : easeOutQuart : this.easing,
            ...this.transitionOptions
          });
          if (!force && !prev) {
            this._translate(1);
            return;
          }
          const { length } = this.stack;
          return this._transitioner[length > 1 ? "forward" : "show"](
            length > 1 ? Math.min(this.duration, 75 + 75 / (length - 1)) : this.duration,
            this.percent
          );
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
      observe: resize(),
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
          return [{ opacity: 0 }, { opacity: 1 }];
        },
        percent(current) {
          return 1 - util.css(current, "opacity");
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
          return 1 - util.css(current, "opacity");
        },
        translate(percent) {
          return [
            { opacity: 1 - percent, transform: scale3d(1 - 0.2 * percent) },
            { opacity: percent, transform: scale3d(1 - 0.2 + 0.2 * percent) }
          ];
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
        template: `<div class="uk-lightbox uk-overflow-hidden"> <div class="uk-lightbox-items"></div> <div class="uk-lightbox-toolbar uk-position-top uk-text-right uk-transition-slide-top uk-transition-opaque"> <button class="uk-lightbox-toolbar-icon uk-close-large" type="button" uk-close></button> </div> <a class="uk-lightbox-button uk-position-center-left uk-position-medium uk-transition-fade" href uk-slidenav-previous uk-lightbox-item="previous"></a> <a class="uk-lightbox-button uk-position-center-right uk-position-medium uk-transition-fade" href uk-slidenav-next uk-lightbox-item="next"></a> <div class="uk-lightbox-toolbar uk-lightbox-caption uk-position-bottom uk-text-center uk-transition-slide-bottom uk-transition-opaque"></div> </div>`
      }),
      created() {
        const $el = util.$(this.template);
        const list = util.$(this.selList, $el);
        this.items.forEach(() => util.append(list, "<div>"));
        const close = util.$("[uk-close]", $el);
        const closeLabel = this.t("close");
        if (close && closeLabel) {
          close.dataset.i18n = JSON.stringify({ label: closeLabel });
        }
        this.$mount(util.append(this.container, $el));
      },
      events: [
        {
          name: `${util.pointerMove} ${util.pointerDown} keydown`,
          handler: "showControls"
        },
        {
          name: "click",
          self: true,
          delegate: ({ selList }) => `${selList} > *`,
          handler(e) {
            if (!e.defaultPrevented) {
              this.hide();
            }
          }
        },
        {
          name: "shown",
          self: true,
          handler: "showControls"
        },
        {
          name: "hide",
          self: true,
          handler() {
            this.hideControls();
            util.removeClass(this.slides, this.clsActive);
            util.Transition.stop(this.slides);
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
          el: () => document,
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
            util.removeClass(e.target, this.clsActive);
            this.stack.splice(1, 0, this.index);
          }
        },
        {
          name: "itemshow",
          handler() {
            util.html(util.$(this.selCaption, this.$el), this.getItem().caption || "");
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
              util.on(img, "load", () => this.setItem(item, img));
              util.on(img, "error", () => this.setError(item));
            } else if (type === "video" || src.match(/\.(mp4|webm|ogv)($|\?)/i)) {
              const video = createEl("video", {
                src,
                poster,
                controls: "",
                playsinline: "",
                "uk-video": `${this.videoAutoplay}`,
                ...attrs
              });
              util.on(video, "loadedmetadata", () => this.setItem(item, video));
              util.on(video, "error", () => this.setError(item));
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
            util.trigger(this.$el, "itemload", [item]);
          }
        },
        getItem(index = this.index) {
          return this.items[util.getIndex(index, this.slides)];
        },
        setItem(item, content) {
          util.trigger(this.$el, "itemloaded", [this, util.html(this.getSlide(item), content)]);
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
          util.addClass(this.$el, "uk-active", "uk-transition-active");
        },
        hideControls() {
          util.removeClass(this.$el, "uk-active", "uk-transition-active");
        }
      }
    };
    function createEl(tag, attrs) {
      const el = util.fragment(`<${tag}>`);
      util.attr(el, attrs);
      return el;
    }

    if (typeof window !== "undefined" && window.UIkit) {
      window.UIkit.component("lightboxPanel", Component);
    }

    return Component;

}));
