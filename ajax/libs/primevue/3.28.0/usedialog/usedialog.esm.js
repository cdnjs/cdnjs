import { inject } from 'vue';

const PrimeVueDialogSymbol = Symbol();

function useDialog() {
    const PrimeVueDialog = inject(PrimeVueDialogSymbol);

    if (!PrimeVueDialog) {
        throw new Error('No PrimeVue Dialog provided!');
    }

    return PrimeVueDialog;
}

export { PrimeVueDialogSymbol, useDialog };
