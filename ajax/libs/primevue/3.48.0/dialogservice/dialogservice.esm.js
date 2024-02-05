import DynamicDialogEventBus from 'primevue/dynamicdialogeventbus';
import { PrimeVueDialogSymbol } from 'primevue/usedialog';
import { markRaw } from 'vue';

var DialogService = {
  install: function install(app) {
    var DialogService = {
      open: function open(content, options) {
        var instance = {
          content: content && markRaw(content),
          options: options || {},
          data: options && options.data,
          close: function close(params) {
            DynamicDialogEventBus.emit('close', {
              instance: instance,
              params: params
            });
          }
        };
        DynamicDialogEventBus.emit('open', {
          instance: instance
        });
        return instance;
      }
    };

    // app.config.unwrapInjectedRef = true; // Remove it after Vue 3.3. Details: https://vuejs.org/guide/components/provide-inject.html#working-with-reactivity
    app.config.globalProperties.$dialog = DialogService;
    app.provide(PrimeVueDialogSymbol, DialogService);
  }
};

export { DialogService as default };
