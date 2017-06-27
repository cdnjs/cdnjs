// angular-formly version 6.3.3 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("api-check"), require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["api-check", "angular"], factory);
	else if(typeof exports === 'object')
		exports["ngFormly"] = factory(require("api-check"), require("angular"));
	else
		root["ngFormly"] = factory(root["apiCheck"], root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_17__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var index = _interopRequire(__webpack_require__(1));
	
	module.exports = index;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var angular = _interopRequire(__webpack_require__(15));
	
	var formlyApiCheck = _interopRequire(__webpack_require__(2));
	
	var formlyErrorAndWarningsUrlPrefix = _interopRequire(__webpack_require__(3));
	
	var formlyUsability = _interopRequire(__webpack_require__(4));
	
	var formlyConfig = _interopRequire(__webpack_require__(5));
	
	var formlyValidationMessages = _interopRequire(__webpack_require__(6));
	
	var formlyUtil = _interopRequire(__webpack_require__(7));
	
	var formlyWarn = _interopRequire(__webpack_require__(8));
	
	var formlyCustomValidation = _interopRequire(__webpack_require__(9));
	
	var formlyField = _interopRequire(__webpack_require__(10));
	
	var formlyFocus = _interopRequire(__webpack_require__(11));
	
	var formlyForm = _interopRequire(__webpack_require__(12));
	
	var formlyNgModelAttrsManipulator = _interopRequire(__webpack_require__(13));
	
	var formlyCustomTags = _interopRequire(__webpack_require__(14));
	
	var ngModuleName = "formly";
	
	module.exports = ngModuleName;
	
	var ngModule = angular.module(ngModuleName, []);
	
	ngModule.constant("formlyApiCheck", formlyApiCheck);
	ngModule.constant("formlyErrorAndWarningsUrlPrefix", formlyErrorAndWarningsUrlPrefix);
	ngModule.constant("formlyVersion", ("6.3.3")); // <-- webpack variable
	
	ngModule.provider("formlyUsability", formlyUsability);
	ngModule.provider("formlyConfig", formlyConfig);
	
	ngModule.factory("formlyValidationMessages", formlyValidationMessages);
	ngModule.factory("formlyUtil", formlyUtil);
	ngModule.factory("formlyWarn", formlyWarn);
	
	ngModule.directive("formlyCustomValidation", formlyCustomValidation);
	ngModule.directive("formlyField", formlyField);
	ngModule.directive("formlyFocus", formlyFocus);
	ngModule.directive("formlyForm", formlyForm);
	
	ngModule.run(formlyNgModelAttrsManipulator);
	ngModule.run(formlyCustomTags);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var apiCheckFactory = _interopRequire(__webpack_require__(16));
	
	var apiCheck = apiCheckFactory({
	  output: {
	    prefix: "angular-formly:",
	    docsBaseUrl: __webpack_require__(3)
	  }
	});
	
	function shapeRequiredIfNot(otherProps, propChecker) {
	  if (!angular.isArray(otherProps)) {
	    otherProps = [otherProps];
	  }
	  var type = "specified if these are not specified: `" + otherProps.join(", ") + "` (otherwise it's optional)";
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
	var specifyWrapperType = apiCheck.oneOfType([apiCheck.oneOf([null]), apiCheck.typeOrArrayOf(apiCheck.string)]);
	
	var apiCheckProperty = apiCheck.objectOf(apiCheck.func);
	
	var apiCheckInstanceProperty = apiCheck.shape.onlyIf("apiCheck", apiCheck.func.withProperties({
	  warn: apiCheck.func,
	  "throw": apiCheck.func,
	  shape: apiCheck.func
	}));
	
	var apiCheckFunctionProperty = apiCheck.shape.onlyIf("apiCheck", apiCheck.oneOf(["throw", "warn"]));
	
	var formlyWrapperType = apiCheck.shape({
	  name: shapeRequiredIfNot("types", apiCheck.string).optional,
	  template: apiCheck.shape.ifNot("templateUrl", apiCheck.string).optional,
	  templateUrl: apiCheck.shape.ifNot("template", apiCheck.string).optional,
	  types: apiCheck.typeOrArrayOf(apiCheck.string).optional,
	  overwriteOk: apiCheck.bool.optional,
	  validateOptions: apiCheck.func.optional,
	  apiCheck: apiCheckProperty.optional,
	  apiCheckInstance: apiCheckInstanceProperty.optional,
	  apiCheckFunction: apiCheckFunctionProperty.optional,
	  apiCheckOptions: apiCheck.object.optional
	}).strict;
	
	var fieldOptionsApiShape = {
	  $$hashKey: apiCheck.any.optional,
	  type: apiCheck.shape.ifNot(["template", "templateUrl"], apiCheck.string).optional,
	  template: apiCheck.shape.ifNot(["type", "templateUrl"], apiCheck.oneOfType([apiCheck.string, apiCheck.func])).optional,
	  templateUrl: apiCheck.shape.ifNot(["type", "template"], apiCheck.oneOfType([apiCheck.string, apiCheck.func])).optional,
	  key: apiCheck.oneOfType([apiCheck.string, apiCheck.number]),
	  model: apiCheck.object.optional,
	  expressionProperties: apiCheck.objectOf(apiCheck.oneOfType([formlyExpression, apiCheck.shape({
	    expression: formlyExpression,
	    message: formlyExpression.optional
	  }).strict])).optional,
	  data: apiCheck.object.optional,
	  templateOptions: apiCheck.object.optional,
	  wrapper: specifyWrapperType.optional,
	  modelOptions: apiCheck.shape({
	    updateOn: apiCheck.string.optional,
	    debounce: apiCheck.oneOfType([apiCheck.object, apiCheck.string]).optional,
	    allowInvalid: apiCheck.bool.optional,
	    getterSetter: apiCheck.bool.optional,
	    timezone: apiCheck.string.optional
	  }).optional,
	  watcher: apiCheck.typeOrArrayOf(apiCheck.shape({
	    expression: formlyExpression.optional,
	    listener: formlyExpression
	  })).optional,
	  validators: apiCheck.objectOf(apiCheck.oneOfType([formlyExpression, apiCheck.shape({
	    expression: formlyExpression,
	    message: formlyExpression.optional
	  }).strict])).optional,
	  noFormControl: apiCheck.bool.optional,
	  hide: apiCheck.bool.optional,
	  ngModelAttrs: apiCheck.objectOf(apiCheck.shape({
	    expression: apiCheck.shape.ifNot(["value", "attribute", "bound"], apiCheck.any).optional,
	    value: apiCheck.shape.ifNot("expression", apiCheck.any).optional,
	    attribute: apiCheck.shape.ifNot("expression", apiCheck.any).optional,
	    bound: apiCheck.shape.ifNot("expression", apiCheck.any).optional
	  }).strict).optional,
	  optionsTypes: apiCheck.typeOrArrayOf(apiCheck.string).optional,
	  link: apiCheck.func.optional,
	  controller: apiCheck.oneOfType([apiCheck.string, apiCheck.func, apiCheck.array]).optional,
	  validation: apiCheck.shape({
	    show: apiCheck.oneOfType([apiCheck.bool, apiCheck.oneOf([null])]).optional,
	    messages: apiCheck.objectOf(formlyExpression).optional,
	    errorExistsAndShouldBeVisible: apiCheck.bool.optional
	  }).optional,
	  formControl: apiCheck.object.optional,
	  value: apiCheck.func.optional,
	  runExpressions: apiCheck.func.optional,
	  resetModel: apiCheck.func.optional,
	  updateInitialValue: apiCheck.func.optional,
	  initialValue: apiCheck.any.optional,
	  defaultValue: apiCheck.any.optional
	};
	
	var formlyFieldOptions = apiCheck.shape(fieldOptionsApiShape).strict;
	
	var typeOptionsDefaultOptions = angular.copy(fieldOptionsApiShape);
	typeOptionsDefaultOptions.key = apiCheck.string.optional;
	
	var formlyTypeOptions = apiCheck.shape({
	  name: apiCheck.string,
	  template: apiCheck.shape.ifNot("templateUrl", apiCheck.oneOfType([apiCheck.string, apiCheck.func])).optional,
	  templateUrl: apiCheck.shape.ifNot("template", apiCheck.oneOfType([apiCheck.string, apiCheck.func])).optional,
	  controller: apiCheck.oneOfType([apiCheck.func, apiCheck.string, apiCheck.array]).optional,
	  link: apiCheck.func.optional,
	  defaultOptions: apiCheck.oneOfType([apiCheck.func, apiCheck.shape(typeOptionsDefaultOptions)]).optional,
	  "extends": apiCheck.string.optional,
	  wrapper: specifyWrapperType.optional,
	  data: apiCheck.object.optional,
	  validateOptions: apiCheck.func.optional,
	  apiCheck: apiCheckProperty.optional,
	  apiCheckInstance: apiCheckInstanceProperty.optional,
	  apiCheckFunction: apiCheckFunctionProperty.optional,
	  apiCheckOptions: apiCheck.object.optional,
	  overwriteOk: apiCheck.bool.optional
	}).strict;
	
	angular.extend(apiCheck, {
	  formlyTypeOptions: formlyTypeOptions, formlyFieldOptions: formlyFieldOptions, formlyExpression: formlyExpression, formlyWrapperType: formlyWrapperType
	});
	
	module.exports = apiCheck;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = "https://github.com/formly-js/angular-formly/blob/" + ("6.3.3") + "/other/ERRORS_AND_WARNINGS.md#";

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var angular = _interopRequire(__webpack_require__(15));
	
	module.exports = formlyUsability;
	
	// @ngInject
	function formlyUsability(formlyApiCheck, formlyErrorAndWarningsUrlPrefix) {
	  var _this = this;
	
	  angular.extend(this, {
	    getFormlyError: getFormlyError,
	    getFieldError: getFieldError,
	    checkWrapper: checkWrapper,
	    checkWrapperTemplate: checkWrapperTemplate,
	    $get: function () {
	      return _this;
	    }
	  });
	
	  function getFieldError(errorInfoSlug, message, field) {
	    if (arguments.length < 3) {
	      field = message;
	      message = errorInfoSlug;
	      errorInfoSlug = null;
	    }
	    return new Error(getErrorMessage(errorInfoSlug, message) + (" Field definition: " + angular.toJson(field)));
	  }
	
	  function getFormlyError(errorInfoSlug, message) {
	    if (!message) {
	      message = errorInfoSlug;
	      errorInfoSlug = null;
	    }
	    return new Error(getErrorMessage(errorInfoSlug, message));
	  }
	
	  function getErrorMessage(errorInfoSlug, message) {
	    var url = "";
	    if (errorInfoSlug !== null) {
	      url = "" + formlyErrorAndWarningsUrlPrefix + "" + errorInfoSlug;
	    }
	    return "Formly Error: " + message + ". " + url;
	  }
	
	  function checkWrapper(wrapper) {
	    formlyApiCheck["throw"](formlyApiCheck.formlyWrapperType, wrapper, {
	      prefix: "formlyConfig.setWrapper",
	      urlSuffix: "setwrapper-validation-failed"
	    });
	  }
	
	  function checkWrapperTemplate(template, additionalInfo) {
	    var formlyTransclude = "<formly-transclude></formly-transclude>";
	    if (template.indexOf(formlyTransclude) === -1) {
	      throw getFormlyError("Template wrapper templates must use \"" + formlyTransclude + "\" somewhere in them. " + ("This one does not have \"<formly-transclude></formly-transclude>\" in it: " + template) + "\n" + ("Additional information: " + JSON.stringify(additionalInfo)));
	    }
	  }
	}
	formlyUsability.$inject = ["formlyApiCheck", "formlyErrorAndWarningsUrlPrefix"];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var angular = _interopRequire(__webpack_require__(15));
	
	var utils = _interopRequire(__webpack_require__(18));
	
	module.exports = formlyConfig;
	
	// @ngInject
	function formlyConfig(formlyUsabilityProvider, formlyApiCheck) {
	  var _this2 = this;
	
	  var typeMap = {};
	  var templateWrappersMap = {};
	  var defaultWrapperName = "default";
	  var _this = this;
	  var getError = formlyUsabilityProvider.getFormlyError;
	
	  angular.extend(this, {
	    setType: setType,
	    getType: getType,
	    setWrapper: setWrapper,
	    getWrapper: getWrapper,
	    getWrapperByType: getWrapperByType,
	    removeWrapperByName: removeWrapperByName,
	    removeWrappersForType: removeWrappersForType,
	    disableWarnings: false,
	    extras: {
	      disableNgModelAttrsManipulator: false,
	      ngModelAttrsManipulatorPreferUnbound: false,
	      removeChromeAutoComplete: false,
	      defaultHideDirective: "ng-if"
	    },
	    templateManipulators: {
	      preWrapper: [],
	      postWrapper: []
	    },
	    $get: function () {
	      return _this2;
	    }
	  });
	
	  function setType(options) {
	    if (angular.isArray(options)) {
	      angular.forEach(options, setType);
	    } else if (angular.isObject(options)) {
	      checkType(options);
	      if (options["extends"]) {
	        extendTypeOptions(options);
	      }
	      typeMap[options.name] = options;
	    } else {
	      throw getError("You must provide an object or array for setType. You provided: " + JSON.stringify(arguments));
	    }
	  }
	
	  function checkType(options) {
	    formlyApiCheck["throw"](formlyApiCheck.formlyTypeOptions, options, {
	      prefix: "formlyConfig.setType",
	      url: "settype-validation-failed"
	    });
	    if (!options.overwriteOk) {
	      checkOverwrite(options.name, typeMap, options, "types");
	    } else {
	      options.overwriteOk = undefined;
	    }
	  }
	
	  function extendTypeOptions(options) {
	    var extendsType = getType(options["extends"], true, options);
	    extendTypeControllerFunction(options, extendsType);
	    extendTypeLinkFunction(options, extendsType);
	    extendTypeValidateOptionsFunction(options, extendsType);
	    extendTypeDefaultOptions(options, extendsType);
	    utils.reverseDeepMerge(options, extendsType);
	  }
	
	  function extendTypeControllerFunction(options, extendsType) {
	    var extendsCtrl = extendsType.controller;
	    if (!angular.isDefined(extendsCtrl)) {
	      return;
	    }
	    var optionsCtrl = options.controller;
	    if (angular.isDefined(optionsCtrl)) {
	      options.controller = function ($scope, $controller) {
	        $controller(extendsCtrl, { $scope: $scope });
	        $controller(optionsCtrl, { $scope: $scope });
	      };
	      options.controller.$inject = ["$scope", "$controller"];
	    } else {
	      options.controller = extendsCtrl;
	    }
	  }
	
	  function extendTypeLinkFunction(options, extendsType) {
	    var extendsFn = extendsType.link;
	    if (!angular.isDefined(extendsFn)) {
	      return;
	    }
	    var optionsFn = options.link;
	    if (angular.isDefined(optionsFn)) {
	      options.link = function () {
	        extendsFn.apply(undefined, arguments);
	        optionsFn.apply(undefined, arguments);
	      };
	    } else {
	      options.link = extendsFn;
	    }
	  }
	
	  function extendTypeValidateOptionsFunction(options, extendsType) {
	    var extendsFn = extendsType.validateOptions;
	    if (!angular.isDefined(extendsFn)) {
	      return;
	    }
	    var optionsFn = options.validateOptions;
	    var originalDefaultOptions = options.defaultOptions;
	    if (angular.isDefined(optionsFn)) {
	      options.validateOptions = function (options) {
	        optionsFn(options);
	        var mergedOptions = angular.copy(options);
	        var defaultOptions = originalDefaultOptions;
	        if (defaultOptions) {
	          if (angular.isFunction(defaultOptions)) {
	            defaultOptions = defaultOptions(mergedOptions);
	          }
	          utils.reverseDeepMerge(mergedOptions, defaultOptions);
	        }
	        extendsFn(mergedOptions);
	      };
	    } else {
	      options.validateOptions = extendsFn;
	    }
	  }
	
	  function extendTypeDefaultOptions(options, extendsType) {
	    var extendsDO = extendsType.defaultOptions;
	    if (!angular.isDefined(extendsDO)) {
	      return;
	    }
	    var optionsDO = options.defaultOptions;
	    var optionsDOIsFn = angular.isFunction(optionsDO);
	    var extendsDOIsFn = angular.isFunction(extendsDO);
	    if (extendsDOIsFn) {
	      options.defaultOptions = function defaultOptions(options) {
	        var extendsDefaultOptions = extendsDO(options);
	        var mergedDefaultOptions = {};
	        utils.reverseDeepMerge(mergedDefaultOptions, options, extendsDefaultOptions);
	        var extenderOptionsDefaultOptions = optionsDO;
	        if (optionsDOIsFn) {
	          extenderOptionsDefaultOptions = extenderOptionsDefaultOptions(mergedDefaultOptions);
	        }
	        utils.reverseDeepMerge(extendsDefaultOptions, extenderOptionsDefaultOptions);
	        return extendsDefaultOptions;
	      };
	    } else if (optionsDOIsFn) {
	      options.defaultOptions = function defaultOptions(options) {
	        var newDefaultOptions = {};
	        utils.reverseDeepMerge(newDefaultOptions, options, extendsDO);
	        return optionsDO(newDefaultOptions);
	      };
	    }
	  }
	
	  function getType(name, throwError, errorContext) {
	    if (!name) {
	      return undefined;
	    }
	    var type = typeMap[name];
	    if (!type && throwError === true) {
	      throw getError("There is no type by the name of \"" + name + "\": " + JSON.stringify(errorContext));
	    } else {
	      return type;
	    }
	  }
	
	  function setWrapper(_x, _x2) {
	    var _again = true;
	
	    _function: while (_again) {
	      _again = false;
	      var options = _x,
	          name = _x2;
	
	      if (angular.isArray(options)) {
	        return options.map(function (wrapperOptions) {
	          return setWrapper(wrapperOptions);
	        });
	      } else if (angular.isObject(options)) {
	        options.types = getOptionsTypes(options);
	        options.name = getOptionsName(options, name);
	        checkWrapperAPI(options);
	        templateWrappersMap[options.name] = options;
	        return options;
	      } else if (angular.isString(options)) {
	        _x = {
	          template: options,
	          name: name
	        };
	        _again = true;
	        continue _function;
	      }
	    }
	  }
	
	  function getOptionsTypes(options) {
	    if (angular.isString(options.types)) {
	      return [options.types];
	    }
	    if (!angular.isDefined(options.types)) {
	      return [];
	    } else {
	      return options.types;
	    }
	  }
	
	  function getOptionsName(options, name) {
	    return options.name || name || options.types.join(" ") || defaultWrapperName;
	  }
	
	  function checkWrapperAPI(options) {
	    formlyUsabilityProvider.checkWrapper(options);
	    if (options.template) {
	      formlyUsabilityProvider.checkWrapperTemplate(options.template, options);
	    }
	    if (!options.overwriteOk) {
	      checkOverwrite(options.name, templateWrappersMap, options, "templateWrappers");
	    } else {
	      delete options.overwriteOk;
	    }
	    checkWrapperTypes(options);
	  }
	
	  function checkWrapperTypes(options) {
	    var shouldThrow = !angular.isArray(options.types) || !options.types.every(angular.isString);
	    if (shouldThrow) {
	      throw getError("Attempted to create a template wrapper with types that is not a string or an array of strings");
	    }
	  }
	
	  function checkOverwrite(property, object, newValue, objectName) {
	    if (object.hasOwnProperty(property)) {
	      warn(["Attempting to overwrite " + property + " on " + objectName + " which is currently", "" + JSON.stringify(object[property]) + " with " + JSON.stringify(newValue), "To supress this warning, specify the property \"overwriteOk: true\""].join(" "));
	    }
	  }
	
	  function getWrapper(name) {
	    return templateWrappersMap[name || defaultWrapperName];
	  }
	
	  function getWrapperByType(type) {
	    /* jshint maxcomplexity:6 */
	    var wrappers = [];
	    for (var name in templateWrappersMap) {
	      if (templateWrappersMap.hasOwnProperty(name)) {
	        if (templateWrappersMap[name].types && templateWrappersMap[name].types.indexOf(type) !== -1) {
	          wrappers.push(templateWrappersMap[name]);
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
	      return;
	    }
	    if (!angular.isArray(wrappers)) {
	      return removeWrapperByName(wrappers.name);
	    } else {
	      wrappers.forEach(function (wrapper) {
	        return removeWrapperByName(wrapper.name);
	      });
	      return wrappers;
	    }
	  }
	
	  function warn() {
	    if (!_this.disableWarnings) {
	      console.warn.apply(console, arguments);
	    }
	  }
	}
	formlyConfig.$inject = ["formlyUsabilityProvider", "formlyApiCheck"];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = formlyValidationMessages;
	
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
	      if (scope.options.templateOptions[prop]) {
	        return "" + prefix + " " + scope.options.templateOptions[prop] + " " + suffix;
	      } else {
	        return alternate;
	      }
	    };
	  }
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var utils = _interopRequire(__webpack_require__(18));
	
	module.exports = formlyUtil;
	
	// @ngInject
	function formlyUtil() {
	  return utils;
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	module.exports = formlyWarn;
	
	// @ngInject
	function formlyWarn(formlyConfig, formlyErrorAndWarningsUrlPrefix, $log) {
	  return function warn() {
	    if (!formlyConfig.disableWarnings) {
	      var args = Array.prototype.slice.call(arguments);
	      var warnInfoSlug = args.shift();
	      args.unshift("Formly Warning:");
	      args.push("" + formlyErrorAndWarningsUrlPrefix + "" + warnInfoSlug);
	      $log.warn.apply($log, _toConsumableArray(args));
	    }
	  };
	}
	formlyWarn.$inject = ["formlyConfig", "formlyErrorAndWarningsUrlPrefix", "$log"];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = formlyCustomValidation;
	
	// @ngInject
	function formlyCustomValidation(formlyUtil, $q) {
	  return {
	    restrict: "A",
	    require: "ngModel",
	    link: function formlyCustomValidationLink(scope, el, attrs, ctrl) {
	      var opts = scope.options;
	      if (opts.validators) {
	        checkValidators(opts.validators);
	      }
	      opts.validation.messages = opts.validation.messages || {};
	      angular.forEach(opts.validation.messages, function (message, key) {
	        opts.validation.messages[key] = function () {
	          return formlyUtil.formlyEval(scope, message, ctrl.$modelValue, ctrl.$viewValue);
	        };
	      });
	
	      var useNewValidatorsApi = ctrl.hasOwnProperty("$validators") && !attrs.hasOwnProperty("useParsers");
	      angular.forEach(opts.validators, function addValidatorToPipeline(validator, name) {
	        var message = validator.message;
	        if (message) {
	          opts.validation.messages[name] = function () {
	            return formlyUtil.formlyEval(scope, message, ctrl.$modelValue, ctrl.$viewValue);
	          };
	        }
	        validator = angular.isObject(validator) ? validator.expression : validator;
	        var isPossiblyAsync = !angular.isString(validator);
	        if (useNewValidatorsApi) {
	          setupWithValidators();
	        } else {
	          setupWithParsers();
	        }
	
	        function setupWithValidators() {
	          var validatorCollection = isPossiblyAsync ? "$asyncValidators" : "$validators";
	          ctrl[validatorCollection][name] = function evalValidity(modelValue, viewValue) {
	            var value = formlyUtil.formlyEval(scope, validator, modelValue, viewValue);
	            if (isPossiblyAsync) {
	              return isPromiseLike(value) ? value : value ? $q.when(value) : $q.reject(value);
	            } else {
	              return value;
	            }
	          };
	        }
	
	        function setupWithParsers() {
	          var inFlightValidator = undefined;
	          ctrl.$parsers.unshift(function evalValidityOfParser(viewValue) {
	            var isValid = formlyUtil.formlyEval(scope, validator, ctrl.$modelValue, viewValue);
	            if (isPromiseLike(isValid)) {
	              ctrl.$pending = ctrl.$pending || {};
	              ctrl.$pending[name] = true;
	              inFlightValidator = isValid;
	              isValid.then(function () {
	                if (inFlightValidator === isValid) {
	                  ctrl.$setValidity(name, true);
	                }
	              })["catch"](function () {
	                if (inFlightValidator === isValid) {
	                  ctrl.$setValidity(name, false);
	                }
	              })["finally"](function () {
	                if (Object.keys(ctrl.$pending).length === 1) {
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
	      });
	    }
	  };
	
	  function isPromiseLike(obj) {
	    return obj && angular.isFunction(obj.then);
	  }
	
	  function checkValidators(validators) {
	    var allowedProperties = ["expression", "message"];
	    var validatorsWithExtraProps = {};
	    angular.forEach(validators, function (validator, name) {
	      if (angular.isString(validator)) {
	        return;
	      }
	      var extraProps = [];
	      angular.forEach(validator, function (v, key) {
	        if (allowedProperties.indexOf(key) === -1) {
	          extraProps.push(key);
	        }
	      });
	      if (extraProps.length) {
	        validatorsWithExtraProps[name] = extraProps;
	      }
	    });
	    if (Object.keys(validatorsWithExtraProps).length) {
	      throw new Error(["Validators are only allowed to be functions or objects that have " + allowedProperties.join(", ") + ".", "You provided some extra properties: " + JSON.stringify(validatorsWithExtraProps)].join(" "));
	    }
	  }
	}
	formlyCustomValidation.$inject = ["formlyUtil", "$q"];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var angular = _interopRequire(__webpack_require__(15));
	
	module.exports = formlyField;
	
	/**
	 * @ngdoc directive
	 * @name formlyField
	 * @restrict AE
	 */
	// @ngInject
	function formlyField($http, $q, $compile, $templateCache, formlyConfig, formlyValidationMessages, formlyApiCheck, formlyUtil, formlyUsability, formlyWarn) {
	  return {
	    restrict: "AE",
	    transclude: true,
	    scope: {
	      options: "=",
	      model: "=",
	      formId: "@",
	      index: "=?",
	      fields: "=?",
	      formState: "=?",
	      form: "=?"
	    },
	    controller: /* @ngInject */["$scope", "$timeout", "$parse", "$controller", function FormlyFieldController($scope, $timeout, $parse, $controller) {
	      var opts = $scope.options;
	      var fieldType = opts.type && formlyConfig.getType(opts.type);
	      simplifyLife(opts);
	      mergeFieldOptionsWithTypeDefaults(opts, fieldType);
	      extendOptionsWithDefaults(opts, $scope.index);
	      checkApi(opts);
	      // set field id to link labels and fields
	      $scope.id = formlyUtil.getFieldId($scope.formId, opts, $scope.index);
	
	      // initalization
	      setDefaultValue();
	      setInitialValue();
	      runExpressions();
	      addModelWatcher($scope, opts);
	      addValidationMessages(opts);
	      // simplify things
	      // create $scope.to so template authors can reference to instead of $scope.options.templateOptions
	      $scope.to = $scope.options.templateOptions;
	      invokeControllers($scope, opts, fieldType);
	
	      // function definitions
	      function runExpressions() {
	        // must run on next tick to make sure that the current value is correct.
	        $timeout(function runExpressionsOnNextTick() {
	          var field = $scope.options;
	          var currentValue = valueGetterSetter();
	          angular.forEach(field.expressionProperties, function runExpression(expression, prop) {
	            var setter = $parse(prop).assign;
	            var promise = $q.when(formlyUtil.formlyEval($scope, expression, currentValue));
	            promise.then(function setFieldValue(value) {
	              setter(field, value);
	            });
	          });
	        });
	      }
	
	      function valueGetterSetter(newVal) {
	        if (!$scope.model || !$scope.options.key) {
	          return;
	        }
	        if (angular.isDefined(newVal)) {
	          $scope.model[$scope.options.key] = newVal;
	        }
	        return $scope.model[$scope.options.key];
	      }
	
	      function simplifyLife(options) {
	        // add a few empty objects (if they don't already exist) so you don't have to undefined check everywhere
	        formlyUtil.reverseDeepMerge(options, {
	          data: {},
	          templateOptions: {},
	          validation: {}
	        });
	      }
	
	      function setDefaultValue() {
	        if (angular.isDefined(opts.defaultValue) && !angular.isDefined($scope.model[opts.key])) {
	          $scope.model[opts.key] = opts.defaultValue;
	        }
	      }
	
	      function setInitialValue() {
	        opts.initialValue = $scope.model && $scope.model[opts.key];
	      }
	
	      function mergeFieldOptionsWithTypeDefaults(options, type) {
	        if (type) {
	          mergeOptions(options, type.defaultOptions);
	        }
	        var properOrder = arrayify(options.optionsTypes).reverse(); // so the right things are overridden
	        angular.forEach(properOrder, function (typeName) {
	          mergeOptions(options, formlyConfig.getType(typeName, true, options).defaultOptions);
	        });
	      }
	
	      function mergeOptions(options, extraOptions) {
	        if (extraOptions) {
	          if (angular.isFunction(extraOptions)) {
	            extraOptions = extraOptions(options);
	          }
	          formlyUtil.reverseDeepMerge(options, extraOptions);
	        }
	      }
	
	      function extendOptionsWithDefaults(options, index) {
	        var key = options.key || index || 0;
	        angular.extend(options, {
	          // attach the key in case the formly-field directive is used directly
	          key: key,
	          value: valueGetterSetter,
	          runExpressions: runExpressions,
	          resetModel: resetModel,
	          updateInitialValue: updateInitialValue
	        });
	      }
	
	      // initialization functions
	      function addModelWatcher(scope, options) {
	        if (options.model) {
	          scope.$watch("options.model", runExpressions, true);
	        }
	      }
	
	      function resetModel() {
	        $scope.model[$scope.options.key] = $scope.options.initialValue;
	        if ($scope.options.formControl) {
	          $scope.options.formControl.$setViewValue($scope.model[$scope.options.key]);
	          $scope.options.formControl.$render();
	        }
	      }
	
	      function updateInitialValue() {
	        $scope.options.initialValue = $scope.model[$scope.options.key];
	      }
	
	      function addValidationMessages(options) {
	        options.validation.messages = options.validation.messages || {};
	        angular.forEach(formlyValidationMessages.messages, function createFunctionForMessage(expression, name) {
	          if (!options.validation.messages[name]) {
	            options.validation.messages[name] = function evaluateMessage(viewValue, modelValue, scope) {
	              return formlyUtil.formlyEval(scope, expression, modelValue, viewValue);
	            };
	          }
	        });
	      }
	
	      function invokeControllers(scope) {
	        var options = arguments[1] === undefined ? {} : arguments[1];
	        var type = arguments[2] === undefined ? {} : arguments[2];
	
	        angular.forEach([type.controller, options.controller], function (controller) {
	          if (controller) {
	            $controller(controller, { $scope: scope });
	          }
	        });
	      }
	    }],
	    link: function fieldLink(scope, el) {
	      var type = scope.options.type && formlyConfig.getType(scope.options.type);
	      var args = arguments;
	      var thusly = this;
	      getFieldTemplate(scope.options).then(runManipulators(formlyConfig.templateManipulators.preWrapper)).then(transcludeInWrappers(scope.options)).then(runManipulators(formlyConfig.templateManipulators.postWrapper)).then(setElementTemplate).then(watchFormControl)["catch"](function (error) {
	        formlyWarn("there-was-a-problem-setting-the-template-for-this-field", "There was a problem setting the template for this field ", scope.options, error);
	      });
	
	      function setElementTemplate(templateEl) {
	        el.html(asHtml(templateEl));
	        $compile(el.contents())(scope);
	        if (type && type.link) {
	          type.link.apply(thusly, args);
	        }
	        if (scope.options.link) {
	          scope.options.link.apply(thusly, args);
	        }
	      }
	
	      function watchFormControl() {
	        var stopWatchingField = angular.noop;
	        var stopWatchingShowError = angular.noop;
	        if (scope.options.noFormControl) {
	          return;
	        }
	        var ngModelNode = el[0].querySelector("[ng-model]");
	        if (ngModelNode && ngModelNode.name) {
	          watchFieldNameOrExistence(ngModelNode.name);
	        } else if (scope.options.noFormControl === false) {
	          watchForFieldName();
	        }
	
	        function watchForFieldName() {
	          var stopWatchingFieldName = scope.$watch(function () {
	            var ngModelNode = el[0].querySelector("[ng-model]");
	            return ngModelNode && ngModelNode.name;
	          }, function (name) {
	            if (name) {
	              stopWatchingFieldName();
	              watchFieldNameOrExistence(name);
	            }
	          });
	        }
	
	        function watchFieldNameOrExistence(name) {
	          var nameExpressionRegex = /\{\{(.*?)}}/;
	          var nameExpression = nameExpressionRegex.exec(name);
	          if (nameExpression) {
	            watchFieldName(nameExpression[1]);
	          } else {
	            watchFieldExistence(name);
	          }
	        }
	
	        function watchFieldName(expression) {
	          scope.$watch(expression, function oneFieldNameChange(name) {
	            if (name) {
	              stopWatchingField();
	              watchFieldExistence(name);
	            }
	          });
	        }
	
	        function watchFieldExistence(name) {
	          stopWatchingField = scope.$watch("form[\"" + name + "\"]", function formControlChange(formControl) {
	            if (formControl) {
	              scope.fc = formControl; // shortcut for template authors
	              scope.options.formControl = formControl;
	              stopWatchingShowError();
	              addShowMessagesWatcher();
	            }
	          });
	        }
	
	        function addShowMessagesWatcher() {
	          stopWatchingShowError = scope.$watch(function watchShowValidationChange() {
	            if (typeof scope.options.validation.show === "boolean") {
	              return scope.fc.$invalid && scope.options.validation.show;
	            } else {
	              var noTouchedButDirty = angular.isUndefined(scope.fc.$touched) && scope.fc.$dirty;
	              return scope.fc.$invalid && (scope.fc.$touched || noTouchedButDirty);
	            }
	          }, function onShowValidationChange(show) {
	            scope.options.validation.errorExistsAndShouldBeVisible = show;
	            scope.showError = show; // shortcut for template authors
	          });
	        }
	      }
	
	      function runManipulators(manipulators) {
	        return function runManipulatorsOnTemplate(template) {
	          var chain = $q.when(template);
	          angular.forEach(manipulators, function (manipulator) {
	            chain = chain.then(function (template) {
	              return $q.when(manipulator(template, scope.options, scope)).then(function (newTemplate) {
	                return angular.isString(newTemplate) ? newTemplate : asHtml(newTemplate);
	              });
	            });
	          });
	          return chain;
	        };
	      }
	    }
	  };
	
	  function asHtml(el) {
	    var wrapper = angular.element("<a></a>");
	    return wrapper.append(el).html();
	  }
	
	  function getFieldTemplate(options) {
	    var type = formlyConfig.getType(options.type, true, options);
	    var template = options.template || type && type.template;
	    var templateUrl = options.templateUrl || type && type.templateUrl;
	    if (!template && !templateUrl) {
	      throw formlyUsability.getFieldError("type-type-has-no-template", "Type '" + options.type + "' has not template. On element:", options);
	    }
	
	    return getTemplate(template || templateUrl, !template, options);
	  }
	
	  function getTemplate(template, isUrl, options) {
	    var templatePromise = undefined;
	    if (angular.isFunction(template)) {
	      templatePromise = $q.when(template(options));
	    } else {
	      templatePromise = $q.when(template);
	    }
	
	    if (!isUrl) {
	      return templatePromise;
	    } else {
	      var _ret = (function () {
	        var httpOptions = { cache: $templateCache };
	        return {
	          v: templatePromise.then(function (url) {
	            return $http.get(url, httpOptions);
	          }).then(function (response) {
	            return response.data;
	          })["catch"](function handleErrorGettingATemplate(error) {
	            formlyWarn("problem-loading-template-for-templateurl", "Problem loading template for " + template, error);
	          })
	        };
	      })();
	
	      if (typeof _ret === "object") {
	        return _ret.v;
	      }
	    }
	  }
	
	  function transcludeInWrappers(options) {
	    var wrapper = getWrapperOption(options);
	
	    return function transcludeTemplate(template) {
	      if (!wrapper.length) {
	        return $q.when(template);
	      }
	
	      wrapper.forEach(function (wrapper) {
	        formlyUsability.checkWrapper(wrapper, options);
	        wrapper.validateOptions && wrapper.validateOptions(options);
	        runApiCheck(wrapper, options);
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
	    var superWrapper = angular.element("<a></a>"); // this allows people not have to have a single root in wrappers
	    superWrapper.append(wrapper);
	    var transcludeEl = superWrapper.find("formly-transclude");
	    if (!transcludeEl.length) {
	      //try it using our custom find function
	      transcludeEl = formlyUtil.findByNodeName(superWrapper, "formly-transclude");
	    }
	    transcludeEl.replaceWith(template);
	    return superWrapper.html();
	  }
	
	  function getWrapperOption(options) {
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
	
	    // get all wrappers for that this type specified that it uses.
	    var type = formlyConfig.getType(options.type, true, options);
	    if (type && type.wrapper) {
	      var typeWrappers = arrayify(type.wrapper).map(formlyConfig.getWrapper);
	      wrapper = wrapper.concat(typeWrappers);
	    }
	
	    // add the default wrapper last
	    var defaultWrapper = formlyConfig.getWrapper();
	    if (defaultWrapper) {
	      wrapper.push(defaultWrapper);
	    }
	    return wrapper;
	  }
	
	  function checkApi(options) {
	    formlyApiCheck["throw"](formlyApiCheck.formlyFieldOptions, options, {
	      prefix: "formly-field directive",
	      url: "formly-field-directive-validation-failed"
	    });
	    // validate with the type
	    var type = options.type && formlyConfig.getType(options.type);
	    if (type) {
	      if (type.validateOptions) {
	        type.validateOptions(options);
	      }
	      runApiCheck(type, options);
	    }
	  }
	
	  function runApiCheck(_ref, options) {
	    var apiCheck = _ref.apiCheck;
	    var apiCheckInstance = _ref.apiCheckInstance;
	    var apiCheckFunction = _ref.apiCheckFunction;
	    var apiCheckOptions = _ref.apiCheckOptions;
	
	    if (!apiCheck) {
	      return;
	    }
	    var instance = apiCheckInstance || formlyApiCheck;
	    var fn = apiCheckFunction || "warn";
	    var shape = instance.shape(apiCheck);
	    instance[fn](shape, options, apiCheckOptions || {
	      prefix: "formly-field " + name,
	      url: formlyApiCheck.config.output.docsBaseUrl + "formly-field-type-apicheck-failed"
	    });
	  }
	}
	formlyField.$inject = ["$http", "$q", "$compile", "$templateCache", "formlyConfig", "formlyValidationMessages", "formlyApiCheck", "formlyUtil", "formlyUsability", "formlyWarn"];
	
	function arrayify(obj) {
	  if (obj && !angular.isArray(obj)) {
	    obj = [obj];
	  } else if (!obj) {
	    obj = [];
	  }
	  return obj;
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = formlyFocus;
	
	// @ngInject
	function formlyFocus($timeout, $document) {
	  /* jshint -W052 */
	  return {
	    restrict: "A",
	    link: function formlyFocusLink(scope, element, attrs) {
	      var previousEl = null;
	      var el = element[0];
	      var doc = $document[0];
	      attrs.$observe("formlyFocus", function respondToFocusExpressionChange(value) {
	        if (value === "true") {
	          $timeout(function setElementFocus() {
	            previousEl = doc.activeElement;
	            el.focus();
	          }, ~ ~attrs.focusWait);
	        } else if (value === "false") {
	          if (doc.activeElement === el) {
	            el.blur();
	            if (attrs.hasOwnProperty("refocus") && previousEl) {
	              previousEl.focus();
	            }
	          }
	        }
	      });
	    }
	  };
	}
	formlyFocus.$inject = ["$timeout", "$document"];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _slice = Array.prototype.slice;
	
	var angular = _interopRequire(__webpack_require__(15));
	
	module.exports = formlyForm;
	
	/**
	 * @ngdoc directive
	 * @name formlyForm
	 * @restrict E
	 */
	// @ngInject
	function formlyForm(formlyUsability, $parse, formlyApiCheck, formlyConfig) {
	  var currentFormId = 1;
	  var optionsApi = [formlyApiCheck.shape({
	    formState: formlyApiCheck.object.optional,
	    resetModel: formlyApiCheck.func.optional,
	    updateInitialValue: formlyApiCheck.func.optional,
	    removeChromeAutoComplete: formlyApiCheck.bool.optional
	  }).strict.optional];
	  return {
	    restrict: "E",
	    template: function formlyFormGetTemplate(el, attrs) {
	      /* jshint -W033 */ // this because jshint is broken I guess...
	      var rootEl = getRootEl();
	      var formId = "formly_" + currentFormId++;
	      return "\n        <" + rootEl + " class=\"formly\"\n                 name=\"" + getFormName() + "\"\n                 role=\"form\">\n          <div formly-field\n               ng-repeat=\"field in fields " + getTrackBy() + "\"\n               " + getHideDirective() + "=\"!field.hide\"\n               class=\"formly-field {{field.type ? 'formly-field-' + field.type : ''}}\"\n               options=\"field\"\n               model=\"field.model || model\"\n               fields=\"fields\"\n               form=\"" + formId + "\"\n               form-id=\"" + formId + "\"\n               form-state=\"options.formState\"\n               index=\"$index\">\n          </div>\n          <div ng-transclude></div>\n        </" + rootEl + ">\n      ";
	
	      function getRootEl() {
	        return attrs.rootEl || "ng-form";
	      }
	
	      function getHideDirective() {
	        return attrs.hideDirective || formlyConfig.extras.defaultHideDirective || "ng-if";
	      }
	
	      function getTrackBy() {
	        if (!attrs.trackBy) {
	          return "";
	        } else {
	          return "track by " + attrs.trackBy;
	        }
	      }
	
	      function getFormName() {
	        var formName = formId;
	        var bindName = attrs.bindName;
	        if (bindName) {
	          if (angular.version.minor < 3) {
	            throw formlyUsability.getFormlyError("bind-name attribute on formly-form not allowed in > angular 1.3");
	          }
	          formName = "{{::'formly_' + " + bindName + "}}";
	        }
	        return formName;
	      }
	    },
	    replace: true,
	    transclude: true,
	    scope: {
	      fields: "=",
	      model: "=",
	      form: "=?",
	      options: "=?"
	    },
	    controller: /* @ngInject */["$scope", function FormlyFormController($scope) {
	      setupOptions();
	      $scope.model = $scope.model || {};
	      $scope.fields = $scope.fields || [];
	
	      angular.forEach($scope.fields, attachKey); // attaches a key based on the index if a key isn't specified
	      angular.forEach($scope.fields, setupWatchers); // setup watchers for all fields
	
	      // watch the model and evaluate watch expressions that depend on it.
	      $scope.$watch("model", function onResultUpdate(newResult) {
	        angular.forEach($scope.fields, function runFieldExpressionProperties(field) {
	          /*jshint -W030 */
	          field.runExpressions && field.runExpressions(newResult);
	        });
	      }, true);
	
	      function setupOptions() {
	        formlyApiCheck["throw"](optionsApi, [$scope.options], { prefix: "formly-form options check" });
	        $scope.options = $scope.options || {};
	        $scope.options.formState = $scope.options.formState || {};
	
	        angular.extend($scope.options, {
	          updateInitialValue: updateInitialValue,
	          resetModel: resetModel
	        });
	      }
	
	      function updateInitialValue() {
	        angular.forEach($scope.fields, function (field) {
	          return field.updateInitialValue();
	        });
	      }
	
	      function resetModel() {
	        angular.forEach($scope.fields, function (field) {
	          return field.resetModel();
	        });
	      }
	
	      function attachKey(field, index) {
	        field.key = field.key || index || 0;
	      }
	
	      function setupWatchers(field, index) {
	        if (!angular.isDefined(field.watcher)) {
	          return;
	        }
	        var watchers = field.watcher;
	        if (!angular.isArray(watchers)) {
	          watchers = [watchers];
	        }
	        angular.forEach(watchers, function setupWatcher(watcher) {
	          if (!angular.isDefined(watcher.listener)) {
	            throw formlyUsability.getFieldError("all-field-watchers-must-have-a-listener", "All field watchers must have a listener", field);
	          }
	          var watchExpression = getWatchExpression(watcher, field, index);
	          var watchListener = getWatchListener(watcher, field, index);
	
	          var type = watcher.type || "$watch";
	          watcher.stopWatching = $scope[type](watchExpression, watchListener, watcher.watchDeep);
	        });
	      }
	
	      function getWatchExpression(watcher, field, index) {
	        var watchExpression = watcher.expression || "model['" + field.key + "']";
	        if (angular.isFunction(watchExpression)) {
	          // wrap the field's watch expression so we can call it with the field as the first arg
	          // and the stop function as the last arg as a helper
	          var originalExpression = watchExpression;
	          watchExpression = function formlyWatchExpression() {
	            var args = modifyArgs.apply(undefined, [watcher, index].concat(_slice.call(arguments)));
	            return originalExpression.apply(undefined, _toConsumableArray(args));
	          };
	          watchExpression.displayName = "Formly Watch Expression for field for " + field.key;
	        }
	        return watchExpression;
	      }
	
	      function getWatchListener(watcher, field, index) {
	        var watchListener = watcher.listener;
	        if (angular.isFunction(watchListener)) {
	          // wrap the field's watch listener so we can call it with the field as the first arg
	          // and the stop function as the last arg as a helper
	          var originalListener = watchListener;
	          watchListener = function formlyWatchListener() {
	            var args = modifyArgs.apply(undefined, [watcher, index].concat(_slice.call(arguments)));
	            return originalListener.apply(undefined, _toConsumableArray(args));
	          };
	          watchListener.displayName = "Formly Watch Listener for field for " + field.key;
	        }
	        return watchListener;
	      }
	
	      function modifyArgs(watcher, index) {
	        for (var _len = arguments.length, originalArgs = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	          originalArgs[_key - 2] = arguments[_key];
	        }
	
	        return [$scope.fields[index]].concat(originalArgs, [watcher.stopWatching]);
	      }
	    }],
	    link: function link(scope, el, attrs) {
	      if (attrs.form) {
	        var formId = attrs.name;
	        $parse(attrs.form).assign(scope.$parent, scope[formId]);
	      }
	
	      // chrome autocomplete lameness
	      // see https://code.google.com/p/chromium/issues/detail?id=468153#c14
	      // ლ(ಠ益ಠლ)   (╯°□°)╯︵ ┻━┻    (◞‸◟；)
	      var global = formlyConfig.extras.removeChromeAutoComplete === true;
	      var offInstance = scope.options && scope.options.removeChromeAutoComplete === false;
	      var onInstance = scope.options && scope.options.removeChromeAutoComplete === true;
	      if (global && !offInstance || onInstance) {
	        var input = document.createElement("input");
	        input.setAttribute("autocomplete", "address-level4");
	        input.setAttribute("hidden", true);
	        el[0].appendChild(input);
	      }
	    }
	  };
	}
	formlyForm.$inject = ["formlyUsability", "$parse", "formlyApiCheck", "formlyConfig"];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var angular = _interopRequire(__webpack_require__(15));
	
	module.exports = addFormlyNgModelAttrsManipulator;
	
	// @ngInject
	function addFormlyNgModelAttrsManipulator(formlyConfig) {
	  if (formlyConfig.extras.disableNgModelAttrsManipulator) {
	    return;
	  }
	  formlyConfig.templateManipulators.preWrapper.push(ngModelAttrsManipulator);
	
	  function ngModelAttrsManipulator(template, options, scope) {
	    /* jshint maxcomplexity:6 */
	    var el = document.createElement("div");
	    var data = options.data;
	    if (data.skipNgModelAttrsManipulator === true) {
	      return template;
	    }
	    el.innerHTML = template;
	    var modelNodes = el.querySelectorAll("[ng-model]");
	    if (!modelNodes || !modelNodes.length) {
	      return template;
	    }
	
	    addIfNotPresent(modelNodes, "id", scope.id);
	    addIfNotPresent(modelNodes, "name", scope.id);
	
	    addValidation();
	    addModelOptions();
	    addTemplateOptionsAttrs();
	
	    return el.innerHTML;
	
	    function addValidation() {
	      if (angular.isDefined(options.validators) || angular.isDefined(options.validation.messages)) {
	        addIfNotPresent(modelNodes, "formly-custom-validation", "");
	      }
	    }
	
	    function addModelOptions() {
	      if (angular.isDefined(options.modelOptions)) {
	        addIfNotPresent(modelNodes, "ng-model-options", "options.modelOptions");
	        if (options.modelOptions.getterSetter) {
	          angular.forEach(modelNodes, function (node) {
	            node.setAttribute("ng-model", "options.value");
	          });
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
	      angular.extend(ngModelAttributes, options.ngModelAttrs);
	
	      // Feel free to make this more simple :-)
	      angular.forEach(ngModelAttributes, function (val, name) {
	        /* jshint maxcomplexity:14 */
	        var attrVal = undefined;
	        var attrName = undefined;
	        var ref = "options.templateOptions['" + name + "']";
	        var toVal = to[name];
	        var epVal = getEpValue(ep, name);
	
	        var inTo = angular.isDefined(toVal);
	        var inEp = angular.isDefined(epVal);
	        if (val.value) {
	          // I realize this looks backwards, but it's right, trust me...
	          attrName = val.value;
	          attrVal = name;
	        } else if (val.expression && inTo) {
	          attrName = val.expression;
	          if (angular.isString(to[name])) {
	            attrVal = "$eval(" + ref + ")";
	          } else if (angular.isFunction(to[name])) {
	            attrVal = "" + ref + "(model[options.key], options, this, $event)";
	          } else {
	            throw new Error("options.templateOptions." + name + " must be a string or function: " + JSON.stringify(options));
	          }
	        } else if (val.bound && inEp) {
	          attrName = val.bound;
	          attrVal = ref;
	        } else if ((val.attribute || val.boolean) && inEp) {
	          attrName = val.attribute || val.boolean;
	          attrVal = "{{" + ref + "}}";
	        } else if (val.attribute && inTo) {
	          attrName = val.attribute;
	          attrVal = toVal;
	        } else if (val.boolean) {
	          if (inTo && !inEp && toVal) {
	            attrName = val.boolean;
	            attrVal = true;
	          } else {}
	        } else if (val.bound && inTo) {
	          attrName = val.bound;
	          attrVal = ref;
	        }
	
	        if (angular.isDefined(attrName) && angular.isDefined(attrVal)) {
	          addIfNotPresent(modelNodes, attrName, attrVal);
	        }
	      });
	    }
	  }
	
	  // Utility functions
	  function getBuiltInAttributes() {
	    var ngModelAttributes = {
	      focus: {
	        attribute: "formly-focus"
	      }
	    };
	    var boundOnly = [];
	    var bothBooleanAndBound = ["required", "disabled"];
	    var bothAttributeAndBound = ["pattern", "minlength"];
	    var expressionOnly = ["change", "keydown", "keyup", "keypress", "click", "focus", "blur"];
	    var attributeOnly = ["placeholder", "min", "max", "tabindex", "type"];
	    if (formlyConfig.extras.ngModelAttrsManipulatorPreferUnbound) {
	      bothAttributeAndBound.push("maxlength");
	    } else {
	      boundOnly.push("maxlength");
	    }
	
	    angular.forEach(boundOnly, function (item) {
	      ngModelAttributes[item] = { bound: "ng-" + item };
	    });
	
	    angular.forEach(bothBooleanAndBound, function (item) {
	      ngModelAttributes[item] = { boolean: item, bound: "ng-" + item };
	    });
	
	    angular.forEach(bothAttributeAndBound, function (item) {
	      ngModelAttributes[item] = { attribute: item, bound: "ng-" + item };
	    });
	
	    angular.forEach(expressionOnly, function (item) {
	      var propName = "on" + item.substr(0, 1).toUpperCase() + item.substr(1);
	      ngModelAttributes[propName] = { expression: "ng-" + item };
	    });
	
	    angular.forEach(attributeOnly, function (item) {
	      ngModelAttributes[item] = { attribute: item };
	    });
	    return ngModelAttributes;
	  }
	
	  function getEpValue(ep, name) {
	    return ep["templateOptions." + name] || ep["templateOptions['" + name + "']"] || ep["templateOptions[\"" + name + "\"]"];
	  }
	
	  function addIfNotPresent(nodes, attr, val) {
	    angular.forEach(nodes, function (node) {
	      if (!node.getAttribute(attr)) {
	        node.setAttribute(attr, val);
	      }
	    });
	  }
	}
	addFormlyNgModelAttrsManipulator.$inject = ["formlyConfig"];

	// jshint -W035
	// empty to illustrate that a boolean will not be added via val.bound
	// if you want it added via val.bound, then put it in expressionProperties

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = addCustomTags;
	
	// @ngInject
	function addCustomTags($document) {
	  if ($document && $document.get) {
	    (function () {
	      //IE8 check ->
	      // http://stackoverflow.com/questions/10964966/detect-ie-version-prior-to-v9-in-javascript/10965203#10965203
	      var document = $document.get(0);
	      var div = document.createElement("div");
	      div.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->";
	      var isIeLessThan9 = div.getElementsByTagName("i").length === 1;
	
	      if (isIeLessThan9) {
	        //add the custom elements that we need for formly
	        var customElements = ["formly-field", "formly-form", "formly-custom-validation", "formly-focus", "formly-transpose"];
	        angular.forEach(customElements, function (el) {
	          document.createElement(el);
	        });
	      }
	    })();
	  }
	}
	addCustomTags.$inject = ["$document"];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	// some versions of angular don't export the angular module properly,
	// so we get it from window in this case.
	
	var angular = _interopRequire(__webpack_require__(17));
	
	if (!angular.version) {
	  angular = window.angular;
	}
	module.exports = angular;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_17__;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var angular = _interopRequire(__webpack_require__(15));
	
	module.exports = { formlyEval: formlyEval, getFieldId: getFieldId, reverseDeepMerge: reverseDeepMerge, findByNodeName: findByNodeName };
	
	function formlyEval(scope, expression, $modelValue, $viewValue) {
	  if (angular.isFunction(expression)) {
	    return expression($viewValue, $modelValue, scope);
	  } else {
	    return scope.$eval(expression, { $viewValue: $viewValue, $modelValue: $modelValue });
	  }
	}
	
	function getFieldId(formId, options, index) {
	  var type = options.type;
	  if (!type && options.template) {
	    type = "template";
	  } else if (!type && options.templateUrl) {
	    type = "templateUrl";
	  }
	
	  return [formId, type, options.key, index].join("_");
	}
	
	function reverseDeepMerge(dest) {
	  angular.forEach(arguments, function (src, index) {
	    if (!index) {
	      return;
	    }
	    angular.forEach(src, function (val, prop) {
	      if (!angular.isDefined(dest[prop])) {
	        dest[prop] = angular.copy(val);
	      } else if (objAndSameType(dest[prop], val)) {
	        reverseDeepMerge(dest[prop], val);
	      }
	    });
	  });
	}
	
	function objAndSameType(obj1, obj2) {
	  return angular.isObject(obj1) && angular.isObject(obj2) && Object.getPrototypeOf(obj1) === Object.getPrototypeOf(obj2);
	}
	
	//recurse down a node tree to find a node with matching nodeName, for custom tags jQuery.find doesn't work in IE8
	function findByNodeName(el, nodeName) {
	  if (!el.prop) {
	    // not a jQuery or jqLite object -> wrap it
	    el = angular.element(el);
	  }
	
	  if (el.prop("nodeName") === nodeName.toUpperCase()) {
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhNzQzYThmMTk3NzAyMmFhZWIzOSIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2Zvcm1seUFwaUNoZWNrLmpzIiwid2VicGFjazovLy8uL290aGVyL2RvY3NCYXNlVXJsLmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlVc2FiaWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2Zvcm1seUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzLmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL2Zvcm1seVV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmljZXMvZm9ybWx5V2Fybi5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1maWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1mb2N1cy5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1mb3JtLmpzIiwid2VicGFjazovLy8uL3J1bi9mb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ydW4vZm9ybWx5Q3VzdG9tVGFncy5qcyIsIndlYnBhY2s6Ly8vLi9hbmd1bGFyLWZpeC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiYXBpQ2hlY2tcIixcImFtZFwiOlwiYXBpLWNoZWNrXCIsXCJjb21tb25qczJcIjpcImFwaS1jaGVja1wiLFwiY29tbW9uanNcIjpcImFwaS1jaGVja1wifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyXCIiLCJ3ZWJwYWNrOi8vLy4vb3RoZXIvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0tDdENPLEtBQUssdUNBQU0sQ0FBZ0I7O2tCQUNuQixLQUFLLEM7Ozs7Ozs7Ozs7S0NEYixPQUFPLHVDQUFNLEVBQWE7O0tBRTFCLGNBQWMsdUNBQU0sQ0FBNEI7O0tBQ2hELCtCQUErQix1Q0FBTSxDQUFxQjs7S0FDMUQsZUFBZSx1Q0FBTSxDQUE2Qjs7S0FDbEQsWUFBWSx1Q0FBTSxDQUEwQjs7S0FDNUMsd0JBQXdCLHVDQUFNLENBQXNDOztLQUNwRSxVQUFVLHVDQUFNLENBQXVCOztLQUN2QyxVQUFVLHVDQUFNLENBQXVCOztLQUV2QyxzQkFBc0IsdUNBQU0sQ0FBdUM7O0tBQ25FLFdBQVcsdUNBQU0sRUFBMkI7O0tBQzVDLFdBQVcsdUNBQU0sRUFBMkI7O0tBQzVDLFVBQVUsdUNBQU0sRUFBMEI7O0tBRTFDLDZCQUE2Qix1Q0FBTSxFQUFxQzs7S0FDeEUsZ0JBQWdCLHVDQUFNLEVBQXdCOztBQUVyRCxLQUFNLFlBQVksR0FBRyxRQUFRLENBQUM7O2tCQUVmLFlBQVk7O0FBRTNCLEtBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUVsRCxTQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ3BELFNBQVEsQ0FBQyxRQUFRLENBQUMs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LGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQy9EOzs7QUFHRCxVQUFTLGNBQWMsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFO0FBQ3BDLE9BQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFOztBQUNaLE9BQUUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFCOztBQUVELE9BQUksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUU7QUFDbEQsWUFBTyxFQUFFLENBQUM7SUFDWDs7QUFFRCxPQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDdEIsUUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3JDLFNBQUksSUFBSSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDMUMsU0FBSSxJQUFJLEVBQUU7QUFDUixjQUFPLElBQUksQ0FBQztNQUNiO0lBQ0YiLCJmaWxlIjoiZm9ybWx5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYXBpLWNoZWNrXCIpLCByZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJhcGktY2hlY2tcIiwgXCJhbmd1bGFyXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIm5nRm9ybWx5XCJdID0gZmFjdG9yeShyZXF1aXJlKFwiYXBpLWNoZWNrXCIpLCByZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wibmdGb3JtbHlcIl0gPSBmYWN0b3J5KHJvb3RbXCJhcGlDaGVja1wiXSwgcm9vdFtcImFuZ3VsYXJcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xNl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE3X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGE3NDNhOGYxOTc3MDIyYWFlYjM5XG4gKiovIiwiaW1wb3J0IGluZGV4IGZyb20gJy4vaW5kZXguY29tbW9uJztcbmV4cG9ydCBkZWZhdWx0IGluZGV4O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyLWZpeCc7XG5cbmltcG9ydCBmb3JtbHlBcGlDaGVjayBmcm9tICcuL3Byb3ZpZGVycy9mb3JtbHlBcGlDaGVjayc7XG5pbXBvcnQgZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeCBmcm9tICcuL290aGVyL2RvY3NCYXNlVXJsJztcbmltcG9ydCBmb3JtbHlVc2FiaWxpdHkgZnJvbSAnLi9wcm92aWRlcnMvZm9ybWx5VXNhYmlsaXR5JztcbmltcG9ydCBmb3JtbHlDb25maWcgZnJvbSAnLi9wcm92aWRlcnMvZm9ybWx5Q29uZmlnJztcbmltcG9ydCBmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMgZnJvbSAnLi9wcm92aWRlcnMvZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzJztcbmltcG9ydCBmb3JtbHlVdGlsIGZyb20gJy4vc2VydmljZXMvZm9ybWx5VXRpbCc7XG5pbXBvcnQgZm9ybWx5V2FybiBmcm9tICcuL3NlcnZpY2VzL2Zvcm1seVdhcm4nO1xuXG5pbXBvcnQgZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbiBmcm9tICcuL2RpcmVjdGl2ZXMvZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uJztcbmltcG9ydCBmb3JtbHlGaWVsZCBmcm9tICcuL2RpcmVjdGl2ZXMvZm9ybWx5LWZpZWxkJztcbmltcG9ydCBmb3JtbHlGb2N1cyBmcm9tICcuL2RpcmVjdGl2ZXMvZm9ybWx5LWZvY3VzJztcbmltcG9ydCBmb3JtbHlGb3JtIGZyb20gJy4vZGlyZWN0aXZlcy9mb3JtbHktZm9ybSc7XG5cbmltcG9ydCBmb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvciBmcm9tICcuL3J1bi9mb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvcic7XG5pbXBvcnQgZm9ybWx5Q3VzdG9tVGFncyBmcm9tICcuL3J1bi9mb3JtbHlDdXN0b21UYWdzJztcblxuY29uc3QgbmdNb2R1bGVOYW1lID0gJ2Zvcm1seSc7XG5cbmV4cG9ydCBkZWZhdWx0IG5nTW9kdWxlTmFtZTtcblxuY29uc3QgbmdNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZShuZ01vZHVsZU5hbWUsIFtdKTtcblxubmdNb2R1bGUuY29uc3RhbnQoJ2Zvcm1seUFwaUNoZWNrJywgZm9ybWx5QXBpQ2hlY2spO1xubmdNb2R1bGUuY29uc3RhbnQoJ2Zvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXgnLCBmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4KTtcbm5nTW9kdWxlLmNvbnN0YW50KCdmb3JtbHlWZXJzaW9uJywgVkVSU0lPTik7IC8vIDwtLSB3ZWJwYWNrIHZhcmlhYmxlXG5cbm5nTW9kdWxlLnByb3ZpZGVyKCdmb3JtbHlVc2FiaWxpdHknLCBmb3JtbHlVc2FiaWxpdHkpO1xubmdNb2R1bGUucHJvdmlkZXIoJ2Zvcm1seUNvbmZpZycsIGZvcm1seUNvbmZpZyk7XG5cbm5nTW9kdWxlLmZhY3RvcnkoJ2Zvcm1seVZhbGlkYXRpb25NZXNzYWdlcycsIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcyk7XG5uZ01vZHVsZS5mYWN0b3J5KCdmb3JtbHlVdGlsJywgZm9ybWx5VXRpbCk7XG5uZ01vZHVsZS5mYWN0b3J5KCdmb3JtbHlXYXJuJywgZm9ybWx5V2Fybik7XG5cbm5nTW9kdWxlLmRpcmVjdGl2ZSgnZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbicsIGZvcm1seUN1c3RvbVZhbGlkYXRpb24pO1xubmdNb2R1bGUuZGlyZWN0aXZlKCdmb3JtbHlGaWVsZCcsIGZvcm1seUZpZWxkKTtcbm5nTW9kdWxlLmRpcmVjdGl2ZSgnZm9ybWx5Rm9jdXMnLCBmb3JtbHlGb2N1cyk7XG5uZ01vZHVsZS5kaXJlY3RpdmUoJ2Zvcm1seUZvcm0nLCBmb3JtbHlGb3JtKTtcblxubmdNb2R1bGUucnVuKGZvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKTtcbm5nTW9kdWxlLnJ1bihmb3JtbHlDdXN0b21UYWdzKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2luZGV4LmNvbW1vbi5qc1xuICoqLyIsImltcG9ydCBhcGlDaGVja0ZhY3RvcnkgZnJvbSAnYXBpLWNoZWNrJztcblxubGV0IGFwaUNoZWNrID0gYXBpQ2hlY2tGYWN0b3J5KHtcbiAgb3V0cHV0OiB7XG4gICAgcHJlZml4OiAnYW5ndWxhci1mb3JtbHk6JyxcbiAgICBkb2NzQmFzZVVybDogcmVxdWlyZSgnLi4vb3RoZXIvZG9jc0Jhc2VVcmwnKVxuICB9XG59KTtcblxuZnVuY3Rpb24gc2hhcGVSZXF1aXJlZElmTm90KG90aGVyUHJvcHMsIHByb3BDaGVja2VyKSB7XG4gIGlmICghYW5ndWxhci5pc0FycmF5KG90aGVyUHJvcHMpKSB7XG4gICAgb3RoZXJQcm9wcyA9IFtvdGhlclByb3BzXTtcbiAgfVxuICBjb25zdCB0eXBlID0gYHNwZWNpZmllZCBpZiB0aGVzZSBhcmUgbm90IHNwZWNpZmllZDogXFxgJHtvdGhlclByb3BzLmpvaW4oJywgJyl9XFxgIChvdGhlcndpc2UgaXQncyBvcHRpb25hbClgO1xuICBmdW5jdGlvbiBzaGFwZVJlcXVpcmVkSWZOb3REZWZpbml0aW9uKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgdmFyIHByb3BFeGlzdHMgPSBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KHByb3BOYW1lKTtcbiAgICB2YXIgb3RoZXJQcm9wc0V4aXN0ID0gb3RoZXJQcm9wcy5zb21lKGZ1bmN0aW9uIChvdGhlclByb3ApIHtcbiAgICAgIHJldHVybiBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KG90aGVyUHJvcCk7XG4gICAgfSk7XG4gICAgaWYgKCFvdGhlclByb3BzRXhpc3QgJiYgIXByb3BFeGlzdHMpIHtcbiAgICAgIHJldHVybiBhcGlDaGVjay51dGlscy5nZXRFcnJvcihwcm9wTmFtZSwgbG9jYXRpb24sIHR5cGUpO1xuICAgIH0gZWxzZSBpZiAocHJvcEV4aXN0cykge1xuICAgICAgcmV0dXJuIHByb3BDaGVja2VyKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKTtcbiAgICB9XG4gIH1cbiAgc2hhcGVSZXF1aXJlZElmTm90RGVmaW5pdGlvbi50eXBlID0gdHlwZTtcbiAgcmV0dXJuIGFwaUNoZWNrLnV0aWxzLmNoZWNrZXJIZWxwZXJzLnNldHVwQ2hlY2tlcihzaGFwZVJlcXVpcmVkSWZOb3REZWZpbml0aW9uKTtcbn1cblxubGV0IGZvcm1seUV4cHJlc3Npb24gPSBhcGlDaGVjay5vbmVPZlR5cGUoW2FwaUNoZWNrLnN0cmluZywgYXBpQ2hlY2suZnVuY10pO1xubGV0IHNwZWNpZnlXcmFwcGVyVHlwZSA9IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gIGFwaUNoZWNrLm9uZU9mKFtudWxsXSksIGFwaUNoZWNrLnR5cGVPckFycmF5T2YoYXBpQ2hlY2suc3RyaW5nKVxuXSk7XG5cbmNvbnN0IGFwaUNoZWNrUHJvcGVydHkgPSBhcGlDaGVjay5vYmplY3RPZihhcGlDaGVjay5mdW5jKTtcblxuY29uc3QgYXBpQ2hlY2tJbnN0YW5jZVByb3BlcnR5ID0gYXBpQ2hlY2suc2hhcGUub25seUlmKCdhcGlDaGVjaycsIGFwaUNoZWNrLmZ1bmMud2l0aFByb3BlcnRpZXMoe1xuICB3YXJuOiBhcGlDaGVjay5mdW5jLFxuICB0aHJvdzogYXBpQ2hlY2suZnVuYyxcbiAgc2hhcGU6IGFwaUNoZWNrLmZ1bmNcbn0pKTtcblxuY29uc3QgYXBpQ2hlY2tGdW5jdGlvblByb3BlcnR5ID0gYXBpQ2hlY2suc2hhcGUub25seUlmKCdhcGlDaGVjaycsIGFwaUNoZWNrLm9uZU9mKFsndGhyb3cnLCAnd2FybiddKSk7XG5cbmNvbnN0IGZvcm1seVdyYXBwZXJUeXBlID0gYXBpQ2hlY2suc2hhcGUoe1xuICBuYW1lOiBzaGFwZVJlcXVpcmVkSWZOb3QoJ3R5cGVzJywgYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgdGVtcGxhdGU6IGFwaUNoZWNrLnNoYXBlLmlmTm90KCd0ZW1wbGF0ZVVybCcsIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gIHRlbXBsYXRlVXJsOiBhcGlDaGVjay5zaGFwZS5pZk5vdCgndGVtcGxhdGUnLCBhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICB0eXBlczogYXBpQ2hlY2sudHlwZU9yQXJyYXlPZihhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICBvdmVyd3JpdGVPazogYXBpQ2hlY2suYm9vbC5vcHRpb25hbCxcbiAgdmFsaWRhdGVPcHRpb25zOiBhcGlDaGVjay5mdW5jLm9wdGlvbmFsLFxuICBhcGlDaGVjazogYXBpQ2hlY2tQcm9wZXJ0eS5vcHRpb25hbCxcbiAgYXBpQ2hlY2tJbnN0YW5jZTogYXBpQ2hlY2tJbnN0YW5jZVByb3BlcnR5Lm9wdGlvbmFsLFxuICBhcGlDaGVja0Z1bmN0aW9uOiBhcGlDaGVja0Z1bmN0aW9uUHJvcGVydHkub3B0aW9uYWwsXG4gIGFwaUNoZWNrT3B0aW9uczogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsXG59KS5zdHJpY3Q7XG5cbmxldCBmaWVsZE9wdGlvbnNBcGlTaGFwZSA9IHtcbiAgJCRoYXNoS2V5OiBhcGlDaGVjay5hbnkub3B0aW9uYWwsXG4gIHR5cGU6IGFwaUNoZWNrLnNoYXBlLmlmTm90KFsndGVtcGxhdGUnLCAndGVtcGxhdGVVcmwnXSwgYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgdGVtcGxhdGU6IGFwaUNoZWNrLnNoYXBlLmlmTm90KFxuICAgIFsndHlwZScsICd0ZW1wbGF0ZVVybCddLFxuICAgIGFwaUNoZWNrLm9uZU9mVHlwZShbYXBpQ2hlY2suc3RyaW5nLCBhcGlDaGVjay5mdW5jXSlcbiAgKS5vcHRpb25hbCxcbiAgdGVtcGxhdGVVcmw6IGFwaUNoZWNrLnNoYXBlLmlmTm90KFxuICAgIFsndHlwZScsICd0ZW1wbGF0ZSddLFxuICAgIGFwaUNoZWNrLm9uZU9mVHlwZShbYXBpQ2hlY2suc3RyaW5nLCBhcGlDaGVjay5mdW5jXSlcbiAgKS5vcHRpb25hbCxcbiAga2V5OiBhcGlDaGVjay5vbmVPZlR5cGUoW2FwaUNoZWNrLnN0cmluZywgYXBpQ2hlY2subnVtYmVyXSksXG4gIG1vZGVsOiBhcGlDaGVjay5vYmplY3Qub3B0aW9uYWwsXG4gIGV4cHJlc3Npb25Qcm9wZXJ0aWVzOiBhcGlDaGVjay5vYmplY3RPZihhcGlDaGVjay5vbmVPZlR5cGUoW1xuICAgIGZvcm1seUV4cHJlc3Npb24sXG4gICAgYXBpQ2hlY2suc2hhcGUoe1xuICAgICAgZXhwcmVzc2lvbjogZm9ybWx5RXhwcmVzc2lvbixcbiAgICAgIG1lc3NhZ2U6IGZvcm1seUV4cHJlc3Npb24ub3B0aW9uYWxcbiAgICB9KS5zdHJpY3RcbiAgXSkpLm9wdGlvbmFsLFxuICBkYXRhOiBhcGlDaGVjay5vYmplY3Qub3B0aW9uYWwsXG4gIHRlbXBsYXRlT3B0aW9uczogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICB3cmFwcGVyOiBzcGVjaWZ5V3JhcHBlclR5cGUub3B0aW9uYWwsXG4gIG1vZGVsT3B0aW9uczogYXBpQ2hlY2suc2hhcGUoe1xuICAgIHVwZGF0ZU9uOiBhcGlDaGVjay5zdHJpbmcub3B0aW9uYWwsXG4gICAgZGVib3VuY2U6IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gICAgICBhcGlDaGVjay5vYmplY3QsIGFwaUNoZWNrLnN0cmluZ1xuICAgIF0pLm9wdGlvbmFsLFxuICAgIGFsbG93SW52YWxpZDogYXBpQ2hlY2suYm9vbC5vcHRpb25hbCxcbiAgICBnZXR0ZXJTZXR0ZXI6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWwsXG4gICAgdGltZXpvbmU6IGFwaUNoZWNrLnN0cmluZy5vcHRpb25hbFxuICB9KS5vcHRpb25hbCxcbiAgd2F0Y2hlcjogYXBpQ2hlY2sudHlwZU9yQXJyYXlPZihcbiAgICBhcGlDaGVjay5zaGFwZSh7XG4gICAgICBleHByZXNzaW9uOiBmb3JtbHlFeHByZXNzaW9uLm9wdGlvbmFsLFxuICAgICAgbGlzdGVuZXI6IGZvcm1seUV4cHJlc3Npb25cbiAgICB9KVxuICApLm9wdGlvbmFsLFxuICB2YWxpZGF0b3JzOiBhcGlDaGVjay5vYmplY3RPZihhcGlDaGVjay5vbmVPZlR5cGUoW1xuICAgIGZvcm1seUV4cHJlc3Npb24sIGFwaUNoZWNrLnNoYXBlKHtcbiAgICAgIGV4cHJlc3Npb246IGZvcm1seUV4cHJlc3Npb24sXG4gICAgICBtZXNzYWdlOiBmb3JtbHlFeHByZXNzaW9uLm9wdGlvbmFsXG4gICAgfSkuc3RyaWN0XG4gIF0pKS5vcHRpb25hbCxcbiAgbm9Gb3JtQ29udHJvbDogYXBpQ2hlY2suYm9vbC5vcHRpb25hbCxcbiAgaGlkZTogYXBpQ2hlY2suYm9vbC5vcHRpb25hbCxcbiAgbmdNb2RlbEF0dHJzOiBhcGlDaGVjay5vYmplY3RPZihhcGlDaGVjay5zaGFwZSh7XG4gICAgZXhwcmVzc2lvbjogYXBpQ2hlY2suc2hhcGUuaWZOb3QoWyd2YWx1ZScsICdhdHRyaWJ1dGUnLCAnYm91bmQnXSwgYXBpQ2hlY2suYW55KS5vcHRpb25hbCxcbiAgICB2YWx1ZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoJ2V4cHJlc3Npb24nLCBhcGlDaGVjay5hbnkpLm9wdGlvbmFsLFxuICAgIGF0dHJpYnV0ZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoJ2V4cHJlc3Npb24nLCBhcGlDaGVjay5hbnkpLm9wdGlvbmFsLFxuICAgIGJvdW5kOiBhcGlDaGVjay5zaGFwZS5pZk5vdCgnZXhwcmVzc2lvbicsIGFwaUNoZWNrLmFueSkub3B0aW9uYWxcbiAgfSkuc3RyaWN0KS5vcHRpb25hbCxcbiAgb3B0aW9uc1R5cGVzOiBhcGlDaGVjay50eXBlT3JBcnJheU9mKGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gIGxpbms6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gIGNvbnRyb2xsZXI6IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gICAgYXBpQ2hlY2suc3RyaW5nLCBhcGlDaGVjay5mdW5jLCBhcGlDaGVjay5hcnJheVxuICBdKS5vcHRpb25hbCxcbiAgdmFsaWRhdGlvbjogYXBpQ2hlY2suc2hhcGUoe1xuICAgIHNob3c6IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gICAgICBhcGlDaGVjay5ib29sLCBhcGlDaGVjay5vbmVPZihbbnVsbF0pXG4gICAgXSkub3B0aW9uYWwsXG4gICAgbWVzc2FnZXM6IGFwaUNoZWNrLm9iamVjdE9mKGZvcm1seUV4cHJlc3Npb24pLm9wdGlvbmFsLFxuICAgIGVycm9yRXhpc3RzQW5kU2hvdWxkQmVWaXNpYmxlOiBhcGlDaGVjay5ib29sLm9wdGlvbmFsXG4gIH0pLm9wdGlvbmFsLFxuICBmb3JtQ29udHJvbDogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICB2YWx1ZTogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgcnVuRXhwcmVzc2lvbnM6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gIHJlc2V0TW9kZWw6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gIHVwZGF0ZUluaXRpYWxWYWx1ZTogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgaW5pdGlhbFZhbHVlOiBhcGlDaGVjay5hbnkub3B0aW9uYWwsXG4gIGRlZmF1bHRWYWx1ZTogYXBpQ2hlY2suYW55Lm9wdGlvbmFsXG59O1xuXG5sZXQgZm9ybWx5RmllbGRPcHRpb25zID0gYXBpQ2hlY2suc2hhcGUoZmllbGRPcHRpb25zQXBpU2hhcGUpLnN0cmljdDtcblxubGV0IHR5cGVPcHRpb25zRGVmYXVsdE9wdGlvbnMgPSBhbmd1bGFyLmNvcHkoZmllbGRPcHRpb25zQXBpU2hhcGUpO1xudHlwZU9wdGlvbnNEZWZhdWx0T3B0aW9ucy5rZXkgPSBhcGlDaGVjay5zdHJpbmcub3B0aW9uYWw7XG5cbmxldCBmb3JtbHlUeXBlT3B0aW9ucyA9IGFwaUNoZWNrLnNoYXBlKHtcbiAgbmFtZTogYXBpQ2hlY2suc3RyaW5nLFxuICB0ZW1wbGF0ZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoJ3RlbXBsYXRlVXJsJywgYXBpQ2hlY2sub25lT2ZUeXBlKFthcGlDaGVjay5zdHJpbmcsIGFwaUNoZWNrLmZ1bmNdKSkub3B0aW9uYWwsXG4gIHRlbXBsYXRlVXJsOiBhcGlDaGVjay5zaGFwZS5pZk5vdCgndGVtcGxhdGUnLCBhcGlDaGVjay5vbmVPZlR5cGUoW2FwaUNoZWNrLnN0cmluZywgYXBpQ2hlY2suZnVuY10pKS5vcHRpb25hbCxcbiAgY29udHJvbGxlcjogYXBpQ2hlY2sub25lT2ZUeXBlKFtcbiAgICBhcGlDaGVjay5mdW5jLCBhcGlDaGVjay5zdHJpbmcsIGFwaUNoZWNrLmFycmF5XG4gIF0pLm9wdGlvbmFsLFxuICBsaW5rOiBhcGlDaGVjay5mdW5jLm9wdGlvbmFsLFxuICBkZWZhdWx0T3B0aW9uczogYXBpQ2hlY2sub25lT2ZUeXBlKFtcbiAgICBhcGlDaGVjay5mdW5jLCBhcGlDaGVjay5zaGFwZSh0eXBlT3B0aW9uc0RlZmF1bHRPcHRpb25zKVxuICBdKS5vcHRpb25hbCxcbiAgZXh0ZW5kczogYXBpQ2hlY2suc3RyaW5nLm9wdGlvbmFsLFxuICB3cmFwcGVyOiBzcGVjaWZ5V3JhcHBlclR5cGUub3B0aW9uYWwsXG4gIGRhdGE6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbCxcbiAgdmFsaWRhdGVPcHRpb25zOiBhcGlDaGVjay5mdW5jLm9wdGlvbmFsLFxuICBhcGlDaGVjazogYXBpQ2hlY2tQcm9wZXJ0eS5vcHRpb25hbCxcbiAgYXBpQ2hlY2tJbnN0YW5jZTogYXBpQ2hlY2tJbnN0YW5jZVByb3BlcnR5Lm9wdGlvbmFsLFxuICBhcGlDaGVja0Z1bmN0aW9uOiBhcGlDaGVja0Z1bmN0aW9uUHJvcGVydHkub3B0aW9uYWwsXG4gIGFwaUNoZWNrT3B0aW9uczogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICBvdmVyd3JpdGVPazogYXBpQ2hlY2suYm9vbC5vcHRpb25hbFxufSkuc3RyaWN0O1xuXG5hbmd1bGFyLmV4dGVuZChhcGlDaGVjaywge1xuICBmb3JtbHlUeXBlT3B0aW9ucywgZm9ybWx5RmllbGRPcHRpb25zLCBmb3JtbHlFeHByZXNzaW9uLCBmb3JtbHlXcmFwcGVyVHlwZVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGFwaUNoZWNrO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcHJvdmlkZXJzL2Zvcm1seUFwaUNoZWNrLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgYGh0dHBzOi8vZ2l0aHViLmNvbS9mb3JtbHktanMvYW5ndWxhci1mb3JtbHkvYmxvYi8ke1ZFUlNJT059L290aGVyL0VSUk9SU19BTkRfV0FSTklOR1MubWQjYDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL290aGVyL2RvY3NCYXNlVXJsLmpzXG4gKiovIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhci1maXgnO1xuXG5leHBvcnQgZGVmYXVsdCBmb3JtbHlVc2FiaWxpdHk7XG5cbi8vIEBuZ0luamVjdFxuZnVuY3Rpb24gZm9ybWx5VXNhYmlsaXR5KGZvcm1seUFwaUNoZWNrLCBmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4KSB7XG4gIGFuZ3VsYXIuZXh0ZW5kKHRoaXMsIHtcbiAgICBnZXRGb3JtbHlFcnJvcjogZ2V0Rm9ybWx5RXJyb3IsXG4gICAgZ2V0RmllbGRFcnJvcjogZ2V0RmllbGRFcnJvcixcbiAgICBjaGVja1dyYXBwZXI6IGNoZWNrV3JhcHBlcixcbiAgICBjaGVja1dyYXBwZXJUZW1wbGF0ZTogY2hlY2tXcmFwcGVyVGVtcGxhdGUsXG4gICAgJGdldDogKCkgPT4gdGhpc1xuICB9KTtcblxuICBmdW5jdGlvbiBnZXRGaWVsZEVycm9yKGVycm9ySW5mb1NsdWcsIG1lc3NhZ2UsIGZpZWxkKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XG4gICAgICBmaWVsZCA9IG1lc3NhZ2U7XG4gICAgICBtZXNzYWdlID0gZXJyb3JJbmZvU2x1ZztcbiAgICAgIGVycm9ySW5mb1NsdWcgPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEVycm9yKGdldEVycm9yTWVzc2FnZShlcnJvckluZm9TbHVnLCBtZXNzYWdlKSArIGAgRmllbGQgZGVmaW5pdGlvbjogJHthbmd1bGFyLnRvSnNvbihmaWVsZCl9YCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRGb3JtbHlFcnJvcihlcnJvckluZm9TbHVnLCBtZXNzYWdlKSB7XG4gICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICBtZXNzYWdlID0gZXJyb3JJbmZvU2x1ZztcbiAgICAgIGVycm9ySW5mb1NsdWcgPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEVycm9yKGdldEVycm9yTWVzc2FnZShlcnJvckluZm9TbHVnLCBtZXNzYWdlKSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRFcnJvck1lc3NhZ2UoZXJyb3JJbmZvU2x1ZywgbWVzc2FnZSkge1xuICAgIGxldCB1cmwgPSAnJztcbiAgICBpZiAoZXJyb3JJbmZvU2x1ZyAhPT0gbnVsbCkge1xuICAgICAgdXJsID0gYCR7Zm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeH0ke2Vycm9ySW5mb1NsdWd9YDtcbiAgICB9XG4gICAgcmV0dXJuIGBGb3JtbHkgRXJyb3I6ICR7bWVzc2FnZX0uICR7dXJsfWA7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1dyYXBwZXIod3JhcHBlcikge1xuICAgIGZvcm1seUFwaUNoZWNrLnRocm93KGZvcm1seUFwaUNoZWNrLmZvcm1seVdyYXBwZXJUeXBlLCB3cmFwcGVyLCB7XG4gICAgICBwcmVmaXg6ICdmb3JtbHlDb25maWcuc2V0V3JhcHBlcicsXG4gICAgICB1cmxTdWZmaXg6ICdzZXR3cmFwcGVyLXZhbGlkYXRpb24tZmFpbGVkJ1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tXcmFwcGVyVGVtcGxhdGUodGVtcGxhdGUsIGFkZGl0aW9uYWxJbmZvKSB7XG4gICAgdmFyIGZvcm1seVRyYW5zY2x1ZGUgPSAnPGZvcm1seS10cmFuc2NsdWRlPjwvZm9ybWx5LXRyYW5zY2x1ZGU+JztcbiAgICBpZiAodGVtcGxhdGUuaW5kZXhPZihmb3JtbHlUcmFuc2NsdWRlKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IGdldEZvcm1seUVycm9yKFxuICAgICAgICBgVGVtcGxhdGUgd3JhcHBlciB0ZW1wbGF0ZXMgbXVzdCB1c2UgXCIke2Zvcm1seVRyYW5zY2x1ZGV9XCIgc29tZXdoZXJlIGluIHRoZW0uIGAgK1xuICAgICAgICBgVGhpcyBvbmUgZG9lcyBub3QgaGF2ZSBcIjxmb3JtbHktdHJhbnNjbHVkZT48L2Zvcm1seS10cmFuc2NsdWRlPlwiIGluIGl0OiAke3RlbXBsYXRlfWAgKyAnXFxuJyArXG4gICAgICAgIGBBZGRpdGlvbmFsIGluZm9ybWF0aW9uOiAke0pTT04uc3RyaW5naWZ5KGFkZGl0aW9uYWxJbmZvKX1gXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcHJvdmlkZXJzL2Zvcm1seVVzYWJpbGl0eS5qc1xuICoqLyIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXItZml4JztcbmltcG9ydCB1dGlscyBmcm9tICcuLi9vdGhlci91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1seUNvbmZpZztcblxuLy8gQG5nSW5qZWN0XG5mdW5jdGlvbiBmb3JtbHlDb25maWcoZm9ybWx5VXNhYmlsaXR5UHJvdmlkZXIsIGZvcm1seUFwaUNoZWNrKSB7XG5cbiAgdmFyIHR5cGVNYXAgPSB7fTtcbiAgdmFyIHRlbXBsYXRlV3JhcHBlcnNNYXAgPSB7fTtcbiAgdmFyIGRlZmF1bHRXcmFwcGVyTmFtZSA9ICdkZWZhdWx0JztcbiAgdmFyIF90aGlzID0gdGhpcztcbiAgdmFyIGdldEVycm9yID0gZm9ybWx5VXNhYmlsaXR5UHJvdmlkZXIuZ2V0Rm9ybWx5RXJyb3I7XG5cbiAgYW5ndWxhci5leHRlbmQodGhpcywge1xuICAgIHNldFR5cGUsXG4gICAgZ2V0VHlwZSxcbiAgICBzZXRXcmFwcGVyLFxuICAgIGdldFdyYXBwZXIsXG4gICAgZ2V0V3JhcHBlckJ5VHlwZSxcbiAgICByZW1vdmVXcmFwcGVyQnlOYW1lLFxuICAgIHJlbW92ZVdyYXBwZXJzRm9yVHlwZSxcbiAgICBkaXNhYmxlV2FybmluZ3M6IGZhbHNlLFxuICAgIGV4dHJhczoge1xuICAgICAgZGlzYWJsZU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yOiBmYWxzZSxcbiAgICAgIG5nTW9kZWxBdHRyc01hbmlwdWxhdG9yUHJlZmVyVW5ib3VuZDogZmFsc2UsXG4gICAgICByZW1vdmVDaHJvbWVBdXRvQ29tcGxldGU6IGZhbHNlLFxuICAgICAgZGVmYXVsdEhpZGVEaXJlY3RpdmU6ICduZy1pZidcbiAgICB9LFxuICAgIHRlbXBsYXRlTWFuaXB1bGF0b3JzOiB7XG4gICAgICBwcmVXcmFwcGVyOiBbXSxcbiAgICAgIHBvc3RXcmFwcGVyOiBbXVxuICAgIH0sXG4gICAgJGdldDogKCkgPT4gdGhpc1xuICB9KTtcblxuICBmdW5jdGlvbiBzZXRUeXBlKG9wdGlvbnMpIHtcbiAgICBpZiAoYW5ndWxhci5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICBhbmd1bGFyLmZvckVhY2gob3B0aW9ucywgc2V0VHlwZSk7XG4gICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgICBjaGVja1R5cGUob3B0aW9ucyk7XG4gICAgICBpZiAob3B0aW9ucy5leHRlbmRzKSB7XG4gICAgICAgIGV4dGVuZFR5cGVPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgdHlwZU1hcFtvcHRpb25zLm5hbWVdID0gb3B0aW9ucztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZ2V0RXJyb3IoYFlvdSBtdXN0IHByb3ZpZGUgYW4gb2JqZWN0IG9yIGFycmF5IGZvciBzZXRUeXBlLiBZb3UgcHJvdmlkZWQ6ICR7SlNPTi5zdHJpbmdpZnkoYXJndW1lbnRzKX1gKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1R5cGUob3B0aW9ucykge1xuICAgIGZvcm1seUFwaUNoZWNrLnRocm93KGZvcm1seUFwaUNoZWNrLmZvcm1seVR5cGVPcHRpb25zLCBvcHRpb25zLCB7XG4gICAgICBwcmVmaXg6ICdmb3JtbHlDb25maWcuc2V0VHlwZScsXG4gICAgICB1cmw6ICdzZXR0eXBlLXZhbGlkYXRpb24tZmFpbGVkJ1xuICAgIH0pO1xuICAgIGlmICghb3B0aW9ucy5vdmVyd3JpdGVPaykge1xuICAgICAgY2hlY2tPdmVyd3JpdGUob3B0aW9ucy5uYW1lLCB0eXBlTWFwLCBvcHRpb25zLCAndHlwZXMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucy5vdmVyd3JpdGVPayA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBleHRlbmRUeXBlT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgY29uc3QgZXh0ZW5kc1R5cGUgPSBnZXRUeXBlKG9wdGlvbnMuZXh0ZW5kcywgdHJ1ZSwgb3B0aW9ucyk7XG4gICAgZXh0ZW5kVHlwZUNvbnRyb2xsZXJGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSk7XG4gICAgZXh0ZW5kVHlwZUxpbmtGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSk7XG4gICAgZXh0ZW5kVHlwZVZhbGlkYXRlT3B0aW9uc0Z1bmN0aW9uKG9wdGlvbnMsIGV4dGVuZHNUeXBlKTtcbiAgICBleHRlbmRUeXBlRGVmYXVsdE9wdGlvbnMob3B0aW9ucywgZXh0ZW5kc1R5cGUpO1xuICAgIHV0aWxzLnJldmVyc2VEZWVwTWVyZ2Uob3B0aW9ucywgZXh0ZW5kc1R5cGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gZXh0ZW5kVHlwZUNvbnRyb2xsZXJGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSkge1xuICAgIGNvbnN0IGV4dGVuZHNDdHJsID0gZXh0ZW5kc1R5cGUuY29udHJvbGxlcjtcbiAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGV4dGVuZHNDdHJsKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBvcHRpb25zQ3RybCA9IG9wdGlvbnMuY29udHJvbGxlcjtcbiAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0aW9uc0N0cmwpKSB7XG4gICAgICBvcHRpb25zLmNvbnRyb2xsZXIgPSBmdW5jdGlvbiAoJHNjb3BlLCAkY29udHJvbGxlcikge1xuICAgICAgICAkY29udHJvbGxlcihleHRlbmRzQ3RybCwgeyRzY29wZX0pO1xuICAgICAgICAkY29udHJvbGxlcihvcHRpb25zQ3RybCwgeyRzY29wZX0pO1xuICAgICAgfTtcbiAgICAgIG9wdGlvbnMuY29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGNvbnRyb2xsZXInXTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucy5jb250cm9sbGVyID0gZXh0ZW5kc0N0cmw7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZXh0ZW5kVHlwZUxpbmtGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSkge1xuICAgIGNvbnN0IGV4dGVuZHNGbiA9IGV4dGVuZHNUeXBlLmxpbms7XG4gICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChleHRlbmRzRm4pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG9wdGlvbnNGbiA9IG9wdGlvbnMubGluaztcbiAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0aW9uc0ZuKSkge1xuICAgICAgb3B0aW9ucy5saW5rID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBleHRlbmRzRm4oLi4uYXJndW1lbnRzKTtcbiAgICAgICAgb3B0aW9uc0ZuKC4uLmFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb25zLmxpbmsgPSBleHRlbmRzRm47XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZXh0ZW5kVHlwZVZhbGlkYXRlT3B0aW9uc0Z1bmN0aW9uKG9wdGlvbnMsIGV4dGVuZHNUeXBlKSB7XG4gICAgY29uc3QgZXh0ZW5kc0ZuID0gZXh0ZW5kc1R5cGUudmFsaWRhdGVPcHRpb25zO1xuICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoZXh0ZW5kc0ZuKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBvcHRpb25zRm4gPSBvcHRpb25zLnZhbGlkYXRlT3B0aW9ucztcbiAgICBjb25zdCBvcmlnaW5hbERlZmF1bHRPcHRpb25zID0gb3B0aW9ucy5kZWZhdWx0T3B0aW9ucztcbiAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0aW9uc0ZuKSkge1xuICAgICAgb3B0aW9ucy52YWxpZGF0ZU9wdGlvbnMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBvcHRpb25zRm4ob3B0aW9ucyk7XG4gICAgICAgIGxldCBtZXJnZWRPcHRpb25zID0gYW5ndWxhci5jb3B5KG9wdGlvbnMpO1xuICAgICAgICBsZXQgZGVmYXVsdE9wdGlvbnMgPSBvcmlnaW5hbERlZmF1bHRPcHRpb25zO1xuICAgICAgICBpZiAoZGVmYXVsdE9wdGlvbnMpIHtcbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKGRlZmF1bHRPcHRpb25zKSkge1xuICAgICAgICAgICAgZGVmYXVsdE9wdGlvbnMgPSBkZWZhdWx0T3B0aW9ucyhtZXJnZWRPcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdXRpbHMucmV2ZXJzZURlZXBNZXJnZShtZXJnZWRPcHRpb25zLCBkZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgZXh0ZW5kc0ZuKG1lcmdlZE9wdGlvbnMpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucy52YWxpZGF0ZU9wdGlvbnMgPSBleHRlbmRzRm47XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZXh0ZW5kVHlwZURlZmF1bHRPcHRpb25zKG9wdGlvbnMsIGV4dGVuZHNUeXBlKSB7XG4gICAgY29uc3QgZXh0ZW5kc0RPID0gZXh0ZW5kc1R5cGUuZGVmYXVsdE9wdGlvbnM7XG4gICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChleHRlbmRzRE8pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG9wdGlvbnNETyA9IG9wdGlvbnMuZGVmYXVsdE9wdGlvbnM7XG4gICAgY29uc3Qgb3B0aW9uc0RPSXNGbiA9IGFuZ3VsYXIuaXNGdW5jdGlvbihvcHRpb25zRE8pO1xuICAgIGNvbnN0IGV4dGVuZHNET0lzRm4gPSBhbmd1bGFyLmlzRnVuY3Rpb24oZXh0ZW5kc0RPKTtcbiAgICBpZiAoZXh0ZW5kc0RPSXNGbikge1xuICAgICAgb3B0aW9ucy5kZWZhdWx0T3B0aW9ucyA9IGZ1bmN0aW9uIGRlZmF1bHRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZXh0ZW5kc0RlZmF1bHRPcHRpb25zID0gZXh0ZW5kc0RPKG9wdGlvbnMpO1xuICAgICAgICBjb25zdCBtZXJnZWREZWZhdWx0T3B0aW9ucyA9IHt9O1xuICAgICAgICB1dGlscy5yZXZlcnNlRGVlcE1lcmdlKG1lcmdlZERlZmF1bHRPcHRpb25zLCBvcHRpb25zLCBleHRlbmRzRGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICBsZXQgZXh0ZW5kZXJPcHRpb25zRGVmYXVsdE9wdGlvbnMgPSBvcHRpb25zRE87XG4gICAgICAgIGlmIChvcHRpb25zRE9Jc0ZuKSB7XG4gICAgICAgICAgZXh0ZW5kZXJPcHRpb25zRGVmYXVsdE9wdGlvbnMgPSBleHRlbmRlck9wdGlvbnNEZWZhdWx0T3B0aW9ucyhtZXJnZWREZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgdXRpbHMucmV2ZXJzZURlZXBNZXJnZShleHRlbmRzRGVmYXVsdE9wdGlvbnMsIGV4dGVuZGVyT3B0aW9uc0RlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZHNEZWZhdWx0T3B0aW9ucztcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChvcHRpb25zRE9Jc0ZuKSB7XG4gICAgICBvcHRpb25zLmRlZmF1bHRPcHRpb25zID0gZnVuY3Rpb24gZGVmYXVsdE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBsZXQgbmV3RGVmYXVsdE9wdGlvbnMgPSB7fTtcbiAgICAgICAgdXRpbHMucmV2ZXJzZURlZXBNZXJnZShuZXdEZWZhdWx0T3B0aW9ucywgb3B0aW9ucywgZXh0ZW5kc0RPKTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnNETyhuZXdEZWZhdWx0T3B0aW9ucyk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFR5cGUobmFtZSwgdGhyb3dFcnJvciwgZXJyb3JDb250ZXh0KSB7XG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB2YXIgdHlwZSA9IHR5cGVNYXBbbmFtZV07XG4gICAgaWYgKCF0eXBlICYmIHRocm93RXJyb3IgPT09IHRydWUpIHtcbiAgICAgIHRocm93IGdldEVycm9yKFxuICAgICAgICBgVGhlcmUgaXMgbm8gdHlwZSBieSB0aGUgbmFtZSBvZiBcIiR7bmFtZX1cIjogJHtKU09OLnN0cmluZ2lmeShlcnJvckNvbnRleHQpfWBcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFdyYXBwZXIob3B0aW9ucywgbmFtZSkge1xuICAgIGlmIChhbmd1bGFyLmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLm1hcCh3cmFwcGVyT3B0aW9ucyA9PiBzZXRXcmFwcGVyKHdyYXBwZXJPcHRpb25zKSk7XG4gICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgICBvcHRpb25zLnR5cGVzID0gZ2V0T3B0aW9uc1R5cGVzKG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5uYW1lID0gZ2V0T3B0aW9uc05hbWUob3B0aW9ucywgbmFtZSk7XG4gICAgICBjaGVja1dyYXBwZXJBUEkob3B0aW9ucyk7XG4gICAgICB0ZW1wbGF0ZVdyYXBwZXJzTWFwW29wdGlvbnMubmFtZV0gPSBvcHRpb25zO1xuICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzU3RyaW5nKG9wdGlvbnMpKSB7XG4gICAgICByZXR1cm4gc2V0V3JhcHBlcih7XG4gICAgICAgIHRlbXBsYXRlOiBvcHRpb25zLFxuICAgICAgICBuYW1lXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRPcHRpb25zVHlwZXMob3B0aW9ucykge1xuICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKG9wdGlvbnMudHlwZXMpKSB7XG4gICAgICByZXR1cm4gW29wdGlvbnMudHlwZXNdO1xuICAgIH1cbiAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMudHlwZXMpKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLnR5cGVzO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE9wdGlvbnNOYW1lKG9wdGlvbnMsIG5hbWUpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5uYW1lIHx8IG5hbWUgfHwgb3B0aW9ucy50eXBlcy5qb2luKCcgJykgfHwgZGVmYXVsdFdyYXBwZXJOYW1lO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tXcmFwcGVyQVBJKG9wdGlvbnMpIHtcbiAgICBmb3JtbHlVc2FiaWxpdHlQcm92aWRlci5jaGVja1dyYXBwZXIob3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMudGVtcGxhdGUpIHtcbiAgICAgIGZvcm1seVVzYWJpbGl0eVByb3ZpZGVyLmNoZWNrV3JhcHBlclRlbXBsYXRlKG9wdGlvbnMudGVtcGxhdGUsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAoIW9wdGlvbnMub3ZlcndyaXRlT2spIHtcbiAgICAgIGNoZWNrT3ZlcndyaXRlKG9wdGlvbnMubmFtZSwgdGVtcGxhdGVXcmFwcGVyc01hcCwgb3B0aW9ucywgJ3RlbXBsYXRlV3JhcHBlcnMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIG9wdGlvbnMub3ZlcndyaXRlT2s7XG4gICAgfVxuICAgIGNoZWNrV3JhcHBlclR5cGVzKG9wdGlvbnMpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tXcmFwcGVyVHlwZXMob3B0aW9ucykge1xuICAgIGxldCBzaG91bGRUaHJvdyA9ICFhbmd1bGFyLmlzQXJyYXkob3B0aW9ucy50eXBlcykgfHwgIW9wdGlvbnMudHlwZXMuZXZlcnkoYW5ndWxhci5pc1N0cmluZyk7XG4gICAgaWYgKHNob3VsZFRocm93KSB7XG4gICAgICB0aHJvdyBnZXRFcnJvcihgQXR0ZW1wdGVkIHRvIGNyZWF0ZSBhIHRlbXBsYXRlIHdyYXBwZXIgd2l0aCB0eXBlcyB0aGF0IGlzIG5vdCBhIHN0cmluZyBvciBhbiBhcnJheSBvZiBzdHJpbmdzYCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tPdmVyd3JpdGUocHJvcGVydHksIG9iamVjdCwgbmV3VmFsdWUsIG9iamVjdE5hbWUpIHtcbiAgICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgd2FybihbXG4gICAgICAgIGBBdHRlbXB0aW5nIHRvIG92ZXJ3cml0ZSAke3Byb3BlcnR5fSBvbiAke29iamVjdE5hbWV9IHdoaWNoIGlzIGN1cnJlbnRseWAsXG4gICAgICAgIGAke0pTT04uc3RyaW5naWZ5KG9iamVjdFtwcm9wZXJ0eV0pfSB3aXRoICR7SlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpfWAsXG4gICAgICAgIGBUbyBzdXByZXNzIHRoaXMgd2FybmluZywgc3BlY2lmeSB0aGUgcHJvcGVydHkgXCJvdmVyd3JpdGVPazogdHJ1ZVwiYFxuICAgICAgXS5qb2luKCcgJykpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFdyYXBwZXIobmFtZSkge1xuICAgIHJldHVybiB0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWUgfHwgZGVmYXVsdFdyYXBwZXJOYW1lXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFdyYXBwZXJCeVR5cGUodHlwZSkge1xuICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjYgKi9cbiAgICB2YXIgd3JhcHBlcnMgPSBbXTtcbiAgICBmb3IgKHZhciBuYW1lIGluIHRlbXBsYXRlV3JhcHBlcnNNYXApIHtcbiAgICAgIGlmICh0ZW1wbGF0ZVdyYXBwZXJzTWFwLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIGlmICh0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdLnR5cGVzICYmIHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV0udHlwZXMuaW5kZXhPZih0eXBlKSAhPT0gLTEpIHtcbiAgICAgICAgICB3cmFwcGVycy5wdXNoKHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB3cmFwcGVycztcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVdyYXBwZXJCeU5hbWUobmFtZSkge1xuICAgIHZhciB3cmFwcGVyID0gdGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lXTtcbiAgICBkZWxldGUgdGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lXTtcbiAgICByZXR1cm4gd3JhcHBlcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVdyYXBwZXJzRm9yVHlwZSh0eXBlKSB7XG4gICAgdmFyIHdyYXBwZXJzID0gZ2V0V3JhcHBlckJ5VHlwZSh0eXBlKTtcbiAgICBpZiAoIXdyYXBwZXJzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghYW5ndWxhci5pc0FycmF5KHdyYXBwZXJzKSkge1xuICAgICAgcmV0dXJuIHJlbW92ZVdyYXBwZXJCeU5hbWUod3JhcHBlcnMubmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdyYXBwZXJzLmZvckVhY2goKHdyYXBwZXIpID0+IHJlbW92ZVdyYXBwZXJCeU5hbWUod3JhcHBlci5uYW1lKSk7XG4gICAgICByZXR1cm4gd3JhcHBlcnM7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiB3YXJuKCkge1xuICAgIGlmICghX3RoaXMuZGlzYWJsZVdhcm5pbmdzKSB7XG4gICAgICBjb25zb2xlLndhcm4oLi4uYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3Byb3ZpZGVycy9mb3JtbHlDb25maWcuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXM7XG5cblxuLy8gQG5nSW5qZWN0XG5mdW5jdGlvbiBmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMoKSB7XG5cbiAgdmFyIHZhbGlkYXRpb25NZXNzYWdlcyA9IHtcbiAgICBhZGRUZW1wbGF0ZU9wdGlvblZhbHVlTWVzc2FnZSxcbiAgICBhZGRTdHJpbmdNZXNzYWdlLFxuICAgIG1lc3NhZ2VzOiB7fVxuICB9O1xuXG4gIHJldHVybiB2YWxpZGF0aW9uTWVzc2FnZXM7XG5cbiAgZnVuY3Rpb24gYWRkVGVtcGxhdGVPcHRpb25WYWx1ZU1lc3NhZ2UobmFtZSwgcHJvcCwgcHJlZml4LCBzdWZmaXgsIGFsdGVybmF0ZSkge1xuICAgIHZhbGlkYXRpb25NZXNzYWdlcy5tZXNzYWdlc1tuYW1lXSA9IHRlbXBsYXRlT3B0aW9uVmFsdWUocHJvcCwgcHJlZml4LCBzdWZmaXgsIGFsdGVybmF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRTdHJpbmdNZXNzYWdlKG5hbWUsIHN0cmluZykge1xuICAgIHZhbGlkYXRpb25NZXNzYWdlcy5tZXNzYWdlc1tuYW1lXSA9ICgpID0+IHN0cmluZztcbiAgfVxuXG5cbiAgZnVuY3Rpb24gdGVtcGxhdGVPcHRpb25WYWx1ZShwcm9wLCBwcmVmaXgsIHN1ZmZpeCwgYWx0ZXJuYXRlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGdldFZhbGlkYXRpb25NZXNzYWdlKHZpZXdWYWx1ZSwgbW9kZWxWYWx1ZSwgc2NvcGUpIHtcbiAgICAgIGlmIChzY29wZS5vcHRpb25zLnRlbXBsYXRlT3B0aW9uc1twcm9wXSkge1xuICAgICAgICByZXR1cm4gYCR7cHJlZml4fSAke3Njb3BlLm9wdGlvbnMudGVtcGxhdGVPcHRpb25zW3Byb3BdfSAke3N1ZmZpeH1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGFsdGVybmF0ZTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9wcm92aWRlcnMvZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzLmpzXG4gKiovIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4uL290aGVyL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZm9ybWx5VXRpbDtcblxuLy8gQG5nSW5qZWN0XG5mdW5jdGlvbiBmb3JtbHlVdGlsKCkge1xuICByZXR1cm4gdXRpbHM7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9zZXJ2aWNlcy9mb3JtbHlVdGlsLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZm9ybWx5V2FybjtcblxuLy8gQG5nSW5qZWN0XG5mdW5jdGlvbiBmb3JtbHlXYXJuKGZvcm1seUNvbmZpZywgZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeCwgJGxvZykge1xuICByZXR1cm4gZnVuY3Rpb24gd2FybigpIHtcbiAgICBpZiAoIWZvcm1seUNvbmZpZy5kaXNhYmxlV2FybmluZ3MpIHtcbiAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgIHZhciB3YXJuSW5mb1NsdWcgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICBhcmdzLnVuc2hpZnQoJ0Zvcm1seSBXYXJuaW5nOicpO1xuICAgICAgYXJncy5wdXNoKGAke2Zvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXh9JHt3YXJuSW5mb1NsdWd9YCk7XG4gICAgICAkbG9nLndhcm4oLi4uYXJncyk7XG4gICAgfVxuICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vc2VydmljZXMvZm9ybWx5V2Fybi5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZvcm1seUN1c3RvbVZhbGlkYXRpb247XG5cbi8vIEBuZ0luamVjdFxuZnVuY3Rpb24gZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbihmb3JtbHlVdGlsLCAkcSkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgcmVxdWlyZTogJ25nTW9kZWwnLFxuICAgIGxpbms6IGZ1bmN0aW9uIGZvcm1seUN1c3RvbVZhbGlkYXRpb25MaW5rKHNjb3BlLCBlbCwgYXR0cnMsIGN0cmwpIHtcbiAgICAgIGNvbnN0IG9wdHMgPSBzY29wZS5vcHRpb25zO1xuICAgICAgaWYgKG9wdHMudmFsaWRhdG9ycykge1xuICAgICAgICBjaGVja1ZhbGlkYXRvcnMob3B0cy52YWxpZGF0b3JzKTtcbiAgICAgIH1cbiAgICAgIG9wdHMudmFsaWRhdGlvbi5tZXNzYWdlcyA9IG9wdHMudmFsaWRhdGlvbi5tZXNzYWdlcyB8fCB7fTtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChvcHRzLnZhbGlkYXRpb24ubWVzc2FnZXMsIChtZXNzYWdlLCBrZXkpID0+IHtcbiAgICAgICAgb3B0cy52YWxpZGF0aW9uLm1lc3NhZ2VzW2tleV0gPSAoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGZvcm1seVV0aWwuZm9ybWx5RXZhbChzY29wZSwgbWVzc2FnZSwgY3RybC4kbW9kZWxWYWx1ZSwgY3RybC4kdmlld1ZhbHVlKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG5cbiAgICAgIHZhciB1c2VOZXdWYWxpZGF0b3JzQXBpID0gY3RybC5oYXNPd25Qcm9wZXJ0eSgnJHZhbGlkYXRvcnMnKSAmJiAhYXR0cnMuaGFzT3duUHJvcGVydHkoJ3VzZVBhcnNlcnMnKTtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChvcHRzLnZhbGlkYXRvcnMsIGZ1bmN0aW9uIGFkZFZhbGlkYXRvclRvUGlwZWxpbmUodmFsaWRhdG9yLCBuYW1lKSB7XG4gICAgICAgIHZhciBtZXNzYWdlID0gdmFsaWRhdG9yLm1lc3NhZ2U7XG4gICAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgICAgb3B0cy52YWxpZGF0aW9uLm1lc3NhZ2VzW25hbWVdID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGZvcm1seVV0aWwuZm9ybWx5RXZhbChzY29wZSwgbWVzc2FnZSwgY3RybC4kbW9kZWxWYWx1ZSwgY3RybC4kdmlld1ZhbHVlKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHZhbGlkYXRvciA9IGFuZ3VsYXIuaXNPYmplY3QodmFsaWRhdG9yKSA/IHZhbGlkYXRvci5leHByZXNzaW9uIDogdmFsaWRhdG9yO1xuICAgICAgICB2YXIgaXNQb3NzaWJseUFzeW5jID0gIWFuZ3VsYXIuaXNTdHJpbmcodmFsaWRhdG9yKTtcbiAgICAgICAgaWYgKHVzZU5ld1ZhbGlkYXRvcnNBcGkpIHtcbiAgICAgICAgICBzZXR1cFdpdGhWYWxpZGF0b3JzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0dXBXaXRoUGFyc2VycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0dXBXaXRoVmFsaWRhdG9ycygpIHtcbiAgICAgICAgICB2YXIgdmFsaWRhdG9yQ29sbGVjdGlvbiA9IGlzUG9zc2libHlBc3luYyA/ICckYXN5bmNWYWxpZGF0b3JzJyA6ICckdmFsaWRhdG9ycyc7XG4gICAgICAgICAgY3RybFt2YWxpZGF0b3JDb2xsZWN0aW9uXVtuYW1lXSA9IGZ1bmN0aW9uIGV2YWxWYWxpZGl0eShtb2RlbFZhbHVlLCB2aWV3VmFsdWUpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGZvcm1seVV0aWwuZm9ybWx5RXZhbChzY29wZSwgdmFsaWRhdG9yLCBtb2RlbFZhbHVlLCB2aWV3VmFsdWUpO1xuICAgICAgICAgICAgaWYgKGlzUG9zc2libHlBc3luYykge1xuICAgICAgICAgICAgICByZXR1cm4gaXNQcm9taXNlTGlrZSh2YWx1ZSkgPyB2YWx1ZSA6IHZhbHVlID8gJHEud2hlbih2YWx1ZSkgOiAkcS5yZWplY3QodmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzZXR1cFdpdGhQYXJzZXJzKCkge1xuICAgICAgICAgIGxldCBpbkZsaWdodFZhbGlkYXRvcjtcbiAgICAgICAgICBjdHJsLiRwYXJzZXJzLnVuc2hpZnQoZnVuY3Rpb24gZXZhbFZhbGlkaXR5T2ZQYXJzZXIodmlld1ZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgaXNWYWxpZCA9IGZvcm1seVV0aWwuZm9ybWx5RXZhbChzY29wZSwgdmFsaWRhdG9yLCBjdHJsLiRtb2RlbFZhbHVlLCB2aWV3VmFsdWUpO1xuICAgICAgICAgICAgaWYgKGlzUHJvbWlzZUxpa2UoaXNWYWxpZCkpIHtcbiAgICAgICAgICAgICAgY3RybC4kcGVuZGluZyA9IGN0cmwuJHBlbmRpbmcgfHwge307XG4gICAgICAgICAgICAgIGN0cmwuJHBlbmRpbmdbbmFtZV0gPSB0cnVlO1xuICAgICAgICAgICAgICBpbkZsaWdodFZhbGlkYXRvciA9IGlzVmFsaWQ7XG4gICAgICAgICAgICAgIGlzVmFsaWQudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGluRmxpZ2h0VmFsaWRhdG9yID09PSBpc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICBjdHJsLiRzZXRWYWxpZGl0eShuYW1lLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaW5GbGlnaHRWYWxpZGF0b3IgPT09IGlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgIGN0cmwuJHNldFZhbGlkaXR5KG5hbWUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhjdHJsLiRwZW5kaW5nKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjdHJsLiRwZW5kaW5nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBkZWxldGUgY3RybC4kcGVuZGluZ1tuYW1lXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY3RybC4kc2V0VmFsaWRpdHkobmFtZSwgaXNWYWxpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmlld1ZhbHVlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gaXNQcm9taXNlTGlrZShvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIGFuZ3VsYXIuaXNGdW5jdGlvbihvYmoudGhlbik7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1ZhbGlkYXRvcnModmFsaWRhdG9ycykge1xuICAgIHZhciBhbGxvd2VkUHJvcGVydGllcyA9IFsnZXhwcmVzc2lvbicsICdtZXNzYWdlJ107XG4gICAgdmFyIHZhbGlkYXRvcnNXaXRoRXh0cmFQcm9wcyA9IHt9O1xuICAgIGFuZ3VsYXIuZm9yRWFjaCh2YWxpZGF0b3JzLCAodmFsaWRhdG9yLCBuYW1lKSA9PiB7XG4gICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyh2YWxpZGF0b3IpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBleHRyYVByb3BzID0gW107XG4gICAgICBhbmd1bGFyLmZvckVhY2godmFsaWRhdG9yLCAodiwga2V5KSA9PiB7XG4gICAgICAgIGlmIChhbGxvd2VkUHJvcGVydGllcy5pbmRleE9mKGtleSkgPT09IC0xKSB7XG4gICAgICAgICAgZXh0cmFQcm9wcy5wdXNoKGtleSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKGV4dHJhUHJvcHMubGVuZ3RoKSB7XG4gICAgICAgIHZhbGlkYXRvcnNXaXRoRXh0cmFQcm9wc1tuYW1lXSA9IGV4dHJhUHJvcHM7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKE9iamVjdC5rZXlzKHZhbGlkYXRvcnNXaXRoRXh0cmFQcm9wcykubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoW1xuICAgICAgICBgVmFsaWRhdG9ycyBhcmUgb25seSBhbGxvd2VkIHRvIGJlIGZ1bmN0aW9ucyBvciBvYmplY3RzIHRoYXQgaGF2ZSAke2FsbG93ZWRQcm9wZXJ0aWVzLmpvaW4oJywgJyl9LmAsXG4gICAgICAgIGBZb3UgcHJvdmlkZWQgc29tZSBleHRyYSBwcm9wZXJ0aWVzOiAke0pTT04uc3RyaW5naWZ5KHZhbGlkYXRvcnNXaXRoRXh0cmFQcm9wcyl9YFxuICAgICAgXS5qb2luKCcgJykpO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vZGlyZWN0aXZlcy9mb3JtbHktY3VzdG9tLXZhbGlkYXRpb24uanNcbiAqKi8iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyLWZpeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1seUZpZWxkO1xuXG4vKipcbiAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAqIEBuYW1lIGZvcm1seUZpZWxkXG4gKiBAcmVzdHJpY3QgQUVcbiAqL1xuLy8gQG5nSW5qZWN0XG5mdW5jdGlvbiBmb3JtbHlGaWVsZCgkaHR0cCwgJHEsICRjb21waWxlLCAkdGVtcGxhdGVDYWNoZSwgZm9ybWx5Q29uZmlnLCBmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMsIGZvcm1seUFwaUNoZWNrLFxuICAgICAgICAgICAgICAgICAgICAgZm9ybWx5VXRpbCwgZm9ybWx5VXNhYmlsaXR5LCBmb3JtbHlXYXJuKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBRScsXG4gICAgdHJhbnNjbHVkZTogdHJ1ZSxcbiAgICBzY29wZToge1xuICAgICAgb3B0aW9uczogJz0nLFxuICAgICAgbW9kZWw6ICc9JyxcbiAgICAgIGZvcm1JZDogJ0AnLFxuICAgICAgaW5kZXg6ICc9PycsXG4gICAgICBmaWVsZHM6ICc9PycsXG4gICAgICBmb3JtU3RhdGU6ICc9PycsXG4gICAgICBmb3JtOiAnPT8nXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiAvKiBAbmdJbmplY3QgKi8gZnVuY3Rpb24gRm9ybWx5RmllbGRDb250cm9sbGVyKCRzY29wZSwgJHRpbWVvdXQsICRwYXJzZSwgJGNvbnRyb2xsZXIpIHtcbiAgICAgIHZhciBvcHRzID0gJHNjb3BlLm9wdGlvbnM7XG4gICAgICB2YXIgZmllbGRUeXBlID0gb3B0cy50eXBlICYmIGZvcm1seUNvbmZpZy5nZXRUeXBlKG9wdHMudHlwZSk7XG4gICAgICBzaW1wbGlmeUxpZmUob3B0cyk7XG4gICAgICBtZXJnZUZpZWxkT3B0aW9uc1dpdGhUeXBlRGVmYXVsdHMob3B0cywgZmllbGRUeXBlKTtcbiAgICAgIGV4dGVuZE9wdGlvbnNXaXRoRGVmYXVsdHMob3B0cywgJHNjb3BlLmluZGV4KTtcbiAgICAgIGNoZWNrQXBpKG9wdHMpO1xuICAgICAgLy8gc2V0IGZpZWxkIGlkIHRvIGxpbmsgbGFiZWxzIGFuZCBmaWVsZHNcbiAgICAgICRzY29wZS5pZCA9IGZvcm1seVV0aWwuZ2V0RmllbGRJZCgkc2NvcGUuZm9ybUlkLCBvcHRzLCAkc2NvcGUuaW5kZXgpO1xuXG4gICAgICAvLyBpbml0YWxpemF0aW9uXG4gICAgICBzZXREZWZhdWx0VmFsdWUoKTtcbiAgICAgIHNldEluaXRpYWxWYWx1ZSgpO1xuICAgICAgcnVuRXhwcmVzc2lvbnMoKTtcbiAgICAgIGFkZE1vZGVsV2F0Y2hlcigkc2NvcGUsIG9wdHMpO1xuICAgICAgYWRkVmFsaWRhdGlvbk1lc3NhZ2VzKG9wdHMpO1xuICAgICAgLy8gc2ltcGxpZnkgdGhpbmdzXG4gICAgICAvLyBjcmVhdGUgJHNjb3BlLnRvIHNvIHRlbXBsYXRlIGF1dGhvcnMgY2FuIHJlZmVyZW5jZSB0byBpbnN0ZWFkIG9mICRzY29wZS5vcHRpb25zLnRlbXBsYXRlT3B0aW9uc1xuICAgICAgJHNjb3BlLnRvID0gJHNjb3BlLm9wdGlvbnMudGVtcGxhdGVPcHRpb25zO1xuICAgICAgaW52b2tlQ29udHJvbGxlcnMoJHNjb3BlLCBvcHRzLCBmaWVsZFR5cGUpO1xuXG4gICAgICAvLyBmdW5jdGlvbiBkZWZpbml0aW9uc1xuICAgICAgZnVuY3Rpb24gcnVuRXhwcmVzc2lvbnMoKSB7XG4gICAgICAgIC8vIG11c3QgcnVuIG9uIG5leHQgdGljayB0byBtYWtlIHN1cmUgdGhhdCB0aGUgY3VycmVudCB2YWx1ZSBpcyBjb3JyZWN0LlxuICAgICAgICAkdGltZW91dChmdW5jdGlvbiBydW5FeHByZXNzaW9uc09uTmV4dFRpY2soKSB7XG4gICAgICAgICAgdmFyIGZpZWxkID0gJHNjb3BlLm9wdGlvbnM7XG4gICAgICAgICAgdmFyIGN1cnJlbnRWYWx1ZSA9IHZhbHVlR2V0dGVyU2V0dGVyKCk7XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGZpZWxkLmV4cHJlc3Npb25Qcm9wZXJ0aWVzLCBmdW5jdGlvbiBydW5FeHByZXNzaW9uKGV4cHJlc3Npb24sIHByb3ApIHtcbiAgICAgICAgICAgIHZhciBzZXR0ZXIgPSAkcGFyc2UocHJvcCkuYXNzaWduO1xuICAgICAgICAgICAgdmFyIHByb21pc2UgPSAkcS53aGVuKGZvcm1seVV0aWwuZm9ybWx5RXZhbCgkc2NvcGUsIGV4cHJlc3Npb24sIGN1cnJlbnRWYWx1ZSkpO1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uIHNldEZpZWxkVmFsdWUodmFsdWUpIHtcbiAgICAgICAgICAgICAgc2V0dGVyKGZpZWxkLCB2YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHZhbHVlR2V0dGVyU2V0dGVyKG5ld1ZhbCkge1xuICAgICAgICBpZiAoISRzY29wZS5tb2RlbCB8fCAhJHNjb3BlLm9wdGlvbnMua2V5KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChuZXdWYWwpKSB7XG4gICAgICAgICAgJHNjb3BlLm1vZGVsWyRzY29wZS5vcHRpb25zLmtleV0gPSBuZXdWYWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICRzY29wZS5tb2RlbFskc2NvcGUub3B0aW9ucy5rZXldO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzaW1wbGlmeUxpZmUob3B0aW9ucykge1xuICAgICAgICAvLyBhZGQgYSBmZXcgZW1wdHkgb2JqZWN0cyAoaWYgdGhleSBkb24ndCBhbHJlYWR5IGV4aXN0KSBzbyB5b3UgZG9uJ3QgaGF2ZSB0byB1bmRlZmluZWQgY2hlY2sgZXZlcnl3aGVyZVxuICAgICAgICBmb3JtbHlVdGlsLnJldmVyc2VEZWVwTWVyZ2Uob3B0aW9ucywge1xuICAgICAgICAgIGRhdGE6IHt9LFxuICAgICAgICAgIHRlbXBsYXRlT3B0aW9uczoge30sXG4gICAgICAgICAgdmFsaWRhdGlvbjoge31cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHNldERlZmF1bHRWYWx1ZSgpIHtcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdHMuZGVmYXVsdFZhbHVlKSAmJiAhYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLm1vZGVsW29wdHMua2V5XSkpIHtcbiAgICAgICAgICAkc2NvcGUubW9kZWxbb3B0cy5rZXldID0gb3B0cy5kZWZhdWx0VmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2V0SW5pdGlhbFZhbHVlKCkge1xuICAgICAgICBvcHRzLmluaXRpYWxWYWx1ZSA9ICRzY29wZS5tb2RlbCAmJiAkc2NvcGUubW9kZWxbb3B0cy5rZXldO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBtZXJnZUZpZWxkT3B0aW9uc1dpdGhUeXBlRGVmYXVsdHMob3B0aW9ucywgdHlwZSkge1xuICAgICAgICBpZiAodHlwZSkge1xuICAgICAgICAgIG1lcmdlT3B0aW9ucyhvcHRpb25zLCB0eXBlLmRlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJvcGVyT3JkZXIgPSBhcnJheWlmeShvcHRpb25zLm9wdGlvbnNUeXBlcykucmV2ZXJzZSgpOyAvLyBzbyB0aGUgcmlnaHQgdGhpbmdzIGFyZSBvdmVycmlkZGVuXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChwcm9wZXJPcmRlciwgdHlwZU5hbWUgPT4ge1xuICAgICAgICAgIG1lcmdlT3B0aW9ucyhvcHRpb25zLCBmb3JtbHlDb25maWcuZ2V0VHlwZSh0eXBlTmFtZSwgdHJ1ZSwgb3B0aW9ucykuZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gbWVyZ2VPcHRpb25zKG9wdGlvbnMsIGV4dHJhT3B0aW9ucykge1xuICAgICAgICBpZiAoZXh0cmFPcHRpb25zKSB7XG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihleHRyYU9wdGlvbnMpKSB7XG4gICAgICAgICAgICBleHRyYU9wdGlvbnMgPSBleHRyYU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvcm1seVV0aWwucmV2ZXJzZURlZXBNZXJnZShvcHRpb25zLCBleHRyYU9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGV4dGVuZE9wdGlvbnNXaXRoRGVmYXVsdHMob3B0aW9ucywgaW5kZXgpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gb3B0aW9ucy5rZXkgfHwgaW5kZXggfHwgMDtcbiAgICAgICAgYW5ndWxhci5leHRlbmQob3B0aW9ucywge1xuICAgICAgICAgIC8vIGF0dGFjaCB0aGUga2V5IGluIGNhc2UgdGhlIGZvcm1seS1maWVsZCBkaXJlY3RpdmUgaXMgdXNlZCBkaXJlY3RseVxuICAgICAgICAgIGtleSxcbiAgICAgICAgICB2YWx1ZTogdmFsdWVHZXR0ZXJTZXR0ZXIsXG4gICAgICAgICAgcnVuRXhwcmVzc2lvbnMsXG4gICAgICAgICAgcmVzZXRNb2RlbCxcbiAgICAgICAgICB1cGRhdGVJbml0aWFsVmFsdWVcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGluaXRpYWxpemF0aW9uIGZ1bmN0aW9uc1xuICAgICAgZnVuY3Rpb24gYWRkTW9kZWxXYXRjaGVyKHNjb3BlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zLm1vZGVsKSB7XG4gICAgICAgICAgc2NvcGUuJHdhdGNoKCdvcHRpb25zLm1vZGVsJywgcnVuRXhwcmVzc2lvbnMsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHJlc2V0TW9kZWwoKSB7XG4gICAgICAgICRzY29wZS5tb2RlbFskc2NvcGUub3B0aW9ucy5rZXldID0gJHNjb3BlLm9wdGlvbnMuaW5pdGlhbFZhbHVlO1xuICAgICAgICBpZiAoJHNjb3BlLm9wdGlvbnMuZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICAkc2NvcGUub3B0aW9ucy5mb3JtQ29udHJvbC4kc2V0Vmlld1ZhbHVlKCRzY29wZS5tb2RlbFskc2NvcGUub3B0aW9ucy5rZXldKTtcbiAgICAgICAgICAkc2NvcGUub3B0aW9ucy5mb3JtQ29udHJvbC4kcmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdXBkYXRlSW5pdGlhbFZhbHVlKCkge1xuICAgICAgICAkc2NvcGUub3B0aW9ucy5pbml0aWFsVmFsdWUgPSAkc2NvcGUubW9kZWxbJHNjb3BlLm9wdGlvbnMua2V5XTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYWRkVmFsaWRhdGlvbk1lc3NhZ2VzKG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucy52YWxpZGF0aW9uLm1lc3NhZ2VzID0gb3B0aW9ucy52YWxpZGF0aW9uLm1lc3NhZ2VzIHx8IHt9O1xuICAgICAgICBhbmd1bGFyLmZvckVhY2goZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzLm1lc3NhZ2VzLCBmdW5jdGlvbiBjcmVhdGVGdW5jdGlvbkZvck1lc3NhZ2UoZXhwcmVzc2lvbiwgbmFtZSkge1xuICAgICAgICAgIGlmICghb3B0aW9ucy52YWxpZGF0aW9uLm1lc3NhZ2VzW25hbWVdKSB7XG4gICAgICAgICAgICBvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXNbbmFtZV0gPSBmdW5jdGlvbiBldmFsdWF0ZU1lc3NhZ2Uodmlld1ZhbHVlLCBtb2RlbFZhbHVlLCBzY29wZSkge1xuICAgICAgICAgICAgICByZXR1cm4gZm9ybWx5VXRpbC5mb3JtbHlFdmFsKHNjb3BlLCBleHByZXNzaW9uLCBtb2RlbFZhbHVlLCB2aWV3VmFsdWUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBpbnZva2VDb250cm9sbGVycyhzY29wZSwgb3B0aW9ucyA9IHt9LCB0eXBlID0ge30pIHtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKFt0eXBlLmNvbnRyb2xsZXIsIG9wdGlvbnMuY29udHJvbGxlcl0sIGNvbnRyb2xsZXIgPT4ge1xuICAgICAgICAgIGlmIChjb250cm9sbGVyKSB7XG4gICAgICAgICAgICAkY29udHJvbGxlcihjb250cm9sbGVyLCB7JHNjb3BlOiBzY29wZX0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBsaW5rOiBmdW5jdGlvbiBmaWVsZExpbmsoc2NvcGUsIGVsKSB7XG4gICAgICB2YXIgdHlwZSA9IHNjb3BlLm9wdGlvbnMudHlwZSAmJiBmb3JtbHlDb25maWcuZ2V0VHlwZShzY29wZS5vcHRpb25zLnR5cGUpO1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICB2YXIgdGh1c2x5ID0gdGhpcztcbiAgICAgIGdldEZpZWxkVGVtcGxhdGUoc2NvcGUub3B0aW9ucylcbiAgICAgICAgLnRoZW4ocnVuTWFuaXB1bGF0b3JzKGZvcm1seUNvbmZpZy50ZW1wbGF0ZU1hbmlwdWxhdG9ycy5wcmVXcmFwcGVyKSlcbiAgICAgICAgLnRoZW4odHJhbnNjbHVkZUluV3JhcHBlcnMoc2NvcGUub3B0aW9ucykpXG4gICAgICAgIC50aGVuKHJ1bk1hbmlwdWxhdG9ycyhmb3JtbHlDb25maWcudGVtcGxhdGVNYW5pcHVsYXRvcnMucG9zdFdyYXBwZXIpKVxuICAgICAgICAudGhlbihzZXRFbGVtZW50VGVtcGxhdGUpXG4gICAgICAgIC50aGVuKHdhdGNoRm9ybUNvbnRyb2wpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgZm9ybWx5V2FybihcbiAgICAgICAgICAgICd0aGVyZS13YXMtYS1wcm9ibGVtLXNldHRpbmctdGhlLXRlbXBsYXRlLWZvci10aGlzLWZpZWxkJyxcbiAgICAgICAgICAgICdUaGVyZSB3YXMgYSBwcm9ibGVtIHNldHRpbmcgdGhlIHRlbXBsYXRlIGZvciB0aGlzIGZpZWxkICcsXG4gICAgICAgICAgICBzY29wZS5vcHRpb25zLFxuICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgZnVuY3Rpb24gc2V0RWxlbWVudFRlbXBsYXRlKHRlbXBsYXRlRWwpIHtcbiAgICAgICAgZWwuaHRtbChhc0h0bWwodGVtcGxhdGVFbCkpO1xuICAgICAgICAkY29tcGlsZShlbC5jb250ZW50cygpKShzY29wZSk7XG4gICAgICAgIGlmICh0eXBlICYmIHR5cGUubGluaykge1xuICAgICAgICAgIHR5cGUubGluay5hcHBseSh0aHVzbHksIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY29wZS5vcHRpb25zLmxpbmspIHtcbiAgICAgICAgICBzY29wZS5vcHRpb25zLmxpbmsuYXBwbHkodGh1c2x5LCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB3YXRjaEZvcm1Db250cm9sKCkge1xuICAgICAgICBsZXQgc3RvcFdhdGNoaW5nRmllbGQgPSBhbmd1bGFyLm5vb3A7XG4gICAgICAgIGxldCBzdG9wV2F0Y2hpbmdTaG93RXJyb3IgPSBhbmd1bGFyLm5vb3A7XG4gICAgICAgIGlmIChzY29wZS5vcHRpb25zLm5vRm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmdNb2RlbE5vZGUgPSBlbFswXS5xdWVyeVNlbGVjdG9yKCdbbmctbW9kZWxdJyk7XG4gICAgICAgIGlmIChuZ01vZGVsTm9kZSAmJiBuZ01vZGVsTm9kZS5uYW1lKSB7XG4gICAgICAgICAgd2F0Y2hGaWVsZE5hbWVPckV4aXN0ZW5jZShuZ01vZGVsTm9kZS5uYW1lKTtcbiAgICAgICAgfSBlbHNlIGlmIChzY29wZS5vcHRpb25zLm5vRm9ybUNvbnRyb2wgPT09IGZhbHNlKSB7XG4gICAgICAgICAgd2F0Y2hGb3JGaWVsZE5hbWUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHdhdGNoRm9yRmllbGROYW1lKCkge1xuICAgICAgICAgIGNvbnN0IHN0b3BXYXRjaGluZ0ZpZWxkTmFtZSA9IHNjb3BlLiR3YXRjaCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZ01vZGVsTm9kZSA9IGVsWzBdLnF1ZXJ5U2VsZWN0b3IoJ1tuZy1tb2RlbF0nKTtcbiAgICAgICAgICAgIHJldHVybiBuZ01vZGVsTm9kZSAmJiBuZ01vZGVsTm9kZS5uYW1lO1xuICAgICAgICAgIH0sIG5hbWUgPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgICAgc3RvcFdhdGNoaW5nRmllbGROYW1lKCk7XG4gICAgICAgICAgICAgIHdhdGNoRmllbGROYW1lT3JFeGlzdGVuY2UobmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB3YXRjaEZpZWxkTmFtZU9yRXhpc3RlbmNlKG5hbWUpIHtcbiAgICAgICAgICBjb25zdCBuYW1lRXhwcmVzc2lvblJlZ2V4ID0gL1xce1xceyguKj8pfX0vO1xuICAgICAgICAgIGNvbnN0IG5hbWVFeHByZXNzaW9uID0gbmFtZUV4cHJlc3Npb25SZWdleC5leGVjKG5hbWUpO1xuICAgICAgICAgIGlmIChuYW1lRXhwcmVzc2lvbikge1xuICAgICAgICAgICAgd2F0Y2hGaWVsZE5hbWUobmFtZUV4cHJlc3Npb25bMV0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3YXRjaEZpZWxkRXhpc3RlbmNlKG5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHdhdGNoRmllbGROYW1lKGV4cHJlc3Npb24pIHtcbiAgICAgICAgICBzY29wZS4kd2F0Y2goZXhwcmVzc2lvbiwgZnVuY3Rpb24gb25lRmllbGROYW1lQ2hhbmdlKG5hbWUpIHtcbiAgICAgICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICAgIHN0b3BXYXRjaGluZ0ZpZWxkKCk7XG4gICAgICAgICAgICAgIHdhdGNoRmllbGRFeGlzdGVuY2UobmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB3YXRjaEZpZWxkRXhpc3RlbmNlKG5hbWUpIHtcbiAgICAgICAgICBzdG9wV2F0Y2hpbmdGaWVsZCA9IHNjb3BlLiR3YXRjaChgZm9ybVtcIiR7bmFtZX1cIl1gLCBmdW5jdGlvbiBmb3JtQ29udHJvbENoYW5nZShmb3JtQ29udHJvbCkge1xuICAgICAgICAgICAgaWYgKGZvcm1Db250cm9sKSB7XG4gICAgICAgICAgICAgIHNjb3BlLmZjID0gZm9ybUNvbnRyb2w7IC8vIHNob3J0Y3V0IGZvciB0ZW1wbGF0ZSBhdXRob3JzXG4gICAgICAgICAgICAgIHNjb3BlLm9wdGlvbnMuZm9ybUNvbnRyb2wgPSBmb3JtQ29udHJvbDtcbiAgICAgICAgICAgICAgc3RvcFdhdGNoaW5nU2hvd0Vycm9yKCk7XG4gICAgICAgICAgICAgIGFkZFNob3dNZXNzYWdlc1dhdGNoZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZFNob3dNZXNzYWdlc1dhdGNoZXIoKSB7XG4gICAgICAgICAgc3RvcFdhdGNoaW5nU2hvd0Vycm9yID0gc2NvcGUuJHdhdGNoKGZ1bmN0aW9uIHdhdGNoU2hvd1ZhbGlkYXRpb25DaGFuZ2UoKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNjb3BlLm9wdGlvbnMudmFsaWRhdGlvbi5zaG93ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNjb3BlLmZjLiRpbnZhbGlkICYmIHNjb3BlLm9wdGlvbnMudmFsaWRhdGlvbi5zaG93O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbGV0IG5vVG91Y2hlZEJ1dERpcnR5ID0gKGFuZ3VsYXIuaXNVbmRlZmluZWQoc2NvcGUuZmMuJHRvdWNoZWQpICYmIHNjb3BlLmZjLiRkaXJ0eSk7XG4gICAgICAgICAgICAgIHJldHVybiBzY29wZS5mYy4kaW52YWxpZCAmJiAoc2NvcGUuZmMuJHRvdWNoZWQgfHwgbm9Ub3VjaGVkQnV0RGlydHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGZ1bmN0aW9uIG9uU2hvd1ZhbGlkYXRpb25DaGFuZ2Uoc2hvdykge1xuICAgICAgICAgICAgc2NvcGUub3B0aW9ucy52YWxpZGF0aW9uLmVycm9yRXhpc3RzQW5kU2hvdWxkQmVWaXNpYmxlID0gc2hvdztcbiAgICAgICAgICAgIHNjb3BlLnNob3dFcnJvciA9IHNob3c7IC8vIHNob3J0Y3V0IGZvciB0ZW1wbGF0ZSBhdXRob3JzXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuXG4gICAgICBmdW5jdGlvbiBydW5NYW5pcHVsYXRvcnMobWFuaXB1bGF0b3JzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBydW5NYW5pcHVsYXRvcnNPblRlbXBsYXRlKHRlbXBsYXRlKSB7XG4gICAgICAgICAgdmFyIGNoYWluID0gJHEud2hlbih0ZW1wbGF0ZSk7XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKG1hbmlwdWxhdG9ycywgbWFuaXB1bGF0b3IgPT4ge1xuICAgICAgICAgICAgY2hhaW4gPSBjaGFpbi50aGVuKHRlbXBsYXRlID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4obWFuaXB1bGF0b3IodGVtcGxhdGUsIHNjb3BlLm9wdGlvbnMsIHNjb3BlKSkudGhlbihuZXdUZW1wbGF0ZSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuaXNTdHJpbmcobmV3VGVtcGxhdGUpID8gbmV3VGVtcGxhdGUgOiBhc0h0bWwobmV3VGVtcGxhdGUpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gYXNIdG1sKGVsKSB7XG4gICAgdmFyIHdyYXBwZXIgPSBhbmd1bGFyLmVsZW1lbnQoJzxhPjwvYT4nKTtcbiAgICByZXR1cm4gd3JhcHBlci5hcHBlbmQoZWwpLmh0bWwoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEZpZWxkVGVtcGxhdGUob3B0aW9ucykge1xuICAgIGxldCB0eXBlID0gZm9ybWx5Q29uZmlnLmdldFR5cGUob3B0aW9ucy50eXBlLCB0cnVlLCBvcHRpb25zKTtcbiAgICBsZXQgdGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlIHx8IHR5cGUgJiYgdHlwZS50ZW1wbGF0ZTtcbiAgICBsZXQgdGVtcGxhdGVVcmwgPSBvcHRpb25zLnRlbXBsYXRlVXJsIHx8IHR5cGUgJiYgdHlwZS50ZW1wbGF0ZVVybDtcbiAgICBpZiAoIXRlbXBsYXRlICYmICF0ZW1wbGF0ZVVybCkge1xuICAgICAgdGhyb3cgZm9ybWx5VXNhYmlsaXR5LmdldEZpZWxkRXJyb3IoXG4gICAgICAgICd0eXBlLXR5cGUtaGFzLW5vLXRlbXBsYXRlJyxcbiAgICAgICAgYFR5cGUgJyR7b3B0aW9ucy50eXBlfScgaGFzIG5vdCB0ZW1wbGF0ZS4gT24gZWxlbWVudDpgLCBvcHRpb25zXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBnZXRUZW1wbGF0ZSh0ZW1wbGF0ZSB8fCB0ZW1wbGF0ZVVybCwgIXRlbXBsYXRlLCBvcHRpb25zKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gZ2V0VGVtcGxhdGUodGVtcGxhdGUsIGlzVXJsLCBvcHRpb25zKSB7XG4gICAgbGV0IHRlbXBsYXRlUHJvbWlzZTtcbiAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHRlbXBsYXRlKSkge1xuICAgICAgdGVtcGxhdGVQcm9taXNlID0gJHEud2hlbih0ZW1wbGF0ZShvcHRpb25zKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRlbXBsYXRlUHJvbWlzZSA9ICRxLndoZW4odGVtcGxhdGUpO1xuICAgIH1cblxuICAgIGlmICghaXNVcmwpIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZVByb21pc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBodHRwT3B0aW9ucyA9IHtjYWNoZTogJHRlbXBsYXRlQ2FjaGV9O1xuICAgICAgcmV0dXJuIHRlbXBsYXRlUHJvbWlzZVxuICAgICAgICAudGhlbigodXJsKSA9PiAkaHR0cC5nZXQodXJsLCBodHRwT3B0aW9ucykpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuZGF0YSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIGhhbmRsZUVycm9yR2V0dGluZ0FUZW1wbGF0ZShlcnJvcikge1xuICAgICAgICAgIGZvcm1seVdhcm4oXG4gICAgICAgICAgICAncHJvYmxlbS1sb2FkaW5nLXRlbXBsYXRlLWZvci10ZW1wbGF0ZXVybCcsXG4gICAgICAgICAgICAnUHJvYmxlbSBsb2FkaW5nIHRlbXBsYXRlIGZvciAnICsgdGVtcGxhdGUsXG4gICAgICAgICAgICBlcnJvclxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYW5zY2x1ZGVJbldyYXBwZXJzKG9wdGlvbnMpIHtcbiAgICBsZXQgd3JhcHBlciA9IGdldFdyYXBwZXJPcHRpb24ob3B0aW9ucyk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gdHJhbnNjbHVkZVRlbXBsYXRlKHRlbXBsYXRlKSB7XG4gICAgICBpZiAoIXdyYXBwZXIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiAkcS53aGVuKHRlbXBsYXRlKTtcbiAgICAgIH1cblxuICAgICAgd3JhcHBlci5mb3JFYWNoKCh3cmFwcGVyKSA9PiB7XG4gICAgICAgIGZvcm1seVVzYWJpbGl0eS5jaGVja1dyYXBwZXIod3JhcHBlciwgb3B0aW9ucyk7XG4gICAgICAgIHdyYXBwZXIudmFsaWRhdGVPcHRpb25zICYmIHdyYXBwZXIudmFsaWRhdGVPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICBydW5BcGlDaGVjayh3cmFwcGVyLCBvcHRpb25zKTtcbiAgICAgIH0pO1xuICAgICAgbGV0IHByb21pc2VzID0gd3JhcHBlci5tYXAodyA9PiBnZXRUZW1wbGF0ZSh3LnRlbXBsYXRlIHx8IHcudGVtcGxhdGVVcmwsICF3LnRlbXBsYXRlKSk7XG4gICAgICByZXR1cm4gJHEuYWxsKHByb21pc2VzKS50aGVuKHdyYXBwZXJzVGVtcGxhdGVzID0+IHtcbiAgICAgICAgd3JhcHBlcnNUZW1wbGF0ZXMuZm9yRWFjaCgod3JhcHBlclRlbXBsYXRlLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGZvcm1seVVzYWJpbGl0eS5jaGVja1dyYXBwZXJUZW1wbGF0ZSh3cmFwcGVyVGVtcGxhdGUsIHdyYXBwZXJbaW5kZXhdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHdyYXBwZXJzVGVtcGxhdGVzLnJldmVyc2UoKTsgLy8gd3JhcHBlciAwIGlzIHdyYXBwZWQgaW4gd3JhcHBlciAxIGFuZCBzbyBvbi4uLlxuICAgICAgICBsZXQgdG90YWxXcmFwcGVyID0gd3JhcHBlcnNUZW1wbGF0ZXMuc2hpZnQoKTtcbiAgICAgICAgd3JhcHBlcnNUZW1wbGF0ZXMuZm9yRWFjaCh3cmFwcGVyVGVtcGxhdGUgPT4ge1xuICAgICAgICAgIHRvdGFsV3JhcHBlciA9IGRvVHJhbnNjbHVzaW9uKHRvdGFsV3JhcHBlciwgd3JhcHBlclRlbXBsYXRlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkb1RyYW5zY2x1c2lvbih0b3RhbFdyYXBwZXIsIHRlbXBsYXRlKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBkb1RyYW5zY2x1c2lvbih3cmFwcGVyLCB0ZW1wbGF0ZSkge1xuICAgIGxldCBzdXBlcldyYXBwZXIgPSBhbmd1bGFyLmVsZW1lbnQoJzxhPjwvYT4nKTsgLy8gdGhpcyBhbGxvd3MgcGVvcGxlIG5vdCBoYXZlIHRvIGhhdmUgYSBzaW5nbGUgcm9vdCBpbiB3cmFwcGVyc1xuICAgIHN1cGVyV3JhcHBlci5hcHBlbmQod3JhcHBlcik7XG4gICAgbGV0IHRyYW5zY2x1ZGVFbCA9IHN1cGVyV3JhcHBlci5maW5kKCdmb3JtbHktdHJhbnNjbHVkZScpO1xuICAgIGlmICghdHJhbnNjbHVkZUVsLmxlbmd0aCkge1xuICAgICAgLy90cnkgaXQgdXNpbmcgb3VyIGN1c3RvbSBmaW5kIGZ1bmN0aW9uXG4gICAgICB0cmFuc2NsdWRlRWwgPSBmb3JtbHlVdGlsLmZpbmRCeU5vZGVOYW1lKHN1cGVyV3JhcHBlciwgJ2Zvcm1seS10cmFuc2NsdWRlJyk7XG4gICAgfVxuICAgIHRyYW5zY2x1ZGVFbC5yZXBsYWNlV2l0aCh0ZW1wbGF0ZSk7XG4gICAgcmV0dXJuIHN1cGVyV3JhcHBlci5odG1sKCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRXcmFwcGVyT3B0aW9uKG9wdGlvbnMpIHtcbiAgICBsZXQgd3JhcHBlciA9IG9wdGlvbnMud3JhcHBlcjtcbiAgICAvLyBleHBsaWNpdCBudWxsIG1lYW5zIG5vIHdyYXBwZXJcbiAgICBpZiAod3JhcHBlciA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIC8vIG5vdGhpbmcgc3BlY2lmaWVkIG1lYW5zIHVzZSB0aGUgZGVmYXVsdCB3cmFwcGVyIGZvciB0aGUgdHlwZVxuICAgIGlmICghd3JhcHBlcikge1xuICAgICAgLy8gZ2V0IGFsbCB3cmFwcGVycyB0aGF0IHNwZWNpZnkgdGhleSBhcHBseSB0byB0aGlzIHR5cGVcbiAgICAgIHdyYXBwZXIgPSBhcnJheWlmeShmb3JtbHlDb25maWcuZ2V0V3JhcHBlckJ5VHlwZShvcHRpb25zLnR5cGUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd3JhcHBlciA9IGFycmF5aWZ5KHdyYXBwZXIpLm1hcChmb3JtbHlDb25maWcuZ2V0V3JhcHBlcik7XG4gICAgfVxuXG4gICAgLy8gZ2V0IGFsbCB3cmFwcGVycyBmb3IgdGhhdCB0aGlzIHR5cGUgc3BlY2lmaWVkIHRoYXQgaXQgdXNlcy5cbiAgICB2YXIgdHlwZSA9IGZvcm1seUNvbmZpZy5nZXRUeXBlKG9wdGlvbnMudHlwZSwgdHJ1ZSwgb3B0aW9ucyk7XG4gICAgaWYgKHR5cGUgJiYgdHlwZS53cmFwcGVyKSB7XG4gICAgICBsZXQgdHlwZVdyYXBwZXJzID0gYXJyYXlpZnkodHlwZS53cmFwcGVyKS5tYXAoZm9ybWx5Q29uZmlnLmdldFdyYXBwZXIpO1xuICAgICAgd3JhcHBlciA9IHdyYXBwZXIuY29uY2F0KHR5cGVXcmFwcGVycyk7XG4gICAgfVxuXG4gICAgLy8gYWRkIHRoZSBkZWZhdWx0IHdyYXBwZXIgbGFzdFxuICAgIHZhciBkZWZhdWx0V3JhcHBlciA9IGZvcm1seUNvbmZpZy5nZXRXcmFwcGVyKCk7XG4gICAgaWYgKGRlZmF1bHRXcmFwcGVyKSB7XG4gICAgICB3cmFwcGVyLnB1c2goZGVmYXVsdFdyYXBwZXIpO1xuICAgIH1cbiAgICByZXR1cm4gd3JhcHBlcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrQXBpKG9wdGlvbnMpIHtcbiAgICBmb3JtbHlBcGlDaGVjay50aHJvdyhmb3JtbHlBcGlDaGVjay5mb3JtbHlGaWVsZE9wdGlvbnMsIG9wdGlvbnMsIHtcbiAgICAgIHByZWZpeDogJ2Zvcm1seS1maWVsZCBkaXJlY3RpdmUnLFxuICAgICAgdXJsOiAnZm9ybWx5LWZpZWxkLWRpcmVjdGl2ZS12YWxpZGF0aW9uLWZhaWxlZCdcbiAgICB9KTtcbiAgICAvLyB2YWxpZGF0ZSB3aXRoIHRoZSB0eXBlXG4gICAgY29uc3QgdHlwZSA9IG9wdGlvbnMudHlwZSAmJiBmb3JtbHlDb25maWcuZ2V0VHlwZShvcHRpb25zLnR5cGUpO1xuICAgIGlmICh0eXBlKSB7XG4gICAgICBpZiAodHlwZS52YWxpZGF0ZU9wdGlvbnMpIHtcbiAgICAgICAgdHlwZS52YWxpZGF0ZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICB9XG4gICAgICBydW5BcGlDaGVjayh0eXBlLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBydW5BcGlDaGVjayh7YXBpQ2hlY2ssIGFwaUNoZWNrSW5zdGFuY2UsIGFwaUNoZWNrRnVuY3Rpb24sIGFwaUNoZWNrT3B0aW9uc30sIG9wdGlvbnMpIHtcbiAgICBpZiAoIWFwaUNoZWNrKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGluc3RhbmNlID0gYXBpQ2hlY2tJbnN0YW5jZSB8fCBmb3JtbHlBcGlDaGVjaztcbiAgICBjb25zdCBmbiA9IGFwaUNoZWNrRnVuY3Rpb24gfHwgJ3dhcm4nO1xuICAgIGNvbnN0IHNoYXBlID0gaW5zdGFuY2Uuc2hhcGUoYXBpQ2hlY2spO1xuICAgIGluc3RhbmNlW2ZuXShzaGFwZSwgb3B0aW9ucywgYXBpQ2hlY2tPcHRpb25zIHx8IHtcbiAgICAgICAgcHJlZml4OiBgZm9ybWx5LWZpZWxkICR7bmFtZX1gLFxuICAgICAgICB1cmw6IGZvcm1seUFwaUNoZWNrLmNvbmZpZy5vdXRwdXQuZG9jc0Jhc2VVcmwgKyAnZm9ybWx5LWZpZWxkLXR5cGUtYXBpY2hlY2stZmFpbGVkJ1xuICAgICAgfSk7XG4gIH1cblxufVxuXG5mdW5jdGlvbiBhcnJheWlmeShvYmopIHtcbiAgaWYgKG9iaiAmJiAhYW5ndWxhci5pc0FycmF5KG9iaikpIHtcbiAgICBvYmogPSBbb2JqXTtcbiAgfSBlbHNlIGlmICghb2JqKSB7XG4gICAgb2JqID0gW107XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2RpcmVjdGl2ZXMvZm9ybWx5LWZpZWxkLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZm9ybWx5Rm9jdXM7XG5cbi8vIEBuZ0luamVjdFxuZnVuY3Rpb24gZm9ybWx5Rm9jdXMoJHRpbWVvdXQsICRkb2N1bWVudCkge1xuICAvKiBqc2hpbnQgLVcwNTIgKi9cbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIGxpbms6IGZ1bmN0aW9uIGZvcm1seUZvY3VzTGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgIHZhciBwcmV2aW91c0VsID0gbnVsbDtcbiAgICAgIHZhciBlbCA9IGVsZW1lbnRbMF07XG4gICAgICB2YXIgZG9jID0gJGRvY3VtZW50WzBdO1xuICAgICAgYXR0cnMuJG9ic2VydmUoJ2Zvcm1seUZvY3VzJywgZnVuY3Rpb24gcmVzcG9uZFRvRm9jdXNFeHByZXNzaW9uQ2hhbmdlKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gc2V0RWxlbWVudEZvY3VzKCkge1xuICAgICAgICAgICAgcHJldmlvdXNFbCA9IGRvYy5hY3RpdmVFbGVtZW50O1xuICAgICAgICAgICAgZWwuZm9jdXMoKTtcbiAgICAgICAgICB9LCB+fmF0dHJzLmZvY3VzV2FpdCk7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09ICdmYWxzZScpIHtcbiAgICAgICAgICBpZiAoZG9jLmFjdGl2ZUVsZW1lbnQgPT09IGVsKSB7XG4gICAgICAgICAgICBlbC5ibHVyKCk7XG4gICAgICAgICAgICBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkoJ3JlZm9jdXMnKSAmJiBwcmV2aW91c0VsKSB7XG4gICAgICAgICAgICAgIHByZXZpb3VzRWwuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2RpcmVjdGl2ZXMvZm9ybWx5LWZvY3VzLmpzXG4gKiovIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhci1maXgnO1xuXG5leHBvcnQgZGVmYXVsdCBmb3JtbHlGb3JtO1xuXG4vKipcbiAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAqIEBuYW1lIGZvcm1seUZvcm1cbiAqIEByZXN0cmljdCBFXG4gKi9cbi8vIEBuZ0luamVjdFxuZnVuY3Rpb24gZm9ybWx5Rm9ybShmb3JtbHlVc2FiaWxpdHksICRwYXJzZSwgZm9ybWx5QXBpQ2hlY2ssIGZvcm1seUNvbmZpZykge1xuICB2YXIgY3VycmVudEZvcm1JZCA9IDE7XG4gIHZhciBvcHRpb25zQXBpID0gW1xuICAgIGZvcm1seUFwaUNoZWNrLnNoYXBlKHtcbiAgICAgIGZvcm1TdGF0ZTogZm9ybWx5QXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICAgICAgcmVzZXRNb2RlbDogZm9ybWx5QXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgICAgIHVwZGF0ZUluaXRpYWxWYWx1ZTogZm9ybWx5QXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgICAgIHJlbW92ZUNocm9tZUF1dG9Db21wbGV0ZTogZm9ybWx5QXBpQ2hlY2suYm9vbC5vcHRpb25hbFxuICAgIH0pLnN0cmljdC5vcHRpb25hbFxuICBdO1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgdGVtcGxhdGU6IGZ1bmN0aW9uIGZvcm1seUZvcm1HZXRUZW1wbGF0ZShlbCwgYXR0cnMpIHtcbiAgICAgIC8qIGpzaGludCAtVzAzMyAqLyAvLyB0aGlzIGJlY2F1c2UganNoaW50IGlzIGJyb2tlbiBJIGd1ZXNzLi4uXG4gICAgICBjb25zdCByb290RWwgPSBnZXRSb290RWwoKTtcbiAgICAgIGNvbnN0IGZvcm1JZCA9IGBmb3JtbHlfJHtjdXJyZW50Rm9ybUlkKyt9YDtcbiAgICAgIHJldHVybiBgXG4gICAgICAgIDwke3Jvb3RFbH0gY2xhc3M9XCJmb3JtbHlcIlxuICAgICAgICAgICAgICAgICBuYW1lPVwiJHtnZXRGb3JtTmFtZSgpfVwiXG4gICAgICAgICAgICAgICAgIHJvbGU9XCJmb3JtXCI+XG4gICAgICAgICAgPGRpdiBmb3JtbHktZmllbGRcbiAgICAgICAgICAgICAgIG5nLXJlcGVhdD1cImZpZWxkIGluIGZpZWxkcyAke2dldFRyYWNrQnkoKX1cIlxuICAgICAgICAgICAgICAgJHtnZXRIaWRlRGlyZWN0aXZlKCl9PVwiIWZpZWxkLmhpZGVcIlxuICAgICAgICAgICAgICAgY2xhc3M9XCJmb3JtbHktZmllbGQge3tmaWVsZC50eXBlID8gJ2Zvcm1seS1maWVsZC0nICsgZmllbGQudHlwZSA6ICcnfX1cIlxuICAgICAgICAgICAgICAgb3B0aW9ucz1cImZpZWxkXCJcbiAgICAgICAgICAgICAgIG1vZGVsPVwiZmllbGQubW9kZWwgfHwgbW9kZWxcIlxuICAgICAgICAgICAgICAgZmllbGRzPVwiZmllbGRzXCJcbiAgICAgICAgICAgICAgIGZvcm09XCIke2Zvcm1JZH1cIlxuICAgICAgICAgICAgICAgZm9ybS1pZD1cIiR7Zm9ybUlkfVwiXG4gICAgICAgICAgICAgICBmb3JtLXN0YXRlPVwib3B0aW9ucy5mb3JtU3RhdGVcIlxuICAgICAgICAgICAgICAgaW5kZXg9XCIkaW5kZXhcIj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IG5nLXRyYW5zY2x1ZGU+PC9kaXY+XG4gICAgICAgIDwvJHtyb290RWx9PlxuICAgICAgYDtcblxuICAgICAgZnVuY3Rpb24gZ2V0Um9vdEVsKCkge1xuICAgICAgICByZXR1cm4gYXR0cnMucm9vdEVsIHx8ICduZy1mb3JtJztcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZ2V0SGlkZURpcmVjdGl2ZSgpIHtcbiAgICAgICAgcmV0dXJuIGF0dHJzLmhpZGVEaXJlY3RpdmUgfHwgZm9ybWx5Q29uZmlnLmV4dHJhcy5kZWZhdWx0SGlkZURpcmVjdGl2ZSB8fCAnbmctaWYnO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRUcmFja0J5KCkge1xuICAgICAgICBpZiAoIWF0dHJzLnRyYWNrQnkpIHtcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGB0cmFjayBieSAke2F0dHJzLnRyYWNrQnl9YDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRGb3JtTmFtZSgpIHtcbiAgICAgICAgbGV0IGZvcm1OYW1lID0gZm9ybUlkO1xuICAgICAgICBjb25zdCBiaW5kTmFtZSA9IGF0dHJzLmJpbmROYW1lO1xuICAgICAgICBpZiAoYmluZE5hbWUpIHtcbiAgICAgICAgICBpZiAoYW5ndWxhci52ZXJzaW9uLm1pbm9yIDwgMykge1xuICAgICAgICAgICAgdGhyb3cgZm9ybWx5VXNhYmlsaXR5LmdldEZvcm1seUVycm9yKCdiaW5kLW5hbWUgYXR0cmlidXRlIG9uIGZvcm1seS1mb3JtIG5vdCBhbGxvd2VkIGluID4gYW5ndWxhciAxLjMnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9ybU5hbWUgPSBge3s6Oidmb3JtbHlfJyArICR7YmluZE5hbWV9fX1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtTmFtZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlcGxhY2U6IHRydWUsXG4gICAgdHJhbnNjbHVkZTogdHJ1ZSxcbiAgICBzY29wZToge1xuICAgICAgZmllbGRzOiAnPScsXG4gICAgICBtb2RlbDogJz0nLFxuICAgICAgZm9ybTogJz0/JyxcbiAgICAgIG9wdGlvbnM6ICc9PydcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6IC8qIEBuZ0luamVjdCAqLyBmdW5jdGlvbiBGb3JtbHlGb3JtQ29udHJvbGxlcigkc2NvcGUpIHtcbiAgICAgIHNldHVwT3B0aW9ucygpO1xuICAgICAgJHNjb3BlLm1vZGVsID0gJHNjb3BlLm1vZGVsIHx8IHt9O1xuICAgICAgJHNjb3BlLmZpZWxkcyA9ICRzY29wZS5maWVsZHMgfHwgW107XG5cbiAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZmllbGRzLCBhdHRhY2hLZXkpOyAvLyBhdHRhY2hlcyBhIGtleSBiYXNlZCBvbiB0aGUgaW5kZXggaWYgYSBrZXkgaXNuJ3Qgc3BlY2lmaWVkXG4gICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgc2V0dXBXYXRjaGVycyk7IC8vIHNldHVwIHdhdGNoZXJzIGZvciBhbGwgZmllbGRzXG5cbiAgICAgIC8vIHdhdGNoIHRoZSBtb2RlbCBhbmQgZXZhbHVhdGUgd2F0Y2ggZXhwcmVzc2lvbnMgdGhhdCBkZXBlbmQgb24gaXQuXG4gICAgICAkc2NvcGUuJHdhdGNoKCdtb2RlbCcsIGZ1bmN0aW9uIG9uUmVzdWx0VXBkYXRlKG5ld1Jlc3VsdCkge1xuICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgZnVuY3Rpb24gcnVuRmllbGRFeHByZXNzaW9uUHJvcGVydGllcyhmaWVsZCkge1xuICAgICAgICAgIC8qanNoaW50IC1XMDMwICovXG4gICAgICAgICAgZmllbGQucnVuRXhwcmVzc2lvbnMgJiYgZmllbGQucnVuRXhwcmVzc2lvbnMobmV3UmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgICB9LCB0cnVlKTtcblxuICAgICAgZnVuY3Rpb24gc2V0dXBPcHRpb25zKCkge1xuICAgICAgICBmb3JtbHlBcGlDaGVjay50aHJvdyhvcHRpb25zQXBpLCBbJHNjb3BlLm9wdGlvbnNdLCB7cHJlZml4OiAnZm9ybWx5LWZvcm0gb3B0aW9ucyBjaGVjayd9KTtcbiAgICAgICAgJHNjb3BlLm9wdGlvbnMgPSAkc2NvcGUub3B0aW9ucyB8fCB7fTtcbiAgICAgICAgJHNjb3BlLm9wdGlvbnMuZm9ybVN0YXRlID0gJHNjb3BlLm9wdGlvbnMuZm9ybVN0YXRlIHx8IHt9O1xuXG4gICAgICAgIGFuZ3VsYXIuZXh0ZW5kKCRzY29wZS5vcHRpb25zLCB7XG4gICAgICAgICAgdXBkYXRlSW5pdGlhbFZhbHVlLFxuICAgICAgICAgIHJlc2V0TW9kZWxcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdXBkYXRlSW5pdGlhbFZhbHVlKCkge1xuICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgZmllbGQgPT4gZmllbGQudXBkYXRlSW5pdGlhbFZhbHVlKCkpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiByZXNldE1vZGVsKCkge1xuICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgZmllbGQgPT4gZmllbGQucmVzZXRNb2RlbCgpKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYXR0YWNoS2V5KGZpZWxkLCBpbmRleCkge1xuICAgICAgICBmaWVsZC5rZXkgPSBmaWVsZC5rZXkgfHwgaW5kZXggfHwgMDtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2V0dXBXYXRjaGVycyhmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChmaWVsZC53YXRjaGVyKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgd2F0Y2hlcnMgPSBmaWVsZC53YXRjaGVyO1xuICAgICAgICBpZiAoIWFuZ3VsYXIuaXNBcnJheSh3YXRjaGVycykpIHtcbiAgICAgICAgICB3YXRjaGVycyA9IFt3YXRjaGVyc107XG4gICAgICAgIH1cbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHdhdGNoZXJzLCBmdW5jdGlvbiBzZXR1cFdhdGNoZXIod2F0Y2hlcikge1xuICAgICAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQod2F0Y2hlci5saXN0ZW5lcikpIHtcbiAgICAgICAgICAgIHRocm93IGZvcm1seVVzYWJpbGl0eS5nZXRGaWVsZEVycm9yKFxuICAgICAgICAgICAgICAnYWxsLWZpZWxkLXdhdGNoZXJzLW11c3QtaGF2ZS1hLWxpc3RlbmVyJyxcbiAgICAgICAgICAgICAgJ0FsbCBmaWVsZCB3YXRjaGVycyBtdXN0IGhhdmUgYSBsaXN0ZW5lcicsIGZpZWxkXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgd2F0Y2hFeHByZXNzaW9uID0gZ2V0V2F0Y2hFeHByZXNzaW9uKHdhdGNoZXIsIGZpZWxkLCBpbmRleCk7XG4gICAgICAgICAgdmFyIHdhdGNoTGlzdGVuZXIgPSBnZXRXYXRjaExpc3RlbmVyKHdhdGNoZXIsIGZpZWxkLCBpbmRleCk7XG5cbiAgICAgICAgICB2YXIgdHlwZSA9IHdhdGNoZXIudHlwZSB8fCAnJHdhdGNoJztcbiAgICAgICAgICB3YXRjaGVyLnN0b3BXYXRjaGluZyA9ICRzY29wZVt0eXBlXSh3YXRjaEV4cHJlc3Npb24sIHdhdGNoTGlzdGVuZXIsIHdhdGNoZXIud2F0Y2hEZWVwKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGdldFdhdGNoRXhwcmVzc2lvbih3YXRjaGVyLCBmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgdmFyIHdhdGNoRXhwcmVzc2lvbiA9IHdhdGNoZXIuZXhwcmVzc2lvbiB8fCBgbW9kZWxbJyR7ZmllbGQua2V5fSddYDtcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih3YXRjaEV4cHJlc3Npb24pKSB7XG4gICAgICAgICAgLy8gd3JhcCB0aGUgZmllbGQncyB3YXRjaCBleHByZXNzaW9uIHNvIHdlIGNhbiBjYWxsIGl0IHdpdGggdGhlIGZpZWxkIGFzIHRoZSBmaXJzdCBhcmdcbiAgICAgICAgICAvLyBhbmQgdGhlIHN0b3AgZnVuY3Rpb24gYXMgdGhlIGxhc3QgYXJnIGFzIGEgaGVscGVyXG4gICAgICAgICAgdmFyIG9yaWdpbmFsRXhwcmVzc2lvbiA9IHdhdGNoRXhwcmVzc2lvbjtcbiAgICAgICAgICB3YXRjaEV4cHJlc3Npb24gPSBmdW5jdGlvbiBmb3JtbHlXYXRjaEV4cHJlc3Npb24oKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IG1vZGlmeUFyZ3Mod2F0Y2hlciwgaW5kZXgsIC4uLmFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZXR1cm4gb3JpZ2luYWxFeHByZXNzaW9uKC4uLmFyZ3MpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgd2F0Y2hFeHByZXNzaW9uLmRpc3BsYXlOYW1lID0gYEZvcm1seSBXYXRjaCBFeHByZXNzaW9uIGZvciBmaWVsZCBmb3IgJHtmaWVsZC5rZXl9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gd2F0Y2hFeHByZXNzaW9uO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRXYXRjaExpc3RlbmVyKHdhdGNoZXIsIGZpZWxkLCBpbmRleCkge1xuICAgICAgICB2YXIgd2F0Y2hMaXN0ZW5lciA9IHdhdGNoZXIubGlzdGVuZXI7XG4gICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24od2F0Y2hMaXN0ZW5lcikpIHtcbiAgICAgICAgICAvLyB3cmFwIHRoZSBmaWVsZCdzIHdhdGNoIGxpc3RlbmVyIHNvIHdlIGNhbiBjYWxsIGl0IHdpdGggdGhlIGZpZWxkIGFzIHRoZSBmaXJzdCBhcmdcbiAgICAgICAgICAvLyBhbmQgdGhlIHN0b3AgZnVuY3Rpb24gYXMgdGhlIGxhc3QgYXJnIGFzIGEgaGVscGVyXG4gICAgICAgICAgdmFyIG9yaWdpbmFsTGlzdGVuZXIgPSB3YXRjaExpc3RlbmVyO1xuICAgICAgICAgIHdhdGNoTGlzdGVuZXIgPSBmdW5jdGlvbiBmb3JtbHlXYXRjaExpc3RlbmVyKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBtb2RpZnlBcmdzKHdhdGNoZXIsIGluZGV4LCAuLi5hcmd1bWVudHMpO1xuICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsTGlzdGVuZXIoLi4uYXJncyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB3YXRjaExpc3RlbmVyLmRpc3BsYXlOYW1lID0gYEZvcm1seSBXYXRjaCBMaXN0ZW5lciBmb3IgZmllbGQgZm9yICR7ZmllbGQua2V5fWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdhdGNoTGlzdGVuZXI7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG1vZGlmeUFyZ3Mod2F0Y2hlciwgaW5kZXgsIC4uLm9yaWdpbmFsQXJncykge1xuICAgICAgICByZXR1cm4gWyRzY29wZS5maWVsZHNbaW5kZXhdLCAuLi5vcmlnaW5hbEFyZ3MsIHdhdGNoZXIuc3RvcFdhdGNoaW5nXTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGxpbmsoc2NvcGUsIGVsLCBhdHRycykge1xuICAgICAgaWYgKGF0dHJzLmZvcm0pIHtcbiAgICAgICAgY29uc3QgZm9ybUlkID0gYXR0cnMubmFtZTtcbiAgICAgICAgJHBhcnNlKGF0dHJzLmZvcm0pLmFzc2lnbihzY29wZS4kcGFyZW50LCBzY29wZVtmb3JtSWRdKTtcbiAgICAgIH1cblxuICAgICAgLy8gY2hyb21lIGF1dG9jb21wbGV0ZSBsYW1lbmVzc1xuICAgICAgLy8gc2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjgxNTMjYzE0XG4gICAgICAvLyDhg5oo4LKg55uK4LKg4YOaKSAgICjila/CsOKWocKwKeKVr++4tSDilLvilIHilLsgICAgKOKXnuKAuOKXn++8mylcbiAgICAgIGNvbnN0IGdsb2JhbCA9IGZvcm1seUNvbmZpZy5leHRyYXMucmVtb3ZlQ2hyb21lQXV0b0NvbXBsZXRlID09PSB0cnVlO1xuICAgICAgY29uc3Qgb2ZmSW5zdGFuY2UgPSBzY29wZS5vcHRpb25zICYmIHNjb3BlLm9wdGlvbnMucmVtb3ZlQ2hyb21lQXV0b0NvbXBsZXRlID09PSBmYWxzZTtcbiAgICAgIGNvbnN0IG9uSW5zdGFuY2UgPSBzY29wZS5vcHRpb25zICYmIHNjb3BlLm9wdGlvbnMucmVtb3ZlQ2hyb21lQXV0b0NvbXBsZXRlID09PSB0cnVlO1xuICAgICAgaWYgKChnbG9iYWwgJiYgIW9mZkluc3RhbmNlKSB8fCBvbkluc3RhbmNlKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdhdXRvY29tcGxldGUnLCAnYWRkcmVzcy1sZXZlbDQnKTtcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCB0cnVlKTtcbiAgICAgICAgZWxbMF0uYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2RpcmVjdGl2ZXMvZm9ybWx5LWZvcm0uanNcbiAqKi8iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyLWZpeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGFkZEZvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yO1xuXG4vLyBAbmdJbmplY3RcbmZ1bmN0aW9uIGFkZEZvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKGZvcm1seUNvbmZpZykge1xuICBpZiAoZm9ybWx5Q29uZmlnLmV4dHJhcy5kaXNhYmxlTmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZm9ybWx5Q29uZmlnLnRlbXBsYXRlTWFuaXB1bGF0b3JzLnByZVdyYXBwZXIucHVzaChuZ01vZGVsQXR0cnNNYW5pcHVsYXRvcik7XG5cblxuICBmdW5jdGlvbiBuZ01vZGVsQXR0cnNNYW5pcHVsYXRvcih0ZW1wbGF0ZSwgb3B0aW9ucywgc2NvcGUpIHtcbiAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo2ICovXG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmFyIGRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgaWYgKGRhdGEuc2tpcE5nTW9kZWxBdHRyc01hbmlwdWxhdG9yID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgfVxuICAgIGVsLmlubmVySFRNTCA9IHRlbXBsYXRlO1xuICAgIHZhciBtb2RlbE5vZGVzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnW25nLW1vZGVsXScpO1xuICAgIGlmICghbW9kZWxOb2RlcyB8fCAhbW9kZWxOb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICB9XG5cbiAgICBhZGRJZk5vdFByZXNlbnQobW9kZWxOb2RlcywgJ2lkJywgc2NvcGUuaWQpO1xuICAgIGFkZElmTm90UHJlc2VudChtb2RlbE5vZGVzLCAnbmFtZScsIHNjb3BlLmlkKTtcblxuICAgIGFkZFZhbGlkYXRpb24oKTtcbiAgICBhZGRNb2RlbE9wdGlvbnMoKTtcbiAgICBhZGRUZW1wbGF0ZU9wdGlvbnNBdHRycygpO1xuXG5cbiAgICByZXR1cm4gZWwuaW5uZXJIVE1MO1xuXG5cbiAgICBmdW5jdGlvbiBhZGRWYWxpZGF0aW9uKCkge1xuICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMudmFsaWRhdG9ycykgfHwgYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy52YWxpZGF0aW9uLm1lc3NhZ2VzKSkge1xuICAgICAgICBhZGRJZk5vdFByZXNlbnQobW9kZWxOb2RlcywgJ2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvbicsICcnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRNb2RlbE9wdGlvbnMoKSB7XG4gICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy5tb2RlbE9wdGlvbnMpKSB7XG4gICAgICAgIGFkZElmTm90UHJlc2VudChtb2RlbE5vZGVzLCAnbmctbW9kZWwtb3B0aW9ucycsICdvcHRpb25zLm1vZGVsT3B0aW9ucycpO1xuICAgICAgICBpZiAob3B0aW9ucy5tb2RlbE9wdGlvbnMuZ2V0dGVyU2V0dGVyKSB7XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKG1vZGVsTm9kZXMsIG5vZGUgPT4ge1xuICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ25nLW1vZGVsJywgJ29wdGlvbnMudmFsdWUnKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFRlbXBsYXRlT3B0aW9uc0F0dHJzKCkge1xuICAgICAgaWYgKCFvcHRpb25zLnRlbXBsYXRlT3B0aW9ucyAmJiAhb3B0aW9ucy5leHByZXNzaW9uUHJvcGVydGllcykge1xuICAgICAgICAvLyBubyBuZWVkIHRvIHJ1biB0aGVzZSBpZiB0aGVyZSBhcmUgbm8gdGVtcGxhdGVPcHRpb25zIG9yIGV4cHJlc3Npb25Qcm9wZXJ0aWVzXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRvID0gb3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnMgfHwge307XG4gICAgICBjb25zdCBlcCA9IG9wdGlvbnMuZXhwcmVzc2lvblByb3BlcnRpZXMgfHwge307XG5cbiAgICAgIGxldCBuZ01vZGVsQXR0cmlidXRlcyA9IGdldEJ1aWx0SW5BdHRyaWJ1dGVzKCk7XG5cbiAgICAgIC8vIGV4dGVuZCB3aXRoIHRoZSB1c2VyJ3Mgc3BlY2lmaWNhdGlvbnMgd2lubmluZ1xuICAgICAgYW5ndWxhci5leHRlbmQobmdNb2RlbEF0dHJpYnV0ZXMsIG9wdGlvbnMubmdNb2RlbEF0dHJzKTtcblxuICAgICAgLy8gRmVlbCBmcmVlIHRvIG1ha2UgdGhpcyBtb3JlIHNpbXBsZSA6LSlcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChuZ01vZGVsQXR0cmlidXRlcywgKHZhbCwgbmFtZSkgPT4ge1xuICAgICAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eToxNCAqL1xuICAgICAgICBsZXQgYXR0clZhbDtcbiAgICAgICAgbGV0IGF0dHJOYW1lO1xuICAgICAgICBjb25zdCByZWYgPSBgb3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnNbJyR7bmFtZX0nXWA7XG4gICAgICAgIGNvbnN0IHRvVmFsID0gdG9bbmFtZV07XG4gICAgICAgIGNvbnN0IGVwVmFsID0gZ2V0RXBWYWx1ZShlcCwgbmFtZSk7XG5cbiAgICAgICAgY29uc3QgaW5UbyA9IGFuZ3VsYXIuaXNEZWZpbmVkKHRvVmFsKTtcbiAgICAgICAgY29uc3QgaW5FcCA9IGFuZ3VsYXIuaXNEZWZpbmVkKGVwVmFsKTtcbiAgICAgICAgaWYgKHZhbC52YWx1ZSkge1xuICAgICAgICAgIC8vIEkgcmVhbGl6ZSB0aGlzIGxvb2tzIGJhY2t3YXJkcywgYnV0IGl0J3MgcmlnaHQsIHRydXN0IG1lLi4uXG4gICAgICAgICAgYXR0ck5hbWUgPSB2YWwudmFsdWU7XG4gICAgICAgICAgYXR0clZhbCA9IG5hbWU7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsLmV4cHJlc3Npb24gJiYgaW5Ubykge1xuICAgICAgICAgIGF0dHJOYW1lID0gdmFsLmV4cHJlc3Npb247XG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcodG9bbmFtZV0pKSB7XG4gICAgICAgICAgICBhdHRyVmFsID0gYCRldmFsKCR7cmVmfSlgO1xuICAgICAgICAgIH0gZWxzZSBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHRvW25hbWVdKSkge1xuICAgICAgICAgICAgYXR0clZhbCA9IGAke3JlZn0obW9kZWxbb3B0aW9ucy5rZXldLCBvcHRpb25zLCB0aGlzLCAkZXZlbnQpYDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgb3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnMuJHtuYW1lfSBtdXN0IGJlIGEgc3RyaW5nIG9yIGZ1bmN0aW9uOiAke0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHZhbC5ib3VuZCAmJiBpbkVwKSB7XG4gICAgICAgICAgYXR0ck5hbWUgPSB2YWwuYm91bmQ7XG4gICAgICAgICAgYXR0clZhbCA9IHJlZjtcbiAgICAgICAgfSBlbHNlIGlmICgodmFsLmF0dHJpYnV0ZSB8fCB2YWwuYm9vbGVhbikgJiYgaW5FcCkge1xuICAgICAgICAgIGF0dHJOYW1lID0gdmFsLmF0dHJpYnV0ZSB8fCB2YWwuYm9vbGVhbjtcbiAgICAgICAgICBhdHRyVmFsID0gYHt7JHtyZWZ9fX1gO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbC5hdHRyaWJ1dGUgJiYgaW5Ubykge1xuICAgICAgICAgIGF0dHJOYW1lID0gdmFsLmF0dHJpYnV0ZTtcbiAgICAgICAgICBhdHRyVmFsID0gdG9WYWw7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsLmJvb2xlYW4pIHtcbiAgICAgICAgICBpZiAoaW5UbyAmJiAhaW5FcCAmJiB0b1ZhbCkge1xuICAgICAgICAgICAgYXR0ck5hbWUgPSB2YWwuYm9vbGVhbjtcbiAgICAgICAgICAgIGF0dHJWYWwgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBqc2hpbnQgLVcwMzVcbiAgICAgICAgICAgIC8vIGVtcHR5IHRvIGlsbHVzdHJhdGUgdGhhdCBhIGJvb2xlYW4gd2lsbCBub3QgYmUgYWRkZWQgdmlhIHZhbC5ib3VuZFxuICAgICAgICAgICAgLy8gaWYgeW91IHdhbnQgaXQgYWRkZWQgdmlhIHZhbC5ib3VuZCwgdGhlbiBwdXQgaXQgaW4gZXhwcmVzc2lvblByb3BlcnRpZXNcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodmFsLmJvdW5kICYmIGluVG8pIHtcbiAgICAgICAgICBhdHRyTmFtZSA9IHZhbC5ib3VuZDtcbiAgICAgICAgICBhdHRyVmFsID0gcmVmO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJOYW1lKSAmJiBhbmd1bGFyLmlzRGVmaW5lZChhdHRyVmFsKSkge1xuICAgICAgICAgIGFkZElmTm90UHJlc2VudChtb2RlbE5vZGVzLCBhdHRyTmFtZSwgYXR0clZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIFV0aWxpdHkgZnVuY3Rpb25zXG4gIGZ1bmN0aW9uIGdldEJ1aWx0SW5BdHRyaWJ1dGVzKCkge1xuICAgIGxldCBuZ01vZGVsQXR0cmlidXRlcyA9IHtcbiAgICAgIGZvY3VzOiB7XG4gICAgICAgIGF0dHJpYnV0ZTogJ2Zvcm1seS1mb2N1cydcbiAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGJvdW5kT25seSA9IFtdO1xuICAgIGNvbnN0IGJvdGhCb29sZWFuQW5kQm91bmQgPSBbJ3JlcXVpcmVkJywgJ2Rpc2FibGVkJ107XG4gICAgY29uc3QgYm90aEF0dHJpYnV0ZUFuZEJvdW5kID0gWydwYXR0ZXJuJywgJ21pbmxlbmd0aCddO1xuICAgIGNvbnN0IGV4cHJlc3Npb25Pbmx5ID0gWydjaGFuZ2UnLCAna2V5ZG93bicsICdrZXl1cCcsICdrZXlwcmVzcycsICdjbGljaycsICdmb2N1cycsICdibHVyJ107XG4gICAgY29uc3QgYXR0cmlidXRlT25seSA9IFsncGxhY2Vob2xkZXInLCAnbWluJywgJ21heCcsICd0YWJpbmRleCcsICd0eXBlJ107XG4gICAgaWYgKGZvcm1seUNvbmZpZy5leHRyYXMubmdNb2RlbEF0dHJzTWFuaXB1bGF0b3JQcmVmZXJVbmJvdW5kKSB7XG4gICAgICBib3RoQXR0cmlidXRlQW5kQm91bmQucHVzaCgnbWF4bGVuZ3RoJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvdW5kT25seS5wdXNoKCdtYXhsZW5ndGgnKTtcbiAgICB9XG5cbiAgICBhbmd1bGFyLmZvckVhY2goYm91bmRPbmx5LCBpdGVtID0+IHtcbiAgICAgIG5nTW9kZWxBdHRyaWJ1dGVzW2l0ZW1dID0ge2JvdW5kOiAnbmctJyArIGl0ZW19O1xuICAgIH0pO1xuXG4gICAgYW5ndWxhci5mb3JFYWNoKGJvdGhCb29sZWFuQW5kQm91bmQsIGl0ZW0gPT4ge1xuICAgICAgbmdNb2RlbEF0dHJpYnV0ZXNbaXRlbV0gPSB7Ym9vbGVhbjogaXRlbSwgYm91bmQ6ICduZy0nICsgaXRlbX07XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLmZvckVhY2goYm90aEF0dHJpYnV0ZUFuZEJvdW5kLCBpdGVtID0+IHtcbiAgICAgIG5nTW9kZWxBdHRyaWJ1dGVzW2l0ZW1dID0ge2F0dHJpYnV0ZTogaXRlbSwgYm91bmQ6ICduZy0nICsgaXRlbX07XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLmZvckVhY2goZXhwcmVzc2lvbk9ubHksIGl0ZW0gPT4ge1xuICAgICAgdmFyIHByb3BOYW1lID0gJ29uJyArIGl0ZW0uc3Vic3RyKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyBpdGVtLnN1YnN0cigxKTtcbiAgICAgIG5nTW9kZWxBdHRyaWJ1dGVzW3Byb3BOYW1lXSA9IHtleHByZXNzaW9uOiAnbmctJyArIGl0ZW19O1xuICAgIH0pO1xuXG4gICAgYW5ndWxhci5mb3JFYWNoKGF0dHJpYnV0ZU9ubHksIGl0ZW0gPT4ge1xuICAgICAgbmdNb2RlbEF0dHJpYnV0ZXNbaXRlbV0gPSB7YXR0cmlidXRlOiBpdGVtfTtcbiAgICB9KTtcbiAgICByZXR1cm4gbmdNb2RlbEF0dHJpYnV0ZXM7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRFcFZhbHVlKGVwLCBuYW1lKSB7XG4gICAgcmV0dXJuIGVwWyd0ZW1wbGF0ZU9wdGlvbnMuJyArIG5hbWVdIHx8XG4gICAgICBlcFtgdGVtcGxhdGVPcHRpb25zWycke25hbWV9J11gXSB8fFxuICAgICAgZXBbYHRlbXBsYXRlT3B0aW9uc1tcIiR7bmFtZX1cIl1gXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZElmTm90UHJlc2VudChub2RlcywgYXR0ciwgdmFsKSB7XG4gICAgYW5ndWxhci5mb3JFYWNoKG5vZGVzLCBub2RlID0+IHtcbiAgICAgIGlmICghbm9kZS5nZXRBdHRyaWJ1dGUoYXR0cikpIHtcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcnVuL2Zvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgYWRkQ3VzdG9tVGFncztcblxuLy8gQG5nSW5qZWN0XG5mdW5jdGlvbiBhZGRDdXN0b21UYWdzKCRkb2N1bWVudCkge1xuICBpZiAoJGRvY3VtZW50ICYmICRkb2N1bWVudC5nZXQpIHtcbiAgICAvL0lFOCBjaGVjayAtPlxuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTA5NjQ5NjYvZGV0ZWN0LWllLXZlcnNpb24tcHJpb3ItdG8tdjktaW4tamF2YXNjcmlwdC8xMDk2NTIwMyMxMDk2NTIwM1xuICAgIGNvbnN0IGRvY3VtZW50ID0gJGRvY3VtZW50LmdldCgwKTtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuaW5uZXJIVE1MID0gJzwhLS1baWYgbHQgSUUgOV0+PGk+PC9pPjwhW2VuZGlmXS0tPic7XG4gICAgY29uc3QgaXNJZUxlc3NUaGFuOSA9IChkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2knKS5sZW5ndGggPT09IDEpO1xuXG4gICAgaWYgKGlzSWVMZXNzVGhhbjkpIHtcbiAgICAgIC8vYWRkIHRoZSBjdXN0b20gZWxlbWVudHMgdGhhdCB3ZSBuZWVkIGZvciBmb3JtbHlcbiAgICAgIGNvbnN0IGN1c3RvbUVsZW1lbnRzID0gW1xuICAgICAgICAnZm9ybWx5LWZpZWxkJywgJ2Zvcm1seS1mb3JtJywgJ2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvbicsICdmb3JtbHktZm9jdXMnLCAnZm9ybWx5LXRyYW5zcG9zZSdcbiAgICAgIF07XG4gICAgICBhbmd1bGFyLmZvckVhY2goY3VzdG9tRWxlbWVudHMsIGVsID0+IHtcbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3J1bi9mb3JtbHlDdXN0b21UYWdzLmpzXG4gKiovIiwiLy8gc29tZSB2ZXJzaW9ucyBvZiBhbmd1bGFyIGRvbid0IGV4cG9ydCB0aGUgYW5ndWxhciBtb2R1bGUgcHJvcGVybHksXG4vLyBzbyB3ZSBnZXQgaXQgZnJvbSB3aW5kb3cgaW4gdGhpcyBjYXNlLlxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pZiAoIWFuZ3VsYXIudmVyc2lvbikge1xuICBhbmd1bGFyID0gd2luZG93LmFuZ3VsYXI7XG59XG5leHBvcnQgZGVmYXVsdCBhbmd1bGFyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vYW5ndWxhci1maXgvaW5kZXguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTZfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImFwaUNoZWNrXCIsXCJhbWRcIjpcImFwaS1jaGVja1wiLFwiY29tbW9uanMyXCI6XCJhcGktY2hlY2tcIixcImNvbW1vbmpzXCI6XCJhcGktY2hlY2tcIn1cbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE3X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImFuZ3VsYXJcIlxuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyLWZpeCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtmb3JtbHlFdmFsLCBnZXRGaWVsZElkLCByZXZlcnNlRGVlcE1lcmdlLCBmaW5kQnlOb2RlTmFtZX07XG5cbmZ1bmN0aW9uIGZvcm1seUV2YWwoc2NvcGUsIGV4cHJlc3Npb24sICRtb2RlbFZhbHVlLCAkdmlld1ZhbHVlKSB7XG4gIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24oZXhwcmVzc2lvbikpIHtcbiAgICByZXR1cm4gZXhwcmVzc2lvbigkdmlld1ZhbHVlLCAkbW9kZWxWYWx1ZSwgc2NvcGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzY29wZS4kZXZhbChleHByZXNzaW9uLCB7JHZpZXdWYWx1ZSwgJG1vZGVsVmFsdWV9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRGaWVsZElkKGZvcm1JZCwgb3B0aW9ucywgaW5kZXgpIHtcbiAgdmFyIHR5cGUgPSBvcHRpb25zLnR5cGU7XG4gIGlmICghdHlwZSAmJiBvcHRpb25zLnRlbXBsYXRlKSB7XG4gICAgdHlwZSA9ICd0ZW1wbGF0ZSc7XG4gIH0gZWxzZSBpZiAoIXR5cGUgJiYgb3B0aW9ucy50ZW1wbGF0ZVVybCkge1xuICAgIHR5cGUgPSAndGVtcGxhdGVVcmwnO1xuICB9XG5cbiAgcmV0dXJuIFtmb3JtSWQsIHR5cGUsIG9wdGlvbnMua2V5LCBpbmRleF0uam9pbignXycpO1xufVxuXG5cbmZ1bmN0aW9uIHJldmVyc2VEZWVwTWVyZ2UoZGVzdCkge1xuICBhbmd1bGFyLmZvckVhY2goYXJndW1lbnRzLCAoc3JjLCBpbmRleCkgPT4ge1xuICAgIGlmICghaW5kZXgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYW5ndWxhci5mb3JFYWNoKHNyYywgKHZhbCwgcHJvcCkgPT4ge1xuICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChkZXN0W3Byb3BdKSkge1xuICAgICAgICBkZXN0W3Byb3BdID0gYW5ndWxhci5jb3B5KHZhbCk7XG4gICAgICB9IGVsc2UgaWYgKG9iakFuZFNhbWVUeXBlKGRlc3RbcHJvcF0sIHZhbCkpIHtcbiAgICAgICAgcmV2ZXJzZURlZXBNZXJnZShkZXN0W3Byb3BdLCB2YWwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gb2JqQW5kU2FtZVR5cGUob2JqMSwgb2JqMikge1xuICByZXR1cm4gYW5ndWxhci5pc09iamVjdChvYmoxKSAmJiBhbmd1bGFyLmlzT2JqZWN0KG9iajIpICYmXG4gICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iajEpID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqMik7XG59XG5cbi8vcmVjdXJzZSBkb3duIGEgbm9kZSB0cmVlIHRvIGZpbmQgYSBub2RlIHdpdGggbWF0Y2hpbmcgbm9kZU5hbWUsIGZvciBjdXN0b20gdGFncyBqUXVlcnkuZmluZCBkb2Vzbid0IHdvcmsgaW4gSUU4XG5mdW5jdGlvbiBmaW5kQnlOb2RlTmFtZShlbCwgbm9kZU5hbWUpIHtcbiAgaWYgKCFlbC5wcm9wKSB7IC8vIG5vdCBhIGpRdWVyeSBvciBqcUxpdGUgb2JqZWN0IC0+IHdyYXAgaXRcbiAgICBlbCA9IGFuZ3VsYXIuZWxlbWVudChlbCk7XG4gIH1cblxuICBpZiAoZWwucHJvcCgnbm9kZU5hbWUnKSA9PT0gbm9kZU5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgIHJldHVybiBlbDtcbiAgfVxuXG4gIHZhciBjID0gZWwuY2hpbGRyZW4oKTtcbiAgZm9yKHZhciBpID0gMDsgYyAmJiBpIDwgYy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBub2RlID0gZmluZEJ5Tm9kZU5hbWUoY1tpXSwgbm9kZU5hbWUpO1xuICAgIGlmIChub2RlKSB7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL290aGVyL3V0aWxzLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==