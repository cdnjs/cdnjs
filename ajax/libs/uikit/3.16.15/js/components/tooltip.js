/*! UIkit 3.16.15 | https://www.getuikit.com | (c) 2014 - 2023 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikittooltip', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitTooltip = factory(global.UIkit.util));
})(this, (function (util) { 'use strict';

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
        clsEnter: "uk-togglabe-enter",
        clsLeave: "uk-togglabe-leave"
      },
      computed: {
        hasAnimation({ animation }) {
          return !!animation[0];
        },
        hasTransition({ animation }) {
          return ["slide", "reveal"].some((transition) => util.startsWith(animation[0], transition));
        }
      },
      methods: {
        toggleElement(targets, toggle, animate) {
          return new Promise(
            (resolve) => Promise.all(
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
            ).then(resolve, util.noop)
          );
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
      util.Animation.cancel(el);
      const { animation, duration, _toggle } = cmp;
      if (show) {
        _toggle(el, true);
        return util.Animation.in(el, animation[0], duration, cmp.origin);
      }
      return util.Animation.out(el, animation[1] || animation[0], duration, cmp.origin).then(
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
        pos: `bottom-${util.isRtl ? "right" : "left"}`,
        offset: false,
        flip: true,
        shift: true,
        inset: false
      },
      connected() {
        this.pos = this.$props.pos.split("-").concat("center").slice(0, 2);
        [this.dir, this.align] = this.pos;
        this.axis = util.includes(["top", "bottom"], this.dir) ? "y" : "x";
      },
      methods: {
        positionAt(element, target, boundary) {
          let offset = [this.getPositionOffset(element), this.getShiftOffset(element)];
          const placement = [this.flip && "flip", this.shift && "shift"];
          const attach = {
            element: [this.inset ? this.dir : util.flipPosition(this.dir), this.align],
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
          const elDim = util.dimensions(element);
          util.css(element, { top: -elDim.height, left: -elDim.width });
          util.positionAt(element, target, {
            attach,
            offset,
            boundary,
            placement,
            viewportOffset: this.getViewportOffset(element)
          });
          restoreScrollPosition();
        },
        getPositionOffset(element) {
          return util.toPx(
            this.offset === false ? util.css(element, "--uk-position-offset") : this.offset,
            this.axis === "x" ? "width" : "height",
            element
          ) * (util.includes(["left", "top"], this.dir) ? -1 : 1) * (this.inset ? -1 : 1);
        },
        getShiftOffset(element) {
          return this.align === "center" ? 0 : util.toPx(
            util.css(element, "--uk-position-shift-offset"),
            this.axis === "y" ? "width" : "height",
            element
          ) * (util.includes(["left", "top"], this.align) ? 1 : -1);
        },
        getViewportOffset(element) {
          return util.toPx(util.css(element, "--uk-position-viewport-offset"));
        }
      }
    };
    function storeScrollPosition(element) {
      const [scrollElement] = util.scrollParents(element);
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
        this._hasTitle = util.hasAttr(this.$el, "title");
        util.attr(this.$el, {
          title: "",
          "aria-describedby": this.id
        });
        makeFocusable(this.$el);
      },
      disconnected() {
        this.hide();
        if (!util.attr(this.$el, "title")) {
          util.attr(this.$el, "title", this._hasTitle ? this.title : null);
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
          if (util.matches(this.$el, "input:focus")) {
            return;
          }
          clearTimeout(this.showTimer);
          if (!this.isToggled(this.tooltip || null)) {
            return;
          }
          await this.toggleElement(this.tooltip, false, false);
          util.remove(this.tooltip);
          this.tooltip = null;
        },
        _show() {
          this.tooltip = util.append(
            this.container,
            `<div id="${this.id}" class="uk-${this.$options.name}" role="tooltip"> <div class="uk-${this.$options.name}-inner">${this.title}</div> </div>`
          );
          util.on(this.tooltip, "toggled", (e, toggled) => {
            if (!toggled) {
              return;
            }
            const update = () => this.positionAt(this.tooltip, this.$el);
            update();
            const [dir, align] = getAlignment(this.tooltip, this.$el, this.pos);
            this.origin = this.axis === "y" ? `${util.flipPosition(dir)}-${align}` : `${align}-${util.flipPosition(dir)}`;
            const handlers = [
              util.once(
                document,
                `keydown ${util.pointerDown}`,
                this.hide,
                false,
                (e2) => e2.type === util.pointerDown && !util.within(e2.target, this.$el) || e2.type === "keydown" && e2.keyCode === keyMap.ESC
              ),
              util.on([document, ...util.overflowParents(this.$el)], "scroll", update, {
                passive: true
              })
            ];
            util.once(this.tooltip, "hide", () => handlers.forEach((handler) => handler()), {
              self: true
            });
          });
          this.toggleElement(this.tooltip, true);
        }
      },
      events: {
        focus: "show",
        blur: "hide",
        [`${util.pointerEnter} ${util.pointerLeave}`](e) {
          if (!util.isTouch(e)) {
            this[e.type === util.pointerEnter ? "show" : "hide"]();
          }
        },
        // Clicking a button does not give it focus on all browsers and platforms
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#clicking_and_focus
        [util.pointerDown](e) {
          if (util.isTouch(e)) {
            this.show();
          }
        }
      }
    };
    function makeFocusable(el) {
      if (!util.isFocusable(el)) {
        util.attr(el, "tabindex", "0");
      }
    }
    function getAlignment(el, target, [dir, align]) {
      const elOffset = util.offset(el);
      const targetOffset = util.offset(target);
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
      const props = util.includes(properties[0], dir) ? properties[1] : properties[0];
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
