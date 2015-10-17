/**
 * Localization file for Hungarian - Hungary (hu-HU)
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
	return ko.validation.defineLocale('hu-HU', {
		required: 'Kötelezõ megadni.',
		min: 'Nem lehet kisebb, mint {0}.',
		max: 'Nem lehet nagyobb, mint {0}.',
		minLength: 'Legalább {0} karaktert adjon meg.',
		maxLength: 'Legfeljebb {0} karaktert adjon meg.',
		pattern: 'Kérem ellenõrizze ezt az értéket.',
		step: 'Az értéknek {0} értékkel kell növekednie.',
		email: 'A megadott email cím nem érvényes.',
		date: 'A megadott dátum nem érvényes.',
		dateISO: 'A megadott dátum nem érvényes.',
		number: 'Kérem számot adjon meg.',
		digit: 'Kérem számjegyet adjon meg.',
		phoneUS: 'Kérem, hogy érvényes telefonszámot adjon meg.',
		equal: 'Az értékeknek meg kel egyezniük.',
		notEqual: 'Az értékeknek különbözniük kell.',
		unique: 'Az értéknek egyedieknek kell lennie.'
	});
}));
