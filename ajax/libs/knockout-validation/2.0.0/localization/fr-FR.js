/**
 * Localization file for French - France (fr-FR)
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
	return ko.validation.defineLocale('fr-FR', {
		required: 'Ce champ est obligatoire.',
		min: 'Veuillez saisir une valeur supérieure ou égale à {0}.',
		max: 'Veuillez saisir une valeur inférieure ou égale à {0}.',
		minLength: 'Veuillez saisir au moins {0} caractères.',
		maxLength: 'Veuillez saisir au plus {0} caractères.',
		pattern: 'Veuillez corriger ce champ.',
		step: 'Le pas d\'incrémentation de la valeur doit être de {0}.',
		email: 'Ceci n\'est pas une adresse électronique valide.',
		date: 'Veuillez saisir une date valide.',
		dateISO: 'Veuillez saisir une date (ISO) valide.',
		number: 'Veuillez saisir un nombre.',
		digit: 'Veuillez saisir un chiffre.',
		phoneUS: 'Veuillez saisir un numéro de téléphone valide.',
		equal: 'Les valeurs doivent être égales.',
		notEqual: 'Veuillez saisir une autre valeur.',
		unique: 'Veuillez vérifier que la valeur est unique.'
	});
}));
