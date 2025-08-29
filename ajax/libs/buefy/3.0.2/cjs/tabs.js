'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var Icon = require('./Icon-lsDKE2wQ.js');
var config = require('./config-DR826Ki2.js');
var TabbedChildMixin = require('./TabbedChildMixin-B3JUUwcf.js');
var SlotComponent = require('./SlotComponent-BruGdRW3.js');
var _pluginVue_exportHelper = require('./_plugin-vue_export-helper-Die8u8yB.js');
var plugins = require('./plugins-DbyYGVpp.js');
require('./helpers.js');
require('./InjectedChildMixin-CUKn09dB.js');

var _sfc_main$1 = vue.defineComponent({
  name: "BTabs",
  components: {
    BIcon: Icon.BIcon,
    BSlotComponent: SlotComponent.BSlotComponent
  },
  mixins: [TabbedChildMixin.TabbedMixin("tab")],
  props: {
    expanded: {
      type: Boolean,
      default: () => {
        return config.config.defaultTabsExpanded;
      }
    },
    type: {
      type: [String, Object],
      default: () => {
        return config.config.defaultTabsType;
      }
    },
    animated: {
      type: Boolean,
      default: () => {
        return config.config.defaultTabsAnimated;
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
  const _component_b_slot_component = vue.resolveComponent("b-slot-component");
  const _component_b_icon = vue.resolveComponent("b-icon");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(["b-tabs", _ctx.mainClasses])
    },
    [
      vue.createElementVNode(
        "nav",
        {
          class: vue.normalizeClass(["tabs", _ctx.navClasses]),
          onKeydown: _cache[0] || (_cache[0] = (...args) => _ctx.manageTablistKeydown && _ctx.manageTablistKeydown(...args))
        },
        [
          vue.renderSlot(_ctx.$slots, "start"),
          vue.createElementVNode("ul", {
            "aria-orientation": _ctx.vertical ? "vertical" : "horizontal",
            role: "tablist"
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(_ctx.items, (childItem) => {
                return vue.withDirectives((vue.openBlock(), vue.createElementBlock("li", {
                  key: childItem.uniqueValue,
                  class: vue.normalizeClass([childItem.headerClass, {
                    "is-active": childItem.isActive,
                    "is-disabled": childItem.disabled
                  }]),
                  role: "tab",
                  "aria-controls": `${childItem.uniqueValue}-content`,
                  "aria-selected": `${childItem.isActive}`
                }, [
                  childItem.$slots.header ? (vue.openBlock(), vue.createBlock(_component_b_slot_component, {
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
                  }, null, 8, ["component", "id", "tabindex", "onFocus", "onClick", "onKeydown"])) : (vue.openBlock(), vue.createElementBlock("a", {
                    key: 1,
                    ref_for: true,
                    ref: `tabLink${childItem.index}`,
                    id: `${childItem.uniqueValue}-label`,
                    tabindex: childItem.isActive ? 0 : -1,
                    onFocus: ($event) => _ctx.currentFocus = childItem.index,
                    onClick: ($event) => _ctx.childClick(childItem),
                    onKeydown: ($event) => _ctx.manageTabKeydown($event, childItem)
                  }, [
                    childItem.icon ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
                      key: 0,
                      icon: childItem.icon,
                      pack: childItem.iconPack,
                      size: _ctx.size
                    }, null, 8, ["icon", "pack", "size"])) : vue.createCommentVNode("v-if", true),
                    vue.createElementVNode(
                      "span",
                      null,
                      vue.toDisplayString(childItem.label),
                      1
                      /* TEXT */
                    )
                  ], 40, _hoisted_3))
                ], 10, _hoisted_2)), [
                  [vue.vShow, childItem.visible]
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ], 8, _hoisted_1),
          vue.renderSlot(_ctx.$slots, "end")
        ],
        34
        /* CLASS, NEED_HYDRATION */
      ),
      vue.createElementVNode(
        "section",
        {
          class: vue.normalizeClass(["tab-content", { "is-transitioning": _ctx.isTransitioning }])
        },
        [
          vue.renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      )
    ],
    2
    /* CLASS */
  );
}
var Tabs = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main$1, [["render", _sfc_render]]);

var _sfc_main = vue.defineComponent({
  name: "BTabItem",
  mixins: [TabbedChildMixin.TabbedChildMixin("tab")],
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
    plugins.registerComponent(Vue, Tabs);
    plugins.registerComponent(Vue, _sfc_main);
  }
};

exports.BTabItem = _sfc_main;
exports.BTabs = Tabs;
exports.default = Plugin;
