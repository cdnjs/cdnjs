/**
 * Localization file for Hebrew - Israel (he-IL)
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
	return kv.defineLocale('he-IL', {
		required: 'שדה נדרש',
		min: 'אנא הכנס ערך גדול יותר או שווה ל- {0}',
		max: 'אנא הכנס ערך קטן יותר או שווה ל- {0}',
		minLength: 'אנא הכנס לפחות {0} תווים',
		maxLength: 'אנא הכנס לא יותר מאשר {0} תווים',
		pattern: 'אנא בדוק את הערך הזה',
		step: 'הערך צריך להשתנות ב - {0}',
		email: 'אנא הכנס כתובת דוא"ל חוקית',
		date: 'אנא הכנס תאריך תקין',
		dateISO: 'אנא הכנס תאריך תקין',
		number: 'אנא הכנס מספר',
		digit: 'אנא הכנס ספרה',
		phoneUS: 'אנא הכנס מספר טלפון תקין',
		equal: 'ערכים חייבים להיות שווים',
		notEqual: 'אנא בחר ערך שונה',
		unique: 'אנא וודא שהערך ייחודי'
	});
}));
