this.primevue = this.primevue || {};
this.primevue.usedialog = (function (exports, vue) {
    'use strict';

    var PrimeVueDialogSymbol = Symbol();
    function useDialog() {
      var PrimeVueDialog = vue.inject(PrimeVueDialogSymbol);
      if (!PrimeVueDialog) {
        throw new Error('No PrimeVue Dialog provided!');
      }
      return PrimeVueDialog;
    }

    exports.PrimeVueDialogSymbol = PrimeVueDialogSymbol;
    exports.useDialog = useDialog;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, Vue);
