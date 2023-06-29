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
    extends: BaseComponent__default["default"],
    inheritAttrs: false,
    data() {
        return {
            instanceMap: {}
        };
    },
    openListener: null,
    closeListener: null,
    currentInstance: null,
    mounted() {
        this.openListener = ({ instance }) => {
            const key = utils.UniqueComponentId() + '_dynamic_dialog';

            instance.visible = true;
            instance.key = key;
            this.instanceMap[key] = instance;
        };

        this.closeListener = ({ instance, params }) => {
            const key = instance.key;
            const currentInstance = this.instanceMap[key];

            if (currentInstance) {
                currentInstance.visible = false;
                currentInstance.options.onClose && currentInstance.options.onClose({ data: params, type: 'config-close' });

                this.currentInstance = currentInstance;
            }
        };

        DynamicDialogEventBus__default["default"].on('open', this.openListener);
        DynamicDialogEventBus__default["default"].on('close', this.closeListener);
    },
    beforeUnmount() {
        DynamicDialogEventBus__default["default"].off('open', this.openListener);
        DynamicDialogEventBus__default["default"].off('close', this.closeListener);
    },
    methods: {
        onDialogHide(instance) {
            !this.currentInstance && instance.options.onClose && instance.options.onClose({ type: 'dialog-close' });
        },
        onDialogAfterHide() {
            this.currentInstance && delete this.currentInstance;
            this.currentInstance = null;
        },
        getTemplateItems(template) {
            return Array.isArray(template) ? template : [template];
        }
    },
    components: {
        DDialog: Dialog__default["default"]
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DDialog = vue.resolveComponent("DDialog");

  return (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.instanceMap, (instance, key) => {
    return (vue.openBlock(), vue.createBlock(_component_DDialog, vue.mergeProps({
      key: key,
      visible: instance.visible,
      "onUpdate:visible": $event => ((instance.visible) = $event),
      _instance: instance
    }, instance.options.props, {
      pt: _ctx.pt,
      onHide: $event => ($options.onDialogHide(instance)),
      onAfterHide: $options.onDialogAfterHide
    }), vue.createSlots({
      default: vue.withCtx(() => [
        (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(instance.content), vue.normalizeProps(vue.guardReactiveProps(instance.options.emits)), null, 16))
      ]),
      _: 2
    }, [
      (instance.options.templates && instance.options.templates.header)
        ? {
            name: "header",
            fn: vue.withCtx(() => [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.getTemplateItems(instance.options.templates.header), (header, index) => {
                return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(header), {
                  key: index + '_header'
                }))
              }), 128))
            ]),
            key: "0"
          }
        : undefined,
      (instance.options.templates && instance.options.templates.footer)
        ? {
            name: "footer",
            fn: vue.withCtx(() => [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.getTemplateItems(instance.options.templates.footer), (footer, index) => {
                return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(footer), {
                  key: index + '_footer'
                }))
              }), 128))
            ]),
            key: "1"
          }
        : undefined
    ]), 1040, ["visible", "onUpdate:visible", "_instance", "pt", "onHide", "onAfterHide"]))
  }), 128))
}

script.render = render;

module.exports = script;
