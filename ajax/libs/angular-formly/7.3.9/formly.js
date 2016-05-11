/*!
* angular-formly JavaScript Library v7.3.9
*
* @license MIT (http://license.angular-formly.com)
*
* built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us>
* (ó ì_í)=óò=(ì_í ò)
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"), require("api-check"));
	else if(typeof define === 'function' && define.amd)
		define(["angular", "api-check"], factory);
	else if(typeof exports === 'object')
		exports["ngFormly"] = factory(require("angular"), require("api-check"));
	else
		root["ngFormly"] = factory(root["angular"], root["apiCheck"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_5__) {
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

	var _indexCommon = __webpack_require__(1);

	var _indexCommon2 = _interopRequireDefault(_indexCommon);

	exports['default'] = _indexCommon2['default'];
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _angularFix = __webpack_require__(2);

	var _angularFix2 = _interopRequireDefault(_angularFix);

	var _providersFormlyApiCheck = __webpack_require__(4);

	var _providersFormlyApiCheck2 = _interopRequireDefault(_providersFormlyApiCheck);

	var _otherDocsBaseUrl = __webpack_require__(6);

	var _otherDocsBaseUrl2 = _interopRequireDefault(_otherDocsBaseUrl);

	var _providersFormlyUsability = __webpack_require__(7);

	var _providersFormlyUsability2 = _interopRequireDefault(_providersFormlyUsability);

	var _providersFormlyConfig = __webpack_require__(8);

	var _providersFormlyConfig2 = _interopRequireDefault(_providersFormlyConfig);

	var _providersFormlyValidationMessages = __webpack_require__(10);

	var _providersFormlyValidationMessages2 = _interopRequireDefault(_providersFormlyValidationMessages);

	var _servicesFormlyUtil = __webpack_require__(11);

	var _servicesFormlyUtil2 = _interopRequireDefault(_servicesFormlyUtil);

	var _servicesFormlyWarn = __webpack_require__(12);

	var _servicesFormlyWarn2 = _interopRequireDefault(_servicesFormlyWarn);

	var _directivesFormlyCustomValidation = __webpack_require__(13);

	var _directivesFormlyCustomValidation2 = _interopRequireDefault(_directivesFormlyCustomValidation);

	var _directivesFormlyField = __webpack_require__(14);

	var _directivesFormlyField2 = _interopRequireDefault(_directivesFormlyField);

	var _directivesFormlyFocus = __webpack_require__(15);

	var _directivesFormlyFocus2 = _interopRequireDefault(_directivesFormlyFocus);

	var _directivesFormlyForm = __webpack_require__(16);

	var _directivesFormlyForm2 = _interopRequireDefault(_directivesFormlyForm);

	var _runFormlyNgModelAttrsManipulator = __webpack_require__(17);

	var _runFormlyNgModelAttrsManipulator2 = _interopRequireDefault(_runFormlyNgModelAttrsManipulator);

	var _runFormlyCustomTags = __webpack_require__(18);

	var _runFormlyCustomTags2 = _interopRequireDefault(_runFormlyCustomTags);

	var ngModuleName = 'formly';

	exports['default'] = ngModuleName;

	var ngModule = _angularFix2['default'].module(ngModuleName, []);

	ngModule.constant('formlyApiCheck', _providersFormlyApiCheck2['default']);
	ngModule.constant('formlyErrorAndWarningsUrlPrefix', _otherDocsBaseUrl2['default']);
	ngModule.constant('formlyVersion', ("7.3.9")); // <-- webpack variable

	ngModule.provider('formlyUsability', _providersFormlyUsability2['default']);
	ngModule.provider('formlyConfig', _providersFormlyConfig2['default']);

	ngModule.factory('formlyValidationMessages', _providersFormlyValidationMessages2['default']);
	ngModule.factory('formlyUtil', _servicesFormlyUtil2['default']);
	ngModule.factory('formlyWarn', _servicesFormlyWarn2['default']);

	ngModule.directive('formlyCustomValidation', _directivesFormlyCustomValidation2['default']);
	ngModule.directive('formlyField', _directivesFormlyField2['default']);
	ngModule.directive('formlyFocus', _directivesFormlyFocus2['default']);
	ngModule.directive('formlyForm', _directivesFormlyForm2['default']);

	ngModule.run(_runFormlyNgModelAttrsManipulator2['default']);
	ngModule.run(_runFormlyCustomTags2['default']);
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// some versions of angular don't export the angular module properly,
	// so we get it from window in this case.
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var angular = __webpack_require__(3);

	/* istanbul ignore next */
	if (!angular.version) {
	  angular = window.angular;
	}
	exports['default'] = angular;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _angularFix = __webpack_require__(2);

	var _angularFix2 = _interopRequireDefault(_angularFix);

	var _apiCheck = __webpack_require__(5);

	var _apiCheck2 = _interopRequireDefault(_apiCheck);

	var apiCheck = (0, _apiCheck2['default'])({
	  output: {
	    prefix: 'angular-formly:',
	    docsBaseUrl: __webpack_require__(6)
	  }
	});

	function shapeRequiredIfNot(otherProps, propChecker) {
	  if (!_angularFix2['default'].isArray(otherProps)) {
	    otherProps = [otherProps];
	  }
	  var type = 'specified if these are not specified: `' + otherProps.join(', ') + '` (otherwise it\'s optional)';

	  function shapeRequiredIfNotDefinition(prop, propName, location, obj) {
	    var propExists = obj && obj.hasOwnProperty(propName);
	    var otherPropsExist = otherProps.some(function (otherProp) {
	      return obj && obj.hasOwnProperty(otherProp);
	    });
	    if (!otherPropsExist && !propExists) {
	      return apiCheck.utils.getError(propName, location, type);
	    } else if (propExists) {
	      return propChecker(prop, propName, location, obj);
	    }
	  }

	  shapeRequiredIfNotDefinition.type = type;
	  return apiCheck.utils.checkerHelpers.setupChecker(shapeRequiredIfNotDefinition);
	}

	var formlyExpression = apiCheck.oneOfType([apiCheck.string, apiCheck.func]);
	var specifyWrapperType = apiCheck.typeOrArrayOf(apiCheck.string).nullable;

	var apiCheckProperty = apiCheck.func;

	var apiCheckInstanceProperty = apiCheck.shape.onlyIf('apiCheck', apiCheck.func.withProperties({
	  warn: apiCheck.func,
	  'throw': apiCheck.func,
	  shape: apiCheck.func
	}));

	var apiCheckFunctionProperty = apiCheck.shape.onlyIf('apiCheck', apiCheck.oneOf(['throw', 'warn']));

	var formlyWrapperType = apiCheck.shape({
	  name: shapeRequiredIfNot('types', apiCheck.string).optional,
	  template: apiCheck.shape.ifNot('templateUrl', apiCheck.string).optional,
	  templateUrl: apiCheck.shape.ifNot('template', apiCheck.string).optional,
	  types: apiCheck.typeOrArrayOf(apiCheck.string).optional,
	  overwriteOk: apiCheck.bool.optional,
	  apiCheck: apiCheckProperty.optional,
	  apiCheckInstance: apiCheckInstanceProperty.optional,
	  apiCheckFunction: apiCheckFunctionProperty.optional,
	  apiCheckOptions: apiCheck.object.optional
	}).strict;

	var expressionProperties = apiCheck.objectOf(apiCheck.oneOfType([formlyExpression, apiCheck.shape({
	  expression: formlyExpression,
	  message: formlyExpression.optional
	}).strict]));

	var modelChecker = apiCheck.oneOfType([apiCheck.string, apiCheck.object]);

	var templateManipulators = apiCheck.shape({
	  preWrapper: apiCheck.arrayOf(apiCheck.func).nullable.optional,
	  postWrapper: apiCheck.arrayOf(apiCheck.func).nullable.optional
	}).strict.nullable;

	var validatorChecker = apiCheck.objectOf(apiCheck.oneOfType([formlyExpression, apiCheck.shape({
	  expression: formlyExpression,
	  message: formlyExpression.optional
	}).strict]));

	var fieldOptionsApiShape = {
	  $$hashKey: apiCheck.any.optional,
	  type: apiCheck.shape.ifNot(['template', 'templateUrl'], apiCheck.string).optional,
	  template: apiCheck.shape.ifNot(['type', 'templateUrl'], apiCheck.oneOfType([apiCheck.string, apiCheck.func])).optional,
	  templateUrl: apiCheck.shape.ifNot(['type', 'template'], apiCheck.oneOfType([apiCheck.string, apiCheck.func])).optional,
	  key: apiCheck.oneOfType([apiCheck.string, apiCheck.number]).optional,
	  model: modelChecker.optional,
	  originalModel: modelChecker.optional,
	  className: apiCheck.string.optional,
	  id: apiCheck.string.optional,
	  name: apiCheck.string.optional,
	  expressionProperties: expressionProperties.optional,
	  extras: apiCheck.shape({
	    validateOnModelChange: apiCheck.bool.optional,
	    skipNgModelAttrsManipulator: apiCheck.oneOfType([apiCheck.string, apiCheck.bool]).optional
	  }).strict.optional,
	  data: apiCheck.object.optional,
	  templateOptions: apiCheck.object.optional,
	  wrapper: specifyWrapperType.optional,
	  modelOptions: apiCheck.shape({
	    updateOn: apiCheck.string.optional,
	    debounce: apiCheck.oneOfType([apiCheck.objectOf(apiCheck.number), apiCheck.number]).optional,
	    allowInvalid: apiCheck.bool.optional,
	    getterSetter: apiCheck.bool.optional,
	    timezone: apiCheck.string.optional
	  }).optional,
	  watcher: apiCheck.typeOrArrayOf(apiCheck.shape({
	    expression: formlyExpression.optional,
	    listener: formlyExpression
	  })).optional,
	  validators: validatorChecker.optional,
	  asyncValidators: validatorChecker.optional,
	  parsers: apiCheck.arrayOf(formlyExpression).optional,
	  formatters: apiCheck.arrayOf(formlyExpression).optional,
	  noFormControl: apiCheck.bool.optional,
	  hide: apiCheck.bool.optional,
	  hideExpression: formlyExpression.optional,
	  ngModelElAttrs: apiCheck.objectOf(apiCheck.string).optional,
	  ngModelAttrs: apiCheck.objectOf(apiCheck.shape({
	    statement: apiCheck.shape.ifNot(['value', 'attribute', 'bound', 'boolean'], apiCheck.any).optional,
	    value: apiCheck.shape.ifNot('statement', apiCheck.any).optional,
	    attribute: apiCheck.shape.ifNot('statement', apiCheck.any).optional,
	    bound: apiCheck.shape.ifNot('statement', apiCheck.any).optional,
	    boolean: apiCheck.shape.ifNot('statement', apiCheck.any).optional
	  }).strict).optional,
	  elementAttributes: apiCheck.objectOf(apiCheck.string).optional,
	  optionsTypes: apiCheck.typeOrArrayOf(apiCheck.string).optional,
	  link: apiCheck.func.optional,
	  controller: apiCheck.oneOfType([apiCheck.string, apiCheck.func, apiCheck.array]).optional,
	  validation: apiCheck.shape({
	    show: apiCheck.bool.nullable.optional,
	    messages: apiCheck.objectOf(formlyExpression).optional,
	    errorExistsAndShouldBeVisible: apiCheck.bool.optional
	  }).optional,
	  formControl: apiCheck.typeOrArrayOf(apiCheck.object).optional,
	  value: apiCheck.func.optional,
	  runExpressions: apiCheck.func.optional,
	  templateManipulators: templateManipulators.optional,
	  resetModel: apiCheck.func.optional,
	  updateInitialValue: apiCheck.func.optional,
	  initialValue: apiCheck.any.optional,
	  defaultValue: apiCheck.any.optional
	};

	var formlyFieldOptions = apiCheck.shape(fieldOptionsApiShape).strict;

	var formOptionsApi = apiCheck.shape({
	  formState: apiCheck.object.optional,
	  resetModel: apiCheck.func.optional,
	  updateInitialValue: apiCheck.func.optional,
	  removeChromeAutoComplete: apiCheck.bool.optional,
	  templateManipulators: templateManipulators.optional,
	  wrapper: specifyWrapperType.optional,
	  fieldTransform: apiCheck.oneOfType([apiCheck.func, apiCheck.array]).optional,
	  data: apiCheck.object.optional
	}).strict;

	var fieldGroup = apiCheck.shape({
	  $$hashKey: apiCheck.any.optional,
	  key: apiCheck.oneOfType([apiCheck.string, apiCheck.number]).optional,
	  // danger. Nested field groups wont get api-checked...
	  fieldGroup: apiCheck.arrayOf(apiCheck.oneOfType([formlyFieldOptions, apiCheck.object])),
	  className: apiCheck.string.optional,
	  options: formOptionsApi.optional,
	  templateOptions: apiCheck.object.optional,
	  wrapper: specifyWrapperType.optional,
	  hide: apiCheck.bool.optional,
	  hideExpression: formlyExpression.optional,
	  data: apiCheck.object.optional,
	  model: modelChecker.optional,
	  form: apiCheck.object.optional,
	  elementAttributes: apiCheck.objectOf(apiCheck.string).optional
	}).strict;

	var typeOptionsDefaultOptions = _angularFix2['default'].copy(fieldOptionsApiShape);
	typeOptionsDefaultOptions.key = apiCheck.string.optional;

	var formlyTypeOptions = apiCheck.shape({
	  name: apiCheck.string,
	  template: apiCheck.shape.ifNot('templateUrl', apiCheck.oneOfType([apiCheck.string, apiCheck.func])).optional,
	  templateUrl: apiCheck.shape.ifNot('template', apiCheck.oneOfType([apiCheck.string, apiCheck.func])).optional,
	  controller: apiCheck.oneOfType([apiCheck.func, apiCheck.string, apiCheck.array]).optional,
	  link: apiCheck.func.optional,
	  defaultOptions: apiCheck.oneOfType([apiCheck.func, apiCheck.shape(typeOptionsDefaultOptions)]).optional,
	  'extends': apiCheck.string.optional,
	  wrapper: specifyWrapperType.optional,
	  data: apiCheck.object.optional,
	  apiCheck: apiCheckProperty.optional,
	  apiCheckInstance: apiCheckInstanceProperty.optional,
	  apiCheckFunction: apiCheckFunctionProperty.optional,
	  apiCheckOptions: apiCheck.object.optional,
	  overwriteOk: apiCheck.bool.optional
	}).strict;

	_angularFix2['default'].extend(apiCheck, {
	  formlyTypeOptions: formlyTypeOptions, formlyFieldOptions: formlyFieldOptions, formlyExpression: formlyExpression, formlyWrapperType: formlyWrapperType, fieldGroup: fieldGroup, formOptionsApi: formOptionsApi
	});

	exports['default'] = apiCheck;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = "https://github.com/formly-js/angular-formly/blob/" + ("7.3.9") + "/other/ERRORS_AND_WARNINGS.md#";
	module.exports = exports["default"];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _angularFix = __webpack_require__(2);

	var _angularFix2 = _interopRequireDefault(_angularFix);

	exports['default'] = formlyUsability;

	// @ngInject
	function formlyUsability(formlyApiCheck, formlyErrorAndWarningsUrlPrefix) {
	  var _this = this;

	  _angularFix2['default'].extend(this, {
	    getFormlyError: getFormlyError,
	    getFieldError: getFieldError,
	    checkWrapper: checkWrapper,
	    checkWrapperTemplate: checkWrapperTemplate,
	    getErrorMessage: getErrorMessage,
	    $get: function $get() {
	      return _this;
	    }
	  });

	  function getFieldError(errorInfoSlug, message, field) {
	    if (arguments.length < 3) {
	      field = message;
	      message = errorInfoSlug;
	      errorInfoSlug = null;
	    }
	    return new Error(getErrorMessage(errorInfoSlug, message) + (' Field definition: ' + _angularFix2['default'].toJson(field)));
	  }

	  function getFormlyError(errorInfoSlug, message) {
	    if (!message) {
	      message = errorInfoSlug;
	      errorInfoSlug = null;
	    }
	    return new Error(getErrorMessage(errorInfoSlug, message));
	  }

	  function getErrorMessage(errorInfoSlug, message) {
	    var url = '';
	    if (errorInfoSlug !== null) {
	      url = '' + formlyErrorAndWarningsUrlPrefix + errorInfoSlug;
	    }
	    return 'Formly Error: ' + message + '. ' + url;
	  }

	  function checkWrapper(wrapper) {
	    formlyApiCheck['throw'](formlyApiCheck.formlyWrapperType, wrapper, {
	      prefix: 'formlyConfig.setWrapper',
	      urlSuffix: 'setwrapper-validation-failed'
	    });
	  }

	  function checkWrapperTemplate(template, additionalInfo) {
	    var formlyTransclude = '<formly-transclude></formly-transclude>';
	    if (template.indexOf(formlyTransclude) === -1) {
	      throw getFormlyError('Template wrapper templates must use "' + formlyTransclude + '" somewhere in them. ' + ('This one does not have "<formly-transclude></formly-transclude>" in it: ' + template) + '\n' + ('Additional information: ' + JSON.stringify(additionalInfo)));
	    }
	  }
	}
	formlyUsability.$inject = ["formlyApiCheck", "formlyErrorAndWarningsUrlPrefix"];
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	var _angularFix = __webpack_require__(2);

	var _angularFix2 = _interopRequireDefault(_angularFix);

	var _otherUtils = __webpack_require__(9);

	var _otherUtils2 = _interopRequireDefault(_otherUtils);

	exports['default'] = formlyConfig;

	// @ngInject
	function formlyConfig(formlyUsabilityProvider, formlyErrorAndWarningsUrlPrefix, formlyApiCheck) {
	  var _this2 = this;

	  var typeMap = {};
	  var templateWrappersMap = {};
	  var defaultWrapperName = 'default';
	  var _this = this;
	  var getError = formlyUsabilityProvider.getFormlyError;

	  _angularFix2['default'].extend(this, {
	    setType: setType,
	    getType: getType,
	    getTypeHeritage: getTypeHeritage,
	    setWrapper: setWrapper,
	    getWrapper: getWrapper,
	    getWrapperByType: getWrapperByType,
	    removeWrapperByName: removeWrapperByName,
	    removeWrappersForType: removeWrappersForType,
	    disableWarnings: false,
	    extras: {
	      disableNgModelAttrsManipulator: false,
	      fieldTransform: [],
	      ngModelAttrsManipulatorPreferUnbound: false,
	      removeChromeAutoComplete: false,
	      defaultHideDirective: 'ng-if',
	      getFieldId: null
	    },
	    templateManipulators: {
	      preWrapper: [],
	      postWrapper: []
	    },
	    $get: function $get() {
	      return _this2;
	    }
	  });

	  function setType(options) {
	    if (_angularFix2['default'].isArray(options)) {
	      var _ret = (function () {
	        var allTypes = [];
	        _angularFix2['default'].forEach(options, function (item) {
	          allTypes.push(setType(item));
	        });
	        return {
	          v: allTypes
	        };
	      })();

	      if (typeof _ret === 'object') return _ret.v;
	    } else if (_angularFix2['default'].isObject(options)) {
	      checkType(options);
	      if (options['extends']) {
	        extendTypeOptions(options);
	      }
	      typeMap[options.name] = options;
	      return typeMap[options.name];
	    } else {
	      throw getError('You must provide an object or array for setType. You provided: ' + JSON.stringify(arguments));
	    }
	  }

	  function checkType(options) {
	    formlyApiCheck['throw'](formlyApiCheck.formlyTypeOptions, options, {
	      prefix: 'formlyConfig.setType',
	      url: 'settype-validation-failed'
	    });
	    if (!options.overwriteOk) {
	      checkOverwrite(options.name, typeMap, options, 'types');
	    } else {
	      options.overwriteOk = undefined;
	    }
	  }

	  function extendTypeOptions(options) {
	    var extendsType = getType(options['extends'], true, options);
	    extendTypeControllerFunction(options, extendsType);
	    extendTypeLinkFunction(options, extendsType);
	    extendTypeDefaultOptions(options, extendsType);
	    _otherUtils2['default'].reverseDeepMerge(options, extendsType);
	    extendTemplate(options, extendsType);
	  }

	  function extendTemplate(options, extendsType) {
	    if (options.template && extendsType.templateUrl) {
	      delete options.templateUrl;
	    } else if (options.templateUrl && extendsType.template) {
	      delete options.template;
	    }
	  }

	  function extendTypeControllerFunction(options, extendsType) {
	    var extendsCtrl = extendsType.controller;
	    if (!_angularFix2['default'].isDefined(extendsCtrl)) {
	      return;
	    }
	    var optionsCtrl = options.controller;
	    if (_angularFix2['default'].isDefined(optionsCtrl)) {
	      options.controller = function ($scope, $controller) {
	        $controller(extendsCtrl, { $scope: $scope });
	        $controller(optionsCtrl, { $scope: $scope });
	      };
	      options.controller.$inject = ['$scope', '$controller'];
	    } else {
	      options.controller = extendsCtrl;
	    }
	  }

	  function extendTypeLinkFunction(options, extendsType) {
	    var extendsFn = extendsType.link;
	    if (!_angularFix2['default'].isDefined(extendsFn)) {
	      return;
	    }
	    var optionsFn = options.link;
	    if (_angularFix2['default'].isDefined(optionsFn)) {
	      options.link = function () {
	        extendsFn.apply(undefined, arguments);
	        optionsFn.apply(undefined, arguments);
	      };
	    } else {
	      options.link = extendsFn;
	    }
	  }

	  function extendTypeDefaultOptions(options, extendsType) {
	    var extendsDO = extendsType.defaultOptions;
	    if (!_angularFix2['default'].isDefined(extendsDO)) {
	      return;
	    }
	    var optionsDO = options.defaultOptions;
	    var optionsDOIsFn = _angularFix2['default'].isFunction(optionsDO);
	    var extendsDOIsFn = _angularFix2['default'].isFunction(extendsDO);
	    if (extendsDOIsFn) {
	      options.defaultOptions = function defaultOptions(opts, scope) {
	        var extendsDefaultOptions = extendsDO(opts, scope);
	        var mergedDefaultOptions = {};
	        _otherUtils2['default'].reverseDeepMerge(mergedDefaultOptions, opts, extendsDefaultOptions);
	        var extenderOptionsDefaultOptions = optionsDO;
	        if (optionsDOIsFn) {
	          extenderOptionsDefaultOptions = extenderOptionsDefaultOptions(mergedDefaultOptions, scope);
	        }
	        _otherUtils2['default'].reverseDeepMerge(extendsDefaultOptions, extenderOptionsDefaultOptions);
	        return extendsDefaultOptions;
	      };
	    } else if (optionsDOIsFn) {
	      options.defaultOptions = function defaultOptions(opts, scope) {
	        var newDefaultOptions = {};
	        _otherUtils2['default'].reverseDeepMerge(newDefaultOptions, opts, extendsDO);
	        return optionsDO(newDefaultOptions, scope);
	      };
	    }
	  }

	  function getType(name, throwError, errorContext) {
	    if (!name) {
	      return undefined;
	    }
	    var type = typeMap[name];
	    if (!type && throwError === true) {
	      throw getError('There is no type by the name of "' + name + '": ' + JSON.stringify(errorContext));
	    } else {
	      return type;
	    }
	  }

	  function getTypeHeritage(parent) {
	    var heritage = [];
	    var type = parent;
	    if (_angularFix2['default'].isString(type)) {
	      type = getType(parent);
	    }
	    parent = type['extends'];
	    while (parent) {
	      type = getType(parent);
	      heritage.push(type);
	      parent = type['extends'];
	    }
	    return heritage;
	  }

	  function setWrapper(_x, _x2) {
	    var _again = true;

	    _function: while (_again) {
	      var options = _x,
	          name = _x2;
	      _again = false;

	      if (_angularFix2['default'].isArray(options)) {
	        return options.map(function (wrapperOptions) {
	          return setWrapper(wrapperOptions);
	        });
	      } else if (_angularFix2['default'].isObject(options)) {
	        options.types = getOptionsTypes(options);
	        options.name = getOptionsName(options, name);
	        checkWrapperAPI(options);
	        templateWrappersMap[options.name] = options;
	        return options;
	      } else if (_angularFix2['default'].isString(options)) {
	        _x = {
	          template: options,
	          name: name
	        };
	        _x2 = undefined;
	        _again = true;
	        continue _function;
	      }
	    }
	  }

	  function getOptionsTypes(options) {
	    if (_angularFix2['default'].isString(options.types)) {
	      return [options.types];
	    }
	    if (!_angularFix2['default'].isDefined(options.types)) {
	      return [];
	    } else {
	      return options.types;
	    }
	  }

	  function getOptionsName(options, name) {
	    return options.name || name || options.types.join(' ') || defaultWrapperName;
	  }

	  function checkWrapperAPI(options) {
	    formlyUsabilityProvider.checkWrapper(options);
	    if (options.template) {
	      formlyUsabilityProvider.checkWrapperTemplate(options.template, options);
	    }
	    if (!options.overwriteOk) {
	      checkOverwrite(options.name, templateWrappersMap, options, 'templateWrappers');
	    } else {
	      delete options.overwriteOk;
	    }
	    checkWrapperTypes(options);
	  }

	  function checkWrapperTypes(options) {
	    var shouldThrow = !_angularFix2['default'].isArray(options.types) || !options.types.every(_angularFix2['default'].isString);
	    if (shouldThrow) {
	      throw getError('Attempted to create a template wrapper with types that is not a string or an array of strings');
	    }
	  }

	  function checkOverwrite(property, object, newValue, objectName) {
	    if (object.hasOwnProperty(property)) {
	      warn('overwriting-types-or-wrappers', ['Attempting to overwrite ' + property + ' on ' + objectName + ' which is currently', JSON.stringify(object[property]) + ' with ' + JSON.stringify(newValue), 'To supress this warning, specify the property "overwriteOk: true"'].join(' '));
	    }
	  }

	  function getWrapper(name) {
	    return templateWrappersMap[name || defaultWrapperName];
	  }

	  function getWrapperByType(type) {
	    /* eslint prefer-const:0 */
	    var wrappers = [];
	    for (var _name in templateWrappersMap) {
	      if (templateWrappersMap.hasOwnProperty(_name)) {
	        if (templateWrappersMap[_name].types && templateWrappersMap[_name].types.indexOf(type) !== -1) {
	          wrappers.push(templateWrappersMap[_name]);
	        }
	      }
	    }
	    return wrappers;
	  }

	  function removeWrapperByName(name) {
	    var wrapper = templateWrappersMap[name];
	    delete templateWrappersMap[name];
	    return wrapper;
	  }

	  function removeWrappersForType(type) {
	    var wrappers = getWrapperByType(type);
	    if (!wrappers) {
	      return undefined;
	    }
	    if (!_angularFix2['default'].isArray(wrappers)) {
	      return removeWrapperByName(wrappers.name);
	    } else {
	      wrappers.forEach(function (wrapper) {
	        return removeWrapperByName(wrapper.name);
	      });
	      return wrappers;
	    }
	  }

	  function warn() {
	    if (!_this.disableWarnings && console.warn) {
	      /* eslint no-console:0 */
	      var args = Array.prototype.slice.call(arguments);
	      var warnInfoSlug = args.shift();
	      args.unshift('Formly Warning:');
	      args.push('' + formlyErrorAndWarningsUrlPrefix + warnInfoSlug);
	      console.warn.apply(console, _toConsumableArray(args));
	    }
	  }
	}
	formlyConfig.$inject = ["formlyUsabilityProvider", "formlyErrorAndWarningsUrlPrefix", "formlyApiCheck"];
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _angularFix = __webpack_require__(2);

	var _angularFix2 = _interopRequireDefault(_angularFix);

	exports['default'] = {
	  containsSelector: containsSelector, containsSpecialChar: containsSpecialChar, formlyEval: formlyEval, getFieldId: getFieldId, reverseDeepMerge: reverseDeepMerge, findByNodeName: findByNodeName,
	  arrayify: arrayify, extendFunction: extendFunction, extendArray: extendArray, startsWith: startsWith, contains: contains
	};

	function containsSelector(string) {
	  return containsSpecialChar(string, '.') || containsSpecialChar(string, '[') && containsSpecialChar(string, ']');
	}

	function containsSpecialChar(a, b) {
	  if (!a || !a.indexOf) {
	    return false;
	  }
	  return a.indexOf(b) !== -1;
	}

	function formlyEval(scope, expression, $modelValue, $viewValue, extraLocals) {
	  if (_angularFix2['default'].isFunction(expression)) {
	    return expression($viewValue, $modelValue, scope, extraLocals);
	  } else {
	    return scope.$eval(expression, _angularFix2['default'].extend({ $viewValue: $viewValue, $modelValue: $modelValue }, extraLocals));
	  }
	}

	function getFieldId(formId, options, index) {
	  if (options.id) {
	    return options.id;
	  }
	  var type = options.type;
	  if (!type && options.template) {
	    type = 'template';
	  } else if (!type && options.templateUrl) {
	    type = 'templateUrl';
	  }

	  return [formId, type, options.key, index].join('_');
	}

	function reverseDeepMerge(dest) {
	  _angularFix2['default'].forEach(arguments, function (src, index) {
	    if (!index) {
	      return;
	    }
	    _angularFix2['default'].forEach(src, function (val, prop) {
	      if (!_angularFix2['default'].isDefined(dest[prop])) {
	        dest[prop] = _angularFix2['default'].copy(val);
	      } else if (objAndSameType(dest[prop], val)) {
	        reverseDeepMerge(dest[prop], val);
	      }
	    });
	  });
	  return dest;
	}

	function objAndSameType(obj1, obj2) {
	  return _angularFix2['default'].isObject(obj1) && _angularFix2['default'].isObject(obj2) && Object.getPrototypeOf(obj1) === Object.getPrototypeOf(obj2);
	}

	// recurse down a node tree to find a node with matching nodeName, for custom tags jQuery.find doesn't work in IE8
	function findByNodeName(el, nodeName) {
	  if (!el.prop) {
	    // not a jQuery or jqLite object -> wrap it
	    el = _angularFix2['default'].element(el);
	  }

	  if (el.prop('nodeName') === nodeName.toUpperCase()) {
	    return el;
	  }

	  var c = el.children();
	  for (var i = 0; c && i < c.length; i++) {
	    var node = findByNodeName(c[i], nodeName);
	    if (node) {
	      return node;
	    }
	  }
	}

	function arrayify(obj) {
	  if (obj && !_angularFix2['default'].isArray(obj)) {
	    obj = [obj];
	  } else if (!obj) {
	    obj = [];
	  }
	  return obj;
	}

	function extendFunction() {
	  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
	    fns[_key] = arguments[_key];
	  }

	  return function extendedFunction() {
	    var args = arguments;
	    fns.forEach(function (fn) {
	      return fn.apply(null, args);
	    });
	  };
	}

	function extendArray(primary, secondary, property) {
	  if (property) {
	    primary = primary[property];
	    secondary = secondary[property];
	  }
	  if (secondary && primary) {
	    _angularFix2['default'].forEach(secondary, function (item) {
	      if (primary.indexOf(item) === -1) {
	        primary.push(item);
	      }
	    });
	    return primary;
	  } else if (secondary) {
	    return secondary;
	  } else {
	    return primary;
	  }
	}

	function startsWith(str, search) {
	  if (_angularFix2['default'].isString(str) && _angularFix2['default'].isString(search)) {
	    return str.length >= search.length && str.substring(0, search.length) === search;
	  } else {
	    return false;
	  }
	}

	function contains(str, search) {
	  if (_angularFix2['default'].isString(str) && _angularFix2['default'].isString(search)) {
	    return str.length >= search.length && str.indexOf(search) !== -1;
	  } else {
	    return false;
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = formlyValidationMessages;

	// @ngInject
	function formlyValidationMessages() {

	  var validationMessages = {
	    addTemplateOptionValueMessage: addTemplateOptionValueMessage,
	    addStringMessage: addStringMessage,
	    messages: {}
	  };

	  return validationMessages;

	  function addTemplateOptionValueMessage(name, prop, prefix, suffix, alternate) {
	    validationMessages.messages[name] = templateOptionValue(prop, prefix, suffix, alternate);
	  }

	  function addStringMessage(name, string) {
	    validationMessages.messages[name] = function () {
	      return string;
	    };
	  }

	  function templateOptionValue(prop, prefix, suffix, alternate) {
	    return function getValidationMessage(viewValue, modelValue, scope) {
	      if (typeof scope.options.templateOptions[prop] !== 'undefined') {
	        return prefix + ' ' + scope.options.templateOptions[prop] + ' ' + suffix;
	      } else {
	        return alternate;
	      }
	    };
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _otherUtils = __webpack_require__(9);

	var _otherUtils2 = _interopRequireDefault(_otherUtils);

	exports['default'] = formlyUtil;

	// @ngInject
	function formlyUtil() {
	  return _otherUtils2['default'];
	}
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	exports['default'] = formlyWarn;

	// @ngInject
	function formlyWarn(formlyConfig, formlyErrorAndWarningsUrlPrefix, $log) {
	  return function warn() {
	    if (!formlyConfig.disableWarnings) {
	      var args = Array.prototype.slice.call(arguments);
	      var warnInfoSlug = args.shift();
	      args.unshift('Formly Warning:');
	      args.push('' + formlyErrorAndWarningsUrlPrefix + warnInfoSlug);
	      $log.warn.apply($log, _toConsumableArray(args));
	    }
	  };
	}
	formlyWarn.$inject = ["formlyConfig", "formlyErrorAndWarningsUrlPrefix", "$log"];
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _angularFix = __webpack_require__(2);

	var _angularFix2 = _interopRequireDefault(_angularFix);

	exports['default'] = formlyCustomValidation;

	// @ngInject
	function formlyCustomValidation(formlyUtil) {
	  return {
	    restrict: 'A',
	    require: 'ngModel',
	    link: function formlyCustomValidationLink(scope, el, attrs, ctrl) {
	      var opts = scope.options;
	      opts.validation.messages = opts.validation.messages || {};
	      _angularFix2['default'].forEach(opts.validation.messages, function (message, key) {
	        opts.validation.messages[key] = function () {
	          return formlyUtil.formlyEval(scope, message, ctrl.$modelValue, ctrl.$viewValue);
	        };
	      });

	      var useNewValidatorsApi = ctrl.hasOwnProperty('$validators') && !attrs.hasOwnProperty('useParsers');
	      _angularFix2['default'].forEach(opts.validators, _angularFix2['default'].bind(null, addValidatorToPipeline, false));
	      _angularFix2['default'].forEach(opts.asyncValidators, _angularFix2['default'].bind(null, addValidatorToPipeline, true));

	      function addValidatorToPipeline(isAsync, validator, name) {
	        setupMessage(validator, name);
	        validator = _angularFix2['default'].isObject(validator) ? validator.expression : validator;
	        if (useNewValidatorsApi) {
	          setupWithValidators(validator, name, isAsync);
	        } else {
	          setupWithParsers(validator, name, isAsync);
	        }
	      }

	      function setupMessage(validator, name) {
	        var message = validator.message;
	        if (message) {
	          opts.validation.messages[name] = function () {
	            return formlyUtil.formlyEval(scope, message, ctrl.$modelValue, ctrl.$viewValue);
	          };
	        }
	      }

	      function setupWithValidators(validator, name, isAsync) {
	        var validatorCollection = isAsync ? '$asyncValidators' : '$validators';

	        ctrl[validatorCollection][name] = function evalValidity(modelValue, viewValue) {
	          return formlyUtil.formlyEval(scope, validator, modelValue, viewValue);
	        };
	      }

	      function setupWithParsers(validator, name, isAsync) {
	        var inFlightValidator = undefined;
	        ctrl.$parsers.unshift(function evalValidityOfParser(viewValue) {
	          var isValid = formlyUtil.formlyEval(scope, validator, ctrl.$modelValue, viewValue);
	          if (isAsync) {
	            ctrl.$pending = ctrl.$pending || {};
	            ctrl.$pending[name] = true;
	            inFlightValidator = isValid;
	            isValid.then(function () {
	              if (inFlightValidator === isValid) {
	                ctrl.$setValidity(name, true);
	              }
	            })['catch'](function () {
	              if (inFlightValidator === isValid) {
	                ctrl.$setValidity(name, false);
	              }
	            })['finally'](function () {
	              var $pending = ctrl.$pending || {};
	              if (Object.keys($pending).length === 1) {
	                delete ctrl.$pending;
	              } else {
	                delete ctrl.$pending[name];
	              }
	            });
	          } else {
	            ctrl.$setValidity(name, isValid);
	          }
	          return viewValue;
	        });
	      }
	    }
	  };
	}
	formlyCustomValidation.$inject = ["formlyUtil"];
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	var _angularFix = __webpack_require__(2);

	var _angularFix2 = _interopRequireDefault(_angularFix);

	var _apiCheck = __webpack_require__(5);

	var _apiCheck2 = _interopRequireDefault(_apiCheck);

	exports['default'] = formlyField;

	/**
	 * @ngdoc directive
	 * @name formlyField
	 * @restrict AE
	 */
	// @ngInject
	function formlyField($http, $q, $compile, $templateCache, $interpolate, formlyConfig, formlyApiCheck, formlyUtil, formlyUsability, formlyWarn) {
	  var arrayify = formlyUtil.arrayify;

	  FormlyFieldController.$inject = ["$scope", "$timeout", "$parse", "$controller", "formlyValidationMessages"];
	  return {
	    restrict: 'AE',
	    transclude: true,
	    require: '?^formlyForm',
	    scope: {
	      options: '=',
	      model: '=',
	      originalModel: '=?',
	      formId: '@', // TODO remove formId in a breaking release
	      index: '=?',
	      fields: '=?',
	      formState: '=?',
	      formOptions: '=?',
	      form: '=?' },
	    // TODO require form in a breaking release
	    controller: FormlyFieldController,
	    link: fieldLink
	  };

	  // @ngInject
	  function FormlyFieldController($scope, $timeout, $parse, $controller, formlyValidationMessages) {
	    /* eslint max-statements:[2, 32] */
	    if ($scope.options.fieldGroup) {
	      setupFieldGroup();
	      return;
	    }

	    var fieldType = getFieldType($scope.options);
	    simplifyLife($scope.options);
	    mergeFieldOptionsWithTypeDefaults($scope.options, fieldType);
	    extendOptionsWithDefaults($scope.options, $scope.index);
	    checkApi($scope.options);
	    // set field id to link labels and fields

	    // initalization
	    setFieldIdAndName();
	    setDefaultValue();
	    setInitialValue();
	    runExpressions();
	    addValidationMessages($scope.options);
	    invokeControllers($scope, $scope.options, fieldType);

	    // function definitions
	    function runExpressions() {
	      // must run on next tick to make sure that the current value is correct.
	      return $timeout(function runExpressionsOnNextTick() {
	        var field = $scope.options;
	        var currentValue = valueGetterSetter();
	        _angularFix2['default'].forEach(field.expressionProperties, function runExpression(expression, prop) {
	          var setter = $parse(prop).assign;
	          var promise = $q.when(formlyUtil.formlyEval($scope, expression, currentValue, currentValue));
	          promise.then(function setFieldValue(value) {
	            setter(field, value);
	          });
	        });
	      }, 0, false);
	    }

	    function valueGetterSetter(newVal) {
	      if (!$scope.model || !$scope.options.key) {
	        return undefined;
	      }
	      if (_angularFix2['default'].isDefined(newVal)) {
	        parseSet($scope.options.key, $scope.model, newVal);
	      }
	      return parseGet($scope.options.key, $scope.model);
	    }

	    function shouldNotUseParseKey(key) {
	      return _angularFix2['default'].isNumber(key) || !formlyUtil.containsSelector(key);
	    }

	    function parseSet(key, model, newVal) {
	      // If either of these are null/undefined then just return undefined
	      if (!key || !model) {
	        return;
	      }
	      // If we are working with a number then $parse wont work, default back to the old way for now
	      if (shouldNotUseParseKey(key)) {
	        // TODO: Fix this so we can get several levels instead of just one with properties that are numeric
	        model[key] = newVal;
	      } else {
	        var setter = $parse($scope.options.key).assign;
	        if (setter) {
	          setter($scope.model, newVal);
	        }
	      }
	    }

	    function parseGet(key, model) {
	      // If either of these are null/undefined then just return undefined
	      if (!key || !model) {
	        return undefined;
	      }

	      // If we are working with a number then $parse wont work, default back to the old way for now
	      if (shouldNotUseParseKey(key)) {
	        // TODO: Fix this so we can get several levels instead of just one with properties that are numeric
	        return model[key];
	      } else {
	        return $parse(key)(model);
	      }
	    }

	    function simplifyLife(options) {
	      // add a few empty objects (if they don't already exist) so you don't have to undefined check everywhere
	      formlyUtil.reverseDeepMerge(options, {
	        originalModel: options.model,
	        extras: {},
	        data: {},
	        templateOptions: {},
	        validation: {}
	      });
	      // create $scope.to so template authors can reference to instead of $scope.options.templateOptions
	      $scope.to = $scope.options.templateOptions;
	      $scope.formOptions = $scope.formOptions || {};
	    }

	    function setFieldIdAndName() {
	      if (_angularFix2['default'].isFunction(formlyConfig.extras.getFieldId)) {
	        $scope.id = formlyConfig.extras.getFieldId($scope.options, $scope.model, $scope);
	      } else {
	        var formName = $scope.form && $scope.form.$name || $scope.formId;
	        $scope.id = formlyUtil.getFieldId(formName, $scope.options, $scope.index);
	      }
	      $scope.options.id = $scope.id;
	      $scope.name = $scope.options.name || $scope.options.id;
	      $scope.options.name = $scope.name;
	    }

	    function setDefaultValue() {
	      if (_angularFix2['default'].isDefined($scope.options.defaultValue) && !_angularFix2['default'].isDefined(parseGet($scope.options.key, $scope.model))) {
	        parseSet($scope.options.key, $scope.model, $scope.options.defaultValue);
	      }
	    }

	    function setInitialValue() {
	      $scope.options.initialValue = $scope.model && parseGet($scope.options.key, $scope.model);
	    }

	    function mergeFieldOptionsWithTypeDefaults(options, type) {
	      if (type) {
	        mergeOptions(options, type.defaultOptions);
	      }
	      var properOrder = arrayify(options.optionsTypes).reverse(); // so the right things are overridden
	      _angularFix2['default'].forEach(properOrder, function (typeName) {
	        mergeOptions(options, formlyConfig.getType(typeName, true, options).defaultOptions);
	      });
	    }

	    function mergeOptions(options, extraOptions) {
	      if (extraOptions) {
	        if (_angularFix2['default'].isFunction(extraOptions)) {
	          extraOptions = extraOptions(options, $scope);
	        }
	        formlyUtil.reverseDeepMerge(options, extraOptions);
	      }
	    }

	    function extendOptionsWithDefaults(options, index) {
	      var key = options.key || index || 0;
	      _angularFix2['default'].extend(options, {
	        // attach the key in case the formly-field directive is used directly
	        key: key,
	        value: options.value || valueGetterSetter,
	        runExpressions: runExpressions,
	        resetModel: resetModel,
	        updateInitialValue: updateInitialValue
	      });
	    }

	    function resetModel() {
	      parseSet($scope.options.key, $scope.model, $scope.options.initialValue);
	      if ($scope.options.formControl) {
	        if (_angularFix2['default'].isArray($scope.options.formControl)) {
	          _angularFix2['default'].forEach($scope.options.formControl, function (formControl) {
	            resetFormControl(formControl, true);
	          });
	        } else {
	          resetFormControl($scope.options.formControl);
	        }
	      }
	      if ($scope.form) {
	        $scope.form.$setUntouched && $scope.form.$setUntouched();
	        $scope.form.$setPristine();
	      }
	    }

	    function resetFormControl(formControl, isMultiNgModel) {
	      if (!isMultiNgModel) {
	        formControl.$setViewValue(parseGet($scope.options.key, $scope.model));
	      }

	      formControl.$render();
	      formControl.$setUntouched && formControl.$setUntouched();
	      formControl.$setPristine();

	      // To prevent breaking change requiring a digest to reset $viewModel
	      if (!$scope.$root.$$phase) {
	        $scope.$digest();
	      }
	    }

	    function updateInitialValue() {
	      $scope.options.initialValue = parseGet($scope.options.key, $scope.model);
	    }

	    function addValidationMessages(options) {
	      options.validation.messages = options.validation.messages || {};
	      _angularFix2['default'].forEach(formlyValidationMessages.messages, function createFunctionForMessage(expression, name) {
	        if (!options.validation.messages[name]) {
	          options.validation.messages[name] = function evaluateMessage(viewValue, modelValue, scope) {
	            return formlyUtil.formlyEval(scope, expression, modelValue, viewValue);
	          };
	        }
	      });
	    }

	    function invokeControllers(scope) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	      var type = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	      _angularFix2['default'].forEach([type.controller, options.controller], function (controller) {
	        if (controller) {
	          $controller(controller, { $scope: scope });
	        }
	      });
	    }

	    function setupFieldGroup() {
	      $scope.options.options = $scope.options.options || {};
	      $scope.options.options.formState = $scope.formState;
	      $scope.to = $scope.options.templateOptions;
	    }
	  }

	  // link function
	  function fieldLink(scope, el, attrs, formlyFormCtrl) {
	    if (scope.options.fieldGroup) {
	      setFieldGroupTemplate();
	      return;
	    }

	    // watch the field model (if exists) if there is no parent formly-form directive (that would watch it instead)
	    if (!formlyFormCtrl && scope.options.model) {
	      scope.$watch('options.model', function () {
	        return scope.options.runExpressions();
	      }, true);
	    }

	    addAttributes();
	    addClasses();

	    var type = getFieldType(scope.options);
	    var args = arguments;
	    var thusly = this;
	    var fieldCount = 0;
	    var fieldManipulators = getManipulators(scope.options, scope.formOptions);
	    getFieldTemplate(scope.options).then(runManipulators(fieldManipulators.preWrapper)).then(transcludeInWrappers(scope.options, scope.formOptions)).then(runManipulators(fieldManipulators.postWrapper)).then(setElementTemplate).then(watchFormControl).then(callLinkFunctions)['catch'](function (error) {
	      formlyWarn('there-was-a-problem-setting-the-template-for-this-field', 'There was a problem setting the template for this field ', scope.options, error);
	    });

	    function setFieldGroupTemplate() {
	      checkFieldGroupApi(scope.options);
	      el.addClass('formly-field-group');
	      var extraAttributes = '';
	      if (scope.options.elementAttributes) {
	        extraAttributes = Object.keys(scope.options.elementAttributes).map(function (key) {
	          return key + '="' + scope.options.elementAttributes[key] + '"';
	        }).join(' ');
	      }
	      var modelValue = 'model';
	      scope.options.form = scope.form;
	      if (scope.options.key) {
	        modelValue = 'model[\'' + scope.options.key + '\']';
	      }
	      getTemplate('\n          <formly-form model="' + modelValue + '"\n                       fields="options.fieldGroup"\n                       options="options.options"\n                       form="options.form"\n                       class="' + scope.options.className + '"\n                       ' + extraAttributes + '\n                       is-field-group>\n          </formly-form>\n        ').then(transcludeInWrappers(scope.options, scope.formOptions)).then(setElementTemplate);
	    }

	    function addAttributes() {
	      if (scope.options.elementAttributes) {
	        el.attr(scope.options.elementAttributes);
	      }
	    }

	    function addClasses() {
	      if (scope.options.className) {
	        el.addClass(scope.options.className);
	      }
	      if (scope.options.type) {
	        el.addClass('formly-field-' + scope.options.type);
	      }
	    }

	    function setElementTemplate(templateString) {
	      el.html(asHtml(templateString));
	      $compile(el.contents())(scope);
	      return templateString;
	    }

	    function watchFormControl(templateString) {
	      var stopWatchingShowError = _angularFix2['default'].noop;
	      if (scope.options.noFormControl) {
	        return;
	      }
	      var templateEl = _angularFix2['default'].element('<div>' + templateString + '</div>');
	      var ngModelNodes = templateEl[0].querySelectorAll('[ng-model],[data-ng-model]');

	      if (ngModelNodes.length) {
	        _angularFix2['default'].forEach(ngModelNodes, function (ngModelNode) {
	          fieldCount++;
	          watchFieldNameOrExistence(ngModelNode.getAttribute('name'));
	        });
	      }

	      function watchFieldNameOrExistence(name) {
	        var nameExpressionRegex = /\{\{(.*?)}}/;
	        var nameExpression = nameExpressionRegex.exec(name);
	        if (nameExpression) {
	          name = $interpolate(name)(scope);
	        }
	        watchFieldExistence(name);
	      }

	      function watchFieldExistence(name) {
	        scope.$watch('form["' + name + '"]', function formControlChange(formControl) {
	          if (formControl) {
	            if (fieldCount > 1) {
	              if (!scope.options.formControl) {
	                scope.options.formControl = [];
	              }
	              scope.options.formControl.push(formControl);
	            } else {
	              scope.options.formControl = formControl;
	            }
	            scope.fc = scope.options.formControl; // shortcut for template authors
	            stopWatchingShowError();
	            addShowMessagesWatcher();
	            addParsers();
	            addFormatters();
	          }
	        });
	      }

	      function addShowMessagesWatcher() {
	        stopWatchingShowError = scope.$watch(function watchShowValidationChange() {
	          var customExpression = formlyConfig.extras.errorExistsAndShouldBeVisibleExpression;
	          var options = scope.options;
	          var formControls = arrayify(scope.fc);
	          if (!formControls.some(function (fc) {
	            return fc.$invalid;
	          })) {
	            return false;
	          } else if (typeof options.validation.show === 'boolean') {
	            return options.validation.show;
	          } else if (customExpression) {
	            return formControls.some(function (fc) {
	              return formlyUtil.formlyEval(scope, customExpression, fc.$modelValue, fc.$viewValue);
	            });
	          } else {
	            return formControls.some(function (fc) {
	              var noTouchedButDirty = _angularFix2['default'].isUndefined(fc.$touched) && fc.$dirty;
	              return fc.$touched || noTouchedButDirty;
	            });
	          }
	        }, function onShowValidationChange(show) {
	          scope.options.validation.errorExistsAndShouldBeVisible = show;
	          scope.showError = show; // shortcut for template authors
	        });
	      }

	      function addParsers() {
	        setParsersOrFormatters('parsers');
	      }

	      function addFormatters() {
	        setParsersOrFormatters('formatters');
	        var ctrl = scope.fc;
	        var formWasPristine = scope.form.$pristine;
	        if (scope.options.formatters) {
	          (function () {
	            var value = ctrl.$modelValue;
	            ctrl.$formatters.forEach(function (formatter) {
	              value = formatter(value);
	            });

	            ctrl.$setViewValue(value);
	            ctrl.$render();
	            ctrl.$setPristine();
	            if (formWasPristine) {
	              scope.form.$setPristine();
	            }
	          })();
	        }
	      }

	      function setParsersOrFormatters(which) {
	        var originalThingProp = 'originalParser';
	        if (which === 'formatters') {
	          originalThingProp = 'originalFormatter';
	        }

	        // init with type's parsers
	        var things = getThingsFromType(type);

	        // get optionsTypes things
	        things = formlyUtil.extendArray(things, getThingsFromOptionsTypes(scope.options.optionsTypes));

	        // get field's things
	        things = formlyUtil.extendArray(things, scope.options[which]);

	        // convert things into formlyExpression things
	        _angularFix2['default'].forEach(things, function (thing, index) {
	          things[index] = getFormlyExpressionThing(thing);
	        });

	        var ngModelCtrls = scope.fc;
	        if (!_angularFix2['default'].isArray(ngModelCtrls)) {
	          ngModelCtrls = [ngModelCtrls];
	        }

	        _angularFix2['default'].forEach(ngModelCtrls, function (ngModelCtrl) {
	          var _ngModelCtrl;

	          ngModelCtrl['$' + which] = (_ngModelCtrl = ngModelCtrl['$' + which]).concat.apply(_ngModelCtrl, _toConsumableArray(things));
	        });

	        function getThingsFromType(theType) {
	          if (!theType) {
	            return [];
	          }
	          if (_angularFix2['default'].isString(theType)) {
	            theType = formlyConfig.getType(theType, true, scope.options);
	          }
	          var typeThings = [];

	          // get things from parent
	          if (theType['extends']) {
	            typeThings = formlyUtil.extendArray(typeThings, getThingsFromType(theType['extends']));
	          }

	          // get own type's things
	          typeThings = formlyUtil.extendArray(typeThings, getDefaultOptionsProperty(theType, which, []));

	          // get things from optionsTypes
	          typeThings = formlyUtil.extendArray(typeThings, getThingsFromOptionsTypes(getDefaultOptionsOptionsTypes(theType)));

	          return typeThings;
	        }

	        function getThingsFromOptionsTypes() {
	          var optionsTypes = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	          var optionsTypesThings = [];
	          _angularFix2['default'].forEach(_angularFix2['default'].copy(arrayify(optionsTypes)).reverse(), function (optionsTypeName) {
	            optionsTypesThings = formlyUtil.extendArray(optionsTypesThings, getThingsFromType(optionsTypeName));
	          });
	          return optionsTypesThings;
	        }

	        function getFormlyExpressionThing(thing) {
	          formlyExpressionParserOrFormatterFunction[originalThingProp] = thing;
	          return formlyExpressionParserOrFormatterFunction;

	          function formlyExpressionParserOrFormatterFunction($viewValue) {
	            var $modelValue = scope.options.value();
	            return formlyUtil.formlyEval(scope, thing, $modelValue, $viewValue);
	          }
	        }
	      }
	    }

	    function callLinkFunctions() {
	      if (type && type.link) {
	        type.link.apply(thusly, args);
	      }
	      if (scope.options.link) {
	        scope.options.link.apply(thusly, args);
	      }
	    }

	    function runManipulators(manipulators) {
	      return function runManipulatorsOnTemplate(templateToManipulate) {
	        var chain = $q.when(templateToManipulate);
	        _angularFix2['default'].forEach(manipulators, function (manipulator) {
	          chain = chain.then(function (template) {
	            return $q.when(manipulator(template, scope.options, scope)).then(function (newTemplate) {
	              return _angularFix2['default'].isString(newTemplate) ? newTemplate : asHtml(newTemplate);
	            });
	          });
	        });
	        return chain;
	      };
	    }
	  }

	  // sort-of stateless util functions
	  function asHtml(el) {
	    var wrapper = _angularFix2['default'].element('<a></a>');
	    return wrapper.append(el).html();
	  }

	  function getFieldType(options) {
	    return options.type && formlyConfig.getType(options.type);
	  }

	  function getManipulators(options, formOptions) {
	    var preWrapper = [];
	    var postWrapper = [];
	    addManipulators(options.templateManipulators);
	    addManipulators(formOptions.templateManipulators);
	    addManipulators(formlyConfig.templateManipulators);
	    return { preWrapper: preWrapper, postWrapper: postWrapper };

	    function addManipulators(manipulators) {
	      /* eslint-disable */ // it doesn't understand this :-(

	      var _ref = manipulators || {};

	      var _ref$preWrapper = _ref.preWrapper;
	      var pre = _ref$preWrapper === undefined ? [] : _ref$preWrapper;
	      var _ref$postWrapper = _ref.postWrapper;
	      var post = _ref$postWrapper === undefined ? [] : _ref$postWrapper;

	      preWrapper = preWrapper.concat(pre);
	      postWrapper = postWrapper.concat(post);
	      /* eslint-enable */
	    }
	  }

	  function getFieldTemplate(options) {
	    function fromOptionsOrType(key, fieldType) {
	      if (_angularFix2['default'].isDefined(options[key])) {
	        return options[key];
	      } else if (fieldType && _angularFix2['default'].isDefined(fieldType[key])) {
	        return fieldType[key];
	      }
	    }

	    var type = formlyConfig.getType(options.type, true, options);
	    var template = fromOptionsOrType('template', type);
	    var templateUrl = fromOptionsOrType('templateUrl', type);
	    if (_angularFix2['default'].isUndefined(template) && !templateUrl) {
	      throw formlyUsability.getFieldError('type-type-has-no-template', 'Type \'' + options.type + '\' has no template. On element:', options);
	    }

	    return getTemplate(templateUrl || template, _angularFix2['default'].isUndefined(template), options);
	  }

	  function getTemplate(template, isUrl, options) {
	    var templatePromise = undefined;
	    if (_angularFix2['default'].isFunction(template)) {
	      templatePromise = $q.when(template(options));
	    } else {
	      templatePromise = $q.when(template);
	    }

	    if (!isUrl) {
	      return templatePromise;
	    } else {
	      var _ret2 = (function () {
	        var httpOptions = { cache: $templateCache };
	        return {
	          v: templatePromise.then(function (url) {
	            return $http.get(url, httpOptions);
	          }).then(function (response) {
	            return response.data;
	          })['catch'](function handleErrorGettingATemplate(error) {
	            formlyWarn('problem-loading-template-for-templateurl', 'Problem loading template for ' + template, error);
	          })
	        };
	      })();

	      if (typeof _ret2 === 'object') return _ret2.v;
	    }
	  }

	  function transcludeInWrappers(options, formOptions) {
	    var wrapper = getWrapperOption(options, formOptions);

	    return function transcludeTemplate(template) {
	      if (!wrapper.length) {
	        return $q.when(template);
	      }

	      wrapper.forEach(function (aWrapper) {
	        formlyUsability.checkWrapper(aWrapper, options);
	        runApiCheck(aWrapper, options);
	      });
	      var promises = wrapper.map(function (w) {
	        return getTemplate(w.template || w.templateUrl, !w.template);
	      });
	      return $q.all(promises).then(function (wrappersTemplates) {
	        wrappersTemplates.forEach(function (wrapperTemplate, index) {
	          formlyUsability.checkWrapperTemplate(wrapperTemplate, wrapper[index]);
	        });
	        wrappersTemplates.reverse(); // wrapper 0 is wrapped in wrapper 1 and so on...
	        var totalWrapper = wrappersTemplates.shift();
	        wrappersTemplates.forEach(function (wrapperTemplate) {
	          totalWrapper = doTransclusion(totalWrapper, wrapperTemplate);
	        });
	        return doTransclusion(totalWrapper, template);
	      });
	    };
	  }

	  function doTransclusion(wrapper, template) {
	    var superWrapper = _angularFix2['default'].element('<a></a>'); // this allows people not have to have a single root in wrappers
	    superWrapper.append(wrapper);
	    var transcludeEl = superWrapper.find('formly-transclude');
	    if (!transcludeEl.length) {
	      // try it using our custom find function
	      transcludeEl = formlyUtil.findByNodeName(superWrapper, 'formly-transclude');
	    }
	    transcludeEl.replaceWith(template);
	    return superWrapper.html();
	  }

	  function getWrapperOption(options, formOptions) {
	    /* eslint complexity:[2, 6] */
	    var wrapper = options.wrapper;
	    // explicit null means no wrapper
	    if (wrapper === null) {
	      return [];
	    }

	    // nothing specified means use the default wrapper for the type
	    if (!wrapper) {
	      // get all wrappers that specify they apply to this type
	      wrapper = arrayify(formlyConfig.getWrapperByType(options.type));
	    } else {
	      wrapper = arrayify(wrapper).map(formlyConfig.getWrapper);
	    }

	    // get all wrappers for that the type specified that it uses.
	    var type = formlyConfig.getType(options.type, true, options);
	    if (type && type.wrapper) {
	      var typeWrappers = arrayify(type.wrapper).map(formlyConfig.getWrapper);
	      wrapper = wrapper.concat(typeWrappers);
	    }

	    // add form wrappers
	    if (formOptions.wrapper) {
	      var formWrappers = arrayify(formOptions.wrapper).map(formlyConfig.getWrapper);
	      wrapper = wrapper.concat(formWrappers);
	    }

	    // add the default wrapper last
	    var defaultWrapper = formlyConfig.getWrapper();
	    if (defaultWrapper) {
	      wrapper.push(defaultWrapper);
	    }
	    return wrapper;
	  }

	  function checkApi(options) {
	    formlyApiCheck['throw'](formlyApiCheck.formlyFieldOptions, options, {
	      prefix: 'formly-field directive',
	      url: 'formly-field-directive-validation-failed'
	    });
	    // validate with the type
	    var type = options.type && formlyConfig.getType(options.type);
	    if (type) {
	      runApiCheck(type, options, true);
	    }
	    if (options.expressionProperties && options.expressionProperties.hide) {
	      formlyWarn('dont-use-expressionproperties.hide-use-hideexpression-instead', 'You have specified `hide` in `expressionProperties`. Use `hideExpression` instead', options);
	    }
	  }

	  function checkFieldGroupApi(options) {
	    formlyApiCheck['throw'](formlyApiCheck.fieldGroup, options, {
	      prefix: 'formly-field directive',
	      url: 'formly-field-directive-validation-failed'
	    });
	  }

	  function runApiCheck(_ref2, options, forType) {
	    var apiCheck = _ref2.apiCheck;
	    var apiCheckInstance = _ref2.apiCheckInstance;
	    var apiCheckFunction = _ref2.apiCheckFunction;
	    var apiCheckOptions = _ref2.apiCheckOptions;

	    runApiCheckForType(apiCheck, apiCheckInstance, apiCheckFunction, apiCheckOptions, options);
	    if (forType && options.type) {
	      _angularFix2['default'].forEach(formlyConfig.getTypeHeritage(options.type), function (type) {
	        runApiCheckForType(type.apiCheck, type.apiCheckInstance, type.apiCheckFunction, type.apiCheckOptions, options);
	      });
	    }
	  }

	  function runApiCheckForType(apiCheck, apiCheckInstance, apiCheckFunction, apiCheckOptions, options) {
	    /* eslint complexity:[2, 9] */
	    if (!apiCheck) {
	      return;
	    }
	    var instance = apiCheckInstance || formlyConfig.extras.apiCheckInstance || formlyApiCheck;
	    if (instance.config.disabled || _apiCheck2['default'].globalConfig.disabled) {
	      return;
	    }
	    var fn = apiCheckFunction || 'warn';
	    // this is the new API
	    var checkerObjects = apiCheck(instance);
	    _angularFix2['default'].forEach(checkerObjects, function (shape, name) {
	      var checker = instance.shape(shape);
	      var checkOptions = _angularFix2['default'].extend({
	        prefix: 'formly-field type ' + options.type + ' for property ' + name,
	        url: formlyApiCheck.config.output.docsBaseUrl + 'formly-field-type-apicheck-failed'
	      }, apiCheckOptions);
	      instance[fn](checker, options[name], checkOptions);
	    });
	  }
	}
	formlyField.$inject = ["$http", "$q", "$compile", "$templateCache", "$interpolate", "formlyConfig", "formlyApiCheck", "formlyUtil", "formlyUsability", "formlyWarn"];

	// Stateless util functions
	function getDefaultOptionsOptionsTypes(type) {
	  return getDefaultOptionsProperty(type, 'optionsTypes', []);
	}

	function getDefaultOptionsProperty(type, prop, defaultValue) {
	  return type.defaultOptions && type.defaultOptions[prop] || defaultValue;
	}
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = formlyFocus;

	// @ngInject
	function formlyFocus($timeout, $document) {
	  return {
	    restrict: 'A',
	    link: function formlyFocusLink(scope, element, attrs) {
	      var previousEl = null;
	      var el = element[0];
	      var doc = $document[0];
	      attrs.$observe('formlyFocus', function respondToFocusExpressionChange(value) {
	        /* eslint no-bitwise:0 */ // I know what I'm doing. I promise...
	        if (value === 'true') {
	          $timeout(function setElementFocus() {
	            previousEl = doc.activeElement;
	            el.focus();
	          }, ~ ~attrs.focusWait);
	        } else if (value === 'false') {
	          if (doc.activeElement === el) {
	            el.blur();
	            if (attrs.hasOwnProperty('refocus') && previousEl) {
	              previousEl.focus();
	            }
	          }
	        }
	      });
	    }
	  };
	}
	formlyFocus.$inject = ["$timeout", "$document"];
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var _slice = Array.prototype.slice;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	var _angularFix = __webpack_require__(2);

	var _angularFix2 = _interopRequireDefault(_angularFix);

	exports['default'] = formlyForm;

	/**
	 * @ngdoc directive
	 * @name formlyForm
	 * @restrict AE
	 */
	// @ngInject
	function formlyForm(formlyUsability, formlyWarn, $parse, formlyConfig, $interpolate) {
	  var currentFormId = 1;
	  FormlyFormController.$inject = ["$scope", "formlyApiCheck", "formlyUtil"];
	  return {
	    restrict: 'AE',
	    template: formlyFormGetTemplate,
	    replace: true,
	    transclude: true,
	    scope: {
	      fields: '=',
	      model: '=',
	      form: '=?',
	      options: '=?'
	    },
	    controller: FormlyFormController,
	    link: formlyFormLink
	  };

	  function formlyFormGetTemplate(el, attrs) {
	    var rootEl = getRootEl();
	    var fieldRootEl = getFieldRootEl();
	    var formId = 'formly_' + currentFormId++;
	    var parentFormAttributes = '';
	    if (attrs.hasOwnProperty('isFieldGroup') && el.parent().parent().hasClass('formly')) {
	      parentFormAttributes = copyAttributes(el.parent().parent()[0].attributes);
	    }
	    return '\n        <' + rootEl + ' class="formly"\n                 name="' + getFormName() + '"\n                 role="form" ' + parentFormAttributes + '>\n          <' + fieldRootEl + ' formly-field\n               ng-repeat="field in fields ' + getTrackBy() + '"\n               ' + getHideDirective() + '="!field.hide"\n               class="formly-field"\n               options="field"\n               model="field.model || model"\n               original-model="model"\n               fields="fields"\n               form="theFormlyForm"\n               form-id="' + getFormName() + '"\n               form-state="options.formState"\n               form-options="options"\n               index="$index">\n          </' + fieldRootEl + '>\n          <div ng-transclude class="' + getTranscludeClass() + '"></div>\n        </' + rootEl + '>\n      ';

	    function getRootEl() {
	      return attrs.rootEl || 'ng-form';
	    }

	    function getFieldRootEl() {
	      return attrs.fieldRootEl || 'div';
	    }

	    function getHideDirective() {
	      return attrs.hideDirective || formlyConfig.extras.defaultHideDirective || 'ng-if';
	    }

	    function getTrackBy() {
	      if (!attrs.trackBy) {
	        return '';
	      } else {
	        return 'track by ' + attrs.trackBy;
	      }
	    }

	    function getFormName() {
	      var formName = formId;
	      var bindName = attrs.bindName;
	      if (bindName) {
	        if (_angularFix2['default'].version.minor < 3) {
	          throw formlyUsability.getFormlyError('bind-name attribute on formly-form not allowed in < angular 1.3');
	        }
	        // we can do a one-time binding here because we know we're in 1.3.x territory
	        formName = $interpolate.startSymbol() + '::\'formly_\' + ' + bindName + $interpolate.endSymbol();
	      }
	      return formName;
	    }

	    function getTranscludeClass() {
	      return attrs.transcludeClass || '';
	    }

	    function copyAttributes(attributes) {
	      var excluded = ['model', 'form', 'fields', 'options', 'name', 'role', 'class', 'data-model', 'data-form', 'data-fields', 'data-options', 'data-name'];
	      var arrayAttrs = [];
	      _angularFix2['default'].forEach(attributes, function (_ref) {
	        var nodeName = _ref.nodeName;
	        var value = _ref.value;

	        if (nodeName !== 'undefined' && excluded.indexOf(nodeName) === -1) {
	          arrayAttrs.push(toKebabCase(nodeName) + '="' + value + '"');
	        }
	      });
	      return arrayAttrs.join(' ');
	    }
	  }

	  // @ngInject
	  function FormlyFormController($scope, formlyApiCheck, formlyUtil) {
	    setupOptions();
	    $scope.model = $scope.model || {};
	    setupFields();

	    // watch the model and evaluate watch expressions that depend on it.
	    $scope.$watch('model', onModelOrFormStateChange, true);
	    if ($scope.options.formState) {
	      $scope.$watch('options.formState', onModelOrFormStateChange, true);
	    }

	    function onModelOrFormStateChange() {
	      _angularFix2['default'].forEach($scope.fields, function runFieldExpressionProperties(field, index) {
	        var model = field.model || $scope.model;
	        var promise = field.runExpressions && field.runExpressions();
	        if (field.hideExpression) {
	          // can't use hide with expressionProperties reliably
	          var val = model[field.key];
	          field.hide = evalCloseToFormlyExpression(field.hideExpression, val, field, index);
	        }
	        if (field.extras && field.extras.validateOnModelChange && field.formControl) {
	          var validate = field.formControl.$validate;
	          if (promise) {
	            promise.then(validate);
	          } else {
	            validate();
	          }
	        }
	      });
	    }

	    function setupFields() {
	      $scope.fields = $scope.fields || [];

	      checkDeprecatedOptions($scope.options);

	      var fieldTransforms = $scope.options.fieldTransform || formlyConfig.extras.fieldTransform;

	      if (!_angularFix2['default'].isArray(fieldTransforms)) {
	        fieldTransforms = [fieldTransforms];
	      }

	      _angularFix2['default'].forEach(fieldTransforms, function transformFields(fieldTransform) {
	        if (fieldTransform) {
	          $scope.fields = fieldTransform($scope.fields, $scope.model, $scope.options, $scope.form);
	          if (!$scope.fields) {
	            throw formlyUsability.getFormlyError('fieldTransform must return an array of fields');
	          }
	        }
	      });

	      setupModels();

	      _angularFix2['default'].forEach($scope.fields, attachKey); // attaches a key based on the index if a key isn't specified
	      _angularFix2['default'].forEach($scope.fields, setupWatchers); // setup watchers for all fields
	    }

	    function checkDeprecatedOptions(options) {
	      if (formlyConfig.extras.fieldTransform && _angularFix2['default'].isFunction(formlyConfig.extras.fieldTransform)) {
	        formlyWarn('fieldtransform-as-a-function-deprecated', 'fieldTransform as a function has been deprecated.', 'Attempted for formlyConfig.extras: ' + formlyConfig.extras.fieldTransform.name, formlyConfig.extras);
	      } else if (options.fieldTransform && _angularFix2['default'].isFunction(options.fieldTransform)) {
	        formlyWarn('fieldtransform-as-a-function-deprecated', 'fieldTransform as a function has been deprecated.', 'Attempted for form', options);
	      }
	    }

	    function setupOptions() {
	      formlyApiCheck['throw']([formlyApiCheck.formOptionsApi.optional], [$scope.options], { prefix: 'formly-form options check' });
	      $scope.options = $scope.options || {};
	      $scope.options.formState = $scope.options.formState || {};

	      _angularFix2['default'].extend($scope.options, {
	        updateInitialValue: updateInitialValue,
	        resetModel: resetModel
	      });
	    }

	    function updateInitialValue() {
	      _angularFix2['default'].forEach($scope.fields, function (field) {
	        if (isFieldGroup(field) && field.options) {
	          field.options.updateInitialValue();
	        } else {
	          field.updateInitialValue();
	        }
	      });
	    }

	    function resetModel() {
	      _angularFix2['default'].forEach($scope.fields, function (field) {
	        if (isFieldGroup(field) && field.options) {
	          field.options.resetModel();
	        } else if (field.resetModel) {
	          field.resetModel();
	        }
	      });
	    }

	    function setupModels() {
	      // a set of field models that are already watched (the $scope.model will have its own watcher)
	      var watchedModels = [$scope.model];

	      if ($scope.options.formState) {
	        // $scope.options.formState will have its own watcher
	        watchedModels.push($scope.options.formState);
	      }

	      _angularFix2['default'].forEach($scope.fields, function (field) {
	        var isNewModel = initModel(field);

	        if (field.model && isNewModel && watchedModels.indexOf(field.model) === -1) {
	          $scope.$watch(function () {
	            return field.model;
	          }, onModelOrFormStateChange, true);
	          watchedModels.push(field.model);
	        }
	      });
	    }

	    function initModel(field) {
	      var isNewModel = true;

	      if (_angularFix2['default'].isString(field.model)) {
	        var expression = field.model;
	        var index = $scope.fields.indexOf(field);

	        isNewModel = !refrencesCurrentlyWatchedModel(expression);

	        field.model = evalCloseToFormlyExpression(expression, undefined, field, index);
	        if (!field.model) {
	          throw formlyUsability.getFieldError('field-model-must-be-initialized', 'Field model must be initialized. When specifying a model as a string for a field, the result of the' + ' expression must have been initialized ahead of time.', field);
	        }
	      }
	      return isNewModel;
	    }

	    function refrencesCurrentlyWatchedModel(expression) {
	      return ['model', 'formState'].some(function (item) {
	        return formlyUtil.startsWith(expression, item + '.') || formlyUtil.startsWith(expression, item + '[');
	      });
	    }

	    function attachKey(field, index) {
	      if (!isFieldGroup(field)) {
	        field.key = field.key || index || 0;
	      }
	    }

	    function setupWatchers(field, index) {
	      if (isFieldGroup(field) || !_angularFix2['default'].isDefined(field.watcher)) {
	        return;
	      }
	      var watchers = field.watcher;
	      if (!_angularFix2['default'].isArray(watchers)) {
	        watchers = [watchers];
	      }
	      _angularFix2['default'].forEach(watchers, function setupWatcher(watcher) {
	        if (!_angularFix2['default'].isDefined(watcher.listener)) {
	          throw formlyUsability.getFieldError('all-field-watchers-must-have-a-listener', 'All field watchers must have a listener', field);
	        }
	        var watchExpression = getWatchExpression(watcher, field, index);
	        var watchListener = getWatchListener(watcher, field, index);

	        var type = watcher.type || '$watch';
	        watcher.stopWatching = $scope[type](watchExpression, watchListener, watcher.watchDeep);
	      });
	    }

	    function getWatchExpression(watcher, field, index) {
	      var watchExpression = watcher.expression || 'model[\'' + field.key.toString().split('.').join('\'][\'') + '\']';
	      if (_angularFix2['default'].isFunction(watchExpression)) {
	        (function () {
	          // wrap the field's watch expression so we can call it with the field as the first arg
	          // and the stop function as the last arg as a helper
	          var originalExpression = watchExpression;
	          watchExpression = function formlyWatchExpression() {
	            var args = modifyArgs.apply(undefined, [watcher, index].concat(_slice.call(arguments)));
	            return originalExpression.apply(undefined, _toConsumableArray(args));
	          };
	          watchExpression.displayName = 'Formly Watch Expression for field for ' + field.key;
	        })();
	      }
	      return watchExpression;
	    }

	    function getWatchListener(watcher, field, index) {
	      var watchListener = watcher.listener;
	      if (_angularFix2['default'].isFunction(watchListener)) {
	        (function () {
	          // wrap the field's watch listener so we can call it with the field as the first arg
	          // and the stop function as the last arg as a helper
	          var originalListener = watchListener;
	          watchListener = function formlyWatchListener() {
	            var args = modifyArgs.apply(undefined, [watcher, index].concat(_slice.call(arguments)));
	            return originalListener.apply(undefined, _toConsumableArray(args));
	          };
	          watchListener.displayName = 'Formly Watch Listener for field for ' + field.key;
	        })();
	      }
	      return watchListener;
	    }

	    function modifyArgs(watcher, index) {
	      for (var _len = arguments.length, originalArgs = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	        originalArgs[_key - 2] = arguments[_key];
	      }

	      return [$scope.fields[index]].concat(originalArgs, [watcher.stopWatching]);
	    }

	    function evalCloseToFormlyExpression(expression, val, field, index) {
	      var extraLocals = getFormlyFieldLikeLocals(field, index);
	      return formlyUtil.formlyEval($scope, expression, val, val, extraLocals);
	    }

	    function getFormlyFieldLikeLocals(field, index) {
	      // this makes it closer to what a regular formlyExpression would be
	      return {
	        options: field,
	        index: index,
	        formState: $scope.options.formState,
	        formId: $scope.formId
	      };
	    }
	  }

	  function formlyFormLink(scope, el, attrs) {
	    setFormController();
	    fixChromeAutocomplete();

	    function setFormController() {
	      var formId = attrs.name;
	      scope.formId = formId;
	      scope.theFormlyForm = scope[formId];
	      if (attrs.form) {
	        var getter = $parse(attrs.form);
	        var setter = getter.assign;
	        var parentForm = getter(scope.$parent);
	        if (parentForm) {
	          scope.theFormlyForm = parentForm;
	          if (scope[formId]) {
	            scope.theFormlyForm.$removeControl(scope[formId]);
	          }

	          // this next line is probably one of the more dangerous things that angular-formly does to improve the
	          // API for angular-formly forms. It ensures that the NgModelControllers inside of formly-form will be
	          // attached to the form that is passed to formly-form rather than the one that formly-form creates
	          // this is necessary because it's confusing to have a step between the form you pass in
	          // and the fields in that form. It also is because angular doesn't propagate properties like $submitted down
	          // to children forms :-( This line was added to solve this issue:
	          // https://github.com/formly-js/angular-formly/issues/287
	          // luckily, this is how the formController has been accessed by the NgModelController since angular 1.0.0
	          // so I expect it will remain this way for the life of angular 1.x
	          el.removeData('$formController');
	        } else {
	          setter(scope.$parent, scope[formId]);
	        }
	      }
	      if (!scope.theFormlyForm && !formlyConfig.disableWarnings) {
	        /* eslint no-console:0 */
	        formlyWarn('formly-form-has-no-formcontroller', 'Your formly-form does not have a `form` property. Many functions of the form (like validation) may not work', el, scope);
	      }
	    }

	    /*
	     * chrome autocomplete lameness
	     * see https://code.google.com/p/chromium/issues/detail?id=468153#c14
	     * ლ(ಠ益ಠლ)   (╯°□°)╯︵ ┻━┻    (◞‸◟；)
	     */
	    function fixChromeAutocomplete() {
	      var global = formlyConfig.extras.removeChromeAutoComplete === true;
	      var offInstance = scope.options && scope.options.removeChromeAutoComplete === false;
	      var onInstance = scope.options && scope.options.removeChromeAutoComplete === true;
	      if (global && !offInstance || onInstance) {
	        var input = document.createElement('input');
	        input.setAttribute('autocomplete', 'address-level4');
	        input.setAttribute('hidden', 'true');
	        el[0].appendChild(input);
	      }
	    }
	  }

	  // stateless util functions
	  function toKebabCase(string) {
	    if (string) {
	      return string.replace(/([A-Z])/g, function ($1) {
	        return '-' + $1.toLowerCase();
	      });
	    } else {
	      return '';
	    }
	  }

	  function isFieldGroup(field) {
	    return field && !!field.fieldGroup;
	  }
	}
	formlyForm.$inject = ["formlyUsability", "formlyWarn", "$parse", "formlyConfig", "$interpolate"];
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _angularFix = __webpack_require__(2);

	var _angularFix2 = _interopRequireDefault(_angularFix);

	var _otherUtils = __webpack_require__(9);

	exports['default'] = addFormlyNgModelAttrsManipulator;

	// @ngInject
	function addFormlyNgModelAttrsManipulator(formlyConfig, $interpolate) {
	  if (formlyConfig.extras.disableNgModelAttrsManipulator) {
	    return;
	  }
	  formlyConfig.templateManipulators.preWrapper.push(ngModelAttrsManipulator);

	  function ngModelAttrsManipulator(template, options, scope) {
	    var node = document.createElement('div');
	    var skip = options.extras && options.extras.skipNgModelAttrsManipulator;
	    if (skip === true) {
	      return template;
	    }
	    node.innerHTML = template;

	    var modelNodes = getNgModelNodes(node, skip);
	    if (!modelNodes || !modelNodes.length) {
	      return template;
	    }

	    addIfNotPresent(modelNodes, 'id', scope.id);
	    addIfNotPresent(modelNodes, 'name', scope.name || scope.id);

	    addValidation();
	    alterNgModelAttr();
	    addModelOptions();
	    addTemplateOptionsAttrs();
	    addNgModelElAttrs();

	    return node.innerHTML;

	    function addValidation() {
	      if (_angularFix2['default'].isDefined(options.validators) || _angularFix2['default'].isDefined(options.validation.messages)) {
	        addIfNotPresent(modelNodes, 'formly-custom-validation', '');
	      }
	    }

	    function alterNgModelAttr() {
	      if (isPropertyAccessor(options.key)) {
	        addRegardlessOfPresence(modelNodes, 'ng-model', 'model.' + options.key);
	      }
	    }

	    function addModelOptions() {
	      if (_angularFix2['default'].isDefined(options.modelOptions)) {
	        addIfNotPresent(modelNodes, 'ng-model-options', 'options.modelOptions');
	        if (options.modelOptions.getterSetter) {
	          addRegardlessOfPresence(modelNodes, 'ng-model', 'options.value');
	        }
	      }
	    }

	    function addTemplateOptionsAttrs() {
	      if (!options.templateOptions && !options.expressionProperties) {
	        // no need to run these if there are no templateOptions or expressionProperties
	        return;
	      }
	      var to = options.templateOptions || {};
	      var ep = options.expressionProperties || {};

	      var ngModelAttributes = getBuiltInAttributes();

	      // extend with the user's specifications winning
	      _angularFix2['default'].extend(ngModelAttributes, options.ngModelAttrs);

	      // Feel free to make this more simple :-)
	      _angularFix2['default'].forEach(ngModelAttributes, function (val, name) {
	        /* eslint complexity:[2, 14] */
	        var attrVal = undefined,
	            attrName = undefined;
	        var ref = 'options.templateOptions[\'' + name + '\']';
	        var toVal = to[name];
	        var epVal = getEpValue(ep, name);

	        var inTo = _angularFix2['default'].isDefined(toVal);
	        var inEp = _angularFix2['default'].isDefined(epVal);
	        if (val.value) {
	          // I realize this looks backwards, but it's right, trust me...
	          attrName = val.value;
	          attrVal = name;
	        } else if (val.statement && inTo) {
	          attrName = val.statement;
	          if (_angularFix2['default'].isString(to[name])) {
	            attrVal = '$eval(' + ref + ')';
	          } else if (_angularFix2['default'].isFunction(to[name])) {
	            attrVal = ref + '(model[options.key], options, this, $event)';
	          } else {
	            throw new Error('options.templateOptions.' + name + ' must be a string or function: ' + JSON.stringify(options));
	          }
	        } else if (val.bound && inEp) {
	          attrName = val.bound;
	          attrVal = ref;
	        } else if ((val.attribute || val.boolean) && inEp) {
	          attrName = val.attribute || val.boolean;
	          attrVal = '' + $interpolate.startSymbol() + ref + $interpolate.endSymbol();
	        } else if (val.attribute && inTo) {
	          attrName = val.attribute;
	          attrVal = toVal;
	        } else if (val.boolean) {
	          if (inTo && !inEp && toVal) {
	            attrName = val.boolean;
	            attrVal = true;
	          } else {
	            /* eslint no-empty:0 */
	            // empty to illustrate that a boolean will not be added via val.bound
	            // if you want it added via val.bound, then put it in expressionProperties
	          }
	        } else if (val.bound && inTo) {
	            attrName = val.bound;
	            attrVal = ref;
	          }

	        if (_angularFix2['default'].isDefined(attrName) && _angularFix2['default'].isDefined(attrVal)) {
	          addIfNotPresent(modelNodes, attrName, attrVal);
	        }
	      });
	    }

	    function addNgModelElAttrs() {
	      _angularFix2['default'].forEach(options.ngModelElAttrs, function (val, name) {
	        addRegardlessOfPresence(modelNodes, name, val);
	      });
	    }
	  }

	  // Utility functions
	  function getNgModelNodes(node, skip) {
	    var selectorNot = _angularFix2['default'].isString(skip) ? ':not(' + skip + ')' : '';
	    var skipNot = ':not([formly-skip-ng-model-attrs-manipulator])';
	    var query = '[ng-model]' + selectorNot + skipNot + ', [data-ng-model]' + selectorNot + skipNot;
	    try {
	      return node.querySelectorAll(query);
	    } catch (e) {
	      //this code is needed for IE8, as it does not support the CSS3 ':not' selector
	      //it should be removed when IE8 support is dropped
	      return getNgModelNodesFallback(node, skip);
	    }
	  }

	  function getNgModelNodesFallback(node, skip) {
	    var allNgModelNodes = node.querySelectorAll('[ng-model], [data-ng-model]');
	    var matchingNgModelNodes = [];

	    //make sure this array is compatible with NodeList type by adding an 'item' function
	    matchingNgModelNodes.item = function (i) {
	      return this[i];
	    };

	    for (var i = 0; i < allNgModelNodes.length; i++) {
	      var ngModelNode = allNgModelNodes[i];
	      if (!ngModelNode.hasAttribute('formly-skip-ng-model-attrs-manipulator') && !(_angularFix2['default'].isString(skip) && nodeMatches(ngModelNode, skip))) {
	        matchingNgModelNodes.push(ngModelNode);
	      }
	    }

	    return matchingNgModelNodes;
	  }

	  function nodeMatches(node, selector) {
	    var div = document.createElement('div');
	    div.innerHTML = node.outerHTML;
	    return div.querySelector(selector);
	  }

	  function getBuiltInAttributes() {
	    var ngModelAttributes = {
	      focus: {
	        attribute: 'formly-focus'
	      }
	    };
	    var boundOnly = [];
	    var bothBooleanAndBound = ['required', 'disabled'];
	    var bothAttributeAndBound = ['pattern', 'minlength'];
	    var statementOnly = ['change', 'keydown', 'keyup', 'keypress', 'click', 'focus', 'blur'];
	    var attributeOnly = ['placeholder', 'min', 'max', 'tabindex', 'type'];
	    if (formlyConfig.extras.ngModelAttrsManipulatorPreferUnbound) {
	      bothAttributeAndBound.push('maxlength');
	    } else {
	      boundOnly.push('maxlength');
	    }

	    _angularFix2['default'].forEach(boundOnly, function (item) {
	      ngModelAttributes[item] = { bound: 'ng-' + item };
	    });

	    _angularFix2['default'].forEach(bothBooleanAndBound, function (item) {
	      ngModelAttributes[item] = { boolean: item, bound: 'ng-' + item };
	    });

	    _angularFix2['default'].forEach(bothAttributeAndBound, function (item) {
	      ngModelAttributes[item] = { attribute: item, bound: 'ng-' + item };
	    });

	    _angularFix2['default'].forEach(statementOnly, function (item) {
	      var propName = 'on' + item.substr(0, 1).toUpperCase() + item.substr(1);
	      ngModelAttributes[propName] = { statement: 'ng-' + item };
	    });

	    _angularFix2['default'].forEach(attributeOnly, function (item) {
	      ngModelAttributes[item] = { attribute: item };
	    });
	    return ngModelAttributes;
	  }

	  function getEpValue(ep, name) {
	    return ep['templateOptions.' + name] || ep['templateOptions[\'' + name + '\']'] || ep['templateOptions["' + name + '"]'];
	  }

	  function addIfNotPresent(nodes, attr, val) {
	    _angularFix2['default'].forEach(nodes, function (node) {
	      if (!node.getAttribute(attr)) {
	        node.setAttribute(attr, val);
	      }
	    });
	  }

	  function addRegardlessOfPresence(nodes, attr, val) {
	    _angularFix2['default'].forEach(nodes, function (node) {
	      node.setAttribute(attr, val);
	    });
	  }

	  function isPropertyAccessor(key) {
	    return (0, _otherUtils.contains)(key, '.') || (0, _otherUtils.contains)(key, '[') && (0, _otherUtils.contains)(key, ']');
	  }
	}
	addFormlyNgModelAttrsManipulator.$inject = ["formlyConfig", "$interpolate"];
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _angularFix = __webpack_require__(2);

	var _angularFix2 = _interopRequireDefault(_angularFix);

	exports['default'] = addCustomTags;

	// @ngInject
	function addCustomTags($document) {
	  // IE8 check ->
	  // https://msdn.microsoft.com/en-us/library/cc196988(v=vs.85).aspx
	  if ($document && $document.documentMode < 9) {
	    (function () {
	      var document = $document.get(0);
	      // add the custom elements that we need for formly
	      var customElements = ['formly-field', 'formly-form'];
	      _angularFix2['default'].forEach(customElements, function (el) {
	        document.createElement(el);
	      });
	    })();
	  }
	}
	addCustomTags.$inject = ["$document"];
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;