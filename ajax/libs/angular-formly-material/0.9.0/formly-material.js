/*!
 * angular-formly-material JavaScript Library v0.9.0
 * 
 * @license MIT (http://license.angular-formly.com)
 * 
 * built with ♥ by Kamil Kisiela <mys.sterowiec@gmail.com>
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["angular"], factory);
	else if(typeof exports === 'object')
		exports["ngFormlyMaterial"] = factory(require("angular"));
	else
		root["ngFormlyMaterial"] = factory(root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	var _runs = __webpack_require__(2);

	var _runs2 = _interopRequireDefault(_runs);

	var _wrappers = __webpack_require__(4);

	var _wrappers2 = _interopRequireDefault(_wrappers);

	var _types = __webpack_require__(11);

	var _types2 = _interopRequireDefault(_types);

	var ngModuleName = 'formlyMaterial';

	_angular2['default'].module(ngModuleName, ['ngMessages', 'ngMaterial', 'formly']).config(['formlyConfigProvider', function (formlyConfigProvider) {
	    var configs = [_runs2['default'], _wrappers2['default'], _types2['default']];

	    configs.forEach(function (config) {
	        var i = 0;
	        for (; i < config.length; i++) {
	            config[i](formlyConfigProvider);
	        }
	    });
	}]);

	exports['default'] = ngModuleName;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mdThemeManipulator = __webpack_require__(3);

	var _mdThemeManipulator2 = _interopRequireDefault(_mdThemeManipulator);

	exports['default'] = [_mdThemeManipulator2['default']];
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	exports['default'] = function (formlyConfigProvider) {

	    function addIfNotPresent(nodes, attr, val) {
	        angular.forEach(nodes, function (node) {
	            if (!node.getAttribute(attr)) {
	                node.setAttribute(attr, val);
	            }
	        });
	    }

	    function getNgModelNodes(node) {
	        var query = "[ng-model], [data-ng-model]";

	        return node.querySelectorAll(query);
	    }

	    formlyConfigProvider.templateManipulators.preWrapper.push(function (template, options) {
	        if (angular.isDefined(options.templateOptions.theme)) {
	            var node = document.createElement('div');
	            var skip = options.extras && options.extras.skipNgModelAttrsManipulator;

	            if (skip === true) {
	                return template;
	            }
	            node.innerHTML = template;
	            var modelNodes = getNgModelNodes(node);

	            if (!modelNodes || !modelNodes.length) {
	                return template;
	            }

	            addIfNotPresent(modelNodes, 'md-theme', options.templateOptions.theme);

	            return node.innerHTML;
	        }
	        return template;
	    });
	};

	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _inputContainerInputContainer = __webpack_require__(5);

	var _inputContainerInputContainer2 = _interopRequireDefault(_inputContainerInputContainer);

	var _labelLabel = __webpack_require__(7);

	var _labelLabel2 = _interopRequireDefault(_labelLabel);

	var _messagesMessages = __webpack_require__(9);

	var _messagesMessages2 = _interopRequireDefault(_messagesMessages);

	exports['default'] = [_inputContainerInputContainer2['default'], _labelLabel2['default'], _messagesMessages2['default']];
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _inputContainerHtml = __webpack_require__(6);

	var _inputContainerHtml2 = _interopRequireDefault(_inputContainerHtml);

	exports['default'] = function (formlyConfigProvider) {
	    formlyConfigProvider.setWrapper({
	        name: 'inputContainer',
	        template: _inputContainerHtml2['default']
	    });
	};

	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "<md-input-container>\r\n    <formly-transclude></formly-transclude>\r\n</md-input-container>";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _labelHtml = __webpack_require__(8);

	var _labelHtml2 = _interopRequireDefault(_labelHtml);

	exports['default'] = function (formlyConfigProvider) {
	    formlyConfigProvider.setWrapper({
	        name: 'label',
	        template: _labelHtml2['default'],
	        apiCheck: function apiCheck(check) {
	            return {
	                templateOptions: {
	                    label: check.string
	                }
	            };
	        }
	    });
	};

	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "<label for=\"{{id}}\">\r\n    {{to.label}}\r\n    {{to.required ? '*' : ''}}\r\n</label>\r\n<formly-transclude></formly-transclude>\r\n";

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _messagesHtml = __webpack_require__(10);

	var _messagesHtml2 = _interopRequireDefault(_messagesHtml);

	exports['default'] = function (formlyConfigProvider) {
	    formlyConfigProvider.setWrapper({
	        name: 'messages',
	        template: _messagesHtml2['default']
	    });
	};

	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<formly-transclude></formly-transclude>\r\n<div ng-messages=\"fc.$error\">\r\n    <div ng-repeat=\"(name, message) in ::options.validation.messages\"\r\n         ng-message-exp=\"name\">\r\n        {{message(fc.$viewValue, fc.$modelValue, this)}}\r\n    </div>\r\n</div>";

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _checkboxCheckbox = __webpack_require__(12);

	var _checkboxCheckbox2 = _interopRequireDefault(_checkboxCheckbox);

	var _chipsChips = __webpack_require__(14);

	var _chipsChips2 = _interopRequireDefault(_chipsChips);

	var _datepickerDatepicker = __webpack_require__(16);

	var _datepickerDatepicker2 = _interopRequireDefault(_datepickerDatepicker);

	var _inputInput = __webpack_require__(18);

	var _inputInput2 = _interopRequireDefault(_inputInput);

	var _radioRadio = __webpack_require__(20);

	var _radioRadio2 = _interopRequireDefault(_radioRadio);

	var _selectSelect = __webpack_require__(22);

	var _selectSelect2 = _interopRequireDefault(_selectSelect);

	var _sliderSlider = __webpack_require__(24);

	var _sliderSlider2 = _interopRequireDefault(_sliderSlider);

	var _switchSwitch = __webpack_require__(26);

	var _switchSwitch2 = _interopRequireDefault(_switchSwitch);

	var _textareaTextarea = __webpack_require__(28);

	var _textareaTextarea2 = _interopRequireDefault(_textareaTextarea);

	exports['default'] = [_checkboxCheckbox2['default'], _chipsChips2['default'], _datepickerDatepicker2['default'], _inputInput2['default'], _radioRadio2['default'], _selectSelect2['default'], _sliderSlider2['default'], _switchSwitch2['default'], _textareaTextarea2['default']];
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _checkboxHtml = __webpack_require__(13);

	var _checkboxHtml2 = _interopRequireDefault(_checkboxHtml);

	exports['default'] = function (formlyConfigProvider) {
	    formlyConfigProvider.setType({
	        name: 'checkbox',
	        template: _checkboxHtml2['default']
	    });
	};

	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = "<div>\r\n    <md-checkbox ng-model=\"model[options.key]\">\r\n        {{to.label}}\r\n    </md-checkbox>\r\n</div>";

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _chipsHtml = __webpack_require__(15);

	var _chipsHtml2 = _interopRequireDefault(_chipsHtml);

	exports['default'] = function (formlyConfigProvider) {
	    formlyConfigProvider.setType({
	        name: 'chips',
	        template: _chipsHtml2['default'],
	        defaultOptions: {
	            defaultValue: [],
	            ngModelAttrs: {
	                placeholder: { attribute: 'placeholder' },
	                secondaryPlaceholder: { attribute: 'secondary-placeholder' },
	                deleteButtonLabel: { attribute: 'delete-button-label' },
	                deleteHint: { attribute: 'delete-hint' }
	            }
	        },
	        apiCheck: function apiCheck(check) {
	            return {
	                templateOptions: {
	                    placeholder: check.string.optional,
	                    secondaryPlaceholder: check.string.optional,
	                    deleteButtonLabel: check.string.optional,
	                    deleteHint: check.string.optional
	                }
	            };
	        }
	    });
	};

	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = "<md-chips ng-model=\"model[options.key]\"></md-chips>";

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _datepickerHtml = __webpack_require__(17);

	var _datepickerHtml2 = _interopRequireDefault(_datepickerHtml);

	exports['default'] = function (formlyConfigProvider) {
	    formlyConfigProvider.setType({
	        name: 'datepicker',
	        template: _datepickerHtml2['default'],
	        wrapper: ['messages'],
	        defaultOptions: {
	            ngModelAttrs: {
	                placeholder: {
	                    attribute: 'md-placeholder'
	                },
	                minDate: {
	                    bound: 'md-min-date'
	                },
	                maxDate: {
	                    bound: 'md-max-date'
	                },
	                filterDate: {
	                    bound: 'md-date-filter'
	                }
	            }
	        },
	        apiCheck: function apiCheck(check) {
	            return {
	                templateOptions: {
	                    placeholder: check.string.optional,
	                    minDate: check.instanceOf(Date).optional,
	                    maxDate: check.instanceOf(Date).optional,
	                    filterDate: check.func.optional
	                }
	            };
	        }
	    });
	};

	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "<div>\r\n    <md-datepicker ng-model=\"model[options.key]\"></md-datepicker>\r\n</div>";

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _inputHtml = __webpack_require__(19);

	var _inputHtml2 = _interopRequireDefault(_inputHtml);

	exports['default'] = function (formlyConfigProvider) {
	    formlyConfigProvider.setType({
	        name: 'input',
	        template: _inputHtml2['default'],
	        wrapper: ['label', 'messages', 'inputContainer'],
	        defaultOptions: {
	            ngModelAttrs: {
	                mdMaxlength: {
	                    bound: 'md-maxlength'
	                }
	            }
	        }
	    });
	};

	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "<input ng-model=\"model[options.key]\">";

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _radioHtml = __webpack_require__(21);

	var _radioHtml2 = _interopRequireDefault(_radioHtml);

	exports['default'] = function (formlyConfigProvider) {
	    formlyConfigProvider.setType({
	        name: 'radio',
	        template: _radioHtml2['default'],
	        apiCheck: function apiCheck(check) {
	            return {
	                templateOptions: {
	                    options: check.arrayOf(check.object),
	                    labelProp: check.string.optional,
	                    valueProp: check.string.optional
	                }
	            };
	        }
	    });
	};

	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = "<md-radio-group ng-model=\"model[options.key]\">\r\n    <md-radio-button\r\n            ng-repeat=\"option in to.options\"\r\n            ng-value=\"option[to.valueProp || 'value']\">\r\n            {{option[to.labelProp || 'name']}}\r\n    </md-radio-button>\r\n</md-radio-group>";

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _selectHtml = __webpack_require__(23);

	var _selectHtml2 = _interopRequireDefault(_selectHtml);

	exports['default'] = function (formlyConfigProvider) {
	    formlyConfigProvider.setType({
	        name: 'select',
	        template: _selectHtml2['default'],
	        wrapper: ['label', 'messages', 'inputContainer'],
	        defaultOptions: {
	            ngModelAttrs: {
	                multiple: { bound: 'multiple' },
	                onClose: { bound: 'md-on-close' },
	                onOpen: { bound: 'md-on-open' }
	            }
	        },
	        apiCheck: function apiCheck(check) {
	            return {
	                templateOptions: {
	                    options: check.arrayOf(check.object),
	                    multiple: check.bool.optional,
	                    labelProp: check.string.optional,
	                    valueProp: check.string.optional,
	                    onClose: check.func.optional,
	                    onOpen: check.func.optional
	                }
	            };
	        }
	    });
	};

	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = "<md-select ng-model=\"model[options.key]\">\r\n    <md-option ng-repeat=\"option in to.options\" ng-value=\"option[to.valueProp || 'value']\">\r\n        {{ option[to.labelProp || 'name'] }}\r\n    </md-option>\r\n</md-select>";

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _sliderHtml = __webpack_require__(25);

	var _sliderHtml2 = _interopRequireDefault(_sliderHtml);

	exports['default'] = function (formlyConfigProvider) {
	    formlyConfigProvider.setType({
	        name: 'slider',
	        template: _sliderHtml2['default'],
	        defaultOptions: {
	            ngModelAttrs: {
	                min: {
	                    attribute: 'min'
	                },
	                max: {
	                    attribute: 'max'
	                },
	                step: {
	                    attribute: 'step'
	                },
	                discrete: {
	                    bound: 'md-discrete'
	                }
	            }
	        },
	        apiCheck: function apiCheck(check) {
	            return {
	                templateOptions: {
	                    min: check.number.optional,
	                    max: check.number.optional,
	                    step: check.number.optional,
	                    discrete: check.bool.optional
	                }
	            };
	        }
	    });
	};

	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = "<md-slider ng-model=\"model[options.key]\"></md-slider>";

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _switchHtml = __webpack_require__(27);

	var _switchHtml2 = _interopRequireDefault(_switchHtml);

	exports['default'] = function (formlyConfigProvider) {
	    formlyConfigProvider.setType({
	        name: 'switch',
	        template: _switchHtml2['default']
	    });
	};

	module.exports = exports['default'];

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = "<md-switch ng-model=\"model[options.key]\">\r\n    {{to.label}}\r\n</md-switch>";

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _textareaHtml = __webpack_require__(29);

	var _textareaHtml2 = _interopRequireDefault(_textareaHtml);

	exports['default'] = function (formlyConfigProvider) {
	    formlyConfigProvider.setType({
	        name: 'textarea',
	        template: _textareaHtml2['default'],
	        wrapper: ['label', 'messages', 'inputContainer'],
	        defaultOptions: {
	            ngModelAttrs: {
	                rows: { attribute: 'rows' },
	                cols: { attribute: 'cols' }
	            }
	        },
	        apiCheck: function apiCheck(check) {
	            return {
	                templateOptions: {
	                    rows: check.number.optional,
	                    cols: check.number.optional
	                }
	            };
	        }
	    });
	};

	module.exports = exports['default'];

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = "<textarea ng-model=\"model[options.key]\"></textarea>";

/***/ }
/******/ ])
});
;