/**
 * Localization file for Croatian - Croatia (hr-HR)
 */
(function(factory) {
	// Module systems magic dance.
	/*global require,ko.validation,define,module*/
	if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
		// CommonJS or Node
        module.exports = factory(require('../'));
	} else if (typeof define === 'function' && define['amd']) {
		// AMD anonymous module
		define(['knockout.validation'], factory);
	} else {
		// <script> tag: use the global `ko.validation` object
		factory(ko.validation);
	}
}(function(kv) {
	if (!kv || typeof kv.defineLocale !== 'function') {
		throw new Error('Knockout-Validation is required, please ensure it is loaded before this localization file');
	}
	return kv.defineLocale('hr-HR', {
		required: 'Ovo polje je obavezno.',
		min: 'Unesena vrijednost mora biti jednaka ili veća od {0}.',
		max: 'Unesena vrijednost mora biti jednaka ili manja od {0}.',
		minLength: 'Minimalna dužina polja je {0} znakova.',
		maxLength: 'Maksimalna dužina polja je {0} znakova.',
		pattern: 'Unesena vrijednost nije ispravnog formata.',
		step: 'Vrijednost se mora povećavati za {0}.',
		email: 'Potrebno je unijeti ispravnu e-mail adresu.',
		date: 'Potrebno je unijeti ispravan datum.',
		dateISO: 'Potrebno je unijeti ispravan datum.',
		number: 'Unesena vrijednost mora biti broj.',
		digit: 'Unesena vrijednost mora biti znamenka.',
		phoneUS: 'Potrebno je unijeti ispravan broj telefona.',
		equal: 'Vrijednosti moraju biti jednake.',
		notEqual: 'Unesite drugu vrijednost.',
		unique: 'Unesena vrijednost mora biti jedinstvena.'
	});
}));
