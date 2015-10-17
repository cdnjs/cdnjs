/**
 * Localization file for Norwegian (Bokmål) - Norway (nb-NO)
 */
(function(factory) {
	// Module systems magic dance.
	/*global require,ko,define*/
	if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
		// CommonJS or Node: hard-coded dependency on 'knockout-validation'
		factory(require('knockout-validation'));
	} else if (typeof define === "function" && define['amd']) {
		// AMD anonymous module with hard-coded dependency on 'knockout-validation'
		define(['knockout-validation', 'knockout.validation'], factory);
	} else {
		// <script> tag: use the global `ko` object
		factory(ko);
	}
}(function(ko) {
	if (!ko.validation || typeof ko.validation.defineLocale !== 'function') {
		throw new Error('Knockout-Validation is required, please ensure it is loaded before this localization file');
	}
	return ko.validation.defineLocale('nb-NO', {
		required: 'Dette feltet er obligatorisk',
		min: 'Fyll inn en verdi som er større eller lik {0}',
		max: 'Fyll inn en verdi som er mindre eller lik {0}',
		minLength: 'Fyll inn minst {0} tegn',
		maxLength: 'Fyll inn færre enn {0} tegn',
		pattern: 'Vennligst kontrollér verdien',
		step: 'Verdien må økes med {0}',
		email: 'Dette er ikke en korrekt e-postadresse',
		date: 'Fyll inn en korrekt dato',
		dateISO: 'Fyll inn en korrekt dato',
		number: 'Fyll inn ett nummer',
		digit: 'Fyll inn ett siffer',
		phoneUS: 'Vennlist spesifiser ett korrekt telefonnummer',
		equal: 'Verdiene må være like',
		notEqual: 'Vennligst velg en annen verdi',
		unique: 'Vennligst sørg for at verdien er unik'
	});
}));
