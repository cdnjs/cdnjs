'use strict';

var Ripple = require('primevue/ripple');
var utils = require('primevue/utils');
var vue = require('vue');
var BaseComponent = require('primevue/basecomponent');
var TabMenuStyle = require('primevue/tabmenu/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var TabMenuStyle__default = /*#__PURE__*/_interopDefaultLegacy(TabMenuStyle);

var script$1 = {
  name: 'BaseTabMenu',
  "extends": BaseComponent__default["default"],
  props: {
    model: {
      type: Array,
      "default": null
    },
    activeIndex: {
      type: Number,
      "default": 0
    },
    ariaLabelledby: {
      type: String,
      "default": null
    },
    ariaLabel: {
      type: String,
      "default": null
    }
  },
  style: TabMenuStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'TabMenu',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['update:activeIndex', 'tab-change'],
  timeout: null,
  data: function data() {
    return {
      d_activeIndex: this.activeIndex
    };
  },
  watch: {
    activeIndex: function activeIndex(newValue) {
      this.d_activeIndex = newValue;
    }
  },
  mounted: function mounted() {
    this.updateInkBar();
    var activeItem = this.findActiveItem();
    activeItem && (activeItem.tabIndex = '0');
  },
  updated: function updated() {
    this.updateInkBar();
  },
  beforeUnmount: function beforeUnmount() {
    clearTimeout(this.timeout);
  },
  methods: {
    getPTOptions: function getPTOptions(key, item, index) {
      return this.ptm(key, {
        context: {
          item: item,
          index: index
        }
      });
    },
    onItemClick: function onItemClick(event, item, index) {
      if (this.disabled(item)) {
        event.preventDefault();
        return;
      }
      if (item.command) {
        item.command({
          originalEvent: event,
          item: item
        });
      }
      if (index !== this.d_activeIndex) {
        this.d_activeIndex = index;
        this.$emit('update:activeIndex', this.d_activeIndex);
      }
      this.$emit('tab-change', {
        originalEvent: event,
        index: index
      });
    },
    onKeydownItem: function onKeydownItem(event, item, index) {
      switch (event.code) {
        case 'ArrowRight':
          {
            this.navigateToNextItem(event.target);
            event.preventDefault();
            break;
          }
        case 'ArrowLeft':
          {
            this.navigateToPrevItem(event.target);
            event.preventDefault();
            break;
          }
        case 'Home':
          {
            this.navigateToFirstItem(event.target);
            event.preventDefault();
            break;
          }
        case 'End':
          {
            this.navigateToLastItem(event.target);
            event.preventDefault();
            break;
          }
        case 'Space':
        case 'NumpadEnter':
        case 'Enter':
          {
            this.onItemClick(event, item, index);
            event.preventDefault();
            break;
          }
        case 'Tab':
          {
            this.onTabKey();
            break;
          }
      }
    },
    navigateToNextItem: function navigateToNextItem(target) {
      var nextItem = this.findNextItem(target);
      nextItem && this.setFocusToMenuitem(target, nextItem);
    },
    navigateToPrevItem: function navigateToPrevItem(target) {
      var prevItem = this.findPrevItem(target);
      prevItem && this.setFocusToMenuitem(target, prevItem);
    },
    navigateToFirstItem: function navigateToFirstItem(target) {
      var firstItem = this.findFirstItem(target);
      firstItem && this.setFocusToMenuitem(target, firstItem);
    },
    navigateToLastItem: function navigateToLastItem(target) {
      var lastItem = this.findLastItem(target);
      lastItem && this.setFocusToMenuitem(target, lastItem);
    },
    findNextItem: function findNextItem(item) {
      var nextItem = item.parentElement.nextElementSibling;
      return nextItem ? utils.DomHandler.getAttribute(nextItem, 'data-p-disabled') === true ? this.findNextItem(nextItem.children[0]) : nextItem.children[0] : null;
    },
    findPrevItem: function findPrevItem(item) {
      var prevItem = item.parentElement.previousElementSibling;
      return prevItem ? utils.DomHandler.getAttribute(prevItem, 'data-p-disabled') === true ? this.findPrevItem(prevItem.children[0]) : prevItem.children[0] : null;
    },
    findFirstItem: function findFirstItem() {
      var firstSibling = utils.DomHandler.findSingle(this.$refs.nav, '[data-pc-section="menuitem"][data-p-disabled="false"]');
      return firstSibling ? firstSibling.children[0] : null;
    },
    findLastItem: function findLastItem() {
      var siblings = utils.DomHandler.find(this.$refs.nav, '[data-pc-section="menuitem"][data-p-disabled="false"]');
      return siblings ? siblings[siblings.length - 1].children[0] : null;
    },
    findActiveItem: function findActiveItem() {
      var activeItem = utils.DomHandler.findSingle(this.$refs.nav, '[data-pc-section="menuitem"][data-p-disabled="false"][data-p-highlight="true"]');
      return activeItem ? activeItem.children[0] : null;
    },
    setFocusToMenuitem: function setFocusToMenuitem(target, focusableItem) {
      target.tabIndex = '-1';
      focusableItem.tabIndex = '0';
      focusableItem.focus();
    },
    onTabKey: function onTabKey() {
      var activeItem = utils.DomHandler.findSingle(this.$refs.nav, '[data-pc-section="menuitem"][data-p-disabled="false"][data-p-highlight="true"]');
      var focusedItem = utils.DomHandler.findSingle(this.$refs.nav, '[data-pc-section="action"][tabindex="0"]');
      if (focusedItem !== activeItem.children[0]) {
        activeItem && (activeItem.children[0].tabIndex = '0');
        focusedItem.tabIndex = '-1';
      }
    },
    visible: function visible(item) {
      return typeof item.visible === 'function' ? item.visible() : item.visible !== false;
    },
    disabled: function disabled(item) {
      return typeof item.disabled === 'function' ? item.disabled() : item.disabled === true;
    },
    label: function label(item) {
      return typeof item.label === 'function' ? item.label() : item.label;
    },
    updateInkBar: function updateInkBar() {
      var tabs = this.$refs.nav.children;
      var inkHighlighted = false;
      for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[i];
        if (utils.DomHandler.getAttribute(tab, 'data-p-highlight')) {
          this.$refs.inkbar.style.width = utils.DomHandler.getWidth(tab) + 'px';
          this.$refs.inkbar.style.left = utils.DomHandler.getOffset(tab).left - utils.DomHandler.getOffset(this.$refs.nav).left + 'px';
          inkHighlighted = true;
        }
      }
      if (!inkHighlighted) {
        this.$refs.inkbar.style.width = '0px';
        this.$refs.inkbar.style.left = '0px';
      }
    },
    getMenuItemProps: function getMenuItemProps(item, index) {
      var _this = this;
      return {
        action: vue.mergeProps({
          "class": this.cx('action'),
          tabindex: -1,
          onClick: function onClick($event) {
            return _this.onItemClick($event, item, index);
          },
          onKeyDown: function onKeyDown($event) {
            return _this.onKeydownItem($event, item, index);
          }
        }, this.getPTOptions('action', item, index)),
        icon: vue.mergeProps({
          "class": [this.cx('icon'), item.icon]
        }, this.getPTOptions('icon', item, index)),
        label: vue.mergeProps({
          "class": this.cx('label')
        }, this.getPTOptions('label', item, index))
      };
    }
  },
  directives: {
    ripple: Ripple__default["default"]
  }
};

