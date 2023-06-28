'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

const PrimeVueDialogSymbol = Symbol();

function useDialog() {
    const PrimeVueDialog = vue.inject(PrimeVueDialogSymbol);

    if (!PrimeVueDialog) {
        throw new Error('No PrimeVue Dialog provided!');
    }

    return PrimeVueDialog;
}

exports.PrimeVueDialogSymbol = PrimeVueDialogSymbol;
exports.useDialog = useDialog;
