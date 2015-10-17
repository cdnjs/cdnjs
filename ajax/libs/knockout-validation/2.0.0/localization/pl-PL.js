/**
 * Localization file for Polish - Poland (pl-PL)
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
	return ko.validation.defineLocale('pl-PL', {
		required: 'To pole jest wymagane.',
		min: 'Wprowadź liczbę więszką lub równą {0}.',
		max: 'Wprowadź liczbę mniejszą lub równą {0}.',
		minLength: 'Wprowadź co najmniej {0} znaków.',
		maxLength: 'Wprowadź co najwyżej {0} znaków.',
		pattern: 'Sprawdź to pole.',
		step: 'Wartość musi być wielokrotnością {0}.',
		email: 'Wprowadź poprawny adres e-mail.',
		date: 'Wprowadź poprawną datę.',
		dateISO: 'Wprowadź poprawną datę.',
		number: 'Wprowadź liczbę.',
		digit: 'Wprowadź cyfrę.',
		phoneUS: 'Wprowadź poprawny numer telefonu.',
		equal: 'Wartości muszą być równe.',
		notEqual: 'Wybierz inną wartość.',
		unique: 'Sprawdź czy wartość jest unikalna.'
	});
}));
