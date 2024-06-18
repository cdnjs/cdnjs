import AccordionContent from 'primevue/accordioncontent';
import AccordionHeader from 'primevue/accordionheader';
import AccordionPanel from 'primevue/accordionpanel';
import ChevronRightIcon from 'primevue/icons/chevronright';
import ChevronUpIcon from 'primevue/icons/chevronup';
import { UniqueComponentId } from 'primevue/utils';
import { mergeProps, resolveComponent, openBlock, createElementBlock, Fragment, renderList, createBlock, withCtx, createVNode, normalizeClass, resolveDynamicComponent, createCommentVNode, normalizeProps, toDisplayString, renderSlot } from 'vue';
import AccordionStyle from 'primevue/accordion/style';
import BaseComponent from 'primevue/basecomponent';

var script$1 = {
  name: 'BaseAccordion',
  "extends": BaseComponent,
  props: {
    value: {
      type: [String, Array],
      "default": undefined
    },
    multiple: {
      type: Boolean,
      "default": false
    },
    lazy: {
      type: Boolean,
      "default": false
    },
    tabindex: {
      type: Number,
      "default": 0
    },
    selectOnFocus: {
      type: Boolean,
      "default": false
    },
    expandIcon: {
      type: String,
      "default": undefined
    },
    collapseIcon: {
      type: String,
      "default": undefined
    },
    // @deprecated since v4.
    activeIndex: {
      type: [Number, Array],
      "default": null
    }
  },
  style: AccordionStyle,
  provide: function provide() {
    return {
      $pcAccordion: this,
      $parentInstance: this
    };
  }
};

