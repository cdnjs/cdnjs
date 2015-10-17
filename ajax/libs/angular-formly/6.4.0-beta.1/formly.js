// angular-formly version 6.4.0-beta.1 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)

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
	ngModule.constant("formlyVersion", ("6.4.0-beta.1")); // <-- webpack variable
	
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
	  key: apiCheck.oneOfType([apiCheck.string, apiCheck.number]).optional,
	  model: apiCheck.object.optional,
	  className: apiCheck.string.optional,
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
	
	var fieldGroup = apiCheck.shape({
	  $$hashKey: apiCheck.any.optional,
	  fieldGroup: apiCheck.arrayOf(formlyFieldOptions),
	  className: apiCheck.string.optional
	}).strict;
	
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
	  formlyTypeOptions: formlyTypeOptions, formlyFieldOptions: formlyFieldOptions, formlyExpression: formlyExpression, formlyWrapperType: formlyWrapperType, fieldGroup: fieldGroup
	});
	
	module.exports = apiCheck;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = "https://github.com/formly-js/angular-formly/blob/" + ("6.4.0-beta.1") + "/other/ERRORS_AND_WARNINGS.md#";

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
	      if ($scope.options.fieldGroup) {
	        return;
	      }
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
	      if (scope.options.fieldGroup) {
	        checkFieldGroupApi(scope.options);
	        el.addClass("formly-field-group");
	        setElementTemplate("\n          <formly-form model=\"model\"\n                       fields=\"options.fieldGroup\"\n                       options=\"$parent.options\"\n                       class=\"" + scope.options.className + "\"\n                       is-field-group>\n          </formly-form>\n        ");
	        return;
	      }
	
	      addClasses();
	
	      var type = scope.options.type && formlyConfig.getType(scope.options.type);
	      var args = arguments;
	      var thusly = this;
	      getFieldTemplate(scope.options).then(runManipulators(formlyConfig.templateManipulators.preWrapper)).then(transcludeInWrappers(scope.options)).then(runManipulators(formlyConfig.templateManipulators.postWrapper)).then(setElementTemplate).then(watchFormControl).then(callLinkFunctions)["catch"](function (error) {
	        formlyWarn("there-was-a-problem-setting-the-template-for-this-field", "There was a problem setting the template for this field ", scope.options, error);
	      });
	
	      function addClasses() {
	        if (scope.options.className) {
	          el.addClass(scope.options.className);
	        }
	        if (scope.options.type) {
	          el.addClass("formly-field-" + scope.options.type);
	        }
	      }
	
	      function setElementTemplate(templateString) {
	        el.html(asHtml(templateString));
	        $compile(el.contents())(scope);
	        return templateString;
	      }
	
	      function watchFormControl(templateString) {
	        var stopWatchingField = angular.noop;
	        var stopWatchingShowError = angular.noop;
	        if (scope.options.noFormControl) {
	          return;
	        }
	        var templateEl = angular.element("<div>" + templateString + "</div>");
	        var ngModelNode = templateEl[0].querySelector("[ng-model]");
	        if (ngModelNode && ngModelNode.name) {
	          watchFieldNameOrExistence(ngModelNode.name);
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
	
	      function callLinkFunctions() {
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
	
	  function checkFieldGroupApi(options) {
	    formlyApiCheck["throw"](formlyApiCheck.fieldGroup, options, {
	      prefix: "formly-field directive",
	      url: "formly-field-directive-validation-failed"
	    });
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
	      var parentFormAttributes = undefined;
	      if (attrs.hasOwnProperty("isFieldGroup") && el.parent().parent().hasClass("formly")) {
	        parentFormAttributes = copyAttributes(el.parent().parent()[0].attributes);
	      }
	      return "\n        <" + rootEl + " class=\"formly\"\n                 name=\"" + getFormName() + "\"\n                 role=\"form\" " + parentFormAttributes + ">\n          <div formly-field\n               ng-repeat=\"field in fields " + getTrackBy() + "\"\n               " + getHideDirective() + "=\"!field.hide\"\n               class=\"formly-field\"\n               options=\"field\"\n               model=\"field.model || model\"\n               fields=\"fields\"\n               form=\"" + formId + "\"\n               form-id=\"" + formId + "\"\n               form-state=\"options.formState\"\n               index=\"$index\">\n          </div>\n          <div ng-transclude></div>\n        </" + rootEl + ">\n      ";
	
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
	          // we can do a one-time binding here because we know we're in 1.3.x territory
	          formName = "{{::'formly_' + " + bindName + "}}";
	        }
	        return formName;
	      }
	
	      function copyAttributes(attributes) {
	        //console.log(attributes);
	        var excluded = ["model", "form", "fields", "options", "name", "role", "class"];
	        var arrayAttrs = [];
	        angular.forEach(attributes, function (_ref) {
	          var nodeName = _ref.nodeName;
	          var nodeValue = _ref.nodeValue;
	
	          if (nodeName !== "undefined" && excluded.indexOf(nodeName) === -1) {
	            arrayAttrs.push("" + toKebabCase(nodeName) + "=\"" + nodeValue + "\"");
	          }
	        });
	        return arrayAttrs.join(" ");
	      }
	
	      function toKebabCase(string) {
	        if (string) {
	          return string.replace(/([A-Z])/g, function ($1) {
	            return "-" + $1.toLowerCase();
	          });
	        } else {
	          return "";
	        }
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
	          !isFieldGroup(field) && field.runExpressions && field.runExpressions(newResult);
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
	        if (!isFieldGroup(field)) {
	          field.key = field.key || index || 0;
	        }
	      }
	
	      function setupWatchers(field, index) {
	        if (isFieldGroup(field) || !angular.isDefined(field.watcher)) {
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
	
	      function isFieldGroup(field) {
	        return field && !!field.fieldGroup;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1MjhlZDhkNGMxODI3MWRjY2E4ZCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2Zvcm1seUFwaUNoZWNrLmpzIiwid2VicGFjazovLy8uL290aGVyL2RvY3NCYXNlVXJsLmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlVc2FiaWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2Zvcm1seUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzLmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL2Zvcm1seVV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmljZXMvZm9ybWx5V2Fybi5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1maWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1mb2N1cy5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1mb3JtLmpzIiwid2VicGFjazovLy8uL3J1bi9mb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ydW4vZm9ybWx5Q3VzdG9tVGFncy5qcyIsIndlYnBhY2s6Ly8vLi9hbmd1bGFyLWZpeC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiYXBpQ2hlY2tcIixcImFtZFwiOlwiYXBpLWNoZWNrXCIsXCJjb21tb25qczJcIjpcImFwaS1jaGVja1wiLFwiY29tbW9uanNcIjpcImFwaS1jaGVja1wifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyXCIiLCJ3ZWJwYWNrOi8vLy4vb3RoZXIvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0tDdENPLEtBQUssdUNBQU0sQ0FBZ0I7O2tCQUNuQixLQUFLLEM7Ozs7Ozs7Ozs7S0NEYixPQUFPLHVDQUFNLEVBQWE7O0tBRTFCLGNBQWMsdUNBQU0sQ0FBNEI7O0tBQ2hELCtCQUErQix1Q0FBTSxDQUFxQjs7S0FDMUQsZUFBZSx1Q0FBTSxDQUE2Qjs7S0FDbEQsWUFBWSx1Q0FBTSxDQUEwQjs7S0FDNUMsd0JBQXdCLHVDQUFNLENBQXNDOztLQUNwRSxVQUFVLHVDQUFNLENBQXVCOztLQUN2QyxVQUFVLHVDQUFNLENBQXVCOztLQUV2QyxzQkFBc0IsdUNBQU0sQ0FBdUM7O0tBQ25FLFdBQVcsdUNBQU0sRUFBMkI7O0tBQzVDLFdBQVcsdUNBQU0sRUFBMkI7O0tBQzVDLFVBQVUsdUNBQU0sRUFBMEI7O0tBRTFDLDZCQUE2Qix1Q0FBTSxFQUFxQzs7S0FDeEUsZ0JBQWdCLHVDQUFNLEVBQXdCOztBQUVyRCxLQUFNLFlBQVksR0FBRyxRQUFRLENBQUM7O2tCQUVmLFlBQVk7O0FBRTNCLEtBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUVsRCxTQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ3BELFNBQVEsQ0FBQyxRQUFRLENBQUMs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QUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDL0Q7OztBQUdELFVBQVMsY0FBYyxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUU7QUFDcEMsT0FBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUU7O0FBQ1osT0FBRSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUI7O0FBRUQsT0FBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRTtBQUNsRCxZQUFPLEVBQUUsQ0FBQztJQUNYOztBQUVELE9BQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN0QixRQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDckMsU0FBSSxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMxQyxTQUFJLElBQUksRUFBRTtBQUNSLGNBQU8sSUFBSSxDQUFDO01BQ2I7SUFDRiIsImZpbGUiOiJmb3JtbHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJhcGktY2hlY2tcIiksIHJlcXVpcmUoXCJhbmd1bGFyXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImFwaS1jaGVja1wiLCBcImFuZ3VsYXJcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wibmdGb3JtbHlcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJhcGktY2hlY2tcIiksIHJlcXVpcmUoXCJhbmd1bGFyXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJuZ0Zvcm1seVwiXSA9IGZhY3Rvcnkocm9vdFtcImFwaUNoZWNrXCJdLCByb290W1wiYW5ndWxhclwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE2X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTdfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNTI4ZWQ4ZDRjMTgyNzFkY2NhOGRcbiAqKi8iLCJpbXBvcnQgaW5kZXggZnJvbSAnLi9pbmRleC5jb21tb24nO1xuZXhwb3J0IGRlZmF1bHQgaW5kZXg7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9pbmRleC5qc1xuICoqLyIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXItZml4JztcblxuaW1wb3J0IGZvcm1seUFwaUNoZWNrIGZyb20gJy4vcHJvdmlkZXJzL2Zvcm1seUFwaUNoZWNrJztcbmltcG9ydCBmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4IGZyb20gJy4vb3RoZXIvZG9jc0Jhc2VVcmwnO1xuaW1wb3J0IGZvcm1seVVzYWJpbGl0eSBmcm9tICcuL3Byb3ZpZGVycy9mb3JtbHlVc2FiaWxpdHknO1xuaW1wb3J0IGZvcm1seUNvbmZpZyBmcm9tICcuL3Byb3ZpZGVycy9mb3JtbHlDb25maWcnO1xuaW1wb3J0IGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcyBmcm9tICcuL3Byb3ZpZGVycy9mb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMnO1xuaW1wb3J0IGZvcm1seVV0aWwgZnJvbSAnLi9zZXJ2aWNlcy9mb3JtbHlVdGlsJztcbmltcG9ydCBmb3JtbHlXYXJuIGZyb20gJy4vc2VydmljZXMvZm9ybWx5V2Fybic7XG5cbmltcG9ydCBmb3JtbHlDdXN0b21WYWxpZGF0aW9uIGZyb20gJy4vZGlyZWN0aXZlcy9mb3JtbHktY3VzdG9tLXZhbGlkYXRpb24nO1xuaW1wb3J0IGZvcm1seUZpZWxkIGZyb20gJy4vZGlyZWN0aXZlcy9mb3JtbHktZmllbGQnO1xuaW1wb3J0IGZvcm1seUZvY3VzIGZyb20gJy4vZGlyZWN0aXZlcy9mb3JtbHktZm9jdXMnO1xuaW1wb3J0IGZvcm1seUZvcm0gZnJvbSAnLi9kaXJlY3RpdmVzL2Zvcm1seS1mb3JtJztcblxuaW1wb3J0IGZvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yIGZyb20gJy4vcnVuL2Zvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yJztcbmltcG9ydCBmb3JtbHlDdXN0b21UYWdzIGZyb20gJy4vcnVuL2Zvcm1seUN1c3RvbVRhZ3MnO1xuXG5jb25zdCBuZ01vZHVsZU5hbWUgPSAnZm9ybWx5JztcblxuZXhwb3J0IGRlZmF1bHQgbmdNb2R1bGVOYW1lO1xuXG5jb25zdCBuZ01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKG5nTW9kdWxlTmFtZSwgW10pO1xuXG5uZ01vZHVsZS5jb25zdGFudCgnZm9ybWx5QXBpQ2hlY2snLCBmb3JtbHlBcGlDaGVjayk7XG5uZ01vZHVsZS5jb25zdGFudCgnZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeCcsIGZvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXgpO1xubmdNb2R1bGUuY29uc3RhbnQoJ2Zvcm1seVZlcnNpb24nLCBWRVJTSU9OKTsgLy8gPC0tIHdlYnBhY2sgdmFyaWFibGVcblxubmdNb2R1bGUucHJvdmlkZXIoJ2Zvcm1seVVzYWJpbGl0eScsIGZvcm1seVVzYWJpbGl0eSk7XG5uZ01vZHVsZS5wcm92aWRlcignZm9ybWx5Q29uZmlnJywgZm9ybWx5Q29uZmlnKTtcblxubmdNb2R1bGUuZmFjdG9yeSgnZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzJywgZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzKTtcbm5nTW9kdWxlLmZhY3RvcnkoJ2Zvcm1seVV0aWwnLCBmb3JtbHlVdGlsKTtcbm5nTW9kdWxlLmZhY3RvcnkoJ2Zvcm1seVdhcm4nLCBmb3JtbHlXYXJuKTtcblxubmdNb2R1bGUuZGlyZWN0aXZlKCdmb3JtbHlDdXN0b21WYWxpZGF0aW9uJywgZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbik7XG5uZ01vZHVsZS5kaXJlY3RpdmUoJ2Zvcm1seUZpZWxkJywgZm9ybWx5RmllbGQpO1xubmdNb2R1bGUuZGlyZWN0aXZlKCdmb3JtbHlGb2N1cycsIGZvcm1seUZvY3VzKTtcbm5nTW9kdWxlLmRpcmVjdGl2ZSgnZm9ybWx5Rm9ybScsIGZvcm1seUZvcm0pO1xuXG5uZ01vZHVsZS5ydW4oZm9ybWx5TmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IpO1xubmdNb2R1bGUucnVuKGZvcm1seUN1c3RvbVRhZ3MpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vaW5kZXguY29tbW9uLmpzXG4gKiovIiwiaW1wb3J0IGFwaUNoZWNrRmFjdG9yeSBmcm9tICdhcGktY2hlY2snO1xuXG5sZXQgYXBpQ2hlY2sgPSBhcGlDaGVja0ZhY3Rvcnkoe1xuICBvdXRwdXQ6IHtcbiAgICBwcmVmaXg6ICdhbmd1bGFyLWZvcm1seTonLFxuICAgIGRvY3NCYXNlVXJsOiByZXF1aXJlKCcuLi9vdGhlci9kb2NzQmFzZVVybCcpXG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBzaGFwZVJlcXVpcmVkSWZOb3Qob3RoZXJQcm9wcywgcHJvcENoZWNrZXIpIHtcbiAgaWYgKCFhbmd1bGFyLmlzQXJyYXkob3RoZXJQcm9wcykpIHtcbiAgICBvdGhlclByb3BzID0gW290aGVyUHJvcHNdO1xuICB9XG4gIGNvbnN0IHR5cGUgPSBgc3BlY2lmaWVkIGlmIHRoZXNlIGFyZSBub3Qgc3BlY2lmaWVkOiBcXGAke290aGVyUHJvcHMuam9pbignLCAnKX1cXGAgKG90aGVyd2lzZSBpdCdzIG9wdGlvbmFsKWA7XG4gIGZ1bmN0aW9uIHNoYXBlUmVxdWlyZWRJZk5vdERlZmluaXRpb24ocHJvcCwgcHJvcE5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICB2YXIgcHJvcEV4aXN0cyA9IG9iaiAmJiBvYmouaGFzT3duUHJvcGVydHkocHJvcE5hbWUpO1xuICAgIHZhciBvdGhlclByb3BzRXhpc3QgPSBvdGhlclByb3BzLnNvbWUoZnVuY3Rpb24gKG90aGVyUHJvcCkge1xuICAgICAgcmV0dXJuIG9iaiAmJiBvYmouaGFzT3duUHJvcGVydHkob3RoZXJQcm9wKTtcbiAgICB9KTtcbiAgICBpZiAoIW90aGVyUHJvcHNFeGlzdCAmJiAhcHJvcEV4aXN0cykge1xuICAgICAgcmV0dXJuIGFwaUNoZWNrLnV0aWxzLmdldEVycm9yKHByb3BOYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgfSBlbHNlIGlmIChwcm9wRXhpc3RzKSB7XG4gICAgICByZXR1cm4gcHJvcENoZWNrZXIocHJvcCwgcHJvcE5hbWUsIGxvY2F0aW9uLCBvYmopO1xuICAgIH1cbiAgfVxuICBzaGFwZVJlcXVpcmVkSWZOb3REZWZpbml0aW9uLnR5cGUgPSB0eXBlO1xuICByZXR1cm4gYXBpQ2hlY2sudXRpbHMuY2hlY2tlckhlbHBlcnMuc2V0dXBDaGVja2VyKHNoYXBlUmVxdWlyZWRJZk5vdERlZmluaXRpb24pO1xufVxuXG5sZXQgZm9ybWx5RXhwcmVzc2lvbiA9IGFwaUNoZWNrLm9uZU9mVHlwZShbYXBpQ2hlY2suc3RyaW5nLCBhcGlDaGVjay5mdW5jXSk7XG5sZXQgc3BlY2lmeVdyYXBwZXJUeXBlID0gYXBpQ2hlY2sub25lT2ZUeXBlKFtcbiAgYXBpQ2hlY2sub25lT2YoW251bGxdKSwgYXBpQ2hlY2sudHlwZU9yQXJyYXlPZihhcGlDaGVjay5zdHJpbmcpXG5dKTtcblxuY29uc3QgYXBpQ2hlY2tQcm9wZXJ0eSA9IGFwaUNoZWNrLm9iamVjdE9mKGFwaUNoZWNrLmZ1bmMpO1xuXG5jb25zdCBhcGlDaGVja0luc3RhbmNlUHJvcGVydHkgPSBhcGlDaGVjay5zaGFwZS5vbmx5SWYoJ2FwaUNoZWNrJywgYXBpQ2hlY2suZnVuYy53aXRoUHJvcGVydGllcyh7XG4gIHdhcm46IGFwaUNoZWNrLmZ1bmMsXG4gIHRocm93OiBhcGlDaGVjay5mdW5jLFxuICBzaGFwZTogYXBpQ2hlY2suZnVuY1xufSkpO1xuXG5jb25zdCBhcGlDaGVja0Z1bmN0aW9uUHJvcGVydHkgPSBhcGlDaGVjay5zaGFwZS5vbmx5SWYoJ2FwaUNoZWNrJywgYXBpQ2hlY2sub25lT2YoWyd0aHJvdycsICd3YXJuJ10pKTtcblxuY29uc3QgZm9ybWx5V3JhcHBlclR5cGUgPSBhcGlDaGVjay5zaGFwZSh7XG4gIG5hbWU6IHNoYXBlUmVxdWlyZWRJZk5vdCgndHlwZXMnLCBhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICB0ZW1wbGF0ZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoJ3RlbXBsYXRlVXJsJywgYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgdGVtcGxhdGVVcmw6IGFwaUNoZWNrLnNoYXBlLmlmTm90KCd0ZW1wbGF0ZScsIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gIHR5cGVzOiBhcGlDaGVjay50eXBlT3JBcnJheU9mKGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gIG92ZXJ3cml0ZU9rOiBhcGlDaGVjay5ib29sLm9wdGlvbmFsLFxuICB2YWxpZGF0ZU9wdGlvbnM6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gIGFwaUNoZWNrOiBhcGlDaGVja1Byb3BlcnR5Lm9wdGlvbmFsLFxuICBhcGlDaGVja0luc3RhbmNlOiBhcGlDaGVja0luc3RhbmNlUHJvcGVydHkub3B0aW9uYWwsXG4gIGFwaUNoZWNrRnVuY3Rpb246IGFwaUNoZWNrRnVuY3Rpb25Qcm9wZXJ0eS5vcHRpb25hbCxcbiAgYXBpQ2hlY2tPcHRpb25zOiBhcGlDaGVjay5vYmplY3Qub3B0aW9uYWxcbn0pLnN0cmljdDtcblxubGV0IGZpZWxkT3B0aW9uc0FwaVNoYXBlID0ge1xuICAkJGhhc2hLZXk6IGFwaUNoZWNrLmFueS5vcHRpb25hbCxcbiAgdHlwZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoWyd0ZW1wbGF0ZScsICd0ZW1wbGF0ZVVybCddLCBhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICB0ZW1wbGF0ZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoXG4gICAgWyd0eXBlJywgJ3RlbXBsYXRlVXJsJ10sXG4gICAgYXBpQ2hlY2sub25lT2ZUeXBlKFthcGlDaGVjay5zdHJpbmcsIGFwaUNoZWNrLmZ1bmNdKVxuICApLm9wdGlvbmFsLFxuICB0ZW1wbGF0ZVVybDogYXBpQ2hlY2suc2hhcGUuaWZOb3QoXG4gICAgWyd0eXBlJywgJ3RlbXBsYXRlJ10sXG4gICAgYXBpQ2hlY2sub25lT2ZUeXBlKFthcGlDaGVjay5zdHJpbmcsIGFwaUNoZWNrLmZ1bmNdKVxuICApLm9wdGlvbmFsLFxuICBrZXk6IGFwaUNoZWNrLm9uZU9mVHlwZShbYXBpQ2hlY2suc3RyaW5nLCBhcGlDaGVjay5udW1iZXJdKS5vcHRpb25hbCxcbiAgbW9kZWw6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbCxcbiAgY2xhc3NOYW1lOiBhcGlDaGVjay5zdHJpbmcub3B0aW9uYWwsXG4gIGV4cHJlc3Npb25Qcm9wZXJ0aWVzOiBhcGlDaGVjay5vYmplY3RPZihhcGlDaGVjay5vbmVPZlR5cGUoW1xuICAgIGZvcm1seUV4cHJlc3Npb24sXG4gICAgYXBpQ2hlY2suc2hhcGUoe1xuICAgICAgZXhwcmVzc2lvbjogZm9ybWx5RXhwcmVzc2lvbixcbiAgICAgIG1lc3NhZ2U6IGZvcm1seUV4cHJlc3Npb24ub3B0aW9uYWxcbiAgICB9KS5zdHJpY3RcbiAgXSkpLm9wdGlvbmFsLFxuICBkYXRhOiBhcGlDaGVjay5vYmplY3Qub3B0aW9uYWwsXG4gIHRlbXBsYXRlT3B0aW9uczogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICB3cmFwcGVyOiBzcGVjaWZ5V3JhcHBlclR5cGUub3B0aW9uYWwsXG4gIG1vZGVsT3B0aW9uczogYXBpQ2hlY2suc2hhcGUoe1xuICAgIHVwZGF0ZU9uOiBhcGlDaGVjay5zdHJpbmcub3B0aW9uYWwsXG4gICAgZGVib3VuY2U6IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gICAgICBhcGlDaGVjay5vYmplY3QsIGFwaUNoZWNrLnN0cmluZ1xuICAgIF0pLm9wdGlvbmFsLFxuICAgIGFsbG93SW52YWxpZDogYXBpQ2hlY2suYm9vbC5vcHRpb25hbCxcbiAgICBnZXR0ZXJTZXR0ZXI6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWwsXG4gICAgdGltZXpvbmU6IGFwaUNoZWNrLnN0cmluZy5vcHRpb25hbFxuICB9KS5vcHRpb25hbCxcbiAgd2F0Y2hlcjogYXBpQ2hlY2sudHlwZU9yQXJyYXlPZihcbiAgICBhcGlDaGVjay5zaGFwZSh7XG4gICAgICBleHByZXNzaW9uOiBmb3JtbHlFeHByZXNzaW9uLm9wdGlvbmFsLFxuICAgICAgbGlzdGVuZXI6IGZvcm1seUV4cHJlc3Npb25cbiAgICB9KVxuICApLm9wdGlvbmFsLFxuICB2YWxpZGF0b3JzOiBhcGlDaGVjay5vYmplY3RPZihhcGlDaGVjay5vbmVPZlR5cGUoW1xuICAgIGZvcm1seUV4cHJlc3Npb24sIGFwaUNoZWNrLnNoYXBlKHtcbiAgICAgIGV4cHJlc3Npb246IGZvcm1seUV4cHJlc3Npb24sXG4gICAgICBtZXNzYWdlOiBmb3JtbHlFeHByZXNzaW9uLm9wdGlvbmFsXG4gICAgfSkuc3RyaWN0XG4gIF0pKS5vcHRpb25hbCxcbiAgbm9Gb3JtQ29udHJvbDogYXBpQ2hlY2suYm9vbC5vcHRpb25hbCxcbiAgaGlkZTogYXBpQ2hlY2suYm9vbC5vcHRpb25hbCxcbiAgbmdNb2RlbEF0dHJzOiBhcGlDaGVjay5vYmplY3RPZihhcGlDaGVjay5zaGFwZSh7XG4gICAgZXhwcmVzc2lvbjogYXBpQ2hlY2suc2hhcGUuaWZOb3QoWyd2YWx1ZScsICdhdHRyaWJ1dGUnLCAnYm91bmQnXSwgYXBpQ2hlY2suYW55KS5vcHRpb25hbCxcbiAgICB2YWx1ZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoJ2V4cHJlc3Npb24nLCBhcGlDaGVjay5hbnkpLm9wdGlvbmFsLFxuICAgIGF0dHJpYnV0ZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoJ2V4cHJlc3Npb24nLCBhcGlDaGVjay5hbnkpLm9wdGlvbmFsLFxuICAgIGJvdW5kOiBhcGlDaGVjay5zaGFwZS5pZk5vdCgnZXhwcmVzc2lvbicsIGFwaUNoZWNrLmFueSkub3B0aW9uYWxcbiAgfSkuc3RyaWN0KS5vcHRpb25hbCxcbiAgb3B0aW9uc1R5cGVzOiBhcGlDaGVjay50eXBlT3JBcnJheU9mKGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gIGxpbms6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gIGNvbnRyb2xsZXI6IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gICAgYXBpQ2hlY2suc3RyaW5nLCBhcGlDaGVjay5mdW5jLCBhcGlDaGVjay5hcnJheVxuICBdKS5vcHRpb25hbCxcbiAgdmFsaWRhdGlvbjogYXBpQ2hlY2suc2hhcGUoe1xuICAgIHNob3c6IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gICAgICBhcGlDaGVjay5ib29sLCBhcGlDaGVjay5vbmVPZihbbnVsbF0pXG4gICAgXSkub3B0aW9uYWwsXG4gICAgbWVzc2FnZXM6IGFwaUNoZWNrLm9iamVjdE9mKGZvcm1seUV4cHJlc3Npb24pLm9wdGlvbmFsLFxuICAgIGVycm9yRXhpc3RzQW5kU2hvdWxkQmVWaXNpYmxlOiBhcGlDaGVjay5ib29sLm9wdGlvbmFsXG4gIH0pLm9wdGlvbmFsLFxuICBmb3JtQ29udHJvbDogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICB2YWx1ZTogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgcnVuRXhwcmVzc2lvbnM6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gIHJlc2V0TW9kZWw6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gIHVwZGF0ZUluaXRpYWxWYWx1ZTogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgaW5pdGlhbFZhbHVlOiBhcGlDaGVjay5hbnkub3B0aW9uYWwsXG4gIGRlZmF1bHRWYWx1ZTogYXBpQ2hlY2suYW55Lm9wdGlvbmFsXG59O1xuXG5cbmxldCBmb3JtbHlGaWVsZE9wdGlvbnMgPSBhcGlDaGVjay5zaGFwZShmaWVsZE9wdGlvbnNBcGlTaGFwZSkuc3RyaWN0O1xuXG5jb25zdCBmaWVsZEdyb3VwID0gYXBpQ2hlY2suc2hhcGUoe1xuICAkJGhhc2hLZXk6IGFwaUNoZWNrLmFueS5vcHRpb25hbCxcbiAgZmllbGRHcm91cDogYXBpQ2hlY2suYXJyYXlPZihmb3JtbHlGaWVsZE9wdGlvbnMpLFxuICBjbGFzc05hbWU6IGFwaUNoZWNrLnN0cmluZy5vcHRpb25hbFxufSkuc3RyaWN0O1xuXG5sZXQgdHlwZU9wdGlvbnNEZWZhdWx0T3B0aW9ucyA9IGFuZ3VsYXIuY29weShmaWVsZE9wdGlvbnNBcGlTaGFwZSk7XG50eXBlT3B0aW9uc0RlZmF1bHRPcHRpb25zLmtleSA9IGFwaUNoZWNrLnN0cmluZy5vcHRpb25hbDtcblxubGV0IGZvcm1seVR5cGVPcHRpb25zID0gYXBpQ2hlY2suc2hhcGUoe1xuICBuYW1lOiBhcGlDaGVjay5zdHJpbmcsXG4gIHRlbXBsYXRlOiBhcGlDaGVjay5zaGFwZS5pZk5vdCgndGVtcGxhdGVVcmwnLCBhcGlDaGVjay5vbmVPZlR5cGUoW2FwaUNoZWNrLnN0cmluZywgYXBpQ2hlY2suZnVuY10pKS5vcHRpb25hbCxcbiAgdGVtcGxhdGVVcmw6IGFwaUNoZWNrLnNoYXBlLmlmTm90KCd0ZW1wbGF0ZScsIGFwaUNoZWNrLm9uZU9mVHlwZShbYXBpQ2hlY2suc3RyaW5nLCBhcGlDaGVjay5mdW5jXSkpLm9wdGlvbmFsLFxuICBjb250cm9sbGVyOiBhcGlDaGVjay5vbmVPZlR5cGUoW1xuICAgIGFwaUNoZWNrLmZ1bmMsIGFwaUNoZWNrLnN0cmluZywgYXBpQ2hlY2suYXJyYXlcbiAgXSkub3B0aW9uYWwsXG4gIGxpbms6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gIGRlZmF1bHRPcHRpb25zOiBhcGlDaGVjay5vbmVPZlR5cGUoW1xuICAgIGFwaUNoZWNrLmZ1bmMsIGFwaUNoZWNrLnNoYXBlKHR5cGVPcHRpb25zRGVmYXVsdE9wdGlvbnMpXG4gIF0pLm9wdGlvbmFsLFxuICBleHRlbmRzOiBhcGlDaGVjay5zdHJpbmcub3B0aW9uYWwsXG4gIHdyYXBwZXI6IHNwZWNpZnlXcmFwcGVyVHlwZS5vcHRpb25hbCxcbiAgZGF0YTogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICB2YWxpZGF0ZU9wdGlvbnM6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gIGFwaUNoZWNrOiBhcGlDaGVja1Byb3BlcnR5Lm9wdGlvbmFsLFxuICBhcGlDaGVja0luc3RhbmNlOiBhcGlDaGVja0luc3RhbmNlUHJvcGVydHkub3B0aW9uYWwsXG4gIGFwaUNoZWNrRnVuY3Rpb246IGFwaUNoZWNrRnVuY3Rpb25Qcm9wZXJ0eS5vcHRpb25hbCxcbiAgYXBpQ2hlY2tPcHRpb25zOiBhcGlDaGVjay5vYmplY3Qub3B0aW9uYWwsXG4gIG92ZXJ3cml0ZU9rOiBhcGlDaGVjay5ib29sLm9wdGlvbmFsXG59KS5zdHJpY3Q7XG5cbmFuZ3VsYXIuZXh0ZW5kKGFwaUNoZWNrLCB7XG4gIGZvcm1seVR5cGVPcHRpb25zLCBmb3JtbHlGaWVsZE9wdGlvbnMsIGZvcm1seUV4cHJlc3Npb24sIGZvcm1seVdyYXBwZXJUeXBlLCBmaWVsZEdyb3VwXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgYXBpQ2hlY2s7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9wcm92aWRlcnMvZm9ybWx5QXBpQ2hlY2suanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBgaHR0cHM6Ly9naXRodWIuY29tL2Zvcm1seS1qcy9hbmd1bGFyLWZvcm1seS9ibG9iLyR7VkVSU0lPTn0vb3RoZXIvRVJST1JTX0FORF9XQVJOSU5HUy5tZCNgO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vb3RoZXIvZG9jc0Jhc2VVcmwuanNcbiAqKi8iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyLWZpeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1seVVzYWJpbGl0eTtcblxuLy8gQG5nSW5qZWN0XG5mdW5jdGlvbiBmb3JtbHlVc2FiaWxpdHkoZm9ybWx5QXBpQ2hlY2ssIGZvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXgpIHtcbiAgYW5ndWxhci5leHRlbmQodGhpcywge1xuICAgIGdldEZvcm1seUVycm9yOiBnZXRGb3JtbHlFcnJvcixcbiAgICBnZXRGaWVsZEVycm9yOiBnZXRGaWVsZEVycm9yLFxuICAgIGNoZWNrV3JhcHBlcjogY2hlY2tXcmFwcGVyLFxuICAgIGNoZWNrV3JhcHBlclRlbXBsYXRlOiBjaGVja1dyYXBwZXJUZW1wbGF0ZSxcbiAgICAkZ2V0OiAoKSA9PiB0aGlzXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGdldEZpZWxkRXJyb3IoZXJyb3JJbmZvU2x1ZywgbWVzc2FnZSwgZmllbGQpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICAgIGZpZWxkID0gbWVzc2FnZTtcbiAgICAgIG1lc3NhZ2UgPSBlcnJvckluZm9TbHVnO1xuICAgICAgZXJyb3JJbmZvU2x1ZyA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiBuZXcgRXJyb3IoZ2V0RXJyb3JNZXNzYWdlKGVycm9ySW5mb1NsdWcsIG1lc3NhZ2UpICsgYCBGaWVsZCBkZWZpbml0aW9uOiAke2FuZ3VsYXIudG9Kc29uKGZpZWxkKX1gKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEZvcm1seUVycm9yKGVycm9ySW5mb1NsdWcsIG1lc3NhZ2UpIHtcbiAgICBpZiAoIW1lc3NhZ2UpIHtcbiAgICAgIG1lc3NhZ2UgPSBlcnJvckluZm9TbHVnO1xuICAgICAgZXJyb3JJbmZvU2x1ZyA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiBuZXcgRXJyb3IoZ2V0RXJyb3JNZXNzYWdlKGVycm9ySW5mb1NsdWcsIG1lc3NhZ2UpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEVycm9yTWVzc2FnZShlcnJvckluZm9TbHVnLCBtZXNzYWdlKSB7XG4gICAgbGV0IHVybCA9ICcnO1xuICAgIGlmIChlcnJvckluZm9TbHVnICE9PSBudWxsKSB7XG4gICAgICB1cmwgPSBgJHtmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4fSR7ZXJyb3JJbmZvU2x1Z31gO1xuICAgIH1cbiAgICByZXR1cm4gYEZvcm1seSBFcnJvcjogJHttZXNzYWdlfS4gJHt1cmx9YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrV3JhcHBlcih3cmFwcGVyKSB7XG4gICAgZm9ybWx5QXBpQ2hlY2sudGhyb3coZm9ybWx5QXBpQ2hlY2suZm9ybWx5V3JhcHBlclR5cGUsIHdyYXBwZXIsIHtcbiAgICAgIHByZWZpeDogJ2Zvcm1seUNvbmZpZy5zZXRXcmFwcGVyJyxcbiAgICAgIHVybFN1ZmZpeDogJ3NldHdyYXBwZXItdmFsaWRhdGlvbi1mYWlsZWQnXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1dyYXBwZXJUZW1wbGF0ZSh0ZW1wbGF0ZSwgYWRkaXRpb25hbEluZm8pIHtcbiAgICB2YXIgZm9ybWx5VHJhbnNjbHVkZSA9ICc8Zm9ybWx5LXRyYW5zY2x1ZGU+PC9mb3JtbHktdHJhbnNjbHVkZT4nO1xuICAgIGlmICh0ZW1wbGF0ZS5pbmRleE9mKGZvcm1seVRyYW5zY2x1ZGUpID09PSAtMSkge1xuICAgICAgdGhyb3cgZ2V0Rm9ybWx5RXJyb3IoXG4gICAgICAgIGBUZW1wbGF0ZSB3cmFwcGVyIHRlbXBsYXRlcyBtdXN0IHVzZSBcIiR7Zm9ybWx5VHJhbnNjbHVkZX1cIiBzb21ld2hlcmUgaW4gdGhlbS4gYCArXG4gICAgICAgIGBUaGlzIG9uZSBkb2VzIG5vdCBoYXZlIFwiPGZvcm1seS10cmFuc2NsdWRlPjwvZm9ybWx5LXRyYW5zY2x1ZGU+XCIgaW4gaXQ6ICR7dGVtcGxhdGV9YCArICdcXG4nICtcbiAgICAgICAgYEFkZGl0aW9uYWwgaW5mb3JtYXRpb246ICR7SlNPTi5zdHJpbmdpZnkoYWRkaXRpb25hbEluZm8pfWBcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9wcm92aWRlcnMvZm9ybWx5VXNhYmlsaXR5LmpzXG4gKiovIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhci1maXgnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL290aGVyL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZm9ybWx5Q29uZmlnO1xuXG4vLyBAbmdJbmplY3RcbmZ1bmN0aW9uIGZvcm1seUNvbmZpZyhmb3JtbHlVc2FiaWxpdHlQcm92aWRlciwgZm9ybWx5QXBpQ2hlY2spIHtcblxuICB2YXIgdHlwZU1hcCA9IHt9O1xuICB2YXIgdGVtcGxhdGVXcmFwcGVyc01hcCA9IHt9O1xuICB2YXIgZGVmYXVsdFdyYXBwZXJOYW1lID0gJ2RlZmF1bHQnO1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuICB2YXIgZ2V0RXJyb3IgPSBmb3JtbHlVc2FiaWxpdHlQcm92aWRlci5nZXRGb3JtbHlFcnJvcjtcblxuICBhbmd1bGFyLmV4dGVuZCh0aGlzLCB7XG4gICAgc2V0VHlwZSxcbiAgICBnZXRUeXBlLFxuICAgIHNldFdyYXBwZXIsXG4gICAgZ2V0V3JhcHBlcixcbiAgICBnZXRXcmFwcGVyQnlUeXBlLFxuICAgIHJlbW92ZVdyYXBwZXJCeU5hbWUsXG4gICAgcmVtb3ZlV3JhcHBlcnNGb3JUeXBlLFxuICAgIGRpc2FibGVXYXJuaW5nczogZmFsc2UsXG4gICAgZXh0cmFzOiB7XG4gICAgICBkaXNhYmxlTmdNb2RlbEF0dHJzTWFuaXB1bGF0b3I6IGZhbHNlLFxuICAgICAgbmdNb2RlbEF0dHJzTWFuaXB1bGF0b3JQcmVmZXJVbmJvdW5kOiBmYWxzZSxcbiAgICAgIHJlbW92ZUNocm9tZUF1dG9Db21wbGV0ZTogZmFsc2UsXG4gICAgICBkZWZhdWx0SGlkZURpcmVjdGl2ZTogJ25nLWlmJ1xuICAgIH0sXG4gICAgdGVtcGxhdGVNYW5pcHVsYXRvcnM6IHtcbiAgICAgIHByZVdyYXBwZXI6IFtdLFxuICAgICAgcG9zdFdyYXBwZXI6IFtdXG4gICAgfSxcbiAgICAkZ2V0OiAoKSA9PiB0aGlzXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHNldFR5cGUob3B0aW9ucykge1xuICAgIGlmIChhbmd1bGFyLmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChvcHRpb25zLCBzZXRUeXBlKTtcbiAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICAgIGNoZWNrVHlwZShvcHRpb25zKTtcbiAgICAgIGlmIChvcHRpb25zLmV4dGVuZHMpIHtcbiAgICAgICAgZXh0ZW5kVHlwZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICB9XG4gICAgICB0eXBlTWFwW29wdGlvbnMubmFtZV0gPSBvcHRpb25zO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBnZXRFcnJvcihgWW91IG11c3QgcHJvdmlkZSBhbiBvYmplY3Qgb3IgYXJyYXkgZm9yIHNldFR5cGUuIFlvdSBwcm92aWRlZDogJHtKU09OLnN0cmluZ2lmeShhcmd1bWVudHMpfWApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrVHlwZShvcHRpb25zKSB7XG4gICAgZm9ybWx5QXBpQ2hlY2sudGhyb3coZm9ybWx5QXBpQ2hlY2suZm9ybWx5VHlwZU9wdGlvbnMsIG9wdGlvbnMsIHtcbiAgICAgIHByZWZpeDogJ2Zvcm1seUNvbmZpZy5zZXRUeXBlJyxcbiAgICAgIHVybDogJ3NldHR5cGUtdmFsaWRhdGlvbi1mYWlsZWQnXG4gICAgfSk7XG4gICAgaWYgKCFvcHRpb25zLm92ZXJ3cml0ZU9rKSB7XG4gICAgICBjaGVja092ZXJ3cml0ZShvcHRpb25zLm5hbWUsIHR5cGVNYXAsIG9wdGlvbnMsICd0eXBlcycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb25zLm92ZXJ3cml0ZU9rID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dGVuZFR5cGVPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBjb25zdCBleHRlbmRzVHlwZSA9IGdldFR5cGUob3B0aW9ucy5leHRlbmRzLCB0cnVlLCBvcHRpb25zKTtcbiAgICBleHRlbmRUeXBlQ29udHJvbGxlckZ1bmN0aW9uKG9wdGlvbnMsIGV4dGVuZHNUeXBlKTtcbiAgICBleHRlbmRUeXBlTGlua0Z1bmN0aW9uKG9wdGlvbnMsIGV4dGVuZHNUeXBlKTtcbiAgICBleHRlbmRUeXBlVmFsaWRhdGVPcHRpb25zRnVuY3Rpb24ob3B0aW9ucywgZXh0ZW5kc1R5cGUpO1xuICAgIGV4dGVuZFR5cGVEZWZhdWx0T3B0aW9ucyhvcHRpb25zLCBleHRlbmRzVHlwZSk7XG4gICAgdXRpbHMucmV2ZXJzZURlZXBNZXJnZShvcHRpb25zLCBleHRlbmRzVHlwZSk7XG4gIH1cblxuICBmdW5jdGlvbiBleHRlbmRUeXBlQ29udHJvbGxlckZ1bmN0aW9uKG9wdGlvbnMsIGV4dGVuZHNUeXBlKSB7XG4gICAgY29uc3QgZXh0ZW5kc0N0cmwgPSBleHRlbmRzVHlwZS5jb250cm9sbGVyO1xuICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoZXh0ZW5kc0N0cmwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG9wdGlvbnNDdHJsID0gb3B0aW9ucy5jb250cm9sbGVyO1xuICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zQ3RybCkpIHtcbiAgICAgIG9wdGlvbnMuY29udHJvbGxlciA9IGZ1bmN0aW9uICgkc2NvcGUsICRjb250cm9sbGVyKSB7XG4gICAgICAgICRjb250cm9sbGVyKGV4dGVuZHNDdHJsLCB7JHNjb3BlfSk7XG4gICAgICAgICRjb250cm9sbGVyKG9wdGlvbnNDdHJsLCB7JHNjb3BlfSk7XG4gICAgICB9O1xuICAgICAgb3B0aW9ucy5jb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckY29udHJvbGxlciddO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb25zLmNvbnRyb2xsZXIgPSBleHRlbmRzQ3RybDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBleHRlbmRUeXBlTGlua0Z1bmN0aW9uKG9wdGlvbnMsIGV4dGVuZHNUeXBlKSB7XG4gICAgY29uc3QgZXh0ZW5kc0ZuID0gZXh0ZW5kc1R5cGUubGluaztcbiAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGV4dGVuZHNGbikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgb3B0aW9uc0ZuID0gb3B0aW9ucy5saW5rO1xuICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zRm4pKSB7XG4gICAgICBvcHRpb25zLmxpbmsgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4dGVuZHNGbiguLi5hcmd1bWVudHMpO1xuICAgICAgICBvcHRpb25zRm4oLi4uYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMubGluayA9IGV4dGVuZHNGbjtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBleHRlbmRUeXBlVmFsaWRhdGVPcHRpb25zRnVuY3Rpb24ob3B0aW9ucywgZXh0ZW5kc1R5cGUpIHtcbiAgICBjb25zdCBleHRlbmRzRm4gPSBleHRlbmRzVHlwZS52YWxpZGF0ZU9wdGlvbnM7XG4gICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChleHRlbmRzRm4pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG9wdGlvbnNGbiA9IG9wdGlvbnMudmFsaWRhdGVPcHRpb25zO1xuICAgIGNvbnN0IG9yaWdpbmFsRGVmYXVsdE9wdGlvbnMgPSBvcHRpb25zLmRlZmF1bHRPcHRpb25zO1xuICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zRm4pKSB7XG4gICAgICBvcHRpb25zLnZhbGlkYXRlT3B0aW9ucyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnNGbihvcHRpb25zKTtcbiAgICAgICAgbGV0IG1lcmdlZE9wdGlvbnMgPSBhbmd1bGFyLmNvcHkob3B0aW9ucyk7XG4gICAgICAgIGxldCBkZWZhdWx0T3B0aW9ucyA9IG9yaWdpbmFsRGVmYXVsdE9wdGlvbnM7XG4gICAgICAgIGlmIChkZWZhdWx0T3B0aW9ucykge1xuICAgICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24oZGVmYXVsdE9wdGlvbnMpKSB7XG4gICAgICAgICAgICBkZWZhdWx0T3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zKG1lcmdlZE9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB1dGlscy5yZXZlcnNlRGVlcE1lcmdlKG1lcmdlZE9wdGlvbnMsIGRlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBleHRlbmRzRm4obWVyZ2VkT3B0aW9ucyk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb25zLnZhbGlkYXRlT3B0aW9ucyA9IGV4dGVuZHNGbjtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBleHRlbmRUeXBlRGVmYXVsdE9wdGlvbnMob3B0aW9ucywgZXh0ZW5kc1R5cGUpIHtcbiAgICBjb25zdCBleHRlbmRzRE8gPSBleHRlbmRzVHlwZS5kZWZhdWx0T3B0aW9ucztcbiAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGV4dGVuZHNETykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgb3B0aW9uc0RPID0gb3B0aW9ucy5kZWZhdWx0T3B0aW9ucztcbiAgICBjb25zdCBvcHRpb25zRE9Jc0ZuID0gYW5ndWxhci5pc0Z1bmN0aW9uKG9wdGlvbnNETyk7XG4gICAgY29uc3QgZXh0ZW5kc0RPSXNGbiA9IGFuZ3VsYXIuaXNGdW5jdGlvbihleHRlbmRzRE8pO1xuICAgIGlmIChleHRlbmRzRE9Jc0ZuKSB7XG4gICAgICBvcHRpb25zLmRlZmF1bHRPcHRpb25zID0gZnVuY3Rpb24gZGVmYXVsdE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBjb25zdCBleHRlbmRzRGVmYXVsdE9wdGlvbnMgPSBleHRlbmRzRE8ob3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IG1lcmdlZERlZmF1bHRPcHRpb25zID0ge307XG4gICAgICAgIHV0aWxzLnJldmVyc2VEZWVwTWVyZ2UobWVyZ2VkRGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMsIGV4dGVuZHNEZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIGxldCBleHRlbmRlck9wdGlvbnNEZWZhdWx0T3B0aW9ucyA9IG9wdGlvbnNETztcbiAgICAgICAgaWYgKG9wdGlvbnNET0lzRm4pIHtcbiAgICAgICAgICBleHRlbmRlck9wdGlvbnNEZWZhdWx0T3B0aW9ucyA9IGV4dGVuZGVyT3B0aW9uc0RlZmF1bHRPcHRpb25zKG1lcmdlZERlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICB1dGlscy5yZXZlcnNlRGVlcE1lcmdlKGV4dGVuZHNEZWZhdWx0T3B0aW9ucywgZXh0ZW5kZXJPcHRpb25zRGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gZXh0ZW5kc0RlZmF1bHRPcHRpb25zO1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnNET0lzRm4pIHtcbiAgICAgIG9wdGlvbnMuZGVmYXVsdE9wdGlvbnMgPSBmdW5jdGlvbiBkZWZhdWx0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgIGxldCBuZXdEZWZhdWx0T3B0aW9ucyA9IHt9O1xuICAgICAgICB1dGlscy5yZXZlcnNlRGVlcE1lcmdlKG5ld0RlZmF1bHRPcHRpb25zLCBvcHRpb25zLCBleHRlbmRzRE8pO1xuICAgICAgICByZXR1cm4gb3B0aW9uc0RPKG5ld0RlZmF1bHRPcHRpb25zKTtcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0VHlwZShuYW1lLCB0aHJvd0Vycm9yLCBlcnJvckNvbnRleHQpIHtcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHZhciB0eXBlID0gdHlwZU1hcFtuYW1lXTtcbiAgICBpZiAoIXR5cGUgJiYgdGhyb3dFcnJvciA9PT0gdHJ1ZSkge1xuICAgICAgdGhyb3cgZ2V0RXJyb3IoXG4gICAgICAgIGBUaGVyZSBpcyBubyB0eXBlIGJ5IHRoZSBuYW1lIG9mIFwiJHtuYW1lfVwiOiAke0pTT04uc3RyaW5naWZ5KGVycm9yQ29udGV4dCl9YFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0V3JhcHBlcihvcHRpb25zLCBuYW1lKSB7XG4gICAgaWYgKGFuZ3VsYXIuaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMubWFwKHdyYXBwZXJPcHRpb25zID0+IHNldFdyYXBwZXIod3JhcHBlck9wdGlvbnMpKTtcbiAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICAgIG9wdGlvbnMudHlwZXMgPSBnZXRPcHRpb25zVHlwZXMob3B0aW9ucyk7XG4gICAgICBvcHRpb25zLm5hbWUgPSBnZXRPcHRpb25zTmFtZShvcHRpb25zLCBuYW1lKTtcbiAgICAgIGNoZWNrV3JhcHBlckFQSShvcHRpb25zKTtcbiAgICAgIHRlbXBsYXRlV3JhcHBlcnNNYXBbb3B0aW9ucy5uYW1lXSA9IG9wdGlvbnM7XG4gICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNTdHJpbmcob3B0aW9ucykpIHtcbiAgICAgIHJldHVybiBzZXRXcmFwcGVyKHtcbiAgICAgICAgdGVtcGxhdGU6IG9wdGlvbnMsXG4gICAgICAgIG5hbWVcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE9wdGlvbnNUeXBlcyhvcHRpb25zKSB7XG4gICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcob3B0aW9ucy50eXBlcykpIHtcbiAgICAgIHJldHVybiBbb3B0aW9ucy50eXBlc107XG4gICAgfVxuICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy50eXBlcykpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9wdGlvbnMudHlwZXM7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0T3B0aW9uc05hbWUob3B0aW9ucywgbmFtZSkge1xuICAgIHJldHVybiBvcHRpb25zLm5hbWUgfHwgbmFtZSB8fCBvcHRpb25zLnR5cGVzLmpvaW4oJyAnKSB8fCBkZWZhdWx0V3JhcHBlck5hbWU7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1dyYXBwZXJBUEkob3B0aW9ucykge1xuICAgIGZvcm1seVVzYWJpbGl0eVByb3ZpZGVyLmNoZWNrV3JhcHBlcihvcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucy50ZW1wbGF0ZSkge1xuICAgICAgZm9ybWx5VXNhYmlsaXR5UHJvdmlkZXIuY2hlY2tXcmFwcGVyVGVtcGxhdGUob3B0aW9ucy50ZW1wbGF0ZSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGlmICghb3B0aW9ucy5vdmVyd3JpdGVPaykge1xuICAgICAgY2hlY2tPdmVyd3JpdGUob3B0aW9ucy5uYW1lLCB0ZW1wbGF0ZVdyYXBwZXJzTWFwLCBvcHRpb25zLCAndGVtcGxhdGVXcmFwcGVycycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgb3B0aW9ucy5vdmVyd3JpdGVPaztcbiAgICB9XG4gICAgY2hlY2tXcmFwcGVyVHlwZXMob3B0aW9ucyk7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1dyYXBwZXJUeXBlcyhvcHRpb25zKSB7XG4gICAgbGV0IHNob3VsZFRocm93ID0gIWFuZ3VsYXIuaXNBcnJheShvcHRpb25zLnR5cGVzKSB8fCAhb3B0aW9ucy50eXBlcy5ldmVyeShhbmd1bGFyLmlzU3RyaW5nKTtcbiAgICBpZiAoc2hvdWxkVGhyb3cpIHtcbiAgICAgIHRocm93IGdldEVycm9yKGBBdHRlbXB0ZWQgdG8gY3JlYXRlIGEgdGVtcGxhdGUgd3JhcHBlciB3aXRoIHR5cGVzIHRoYXQgaXMgbm90IGEgc3RyaW5nIG9yIGFuIGFycmF5IG9mIHN0cmluZ3NgKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja092ZXJ3cml0ZShwcm9wZXJ0eSwgb2JqZWN0LCBuZXdWYWx1ZSwgb2JqZWN0TmFtZSkge1xuICAgIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICB3YXJuKFtcbiAgICAgICAgYEF0dGVtcHRpbmcgdG8gb3ZlcndyaXRlICR7cHJvcGVydHl9IG9uICR7b2JqZWN0TmFtZX0gd2hpY2ggaXMgY3VycmVudGx5YCxcbiAgICAgICAgYCR7SlNPTi5zdHJpbmdpZnkob2JqZWN0W3Byb3BlcnR5XSl9IHdpdGggJHtKU09OLnN0cmluZ2lmeShuZXdWYWx1ZSl9YCxcbiAgICAgICAgYFRvIHN1cHJlc3MgdGhpcyB3YXJuaW5nLCBzcGVjaWZ5IHRoZSBwcm9wZXJ0eSBcIm92ZXJ3cml0ZU9rOiB0cnVlXCJgXG4gICAgICBdLmpvaW4oJyAnKSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0V3JhcHBlcihuYW1lKSB7XG4gICAgcmV0dXJuIHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZSB8fCBkZWZhdWx0V3JhcHBlck5hbWVdO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0V3JhcHBlckJ5VHlwZSh0eXBlKSB7XG4gICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NiAqL1xuICAgIHZhciB3cmFwcGVycyA9IFtdO1xuICAgIGZvciAodmFyIG5hbWUgaW4gdGVtcGxhdGVXcmFwcGVyc01hcCkge1xuICAgICAgaWYgKHRlbXBsYXRlV3JhcHBlcnNNYXAuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgaWYgKHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV0udHlwZXMgJiYgdGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lXS50eXBlcy5pbmRleE9mKHR5cGUpICE9PSAtMSkge1xuICAgICAgICAgIHdyYXBwZXJzLnB1c2godGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHdyYXBwZXJzO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlV3JhcHBlckJ5TmFtZShuYW1lKSB7XG4gICAgdmFyIHdyYXBwZXIgPSB0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdO1xuICAgIGRlbGV0ZSB0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdO1xuICAgIHJldHVybiB3cmFwcGVyO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlV3JhcHBlcnNGb3JUeXBlKHR5cGUpIHtcbiAgICB2YXIgd3JhcHBlcnMgPSBnZXRXcmFwcGVyQnlUeXBlKHR5cGUpO1xuICAgIGlmICghd3JhcHBlcnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFhbmd1bGFyLmlzQXJyYXkod3JhcHBlcnMpKSB7XG4gICAgICByZXR1cm4gcmVtb3ZlV3JhcHBlckJ5TmFtZSh3cmFwcGVycy5uYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd3JhcHBlcnMuZm9yRWFjaCgod3JhcHBlcikgPT4gcmVtb3ZlV3JhcHBlckJ5TmFtZSh3cmFwcGVyLm5hbWUpKTtcbiAgICAgIHJldHVybiB3cmFwcGVycztcbiAgICB9XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHdhcm4oKSB7XG4gICAgaWYgKCFfdGhpcy5kaXNhYmxlV2FybmluZ3MpIHtcbiAgICAgIGNvbnNvbGUud2FybiguLi5hcmd1bWVudHMpO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcHJvdmlkZXJzL2Zvcm1seUNvbmZpZy5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcztcblxuXG4vLyBAbmdJbmplY3RcbmZ1bmN0aW9uIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcygpIHtcblxuICB2YXIgdmFsaWRhdGlvbk1lc3NhZ2VzID0ge1xuICAgIGFkZFRlbXBsYXRlT3B0aW9uVmFsdWVNZXNzYWdlLFxuICAgIGFkZFN0cmluZ01lc3NhZ2UsXG4gICAgbWVzc2FnZXM6IHt9XG4gIH07XG5cbiAgcmV0dXJuIHZhbGlkYXRpb25NZXNzYWdlcztcblxuICBmdW5jdGlvbiBhZGRUZW1wbGF0ZU9wdGlvblZhbHVlTWVzc2FnZShuYW1lLCBwcm9wLCBwcmVmaXgsIHN1ZmZpeCwgYWx0ZXJuYXRlKSB7XG4gICAgdmFsaWRhdGlvbk1lc3NhZ2VzLm1lc3NhZ2VzW25hbWVdID0gdGVtcGxhdGVPcHRpb25WYWx1ZShwcm9wLCBwcmVmaXgsIHN1ZmZpeCwgYWx0ZXJuYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFN0cmluZ01lc3NhZ2UobmFtZSwgc3RyaW5nKSB7XG4gICAgdmFsaWRhdGlvbk1lc3NhZ2VzLm1lc3NhZ2VzW25hbWVdID0gKCkgPT4gc3RyaW5nO1xuICB9XG5cblxuICBmdW5jdGlvbiB0ZW1wbGF0ZU9wdGlvblZhbHVlKHByb3AsIHByZWZpeCwgc3VmZml4LCBhbHRlcm5hdGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gZ2V0VmFsaWRhdGlvbk1lc3NhZ2Uodmlld1ZhbHVlLCBtb2RlbFZhbHVlLCBzY29wZSkge1xuICAgICAgaWYgKHNjb3BlLm9wdGlvbnMudGVtcGxhdGVPcHRpb25zW3Byb3BdKSB7XG4gICAgICAgIHJldHVybiBgJHtwcmVmaXh9ICR7c2NvcGUub3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnNbcHJvcF19ICR7c3VmZml4fWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYWx0ZXJuYXRlO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3Byb3ZpZGVycy9mb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMuanNcbiAqKi8iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi4vb3RoZXIvdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmb3JtbHlVdGlsO1xuXG4vLyBAbmdJbmplY3RcbmZ1bmN0aW9uIGZvcm1seVV0aWwoKSB7XG4gIHJldHVybiB1dGlscztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3NlcnZpY2VzL2Zvcm1seVV0aWwuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmb3JtbHlXYXJuO1xuXG4vLyBAbmdJbmplY3RcbmZ1bmN0aW9uIGZvcm1seVdhcm4oZm9ybWx5Q29uZmlnLCBmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4LCAkbG9nKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3YXJuKCkge1xuICAgIGlmICghZm9ybWx5Q29uZmlnLmRpc2FibGVXYXJuaW5ncykge1xuICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgdmFyIHdhcm5JbmZvU2x1ZyA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgIGFyZ3MudW5zaGlmdCgnRm9ybWx5IFdhcm5pbmc6Jyk7XG4gICAgICBhcmdzLnB1c2goYCR7Zm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeH0ke3dhcm5JbmZvU2x1Z31gKTtcbiAgICAgICRsb2cud2FybiguLi5hcmdzKTtcbiAgICB9XG4gIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9zZXJ2aWNlcy9mb3JtbHlXYXJuLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbjtcblxuLy8gQG5nSW5qZWN0XG5mdW5jdGlvbiBmb3JtbHlDdXN0b21WYWxpZGF0aW9uKGZvcm1seVV0aWwsICRxKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICByZXF1aXJlOiAnbmdNb2RlbCcsXG4gICAgbGluazogZnVuY3Rpb24gZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbkxpbmsoc2NvcGUsIGVsLCBhdHRycywgY3RybCkge1xuICAgICAgY29uc3Qgb3B0cyA9IHNjb3BlLm9wdGlvbnM7XG4gICAgICBpZiAob3B0cy52YWxpZGF0b3JzKSB7XG4gICAgICAgIGNoZWNrVmFsaWRhdG9ycyhvcHRzLnZhbGlkYXRvcnMpO1xuICAgICAgfVxuICAgICAgb3B0cy52YWxpZGF0aW9uLm1lc3NhZ2VzID0gb3B0cy52YWxpZGF0aW9uLm1lc3NhZ2VzIHx8IHt9O1xuICAgICAgYW5ndWxhci5mb3JFYWNoKG9wdHMudmFsaWRhdGlvbi5tZXNzYWdlcywgKG1lc3NhZ2UsIGtleSkgPT4ge1xuICAgICAgICBvcHRzLnZhbGlkYXRpb24ubWVzc2FnZXNba2V5XSA9ICgpID0+IHtcbiAgICAgICAgICByZXR1cm4gZm9ybWx5VXRpbC5mb3JtbHlFdmFsKHNjb3BlLCBtZXNzYWdlLCBjdHJsLiRtb2RlbFZhbHVlLCBjdHJsLiR2aWV3VmFsdWUpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cblxuICAgICAgdmFyIHVzZU5ld1ZhbGlkYXRvcnNBcGkgPSBjdHJsLmhhc093blByb3BlcnR5KCckdmFsaWRhdG9ycycpICYmICFhdHRycy5oYXNPd25Qcm9wZXJ0eSgndXNlUGFyc2VycycpO1xuICAgICAgYW5ndWxhci5mb3JFYWNoKG9wdHMudmFsaWRhdG9ycywgZnVuY3Rpb24gYWRkVmFsaWRhdG9yVG9QaXBlbGluZSh2YWxpZGF0b3IsIG5hbWUpIHtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSB2YWxpZGF0b3IubWVzc2FnZTtcbiAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICBvcHRzLnZhbGlkYXRpb24ubWVzc2FnZXNbbmFtZV0gPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZm9ybWx5VXRpbC5mb3JtbHlFdmFsKHNjb3BlLCBtZXNzYWdlLCBjdHJsLiRtb2RlbFZhbHVlLCBjdHJsLiR2aWV3VmFsdWUpO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdmFsaWRhdG9yID0gYW5ndWxhci5pc09iamVjdCh2YWxpZGF0b3IpID8gdmFsaWRhdG9yLmV4cHJlc3Npb24gOiB2YWxpZGF0b3I7XG4gICAgICAgIHZhciBpc1Bvc3NpYmx5QXN5bmMgPSAhYW5ndWxhci5pc1N0cmluZyh2YWxpZGF0b3IpO1xuICAgICAgICBpZiAodXNlTmV3VmFsaWRhdG9yc0FwaSkge1xuICAgICAgICAgIHNldHVwV2l0aFZhbGlkYXRvcnMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXR1cFdpdGhQYXJzZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzZXR1cFdpdGhWYWxpZGF0b3JzKCkge1xuICAgICAgICAgIHZhciB2YWxpZGF0b3JDb2xsZWN0aW9uID0gaXNQb3NzaWJseUFzeW5jID8gJyRhc3luY1ZhbGlkYXRvcnMnIDogJyR2YWxpZGF0b3JzJztcbiAgICAgICAgICBjdHJsW3ZhbGlkYXRvckNvbGxlY3Rpb25dW25hbWVdID0gZnVuY3Rpb24gZXZhbFZhbGlkaXR5KG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSkge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gZm9ybWx5VXRpbC5mb3JtbHlFdmFsKHNjb3BlLCB2YWxpZGF0b3IsIG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoaXNQb3NzaWJseUFzeW5jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpc1Byb21pc2VMaWtlKHZhbHVlKSA/IHZhbHVlIDogdmFsdWUgPyAkcS53aGVuKHZhbHVlKSA6ICRxLnJlamVjdCh2YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNldHVwV2l0aFBhcnNlcnMoKSB7XG4gICAgICAgICAgbGV0IGluRmxpZ2h0VmFsaWRhdG9yO1xuICAgICAgICAgIGN0cmwuJHBhcnNlcnMudW5zaGlmdChmdW5jdGlvbiBldmFsVmFsaWRpdHlPZlBhcnNlcih2aWV3VmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBpc1ZhbGlkID0gZm9ybWx5VXRpbC5mb3JtbHlFdmFsKHNjb3BlLCB2YWxpZGF0b3IsIGN0cmwuJG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoaXNQcm9taXNlTGlrZShpc1ZhbGlkKSkge1xuICAgICAgICAgICAgICBjdHJsLiRwZW5kaW5nID0gY3RybC4kcGVuZGluZyB8fCB7fTtcbiAgICAgICAgICAgICAgY3RybC4kcGVuZGluZ1tuYW1lXSA9IHRydWU7XG4gICAgICAgICAgICAgIGluRmxpZ2h0VmFsaWRhdG9yID0gaXNWYWxpZDtcbiAgICAgICAgICAgICAgaXNWYWxpZC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaW5GbGlnaHRWYWxpZGF0b3IgPT09IGlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgIGN0cmwuJHNldFZhbGlkaXR5KG5hbWUsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpbkZsaWdodFZhbGlkYXRvciA9PT0gaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgY3RybC4kc2V0VmFsaWRpdHkobmFtZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSkuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKGN0cmwuJHBlbmRpbmcpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgZGVsZXRlIGN0cmwuJHBlbmRpbmc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjdHJsLiRwZW5kaW5nW25hbWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjdHJsLiRzZXRWYWxpZGl0eShuYW1lLCBpc1ZhbGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2aWV3VmFsdWU7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBpc1Byb21pc2VMaWtlKG9iaikge1xuICAgIHJldHVybiBvYmogJiYgYW5ndWxhci5pc0Z1bmN0aW9uKG9iai50aGVuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrVmFsaWRhdG9ycyh2YWxpZGF0b3JzKSB7XG4gICAgdmFyIGFsbG93ZWRQcm9wZXJ0aWVzID0gWydleHByZXNzaW9uJywgJ21lc3NhZ2UnXTtcbiAgICB2YXIgdmFsaWRhdG9yc1dpdGhFeHRyYVByb3BzID0ge307XG4gICAgYW5ndWxhci5mb3JFYWNoKHZhbGlkYXRvcnMsICh2YWxpZGF0b3IsIG5hbWUpID0+IHtcbiAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKHZhbGlkYXRvcikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGV4dHJhUHJvcHMgPSBbXTtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaCh2YWxpZGF0b3IsICh2LCBrZXkpID0+IHtcbiAgICAgICAgaWYgKGFsbG93ZWRQcm9wZXJ0aWVzLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHtcbiAgICAgICAgICBleHRyYVByb3BzLnB1c2goa2V5KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoZXh0cmFQcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgdmFsaWRhdG9yc1dpdGhFeHRyYVByb3BzW25hbWVdID0gZXh0cmFQcm9wcztcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoT2JqZWN0LmtleXModmFsaWRhdG9yc1dpdGhFeHRyYVByb3BzKS5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihbXG4gICAgICAgIGBWYWxpZGF0b3JzIGFyZSBvbmx5IGFsbG93ZWQgdG8gYmUgZnVuY3Rpb25zIG9yIG9iamVjdHMgdGhhdCBoYXZlICR7YWxsb3dlZFByb3BlcnRpZXMuam9pbignLCAnKX0uYCxcbiAgICAgICAgYFlvdSBwcm92aWRlZCBzb21lIGV4dHJhIHByb3BlcnRpZXM6ICR7SlNPTi5zdHJpbmdpZnkodmFsaWRhdG9yc1dpdGhFeHRyYVByb3BzKX1gXG4gICAgICBdLmpvaW4oJyAnKSk7XG4gICAgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9kaXJlY3RpdmVzL2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvbi5qc1xuICoqLyIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXItZml4JztcblxuZXhwb3J0IGRlZmF1bHQgZm9ybWx5RmllbGQ7XG5cbi8qKlxuICogQG5nZG9jIGRpcmVjdGl2ZVxuICogQG5hbWUgZm9ybWx5RmllbGRcbiAqIEByZXN0cmljdCBBRVxuICovXG4vLyBAbmdJbmplY3RcbmZ1bmN0aW9uIGZvcm1seUZpZWxkKCRodHRwLCAkcSwgJGNvbXBpbGUsICR0ZW1wbGF0ZUNhY2hlLCBmb3JtbHlDb25maWcsIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcywgZm9ybWx5QXBpQ2hlY2ssXG4gICAgICAgICAgICAgICAgICAgICBmb3JtbHlVdGlsLCBmb3JtbHlVc2FiaWxpdHksIGZvcm1seVdhcm4pIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0FFJyxcbiAgICB0cmFuc2NsdWRlOiB0cnVlLFxuICAgIHNjb3BlOiB7XG4gICAgICBvcHRpb25zOiAnPScsXG4gICAgICBtb2RlbDogJz0nLFxuICAgICAgZm9ybUlkOiAnQCcsXG4gICAgICBpbmRleDogJz0/JyxcbiAgICAgIGZpZWxkczogJz0/JyxcbiAgICAgIGZvcm1TdGF0ZTogJz0/JyxcbiAgICAgIGZvcm06ICc9PydcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6IC8qIEBuZ0luamVjdCAqLyBmdW5jdGlvbiBGb3JtbHlGaWVsZENvbnRyb2xsZXIoJHNjb3BlLCAkdGltZW91dCwgJHBhcnNlLCAkY29udHJvbGxlcikge1xuICAgICAgaWYgKCRzY29wZS5vcHRpb25zLmZpZWxkR3JvdXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIG9wdHMgPSAkc2NvcGUub3B0aW9ucztcbiAgICAgIHZhciBmaWVsZFR5cGUgPSBvcHRzLnR5cGUgJiYgZm9ybWx5Q29uZmlnLmdldFR5cGUob3B0cy50eXBlKTtcbiAgICAgIHNpbXBsaWZ5TGlmZShvcHRzKTtcbiAgICAgIG1lcmdlRmllbGRPcHRpb25zV2l0aFR5cGVEZWZhdWx0cyhvcHRzLCBmaWVsZFR5cGUpO1xuICAgICAgZXh0ZW5kT3B0aW9uc1dpdGhEZWZhdWx0cyhvcHRzLCAkc2NvcGUuaW5kZXgpO1xuICAgICAgY2hlY2tBcGkob3B0cyk7XG4gICAgICAvLyBzZXQgZmllbGQgaWQgdG8gbGluayBsYWJlbHMgYW5kIGZpZWxkc1xuICAgICAgJHNjb3BlLmlkID0gZm9ybWx5VXRpbC5nZXRGaWVsZElkKCRzY29wZS5mb3JtSWQsIG9wdHMsICRzY29wZS5pbmRleCk7XG5cbiAgICAgIC8vIGluaXRhbGl6YXRpb25cbiAgICAgIHNldERlZmF1bHRWYWx1ZSgpO1xuICAgICAgc2V0SW5pdGlhbFZhbHVlKCk7XG4gICAgICBydW5FeHByZXNzaW9ucygpO1xuICAgICAgYWRkTW9kZWxXYXRjaGVyKCRzY29wZSwgb3B0cyk7XG4gICAgICBhZGRWYWxpZGF0aW9uTWVzc2FnZXMob3B0cyk7XG4gICAgICAvLyBzaW1wbGlmeSB0aGluZ3NcbiAgICAgIC8vIGNyZWF0ZSAkc2NvcGUudG8gc28gdGVtcGxhdGUgYXV0aG9ycyBjYW4gcmVmZXJlbmNlIHRvIGluc3RlYWQgb2YgJHNjb3BlLm9wdGlvbnMudGVtcGxhdGVPcHRpb25zXG4gICAgICAkc2NvcGUudG8gPSAkc2NvcGUub3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnM7XG4gICAgICBpbnZva2VDb250cm9sbGVycygkc2NvcGUsIG9wdHMsIGZpZWxkVHlwZSk7XG5cbiAgICAgIC8vIGZ1bmN0aW9uIGRlZmluaXRpb25zXG4gICAgICBmdW5jdGlvbiBydW5FeHByZXNzaW9ucygpIHtcbiAgICAgICAgLy8gbXVzdCBydW4gb24gbmV4dCB0aWNrIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBjdXJyZW50IHZhbHVlIGlzIGNvcnJlY3QuXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uIHJ1bkV4cHJlc3Npb25zT25OZXh0VGljaygpIHtcbiAgICAgICAgICB2YXIgZmllbGQgPSAkc2NvcGUub3B0aW9ucztcbiAgICAgICAgICB2YXIgY3VycmVudFZhbHVlID0gdmFsdWVHZXR0ZXJTZXR0ZXIoKTtcbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2goZmllbGQuZXhwcmVzc2lvblByb3BlcnRpZXMsIGZ1bmN0aW9uIHJ1bkV4cHJlc3Npb24oZXhwcmVzc2lvbiwgcHJvcCkge1xuICAgICAgICAgICAgdmFyIHNldHRlciA9ICRwYXJzZShwcm9wKS5hc3NpZ247XG4gICAgICAgICAgICB2YXIgcHJvbWlzZSA9ICRxLndoZW4oZm9ybWx5VXRpbC5mb3JtbHlFdmFsKCRzY29wZSwgZXhwcmVzc2lvbiwgY3VycmVudFZhbHVlKSk7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24gc2V0RmllbGRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICAgICAgICBzZXR0ZXIoZmllbGQsIHZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdmFsdWVHZXR0ZXJTZXR0ZXIobmV3VmFsKSB7XG4gICAgICAgIGlmICghJHNjb3BlLm1vZGVsIHx8ICEkc2NvcGUub3B0aW9ucy5rZXkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG5ld1ZhbCkpIHtcbiAgICAgICAgICAkc2NvcGUubW9kZWxbJHNjb3BlLm9wdGlvbnMua2V5XSA9IG5ld1ZhbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJHNjb3BlLm1vZGVsWyRzY29wZS5vcHRpb25zLmtleV07XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHNpbXBsaWZ5TGlmZShvcHRpb25zKSB7XG4gICAgICAgIC8vIGFkZCBhIGZldyBlbXB0eSBvYmplY3RzIChpZiB0aGV5IGRvbid0IGFscmVhZHkgZXhpc3QpIHNvIHlvdSBkb24ndCBoYXZlIHRvIHVuZGVmaW5lZCBjaGVjayBldmVyeXdoZXJlXG4gICAgICAgIGZvcm1seVV0aWwucmV2ZXJzZURlZXBNZXJnZShvcHRpb25zLCB7XG4gICAgICAgICAgZGF0YToge30sXG4gICAgICAgICAgdGVtcGxhdGVPcHRpb25zOiB7fSxcbiAgICAgICAgICB2YWxpZGF0aW9uOiB7fVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2V0RGVmYXVsdFZhbHVlKCkge1xuICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0cy5kZWZhdWx0VmFsdWUpICYmICFhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUubW9kZWxbb3B0cy5rZXldKSkge1xuICAgICAgICAgICRzY29wZS5tb2RlbFtvcHRzLmtleV0gPSBvcHRzLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzZXRJbml0aWFsVmFsdWUoKSB7XG4gICAgICAgIG9wdHMuaW5pdGlhbFZhbHVlID0gJHNjb3BlLm1vZGVsICYmICRzY29wZS5tb2RlbFtvcHRzLmtleV07XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG1lcmdlRmllbGRPcHRpb25zV2l0aFR5cGVEZWZhdWx0cyhvcHRpb25zLCB0eXBlKSB7XG4gICAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgICAgbWVyZ2VPcHRpb25zKG9wdGlvbnMsIHR5cGUuZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcm9wZXJPcmRlciA9IGFycmF5aWZ5KG9wdGlvbnMub3B0aW9uc1R5cGVzKS5yZXZlcnNlKCk7IC8vIHNvIHRoZSByaWdodCB0aGluZ3MgYXJlIG92ZXJyaWRkZW5cbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHByb3Blck9yZGVyLCB0eXBlTmFtZSA9PiB7XG4gICAgICAgICAgbWVyZ2VPcHRpb25zKG9wdGlvbnMsIGZvcm1seUNvbmZpZy5nZXRUeXBlKHR5cGVOYW1lLCB0cnVlLCBvcHRpb25zKS5kZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBtZXJnZU9wdGlvbnMob3B0aW9ucywgZXh0cmFPcHRpb25zKSB7XG4gICAgICAgIGlmIChleHRyYU9wdGlvbnMpIHtcbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKGV4dHJhT3B0aW9ucykpIHtcbiAgICAgICAgICAgIGV4dHJhT3B0aW9ucyA9IGV4dHJhT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9ybWx5VXRpbC5yZXZlcnNlRGVlcE1lcmdlKG9wdGlvbnMsIGV4dHJhT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZXh0ZW5kT3B0aW9uc1dpdGhEZWZhdWx0cyhvcHRpb25zLCBpbmRleCkge1xuICAgICAgICBjb25zdCBrZXkgPSBvcHRpb25zLmtleSB8fCBpbmRleCB8fCAwO1xuICAgICAgICBhbmd1bGFyLmV4dGVuZChvcHRpb25zLCB7XG4gICAgICAgICAgLy8gYXR0YWNoIHRoZSBrZXkgaW4gY2FzZSB0aGUgZm9ybWx5LWZpZWxkIGRpcmVjdGl2ZSBpcyB1c2VkIGRpcmVjdGx5XG4gICAgICAgICAga2V5LFxuICAgICAgICAgIHZhbHVlOiB2YWx1ZUdldHRlclNldHRlcixcbiAgICAgICAgICBydW5FeHByZXNzaW9ucyxcbiAgICAgICAgICByZXNldE1vZGVsLFxuICAgICAgICAgIHVwZGF0ZUluaXRpYWxWYWx1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gaW5pdGlhbGl6YXRpb24gZnVuY3Rpb25zXG4gICAgICBmdW5jdGlvbiBhZGRNb2RlbFdhdGNoZXIoc2NvcGUsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMubW9kZWwpIHtcbiAgICAgICAgICBzY29wZS4kd2F0Y2goJ29wdGlvbnMubW9kZWwnLCBydW5FeHByZXNzaW9ucywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gcmVzZXRNb2RlbCgpIHtcbiAgICAgICAgJHNjb3BlLm1vZGVsWyRzY29wZS5vcHRpb25zLmtleV0gPSAkc2NvcGUub3B0aW9ucy5pbml0aWFsVmFsdWU7XG4gICAgICAgIGlmICgkc2NvcGUub3B0aW9ucy5mb3JtQ29udHJvbCkge1xuICAgICAgICAgICRzY29wZS5vcHRpb25zLmZvcm1Db250cm9sLiRzZXRWaWV3VmFsdWUoJHNjb3BlLm1vZGVsWyRzY29wZS5vcHRpb25zLmtleV0pO1xuICAgICAgICAgICRzY29wZS5vcHRpb25zLmZvcm1Db250cm9sLiRyZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB1cGRhdGVJbml0aWFsVmFsdWUoKSB7XG4gICAgICAgICRzY29wZS5vcHRpb25zLmluaXRpYWxWYWx1ZSA9ICRzY29wZS5tb2RlbFskc2NvcGUub3B0aW9ucy5rZXldO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhZGRWYWxpZGF0aW9uTWVzc2FnZXMob3B0aW9ucykge1xuICAgICAgICBvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXMgPSBvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXMgfHwge307XG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMubWVzc2FnZXMsIGZ1bmN0aW9uIGNyZWF0ZUZ1bmN0aW9uRm9yTWVzc2FnZShleHByZXNzaW9uLCBuYW1lKSB7XG4gICAgICAgICAgaWYgKCFvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXNbbmFtZV0pIHtcbiAgICAgICAgICAgIG9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlc1tuYW1lXSA9IGZ1bmN0aW9uIGV2YWx1YXRlTWVzc2FnZSh2aWV3VmFsdWUsIG1vZGVsVmFsdWUsIHNjb3BlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIGV4cHJlc3Npb24sIG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGludm9rZUNvbnRyb2xsZXJzKHNjb3BlLCBvcHRpb25zID0ge30sIHR5cGUgPSB7fSkge1xuICAgICAgICBhbmd1bGFyLmZvckVhY2goW3R5cGUuY29udHJvbGxlciwgb3B0aW9ucy5jb250cm9sbGVyXSwgY29udHJvbGxlciA9PiB7XG4gICAgICAgICAgaWYgKGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICRjb250cm9sbGVyKGNvbnRyb2xsZXIsIHskc2NvcGU6IHNjb3BlfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGxpbms6IGZ1bmN0aW9uIGZpZWxkTGluayhzY29wZSwgZWwpIHtcbiAgICAgIGlmIChzY29wZS5vcHRpb25zLmZpZWxkR3JvdXApIHtcbiAgICAgICAgY2hlY2tGaWVsZEdyb3VwQXBpKHNjb3BlLm9wdGlvbnMpO1xuICAgICAgICBlbC5hZGRDbGFzcygnZm9ybWx5LWZpZWxkLWdyb3VwJyk7XG4gICAgICAgIHNldEVsZW1lbnRUZW1wbGF0ZShgXG4gICAgICAgICAgPGZvcm1seS1mb3JtIG1vZGVsPVwibW9kZWxcIlxuICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHM9XCJvcHRpb25zLmZpZWxkR3JvdXBcIlxuICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zPVwiJHBhcmVudC5vcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCIke3Njb3BlLm9wdGlvbnMuY2xhc3NOYW1lfVwiXG4gICAgICAgICAgICAgICAgICAgICAgIGlzLWZpZWxkLWdyb3VwPlxuICAgICAgICAgIDwvZm9ybWx5LWZvcm0+XG4gICAgICAgIGApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFkZENsYXNzZXMoKTtcblxuICAgICAgdmFyIHR5cGUgPSBzY29wZS5vcHRpb25zLnR5cGUgJiYgZm9ybWx5Q29uZmlnLmdldFR5cGUoc2NvcGUub3B0aW9ucy50eXBlKTtcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgdmFyIHRodXNseSA9IHRoaXM7XG4gICAgICBnZXRGaWVsZFRlbXBsYXRlKHNjb3BlLm9wdGlvbnMpXG4gICAgICAgIC50aGVuKHJ1bk1hbmlwdWxhdG9ycyhmb3JtbHlDb25maWcudGVtcGxhdGVNYW5pcHVsYXRvcnMucHJlV3JhcHBlcikpXG4gICAgICAgIC50aGVuKHRyYW5zY2x1ZGVJbldyYXBwZXJzKHNjb3BlLm9wdGlvbnMpKVxuICAgICAgICAudGhlbihydW5NYW5pcHVsYXRvcnMoZm9ybWx5Q29uZmlnLnRlbXBsYXRlTWFuaXB1bGF0b3JzLnBvc3RXcmFwcGVyKSlcbiAgICAgICAgLnRoZW4oc2V0RWxlbWVudFRlbXBsYXRlKVxuICAgICAgICAudGhlbih3YXRjaEZvcm1Db250cm9sKVxuICAgICAgICAudGhlbihjYWxsTGlua0Z1bmN0aW9ucylcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBmb3JtbHlXYXJuKFxuICAgICAgICAgICAgJ3RoZXJlLXdhcy1hLXByb2JsZW0tc2V0dGluZy10aGUtdGVtcGxhdGUtZm9yLXRoaXMtZmllbGQnLFxuICAgICAgICAgICAgJ1RoZXJlIHdhcyBhIHByb2JsZW0gc2V0dGluZyB0aGUgdGVtcGxhdGUgZm9yIHRoaXMgZmllbGQgJyxcbiAgICAgICAgICAgIHNjb3BlLm9wdGlvbnMsXG4gICAgICAgICAgICBlcnJvclxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICBmdW5jdGlvbiBhZGRDbGFzc2VzKCkge1xuICAgICAgICBpZiAoc2NvcGUub3B0aW9ucy5jbGFzc05hbWUpIHtcbiAgICAgICAgICBlbC5hZGRDbGFzcyhzY29wZS5vcHRpb25zLmNsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLm9wdGlvbnMudHlwZSkge1xuICAgICAgICAgIGVsLmFkZENsYXNzKGBmb3JtbHktZmllbGQtJHtzY29wZS5vcHRpb25zLnR5cGV9YCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2V0RWxlbWVudFRlbXBsYXRlKHRlbXBsYXRlU3RyaW5nKSB7XG4gICAgICAgIGVsLmh0bWwoYXNIdG1sKHRlbXBsYXRlU3RyaW5nKSk7XG4gICAgICAgICRjb21waWxlKGVsLmNvbnRlbnRzKCkpKHNjb3BlKTtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlU3RyaW5nO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB3YXRjaEZvcm1Db250cm9sKHRlbXBsYXRlU3RyaW5nKSB7XG4gICAgICAgIGxldCBzdG9wV2F0Y2hpbmdGaWVsZCA9IGFuZ3VsYXIubm9vcDtcbiAgICAgICAgbGV0IHN0b3BXYXRjaGluZ1Nob3dFcnJvciA9IGFuZ3VsYXIubm9vcDtcbiAgICAgICAgaWYgKHNjb3BlLm9wdGlvbnMubm9Gb3JtQ29udHJvbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0ZW1wbGF0ZUVsID0gYW5ndWxhci5lbGVtZW50KGA8ZGl2PiR7dGVtcGxhdGVTdHJpbmd9PC9kaXY+YCk7XG4gICAgICAgIGNvbnN0IG5nTW9kZWxOb2RlID0gdGVtcGxhdGVFbFswXS5xdWVyeVNlbGVjdG9yKCdbbmctbW9kZWxdJyk7XG4gICAgICAgIGlmIChuZ01vZGVsTm9kZSAmJiBuZ01vZGVsTm9kZS5uYW1lKSB7XG4gICAgICAgICAgd2F0Y2hGaWVsZE5hbWVPckV4aXN0ZW5jZShuZ01vZGVsTm9kZS5uYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHdhdGNoRmllbGROYW1lT3JFeGlzdGVuY2UobmFtZSkge1xuICAgICAgICAgIGNvbnN0IG5hbWVFeHByZXNzaW9uUmVnZXggPSAvXFx7XFx7KC4qPyl9fS87XG4gICAgICAgICAgY29uc3QgbmFtZUV4cHJlc3Npb24gPSBuYW1lRXhwcmVzc2lvblJlZ2V4LmV4ZWMobmFtZSk7XG4gICAgICAgICAgaWYgKG5hbWVFeHByZXNzaW9uKSB7XG4gICAgICAgICAgICB3YXRjaEZpZWxkTmFtZShuYW1lRXhwcmVzc2lvblsxXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdhdGNoRmllbGRFeGlzdGVuY2UobmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gd2F0Y2hGaWVsZE5hbWUoZXhwcmVzc2lvbikge1xuICAgICAgICAgIHNjb3BlLiR3YXRjaChleHByZXNzaW9uLCBmdW5jdGlvbiBvbmVGaWVsZE5hbWVDaGFuZ2UobmFtZSkge1xuICAgICAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgICAgc3RvcFdhdGNoaW5nRmllbGQoKTtcbiAgICAgICAgICAgICAgd2F0Y2hGaWVsZEV4aXN0ZW5jZShuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHdhdGNoRmllbGRFeGlzdGVuY2UobmFtZSkge1xuICAgICAgICAgIHN0b3BXYXRjaGluZ0ZpZWxkID0gc2NvcGUuJHdhdGNoKGBmb3JtW1wiJHtuYW1lfVwiXWAsIGZ1bmN0aW9uIGZvcm1Db250cm9sQ2hhbmdlKGZvcm1Db250cm9sKSB7XG4gICAgICAgICAgICBpZiAoZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgc2NvcGUuZmMgPSBmb3JtQ29udHJvbDsgLy8gc2hvcnRjdXQgZm9yIHRlbXBsYXRlIGF1dGhvcnNcbiAgICAgICAgICAgICAgc2NvcGUub3B0aW9ucy5mb3JtQ29udHJvbCA9IGZvcm1Db250cm9sO1xuICAgICAgICAgICAgICBzdG9wV2F0Y2hpbmdTaG93RXJyb3IoKTtcbiAgICAgICAgICAgICAgYWRkU2hvd01lc3NhZ2VzV2F0Y2hlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkU2hvd01lc3NhZ2VzV2F0Y2hlcigpIHtcbiAgICAgICAgICBzdG9wV2F0Y2hpbmdTaG93RXJyb3IgPSBzY29wZS4kd2F0Y2goZnVuY3Rpb24gd2F0Y2hTaG93VmFsaWRhdGlvbkNoYW5nZSgpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2NvcGUub3B0aW9ucy52YWxpZGF0aW9uLnNob3cgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICByZXR1cm4gc2NvcGUuZmMuJGludmFsaWQgJiYgc2NvcGUub3B0aW9ucy52YWxpZGF0aW9uLnNob3c7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsZXQgbm9Ub3VjaGVkQnV0RGlydHkgPSAoYW5ndWxhci5pc1VuZGVmaW5lZChzY29wZS5mYy4kdG91Y2hlZCkgJiYgc2NvcGUuZmMuJGRpcnR5KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHNjb3BlLmZjLiRpbnZhbGlkICYmIChzY29wZS5mYy4kdG91Y2hlZCB8fCBub1RvdWNoZWRCdXREaXJ0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZnVuY3Rpb24gb25TaG93VmFsaWRhdGlvbkNoYW5nZShzaG93KSB7XG4gICAgICAgICAgICBzY29wZS5vcHRpb25zLnZhbGlkYXRpb24uZXJyb3JFeGlzdHNBbmRTaG91bGRCZVZpc2libGUgPSBzaG93O1xuICAgICAgICAgICAgc2NvcGUuc2hvd0Vycm9yID0gc2hvdzsgLy8gc2hvcnRjdXQgZm9yIHRlbXBsYXRlIGF1dGhvcnNcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBjYWxsTGlua0Z1bmN0aW9ucygpIHtcbiAgICAgICAgaWYgKHR5cGUgJiYgdHlwZS5saW5rKSB7XG4gICAgICAgICAgdHlwZS5saW5rLmFwcGx5KHRodXNseSwgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLm9wdGlvbnMubGluaykge1xuICAgICAgICAgIHNjb3BlLm9wdGlvbnMubGluay5hcHBseSh0aHVzbHksIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICB9XG5cblxuICAgICAgZnVuY3Rpb24gcnVuTWFuaXB1bGF0b3JzKG1hbmlwdWxhdG9ycykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gcnVuTWFuaXB1bGF0b3JzT25UZW1wbGF0ZSh0ZW1wbGF0ZSkge1xuICAgICAgICAgIHZhciBjaGFpbiA9ICRxLndoZW4odGVtcGxhdGUpO1xuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChtYW5pcHVsYXRvcnMsIG1hbmlwdWxhdG9yID0+IHtcbiAgICAgICAgICAgIGNoYWluID0gY2hhaW4udGhlbih0ZW1wbGF0ZSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKG1hbmlwdWxhdG9yKHRlbXBsYXRlLCBzY29wZS5vcHRpb25zLCBzY29wZSkpLnRoZW4obmV3VGVtcGxhdGUgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmlzU3RyaW5nKG5ld1RlbXBsYXRlKSA/IG5ld1RlbXBsYXRlIDogYXNIdG1sKG5ld1RlbXBsYXRlKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIGFzSHRtbChlbCkge1xuICAgIHZhciB3cmFwcGVyID0gYW5ndWxhci5lbGVtZW50KCc8YT48L2E+Jyk7XG4gICAgcmV0dXJuIHdyYXBwZXIuYXBwZW5kKGVsKS5odG1sKCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRGaWVsZFRlbXBsYXRlKG9wdGlvbnMpIHtcbiAgICBsZXQgdHlwZSA9IGZvcm1seUNvbmZpZy5nZXRUeXBlKG9wdGlvbnMudHlwZSwgdHJ1ZSwgb3B0aW9ucyk7XG4gICAgbGV0IHRlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZSB8fCB0eXBlICYmIHR5cGUudGVtcGxhdGU7XG4gICAgbGV0IHRlbXBsYXRlVXJsID0gb3B0aW9ucy50ZW1wbGF0ZVVybCB8fCB0eXBlICYmIHR5cGUudGVtcGxhdGVVcmw7XG4gICAgaWYgKCF0ZW1wbGF0ZSAmJiAhdGVtcGxhdGVVcmwpIHtcbiAgICAgIHRocm93IGZvcm1seVVzYWJpbGl0eS5nZXRGaWVsZEVycm9yKFxuICAgICAgICAndHlwZS10eXBlLWhhcy1uby10ZW1wbGF0ZScsXG4gICAgICAgIGBUeXBlICcke29wdGlvbnMudHlwZX0nIGhhcyBub3QgdGVtcGxhdGUuIE9uIGVsZW1lbnQ6YCwgb3B0aW9uc1xuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0VGVtcGxhdGUodGVtcGxhdGUgfHwgdGVtcGxhdGVVcmwsICF0ZW1wbGF0ZSwgb3B0aW9ucyk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGdldFRlbXBsYXRlKHRlbXBsYXRlLCBpc1VybCwgb3B0aW9ucykge1xuICAgIGxldCB0ZW1wbGF0ZVByb21pc2U7XG4gICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih0ZW1wbGF0ZSkpIHtcbiAgICAgIHRlbXBsYXRlUHJvbWlzZSA9ICRxLndoZW4odGVtcGxhdGUob3B0aW9ucykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ZW1wbGF0ZVByb21pc2UgPSAkcS53aGVuKHRlbXBsYXRlKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzVXJsKSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGVQcm9taXNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgaHR0cE9wdGlvbnMgPSB7Y2FjaGU6ICR0ZW1wbGF0ZUNhY2hlfTtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZVByb21pc2VcbiAgICAgICAgLnRoZW4oKHVybCkgPT4gJGh0dHAuZ2V0KHVybCwgaHR0cE9wdGlvbnMpKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmRhdGEpXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiBoYW5kbGVFcnJvckdldHRpbmdBVGVtcGxhdGUoZXJyb3IpIHtcbiAgICAgICAgICBmb3JtbHlXYXJuKFxuICAgICAgICAgICAgJ3Byb2JsZW0tbG9hZGluZy10ZW1wbGF0ZS1mb3ItdGVtcGxhdGV1cmwnLFxuICAgICAgICAgICAgJ1Byb2JsZW0gbG9hZGluZyB0ZW1wbGF0ZSBmb3IgJyArIHRlbXBsYXRlLFxuICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2NsdWRlSW5XcmFwcGVycyhvcHRpb25zKSB7XG4gICAgbGV0IHdyYXBwZXIgPSBnZXRXcmFwcGVyT3B0aW9uKG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHRyYW5zY2x1ZGVUZW1wbGF0ZSh0ZW1wbGF0ZSkge1xuICAgICAgaWYgKCF3cmFwcGVyLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gJHEud2hlbih0ZW1wbGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIHdyYXBwZXIuZm9yRWFjaCgod3JhcHBlcikgPT4ge1xuICAgICAgICBmb3JtbHlVc2FiaWxpdHkuY2hlY2tXcmFwcGVyKHdyYXBwZXIsIG9wdGlvbnMpO1xuICAgICAgICB3cmFwcGVyLnZhbGlkYXRlT3B0aW9ucyAmJiB3cmFwcGVyLnZhbGlkYXRlT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgcnVuQXBpQ2hlY2sod3JhcHBlciwgb3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICAgIGxldCBwcm9taXNlcyA9IHdyYXBwZXIubWFwKHcgPT4gZ2V0VGVtcGxhdGUody50ZW1wbGF0ZSB8fCB3LnRlbXBsYXRlVXJsLCAhdy50ZW1wbGF0ZSkpO1xuICAgICAgcmV0dXJuICRxLmFsbChwcm9taXNlcykudGhlbih3cmFwcGVyc1RlbXBsYXRlcyA9PiB7XG4gICAgICAgIHdyYXBwZXJzVGVtcGxhdGVzLmZvckVhY2goKHdyYXBwZXJUZW1wbGF0ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBmb3JtbHlVc2FiaWxpdHkuY2hlY2tXcmFwcGVyVGVtcGxhdGUod3JhcHBlclRlbXBsYXRlLCB3cmFwcGVyW2luZGV4XSk7XG4gICAgICAgIH0pO1xuICAgICAgICB3cmFwcGVyc1RlbXBsYXRlcy5yZXZlcnNlKCk7IC8vIHdyYXBwZXIgMCBpcyB3cmFwcGVkIGluIHdyYXBwZXIgMSBhbmQgc28gb24uLi5cbiAgICAgICAgbGV0IHRvdGFsV3JhcHBlciA9IHdyYXBwZXJzVGVtcGxhdGVzLnNoaWZ0KCk7XG4gICAgICAgIHdyYXBwZXJzVGVtcGxhdGVzLmZvckVhY2god3JhcHBlclRlbXBsYXRlID0+IHtcbiAgICAgICAgICB0b3RhbFdyYXBwZXIgPSBkb1RyYW5zY2x1c2lvbih0b3RhbFdyYXBwZXIsIHdyYXBwZXJUZW1wbGF0ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZG9UcmFuc2NsdXNpb24odG90YWxXcmFwcGVyLCB0ZW1wbGF0ZSk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZG9UcmFuc2NsdXNpb24od3JhcHBlciwgdGVtcGxhdGUpIHtcbiAgICBsZXQgc3VwZXJXcmFwcGVyID0gYW5ndWxhci5lbGVtZW50KCc8YT48L2E+Jyk7IC8vIHRoaXMgYWxsb3dzIHBlb3BsZSBub3QgaGF2ZSB0byBoYXZlIGEgc2luZ2xlIHJvb3QgaW4gd3JhcHBlcnNcbiAgICBzdXBlcldyYXBwZXIuYXBwZW5kKHdyYXBwZXIpO1xuICAgIGxldCB0cmFuc2NsdWRlRWwgPSBzdXBlcldyYXBwZXIuZmluZCgnZm9ybWx5LXRyYW5zY2x1ZGUnKTtcbiAgICBpZiAoIXRyYW5zY2x1ZGVFbC5sZW5ndGgpIHtcbiAgICAgIC8vdHJ5IGl0IHVzaW5nIG91ciBjdXN0b20gZmluZCBmdW5jdGlvblxuICAgICAgdHJhbnNjbHVkZUVsID0gZm9ybWx5VXRpbC5maW5kQnlOb2RlTmFtZShzdXBlcldyYXBwZXIsICdmb3JtbHktdHJhbnNjbHVkZScpO1xuICAgIH1cbiAgICB0cmFuc2NsdWRlRWwucmVwbGFjZVdpdGgodGVtcGxhdGUpO1xuICAgIHJldHVybiBzdXBlcldyYXBwZXIuaHRtbCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0V3JhcHBlck9wdGlvbihvcHRpb25zKSB7XG4gICAgbGV0IHdyYXBwZXIgPSBvcHRpb25zLndyYXBwZXI7XG4gICAgLy8gZXhwbGljaXQgbnVsbCBtZWFucyBubyB3cmFwcGVyXG4gICAgaWYgKHdyYXBwZXIgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICAvLyBub3RoaW5nIHNwZWNpZmllZCBtZWFucyB1c2UgdGhlIGRlZmF1bHQgd3JhcHBlciBmb3IgdGhlIHR5cGVcbiAgICBpZiAoIXdyYXBwZXIpIHtcbiAgICAgIC8vIGdldCBhbGwgd3JhcHBlcnMgdGhhdCBzcGVjaWZ5IHRoZXkgYXBwbHkgdG8gdGhpcyB0eXBlXG4gICAgICB3cmFwcGVyID0gYXJyYXlpZnkoZm9ybWx5Q29uZmlnLmdldFdyYXBwZXJCeVR5cGUob3B0aW9ucy50eXBlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdyYXBwZXIgPSBhcnJheWlmeSh3cmFwcGVyKS5tYXAoZm9ybWx5Q29uZmlnLmdldFdyYXBwZXIpO1xuICAgIH1cblxuICAgIC8vIGdldCBhbGwgd3JhcHBlcnMgZm9yIHRoYXQgdGhpcyB0eXBlIHNwZWNpZmllZCB0aGF0IGl0IHVzZXMuXG4gICAgdmFyIHR5cGUgPSBmb3JtbHlDb25maWcuZ2V0VHlwZShvcHRpb25zLnR5cGUsIHRydWUsIG9wdGlvbnMpO1xuICAgIGlmICh0eXBlICYmIHR5cGUud3JhcHBlcikge1xuICAgICAgbGV0IHR5cGVXcmFwcGVycyA9IGFycmF5aWZ5KHR5cGUud3JhcHBlcikubWFwKGZvcm1seUNvbmZpZy5nZXRXcmFwcGVyKTtcbiAgICAgIHdyYXBwZXIgPSB3cmFwcGVyLmNvbmNhdCh0eXBlV3JhcHBlcnMpO1xuICAgIH1cblxuICAgIC8vIGFkZCB0aGUgZGVmYXVsdCB3cmFwcGVyIGxhc3RcbiAgICB2YXIgZGVmYXVsdFdyYXBwZXIgPSBmb3JtbHlDb25maWcuZ2V0V3JhcHBlcigpO1xuICAgIGlmIChkZWZhdWx0V3JhcHBlcikge1xuICAgICAgd3JhcHBlci5wdXNoKGRlZmF1bHRXcmFwcGVyKTtcbiAgICB9XG4gICAgcmV0dXJuIHdyYXBwZXI7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0FwaShvcHRpb25zKSB7XG4gICAgZm9ybWx5QXBpQ2hlY2sudGhyb3coZm9ybWx5QXBpQ2hlY2suZm9ybWx5RmllbGRPcHRpb25zLCBvcHRpb25zLCB7XG4gICAgICBwcmVmaXg6ICdmb3JtbHktZmllbGQgZGlyZWN0aXZlJyxcbiAgICAgIHVybDogJ2Zvcm1seS1maWVsZC1kaXJlY3RpdmUtdmFsaWRhdGlvbi1mYWlsZWQnXG4gICAgfSk7XG4gICAgLy8gdmFsaWRhdGUgd2l0aCB0aGUgdHlwZVxuICAgIGNvbnN0IHR5cGUgPSBvcHRpb25zLnR5cGUgJiYgZm9ybWx5Q29uZmlnLmdldFR5cGUob3B0aW9ucy50eXBlKTtcbiAgICBpZiAodHlwZSkge1xuICAgICAgaWYgKHR5cGUudmFsaWRhdGVPcHRpb25zKSB7XG4gICAgICAgIHR5cGUudmFsaWRhdGVPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgcnVuQXBpQ2hlY2sodHlwZSwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tGaWVsZEdyb3VwQXBpKG9wdGlvbnMpIHtcbiAgICBmb3JtbHlBcGlDaGVjay50aHJvdyhmb3JtbHlBcGlDaGVjay5maWVsZEdyb3VwLCBvcHRpb25zLCB7XG4gICAgICBwcmVmaXg6ICdmb3JtbHktZmllbGQgZGlyZWN0aXZlJyxcbiAgICAgIHVybDogJ2Zvcm1seS1maWVsZC1kaXJlY3RpdmUtdmFsaWRhdGlvbi1mYWlsZWQnXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBydW5BcGlDaGVjayh7YXBpQ2hlY2ssIGFwaUNoZWNrSW5zdGFuY2UsIGFwaUNoZWNrRnVuY3Rpb24sIGFwaUNoZWNrT3B0aW9uc30sIG9wdGlvbnMpIHtcbiAgICBpZiAoIWFwaUNoZWNrKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGluc3RhbmNlID0gYXBpQ2hlY2tJbnN0YW5jZSB8fCBmb3JtbHlBcGlDaGVjaztcbiAgICBjb25zdCBmbiA9IGFwaUNoZWNrRnVuY3Rpb24gfHwgJ3dhcm4nO1xuICAgIGNvbnN0IHNoYXBlID0gaW5zdGFuY2Uuc2hhcGUoYXBpQ2hlY2spO1xuICAgIGluc3RhbmNlW2ZuXShzaGFwZSwgb3B0aW9ucywgYXBpQ2hlY2tPcHRpb25zIHx8IHtcbiAgICAgICAgcHJlZml4OiBgZm9ybWx5LWZpZWxkICR7bmFtZX1gLFxuICAgICAgICB1cmw6IGZvcm1seUFwaUNoZWNrLmNvbmZpZy5vdXRwdXQuZG9jc0Jhc2VVcmwgKyAnZm9ybWx5LWZpZWxkLXR5cGUtYXBpY2hlY2stZmFpbGVkJ1xuICAgICAgfSk7XG4gIH1cblxufVxuXG5mdW5jdGlvbiBhcnJheWlmeShvYmopIHtcbiAgaWYgKG9iaiAmJiAhYW5ndWxhci5pc0FycmF5KG9iaikpIHtcbiAgICBvYmogPSBbb2JqXTtcbiAgfSBlbHNlIGlmICghb2JqKSB7XG4gICAgb2JqID0gW107XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2RpcmVjdGl2ZXMvZm9ybWx5LWZpZWxkLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZm9ybWx5Rm9jdXM7XG5cbi8vIEBuZ0luamVjdFxuZnVuY3Rpb24gZm9ybWx5Rm9jdXMoJHRpbWVvdXQsICRkb2N1bWVudCkge1xuICAvKiBqc2hpbnQgLVcwNTIgKi9cbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIGxpbms6IGZ1bmN0aW9uIGZvcm1seUZvY3VzTGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgIHZhciBwcmV2aW91c0VsID0gbnVsbDtcbiAgICAgIHZhciBlbCA9IGVsZW1lbnRbMF07XG4gICAgICB2YXIgZG9jID0gJGRvY3VtZW50WzBdO1xuICAgICAgYXR0cnMuJG9ic2VydmUoJ2Zvcm1seUZvY3VzJywgZnVuY3Rpb24gcmVzcG9uZFRvRm9jdXNFeHByZXNzaW9uQ2hhbmdlKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gc2V0RWxlbWVudEZvY3VzKCkge1xuICAgICAgICAgICAgcHJldmlvdXNFbCA9IGRvYy5hY3RpdmVFbGVtZW50O1xuICAgICAgICAgICAgZWwuZm9jdXMoKTtcbiAgICAgICAgICB9LCB+fmF0dHJzLmZvY3VzV2FpdCk7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09ICdmYWxzZScpIHtcbiAgICAgICAgICBpZiAoZG9jLmFjdGl2ZUVsZW1lbnQgPT09IGVsKSB7XG4gICAgICAgICAgICBlbC5ibHVyKCk7XG4gICAgICAgICAgICBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkoJ3JlZm9jdXMnKSAmJiBwcmV2aW91c0VsKSB7XG4gICAgICAgICAgICAgIHByZXZpb3VzRWwuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2RpcmVjdGl2ZXMvZm9ybWx5LWZvY3VzLmpzXG4gKiovIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhci1maXgnO1xuXG5leHBvcnQgZGVmYXVsdCBmb3JtbHlGb3JtO1xuXG4vKipcbiAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAqIEBuYW1lIGZvcm1seUZvcm1cbiAqIEByZXN0cmljdCBFXG4gKi9cbi8vIEBuZ0luamVjdFxuZnVuY3Rpb24gZm9ybWx5Rm9ybShmb3JtbHlVc2FiaWxpdHksICRwYXJzZSwgZm9ybWx5QXBpQ2hlY2ssIGZvcm1seUNvbmZpZykge1xuICB2YXIgY3VycmVudEZvcm1JZCA9IDE7XG4gIHZhciBvcHRpb25zQXBpID0gW1xuICAgIGZvcm1seUFwaUNoZWNrLnNoYXBlKHtcbiAgICAgIGZvcm1TdGF0ZTogZm9ybWx5QXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICAgICAgcmVzZXRNb2RlbDogZm9ybWx5QXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgICAgIHVwZGF0ZUluaXRpYWxWYWx1ZTogZm9ybWx5QXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgICAgIHJlbW92ZUNocm9tZUF1dG9Db21wbGV0ZTogZm9ybWx5QXBpQ2hlY2suYm9vbC5vcHRpb25hbFxuICAgIH0pLnN0cmljdC5vcHRpb25hbFxuICBdO1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgdGVtcGxhdGU6IGZ1bmN0aW9uIGZvcm1seUZvcm1HZXRUZW1wbGF0ZShlbCwgYXR0cnMpIHtcbiAgICAgIC8qIGpzaGludCAtVzAzMyAqLyAvLyB0aGlzIGJlY2F1c2UganNoaW50IGlzIGJyb2tlbiBJIGd1ZXNzLi4uXG4gICAgICBjb25zdCByb290RWwgPSBnZXRSb290RWwoKTtcbiAgICAgIGNvbnN0IGZvcm1JZCA9IGBmb3JtbHlfJHtjdXJyZW50Rm9ybUlkKyt9YDtcbiAgICAgIGxldCBwYXJlbnRGb3JtQXR0cmlidXRlcztcbiAgICAgIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eSgnaXNGaWVsZEdyb3VwJykgJiYgZWwucGFyZW50KCkucGFyZW50KCkuaGFzQ2xhc3MoJ2Zvcm1seScpKSB7XG4gICAgICAgIHBhcmVudEZvcm1BdHRyaWJ1dGVzID0gY29weUF0dHJpYnV0ZXMoZWwucGFyZW50KCkucGFyZW50KClbMF0uYXR0cmlidXRlcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYFxuICAgICAgICA8JHtyb290RWx9IGNsYXNzPVwiZm9ybWx5XCJcbiAgICAgICAgICAgICAgICAgbmFtZT1cIiR7Z2V0Rm9ybU5hbWUoKX1cIlxuICAgICAgICAgICAgICAgICByb2xlPVwiZm9ybVwiICR7cGFyZW50Rm9ybUF0dHJpYnV0ZXN9PlxuICAgICAgICAgIDxkaXYgZm9ybWx5LWZpZWxkXG4gICAgICAgICAgICAgICBuZy1yZXBlYXQ9XCJmaWVsZCBpbiBmaWVsZHMgJHtnZXRUcmFja0J5KCl9XCJcbiAgICAgICAgICAgICAgICR7Z2V0SGlkZURpcmVjdGl2ZSgpfT1cIiFmaWVsZC5oaWRlXCJcbiAgICAgICAgICAgICAgIGNsYXNzPVwiZm9ybWx5LWZpZWxkXCJcbiAgICAgICAgICAgICAgIG9wdGlvbnM9XCJmaWVsZFwiXG4gICAgICAgICAgICAgICBtb2RlbD1cImZpZWxkLm1vZGVsIHx8IG1vZGVsXCJcbiAgICAgICAgICAgICAgIGZpZWxkcz1cImZpZWxkc1wiXG4gICAgICAgICAgICAgICBmb3JtPVwiJHtmb3JtSWR9XCJcbiAgICAgICAgICAgICAgIGZvcm0taWQ9XCIke2Zvcm1JZH1cIlxuICAgICAgICAgICAgICAgZm9ybS1zdGF0ZT1cIm9wdGlvbnMuZm9ybVN0YXRlXCJcbiAgICAgICAgICAgICAgIGluZGV4PVwiJGluZGV4XCI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBuZy10cmFuc2NsdWRlPjwvZGl2PlxuICAgICAgICA8LyR7cm9vdEVsfT5cbiAgICAgIGA7XG5cbiAgICAgIGZ1bmN0aW9uIGdldFJvb3RFbCgpIHtcbiAgICAgICAgcmV0dXJuIGF0dHJzLnJvb3RFbCB8fCAnbmctZm9ybSc7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGdldEhpZGVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHJldHVybiBhdHRycy5oaWRlRGlyZWN0aXZlIHx8IGZvcm1seUNvbmZpZy5leHRyYXMuZGVmYXVsdEhpZGVEaXJlY3RpdmUgfHwgJ25nLWlmJztcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZ2V0VHJhY2tCeSgpIHtcbiAgICAgICAgaWYgKCFhdHRycy50cmFja0J5KSB7XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBgdHJhY2sgYnkgJHthdHRycy50cmFja0J5fWA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZ2V0Rm9ybU5hbWUoKSB7XG4gICAgICAgIGxldCBmb3JtTmFtZSA9IGZvcm1JZDtcbiAgICAgICAgY29uc3QgYmluZE5hbWUgPSBhdHRycy5iaW5kTmFtZTtcbiAgICAgICAgaWYgKGJpbmROYW1lKSB7XG4gICAgICAgICAgaWYgKGFuZ3VsYXIudmVyc2lvbi5taW5vciA8IDMpIHtcbiAgICAgICAgICAgIHRocm93IGZvcm1seVVzYWJpbGl0eS5nZXRGb3JtbHlFcnJvcignYmluZC1uYW1lIGF0dHJpYnV0ZSBvbiBmb3JtbHktZm9ybSBub3QgYWxsb3dlZCBpbiA+IGFuZ3VsYXIgMS4zJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHdlIGNhbiBkbyBhIG9uZS10aW1lIGJpbmRpbmcgaGVyZSBiZWNhdXNlIHdlIGtub3cgd2UncmUgaW4gMS4zLnggdGVycml0b3J5XG4gICAgICAgICAgZm9ybU5hbWUgPSBge3s6Oidmb3JtbHlfJyArICR7YmluZE5hbWV9fX1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtTmFtZTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gY29weUF0dHJpYnV0ZXMoYXR0cmlidXRlcykge1xuICAgICAgICAvL2NvbnNvbGUubG9nKGF0dHJpYnV0ZXMpO1xuICAgICAgICBjb25zdCBleGNsdWRlZCA9IFsnbW9kZWwnLCAnZm9ybScsICdmaWVsZHMnLCAnb3B0aW9ucycsICduYW1lJywgJ3JvbGUnLCAnY2xhc3MnXTtcbiAgICAgICAgY29uc3QgYXJyYXlBdHRycyA9IFtdO1xuICAgICAgICBhbmd1bGFyLmZvckVhY2goYXR0cmlidXRlcywgKHtub2RlTmFtZSwgbm9kZVZhbHVlfSkgPT4ge1xuICAgICAgICAgIGlmIChub2RlTmFtZSAhPT0gJ3VuZGVmaW5lZCcgJiYgZXhjbHVkZWQuaW5kZXhPZihub2RlTmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICBhcnJheUF0dHJzLnB1c2goYCR7dG9LZWJhYkNhc2Uobm9kZU5hbWUpfT1cIiR7bm9kZVZhbHVlfVwiYCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGFycmF5QXR0cnMuam9pbignICcpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB0b0tlYmFiQ2FzZShzdHJpbmcpIHtcbiAgICAgICAgaWYgKHN0cmluZykge1xuICAgICAgICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvKFtBLVpdKS9nLCAkMSA9PiAnLScgKyAkMS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHJlcGxhY2U6IHRydWUsXG4gICAgdHJhbnNjbHVkZTogdHJ1ZSxcbiAgICBzY29wZToge1xuICAgICAgZmllbGRzOiAnPScsXG4gICAgICBtb2RlbDogJz0nLFxuICAgICAgZm9ybTogJz0/JyxcbiAgICAgIG9wdGlvbnM6ICc9PydcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6IC8qIEBuZ0luamVjdCAqLyBmdW5jdGlvbiBGb3JtbHlGb3JtQ29udHJvbGxlcigkc2NvcGUpIHtcbiAgICAgIHNldHVwT3B0aW9ucygpO1xuICAgICAgJHNjb3BlLm1vZGVsID0gJHNjb3BlLm1vZGVsIHx8IHt9O1xuICAgICAgJHNjb3BlLmZpZWxkcyA9ICRzY29wZS5maWVsZHMgfHwgW107XG5cbiAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZmllbGRzLCBhdHRhY2hLZXkpOyAvLyBhdHRhY2hlcyBhIGtleSBiYXNlZCBvbiB0aGUgaW5kZXggaWYgYSBrZXkgaXNuJ3Qgc3BlY2lmaWVkXG4gICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgc2V0dXBXYXRjaGVycyk7IC8vIHNldHVwIHdhdGNoZXJzIGZvciBhbGwgZmllbGRzXG5cbiAgICAgIC8vIHdhdGNoIHRoZSBtb2RlbCBhbmQgZXZhbHVhdGUgd2F0Y2ggZXhwcmVzc2lvbnMgdGhhdCBkZXBlbmQgb24gaXQuXG4gICAgICAkc2NvcGUuJHdhdGNoKCdtb2RlbCcsIGZ1bmN0aW9uIG9uUmVzdWx0VXBkYXRlKG5ld1Jlc3VsdCkge1xuICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgZnVuY3Rpb24gcnVuRmllbGRFeHByZXNzaW9uUHJvcGVydGllcyhmaWVsZCkge1xuICAgICAgICAgIC8qanNoaW50IC1XMDMwICovXG4gICAgICAgICAgIWlzRmllbGRHcm91cChmaWVsZCkgJiYgZmllbGQucnVuRXhwcmVzc2lvbnMgJiYgZmllbGQucnVuRXhwcmVzc2lvbnMobmV3UmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgICB9LCB0cnVlKTtcblxuICAgICAgZnVuY3Rpb24gc2V0dXBPcHRpb25zKCkge1xuICAgICAgICBmb3JtbHlBcGlDaGVjay50aHJvdyhvcHRpb25zQXBpLCBbJHNjb3BlLm9wdGlvbnNdLCB7cHJlZml4OiAnZm9ybWx5LWZvcm0gb3B0aW9ucyBjaGVjayd9KTtcbiAgICAgICAgJHNjb3BlLm9wdGlvbnMgPSAkc2NvcGUub3B0aW9ucyB8fCB7fTtcbiAgICAgICAgJHNjb3BlLm9wdGlvbnMuZm9ybVN0YXRlID0gJHNjb3BlLm9wdGlvbnMuZm9ybVN0YXRlIHx8IHt9O1xuXG4gICAgICAgIGFuZ3VsYXIuZXh0ZW5kKCRzY29wZS5vcHRpb25zLCB7XG4gICAgICAgICAgdXBkYXRlSW5pdGlhbFZhbHVlLFxuICAgICAgICAgIHJlc2V0TW9kZWxcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdXBkYXRlSW5pdGlhbFZhbHVlKCkge1xuICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgZmllbGQgPT4gZmllbGQudXBkYXRlSW5pdGlhbFZhbHVlKCkpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiByZXNldE1vZGVsKCkge1xuICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgZmllbGQgPT4gZmllbGQucmVzZXRNb2RlbCgpKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYXR0YWNoS2V5KGZpZWxkLCBpbmRleCkge1xuICAgICAgICBpZiAoIWlzRmllbGRHcm91cChmaWVsZCkpIHtcbiAgICAgICAgICBmaWVsZC5rZXkgPSBmaWVsZC5rZXkgfHwgaW5kZXggfHwgMDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzZXR1cFdhdGNoZXJzKGZpZWxkLCBpbmRleCkge1xuICAgICAgICBpZiAoaXNGaWVsZEdyb3VwKGZpZWxkKSB8fCAhYW5ndWxhci5pc0RlZmluZWQoZmllbGQud2F0Y2hlcikpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHdhdGNoZXJzID0gZmllbGQud2F0Y2hlcjtcbiAgICAgICAgaWYgKCFhbmd1bGFyLmlzQXJyYXkod2F0Y2hlcnMpKSB7XG4gICAgICAgICAgd2F0Y2hlcnMgPSBbd2F0Y2hlcnNdO1xuICAgICAgICB9XG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh3YXRjaGVycywgZnVuY3Rpb24gc2V0dXBXYXRjaGVyKHdhdGNoZXIpIHtcbiAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKHdhdGNoZXIubGlzdGVuZXIpKSB7XG4gICAgICAgICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHkuZ2V0RmllbGRFcnJvcihcbiAgICAgICAgICAgICAgJ2FsbC1maWVsZC13YXRjaGVycy1tdXN0LWhhdmUtYS1saXN0ZW5lcicsXG4gICAgICAgICAgICAgICdBbGwgZmllbGQgd2F0Y2hlcnMgbXVzdCBoYXZlIGEgbGlzdGVuZXInLCBmaWVsZFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHdhdGNoRXhwcmVzc2lvbiA9IGdldFdhdGNoRXhwcmVzc2lvbih3YXRjaGVyLCBmaWVsZCwgaW5kZXgpO1xuICAgICAgICAgIHZhciB3YXRjaExpc3RlbmVyID0gZ2V0V2F0Y2hMaXN0ZW5lcih3YXRjaGVyLCBmaWVsZCwgaW5kZXgpO1xuXG4gICAgICAgICAgdmFyIHR5cGUgPSB3YXRjaGVyLnR5cGUgfHwgJyR3YXRjaCc7XG4gICAgICAgICAgd2F0Y2hlci5zdG9wV2F0Y2hpbmcgPSAkc2NvcGVbdHlwZV0od2F0Y2hFeHByZXNzaW9uLCB3YXRjaExpc3RlbmVyLCB3YXRjaGVyLndhdGNoRGVlcCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRXYXRjaEV4cHJlc3Npb24od2F0Y2hlciwgZmllbGQsIGluZGV4KSB7XG4gICAgICAgIHZhciB3YXRjaEV4cHJlc3Npb24gPSB3YXRjaGVyLmV4cHJlc3Npb24gfHwgYG1vZGVsWycke2ZpZWxkLmtleX0nXWA7XG4gICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24od2F0Y2hFeHByZXNzaW9uKSkge1xuICAgICAgICAgIC8vIHdyYXAgdGhlIGZpZWxkJ3Mgd2F0Y2ggZXhwcmVzc2lvbiBzbyB3ZSBjYW4gY2FsbCBpdCB3aXRoIHRoZSBmaWVsZCBhcyB0aGUgZmlyc3QgYXJnXG4gICAgICAgICAgLy8gYW5kIHRoZSBzdG9wIGZ1bmN0aW9uIGFzIHRoZSBsYXN0IGFyZyBhcyBhIGhlbHBlclxuICAgICAgICAgIHZhciBvcmlnaW5hbEV4cHJlc3Npb24gPSB3YXRjaEV4cHJlc3Npb247XG4gICAgICAgICAgd2F0Y2hFeHByZXNzaW9uID0gZnVuY3Rpb24gZm9ybWx5V2F0Y2hFeHByZXNzaW9uKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBtb2RpZnlBcmdzKHdhdGNoZXIsIGluZGV4LCAuLi5hcmd1bWVudHMpO1xuICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsRXhwcmVzc2lvbiguLi5hcmdzKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHdhdGNoRXhwcmVzc2lvbi5kaXNwbGF5TmFtZSA9IGBGb3JtbHkgV2F0Y2ggRXhwcmVzc2lvbiBmb3IgZmllbGQgZm9yICR7ZmllbGQua2V5fWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdhdGNoRXhwcmVzc2lvbjtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZ2V0V2F0Y2hMaXN0ZW5lcih3YXRjaGVyLCBmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgdmFyIHdhdGNoTGlzdGVuZXIgPSB3YXRjaGVyLmxpc3RlbmVyO1xuICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHdhdGNoTGlzdGVuZXIpKSB7XG4gICAgICAgICAgLy8gd3JhcCB0aGUgZmllbGQncyB3YXRjaCBsaXN0ZW5lciBzbyB3ZSBjYW4gY2FsbCBpdCB3aXRoIHRoZSBmaWVsZCBhcyB0aGUgZmlyc3QgYXJnXG4gICAgICAgICAgLy8gYW5kIHRoZSBzdG9wIGZ1bmN0aW9uIGFzIHRoZSBsYXN0IGFyZyBhcyBhIGhlbHBlclxuICAgICAgICAgIHZhciBvcmlnaW5hbExpc3RlbmVyID0gd2F0Y2hMaXN0ZW5lcjtcbiAgICAgICAgICB3YXRjaExpc3RlbmVyID0gZnVuY3Rpb24gZm9ybWx5V2F0Y2hMaXN0ZW5lcigpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gbW9kaWZ5QXJncyh3YXRjaGVyLCBpbmRleCwgLi4uYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbExpc3RlbmVyKC4uLmFyZ3MpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgd2F0Y2hMaXN0ZW5lci5kaXNwbGF5TmFtZSA9IGBGb3JtbHkgV2F0Y2ggTGlzdGVuZXIgZm9yIGZpZWxkIGZvciAke2ZpZWxkLmtleX1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB3YXRjaExpc3RlbmVyO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBtb2RpZnlBcmdzKHdhdGNoZXIsIGluZGV4LCAuLi5vcmlnaW5hbEFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIFskc2NvcGUuZmllbGRzW2luZGV4XSwgLi4ub3JpZ2luYWxBcmdzLCB3YXRjaGVyLnN0b3BXYXRjaGluZ107XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGlzRmllbGRHcm91cChmaWVsZCkge1xuICAgICAgICByZXR1cm4gZmllbGQgJiYgISFmaWVsZC5maWVsZEdyb3VwO1xuICAgICAgfVxuICAgIH0sXG4gICAgbGluayhzY29wZSwgZWwsIGF0dHJzKSB7XG4gICAgICBpZiAoYXR0cnMuZm9ybSkge1xuICAgICAgICBjb25zdCBmb3JtSWQgPSBhdHRycy5uYW1lO1xuICAgICAgICAkcGFyc2UoYXR0cnMuZm9ybSkuYXNzaWduKHNjb3BlLiRwYXJlbnQsIHNjb3BlW2Zvcm1JZF0pO1xuICAgICAgfVxuXG4gICAgICAvLyBjaHJvbWUgYXV0b2NvbXBsZXRlIGxhbWVuZXNzXG4gICAgICAvLyBzZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2ODE1MyNjMTRcbiAgICAgIC8vIOGDmijgsqDnm4rgsqDhg5opICAgKOKVr8Kw4pahwrAp4pWv77i1IOKUu+KUgeKUuyAgICAo4pee4oC44pef77ybKVxuICAgICAgY29uc3QgZ2xvYmFsID0gZm9ybWx5Q29uZmlnLmV4dHJhcy5yZW1vdmVDaHJvbWVBdXRvQ29tcGxldGUgPT09IHRydWU7XG4gICAgICBjb25zdCBvZmZJbnN0YW5jZSA9IHNjb3BlLm9wdGlvbnMgJiYgc2NvcGUub3B0aW9ucy5yZW1vdmVDaHJvbWVBdXRvQ29tcGxldGUgPT09IGZhbHNlO1xuICAgICAgY29uc3Qgb25JbnN0YW5jZSA9IHNjb3BlLm9wdGlvbnMgJiYgc2NvcGUub3B0aW9ucy5yZW1vdmVDaHJvbWVBdXRvQ29tcGxldGUgPT09IHRydWU7XG4gICAgICBpZiAoKGdsb2JhbCAmJiAhb2ZmSW5zdGFuY2UpIHx8IG9uSW5zdGFuY2UpIHtcbiAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2F1dG9jb21wbGV0ZScsICdhZGRyZXNzLWxldmVsNCcpO1xuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsIHRydWUpO1xuICAgICAgICBlbFswXS5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vZGlyZWN0aXZlcy9mb3JtbHktZm9ybS5qc1xuICoqLyIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXItZml4JztcblxuZXhwb3J0IGRlZmF1bHQgYWRkRm9ybWx5TmdNb2RlbEF0dHJzTWFuaXB1bGF0b3I7XG5cbi8vIEBuZ0luamVjdFxuZnVuY3Rpb24gYWRkRm9ybWx5TmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IoZm9ybWx5Q29uZmlnKSB7XG4gIGlmIChmb3JtbHlDb25maWcuZXh0cmFzLmRpc2FibGVOZ01vZGVsQXR0cnNNYW5pcHVsYXRvcikge1xuICAgIHJldHVybjtcbiAgfVxuICBmb3JtbHlDb25maWcudGVtcGxhdGVNYW5pcHVsYXRvcnMucHJlV3JhcHBlci5wdXNoKG5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKTtcblxuXG4gIGZ1bmN0aW9uIG5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKHRlbXBsYXRlLCBvcHRpb25zLCBzY29wZSkge1xuICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjYgKi9cbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2YXIgZGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICBpZiAoZGF0YS5za2lwTmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICB9XG4gICAgZWwuaW5uZXJIVE1MID0gdGVtcGxhdGU7XG4gICAgdmFyIG1vZGVsTm9kZXMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCdbbmctbW9kZWxdJyk7XG4gICAgaWYgKCFtb2RlbE5vZGVzIHx8ICFtb2RlbE5vZGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH1cblxuICAgIGFkZElmTm90UHJlc2VudChtb2RlbE5vZGVzLCAnaWQnLCBzY29wZS5pZCk7XG4gICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsTm9kZXMsICduYW1lJywgc2NvcGUuaWQpO1xuXG4gICAgYWRkVmFsaWRhdGlvbigpO1xuICAgIGFkZE1vZGVsT3B0aW9ucygpO1xuICAgIGFkZFRlbXBsYXRlT3B0aW9uc0F0dHJzKCk7XG5cblxuICAgIHJldHVybiBlbC5pbm5lckhUTUw7XG5cblxuICAgIGZ1bmN0aW9uIGFkZFZhbGlkYXRpb24oKSB7XG4gICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy52YWxpZGF0b3JzKSB8fCBhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXMpKSB7XG4gICAgICAgIGFkZElmTm90UHJlc2VudChtb2RlbE5vZGVzLCAnZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uJywgJycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZE1vZGVsT3B0aW9ucygpIHtcbiAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLm1vZGVsT3B0aW9ucykpIHtcbiAgICAgICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsTm9kZXMsICduZy1tb2RlbC1vcHRpb25zJywgJ29wdGlvbnMubW9kZWxPcHRpb25zJyk7XG4gICAgICAgIGlmIChvcHRpb25zLm1vZGVsT3B0aW9ucy5nZXR0ZXJTZXR0ZXIpIHtcbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2gobW9kZWxOb2Rlcywgbm9kZSA9PiB7XG4gICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZSgnbmctbW9kZWwnLCAnb3B0aW9ucy52YWx1ZScpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVGVtcGxhdGVPcHRpb25zQXR0cnMoKSB7XG4gICAgICBpZiAoIW9wdGlvbnMudGVtcGxhdGVPcHRpb25zICYmICFvcHRpb25zLmV4cHJlc3Npb25Qcm9wZXJ0aWVzKSB7XG4gICAgICAgIC8vIG5vIG5lZWQgdG8gcnVuIHRoZXNlIGlmIHRoZXJlIGFyZSBubyB0ZW1wbGF0ZU9wdGlvbnMgb3IgZXhwcmVzc2lvblByb3BlcnRpZXNcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgdG8gPSBvcHRpb25zLnRlbXBsYXRlT3B0aW9ucyB8fCB7fTtcbiAgICAgIGNvbnN0IGVwID0gb3B0aW9ucy5leHByZXNzaW9uUHJvcGVydGllcyB8fCB7fTtcblxuICAgICAgbGV0IG5nTW9kZWxBdHRyaWJ1dGVzID0gZ2V0QnVpbHRJbkF0dHJpYnV0ZXMoKTtcblxuICAgICAgLy8gZXh0ZW5kIHdpdGggdGhlIHVzZXIncyBzcGVjaWZpY2F0aW9ucyB3aW5uaW5nXG4gICAgICBhbmd1bGFyLmV4dGVuZChuZ01vZGVsQXR0cmlidXRlcywgb3B0aW9ucy5uZ01vZGVsQXR0cnMpO1xuXG4gICAgICAvLyBGZWVsIGZyZWUgdG8gbWFrZSB0aGlzIG1vcmUgc2ltcGxlIDotKVxuICAgICAgYW5ndWxhci5mb3JFYWNoKG5nTW9kZWxBdHRyaWJ1dGVzLCAodmFsLCBuYW1lKSA9PiB7XG4gICAgICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjE0ICovXG4gICAgICAgIGxldCBhdHRyVmFsO1xuICAgICAgICBsZXQgYXR0ck5hbWU7XG4gICAgICAgIGNvbnN0IHJlZiA9IGBvcHRpb25zLnRlbXBsYXRlT3B0aW9uc1snJHtuYW1lfSddYDtcbiAgICAgICAgY29uc3QgdG9WYWwgPSB0b1tuYW1lXTtcbiAgICAgICAgY29uc3QgZXBWYWwgPSBnZXRFcFZhbHVlKGVwLCBuYW1lKTtcblxuICAgICAgICBjb25zdCBpblRvID0gYW5ndWxhci5pc0RlZmluZWQodG9WYWwpO1xuICAgICAgICBjb25zdCBpbkVwID0gYW5ndWxhci5pc0RlZmluZWQoZXBWYWwpO1xuICAgICAgICBpZiAodmFsLnZhbHVlKSB7XG4gICAgICAgICAgLy8gSSByZWFsaXplIHRoaXMgbG9va3MgYmFja3dhcmRzLCBidXQgaXQncyByaWdodCwgdHJ1c3QgbWUuLi5cbiAgICAgICAgICBhdHRyTmFtZSA9IHZhbC52YWx1ZTtcbiAgICAgICAgICBhdHRyVmFsID0gbmFtZTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWwuZXhwcmVzc2lvbiAmJiBpblRvKSB7XG4gICAgICAgICAgYXR0ck5hbWUgPSB2YWwuZXhwcmVzc2lvbjtcbiAgICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyh0b1tuYW1lXSkpIHtcbiAgICAgICAgICAgIGF0dHJWYWwgPSBgJGV2YWwoJHtyZWZ9KWA7XG4gICAgICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24odG9bbmFtZV0pKSB7XG4gICAgICAgICAgICBhdHRyVmFsID0gYCR7cmVmfShtb2RlbFtvcHRpb25zLmtleV0sIG9wdGlvbnMsIHRoaXMsICRldmVudClgO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgIGBvcHRpb25zLnRlbXBsYXRlT3B0aW9ucy4ke25hbWV9IG11c3QgYmUgYSBzdHJpbmcgb3IgZnVuY3Rpb246ICR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucyl9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodmFsLmJvdW5kICYmIGluRXApIHtcbiAgICAgICAgICBhdHRyTmFtZSA9IHZhbC5ib3VuZDtcbiAgICAgICAgICBhdHRyVmFsID0gcmVmO1xuICAgICAgICB9IGVsc2UgaWYgKCh2YWwuYXR0cmlidXRlIHx8IHZhbC5ib29sZWFuKSAmJiBpbkVwKSB7XG4gICAgICAgICAgYXR0ck5hbWUgPSB2YWwuYXR0cmlidXRlIHx8IHZhbC5ib29sZWFuO1xuICAgICAgICAgIGF0dHJWYWwgPSBge3ske3JlZn19fWA7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsLmF0dHJpYnV0ZSAmJiBpblRvKSB7XG4gICAgICAgICAgYXR0ck5hbWUgPSB2YWwuYXR0cmlidXRlO1xuICAgICAgICAgIGF0dHJWYWwgPSB0b1ZhbDtcbiAgICAgICAgfSBlbHNlIGlmICh2YWwuYm9vbGVhbikge1xuICAgICAgICAgIGlmIChpblRvICYmICFpbkVwICYmIHRvVmFsKSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9IHZhbC5ib29sZWFuO1xuICAgICAgICAgICAgYXR0clZhbCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGpzaGludCAtVzAzNVxuICAgICAgICAgICAgLy8gZW1wdHkgdG8gaWxsdXN0cmF0ZSB0aGF0IGEgYm9vbGVhbiB3aWxsIG5vdCBiZSBhZGRlZCB2aWEgdmFsLmJvdW5kXG4gICAgICAgICAgICAvLyBpZiB5b3Ugd2FudCBpdCBhZGRlZCB2aWEgdmFsLmJvdW5kLCB0aGVuIHB1dCBpdCBpbiBleHByZXNzaW9uUHJvcGVydGllc1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh2YWwuYm91bmQgJiYgaW5Ubykge1xuICAgICAgICAgIGF0dHJOYW1lID0gdmFsLmJvdW5kO1xuICAgICAgICAgIGF0dHJWYWwgPSByZWY7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoYXR0ck5hbWUpICYmIGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJWYWwpKSB7XG4gICAgICAgICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsTm9kZXMsIGF0dHJOYW1lLCBhdHRyVmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gVXRpbGl0eSBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gZ2V0QnVpbHRJbkF0dHJpYnV0ZXMoKSB7XG4gICAgbGV0IG5nTW9kZWxBdHRyaWJ1dGVzID0ge1xuICAgICAgZm9jdXM6IHtcbiAgICAgICAgYXR0cmlidXRlOiAnZm9ybWx5LWZvY3VzJ1xuICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgYm91bmRPbmx5ID0gW107XG4gICAgY29uc3QgYm90aEJvb2xlYW5BbmRCb3VuZCA9IFsncmVxdWlyZWQnLCAnZGlzYWJsZWQnXTtcbiAgICBjb25zdCBib3RoQXR0cmlidXRlQW5kQm91bmQgPSBbJ3BhdHRlcm4nLCAnbWlubGVuZ3RoJ107XG4gICAgY29uc3QgZXhwcmVzc2lvbk9ubHkgPSBbJ2NoYW5nZScsICdrZXlkb3duJywgJ2tleXVwJywgJ2tleXByZXNzJywgJ2NsaWNrJywgJ2ZvY3VzJywgJ2JsdXInXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVPbmx5ID0gWydwbGFjZWhvbGRlcicsICdtaW4nLCAnbWF4JywgJ3RhYmluZGV4JywgJ3R5cGUnXTtcbiAgICBpZiAoZm9ybWx5Q29uZmlnLmV4dHJhcy5uZ01vZGVsQXR0cnNNYW5pcHVsYXRvclByZWZlclVuYm91bmQpIHtcbiAgICAgIGJvdGhBdHRyaWJ1dGVBbmRCb3VuZC5wdXNoKCdtYXhsZW5ndGgnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYm91bmRPbmx5LnB1c2goJ21heGxlbmd0aCcpO1xuICAgIH1cblxuICAgIGFuZ3VsYXIuZm9yRWFjaChib3VuZE9ubHksIGl0ZW0gPT4ge1xuICAgICAgbmdNb2RlbEF0dHJpYnV0ZXNbaXRlbV0gPSB7Ym91bmQ6ICduZy0nICsgaXRlbX07XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLmZvckVhY2goYm90aEJvb2xlYW5BbmRCb3VuZCwgaXRlbSA9PiB7XG4gICAgICBuZ01vZGVsQXR0cmlidXRlc1tpdGVtXSA9IHtib29sZWFuOiBpdGVtLCBib3VuZDogJ25nLScgKyBpdGVtfTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIuZm9yRWFjaChib3RoQXR0cmlidXRlQW5kQm91bmQsIGl0ZW0gPT4ge1xuICAgICAgbmdNb2RlbEF0dHJpYnV0ZXNbaXRlbV0gPSB7YXR0cmlidXRlOiBpdGVtLCBib3VuZDogJ25nLScgKyBpdGVtfTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIuZm9yRWFjaChleHByZXNzaW9uT25seSwgaXRlbSA9PiB7XG4gICAgICB2YXIgcHJvcE5hbWUgPSAnb24nICsgaXRlbS5zdWJzdHIoMCwgMSkudG9VcHBlckNhc2UoKSArIGl0ZW0uc3Vic3RyKDEpO1xuICAgICAgbmdNb2RlbEF0dHJpYnV0ZXNbcHJvcE5hbWVdID0ge2V4cHJlc3Npb246ICduZy0nICsgaXRlbX07XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLmZvckVhY2goYXR0cmlidXRlT25seSwgaXRlbSA9PiB7XG4gICAgICBuZ01vZGVsQXR0cmlidXRlc1tpdGVtXSA9IHthdHRyaWJ1dGU6IGl0ZW19O1xuICAgIH0pO1xuICAgIHJldHVybiBuZ01vZGVsQXR0cmlidXRlcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEVwVmFsdWUoZXAsIG5hbWUpIHtcbiAgICByZXR1cm4gZXBbJ3RlbXBsYXRlT3B0aW9ucy4nICsgbmFtZV0gfHxcbiAgICAgIGVwW2B0ZW1wbGF0ZU9wdGlvbnNbJyR7bmFtZX0nXWBdIHx8XG4gICAgICBlcFtgdGVtcGxhdGVPcHRpb25zW1wiJHtuYW1lfVwiXWBdO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkSWZOb3RQcmVzZW50KG5vZGVzLCBhdHRyLCB2YWwpIHtcbiAgICBhbmd1bGFyLmZvckVhY2gobm9kZXMsIG5vZGUgPT4ge1xuICAgICAgaWYgKCFub2RlLmdldEF0dHJpYnV0ZShhdHRyKSkge1xuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShhdHRyLCB2YWwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9ydW4vZm9ybWx5TmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBhZGRDdXN0b21UYWdzO1xuXG4vLyBAbmdJbmplY3RcbmZ1bmN0aW9uIGFkZEN1c3RvbVRhZ3MoJGRvY3VtZW50KSB7XG4gIGlmICgkZG9jdW1lbnQgJiYgJGRvY3VtZW50LmdldCkge1xuICAgIC8vSUU4IGNoZWNrIC0+XG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDk2NDk2Ni9kZXRlY3QtaWUtdmVyc2lvbi1wcmlvci10by12OS1pbi1qYXZhc2NyaXB0LzEwOTY1MjAzIzEwOTY1MjAzXG4gICAgY29uc3QgZG9jdW1lbnQgPSAkZG9jdW1lbnQuZ2V0KDApO1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5pbm5lckhUTUwgPSAnPCEtLVtpZiBsdCBJRSA5XT48aT48L2k+PCFbZW5kaWZdLS0+JztcbiAgICBjb25zdCBpc0llTGVzc1RoYW45ID0gKGRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaScpLmxlbmd0aCA9PT0gMSk7XG5cbiAgICBpZiAoaXNJZUxlc3NUaGFuOSkge1xuICAgICAgLy9hZGQgdGhlIGN1c3RvbSBlbGVtZW50cyB0aGF0IHdlIG5lZWQgZm9yIGZvcm1seVxuICAgICAgY29uc3QgY3VzdG9tRWxlbWVudHMgPSBbXG4gICAgICAgICdmb3JtbHktZmllbGQnLCAnZm9ybWx5LWZvcm0nLCAnZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uJywgJ2Zvcm1seS1mb2N1cycsICdmb3JtbHktdHJhbnNwb3NlJ1xuICAgICAgXTtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChjdXN0b21FbGVtZW50cywgZWwgPT4ge1xuICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcnVuL2Zvcm1seUN1c3RvbVRhZ3MuanNcbiAqKi8iLCIvLyBzb21lIHZlcnNpb25zIG9mIGFuZ3VsYXIgZG9uJ3QgZXhwb3J0IHRoZSBhbmd1bGFyIG1vZHVsZSBwcm9wZXJseSxcbi8vIHNvIHdlIGdldCBpdCBmcm9tIHdpbmRvdyBpbiB0aGlzIGNhc2UuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmlmICghYW5ndWxhci52ZXJzaW9uKSB7XG4gIGFuZ3VsYXIgPSB3aW5kb3cuYW5ndWxhcjtcbn1cbmV4cG9ydCBkZWZhdWx0IGFuZ3VsYXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9hbmd1bGFyLWZpeC9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xNl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiYXBpQ2hlY2tcIixcImFtZFwiOlwiYXBpLWNoZWNrXCIsXCJjb21tb25qczJcIjpcImFwaS1jaGVja1wiLFwiY29tbW9uanNcIjpcImFwaS1jaGVja1wifVxuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTdfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYW5ndWxhclwiXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXItZml4JztcblxuZXhwb3J0IGRlZmF1bHQge2Zvcm1seUV2YWwsIGdldEZpZWxkSWQsIHJldmVyc2VEZWVwTWVyZ2UsIGZpbmRCeU5vZGVOYW1lfTtcblxuZnVuY3Rpb24gZm9ybWx5RXZhbChzY29wZSwgZXhwcmVzc2lvbiwgJG1vZGVsVmFsdWUsICR2aWV3VmFsdWUpIHtcbiAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihleHByZXNzaW9uKSkge1xuICAgIHJldHVybiBleHByZXNzaW9uKCR2aWV3VmFsdWUsICRtb2RlbFZhbHVlLCBzY29wZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHNjb3BlLiRldmFsKGV4cHJlc3Npb24sIHskdmlld1ZhbHVlLCAkbW9kZWxWYWx1ZX0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEZpZWxkSWQoZm9ybUlkLCBvcHRpb25zLCBpbmRleCkge1xuICB2YXIgdHlwZSA9IG9wdGlvbnMudHlwZTtcbiAgaWYgKCF0eXBlICYmIG9wdGlvbnMudGVtcGxhdGUpIHtcbiAgICB0eXBlID0gJ3RlbXBsYXRlJztcbiAgfSBlbHNlIGlmICghdHlwZSAmJiBvcHRpb25zLnRlbXBsYXRlVXJsKSB7XG4gICAgdHlwZSA9ICd0ZW1wbGF0ZVVybCc7XG4gIH1cblxuICByZXR1cm4gW2Zvcm1JZCwgdHlwZSwgb3B0aW9ucy5rZXksIGluZGV4XS5qb2luKCdfJyk7XG59XG5cblxuZnVuY3Rpb24gcmV2ZXJzZURlZXBNZXJnZShkZXN0KSB7XG4gIGFuZ3VsYXIuZm9yRWFjaChhcmd1bWVudHMsIChzcmMsIGluZGV4KSA9PiB7XG4gICAgaWYgKCFpbmRleCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBhbmd1bGFyLmZvckVhY2goc3JjLCAodmFsLCBwcm9wKSA9PiB7XG4gICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGRlc3RbcHJvcF0pKSB7XG4gICAgICAgIGRlc3RbcHJvcF0gPSBhbmd1bGFyLmNvcHkodmFsKTtcbiAgICAgIH0gZWxzZSBpZiAob2JqQW5kU2FtZVR5cGUoZGVzdFtwcm9wXSwgdmFsKSkge1xuICAgICAgICByZXZlcnNlRGVlcE1lcmdlKGRlc3RbcHJvcF0sIHZhbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvYmpBbmRTYW1lVHlwZShvYmoxLCBvYmoyKSB7XG4gIHJldHVybiBhbmd1bGFyLmlzT2JqZWN0KG9iajEpICYmIGFuZ3VsYXIuaXNPYmplY3Qob2JqMikgJiZcbiAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqMSkgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmoyKTtcbn1cblxuLy9yZWN1cnNlIGRvd24gYSBub2RlIHRyZWUgdG8gZmluZCBhIG5vZGUgd2l0aCBtYXRjaGluZyBub2RlTmFtZSwgZm9yIGN1c3RvbSB0YWdzIGpRdWVyeS5maW5kIGRvZXNuJ3Qgd29yayBpbiBJRThcbmZ1bmN0aW9uIGZpbmRCeU5vZGVOYW1lKGVsLCBub2RlTmFtZSkge1xuICBpZiAoIWVsLnByb3ApIHsgLy8gbm90IGEgalF1ZXJ5IG9yIGpxTGl0ZSBvYmplY3QgLT4gd3JhcCBpdFxuICAgIGVsID0gYW5ndWxhci5lbGVtZW50KGVsKTtcbiAgfVxuXG4gIGlmIChlbC5wcm9wKCdub2RlTmFtZScpID09PSBub2RlTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgcmV0dXJuIGVsO1xuICB9XG5cbiAgdmFyIGMgPSBlbC5jaGlsZHJlbigpO1xuICBmb3IodmFyIGkgPSAwOyBjICYmIGkgPCBjLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIG5vZGUgPSBmaW5kQnlOb2RlTmFtZShjW2ldLCBub2RlTmFtZSk7XG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vb3RoZXIvdXRpbHMuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9