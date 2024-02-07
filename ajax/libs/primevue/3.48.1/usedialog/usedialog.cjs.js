'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

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
