/**
 * angular-br-filters
 * An Angular library of masks applicable to several Brazilian data.
 * @version v0.3.0
 * @link https://github.com/the-darc/angular-br-filters
 * @license MIT
 */
(function (angular) {
	var global = {};

/**
 * br-masks
 * A library of masks applicable to several Brazilian data like I.E., CNPJ, CPF and others
 * @version v0.3.0
 * @link http://github.com/the-darc/br-masks
 * @license MIT
 */
(function () {
  var root = this;
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

if (!StringMask && typeof require === 'function') {
	var StringMask = require('string-mask');
}

/*exported CEP */
var CEP = function(value) {
	var cepMask = new StringMask('00000-000');
	if(!value) {
		return value;
	}
	var processed = cepMask.process(value);
	return processed.result;
};

if (!StringMask && typeof require === 'function') {
	var StringMask = require('string-mask');
}

/*exported CNPJ */
var CNPJ = function(value) {
	if(!value) {
		return value;
	}
	var cnpjPattern = new StringMask('00.000.000\/0000-00');
	var formatedValue = cnpjPattern.apply(value);
	return formatedValue;
};

if (!StringMask && typeof require === 'function') {
	var StringMask = require('string-mask');
}

/*exported CPF */
var CPF = function(value) {
	var cpfPattern = new StringMask('000.000.000-00');
	if(!value) {
		return value;
	}
	var formatedValue = cpfPattern.apply(value);
	return formatedValue;
};

if (!StringMask && typeof require === 'function') {
	var StringMask = require('string-mask');
}

/*exported FINANCE */
var FINANCE = function(value, precision, decimalSep, groupSep) {
	precision = (!precision && precision !== 0) || precision < 0? 2 : precision;
	decimalSep = decimalSep || '.';
	groupSep = groupSep || '';

	var decimalsPattern = precision > 0 ? decimalSep + new Array(precision + 1).join('0') : '';
	var maskPattern = '#'+groupSep+'##0'+decimalsPattern;

	value = parseFloat(value);
	if (!value) {
		value = 0;
	}

	var negative = false;
	if (value < 0) {
		value = value * -1;
		negative = true;
	}
	var financeMask = new StringMask(maskPattern, {reverse: true});
	var masked = financeMask.apply(value.toFixed(precision).replace(/[^\d]+/g,''));
	return negative ? '('+masked+')' : masked;
};

if (!StringMask && typeof require === 'function') {
	var StringMask = require('string-mask');
}

/*exported IE */
var IE = function(value, uf) {
	var ieMasks = {
		'AC': [{mask: new StringMask('00.000.000/000-00')}],
		'AL': [{mask: new StringMask('000000000')}],
		'AM': [{mask: new StringMask('00.000.000-0')}],
		'AP': [{mask: new StringMask('000000000')}],
		'BA': [{chars: 8, mask: new StringMask('000000-00')},
			   {mask: new StringMask('0000000-00')}],
		'CE': [{mask: new StringMask('00000000-0')}],
		'DF': [{mask: new StringMask('00000000000-00')}],
		'ES': [{mask: new StringMask('00000000-0')}],
		'GO': [{mask: new StringMask('00.000.000-0')}],
		'MA': [{mask: new StringMask('000000000')}],
		'MG': [{mask: new StringMask('000.000.000/0000')}],
		'MS': [{mask: new StringMask('000000000')}],
		'MT': [{mask: new StringMask('0000000000-0')}],
		'PA': [{mask: new StringMask('00-000000-0')}],
		'PB': [{mask: new StringMask('00000000-0')}],
		'PE': [{chars: 9, mask: new StringMask('0000000-00')},
			   {mask: new StringMask('00.0.000.0000000-0')}],
		'PI': [{mask: new StringMask('000000000')}],
		'PR': [{mask: new StringMask('000.00000-00')}],
		'RJ': [{mask: new StringMask('00.000.00-0')}],
		'RN': [{chars: 9, mask: new StringMask('00.000.000-0')},
			   {mask: new StringMask('00.0.000.000-0')}],
		'RO': [{mask: new StringMask('0000000000000-0')}],
		'RR': [{mask: new StringMask('00000000-0')}],
		'RS': [{mask: new StringMask('000/0000000')}],
		'SC': [{mask: new StringMask('000.000.000')}],
		'SE': [{mask: new StringMask('00000000-0')}],
		'SP': [{mask: new StringMask('000.000.000.000')},
			   {mask: new StringMask('-00000000.0/000')}],
		'TO': [{mask: new StringMask('00000000000')}]
	};

	function clearValue (value) {
		if(!value) {
			return value;
		}

		return value.replace(/[^0-9]/g, '');
	}

	function getMask(uf, value) {
		if(!uf || !ieMasks[uf]) {
			return undefined;
		}
		var _uf = uf.toUpperCase();
		if (_uf === 'SP' && /^P/i.test(value)) {
			return ieMasks.SP[1].mask;
		}
		var masks = ieMasks[uf];
		var i = 0;
		while(masks[i].chars && masks[i].chars < clearValue(value).length && i < masks.length - 1) {
			i++;
		}
		return masks[i].mask;
	}

	var mask = getMask(uf, value);
	if(!value || !mask) {
		return value;
	}
	var processed = mask.process(clearValue(value));
	if (uf && uf.toUpperCase() === 'SP' && /^p/i.test(value)) {
		return 'P'+processed.result;
	}
	return processed.result;
};

if (!StringMask && typeof require === 'function') {
	var StringMask = require('string-mask');
}

/*exported NFEACCESSKEY */
var NFEACCESSKEY = function(value) {
	if(!value) {
		return value;
	}

	var maskPattern = '0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000';
	var nfeMask = new StringMask(maskPattern);
	var formatedValue = nfeMask.apply(value);
	return formatedValue;
};

if (!StringMask && typeof require === 'function') {
	var StringMask = require('string-mask');
}

/*exported PHONE */
var PHONE = function(value) {
	var phoneMask8D = new StringMask('(00) 0000-0000'),
		phoneMask9D = new StringMask('(00) 00000-0000');

	if(!value) {
		return value;
	}

	var formatedValue;
	if(value.length < 11){
		formatedValue = phoneMask8D.apply(value);
	}else{
		formatedValue = phoneMask9D.apply(value);
	}

	return formatedValue;
};

var BrM = {
   ie: IE,
   cpf: CPF,
   cnpj: CNPJ,
   phone: PHONE,
   cep: CEP,
   finance: FINANCE,
   nfeAccessKey: NFEACCESSKEY
};
var objectTypes = {
	'function': true,
	'object': true
};
if (objectTypes[typeof module]) {
	module.exports = BrM;
} else {
	root.BrM = BrM;
}
}.call(this));
'use strict';

/*globals BrM */
angular.module('idf.br-filters', [])
.filter('percentage', ['$filter', function($filter) {
	return function(input, decimals) {
		return $filter('number')(input*100, decimals)+'%';
	};
}])
.filter('brCep', [function() {
	return function(input) {
		return BrM.cep(input);
	};
}])
.filter('brPhoneNumber', [function() {
	return function(input) {
		return BrM.phone(input);
	};
}])
.filter('brCpf', [function() {
	return function(input) {
		return BrM.cpf(input);
	};
}])
.filter('brCnpj', [function() {
	return function(input) {
		return BrM.cnpj(input);
	};
}])
.filter('brIe', [function() {
	return function(input, uf) {
		return BrM.ie(input,uf);
	};
}])
.filter('finance', ['$locale', function($locale) {
	return function(input, currency, decimals) {
		var decimalDelimiter = $locale.NUMBER_FORMATS.DECIMAL_SEP,
			thousandsDelimiter = $locale.NUMBER_FORMATS.GROUP_SEP,
			currencySym = '';

		if(currency === true) {
			currencySym = $locale.NUMBER_FORMATS.CURRENCY_SYM + ' ';
		} else if (currency) {
			currencySym = currency;
		}

		return currencySym + BrM.finance(input, decimals, decimalDelimiter, thousandsDelimiter);
	};
}])
.filter('nfeAccessKey', [function() {
	return function(input) {
		return BrM.nfeAccessKey(input);
	};
}]);

})(angular);
