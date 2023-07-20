'use strict';

var BaseComponent = require('primevue/basecomponent');
var usestyle = require('primevue/usestyle');
var Ripple = require('primevue/ripple');
var Tooltip = require('primevue/tooltip');
var utils = require('primevue/utils');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
var Tooltip__default = /*#__PURE__*/_interopDefaultLegacy(Tooltip);

var styles = "\n.p-dock {\n    position: absolute;\n    z-index: 1;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    pointer-events: none;\n}\n\n.p-dock-list-container {\n    display: flex;\n    pointer-events: auto;\n}\n\n.p-dock-list {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.p-dock-item {\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n    will-change: transform;\n}\n\n.p-dock-link {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    position: relative;\n    overflow: hidden;\n    cursor: default;\n}\n\n.p-dock-item-second-prev,\n.p-dock-item-second-next {\n    transform: scale(1.2);\n}\n\n.p-dock-item-prev,\n.p-dock-item-next {\n    transform: scale(1.4);\n}\n\n.p-dock-item-current {\n    transform: scale(1.6);\n    z-index: 1;\n}\n\n/* Position */\n/* top */\n.p-dock-top {\n    left: 0;\n    top: 0;\n    width: 100%;\n}\n\n.p-dock-top .p-dock-item {\n    transform-origin: center top;\n}\n\n/* bottom */\n.p-dock-bottom {\n    left: 0;\n    bottom: 0;\n    width: 100%;\n}\n\n.p-dock-bottom .p-dock-item {\n    transform-origin: center bottom;\n}\n\n/* right */\n.p-dock-right {\n    right: 0;\n    top: 0;\n    height: 100%;\n}\n\n.p-dock-right .p-dock-item {\n    transform-origin: center right;\n}\n\n.p-dock-right .p-dock-list {\n    flex-direction: column;\n}\n\n/* left */\n.p-dock-left {\n    left: 0;\n    top: 0;\n    height: 100%;\n}\n\n.p-dock-left .p-dock-item {\n    transform-origin: center left;\n}\n\n.p-dock-left .p-dock-list {\n    flex-direction: column;\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-dock p-component', "p-dock-".concat(props.position), props["class"]];
  },
  container: 'p-dock-list-container',
  menu: 'p-dock-list',
  menuitem: function menuitem(_ref2) {
    var instance = _ref2.instance,
      processedItem = _ref2.processedItem,
      index = _ref2.index,
      id = _ref2.id;
    return ['p-dock-item', {
      'p-focus': instance.isItemActive(id),
      'p-disabled': instance.disabled(processedItem),
      'p-dock-item-second-prev': instance.currentIndex - 2 === index,
      'p-dock-item-prev': instance.currentIndex - 1 === index,
      'p-dock-item-current': instance.currentIndex === index,
      'p-dock-item-next': instance.currentIndex + 1 === index,
      'p-dock-item-second-next': instance.currentIndex + 2 === index
    }];
  },
  content: 'p-menuitem-content',
  action: function action(_ref3) {
    var props = _ref3.props,
      isActive = _ref3.isActive,
      isExactActive = _ref3.isExactActive;
    return ['p-dock-link', {
      'router-link-active': isActive,
      'router-link-active-exact': props.exact && isExactActive
    }];
  },
  icon: 'p-dock-icon'
};
var _useStyle = usestyle.useStyle(styles, {
    name: 'dock',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$2 = {
  name: 'BaseDock',
  "extends": BaseComponent__default["default"],
  props: {
    position: {
      type: String,
      "default": 'bottom'
    },
    model: null,
    "class": null,
    style: null,
    tooltipOptions: null,
    exact: {
      type: Boolean,
      "default": true
    },
    menuId: {
      type: String,
      "default": null
    },
    tabindex: {
      type: Number,
      "default": 0
    },
    'aria-label': {
      type: String,
      "default": null
    },
    'aria-labelledby': {
      type: String,
      "default": null
    }
  },
  css: {
    classes: classes,
    loadStyle: loadStyle
  },
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
  "extends": BaseComponent__default["default"],
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
    exact: {
      type: Boolean,
      "default": true
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
    'aria-label': {
      type: String,
      "default": null
    },
    'aria-labelledby': {
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
      this.id = newValue || utils.UniqueComponentId();
    }
  },
  mounted: function mounted() {
    this.id = this.id || utils.UniqueComponentId();
  },
  methods: {
    getItemId: function getItemId(index) {
      return "".concat(this.id, "_").concat(index);
    },
    getItemProp: function getItemProp(processedItem, name) {
      return processedItem && processedItem.item ? utils.ObjectUtils.getItemValue(processedItem.item[name]) : undefined;
    },
    getPTOptions: function getPTOptions(key, index) {
      return this.ptm(key, {
        context: {
          index: index,
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
    onItemActionClick: function onItemActionClick(event, navigate) {
      navigate && navigate(event);
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
      this.changeFocusedOptionIndex(utils.DomHandler.find(this.$refs.list, 'li[data-pc-section="menuitem"][data-p-disabled="false"]').length - 1);
    },
    onSpaceKey: function onSpaceKey() {
      var element = utils.DomHandler.findSingle(this.$refs.list, "li[id=\"".concat("".concat(this.focusedOptionIndex), "\"]"));
      var anchorElement = element && utils.DomHandler.findSingle(element, '[data-pc-section="action"]');
      anchorElement ? anchorElement.click() : element && element.click();
    },
    findNextOptionIndex: function findNextOptionIndex(index) {
      var menuitems = utils.DomHandler.find(this.$refs.list, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
      var matchedOptionIndex = _toConsumableArray(menuitems).findIndex(function (link) {
        return link.id === index;
      });
      return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
    },
    findPrevOptionIndex: function findPrevOptionIndex(index) {
      var menuitems = utils.DomHandler.find(this.$refs.list, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
      var matchedOptionIndex = _toConsumableArray(menuitems).findIndex(function (link) {
        return link.id === index;
      });
      return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
    },
    changeFocusedOptionIndex: function changeFocusedOptionIndex(index) {
      var menuitems = utils.DomHandler.find(this.$refs.list, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
      var order = index >= menuitems.length ? menuitems.length - 1 : index < 0 ? 0 : index;
      this.focusedOptionIndex = menuitems[order].getAttribute('id');
    },
    disabled: function disabled(item) {
      return typeof item.disabled === 'function' ? item.disabled() : item.disabled;
    }
  },
  computed: {
    focusedOptionId: function focusedOptionId() {
      return this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : null;
    }
  },
  directives: {
    ripple: Ripple__default["default"],
    tooltip: Tooltip__default["default"]
  }
};

var _hoisted_1 = ["id", "aria-orientation", "aria-activedescendant", "tabindex", "aria-label", "aria-labelledby"];
var _hoisted_2 = ["id", "aria-label", "aria-disabled", "onClick", "onMouseenter", "data-p-focused", "data-p-disabled"];
var _hoisted_3 = ["href", "target", "onClick"];
var _hoisted_4 = ["href", "target"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_link = vue.resolveComponent("router-link");
  var _directive_ripple = vue.resolveDirective("ripple");
  var _directive_tooltip = vue.resolveDirective("tooltip");
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('container')
  }, _ctx.ptm('container')), [vue.createElementVNode("ul", vue.mergeProps({
    ref: "list",
    id: $data.id,
    "class": _ctx.cx('menu'),
    role: "menu",
    "aria-orientation": $props.position === 'bottom' || $props.position === 'top' ? 'horizontal' : 'vertical',
    "aria-activedescendant": $data.focused ? $options.focusedOptionId : undefined,
    tabindex: $props.tabindex,
    "aria-label": _ctx.ariaLabel,
    "aria-labelledby": _ctx.ariaLabelledby,
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
  }, _ctx.ptm('menu')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.model, function (processedItem, index) {
    return vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
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
    }, $options.getPTOptions('menuitem', index), {
      "data-p-focused": $options.isItemActive($options.getItemId(index)),
      "data-p-disabled": $options.disabled(processedItem) || false
    }), [vue.createElementVNode("div", vue.mergeProps({
      "class": _ctx.cx('content')
    }, $options.getPTOptions('content', index)), [!$props.templates['item'] ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
      key: 0
    }, [processedItem.to && !$options.disabled(processedItem) ? (vue.openBlock(), vue.createBlock(_component_router_link, {
      key: 0,
      to: processedItem.to,
      custom: ""
    }, {
      "default": vue.withCtx(function (_ref) {
        var navigate = _ref.navigate,
          href = _ref.href,
          isActive = _ref.isActive,
          isExactActive = _ref.isExactActive;
        return [vue.withDirectives((vue.openBlock(), vue.createElementBlock("a", vue.mergeProps({
          href: href,
          "class": _ctx.cx('action', {
            isActive: isActive,
            isExactActive: isExactActive
          }),
          target: processedItem.target,
          tabindex: "-1",
          "aria-hidden": "true",
          onClick: function onClick($event) {
            return $options.onItemActionClick($event, processedItem, navigate);
          }
        }, $options.getPTOptions('action', index)), [!$props.templates['icon'] ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
          key: 0,
          "class": [_ctx.cx('icon'), processedItem.icon]
        }, $options.getPTOptions('icon', index)), null, 16)), [[_directive_ripple]]) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates['icon']), {
          key: 1,
          item: processedItem,
          "class": vue.normalizeClass(_ctx.cx('icon'))
        }, null, 8, ["item", "class"]))], 16, _hoisted_3)), [[_directive_tooltip, {
          value: processedItem.label,
          disabled: !$props.tooltipOptions
        }, $props.tooltipOptions]])];
      }),
      _: 2
    }, 1032, ["to"])) : vue.withDirectives((vue.openBlock(), vue.createElementBlock("a", vue.mergeProps({
      key: 1,
      href: processedItem.url,
      "class": _ctx.cx('action'),
      target: processedItem.target,
      tabindex: "-1",
      "aria-hidden": "true"
    }, $options.getPTOptions('action', index)), [!$props.templates['icon'] ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
      key: 0,
      "class": [_ctx.cx('icon'), processedItem.icon]
    }, $options.getPTOptions('icon', index)), null, 16)), [[_directive_ripple]]) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates['icon']), {
      key: 1,
      item: processedItem,
      "class": vue.normalizeClass(_ctx.cx('icon'))
    }, null, 8, ["item", "class"]))], 16, _hoisted_4)), [[_directive_tooltip, {
      value: processedItem.label,
      disabled: !$props.tooltipOptions
    }, $props.tooltipOptions]])], 64)) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates['item']), {
      key: 1,
      item: processedItem,
      index: index
    }, null, 8, ["item", "index"]))], 16)], 16, _hoisted_2);
  }), 128))], 16, _hoisted_1)], 16);
}

script$1.render = render$1;

var script = {
  name: 'Dock',
  "extends": script$2,
  components: {
    DockSub: script$1
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_DockSub = vue.resolveComponent("DockSub");
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root'),
    style: _ctx.style
  }, _ctx.ptm('root'), {
    "data-pc-name": "dock"
  }), [vue.createVNode(_component_DockSub, {
    model: _ctx.model,
    templates: _ctx.$slots,
    exact: _ctx.exact,
    tooltipOptions: _ctx.tooltipOptions,
    position: _ctx.position,
    menuId: _ctx.menuId,
    "aria-label": _ctx.ariaLabel,
    "aria-labelledby": _ctx.ariaLabelledby,
    tabindex: _ctx.tabindex,
    pt: _ctx.pt
  }, null, 8, ["model", "templates", "exact", "tooltipOptions", "position", "menuId", "aria-label", "aria-labelledby", "tabindex", "pt"])], 16);
}

script.render = render;

module.exports = script;
