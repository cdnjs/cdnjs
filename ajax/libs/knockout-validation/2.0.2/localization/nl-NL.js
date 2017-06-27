/**
 * Localization file for Dutch - The Netherlands (nl-NL)
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
	return kv.defineLocale('nl-NL', {
		required: 'Dit veld is verplicht.',
		min: 'Vul een waarde in groter of gelijk aan {0}.',
		max: 'Vul een waarde in kleiner of gelijk aan {0}.',
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
