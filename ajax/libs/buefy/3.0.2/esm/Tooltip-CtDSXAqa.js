import { defineComponent, createElementBlock, openBlock, normalizeClass, createVNode, createElementVNode, Transition, withCtx, withDirectives, renderSlot, createCommentVNode, Fragment, createTextVNode, toDisplayString, vShow, normalizeStyle } from 'vue';
import { c as config } from './config-CKuo-p6e.js';
import { removeElement, createAbsoluteElement } from './helpers.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';

const TOOLTIP_POSITIONS = ["is-auto", "is-top", "is-bottom", "is-left", "is-right"];
var _sfc_main = defineComponent({
  name: "BTooltip",
  props: {
    active: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: () => config.defaultTooltipType
    },
    label: String,
    delay: {
      type: Number,
      default: () => config.defaultTooltipDelay
    },
    closeDelay: {
      type: Number,
      default: () => config.defaultTooltipCloseDelay
    },
    position: {
      type: String,
      default: "is-auto",
      validator(value) {
        return TOOLTIP_POSITIONS.indexOf(value) > -1;
      }
    },
    triggers: {
      type: Array,
      default: () => ["hover"]
    },
    always: Boolean,
    square: Boolean,
    dashed: Boolean,
    multilined: Boolean,
    size: {
      type: String,
      default: "is-medium"
    },
    appendToBody: Boolean,
    animated: {
      type: Boolean,
      default: true
    },
    animation: {
      type: String,
      default: "fade"
    },
    contentClass: String,
    autoClose: {
      type: [Array, Boolean],
      default: true
    }
  },
  emits: {
    close: () => true,
    open: () => true
  },
  data() {
    return {
      isActive: false,
      triggerStyle: {},
      timer: void 0,
      _bodyEl: void 0,
      // Used to append to body
      resizeObserver: void 0,
      resizeListener: void 0,
      timeOutID: void 0,
      controller: void 0,
      dynamicPosition: void 0
      // Computed once opened
    };
  },
  computed: {
    rootClasses() {
      return ["b-tooltip", this.type, this.dynamicPosition, this.size, {
        "is-square": this.square,
        "is-always": this.always,
        "is-multiline": this.multilined,
        "is-dashed": this.dashed
      }];
    },
    newAnimation() {
      return this.animated ? this.animation : void 0;
    }
  },
  watch: {
    isActive() {
      this.isActive ? this.$emit("open") : this.$emit("close");
      if (this.appendToBody) {
        this.updateAppendToBody();
      }
    }
  },
  methods: {
    computePosition() {
      if (this.position !== "is-auto") return this.position;
      const trigger = this.$refs.trigger;
      const bounds = trigger.getBoundingClientRect();
      const dt = bounds.top;
      const db = window.innerHeight - bounds.bottom;
      const dl = bounds.left;
      const dr = window.innerWidth - bounds.right;
      const min = Math.min(dt, db, dl, dr);
      if (min === dt) {
        return "is-bottom";
      } else if (min === db) {
        return "is-top";
      } else if (min === dl) {
        return "is-right";
      } else {
        return "is-left";
      }
    },
    updateAppendToBody() {
      const tooltip = this.$refs.tooltip;
      const trigger = this.$refs.trigger;
      if (tooltip && trigger) {
        const tooltipEl = this.$data._bodyEl.children[0];
        tooltipEl.classList.forEach((item) => tooltipEl.classList.remove(item));
        this.rootClasses.forEach((item) => {
          if (typeof item === "object") {
            const record = item;
            for (const key in record) {
              if (record[key]) {
                tooltipEl.classList.add(key);
              }
            }
          } else {
            tooltipEl.classList.add(item);
          }
        });
        const rect = trigger.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const left = rect.left + window.scrollX;
        tooltipEl.style.position = "absolute";
        this.dynamicPosition = this.computePosition();
        switch (this.dynamicPosition) {
          case "is-top":
            tooltipEl.style.width = `${trigger.clientWidth}px`;
            tooltipEl.style.height = "0px";
            tooltipEl.style.top = "0px";
            tooltipEl.style.left = "0px";
            break;
          case "is-bottom":
            tooltipEl.style.width = `${trigger.clientWidth}px`;
            tooltipEl.style.height = "0px";
            tooltipEl.style.top = `${trigger.clientHeight}px`;
            tooltipEl.style.left = "0px";
            break;
          case "is-left":
            tooltipEl.style.width = "0px";
            tooltipEl.style.height = `${trigger.clientHeight}px`;
            tooltipEl.style.top = "0px";
            tooltipEl.style.left = "0px";
            break;
          case "is-right":
            tooltipEl.style.width = "0px";
            tooltipEl.style.height = `${trigger.clientHeight}px`;
            tooltipEl.style.top = "0px";
            tooltipEl.style.left = `${trigger.clientWidth}px`;
            break;
        }
        const wrapper = this.$data._bodyEl;
        wrapper.style.position = "absolute";
        wrapper.style.top = `${top}px`;
        wrapper.style.left = `${left}px`;
        wrapper.style.width = "0px";
        wrapper.style.zIndex = this.isActive || this.always ? "99" : "-1";
        this.triggerStyle = {
          zIndex: this.isActive || this.always ? "100" : void 0
        };
      }
    },
    onClick() {
      if (this.triggers.indexOf("click") < 0) return;
      this.$nextTick(() => {
        this.timeOutID = setTimeout(() => this.open());
      });
    },
    onHover() {
      if (this.triggers.indexOf("hover") < 0) return;
      this.open();
    },
    onContextMenu(e) {
      if (this.triggers.indexOf("contextmenu") < 0) return;
      e.preventDefault();
      this.open();
    },
    onFocus() {
      if (this.triggers.indexOf("focus") < 0) return;
      this.open();
    },
    open() {
      this.dynamicPosition = this.computePosition();
      if (this.delay) {
        this.timer = setTimeout(() => {
          this.isActive = true;
          this.timer = void 0;
        }, this.delay);
      } else {
        this.isActive = true;
      }
    },
    close() {
      if (typeof this.autoClose === "boolean") {
        if (this.autoClose && this.timer) clearTimeout(this.timer);
        if (this.closeDelay) {
          this.timer = setTimeout(() => {
            this.isActive = !this.autoClose;
            this.timer = void 0;
          }, this.closeDelay);
        } else {
          this.isActive = !this.autoClose;
        }
      }
    },
    /*
    * Close tooltip if clicked outside.
    */
    clickedOutside(event) {
      if (this.isActive) {
        if (Array.isArray(this.autoClose)) {
          if (this.autoClose.includes("outside")) {
            if (!this.isInWhiteList(event.target)) {
              this.isActive = false;
              return;
            }
          }
          if (this.autoClose.includes("inside")) {
            if (this.isInWhiteList(event.target)) this.isActive = false;
          }
        }
      }
    },
    /*
     * Keypress event that is bound to the document
     */
    keyPress({ key }) {
      if (this.isActive && (key === "Escape" || key === "Esc")) {
        if (Array.isArray(this.autoClose)) {
          if (this.autoClose.indexOf("escape") >= 0) this.isActive = false;
        }
      }
    },
    /*
    * White-listed items to not close when clicked.
    */
    isInWhiteList(el) {
      if (el === this.$refs.content) return true;
      if (this.$refs.content != null) {
        const children = this.$refs.content.querySelectorAll("*");
        for (const child of children) {
          if (el === child) {
            return true;
          }
        }
      }
      return false;
    }
  },
  mounted() {
    if (this.appendToBody && typeof window !== "undefined") {
      this.controller = new window.AbortController();
      this.$data._bodyEl = createAbsoluteElement(this.$refs.content);
      this.updateAppendToBody();
      const animation = this.$el.closest(".animation-content");
      if (animation != null) {
        const listener = () => {
          this.updateAppendToBody();
          animation.removeEventListener("transitionend", listener);
        };
        animation.addEventListener("transitionend", listener, {
          signal: this.controller.signal
        });
      }
      this.resizeListener = () => this.updateAppendToBody();
      window.addEventListener("resize", this.resizeListener);
      this.resizeObserver = new ResizeObserver(this.resizeListener);
      if (this.$el.parentNode != null && this.$el.parentNode.nodeType === Node.ELEMENT_NODE) {
        this.resizeObserver.observe(this.$el.parentNode);
      }
    }
    if (this.always) {
      this.dynamicPosition = this.computePosition();
    }
  },
  created() {
    if (typeof window !== "undefined") {
      document.addEventListener("click", this.clickedOutside);
      document.addEventListener("keyup", this.keyPress);
    }
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      document.removeEventListener("click", this.clickedOutside);
      document.removeEventListener("keyup", this.keyPress);
    }
    if (this.resizeListener != null) {
      window.removeEventListener("resize", this.resizeListener);
    }
    if (this.resizeObserver != null) {
      this.resizeObserver.disconnect();
    }
    if (this.appendToBody) {
      removeElement(this.$data._bodyEl);
    }
    if (this.controller != null) {
      this.controller.abort();
    }
    clearTimeout(this.timer);
    clearTimeout(this.timeOutID);
  }
});

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "div",
    {
      ref: "tooltip",
      class: normalizeClass(_ctx.rootClasses)
    },
    [
      createVNode(Transition, {
        name: _ctx.newAnimation,
        persisted: ""
      }, {
        default: withCtx(() => [
          withDirectives(createElementVNode(
            "div",
            {
              ref: "content",
              class: normalizeClass(["tooltip-content", _ctx.contentClass])
            },
            [
              _ctx.label ? (openBlock(), createElementBlock(
                Fragment,
                { key: 0 },
                [
                  createTextVNode(
                    toDisplayString(_ctx.label),
                    1
                    /* TEXT */
                  )
                ],
                64
                /* STABLE_FRAGMENT */
              )) : _ctx.$slots.content ? renderSlot(_ctx.$slots, "content", { key: 1 }) : createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          ), [
            [vShow, _ctx.active && (_ctx.isActive || _ctx.always)]
          ])
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["name"]),
      createElementVNode(
        "div",
        {
          ref: "trigger",
          class: "tooltip-trigger",
          style: normalizeStyle(_ctx.triggerStyle),
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
          onContextmenu: _cache[1] || (_cache[1] = (...args) => _ctx.onContextMenu && _ctx.onContextMenu(...args)),
          onMouseenter: _cache[2] || (_cache[2] = (...args) => _ctx.onHover && _ctx.onHover(...args)),
          onFocusCapture: _cache[3] || (_cache[3] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
          onBlurCapture: _cache[4] || (_cache[4] = (...args) => _ctx.close && _ctx.close(...args)),
          onMouseleave: _cache[5] || (_cache[5] = (...args) => _ctx.close && _ctx.close(...args))
        },
        [
          renderSlot(_ctx.$slots, "default", { ref: "slot" })
        ],
        36
        /* STYLE, NEED_HYDRATION */
      )
    ],
    2
    /* CLASS */
  );
}
var Tooltip = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { Tooltip as T };
