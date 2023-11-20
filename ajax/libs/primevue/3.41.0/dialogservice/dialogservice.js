this.primevue = this.primevue || {};
this.primevue.dialogservice = (function (DynamicDialogEventBus, usedialog, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var DynamicDialogEventBus__default = /*#__PURE__*/_interopDefaultLegacy(DynamicDialogEventBus);

    var DialogService = {
      install: function install(app) {
        var DialogService = {
          open: function open(content, options) {
            var instance = {
              content: content && vue.markRaw(content),
              options: options || {},
              data: options && options.data,
              close: function close(params) {
                DynamicDialogEventBus__default["default"].emit('close', {
                  instance: instance,
                  params: params
                });
              }
            };
            DynamicDialogEventBus__default["default"].emit('open', {
              instance: instance
            });
            return instance;
          }
        };

        // app.config.unwrapInjectedRef = true; // Remove it after Vue 3.3. Details: https://vuejs.org/guide/components/provide-inject.html#working-with-reactivity
        app.config.globalProperties.$dialog = DialogService;
        app.provide(usedialog.PrimeVueDialogSymbol, DialogService);
      }
    };

    return DialogService;

})(primevue.dynamicdialogeventbus, primevue.usedialog, Vue);
