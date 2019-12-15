/**
 * angular-input-masks
 * Personalized input masks for AngularJS
 * @version v4.2.1
 * @link http://github.com/assisrafael/angular-input-masks
 * @license MIT
 */
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * br-validations
 * A library of validations applicable to several Brazilian data like I.E., CNPJ, CPF and others
 * @version v0.3.0
 * @link http://github.com/the-darc/br-validations
 * @license MIT
 */
(function (root, factory) {
	/* istanbul ignore next */
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], factory);
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	} else {
		// Browser globals (root is window)
		root.BrV = factory();
	}
}(this, function () {
var CNPJ = {};

CNPJ.validate = function(c) {
	var b = [6,5,4,3,2,9,8,7,6,5,4,3,2];
	c = c.replace(/[^\d]/g,'');

	var r = /^(0{14}|1{14}|2{14}|3{14}|4{14}|5{14}|6{14}|7{14}|8{14}|9{14})$/;
	if (!c || c.length !== 14 || r.test(c)) {
		return false;
	}
	c = c.split('');

	for (var i = 0, n = 0; i < 12; i++) {
		n += c[i] * b[i+1];
	}
	n = 11 - n%11;
	n = n >= 10 ? 0 : n;
	if (parseInt(c[12]) !== n)  {
		return false;
	}

	for (i = 0, n = 0; i <= 12; i++) {
		n += c[i] * b[i];
	}
	n = 11 - n%11;
	n = n >= 10 ? 0 : n;
	if (parseInt(c[13]) !== n)  {
		return false;
	}
	return true;
};


var CPF = {};

CPF.validate = function(cpf) {
	cpf = cpf.replace(/[^\d]+/g,'');
	var r = /^(0{11}|1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11})$/;
	if (!cpf || cpf.length !== 11 || r.test(cpf)) {
		return false;
	}
	function validateDigit(digit) {
		var add = 0;
		var init = digit - 9;
		for (var i = 0; i < 9; i ++) {
			add += parseInt(cpf.charAt(i + init)) * (i+1);
		}
		return (add%11)%10 === parseInt(cpf.charAt(digit));
	}
	return validateDigit(9) && validateDigit(10);
};

var IE = function(uf) {
	if (!(this instanceof IE)) {
		return new IE(uf);
	}

	this.rules = IErules[uf] || [];
	this.rule;
	IE.prototype._defineRule = function(value) {
		this.rule = undefined;
		for (var r = 0; r < this.rules.length && this.rule === undefined; r++) {
			var str = value.replace(/[^\d]/g,'');
			var ruleCandidate = this.rules[r];
			if (str.length === ruleCandidate.chars && (!ruleCandidate.match || ruleCandidate.match.test(value))) {
				this.rule = ruleCandidate;
			}
		}
		return !!this.rule;
	};

	IE.prototype.validate = function(value) {
		if (!value || !this._defineRule(value)) {
			return false;
		}
		return this.rule.validate(value);
	};
};

var IErules = {};

var algorithmSteps = {
	handleStr: {
		onlyNumbers: function(str) {
			return str.replace(/[^\d]/g,'').split('');
		},
		mgSpec: function(str) {
			var s = str.replace(/[^\d]/g,'');
			s = s.substr(0,3)+'0'+s.substr(3, s.length);
			return s.split('');
		}
	},
	sum: {
		normalSum: function(handledStr, pesos) {
			var nums = handledStr;
			var sum = 0;
			for (var i = 0; i < pesos.length; i++) {
				sum += parseInt(nums[i]) * pesos[i];
			}
			return sum;
		},
		individualSum: function(handledStr, pesos) {
			var nums = handledStr;
			var sum = 0;
			for (var i = 0; i < pesos.length; i++) {
				var mult = parseInt(nums[i]) * pesos[i];
				sum += mult%10 + parseInt(mult/10);
			}
			return sum;
		},
		apSpec: function(handledStr, pesos) {
			var sum = this.normalSum(handledStr, pesos);
			var ref = handledStr.join('');
			if (ref >= '030000010' && ref <= '030170009') {
				return sum + 5;
			}
			if (ref >= '030170010' && ref <= '030190229') {
				return sum + 9;
			}
			return sum;
		}
	},
	rest: {
		mod11: function(sum) {
			return sum%11;
		},
		mod10: function(sum) {
			return sum%10;
		},
		mod9: function(sum) {
			return sum%9;
		}
	},
	expectedDV: {
		minusRestOf11: function(rest) {
			return rest < 2 ? 0 : 11 - rest;
		},
		minusRestOf11v2: function(rest) {
			return rest < 2 ? 11 - rest - 10 : 11 - rest;
		},
		minusRestOf10: function(rest) {
			return rest < 1 ? 0 : 10 - rest;
		},
		mod10: function(rest) {
			return rest%10;
		},
		goSpec: function(rest, handledStr) {
			var ref = handledStr.join('');
			if (rest === 1) {
				return ref >= '101031050' && ref <= '101199979' ? 1 : 0;
			}
			return rest === 0 ? 0 : 11 - rest;
		},
		apSpec: function(rest, handledStr) {
			var ref = handledStr.join('');
			if (rest === 0) {
				return ref >= '030170010' && ref <= '030190229' ? 1 : 0;
			}
			return rest === 1 ? 0 : 11 - rest;
		},
		voidFn: function(rest) {
			return rest;
		}
	}
};


/**
 * options {
 *     pesos: Array of values used to operate in sum step
 *     dvPos: Position of the DV to validate considering the handledStr
 *     algorithmSteps: The four DV's validation algorithm steps names
 * }
 */
function validateDV(value, options) {
	var steps = options.algorithmSteps;

	// Step 01: Handle String
	var handledStr = algorithmSteps.handleStr[steps[0]](value);

	// Step 02: Sum chars
	var sum = algorithmSteps.sum[steps[1]](handledStr, options.pesos);

	// Step 03: Rest calculation
	var rest = algorithmSteps.rest[steps[2]](sum);

	// Fixed Step: Get current DV
	var currentDV = parseInt(handledStr[options.dvpos]);

	// Step 04: Expected DV calculation
	var expectedDV = algorithmSteps.expectedDV[steps[3]](rest, handledStr);

	// Fixed step: DV verification
	return currentDV === expectedDV;
}

function validateIE(value, rule) {
	for (var i = 0; i < rule.dvs.length; i++) {
		// console.log('>> >> dv'+i);
		if (!validateDV(value, rule.dvs[i])) {
			return false;
		}
	}
	return true;
}

IErules.PE = [{
	//mask: new StringMask('0000000-00'),
	chars: 9,
	dvs: [{
		dvpos: 7,
		pesos: [8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	},{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
},{
	// mask: new StringMask('00.0.000.0000000-0'),
	chars: 14,
	pesos: [[1,2,3,4,5,9,8,7,6,5,4,3,2]],
	dvs: [{
		dvpos: 13,
		pesos: [5,4,3,2,1,9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11v2']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.RS = [{
	// mask: new StringMask('000/0000000'),
	chars: 10,
	dvs: [{
		dvpos: 9,
		pesos: [2,9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.AC = [{
	// mask: new StringMask('00.000.000/000-00'),
	chars: 13,
	match: /^01/,
	dvs: [{
		dvpos: 11,
		pesos: [4,3,2,9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	},{
		dvpos: 12,
		pesos: [5,4,3,2,9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.MG = [{
	// mask: new StringMask('000.000.000/0000'),
	chars: 13,
	dvs: [{
		dvpos: 12,
		pesos: [1,2,1,2,1,2,1,2,1,2,1,2],
		algorithmSteps: ['mgSpec', 'individualSum', 'mod10', 'minusRestOf10']
	},{
		dvpos: 12,
		pesos: [3,2,11,10,9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.SP = [{
	// mask: new StringMask('000.000.000.000'),
	chars: 12,
	match: /^[0-9]/,
	dvs: [{
		dvpos: 8,
		pesos: [1,3,4,5,6,7,8,10],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'mod10']
	},{
		dvpos: 11,
		pesos: [3,2,10,9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'mod10']
	}],
	validate: function(value) { return validateIE(value, this); }
},{
	// mask: new StringMask('P-00000000.0/000')
	chars: 12,
	match: /^P/i,
	dvs: [{
		dvpos: 8,
		pesos: [1,3,4,5,6,7,8,10],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'mod10']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.DF = [{
	// mask: new StringMask('00000000000-00'),
	chars: 13,
	dvs: [{
		dvpos: 11,
		pesos: [4,3,2,9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	},{
		dvpos: 12,
		pesos: [5,4,3,2,9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.ES = [{
	// mask: new StringMask('000.000.00-0')
	chars: 9,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.BA = [{
	// mask: new StringMask('000000-00')
	chars: 8,
	match: /^[0123458]/,
	dvs: [{
		dvpos: 7,
		pesos: [7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod10', 'minusRestOf10']
	},{
		dvpos: 6,
		pesos: [8,7,6,5,4,3,0,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod10', 'minusRestOf10']
	}],
	validate: function(value) { return validateIE(value, this); }
},{
	chars: 8,
	match: /^[679]/,
	dvs: [{
		dvpos: 7,
		pesos: [7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	},{
		dvpos: 6,
		pesos: [8,7,6,5,4,3,0,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
},{
	// mask: new StringMask('0000000-00')
	chars: 9,
	match: /^[0-9][0123458]/,
	dvs: [{
		dvpos: 8,
		pesos: [8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod10', 'minusRestOf10']
	},{
		dvpos: 7,
		pesos: [9,8,7,6,5,4,3,0,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod10', 'minusRestOf10']
	}],
	validate: function(value) { return validateIE(value, this); }
},{
	chars: 9,
	match: /^[0-9][679]/,
	dvs: [{
		dvpos: 8,
		pesos: [8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	},{
		dvpos: 7,
		pesos: [9,8,7,6,5,4,3,0,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.AM = [{
	//mask: new StringMask('00.000.000-0')
	chars: 9,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.RN = [{
	// {mask: new StringMask('00.000.000-0')
	chars: 9,
	match: /^20/,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
},{
	// {mask: new StringMask('00.0.000.000-0'), chars: 10}
	chars: 10,
	match: /^20/,
	dvs: [{
		dvpos: 8,
		pesos: [10,9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.RO = [{
	// mask: new StringMask('0000000000000-0')
	chars: 14,
	dvs: [{
		dvpos: 13,
		pesos: [6,5,4,3,2,9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11v2']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.PR = [{
	// mask: new StringMask('00000000-00')
	chars: 10,
	dvs: [{
		dvpos: 8,
		pesos: [3,2,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	},{
		dvpos: 9,
		pesos: [4,3,2,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.SC = [{
	// {mask: new StringMask('000.000.000'), uf: 'SANTA CATARINA'}
	chars: 9,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.RJ = [{
	// {mask: new StringMask('00.000.00-0'), uf: 'RIO DE JANEIRO'}
	chars: 8,
	dvs: [{
		dvpos: 7,
		pesos: [2,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.PA = [{
	// {mask: new StringMask('00-000000-0')
	chars: 9,
	match: /^15/,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.SE = [{
	// {mask: new StringMask('00000000-0')
	chars: 9,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.PB = [{
	// {mask: new StringMask('00000000-0')
	chars: 9,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.CE = [{
	// {mask: new StringMask('00000000-0')
	chars: 9,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.PI = [{
	// {mask: new StringMask('000000000')
	chars: 9,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.MA = [{
	// {mask: new StringMask('000000000')
	chars: 9,
	match: /^12/,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.MT = [{
	// {mask: new StringMask('0000000000-0')
	chars: 11,
	dvs: [{
		dvpos: 10,
		pesos: [3,2,9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.MS = [{
	// {mask: new StringMask('000000000')
	chars: 9,
	match: /^28/,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.TO = [{
	// {mask: new StringMask('00000000000'),
	chars: 11,
	match: /^[0-9]{2}((0[123])|(99))/,
	dvs: [{
		dvpos: 10,
		pesos: [9,8,0,0,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.AL = [{
	// {mask: new StringMask('000000000')
	chars: 9,
	match: /^24[03578]/,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.RR = [{
	// {mask: new StringMask('00000000-0')
	chars: 9,
	match: /^24/,
	dvs: [{
		dvpos: 8,
		pesos: [1,2,3,4,5,6,7,8],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod9', 'voidFn']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.GO = [{
	// {mask: new StringMask('00.000.000-0')
	chars: 9,
	match: /^1[015]/,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'goSpec']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.AP = [{
	// {mask: new StringMask('000000000')
	chars: 9,
	match: /^03/,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'apSpec', 'mod11', 'apSpec']
	}],
	validate: function(value) { return validateIE(value, this); }
}];


var PIS = {};

PIS.validate = function(pis) {
	pis = pis.replace(/[^\d]+/g,'');
	var r = /^(0{11}|1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11})$/;

	if (!pis || pis.length !== 11 || r.test(pis)) {
		return false;
	}

	var pisi = pis.substring(0,10);
	var pisd = pis.substring(10);

	function calculateDigit(pis){
        var p = [3,2,9,8,7,6,5,4,3,2];
        var s = 0;
        for(var i = 0; i <= 9; i++){
            s += parseInt(pis.charAt(i)) * p[i];
        }
        var r = 11 - (s%11);
        return (r === 10 || r === 11) ? 0 : r;
	}

	return Number(pisd) === calculateDigit(pisi);
};

	return {
		ie: IE,
		cpf: CPF,
		cnpj: CNPJ,
		pis: PIS
	};
}));
},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addUTCMinutes;

var _index = require('../../toDate/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function addUTCMinutes(dirtyDate, dirtyAmount, dirtyOptions) {
  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  var amount = Number(dirtyAmount);
  date.setUTCMinutes(date.getUTCMinutes() + amount);
  return date;
}
module.exports = exports['default'];
},{"../../toDate/index.js":35}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cloneObject;
function cloneObject(dirtyObject) {
  dirtyObject = dirtyObject || {};
  var object = {};

  for (var property in dirtyObject) {
    if (dirtyObject.hasOwnProperty(property)) {
      object[property] = dirtyObject[property];
    }
  }

  return object;
}
module.exports = exports["default"];
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUTCDayOfYear;

var _index = require('../../toDate/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_DAY = 86400000;

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function getUTCDayOfYear(dirtyDate, dirtyOptions) {
  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  var timestamp = date.getTime();
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
  var startOfYearTimestamp = date.getTime();
  var difference = timestamp - startOfYearTimestamp;
  return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
}
module.exports = exports['default'];
},{"../../toDate/index.js":35}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUTCISOWeek;

var _index = require('../../toDate/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../startOfUTCISOWeek/index.js');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('../startOfUTCISOWeekYear/index.js');

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_WEEK = 604800000;

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function getUTCISOWeek(dirtyDate, dirtyOptions) {
  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  var diff = (0, _index4.default)(date, dirtyOptions).getTime() - (0, _index6.default)(date, dirtyOptions).getTime();

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}
module.exports = exports['default'];
},{"../../toDate/index.js":35,"../startOfUTCISOWeek/index.js":11,"../startOfUTCISOWeekYear/index.js":12}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUTCISOWeekYear;

var _index = require('../../toDate/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../startOfUTCISOWeek/index.js');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function getUTCISOWeekYear(dirtyDate, dirtyOptions) {
  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  var year = date.getUTCFullYear();

  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = (0, _index4.default)(fourthOfJanuaryOfNextYear, dirtyOptions);

  var fourthOfJanuaryOfThisYear = new Date(0);
  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = (0, _index4.default)(fourthOfJanuaryOfThisYear, dirtyOptions);

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
module.exports = exports['default'];
},{"../../toDate/index.js":35,"../startOfUTCISOWeek/index.js":11}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setUTCDay;

var _index = require('../../toDate/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function setUTCDay(dirtyDate, dirtyDay, dirtyOptions) {
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn === undefined ? 0 : Number(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn === undefined ? defaultWeekStartsOn : Number(options.weekStartsOn);

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  var day = Number(dirtyDay);

  var currentDay = date.getUTCDay();

  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;

  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;

  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}
module.exports = exports['default'];
},{"../../toDate/index.js":35}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setUTCISODay;

var _index = require('../../toDate/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function setUTCISODay(dirtyDate, dirtyDay, dirtyOptions) {
  var day = Number(dirtyDay);

  if (day % 7 === 0) {
    day = day - 7;
  }

  var weekStartsOn = 1;
  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  var currentDay = date.getUTCDay();

  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;

  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;

  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}
module.exports = exports['default'];
},{"../../toDate/index.js":35}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setUTCISOWeek;

var _index = require('../../toDate/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../getUTCISOWeek/index.js');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function setUTCISOWeek(dirtyDate, dirtyISOWeek, dirtyOptions) {
  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  var isoWeek = Number(dirtyISOWeek);
  var diff = (0, _index4.default)(date, dirtyOptions) - isoWeek;
  date.setUTCDate(date.getUTCDate() - diff * 7);
  return date;
}
module.exports = exports['default'];
},{"../../toDate/index.js":35,"../getUTCISOWeek/index.js":5}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setUTCISOWeekYear;

var _index = require('../../toDate/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../startOfUTCISOWeekYear/index.js');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_DAY = 86400000;

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function setUTCISOWeekYear(dirtyDate, dirtyISOYear, dirtyOptions) {
  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  var isoYear = Number(dirtyISOYear);
  var dateStartOfYear = (0, _index4.default)(date, dirtyOptions);
  var diff = Math.floor((date.getTime() - dateStartOfYear.getTime()) / MILLISECONDS_IN_DAY);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setUTCFullYear(isoYear, 0, 4);
  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
  date = (0, _index4.default)(fourthOfJanuary, dirtyOptions);
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}
module.exports = exports['default'];
},{"../../toDate/index.js":35,"../startOfUTCISOWeekYear/index.js":12}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfUTCISOWeek;

var _index = require('../../toDate/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function startOfUTCISOWeek(dirtyDate, dirtyOptions) {
  var weekStartsOn = 1;

  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
module.exports = exports['default'];
},{"../../toDate/index.js":35}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfUTCISOWeekYear;

var _index = require('../getUTCISOWeekYear/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../startOfUTCISOWeek/index.js');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function startOfUTCISOWeekYear(dirtyDate, dirtyOptions) {
  var year = (0, _index2.default)(dirtyDate, dirtyOptions);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setUTCFullYear(year, 0, 4);
  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
  var date = (0, _index4.default)(fourthOfJanuary, dirtyOptions);
  return date;
}
module.exports = exports['default'];
},{"../getUTCISOWeekYear/index.js":6,"../startOfUTCISOWeek/index.js":11}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addMilliseconds;

var _index = require('../toDate/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name addMilliseconds
 * @category Millisecond Helpers
 * @summary Add the specified number of milliseconds to the given date.
 *
 * @description
 * Add the specified number of milliseconds to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of milliseconds to be added
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Date} the new date with the milliseconds added
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
 * var result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:30.750
 */
function addMilliseconds(dirtyDate, dirtyAmount, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var timestamp = (0, _index2.default)(dirtyDate, dirtyOptions).getTime();
  var amount = Number(dirtyAmount);
  return new Date(timestamp + amount);
}
module.exports = exports['default'];
},{"../toDate/index.js":35}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addMinutes;

var _index = require('../addMilliseconds/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_MINUTE = 60000;

/**
 * @name addMinutes
 * @category Minute Helpers
 * @summary Add the specified number of minutes to the given date.
 *
 * @description
 * Add the specified number of minutes to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of minutes to be added
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Date} the new date with the minutes added
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Add 30 minutes to 10 July 2014 12:00:00:
 * var result = addMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 12:30:00
 */
function addMinutes(dirtyDate, dirtyAmount, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var amount = Number(dirtyAmount);
  return (0, _index2.default)(dirtyDate, amount * MILLISECONDS_IN_MINUTE, dirtyOptions);
}
module.exports = exports['default'];
},{"../addMilliseconds/index.js":13}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../_lib/getUTCDayOfYear/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../../_lib/getUTCISOWeek/index.js');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('../../../_lib/getUTCISOWeekYear/index.js');

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatters = {
  // Month: 1, 2, ..., 12
  'M': function M(date) {
    return date.getUTCMonth() + 1;
  },

  // Month: 1st, 2nd, ..., 12th
  'Mo': function Mo(date, options) {
    var month = date.getUTCMonth() + 1;
    return options.locale.localize.ordinalNumber(month, { unit: 'month' });
  },

  // Month: 01, 02, ..., 12
  'MM': function MM(date) {
    return addLeadingZeros(date.getUTCMonth() + 1, 2);
  },

  // Month: Jan, Feb, ..., Dec
  'MMM': function MMM(date, options) {
    return options.locale.localize.month(date.getUTCMonth(), { type: 'short' });
  },

  // Month: January, February, ..., December
  'MMMM': function MMMM(date, options) {
    return options.locale.localize.month(date.getUTCMonth(), { type: 'long' });
  },

  // Quarter: 1, 2, 3, 4
  'Q': function Q(date) {
    return Math.ceil((date.getUTCMonth() + 1) / 3);
  },

  // Quarter: 1st, 2nd, 3rd, 4th
  'Qo': function Qo(date, options) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    return options.locale.localize.ordinalNumber(quarter, { unit: 'quarter' });
  },

  // Day of month: 1, 2, ..., 31
  'D': function D(date) {
    return date.getUTCDate();
  },

  // Day of month: 1st, 2nd, ..., 31st
  'Do': function Do(date, options) {
    return options.locale.localize.ordinalNumber(date.getUTCDate(), { unit: 'dayOfMonth' });
  },

  // Day of month: 01, 02, ..., 31
  'DD': function DD(date) {
    return addLeadingZeros(date.getUTCDate(), 2);
  },

  // Day of year: 1, 2, ..., 366
  'DDD': function DDD(date) {
    return (0, _index2.default)(date);
  },

  // Day of year: 1st, 2nd, ..., 366th
  'DDDo': function DDDo(date, options) {
    return options.locale.localize.ordinalNumber((0, _index2.default)(date), { unit: 'dayOfYear' });
  },

  // Day of year: 001, 002, ..., 366
  'DDDD': function DDDD(date) {
    return addLeadingZeros((0, _index2.default)(date), 3);
  },

  // Day of week: Su, Mo, ..., Sa
  'dd': function dd(date, options) {
    return options.locale.localize.weekday(date.getUTCDay(), { type: 'narrow' });
  },

  // Day of week: Sun, Mon, ..., Sat
  'ddd': function ddd(date, options) {
    return options.locale.localize.weekday(date.getUTCDay(), { type: 'short' });
  },

  // Day of week: Sunday, Monday, ..., Saturday
  'dddd': function dddd(date, options) {
    return options.locale.localize.weekday(date.getUTCDay(), { type: 'long' });
  },

  // Day of week: 0, 1, ..., 6
  'd': function d(date) {
    return date.getUTCDay();
  },

  // Day of week: 0th, 1st, 2nd, ..., 6th
  'do': function _do(date, options) {
    return options.locale.localize.ordinalNumber(date.getUTCDay(), { unit: 'dayOfWeek' });
  },

  // Day of ISO week: 1, 2, ..., 7
  'E': function E(date) {
    return date.getUTCDay() || 7;
  },

  // ISO week: 1, 2, ..., 53
  'W': function W(date) {
    return (0, _index4.default)(date);
  },

  // ISO week: 1st, 2nd, ..., 53th
  'Wo': function Wo(date, options) {
    return options.locale.localize.ordinalNumber((0, _index4.default)(date), { unit: 'isoWeek' });
  },

  // ISO week: 01, 02, ..., 53
  'WW': function WW(date) {
    return addLeadingZeros((0, _index4.default)(date), 2);
  },

  // Year: 00, 01, ..., 99
  'YY': function YY(date) {
    return addLeadingZeros(date.getUTCFullYear(), 4).substr(2);
  },

  // Year: 1900, 1901, ..., 2099
  'YYYY': function YYYY(date) {
    return addLeadingZeros(date.getUTCFullYear(), 4);
  },

  // ISO week-numbering year: 00, 01, ..., 99
  'GG': function GG(date) {
    return String((0, _index6.default)(date)).substr(2);
  },

  // ISO week-numbering year: 1900, 1901, ..., 2099
  'GGGG': function GGGG(date) {
    return (0, _index6.default)(date);
  },

  // Hour: 0, 1, ... 23
  'H': function H(date) {
    return date.getUTCHours();
  },

  // Hour: 00, 01, ..., 23
  'HH': function HH(date) {
    return addLeadingZeros(date.getUTCHours(), 2);
  },

  // Hour: 1, 2, ..., 12
  'h': function h(date) {
    var hours = date.getUTCHours();
    if (hours === 0) {
      return 12;
    } else if (hours > 12) {
      return hours % 12;
    } else {
      return hours;
    }
  },

  // Hour: 01, 02, ..., 12
  'hh': function hh(date) {
    return addLeadingZeros(formatters['h'](date), 2);
  },

  // Minute: 0, 1, ..., 59
  'm': function m(date) {
    return date.getUTCMinutes();
  },

  // Minute: 00, 01, ..., 59
  'mm': function mm(date) {
    return addLeadingZeros(date.getUTCMinutes(), 2);
  },

  // Second: 0, 1, ..., 59
  's': function s(date) {
    return date.getUTCSeconds();
  },

  // Second: 00, 01, ..., 59
  'ss': function ss(date) {
    return addLeadingZeros(date.getUTCSeconds(), 2);
  },

  // 1/10 of second: 0, 1, ..., 9
  'S': function S(date) {
    return Math.floor(date.getUTCMilliseconds() / 100);
  },

  // 1/100 of second: 00, 01, ..., 99
  'SS': function SS(date) {
    return addLeadingZeros(Math.floor(date.getUTCMilliseconds() / 10), 2);
  },

  // Millisecond: 000, 001, ..., 999
  'SSS': function SSS(date) {
    return addLeadingZeros(date.getUTCMilliseconds(), 3);
  },

  // Timezone: -01:00, +00:00, ... +12:00
  'Z': function Z(date, options) {
    var originalDate = options._originalDate || date;
    return formatTimezone(originalDate.getTimezoneOffset(), ':');
  },

  // Timezone: -0100, +0000, ... +1200
  'ZZ': function ZZ(date, options) {
    var originalDate = options._originalDate || date;
    return formatTimezone(originalDate.getTimezoneOffset());
  },

  // Seconds timestamp: 512969520
  'X': function X(date, options) {
    var originalDate = options._originalDate || date;
    return Math.floor(originalDate.getTime() / 1000);
  },

  // Milliseconds timestamp: 512969520900
  'x': function x(date, options) {
    var originalDate = options._originalDate || date;
    return originalDate.getTime();
  },

  // AM, PM
  'A': function A(date, options) {
    return options.locale.localize.timeOfDay(date.getUTCHours(), { type: 'uppercase' });
  },

  // am, pm
  'a': function a(date, options) {
    return options.locale.localize.timeOfDay(date.getUTCHours(), { type: 'lowercase' });
  },

  // a.m., p.m.
  'aa': function aa(date, options) {
    return options.locale.localize.timeOfDay(date.getUTCHours(), { type: 'long' });
  }
};

function formatTimezone(offset, delimeter) {
  delimeter = delimeter || '';
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  return sign + addLeadingZeros(hours, 2) + delimeter + addLeadingZeros(minutes, 2);
}

function addLeadingZeros(number, targetLength) {
  var output = Math.abs(number).toString();
  while (output.length < targetLength) {
    output = '0' + output;
  }
  return output;
}

exports.default = formatters;
module.exports = exports['default'];
},{"../../../_lib/getUTCDayOfYear/index.js":4,"../../../_lib/getUTCISOWeek/index.js":5,"../../../_lib/getUTCISOWeekYear/index.js":6}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = format;

var _index = require('../toDate/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../isValid/index.js');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('../locale/en-US/index.js');

var _index6 = _interopRequireDefault(_index5);

var _index7 = require('./_lib/formatters/index.js');

var _index8 = _interopRequireDefault(_index7);

var _index9 = require('../_lib/cloneObject/index.js');

var _index10 = _interopRequireDefault(_index9);

var _index11 = require('../_lib/addUTCMinutes/index.js');

var _index12 = _interopRequireDefault(_index11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var longFormattingTokensRegExp = /(\[[^[]*])|(\\)?(LTS|LT|LLLL|LLL|LL|L|llll|lll|ll|l)/g;
var defaultFormattingTokensRegExp = /(\[[^[]*])|(\\)?(x|ss|s|mm|m|hh|h|do|dddd|ddd|dd|d|aa|a|ZZ|Z|YYYY|YY|X|Wo|WW|W|SSS|SS|S|Qo|Q|Mo|MMMM|MMM|MM|M|HH|H|GGGG|GG|E|Do|DDDo|DDDD|DDD|DD|D|A|.)/g;

/**
 * @name format
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format.
 *
 * Accepted tokens:
 * | Unit                    | Token | Result examples                  |
 * |-------------------------|-------|----------------------------------|
 * | Month                   | M     | 1, 2, ..., 12                    |
 * |                         | Mo    | 1st, 2nd, ..., 12th              |
 * |                         | MM    | 01, 02, ..., 12                  |
 * |                         | MMM   | Jan, Feb, ..., Dec               |
 * |                         | MMMM  | January, February, ..., December |
 * | Quarter                 | Q     | 1, 2, 3, 4                       |
 * |                         | Qo    | 1st, 2nd, 3rd, 4th               |
 * | Day of month            | D     | 1, 2, ..., 31                    |
 * |                         | Do    | 1st, 2nd, ..., 31st              |
 * |                         | DD    | 01, 02, ..., 31                  |
 * | Day of year             | DDD   | 1, 2, ..., 366                   |
 * |                         | DDDo  | 1st, 2nd, ..., 366th             |
 * |                         | DDDD  | 001, 002, ..., 366               |
 * | Day of week             | d     | 0, 1, ..., 6                     |
 * |                         | do    | 0th, 1st, ..., 6th               |
 * |                         | dd    | Su, Mo, ..., Sa                  |
 * |                         | ddd   | Sun, Mon, ..., Sat               |
 * |                         | dddd  | Sunday, Monday, ..., Saturday    |
 * | Day of ISO week         | E     | 1, 2, ..., 7                     |
 * | ISO week                | W     | 1, 2, ..., 53                    |
 * |                         | Wo    | 1st, 2nd, ..., 53rd              |
 * |                         | WW    | 01, 02, ..., 53                  |
 * | Year                    | YY    | 00, 01, ..., 99                  |
 * |                         | YYYY  | 1900, 1901, ..., 2099            |
 * | ISO week-numbering year | GG    | 00, 01, ..., 99                  |
 * |                         | GGGG  | 1900, 1901, ..., 2099            |
 * | AM/PM                   | A     | AM, PM                           |
 * |                         | a     | am, pm                           |
 * |                         | aa    | a.m., p.m.                       |
 * | Hour                    | H     | 0, 1, ... 23                     |
 * |                         | HH    | 00, 01, ... 23                   |
 * |                         | h     | 1, 2, ..., 12                    |
 * |                         | hh    | 01, 02, ..., 12                  |
 * | Minute                  | m     | 0, 1, ..., 59                    |
 * |                         | mm    | 00, 01, ..., 59                  |
 * | Second                  | s     | 0, 1, ..., 59                    |
 * |                         | ss    | 00, 01, ..., 59                  |
 * | 1/10 of second          | S     | 0, 1, ..., 9                     |
 * | 1/100 of second         | SS    | 00, 01, ..., 99                  |
 * | Millisecond             | SSS   | 000, 001, ..., 999               |
 * | Timezone                | Z     | -01:00, +00:00, ... +12:00       |
 * |                         | ZZ    | -0100, +0000, ..., +1200         |
 * | Seconds timestamp       | X     | 512969520                        |
 * | Milliseconds timestamp  | x     | 512969520900                     |
 * | Long format             | LT    | 05:30 a.m.                       |
 * |                         | LTS   | 05:30:15 a.m.                    |
 * |                         | L     | 07/02/1995                       |
 * |                         | l     | 7/2/1995                         |
 * |                         | LL    | July 2 1995                      |
 * |                         | ll    | Jul 2 1995                       |
 * |                         | LLL   | July 2 1995 05:30 a.m.           |
 * |                         | lll   | Jul 2 1995 05:30 a.m.            |
 * |                         | LLLL  | Sunday, July 2 1995 05:30 a.m.   |
 * |                         | llll  | Sun, Jul 2 1995 05:30 a.m.       |
 *
 * The characters wrapped in square brackets are escaped.
 *
 * The result may vary by locale.
 *
 * @param {Date|String|Number} date - the original date
 * @param {String} format - the string of tokens
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {String} the formatted date string
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 * @throws {RangeError} `options.locale` must contain `localize` property
 * @throws {RangeError} `options.locale` must contain `formatLong` property
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * var result = format(
 *   new Date(2014, 1, 11),
 *   'MM/DD/YYYY'
 * )
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * import { eoLocale } from 'date-fns/locale/eo'
 * var result = format(
 *   new Date(2014, 6, 2),
 *   'Do [de] MMMM YYYY',
 *   {locale: eoLocale}
 * )
 * //=> '2-a de julio 2014'
 */
function format(dirtyDate, dirtyFormatStr, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var formatStr = String(dirtyFormatStr);
  var options = dirtyOptions || {};

  var locale = options.locale || _index6.default;

  if (!locale.localize) {
    throw new RangeError('locale must contain localize property');
  }

  if (!locale.formatLong) {
    throw new RangeError('locale must contain formatLong property');
  }

  var localeFormatters = locale.formatters || {};
  var formattingTokensRegExp = locale.formattingTokensRegExp || defaultFormattingTokensRegExp;
  var formatLong = locale.formatLong;

  var originalDate = (0, _index2.default)(dirtyDate, options);

  if (!(0, _index4.default)(originalDate, options)) {
    return 'Invalid Date';
  }

  // Convert the date in system timezone to the same date in UTC+00:00 timezone.
  // This ensures that when UTC functions will be implemented, locales will be compatible with them.
  // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376
  var timezoneOffset = originalDate.getTimezoneOffset();
  var utcDate = (0, _index12.default)(originalDate, -timezoneOffset, options);

  var formatterOptions = (0, _index10.default)(options);
  formatterOptions.locale = locale;
  formatterOptions.formatters = _index8.default;

  // When UTC functions will be implemented, options._originalDate will likely be a part of public API.
  // Right now, please don't use it in locales. If you have to use an original date,
  // please restore it from `date`, adding a timezone offset to it.
  formatterOptions._originalDate = originalDate;

  var result = formatStr.replace(longFormattingTokensRegExp, function (substring) {
    if (substring[0] === '[') {
      return substring;
    }

    if (substring[0] === '\\') {
      return cleanEscapedString(substring);
    }

    return formatLong(substring);
  }).replace(formattingTokensRegExp, function (substring) {
    var formatter = localeFormatters[substring] || _index8.default[substring];

    if (formatter) {
      return formatter(utcDate, formatterOptions);
    } else {
      return cleanEscapedString(substring);
    }
  });

  return result;
}

function cleanEscapedString(input) {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|]$/g, '');
  }
  return input.replace(/\\/g, '');
}
module.exports = exports['default'];
},{"../_lib/addUTCMinutes/index.js":2,"../_lib/cloneObject/index.js":3,"../isValid/index.js":17,"../locale/en-US/index.js":30,"../toDate/index.js":35,"./_lib/formatters/index.js":15}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isValid;

var _index = require('../toDate/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isValid
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @param {*} date - the date to check
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Boolean} the date is valid
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // For the valid date:
 * var result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the value, convertable into a date:
 * var result = isValid('2014-02-31')
 * //=> true
 *
 * @example
 * // For the invalid date:
 * var result = isValid(new Date(''))
 * //=> false
 */
function isValid(dirtyDate, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
  }

  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  return !isNaN(date);
}
module.exports = exports['default'];
},{"../toDate/index.js":35}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildFormatLongFn;
var tokensToBeShortedPattern = /MMMM|MM|DD|dddd/g;

function buildShortLongFormat(format) {
  return format.replace(tokensToBeShortedPattern, function (token) {
    return token.slice(1);
  });
}

/**
 * @name buildFormatLongFn
 * @category Locale Helpers
 * @summary Build `formatLong` property for locale used by `format`, `formatRelative` and `parse` functions.
 *
 * @description
 * Build `formatLong` property for locale used by `format`, `formatRelative` and `parse` functions.
 * Returns a function which takes one of the following tokens as the argument:
 * `'LTS'`, `'LT'`, `'L'`, `'LL'`, `'LLL'`, `'l'`, `'ll'`, `'lll'`, `'llll'`
 * and returns a long format string written as `format` token strings.
 * See [format]{@link https://date-fns.org/docs/format}
 *
 * `'l'`, `'ll'`, `'lll'` and `'llll'` formats are built automatically
 * by shortening some of the tokens from corresponding unshortened formats
 * (e.g., if `LL` is `'MMMM DD YYYY'` then `ll` will be `MMM D YYYY`)
 *
 * @param {Object} obj - the object with long formats written as `format` token strings
 * @param {String} obj.LT - time format: hours and minutes
 * @param {String} obj.LTS - time format: hours, minutes and seconds
 * @param {String} obj.L - short date format: numeric day, month and year
 * @param {String} [obj.l] - short date format: numeric day, month and year (shortened)
 * @param {String} obj.LL - long date format: day, month in words, and year
 * @param {String} [obj.ll] - long date format: day, month in words, and year (shortened)
 * @param {String} obj.LLL - long date and time format
 * @param {String} [obj.lll] - long date and time format (shortened)
 * @param {String} obj.LLLL - long date, time and weekday format
 * @param {String} [obj.llll] - long date, time and weekday format (shortened)
 * @returns {Function} `formatLong` property of the locale
 *
 * @example
 * // For `en-US` locale:
 * locale.formatLong = buildFormatLongFn({
 *   LT: 'h:mm aa',
 *   LTS: 'h:mm:ss aa',
 *   L: 'MM/DD/YYYY',
 *   LL: 'MMMM D YYYY',
 *   LLL: 'MMMM D YYYY h:mm aa',
 *   LLLL: 'dddd, MMMM D YYYY h:mm aa'
 * })
 */
function buildFormatLongFn(obj) {
  var formatLongLocale = {
    LTS: obj.LTS,
    LT: obj.LT,
    L: obj.L,
    LL: obj.LL,
    LLL: obj.LLL,
    LLLL: obj.LLLL,
    l: obj.l || buildShortLongFormat(obj.L),
    ll: obj.ll || buildShortLongFormat(obj.LL),
    lll: obj.lll || buildShortLongFormat(obj.LLL),
    llll: obj.llll || buildShortLongFormat(obj.LLLL)
  };

  return function (token) {
    return formatLongLocale[token];
  };
}
module.exports = exports["default"];
},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildLocalizeArrayFn;
/**
 * @name buildLocalizeArrayFn
 * @category Locale Helpers
 * @summary Build `localize.weekdays`, `localize.months` and `localize.timesOfDay` properties for the locale.
 *
 * @description
 * Build `localize.weekdays`, `localize.months` and `localize.timesOfDay` properties for the locale.
 * If no `type` is supplied to the options of the resulting function, `defaultType` will be used (see example).
 *
 * @param {Object} values - the object with arrays of values
 * @param {String} defaultType - the default type for the localize function
 * @returns {Function} the resulting function
 *
 * @example
 * var weekdayValues = {
 *   narrow: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
 *   short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
 *   long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
 * }
 * locale.localize.weekdays = buildLocalizeArrayFn(weekdayValues, 'long')
 * locale.localize.weekdays({type: 'narrow'}) //=> ['Su', 'Mo', ...]
 * locale.localize.weekdays() //=> ['Sunday', 'Monday', ...]
 */
function buildLocalizeArrayFn(values, defaultType) {
  return function (dirtyOptions) {
    var options = dirtyOptions || {};
    var type = options.type ? String(options.type) : defaultType;
    return values[type] || values[defaultType];
  };
}
module.exports = exports["default"];
},{}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildLocalizeFn;
/**
 * @name buildLocalizeFn
 * @category Locale Helpers
 * @summary Build `localize.weekday`, `localize.month` and `localize.timeOfDay` properties for the locale.
 *
 * @description
 * Build `localize.weekday`, `localize.month` and `localize.timeOfDay` properties for the locale
 * used by `format` function.
 * If no `type` is supplied to the options of the resulting function, `defaultType` will be used (see example).
 *
 * `localize.weekday` function takes the weekday index as argument (0 - Sunday).
 * `localize.month` takes the month index (0 - January).
 * `localize.timeOfDay` takes the hours. Use `indexCallback` to convert them to an array index (see example).
 *
 * @param {Object} values - the object with arrays of values
 * @param {String} defaultType - the default type for the localize function
 * @param {Function} [indexCallback] - the callback which takes the resulting function argument
 *   and converts it into value array index
 * @returns {Function} the resulting function
 *
 * @example
 * var timeOfDayValues = {
 *   uppercase: ['AM', 'PM'],
 *   lowercase: ['am', 'pm'],
 *   long: ['a.m.', 'p.m.']
 * }
 * locale.localize.timeOfDay = buildLocalizeFn(timeOfDayValues, 'long', function (hours) {
 *   // 0 is a.m. array index, 1 is p.m. array index
 *   return (hours / 12) >= 1 ? 1 : 0
 * })
 * locale.localize.timeOfDay(16, {type: 'uppercase'}) //=> 'PM'
 * locale.localize.timeOfDay(5) //=> 'a.m.'
 */
function buildLocalizeFn(values, defaultType, indexCallback) {
  return function (dirtyIndex, dirtyOptions) {
    var options = dirtyOptions || {};
    var type = options.type ? String(options.type) : defaultType;
    var valuesArray = values[type] || values[defaultType];
    var index = indexCallback ? indexCallback(Number(dirtyIndex)) : Number(dirtyIndex);
    return valuesArray[index];
  };
}
module.exports = exports["default"];
},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMatchFn;
/**
 * @name buildMatchFn
 * @category Locale Helpers
 * @summary Build `match.weekdays`, `match.months` and `match.timesOfDay` properties for the locale.
 *
 * @description
 * Build `match.weekdays`, `match.months` and `match.timesOfDay` properties for the locale used by `parse` function.
 * If no `type` is supplied to the options of the resulting function, `defaultType` will be used (see example).
 * The result of the match function will be passed into corresponding parser function
 * (`match.weekday`, `match.month` or `match.timeOfDay` respectively. See `buildParseFn`).
 *
 * @param {Object} values - the object with RegExps
 * @param {String} defaultType - the default type for the match function
 * @returns {Function} the resulting function
 *
 * @example
 * var matchWeekdaysPatterns = {
 *   narrow: /^(su|mo|tu|we|th|fr|sa)/i,
 *   short: /^(sun|mon|tue|wed|thu|fri|sat)/i,
 *   long: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
 * }
 * locale.match.weekdays = buildMatchFn(matchWeekdaysPatterns, 'long')
 * locale.match.weekdays('Sunday', {type: 'narrow'}) //=> ['Su', 'Su', ...]
 * locale.match.weekdays('Sunday') //=> ['Sunday', 'Sunday', ...]
 */
function buildMatchFn(patterns, defaultType) {
  return function (dirtyString, dirtyOptions) {
    var options = dirtyOptions || {};
    var type = options.type ? String(options.type) : defaultType;
    var pattern = patterns[type] || patterns[defaultType];
    var string = String(dirtyString);
    return string.match(pattern);
  };
}
module.exports = exports["default"];
},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMatchPatternFn;
/**
 * @name buildMatchPatternFn
 * @category Locale Helpers
 * @summary Build match function from a single RegExp.
 *
 * @description
 * Build match function from a single RegExp.
 * Usually used for building `match.ordinalNumbers` property of the locale.
 *
 * @param {Object} pattern - the RegExp
 * @returns {Function} the resulting function
 *
 * @example
 * locale.match.ordinalNumbers = buildMatchPatternFn(/^(\d+)(th|st|nd|rd)?/i)
 * locale.match.ordinalNumbers('3rd') //=> ['3rd', '3', 'rd', ...]
 */
function buildMatchPatternFn(pattern) {
  return function (dirtyString) {
    var string = String(dirtyString);
    return string.match(pattern);
  };
}
module.exports = exports["default"];
},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildParseFn;
/**
 * @name buildParseFn
 * @category Locale Helpers
 * @summary Build `match.weekday`, `match.month` and `match.timeOfDay` properties for the locale.
 *
 * @description
 * Build `match.weekday`, `match.month` and `match.timeOfDay` properties for the locale used by `parse` function.
 * The argument of the resulting function is the result of the corresponding match function
 * (`match.weekdays`, `match.months` or `match.timesOfDay` respectively. See `buildMatchFn`).
 *
 * @param {Object} values - the object with arrays of RegExps
 * @param {String} defaultType - the default type for the parser function
 * @returns {Function} the resulting function
 *
 * @example
 * var parseWeekdayPatterns = {
 *   any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
 * }
 * locale.match.weekday = buildParseFn(matchWeekdaysPatterns, 'long')
 * var matchResult = locale.match.weekdays('Friday')
 * locale.match.weekday(matchResult) //=> 5
 */
function buildParseFn(patterns, defaultType) {
  return function (matchResult, dirtyOptions) {
    var options = dirtyOptions || {};
    var type = options.type ? String(options.type) : defaultType;
    var patternsArray = patterns[type] || patterns[defaultType];
    var string = matchResult[1];

    return patternsArray.findIndex(function (pattern) {
      return pattern.test(string);
    });
  };
}
module.exports = exports["default"];
},{}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseDecimal;
/**
 * @name parseDecimal
 * @category Locale Helpers
 * @summary Parses the match result into decimal number.
 *
 * @description
 * Parses the match result into decimal number.
 * Uses the string matched with the first set of parentheses of match RegExp.
 *
 * @param {Array} matchResult - the object returned by matching function
 * @returns {Number} the parsed value
 *
 * @example
 * locale.match = {
 *   ordinalNumbers: (dirtyString) {
 *     return String(dirtyString).match(/^(\d+)(th|st|nd|rd)?/i)
 *   },
 *   ordinalNumber: parseDecimal
 * }
 */
function parseDecimal(matchResult) {
  return parseInt(matchResult[1], 10);
}
module.exports = exports["default"];
},{}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatDistance;
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'less than a second',
    other: 'less than {{count}} seconds'
  },

  xSeconds: {
    one: '1 second',
    other: '{{count}} seconds'
  },

  halfAMinute: 'half a minute',

  lessThanXMinutes: {
    one: 'less than a minute',
    other: 'less than {{count}} minutes'
  },

  xMinutes: {
    one: '1 minute',
    other: '{{count}} minutes'
  },

  aboutXHours: {
    one: 'about 1 hour',
    other: 'about {{count}} hours'
  },

  xHours: {
    one: '1 hour',
    other: '{{count}} hours'
  },

  xDays: {
    one: '1 day',
    other: '{{count}} days'
  },

  aboutXMonths: {
    one: 'about 1 month',
    other: 'about {{count}} months'
  },

  xMonths: {
    one: '1 month',
    other: '{{count}} months'
  },

  aboutXYears: {
    one: 'about 1 year',
    other: 'about {{count}} years'
  },

  xYears: {
    one: '1 year',
    other: '{{count}} years'
  },

  overXYears: {
    one: 'over 1 year',
    other: 'over {{count}} years'
  },

  almostXYears: {
    one: 'almost 1 year',
    other: 'almost {{count}} years'
  }
};

function formatDistance(token, count, options) {
  options = options || {};

  var result;
  if (typeof formatDistanceLocale[token] === 'string') {
    result = formatDistanceLocale[token];
  } else if (count === 1) {
    result = formatDistanceLocale[token].one;
  } else {
    result = formatDistanceLocale[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'in ' + result;
    } else {
      return result + ' ago';
    }
  }

  return result;
}
module.exports = exports['default'];
},{}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../_lib/buildFormatLongFn/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatLong = (0, _index2.default)({
  LT: 'h:mm aa',
  LTS: 'h:mm:ss aa',
  L: 'MM/DD/YYYY',
  LL: 'MMMM D YYYY',
  LLL: 'MMMM D YYYY h:mm aa',
  LLLL: 'dddd, MMMM D YYYY h:mm aa'
});

exports.default = formatLong;
module.exports = exports['default'];
},{"../../../_lib/buildFormatLongFn/index.js":18}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatRelative;
var formatRelativeLocale = {
  lastWeek: '[last] dddd [at] LT',
  yesterday: '[yesterday at] LT',
  today: '[today at] LT',
  tomorrow: '[tomorrow at] LT',
  nextWeek: 'dddd [at] LT',
  other: 'L'
};

function formatRelative(token, date, baseDate, options) {
  return formatRelativeLocale[token];
}
module.exports = exports['default'];
},{}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../_lib/buildLocalizeFn/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../../_lib/buildLocalizeArrayFn/index.js');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.
var weekdayValues = {
  narrow: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};

var monthValues = {
  short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  long: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};

// `timeOfDay` is used to designate which part of the day it is, when used with 12-hour clock.
// Use the system which is used the most commonly in the locale.
// For example, if the country doesn't use a.m./p.m., you can use `night`/`morning`/`afternoon`/`evening`:
//
//   var timeOfDayValues = {
//     any: ['in the night', 'in the morning', 'in the afternoon', 'in the evening']
//   }
//
// And later:
//
//   var localize = {
//     // The callback takes the hours as the argument and returns the array index
//     timeOfDay: buildLocalizeFn(timeOfDayValues, 'any', function (hours) {
//       if (hours >= 17) {
//         return 3
//       } else if (hours >= 12) {
//         return 2
//       } else if (hours >= 4) {
//         return 1
//       } else {
//         return 0
//       }
//     }),
//     timesOfDay: buildLocalizeArrayFn(timeOfDayValues, 'any')
//   }
var timeOfDayValues = {
  uppercase: ['AM', 'PM'],
  lowercase: ['am', 'pm'],
  long: ['a.m.', 'p.m.']
};

function ordinalNumber(dirtyNumber, dirtyOptions) {
  var number = Number(dirtyNumber);

  // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`:
  //
  //   var options = dirtyOptions || {}
  //   var unit = String(options.unit)
  //
  // where `unit` can be 'month', 'quarter', 'week', 'isoWeek', 'dayOfYear',
  // 'dayOfMonth' or 'dayOfWeek'

  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st';
      case 2:
        return number + 'nd';
      case 3:
        return number + 'rd';
    }
  }
  return number + 'th';
}

var localize = {
  ordinalNumber: ordinalNumber,
  weekday: (0, _index2.default)(weekdayValues, 'long'),
  weekdays: (0, _index4.default)(weekdayValues, 'long'),
  month: (0, _index2.default)(monthValues, 'long'),
  months: (0, _index4.default)(monthValues, 'long'),
  timeOfDay: (0, _index2.default)(timeOfDayValues, 'long', function (hours) {
    return hours / 12 >= 1 ? 1 : 0;
  }),
  timesOfDay: (0, _index4.default)(timeOfDayValues, 'long')
};

exports.default = localize;
module.exports = exports['default'];
},{"../../../_lib/buildLocalizeArrayFn/index.js":19,"../../../_lib/buildLocalizeFn/index.js":20}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../_lib/buildMatchFn/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../../_lib/buildParseFn/index.js');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('../../../_lib/buildMatchPatternFn/index.js');

var _index6 = _interopRequireDefault(_index5);

var _index7 = require('../../../_lib/parseDecimal/index.js');

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchOrdinalNumbersPattern = /^(\d+)(th|st|nd|rd)?/i;

var matchWeekdaysPatterns = {
  narrow: /^(su|mo|tu|we|th|fr|sa)/i,
  short: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  long: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};

var parseWeekdayPatterns = {
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};

var matchMonthsPatterns = {
  short: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  long: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};

var parseMonthPatterns = {
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};

// `timeOfDay` is used to designate which part of the day it is, when used with 12-hour clock.
// Use the system which is used the most commonly in the locale.
// For example, if the country doesn't use a.m./p.m., you can use `night`/`morning`/`afternoon`/`evening`:
//
//   var matchTimesOfDayPatterns = {
//     long: /^((in the)? (night|morning|afternoon|evening?))/i
//   }
//
//   var parseTimeOfDayPatterns = {
//     any: [/(night|morning)/i, /(afternoon|evening)/i]
//   }
var matchTimesOfDayPatterns = {
  short: /^(am|pm)/i,
  long: /^([ap]\.?\s?m\.?)/i
};

var parseTimeOfDayPatterns = {
  any: [/^a/i, /^p/i]
};

var match = {
  ordinalNumbers: (0, _index6.default)(matchOrdinalNumbersPattern),
  ordinalNumber: _index8.default,
  weekdays: (0, _index2.default)(matchWeekdaysPatterns, 'long'),
  weekday: (0, _index4.default)(parseWeekdayPatterns, 'any'),
  months: (0, _index2.default)(matchMonthsPatterns, 'long'),
  month: (0, _index4.default)(parseMonthPatterns, 'any'),
  timesOfDay: (0, _index2.default)(matchTimesOfDayPatterns, 'long'),
  timeOfDay: (0, _index4.default)(parseTimeOfDayPatterns, 'any')
};

exports.default = match;
module.exports = exports['default'];
},{"../../../_lib/buildMatchFn/index.js":21,"../../../_lib/buildMatchPatternFn/index.js":22,"../../../_lib/buildParseFn/index.js":23,"../../../_lib/parseDecimal/index.js":24}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./_lib/formatDistance/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./_lib/formatLong/index.js');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('./_lib/formatRelative/index.js');

var _index6 = _interopRequireDefault(_index5);

var _index7 = require('./_lib/localize/index.js');

var _index8 = _interopRequireDefault(_index7);

var _index9 = require('./_lib/match/index.js');

var _index10 = _interopRequireDefault(_index9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 */
var locale = {
  formatDistance: _index2.default,
  formatLong: _index4.default,
  formatRelative: _index6.default,
  localize: _index8.default,
  match: _index10.default,
  options: {
    weekStartsOn: 0 /* Sunday */
    , firstWeekContainsDate: 1
  }
};

exports.default = locale;
module.exports = exports['default'];
},{"./_lib/formatDistance/index.js":25,"./_lib/formatLong/index.js":26,"./_lib/formatRelative/index.js":27,"./_lib/localize/index.js":28,"./_lib/match/index.js":29}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var patterns = {
  'M': /^(1[0-2]|0?\d)/, // 0 to 12
  'D': /^(3[0-1]|[0-2]?\d)/, // 0 to 31
  'DDD': /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/, // 0 to 366
  'W': /^(5[0-3]|[0-4]?\d)/, // 0 to 53
  'YYYY': /^(\d{1,4})/, // 0 to 9999
  'H': /^(2[0-3]|[0-1]?\d)/, // 0 to 23
  'm': /^([0-5]?\d)/, // 0 to 59
  'Z': /^([+-])(\d{2}):(\d{2})/,
  'ZZ': /^([+-])(\d{2})(\d{2})/,
  singleDigit: /^(\d)/,
  twoDigits: /^(\d{2})/,
  threeDigits: /^(\d{3})/,
  fourDigits: /^(\d{4})/,
  anyDigits: /^(\d+)/
};

function parseDecimal(matchResult) {
  return parseInt(matchResult[1], 10);
}

var parsers = {
  // Year: 00, 01, ..., 99
  'YY': {
    unit: 'twoDigitYear',
    match: patterns.twoDigits,
    parse: function parse(matchResult) {
      return parseDecimal(matchResult);
    }
  },

  // Year: 1900, 1901, ..., 2099
  'YYYY': {
    unit: 'year',
    match: patterns.YYYY,
    parse: parseDecimal
  },

  // ISO week-numbering year: 00, 01, ..., 99
  'GG': {
    unit: 'isoYear',
    match: patterns.twoDigits,
    parse: function parse(matchResult) {
      return parseDecimal(matchResult) + 1900;
    }
  },

  // ISO week-numbering year: 1900, 1901, ..., 2099
  'GGGG': {
    unit: 'isoYear',
    match: patterns.YYYY,
    parse: parseDecimal
  },

  // Quarter: 1, 2, 3, 4
  'Q': {
    unit: 'quarter',
    match: patterns.singleDigit,
    parse: parseDecimal
  },

  // Ordinal quarter
  'Qo': {
    unit: 'quarter',
    match: function match(string, options) {
      return options.locale.match.ordinalNumbers(string, { unit: 'quarter' });
    },
    parse: function parse(matchResult, options) {
      return options.locale.match.ordinalNumber(matchResult, { unit: 'quarter' });
    }
  },

  // Month: 1, 2, ..., 12
  'M': {
    unit: 'month',
    match: patterns.M,
    parse: function parse(matchResult) {
      return parseDecimal(matchResult) - 1;
    }
  },

  // Ordinal month
  'Mo': {
    unit: 'month',
    match: function match(string, options) {
      return options.locale.match.ordinalNumbers(string, { unit: 'month' });
    },
    parse: function parse(matchResult, options) {
      return options.locale.match.ordinalNumber(matchResult, { unit: 'month' }) - 1;
    }
  },

  // Month: 01, 02, ..., 12
  'MM': {
    unit: 'month',
    match: patterns.twoDigits,
    parse: function parse(matchResult) {
      return parseDecimal(matchResult) - 1;
    }
  },

  // Month: Jan, Feb, ..., Dec
  'MMM': {
    unit: 'month',
    match: function match(string, options) {
      return options.locale.match.months(string, { type: 'short' });
    },
    parse: function parse(matchResult, options) {
      return options.locale.match.month(matchResult, { type: 'short' });
    }
  },

  // Month: January, February, ..., December
  'MMMM': {
    unit: 'month',
    match: function match(string, options) {
      return options.locale.match.months(string, { type: 'long' }) || options.locale.match.months(string, { type: 'short' });
    },
    parse: function parse(matchResult, options) {
      var parseResult = options.locale.match.month(matchResult, { type: 'long' });

      if (parseResult == null) {
        parseResult = options.locale.match.month(matchResult, { type: 'short' });
      }

      return parseResult;
    }
  },

  // ISO week: 1, 2, ..., 53
  'W': {
    unit: 'isoWeek',
    match: patterns.W,
    parse: parseDecimal
  },

  // Ordinal ISO week
  'Wo': {
    unit: 'isoWeek',
    match: function match(string, options) {
      return options.locale.match.ordinalNumbers(string, { unit: 'isoWeek' });
    },
    parse: function parse(matchResult, options) {
      return options.locale.match.ordinalNumber(matchResult, { unit: 'isoWeek' });
    }
  },

  // ISO week: 01, 02, ..., 53
  'WW': {
    unit: 'isoWeek',
    match: patterns.twoDigits,
    parse: parseDecimal
  },

  // Day of week: 0, 1, ..., 6
  'd': {
    unit: 'dayOfWeek',
    match: patterns.singleDigit,
    parse: parseDecimal
  },

  // Ordinal day of week
  'do': {
    unit: 'dayOfWeek',
    match: function match(string, options) {
      return options.locale.match.ordinalNumbers(string, { unit: 'dayOfWeek' });
    },
    parse: function parse(matchResult, options) {
      return options.locale.match.ordinalNumber(matchResult, { unit: 'dayOfWeek' });
    }
  },

  // Day of week: Su, Mo, ..., Sa
  'dd': {
    unit: 'dayOfWeek',
    match: function match(string, options) {
      return options.locale.match.weekdays(string, { type: 'narrow' });
    },
    parse: function parse(matchResult, options) {
      return options.locale.match.weekday(matchResult, { type: 'narrow' });
    }
  },

  // Day of week: Sun, Mon, ..., Sat
  'ddd': {
    unit: 'dayOfWeek',
    match: function match(string, options) {
      return options.locale.match.weekdays(string, { type: 'short' }) || options.locale.match.weekdays(string, { type: 'narrow' });
    },
    parse: function parse(matchResult, options) {
      var parseResult = options.locale.match.weekday(matchResult, { type: 'short' });

      if (parseResult == null) {
        parseResult = options.locale.match.weekday(matchResult, { type: 'narrow' });
      }

      return parseResult;
    }
  },

  // Day of week: Sunday, Monday, ..., Saturday
  'dddd': {
    unit: 'dayOfWeek',
    match: function match(string, options) {
      return options.locale.match.weekdays(string, { type: 'long' }) || options.locale.match.weekdays(string, { type: 'short' }) || options.locale.match.weekdays(string, { type: 'narrow' });
    },
    parse: function parse(matchResult, options) {
      var parseResult = options.locale.match.weekday(matchResult, { type: 'long' });

      if (parseResult == null) {
        parseResult = options.locale.match.weekday(matchResult, { type: 'short' });

        if (parseResult == null) {
          parseResult = options.locale.match.weekday(matchResult, { type: 'narrow' });
        }
      }

      return parseResult;
    }
  },

  // Day of ISO week: 1, 2, ..., 7
  'E': {
    unit: 'dayOfISOWeek',
    match: patterns.singleDigit,
    parse: function parse(matchResult) {
      return parseDecimal(matchResult);
    }
  },

  // Day of month: 1, 2, ..., 31
  'D': {
    unit: 'dayOfMonth',
    match: patterns.D,
    parse: parseDecimal
  },

  // Ordinal day of month
  'Do': {
    unit: 'dayOfMonth',
    match: function match(string, options) {
      return options.locale.match.ordinalNumbers(string, { unit: 'dayOfMonth' });
    },
    parse: function parse(matchResult, options) {
      return options.locale.match.ordinalNumber(matchResult, { unit: 'dayOfMonth' });
    }
  },

  // Day of month: 01, 02, ..., 31
  'DD': {
    unit: 'dayOfMonth',
    match: patterns.twoDigits,
    parse: parseDecimal
  },

  // Day of year: 1, 2, ..., 366
  'DDD': {
    unit: 'dayOfYear',
    match: patterns.DDD,
    parse: parseDecimal
  },

  // Ordinal day of year
  'DDDo': {
    unit: 'dayOfYear',
    match: function match(string, options) {
      return options.locale.match.ordinalNumbers(string, { unit: 'dayOfYear' });
    },
    parse: function parse(matchResult, options) {
      return options.locale.match.ordinalNumber(matchResult, { unit: 'dayOfYear' });
    }
  },

  // Day of year: 001, 002, ..., 366
  'DDDD': {
    unit: 'dayOfYear',
    match: patterns.threeDigits,
    parse: parseDecimal
  },

  // AM, PM
  'A': {
    unit: 'timeOfDay',
    match: function match(string, options) {
      return options.locale.match.timesOfDay(string, { type: 'short' });
    },
    parse: function parse(matchResult, options) {
      return options.locale.match.timeOfDay(matchResult, { type: 'short' });
    }
  },

  // a.m., p.m.
  'aa': {
    unit: 'timeOfDay',
    match: function match(string, options) {
      return options.locale.match.timesOfDay(string, { type: 'long' }) || options.locale.match.timesOfDay(string, { type: 'short' });
    },
    parse: function parse(matchResult, options) {
      var parseResult = options.locale.match.timeOfDay(matchResult, { type: 'long' });

      if (parseResult == null) {
        parseResult = options.locale.match.timeOfDay(matchResult, { type: 'short' });
      }

      return parseResult;
    }
  },

  // Hour: 0, 1, ... 23
  'H': {
    unit: 'hours',
    match: patterns.H,
    parse: parseDecimal
  },

  // Hour: 00, 01, ..., 23
  'HH': {
    unit: 'hours',
    match: patterns.twoDigits,
    parse: parseDecimal
  },

  // Hour: 1, 2, ..., 12
  'h': {
    unit: 'timeOfDayHours',
    match: patterns.M,
    parse: parseDecimal
  },

  // Hour: 01, 02, ..., 12
  'hh': {
    unit: 'timeOfDayHours',
    match: patterns.twoDigits,
    parse: parseDecimal
  },

  // Minute: 0, 1, ..., 59
  'm': {
    unit: 'minutes',
    match: patterns.m,
    parse: parseDecimal
  },

  // Minute: 00, 01, ..., 59
  'mm': {
    unit: 'minutes',
    match: patterns.twoDigits,
    parse: parseDecimal
  },

  // Second: 0, 1, ..., 59
  's': {
    unit: 'seconds',
    match: patterns.m,
    parse: parseDecimal
  },

  // Second: 00, 01, ..., 59
  'ss': {
    unit: 'seconds',
    match: patterns.twoDigits,
    parse: parseDecimal
  },

  // 1/10 of second: 0, 1, ..., 9
  'S': {
    unit: 'milliseconds',
    match: patterns.singleDigit,
    parse: function parse(matchResult) {
      return parseDecimal(matchResult) * 100;
    }
  },

  // 1/100 of second: 00, 01, ..., 99
  'SS': {
    unit: 'milliseconds',
    match: patterns.twoDigits,
    parse: function parse(matchResult) {
      return parseDecimal(matchResult) * 10;
    }
  },

  // Millisecond: 000, 001, ..., 999
  'SSS': {
    unit: 'milliseconds',
    match: patterns.threeDigits,
    parse: parseDecimal
  },

  // Timezone: -01:00, +00:00, ... +12:00
  'Z': {
    unit: 'timezone',
    match: patterns.Z,
    parse: function parse(matchResult) {
      var sign = matchResult[1];
      var hours = parseInt(matchResult[2], 10);
      var minutes = parseInt(matchResult[3], 10);
      var absoluteOffset = hours * 60 + minutes;
      return sign === '+' ? absoluteOffset : -absoluteOffset;
    }
  },

  // Timezone: -0100, +0000, ... +1200
  'ZZ': {
    unit: 'timezone',
    match: patterns.ZZ,
    parse: function parse(matchResult) {
      var sign = matchResult[1];
      var hours = parseInt(matchResult[2], 10);
      var minutes = parseInt(matchResult[3], 10);
      var absoluteOffset = hours * 60 + minutes;
      return sign === '+' ? absoluteOffset : -absoluteOffset;
    }
  },

  // Seconds timestamp: 512969520
  'X': {
    unit: 'timestamp',
    match: patterns.anyDigits,
    parse: function parse(matchResult) {
      return parseDecimal(matchResult) * 1000;
    }
  },

  // Milliseconds timestamp: 512969520900
  'x': {
    unit: 'timestamp',
    match: patterns.anyDigits,
    parse: parseDecimal
  }
};

parsers['a'] = parsers['A'];

exports.default = parsers;
module.exports = exports['default'];
},{}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../_lib/setUTCDay/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../../_lib/setUTCISODay/index.js');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('../../../_lib/setUTCISOWeek/index.js');

var _index6 = _interopRequireDefault(_index5);

var _index7 = require('../../../_lib/setUTCISOWeekYear/index.js');

var _index8 = _interopRequireDefault(_index7);

var _index9 = require('../../../_lib/startOfUTCISOWeek/index.js');

var _index10 = _interopRequireDefault(_index9);

var _index11 = require('../../../_lib/startOfUTCISOWeekYear/index.js');

var _index12 = _interopRequireDefault(_index11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_MINUTE = 60000;

function setTimeOfDay(hours, timeOfDay) {
  var isAM = timeOfDay === 0;

  if (isAM) {
    if (hours === 12) {
      return 0;
    }
  } else {
    if (hours !== 12) {
      return 12 + hours;
    }
  }

  return hours;
}

var units = {
  twoDigitYear: {
    priority: 10,
    set: function set(dateValues, value) {
      var century = Math.floor(dateValues.date.getUTCFullYear() / 100);
      var year = century * 100 + value;
      dateValues.date.setUTCFullYear(year, 0, 1);
      dateValues.date.setUTCHours(0, 0, 0, 0);
      return dateValues;
    }
  },

  year: {
    priority: 10,
    set: function set(dateValues, value) {
      dateValues.date.setUTCFullYear(value, 0, 1);
      dateValues.date.setUTCHours(0, 0, 0, 0);
      return dateValues;
    }
  },

  isoYear: {
    priority: 10,
    set: function set(dateValues, value, options) {
      dateValues.date = (0, _index12.default)((0, _index8.default)(dateValues.date, value, options), options);
      return dateValues;
    }
  },

  quarter: {
    priority: 20,
    set: function set(dateValues, value) {
      dateValues.date.setUTCMonth((value - 1) * 3, 1);
      dateValues.date.setUTCHours(0, 0, 0, 0);
      return dateValues;
    }
  },

  month: {
    priority: 30,
    set: function set(dateValues, value) {
      dateValues.date.setUTCMonth(value, 1);
      dateValues.date.setUTCHours(0, 0, 0, 0);
      return dateValues;
    }
  },

  isoWeek: {
    priority: 40,
    set: function set(dateValues, value, options) {
      dateValues.date = (0, _index10.default)((0, _index6.default)(dateValues.date, value, options), options);
      return dateValues;
    }
  },

  dayOfWeek: {
    priority: 50,
    set: function set(dateValues, value, options) {
      dateValues.date = (0, _index2.default)(dateValues.date, value, options);
      dateValues.date.setUTCHours(0, 0, 0, 0);
      return dateValues;
    }
  },

  dayOfISOWeek: {
    priority: 50,
    set: function set(dateValues, value, options) {
      dateValues.date = (0, _index4.default)(dateValues.date, value, options);
      dateValues.date.setUTCHours(0, 0, 0, 0);
      return dateValues;
    }
  },

  dayOfMonth: {
    priority: 50,
    set: function set(dateValues, value) {
      dateValues.date.setUTCDate(value);
      dateValues.date.setUTCHours(0, 0, 0, 0);
      return dateValues;
    }
  },

  dayOfYear: {
    priority: 50,
    set: function set(dateValues, value) {
      dateValues.date.setUTCMonth(0, value);
      dateValues.date.setUTCHours(0, 0, 0, 0);
      return dateValues;
    }
  },

  timeOfDay: {
    priority: 60,
    set: function set(dateValues, value, options) {
      dateValues.timeOfDay = value;
      return dateValues;
    }
  },

  hours: {
    priority: 70,
    set: function set(dateValues, value, options) {
      dateValues.date.setUTCHours(value, 0, 0, 0);
      return dateValues;
    }
  },

  timeOfDayHours: {
    priority: 70,
    set: function set(dateValues, value, options) {
      var timeOfDay = dateValues.timeOfDay;
      if (timeOfDay != null) {
        value = setTimeOfDay(value, timeOfDay);
      }
      dateValues.date.setUTCHours(value, 0, 0, 0);
      return dateValues;
    }
  },

  minutes: {
    priority: 80,
    set: function set(dateValues, value) {
      dateValues.date.setUTCMinutes(value, 0, 0);
      return dateValues;
    }
  },

  seconds: {
    priority: 90,
    set: function set(dateValues, value) {
      dateValues.date.setUTCSeconds(value, 0);
      return dateValues;
    }
  },

  milliseconds: {
    priority: 100,
    set: function set(dateValues, value) {
      dateValues.date.setUTCMilliseconds(value);
      return dateValues;
    }
  },

  timezone: {
    priority: 110,
    set: function set(dateValues, value) {
      dateValues.date = new Date(dateValues.date.getTime() - value * MILLISECONDS_IN_MINUTE);
      return dateValues;
    }
  },

  timestamp: {
    priority: 120,
    set: function set(dateValues, value) {
      dateValues.date = new Date(value);
      return dateValues;
    }
  }
};

exports.default = units;
module.exports = exports['default'];
},{"../../../_lib/setUTCDay/index.js":7,"../../../_lib/setUTCISODay/index.js":8,"../../../_lib/setUTCISOWeek/index.js":9,"../../../_lib/setUTCISOWeekYear/index.js":10,"../../../_lib/startOfUTCISOWeek/index.js":11,"../../../_lib/startOfUTCISOWeekYear/index.js":12}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parse;

var _index = require('../toDate/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../subMinutes/index.js');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('../locale/en-US/index.js');

var _index6 = _interopRequireDefault(_index5);

var _index7 = require('./_lib/parsers/index.js');

var _index8 = _interopRequireDefault(_index7);

var _index9 = require('./_lib/units/index.js');

var _index10 = _interopRequireDefault(_index9);

var _index11 = require('../_lib/cloneObject/index.js');

var _index12 = _interopRequireDefault(_index11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TIMEZONE_UNIT_PRIORITY = 110;
var MILLISECONDS_IN_MINUTE = 60000;

var longFormattingTokensRegExp = /(\[[^[]*])|(\\)?(LTS|LT|LLLL|LLL|LL|L|llll|lll|ll|l)/g;
var defaultParsingTokensRegExp = /(\[[^[]*])|(\\)?(x|ss|s|mm|m|hh|h|do|dddd|ddd|dd|d|aa|a|ZZ|Z|YYYY|YY|X|Wo|WW|W|SSS|SS|S|Qo|Q|Mo|MMMM|MMM|MM|M|HH|H|GGGG|GG|E|Do|DDDo|DDDD|DDD|DD|D|A|.)/g;

/**
 * @name parse
 * @category Common Helpers
 * @summary Parse the date.
 *
 * @description
 * Return the date parsed from string using the given format.
 *
 * Accepted format tokens:
 * | Unit                    | Priority | Token | Input examples                   |
 * |-------------------------|----------|-------|----------------------------------|
 * | Year                    | 10       | YY    | 00, 01, ..., 99                  |
 * |                         |          | YYYY  | 1900, 1901, ..., 2099            |
 * | ISO week-numbering year | 10       | GG    | 00, 01, ..., 99                  |
 * |                         |          | GGGG  | 1900, 1901, ..., 2099            |
 * | Quarter                 | 20       | Q     | 1, 2, 3, 4                       |
 * |                         |          | Qo    | 1st, 2nd, 3rd, 4th               |
 * | Month                   | 30       | M     | 1, 2, ..., 12                    |
 * |                         |          | Mo    | 1st, 2nd, ..., 12th              |
 * |                         |          | MM    | 01, 02, ..., 12                  |
 * |                         |          | MMM   | Jan, Feb, ..., Dec               |
 * |                         |          | MMMM  | January, February, ..., December |
 * | ISO week                | 40       | W     | 1, 2, ..., 53                    |
 * |                         |          | Wo    | 1st, 2nd, ..., 53rd              |
 * |                         |          | WW    | 01, 02, ..., 53                  |
 * | Day of week             | 50       | d     | 0, 1, ..., 6                     |
 * |                         |          | do    | 0th, 1st, ..., 6th               |
 * |                         |          | dd    | Su, Mo, ..., Sa                  |
 * |                         |          | ddd   | Sun, Mon, ..., Sat               |
 * |                         |          | dddd  | Sunday, Monday, ..., Saturday    |
 * | Day of ISO week         | 50       | E     | 1, 2, ..., 7                     |
 * | Day of month            | 50       | D     | 1, 2, ..., 31                    |
 * |                         |          | Do    | 1st, 2nd, ..., 31st              |
 * |                         |          | DD    | 01, 02, ..., 31                  |
 * | Day of year             | 50       | DDD   | 1, 2, ..., 366                   |
 * |                         |          | DDDo  | 1st, 2nd, ..., 366th             |
 * |                         |          | DDDD  | 001, 002, ..., 366               |
 * | Time of day             | 60       | A     | AM, PM                           |
 * |                         |          | a     | am, pm                           |
 * |                         |          | aa    | a.m., p.m.                       |
 * | Hour                    | 70       | H     | 0, 1, ... 23                     |
 * |                         |          | HH    | 00, 01, ... 23                   |
 * | Time of day hour        | 70       | h     | 1, 2, ..., 12                    |
 * |                         |          | hh    | 01, 02, ..., 12                  |
 * | Minute                  | 80       | m     | 0, 1, ..., 59                    |
 * |                         |          | mm    | 00, 01, ..., 59                  |
 * | Second                  | 90       | s     | 0, 1, ..., 59                    |
 * |                         |          | ss    | 00, 01, ..., 59                  |
 * | 1/10 of second          | 100      | S     | 0, 1, ..., 9                     |
 * | 1/100 of second         | 100      | SS    | 00, 01, ..., 99                  |
 * | Millisecond             | 100      | SSS   | 000, 001, ..., 999               |
 * | Timezone                | 110      | Z     | -01:00, +00:00, ... +12:00       |
 * |                         |          | ZZ    | -0100, +0000, ..., +1200         |
 * | Seconds timestamp       | 120      | X     | 512969520                        |
 * | Milliseconds timestamp  | 120      | x     | 512969520900                     |
 *
 * Values will be assigned to the date in the ascending order of its unit's priority.
 * Units of an equal priority overwrite each other in the order of appearance.
 *
 * If no values of higher priority are parsed (e.g. when parsing string 'January 1st' without a year),
 * the values will be taken from 3rd argument `baseDate` which works as a context of parsing.
 *
 * `baseDate` must be passed for correct work of the function.
 * If you're not sure which `baseDate` to supply, create a new instance of Date:
 * `parse('02/11/2014', 'MM/DD/YYYY', new Date())`
 * In this case parsing will be done in the context of the current date.
 * If `baseDate` is `Invalid Date` or a value not convertible to valid `Date`,
 * then `Invalid Date` will be returned.
 *
 * Also, `parse` unfolds long formats like those in [format]{@link https://date-fns.org/docs/format}:
 * | Token | Input examples                 |
 * |-------|--------------------------------|
 * | LT    | 05:30 a.m.                     |
 * | LTS   | 05:30:15 a.m.                  |
 * | L     | 07/02/1995                     |
 * | l     | 7/2/1995                       |
 * | LL    | July 2 1995                    |
 * | ll    | Jul 2 1995                     |
 * | LLL   | July 2 1995 05:30 a.m.         |
 * | lll   | Jul 2 1995 05:30 a.m.          |
 * | LLLL  | Sunday, July 2 1995 05:30 a.m. |
 * | llll  | Sun, Jul 2 1995 05:30 a.m.     |
 *
 * The characters wrapped in square brackets in the format string are escaped.
 *
 * The result may vary by locale.
 *
 * If `formatString` matches with `dateString` but does not provides tokens, `baseDate` will be returned.
 *
 * If parsing failed, `Invalid Date` will be returned.
 * Invalid Date is a Date, whose time value is NaN.
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @param {String} dateString - the string to parse
 * @param {String} formatString - the string of tokens
 * @param {Date|String|Number} baseDate - the date to took the missing higher priority values from
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the parsed date
 * @throws {TypeError} 3 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.locale` must contain `match` property
 * @throws {RangeError} `options.locale` must contain `formatLong` property
 *
 * @example
 * // Parse 11 February 2014 from middle-endian format:
 * var result = parse(
 *   '02/11/2014',
 *   'MM/DD/YYYY',
 *   new Date()
 * )
 * //=> Tue Feb 11 2014 00:00:00
 *
 * @example
 * // Parse 28th of February in English locale in the context of 2010 year:
 * import eoLocale from 'date-fns/locale/eo'
 * var result = parse(
 *   '28-a de februaro',
 *   'Do [de] MMMM',
 *   new Date(2010, 0, 1)
 *   {locale: eoLocale}
 * )
 * //=> Sun Feb 28 2010 00:00:00
 */
function parse(dirtyDateString, dirtyFormatString, dirtyBaseDate, dirtyOptions) {
  if (arguments.length < 3) {
    throw new TypeError('3 arguments required, but only ' + arguments.length + ' present');
  }

  var dateString = String(dirtyDateString);
  var options = dirtyOptions || {};

  var weekStartsOn = options.weekStartsOn === undefined ? 0 : Number(options.weekStartsOn);

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  var locale = options.locale || _index6.default;
  var localeParsers = locale.parsers || {};
  var localeUnits = locale.units || {};

  if (!locale.match) {
    throw new RangeError('locale must contain match property');
  }

  if (!locale.formatLong) {
    throw new RangeError('locale must contain formatLong property');
  }

  var formatString = String(dirtyFormatString).replace(longFormattingTokensRegExp, function (substring) {
    if (substring[0] === '[') {
      return substring;
    }

    if (substring[0] === '\\') {
      return cleanEscapedString(substring);
    }

    return locale.formatLong(substring);
  });

  if (formatString === '') {
    if (dateString === '') {
      return (0, _index2.default)(dirtyBaseDate, options);
    } else {
      return new Date(NaN);
    }
  }

  var subFnOptions = (0, _index12.default)(options);
  subFnOptions.locale = locale;

  var tokens = formatString.match(locale.parsingTokensRegExp || defaultParsingTokensRegExp);
  var tokensLength = tokens.length;

  // If timezone isn't specified, it will be set to the system timezone
  var setters = [{
    priority: TIMEZONE_UNIT_PRIORITY,
    set: dateToSystemTimezone,
    index: 0
  }];

  var i;
  for (i = 0; i < tokensLength; i++) {
    var token = tokens[i];
    var parser = localeParsers[token] || _index8.default[token];
    if (parser) {
      var matchResult;

      if (parser.match instanceof RegExp) {
        matchResult = parser.match.exec(dateString);
      } else {
        matchResult = parser.match(dateString, subFnOptions);
      }

      if (!matchResult) {
        return new Date(NaN);
      }

      var unitName = parser.unit;
      var unit = localeUnits[unitName] || _index10.default[unitName];

      setters.push({
        priority: unit.priority,
        set: unit.set,
        value: parser.parse(matchResult, subFnOptions),
        index: setters.length
      });

      var substring = matchResult[0];
      dateString = dateString.slice(substring.length);
    } else {
      var head = tokens[i].match(/^\[.*]$/) ? tokens[i].replace(/^\[|]$/g, '') : tokens[i];
      if (dateString.indexOf(head) === 0) {
        dateString = dateString.slice(head.length);
      } else {
        return new Date(NaN);
      }
    }
  }

  var uniquePrioritySetters = setters.map(function (setter) {
    return setter.priority;
  }).sort(function (a, b) {
    return a - b;
  }).filter(function (priority, index, array) {
    return array.indexOf(priority) === index;
  }).map(function (priority) {
    return setters.filter(function (setter) {
      return setter.priority === priority;
    }).reverse();
  }).map(function (setterArray) {
    return setterArray[0];
  });

  var date = (0, _index2.default)(dirtyBaseDate, options);

  if (isNaN(date)) {
    return new Date(NaN);
  }

  // Convert the date in system timezone to the same date in UTC+00:00 timezone.
  // This ensures that when UTC functions will be implemented, locales will be compatible with them.
  // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/37
  var utcDate = (0, _index4.default)(date, date.getTimezoneOffset());

  var dateValues = { date: utcDate };

  var settersLength = uniquePrioritySetters.length;
  for (i = 0; i < settersLength; i++) {
    var setter = uniquePrioritySetters[i];
    dateValues = setter.set(dateValues, setter.value, subFnOptions);
  }

  return dateValues.date;
}

function dateToSystemTimezone(dateValues) {
  var date = dateValues.date;
  var time = date.getTime();

  // Get the system timezone offset at (moment of time - offset)
  var offset = date.getTimezoneOffset();

  // Get the system timezone offset at the exact moment of time
  offset = new Date(time + offset * MILLISECONDS_IN_MINUTE).getTimezoneOffset();

  // Convert date in timezone "UTC+00:00" to the system timezone
  dateValues.date = new Date(time + offset * MILLISECONDS_IN_MINUTE);

  return dateValues;
}

function cleanEscapedString(input) {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|]$/g, '');
  }
  return input.replace(/\\/g, '');
}
module.exports = exports['default'];
},{"../_lib/cloneObject/index.js":3,"../locale/en-US/index.js":30,"../subMinutes/index.js":34,"../toDate/index.js":35,"./_lib/parsers/index.js":31,"./_lib/units/index.js":32}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subMinutes;

var _index = require('../addMinutes/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name subMinutes
 * @category Minute Helpers
 * @summary Subtract the specified number of minutes from the given date.
 *
 * @description
 * Subtract the specified number of minutes from the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of minutes to be subtracted
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Date} the new date with the mintues subtracted
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Subtract 30 minutes from 10 July 2014 12:00:00:
 * var result = subMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 11:30:00
 */
function subMinutes(dirtyDate, dirtyAmount, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var amount = Number(dirtyAmount);
  return (0, _index2.default)(dirtyDate, -amount, dirtyOptions);
}
module.exports = exports['default'];
},{"../addMinutes/index.js":14}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toDate;
var MILLISECONDS_IN_HOUR = 3600000;
var MILLISECONDS_IN_MINUTE = 60000;
var DEFAULT_ADDITIONAL_DIGITS = 2;

var patterns = {
  dateTimeDelimeter: /[T ]/,
  plainTime: /:/,

  // year tokens
  YY: /^(\d{2})$/,
  YYY: [/^([+-]\d{2})$/, // 0 additional digits
  /^([+-]\d{3})$/, // 1 additional digit
  /^([+-]\d{4})$/ // 2 additional digits
  ],
  YYYY: /^(\d{4})/,
  YYYYY: [/^([+-]\d{4})/, // 0 additional digits
  /^([+-]\d{5})/, // 1 additional digit
  /^([+-]\d{6})/ // 2 additional digits
  ],

  // date tokens
  MM: /^-(\d{2})$/,
  DDD: /^-?(\d{3})$/,
  MMDD: /^-?(\d{2})-?(\d{2})$/,
  Www: /^-?W(\d{2})$/,
  WwwD: /^-?W(\d{2})-?(\d{1})$/,

  HH: /^(\d{2}([.,]\d*)?)$/,
  HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
  HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,

  // timezone tokens
  timezone: /([Z+-].*)$/,
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-])(\d{2})$/,
  timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/
};

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If an argument is a string, the function tries to parse it.
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If the argument is null, it is treated as an invalid date.
 *
 * If all above fails, the function passes the given argument to Date constructor.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 * All *date-fns* functions will throw `RangeError` if `options.additionalDigits` is not 0, 1, 2 or undefined.
 *
 * @param {*} argument - the value to convert
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * var result = toDate('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert string '+02014101' to date,
 * // if the additional number of digits in the extended year format is 1:
 * var result = toDate('+02014101', {additionalDigits: 1})
 * //=> Fri Apr 11 2014 00:00:00
 */
function toDate(argument, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
  }

  if (argument === null) {
    return new Date(NaN);
  }

  var options = dirtyOptions || {};

  var additionalDigits = options.additionalDigits === undefined ? DEFAULT_ADDITIONAL_DIGITS : Number(options.additionalDigits);
  if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
    throw new RangeError('additionalDigits must be 0, 1 or 2');
  }

  // Clone the date
  if (argument instanceof Date) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument !== 'string') {
    return new Date(argument);
  }

  var dateStrings = splitDateString(argument);

  var parseYearResult = parseYear(dateStrings.date, additionalDigits);
  var year = parseYearResult.year;
  var restDateString = parseYearResult.restDateString;

  var date = parseDate(restDateString, year);

  if (date) {
    var timestamp = date.getTime();
    var time = 0;
    var offset;

    if (dateStrings.time) {
      time = parseTime(dateStrings.time);
    }

    if (dateStrings.timezone) {
      offset = parseTimezone(dateStrings.timezone);
    } else {
      // get offset accurate to hour in timezones that change offset
      offset = new Date(timestamp + time).getTimezoneOffset();
      offset = new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE).getTimezoneOffset();
    }

    return new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE);
  } else {
    return new Date(argument);
  }
}

function splitDateString(dateString) {
  var dateStrings = {};
  var array = dateString.split(patterns.dateTimeDelimeter);
  var timeString;

  if (patterns.plainTime.test(array[0])) {
    dateStrings.date = null;
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
  }

  if (timeString) {
    var token = patterns.timezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], '');
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }

  return dateStrings;
}

function parseYear(dateString, additionalDigits) {
  var patternYYY = patterns.YYY[additionalDigits];
  var patternYYYYY = patterns.YYYYY[additionalDigits];

  var token;

  // YYYY or ±YYYYY
  token = patterns.YYYY.exec(dateString) || patternYYYYY.exec(dateString);
  if (token) {
    var yearString = token[1];
    return {
      year: parseInt(yearString, 10),
      restDateString: dateString.slice(yearString.length)
    };
  }

  // YY or ±YYY
  token = patterns.YY.exec(dateString) || patternYYY.exec(dateString);
  if (token) {
    var centuryString = token[1];
    return {
      year: parseInt(centuryString, 10) * 100,
      restDateString: dateString.slice(centuryString.length)
    };
  }

  // Invalid ISO-formatted year
  return {
    year: null
  };
}

function parseDate(dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) {
    return null;
  }

  var token;
  var date;
  var month;
  var week;

  // YYYY
  if (dateString.length === 0) {
    date = new Date(0);
    date.setUTCFullYear(year);
    return date;
  }

  // YYYY-MM
  token = patterns.MM.exec(dateString);
  if (token) {
    date = new Date(0);
    month = parseInt(token[1], 10) - 1;
    date.setUTCFullYear(year, month);
    return date;
  }

  // YYYY-DDD or YYYYDDD
  token = patterns.DDD.exec(dateString);
  if (token) {
    date = new Date(0);
    var dayOfYear = parseInt(token[1], 10);
    date.setUTCFullYear(year, 0, dayOfYear);
    return date;
  }

  // YYYY-MM-DD or YYYYMMDD
  token = patterns.MMDD.exec(dateString);
  if (token) {
    date = new Date(0);
    month = parseInt(token[1], 10) - 1;
    var day = parseInt(token[2], 10);
    date.setUTCFullYear(year, month, day);
    return date;
  }

  // YYYY-Www or YYYYWww
  token = patterns.Www.exec(dateString);
  if (token) {
    week = parseInt(token[1], 10) - 1;
    return dayOfISOYear(year, week);
  }

  // YYYY-Www-D or YYYYWwwD
  token = patterns.WwwD.exec(dateString);
  if (token) {
    week = parseInt(token[1], 10) - 1;
    var dayOfWeek = parseInt(token[2], 10) - 1;
    return dayOfISOYear(year, week, dayOfWeek);
  }

  // Invalid ISO-formatted date
  return null;
}

function parseTime(timeString) {
  var token;
  var hours;
  var minutes;

  // hh
  token = patterns.HH.exec(timeString);
  if (token) {
    hours = parseFloat(token[1].replace(',', '.'));
    return hours % 24 * MILLISECONDS_IN_HOUR;
  }

  // hh:mm or hhmm
  token = patterns.HHMM.exec(timeString);
  if (token) {
    hours = parseInt(token[1], 10);
    minutes = parseFloat(token[2].replace(',', '.'));
    return hours % 24 * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE;
  }

  // hh:mm:ss or hhmmss
  token = patterns.HHMMSS.exec(timeString);
  if (token) {
    hours = parseInt(token[1], 10);
    minutes = parseInt(token[2], 10);
    var seconds = parseFloat(token[3].replace(',', '.'));
    return hours % 24 * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE + seconds * 1000;
  }

  // Invalid ISO-formatted time
  return null;
}

function parseTimezone(timezoneString) {
  var token;
  var absoluteOffset;

  // Z
  token = patterns.timezoneZ.exec(timezoneString);
  if (token) {
    return 0;
  }

  // ±hh
  token = patterns.timezoneHH.exec(timezoneString);
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60;
    return token[1] === '+' ? -absoluteOffset : absoluteOffset;
  }

  // ±hh:mm or ±hhmm
  token = patterns.timezoneHHMM.exec(timezoneString);
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10);
    return token[1] === '+' ? -absoluteOffset : absoluteOffset;
  }

  return 0;
}

function dayOfISOYear(isoYear, week, day) {
  week = week || 0;
  day = day || 0;
  var date = new Date(0);
  date.setUTCFullYear(isoYear, 0, 4);
  var fourthOfJanuaryDay = date.getUTCDay() || 7;
  var diff = week * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}
module.exports = exports['default'];
},{}],36:[function(require,module,exports){
(function(root, factory) {
    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.StringMask = factory();
    }
}(this, function() {
    var tokens = {
        '0': {pattern: /\d/, _default: '0'},
        '9': {pattern: /\d/, optional: true},
        '#': {pattern: /\d/, optional: true, recursive: true},
        'A': {pattern: /[a-zA-Z0-9]/},
        'S': {pattern: /[a-zA-Z]/},
        'U': {pattern: /[a-zA-Z]/, transform: function(c) { return c.toLocaleUpperCase(); }},
        'L': {pattern: /[a-zA-Z]/, transform: function(c) { return c.toLocaleLowerCase(); }},
        '$': {escape: true}
    };

    function isEscaped(pattern, pos) {
        var count = 0;
        var i = pos - 1;
        var token = {escape: true};
        while (i >= 0 && token && token.escape) {
            token = tokens[pattern.charAt(i)];
            count += token && token.escape ? 1 : 0;
            i--;
        }
        return count > 0 && count % 2 === 1;
    }

    function calcOptionalNumbersToUse(pattern, value) {
        var numbersInP = pattern.replace(/[^0]/g,'').length;
        var numbersInV = value.replace(/[^\d]/g,'').length;
        return numbersInV - numbersInP;
    }

    function concatChar(text, character, options, token) {
        if (token && typeof token.transform === 'function') {
            character = token.transform(character);
        }
        if (options.reverse) {
            return character + text;
        }
        return text + character;
    }

    function hasMoreTokens(pattern, pos, inc) {
        var pc = pattern.charAt(pos);
        var token = tokens[pc];
        if (pc === '') {
            return false;
        }
        return token && !token.escape ? true : hasMoreTokens(pattern, pos + inc, inc);
    }

    function hasMoreRecursiveTokens(pattern, pos, inc) {
        var pc = pattern.charAt(pos);
        var token = tokens[pc];
        if (pc === '') {
            return false;
        }
        return token && token.recursive ? true : hasMoreRecursiveTokens(pattern, pos + inc, inc);
    }

    function insertChar(text, char, position) {
        var t = text.split('');
        t.splice(position, 0, char);
        return t.join('');
    }

    function StringMask(pattern, opt) {
        this.options = opt || {};
        this.options = {
            reverse: this.options.reverse || false,
            usedefaults: this.options.usedefaults || this.options.reverse
        };
        this.pattern = pattern;
    }

    StringMask.prototype.process = function proccess(value) {
        if (!value) {
            return {result: '', valid: false};
        }
        value = value + '';
        var pattern2 = this.pattern;
        var valid = true;
        var formatted = '';
        var valuePos = this.options.reverse ? value.length - 1 : 0;
        var patternPos = 0;
        var optionalNumbersToUse = calcOptionalNumbersToUse(pattern2, value);
        var escapeNext = false;
        var recursive = [];
        var inRecursiveMode = false;

        var steps = {
            start: this.options.reverse ? pattern2.length - 1 : 0,
            end: this.options.reverse ? -1 : pattern2.length,
            inc: this.options.reverse ? -1 : 1
        };

        function continueCondition(options) {
            if (!inRecursiveMode && !recursive.length && hasMoreTokens(pattern2, patternPos, steps.inc)) {
                // continue in the normal iteration
                return true;
            } else if (!inRecursiveMode && recursive.length &&
                hasMoreRecursiveTokens(pattern2, patternPos, steps.inc)) {
                // continue looking for the recursive tokens
                // Note: all chars in the patterns after the recursive portion will be handled as static string
                return true;
            } else if (!inRecursiveMode) {
                // start to handle the recursive portion of the pattern
                inRecursiveMode = recursive.length > 0;
            }

            if (inRecursiveMode) {
                var pc = recursive.shift();
                recursive.push(pc);
                if (options.reverse && valuePos >= 0) {
                    patternPos++;
                    pattern2 = insertChar(pattern2, pc, patternPos);
                    return true;
                } else if (!options.reverse && valuePos < value.length) {
                    pattern2 = insertChar(pattern2, pc, patternPos);
                    return true;
                }
            }
            return patternPos < pattern2.length && patternPos >= 0;
        }

        /**
         * Iterate over the pattern's chars parsing/matching the input value chars
         * until the end of the pattern. If the pattern ends with recursive chars
         * the iteration will continue until the end of the input value.
         *
         * Note: The iteration must stop if an invalid char is found.
         */
        for (patternPos = steps.start; continueCondition(this.options); patternPos = patternPos + steps.inc) {
            // Value char
            var vc = value.charAt(valuePos);
            // Pattern char to match with the value char
            var pc = pattern2.charAt(patternPos);

            var token = tokens[pc];
            if (recursive.length && token && !token.recursive) {
                // In the recursive portion of the pattern: tokens not recursive must be seen as static chars
                token = null;
            }

            // 1. Handle escape tokens in pattern
            // go to next iteration: if the pattern char is a escape char or was escaped
            if (!inRecursiveMode || vc) {
                if (this.options.reverse && isEscaped(pattern2, patternPos)) {
                    // pattern char is escaped, just add it and move on
                    formatted = concatChar(formatted, pc, this.options, token);
                    // skip escape token
                    patternPos = patternPos + steps.inc;
                    continue;
                } else if (!this.options.reverse && escapeNext) {
                    // pattern char is escaped, just add it and move on
                    formatted = concatChar(formatted, pc, this.options, token);
                    escapeNext = false;
                    continue;
                } else if (!this.options.reverse && token && token.escape) {
                    // mark to escape the next pattern char
                    escapeNext = true;
                    continue;
                }
            }

            // 2. Handle recursive tokens in pattern
            // go to next iteration: if the value str is finished or
            //                       if there is a normal token in the recursive portion of the pattern
            if (!inRecursiveMode && token && token.recursive) {
                // save it to repeat in the end of the pattern and handle the value char now
                recursive.push(pc);
            } else if (inRecursiveMode && !vc) {
                // in recursive mode but value is finished. Add the pattern char if it is not a recursive token
                formatted = concatChar(formatted, pc, this.options, token);
                continue;
            } else if (!inRecursiveMode && recursive.length > 0 && !vc) {
                // recursiveMode not started but already in the recursive portion of the pattern
                continue;
            }

            // 3. Handle the value
            // break iterations: if value is invalid for the given pattern
            if (!token) {
                // add char of the pattern
                formatted = concatChar(formatted, pc, this.options, token);
                if (!inRecursiveMode && recursive.length) {
                    // save it to repeat in the end of the pattern
                    recursive.push(pc);
                }
            } else if (token.optional) {
                // if token is optional, only add the value char if it matchs the token pattern
                //                       if not, move on to the next pattern char
                if (token.pattern.test(vc) && optionalNumbersToUse) {
                    formatted = concatChar(formatted, vc, this.options, token);
                    valuePos = valuePos + steps.inc;
                    optionalNumbersToUse--;
                } else if (recursive.length > 0 && vc) {
                    valid = false;
                    break;
                }
            } else if (token.pattern.test(vc)) {
                // if token isn't optional the value char must match the token pattern
                formatted = concatChar(formatted, vc, this.options, token);
                valuePos = valuePos + steps.inc;
            } else if (!vc && token._default && this.options.usedefaults) {
                // if the token isn't optional and has a default value, use it if the value is finished
                formatted = concatChar(formatted, token._default, this.options, token);
            } else {
                // the string value don't match the given pattern
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
}));

},{}],37:[function(require,module,exports){
'use strict';

module.exports = angular.module('ui.utils.masks', [
	require('./global/global-masks'),
	require('./br/br-masks'),
	require('./ch/ch-masks'),
	require('./fr/fr-masks'),
	require('./us/us-masks')
]).name;

},{"./br/br-masks":39,"./ch/ch-masks":48,"./fr/fr-masks":50,"./global/global-masks":54,"./us/us-masks":65}],38:[function(require,module,exports){
'use strict';

var StringMask = require('string-mask');
var maskFactory = require('../../helpers/mask-factory');

var boletoBancarioMask = new StringMask('00000.00000 00000.000000 00000.000000 0 00000000000000');

module.exports = maskFactory({
	clearValue: function(rawValue) {
		return rawValue.replace(/[^0-9]/g, '').slice(0, 47);
	},
	format: function(cleanValue) {
		if (cleanValue.length === 0) {
			return cleanValue;
		}

		return boletoBancarioMask.apply(cleanValue).replace(/[^0-9]$/, '');
	},
	validations: {
		brBoletoBancario: function(value) {
			return value.length === 47;
		}
	}
});

},{"../../helpers/mask-factory":60,"string-mask":36}],39:[function(require,module,exports){
'use strict';

var m = angular.module('ui.utils.masks.br', [])
	.directive('uiBrBoletoBancarioMask', require('./boleto-bancario/boleto-bancario'))
	.directive('uiBrCarPlateMask', require('./car-plate/car-plate'))
	.directive('uiBrCepMask', require('./cep/cep'))
	.directive('uiBrCnpjMask', require('./cnpj/cnpj'))
	.directive('uiBrCpfMask', require('./cpf/cpf'))
	.directive('uiBrCpfcnpjMask', require('./cpf-cnpj/cpf-cnpj'))
	.directive('uiBrIeMask', require('./inscricao-estadual/ie'))
	.directive('uiNfeAccessKeyMask', require('./nfe/nfe'))
	.directive('uiBrPhoneNumberMask', require('./phone/br-phone'));

module.exports = m.name;

},{"./boleto-bancario/boleto-bancario":38,"./car-plate/car-plate":40,"./cep/cep":41,"./cnpj/cnpj":42,"./cpf-cnpj/cpf-cnpj":43,"./cpf/cpf":44,"./inscricao-estadual/ie":45,"./nfe/nfe":46,"./phone/br-phone":47}],40:[function(require,module,exports){
'use strict';

var StringMask = require('string-mask');
var maskFactory = require('../../helpers/mask-factory');

var carPlateMask = new StringMask('UUU-0000');

module.exports = maskFactory({
	clearValue: function(rawValue) {
		return rawValue.replace(/[^a-zA-Z0-9]/g, '').slice(0, 7);
	},
	format: function(cleanValue) {
		return (carPlateMask.apply(cleanValue) || '').replace(/[^a-zA-Z0-9]$/, '');
	},
	validations: {
		carPlate: function(value) {
			return value.length === 7;
		}
	}
});

},{"../../helpers/mask-factory":60,"string-mask":36}],41:[function(require,module,exports){
'use strict';

var StringMask = require('string-mask');
var maskFactory = require('../../helpers/mask-factory');

var cepMask = new StringMask('00000-000');

module.exports = maskFactory({
	clearValue: function(rawValue) {
		return rawValue.toString().replace(/[^0-9]/g, '').slice(0, 8);
	},
	format: function(cleanValue) {
		return (cepMask.apply(cleanValue) || '').replace(/[^0-9]$/, '');
	},
	validations: {
		cep: function(value) {
			return value.toString().trim().length === 8;
		}
	}
});

},{"../../helpers/mask-factory":60,"string-mask":36}],42:[function(require,module,exports){
'use strict';

var StringMask = require('string-mask');
var BrV = require('br-validations');

var maskFactory = require('../../helpers/mask-factory');

var cnpjPattern = new StringMask('00.000.000\/0000-00');

module.exports = maskFactory({
	clearValue: function(rawValue) {
		return rawValue.replace(/[^\d]/g, '').slice(0, 14);
	},
	format: function(cleanValue) {
		return (cnpjPattern.apply(cleanValue) || '').trim().replace(/[^0-9]$/, '');
	},
	validations: {
		cnpj: function(value) {
			return BrV.cnpj.validate(value);
		}
	}
});

},{"../../helpers/mask-factory":60,"br-validations":1,"string-mask":36}],43:[function(require,module,exports){
'use strict';

var StringMask = require('string-mask');
var BrV = require('br-validations');
var maskFactory = require('../../helpers/mask-factory');

var cnpjPattern = new StringMask('00.000.000\/0000-00');
var cpfPattern = new StringMask('000.000.000-00');

module.exports = maskFactory({
	clearValue: function(rawValue) {
		return rawValue.replace(/[^\d]/g, '').slice(0, 14);
	},
	format: function(cleanValue) {
		var formatedValue;

		if (cleanValue.length > 11) {
			formatedValue = cnpjPattern.apply(cleanValue);
		} else {
			formatedValue = cpfPattern.apply(cleanValue) || '';
		}

		return formatedValue.trim().replace(/[^0-9]$/, '');
	},
	validations: {
		cpf: function(value) {
			return value.length > 11 || BrV.cpf.validate(value);
		},
		cnpj: function(value) {
			return value.length <= 11 || BrV.cnpj.validate(value);
		}
	}
});

},{"../../helpers/mask-factory":60,"br-validations":1,"string-mask":36}],44:[function(require,module,exports){
'use strict';

var StringMask = require('string-mask');
var BrV = require('br-validations');

var maskFactory = require('../../helpers/mask-factory');

var cpfPattern = new StringMask('000.000.000-00');

module.exports = maskFactory({
	clearValue: function(rawValue) {
		return rawValue.replace(/[^\d]/g, '').slice(0, 11);
	},
	format: function(cleanValue) {
		return (cpfPattern.apply(cleanValue) || '').trim().replace(/[^0-9]$/, '');
	},
	validations: {
		cpf: function(value) {
			return BrV.cpf.validate(value);
		}
	}
});

},{"../../helpers/mask-factory":60,"br-validations":1,"string-mask":36}],45:[function(require,module,exports){
'use strict';

var StringMask = require('string-mask');
var BrV = require('br-validations');

var ieMasks = {
	'AC': [{mask: new StringMask('00.000.000/000-00')}],
	'AL': [{mask: new StringMask('000000000')}],
	'AM': [{mask: new StringMask('00.000.000-0')}],
	'AP': [{mask: new StringMask('000000000')}],
	'BA': [{chars: 8, mask: new StringMask('000000-00')}, {mask: new StringMask('0000000-00')}],
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
	'PE': [{chars: 9, mask: new StringMask('0000000-00')}, {mask: new StringMask('00.0.000.0000000-0')}],
	'PI': [{mask: new StringMask('000000000')}],
	'PR': [{mask: new StringMask('000.00000-00')}],
	'RJ': [{mask: new StringMask('00.000.00-0')}],
	'RN': [{chars: 9, mask: new StringMask('00.000.000-0')}, {mask: new StringMask('00.0.000.000-0')}],
	'RO': [{mask: new StringMask('0000000000000-0')}],
	'RR': [{mask: new StringMask('00000000-0')}],
	'RS': [{mask: new StringMask('000/0000000')}],
	'SC': [{mask: new StringMask('000.000.000')}],
	'SE': [{mask: new StringMask('00000000-0')}],
	'SP': [{mask: new StringMask('000.000.000.000')}, {mask: new StringMask('-00000000.0/000')}],
	'TO': [{mask: new StringMask('00000000000')}]
};

function BrIeMaskDirective($parse) {
	function clearValue(value) {
		if (!value) {
			return value;
		}

		return value.replace(/[^0-9]/g, '');
	}

	function getMask(uf, value) {
		if (!uf || !ieMasks[uf]) {
			return;
		}

		if (uf === 'SP' && /^P/i.test(value)) {
			return ieMasks.SP[1].mask;
		}

		var masks = ieMasks[uf];
		var i = 0;
		while (masks[i].chars && masks[i].chars < clearValue(value).length && i < masks.length - 1) {
			i++;
		}

		return masks[i].mask;
	}

	function applyIEMask(value, uf) {
		var mask = getMask(uf, value);

		if (!mask) {
			return value;
		}

		var processed = mask.process(clearValue(value));
		var formatedValue = processed.result || '';
		formatedValue = formatedValue.trim().replace(/[^0-9]$/, '');

		if (uf === 'SP' && /^p/i.test(value)) {
			return 'P' + formatedValue;
		}

		return formatedValue;
	}

	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl) {
			var state = ($parse(attrs.uiBrIeMask)(scope) || '').toUpperCase();

			function formatter(value) {
				if (ctrl.$isEmpty(value)) {
					return value;
				}

				return applyIEMask(value, state);
			}

			function parser(value) {
				if (ctrl.$isEmpty(value)) {
					return value;
				}

				var formatedValue = applyIEMask(value, state);
				var actualValue = clearValue(formatedValue);

				if (ctrl.$viewValue !== formatedValue) {
					ctrl.$setViewValue(formatedValue);
					ctrl.$render();
				}

				if (state && state.toUpperCase() === 'SP' && /^p/i.test(value)) {
					return 'P' + actualValue;
				}

				return actualValue;
			}

			ctrl.$formatters.push(formatter);
			ctrl.$parsers.push(parser);

			ctrl.$validators.ie = function validator(modelValue) {
				return ctrl.$isEmpty(modelValue) || BrV.ie(state).validate(modelValue);
			};

			scope.$watch(attrs.uiBrIeMask, function(newState) {
				state = (newState || '').toUpperCase();

				parser(ctrl.$viewValue);
				ctrl.$validate();
			});
		}
	};
}
BrIeMaskDirective.$inject = ['$parse'];

module.exports = BrIeMaskDirective;

},{"br-validations":1,"string-mask":36}],46:[function(require,module,exports){
'use strict';

var StringMask = require('string-mask');

var maskFactory = require('../../helpers/mask-factory');

var nfeAccessKeyMask = new StringMask('0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000');

module.exports = maskFactory({
	clearValue: function(rawValue) {
		return rawValue.replace(/[^0-9]/g, '').slice(0, 44);
	},
	format: function(cleanValue) {
		return (nfeAccessKeyMask.apply(cleanValue) || '').replace(/[^0-9]$/, '');
	},
	validations: {
		nfeAccessKey: function(value) {
			return value.length === 44;
		}
	}
});

},{"../../helpers/mask-factory":60,"string-mask":36}],47:[function(require,module,exports){
'use strict';

var StringMask = require('string-mask');

var maskFactory = require('../../helpers/mask-factory');

/**
 * FIXME: all numbers will have 9 digits after 2016.
 * see http://portal.embratel.com.br/embratel/9-digito/
 */
var phoneMask8D = {
		countryCode : new StringMask('+00 (00) 0000-0000'),   //with country code
		areaCode    : new StringMask('(00) 0000-0000'),       //with area code
		simple      : new StringMask('0000-0000')             //without area code
	}, phoneMask9D = {
		countryCode : new StringMask('+00 (00) 00000-0000'), //with country code
		areaCode    : new StringMask('(00) 00000-0000'),     //with area code
		simple      : new StringMask('00000-0000')           //without area code
	}, phoneMask0800 = {
		countryCode : null,                                   //N/A
		areaCode    : null,                                   //N/A
		simple      : new StringMask('0000-000-0000')         //N/A, so it's "simple"
	};

module.exports = maskFactory({
	clearValue: function(rawValue) {
		return rawValue.toString().replace(/[^0-9]/g, '').slice(0, 13);
	},
	format: function(cleanValue) {
		var formattedValue;

		if (cleanValue.indexOf('0800') === 0) {
			formattedValue = phoneMask0800.simple.apply(cleanValue);
		} else if (cleanValue.length < 9) {
			formattedValue = phoneMask8D.simple.apply(cleanValue) || '';
		} else if (cleanValue.length < 10) {
			formattedValue = phoneMask9D.simple.apply(cleanValue);
		} else if (cleanValue.length < 11) {
			formattedValue = phoneMask8D.areaCode.apply(cleanValue);
		} else if (cleanValue.length < 12) {
			formattedValue = phoneMask9D.areaCode.apply(cleanValue);
		} else if (cleanValue.length < 13) {
			formattedValue = phoneMask8D.countryCode.apply(cleanValue);
		} else {
			formattedValue = phoneMask9D.countryCode.apply(cleanValue);
		}

		return formattedValue.trim().replace(/[^0-9]$/, '');
	},
	getModelValue: function(formattedValue, originalModelType) {
		var cleanValue = this.clearValue(formattedValue);
		return originalModelType === 'number' ? parseInt(cleanValue) : cleanValue;
	},
	validations: {
		brPhoneNumber: function(value) {
			var valueLength = value && value.toString().length;

			//8- 8D without AC
			//9- 9D without AC
			//10- 8D with AC
			//11- 9D with AC and 0800
			//12- 8D with AC plus CC
			//13- 9D with AC plus CC
			return valueLength >= 8 && valueLength <= 13;
		}
	}
});

},{"../../helpers/mask-factory":60,"string-mask":36}],48:[function(require,module,exports){
'use strict';

var m = angular.module('ui.utils.masks.ch', [])
	.directive('uiChPhoneNumberMask', require('./phone/ch-phone'));

module.exports = m.name;

},{"./phone/ch-phone":49}],49:[function(require,module,exports){
'use strict';

var StringMask = require('string-mask');

var maskFactory = require('../../helpers/mask-factory');

var phoneMask = new StringMask('+00 00 000 00 00');

module.exports = maskFactory({
	clearValue: function(rawValue) {
		return rawValue.toString().replace(/[^0-9]/g, '').slice(0, 11);
	},
	format: function(cleanValue) {
		var formatedValue;

		formatedValue = phoneMask.apply(cleanValue) || '';

		return formatedValue.trim().replace(/[^0-9]$/, '');
	},
	validations: {
		chPhoneNumber: function(value) {
			var valueLength = value && value.toString().length;
			return valueLength === 11;
		}
	}
});

},{"../../helpers/mask-factory":60,"string-mask":36}],50:[function(require,module,exports){
'use strict';

var m = angular.module('ui.utils.masks.fr', [])
	.directive('uiFrPhoneNumberMask', require('./phone/fr-phone'));

module.exports = m.name;

},{"./phone/fr-phone":51}],51:[function(require,module,exports){
'use strict';

var StringMask = require('string-mask');
var maskFactory = require('../../helpers/mask-factory');

var phoneMaskFR = new StringMask('00 00 00 00 00');

module.exports = maskFactory({
	clearValue: function(rawValue) {
		return rawValue.toString().replace(/[^0-9]/g, '').slice(0, 10);
	},
	format: function(cleanValue) {
		var formattedValue;

		formattedValue = phoneMaskFR.apply(cleanValue) || '';

		return formattedValue.trim().replace(/[^0-9]$/, '');
	},
	validations: {
		frPhoneNumber: function(value) {
			var valueLength = value && value.toString().length;
			return valueLength === 10;
		}
	}
});

},{"../../helpers/mask-factory":60,"string-mask":36}],52:[function(require,module,exports){
'use strict';

var StringMask = require('string-mask');
var maskFactory = require('../../helpers/mask-factory');

var ccSize = 16;

var ccMask = new StringMask('0000 0000 0000 0000');

module.exports = maskFactory({
	clearValue: function(rawValue) {
		return rawValue.toString().replace(/[^0-9]/g, '').slice(0, ccSize);
	},
	format: function(cleanValue) {
		var formatedValue;

		formatedValue = ccMask.apply(cleanValue) || '';

		return formatedValue.trim().replace(/[^0-9]$/, '');
	},
	validations: {
		creditCard: function(value) {
			var valueLength = value && value.toString().length;
			return valueLength === ccSize;
		}
	}
});

},{"../../helpers/mask-factory":60,"string-mask":36}],53:[function(require,module,exports){
'use strict';

var formatDate = require('date-fns/format');
var parseDate = require('date-fns/parse');
var isValidDate = require('date-fns/isValid');
var StringMask = require('string-mask');

function isISODateString(date) {
	return /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}([-+][0-9]{2}:[0-9]{2}|Z)$/
		.test(date.toString());
}

var dateFormatMapByLocale = {
	'pt-br': 'DD/MM/YYYY',
	'es-ar': 'DD/MM/YYYY',
	'es-mx': 'DD/MM/YYYY',
	'es'   : 'DD/MM/YYYY',
	'en-us': 'MM/DD/YYYY',
	'en'   : 'MM/DD/YYYY',
	'fr-fr': 'DD/MM/YYYY',
	'fr'   : 'DD/MM/YYYY',
	'ru'   : 'DD.MM.YYYY'
};

function DateMaskDirective($locale) {
	var dateFormat = dateFormatMapByLocale[$locale.id] || 'YYYY-MM-DD';

	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl) {
			attrs.parse = attrs.parse || 'true';

			dateFormat = attrs.uiDateMask || dateFormat;

			var dateMask = new StringMask(dateFormat.replace(/[YMD]/g,'0'));

			function formatter(value) {
				if (ctrl.$isEmpty(value)) {
					return null;
				}

				var cleanValue = value;
				if (typeof value === 'object' || isISODateString(value)) {
					cleanValue = formatDate(value, dateFormat);
				}

				cleanValue = cleanValue.replace(/[^0-9]/g, '');
				var formatedValue = dateMask.apply(cleanValue) || '';

				return formatedValue.trim().replace(/[^0-9]$/, '');
			}

			ctrl.$formatters.push(formatter);

			ctrl.$parsers.push(function parser(value) {
				if (ctrl.$isEmpty(value)) {
					return value;
				}

				var formatedValue = formatter(value);

				if (ctrl.$viewValue !== formatedValue) {
					ctrl.$setViewValue(formatedValue);
					ctrl.$render();
				}

				return attrs.parse === 'false'
					? formatedValue
					: parseDate(formatedValue, dateFormat, new Date());
			});

			ctrl.$validators.date =	function validator(modelValue, viewValue) {
				if (ctrl.$isEmpty(modelValue)) {
					return true;
				}

				return isValidDate(parseDate(viewValue, dateFormat, new Date())) && viewValue.length === dateFormat.length;
			};
		}
	};
}
DateMaskDirective.$inject = ['$locale'];

module.exports = DateMaskDirective;

},{"date-fns/format":16,"date-fns/isValid":17,"date-fns/parse":33,"string-mask":36}],54:[function(require,module,exports){
'use strict';

var m = angular.module('ui.utils.masks.global', [])
	.directive('uiCreditCardMask', require('./credit-card/credit-card'))
	.directive('uiDateMask', require('./date/date'))
	.directive('uiMoneyMask', require('./money/money'))
	.directive('uiNumberMask', require('./number/number'))
	.directive('uiPercentageMask', require('./percentage/percentage'))
	.directive('uiScientificNotationMask', require('./scientific-notation/scientific-notation'))
	.directive('uiTimeMask', require('./time/time'));

module.exports = m.name;

},{"./credit-card/credit-card":52,"./date/date":53,"./money/money":55,"./number/number":56,"./percentage/percentage":57,"./scientific-notation/scientific-notation":58,"./time/time":59}],55:[function(require,module,exports){
'use strict';

var StringMask = require('string-mask');
var validators = require('../../helpers/validators');
var PreFormatters = require('../../helpers/pre-formatters');

function MoneyMaskDirective($locale, $parse) {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl) {
			var decimalDelimiter = $locale.NUMBER_FORMATS.DECIMAL_SEP,
				thousandsDelimiter = $locale.NUMBER_FORMATS.GROUP_SEP,
				currencySym = $locale.NUMBER_FORMATS.CURRENCY_SYM,
				symbolSeparation = ' ',
				decimals = $parse(attrs.uiMoneyMask)(scope),
				backspacePressed = false;

			element.bind('keydown keypress', function(event) {
				backspacePressed = event.which === 8;
			});

			function maskFactory(decimals) {
				var decimalsPattern = decimals > 0 ? decimalDelimiter + new Array(decimals + 1).join('0') : '';
				var maskPattern =  '#' + thousandsDelimiter + '##0' + decimalsPattern;
				if (angular.isDefined(attrs.uiCurrencyAfter)) {
					maskPattern += symbolSeparation;
				} else {
					maskPattern =  symbolSeparation + maskPattern;
				}
				return new StringMask(maskPattern, {reverse: true});
			}

			if (angular.isDefined(attrs.uiDecimalDelimiter)) {
				decimalDelimiter = attrs.uiDecimalDelimiter;
			}

			if (angular.isDefined(attrs.uiThousandsDelimiter)) {
				thousandsDelimiter = attrs.uiThousandsDelimiter;
			}

			if (angular.isDefined(attrs.uiHideGroupSep)) {
				thousandsDelimiter = '';
			}

			if (angular.isDefined(attrs.uiHideSpace)) {
				symbolSeparation = '';
			}

			if (angular.isDefined(attrs.currencySymbol)) {
				currencySym = attrs.currencySymbol;
				if (attrs.currencySymbol.length === 0) {
					symbolSeparation = '';
				}
			}

			if (isNaN(decimals)) {
				decimals = 2;
			}
			decimals = parseInt(decimals);
			var moneyMask = maskFactory(decimals);

			function formatter(value) {
				if (ctrl.$isEmpty(value)) {
					return '';
				}

				if (angular.isDefined(attrs.uiIntegerModel)) {
					value /= Math.pow(10, decimals);
				}

				var prefix = (angular.isDefined(attrs.uiNegativeNumber) && value < 0) ? '-' : '';
				var valueToFormat = PreFormatters.prepareNumberToFormatter(value, decimals);

				if (angular.isDefined(attrs.uiCurrencyAfter)) {
					return prefix + moneyMask.apply(valueToFormat) + currencySym;
				}

				return prefix + currencySym + moneyMask.apply(valueToFormat);
			}

			function parser(value) {
				if (ctrl.$isEmpty(value)) {
					return null;
				}

				var actualNumber = value.replace(/[^\d]+/g,''), formatedValue;
				actualNumber = actualNumber.replace(/^[0]+([1-9])/,'$1');
				actualNumber = actualNumber || '0';

				if (backspacePressed && angular.isDefined(attrs.uiCurrencyAfter) && actualNumber !== 0) {
					actualNumber = actualNumber.substring(0, actualNumber.length - 1);
					backspacePressed = false;
				}

				if (angular.isDefined(attrs.uiCurrencyAfter)) {
					formatedValue = moneyMask.apply(actualNumber) + currencySym;
				} else {
					formatedValue = currencySym + moneyMask.apply(actualNumber);
				}

				if (angular.isDefined(attrs.uiNegativeNumber)) {
					var isNegative = (value[0] === '-'),
						needsToInvertSign = (value.slice(-1) === '-');

					//only apply the minus sign if it is negative or(exclusive)
					//needs to be negative and the number is different from zero
					if (needsToInvertSign ^ isNegative && !!actualNumber) {
						actualNumber *= -1;
						formatedValue = '-' + formatedValue;
					}
				}

				if (value !== formatedValue) {
					ctrl.$setViewValue(formatedValue);
					ctrl.$render();
				}

				var retValue = parseInt(formatedValue.replace(/[^\d\-]+/g,''));

				if (!isNaN(retValue)) {
					if (!angular.isDefined(attrs.uiIntegerModel)) {
						retValue /= Math.pow(10, decimals);
					}

					return retValue;
				}

				return null;
			}

			ctrl.$formatters.push(formatter);
			ctrl.$parsers.push(parser);

			if (attrs.uiMoneyMask) {
				scope.$watch(attrs.uiMoneyMask, function(_decimals) {
					decimals = isNaN(_decimals) ? 2 : _decimals;
					decimals = parseInt(decimals);
					moneyMask = maskFactory(decimals);

					parser(ctrl.$viewValue);
				});
			}

			if (attrs.currency) {
				scope.$watch(attrs.currency, function(_currency) {
					currencySym = _currency;
					moneyMask = maskFactory(decimals);
					parser(ctrl.$viewValue);
				});
			}

			if (attrs.min) {
				var minVal;

				ctrl.$validators.min = function(modelValue) {
					return validators.minNumber(ctrl, modelValue, minVal);
				};

				scope.$watch(attrs.min, function(value) {
					minVal = value;
					ctrl.$validate();
				});
			}

			if (attrs.max) {
				var maxVal;

				ctrl.$validators.max = function(modelValue) {
					return validators.maxNumber(ctrl, modelValue, maxVal);
				};

				scope.$watch(attrs.max, function(value) {
					maxVal = value;
					ctrl.$validate();
				});
			}
		}
	};
}
MoneyMaskDirective.$inject = ['$locale', '$parse'];

module.exports = MoneyMaskDirective;

},{"../../helpers/pre-formatters":62,"../../helpers/validators":63,"string-mask":36}],56:[function(require,module,exports){
'use strict';

var validators = require('../../helpers/validators');
var NumberMasks = require('../../helpers/number-mask-builder');
var PreFormatters = require('../../helpers/pre-formatters');

function NumberMaskDirective($locale, $parse) {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl) {
			var decimalDelimiter = $locale.NUMBER_FORMATS.DECIMAL_SEP,
				thousandsDelimiter = $locale.NUMBER_FORMATS.GROUP_SEP,
				decimals = $parse(attrs.uiNumberMask)(scope);

			if (angular.isDefined(attrs.uiHideGroupSep)) {
				thousandsDelimiter = '';
			}

			if (isNaN(decimals)) {
				decimals = 2;
			}

			var viewMask = NumberMasks.viewMask(decimals, decimalDelimiter, thousandsDelimiter),
				modelMask = NumberMasks.modelMask(decimals);

			function parser(value) {
				if (ctrl.$isEmpty(value)) {
					return null;
				}

				var valueToFormat = PreFormatters.clearDelimitersAndLeadingZeros(value) || '0';
				var formatedValue = viewMask.apply(valueToFormat);
				var actualNumber = parseFloat(modelMask.apply(valueToFormat));

				if (angular.isDefined(attrs.uiNegativeNumber)) {
					var isNegative = (value[0] === '-'),
						needsToInvertSign = (value.slice(-1) === '-');

					//only apply the minus sign if it is negative or(exclusive) or the first character
					//needs to be negative and the number is different from zero
					if ((needsToInvertSign ^ isNegative) || value === '-') {
						actualNumber *= -1;
						formatedValue = '-' + ((actualNumber !== 0) ? formatedValue : '');
					}
				}

				if (ctrl.$viewValue !== formatedValue) {
					ctrl.$setViewValue(formatedValue);
					ctrl.$render();
				}

				return actualNumber;
			}

			function formatter(value) {
				if (ctrl.$isEmpty(value)) {
					return value;
				}

				var prefix = (angular.isDefined(attrs.uiNegativeNumber) && value < 0) ? '-' : '';
				var valueToFormat = PreFormatters.prepareNumberToFormatter(value, decimals);
				return prefix + viewMask.apply(valueToFormat);
			}

			function clearViewValueIfMinusSign() {
				if (ctrl.$viewValue === '-') {
					ctrl.$setViewValue('');
					ctrl.$render();
				}
			}

			element.on('blur', clearViewValueIfMinusSign);

			ctrl.$formatters.push(formatter);
			ctrl.$parsers.push(parser);

			if (attrs.uiNumberMask) {
				scope.$watch(attrs.uiNumberMask, function(_decimals) {
					decimals = isNaN(_decimals) ? 2 : _decimals;
					viewMask = NumberMasks.viewMask(decimals, decimalDelimiter, thousandsDelimiter);
					modelMask = NumberMasks.modelMask(decimals);

					parser(ctrl.$viewValue);
				});
			}

			if (attrs.min) {
				var minVal;

				ctrl.$validators.min = function(modelValue) {
					return validators.minNumber(ctrl, modelValue, minVal);
				};

				scope.$watch(attrs.min, function(value) {
					minVal = value;
					ctrl.$validate();
				});
			}

			if (attrs.max) {
				var maxVal;

				ctrl.$validators.max = function(modelValue) {
					return validators.maxNumber(ctrl, modelValue, maxVal);
				};

				scope.$watch(attrs.max, function(value) {
					maxVal = value;
					ctrl.$validate();
				});
			}
		}
	};
}
NumberMaskDirective.$inject = ['$locale', '$parse'];

module.exports = NumberMaskDirective;

},{"../../helpers/number-mask-builder":61,"../../helpers/pre-formatters":62,"../../helpers/validators":63}],57:[function(require,module,exports){
'use strict';

var validators = require('../../helpers/validators');
var NumberMasks = require('../../helpers/number-mask-builder');
var PreFormatters = require('../../helpers/pre-formatters');

function preparePercentageToFormatter(value, decimals, modelMultiplier) {
	return PreFormatters.clearDelimitersAndLeadingZeros((parseFloat(value)*modelMultiplier).toFixed(decimals));
}

function PercentageMaskDirective($locale) {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl) {
			var decimalDelimiter = $locale.NUMBER_FORMATS.DECIMAL_SEP;

			var backspacePressed = false;
			element.bind('keydown keypress', function(event) {
				backspacePressed = event.which === 8;
			});

			var thousandsDelimiter = $locale.NUMBER_FORMATS.GROUP_SEP;
			if (angular.isDefined(attrs.uiHideGroupSep)) {
				thousandsDelimiter = '';
			}

			var percentageSymbol = ' %';
			if (angular.isDefined(attrs.uiHidePercentageSign)) {
				percentageSymbol = '';
			} else if (angular.isDefined(attrs.uiHideSpace)) {
				percentageSymbol = '%';
			}

			var decimals = parseInt(attrs.uiPercentageMask);
			if (isNaN(decimals)) {
				decimals = 2;
			}

			var modelValue = {
				multiplier : 100,
				decimalMask: 2
			};
			if (angular.isDefined(attrs.uiPercentageValue)) {
				modelValue.multiplier  = 1;
				modelValue.decimalMask = 0;
			}

			var numberDecimals = decimals + modelValue.decimalMask;
			var viewMask = NumberMasks.viewMask(decimals, decimalDelimiter, thousandsDelimiter),
				modelMask = NumberMasks.modelMask(numberDecimals);

			function formatter(value) {
				if (ctrl.$isEmpty(value)) {
					return value;
				}
				var prefix = (angular.isDefined(attrs.uiNegativeNumber) && value < 0) ? '-' : '';
				var valueToFormat = preparePercentageToFormatter(value, decimals, modelValue.multiplier);
				var formatedValue = prefix + viewMask.apply(valueToFormat) + percentageSymbol;

				return formatedValue;
			}

			function parser(value) {
				if (ctrl.$isEmpty(value)) {
					return null;
				}

				var valueToFormat = PreFormatters.clearDelimitersAndLeadingZeros(value) || '0';
				if (percentageSymbol !== '' && value.length > 1 && value.indexOf('%') === -1) {
					valueToFormat = valueToFormat.slice(0, valueToFormat.length - 1);
				}

				if (backspacePressed && value.length === 1 && value !== '%') {
					valueToFormat = '0';
				}

				var formatedValue = viewMask.apply(valueToFormat) + percentageSymbol;
				var actualNumber = parseFloat(modelMask.apply(valueToFormat));

				if (angular.isDefined(attrs.uiNegativeNumber)) {
					var isNegative = (value[0] === '-'),
						needsToInvertSign = (value.slice(-1) === '-');

					//only apply the minus sign if it is negative or(exclusive) or the first character
					//needs to be negative and the number is different from zero
					if ((needsToInvertSign ^ isNegative) || value === '-') {
						actualNumber *= -1;
						formatedValue = '-' + ((actualNumber !== 0) ? formatedValue : '');
					}
				}

				if (ctrl.$viewValue !== formatedValue) {
					ctrl.$setViewValue(formatedValue);
					ctrl.$render();
				}

				return actualNumber;
			}

			ctrl.$formatters.push(formatter);
			ctrl.$parsers.push(parser);

			if (attrs.uiPercentageMask) {
				scope.$watch(attrs.uiPercentageMask, function(_decimals) {
					decimals = isNaN(_decimals) ? 2 : _decimals;

					numberDecimals = decimals + modelValue.decimalMask;
					viewMask = NumberMasks.viewMask(decimals, decimalDelimiter, thousandsDelimiter);
					modelMask = NumberMasks.modelMask(numberDecimals);

					parser(formatter(ctrl.$modelValue));
				});
			}

			if (attrs.min) {
				var minVal;

				ctrl.$validators.min = function(modelValue) {
					return validators.minNumber(ctrl, modelValue, minVal);
				};

				scope.$watch(attrs.min, function(value) {
					minVal = value;
					ctrl.$validate();
				});
			}

			if (attrs.max) {
				var maxVal;

				ctrl.$validators.max = function(modelValue) {
					return validators.maxNumber(ctrl, modelValue, maxVal);
				};

				scope.$watch(attrs.max, function(value) {
					maxVal = value;
					ctrl.$validate();
				});
			}
		}
	};
}
PercentageMaskDirective.$inject = ['$locale'];

module.exports = PercentageMaskDirective;

},{"../../helpers/number-mask-builder":61,"../../helpers/pre-formatters":62,"../../helpers/validators":63}],58:[function(require,module,exports){
'use strict';

var StringMask = require('string-mask');

function ScientificNotationMaskDirective($locale, $parse) {
	var decimalDelimiter = $locale.NUMBER_FORMATS.DECIMAL_SEP,
		defaultPrecision = 2;

	function significandMaskBuilder(decimals) {
		var mask = '0';

		if (decimals > 0) {
			mask += decimalDelimiter;
			for (var i = 0; i < decimals; i++) {
				mask += '0';
			}
		}

		return new StringMask(mask, {
			reverse: true
		});
	}

	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl) {
			var decimals = $parse(attrs.uiScientificNotationMask)(scope);

			if (isNaN(decimals)) {
				decimals = defaultPrecision;
			}

			var significandMask = significandMaskBuilder(decimals);

			function splitNumber(value) {
				var stringValue = value.toString(),
					splittedNumber = stringValue.match(/(-?[0-9]*)[\.]?([0-9]*)?[Ee]?([\+-]?[0-9]*)?/);

				return {
					integerPartOfSignificand: splittedNumber[1],
					decimalPartOfSignificand: splittedNumber[2],
					exponent: splittedNumber[3] | 0
				};
			}

			function formatter(value) {
				if (ctrl.$isEmpty(value)) {
					return value;
				}

				if (typeof value === 'number') {
					value = value.toExponential(decimals);
				} else {
					value = value.toString().replace(decimalDelimiter, '.');
				}

				var formattedValue, exponent;
				var splittedNumber = splitNumber(value);

				var integerPartOfSignificand = splittedNumber.integerPartOfSignificand || 0;
				var numberToFormat = integerPartOfSignificand.toString();
				if (angular.isDefined(splittedNumber.decimalPartOfSignificand)) {
					numberToFormat += splittedNumber.decimalPartOfSignificand;
				}

				var needsNormalization =
					(integerPartOfSignificand >= 1 || integerPartOfSignificand <= -1) &&
					(
						(angular.isDefined(splittedNumber.decimalPartOfSignificand) &&
						splittedNumber.decimalPartOfSignificand.length > decimals) ||
						(decimals === 0 && numberToFormat.length >= 2)
					);

				if (needsNormalization) {
					exponent = numberToFormat.slice(decimals + 1, numberToFormat.length);
					numberToFormat = numberToFormat.slice(0, decimals + 1);
				}

				formattedValue = significandMask.apply(numberToFormat);

				if (splittedNumber.exponent !== 0) {
					exponent = splittedNumber.exponent;
				}

				if (angular.isDefined(exponent)) {
					formattedValue += 'e' + exponent;
				}

				var prefix = (angular.isDefined(attrs.uiNegativeNumber) && value[0] === '-') ? '-' : '';

				return prefix + formattedValue;
			}

			function parser(value) {
				if (ctrl.$isEmpty(value)) {
					return value;
				}

				var isExponentNegative = /e-/.test(value);
				var cleanValue = value.replace('e-', 'e');
				var viewValue = formatter(cleanValue);

				var needsToInvertSign = (value.slice(-1) === '-');

				if (needsToInvertSign ^ isExponentNegative) {
					viewValue = viewValue.replace(/(e[-]?)/, 'e-');
				}

				if (needsToInvertSign && isExponentNegative) {
					viewValue = viewValue[0] !== '-' ? ('-' + viewValue) : viewValue.replace(/^(-)/,'');
				}

				var modelValue = parseFloat(viewValue.replace(decimalDelimiter, '.'));

				if (ctrl.$viewValue !== viewValue) {
					ctrl.$setViewValue(viewValue);
					ctrl.$render();
				}

				return modelValue;
			}

			ctrl.$formatters.push(formatter);
			ctrl.$parsers.push(parser);

			ctrl.$validators.max = function validator(value) {
				return ctrl.$isEmpty(value) || value < Number.MAX_VALUE;
			};
		}
	};
}
ScientificNotationMaskDirective.$inject = ['$locale', '$parse'];

module.exports = ScientificNotationMaskDirective;

},{"string-mask":36}],59:[function(require,module,exports){
'use strict';

var StringMask = require('string-mask');

module.exports = function TimeMaskDirective() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl) {
			var timeFormat = '00:00:00';

			if (angular.isDefined(attrs.uiTimeMask) && attrs.uiTimeMask === 'short') {
				timeFormat = '00:00';
			}

			var formattedValueLength = timeFormat.length;
			var unformattedValueLength = timeFormat.replace(':', '').length;
			var timeMask = new StringMask(timeFormat);

			function formatter(value) {
				if (ctrl.$isEmpty(value)) {
					return value;
				}

				var cleanValue = value.replace(/[^0-9]/g, '').slice(0, unformattedValueLength) || '';
				return (timeMask.apply(cleanValue) || '').replace(/[^0-9]$/, '');
			}

			ctrl.$formatters.push(formatter);

			ctrl.$parsers.push(function parser(value) {
				if (ctrl.$isEmpty(value)) {
					return value;
				}

				var viewValue = formatter(value);
				var modelValue = viewValue;

				if (ctrl.$viewValue !== viewValue) {
					ctrl.$setViewValue(viewValue);
					ctrl.$render();
				}

				return modelValue;
			});

			ctrl.$validators.time = function(modelValue) {
				if (ctrl.$isEmpty(modelValue)) {
					return true;
				}

				var splittedValue = modelValue.toString().split(/:/).filter(function(v) {
					return !!v;
				});

				var hours = parseInt(splittedValue[0]),
					minutes = parseInt(splittedValue[1]),
					seconds = parseInt(splittedValue[2] || 0);

				return modelValue.toString().length === formattedValueLength &&
					hours < 24 && minutes < 60 && seconds < 60;
			};
		}
	};
};

},{"string-mask":36}],60:[function(require,module,exports){
'use strict';

module.exports = function maskFactory(maskDefinition) {
	return function MaskDirective() {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attrs, ctrl) {
				ctrl.$formatters.push(function formatter(value) {
					if (ctrl.$isEmpty(value)) {
						return value;
					}

					var cleanValue = maskDefinition.clearValue(value.toString());
					return maskDefinition.format(cleanValue);
				});

				ctrl.$parsers.push(function parser(value) {
					if (ctrl.$isEmpty(value)) {
						return value;
					}

					var cleanValue = maskDefinition.clearValue(value.toString());
					var formattedValue = maskDefinition.format(cleanValue);

					if (ctrl.$viewValue !== formattedValue) {
						ctrl.$setViewValue(formattedValue);
						ctrl.$render();
					}

					if (angular.isUndefined(maskDefinition.getModelValue)) {
						return cleanValue;
					}

					var actualModelType = typeof ctrl.$modelValue;
					return maskDefinition.getModelValue(formattedValue, actualModelType);
				});

				angular.forEach(maskDefinition.validations, function(validatorFn, validationErrorKey) {
					ctrl.$validators[validationErrorKey] = function validator(modelValue, viewValue) {
						return ctrl.$isEmpty(modelValue) || validatorFn(modelValue, viewValue);
					};
				});
			}
		};
	};
};

},{}],61:[function(require,module,exports){
'use strict';

var StringMask = require('string-mask');

function viewMask(decimals, decimalDelimiter, thousandsDelimiter) {
	var mask = '#' + thousandsDelimiter + '##0';

	if (decimals > 0) {
		mask += decimalDelimiter;
		for (var i = 0; i < decimals; i++) {
			mask += '0';
		}
	}

	return new StringMask(mask, {
		reverse: true
	});
}

function modelMask(decimals) {
	var mask = '###0';

	if (decimals > 0) {
		mask += '.';
		for (var i = 0; i < decimals; i++) {
			mask += '0';
		}
	}

	return new StringMask(mask, {
		reverse: true
	});
}

module.exports = {
	viewMask: viewMask,
	modelMask: modelMask
};

},{"string-mask":36}],62:[function(require,module,exports){
'use strict';

function clearDelimitersAndLeadingZeros(value) {
	if (value === '0') {
		return '0';
	}

	var cleanValue = value.toString().replace(/^-/,'').replace(/^0*/, '');
	return cleanValue.replace(/[^0-9]/g, '');
}

function prepareNumberToFormatter(value, decimals) {
	return clearDelimitersAndLeadingZeros((parseFloat(value)).toFixed(decimals));
}

module.exports = {
	clearDelimitersAndLeadingZeros: clearDelimitersAndLeadingZeros,
	prepareNumberToFormatter: prepareNumberToFormatter
};

},{}],63:[function(require,module,exports){
'use strict';

module.exports = {
	maxNumber: function(ctrl, value, limit) {
		var max = parseFloat(limit, 10);
		return ctrl.$isEmpty(value) || isNaN(max) || value <= max;
	},
	minNumber: function(ctrl, value, limit) {
		var min = parseFloat(limit, 10);
		return ctrl.$isEmpty(value) || isNaN(min) || value >= min;
	}
};

},{}],64:[function(require,module,exports){
'use strict';

var StringMask = require('string-mask');
var maskFactory = require('../../helpers/mask-factory');

var phoneMaskUS = new StringMask('(000) 000-0000'),
	phoneMaskINTL = new StringMask('+00-00-000-000000');

module.exports = maskFactory({
	clearValue: function(rawValue) {
		return rawValue.toString().replace(/[^0-9]/g, '');
	},
	format: function(cleanValue) {
		var formattedValue;

		if (cleanValue.length < 11) {
			formattedValue = phoneMaskUS.apply(cleanValue) || '';
		} else {
			formattedValue = phoneMaskINTL.apply(cleanValue);
		}

		return formattedValue.trim().replace(/[^0-9]$/, '');
	},
	validations: {
		usPhoneNumber: function(value) {
			return value && value.toString().length > 9;
		}
	}
});

},{"../../helpers/mask-factory":60,"string-mask":36}],65:[function(require,module,exports){
'use strict';

var m = angular.module('ui.utils.masks.us', [])
	.directive('uiUsPhoneNumberMask', require('./phone/us-phone'));

module.exports = m.name;

},{"./phone/us-phone":64}]},{},[37])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9ub2RlX21vZHVsZXMvYnItdmFsaWRhdGlvbnMvcmVsZWFzZXMvYnItdmFsaWRhdGlvbnMuanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvX2xpYi9hZGRVVENNaW51dGVzL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvY2xvbmVPYmplY3QvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvX2xpYi9nZXRVVENEYXlPZlllYXIvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvX2xpYi9nZXRVVENJU09XZWVrL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvZ2V0VVRDSVNPV2Vla1llYXIvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvX2xpYi9zZXRVVENEYXkvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvX2xpYi9zZXRVVENJU09EYXkvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvX2xpYi9zZXRVVENJU09XZWVrL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvc2V0VVRDSVNPV2Vla1llYXIvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvX2xpYi9zdGFydE9mVVRDSVNPV2Vlay9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9fbGliL3N0YXJ0T2ZVVENJU09XZWVrWWVhci9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9hZGRNaWxsaXNlY29uZHMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvYWRkTWludXRlcy9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9mb3JtYXQvX2xpYi9mb3JtYXR0ZXJzL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2Zvcm1hdC9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc1ZhbGlkL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9fbGliL2J1aWxkRm9ybWF0TG9uZ0ZuL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9fbGliL2J1aWxkTG9jYWxpemVBcnJheUZuL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9fbGliL2J1aWxkTG9jYWxpemVGbi9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvX2xpYi9idWlsZE1hdGNoRm4vaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL19saWIvYnVpbGRNYXRjaFBhdHRlcm5Gbi9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvX2xpYi9idWlsZFBhcnNlRm4vaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL19saWIvcGFyc2VEZWNpbWFsL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9lbi1VUy9fbGliL2Zvcm1hdERpc3RhbmNlL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9lbi1VUy9fbGliL2Zvcm1hdExvbmcvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL2VuLVVTL19saWIvZm9ybWF0UmVsYXRpdmUvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL2VuLVVTL19saWIvbG9jYWxpemUvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL2VuLVVTL19saWIvbWF0Y2gvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL2VuLVVTL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3BhcnNlL19saWIvcGFyc2Vycy9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9wYXJzZS9fbGliL3VuaXRzL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3BhcnNlL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N1Yk1pbnV0ZXMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvdG9EYXRlL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N0cmluZy1tYXNrL3NyYy9zdHJpbmctbWFzay5qcyIsImFuZ3VsYXItaW5wdXQtbWFza3MuanMiLCJici9ib2xldG8tYmFuY2FyaW8vYm9sZXRvLWJhbmNhcmlvLmpzIiwiYnIvYnItbWFza3MuanMiLCJici9jYXItcGxhdGUvY2FyLXBsYXRlLmpzIiwiYnIvY2VwL2NlcC5qcyIsImJyL2NucGovY25wai5qcyIsImJyL2NwZi1jbnBqL2NwZi1jbnBqLmpzIiwiYnIvY3BmL2NwZi5qcyIsImJyL2luc2NyaWNhby1lc3RhZHVhbC9pZS5qcyIsImJyL25mZS9uZmUuanMiLCJici9waG9uZS9ici1waG9uZS5qcyIsImNoL2NoLW1hc2tzLmpzIiwiY2gvcGhvbmUvY2gtcGhvbmUuanMiLCJmci9mci1tYXNrcy5qcyIsImZyL3Bob25lL2ZyLXBob25lLmpzIiwiZ2xvYmFsL2NyZWRpdC1jYXJkL2NyZWRpdC1jYXJkLmpzIiwiZ2xvYmFsL2RhdGUvZGF0ZS5qcyIsImdsb2JhbC9nbG9iYWwtbWFza3MuanMiLCJnbG9iYWwvbW9uZXkvbW9uZXkuanMiLCJnbG9iYWwvbnVtYmVyL251bWJlci5qcyIsImdsb2JhbC9wZXJjZW50YWdlL3BlcmNlbnRhZ2UuanMiLCJnbG9iYWwvc2NpZW50aWZpYy1ub3RhdGlvbi9zY2llbnRpZmljLW5vdGF0aW9uLmpzIiwiZ2xvYmFsL3RpbWUvdGltZS5qcyIsImhlbHBlcnMvbWFzay1mYWN0b3J5LmpzIiwiaGVscGVycy9udW1iZXItbWFzay1idWlsZGVyLmpzIiwiaGVscGVycy9wcmUtZm9ybWF0dGVycy5qcyIsImhlbHBlcnMvdmFsaWRhdG9ycy5qcyIsInVzL3Bob25lL3VzLXBob25lLmpzIiwidXMvdXMtbWFza3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNXBCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4YkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25VQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qKlxuICogYnItdmFsaWRhdGlvbnNcbiAqIEEgbGlicmFyeSBvZiB2YWxpZGF0aW9ucyBhcHBsaWNhYmxlIHRvIHNldmVyYWwgQnJhemlsaWFuIGRhdGEgbGlrZSBJLkUuLCBDTlBKLCBDUEYgYW5kIG90aGVyc1xuICogQHZlcnNpb24gdjAuMy4wXG4gKiBAbGluayBodHRwOi8vZ2l0aHViLmNvbS90aGUtZGFyYy9ici12YWxpZGF0aW9uc1xuICogQGxpY2Vuc2UgTUlUXG4gKi9cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHQvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG5cdFx0Ly8gTm9kZS4gRG9lcyBub3Qgd29yayB3aXRoIHN0cmljdCBDb21tb25KUywgYnV0XG5cdFx0Ly8gb25seSBDb21tb25KUy1saWtlIGVudmlyb25tZW50cyB0aGF0IHN1cHBvcnQgbW9kdWxlLmV4cG9ydHMsXG5cdFx0Ly8gbGlrZSBOb2RlLlxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIEJyb3dzZXIgZ2xvYmFscyAocm9vdCBpcyB3aW5kb3cpXG5cdFx0cm9vdC5CclYgPSBmYWN0b3J5KCk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xudmFyIENOUEogPSB7fTtcblxuQ05QSi52YWxpZGF0ZSA9IGZ1bmN0aW9uKGMpIHtcblx0dmFyIGIgPSBbNiw1LDQsMywyLDksOCw3LDYsNSw0LDMsMl07XG5cdGMgPSBjLnJlcGxhY2UoL1teXFxkXS9nLCcnKTtcblxuXHR2YXIgciA9IC9eKDB7MTR9fDF7MTR9fDJ7MTR9fDN7MTR9fDR7MTR9fDV7MTR9fDZ7MTR9fDd7MTR9fDh7MTR9fDl7MTR9KSQvO1xuXHRpZiAoIWMgfHwgYy5sZW5ndGggIT09IDE0IHx8IHIudGVzdChjKSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRjID0gYy5zcGxpdCgnJyk7XG5cblx0Zm9yICh2YXIgaSA9IDAsIG4gPSAwOyBpIDwgMTI7IGkrKykge1xuXHRcdG4gKz0gY1tpXSAqIGJbaSsxXTtcblx0fVxuXHRuID0gMTEgLSBuJTExO1xuXHRuID0gbiA+PSAxMCA/IDAgOiBuO1xuXHRpZiAocGFyc2VJbnQoY1sxMl0pICE9PSBuKSAge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGZvciAoaSA9IDAsIG4gPSAwOyBpIDw9IDEyOyBpKyspIHtcblx0XHRuICs9IGNbaV0gKiBiW2ldO1xuXHR9XG5cdG4gPSAxMSAtIG4lMTE7XG5cdG4gPSBuID49IDEwID8gMCA6IG47XG5cdGlmIChwYXJzZUludChjWzEzXSkgIT09IG4pICB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHJldHVybiB0cnVlO1xufTtcblxuXG52YXIgQ1BGID0ge307XG5cbkNQRi52YWxpZGF0ZSA9IGZ1bmN0aW9uKGNwZikge1xuXHRjcGYgPSBjcGYucmVwbGFjZSgvW15cXGRdKy9nLCcnKTtcblx0dmFyIHIgPSAvXigwezExfXwxezExfXwyezExfXwzezExfXw0ezExfXw1ezExfXw2ezExfXw3ezExfXw4ezExfXw5ezExfSkkLztcblx0aWYgKCFjcGYgfHwgY3BmLmxlbmd0aCAhPT0gMTEgfHwgci50ZXN0KGNwZikpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0ZnVuY3Rpb24gdmFsaWRhdGVEaWdpdChkaWdpdCkge1xuXHRcdHZhciBhZGQgPSAwO1xuXHRcdHZhciBpbml0ID0gZGlnaXQgLSA5O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgOTsgaSArKykge1xuXHRcdFx0YWRkICs9IHBhcnNlSW50KGNwZi5jaGFyQXQoaSArIGluaXQpKSAqIChpKzEpO1xuXHRcdH1cblx0XHRyZXR1cm4gKGFkZCUxMSklMTAgPT09IHBhcnNlSW50KGNwZi5jaGFyQXQoZGlnaXQpKTtcblx0fVxuXHRyZXR1cm4gdmFsaWRhdGVEaWdpdCg5KSAmJiB2YWxpZGF0ZURpZ2l0KDEwKTtcbn07XG5cbnZhciBJRSA9IGZ1bmN0aW9uKHVmKSB7XG5cdGlmICghKHRoaXMgaW5zdGFuY2VvZiBJRSkpIHtcblx0XHRyZXR1cm4gbmV3IElFKHVmKTtcblx0fVxuXG5cdHRoaXMucnVsZXMgPSBJRXJ1bGVzW3VmXSB8fCBbXTtcblx0dGhpcy5ydWxlO1xuXHRJRS5wcm90b3R5cGUuX2RlZmluZVJ1bGUgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdHRoaXMucnVsZSA9IHVuZGVmaW5lZDtcblx0XHRmb3IgKHZhciByID0gMDsgciA8IHRoaXMucnVsZXMubGVuZ3RoICYmIHRoaXMucnVsZSA9PT0gdW5kZWZpbmVkOyByKyspIHtcblx0XHRcdHZhciBzdHIgPSB2YWx1ZS5yZXBsYWNlKC9bXlxcZF0vZywnJyk7XG5cdFx0XHR2YXIgcnVsZUNhbmRpZGF0ZSA9IHRoaXMucnVsZXNbcl07XG5cdFx0XHRpZiAoc3RyLmxlbmd0aCA9PT0gcnVsZUNhbmRpZGF0ZS5jaGFycyAmJiAoIXJ1bGVDYW5kaWRhdGUubWF0Y2ggfHwgcnVsZUNhbmRpZGF0ZS5tYXRjaC50ZXN0KHZhbHVlKSkpIHtcblx0XHRcdFx0dGhpcy5ydWxlID0gcnVsZUNhbmRpZGF0ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuICEhdGhpcy5ydWxlO1xuXHR9O1xuXG5cdElFLnByb3RvdHlwZS52YWxpZGF0ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0aWYgKCF2YWx1ZSB8fCAhdGhpcy5fZGVmaW5lUnVsZSh2YWx1ZSkpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMucnVsZS52YWxpZGF0ZSh2YWx1ZSk7XG5cdH07XG59O1xuXG52YXIgSUVydWxlcyA9IHt9O1xuXG52YXIgYWxnb3JpdGhtU3RlcHMgPSB7XG5cdGhhbmRsZVN0cjoge1xuXHRcdG9ubHlOdW1iZXJzOiBmdW5jdGlvbihzdHIpIHtcblx0XHRcdHJldHVybiBzdHIucmVwbGFjZSgvW15cXGRdL2csJycpLnNwbGl0KCcnKTtcblx0XHR9LFxuXHRcdG1nU3BlYzogZnVuY3Rpb24oc3RyKSB7XG5cdFx0XHR2YXIgcyA9IHN0ci5yZXBsYWNlKC9bXlxcZF0vZywnJyk7XG5cdFx0XHRzID0gcy5zdWJzdHIoMCwzKSsnMCcrcy5zdWJzdHIoMywgcy5sZW5ndGgpO1xuXHRcdFx0cmV0dXJuIHMuc3BsaXQoJycpO1xuXHRcdH1cblx0fSxcblx0c3VtOiB7XG5cdFx0bm9ybWFsU3VtOiBmdW5jdGlvbihoYW5kbGVkU3RyLCBwZXNvcykge1xuXHRcdFx0dmFyIG51bXMgPSBoYW5kbGVkU3RyO1xuXHRcdFx0dmFyIHN1bSA9IDA7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHBlc29zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHN1bSArPSBwYXJzZUludChudW1zW2ldKSAqIHBlc29zW2ldO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN1bTtcblx0XHR9LFxuXHRcdGluZGl2aWR1YWxTdW06IGZ1bmN0aW9uKGhhbmRsZWRTdHIsIHBlc29zKSB7XG5cdFx0XHR2YXIgbnVtcyA9IGhhbmRsZWRTdHI7XG5cdFx0XHR2YXIgc3VtID0gMDtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcGVzb3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIG11bHQgPSBwYXJzZUludChudW1zW2ldKSAqIHBlc29zW2ldO1xuXHRcdFx0XHRzdW0gKz0gbXVsdCUxMCArIHBhcnNlSW50KG11bHQvMTApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN1bTtcblx0XHR9LFxuXHRcdGFwU3BlYzogZnVuY3Rpb24oaGFuZGxlZFN0ciwgcGVzb3MpIHtcblx0XHRcdHZhciBzdW0gPSB0aGlzLm5vcm1hbFN1bShoYW5kbGVkU3RyLCBwZXNvcyk7XG5cdFx0XHR2YXIgcmVmID0gaGFuZGxlZFN0ci5qb2luKCcnKTtcblx0XHRcdGlmIChyZWYgPj0gJzAzMDAwMDAxMCcgJiYgcmVmIDw9ICcwMzAxNzAwMDknKSB7XG5cdFx0XHRcdHJldHVybiBzdW0gKyA1O1xuXHRcdFx0fVxuXHRcdFx0aWYgKHJlZiA+PSAnMDMwMTcwMDEwJyAmJiByZWYgPD0gJzAzMDE5MDIyOScpIHtcblx0XHRcdFx0cmV0dXJuIHN1bSArIDk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3VtO1xuXHRcdH1cblx0fSxcblx0cmVzdDoge1xuXHRcdG1vZDExOiBmdW5jdGlvbihzdW0pIHtcblx0XHRcdHJldHVybiBzdW0lMTE7XG5cdFx0fSxcblx0XHRtb2QxMDogZnVuY3Rpb24oc3VtKSB7XG5cdFx0XHRyZXR1cm4gc3VtJTEwO1xuXHRcdH0sXG5cdFx0bW9kOTogZnVuY3Rpb24oc3VtKSB7XG5cdFx0XHRyZXR1cm4gc3VtJTk7XG5cdFx0fVxuXHR9LFxuXHRleHBlY3RlZERWOiB7XG5cdFx0bWludXNSZXN0T2YxMTogZnVuY3Rpb24ocmVzdCkge1xuXHRcdFx0cmV0dXJuIHJlc3QgPCAyID8gMCA6IDExIC0gcmVzdDtcblx0XHR9LFxuXHRcdG1pbnVzUmVzdE9mMTF2MjogZnVuY3Rpb24ocmVzdCkge1xuXHRcdFx0cmV0dXJuIHJlc3QgPCAyID8gMTEgLSByZXN0IC0gMTAgOiAxMSAtIHJlc3Q7XG5cdFx0fSxcblx0XHRtaW51c1Jlc3RPZjEwOiBmdW5jdGlvbihyZXN0KSB7XG5cdFx0XHRyZXR1cm4gcmVzdCA8IDEgPyAwIDogMTAgLSByZXN0O1xuXHRcdH0sXG5cdFx0bW9kMTA6IGZ1bmN0aW9uKHJlc3QpIHtcblx0XHRcdHJldHVybiByZXN0JTEwO1xuXHRcdH0sXG5cdFx0Z29TcGVjOiBmdW5jdGlvbihyZXN0LCBoYW5kbGVkU3RyKSB7XG5cdFx0XHR2YXIgcmVmID0gaGFuZGxlZFN0ci5qb2luKCcnKTtcblx0XHRcdGlmIChyZXN0ID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiByZWYgPj0gJzEwMTAzMTA1MCcgJiYgcmVmIDw9ICcxMDExOTk5NzknID8gMSA6IDA7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmVzdCA9PT0gMCA/IDAgOiAxMSAtIHJlc3Q7XG5cdFx0fSxcblx0XHRhcFNwZWM6IGZ1bmN0aW9uKHJlc3QsIGhhbmRsZWRTdHIpIHtcblx0XHRcdHZhciByZWYgPSBoYW5kbGVkU3RyLmpvaW4oJycpO1xuXHRcdFx0aWYgKHJlc3QgPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIHJlZiA+PSAnMDMwMTcwMDEwJyAmJiByZWYgPD0gJzAzMDE5MDIyOScgPyAxIDogMDtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXN0ID09PSAxID8gMCA6IDExIC0gcmVzdDtcblx0XHR9LFxuXHRcdHZvaWRGbjogZnVuY3Rpb24ocmVzdCkge1xuXHRcdFx0cmV0dXJuIHJlc3Q7XG5cdFx0fVxuXHR9XG59O1xuXG5cbi8qKlxuICogb3B0aW9ucyB7XG4gKiAgICAgcGVzb3M6IEFycmF5IG9mIHZhbHVlcyB1c2VkIHRvIG9wZXJhdGUgaW4gc3VtIHN0ZXBcbiAqICAgICBkdlBvczogUG9zaXRpb24gb2YgdGhlIERWIHRvIHZhbGlkYXRlIGNvbnNpZGVyaW5nIHRoZSBoYW5kbGVkU3RyXG4gKiAgICAgYWxnb3JpdGhtU3RlcHM6IFRoZSBmb3VyIERWJ3MgdmFsaWRhdGlvbiBhbGdvcml0aG0gc3RlcHMgbmFtZXNcbiAqIH1cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVEVih2YWx1ZSwgb3B0aW9ucykge1xuXHR2YXIgc3RlcHMgPSBvcHRpb25zLmFsZ29yaXRobVN0ZXBzO1xuXG5cdC8vIFN0ZXAgMDE6IEhhbmRsZSBTdHJpbmdcblx0dmFyIGhhbmRsZWRTdHIgPSBhbGdvcml0aG1TdGVwcy5oYW5kbGVTdHJbc3RlcHNbMF1dKHZhbHVlKTtcblxuXHQvLyBTdGVwIDAyOiBTdW0gY2hhcnNcblx0dmFyIHN1bSA9IGFsZ29yaXRobVN0ZXBzLnN1bVtzdGVwc1sxXV0oaGFuZGxlZFN0ciwgb3B0aW9ucy5wZXNvcyk7XG5cblx0Ly8gU3RlcCAwMzogUmVzdCBjYWxjdWxhdGlvblxuXHR2YXIgcmVzdCA9IGFsZ29yaXRobVN0ZXBzLnJlc3Rbc3RlcHNbMl1dKHN1bSk7XG5cblx0Ly8gRml4ZWQgU3RlcDogR2V0IGN1cnJlbnQgRFZcblx0dmFyIGN1cnJlbnREViA9IHBhcnNlSW50KGhhbmRsZWRTdHJbb3B0aW9ucy5kdnBvc10pO1xuXG5cdC8vIFN0ZXAgMDQ6IEV4cGVjdGVkIERWIGNhbGN1bGF0aW9uXG5cdHZhciBleHBlY3RlZERWID0gYWxnb3JpdGhtU3RlcHMuZXhwZWN0ZWREVltzdGVwc1szXV0ocmVzdCwgaGFuZGxlZFN0cik7XG5cblx0Ly8gRml4ZWQgc3RlcDogRFYgdmVyaWZpY2F0aW9uXG5cdHJldHVybiBjdXJyZW50RFYgPT09IGV4cGVjdGVkRFY7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlSUUodmFsdWUsIHJ1bGUpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBydWxlLmR2cy5sZW5ndGg7IGkrKykge1xuXHRcdC8vIGNvbnNvbGUubG9nKCc+PiA+PiBkdicraSk7XG5cdFx0aWYgKCF2YWxpZGF0ZURWKHZhbHVlLCBydWxlLmR2c1tpXSkpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRydWU7XG59XG5cbklFcnVsZXMuUEUgPSBbe1xuXHQvL21hc2s6IG5ldyBTdHJpbmdNYXNrKCcwMDAwMDAwLTAwJyksXG5cdGNoYXJzOiA5LFxuXHRkdnM6IFt7XG5cdFx0ZHZwb3M6IDcsXG5cdFx0cGVzb3M6IFs4LDcsNiw1LDQsMywyXSxcblx0XHRhbGdvcml0aG1TdGVwczogWydvbmx5TnVtYmVycycsICdub3JtYWxTdW0nLCAnbW9kMTEnLCAnbWludXNSZXN0T2YxMSddXG5cdH0se1xuXHRcdGR2cG9zOiA4LFxuXHRcdHBlc29zOiBbOSw4LDcsNiw1LDQsMywyXSxcblx0XHRhbGdvcml0aG1TdGVwczogWydvbmx5TnVtYmVycycsICdub3JtYWxTdW0nLCAnbW9kMTEnLCAnbWludXNSZXN0T2YxMSddXG5cdH1dLFxuXHR2YWxpZGF0ZTogZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbGlkYXRlSUUodmFsdWUsIHRoaXMpOyB9XG59LHtcblx0Ly8gbWFzazogbmV3IFN0cmluZ01hc2soJzAwLjAuMDAwLjAwMDAwMDAtMCcpLFxuXHRjaGFyczogMTQsXG5cdHBlc29zOiBbWzEsMiwzLDQsNSw5LDgsNyw2LDUsNCwzLDJdXSxcblx0ZHZzOiBbe1xuXHRcdGR2cG9zOiAxMyxcblx0XHRwZXNvczogWzUsNCwzLDIsMSw5LDgsNyw2LDUsNCwzLDJdLFxuXHRcdGFsZ29yaXRobVN0ZXBzOiBbJ29ubHlOdW1iZXJzJywgJ25vcm1hbFN1bScsICdtb2QxMScsICdtaW51c1Jlc3RPZjExdjInXVxuXHR9XSxcblx0dmFsaWRhdGU6IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWxpZGF0ZUlFKHZhbHVlLCB0aGlzKTsgfVxufV07XG5cbklFcnVsZXMuUlMgPSBbe1xuXHQvLyBtYXNrOiBuZXcgU3RyaW5nTWFzaygnMDAwLzAwMDAwMDAnKSxcblx0Y2hhcnM6IDEwLFxuXHRkdnM6IFt7XG5cdFx0ZHZwb3M6IDksXG5cdFx0cGVzb3M6IFsyLDksOCw3LDYsNSw0LDMsMl0sXG5cdFx0YWxnb3JpdGhtU3RlcHM6IFsnb25seU51bWJlcnMnLCAnbm9ybWFsU3VtJywgJ21vZDExJywgJ21pbnVzUmVzdE9mMTEnXVxuXHR9XSxcblx0dmFsaWRhdGU6IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWxpZGF0ZUlFKHZhbHVlLCB0aGlzKTsgfVxufV07XG5cbklFcnVsZXMuQUMgPSBbe1xuXHQvLyBtYXNrOiBuZXcgU3RyaW5nTWFzaygnMDAuMDAwLjAwMC8wMDAtMDAnKSxcblx0Y2hhcnM6IDEzLFxuXHRtYXRjaDogL14wMS8sXG5cdGR2czogW3tcblx0XHRkdnBvczogMTEsXG5cdFx0cGVzb3M6IFs0LDMsMiw5LDgsNyw2LDUsNCwzLDJdLFxuXHRcdGFsZ29yaXRobVN0ZXBzOiBbJ29ubHlOdW1iZXJzJywgJ25vcm1hbFN1bScsICdtb2QxMScsICdtaW51c1Jlc3RPZjExJ11cblx0fSx7XG5cdFx0ZHZwb3M6IDEyLFxuXHRcdHBlc29zOiBbNSw0LDMsMiw5LDgsNyw2LDUsNCwzLDJdLFxuXHRcdGFsZ29yaXRobVN0ZXBzOiBbJ29ubHlOdW1iZXJzJywgJ25vcm1hbFN1bScsICdtb2QxMScsICdtaW51c1Jlc3RPZjExJ11cblx0fV0sXG5cdHZhbGlkYXRlOiBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsaWRhdGVJRSh2YWx1ZSwgdGhpcyk7IH1cbn1dO1xuXG5JRXJ1bGVzLk1HID0gW3tcblx0Ly8gbWFzazogbmV3IFN0cmluZ01hc2soJzAwMC4wMDAuMDAwLzAwMDAnKSxcblx0Y2hhcnM6IDEzLFxuXHRkdnM6IFt7XG5cdFx0ZHZwb3M6IDEyLFxuXHRcdHBlc29zOiBbMSwyLDEsMiwxLDIsMSwyLDEsMiwxLDJdLFxuXHRcdGFsZ29yaXRobVN0ZXBzOiBbJ21nU3BlYycsICdpbmRpdmlkdWFsU3VtJywgJ21vZDEwJywgJ21pbnVzUmVzdE9mMTAnXVxuXHR9LHtcblx0XHRkdnBvczogMTIsXG5cdFx0cGVzb3M6IFszLDIsMTEsMTAsOSw4LDcsNiw1LDQsMywyXSxcblx0XHRhbGdvcml0aG1TdGVwczogWydvbmx5TnVtYmVycycsICdub3JtYWxTdW0nLCAnbW9kMTEnLCAnbWludXNSZXN0T2YxMSddXG5cdH1dLFxuXHR2YWxpZGF0ZTogZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbGlkYXRlSUUodmFsdWUsIHRoaXMpOyB9XG59XTtcblxuSUVydWxlcy5TUCA9IFt7XG5cdC8vIG1hc2s6IG5ldyBTdHJpbmdNYXNrKCcwMDAuMDAwLjAwMC4wMDAnKSxcblx0Y2hhcnM6IDEyLFxuXHRtYXRjaDogL15bMC05XS8sXG5cdGR2czogW3tcblx0XHRkdnBvczogOCxcblx0XHRwZXNvczogWzEsMyw0LDUsNiw3LDgsMTBdLFxuXHRcdGFsZ29yaXRobVN0ZXBzOiBbJ29ubHlOdW1iZXJzJywgJ25vcm1hbFN1bScsICdtb2QxMScsICdtb2QxMCddXG5cdH0se1xuXHRcdGR2cG9zOiAxMSxcblx0XHRwZXNvczogWzMsMiwxMCw5LDgsNyw2LDUsNCwzLDJdLFxuXHRcdGFsZ29yaXRobVN0ZXBzOiBbJ29ubHlOdW1iZXJzJywgJ25vcm1hbFN1bScsICdtb2QxMScsICdtb2QxMCddXG5cdH1dLFxuXHR2YWxpZGF0ZTogZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbGlkYXRlSUUodmFsdWUsIHRoaXMpOyB9XG59LHtcblx0Ly8gbWFzazogbmV3IFN0cmluZ01hc2soJ1AtMDAwMDAwMDAuMC8wMDAnKVxuXHRjaGFyczogMTIsXG5cdG1hdGNoOiAvXlAvaSxcblx0ZHZzOiBbe1xuXHRcdGR2cG9zOiA4LFxuXHRcdHBlc29zOiBbMSwzLDQsNSw2LDcsOCwxMF0sXG5cdFx0YWxnb3JpdGhtU3RlcHM6IFsnb25seU51bWJlcnMnLCAnbm9ybWFsU3VtJywgJ21vZDExJywgJ21vZDEwJ11cblx0fV0sXG5cdHZhbGlkYXRlOiBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsaWRhdGVJRSh2YWx1ZSwgdGhpcyk7IH1cbn1dO1xuXG5JRXJ1bGVzLkRGID0gW3tcblx0Ly8gbWFzazogbmV3IFN0cmluZ01hc2soJzAwMDAwMDAwMDAwLTAwJyksXG5cdGNoYXJzOiAxMyxcblx0ZHZzOiBbe1xuXHRcdGR2cG9zOiAxMSxcblx0XHRwZXNvczogWzQsMywyLDksOCw3LDYsNSw0LDMsMl0sXG5cdFx0YWxnb3JpdGhtU3RlcHM6IFsnb25seU51bWJlcnMnLCAnbm9ybWFsU3VtJywgJ21vZDExJywgJ21pbnVzUmVzdE9mMTEnXVxuXHR9LHtcblx0XHRkdnBvczogMTIsXG5cdFx0cGVzb3M6IFs1LDQsMywyLDksOCw3LDYsNSw0LDMsMl0sXG5cdFx0YWxnb3JpdGhtU3RlcHM6IFsnb25seU51bWJlcnMnLCAnbm9ybWFsU3VtJywgJ21vZDExJywgJ21pbnVzUmVzdE9mMTEnXVxuXHR9XSxcblx0dmFsaWRhdGU6IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWxpZGF0ZUlFKHZhbHVlLCB0aGlzKTsgfVxufV07XG5cbklFcnVsZXMuRVMgPSBbe1xuXHQvLyBtYXNrOiBuZXcgU3RyaW5nTWFzaygnMDAwLjAwMC4wMC0wJylcblx0Y2hhcnM6IDksXG5cdGR2czogW3tcblx0XHRkdnBvczogOCxcblx0XHRwZXNvczogWzksOCw3LDYsNSw0LDMsMl0sXG5cdFx0YWxnb3JpdGhtU3RlcHM6IFsnb25seU51bWJlcnMnLCAnbm9ybWFsU3VtJywgJ21vZDExJywgJ21pbnVzUmVzdE9mMTEnXVxuXHR9XSxcblx0dmFsaWRhdGU6IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWxpZGF0ZUlFKHZhbHVlLCB0aGlzKTsgfVxufV07XG5cbklFcnVsZXMuQkEgPSBbe1xuXHQvLyBtYXNrOiBuZXcgU3RyaW5nTWFzaygnMDAwMDAwLTAwJylcblx0Y2hhcnM6IDgsXG5cdG1hdGNoOiAvXlswMTIzNDU4XS8sXG5cdGR2czogW3tcblx0XHRkdnBvczogNyxcblx0XHRwZXNvczogWzcsNiw1LDQsMywyXSxcblx0XHRhbGdvcml0aG1TdGVwczogWydvbmx5TnVtYmVycycsICdub3JtYWxTdW0nLCAnbW9kMTAnLCAnbWludXNSZXN0T2YxMCddXG5cdH0se1xuXHRcdGR2cG9zOiA2LFxuXHRcdHBlc29zOiBbOCw3LDYsNSw0LDMsMCwyXSxcblx0XHRhbGdvcml0aG1TdGVwczogWydvbmx5TnVtYmVycycsICdub3JtYWxTdW0nLCAnbW9kMTAnLCAnbWludXNSZXN0T2YxMCddXG5cdH1dLFxuXHR2YWxpZGF0ZTogZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbGlkYXRlSUUodmFsdWUsIHRoaXMpOyB9XG59LHtcblx0Y2hhcnM6IDgsXG5cdG1hdGNoOiAvXls2NzldLyxcblx0ZHZzOiBbe1xuXHRcdGR2cG9zOiA3LFxuXHRcdHBlc29zOiBbNyw2LDUsNCwzLDJdLFxuXHRcdGFsZ29yaXRobVN0ZXBzOiBbJ29ubHlOdW1iZXJzJywgJ25vcm1hbFN1bScsICdtb2QxMScsICdtaW51c1Jlc3RPZjExJ11cblx0fSx7XG5cdFx0ZHZwb3M6IDYsXG5cdFx0cGVzb3M6IFs4LDcsNiw1LDQsMywwLDJdLFxuXHRcdGFsZ29yaXRobVN0ZXBzOiBbJ29ubHlOdW1iZXJzJywgJ25vcm1hbFN1bScsICdtb2QxMScsICdtaW51c1Jlc3RPZjExJ11cblx0fV0sXG5cdHZhbGlkYXRlOiBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsaWRhdGVJRSh2YWx1ZSwgdGhpcyk7IH1cbn0se1xuXHQvLyBtYXNrOiBuZXcgU3RyaW5nTWFzaygnMDAwMDAwMC0wMCcpXG5cdGNoYXJzOiA5LFxuXHRtYXRjaDogL15bMC05XVswMTIzNDU4XS8sXG5cdGR2czogW3tcblx0XHRkdnBvczogOCxcblx0XHRwZXNvczogWzgsNyw2LDUsNCwzLDJdLFxuXHRcdGFsZ29yaXRobVN0ZXBzOiBbJ29ubHlOdW1iZXJzJywgJ25vcm1hbFN1bScsICdtb2QxMCcsICdtaW51c1Jlc3RPZjEwJ11cblx0fSx7XG5cdFx0ZHZwb3M6IDcsXG5cdFx0cGVzb3M6IFs5LDgsNyw2LDUsNCwzLDAsMl0sXG5cdFx0YWxnb3JpdGhtU3RlcHM6IFsnb25seU51bWJlcnMnLCAnbm9ybWFsU3VtJywgJ21vZDEwJywgJ21pbnVzUmVzdE9mMTAnXVxuXHR9XSxcblx0dmFsaWRhdGU6IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWxpZGF0ZUlFKHZhbHVlLCB0aGlzKTsgfVxufSx7XG5cdGNoYXJzOiA5LFxuXHRtYXRjaDogL15bMC05XVs2NzldLyxcblx0ZHZzOiBbe1xuXHRcdGR2cG9zOiA4LFxuXHRcdHBlc29zOiBbOCw3LDYsNSw0LDMsMl0sXG5cdFx0YWxnb3JpdGhtU3RlcHM6IFsnb25seU51bWJlcnMnLCAnbm9ybWFsU3VtJywgJ21vZDExJywgJ21pbnVzUmVzdE9mMTEnXVxuXHR9LHtcblx0XHRkdnBvczogNyxcblx0XHRwZXNvczogWzksOCw3LDYsNSw0LDMsMCwyXSxcblx0XHRhbGdvcml0aG1TdGVwczogWydvbmx5TnVtYmVycycsICdub3JtYWxTdW0nLCAnbW9kMTEnLCAnbWludXNSZXN0T2YxMSddXG5cdH1dLFxuXHR2YWxpZGF0ZTogZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbGlkYXRlSUUodmFsdWUsIHRoaXMpOyB9XG59XTtcblxuSUVydWxlcy5BTSA9IFt7XG5cdC8vbWFzazogbmV3IFN0cmluZ01hc2soJzAwLjAwMC4wMDAtMCcpXG5cdGNoYXJzOiA5LFxuXHRkdnM6IFt7XG5cdFx0ZHZwb3M6IDgsXG5cdFx0cGVzb3M6IFs5LDgsNyw2LDUsNCwzLDJdLFxuXHRcdGFsZ29yaXRobVN0ZXBzOiBbJ29ubHlOdW1iZXJzJywgJ25vcm1hbFN1bScsICdtb2QxMScsICdtaW51c1Jlc3RPZjExJ11cblx0fV0sXG5cdHZhbGlkYXRlOiBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsaWRhdGVJRSh2YWx1ZSwgdGhpcyk7IH1cbn1dO1xuXG5JRXJ1bGVzLlJOID0gW3tcblx0Ly8ge21hc2s6IG5ldyBTdHJpbmdNYXNrKCcwMC4wMDAuMDAwLTAnKVxuXHRjaGFyczogOSxcblx0bWF0Y2g6IC9eMjAvLFxuXHRkdnM6IFt7XG5cdFx0ZHZwb3M6IDgsXG5cdFx0cGVzb3M6IFs5LDgsNyw2LDUsNCwzLDJdLFxuXHRcdGFsZ29yaXRobVN0ZXBzOiBbJ29ubHlOdW1iZXJzJywgJ25vcm1hbFN1bScsICdtb2QxMScsICdtaW51c1Jlc3RPZjExJ11cblx0fV0sXG5cdHZhbGlkYXRlOiBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsaWRhdGVJRSh2YWx1ZSwgdGhpcyk7IH1cbn0se1xuXHQvLyB7bWFzazogbmV3IFN0cmluZ01hc2soJzAwLjAuMDAwLjAwMC0wJyksIGNoYXJzOiAxMH1cblx0Y2hhcnM6IDEwLFxuXHRtYXRjaDogL14yMC8sXG5cdGR2czogW3tcblx0XHRkdnBvczogOCxcblx0XHRwZXNvczogWzEwLDksOCw3LDYsNSw0LDMsMl0sXG5cdFx0YWxnb3JpdGhtU3RlcHM6IFsnb25seU51bWJlcnMnLCAnbm9ybWFsU3VtJywgJ21vZDExJywgJ21pbnVzUmVzdE9mMTEnXVxuXHR9XSxcblx0dmFsaWRhdGU6IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWxpZGF0ZUlFKHZhbHVlLCB0aGlzKTsgfVxufV07XG5cbklFcnVsZXMuUk8gPSBbe1xuXHQvLyBtYXNrOiBuZXcgU3RyaW5nTWFzaygnMDAwMDAwMDAwMDAwMC0wJylcblx0Y2hhcnM6IDE0LFxuXHRkdnM6IFt7XG5cdFx0ZHZwb3M6IDEzLFxuXHRcdHBlc29zOiBbNiw1LDQsMywyLDksOCw3LDYsNSw0LDMsMl0sXG5cdFx0YWxnb3JpdGhtU3RlcHM6IFsnb25seU51bWJlcnMnLCAnbm9ybWFsU3VtJywgJ21vZDExJywgJ21pbnVzUmVzdE9mMTF2MiddXG5cdH1dLFxuXHR2YWxpZGF0ZTogZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbGlkYXRlSUUodmFsdWUsIHRoaXMpOyB9XG59XTtcblxuSUVydWxlcy5QUiA9IFt7XG5cdC8vIG1hc2s6IG5ldyBTdHJpbmdNYXNrKCcwMDAwMDAwMC0wMCcpXG5cdGNoYXJzOiAxMCxcblx0ZHZzOiBbe1xuXHRcdGR2cG9zOiA4LFxuXHRcdHBlc29zOiBbMywyLDcsNiw1LDQsMywyXSxcblx0XHRhbGdvcml0aG1TdGVwczogWydvbmx5TnVtYmVycycsICdub3JtYWxTdW0nLCAnbW9kMTEnLCAnbWludXNSZXN0T2YxMSddXG5cdH0se1xuXHRcdGR2cG9zOiA5LFxuXHRcdHBlc29zOiBbNCwzLDIsNyw2LDUsNCwzLDJdLFxuXHRcdGFsZ29yaXRobVN0ZXBzOiBbJ29ubHlOdW1iZXJzJywgJ25vcm1hbFN1bScsICdtb2QxMScsICdtaW51c1Jlc3RPZjExJ11cblx0fV0sXG5cdHZhbGlkYXRlOiBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsaWRhdGVJRSh2YWx1ZSwgdGhpcyk7IH1cbn1dO1xuXG5JRXJ1bGVzLlNDID0gW3tcblx0Ly8ge21hc2s6IG5ldyBTdHJpbmdNYXNrKCcwMDAuMDAwLjAwMCcpLCB1ZjogJ1NBTlRBIENBVEFSSU5BJ31cblx0Y2hhcnM6IDksXG5cdGR2czogW3tcblx0XHRkdnBvczogOCxcblx0XHRwZXNvczogWzksOCw3LDYsNSw0LDMsMl0sXG5cdFx0YWxnb3JpdGhtU3RlcHM6IFsnb25seU51bWJlcnMnLCAnbm9ybWFsU3VtJywgJ21vZDExJywgJ21pbnVzUmVzdE9mMTEnXVxuXHR9XSxcblx0dmFsaWRhdGU6IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWxpZGF0ZUlFKHZhbHVlLCB0aGlzKTsgfVxufV07XG5cbklFcnVsZXMuUkogPSBbe1xuXHQvLyB7bWFzazogbmV3IFN0cmluZ01hc2soJzAwLjAwMC4wMC0wJyksIHVmOiAnUklPIERFIEpBTkVJUk8nfVxuXHRjaGFyczogOCxcblx0ZHZzOiBbe1xuXHRcdGR2cG9zOiA3LFxuXHRcdHBlc29zOiBbMiw3LDYsNSw0LDMsMl0sXG5cdFx0YWxnb3JpdGhtU3RlcHM6IFsnb25seU51bWJlcnMnLCAnbm9ybWFsU3VtJywgJ21vZDExJywgJ21pbnVzUmVzdE9mMTEnXVxuXHR9XSxcblx0dmFsaWRhdGU6IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWxpZGF0ZUlFKHZhbHVlLCB0aGlzKTsgfVxufV07XG5cbklFcnVsZXMuUEEgPSBbe1xuXHQvLyB7bWFzazogbmV3IFN0cmluZ01hc2soJzAwLTAwMDAwMC0wJylcblx0Y2hhcnM6IDksXG5cdG1hdGNoOiAvXjE1Lyxcblx0ZHZzOiBbe1xuXHRcdGR2cG9zOiA4LFxuXHRcdHBlc29zOiBbOSw4LDcsNiw1LDQsMywyXSxcblx0XHRhbGdvcml0aG1TdGVwczogWydvbmx5TnVtYmVycycsICdub3JtYWxTdW0nLCAnbW9kMTEnLCAnbWludXNSZXN0T2YxMSddXG5cdH1dLFxuXHR2YWxpZGF0ZTogZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbGlkYXRlSUUodmFsdWUsIHRoaXMpOyB9XG59XTtcblxuSUVydWxlcy5TRSA9IFt7XG5cdC8vIHttYXNrOiBuZXcgU3RyaW5nTWFzaygnMDAwMDAwMDAtMCcpXG5cdGNoYXJzOiA5LFxuXHRkdnM6IFt7XG5cdFx0ZHZwb3M6IDgsXG5cdFx0cGVzb3M6IFs5LDgsNyw2LDUsNCwzLDJdLFxuXHRcdGFsZ29yaXRobVN0ZXBzOiBbJ29ubHlOdW1iZXJzJywgJ25vcm1hbFN1bScsICdtb2QxMScsICdtaW51c1Jlc3RPZjExJ11cblx0fV0sXG5cdHZhbGlkYXRlOiBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsaWRhdGVJRSh2YWx1ZSwgdGhpcyk7IH1cbn1dO1xuXG5JRXJ1bGVzLlBCID0gW3tcblx0Ly8ge21hc2s6IG5ldyBTdHJpbmdNYXNrKCcwMDAwMDAwMC0wJylcblx0Y2hhcnM6IDksXG5cdGR2czogW3tcblx0XHRkdnBvczogOCxcblx0XHRwZXNvczogWzksOCw3LDYsNSw0LDMsMl0sXG5cdFx0YWxnb3JpdGhtU3RlcHM6IFsnb25seU51bWJlcnMnLCAnbm9ybWFsU3VtJywgJ21vZDExJywgJ21pbnVzUmVzdE9mMTEnXVxuXHR9XSxcblx0dmFsaWRhdGU6IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWxpZGF0ZUlFKHZhbHVlLCB0aGlzKTsgfVxufV07XG5cbklFcnVsZXMuQ0UgPSBbe1xuXHQvLyB7bWFzazogbmV3IFN0cmluZ01hc2soJzAwMDAwMDAwLTAnKVxuXHRjaGFyczogOSxcblx0ZHZzOiBbe1xuXHRcdGR2cG9zOiA4LFxuXHRcdHBlc29zOiBbOSw4LDcsNiw1LDQsMywyXSxcblx0XHRhbGdvcml0aG1TdGVwczogWydvbmx5TnVtYmVycycsICdub3JtYWxTdW0nLCAnbW9kMTEnLCAnbWludXNSZXN0T2YxMSddXG5cdH1dLFxuXHR2YWxpZGF0ZTogZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbGlkYXRlSUUodmFsdWUsIHRoaXMpOyB9XG59XTtcblxuSUVydWxlcy5QSSA9IFt7XG5cdC8vIHttYXNrOiBuZXcgU3RyaW5nTWFzaygnMDAwMDAwMDAwJylcblx0Y2hhcnM6IDksXG5cdGR2czogW3tcblx0XHRkdnBvczogOCxcblx0XHRwZXNvczogWzksOCw3LDYsNSw0LDMsMl0sXG5cdFx0YWxnb3JpdGhtU3RlcHM6IFsnb25seU51bWJlcnMnLCAnbm9ybWFsU3VtJywgJ21vZDExJywgJ21pbnVzUmVzdE9mMTEnXVxuXHR9XSxcblx0dmFsaWRhdGU6IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWxpZGF0ZUlFKHZhbHVlLCB0aGlzKTsgfVxufV07XG5cbklFcnVsZXMuTUEgPSBbe1xuXHQvLyB7bWFzazogbmV3IFN0cmluZ01hc2soJzAwMDAwMDAwMCcpXG5cdGNoYXJzOiA5LFxuXHRtYXRjaDogL14xMi8sXG5cdGR2czogW3tcblx0XHRkdnBvczogOCxcblx0XHRwZXNvczogWzksOCw3LDYsNSw0LDMsMl0sXG5cdFx0YWxnb3JpdGhtU3RlcHM6IFsnb25seU51bWJlcnMnLCAnbm9ybWFsU3VtJywgJ21vZDExJywgJ21pbnVzUmVzdE9mMTEnXVxuXHR9XSxcblx0dmFsaWRhdGU6IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWxpZGF0ZUlFKHZhbHVlLCB0aGlzKTsgfVxufV07XG5cbklFcnVsZXMuTVQgPSBbe1xuXHQvLyB7bWFzazogbmV3IFN0cmluZ01hc2soJzAwMDAwMDAwMDAtMCcpXG5cdGNoYXJzOiAxMSxcblx0ZHZzOiBbe1xuXHRcdGR2cG9zOiAxMCxcblx0XHRwZXNvczogWzMsMiw5LDgsNyw2LDUsNCwzLDJdLFxuXHRcdGFsZ29yaXRobVN0ZXBzOiBbJ29ubHlOdW1iZXJzJywgJ25vcm1hbFN1bScsICdtb2QxMScsICdtaW51c1Jlc3RPZjExJ11cblx0fV0sXG5cdHZhbGlkYXRlOiBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsaWRhdGVJRSh2YWx1ZSwgdGhpcyk7IH1cbn1dO1xuXG5JRXJ1bGVzLk1TID0gW3tcblx0Ly8ge21hc2s6IG5ldyBTdHJpbmdNYXNrKCcwMDAwMDAwMDAnKVxuXHRjaGFyczogOSxcblx0bWF0Y2g6IC9eMjgvLFxuXHRkdnM6IFt7XG5cdFx0ZHZwb3M6IDgsXG5cdFx0cGVzb3M6IFs5LDgsNyw2LDUsNCwzLDJdLFxuXHRcdGFsZ29yaXRobVN0ZXBzOiBbJ29ubHlOdW1iZXJzJywgJ25vcm1hbFN1bScsICdtb2QxMScsICdtaW51c1Jlc3RPZjExJ11cblx0fV0sXG5cdHZhbGlkYXRlOiBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsaWRhdGVJRSh2YWx1ZSwgdGhpcyk7IH1cbn1dO1xuXG5JRXJ1bGVzLlRPID0gW3tcblx0Ly8ge21hc2s6IG5ldyBTdHJpbmdNYXNrKCcwMDAwMDAwMDAwMCcpLFxuXHRjaGFyczogMTEsXG5cdG1hdGNoOiAvXlswLTldezJ9KCgwWzEyM10pfCg5OSkpLyxcblx0ZHZzOiBbe1xuXHRcdGR2cG9zOiAxMCxcblx0XHRwZXNvczogWzksOCwwLDAsNyw2LDUsNCwzLDJdLFxuXHRcdGFsZ29yaXRobVN0ZXBzOiBbJ29ubHlOdW1iZXJzJywgJ25vcm1hbFN1bScsICdtb2QxMScsICdtaW51c1Jlc3RPZjExJ11cblx0fV0sXG5cdHZhbGlkYXRlOiBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsaWRhdGVJRSh2YWx1ZSwgdGhpcyk7IH1cbn1dO1xuXG5JRXJ1bGVzLkFMID0gW3tcblx0Ly8ge21hc2s6IG5ldyBTdHJpbmdNYXNrKCcwMDAwMDAwMDAnKVxuXHRjaGFyczogOSxcblx0bWF0Y2g6IC9eMjRbMDM1NzhdLyxcblx0ZHZzOiBbe1xuXHRcdGR2cG9zOiA4LFxuXHRcdHBlc29zOiBbOSw4LDcsNiw1LDQsMywyXSxcblx0XHRhbGdvcml0aG1TdGVwczogWydvbmx5TnVtYmVycycsICdub3JtYWxTdW0nLCAnbW9kMTEnLCAnbWludXNSZXN0T2YxMSddXG5cdH1dLFxuXHR2YWxpZGF0ZTogZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbGlkYXRlSUUodmFsdWUsIHRoaXMpOyB9XG59XTtcblxuSUVydWxlcy5SUiA9IFt7XG5cdC8vIHttYXNrOiBuZXcgU3RyaW5nTWFzaygnMDAwMDAwMDAtMCcpXG5cdGNoYXJzOiA5LFxuXHRtYXRjaDogL14yNC8sXG5cdGR2czogW3tcblx0XHRkdnBvczogOCxcblx0XHRwZXNvczogWzEsMiwzLDQsNSw2LDcsOF0sXG5cdFx0YWxnb3JpdGhtU3RlcHM6IFsnb25seU51bWJlcnMnLCAnbm9ybWFsU3VtJywgJ21vZDknLCAndm9pZEZuJ11cblx0fV0sXG5cdHZhbGlkYXRlOiBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsaWRhdGVJRSh2YWx1ZSwgdGhpcyk7IH1cbn1dO1xuXG5JRXJ1bGVzLkdPID0gW3tcblx0Ly8ge21hc2s6IG5ldyBTdHJpbmdNYXNrKCcwMC4wMDAuMDAwLTAnKVxuXHRjaGFyczogOSxcblx0bWF0Y2g6IC9eMVswMTVdLyxcblx0ZHZzOiBbe1xuXHRcdGR2cG9zOiA4LFxuXHRcdHBlc29zOiBbOSw4LDcsNiw1LDQsMywyXSxcblx0XHRhbGdvcml0aG1TdGVwczogWydvbmx5TnVtYmVycycsICdub3JtYWxTdW0nLCAnbW9kMTEnLCAnZ29TcGVjJ11cblx0fV0sXG5cdHZhbGlkYXRlOiBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsaWRhdGVJRSh2YWx1ZSwgdGhpcyk7IH1cbn1dO1xuXG5JRXJ1bGVzLkFQID0gW3tcblx0Ly8ge21hc2s6IG5ldyBTdHJpbmdNYXNrKCcwMDAwMDAwMDAnKVxuXHRjaGFyczogOSxcblx0bWF0Y2g6IC9eMDMvLFxuXHRkdnM6IFt7XG5cdFx0ZHZwb3M6IDgsXG5cdFx0cGVzb3M6IFs5LDgsNyw2LDUsNCwzLDJdLFxuXHRcdGFsZ29yaXRobVN0ZXBzOiBbJ29ubHlOdW1iZXJzJywgJ2FwU3BlYycsICdtb2QxMScsICdhcFNwZWMnXVxuXHR9XSxcblx0dmFsaWRhdGU6IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWxpZGF0ZUlFKHZhbHVlLCB0aGlzKTsgfVxufV07XG5cblxudmFyIFBJUyA9IHt9O1xuXG5QSVMudmFsaWRhdGUgPSBmdW5jdGlvbihwaXMpIHtcblx0cGlzID0gcGlzLnJlcGxhY2UoL1teXFxkXSsvZywnJyk7XG5cdHZhciByID0gL14oMHsxMX18MXsxMX18MnsxMX18M3sxMX18NHsxMX18NXsxMX18NnsxMX18N3sxMX18OHsxMX18OXsxMX0pJC87XG5cblx0aWYgKCFwaXMgfHwgcGlzLmxlbmd0aCAhPT0gMTEgfHwgci50ZXN0KHBpcykpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHR2YXIgcGlzaSA9IHBpcy5zdWJzdHJpbmcoMCwxMCk7XG5cdHZhciBwaXNkID0gcGlzLnN1YnN0cmluZygxMCk7XG5cblx0ZnVuY3Rpb24gY2FsY3VsYXRlRGlnaXQocGlzKXtcbiAgICAgICAgdmFyIHAgPSBbMywyLDksOCw3LDYsNSw0LDMsMl07XG4gICAgICAgIHZhciBzID0gMDtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8PSA5OyBpKyspe1xuICAgICAgICAgICAgcyArPSBwYXJzZUludChwaXMuY2hhckF0KGkpKSAqIHBbaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHIgPSAxMSAtIChzJTExKTtcbiAgICAgICAgcmV0dXJuIChyID09PSAxMCB8fCByID09PSAxMSkgPyAwIDogcjtcblx0fVxuXG5cdHJldHVybiBOdW1iZXIocGlzZCkgPT09IGNhbGN1bGF0ZURpZ2l0KHBpc2kpO1xufTtcblxuXHRyZXR1cm4ge1xuXHRcdGllOiBJRSxcblx0XHRjcGY6IENQRixcblx0XHRjbnBqOiBDTlBKLFxuXHRcdHBpczogUElTXG5cdH07XG59KSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gYWRkVVRDTWludXRlcztcblxudmFyIF9pbmRleCA9IHJlcXVpcmUoJy4uLy4uL3RvRGF0ZS9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luZGV4KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGEgcGFydCBvZiBwdWJsaWMgQVBJIHdoZW4gVVRDIGZ1bmN0aW9uIHdpbGwgYmUgaW1wbGVtZW50ZWQuXG4vLyBTZWUgaXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9pc3N1ZXMvMzc2XG5mdW5jdGlvbiBhZGRVVENNaW51dGVzKGRpcnR5RGF0ZSwgZGlydHlBbW91bnQsIGRpcnR5T3B0aW9ucykge1xuICB2YXIgZGF0ZSA9ICgwLCBfaW5kZXgyLmRlZmF1bHQpKGRpcnR5RGF0ZSwgZGlydHlPcHRpb25zKTtcbiAgdmFyIGFtb3VudCA9IE51bWJlcihkaXJ0eUFtb3VudCk7XG4gIGRhdGUuc2V0VVRDTWludXRlcyhkYXRlLmdldFVUQ01pbnV0ZXMoKSArIGFtb3VudCk7XG4gIHJldHVybiBkYXRlO1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjbG9uZU9iamVjdDtcbmZ1bmN0aW9uIGNsb25lT2JqZWN0KGRpcnR5T2JqZWN0KSB7XG4gIGRpcnR5T2JqZWN0ID0gZGlydHlPYmplY3QgfHwge307XG4gIHZhciBvYmplY3QgPSB7fTtcblxuICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBkaXJ0eU9iamVjdCkge1xuICAgIGlmIChkaXJ0eU9iamVjdC5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgIG9iamVjdFtwcm9wZXJ0eV0gPSBkaXJ0eU9iamVjdFtwcm9wZXJ0eV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iamVjdDtcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0VVRDRGF5T2ZZZWFyO1xuXG52YXIgX2luZGV4ID0gcmVxdWlyZSgnLi4vLi4vdG9EYXRlL2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5kZXgpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgTUlMTElTRUNPTkRTX0lOX0RBWSA9IDg2NDAwMDAwO1xuXG4vLyBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgYSBwYXJ0IG9mIHB1YmxpYyBBUEkgd2hlbiBVVEMgZnVuY3Rpb24gd2lsbCBiZSBpbXBsZW1lbnRlZC5cbi8vIFNlZSBpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2lzc3Vlcy8zNzZcbmZ1bmN0aW9uIGdldFVUQ0RheU9mWWVhcihkaXJ0eURhdGUsIGRpcnR5T3B0aW9ucykge1xuICB2YXIgZGF0ZSA9ICgwLCBfaW5kZXgyLmRlZmF1bHQpKGRpcnR5RGF0ZSwgZGlydHlPcHRpb25zKTtcbiAgdmFyIHRpbWVzdGFtcCA9IGRhdGUuZ2V0VGltZSgpO1xuICBkYXRlLnNldFVUQ01vbnRoKDAsIDEpO1xuICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICB2YXIgc3RhcnRPZlllYXJUaW1lc3RhbXAgPSBkYXRlLmdldFRpbWUoKTtcbiAgdmFyIGRpZmZlcmVuY2UgPSB0aW1lc3RhbXAgLSBzdGFydE9mWWVhclRpbWVzdGFtcDtcbiAgcmV0dXJuIE1hdGguZmxvb3IoZGlmZmVyZW5jZSAvIE1JTExJU0VDT05EU19JTl9EQVkpICsgMTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGdldFVUQ0lTT1dlZWs7XG5cbnZhciBfaW5kZXggPSByZXF1aXJlKCcuLi8uLi90b0RhdGUvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmRleCk7XG5cbnZhciBfaW5kZXgzID0gcmVxdWlyZSgnLi4vc3RhcnRPZlVUQ0lTT1dlZWsvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmRleDMpO1xuXG52YXIgX2luZGV4NSA9IHJlcXVpcmUoJy4uL3N0YXJ0T2ZVVENJU09XZWVrWWVhci9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4NiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luZGV4NSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBNSUxMSVNFQ09ORFNfSU5fV0VFSyA9IDYwNDgwMDAwMDtcblxuLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGEgcGFydCBvZiBwdWJsaWMgQVBJIHdoZW4gVVRDIGZ1bmN0aW9uIHdpbGwgYmUgaW1wbGVtZW50ZWQuXG4vLyBTZWUgaXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9pc3N1ZXMvMzc2XG5mdW5jdGlvbiBnZXRVVENJU09XZWVrKGRpcnR5RGF0ZSwgZGlydHlPcHRpb25zKSB7XG4gIHZhciBkYXRlID0gKDAsIF9pbmRleDIuZGVmYXVsdCkoZGlydHlEYXRlLCBkaXJ0eU9wdGlvbnMpO1xuICB2YXIgZGlmZiA9ICgwLCBfaW5kZXg0LmRlZmF1bHQpKGRhdGUsIGRpcnR5T3B0aW9ucykuZ2V0VGltZSgpIC0gKDAsIF9pbmRleDYuZGVmYXVsdCkoZGF0ZSwgZGlydHlPcHRpb25zKS5nZXRUaW1lKCk7XG5cbiAgLy8gUm91bmQgdGhlIG51bWJlciBvZiBkYXlzIHRvIHRoZSBuZWFyZXN0IGludGVnZXJcbiAgLy8gYmVjYXVzZSB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpbiBhIHdlZWsgaXMgbm90IGNvbnN0YW50XG4gIC8vIChlLmcuIGl0J3MgZGlmZmVyZW50IGluIHRoZSB3ZWVrIG9mIHRoZSBkYXlsaWdodCBzYXZpbmcgdGltZSBjbG9jayBzaGlmdClcbiAgcmV0dXJuIE1hdGgucm91bmQoZGlmZiAvIE1JTExJU0VDT05EU19JTl9XRUVLKSArIDE7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBnZXRVVENJU09XZWVrWWVhcjtcblxudmFyIF9pbmRleCA9IHJlcXVpcmUoJy4uLy4uL3RvRGF0ZS9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luZGV4KTtcblxudmFyIF9pbmRleDMgPSByZXF1aXJlKCcuLi9zdGFydE9mVVRDSVNPV2Vlay9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4NCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luZGV4Myk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8vIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBhIHBhcnQgb2YgcHVibGljIEFQSSB3aGVuIFVUQyBmdW5jdGlvbiB3aWxsIGJlIGltcGxlbWVudGVkLlxuLy8gU2VlIGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvaXNzdWVzLzM3NlxuZnVuY3Rpb24gZ2V0VVRDSVNPV2Vla1llYXIoZGlydHlEYXRlLCBkaXJ0eU9wdGlvbnMpIHtcbiAgdmFyIGRhdGUgPSAoMCwgX2luZGV4Mi5kZWZhdWx0KShkaXJ0eURhdGUsIGRpcnR5T3B0aW9ucyk7XG4gIHZhciB5ZWFyID0gZGF0ZS5nZXRVVENGdWxsWWVhcigpO1xuXG4gIHZhciBmb3VydGhPZkphbnVhcnlPZk5leHRZZWFyID0gbmV3IERhdGUoMCk7XG4gIGZvdXJ0aE9mSmFudWFyeU9mTmV4dFllYXIuc2V0VVRDRnVsbFllYXIoeWVhciArIDEsIDAsIDQpO1xuICBmb3VydGhPZkphbnVhcnlPZk5leHRZZWFyLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICB2YXIgc3RhcnRPZk5leHRZZWFyID0gKDAsIF9pbmRleDQuZGVmYXVsdCkoZm91cnRoT2ZKYW51YXJ5T2ZOZXh0WWVhciwgZGlydHlPcHRpb25zKTtcblxuICB2YXIgZm91cnRoT2ZKYW51YXJ5T2ZUaGlzWWVhciA9IG5ldyBEYXRlKDApO1xuICBmb3VydGhPZkphbnVhcnlPZlRoaXNZZWFyLnNldFVUQ0Z1bGxZZWFyKHllYXIsIDAsIDQpO1xuICBmb3VydGhPZkphbnVhcnlPZlRoaXNZZWFyLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICB2YXIgc3RhcnRPZlRoaXNZZWFyID0gKDAsIF9pbmRleDQuZGVmYXVsdCkoZm91cnRoT2ZKYW51YXJ5T2ZUaGlzWWVhciwgZGlydHlPcHRpb25zKTtcblxuICBpZiAoZGF0ZS5nZXRUaW1lKCkgPj0gc3RhcnRPZk5leHRZZWFyLmdldFRpbWUoKSkge1xuICAgIHJldHVybiB5ZWFyICsgMTtcbiAgfSBlbHNlIGlmIChkYXRlLmdldFRpbWUoKSA+PSBzdGFydE9mVGhpc1llYXIuZ2V0VGltZSgpKSB7XG4gICAgcmV0dXJuIHllYXI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHllYXIgLSAxO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBzZXRVVENEYXk7XG5cbnZhciBfaW5kZXggPSByZXF1aXJlKCcuLi8uLi90b0RhdGUvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmRleCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8vIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBhIHBhcnQgb2YgcHVibGljIEFQSSB3aGVuIFVUQyBmdW5jdGlvbiB3aWxsIGJlIGltcGxlbWVudGVkLlxuLy8gU2VlIGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvaXNzdWVzLzM3NlxuZnVuY3Rpb24gc2V0VVRDRGF5KGRpcnR5RGF0ZSwgZGlydHlEYXksIGRpcnR5T3B0aW9ucykge1xuICB2YXIgb3B0aW9ucyA9IGRpcnR5T3B0aW9ucyB8fCB7fTtcbiAgdmFyIGxvY2FsZSA9IG9wdGlvbnMubG9jYWxlO1xuICB2YXIgbG9jYWxlV2Vla1N0YXJ0c09uID0gbG9jYWxlICYmIGxvY2FsZS5vcHRpb25zICYmIGxvY2FsZS5vcHRpb25zLndlZWtTdGFydHNPbjtcbiAgdmFyIGRlZmF1bHRXZWVrU3RhcnRzT24gPSBsb2NhbGVXZWVrU3RhcnRzT24gPT09IHVuZGVmaW5lZCA/IDAgOiBOdW1iZXIobG9jYWxlV2Vla1N0YXJ0c09uKTtcbiAgdmFyIHdlZWtTdGFydHNPbiA9IG9wdGlvbnMud2Vla1N0YXJ0c09uID09PSB1bmRlZmluZWQgPyBkZWZhdWx0V2Vla1N0YXJ0c09uIDogTnVtYmVyKG9wdGlvbnMud2Vla1N0YXJ0c09uKTtcblxuICAvLyBUZXN0IGlmIHdlZWtTdGFydHNPbiBpcyBiZXR3ZWVuIDAgYW5kIDYgX2FuZF8gaXMgbm90IE5hTlxuICBpZiAoISh3ZWVrU3RhcnRzT24gPj0gMCAmJiB3ZWVrU3RhcnRzT24gPD0gNikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignd2Vla1N0YXJ0c09uIG11c3QgYmUgYmV0d2VlbiAwIGFuZCA2IGluY2x1c2l2ZWx5Jyk7XG4gIH1cblxuICB2YXIgZGF0ZSA9ICgwLCBfaW5kZXgyLmRlZmF1bHQpKGRpcnR5RGF0ZSwgZGlydHlPcHRpb25zKTtcbiAgdmFyIGRheSA9IE51bWJlcihkaXJ0eURheSk7XG5cbiAgdmFyIGN1cnJlbnREYXkgPSBkYXRlLmdldFVUQ0RheSgpO1xuXG4gIHZhciByZW1haW5kZXIgPSBkYXkgJSA3O1xuICB2YXIgZGF5SW5kZXggPSAocmVtYWluZGVyICsgNykgJSA3O1xuXG4gIHZhciBkaWZmID0gKGRheUluZGV4IDwgd2Vla1N0YXJ0c09uID8gNyA6IDApICsgZGF5IC0gY3VycmVudERheTtcblxuICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgKyBkaWZmKTtcbiAgcmV0dXJuIGRhdGU7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBzZXRVVENJU09EYXk7XG5cbnZhciBfaW5kZXggPSByZXF1aXJlKCcuLi8uLi90b0RhdGUvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmRleCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8vIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBhIHBhcnQgb2YgcHVibGljIEFQSSB3aGVuIFVUQyBmdW5jdGlvbiB3aWxsIGJlIGltcGxlbWVudGVkLlxuLy8gU2VlIGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvaXNzdWVzLzM3NlxuZnVuY3Rpb24gc2V0VVRDSVNPRGF5KGRpcnR5RGF0ZSwgZGlydHlEYXksIGRpcnR5T3B0aW9ucykge1xuICB2YXIgZGF5ID0gTnVtYmVyKGRpcnR5RGF5KTtcblxuICBpZiAoZGF5ICUgNyA9PT0gMCkge1xuICAgIGRheSA9IGRheSAtIDc7XG4gIH1cblxuICB2YXIgd2Vla1N0YXJ0c09uID0gMTtcbiAgdmFyIGRhdGUgPSAoMCwgX2luZGV4Mi5kZWZhdWx0KShkaXJ0eURhdGUsIGRpcnR5T3B0aW9ucyk7XG4gIHZhciBjdXJyZW50RGF5ID0gZGF0ZS5nZXRVVENEYXkoKTtcblxuICB2YXIgcmVtYWluZGVyID0gZGF5ICUgNztcbiAgdmFyIGRheUluZGV4ID0gKHJlbWFpbmRlciArIDcpICUgNztcblxuICB2YXIgZGlmZiA9IChkYXlJbmRleCA8IHdlZWtTdGFydHNPbiA/IDcgOiAwKSArIGRheSAtIGN1cnJlbnREYXk7XG5cbiAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpICsgZGlmZik7XG4gIHJldHVybiBkYXRlO1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gc2V0VVRDSVNPV2VlaztcblxudmFyIF9pbmRleCA9IHJlcXVpcmUoJy4uLy4uL3RvRGF0ZS9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luZGV4KTtcblxudmFyIF9pbmRleDMgPSByZXF1aXJlKCcuLi9nZXRVVENJU09XZWVrL2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXg0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5kZXgzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGEgcGFydCBvZiBwdWJsaWMgQVBJIHdoZW4gVVRDIGZ1bmN0aW9uIHdpbGwgYmUgaW1wbGVtZW50ZWQuXG4vLyBTZWUgaXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9pc3N1ZXMvMzc2XG5mdW5jdGlvbiBzZXRVVENJU09XZWVrKGRpcnR5RGF0ZSwgZGlydHlJU09XZWVrLCBkaXJ0eU9wdGlvbnMpIHtcbiAgdmFyIGRhdGUgPSAoMCwgX2luZGV4Mi5kZWZhdWx0KShkaXJ0eURhdGUsIGRpcnR5T3B0aW9ucyk7XG4gIHZhciBpc29XZWVrID0gTnVtYmVyKGRpcnR5SVNPV2Vlayk7XG4gIHZhciBkaWZmID0gKDAsIF9pbmRleDQuZGVmYXVsdCkoZGF0ZSwgZGlydHlPcHRpb25zKSAtIGlzb1dlZWs7XG4gIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSAtIGRpZmYgKiA3KTtcbiAgcmV0dXJuIGRhdGU7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBzZXRVVENJU09XZWVrWWVhcjtcblxudmFyIF9pbmRleCA9IHJlcXVpcmUoJy4uLy4uL3RvRGF0ZS9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luZGV4KTtcblxudmFyIF9pbmRleDMgPSByZXF1aXJlKCcuLi9zdGFydE9mVVRDSVNPV2Vla1llYXIvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmRleDMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgTUlMTElTRUNPTkRTX0lOX0RBWSA9IDg2NDAwMDAwO1xuXG4vLyBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgYSBwYXJ0IG9mIHB1YmxpYyBBUEkgd2hlbiBVVEMgZnVuY3Rpb24gd2lsbCBiZSBpbXBsZW1lbnRlZC5cbi8vIFNlZSBpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2lzc3Vlcy8zNzZcbmZ1bmN0aW9uIHNldFVUQ0lTT1dlZWtZZWFyKGRpcnR5RGF0ZSwgZGlydHlJU09ZZWFyLCBkaXJ0eU9wdGlvbnMpIHtcbiAgdmFyIGRhdGUgPSAoMCwgX2luZGV4Mi5kZWZhdWx0KShkaXJ0eURhdGUsIGRpcnR5T3B0aW9ucyk7XG4gIHZhciBpc29ZZWFyID0gTnVtYmVyKGRpcnR5SVNPWWVhcik7XG4gIHZhciBkYXRlU3RhcnRPZlllYXIgPSAoMCwgX2luZGV4NC5kZWZhdWx0KShkYXRlLCBkaXJ0eU9wdGlvbnMpO1xuICB2YXIgZGlmZiA9IE1hdGguZmxvb3IoKGRhdGUuZ2V0VGltZSgpIC0gZGF0ZVN0YXJ0T2ZZZWFyLmdldFRpbWUoKSkgLyBNSUxMSVNFQ09ORFNfSU5fREFZKTtcbiAgdmFyIGZvdXJ0aE9mSmFudWFyeSA9IG5ldyBEYXRlKDApO1xuICBmb3VydGhPZkphbnVhcnkuc2V0VVRDRnVsbFllYXIoaXNvWWVhciwgMCwgNCk7XG4gIGZvdXJ0aE9mSmFudWFyeS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgZGF0ZSA9ICgwLCBfaW5kZXg0LmRlZmF1bHQpKGZvdXJ0aE9mSmFudWFyeSwgZGlydHlPcHRpb25zKTtcbiAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpICsgZGlmZik7XG4gIHJldHVybiBkYXRlO1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gc3RhcnRPZlVUQ0lTT1dlZWs7XG5cbnZhciBfaW5kZXggPSByZXF1aXJlKCcuLi8uLi90b0RhdGUvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmRleCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8vIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBhIHBhcnQgb2YgcHVibGljIEFQSSB3aGVuIFVUQyBmdW5jdGlvbiB3aWxsIGJlIGltcGxlbWVudGVkLlxuLy8gU2VlIGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvaXNzdWVzLzM3NlxuZnVuY3Rpb24gc3RhcnRPZlVUQ0lTT1dlZWsoZGlydHlEYXRlLCBkaXJ0eU9wdGlvbnMpIHtcbiAgdmFyIHdlZWtTdGFydHNPbiA9IDE7XG5cbiAgdmFyIGRhdGUgPSAoMCwgX2luZGV4Mi5kZWZhdWx0KShkaXJ0eURhdGUsIGRpcnR5T3B0aW9ucyk7XG4gIHZhciBkYXkgPSBkYXRlLmdldFVUQ0RheSgpO1xuICB2YXIgZGlmZiA9IChkYXkgPCB3ZWVrU3RhcnRzT24gPyA3IDogMCkgKyBkYXkgLSB3ZWVrU3RhcnRzT247XG5cbiAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpIC0gZGlmZik7XG4gIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gIHJldHVybiBkYXRlO1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gc3RhcnRPZlVUQ0lTT1dlZWtZZWFyO1xuXG52YXIgX2luZGV4ID0gcmVxdWlyZSgnLi4vZ2V0VVRDSVNPV2Vla1llYXIvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmRleCk7XG5cbnZhciBfaW5kZXgzID0gcmVxdWlyZSgnLi4vc3RhcnRPZlVUQ0lTT1dlZWsvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmRleDMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vLyBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgYSBwYXJ0IG9mIHB1YmxpYyBBUEkgd2hlbiBVVEMgZnVuY3Rpb24gd2lsbCBiZSBpbXBsZW1lbnRlZC5cbi8vIFNlZSBpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2lzc3Vlcy8zNzZcbmZ1bmN0aW9uIHN0YXJ0T2ZVVENJU09XZWVrWWVhcihkaXJ0eURhdGUsIGRpcnR5T3B0aW9ucykge1xuICB2YXIgeWVhciA9ICgwLCBfaW5kZXgyLmRlZmF1bHQpKGRpcnR5RGF0ZSwgZGlydHlPcHRpb25zKTtcbiAgdmFyIGZvdXJ0aE9mSmFudWFyeSA9IG5ldyBEYXRlKDApO1xuICBmb3VydGhPZkphbnVhcnkuc2V0VVRDRnVsbFllYXIoeWVhciwgMCwgNCk7XG4gIGZvdXJ0aE9mSmFudWFyeS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgdmFyIGRhdGUgPSAoMCwgX2luZGV4NC5kZWZhdWx0KShmb3VydGhPZkphbnVhcnksIGRpcnR5T3B0aW9ucyk7XG4gIHJldHVybiBkYXRlO1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gYWRkTWlsbGlzZWNvbmRzO1xuXG52YXIgX2luZGV4ID0gcmVxdWlyZSgnLi4vdG9EYXRlL2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5kZXgpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIEBuYW1lIGFkZE1pbGxpc2Vjb25kc1xuICogQGNhdGVnb3J5IE1pbGxpc2Vjb25kIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEFkZCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgbWlsbGlzZWNvbmRzIHRvIGJlIGFkZGVkXG4gKiBAcGFyYW0ge09wdGlvbnN9IFtvcHRpb25zXSAtIHRoZSBvYmplY3Qgd2l0aCBvcHRpb25zLiBTZWUgW09wdGlvbnNde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvT3B0aW9uc31cbiAqIEBwYXJhbSB7MHwxfDJ9IFtvcHRpb25zLmFkZGl0aW9uYWxEaWdpdHM9Ml0gLSBwYXNzZWQgdG8gYHRvRGF0ZWAuIFNlZSBbdG9EYXRlXXtAbGluayBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL3RvRGF0ZX1cbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgbWlsbGlzZWNvbmRzIGFkZGVkXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDIgYXJndW1lbnRzIHJlcXVpcmVkXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzYCBtdXN0IGJlIDAsIDEgb3IgMlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBZGQgNzUwIG1pbGxpc2Vjb25kcyB0byAxMCBKdWx5IDIwMTQgMTI6NDU6MzAuMDAwOlxuICogdmFyIHJlc3VsdCA9IGFkZE1pbGxpc2Vjb25kcyhuZXcgRGF0ZSgyMDE0LCA2LCAxMCwgMTIsIDQ1LCAzMCwgMCksIDc1MClcbiAqIC8vPT4gVGh1IEp1bCAxMCAyMDE0IDEyOjQ1OjMwLjc1MFxuICovXG5mdW5jdGlvbiBhZGRNaWxsaXNlY29uZHMoZGlydHlEYXRlLCBkaXJ0eUFtb3VudCwgZGlydHlPcHRpb25zKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJzIgYXJndW1lbnRzIHJlcXVpcmVkLCBidXQgb25seSAnICsgYXJndW1lbnRzLmxlbmd0aCArICcgcHJlc2VudCcpO1xuICB9XG5cbiAgdmFyIHRpbWVzdGFtcCA9ICgwLCBfaW5kZXgyLmRlZmF1bHQpKGRpcnR5RGF0ZSwgZGlydHlPcHRpb25zKS5nZXRUaW1lKCk7XG4gIHZhciBhbW91bnQgPSBOdW1iZXIoZGlydHlBbW91bnQpO1xuICByZXR1cm4gbmV3IERhdGUodGltZXN0YW1wICsgYW1vdW50KTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGFkZE1pbnV0ZXM7XG5cbnZhciBfaW5kZXggPSByZXF1aXJlKCcuLi9hZGRNaWxsaXNlY29uZHMvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmRleCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFID0gNjAwMDA7XG5cbi8qKlxuICogQG5hbWUgYWRkTWludXRlc1xuICogQGNhdGVnb3J5IE1pbnV0ZSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbWludXRlcyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFkZCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBtaW51dGVzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgbWludXRlcyB0byBiZSBhZGRlZFxuICogQHBhcmFtIHtPcHRpb25zfSBbb3B0aW9uc10gLSB0aGUgb2JqZWN0IHdpdGggb3B0aW9ucy4gU2VlIFtPcHRpb25zXXtAbGluayBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL09wdGlvbnN9XG4gKiBAcGFyYW0gezB8MXwyfSBbb3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzPTJdIC0gcGFzc2VkIHRvIGB0b0RhdGVgLiBTZWUgW3RvRGF0ZV17QGxpbmsgaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy90b0RhdGV9XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIG1pbnV0ZXMgYWRkZWRcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMiBhcmd1bWVudHMgcmVxdWlyZWRcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBvcHRpb25zLmFkZGl0aW9uYWxEaWdpdHNgIG11c3QgYmUgMCwgMSBvciAyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFkZCAzMCBtaW51dGVzIHRvIDEwIEp1bHkgMjAxNCAxMjowMDowMDpcbiAqIHZhciByZXN1bHQgPSBhZGRNaW51dGVzKG5ldyBEYXRlKDIwMTQsIDYsIDEwLCAxMiwgMCksIDMwKVxuICogLy89PiBUaHUgSnVsIDEwIDIwMTQgMTI6MzA6MDBcbiAqL1xuZnVuY3Rpb24gYWRkTWludXRlcyhkaXJ0eURhdGUsIGRpcnR5QW1vdW50LCBkaXJ0eU9wdGlvbnMpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignMiBhcmd1bWVudHMgcmVxdWlyZWQsIGJ1dCBvbmx5ICcgKyBhcmd1bWVudHMubGVuZ3RoICsgJyBwcmVzZW50Jyk7XG4gIH1cblxuICB2YXIgYW1vdW50ID0gTnVtYmVyKGRpcnR5QW1vdW50KTtcbiAgcmV0dXJuICgwLCBfaW5kZXgyLmRlZmF1bHQpKGRpcnR5RGF0ZSwgYW1vdW50ICogTUlMTElTRUNPTkRTX0lOX01JTlVURSwgZGlydHlPcHRpb25zKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9pbmRleCA9IHJlcXVpcmUoJy4uLy4uLy4uL19saWIvZ2V0VVRDRGF5T2ZZZWFyL2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5kZXgpO1xuXG52YXIgX2luZGV4MyA9IHJlcXVpcmUoJy4uLy4uLy4uL19saWIvZ2V0VVRDSVNPV2Vlay9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4NCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luZGV4Myk7XG5cbnZhciBfaW5kZXg1ID0gcmVxdWlyZSgnLi4vLi4vLi4vX2xpYi9nZXRVVENJU09XZWVrWWVhci9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4NiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luZGV4NSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBmb3JtYXR0ZXJzID0ge1xuICAvLyBNb250aDogMSwgMiwgLi4uLCAxMlxuICAnTSc6IGZ1bmN0aW9uIE0oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ01vbnRoKCkgKyAxO1xuICB9LFxuXG4gIC8vIE1vbnRoOiAxc3QsIDJuZCwgLi4uLCAxMnRoXG4gICdNbyc6IGZ1bmN0aW9uIE1vKGRhdGUsIG9wdGlvbnMpIHtcbiAgICB2YXIgbW9udGggPSBkYXRlLmdldFVUQ01vbnRoKCkgKyAxO1xuICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5sb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKG1vbnRoLCB7IHVuaXQ6ICdtb250aCcgfSk7XG4gIH0sXG5cbiAgLy8gTW9udGg6IDAxLCAwMiwgLi4uLCAxMlxuICAnTU0nOiBmdW5jdGlvbiBNTShkYXRlKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldFVUQ01vbnRoKCkgKyAxLCAyKTtcbiAgfSxcblxuICAvLyBNb250aDogSmFuLCBGZWIsIC4uLiwgRGVjXG4gICdNTU0nOiBmdW5jdGlvbiBNTU0oZGF0ZSwgb3B0aW9ucykge1xuICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5sb2NhbGl6ZS5tb250aChkYXRlLmdldFVUQ01vbnRoKCksIHsgdHlwZTogJ3Nob3J0JyB9KTtcbiAgfSxcblxuICAvLyBNb250aDogSmFudWFyeSwgRmVicnVhcnksIC4uLiwgRGVjZW1iZXJcbiAgJ01NTU0nOiBmdW5jdGlvbiBNTU1NKGRhdGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubG9jYWxpemUubW9udGgoZGF0ZS5nZXRVVENNb250aCgpLCB7IHR5cGU6ICdsb25nJyB9KTtcbiAgfSxcblxuICAvLyBRdWFydGVyOiAxLCAyLCAzLCA0XG4gICdRJzogZnVuY3Rpb24gUShkYXRlKSB7XG4gICAgcmV0dXJuIE1hdGguY2VpbCgoZGF0ZS5nZXRVVENNb250aCgpICsgMSkgLyAzKTtcbiAgfSxcblxuICAvLyBRdWFydGVyOiAxc3QsIDJuZCwgM3JkLCA0dGhcbiAgJ1FvJzogZnVuY3Rpb24gUW8oZGF0ZSwgb3B0aW9ucykge1xuICAgIHZhciBxdWFydGVyID0gTWF0aC5jZWlsKChkYXRlLmdldFVUQ01vbnRoKCkgKyAxKSAvIDMpO1xuICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5sb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKHF1YXJ0ZXIsIHsgdW5pdDogJ3F1YXJ0ZXInIH0pO1xuICB9LFxuXG4gIC8vIERheSBvZiBtb250aDogMSwgMiwgLi4uLCAzMVxuICAnRCc6IGZ1bmN0aW9uIEQoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ0RhdGUoKTtcbiAgfSxcblxuICAvLyBEYXkgb2YgbW9udGg6IDFzdCwgMm5kLCAuLi4sIDMxc3RcbiAgJ0RvJzogZnVuY3Rpb24gRG8oZGF0ZSwgb3B0aW9ucykge1xuICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5sb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGRhdGUuZ2V0VVRDRGF0ZSgpLCB7IHVuaXQ6ICdkYXlPZk1vbnRoJyB9KTtcbiAgfSxcblxuICAvLyBEYXkgb2YgbW9udGg6IDAxLCAwMiwgLi4uLCAzMVxuICAnREQnOiBmdW5jdGlvbiBERChkYXRlKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldFVUQ0RhdGUoKSwgMik7XG4gIH0sXG5cbiAgLy8gRGF5IG9mIHllYXI6IDEsIDIsIC4uLiwgMzY2XG4gICdEREQnOiBmdW5jdGlvbiBEREQoZGF0ZSkge1xuICAgIHJldHVybiAoMCwgX2luZGV4Mi5kZWZhdWx0KShkYXRlKTtcbiAgfSxcblxuICAvLyBEYXkgb2YgeWVhcjogMXN0LCAybmQsIC4uLiwgMzY2dGhcbiAgJ0RERG8nOiBmdW5jdGlvbiBERERvKGRhdGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubG9jYWxpemUub3JkaW5hbE51bWJlcigoMCwgX2luZGV4Mi5kZWZhdWx0KShkYXRlKSwgeyB1bml0OiAnZGF5T2ZZZWFyJyB9KTtcbiAgfSxcblxuICAvLyBEYXkgb2YgeWVhcjogMDAxLCAwMDIsIC4uLiwgMzY2XG4gICdEREREJzogZnVuY3Rpb24gRERERChkYXRlKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcygoMCwgX2luZGV4Mi5kZWZhdWx0KShkYXRlKSwgMyk7XG4gIH0sXG5cbiAgLy8gRGF5IG9mIHdlZWs6IFN1LCBNbywgLi4uLCBTYVxuICAnZGQnOiBmdW5jdGlvbiBkZChkYXRlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubG9jYWxlLmxvY2FsaXplLndlZWtkYXkoZGF0ZS5nZXRVVENEYXkoKSwgeyB0eXBlOiAnbmFycm93JyB9KTtcbiAgfSxcblxuICAvLyBEYXkgb2Ygd2VlazogU3VuLCBNb24sIC4uLiwgU2F0XG4gICdkZGQnOiBmdW5jdGlvbiBkZGQoZGF0ZSwgb3B0aW9ucykge1xuICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5sb2NhbGl6ZS53ZWVrZGF5KGRhdGUuZ2V0VVRDRGF5KCksIHsgdHlwZTogJ3Nob3J0JyB9KTtcbiAgfSxcblxuICAvLyBEYXkgb2Ygd2VlazogU3VuZGF5LCBNb25kYXksIC4uLiwgU2F0dXJkYXlcbiAgJ2RkZGQnOiBmdW5jdGlvbiBkZGRkKGRhdGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubG9jYWxpemUud2Vla2RheShkYXRlLmdldFVUQ0RheSgpLCB7IHR5cGU6ICdsb25nJyB9KTtcbiAgfSxcblxuICAvLyBEYXkgb2Ygd2VlazogMCwgMSwgLi4uLCA2XG4gICdkJzogZnVuY3Rpb24gZChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDRGF5KCk7XG4gIH0sXG5cbiAgLy8gRGF5IG9mIHdlZWs6IDB0aCwgMXN0LCAybmQsIC4uLiwgNnRoXG4gICdkbyc6IGZ1bmN0aW9uIF9kbyhkYXRlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubG9jYWxlLmxvY2FsaXplLm9yZGluYWxOdW1iZXIoZGF0ZS5nZXRVVENEYXkoKSwgeyB1bml0OiAnZGF5T2ZXZWVrJyB9KTtcbiAgfSxcblxuICAvLyBEYXkgb2YgSVNPIHdlZWs6IDEsIDIsIC4uLiwgN1xuICAnRSc6IGZ1bmN0aW9uIEUoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ0RheSgpIHx8IDc7XG4gIH0sXG5cbiAgLy8gSVNPIHdlZWs6IDEsIDIsIC4uLiwgNTNcbiAgJ1cnOiBmdW5jdGlvbiBXKGRhdGUpIHtcbiAgICByZXR1cm4gKDAsIF9pbmRleDQuZGVmYXVsdCkoZGF0ZSk7XG4gIH0sXG5cbiAgLy8gSVNPIHdlZWs6IDFzdCwgMm5kLCAuLi4sIDUzdGhcbiAgJ1dvJzogZnVuY3Rpb24gV28oZGF0ZSwgb3B0aW9ucykge1xuICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5sb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKCgwLCBfaW5kZXg0LmRlZmF1bHQpKGRhdGUpLCB7IHVuaXQ6ICdpc29XZWVrJyB9KTtcbiAgfSxcblxuICAvLyBJU08gd2VlazogMDEsIDAyLCAuLi4sIDUzXG4gICdXVyc6IGZ1bmN0aW9uIFdXKGRhdGUpIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKCgwLCBfaW5kZXg0LmRlZmF1bHQpKGRhdGUpLCAyKTtcbiAgfSxcblxuICAvLyBZZWFyOiAwMCwgMDEsIC4uLiwgOTlcbiAgJ1lZJzogZnVuY3Rpb24gWVkoZGF0ZSkge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRVVENGdWxsWWVhcigpLCA0KS5zdWJzdHIoMik7XG4gIH0sXG5cbiAgLy8gWWVhcjogMTkwMCwgMTkwMSwgLi4uLCAyMDk5XG4gICdZWVlZJzogZnVuY3Rpb24gWVlZWShkYXRlKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldFVUQ0Z1bGxZZWFyKCksIDQpO1xuICB9LFxuXG4gIC8vIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyOiAwMCwgMDEsIC4uLiwgOTlcbiAgJ0dHJzogZnVuY3Rpb24gR0coZGF0ZSkge1xuICAgIHJldHVybiBTdHJpbmcoKDAsIF9pbmRleDYuZGVmYXVsdCkoZGF0ZSkpLnN1YnN0cigyKTtcbiAgfSxcblxuICAvLyBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogMTkwMCwgMTkwMSwgLi4uLCAyMDk5XG4gICdHR0dHJzogZnVuY3Rpb24gR0dHRyhkYXRlKSB7XG4gICAgcmV0dXJuICgwLCBfaW5kZXg2LmRlZmF1bHQpKGRhdGUpO1xuICB9LFxuXG4gIC8vIEhvdXI6IDAsIDEsIC4uLiAyM1xuICAnSCc6IGZ1bmN0aW9uIEgoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ0hvdXJzKCk7XG4gIH0sXG5cbiAgLy8gSG91cjogMDAsIDAxLCAuLi4sIDIzXG4gICdISCc6IGZ1bmN0aW9uIEhIKGRhdGUpIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0VVRDSG91cnMoKSwgMik7XG4gIH0sXG5cbiAgLy8gSG91cjogMSwgMiwgLi4uLCAxMlxuICAnaCc6IGZ1bmN0aW9uIGgoZGF0ZSkge1xuICAgIHZhciBob3VycyA9IGRhdGUuZ2V0VVRDSG91cnMoKTtcbiAgICBpZiAoaG91cnMgPT09IDApIHtcbiAgICAgIHJldHVybiAxMjtcbiAgICB9IGVsc2UgaWYgKGhvdXJzID4gMTIpIHtcbiAgICAgIHJldHVybiBob3VycyAlIDEyO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaG91cnM7XG4gICAgfVxuICB9LFxuXG4gIC8vIEhvdXI6IDAxLCAwMiwgLi4uLCAxMlxuICAnaGgnOiBmdW5jdGlvbiBoaChkYXRlKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhmb3JtYXR0ZXJzWydoJ10oZGF0ZSksIDIpO1xuICB9LFxuXG4gIC8vIE1pbnV0ZTogMCwgMSwgLi4uLCA1OVxuICAnbSc6IGZ1bmN0aW9uIG0oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ01pbnV0ZXMoKTtcbiAgfSxcblxuICAvLyBNaW51dGU6IDAwLCAwMSwgLi4uLCA1OVxuICAnbW0nOiBmdW5jdGlvbiBtbShkYXRlKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldFVUQ01pbnV0ZXMoKSwgMik7XG4gIH0sXG5cbiAgLy8gU2Vjb25kOiAwLCAxLCAuLi4sIDU5XG4gICdzJzogZnVuY3Rpb24gcyhkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDU2Vjb25kcygpO1xuICB9LFxuXG4gIC8vIFNlY29uZDogMDAsIDAxLCAuLi4sIDU5XG4gICdzcyc6IGZ1bmN0aW9uIHNzKGRhdGUpIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0VVRDU2Vjb25kcygpLCAyKTtcbiAgfSxcblxuICAvLyAxLzEwIG9mIHNlY29uZDogMCwgMSwgLi4uLCA5XG4gICdTJzogZnVuY3Rpb24gUyhkYXRlKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoZGF0ZS5nZXRVVENNaWxsaXNlY29uZHMoKSAvIDEwMCk7XG4gIH0sXG5cbiAgLy8gMS8xMDAgb2Ygc2Vjb25kOiAwMCwgMDEsIC4uLiwgOTlcbiAgJ1NTJzogZnVuY3Rpb24gU1MoZGF0ZSkge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoTWF0aC5mbG9vcihkYXRlLmdldFVUQ01pbGxpc2Vjb25kcygpIC8gMTApLCAyKTtcbiAgfSxcblxuICAvLyBNaWxsaXNlY29uZDogMDAwLCAwMDEsIC4uLiwgOTk5XG4gICdTU1MnOiBmdW5jdGlvbiBTU1MoZGF0ZSkge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRVVENNaWxsaXNlY29uZHMoKSwgMyk7XG4gIH0sXG5cbiAgLy8gVGltZXpvbmU6IC0wMTowMCwgKzAwOjAwLCAuLi4gKzEyOjAwXG4gICdaJzogZnVuY3Rpb24gWihkYXRlLCBvcHRpb25zKSB7XG4gICAgdmFyIG9yaWdpbmFsRGF0ZSA9IG9wdGlvbnMuX29yaWdpbmFsRGF0ZSB8fCBkYXRlO1xuICAgIHJldHVybiBmb3JtYXRUaW1lem9uZShvcmlnaW5hbERhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKSwgJzonKTtcbiAgfSxcblxuICAvLyBUaW1lem9uZTogLTAxMDAsICswMDAwLCAuLi4gKzEyMDBcbiAgJ1paJzogZnVuY3Rpb24gWlooZGF0ZSwgb3B0aW9ucykge1xuICAgIHZhciBvcmlnaW5hbERhdGUgPSBvcHRpb25zLl9vcmlnaW5hbERhdGUgfHwgZGF0ZTtcbiAgICByZXR1cm4gZm9ybWF0VGltZXpvbmUob3JpZ2luYWxEYXRlLmdldFRpbWV6b25lT2Zmc2V0KCkpO1xuICB9LFxuXG4gIC8vIFNlY29uZHMgdGltZXN0YW1wOiA1MTI5Njk1MjBcbiAgJ1gnOiBmdW5jdGlvbiBYKGRhdGUsIG9wdGlvbnMpIHtcbiAgICB2YXIgb3JpZ2luYWxEYXRlID0gb3B0aW9ucy5fb3JpZ2luYWxEYXRlIHx8IGRhdGU7XG4gICAgcmV0dXJuIE1hdGguZmxvb3Iob3JpZ2luYWxEYXRlLmdldFRpbWUoKSAvIDEwMDApO1xuICB9LFxuXG4gIC8vIE1pbGxpc2Vjb25kcyB0aW1lc3RhbXA6IDUxMjk2OTUyMDkwMFxuICAneCc6IGZ1bmN0aW9uIHgoZGF0ZSwgb3B0aW9ucykge1xuICAgIHZhciBvcmlnaW5hbERhdGUgPSBvcHRpb25zLl9vcmlnaW5hbERhdGUgfHwgZGF0ZTtcbiAgICByZXR1cm4gb3JpZ2luYWxEYXRlLmdldFRpbWUoKTtcbiAgfSxcblxuICAvLyBBTSwgUE1cbiAgJ0EnOiBmdW5jdGlvbiBBKGRhdGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubG9jYWxpemUudGltZU9mRGF5KGRhdGUuZ2V0VVRDSG91cnMoKSwgeyB0eXBlOiAndXBwZXJjYXNlJyB9KTtcbiAgfSxcblxuICAvLyBhbSwgcG1cbiAgJ2EnOiBmdW5jdGlvbiBhKGRhdGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubG9jYWxpemUudGltZU9mRGF5KGRhdGUuZ2V0VVRDSG91cnMoKSwgeyB0eXBlOiAnbG93ZXJjYXNlJyB9KTtcbiAgfSxcblxuICAvLyBhLm0uLCBwLm0uXG4gICdhYSc6IGZ1bmN0aW9uIGFhKGRhdGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubG9jYWxpemUudGltZU9mRGF5KGRhdGUuZ2V0VVRDSG91cnMoKSwgeyB0eXBlOiAnbG9uZycgfSk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGZvcm1hdFRpbWV6b25lKG9mZnNldCwgZGVsaW1ldGVyKSB7XG4gIGRlbGltZXRlciA9IGRlbGltZXRlciB8fCAnJztcbiAgdmFyIHNpZ24gPSBvZmZzZXQgPiAwID8gJy0nIDogJysnO1xuICB2YXIgYWJzT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcbiAgdmFyIGhvdXJzID0gTWF0aC5mbG9vcihhYnNPZmZzZXQgLyA2MCk7XG4gIHZhciBtaW51dGVzID0gYWJzT2Zmc2V0ICUgNjA7XG4gIHJldHVybiBzaWduICsgYWRkTGVhZGluZ1plcm9zKGhvdXJzLCAyKSArIGRlbGltZXRlciArIGFkZExlYWRpbmdaZXJvcyhtaW51dGVzLCAyKTtcbn1cblxuZnVuY3Rpb24gYWRkTGVhZGluZ1plcm9zKG51bWJlciwgdGFyZ2V0TGVuZ3RoKSB7XG4gIHZhciBvdXRwdXQgPSBNYXRoLmFicyhudW1iZXIpLnRvU3RyaW5nKCk7XG4gIHdoaWxlIChvdXRwdXQubGVuZ3RoIDwgdGFyZ2V0TGVuZ3RoKSB7XG4gICAgb3V0cHV0ID0gJzAnICsgb3V0cHV0O1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZvcm1hdHRlcnM7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBmb3JtYXQ7XG5cbnZhciBfaW5kZXggPSByZXF1aXJlKCcuLi90b0RhdGUvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmRleCk7XG5cbnZhciBfaW5kZXgzID0gcmVxdWlyZSgnLi4vaXNWYWxpZC9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4NCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luZGV4Myk7XG5cbnZhciBfaW5kZXg1ID0gcmVxdWlyZSgnLi4vbG9jYWxlL2VuLVVTL2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXg2ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5kZXg1KTtcblxudmFyIF9pbmRleDcgPSByZXF1aXJlKCcuL19saWIvZm9ybWF0dGVycy9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4OCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luZGV4Nyk7XG5cbnZhciBfaW5kZXg5ID0gcmVxdWlyZSgnLi4vX2xpYi9jbG9uZU9iamVjdC9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4MTAgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmRleDkpO1xuXG52YXIgX2luZGV4MTEgPSByZXF1aXJlKCcuLi9fbGliL2FkZFVUQ01pbnV0ZXMvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDEyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5kZXgxMSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCA9IC8oXFxbW15bXSpdKXwoXFxcXCk/KExUU3xMVHxMTExMfExMTHxMTHxMfGxsbGx8bGxsfGxsfGwpL2c7XG52YXIgZGVmYXVsdEZvcm1hdHRpbmdUb2tlbnNSZWdFeHAgPSAvKFxcW1teW10qXSl8KFxcXFwpPyh4fHNzfHN8bW18bXxoaHxofGRvfGRkZGR8ZGRkfGRkfGR8YWF8YXxaWnxafFlZWVl8WVl8WHxXb3xXV3xXfFNTU3xTU3xTfFFvfFF8TW98TU1NTXxNTU18TU18TXxISHxIfEdHR0d8R0d8RXxEb3xERERvfERERER8REREfEREfER8QXwuKS9nO1xuXG4vKipcbiAqIEBuYW1lIGZvcm1hdFxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBGb3JtYXQgdGhlIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGZvcm1hdHRlZCBkYXRlIHN0cmluZyBpbiB0aGUgZ2l2ZW4gZm9ybWF0LlxuICpcbiAqIEFjY2VwdGVkIHRva2VuczpcbiAqIHwgVW5pdCAgICAgICAgICAgICAgICAgICAgfCBUb2tlbiB8IFJlc3VsdCBleGFtcGxlcyAgICAgICAgICAgICAgICAgIHxcbiAqIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwgTW9udGggICAgICAgICAgICAgICAgICAgfCBNICAgICB8IDEsIDIsIC4uLiwgMTIgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBNbyAgICB8IDFzdCwgMm5kLCAuLi4sIDEydGggICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBNTSAgICB8IDAxLCAwMiwgLi4uLCAxMiAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBNTU0gICB8IEphbiwgRmViLCAuLi4sIERlYyAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBNTU1NICB8IEphbnVhcnksIEZlYnJ1YXJ5LCAuLi4sIERlY2VtYmVyIHxcbiAqIHwgUXVhcnRlciAgICAgICAgICAgICAgICAgfCBRICAgICB8IDEsIDIsIDMsIDQgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBRbyAgICB8IDFzdCwgMm5kLCAzcmQsIDR0aCAgICAgICAgICAgICAgIHxcbiAqIHwgRGF5IG9mIG1vbnRoICAgICAgICAgICAgfCBEICAgICB8IDEsIDIsIC4uLiwgMzEgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBEbyAgICB8IDFzdCwgMm5kLCAuLi4sIDMxc3QgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBERCAgICB8IDAxLCAwMiwgLi4uLCAzMSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgRGF5IG9mIHllYXIgICAgICAgICAgICAgfCBEREQgICB8IDEsIDIsIC4uLiwgMzY2ICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBERERvICB8IDFzdCwgMm5kLCAuLi4sIDM2NnRoICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBEREREICB8IDAwMSwgMDAyLCAuLi4sIDM2NiAgICAgICAgICAgICAgIHxcbiAqIHwgRGF5IG9mIHdlZWsgICAgICAgICAgICAgfCBkICAgICB8IDAsIDEsIC4uLiwgNiAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBkbyAgICB8IDB0aCwgMXN0LCAuLi4sIDZ0aCAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBkZCAgICB8IFN1LCBNbywgLi4uLCBTYSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBkZGQgICB8IFN1biwgTW9uLCAuLi4sIFNhdCAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBkZGRkICB8IFN1bmRheSwgTW9uZGF5LCAuLi4sIFNhdHVyZGF5ICAgIHxcbiAqIHwgRGF5IG9mIElTTyB3ZWVrICAgICAgICAgfCBFICAgICB8IDEsIDIsIC4uLiwgNyAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgSVNPIHdlZWsgICAgICAgICAgICAgICAgfCBXICAgICB8IDEsIDIsIC4uLiwgNTMgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBXbyAgICB8IDFzdCwgMm5kLCAuLi4sIDUzcmQgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBXVyAgICB8IDAxLCAwMiwgLi4uLCA1MyAgICAgICAgICAgICAgICAgIHxcbiAqIHwgWWVhciAgICAgICAgICAgICAgICAgICAgfCBZWSAgICB8IDAwLCAwMSwgLi4uLCA5OSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBZWVlZICB8IDE5MDAsIDE5MDEsIC4uLiwgMjA5OSAgICAgICAgICAgIHxcbiAqIHwgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgfCBHRyAgICB8IDAwLCAwMSwgLi4uLCA5OSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBHR0dHICB8IDE5MDAsIDE5MDEsIC4uLiwgMjA5OSAgICAgICAgICAgIHxcbiAqIHwgQU0vUE0gICAgICAgICAgICAgICAgICAgfCBBICAgICB8IEFNLCBQTSAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBhICAgICB8IGFtLCBwbSAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBhYSAgICB8IGEubS4sIHAubS4gICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgSG91ciAgICAgICAgICAgICAgICAgICAgfCBIICAgICB8IDAsIDEsIC4uLiAyMyAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBISCAgICB8IDAwLCAwMSwgLi4uIDIzICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBoICAgICB8IDEsIDIsIC4uLiwgMTIgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBoaCAgICB8IDAxLCAwMiwgLi4uLCAxMiAgICAgICAgICAgICAgICAgIHxcbiAqIHwgTWludXRlICAgICAgICAgICAgICAgICAgfCBtICAgICB8IDAsIDEsIC4uLiwgNTkgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBtbSAgICB8IDAwLCAwMSwgLi4uLCA1OSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgU2Vjb25kICAgICAgICAgICAgICAgICAgfCBzICAgICB8IDAsIDEsIC4uLiwgNTkgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBzcyAgICB8IDAwLCAwMSwgLi4uLCA1OSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgMS8xMCBvZiBzZWNvbmQgICAgICAgICAgfCBTICAgICB8IDAsIDEsIC4uLiwgOSAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgMS8xMDAgb2Ygc2Vjb25kICAgICAgICAgfCBTUyAgICB8IDAwLCAwMSwgLi4uLCA5OSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgTWlsbGlzZWNvbmQgICAgICAgICAgICAgfCBTU1MgICB8IDAwMCwgMDAxLCAuLi4sIDk5OSAgICAgICAgICAgICAgIHxcbiAqIHwgVGltZXpvbmUgICAgICAgICAgICAgICAgfCBaICAgICB8IC0wMTowMCwgKzAwOjAwLCAuLi4gKzEyOjAwICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBaWiAgICB8IC0wMTAwLCArMDAwMCwgLi4uLCArMTIwMCAgICAgICAgIHxcbiAqIHwgU2Vjb25kcyB0aW1lc3RhbXAgICAgICAgfCBYICAgICB8IDUxMjk2OTUyMCAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgTWlsbGlzZWNvbmRzIHRpbWVzdGFtcCAgfCB4ICAgICB8IDUxMjk2OTUyMDkwMCAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgTG9uZyBmb3JtYXQgICAgICAgICAgICAgfCBMVCAgICB8IDA1OjMwIGEubS4gICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBMVFMgICB8IDA1OjMwOjE1IGEubS4gICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBMICAgICB8IDA3LzAyLzE5OTUgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBsICAgICB8IDcvMi8xOTk1ICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBMTCAgICB8IEp1bHkgMiAxOTk1ICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBsbCAgICB8IEp1bCAyIDE5OTUgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBMTEwgICB8IEp1bHkgMiAxOTk1IDA1OjMwIGEubS4gICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBsbGwgICB8IEp1bCAyIDE5OTUgMDU6MzAgYS5tLiAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBMTExMICB8IFN1bmRheSwgSnVseSAyIDE5OTUgMDU6MzAgYS5tLiAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBsbGxsICB8IFN1biwgSnVsIDIgMTk5NSAwNTozMCBhLm0uICAgICAgIHxcbiAqXG4gKiBUaGUgY2hhcmFjdGVycyB3cmFwcGVkIGluIHNxdWFyZSBicmFja2V0cyBhcmUgZXNjYXBlZC5cbiAqXG4gKiBUaGUgcmVzdWx0IG1heSB2YXJ5IGJ5IGxvY2FsZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcGFyYW0ge1N0cmluZ30gZm9ybWF0IC0gdGhlIHN0cmluZyBvZiB0b2tlbnNcbiAqIEBwYXJhbSB7T3B0aW9uc30gW29wdGlvbnNdIC0gdGhlIG9iamVjdCB3aXRoIG9wdGlvbnMuIFNlZSBbT3B0aW9uc117QGxpbmsgaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy9PcHRpb25zfVxuICogQHBhcmFtIHswfDF8Mn0gW29wdGlvbnMuYWRkaXRpb25hbERpZ2l0cz0yXSAtIHBhc3NlZCB0byBgdG9EYXRlYC4gU2VlIFt0b0RhdGVde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvdG9EYXRlfVxuICogQHBhcmFtIHtMb2NhbGV9IFtvcHRpb25zLmxvY2FsZT1kZWZhdWx0TG9jYWxlXSAtIHRoZSBsb2NhbGUgb2JqZWN0LiBTZWUgW0xvY2FsZV17QGxpbmsgaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy9Mb2NhbGV9XG4gKiBAcmV0dXJucyB7U3RyaW5nfSB0aGUgZm9ybWF0dGVkIGRhdGUgc3RyaW5nXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDIgYXJndW1lbnRzIHJlcXVpcmVkXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzYCBtdXN0IGJlIDAsIDEgb3IgMlxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMubG9jYWxlYCBtdXN0IGNvbnRhaW4gYGxvY2FsaXplYCBwcm9wZXJ0eVxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMubG9jYWxlYCBtdXN0IGNvbnRhaW4gYGZvcm1hdExvbmdgIHByb3BlcnR5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFJlcHJlc2VudCAxMSBGZWJydWFyeSAyMDE0IGluIG1pZGRsZS1lbmRpYW4gZm9ybWF0OlxuICogdmFyIHJlc3VsdCA9IGZvcm1hdChcbiAqICAgbmV3IERhdGUoMjAxNCwgMSwgMTEpLFxuICogICAnTU0vREQvWVlZWSdcbiAqIClcbiAqIC8vPT4gJzAyLzExLzIwMTQnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFJlcHJlc2VudCAyIEp1bHkgMjAxNCBpbiBFc3BlcmFudG86XG4gKiBpbXBvcnQgeyBlb0xvY2FsZSB9IGZyb20gJ2RhdGUtZm5zL2xvY2FsZS9lbydcbiAqIHZhciByZXN1bHQgPSBmb3JtYXQoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDIpLFxuICogICAnRG8gW2RlXSBNTU1NIFlZWVknLFxuICogICB7bG9jYWxlOiBlb0xvY2FsZX1cbiAqIClcbiAqIC8vPT4gJzItYSBkZSBqdWxpbyAyMDE0J1xuICovXG5mdW5jdGlvbiBmb3JtYXQoZGlydHlEYXRlLCBkaXJ0eUZvcm1hdFN0ciwgZGlydHlPcHRpb25zKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJzIgYXJndW1lbnRzIHJlcXVpcmVkLCBidXQgb25seSAnICsgYXJndW1lbnRzLmxlbmd0aCArICcgcHJlc2VudCcpO1xuICB9XG5cbiAgdmFyIGZvcm1hdFN0ciA9IFN0cmluZyhkaXJ0eUZvcm1hdFN0cik7XG4gIHZhciBvcHRpb25zID0gZGlydHlPcHRpb25zIHx8IHt9O1xuXG4gIHZhciBsb2NhbGUgPSBvcHRpb25zLmxvY2FsZSB8fCBfaW5kZXg2LmRlZmF1bHQ7XG5cbiAgaWYgKCFsb2NhbGUubG9jYWxpemUpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignbG9jYWxlIG11c3QgY29udGFpbiBsb2NhbGl6ZSBwcm9wZXJ0eScpO1xuICB9XG5cbiAgaWYgKCFsb2NhbGUuZm9ybWF0TG9uZykge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdsb2NhbGUgbXVzdCBjb250YWluIGZvcm1hdExvbmcgcHJvcGVydHknKTtcbiAgfVxuXG4gIHZhciBsb2NhbGVGb3JtYXR0ZXJzID0gbG9jYWxlLmZvcm1hdHRlcnMgfHwge307XG4gIHZhciBmb3JtYXR0aW5nVG9rZW5zUmVnRXhwID0gbG9jYWxlLmZvcm1hdHRpbmdUb2tlbnNSZWdFeHAgfHwgZGVmYXVsdEZvcm1hdHRpbmdUb2tlbnNSZWdFeHA7XG4gIHZhciBmb3JtYXRMb25nID0gbG9jYWxlLmZvcm1hdExvbmc7XG5cbiAgdmFyIG9yaWdpbmFsRGF0ZSA9ICgwLCBfaW5kZXgyLmRlZmF1bHQpKGRpcnR5RGF0ZSwgb3B0aW9ucyk7XG5cbiAgaWYgKCEoMCwgX2luZGV4NC5kZWZhdWx0KShvcmlnaW5hbERhdGUsIG9wdGlvbnMpKSB7XG4gICAgcmV0dXJuICdJbnZhbGlkIERhdGUnO1xuICB9XG5cbiAgLy8gQ29udmVydCB0aGUgZGF0ZSBpbiBzeXN0ZW0gdGltZXpvbmUgdG8gdGhlIHNhbWUgZGF0ZSBpbiBVVEMrMDA6MDAgdGltZXpvbmUuXG4gIC8vIFRoaXMgZW5zdXJlcyB0aGF0IHdoZW4gVVRDIGZ1bmN0aW9ucyB3aWxsIGJlIGltcGxlbWVudGVkLCBsb2NhbGVzIHdpbGwgYmUgY29tcGF0aWJsZSB3aXRoIHRoZW0uXG4gIC8vIFNlZSBhbiBpc3N1ZSBhYm91dCBVVEMgZnVuY3Rpb25zOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvaXNzdWVzLzM3NlxuICB2YXIgdGltZXpvbmVPZmZzZXQgPSBvcmlnaW5hbERhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKTtcbiAgdmFyIHV0Y0RhdGUgPSAoMCwgX2luZGV4MTIuZGVmYXVsdCkob3JpZ2luYWxEYXRlLCAtdGltZXpvbmVPZmZzZXQsIG9wdGlvbnMpO1xuXG4gIHZhciBmb3JtYXR0ZXJPcHRpb25zID0gKDAsIF9pbmRleDEwLmRlZmF1bHQpKG9wdGlvbnMpO1xuICBmb3JtYXR0ZXJPcHRpb25zLmxvY2FsZSA9IGxvY2FsZTtcbiAgZm9ybWF0dGVyT3B0aW9ucy5mb3JtYXR0ZXJzID0gX2luZGV4OC5kZWZhdWx0O1xuXG4gIC8vIFdoZW4gVVRDIGZ1bmN0aW9ucyB3aWxsIGJlIGltcGxlbWVudGVkLCBvcHRpb25zLl9vcmlnaW5hbERhdGUgd2lsbCBsaWtlbHkgYmUgYSBwYXJ0IG9mIHB1YmxpYyBBUEkuXG4gIC8vIFJpZ2h0IG5vdywgcGxlYXNlIGRvbid0IHVzZSBpdCBpbiBsb2NhbGVzLiBJZiB5b3UgaGF2ZSB0byB1c2UgYW4gb3JpZ2luYWwgZGF0ZSxcbiAgLy8gcGxlYXNlIHJlc3RvcmUgaXQgZnJvbSBgZGF0ZWAsIGFkZGluZyBhIHRpbWV6b25lIG9mZnNldCB0byBpdC5cbiAgZm9ybWF0dGVyT3B0aW9ucy5fb3JpZ2luYWxEYXRlID0gb3JpZ2luYWxEYXRlO1xuXG4gIHZhciByZXN1bHQgPSBmb3JtYXRTdHIucmVwbGFjZShsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCwgZnVuY3Rpb24gKHN1YnN0cmluZykge1xuICAgIGlmIChzdWJzdHJpbmdbMF0gPT09ICdbJykge1xuICAgICAgcmV0dXJuIHN1YnN0cmluZztcbiAgICB9XG5cbiAgICBpZiAoc3Vic3RyaW5nWzBdID09PSAnXFxcXCcpIHtcbiAgICAgIHJldHVybiBjbGVhbkVzY2FwZWRTdHJpbmcoc3Vic3RyaW5nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm9ybWF0TG9uZyhzdWJzdHJpbmcpO1xuICB9KS5yZXBsYWNlKGZvcm1hdHRpbmdUb2tlbnNSZWdFeHAsIGZ1bmN0aW9uIChzdWJzdHJpbmcpIHtcbiAgICB2YXIgZm9ybWF0dGVyID0gbG9jYWxlRm9ybWF0dGVyc1tzdWJzdHJpbmddIHx8IF9pbmRleDguZGVmYXVsdFtzdWJzdHJpbmddO1xuXG4gICAgaWYgKGZvcm1hdHRlcikge1xuICAgICAgcmV0dXJuIGZvcm1hdHRlcih1dGNEYXRlLCBmb3JtYXR0ZXJPcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNsZWFuRXNjYXBlZFN0cmluZyhzdWJzdHJpbmcpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gY2xlYW5Fc2NhcGVkU3RyaW5nKGlucHV0KSB7XG4gIGlmIChpbnB1dC5tYXRjaCgvXFxbW1xcc1xcU10vKSkge1xuICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKC9eXFxbfF0kL2csICcnKTtcbiAgfVxuICByZXR1cm4gaW5wdXQucmVwbGFjZSgvXFxcXC9nLCAnJyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc1ZhbGlkO1xuXG52YXIgX2luZGV4ID0gcmVxdWlyZSgnLi4vdG9EYXRlL2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5kZXgpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIEBuYW1lIGlzVmFsaWRcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgdmFsaWQ/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm5zIGZhbHNlIGlmIGFyZ3VtZW50IGlzIEludmFsaWQgRGF0ZSBhbmQgdHJ1ZSBvdGhlcndpc2UuXG4gKiBBcmd1bWVudCBpcyBjb252ZXJ0ZWQgdG8gRGF0ZSB1c2luZyBgdG9EYXRlYC4gU2VlIFt0b0RhdGVde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvdG9EYXRlfVxuICogSW52YWxpZCBEYXRlIGlzIGEgRGF0ZSwgd2hvc2UgdGltZSB2YWx1ZSBpcyBOYU4uXG4gKlxuICogVGltZSB2YWx1ZSBvZiBEYXRlOiBodHRwOi8vZXM1LmdpdGh1Yi5pby8jeDE1LjkuMS4xXG4gKlxuICogQHBhcmFtIHsqfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSB7T3B0aW9uc30gW29wdGlvbnNdIC0gdGhlIG9iamVjdCB3aXRoIG9wdGlvbnMuIFNlZSBbT3B0aW9uc117QGxpbmsgaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy9PcHRpb25zfVxuICogQHBhcmFtIHswfDF8Mn0gW29wdGlvbnMuYWRkaXRpb25hbERpZ2l0cz0yXSAtIHBhc3NlZCB0byBgdG9EYXRlYC4gU2VlIFt0b0RhdGVde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvdG9EYXRlfVxuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlIGlzIHZhbGlkXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDEgYXJndW1lbnQgcmVxdWlyZWRcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBvcHRpb25zLmFkZGl0aW9uYWxEaWdpdHNgIG11c3QgYmUgMCwgMSBvciAyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciB0aGUgdmFsaWQgZGF0ZTpcbiAqIHZhciByZXN1bHQgPSBpc1ZhbGlkKG5ldyBEYXRlKDIwMTQsIDEsIDMxKSlcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIHZhbHVlLCBjb252ZXJ0YWJsZSBpbnRvIGEgZGF0ZTpcbiAqIHZhciByZXN1bHQgPSBpc1ZhbGlkKCcyMDE0LTAyLTMxJylcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIGludmFsaWQgZGF0ZTpcbiAqIHZhciByZXN1bHQgPSBpc1ZhbGlkKG5ldyBEYXRlKCcnKSlcbiAqIC8vPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNWYWxpZChkaXJ0eURhdGUsIGRpcnR5T3B0aW9ucykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDEpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcxIGFyZ3VtZW50IHJlcXVpcmVkLCBidXQgb25seSAnICsgYXJndW1lbnRzLmxlbmd0aCArICcgcHJlc2VudCcpO1xuICB9XG5cbiAgdmFyIGRhdGUgPSAoMCwgX2luZGV4Mi5kZWZhdWx0KShkaXJ0eURhdGUsIGRpcnR5T3B0aW9ucyk7XG4gIHJldHVybiAhaXNOYU4oZGF0ZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGJ1aWxkRm9ybWF0TG9uZ0ZuO1xudmFyIHRva2Vuc1RvQmVTaG9ydGVkUGF0dGVybiA9IC9NTU1NfE1NfEREfGRkZGQvZztcblxuZnVuY3Rpb24gYnVpbGRTaG9ydExvbmdGb3JtYXQoZm9ybWF0KSB7XG4gIHJldHVybiBmb3JtYXQucmVwbGFjZSh0b2tlbnNUb0JlU2hvcnRlZFBhdHRlcm4sIGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHJldHVybiB0b2tlbi5zbGljZSgxKTtcbiAgfSk7XG59XG5cbi8qKlxuICogQG5hbWUgYnVpbGRGb3JtYXRMb25nRm5cbiAqIEBjYXRlZ29yeSBMb2NhbGUgSGVscGVyc1xuICogQHN1bW1hcnkgQnVpbGQgYGZvcm1hdExvbmdgIHByb3BlcnR5IGZvciBsb2NhbGUgdXNlZCBieSBgZm9ybWF0YCwgYGZvcm1hdFJlbGF0aXZlYCBhbmQgYHBhcnNlYCBmdW5jdGlvbnMuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBCdWlsZCBgZm9ybWF0TG9uZ2AgcHJvcGVydHkgZm9yIGxvY2FsZSB1c2VkIGJ5IGBmb3JtYXRgLCBgZm9ybWF0UmVsYXRpdmVgIGFuZCBgcGFyc2VgIGZ1bmN0aW9ucy5cbiAqIFJldHVybnMgYSBmdW5jdGlvbiB3aGljaCB0YWtlcyBvbmUgb2YgdGhlIGZvbGxvd2luZyB0b2tlbnMgYXMgdGhlIGFyZ3VtZW50OlxuICogYCdMVFMnYCwgYCdMVCdgLCBgJ0wnYCwgYCdMTCdgLCBgJ0xMTCdgLCBgJ2wnYCwgYCdsbCdgLCBgJ2xsbCdgLCBgJ2xsbGwnYFxuICogYW5kIHJldHVybnMgYSBsb25nIGZvcm1hdCBzdHJpbmcgd3JpdHRlbiBhcyBgZm9ybWF0YCB0b2tlbiBzdHJpbmdzLlxuICogU2VlIFtmb3JtYXRde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvZm9ybWF0fVxuICpcbiAqIGAnbCdgLCBgJ2xsJ2AsIGAnbGxsJ2AgYW5kIGAnbGxsbCdgIGZvcm1hdHMgYXJlIGJ1aWx0IGF1dG9tYXRpY2FsbHlcbiAqIGJ5IHNob3J0ZW5pbmcgc29tZSBvZiB0aGUgdG9rZW5zIGZyb20gY29ycmVzcG9uZGluZyB1bnNob3J0ZW5lZCBmb3JtYXRzXG4gKiAoZS5nLiwgaWYgYExMYCBpcyBgJ01NTU0gREQgWVlZWSdgIHRoZW4gYGxsYCB3aWxsIGJlIGBNTU0gRCBZWVlZYClcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gdGhlIG9iamVjdCB3aXRoIGxvbmcgZm9ybWF0cyB3cml0dGVuIGFzIGBmb3JtYXRgIHRva2VuIHN0cmluZ3NcbiAqIEBwYXJhbSB7U3RyaW5nfSBvYmouTFQgLSB0aW1lIGZvcm1hdDogaG91cnMgYW5kIG1pbnV0ZXNcbiAqIEBwYXJhbSB7U3RyaW5nfSBvYmouTFRTIC0gdGltZSBmb3JtYXQ6IGhvdXJzLCBtaW51dGVzIGFuZCBzZWNvbmRzXG4gKiBAcGFyYW0ge1N0cmluZ30gb2JqLkwgLSBzaG9ydCBkYXRlIGZvcm1hdDogbnVtZXJpYyBkYXksIG1vbnRoIGFuZCB5ZWFyXG4gKiBAcGFyYW0ge1N0cmluZ30gW29iai5sXSAtIHNob3J0IGRhdGUgZm9ybWF0OiBudW1lcmljIGRheSwgbW9udGggYW5kIHllYXIgKHNob3J0ZW5lZClcbiAqIEBwYXJhbSB7U3RyaW5nfSBvYmouTEwgLSBsb25nIGRhdGUgZm9ybWF0OiBkYXksIG1vbnRoIGluIHdvcmRzLCBhbmQgeWVhclxuICogQHBhcmFtIHtTdHJpbmd9IFtvYmoubGxdIC0gbG9uZyBkYXRlIGZvcm1hdDogZGF5LCBtb250aCBpbiB3b3JkcywgYW5kIHllYXIgKHNob3J0ZW5lZClcbiAqIEBwYXJhbSB7U3RyaW5nfSBvYmouTExMIC0gbG9uZyBkYXRlIGFuZCB0aW1lIGZvcm1hdFxuICogQHBhcmFtIHtTdHJpbmd9IFtvYmoubGxsXSAtIGxvbmcgZGF0ZSBhbmQgdGltZSBmb3JtYXQgKHNob3J0ZW5lZClcbiAqIEBwYXJhbSB7U3RyaW5nfSBvYmouTExMTCAtIGxvbmcgZGF0ZSwgdGltZSBhbmQgd2Vla2RheSBmb3JtYXRcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb2JqLmxsbGxdIC0gbG9uZyBkYXRlLCB0aW1lIGFuZCB3ZWVrZGF5IGZvcm1hdCAoc2hvcnRlbmVkKVxuICogQHJldHVybnMge0Z1bmN0aW9ufSBgZm9ybWF0TG9uZ2AgcHJvcGVydHkgb2YgdGhlIGxvY2FsZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgYGVuLVVTYCBsb2NhbGU6XG4gKiBsb2NhbGUuZm9ybWF0TG9uZyA9IGJ1aWxkRm9ybWF0TG9uZ0ZuKHtcbiAqICAgTFQ6ICdoOm1tIGFhJyxcbiAqICAgTFRTOiAnaDptbTpzcyBhYScsXG4gKiAgIEw6ICdNTS9ERC9ZWVlZJyxcbiAqICAgTEw6ICdNTU1NIEQgWVlZWScsXG4gKiAgIExMTDogJ01NTU0gRCBZWVlZIGg6bW0gYWEnLFxuICogICBMTExMOiAnZGRkZCwgTU1NTSBEIFlZWVkgaDptbSBhYSdcbiAqIH0pXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkRm9ybWF0TG9uZ0ZuKG9iaikge1xuICB2YXIgZm9ybWF0TG9uZ0xvY2FsZSA9IHtcbiAgICBMVFM6IG9iai5MVFMsXG4gICAgTFQ6IG9iai5MVCxcbiAgICBMOiBvYmouTCxcbiAgICBMTDogb2JqLkxMLFxuICAgIExMTDogb2JqLkxMTCxcbiAgICBMTExMOiBvYmouTExMTCxcbiAgICBsOiBvYmoubCB8fCBidWlsZFNob3J0TG9uZ0Zvcm1hdChvYmouTCksXG4gICAgbGw6IG9iai5sbCB8fCBidWlsZFNob3J0TG9uZ0Zvcm1hdChvYmouTEwpLFxuICAgIGxsbDogb2JqLmxsbCB8fCBidWlsZFNob3J0TG9uZ0Zvcm1hdChvYmouTExMKSxcbiAgICBsbGxsOiBvYmoubGxsbCB8fCBidWlsZFNob3J0TG9uZ0Zvcm1hdChvYmouTExMTClcbiAgfTtcblxuICByZXR1cm4gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgcmV0dXJuIGZvcm1hdExvbmdMb2NhbGVbdG9rZW5dO1xuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGJ1aWxkTG9jYWxpemVBcnJheUZuO1xuLyoqXG4gKiBAbmFtZSBidWlsZExvY2FsaXplQXJyYXlGblxuICogQGNhdGVnb3J5IExvY2FsZSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBCdWlsZCBgbG9jYWxpemUud2Vla2RheXNgLCBgbG9jYWxpemUubW9udGhzYCBhbmQgYGxvY2FsaXplLnRpbWVzT2ZEYXlgIHByb3BlcnRpZXMgZm9yIHRoZSBsb2NhbGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBCdWlsZCBgbG9jYWxpemUud2Vla2RheXNgLCBgbG9jYWxpemUubW9udGhzYCBhbmQgYGxvY2FsaXplLnRpbWVzT2ZEYXlgIHByb3BlcnRpZXMgZm9yIHRoZSBsb2NhbGUuXG4gKiBJZiBubyBgdHlwZWAgaXMgc3VwcGxpZWQgdG8gdGhlIG9wdGlvbnMgb2YgdGhlIHJlc3VsdGluZyBmdW5jdGlvbiwgYGRlZmF1bHRUeXBlYCB3aWxsIGJlIHVzZWQgKHNlZSBleGFtcGxlKS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsdWVzIC0gdGhlIG9iamVjdCB3aXRoIGFycmF5cyBvZiB2YWx1ZXNcbiAqIEBwYXJhbSB7U3RyaW5nfSBkZWZhdWx0VHlwZSAtIHRoZSBkZWZhdWx0IHR5cGUgZm9yIHRoZSBsb2NhbGl6ZSBmdW5jdGlvblxuICogQHJldHVybnMge0Z1bmN0aW9ufSB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciB3ZWVrZGF5VmFsdWVzID0ge1xuICogICBuYXJyb3c6IFsnU3UnLCAnTW8nLCAnVHUnLCAnV2UnLCAnVGgnLCAnRnInLCAnU2EnXSxcbiAqICAgc2hvcnQ6IFsnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0J10sXG4gKiAgIGxvbmc6IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXVxuICogfVxuICogbG9jYWxlLmxvY2FsaXplLndlZWtkYXlzID0gYnVpbGRMb2NhbGl6ZUFycmF5Rm4od2Vla2RheVZhbHVlcywgJ2xvbmcnKVxuICogbG9jYWxlLmxvY2FsaXplLndlZWtkYXlzKHt0eXBlOiAnbmFycm93J30pIC8vPT4gWydTdScsICdNbycsIC4uLl1cbiAqIGxvY2FsZS5sb2NhbGl6ZS53ZWVrZGF5cygpIC8vPT4gWydTdW5kYXknLCAnTW9uZGF5JywgLi4uXVxuICovXG5mdW5jdGlvbiBidWlsZExvY2FsaXplQXJyYXlGbih2YWx1ZXMsIGRlZmF1bHRUeXBlKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZGlydHlPcHRpb25zKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBkaXJ0eU9wdGlvbnMgfHwge307XG4gICAgdmFyIHR5cGUgPSBvcHRpb25zLnR5cGUgPyBTdHJpbmcob3B0aW9ucy50eXBlKSA6IGRlZmF1bHRUeXBlO1xuICAgIHJldHVybiB2YWx1ZXNbdHlwZV0gfHwgdmFsdWVzW2RlZmF1bHRUeXBlXTtcbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBidWlsZExvY2FsaXplRm47XG4vKipcbiAqIEBuYW1lIGJ1aWxkTG9jYWxpemVGblxuICogQGNhdGVnb3J5IExvY2FsZSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBCdWlsZCBgbG9jYWxpemUud2Vla2RheWAsIGBsb2NhbGl6ZS5tb250aGAgYW5kIGBsb2NhbGl6ZS50aW1lT2ZEYXlgIHByb3BlcnRpZXMgZm9yIHRoZSBsb2NhbGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBCdWlsZCBgbG9jYWxpemUud2Vla2RheWAsIGBsb2NhbGl6ZS5tb250aGAgYW5kIGBsb2NhbGl6ZS50aW1lT2ZEYXlgIHByb3BlcnRpZXMgZm9yIHRoZSBsb2NhbGVcbiAqIHVzZWQgYnkgYGZvcm1hdGAgZnVuY3Rpb24uXG4gKiBJZiBubyBgdHlwZWAgaXMgc3VwcGxpZWQgdG8gdGhlIG9wdGlvbnMgb2YgdGhlIHJlc3VsdGluZyBmdW5jdGlvbiwgYGRlZmF1bHRUeXBlYCB3aWxsIGJlIHVzZWQgKHNlZSBleGFtcGxlKS5cbiAqXG4gKiBgbG9jYWxpemUud2Vla2RheWAgZnVuY3Rpb24gdGFrZXMgdGhlIHdlZWtkYXkgaW5kZXggYXMgYXJndW1lbnQgKDAgLSBTdW5kYXkpLlxuICogYGxvY2FsaXplLm1vbnRoYCB0YWtlcyB0aGUgbW9udGggaW5kZXggKDAgLSBKYW51YXJ5KS5cbiAqIGBsb2NhbGl6ZS50aW1lT2ZEYXlgIHRha2VzIHRoZSBob3Vycy4gVXNlIGBpbmRleENhbGxiYWNrYCB0byBjb252ZXJ0IHRoZW0gdG8gYW4gYXJyYXkgaW5kZXggKHNlZSBleGFtcGxlKS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsdWVzIC0gdGhlIG9iamVjdCB3aXRoIGFycmF5cyBvZiB2YWx1ZXNcbiAqIEBwYXJhbSB7U3RyaW5nfSBkZWZhdWx0VHlwZSAtIHRoZSBkZWZhdWx0IHR5cGUgZm9yIHRoZSBsb2NhbGl6ZSBmdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2luZGV4Q2FsbGJhY2tdIC0gdGhlIGNhbGxiYWNrIHdoaWNoIHRha2VzIHRoZSByZXN1bHRpbmcgZnVuY3Rpb24gYXJndW1lbnRcbiAqICAgYW5kIGNvbnZlcnRzIGl0IGludG8gdmFsdWUgYXJyYXkgaW5kZXhcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gdGhlIHJlc3VsdGluZyBmdW5jdGlvblxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgdGltZU9mRGF5VmFsdWVzID0ge1xuICogICB1cHBlcmNhc2U6IFsnQU0nLCAnUE0nXSxcbiAqICAgbG93ZXJjYXNlOiBbJ2FtJywgJ3BtJ10sXG4gKiAgIGxvbmc6IFsnYS5tLicsICdwLm0uJ11cbiAqIH1cbiAqIGxvY2FsZS5sb2NhbGl6ZS50aW1lT2ZEYXkgPSBidWlsZExvY2FsaXplRm4odGltZU9mRGF5VmFsdWVzLCAnbG9uZycsIGZ1bmN0aW9uIChob3Vycykge1xuICogICAvLyAwIGlzIGEubS4gYXJyYXkgaW5kZXgsIDEgaXMgcC5tLiBhcnJheSBpbmRleFxuICogICByZXR1cm4gKGhvdXJzIC8gMTIpID49IDEgPyAxIDogMFxuICogfSlcbiAqIGxvY2FsZS5sb2NhbGl6ZS50aW1lT2ZEYXkoMTYsIHt0eXBlOiAndXBwZXJjYXNlJ30pIC8vPT4gJ1BNJ1xuICogbG9jYWxlLmxvY2FsaXplLnRpbWVPZkRheSg1KSAvLz0+ICdhLm0uJ1xuICovXG5mdW5jdGlvbiBidWlsZExvY2FsaXplRm4odmFsdWVzLCBkZWZhdWx0VHlwZSwgaW5kZXhDYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gKGRpcnR5SW5kZXgsIGRpcnR5T3B0aW9ucykge1xuICAgIHZhciBvcHRpb25zID0gZGlydHlPcHRpb25zIHx8IHt9O1xuICAgIHZhciB0eXBlID0gb3B0aW9ucy50eXBlID8gU3RyaW5nKG9wdGlvbnMudHlwZSkgOiBkZWZhdWx0VHlwZTtcbiAgICB2YXIgdmFsdWVzQXJyYXkgPSB2YWx1ZXNbdHlwZV0gfHwgdmFsdWVzW2RlZmF1bHRUeXBlXTtcbiAgICB2YXIgaW5kZXggPSBpbmRleENhbGxiYWNrID8gaW5kZXhDYWxsYmFjayhOdW1iZXIoZGlydHlJbmRleCkpIDogTnVtYmVyKGRpcnR5SW5kZXgpO1xuICAgIHJldHVybiB2YWx1ZXNBcnJheVtpbmRleF07XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gYnVpbGRNYXRjaEZuO1xuLyoqXG4gKiBAbmFtZSBidWlsZE1hdGNoRm5cbiAqIEBjYXRlZ29yeSBMb2NhbGUgSGVscGVyc1xuICogQHN1bW1hcnkgQnVpbGQgYG1hdGNoLndlZWtkYXlzYCwgYG1hdGNoLm1vbnRoc2AgYW5kIGBtYXRjaC50aW1lc09mRGF5YCBwcm9wZXJ0aWVzIGZvciB0aGUgbG9jYWxlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQnVpbGQgYG1hdGNoLndlZWtkYXlzYCwgYG1hdGNoLm1vbnRoc2AgYW5kIGBtYXRjaC50aW1lc09mRGF5YCBwcm9wZXJ0aWVzIGZvciB0aGUgbG9jYWxlIHVzZWQgYnkgYHBhcnNlYCBmdW5jdGlvbi5cbiAqIElmIG5vIGB0eXBlYCBpcyBzdXBwbGllZCB0byB0aGUgb3B0aW9ucyBvZiB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uLCBgZGVmYXVsdFR5cGVgIHdpbGwgYmUgdXNlZCAoc2VlIGV4YW1wbGUpLlxuICogVGhlIHJlc3VsdCBvZiB0aGUgbWF0Y2ggZnVuY3Rpb24gd2lsbCBiZSBwYXNzZWQgaW50byBjb3JyZXNwb25kaW5nIHBhcnNlciBmdW5jdGlvblxuICogKGBtYXRjaC53ZWVrZGF5YCwgYG1hdGNoLm1vbnRoYCBvciBgbWF0Y2gudGltZU9mRGF5YCByZXNwZWN0aXZlbHkuIFNlZSBgYnVpbGRQYXJzZUZuYCkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbHVlcyAtIHRoZSBvYmplY3Qgd2l0aCBSZWdFeHBzXG4gKiBAcGFyYW0ge1N0cmluZ30gZGVmYXVsdFR5cGUgLSB0aGUgZGVmYXVsdCB0eXBlIGZvciB0aGUgbWF0Y2ggZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gdGhlIHJlc3VsdGluZyBmdW5jdGlvblxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgbWF0Y2hXZWVrZGF5c1BhdHRlcm5zID0ge1xuICogICBuYXJyb3c6IC9eKHN1fG1vfHR1fHdlfHRofGZyfHNhKS9pLFxuICogICBzaG9ydDogL14oc3VufG1vbnx0dWV8d2VkfHRodXxmcml8c2F0KS9pLFxuICogICBsb25nOiAvXihzdW5kYXl8bW9uZGF5fHR1ZXNkYXl8d2VkbmVzZGF5fHRodXJzZGF5fGZyaWRheXxzYXR1cmRheSkvaVxuICogfVxuICogbG9jYWxlLm1hdGNoLndlZWtkYXlzID0gYnVpbGRNYXRjaEZuKG1hdGNoV2Vla2RheXNQYXR0ZXJucywgJ2xvbmcnKVxuICogbG9jYWxlLm1hdGNoLndlZWtkYXlzKCdTdW5kYXknLCB7dHlwZTogJ25hcnJvdyd9KSAvLz0+IFsnU3UnLCAnU3UnLCAuLi5dXG4gKiBsb2NhbGUubWF0Y2gud2Vla2RheXMoJ1N1bmRheScpIC8vPT4gWydTdW5kYXknLCAnU3VuZGF5JywgLi4uXVxuICovXG5mdW5jdGlvbiBidWlsZE1hdGNoRm4ocGF0dGVybnMsIGRlZmF1bHRUeXBlKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZGlydHlTdHJpbmcsIGRpcnR5T3B0aW9ucykge1xuICAgIHZhciBvcHRpb25zID0gZGlydHlPcHRpb25zIHx8IHt9O1xuICAgIHZhciB0eXBlID0gb3B0aW9ucy50eXBlID8gU3RyaW5nKG9wdGlvbnMudHlwZSkgOiBkZWZhdWx0VHlwZTtcbiAgICB2YXIgcGF0dGVybiA9IHBhdHRlcm5zW3R5cGVdIHx8IHBhdHRlcm5zW2RlZmF1bHRUeXBlXTtcbiAgICB2YXIgc3RyaW5nID0gU3RyaW5nKGRpcnR5U3RyaW5nKTtcbiAgICByZXR1cm4gc3RyaW5nLm1hdGNoKHBhdHRlcm4pO1xuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGJ1aWxkTWF0Y2hQYXR0ZXJuRm47XG4vKipcbiAqIEBuYW1lIGJ1aWxkTWF0Y2hQYXR0ZXJuRm5cbiAqIEBjYXRlZ29yeSBMb2NhbGUgSGVscGVyc1xuICogQHN1bW1hcnkgQnVpbGQgbWF0Y2ggZnVuY3Rpb24gZnJvbSBhIHNpbmdsZSBSZWdFeHAuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBCdWlsZCBtYXRjaCBmdW5jdGlvbiBmcm9tIGEgc2luZ2xlIFJlZ0V4cC5cbiAqIFVzdWFsbHkgdXNlZCBmb3IgYnVpbGRpbmcgYG1hdGNoLm9yZGluYWxOdW1iZXJzYCBwcm9wZXJ0eSBvZiB0aGUgbG9jYWxlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXR0ZXJuIC0gdGhlIFJlZ0V4cFxuICogQHJldHVybnMge0Z1bmN0aW9ufSB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uXG4gKlxuICogQGV4YW1wbGVcbiAqIGxvY2FsZS5tYXRjaC5vcmRpbmFsTnVtYmVycyA9IGJ1aWxkTWF0Y2hQYXR0ZXJuRm4oL14oXFxkKykodGh8c3R8bmR8cmQpPy9pKVxuICogbG9jYWxlLm1hdGNoLm9yZGluYWxOdW1iZXJzKCczcmQnKSAvLz0+IFsnM3JkJywgJzMnLCAncmQnLCAuLi5dXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkTWF0Y2hQYXR0ZXJuRm4ocGF0dGVybikge1xuICByZXR1cm4gZnVuY3Rpb24gKGRpcnR5U3RyaW5nKSB7XG4gICAgdmFyIHN0cmluZyA9IFN0cmluZyhkaXJ0eVN0cmluZyk7XG4gICAgcmV0dXJuIHN0cmluZy5tYXRjaChwYXR0ZXJuKTtcbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBidWlsZFBhcnNlRm47XG4vKipcbiAqIEBuYW1lIGJ1aWxkUGFyc2VGblxuICogQGNhdGVnb3J5IExvY2FsZSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBCdWlsZCBgbWF0Y2gud2Vla2RheWAsIGBtYXRjaC5tb250aGAgYW5kIGBtYXRjaC50aW1lT2ZEYXlgIHByb3BlcnRpZXMgZm9yIHRoZSBsb2NhbGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBCdWlsZCBgbWF0Y2gud2Vla2RheWAsIGBtYXRjaC5tb250aGAgYW5kIGBtYXRjaC50aW1lT2ZEYXlgIHByb3BlcnRpZXMgZm9yIHRoZSBsb2NhbGUgdXNlZCBieSBgcGFyc2VgIGZ1bmN0aW9uLlxuICogVGhlIGFyZ3VtZW50IG9mIHRoZSByZXN1bHRpbmcgZnVuY3Rpb24gaXMgdGhlIHJlc3VsdCBvZiB0aGUgY29ycmVzcG9uZGluZyBtYXRjaCBmdW5jdGlvblxuICogKGBtYXRjaC53ZWVrZGF5c2AsIGBtYXRjaC5tb250aHNgIG9yIGBtYXRjaC50aW1lc09mRGF5YCByZXNwZWN0aXZlbHkuIFNlZSBgYnVpbGRNYXRjaEZuYCkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbHVlcyAtIHRoZSBvYmplY3Qgd2l0aCBhcnJheXMgb2YgUmVnRXhwc1xuICogQHBhcmFtIHtTdHJpbmd9IGRlZmF1bHRUeXBlIC0gdGhlIGRlZmF1bHQgdHlwZSBmb3IgdGhlIHBhcnNlciBmdW5jdGlvblxuICogQHJldHVybnMge0Z1bmN0aW9ufSB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBwYXJzZVdlZWtkYXlQYXR0ZXJucyA9IHtcbiAqICAgYW55OiBbL15zdS9pLCAvXm0vaSwgL150dS9pLCAvXncvaSwgL150aC9pLCAvXmYvaSwgL15zYS9pXVxuICogfVxuICogbG9jYWxlLm1hdGNoLndlZWtkYXkgPSBidWlsZFBhcnNlRm4obWF0Y2hXZWVrZGF5c1BhdHRlcm5zLCAnbG9uZycpXG4gKiB2YXIgbWF0Y2hSZXN1bHQgPSBsb2NhbGUubWF0Y2gud2Vla2RheXMoJ0ZyaWRheScpXG4gKiBsb2NhbGUubWF0Y2gud2Vla2RheShtYXRjaFJlc3VsdCkgLy89PiA1XG4gKi9cbmZ1bmN0aW9uIGJ1aWxkUGFyc2VGbihwYXR0ZXJucywgZGVmYXVsdFR5cGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChtYXRjaFJlc3VsdCwgZGlydHlPcHRpb25zKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBkaXJ0eU9wdGlvbnMgfHwge307XG4gICAgdmFyIHR5cGUgPSBvcHRpb25zLnR5cGUgPyBTdHJpbmcob3B0aW9ucy50eXBlKSA6IGRlZmF1bHRUeXBlO1xuICAgIHZhciBwYXR0ZXJuc0FycmF5ID0gcGF0dGVybnNbdHlwZV0gfHwgcGF0dGVybnNbZGVmYXVsdFR5cGVdO1xuICAgIHZhciBzdHJpbmcgPSBtYXRjaFJlc3VsdFsxXTtcblxuICAgIHJldHVybiBwYXR0ZXJuc0FycmF5LmZpbmRJbmRleChmdW5jdGlvbiAocGF0dGVybikge1xuICAgICAgcmV0dXJuIHBhdHRlcm4udGVzdChzdHJpbmcpO1xuICAgIH0pO1xuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHBhcnNlRGVjaW1hbDtcbi8qKlxuICogQG5hbWUgcGFyc2VEZWNpbWFsXG4gKiBAY2F0ZWdvcnkgTG9jYWxlIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFBhcnNlcyB0aGUgbWF0Y2ggcmVzdWx0IGludG8gZGVjaW1hbCBudW1iZXIuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBQYXJzZXMgdGhlIG1hdGNoIHJlc3VsdCBpbnRvIGRlY2ltYWwgbnVtYmVyLlxuICogVXNlcyB0aGUgc3RyaW5nIG1hdGNoZWQgd2l0aCB0aGUgZmlyc3Qgc2V0IG9mIHBhcmVudGhlc2VzIG9mIG1hdGNoIFJlZ0V4cC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBtYXRjaFJlc3VsdCAtIHRoZSBvYmplY3QgcmV0dXJuZWQgYnkgbWF0Y2hpbmcgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBwYXJzZWQgdmFsdWVcbiAqXG4gKiBAZXhhbXBsZVxuICogbG9jYWxlLm1hdGNoID0ge1xuICogICBvcmRpbmFsTnVtYmVyczogKGRpcnR5U3RyaW5nKSB7XG4gKiAgICAgcmV0dXJuIFN0cmluZyhkaXJ0eVN0cmluZykubWF0Y2goL14oXFxkKykodGh8c3R8bmR8cmQpPy9pKVxuICogICB9LFxuICogICBvcmRpbmFsTnVtYmVyOiBwYXJzZURlY2ltYWxcbiAqIH1cbiAqL1xuZnVuY3Rpb24gcGFyc2VEZWNpbWFsKG1hdGNoUmVzdWx0KSB7XG4gIHJldHVybiBwYXJzZUludChtYXRjaFJlc3VsdFsxXSwgMTApO1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBmb3JtYXREaXN0YW5jZTtcbnZhciBmb3JtYXREaXN0YW5jZUxvY2FsZSA9IHtcbiAgbGVzc1RoYW5YU2Vjb25kczoge1xuICAgIG9uZTogJ2xlc3MgdGhhbiBhIHNlY29uZCcsXG4gICAgb3RoZXI6ICdsZXNzIHRoYW4ge3tjb3VudH19IHNlY29uZHMnXG4gIH0sXG5cbiAgeFNlY29uZHM6IHtcbiAgICBvbmU6ICcxIHNlY29uZCcsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0gc2Vjb25kcydcbiAgfSxcblxuICBoYWxmQU1pbnV0ZTogJ2hhbGYgYSBtaW51dGUnLFxuXG4gIGxlc3NUaGFuWE1pbnV0ZXM6IHtcbiAgICBvbmU6ICdsZXNzIHRoYW4gYSBtaW51dGUnLFxuICAgIG90aGVyOiAnbGVzcyB0aGFuIHt7Y291bnR9fSBtaW51dGVzJ1xuICB9LFxuXG4gIHhNaW51dGVzOiB7XG4gICAgb25lOiAnMSBtaW51dGUnLFxuICAgIG90aGVyOiAne3tjb3VudH19IG1pbnV0ZXMnXG4gIH0sXG5cbiAgYWJvdXRYSG91cnM6IHtcbiAgICBvbmU6ICdhYm91dCAxIGhvdXInLFxuICAgIG90aGVyOiAnYWJvdXQge3tjb3VudH19IGhvdXJzJ1xuICB9LFxuXG4gIHhIb3Vyczoge1xuICAgIG9uZTogJzEgaG91cicsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0gaG91cnMnXG4gIH0sXG5cbiAgeERheXM6IHtcbiAgICBvbmU6ICcxIGRheScsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0gZGF5cydcbiAgfSxcblxuICBhYm91dFhNb250aHM6IHtcbiAgICBvbmU6ICdhYm91dCAxIG1vbnRoJyxcbiAgICBvdGhlcjogJ2Fib3V0IHt7Y291bnR9fSBtb250aHMnXG4gIH0sXG5cbiAgeE1vbnRoczoge1xuICAgIG9uZTogJzEgbW9udGgnLFxuICAgIG90aGVyOiAne3tjb3VudH19IG1vbnRocydcbiAgfSxcblxuICBhYm91dFhZZWFyczoge1xuICAgIG9uZTogJ2Fib3V0IDEgeWVhcicsXG4gICAgb3RoZXI6ICdhYm91dCB7e2NvdW50fX0geWVhcnMnXG4gIH0sXG5cbiAgeFllYXJzOiB7XG4gICAgb25lOiAnMSB5ZWFyJyxcbiAgICBvdGhlcjogJ3t7Y291bnR9fSB5ZWFycydcbiAgfSxcblxuICBvdmVyWFllYXJzOiB7XG4gICAgb25lOiAnb3ZlciAxIHllYXInLFxuICAgIG90aGVyOiAnb3ZlciB7e2NvdW50fX0geWVhcnMnXG4gIH0sXG5cbiAgYWxtb3N0WFllYXJzOiB7XG4gICAgb25lOiAnYWxtb3N0IDEgeWVhcicsXG4gICAgb3RoZXI6ICdhbG1vc3Qge3tjb3VudH19IHllYXJzJ1xuICB9XG59O1xuXG5mdW5jdGlvbiBmb3JtYXREaXN0YW5jZSh0b2tlbiwgY291bnQsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHJlc3VsdDtcbiAgaWYgKHR5cGVvZiBmb3JtYXREaXN0YW5jZUxvY2FsZVt0b2tlbl0gPT09ICdzdHJpbmcnKSB7XG4gICAgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2VMb2NhbGVbdG9rZW5dO1xuICB9IGVsc2UgaWYgKGNvdW50ID09PSAxKSB7XG4gICAgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2VMb2NhbGVbdG9rZW5dLm9uZTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSBmb3JtYXREaXN0YW5jZUxvY2FsZVt0b2tlbl0ub3RoZXIucmVwbGFjZSgne3tjb3VudH19JywgY291bnQpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuYWRkU3VmZml4KSB7XG4gICAgaWYgKG9wdGlvbnMuY29tcGFyaXNvbiA+IDApIHtcbiAgICAgIHJldHVybiAnaW4gJyArIHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlc3VsdCArICcgYWdvJztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2luZGV4ID0gcmVxdWlyZSgnLi4vLi4vLi4vX2xpYi9idWlsZEZvcm1hdExvbmdGbi9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luZGV4KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGZvcm1hdExvbmcgPSAoMCwgX2luZGV4Mi5kZWZhdWx0KSh7XG4gIExUOiAnaDptbSBhYScsXG4gIExUUzogJ2g6bW06c3MgYWEnLFxuICBMOiAnTU0vREQvWVlZWScsXG4gIExMOiAnTU1NTSBEIFlZWVknLFxuICBMTEw6ICdNTU1NIEQgWVlZWSBoOm1tIGFhJyxcbiAgTExMTDogJ2RkZGQsIE1NTU0gRCBZWVlZIGg6bW0gYWEnXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZm9ybWF0TG9uZztcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGZvcm1hdFJlbGF0aXZlO1xudmFyIGZvcm1hdFJlbGF0aXZlTG9jYWxlID0ge1xuICBsYXN0V2VlazogJ1tsYXN0XSBkZGRkIFthdF0gTFQnLFxuICB5ZXN0ZXJkYXk6ICdbeWVzdGVyZGF5IGF0XSBMVCcsXG4gIHRvZGF5OiAnW3RvZGF5IGF0XSBMVCcsXG4gIHRvbW9ycm93OiAnW3RvbW9ycm93IGF0XSBMVCcsXG4gIG5leHRXZWVrOiAnZGRkZCBbYXRdIExUJyxcbiAgb3RoZXI6ICdMJ1xufTtcblxuZnVuY3Rpb24gZm9ybWF0UmVsYXRpdmUodG9rZW4sIGRhdGUsIGJhc2VEYXRlLCBvcHRpb25zKSB7XG4gIHJldHVybiBmb3JtYXRSZWxhdGl2ZUxvY2FsZVt0b2tlbl07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfaW5kZXggPSByZXF1aXJlKCcuLi8uLi8uLi9fbGliL2J1aWxkTG9jYWxpemVGbi9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luZGV4KTtcblxudmFyIF9pbmRleDMgPSByZXF1aXJlKCcuLi8uLi8uLi9fbGliL2J1aWxkTG9jYWxpemVBcnJheUZuL2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXg0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5kZXgzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy8gTm90ZTogaW4gRW5nbGlzaCwgdGhlIG5hbWVzIG9mIGRheXMgb2YgdGhlIHdlZWsgYW5kIG1vbnRocyBhcmUgY2FwaXRhbGl6ZWQuXG4vLyBJZiB5b3UgYXJlIG1ha2luZyBhIG5ldyBsb2NhbGUgYmFzZWQgb24gdGhpcyBvbmUsIGNoZWNrIGlmIHRoZSBzYW1lIGlzIHRydWUgZm9yIHRoZSBsYW5ndWFnZSB5b3UncmUgd29ya2luZyBvbi5cbi8vIEdlbmVyYWxseSwgZm9ybWF0dGVkIGRhdGVzIHNob3VsZCBsb29rIGxpa2UgdGhleSBhcmUgaW4gdGhlIG1pZGRsZSBvZiBhIHNlbnRlbmNlLFxuLy8gZS5nLiBpbiBTcGFuaXNoIGxhbmd1YWdlIHRoZSB3ZWVrZGF5cyBhbmQgbW9udGhzIHNob3VsZCBiZSBpbiB0aGUgbG93ZXJjYXNlLlxudmFyIHdlZWtkYXlWYWx1ZXMgPSB7XG4gIG5hcnJvdzogWydTdScsICdNbycsICdUdScsICdXZScsICdUaCcsICdGcicsICdTYSddLFxuICBzaG9ydDogWydTdW4nLCAnTW9uJywgJ1R1ZScsICdXZWQnLCAnVGh1JywgJ0ZyaScsICdTYXQnXSxcbiAgbG9uZzogWydTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSddXG59O1xuXG52YXIgbW9udGhWYWx1ZXMgPSB7XG4gIHNob3J0OiBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ10sXG4gIGxvbmc6IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddXG59O1xuXG4vLyBgdGltZU9mRGF5YCBpcyB1c2VkIHRvIGRlc2lnbmF0ZSB3aGljaCBwYXJ0IG9mIHRoZSBkYXkgaXQgaXMsIHdoZW4gdXNlZCB3aXRoIDEyLWhvdXIgY2xvY2suXG4vLyBVc2UgdGhlIHN5c3RlbSB3aGljaCBpcyB1c2VkIHRoZSBtb3N0IGNvbW1vbmx5IGluIHRoZSBsb2NhbGUuXG4vLyBGb3IgZXhhbXBsZSwgaWYgdGhlIGNvdW50cnkgZG9lc24ndCB1c2UgYS5tLi9wLm0uLCB5b3UgY2FuIHVzZSBgbmlnaHRgL2Btb3JuaW5nYC9gYWZ0ZXJub29uYC9gZXZlbmluZ2A6XG4vL1xuLy8gICB2YXIgdGltZU9mRGF5VmFsdWVzID0ge1xuLy8gICAgIGFueTogWydpbiB0aGUgbmlnaHQnLCAnaW4gdGhlIG1vcm5pbmcnLCAnaW4gdGhlIGFmdGVybm9vbicsICdpbiB0aGUgZXZlbmluZyddXG4vLyAgIH1cbi8vXG4vLyBBbmQgbGF0ZXI6XG4vL1xuLy8gICB2YXIgbG9jYWxpemUgPSB7XG4vLyAgICAgLy8gVGhlIGNhbGxiYWNrIHRha2VzIHRoZSBob3VycyBhcyB0aGUgYXJndW1lbnQgYW5kIHJldHVybnMgdGhlIGFycmF5IGluZGV4XG4vLyAgICAgdGltZU9mRGF5OiBidWlsZExvY2FsaXplRm4odGltZU9mRGF5VmFsdWVzLCAnYW55JywgZnVuY3Rpb24gKGhvdXJzKSB7XG4vLyAgICAgICBpZiAoaG91cnMgPj0gMTcpIHtcbi8vICAgICAgICAgcmV0dXJuIDNcbi8vICAgICAgIH0gZWxzZSBpZiAoaG91cnMgPj0gMTIpIHtcbi8vICAgICAgICAgcmV0dXJuIDJcbi8vICAgICAgIH0gZWxzZSBpZiAoaG91cnMgPj0gNCkge1xuLy8gICAgICAgICByZXR1cm4gMVxuLy8gICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgcmV0dXJuIDBcbi8vICAgICAgIH1cbi8vICAgICB9KSxcbi8vICAgICB0aW1lc09mRGF5OiBidWlsZExvY2FsaXplQXJyYXlGbih0aW1lT2ZEYXlWYWx1ZXMsICdhbnknKVxuLy8gICB9XG52YXIgdGltZU9mRGF5VmFsdWVzID0ge1xuICB1cHBlcmNhc2U6IFsnQU0nLCAnUE0nXSxcbiAgbG93ZXJjYXNlOiBbJ2FtJywgJ3BtJ10sXG4gIGxvbmc6IFsnYS5tLicsICdwLm0uJ11cbn07XG5cbmZ1bmN0aW9uIG9yZGluYWxOdW1iZXIoZGlydHlOdW1iZXIsIGRpcnR5T3B0aW9ucykge1xuICB2YXIgbnVtYmVyID0gTnVtYmVyKGRpcnR5TnVtYmVyKTtcblxuICAvLyBJZiBvcmRpbmFsIG51bWJlcnMgZGVwZW5kIG9uIGNvbnRleHQsIGZvciBleGFtcGxlLFxuICAvLyBpZiB0aGV5IGFyZSBkaWZmZXJlbnQgZm9yIGRpZmZlcmVudCBncmFtbWF0aWNhbCBnZW5kZXJzLFxuICAvLyB1c2UgYG9wdGlvbnMudW5pdGA6XG4gIC8vXG4gIC8vICAgdmFyIG9wdGlvbnMgPSBkaXJ0eU9wdGlvbnMgfHwge31cbiAgLy8gICB2YXIgdW5pdCA9IFN0cmluZyhvcHRpb25zLnVuaXQpXG4gIC8vXG4gIC8vIHdoZXJlIGB1bml0YCBjYW4gYmUgJ21vbnRoJywgJ3F1YXJ0ZXInLCAnd2VlaycsICdpc29XZWVrJywgJ2RheU9mWWVhcicsXG4gIC8vICdkYXlPZk1vbnRoJyBvciAnZGF5T2ZXZWVrJ1xuXG4gIHZhciByZW0xMDAgPSBudW1iZXIgJSAxMDA7XG4gIGlmIChyZW0xMDAgPiAyMCB8fCByZW0xMDAgPCAxMCkge1xuICAgIHN3aXRjaCAocmVtMTAwICUgMTApIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIG51bWJlciArICdzdCc7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiBudW1iZXIgKyAnbmQnO1xuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgJ3JkJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bWJlciArICd0aCc7XG59XG5cbnZhciBsb2NhbGl6ZSA9IHtcbiAgb3JkaW5hbE51bWJlcjogb3JkaW5hbE51bWJlcixcbiAgd2Vla2RheTogKDAsIF9pbmRleDIuZGVmYXVsdCkod2Vla2RheVZhbHVlcywgJ2xvbmcnKSxcbiAgd2Vla2RheXM6ICgwLCBfaW5kZXg0LmRlZmF1bHQpKHdlZWtkYXlWYWx1ZXMsICdsb25nJyksXG4gIG1vbnRoOiAoMCwgX2luZGV4Mi5kZWZhdWx0KShtb250aFZhbHVlcywgJ2xvbmcnKSxcbiAgbW9udGhzOiAoMCwgX2luZGV4NC5kZWZhdWx0KShtb250aFZhbHVlcywgJ2xvbmcnKSxcbiAgdGltZU9mRGF5OiAoMCwgX2luZGV4Mi5kZWZhdWx0KSh0aW1lT2ZEYXlWYWx1ZXMsICdsb25nJywgZnVuY3Rpb24gKGhvdXJzKSB7XG4gICAgcmV0dXJuIGhvdXJzIC8gMTIgPj0gMSA/IDEgOiAwO1xuICB9KSxcbiAgdGltZXNPZkRheTogKDAsIF9pbmRleDQuZGVmYXVsdCkodGltZU9mRGF5VmFsdWVzLCAnbG9uZycpXG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBsb2NhbGl6ZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9pbmRleCA9IHJlcXVpcmUoJy4uLy4uLy4uL19saWIvYnVpbGRNYXRjaEZuL2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5kZXgpO1xuXG52YXIgX2luZGV4MyA9IHJlcXVpcmUoJy4uLy4uLy4uL19saWIvYnVpbGRQYXJzZUZuL2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXg0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5kZXgzKTtcblxudmFyIF9pbmRleDUgPSByZXF1aXJlKCcuLi8uLi8uLi9fbGliL2J1aWxkTWF0Y2hQYXR0ZXJuRm4vaW5kZXguanMnKTtcblxudmFyIF9pbmRleDYgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmRleDUpO1xuXG52YXIgX2luZGV4NyA9IHJlcXVpcmUoJy4uLy4uLy4uL19saWIvcGFyc2VEZWNpbWFsL2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXg4ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5kZXg3KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIG1hdGNoT3JkaW5hbE51bWJlcnNQYXR0ZXJuID0gL14oXFxkKykodGh8c3R8bmR8cmQpPy9pO1xuXG52YXIgbWF0Y2hXZWVrZGF5c1BhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eKHN1fG1vfHR1fHdlfHRofGZyfHNhKS9pLFxuICBzaG9ydDogL14oc3VufG1vbnx0dWV8d2VkfHRodXxmcml8c2F0KS9pLFxuICBsb25nOiAvXihzdW5kYXl8bW9uZGF5fHR1ZXNkYXl8d2VkbmVzZGF5fHRodXJzZGF5fGZyaWRheXxzYXR1cmRheSkvaVxufTtcblxudmFyIHBhcnNlV2Vla2RheVBhdHRlcm5zID0ge1xuICBhbnk6IFsvXnN1L2ksIC9ebS9pLCAvXnR1L2ksIC9edy9pLCAvXnRoL2ksIC9eZi9pLCAvXnNhL2ldXG59O1xuXG52YXIgbWF0Y2hNb250aHNQYXR0ZXJucyA9IHtcbiAgc2hvcnQ6IC9eKGphbnxmZWJ8bWFyfGFwcnxtYXl8anVufGp1bHxhdWd8c2VwfG9jdHxub3Z8ZGVjKS9pLFxuICBsb25nOiAvXihqYW51YXJ5fGZlYnJ1YXJ5fG1hcmNofGFwcmlsfG1heXxqdW5lfGp1bHl8YXVndXN0fHNlcHRlbWJlcnxvY3RvYmVyfG5vdmVtYmVyfGRlY2VtYmVyKS9pXG59O1xuXG52YXIgcGFyc2VNb250aFBhdHRlcm5zID0ge1xuICBhbnk6IFsvXmphL2ksIC9eZi9pLCAvXm1hci9pLCAvXmFwL2ksIC9ebWF5L2ksIC9eanVuL2ksIC9eanVsL2ksIC9eYXUvaSwgL15zL2ksIC9eby9pLCAvXm4vaSwgL15kL2ldXG59O1xuXG4vLyBgdGltZU9mRGF5YCBpcyB1c2VkIHRvIGRlc2lnbmF0ZSB3aGljaCBwYXJ0IG9mIHRoZSBkYXkgaXQgaXMsIHdoZW4gdXNlZCB3aXRoIDEyLWhvdXIgY2xvY2suXG4vLyBVc2UgdGhlIHN5c3RlbSB3aGljaCBpcyB1c2VkIHRoZSBtb3N0IGNvbW1vbmx5IGluIHRoZSBsb2NhbGUuXG4vLyBGb3IgZXhhbXBsZSwgaWYgdGhlIGNvdW50cnkgZG9lc24ndCB1c2UgYS5tLi9wLm0uLCB5b3UgY2FuIHVzZSBgbmlnaHRgL2Btb3JuaW5nYC9gYWZ0ZXJub29uYC9gZXZlbmluZ2A6XG4vL1xuLy8gICB2YXIgbWF0Y2hUaW1lc09mRGF5UGF0dGVybnMgPSB7XG4vLyAgICAgbG9uZzogL14oKGluIHRoZSk/IChuaWdodHxtb3JuaW5nfGFmdGVybm9vbnxldmVuaW5nPykpL2lcbi8vICAgfVxuLy9cbi8vICAgdmFyIHBhcnNlVGltZU9mRGF5UGF0dGVybnMgPSB7XG4vLyAgICAgYW55OiBbLyhuaWdodHxtb3JuaW5nKS9pLCAvKGFmdGVybm9vbnxldmVuaW5nKS9pXVxuLy8gICB9XG52YXIgbWF0Y2hUaW1lc09mRGF5UGF0dGVybnMgPSB7XG4gIHNob3J0OiAvXihhbXxwbSkvaSxcbiAgbG9uZzogL14oW2FwXVxcLj9cXHM/bVxcLj8pL2lcbn07XG5cbnZhciBwYXJzZVRpbWVPZkRheVBhdHRlcm5zID0ge1xuICBhbnk6IFsvXmEvaSwgL15wL2ldXG59O1xuXG52YXIgbWF0Y2ggPSB7XG4gIG9yZGluYWxOdW1iZXJzOiAoMCwgX2luZGV4Ni5kZWZhdWx0KShtYXRjaE9yZGluYWxOdW1iZXJzUGF0dGVybiksXG4gIG9yZGluYWxOdW1iZXI6IF9pbmRleDguZGVmYXVsdCxcbiAgd2Vla2RheXM6ICgwLCBfaW5kZXgyLmRlZmF1bHQpKG1hdGNoV2Vla2RheXNQYXR0ZXJucywgJ2xvbmcnKSxcbiAgd2Vla2RheTogKDAsIF9pbmRleDQuZGVmYXVsdCkocGFyc2VXZWVrZGF5UGF0dGVybnMsICdhbnknKSxcbiAgbW9udGhzOiAoMCwgX2luZGV4Mi5kZWZhdWx0KShtYXRjaE1vbnRoc1BhdHRlcm5zLCAnbG9uZycpLFxuICBtb250aDogKDAsIF9pbmRleDQuZGVmYXVsdCkocGFyc2VNb250aFBhdHRlcm5zLCAnYW55JyksXG4gIHRpbWVzT2ZEYXk6ICgwLCBfaW5kZXgyLmRlZmF1bHQpKG1hdGNoVGltZXNPZkRheVBhdHRlcm5zLCAnbG9uZycpLFxuICB0aW1lT2ZEYXk6ICgwLCBfaW5kZXg0LmRlZmF1bHQpKHBhcnNlVGltZU9mRGF5UGF0dGVybnMsICdhbnknKVxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gbWF0Y2g7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfaW5kZXggPSByZXF1aXJlKCcuL19saWIvZm9ybWF0RGlzdGFuY2UvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmRleCk7XG5cbnZhciBfaW5kZXgzID0gcmVxdWlyZSgnLi9fbGliL2Zvcm1hdExvbmcvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmRleDMpO1xuXG52YXIgX2luZGV4NSA9IHJlcXVpcmUoJy4vX2xpYi9mb3JtYXRSZWxhdGl2ZS9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4NiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luZGV4NSk7XG5cbnZhciBfaW5kZXg3ID0gcmVxdWlyZSgnLi9fbGliL2xvY2FsaXplL2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXg4ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5kZXg3KTtcblxudmFyIF9pbmRleDkgPSByZXF1aXJlKCcuL19saWIvbWF0Y2gvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDEwID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5kZXg5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBAdHlwZSB7TG9jYWxlfVxuICogQGNhdGVnb3J5IExvY2FsZXNcbiAqIEBzdW1tYXJ5IEVuZ2xpc2ggbG9jYWxlIChVbml0ZWQgU3RhdGVzKS5cbiAqIEBsYW5ndWFnZSBFbmdsaXNoXG4gKiBAaXNvLTYzOS0yIGVuZ1xuICovXG52YXIgbG9jYWxlID0ge1xuICBmb3JtYXREaXN0YW5jZTogX2luZGV4Mi5kZWZhdWx0LFxuICBmb3JtYXRMb25nOiBfaW5kZXg0LmRlZmF1bHQsXG4gIGZvcm1hdFJlbGF0aXZlOiBfaW5kZXg2LmRlZmF1bHQsXG4gIGxvY2FsaXplOiBfaW5kZXg4LmRlZmF1bHQsXG4gIG1hdGNoOiBfaW5kZXgxMC5kZWZhdWx0LFxuICBvcHRpb25zOiB7XG4gICAgd2Vla1N0YXJ0c09uOiAwIC8qIFN1bmRheSAqL1xuICAgICwgZmlyc3RXZWVrQ29udGFpbnNEYXRlOiAxXG4gIH1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGxvY2FsZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBwYXR0ZXJucyA9IHtcbiAgJ00nOiAvXigxWzAtMl18MD9cXGQpLywgLy8gMCB0byAxMlxuICAnRCc6IC9eKDNbMC0xXXxbMC0yXT9cXGQpLywgLy8gMCB0byAzMVxuICAnREREJzogL14oMzZbMC02XXwzWzAtNV1cXGR8WzAtMl0/XFxkP1xcZCkvLCAvLyAwIHRvIDM2NlxuICAnVyc6IC9eKDVbMC0zXXxbMC00XT9cXGQpLywgLy8gMCB0byA1M1xuICAnWVlZWSc6IC9eKFxcZHsxLDR9KS8sIC8vIDAgdG8gOTk5OVxuICAnSCc6IC9eKDJbMC0zXXxbMC0xXT9cXGQpLywgLy8gMCB0byAyM1xuICAnbSc6IC9eKFswLTVdP1xcZCkvLCAvLyAwIHRvIDU5XG4gICdaJzogL14oWystXSkoXFxkezJ9KTooXFxkezJ9KS8sXG4gICdaWic6IC9eKFsrLV0pKFxcZHsyfSkoXFxkezJ9KS8sXG4gIHNpbmdsZURpZ2l0OiAvXihcXGQpLyxcbiAgdHdvRGlnaXRzOiAvXihcXGR7Mn0pLyxcbiAgdGhyZWVEaWdpdHM6IC9eKFxcZHszfSkvLFxuICBmb3VyRGlnaXRzOiAvXihcXGR7NH0pLyxcbiAgYW55RGlnaXRzOiAvXihcXGQrKS9cbn07XG5cbmZ1bmN0aW9uIHBhcnNlRGVjaW1hbChtYXRjaFJlc3VsdCkge1xuICByZXR1cm4gcGFyc2VJbnQobWF0Y2hSZXN1bHRbMV0sIDEwKTtcbn1cblxudmFyIHBhcnNlcnMgPSB7XG4gIC8vIFllYXI6IDAwLCAwMSwgLi4uLCA5OVxuICAnWVknOiB7XG4gICAgdW5pdDogJ3R3b0RpZ2l0WWVhcicsXG4gICAgbWF0Y2g6IHBhdHRlcm5zLnR3b0RpZ2l0cyxcbiAgICBwYXJzZTogZnVuY3Rpb24gcGFyc2UobWF0Y2hSZXN1bHQpIHtcbiAgICAgIHJldHVybiBwYXJzZURlY2ltYWwobWF0Y2hSZXN1bHQpO1xuICAgIH1cbiAgfSxcblxuICAvLyBZZWFyOiAxOTAwLCAxOTAxLCAuLi4sIDIwOTlcbiAgJ1lZWVknOiB7XG4gICAgdW5pdDogJ3llYXInLFxuICAgIG1hdGNoOiBwYXR0ZXJucy5ZWVlZLFxuICAgIHBhcnNlOiBwYXJzZURlY2ltYWxcbiAgfSxcblxuICAvLyBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogMDAsIDAxLCAuLi4sIDk5XG4gICdHRyc6IHtcbiAgICB1bml0OiAnaXNvWWVhcicsXG4gICAgbWF0Y2g6IHBhdHRlcm5zLnR3b0RpZ2l0cyxcbiAgICBwYXJzZTogZnVuY3Rpb24gcGFyc2UobWF0Y2hSZXN1bHQpIHtcbiAgICAgIHJldHVybiBwYXJzZURlY2ltYWwobWF0Y2hSZXN1bHQpICsgMTkwMDtcbiAgICB9XG4gIH0sXG5cbiAgLy8gSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IDE5MDAsIDE5MDEsIC4uLiwgMjA5OVxuICAnR0dHRyc6IHtcbiAgICB1bml0OiAnaXNvWWVhcicsXG4gICAgbWF0Y2g6IHBhdHRlcm5zLllZWVksXG4gICAgcGFyc2U6IHBhcnNlRGVjaW1hbFxuICB9LFxuXG4gIC8vIFF1YXJ0ZXI6IDEsIDIsIDMsIDRcbiAgJ1EnOiB7XG4gICAgdW5pdDogJ3F1YXJ0ZXInLFxuICAgIG1hdGNoOiBwYXR0ZXJucy5zaW5nbGVEaWdpdCxcbiAgICBwYXJzZTogcGFyc2VEZWNpbWFsXG4gIH0sXG5cbiAgLy8gT3JkaW5hbCBxdWFydGVyXG4gICdRbyc6IHtcbiAgICB1bml0OiAncXVhcnRlcicsXG4gICAgbWF0Y2g6IGZ1bmN0aW9uIG1hdGNoKHN0cmluZywgb3B0aW9ucykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMubG9jYWxlLm1hdGNoLm9yZGluYWxOdW1iZXJzKHN0cmluZywgeyB1bml0OiAncXVhcnRlcicgfSk7XG4gICAgfSxcbiAgICBwYXJzZTogZnVuY3Rpb24gcGFyc2UobWF0Y2hSZXN1bHQsIG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5tYXRjaC5vcmRpbmFsTnVtYmVyKG1hdGNoUmVzdWx0LCB7IHVuaXQ6ICdxdWFydGVyJyB9KTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gTW9udGg6IDEsIDIsIC4uLiwgMTJcbiAgJ00nOiB7XG4gICAgdW5pdDogJ21vbnRoJyxcbiAgICBtYXRjaDogcGF0dGVybnMuTSxcbiAgICBwYXJzZTogZnVuY3Rpb24gcGFyc2UobWF0Y2hSZXN1bHQpIHtcbiAgICAgIHJldHVybiBwYXJzZURlY2ltYWwobWF0Y2hSZXN1bHQpIC0gMTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gT3JkaW5hbCBtb250aFxuICAnTW8nOiB7XG4gICAgdW5pdDogJ21vbnRoJyxcbiAgICBtYXRjaDogZnVuY3Rpb24gbWF0Y2goc3RyaW5nLCBvcHRpb25zKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubWF0Y2gub3JkaW5hbE51bWJlcnMoc3RyaW5nLCB7IHVuaXQ6ICdtb250aCcgfSk7XG4gICAgfSxcbiAgICBwYXJzZTogZnVuY3Rpb24gcGFyc2UobWF0Y2hSZXN1bHQsIG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5tYXRjaC5vcmRpbmFsTnVtYmVyKG1hdGNoUmVzdWx0LCB7IHVuaXQ6ICdtb250aCcgfSkgLSAxO1xuICAgIH1cbiAgfSxcblxuICAvLyBNb250aDogMDEsIDAyLCAuLi4sIDEyXG4gICdNTSc6IHtcbiAgICB1bml0OiAnbW9udGgnLFxuICAgIG1hdGNoOiBwYXR0ZXJucy50d29EaWdpdHMsXG4gICAgcGFyc2U6IGZ1bmN0aW9uIHBhcnNlKG1hdGNoUmVzdWx0KSB7XG4gICAgICByZXR1cm4gcGFyc2VEZWNpbWFsKG1hdGNoUmVzdWx0KSAtIDE7XG4gICAgfVxuICB9LFxuXG4gIC8vIE1vbnRoOiBKYW4sIEZlYiwgLi4uLCBEZWNcbiAgJ01NTSc6IHtcbiAgICB1bml0OiAnbW9udGgnLFxuICAgIG1hdGNoOiBmdW5jdGlvbiBtYXRjaChzdHJpbmcsIG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5tYXRjaC5tb250aHMoc3RyaW5nLCB7IHR5cGU6ICdzaG9ydCcgfSk7XG4gICAgfSxcbiAgICBwYXJzZTogZnVuY3Rpb24gcGFyc2UobWF0Y2hSZXN1bHQsIG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5tYXRjaC5tb250aChtYXRjaFJlc3VsdCwgeyB0eXBlOiAnc2hvcnQnIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBNb250aDogSmFudWFyeSwgRmVicnVhcnksIC4uLiwgRGVjZW1iZXJcbiAgJ01NTU0nOiB7XG4gICAgdW5pdDogJ21vbnRoJyxcbiAgICBtYXRjaDogZnVuY3Rpb24gbWF0Y2goc3RyaW5nLCBvcHRpb25zKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubWF0Y2gubW9udGhzKHN0cmluZywgeyB0eXBlOiAnbG9uZycgfSkgfHwgb3B0aW9ucy5sb2NhbGUubWF0Y2gubW9udGhzKHN0cmluZywgeyB0eXBlOiAnc2hvcnQnIH0pO1xuICAgIH0sXG4gICAgcGFyc2U6IGZ1bmN0aW9uIHBhcnNlKG1hdGNoUmVzdWx0LCBvcHRpb25zKSB7XG4gICAgICB2YXIgcGFyc2VSZXN1bHQgPSBvcHRpb25zLmxvY2FsZS5tYXRjaC5tb250aChtYXRjaFJlc3VsdCwgeyB0eXBlOiAnbG9uZycgfSk7XG5cbiAgICAgIGlmIChwYXJzZVJlc3VsdCA9PSBudWxsKSB7XG4gICAgICAgIHBhcnNlUmVzdWx0ID0gb3B0aW9ucy5sb2NhbGUubWF0Y2gubW9udGgobWF0Y2hSZXN1bHQsIHsgdHlwZTogJ3Nob3J0JyB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBhcnNlUmVzdWx0O1xuICAgIH1cbiAgfSxcblxuICAvLyBJU08gd2VlazogMSwgMiwgLi4uLCA1M1xuICAnVyc6IHtcbiAgICB1bml0OiAnaXNvV2VlaycsXG4gICAgbWF0Y2g6IHBhdHRlcm5zLlcsXG4gICAgcGFyc2U6IHBhcnNlRGVjaW1hbFxuICB9LFxuXG4gIC8vIE9yZGluYWwgSVNPIHdlZWtcbiAgJ1dvJzoge1xuICAgIHVuaXQ6ICdpc29XZWVrJyxcbiAgICBtYXRjaDogZnVuY3Rpb24gbWF0Y2goc3RyaW5nLCBvcHRpb25zKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubWF0Y2gub3JkaW5hbE51bWJlcnMoc3RyaW5nLCB7IHVuaXQ6ICdpc29XZWVrJyB9KTtcbiAgICB9LFxuICAgIHBhcnNlOiBmdW5jdGlvbiBwYXJzZShtYXRjaFJlc3VsdCwgb3B0aW9ucykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMubG9jYWxlLm1hdGNoLm9yZGluYWxOdW1iZXIobWF0Y2hSZXN1bHQsIHsgdW5pdDogJ2lzb1dlZWsnIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBJU08gd2VlazogMDEsIDAyLCAuLi4sIDUzXG4gICdXVyc6IHtcbiAgICB1bml0OiAnaXNvV2VlaycsXG4gICAgbWF0Y2g6IHBhdHRlcm5zLnR3b0RpZ2l0cyxcbiAgICBwYXJzZTogcGFyc2VEZWNpbWFsXG4gIH0sXG5cbiAgLy8gRGF5IG9mIHdlZWs6IDAsIDEsIC4uLiwgNlxuICAnZCc6IHtcbiAgICB1bml0OiAnZGF5T2ZXZWVrJyxcbiAgICBtYXRjaDogcGF0dGVybnMuc2luZ2xlRGlnaXQsXG4gICAgcGFyc2U6IHBhcnNlRGVjaW1hbFxuICB9LFxuXG4gIC8vIE9yZGluYWwgZGF5IG9mIHdlZWtcbiAgJ2RvJzoge1xuICAgIHVuaXQ6ICdkYXlPZldlZWsnLFxuICAgIG1hdGNoOiBmdW5jdGlvbiBtYXRjaChzdHJpbmcsIG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5tYXRjaC5vcmRpbmFsTnVtYmVycyhzdHJpbmcsIHsgdW5pdDogJ2RheU9mV2VlaycgfSk7XG4gICAgfSxcbiAgICBwYXJzZTogZnVuY3Rpb24gcGFyc2UobWF0Y2hSZXN1bHQsIG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5tYXRjaC5vcmRpbmFsTnVtYmVyKG1hdGNoUmVzdWx0LCB7IHVuaXQ6ICdkYXlPZldlZWsnIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBEYXkgb2Ygd2VlazogU3UsIE1vLCAuLi4sIFNhXG4gICdkZCc6IHtcbiAgICB1bml0OiAnZGF5T2ZXZWVrJyxcbiAgICBtYXRjaDogZnVuY3Rpb24gbWF0Y2goc3RyaW5nLCBvcHRpb25zKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubWF0Y2gud2Vla2RheXMoc3RyaW5nLCB7IHR5cGU6ICduYXJyb3cnIH0pO1xuICAgIH0sXG4gICAgcGFyc2U6IGZ1bmN0aW9uIHBhcnNlKG1hdGNoUmVzdWx0LCBvcHRpb25zKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubWF0Y2gud2Vla2RheShtYXRjaFJlc3VsdCwgeyB0eXBlOiAnbmFycm93JyB9KTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gRGF5IG9mIHdlZWs6IFN1biwgTW9uLCAuLi4sIFNhdFxuICAnZGRkJzoge1xuICAgIHVuaXQ6ICdkYXlPZldlZWsnLFxuICAgIG1hdGNoOiBmdW5jdGlvbiBtYXRjaChzdHJpbmcsIG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5tYXRjaC53ZWVrZGF5cyhzdHJpbmcsIHsgdHlwZTogJ3Nob3J0JyB9KSB8fCBvcHRpb25zLmxvY2FsZS5tYXRjaC53ZWVrZGF5cyhzdHJpbmcsIHsgdHlwZTogJ25hcnJvdycgfSk7XG4gICAgfSxcbiAgICBwYXJzZTogZnVuY3Rpb24gcGFyc2UobWF0Y2hSZXN1bHQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBwYXJzZVJlc3VsdCA9IG9wdGlvbnMubG9jYWxlLm1hdGNoLndlZWtkYXkobWF0Y2hSZXN1bHQsIHsgdHlwZTogJ3Nob3J0JyB9KTtcblxuICAgICAgaWYgKHBhcnNlUmVzdWx0ID09IG51bGwpIHtcbiAgICAgICAgcGFyc2VSZXN1bHQgPSBvcHRpb25zLmxvY2FsZS5tYXRjaC53ZWVrZGF5KG1hdGNoUmVzdWx0LCB7IHR5cGU6ICduYXJyb3cnIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGFyc2VSZXN1bHQ7XG4gICAgfVxuICB9LFxuXG4gIC8vIERheSBvZiB3ZWVrOiBTdW5kYXksIE1vbmRheSwgLi4uLCBTYXR1cmRheVxuICAnZGRkZCc6IHtcbiAgICB1bml0OiAnZGF5T2ZXZWVrJyxcbiAgICBtYXRjaDogZnVuY3Rpb24gbWF0Y2goc3RyaW5nLCBvcHRpb25zKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubWF0Y2gud2Vla2RheXMoc3RyaW5nLCB7IHR5cGU6ICdsb25nJyB9KSB8fCBvcHRpb25zLmxvY2FsZS5tYXRjaC53ZWVrZGF5cyhzdHJpbmcsIHsgdHlwZTogJ3Nob3J0JyB9KSB8fCBvcHRpb25zLmxvY2FsZS5tYXRjaC53ZWVrZGF5cyhzdHJpbmcsIHsgdHlwZTogJ25hcnJvdycgfSk7XG4gICAgfSxcbiAgICBwYXJzZTogZnVuY3Rpb24gcGFyc2UobWF0Y2hSZXN1bHQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBwYXJzZVJlc3VsdCA9IG9wdGlvbnMubG9jYWxlLm1hdGNoLndlZWtkYXkobWF0Y2hSZXN1bHQsIHsgdHlwZTogJ2xvbmcnIH0pO1xuXG4gICAgICBpZiAocGFyc2VSZXN1bHQgPT0gbnVsbCkge1xuICAgICAgICBwYXJzZVJlc3VsdCA9IG9wdGlvbnMubG9jYWxlLm1hdGNoLndlZWtkYXkobWF0Y2hSZXN1bHQsIHsgdHlwZTogJ3Nob3J0JyB9KTtcblxuICAgICAgICBpZiAocGFyc2VSZXN1bHQgPT0gbnVsbCkge1xuICAgICAgICAgIHBhcnNlUmVzdWx0ID0gb3B0aW9ucy5sb2NhbGUubWF0Y2gud2Vla2RheShtYXRjaFJlc3VsdCwgeyB0eXBlOiAnbmFycm93JyB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGFyc2VSZXN1bHQ7XG4gICAgfVxuICB9LFxuXG4gIC8vIERheSBvZiBJU08gd2VlazogMSwgMiwgLi4uLCA3XG4gICdFJzoge1xuICAgIHVuaXQ6ICdkYXlPZklTT1dlZWsnLFxuICAgIG1hdGNoOiBwYXR0ZXJucy5zaW5nbGVEaWdpdCxcbiAgICBwYXJzZTogZnVuY3Rpb24gcGFyc2UobWF0Y2hSZXN1bHQpIHtcbiAgICAgIHJldHVybiBwYXJzZURlY2ltYWwobWF0Y2hSZXN1bHQpO1xuICAgIH1cbiAgfSxcblxuICAvLyBEYXkgb2YgbW9udGg6IDEsIDIsIC4uLiwgMzFcbiAgJ0QnOiB7XG4gICAgdW5pdDogJ2RheU9mTW9udGgnLFxuICAgIG1hdGNoOiBwYXR0ZXJucy5ELFxuICAgIHBhcnNlOiBwYXJzZURlY2ltYWxcbiAgfSxcblxuICAvLyBPcmRpbmFsIGRheSBvZiBtb250aFxuICAnRG8nOiB7XG4gICAgdW5pdDogJ2RheU9mTW9udGgnLFxuICAgIG1hdGNoOiBmdW5jdGlvbiBtYXRjaChzdHJpbmcsIG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5tYXRjaC5vcmRpbmFsTnVtYmVycyhzdHJpbmcsIHsgdW5pdDogJ2RheU9mTW9udGgnIH0pO1xuICAgIH0sXG4gICAgcGFyc2U6IGZ1bmN0aW9uIHBhcnNlKG1hdGNoUmVzdWx0LCBvcHRpb25zKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubWF0Y2gub3JkaW5hbE51bWJlcihtYXRjaFJlc3VsdCwgeyB1bml0OiAnZGF5T2ZNb250aCcgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIERheSBvZiBtb250aDogMDEsIDAyLCAuLi4sIDMxXG4gICdERCc6IHtcbiAgICB1bml0OiAnZGF5T2ZNb250aCcsXG4gICAgbWF0Y2g6IHBhdHRlcm5zLnR3b0RpZ2l0cyxcbiAgICBwYXJzZTogcGFyc2VEZWNpbWFsXG4gIH0sXG5cbiAgLy8gRGF5IG9mIHllYXI6IDEsIDIsIC4uLiwgMzY2XG4gICdEREQnOiB7XG4gICAgdW5pdDogJ2RheU9mWWVhcicsXG4gICAgbWF0Y2g6IHBhdHRlcm5zLkRERCxcbiAgICBwYXJzZTogcGFyc2VEZWNpbWFsXG4gIH0sXG5cbiAgLy8gT3JkaW5hbCBkYXkgb2YgeWVhclxuICAnREREbyc6IHtcbiAgICB1bml0OiAnZGF5T2ZZZWFyJyxcbiAgICBtYXRjaDogZnVuY3Rpb24gbWF0Y2goc3RyaW5nLCBvcHRpb25zKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubWF0Y2gub3JkaW5hbE51bWJlcnMoc3RyaW5nLCB7IHVuaXQ6ICdkYXlPZlllYXInIH0pO1xuICAgIH0sXG4gICAgcGFyc2U6IGZ1bmN0aW9uIHBhcnNlKG1hdGNoUmVzdWx0LCBvcHRpb25zKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubWF0Y2gub3JkaW5hbE51bWJlcihtYXRjaFJlc3VsdCwgeyB1bml0OiAnZGF5T2ZZZWFyJyB9KTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gRGF5IG9mIHllYXI6IDAwMSwgMDAyLCAuLi4sIDM2NlxuICAnRERERCc6IHtcbiAgICB1bml0OiAnZGF5T2ZZZWFyJyxcbiAgICBtYXRjaDogcGF0dGVybnMudGhyZWVEaWdpdHMsXG4gICAgcGFyc2U6IHBhcnNlRGVjaW1hbFxuICB9LFxuXG4gIC8vIEFNLCBQTVxuICAnQSc6IHtcbiAgICB1bml0OiAndGltZU9mRGF5JyxcbiAgICBtYXRjaDogZnVuY3Rpb24gbWF0Y2goc3RyaW5nLCBvcHRpb25zKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubWF0Y2gudGltZXNPZkRheShzdHJpbmcsIHsgdHlwZTogJ3Nob3J0JyB9KTtcbiAgICB9LFxuICAgIHBhcnNlOiBmdW5jdGlvbiBwYXJzZShtYXRjaFJlc3VsdCwgb3B0aW9ucykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMubG9jYWxlLm1hdGNoLnRpbWVPZkRheShtYXRjaFJlc3VsdCwgeyB0eXBlOiAnc2hvcnQnIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBhLm0uLCBwLm0uXG4gICdhYSc6IHtcbiAgICB1bml0OiAndGltZU9mRGF5JyxcbiAgICBtYXRjaDogZnVuY3Rpb24gbWF0Y2goc3RyaW5nLCBvcHRpb25zKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubWF0Y2gudGltZXNPZkRheShzdHJpbmcsIHsgdHlwZTogJ2xvbmcnIH0pIHx8IG9wdGlvbnMubG9jYWxlLm1hdGNoLnRpbWVzT2ZEYXkoc3RyaW5nLCB7IHR5cGU6ICdzaG9ydCcgfSk7XG4gICAgfSxcbiAgICBwYXJzZTogZnVuY3Rpb24gcGFyc2UobWF0Y2hSZXN1bHQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBwYXJzZVJlc3VsdCA9IG9wdGlvbnMubG9jYWxlLm1hdGNoLnRpbWVPZkRheShtYXRjaFJlc3VsdCwgeyB0eXBlOiAnbG9uZycgfSk7XG5cbiAgICAgIGlmIChwYXJzZVJlc3VsdCA9PSBudWxsKSB7XG4gICAgICAgIHBhcnNlUmVzdWx0ID0gb3B0aW9ucy5sb2NhbGUubWF0Y2gudGltZU9mRGF5KG1hdGNoUmVzdWx0LCB7IHR5cGU6ICdzaG9ydCcgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwYXJzZVJlc3VsdDtcbiAgICB9XG4gIH0sXG5cbiAgLy8gSG91cjogMCwgMSwgLi4uIDIzXG4gICdIJzoge1xuICAgIHVuaXQ6ICdob3VycycsXG4gICAgbWF0Y2g6IHBhdHRlcm5zLkgsXG4gICAgcGFyc2U6IHBhcnNlRGVjaW1hbFxuICB9LFxuXG4gIC8vIEhvdXI6IDAwLCAwMSwgLi4uLCAyM1xuICAnSEgnOiB7XG4gICAgdW5pdDogJ2hvdXJzJyxcbiAgICBtYXRjaDogcGF0dGVybnMudHdvRGlnaXRzLFxuICAgIHBhcnNlOiBwYXJzZURlY2ltYWxcbiAgfSxcblxuICAvLyBIb3VyOiAxLCAyLCAuLi4sIDEyXG4gICdoJzoge1xuICAgIHVuaXQ6ICd0aW1lT2ZEYXlIb3VycycsXG4gICAgbWF0Y2g6IHBhdHRlcm5zLk0sXG4gICAgcGFyc2U6IHBhcnNlRGVjaW1hbFxuICB9LFxuXG4gIC8vIEhvdXI6IDAxLCAwMiwgLi4uLCAxMlxuICAnaGgnOiB7XG4gICAgdW5pdDogJ3RpbWVPZkRheUhvdXJzJyxcbiAgICBtYXRjaDogcGF0dGVybnMudHdvRGlnaXRzLFxuICAgIHBhcnNlOiBwYXJzZURlY2ltYWxcbiAgfSxcblxuICAvLyBNaW51dGU6IDAsIDEsIC4uLiwgNTlcbiAgJ20nOiB7XG4gICAgdW5pdDogJ21pbnV0ZXMnLFxuICAgIG1hdGNoOiBwYXR0ZXJucy5tLFxuICAgIHBhcnNlOiBwYXJzZURlY2ltYWxcbiAgfSxcblxuICAvLyBNaW51dGU6IDAwLCAwMSwgLi4uLCA1OVxuICAnbW0nOiB7XG4gICAgdW5pdDogJ21pbnV0ZXMnLFxuICAgIG1hdGNoOiBwYXR0ZXJucy50d29EaWdpdHMsXG4gICAgcGFyc2U6IHBhcnNlRGVjaW1hbFxuICB9LFxuXG4gIC8vIFNlY29uZDogMCwgMSwgLi4uLCA1OVxuICAncyc6IHtcbiAgICB1bml0OiAnc2Vjb25kcycsXG4gICAgbWF0Y2g6IHBhdHRlcm5zLm0sXG4gICAgcGFyc2U6IHBhcnNlRGVjaW1hbFxuICB9LFxuXG4gIC8vIFNlY29uZDogMDAsIDAxLCAuLi4sIDU5XG4gICdzcyc6IHtcbiAgICB1bml0OiAnc2Vjb25kcycsXG4gICAgbWF0Y2g6IHBhdHRlcm5zLnR3b0RpZ2l0cyxcbiAgICBwYXJzZTogcGFyc2VEZWNpbWFsXG4gIH0sXG5cbiAgLy8gMS8xMCBvZiBzZWNvbmQ6IDAsIDEsIC4uLiwgOVxuICAnUyc6IHtcbiAgICB1bml0OiAnbWlsbGlzZWNvbmRzJyxcbiAgICBtYXRjaDogcGF0dGVybnMuc2luZ2xlRGlnaXQsXG4gICAgcGFyc2U6IGZ1bmN0aW9uIHBhcnNlKG1hdGNoUmVzdWx0KSB7XG4gICAgICByZXR1cm4gcGFyc2VEZWNpbWFsKG1hdGNoUmVzdWx0KSAqIDEwMDtcbiAgICB9XG4gIH0sXG5cbiAgLy8gMS8xMDAgb2Ygc2Vjb25kOiAwMCwgMDEsIC4uLiwgOTlcbiAgJ1NTJzoge1xuICAgIHVuaXQ6ICdtaWxsaXNlY29uZHMnLFxuICAgIG1hdGNoOiBwYXR0ZXJucy50d29EaWdpdHMsXG4gICAgcGFyc2U6IGZ1bmN0aW9uIHBhcnNlKG1hdGNoUmVzdWx0KSB7XG4gICAgICByZXR1cm4gcGFyc2VEZWNpbWFsKG1hdGNoUmVzdWx0KSAqIDEwO1xuICAgIH1cbiAgfSxcblxuICAvLyBNaWxsaXNlY29uZDogMDAwLCAwMDEsIC4uLiwgOTk5XG4gICdTU1MnOiB7XG4gICAgdW5pdDogJ21pbGxpc2Vjb25kcycsXG4gICAgbWF0Y2g6IHBhdHRlcm5zLnRocmVlRGlnaXRzLFxuICAgIHBhcnNlOiBwYXJzZURlY2ltYWxcbiAgfSxcblxuICAvLyBUaW1lem9uZTogLTAxOjAwLCArMDA6MDAsIC4uLiArMTI6MDBcbiAgJ1onOiB7XG4gICAgdW5pdDogJ3RpbWV6b25lJyxcbiAgICBtYXRjaDogcGF0dGVybnMuWixcbiAgICBwYXJzZTogZnVuY3Rpb24gcGFyc2UobWF0Y2hSZXN1bHQpIHtcbiAgICAgIHZhciBzaWduID0gbWF0Y2hSZXN1bHRbMV07XG4gICAgICB2YXIgaG91cnMgPSBwYXJzZUludChtYXRjaFJlc3VsdFsyXSwgMTApO1xuICAgICAgdmFyIG1pbnV0ZXMgPSBwYXJzZUludChtYXRjaFJlc3VsdFszXSwgMTApO1xuICAgICAgdmFyIGFic29sdXRlT2Zmc2V0ID0gaG91cnMgKiA2MCArIG1pbnV0ZXM7XG4gICAgICByZXR1cm4gc2lnbiA9PT0gJysnID8gYWJzb2x1dGVPZmZzZXQgOiAtYWJzb2x1dGVPZmZzZXQ7XG4gICAgfVxuICB9LFxuXG4gIC8vIFRpbWV6b25lOiAtMDEwMCwgKzAwMDAsIC4uLiArMTIwMFxuICAnWlonOiB7XG4gICAgdW5pdDogJ3RpbWV6b25lJyxcbiAgICBtYXRjaDogcGF0dGVybnMuWlosXG4gICAgcGFyc2U6IGZ1bmN0aW9uIHBhcnNlKG1hdGNoUmVzdWx0KSB7XG4gICAgICB2YXIgc2lnbiA9IG1hdGNoUmVzdWx0WzFdO1xuICAgICAgdmFyIGhvdXJzID0gcGFyc2VJbnQobWF0Y2hSZXN1bHRbMl0sIDEwKTtcbiAgICAgIHZhciBtaW51dGVzID0gcGFyc2VJbnQobWF0Y2hSZXN1bHRbM10sIDEwKTtcbiAgICAgIHZhciBhYnNvbHV0ZU9mZnNldCA9IGhvdXJzICogNjAgKyBtaW51dGVzO1xuICAgICAgcmV0dXJuIHNpZ24gPT09ICcrJyA/IGFic29sdXRlT2Zmc2V0IDogLWFic29sdXRlT2Zmc2V0O1xuICAgIH1cbiAgfSxcblxuICAvLyBTZWNvbmRzIHRpbWVzdGFtcDogNTEyOTY5NTIwXG4gICdYJzoge1xuICAgIHVuaXQ6ICd0aW1lc3RhbXAnLFxuICAgIG1hdGNoOiBwYXR0ZXJucy5hbnlEaWdpdHMsXG4gICAgcGFyc2U6IGZ1bmN0aW9uIHBhcnNlKG1hdGNoUmVzdWx0KSB7XG4gICAgICByZXR1cm4gcGFyc2VEZWNpbWFsKG1hdGNoUmVzdWx0KSAqIDEwMDA7XG4gICAgfVxuICB9LFxuXG4gIC8vIE1pbGxpc2Vjb25kcyB0aW1lc3RhbXA6IDUxMjk2OTUyMDkwMFxuICAneCc6IHtcbiAgICB1bml0OiAndGltZXN0YW1wJyxcbiAgICBtYXRjaDogcGF0dGVybnMuYW55RGlnaXRzLFxuICAgIHBhcnNlOiBwYXJzZURlY2ltYWxcbiAgfVxufTtcblxucGFyc2Vyc1snYSddID0gcGFyc2Vyc1snQSddO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBwYXJzZXJzO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2luZGV4ID0gcmVxdWlyZSgnLi4vLi4vLi4vX2xpYi9zZXRVVENEYXkvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmRleCk7XG5cbnZhciBfaW5kZXgzID0gcmVxdWlyZSgnLi4vLi4vLi4vX2xpYi9zZXRVVENJU09EYXkvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmRleDMpO1xuXG52YXIgX2luZGV4NSA9IHJlcXVpcmUoJy4uLy4uLy4uL19saWIvc2V0VVRDSVNPV2Vlay9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4NiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luZGV4NSk7XG5cbnZhciBfaW5kZXg3ID0gcmVxdWlyZSgnLi4vLi4vLi4vX2xpYi9zZXRVVENJU09XZWVrWWVhci9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4OCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luZGV4Nyk7XG5cbnZhciBfaW5kZXg5ID0gcmVxdWlyZSgnLi4vLi4vLi4vX2xpYi9zdGFydE9mVVRDSVNPV2Vlay9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4MTAgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmRleDkpO1xuXG52YXIgX2luZGV4MTEgPSByZXF1aXJlKCcuLi8uLi8uLi9fbGliL3N0YXJ0T2ZVVENJU09XZWVrWWVhci9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4MTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmRleDExKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIE1JTExJU0VDT05EU19JTl9NSU5VVEUgPSA2MDAwMDtcblxuZnVuY3Rpb24gc2V0VGltZU9mRGF5KGhvdXJzLCB0aW1lT2ZEYXkpIHtcbiAgdmFyIGlzQU0gPSB0aW1lT2ZEYXkgPT09IDA7XG5cbiAgaWYgKGlzQU0pIHtcbiAgICBpZiAoaG91cnMgPT09IDEyKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGhvdXJzICE9PSAxMikge1xuICAgICAgcmV0dXJuIDEyICsgaG91cnM7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGhvdXJzO1xufVxuXG52YXIgdW5pdHMgPSB7XG4gIHR3b0RpZ2l0WWVhcjoge1xuICAgIHByaW9yaXR5OiAxMCxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChkYXRlVmFsdWVzLCB2YWx1ZSkge1xuICAgICAgdmFyIGNlbnR1cnkgPSBNYXRoLmZsb29yKGRhdGVWYWx1ZXMuZGF0ZS5nZXRVVENGdWxsWWVhcigpIC8gMTAwKTtcbiAgICAgIHZhciB5ZWFyID0gY2VudHVyeSAqIDEwMCArIHZhbHVlO1xuICAgICAgZGF0ZVZhbHVlcy5kYXRlLnNldFVUQ0Z1bGxZZWFyKHllYXIsIDAsIDEpO1xuICAgICAgZGF0ZVZhbHVlcy5kYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgcmV0dXJuIGRhdGVWYWx1ZXM7XG4gICAgfVxuICB9LFxuXG4gIHllYXI6IHtcbiAgICBwcmlvcml0eTogMTAsXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQoZGF0ZVZhbHVlcywgdmFsdWUpIHtcbiAgICAgIGRhdGVWYWx1ZXMuZGF0ZS5zZXRVVENGdWxsWWVhcih2YWx1ZSwgMCwgMSk7XG4gICAgICBkYXRlVmFsdWVzLmRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICByZXR1cm4gZGF0ZVZhbHVlcztcbiAgICB9XG4gIH0sXG5cbiAgaXNvWWVhcjoge1xuICAgIHByaW9yaXR5OiAxMCxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChkYXRlVmFsdWVzLCB2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgZGF0ZVZhbHVlcy5kYXRlID0gKDAsIF9pbmRleDEyLmRlZmF1bHQpKCgwLCBfaW5kZXg4LmRlZmF1bHQpKGRhdGVWYWx1ZXMuZGF0ZSwgdmFsdWUsIG9wdGlvbnMpLCBvcHRpb25zKTtcbiAgICAgIHJldHVybiBkYXRlVmFsdWVzO1xuICAgIH1cbiAgfSxcblxuICBxdWFydGVyOiB7XG4gICAgcHJpb3JpdHk6IDIwLFxuICAgIHNldDogZnVuY3Rpb24gc2V0KGRhdGVWYWx1ZXMsIHZhbHVlKSB7XG4gICAgICBkYXRlVmFsdWVzLmRhdGUuc2V0VVRDTW9udGgoKHZhbHVlIC0gMSkgKiAzLCAxKTtcbiAgICAgIGRhdGVWYWx1ZXMuZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgIHJldHVybiBkYXRlVmFsdWVzO1xuICAgIH1cbiAgfSxcblxuICBtb250aDoge1xuICAgIHByaW9yaXR5OiAzMCxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChkYXRlVmFsdWVzLCB2YWx1ZSkge1xuICAgICAgZGF0ZVZhbHVlcy5kYXRlLnNldFVUQ01vbnRoKHZhbHVlLCAxKTtcbiAgICAgIGRhdGVWYWx1ZXMuZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgIHJldHVybiBkYXRlVmFsdWVzO1xuICAgIH1cbiAgfSxcblxuICBpc29XZWVrOiB7XG4gICAgcHJpb3JpdHk6IDQwLFxuICAgIHNldDogZnVuY3Rpb24gc2V0KGRhdGVWYWx1ZXMsIHZhbHVlLCBvcHRpb25zKSB7XG4gICAgICBkYXRlVmFsdWVzLmRhdGUgPSAoMCwgX2luZGV4MTAuZGVmYXVsdCkoKDAsIF9pbmRleDYuZGVmYXVsdCkoZGF0ZVZhbHVlcy5kYXRlLCB2YWx1ZSwgb3B0aW9ucyksIG9wdGlvbnMpO1xuICAgICAgcmV0dXJuIGRhdGVWYWx1ZXM7XG4gICAgfVxuICB9LFxuXG4gIGRheU9mV2Vlazoge1xuICAgIHByaW9yaXR5OiA1MCxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChkYXRlVmFsdWVzLCB2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgZGF0ZVZhbHVlcy5kYXRlID0gKDAsIF9pbmRleDIuZGVmYXVsdCkoZGF0ZVZhbHVlcy5kYXRlLCB2YWx1ZSwgb3B0aW9ucyk7XG4gICAgICBkYXRlVmFsdWVzLmRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICByZXR1cm4gZGF0ZVZhbHVlcztcbiAgICB9XG4gIH0sXG5cbiAgZGF5T2ZJU09XZWVrOiB7XG4gICAgcHJpb3JpdHk6IDUwLFxuICAgIHNldDogZnVuY3Rpb24gc2V0KGRhdGVWYWx1ZXMsIHZhbHVlLCBvcHRpb25zKSB7XG4gICAgICBkYXRlVmFsdWVzLmRhdGUgPSAoMCwgX2luZGV4NC5kZWZhdWx0KShkYXRlVmFsdWVzLmRhdGUsIHZhbHVlLCBvcHRpb25zKTtcbiAgICAgIGRhdGVWYWx1ZXMuZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgIHJldHVybiBkYXRlVmFsdWVzO1xuICAgIH1cbiAgfSxcblxuICBkYXlPZk1vbnRoOiB7XG4gICAgcHJpb3JpdHk6IDUwLFxuICAgIHNldDogZnVuY3Rpb24gc2V0KGRhdGVWYWx1ZXMsIHZhbHVlKSB7XG4gICAgICBkYXRlVmFsdWVzLmRhdGUuc2V0VVRDRGF0ZSh2YWx1ZSk7XG4gICAgICBkYXRlVmFsdWVzLmRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICByZXR1cm4gZGF0ZVZhbHVlcztcbiAgICB9XG4gIH0sXG5cbiAgZGF5T2ZZZWFyOiB7XG4gICAgcHJpb3JpdHk6IDUwLFxuICAgIHNldDogZnVuY3Rpb24gc2V0KGRhdGVWYWx1ZXMsIHZhbHVlKSB7XG4gICAgICBkYXRlVmFsdWVzLmRhdGUuc2V0VVRDTW9udGgoMCwgdmFsdWUpO1xuICAgICAgZGF0ZVZhbHVlcy5kYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgcmV0dXJuIGRhdGVWYWx1ZXM7XG4gICAgfVxuICB9LFxuXG4gIHRpbWVPZkRheToge1xuICAgIHByaW9yaXR5OiA2MCxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChkYXRlVmFsdWVzLCB2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgZGF0ZVZhbHVlcy50aW1lT2ZEYXkgPSB2YWx1ZTtcbiAgICAgIHJldHVybiBkYXRlVmFsdWVzO1xuICAgIH1cbiAgfSxcblxuICBob3Vyczoge1xuICAgIHByaW9yaXR5OiA3MCxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChkYXRlVmFsdWVzLCB2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgZGF0ZVZhbHVlcy5kYXRlLnNldFVUQ0hvdXJzKHZhbHVlLCAwLCAwLCAwKTtcbiAgICAgIHJldHVybiBkYXRlVmFsdWVzO1xuICAgIH1cbiAgfSxcblxuICB0aW1lT2ZEYXlIb3Vyczoge1xuICAgIHByaW9yaXR5OiA3MCxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChkYXRlVmFsdWVzLCB2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgdmFyIHRpbWVPZkRheSA9IGRhdGVWYWx1ZXMudGltZU9mRGF5O1xuICAgICAgaWYgKHRpbWVPZkRheSAhPSBudWxsKSB7XG4gICAgICAgIHZhbHVlID0gc2V0VGltZU9mRGF5KHZhbHVlLCB0aW1lT2ZEYXkpO1xuICAgICAgfVxuICAgICAgZGF0ZVZhbHVlcy5kYXRlLnNldFVUQ0hvdXJzKHZhbHVlLCAwLCAwLCAwKTtcbiAgICAgIHJldHVybiBkYXRlVmFsdWVzO1xuICAgIH1cbiAgfSxcblxuICBtaW51dGVzOiB7XG4gICAgcHJpb3JpdHk6IDgwLFxuICAgIHNldDogZnVuY3Rpb24gc2V0KGRhdGVWYWx1ZXMsIHZhbHVlKSB7XG4gICAgICBkYXRlVmFsdWVzLmRhdGUuc2V0VVRDTWludXRlcyh2YWx1ZSwgMCwgMCk7XG4gICAgICByZXR1cm4gZGF0ZVZhbHVlcztcbiAgICB9XG4gIH0sXG5cbiAgc2Vjb25kczoge1xuICAgIHByaW9yaXR5OiA5MCxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChkYXRlVmFsdWVzLCB2YWx1ZSkge1xuICAgICAgZGF0ZVZhbHVlcy5kYXRlLnNldFVUQ1NlY29uZHModmFsdWUsIDApO1xuICAgICAgcmV0dXJuIGRhdGVWYWx1ZXM7XG4gICAgfVxuICB9LFxuXG4gIG1pbGxpc2Vjb25kczoge1xuICAgIHByaW9yaXR5OiAxMDAsXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQoZGF0ZVZhbHVlcywgdmFsdWUpIHtcbiAgICAgIGRhdGVWYWx1ZXMuZGF0ZS5zZXRVVENNaWxsaXNlY29uZHModmFsdWUpO1xuICAgICAgcmV0dXJuIGRhdGVWYWx1ZXM7XG4gICAgfVxuICB9LFxuXG4gIHRpbWV6b25lOiB7XG4gICAgcHJpb3JpdHk6IDExMCxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChkYXRlVmFsdWVzLCB2YWx1ZSkge1xuICAgICAgZGF0ZVZhbHVlcy5kYXRlID0gbmV3IERhdGUoZGF0ZVZhbHVlcy5kYXRlLmdldFRpbWUoKSAtIHZhbHVlICogTUlMTElTRUNPTkRTX0lOX01JTlVURSk7XG4gICAgICByZXR1cm4gZGF0ZVZhbHVlcztcbiAgICB9XG4gIH0sXG5cbiAgdGltZXN0YW1wOiB7XG4gICAgcHJpb3JpdHk6IDEyMCxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChkYXRlVmFsdWVzLCB2YWx1ZSkge1xuICAgICAgZGF0ZVZhbHVlcy5kYXRlID0gbmV3IERhdGUodmFsdWUpO1xuICAgICAgcmV0dXJuIGRhdGVWYWx1ZXM7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSB1bml0cztcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHBhcnNlO1xuXG52YXIgX2luZGV4ID0gcmVxdWlyZSgnLi4vdG9EYXRlL2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5kZXgpO1xuXG52YXIgX2luZGV4MyA9IHJlcXVpcmUoJy4uL3N1Yk1pbnV0ZXMvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmRleDMpO1xuXG52YXIgX2luZGV4NSA9IHJlcXVpcmUoJy4uL2xvY2FsZS9lbi1VUy9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4NiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luZGV4NSk7XG5cbnZhciBfaW5kZXg3ID0gcmVxdWlyZSgnLi9fbGliL3BhcnNlcnMvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDggPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmRleDcpO1xuXG52YXIgX2luZGV4OSA9IHJlcXVpcmUoJy4vX2xpYi91bml0cy9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4MTAgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmRleDkpO1xuXG52YXIgX2luZGV4MTEgPSByZXF1aXJlKCcuLi9fbGliL2Nsb25lT2JqZWN0L2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXgxMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luZGV4MTEpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgVElNRVpPTkVfVU5JVF9QUklPUklUWSA9IDExMDtcbnZhciBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFID0gNjAwMDA7XG5cbnZhciBsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCA9IC8oXFxbW15bXSpdKXwoXFxcXCk/KExUU3xMVHxMTExMfExMTHxMTHxMfGxsbGx8bGxsfGxsfGwpL2c7XG52YXIgZGVmYXVsdFBhcnNpbmdUb2tlbnNSZWdFeHAgPSAvKFxcW1teW10qXSl8KFxcXFwpPyh4fHNzfHN8bW18bXxoaHxofGRvfGRkZGR8ZGRkfGRkfGR8YWF8YXxaWnxafFlZWVl8WVl8WHxXb3xXV3xXfFNTU3xTU3xTfFFvfFF8TW98TU1NTXxNTU18TU18TXxISHxIfEdHR0d8R0d8RXxEb3xERERvfERERER8REREfEREfER8QXwuKS9nO1xuXG4vKipcbiAqIEBuYW1lIHBhcnNlXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFBhcnNlIHRoZSBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBkYXRlIHBhcnNlZCBmcm9tIHN0cmluZyB1c2luZyB0aGUgZ2l2ZW4gZm9ybWF0LlxuICpcbiAqIEFjY2VwdGVkIGZvcm1hdCB0b2tlbnM6XG4gKiB8IFVuaXQgICAgICAgICAgICAgICAgICAgIHwgUHJpb3JpdHkgfCBUb2tlbiB8IElucHV0IGV4YW1wbGVzICAgICAgICAgICAgICAgICAgIHxcbiAqIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS18LS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfCBZZWFyICAgICAgICAgICAgICAgICAgICB8IDEwICAgICAgIHwgWVkgICAgfCAwMCwgMDEsIC4uLiwgOTkgICAgICAgICAgICAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgfCBZWVlZICB8IDE5MDAsIDE5MDEsIC4uLiwgMjA5OSAgICAgICAgICAgIHxcbiAqIHwgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgfCAxMCAgICAgICB8IEdHICAgIHwgMDAsIDAxLCAuLi4sIDk5ICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgIHwgR0dHRyAgfCAxOTAwLCAxOTAxLCAuLi4sIDIwOTkgICAgICAgICAgICB8XG4gKiB8IFF1YXJ0ZXIgICAgICAgICAgICAgICAgIHwgMjAgICAgICAgfCBRICAgICB8IDEsIDIsIDMsIDQgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICB8IFFvICAgIHwgMXN0LCAybmQsIDNyZCwgNHRoICAgICAgICAgICAgICAgfFxuICogfCBNb250aCAgICAgICAgICAgICAgICAgICB8IDMwICAgICAgIHwgTSAgICAgfCAxLCAyLCAuLi4sIDEyICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgfCBNbyAgICB8IDFzdCwgMm5kLCAuLi4sIDEydGggICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICB8IE1NICAgIHwgMDEsIDAyLCAuLi4sIDEyICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgIHwgTU1NICAgfCBKYW4sIEZlYiwgLi4uLCBEZWMgICAgICAgICAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgfCBNTU1NICB8IEphbnVhcnksIEZlYnJ1YXJ5LCAuLi4sIERlY2VtYmVyIHxcbiAqIHwgSVNPIHdlZWsgICAgICAgICAgICAgICAgfCA0MCAgICAgICB8IFcgICAgIHwgMSwgMiwgLi4uLCA1MyAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgIHwgV28gICAgfCAxc3QsIDJuZCwgLi4uLCA1M3JkICAgICAgICAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgfCBXVyAgICB8IDAxLCAwMiwgLi4uLCA1MyAgICAgICAgICAgICAgICAgIHxcbiAqIHwgRGF5IG9mIHdlZWsgICAgICAgICAgICAgfCA1MCAgICAgICB8IGQgICAgIHwgMCwgMSwgLi4uLCA2ICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgIHwgZG8gICAgfCAwdGgsIDFzdCwgLi4uLCA2dGggICAgICAgICAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgfCBkZCAgICB8IFN1LCBNbywgLi4uLCBTYSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICB8IGRkZCAgIHwgU3VuLCBNb24sIC4uLiwgU2F0ICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgIHwgZGRkZCAgfCBTdW5kYXksIE1vbmRheSwgLi4uLCBTYXR1cmRheSAgICB8XG4gKiB8IERheSBvZiBJU08gd2VlayAgICAgICAgIHwgNTAgICAgICAgfCBFICAgICB8IDEsIDIsIC4uLiwgNyAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgRGF5IG9mIG1vbnRoICAgICAgICAgICAgfCA1MCAgICAgICB8IEQgICAgIHwgMSwgMiwgLi4uLCAzMSAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgIHwgRG8gICAgfCAxc3QsIDJuZCwgLi4uLCAzMXN0ICAgICAgICAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgfCBERCAgICB8IDAxLCAwMiwgLi4uLCAzMSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgRGF5IG9mIHllYXIgICAgICAgICAgICAgfCA1MCAgICAgICB8IERERCAgIHwgMSwgMiwgLi4uLCAzNjYgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgIHwgREREbyAgfCAxc3QsIDJuZCwgLi4uLCAzNjZ0aCAgICAgICAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgfCBEREREICB8IDAwMSwgMDAyLCAuLi4sIDM2NiAgICAgICAgICAgICAgIHxcbiAqIHwgVGltZSBvZiBkYXkgICAgICAgICAgICAgfCA2MCAgICAgICB8IEEgICAgIHwgQU0sIFBNICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgIHwgYSAgICAgfCBhbSwgcG0gICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgfCBhYSAgICB8IGEubS4sIHAubS4gICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgSG91ciAgICAgICAgICAgICAgICAgICAgfCA3MCAgICAgICB8IEggICAgIHwgMCwgMSwgLi4uIDIzICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgIHwgSEggICAgfCAwMCwgMDEsIC4uLiAyMyAgICAgICAgICAgICAgICAgICB8XG4gKiB8IFRpbWUgb2YgZGF5IGhvdXIgICAgICAgIHwgNzAgICAgICAgfCBoICAgICB8IDEsIDIsIC4uLiwgMTIgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICB8IGhoICAgIHwgMDEsIDAyLCAuLi4sIDEyICAgICAgICAgICAgICAgICAgfFxuICogfCBNaW51dGUgICAgICAgICAgICAgICAgICB8IDgwICAgICAgIHwgbSAgICAgfCAwLCAxLCAuLi4sIDU5ICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgfCBtbSAgICB8IDAwLCAwMSwgLi4uLCA1OSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgU2Vjb25kICAgICAgICAgICAgICAgICAgfCA5MCAgICAgICB8IHMgICAgIHwgMCwgMSwgLi4uLCA1OSAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgIHwgc3MgICAgfCAwMCwgMDEsIC4uLiwgNTkgICAgICAgICAgICAgICAgICB8XG4gKiB8IDEvMTAgb2Ygc2Vjb25kICAgICAgICAgIHwgMTAwICAgICAgfCBTICAgICB8IDAsIDEsIC4uLiwgOSAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgMS8xMDAgb2Ygc2Vjb25kICAgICAgICAgfCAxMDAgICAgICB8IFNTICAgIHwgMDAsIDAxLCAuLi4sIDk5ICAgICAgICAgICAgICAgICAgfFxuICogfCBNaWxsaXNlY29uZCAgICAgICAgICAgICB8IDEwMCAgICAgIHwgU1NTICAgfCAwMDAsIDAwMSwgLi4uLCA5OTkgICAgICAgICAgICAgICB8XG4gKiB8IFRpbWV6b25lICAgICAgICAgICAgICAgIHwgMTEwICAgICAgfCBaICAgICB8IC0wMTowMCwgKzAwOjAwLCAuLi4gKzEyOjAwICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICB8IFpaICAgIHwgLTAxMDAsICswMDAwLCAuLi4sICsxMjAwICAgICAgICAgfFxuICogfCBTZWNvbmRzIHRpbWVzdGFtcCAgICAgICB8IDEyMCAgICAgIHwgWCAgICAgfCA1MTI5Njk1MjAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8IE1pbGxpc2Vjb25kcyB0aW1lc3RhbXAgIHwgMTIwICAgICAgfCB4ICAgICB8IDUxMjk2OTUyMDkwMCAgICAgICAgICAgICAgICAgICAgIHxcbiAqXG4gKiBWYWx1ZXMgd2lsbCBiZSBhc3NpZ25lZCB0byB0aGUgZGF0ZSBpbiB0aGUgYXNjZW5kaW5nIG9yZGVyIG9mIGl0cyB1bml0J3MgcHJpb3JpdHkuXG4gKiBVbml0cyBvZiBhbiBlcXVhbCBwcmlvcml0eSBvdmVyd3JpdGUgZWFjaCBvdGhlciBpbiB0aGUgb3JkZXIgb2YgYXBwZWFyYW5jZS5cbiAqXG4gKiBJZiBubyB2YWx1ZXMgb2YgaGlnaGVyIHByaW9yaXR5IGFyZSBwYXJzZWQgKGUuZy4gd2hlbiBwYXJzaW5nIHN0cmluZyAnSmFudWFyeSAxc3QnIHdpdGhvdXQgYSB5ZWFyKSxcbiAqIHRoZSB2YWx1ZXMgd2lsbCBiZSB0YWtlbiBmcm9tIDNyZCBhcmd1bWVudCBgYmFzZURhdGVgIHdoaWNoIHdvcmtzIGFzIGEgY29udGV4dCBvZiBwYXJzaW5nLlxuICpcbiAqIGBiYXNlRGF0ZWAgbXVzdCBiZSBwYXNzZWQgZm9yIGNvcnJlY3Qgd29yayBvZiB0aGUgZnVuY3Rpb24uXG4gKiBJZiB5b3UncmUgbm90IHN1cmUgd2hpY2ggYGJhc2VEYXRlYCB0byBzdXBwbHksIGNyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBEYXRlOlxuICogYHBhcnNlKCcwMi8xMS8yMDE0JywgJ01NL0REL1lZWVknLCBuZXcgRGF0ZSgpKWBcbiAqIEluIHRoaXMgY2FzZSBwYXJzaW5nIHdpbGwgYmUgZG9uZSBpbiB0aGUgY29udGV4dCBvZiB0aGUgY3VycmVudCBkYXRlLlxuICogSWYgYGJhc2VEYXRlYCBpcyBgSW52YWxpZCBEYXRlYCBvciBhIHZhbHVlIG5vdCBjb252ZXJ0aWJsZSB0byB2YWxpZCBgRGF0ZWAsXG4gKiB0aGVuIGBJbnZhbGlkIERhdGVgIHdpbGwgYmUgcmV0dXJuZWQuXG4gKlxuICogQWxzbywgYHBhcnNlYCB1bmZvbGRzIGxvbmcgZm9ybWF0cyBsaWtlIHRob3NlIGluIFtmb3JtYXRde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvZm9ybWF0fTpcbiAqIHwgVG9rZW4gfCBJbnB1dCBleGFtcGxlcyAgICAgICAgICAgICAgICAgfFxuICogfC0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8IExUICAgIHwgMDU6MzAgYS5tLiAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgTFRTICAgfCAwNTozMDoxNSBhLm0uICAgICAgICAgICAgICAgICAgfFxuICogfCBMICAgICB8IDA3LzAyLzE5OTUgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8IGwgICAgIHwgNy8yLzE5OTUgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgTEwgICAgfCBKdWx5IDIgMTk5NSAgICAgICAgICAgICAgICAgICAgfFxuICogfCBsbCAgICB8IEp1bCAyIDE5OTUgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8IExMTCAgIHwgSnVseSAyIDE5OTUgMDU6MzAgYS5tLiAgICAgICAgIHxcbiAqIHwgbGxsICAgfCBKdWwgMiAxOTk1IDA1OjMwIGEubS4gICAgICAgICAgfFxuICogfCBMTExMICB8IFN1bmRheSwgSnVseSAyIDE5OTUgMDU6MzAgYS5tLiB8XG4gKiB8IGxsbGwgIHwgU3VuLCBKdWwgMiAxOTk1IDA1OjMwIGEubS4gICAgIHxcbiAqXG4gKiBUaGUgY2hhcmFjdGVycyB3cmFwcGVkIGluIHNxdWFyZSBicmFja2V0cyBpbiB0aGUgZm9ybWF0IHN0cmluZyBhcmUgZXNjYXBlZC5cbiAqXG4gKiBUaGUgcmVzdWx0IG1heSB2YXJ5IGJ5IGxvY2FsZS5cbiAqXG4gKiBJZiBgZm9ybWF0U3RyaW5nYCBtYXRjaGVzIHdpdGggYGRhdGVTdHJpbmdgIGJ1dCBkb2VzIG5vdCBwcm92aWRlcyB0b2tlbnMsIGBiYXNlRGF0ZWAgd2lsbCBiZSByZXR1cm5lZC5cbiAqXG4gKiBJZiBwYXJzaW5nIGZhaWxlZCwgYEludmFsaWQgRGF0ZWAgd2lsbCBiZSByZXR1cm5lZC5cbiAqIEludmFsaWQgRGF0ZSBpcyBhIERhdGUsIHdob3NlIHRpbWUgdmFsdWUgaXMgTmFOLlxuICogVGltZSB2YWx1ZSBvZiBEYXRlOiBodHRwOi8vZXM1LmdpdGh1Yi5pby8jeDE1LjkuMS4xXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGVTdHJpbmcgLSB0aGUgc3RyaW5nIHRvIHBhcnNlXG4gKiBAcGFyYW0ge1N0cmluZ30gZm9ybWF0U3RyaW5nIC0gdGhlIHN0cmluZyBvZiB0b2tlbnNcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBiYXNlRGF0ZSAtIHRoZSBkYXRlIHRvIHRvb2sgdGhlIG1pc3NpbmcgaGlnaGVyIHByaW9yaXR5IHZhbHVlcyBmcm9tXG4gKiBAcGFyYW0ge09wdGlvbnN9IFtvcHRpb25zXSAtIHRoZSBvYmplY3Qgd2l0aCBvcHRpb25zLiBTZWUgW09wdGlvbnNde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvT3B0aW9uc31cbiAqIEBwYXJhbSB7MHwxfDJ9IFtvcHRpb25zLmFkZGl0aW9uYWxEaWdpdHM9Ml0gLSBwYXNzZWQgdG8gYHRvRGF0ZWAuIFNlZSBbdG9EYXRlXXtAbGluayBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL3RvRGF0ZX1cbiAqIEBwYXJhbSB7TG9jYWxlfSBbb3B0aW9ucy5sb2NhbGU9ZGVmYXVsdExvY2FsZV0gLSB0aGUgbG9jYWxlIG9iamVjdC4gU2VlIFtMb2NhbGVde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvTG9jYWxlfVxuICogQHBhcmFtIHswfDF8MnwzfDR8NXw2fSBbb3B0aW9ucy53ZWVrU3RhcnRzT249MF0gLSB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2VlayAoMCAtIFN1bmRheSlcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgcGFyc2VkIGRhdGVcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMyBhcmd1bWVudHMgcmVxdWlyZWRcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBvcHRpb25zLmFkZGl0aW9uYWxEaWdpdHNgIG11c3QgYmUgMCwgMSBvciAyXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy53ZWVrU3RhcnRzT25gIG11c3QgYmUgYmV0d2VlbiAwIGFuZCA2XG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy5sb2NhbGVgIG11c3QgY29udGFpbiBgbWF0Y2hgIHByb3BlcnR5XG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy5sb2NhbGVgIG11c3QgY29udGFpbiBgZm9ybWF0TG9uZ2AgcHJvcGVydHlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUGFyc2UgMTEgRmVicnVhcnkgMjAxNCBmcm9tIG1pZGRsZS1lbmRpYW4gZm9ybWF0OlxuICogdmFyIHJlc3VsdCA9IHBhcnNlKFxuICogICAnMDIvMTEvMjAxNCcsXG4gKiAgICdNTS9ERC9ZWVlZJyxcbiAqICAgbmV3IERhdGUoKVxuICogKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMDA6MDA6MDBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUGFyc2UgMjh0aCBvZiBGZWJydWFyeSBpbiBFbmdsaXNoIGxvY2FsZSBpbiB0aGUgY29udGV4dCBvZiAyMDEwIHllYXI6XG4gKiBpbXBvcnQgZW9Mb2NhbGUgZnJvbSAnZGF0ZS1mbnMvbG9jYWxlL2VvJ1xuICogdmFyIHJlc3VsdCA9IHBhcnNlKFxuICogICAnMjgtYSBkZSBmZWJydWFybycsXG4gKiAgICdEbyBbZGVdIE1NTU0nLFxuICogICBuZXcgRGF0ZSgyMDEwLCAwLCAxKVxuICogICB7bG9jYWxlOiBlb0xvY2FsZX1cbiAqIClcbiAqIC8vPT4gU3VuIEZlYiAyOCAyMDEwIDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIHBhcnNlKGRpcnR5RGF0ZVN0cmluZywgZGlydHlGb3JtYXRTdHJpbmcsIGRpcnR5QmFzZURhdGUsIGRpcnR5T3B0aW9ucykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCczIGFyZ3VtZW50cyByZXF1aXJlZCwgYnV0IG9ubHkgJyArIGFyZ3VtZW50cy5sZW5ndGggKyAnIHByZXNlbnQnKTtcbiAgfVxuXG4gIHZhciBkYXRlU3RyaW5nID0gU3RyaW5nKGRpcnR5RGF0ZVN0cmluZyk7XG4gIHZhciBvcHRpb25zID0gZGlydHlPcHRpb25zIHx8IHt9O1xuXG4gIHZhciB3ZWVrU3RhcnRzT24gPSBvcHRpb25zLndlZWtTdGFydHNPbiA9PT0gdW5kZWZpbmVkID8gMCA6IE51bWJlcihvcHRpb25zLndlZWtTdGFydHNPbik7XG5cbiAgLy8gVGVzdCBpZiB3ZWVrU3RhcnRzT24gaXMgYmV0d2VlbiAwIGFuZCA2IF9hbmRfIGlzIG5vdCBOYU5cbiAgaWYgKCEod2Vla1N0YXJ0c09uID49IDAgJiYgd2Vla1N0YXJ0c09uIDw9IDYpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3dlZWtTdGFydHNPbiBtdXN0IGJlIGJldHdlZW4gMCBhbmQgNiBpbmNsdXNpdmVseScpO1xuICB9XG5cbiAgdmFyIGxvY2FsZSA9IG9wdGlvbnMubG9jYWxlIHx8IF9pbmRleDYuZGVmYXVsdDtcbiAgdmFyIGxvY2FsZVBhcnNlcnMgPSBsb2NhbGUucGFyc2VycyB8fCB7fTtcbiAgdmFyIGxvY2FsZVVuaXRzID0gbG9jYWxlLnVuaXRzIHx8IHt9O1xuXG4gIGlmICghbG9jYWxlLm1hdGNoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ2xvY2FsZSBtdXN0IGNvbnRhaW4gbWF0Y2ggcHJvcGVydHknKTtcbiAgfVxuXG4gIGlmICghbG9jYWxlLmZvcm1hdExvbmcpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignbG9jYWxlIG11c3QgY29udGFpbiBmb3JtYXRMb25nIHByb3BlcnR5Jyk7XG4gIH1cblxuICB2YXIgZm9ybWF0U3RyaW5nID0gU3RyaW5nKGRpcnR5Rm9ybWF0U3RyaW5nKS5yZXBsYWNlKGxvbmdGb3JtYXR0aW5nVG9rZW5zUmVnRXhwLCBmdW5jdGlvbiAoc3Vic3RyaW5nKSB7XG4gICAgaWYgKHN1YnN0cmluZ1swXSA9PT0gJ1snKSB7XG4gICAgICByZXR1cm4gc3Vic3RyaW5nO1xuICAgIH1cblxuICAgIGlmIChzdWJzdHJpbmdbMF0gPT09ICdcXFxcJykge1xuICAgICAgcmV0dXJuIGNsZWFuRXNjYXBlZFN0cmluZyhzdWJzdHJpbmcpO1xuICAgIH1cblxuICAgIHJldHVybiBsb2NhbGUuZm9ybWF0TG9uZyhzdWJzdHJpbmcpO1xuICB9KTtcblxuICBpZiAoZm9ybWF0U3RyaW5nID09PSAnJykge1xuICAgIGlmIChkYXRlU3RyaW5nID09PSAnJykge1xuICAgICAgcmV0dXJuICgwLCBfaW5kZXgyLmRlZmF1bHQpKGRpcnR5QmFzZURhdGUsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgICB9XG4gIH1cblxuICB2YXIgc3ViRm5PcHRpb25zID0gKDAsIF9pbmRleDEyLmRlZmF1bHQpKG9wdGlvbnMpO1xuICBzdWJGbk9wdGlvbnMubG9jYWxlID0gbG9jYWxlO1xuXG4gIHZhciB0b2tlbnMgPSBmb3JtYXRTdHJpbmcubWF0Y2gobG9jYWxlLnBhcnNpbmdUb2tlbnNSZWdFeHAgfHwgZGVmYXVsdFBhcnNpbmdUb2tlbnNSZWdFeHApO1xuICB2YXIgdG9rZW5zTGVuZ3RoID0gdG9rZW5zLmxlbmd0aDtcblxuICAvLyBJZiB0aW1lem9uZSBpc24ndCBzcGVjaWZpZWQsIGl0IHdpbGwgYmUgc2V0IHRvIHRoZSBzeXN0ZW0gdGltZXpvbmVcbiAgdmFyIHNldHRlcnMgPSBbe1xuICAgIHByaW9yaXR5OiBUSU1FWk9ORV9VTklUX1BSSU9SSVRZLFxuICAgIHNldDogZGF0ZVRvU3lzdGVtVGltZXpvbmUsXG4gICAgaW5kZXg6IDBcbiAgfV07XG5cbiAgdmFyIGk7XG4gIGZvciAoaSA9IDA7IGkgPCB0b2tlbnNMZW5ndGg7IGkrKykge1xuICAgIHZhciB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICB2YXIgcGFyc2VyID0gbG9jYWxlUGFyc2Vyc1t0b2tlbl0gfHwgX2luZGV4OC5kZWZhdWx0W3Rva2VuXTtcbiAgICBpZiAocGFyc2VyKSB7XG4gICAgICB2YXIgbWF0Y2hSZXN1bHQ7XG5cbiAgICAgIGlmIChwYXJzZXIubWF0Y2ggaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgbWF0Y2hSZXN1bHQgPSBwYXJzZXIubWF0Y2guZXhlYyhkYXRlU3RyaW5nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hdGNoUmVzdWx0ID0gcGFyc2VyLm1hdGNoKGRhdGVTdHJpbmcsIHN1YkZuT3B0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIGlmICghbWF0Y2hSZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gICAgICB9XG5cbiAgICAgIHZhciB1bml0TmFtZSA9IHBhcnNlci51bml0O1xuICAgICAgdmFyIHVuaXQgPSBsb2NhbGVVbml0c1t1bml0TmFtZV0gfHwgX2luZGV4MTAuZGVmYXVsdFt1bml0TmFtZV07XG5cbiAgICAgIHNldHRlcnMucHVzaCh7XG4gICAgICAgIHByaW9yaXR5OiB1bml0LnByaW9yaXR5LFxuICAgICAgICBzZXQ6IHVuaXQuc2V0LFxuICAgICAgICB2YWx1ZTogcGFyc2VyLnBhcnNlKG1hdGNoUmVzdWx0LCBzdWJGbk9wdGlvbnMpLFxuICAgICAgICBpbmRleDogc2V0dGVycy5sZW5ndGhcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgc3Vic3RyaW5nID0gbWF0Y2hSZXN1bHRbMF07XG4gICAgICBkYXRlU3RyaW5nID0gZGF0ZVN0cmluZy5zbGljZShzdWJzdHJpbmcubGVuZ3RoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGhlYWQgPSB0b2tlbnNbaV0ubWF0Y2goL15cXFsuKl0kLykgPyB0b2tlbnNbaV0ucmVwbGFjZSgvXlxcW3xdJC9nLCAnJykgOiB0b2tlbnNbaV07XG4gICAgICBpZiAoZGF0ZVN0cmluZy5pbmRleE9mKGhlYWQpID09PSAwKSB7XG4gICAgICAgIGRhdGVTdHJpbmcgPSBkYXRlU3RyaW5nLnNsaWNlKGhlYWQubGVuZ3RoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciB1bmlxdWVQcmlvcml0eVNldHRlcnMgPSBzZXR0ZXJzLm1hcChmdW5jdGlvbiAoc2V0dGVyKSB7XG4gICAgcmV0dXJuIHNldHRlci5wcmlvcml0eTtcbiAgfSkuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBhIC0gYjtcbiAgfSkuZmlsdGVyKGZ1bmN0aW9uIChwcmlvcml0eSwgaW5kZXgsIGFycmF5KSB7XG4gICAgcmV0dXJuIGFycmF5LmluZGV4T2YocHJpb3JpdHkpID09PSBpbmRleDtcbiAgfSkubWFwKGZ1bmN0aW9uIChwcmlvcml0eSkge1xuICAgIHJldHVybiBzZXR0ZXJzLmZpbHRlcihmdW5jdGlvbiAoc2V0dGVyKSB7XG4gICAgICByZXR1cm4gc2V0dGVyLnByaW9yaXR5ID09PSBwcmlvcml0eTtcbiAgICB9KS5yZXZlcnNlKCk7XG4gIH0pLm1hcChmdW5jdGlvbiAoc2V0dGVyQXJyYXkpIHtcbiAgICByZXR1cm4gc2V0dGVyQXJyYXlbMF07XG4gIH0pO1xuXG4gIHZhciBkYXRlID0gKDAsIF9pbmRleDIuZGVmYXVsdCkoZGlydHlCYXNlRGF0ZSwgb3B0aW9ucyk7XG5cbiAgaWYgKGlzTmFOKGRhdGUpKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gIH1cblxuICAvLyBDb252ZXJ0IHRoZSBkYXRlIGluIHN5c3RlbSB0aW1lem9uZSB0byB0aGUgc2FtZSBkYXRlIGluIFVUQyswMDowMCB0aW1lem9uZS5cbiAgLy8gVGhpcyBlbnN1cmVzIHRoYXQgd2hlbiBVVEMgZnVuY3Rpb25zIHdpbGwgYmUgaW1wbGVtZW50ZWQsIGxvY2FsZXMgd2lsbCBiZSBjb21wYXRpYmxlIHdpdGggdGhlbS5cbiAgLy8gU2VlIGFuIGlzc3VlIGFib3V0IFVUQyBmdW5jdGlvbnM6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9pc3N1ZXMvMzdcbiAgdmFyIHV0Y0RhdGUgPSAoMCwgX2luZGV4NC5kZWZhdWx0KShkYXRlLCBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KCkpO1xuXG4gIHZhciBkYXRlVmFsdWVzID0geyBkYXRlOiB1dGNEYXRlIH07XG5cbiAgdmFyIHNldHRlcnNMZW5ndGggPSB1bmlxdWVQcmlvcml0eVNldHRlcnMubGVuZ3RoO1xuICBmb3IgKGkgPSAwOyBpIDwgc2V0dGVyc0xlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNldHRlciA9IHVuaXF1ZVByaW9yaXR5U2V0dGVyc1tpXTtcbiAgICBkYXRlVmFsdWVzID0gc2V0dGVyLnNldChkYXRlVmFsdWVzLCBzZXR0ZXIudmFsdWUsIHN1YkZuT3B0aW9ucyk7XG4gIH1cblxuICByZXR1cm4gZGF0ZVZhbHVlcy5kYXRlO1xufVxuXG5mdW5jdGlvbiBkYXRlVG9TeXN0ZW1UaW1lem9uZShkYXRlVmFsdWVzKSB7XG4gIHZhciBkYXRlID0gZGF0ZVZhbHVlcy5kYXRlO1xuICB2YXIgdGltZSA9IGRhdGUuZ2V0VGltZSgpO1xuXG4gIC8vIEdldCB0aGUgc3lzdGVtIHRpbWV6b25lIG9mZnNldCBhdCAobW9tZW50IG9mIHRpbWUgLSBvZmZzZXQpXG4gIHZhciBvZmZzZXQgPSBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XG5cbiAgLy8gR2V0IHRoZSBzeXN0ZW0gdGltZXpvbmUgb2Zmc2V0IGF0IHRoZSBleGFjdCBtb21lbnQgb2YgdGltZVxuICBvZmZzZXQgPSBuZXcgRGF0ZSh0aW1lICsgb2Zmc2V0ICogTUlMTElTRUNPTkRTX0lOX01JTlVURSkuZ2V0VGltZXpvbmVPZmZzZXQoKTtcblxuICAvLyBDb252ZXJ0IGRhdGUgaW4gdGltZXpvbmUgXCJVVEMrMDA6MDBcIiB0byB0aGUgc3lzdGVtIHRpbWV6b25lXG4gIGRhdGVWYWx1ZXMuZGF0ZSA9IG5ldyBEYXRlKHRpbWUgKyBvZmZzZXQgKiBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFKTtcblxuICByZXR1cm4gZGF0ZVZhbHVlcztcbn1cblxuZnVuY3Rpb24gY2xlYW5Fc2NhcGVkU3RyaW5nKGlucHV0KSB7XG4gIGlmIChpbnB1dC5tYXRjaCgvXFxbW1xcc1xcU10vKSkge1xuICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKC9eXFxbfF0kL2csICcnKTtcbiAgfVxuICByZXR1cm4gaW5wdXQucmVwbGFjZSgvXFxcXC9nLCAnJyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBzdWJNaW51dGVzO1xuXG52YXIgX2luZGV4ID0gcmVxdWlyZSgnLi4vYWRkTWludXRlcy9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luZGV4KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBAbmFtZSBzdWJNaW51dGVzXG4gKiBAY2F0ZWdvcnkgTWludXRlIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFN1YnRyYWN0IHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIG1pbnV0ZXMgZnJvbSB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFN1YnRyYWN0IHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIG1pbnV0ZXMgZnJvbSB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgLSB0aGUgYW1vdW50IG9mIG1pbnV0ZXMgdG8gYmUgc3VidHJhY3RlZFxuICogQHBhcmFtIHtPcHRpb25zfSBbb3B0aW9uc10gLSB0aGUgb2JqZWN0IHdpdGggb3B0aW9ucy4gU2VlIFtPcHRpb25zXXtAbGluayBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL09wdGlvbnN9XG4gKiBAcGFyYW0gezB8MXwyfSBbb3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzPTJdIC0gcGFzc2VkIHRvIGB0b0RhdGVgLiBTZWUgW3RvRGF0ZV17QGxpbmsgaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy90b0RhdGV9XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIG1pbnR1ZXMgc3VidHJhY3RlZFxuICogQHRocm93cyB7VHlwZUVycm9yfSAyIGFyZ3VtZW50cyByZXF1aXJlZFxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMuYWRkaXRpb25hbERpZ2l0c2AgbXVzdCBiZSAwLCAxIG9yIDJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3VidHJhY3QgMzAgbWludXRlcyBmcm9tIDEwIEp1bHkgMjAxNCAxMjowMDowMDpcbiAqIHZhciByZXN1bHQgPSBzdWJNaW51dGVzKG5ldyBEYXRlKDIwMTQsIDYsIDEwLCAxMiwgMCksIDMwKVxuICogLy89PiBUaHUgSnVsIDEwIDIwMTQgMTE6MzA6MDBcbiAqL1xuZnVuY3Rpb24gc3ViTWludXRlcyhkaXJ0eURhdGUsIGRpcnR5QW1vdW50LCBkaXJ0eU9wdGlvbnMpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignMiBhcmd1bWVudHMgcmVxdWlyZWQsIGJ1dCBvbmx5ICcgKyBhcmd1bWVudHMubGVuZ3RoICsgJyBwcmVzZW50Jyk7XG4gIH1cblxuICB2YXIgYW1vdW50ID0gTnVtYmVyKGRpcnR5QW1vdW50KTtcbiAgcmV0dXJuICgwLCBfaW5kZXgyLmRlZmF1bHQpKGRpcnR5RGF0ZSwgLWFtb3VudCwgZGlydHlPcHRpb25zKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHRvRGF0ZTtcbnZhciBNSUxMSVNFQ09ORFNfSU5fSE9VUiA9IDM2MDAwMDA7XG52YXIgTUlMTElTRUNPTkRTX0lOX01JTlVURSA9IDYwMDAwO1xudmFyIERFRkFVTFRfQURESVRJT05BTF9ESUdJVFMgPSAyO1xuXG52YXIgcGF0dGVybnMgPSB7XG4gIGRhdGVUaW1lRGVsaW1ldGVyOiAvW1QgXS8sXG4gIHBsYWluVGltZTogLzovLFxuXG4gIC8vIHllYXIgdG9rZW5zXG4gIFlZOiAvXihcXGR7Mn0pJC8sXG4gIFlZWTogWy9eKFsrLV1cXGR7Mn0pJC8sIC8vIDAgYWRkaXRpb25hbCBkaWdpdHNcbiAgL14oWystXVxcZHszfSkkLywgLy8gMSBhZGRpdGlvbmFsIGRpZ2l0XG4gIC9eKFsrLV1cXGR7NH0pJC8gLy8gMiBhZGRpdGlvbmFsIGRpZ2l0c1xuICBdLFxuICBZWVlZOiAvXihcXGR7NH0pLyxcbiAgWVlZWVk6IFsvXihbKy1dXFxkezR9KS8sIC8vIDAgYWRkaXRpb25hbCBkaWdpdHNcbiAgL14oWystXVxcZHs1fSkvLCAvLyAxIGFkZGl0aW9uYWwgZGlnaXRcbiAgL14oWystXVxcZHs2fSkvIC8vIDIgYWRkaXRpb25hbCBkaWdpdHNcbiAgXSxcblxuICAvLyBkYXRlIHRva2Vuc1xuICBNTTogL14tKFxcZHsyfSkkLyxcbiAgREREOiAvXi0/KFxcZHszfSkkLyxcbiAgTU1ERDogL14tPyhcXGR7Mn0pLT8oXFxkezJ9KSQvLFxuICBXd3c6IC9eLT9XKFxcZHsyfSkkLyxcbiAgV3d3RDogL14tP1coXFxkezJ9KS0/KFxcZHsxfSkkLyxcblxuICBISDogL14oXFxkezJ9KFsuLF1cXGQqKT8pJC8sXG4gIEhITU06IC9eKFxcZHsyfSk6PyhcXGR7Mn0oWy4sXVxcZCopPykkLyxcbiAgSEhNTVNTOiAvXihcXGR7Mn0pOj8oXFxkezJ9KTo/KFxcZHsyfShbLixdXFxkKik/KSQvLFxuXG4gIC8vIHRpbWV6b25lIHRva2Vuc1xuICB0aW1lem9uZTogLyhbWistXS4qKSQvLFxuICB0aW1lem9uZVo6IC9eKFopJC8sXG4gIHRpbWV6b25lSEg6IC9eKFsrLV0pKFxcZHsyfSkkLyxcbiAgdGltZXpvbmVISE1NOiAvXihbKy1dKShcXGR7Mn0pOj8oXFxkezJ9KSQvXG59O1xuXG4vKipcbiAqIEBuYW1lIHRvRGF0ZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgaXRzIGNsb25lLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhIG51bWJlciwgaXQgaXMgdHJlYXRlZCBhcyBhIHRpbWVzdGFtcC5cbiAqXG4gKiBJZiBhbiBhcmd1bWVudCBpcyBhIHN0cmluZywgdGhlIGZ1bmN0aW9uIHRyaWVzIHRvIHBhcnNlIGl0LlxuICogRnVuY3Rpb24gYWNjZXB0cyBjb21wbGV0ZSBJU08gODYwMSBmb3JtYXRzIGFzIHdlbGwgYXMgcGFydGlhbCBpbXBsZW1lbnRhdGlvbnMuXG4gKiBJU08gODYwMTogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fODYwMVxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBudWxsLCBpdCBpcyB0cmVhdGVkIGFzIGFuIGludmFsaWQgZGF0ZS5cbiAqXG4gKiBJZiBhbGwgYWJvdmUgZmFpbHMsIHRoZSBmdW5jdGlvbiBwYXNzZXMgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIERhdGUgY29uc3RydWN0b3IuXG4gKlxuICogKipOb3RlKio6ICphbGwqIERhdGUgYXJndW1lbnRzIHBhc3NlZCB0byBhbnkgKmRhdGUtZm5zKiBmdW5jdGlvbiBpcyBwcm9jZXNzZWQgYnkgYHRvRGF0ZWAuXG4gKiBBbGwgKmRhdGUtZm5zKiBmdW5jdGlvbnMgd2lsbCB0aHJvdyBgUmFuZ2VFcnJvcmAgaWYgYG9wdGlvbnMuYWRkaXRpb25hbERpZ2l0c2AgaXMgbm90IDAsIDEsIDIgb3IgdW5kZWZpbmVkLlxuICpcbiAqIEBwYXJhbSB7Kn0gYXJndW1lbnQgLSB0aGUgdmFsdWUgdG8gY29udmVydFxuICogQHBhcmFtIHtPcHRpb25zfSBbb3B0aW9uc10gLSB0aGUgb2JqZWN0IHdpdGggb3B0aW9ucy4gU2VlIFtPcHRpb25zXXtAbGluayBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL09wdGlvbnN9XG4gKiBAcGFyYW0gezB8MXwyfSBbb3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzPTJdIC0gdGhlIGFkZGl0aW9uYWwgbnVtYmVyIG9mIGRpZ2l0cyBpbiB0aGUgZXh0ZW5kZWQgeWVhciBmb3JtYXRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgcGFyc2VkIGRhdGUgaW4gdGhlIGxvY2FsIHRpbWUgem9uZVxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzYCBtdXN0IGJlIDAsIDEgb3IgMlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHN0cmluZyAnMjAxNC0wMi0xMVQxMTozMDozMCcgdG8gZGF0ZTpcbiAqIHZhciByZXN1bHQgPSB0b0RhdGUoJzIwMTQtMDItMTFUMTE6MzA6MzAnKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29udmVydCBzdHJpbmcgJyswMjAxNDEwMScgdG8gZGF0ZSxcbiAqIC8vIGlmIHRoZSBhZGRpdGlvbmFsIG51bWJlciBvZiBkaWdpdHMgaW4gdGhlIGV4dGVuZGVkIHllYXIgZm9ybWF0IGlzIDE6XG4gKiB2YXIgcmVzdWx0ID0gdG9EYXRlKCcrMDIwMTQxMDEnLCB7YWRkaXRpb25hbERpZ2l0czogMX0pXG4gKiAvLz0+IEZyaSBBcHIgMTEgMjAxNCAwMDowMDowMFxuICovXG5mdW5jdGlvbiB0b0RhdGUoYXJndW1lbnQsIGRpcnR5T3B0aW9ucykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDEpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcxIGFyZ3VtZW50IHJlcXVpcmVkLCBidXQgb25seSAnICsgYXJndW1lbnRzLmxlbmd0aCArICcgcHJlc2VudCcpO1xuICB9XG5cbiAgaWYgKGFyZ3VtZW50ID09PSBudWxsKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gIH1cblxuICB2YXIgb3B0aW9ucyA9IGRpcnR5T3B0aW9ucyB8fCB7fTtcblxuICB2YXIgYWRkaXRpb25hbERpZ2l0cyA9IG9wdGlvbnMuYWRkaXRpb25hbERpZ2l0cyA9PT0gdW5kZWZpbmVkID8gREVGQVVMVF9BRERJVElPTkFMX0RJR0lUUyA6IE51bWJlcihvcHRpb25zLmFkZGl0aW9uYWxEaWdpdHMpO1xuICBpZiAoYWRkaXRpb25hbERpZ2l0cyAhPT0gMiAmJiBhZGRpdGlvbmFsRGlnaXRzICE9PSAxICYmIGFkZGl0aW9uYWxEaWdpdHMgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignYWRkaXRpb25hbERpZ2l0cyBtdXN0IGJlIDAsIDEgb3IgMicpO1xuICB9XG5cbiAgLy8gQ2xvbmUgdGhlIGRhdGVcbiAgaWYgKGFyZ3VtZW50IGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIC8vIFByZXZlbnQgdGhlIGRhdGUgdG8gbG9zZSB0aGUgbWlsbGlzZWNvbmRzIHdoZW4gcGFzc2VkIHRvIG5ldyBEYXRlKCkgaW4gSUUxMFxuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudC5nZXRUaW1lKCkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudCAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQpO1xuICB9XG5cbiAgdmFyIGRhdGVTdHJpbmdzID0gc3BsaXREYXRlU3RyaW5nKGFyZ3VtZW50KTtcblxuICB2YXIgcGFyc2VZZWFyUmVzdWx0ID0gcGFyc2VZZWFyKGRhdGVTdHJpbmdzLmRhdGUsIGFkZGl0aW9uYWxEaWdpdHMpO1xuICB2YXIgeWVhciA9IHBhcnNlWWVhclJlc3VsdC55ZWFyO1xuICB2YXIgcmVzdERhdGVTdHJpbmcgPSBwYXJzZVllYXJSZXN1bHQucmVzdERhdGVTdHJpbmc7XG5cbiAgdmFyIGRhdGUgPSBwYXJzZURhdGUocmVzdERhdGVTdHJpbmcsIHllYXIpO1xuXG4gIGlmIChkYXRlKSB7XG4gICAgdmFyIHRpbWVzdGFtcCA9IGRhdGUuZ2V0VGltZSgpO1xuICAgIHZhciB0aW1lID0gMDtcbiAgICB2YXIgb2Zmc2V0O1xuXG4gICAgaWYgKGRhdGVTdHJpbmdzLnRpbWUpIHtcbiAgICAgIHRpbWUgPSBwYXJzZVRpbWUoZGF0ZVN0cmluZ3MudGltZSk7XG4gICAgfVxuXG4gICAgaWYgKGRhdGVTdHJpbmdzLnRpbWV6b25lKSB7XG4gICAgICBvZmZzZXQgPSBwYXJzZVRpbWV6b25lKGRhdGVTdHJpbmdzLnRpbWV6b25lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZ2V0IG9mZnNldCBhY2N1cmF0ZSB0byBob3VyIGluIHRpbWV6b25lcyB0aGF0IGNoYW5nZSBvZmZzZXRcbiAgICAgIG9mZnNldCA9IG5ldyBEYXRlKHRpbWVzdGFtcCArIHRpbWUpLmdldFRpbWV6b25lT2Zmc2V0KCk7XG4gICAgICBvZmZzZXQgPSBuZXcgRGF0ZSh0aW1lc3RhbXAgKyB0aW1lICsgb2Zmc2V0ICogTUlMTElTRUNPTkRTX0lOX01JTlVURSkuZ2V0VGltZXpvbmVPZmZzZXQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IERhdGUodGltZXN0YW1wICsgdGltZSArIG9mZnNldCAqIE1JTExJU0VDT05EU19JTl9NSU5VVEUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc3BsaXREYXRlU3RyaW5nKGRhdGVTdHJpbmcpIHtcbiAgdmFyIGRhdGVTdHJpbmdzID0ge307XG4gIHZhciBhcnJheSA9IGRhdGVTdHJpbmcuc3BsaXQocGF0dGVybnMuZGF0ZVRpbWVEZWxpbWV0ZXIpO1xuICB2YXIgdGltZVN0cmluZztcblxuICBpZiAocGF0dGVybnMucGxhaW5UaW1lLnRlc3QoYXJyYXlbMF0pKSB7XG4gICAgZGF0ZVN0cmluZ3MuZGF0ZSA9IG51bGw7XG4gICAgdGltZVN0cmluZyA9IGFycmF5WzBdO1xuICB9IGVsc2Uge1xuICAgIGRhdGVTdHJpbmdzLmRhdGUgPSBhcnJheVswXTtcbiAgICB0aW1lU3RyaW5nID0gYXJyYXlbMV07XG4gIH1cblxuICBpZiAodGltZVN0cmluZykge1xuICAgIHZhciB0b2tlbiA9IHBhdHRlcm5zLnRpbWV6b25lLmV4ZWModGltZVN0cmluZyk7XG4gICAgaWYgKHRva2VuKSB7XG4gICAgICBkYXRlU3RyaW5ncy50aW1lID0gdGltZVN0cmluZy5yZXBsYWNlKHRva2VuWzFdLCAnJyk7XG4gICAgICBkYXRlU3RyaW5ncy50aW1lem9uZSA9IHRva2VuWzFdO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRlU3RyaW5ncy50aW1lID0gdGltZVN0cmluZztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGF0ZVN0cmluZ3M7XG59XG5cbmZ1bmN0aW9uIHBhcnNlWWVhcihkYXRlU3RyaW5nLCBhZGRpdGlvbmFsRGlnaXRzKSB7XG4gIHZhciBwYXR0ZXJuWVlZID0gcGF0dGVybnMuWVlZW2FkZGl0aW9uYWxEaWdpdHNdO1xuICB2YXIgcGF0dGVybllZWVlZID0gcGF0dGVybnMuWVlZWVlbYWRkaXRpb25hbERpZ2l0c107XG5cbiAgdmFyIHRva2VuO1xuXG4gIC8vIFlZWVkgb3IgwrFZWVlZWVxuICB0b2tlbiA9IHBhdHRlcm5zLllZWVkuZXhlYyhkYXRlU3RyaW5nKSB8fCBwYXR0ZXJuWVlZWVkuZXhlYyhkYXRlU3RyaW5nKTtcbiAgaWYgKHRva2VuKSB7XG4gICAgdmFyIHllYXJTdHJpbmcgPSB0b2tlblsxXTtcbiAgICByZXR1cm4ge1xuICAgICAgeWVhcjogcGFyc2VJbnQoeWVhclN0cmluZywgMTApLFxuICAgICAgcmVzdERhdGVTdHJpbmc6IGRhdGVTdHJpbmcuc2xpY2UoeWVhclN0cmluZy5sZW5ndGgpXG4gICAgfTtcbiAgfVxuXG4gIC8vIFlZIG9yIMKxWVlZXG4gIHRva2VuID0gcGF0dGVybnMuWVkuZXhlYyhkYXRlU3RyaW5nKSB8fCBwYXR0ZXJuWVlZLmV4ZWMoZGF0ZVN0cmluZyk7XG4gIGlmICh0b2tlbikge1xuICAgIHZhciBjZW50dXJ5U3RyaW5nID0gdG9rZW5bMV07XG4gICAgcmV0dXJuIHtcbiAgICAgIHllYXI6IHBhcnNlSW50KGNlbnR1cnlTdHJpbmcsIDEwKSAqIDEwMCxcbiAgICAgIHJlc3REYXRlU3RyaW5nOiBkYXRlU3RyaW5nLnNsaWNlKGNlbnR1cnlTdHJpbmcubGVuZ3RoKVxuICAgIH07XG4gIH1cblxuICAvLyBJbnZhbGlkIElTTy1mb3JtYXR0ZWQgeWVhclxuICByZXR1cm4ge1xuICAgIHllYXI6IG51bGxcbiAgfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VEYXRlKGRhdGVTdHJpbmcsIHllYXIpIHtcbiAgLy8gSW52YWxpZCBJU08tZm9ybWF0dGVkIHllYXJcbiAgaWYgKHllYXIgPT09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZhciB0b2tlbjtcbiAgdmFyIGRhdGU7XG4gIHZhciBtb250aDtcbiAgdmFyIHdlZWs7XG5cbiAgLy8gWVlZWVxuICBpZiAoZGF0ZVN0cmluZy5sZW5ndGggPT09IDApIHtcbiAgICBkYXRlID0gbmV3IERhdGUoMCk7XG4gICAgZGF0ZS5zZXRVVENGdWxsWWVhcih5ZWFyKTtcbiAgICByZXR1cm4gZGF0ZTtcbiAgfVxuXG4gIC8vIFlZWVktTU1cbiAgdG9rZW4gPSBwYXR0ZXJucy5NTS5leGVjKGRhdGVTdHJpbmcpO1xuICBpZiAodG9rZW4pIHtcbiAgICBkYXRlID0gbmV3IERhdGUoMCk7XG4gICAgbW9udGggPSBwYXJzZUludCh0b2tlblsxXSwgMTApIC0gMTtcbiAgICBkYXRlLnNldFVUQ0Z1bGxZZWFyKHllYXIsIG1vbnRoKTtcbiAgICByZXR1cm4gZGF0ZTtcbiAgfVxuXG4gIC8vIFlZWVktREREIG9yIFlZWVlERERcbiAgdG9rZW4gPSBwYXR0ZXJucy5EREQuZXhlYyhkYXRlU3RyaW5nKTtcbiAgaWYgKHRva2VuKSB7XG4gICAgZGF0ZSA9IG5ldyBEYXRlKDApO1xuICAgIHZhciBkYXlPZlllYXIgPSBwYXJzZUludCh0b2tlblsxXSwgMTApO1xuICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoeWVhciwgMCwgZGF5T2ZZZWFyKTtcbiAgICByZXR1cm4gZGF0ZTtcbiAgfVxuXG4gIC8vIFlZWVktTU0tREQgb3IgWVlZWU1NRERcbiAgdG9rZW4gPSBwYXR0ZXJucy5NTURELmV4ZWMoZGF0ZVN0cmluZyk7XG4gIGlmICh0b2tlbikge1xuICAgIGRhdGUgPSBuZXcgRGF0ZSgwKTtcbiAgICBtb250aCA9IHBhcnNlSW50KHRva2VuWzFdLCAxMCkgLSAxO1xuICAgIHZhciBkYXkgPSBwYXJzZUludCh0b2tlblsyXSwgMTApO1xuICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoeWVhciwgbW9udGgsIGRheSk7XG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cblxuICAvLyBZWVlZLVd3dyBvciBZWVlZV3d3XG4gIHRva2VuID0gcGF0dGVybnMuV3d3LmV4ZWMoZGF0ZVN0cmluZyk7XG4gIGlmICh0b2tlbikge1xuICAgIHdlZWsgPSBwYXJzZUludCh0b2tlblsxXSwgMTApIC0gMTtcbiAgICByZXR1cm4gZGF5T2ZJU09ZZWFyKHllYXIsIHdlZWspO1xuICB9XG5cbiAgLy8gWVlZWS1Xd3ctRCBvciBZWVlZV3d3RFxuICB0b2tlbiA9IHBhdHRlcm5zLld3d0QuZXhlYyhkYXRlU3RyaW5nKTtcbiAgaWYgKHRva2VuKSB7XG4gICAgd2VlayA9IHBhcnNlSW50KHRva2VuWzFdLCAxMCkgLSAxO1xuICAgIHZhciBkYXlPZldlZWsgPSBwYXJzZUludCh0b2tlblsyXSwgMTApIC0gMTtcbiAgICByZXR1cm4gZGF5T2ZJU09ZZWFyKHllYXIsIHdlZWssIGRheU9mV2Vlayk7XG4gIH1cblxuICAvLyBJbnZhbGlkIElTTy1mb3JtYXR0ZWQgZGF0ZVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gcGFyc2VUaW1lKHRpbWVTdHJpbmcpIHtcbiAgdmFyIHRva2VuO1xuICB2YXIgaG91cnM7XG4gIHZhciBtaW51dGVzO1xuXG4gIC8vIGhoXG4gIHRva2VuID0gcGF0dGVybnMuSEguZXhlYyh0aW1lU3RyaW5nKTtcbiAgaWYgKHRva2VuKSB7XG4gICAgaG91cnMgPSBwYXJzZUZsb2F0KHRva2VuWzFdLnJlcGxhY2UoJywnLCAnLicpKTtcbiAgICByZXR1cm4gaG91cnMgJSAyNCAqIE1JTExJU0VDT05EU19JTl9IT1VSO1xuICB9XG5cbiAgLy8gaGg6bW0gb3IgaGhtbVxuICB0b2tlbiA9IHBhdHRlcm5zLkhITU0uZXhlYyh0aW1lU3RyaW5nKTtcbiAgaWYgKHRva2VuKSB7XG4gICAgaG91cnMgPSBwYXJzZUludCh0b2tlblsxXSwgMTApO1xuICAgIG1pbnV0ZXMgPSBwYXJzZUZsb2F0KHRva2VuWzJdLnJlcGxhY2UoJywnLCAnLicpKTtcbiAgICByZXR1cm4gaG91cnMgJSAyNCAqIE1JTExJU0VDT05EU19JTl9IT1VSICsgbWludXRlcyAqIE1JTExJU0VDT05EU19JTl9NSU5VVEU7XG4gIH1cblxuICAvLyBoaDptbTpzcyBvciBoaG1tc3NcbiAgdG9rZW4gPSBwYXR0ZXJucy5ISE1NU1MuZXhlYyh0aW1lU3RyaW5nKTtcbiAgaWYgKHRva2VuKSB7XG4gICAgaG91cnMgPSBwYXJzZUludCh0b2tlblsxXSwgMTApO1xuICAgIG1pbnV0ZXMgPSBwYXJzZUludCh0b2tlblsyXSwgMTApO1xuICAgIHZhciBzZWNvbmRzID0gcGFyc2VGbG9hdCh0b2tlblszXS5yZXBsYWNlKCcsJywgJy4nKSk7XG4gICAgcmV0dXJuIGhvdXJzICUgMjQgKiBNSUxMSVNFQ09ORFNfSU5fSE9VUiArIG1pbnV0ZXMgKiBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFICsgc2Vjb25kcyAqIDEwMDA7XG4gIH1cblxuICAvLyBJbnZhbGlkIElTTy1mb3JtYXR0ZWQgdGltZVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gcGFyc2VUaW1lem9uZSh0aW1lem9uZVN0cmluZykge1xuICB2YXIgdG9rZW47XG4gIHZhciBhYnNvbHV0ZU9mZnNldDtcblxuICAvLyBaXG4gIHRva2VuID0gcGF0dGVybnMudGltZXpvbmVaLmV4ZWModGltZXpvbmVTdHJpbmcpO1xuICBpZiAodG9rZW4pIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIC8vIMKxaGhcbiAgdG9rZW4gPSBwYXR0ZXJucy50aW1lem9uZUhILmV4ZWModGltZXpvbmVTdHJpbmcpO1xuICBpZiAodG9rZW4pIHtcbiAgICBhYnNvbHV0ZU9mZnNldCA9IHBhcnNlSW50KHRva2VuWzJdLCAxMCkgKiA2MDtcbiAgICByZXR1cm4gdG9rZW5bMV0gPT09ICcrJyA/IC1hYnNvbHV0ZU9mZnNldCA6IGFic29sdXRlT2Zmc2V0O1xuICB9XG5cbiAgLy8gwrFoaDptbSBvciDCsWhobW1cbiAgdG9rZW4gPSBwYXR0ZXJucy50aW1lem9uZUhITU0uZXhlYyh0aW1lem9uZVN0cmluZyk7XG4gIGlmICh0b2tlbikge1xuICAgIGFic29sdXRlT2Zmc2V0ID0gcGFyc2VJbnQodG9rZW5bMl0sIDEwKSAqIDYwICsgcGFyc2VJbnQodG9rZW5bM10sIDEwKTtcbiAgICByZXR1cm4gdG9rZW5bMV0gPT09ICcrJyA/IC1hYnNvbHV0ZU9mZnNldCA6IGFic29sdXRlT2Zmc2V0O1xuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbmZ1bmN0aW9uIGRheU9mSVNPWWVhcihpc29ZZWFyLCB3ZWVrLCBkYXkpIHtcbiAgd2VlayA9IHdlZWsgfHwgMDtcbiAgZGF5ID0gZGF5IHx8IDA7XG4gIHZhciBkYXRlID0gbmV3IERhdGUoMCk7XG4gIGRhdGUuc2V0VVRDRnVsbFllYXIoaXNvWWVhciwgMCwgNCk7XG4gIHZhciBmb3VydGhPZkphbnVhcnlEYXkgPSBkYXRlLmdldFVUQ0RheSgpIHx8IDc7XG4gIHZhciBkaWZmID0gd2VlayAqIDcgKyBkYXkgKyAxIC0gZm91cnRoT2ZKYW51YXJ5RGF5O1xuICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgKyBkaWZmKTtcbiAgcmV0dXJuIGRhdGU7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIoZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgICAgIGRlZmluZShbXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gTm9kZS4gRG9lcyBub3Qgd29yayB3aXRoIHN0cmljdCBDb21tb25KUywgYnV0XG4gICAgICAgIC8vIG9ubHkgQ29tbW9uSlMtbGlrZSBlbnZpcm9ubWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLFxuICAgICAgICAvLyBsaWtlIE5vZGUuXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFscyAocm9vdCBpcyB3aW5kb3cpXG4gICAgICAgIHJvb3QuU3RyaW5nTWFzayA9IGZhY3RvcnkoKTtcbiAgICB9XG59KHRoaXMsIGZ1bmN0aW9uKCkge1xuICAgIHZhciB0b2tlbnMgPSB7XG4gICAgICAgICcwJzoge3BhdHRlcm46IC9cXGQvLCBfZGVmYXVsdDogJzAnfSxcbiAgICAgICAgJzknOiB7cGF0dGVybjogL1xcZC8sIG9wdGlvbmFsOiB0cnVlfSxcbiAgICAgICAgJyMnOiB7cGF0dGVybjogL1xcZC8sIG9wdGlvbmFsOiB0cnVlLCByZWN1cnNpdmU6IHRydWV9LFxuICAgICAgICAnQSc6IHtwYXR0ZXJuOiAvW2EtekEtWjAtOV0vfSxcbiAgICAgICAgJ1MnOiB7cGF0dGVybjogL1thLXpBLVpdL30sXG4gICAgICAgICdVJzoge3BhdHRlcm46IC9bYS16QS1aXS8sIHRyYW5zZm9ybTogZnVuY3Rpb24oYykgeyByZXR1cm4gYy50b0xvY2FsZVVwcGVyQ2FzZSgpOyB9fSxcbiAgICAgICAgJ0wnOiB7cGF0dGVybjogL1thLXpBLVpdLywgdHJhbnNmb3JtOiBmdW5jdGlvbihjKSB7IHJldHVybiBjLnRvTG9jYWxlTG93ZXJDYXNlKCk7IH19LFxuICAgICAgICAnJCc6IHtlc2NhcGU6IHRydWV9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGlzRXNjYXBlZChwYXR0ZXJuLCBwb3MpIHtcbiAgICAgICAgdmFyIGNvdW50ID0gMDtcbiAgICAgICAgdmFyIGkgPSBwb3MgLSAxO1xuICAgICAgICB2YXIgdG9rZW4gPSB7ZXNjYXBlOiB0cnVlfTtcbiAgICAgICAgd2hpbGUgKGkgPj0gMCAmJiB0b2tlbiAmJiB0b2tlbi5lc2NhcGUpIHtcbiAgICAgICAgICAgIHRva2VuID0gdG9rZW5zW3BhdHRlcm4uY2hhckF0KGkpXTtcbiAgICAgICAgICAgIGNvdW50ICs9IHRva2VuICYmIHRva2VuLmVzY2FwZSA/IDEgOiAwO1xuICAgICAgICAgICAgaS0tO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb3VudCA+IDAgJiYgY291bnQgJSAyID09PSAxO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGNPcHRpb25hbE51bWJlcnNUb1VzZShwYXR0ZXJuLCB2YWx1ZSkge1xuICAgICAgICB2YXIgbnVtYmVyc0luUCA9IHBhdHRlcm4ucmVwbGFjZSgvW14wXS9nLCcnKS5sZW5ndGg7XG4gICAgICAgIHZhciBudW1iZXJzSW5WID0gdmFsdWUucmVwbGFjZSgvW15cXGRdL2csJycpLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIG51bWJlcnNJblYgLSBudW1iZXJzSW5QO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbmNhdENoYXIodGV4dCwgY2hhcmFjdGVyLCBvcHRpb25zLCB0b2tlbikge1xuICAgICAgICBpZiAodG9rZW4gJiYgdHlwZW9mIHRva2VuLnRyYW5zZm9ybSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2hhcmFjdGVyID0gdG9rZW4udHJhbnNmb3JtKGNoYXJhY3Rlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMucmV2ZXJzZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNoYXJhY3RlciArIHRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRleHQgKyBjaGFyYWN0ZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFzTW9yZVRva2VucyhwYXR0ZXJuLCBwb3MsIGluYykge1xuICAgICAgICB2YXIgcGMgPSBwYXR0ZXJuLmNoYXJBdChwb3MpO1xuICAgICAgICB2YXIgdG9rZW4gPSB0b2tlbnNbcGNdO1xuICAgICAgICBpZiAocGMgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRva2VuICYmICF0b2tlbi5lc2NhcGUgPyB0cnVlIDogaGFzTW9yZVRva2VucyhwYXR0ZXJuLCBwb3MgKyBpbmMsIGluYyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFzTW9yZVJlY3Vyc2l2ZVRva2VucyhwYXR0ZXJuLCBwb3MsIGluYykge1xuICAgICAgICB2YXIgcGMgPSBwYXR0ZXJuLmNoYXJBdChwb3MpO1xuICAgICAgICB2YXIgdG9rZW4gPSB0b2tlbnNbcGNdO1xuICAgICAgICBpZiAocGMgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRva2VuICYmIHRva2VuLnJlY3Vyc2l2ZSA/IHRydWUgOiBoYXNNb3JlUmVjdXJzaXZlVG9rZW5zKHBhdHRlcm4sIHBvcyArIGluYywgaW5jKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnNlcnRDaGFyKHRleHQsIGNoYXIsIHBvc2l0aW9uKSB7XG4gICAgICAgIHZhciB0ID0gdGV4dC5zcGxpdCgnJyk7XG4gICAgICAgIHQuc3BsaWNlKHBvc2l0aW9uLCAwLCBjaGFyKTtcbiAgICAgICAgcmV0dXJuIHQuam9pbignJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gU3RyaW5nTWFzayhwYXR0ZXJuLCBvcHQpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0IHx8IHt9O1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICAgICAgICByZXZlcnNlOiB0aGlzLm9wdGlvbnMucmV2ZXJzZSB8fCBmYWxzZSxcbiAgICAgICAgICAgIHVzZWRlZmF1bHRzOiB0aGlzLm9wdGlvbnMudXNlZGVmYXVsdHMgfHwgdGhpcy5vcHRpb25zLnJldmVyc2VcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wYXR0ZXJuID0gcGF0dGVybjtcbiAgICB9XG5cbiAgICBTdHJpbmdNYXNrLnByb3RvdHlwZS5wcm9jZXNzID0gZnVuY3Rpb24gcHJvY2Nlc3ModmFsdWUpIHtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHtyZXN1bHQ6ICcnLCB2YWxpZDogZmFsc2V9O1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlID0gdmFsdWUgKyAnJztcbiAgICAgICAgdmFyIHBhdHRlcm4yID0gdGhpcy5wYXR0ZXJuO1xuICAgICAgICB2YXIgdmFsaWQgPSB0cnVlO1xuICAgICAgICB2YXIgZm9ybWF0dGVkID0gJyc7XG4gICAgICAgIHZhciB2YWx1ZVBvcyA9IHRoaXMub3B0aW9ucy5yZXZlcnNlID8gdmFsdWUubGVuZ3RoIC0gMSA6IDA7XG4gICAgICAgIHZhciBwYXR0ZXJuUG9zID0gMDtcbiAgICAgICAgdmFyIG9wdGlvbmFsTnVtYmVyc1RvVXNlID0gY2FsY09wdGlvbmFsTnVtYmVyc1RvVXNlKHBhdHRlcm4yLCB2YWx1ZSk7XG4gICAgICAgIHZhciBlc2NhcGVOZXh0ID0gZmFsc2U7XG4gICAgICAgIHZhciByZWN1cnNpdmUgPSBbXTtcbiAgICAgICAgdmFyIGluUmVjdXJzaXZlTW9kZSA9IGZhbHNlO1xuXG4gICAgICAgIHZhciBzdGVwcyA9IHtcbiAgICAgICAgICAgIHN0YXJ0OiB0aGlzLm9wdGlvbnMucmV2ZXJzZSA/IHBhdHRlcm4yLmxlbmd0aCAtIDEgOiAwLFxuICAgICAgICAgICAgZW5kOiB0aGlzLm9wdGlvbnMucmV2ZXJzZSA/IC0xIDogcGF0dGVybjIubGVuZ3RoLFxuICAgICAgICAgICAgaW5jOiB0aGlzLm9wdGlvbnMucmV2ZXJzZSA/IC0xIDogMVxuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIGNvbnRpbnVlQ29uZGl0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmICghaW5SZWN1cnNpdmVNb2RlICYmICFyZWN1cnNpdmUubGVuZ3RoICYmIGhhc01vcmVUb2tlbnMocGF0dGVybjIsIHBhdHRlcm5Qb3MsIHN0ZXBzLmluYykpIHtcbiAgICAgICAgICAgICAgICAvLyBjb250aW51ZSBpbiB0aGUgbm9ybWFsIGl0ZXJhdGlvblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghaW5SZWN1cnNpdmVNb2RlICYmIHJlY3Vyc2l2ZS5sZW5ndGggJiZcbiAgICAgICAgICAgICAgICBoYXNNb3JlUmVjdXJzaXZlVG9rZW5zKHBhdHRlcm4yLCBwYXR0ZXJuUG9zLCBzdGVwcy5pbmMpKSB7XG4gICAgICAgICAgICAgICAgLy8gY29udGludWUgbG9va2luZyBmb3IgdGhlIHJlY3Vyc2l2ZSB0b2tlbnNcbiAgICAgICAgICAgICAgICAvLyBOb3RlOiBhbGwgY2hhcnMgaW4gdGhlIHBhdHRlcm5zIGFmdGVyIHRoZSByZWN1cnNpdmUgcG9ydGlvbiB3aWxsIGJlIGhhbmRsZWQgYXMgc3RhdGljIHN0cmluZ1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghaW5SZWN1cnNpdmVNb2RlKSB7XG4gICAgICAgICAgICAgICAgLy8gc3RhcnQgdG8gaGFuZGxlIHRoZSByZWN1cnNpdmUgcG9ydGlvbiBvZiB0aGUgcGF0dGVyblxuICAgICAgICAgICAgICAgIGluUmVjdXJzaXZlTW9kZSA9IHJlY3Vyc2l2ZS5sZW5ndGggPiAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaW5SZWN1cnNpdmVNb2RlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBjID0gcmVjdXJzaXZlLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgcmVjdXJzaXZlLnB1c2gocGMpO1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnJldmVyc2UgJiYgdmFsdWVQb3MgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuUG9zKys7XG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm4yID0gaW5zZXJ0Q2hhcihwYXR0ZXJuMiwgcGMsIHBhdHRlcm5Qb3MpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFvcHRpb25zLnJldmVyc2UgJiYgdmFsdWVQb3MgPCB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjIgPSBpbnNlcnRDaGFyKHBhdHRlcm4yLCBwYywgcGF0dGVyblBvcyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwYXR0ZXJuUG9zIDwgcGF0dGVybjIubGVuZ3RoICYmIHBhdHRlcm5Qb3MgPj0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJdGVyYXRlIG92ZXIgdGhlIHBhdHRlcm4ncyBjaGFycyBwYXJzaW5nL21hdGNoaW5nIHRoZSBpbnB1dCB2YWx1ZSBjaGFyc1xuICAgICAgICAgKiB1bnRpbCB0aGUgZW5kIG9mIHRoZSBwYXR0ZXJuLiBJZiB0aGUgcGF0dGVybiBlbmRzIHdpdGggcmVjdXJzaXZlIGNoYXJzXG4gICAgICAgICAqIHRoZSBpdGVyYXRpb24gd2lsbCBjb250aW51ZSB1bnRpbCB0aGUgZW5kIG9mIHRoZSBpbnB1dCB2YWx1ZS5cbiAgICAgICAgICpcbiAgICAgICAgICogTm90ZTogVGhlIGl0ZXJhdGlvbiBtdXN0IHN0b3AgaWYgYW4gaW52YWxpZCBjaGFyIGlzIGZvdW5kLlxuICAgICAgICAgKi9cbiAgICAgICAgZm9yIChwYXR0ZXJuUG9zID0gc3RlcHMuc3RhcnQ7IGNvbnRpbnVlQ29uZGl0aW9uKHRoaXMub3B0aW9ucyk7IHBhdHRlcm5Qb3MgPSBwYXR0ZXJuUG9zICsgc3RlcHMuaW5jKSB7XG4gICAgICAgICAgICAvLyBWYWx1ZSBjaGFyXG4gICAgICAgICAgICB2YXIgdmMgPSB2YWx1ZS5jaGFyQXQodmFsdWVQb3MpO1xuICAgICAgICAgICAgLy8gUGF0dGVybiBjaGFyIHRvIG1hdGNoIHdpdGggdGhlIHZhbHVlIGNoYXJcbiAgICAgICAgICAgIHZhciBwYyA9IHBhdHRlcm4yLmNoYXJBdChwYXR0ZXJuUG9zKTtcblxuICAgICAgICAgICAgdmFyIHRva2VuID0gdG9rZW5zW3BjXTtcbiAgICAgICAgICAgIGlmIChyZWN1cnNpdmUubGVuZ3RoICYmIHRva2VuICYmICF0b2tlbi5yZWN1cnNpdmUpIHtcbiAgICAgICAgICAgICAgICAvLyBJbiB0aGUgcmVjdXJzaXZlIHBvcnRpb24gb2YgdGhlIHBhdHRlcm46IHRva2VucyBub3QgcmVjdXJzaXZlIG11c3QgYmUgc2VlbiBhcyBzdGF0aWMgY2hhcnNcbiAgICAgICAgICAgICAgICB0b2tlbiA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIDEuIEhhbmRsZSBlc2NhcGUgdG9rZW5zIGluIHBhdHRlcm5cbiAgICAgICAgICAgIC8vIGdvIHRvIG5leHQgaXRlcmF0aW9uOiBpZiB0aGUgcGF0dGVybiBjaGFyIGlzIGEgZXNjYXBlIGNoYXIgb3Igd2FzIGVzY2FwZWRcbiAgICAgICAgICAgIGlmICghaW5SZWN1cnNpdmVNb2RlIHx8IHZjKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5yZXZlcnNlICYmIGlzRXNjYXBlZChwYXR0ZXJuMiwgcGF0dGVyblBvcykpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcGF0dGVybiBjaGFyIGlzIGVzY2FwZWQsIGp1c3QgYWRkIGl0IGFuZCBtb3ZlIG9uXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZCA9IGNvbmNhdENoYXIoZm9ybWF0dGVkLCBwYywgdGhpcy5vcHRpb25zLCB0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNraXAgZXNjYXBlIHRva2VuXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm5Qb3MgPSBwYXR0ZXJuUG9zICsgc3RlcHMuaW5jO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLm9wdGlvbnMucmV2ZXJzZSAmJiBlc2NhcGVOZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHBhdHRlcm4gY2hhciBpcyBlc2NhcGVkLCBqdXN0IGFkZCBpdCBhbmQgbW92ZSBvblxuICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWQgPSBjb25jYXRDaGFyKGZvcm1hdHRlZCwgcGMsIHRoaXMub3B0aW9ucywgdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICBlc2NhcGVOZXh0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMub3B0aW9ucy5yZXZlcnNlICYmIHRva2VuICYmIHRva2VuLmVzY2FwZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBtYXJrIHRvIGVzY2FwZSB0aGUgbmV4dCBwYXR0ZXJuIGNoYXJcbiAgICAgICAgICAgICAgICAgICAgZXNjYXBlTmV4dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gMi4gSGFuZGxlIHJlY3Vyc2l2ZSB0b2tlbnMgaW4gcGF0dGVyblxuICAgICAgICAgICAgLy8gZ28gdG8gbmV4dCBpdGVyYXRpb246IGlmIHRoZSB2YWx1ZSBzdHIgaXMgZmluaXNoZWQgb3JcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICBpZiB0aGVyZSBpcyBhIG5vcm1hbCB0b2tlbiBpbiB0aGUgcmVjdXJzaXZlIHBvcnRpb24gb2YgdGhlIHBhdHRlcm5cbiAgICAgICAgICAgIGlmICghaW5SZWN1cnNpdmVNb2RlICYmIHRva2VuICYmIHRva2VuLnJlY3Vyc2l2ZSkge1xuICAgICAgICAgICAgICAgIC8vIHNhdmUgaXQgdG8gcmVwZWF0IGluIHRoZSBlbmQgb2YgdGhlIHBhdHRlcm4gYW5kIGhhbmRsZSB0aGUgdmFsdWUgY2hhciBub3dcbiAgICAgICAgICAgICAgICByZWN1cnNpdmUucHVzaChwYyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluUmVjdXJzaXZlTW9kZSAmJiAhdmMpIHtcbiAgICAgICAgICAgICAgICAvLyBpbiByZWN1cnNpdmUgbW9kZSBidXQgdmFsdWUgaXMgZmluaXNoZWQuIEFkZCB0aGUgcGF0dGVybiBjaGFyIGlmIGl0IGlzIG5vdCBhIHJlY3Vyc2l2ZSB0b2tlblxuICAgICAgICAgICAgICAgIGZvcm1hdHRlZCA9IGNvbmNhdENoYXIoZm9ybWF0dGVkLCBwYywgdGhpcy5vcHRpb25zLCB0b2tlbik7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFpblJlY3Vyc2l2ZU1vZGUgJiYgcmVjdXJzaXZlLmxlbmd0aCA+IDAgJiYgIXZjKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVjdXJzaXZlTW9kZSBub3Qgc3RhcnRlZCBidXQgYWxyZWFkeSBpbiB0aGUgcmVjdXJzaXZlIHBvcnRpb24gb2YgdGhlIHBhdHRlcm5cbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gMy4gSGFuZGxlIHRoZSB2YWx1ZVxuICAgICAgICAgICAgLy8gYnJlYWsgaXRlcmF0aW9uczogaWYgdmFsdWUgaXMgaW52YWxpZCBmb3IgdGhlIGdpdmVuIHBhdHRlcm5cbiAgICAgICAgICAgIGlmICghdG9rZW4pIHtcbiAgICAgICAgICAgICAgICAvLyBhZGQgY2hhciBvZiB0aGUgcGF0dGVyblxuICAgICAgICAgICAgICAgIGZvcm1hdHRlZCA9IGNvbmNhdENoYXIoZm9ybWF0dGVkLCBwYywgdGhpcy5vcHRpb25zLCB0b2tlbik7XG4gICAgICAgICAgICAgICAgaWYgKCFpblJlY3Vyc2l2ZU1vZGUgJiYgcmVjdXJzaXZlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBzYXZlIGl0IHRvIHJlcGVhdCBpbiB0aGUgZW5kIG9mIHRoZSBwYXR0ZXJuXG4gICAgICAgICAgICAgICAgICAgIHJlY3Vyc2l2ZS5wdXNoKHBjKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRva2VuLm9wdGlvbmFsKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdG9rZW4gaXMgb3B0aW9uYWwsIG9ubHkgYWRkIHRoZSB2YWx1ZSBjaGFyIGlmIGl0IG1hdGNocyB0aGUgdG9rZW4gcGF0dGVyblxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICBpZiBub3QsIG1vdmUgb24gdG8gdGhlIG5leHQgcGF0dGVybiBjaGFyXG4gICAgICAgICAgICAgICAgaWYgKHRva2VuLnBhdHRlcm4udGVzdCh2YykgJiYgb3B0aW9uYWxOdW1iZXJzVG9Vc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkID0gY29uY2F0Q2hhcihmb3JtYXR0ZWQsIHZjLCB0aGlzLm9wdGlvbnMsIHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVQb3MgPSB2YWx1ZVBvcyArIHN0ZXBzLmluYztcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWxOdW1iZXJzVG9Vc2UtLTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlY3Vyc2l2ZS5sZW5ndGggPiAwICYmIHZjKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodG9rZW4ucGF0dGVybi50ZXN0KHZjKSkge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRva2VuIGlzbid0IG9wdGlvbmFsIHRoZSB2YWx1ZSBjaGFyIG11c3QgbWF0Y2ggdGhlIHRva2VuIHBhdHRlcm5cbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWQgPSBjb25jYXRDaGFyKGZvcm1hdHRlZCwgdmMsIHRoaXMub3B0aW9ucywgdG9rZW4pO1xuICAgICAgICAgICAgICAgIHZhbHVlUG9zID0gdmFsdWVQb3MgKyBzdGVwcy5pbmM7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCF2YyAmJiB0b2tlbi5fZGVmYXVsdCAmJiB0aGlzLm9wdGlvbnMudXNlZGVmYXVsdHMpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgdG9rZW4gaXNuJ3Qgb3B0aW9uYWwgYW5kIGhhcyBhIGRlZmF1bHQgdmFsdWUsIHVzZSBpdCBpZiB0aGUgdmFsdWUgaXMgZmluaXNoZWRcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWQgPSBjb25jYXRDaGFyKGZvcm1hdHRlZCwgdG9rZW4uX2RlZmF1bHQsIHRoaXMub3B0aW9ucywgdG9rZW4pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyB0aGUgc3RyaW5nIHZhbHVlIGRvbid0IG1hdGNoIHRoZSBnaXZlbiBwYXR0ZXJuXG4gICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7cmVzdWx0OiBmb3JtYXR0ZWQsIHZhbGlkOiB2YWxpZH07XG4gICAgfTtcblxuICAgIFN0cmluZ01hc2sucHJvdG90eXBlLmFwcGx5ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzcyh2YWx1ZSkucmVzdWx0O1xuICAgIH07XG5cbiAgICBTdHJpbmdNYXNrLnByb3RvdHlwZS52YWxpZGF0ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3ModmFsdWUpLnZhbGlkO1xuICAgIH07XG5cbiAgICBTdHJpbmdNYXNrLnByb2Nlc3MgPSBmdW5jdGlvbih2YWx1ZSwgcGF0dGVybiwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbmV3IFN0cmluZ01hc2socGF0dGVybiwgb3B0aW9ucykucHJvY2Vzcyh2YWx1ZSk7XG4gICAgfTtcblxuICAgIFN0cmluZ01hc2suYXBwbHkgPSBmdW5jdGlvbih2YWx1ZSwgcGF0dGVybiwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbmV3IFN0cmluZ01hc2socGF0dGVybiwgb3B0aW9ucykuYXBwbHkodmFsdWUpO1xuICAgIH07XG5cbiAgICBTdHJpbmdNYXNrLnZhbGlkYXRlID0gZnVuY3Rpb24odmFsdWUsIHBhdHRlcm4sIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdHJpbmdNYXNrKHBhdHRlcm4sIG9wdGlvbnMpLnZhbGlkYXRlKHZhbHVlKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFN0cmluZ01hc2s7XG59KSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhci5tb2R1bGUoJ3VpLnV0aWxzLm1hc2tzJywgW1xuXHRyZXF1aXJlKCcuL2dsb2JhbC9nbG9iYWwtbWFza3MnKSxcblx0cmVxdWlyZSgnLi9ici9ici1tYXNrcycpLFxuXHRyZXF1aXJlKCcuL2NoL2NoLW1hc2tzJyksXG5cdHJlcXVpcmUoJy4vZnIvZnItbWFza3MnKSxcblx0cmVxdWlyZSgnLi91cy91cy1tYXNrcycpXG5dKS5uYW1lO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgU3RyaW5nTWFzayA9IHJlcXVpcmUoJ3N0cmluZy1tYXNrJyk7XG52YXIgbWFza0ZhY3RvcnkgPSByZXF1aXJlKCcuLi8uLi9oZWxwZXJzL21hc2stZmFjdG9yeScpO1xuXG52YXIgYm9sZXRvQmFuY2FyaW9NYXNrID0gbmV3IFN0cmluZ01hc2soJzAwMDAwLjAwMDAwIDAwMDAwLjAwMDAwMCAwMDAwMC4wMDAwMDAgMCAwMDAwMDAwMDAwMDAwMCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1hc2tGYWN0b3J5KHtcblx0Y2xlYXJWYWx1ZTogZnVuY3Rpb24ocmF3VmFsdWUpIHtcblx0XHRyZXR1cm4gcmF3VmFsdWUucmVwbGFjZSgvW14wLTldL2csICcnKS5zbGljZSgwLCA0Nyk7XG5cdH0sXG5cdGZvcm1hdDogZnVuY3Rpb24oY2xlYW5WYWx1ZSkge1xuXHRcdGlmIChjbGVhblZhbHVlLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0cmV0dXJuIGNsZWFuVmFsdWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGJvbGV0b0JhbmNhcmlvTWFzay5hcHBseShjbGVhblZhbHVlKS5yZXBsYWNlKC9bXjAtOV0kLywgJycpO1xuXHR9LFxuXHR2YWxpZGF0aW9uczoge1xuXHRcdGJyQm9sZXRvQmFuY2FyaW86IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gdmFsdWUubGVuZ3RoID09PSA0Nztcblx0XHR9XG5cdH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbSA9IGFuZ3VsYXIubW9kdWxlKCd1aS51dGlscy5tYXNrcy5icicsIFtdKVxuXHQuZGlyZWN0aXZlKCd1aUJyQm9sZXRvQmFuY2FyaW9NYXNrJywgcmVxdWlyZSgnLi9ib2xldG8tYmFuY2FyaW8vYm9sZXRvLWJhbmNhcmlvJykpXG5cdC5kaXJlY3RpdmUoJ3VpQnJDYXJQbGF0ZU1hc2snLCByZXF1aXJlKCcuL2Nhci1wbGF0ZS9jYXItcGxhdGUnKSlcblx0LmRpcmVjdGl2ZSgndWlCckNlcE1hc2snLCByZXF1aXJlKCcuL2NlcC9jZXAnKSlcblx0LmRpcmVjdGl2ZSgndWlCckNucGpNYXNrJywgcmVxdWlyZSgnLi9jbnBqL2NucGonKSlcblx0LmRpcmVjdGl2ZSgndWlCckNwZk1hc2snLCByZXF1aXJlKCcuL2NwZi9jcGYnKSlcblx0LmRpcmVjdGl2ZSgndWlCckNwZmNucGpNYXNrJywgcmVxdWlyZSgnLi9jcGYtY25wai9jcGYtY25waicpKVxuXHQuZGlyZWN0aXZlKCd1aUJySWVNYXNrJywgcmVxdWlyZSgnLi9pbnNjcmljYW8tZXN0YWR1YWwvaWUnKSlcblx0LmRpcmVjdGl2ZSgndWlOZmVBY2Nlc3NLZXlNYXNrJywgcmVxdWlyZSgnLi9uZmUvbmZlJykpXG5cdC5kaXJlY3RpdmUoJ3VpQnJQaG9uZU51bWJlck1hc2snLCByZXF1aXJlKCcuL3Bob25lL2JyLXBob25lJykpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG0ubmFtZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFN0cmluZ01hc2sgPSByZXF1aXJlKCdzdHJpbmctbWFzaycpO1xudmFyIG1hc2tGYWN0b3J5ID0gcmVxdWlyZSgnLi4vLi4vaGVscGVycy9tYXNrLWZhY3RvcnknKTtcblxudmFyIGNhclBsYXRlTWFzayA9IG5ldyBTdHJpbmdNYXNrKCdVVVUtMDAwMCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1hc2tGYWN0b3J5KHtcblx0Y2xlYXJWYWx1ZTogZnVuY3Rpb24ocmF3VmFsdWUpIHtcblx0XHRyZXR1cm4gcmF3VmFsdWUucmVwbGFjZSgvW15hLXpBLVowLTldL2csICcnKS5zbGljZSgwLCA3KTtcblx0fSxcblx0Zm9ybWF0OiBmdW5jdGlvbihjbGVhblZhbHVlKSB7XG5cdFx0cmV0dXJuIChjYXJQbGF0ZU1hc2suYXBwbHkoY2xlYW5WYWx1ZSkgfHwgJycpLnJlcGxhY2UoL1teYS16QS1aMC05XSQvLCAnJyk7XG5cdH0sXG5cdHZhbGlkYXRpb25zOiB7XG5cdFx0Y2FyUGxhdGU6IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gdmFsdWUubGVuZ3RoID09PSA3O1xuXHRcdH1cblx0fVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBTdHJpbmdNYXNrID0gcmVxdWlyZSgnc3RyaW5nLW1hc2snKTtcbnZhciBtYXNrRmFjdG9yeSA9IHJlcXVpcmUoJy4uLy4uL2hlbHBlcnMvbWFzay1mYWN0b3J5Jyk7XG5cbnZhciBjZXBNYXNrID0gbmV3IFN0cmluZ01hc2soJzAwMDAwLTAwMCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1hc2tGYWN0b3J5KHtcblx0Y2xlYXJWYWx1ZTogZnVuY3Rpb24ocmF3VmFsdWUpIHtcblx0XHRyZXR1cm4gcmF3VmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKC9bXjAtOV0vZywgJycpLnNsaWNlKDAsIDgpO1xuXHR9LFxuXHRmb3JtYXQ6IGZ1bmN0aW9uKGNsZWFuVmFsdWUpIHtcblx0XHRyZXR1cm4gKGNlcE1hc2suYXBwbHkoY2xlYW5WYWx1ZSkgfHwgJycpLnJlcGxhY2UoL1teMC05XSQvLCAnJyk7XG5cdH0sXG5cdHZhbGlkYXRpb25zOiB7XG5cdFx0Y2VwOiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCA9PT0gODtcblx0XHR9XG5cdH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgU3RyaW5nTWFzayA9IHJlcXVpcmUoJ3N0cmluZy1tYXNrJyk7XG52YXIgQnJWID0gcmVxdWlyZSgnYnItdmFsaWRhdGlvbnMnKTtcblxudmFyIG1hc2tGYWN0b3J5ID0gcmVxdWlyZSgnLi4vLi4vaGVscGVycy9tYXNrLWZhY3RvcnknKTtcblxudmFyIGNucGpQYXR0ZXJuID0gbmV3IFN0cmluZ01hc2soJzAwLjAwMC4wMDBcXC8wMDAwLTAwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbWFza0ZhY3Rvcnkoe1xuXHRjbGVhclZhbHVlOiBmdW5jdGlvbihyYXdWYWx1ZSkge1xuXHRcdHJldHVybiByYXdWYWx1ZS5yZXBsYWNlKC9bXlxcZF0vZywgJycpLnNsaWNlKDAsIDE0KTtcblx0fSxcblx0Zm9ybWF0OiBmdW5jdGlvbihjbGVhblZhbHVlKSB7XG5cdFx0cmV0dXJuIChjbnBqUGF0dGVybi5hcHBseShjbGVhblZhbHVlKSB8fCAnJykudHJpbSgpLnJlcGxhY2UoL1teMC05XSQvLCAnJyk7XG5cdH0sXG5cdHZhbGlkYXRpb25zOiB7XG5cdFx0Y25wajogZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdHJldHVybiBCclYuY25wai52YWxpZGF0ZSh2YWx1ZSk7XG5cdFx0fVxuXHR9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFN0cmluZ01hc2sgPSByZXF1aXJlKCdzdHJpbmctbWFzaycpO1xudmFyIEJyViA9IHJlcXVpcmUoJ2JyLXZhbGlkYXRpb25zJyk7XG52YXIgbWFza0ZhY3RvcnkgPSByZXF1aXJlKCcuLi8uLi9oZWxwZXJzL21hc2stZmFjdG9yeScpO1xuXG52YXIgY25walBhdHRlcm4gPSBuZXcgU3RyaW5nTWFzaygnMDAuMDAwLjAwMFxcLzAwMDAtMDAnKTtcbnZhciBjcGZQYXR0ZXJuID0gbmV3IFN0cmluZ01hc2soJzAwMC4wMDAuMDAwLTAwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbWFza0ZhY3Rvcnkoe1xuXHRjbGVhclZhbHVlOiBmdW5jdGlvbihyYXdWYWx1ZSkge1xuXHRcdHJldHVybiByYXdWYWx1ZS5yZXBsYWNlKC9bXlxcZF0vZywgJycpLnNsaWNlKDAsIDE0KTtcblx0fSxcblx0Zm9ybWF0OiBmdW5jdGlvbihjbGVhblZhbHVlKSB7XG5cdFx0dmFyIGZvcm1hdGVkVmFsdWU7XG5cblx0XHRpZiAoY2xlYW5WYWx1ZS5sZW5ndGggPiAxMSkge1xuXHRcdFx0Zm9ybWF0ZWRWYWx1ZSA9IGNucGpQYXR0ZXJuLmFwcGx5KGNsZWFuVmFsdWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3JtYXRlZFZhbHVlID0gY3BmUGF0dGVybi5hcHBseShjbGVhblZhbHVlKSB8fCAnJztcblx0XHR9XG5cblx0XHRyZXR1cm4gZm9ybWF0ZWRWYWx1ZS50cmltKCkucmVwbGFjZSgvW14wLTldJC8sICcnKTtcblx0fSxcblx0dmFsaWRhdGlvbnM6IHtcblx0XHRjcGY6IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gdmFsdWUubGVuZ3RoID4gMTEgfHwgQnJWLmNwZi52YWxpZGF0ZSh2YWx1ZSk7XG5cdFx0fSxcblx0XHRjbnBqOiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCA8PSAxMSB8fCBCclYuY25wai52YWxpZGF0ZSh2YWx1ZSk7XG5cdFx0fVxuXHR9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFN0cmluZ01hc2sgPSByZXF1aXJlKCdzdHJpbmctbWFzaycpO1xudmFyIEJyViA9IHJlcXVpcmUoJ2JyLXZhbGlkYXRpb25zJyk7XG5cbnZhciBtYXNrRmFjdG9yeSA9IHJlcXVpcmUoJy4uLy4uL2hlbHBlcnMvbWFzay1mYWN0b3J5Jyk7XG5cbnZhciBjcGZQYXR0ZXJuID0gbmV3IFN0cmluZ01hc2soJzAwMC4wMDAuMDAwLTAwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbWFza0ZhY3Rvcnkoe1xuXHRjbGVhclZhbHVlOiBmdW5jdGlvbihyYXdWYWx1ZSkge1xuXHRcdHJldHVybiByYXdWYWx1ZS5yZXBsYWNlKC9bXlxcZF0vZywgJycpLnNsaWNlKDAsIDExKTtcblx0fSxcblx0Zm9ybWF0OiBmdW5jdGlvbihjbGVhblZhbHVlKSB7XG5cdFx0cmV0dXJuIChjcGZQYXR0ZXJuLmFwcGx5KGNsZWFuVmFsdWUpIHx8ICcnKS50cmltKCkucmVwbGFjZSgvW14wLTldJC8sICcnKTtcblx0fSxcblx0dmFsaWRhdGlvbnM6IHtcblx0XHRjcGY6IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gQnJWLmNwZi52YWxpZGF0ZSh2YWx1ZSk7XG5cdFx0fVxuXHR9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFN0cmluZ01hc2sgPSByZXF1aXJlKCdzdHJpbmctbWFzaycpO1xudmFyIEJyViA9IHJlcXVpcmUoJ2JyLXZhbGlkYXRpb25zJyk7XG5cbnZhciBpZU1hc2tzID0ge1xuXHQnQUMnOiBbe21hc2s6IG5ldyBTdHJpbmdNYXNrKCcwMC4wMDAuMDAwLzAwMC0wMCcpfV0sXG5cdCdBTCc6IFt7bWFzazogbmV3IFN0cmluZ01hc2soJzAwMDAwMDAwMCcpfV0sXG5cdCdBTSc6IFt7bWFzazogbmV3IFN0cmluZ01hc2soJzAwLjAwMC4wMDAtMCcpfV0sXG5cdCdBUCc6IFt7bWFzazogbmV3IFN0cmluZ01hc2soJzAwMDAwMDAwMCcpfV0sXG5cdCdCQSc6IFt7Y2hhcnM6IDgsIG1hc2s6IG5ldyBTdHJpbmdNYXNrKCcwMDAwMDAtMDAnKX0sIHttYXNrOiBuZXcgU3RyaW5nTWFzaygnMDAwMDAwMC0wMCcpfV0sXG5cdCdDRSc6IFt7bWFzazogbmV3IFN0cmluZ01hc2soJzAwMDAwMDAwLTAnKX1dLFxuXHQnREYnOiBbe21hc2s6IG5ldyBTdHJpbmdNYXNrKCcwMDAwMDAwMDAwMC0wMCcpfV0sXG5cdCdFUyc6IFt7bWFzazogbmV3IFN0cmluZ01hc2soJzAwMDAwMDAwLTAnKX1dLFxuXHQnR08nOiBbe21hc2s6IG5ldyBTdHJpbmdNYXNrKCcwMC4wMDAuMDAwLTAnKX1dLFxuXHQnTUEnOiBbe21hc2s6IG5ldyBTdHJpbmdNYXNrKCcwMDAwMDAwMDAnKX1dLFxuXHQnTUcnOiBbe21hc2s6IG5ldyBTdHJpbmdNYXNrKCcwMDAuMDAwLjAwMC8wMDAwJyl9XSxcblx0J01TJzogW3ttYXNrOiBuZXcgU3RyaW5nTWFzaygnMDAwMDAwMDAwJyl9XSxcblx0J01UJzogW3ttYXNrOiBuZXcgU3RyaW5nTWFzaygnMDAwMDAwMDAwMC0wJyl9XSxcblx0J1BBJzogW3ttYXNrOiBuZXcgU3RyaW5nTWFzaygnMDAtMDAwMDAwLTAnKX1dLFxuXHQnUEInOiBbe21hc2s6IG5ldyBTdHJpbmdNYXNrKCcwMDAwMDAwMC0wJyl9XSxcblx0J1BFJzogW3tjaGFyczogOSwgbWFzazogbmV3IFN0cmluZ01hc2soJzAwMDAwMDAtMDAnKX0sIHttYXNrOiBuZXcgU3RyaW5nTWFzaygnMDAuMC4wMDAuMDAwMDAwMC0wJyl9XSxcblx0J1BJJzogW3ttYXNrOiBuZXcgU3RyaW5nTWFzaygnMDAwMDAwMDAwJyl9XSxcblx0J1BSJzogW3ttYXNrOiBuZXcgU3RyaW5nTWFzaygnMDAwLjAwMDAwLTAwJyl9XSxcblx0J1JKJzogW3ttYXNrOiBuZXcgU3RyaW5nTWFzaygnMDAuMDAwLjAwLTAnKX1dLFxuXHQnUk4nOiBbe2NoYXJzOiA5LCBtYXNrOiBuZXcgU3RyaW5nTWFzaygnMDAuMDAwLjAwMC0wJyl9LCB7bWFzazogbmV3IFN0cmluZ01hc2soJzAwLjAuMDAwLjAwMC0wJyl9XSxcblx0J1JPJzogW3ttYXNrOiBuZXcgU3RyaW5nTWFzaygnMDAwMDAwMDAwMDAwMC0wJyl9XSxcblx0J1JSJzogW3ttYXNrOiBuZXcgU3RyaW5nTWFzaygnMDAwMDAwMDAtMCcpfV0sXG5cdCdSUyc6IFt7bWFzazogbmV3IFN0cmluZ01hc2soJzAwMC8wMDAwMDAwJyl9XSxcblx0J1NDJzogW3ttYXNrOiBuZXcgU3RyaW5nTWFzaygnMDAwLjAwMC4wMDAnKX1dLFxuXHQnU0UnOiBbe21hc2s6IG5ldyBTdHJpbmdNYXNrKCcwMDAwMDAwMC0wJyl9XSxcblx0J1NQJzogW3ttYXNrOiBuZXcgU3RyaW5nTWFzaygnMDAwLjAwMC4wMDAuMDAwJyl9LCB7bWFzazogbmV3IFN0cmluZ01hc2soJy0wMDAwMDAwMC4wLzAwMCcpfV0sXG5cdCdUTyc6IFt7bWFzazogbmV3IFN0cmluZ01hc2soJzAwMDAwMDAwMDAwJyl9XVxufTtcblxuZnVuY3Rpb24gQnJJZU1hc2tEaXJlY3RpdmUoJHBhcnNlKSB7XG5cdGZ1bmN0aW9uIGNsZWFyVmFsdWUodmFsdWUpIHtcblx0XHRpZiAoIXZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoL1teMC05XS9nLCAnJyk7XG5cdH1cblxuXHRmdW5jdGlvbiBnZXRNYXNrKHVmLCB2YWx1ZSkge1xuXHRcdGlmICghdWYgfHwgIWllTWFza3NbdWZdKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKHVmID09PSAnU1AnICYmIC9eUC9pLnRlc3QodmFsdWUpKSB7XG5cdFx0XHRyZXR1cm4gaWVNYXNrcy5TUFsxXS5tYXNrO1xuXHRcdH1cblxuXHRcdHZhciBtYXNrcyA9IGllTWFza3NbdWZdO1xuXHRcdHZhciBpID0gMDtcblx0XHR3aGlsZSAobWFza3NbaV0uY2hhcnMgJiYgbWFza3NbaV0uY2hhcnMgPCBjbGVhclZhbHVlKHZhbHVlKS5sZW5ndGggJiYgaSA8IG1hc2tzLmxlbmd0aCAtIDEpIHtcblx0XHRcdGkrKztcblx0XHR9XG5cblx0XHRyZXR1cm4gbWFza3NbaV0ubWFzaztcblx0fVxuXG5cdGZ1bmN0aW9uIGFwcGx5SUVNYXNrKHZhbHVlLCB1Zikge1xuXHRcdHZhciBtYXNrID0gZ2V0TWFzayh1ZiwgdmFsdWUpO1xuXG5cdFx0aWYgKCFtYXNrKSB7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fVxuXG5cdFx0dmFyIHByb2Nlc3NlZCA9IG1hc2sucHJvY2VzcyhjbGVhclZhbHVlKHZhbHVlKSk7XG5cdFx0dmFyIGZvcm1hdGVkVmFsdWUgPSBwcm9jZXNzZWQucmVzdWx0IHx8ICcnO1xuXHRcdGZvcm1hdGVkVmFsdWUgPSBmb3JtYXRlZFZhbHVlLnRyaW0oKS5yZXBsYWNlKC9bXjAtOV0kLywgJycpO1xuXG5cdFx0aWYgKHVmID09PSAnU1AnICYmIC9ecC9pLnRlc3QodmFsdWUpKSB7XG5cdFx0XHRyZXR1cm4gJ1AnICsgZm9ybWF0ZWRWYWx1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZm9ybWF0ZWRWYWx1ZTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0cmVzdHJpY3Q6ICdBJyxcblx0XHRyZXF1aXJlOiAnbmdNb2RlbCcsXG5cdFx0bGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjdHJsKSB7XG5cdFx0XHR2YXIgc3RhdGUgPSAoJHBhcnNlKGF0dHJzLnVpQnJJZU1hc2spKHNjb3BlKSB8fCAnJykudG9VcHBlckNhc2UoKTtcblxuXHRcdFx0ZnVuY3Rpb24gZm9ybWF0dGVyKHZhbHVlKSB7XG5cdFx0XHRcdGlmIChjdHJsLiRpc0VtcHR5KHZhbHVlKSkge1xuXHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBhcHBseUlFTWFzayh2YWx1ZSwgc3RhdGUpO1xuXHRcdFx0fVxuXG5cdFx0XHRmdW5jdGlvbiBwYXJzZXIodmFsdWUpIHtcblx0XHRcdFx0aWYgKGN0cmwuJGlzRW1wdHkodmFsdWUpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGZvcm1hdGVkVmFsdWUgPSBhcHBseUlFTWFzayh2YWx1ZSwgc3RhdGUpO1xuXHRcdFx0XHR2YXIgYWN0dWFsVmFsdWUgPSBjbGVhclZhbHVlKGZvcm1hdGVkVmFsdWUpO1xuXG5cdFx0XHRcdGlmIChjdHJsLiR2aWV3VmFsdWUgIT09IGZvcm1hdGVkVmFsdWUpIHtcblx0XHRcdFx0XHRjdHJsLiRzZXRWaWV3VmFsdWUoZm9ybWF0ZWRWYWx1ZSk7XG5cdFx0XHRcdFx0Y3RybC4kcmVuZGVyKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoc3RhdGUgJiYgc3RhdGUudG9VcHBlckNhc2UoKSA9PT0gJ1NQJyAmJiAvXnAvaS50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRcdHJldHVybiAnUCcgKyBhY3R1YWxWYWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBhY3R1YWxWYWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0Y3RybC4kZm9ybWF0dGVycy5wdXNoKGZvcm1hdHRlcik7XG5cdFx0XHRjdHJsLiRwYXJzZXJzLnB1c2gocGFyc2VyKTtcblxuXHRcdFx0Y3RybC4kdmFsaWRhdG9ycy5pZSA9IGZ1bmN0aW9uIHZhbGlkYXRvcihtb2RlbFZhbHVlKSB7XG5cdFx0XHRcdHJldHVybiBjdHJsLiRpc0VtcHR5KG1vZGVsVmFsdWUpIHx8IEJyVi5pZShzdGF0ZSkudmFsaWRhdGUobW9kZWxWYWx1ZSk7XG5cdFx0XHR9O1xuXG5cdFx0XHRzY29wZS4kd2F0Y2goYXR0cnMudWlCckllTWFzaywgZnVuY3Rpb24obmV3U3RhdGUpIHtcblx0XHRcdFx0c3RhdGUgPSAobmV3U3RhdGUgfHwgJycpLnRvVXBwZXJDYXNlKCk7XG5cblx0XHRcdFx0cGFyc2VyKGN0cmwuJHZpZXdWYWx1ZSk7XG5cdFx0XHRcdGN0cmwuJHZhbGlkYXRlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG59XG5CckllTWFza0RpcmVjdGl2ZS4kaW5qZWN0ID0gWyckcGFyc2UnXTtcblxubW9kdWxlLmV4cG9ydHMgPSBCckllTWFza0RpcmVjdGl2ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFN0cmluZ01hc2sgPSByZXF1aXJlKCdzdHJpbmctbWFzaycpO1xuXG52YXIgbWFza0ZhY3RvcnkgPSByZXF1aXJlKCcuLi8uLi9oZWxwZXJzL21hc2stZmFjdG9yeScpO1xuXG52YXIgbmZlQWNjZXNzS2V5TWFzayA9IG5ldyBTdHJpbmdNYXNrKCcwMDAwIDAwMDAgMDAwMCAwMDAwIDAwMDAgMDAwMCAwMDAwIDAwMDAgMDAwMCAwMDAwIDAwMDAnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBtYXNrRmFjdG9yeSh7XG5cdGNsZWFyVmFsdWU6IGZ1bmN0aW9uKHJhd1ZhbHVlKSB7XG5cdFx0cmV0dXJuIHJhd1ZhbHVlLnJlcGxhY2UoL1teMC05XS9nLCAnJykuc2xpY2UoMCwgNDQpO1xuXHR9LFxuXHRmb3JtYXQ6IGZ1bmN0aW9uKGNsZWFuVmFsdWUpIHtcblx0XHRyZXR1cm4gKG5mZUFjY2Vzc0tleU1hc2suYXBwbHkoY2xlYW5WYWx1ZSkgfHwgJycpLnJlcGxhY2UoL1teMC05XSQvLCAnJyk7XG5cdH0sXG5cdHZhbGlkYXRpb25zOiB7XG5cdFx0bmZlQWNjZXNzS2V5OiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCA9PT0gNDQ7XG5cdFx0fVxuXHR9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFN0cmluZ01hc2sgPSByZXF1aXJlKCdzdHJpbmctbWFzaycpO1xuXG52YXIgbWFza0ZhY3RvcnkgPSByZXF1aXJlKCcuLi8uLi9oZWxwZXJzL21hc2stZmFjdG9yeScpO1xuXG4vKipcbiAqIEZJWE1FOiBhbGwgbnVtYmVycyB3aWxsIGhhdmUgOSBkaWdpdHMgYWZ0ZXIgMjAxNi5cbiAqIHNlZSBodHRwOi8vcG9ydGFsLmVtYnJhdGVsLmNvbS5ici9lbWJyYXRlbC85LWRpZ2l0by9cbiAqL1xudmFyIHBob25lTWFzazhEID0ge1xuXHRcdGNvdW50cnlDb2RlIDogbmV3IFN0cmluZ01hc2soJyswMCAoMDApIDAwMDAtMDAwMCcpLCAgIC8vd2l0aCBjb3VudHJ5IGNvZGVcblx0XHRhcmVhQ29kZSAgICA6IG5ldyBTdHJpbmdNYXNrKCcoMDApIDAwMDAtMDAwMCcpLCAgICAgICAvL3dpdGggYXJlYSBjb2RlXG5cdFx0c2ltcGxlICAgICAgOiBuZXcgU3RyaW5nTWFzaygnMDAwMC0wMDAwJykgICAgICAgICAgICAgLy93aXRob3V0IGFyZWEgY29kZVxuXHR9LCBwaG9uZU1hc2s5RCA9IHtcblx0XHRjb3VudHJ5Q29kZSA6IG5ldyBTdHJpbmdNYXNrKCcrMDAgKDAwKSAwMDAwMC0wMDAwJyksIC8vd2l0aCBjb3VudHJ5IGNvZGVcblx0XHRhcmVhQ29kZSAgICA6IG5ldyBTdHJpbmdNYXNrKCcoMDApIDAwMDAwLTAwMDAnKSwgICAgIC8vd2l0aCBhcmVhIGNvZGVcblx0XHRzaW1wbGUgICAgICA6IG5ldyBTdHJpbmdNYXNrKCcwMDAwMC0wMDAwJykgICAgICAgICAgIC8vd2l0aG91dCBhcmVhIGNvZGVcblx0fSwgcGhvbmVNYXNrMDgwMCA9IHtcblx0XHRjb3VudHJ5Q29kZSA6IG51bGwsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL04vQVxuXHRcdGFyZWFDb2RlICAgIDogbnVsbCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vTi9BXG5cdFx0c2ltcGxlICAgICAgOiBuZXcgU3RyaW5nTWFzaygnMDAwMC0wMDAtMDAwMCcpICAgICAgICAgLy9OL0EsIHNvIGl0J3MgXCJzaW1wbGVcIlxuXHR9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1hc2tGYWN0b3J5KHtcblx0Y2xlYXJWYWx1ZTogZnVuY3Rpb24ocmF3VmFsdWUpIHtcblx0XHRyZXR1cm4gcmF3VmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKC9bXjAtOV0vZywgJycpLnNsaWNlKDAsIDEzKTtcblx0fSxcblx0Zm9ybWF0OiBmdW5jdGlvbihjbGVhblZhbHVlKSB7XG5cdFx0dmFyIGZvcm1hdHRlZFZhbHVlO1xuXG5cdFx0aWYgKGNsZWFuVmFsdWUuaW5kZXhPZignMDgwMCcpID09PSAwKSB7XG5cdFx0XHRmb3JtYXR0ZWRWYWx1ZSA9IHBob25lTWFzazA4MDAuc2ltcGxlLmFwcGx5KGNsZWFuVmFsdWUpO1xuXHRcdH0gZWxzZSBpZiAoY2xlYW5WYWx1ZS5sZW5ndGggPCA5KSB7XG5cdFx0XHRmb3JtYXR0ZWRWYWx1ZSA9IHBob25lTWFzazhELnNpbXBsZS5hcHBseShjbGVhblZhbHVlKSB8fCAnJztcblx0XHR9IGVsc2UgaWYgKGNsZWFuVmFsdWUubGVuZ3RoIDwgMTApIHtcblx0XHRcdGZvcm1hdHRlZFZhbHVlID0gcGhvbmVNYXNrOUQuc2ltcGxlLmFwcGx5KGNsZWFuVmFsdWUpO1xuXHRcdH0gZWxzZSBpZiAoY2xlYW5WYWx1ZS5sZW5ndGggPCAxMSkge1xuXHRcdFx0Zm9ybWF0dGVkVmFsdWUgPSBwaG9uZU1hc2s4RC5hcmVhQ29kZS5hcHBseShjbGVhblZhbHVlKTtcblx0XHR9IGVsc2UgaWYgKGNsZWFuVmFsdWUubGVuZ3RoIDwgMTIpIHtcblx0XHRcdGZvcm1hdHRlZFZhbHVlID0gcGhvbmVNYXNrOUQuYXJlYUNvZGUuYXBwbHkoY2xlYW5WYWx1ZSk7XG5cdFx0fSBlbHNlIGlmIChjbGVhblZhbHVlLmxlbmd0aCA8IDEzKSB7XG5cdFx0XHRmb3JtYXR0ZWRWYWx1ZSA9IHBob25lTWFzazhELmNvdW50cnlDb2RlLmFwcGx5KGNsZWFuVmFsdWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3JtYXR0ZWRWYWx1ZSA9IHBob25lTWFzazlELmNvdW50cnlDb2RlLmFwcGx5KGNsZWFuVmFsdWUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmb3JtYXR0ZWRWYWx1ZS50cmltKCkucmVwbGFjZSgvW14wLTldJC8sICcnKTtcblx0fSxcblx0Z2V0TW9kZWxWYWx1ZTogZnVuY3Rpb24oZm9ybWF0dGVkVmFsdWUsIG9yaWdpbmFsTW9kZWxUeXBlKSB7XG5cdFx0dmFyIGNsZWFuVmFsdWUgPSB0aGlzLmNsZWFyVmFsdWUoZm9ybWF0dGVkVmFsdWUpO1xuXHRcdHJldHVybiBvcmlnaW5hbE1vZGVsVHlwZSA9PT0gJ251bWJlcicgPyBwYXJzZUludChjbGVhblZhbHVlKSA6IGNsZWFuVmFsdWU7XG5cdH0sXG5cdHZhbGlkYXRpb25zOiB7XG5cdFx0YnJQaG9uZU51bWJlcjogZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdHZhciB2YWx1ZUxlbmd0aCA9IHZhbHVlICYmIHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoO1xuXG5cdFx0XHQvLzgtIDhEIHdpdGhvdXQgQUNcblx0XHRcdC8vOS0gOUQgd2l0aG91dCBBQ1xuXHRcdFx0Ly8xMC0gOEQgd2l0aCBBQ1xuXHRcdFx0Ly8xMS0gOUQgd2l0aCBBQyBhbmQgMDgwMFxuXHRcdFx0Ly8xMi0gOEQgd2l0aCBBQyBwbHVzIENDXG5cdFx0XHQvLzEzLSA5RCB3aXRoIEFDIHBsdXMgQ0Ncblx0XHRcdHJldHVybiB2YWx1ZUxlbmd0aCA+PSA4ICYmIHZhbHVlTGVuZ3RoIDw9IDEzO1xuXHRcdH1cblx0fVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBtID0gYW5ndWxhci5tb2R1bGUoJ3VpLnV0aWxzLm1hc2tzLmNoJywgW10pXG5cdC5kaXJlY3RpdmUoJ3VpQ2hQaG9uZU51bWJlck1hc2snLCByZXF1aXJlKCcuL3Bob25lL2NoLXBob25lJykpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG0ubmFtZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFN0cmluZ01hc2sgPSByZXF1aXJlKCdzdHJpbmctbWFzaycpO1xuXG52YXIgbWFza0ZhY3RvcnkgPSByZXF1aXJlKCcuLi8uLi9oZWxwZXJzL21hc2stZmFjdG9yeScpO1xuXG52YXIgcGhvbmVNYXNrID0gbmV3IFN0cmluZ01hc2soJyswMCAwMCAwMDAgMDAgMDAnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBtYXNrRmFjdG9yeSh7XG5cdGNsZWFyVmFsdWU6IGZ1bmN0aW9uKHJhd1ZhbHVlKSB7XG5cdFx0cmV0dXJuIHJhd1ZhbHVlLnRvU3RyaW5nKCkucmVwbGFjZSgvW14wLTldL2csICcnKS5zbGljZSgwLCAxMSk7XG5cdH0sXG5cdGZvcm1hdDogZnVuY3Rpb24oY2xlYW5WYWx1ZSkge1xuXHRcdHZhciBmb3JtYXRlZFZhbHVlO1xuXG5cdFx0Zm9ybWF0ZWRWYWx1ZSA9IHBob25lTWFzay5hcHBseShjbGVhblZhbHVlKSB8fCAnJztcblxuXHRcdHJldHVybiBmb3JtYXRlZFZhbHVlLnRyaW0oKS5yZXBsYWNlKC9bXjAtOV0kLywgJycpO1xuXHR9LFxuXHR2YWxpZGF0aW9uczoge1xuXHRcdGNoUGhvbmVOdW1iZXI6IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHR2YXIgdmFsdWVMZW5ndGggPSB2YWx1ZSAmJiB2YWx1ZS50b1N0cmluZygpLmxlbmd0aDtcblx0XHRcdHJldHVybiB2YWx1ZUxlbmd0aCA9PT0gMTE7XG5cdFx0fVxuXHR9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG0gPSBhbmd1bGFyLm1vZHVsZSgndWkudXRpbHMubWFza3MuZnInLCBbXSlcblx0LmRpcmVjdGl2ZSgndWlGclBob25lTnVtYmVyTWFzaycsIHJlcXVpcmUoJy4vcGhvbmUvZnItcGhvbmUnKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbS5uYW1lO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgU3RyaW5nTWFzayA9IHJlcXVpcmUoJ3N0cmluZy1tYXNrJyk7XG52YXIgbWFza0ZhY3RvcnkgPSByZXF1aXJlKCcuLi8uLi9oZWxwZXJzL21hc2stZmFjdG9yeScpO1xuXG52YXIgcGhvbmVNYXNrRlIgPSBuZXcgU3RyaW5nTWFzaygnMDAgMDAgMDAgMDAgMDAnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBtYXNrRmFjdG9yeSh7XG5cdGNsZWFyVmFsdWU6IGZ1bmN0aW9uKHJhd1ZhbHVlKSB7XG5cdFx0cmV0dXJuIHJhd1ZhbHVlLnRvU3RyaW5nKCkucmVwbGFjZSgvW14wLTldL2csICcnKS5zbGljZSgwLCAxMCk7XG5cdH0sXG5cdGZvcm1hdDogZnVuY3Rpb24oY2xlYW5WYWx1ZSkge1xuXHRcdHZhciBmb3JtYXR0ZWRWYWx1ZTtcblxuXHRcdGZvcm1hdHRlZFZhbHVlID0gcGhvbmVNYXNrRlIuYXBwbHkoY2xlYW5WYWx1ZSkgfHwgJyc7XG5cblx0XHRyZXR1cm4gZm9ybWF0dGVkVmFsdWUudHJpbSgpLnJlcGxhY2UoL1teMC05XSQvLCAnJyk7XG5cdH0sXG5cdHZhbGlkYXRpb25zOiB7XG5cdFx0ZnJQaG9uZU51bWJlcjogZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdHZhciB2YWx1ZUxlbmd0aCA9IHZhbHVlICYmIHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoO1xuXHRcdFx0cmV0dXJuIHZhbHVlTGVuZ3RoID09PSAxMDtcblx0XHR9XG5cdH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgU3RyaW5nTWFzayA9IHJlcXVpcmUoJ3N0cmluZy1tYXNrJyk7XG52YXIgbWFza0ZhY3RvcnkgPSByZXF1aXJlKCcuLi8uLi9oZWxwZXJzL21hc2stZmFjdG9yeScpO1xuXG52YXIgY2NTaXplID0gMTY7XG5cbnZhciBjY01hc2sgPSBuZXcgU3RyaW5nTWFzaygnMDAwMCAwMDAwIDAwMDAgMDAwMCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1hc2tGYWN0b3J5KHtcblx0Y2xlYXJWYWx1ZTogZnVuY3Rpb24ocmF3VmFsdWUpIHtcblx0XHRyZXR1cm4gcmF3VmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKC9bXjAtOV0vZywgJycpLnNsaWNlKDAsIGNjU2l6ZSk7XG5cdH0sXG5cdGZvcm1hdDogZnVuY3Rpb24oY2xlYW5WYWx1ZSkge1xuXHRcdHZhciBmb3JtYXRlZFZhbHVlO1xuXG5cdFx0Zm9ybWF0ZWRWYWx1ZSA9IGNjTWFzay5hcHBseShjbGVhblZhbHVlKSB8fCAnJztcblxuXHRcdHJldHVybiBmb3JtYXRlZFZhbHVlLnRyaW0oKS5yZXBsYWNlKC9bXjAtOV0kLywgJycpO1xuXHR9LFxuXHR2YWxpZGF0aW9uczoge1xuXHRcdGNyZWRpdENhcmQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHR2YXIgdmFsdWVMZW5ndGggPSB2YWx1ZSAmJiB2YWx1ZS50b1N0cmluZygpLmxlbmd0aDtcblx0XHRcdHJldHVybiB2YWx1ZUxlbmd0aCA9PT0gY2NTaXplO1xuXHRcdH1cblx0fVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBmb3JtYXREYXRlID0gcmVxdWlyZSgnZGF0ZS1mbnMvZm9ybWF0Jyk7XG52YXIgcGFyc2VEYXRlID0gcmVxdWlyZSgnZGF0ZS1mbnMvcGFyc2UnKTtcbnZhciBpc1ZhbGlkRGF0ZSA9IHJlcXVpcmUoJ2RhdGUtZm5zL2lzVmFsaWQnKTtcbnZhciBTdHJpbmdNYXNrID0gcmVxdWlyZSgnc3RyaW5nLW1hc2snKTtcblxuZnVuY3Rpb24gaXNJU09EYXRlU3RyaW5nKGRhdGUpIHtcblx0cmV0dXJuIC9eWzAtOV17NH0tWzAtOV17Mn0tWzAtOV17Mn1UWzAtOV17Mn06WzAtOV17Mn06WzAtOV17Mn1cXC5bMC05XXszfShbLStdWzAtOV17Mn06WzAtOV17Mn18WikkL1xuXHRcdC50ZXN0KGRhdGUudG9TdHJpbmcoKSk7XG59XG5cbnZhciBkYXRlRm9ybWF0TWFwQnlMb2NhbGUgPSB7XG5cdCdwdC1icic6ICdERC9NTS9ZWVlZJyxcblx0J2VzLWFyJzogJ0REL01NL1lZWVknLFxuXHQnZXMtbXgnOiAnREQvTU0vWVlZWScsXG5cdCdlcycgICA6ICdERC9NTS9ZWVlZJyxcblx0J2VuLXVzJzogJ01NL0REL1lZWVknLFxuXHQnZW4nICAgOiAnTU0vREQvWVlZWScsXG5cdCdmci1mcic6ICdERC9NTS9ZWVlZJyxcblx0J2ZyJyAgIDogJ0REL01NL1lZWVknLFxuXHQncnUnICAgOiAnREQuTU0uWVlZWSdcbn07XG5cbmZ1bmN0aW9uIERhdGVNYXNrRGlyZWN0aXZlKCRsb2NhbGUpIHtcblx0dmFyIGRhdGVGb3JtYXQgPSBkYXRlRm9ybWF0TWFwQnlMb2NhbGVbJGxvY2FsZS5pZF0gfHwgJ1lZWVktTU0tREQnO1xuXG5cdHJldHVybiB7XG5cdFx0cmVzdHJpY3Q6ICdBJyxcblx0XHRyZXF1aXJlOiAnbmdNb2RlbCcsXG5cdFx0bGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjdHJsKSB7XG5cdFx0XHRhdHRycy5wYXJzZSA9IGF0dHJzLnBhcnNlIHx8ICd0cnVlJztcblxuXHRcdFx0ZGF0ZUZvcm1hdCA9IGF0dHJzLnVpRGF0ZU1hc2sgfHwgZGF0ZUZvcm1hdDtcblxuXHRcdFx0dmFyIGRhdGVNYXNrID0gbmV3IFN0cmluZ01hc2soZGF0ZUZvcm1hdC5yZXBsYWNlKC9bWU1EXS9nLCcwJykpO1xuXG5cdFx0XHRmdW5jdGlvbiBmb3JtYXR0ZXIodmFsdWUpIHtcblx0XHRcdFx0aWYgKGN0cmwuJGlzRW1wdHkodmFsdWUpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgY2xlYW5WYWx1ZSA9IHZhbHVlO1xuXHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyB8fCBpc0lTT0RhdGVTdHJpbmcodmFsdWUpKSB7XG5cdFx0XHRcdFx0Y2xlYW5WYWx1ZSA9IGZvcm1hdERhdGUodmFsdWUsIGRhdGVGb3JtYXQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y2xlYW5WYWx1ZSA9IGNsZWFuVmFsdWUucmVwbGFjZSgvW14wLTldL2csICcnKTtcblx0XHRcdFx0dmFyIGZvcm1hdGVkVmFsdWUgPSBkYXRlTWFzay5hcHBseShjbGVhblZhbHVlKSB8fCAnJztcblxuXHRcdFx0XHRyZXR1cm4gZm9ybWF0ZWRWYWx1ZS50cmltKCkucmVwbGFjZSgvW14wLTldJC8sICcnKTtcblx0XHRcdH1cblxuXHRcdFx0Y3RybC4kZm9ybWF0dGVycy5wdXNoKGZvcm1hdHRlcik7XG5cblx0XHRcdGN0cmwuJHBhcnNlcnMucHVzaChmdW5jdGlvbiBwYXJzZXIodmFsdWUpIHtcblx0XHRcdFx0aWYgKGN0cmwuJGlzRW1wdHkodmFsdWUpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGZvcm1hdGVkVmFsdWUgPSBmb3JtYXR0ZXIodmFsdWUpO1xuXG5cdFx0XHRcdGlmIChjdHJsLiR2aWV3VmFsdWUgIT09IGZvcm1hdGVkVmFsdWUpIHtcblx0XHRcdFx0XHRjdHJsLiRzZXRWaWV3VmFsdWUoZm9ybWF0ZWRWYWx1ZSk7XG5cdFx0XHRcdFx0Y3RybC4kcmVuZGVyKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gYXR0cnMucGFyc2UgPT09ICdmYWxzZSdcblx0XHRcdFx0XHQ/IGZvcm1hdGVkVmFsdWVcblx0XHRcdFx0XHQ6IHBhcnNlRGF0ZShmb3JtYXRlZFZhbHVlLCBkYXRlRm9ybWF0LCBuZXcgRGF0ZSgpKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRjdHJsLiR2YWxpZGF0b3JzLmRhdGUgPVx0ZnVuY3Rpb24gdmFsaWRhdG9yKG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSkge1xuXHRcdFx0XHRpZiAoY3RybC4kaXNFbXB0eShtb2RlbFZhbHVlKSkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGlzVmFsaWREYXRlKHBhcnNlRGF0ZSh2aWV3VmFsdWUsIGRhdGVGb3JtYXQsIG5ldyBEYXRlKCkpKSAmJiB2aWV3VmFsdWUubGVuZ3RoID09PSBkYXRlRm9ybWF0Lmxlbmd0aDtcblx0XHRcdH07XG5cdFx0fVxuXHR9O1xufVxuRGF0ZU1hc2tEaXJlY3RpdmUuJGluamVjdCA9IFsnJGxvY2FsZSddO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhdGVNYXNrRGlyZWN0aXZlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbSA9IGFuZ3VsYXIubW9kdWxlKCd1aS51dGlscy5tYXNrcy5nbG9iYWwnLCBbXSlcblx0LmRpcmVjdGl2ZSgndWlDcmVkaXRDYXJkTWFzaycsIHJlcXVpcmUoJy4vY3JlZGl0LWNhcmQvY3JlZGl0LWNhcmQnKSlcblx0LmRpcmVjdGl2ZSgndWlEYXRlTWFzaycsIHJlcXVpcmUoJy4vZGF0ZS9kYXRlJykpXG5cdC5kaXJlY3RpdmUoJ3VpTW9uZXlNYXNrJywgcmVxdWlyZSgnLi9tb25leS9tb25leScpKVxuXHQuZGlyZWN0aXZlKCd1aU51bWJlck1hc2snLCByZXF1aXJlKCcuL251bWJlci9udW1iZXInKSlcblx0LmRpcmVjdGl2ZSgndWlQZXJjZW50YWdlTWFzaycsIHJlcXVpcmUoJy4vcGVyY2VudGFnZS9wZXJjZW50YWdlJykpXG5cdC5kaXJlY3RpdmUoJ3VpU2NpZW50aWZpY05vdGF0aW9uTWFzaycsIHJlcXVpcmUoJy4vc2NpZW50aWZpYy1ub3RhdGlvbi9zY2llbnRpZmljLW5vdGF0aW9uJykpXG5cdC5kaXJlY3RpdmUoJ3VpVGltZU1hc2snLCByZXF1aXJlKCcuL3RpbWUvdGltZScpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBtLm5hbWU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBTdHJpbmdNYXNrID0gcmVxdWlyZSgnc3RyaW5nLW1hc2snKTtcbnZhciB2YWxpZGF0b3JzID0gcmVxdWlyZSgnLi4vLi4vaGVscGVycy92YWxpZGF0b3JzJyk7XG52YXIgUHJlRm9ybWF0dGVycyA9IHJlcXVpcmUoJy4uLy4uL2hlbHBlcnMvcHJlLWZvcm1hdHRlcnMnKTtcblxuZnVuY3Rpb24gTW9uZXlNYXNrRGlyZWN0aXZlKCRsb2NhbGUsICRwYXJzZSkge1xuXHRyZXR1cm4ge1xuXHRcdHJlc3RyaWN0OiAnQScsXG5cdFx0cmVxdWlyZTogJ25nTW9kZWwnLFxuXHRcdGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY3RybCkge1xuXHRcdFx0dmFyIGRlY2ltYWxEZWxpbWl0ZXIgPSAkbG9jYWxlLk5VTUJFUl9GT1JNQVRTLkRFQ0lNQUxfU0VQLFxuXHRcdFx0XHR0aG91c2FuZHNEZWxpbWl0ZXIgPSAkbG9jYWxlLk5VTUJFUl9GT1JNQVRTLkdST1VQX1NFUCxcblx0XHRcdFx0Y3VycmVuY3lTeW0gPSAkbG9jYWxlLk5VTUJFUl9GT1JNQVRTLkNVUlJFTkNZX1NZTSxcblx0XHRcdFx0c3ltYm9sU2VwYXJhdGlvbiA9ICcgJyxcblx0XHRcdFx0ZGVjaW1hbHMgPSAkcGFyc2UoYXR0cnMudWlNb25leU1hc2spKHNjb3BlKSxcblx0XHRcdFx0YmFja3NwYWNlUHJlc3NlZCA9IGZhbHNlO1xuXG5cdFx0XHRlbGVtZW50LmJpbmQoJ2tleWRvd24ga2V5cHJlc3MnLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRiYWNrc3BhY2VQcmVzc2VkID0gZXZlbnQud2hpY2ggPT09IDg7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZnVuY3Rpb24gbWFza0ZhY3RvcnkoZGVjaW1hbHMpIHtcblx0XHRcdFx0dmFyIGRlY2ltYWxzUGF0dGVybiA9IGRlY2ltYWxzID4gMCA/IGRlY2ltYWxEZWxpbWl0ZXIgKyBuZXcgQXJyYXkoZGVjaW1hbHMgKyAxKS5qb2luKCcwJykgOiAnJztcblx0XHRcdFx0dmFyIG1hc2tQYXR0ZXJuID0gICcjJyArIHRob3VzYW5kc0RlbGltaXRlciArICcjIzAnICsgZGVjaW1hbHNQYXR0ZXJuO1xuXHRcdFx0XHRpZiAoYW5ndWxhci5pc0RlZmluZWQoYXR0cnMudWlDdXJyZW5jeUFmdGVyKSkge1xuXHRcdFx0XHRcdG1hc2tQYXR0ZXJuICs9IHN5bWJvbFNlcGFyYXRpb247XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bWFza1BhdHRlcm4gPSAgc3ltYm9sU2VwYXJhdGlvbiArIG1hc2tQYXR0ZXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBuZXcgU3RyaW5nTWFzayhtYXNrUGF0dGVybiwge3JldmVyc2U6IHRydWV9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLnVpRGVjaW1hbERlbGltaXRlcikpIHtcblx0XHRcdFx0ZGVjaW1hbERlbGltaXRlciA9IGF0dHJzLnVpRGVjaW1hbERlbGltaXRlcjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLnVpVGhvdXNhbmRzRGVsaW1pdGVyKSkge1xuXHRcdFx0XHR0aG91c2FuZHNEZWxpbWl0ZXIgPSBhdHRycy51aVRob3VzYW5kc0RlbGltaXRlcjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLnVpSGlkZUdyb3VwU2VwKSkge1xuXHRcdFx0XHR0aG91c2FuZHNEZWxpbWl0ZXIgPSAnJztcblx0XHRcdH1cblxuXHRcdFx0aWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLnVpSGlkZVNwYWNlKSkge1xuXHRcdFx0XHRzeW1ib2xTZXBhcmF0aW9uID0gJyc7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChhbmd1bGFyLmlzRGVmaW5lZChhdHRycy5jdXJyZW5jeVN5bWJvbCkpIHtcblx0XHRcdFx0Y3VycmVuY3lTeW0gPSBhdHRycy5jdXJyZW5jeVN5bWJvbDtcblx0XHRcdFx0aWYgKGF0dHJzLmN1cnJlbmN5U3ltYm9sLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHN5bWJvbFNlcGFyYXRpb24gPSAnJztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaXNOYU4oZGVjaW1hbHMpKSB7XG5cdFx0XHRcdGRlY2ltYWxzID0gMjtcblx0XHRcdH1cblx0XHRcdGRlY2ltYWxzID0gcGFyc2VJbnQoZGVjaW1hbHMpO1xuXHRcdFx0dmFyIG1vbmV5TWFzayA9IG1hc2tGYWN0b3J5KGRlY2ltYWxzKTtcblxuXHRcdFx0ZnVuY3Rpb24gZm9ybWF0dGVyKHZhbHVlKSB7XG5cdFx0XHRcdGlmIChjdHJsLiRpc0VtcHR5KHZhbHVlKSkge1xuXHRcdFx0XHRcdHJldHVybiAnJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChhbmd1bGFyLmlzRGVmaW5lZChhdHRycy51aUludGVnZXJNb2RlbCkpIHtcblx0XHRcdFx0XHR2YWx1ZSAvPSBNYXRoLnBvdygxMCwgZGVjaW1hbHMpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHByZWZpeCA9IChhbmd1bGFyLmlzRGVmaW5lZChhdHRycy51aU5lZ2F0aXZlTnVtYmVyKSAmJiB2YWx1ZSA8IDApID8gJy0nIDogJyc7XG5cdFx0XHRcdHZhciB2YWx1ZVRvRm9ybWF0ID0gUHJlRm9ybWF0dGVycy5wcmVwYXJlTnVtYmVyVG9Gb3JtYXR0ZXIodmFsdWUsIGRlY2ltYWxzKTtcblxuXHRcdFx0XHRpZiAoYW5ndWxhci5pc0RlZmluZWQoYXR0cnMudWlDdXJyZW5jeUFmdGVyKSkge1xuXHRcdFx0XHRcdHJldHVybiBwcmVmaXggKyBtb25leU1hc2suYXBwbHkodmFsdWVUb0Zvcm1hdCkgKyBjdXJyZW5jeVN5bTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBwcmVmaXggKyBjdXJyZW5jeVN5bSArIG1vbmV5TWFzay5hcHBseSh2YWx1ZVRvRm9ybWF0KTtcblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gcGFyc2VyKHZhbHVlKSB7XG5cdFx0XHRcdGlmIChjdHJsLiRpc0VtcHR5KHZhbHVlKSkge1xuXHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGFjdHVhbE51bWJlciA9IHZhbHVlLnJlcGxhY2UoL1teXFxkXSsvZywnJyksIGZvcm1hdGVkVmFsdWU7XG5cdFx0XHRcdGFjdHVhbE51bWJlciA9IGFjdHVhbE51bWJlci5yZXBsYWNlKC9eWzBdKyhbMS05XSkvLCckMScpO1xuXHRcdFx0XHRhY3R1YWxOdW1iZXIgPSBhY3R1YWxOdW1iZXIgfHwgJzAnO1xuXG5cdFx0XHRcdGlmIChiYWNrc3BhY2VQcmVzc2VkICYmIGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLnVpQ3VycmVuY3lBZnRlcikgJiYgYWN0dWFsTnVtYmVyICE9PSAwKSB7XG5cdFx0XHRcdFx0YWN0dWFsTnVtYmVyID0gYWN0dWFsTnVtYmVyLnN1YnN0cmluZygwLCBhY3R1YWxOdW1iZXIubGVuZ3RoIC0gMSk7XG5cdFx0XHRcdFx0YmFja3NwYWNlUHJlc3NlZCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLnVpQ3VycmVuY3lBZnRlcikpIHtcblx0XHRcdFx0XHRmb3JtYXRlZFZhbHVlID0gbW9uZXlNYXNrLmFwcGx5KGFjdHVhbE51bWJlcikgKyBjdXJyZW5jeVN5bTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRmb3JtYXRlZFZhbHVlID0gY3VycmVuY3lTeW0gKyBtb25leU1hc2suYXBwbHkoYWN0dWFsTnVtYmVyKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChhbmd1bGFyLmlzRGVmaW5lZChhdHRycy51aU5lZ2F0aXZlTnVtYmVyKSkge1xuXHRcdFx0XHRcdHZhciBpc05lZ2F0aXZlID0gKHZhbHVlWzBdID09PSAnLScpLFxuXHRcdFx0XHRcdFx0bmVlZHNUb0ludmVydFNpZ24gPSAodmFsdWUuc2xpY2UoLTEpID09PSAnLScpO1xuXG5cdFx0XHRcdFx0Ly9vbmx5IGFwcGx5IHRoZSBtaW51cyBzaWduIGlmIGl0IGlzIG5lZ2F0aXZlIG9yKGV4Y2x1c2l2ZSlcblx0XHRcdFx0XHQvL25lZWRzIHRvIGJlIG5lZ2F0aXZlIGFuZCB0aGUgbnVtYmVyIGlzIGRpZmZlcmVudCBmcm9tIHplcm9cblx0XHRcdFx0XHRpZiAobmVlZHNUb0ludmVydFNpZ24gXiBpc05lZ2F0aXZlICYmICEhYWN0dWFsTnVtYmVyKSB7XG5cdFx0XHRcdFx0XHRhY3R1YWxOdW1iZXIgKj0gLTE7XG5cdFx0XHRcdFx0XHRmb3JtYXRlZFZhbHVlID0gJy0nICsgZm9ybWF0ZWRWYWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodmFsdWUgIT09IGZvcm1hdGVkVmFsdWUpIHtcblx0XHRcdFx0XHRjdHJsLiRzZXRWaWV3VmFsdWUoZm9ybWF0ZWRWYWx1ZSk7XG5cdFx0XHRcdFx0Y3RybC4kcmVuZGVyKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgcmV0VmFsdWUgPSBwYXJzZUludChmb3JtYXRlZFZhbHVlLnJlcGxhY2UoL1teXFxkXFwtXSsvZywnJykpO1xuXG5cdFx0XHRcdGlmICghaXNOYU4ocmV0VmFsdWUpKSB7XG5cdFx0XHRcdFx0aWYgKCFhbmd1bGFyLmlzRGVmaW5lZChhdHRycy51aUludGVnZXJNb2RlbCkpIHtcblx0XHRcdFx0XHRcdHJldFZhbHVlIC89IE1hdGgucG93KDEwLCBkZWNpbWFscyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHJldFZhbHVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdGN0cmwuJGZvcm1hdHRlcnMucHVzaChmb3JtYXR0ZXIpO1xuXHRcdFx0Y3RybC4kcGFyc2Vycy5wdXNoKHBhcnNlcik7XG5cblx0XHRcdGlmIChhdHRycy51aU1vbmV5TWFzaykge1xuXHRcdFx0XHRzY29wZS4kd2F0Y2goYXR0cnMudWlNb25leU1hc2ssIGZ1bmN0aW9uKF9kZWNpbWFscykge1xuXHRcdFx0XHRcdGRlY2ltYWxzID0gaXNOYU4oX2RlY2ltYWxzKSA/IDIgOiBfZGVjaW1hbHM7XG5cdFx0XHRcdFx0ZGVjaW1hbHMgPSBwYXJzZUludChkZWNpbWFscyk7XG5cdFx0XHRcdFx0bW9uZXlNYXNrID0gbWFza0ZhY3RvcnkoZGVjaW1hbHMpO1xuXG5cdFx0XHRcdFx0cGFyc2VyKGN0cmwuJHZpZXdWYWx1ZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoYXR0cnMuY3VycmVuY3kpIHtcblx0XHRcdFx0c2NvcGUuJHdhdGNoKGF0dHJzLmN1cnJlbmN5LCBmdW5jdGlvbihfY3VycmVuY3kpIHtcblx0XHRcdFx0XHRjdXJyZW5jeVN5bSA9IF9jdXJyZW5jeTtcblx0XHRcdFx0XHRtb25leU1hc2sgPSBtYXNrRmFjdG9yeShkZWNpbWFscyk7XG5cdFx0XHRcdFx0cGFyc2VyKGN0cmwuJHZpZXdWYWx1ZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoYXR0cnMubWluKSB7XG5cdFx0XHRcdHZhciBtaW5WYWw7XG5cblx0XHRcdFx0Y3RybC4kdmFsaWRhdG9ycy5taW4gPSBmdW5jdGlvbihtb2RlbFZhbHVlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHZhbGlkYXRvcnMubWluTnVtYmVyKGN0cmwsIG1vZGVsVmFsdWUsIG1pblZhbCk7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0c2NvcGUuJHdhdGNoKGF0dHJzLm1pbiwgZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdFx0XHRtaW5WYWwgPSB2YWx1ZTtcblx0XHRcdFx0XHRjdHJsLiR2YWxpZGF0ZSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGF0dHJzLm1heCkge1xuXHRcdFx0XHR2YXIgbWF4VmFsO1xuXG5cdFx0XHRcdGN0cmwuJHZhbGlkYXRvcnMubWF4ID0gZnVuY3Rpb24obW9kZWxWYWx1ZSkge1xuXHRcdFx0XHRcdHJldHVybiB2YWxpZGF0b3JzLm1heE51bWJlcihjdHJsLCBtb2RlbFZhbHVlLCBtYXhWYWwpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHNjb3BlLiR3YXRjaChhdHRycy5tYXgsIGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRcdFx0bWF4VmFsID0gdmFsdWU7XG5cdFx0XHRcdFx0Y3RybC4kdmFsaWRhdGUoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufVxuTW9uZXlNYXNrRGlyZWN0aXZlLiRpbmplY3QgPSBbJyRsb2NhbGUnLCAnJHBhcnNlJ107XG5cbm1vZHVsZS5leHBvcnRzID0gTW9uZXlNYXNrRGlyZWN0aXZlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdmFsaWRhdG9ycyA9IHJlcXVpcmUoJy4uLy4uL2hlbHBlcnMvdmFsaWRhdG9ycycpO1xudmFyIE51bWJlck1hc2tzID0gcmVxdWlyZSgnLi4vLi4vaGVscGVycy9udW1iZXItbWFzay1idWlsZGVyJyk7XG52YXIgUHJlRm9ybWF0dGVycyA9IHJlcXVpcmUoJy4uLy4uL2hlbHBlcnMvcHJlLWZvcm1hdHRlcnMnKTtcblxuZnVuY3Rpb24gTnVtYmVyTWFza0RpcmVjdGl2ZSgkbG9jYWxlLCAkcGFyc2UpIHtcblx0cmV0dXJuIHtcblx0XHRyZXN0cmljdDogJ0EnLFxuXHRcdHJlcXVpcmU6ICduZ01vZGVsJyxcblx0XHRsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIGN0cmwpIHtcblx0XHRcdHZhciBkZWNpbWFsRGVsaW1pdGVyID0gJGxvY2FsZS5OVU1CRVJfRk9STUFUUy5ERUNJTUFMX1NFUCxcblx0XHRcdFx0dGhvdXNhbmRzRGVsaW1pdGVyID0gJGxvY2FsZS5OVU1CRVJfRk9STUFUUy5HUk9VUF9TRVAsXG5cdFx0XHRcdGRlY2ltYWxzID0gJHBhcnNlKGF0dHJzLnVpTnVtYmVyTWFzaykoc2NvcGUpO1xuXG5cdFx0XHRpZiAoYW5ndWxhci5pc0RlZmluZWQoYXR0cnMudWlIaWRlR3JvdXBTZXApKSB7XG5cdFx0XHRcdHRob3VzYW5kc0RlbGltaXRlciA9ICcnO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaXNOYU4oZGVjaW1hbHMpKSB7XG5cdFx0XHRcdGRlY2ltYWxzID0gMjtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHZpZXdNYXNrID0gTnVtYmVyTWFza3Mudmlld01hc2soZGVjaW1hbHMsIGRlY2ltYWxEZWxpbWl0ZXIsIHRob3VzYW5kc0RlbGltaXRlciksXG5cdFx0XHRcdG1vZGVsTWFzayA9IE51bWJlck1hc2tzLm1vZGVsTWFzayhkZWNpbWFscyk7XG5cblx0XHRcdGZ1bmN0aW9uIHBhcnNlcih2YWx1ZSkge1xuXHRcdFx0XHRpZiAoY3RybC4kaXNFbXB0eSh2YWx1ZSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciB2YWx1ZVRvRm9ybWF0ID0gUHJlRm9ybWF0dGVycy5jbGVhckRlbGltaXRlcnNBbmRMZWFkaW5nWmVyb3ModmFsdWUpIHx8ICcwJztcblx0XHRcdFx0dmFyIGZvcm1hdGVkVmFsdWUgPSB2aWV3TWFzay5hcHBseSh2YWx1ZVRvRm9ybWF0KTtcblx0XHRcdFx0dmFyIGFjdHVhbE51bWJlciA9IHBhcnNlRmxvYXQobW9kZWxNYXNrLmFwcGx5KHZhbHVlVG9Gb3JtYXQpKTtcblxuXHRcdFx0XHRpZiAoYW5ndWxhci5pc0RlZmluZWQoYXR0cnMudWlOZWdhdGl2ZU51bWJlcikpIHtcblx0XHRcdFx0XHR2YXIgaXNOZWdhdGl2ZSA9ICh2YWx1ZVswXSA9PT0gJy0nKSxcblx0XHRcdFx0XHRcdG5lZWRzVG9JbnZlcnRTaWduID0gKHZhbHVlLnNsaWNlKC0xKSA9PT0gJy0nKTtcblxuXHRcdFx0XHRcdC8vb25seSBhcHBseSB0aGUgbWludXMgc2lnbiBpZiBpdCBpcyBuZWdhdGl2ZSBvcihleGNsdXNpdmUpIG9yIHRoZSBmaXJzdCBjaGFyYWN0ZXJcblx0XHRcdFx0XHQvL25lZWRzIHRvIGJlIG5lZ2F0aXZlIGFuZCB0aGUgbnVtYmVyIGlzIGRpZmZlcmVudCBmcm9tIHplcm9cblx0XHRcdFx0XHRpZiAoKG5lZWRzVG9JbnZlcnRTaWduIF4gaXNOZWdhdGl2ZSkgfHwgdmFsdWUgPT09ICctJykge1xuXHRcdFx0XHRcdFx0YWN0dWFsTnVtYmVyICo9IC0xO1xuXHRcdFx0XHRcdFx0Zm9ybWF0ZWRWYWx1ZSA9ICctJyArICgoYWN0dWFsTnVtYmVyICE9PSAwKSA/IGZvcm1hdGVkVmFsdWUgOiAnJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGN0cmwuJHZpZXdWYWx1ZSAhPT0gZm9ybWF0ZWRWYWx1ZSkge1xuXHRcdFx0XHRcdGN0cmwuJHNldFZpZXdWYWx1ZShmb3JtYXRlZFZhbHVlKTtcblx0XHRcdFx0XHRjdHJsLiRyZW5kZXIoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBhY3R1YWxOdW1iZXI7XG5cdFx0XHR9XG5cblx0XHRcdGZ1bmN0aW9uIGZvcm1hdHRlcih2YWx1ZSkge1xuXHRcdFx0XHRpZiAoY3RybC4kaXNFbXB0eSh2YWx1ZSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgcHJlZml4ID0gKGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLnVpTmVnYXRpdmVOdW1iZXIpICYmIHZhbHVlIDwgMCkgPyAnLScgOiAnJztcblx0XHRcdFx0dmFyIHZhbHVlVG9Gb3JtYXQgPSBQcmVGb3JtYXR0ZXJzLnByZXBhcmVOdW1iZXJUb0Zvcm1hdHRlcih2YWx1ZSwgZGVjaW1hbHMpO1xuXHRcdFx0XHRyZXR1cm4gcHJlZml4ICsgdmlld01hc2suYXBwbHkodmFsdWVUb0Zvcm1hdCk7XG5cdFx0XHR9XG5cblx0XHRcdGZ1bmN0aW9uIGNsZWFyVmlld1ZhbHVlSWZNaW51c1NpZ24oKSB7XG5cdFx0XHRcdGlmIChjdHJsLiR2aWV3VmFsdWUgPT09ICctJykge1xuXHRcdFx0XHRcdGN0cmwuJHNldFZpZXdWYWx1ZSgnJyk7XG5cdFx0XHRcdFx0Y3RybC4kcmVuZGVyKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0ZWxlbWVudC5vbignYmx1cicsIGNsZWFyVmlld1ZhbHVlSWZNaW51c1NpZ24pO1xuXG5cdFx0XHRjdHJsLiRmb3JtYXR0ZXJzLnB1c2goZm9ybWF0dGVyKTtcblx0XHRcdGN0cmwuJHBhcnNlcnMucHVzaChwYXJzZXIpO1xuXG5cdFx0XHRpZiAoYXR0cnMudWlOdW1iZXJNYXNrKSB7XG5cdFx0XHRcdHNjb3BlLiR3YXRjaChhdHRycy51aU51bWJlck1hc2ssIGZ1bmN0aW9uKF9kZWNpbWFscykge1xuXHRcdFx0XHRcdGRlY2ltYWxzID0gaXNOYU4oX2RlY2ltYWxzKSA/IDIgOiBfZGVjaW1hbHM7XG5cdFx0XHRcdFx0dmlld01hc2sgPSBOdW1iZXJNYXNrcy52aWV3TWFzayhkZWNpbWFscywgZGVjaW1hbERlbGltaXRlciwgdGhvdXNhbmRzRGVsaW1pdGVyKTtcblx0XHRcdFx0XHRtb2RlbE1hc2sgPSBOdW1iZXJNYXNrcy5tb2RlbE1hc2soZGVjaW1hbHMpO1xuXG5cdFx0XHRcdFx0cGFyc2VyKGN0cmwuJHZpZXdWYWx1ZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoYXR0cnMubWluKSB7XG5cdFx0XHRcdHZhciBtaW5WYWw7XG5cblx0XHRcdFx0Y3RybC4kdmFsaWRhdG9ycy5taW4gPSBmdW5jdGlvbihtb2RlbFZhbHVlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHZhbGlkYXRvcnMubWluTnVtYmVyKGN0cmwsIG1vZGVsVmFsdWUsIG1pblZhbCk7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0c2NvcGUuJHdhdGNoKGF0dHJzLm1pbiwgZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdFx0XHRtaW5WYWwgPSB2YWx1ZTtcblx0XHRcdFx0XHRjdHJsLiR2YWxpZGF0ZSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGF0dHJzLm1heCkge1xuXHRcdFx0XHR2YXIgbWF4VmFsO1xuXG5cdFx0XHRcdGN0cmwuJHZhbGlkYXRvcnMubWF4ID0gZnVuY3Rpb24obW9kZWxWYWx1ZSkge1xuXHRcdFx0XHRcdHJldHVybiB2YWxpZGF0b3JzLm1heE51bWJlcihjdHJsLCBtb2RlbFZhbHVlLCBtYXhWYWwpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHNjb3BlLiR3YXRjaChhdHRycy5tYXgsIGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRcdFx0bWF4VmFsID0gdmFsdWU7XG5cdFx0XHRcdFx0Y3RybC4kdmFsaWRhdGUoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufVxuTnVtYmVyTWFza0RpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9jYWxlJywgJyRwYXJzZSddO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE51bWJlck1hc2tEaXJlY3RpdmU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB2YWxpZGF0b3JzID0gcmVxdWlyZSgnLi4vLi4vaGVscGVycy92YWxpZGF0b3JzJyk7XG52YXIgTnVtYmVyTWFza3MgPSByZXF1aXJlKCcuLi8uLi9oZWxwZXJzL251bWJlci1tYXNrLWJ1aWxkZXInKTtcbnZhciBQcmVGb3JtYXR0ZXJzID0gcmVxdWlyZSgnLi4vLi4vaGVscGVycy9wcmUtZm9ybWF0dGVycycpO1xuXG5mdW5jdGlvbiBwcmVwYXJlUGVyY2VudGFnZVRvRm9ybWF0dGVyKHZhbHVlLCBkZWNpbWFscywgbW9kZWxNdWx0aXBsaWVyKSB7XG5cdHJldHVybiBQcmVGb3JtYXR0ZXJzLmNsZWFyRGVsaW1pdGVyc0FuZExlYWRpbmdaZXJvcygocGFyc2VGbG9hdCh2YWx1ZSkqbW9kZWxNdWx0aXBsaWVyKS50b0ZpeGVkKGRlY2ltYWxzKSk7XG59XG5cbmZ1bmN0aW9uIFBlcmNlbnRhZ2VNYXNrRGlyZWN0aXZlKCRsb2NhbGUpIHtcblx0cmV0dXJuIHtcblx0XHRyZXN0cmljdDogJ0EnLFxuXHRcdHJlcXVpcmU6ICduZ01vZGVsJyxcblx0XHRsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIGN0cmwpIHtcblx0XHRcdHZhciBkZWNpbWFsRGVsaW1pdGVyID0gJGxvY2FsZS5OVU1CRVJfRk9STUFUUy5ERUNJTUFMX1NFUDtcblxuXHRcdFx0dmFyIGJhY2tzcGFjZVByZXNzZWQgPSBmYWxzZTtcblx0XHRcdGVsZW1lbnQuYmluZCgna2V5ZG93biBrZXlwcmVzcycsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdGJhY2tzcGFjZVByZXNzZWQgPSBldmVudC53aGljaCA9PT0gODtcblx0XHRcdH0pO1xuXG5cdFx0XHR2YXIgdGhvdXNhbmRzRGVsaW1pdGVyID0gJGxvY2FsZS5OVU1CRVJfRk9STUFUUy5HUk9VUF9TRVA7XG5cdFx0XHRpZiAoYW5ndWxhci5pc0RlZmluZWQoYXR0cnMudWlIaWRlR3JvdXBTZXApKSB7XG5cdFx0XHRcdHRob3VzYW5kc0RlbGltaXRlciA9ICcnO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgcGVyY2VudGFnZVN5bWJvbCA9ICcgJSc7XG5cdFx0XHRpZiAoYW5ndWxhci5pc0RlZmluZWQoYXR0cnMudWlIaWRlUGVyY2VudGFnZVNpZ24pKSB7XG5cdFx0XHRcdHBlcmNlbnRhZ2VTeW1ib2wgPSAnJztcblx0XHRcdH0gZWxzZSBpZiAoYW5ndWxhci5pc0RlZmluZWQoYXR0cnMudWlIaWRlU3BhY2UpKSB7XG5cdFx0XHRcdHBlcmNlbnRhZ2VTeW1ib2wgPSAnJSc7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBkZWNpbWFscyA9IHBhcnNlSW50KGF0dHJzLnVpUGVyY2VudGFnZU1hc2spO1xuXHRcdFx0aWYgKGlzTmFOKGRlY2ltYWxzKSkge1xuXHRcdFx0XHRkZWNpbWFscyA9IDI7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBtb2RlbFZhbHVlID0ge1xuXHRcdFx0XHRtdWx0aXBsaWVyIDogMTAwLFxuXHRcdFx0XHRkZWNpbWFsTWFzazogMlxuXHRcdFx0fTtcblx0XHRcdGlmIChhbmd1bGFyLmlzRGVmaW5lZChhdHRycy51aVBlcmNlbnRhZ2VWYWx1ZSkpIHtcblx0XHRcdFx0bW9kZWxWYWx1ZS5tdWx0aXBsaWVyICA9IDE7XG5cdFx0XHRcdG1vZGVsVmFsdWUuZGVjaW1hbE1hc2sgPSAwO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgbnVtYmVyRGVjaW1hbHMgPSBkZWNpbWFscyArIG1vZGVsVmFsdWUuZGVjaW1hbE1hc2s7XG5cdFx0XHR2YXIgdmlld01hc2sgPSBOdW1iZXJNYXNrcy52aWV3TWFzayhkZWNpbWFscywgZGVjaW1hbERlbGltaXRlciwgdGhvdXNhbmRzRGVsaW1pdGVyKSxcblx0XHRcdFx0bW9kZWxNYXNrID0gTnVtYmVyTWFza3MubW9kZWxNYXNrKG51bWJlckRlY2ltYWxzKTtcblxuXHRcdFx0ZnVuY3Rpb24gZm9ybWF0dGVyKHZhbHVlKSB7XG5cdFx0XHRcdGlmIChjdHJsLiRpc0VtcHR5KHZhbHVlKSkge1xuXHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIgcHJlZml4ID0gKGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLnVpTmVnYXRpdmVOdW1iZXIpICYmIHZhbHVlIDwgMCkgPyAnLScgOiAnJztcblx0XHRcdFx0dmFyIHZhbHVlVG9Gb3JtYXQgPSBwcmVwYXJlUGVyY2VudGFnZVRvRm9ybWF0dGVyKHZhbHVlLCBkZWNpbWFscywgbW9kZWxWYWx1ZS5tdWx0aXBsaWVyKTtcblx0XHRcdFx0dmFyIGZvcm1hdGVkVmFsdWUgPSBwcmVmaXggKyB2aWV3TWFzay5hcHBseSh2YWx1ZVRvRm9ybWF0KSArIHBlcmNlbnRhZ2VTeW1ib2w7XG5cblx0XHRcdFx0cmV0dXJuIGZvcm1hdGVkVmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdGZ1bmN0aW9uIHBhcnNlcih2YWx1ZSkge1xuXHRcdFx0XHRpZiAoY3RybC4kaXNFbXB0eSh2YWx1ZSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciB2YWx1ZVRvRm9ybWF0ID0gUHJlRm9ybWF0dGVycy5jbGVhckRlbGltaXRlcnNBbmRMZWFkaW5nWmVyb3ModmFsdWUpIHx8ICcwJztcblx0XHRcdFx0aWYgKHBlcmNlbnRhZ2VTeW1ib2wgIT09ICcnICYmIHZhbHVlLmxlbmd0aCA+IDEgJiYgdmFsdWUuaW5kZXhPZignJScpID09PSAtMSkge1xuXHRcdFx0XHRcdHZhbHVlVG9Gb3JtYXQgPSB2YWx1ZVRvRm9ybWF0LnNsaWNlKDAsIHZhbHVlVG9Gb3JtYXQubGVuZ3RoIC0gMSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYmFja3NwYWNlUHJlc3NlZCAmJiB2YWx1ZS5sZW5ndGggPT09IDEgJiYgdmFsdWUgIT09ICclJykge1xuXHRcdFx0XHRcdHZhbHVlVG9Gb3JtYXQgPSAnMCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgZm9ybWF0ZWRWYWx1ZSA9IHZpZXdNYXNrLmFwcGx5KHZhbHVlVG9Gb3JtYXQpICsgcGVyY2VudGFnZVN5bWJvbDtcblx0XHRcdFx0dmFyIGFjdHVhbE51bWJlciA9IHBhcnNlRmxvYXQobW9kZWxNYXNrLmFwcGx5KHZhbHVlVG9Gb3JtYXQpKTtcblxuXHRcdFx0XHRpZiAoYW5ndWxhci5pc0RlZmluZWQoYXR0cnMudWlOZWdhdGl2ZU51bWJlcikpIHtcblx0XHRcdFx0XHR2YXIgaXNOZWdhdGl2ZSA9ICh2YWx1ZVswXSA9PT0gJy0nKSxcblx0XHRcdFx0XHRcdG5lZWRzVG9JbnZlcnRTaWduID0gKHZhbHVlLnNsaWNlKC0xKSA9PT0gJy0nKTtcblxuXHRcdFx0XHRcdC8vb25seSBhcHBseSB0aGUgbWludXMgc2lnbiBpZiBpdCBpcyBuZWdhdGl2ZSBvcihleGNsdXNpdmUpIG9yIHRoZSBmaXJzdCBjaGFyYWN0ZXJcblx0XHRcdFx0XHQvL25lZWRzIHRvIGJlIG5lZ2F0aXZlIGFuZCB0aGUgbnVtYmVyIGlzIGRpZmZlcmVudCBmcm9tIHplcm9cblx0XHRcdFx0XHRpZiAoKG5lZWRzVG9JbnZlcnRTaWduIF4gaXNOZWdhdGl2ZSkgfHwgdmFsdWUgPT09ICctJykge1xuXHRcdFx0XHRcdFx0YWN0dWFsTnVtYmVyICo9IC0xO1xuXHRcdFx0XHRcdFx0Zm9ybWF0ZWRWYWx1ZSA9ICctJyArICgoYWN0dWFsTnVtYmVyICE9PSAwKSA/IGZvcm1hdGVkVmFsdWUgOiAnJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGN0cmwuJHZpZXdWYWx1ZSAhPT0gZm9ybWF0ZWRWYWx1ZSkge1xuXHRcdFx0XHRcdGN0cmwuJHNldFZpZXdWYWx1ZShmb3JtYXRlZFZhbHVlKTtcblx0XHRcdFx0XHRjdHJsLiRyZW5kZXIoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBhY3R1YWxOdW1iZXI7XG5cdFx0XHR9XG5cblx0XHRcdGN0cmwuJGZvcm1hdHRlcnMucHVzaChmb3JtYXR0ZXIpO1xuXHRcdFx0Y3RybC4kcGFyc2Vycy5wdXNoKHBhcnNlcik7XG5cblx0XHRcdGlmIChhdHRycy51aVBlcmNlbnRhZ2VNYXNrKSB7XG5cdFx0XHRcdHNjb3BlLiR3YXRjaChhdHRycy51aVBlcmNlbnRhZ2VNYXNrLCBmdW5jdGlvbihfZGVjaW1hbHMpIHtcblx0XHRcdFx0XHRkZWNpbWFscyA9IGlzTmFOKF9kZWNpbWFscykgPyAyIDogX2RlY2ltYWxzO1xuXG5cdFx0XHRcdFx0bnVtYmVyRGVjaW1hbHMgPSBkZWNpbWFscyArIG1vZGVsVmFsdWUuZGVjaW1hbE1hc2s7XG5cdFx0XHRcdFx0dmlld01hc2sgPSBOdW1iZXJNYXNrcy52aWV3TWFzayhkZWNpbWFscywgZGVjaW1hbERlbGltaXRlciwgdGhvdXNhbmRzRGVsaW1pdGVyKTtcblx0XHRcdFx0XHRtb2RlbE1hc2sgPSBOdW1iZXJNYXNrcy5tb2RlbE1hc2sobnVtYmVyRGVjaW1hbHMpO1xuXG5cdFx0XHRcdFx0cGFyc2VyKGZvcm1hdHRlcihjdHJsLiRtb2RlbFZhbHVlKSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoYXR0cnMubWluKSB7XG5cdFx0XHRcdHZhciBtaW5WYWw7XG5cblx0XHRcdFx0Y3RybC4kdmFsaWRhdG9ycy5taW4gPSBmdW5jdGlvbihtb2RlbFZhbHVlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHZhbGlkYXRvcnMubWluTnVtYmVyKGN0cmwsIG1vZGVsVmFsdWUsIG1pblZhbCk7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0c2NvcGUuJHdhdGNoKGF0dHJzLm1pbiwgZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdFx0XHRtaW5WYWwgPSB2YWx1ZTtcblx0XHRcdFx0XHRjdHJsLiR2YWxpZGF0ZSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGF0dHJzLm1heCkge1xuXHRcdFx0XHR2YXIgbWF4VmFsO1xuXG5cdFx0XHRcdGN0cmwuJHZhbGlkYXRvcnMubWF4ID0gZnVuY3Rpb24obW9kZWxWYWx1ZSkge1xuXHRcdFx0XHRcdHJldHVybiB2YWxpZGF0b3JzLm1heE51bWJlcihjdHJsLCBtb2RlbFZhbHVlLCBtYXhWYWwpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHNjb3BlLiR3YXRjaChhdHRycy5tYXgsIGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRcdFx0bWF4VmFsID0gdmFsdWU7XG5cdFx0XHRcdFx0Y3RybC4kdmFsaWRhdGUoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufVxuUGVyY2VudGFnZU1hc2tEaXJlY3RpdmUuJGluamVjdCA9IFsnJGxvY2FsZSddO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBlcmNlbnRhZ2VNYXNrRGlyZWN0aXZlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgU3RyaW5nTWFzayA9IHJlcXVpcmUoJ3N0cmluZy1tYXNrJyk7XG5cbmZ1bmN0aW9uIFNjaWVudGlmaWNOb3RhdGlvbk1hc2tEaXJlY3RpdmUoJGxvY2FsZSwgJHBhcnNlKSB7XG5cdHZhciBkZWNpbWFsRGVsaW1pdGVyID0gJGxvY2FsZS5OVU1CRVJfRk9STUFUUy5ERUNJTUFMX1NFUCxcblx0XHRkZWZhdWx0UHJlY2lzaW9uID0gMjtcblxuXHRmdW5jdGlvbiBzaWduaWZpY2FuZE1hc2tCdWlsZGVyKGRlY2ltYWxzKSB7XG5cdFx0dmFyIG1hc2sgPSAnMCc7XG5cblx0XHRpZiAoZGVjaW1hbHMgPiAwKSB7XG5cdFx0XHRtYXNrICs9IGRlY2ltYWxEZWxpbWl0ZXI7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlY2ltYWxzOyBpKyspIHtcblx0XHRcdFx0bWFzayArPSAnMCc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG5ldyBTdHJpbmdNYXNrKG1hc2ssIHtcblx0XHRcdHJldmVyc2U6IHRydWVcblx0XHR9KTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0cmVzdHJpY3Q6ICdBJyxcblx0XHRyZXF1aXJlOiAnbmdNb2RlbCcsXG5cdFx0bGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjdHJsKSB7XG5cdFx0XHR2YXIgZGVjaW1hbHMgPSAkcGFyc2UoYXR0cnMudWlTY2llbnRpZmljTm90YXRpb25NYXNrKShzY29wZSk7XG5cblx0XHRcdGlmIChpc05hTihkZWNpbWFscykpIHtcblx0XHRcdFx0ZGVjaW1hbHMgPSBkZWZhdWx0UHJlY2lzaW9uO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgc2lnbmlmaWNhbmRNYXNrID0gc2lnbmlmaWNhbmRNYXNrQnVpbGRlcihkZWNpbWFscyk7XG5cblx0XHRcdGZ1bmN0aW9uIHNwbGl0TnVtYmVyKHZhbHVlKSB7XG5cdFx0XHRcdHZhciBzdHJpbmdWYWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCksXG5cdFx0XHRcdFx0c3BsaXR0ZWROdW1iZXIgPSBzdHJpbmdWYWx1ZS5tYXRjaCgvKC0/WzAtOV0qKVtcXC5dPyhbMC05XSopP1tFZV0/KFtcXCstXT9bMC05XSopPy8pO1xuXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0aW50ZWdlclBhcnRPZlNpZ25pZmljYW5kOiBzcGxpdHRlZE51bWJlclsxXSxcblx0XHRcdFx0XHRkZWNpbWFsUGFydE9mU2lnbmlmaWNhbmQ6IHNwbGl0dGVkTnVtYmVyWzJdLFxuXHRcdFx0XHRcdGV4cG9uZW50OiBzcGxpdHRlZE51bWJlclszXSB8IDBcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gZm9ybWF0dGVyKHZhbHVlKSB7XG5cdFx0XHRcdGlmIChjdHJsLiRpc0VtcHR5KHZhbHVlKSkge1xuXHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdFx0dmFsdWUgPSB2YWx1ZS50b0V4cG9uZW50aWFsKGRlY2ltYWxzKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCkucmVwbGFjZShkZWNpbWFsRGVsaW1pdGVyLCAnLicpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGZvcm1hdHRlZFZhbHVlLCBleHBvbmVudDtcblx0XHRcdFx0dmFyIHNwbGl0dGVkTnVtYmVyID0gc3BsaXROdW1iZXIodmFsdWUpO1xuXG5cdFx0XHRcdHZhciBpbnRlZ2VyUGFydE9mU2lnbmlmaWNhbmQgPSBzcGxpdHRlZE51bWJlci5pbnRlZ2VyUGFydE9mU2lnbmlmaWNhbmQgfHwgMDtcblx0XHRcdFx0dmFyIG51bWJlclRvRm9ybWF0ID0gaW50ZWdlclBhcnRPZlNpZ25pZmljYW5kLnRvU3RyaW5nKCk7XG5cdFx0XHRcdGlmIChhbmd1bGFyLmlzRGVmaW5lZChzcGxpdHRlZE51bWJlci5kZWNpbWFsUGFydE9mU2lnbmlmaWNhbmQpKSB7XG5cdFx0XHRcdFx0bnVtYmVyVG9Gb3JtYXQgKz0gc3BsaXR0ZWROdW1iZXIuZGVjaW1hbFBhcnRPZlNpZ25pZmljYW5kO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIG5lZWRzTm9ybWFsaXphdGlvbiA9XG5cdFx0XHRcdFx0KGludGVnZXJQYXJ0T2ZTaWduaWZpY2FuZCA+PSAxIHx8IGludGVnZXJQYXJ0T2ZTaWduaWZpY2FuZCA8PSAtMSkgJiZcblx0XHRcdFx0XHQoXG5cdFx0XHRcdFx0XHQoYW5ndWxhci5pc0RlZmluZWQoc3BsaXR0ZWROdW1iZXIuZGVjaW1hbFBhcnRPZlNpZ25pZmljYW5kKSAmJlxuXHRcdFx0XHRcdFx0c3BsaXR0ZWROdW1iZXIuZGVjaW1hbFBhcnRPZlNpZ25pZmljYW5kLmxlbmd0aCA+IGRlY2ltYWxzKSB8fFxuXHRcdFx0XHRcdFx0KGRlY2ltYWxzID09PSAwICYmIG51bWJlclRvRm9ybWF0Lmxlbmd0aCA+PSAyKVxuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0aWYgKG5lZWRzTm9ybWFsaXphdGlvbikge1xuXHRcdFx0XHRcdGV4cG9uZW50ID0gbnVtYmVyVG9Gb3JtYXQuc2xpY2UoZGVjaW1hbHMgKyAxLCBudW1iZXJUb0Zvcm1hdC5sZW5ndGgpO1xuXHRcdFx0XHRcdG51bWJlclRvRm9ybWF0ID0gbnVtYmVyVG9Gb3JtYXQuc2xpY2UoMCwgZGVjaW1hbHMgKyAxKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvcm1hdHRlZFZhbHVlID0gc2lnbmlmaWNhbmRNYXNrLmFwcGx5KG51bWJlclRvRm9ybWF0KTtcblxuXHRcdFx0XHRpZiAoc3BsaXR0ZWROdW1iZXIuZXhwb25lbnQgIT09IDApIHtcblx0XHRcdFx0XHRleHBvbmVudCA9IHNwbGl0dGVkTnVtYmVyLmV4cG9uZW50O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGV4cG9uZW50KSkge1xuXHRcdFx0XHRcdGZvcm1hdHRlZFZhbHVlICs9ICdlJyArIGV4cG9uZW50O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHByZWZpeCA9IChhbmd1bGFyLmlzRGVmaW5lZChhdHRycy51aU5lZ2F0aXZlTnVtYmVyKSAmJiB2YWx1ZVswXSA9PT0gJy0nKSA/ICctJyA6ICcnO1xuXG5cdFx0XHRcdHJldHVybiBwcmVmaXggKyBmb3JtYXR0ZWRWYWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gcGFyc2VyKHZhbHVlKSB7XG5cdFx0XHRcdGlmIChjdHJsLiRpc0VtcHR5KHZhbHVlKSkge1xuXHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBpc0V4cG9uZW50TmVnYXRpdmUgPSAvZS0vLnRlc3QodmFsdWUpO1xuXHRcdFx0XHR2YXIgY2xlYW5WYWx1ZSA9IHZhbHVlLnJlcGxhY2UoJ2UtJywgJ2UnKTtcblx0XHRcdFx0dmFyIHZpZXdWYWx1ZSA9IGZvcm1hdHRlcihjbGVhblZhbHVlKTtcblxuXHRcdFx0XHR2YXIgbmVlZHNUb0ludmVydFNpZ24gPSAodmFsdWUuc2xpY2UoLTEpID09PSAnLScpO1xuXG5cdFx0XHRcdGlmIChuZWVkc1RvSW52ZXJ0U2lnbiBeIGlzRXhwb25lbnROZWdhdGl2ZSkge1xuXHRcdFx0XHRcdHZpZXdWYWx1ZSA9IHZpZXdWYWx1ZS5yZXBsYWNlKC8oZVstXT8pLywgJ2UtJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAobmVlZHNUb0ludmVydFNpZ24gJiYgaXNFeHBvbmVudE5lZ2F0aXZlKSB7XG5cdFx0XHRcdFx0dmlld1ZhbHVlID0gdmlld1ZhbHVlWzBdICE9PSAnLScgPyAoJy0nICsgdmlld1ZhbHVlKSA6IHZpZXdWYWx1ZS5yZXBsYWNlKC9eKC0pLywnJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgbW9kZWxWYWx1ZSA9IHBhcnNlRmxvYXQodmlld1ZhbHVlLnJlcGxhY2UoZGVjaW1hbERlbGltaXRlciwgJy4nKSk7XG5cblx0XHRcdFx0aWYgKGN0cmwuJHZpZXdWYWx1ZSAhPT0gdmlld1ZhbHVlKSB7XG5cdFx0XHRcdFx0Y3RybC4kc2V0Vmlld1ZhbHVlKHZpZXdWYWx1ZSk7XG5cdFx0XHRcdFx0Y3RybC4kcmVuZGVyKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gbW9kZWxWYWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0Y3RybC4kZm9ybWF0dGVycy5wdXNoKGZvcm1hdHRlcik7XG5cdFx0XHRjdHJsLiRwYXJzZXJzLnB1c2gocGFyc2VyKTtcblxuXHRcdFx0Y3RybC4kdmFsaWRhdG9ycy5tYXggPSBmdW5jdGlvbiB2YWxpZGF0b3IodmFsdWUpIHtcblx0XHRcdFx0cmV0dXJuIGN0cmwuJGlzRW1wdHkodmFsdWUpIHx8IHZhbHVlIDwgTnVtYmVyLk1BWF9WQUxVRTtcblx0XHRcdH07XG5cdFx0fVxuXHR9O1xufVxuU2NpZW50aWZpY05vdGF0aW9uTWFza0RpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbG9jYWxlJywgJyRwYXJzZSddO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNjaWVudGlmaWNOb3RhdGlvbk1hc2tEaXJlY3RpdmU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBTdHJpbmdNYXNrID0gcmVxdWlyZSgnc3RyaW5nLW1hc2snKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBUaW1lTWFza0RpcmVjdGl2ZSgpIHtcblx0cmV0dXJuIHtcblx0XHRyZXN0cmljdDogJ0EnLFxuXHRcdHJlcXVpcmU6ICduZ01vZGVsJyxcblx0XHRsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIGN0cmwpIHtcblx0XHRcdHZhciB0aW1lRm9ybWF0ID0gJzAwOjAwOjAwJztcblxuXHRcdFx0aWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLnVpVGltZU1hc2spICYmIGF0dHJzLnVpVGltZU1hc2sgPT09ICdzaG9ydCcpIHtcblx0XHRcdFx0dGltZUZvcm1hdCA9ICcwMDowMCc7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBmb3JtYXR0ZWRWYWx1ZUxlbmd0aCA9IHRpbWVGb3JtYXQubGVuZ3RoO1xuXHRcdFx0dmFyIHVuZm9ybWF0dGVkVmFsdWVMZW5ndGggPSB0aW1lRm9ybWF0LnJlcGxhY2UoJzonLCAnJykubGVuZ3RoO1xuXHRcdFx0dmFyIHRpbWVNYXNrID0gbmV3IFN0cmluZ01hc2sodGltZUZvcm1hdCk7XG5cblx0XHRcdGZ1bmN0aW9uIGZvcm1hdHRlcih2YWx1ZSkge1xuXHRcdFx0XHRpZiAoY3RybC4kaXNFbXB0eSh2YWx1ZSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgY2xlYW5WYWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teMC05XS9nLCAnJykuc2xpY2UoMCwgdW5mb3JtYXR0ZWRWYWx1ZUxlbmd0aCkgfHwgJyc7XG5cdFx0XHRcdHJldHVybiAodGltZU1hc2suYXBwbHkoY2xlYW5WYWx1ZSkgfHwgJycpLnJlcGxhY2UoL1teMC05XSQvLCAnJyk7XG5cdFx0XHR9XG5cblx0XHRcdGN0cmwuJGZvcm1hdHRlcnMucHVzaChmb3JtYXR0ZXIpO1xuXG5cdFx0XHRjdHJsLiRwYXJzZXJzLnB1c2goZnVuY3Rpb24gcGFyc2VyKHZhbHVlKSB7XG5cdFx0XHRcdGlmIChjdHJsLiRpc0VtcHR5KHZhbHVlKSkge1xuXHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciB2aWV3VmFsdWUgPSBmb3JtYXR0ZXIodmFsdWUpO1xuXHRcdFx0XHR2YXIgbW9kZWxWYWx1ZSA9IHZpZXdWYWx1ZTtcblxuXHRcdFx0XHRpZiAoY3RybC4kdmlld1ZhbHVlICE9PSB2aWV3VmFsdWUpIHtcblx0XHRcdFx0XHRjdHJsLiRzZXRWaWV3VmFsdWUodmlld1ZhbHVlKTtcblx0XHRcdFx0XHRjdHJsLiRyZW5kZXIoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBtb2RlbFZhbHVlO1xuXHRcdFx0fSk7XG5cblx0XHRcdGN0cmwuJHZhbGlkYXRvcnMudGltZSA9IGZ1bmN0aW9uKG1vZGVsVmFsdWUpIHtcblx0XHRcdFx0aWYgKGN0cmwuJGlzRW1wdHkobW9kZWxWYWx1ZSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBzcGxpdHRlZFZhbHVlID0gbW9kZWxWYWx1ZS50b1N0cmluZygpLnNwbGl0KC86LykuZmlsdGVyKGZ1bmN0aW9uKHYpIHtcblx0XHRcdFx0XHRyZXR1cm4gISF2O1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR2YXIgaG91cnMgPSBwYXJzZUludChzcGxpdHRlZFZhbHVlWzBdKSxcblx0XHRcdFx0XHRtaW51dGVzID0gcGFyc2VJbnQoc3BsaXR0ZWRWYWx1ZVsxXSksXG5cdFx0XHRcdFx0c2Vjb25kcyA9IHBhcnNlSW50KHNwbGl0dGVkVmFsdWVbMl0gfHwgMCk7XG5cblx0XHRcdFx0cmV0dXJuIG1vZGVsVmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPT09IGZvcm1hdHRlZFZhbHVlTGVuZ3RoICYmXG5cdFx0XHRcdFx0aG91cnMgPCAyNCAmJiBtaW51dGVzIDwgNjAgJiYgc2Vjb25kcyA8IDYwO1xuXHRcdFx0fTtcblx0XHR9XG5cdH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1hc2tGYWN0b3J5KG1hc2tEZWZpbml0aW9uKSB7XG5cdHJldHVybiBmdW5jdGlvbiBNYXNrRGlyZWN0aXZlKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0EnLFxuXHRcdFx0cmVxdWlyZTogJ25nTW9kZWwnLFxuXHRcdFx0bGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjdHJsKSB7XG5cdFx0XHRcdGN0cmwuJGZvcm1hdHRlcnMucHVzaChmdW5jdGlvbiBmb3JtYXR0ZXIodmFsdWUpIHtcblx0XHRcdFx0XHRpZiAoY3RybC4kaXNFbXB0eSh2YWx1ZSkpIHtcblx0XHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgY2xlYW5WYWx1ZSA9IG1hc2tEZWZpbml0aW9uLmNsZWFyVmFsdWUodmFsdWUudG9TdHJpbmcoKSk7XG5cdFx0XHRcdFx0cmV0dXJuIG1hc2tEZWZpbml0aW9uLmZvcm1hdChjbGVhblZhbHVlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Y3RybC4kcGFyc2Vycy5wdXNoKGZ1bmN0aW9uIHBhcnNlcih2YWx1ZSkge1xuXHRcdFx0XHRcdGlmIChjdHJsLiRpc0VtcHR5KHZhbHVlKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciBjbGVhblZhbHVlID0gbWFza0RlZmluaXRpb24uY2xlYXJWYWx1ZSh2YWx1ZS50b1N0cmluZygpKTtcblx0XHRcdFx0XHR2YXIgZm9ybWF0dGVkVmFsdWUgPSBtYXNrRGVmaW5pdGlvbi5mb3JtYXQoY2xlYW5WYWx1ZSk7XG5cblx0XHRcdFx0XHRpZiAoY3RybC4kdmlld1ZhbHVlICE9PSBmb3JtYXR0ZWRWYWx1ZSkge1xuXHRcdFx0XHRcdFx0Y3RybC4kc2V0Vmlld1ZhbHVlKGZvcm1hdHRlZFZhbHVlKTtcblx0XHRcdFx0XHRcdGN0cmwuJHJlbmRlcigpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKG1hc2tEZWZpbml0aW9uLmdldE1vZGVsVmFsdWUpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gY2xlYW5WYWx1ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgYWN0dWFsTW9kZWxUeXBlID0gdHlwZW9mIGN0cmwuJG1vZGVsVmFsdWU7XG5cdFx0XHRcdFx0cmV0dXJuIG1hc2tEZWZpbml0aW9uLmdldE1vZGVsVmFsdWUoZm9ybWF0dGVkVmFsdWUsIGFjdHVhbE1vZGVsVHlwZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGFuZ3VsYXIuZm9yRWFjaChtYXNrRGVmaW5pdGlvbi52YWxpZGF0aW9ucywgZnVuY3Rpb24odmFsaWRhdG9yRm4sIHZhbGlkYXRpb25FcnJvcktleSkge1xuXHRcdFx0XHRcdGN0cmwuJHZhbGlkYXRvcnNbdmFsaWRhdGlvbkVycm9yS2V5XSA9IGZ1bmN0aW9uIHZhbGlkYXRvcihtb2RlbFZhbHVlLCB2aWV3VmFsdWUpIHtcblx0XHRcdFx0XHRcdHJldHVybiBjdHJsLiRpc0VtcHR5KG1vZGVsVmFsdWUpIHx8IHZhbGlkYXRvckZuKG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSk7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBTdHJpbmdNYXNrID0gcmVxdWlyZSgnc3RyaW5nLW1hc2snKTtcblxuZnVuY3Rpb24gdmlld01hc2soZGVjaW1hbHMsIGRlY2ltYWxEZWxpbWl0ZXIsIHRob3VzYW5kc0RlbGltaXRlcikge1xuXHR2YXIgbWFzayA9ICcjJyArIHRob3VzYW5kc0RlbGltaXRlciArICcjIzAnO1xuXG5cdGlmIChkZWNpbWFscyA+IDApIHtcblx0XHRtYXNrICs9IGRlY2ltYWxEZWxpbWl0ZXI7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWNpbWFsczsgaSsrKSB7XG5cdFx0XHRtYXNrICs9ICcwJztcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gbmV3IFN0cmluZ01hc2sobWFzaywge1xuXHRcdHJldmVyc2U6IHRydWVcblx0fSk7XG59XG5cbmZ1bmN0aW9uIG1vZGVsTWFzayhkZWNpbWFscykge1xuXHR2YXIgbWFzayA9ICcjIyMwJztcblxuXHRpZiAoZGVjaW1hbHMgPiAwKSB7XG5cdFx0bWFzayArPSAnLic7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWNpbWFsczsgaSsrKSB7XG5cdFx0XHRtYXNrICs9ICcwJztcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gbmV3IFN0cmluZ01hc2sobWFzaywge1xuXHRcdHJldmVyc2U6IHRydWVcblx0fSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHR2aWV3TWFzazogdmlld01hc2ssXG5cdG1vZGVsTWFzazogbW9kZWxNYXNrXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBjbGVhckRlbGltaXRlcnNBbmRMZWFkaW5nWmVyb3ModmFsdWUpIHtcblx0aWYgKHZhbHVlID09PSAnMCcpIHtcblx0XHRyZXR1cm4gJzAnO1xuXHR9XG5cblx0dmFyIGNsZWFuVmFsdWUgPSB2YWx1ZS50b1N0cmluZygpLnJlcGxhY2UoL14tLywnJykucmVwbGFjZSgvXjAqLywgJycpO1xuXHRyZXR1cm4gY2xlYW5WYWx1ZS5yZXBsYWNlKC9bXjAtOV0vZywgJycpO1xufVxuXG5mdW5jdGlvbiBwcmVwYXJlTnVtYmVyVG9Gb3JtYXR0ZXIodmFsdWUsIGRlY2ltYWxzKSB7XG5cdHJldHVybiBjbGVhckRlbGltaXRlcnNBbmRMZWFkaW5nWmVyb3MoKHBhcnNlRmxvYXQodmFsdWUpKS50b0ZpeGVkKGRlY2ltYWxzKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRjbGVhckRlbGltaXRlcnNBbmRMZWFkaW5nWmVyb3M6IGNsZWFyRGVsaW1pdGVyc0FuZExlYWRpbmdaZXJvcyxcblx0cHJlcGFyZU51bWJlclRvRm9ybWF0dGVyOiBwcmVwYXJlTnVtYmVyVG9Gb3JtYXR0ZXJcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRtYXhOdW1iZXI6IGZ1bmN0aW9uKGN0cmwsIHZhbHVlLCBsaW1pdCkge1xuXHRcdHZhciBtYXggPSBwYXJzZUZsb2F0KGxpbWl0LCAxMCk7XG5cdFx0cmV0dXJuIGN0cmwuJGlzRW1wdHkodmFsdWUpIHx8IGlzTmFOKG1heCkgfHwgdmFsdWUgPD0gbWF4O1xuXHR9LFxuXHRtaW5OdW1iZXI6IGZ1bmN0aW9uKGN0cmwsIHZhbHVlLCBsaW1pdCkge1xuXHRcdHZhciBtaW4gPSBwYXJzZUZsb2F0KGxpbWl0LCAxMCk7XG5cdFx0cmV0dXJuIGN0cmwuJGlzRW1wdHkodmFsdWUpIHx8IGlzTmFOKG1pbikgfHwgdmFsdWUgPj0gbWluO1xuXHR9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgU3RyaW5nTWFzayA9IHJlcXVpcmUoJ3N0cmluZy1tYXNrJyk7XG52YXIgbWFza0ZhY3RvcnkgPSByZXF1aXJlKCcuLi8uLi9oZWxwZXJzL21hc2stZmFjdG9yeScpO1xuXG52YXIgcGhvbmVNYXNrVVMgPSBuZXcgU3RyaW5nTWFzaygnKDAwMCkgMDAwLTAwMDAnKSxcblx0cGhvbmVNYXNrSU5UTCA9IG5ldyBTdHJpbmdNYXNrKCcrMDAtMDAtMDAwLTAwMDAwMCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1hc2tGYWN0b3J5KHtcblx0Y2xlYXJWYWx1ZTogZnVuY3Rpb24ocmF3VmFsdWUpIHtcblx0XHRyZXR1cm4gcmF3VmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKC9bXjAtOV0vZywgJycpO1xuXHR9LFxuXHRmb3JtYXQ6IGZ1bmN0aW9uKGNsZWFuVmFsdWUpIHtcblx0XHR2YXIgZm9ybWF0dGVkVmFsdWU7XG5cblx0XHRpZiAoY2xlYW5WYWx1ZS5sZW5ndGggPCAxMSkge1xuXHRcdFx0Zm9ybWF0dGVkVmFsdWUgPSBwaG9uZU1hc2tVUy5hcHBseShjbGVhblZhbHVlKSB8fCAnJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0Zm9ybWF0dGVkVmFsdWUgPSBwaG9uZU1hc2tJTlRMLmFwcGx5KGNsZWFuVmFsdWUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmb3JtYXR0ZWRWYWx1ZS50cmltKCkucmVwbGFjZSgvW14wLTldJC8sICcnKTtcblx0fSxcblx0dmFsaWRhdGlvbnM6IHtcblx0XHR1c1Bob25lTnVtYmVyOiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIHZhbHVlICYmIHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID4gOTtcblx0XHR9XG5cdH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbSA9IGFuZ3VsYXIubW9kdWxlKCd1aS51dGlscy5tYXNrcy51cycsIFtdKVxuXHQuZGlyZWN0aXZlKCd1aVVzUGhvbmVOdW1iZXJNYXNrJywgcmVxdWlyZSgnLi9waG9uZS91cy1waG9uZScpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBtLm5hbWU7XG4iXX0=
