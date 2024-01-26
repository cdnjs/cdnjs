import { inject } from 'vue';

var PrimeVueToastSymbol = Symbol();
function useToast() {
  var PrimeVueToast = inject(PrimeVueToastSymbol);
  if (!PrimeVueToast) {
    throw new Error('No PrimeVue Toast provided!');
  }
  return PrimeVueToast;
}

export { PrimeVueToastSymbol, useToast };
