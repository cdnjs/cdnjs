/**
 * Localization file for Italian - Italy (it-IT)
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
	return ko.validation.defineLocale('it-IT', {
		required: 'Il campo è obbligatorio.',
		min: 'Inserire un valore superiore od uguale a {0}.',
		max: 'Inserire un valore inferiore od uguale a {0}.',
		minLength: 'Inserire almeno {0} caratteri.',
		maxLength: 'Inserire al massimo {0} caratteri.',
		pattern: 'Controllare il valore inserito.',
		step: 'Il valore deve essere incrementato di {0}.',
		email: 'Indirizzo email non valido.',
		date: 'Inserire una data valida.',
		dateISO: 'Inserire una data valida.',
		number: 'Inserire un valore numerico.',
		digit: 'Inserire una cifra.',
		phoneUS: 'Specificare un numero di telefono valido.',
		equal: 'I valori devono essere uguali.',
		notEqual: 'Il valore deve essere differente.',
		unique: 'Il valore deve essere univoco.'
	});
}));
