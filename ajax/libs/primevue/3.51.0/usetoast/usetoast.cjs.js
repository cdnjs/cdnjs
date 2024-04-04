'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

var PrimeVueToastSymbol = Symbol();
function useToast() {
  var PrimeVueToast = vue.inject(PrimeVueToastSymbol);
  if (!PrimeVueToast) {
    throw new Error('No PrimeVue Toast provided!');
  }
  return PrimeVueToast;
}

exports.PrimeVueToastSymbol = PrimeVueToastSymbol;
exports.useToast = useToast;
