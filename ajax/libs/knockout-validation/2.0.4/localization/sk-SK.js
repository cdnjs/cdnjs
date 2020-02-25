/**
 * Localization file for Slovak - Slovak Republic (sk-SK)
 */
(function (factory) {
    // Module systems magic dance.
    /*global require,ko.validation,define,module*/
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        // CommonJS or Node
        module.exports = factory(require('../'));
    } else if (typeof define === 'function' && define['amd']) {
        // AMD anonymous module with hard-coded dependency on 'knockout.validation'
        define(['knockout.validation'], factory);
    } else {
        // <script> tag: use the global `ko.validation` object
        factory(ko.validation);
    }
}(function (kv) {
    if (!kv || typeof kv.defineLocale !== 'function') {
        throw new Error('Knockout-Validation is required, please ensure it is loaded before this localization file');
    }
    return kv.defineLocale('sk-SK', {
        required: 'Toto pole je povinné.',
        min: 'Zadajte číslo väčšie alebo rovné {0}.',
        max: 'Zadajte  číslo menšie alebo rovné {0}.',
        minLength: 'Vložte minimálne {0} znakov.',
        maxLength: 'Vložte najviac {0} znakov.',
        pattern: 'Skontrolujte formát poľa.',
        step: 'Hodnota musí byť násobok {0}.',
        email: 'Neplatná e-mailová adresa.',
        date: 'Zadajte platný dátum.',
        dateISO: 'Zadajte platný dátum.',
        number: 'Zadajte číslo.',
        digit: 'Zadajte číslice.',
        phoneUS: 'Zadajte platné telefónne číslo.',
        equal: 'Hodnoty musia byť rovnaké.',
        notEqual: 'Vyberte inú hodnotu.',
        unique: 'Skontrolujte, či je zadaná hodnota jedinečná.'
    });
}));