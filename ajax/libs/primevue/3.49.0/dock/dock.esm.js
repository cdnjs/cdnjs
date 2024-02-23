import BaseComponent from 'primevue/basecomponent';
import DockStyle from 'primevue/dock/style';
import Ripple from 'primevue/ripple';
import Tooltip from 'primevue/tooltip';
import { UniqueComponentId, ObjectUtils, DomHandler } from 'primevue/utils';
import { mergeProps, resolveDirective, openBlock, createElementBlock, createElementVNode, Fragment, renderList, withDirectives, createBlock, resolveDynamicComponent, normalizeClass, resolveComponent, createVNode } from 'vue';

var script$2 = {
  name: 'BaseDock',
  "extends": BaseComponent,
  props: {
    position: {
      type: String,
      "default": 'bottom'
    },
    model: null,
    "class": null,
    style: null,
    tooltipOptions: null,
    menuId: {
      type: String,
      "default": null
    },
    tabindex: {
      type: Number,
      "default": 0
    },
    breakpoint: {
      type: String,
      "default": '960px'
    },
    ariaLabel: {
      type: String,
      "default": null
    },
    ariaLabelledby: {
      type: String,
      "default": null
    }
  },
  style: DockStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var script$1 = {
  name: 'DockSub',
  hostName: 'Dock',
  "extends": BaseComponent,
  emits: ['focus', 'blur'],
  props: {
    position: {
      type: String,
      "default": 'bottom'
    },
    model: {
      type: Array,
      "default": null
    },
    templates: {
      type: null,
      "default": null
    },
    tooltipOptions: null,
    menuId: {
      type: String,
      "default": null
    },
    tabindex: {
      type: Number,
      "default": 0
    },
    ariaLabel: {
      type: String,
      "default": null
    },
    ariaLabelledby: {
      type: String,
      "default": null
    }
  },
  data: function data() {
    return {
      id: this.menuId,
      currentIndex: -3,
      focused: false,
      focusedOptionIndex: -1
    };
  },
  watch: {
    menuId: function menuId(newValue) {
      this.id = newValue || UniqueComponentId();
    }
  },
  mounted: function mounted() {
    this.id = this.id || UniqueComponentId();
  },
  methods: {
    getItemId: function getItemId(index) {
      return "".concat(this.id, "_").concat(index);
    },
    getItemProp: function getItemProp(processedItem, name) {
      return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name]) : undefined;
    },
    getPTOptions: function getPTOptions(key, item, index) {
      return this.ptm(key, {
        context: {
          index: index,
          item: item,
          active: this.isItemActive(this.getItemId(index))
        }
      });
    },
    isSameMenuItem: function isSameMenuItem(event) {
      return event.currentTarget && (event.currentTarget.isSameNode(event.target) || event.currentTarget.isSameNode(event.target.closest('[data-pc-section="menuitem"]')));
    },
    isItemActive: function isItemActive(id) {
      return id === this.focusedOptionIndex;
    },
    onListMouseLeave: function onListMouseLeave() {
      this.currentIndex = -3;
    },
    onItemMouseEnter: function onItemMouseEnter(index) {
      this.currentIndex = index;
    },
    onItemClick: function onItemClick(event, processedItem) {
      if (this.isSameMenuItem(event)) {
        var command = this.getItemProp(processedItem, 'command');
        command && command({
          originalEvent: event,
          item: processedItem.item
        });
      }
    },
    onListFocus: function onListFocus(event) {
      this.focused = true;
      this.changeFocusedOptionIndex(0);
      this.$emit('focus', event);
    },
    onListBlur: function onListBlur(event) {
      this.focused = false;
      this.focusedOptionIndex = -1;
      this.$emit('blur', event);
    },
    onListKeyDown: function onListKeyDown(event) {
      switch (event.code) {
        case 'ArrowDown':
          {
            if (this.position === 'left' || this.position === 'right') this.onArrowDownKey();
            event.preventDefault();
            break;
          }
        case 'ArrowUp':
          {
            if (this.position === 'left' || this.position === 'right') this.onArrowUpKey();
            event.preventDefault();
            break;
          }
        case 'ArrowRight':
          {
            if (this.position === 'top' || this.position === 'bottom') this.onArrowDownKey();
            event.preventDefault();
            break;
          }
        case 'ArrowLeft':
          {
            if (this.position === 'top' || this.position === 'bottom') this.onArrowUpKey();
            event.preventDefault();
            break;
          }
        case 'Home':
          {
            this.onHomeKey();
            event.preventDefault();
            break;
          }
        case 'End':
          {
            this.onEndKey();
            event.preventDefault();
            break;
          }
        case 'Enter':
        case 'NumpadEnter':
        case 'Space':
          {
            this.onSpaceKey(event);
            event.preventDefault();
            break;
          }
      }
    },
    onArrowDownKey: function onArrowDownKey() {
      var optionIndex = this.findNextOptionIndex(this.focusedOptionIndex);
      this.changeFocusedOptionIndex(optionIndex);
    },
    onArrowUpKey: function onArrowUpKey() {
      var optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex);
      this.changeFocusedOptionIndex(optionIndex);
    },
    onHomeKey: function onHomeKey() {
      this.changeFocusedOptionIndex(0);
    },
    onEndKey: function onEndKey() {
      this.changeFocusedOptionIndex(DomHandler.find(this.$refs.list, 'li[data-pc-section="menuitem"][data-p-disabled="false"]').length - 1);
    },
    onSpaceKey: function onSpaceKey() {
      var element = DomHandler.findSingle(this.$refs.list, "li[id=\"".concat("".concat(this.focusedOptionIndex), "\"]"));
      var anchorElement = element && DomHandler.findSingle(element, '[data-pc-section="action"]');
      anchorElement ? anchorElement.click() : element && element.click();
    },
    findNextOptionIndex: function findNextOptionIndex(index) {
      var menuitems = DomHandler.find(this.$refs.list, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
      var matchedOptionIndex = _toConsumableArray(menuitems).findIndex(function (link) {
        return link.id === index;
      });
      return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
    },
    findPrevOptionIndex: function findPrevOptionIndex(index) {
      var menuitems = DomHandler.find(this.$refs.list, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
      var matchedOptionIndex = _toConsumableArray(menuitems).findIndex(function (link) {
        return link.id === index;
      });
      return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
    },
    changeFocusedOptionIndex: function changeFocusedOptionIndex(index) {
      var menuitems = DomHandler.find(this.$refs.list, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
      var order = index >= menuitems.length ? menuitems.length - 1 : index < 0 ? 0 : index;
      this.focusedOptionIndex = menuitems[order].getAttribute('id');
    },
    disabled: function disabled(item) {
      return typeof item.disabled === 'function' ? item.disabled() : item.disabled;
    },
    getMenuItemProps: function getMenuItemProps(item, index) {
      return {
        action: mergeProps({
          tabindex: -1,
          'aria-hidden': true,
          "class": this.cx('action')
        }, this.getPTOptions('action', item, index)),
        icon: mergeProps({
          "class": [this.cx('icon'), item.icon]
        }, this.getPTOptions('icon', item, index))
      };
    }
  },
  computed: {
    focusedOptionId: function focusedOptionId() {
      return this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : null;
    }
  },
  directives: {
    ripple: Ripple,
    tooltip: Tooltip
  }
};

var _hoisted_1 = ["id", "aria-orientation", "aria-activedescendant", "tabindex", "aria-label", "aria-labelledby"];
var _hoisted_2 = ["id", "aria-label", "aria-disabled", "onClick", "onMouseenter", "data-p-focused", "data-p-disabled"];
var _hoisted_3 = ["href", "target"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_ripple = resolveDirective("ripple");
  var _directive_tooltip = resolveDirective("tooltip");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('container')
  }, _ctx.ptm('container')), [createElementVNode("ul", mergeProps({
    ref: "list",
    id: $data.id,
    "class": _ctx.cx('menu'),
    role: "menu",
    "aria-orientation": $props.position === 'bottom' || $props.position === 'top' ? 'horizontal' : 'vertical',
    "aria-activedescendant": $data.focused ? $options.focusedOptionId : undefined,
    tabindex: $props.tabindex,
    "aria-label": $props.ariaLabel,
    "aria-labelledby": $props.ariaLabelledby,
    onFocus: _cache[0] || (_cache[0] = function () {
      return $options.onListFocus && $options.onListFocus.apply($options, arguments);
    }),
    onBlur: _cache[1] || (_cache[1] = function () {
      return $options.onListBlur && $options.onListBlur.apply($options, arguments);
    }),
    onKeydown: _cache[2] || (_cache[2] = function () {
      return $options.onListKeyDown && $options.onListKeyDown.apply($options, arguments);
    }),
    onMouseleave: _cache[3] || (_cache[3] = function () {
      return $options.onListMouseLeave && $options.onListMouseLeave.apply($options, arguments);
    })
  }, _ctx.ptm('menu')), [(openBlock(true), createElementBlock(Fragment, null, renderList($props.model, function (processedItem, index) {
    return openBlock(), createElementBlock("li", mergeProps({
      key: index,
      id: $options.getItemId(index),
      "class": _ctx.cx('menuitem', {
        processedItem: processedItem,
        index: index,
        id: $options.getItemId(index)
      }),
      role: "menuitem",
      "aria-label": processedItem.label,
      "aria-disabled": $options.disabled(processedItem),
      onClick: function onClick($event) {
        return $options.onItemClick($event, processedItem);
      },
      onMouseenter: function onMouseenter($event) {
        return $options.onItemMouseEnter(index);
      }
    }, $options.getPTOptions('menuitem', processedItem, index), {
      "data-p-focused": $options.isItemActive($options.getItemId(index)),
      "data-p-disabled": $options.disabled(processedItem) || false
    }), [createElementVNode("div", mergeProps({
      "class": _ctx.cx('content')
    }, $options.getPTOptions('content', processedItem, index)), [!$props.templates['item'] ? withDirectives((openBlock(), createElementBlock("a", mergeProps({
      key: 0,
      href: processedItem.url,
      "class": _ctx.cx('action'),
      target: processedItem.target,
      tabindex: "-1",
      "aria-hidden": "true"
    }, $options.getPTOptions('action', processedItem, index)), [!$props.templates['icon'] ? withDirectives((openBlock(), createElementBlock("span", mergeProps({
      key: 0,
      "class": [_ctx.cx('icon'), processedItem.icon]
    }, $options.getPTOptions('icon', processedItem, index)), null, 16)), [[_directive_ripple]]) : (openBlock(), createBlock(resolveDynamicComponent($props.templates['icon']), {
      key: 1,
      item: processedItem,
      "class": normalizeClass(_ctx.cx('icon'))
    }, null, 8, ["item", "class"]))], 16, _hoisted_3)), [[_directive_tooltip, {
      value: processedItem.label,
      disabled: !$props.tooltipOptions
    }, $props.tooltipOptions]]) : (openBlock(), createBlock(resolveDynamicComponent($props.templates['item']), {
      key: 1,
      item: processedItem,
      index: index,
      label: processedItem.label,
      props: $options.getMenuItemProps(processedItem, index)
    }, null, 8, ["item", "index", "label", "props"]))], 16)], 16, _hoisted_2);
  }), 128))], 16, _hoisted_1)], 16);
}