var _hoisted_1 = ["aria-labelledby", "aria-label"];
var _hoisted_2 = ["onClick", "onKeydown", "data-p-highlight", "data-p-disabled"];
var _hoisted_3 = ["href", "target", "aria-label", "aria-disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_ripple = vue.resolveDirective("ripple");
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [vue.createElementVNode("ul", vue.mergeProps({
    ref: "nav",
    "class": _ctx.cx('menu'),
    role: "menubar",
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel
  }, _ctx.ptm('menu')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.model, function (item, i) {
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
      key: $options.label(item) + '_' + i.toString()
    }, [$options.visible(item) ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
      key: 0,
      ref_for: true,
      ref: "tab",
      "class": [_ctx.cx('menuitem', {
        item: item,
        index: i
      }), item["class"]],
      role: "presentation",
      onClick: function onClick($event) {
        return $options.onItemClick($event, item, i);
      },
      onKeydown: function onKeydown($event) {
        return $options.onKeydownItem($event, item, i);
      }
    }, $options.getPTOptions('menuitem', item, i), {
      "data-p-highlight": $data.d_activeIndex === i,
      "data-p-disabled": $options.disabled(item)
    }), [!_ctx.$slots.item ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("a", vue.mergeProps({
      key: 0,
      ref_for: true,
      ref: "tabLink",
      role: "menuitem",
      href: item.url,
      "class": _ctx.cx('action'),
      target: item.target,
      "aria-label": $options.label(item),
      "aria-disabled": $options.disabled(item),
      tabindex: -1
    }, $options.getPTOptions('action', item, i)), [_ctx.$slots.itemicon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.itemicon), {
      key: 0,
      item: item,
      "class": vue.normalizeClass(_ctx.cx('icon'))
    }, null, 8, ["item", "class"])) : item.icon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
      key: 1,
      "class": [_ctx.cx('icon'), item.icon]
    }, $options.getPTOptions('icon', item, i)), null, 16)) : vue.createCommentVNode("", true), vue.createElementVNode("span", vue.mergeProps({
      "class": _ctx.cx('label')
    }, $options.getPTOptions('label', item, i)), vue.toDisplayString($options.label(item)), 17)], 16, _hoisted_3)), [[_directive_ripple]]) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.item), {
      key: 1,
      item: item,
      index: i,
      active: i === $data.d_activeIndex,
      label: $options.label(item),
      props: $options.getMenuItemProps(item, i)
    }, null, 8, ["item", "index", "active", "label", "props"]))], 16, _hoisted_2)) : vue.createCommentVNode("", true)], 64);
  }), 128)), vue.createElementVNode("li", vue.mergeProps({
    ref: "inkbar",
    role: "none",
    "class": _ctx.cx('inkbar')
  }, _ctx.ptm('inkbar')), null, 16)], 16, _hoisted_1)], 16);
}

script.render = render;

module.exports = script;
