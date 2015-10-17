/**
 * Localization file for Portuguese - Portugal (pt-PT)
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
	return kv.defineLocale('pt-PT', {
		required: 'Este campo é obrigatório.',
		min: 'Por favor, introduza um valor maior ou igual a {0}.',
		max: 'Por favor, introduza um valor menor ou igual a {0}.',
		minLength: 'Por favor, introduza pelo menos {0} caracteres.',
		maxLength: 'Por favor, introduza no máximo {0} caracteres.',
		pattern: 'Por favor, verifique este valor',
		step: 'O valor deve ser incrementado por {0}',
		email: 'Por favor, introduza um e-mail válido.',
		date: 'Por favor, introduza uma data válida.',
		dateISO: 'Por favor, introduza uma data válida (ISO).',
		number: 'Por favor, introduza um número válido.',
		digit: 'Por favor, utilize somente dígitos.',
		phoneUS: 'Por favor, introduza um telefone válido',
		equal: 'Os valores devem ser iguais',
		notEqual: 'Por favor, introduza outro valor',
		unique: 'Verifique se o valor é único'
	});
}));