script$1.render = render$1;

var script = {
  name: 'Dock',
  "extends": script$2,
  inheritAttrs: false,
  matchMediaListener: null,
  data: function data() {
    return {
      query: null,
      queryMatches: false
    };
  },
  mounted: function mounted() {
    this.bindMatchMediaListener();
  },
  beforeUnmount: function beforeUnmount() {
    this.unbindMatchMediaListener();
  },
  methods: {
    bindMatchMediaListener: function bindMatchMediaListener() {
      var _this = this;
      if (!this.matchMediaListener) {
        var query = matchMedia("(max-width: ".concat(this.breakpoint, ")"));
        this.query = query;
        this.queryMatches = query.matches;
        this.matchMediaListener = function () {
          _this.queryMatches = query.matches;
          _this.mobileActive = false;
        };
        this.query.addEventListener('change', this.matchMediaListener);
      }
    },
    unbindMatchMediaListener: function unbindMatchMediaListener() {
      if (this.matchMediaListener) {
        this.query.removeEventListener('change', this.matchMediaListener);
        this.matchMediaListener = null;
      }
    }
  },
  computed: {
    containerClass: function containerClass() {
      return [this["class"], this.cx('root')];
    }
  },
  components: {
    DockSub: script$1
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_DockSub = resolveComponent("DockSub");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": $options.containerClass,
    style: _ctx.style
  }, _ctx.ptmi('root')), [createVNode(_component_DockSub, {
    model: _ctx.model,
    templates: _ctx.$slots,
    tooltipOptions: _ctx.tooltipOptions,
    position: _ctx.position,
    menuId: _ctx.menuId,
    "aria-label": _ctx.ariaLabel,
    "aria-labelledby": _ctx.ariaLabelledby,
    tabindex: _ctx.tabindex,
    pt: _ctx.pt,
    unstyled: _ctx.unstyled
  }, null, 8, ["model", "templates", "tooltipOptions", "position", "menuId", "aria-label", "aria-labelledby", "tabindex", "pt", "unstyled"])], 16);
}

script.render = render;

export { script as default };
