// angular-formly version 6.0.0-beta.8 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)

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
	ngModule.constant("formlyVersion", ("6.0.0-beta.8")); // <-- webpack variable
	
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
	
	module.exports = "https://github.com/formly-js/angular-formly/blob/" + ("6.0.0-beta.8") + "/other/ERRORS_AND_WARNINGS.md#";

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
	    link: function link(scope, el, attrs, ctrl) {
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
	      angular.forEach(opts.validators, function (validator, name) {
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
	          ctrl[validatorCollection][name] = function (modelValue, viewValue) {
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
	          ctrl.$parsers.unshift(function (viewValue) {
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
	    controller: function fieldController($scope, $timeout, $parse, $controller) {
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
	        $timeout(function () {
	          // must run on next tick to make sure that the current value is correct.
	          var field = $scope.options;
	          var currentValue = valueGetterSetter();
	          angular.forEach(field.expressionProperties, function runExpression(expression, prop) {
	            var setter = $parse(prop).assign;
	            var promise = $q.when(formlyUtil.formlyEval($scope, expression, currentValue));
	            promise.then(function (value) {
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
	        scope.$watch("form[\"" + scope.id + "\"]", function (formControl) {
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
	        scope.$watch(function () {
	          if (typeof scope.options.validation.show === "boolean") {
	            return scope.fc.$invalid && scope.options.validation.show;
	          } else {
	            var noTouchedButDirty = angular.isUndefined(scope.fc.$touched) && scope.fc.$dirty;
	            return scope.fc.$invalid && (scope.fc.$touched || noTouchedButDirty);
	          }
	        }, function (show) {
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
	        angular.forEach(formlyValidationMessages.messages, function (expression, name) {
	          if (!options.validation.messages[name]) {
	            options.validation.messages[name] = function (viewValue, modelValue, scope) {
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
	    },
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
	      })["catch"](function (error) {
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
	    link: function link(scope, element, attrs) {
	      var previousEl = null;
	      var el = element[0];
	      var doc = $document[0];
	      attrs.$observe("formlyFocus", function (value) {
	        if (value === "true") {
	          $timeout(function () {
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
	    template: function template(el, attrs) {
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
	    controller: function controller($scope) {
	      setupOptions();
	      $scope.model = $scope.model || {};
	      $scope.fields = $scope.fields || [];
	
	      angular.forEach($scope.fields, attachKey); // attaches a key based on the index if a key isn't specified
	      angular.forEach($scope.fields, setupWatchers); // setup watchers for all fields
	
	      // watch the model and evaluate watch expressions that depend on it.
	      $scope.$watch("model", function onResultUpdate(newResult) {
	        angular.forEach($scope.fields, function (field) {
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
	        angular.forEach(watchers, function (watcher) {
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
	    },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1YTI3ODYyNzAxZTY3NDI1NWYwZCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2Zvcm1seUFwaUNoZWNrLmpzIiwid2VicGFjazovLy8uL290aGVyL2RvY3NCYXNlVXJsLmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlVc2FiaWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2Zvcm1seUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzLmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL2Zvcm1seVV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmljZXMvZm9ybWx5V2Fybi5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1maWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1mb2N1cy5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1mb3JtLmpzIiwid2VicGFjazovLy8uL3J1bi9mb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ydW4vZm9ybWx5Q3VzdG9tVGFncy5qcyIsIndlYnBhY2s6Ly8vLi9hbmd1bGFyLWZpeC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiYXBpQ2hlY2tcIixcImFtZFwiOlwiYXBpLWNoZWNrXCIsXCJjb21tb25qczJcIjpcImFwaS1jaGVja1wiLFwiY29tbW9uanNcIjpcImFwaS1jaGVja1wifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyXCIiLCJ3ZWJwYWNrOi8vLy4vb3RoZXIvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0tDdENPLEtBQUssdUNBQU0sQ0FBZ0I7O2tCQUNuQixLQUFLLEM7Ozs7Ozs7Ozs7S0NEYixPQUFPLHVDQUFNLEVBQWE7O0tBRTFCLGNBQWMsdUNBQU0sQ0FBNEI7O0tBQ2hELCtCQUErQix1Q0FBTSxDQUFxQjs7S0FDMUQsZUFBZSx1Q0FBTSxDQUE2Qjs7S0FDbEQsWUFBWSx1Q0FBTSxDQUEwQjs7S0FDNUMsd0JBQXdCLHVDQUFNLENBQXNDOztLQUNwRSxVQUFVLHVDQUFNLENBQXVCOztLQUN2QyxVQUFVLHVDQUFNLENBQXVCOztLQUV2QyxzQkFBc0IsdUNBQU0sQ0FBdUM7O0tBQ25FLFdBQVcsdUNBQU0sRUFBMkI7O0tBQzVDLFdBQVcsdUNBQU0sRUFBMkI7O0tBQzVDLFVBQVUsdUNBQU0sRUFBMEI7O0tBRTFDLDZCQUE2Qix1Q0FBTSxFQUFxQzs7S0FDeEUsZ0JBQWdCLHVDQUFNLEVBQXdCOztBQUVyRCxLQUFNLFlBQVksR0FBRyxRQUFRLENBQUM7O2tCQUVmLFlBQVk7O0FBRTNCLEtBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUVsRCxTQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ3BELFNBQVEsQ0FBQyxRQUFRLENBQUMs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QUFFLEVBQUUsUUFBUSxFQUFFO0FBQ3BDLE9BQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFOztBQUNaLE9BQUUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFCOztBQUVELE9BQUksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUU7QUFDbEQsWUFBTyxFQUFFLENBQUM7SUFDWDs7QUFFRCxPQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDdEIsUUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3JDLFNBQUksSUFBSSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDMUMsU0FBSSxJQUFJLEVBQUU7QUFDUixjQUFPLElBQUksQ0FBQztNQUNiO0lBQ0YiLCJmaWxlIjoiZm9ybWx5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYXBpLWNoZWNrXCIpLCByZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJhcGktY2hlY2tcIiwgXCJhbmd1bGFyXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIm5nRm9ybWx5XCJdID0gZmFjdG9yeShyZXF1aXJlKFwiYXBpLWNoZWNrXCIpLCByZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wibmdGb3JtbHlcIl0gPSBmYWN0b3J5KHJvb3RbXCJhcGlDaGVja1wiXSwgcm9vdFtcImFuZ3VsYXJcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xNl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE3X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDVhMjc4NjI3MDFlNjc0MjU1ZjBkXG4gKiovIiwiaW1wb3J0IGluZGV4IGZyb20gJy4vaW5kZXguY29tbW9uJztcbmV4cG9ydCBkZWZhdWx0IGluZGV4O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyLWZpeCc7XG5cbmltcG9ydCBmb3JtbHlBcGlDaGVjayBmcm9tICcuL3Byb3ZpZGVycy9mb3JtbHlBcGlDaGVjayc7XG5pbXBvcnQgZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeCBmcm9tICcuL290aGVyL2RvY3NCYXNlVXJsJztcbmltcG9ydCBmb3JtbHlVc2FiaWxpdHkgZnJvbSAnLi9wcm92aWRlcnMvZm9ybWx5VXNhYmlsaXR5JztcbmltcG9ydCBmb3JtbHlDb25maWcgZnJvbSAnLi9wcm92aWRlcnMvZm9ybWx5Q29uZmlnJztcbmltcG9ydCBmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMgZnJvbSAnLi9wcm92aWRlcnMvZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzJztcbmltcG9ydCBmb3JtbHlVdGlsIGZyb20gJy4vc2VydmljZXMvZm9ybWx5VXRpbCc7XG5pbXBvcnQgZm9ybWx5V2FybiBmcm9tICcuL3NlcnZpY2VzL2Zvcm1seVdhcm4nO1xuXG5pbXBvcnQgZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbiBmcm9tICcuL2RpcmVjdGl2ZXMvZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uJztcbmltcG9ydCBmb3JtbHlGaWVsZCBmcm9tICcuL2RpcmVjdGl2ZXMvZm9ybWx5LWZpZWxkJztcbmltcG9ydCBmb3JtbHlGb2N1cyBmcm9tICcuL2RpcmVjdGl2ZXMvZm9ybWx5LWZvY3VzJztcbmltcG9ydCBmb3JtbHlGb3JtIGZyb20gJy4vZGlyZWN0aXZlcy9mb3JtbHktZm9ybSc7XG5cbmltcG9ydCBmb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvciBmcm9tICcuL3J1bi9mb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvcic7XG5pbXBvcnQgZm9ybWx5Q3VzdG9tVGFncyBmcm9tICcuL3J1bi9mb3JtbHlDdXN0b21UYWdzJztcblxuY29uc3QgbmdNb2R1bGVOYW1lID0gJ2Zvcm1seSc7XG5cbmV4cG9ydCBkZWZhdWx0IG5nTW9kdWxlTmFtZTtcblxuY29uc3QgbmdNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZShuZ01vZHVsZU5hbWUsIFtdKTtcblxubmdNb2R1bGUuY29uc3RhbnQoJ2Zvcm1seUFwaUNoZWNrJywgZm9ybWx5QXBpQ2hlY2spO1xubmdNb2R1bGUuY29uc3RhbnQoJ2Zvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXgnLCBmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4KTtcbm5nTW9kdWxlLmNvbnN0YW50KCdmb3JtbHlWZXJzaW9uJywgVkVSU0lPTik7IC8vIDwtLSB3ZWJwYWNrIHZhcmlhYmxlXG5cbm5nTW9kdWxlLnByb3ZpZGVyKCdmb3JtbHlVc2FiaWxpdHknLCBmb3JtbHlVc2FiaWxpdHkpO1xubmdNb2R1bGUucHJvdmlkZXIoJ2Zvcm1seUNvbmZpZycsIGZvcm1seUNvbmZpZyk7XG5cbm5nTW9kdWxlLmZhY3RvcnkoJ2Zvcm1seVZhbGlkYXRpb25NZXNzYWdlcycsIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcyk7XG5uZ01vZHVsZS5mYWN0b3J5KCdmb3JtbHlVdGlsJywgZm9ybWx5VXRpbCk7XG5uZ01vZHVsZS5mYWN0b3J5KCdmb3JtbHlXYXJuJywgZm9ybWx5V2Fybik7XG5cbm5nTW9kdWxlLmRpcmVjdGl2ZSgnZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbicsIGZvcm1seUN1c3RvbVZhbGlkYXRpb24pO1xubmdNb2R1bGUuZGlyZWN0aXZlKCdmb3JtbHlGaWVsZCcsIGZvcm1seUZpZWxkKTtcbm5nTW9kdWxlLmRpcmVjdGl2ZSgnZm9ybWx5Rm9jdXMnLCBmb3JtbHlGb2N1cyk7XG5uZ01vZHVsZS5kaXJlY3RpdmUoJ2Zvcm1seUZvcm0nLCBmb3JtbHlGb3JtKTtcblxubmdNb2R1bGUucnVuKGZvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKTtcbm5nTW9kdWxlLnJ1bihmb3JtbHlDdXN0b21UYWdzKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2luZGV4LmNvbW1vbi5qc1xuICoqLyIsImltcG9ydCBhcGlDaGVja0ZhY3RvcnkgZnJvbSAnYXBpLWNoZWNrJztcblxubGV0IGFwaUNoZWNrID0gYXBpQ2hlY2tGYWN0b3J5KHtcbiAgb3V0cHV0OiB7XG4gICAgcHJlZml4OiAnYW5ndWxhci1mb3JtbHk6JyxcbiAgICBkb2NzQmFzZVVybDogcmVxdWlyZSgnLi4vb3RoZXIvZG9jc0Jhc2VVcmwnKVxuICB9XG59KTtcblxuZnVuY3Rpb24gc2hhcGVSZXF1aXJlZElmTm90KG90aGVyUHJvcHMsIHByb3BDaGVja2VyKSB7XG4gIGlmICghYW5ndWxhci5pc0FycmF5KG90aGVyUHJvcHMpKSB7XG4gICAgb3RoZXJQcm9wcyA9IFtvdGhlclByb3BzXTtcbiAgfVxuICBjb25zdCB0eXBlID0gYHNwZWNpZmllZCBpZiB0aGVzZSBhcmUgbm90IHNwZWNpZmllZDogXFxgJHtvdGhlclByb3BzLmpvaW4oJywgJyl9XFxgIChvdGhlcndpc2UgaXQncyBvcHRpb25hbClgO1xuICBmdW5jdGlvbiBzaGFwZVJlcXVpcmVkSWZOb3REZWZpbml0aW9uKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgdmFyIHByb3BFeGlzdHMgPSBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KHByb3BOYW1lKTtcbiAgICB2YXIgb3RoZXJQcm9wc0V4aXN0ID0gb3RoZXJQcm9wcy5zb21lKGZ1bmN0aW9uIChvdGhlclByb3ApIHtcbiAgICAgIHJldHVybiBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KG90aGVyUHJvcCk7XG4gICAgfSk7XG4gICAgaWYgKCFvdGhlclByb3BzRXhpc3QgJiYgIXByb3BFeGlzdHMpIHtcbiAgICAgIHJldHVybiBhcGlDaGVjay51dGlscy5nZXRFcnJvcihwcm9wTmFtZSwgbG9jYXRpb24sIHR5cGUpO1xuICAgIH0gZWxzZSBpZiAocHJvcEV4aXN0cykge1xuICAgICAgcmV0dXJuIHByb3BDaGVja2VyKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKTtcbiAgICB9XG4gIH1cbiAgc2hhcGVSZXF1aXJlZElmTm90RGVmaW5pdGlvbi50eXBlID0gdHlwZTtcbiAgcmV0dXJuIGFwaUNoZWNrLnV0aWxzLmNoZWNrZXJIZWxwZXJzLnNldHVwQ2hlY2tlcihzaGFwZVJlcXVpcmVkSWZOb3REZWZpbml0aW9uKTtcbn1cblxubGV0IGZvcm1seUV4cHJlc3Npb24gPSBhcGlDaGVjay5vbmVPZlR5cGUoW2FwaUNoZWNrLnN0cmluZywgYXBpQ2hlY2suZnVuY10pO1xubGV0IHNwZWNpZnlXcmFwcGVyVHlwZSA9IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gIGFwaUNoZWNrLm9uZU9mKFtudWxsXSksIGFwaUNoZWNrLnR5cGVPckFycmF5T2YoYXBpQ2hlY2suc3RyaW5nKVxuXSk7XG5cbmNvbnN0IGFwaUNoZWNrUHJvcGVydHkgPSBhcGlDaGVjay5vYmplY3RPZihhcGlDaGVjay5mdW5jKTtcblxuY29uc3QgYXBpQ2hlY2tJbnN0YW5jZVByb3BlcnR5ID0gYXBpQ2hlY2suc2hhcGUub25seUlmKCdhcGlDaGVjaycsIGFwaUNoZWNrLmZ1bmMud2l0aFByb3BlcnRpZXMoe1xuICB3YXJuOiBhcGlDaGVjay5mdW5jLFxuICB0aHJvdzogYXBpQ2hlY2suZnVuYyxcbiAgc2hhcGU6IGFwaUNoZWNrLmZ1bmNcbn0pKTtcblxuY29uc3QgYXBpQ2hlY2tGdW5jdGlvblByb3BlcnR5ID0gYXBpQ2hlY2suc2hhcGUub25seUlmKCdhcGlDaGVjaycsIGFwaUNoZWNrLm9uZU9mKFsndGhyb3cnLCAnd2FybiddKSk7XG5cbmNvbnN0IGZvcm1seVdyYXBwZXJUeXBlID0gYXBpQ2hlY2suc2hhcGUoe1xuICBuYW1lOiBzaGFwZVJlcXVpcmVkSWZOb3QoJ3R5cGVzJywgYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgdGVtcGxhdGU6IGFwaUNoZWNrLnNoYXBlLmlmTm90KCd0ZW1wbGF0ZVVybCcsIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gIHRlbXBsYXRlVXJsOiBhcGlDaGVjay5zaGFwZS5pZk5vdCgndGVtcGxhdGUnLCBhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICB0eXBlczogYXBpQ2hlY2sudHlwZU9yQXJyYXlPZihhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICBvdmVyd3JpdGVPazogYXBpQ2hlY2suYm9vbC5vcHRpb25hbCxcbiAgdmFsaWRhdGVPcHRpb25zOiBhcGlDaGVjay5mdW5jLm9wdGlvbmFsLFxuICBhcGlDaGVjazogYXBpQ2hlY2tQcm9wZXJ0eS5vcHRpb25hbCxcbiAgYXBpQ2hlY2tJbnN0YW5jZTogYXBpQ2hlY2tJbnN0YW5jZVByb3BlcnR5Lm9wdGlvbmFsLFxuICBhcGlDaGVja0Z1bmN0aW9uOiBhcGlDaGVja0Z1bmN0aW9uUHJvcGVydHkub3B0aW9uYWwsXG4gIGFwaUNoZWNrT3B0aW9uczogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsXG59KS5zdHJpY3Q7XG5cbmxldCBmaWVsZE9wdGlvbnNBcGlTaGFwZSA9IHtcbiAgdHlwZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoWyd0ZW1wbGF0ZScsICd0ZW1wbGF0ZVVybCddLCBhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICB0ZW1wbGF0ZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoWyd0eXBlJywgJ3RlbXBsYXRlVXJsJ10sIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gIHRlbXBsYXRlVXJsOiBhcGlDaGVjay5zaGFwZS5pZk5vdChbJ3R5cGUnLCAndGVtcGxhdGUnXSwgYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAga2V5OiBhcGlDaGVjay5vbmVPZlR5cGUoW2FwaUNoZWNrLnN0cmluZywgYXBpQ2hlY2subnVtYmVyXSksXG4gIG1vZGVsOiBhcGlDaGVjay5vYmplY3Qub3B0aW9uYWwsXG4gIGV4cHJlc3Npb25Qcm9wZXJ0aWVzOiBhcGlDaGVjay5vYmplY3RPZihhcGlDaGVjay5vbmVPZlR5cGUoW1xuICAgIGZvcm1seUV4cHJlc3Npb24sXG4gICAgYXBpQ2hlY2suc2hhcGUoe1xuICAgICAgZXhwcmVzc2lvbjogZm9ybWx5RXhwcmVzc2lvbixcbiAgICAgIG1lc3NhZ2U6IGZvcm1seUV4cHJlc3Npb24ub3B0aW9uYWxcbiAgICB9KS5zdHJpY3RcbiAgXSkpLm9wdGlvbmFsLFxuICBkYXRhOiBhcGlDaGVjay5vYmplY3Qub3B0aW9uYWwsXG4gIHRlbXBsYXRlT3B0aW9uczogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICB3cmFwcGVyOiBzcGVjaWZ5V3JhcHBlclR5cGUub3B0aW9uYWwsXG4gIG1vZGVsT3B0aW9uczogYXBpQ2hlY2suc2hhcGUoe1xuICAgIHVwZGF0ZU9uOiBhcGlDaGVjay5zdHJpbmcub3B0aW9uYWwsXG4gICAgZGVib3VuY2U6IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gICAgICBhcGlDaGVjay5vYmplY3QsIGFwaUNoZWNrLnN0cmluZ1xuICAgIF0pLm9wdGlvbmFsLFxuICAgIGFsbG93SW52YWxpZDogYXBpQ2hlY2suYm9vbC5vcHRpb25hbCxcbiAgICBnZXR0ZXJTZXR0ZXI6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWwsXG4gICAgdGltZXpvbmU6IGFwaUNoZWNrLnN0cmluZy5vcHRpb25hbFxuICB9KS5vcHRpb25hbCxcbiAgd2F0Y2hlcjogYXBpQ2hlY2sudHlwZU9yQXJyYXlPZihcbiAgICBhcGlDaGVjay5zaGFwZSh7XG4gICAgICBleHByZXNzaW9uOiBmb3JtbHlFeHByZXNzaW9uLm9wdGlvbmFsLFxuICAgICAgbGlzdGVuZXI6IGZvcm1seUV4cHJlc3Npb25cbiAgICB9KVxuICApLm9wdGlvbmFsLFxuICB2YWxpZGF0b3JzOiBhcGlDaGVjay5vYmplY3RPZihhcGlDaGVjay5vbmVPZlR5cGUoW1xuICAgIGZvcm1seUV4cHJlc3Npb24sIGFwaUNoZWNrLnNoYXBlKHtcbiAgICAgIGV4cHJlc3Npb246IGZvcm1seUV4cHJlc3Npb24sXG4gICAgICBtZXNzYWdlOiBmb3JtbHlFeHByZXNzaW9uLm9wdGlvbmFsXG4gICAgfSkuc3RyaWN0XG4gIF0pKS5vcHRpb25hbCxcbiAgbm9Gb3JtQ29udHJvbDogYXBpQ2hlY2suYm9vbC5vcHRpb25hbCxcbiAgaGlkZTogYXBpQ2hlY2suYm9vbC5vcHRpb25hbCxcbiAgbmdNb2RlbEF0dHJzOiBhcGlDaGVjay5vYmplY3RPZihhcGlDaGVjay5zaGFwZSh7XG4gICAgZXhwcmVzc2lvbjogYXBpQ2hlY2suc2hhcGUuaWZOb3QoWyd2YWx1ZScsICdhdHRyaWJ1dGUnLCAnYm91bmQnXSwgYXBpQ2hlY2suYW55KS5vcHRpb25hbCxcbiAgICB2YWx1ZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoJ2V4cHJlc3Npb24nLCBhcGlDaGVjay5hbnkpLm9wdGlvbmFsLFxuICAgIGF0dHJpYnV0ZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoJ2V4cHJlc3Npb24nLCBhcGlDaGVjay5hbnkpLm9wdGlvbmFsLFxuICAgIGJvdW5kOiBhcGlDaGVjay5zaGFwZS5pZk5vdCgnZXhwcmVzc2lvbicsIGFwaUNoZWNrLmFueSkub3B0aW9uYWxcbiAgfSkuc3RyaWN0KS5vcHRpb25hbCxcbiAgb3B0aW9uc1R5cGVzOiBhcGlDaGVjay50eXBlT3JBcnJheU9mKGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gIGxpbms6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gIGNvbnRyb2xsZXI6IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gICAgYXBpQ2hlY2suc3RyaW5nLCBhcGlDaGVjay5mdW5jLCBhcGlDaGVjay5hcnJheVxuICBdKS5vcHRpb25hbCxcbiAgdmFsaWRhdGlvbjogYXBpQ2hlY2suc2hhcGUoe1xuICAgIHNob3c6IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gICAgICBhcGlDaGVjay5ib29sLCBhcGlDaGVjay5vbmVPZihbbnVsbF0pXG4gICAgXSkub3B0aW9uYWwsXG4gICAgbWVzc2FnZXM6IGFwaUNoZWNrLm9iamVjdE9mKGZvcm1seUV4cHJlc3Npb24pLm9wdGlvbmFsLFxuICAgIGVycm9yRXhpc3RzQW5kU2hvdWxkQmVWaXNpYmxlOiBhcGlDaGVjay5ib29sLm9wdGlvbmFsXG4gIH0pLm9wdGlvbmFsLFxuICBmb3JtQ29udHJvbDogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICB2YWx1ZTogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgcnVuRXhwcmVzc2lvbnM6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gIHJlc2V0TW9kZWw6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gIHVwZGF0ZUluaXRpYWxWYWx1ZTogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgaW5pdGlhbFZhbHVlOiBhcGlDaGVjay5hbnkub3B0aW9uYWxcbn07XG5cbmxldCBmb3JtbHlGaWVsZE9wdGlvbnMgPSBhcGlDaGVjay5zaGFwZShmaWVsZE9wdGlvbnNBcGlTaGFwZSkuc3RyaWN0O1xuXG5sZXQgdHlwZU9wdGlvbnNEZWZhdWx0T3B0aW9ucyA9IGFuZ3VsYXIuY29weShmaWVsZE9wdGlvbnNBcGlTaGFwZSk7XG50eXBlT3B0aW9uc0RlZmF1bHRPcHRpb25zLmtleSA9IGFwaUNoZWNrLnN0cmluZy5vcHRpb25hbDtcblxubGV0IGZvcm1seVR5cGVPcHRpb25zID0gYXBpQ2hlY2suc2hhcGUoe1xuICBuYW1lOiBhcGlDaGVjay5zdHJpbmcsXG4gIHRlbXBsYXRlOiBhcGlDaGVjay5zaGFwZS5pZk5vdCgndGVtcGxhdGVVcmwnLCBhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICB0ZW1wbGF0ZVVybDogYXBpQ2hlY2suc2hhcGUuaWZOb3QoJ3RlbXBsYXRlJywgYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgY29udHJvbGxlcjogYXBpQ2hlY2sub25lT2ZUeXBlKFtcbiAgICBhcGlDaGVjay5mdW5jLCBhcGlDaGVjay5zdHJpbmcsIGFwaUNoZWNrLmFycmF5XG4gIF0pLm9wdGlvbmFsLFxuICBsaW5rOiBhcGlDaGVjay5mdW5jLm9wdGlvbmFsLFxuICBkZWZhdWx0T3B0aW9uczogYXBpQ2hlY2sub25lT2ZUeXBlKFtcbiAgICBhcGlDaGVjay5mdW5jLCBhcGlDaGVjay5zaGFwZSh0eXBlT3B0aW9uc0RlZmF1bHRPcHRpb25zKVxuICBdKS5vcHRpb25hbCxcbiAgZXh0ZW5kczogYXBpQ2hlY2suc3RyaW5nLm9wdGlvbmFsLFxuICB3cmFwcGVyOiBzcGVjaWZ5V3JhcHBlclR5cGUub3B0aW9uYWwsXG4gIGRhdGE6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbCxcbiAgdmFsaWRhdGVPcHRpb25zOiBhcGlDaGVjay5mdW5jLm9wdGlvbmFsLFxuICBhcGlDaGVjazogYXBpQ2hlY2tQcm9wZXJ0eS5vcHRpb25hbCxcbiAgYXBpQ2hlY2tJbnN0YW5jZTogYXBpQ2hlY2tJbnN0YW5jZVByb3BlcnR5Lm9wdGlvbmFsLFxuICBhcGlDaGVja0Z1bmN0aW9uOiBhcGlDaGVja0Z1bmN0aW9uUHJvcGVydHkub3B0aW9uYWwsXG4gIGFwaUNoZWNrT3B0aW9uczogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICBvdmVyd3JpdGVPazogYXBpQ2hlY2suYm9vbC5vcHRpb25hbFxufSkuc3RyaWN0O1xuXG5hbmd1bGFyLmV4dGVuZChhcGlDaGVjaywge1xuICBmb3JtbHlUeXBlT3B0aW9ucywgZm9ybWx5RmllbGRPcHRpb25zLCBmb3JtbHlFeHByZXNzaW9uLCBmb3JtbHlXcmFwcGVyVHlwZVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGFwaUNoZWNrO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcHJvdmlkZXJzL2Zvcm1seUFwaUNoZWNrLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgYGh0dHBzOi8vZ2l0aHViLmNvbS9mb3JtbHktanMvYW5ndWxhci1mb3JtbHkvYmxvYi8ke1ZFUlNJT059L290aGVyL0VSUk9SU19BTkRfV0FSTklOR1MubWQjYDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL290aGVyL2RvY3NCYXNlVXJsLmpzXG4gKiovIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhci1maXgnO1xuXG5leHBvcnQgZGVmYXVsdCBmb3JtbHlVc2FiaWxpdHk7XG5cbi8vIEBuZ0luamVjdFxuZnVuY3Rpb24gZm9ybWx5VXNhYmlsaXR5KGZvcm1seUFwaUNoZWNrLCBmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4KSB7XG4gIGFuZ3VsYXIuZXh0ZW5kKHRoaXMsIHtcbiAgICBnZXRGb3JtbHlFcnJvcjogZ2V0Rm9ybWx5RXJyb3IsXG4gICAgZ2V0RmllbGRFcnJvcjogZ2V0RmllbGRFcnJvcixcbiAgICBjaGVja1dyYXBwZXI6IGNoZWNrV3JhcHBlcixcbiAgICBjaGVja1dyYXBwZXJUZW1wbGF0ZTogY2hlY2tXcmFwcGVyVGVtcGxhdGUsXG4gICAgJGdldDogKCkgPT4gdGhpc1xuICB9KTtcblxuICBmdW5jdGlvbiBnZXRGaWVsZEVycm9yKGVycm9ySW5mb1NsdWcsIG1lc3NhZ2UsIGZpZWxkKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XG4gICAgICBmaWVsZCA9IG1lc3NhZ2U7XG4gICAgICBtZXNzYWdlID0gZXJyb3JJbmZvU2x1ZztcbiAgICAgIGVycm9ySW5mb1NsdWcgPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEVycm9yKGdldEVycm9yTWVzc2FnZShlcnJvckluZm9TbHVnLCBtZXNzYWdlKSArIGAgRmllbGQgZGVmaW5pdGlvbjogJHthbmd1bGFyLnRvSnNvbihmaWVsZCl9YCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRGb3JtbHlFcnJvcihlcnJvckluZm9TbHVnLCBtZXNzYWdlKSB7XG4gICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICBtZXNzYWdlID0gZXJyb3JJbmZvU2x1ZztcbiAgICAgIGVycm9ySW5mb1NsdWcgPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEVycm9yKGdldEVycm9yTWVzc2FnZShlcnJvckluZm9TbHVnLCBtZXNzYWdlKSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRFcnJvck1lc3NhZ2UoZXJyb3JJbmZvU2x1ZywgbWVzc2FnZSkge1xuICAgIGxldCB1cmwgPSAnJztcbiAgICBpZiAoZXJyb3JJbmZvU2x1ZyAhPT0gbnVsbCkge1xuICAgICAgdXJsID0gYCR7Zm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeH0ke2Vycm9ySW5mb1NsdWd9YDtcbiAgICB9XG4gICAgcmV0dXJuIGBGb3JtbHkgRXJyb3I6ICR7bWVzc2FnZX0uICR7dXJsfWA7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1dyYXBwZXIod3JhcHBlcikge1xuICAgIGZvcm1seUFwaUNoZWNrLnRocm93KGZvcm1seUFwaUNoZWNrLmZvcm1seVdyYXBwZXJUeXBlLCB3cmFwcGVyLCB7XG4gICAgICBwcmVmaXg6ICdmb3JtbHlDb25maWcuc2V0V3JhcHBlcicsXG4gICAgICB1cmxTdWZmaXg6ICdzZXR3cmFwcGVyLXZhbGlkYXRpb24tZmFpbGVkJ1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tXcmFwcGVyVGVtcGxhdGUodGVtcGxhdGUsIGFkZGl0aW9uYWxJbmZvKSB7XG4gICAgdmFyIGZvcm1seVRyYW5zY2x1ZGUgPSAnPGZvcm1seS10cmFuc2NsdWRlPjwvZm9ybWx5LXRyYW5zY2x1ZGU+JztcbiAgICBpZiAodGVtcGxhdGUuaW5kZXhPZihmb3JtbHlUcmFuc2NsdWRlKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IGdldEZvcm1seUVycm9yKFxuICAgICAgICBgVGVtcGxhdGUgd3JhcHBlciB0ZW1wbGF0ZXMgbXVzdCB1c2UgXCIke2Zvcm1seVRyYW5zY2x1ZGV9XCIgc29tZXdoZXJlIGluIHRoZW0uIGAgK1xuICAgICAgICBgVGhpcyBvbmUgZG9lcyBub3QgaGF2ZSBcIjxmb3JtbHktdHJhbnNjbHVkZT48L2Zvcm1seS10cmFuc2NsdWRlPlwiIGluIGl0OiAke3RlbXBsYXRlfWAgKyAnXFxuJyArXG4gICAgICAgIGBBZGRpdGlvbmFsIGluZm9ybWF0aW9uOiAke0pTT04uc3RyaW5naWZ5KGFkZGl0aW9uYWxJbmZvKX1gXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcHJvdmlkZXJzL2Zvcm1seVVzYWJpbGl0eS5qc1xuICoqLyIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXItZml4JztcbmltcG9ydCB1dGlscyBmcm9tICcuLi9vdGhlci91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1seUNvbmZpZztcblxuLy8gQG5nSW5qZWN0XG5mdW5jdGlvbiBmb3JtbHlDb25maWcoZm9ybWx5VXNhYmlsaXR5UHJvdmlkZXIsIGZvcm1seUFwaUNoZWNrKSB7XG5cbiAgdmFyIHR5cGVNYXAgPSB7fTtcbiAgdmFyIHRlbXBsYXRlV3JhcHBlcnNNYXAgPSB7fTtcbiAgdmFyIGRlZmF1bHRXcmFwcGVyTmFtZSA9ICdkZWZhdWx0JztcbiAgdmFyIF90aGlzID0gdGhpcztcbiAgdmFyIGdldEVycm9yID0gZm9ybWx5VXNhYmlsaXR5UHJvdmlkZXIuZ2V0Rm9ybWx5RXJyb3I7XG5cbiAgYW5ndWxhci5leHRlbmQodGhpcywge1xuICAgIHNldFR5cGUsXG4gICAgZ2V0VHlwZSxcbiAgICBzZXRXcmFwcGVyLFxuICAgIGdldFdyYXBwZXIsXG4gICAgZ2V0V3JhcHBlckJ5VHlwZSxcbiAgICByZW1vdmVXcmFwcGVyQnlOYW1lLFxuICAgIHJlbW92ZVdyYXBwZXJzRm9yVHlwZSxcbiAgICBkaXNhYmxlV2FybmluZ3M6IGZhbHNlLFxuICAgIGV4dHJhczoge1xuICAgICAgZGlzYWJsZU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yOiBmYWxzZSxcbiAgICAgIG5nTW9kZWxBdHRyc01hbmlwdWxhdG9yUHJlZmVyVW5ib3VuZDogZmFsc2UsXG4gICAgICByZW1vdmVDaHJvbWVBdXRvQ29tcGxldGU6IGZhbHNlXG4gICAgfSxcbiAgICB0ZW1wbGF0ZU1hbmlwdWxhdG9yczoge1xuICAgICAgcHJlV3JhcHBlcjogW10sXG4gICAgICBwb3N0V3JhcHBlcjogW11cbiAgICB9LFxuICAgICRnZXQ6ICgpID0+IHRoaXNcbiAgfSk7XG5cbiAgZnVuY3Rpb24gc2V0VHlwZShvcHRpb25zKSB7XG4gICAgaWYgKGFuZ3VsYXIuaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgYW5ndWxhci5mb3JFYWNoKG9wdGlvbnMsIHNldFR5cGUpO1xuICAgIH0gZWxzZSBpZiAoYW5ndWxhci5pc09iamVjdChvcHRpb25zKSkge1xuICAgICAgY2hlY2tUeXBlKG9wdGlvbnMpO1xuICAgICAgaWYgKG9wdGlvbnMuZXh0ZW5kcykge1xuICAgICAgICBleHRlbmRUeXBlT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIHR5cGVNYXBbb3B0aW9ucy5uYW1lXSA9IG9wdGlvbnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGdldEVycm9yKGBZb3UgbXVzdCBwcm92aWRlIGFuIG9iamVjdCBvciBhcnJheSBmb3Igc2V0VHlwZS4gWW91IHByb3ZpZGVkOiAke0pTT04uc3RyaW5naWZ5KGFyZ3VtZW50cyl9YCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tUeXBlKG9wdGlvbnMpIHtcbiAgICBmb3JtbHlBcGlDaGVjay50aHJvdyhmb3JtbHlBcGlDaGVjay5mb3JtbHlUeXBlT3B0aW9ucywgb3B0aW9ucywge1xuICAgICAgcHJlZml4OiAnZm9ybWx5Q29uZmlnLnNldFR5cGUnLFxuICAgICAgdXJsOiAnc2V0dHlwZS12YWxpZGF0aW9uLWZhaWxlZCdcbiAgICB9KTtcbiAgICBpZiAoIW9wdGlvbnMub3ZlcndyaXRlT2spIHtcbiAgICAgIGNoZWNrT3ZlcndyaXRlKG9wdGlvbnMubmFtZSwgdHlwZU1hcCwgb3B0aW9ucywgJ3R5cGVzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMub3ZlcndyaXRlT2sgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZXh0ZW5kVHlwZU9wdGlvbnMob3B0aW9ucykge1xuICAgIGNvbnN0IGV4dGVuZHNUeXBlID0gZ2V0VHlwZShvcHRpb25zLmV4dGVuZHMsIHRydWUsIG9wdGlvbnMpO1xuICAgIGV4dGVuZFR5cGVDb250cm9sbGVyRnVuY3Rpb24ob3B0aW9ucywgZXh0ZW5kc1R5cGUpO1xuICAgIGV4dGVuZFR5cGVMaW5rRnVuY3Rpb24ob3B0aW9ucywgZXh0ZW5kc1R5cGUpO1xuICAgIGV4dGVuZFR5cGVWYWxpZGF0ZU9wdGlvbnNGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSk7XG4gICAgZXh0ZW5kVHlwZURlZmF1bHRPcHRpb25zKG9wdGlvbnMsIGV4dGVuZHNUeXBlKTtcbiAgICB1dGlscy5yZXZlcnNlRGVlcE1lcmdlKG9wdGlvbnMsIGV4dGVuZHNUeXBlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dGVuZFR5cGVDb250cm9sbGVyRnVuY3Rpb24ob3B0aW9ucywgZXh0ZW5kc1R5cGUpIHtcbiAgICBjb25zdCBleHRlbmRzQ3RybCA9IGV4dGVuZHNUeXBlLmNvbnRyb2xsZXI7XG4gICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChleHRlbmRzQ3RybCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgb3B0aW9uc0N0cmwgPSBvcHRpb25zLmNvbnRyb2xsZXI7XG4gICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnNDdHJsKSkge1xuICAgICAgb3B0aW9ucy5jb250cm9sbGVyID0gZnVuY3Rpb24gKCRzY29wZSwgJGNvbnRyb2xsZXIpIHtcbiAgICAgICAgJGNvbnRyb2xsZXIoZXh0ZW5kc0N0cmwsIHskc2NvcGV9KTtcbiAgICAgICAgJGNvbnRyb2xsZXIob3B0aW9uc0N0cmwsIHskc2NvcGV9KTtcbiAgICAgIH07XG4gICAgICBvcHRpb25zLmNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRjb250cm9sbGVyJ107XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMuY29udHJvbGxlciA9IGV4dGVuZHNDdHJsO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dGVuZFR5cGVMaW5rRnVuY3Rpb24ob3B0aW9ucywgZXh0ZW5kc1R5cGUpIHtcbiAgICBjb25zdCBleHRlbmRzRm4gPSBleHRlbmRzVHlwZS5saW5rO1xuICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoZXh0ZW5kc0ZuKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBvcHRpb25zRm4gPSBvcHRpb25zLmxpbms7XG4gICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnNGbikpIHtcbiAgICAgIG9wdGlvbnMubGluayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXh0ZW5kc0ZuKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIG9wdGlvbnNGbiguLi5hcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucy5saW5rID0gZXh0ZW5kc0ZuO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dGVuZFR5cGVWYWxpZGF0ZU9wdGlvbnNGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSkge1xuICAgIGNvbnN0IGV4dGVuZHNGbiA9IGV4dGVuZHNUeXBlLnZhbGlkYXRlT3B0aW9ucztcbiAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGV4dGVuZHNGbikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgb3B0aW9uc0ZuID0gb3B0aW9ucy52YWxpZGF0ZU9wdGlvbnM7XG4gICAgY29uc3Qgb3JpZ2luYWxEZWZhdWx0T3B0aW9ucyA9IG9wdGlvbnMuZGVmYXVsdE9wdGlvbnM7XG4gICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnNGbikpIHtcbiAgICAgIG9wdGlvbnMudmFsaWRhdGVPcHRpb25zID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9uc0ZuKG9wdGlvbnMpO1xuICAgICAgICBsZXQgbWVyZ2VkT3B0aW9ucyA9IGFuZ3VsYXIuY29weShvcHRpb25zKTtcbiAgICAgICAgbGV0IGRlZmF1bHRPcHRpb25zID0gb3JpZ2luYWxEZWZhdWx0T3B0aW9ucztcbiAgICAgICAgaWYgKGRlZmF1bHRPcHRpb25zKSB7XG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihkZWZhdWx0T3B0aW9ucykpIHtcbiAgICAgICAgICAgIGRlZmF1bHRPcHRpb25zID0gZGVmYXVsdE9wdGlvbnMobWVyZ2VkT3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHV0aWxzLnJldmVyc2VEZWVwTWVyZ2UobWVyZ2VkT3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGV4dGVuZHNGbihtZXJnZWRPcHRpb25zKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMudmFsaWRhdGVPcHRpb25zID0gZXh0ZW5kc0ZuO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dGVuZFR5cGVEZWZhdWx0T3B0aW9ucyhvcHRpb25zLCBleHRlbmRzVHlwZSkge1xuICAgIGNvbnN0IGV4dGVuZHNETyA9IGV4dGVuZHNUeXBlLmRlZmF1bHRPcHRpb25zO1xuICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoZXh0ZW5kc0RPKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBvcHRpb25zRE8gPSBvcHRpb25zLmRlZmF1bHRPcHRpb25zO1xuICAgIGNvbnN0IG9wdGlvbnNET0lzRm4gPSBhbmd1bGFyLmlzRnVuY3Rpb24ob3B0aW9uc0RPKTtcbiAgICBjb25zdCBleHRlbmRzRE9Jc0ZuID0gYW5ndWxhci5pc0Z1bmN0aW9uKGV4dGVuZHNETyk7XG4gICAgaWYgKGV4dGVuZHNET0lzRm4pIHtcbiAgICAgIG9wdGlvbnMuZGVmYXVsdE9wdGlvbnMgPSBmdW5jdGlvbiBkZWZhdWx0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IGV4dGVuZHNEZWZhdWx0T3B0aW9ucyA9IGV4dGVuZHNETyhvcHRpb25zKTtcbiAgICAgICAgY29uc3QgbWVyZ2VkRGVmYXVsdE9wdGlvbnMgPSB7fTtcbiAgICAgICAgdXRpbHMucmV2ZXJzZURlZXBNZXJnZShtZXJnZWREZWZhdWx0T3B0aW9ucywgb3B0aW9ucywgZXh0ZW5kc0RlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgbGV0IGV4dGVuZGVyT3B0aW9uc0RlZmF1bHRPcHRpb25zID0gb3B0aW9uc0RPO1xuICAgICAgICBpZiAob3B0aW9uc0RPSXNGbikge1xuICAgICAgICAgIGV4dGVuZGVyT3B0aW9uc0RlZmF1bHRPcHRpb25zID0gZXh0ZW5kZXJPcHRpb25zRGVmYXVsdE9wdGlvbnMobWVyZ2VkRGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHV0aWxzLnJldmVyc2VEZWVwTWVyZ2UoZXh0ZW5kc0RlZmF1bHRPcHRpb25zLCBleHRlbmRlck9wdGlvbnNEZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBleHRlbmRzRGVmYXVsdE9wdGlvbnM7XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAob3B0aW9uc0RPSXNGbikge1xuICAgICAgb3B0aW9ucy5kZWZhdWx0T3B0aW9ucyA9IGZ1bmN0aW9uIGRlZmF1bHRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IG5ld0RlZmF1bHRPcHRpb25zID0ge307XG4gICAgICAgIHV0aWxzLnJldmVyc2VEZWVwTWVyZ2UobmV3RGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMsIGV4dGVuZHNETyk7XG4gICAgICAgIHJldHVybiBvcHRpb25zRE8obmV3RGVmYXVsdE9wdGlvbnMpO1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRUeXBlKG5hbWUsIHRocm93RXJyb3IsIGVycm9yQ29udGV4dCkge1xuICAgIGlmICghbmFtZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdmFyIHR5cGUgPSB0eXBlTWFwW25hbWVdO1xuICAgIGlmICghdHlwZSAmJiB0aHJvd0Vycm9yID09PSB0cnVlKSB7XG4gICAgICB0aHJvdyBnZXRFcnJvcihcbiAgICAgICAgYFRoZXJlIGlzIG5vIHR5cGUgYnkgdGhlIG5hbWUgb2YgXCIke25hbWV9XCI6ICR7SlNPTi5zdHJpbmdpZnkoZXJyb3JDb250ZXh0KX1gXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZXRXcmFwcGVyKG9wdGlvbnMsIG5hbWUpIHtcbiAgICBpZiAoYW5ndWxhci5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5tYXAod3JhcHBlck9wdGlvbnMgPT4gc2V0V3JhcHBlcih3cmFwcGVyT3B0aW9ucykpO1xuICAgIH0gZWxzZSBpZiAoYW5ndWxhci5pc09iamVjdChvcHRpb25zKSkge1xuICAgICAgb3B0aW9ucy50eXBlcyA9IGdldE9wdGlvbnNUeXBlcyhvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMubmFtZSA9IGdldE9wdGlvbnNOYW1lKG9wdGlvbnMsIG5hbWUpO1xuICAgICAgY2hlY2tXcmFwcGVyQVBJKG9wdGlvbnMpO1xuICAgICAgdGVtcGxhdGVXcmFwcGVyc01hcFtvcHRpb25zLm5hbWVdID0gb3B0aW9ucztcbiAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH0gZWxzZSBpZiAoYW5ndWxhci5pc1N0cmluZyhvcHRpb25zKSkge1xuICAgICAgcmV0dXJuIHNldFdyYXBwZXIoe1xuICAgICAgICB0ZW1wbGF0ZTogb3B0aW9ucyxcbiAgICAgICAgbmFtZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0T3B0aW9uc1R5cGVzKG9wdGlvbnMpIHtcbiAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhvcHRpb25zLnR5cGVzKSkge1xuICAgICAgcmV0dXJuIFtvcHRpb25zLnR5cGVzXTtcbiAgICB9XG4gICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLnR5cGVzKSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy50eXBlcztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRPcHRpb25zTmFtZShvcHRpb25zLCBuYW1lKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubmFtZSB8fCBuYW1lIHx8IG9wdGlvbnMudHlwZXMuam9pbignICcpIHx8IGRlZmF1bHRXcmFwcGVyTmFtZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrV3JhcHBlckFQSShvcHRpb25zKSB7XG4gICAgZm9ybWx5VXNhYmlsaXR5UHJvdmlkZXIuY2hlY2tXcmFwcGVyKG9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zLnRlbXBsYXRlKSB7XG4gICAgICBmb3JtbHlVc2FiaWxpdHlQcm92aWRlci5jaGVja1dyYXBwZXJUZW1wbGF0ZShvcHRpb25zLnRlbXBsYXRlLCBvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKCFvcHRpb25zLm92ZXJ3cml0ZU9rKSB7XG4gICAgICBjaGVja092ZXJ3cml0ZShvcHRpb25zLm5hbWUsIHRlbXBsYXRlV3JhcHBlcnNNYXAsIG9wdGlvbnMsICd0ZW1wbGF0ZVdyYXBwZXJzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSBvcHRpb25zLm92ZXJ3cml0ZU9rO1xuICAgIH1cbiAgICBjaGVja1dyYXBwZXJUeXBlcyhvcHRpb25zKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrV3JhcHBlclR5cGVzKG9wdGlvbnMpIHtcbiAgICBsZXQgc2hvdWxkVGhyb3cgPSAhYW5ndWxhci5pc0FycmF5KG9wdGlvbnMudHlwZXMpIHx8ICFvcHRpb25zLnR5cGVzLmV2ZXJ5KGFuZ3VsYXIuaXNTdHJpbmcpO1xuICAgIGlmIChzaG91bGRUaHJvdykge1xuICAgICAgdGhyb3cgZ2V0RXJyb3IoYEF0dGVtcHRlZCB0byBjcmVhdGUgYSB0ZW1wbGF0ZSB3cmFwcGVyIHdpdGggdHlwZXMgdGhhdCBpcyBub3QgYSBzdHJpbmcgb3IgYW4gYXJyYXkgb2Ygc3RyaW5nc2ApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrT3ZlcndyaXRlKHByb3BlcnR5LCBvYmplY3QsIG5ld1ZhbHVlLCBvYmplY3ROYW1lKSB7XG4gICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgIHdhcm4oW1xuICAgICAgICBgQXR0ZW1wdGluZyB0byBvdmVyd3JpdGUgJHtwcm9wZXJ0eX0gb24gJHtvYmplY3ROYW1lfSB3aGljaCBpcyBjdXJyZW50bHlgLFxuICAgICAgICBgJHtKU09OLnN0cmluZ2lmeShvYmplY3RbcHJvcGVydHldKX0gd2l0aCAke0pTT04uc3RyaW5naWZ5KG5ld1ZhbHVlKX1gLFxuICAgICAgICBgVG8gc3VwcmVzcyB0aGlzIHdhcm5pbmcsIHNwZWNpZnkgdGhlIHByb3BlcnR5IFwib3ZlcndyaXRlT2s6IHRydWVcImBcbiAgICAgIF0uam9pbignICcpKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRXcmFwcGVyKG5hbWUpIHtcbiAgICByZXR1cm4gdGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lIHx8IGRlZmF1bHRXcmFwcGVyTmFtZV07XG4gIH1cblxuICBmdW5jdGlvbiBnZXRXcmFwcGVyQnlUeXBlKHR5cGUpIHtcbiAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo2ICovXG4gICAgdmFyIHdyYXBwZXJzID0gW107XG4gICAgZm9yICh2YXIgbmFtZSBpbiB0ZW1wbGF0ZVdyYXBwZXJzTWFwKSB7XG4gICAgICBpZiAodGVtcGxhdGVXcmFwcGVyc01hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBpZiAodGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lXS50eXBlcyAmJiB0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdLnR5cGVzLmluZGV4T2YodHlwZSkgIT09IC0xKSB7XG4gICAgICAgICAgd3JhcHBlcnMucHVzaCh0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gd3JhcHBlcnM7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVXcmFwcGVyQnlOYW1lKG5hbWUpIHtcbiAgICB2YXIgd3JhcHBlciA9IHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV07XG4gICAgZGVsZXRlIHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV07XG4gICAgcmV0dXJuIHdyYXBwZXI7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVXcmFwcGVyc0ZvclR5cGUodHlwZSkge1xuICAgIHZhciB3cmFwcGVycyA9IGdldFdyYXBwZXJCeVR5cGUodHlwZSk7XG4gICAgaWYgKCF3cmFwcGVycykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWFuZ3VsYXIuaXNBcnJheSh3cmFwcGVycykpIHtcbiAgICAgIHJldHVybiByZW1vdmVXcmFwcGVyQnlOYW1lKHdyYXBwZXJzLm5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3cmFwcGVycy5mb3JFYWNoKCh3cmFwcGVyKSA9PiByZW1vdmVXcmFwcGVyQnlOYW1lKHdyYXBwZXIubmFtZSkpO1xuICAgICAgcmV0dXJuIHdyYXBwZXJzO1xuICAgIH1cbiAgfVxuXG5cbiAgZnVuY3Rpb24gd2FybigpIHtcbiAgICBpZiAoIV90aGlzLmRpc2FibGVXYXJuaW5ncykge1xuICAgICAgY29uc29sZS53YXJuKC4uLmFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9wcm92aWRlcnMvZm9ybWx5Q29uZmlnLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzO1xuXG5cbi8vIEBuZ0luamVjdFxuZnVuY3Rpb24gZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzKCkge1xuXG4gIHZhciB2YWxpZGF0aW9uTWVzc2FnZXMgPSB7XG4gICAgYWRkVGVtcGxhdGVPcHRpb25WYWx1ZU1lc3NhZ2UsXG4gICAgYWRkU3RyaW5nTWVzc2FnZSxcbiAgICBtZXNzYWdlczoge31cbiAgfTtcblxuICByZXR1cm4gdmFsaWRhdGlvbk1lc3NhZ2VzO1xuXG4gIGZ1bmN0aW9uIGFkZFRlbXBsYXRlT3B0aW9uVmFsdWVNZXNzYWdlKG5hbWUsIHByb3AsIHByZWZpeCwgc3VmZml4LCBhbHRlcm5hdGUpIHtcbiAgICB2YWxpZGF0aW9uTWVzc2FnZXMubWVzc2FnZXNbbmFtZV0gPSB0ZW1wbGF0ZU9wdGlvblZhbHVlKHByb3AsIHByZWZpeCwgc3VmZml4LCBhbHRlcm5hdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkU3RyaW5nTWVzc2FnZShuYW1lLCBzdHJpbmcpIHtcbiAgICB2YWxpZGF0aW9uTWVzc2FnZXMubWVzc2FnZXNbbmFtZV0gPSAoKSA9PiBzdHJpbmc7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHRlbXBsYXRlT3B0aW9uVmFsdWUocHJvcCwgcHJlZml4LCBzdWZmaXgsIGFsdGVybmF0ZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiBnZXRWYWxpZGF0aW9uTWVzc2FnZSh2aWV3VmFsdWUsIG1vZGVsVmFsdWUsIHNjb3BlKSB7XG4gICAgICBpZiAoc2NvcGUub3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnNbcHJvcF0pIHtcbiAgICAgICAgcmV0dXJuIGAke3ByZWZpeH0gJHtzY29wZS5vcHRpb25zLnRlbXBsYXRlT3B0aW9uc1twcm9wXX0gJHtzdWZmaXh9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBhbHRlcm5hdGU7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcHJvdmlkZXJzL2Zvcm1seVZhbGlkYXRpb25NZXNzYWdlcy5qc1xuICoqLyIsImltcG9ydCB1dGlscyBmcm9tICcuLi9vdGhlci91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1seVV0aWw7XG5cbi8vIEBuZ0luamVjdFxuZnVuY3Rpb24gZm9ybWx5VXRpbCgpIHtcbiAgcmV0dXJuIHV0aWxzO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vc2VydmljZXMvZm9ybWx5VXRpbC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZvcm1seVdhcm47XG5cbi8vIEBuZ0luamVjdFxuZnVuY3Rpb24gZm9ybWx5V2Fybihmb3JtbHlDb25maWcsIGZvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXgsICRsb2cpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdhcm4oKSB7XG4gICAgaWYgKCFmb3JtbHlDb25maWcuZGlzYWJsZVdhcm5pbmdzKSB7XG4gICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICB2YXIgd2FybkluZm9TbHVnID0gYXJncy5zaGlmdCgpO1xuICAgICAgYXJncy51bnNoaWZ0KCdGb3JtbHkgV2FybmluZzonKTtcbiAgICAgIGFyZ3MucHVzaChgJHtmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4fSR7d2FybkluZm9TbHVnfWApO1xuICAgICAgJGxvZy53YXJuKC4uLmFyZ3MpO1xuICAgIH1cbiAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3NlcnZpY2VzL2Zvcm1seVdhcm4uanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmb3JtbHlDdXN0b21WYWxpZGF0aW9uO1xuXG4vLyBAbmdJbmplY3RcbmZ1bmN0aW9uIGZvcm1seUN1c3RvbVZhbGlkYXRpb24oZm9ybWx5VXRpbCwgJHEpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIHJlcXVpcmU6ICduZ01vZGVsJyxcbiAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWwsIGF0dHJzLCBjdHJsKSB7XG4gICAgICBjb25zdCBvcHRzID0gc2NvcGUub3B0aW9ucztcbiAgICAgIGlmIChvcHRzLnZhbGlkYXRvcnMpIHtcbiAgICAgICAgY2hlY2tWYWxpZGF0b3JzKG9wdHMudmFsaWRhdG9ycyk7XG4gICAgICB9XG4gICAgICBvcHRzLnZhbGlkYXRpb24ubWVzc2FnZXMgPSBvcHRzLnZhbGlkYXRpb24ubWVzc2FnZXMgfHwge307XG4gICAgICBhbmd1bGFyLmZvckVhY2gob3B0cy52YWxpZGF0aW9uLm1lc3NhZ2VzLCAobWVzc2FnZSwga2V5KSA9PiB7XG4gICAgICAgIG9wdHMudmFsaWRhdGlvbi5tZXNzYWdlc1trZXldID0gKCkgPT4ge1xuICAgICAgICAgIHJldHVybiBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIG1lc3NhZ2UsIGN0cmwuJG1vZGVsVmFsdWUsIGN0cmwuJHZpZXdWYWx1ZSk7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuXG4gICAgICB2YXIgdXNlTmV3VmFsaWRhdG9yc0FwaSA9IGN0cmwuaGFzT3duUHJvcGVydHkoJyR2YWxpZGF0b3JzJykgJiYgIWF0dHJzLmhhc093blByb3BlcnR5KCd1c2VQYXJzZXJzJyk7XG4gICAgICBhbmd1bGFyLmZvckVhY2gob3B0cy52YWxpZGF0b3JzLCBmdW5jdGlvbih2YWxpZGF0b3IsIG5hbWUpIHtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSB2YWxpZGF0b3IubWVzc2FnZTtcbiAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICBvcHRzLnZhbGlkYXRpb24ubWVzc2FnZXNbbmFtZV0gPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZm9ybWx5VXRpbC5mb3JtbHlFdmFsKHNjb3BlLCBtZXNzYWdlLCBjdHJsLiRtb2RlbFZhbHVlLCBjdHJsLiR2aWV3VmFsdWUpO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdmFsaWRhdG9yID0gYW5ndWxhci5pc09iamVjdCh2YWxpZGF0b3IpID8gdmFsaWRhdG9yLmV4cHJlc3Npb24gOiB2YWxpZGF0b3I7XG4gICAgICAgIHZhciBpc1Bvc3NpYmx5QXN5bmMgPSAhYW5ndWxhci5pc1N0cmluZyh2YWxpZGF0b3IpO1xuICAgICAgICBpZiAodXNlTmV3VmFsaWRhdG9yc0FwaSkge1xuICAgICAgICAgIHNldHVwV2l0aFZhbGlkYXRvcnMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXR1cFdpdGhQYXJzZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzZXR1cFdpdGhWYWxpZGF0b3JzKCkge1xuICAgICAgICAgIHZhciB2YWxpZGF0b3JDb2xsZWN0aW9uID0gaXNQb3NzaWJseUFzeW5jID8gJyRhc3luY1ZhbGlkYXRvcnMnIDogJyR2YWxpZGF0b3JzJztcbiAgICAgICAgICBjdHJsW3ZhbGlkYXRvckNvbGxlY3Rpb25dW25hbWVdID0gZnVuY3Rpb24obW9kZWxWYWx1ZSwgdmlld1ZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIHZhbGlkYXRvciwgbW9kZWxWYWx1ZSwgdmlld1ZhbHVlKTtcbiAgICAgICAgICAgIGlmIChpc1Bvc3NpYmx5QXN5bmMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGlzUHJvbWlzZUxpa2UodmFsdWUpID8gdmFsdWUgOiB2YWx1ZSA/ICRxLndoZW4odmFsdWUpIDogJHEucmVqZWN0KHZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0dXBXaXRoUGFyc2VycygpIHtcbiAgICAgICAgICBsZXQgaW5GbGlnaHRWYWxpZGF0b3I7XG4gICAgICAgICAgY3RybC4kcGFyc2Vycy51bnNoaWZ0KGZ1bmN0aW9uKHZpZXdWYWx1ZSkge1xuICAgICAgICAgICAgdmFyIGlzVmFsaWQgPSBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIHZhbGlkYXRvciwgY3RybC4kbW9kZWxWYWx1ZSwgdmlld1ZhbHVlKTtcbiAgICAgICAgICAgIGlmIChpc1Byb21pc2VMaWtlKGlzVmFsaWQpKSB7XG4gICAgICAgICAgICAgIGN0cmwuJHBlbmRpbmcgPSBjdHJsLiRwZW5kaW5nIHx8IHt9O1xuICAgICAgICAgICAgICBjdHJsLiRwZW5kaW5nW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaW5GbGlnaHRWYWxpZGF0b3IgPSBpc1ZhbGlkO1xuICAgICAgICAgICAgICBpc1ZhbGlkLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpbkZsaWdodFZhbGlkYXRvciA9PT0gaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgY3RybC4kc2V0VmFsaWRpdHkobmFtZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGluRmxpZ2h0VmFsaWRhdG9yID09PSBpc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICBjdHJsLiRzZXRWYWxpZGl0eShuYW1lLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KS5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoY3RybC4kcGVuZGluZykubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICBkZWxldGUgY3RybC4kcGVuZGluZztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZGVsZXRlIGN0cmwuJHBlbmRpbmdbbmFtZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGN0cmwuJHNldFZhbGlkaXR5KG5hbWUsIGlzVmFsaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZpZXdWYWx1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIGlzUHJvbWlzZUxpa2Uob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBhbmd1bGFyLmlzRnVuY3Rpb24ob2JqLnRoZW4pO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tWYWxpZGF0b3JzKHZhbGlkYXRvcnMpIHtcbiAgICB2YXIgYWxsb3dlZFByb3BlcnRpZXMgPSBbJ2V4cHJlc3Npb24nLCAnbWVzc2FnZSddO1xuICAgIHZhciB2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHMgPSB7fTtcbiAgICBhbmd1bGFyLmZvckVhY2godmFsaWRhdG9ycywgKHZhbGlkYXRvciwgbmFtZSkgPT4ge1xuICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcodmFsaWRhdG9yKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgZXh0cmFQcm9wcyA9IFtdO1xuICAgICAgYW5ndWxhci5mb3JFYWNoKHZhbGlkYXRvciwgKHYsIGtleSkgPT4ge1xuICAgICAgICBpZiAoYWxsb3dlZFByb3BlcnRpZXMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgICAgIGV4dHJhUHJvcHMucHVzaChrZXkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChleHRyYVByb3BzLmxlbmd0aCkge1xuICAgICAgICB2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHNbbmFtZV0gPSBleHRyYVByb3BzO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChPYmplY3Qua2V5cyh2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHMpLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFtcbiAgICAgICAgYFZhbGlkYXRvcnMgYXJlIG9ubHkgYWxsb3dlZCB0byBiZSBmdW5jdGlvbnMgb3Igb2JqZWN0cyB0aGF0IGhhdmUgJHthbGxvd2VkUHJvcGVydGllcy5qb2luKCcsICcpfS5gLFxuICAgICAgICBgWW91IHByb3ZpZGVkIHNvbWUgZXh0cmEgcHJvcGVydGllczogJHtKU09OLnN0cmluZ2lmeSh2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHMpfWBcbiAgICAgIF0uam9pbignICcpKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2RpcmVjdGl2ZXMvZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uLmpzXG4gKiovIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhci1maXgnO1xuXG5leHBvcnQgZGVmYXVsdCBmb3JtbHlGaWVsZDtcblxuLyoqXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAbmFtZSBmb3JtbHlGaWVsZFxuICogQHJlc3RyaWN0IEFFXG4gKi9cbi8vIEBuZ0luamVjdFxuZnVuY3Rpb24gZm9ybWx5RmllbGQoJGh0dHAsICRxLCAkY29tcGlsZSwgJHRlbXBsYXRlQ2FjaGUsIGZvcm1seUNvbmZpZywgZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzLCBmb3JtbHlBcGlDaGVjayxcbiAgICAgICAgICAgICAgICAgICAgIGZvcm1seVV0aWwsIGZvcm1seVVzYWJpbGl0eSwgZm9ybWx5V2Fybikge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQUUnLFxuICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgc2NvcGU6IHtcbiAgICAgIG9wdGlvbnM6ICc9JyxcbiAgICAgIG1vZGVsOiAnPScsXG4gICAgICBmb3JtSWQ6ICdAJyxcbiAgICAgIGluZGV4OiAnPT8nLFxuICAgICAgZmllbGRzOiAnPT8nLFxuICAgICAgZm9ybVN0YXRlOiAnPT8nLFxuICAgICAgZm9ybTogJz0/J1xuICAgIH0sXG4gICAgY29udHJvbGxlcjogZnVuY3Rpb24gZmllbGRDb250cm9sbGVyKCRzY29wZSwgJHRpbWVvdXQsICRwYXJzZSwgJGNvbnRyb2xsZXIpIHtcbiAgICAgIHZhciBvcHRzID0gJHNjb3BlLm9wdGlvbnM7XG4gICAgICB2YXIgZmllbGRUeXBlID0gb3B0cy50eXBlICYmIGZvcm1seUNvbmZpZy5nZXRUeXBlKG9wdHMudHlwZSk7XG4gICAgICBzaW1wbGlmeUxpZmUob3B0cyk7XG4gICAgICBtZXJnZUZpZWxkT3B0aW9uc1dpdGhUeXBlRGVmYXVsdHMob3B0cywgZmllbGRUeXBlKTtcbiAgICAgIGV4dGVuZE9wdGlvbnNXaXRoRGVmYXVsdHMob3B0cywgJHNjb3BlLmluZGV4KTtcbiAgICAgIGNoZWNrQXBpKG9wdHMpO1xuICAgICAgLy8gc2V0IGZpZWxkIGlkIHRvIGxpbmsgbGFiZWxzIGFuZCBmaWVsZHNcbiAgICAgICRzY29wZS5pZCA9IGZvcm1seVV0aWwuZ2V0RmllbGRJZCgkc2NvcGUuZm9ybUlkLCBvcHRzLCAkc2NvcGUuaW5kZXgpO1xuXG4gICAgICAvLyBpbml0YWxpemF0aW9uXG4gICAgICBydW5FeHByZXNzaW9ucygpO1xuICAgICAgc2V0Rm9ybUNvbnRyb2woJHNjb3BlLCBvcHRzKTtcbiAgICAgIGFkZE1vZGVsV2F0Y2hlcigkc2NvcGUsIG9wdHMpO1xuICAgICAgYWRkVmFsaWRhdGlvbk1lc3NhZ2VzKG9wdHMpO1xuICAgICAgLy8gc2ltcGxpZnkgdGhpbmdzXG4gICAgICAvLyBjcmVhdGUgJHNjb3BlLnRvIHNvIHRlbXBsYXRlIGF1dGhvcnMgY2FuIHJlZmVyZW5jZSB0byBpbnN0ZWFkIG9mICRzY29wZS5vcHRpb25zLnRlbXBsYXRlT3B0aW9uc1xuICAgICAgJHNjb3BlLnRvID0gJHNjb3BlLm9wdGlvbnMudGVtcGxhdGVPcHRpb25zO1xuICAgICAgaW52b2tlQ29udHJvbGxlcnMoJHNjb3BlLCBvcHRzLCBmaWVsZFR5cGUpO1xuXG4gICAgICAvLyBmdW5jdGlvbiBkZWZpbml0aW9uc1xuICAgICAgZnVuY3Rpb24gcnVuRXhwcmVzc2lvbnMoKSB7XG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkgeyAvLyBtdXN0IHJ1biBvbiBuZXh0IHRpY2sgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIGN1cnJlbnQgdmFsdWUgaXMgY29ycmVjdC5cbiAgICAgICAgICB2YXIgZmllbGQgPSAkc2NvcGUub3B0aW9ucztcbiAgICAgICAgICB2YXIgY3VycmVudFZhbHVlID0gdmFsdWVHZXR0ZXJTZXR0ZXIoKTtcbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2goZmllbGQuZXhwcmVzc2lvblByb3BlcnRpZXMsIGZ1bmN0aW9uIHJ1bkV4cHJlc3Npb24oZXhwcmVzc2lvbiwgcHJvcCkge1xuICAgICAgICAgICAgdmFyIHNldHRlciA9ICRwYXJzZShwcm9wKS5hc3NpZ247XG4gICAgICAgICAgICB2YXIgcHJvbWlzZSA9ICRxLndoZW4oZm9ybWx5VXRpbC5mb3JtbHlFdmFsKCRzY29wZSwgZXhwcmVzc2lvbiwgY3VycmVudFZhbHVlKSk7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgc2V0dGVyKGZpZWxkLCB2YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHZhbHVlR2V0dGVyU2V0dGVyKG5ld1ZhbCkge1xuICAgICAgICBpZiAoISRzY29wZS5tb2RlbCB8fCAhJHNjb3BlLm9wdGlvbnMua2V5KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChuZXdWYWwpKSB7XG4gICAgICAgICAgJHNjb3BlLm1vZGVsWyRzY29wZS5vcHRpb25zLmtleV0gPSBuZXdWYWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICRzY29wZS5tb2RlbFskc2NvcGUub3B0aW9ucy5rZXldO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzaW1wbGlmeUxpZmUob3B0aW9ucykge1xuICAgICAgICAvLyBhZGQgYSBmZXcgZW1wdHkgb2JqZWN0cyAoaWYgdGhleSBkb24ndCBhbHJlYWR5IGV4aXN0KSBzbyB5b3UgZG9uJ3QgaGF2ZSB0byB1bmRlZmluZWQgY2hlY2sgZXZlcnl3aGVyZVxuICAgICAgICBmb3JtbHlVdGlsLnJldmVyc2VEZWVwTWVyZ2Uob3B0aW9ucywge1xuICAgICAgICAgIGRhdGE6IHt9LFxuICAgICAgICAgIHRlbXBsYXRlT3B0aW9uczoge30sXG4gICAgICAgICAgdmFsaWRhdGlvbjoge31cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG1lcmdlRmllbGRPcHRpb25zV2l0aFR5cGVEZWZhdWx0cyhvcHRpb25zLCB0eXBlKSB7XG4gICAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgICAgbWVyZ2VPcHRpb25zKG9wdGlvbnMsIHR5cGUuZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcm9wZXJPcmRlciA9IGFycmF5aWZ5KG9wdGlvbnMub3B0aW9uc1R5cGVzKS5yZXZlcnNlKCk7IC8vIHNvIHRoZSByaWdodCB0aGluZ3MgYXJlIG92ZXJyaWRkZW5cbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHByb3Blck9yZGVyLCB0eXBlTmFtZSA9PiB7XG4gICAgICAgICAgbWVyZ2VPcHRpb25zKG9wdGlvbnMsIGZvcm1seUNvbmZpZy5nZXRUeXBlKHR5cGVOYW1lLCB0cnVlLCBvcHRpb25zKS5kZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBtZXJnZU9wdGlvbnMob3B0aW9ucywgZXh0cmFPcHRpb25zKSB7XG4gICAgICAgIGlmIChleHRyYU9wdGlvbnMpIHtcbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKGV4dHJhT3B0aW9ucykpIHtcbiAgICAgICAgICAgIGV4dHJhT3B0aW9ucyA9IGV4dHJhT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9ybWx5VXRpbC5yZXZlcnNlRGVlcE1lcmdlKG9wdGlvbnMsIGV4dHJhT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZXh0ZW5kT3B0aW9uc1dpdGhEZWZhdWx0cyhvcHRpb25zLCBpbmRleCkge1xuICAgICAgICBjb25zdCBrZXkgPSBvcHRpb25zLmtleSB8fCBpbmRleCB8fCAwO1xuICAgICAgICBjb25zdCBpbml0aWFsVmFsdWUgPSAkc2NvcGUubW9kZWwgJiYgJHNjb3BlLm1vZGVsW2tleV07XG4gICAgICAgIGFuZ3VsYXIuZXh0ZW5kKG9wdGlvbnMsIHtcbiAgICAgICAgICAvLyBhdHRhY2ggdGhlIGtleSBpbiBjYXNlIHRoZSBmb3JtbHktZmllbGQgZGlyZWN0aXZlIGlzIHVzZWQgZGlyZWN0bHlcbiAgICAgICAgICBrZXksXG4gICAgICAgICAgdmFsdWU6IHZhbHVlR2V0dGVyU2V0dGVyLFxuICAgICAgICAgIHJ1bkV4cHJlc3Npb25zLFxuICAgICAgICAgIHJlc2V0TW9kZWwsXG4gICAgICAgICAgdXBkYXRlSW5pdGlhbFZhbHVlLFxuICAgICAgICAgIGluaXRpYWxWYWx1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gaW5pdGlhbGl6YXRpb24gZnVuY3Rpb25zXG4gICAgICBmdW5jdGlvbiBzZXRGb3JtQ29udHJvbChzY29wZSwgb3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucy5ub0Zvcm1Db250cm9sKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNjb3BlLiR3YXRjaCgnZm9ybVtcIicgKyBzY29wZS5pZCArICdcIl0nLCBmdW5jdGlvbihmb3JtQ29udHJvbCkge1xuICAgICAgICAgIGlmIChmb3JtQ29udHJvbCkge1xuICAgICAgICAgICAgc2NvcGUuZmMgPSBmb3JtQ29udHJvbDsgLy8gc2hvcnRjdXQgZm9yIHRlbXBsYXRlIGF1dGhvcnNcbiAgICAgICAgICAgIHNjb3BlLm9wdGlvbnMuZm9ybUNvbnRyb2wgPSBmb3JtQ29udHJvbDtcbiAgICAgICAgICAgIGFkZFNob3dNZXNzYWdlc1dhdGNoZXIoc2NvcGUsIG9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGFkZE1vZGVsV2F0Y2hlcihzY29wZSwgb3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucy5tb2RlbCkge1xuICAgICAgICAgIHNjb3BlLiR3YXRjaCgnb3B0aW9ucy5tb2RlbCcsIHJ1bkV4cHJlc3Npb25zLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhZGRTaG93TWVzc2FnZXNXYXRjaGVyKHNjb3BlLCBvcHRpb25zKSB7XG4gICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHNjb3BlLm9wdGlvbnMudmFsaWRhdGlvbi5zaG93ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHJldHVybiBzY29wZS5mYy4kaW52YWxpZCAmJiBzY29wZS5vcHRpb25zLnZhbGlkYXRpb24uc2hvdztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IG5vVG91Y2hlZEJ1dERpcnR5ID0gKGFuZ3VsYXIuaXNVbmRlZmluZWQoc2NvcGUuZmMuJHRvdWNoZWQpICYmIHNjb3BlLmZjLiRkaXJ0eSk7XG4gICAgICAgICAgICByZXR1cm4gc2NvcGUuZmMuJGludmFsaWQgJiYgKHNjb3BlLmZjLiR0b3VjaGVkIHx8IG5vVG91Y2hlZEJ1dERpcnR5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uKHNob3cpIHtcbiAgICAgICAgICBvcHRpb25zLnZhbGlkYXRpb24uZXJyb3JFeGlzdHNBbmRTaG91bGRCZVZpc2libGUgPSBzaG93O1xuICAgICAgICAgIHNjb3BlLnNob3dFcnJvciA9IHNob3c7IC8vIHNob3J0Y3V0IGZvciB0ZW1wbGF0ZSBhdXRob3JzXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiByZXNldE1vZGVsKCkge1xuICAgICAgICAkc2NvcGUubW9kZWxbJHNjb3BlLm9wdGlvbnMua2V5XSA9ICRzY29wZS5vcHRpb25zLmluaXRpYWxWYWx1ZTtcbiAgICAgICAgaWYgKCRzY29wZS5vcHRpb25zLmZvcm1Db250cm9sKSB7XG4gICAgICAgICAgJHNjb3BlLm9wdGlvbnMuZm9ybUNvbnRyb2wuJHNldFZpZXdWYWx1ZSgkc2NvcGUubW9kZWxbJHNjb3BlLm9wdGlvbnMua2V5XSk7XG4gICAgICAgICAgJHNjb3BlLm9wdGlvbnMuZm9ybUNvbnRyb2wuJHJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHVwZGF0ZUluaXRpYWxWYWx1ZSgpIHtcbiAgICAgICAgJHNjb3BlLm9wdGlvbnMuaW5pdGlhbFZhbHVlID0gJHNjb3BlLm1vZGVsWyRzY29wZS5vcHRpb25zLmtleV07XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGFkZFZhbGlkYXRpb25NZXNzYWdlcyhvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlcyA9IG9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlcyB8fCB7fTtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcy5tZXNzYWdlcywgZnVuY3Rpb24oZXhwcmVzc2lvbiwgbmFtZSkge1xuICAgICAgICAgIGlmICghb3B0aW9ucy52YWxpZGF0aW9uLm1lc3NhZ2VzW25hbWVdKSB7XG4gICAgICAgICAgICBvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXNbbmFtZV0gPSBmdW5jdGlvbih2aWV3VmFsdWUsIG1vZGVsVmFsdWUsIHNjb3BlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIGV4cHJlc3Npb24sIG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGludm9rZUNvbnRyb2xsZXJzKHNjb3BlLCBvcHRpb25zID0ge30sIHR5cGUgPSB7fSkge1xuICAgICAgICBhbmd1bGFyLmZvckVhY2goW3R5cGUuY29udHJvbGxlciwgb3B0aW9ucy5jb250cm9sbGVyXSwgY29udHJvbGxlciA9PiB7XG4gICAgICAgICAgaWYgKGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICRjb250cm9sbGVyKGNvbnRyb2xsZXIsIHskc2NvcGU6IHNjb3BlfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGxpbms6IGZ1bmN0aW9uIGZpZWxkTGluayhzY29wZSwgZWwpIHtcbiAgICAgIHZhciB0eXBlID0gc2NvcGUub3B0aW9ucy50eXBlICYmIGZvcm1seUNvbmZpZy5nZXRUeXBlKHNjb3BlLm9wdGlvbnMudHlwZSk7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHZhciB0aHVzbHkgPSB0aGlzO1xuICAgICAgZ2V0RmllbGRUZW1wbGF0ZShzY29wZS5vcHRpb25zKVxuICAgICAgICAudGhlbihydW5NYW5pcHVsYXRvcnMoZm9ybWx5Q29uZmlnLnRlbXBsYXRlTWFuaXB1bGF0b3JzLnByZVdyYXBwZXIpKVxuICAgICAgICAudGhlbih0cmFuc2NsdWRlSW5XcmFwcGVycyhzY29wZS5vcHRpb25zKSlcbiAgICAgICAgLnRoZW4ocnVuTWFuaXB1bGF0b3JzKGZvcm1seUNvbmZpZy50ZW1wbGF0ZU1hbmlwdWxhdG9ycy5wb3N0V3JhcHBlcikpXG4gICAgICAgIC50aGVuKHNldEVsZW1lbnRUZW1wbGF0ZSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBmb3JtbHlXYXJuKFxuICAgICAgICAgICAgJ3RoZXJlLXdhcy1hLXByb2JsZW0tc2V0dGluZy10aGUtdGVtcGxhdGUtZm9yLXRoaXMtZmllbGQnLFxuICAgICAgICAgICAgJ1RoZXJlIHdhcyBhIHByb2JsZW0gc2V0dGluZyB0aGUgdGVtcGxhdGUgZm9yIHRoaXMgZmllbGQgJyxcbiAgICAgICAgICAgIHNjb3BlLm9wdGlvbnMsXG4gICAgICAgICAgICBlcnJvclxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICBmdW5jdGlvbiBzZXRFbGVtZW50VGVtcGxhdGUodGVtcGxhdGVFbCkge1xuICAgICAgICBlbC5odG1sKGFzSHRtbCh0ZW1wbGF0ZUVsKSk7XG4gICAgICAgICRjb21waWxlKGVsLmNvbnRlbnRzKCkpKHNjb3BlKTtcbiAgICAgICAgaWYgKHR5cGUgJiYgdHlwZS5saW5rKSB7XG4gICAgICAgICAgdHlwZS5saW5rLmFwcGx5KHRodXNseSwgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLm9wdGlvbnMubGluaykge1xuICAgICAgICAgIHNjb3BlLm9wdGlvbnMubGluay5hcHBseSh0aHVzbHksIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHJ1bk1hbmlwdWxhdG9ycyhtYW5pcHVsYXRvcnMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHJ1bk1hbmlwdWxhdG9yc09uVGVtcGxhdGUodGVtcGxhdGUpIHtcbiAgICAgICAgICB2YXIgY2hhaW4gPSAkcS53aGVuKHRlbXBsYXRlKTtcbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2gobWFuaXB1bGF0b3JzLCBtYW5pcHVsYXRvciA9PiB7XG4gICAgICAgICAgICBjaGFpbiA9IGNoYWluLnRoZW4odGVtcGxhdGUgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbihtYW5pcHVsYXRvcih0ZW1wbGF0ZSwgc2NvcGUub3B0aW9ucywgc2NvcGUpKS50aGVuKG5ld1RlbXBsYXRlID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYW5ndWxhci5pc1N0cmluZyhuZXdUZW1wbGF0ZSkgPyBuZXdUZW1wbGF0ZSA6IGFzSHRtbChuZXdUZW1wbGF0ZSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBhc0h0bWwoZWwpIHtcbiAgICB2YXIgd3JhcHBlciA9IGFuZ3VsYXIuZWxlbWVudCgnPGE+PC9hPicpO1xuICAgIHJldHVybiB3cmFwcGVyLmFwcGVuZChlbCkuaHRtbCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RmllbGRUZW1wbGF0ZShvcHRpb25zKSB7XG4gICAgbGV0IHR5cGUgPSBmb3JtbHlDb25maWcuZ2V0VHlwZShvcHRpb25zLnR5cGUsIHRydWUsIG9wdGlvbnMpO1xuICAgIGxldCB0ZW1wbGF0ZSA9IG9wdGlvbnMudGVtcGxhdGUgfHwgdHlwZSAmJiB0eXBlLnRlbXBsYXRlO1xuICAgIGxldCB0ZW1wbGF0ZVVybCA9IG9wdGlvbnMudGVtcGxhdGVVcmwgfHwgdHlwZSAmJiB0eXBlLnRlbXBsYXRlVXJsO1xuICAgIGlmICghdGVtcGxhdGUgJiYgIXRlbXBsYXRlVXJsKSB7XG4gICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHkuZ2V0RmllbGRFcnJvcihcbiAgICAgICAgJ3R5cGUtdHlwZS1oYXMtbm8tdGVtcGxhdGUnLFxuICAgICAgICBgVHlwZSAnJHtvcHRpb25zLnR5cGV9JyBoYXMgbm90IHRlbXBsYXRlLiBPbiBlbGVtZW50OmAsIG9wdGlvbnNcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBnZXRUZW1wbGF0ZSh0ZW1wbGF0ZSB8fCB0ZW1wbGF0ZVVybCwgIXRlbXBsYXRlKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gZ2V0VGVtcGxhdGUodGVtcGxhdGUsIGlzVXJsKSB7XG4gICAgaWYgKCFpc1VybCkge1xuICAgICAgcmV0dXJuICRxLndoZW4odGVtcGxhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgaHR0cE9wdGlvbnMgPSB7Y2FjaGU6ICR0ZW1wbGF0ZUNhY2hlfTtcbiAgICAgIHJldHVybiAkaHR0cC5nZXQodGVtcGxhdGUsIGh0dHBPcHRpb25zKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgZm9ybWx5V2FybihcbiAgICAgICAgICAncHJvYmxlbS1sb2FkaW5nLXRlbXBsYXRlLWZvci10ZW1wbGF0ZXVybCcsXG4gICAgICAgICAgJ1Byb2JsZW0gbG9hZGluZyB0ZW1wbGF0ZSBmb3IgJyArIHRlbXBsYXRlLFxuICAgICAgICAgIGVycm9yXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2NsdWRlSW5XcmFwcGVycyhvcHRpb25zKSB7XG4gICAgbGV0IHdyYXBwZXIgPSBnZXRXcmFwcGVyT3B0aW9uKG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHRyYW5zY2x1ZGVUZW1wbGF0ZSh0ZW1wbGF0ZSkge1xuICAgICAgaWYgKCF3cmFwcGVyLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gJHEud2hlbih0ZW1wbGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIHdyYXBwZXIuZm9yRWFjaCgod3JhcHBlcikgPT4ge1xuICAgICAgICBmb3JtbHlVc2FiaWxpdHkuY2hlY2tXcmFwcGVyKHdyYXBwZXIsIG9wdGlvbnMpO1xuICAgICAgICB3cmFwcGVyLnZhbGlkYXRlT3B0aW9ucyAmJiB3cmFwcGVyLnZhbGlkYXRlT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgcnVuQXBpQ2hlY2sod3JhcHBlciwgb3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICAgIGxldCBwcm9taXNlcyA9IHdyYXBwZXIubWFwKHcgPT4gZ2V0VGVtcGxhdGUody50ZW1wbGF0ZSB8fCB3LnRlbXBsYXRlVXJsLCAhdy50ZW1wbGF0ZSkpO1xuICAgICAgcmV0dXJuICRxLmFsbChwcm9taXNlcykudGhlbih3cmFwcGVyc1RlbXBsYXRlcyA9PiB7XG4gICAgICAgIHdyYXBwZXJzVGVtcGxhdGVzLmZvckVhY2goKHdyYXBwZXJUZW1wbGF0ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBmb3JtbHlVc2FiaWxpdHkuY2hlY2tXcmFwcGVyVGVtcGxhdGUod3JhcHBlclRlbXBsYXRlLCB3cmFwcGVyW2luZGV4XSk7XG4gICAgICAgIH0pO1xuICAgICAgICB3cmFwcGVyc1RlbXBsYXRlcy5yZXZlcnNlKCk7IC8vIHdyYXBwZXIgMCBpcyB3cmFwcGVkIGluIHdyYXBwZXIgMSBhbmQgc28gb24uLi5cbiAgICAgICAgbGV0IHRvdGFsV3JhcHBlciA9IHdyYXBwZXJzVGVtcGxhdGVzLnNoaWZ0KCk7XG4gICAgICAgIHdyYXBwZXJzVGVtcGxhdGVzLmZvckVhY2god3JhcHBlclRlbXBsYXRlID0+IHtcbiAgICAgICAgICB0b3RhbFdyYXBwZXIgPSBkb1RyYW5zY2x1c2lvbih0b3RhbFdyYXBwZXIsIHdyYXBwZXJUZW1wbGF0ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZG9UcmFuc2NsdXNpb24odG90YWxXcmFwcGVyLCB0ZW1wbGF0ZSk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZG9UcmFuc2NsdXNpb24od3JhcHBlciwgdGVtcGxhdGUpIHtcbiAgICBsZXQgc3VwZXJXcmFwcGVyID0gYW5ndWxhci5lbGVtZW50KCc8YT48L2E+Jyk7IC8vIHRoaXMgYWxsb3dzIHBlb3BsZSBub3QgaGF2ZSB0byBoYXZlIGEgc2luZ2xlIHJvb3QgaW4gd3JhcHBlcnNcbiAgICBzdXBlcldyYXBwZXIuYXBwZW5kKHdyYXBwZXIpO1xuICAgIGxldCB0cmFuc2NsdWRlRWwgPSBzdXBlcldyYXBwZXIuZmluZCgnZm9ybWx5LXRyYW5zY2x1ZGUnKTtcbiAgICBpZiAoIXRyYW5zY2x1ZGVFbC5sZW5ndGgpIHtcbiAgICAgIC8vdHJ5IGl0IHVzaW5nIG91ciBjdXN0b20gZmluZCBmdW5jdGlvblxuICAgICAgdHJhbnNjbHVkZUVsID0gZm9ybWx5VXRpbC5maW5kQnlOb2RlTmFtZShzdXBlcldyYXBwZXIsICdmb3JtbHktdHJhbnNjbHVkZScpO1xuICAgIH1cbiAgICB0cmFuc2NsdWRlRWwucmVwbGFjZVdpdGgodGVtcGxhdGUpO1xuICAgIHJldHVybiBzdXBlcldyYXBwZXIuaHRtbCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0V3JhcHBlck9wdGlvbihvcHRpb25zKSB7XG4gICAgbGV0IHdyYXBwZXIgPSBvcHRpb25zLndyYXBwZXI7XG4gICAgLy8gZXhwbGljaXQgbnVsbCBtZWFucyBubyB3cmFwcGVyXG4gICAgaWYgKHdyYXBwZXIgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICAvLyBub3RoaW5nIHNwZWNpZmllZCBtZWFucyB1c2UgdGhlIGRlZmF1bHQgd3JhcHBlciBmb3IgdGhlIHR5cGVcbiAgICBpZiAoIXdyYXBwZXIpIHtcbiAgICAgIC8vIGdldCBhbGwgd3JhcHBlcnMgdGhhdCBzcGVjaWZ5IHRoZXkgYXBwbHkgdG8gdGhpcyB0eXBlXG4gICAgICB3cmFwcGVyID0gYXJyYXlpZnkoZm9ybWx5Q29uZmlnLmdldFdyYXBwZXJCeVR5cGUob3B0aW9ucy50eXBlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdyYXBwZXIgPSBhcnJheWlmeSh3cmFwcGVyKS5tYXAoZm9ybWx5Q29uZmlnLmdldFdyYXBwZXIpO1xuICAgIH1cblxuICAgIC8vIGdldCBhbGwgd3JhcHBlcnMgZm9yIHRoYXQgdGhpcyB0eXBlIHNwZWNpZmllZCB0aGF0IGl0IHVzZXMuXG4gICAgdmFyIHR5cGUgPSBmb3JtbHlDb25maWcuZ2V0VHlwZShvcHRpb25zLnR5cGUsIHRydWUsIG9wdGlvbnMpO1xuICAgIGlmICh0eXBlICYmIHR5cGUud3JhcHBlcikge1xuICAgICAgbGV0IHR5cGVXcmFwcGVycyA9IGFycmF5aWZ5KHR5cGUud3JhcHBlcikubWFwKGZvcm1seUNvbmZpZy5nZXRXcmFwcGVyKTtcbiAgICAgIHdyYXBwZXIgPSB3cmFwcGVyLmNvbmNhdCh0eXBlV3JhcHBlcnMpO1xuICAgIH1cblxuICAgIC8vIGFkZCB0aGUgZGVmYXVsdCB3cmFwcGVyIGxhc3RcbiAgICB2YXIgZGVmYXVsdFdyYXBwZXIgPSBmb3JtbHlDb25maWcuZ2V0V3JhcHBlcigpO1xuICAgIGlmIChkZWZhdWx0V3JhcHBlcikge1xuICAgICAgd3JhcHBlci5wdXNoKGRlZmF1bHRXcmFwcGVyKTtcbiAgICB9XG4gICAgcmV0dXJuIHdyYXBwZXI7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0FwaShvcHRpb25zKSB7XG4gICAgZm9ybWx5QXBpQ2hlY2sudGhyb3coZm9ybWx5QXBpQ2hlY2suZm9ybWx5RmllbGRPcHRpb25zLCBvcHRpb25zLCB7XG4gICAgICBwcmVmaXg6ICdmb3JtbHktZmllbGQgZGlyZWN0aXZlJyxcbiAgICAgIHVybDogJ2Zvcm1seS1maWVsZC1kaXJlY3RpdmUtdmFsaWRhdGlvbi1mYWlsZWQnXG4gICAgfSk7XG4gICAgLy8gdmFsaWRhdGUgd2l0aCB0aGUgdHlwZVxuICAgIGNvbnN0IHR5cGUgPSBvcHRpb25zLnR5cGUgJiYgZm9ybWx5Q29uZmlnLmdldFR5cGUob3B0aW9ucy50eXBlKTtcbiAgICBpZiAodHlwZSkge1xuICAgICAgaWYgKHR5cGUudmFsaWRhdGVPcHRpb25zKSB7XG4gICAgICAgIHR5cGUudmFsaWRhdGVPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgcnVuQXBpQ2hlY2sodHlwZSwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcnVuQXBpQ2hlY2soe2FwaUNoZWNrLCBhcGlDaGVja0luc3RhbmNlLCBhcGlDaGVja0Z1bmN0aW9uLCBhcGlDaGVja09wdGlvbnN9LCBvcHRpb25zKSB7XG4gICAgaWYgKCFhcGlDaGVjaykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpbnN0YW5jZSA9IGFwaUNoZWNrSW5zdGFuY2UgfHwgZm9ybWx5QXBpQ2hlY2s7XG4gICAgY29uc3QgZm4gPSBhcGlDaGVja0Z1bmN0aW9uIHx8ICd3YXJuJztcbiAgICBjb25zdCBzaGFwZSA9IGluc3RhbmNlLnNoYXBlKGFwaUNoZWNrKTtcbiAgICBpbnN0YW5jZVtmbl0oc2hhcGUsIG9wdGlvbnMsIGFwaUNoZWNrT3B0aW9ucyB8fCB7XG4gICAgICBwcmVmaXg6IGBmb3JtbHktZmllbGQgJHtuYW1lfWAsXG4gICAgICB1cmw6IGZvcm1seUFwaUNoZWNrLmNvbmZpZy5vdXRwdXQuZG9jc0Jhc2VVcmwgKyAnZm9ybWx5LWZpZWxkLXR5cGUtYXBpY2hlY2stZmFpbGVkJ1xuICAgIH0pO1xuICB9XG5cbn1cblxuZnVuY3Rpb24gYXJyYXlpZnkob2JqKSB7XG4gIGlmIChvYmogJiYgIWFuZ3VsYXIuaXNBcnJheShvYmopKSB7XG4gICAgb2JqID0gW29ial07XG4gIH0gZWxzZSBpZiAoIW9iaikge1xuICAgIG9iaiA9IFtdO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9kaXJlY3RpdmVzL2Zvcm1seS1maWVsZC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZvcm1seUZvY3VzO1xuXG4vLyBAbmdJbmplY3RcbmZ1bmN0aW9uIGZvcm1seUZvY3VzKCR0aW1lb3V0LCAkZG9jdW1lbnQpIHtcbiAgLyoganNoaW50IC1XMDUyICovXG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgIHZhciBwcmV2aW91c0VsID0gbnVsbDtcbiAgICAgIHZhciBlbCA9IGVsZW1lbnRbMF07XG4gICAgICB2YXIgZG9jID0gJGRvY3VtZW50WzBdO1xuICAgICAgYXR0cnMuJG9ic2VydmUoJ2Zvcm1seUZvY3VzJywgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHByZXZpb3VzRWwgPSBkb2MuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgICAgIGVsLmZvY3VzKCk7XG4gICAgICAgICAgfSwgfn5hdHRycy5mb2N1c1dhaXQpO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAnZmFsc2UnKSB7XG4gICAgICAgICAgaWYgKGRvYy5hY3RpdmVFbGVtZW50ID09PSBlbCkge1xuICAgICAgICAgICAgZWwuYmx1cigpO1xuICAgICAgICAgICAgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KCdyZWZvY3VzJykgJiYgcHJldmlvdXNFbCkge1xuICAgICAgICAgICAgICBwcmV2aW91c0VsLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9kaXJlY3RpdmVzL2Zvcm1seS1mb2N1cy5qc1xuICoqLyIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXItZml4JztcblxuZXhwb3J0IGRlZmF1bHQgZm9ybWx5Rm9ybTtcblxuLyoqXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAbmFtZSBmb3JtbHlGb3JtXG4gKiBAcmVzdHJpY3QgRVxuICovXG4vLyBAbmdJbmplY3RcbmZ1bmN0aW9uIGZvcm1seUZvcm0oZm9ybWx5VXNhYmlsaXR5LCAkcGFyc2UsIGZvcm1seUFwaUNoZWNrLCBmb3JtbHlDb25maWcpIHtcbiAgdmFyIGN1cnJlbnRGb3JtSWQgPSAxO1xuICB2YXIgb3B0aW9uc0FwaSA9IFtcbiAgICBmb3JtbHlBcGlDaGVjay5zaGFwZSh7XG4gICAgICBmb3JtU3RhdGU6IGZvcm1seUFwaUNoZWNrLm9iamVjdC5vcHRpb25hbCxcbiAgICAgIHJlc2V0TW9kZWw6IGZvcm1seUFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gICAgICB1cGRhdGVJbml0aWFsVmFsdWU6IGZvcm1seUFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gICAgICByZW1vdmVDaHJvbWVBdXRvQ29tcGxldGU6IGZvcm1seUFwaUNoZWNrLmJvb2wub3B0aW9uYWxcbiAgICB9KS5zdHJpY3Qub3B0aW9uYWxcbiAgXTtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHRlbXBsYXRlOiBmdW5jdGlvbihlbCwgYXR0cnMpIHtcbiAgICAgIC8qIGpzaGludCAtVzAzMyAqLyAvLyB0aGlzIGJlY2F1c2UganNoaW50IGlzIGJyb2tlbiBJIGd1ZXNzLi4uXG4gICAgICBjb25zdCByb290RWwgPSBhdHRycy5yb290RWwgfHwgJ25nLWZvcm0nO1xuICAgICAgY29uc3QgZm9ybU5hbWUgPSBgZm9ybWx5XyR7Y3VycmVudEZvcm1JZCsrfWA7XG4gICAgICByZXR1cm4gYFxuICAgICAgICA8JHtyb290RWx9IGNsYXNzPVwiZm9ybWx5XCJcbiAgICAgICAgICAgICAgICAgbmFtZT1cIiR7Zm9ybU5hbWV9XCJcbiAgICAgICAgICAgICAgICAgcm9sZT1cImZvcm1cIj5cbiAgICAgICAgICA8ZGl2IGZvcm1seS1maWVsZFxuICAgICAgICAgICAgICAgbmctcmVwZWF0PVwiZmllbGQgaW4gZmllbGRzIHRyYWNrIGJ5ICRpbmRleFwiXG4gICAgICAgICAgICAgICBuZy1pZj1cIiFmaWVsZC5oaWRlXCJcbiAgICAgICAgICAgICAgIGNsYXNzPVwiZm9ybWx5LWZpZWxkIHt7ZmllbGQudHlwZSA/ICdmb3JtbHktZmllbGQtJyArIGZpZWxkLnR5cGUgOiAnJ319XCJcbiAgICAgICAgICAgICAgIG9wdGlvbnM9XCJmaWVsZFwiXG4gICAgICAgICAgICAgICBtb2RlbD1cImZpZWxkLm1vZGVsIHx8IG1vZGVsXCJcbiAgICAgICAgICAgICAgIGZpZWxkcz1cImZpZWxkc1wiXG4gICAgICAgICAgICAgICBmb3JtPVwiJHtmb3JtTmFtZX1cIlxuICAgICAgICAgICAgICAgZm9ybS1pZD1cIiR7Zm9ybU5hbWV9XCJcbiAgICAgICAgICAgICAgIGZvcm0tc3RhdGU9XCJvcHRpb25zLmZvcm1TdGF0ZVwiXG4gICAgICAgICAgICAgICBpbmRleD1cIiRpbmRleFwiPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgbmctdHJhbnNjbHVkZT48L2Rpdj5cbiAgICAgICAgPC8ke3Jvb3RFbH0+XG4gICAgICBgO1xuICAgIH0sXG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICB0cmFuc2NsdWRlOiB0cnVlLFxuICAgIHNjb3BlOiB7XG4gICAgICBmaWVsZHM6ICc9JyxcbiAgICAgIG1vZGVsOiAnPScsXG4gICAgICBmb3JtOiAnPT8nLFxuICAgICAgb3B0aW9uczogJz0/J1xuICAgIH0sXG4gICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICBzZXR1cE9wdGlvbnMoKTtcbiAgICAgICRzY29wZS5tb2RlbCA9ICRzY29wZS5tb2RlbCB8fCB7fTtcbiAgICAgICRzY29wZS5maWVsZHMgPSAkc2NvcGUuZmllbGRzIHx8IFtdO1xuXG4gICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgYXR0YWNoS2V5KTsgLy8gYXR0YWNoZXMgYSBrZXkgYmFzZWQgb24gdGhlIGluZGV4IGlmIGEga2V5IGlzbid0IHNwZWNpZmllZFxuICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5maWVsZHMsIHNldHVwV2F0Y2hlcnMpOyAvLyBzZXR1cCB3YXRjaGVycyBmb3IgYWxsIGZpZWxkc1xuXG4gICAgICAvLyB3YXRjaCB0aGUgbW9kZWwgYW5kIGV2YWx1YXRlIHdhdGNoIGV4cHJlc3Npb25zIHRoYXQgZGVwZW5kIG9uIGl0LlxuICAgICAgJHNjb3BlLiR3YXRjaCgnbW9kZWwnLCBmdW5jdGlvbiBvblJlc3VsdFVwZGF0ZShuZXdSZXN1bHQpIHtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5maWVsZHMsIGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAgICAgLypqc2hpbnQgLVcwMzAgKi9cbiAgICAgICAgICBmaWVsZC5ydW5FeHByZXNzaW9ucyAmJiBmaWVsZC5ydW5FeHByZXNzaW9ucyhuZXdSZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICAgIH0sIHRydWUpO1xuXG4gICAgICBmdW5jdGlvbiBzZXR1cE9wdGlvbnMoKSB7XG4gICAgICAgIGZvcm1seUFwaUNoZWNrLnRocm93KG9wdGlvbnNBcGksIFskc2NvcGUub3B0aW9uc10sIHtwcmVmaXg6ICdmb3JtbHktZm9ybSBvcHRpb25zIGNoZWNrJ30pO1xuICAgICAgICAkc2NvcGUub3B0aW9ucyA9ICRzY29wZS5vcHRpb25zIHx8IHt9O1xuICAgICAgICAkc2NvcGUub3B0aW9ucy5mb3JtU3RhdGUgPSAkc2NvcGUub3B0aW9ucy5mb3JtU3RhdGUgfHwge307XG5cbiAgICAgICAgYW5ndWxhci5leHRlbmQoJHNjb3BlLm9wdGlvbnMsIHtcbiAgICAgICAgICB1cGRhdGVJbml0aWFsVmFsdWUsXG4gICAgICAgICAgcmVzZXRNb2RlbFxuICAgICAgICB9KTtcblxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB1cGRhdGVJbml0aWFsVmFsdWUoKSB7XG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZmllbGRzLCBmaWVsZCA9PiBmaWVsZC51cGRhdGVJbml0aWFsVmFsdWUoKSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHJlc2V0TW9kZWwoKSB7XG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZmllbGRzLCBmaWVsZCA9PiBmaWVsZC5yZXNldE1vZGVsKCkpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhdHRhY2hLZXkoZmllbGQsIGluZGV4KSB7XG4gICAgICAgIGZpZWxkLmtleSA9IGZpZWxkLmtleSB8fCBpbmRleCB8fCAwO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzZXR1cFdhdGNoZXJzKGZpZWxkLCBpbmRleCkge1xuICAgICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGZpZWxkLndhdGNoZXIpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciB3YXRjaGVycyA9IGZpZWxkLndhdGNoZXI7XG4gICAgICAgIGlmICghYW5ndWxhci5pc0FycmF5KHdhdGNoZXJzKSkge1xuICAgICAgICAgIHdhdGNoZXJzID0gW3dhdGNoZXJzXTtcbiAgICAgICAgfVxuICAgICAgICBhbmd1bGFyLmZvckVhY2god2F0Y2hlcnMsIGZ1bmN0aW9uKHdhdGNoZXIpIHtcbiAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKHdhdGNoZXIubGlzdGVuZXIpKSB7XG4gICAgICAgICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHkuZ2V0RmllbGRFcnJvcihcbiAgICAgICAgICAgICAgJ2FsbC1maWVsZC13YXRjaGVycy1tdXN0LWhhdmUtYS1saXN0ZW5lcicsXG4gICAgICAgICAgICAgICdBbGwgZmllbGQgd2F0Y2hlcnMgbXVzdCBoYXZlIGEgbGlzdGVuZXInLCBmaWVsZFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHdhdGNoRXhwcmVzc2lvbiA9IGdldFdhdGNoRXhwcmVzc2lvbih3YXRjaGVyLCBmaWVsZCwgaW5kZXgpO1xuICAgICAgICAgIHZhciB3YXRjaExpc3RlbmVyID0gZ2V0V2F0Y2hMaXN0ZW5lcih3YXRjaGVyLCBmaWVsZCwgaW5kZXgpO1xuXG4gICAgICAgICAgdmFyIHR5cGUgPSB3YXRjaGVyLnR5cGUgfHwgJyR3YXRjaCc7XG4gICAgICAgICAgd2F0Y2hlci5zdG9wV2F0Y2hpbmcgPSAkc2NvcGVbdHlwZV0od2F0Y2hFeHByZXNzaW9uLCB3YXRjaExpc3RlbmVyLCB3YXRjaGVyLndhdGNoRGVlcCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRXYXRjaEV4cHJlc3Npb24od2F0Y2hlciwgZmllbGQsIGluZGV4KSB7XG4gICAgICAgIHZhciB3YXRjaEV4cHJlc3Npb24gPSB3YXRjaGVyLmV4cHJlc3Npb24gfHwgYG1vZGVsWycke2ZpZWxkLmtleX0nXWA7XG4gICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24od2F0Y2hFeHByZXNzaW9uKSkge1xuICAgICAgICAgIC8vIHdyYXAgdGhlIGZpZWxkJ3Mgd2F0Y2ggZXhwcmVzc2lvbiBzbyB3ZSBjYW4gY2FsbCBpdCB3aXRoIHRoZSBmaWVsZCBhcyB0aGUgZmlyc3QgYXJnXG4gICAgICAgICAgLy8gYW5kIHRoZSBzdG9wIGZ1bmN0aW9uIGFzIHRoZSBsYXN0IGFyZyBhcyBhIGhlbHBlclxuICAgICAgICAgIHZhciBvcmlnaW5hbEV4cHJlc3Npb24gPSB3YXRjaEV4cHJlc3Npb247XG4gICAgICAgICAgd2F0Y2hFeHByZXNzaW9uID0gZnVuY3Rpb24gZm9ybWx5V2F0Y2hFeHByZXNzaW9uKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBtb2RpZnlBcmdzKHdhdGNoZXIsIGluZGV4LCAuLi5hcmd1bWVudHMpO1xuICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsRXhwcmVzc2lvbiguLi5hcmdzKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHdhdGNoRXhwcmVzc2lvbi5kaXNwbGF5TmFtZSA9IGBGb3JtbHkgV2F0Y2ggRXhwcmVzc2lvbiBmb3IgZmllbGQgZm9yICR7ZmllbGQua2V5fWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdhdGNoRXhwcmVzc2lvbjtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZ2V0V2F0Y2hMaXN0ZW5lcih3YXRjaGVyLCBmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgdmFyIHdhdGNoTGlzdGVuZXIgPSB3YXRjaGVyLmxpc3RlbmVyO1xuICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHdhdGNoTGlzdGVuZXIpKSB7XG4gICAgICAgICAgLy8gd3JhcCB0aGUgZmllbGQncyB3YXRjaCBsaXN0ZW5lciBzbyB3ZSBjYW4gY2FsbCBpdCB3aXRoIHRoZSBmaWVsZCBhcyB0aGUgZmlyc3QgYXJnXG4gICAgICAgICAgLy8gYW5kIHRoZSBzdG9wIGZ1bmN0aW9uIGFzIHRoZSBsYXN0IGFyZyBhcyBhIGhlbHBlclxuICAgICAgICAgIHZhciBvcmlnaW5hbExpc3RlbmVyID0gd2F0Y2hMaXN0ZW5lcjtcbiAgICAgICAgICB3YXRjaExpc3RlbmVyID0gZnVuY3Rpb24gZm9ybWx5V2F0Y2hMaXN0ZW5lcigpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gbW9kaWZ5QXJncyh3YXRjaGVyLCBpbmRleCwgLi4uYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbExpc3RlbmVyKC4uLmFyZ3MpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgd2F0Y2hMaXN0ZW5lci5kaXNwbGF5TmFtZSA9IGBGb3JtbHkgV2F0Y2ggTGlzdGVuZXIgZm9yIGZpZWxkIGZvciAke2ZpZWxkLmtleX1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB3YXRjaExpc3RlbmVyO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBtb2RpZnlBcmdzKHdhdGNoZXIsIGluZGV4LCAuLi5vcmlnaW5hbEFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIFskc2NvcGUuZmllbGRzW2luZGV4XSwgLi4ub3JpZ2luYWxBcmdzLCB3YXRjaGVyLnN0b3BXYXRjaGluZ107XG4gICAgICB9XG4gICAgfSxcbiAgICBsaW5rKHNjb3BlLCBlbCwgYXR0cnMpIHtcbiAgICAgIGlmIChhdHRycy5mb3JtKSB7XG4gICAgICAgIGNvbnN0IGZvcm1JZCA9IGF0dHJzLm5hbWU7XG4gICAgICAgICRwYXJzZShhdHRycy5mb3JtKS5hc3NpZ24oc2NvcGUuJHBhcmVudCwgc2NvcGVbZm9ybUlkXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNocm9tZSBhdXRvY29tcGxldGUgbGFtZW5lc3NcbiAgICAgIC8vIHNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY4MTUzI2MxNFxuICAgICAgLy8g4YOaKOCyoOebiuCyoOGDmikgICAo4pWvwrDilqHCsCnila/vuLUg4pS74pSB4pS7ICAgICjil57igLjil5/vvJspXG4gICAgICBjb25zdCBnbG9iYWwgPSBmb3JtbHlDb25maWcuZXh0cmFzLnJlbW92ZUNocm9tZUF1dG9Db21wbGV0ZSA9PT0gdHJ1ZTtcbiAgICAgIGNvbnN0IG9mZkluc3RhbmNlID0gc2NvcGUub3B0aW9ucyAmJiBzY29wZS5vcHRpb25zLnJlbW92ZUNocm9tZUF1dG9Db21wbGV0ZSA9PT0gZmFsc2U7XG4gICAgICBjb25zdCBvbkluc3RhbmNlID0gc2NvcGUub3B0aW9ucyAmJiBzY29wZS5vcHRpb25zLnJlbW92ZUNocm9tZUF1dG9Db21wbGV0ZSA9PT0gdHJ1ZTtcbiAgICAgIGlmICgoZ2xvYmFsICYmICFvZmZJbnN0YW5jZSkgfHwgb25JbnN0YW5jZSkge1xuICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnYXV0b2NvbXBsZXRlJywgJ2FkZHJlc3MtbGV2ZWw0Jyk7XG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgdHJ1ZSk7XG4gICAgICAgIGVsWzBdLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9kaXJlY3RpdmVzL2Zvcm1seS1mb3JtLmpzXG4gKiovIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhci1maXgnO1xuXG5leHBvcnQgZGVmYXVsdCBhZGRGb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvcjtcblxuLy8gQG5nSW5qZWN0XG5mdW5jdGlvbiBhZGRGb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvcihmb3JtbHlDb25maWcpIHtcbiAgaWYgKGZvcm1seUNvbmZpZy5leHRyYXMuZGlzYWJsZU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvcm1seUNvbmZpZy50ZW1wbGF0ZU1hbmlwdWxhdG9ycy5wcmVXcmFwcGVyLnB1c2gobmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IpO1xuXG5cbiAgZnVuY3Rpb24gbmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IodGVtcGxhdGUsIG9wdGlvbnMsIHNjb3BlKSB7XG4gICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NiAqL1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHZhciBkYXRhID0gb3B0aW9ucy5kYXRhO1xuICAgIGlmIChkYXRhLnNraXBOZ01vZGVsQXR0cnNNYW5pcHVsYXRvciA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH1cbiAgICBlbC5pbm5lckhUTUwgPSB0ZW1wbGF0ZTtcbiAgICB2YXIgbW9kZWxOb2RlcyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tuZy1tb2RlbF0nKTtcbiAgICBpZiAoIW1vZGVsTm9kZXMgfHwgIW1vZGVsTm9kZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgfVxuXG4gICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsTm9kZXMsICdpZCcsIHNjb3BlLmlkKTtcbiAgICBhZGRJZk5vdFByZXNlbnQobW9kZWxOb2RlcywgJ25hbWUnLCBzY29wZS5pZCk7XG5cbiAgICBhZGRWYWxpZGF0aW9uKCk7XG4gICAgYWRkTW9kZWxPcHRpb25zKCk7XG4gICAgYWRkVGVtcGxhdGVPcHRpb25zQXR0cnMoKTtcblxuXG4gICAgcmV0dXJuIGVsLmlubmVySFRNTDtcblxuXG4gICAgZnVuY3Rpb24gYWRkVmFsaWRhdGlvbigpIHtcbiAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLnZhbGlkYXRvcnMpIHx8IGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlcykpIHtcbiAgICAgICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsTm9kZXMsICdmb3JtbHktY3VzdG9tLXZhbGlkYXRpb24nLCAnJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkTW9kZWxPcHRpb25zKCkge1xuICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMubW9kZWxPcHRpb25zKSkge1xuICAgICAgICBhZGRJZk5vdFByZXNlbnQobW9kZWxOb2RlcywgJ25nLW1vZGVsLW9wdGlvbnMnLCAnb3B0aW9ucy5tb2RlbE9wdGlvbnMnKTtcbiAgICAgICAgaWYgKG9wdGlvbnMubW9kZWxPcHRpb25zLmdldHRlclNldHRlcikge1xuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChtb2RlbE5vZGVzLCBub2RlID0+IHtcbiAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKCduZy1tb2RlbCcsICdvcHRpb25zLnZhbHVlJyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUZW1wbGF0ZU9wdGlvbnNBdHRycygpIHtcbiAgICAgIGlmICghb3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnMgJiYgIW9wdGlvbnMuZXhwcmVzc2lvblByb3BlcnRpZXMpIHtcbiAgICAgICAgLy8gbm8gbmVlZCB0byBydW4gdGhlc2UgaWYgdGhlcmUgYXJlIG5vIHRlbXBsYXRlT3B0aW9ucyBvciBleHByZXNzaW9uUHJvcGVydGllc1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCB0byA9IG9wdGlvbnMudGVtcGxhdGVPcHRpb25zIHx8IHt9O1xuICAgICAgY29uc3QgZXAgPSBvcHRpb25zLmV4cHJlc3Npb25Qcm9wZXJ0aWVzIHx8IHt9O1xuXG4gICAgICBsZXQgbmdNb2RlbEF0dHJpYnV0ZXMgPSBnZXRCdWlsdEluQXR0cmlidXRlcygpO1xuXG4gICAgICAvLyBleHRlbmQgd2l0aCB0aGUgdXNlcidzIHNwZWNpZmljYXRpb25zIHdpbm5pbmdcbiAgICAgIGFuZ3VsYXIuZXh0ZW5kKG5nTW9kZWxBdHRyaWJ1dGVzLCBvcHRpb25zLm5nTW9kZWxBdHRycyk7XG5cbiAgICAgIC8vIEZlZWwgZnJlZSB0byBtYWtlIHRoaXMgbW9yZSBzaW1wbGUgOi0pXG4gICAgICBhbmd1bGFyLmZvckVhY2gobmdNb2RlbEF0dHJpYnV0ZXMsICh2YWwsIG5hbWUpID0+IHtcbiAgICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6MTQgKi9cbiAgICAgICAgbGV0IGF0dHJWYWw7XG4gICAgICAgIGxldCBhdHRyTmFtZTtcbiAgICAgICAgY29uc3QgcmVmID0gYG9wdGlvbnMudGVtcGxhdGVPcHRpb25zWycke25hbWV9J11gO1xuICAgICAgICBjb25zdCB0b1ZhbCA9IHRvW25hbWVdO1xuICAgICAgICBjb25zdCBlcFZhbCA9IGdldEVwVmFsdWUoZXAsIG5hbWUpO1xuXG4gICAgICAgIGNvbnN0IGluVG8gPSBhbmd1bGFyLmlzRGVmaW5lZCh0b1ZhbCk7XG4gICAgICAgIGNvbnN0IGluRXAgPSBhbmd1bGFyLmlzRGVmaW5lZChlcFZhbCk7XG4gICAgICAgIGlmICh2YWwudmFsdWUpIHtcbiAgICAgICAgICAvLyBJIHJlYWxpemUgdGhpcyBsb29rcyBiYWNrd2FyZHMsIGJ1dCBpdCdzIHJpZ2h0LCB0cnVzdCBtZS4uLlxuICAgICAgICAgIGF0dHJOYW1lID0gdmFsLnZhbHVlO1xuICAgICAgICAgIGF0dHJWYWwgPSBuYW1lO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbC5leHByZXNzaW9uICYmIGluVG8pIHtcbiAgICAgICAgICBhdHRyTmFtZSA9IHZhbC5leHByZXNzaW9uO1xuICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKHRvW25hbWVdKSkge1xuICAgICAgICAgICAgYXR0clZhbCA9IGAkZXZhbCgke3JlZn0pYDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih0b1tuYW1lXSkpIHtcbiAgICAgICAgICAgIGF0dHJWYWwgPSBgJHtyZWZ9KG1vZGVsW29wdGlvbnMua2V5XSwgb3B0aW9ucywgdGhpcywgJGV2ZW50KWA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgYG9wdGlvbnMudGVtcGxhdGVPcHRpb25zLiR7bmFtZX0gbXVzdCBiZSBhIHN0cmluZyBvciBmdW5jdGlvbjogJHtKU09OLnN0cmluZ2lmeShvcHRpb25zKX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh2YWwuYm91bmQgJiYgaW5FcCkge1xuICAgICAgICAgIGF0dHJOYW1lID0gdmFsLmJvdW5kO1xuICAgICAgICAgIGF0dHJWYWwgPSByZWY7XG4gICAgICAgIH0gZWxzZSBpZiAoKHZhbC5hdHRyaWJ1dGUgfHwgdmFsLmJvb2xlYW4pICYmIGluRXApIHtcbiAgICAgICAgICBhdHRyTmFtZSA9IHZhbC5hdHRyaWJ1dGUgfHwgdmFsLmJvb2xlYW47XG4gICAgICAgICAgYXR0clZhbCA9IGB7eyR7cmVmfX19YDtcbiAgICAgICAgfSBlbHNlIGlmICh2YWwuYXR0cmlidXRlICYmIGluVG8pIHtcbiAgICAgICAgICBhdHRyTmFtZSA9IHZhbC5hdHRyaWJ1dGU7XG4gICAgICAgICAgYXR0clZhbCA9IHRvVmFsO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbC5ib29sZWFuKSB7XG4gICAgICAgICAgaWYgKGluVG8gJiYgIWluRXAgJiYgdG9WYWwpIHtcbiAgICAgICAgICAgIGF0dHJOYW1lID0gdmFsLmJvb2xlYW47XG4gICAgICAgICAgICBhdHRyVmFsID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8ganNoaW50IC1XMDM1XG4gICAgICAgICAgICAvLyBlbXB0eSB0byBpbGx1c3RyYXRlIHRoYXQgYSBib29sZWFuIHdpbGwgbm90IGJlIGFkZGVkIHZpYSB2YWwuYm91bmRcbiAgICAgICAgICAgIC8vIGlmIHlvdSB3YW50IGl0IGFkZGVkIHZpYSB2YWwuYm91bmQsIHRoZW4gcHV0IGl0IGluIGV4cHJlc3Npb25Qcm9wZXJ0aWVzXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHZhbC5ib3VuZCAmJiBpblRvKSB7XG4gICAgICAgICAgYXR0ck5hbWUgPSB2YWwuYm91bmQ7XG4gICAgICAgICAgYXR0clZhbCA9IHJlZjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChhdHRyTmFtZSkgJiYgYW5ndWxhci5pc0RlZmluZWQoYXR0clZhbCkpIHtcbiAgICAgICAgICBhZGRJZk5vdFByZXNlbnQobW9kZWxOb2RlcywgYXR0ck5hbWUsIGF0dHJWYWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBVdGlsaXR5IGZ1bmN0aW9uc1xuICBmdW5jdGlvbiBnZXRCdWlsdEluQXR0cmlidXRlcygpIHtcbiAgICBsZXQgbmdNb2RlbEF0dHJpYnV0ZXMgPSB7XG4gICAgICBmb2N1czoge1xuICAgICAgICBhdHRyaWJ1dGU6ICdmb3JtbHktZm9jdXMnXG4gICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBib3VuZE9ubHkgPSBbXTtcbiAgICBjb25zdCBib3RoQm9vbGVhbkFuZEJvdW5kID0gWydyZXF1aXJlZCcsICdkaXNhYmxlZCddO1xuICAgIGNvbnN0IGJvdGhBdHRyaWJ1dGVBbmRCb3VuZCA9IFsncGF0dGVybicsICdtaW5sZW5ndGgnXTtcbiAgICBjb25zdCBleHByZXNzaW9uT25seSA9IFsnY2hhbmdlJywgJ2tleWRvd24nLCAna2V5dXAnLCAna2V5cHJlc3MnLCAnY2xpY2snLCAnZm9jdXMnLCAnYmx1ciddO1xuICAgIGNvbnN0IGF0dHJpYnV0ZU9ubHkgPSBbJ3BsYWNlaG9sZGVyJywgJ21pbicsICdtYXgnLCAndGFiaW5kZXgnLCAndHlwZSddO1xuICAgIGlmIChmb3JtbHlDb25maWcuZXh0cmFzLm5nTW9kZWxBdHRyc01hbmlwdWxhdG9yUHJlZmVyVW5ib3VuZCkge1xuICAgICAgYm90aEF0dHJpYnV0ZUFuZEJvdW5kLnB1c2goJ21heGxlbmd0aCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBib3VuZE9ubHkucHVzaCgnbWF4bGVuZ3RoJyk7XG4gICAgfVxuXG4gICAgYW5ndWxhci5mb3JFYWNoKGJvdW5kT25seSwgaXRlbSA9PiB7XG4gICAgICBuZ01vZGVsQXR0cmlidXRlc1tpdGVtXSA9IHtib3VuZDogJ25nLScgKyBpdGVtfTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIuZm9yRWFjaChib3RoQm9vbGVhbkFuZEJvdW5kLCBpdGVtID0+IHtcbiAgICAgIG5nTW9kZWxBdHRyaWJ1dGVzW2l0ZW1dID0ge2Jvb2xlYW46IGl0ZW0sIGJvdW5kOiAnbmctJyArIGl0ZW19O1xuICAgIH0pO1xuXG4gICAgYW5ndWxhci5mb3JFYWNoKGJvdGhBdHRyaWJ1dGVBbmRCb3VuZCwgaXRlbSA9PiB7XG4gICAgICBuZ01vZGVsQXR0cmlidXRlc1tpdGVtXSA9IHthdHRyaWJ1dGU6IGl0ZW0sIGJvdW5kOiAnbmctJyArIGl0ZW19O1xuICAgIH0pO1xuXG4gICAgYW5ndWxhci5mb3JFYWNoKGV4cHJlc3Npb25Pbmx5LCBpdGVtID0+IHtcbiAgICAgIHZhciBwcm9wTmFtZSA9ICdvbicgKyBpdGVtLnN1YnN0cigwLCAxKS50b1VwcGVyQ2FzZSgpICsgaXRlbS5zdWJzdHIoMSk7XG4gICAgICBuZ01vZGVsQXR0cmlidXRlc1twcm9wTmFtZV0gPSB7ZXhwcmVzc2lvbjogJ25nLScgKyBpdGVtfTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIuZm9yRWFjaChhdHRyaWJ1dGVPbmx5LCBpdGVtID0+IHtcbiAgICAgIG5nTW9kZWxBdHRyaWJ1dGVzW2l0ZW1dID0ge2F0dHJpYnV0ZTogaXRlbX07XG4gICAgfSk7XG4gICAgcmV0dXJuIG5nTW9kZWxBdHRyaWJ1dGVzO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RXBWYWx1ZShlcCwgbmFtZSkge1xuICAgIHJldHVybiBlcFsndGVtcGxhdGVPcHRpb25zLicgKyBuYW1lXSB8fFxuICAgICAgZXBbYHRlbXBsYXRlT3B0aW9uc1snJHtuYW1lfSddYF0gfHxcbiAgICAgIGVwW2B0ZW1wbGF0ZU9wdGlvbnNbXCIke25hbWV9XCJdYF07XG4gIH1cblxuICBmdW5jdGlvbiBhZGRJZk5vdFByZXNlbnQobm9kZXMsIGF0dHIsIHZhbCkge1xuICAgIGFuZ3VsYXIuZm9yRWFjaChub2Rlcywgbm9kZSA9PiB7XG4gICAgICBpZiAoIW5vZGUuZ2V0QXR0cmlidXRlKGF0dHIpKSB7XG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGF0dHIsIHZhbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3J1bi9mb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvci5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGFkZEN1c3RvbVRhZ3M7XG5cbi8vIEBuZ0luamVjdFxuZnVuY3Rpb24gYWRkQ3VzdG9tVGFncygkZG9jdW1lbnQpIHtcbiAgaWYgKCRkb2N1bWVudCAmJiAkZG9jdW1lbnQuZ2V0KSB7XG4gICAgLy9JRTggY2hlY2sgLT5cbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwOTY0OTY2L2RldGVjdC1pZS12ZXJzaW9uLXByaW9yLXRvLXY5LWluLWphdmFzY3JpcHQvMTA5NjUyMDMjMTA5NjUyMDNcbiAgICBjb25zdCBkb2N1bWVudCA9ICRkb2N1bWVudC5nZXQoMCk7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmlubmVySFRNTCA9ICc8IS0tW2lmIGx0IElFIDldPjxpPjwvaT48IVtlbmRpZl0tLT4nO1xuICAgIGNvbnN0IGlzSWVMZXNzVGhhbjkgPSAoZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpJykubGVuZ3RoID09PSAxKTtcblxuICAgIGlmIChpc0llTGVzc1RoYW45KSB7XG4gICAgICAvL2FkZCB0aGUgY3VzdG9tIGVsZW1lbnRzIHRoYXQgd2UgbmVlZCBmb3IgZm9ybWx5XG4gICAgICBjb25zdCBjdXN0b21FbGVtZW50cyA9IFtcbiAgICAgICAgJ2Zvcm1seS1maWVsZCcsICdmb3JtbHktZm9ybScsICdmb3JtbHktY3VzdG9tLXZhbGlkYXRpb24nLCAnZm9ybWx5LWZvY3VzJywgJ2Zvcm1seS10cmFuc3Bvc2UnXG4gICAgICBdO1xuICAgICAgYW5ndWxhci5mb3JFYWNoKGN1c3RvbUVsZW1lbnRzLCBlbCA9PiB7XG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWwpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9ydW4vZm9ybWx5Q3VzdG9tVGFncy5qc1xuICoqLyIsIi8vIHNvbWUgdmVyc2lvbnMgb2YgYW5ndWxhciBkb24ndCBleHBvcnQgdGhlIGFuZ3VsYXIgbW9kdWxlIHByb3Blcmx5LFxuLy8gc28gd2UgZ2V0IGl0IGZyb20gd2luZG93IGluIHRoaXMgY2FzZS5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaWYgKCFhbmd1bGFyLnZlcnNpb24pIHtcbiAgYW5ndWxhciA9IHdpbmRvdy5hbmd1bGFyO1xufVxuZXhwb3J0IGRlZmF1bHQgYW5ndWxhcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2FuZ3VsYXItZml4L2luZGV4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE2X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJhcGlDaGVja1wiLFwiYW1kXCI6XCJhcGktY2hlY2tcIixcImNvbW1vbmpzMlwiOlwiYXBpLWNoZWNrXCIsXCJjb21tb25qc1wiOlwiYXBpLWNoZWNrXCJ9XG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xN19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJhbmd1bGFyXCJcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhci1maXgnO1xuXG5leHBvcnQgZGVmYXVsdCB7Zm9ybWx5RXZhbCwgZ2V0RmllbGRJZCwgcmV2ZXJzZURlZXBNZXJnZSwgZmluZEJ5Tm9kZU5hbWV9O1xuXG5mdW5jdGlvbiBmb3JtbHlFdmFsKHNjb3BlLCBleHByZXNzaW9uLCAkbW9kZWxWYWx1ZSwgJHZpZXdWYWx1ZSkge1xuICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKGV4cHJlc3Npb24pKSB7XG4gICAgcmV0dXJuIGV4cHJlc3Npb24oJHZpZXdWYWx1ZSwgJG1vZGVsVmFsdWUsIHNjb3BlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc2NvcGUuJGV2YWwoZXhwcmVzc2lvbiwgeyR2aWV3VmFsdWUsICRtb2RlbFZhbHVlfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RmllbGRJZChmb3JtSWQsIG9wdGlvbnMsIGluZGV4KSB7XG4gIHZhciB0eXBlID0gb3B0aW9ucy50eXBlO1xuICBpZiAoIXR5cGUgJiYgb3B0aW9ucy50ZW1wbGF0ZSkge1xuICAgIHR5cGUgPSAndGVtcGxhdGUnO1xuICB9IGVsc2UgaWYgKCF0eXBlICYmIG9wdGlvbnMudGVtcGxhdGVVcmwpIHtcbiAgICB0eXBlID0gJ3RlbXBsYXRlVXJsJztcbiAgfVxuXG4gIHJldHVybiBbZm9ybUlkLCB0eXBlLCBvcHRpb25zLmtleSwgaW5kZXhdLmpvaW4oJ18nKTtcbn1cblxuXG5mdW5jdGlvbiByZXZlcnNlRGVlcE1lcmdlKGRlc3QpIHtcbiAgYW5ndWxhci5mb3JFYWNoKGFyZ3VtZW50cywgKHNyYywgaW5kZXgpID0+IHtcbiAgICBpZiAoIWluZGV4KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGFuZ3VsYXIuZm9yRWFjaChzcmMsICh2YWwsIHByb3ApID0+IHtcbiAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoZGVzdFtwcm9wXSkpIHtcbiAgICAgICAgZGVzdFtwcm9wXSA9IGFuZ3VsYXIuY29weSh2YWwpO1xuICAgICAgfSBlbHNlIGlmIChvYmpBbmRTYW1lVHlwZShkZXN0W3Byb3BdLCB2YWwpKSB7XG4gICAgICAgIHJldmVyc2VEZWVwTWVyZ2UoZGVzdFtwcm9wXSwgdmFsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG9iakFuZFNhbWVUeXBlKG9iajEsIG9iajIpIHtcbiAgcmV0dXJuIGFuZ3VsYXIuaXNPYmplY3Qob2JqMSkgJiYgYW5ndWxhci5pc09iamVjdChvYmoyKSAmJlxuICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmoxKSA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iajIpO1xufVxuXG4vL3JlY3Vyc2UgZG93biBhIG5vZGUgdHJlZSB0byBmaW5kIGEgbm9kZSB3aXRoIG1hdGNoaW5nIG5vZGVOYW1lLCBmb3IgY3VzdG9tIHRhZ3MgalF1ZXJ5LmZpbmQgZG9lc24ndCB3b3JrIGluIElFOFxuZnVuY3Rpb24gZmluZEJ5Tm9kZU5hbWUoZWwsIG5vZGVOYW1lKSB7XG4gIGlmICghZWwucHJvcCkgeyAvLyBub3QgYSBqUXVlcnkgb3IganFMaXRlIG9iamVjdCAtPiB3cmFwIGl0XG4gICAgZWwgPSBhbmd1bGFyLmVsZW1lbnQoZWwpO1xuICB9XG5cbiAgaWYgKGVsLnByb3AoJ25vZGVOYW1lJykgPT09IG5vZGVOYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICByZXR1cm4gZWw7XG4gIH1cblxuICB2YXIgYyA9IGVsLmNoaWxkcmVuKCk7XG4gIGZvcih2YXIgaSA9IDA7IGMgJiYgaSA8IGMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgbm9kZSA9IGZpbmRCeU5vZGVOYW1lKGNbaV0sIG5vZGVOYW1lKTtcbiAgICBpZiAobm9kZSkge1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9vdGhlci91dGlscy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=