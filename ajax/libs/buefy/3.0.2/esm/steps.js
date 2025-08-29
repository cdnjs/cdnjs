import { defineComponent, resolveComponent, createElementBlock, openBlock, normalizeClass, createElementVNode, renderSlot, Fragment, renderList, withDirectives, createBlock, createCommentVNode, toDisplayString, vShow, withModifiers, createVNode } from 'vue';
import { B as BIcon } from './Icon-DPyGDeRK.js';
import { T as TabbedMixin, a as TabbedChildMixin } from './TabbedChildMixin-C4i6WP9j.js';
import { c as config } from './config-CKuo-p6e.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';
import { a as registerComponent } from './plugins-B172kuKE.js';
import './helpers.js';
import './SlotComponent-BwNpVnfH.js';
import './InjectedChildMixin-D2K-FwuO.js';

const LABEL_POSITIONS = ["bottom", "right", "left"];
const MOBILE_MODES = ["minimalist", "compact"];
var _sfc_main$1 = defineComponent({
  name: "BSteps",
  components: {
    BIcon
  },
  mixins: [TabbedMixin("step")],
  props: {
    type: [String, Object],
    iconPack: String,
    iconPrev: {
      type: String,
      default: () => {
        return config.defaultIconPrev;
      }
    },
    iconNext: {
      type: String,
      default: () => {
        return config.defaultIconNext;
      }
    },
    hasNavigation: {
      type: Boolean,
      default: true
    },
    labelPosition: {
      type: String,
      validator(value) {
        return LABEL_POSITIONS.indexOf(value) > -1;
      },
      default: "bottom"
    },
    rounded: {
      type: Boolean,
      default: true
    },
    mobileMode: {
      type: String,
      validator(value) {
        return MOBILE_MODES.indexOf(value) > -1;
      },
      default: "minimalist"
    },
    ariaNextLabel: String,
    ariaPreviousLabel: String
  },
  computed: {
    // Override mixin implementation to always have a value
    activeItem() {
      return this.childItems.filter((i) => i.uniqueValue === this.activeId)[0] || this.items[0];
    },
    wrapperClasses() {
      return [
        this.size,
        {
          "is-vertical": this.vertical,
          [this.position]: this.position && this.vertical
        }
      ];
    },
    mainClasses() {
      return [
        this.type,
        {
          "has-label-right": this.labelPosition === "right",
          "has-label-left": this.labelPosition === "left",
          "is-animated": this.animated,
          "is-rounded": this.rounded,
          [`mobile-${this.mobileMode}`]: this.mobileMode !== null
        }
      ];
    },
    /*
     * Check if previous button is available.
     */
    hasPrev() {
      return this.prevItemIdx !== null;
    },
    /*
     * Retrieves the next visible item index
     */
    nextItemIdx() {
      const idx = this.activeItem ? this.activeItem.index : 0;
      return this.getNextItemIdx(idx);
    },
    /*
     * Retrieves the next visible item
     */
    nextItem() {
      let nextItem = null;
      if (this.nextItemIdx !== null) {
        nextItem = this.items.find((i) => i.index === this.nextItemIdx);
      }
      return nextItem;
    },
    /*
    * Retrieves the next visible item index
    */
    prevItemIdx() {
      if (!this.activeItem) {
        return null;
      }
      const idx = this.activeItem.index;
      return this.getPrevItemIdx(idx);
    },
    /*
     * Retrieves the previous visible item
     */
    prevItem() {
      if (!this.activeItem) {
        return null;
      }
      let prevItem = null;
      if (this.prevItemIdx !== null) {
        prevItem = this.items.find((i) => i.index === this.prevItemIdx);
      }
      return prevItem;
    },
    /*
     * Check if next button is available.
     */
    hasNext() {
      return this.nextItemIdx !== null;
    },
    navigationProps() {
      return {
        previous: {
          disabled: !this.hasPrev,
          action: this.prev
        },
        next: {
          disabled: !this.hasNext,
          action: this.next
        }
      };
    }
  },
  methods: {
    /*
     * Return if the step should be clickable or not.
     */
    isItemClickable(stepItem) {
      if (stepItem.clickable === void 0) {
        return stepItem.index < this.activeItem.index;
      }
      return stepItem.clickable;
    },
    /*
     * Previous button click listener.
     */
    prev() {
      if (this.hasPrev) {
        this.activeId = this.prevItem.uniqueValue;
      }
    },
    /*
     * Previous button click listener.
     */
    next() {
      if (this.hasNext) {
        this.activeId = this.nextItem.uniqueValue;
      }
    }
  }
});

