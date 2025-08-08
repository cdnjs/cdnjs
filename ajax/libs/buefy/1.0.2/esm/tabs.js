import { defineComponent, resolveComponent, createElementBlock, openBlock, normalizeClass, createElementVNode, renderSlot, Fragment, renderList, withDirectives, createBlock, createCommentVNode, toDisplayString, vShow } from 'vue';
import { B as BIcon } from './Icon-DPyGDeRK.js';
import { c as config } from './config-CKuo-p6e.js';
import { T as TabbedMixin, a as TabbedChildMixin } from './TabbedChildMixin-C4i6WP9j.js';
import { B as BSlotComponent } from './SlotComponent-BwNpVnfH.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';
import { a as registerComponent } from './plugins-B172kuKE.js';
import './helpers.js';
import './InjectedChildMixin-D2K-FwuO.js';

var _sfc_main$1 = defineComponent({
  name: "BTabs",
  components: {
    BIcon,
    BSlotComponent
  },
  mixins: [TabbedMixin("tab")],
  props: {
    expanded: {
      type: Boolean,
      default: () => {
        return config.defaultTabsExpanded;
      }
    },
    type: {
      type: [String, Object],
      default: () => {
        return config.defaultTabsType;
      }
    },
    animated: {
      type: Boolean,
      default: () => {
        return config.defaultTabsAnimated;
      }
    },
    multiline: Boolean
  },
  data() {
    return {
      currentFocus: null
    };
  },
  computed: {
    mainClasses() {
      return {
        "is-fullwidth": this.expanded,
        "is-vertical": this.vertical,
        "is-multiline": this.multiline,
        [this.position]: this.position && this.vertical
      };
    },
    navClasses() {
      return [
        this.type,
        this.size,
        {
          [this.position]: this.position && !this.vertical,
          "is-fullwidth": this.expanded,
          "is-toggle": this.type === "is-toggle-rounded"
        }
      ];
    }
  },
  methods: {
    giveFocusToTab(tab) {
      if (Array.isArray(tab)) {
        tab = tab[0];
        if (tab == null) {
          return;
        }
      }
      if (tab.$el && tab.$el.focus) {
        tab.$el.focus();
      } else if (tab.focus) {
        tab.focus();
      }
    },
    manageTablistKeydown(event) {
      const { key } = event;
      switch (key) {
        case (this.vertical ? "ArrowUp" : "ArrowLeft"):
        case (this.vertical ? "Up" : "Left"): {
          let prevIdx = this.getPrevItemIdx(this.currentFocus, true);
          if (prevIdx === null) {
            prevIdx = this.getPrevItemIdx(Infinity, true);
          }
          const prevItem = this.items.find((i) => i.index === prevIdx);
          if (prevItem && this.$refs[`tabLink${prevIdx}`] && !prevItem.disabled) {
            this.giveFocusToTab(this.$refs[`tabLink${prevIdx}`]);
          }
          event.preventDefault();
          break;
        }
        case (this.vertical ? "ArrowDown" : "ArrowRight"):
        case (this.vertical ? "Down" : "Right"): {
          let nextIdx = this.getNextItemIdx(this.currentFocus, true);
          if (nextIdx === null) {
            nextIdx = this.getNextItemIdx(-1, true);
          }
          const nextItem = this.items.find((i) => i.index === nextIdx);
          if (nextItem && this.$refs[`tabLink${nextIdx}`] && !nextItem.disabled) {
            this.giveFocusToTab(this.$refs[`tabLink${nextIdx}`]);
          }
          event.preventDefault();
          break;
        }
      }
    },
    manageTabKeydown(event, childItem) {
      const { key } = event;
      switch (key) {
        case " ":
        case "Space":
        case "Spacebar":
        case "Enter": {
          this.childClick(childItem);
          event.preventDefault();
          break;
        }
      }
    }
  }
});

