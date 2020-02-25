/**
 * Localization file for Ukrainian - Ukraine (uk-UA)
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
	return kv.defineLocale('uk-UA', {
		required: 'Будь ласка, заповніть це поле.',
		min: 'Будь ласка, введіть число більше або рівне {0}.',
		max: 'Будь ласка, введіть число менше або рівне {0}.',
		minLength: 'Будь ласка, введіть принаймні {0} символів.',
		maxLength: 'Будь ласка, введіть не більше ніж {0} символа.',
		pattern: 'Будь ласка, перевірте це поле.',
		step: 'Значення має бути кратним {0}',
		email: 'Будь ласка, вкажіть коректну адресу електронної пошти',
		date: 'Будь ласка, введіть коректну дату',
		dateISO: 'Будь ласка, введіть коректну дату у форматі ISO',
		number: 'Будь ласка, введіть число',
		digit: 'Будь ласка, введіть цифри',
		phoneUS: 'Будь ласка, вкажіть коректний телефонний номер',
		equal: 'Значення повинні бути рівні',
		notEqual: 'Будь ласка, оберіть інше значення.',
		unique: 'Будь ласка, вкажіть унікальне значення.'
	});
}));
