/**
 * Localization file for Czech - Czech Republic (cs-CZ)
 */
(function(factory) {
	// Module systems magic dance.
	/*global require,ko,define*/
	if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
		// CommonJS or Node: hard-coded dependency on 'knockout'
		factory(require('knockout'));
	} else if (typeof define === "function" && define['amd']) {
		// AMD anonymous module with hard-coded dependency on 'knockout'
		define(['knockout'], factory);
	} else {
		// <script> tag: use the global `ko` object
		factory(ko);
	}
}(function(ko) {
	if (!ko.validation || typeof ko.validation.defineLocale !== 'function') {
		throw new Error('Knockout-Validation is required, please ensure it is loaded before this localization file');
	}
	return ko.validation.defineLocale('cs-CZ', {
		required: 'Toto pole je povinné.',
		min: 'Zadejte číslo větší nebo rovné {0}.',
		max: 'Zadejte číslo menší nebo rovné {0}.',
		minLength: 'Vložte alespoň {0} znaků.',
		maxLength: 'Vložte nejvíce {0} znaků.',
		pattern: 'Zkontrolujte formát pole.',
		step: 'Hodnota musí být násobek {0}.',
		email: 'Neplatná e-mailová adresa.',
		date: 'Zadejte platné datum.',
		dateISO: 'Zadejte platné datum.',
		number: 'Zadejte číslo.',
		digit: 'Zadejte číslice.',
		phoneUS: 'Zadejte platné telefonní číslo.',
		equal: 'Hodnoty musí být stejné.',
		notEqual: 'Vyberte jinou hodnotu.',
		unique: 'Zkontrolujte, zda hodnota je jedinečná.'
	});
}));
