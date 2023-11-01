'use strict';

var utils = require('primevue/utils');
var vue = require('vue');
var BaseComponent = require('primevue/basecomponent');
var StepsStyle = require('primevue/steps/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var StepsStyle__default = /*#__PURE__*/_interopDefaultLegacy(StepsStyle);

var script$1 = {
  name: 'BaseSteps',
  "extends": BaseComponent__default["default"],
  props: {
    id: {
      type: String
    },
    model: {
      type: Array,
      "default": null
    },
    readonly: {
      type: Boolean,
      "default": true
    },
    exact: {
      type: Boolean,
      "default": true
    }
  },
  style: StepsStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'Steps',
  "extends": script$1,
  beforeMount: function beforeMount() {
    if (!this.$slots.item) {
      console.warn('In future versions, vue-router support will be removed. Item templating should be used.');
    }
  },
  mounted: function mounted() {
    var firstItem = this.findFirstItem();
    firstItem.tabIndex = '0';
  },
  methods: {
    getPTOptions: function getPTOptions(key, item, index) {
      return this.ptm(key, {
        context: {
          item: item,
          index: index,
          active: this.isActive(item),
          disabled: this.isItemDisabled(item)
        }
      });
    },
    onItemClick: function onItemClick(event, item, navigate) {
      if (this.disabled(item) || this.readonly) {
        event.preventDefault();
        return;
      }
      if (item.command) {
        item.command({
          originalEvent: event,
          item: item
        });
      }
      if (item.to && navigate) {
        navigate(event);
      }
    },
    onItemKeydown: function onItemKeydown(event, item, navigate) {
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
        case 'Tab':
          //no op
          break;
        case 'Enter':
        case 'Space':
          {
            this.onItemClick(event, item, navigate);
            event.preventDefault();
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
      return nextItem ? nextItem.children[0] : null;
    },
    findPrevItem: function findPrevItem(item) {
      var prevItem = item.parentElement.previousElementSibling;
      return prevItem ? prevItem.children[0] : null;
    },
    findFirstItem: function findFirstItem() {
      var firstSibling = utils.DomHandler.findSingle(this.$refs.list, '[data-pc-section="menuitem"]');
      return firstSibling ? firstSibling.children[0] : null;
    },
    findLastItem: function findLastItem() {
      var siblings = utils.DomHandler.find(this.$refs.list, '[data-pc-section="menuitem"]');
      return siblings ? siblings[siblings.length - 1].children[0] : null;
    },
    setFocusToMenuitem: function setFocusToMenuitem(target, focusableItem) {
      target.tabIndex = '-1';
      focusableItem.tabIndex = '0';
      focusableItem.focus();
    },
    isActive: function isActive(item) {
      return item.to ? this.$router.resolve(item.to).path === this.$route.path : false;
    },
    isItemDisabled: function isItemDisabled(item) {
      return this.disabled(item) || this.readonly && !this.isActive(item);
    },
    visible: function visible(item) {
      return typeof item.visible === 'function' ? item.visible() : item.visible !== false;
    },
    disabled: function disabled(item) {
      return typeof item.disabled === 'function' ? item.disabled() : item.disabled;
    },
    label: function label(item) {
      return typeof item.label === 'function' ? item.label() : item.label;
    },
    getMenuItemProps: function getMenuItemProps(item, index) {
      var _this = this;
      return {
        action: vue.mergeProps({
          "class": this.cx('action'),
          onClick: function onClick($event) {
            return _this.onItemClick($event, item);
          },
          onKeyDown: function onKeyDown($event) {
            return _this.onItemKeydown($event, item);
          }
        }, this.getPTOptions('action', item, index)),
        step: vue.mergeProps({
          "class": this.cx('step')
        }, this.getPTOptions('step', item, index)),
        label: vue.mergeProps({
          "class": this.cx('label')
        }, this.getPTOptions('label', item, index))
      };
    }
  }
};

var _hoisted_1 = ["id"];
var _hoisted_2 = ["data-p-highlight", "data-p-disabled"];
var _hoisted_3 = ["href", "aria-current", "onClick", "onKeydown"];
var _hoisted_4 = ["onKeydown"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_link = vue.resolveComponent("router-link");
  return vue.openBlock(), vue.createElementBlock("nav", vue.mergeProps({
    id: _ctx.id,
    "class": _ctx.cx('root')
  }, _ctx.ptm('root'), {
    "data-pc-name": "steps"
  }), [vue.createElementVNode("ol", vue.mergeProps({
    ref: "list",
    "class": _ctx.cx('menu')
  }, _ctx.ptm('menu')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.model, function (item, index) {
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
      key: item.to
    }, [$options.visible(item) ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
      key: 0,
      "class": [_ctx.cx('menuitem', {
        item: item
      }), item["class"]],
      style: item.style
    }, $options.getPTOptions('menuitem', item, index), {
      "data-p-highlight": $options.isActive(item),
      "data-p-disabled": $options.isItemDisabled(item)
    }), [!_ctx.$slots.item ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
      key: 0
    }, [!$options.isItemDisabled(item) ? (vue.openBlock(), vue.createBlock(_component_router_link, {
      key: 0,
      to: item.to,
      custom: ""
    }, {
      "default": vue.withCtx(function (_ref) {
        var navigate = _ref.navigate,
          href = _ref.href,
          isActive = _ref.isActive,
          isExactActive = _ref.isExactActive;
        return [vue.createElementVNode("a", vue.mergeProps({
          href: href,
          "class": _ctx.cx('action', {
            isActive: isActive,
            isExactActive: isExactActive
          }),
          tabindex: -1,
          "aria-current": isExactActive ? 'step' : undefined,
          onClick: function onClick($event) {
            return $options.onItemClick($event, item, navigate);
          },
          onKeydown: function onKeydown($event) {
            return $options.onItemKeydown($event, item, navigate);
          }
        }, $options.getPTOptions('action', item, index)), [vue.createElementVNode("span", vue.mergeProps({
          "class": _ctx.cx('step')
        }, $options.getPTOptions('step', item, index)), vue.toDisplayString(index + 1), 17), vue.createElementVNode("span", vue.mergeProps({
          "class": _ctx.cx('label')
        }, $options.getPTOptions('label', item, index)), vue.toDisplayString($options.label(item)), 17)], 16, _hoisted_3)];
      }),
      _: 2
    }, 1032, ["to"])) : (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
      key: 1,
      "class": _ctx.cx('action'),
      onKeydown: function onKeydown($event) {
        return $options.onItemKeydown($event, item);
      }
    }, $options.getPTOptions('action', item, index)), [vue.createElementVNode("span", vue.mergeProps({
      "class": _ctx.cx('step')
    }, $options.getPTOptions('step', item, index)), vue.toDisplayString(index + 1), 17), vue.createElementVNode("span", vue.mergeProps({
      "class": _ctx.cx('label')
    }, $options.getPTOptions('label', item, index)), vue.toDisplayString($options.label(item)), 17)], 16, _hoisted_4))], 64)) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.item), {
      key: 1,
      item: item,
      index: index,
      label: $options.label(item),
      props: $options.getMenuItemProps(item, index)
    }, null, 8, ["item", "index", "label", "props"]))], 16, _hoisted_2)) : vue.createCommentVNode("", true)], 64);
  }), 128))], 16)], 16, _hoisted_1);
}

script.render = render;

module.exports = script;
