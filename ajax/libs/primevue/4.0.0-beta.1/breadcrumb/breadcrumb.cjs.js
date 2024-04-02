'use strict';

var ChevronRightIcon = require('primevue/icons/chevronright');
var BaseComponent = require('primevue/basecomponent');
var BreadcrumbStyle = require('primevue/breadcrumb/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ChevronRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronRightIcon);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var BreadcrumbStyle__default = /*#__PURE__*/_interopDefaultLegacy(BreadcrumbStyle);

var script$2 = {
  name: 'BaseBreadcrumb',
  "extends": BaseComponent__default["default"],
  props: {
    model: {
      type: Array,
      "default": null
    },
    home: {
      type: null,
      "default": null
    }
  },
  style: BreadcrumbStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script$1 = {
  name: 'BreadcrumbItem',
  hostName: 'Breadcrumb',
  "extends": BaseComponent__default["default"],
  props: {
    item: null,
    templates: null,
    index: null
  },
  methods: {
    onClick: function onClick(event) {
      if (this.item.command) {
        this.item.command({
          originalEvent: event,
          item: this.item
        });
      }
    },
    visible: function visible() {
      return typeof this.item.visible === 'function' ? this.item.visible() : this.item.visible !== false;
    },
    disabled: function disabled() {
      return typeof this.item.disabled === 'function' ? this.item.disabled() : this.item.disabled;
    },
    label: function label() {
      return typeof this.item.label === 'function' ? this.item.label() : this.item.label;
    },
    isCurrentUrl: function isCurrentUrl() {
      var _this$item = this.item,
        to = _this$item.to,
        url = _this$item.url;
      var lastPath = typeof window !== 'undefined' ? window.location.pathname : '';
      return to === lastPath || url === lastPath ? 'page' : undefined;
    }
  },
  computed: {
    ptmOptions: function ptmOptions() {
      return {
        context: {
          item: this.item,
          index: this.index
        }
      };
    },
    getMenuItemProps: function getMenuItemProps() {
      var _this = this;
      return {
        action: vue.mergeProps({
          "class": this.cx('action'),
          'aria-current': this.isCurrentUrl(),
          onClick: function onClick($event) {
            return _this.onClick($event);
          }
        }, this.ptm('action', this.ptmOptions)),
        icon: vue.mergeProps({
          "class": [this.cx('icon'), this.item.icon]
        }, this.ptm('icon', this.ptmOptions)),
        label: vue.mergeProps({
          "class": this.cx('label')
        }, this.ptm('label', this.ptmOptions))
      };
    }
  }
};

var _hoisted_1 = ["href", "target", "aria-current"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return $options.visible() ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
    key: 0,
    "class": [_ctx.cx('menuitem'), $props.item["class"]]
  }, _ctx.ptm('menuitem', $options.ptmOptions)), [!$props.templates.item ? (vue.openBlock(), vue.createElementBlock("a", vue.mergeProps({
    key: 0,
    href: $props.item.url || '#',
    "class": _ctx.cx('action'),
    target: $props.item.target,
    "aria-current": $options.isCurrentUrl(),
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.onClick && $options.onClick.apply($options, arguments);
    })
  }, _ctx.ptm('action', $options.ptmOptions)), [$props.templates && $props.templates.itemicon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.itemicon), {
    key: 0,
    item: $props.item,
    "class": vue.normalizeClass(_ctx.cx('icon', $options.ptmOptions))
  }, null, 8, ["item", "class"])) : $props.item.icon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
    key: 1,
    "class": [_ctx.cx('icon'), $props.item.icon]
  }, _ctx.ptm('icon', $options.ptmOptions)), null, 16)) : vue.createCommentVNode("", true), $props.item.label ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
    key: 2,
    "class": _ctx.cx('label')
  }, _ctx.ptm('label', $options.ptmOptions)), vue.toDisplayString($options.label()), 17)) : vue.createCommentVNode("", true)], 16, _hoisted_1)) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.item), {
    key: 1,
    item: $props.item,
    label: $options.label(),
    props: $options.getMenuItemProps
  }, null, 8, ["item", "label", "props"]))], 16)) : vue.createCommentVNode("", true);
}

script$1.render = render$1;

var script = {
  name: 'Breadcrumb',
  "extends": script$2,
  inheritAttrs: false,
  components: {
    BreadcrumbItem: script$1,
    ChevronRightIcon: ChevronRightIcon__default["default"]
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_BreadcrumbItem = vue.resolveComponent("BreadcrumbItem");
  var _component_ChevronRightIcon = vue.resolveComponent("ChevronRightIcon");
  return vue.openBlock(), vue.createElementBlock("nav", vue.mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [vue.createElementVNode("ol", vue.mergeProps({
    "class": _ctx.cx('menu')
  }, _ctx.ptm('menu')), [_ctx.home ? (vue.openBlock(), vue.createBlock(_component_BreadcrumbItem, vue.mergeProps({
    key: 0,
    item: _ctx.home,
    "class": _ctx.cx('home'),
    templates: _ctx.$slots,
    pt: _ctx.pt,
    unstyled: _ctx.unstyled
  }, _ctx.ptm('home')), null, 16, ["item", "class", "templates", "pt", "unstyled"])) : vue.createCommentVNode("", true), (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.model, function (item, i) {
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
      key: item.label + '_' + i
    }, [_ctx.home || i !== 0 ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
      key: 0,
      "class": _ctx.cx('separator')
    }, _ctx.ptm('separator')), [vue.renderSlot(_ctx.$slots, "separator", {}, function () {
      return [vue.createVNode(_component_ChevronRightIcon, vue.mergeProps({
        "aria-hidden": "true"
      }, _ctx.ptm('separatorIcon')), null, 16)];
    })], 16)) : vue.createCommentVNode("", true), vue.createVNode(_component_BreadcrumbItem, {
      item: item,
      index: i,
      templates: _ctx.$slots,
      pt: _ctx.pt,
      unstyled: _ctx.unstyled
    }, null, 8, ["item", "index", "templates", "pt", "unstyled"])], 64);
  }), 128))], 16)], 16);
}

script.render = render;

module.exports = script;