var script = {
  name: 'Accordion',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['update:value', 'update:activeIndex', 'tab-open', 'tab-close', 'tab-click'],
  data: function data() {
    return {
      id: this.$attrs.id,
      d_value: this.value
    };
  },
  watch: {
    '$attrs.id': function $attrsId(newValue) {
      this.id = newValue || UniqueComponentId();
    },
    value: function value(newValue) {
      this.d_value = newValue;
    },
    activeIndex: {
      immediate: true,
      handler: function handler(newValue) {
        if (this.hasAccordionTab) {
          this.d_value = this.multiple ? newValue === null || newValue === void 0 ? void 0 : newValue.map(String) : newValue === null || newValue === void 0 ? void 0 : newValue.toString();
        }
      }
    }
  },
  mounted: function mounted() {
    this.id = this.id || UniqueComponentId();
  },
  methods: {
    isItemActive: function isItemActive(value) {
      var _this$d_value;
      return this.multiple ? (_this$d_value = this.d_value) === null || _this$d_value === void 0 ? void 0 : _this$d_value.includes(value) : this.d_value === value;
    },
    updateValue: function updateValue(newValue) {
      var _this$d_value2;
      var active = this.isItemActive(newValue);
      if (this.multiple) {
        if (active) {
          this.d_value = this.d_value.filter(function (v) {
            return v !== newValue;
          });
        } else {
          if (this.d_value) this.d_value.push(newValue);else this.d_value = [newValue];
        }
      } else {
        this.d_value = active ? null : newValue;
      }
      this.$emit('update:value', this.d_value);

      // @deprecated since v4.
      this.$emit('update:activeIndex', this.multiple ? (_this$d_value2 = this.d_value) === null || _this$d_value2 === void 0 ? void 0 : _this$d_value2.map(Number) : Number(this.d_value));
      this.$emit(active ? 'tab-close' : 'tab-open', {
        originalEvent: undefined,
        index: Number(newValue)
      });
    },
    // @deprecated since v4. Use new structure instead.
    isAccordionTab: function isAccordionTab(child) {
      return child.type.name === 'AccordionTab';
    },
    getTabProp: function getTabProp(tab, name) {
      return tab.props ? tab.props[name] : undefined;
    },
    getKey: function getKey(tab, index) {
      return this.getTabProp(tab, 'header') || index;
    },
    getHeaderPT: function getHeaderPT(tab, index) {
      var _this = this;
      return {
        root: mergeProps({
          onClick: function onClick(event) {
            return _this.onTabClick(event, index);
          }
        }, this.getTabProp(tab, 'headerProps'), this.getTabPT(tab, 'header', index)),
        toggleicon: mergeProps(this.getTabProp(tab, 'headeractionprops'), this.getTabPT(tab, 'headeraction', index))
      };
    },
    getContentPT: function getContentPT(tab, index) {
      return {
        root: mergeProps(this.getTabProp(tab, 'contentProps'), this.getTabPT(tab, 'toggleablecontent', index)),
        transition: this.getTabPT(tab, 'transition', index),
        content: this.getTabPT(tab, 'content', index)
      };
    },
    getTabPT: function getTabPT(tab, key, index) {
      var count = this.tabs.length;
      var tabMetaData = {
        props: tab.props || {},
        parent: {
          instance: this,
          props: this.$props,
          state: this.$data
        },
        context: {
          index: index,
          count: count,
          first: index === 0,
          last: index === count - 1,
          active: this.isItemActive("".concat(index))
        }
      };
      return mergeProps(this.ptm("tab.".concat(key), {
        tab: tabMetaData
      }), this.ptm("accordiontab.".concat(key), {
        accordiontab: tabMetaData
      }), this.ptm("accordiontab.".concat(key), tabMetaData), this.ptmo(this.getTabProp(tab, 'pt'), key, tabMetaData));
    },
    onTabClick: function onTabClick(event, index) {
      this.$emit('tab-click', {
        originalEvent: event,
        index: index
      });
    }
  },
  computed: {
    // @deprecated since v4.
    tabs: function tabs() {
      var _this2 = this;
      return this.$slots["default"]().reduce(function (tabs, child) {
        if (_this2.isAccordionTab(child)) {
          tabs.push(child);
        } else if (child.children && child.children instanceof Array) {
          child.children.forEach(function (nestedChild) {
            if (_this2.isAccordionTab(nestedChild)) {
              tabs.push(nestedChild);
            }
          });
        }
        return tabs;
      }, []);
    },
    hasAccordionTab: function hasAccordionTab() {
      return this.tabs.length;
    }
  },
  components: {
    AccordionPanel: AccordionPanel,
    AccordionHeader: AccordionHeader,
    AccordionContent: AccordionContent,
    ChevronUpIcon: ChevronUpIcon,
    ChevronRightIcon: ChevronRightIcon
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_AccordionHeader = resolveComponent("AccordionHeader");
  var _component_AccordionContent = resolveComponent("AccordionContent");
  var _component_AccordionPanel = resolveComponent("AccordionPanel");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [$options.hasAccordionTab ? (openBlock(true), createElementBlock(Fragment, {
    key: 0
  }, renderList($options.tabs, function (tab, i) {
    return openBlock(), createBlock(_component_AccordionPanel, {
      key: $options.getKey(tab, i),
      value: "".concat(i),
      pt: {
        root: $options.getTabPT(tab, 'root', i)
      },
      disabled: $options.getTabProp(tab, 'disabled')
    }, {
      "default": withCtx(function () {
        return [createVNode(_component_AccordionHeader, {
          "class": normalizeClass($options.getTabProp(tab, 'headerClass')),
          pt: $options.getHeaderPT(tab, i)
        }, {
          toggleicon: withCtx(function (slotProps) {
            return [slotProps.active ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.collapseicon ? _ctx.$slots.collapseicon : _ctx.collapseIcon ? 'span' : 'ChevronDownIcon'), mergeProps({
              key: 0,
              "class": [_ctx.collapseIcon, slotProps["class"]],
              "aria-hidden": "true"
            }, $options.getTabPT(tab, 'headericon', i)), null, 16, ["class"])) : (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.expandicon ? _ctx.$slots.expandicon : _ctx.expandIcon ? 'span' : 'ChevronUpIcon'), mergeProps({
              key: 1,
              "class": [_ctx.expandIcon, slotProps["class"]],
              "aria-hidden": "true"
            }, $options.getTabPT(tab, 'headericon', i)), null, 16, ["class"]))];
          }),
          "default": withCtx(function () {
            return [tab.children && tab.children.headericon ? (openBlock(), createBlock(resolveDynamicComponent(tab.children.headericon), {
              key: 0,
              isTabActive: $options.isItemActive("".concat(i)),
              active: $options.isItemActive("".concat(i)),
              index: i
            }, null, 8, ["isTabActive", "active", "index"])) : createCommentVNode("", true), tab.props && tab.props.header ? (openBlock(), createElementBlock("span", normalizeProps(mergeProps({
              key: 1
            }, $options.getTabPT(tab, 'headertitle', i))), toDisplayString(tab.props.header), 17)) : createCommentVNode("", true), tab.children && tab.children.header ? (openBlock(), createBlock(resolveDynamicComponent(tab.children.header), {
              key: 2
            })) : createCommentVNode("", true)];
          }),
          _: 2
        }, 1032, ["class", "pt"]), createVNode(_component_AccordionContent, {
          pt: $options.getContentPT(tab, i)
        }, {
          "default": withCtx(function () {
            return [(openBlock(), createBlock(resolveDynamicComponent(tab)))];
          }),
          _: 2
        }, 1032, ["pt"])];
      }),
      _: 2
    }, 1032, ["value", "pt", "disabled"]);
  }), 128)) : renderSlot(_ctx.$slots, "default", {
    key: 1
  })], 16);
}

script.render = render;

export { script as default };
