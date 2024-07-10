'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

var PrimeVueConfirmSymbol = Symbol();
function useConfirm() {
  var PrimeVueConfirm = vue.inject(PrimeVueConfirmSymbol);
  if (!PrimeVueConfirm) {
    throw new Error('No PrimeVue Confirmation provided!');
  }
  return PrimeVueConfirm;
}

exports.PrimeVueConfirmSymbol = PrimeVueConfirmSymbol;
exports.useConfirm = useConfirm;
