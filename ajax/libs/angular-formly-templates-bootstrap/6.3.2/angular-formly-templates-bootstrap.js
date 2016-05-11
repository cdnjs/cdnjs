//! angular-formly-templates-bootstrap version 6.3.2 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"), require("angular-formly"), require("api-check"));
	else if(typeof define === 'function' && define.amd)
		define(["angular", "angular-formly", "api-check"], factory);
	else if(typeof exports === 'object')
		exports["ngFormlyTemplatesBootstrap"] = factory(require("angular"), require("angular-formly"), require("api-check"));
	else
		root["ngFormlyTemplatesBootstrap"] = factory(root["angular"], root["ngFormly"], root["apiCheck"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
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

	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var ngModuleName = 'formlyBootstrap';
	var angular = __webpack_require__(2);
	var ngModule = angular.module(ngModuleName, [__webpack_require__(4)]);
	ngModule.constant('formlyBootstrapApiCheck', __webpack_require__(5)({
	  output: {
	    prefix: 'angular-formly-bootstrap'
	  }
	}));
	ngModule.constant('formlyBootstrapVersion', ("6.3.2"));

	__webpack_require__(6)(ngModule);
	__webpack_require__(9)(ngModule);
	__webpack_require__(19)(ngModule);

	exports['default'] = ngModuleName;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// some versions of angular don't export the angular module properly,
	// so we get it from window in this case.
	'use strict';

	var angular = __webpack_require__(3);
	if (!angular.version) {
	  angular = window.angular;
	}
	module.exports = angular;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	exports['default'] = function (ngModule) {
	  ngModule.config(addWrappers);

	  function addWrappers(formlyConfigProvider) {
	    formlyConfigProvider.setWrapper([{
	      name: 'bootstrapLabel',
	      template: __webpack_require__(7),
	      apiCheck: function apiCheck(check) {
	        return {
	          templateOptions: {
	            label: check.string.optional,
	            required: check.bool.optional,
	            labelSrOnly: check.bool.optional
	          }
	        };
	      }
	    }, { name: 'bootstrapHasError', template: __webpack_require__(8) }]);
	  }
	  addWrappers.$inject = ["formlyConfigProvider"];
	};

	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<div>\n  <label for=\"{{id}}\" class=\"control-label {{to.labelSrOnly ? 'sr-only' : ''}}\" ng-if=\"to.label\">\n    {{to.label}}\n    {{to.required ? '*' : ''}}\n  </label>\n  <formly-transclude></formly-transclude>\n</div>\n"

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "<div class=\"form-group\" ng-class=\"{'has-error': showError}\">\n  <formly-transclude></formly-transclude>\n</div>\n"

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	exports['default'] = function (ngModule) {
	  __webpack_require__(10)(ngModule);
	  __webpack_require__(12)(ngModule);
	  __webpack_require__(14)(ngModule);
	  __webpack_require__(15)(ngModule);
	  __webpack_require__(17)(ngModule);
	  __webpack_require__(18)(ngModule);
	};

	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	exports['default'] = function (ngModule) {
	  ngModule.config(addCheckboxType);

	  function addCheckboxType(formlyConfigProvider) {
	    formlyConfigProvider.setType({
	      name: 'checkbox',
	      template: __webpack_require__(11),
	      wrapper: ['bootstrapHasError'],
	      apiCheck: function apiCheck(check) {
	        return {
	          templateOptions: {
	            label: check.string
	          }
	        };
	      }
	    });
	  }
	  addCheckboxType.$inject = ["formlyConfigProvider"];
	};

	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "<div class=\"checkbox\">\n\t<label>\n\t\t<input type=\"checkbox\"\n           class=\"formly-field-checkbox\"\n\t\t       ng-model=\"model[options.key]\">\n\t\t{{to.label}}\n\t\t{{to.required ? '*' : ''}}\n\t</label>\n</div>\n"

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	exports['default'] = function (ngModule) {
	  ngModule.config(addCheckboxType);

	  function addCheckboxType(formlyConfigProvider) {
	    formlyConfigProvider.setType({
	      name: 'multiCheckbox',
	      template: __webpack_require__(13),
	      wrapper: ['bootstrapLabel', 'bootstrapHasError'],
	      apiCheck: function apiCheck(check) {
	        return {
	          templateOptions: {
	            options: check.arrayOf(check.object),
	            labelProp: check.string.optional,
	            valueProp: check.string.optional
	          }
	        };
	      },
	      defaultOptions: {
	        noFormControl: false,
	        ngModelAttrs: {
	          required: {
	            attribute: '',
	            bound: ''
	          }
	        }
	      },
	      controller: /* @ngInject */["$scope", function controller($scope) {
	        var to = $scope.to;
	        var opts = $scope.options;
	        $scope.multiCheckbox = {
	          checked: [],
	          change: setModel
	        };

	        // initialize the checkboxes check property
	        $scope.$watch('model', function modelWatcher(newModelValue) {
	          var modelValue, valueProp;

	          if (Object.keys(newModelValue).length) {
	            modelValue = newModelValue[opts.key];

	            $scope.$watch('to.options', function optionsWatcher(newOptionsValues) {
	              if (newOptionsValues && Array.isArray(newOptionsValues) && Array.isArray(modelValue)) {
	                valueProp = to.valueProp || 'value';
	                for (var index = 0; index < newOptionsValues.length; index++) {
	                  $scope.multiCheckbox.checked[index] = modelValue.indexOf(newOptionsValues[index][valueProp]) !== -1;
	                }
	              }
	            });
	          }
	        }, true);

	        function checkValidity(expressionValue) {
	          var valid;

	          if ($scope.to.required) {
	            valid = angular.isArray($scope.model[opts.key]) && $scope.model[opts.key].length > 0 && expressionValue;

	            $scope.fc.$setValidity('required', valid);
	          }
	        }

	        function setModel() {
	          $scope.model[opts.key] = [];
	          angular.forEach($scope.multiCheckbox.checked, function (checkbox, index) {
	            if (checkbox) {
	              $scope.model[opts.key].push(to.options[index][to.valueProp || 'value']);
	            }
	          });

	          // Must make sure we mark as touched because only the last checkbox due to a bug in angular.
	          $scope.fc.$setTouched();
	          checkValidity(true);

	          if ($scope.to.onChange) {
	            $scope.to.onChange();
	          }
	        }

	        if (opts.expressionProperties && opts.expressionProperties['templateOptions.required']) {
	          $scope.$watch(function () {
	            return $scope.to.required;
	          }, function (newValue) {
	            checkValidity(newValue);
	          });
	        }

	        if ($scope.to.required) {
	          var unwatchFormControl = $scope.$watch('fc', function (newValue) {
	            if (!newValue) {
	              return;
	            }
	            checkValidity(true);
	            unwatchFormControl();
	          });
	        }
	      }]
	    });
	  }
	  addCheckboxType.$inject = ["formlyConfigProvider"];
	};

	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = "<div class=\"radio-group\">\n  <div ng-repeat=\"(key, option) in to.options\" class=\"checkbox\">\n    <label>\n      <input type=\"checkbox\"\n             id=\"{{id + '_'+ $index}}\"\n             ng-model=\"multiCheckbox.checked[$index]\"\n             ng-change=\"multiCheckbox.change()\">\n      {{option[to.labelProp || 'name']}}\n    </label>\n  </div>\n</div>\n"

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	exports['default'] = function (ngModule) {
	  ngModule.config(addInputType);

	  function addInputType(formlyConfigProvider) {
	    formlyConfigProvider.setType({
	      name: 'input',
	      template: '<input class="form-control" ng-model="model[options.key]">',
	      wrapper: ['bootstrapLabel', 'bootstrapHasError']
	    });
	  }
	  addInputType.$inject = ["formlyConfigProvider"];
	};

	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	exports['default'] = function (ngModule) {
	  ngModule.config(addRadioType);

	  function addRadioType(formlyConfigProvider) {
	    formlyConfigProvider.setType({
	      name: 'radio',
	      template: __webpack_require__(16),
	      wrapper: ['bootstrapLabel', 'bootstrapHasError'],
	      defaultOptions: {
	        noFormControl: false
	      },
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
	  }
	  addRadioType.$inject = ["formlyConfigProvider"];
	};

	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "<div class=\"radio-group\">\n  <div ng-repeat=\"(key, option) in to.options\" class=\"radio\">\n    <label>\n      <input type=\"radio\"\n             id=\"{{id + '_'+ $index}}\"\n             tabindex=\"0\"\n             ng-value=\"option[to.valueProp || 'value']\"\n             ng-model=\"model[options.key]\">\n      {{option[to.labelProp || 'name']}}\n    </label>\n  </div>\n</div>\n"

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	exports['default'] = function (ngModule) {
	  ngModule.config(addSelectType);

	  var template = '<select class="form-control" ng-model="model[options.key]"></select>';

	  function addSelectType(formlyConfigProvider) {
	    formlyConfigProvider.setType({
	      name: 'select',
	      template: template,
	      wrapper: ['bootstrapLabel', 'bootstrapHasError'],
	      defaultOptions: function defaultOptions(options) {
	        /* jshint maxlen:195 */
	        var ngOptions = options.templateOptions.ngOptions || 'option[to.valueProp || \'value\'] as option[to.labelProp || \'name\'] group by option[to.groupProp || \'group\'] for option in to.options';
	        return {
	          ngModelAttrs: _defineProperty({}, ngOptions, {
	            value: options.templateOptions.optionsAttr || 'ng-options'
	          })
	        };
	      },
	      apiCheck: function apiCheck(check) {
	        return {
	          templateOptions: {
	            options: check.arrayOf(check.object),
	            optionsAttr: check.string.optional,
	            labelProp: check.string.optional,
	            valueProp: check.string.optional,
	            groupProp: check.string.optional
	          }
	        };
	      }
	    });
	  }
	  addSelectType.$inject = ["formlyConfigProvider"];
	};

	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	exports['default'] = function (ngModule) {
	  ngModule.config(addTextareaType);

	  function addTextareaType(formlyConfigProvider) {
	    formlyConfigProvider.setType({
	      name: 'textarea',
	      template: '<textarea class="form-control" ng-model="model[options.key]"></textarea>',
	      wrapper: ['bootstrapLabel', 'bootstrapHasError'],
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
	  }
	  addTextareaType.$inject = ["formlyConfigProvider"];
	};

	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _addons = __webpack_require__(20);

	var _addons2 = _interopRequireDefault(_addons);

	var _description = __webpack_require__(22);

	var _description2 = _interopRequireDefault(_description);

	exports['default'] = function (ngModule) {
	  (0, _addons2['default'])(ngModule);
	  (0, _description2['default'])(ngModule);
	};

	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	exports['default'] = function (ngModule) {
	  ngModule.run(addAddonsManipulator);

	  function addAddonsManipulator(formlyConfig, formlyBootstrapApiCheck) {
	    var addonTemplate = __webpack_require__(21);
	    var addonChecker = formlyBootstrapApiCheck.shape({
	      'class': formlyBootstrapApiCheck.string.optional,
	      text: formlyBootstrapApiCheck.string.optional,
	      onClick: formlyBootstrapApiCheck.func.optional
	    }).strict.optional;
	    var api = formlyBootstrapApiCheck.shape({
	      templateOptions: formlyBootstrapApiCheck.shape({
	        addonLeft: addonChecker,
	        addonRight: addonChecker
	      })
	    });
	    formlyConfig.templateManipulators.preWrapper.push(function (template, options) {
	      if (!options.templateOptions.addonLeft && !options.templateOptions.addonRight) {
	        return template;
	      }
	      formlyBootstrapApiCheck.warn([api], [options]);
	      return addonTemplate.replace('<formly-transclude></formly-transclude>', template);
	    });
	  }
	  addAddonsManipulator.$inject = ["formlyConfig", "formlyBootstrapApiCheck"];
	};

	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = "<div ng-class=\"{'input-group': to.addonLeft || to.addonRight}\">\n    <div class=\"input-group-addon\"\n         ng-if=\"to.addonLeft\"\n         ng-style=\"{cursor: to.addonLeft.onClick ? 'pointer' : 'inherit'}\"\n         ng-click=\"to.addonLeft.onClick(options, this, $event)\">\n        <i class=\"{{to.addonLeft.class}}\" ng-if=\"to.addonLeft.class\"></i>\n        <span ng-if=\"to.addonLeft.text\">{{to.addonLeft.text}}</span>\n    </div>\n    <formly-transclude></formly-transclude>\n    <div class=\"input-group-addon\"\n         ng-if=\"to.addonRight\"\n         ng-style=\"{cursor: to.addonRight.onClick ? 'pointer' : 'inherit'}\"\n         ng-click=\"to.addonRight.onClick(options, this, $event)\">\n        <i class=\"{{to.addonRight.class}}\" ng-if=\"to.addonRight.class\"></i>\n        <span ng-if=\"to.addonRight.text\">{{to.addonRight.text}}</span>\n    </div>\n</div>\n"

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	exports['default'] = function (ngModule) {
	  ngModule.run(addDescriptionManipulator);

	  function addDescriptionManipulator(formlyConfig) {
	    formlyConfig.templateManipulators.preWrapper.push(function ariaDescribedBy(template, options, scope) {
	      if (angular.isDefined(options.templateOptions.description)) {
	        var el = document.createElement('div');
	        el.appendChild(angular.element(template)[0]);
	        el.appendChild(angular.element('<p id="' + scope.id + '_description"' + 'class="help-block"' + 'ng-if="to.description">' + '{{to.description}}' + '</p>')[0]);
	        var modelEls = angular.element(el.querySelectorAll('[ng-model]'));
	        if (modelEls) {
	          modelEls.attr('aria-describedby', scope.id + '_description');
	        }
	        return el.innerHTML;
	      } else {
	        return template;
	      }
	    });
	  }
	  addDescriptionManipulator.$inject = ["formlyConfig"];
	};

	module.exports = exports['default'];

/***/ }
/******/ ])
});
;