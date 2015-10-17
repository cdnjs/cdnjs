/************************************************
* This is an example localization page. All of these
* messages are the default messages for ko.validation
*
* Currently ko.validation does multiple parameter replacement
* on your message (indicated by the {0}, {1}, etc.).
*
* The parameters that you provide in your validation extender
* are what are passed to your message to do the {0}, {1} etc. replacements.
*
* eg: myProperty.extend({ minLength: 5 });
* ... will provide a message of "Please enter at least 5 characters"
* when validated
*
* eg: myProperty.extend({ between: [1, 5] });
* ... will provide a message of "Please enter between 1 and 5 characters"
* when validated
*
* This message replacement obviously only works with primitives
* such as numbers and strings. We do not stringify complex objects
* or anything like that currently.
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
	return kv.defineLocale('en-US', {
		required: 'This field is required.',
		min: 'Please enter a value greater than or equal to {0}.',
		max: 'Please enter a value less than or equal to {0}.',
		minLength: 'Please enter at least {0} characters.',
		maxLength: 'Please enter no more than {0} characters.',
		pattern: 'Please check this value.',
		step: 'The value must increment by {0}.',
		email: 'Please enter a proper email address.',
		date: 'Please enter a proper date.',
		dateISO: 'Please enter a proper date.',
		number: 'Please enter a number.',
		digit: 'Please enter a digit.',
		phoneUS: 'Please specify a valid phone number.',
		equal: 'Values must equal.',
		notEqual: 'Please choose another value.',
		unique: 'Please make sure the value is unique.'
	});
}));
