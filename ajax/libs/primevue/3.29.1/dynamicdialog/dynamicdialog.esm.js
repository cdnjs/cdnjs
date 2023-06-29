import BaseComponent from 'primevue/basecomponent';
import Dialog from 'primevue/dialog';
import DynamicDialogEventBus from 'primevue/dynamicdialogeventbus';
import { UniqueComponentId } from 'primevue/utils';
import { resolveComponent, openBlock, createElementBlock, Fragment, renderList, createBlock, mergeProps, createSlots, withCtx, resolveDynamicComponent, normalizeProps, guardReactiveProps } from 'vue';

var script = {
    name: 'DynamicDialog',
    extends: BaseComponent,
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
            const key = UniqueComponentId() + '_dynamic_dialog';

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

        DynamicDialogEventBus.on('open', this.openListener);
        DynamicDialogEventBus.on('close', this.closeListener);
    },
    beforeUnmount() {
        DynamicDialogEventBus.off('open', this.openListener);
        DynamicDialogEventBus.off('close', this.closeListener);
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
        DDialog: Dialog
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DDialog = resolveComponent("DDialog");

  return (openBlock(true), createElementBlock(Fragment, null, renderList($data.instanceMap, (instance, key) => {
    return (openBlock(), createBlock(_component_DDialog, mergeProps({
      key: key,
      visible: instance.visible,
      "onUpdate:visible": $event => ((instance.visible) = $event),
      _instance: instance
    }, instance.options.props, {
      pt: _ctx.pt,
      onHide: $event => ($options.onDialogHide(instance)),
      onAfterHide: $options.onDialogAfterHide
    }), createSlots({
      default: withCtx(() => [
        (openBlock(), createBlock(resolveDynamicComponent(instance.content), normalizeProps(guardReactiveProps(instance.options.emits)), null, 16))
      ]),
      _: 2
    }, [
      (instance.options.templates && instance.options.templates.header)
        ? {
            name: "header",
            fn: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList($options.getTemplateItems(instance.options.templates.header), (header, index) => {
                return (openBlock(), createBlock(resolveDynamicComponent(header), {
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
            fn: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList($options.getTemplateItems(instance.options.templates.footer), (footer, index) => {
                return (openBlock(), createBlock(resolveDynamicComponent(footer), {
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

export { script as default };
