/**
 * Localization file for Japanese - Japan (ja-JP)
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
	return kv.defineLocale('ja-JP', {
		required: 'このフィールドは必須入力項目です。',
		min: '{0}以上の値を入力してください。',
		max: '{0}以下の値を入力してください。',
		minLength: '{0}文字以上の文字を入力してください。',
		maxLength: '{0}文字以下の文字数にしてください。',
		pattern: '入力値を確認してください。',
		step: 'この値は{0}で増加します。',
		email:'適切なe-mailアドレスではありません。',
		date: '適切な日付を入力してください。',
		dateISO: '適切な日付を入力してください。',
		number: '数字を入力してください。',
		digit: '数値を入力してください。',
		phoneUS: '有効な電話番号を指定してください。',
		equal: '同一の値にしてください。',
		notEqual: '他の値を選択してください。',
		unique: '一意の値であることを確認してください。'
	});
}));
