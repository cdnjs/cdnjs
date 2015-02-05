/**
 * Localization file for Greek - Greece (el-GR)
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
	return kv.defineLocale('el-GR', {
		required: 'Το πεδίο αυτό είναι υποχρεωτικό.',
		min: 'Παρακαλώ εισάγετε μια τιμή μεγαλύτερη ή ίση από {0}.',
		max: 'Παρακαλώ εισάγετε μια τιμή μικρότερη ή ίση από {0}.',
		minLength: 'Παρακαλώ εισάγετε τουλάχιστον {0} χαρακτήρες.',
		maxLength: 'Παρακαλώ εισάγετε το πολύ {0} χαρακτήρες.',
		pattern: 'Παρακαλώ ελέγξτε την τιμή αυτή.',
		step: 'Η τιμή πρέπει να αυξηθεί κατά {0}',
		email: 'Η διεύθυνση email δεν έχει έγκυρη μορφή',
		date: 'Παρακαλώ εισάγετε μια έγκυρη ημερομηνία',
		dateISO: 'Παρακαλώ εισάγετε μια έγκυρη ημερομηνία',
		number: 'Παρακαλώ εισάγετε έναν αριθμό',
		digit: 'Παρακαλώ εισάγετε ένα ψηφίο',
		phoneUS: 'Παρακαλώ εισάγετε έναν σωστό αριθμό τηλεφώνου',
		equal: 'Οι τιμές πρέπει να είναι ίσες',
		notEqual: 'Παρακαλώ επιλέξτε μια άλλη τιμή.',
		unique: 'Παρακαλώ βεβαιωθείτε ότι η τιμή είναι μοναδική.'
	});
}));