const _hoisted_1 = { class: "step-items" };
const _hoisted_2 = ["onClick"];
const _hoisted_3 = { class: "step-marker" };
const _hoisted_4 = { key: 1 };
const _hoisted_5 = { class: "step-details" };
const _hoisted_6 = { class: "step-title" };
const _hoisted_7 = {
  key: 0,
  class: "step-navigation"
};
const _hoisted_8 = ["disabled", "aria-label"];
const _hoisted_9 = ["disabled", "aria-label"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["b-steps", _ctx.wrapperClasses])
    },
    [
      createElementVNode(
        "nav",
        {
          class: normalizeClass(["steps", _ctx.mainClasses])
        },
        [
          createElementVNode("ul", _hoisted_1, [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(_ctx.items, (childItem) => {
                return withDirectives((openBlock(), createElementBlock(
                  "li",
                  {
                    key: childItem.uniqueValue,
                    class: normalizeClass(["step-item", [childItem.type || _ctx.type, childItem.headerClass, {
                      "is-active": childItem.isActive,
                      "is-previous": _ctx.activeItem.index > childItem.index
                    }]])
                  },
                  [
                    createElementVNode("a", {
                      class: normalizeClass(["step-link", { "is-clickable": _ctx.isItemClickable(childItem) }]),
                      onClick: ($event) => _ctx.isItemClickable(childItem) && _ctx.childClick(childItem)
                    }, [
                      createElementVNode("div", _hoisted_3, [
                        childItem.icon ? (openBlock(), createBlock(_component_b_icon, {
                          key: 0,
                          icon: childItem.icon,
                          pack: childItem.iconPack,
                          size: _ctx.size
                        }, null, 8, ["icon", "pack", "size"])) : childItem.step ? (openBlock(), createElementBlock(
                          "span",
                          _hoisted_4,
                          toDisplayString(childItem.step),
                          1
                          /* TEXT */
                        )) : createCommentVNode("v-if", true)
                      ]),
                      createElementVNode("div", _hoisted_5, [
                        createElementVNode(
                          "span",
                          _hoisted_6,
                          toDisplayString(childItem.label),
                          1
                          /* TEXT */
                        )
                      ])
                    ], 10, _hoisted_2)
                  ],
                  2
                  /* CLASS */
                )), [
                  [vShow, childItem.visible]
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ],
        2
        /* CLASS */
      ),
      createElementVNode(
        "section",
        {
          class: normalizeClass(["step-content", { "is-transitioning": _ctx.isTransitioning }])
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      ),
      renderSlot(_ctx.$slots, "navigation", {
        previous: _ctx.navigationProps.previous,
        next: _ctx.navigationProps.next
      }, () => [
        _ctx.hasNavigation ? (openBlock(), createElementBlock("nav", _hoisted_7, [
          createElementVNode("a", {
            role: "button",
            class: "pagination-previous",
            disabled: _ctx.navigationProps.previous.disabled || void 0,
            onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.navigationProps.previous.action && _ctx.navigationProps.previous.action(...args), ["prevent"])),
            "aria-label": _ctx.ariaPreviousLabel
          }, [
            createVNode(_component_b_icon, {
              icon: _ctx.iconPrev,
              pack: _ctx.iconPack,
              both: "",
              "aria-hidden": "true"
            }, null, 8, ["icon", "pack"])
          ], 8, _hoisted_8),
          createElementVNode("a", {
            role: "button",
            class: "pagination-next",
            disabled: _ctx.navigationProps.next.disabled || void 0,
            onClick: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.navigationProps.next.action && _ctx.navigationProps.next.action(...args), ["prevent"])),
            "aria-label": _ctx.ariaNextLabel
          }, [
            createVNode(_component_b_icon, {
              icon: _ctx.iconNext,
              pack: _ctx.iconPack,
              both: "",
              "aria-hidden": "true"
            }, null, 8, ["icon", "pack"])
          ], 8, _hoisted_9)
        ])) : createCommentVNode("v-if", true)
      ])
    ],
    2
    /* CLASS */
  );
}
var Steps = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);

var _sfc_main = defineComponent({
  name: "BStepItem",
  mixins: [TabbedChildMixin("step")],
  props: {
    step: [String, Number],
    type: [String, Object],
    clickable: {
      type: Boolean,
      default: void 0
    }
  },
  data() {
    return {
      elementClass: "step-item"
    };
  }
});

const Plugin = {
  install(Vue) {
    registerComponent(Vue, Steps);
    registerComponent(Vue, _sfc_main);
  }
};

export { _sfc_main as BStepItem, Steps as BSteps, Plugin as default };
