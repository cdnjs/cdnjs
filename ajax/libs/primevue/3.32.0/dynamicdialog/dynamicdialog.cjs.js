'use strict';

var BaseComponent = require('primevue/basecomponent');
var Dialog = require('primevue/dialog');
var DynamicDialogEventBus = require('primevue/dynamicdialogeventbus');
var utils = require('primevue/utils');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var Dialog__default = /*#__PURE__*/_interopDefaultLegacy(Dialog);
var DynamicDialogEventBus__default = /*#__PURE__*/_interopDefaultLegacy(DynamicDialogEventBus);

var script = {
  name: 'DynamicDialog',
  "extends": BaseComponent__default["default"],
  inheritAttrs: false,
  data: function data() {
    return {
      instanceMap: {}
    };
  },
  openListener: null,
  closeListener: null,
  currentInstance: null,
  mounted: function mounted() {
    var _this = this;
    this.openListener = function (_ref) {
      var instance = _ref.instance;
      var key = utils.UniqueComponentId() + '_dynamic_dialog';
      instance.visible = true;
      instance.key = key;
      _this.instanceMap[key] = instance;
    };
    this.closeListener = function (_ref2) {
      var instance = _ref2.instance,
        params = _ref2.params;
      var key = instance.key;
      var currentInstance = _this.instanceMap[key];
      if (currentInstance) {
        currentInstance.visible = false;
        currentInstance.options.onClose && currentInstance.options.onClose({
          data: params,
          type: 'config-close'
        });
        _this.currentInstance = currentInstance;
      }
    };
    DynamicDialogEventBus__default["default"].on('open', this.openListener);
    DynamicDialogEventBus__default["default"].on('close', this.closeListener);
  },
  beforeUnmount: function beforeUnmount() {
    DynamicDialogEventBus__default["default"].off('open', this.openListener);
    DynamicDialogEventBus__default["default"].off('close', this.closeListener);
  },
  methods: {
    onDialogHide: function onDialogHide(instance) {
      !this.currentInstance && instance.options.onClose && instance.options.onClose({
        type: 'dialog-close'
      });
    },
    onDialogAfterHide: function onDialogAfterHide() {
      this.currentInstance && delete this.currentInstance;
      this.currentInstance = null;
    },
    getTemplateItems: function getTemplateItems(template) {
      return Array.isArray(template) ? template : [template];
    }
  },
  components: {
    DDialog: Dialog__default["default"]
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_DDialog = vue.resolveComponent("DDialog");
  return vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.instanceMap, function (instance, key) {
    return vue.openBlock(), vue.createBlock(_component_DDialog, vue.mergeProps({
      key: key,
      visible: instance.visible,
      "onUpdate:visible": function onUpdateVisible($event) {
        return instance.visible = $event;
      },
      _instance: instance
    }, instance.options.props, {
      pt: _ctx.pt,
      unstyled: _ctx.unstyled,
      onHide: function onHide($event) {
        return $options.onDialogHide(instance);
      },
      onAfterHide: $options.onDialogAfterHide
    }), vue.createSlots({
      "default": vue.withCtx(function () {
        return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(instance.content), vue.normalizeProps(vue.guardReactiveProps(instance.options.emits)), null, 16))];
      }),
      _: 2
    }, [instance.options.templates && instance.options.templates.header ? {
      name: "header",
      fn: vue.withCtx(function () {
        return [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.getTemplateItems(instance.options.templates.header), function (header, index) {
          return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(header), vue.mergeProps({
            key: index + '_header'
          }, instance.options.emits), null, 16);
        }), 128))];
      }),
      key: "0"
    } : undefined, instance.options.templates && instance.options.templates.footer ? {
      name: "footer",
      fn: vue.withCtx(function () {
        return [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.getTemplateItems(instance.options.templates.footer), function (footer, index) {
          return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(footer), vue.mergeProps({
            key: index + '_footer'
          }, instance.options.emits), null, 16);
        }), 128))];
      }),
      key: "1"
    } : undefined]), 1040, ["visible", "onUpdate:visible", "_instance", "pt", "unstyled", "onHide", "onAfterHide"]);
  }), 128);
}

script.render = render;

module.exports = script;
