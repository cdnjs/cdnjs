var StringMask = (function() {
	var tokens = {
		'0': {pattern: /\d/, _default: '0'},
		'9': {pattern: /\d/, optional: true},
		'#': {pattern: /\d/, optional: true, recursive: true},
		'S': {pattern: /[a-zA-Z]/},
		'$': {escape: true} 
	};
	var isEscaped = function(pattern, pos) {
		var count = 0;
		var i = pos - 1;
		var token = {escape: true};
		while (i >= 0 && token && token.escape) {
			token = tokens[pattern.charAt(i)];
			count += token && token.escape ? 1 : 0;
			i--;
		}
		return count > 0 && count%2 === 1;	
	};
	var calcOptionalNumbersToUse = function(pattern, value) {
		var numbersInP = pattern.replace(/[^0]/g,'').length;
		var numbersInV = value.replace(/[^\d]/g,'').length;
		return numbersInV - numbersInP;
	};
	var concatChar = function(text, character, options) {
		if (options.reverse) return character + text;
		return text + character;
	};
	var hasMoreTokens = function(pattern, pos, inc) {
		var pc = pattern.charAt(pos);
		var token = tokens[pc];
		if (pc === '') return false;
		return token && !token.escape ? true : hasMoreTokens(pattern, pos + inc, inc);
	};
	var insertChar = function(text, char, position) {
		var t = text.split('');
		t.splice(position >= 0 ? position: 0, 0, char);
		return t.join('');
	};
	var StringMask = function(pattern, opt) {
		this.options = opt || {};
		this.options = {
			reverse: this.options.reverse || false,
			usedefaults: this.options.usedefaults || this.options.reverse
		};
		this.pattern = pattern;

		StringMask.prototype.process = function proccess(value) {
			if (!value) return '';
			value = value + '';
			var pattern2 = this.pattern;
			var valid = true;
			var formatted = '';
			var valuePos = this.options.reverse ? value.length - 1 : 0;
			var optionalNumbersToUse = calcOptionalNumbersToUse(pattern2, value);
			var escapeNext = false;
			var recursive = [];
			var inRecursiveMode = false;

			var steps = {
				start: this.options.reverse ? pattern2.length - 1 : 0,
				end: this.options.reverse ? -1 : pattern2.length,
				inc: this.options.reverse ? -1 : 1
			};

			var continueCondition = function(options) {
				if (!inRecursiveMode && hasMoreTokens(pattern2, i, steps.inc)) {
					return true;
				} else if (!inRecursiveMode) {
					inRecursiveMode = recursive.length > 0;
				}

				if (inRecursiveMode) {
					var pc = recursive.shift();
					recursive.push(pc);
					if (options.reverse && valuePos >= 0) {
						i++;
						pattern2 = insertChar(pattern2, pc, i);
						return true;
					} else if (!options.reverse && valuePos < value.length) {
						pattern2 = insertChar(pattern2, pc, i);
						return true;
					}
				}
				return i < pattern2.length && i >= 0;
			};

			for (var i = steps.start; continueCondition(this.options); i = i + steps.inc) {
				var pc = pattern2.charAt(i);
				var vc = value.charAt(valuePos);
				var token = tokens[pc];
				if (!inRecursiveMode || vc) {
					if (this.options.reverse && isEscaped(pattern2, i)) {
						formatted = concatChar(formatted, pc, this.options);
						i = i + steps.inc;
						continue;
					} else if (!this.options.reverse && escapeNext) {
						formatted = concatChar(formatted, pc, this.options);
						escapeNext = false;
						continue;
					} else if (!this.options.reverse && token && token.escape) {
						escapeNext = true;
						continue;
					}
				}

				if (!inRecursiveMode && token && token.recursive) {
					recursive.push(pc);
				} else if (inRecursiveMode && !vc) {
					if (!token || !token.recursive) formatted = concatChar(formatted, pc, this.options);
					continue;
				} else if (recursive.length > 0 && token && !token.recursive) {
					// Recursive tokens most be the last tokens of the pattern
					valid = false;
					continue;
				} else if (!inRecursiveMode && recursive.length > 0 && !vc) {
					continue;
				}

				if (!token) {
					formatted = concatChar(formatted, pc, this.options);
					if (!inRecursiveMode && recursive.length) {
						recursive.push(pc);
					}
				} else if (token.optional) {
					if (token.pattern.test(vc) && optionalNumbersToUse) {
						formatted = concatChar(formatted, vc, this.options);
						valuePos = valuePos + steps.inc;
						optionalNumbersToUse--;
					} else if (recursive.length > 0 && vc) {
						valid = false;
						break;
					}
				} else if (token.pattern.test(vc)) {
					formatted = concatChar(formatted, vc, this.options);
					valuePos = valuePos + steps.inc;
				} else if (!vc && token._default && this.options.usedefaults) {
					formatted = concatChar(formatted, token._default, this.options);
				} else {
					valid = false;
					break;
				}
			}

			return {result: formatted, valid: valid};
		};

		StringMask.prototype.apply = function(value) {
			return this.process(value).result;
		};

		StringMask.prototype.validate = function(value) {
			return this.process(value).valid;
		};
	};

	StringMask.process = function(value, pattern, options) {
		return new StringMask(pattern, options).process(value);
	};

	StringMask.apply = function(value, pattern, options) {
		return new StringMask(pattern, options).apply(value);
	};

	StringMask.validate = function(value, pattern, options) {
		return new StringMask(pattern, options).validate(value);
	};

	return StringMask;
}());

/** Used to determine if values are of the language type Object */
var objectTypes = {
	'boolean': false,
	'function': true,
	'object': true,
	'number': false,
	'string': false,
	'undefined': false
};

if (objectTypes[typeof module]) {
	module.exports = StringMask;	
}
