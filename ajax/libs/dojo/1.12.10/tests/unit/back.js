define([
	'intern!object',
	'intern/chai!assert',
	'../../back'
], function (registerSuite, assert, back) {
	registerSuite({
		name: 'dojo/back',

		'getHash and setHash': function () {
			var cases = [
				'test',
				'test with spaces',
				'test%20with%20encoded',
				'test+with+pluses',
				' leading',
				'trailing ',
				'under_score',
				'extra#mark',
				'extra?instring',
				'extra&instring',
				'#leadinghash'
			];
			var str;

			for (var i = cases.length; i--;) {
				str = cases[i];
				back.setHash(str);
				assert.strictEqual(str, back.getHash());
			}
		}
	});
});
