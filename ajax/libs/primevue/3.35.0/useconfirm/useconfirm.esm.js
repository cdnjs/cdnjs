import { inject } from 'vue';

var PrimeVueConfirmSymbol = Symbol();
function useConfirm() {
  var PrimeVueConfirm = inject(PrimeVueConfirmSymbol);
  if (!PrimeVueConfirm) {
    throw new Error('No PrimeVue Confirmation provided!');
  }
  return PrimeVueConfirm;
}

export { PrimeVueConfirmSymbol, useConfirm };
