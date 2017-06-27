// angular-formly version 6.0.0-beta.9 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)

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
	ngModule.constant("formlyVersion", ("6.0.0-beta.9")); // <-- webpack variable
	
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
	  type: apiCheck.shape.ifNot(["template", "templateUrl"], apiCheck.string).optional,
	  template: apiCheck.shape.ifNot(["type", "templateUrl"], apiCheck.string).optional,
	  templateUrl: apiCheck.shape.ifNot(["type", "template"], apiCheck.string).optional,
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
	  initialValue: apiCheck.any.optional
	};
	
	var formlyFieldOptions = apiCheck.shape(fieldOptionsApiShape).strict;
	
	var typeOptionsDefaultOptions = angular.copy(fieldOptionsApiShape);
	typeOptionsDefaultOptions.key = apiCheck.string.optional;
	
	var formlyTypeOptions = apiCheck.shape({
	  name: apiCheck.string,
	  template: apiCheck.shape.ifNot("templateUrl", apiCheck.string).optional,
	  templateUrl: apiCheck.shape.ifNot("template", apiCheck.string).optional,
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
	
	module.exports = "https://github.com/formly-js/angular-formly/blob/" + ("6.0.0-beta.9") + "/other/ERRORS_AND_WARNINGS.md#";

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
	      removeChromeAutoComplete: false
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
	      runExpressions();
	      setFormControl($scope, opts);
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
	        var initialValue = $scope.model && $scope.model[key];
	        angular.extend(options, {
	          // attach the key in case the formly-field directive is used directly
	          key: key,
	          value: valueGetterSetter,
	          runExpressions: runExpressions,
	          resetModel: resetModel,
	          updateInitialValue: updateInitialValue,
	          initialValue: initialValue
	        });
	      }
	
	      // initialization functions
	      function setFormControl(scope, options) {
	        if (options.noFormControl) {
	          return;
	        }
	        scope.$watch("form[\"" + scope.id + "\"]", function onFormControlChange(formControl) {
	          if (formControl) {
	            scope.fc = formControl; // shortcut for template authors
	            scope.options.formControl = formControl;
	            addShowMessagesWatcher(scope, options);
	          }
	        });
	      }
	
	      function addModelWatcher(scope, options) {
	        if (options.model) {
	          scope.$watch("options.model", runExpressions, true);
	        }
	      }
	
	      function addShowMessagesWatcher(scope, options) {
	        scope.$watch(function watchShowValidationChange() {
	          if (typeof scope.options.validation.show === "boolean") {
	            return scope.fc.$invalid && scope.options.validation.show;
	          } else {
	            var noTouchedButDirty = angular.isUndefined(scope.fc.$touched) && scope.fc.$dirty;
	            return scope.fc.$invalid && (scope.fc.$touched || noTouchedButDirty);
	          }
	        }, function onShowValidationChange(show) {
	          options.validation.errorExistsAndShouldBeVisible = show;
	          scope.showError = show; // shortcut for template authors
	        });
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
	      getFieldTemplate(scope.options).then(runManipulators(formlyConfig.templateManipulators.preWrapper)).then(transcludeInWrappers(scope.options)).then(runManipulators(formlyConfig.templateManipulators.postWrapper)).then(setElementTemplate)["catch"](function (error) {
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
	    return getTemplate(template || templateUrl, !template);
	  }
	
	  function getTemplate(template, isUrl) {
	    if (!isUrl) {
	      return $q.when(template);
	    } else {
	      var httpOptions = { cache: $templateCache };
	      return $http.get(template, httpOptions).then(function (response) {
	        return response.data;
	      })["catch"](function handleErrorGettingATemplate(error) {
	        formlyWarn("problem-loading-template-for-templateurl", "Problem loading template for " + template, error);
	      });
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
	      var rootEl = attrs.rootEl || "ng-form";
	      var formName = "formly_" + currentFormId++;
	      return "\n        <" + rootEl + " class=\"formly\"\n                 name=\"" + formName + "\"\n                 role=\"form\">\n          <div formly-field\n               ng-repeat=\"field in fields track by $index\"\n               ng-if=\"!field.hide\"\n               class=\"formly-field {{field.type ? 'formly-field-' + field.type : ''}}\"\n               options=\"field\"\n               model=\"field.model || model\"\n               fields=\"fields\"\n               form=\"" + formName + "\"\n               form-id=\"" + formName + "\"\n               form-state=\"options.formState\"\n               index=\"$index\">\n          </div>\n          <div ng-transclude></div>\n        </" + rootEl + ">\n      ";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzZTNiMmNhYWU3ZGRlMDQzNGE1ZCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2Zvcm1seUFwaUNoZWNrLmpzIiwid2VicGFjazovLy8uL290aGVyL2RvY3NCYXNlVXJsLmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlVc2FiaWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2Zvcm1seUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzLmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL2Zvcm1seVV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmljZXMvZm9ybWx5V2Fybi5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1maWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1mb2N1cy5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1mb3JtLmpzIiwid2VicGFjazovLy8uL3J1bi9mb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ydW4vZm9ybWx5Q3VzdG9tVGFncy5qcyIsIndlYnBhY2s6Ly8vLi9hbmd1bGFyLWZpeC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiYXBpQ2hlY2tcIixcImFtZFwiOlwiYXBpLWNoZWNrXCIsXCJjb21tb25qczJcIjpcImFwaS1jaGVja1wiLFwiY29tbW9uanNcIjpcImFwaS1jaGVja1wifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyXCIiLCJ3ZWJwYWNrOi8vLy4vb3RoZXIvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0tDdENPLEtBQUssdUNBQU0sQ0FBZ0I7O2tCQUNuQixLQUFLLEM7Ozs7Ozs7Ozs7S0NEYixPQUFPLHVDQUFNLEVBQWE7O0tBRTFCLGNBQWMsdUNBQU0sQ0FBNEI7O0tBQ2hELCtCQUErQix1Q0FBTSxDQUFxQjs7S0FDMUQsZUFBZSx1Q0FBTSxDQUE2Qjs7S0FDbEQsWUFBWSx1Q0FBTSxDQUEwQjs7S0FDNUMsd0JBQXdCLHVDQUFNLENBQXNDOztLQUNwRSxVQUFVLHVDQUFNLENBQXVCOztLQUN2QyxVQUFVLHVDQUFNLENBQXVCOztLQUV2QyxzQkFBc0IsdUNBQU0sQ0FBdUM7O0tBQ25FLFdBQVcsdUNBQU0sRUFBMkI7O0tBQzVDLFdBQVcsdUNBQU0sRUFBMkI7O0tBQzVDLFVBQVUsdUNBQU0sRUFBMEI7O0tBRTFDLDZCQUE2Qix1Q0FBTSxFQUFxQzs7S0FDeEUsZ0JBQWdCLHVDQUFNLEVBQXdCOztBQUVyRCxLQUFNLFlBQVksR0FBRyxRQUFRLENBQUM7O2tCQUVmLFlBQVk7O0FBRTNCLEtBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUVsRCxTQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ3BELFNBQVEsQ0FBQyxRQUFRLENBQUMs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QUFDLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDbEMsVUFBTyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQ3JELE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUMvRDs7O0FBR0QsVUFBUyxjQUFjLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRTtBQUNwQyxPQUFJLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRTs7QUFDWixPQUFFLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxQjs7QUFFRCxPQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFFO0FBQ2xELFlBQU8sRUFBRSxDQUFDO0lBQ1g7O0FBRUQsT0FBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ3RCLFFBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNyQyxTQUFJLElBQUksR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzFDLFNBQUksSUFBSSxFQUFFO0FBQ1IsY0FBTyxJQUFJLENBQUM7TUFDYjtJQUNGIiwiZmlsZSI6ImZvcm1seS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImFwaS1jaGVja1wiKSwgcmVxdWlyZShcImFuZ3VsYXJcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiYXBpLWNoZWNrXCIsIFwiYW5ndWxhclwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJuZ0Zvcm1seVwiXSA9IGZhY3RvcnkocmVxdWlyZShcImFwaS1jaGVja1wiKSwgcmVxdWlyZShcImFuZ3VsYXJcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIm5nRm9ybWx5XCJdID0gZmFjdG9yeShyb290W1wiYXBpQ2hlY2tcIl0sIHJvb3RbXCJhbmd1bGFyXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTZfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xN19fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAzZTNiMmNhYWU3ZGRlMDQzNGE1ZFxuICoqLyIsImltcG9ydCBpbmRleCBmcm9tICcuL2luZGV4LmNvbW1vbic7XG5leHBvcnQgZGVmYXVsdCBpbmRleDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhci1maXgnO1xuXG5pbXBvcnQgZm9ybWx5QXBpQ2hlY2sgZnJvbSAnLi9wcm92aWRlcnMvZm9ybWx5QXBpQ2hlY2snO1xuaW1wb3J0IGZvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXggZnJvbSAnLi9vdGhlci9kb2NzQmFzZVVybCc7XG5pbXBvcnQgZm9ybWx5VXNhYmlsaXR5IGZyb20gJy4vcHJvdmlkZXJzL2Zvcm1seVVzYWJpbGl0eSc7XG5pbXBvcnQgZm9ybWx5Q29uZmlnIGZyb20gJy4vcHJvdmlkZXJzL2Zvcm1seUNvbmZpZyc7XG5pbXBvcnQgZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzIGZyb20gJy4vcHJvdmlkZXJzL2Zvcm1seVZhbGlkYXRpb25NZXNzYWdlcyc7XG5pbXBvcnQgZm9ybWx5VXRpbCBmcm9tICcuL3NlcnZpY2VzL2Zvcm1seVV0aWwnO1xuaW1wb3J0IGZvcm1seVdhcm4gZnJvbSAnLi9zZXJ2aWNlcy9mb3JtbHlXYXJuJztcblxuaW1wb3J0IGZvcm1seUN1c3RvbVZhbGlkYXRpb24gZnJvbSAnLi9kaXJlY3RpdmVzL2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvbic7XG5pbXBvcnQgZm9ybWx5RmllbGQgZnJvbSAnLi9kaXJlY3RpdmVzL2Zvcm1seS1maWVsZCc7XG5pbXBvcnQgZm9ybWx5Rm9jdXMgZnJvbSAnLi9kaXJlY3RpdmVzL2Zvcm1seS1mb2N1cyc7XG5pbXBvcnQgZm9ybWx5Rm9ybSBmcm9tICcuL2RpcmVjdGl2ZXMvZm9ybWx5LWZvcm0nO1xuXG5pbXBvcnQgZm9ybWx5TmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IgZnJvbSAnLi9ydW4vZm9ybWx5TmdNb2RlbEF0dHJzTWFuaXB1bGF0b3InO1xuaW1wb3J0IGZvcm1seUN1c3RvbVRhZ3MgZnJvbSAnLi9ydW4vZm9ybWx5Q3VzdG9tVGFncyc7XG5cbmNvbnN0IG5nTW9kdWxlTmFtZSA9ICdmb3JtbHknO1xuXG5leHBvcnQgZGVmYXVsdCBuZ01vZHVsZU5hbWU7XG5cbmNvbnN0IG5nTW9kdWxlID0gYW5ndWxhci5tb2R1bGUobmdNb2R1bGVOYW1lLCBbXSk7XG5cbm5nTW9kdWxlLmNvbnN0YW50KCdmb3JtbHlBcGlDaGVjaycsIGZvcm1seUFwaUNoZWNrKTtcbm5nTW9kdWxlLmNvbnN0YW50KCdmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4JywgZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeCk7XG5uZ01vZHVsZS5jb25zdGFudCgnZm9ybWx5VmVyc2lvbicsIFZFUlNJT04pOyAvLyA8LS0gd2VicGFjayB2YXJpYWJsZVxuXG5uZ01vZHVsZS5wcm92aWRlcignZm9ybWx5VXNhYmlsaXR5JywgZm9ybWx5VXNhYmlsaXR5KTtcbm5nTW9kdWxlLnByb3ZpZGVyKCdmb3JtbHlDb25maWcnLCBmb3JtbHlDb25maWcpO1xuXG5uZ01vZHVsZS5mYWN0b3J5KCdmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMnLCBmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMpO1xubmdNb2R1bGUuZmFjdG9yeSgnZm9ybWx5VXRpbCcsIGZvcm1seVV0aWwpO1xubmdNb2R1bGUuZmFjdG9yeSgnZm9ybWx5V2FybicsIGZvcm1seVdhcm4pO1xuXG5uZ01vZHVsZS5kaXJlY3RpdmUoJ2Zvcm1seUN1c3RvbVZhbGlkYXRpb24nLCBmb3JtbHlDdXN0b21WYWxpZGF0aW9uKTtcbm5nTW9kdWxlLmRpcmVjdGl2ZSgnZm9ybWx5RmllbGQnLCBmb3JtbHlGaWVsZCk7XG5uZ01vZHVsZS5kaXJlY3RpdmUoJ2Zvcm1seUZvY3VzJywgZm9ybWx5Rm9jdXMpO1xubmdNb2R1bGUuZGlyZWN0aXZlKCdmb3JtbHlGb3JtJywgZm9ybWx5Rm9ybSk7XG5cbm5nTW9kdWxlLnJ1bihmb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvcik7XG5uZ01vZHVsZS5ydW4oZm9ybWx5Q3VzdG9tVGFncyk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9pbmRleC5jb21tb24uanNcbiAqKi8iLCJpbXBvcnQgYXBpQ2hlY2tGYWN0b3J5IGZyb20gJ2FwaS1jaGVjayc7XG5cbmxldCBhcGlDaGVjayA9IGFwaUNoZWNrRmFjdG9yeSh7XG4gIG91dHB1dDoge1xuICAgIHByZWZpeDogJ2FuZ3VsYXItZm9ybWx5OicsXG4gICAgZG9jc0Jhc2VVcmw6IHJlcXVpcmUoJy4uL290aGVyL2RvY3NCYXNlVXJsJylcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIHNoYXBlUmVxdWlyZWRJZk5vdChvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICBpZiAoIWFuZ3VsYXIuaXNBcnJheShvdGhlclByb3BzKSkge1xuICAgIG90aGVyUHJvcHMgPSBbb3RoZXJQcm9wc107XG4gIH1cbiAgY29uc3QgdHlwZSA9IGBzcGVjaWZpZWQgaWYgdGhlc2UgYXJlIG5vdCBzcGVjaWZpZWQ6IFxcYCR7b3RoZXJQcm9wcy5qb2luKCcsICcpfVxcYCAob3RoZXJ3aXNlIGl0J3Mgb3B0aW9uYWwpYDtcbiAgZnVuY3Rpb24gc2hhcGVSZXF1aXJlZElmTm90RGVmaW5pdGlvbihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgIHZhciBwcm9wRXhpc3RzID0gb2JqICYmIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSk7XG4gICAgdmFyIG90aGVyUHJvcHNFeGlzdCA9IG90aGVyUHJvcHMuc29tZShmdW5jdGlvbiAob3RoZXJQcm9wKSB7XG4gICAgICByZXR1cm4gb2JqICYmIG9iai5oYXNPd25Qcm9wZXJ0eShvdGhlclByb3ApO1xuICAgIH0pO1xuICAgIGlmICghb3RoZXJQcm9wc0V4aXN0ICYmICFwcm9wRXhpc3RzKSB7XG4gICAgICByZXR1cm4gYXBpQ2hlY2sudXRpbHMuZ2V0RXJyb3IocHJvcE5hbWUsIGxvY2F0aW9uLCB0eXBlKTtcbiAgICB9IGVsc2UgaWYgKHByb3BFeGlzdHMpIHtcbiAgICAgIHJldHVybiBwcm9wQ2hlY2tlcihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgfVxuICB9XG4gIHNoYXBlUmVxdWlyZWRJZk5vdERlZmluaXRpb24udHlwZSA9IHR5cGU7XG4gIHJldHVybiBhcGlDaGVjay51dGlscy5jaGVja2VySGVscGVycy5zZXR1cENoZWNrZXIoc2hhcGVSZXF1aXJlZElmTm90RGVmaW5pdGlvbik7XG59XG5cbmxldCBmb3JtbHlFeHByZXNzaW9uID0gYXBpQ2hlY2sub25lT2ZUeXBlKFthcGlDaGVjay5zdHJpbmcsIGFwaUNoZWNrLmZ1bmNdKTtcbmxldCBzcGVjaWZ5V3JhcHBlclR5cGUgPSBhcGlDaGVjay5vbmVPZlR5cGUoW1xuICBhcGlDaGVjay5vbmVPZihbbnVsbF0pLCBhcGlDaGVjay50eXBlT3JBcnJheU9mKGFwaUNoZWNrLnN0cmluZylcbl0pO1xuXG5jb25zdCBhcGlDaGVja1Byb3BlcnR5ID0gYXBpQ2hlY2sub2JqZWN0T2YoYXBpQ2hlY2suZnVuYyk7XG5cbmNvbnN0IGFwaUNoZWNrSW5zdGFuY2VQcm9wZXJ0eSA9IGFwaUNoZWNrLnNoYXBlLm9ubHlJZignYXBpQ2hlY2snLCBhcGlDaGVjay5mdW5jLndpdGhQcm9wZXJ0aWVzKHtcbiAgd2FybjogYXBpQ2hlY2suZnVuYyxcbiAgdGhyb3c6IGFwaUNoZWNrLmZ1bmMsXG4gIHNoYXBlOiBhcGlDaGVjay5mdW5jXG59KSk7XG5cbmNvbnN0IGFwaUNoZWNrRnVuY3Rpb25Qcm9wZXJ0eSA9IGFwaUNoZWNrLnNoYXBlLm9ubHlJZignYXBpQ2hlY2snLCBhcGlDaGVjay5vbmVPZihbJ3Rocm93JywgJ3dhcm4nXSkpO1xuXG5jb25zdCBmb3JtbHlXcmFwcGVyVHlwZSA9IGFwaUNoZWNrLnNoYXBlKHtcbiAgbmFtZTogc2hhcGVSZXF1aXJlZElmTm90KCd0eXBlcycsIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gIHRlbXBsYXRlOiBhcGlDaGVjay5zaGFwZS5pZk5vdCgndGVtcGxhdGVVcmwnLCBhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICB0ZW1wbGF0ZVVybDogYXBpQ2hlY2suc2hhcGUuaWZOb3QoJ3RlbXBsYXRlJywgYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgdHlwZXM6IGFwaUNoZWNrLnR5cGVPckFycmF5T2YoYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgb3ZlcndyaXRlT2s6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWwsXG4gIHZhbGlkYXRlT3B0aW9uczogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgYXBpQ2hlY2s6IGFwaUNoZWNrUHJvcGVydHkub3B0aW9uYWwsXG4gIGFwaUNoZWNrSW5zdGFuY2U6IGFwaUNoZWNrSW5zdGFuY2VQcm9wZXJ0eS5vcHRpb25hbCxcbiAgYXBpQ2hlY2tGdW5jdGlvbjogYXBpQ2hlY2tGdW5jdGlvblByb3BlcnR5Lm9wdGlvbmFsLFxuICBhcGlDaGVja09wdGlvbnM6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbFxufSkuc3RyaWN0O1xuXG5sZXQgZmllbGRPcHRpb25zQXBpU2hhcGUgPSB7XG4gIHR5cGU6IGFwaUNoZWNrLnNoYXBlLmlmTm90KFsndGVtcGxhdGUnLCAndGVtcGxhdGVVcmwnXSwgYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgdGVtcGxhdGU6IGFwaUNoZWNrLnNoYXBlLmlmTm90KFsndHlwZScsICd0ZW1wbGF0ZVVybCddLCBhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICB0ZW1wbGF0ZVVybDogYXBpQ2hlY2suc2hhcGUuaWZOb3QoWyd0eXBlJywgJ3RlbXBsYXRlJ10sIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gIGtleTogYXBpQ2hlY2sub25lT2ZUeXBlKFthcGlDaGVjay5zdHJpbmcsIGFwaUNoZWNrLm51bWJlcl0pLFxuICBtb2RlbDogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICBleHByZXNzaW9uUHJvcGVydGllczogYXBpQ2hlY2sub2JqZWN0T2YoYXBpQ2hlY2sub25lT2ZUeXBlKFtcbiAgICBmb3JtbHlFeHByZXNzaW9uLFxuICAgIGFwaUNoZWNrLnNoYXBlKHtcbiAgICAgIGV4cHJlc3Npb246IGZvcm1seUV4cHJlc3Npb24sXG4gICAgICBtZXNzYWdlOiBmb3JtbHlFeHByZXNzaW9uLm9wdGlvbmFsXG4gICAgfSkuc3RyaWN0XG4gIF0pKS5vcHRpb25hbCxcbiAgZGF0YTogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICB0ZW1wbGF0ZU9wdGlvbnM6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbCxcbiAgd3JhcHBlcjogc3BlY2lmeVdyYXBwZXJUeXBlLm9wdGlvbmFsLFxuICBtb2RlbE9wdGlvbnM6IGFwaUNoZWNrLnNoYXBlKHtcbiAgICB1cGRhdGVPbjogYXBpQ2hlY2suc3RyaW5nLm9wdGlvbmFsLFxuICAgIGRlYm91bmNlOiBhcGlDaGVjay5vbmVPZlR5cGUoW1xuICAgICAgYXBpQ2hlY2sub2JqZWN0LCBhcGlDaGVjay5zdHJpbmdcbiAgICBdKS5vcHRpb25hbCxcbiAgICBhbGxvd0ludmFsaWQ6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWwsXG4gICAgZ2V0dGVyU2V0dGVyOiBhcGlDaGVjay5ib29sLm9wdGlvbmFsLFxuICAgIHRpbWV6b25lOiBhcGlDaGVjay5zdHJpbmcub3B0aW9uYWxcbiAgfSkub3B0aW9uYWwsXG4gIHdhdGNoZXI6IGFwaUNoZWNrLnR5cGVPckFycmF5T2YoXG4gICAgYXBpQ2hlY2suc2hhcGUoe1xuICAgICAgZXhwcmVzc2lvbjogZm9ybWx5RXhwcmVzc2lvbi5vcHRpb25hbCxcbiAgICAgIGxpc3RlbmVyOiBmb3JtbHlFeHByZXNzaW9uXG4gICAgfSlcbiAgKS5vcHRpb25hbCxcbiAgdmFsaWRhdG9yczogYXBpQ2hlY2sub2JqZWN0T2YoYXBpQ2hlY2sub25lT2ZUeXBlKFtcbiAgICBmb3JtbHlFeHByZXNzaW9uLCBhcGlDaGVjay5zaGFwZSh7XG4gICAgICBleHByZXNzaW9uOiBmb3JtbHlFeHByZXNzaW9uLFxuICAgICAgbWVzc2FnZTogZm9ybWx5RXhwcmVzc2lvbi5vcHRpb25hbFxuICAgIH0pLnN0cmljdFxuICBdKSkub3B0aW9uYWwsXG4gIG5vRm9ybUNvbnRyb2w6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWwsXG4gIGhpZGU6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWwsXG4gIG5nTW9kZWxBdHRyczogYXBpQ2hlY2sub2JqZWN0T2YoYXBpQ2hlY2suc2hhcGUoe1xuICAgIGV4cHJlc3Npb246IGFwaUNoZWNrLnNoYXBlLmlmTm90KFsndmFsdWUnLCAnYXR0cmlidXRlJywgJ2JvdW5kJ10sIGFwaUNoZWNrLmFueSkub3B0aW9uYWwsXG4gICAgdmFsdWU6IGFwaUNoZWNrLnNoYXBlLmlmTm90KCdleHByZXNzaW9uJywgYXBpQ2hlY2suYW55KS5vcHRpb25hbCxcbiAgICBhdHRyaWJ1dGU6IGFwaUNoZWNrLnNoYXBlLmlmTm90KCdleHByZXNzaW9uJywgYXBpQ2hlY2suYW55KS5vcHRpb25hbCxcbiAgICBib3VuZDogYXBpQ2hlY2suc2hhcGUuaWZOb3QoJ2V4cHJlc3Npb24nLCBhcGlDaGVjay5hbnkpLm9wdGlvbmFsXG4gIH0pLnN0cmljdCkub3B0aW9uYWwsXG4gIG9wdGlvbnNUeXBlczogYXBpQ2hlY2sudHlwZU9yQXJyYXlPZihhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICBsaW5rOiBhcGlDaGVjay5mdW5jLm9wdGlvbmFsLFxuICBjb250cm9sbGVyOiBhcGlDaGVjay5vbmVPZlR5cGUoW1xuICAgIGFwaUNoZWNrLnN0cmluZywgYXBpQ2hlY2suZnVuYywgYXBpQ2hlY2suYXJyYXlcbiAgXSkub3B0aW9uYWwsXG4gIHZhbGlkYXRpb246IGFwaUNoZWNrLnNoYXBlKHtcbiAgICBzaG93OiBhcGlDaGVjay5vbmVPZlR5cGUoW1xuICAgICAgYXBpQ2hlY2suYm9vbCwgYXBpQ2hlY2sub25lT2YoW251bGxdKVxuICAgIF0pLm9wdGlvbmFsLFxuICAgIG1lc3NhZ2VzOiBhcGlDaGVjay5vYmplY3RPZihmb3JtbHlFeHByZXNzaW9uKS5vcHRpb25hbCxcbiAgICBlcnJvckV4aXN0c0FuZFNob3VsZEJlVmlzaWJsZTogYXBpQ2hlY2suYm9vbC5vcHRpb25hbFxuICB9KS5vcHRpb25hbCxcbiAgZm9ybUNvbnRyb2w6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbCxcbiAgdmFsdWU6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gIHJ1bkV4cHJlc3Npb25zOiBhcGlDaGVjay5mdW5jLm9wdGlvbmFsLFxuICByZXNldE1vZGVsOiBhcGlDaGVjay5mdW5jLm9wdGlvbmFsLFxuICB1cGRhdGVJbml0aWFsVmFsdWU6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gIGluaXRpYWxWYWx1ZTogYXBpQ2hlY2suYW55Lm9wdGlvbmFsXG59O1xuXG5sZXQgZm9ybWx5RmllbGRPcHRpb25zID0gYXBpQ2hlY2suc2hhcGUoZmllbGRPcHRpb25zQXBpU2hhcGUpLnN0cmljdDtcblxubGV0IHR5cGVPcHRpb25zRGVmYXVsdE9wdGlvbnMgPSBhbmd1bGFyLmNvcHkoZmllbGRPcHRpb25zQXBpU2hhcGUpO1xudHlwZU9wdGlvbnNEZWZhdWx0T3B0aW9ucy5rZXkgPSBhcGlDaGVjay5zdHJpbmcub3B0aW9uYWw7XG5cbmxldCBmb3JtbHlUeXBlT3B0aW9ucyA9IGFwaUNoZWNrLnNoYXBlKHtcbiAgbmFtZTogYXBpQ2hlY2suc3RyaW5nLFxuICB0ZW1wbGF0ZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoJ3RlbXBsYXRlVXJsJywgYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgdGVtcGxhdGVVcmw6IGFwaUNoZWNrLnNoYXBlLmlmTm90KCd0ZW1wbGF0ZScsIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gIGNvbnRyb2xsZXI6IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gICAgYXBpQ2hlY2suZnVuYywgYXBpQ2hlY2suc3RyaW5nLCBhcGlDaGVjay5hcnJheVxuICBdKS5vcHRpb25hbCxcbiAgbGluazogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgZGVmYXVsdE9wdGlvbnM6IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gICAgYXBpQ2hlY2suZnVuYywgYXBpQ2hlY2suc2hhcGUodHlwZU9wdGlvbnNEZWZhdWx0T3B0aW9ucylcbiAgXSkub3B0aW9uYWwsXG4gIGV4dGVuZHM6IGFwaUNoZWNrLnN0cmluZy5vcHRpb25hbCxcbiAgd3JhcHBlcjogc3BlY2lmeVdyYXBwZXJUeXBlLm9wdGlvbmFsLFxuICBkYXRhOiBhcGlDaGVjay5vYmplY3Qub3B0aW9uYWwsXG4gIHZhbGlkYXRlT3B0aW9uczogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgYXBpQ2hlY2s6IGFwaUNoZWNrUHJvcGVydHkub3B0aW9uYWwsXG4gIGFwaUNoZWNrSW5zdGFuY2U6IGFwaUNoZWNrSW5zdGFuY2VQcm9wZXJ0eS5vcHRpb25hbCxcbiAgYXBpQ2hlY2tGdW5jdGlvbjogYXBpQ2hlY2tGdW5jdGlvblByb3BlcnR5Lm9wdGlvbmFsLFxuICBhcGlDaGVja09wdGlvbnM6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbCxcbiAgb3ZlcndyaXRlT2s6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWxcbn0pLnN0cmljdDtcblxuYW5ndWxhci5leHRlbmQoYXBpQ2hlY2ssIHtcbiAgZm9ybWx5VHlwZU9wdGlvbnMsIGZvcm1seUZpZWxkT3B0aW9ucywgZm9ybWx5RXhwcmVzc2lvbiwgZm9ybWx5V3JhcHBlclR5cGVcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBhcGlDaGVjaztcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3Byb3ZpZGVycy9mb3JtbHlBcGlDaGVjay5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGBodHRwczovL2dpdGh1Yi5jb20vZm9ybWx5LWpzL2FuZ3VsYXItZm9ybWx5L2Jsb2IvJHtWRVJTSU9OfS9vdGhlci9FUlJPUlNfQU5EX1dBUk5JTkdTLm1kI2A7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9vdGhlci9kb2NzQmFzZVVybC5qc1xuICoqLyIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXItZml4JztcblxuZXhwb3J0IGRlZmF1bHQgZm9ybWx5VXNhYmlsaXR5O1xuXG4vLyBAbmdJbmplY3RcbmZ1bmN0aW9uIGZvcm1seVVzYWJpbGl0eShmb3JtbHlBcGlDaGVjaywgZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeCkge1xuICBhbmd1bGFyLmV4dGVuZCh0aGlzLCB7XG4gICAgZ2V0Rm9ybWx5RXJyb3I6IGdldEZvcm1seUVycm9yLFxuICAgIGdldEZpZWxkRXJyb3I6IGdldEZpZWxkRXJyb3IsXG4gICAgY2hlY2tXcmFwcGVyOiBjaGVja1dyYXBwZXIsXG4gICAgY2hlY2tXcmFwcGVyVGVtcGxhdGU6IGNoZWNrV3JhcHBlclRlbXBsYXRlLFxuICAgICRnZXQ6ICgpID0+IHRoaXNcbiAgfSk7XG5cbiAgZnVuY3Rpb24gZ2V0RmllbGRFcnJvcihlcnJvckluZm9TbHVnLCBtZXNzYWdlLCBmaWVsZCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xuICAgICAgZmllbGQgPSBtZXNzYWdlO1xuICAgICAgbWVzc2FnZSA9IGVycm9ySW5mb1NsdWc7XG4gICAgICBlcnJvckluZm9TbHVnID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBFcnJvcihnZXRFcnJvck1lc3NhZ2UoZXJyb3JJbmZvU2x1ZywgbWVzc2FnZSkgKyBgIEZpZWxkIGRlZmluaXRpb246ICR7YW5ndWxhci50b0pzb24oZmllbGQpfWApO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Rm9ybWx5RXJyb3IoZXJyb3JJbmZvU2x1ZywgbWVzc2FnZSkge1xuICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgbWVzc2FnZSA9IGVycm9ySW5mb1NsdWc7XG4gICAgICBlcnJvckluZm9TbHVnID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBFcnJvcihnZXRFcnJvck1lc3NhZ2UoZXJyb3JJbmZvU2x1ZywgbWVzc2FnZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RXJyb3JNZXNzYWdlKGVycm9ySW5mb1NsdWcsIG1lc3NhZ2UpIHtcbiAgICBsZXQgdXJsID0gJyc7XG4gICAgaWYgKGVycm9ySW5mb1NsdWcgIT09IG51bGwpIHtcbiAgICAgIHVybCA9IGAke2Zvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXh9JHtlcnJvckluZm9TbHVnfWA7XG4gICAgfVxuICAgIHJldHVybiBgRm9ybWx5IEVycm9yOiAke21lc3NhZ2V9LiAke3VybH1gO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tXcmFwcGVyKHdyYXBwZXIpIHtcbiAgICBmb3JtbHlBcGlDaGVjay50aHJvdyhmb3JtbHlBcGlDaGVjay5mb3JtbHlXcmFwcGVyVHlwZSwgd3JhcHBlciwge1xuICAgICAgcHJlZml4OiAnZm9ybWx5Q29uZmlnLnNldFdyYXBwZXInLFxuICAgICAgdXJsU3VmZml4OiAnc2V0d3JhcHBlci12YWxpZGF0aW9uLWZhaWxlZCdcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrV3JhcHBlclRlbXBsYXRlKHRlbXBsYXRlLCBhZGRpdGlvbmFsSW5mbykge1xuICAgIHZhciBmb3JtbHlUcmFuc2NsdWRlID0gJzxmb3JtbHktdHJhbnNjbHVkZT48L2Zvcm1seS10cmFuc2NsdWRlPic7XG4gICAgaWYgKHRlbXBsYXRlLmluZGV4T2YoZm9ybWx5VHJhbnNjbHVkZSkgPT09IC0xKSB7XG4gICAgICB0aHJvdyBnZXRGb3JtbHlFcnJvcihcbiAgICAgICAgYFRlbXBsYXRlIHdyYXBwZXIgdGVtcGxhdGVzIG11c3QgdXNlIFwiJHtmb3JtbHlUcmFuc2NsdWRlfVwiIHNvbWV3aGVyZSBpbiB0aGVtLiBgICtcbiAgICAgICAgYFRoaXMgb25lIGRvZXMgbm90IGhhdmUgXCI8Zm9ybWx5LXRyYW5zY2x1ZGU+PC9mb3JtbHktdHJhbnNjbHVkZT5cIiBpbiBpdDogJHt0ZW1wbGF0ZX1gICsgJ1xcbicgK1xuICAgICAgICBgQWRkaXRpb25hbCBpbmZvcm1hdGlvbjogJHtKU09OLnN0cmluZ2lmeShhZGRpdGlvbmFsSW5mbyl9YFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3Byb3ZpZGVycy9mb3JtbHlVc2FiaWxpdHkuanNcbiAqKi8iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyLWZpeCc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vb3RoZXIvdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmb3JtbHlDb25maWc7XG5cbi8vIEBuZ0luamVjdFxuZnVuY3Rpb24gZm9ybWx5Q29uZmlnKGZvcm1seVVzYWJpbGl0eVByb3ZpZGVyLCBmb3JtbHlBcGlDaGVjaykge1xuXG4gIHZhciB0eXBlTWFwID0ge307XG4gIHZhciB0ZW1wbGF0ZVdyYXBwZXJzTWFwID0ge307XG4gIHZhciBkZWZhdWx0V3JhcHBlck5hbWUgPSAnZGVmYXVsdCc7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG4gIHZhciBnZXRFcnJvciA9IGZvcm1seVVzYWJpbGl0eVByb3ZpZGVyLmdldEZvcm1seUVycm9yO1xuXG4gIGFuZ3VsYXIuZXh0ZW5kKHRoaXMsIHtcbiAgICBzZXRUeXBlLFxuICAgIGdldFR5cGUsXG4gICAgc2V0V3JhcHBlcixcbiAgICBnZXRXcmFwcGVyLFxuICAgIGdldFdyYXBwZXJCeVR5cGUsXG4gICAgcmVtb3ZlV3JhcHBlckJ5TmFtZSxcbiAgICByZW1vdmVXcmFwcGVyc0ZvclR5cGUsXG4gICAgZGlzYWJsZVdhcm5pbmdzOiBmYWxzZSxcbiAgICBleHRyYXM6IHtcbiAgICAgIGRpc2FibGVOZ01vZGVsQXR0cnNNYW5pcHVsYXRvcjogZmFsc2UsXG4gICAgICBuZ01vZGVsQXR0cnNNYW5pcHVsYXRvclByZWZlclVuYm91bmQ6IGZhbHNlLFxuICAgICAgcmVtb3ZlQ2hyb21lQXV0b0NvbXBsZXRlOiBmYWxzZVxuICAgIH0sXG4gICAgdGVtcGxhdGVNYW5pcHVsYXRvcnM6IHtcbiAgICAgIHByZVdyYXBwZXI6IFtdLFxuICAgICAgcG9zdFdyYXBwZXI6IFtdXG4gICAgfSxcbiAgICAkZ2V0OiAoKSA9PiB0aGlzXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHNldFR5cGUob3B0aW9ucykge1xuICAgIGlmIChhbmd1bGFyLmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChvcHRpb25zLCBzZXRUeXBlKTtcbiAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICAgIGNoZWNrVHlwZShvcHRpb25zKTtcbiAgICAgIGlmIChvcHRpb25zLmV4dGVuZHMpIHtcbiAgICAgICAgZXh0ZW5kVHlwZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICB9XG4gICAgICB0eXBlTWFwW29wdGlvbnMubmFtZV0gPSBvcHRpb25zO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBnZXRFcnJvcihgWW91IG11c3QgcHJvdmlkZSBhbiBvYmplY3Qgb3IgYXJyYXkgZm9yIHNldFR5cGUuIFlvdSBwcm92aWRlZDogJHtKU09OLnN0cmluZ2lmeShhcmd1bWVudHMpfWApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrVHlwZShvcHRpb25zKSB7XG4gICAgZm9ybWx5QXBpQ2hlY2sudGhyb3coZm9ybWx5QXBpQ2hlY2suZm9ybWx5VHlwZU9wdGlvbnMsIG9wdGlvbnMsIHtcbiAgICAgIHByZWZpeDogJ2Zvcm1seUNvbmZpZy5zZXRUeXBlJyxcbiAgICAgIHVybDogJ3NldHR5cGUtdmFsaWRhdGlvbi1mYWlsZWQnXG4gICAgfSk7XG4gICAgaWYgKCFvcHRpb25zLm92ZXJ3cml0ZU9rKSB7XG4gICAgICBjaGVja092ZXJ3cml0ZShvcHRpb25zLm5hbWUsIHR5cGVNYXAsIG9wdGlvbnMsICd0eXBlcycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb25zLm92ZXJ3cml0ZU9rID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dGVuZFR5cGVPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBjb25zdCBleHRlbmRzVHlwZSA9IGdldFR5cGUob3B0aW9ucy5leHRlbmRzLCB0cnVlLCBvcHRpb25zKTtcbiAgICBleHRlbmRUeXBlQ29udHJvbGxlckZ1bmN0aW9uKG9wdGlvbnMsIGV4dGVuZHNUeXBlKTtcbiAgICBleHRlbmRUeXBlTGlua0Z1bmN0aW9uKG9wdGlvbnMsIGV4dGVuZHNUeXBlKTtcbiAgICBleHRlbmRUeXBlVmFsaWRhdGVPcHRpb25zRnVuY3Rpb24ob3B0aW9ucywgZXh0ZW5kc1R5cGUpO1xuICAgIGV4dGVuZFR5cGVEZWZhdWx0T3B0aW9ucyhvcHRpb25zLCBleHRlbmRzVHlwZSk7XG4gICAgdXRpbHMucmV2ZXJzZURlZXBNZXJnZShvcHRpb25zLCBleHRlbmRzVHlwZSk7XG4gIH1cblxuICBmdW5jdGlvbiBleHRlbmRUeXBlQ29udHJvbGxlckZ1bmN0aW9uKG9wdGlvbnMsIGV4dGVuZHNUeXBlKSB7XG4gICAgY29uc3QgZXh0ZW5kc0N0cmwgPSBleHRlbmRzVHlwZS5jb250cm9sbGVyO1xuICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoZXh0ZW5kc0N0cmwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG9wdGlvbnNDdHJsID0gb3B0aW9ucy5jb250cm9sbGVyO1xuICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zQ3RybCkpIHtcbiAgICAgIG9wdGlvbnMuY29udHJvbGxlciA9IGZ1bmN0aW9uICgkc2NvcGUsICRjb250cm9sbGVyKSB7XG4gICAgICAgICRjb250cm9sbGVyKGV4dGVuZHNDdHJsLCB7JHNjb3BlfSk7XG4gICAgICAgICRjb250cm9sbGVyKG9wdGlvbnNDdHJsLCB7JHNjb3BlfSk7XG4gICAgICB9O1xuICAgICAgb3B0aW9ucy5jb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckY29udHJvbGxlciddO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb25zLmNvbnRyb2xsZXIgPSBleHRlbmRzQ3RybDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBleHRlbmRUeXBlTGlua0Z1bmN0aW9uKG9wdGlvbnMsIGV4dGVuZHNUeXBlKSB7XG4gICAgY29uc3QgZXh0ZW5kc0ZuID0gZXh0ZW5kc1R5cGUubGluaztcbiAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGV4dGVuZHNGbikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgb3B0aW9uc0ZuID0gb3B0aW9ucy5saW5rO1xuICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zRm4pKSB7XG4gICAgICBvcHRpb25zLmxpbmsgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4dGVuZHNGbiguLi5hcmd1bWVudHMpO1xuICAgICAgICBvcHRpb25zRm4oLi4uYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMubGluayA9IGV4dGVuZHNGbjtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBleHRlbmRUeXBlVmFsaWRhdGVPcHRpb25zRnVuY3Rpb24ob3B0aW9ucywgZXh0ZW5kc1R5cGUpIHtcbiAgICBjb25zdCBleHRlbmRzRm4gPSBleHRlbmRzVHlwZS52YWxpZGF0ZU9wdGlvbnM7XG4gICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChleHRlbmRzRm4pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG9wdGlvbnNGbiA9IG9wdGlvbnMudmFsaWRhdGVPcHRpb25zO1xuICAgIGNvbnN0IG9yaWdpbmFsRGVmYXVsdE9wdGlvbnMgPSBvcHRpb25zLmRlZmF1bHRPcHRpb25zO1xuICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zRm4pKSB7XG4gICAgICBvcHRpb25zLnZhbGlkYXRlT3B0aW9ucyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnNGbihvcHRpb25zKTtcbiAgICAgICAgbGV0IG1lcmdlZE9wdGlvbnMgPSBhbmd1bGFyLmNvcHkob3B0aW9ucyk7XG4gICAgICAgIGxldCBkZWZhdWx0T3B0aW9ucyA9IG9yaWdpbmFsRGVmYXVsdE9wdGlvbnM7XG4gICAgICAgIGlmIChkZWZhdWx0T3B0aW9ucykge1xuICAgICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24oZGVmYXVsdE9wdGlvbnMpKSB7XG4gICAgICAgICAgICBkZWZhdWx0T3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zKG1lcmdlZE9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB1dGlscy5yZXZlcnNlRGVlcE1lcmdlKG1lcmdlZE9wdGlvbnMsIGRlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBleHRlbmRzRm4obWVyZ2VkT3B0aW9ucyk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb25zLnZhbGlkYXRlT3B0aW9ucyA9IGV4dGVuZHNGbjtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBleHRlbmRUeXBlRGVmYXVsdE9wdGlvbnMob3B0aW9ucywgZXh0ZW5kc1R5cGUpIHtcbiAgICBjb25zdCBleHRlbmRzRE8gPSBleHRlbmRzVHlwZS5kZWZhdWx0T3B0aW9ucztcbiAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGV4dGVuZHNETykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgb3B0aW9uc0RPID0gb3B0aW9ucy5kZWZhdWx0T3B0aW9ucztcbiAgICBjb25zdCBvcHRpb25zRE9Jc0ZuID0gYW5ndWxhci5pc0Z1bmN0aW9uKG9wdGlvbnNETyk7XG4gICAgY29uc3QgZXh0ZW5kc0RPSXNGbiA9IGFuZ3VsYXIuaXNGdW5jdGlvbihleHRlbmRzRE8pO1xuICAgIGlmIChleHRlbmRzRE9Jc0ZuKSB7XG4gICAgICBvcHRpb25zLmRlZmF1bHRPcHRpb25zID0gZnVuY3Rpb24gZGVmYXVsdE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBjb25zdCBleHRlbmRzRGVmYXVsdE9wdGlvbnMgPSBleHRlbmRzRE8ob3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IG1lcmdlZERlZmF1bHRPcHRpb25zID0ge307XG4gICAgICAgIHV0aWxzLnJldmVyc2VEZWVwTWVyZ2UobWVyZ2VkRGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMsIGV4dGVuZHNEZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIGxldCBleHRlbmRlck9wdGlvbnNEZWZhdWx0T3B0aW9ucyA9IG9wdGlvbnNETztcbiAgICAgICAgaWYgKG9wdGlvbnNET0lzRm4pIHtcbiAgICAgICAgICBleHRlbmRlck9wdGlvbnNEZWZhdWx0T3B0aW9ucyA9IGV4dGVuZGVyT3B0aW9uc0RlZmF1bHRPcHRpb25zKG1lcmdlZERlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICB1dGlscy5yZXZlcnNlRGVlcE1lcmdlKGV4dGVuZHNEZWZhdWx0T3B0aW9ucywgZXh0ZW5kZXJPcHRpb25zRGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gZXh0ZW5kc0RlZmF1bHRPcHRpb25zO1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnNET0lzRm4pIHtcbiAgICAgIG9wdGlvbnMuZGVmYXVsdE9wdGlvbnMgPSBmdW5jdGlvbiBkZWZhdWx0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgIGxldCBuZXdEZWZhdWx0T3B0aW9ucyA9IHt9O1xuICAgICAgICB1dGlscy5yZXZlcnNlRGVlcE1lcmdlKG5ld0RlZmF1bHRPcHRpb25zLCBvcHRpb25zLCBleHRlbmRzRE8pO1xuICAgICAgICByZXR1cm4gb3B0aW9uc0RPKG5ld0RlZmF1bHRPcHRpb25zKTtcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0VHlwZShuYW1lLCB0aHJvd0Vycm9yLCBlcnJvckNvbnRleHQpIHtcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHZhciB0eXBlID0gdHlwZU1hcFtuYW1lXTtcbiAgICBpZiAoIXR5cGUgJiYgdGhyb3dFcnJvciA9PT0gdHJ1ZSkge1xuICAgICAgdGhyb3cgZ2V0RXJyb3IoXG4gICAgICAgIGBUaGVyZSBpcyBubyB0eXBlIGJ5IHRoZSBuYW1lIG9mIFwiJHtuYW1lfVwiOiAke0pTT04uc3RyaW5naWZ5KGVycm9yQ29udGV4dCl9YFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0V3JhcHBlcihvcHRpb25zLCBuYW1lKSB7XG4gICAgaWYgKGFuZ3VsYXIuaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMubWFwKHdyYXBwZXJPcHRpb25zID0+IHNldFdyYXBwZXIod3JhcHBlck9wdGlvbnMpKTtcbiAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICAgIG9wdGlvbnMudHlwZXMgPSBnZXRPcHRpb25zVHlwZXMob3B0aW9ucyk7XG4gICAgICBvcHRpb25zLm5hbWUgPSBnZXRPcHRpb25zTmFtZShvcHRpb25zLCBuYW1lKTtcbiAgICAgIGNoZWNrV3JhcHBlckFQSShvcHRpb25zKTtcbiAgICAgIHRlbXBsYXRlV3JhcHBlcnNNYXBbb3B0aW9ucy5uYW1lXSA9IG9wdGlvbnM7XG4gICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNTdHJpbmcob3B0aW9ucykpIHtcbiAgICAgIHJldHVybiBzZXRXcmFwcGVyKHtcbiAgICAgICAgdGVtcGxhdGU6IG9wdGlvbnMsXG4gICAgICAgIG5hbWVcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE9wdGlvbnNUeXBlcyhvcHRpb25zKSB7XG4gICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcob3B0aW9ucy50eXBlcykpIHtcbiAgICAgIHJldHVybiBbb3B0aW9ucy50eXBlc107XG4gICAgfVxuICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy50eXBlcykpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9wdGlvbnMudHlwZXM7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0T3B0aW9uc05hbWUob3B0aW9ucywgbmFtZSkge1xuICAgIHJldHVybiBvcHRpb25zLm5hbWUgfHwgbmFtZSB8fCBvcHRpb25zLnR5cGVzLmpvaW4oJyAnKSB8fCBkZWZhdWx0V3JhcHBlck5hbWU7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1dyYXBwZXJBUEkob3B0aW9ucykge1xuICAgIGZvcm1seVVzYWJpbGl0eVByb3ZpZGVyLmNoZWNrV3JhcHBlcihvcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucy50ZW1wbGF0ZSkge1xuICAgICAgZm9ybWx5VXNhYmlsaXR5UHJvdmlkZXIuY2hlY2tXcmFwcGVyVGVtcGxhdGUob3B0aW9ucy50ZW1wbGF0ZSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGlmICghb3B0aW9ucy5vdmVyd3JpdGVPaykge1xuICAgICAgY2hlY2tPdmVyd3JpdGUob3B0aW9ucy5uYW1lLCB0ZW1wbGF0ZVdyYXBwZXJzTWFwLCBvcHRpb25zLCAndGVtcGxhdGVXcmFwcGVycycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgb3B0aW9ucy5vdmVyd3JpdGVPaztcbiAgICB9XG4gICAgY2hlY2tXcmFwcGVyVHlwZXMob3B0aW9ucyk7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1dyYXBwZXJUeXBlcyhvcHRpb25zKSB7XG4gICAgbGV0IHNob3VsZFRocm93ID0gIWFuZ3VsYXIuaXNBcnJheShvcHRpb25zLnR5cGVzKSB8fCAhb3B0aW9ucy50eXBlcy5ldmVyeShhbmd1bGFyLmlzU3RyaW5nKTtcbiAgICBpZiAoc2hvdWxkVGhyb3cpIHtcbiAgICAgIHRocm93IGdldEVycm9yKGBBdHRlbXB0ZWQgdG8gY3JlYXRlIGEgdGVtcGxhdGUgd3JhcHBlciB3aXRoIHR5cGVzIHRoYXQgaXMgbm90IGEgc3RyaW5nIG9yIGFuIGFycmF5IG9mIHN0cmluZ3NgKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja092ZXJ3cml0ZShwcm9wZXJ0eSwgb2JqZWN0LCBuZXdWYWx1ZSwgb2JqZWN0TmFtZSkge1xuICAgIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICB3YXJuKFtcbiAgICAgICAgYEF0dGVtcHRpbmcgdG8gb3ZlcndyaXRlICR7cHJvcGVydHl9IG9uICR7b2JqZWN0TmFtZX0gd2hpY2ggaXMgY3VycmVudGx5YCxcbiAgICAgICAgYCR7SlNPTi5zdHJpbmdpZnkob2JqZWN0W3Byb3BlcnR5XSl9IHdpdGggJHtKU09OLnN0cmluZ2lmeShuZXdWYWx1ZSl9YCxcbiAgICAgICAgYFRvIHN1cHJlc3MgdGhpcyB3YXJuaW5nLCBzcGVjaWZ5IHRoZSBwcm9wZXJ0eSBcIm92ZXJ3cml0ZU9rOiB0cnVlXCJgXG4gICAgICBdLmpvaW4oJyAnKSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0V3JhcHBlcihuYW1lKSB7XG4gICAgcmV0dXJuIHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZSB8fCBkZWZhdWx0V3JhcHBlck5hbWVdO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0V3JhcHBlckJ5VHlwZSh0eXBlKSB7XG4gICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NiAqL1xuICAgIHZhciB3cmFwcGVycyA9IFtdO1xuICAgIGZvciAodmFyIG5hbWUgaW4gdGVtcGxhdGVXcmFwcGVyc01hcCkge1xuICAgICAgaWYgKHRlbXBsYXRlV3JhcHBlcnNNYXAuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgaWYgKHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV0udHlwZXMgJiYgdGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lXS50eXBlcy5pbmRleE9mKHR5cGUpICE9PSAtMSkge1xuICAgICAgICAgIHdyYXBwZXJzLnB1c2godGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHdyYXBwZXJzO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlV3JhcHBlckJ5TmFtZShuYW1lKSB7XG4gICAgdmFyIHdyYXBwZXIgPSB0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdO1xuICAgIGRlbGV0ZSB0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdO1xuICAgIHJldHVybiB3cmFwcGVyO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlV3JhcHBlcnNGb3JUeXBlKHR5cGUpIHtcbiAgICB2YXIgd3JhcHBlcnMgPSBnZXRXcmFwcGVyQnlUeXBlKHR5cGUpO1xuICAgIGlmICghd3JhcHBlcnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFhbmd1bGFyLmlzQXJyYXkod3JhcHBlcnMpKSB7XG4gICAgICByZXR1cm4gcmVtb3ZlV3JhcHBlckJ5TmFtZSh3cmFwcGVycy5uYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd3JhcHBlcnMuZm9yRWFjaCgod3JhcHBlcikgPT4gcmVtb3ZlV3JhcHBlckJ5TmFtZSh3cmFwcGVyLm5hbWUpKTtcbiAgICAgIHJldHVybiB3cmFwcGVycztcbiAgICB9XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHdhcm4oKSB7XG4gICAgaWYgKCFfdGhpcy5kaXNhYmxlV2FybmluZ3MpIHtcbiAgICAgIGNvbnNvbGUud2FybiguLi5hcmd1bWVudHMpO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcHJvdmlkZXJzL2Zvcm1seUNvbmZpZy5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcztcblxuXG4vLyBAbmdJbmplY3RcbmZ1bmN0aW9uIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcygpIHtcblxuICB2YXIgdmFsaWRhdGlvbk1lc3NhZ2VzID0ge1xuICAgIGFkZFRlbXBsYXRlT3B0aW9uVmFsdWVNZXNzYWdlLFxuICAgIGFkZFN0cmluZ01lc3NhZ2UsXG4gICAgbWVzc2FnZXM6IHt9XG4gIH07XG5cbiAgcmV0dXJuIHZhbGlkYXRpb25NZXNzYWdlcztcblxuICBmdW5jdGlvbiBhZGRUZW1wbGF0ZU9wdGlvblZhbHVlTWVzc2FnZShuYW1lLCBwcm9wLCBwcmVmaXgsIHN1ZmZpeCwgYWx0ZXJuYXRlKSB7XG4gICAgdmFsaWRhdGlvbk1lc3NhZ2VzLm1lc3NhZ2VzW25hbWVdID0gdGVtcGxhdGVPcHRpb25WYWx1ZShwcm9wLCBwcmVmaXgsIHN1ZmZpeCwgYWx0ZXJuYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFN0cmluZ01lc3NhZ2UobmFtZSwgc3RyaW5nKSB7XG4gICAgdmFsaWRhdGlvbk1lc3NhZ2VzLm1lc3NhZ2VzW25hbWVdID0gKCkgPT4gc3RyaW5nO1xuICB9XG5cblxuICBmdW5jdGlvbiB0ZW1wbGF0ZU9wdGlvblZhbHVlKHByb3AsIHByZWZpeCwgc3VmZml4LCBhbHRlcm5hdGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gZ2V0VmFsaWRhdGlvbk1lc3NhZ2Uodmlld1ZhbHVlLCBtb2RlbFZhbHVlLCBzY29wZSkge1xuICAgICAgaWYgKHNjb3BlLm9wdGlvbnMudGVtcGxhdGVPcHRpb25zW3Byb3BdKSB7XG4gICAgICAgIHJldHVybiBgJHtwcmVmaXh9ICR7c2NvcGUub3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnNbcHJvcF19ICR7c3VmZml4fWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYWx0ZXJuYXRlO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3Byb3ZpZGVycy9mb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMuanNcbiAqKi8iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi4vb3RoZXIvdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmb3JtbHlVdGlsO1xuXG4vLyBAbmdJbmplY3RcbmZ1bmN0aW9uIGZvcm1seVV0aWwoKSB7XG4gIHJldHVybiB1dGlscztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3NlcnZpY2VzL2Zvcm1seVV0aWwuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmb3JtbHlXYXJuO1xuXG4vLyBAbmdJbmplY3RcbmZ1bmN0aW9uIGZvcm1seVdhcm4oZm9ybWx5Q29uZmlnLCBmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4LCAkbG9nKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3YXJuKCkge1xuICAgIGlmICghZm9ybWx5Q29uZmlnLmRpc2FibGVXYXJuaW5ncykge1xuICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgdmFyIHdhcm5JbmZvU2x1ZyA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgIGFyZ3MudW5zaGlmdCgnRm9ybWx5IFdhcm5pbmc6Jyk7XG4gICAgICBhcmdzLnB1c2goYCR7Zm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeH0ke3dhcm5JbmZvU2x1Z31gKTtcbiAgICAgICRsb2cud2FybiguLi5hcmdzKTtcbiAgICB9XG4gIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9zZXJ2aWNlcy9mb3JtbHlXYXJuLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbjtcblxuLy8gQG5nSW5qZWN0XG5mdW5jdGlvbiBmb3JtbHlDdXN0b21WYWxpZGF0aW9uKGZvcm1seVV0aWwsICRxKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICByZXF1aXJlOiAnbmdNb2RlbCcsXG4gICAgbGluazogZnVuY3Rpb24gZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbkxpbmsoc2NvcGUsIGVsLCBhdHRycywgY3RybCkge1xuICAgICAgY29uc3Qgb3B0cyA9IHNjb3BlLm9wdGlvbnM7XG4gICAgICBpZiAob3B0cy52YWxpZGF0b3JzKSB7XG4gICAgICAgIGNoZWNrVmFsaWRhdG9ycyhvcHRzLnZhbGlkYXRvcnMpO1xuICAgICAgfVxuICAgICAgb3B0cy52YWxpZGF0aW9uLm1lc3NhZ2VzID0gb3B0cy52YWxpZGF0aW9uLm1lc3NhZ2VzIHx8IHt9O1xuICAgICAgYW5ndWxhci5mb3JFYWNoKG9wdHMudmFsaWRhdGlvbi5tZXNzYWdlcywgKG1lc3NhZ2UsIGtleSkgPT4ge1xuICAgICAgICBvcHRzLnZhbGlkYXRpb24ubWVzc2FnZXNba2V5XSA9ICgpID0+IHtcbiAgICAgICAgICByZXR1cm4gZm9ybWx5VXRpbC5mb3JtbHlFdmFsKHNjb3BlLCBtZXNzYWdlLCBjdHJsLiRtb2RlbFZhbHVlLCBjdHJsLiR2aWV3VmFsdWUpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cblxuICAgICAgdmFyIHVzZU5ld1ZhbGlkYXRvcnNBcGkgPSBjdHJsLmhhc093blByb3BlcnR5KCckdmFsaWRhdG9ycycpICYmICFhdHRycy5oYXNPd25Qcm9wZXJ0eSgndXNlUGFyc2VycycpO1xuICAgICAgYW5ndWxhci5mb3JFYWNoKG9wdHMudmFsaWRhdG9ycywgZnVuY3Rpb24gYWRkVmFsaWRhdG9yVG9QaXBlbGluZSh2YWxpZGF0b3IsIG5hbWUpIHtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSB2YWxpZGF0b3IubWVzc2FnZTtcbiAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICBvcHRzLnZhbGlkYXRpb24ubWVzc2FnZXNbbmFtZV0gPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZm9ybWx5VXRpbC5mb3JtbHlFdmFsKHNjb3BlLCBtZXNzYWdlLCBjdHJsLiRtb2RlbFZhbHVlLCBjdHJsLiR2aWV3VmFsdWUpO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdmFsaWRhdG9yID0gYW5ndWxhci5pc09iamVjdCh2YWxpZGF0b3IpID8gdmFsaWRhdG9yLmV4cHJlc3Npb24gOiB2YWxpZGF0b3I7XG4gICAgICAgIHZhciBpc1Bvc3NpYmx5QXN5bmMgPSAhYW5ndWxhci5pc1N0cmluZyh2YWxpZGF0b3IpO1xuICAgICAgICBpZiAodXNlTmV3VmFsaWRhdG9yc0FwaSkge1xuICAgICAgICAgIHNldHVwV2l0aFZhbGlkYXRvcnMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXR1cFdpdGhQYXJzZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzZXR1cFdpdGhWYWxpZGF0b3JzKCkge1xuICAgICAgICAgIHZhciB2YWxpZGF0b3JDb2xsZWN0aW9uID0gaXNQb3NzaWJseUFzeW5jID8gJyRhc3luY1ZhbGlkYXRvcnMnIDogJyR2YWxpZGF0b3JzJztcbiAgICAgICAgICBjdHJsW3ZhbGlkYXRvckNvbGxlY3Rpb25dW25hbWVdID0gZnVuY3Rpb24gZXZhbFZhbGlkaXR5KG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSkge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gZm9ybWx5VXRpbC5mb3JtbHlFdmFsKHNjb3BlLCB2YWxpZGF0b3IsIG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoaXNQb3NzaWJseUFzeW5jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpc1Byb21pc2VMaWtlKHZhbHVlKSA/IHZhbHVlIDogdmFsdWUgPyAkcS53aGVuKHZhbHVlKSA6ICRxLnJlamVjdCh2YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNldHVwV2l0aFBhcnNlcnMoKSB7XG4gICAgICAgICAgbGV0IGluRmxpZ2h0VmFsaWRhdG9yO1xuICAgICAgICAgIGN0cmwuJHBhcnNlcnMudW5zaGlmdChmdW5jdGlvbiBldmFsVmFsaWRpdHlPZlBhcnNlcih2aWV3VmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBpc1ZhbGlkID0gZm9ybWx5VXRpbC5mb3JtbHlFdmFsKHNjb3BlLCB2YWxpZGF0b3IsIGN0cmwuJG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoaXNQcm9taXNlTGlrZShpc1ZhbGlkKSkge1xuICAgICAgICAgICAgICBjdHJsLiRwZW5kaW5nID0gY3RybC4kcGVuZGluZyB8fCB7fTtcbiAgICAgICAgICAgICAgY3RybC4kcGVuZGluZ1tuYW1lXSA9IHRydWU7XG4gICAgICAgICAgICAgIGluRmxpZ2h0VmFsaWRhdG9yID0gaXNWYWxpZDtcbiAgICAgICAgICAgICAgaXNWYWxpZC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaW5GbGlnaHRWYWxpZGF0b3IgPT09IGlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgIGN0cmwuJHNldFZhbGlkaXR5KG5hbWUsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpbkZsaWdodFZhbGlkYXRvciA9PT0gaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgY3RybC4kc2V0VmFsaWRpdHkobmFtZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSkuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKGN0cmwuJHBlbmRpbmcpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgZGVsZXRlIGN0cmwuJHBlbmRpbmc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjdHJsLiRwZW5kaW5nW25hbWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjdHJsLiRzZXRWYWxpZGl0eShuYW1lLCBpc1ZhbGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2aWV3VmFsdWU7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBpc1Byb21pc2VMaWtlKG9iaikge1xuICAgIHJldHVybiBvYmogJiYgYW5ndWxhci5pc0Z1bmN0aW9uKG9iai50aGVuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrVmFsaWRhdG9ycyh2YWxpZGF0b3JzKSB7XG4gICAgdmFyIGFsbG93ZWRQcm9wZXJ0aWVzID0gWydleHByZXNzaW9uJywgJ21lc3NhZ2UnXTtcbiAgICB2YXIgdmFsaWRhdG9yc1dpdGhFeHRyYVByb3BzID0ge307XG4gICAgYW5ndWxhci5mb3JFYWNoKHZhbGlkYXRvcnMsICh2YWxpZGF0b3IsIG5hbWUpID0+IHtcbiAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKHZhbGlkYXRvcikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGV4dHJhUHJvcHMgPSBbXTtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaCh2YWxpZGF0b3IsICh2LCBrZXkpID0+IHtcbiAgICAgICAgaWYgKGFsbG93ZWRQcm9wZXJ0aWVzLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHtcbiAgICAgICAgICBleHRyYVByb3BzLnB1c2goa2V5KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoZXh0cmFQcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgdmFsaWRhdG9yc1dpdGhFeHRyYVByb3BzW25hbWVdID0gZXh0cmFQcm9wcztcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoT2JqZWN0LmtleXModmFsaWRhdG9yc1dpdGhFeHRyYVByb3BzKS5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihbXG4gICAgICAgIGBWYWxpZGF0b3JzIGFyZSBvbmx5IGFsbG93ZWQgdG8gYmUgZnVuY3Rpb25zIG9yIG9iamVjdHMgdGhhdCBoYXZlICR7YWxsb3dlZFByb3BlcnRpZXMuam9pbignLCAnKX0uYCxcbiAgICAgICAgYFlvdSBwcm92aWRlZCBzb21lIGV4dHJhIHByb3BlcnRpZXM6ICR7SlNPTi5zdHJpbmdpZnkodmFsaWRhdG9yc1dpdGhFeHRyYVByb3BzKX1gXG4gICAgICBdLmpvaW4oJyAnKSk7XG4gICAgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9kaXJlY3RpdmVzL2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvbi5qc1xuICoqLyIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXItZml4JztcblxuZXhwb3J0IGRlZmF1bHQgZm9ybWx5RmllbGQ7XG5cbi8qKlxuICogQG5nZG9jIGRpcmVjdGl2ZVxuICogQG5hbWUgZm9ybWx5RmllbGRcbiAqIEByZXN0cmljdCBBRVxuICovXG4vLyBAbmdJbmplY3RcbmZ1bmN0aW9uIGZvcm1seUZpZWxkKCRodHRwLCAkcSwgJGNvbXBpbGUsICR0ZW1wbGF0ZUNhY2hlLCBmb3JtbHlDb25maWcsIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcywgZm9ybWx5QXBpQ2hlY2ssXG4gICAgICAgICAgICAgICAgICAgICBmb3JtbHlVdGlsLCBmb3JtbHlVc2FiaWxpdHksIGZvcm1seVdhcm4pIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0FFJyxcbiAgICB0cmFuc2NsdWRlOiB0cnVlLFxuICAgIHNjb3BlOiB7XG4gICAgICBvcHRpb25zOiAnPScsXG4gICAgICBtb2RlbDogJz0nLFxuICAgICAgZm9ybUlkOiAnQCcsXG4gICAgICBpbmRleDogJz0/JyxcbiAgICAgIGZpZWxkczogJz0/JyxcbiAgICAgIGZvcm1TdGF0ZTogJz0/JyxcbiAgICAgIGZvcm06ICc9PydcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6IC8qIEBuZ0luamVjdCAqLyBmdW5jdGlvbiBGb3JtbHlGaWVsZENvbnRyb2xsZXIoJHNjb3BlLCAkdGltZW91dCwgJHBhcnNlLCAkY29udHJvbGxlcikge1xuICAgICAgdmFyIG9wdHMgPSAkc2NvcGUub3B0aW9ucztcbiAgICAgIHZhciBmaWVsZFR5cGUgPSBvcHRzLnR5cGUgJiYgZm9ybWx5Q29uZmlnLmdldFR5cGUob3B0cy50eXBlKTtcbiAgICAgIHNpbXBsaWZ5TGlmZShvcHRzKTtcbiAgICAgIG1lcmdlRmllbGRPcHRpb25zV2l0aFR5cGVEZWZhdWx0cyhvcHRzLCBmaWVsZFR5cGUpO1xuICAgICAgZXh0ZW5kT3B0aW9uc1dpdGhEZWZhdWx0cyhvcHRzLCAkc2NvcGUuaW5kZXgpO1xuICAgICAgY2hlY2tBcGkob3B0cyk7XG4gICAgICAvLyBzZXQgZmllbGQgaWQgdG8gbGluayBsYWJlbHMgYW5kIGZpZWxkc1xuICAgICAgJHNjb3BlLmlkID0gZm9ybWx5VXRpbC5nZXRGaWVsZElkKCRzY29wZS5mb3JtSWQsIG9wdHMsICRzY29wZS5pbmRleCk7XG5cbiAgICAgIC8vIGluaXRhbGl6YXRpb25cbiAgICAgIHJ1bkV4cHJlc3Npb25zKCk7XG4gICAgICBzZXRGb3JtQ29udHJvbCgkc2NvcGUsIG9wdHMpO1xuICAgICAgYWRkTW9kZWxXYXRjaGVyKCRzY29wZSwgb3B0cyk7XG4gICAgICBhZGRWYWxpZGF0aW9uTWVzc2FnZXMob3B0cyk7XG4gICAgICAvLyBzaW1wbGlmeSB0aGluZ3NcbiAgICAgIC8vIGNyZWF0ZSAkc2NvcGUudG8gc28gdGVtcGxhdGUgYXV0aG9ycyBjYW4gcmVmZXJlbmNlIHRvIGluc3RlYWQgb2YgJHNjb3BlLm9wdGlvbnMudGVtcGxhdGVPcHRpb25zXG4gICAgICAkc2NvcGUudG8gPSAkc2NvcGUub3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnM7XG4gICAgICBpbnZva2VDb250cm9sbGVycygkc2NvcGUsIG9wdHMsIGZpZWxkVHlwZSk7XG5cbiAgICAgIC8vIGZ1bmN0aW9uIGRlZmluaXRpb25zXG4gICAgICBmdW5jdGlvbiBydW5FeHByZXNzaW9ucygpIHtcbiAgICAgICAgLy8gbXVzdCBydW4gb24gbmV4dCB0aWNrIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBjdXJyZW50IHZhbHVlIGlzIGNvcnJlY3QuXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uIHJ1bkV4cHJlc3Npb25zT25OZXh0VGljaygpIHtcbiAgICAgICAgICB2YXIgZmllbGQgPSAkc2NvcGUub3B0aW9ucztcbiAgICAgICAgICB2YXIgY3VycmVudFZhbHVlID0gdmFsdWVHZXR0ZXJTZXR0ZXIoKTtcbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2goZmllbGQuZXhwcmVzc2lvblByb3BlcnRpZXMsIGZ1bmN0aW9uIHJ1bkV4cHJlc3Npb24oZXhwcmVzc2lvbiwgcHJvcCkge1xuICAgICAgICAgICAgdmFyIHNldHRlciA9ICRwYXJzZShwcm9wKS5hc3NpZ247XG4gICAgICAgICAgICB2YXIgcHJvbWlzZSA9ICRxLndoZW4oZm9ybWx5VXRpbC5mb3JtbHlFdmFsKCRzY29wZSwgZXhwcmVzc2lvbiwgY3VycmVudFZhbHVlKSk7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24gc2V0RmllbGRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICAgICAgICBzZXR0ZXIoZmllbGQsIHZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdmFsdWVHZXR0ZXJTZXR0ZXIobmV3VmFsKSB7XG4gICAgICAgIGlmICghJHNjb3BlLm1vZGVsIHx8ICEkc2NvcGUub3B0aW9ucy5rZXkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG5ld1ZhbCkpIHtcbiAgICAgICAgICAkc2NvcGUubW9kZWxbJHNjb3BlLm9wdGlvbnMua2V5XSA9IG5ld1ZhbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJHNjb3BlLm1vZGVsWyRzY29wZS5vcHRpb25zLmtleV07XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHNpbXBsaWZ5TGlmZShvcHRpb25zKSB7XG4gICAgICAgIC8vIGFkZCBhIGZldyBlbXB0eSBvYmplY3RzIChpZiB0aGV5IGRvbid0IGFscmVhZHkgZXhpc3QpIHNvIHlvdSBkb24ndCBoYXZlIHRvIHVuZGVmaW5lZCBjaGVjayBldmVyeXdoZXJlXG4gICAgICAgIGZvcm1seVV0aWwucmV2ZXJzZURlZXBNZXJnZShvcHRpb25zLCB7XG4gICAgICAgICAgZGF0YToge30sXG4gICAgICAgICAgdGVtcGxhdGVPcHRpb25zOiB7fSxcbiAgICAgICAgICB2YWxpZGF0aW9uOiB7fVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gbWVyZ2VGaWVsZE9wdGlvbnNXaXRoVHlwZURlZmF1bHRzKG9wdGlvbnMsIHR5cGUpIHtcbiAgICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgICBtZXJnZU9wdGlvbnMob3B0aW9ucywgdHlwZS5kZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByb3Blck9yZGVyID0gYXJyYXlpZnkob3B0aW9ucy5vcHRpb25zVHlwZXMpLnJldmVyc2UoKTsgLy8gc28gdGhlIHJpZ2h0IHRoaW5ncyBhcmUgb3ZlcnJpZGRlblxuICAgICAgICBhbmd1bGFyLmZvckVhY2gocHJvcGVyT3JkZXIsIHR5cGVOYW1lID0+IHtcbiAgICAgICAgICBtZXJnZU9wdGlvbnMob3B0aW9ucywgZm9ybWx5Q29uZmlnLmdldFR5cGUodHlwZU5hbWUsIHRydWUsIG9wdGlvbnMpLmRlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG1lcmdlT3B0aW9ucyhvcHRpb25zLCBleHRyYU9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGV4dHJhT3B0aW9ucykge1xuICAgICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24oZXh0cmFPcHRpb25zKSkge1xuICAgICAgICAgICAgZXh0cmFPcHRpb25zID0gZXh0cmFPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmb3JtbHlVdGlsLnJldmVyc2VEZWVwTWVyZ2Uob3B0aW9ucywgZXh0cmFPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBleHRlbmRPcHRpb25zV2l0aERlZmF1bHRzKG9wdGlvbnMsIGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGtleSA9IG9wdGlvbnMua2V5IHx8IGluZGV4IHx8IDA7XG4gICAgICAgIGNvbnN0IGluaXRpYWxWYWx1ZSA9ICRzY29wZS5tb2RlbCAmJiAkc2NvcGUubW9kZWxba2V5XTtcbiAgICAgICAgYW5ndWxhci5leHRlbmQob3B0aW9ucywge1xuICAgICAgICAgIC8vIGF0dGFjaCB0aGUga2V5IGluIGNhc2UgdGhlIGZvcm1seS1maWVsZCBkaXJlY3RpdmUgaXMgdXNlZCBkaXJlY3RseVxuICAgICAgICAgIGtleSxcbiAgICAgICAgICB2YWx1ZTogdmFsdWVHZXR0ZXJTZXR0ZXIsXG4gICAgICAgICAgcnVuRXhwcmVzc2lvbnMsXG4gICAgICAgICAgcmVzZXRNb2RlbCxcbiAgICAgICAgICB1cGRhdGVJbml0aWFsVmFsdWUsXG4gICAgICAgICAgaW5pdGlhbFZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBpbml0aWFsaXphdGlvbiBmdW5jdGlvbnNcbiAgICAgIGZ1bmN0aW9uIHNldEZvcm1Db250cm9sKHNjb3BlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zLm5vRm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2NvcGUuJHdhdGNoKCdmb3JtW1wiJyArIHNjb3BlLmlkICsgJ1wiXScsIGZ1bmN0aW9uIG9uRm9ybUNvbnRyb2xDaGFuZ2UoZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICBpZiAoZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICAgIHNjb3BlLmZjID0gZm9ybUNvbnRyb2w7IC8vIHNob3J0Y3V0IGZvciB0ZW1wbGF0ZSBhdXRob3JzXG4gICAgICAgICAgICBzY29wZS5vcHRpb25zLmZvcm1Db250cm9sID0gZm9ybUNvbnRyb2w7XG4gICAgICAgICAgICBhZGRTaG93TWVzc2FnZXNXYXRjaGVyKHNjb3BlLCBvcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhZGRNb2RlbFdhdGNoZXIoc2NvcGUsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMubW9kZWwpIHtcbiAgICAgICAgICBzY29wZS4kd2F0Y2goJ29wdGlvbnMubW9kZWwnLCBydW5FeHByZXNzaW9ucywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYWRkU2hvd01lc3NhZ2VzV2F0Y2hlcihzY29wZSwgb3B0aW9ucykge1xuICAgICAgICBzY29wZS4kd2F0Y2goZnVuY3Rpb24gd2F0Y2hTaG93VmFsaWRhdGlvbkNoYW5nZSgpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHNjb3BlLm9wdGlvbnMudmFsaWRhdGlvbi5zaG93ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHJldHVybiBzY29wZS5mYy4kaW52YWxpZCAmJiBzY29wZS5vcHRpb25zLnZhbGlkYXRpb24uc2hvdztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IG5vVG91Y2hlZEJ1dERpcnR5ID0gKGFuZ3VsYXIuaXNVbmRlZmluZWQoc2NvcGUuZmMuJHRvdWNoZWQpICYmIHNjb3BlLmZjLiRkaXJ0eSk7XG4gICAgICAgICAgICByZXR1cm4gc2NvcGUuZmMuJGludmFsaWQgJiYgKHNjb3BlLmZjLiR0b3VjaGVkIHx8IG5vVG91Y2hlZEJ1dERpcnR5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uIG9uU2hvd1ZhbGlkYXRpb25DaGFuZ2Uoc2hvdykge1xuICAgICAgICAgIG9wdGlvbnMudmFsaWRhdGlvbi5lcnJvckV4aXN0c0FuZFNob3VsZEJlVmlzaWJsZSA9IHNob3c7XG4gICAgICAgICAgc2NvcGUuc2hvd0Vycm9yID0gc2hvdzsgLy8gc2hvcnRjdXQgZm9yIHRlbXBsYXRlIGF1dGhvcnNcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHJlc2V0TW9kZWwoKSB7XG4gICAgICAgICRzY29wZS5tb2RlbFskc2NvcGUub3B0aW9ucy5rZXldID0gJHNjb3BlLm9wdGlvbnMuaW5pdGlhbFZhbHVlO1xuICAgICAgICBpZiAoJHNjb3BlLm9wdGlvbnMuZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICAkc2NvcGUub3B0aW9ucy5mb3JtQ29udHJvbC4kc2V0Vmlld1ZhbHVlKCRzY29wZS5tb2RlbFskc2NvcGUub3B0aW9ucy5rZXldKTtcbiAgICAgICAgICAkc2NvcGUub3B0aW9ucy5mb3JtQ29udHJvbC4kcmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdXBkYXRlSW5pdGlhbFZhbHVlKCkge1xuICAgICAgICAkc2NvcGUub3B0aW9ucy5pbml0aWFsVmFsdWUgPSAkc2NvcGUubW9kZWxbJHNjb3BlLm9wdGlvbnMua2V5XTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYWRkVmFsaWRhdGlvbk1lc3NhZ2VzKG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucy52YWxpZGF0aW9uLm1lc3NhZ2VzID0gb3B0aW9ucy52YWxpZGF0aW9uLm1lc3NhZ2VzIHx8IHt9O1xuICAgICAgICBhbmd1bGFyLmZvckVhY2goZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzLm1lc3NhZ2VzLCBmdW5jdGlvbiBjcmVhdGVGdW5jdGlvbkZvck1lc3NhZ2UoZXhwcmVzc2lvbiwgbmFtZSkge1xuICAgICAgICAgIGlmICghb3B0aW9ucy52YWxpZGF0aW9uLm1lc3NhZ2VzW25hbWVdKSB7XG4gICAgICAgICAgICBvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXNbbmFtZV0gPSBmdW5jdGlvbiBldmFsdWF0ZU1lc3NhZ2Uodmlld1ZhbHVlLCBtb2RlbFZhbHVlLCBzY29wZSkge1xuICAgICAgICAgICAgICByZXR1cm4gZm9ybWx5VXRpbC5mb3JtbHlFdmFsKHNjb3BlLCBleHByZXNzaW9uLCBtb2RlbFZhbHVlLCB2aWV3VmFsdWUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBpbnZva2VDb250cm9sbGVycyhzY29wZSwgb3B0aW9ucyA9IHt9LCB0eXBlID0ge30pIHtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKFt0eXBlLmNvbnRyb2xsZXIsIG9wdGlvbnMuY29udHJvbGxlcl0sIGNvbnRyb2xsZXIgPT4ge1xuICAgICAgICAgIGlmIChjb250cm9sbGVyKSB7XG4gICAgICAgICAgICAkY29udHJvbGxlcihjb250cm9sbGVyLCB7JHNjb3BlOiBzY29wZX0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBsaW5rOiBmdW5jdGlvbiBmaWVsZExpbmsoc2NvcGUsIGVsKSB7XG4gICAgICB2YXIgdHlwZSA9IHNjb3BlLm9wdGlvbnMudHlwZSAmJiBmb3JtbHlDb25maWcuZ2V0VHlwZShzY29wZS5vcHRpb25zLnR5cGUpO1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICB2YXIgdGh1c2x5ID0gdGhpcztcbiAgICAgIGdldEZpZWxkVGVtcGxhdGUoc2NvcGUub3B0aW9ucylcbiAgICAgICAgLnRoZW4ocnVuTWFuaXB1bGF0b3JzKGZvcm1seUNvbmZpZy50ZW1wbGF0ZU1hbmlwdWxhdG9ycy5wcmVXcmFwcGVyKSlcbiAgICAgICAgLnRoZW4odHJhbnNjbHVkZUluV3JhcHBlcnMoc2NvcGUub3B0aW9ucykpXG4gICAgICAgIC50aGVuKHJ1bk1hbmlwdWxhdG9ycyhmb3JtbHlDb25maWcudGVtcGxhdGVNYW5pcHVsYXRvcnMucG9zdFdyYXBwZXIpKVxuICAgICAgICAudGhlbihzZXRFbGVtZW50VGVtcGxhdGUpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgZm9ybWx5V2FybihcbiAgICAgICAgICAgICd0aGVyZS13YXMtYS1wcm9ibGVtLXNldHRpbmctdGhlLXRlbXBsYXRlLWZvci10aGlzLWZpZWxkJyxcbiAgICAgICAgICAgICdUaGVyZSB3YXMgYSBwcm9ibGVtIHNldHRpbmcgdGhlIHRlbXBsYXRlIGZvciB0aGlzIGZpZWxkICcsXG4gICAgICAgICAgICBzY29wZS5vcHRpb25zLFxuICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgZnVuY3Rpb24gc2V0RWxlbWVudFRlbXBsYXRlKHRlbXBsYXRlRWwpIHtcbiAgICAgICAgZWwuaHRtbChhc0h0bWwodGVtcGxhdGVFbCkpO1xuICAgICAgICAkY29tcGlsZShlbC5jb250ZW50cygpKShzY29wZSk7XG4gICAgICAgIGlmICh0eXBlICYmIHR5cGUubGluaykge1xuICAgICAgICAgIHR5cGUubGluay5hcHBseSh0aHVzbHksIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY29wZS5vcHRpb25zLmxpbmspIHtcbiAgICAgICAgICBzY29wZS5vcHRpb25zLmxpbmsuYXBwbHkodGh1c2x5LCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBydW5NYW5pcHVsYXRvcnMobWFuaXB1bGF0b3JzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBydW5NYW5pcHVsYXRvcnNPblRlbXBsYXRlKHRlbXBsYXRlKSB7XG4gICAgICAgICAgdmFyIGNoYWluID0gJHEud2hlbih0ZW1wbGF0ZSk7XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKG1hbmlwdWxhdG9ycywgbWFuaXB1bGF0b3IgPT4ge1xuICAgICAgICAgICAgY2hhaW4gPSBjaGFpbi50aGVuKHRlbXBsYXRlID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4obWFuaXB1bGF0b3IodGVtcGxhdGUsIHNjb3BlLm9wdGlvbnMsIHNjb3BlKSkudGhlbihuZXdUZW1wbGF0ZSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuaXNTdHJpbmcobmV3VGVtcGxhdGUpID8gbmV3VGVtcGxhdGUgOiBhc0h0bWwobmV3VGVtcGxhdGUpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gYXNIdG1sKGVsKSB7XG4gICAgdmFyIHdyYXBwZXIgPSBhbmd1bGFyLmVsZW1lbnQoJzxhPjwvYT4nKTtcbiAgICByZXR1cm4gd3JhcHBlci5hcHBlbmQoZWwpLmh0bWwoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEZpZWxkVGVtcGxhdGUob3B0aW9ucykge1xuICAgIGxldCB0eXBlID0gZm9ybWx5Q29uZmlnLmdldFR5cGUob3B0aW9ucy50eXBlLCB0cnVlLCBvcHRpb25zKTtcbiAgICBsZXQgdGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlIHx8IHR5cGUgJiYgdHlwZS50ZW1wbGF0ZTtcbiAgICBsZXQgdGVtcGxhdGVVcmwgPSBvcHRpb25zLnRlbXBsYXRlVXJsIHx8IHR5cGUgJiYgdHlwZS50ZW1wbGF0ZVVybDtcbiAgICBpZiAoIXRlbXBsYXRlICYmICF0ZW1wbGF0ZVVybCkge1xuICAgICAgdGhyb3cgZm9ybWx5VXNhYmlsaXR5LmdldEZpZWxkRXJyb3IoXG4gICAgICAgICd0eXBlLXR5cGUtaGFzLW5vLXRlbXBsYXRlJyxcbiAgICAgICAgYFR5cGUgJyR7b3B0aW9ucy50eXBlfScgaGFzIG5vdCB0ZW1wbGF0ZS4gT24gZWxlbWVudDpgLCBvcHRpb25zXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0VGVtcGxhdGUodGVtcGxhdGUgfHwgdGVtcGxhdGVVcmwsICF0ZW1wbGF0ZSk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGdldFRlbXBsYXRlKHRlbXBsYXRlLCBpc1VybCkge1xuICAgIGlmICghaXNVcmwpIHtcbiAgICAgIHJldHVybiAkcS53aGVuKHRlbXBsYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGh0dHBPcHRpb25zID0ge2NhY2hlOiAkdGVtcGxhdGVDYWNoZX07XG4gICAgICByZXR1cm4gJGh0dHAuZ2V0KHRlbXBsYXRlLCBodHRwT3B0aW9ucylcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5kYXRhKVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gaGFuZGxlRXJyb3JHZXR0aW5nQVRlbXBsYXRlKGVycm9yKSB7XG4gICAgICAgICAgZm9ybWx5V2FybihcbiAgICAgICAgICAgICdwcm9ibGVtLWxvYWRpbmctdGVtcGxhdGUtZm9yLXRlbXBsYXRldXJsJyxcbiAgICAgICAgICAgICdQcm9ibGVtIGxvYWRpbmcgdGVtcGxhdGUgZm9yICcgKyB0ZW1wbGF0ZSxcbiAgICAgICAgICAgIGVycm9yXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNjbHVkZUluV3JhcHBlcnMob3B0aW9ucykge1xuICAgIGxldCB3cmFwcGVyID0gZ2V0V3JhcHBlck9wdGlvbihvcHRpb25zKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiB0cmFuc2NsdWRlVGVtcGxhdGUodGVtcGxhdGUpIHtcbiAgICAgIGlmICghd3JhcHBlci5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuICRxLndoZW4odGVtcGxhdGUpO1xuICAgICAgfVxuXG4gICAgICB3cmFwcGVyLmZvckVhY2goKHdyYXBwZXIpID0+IHtcbiAgICAgICAgZm9ybWx5VXNhYmlsaXR5LmNoZWNrV3JhcHBlcih3cmFwcGVyLCBvcHRpb25zKTtcbiAgICAgICAgd3JhcHBlci52YWxpZGF0ZU9wdGlvbnMgJiYgd3JhcHBlci52YWxpZGF0ZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIHJ1bkFwaUNoZWNrKHdyYXBwZXIsIG9wdGlvbnMpO1xuICAgICAgfSk7XG4gICAgICBsZXQgcHJvbWlzZXMgPSB3cmFwcGVyLm1hcCh3ID0+IGdldFRlbXBsYXRlKHcudGVtcGxhdGUgfHwgdy50ZW1wbGF0ZVVybCwgIXcudGVtcGxhdGUpKTtcbiAgICAgIHJldHVybiAkcS5hbGwocHJvbWlzZXMpLnRoZW4od3JhcHBlcnNUZW1wbGF0ZXMgPT4ge1xuICAgICAgICB3cmFwcGVyc1RlbXBsYXRlcy5mb3JFYWNoKCh3cmFwcGVyVGVtcGxhdGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgZm9ybWx5VXNhYmlsaXR5LmNoZWNrV3JhcHBlclRlbXBsYXRlKHdyYXBwZXJUZW1wbGF0ZSwgd3JhcHBlcltpbmRleF0pO1xuICAgICAgICB9KTtcbiAgICAgICAgd3JhcHBlcnNUZW1wbGF0ZXMucmV2ZXJzZSgpOyAvLyB3cmFwcGVyIDAgaXMgd3JhcHBlZCBpbiB3cmFwcGVyIDEgYW5kIHNvIG9uLi4uXG4gICAgICAgIGxldCB0b3RhbFdyYXBwZXIgPSB3cmFwcGVyc1RlbXBsYXRlcy5zaGlmdCgpO1xuICAgICAgICB3cmFwcGVyc1RlbXBsYXRlcy5mb3JFYWNoKHdyYXBwZXJUZW1wbGF0ZSA9PiB7XG4gICAgICAgICAgdG90YWxXcmFwcGVyID0gZG9UcmFuc2NsdXNpb24odG90YWxXcmFwcGVyLCB3cmFwcGVyVGVtcGxhdGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRvVHJhbnNjbHVzaW9uKHRvdGFsV3JhcHBlciwgdGVtcGxhdGUpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRvVHJhbnNjbHVzaW9uKHdyYXBwZXIsIHRlbXBsYXRlKSB7XG4gICAgbGV0IHN1cGVyV3JhcHBlciA9IGFuZ3VsYXIuZWxlbWVudCgnPGE+PC9hPicpOyAvLyB0aGlzIGFsbG93cyBwZW9wbGUgbm90IGhhdmUgdG8gaGF2ZSBhIHNpbmdsZSByb290IGluIHdyYXBwZXJzXG4gICAgc3VwZXJXcmFwcGVyLmFwcGVuZCh3cmFwcGVyKTtcbiAgICBsZXQgdHJhbnNjbHVkZUVsID0gc3VwZXJXcmFwcGVyLmZpbmQoJ2Zvcm1seS10cmFuc2NsdWRlJyk7XG4gICAgaWYgKCF0cmFuc2NsdWRlRWwubGVuZ3RoKSB7XG4gICAgICAvL3RyeSBpdCB1c2luZyBvdXIgY3VzdG9tIGZpbmQgZnVuY3Rpb25cbiAgICAgIHRyYW5zY2x1ZGVFbCA9IGZvcm1seVV0aWwuZmluZEJ5Tm9kZU5hbWUoc3VwZXJXcmFwcGVyLCAnZm9ybWx5LXRyYW5zY2x1ZGUnKTtcbiAgICB9XG4gICAgdHJhbnNjbHVkZUVsLnJlcGxhY2VXaXRoKHRlbXBsYXRlKTtcbiAgICByZXR1cm4gc3VwZXJXcmFwcGVyLmh0bWwoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFdyYXBwZXJPcHRpb24ob3B0aW9ucykge1xuICAgIGxldCB3cmFwcGVyID0gb3B0aW9ucy53cmFwcGVyO1xuICAgIC8vIGV4cGxpY2l0IG51bGwgbWVhbnMgbm8gd3JhcHBlclxuICAgIGlmICh3cmFwcGVyID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgLy8gbm90aGluZyBzcGVjaWZpZWQgbWVhbnMgdXNlIHRoZSBkZWZhdWx0IHdyYXBwZXIgZm9yIHRoZSB0eXBlXG4gICAgaWYgKCF3cmFwcGVyKSB7XG4gICAgICAvLyBnZXQgYWxsIHdyYXBwZXJzIHRoYXQgc3BlY2lmeSB0aGV5IGFwcGx5IHRvIHRoaXMgdHlwZVxuICAgICAgd3JhcHBlciA9IGFycmF5aWZ5KGZvcm1seUNvbmZpZy5nZXRXcmFwcGVyQnlUeXBlKG9wdGlvbnMudHlwZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3cmFwcGVyID0gYXJyYXlpZnkod3JhcHBlcikubWFwKGZvcm1seUNvbmZpZy5nZXRXcmFwcGVyKTtcbiAgICB9XG5cbiAgICAvLyBnZXQgYWxsIHdyYXBwZXJzIGZvciB0aGF0IHRoaXMgdHlwZSBzcGVjaWZpZWQgdGhhdCBpdCB1c2VzLlxuICAgIHZhciB0eXBlID0gZm9ybWx5Q29uZmlnLmdldFR5cGUob3B0aW9ucy50eXBlLCB0cnVlLCBvcHRpb25zKTtcbiAgICBpZiAodHlwZSAmJiB0eXBlLndyYXBwZXIpIHtcbiAgICAgIGxldCB0eXBlV3JhcHBlcnMgPSBhcnJheWlmeSh0eXBlLndyYXBwZXIpLm1hcChmb3JtbHlDb25maWcuZ2V0V3JhcHBlcik7XG4gICAgICB3cmFwcGVyID0gd3JhcHBlci5jb25jYXQodHlwZVdyYXBwZXJzKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgdGhlIGRlZmF1bHQgd3JhcHBlciBsYXN0XG4gICAgdmFyIGRlZmF1bHRXcmFwcGVyID0gZm9ybWx5Q29uZmlnLmdldFdyYXBwZXIoKTtcbiAgICBpZiAoZGVmYXVsdFdyYXBwZXIpIHtcbiAgICAgIHdyYXBwZXIucHVzaChkZWZhdWx0V3JhcHBlcik7XG4gICAgfVxuICAgIHJldHVybiB3cmFwcGVyO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tBcGkob3B0aW9ucykge1xuICAgIGZvcm1seUFwaUNoZWNrLnRocm93KGZvcm1seUFwaUNoZWNrLmZvcm1seUZpZWxkT3B0aW9ucywgb3B0aW9ucywge1xuICAgICAgcHJlZml4OiAnZm9ybWx5LWZpZWxkIGRpcmVjdGl2ZScsXG4gICAgICB1cmw6ICdmb3JtbHktZmllbGQtZGlyZWN0aXZlLXZhbGlkYXRpb24tZmFpbGVkJ1xuICAgIH0pO1xuICAgIC8vIHZhbGlkYXRlIHdpdGggdGhlIHR5cGVcbiAgICBjb25zdCB0eXBlID0gb3B0aW9ucy50eXBlICYmIGZvcm1seUNvbmZpZy5nZXRUeXBlKG9wdGlvbnMudHlwZSk7XG4gICAgaWYgKHR5cGUpIHtcbiAgICAgIGlmICh0eXBlLnZhbGlkYXRlT3B0aW9ucykge1xuICAgICAgICB0eXBlLnZhbGlkYXRlT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIHJ1bkFwaUNoZWNrKHR5cGUsIG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1bkFwaUNoZWNrKHthcGlDaGVjaywgYXBpQ2hlY2tJbnN0YW5jZSwgYXBpQ2hlY2tGdW5jdGlvbiwgYXBpQ2hlY2tPcHRpb25zfSwgb3B0aW9ucykge1xuICAgIGlmICghYXBpQ2hlY2spIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaW5zdGFuY2UgPSBhcGlDaGVja0luc3RhbmNlIHx8IGZvcm1seUFwaUNoZWNrO1xuICAgIGNvbnN0IGZuID0gYXBpQ2hlY2tGdW5jdGlvbiB8fCAnd2Fybic7XG4gICAgY29uc3Qgc2hhcGUgPSBpbnN0YW5jZS5zaGFwZShhcGlDaGVjayk7XG4gICAgaW5zdGFuY2VbZm5dKHNoYXBlLCBvcHRpb25zLCBhcGlDaGVja09wdGlvbnMgfHwge1xuICAgICAgcHJlZml4OiBgZm9ybWx5LWZpZWxkICR7bmFtZX1gLFxuICAgICAgdXJsOiBmb3JtbHlBcGlDaGVjay5jb25maWcub3V0cHV0LmRvY3NCYXNlVXJsICsgJ2Zvcm1seS1maWVsZC10eXBlLWFwaWNoZWNrLWZhaWxlZCdcbiAgICB9KTtcbiAgfVxuXG59XG5cbmZ1bmN0aW9uIGFycmF5aWZ5KG9iaikge1xuICBpZiAob2JqICYmICFhbmd1bGFyLmlzQXJyYXkob2JqKSkge1xuICAgIG9iaiA9IFtvYmpdO1xuICB9IGVsc2UgaWYgKCFvYmopIHtcbiAgICBvYmogPSBbXTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vZGlyZWN0aXZlcy9mb3JtbHktZmllbGQuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmb3JtbHlGb2N1cztcblxuLy8gQG5nSW5qZWN0XG5mdW5jdGlvbiBmb3JtbHlGb2N1cygkdGltZW91dCwgJGRvY3VtZW50KSB7XG4gIC8qIGpzaGludCAtVzA1MiAqL1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgbGluazogZnVuY3Rpb24gZm9ybWx5Rm9jdXNMaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgdmFyIHByZXZpb3VzRWwgPSBudWxsO1xuICAgICAgdmFyIGVsID0gZWxlbWVudFswXTtcbiAgICAgIHZhciBkb2MgPSAkZG9jdW1lbnRbMF07XG4gICAgICBhdHRycy4kb2JzZXJ2ZSgnZm9ybWx5Rm9jdXMnLCBmdW5jdGlvbiByZXNwb25kVG9Gb2N1c0V4cHJlc3Npb25DaGFuZ2UodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiBzZXRFbGVtZW50Rm9jdXMoKSB7XG4gICAgICAgICAgICBwcmV2aW91c0VsID0gZG9jLmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICBlbC5mb2N1cygpO1xuICAgICAgICAgIH0sIH5+YXR0cnMuZm9jdXNXYWl0KTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJ2ZhbHNlJykge1xuICAgICAgICAgIGlmIChkb2MuYWN0aXZlRWxlbWVudCA9PT0gZWwpIHtcbiAgICAgICAgICAgIGVsLmJsdXIoKTtcbiAgICAgICAgICAgIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eSgncmVmb2N1cycpICYmIHByZXZpb3VzRWwpIHtcbiAgICAgICAgICAgICAgcHJldmlvdXNFbC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vZGlyZWN0aXZlcy9mb3JtbHktZm9jdXMuanNcbiAqKi8iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyLWZpeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1seUZvcm07XG5cbi8qKlxuICogQG5nZG9jIGRpcmVjdGl2ZVxuICogQG5hbWUgZm9ybWx5Rm9ybVxuICogQHJlc3RyaWN0IEVcbiAqL1xuLy8gQG5nSW5qZWN0XG5mdW5jdGlvbiBmb3JtbHlGb3JtKGZvcm1seVVzYWJpbGl0eSwgJHBhcnNlLCBmb3JtbHlBcGlDaGVjaywgZm9ybWx5Q29uZmlnKSB7XG4gIHZhciBjdXJyZW50Rm9ybUlkID0gMTtcbiAgdmFyIG9wdGlvbnNBcGkgPSBbXG4gICAgZm9ybWx5QXBpQ2hlY2suc2hhcGUoe1xuICAgICAgZm9ybVN0YXRlOiBmb3JtbHlBcGlDaGVjay5vYmplY3Qub3B0aW9uYWwsXG4gICAgICByZXNldE1vZGVsOiBmb3JtbHlBcGlDaGVjay5mdW5jLm9wdGlvbmFsLFxuICAgICAgdXBkYXRlSW5pdGlhbFZhbHVlOiBmb3JtbHlBcGlDaGVjay5mdW5jLm9wdGlvbmFsLFxuICAgICAgcmVtb3ZlQ2hyb21lQXV0b0NvbXBsZXRlOiBmb3JtbHlBcGlDaGVjay5ib29sLm9wdGlvbmFsXG4gICAgfSkuc3RyaWN0Lm9wdGlvbmFsXG4gIF07XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICB0ZW1wbGF0ZTogZnVuY3Rpb24gZm9ybWx5Rm9ybUdldFRlbXBsYXRlKGVsLCBhdHRycykge1xuICAgICAgLyoganNoaW50IC1XMDMzICovIC8vIHRoaXMgYmVjYXVzZSBqc2hpbnQgaXMgYnJva2VuIEkgZ3Vlc3MuLi5cbiAgICAgIGNvbnN0IHJvb3RFbCA9IGF0dHJzLnJvb3RFbCB8fCAnbmctZm9ybSc7XG4gICAgICBjb25zdCBmb3JtTmFtZSA9IGBmb3JtbHlfJHtjdXJyZW50Rm9ybUlkKyt9YDtcbiAgICAgIHJldHVybiBgXG4gICAgICAgIDwke3Jvb3RFbH0gY2xhc3M9XCJmb3JtbHlcIlxuICAgICAgICAgICAgICAgICBuYW1lPVwiJHtmb3JtTmFtZX1cIlxuICAgICAgICAgICAgICAgICByb2xlPVwiZm9ybVwiPlxuICAgICAgICAgIDxkaXYgZm9ybWx5LWZpZWxkXG4gICAgICAgICAgICAgICBuZy1yZXBlYXQ9XCJmaWVsZCBpbiBmaWVsZHMgdHJhY2sgYnkgJGluZGV4XCJcbiAgICAgICAgICAgICAgIG5nLWlmPVwiIWZpZWxkLmhpZGVcIlxuICAgICAgICAgICAgICAgY2xhc3M9XCJmb3JtbHktZmllbGQge3tmaWVsZC50eXBlID8gJ2Zvcm1seS1maWVsZC0nICsgZmllbGQudHlwZSA6ICcnfX1cIlxuICAgICAgICAgICAgICAgb3B0aW9ucz1cImZpZWxkXCJcbiAgICAgICAgICAgICAgIG1vZGVsPVwiZmllbGQubW9kZWwgfHwgbW9kZWxcIlxuICAgICAgICAgICAgICAgZmllbGRzPVwiZmllbGRzXCJcbiAgICAgICAgICAgICAgIGZvcm09XCIke2Zvcm1OYW1lfVwiXG4gICAgICAgICAgICAgICBmb3JtLWlkPVwiJHtmb3JtTmFtZX1cIlxuICAgICAgICAgICAgICAgZm9ybS1zdGF0ZT1cIm9wdGlvbnMuZm9ybVN0YXRlXCJcbiAgICAgICAgICAgICAgIGluZGV4PVwiJGluZGV4XCI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBuZy10cmFuc2NsdWRlPjwvZGl2PlxuICAgICAgICA8LyR7cm9vdEVsfT5cbiAgICAgIGA7XG4gICAgfSxcbiAgICByZXBsYWNlOiB0cnVlLFxuICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgc2NvcGU6IHtcbiAgICAgIGZpZWxkczogJz0nLFxuICAgICAgbW9kZWw6ICc9JyxcbiAgICAgIGZvcm06ICc9PycsXG4gICAgICBvcHRpb25zOiAnPT8nXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiAvKiBAbmdJbmplY3QgKi8gZnVuY3Rpb24gRm9ybWx5Rm9ybUNvbnRyb2xsZXIoJHNjb3BlKSB7XG4gICAgICBzZXR1cE9wdGlvbnMoKTtcbiAgICAgICRzY29wZS5tb2RlbCA9ICRzY29wZS5tb2RlbCB8fCB7fTtcbiAgICAgICRzY29wZS5maWVsZHMgPSAkc2NvcGUuZmllbGRzIHx8IFtdO1xuXG4gICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgYXR0YWNoS2V5KTsgLy8gYXR0YWNoZXMgYSBrZXkgYmFzZWQgb24gdGhlIGluZGV4IGlmIGEga2V5IGlzbid0IHNwZWNpZmllZFxuICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5maWVsZHMsIHNldHVwV2F0Y2hlcnMpOyAvLyBzZXR1cCB3YXRjaGVycyBmb3IgYWxsIGZpZWxkc1xuXG4gICAgICAvLyB3YXRjaCB0aGUgbW9kZWwgYW5kIGV2YWx1YXRlIHdhdGNoIGV4cHJlc3Npb25zIHRoYXQgZGVwZW5kIG9uIGl0LlxuICAgICAgJHNjb3BlLiR3YXRjaCgnbW9kZWwnLCBmdW5jdGlvbiBvblJlc3VsdFVwZGF0ZShuZXdSZXN1bHQpIHtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5maWVsZHMsIGZ1bmN0aW9uIHJ1bkZpZWxkRXhwcmVzc2lvblByb3BlcnRpZXMoZmllbGQpIHtcbiAgICAgICAgICAvKmpzaGludCAtVzAzMCAqL1xuICAgICAgICAgIGZpZWxkLnJ1bkV4cHJlc3Npb25zICYmIGZpZWxkLnJ1bkV4cHJlc3Npb25zKG5ld1Jlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgIGZ1bmN0aW9uIHNldHVwT3B0aW9ucygpIHtcbiAgICAgICAgZm9ybWx5QXBpQ2hlY2sudGhyb3cob3B0aW9uc0FwaSwgWyRzY29wZS5vcHRpb25zXSwge3ByZWZpeDogJ2Zvcm1seS1mb3JtIG9wdGlvbnMgY2hlY2snfSk7XG4gICAgICAgICRzY29wZS5vcHRpb25zID0gJHNjb3BlLm9wdGlvbnMgfHwge307XG4gICAgICAgICRzY29wZS5vcHRpb25zLmZvcm1TdGF0ZSA9ICRzY29wZS5vcHRpb25zLmZvcm1TdGF0ZSB8fCB7fTtcblxuICAgICAgICBhbmd1bGFyLmV4dGVuZCgkc2NvcGUub3B0aW9ucywge1xuICAgICAgICAgIHVwZGF0ZUluaXRpYWxWYWx1ZSxcbiAgICAgICAgICByZXNldE1vZGVsXG4gICAgICAgIH0pO1xuXG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHVwZGF0ZUluaXRpYWxWYWx1ZSgpIHtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5maWVsZHMsIGZpZWxkID0+IGZpZWxkLnVwZGF0ZUluaXRpYWxWYWx1ZSgpKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gcmVzZXRNb2RlbCgpIHtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5maWVsZHMsIGZpZWxkID0+IGZpZWxkLnJlc2V0TW9kZWwoKSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGF0dGFjaEtleShmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgZmllbGQua2V5ID0gZmllbGQua2V5IHx8IGluZGV4IHx8IDA7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHNldHVwV2F0Y2hlcnMoZmllbGQsIGluZGV4KSB7XG4gICAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoZmllbGQud2F0Y2hlcikpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHdhdGNoZXJzID0gZmllbGQud2F0Y2hlcjtcbiAgICAgICAgaWYgKCFhbmd1bGFyLmlzQXJyYXkod2F0Y2hlcnMpKSB7XG4gICAgICAgICAgd2F0Y2hlcnMgPSBbd2F0Y2hlcnNdO1xuICAgICAgICB9XG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh3YXRjaGVycywgZnVuY3Rpb24gc2V0dXBXYXRjaGVyKHdhdGNoZXIpIHtcbiAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKHdhdGNoZXIubGlzdGVuZXIpKSB7XG4gICAgICAgICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHkuZ2V0RmllbGRFcnJvcihcbiAgICAgICAgICAgICAgJ2FsbC1maWVsZC13YXRjaGVycy1tdXN0LWhhdmUtYS1saXN0ZW5lcicsXG4gICAgICAgICAgICAgICdBbGwgZmllbGQgd2F0Y2hlcnMgbXVzdCBoYXZlIGEgbGlzdGVuZXInLCBmaWVsZFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHdhdGNoRXhwcmVzc2lvbiA9IGdldFdhdGNoRXhwcmVzc2lvbih3YXRjaGVyLCBmaWVsZCwgaW5kZXgpO1xuICAgICAgICAgIHZhciB3YXRjaExpc3RlbmVyID0gZ2V0V2F0Y2hMaXN0ZW5lcih3YXRjaGVyLCBmaWVsZCwgaW5kZXgpO1xuXG4gICAgICAgICAgdmFyIHR5cGUgPSB3YXRjaGVyLnR5cGUgfHwgJyR3YXRjaCc7XG4gICAgICAgICAgd2F0Y2hlci5zdG9wV2F0Y2hpbmcgPSAkc2NvcGVbdHlwZV0od2F0Y2hFeHByZXNzaW9uLCB3YXRjaExpc3RlbmVyLCB3YXRjaGVyLndhdGNoRGVlcCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRXYXRjaEV4cHJlc3Npb24od2F0Y2hlciwgZmllbGQsIGluZGV4KSB7XG4gICAgICAgIHZhciB3YXRjaEV4cHJlc3Npb24gPSB3YXRjaGVyLmV4cHJlc3Npb24gfHwgYG1vZGVsWycke2ZpZWxkLmtleX0nXWA7XG4gICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24od2F0Y2hFeHByZXNzaW9uKSkge1xuICAgICAgICAgIC8vIHdyYXAgdGhlIGZpZWxkJ3Mgd2F0Y2ggZXhwcmVzc2lvbiBzbyB3ZSBjYW4gY2FsbCBpdCB3aXRoIHRoZSBmaWVsZCBhcyB0aGUgZmlyc3QgYXJnXG4gICAgICAgICAgLy8gYW5kIHRoZSBzdG9wIGZ1bmN0aW9uIGFzIHRoZSBsYXN0IGFyZyBhcyBhIGhlbHBlclxuICAgICAgICAgIHZhciBvcmlnaW5hbEV4cHJlc3Npb24gPSB3YXRjaEV4cHJlc3Npb247XG4gICAgICAgICAgd2F0Y2hFeHByZXNzaW9uID0gZnVuY3Rpb24gZm9ybWx5V2F0Y2hFeHByZXNzaW9uKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBtb2RpZnlBcmdzKHdhdGNoZXIsIGluZGV4LCAuLi5hcmd1bWVudHMpO1xuICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsRXhwcmVzc2lvbiguLi5hcmdzKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHdhdGNoRXhwcmVzc2lvbi5kaXNwbGF5TmFtZSA9IGBGb3JtbHkgV2F0Y2ggRXhwcmVzc2lvbiBmb3IgZmllbGQgZm9yICR7ZmllbGQua2V5fWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdhdGNoRXhwcmVzc2lvbjtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZ2V0V2F0Y2hMaXN0ZW5lcih3YXRjaGVyLCBmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgdmFyIHdhdGNoTGlzdGVuZXIgPSB3YXRjaGVyLmxpc3RlbmVyO1xuICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHdhdGNoTGlzdGVuZXIpKSB7XG4gICAgICAgICAgLy8gd3JhcCB0aGUgZmllbGQncyB3YXRjaCBsaXN0ZW5lciBzbyB3ZSBjYW4gY2FsbCBpdCB3aXRoIHRoZSBmaWVsZCBhcyB0aGUgZmlyc3QgYXJnXG4gICAgICAgICAgLy8gYW5kIHRoZSBzdG9wIGZ1bmN0aW9uIGFzIHRoZSBsYXN0IGFyZyBhcyBhIGhlbHBlclxuICAgICAgICAgIHZhciBvcmlnaW5hbExpc3RlbmVyID0gd2F0Y2hMaXN0ZW5lcjtcbiAgICAgICAgICB3YXRjaExpc3RlbmVyID0gZnVuY3Rpb24gZm9ybWx5V2F0Y2hMaXN0ZW5lcigpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gbW9kaWZ5QXJncyh3YXRjaGVyLCBpbmRleCwgLi4uYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbExpc3RlbmVyKC4uLmFyZ3MpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgd2F0Y2hMaXN0ZW5lci5kaXNwbGF5TmFtZSA9IGBGb3JtbHkgV2F0Y2ggTGlzdGVuZXIgZm9yIGZpZWxkIGZvciAke2ZpZWxkLmtleX1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB3YXRjaExpc3RlbmVyO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBtb2RpZnlBcmdzKHdhdGNoZXIsIGluZGV4LCAuLi5vcmlnaW5hbEFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIFskc2NvcGUuZmllbGRzW2luZGV4XSwgLi4ub3JpZ2luYWxBcmdzLCB3YXRjaGVyLnN0b3BXYXRjaGluZ107XG4gICAgICB9XG4gICAgfSxcbiAgICBsaW5rKHNjb3BlLCBlbCwgYXR0cnMpIHtcbiAgICAgIGlmIChhdHRycy5mb3JtKSB7XG4gICAgICAgIGNvbnN0IGZvcm1JZCA9IGF0dHJzLm5hbWU7XG4gICAgICAgICRwYXJzZShhdHRycy5mb3JtKS5hc3NpZ24oc2NvcGUuJHBhcmVudCwgc2NvcGVbZm9ybUlkXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNocm9tZSBhdXRvY29tcGxldGUgbGFtZW5lc3NcbiAgICAgIC8vIHNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY4MTUzI2MxNFxuICAgICAgLy8g4YOaKOCyoOebiuCyoOGDmikgICAo4pWvwrDilqHCsCnila/vuLUg4pS74pSB4pS7ICAgICjil57igLjil5/vvJspXG4gICAgICBjb25zdCBnbG9iYWwgPSBmb3JtbHlDb25maWcuZXh0cmFzLnJlbW92ZUNocm9tZUF1dG9Db21wbGV0ZSA9PT0gdHJ1ZTtcbiAgICAgIGNvbnN0IG9mZkluc3RhbmNlID0gc2NvcGUub3B0aW9ucyAmJiBzY29wZS5vcHRpb25zLnJlbW92ZUNocm9tZUF1dG9Db21wbGV0ZSA9PT0gZmFsc2U7XG4gICAgICBjb25zdCBvbkluc3RhbmNlID0gc2NvcGUub3B0aW9ucyAmJiBzY29wZS5vcHRpb25zLnJlbW92ZUNocm9tZUF1dG9Db21wbGV0ZSA9PT0gdHJ1ZTtcbiAgICAgIGlmICgoZ2xvYmFsICYmICFvZmZJbnN0YW5jZSkgfHwgb25JbnN0YW5jZSkge1xuICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnYXV0b2NvbXBsZXRlJywgJ2FkZHJlc3MtbGV2ZWw0Jyk7XG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgdHJ1ZSk7XG4gICAgICAgIGVsWzBdLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9kaXJlY3RpdmVzL2Zvcm1seS1mb3JtLmpzXG4gKiovIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhci1maXgnO1xuXG5leHBvcnQgZGVmYXVsdCBhZGRGb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvcjtcblxuLy8gQG5nSW5qZWN0XG5mdW5jdGlvbiBhZGRGb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvcihmb3JtbHlDb25maWcpIHtcbiAgaWYgKGZvcm1seUNvbmZpZy5leHRyYXMuZGlzYWJsZU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvcm1seUNvbmZpZy50ZW1wbGF0ZU1hbmlwdWxhdG9ycy5wcmVXcmFwcGVyLnB1c2gobmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IpO1xuXG5cbiAgZnVuY3Rpb24gbmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IodGVtcGxhdGUsIG9wdGlvbnMsIHNjb3BlKSB7XG4gICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NiAqL1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHZhciBkYXRhID0gb3B0aW9ucy5kYXRhO1xuICAgIGlmIChkYXRhLnNraXBOZ01vZGVsQXR0cnNNYW5pcHVsYXRvciA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH1cbiAgICBlbC5pbm5lckhUTUwgPSB0ZW1wbGF0ZTtcbiAgICB2YXIgbW9kZWxOb2RlcyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tuZy1tb2RlbF0nKTtcbiAgICBpZiAoIW1vZGVsTm9kZXMgfHwgIW1vZGVsTm9kZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgfVxuXG4gICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsTm9kZXMsICdpZCcsIHNjb3BlLmlkKTtcbiAgICBhZGRJZk5vdFByZXNlbnQobW9kZWxOb2RlcywgJ25hbWUnLCBzY29wZS5pZCk7XG5cbiAgICBhZGRWYWxpZGF0aW9uKCk7XG4gICAgYWRkTW9kZWxPcHRpb25zKCk7XG4gICAgYWRkVGVtcGxhdGVPcHRpb25zQXR0cnMoKTtcblxuXG4gICAgcmV0dXJuIGVsLmlubmVySFRNTDtcblxuXG4gICAgZnVuY3Rpb24gYWRkVmFsaWRhdGlvbigpIHtcbiAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLnZhbGlkYXRvcnMpIHx8IGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlcykpIHtcbiAgICAgICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsTm9kZXMsICdmb3JtbHktY3VzdG9tLXZhbGlkYXRpb24nLCAnJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkTW9kZWxPcHRpb25zKCkge1xuICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMubW9kZWxPcHRpb25zKSkge1xuICAgICAgICBhZGRJZk5vdFByZXNlbnQobW9kZWxOb2RlcywgJ25nLW1vZGVsLW9wdGlvbnMnLCAnb3B0aW9ucy5tb2RlbE9wdGlvbnMnKTtcbiAgICAgICAgaWYgKG9wdGlvbnMubW9kZWxPcHRpb25zLmdldHRlclNldHRlcikge1xuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChtb2RlbE5vZGVzLCBub2RlID0+IHtcbiAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKCduZy1tb2RlbCcsICdvcHRpb25zLnZhbHVlJyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUZW1wbGF0ZU9wdGlvbnNBdHRycygpIHtcbiAgICAgIGlmICghb3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnMgJiYgIW9wdGlvbnMuZXhwcmVzc2lvblByb3BlcnRpZXMpIHtcbiAgICAgICAgLy8gbm8gbmVlZCB0byBydW4gdGhlc2UgaWYgdGhlcmUgYXJlIG5vIHRlbXBsYXRlT3B0aW9ucyBvciBleHByZXNzaW9uUHJvcGVydGllc1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCB0byA9IG9wdGlvbnMudGVtcGxhdGVPcHRpb25zIHx8IHt9O1xuICAgICAgY29uc3QgZXAgPSBvcHRpb25zLmV4cHJlc3Npb25Qcm9wZXJ0aWVzIHx8IHt9O1xuXG4gICAgICBsZXQgbmdNb2RlbEF0dHJpYnV0ZXMgPSBnZXRCdWlsdEluQXR0cmlidXRlcygpO1xuXG4gICAgICAvLyBleHRlbmQgd2l0aCB0aGUgdXNlcidzIHNwZWNpZmljYXRpb25zIHdpbm5pbmdcbiAgICAgIGFuZ3VsYXIuZXh0ZW5kKG5nTW9kZWxBdHRyaWJ1dGVzLCBvcHRpb25zLm5nTW9kZWxBdHRycyk7XG5cbiAgICAgIC8vIEZlZWwgZnJlZSB0byBtYWtlIHRoaXMgbW9yZSBzaW1wbGUgOi0pXG4gICAgICBhbmd1bGFyLmZvckVhY2gobmdNb2RlbEF0dHJpYnV0ZXMsICh2YWwsIG5hbWUpID0+IHtcbiAgICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6MTQgKi9cbiAgICAgICAgbGV0IGF0dHJWYWw7XG4gICAgICAgIGxldCBhdHRyTmFtZTtcbiAgICAgICAgY29uc3QgcmVmID0gYG9wdGlvbnMudGVtcGxhdGVPcHRpb25zWycke25hbWV9J11gO1xuICAgICAgICBjb25zdCB0b1ZhbCA9IHRvW25hbWVdO1xuICAgICAgICBjb25zdCBlcFZhbCA9IGdldEVwVmFsdWUoZXAsIG5hbWUpO1xuXG4gICAgICAgIGNvbnN0IGluVG8gPSBhbmd1bGFyLmlzRGVmaW5lZCh0b1ZhbCk7XG4gICAgICAgIGNvbnN0IGluRXAgPSBhbmd1bGFyLmlzRGVmaW5lZChlcFZhbCk7XG4gICAgICAgIGlmICh2YWwudmFsdWUpIHtcbiAgICAgICAgICAvLyBJIHJlYWxpemUgdGhpcyBsb29rcyBiYWNrd2FyZHMsIGJ1dCBpdCdzIHJpZ2h0LCB0cnVzdCBtZS4uLlxuICAgICAgICAgIGF0dHJOYW1lID0gdmFsLnZhbHVlO1xuICAgICAgICAgIGF0dHJWYWwgPSBuYW1lO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbC5leHByZXNzaW9uICYmIGluVG8pIHtcbiAgICAgICAgICBhdHRyTmFtZSA9IHZhbC5leHByZXNzaW9uO1xuICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKHRvW25hbWVdKSkge1xuICAgICAgICAgICAgYXR0clZhbCA9IGAkZXZhbCgke3JlZn0pYDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih0b1tuYW1lXSkpIHtcbiAgICAgICAgICAgIGF0dHJWYWwgPSBgJHtyZWZ9KG1vZGVsW29wdGlvbnMua2V5XSwgb3B0aW9ucywgdGhpcywgJGV2ZW50KWA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgYG9wdGlvbnMudGVtcGxhdGVPcHRpb25zLiR7bmFtZX0gbXVzdCBiZSBhIHN0cmluZyBvciBmdW5jdGlvbjogJHtKU09OLnN0cmluZ2lmeShvcHRpb25zKX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh2YWwuYm91bmQgJiYgaW5FcCkge1xuICAgICAgICAgIGF0dHJOYW1lID0gdmFsLmJvdW5kO1xuICAgICAgICAgIGF0dHJWYWwgPSByZWY7XG4gICAgICAgIH0gZWxzZSBpZiAoKHZhbC5hdHRyaWJ1dGUgfHwgdmFsLmJvb2xlYW4pICYmIGluRXApIHtcbiAgICAgICAgICBhdHRyTmFtZSA9IHZhbC5hdHRyaWJ1dGUgfHwgdmFsLmJvb2xlYW47XG4gICAgICAgICAgYXR0clZhbCA9IGB7eyR7cmVmfX19YDtcbiAgICAgICAgfSBlbHNlIGlmICh2YWwuYXR0cmlidXRlICYmIGluVG8pIHtcbiAgICAgICAgICBhdHRyTmFtZSA9IHZhbC5hdHRyaWJ1dGU7XG4gICAgICAgICAgYXR0clZhbCA9IHRvVmFsO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbC5ib29sZWFuKSB7XG4gICAgICAgICAgaWYgKGluVG8gJiYgIWluRXAgJiYgdG9WYWwpIHtcbiAgICAgICAgICAgIGF0dHJOYW1lID0gdmFsLmJvb2xlYW47XG4gICAgICAgICAgICBhdHRyVmFsID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8ganNoaW50IC1XMDM1XG4gICAgICAgICAgICAvLyBlbXB0eSB0byBpbGx1c3RyYXRlIHRoYXQgYSBib29sZWFuIHdpbGwgbm90IGJlIGFkZGVkIHZpYSB2YWwuYm91bmRcbiAgICAgICAgICAgIC8vIGlmIHlvdSB3YW50IGl0IGFkZGVkIHZpYSB2YWwuYm91bmQsIHRoZW4gcHV0IGl0IGluIGV4cHJlc3Npb25Qcm9wZXJ0aWVzXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHZhbC5ib3VuZCAmJiBpblRvKSB7XG4gICAgICAgICAgYXR0ck5hbWUgPSB2YWwuYm91bmQ7XG4gICAgICAgICAgYXR0clZhbCA9IHJlZjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChhdHRyTmFtZSkgJiYgYW5ndWxhci5pc0RlZmluZWQoYXR0clZhbCkpIHtcbiAgICAgICAgICBhZGRJZk5vdFByZXNlbnQobW9kZWxOb2RlcywgYXR0ck5hbWUsIGF0dHJWYWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBVdGlsaXR5IGZ1bmN0aW9uc1xuICBmdW5jdGlvbiBnZXRCdWlsdEluQXR0cmlidXRlcygpIHtcbiAgICBsZXQgbmdNb2RlbEF0dHJpYnV0ZXMgPSB7XG4gICAgICBmb2N1czoge1xuICAgICAgICBhdHRyaWJ1dGU6ICdmb3JtbHktZm9jdXMnXG4gICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBib3VuZE9ubHkgPSBbXTtcbiAgICBjb25zdCBib3RoQm9vbGVhbkFuZEJvdW5kID0gWydyZXF1aXJlZCcsICdkaXNhYmxlZCddO1xuICAgIGNvbnN0IGJvdGhBdHRyaWJ1dGVBbmRCb3VuZCA9IFsncGF0dGVybicsICdtaW5sZW5ndGgnXTtcbiAgICBjb25zdCBleHByZXNzaW9uT25seSA9IFsnY2hhbmdlJywgJ2tleWRvd24nLCAna2V5dXAnLCAna2V5cHJlc3MnLCAnY2xpY2snLCAnZm9jdXMnLCAnYmx1ciddO1xuICAgIGNvbnN0IGF0dHJpYnV0ZU9ubHkgPSBbJ3BsYWNlaG9sZGVyJywgJ21pbicsICdtYXgnLCAndGFiaW5kZXgnLCAndHlwZSddO1xuICAgIGlmIChmb3JtbHlDb25maWcuZXh0cmFzLm5nTW9kZWxBdHRyc01hbmlwdWxhdG9yUHJlZmVyVW5ib3VuZCkge1xuICAgICAgYm90aEF0dHJpYnV0ZUFuZEJvdW5kLnB1c2goJ21heGxlbmd0aCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBib3VuZE9ubHkucHVzaCgnbWF4bGVuZ3RoJyk7XG4gICAgfVxuXG4gICAgYW5ndWxhci5mb3JFYWNoKGJvdW5kT25seSwgaXRlbSA9PiB7XG4gICAgICBuZ01vZGVsQXR0cmlidXRlc1tpdGVtXSA9IHtib3VuZDogJ25nLScgKyBpdGVtfTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIuZm9yRWFjaChib3RoQm9vbGVhbkFuZEJvdW5kLCBpdGVtID0+IHtcbiAgICAgIG5nTW9kZWxBdHRyaWJ1dGVzW2l0ZW1dID0ge2Jvb2xlYW46IGl0ZW0sIGJvdW5kOiAnbmctJyArIGl0ZW19O1xuICAgIH0pO1xuXG4gICAgYW5ndWxhci5mb3JFYWNoKGJvdGhBdHRyaWJ1dGVBbmRCb3VuZCwgaXRlbSA9PiB7XG4gICAgICBuZ01vZGVsQXR0cmlidXRlc1tpdGVtXSA9IHthdHRyaWJ1dGU6IGl0ZW0sIGJvdW5kOiAnbmctJyArIGl0ZW19O1xuICAgIH0pO1xuXG4gICAgYW5ndWxhci5mb3JFYWNoKGV4cHJlc3Npb25Pbmx5LCBpdGVtID0+IHtcbiAgICAgIHZhciBwcm9wTmFtZSA9ICdvbicgKyBpdGVtLnN1YnN0cigwLCAxKS50b1VwcGVyQ2FzZSgpICsgaXRlbS5zdWJzdHIoMSk7XG4gICAgICBuZ01vZGVsQXR0cmlidXRlc1twcm9wTmFtZV0gPSB7ZXhwcmVzc2lvbjogJ25nLScgKyBpdGVtfTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIuZm9yRWFjaChhdHRyaWJ1dGVPbmx5LCBpdGVtID0+IHtcbiAgICAgIG5nTW9kZWxBdHRyaWJ1dGVzW2l0ZW1dID0ge2F0dHJpYnV0ZTogaXRlbX07XG4gICAgfSk7XG4gICAgcmV0dXJuIG5nTW9kZWxBdHRyaWJ1dGVzO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RXBWYWx1ZShlcCwgbmFtZSkge1xuICAgIHJldHVybiBlcFsndGVtcGxhdGVPcHRpb25zLicgKyBuYW1lXSB8fFxuICAgICAgZXBbYHRlbXBsYXRlT3B0aW9uc1snJHtuYW1lfSddYF0gfHxcbiAgICAgIGVwW2B0ZW1wbGF0ZU9wdGlvbnNbXCIke25hbWV9XCJdYF07XG4gIH1cblxuICBmdW5jdGlvbiBhZGRJZk5vdFByZXNlbnQobm9kZXMsIGF0dHIsIHZhbCkge1xuICAgIGFuZ3VsYXIuZm9yRWFjaChub2Rlcywgbm9kZSA9PiB7XG4gICAgICBpZiAoIW5vZGUuZ2V0QXR0cmlidXRlKGF0dHIpKSB7XG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGF0dHIsIHZhbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3J1bi9mb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvci5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGFkZEN1c3RvbVRhZ3M7XG5cbi8vIEBuZ0luamVjdFxuZnVuY3Rpb24gYWRkQ3VzdG9tVGFncygkZG9jdW1lbnQpIHtcbiAgaWYgKCRkb2N1bWVudCAmJiAkZG9jdW1lbnQuZ2V0KSB7XG4gICAgLy9JRTggY2hlY2sgLT5cbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwOTY0OTY2L2RldGVjdC1pZS12ZXJzaW9uLXByaW9yLXRvLXY5LWluLWphdmFzY3JpcHQvMTA5NjUyMDMjMTA5NjUyMDNcbiAgICBjb25zdCBkb2N1bWVudCA9ICRkb2N1bWVudC5nZXQoMCk7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmlubmVySFRNTCA9ICc8IS0tW2lmIGx0IElFIDldPjxpPjwvaT48IVtlbmRpZl0tLT4nO1xuICAgIGNvbnN0IGlzSWVMZXNzVGhhbjkgPSAoZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpJykubGVuZ3RoID09PSAxKTtcblxuICAgIGlmIChpc0llTGVzc1RoYW45KSB7XG4gICAgICAvL2FkZCB0aGUgY3VzdG9tIGVsZW1lbnRzIHRoYXQgd2UgbmVlZCBmb3IgZm9ybWx5XG4gICAgICBjb25zdCBjdXN0b21FbGVtZW50cyA9IFtcbiAgICAgICAgJ2Zvcm1seS1maWVsZCcsICdmb3JtbHktZm9ybScsICdmb3JtbHktY3VzdG9tLXZhbGlkYXRpb24nLCAnZm9ybWx5LWZvY3VzJywgJ2Zvcm1seS10cmFuc3Bvc2UnXG4gICAgICBdO1xuICAgICAgYW5ndWxhci5mb3JFYWNoKGN1c3RvbUVsZW1lbnRzLCBlbCA9PiB7XG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWwpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9ydW4vZm9ybWx5Q3VzdG9tVGFncy5qc1xuICoqLyIsIi8vIHNvbWUgdmVyc2lvbnMgb2YgYW5ndWxhciBkb24ndCBleHBvcnQgdGhlIGFuZ3VsYXIgbW9kdWxlIHByb3Blcmx5LFxuLy8gc28gd2UgZ2V0IGl0IGZyb20gd2luZG93IGluIHRoaXMgY2FzZS5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaWYgKCFhbmd1bGFyLnZlcnNpb24pIHtcbiAgYW5ndWxhciA9IHdpbmRvdy5hbmd1bGFyO1xufVxuZXhwb3J0IGRlZmF1bHQgYW5ndWxhcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2FuZ3VsYXItZml4L2luZGV4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE2X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJhcGlDaGVja1wiLFwiYW1kXCI6XCJhcGktY2hlY2tcIixcImNvbW1vbmpzMlwiOlwiYXBpLWNoZWNrXCIsXCJjb21tb25qc1wiOlwiYXBpLWNoZWNrXCJ9XG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xN19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJhbmd1bGFyXCJcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhci1maXgnO1xuXG5leHBvcnQgZGVmYXVsdCB7Zm9ybWx5RXZhbCwgZ2V0RmllbGRJZCwgcmV2ZXJzZURlZXBNZXJnZSwgZmluZEJ5Tm9kZU5hbWV9O1xuXG5mdW5jdGlvbiBmb3JtbHlFdmFsKHNjb3BlLCBleHByZXNzaW9uLCAkbW9kZWxWYWx1ZSwgJHZpZXdWYWx1ZSkge1xuICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKGV4cHJlc3Npb24pKSB7XG4gICAgcmV0dXJuIGV4cHJlc3Npb24oJHZpZXdWYWx1ZSwgJG1vZGVsVmFsdWUsIHNjb3BlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc2NvcGUuJGV2YWwoZXhwcmVzc2lvbiwgeyR2aWV3VmFsdWUsICRtb2RlbFZhbHVlfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RmllbGRJZChmb3JtSWQsIG9wdGlvbnMsIGluZGV4KSB7XG4gIHZhciB0eXBlID0gb3B0aW9ucy50eXBlO1xuICBpZiAoIXR5cGUgJiYgb3B0aW9ucy50ZW1wbGF0ZSkge1xuICAgIHR5cGUgPSAndGVtcGxhdGUnO1xuICB9IGVsc2UgaWYgKCF0eXBlICYmIG9wdGlvbnMudGVtcGxhdGVVcmwpIHtcbiAgICB0eXBlID0gJ3RlbXBsYXRlVXJsJztcbiAgfVxuXG4gIHJldHVybiBbZm9ybUlkLCB0eXBlLCBvcHRpb25zLmtleSwgaW5kZXhdLmpvaW4oJ18nKTtcbn1cblxuXG5mdW5jdGlvbiByZXZlcnNlRGVlcE1lcmdlKGRlc3QpIHtcbiAgYW5ndWxhci5mb3JFYWNoKGFyZ3VtZW50cywgKHNyYywgaW5kZXgpID0+IHtcbiAgICBpZiAoIWluZGV4KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGFuZ3VsYXIuZm9yRWFjaChzcmMsICh2YWwsIHByb3ApID0+IHtcbiAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoZGVzdFtwcm9wXSkpIHtcbiAgICAgICAgZGVzdFtwcm9wXSA9IGFuZ3VsYXIuY29weSh2YWwpO1xuICAgICAgfSBlbHNlIGlmIChvYmpBbmRTYW1lVHlwZShkZXN0W3Byb3BdLCB2YWwpKSB7XG4gICAgICAgIHJldmVyc2VEZWVwTWVyZ2UoZGVzdFtwcm9wXSwgdmFsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG9iakFuZFNhbWVUeXBlKG9iajEsIG9iajIpIHtcbiAgcmV0dXJuIGFuZ3VsYXIuaXNPYmplY3Qob2JqMSkgJiYgYW5ndWxhci5pc09iamVjdChvYmoyKSAmJlxuICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmoxKSA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iajIpO1xufVxuXG4vL3JlY3Vyc2UgZG93biBhIG5vZGUgdHJlZSB0byBmaW5kIGEgbm9kZSB3aXRoIG1hdGNoaW5nIG5vZGVOYW1lLCBmb3IgY3VzdG9tIHRhZ3MgalF1ZXJ5LmZpbmQgZG9lc24ndCB3b3JrIGluIElFOFxuZnVuY3Rpb24gZmluZEJ5Tm9kZU5hbWUoZWwsIG5vZGVOYW1lKSB7XG4gIGlmICghZWwucHJvcCkgeyAvLyBub3QgYSBqUXVlcnkgb3IganFMaXRlIG9iamVjdCAtPiB3cmFwIGl0XG4gICAgZWwgPSBhbmd1bGFyLmVsZW1lbnQoZWwpO1xuICB9XG5cbiAgaWYgKGVsLnByb3AoJ25vZGVOYW1lJykgPT09IG5vZGVOYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICByZXR1cm4gZWw7XG4gIH1cblxuICB2YXIgYyA9IGVsLmNoaWxkcmVuKCk7XG4gIGZvcih2YXIgaSA9IDA7IGMgJiYgaSA8IGMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgbm9kZSA9IGZpbmRCeU5vZGVOYW1lKGNbaV0sIG5vZGVOYW1lKTtcbiAgICBpZiAobm9kZSkge1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9vdGhlci91dGlscy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=