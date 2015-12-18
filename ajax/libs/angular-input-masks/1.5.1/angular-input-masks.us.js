require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * angular-input-masks
 * Personalized input masks for AngularJS
 * @version 1.5.1
 * @link http://github.com/assisrafael/angular-input-masks
 * @license MIT
 */

module.exports = angular.module('ui.utils.masks', [
	require('./global/global-masks'),
	require('./us/us-masks')
]).name;

},{"./global/global-masks":3,"./us/us-masks":11}],2:[function(require,module,exports){
var moment = require('moment');
var StringMask = require('string-mask');

function DateMaskDirective($locale) {
	var dateFormatMapByLocalle = {
		'pt-br': 'DD/MM/YYYY',
	};

	var dateFormat = dateFormatMapByLocalle[$locale.id] || 'YYYY-MM-DD';

	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl) {
			var dateMask = new StringMask(dateFormat.replace(/[YMD]/g,'0'));

			function applyMask (value) {
				var cleanValue = value.replace(/[^0-9]/g, '');
				var formatedValue = dateMask.process(cleanValue).result || '';

				return formatedValue.trim().replace(/[^0-9]$/, '');
			}

			function formatter (value) {
				if(ctrl.$isEmpty(value)) {
					return value;
				}

				var formatedValue = applyMask(moment(value).format(dateFormat));
				validator(formatedValue);
				return formatedValue;
			}

			function parser(value) {
				if(ctrl.$isEmpty(value)) {
					validator(value);
					return value;
				}

				var formatedValue = applyMask(value);

				if (ctrl.$viewValue !== formatedValue) {
					ctrl.$setViewValue(formatedValue);
					ctrl.$render();
				}
				validator(formatedValue);

				var modelValue = moment(formatedValue, dateFormat);
				return modelValue.toDate();
			}

			function validator(value) {
				var isValid = moment(value, dateFormat).isValid() &&
					value.length === dateFormat.length;
				ctrl.$setValidity('date', ctrl.$isEmpty(value) || isValid);
			}

			ctrl.$formatters.push(formatter);
			ctrl.$parsers.push(parser);
		}
	};
}
DateMaskDirective.$inject = ['$locale'];

module.exports = DateMaskDirective;

},{"moment":undefined,"string-mask":undefined}],3:[function(require,module,exports){
var m = angular.module('ui.utils.masks.global', [
	require('../helpers'),
])
.directive('uiDateMask', require('./date/date'))
.directive('uiMoneyMask', require('./money/money'))
.directive('uiNumberMask', require('./number/number'))
.directive('uiPercentageMask', require('./percentage/percentage'))
.directive('uiScientificNotationMask', require('./scientific-notation/scientific-notation'))
.directive('uiTimeMask', require('./time/time'));

module.exports = m.name;

},{"../helpers":9,"./date/date":2,"./money/money":4,"./number/number":5,"./percentage/percentage":6,"./scientific-notation/scientific-notation":7,"./time/time":8}],4:[function(require,module,exports){
var StringMask = require('string-mask');

function MoneyMaskDirective($locale, $parse, PreFormatters, NumberValidators) {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, element, attrs, ctrl) {
			var decimalDelimiter = $locale.NUMBER_FORMATS.DECIMAL_SEP,
				thousandsDelimiter = $locale.NUMBER_FORMATS.GROUP_SEP,
				currencySym = $locale.NUMBER_FORMATS.CURRENCY_SYM,
				decimals = $parse(attrs.uiMoneyMask)(scope);

			if (angular.isDefined(attrs.uiHideGroupSep)){
				thousandsDelimiter = '';
			}

			if(isNaN(decimals)) {
				decimals = 2;
			}

			var decimalsPattern = decimals > 0 ? decimalDelimiter + new Array(decimals + 1).join('0') : '';
			var maskPattern = currencySym+' #'+thousandsDelimiter+'##0'+decimalsPattern;
			var moneyMask = new StringMask(maskPattern, {reverse: true});

			function formatter(value) {
				if(ctrl.$isEmpty(value)) {
					return value;
				}

				var valueToFormat = PreFormatters.prepareNumberToFormatter(value, decimals);
				return moneyMask.apply(valueToFormat);
			}

			function parser(value) {
				if (ctrl.$isEmpty(value)) {
					return value;
				}

				var actualNumber = value.replace(/[^\d]+/g,'');
				actualNumber = actualNumber.replace(/^[0]+([1-9])/,'$1');
				var formatedValue = moneyMask.apply(actualNumber);

				if (value !== formatedValue) {
					ctrl.$setViewValue(formatedValue);
					ctrl.$render();
				}

				return formatedValue ? parseInt(formatedValue.replace(/[^\d]+/g,''))/Math.pow(10,decimals) : null;
			}

			ctrl.$formatters.push(formatter);
			ctrl.$parsers.push(parser);

			if (attrs.uiMoneyMask) {
				scope.$watch(attrs.uiMoneyMask, function(decimals) {
					if(isNaN(decimals)) {
						decimals = 2;
					}
					decimalsPattern = decimals > 0 ? decimalDelimiter + new Array(decimals + 1).join('0') : '';
					maskPattern = currencySym+' #'+thousandsDelimiter+'##0'+decimalsPattern;
					moneyMask = new StringMask(maskPattern, {reverse: true});

					parser(ctrl.$viewValue);
				});
			}

			if(attrs.min){
				ctrl.$parsers.push(function(value) {
					var min = $parse(attrs.min)(scope);
					return NumberValidators.minNumber(ctrl, value, min);
				});

				scope.$watch(attrs.min, function(value) {
					NumberValidators.minNumber(ctrl, ctrl.$modelValue, value);
				});
			}

			if(attrs.max) {
				ctrl.$parsers.push(function(value) {
					var max = $parse(attrs.max)(scope);
					return NumberValidators.maxNumber(ctrl, value, max);
				});

				scope.$watch(attrs.max, function(value) {
					NumberValidators.maxNumber(ctrl, ctrl.$modelValue, value);
				});
			}
		}
	};
}
MoneyMaskDirective.$inject = ['$locale', '$parse', 'PreFormatters', 'NumberValidators'];

