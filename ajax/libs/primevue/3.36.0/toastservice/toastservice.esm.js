import ToastEventBus from 'primevue/toasteventbus';
import { PrimeVueToastSymbol } from 'primevue/usetoast';

var ToastService = {
  install: function install(app) {
    var ToastService = {
      add: function add(message) {
        ToastEventBus.emit('add', message);
      },
      remove: function remove(message) {
        ToastEventBus.emit('remove', message);
      },
      removeGroup: function removeGroup(group) {
        ToastEventBus.emit('remove-group', group);
      },
      removeAllGroups: function removeAllGroups() {
        ToastEventBus.emit('remove-all-groups');
      }
    };
    app.config.globalProperties.$toast = ToastService;
    app.provide(PrimeVueToastSymbol, ToastService);
  }
};

export { ToastService as default };