const _hoisted_1 = ["aria-orientation"];
const _hoisted_2 = ["aria-controls", "aria-selected"];
const _hoisted_3 = ["id", "tabindex", "onFocus", "onClick", "onKeydown"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_slot_component = resolveComponent("b-slot-component");
  const _component_b_icon = resolveComponent("b-icon");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["b-tabs", _ctx.mainClasses])
    },
    [
      createElementVNode(
        "nav",
        {
          class: normalizeClass(["tabs", _ctx.navClasses]),
          onKeydown: _cache[0] || (_cache[0] = (...args) => _ctx.manageTablistKeydown && _ctx.manageTablistKeydown(...args))
        },
        [
          renderSlot(_ctx.$slots, "start"),
          createElementVNode("ul", {
            "aria-orientation": _ctx.vertical ? "vertical" : "horizontal",
            role: "tablist"
          }, [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(_ctx.items, (childItem) => {
                return withDirectives((openBlock(), createElementBlock("li", {
                  key: childItem.uniqueValue,
                  class: normalizeClass([childItem.headerClass, {
                    "is-active": childItem.isActive,
                    "is-disabled": childItem.disabled
                  }]),
                  role: "tab",
                  "aria-controls": `${childItem.uniqueValue}-content`,
                  "aria-selected": `${childItem.isActive}`
                }, [
                  childItem.$slots.header ? (openBlock(), createBlock(_component_b_slot_component, {
                    key: 0,
                    ref_for: true,
                    ref: `tabLink${childItem.index}`,
                    component: childItem,
                    name: "header",
                    tag: "a",
                    id: `${childItem.uniqueValue}-label`,
                    tabindex: childItem.isActive ? 0 : -1,
                    onFocus: ($event) => _ctx.currentFocus = childItem.index,
                    onClick: ($event) => _ctx.childClick(childItem),
                    onKeydown: ($event) => _ctx.manageTabKeydown($event, childItem)
                  }, null, 8, ["component", "id", "tabindex", "onFocus", "onClick", "onKeydown"])) : (openBlock(), createElementBlock("a", {
                    key: 1,
                    ref_for: true,
                    ref: `tabLink${childItem.index}`,
                    id: `${childItem.uniqueValue}-label`,
                    tabindex: childItem.isActive ? 0 : -1,
                    onFocus: ($event) => _ctx.currentFocus = childItem.index,
                    onClick: ($event) => _ctx.childClick(childItem),
                    onKeydown: ($event) => _ctx.manageTabKeydown($event, childItem)
                  }, [
                    childItem.icon ? (openBlock(), createBlock(_component_b_icon, {
                      key: 0,
                      icon: childItem.icon,
                      pack: childItem.iconPack,
                      size: _ctx.size
                    }, null, 8, ["icon", "pack", "size"])) : createCommentVNode("v-if", true),
                    createElementVNode(
                      "span",
                      null,
                      toDisplayString(childItem.label),
                      1
                      /* TEXT */
                    )
                  ], 40, _hoisted_3))
                ], 10, _hoisted_2)), [
                  [vShow, childItem.visible]
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ], 8, _hoisted_1),
          renderSlot(_ctx.$slots, "end")
        ],
        34
        /* CLASS, NEED_HYDRATION */
      ),
      createElementVNode(
        "section",
        {
          class: normalizeClass(["tab-content", { "is-transitioning": _ctx.isTransitioning }])
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      )
    ],
    2
    /* CLASS */
  );
}
var Tabs = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);

var _sfc_main = defineComponent({
  name: "BTabItem",
  mixins: [TabbedChildMixin("tab")],
  props: {
    disabled: Boolean
  },
  data() {
    return {
      elementClass: "tab-item",
      elementRole: "tabpanel"
    };
  }
});

const Plugin = {
  install(Vue) {
    registerComponent(Vue, Tabs);
    registerComponent(Vue, _sfc_main);
  }
};

export { _sfc_main as BTabItem, Tabs as BTabs, Plugin as default };