module.exports = MoneyMaskDirective;

},{"string-mask":undefined}],5:[function(require,module,exports){
function NumberMaskDirective($locale, $parse, PreFormatters, NumberMasks, NumberValidators) {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, element, attrs, ctrl) {
			var decimalDelimiter = $locale.NUMBER_FORMATS.DECIMAL_SEP,
				thousandsDelimiter = $locale.NUMBER_FORMATS.GROUP_SEP,
				decimals = $parse(attrs.uiNumberMask)(scope);

			if (angular.isDefined(attrs.uiHideGroupSep)){
				thousandsDelimiter = '';
			}

			if(isNaN(decimals)) {
				decimals = 2;
			}

			var viewMask = NumberMasks.viewMask(decimals, decimalDelimiter, thousandsDelimiter),
				modelMask = NumberMasks.modelMask(decimals);

			function parser(value) {
				if(ctrl.$isEmpty(value)) {
					return value;
				}

				var valueToFormat = PreFormatters.clearDelimitersAndLeadingZeros(value) || '0';
				var formatedValue = viewMask.apply(valueToFormat);
				var actualNumber = parseFloat(modelMask.apply(valueToFormat));

				if(angular.isDefined(attrs.uiNegativeNumber)){
					var isNegative = (value[0] === '-'),
						needsToInvertSign = (value.slice(-1) === '-');

					//only apply the minus sign if it is negative or(exclusive)
					//needs to be negative and the number is different from zero
					if(needsToInvertSign ^ isNegative && !!actualNumber) {
						actualNumber *= -1;
						formatedValue = '-' + formatedValue;
					}
				}

				if (ctrl.$viewValue !== formatedValue) {
					ctrl.$setViewValue(formatedValue);
					ctrl.$render();
				}

				return actualNumber;
			}

			function formatter(value) {
				if(ctrl.$isEmpty(value)) {
					return value;
				}

				var prefix = '';
				if(angular.isDefined(attrs.uiNegativeNumber) && value < 0){
					prefix = '-';
				}

				var valueToFormat = PreFormatters.prepareNumberToFormatter(value, decimals);
				return prefix + viewMask.apply(valueToFormat);
			}

			ctrl.$formatters.push(formatter);
			ctrl.$parsers.push(parser);

			if (attrs.uiNumberMask) {
				scope.$watch(attrs.uiNumberMask, function(decimals) {
					if(isNaN(decimals)) {
						decimals = 2;
					}
					viewMask = NumberMasks.viewMask(decimals, decimalDelimiter, thousandsDelimiter);
					modelMask = NumberMasks.modelMask(decimals);

					parser(ctrl.$viewValue);
				});
			}

			if(attrs.min){
				ctrl.$parsers.push(function(value) {
					var min = $parse(attrs.min)(scope);
					return NumberValidators.minNumber(ctrl, value, min);
				});

				scope.$watch(attrs.min, function(value) {
					NumberValidators.minNumber(ctrl, ctrl.$modelValue, value);
				});
			}

			if(attrs.max) {
				ctrl.$parsers.push(function(value) {
					var max = $parse(attrs.max)(scope);
					return NumberValidators.maxNumber(ctrl, value, max);
				});

				scope.$watch(attrs.max, function(value) {
					NumberValidators.maxNumber(ctrl, ctrl.$modelValue, value);
				});
			}
		}
	};
}
NumberMaskDirective.$inject = ['$locale', '$parse', 'PreFormatters', 'NumberMasks', 'NumberValidators'];

