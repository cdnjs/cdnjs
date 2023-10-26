import ConfirmationEventBus from 'primevue/confirmationeventbus';
import { PrimeVueConfirmSymbol } from 'primevue/useconfirm';

var ConfirmationService = {
  install: function install(app) {
    var ConfirmationService = {
      require: function require(options) {
        ConfirmationEventBus.emit('confirm', options);
      },
      close: function close() {
        ConfirmationEventBus.emit('close');
      }
    };
    app.config.globalProperties.$confirm = ConfirmationService;
    app.provide(PrimeVueConfirmSymbol, ConfirmationService);
  }
};

export { ConfirmationService as default };
