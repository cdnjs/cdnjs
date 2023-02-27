/*! UIkit 3.16.3 | https://www.getuikit.com | (c) 2014 - 2023 YOOtheme | MIT License */

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

    function generateId(component, el = component.$el, postfix = "") {
      if (el.id) {
        return el.id;
      }
      let id = `${component.$options.id}-${component._uid}${postfix}`;
      if (uikitUtil.$(`#${id}`)) {
        id = generateId(component, el, `${postfix}-2`);
      }
      return id;
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