module.exports = NumberMaskDirective;

},{}],6:[function(require,module,exports){
function PercentageMaskDirective($locale, $parse, PreFormatters, NumberMasks, NumberValidators) {
	function preparePercentageToFormatter (value, decimals, modelMultiplier) {
		return PreFormatters.clearDelimitersAndLeadingZeros((parseFloat(value)*modelMultiplier).toFixed(decimals));
	}

	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, element, attrs, ctrl) {
			var decimalDelimiter = $locale.NUMBER_FORMATS.DECIMAL_SEP,
				thousandsDelimiter = $locale.NUMBER_FORMATS.GROUP_SEP,
				decimals = parseInt(attrs.uiPercentageMask);

			var modelValue = {
				multiplier : 100,
				decimalMask: 2 
			};

			if (angular.isDefined(attrs.uiHideGroupSep)){
				thousandsDelimiter = '';
			}

			if (angular.isDefined(attrs.uiPercentageValue)) {
				modelValue.multiplier  = 1;
				modelValue.decimalMask = 0;
			}

			if(isNaN(decimals)) {
				decimals = 2;
			}

			var numberDecimals = decimals + modelValue.decimalMask;
			var viewMask = NumberMasks.viewMask(decimals, decimalDelimiter, thousandsDelimiter),
				modelMask = NumberMasks.modelMask(numberDecimals);

			function formatter(value) {
				if(ctrl.$isEmpty(value)) {
					return value;
				}

				var valueToFormat = preparePercentageToFormatter(value, decimals, modelValue.multiplier);
				return viewMask.apply(valueToFormat) + ' %';
			}

			function parse(value) {
				if(ctrl.$isEmpty(value)) {
					return value;
				}

				var valueToFormat = PreFormatters.clearDelimitersAndLeadingZeros(value) || '0';
				if(value.length > 1 && value.indexOf('%') === -1) {
					valueToFormat = valueToFormat.slice(0,valueToFormat.length-1);
				}
				var formatedValue = viewMask.apply(valueToFormat) + ' %';
				var actualNumber = parseFloat(modelMask.apply(valueToFormat));

				if (ctrl.$viewValue !== formatedValue) {
					ctrl.$setViewValue(formatedValue);
					ctrl.$render();
				}

				return actualNumber;
			}

			ctrl.$formatters.push(formatter);
			ctrl.$parsers.push(parse);

			if (attrs.uiPercentageMask) {
				scope.$watch(attrs.uiPercentageMask, function(decimals) {
					if(isNaN(decimals)) {
						decimals = 2;
					}
					
					if (angular.isDefined(attrs.uiPercentageValue)) {
						modelValue.multiplier  = 1;
						modelValue.decimalMask = 0;
					}

					numberDecimals = decimals + modelValue.decimalMask;
					viewMask = NumberMasks.viewMask(decimals, decimalDelimiter, thousandsDelimiter);
					modelMask = NumberMasks.modelMask(numberDecimals);

					parse(ctrl.$viewValue);
				});
			}

			if(attrs.min){
				ctrl.$parsers.push(function(value) {
					var min = $parse(attrs.min)(scope);
					return NumberValidators.minNumber(ctrl, value, min);
				});

				scope.$watch('min', function(value) {
					NumberValidators.minNumber(ctrl, ctrl.$modelValue, value);
				});
			}

			if(attrs.max) {
				ctrl.$parsers.push(function(value) {
					var max = $parse(attrs.max)(scope);
					return NumberValidators.maxNumber(ctrl, value, max);
				});

				scope.$watch('max', function(value) {
					NumberValidators.maxNumber(ctrl, ctrl.$modelValue, value);
				});
			}
		}
	};
}
PercentageMaskDirective.$inject = ['$locale', '$parse', 'PreFormatters', 'NumberMasks', 'NumberValidators'];

