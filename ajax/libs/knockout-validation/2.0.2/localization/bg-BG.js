/**
 * Localization file for Bulgarian - Bulgaria (bg-BG)
 */
(function(factory) {
	// Module systems magic dance.
	/*global require,ko.validation,define,module*/
	if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
		// CommonJS or Node
		module.exports = factory(require('../'));
	} else if (typeof define === 'function' && define['amd']) {
		// AMD anonymous module with hard-coded dependency on 'knockout.validation'
		define(['knockout.validation'], factory);
	} else {
		// <script> tag: use the global `ko.validation` object
		factory(ko.validation);
	}
}(function(kv) {
	if (!kv || typeof kv.defineLocale !== 'function') {
		throw new Error('Knockout-Validation is required, please ensure it is loaded before this localization file');
	}
	return kv.defineLocale('bg-BG', {
		required: 'Моля, въведете стойност.',
		min: 'Моля, въведете стойност по-голяма или равна на {0}.',
		max: 'Моля, въведете стойност по-малка или равна на {0}.',
		minLength: 'Моля, въведете поне {0} символа.',
		maxLength: 'Моля, въведете по-малко от {0} символа.',
		pattern: 'Моля, проверете тази стойност.',
		step: 'Стойността трябва да се увеличава с {0}.',
		email: 'Това не е валиден e-mail адрес.',
		date: 'Моля, въведете валидна дата.',
		dateISO: 'Моля, въведете валидна дата.',
		number: 'Моля, въведете число.',
		digit: 'Моля, въведете цифра.',
		phoneUS: 'Моля, въведете валиден телефонен номер.',
		equal: 'Стойностите трябва да са равни.',
		notEqual: 'Моля, изберете различна стойност.',
		unique: 'Моля, убедете се, че стойността е уникална.'
	});
}));
