import { inject } from 'vue';

var PrimeVueDialogSymbol = Symbol();
function useDialog() {
  var PrimeVueDialog = inject(PrimeVueDialogSymbol);
  if (!PrimeVueDialog) {
    throw new Error('No PrimeVue Dialog provided!');
  }
  return PrimeVueDialog;
}

export { PrimeVueDialogSymbol, useDialog };