module.exports = PercentageMaskDirective;

},{}],7:[function(require,module,exports){
var StringMask = require('string-mask');

function ScientificNotationMaskDirective($locale, $parse) {
	var decimalDelimiter = $locale.NUMBER_FORMATS.DECIMAL_SEP,
		defaultPrecision = 2;

	function significandMaskBuilder (decimals) {
		var mask = '0';

		if(decimals > 0) {
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

			if(isNaN(decimals)) {
				decimals = defaultPrecision;
			}

			var significandMask = significandMaskBuilder(decimals);

			function splitNumber (value) {
				var stringValue = value.toString(),
					splittedNumber = stringValue.match(/(-?[0-9]*)[\.]?([0-9]*)?[Ee]?([\+-]?[0-9]*)?/);

				return {
					integerPartOfSignificand: splittedNumber[1],
					decimalPartOfSignificand: splittedNumber[2],
					exponent: splittedNumber[3] | 0
				};
			}

			function formatter (value) {
				if (ctrl.$isEmpty(value)) {
					return value;
				}

				if (typeof value === 'string') {
					value = value.replace(decimalDelimiter, '.');
				} else if (typeof value === 'number') {
					value = value.toExponential(decimals);
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

				return formattedValue;
			}

			function parser (value) {
				if(ctrl.$isEmpty(value)) {
					return value;
				}

				var viewValue = formatter(value),
					modelValue = parseFloat(viewValue.replace(decimalDelimiter, '.'));

				if (ctrl.$viewValue !== viewValue) {
					ctrl.$setViewValue(viewValue);
					ctrl.$render();
				}

				return modelValue;
			}

			function validator (value) {
				if(ctrl.$isEmpty(value)) {
					return value;
				}

				var isMaxValid = value < Number.MAX_VALUE;
				ctrl.$setValidity('max', isMaxValid);
				return value;
			}

			ctrl.$formatters.push(formatter);
			ctrl.$formatters.push(validator);
			ctrl.$parsers.push(parser);
			ctrl.$parsers.push(validator);
		}
	};
}
ScientificNotationMaskDirective.$inject = ['$locale', '$parse'];

module.exports = ScientificNotationMaskDirective;

},{"string-mask":undefined}],8:[function(require,module,exports){
var StringMask = require('string-mask');

function TimeMaskDirective() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl) {
			var unformattedValueLength = 6,
				formattedValueLength = 8,
				timeFormat = '00:00:00';

			if (angular.isDefined(attrs.uiTimeMask) && attrs.uiTimeMask === 'short') {
				unformattedValueLength = 4;
				formattedValueLength = 5;
				timeFormat = '00:00';
			}

			var timeMask = new StringMask(timeFormat);

			function clearValue(value) {
				return value.replace(/[^0-9]/g, '').slice(0, unformattedValueLength);
			}

			function formatter(value) {
				if (ctrl.$isEmpty(value)) {
					return value;
				}

				var cleanValue = clearValue(value);

				if (cleanValue.length === 0) {
					return '';
				}

				var formattedValue = timeMask.process(cleanValue).result;
				return formattedValue.replace(/[^0-9]$/, '');
			}

			function parser (value) {
				var viewValue = formatter(value);
				var modelValue = viewValue;

				if (ctrl.$viewValue !== viewValue) {
					ctrl.$setViewValue(viewValue);
					ctrl.$render();
				}

				return modelValue;
			}

			function validator (value) {
				if (angular.isUndefined(value)) {
					return value;
				}

				var splittedValue = value.toString().split(/:/).filter(function(v) {
					return !!v;
				});

				var hours = parseInt(splittedValue[0]),
					minutes = parseInt(splittedValue[1]),
					seconds = parseInt(splittedValue[2] || 0);

				var isValid = value.toString().length === formattedValueLength &&
					hours < 24 && minutes < 60 && seconds < 60;

				ctrl.$setValidity('time', ctrl.$isEmpty(value) || isValid);
				return value;
			}

			ctrl.$formatters.push(formatter);
			ctrl.$formatters.push(validator);
			ctrl.$parsers.push(parser);
			ctrl.$parsers.push(validator);
		}
	};
}

