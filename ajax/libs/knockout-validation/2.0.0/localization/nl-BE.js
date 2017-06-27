/**
 * Localization file for Dutch - Belgium (nl-BE)
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
	return ko.validation.defineLocale('nl-BE', {
		required: 'Dit veld is verplicht.',
		min: 'Vul een waarde in groter dan of gelijk aan {0}.',
		max: 'Vul een waarde in kleiner dan of gelijk aan {0}.',
		minLength: 'Vul ten minste {0} tekens in.',
		maxLength: 'Vul ten hoogste {0} tekens in.',
		pattern: 'Vul een correcte waarde in.',
		step: 'Vul een waarde in die deelbaar is door {0}.',
		email: 'Vul een correct e-mailadres in.',
		date: 'Vul een correcte datum in.',
		dateISO: 'Vul een correcte datum in.',
		number: 'Vul een getal in.',
		digit: 'Vul een cijfer in.',
		phoneUS: 'Vul een geldig telefoonnummer in.',
		equal: 'Waarden moeten gelijk zijn.',
		notEqual: 'Vul een andere waarde in.',
		unique: 'Vul een unieke waarde in.'
	});
}));
