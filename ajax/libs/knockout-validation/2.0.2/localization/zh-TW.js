/**
 * Localization file for Chinese - Taiwan (zh-TW)
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
	return kv.defineLocale('zh-TW', {
		required: '此欄位為必填欄位',
		min: '輸入值必須大於等於 {0}',
		max: '輸入值必須小於等於 {0}',
		minLength: '請至少輸入 {0} 個字元',
		maxLength: '最大長度為 {0} 個字元',
		pattern: '請檢查此值',
		step: '每次遞增值是 {0}',
		email: 'email格式不正確',
		date: '日期格式不正確',
		dateISO: '日期格式不正確',
		number: '請輸入一組數字',
		digit: '請輸入一組數字',
		phoneUS: '請輸入一組有效的電話號碼(US)',
		equal: '兩次輸入值不相同',
		notEqual: '請選擇其他數值',
		unique: '請確認此值為唯一值'
	});
}));