module.exports = TimeMaskDirective;

},{"string-mask":undefined}],9:[function(require,module,exports){
var StringMask = require('string-mask');

var m = angular.module('ui.utils.masks.helpers', []);

module.exports = m.name;

m.factory('PreFormatters', [function(){
	function clearDelimitersAndLeadingZeros(value) {
		var cleanValue = value.replace(/^-/,'').replace(/^0*/, '');
		cleanValue = cleanValue.replace(/[^0-9]/g, '');
		return cleanValue;
	}

	function prepareNumberToFormatter (value, decimals) {
		return clearDelimitersAndLeadingZeros((parseFloat(value)).toFixed(decimals));
	}

	return {
		clearDelimitersAndLeadingZeros: clearDelimitersAndLeadingZeros,
		prepareNumberToFormatter: prepareNumberToFormatter
	};
}])
.factory('NumberValidators', [function() {
	return {
		maxNumber: function maxValidator(ctrl, value, limit) {
			var max = parseFloat(limit);
			var validity = ctrl.$isEmpty(value) || isNaN(max)|| value <= max;
			ctrl.$setValidity('max', validity);
			return value;
		},
		minNumber: function minValidator(ctrl, value, limit) {
			var min = parseFloat(limit);
			var validity = ctrl.$isEmpty(value) || isNaN(min) || value >= min;
			ctrl.$setValidity('min', validity);
			return value;
		}
	};
}])
.factory('NumberMasks', [function(){
	return {
		viewMask: function (decimals, decimalDelimiter, thousandsDelimiter) {
			var mask = '#' + thousandsDelimiter + '##0';

			if(decimals > 0) {
				mask += decimalDelimiter;
				for (var i = 0; i < decimals; i++) {
					mask += '0';
				}
			}

			return new StringMask(mask, {
				reverse: true
			});
		},
		modelMask: function (decimals) {
			var mask = '###0';

			if(decimals > 0) {
				mask += '.';
				for (var i = 0; i < decimals; i++) {
					mask += '0';
				}
			}

			return new StringMask(mask, {
				reverse: true
			});
		}
	};
}]);

},{"string-mask":undefined}],10:[function(require,module,exports){
var StringMask = require('string-mask');
var maskFactory = require('mask-factory');

var phoneMaskUS = new StringMask('(000) 000-0000'),
	phoneMaskINTL = new StringMask('+00-00-000-000000');

module.exports = maskFactory({
	validationErrorKey: 'usPhoneNumber',
	clearValue: function(rawValue) {
		return rawValue.toString().replace(/[^0-9]/g, '');
	},
	format: function(cleanValue) {
		var formattedValue;

		if(cleanValue.length < 11){
			formattedValue = phoneMaskUS.apply(cleanValue) || '';
		}else{
			formattedValue = phoneMaskINTL.apply(cleanValue);
		}

		return formattedValue.trim().replace(/[^0-9]$/, '');
	},
	validate: function(value) {
		return value.length > 9;
	}
});

},{"mask-factory":"mask-factory","string-mask":undefined}],11:[function(require,module,exports){
var m = angular.module('ui.utils.masks.us', [
	require('../helpers')
])
.directive('uiUsPhoneNumber', require('./phone/us-phone'));

module.exports = m.name;

},{"../helpers":9,"./phone/us-phone":10}],"mask-factory":[function(require,module,exports){
module.exports = function maskFactory(maskDefinition) {
	return function MaskDirective() {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attrs, ctrl) {
				function formatter(value) {
					if (ctrl.$isEmpty(value)) {
						return value;
					}

					var cleanValue = maskDefinition.clearValue(value);
					return maskDefinition.format(cleanValue);
				}

				function parser(value) {
					if (ctrl.$isEmpty(value)) {
						return value;
					}

					var cleanValue = maskDefinition.clearValue(value);
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
				}

				function validator(value) {
					var isValid = ctrl.$isEmpty(value) || maskDefinition.validate(value);
					ctrl.$setValidity(maskDefinition.validationErrorKey, isValid);

					return value;
				}

				ctrl.$formatters.push(formatter);
				ctrl.$formatters.push(validator);
				ctrl.$parsers.push(parser);
				ctrl.$parsers.push(validator);
			}
		};
	};
};

},{}]},{},[1]);
