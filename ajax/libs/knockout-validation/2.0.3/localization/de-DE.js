/**
 * Localization file for German - Germany (de-DE)
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
	return kv.defineLocale('de-DE', {
		required: 'Dieses Feld ist erforderlich.',
		min: 'Bitte geben Sie einen Wert größer oder gleich {0} ein.',
		max: 'Bitte geben Sie einen Wert kleiner oder gleich {0} ein.',
		minLength: 'Bitte geben Sie mindestens {0} Zeichen ein.',
		maxLength: 'Bitte geben Sie nicht mehr als {0} Zeichen ein.',
		pattern: 'Bitte überprüfen Sie diesen Wert.',
		step: 'Der Wert muss um {0} erhöht werden.',
		email: 'Das ist keine gültige Email-Adresse.',
		date: 'Bitte geben Sie ein gültiges Datum ein.',
		dateISO: 'Bitte geben Sie ein gültiges Datum ein.',
		number: 'Bitte geben Sie eine Zahl ein.',
		digit: 'Bitte geben Sie eine Ziffer ein.',
		phoneUS: 'Bitte geben Sie eine gültige Telefonnummer ein.',
		equal: 'Die Werte müssen übereinstimmen.',
		notEqual: 'Bitte wählen Sie einen anderen Wert.',
		unique: 'Bitte stellen Sie sicher, dass der Wert eindeutig ist.'
	});
}));
