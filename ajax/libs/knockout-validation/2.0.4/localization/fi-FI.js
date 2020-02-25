/**
 * Localization file for Finnish - Finland (fi-FI)
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
	return kv.defineLocale('fi-FI', {
		required: 'Pakollinen kenttä.',
		min: 'Syötä arvo, joka on suurempi tai yhtä suuri kuin {0}.',
		max: 'Syötä arvo, joka on pienempi tai yhtä suuri kuin {0}.',
		minLength: 'Syötä vähintään {0} merkkiä.',
		maxLength: 'Syötä enintään {0} merkkiä.',
		pattern: 'Tarkista arvo.',
		step: 'Arvon tulee kasvaa {0}:lla.',
		email: 'Syötä oikeamuotoinen sähköposti.',
		date: 'Syötä oikeamuotoinen päiväys.',
		dateISO: 'Syötä oikeamuotoinen päiväys.',
		number: 'Syötä numero.',
		digit: 'Syötä luku.',
		phoneUS: 'Syötä oikeamuotoinen puhelinnumero.',
		equal: 'Arvojen tulee olla yhtä suuret.',
		notEqual: 'Valitse toinen arvo.',
		unique: 'Varmista, että arvo on yksilöllinen.'
	});
}));