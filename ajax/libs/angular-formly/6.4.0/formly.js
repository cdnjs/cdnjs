// angular-formly version 6.4.0 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)

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
	ngModule.constant("formlyVersion", ("6.4.0")); // <-- webpack variable
	
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
	
	var expressionProperties = apiCheck.objectOf(apiCheck.oneOfType([formlyExpression, apiCheck.shape({
	  expression: formlyExpression,
	  message: formlyExpression.optional
	}).strict]));
	
	var fieldOptionsApiShape = {
	  $$hashKey: apiCheck.any.optional,
	  type: apiCheck.shape.ifNot(["template", "templateUrl"], apiCheck.string).optional,
	  template: apiCheck.shape.ifNot(["type", "templateUrl"], apiCheck.oneOfType([apiCheck.string, apiCheck.func])).optional,
	  templateUrl: apiCheck.shape.ifNot(["type", "template"], apiCheck.oneOfType([apiCheck.string, apiCheck.func])).optional,
	  key: apiCheck.oneOfType([apiCheck.string, apiCheck.number]).optional,
	  model: apiCheck.object.optional,
	  className: apiCheck.string.optional,
	  expressionProperties: expressionProperties.optional,
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
	  hideExpression: formlyExpression.optional,
	  ngModelAttrs: apiCheck.objectOf(apiCheck.shape({
	    expression: apiCheck.shape.ifNot(["value", "attribute", "bound"], apiCheck.any).optional,
	    value: apiCheck.shape.ifNot("expression", apiCheck.any).optional,
	    attribute: apiCheck.shape.ifNot("expression", apiCheck.any).optional,
	    bound: apiCheck.shape.ifNot("expression", apiCheck.any).optional
	  }).strict).optional,
	  elementAttributes: apiCheck.objectOf(apiCheck.string).optional,
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
	
	var formOptionsApi = apiCheck.shape({
	  formState: apiCheck.object.optional,
	  resetModel: apiCheck.func.optional,
	  updateInitialValue: apiCheck.func.optional,
	  removeChromeAutoComplete: apiCheck.bool.optional
	}).strict;
	
	var fieldGroup = apiCheck.shape({
	  $$hashKey: apiCheck.any.optional,
	  fieldGroup: apiCheck.arrayOf(formlyFieldOptions),
	  className: apiCheck.string.optional,
	  options: formOptionsApi.optional,
	  hide: apiCheck.bool.optional,
	  hideExpression: formlyExpression.optional,
	  model: apiCheck.object.optional,
	  form: apiCheck.object.optional,
	  elementAttributes: apiCheck.objectOf(apiCheck.string).optional
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
	  formlyTypeOptions: formlyTypeOptions, formlyFieldOptions: formlyFieldOptions, formlyExpression: formlyExpression, formlyWrapperType: formlyWrapperType, fieldGroup: fieldGroup, formOptionsApi: formOptionsApi
	});
	
	module.exports = apiCheck;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = "https://github.com/formly-js/angular-formly/blob/" + ("6.4.0") + "/other/ERRORS_AND_WARNINGS.md#";

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
	  var arrayify = formlyUtil.arrayify;
	
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
	      /* jshint maxstatements:31 */
	      if ($scope.options.fieldGroup) {
	        setupFieldGroup();
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
	          $scope.options.formControl.$setUntouched();
	          $scope.options.formControl.$setPristine();
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
	
	      function setupFieldGroup() {
	        $scope.options.options = $scope.options.options || {};
	        $scope.options.options.formState = $scope.formState;
	      }
	    }],
	    link: function fieldLink(scope, el) {
	      if (scope.options.fieldGroup) {
	        setFieldGroupTemplate();
	        return;
	      }
	
	      addAttributes();
	      addClasses();
	
	      var type = scope.options.type && formlyConfig.getType(scope.options.type);
	      var args = arguments;
	      var thusly = this;
	      getFieldTemplate(scope.options).then(runManipulators(formlyConfig.templateManipulators.preWrapper)).then(transcludeInWrappers(scope.options)).then(runManipulators(formlyConfig.templateManipulators.postWrapper)).then(setElementTemplate).then(watchFormControl).then(callLinkFunctions)["catch"](function (error) {
	        formlyWarn("there-was-a-problem-setting-the-template-for-this-field", "There was a problem setting the template for this field ", scope.options, error);
	      });
	
	      function setFieldGroupTemplate() {
	        checkFieldGroupApi(scope.options);
	        el.addClass("formly-field-group");
	        var extraAttributes = "";
	        if (scope.options.elementAttributes) {
	          extraAttributes = Object.keys(scope.options.elementAttributes).map(function (key) {
	            return "" + key + "=\"" + scope.options.elementAttributes[key] + "\"";
	          }).join(" ");
	        }
	        setElementTemplate("\n          <formly-form model=\"model\"\n                       fields=\"options.fieldGroup\"\n                       options=\"options.options\"\n                       form=\"options.form\"\n                       class=\"" + scope.options.className + "\"\n                       " + extraAttributes + "\n                       is-field-group>\n          </formly-form>\n        ");
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
	  return {
	    restrict: "E",
	    template: function formlyFormGetTemplate(el, attrs) {
	      /* jshint -W033 */ // this because jshint is broken I guess...
	      var rootEl = getRootEl();
	      var fieldRootEl = getFieldRootEl();
	      var formId = "formly_" + currentFormId++;
	      var parentFormAttributes = undefined;
	      if (attrs.hasOwnProperty("isFieldGroup") && el.parent().parent().hasClass("formly")) {
	        parentFormAttributes = copyAttributes(el.parent().parent()[0].attributes);
	      }
	      return "\n        <" + rootEl + " class=\"formly\"\n                 name=\"" + getFormName() + "\"\n                 role=\"form\" " + parentFormAttributes + ">\n          <" + fieldRootEl + " formly-field\n               ng-repeat=\"field in fields " + getTrackBy() + "\"\n               " + getHideDirective() + "=\"!field.hide\"\n               class=\"formly-field\"\n               options=\"field\"\n               model=\"field.model || model\"\n               fields=\"fields\"\n               form=\"" + formId + "\"\n               form-id=\"" + formId + "\"\n               form-state=\"options.formState\"\n               index=\"$index\">\n          </" + fieldRootEl + ">\n          <div ng-transclude></div>\n        </" + rootEl + ">\n      ";
	
	      function getRootEl() {
	        return attrs.rootEl || "ng-form";
	      }
	
	      function getFieldRootEl() {
	        return attrs.fieldRootEl || "div";
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
	    controller: /* @ngInject */["$scope", "formlyUtil", function FormlyFormController($scope, formlyUtil) {
	      setupOptions();
	      $scope.model = $scope.model || {};
	      $scope.fields = $scope.fields || [];
	
	      angular.forEach($scope.fields, attachKey); // attaches a key based on the index if a key isn't specified
	      angular.forEach($scope.fields, setupWatchers); // setup watchers for all fields
	
	      // watch the model and evaluate watch expressions that depend on it.
	      $scope.$watch("model", onModelOrFormStateChange, true);
	      if ($scope.options.formState) {
	        $scope.$watch("options.formState", onModelOrFormStateChange, true);
	      }
	
	      function onModelOrFormStateChange() {
	        angular.forEach($scope.fields, function runFieldExpressionProperties(field, index) {
	          /*jshint -W030 */
	          var model = field.model || $scope.model;
	          field.runExpressions && field.runExpressions(model);
	          if (field.hideExpression) {
	            // can't use hide with expressionProperties reliably
	            var val = model[field.key];
	            // this makes it closer to what a regular expressionProperty would be
	            var extraLocals = {
	              options: field,
	              index: index,
	              formState: $scope.options.formState,
	              formId: $scope.formId
	            };
	            field.hide = formlyUtil.formlyEval($scope, field.hideExpression, val, val, extraLocals);
	          }
	        });
	      }
	
	      function setupOptions() {
	        formlyApiCheck["throw"]([formlyApiCheck.formOptionsApi.optional], [$scope.options], { prefix: "formly-form options check" });
	        $scope.options = $scope.options || {};
	        $scope.options.formState = $scope.options.formState || {};
	
	        angular.extend($scope.options, {
	          updateInitialValue: updateInitialValue,
	          resetModel: resetModel
	        });
	      }
	
	      function updateInitialValue() {
	        angular.forEach($scope.fields, function (field) {
	          if (isFieldGroup(field)) {
	            field.options.updateInitialValue();
	          } else {
	            field.updateInitialValue();
	          }
	        });
	      }
	
	      function resetModel() {
	        angular.forEach($scope.fields, function (field) {
	          if (isFieldGroup(field)) {
	            field.options.resetModel();
	          } else {
	            field.resetModel();
	          }
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
	        scope.formId = formId;
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
	
	module.exports = { formlyEval: formlyEval, getFieldId: getFieldId, reverseDeepMerge: reverseDeepMerge, findByNodeName: findByNodeName, arrayify: arrayify, extendFunction: extendFunction };
	
	function formlyEval(scope, expression, $modelValue, $viewValue, extraLocals) {
	  if (angular.isFunction(expression)) {
	    return expression($viewValue, $modelValue, scope, extraLocals);
	  } else {
	    return scope.$eval(expression, angular.extend({ $viewValue: $viewValue, $modelValue: $modelValue }, extraLocals));
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
	
	function arrayify(obj) {
	  if (obj && !angular.isArray(obj)) {
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAwODUzMjM4ZTQwOGQ2MGYwZjMyNCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2Zvcm1seUFwaUNoZWNrLmpzIiwid2VicGFjazovLy8uL290aGVyL2RvY3NCYXNlVXJsLmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlVc2FiaWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2Zvcm1seUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzLmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL2Zvcm1seVV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmljZXMvZm9ybWx5V2Fybi5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1maWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1mb2N1cy5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1mb3JtLmpzIiwid2VicGFjazovLy8uL3J1bi9mb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ydW4vZm9ybWx5Q3VzdG9tVGFncy5qcyIsIndlYnBhY2s6Ly8vLi9hbmd1bGFyLWZpeC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiYXBpQ2hlY2tcIixcImFtZFwiOlwiYXBpLWNoZWNrXCIsXCJjb21tb25qczJcIjpcImFwaS1jaGVja1wiLFwiY29tbW9uanNcIjpcImFwaS1jaGVja1wifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyXCIiLCJ3ZWJwYWNrOi8vLy4vb3RoZXIvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0tDdENPLEtBQUssdUNBQU0sQ0FBZ0I7O2tCQUNuQixLQUFLLEM7Ozs7Ozs7Ozs7S0NEYixPQUFPLHVDQUFNLEVBQWE7O0tBRTFCLGNBQWMsdUNBQU0sQ0FBNEI7O0tBQ2hELCtCQUErQix1Q0FBTSxDQUFxQjs7S0FDMUQsZUFBZSx1Q0FBTSxDQUE2Qjs7S0FDbEQsWUFBWSx1Q0FBTSxDQUEwQjs7S0FDNUMsd0JBQXdCLHVDQUFNLENBQXNDOztLQUNwRSxVQUFVLHVDQUFNLENBQXVCOztLQUN2QyxVQUFVLHVDQUFNLENBQXVCOztLQUV2QyxzQkFBc0IsdUNBQU0sQ0FBdUM7O0tBQ25FLFdBQVcsdUNBQU0sRUFBMkI7O0tBQzVDLFdBQVcsdUNBQU0sRUFBMkI7O0tBQzVDLFVBQVUsdUNBQU0sRUFBMEI7O0tBRTFDLDZCQUE2Qix1Q0FBTSxFQUFxQzs7S0FDeEUsZ0JBQWdCLHVDQUFNLEVBQXdCOztBQUVyRCxLQUFNLFlBQVksR0FBRyxRQUFRLENBQUM7O2tCQUVmLFlBQVk7O0FBRTNCLEtBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUVsRCxTQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ3BELFNBQVEsQ0FBQyxRQUFRLENBQUMs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QUU7QUFDckIsT0FBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ2hDLFFBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsTUFBTSxJQUFJLENBQUMsR0FBRyxFQUFFO0FBQ2YsUUFBRyxHQUFHLEVBQUUsQ0FBQztJQUNWO0FBQ0QsVUFBTyxHQUFHLENBQUM7RUFDWjs7QUFHRCxVQUFTLGNBQWMsR0FBUztxQ0FBTCxHQUFHO0FBQUgsUUFBRzs7O0FBQzVCLFVBQU8sU0FBUyxnQkFBZ0IsR0FBRztBQUNqQyxTQUFJLElBQUksR0FBRyxTQUFTLENBQUM7QUFDckIsUUFBRyxDQUFDLE9BQU8sQ0FBQyxZQUFFO2NBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO01BQUEsQ0FBQyxDQUFDO0lBQ3pDLENBQUMiLCJmaWxlIjoiZm9ybWx5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYXBpLWNoZWNrXCIpLCByZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJhcGktY2hlY2tcIiwgXCJhbmd1bGFyXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIm5nRm9ybWx5XCJdID0gZmFjdG9yeShyZXF1aXJlKFwiYXBpLWNoZWNrXCIpLCByZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wibmdGb3JtbHlcIl0gPSBmYWN0b3J5KHJvb3RbXCJhcGlDaGVja1wiXSwgcm9vdFtcImFuZ3VsYXJcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xNl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE3X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDA4NTMyMzhlNDA4ZDYwZjBmMzI0XG4gKiovIiwiaW1wb3J0IGluZGV4IGZyb20gJy4vaW5kZXguY29tbW9uJztcbmV4cG9ydCBkZWZhdWx0IGluZGV4O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyLWZpeCc7XG5cbmltcG9ydCBmb3JtbHlBcGlDaGVjayBmcm9tICcuL3Byb3ZpZGVycy9mb3JtbHlBcGlDaGVjayc7XG5pbXBvcnQgZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeCBmcm9tICcuL290aGVyL2RvY3NCYXNlVXJsJztcbmltcG9ydCBmb3JtbHlVc2FiaWxpdHkgZnJvbSAnLi9wcm92aWRlcnMvZm9ybWx5VXNhYmlsaXR5JztcbmltcG9ydCBmb3JtbHlDb25maWcgZnJvbSAnLi9wcm92aWRlcnMvZm9ybWx5Q29uZmlnJztcbmltcG9ydCBmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMgZnJvbSAnLi9wcm92aWRlcnMvZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzJztcbmltcG9ydCBmb3JtbHlVdGlsIGZyb20gJy4vc2VydmljZXMvZm9ybWx5VXRpbCc7XG5pbXBvcnQgZm9ybWx5V2FybiBmcm9tICcuL3NlcnZpY2VzL2Zvcm1seVdhcm4nO1xuXG5pbXBvcnQgZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbiBmcm9tICcuL2RpcmVjdGl2ZXMvZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uJztcbmltcG9ydCBmb3JtbHlGaWVsZCBmcm9tICcuL2RpcmVjdGl2ZXMvZm9ybWx5LWZpZWxkJztcbmltcG9ydCBmb3JtbHlGb2N1cyBmcm9tICcuL2RpcmVjdGl2ZXMvZm9ybWx5LWZvY3VzJztcbmltcG9ydCBmb3JtbHlGb3JtIGZyb20gJy4vZGlyZWN0aXZlcy9mb3JtbHktZm9ybSc7XG5cbmltcG9ydCBmb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvciBmcm9tICcuL3J1bi9mb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvcic7XG5pbXBvcnQgZm9ybWx5Q3VzdG9tVGFncyBmcm9tICcuL3J1bi9mb3JtbHlDdXN0b21UYWdzJztcblxuY29uc3QgbmdNb2R1bGVOYW1lID0gJ2Zvcm1seSc7XG5cbmV4cG9ydCBkZWZhdWx0IG5nTW9kdWxlTmFtZTtcblxuY29uc3QgbmdNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZShuZ01vZHVsZU5hbWUsIFtdKTtcblxubmdNb2R1bGUuY29uc3RhbnQoJ2Zvcm1seUFwaUNoZWNrJywgZm9ybWx5QXBpQ2hlY2spO1xubmdNb2R1bGUuY29uc3RhbnQoJ2Zvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXgnLCBmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4KTtcbm5nTW9kdWxlLmNvbnN0YW50KCdmb3JtbHlWZXJzaW9uJywgVkVSU0lPTik7IC8vIDwtLSB3ZWJwYWNrIHZhcmlhYmxlXG5cbm5nTW9kdWxlLnByb3ZpZGVyKCdmb3JtbHlVc2FiaWxpdHknLCBmb3JtbHlVc2FiaWxpdHkpO1xubmdNb2R1bGUucHJvdmlkZXIoJ2Zvcm1seUNvbmZpZycsIGZvcm1seUNvbmZpZyk7XG5cbm5nTW9kdWxlLmZhY3RvcnkoJ2Zvcm1seVZhbGlkYXRpb25NZXNzYWdlcycsIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcyk7XG5uZ01vZHVsZS5mYWN0b3J5KCdmb3JtbHlVdGlsJywgZm9ybWx5VXRpbCk7XG5uZ01vZHVsZS5mYWN0b3J5KCdmb3JtbHlXYXJuJywgZm9ybWx5V2Fybik7XG5cbm5nTW9kdWxlLmRpcmVjdGl2ZSgnZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbicsIGZvcm1seUN1c3RvbVZhbGlkYXRpb24pO1xubmdNb2R1bGUuZGlyZWN0aXZlKCdmb3JtbHlGaWVsZCcsIGZvcm1seUZpZWxkKTtcbm5nTW9kdWxlLmRpcmVjdGl2ZSgnZm9ybWx5Rm9jdXMnLCBmb3JtbHlGb2N1cyk7XG5uZ01vZHVsZS5kaXJlY3RpdmUoJ2Zvcm1seUZvcm0nLCBmb3JtbHlGb3JtKTtcblxubmdNb2R1bGUucnVuKGZvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKTtcbm5nTW9kdWxlLnJ1bihmb3JtbHlDdXN0b21UYWdzKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2luZGV4LmNvbW1vbi5qc1xuICoqLyIsImltcG9ydCBhcGlDaGVja0ZhY3RvcnkgZnJvbSAnYXBpLWNoZWNrJztcblxubGV0IGFwaUNoZWNrID0gYXBpQ2hlY2tGYWN0b3J5KHtcbiAgb3V0cHV0OiB7XG4gICAgcHJlZml4OiAnYW5ndWxhci1mb3JtbHk6JyxcbiAgICBkb2NzQmFzZVVybDogcmVxdWlyZSgnLi4vb3RoZXIvZG9jc0Jhc2VVcmwnKVxuICB9XG59KTtcblxuZnVuY3Rpb24gc2hhcGVSZXF1aXJlZElmTm90KG90aGVyUHJvcHMsIHByb3BDaGVja2VyKSB7XG4gIGlmICghYW5ndWxhci5pc0FycmF5KG90aGVyUHJvcHMpKSB7XG4gICAgb3RoZXJQcm9wcyA9IFtvdGhlclByb3BzXTtcbiAgfVxuICBjb25zdCB0eXBlID0gYHNwZWNpZmllZCBpZiB0aGVzZSBhcmUgbm90IHNwZWNpZmllZDogXFxgJHtvdGhlclByb3BzLmpvaW4oJywgJyl9XFxgIChvdGhlcndpc2UgaXQncyBvcHRpb25hbClgO1xuICBmdW5jdGlvbiBzaGFwZVJlcXVpcmVkSWZOb3REZWZpbml0aW9uKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgdmFyIHByb3BFeGlzdHMgPSBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KHByb3BOYW1lKTtcbiAgICB2YXIgb3RoZXJQcm9wc0V4aXN0ID0gb3RoZXJQcm9wcy5zb21lKGZ1bmN0aW9uIChvdGhlclByb3ApIHtcbiAgICAgIHJldHVybiBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KG90aGVyUHJvcCk7XG4gICAgfSk7XG4gICAgaWYgKCFvdGhlclByb3BzRXhpc3QgJiYgIXByb3BFeGlzdHMpIHtcbiAgICAgIHJldHVybiBhcGlDaGVjay51dGlscy5nZXRFcnJvcihwcm9wTmFtZSwgbG9jYXRpb24sIHR5cGUpO1xuICAgIH0gZWxzZSBpZiAocHJvcEV4aXN0cykge1xuICAgICAgcmV0dXJuIHByb3BDaGVja2VyKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKTtcbiAgICB9XG4gIH1cbiAgc2hhcGVSZXF1aXJlZElmTm90RGVmaW5pdGlvbi50eXBlID0gdHlwZTtcbiAgcmV0dXJuIGFwaUNoZWNrLnV0aWxzLmNoZWNrZXJIZWxwZXJzLnNldHVwQ2hlY2tlcihzaGFwZVJlcXVpcmVkSWZOb3REZWZpbml0aW9uKTtcbn1cblxubGV0IGZvcm1seUV4cHJlc3Npb24gPSBhcGlDaGVjay5vbmVPZlR5cGUoW2FwaUNoZWNrLnN0cmluZywgYXBpQ2hlY2suZnVuY10pO1xubGV0IHNwZWNpZnlXcmFwcGVyVHlwZSA9IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gIGFwaUNoZWNrLm9uZU9mKFtudWxsXSksIGFwaUNoZWNrLnR5cGVPckFycmF5T2YoYXBpQ2hlY2suc3RyaW5nKVxuXSk7XG5cbmNvbnN0IGFwaUNoZWNrUHJvcGVydHkgPSBhcGlDaGVjay5vYmplY3RPZihhcGlDaGVjay5mdW5jKTtcblxuY29uc3QgYXBpQ2hlY2tJbnN0YW5jZVByb3BlcnR5ID0gYXBpQ2hlY2suc2hhcGUub25seUlmKCdhcGlDaGVjaycsIGFwaUNoZWNrLmZ1bmMud2l0aFByb3BlcnRpZXMoe1xuICB3YXJuOiBhcGlDaGVjay5mdW5jLFxuICB0aHJvdzogYXBpQ2hlY2suZnVuYyxcbiAgc2hhcGU6IGFwaUNoZWNrLmZ1bmNcbn0pKTtcblxuY29uc3QgYXBpQ2hlY2tGdW5jdGlvblByb3BlcnR5ID0gYXBpQ2hlY2suc2hhcGUub25seUlmKCdhcGlDaGVjaycsIGFwaUNoZWNrLm9uZU9mKFsndGhyb3cnLCAnd2FybiddKSk7XG5cbmNvbnN0IGZvcm1seVdyYXBwZXJUeXBlID0gYXBpQ2hlY2suc2hhcGUoe1xuICBuYW1lOiBzaGFwZVJlcXVpcmVkSWZOb3QoJ3R5cGVzJywgYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgdGVtcGxhdGU6IGFwaUNoZWNrLnNoYXBlLmlmTm90KCd0ZW1wbGF0ZVVybCcsIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gIHRlbXBsYXRlVXJsOiBhcGlDaGVjay5zaGFwZS5pZk5vdCgndGVtcGxhdGUnLCBhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICB0eXBlczogYXBpQ2hlY2sudHlwZU9yQXJyYXlPZihhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICBvdmVyd3JpdGVPazogYXBpQ2hlY2suYm9vbC5vcHRpb25hbCxcbiAgdmFsaWRhdGVPcHRpb25zOiBhcGlDaGVjay5mdW5jLm9wdGlvbmFsLFxuICBhcGlDaGVjazogYXBpQ2hlY2tQcm9wZXJ0eS5vcHRpb25hbCxcbiAgYXBpQ2hlY2tJbnN0YW5jZTogYXBpQ2hlY2tJbnN0YW5jZVByb3BlcnR5Lm9wdGlvbmFsLFxuICBhcGlDaGVja0Z1bmN0aW9uOiBhcGlDaGVja0Z1bmN0aW9uUHJvcGVydHkub3B0aW9uYWwsXG4gIGFwaUNoZWNrT3B0aW9uczogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsXG59KS5zdHJpY3Q7XG5cbmNvbnN0IGV4cHJlc3Npb25Qcm9wZXJ0aWVzID0gYXBpQ2hlY2sub2JqZWN0T2YoYXBpQ2hlY2sub25lT2ZUeXBlKFtcbiAgZm9ybWx5RXhwcmVzc2lvbixcbiAgYXBpQ2hlY2suc2hhcGUoe1xuICAgIGV4cHJlc3Npb246IGZvcm1seUV4cHJlc3Npb24sXG4gICAgbWVzc2FnZTogZm9ybWx5RXhwcmVzc2lvbi5vcHRpb25hbFxuICB9KS5zdHJpY3Rcbl0pKTtcblxubGV0IGZpZWxkT3B0aW9uc0FwaVNoYXBlID0ge1xuICAkJGhhc2hLZXk6IGFwaUNoZWNrLmFueS5vcHRpb25hbCxcbiAgdHlwZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoWyd0ZW1wbGF0ZScsICd0ZW1wbGF0ZVVybCddLCBhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICB0ZW1wbGF0ZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoXG4gICAgWyd0eXBlJywgJ3RlbXBsYXRlVXJsJ10sXG4gICAgYXBpQ2hlY2sub25lT2ZUeXBlKFthcGlDaGVjay5zdHJpbmcsIGFwaUNoZWNrLmZ1bmNdKVxuICApLm9wdGlvbmFsLFxuICB0ZW1wbGF0ZVVybDogYXBpQ2hlY2suc2hhcGUuaWZOb3QoXG4gICAgWyd0eXBlJywgJ3RlbXBsYXRlJ10sXG4gICAgYXBpQ2hlY2sub25lT2ZUeXBlKFthcGlDaGVjay5zdHJpbmcsIGFwaUNoZWNrLmZ1bmNdKVxuICApLm9wdGlvbmFsLFxuICBrZXk6IGFwaUNoZWNrLm9uZU9mVHlwZShbYXBpQ2hlY2suc3RyaW5nLCBhcGlDaGVjay5udW1iZXJdKS5vcHRpb25hbCxcbiAgbW9kZWw6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbCxcbiAgY2xhc3NOYW1lOiBhcGlDaGVjay5zdHJpbmcub3B0aW9uYWwsXG4gIGV4cHJlc3Npb25Qcm9wZXJ0aWVzOiBleHByZXNzaW9uUHJvcGVydGllcy5vcHRpb25hbCxcbiAgZGF0YTogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICB0ZW1wbGF0ZU9wdGlvbnM6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbCxcbiAgd3JhcHBlcjogc3BlY2lmeVdyYXBwZXJUeXBlLm9wdGlvbmFsLFxuICBtb2RlbE9wdGlvbnM6IGFwaUNoZWNrLnNoYXBlKHtcbiAgICB1cGRhdGVPbjogYXBpQ2hlY2suc3RyaW5nLm9wdGlvbmFsLFxuICAgIGRlYm91bmNlOiBhcGlDaGVjay5vbmVPZlR5cGUoW1xuICAgICAgYXBpQ2hlY2sub2JqZWN0LCBhcGlDaGVjay5zdHJpbmdcbiAgICBdKS5vcHRpb25hbCxcbiAgICBhbGxvd0ludmFsaWQ6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWwsXG4gICAgZ2V0dGVyU2V0dGVyOiBhcGlDaGVjay5ib29sLm9wdGlvbmFsLFxuICAgIHRpbWV6b25lOiBhcGlDaGVjay5zdHJpbmcub3B0aW9uYWxcbiAgfSkub3B0aW9uYWwsXG4gIHdhdGNoZXI6IGFwaUNoZWNrLnR5cGVPckFycmF5T2YoXG4gICAgYXBpQ2hlY2suc2hhcGUoe1xuICAgICAgZXhwcmVzc2lvbjogZm9ybWx5RXhwcmVzc2lvbi5vcHRpb25hbCxcbiAgICAgIGxpc3RlbmVyOiBmb3JtbHlFeHByZXNzaW9uXG4gICAgfSlcbiAgKS5vcHRpb25hbCxcbiAgdmFsaWRhdG9yczogYXBpQ2hlY2sub2JqZWN0T2YoYXBpQ2hlY2sub25lT2ZUeXBlKFtcbiAgICBmb3JtbHlFeHByZXNzaW9uLCBhcGlDaGVjay5zaGFwZSh7XG4gICAgICBleHByZXNzaW9uOiBmb3JtbHlFeHByZXNzaW9uLFxuICAgICAgbWVzc2FnZTogZm9ybWx5RXhwcmVzc2lvbi5vcHRpb25hbFxuICAgIH0pLnN0cmljdFxuICBdKSkub3B0aW9uYWwsXG4gIG5vRm9ybUNvbnRyb2w6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWwsXG4gIGhpZGU6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWwsXG4gIGhpZGVFeHByZXNzaW9uOiBmb3JtbHlFeHByZXNzaW9uLm9wdGlvbmFsLFxuICBuZ01vZGVsQXR0cnM6IGFwaUNoZWNrLm9iamVjdE9mKGFwaUNoZWNrLnNoYXBlKHtcbiAgICBleHByZXNzaW9uOiBhcGlDaGVjay5zaGFwZS5pZk5vdChbJ3ZhbHVlJywgJ2F0dHJpYnV0ZScsICdib3VuZCddLCBhcGlDaGVjay5hbnkpLm9wdGlvbmFsLFxuICAgIHZhbHVlOiBhcGlDaGVjay5zaGFwZS5pZk5vdCgnZXhwcmVzc2lvbicsIGFwaUNoZWNrLmFueSkub3B0aW9uYWwsXG4gICAgYXR0cmlidXRlOiBhcGlDaGVjay5zaGFwZS5pZk5vdCgnZXhwcmVzc2lvbicsIGFwaUNoZWNrLmFueSkub3B0aW9uYWwsXG4gICAgYm91bmQ6IGFwaUNoZWNrLnNoYXBlLmlmTm90KCdleHByZXNzaW9uJywgYXBpQ2hlY2suYW55KS5vcHRpb25hbFxuICB9KS5zdHJpY3QpLm9wdGlvbmFsLFxuICBlbGVtZW50QXR0cmlidXRlczogYXBpQ2hlY2sub2JqZWN0T2YoYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgb3B0aW9uc1R5cGVzOiBhcGlDaGVjay50eXBlT3JBcnJheU9mKGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gIGxpbms6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gIGNvbnRyb2xsZXI6IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gICAgYXBpQ2hlY2suc3RyaW5nLCBhcGlDaGVjay5mdW5jLCBhcGlDaGVjay5hcnJheVxuICBdKS5vcHRpb25hbCxcbiAgdmFsaWRhdGlvbjogYXBpQ2hlY2suc2hhcGUoe1xuICAgIHNob3c6IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gICAgICBhcGlDaGVjay5ib29sLCBhcGlDaGVjay5vbmVPZihbbnVsbF0pXG4gICAgXSkub3B0aW9uYWwsXG4gICAgbWVzc2FnZXM6IGFwaUNoZWNrLm9iamVjdE9mKGZvcm1seUV4cHJlc3Npb24pLm9wdGlvbmFsLFxuICAgIGVycm9yRXhpc3RzQW5kU2hvdWxkQmVWaXNpYmxlOiBhcGlDaGVjay5ib29sLm9wdGlvbmFsXG4gIH0pLm9wdGlvbmFsLFxuICBmb3JtQ29udHJvbDogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICB2YWx1ZTogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgcnVuRXhwcmVzc2lvbnM6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gIHJlc2V0TW9kZWw6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gIHVwZGF0ZUluaXRpYWxWYWx1ZTogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgaW5pdGlhbFZhbHVlOiBhcGlDaGVjay5hbnkub3B0aW9uYWwsXG4gIGRlZmF1bHRWYWx1ZTogYXBpQ2hlY2suYW55Lm9wdGlvbmFsXG59O1xuXG5cbmxldCBmb3JtbHlGaWVsZE9wdGlvbnMgPSBhcGlDaGVjay5zaGFwZShmaWVsZE9wdGlvbnNBcGlTaGFwZSkuc3RyaWN0O1xuXG5cbmNvbnN0IGZvcm1PcHRpb25zQXBpID0gYXBpQ2hlY2suc2hhcGUoe1xuICBmb3JtU3RhdGU6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbCxcbiAgcmVzZXRNb2RlbDogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgdXBkYXRlSW5pdGlhbFZhbHVlOiBhcGlDaGVjay5mdW5jLm9wdGlvbmFsLFxuICByZW1vdmVDaHJvbWVBdXRvQ29tcGxldGU6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWxcbn0pLnN0cmljdDtcblxuXG5jb25zdCBmaWVsZEdyb3VwID0gYXBpQ2hlY2suc2hhcGUoe1xuICAkJGhhc2hLZXk6IGFwaUNoZWNrLmFueS5vcHRpb25hbCxcbiAgZmllbGRHcm91cDogYXBpQ2hlY2suYXJyYXlPZihmb3JtbHlGaWVsZE9wdGlvbnMpLFxuICBjbGFzc05hbWU6IGFwaUNoZWNrLnN0cmluZy5vcHRpb25hbCxcbiAgb3B0aW9uczogZm9ybU9wdGlvbnNBcGkub3B0aW9uYWwsXG4gIGhpZGU6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWwsXG4gIGhpZGVFeHByZXNzaW9uOiBmb3JtbHlFeHByZXNzaW9uLm9wdGlvbmFsLFxuICBtb2RlbDogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICBmb3JtOiBhcGlDaGVjay5vYmplY3Qub3B0aW9uYWwsXG4gIGVsZW1lbnRBdHRyaWJ1dGVzOiBhcGlDaGVjay5vYmplY3RPZihhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsXG59KS5zdHJpY3Q7XG5cbmxldCB0eXBlT3B0aW9uc0RlZmF1bHRPcHRpb25zID0gYW5ndWxhci5jb3B5KGZpZWxkT3B0aW9uc0FwaVNoYXBlKTtcbnR5cGVPcHRpb25zRGVmYXVsdE9wdGlvbnMua2V5ID0gYXBpQ2hlY2suc3RyaW5nLm9wdGlvbmFsO1xuXG5sZXQgZm9ybWx5VHlwZU9wdGlvbnMgPSBhcGlDaGVjay5zaGFwZSh7XG4gIG5hbWU6IGFwaUNoZWNrLnN0cmluZyxcbiAgdGVtcGxhdGU6IGFwaUNoZWNrLnNoYXBlLmlmTm90KCd0ZW1wbGF0ZVVybCcsIGFwaUNoZWNrLm9uZU9mVHlwZShbYXBpQ2hlY2suc3RyaW5nLCBhcGlDaGVjay5mdW5jXSkpLm9wdGlvbmFsLFxuICB0ZW1wbGF0ZVVybDogYXBpQ2hlY2suc2hhcGUuaWZOb3QoJ3RlbXBsYXRlJywgYXBpQ2hlY2sub25lT2ZUeXBlKFthcGlDaGVjay5zdHJpbmcsIGFwaUNoZWNrLmZ1bmNdKSkub3B0aW9uYWwsXG4gIGNvbnRyb2xsZXI6IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gICAgYXBpQ2hlY2suZnVuYywgYXBpQ2hlY2suc3RyaW5nLCBhcGlDaGVjay5hcnJheVxuICBdKS5vcHRpb25hbCxcbiAgbGluazogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgZGVmYXVsdE9wdGlvbnM6IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gICAgYXBpQ2hlY2suZnVuYywgYXBpQ2hlY2suc2hhcGUodHlwZU9wdGlvbnNEZWZhdWx0T3B0aW9ucylcbiAgXSkub3B0aW9uYWwsXG4gIGV4dGVuZHM6IGFwaUNoZWNrLnN0cmluZy5vcHRpb25hbCxcbiAgd3JhcHBlcjogc3BlY2lmeVdyYXBwZXJUeXBlLm9wdGlvbmFsLFxuICBkYXRhOiBhcGlDaGVjay5vYmplY3Qub3B0aW9uYWwsXG4gIHZhbGlkYXRlT3B0aW9uczogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgYXBpQ2hlY2s6IGFwaUNoZWNrUHJvcGVydHkub3B0aW9uYWwsXG4gIGFwaUNoZWNrSW5zdGFuY2U6IGFwaUNoZWNrSW5zdGFuY2VQcm9wZXJ0eS5vcHRpb25hbCxcbiAgYXBpQ2hlY2tGdW5jdGlvbjogYXBpQ2hlY2tGdW5jdGlvblByb3BlcnR5Lm9wdGlvbmFsLFxuICBhcGlDaGVja09wdGlvbnM6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbCxcbiAgb3ZlcndyaXRlT2s6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWxcbn0pLnN0cmljdDtcbmFuZ3VsYXIuZXh0ZW5kKGFwaUNoZWNrLCB7XG4gIGZvcm1seVR5cGVPcHRpb25zLCBmb3JtbHlGaWVsZE9wdGlvbnMsIGZvcm1seUV4cHJlc3Npb24sIGZvcm1seVdyYXBwZXJUeXBlLCBmaWVsZEdyb3VwLCBmb3JtT3B0aW9uc0FwaVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGFwaUNoZWNrO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcHJvdmlkZXJzL2Zvcm1seUFwaUNoZWNrLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgYGh0dHBzOi8vZ2l0aHViLmNvbS9mb3JtbHktanMvYW5ndWxhci1mb3JtbHkvYmxvYi8ke1ZFUlNJT059L290aGVyL0VSUk9SU19BTkRfV0FSTklOR1MubWQjYDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL290aGVyL2RvY3NCYXNlVXJsLmpzXG4gKiovIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhci1maXgnO1xuXG5leHBvcnQgZGVmYXVsdCBmb3JtbHlVc2FiaWxpdHk7XG5cbi8vIEBuZ0luamVjdFxuZnVuY3Rpb24gZm9ybWx5VXNhYmlsaXR5KGZvcm1seUFwaUNoZWNrLCBmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4KSB7XG4gIGFuZ3VsYXIuZXh0ZW5kKHRoaXMsIHtcbiAgICBnZXRGb3JtbHlFcnJvcjogZ2V0Rm9ybWx5RXJyb3IsXG4gICAgZ2V0RmllbGRFcnJvcjogZ2V0RmllbGRFcnJvcixcbiAgICBjaGVja1dyYXBwZXI6IGNoZWNrV3JhcHBlcixcbiAgICBjaGVja1dyYXBwZXJUZW1wbGF0ZTogY2hlY2tXcmFwcGVyVGVtcGxhdGUsXG4gICAgJGdldDogKCkgPT4gdGhpc1xuICB9KTtcblxuICBmdW5jdGlvbiBnZXRGaWVsZEVycm9yKGVycm9ySW5mb1NsdWcsIG1lc3NhZ2UsIGZpZWxkKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XG4gICAgICBmaWVsZCA9IG1lc3NhZ2U7XG4gICAgICBtZXNzYWdlID0gZXJyb3JJbmZvU2x1ZztcbiAgICAgIGVycm9ySW5mb1NsdWcgPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEVycm9yKGdldEVycm9yTWVzc2FnZShlcnJvckluZm9TbHVnLCBtZXNzYWdlKSArIGAgRmllbGQgZGVmaW5pdGlvbjogJHthbmd1bGFyLnRvSnNvbihmaWVsZCl9YCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRGb3JtbHlFcnJvcihlcnJvckluZm9TbHVnLCBtZXNzYWdlKSB7XG4gICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICBtZXNzYWdlID0gZXJyb3JJbmZvU2x1ZztcbiAgICAgIGVycm9ySW5mb1NsdWcgPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEVycm9yKGdldEVycm9yTWVzc2FnZShlcnJvckluZm9TbHVnLCBtZXNzYWdlKSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRFcnJvck1lc3NhZ2UoZXJyb3JJbmZvU2x1ZywgbWVzc2FnZSkge1xuICAgIGxldCB1cmwgPSAnJztcbiAgICBpZiAoZXJyb3JJbmZvU2x1ZyAhPT0gbnVsbCkge1xuICAgICAgdXJsID0gYCR7Zm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeH0ke2Vycm9ySW5mb1NsdWd9YDtcbiAgICB9XG4gICAgcmV0dXJuIGBGb3JtbHkgRXJyb3I6ICR7bWVzc2FnZX0uICR7dXJsfWA7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1dyYXBwZXIod3JhcHBlcikge1xuICAgIGZvcm1seUFwaUNoZWNrLnRocm93KGZvcm1seUFwaUNoZWNrLmZvcm1seVdyYXBwZXJUeXBlLCB3cmFwcGVyLCB7XG4gICAgICBwcmVmaXg6ICdmb3JtbHlDb25maWcuc2V0V3JhcHBlcicsXG4gICAgICB1cmxTdWZmaXg6ICdzZXR3cmFwcGVyLXZhbGlkYXRpb24tZmFpbGVkJ1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tXcmFwcGVyVGVtcGxhdGUodGVtcGxhdGUsIGFkZGl0aW9uYWxJbmZvKSB7XG4gICAgdmFyIGZvcm1seVRyYW5zY2x1ZGUgPSAnPGZvcm1seS10cmFuc2NsdWRlPjwvZm9ybWx5LXRyYW5zY2x1ZGU+JztcbiAgICBpZiAodGVtcGxhdGUuaW5kZXhPZihmb3JtbHlUcmFuc2NsdWRlKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IGdldEZvcm1seUVycm9yKFxuICAgICAgICBgVGVtcGxhdGUgd3JhcHBlciB0ZW1wbGF0ZXMgbXVzdCB1c2UgXCIke2Zvcm1seVRyYW5zY2x1ZGV9XCIgc29tZXdoZXJlIGluIHRoZW0uIGAgK1xuICAgICAgICBgVGhpcyBvbmUgZG9lcyBub3QgaGF2ZSBcIjxmb3JtbHktdHJhbnNjbHVkZT48L2Zvcm1seS10cmFuc2NsdWRlPlwiIGluIGl0OiAke3RlbXBsYXRlfWAgKyAnXFxuJyArXG4gICAgICAgIGBBZGRpdGlvbmFsIGluZm9ybWF0aW9uOiAke0pTT04uc3RyaW5naWZ5KGFkZGl0aW9uYWxJbmZvKX1gXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcHJvdmlkZXJzL2Zvcm1seVVzYWJpbGl0eS5qc1xuICoqLyIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXItZml4JztcbmltcG9ydCB1dGlscyBmcm9tICcuLi9vdGhlci91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1seUNvbmZpZztcblxuLy8gQG5nSW5qZWN0XG5mdW5jdGlvbiBmb3JtbHlDb25maWcoZm9ybWx5VXNhYmlsaXR5UHJvdmlkZXIsIGZvcm1seUFwaUNoZWNrKSB7XG5cbiAgdmFyIHR5cGVNYXAgPSB7fTtcbiAgdmFyIHRlbXBsYXRlV3JhcHBlcnNNYXAgPSB7fTtcbiAgdmFyIGRlZmF1bHRXcmFwcGVyTmFtZSA9ICdkZWZhdWx0JztcbiAgdmFyIF90aGlzID0gdGhpcztcbiAgdmFyIGdldEVycm9yID0gZm9ybWx5VXNhYmlsaXR5UHJvdmlkZXIuZ2V0Rm9ybWx5RXJyb3I7XG5cbiAgYW5ndWxhci5leHRlbmQodGhpcywge1xuICAgIHNldFR5cGUsXG4gICAgZ2V0VHlwZSxcbiAgICBzZXRXcmFwcGVyLFxuICAgIGdldFdyYXBwZXIsXG4gICAgZ2V0V3JhcHBlckJ5VHlwZSxcbiAgICByZW1vdmVXcmFwcGVyQnlOYW1lLFxuICAgIHJlbW92ZVdyYXBwZXJzRm9yVHlwZSxcbiAgICBkaXNhYmxlV2FybmluZ3M6IGZhbHNlLFxuICAgIGV4dHJhczoge1xuICAgICAgZGlzYWJsZU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yOiBmYWxzZSxcbiAgICAgIG5nTW9kZWxBdHRyc01hbmlwdWxhdG9yUHJlZmVyVW5ib3VuZDogZmFsc2UsXG4gICAgICByZW1vdmVDaHJvbWVBdXRvQ29tcGxldGU6IGZhbHNlLFxuICAgICAgZGVmYXVsdEhpZGVEaXJlY3RpdmU6ICduZy1pZidcbiAgICB9LFxuICAgIHRlbXBsYXRlTWFuaXB1bGF0b3JzOiB7XG4gICAgICBwcmVXcmFwcGVyOiBbXSxcbiAgICAgIHBvc3RXcmFwcGVyOiBbXVxuICAgIH0sXG4gICAgJGdldDogKCkgPT4gdGhpc1xuICB9KTtcblxuICBmdW5jdGlvbiBzZXRUeXBlKG9wdGlvbnMpIHtcbiAgICBpZiAoYW5ndWxhci5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICBhbmd1bGFyLmZvckVhY2gob3B0aW9ucywgc2V0VHlwZSk7XG4gICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgICBjaGVja1R5cGUob3B0aW9ucyk7XG4gICAgICBpZiAob3B0aW9ucy5leHRlbmRzKSB7XG4gICAgICAgIGV4dGVuZFR5cGVPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgdHlwZU1hcFtvcHRpb25zLm5hbWVdID0gb3B0aW9ucztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZ2V0RXJyb3IoYFlvdSBtdXN0IHByb3ZpZGUgYW4gb2JqZWN0IG9yIGFycmF5IGZvciBzZXRUeXBlLiBZb3UgcHJvdmlkZWQ6ICR7SlNPTi5zdHJpbmdpZnkoYXJndW1lbnRzKX1gKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1R5cGUob3B0aW9ucykge1xuICAgIGZvcm1seUFwaUNoZWNrLnRocm93KGZvcm1seUFwaUNoZWNrLmZvcm1seVR5cGVPcHRpb25zLCBvcHRpb25zLCB7XG4gICAgICBwcmVmaXg6ICdmb3JtbHlDb25maWcuc2V0VHlwZScsXG4gICAgICB1cmw6ICdzZXR0eXBlLXZhbGlkYXRpb24tZmFpbGVkJ1xuICAgIH0pO1xuICAgIGlmICghb3B0aW9ucy5vdmVyd3JpdGVPaykge1xuICAgICAgY2hlY2tPdmVyd3JpdGUob3B0aW9ucy5uYW1lLCB0eXBlTWFwLCBvcHRpb25zLCAndHlwZXMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucy5vdmVyd3JpdGVPayA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBleHRlbmRUeXBlT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgY29uc3QgZXh0ZW5kc1R5cGUgPSBnZXRUeXBlKG9wdGlvbnMuZXh0ZW5kcywgdHJ1ZSwgb3B0aW9ucyk7XG4gICAgZXh0ZW5kVHlwZUNvbnRyb2xsZXJGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSk7XG4gICAgZXh0ZW5kVHlwZUxpbmtGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSk7XG4gICAgZXh0ZW5kVHlwZVZhbGlkYXRlT3B0aW9uc0Z1bmN0aW9uKG9wdGlvbnMsIGV4dGVuZHNUeXBlKTtcbiAgICBleHRlbmRUeXBlRGVmYXVsdE9wdGlvbnMob3B0aW9ucywgZXh0ZW5kc1R5cGUpO1xuICAgIHV0aWxzLnJldmVyc2VEZWVwTWVyZ2Uob3B0aW9ucywgZXh0ZW5kc1R5cGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gZXh0ZW5kVHlwZUNvbnRyb2xsZXJGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSkge1xuICAgIGNvbnN0IGV4dGVuZHNDdHJsID0gZXh0ZW5kc1R5cGUuY29udHJvbGxlcjtcbiAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGV4dGVuZHNDdHJsKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBvcHRpb25zQ3RybCA9IG9wdGlvbnMuY29udHJvbGxlcjtcbiAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0aW9uc0N0cmwpKSB7XG4gICAgICBvcHRpb25zLmNvbnRyb2xsZXIgPSBmdW5jdGlvbiAoJHNjb3BlLCAkY29udHJvbGxlcikge1xuICAgICAgICAkY29udHJvbGxlcihleHRlbmRzQ3RybCwgeyRzY29wZX0pO1xuICAgICAgICAkY29udHJvbGxlcihvcHRpb25zQ3RybCwgeyRzY29wZX0pO1xuICAgICAgfTtcbiAgICAgIG9wdGlvbnMuY29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGNvbnRyb2xsZXInXTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucy5jb250cm9sbGVyID0gZXh0ZW5kc0N0cmw7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZXh0ZW5kVHlwZUxpbmtGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSkge1xuICAgIGNvbnN0IGV4dGVuZHNGbiA9IGV4dGVuZHNUeXBlLmxpbms7XG4gICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChleHRlbmRzRm4pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG9wdGlvbnNGbiA9IG9wdGlvbnMubGluaztcbiAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0aW9uc0ZuKSkge1xuICAgICAgb3B0aW9ucy5saW5rID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBleHRlbmRzRm4oLi4uYXJndW1lbnRzKTtcbiAgICAgICAgb3B0aW9uc0ZuKC4uLmFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb25zLmxpbmsgPSBleHRlbmRzRm47XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZXh0ZW5kVHlwZVZhbGlkYXRlT3B0aW9uc0Z1bmN0aW9uKG9wdGlvbnMsIGV4dGVuZHNUeXBlKSB7XG4gICAgY29uc3QgZXh0ZW5kc0ZuID0gZXh0ZW5kc1R5cGUudmFsaWRhdGVPcHRpb25zO1xuICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoZXh0ZW5kc0ZuKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBvcHRpb25zRm4gPSBvcHRpb25zLnZhbGlkYXRlT3B0aW9ucztcbiAgICBjb25zdCBvcmlnaW5hbERlZmF1bHRPcHRpb25zID0gb3B0aW9ucy5kZWZhdWx0T3B0aW9ucztcbiAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0aW9uc0ZuKSkge1xuICAgICAgb3B0aW9ucy52YWxpZGF0ZU9wdGlvbnMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBvcHRpb25zRm4ob3B0aW9ucyk7XG4gICAgICAgIGxldCBtZXJnZWRPcHRpb25zID0gYW5ndWxhci5jb3B5KG9wdGlvbnMpO1xuICAgICAgICBsZXQgZGVmYXVsdE9wdGlvbnMgPSBvcmlnaW5hbERlZmF1bHRPcHRpb25zO1xuICAgICAgICBpZiAoZGVmYXVsdE9wdGlvbnMpIHtcbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKGRlZmF1bHRPcHRpb25zKSkge1xuICAgICAgICAgICAgZGVmYXVsdE9wdGlvbnMgPSBkZWZhdWx0T3B0aW9ucyhtZXJnZWRPcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdXRpbHMucmV2ZXJzZURlZXBNZXJnZShtZXJnZWRPcHRpb25zLCBkZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgZXh0ZW5kc0ZuKG1lcmdlZE9wdGlvbnMpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucy52YWxpZGF0ZU9wdGlvbnMgPSBleHRlbmRzRm47XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZXh0ZW5kVHlwZURlZmF1bHRPcHRpb25zKG9wdGlvbnMsIGV4dGVuZHNUeXBlKSB7XG4gICAgY29uc3QgZXh0ZW5kc0RPID0gZXh0ZW5kc1R5cGUuZGVmYXVsdE9wdGlvbnM7XG4gICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChleHRlbmRzRE8pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG9wdGlvbnNETyA9IG9wdGlvbnMuZGVmYXVsdE9wdGlvbnM7XG4gICAgY29uc3Qgb3B0aW9uc0RPSXNGbiA9IGFuZ3VsYXIuaXNGdW5jdGlvbihvcHRpb25zRE8pO1xuICAgIGNvbnN0IGV4dGVuZHNET0lzRm4gPSBhbmd1bGFyLmlzRnVuY3Rpb24oZXh0ZW5kc0RPKTtcbiAgICBpZiAoZXh0ZW5kc0RPSXNGbikge1xuICAgICAgb3B0aW9ucy5kZWZhdWx0T3B0aW9ucyA9IGZ1bmN0aW9uIGRlZmF1bHRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZXh0ZW5kc0RlZmF1bHRPcHRpb25zID0gZXh0ZW5kc0RPKG9wdGlvbnMpO1xuICAgICAgICBjb25zdCBtZXJnZWREZWZhdWx0T3B0aW9ucyA9IHt9O1xuICAgICAgICB1dGlscy5yZXZlcnNlRGVlcE1lcmdlKG1lcmdlZERlZmF1bHRPcHRpb25zLCBvcHRpb25zLCBleHRlbmRzRGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICBsZXQgZXh0ZW5kZXJPcHRpb25zRGVmYXVsdE9wdGlvbnMgPSBvcHRpb25zRE87XG4gICAgICAgIGlmIChvcHRpb25zRE9Jc0ZuKSB7XG4gICAgICAgICAgZXh0ZW5kZXJPcHRpb25zRGVmYXVsdE9wdGlvbnMgPSBleHRlbmRlck9wdGlvbnNEZWZhdWx0T3B0aW9ucyhtZXJnZWREZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgdXRpbHMucmV2ZXJzZURlZXBNZXJnZShleHRlbmRzRGVmYXVsdE9wdGlvbnMsIGV4dGVuZGVyT3B0aW9uc0RlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZHNEZWZhdWx0T3B0aW9ucztcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChvcHRpb25zRE9Jc0ZuKSB7XG4gICAgICBvcHRpb25zLmRlZmF1bHRPcHRpb25zID0gZnVuY3Rpb24gZGVmYXVsdE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBsZXQgbmV3RGVmYXVsdE9wdGlvbnMgPSB7fTtcbiAgICAgICAgdXRpbHMucmV2ZXJzZURlZXBNZXJnZShuZXdEZWZhdWx0T3B0aW9ucywgb3B0aW9ucywgZXh0ZW5kc0RPKTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnNETyhuZXdEZWZhdWx0T3B0aW9ucyk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFR5cGUobmFtZSwgdGhyb3dFcnJvciwgZXJyb3JDb250ZXh0KSB7XG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB2YXIgdHlwZSA9IHR5cGVNYXBbbmFtZV07XG4gICAgaWYgKCF0eXBlICYmIHRocm93RXJyb3IgPT09IHRydWUpIHtcbiAgICAgIHRocm93IGdldEVycm9yKFxuICAgICAgICBgVGhlcmUgaXMgbm8gdHlwZSBieSB0aGUgbmFtZSBvZiBcIiR7bmFtZX1cIjogJHtKU09OLnN0cmluZ2lmeShlcnJvckNvbnRleHQpfWBcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFdyYXBwZXIob3B0aW9ucywgbmFtZSkge1xuICAgIGlmIChhbmd1bGFyLmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLm1hcCh3cmFwcGVyT3B0aW9ucyA9PiBzZXRXcmFwcGVyKHdyYXBwZXJPcHRpb25zKSk7XG4gICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgICBvcHRpb25zLnR5cGVzID0gZ2V0T3B0aW9uc1R5cGVzKG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5uYW1lID0gZ2V0T3B0aW9uc05hbWUob3B0aW9ucywgbmFtZSk7XG4gICAgICBjaGVja1dyYXBwZXJBUEkob3B0aW9ucyk7XG4gICAgICB0ZW1wbGF0ZVdyYXBwZXJzTWFwW29wdGlvbnMubmFtZV0gPSBvcHRpb25zO1xuICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzU3RyaW5nKG9wdGlvbnMpKSB7XG4gICAgICByZXR1cm4gc2V0V3JhcHBlcih7XG4gICAgICAgIHRlbXBsYXRlOiBvcHRpb25zLFxuICAgICAgICBuYW1lXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRPcHRpb25zVHlwZXMob3B0aW9ucykge1xuICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKG9wdGlvbnMudHlwZXMpKSB7XG4gICAgICByZXR1cm4gW29wdGlvbnMudHlwZXNdO1xuICAgIH1cbiAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMudHlwZXMpKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLnR5cGVzO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE9wdGlvbnNOYW1lKG9wdGlvbnMsIG5hbWUpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5uYW1lIHx8IG5hbWUgfHwgb3B0aW9ucy50eXBlcy5qb2luKCcgJykgfHwgZGVmYXVsdFdyYXBwZXJOYW1lO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tXcmFwcGVyQVBJKG9wdGlvbnMpIHtcbiAgICBmb3JtbHlVc2FiaWxpdHlQcm92aWRlci5jaGVja1dyYXBwZXIob3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMudGVtcGxhdGUpIHtcbiAgICAgIGZvcm1seVVzYWJpbGl0eVByb3ZpZGVyLmNoZWNrV3JhcHBlclRlbXBsYXRlKG9wdGlvbnMudGVtcGxhdGUsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAoIW9wdGlvbnMub3ZlcndyaXRlT2spIHtcbiAgICAgIGNoZWNrT3ZlcndyaXRlKG9wdGlvbnMubmFtZSwgdGVtcGxhdGVXcmFwcGVyc01hcCwgb3B0aW9ucywgJ3RlbXBsYXRlV3JhcHBlcnMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIG9wdGlvbnMub3ZlcndyaXRlT2s7XG4gICAgfVxuICAgIGNoZWNrV3JhcHBlclR5cGVzKG9wdGlvbnMpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tXcmFwcGVyVHlwZXMob3B0aW9ucykge1xuICAgIGxldCBzaG91bGRUaHJvdyA9ICFhbmd1bGFyLmlzQXJyYXkob3B0aW9ucy50eXBlcykgfHwgIW9wdGlvbnMudHlwZXMuZXZlcnkoYW5ndWxhci5pc1N0cmluZyk7XG4gICAgaWYgKHNob3VsZFRocm93KSB7XG4gICAgICB0aHJvdyBnZXRFcnJvcihgQXR0ZW1wdGVkIHRvIGNyZWF0ZSBhIHRlbXBsYXRlIHdyYXBwZXIgd2l0aCB0eXBlcyB0aGF0IGlzIG5vdCBhIHN0cmluZyBvciBhbiBhcnJheSBvZiBzdHJpbmdzYCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tPdmVyd3JpdGUocHJvcGVydHksIG9iamVjdCwgbmV3VmFsdWUsIG9iamVjdE5hbWUpIHtcbiAgICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgd2FybihbXG4gICAgICAgIGBBdHRlbXB0aW5nIHRvIG92ZXJ3cml0ZSAke3Byb3BlcnR5fSBvbiAke29iamVjdE5hbWV9IHdoaWNoIGlzIGN1cnJlbnRseWAsXG4gICAgICAgIGAke0pTT04uc3RyaW5naWZ5KG9iamVjdFtwcm9wZXJ0eV0pfSB3aXRoICR7SlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpfWAsXG4gICAgICAgIGBUbyBzdXByZXNzIHRoaXMgd2FybmluZywgc3BlY2lmeSB0aGUgcHJvcGVydHkgXCJvdmVyd3JpdGVPazogdHJ1ZVwiYFxuICAgICAgXS5qb2luKCcgJykpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFdyYXBwZXIobmFtZSkge1xuICAgIHJldHVybiB0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWUgfHwgZGVmYXVsdFdyYXBwZXJOYW1lXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFdyYXBwZXJCeVR5cGUodHlwZSkge1xuICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjYgKi9cbiAgICB2YXIgd3JhcHBlcnMgPSBbXTtcbiAgICBmb3IgKHZhciBuYW1lIGluIHRlbXBsYXRlV3JhcHBlcnNNYXApIHtcbiAgICAgIGlmICh0ZW1wbGF0ZVdyYXBwZXJzTWFwLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIGlmICh0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdLnR5cGVzICYmIHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV0udHlwZXMuaW5kZXhPZih0eXBlKSAhPT0gLTEpIHtcbiAgICAgICAgICB3cmFwcGVycy5wdXNoKHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB3cmFwcGVycztcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVdyYXBwZXJCeU5hbWUobmFtZSkge1xuICAgIHZhciB3cmFwcGVyID0gdGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lXTtcbiAgICBkZWxldGUgdGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lXTtcbiAgICByZXR1cm4gd3JhcHBlcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVdyYXBwZXJzRm9yVHlwZSh0eXBlKSB7XG4gICAgdmFyIHdyYXBwZXJzID0gZ2V0V3JhcHBlckJ5VHlwZSh0eXBlKTtcbiAgICBpZiAoIXdyYXBwZXJzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghYW5ndWxhci5pc0FycmF5KHdyYXBwZXJzKSkge1xuICAgICAgcmV0dXJuIHJlbW92ZVdyYXBwZXJCeU5hbWUod3JhcHBlcnMubmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdyYXBwZXJzLmZvckVhY2goKHdyYXBwZXIpID0+IHJlbW92ZVdyYXBwZXJCeU5hbWUod3JhcHBlci5uYW1lKSk7XG4gICAgICByZXR1cm4gd3JhcHBlcnM7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiB3YXJuKCkge1xuICAgIGlmICghX3RoaXMuZGlzYWJsZVdhcm5pbmdzKSB7XG4gICAgICBjb25zb2xlLndhcm4oLi4uYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3Byb3ZpZGVycy9mb3JtbHlDb25maWcuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXM7XG5cblxuLy8gQG5nSW5qZWN0XG5mdW5jdGlvbiBmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMoKSB7XG5cbiAgdmFyIHZhbGlkYXRpb25NZXNzYWdlcyA9IHtcbiAgICBhZGRUZW1wbGF0ZU9wdGlvblZhbHVlTWVzc2FnZSxcbiAgICBhZGRTdHJpbmdNZXNzYWdlLFxuICAgIG1lc3NhZ2VzOiB7fVxuICB9O1xuXG4gIHJldHVybiB2YWxpZGF0aW9uTWVzc2FnZXM7XG5cbiAgZnVuY3Rpb24gYWRkVGVtcGxhdGVPcHRpb25WYWx1ZU1lc3NhZ2UobmFtZSwgcHJvcCwgcHJlZml4LCBzdWZmaXgsIGFsdGVybmF0ZSkge1xuICAgIHZhbGlkYXRpb25NZXNzYWdlcy5tZXNzYWdlc1tuYW1lXSA9IHRlbXBsYXRlT3B0aW9uVmFsdWUocHJvcCwgcHJlZml4LCBzdWZmaXgsIGFsdGVybmF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRTdHJpbmdNZXNzYWdlKG5hbWUsIHN0cmluZykge1xuICAgIHZhbGlkYXRpb25NZXNzYWdlcy5tZXNzYWdlc1tuYW1lXSA9ICgpID0+IHN0cmluZztcbiAgfVxuXG5cbiAgZnVuY3Rpb24gdGVtcGxhdGVPcHRpb25WYWx1ZShwcm9wLCBwcmVmaXgsIHN1ZmZpeCwgYWx0ZXJuYXRlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGdldFZhbGlkYXRpb25NZXNzYWdlKHZpZXdWYWx1ZSwgbW9kZWxWYWx1ZSwgc2NvcGUpIHtcbiAgICAgIGlmIChzY29wZS5vcHRpb25zLnRlbXBsYXRlT3B0aW9uc1twcm9wXSkge1xuICAgICAgICByZXR1cm4gYCR7cHJlZml4fSAke3Njb3BlLm9wdGlvbnMudGVtcGxhdGVPcHRpb25zW3Byb3BdfSAke3N1ZmZpeH1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGFsdGVybmF0ZTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9wcm92aWRlcnMvZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzLmpzXG4gKiovIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4uL290aGVyL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZm9ybWx5VXRpbDtcblxuLy8gQG5nSW5qZWN0XG5mdW5jdGlvbiBmb3JtbHlVdGlsKCkge1xuICByZXR1cm4gdXRpbHM7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9zZXJ2aWNlcy9mb3JtbHlVdGlsLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZm9ybWx5V2FybjtcblxuLy8gQG5nSW5qZWN0XG5mdW5jdGlvbiBmb3JtbHlXYXJuKGZvcm1seUNvbmZpZywgZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeCwgJGxvZykge1xuICByZXR1cm4gZnVuY3Rpb24gd2FybigpIHtcbiAgICBpZiAoIWZvcm1seUNvbmZpZy5kaXNhYmxlV2FybmluZ3MpIHtcbiAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgIHZhciB3YXJuSW5mb1NsdWcgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICBhcmdzLnVuc2hpZnQoJ0Zvcm1seSBXYXJuaW5nOicpO1xuICAgICAgYXJncy5wdXNoKGAke2Zvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXh9JHt3YXJuSW5mb1NsdWd9YCk7XG4gICAgICAkbG9nLndhcm4oLi4uYXJncyk7XG4gICAgfVxuICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vc2VydmljZXMvZm9ybWx5V2Fybi5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZvcm1seUN1c3RvbVZhbGlkYXRpb247XG5cbi8vIEBuZ0luamVjdFxuZnVuY3Rpb24gZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbihmb3JtbHlVdGlsLCAkcSkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgcmVxdWlyZTogJ25nTW9kZWwnLFxuICAgIGxpbms6IGZ1bmN0aW9uIGZvcm1seUN1c3RvbVZhbGlkYXRpb25MaW5rKHNjb3BlLCBlbCwgYXR0cnMsIGN0cmwpIHtcbiAgICAgIGNvbnN0IG9wdHMgPSBzY29wZS5vcHRpb25zO1xuICAgICAgaWYgKG9wdHMudmFsaWRhdG9ycykge1xuICAgICAgICBjaGVja1ZhbGlkYXRvcnMob3B0cy52YWxpZGF0b3JzKTtcbiAgICAgIH1cbiAgICAgIG9wdHMudmFsaWRhdGlvbi5tZXNzYWdlcyA9IG9wdHMudmFsaWRhdGlvbi5tZXNzYWdlcyB8fCB7fTtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChvcHRzLnZhbGlkYXRpb24ubWVzc2FnZXMsIChtZXNzYWdlLCBrZXkpID0+IHtcbiAgICAgICAgb3B0cy52YWxpZGF0aW9uLm1lc3NhZ2VzW2tleV0gPSAoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGZvcm1seVV0aWwuZm9ybWx5RXZhbChzY29wZSwgbWVzc2FnZSwgY3RybC4kbW9kZWxWYWx1ZSwgY3RybC4kdmlld1ZhbHVlKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG5cbiAgICAgIHZhciB1c2VOZXdWYWxpZGF0b3JzQXBpID0gY3RybC5oYXNPd25Qcm9wZXJ0eSgnJHZhbGlkYXRvcnMnKSAmJiAhYXR0cnMuaGFzT3duUHJvcGVydHkoJ3VzZVBhcnNlcnMnKTtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChvcHRzLnZhbGlkYXRvcnMsIGZ1bmN0aW9uIGFkZFZhbGlkYXRvclRvUGlwZWxpbmUodmFsaWRhdG9yLCBuYW1lKSB7XG4gICAgICAgIHZhciBtZXNzYWdlID0gdmFsaWRhdG9yLm1lc3NhZ2U7XG4gICAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgICAgb3B0cy52YWxpZGF0aW9uLm1lc3NhZ2VzW25hbWVdID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGZvcm1seVV0aWwuZm9ybWx5RXZhbChzY29wZSwgbWVzc2FnZSwgY3RybC4kbW9kZWxWYWx1ZSwgY3RybC4kdmlld1ZhbHVlKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHZhbGlkYXRvciA9IGFuZ3VsYXIuaXNPYmplY3QodmFsaWRhdG9yKSA/IHZhbGlkYXRvci5leHByZXNzaW9uIDogdmFsaWRhdG9yO1xuICAgICAgICB2YXIgaXNQb3NzaWJseUFzeW5jID0gIWFuZ3VsYXIuaXNTdHJpbmcodmFsaWRhdG9yKTtcbiAgICAgICAgaWYgKHVzZU5ld1ZhbGlkYXRvcnNBcGkpIHtcbiAgICAgICAgICBzZXR1cFdpdGhWYWxpZGF0b3JzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0dXBXaXRoUGFyc2VycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0dXBXaXRoVmFsaWRhdG9ycygpIHtcbiAgICAgICAgICB2YXIgdmFsaWRhdG9yQ29sbGVjdGlvbiA9IGlzUG9zc2libHlBc3luYyA/ICckYXN5bmNWYWxpZGF0b3JzJyA6ICckdmFsaWRhdG9ycyc7XG4gICAgICAgICAgY3RybFt2YWxpZGF0b3JDb2xsZWN0aW9uXVtuYW1lXSA9IGZ1bmN0aW9uIGV2YWxWYWxpZGl0eShtb2RlbFZhbHVlLCB2aWV3VmFsdWUpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGZvcm1seVV0aWwuZm9ybWx5RXZhbChzY29wZSwgdmFsaWRhdG9yLCBtb2RlbFZhbHVlLCB2aWV3VmFsdWUpO1xuICAgICAgICAgICAgaWYgKGlzUG9zc2libHlBc3luYykge1xuICAgICAgICAgICAgICByZXR1cm4gaXNQcm9taXNlTGlrZSh2YWx1ZSkgPyB2YWx1ZSA6IHZhbHVlID8gJHEud2hlbih2YWx1ZSkgOiAkcS5yZWplY3QodmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzZXR1cFdpdGhQYXJzZXJzKCkge1xuICAgICAgICAgIGxldCBpbkZsaWdodFZhbGlkYXRvcjtcbiAgICAgICAgICBjdHJsLiRwYXJzZXJzLnVuc2hpZnQoZnVuY3Rpb24gZXZhbFZhbGlkaXR5T2ZQYXJzZXIodmlld1ZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgaXNWYWxpZCA9IGZvcm1seVV0aWwuZm9ybWx5RXZhbChzY29wZSwgdmFsaWRhdG9yLCBjdHJsLiRtb2RlbFZhbHVlLCB2aWV3VmFsdWUpO1xuICAgICAgICAgICAgaWYgKGlzUHJvbWlzZUxpa2UoaXNWYWxpZCkpIHtcbiAgICAgICAgICAgICAgY3RybC4kcGVuZGluZyA9IGN0cmwuJHBlbmRpbmcgfHwge307XG4gICAgICAgICAgICAgIGN0cmwuJHBlbmRpbmdbbmFtZV0gPSB0cnVlO1xuICAgICAgICAgICAgICBpbkZsaWdodFZhbGlkYXRvciA9IGlzVmFsaWQ7XG4gICAgICAgICAgICAgIGlzVmFsaWQudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGluRmxpZ2h0VmFsaWRhdG9yID09PSBpc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICBjdHJsLiRzZXRWYWxpZGl0eShuYW1lLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaW5GbGlnaHRWYWxpZGF0b3IgPT09IGlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgIGN0cmwuJHNldFZhbGlkaXR5KG5hbWUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhjdHJsLiRwZW5kaW5nKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjdHJsLiRwZW5kaW5nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBkZWxldGUgY3RybC4kcGVuZGluZ1tuYW1lXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY3RybC4kc2V0VmFsaWRpdHkobmFtZSwgaXNWYWxpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmlld1ZhbHVlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gaXNQcm9taXNlTGlrZShvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIGFuZ3VsYXIuaXNGdW5jdGlvbihvYmoudGhlbik7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1ZhbGlkYXRvcnModmFsaWRhdG9ycykge1xuICAgIHZhciBhbGxvd2VkUHJvcGVydGllcyA9IFsnZXhwcmVzc2lvbicsICdtZXNzYWdlJ107XG4gICAgdmFyIHZhbGlkYXRvcnNXaXRoRXh0cmFQcm9wcyA9IHt9O1xuICAgIGFuZ3VsYXIuZm9yRWFjaCh2YWxpZGF0b3JzLCAodmFsaWRhdG9yLCBuYW1lKSA9PiB7XG4gICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyh2YWxpZGF0b3IpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBleHRyYVByb3BzID0gW107XG4gICAgICBhbmd1bGFyLmZvckVhY2godmFsaWRhdG9yLCAodiwga2V5KSA9PiB7XG4gICAgICAgIGlmIChhbGxvd2VkUHJvcGVydGllcy5pbmRleE9mKGtleSkgPT09IC0xKSB7XG4gICAgICAgICAgZXh0cmFQcm9wcy5wdXNoKGtleSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKGV4dHJhUHJvcHMubGVuZ3RoKSB7XG4gICAgICAgIHZhbGlkYXRvcnNXaXRoRXh0cmFQcm9wc1tuYW1lXSA9IGV4dHJhUHJvcHM7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKE9iamVjdC5rZXlzKHZhbGlkYXRvcnNXaXRoRXh0cmFQcm9wcykubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoW1xuICAgICAgICBgVmFsaWRhdG9ycyBhcmUgb25seSBhbGxvd2VkIHRvIGJlIGZ1bmN0aW9ucyBvciBvYmplY3RzIHRoYXQgaGF2ZSAke2FsbG93ZWRQcm9wZXJ0aWVzLmpvaW4oJywgJyl9LmAsXG4gICAgICAgIGBZb3UgcHJvdmlkZWQgc29tZSBleHRyYSBwcm9wZXJ0aWVzOiAke0pTT04uc3RyaW5naWZ5KHZhbGlkYXRvcnNXaXRoRXh0cmFQcm9wcyl9YFxuICAgICAgXS5qb2luKCcgJykpO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vZGlyZWN0aXZlcy9mb3JtbHktY3VzdG9tLXZhbGlkYXRpb24uanNcbiAqKi8iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyLWZpeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1seUZpZWxkO1xuXG4vKipcbiAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAqIEBuYW1lIGZvcm1seUZpZWxkXG4gKiBAcmVzdHJpY3QgQUVcbiAqL1xuLy8gQG5nSW5qZWN0XG5mdW5jdGlvbiBmb3JtbHlGaWVsZCgkaHR0cCwgJHEsICRjb21waWxlLCAkdGVtcGxhdGVDYWNoZSwgZm9ybWx5Q29uZmlnLCBmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMsIGZvcm1seUFwaUNoZWNrLFxuICAgICAgICAgICAgICAgICAgICAgZm9ybWx5VXRpbCwgZm9ybWx5VXNhYmlsaXR5LCBmb3JtbHlXYXJuKSB7XG4gIGNvbnN0IHthcnJheWlmeX0gPSBmb3JtbHlVdGlsO1xuXG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBRScsXG4gICAgdHJhbnNjbHVkZTogdHJ1ZSxcbiAgICBzY29wZToge1xuICAgICAgb3B0aW9uczogJz0nLFxuICAgICAgbW9kZWw6ICc9JyxcbiAgICAgIGZvcm1JZDogJ0AnLFxuICAgICAgaW5kZXg6ICc9PycsXG4gICAgICBmaWVsZHM6ICc9PycsXG4gICAgICBmb3JtU3RhdGU6ICc9PycsXG4gICAgICBmb3JtOiAnPT8nXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiAvKiBAbmdJbmplY3QgKi8gZnVuY3Rpb24gRm9ybWx5RmllbGRDb250cm9sbGVyKCRzY29wZSwgJHRpbWVvdXQsICRwYXJzZSwgJGNvbnRyb2xsZXIpIHtcbiAgICAgIC8qIGpzaGludCBtYXhzdGF0ZW1lbnRzOjMxICovXG4gICAgICBpZiAoJHNjb3BlLm9wdGlvbnMuZmllbGRHcm91cCkge1xuICAgICAgICBzZXR1cEZpZWxkR3JvdXAoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgb3B0cyA9ICRzY29wZS5vcHRpb25zO1xuICAgICAgdmFyIGZpZWxkVHlwZSA9IG9wdHMudHlwZSAmJiBmb3JtbHlDb25maWcuZ2V0VHlwZShvcHRzLnR5cGUpO1xuICAgICAgc2ltcGxpZnlMaWZlKG9wdHMpO1xuICAgICAgbWVyZ2VGaWVsZE9wdGlvbnNXaXRoVHlwZURlZmF1bHRzKG9wdHMsIGZpZWxkVHlwZSk7XG4gICAgICBleHRlbmRPcHRpb25zV2l0aERlZmF1bHRzKG9wdHMsICRzY29wZS5pbmRleCk7XG4gICAgICBjaGVja0FwaShvcHRzKTtcbiAgICAgIC8vIHNldCBmaWVsZCBpZCB0byBsaW5rIGxhYmVscyBhbmQgZmllbGRzXG4gICAgICAkc2NvcGUuaWQgPSBmb3JtbHlVdGlsLmdldEZpZWxkSWQoJHNjb3BlLmZvcm1JZCwgb3B0cywgJHNjb3BlLmluZGV4KTtcblxuICAgICAgLy8gaW5pdGFsaXphdGlvblxuICAgICAgc2V0RGVmYXVsdFZhbHVlKCk7XG4gICAgICBzZXRJbml0aWFsVmFsdWUoKTtcbiAgICAgIHJ1bkV4cHJlc3Npb25zKCk7XG4gICAgICBhZGRNb2RlbFdhdGNoZXIoJHNjb3BlLCBvcHRzKTtcbiAgICAgIGFkZFZhbGlkYXRpb25NZXNzYWdlcyhvcHRzKTtcbiAgICAgIC8vIHNpbXBsaWZ5IHRoaW5nc1xuICAgICAgLy8gY3JlYXRlICRzY29wZS50byBzbyB0ZW1wbGF0ZSBhdXRob3JzIGNhbiByZWZlcmVuY2UgdG8gaW5zdGVhZCBvZiAkc2NvcGUub3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnNcbiAgICAgICRzY29wZS50byA9ICRzY29wZS5vcHRpb25zLnRlbXBsYXRlT3B0aW9ucztcbiAgICAgIGludm9rZUNvbnRyb2xsZXJzKCRzY29wZSwgb3B0cywgZmllbGRUeXBlKTtcblxuICAgICAgLy8gZnVuY3Rpb24gZGVmaW5pdGlvbnNcbiAgICAgIGZ1bmN0aW9uIHJ1bkV4cHJlc3Npb25zKCkge1xuICAgICAgICAvLyBtdXN0IHJ1biBvbiBuZXh0IHRpY2sgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIGN1cnJlbnQgdmFsdWUgaXMgY29ycmVjdC5cbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gcnVuRXhwcmVzc2lvbnNPbk5leHRUaWNrKCkge1xuICAgICAgICAgIHZhciBmaWVsZCA9ICRzY29wZS5vcHRpb25zO1xuICAgICAgICAgIHZhciBjdXJyZW50VmFsdWUgPSB2YWx1ZUdldHRlclNldHRlcigpO1xuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChmaWVsZC5leHByZXNzaW9uUHJvcGVydGllcywgZnVuY3Rpb24gcnVuRXhwcmVzc2lvbihleHByZXNzaW9uLCBwcm9wKSB7XG4gICAgICAgICAgICB2YXIgc2V0dGVyID0gJHBhcnNlKHByb3ApLmFzc2lnbjtcbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gJHEud2hlbihmb3JtbHlVdGlsLmZvcm1seUV2YWwoJHNjb3BlLCBleHByZXNzaW9uLCBjdXJyZW50VmFsdWUpKTtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiBzZXRGaWVsZFZhbHVlKHZhbHVlKSB7XG4gICAgICAgICAgICAgIHNldHRlcihmaWVsZCwgdmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB2YWx1ZUdldHRlclNldHRlcihuZXdWYWwpIHtcbiAgICAgICAgaWYgKCEkc2NvcGUubW9kZWwgfHwgISRzY29wZS5vcHRpb25zLmtleSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQobmV3VmFsKSkge1xuICAgICAgICAgICRzY29wZS5tb2RlbFskc2NvcGUub3B0aW9ucy5rZXldID0gbmV3VmFsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkc2NvcGUubW9kZWxbJHNjb3BlLm9wdGlvbnMua2V5XTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2ltcGxpZnlMaWZlKG9wdGlvbnMpIHtcbiAgICAgICAgLy8gYWRkIGEgZmV3IGVtcHR5IG9iamVjdHMgKGlmIHRoZXkgZG9uJ3QgYWxyZWFkeSBleGlzdCkgc28geW91IGRvbid0IGhhdmUgdG8gdW5kZWZpbmVkIGNoZWNrIGV2ZXJ5d2hlcmVcbiAgICAgICAgZm9ybWx5VXRpbC5yZXZlcnNlRGVlcE1lcmdlKG9wdGlvbnMsIHtcbiAgICAgICAgICBkYXRhOiB7fSxcbiAgICAgICAgICB0ZW1wbGF0ZU9wdGlvbnM6IHt9LFxuICAgICAgICAgIHZhbGlkYXRpb246IHt9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzZXREZWZhdWx0VmFsdWUoKSB7XG4gICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChvcHRzLmRlZmF1bHRWYWx1ZSkgJiYgIWFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS5tb2RlbFtvcHRzLmtleV0pKSB7XG4gICAgICAgICAgJHNjb3BlLm1vZGVsW29wdHMua2V5XSA9IG9wdHMuZGVmYXVsdFZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHNldEluaXRpYWxWYWx1ZSgpIHtcbiAgICAgICAgb3B0cy5pbml0aWFsVmFsdWUgPSAkc2NvcGUubW9kZWwgJiYgJHNjb3BlLm1vZGVsW29wdHMua2V5XTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gbWVyZ2VGaWVsZE9wdGlvbnNXaXRoVHlwZURlZmF1bHRzKG9wdGlvbnMsIHR5cGUpIHtcbiAgICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgICBtZXJnZU9wdGlvbnMob3B0aW9ucywgdHlwZS5kZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByb3Blck9yZGVyID0gYXJyYXlpZnkob3B0aW9ucy5vcHRpb25zVHlwZXMpLnJldmVyc2UoKTsgLy8gc28gdGhlIHJpZ2h0IHRoaW5ncyBhcmUgb3ZlcnJpZGRlblxuICAgICAgICBhbmd1bGFyLmZvckVhY2gocHJvcGVyT3JkZXIsIHR5cGVOYW1lID0+IHtcbiAgICAgICAgICBtZXJnZU9wdGlvbnMob3B0aW9ucywgZm9ybWx5Q29uZmlnLmdldFR5cGUodHlwZU5hbWUsIHRydWUsIG9wdGlvbnMpLmRlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG1lcmdlT3B0aW9ucyhvcHRpb25zLCBleHRyYU9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGV4dHJhT3B0aW9ucykge1xuICAgICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24oZXh0cmFPcHRpb25zKSkge1xuICAgICAgICAgICAgZXh0cmFPcHRpb25zID0gZXh0cmFPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmb3JtbHlVdGlsLnJldmVyc2VEZWVwTWVyZ2Uob3B0aW9ucywgZXh0cmFPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBleHRlbmRPcHRpb25zV2l0aERlZmF1bHRzKG9wdGlvbnMsIGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGtleSA9IG9wdGlvbnMua2V5IHx8IGluZGV4IHx8IDA7XG4gICAgICAgIGFuZ3VsYXIuZXh0ZW5kKG9wdGlvbnMsIHtcbiAgICAgICAgICAvLyBhdHRhY2ggdGhlIGtleSBpbiBjYXNlIHRoZSBmb3JtbHktZmllbGQgZGlyZWN0aXZlIGlzIHVzZWQgZGlyZWN0bHlcbiAgICAgICAgICBrZXksXG4gICAgICAgICAgdmFsdWU6IHZhbHVlR2V0dGVyU2V0dGVyLFxuICAgICAgICAgIHJ1bkV4cHJlc3Npb25zLFxuICAgICAgICAgIHJlc2V0TW9kZWwsXG4gICAgICAgICAgdXBkYXRlSW5pdGlhbFZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBpbml0aWFsaXphdGlvbiBmdW5jdGlvbnNcbiAgICAgIGZ1bmN0aW9uIGFkZE1vZGVsV2F0Y2hlcihzY29wZSwgb3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucy5tb2RlbCkge1xuICAgICAgICAgIHNjb3BlLiR3YXRjaCgnb3B0aW9ucy5tb2RlbCcsIHJ1bkV4cHJlc3Npb25zLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiByZXNldE1vZGVsKCkge1xuICAgICAgICAkc2NvcGUubW9kZWxbJHNjb3BlLm9wdGlvbnMua2V5XSA9ICRzY29wZS5vcHRpb25zLmluaXRpYWxWYWx1ZTtcbiAgICAgICAgaWYgKCRzY29wZS5vcHRpb25zLmZvcm1Db250cm9sKSB7XG4gICAgICAgICAgJHNjb3BlLm9wdGlvbnMuZm9ybUNvbnRyb2wuJHNldFZpZXdWYWx1ZSgkc2NvcGUubW9kZWxbJHNjb3BlLm9wdGlvbnMua2V5XSk7XG4gICAgICAgICAgJHNjb3BlLm9wdGlvbnMuZm9ybUNvbnRyb2wuJHJlbmRlcigpO1xuICAgICAgICAgICRzY29wZS5vcHRpb25zLmZvcm1Db250cm9sLiRzZXRVbnRvdWNoZWQoKTtcbiAgICAgICAgICAkc2NvcGUub3B0aW9ucy5mb3JtQ29udHJvbC4kc2V0UHJpc3RpbmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB1cGRhdGVJbml0aWFsVmFsdWUoKSB7XG4gICAgICAgICRzY29wZS5vcHRpb25zLmluaXRpYWxWYWx1ZSA9ICRzY29wZS5tb2RlbFskc2NvcGUub3B0aW9ucy5rZXldO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhZGRWYWxpZGF0aW9uTWVzc2FnZXMob3B0aW9ucykge1xuICAgICAgICBvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXMgPSBvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXMgfHwge307XG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMubWVzc2FnZXMsIGZ1bmN0aW9uIGNyZWF0ZUZ1bmN0aW9uRm9yTWVzc2FnZShleHByZXNzaW9uLCBuYW1lKSB7XG4gICAgICAgICAgaWYgKCFvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXNbbmFtZV0pIHtcbiAgICAgICAgICAgIG9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlc1tuYW1lXSA9IGZ1bmN0aW9uIGV2YWx1YXRlTWVzc2FnZSh2aWV3VmFsdWUsIG1vZGVsVmFsdWUsIHNjb3BlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIGV4cHJlc3Npb24sIG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGludm9rZUNvbnRyb2xsZXJzKHNjb3BlLCBvcHRpb25zID0ge30sIHR5cGUgPSB7fSkge1xuICAgICAgICBhbmd1bGFyLmZvckVhY2goW3R5cGUuY29udHJvbGxlciwgb3B0aW9ucy5jb250cm9sbGVyXSwgY29udHJvbGxlciA9PiB7XG4gICAgICAgICAgaWYgKGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICRjb250cm9sbGVyKGNvbnRyb2xsZXIsIHskc2NvcGU6IHNjb3BlfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2V0dXBGaWVsZEdyb3VwKCkge1xuICAgICAgICAkc2NvcGUub3B0aW9ucy5vcHRpb25zID0gJHNjb3BlLm9wdGlvbnMub3B0aW9ucyB8fCB7fTtcbiAgICAgICAgJHNjb3BlLm9wdGlvbnMub3B0aW9ucy5mb3JtU3RhdGUgPSAkc2NvcGUuZm9ybVN0YXRlO1xuICAgICAgfVxuICAgIH0sXG4gICAgbGluazogZnVuY3Rpb24gZmllbGRMaW5rKHNjb3BlLCBlbCkge1xuICAgICAgaWYgKHNjb3BlLm9wdGlvbnMuZmllbGRHcm91cCkge1xuICAgICAgICBzZXRGaWVsZEdyb3VwVGVtcGxhdGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhZGRBdHRyaWJ1dGVzKCk7XG4gICAgICBhZGRDbGFzc2VzKCk7XG5cbiAgICAgIHZhciB0eXBlID0gc2NvcGUub3B0aW9ucy50eXBlICYmIGZvcm1seUNvbmZpZy5nZXRUeXBlKHNjb3BlLm9wdGlvbnMudHlwZSk7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHZhciB0aHVzbHkgPSB0aGlzO1xuICAgICAgZ2V0RmllbGRUZW1wbGF0ZShzY29wZS5vcHRpb25zKVxuICAgICAgICAudGhlbihydW5NYW5pcHVsYXRvcnMoZm9ybWx5Q29uZmlnLnRlbXBsYXRlTWFuaXB1bGF0b3JzLnByZVdyYXBwZXIpKVxuICAgICAgICAudGhlbih0cmFuc2NsdWRlSW5XcmFwcGVycyhzY29wZS5vcHRpb25zKSlcbiAgICAgICAgLnRoZW4ocnVuTWFuaXB1bGF0b3JzKGZvcm1seUNvbmZpZy50ZW1wbGF0ZU1hbmlwdWxhdG9ycy5wb3N0V3JhcHBlcikpXG4gICAgICAgIC50aGVuKHNldEVsZW1lbnRUZW1wbGF0ZSlcbiAgICAgICAgLnRoZW4od2F0Y2hGb3JtQ29udHJvbClcbiAgICAgICAgLnRoZW4oY2FsbExpbmtGdW5jdGlvbnMpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgZm9ybWx5V2FybihcbiAgICAgICAgICAgICd0aGVyZS13YXMtYS1wcm9ibGVtLXNldHRpbmctdGhlLXRlbXBsYXRlLWZvci10aGlzLWZpZWxkJyxcbiAgICAgICAgICAgICdUaGVyZSB3YXMgYSBwcm9ibGVtIHNldHRpbmcgdGhlIHRlbXBsYXRlIGZvciB0aGlzIGZpZWxkICcsXG4gICAgICAgICAgICBzY29wZS5vcHRpb25zLFxuICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgZnVuY3Rpb24gc2V0RmllbGRHcm91cFRlbXBsYXRlKCkge1xuICAgICAgICBjaGVja0ZpZWxkR3JvdXBBcGkoc2NvcGUub3B0aW9ucyk7XG4gICAgICAgIGVsLmFkZENsYXNzKCdmb3JtbHktZmllbGQtZ3JvdXAnKTtcbiAgICAgICAgbGV0IGV4dHJhQXR0cmlidXRlcyA9ICcnO1xuICAgICAgICBpZiAoc2NvcGUub3B0aW9ucy5lbGVtZW50QXR0cmlidXRlcykge1xuICAgICAgICAgIGV4dHJhQXR0cmlidXRlcyA9IE9iamVjdC5rZXlzKHNjb3BlLm9wdGlvbnMuZWxlbWVudEF0dHJpYnV0ZXMpLm1hcChrZXkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGAke2tleX09XCIke3Njb3BlLm9wdGlvbnMuZWxlbWVudEF0dHJpYnV0ZXNba2V5XX1cImA7XG4gICAgICAgICAgfSkuam9pbignICcpO1xuICAgICAgICB9XG4gICAgICAgIHNldEVsZW1lbnRUZW1wbGF0ZShgXG4gICAgICAgICAgPGZvcm1seS1mb3JtIG1vZGVsPVwibW9kZWxcIlxuICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHM9XCJvcHRpb25zLmZpZWxkR3JvdXBcIlxuICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zPVwib3B0aW9ucy5vcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgZm9ybT1cIm9wdGlvbnMuZm9ybVwiXG4gICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiJHtzY29wZS5vcHRpb25zLmNsYXNzTmFtZX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAke2V4dHJhQXR0cmlidXRlc31cbiAgICAgICAgICAgICAgICAgICAgICAgaXMtZmllbGQtZ3JvdXA+XG4gICAgICAgICAgPC9mb3JtbHktZm9ybT5cbiAgICAgICAgYCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGFkZEF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIGlmIChzY29wZS5vcHRpb25zLmVsZW1lbnRBdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgZWwuYXR0cihzY29wZS5vcHRpb25zLmVsZW1lbnRBdHRyaWJ1dGVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhZGRDbGFzc2VzKCkge1xuICAgICAgICBpZiAoc2NvcGUub3B0aW9ucy5jbGFzc05hbWUpIHtcbiAgICAgICAgICBlbC5hZGRDbGFzcyhzY29wZS5vcHRpb25zLmNsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLm9wdGlvbnMudHlwZSkge1xuICAgICAgICAgIGVsLmFkZENsYXNzKGBmb3JtbHktZmllbGQtJHtzY29wZS5vcHRpb25zLnR5cGV9YCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2V0RWxlbWVudFRlbXBsYXRlKHRlbXBsYXRlU3RyaW5nKSB7XG4gICAgICAgIGVsLmh0bWwoYXNIdG1sKHRlbXBsYXRlU3RyaW5nKSk7XG4gICAgICAgICRjb21waWxlKGVsLmNvbnRlbnRzKCkpKHNjb3BlKTtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlU3RyaW5nO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB3YXRjaEZvcm1Db250cm9sKHRlbXBsYXRlU3RyaW5nKSB7XG4gICAgICAgIGxldCBzdG9wV2F0Y2hpbmdGaWVsZCA9IGFuZ3VsYXIubm9vcDtcbiAgICAgICAgbGV0IHN0b3BXYXRjaGluZ1Nob3dFcnJvciA9IGFuZ3VsYXIubm9vcDtcbiAgICAgICAgaWYgKHNjb3BlLm9wdGlvbnMubm9Gb3JtQ29udHJvbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0ZW1wbGF0ZUVsID0gYW5ndWxhci5lbGVtZW50KGA8ZGl2PiR7dGVtcGxhdGVTdHJpbmd9PC9kaXY+YCk7XG4gICAgICAgIGNvbnN0IG5nTW9kZWxOb2RlID0gdGVtcGxhdGVFbFswXS5xdWVyeVNlbGVjdG9yKCdbbmctbW9kZWxdJyk7XG4gICAgICAgIGlmIChuZ01vZGVsTm9kZSAmJiBuZ01vZGVsTm9kZS5uYW1lKSB7XG4gICAgICAgICAgd2F0Y2hGaWVsZE5hbWVPckV4aXN0ZW5jZShuZ01vZGVsTm9kZS5uYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHdhdGNoRmllbGROYW1lT3JFeGlzdGVuY2UobmFtZSkge1xuICAgICAgICAgIGNvbnN0IG5hbWVFeHByZXNzaW9uUmVnZXggPSAvXFx7XFx7KC4qPyl9fS87XG4gICAgICAgICAgY29uc3QgbmFtZUV4cHJlc3Npb24gPSBuYW1lRXhwcmVzc2lvblJlZ2V4LmV4ZWMobmFtZSk7XG4gICAgICAgICAgaWYgKG5hbWVFeHByZXNzaW9uKSB7XG4gICAgICAgICAgICB3YXRjaEZpZWxkTmFtZShuYW1lRXhwcmVzc2lvblsxXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdhdGNoRmllbGRFeGlzdGVuY2UobmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gd2F0Y2hGaWVsZE5hbWUoZXhwcmVzc2lvbikge1xuICAgICAgICAgIHNjb3BlLiR3YXRjaChleHByZXNzaW9uLCBmdW5jdGlvbiBvbmVGaWVsZE5hbWVDaGFuZ2UobmFtZSkge1xuICAgICAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgICAgc3RvcFdhdGNoaW5nRmllbGQoKTtcbiAgICAgICAgICAgICAgd2F0Y2hGaWVsZEV4aXN0ZW5jZShuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHdhdGNoRmllbGRFeGlzdGVuY2UobmFtZSkge1xuICAgICAgICAgIHN0b3BXYXRjaGluZ0ZpZWxkID0gc2NvcGUuJHdhdGNoKGBmb3JtW1wiJHtuYW1lfVwiXWAsIGZ1bmN0aW9uIGZvcm1Db250cm9sQ2hhbmdlKGZvcm1Db250cm9sKSB7XG4gICAgICAgICAgICBpZiAoZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgc2NvcGUuZmMgPSBmb3JtQ29udHJvbDsgLy8gc2hvcnRjdXQgZm9yIHRlbXBsYXRlIGF1dGhvcnNcbiAgICAgICAgICAgICAgc2NvcGUub3B0aW9ucy5mb3JtQ29udHJvbCA9IGZvcm1Db250cm9sO1xuICAgICAgICAgICAgICBzdG9wV2F0Y2hpbmdTaG93RXJyb3IoKTtcbiAgICAgICAgICAgICAgYWRkU2hvd01lc3NhZ2VzV2F0Y2hlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkU2hvd01lc3NhZ2VzV2F0Y2hlcigpIHtcbiAgICAgICAgICBzdG9wV2F0Y2hpbmdTaG93RXJyb3IgPSBzY29wZS4kd2F0Y2goZnVuY3Rpb24gd2F0Y2hTaG93VmFsaWRhdGlvbkNoYW5nZSgpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2NvcGUub3B0aW9ucy52YWxpZGF0aW9uLnNob3cgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICByZXR1cm4gc2NvcGUuZmMuJGludmFsaWQgJiYgc2NvcGUub3B0aW9ucy52YWxpZGF0aW9uLnNob3c7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsZXQgbm9Ub3VjaGVkQnV0RGlydHkgPSAoYW5ndWxhci5pc1VuZGVmaW5lZChzY29wZS5mYy4kdG91Y2hlZCkgJiYgc2NvcGUuZmMuJGRpcnR5KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHNjb3BlLmZjLiRpbnZhbGlkICYmIChzY29wZS5mYy4kdG91Y2hlZCB8fCBub1RvdWNoZWRCdXREaXJ0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZnVuY3Rpb24gb25TaG93VmFsaWRhdGlvbkNoYW5nZShzaG93KSB7XG4gICAgICAgICAgICBzY29wZS5vcHRpb25zLnZhbGlkYXRpb24uZXJyb3JFeGlzdHNBbmRTaG91bGRCZVZpc2libGUgPSBzaG93O1xuICAgICAgICAgICAgc2NvcGUuc2hvd0Vycm9yID0gc2hvdzsgLy8gc2hvcnRjdXQgZm9yIHRlbXBsYXRlIGF1dGhvcnNcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBjYWxsTGlua0Z1bmN0aW9ucygpIHtcbiAgICAgICAgaWYgKHR5cGUgJiYgdHlwZS5saW5rKSB7XG4gICAgICAgICAgdHlwZS5saW5rLmFwcGx5KHRodXNseSwgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLm9wdGlvbnMubGluaykge1xuICAgICAgICAgIHNjb3BlLm9wdGlvbnMubGluay5hcHBseSh0aHVzbHksIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICB9XG5cblxuICAgICAgZnVuY3Rpb24gcnVuTWFuaXB1bGF0b3JzKG1hbmlwdWxhdG9ycykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gcnVuTWFuaXB1bGF0b3JzT25UZW1wbGF0ZSh0ZW1wbGF0ZSkge1xuICAgICAgICAgIHZhciBjaGFpbiA9ICRxLndoZW4odGVtcGxhdGUpO1xuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChtYW5pcHVsYXRvcnMsIG1hbmlwdWxhdG9yID0+IHtcbiAgICAgICAgICAgIGNoYWluID0gY2hhaW4udGhlbih0ZW1wbGF0ZSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKG1hbmlwdWxhdG9yKHRlbXBsYXRlLCBzY29wZS5vcHRpb25zLCBzY29wZSkpLnRoZW4obmV3VGVtcGxhdGUgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmlzU3RyaW5nKG5ld1RlbXBsYXRlKSA/IG5ld1RlbXBsYXRlIDogYXNIdG1sKG5ld1RlbXBsYXRlKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIGFzSHRtbChlbCkge1xuICAgIHZhciB3cmFwcGVyID0gYW5ndWxhci5lbGVtZW50KCc8YT48L2E+Jyk7XG4gICAgcmV0dXJuIHdyYXBwZXIuYXBwZW5kKGVsKS5odG1sKCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRGaWVsZFRlbXBsYXRlKG9wdGlvbnMpIHtcbiAgICBsZXQgdHlwZSA9IGZvcm1seUNvbmZpZy5nZXRUeXBlKG9wdGlvbnMudHlwZSwgdHJ1ZSwgb3B0aW9ucyk7XG4gICAgbGV0IHRlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZSB8fCB0eXBlICYmIHR5cGUudGVtcGxhdGU7XG4gICAgbGV0IHRlbXBsYXRlVXJsID0gb3B0aW9ucy50ZW1wbGF0ZVVybCB8fCB0eXBlICYmIHR5cGUudGVtcGxhdGVVcmw7XG4gICAgaWYgKCF0ZW1wbGF0ZSAmJiAhdGVtcGxhdGVVcmwpIHtcbiAgICAgIHRocm93IGZvcm1seVVzYWJpbGl0eS5nZXRGaWVsZEVycm9yKFxuICAgICAgICAndHlwZS10eXBlLWhhcy1uby10ZW1wbGF0ZScsXG4gICAgICAgIGBUeXBlICcke29wdGlvbnMudHlwZX0nIGhhcyBub3QgdGVtcGxhdGUuIE9uIGVsZW1lbnQ6YCwgb3B0aW9uc1xuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0VGVtcGxhdGUodGVtcGxhdGUgfHwgdGVtcGxhdGVVcmwsICF0ZW1wbGF0ZSwgb3B0aW9ucyk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGdldFRlbXBsYXRlKHRlbXBsYXRlLCBpc1VybCwgb3B0aW9ucykge1xuICAgIGxldCB0ZW1wbGF0ZVByb21pc2U7XG4gICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih0ZW1wbGF0ZSkpIHtcbiAgICAgIHRlbXBsYXRlUHJvbWlzZSA9ICRxLndoZW4odGVtcGxhdGUob3B0aW9ucykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ZW1wbGF0ZVByb21pc2UgPSAkcS53aGVuKHRlbXBsYXRlKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzVXJsKSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGVQcm9taXNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgaHR0cE9wdGlvbnMgPSB7Y2FjaGU6ICR0ZW1wbGF0ZUNhY2hlfTtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZVByb21pc2VcbiAgICAgICAgLnRoZW4oKHVybCkgPT4gJGh0dHAuZ2V0KHVybCwgaHR0cE9wdGlvbnMpKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmRhdGEpXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiBoYW5kbGVFcnJvckdldHRpbmdBVGVtcGxhdGUoZXJyb3IpIHtcbiAgICAgICAgICBmb3JtbHlXYXJuKFxuICAgICAgICAgICAgJ3Byb2JsZW0tbG9hZGluZy10ZW1wbGF0ZS1mb3ItdGVtcGxhdGV1cmwnLFxuICAgICAgICAgICAgJ1Byb2JsZW0gbG9hZGluZyB0ZW1wbGF0ZSBmb3IgJyArIHRlbXBsYXRlLFxuICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2NsdWRlSW5XcmFwcGVycyhvcHRpb25zKSB7XG4gICAgbGV0IHdyYXBwZXIgPSBnZXRXcmFwcGVyT3B0aW9uKG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHRyYW5zY2x1ZGVUZW1wbGF0ZSh0ZW1wbGF0ZSkge1xuICAgICAgaWYgKCF3cmFwcGVyLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gJHEud2hlbih0ZW1wbGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIHdyYXBwZXIuZm9yRWFjaCgod3JhcHBlcikgPT4ge1xuICAgICAgICBmb3JtbHlVc2FiaWxpdHkuY2hlY2tXcmFwcGVyKHdyYXBwZXIsIG9wdGlvbnMpO1xuICAgICAgICB3cmFwcGVyLnZhbGlkYXRlT3B0aW9ucyAmJiB3cmFwcGVyLnZhbGlkYXRlT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgcnVuQXBpQ2hlY2sod3JhcHBlciwgb3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICAgIGxldCBwcm9taXNlcyA9IHdyYXBwZXIubWFwKHcgPT4gZ2V0VGVtcGxhdGUody50ZW1wbGF0ZSB8fCB3LnRlbXBsYXRlVXJsLCAhdy50ZW1wbGF0ZSkpO1xuICAgICAgcmV0dXJuICRxLmFsbChwcm9taXNlcykudGhlbih3cmFwcGVyc1RlbXBsYXRlcyA9PiB7XG4gICAgICAgIHdyYXBwZXJzVGVtcGxhdGVzLmZvckVhY2goKHdyYXBwZXJUZW1wbGF0ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBmb3JtbHlVc2FiaWxpdHkuY2hlY2tXcmFwcGVyVGVtcGxhdGUod3JhcHBlclRlbXBsYXRlLCB3cmFwcGVyW2luZGV4XSk7XG4gICAgICAgIH0pO1xuICAgICAgICB3cmFwcGVyc1RlbXBsYXRlcy5yZXZlcnNlKCk7IC8vIHdyYXBwZXIgMCBpcyB3cmFwcGVkIGluIHdyYXBwZXIgMSBhbmQgc28gb24uLi5cbiAgICAgICAgbGV0IHRvdGFsV3JhcHBlciA9IHdyYXBwZXJzVGVtcGxhdGVzLnNoaWZ0KCk7XG4gICAgICAgIHdyYXBwZXJzVGVtcGxhdGVzLmZvckVhY2god3JhcHBlclRlbXBsYXRlID0+IHtcbiAgICAgICAgICB0b3RhbFdyYXBwZXIgPSBkb1RyYW5zY2x1c2lvbih0b3RhbFdyYXBwZXIsIHdyYXBwZXJUZW1wbGF0ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZG9UcmFuc2NsdXNpb24odG90YWxXcmFwcGVyLCB0ZW1wbGF0ZSk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZG9UcmFuc2NsdXNpb24od3JhcHBlciwgdGVtcGxhdGUpIHtcbiAgICBsZXQgc3VwZXJXcmFwcGVyID0gYW5ndWxhci5lbGVtZW50KCc8YT48L2E+Jyk7IC8vIHRoaXMgYWxsb3dzIHBlb3BsZSBub3QgaGF2ZSB0byBoYXZlIGEgc2luZ2xlIHJvb3QgaW4gd3JhcHBlcnNcbiAgICBzdXBlcldyYXBwZXIuYXBwZW5kKHdyYXBwZXIpO1xuICAgIGxldCB0cmFuc2NsdWRlRWwgPSBzdXBlcldyYXBwZXIuZmluZCgnZm9ybWx5LXRyYW5zY2x1ZGUnKTtcbiAgICBpZiAoIXRyYW5zY2x1ZGVFbC5sZW5ndGgpIHtcbiAgICAgIC8vdHJ5IGl0IHVzaW5nIG91ciBjdXN0b20gZmluZCBmdW5jdGlvblxuICAgICAgdHJhbnNjbHVkZUVsID0gZm9ybWx5VXRpbC5maW5kQnlOb2RlTmFtZShzdXBlcldyYXBwZXIsICdmb3JtbHktdHJhbnNjbHVkZScpO1xuICAgIH1cbiAgICB0cmFuc2NsdWRlRWwucmVwbGFjZVdpdGgodGVtcGxhdGUpO1xuICAgIHJldHVybiBzdXBlcldyYXBwZXIuaHRtbCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0V3JhcHBlck9wdGlvbihvcHRpb25zKSB7XG4gICAgbGV0IHdyYXBwZXIgPSBvcHRpb25zLndyYXBwZXI7XG4gICAgLy8gZXhwbGljaXQgbnVsbCBtZWFucyBubyB3cmFwcGVyXG4gICAgaWYgKHdyYXBwZXIgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICAvLyBub3RoaW5nIHNwZWNpZmllZCBtZWFucyB1c2UgdGhlIGRlZmF1bHQgd3JhcHBlciBmb3IgdGhlIHR5cGVcbiAgICBpZiAoIXdyYXBwZXIpIHtcbiAgICAgIC8vIGdldCBhbGwgd3JhcHBlcnMgdGhhdCBzcGVjaWZ5IHRoZXkgYXBwbHkgdG8gdGhpcyB0eXBlXG4gICAgICB3cmFwcGVyID0gYXJyYXlpZnkoZm9ybWx5Q29uZmlnLmdldFdyYXBwZXJCeVR5cGUob3B0aW9ucy50eXBlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdyYXBwZXIgPSBhcnJheWlmeSh3cmFwcGVyKS5tYXAoZm9ybWx5Q29uZmlnLmdldFdyYXBwZXIpO1xuICAgIH1cblxuICAgIC8vIGdldCBhbGwgd3JhcHBlcnMgZm9yIHRoYXQgdGhpcyB0eXBlIHNwZWNpZmllZCB0aGF0IGl0IHVzZXMuXG4gICAgdmFyIHR5cGUgPSBmb3JtbHlDb25maWcuZ2V0VHlwZShvcHRpb25zLnR5cGUsIHRydWUsIG9wdGlvbnMpO1xuICAgIGlmICh0eXBlICYmIHR5cGUud3JhcHBlcikge1xuICAgICAgbGV0IHR5cGVXcmFwcGVycyA9IGFycmF5aWZ5KHR5cGUud3JhcHBlcikubWFwKGZvcm1seUNvbmZpZy5nZXRXcmFwcGVyKTtcbiAgICAgIHdyYXBwZXIgPSB3cmFwcGVyLmNvbmNhdCh0eXBlV3JhcHBlcnMpO1xuICAgIH1cblxuICAgIC8vIGFkZCB0aGUgZGVmYXVsdCB3cmFwcGVyIGxhc3RcbiAgICB2YXIgZGVmYXVsdFdyYXBwZXIgPSBmb3JtbHlDb25maWcuZ2V0V3JhcHBlcigpO1xuICAgIGlmIChkZWZhdWx0V3JhcHBlcikge1xuICAgICAgd3JhcHBlci5wdXNoKGRlZmF1bHRXcmFwcGVyKTtcbiAgICB9XG4gICAgcmV0dXJuIHdyYXBwZXI7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0FwaShvcHRpb25zKSB7XG4gICAgZm9ybWx5QXBpQ2hlY2sudGhyb3coZm9ybWx5QXBpQ2hlY2suZm9ybWx5RmllbGRPcHRpb25zLCBvcHRpb25zLCB7XG4gICAgICBwcmVmaXg6ICdmb3JtbHktZmllbGQgZGlyZWN0aXZlJyxcbiAgICAgIHVybDogJ2Zvcm1seS1maWVsZC1kaXJlY3RpdmUtdmFsaWRhdGlvbi1mYWlsZWQnXG4gICAgfSk7XG4gICAgLy8gdmFsaWRhdGUgd2l0aCB0aGUgdHlwZVxuICAgIGNvbnN0IHR5cGUgPSBvcHRpb25zLnR5cGUgJiYgZm9ybWx5Q29uZmlnLmdldFR5cGUob3B0aW9ucy50eXBlKTtcbiAgICBpZiAodHlwZSkge1xuICAgICAgaWYgKHR5cGUudmFsaWRhdGVPcHRpb25zKSB7XG4gICAgICAgIHR5cGUudmFsaWRhdGVPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgcnVuQXBpQ2hlY2sodHlwZSwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tGaWVsZEdyb3VwQXBpKG9wdGlvbnMpIHtcbiAgICBmb3JtbHlBcGlDaGVjay50aHJvdyhmb3JtbHlBcGlDaGVjay5maWVsZEdyb3VwLCBvcHRpb25zLCB7XG4gICAgICBwcmVmaXg6ICdmb3JtbHktZmllbGQgZGlyZWN0aXZlJyxcbiAgICAgIHVybDogJ2Zvcm1seS1maWVsZC1kaXJlY3RpdmUtdmFsaWRhdGlvbi1mYWlsZWQnXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBydW5BcGlDaGVjayh7YXBpQ2hlY2ssIGFwaUNoZWNrSW5zdGFuY2UsIGFwaUNoZWNrRnVuY3Rpb24sIGFwaUNoZWNrT3B0aW9uc30sIG9wdGlvbnMpIHtcbiAgICBpZiAoIWFwaUNoZWNrKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGluc3RhbmNlID0gYXBpQ2hlY2tJbnN0YW5jZSB8fCBmb3JtbHlBcGlDaGVjaztcbiAgICBjb25zdCBmbiA9IGFwaUNoZWNrRnVuY3Rpb24gfHwgJ3dhcm4nO1xuICAgIGNvbnN0IHNoYXBlID0gaW5zdGFuY2Uuc2hhcGUoYXBpQ2hlY2spO1xuICAgIGluc3RhbmNlW2ZuXShzaGFwZSwgb3B0aW9ucywgYXBpQ2hlY2tPcHRpb25zIHx8IHtcbiAgICAgICAgcHJlZml4OiBgZm9ybWx5LWZpZWxkICR7bmFtZX1gLFxuICAgICAgICB1cmw6IGZvcm1seUFwaUNoZWNrLmNvbmZpZy5vdXRwdXQuZG9jc0Jhc2VVcmwgKyAnZm9ybWx5LWZpZWxkLXR5cGUtYXBpY2hlY2stZmFpbGVkJ1xuICAgICAgfSk7XG4gIH1cblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vZGlyZWN0aXZlcy9mb3JtbHktZmllbGQuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmb3JtbHlGb2N1cztcblxuLy8gQG5nSW5qZWN0XG5mdW5jdGlvbiBmb3JtbHlGb2N1cygkdGltZW91dCwgJGRvY3VtZW50KSB7XG4gIC8qIGpzaGludCAtVzA1MiAqL1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgbGluazogZnVuY3Rpb24gZm9ybWx5Rm9jdXNMaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgdmFyIHByZXZpb3VzRWwgPSBudWxsO1xuICAgICAgdmFyIGVsID0gZWxlbWVudFswXTtcbiAgICAgIHZhciBkb2MgPSAkZG9jdW1lbnRbMF07XG4gICAgICBhdHRycy4kb2JzZXJ2ZSgnZm9ybWx5Rm9jdXMnLCBmdW5jdGlvbiByZXNwb25kVG9Gb2N1c0V4cHJlc3Npb25DaGFuZ2UodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiBzZXRFbGVtZW50Rm9jdXMoKSB7XG4gICAgICAgICAgICBwcmV2aW91c0VsID0gZG9jLmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICBlbC5mb2N1cygpO1xuICAgICAgICAgIH0sIH5+YXR0cnMuZm9jdXNXYWl0KTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJ2ZhbHNlJykge1xuICAgICAgICAgIGlmIChkb2MuYWN0aXZlRWxlbWVudCA9PT0gZWwpIHtcbiAgICAgICAgICAgIGVsLmJsdXIoKTtcbiAgICAgICAgICAgIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eSgncmVmb2N1cycpICYmIHByZXZpb3VzRWwpIHtcbiAgICAgICAgICAgICAgcHJldmlvdXNFbC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vZGlyZWN0aXZlcy9mb3JtbHktZm9jdXMuanNcbiAqKi8iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyLWZpeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1seUZvcm07XG5cbi8qKlxuICogQG5nZG9jIGRpcmVjdGl2ZVxuICogQG5hbWUgZm9ybWx5Rm9ybVxuICogQHJlc3RyaWN0IEVcbiAqL1xuLy8gQG5nSW5qZWN0XG5mdW5jdGlvbiBmb3JtbHlGb3JtKGZvcm1seVVzYWJpbGl0eSwgJHBhcnNlLCBmb3JtbHlBcGlDaGVjaywgZm9ybWx5Q29uZmlnKSB7XG4gIHZhciBjdXJyZW50Rm9ybUlkID0gMTtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHRlbXBsYXRlOiBmdW5jdGlvbiBmb3JtbHlGb3JtR2V0VGVtcGxhdGUoZWwsIGF0dHJzKSB7XG4gICAgICAvKiBqc2hpbnQgLVcwMzMgKi8gLy8gdGhpcyBiZWNhdXNlIGpzaGludCBpcyBicm9rZW4gSSBndWVzcy4uLlxuICAgICAgY29uc3Qgcm9vdEVsID0gZ2V0Um9vdEVsKCk7XG4gICAgICBjb25zdCBmaWVsZFJvb3RFbCA9IGdldEZpZWxkUm9vdEVsKCk7XG4gICAgICBjb25zdCBmb3JtSWQgPSBgZm9ybWx5XyR7Y3VycmVudEZvcm1JZCsrfWA7XG4gICAgICBsZXQgcGFyZW50Rm9ybUF0dHJpYnV0ZXM7XG4gICAgICBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkoJ2lzRmllbGRHcm91cCcpICYmIGVsLnBhcmVudCgpLnBhcmVudCgpLmhhc0NsYXNzKCdmb3JtbHknKSkge1xuICAgICAgICBwYXJlbnRGb3JtQXR0cmlidXRlcyA9IGNvcHlBdHRyaWJ1dGVzKGVsLnBhcmVudCgpLnBhcmVudCgpWzBdLmF0dHJpYnV0ZXMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGBcbiAgICAgICAgPCR7cm9vdEVsfSBjbGFzcz1cImZvcm1seVwiXG4gICAgICAgICAgICAgICAgIG5hbWU9XCIke2dldEZvcm1OYW1lKCl9XCJcbiAgICAgICAgICAgICAgICAgcm9sZT1cImZvcm1cIiAke3BhcmVudEZvcm1BdHRyaWJ1dGVzfT5cbiAgICAgICAgICA8JHtmaWVsZFJvb3RFbH0gZm9ybWx5LWZpZWxkXG4gICAgICAgICAgICAgICBuZy1yZXBlYXQ9XCJmaWVsZCBpbiBmaWVsZHMgJHtnZXRUcmFja0J5KCl9XCJcbiAgICAgICAgICAgICAgICR7Z2V0SGlkZURpcmVjdGl2ZSgpfT1cIiFmaWVsZC5oaWRlXCJcbiAgICAgICAgICAgICAgIGNsYXNzPVwiZm9ybWx5LWZpZWxkXCJcbiAgICAgICAgICAgICAgIG9wdGlvbnM9XCJmaWVsZFwiXG4gICAgICAgICAgICAgICBtb2RlbD1cImZpZWxkLm1vZGVsIHx8IG1vZGVsXCJcbiAgICAgICAgICAgICAgIGZpZWxkcz1cImZpZWxkc1wiXG4gICAgICAgICAgICAgICBmb3JtPVwiJHtmb3JtSWR9XCJcbiAgICAgICAgICAgICAgIGZvcm0taWQ9XCIke2Zvcm1JZH1cIlxuICAgICAgICAgICAgICAgZm9ybS1zdGF0ZT1cIm9wdGlvbnMuZm9ybVN0YXRlXCJcbiAgICAgICAgICAgICAgIGluZGV4PVwiJGluZGV4XCI+XG4gICAgICAgICAgPC8ke2ZpZWxkUm9vdEVsfT5cbiAgICAgICAgICA8ZGl2IG5nLXRyYW5zY2x1ZGU+PC9kaXY+XG4gICAgICAgIDwvJHtyb290RWx9PlxuICAgICAgYDtcblxuICAgICAgZnVuY3Rpb24gZ2V0Um9vdEVsKCkge1xuICAgICAgICByZXR1cm4gYXR0cnMucm9vdEVsIHx8ICduZy1mb3JtJztcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZ2V0RmllbGRSb290RWwoKSB7XG4gICAgICAgIHJldHVybiBhdHRycy5maWVsZFJvb3RFbCB8fCAnZGl2JztcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZ2V0SGlkZURpcmVjdGl2ZSgpIHtcbiAgICAgICAgcmV0dXJuIGF0dHJzLmhpZGVEaXJlY3RpdmUgfHwgZm9ybWx5Q29uZmlnLmV4dHJhcy5kZWZhdWx0SGlkZURpcmVjdGl2ZSB8fCAnbmctaWYnO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRUcmFja0J5KCkge1xuICAgICAgICBpZiAoIWF0dHJzLnRyYWNrQnkpIHtcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGB0cmFjayBieSAke2F0dHJzLnRyYWNrQnl9YDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRGb3JtTmFtZSgpIHtcbiAgICAgICAgbGV0IGZvcm1OYW1lID0gZm9ybUlkO1xuICAgICAgICBjb25zdCBiaW5kTmFtZSA9IGF0dHJzLmJpbmROYW1lO1xuICAgICAgICBpZiAoYmluZE5hbWUpIHtcbiAgICAgICAgICBpZiAoYW5ndWxhci52ZXJzaW9uLm1pbm9yIDwgMykge1xuICAgICAgICAgICAgdGhyb3cgZm9ybWx5VXNhYmlsaXR5LmdldEZvcm1seUVycm9yKCdiaW5kLW5hbWUgYXR0cmlidXRlIG9uIGZvcm1seS1mb3JtIG5vdCBhbGxvd2VkIGluID4gYW5ndWxhciAxLjMnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gd2UgY2FuIGRvIGEgb25lLXRpbWUgYmluZGluZyBoZXJlIGJlY2F1c2Ugd2Uga25vdyB3ZSdyZSBpbiAxLjMueCB0ZXJyaXRvcnlcbiAgICAgICAgICBmb3JtTmFtZSA9IGB7ezo6J2Zvcm1seV8nICsgJHtiaW5kTmFtZX19fWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1OYW1lO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBjb3B5QXR0cmlidXRlcyhhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGNvbnN0IGV4Y2x1ZGVkID0gWydtb2RlbCcsICdmb3JtJywgJ2ZpZWxkcycsICdvcHRpb25zJywgJ25hbWUnLCAncm9sZScsICdjbGFzcyddO1xuICAgICAgICBjb25zdCBhcnJheUF0dHJzID0gW107XG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChhdHRyaWJ1dGVzLCAoe25vZGVOYW1lLCBub2RlVmFsdWV9KSA9PiB7XG4gICAgICAgICAgaWYgKG5vZGVOYW1lICE9PSAndW5kZWZpbmVkJyAmJiBleGNsdWRlZC5pbmRleE9mKG5vZGVOYW1lKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIGFycmF5QXR0cnMucHVzaChgJHt0b0tlYmFiQ2FzZShub2RlTmFtZSl9PVwiJHtub2RlVmFsdWV9XCJgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYXJyYXlBdHRycy5qb2luKCcgJyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHRvS2ViYWJDYXNlKHN0cmluZykge1xuICAgICAgICBpZiAoc3RyaW5nKSB7XG4gICAgICAgICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oW0EtWl0pL2csICQxID0+ICctJyArICQxLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICB0cmFuc2NsdWRlOiB0cnVlLFxuICAgIHNjb3BlOiB7XG4gICAgICBmaWVsZHM6ICc9JyxcbiAgICAgIG1vZGVsOiAnPScsXG4gICAgICBmb3JtOiAnPT8nLFxuICAgICAgb3B0aW9uczogJz0/J1xuICAgIH0sXG4gICAgY29udHJvbGxlcjogLyogQG5nSW5qZWN0ICovIGZ1bmN0aW9uIEZvcm1seUZvcm1Db250cm9sbGVyKCRzY29wZSwgZm9ybWx5VXRpbCkge1xuICAgICAgc2V0dXBPcHRpb25zKCk7XG4gICAgICAkc2NvcGUubW9kZWwgPSAkc2NvcGUubW9kZWwgfHwge307XG4gICAgICAkc2NvcGUuZmllbGRzID0gJHNjb3BlLmZpZWxkcyB8fCBbXTtcblxuICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5maWVsZHMsIGF0dGFjaEtleSk7IC8vIGF0dGFjaGVzIGEga2V5IGJhc2VkIG9uIHRoZSBpbmRleCBpZiBhIGtleSBpc24ndCBzcGVjaWZpZWRcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZmllbGRzLCBzZXR1cFdhdGNoZXJzKTsgLy8gc2V0dXAgd2F0Y2hlcnMgZm9yIGFsbCBmaWVsZHNcblxuICAgICAgLy8gd2F0Y2ggdGhlIG1vZGVsIGFuZCBldmFsdWF0ZSB3YXRjaCBleHByZXNzaW9ucyB0aGF0IGRlcGVuZCBvbiBpdC5cbiAgICAgICRzY29wZS4kd2F0Y2goJ21vZGVsJywgb25Nb2RlbE9yRm9ybVN0YXRlQ2hhbmdlLCB0cnVlKTtcbiAgICAgIGlmICgkc2NvcGUub3B0aW9ucy5mb3JtU3RhdGUpIHtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnb3B0aW9ucy5mb3JtU3RhdGUnLCBvbk1vZGVsT3JGb3JtU3RhdGVDaGFuZ2UsIHRydWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvbk1vZGVsT3JGb3JtU3RhdGVDaGFuZ2UoKSB7XG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZmllbGRzLCBmdW5jdGlvbiBydW5GaWVsZEV4cHJlc3Npb25Qcm9wZXJ0aWVzKGZpZWxkLCBpbmRleCkge1xuICAgICAgICAgIC8qanNoaW50IC1XMDMwICovXG4gICAgICAgICAgY29uc3QgbW9kZWwgPSBmaWVsZC5tb2RlbCB8fCAkc2NvcGUubW9kZWw7XG4gICAgICAgICAgZmllbGQucnVuRXhwcmVzc2lvbnMgJiYgZmllbGQucnVuRXhwcmVzc2lvbnMobW9kZWwpO1xuICAgICAgICAgIGlmIChmaWVsZC5oaWRlRXhwcmVzc2lvbikgeyAvLyBjYW4ndCB1c2UgaGlkZSB3aXRoIGV4cHJlc3Npb25Qcm9wZXJ0aWVzIHJlbGlhYmx5XG4gICAgICAgICAgICBjb25zdCB2YWwgPSBtb2RlbFtmaWVsZC5rZXldO1xuICAgICAgICAgICAgLy8gdGhpcyBtYWtlcyBpdCBjbG9zZXIgdG8gd2hhdCBhIHJlZ3VsYXIgZXhwcmVzc2lvblByb3BlcnR5IHdvdWxkIGJlXG4gICAgICAgICAgICBjb25zdCBleHRyYUxvY2FscyA9IHtcbiAgICAgICAgICAgICAgb3B0aW9uczogZmllbGQsXG4gICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgZm9ybVN0YXRlOiAkc2NvcGUub3B0aW9ucy5mb3JtU3RhdGUsXG4gICAgICAgICAgICAgIGZvcm1JZDogJHNjb3BlLmZvcm1JZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZpZWxkLmhpZGUgPSBmb3JtbHlVdGlsLmZvcm1seUV2YWwoJHNjb3BlLCBmaWVsZC5oaWRlRXhwcmVzc2lvbiwgdmFsLCB2YWwsIGV4dHJhTG9jYWxzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzZXR1cE9wdGlvbnMoKSB7XG4gICAgICAgIGZvcm1seUFwaUNoZWNrLnRocm93KFxuICAgICAgICAgIFtmb3JtbHlBcGlDaGVjay5mb3JtT3B0aW9uc0FwaS5vcHRpb25hbF0sIFskc2NvcGUub3B0aW9uc10sIHtwcmVmaXg6ICdmb3JtbHktZm9ybSBvcHRpb25zIGNoZWNrJ31cbiAgICAgICAgKTtcbiAgICAgICAgJHNjb3BlLm9wdGlvbnMgPSAkc2NvcGUub3B0aW9ucyB8fCB7fTtcbiAgICAgICAgJHNjb3BlLm9wdGlvbnMuZm9ybVN0YXRlID0gJHNjb3BlLm9wdGlvbnMuZm9ybVN0YXRlIHx8IHt9O1xuXG4gICAgICAgIGFuZ3VsYXIuZXh0ZW5kKCRzY29wZS5vcHRpb25zLCB7XG4gICAgICAgICAgdXBkYXRlSW5pdGlhbFZhbHVlLFxuICAgICAgICAgIHJlc2V0TW9kZWxcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdXBkYXRlSW5pdGlhbFZhbHVlKCkge1xuICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgZmllbGQgPT4ge1xuICAgICAgICAgIGlmIChpc0ZpZWxkR3JvdXAoZmllbGQpKSB7XG4gICAgICAgICAgICBmaWVsZC5vcHRpb25zLnVwZGF0ZUluaXRpYWxWYWx1ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmaWVsZC51cGRhdGVJbml0aWFsVmFsdWUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiByZXNldE1vZGVsKCkge1xuICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgZmllbGQgPT4ge1xuICAgICAgICAgIGlmIChpc0ZpZWxkR3JvdXAoZmllbGQpKSB7XG4gICAgICAgICAgICBmaWVsZC5vcHRpb25zLnJlc2V0TW9kZWwoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmllbGQucmVzZXRNb2RlbCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGF0dGFjaEtleShmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKCFpc0ZpZWxkR3JvdXAoZmllbGQpKSB7XG4gICAgICAgICAgZmllbGQua2V5ID0gZmllbGQua2V5IHx8IGluZGV4IHx8IDA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2V0dXBXYXRjaGVycyhmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKGlzRmllbGRHcm91cChmaWVsZCkgfHwgIWFuZ3VsYXIuaXNEZWZpbmVkKGZpZWxkLndhdGNoZXIpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciB3YXRjaGVycyA9IGZpZWxkLndhdGNoZXI7XG4gICAgICAgIGlmICghYW5ndWxhci5pc0FycmF5KHdhdGNoZXJzKSkge1xuICAgICAgICAgIHdhdGNoZXJzID0gW3dhdGNoZXJzXTtcbiAgICAgICAgfVxuICAgICAgICBhbmd1bGFyLmZvckVhY2god2F0Y2hlcnMsIGZ1bmN0aW9uIHNldHVwV2F0Y2hlcih3YXRjaGVyKSB7XG4gICAgICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZCh3YXRjaGVyLmxpc3RlbmVyKSkge1xuICAgICAgICAgICAgdGhyb3cgZm9ybWx5VXNhYmlsaXR5LmdldEZpZWxkRXJyb3IoXG4gICAgICAgICAgICAgICdhbGwtZmllbGQtd2F0Y2hlcnMtbXVzdC1oYXZlLWEtbGlzdGVuZXInLFxuICAgICAgICAgICAgICAnQWxsIGZpZWxkIHdhdGNoZXJzIG11c3QgaGF2ZSBhIGxpc3RlbmVyJywgZmllbGRcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciB3YXRjaEV4cHJlc3Npb24gPSBnZXRXYXRjaEV4cHJlc3Npb24od2F0Y2hlciwgZmllbGQsIGluZGV4KTtcbiAgICAgICAgICB2YXIgd2F0Y2hMaXN0ZW5lciA9IGdldFdhdGNoTGlzdGVuZXIod2F0Y2hlciwgZmllbGQsIGluZGV4KTtcblxuICAgICAgICAgIHZhciB0eXBlID0gd2F0Y2hlci50eXBlIHx8ICckd2F0Y2gnO1xuICAgICAgICAgIHdhdGNoZXIuc3RvcFdhdGNoaW5nID0gJHNjb3BlW3R5cGVdKHdhdGNoRXhwcmVzc2lvbiwgd2F0Y2hMaXN0ZW5lciwgd2F0Y2hlci53YXRjaERlZXApO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZ2V0V2F0Y2hFeHByZXNzaW9uKHdhdGNoZXIsIGZpZWxkLCBpbmRleCkge1xuICAgICAgICB2YXIgd2F0Y2hFeHByZXNzaW9uID0gd2F0Y2hlci5leHByZXNzaW9uIHx8IGBtb2RlbFsnJHtmaWVsZC5rZXl9J11gO1xuICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHdhdGNoRXhwcmVzc2lvbikpIHtcbiAgICAgICAgICAvLyB3cmFwIHRoZSBmaWVsZCdzIHdhdGNoIGV4cHJlc3Npb24gc28gd2UgY2FuIGNhbGwgaXQgd2l0aCB0aGUgZmllbGQgYXMgdGhlIGZpcnN0IGFyZ1xuICAgICAgICAgIC8vIGFuZCB0aGUgc3RvcCBmdW5jdGlvbiBhcyB0aGUgbGFzdCBhcmcgYXMgYSBoZWxwZXJcbiAgICAgICAgICB2YXIgb3JpZ2luYWxFeHByZXNzaW9uID0gd2F0Y2hFeHByZXNzaW9uO1xuICAgICAgICAgIHdhdGNoRXhwcmVzc2lvbiA9IGZ1bmN0aW9uIGZvcm1seVdhdGNoRXhwcmVzc2lvbigpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gbW9kaWZ5QXJncyh3YXRjaGVyLCBpbmRleCwgLi4uYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbEV4cHJlc3Npb24oLi4uYXJncyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB3YXRjaEV4cHJlc3Npb24uZGlzcGxheU5hbWUgPSBgRm9ybWx5IFdhdGNoIEV4cHJlc3Npb24gZm9yIGZpZWxkIGZvciAke2ZpZWxkLmtleX1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB3YXRjaEV4cHJlc3Npb247XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGdldFdhdGNoTGlzdGVuZXIod2F0Y2hlciwgZmllbGQsIGluZGV4KSB7XG4gICAgICAgIHZhciB3YXRjaExpc3RlbmVyID0gd2F0Y2hlci5saXN0ZW5lcjtcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih3YXRjaExpc3RlbmVyKSkge1xuICAgICAgICAgIC8vIHdyYXAgdGhlIGZpZWxkJ3Mgd2F0Y2ggbGlzdGVuZXIgc28gd2UgY2FuIGNhbGwgaXQgd2l0aCB0aGUgZmllbGQgYXMgdGhlIGZpcnN0IGFyZ1xuICAgICAgICAgIC8vIGFuZCB0aGUgc3RvcCBmdW5jdGlvbiBhcyB0aGUgbGFzdCBhcmcgYXMgYSBoZWxwZXJcbiAgICAgICAgICB2YXIgb3JpZ2luYWxMaXN0ZW5lciA9IHdhdGNoTGlzdGVuZXI7XG4gICAgICAgICAgd2F0Y2hMaXN0ZW5lciA9IGZ1bmN0aW9uIGZvcm1seVdhdGNoTGlzdGVuZXIoKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IG1vZGlmeUFyZ3Mod2F0Y2hlciwgaW5kZXgsIC4uLmFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZXR1cm4gb3JpZ2luYWxMaXN0ZW5lciguLi5hcmdzKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHdhdGNoTGlzdGVuZXIuZGlzcGxheU5hbWUgPSBgRm9ybWx5IFdhdGNoIExpc3RlbmVyIGZvciBmaWVsZCBmb3IgJHtmaWVsZC5rZXl9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gd2F0Y2hMaXN0ZW5lcjtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gbW9kaWZ5QXJncyh3YXRjaGVyLCBpbmRleCwgLi4ub3JpZ2luYWxBcmdzKSB7XG4gICAgICAgIHJldHVybiBbJHNjb3BlLmZpZWxkc1tpbmRleF0sIC4uLm9yaWdpbmFsQXJncywgd2F0Y2hlci5zdG9wV2F0Y2hpbmddO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBpc0ZpZWxkR3JvdXAoZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIGZpZWxkICYmICEhZmllbGQuZmllbGRHcm91cDtcbiAgICAgIH1cbiAgICB9LFxuICAgIGxpbmsoc2NvcGUsIGVsLCBhdHRycykge1xuICAgICAgaWYgKGF0dHJzLmZvcm0pIHtcbiAgICAgICAgY29uc3QgZm9ybUlkID0gYXR0cnMubmFtZTtcbiAgICAgICAgc2NvcGUuZm9ybUlkID0gZm9ybUlkO1xuICAgICAgICAkcGFyc2UoYXR0cnMuZm9ybSkuYXNzaWduKHNjb3BlLiRwYXJlbnQsIHNjb3BlW2Zvcm1JZF0pO1xuICAgICAgfVxuXG4gICAgICAvLyBjaHJvbWUgYXV0b2NvbXBsZXRlIGxhbWVuZXNzXG4gICAgICAvLyBzZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2ODE1MyNjMTRcbiAgICAgIC8vIOGDmijgsqDnm4rgsqDhg5opICAgKOKVr8Kw4pahwrAp4pWv77i1IOKUu+KUgeKUuyAgICAo4pee4oC44pef77ybKVxuICAgICAgY29uc3QgZ2xvYmFsID0gZm9ybWx5Q29uZmlnLmV4dHJhcy5yZW1vdmVDaHJvbWVBdXRvQ29tcGxldGUgPT09IHRydWU7XG4gICAgICBjb25zdCBvZmZJbnN0YW5jZSA9IHNjb3BlLm9wdGlvbnMgJiYgc2NvcGUub3B0aW9ucy5yZW1vdmVDaHJvbWVBdXRvQ29tcGxldGUgPT09IGZhbHNlO1xuICAgICAgY29uc3Qgb25JbnN0YW5jZSA9IHNjb3BlLm9wdGlvbnMgJiYgc2NvcGUub3B0aW9ucy5yZW1vdmVDaHJvbWVBdXRvQ29tcGxldGUgPT09IHRydWU7XG4gICAgICBpZiAoKGdsb2JhbCAmJiAhb2ZmSW5zdGFuY2UpIHx8IG9uSW5zdGFuY2UpIHtcbiAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2F1dG9jb21wbGV0ZScsICdhZGRyZXNzLWxldmVsNCcpO1xuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsIHRydWUpO1xuICAgICAgICBlbFswXS5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vZGlyZWN0aXZlcy9mb3JtbHktZm9ybS5qc1xuICoqLyIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXItZml4JztcblxuZXhwb3J0IGRlZmF1bHQgYWRkRm9ybWx5TmdNb2RlbEF0dHJzTWFuaXB1bGF0b3I7XG5cbi8vIEBuZ0luamVjdFxuZnVuY3Rpb24gYWRkRm9ybWx5TmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IoZm9ybWx5Q29uZmlnKSB7XG4gIGlmIChmb3JtbHlDb25maWcuZXh0cmFzLmRpc2FibGVOZ01vZGVsQXR0cnNNYW5pcHVsYXRvcikge1xuICAgIHJldHVybjtcbiAgfVxuICBmb3JtbHlDb25maWcudGVtcGxhdGVNYW5pcHVsYXRvcnMucHJlV3JhcHBlci5wdXNoKG5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKTtcblxuXG4gIGZ1bmN0aW9uIG5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKHRlbXBsYXRlLCBvcHRpb25zLCBzY29wZSkge1xuICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjYgKi9cbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2YXIgZGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICBpZiAoZGF0YS5za2lwTmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICB9XG4gICAgZWwuaW5uZXJIVE1MID0gdGVtcGxhdGU7XG4gICAgdmFyIG1vZGVsTm9kZXMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCdbbmctbW9kZWxdJyk7XG4gICAgaWYgKCFtb2RlbE5vZGVzIHx8ICFtb2RlbE5vZGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH1cblxuICAgIGFkZElmTm90UHJlc2VudChtb2RlbE5vZGVzLCAnaWQnLCBzY29wZS5pZCk7XG4gICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsTm9kZXMsICduYW1lJywgc2NvcGUuaWQpO1xuXG4gICAgYWRkVmFsaWRhdGlvbigpO1xuICAgIGFkZE1vZGVsT3B0aW9ucygpO1xuICAgIGFkZFRlbXBsYXRlT3B0aW9uc0F0dHJzKCk7XG5cblxuICAgIHJldHVybiBlbC5pbm5lckhUTUw7XG5cblxuICAgIGZ1bmN0aW9uIGFkZFZhbGlkYXRpb24oKSB7XG4gICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy52YWxpZGF0b3JzKSB8fCBhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXMpKSB7XG4gICAgICAgIGFkZElmTm90UHJlc2VudChtb2RlbE5vZGVzLCAnZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uJywgJycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZE1vZGVsT3B0aW9ucygpIHtcbiAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLm1vZGVsT3B0aW9ucykpIHtcbiAgICAgICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsTm9kZXMsICduZy1tb2RlbC1vcHRpb25zJywgJ29wdGlvbnMubW9kZWxPcHRpb25zJyk7XG4gICAgICAgIGlmIChvcHRpb25zLm1vZGVsT3B0aW9ucy5nZXR0ZXJTZXR0ZXIpIHtcbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2gobW9kZWxOb2Rlcywgbm9kZSA9PiB7XG4gICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZSgnbmctbW9kZWwnLCAnb3B0aW9ucy52YWx1ZScpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVGVtcGxhdGVPcHRpb25zQXR0cnMoKSB7XG4gICAgICBpZiAoIW9wdGlvbnMudGVtcGxhdGVPcHRpb25zICYmICFvcHRpb25zLmV4cHJlc3Npb25Qcm9wZXJ0aWVzKSB7XG4gICAgICAgIC8vIG5vIG5lZWQgdG8gcnVuIHRoZXNlIGlmIHRoZXJlIGFyZSBubyB0ZW1wbGF0ZU9wdGlvbnMgb3IgZXhwcmVzc2lvblByb3BlcnRpZXNcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgdG8gPSBvcHRpb25zLnRlbXBsYXRlT3B0aW9ucyB8fCB7fTtcbiAgICAgIGNvbnN0IGVwID0gb3B0aW9ucy5leHByZXNzaW9uUHJvcGVydGllcyB8fCB7fTtcblxuICAgICAgbGV0IG5nTW9kZWxBdHRyaWJ1dGVzID0gZ2V0QnVpbHRJbkF0dHJpYnV0ZXMoKTtcblxuICAgICAgLy8gZXh0ZW5kIHdpdGggdGhlIHVzZXIncyBzcGVjaWZpY2F0aW9ucyB3aW5uaW5nXG4gICAgICBhbmd1bGFyLmV4dGVuZChuZ01vZGVsQXR0cmlidXRlcywgb3B0aW9ucy5uZ01vZGVsQXR0cnMpO1xuXG4gICAgICAvLyBGZWVsIGZyZWUgdG8gbWFrZSB0aGlzIG1vcmUgc2ltcGxlIDotKVxuICAgICAgYW5ndWxhci5mb3JFYWNoKG5nTW9kZWxBdHRyaWJ1dGVzLCAodmFsLCBuYW1lKSA9PiB7XG4gICAgICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjE0ICovXG4gICAgICAgIGxldCBhdHRyVmFsO1xuICAgICAgICBsZXQgYXR0ck5hbWU7XG4gICAgICAgIGNvbnN0IHJlZiA9IGBvcHRpb25zLnRlbXBsYXRlT3B0aW9uc1snJHtuYW1lfSddYDtcbiAgICAgICAgY29uc3QgdG9WYWwgPSB0b1tuYW1lXTtcbiAgICAgICAgY29uc3QgZXBWYWwgPSBnZXRFcFZhbHVlKGVwLCBuYW1lKTtcblxuICAgICAgICBjb25zdCBpblRvID0gYW5ndWxhci5pc0RlZmluZWQodG9WYWwpO1xuICAgICAgICBjb25zdCBpbkVwID0gYW5ndWxhci5pc0RlZmluZWQoZXBWYWwpO1xuICAgICAgICBpZiAodmFsLnZhbHVlKSB7XG4gICAgICAgICAgLy8gSSByZWFsaXplIHRoaXMgbG9va3MgYmFja3dhcmRzLCBidXQgaXQncyByaWdodCwgdHJ1c3QgbWUuLi5cbiAgICAgICAgICBhdHRyTmFtZSA9IHZhbC52YWx1ZTtcbiAgICAgICAgICBhdHRyVmFsID0gbmFtZTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWwuZXhwcmVzc2lvbiAmJiBpblRvKSB7XG4gICAgICAgICAgYXR0ck5hbWUgPSB2YWwuZXhwcmVzc2lvbjtcbiAgICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyh0b1tuYW1lXSkpIHtcbiAgICAgICAgICAgIGF0dHJWYWwgPSBgJGV2YWwoJHtyZWZ9KWA7XG4gICAgICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24odG9bbmFtZV0pKSB7XG4gICAgICAgICAgICBhdHRyVmFsID0gYCR7cmVmfShtb2RlbFtvcHRpb25zLmtleV0sIG9wdGlvbnMsIHRoaXMsICRldmVudClgO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgIGBvcHRpb25zLnRlbXBsYXRlT3B0aW9ucy4ke25hbWV9IG11c3QgYmUgYSBzdHJpbmcgb3IgZnVuY3Rpb246ICR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucyl9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodmFsLmJvdW5kICYmIGluRXApIHtcbiAgICAgICAgICBhdHRyTmFtZSA9IHZhbC5ib3VuZDtcbiAgICAgICAgICBhdHRyVmFsID0gcmVmO1xuICAgICAgICB9IGVsc2UgaWYgKCh2YWwuYXR0cmlidXRlIHx8IHZhbC5ib29sZWFuKSAmJiBpbkVwKSB7XG4gICAgICAgICAgYXR0ck5hbWUgPSB2YWwuYXR0cmlidXRlIHx8IHZhbC5ib29sZWFuO1xuICAgICAgICAgIGF0dHJWYWwgPSBge3ske3JlZn19fWA7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsLmF0dHJpYnV0ZSAmJiBpblRvKSB7XG4gICAgICAgICAgYXR0ck5hbWUgPSB2YWwuYXR0cmlidXRlO1xuICAgICAgICAgIGF0dHJWYWwgPSB0b1ZhbDtcbiAgICAgICAgfSBlbHNlIGlmICh2YWwuYm9vbGVhbikge1xuICAgICAgICAgIGlmIChpblRvICYmICFpbkVwICYmIHRvVmFsKSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9IHZhbC5ib29sZWFuO1xuICAgICAgICAgICAgYXR0clZhbCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGpzaGludCAtVzAzNVxuICAgICAgICAgICAgLy8gZW1wdHkgdG8gaWxsdXN0cmF0ZSB0aGF0IGEgYm9vbGVhbiB3aWxsIG5vdCBiZSBhZGRlZCB2aWEgdmFsLmJvdW5kXG4gICAgICAgICAgICAvLyBpZiB5b3Ugd2FudCBpdCBhZGRlZCB2aWEgdmFsLmJvdW5kLCB0aGVuIHB1dCBpdCBpbiBleHByZXNzaW9uUHJvcGVydGllc1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh2YWwuYm91bmQgJiYgaW5Ubykge1xuICAgICAgICAgIGF0dHJOYW1lID0gdmFsLmJvdW5kO1xuICAgICAgICAgIGF0dHJWYWwgPSByZWY7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoYXR0ck5hbWUpICYmIGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJWYWwpKSB7XG4gICAgICAgICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsTm9kZXMsIGF0dHJOYW1lLCBhdHRyVmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gVXRpbGl0eSBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gZ2V0QnVpbHRJbkF0dHJpYnV0ZXMoKSB7XG4gICAgbGV0IG5nTW9kZWxBdHRyaWJ1dGVzID0ge1xuICAgICAgZm9jdXM6IHtcbiAgICAgICAgYXR0cmlidXRlOiAnZm9ybWx5LWZvY3VzJ1xuICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgYm91bmRPbmx5ID0gW107XG4gICAgY29uc3QgYm90aEJvb2xlYW5BbmRCb3VuZCA9IFsncmVxdWlyZWQnLCAnZGlzYWJsZWQnXTtcbiAgICBjb25zdCBib3RoQXR0cmlidXRlQW5kQm91bmQgPSBbJ3BhdHRlcm4nLCAnbWlubGVuZ3RoJ107XG4gICAgY29uc3QgZXhwcmVzc2lvbk9ubHkgPSBbJ2NoYW5nZScsICdrZXlkb3duJywgJ2tleXVwJywgJ2tleXByZXNzJywgJ2NsaWNrJywgJ2ZvY3VzJywgJ2JsdXInXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVPbmx5ID0gWydwbGFjZWhvbGRlcicsICdtaW4nLCAnbWF4JywgJ3RhYmluZGV4JywgJ3R5cGUnXTtcbiAgICBpZiAoZm9ybWx5Q29uZmlnLmV4dHJhcy5uZ01vZGVsQXR0cnNNYW5pcHVsYXRvclByZWZlclVuYm91bmQpIHtcbiAgICAgIGJvdGhBdHRyaWJ1dGVBbmRCb3VuZC5wdXNoKCdtYXhsZW5ndGgnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYm91bmRPbmx5LnB1c2goJ21heGxlbmd0aCcpO1xuICAgIH1cblxuICAgIGFuZ3VsYXIuZm9yRWFjaChib3VuZE9ubHksIGl0ZW0gPT4ge1xuICAgICAgbmdNb2RlbEF0dHJpYnV0ZXNbaXRlbV0gPSB7Ym91bmQ6ICduZy0nICsgaXRlbX07XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLmZvckVhY2goYm90aEJvb2xlYW5BbmRCb3VuZCwgaXRlbSA9PiB7XG4gICAgICBuZ01vZGVsQXR0cmlidXRlc1tpdGVtXSA9IHtib29sZWFuOiBpdGVtLCBib3VuZDogJ25nLScgKyBpdGVtfTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIuZm9yRWFjaChib3RoQXR0cmlidXRlQW5kQm91bmQsIGl0ZW0gPT4ge1xuICAgICAgbmdNb2RlbEF0dHJpYnV0ZXNbaXRlbV0gPSB7YXR0cmlidXRlOiBpdGVtLCBib3VuZDogJ25nLScgKyBpdGVtfTtcbiAgICB9KTtcblxuICAgIGFuZ3VsYXIuZm9yRWFjaChleHByZXNzaW9uT25seSwgaXRlbSA9PiB7XG4gICAgICB2YXIgcHJvcE5hbWUgPSAnb24nICsgaXRlbS5zdWJzdHIoMCwgMSkudG9VcHBlckNhc2UoKSArIGl0ZW0uc3Vic3RyKDEpO1xuICAgICAgbmdNb2RlbEF0dHJpYnV0ZXNbcHJvcE5hbWVdID0ge2V4cHJlc3Npb246ICduZy0nICsgaXRlbX07XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLmZvckVhY2goYXR0cmlidXRlT25seSwgaXRlbSA9PiB7XG4gICAgICBuZ01vZGVsQXR0cmlidXRlc1tpdGVtXSA9IHthdHRyaWJ1dGU6IGl0ZW19O1xuICAgIH0pO1xuICAgIHJldHVybiBuZ01vZGVsQXR0cmlidXRlcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEVwVmFsdWUoZXAsIG5hbWUpIHtcbiAgICByZXR1cm4gZXBbJ3RlbXBsYXRlT3B0aW9ucy4nICsgbmFtZV0gfHxcbiAgICAgIGVwW2B0ZW1wbGF0ZU9wdGlvbnNbJyR7bmFtZX0nXWBdIHx8XG4gICAgICBlcFtgdGVtcGxhdGVPcHRpb25zW1wiJHtuYW1lfVwiXWBdO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkSWZOb3RQcmVzZW50KG5vZGVzLCBhdHRyLCB2YWwpIHtcbiAgICBhbmd1bGFyLmZvckVhY2gobm9kZXMsIG5vZGUgPT4ge1xuICAgICAgaWYgKCFub2RlLmdldEF0dHJpYnV0ZShhdHRyKSkge1xuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShhdHRyLCB2YWwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9ydW4vZm9ybWx5TmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBhZGRDdXN0b21UYWdzO1xuXG4vLyBAbmdJbmplY3RcbmZ1bmN0aW9uIGFkZEN1c3RvbVRhZ3MoJGRvY3VtZW50KSB7XG4gIGlmICgkZG9jdW1lbnQgJiYgJGRvY3VtZW50LmdldCkge1xuICAgIC8vSUU4IGNoZWNrIC0+XG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDk2NDk2Ni9kZXRlY3QtaWUtdmVyc2lvbi1wcmlvci10by12OS1pbi1qYXZhc2NyaXB0LzEwOTY1MjAzIzEwOTY1MjAzXG4gICAgY29uc3QgZG9jdW1lbnQgPSAkZG9jdW1lbnQuZ2V0KDApO1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5pbm5lckhUTUwgPSAnPCEtLVtpZiBsdCBJRSA5XT48aT48L2k+PCFbZW5kaWZdLS0+JztcbiAgICBjb25zdCBpc0llTGVzc1RoYW45ID0gKGRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaScpLmxlbmd0aCA9PT0gMSk7XG5cbiAgICBpZiAoaXNJZUxlc3NUaGFuOSkge1xuICAgICAgLy9hZGQgdGhlIGN1c3RvbSBlbGVtZW50cyB0aGF0IHdlIG5lZWQgZm9yIGZvcm1seVxuICAgICAgY29uc3QgY3VzdG9tRWxlbWVudHMgPSBbXG4gICAgICAgICdmb3JtbHktZmllbGQnLCAnZm9ybWx5LWZvcm0nLCAnZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uJywgJ2Zvcm1seS1mb2N1cycsICdmb3JtbHktdHJhbnNwb3NlJ1xuICAgICAgXTtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChjdXN0b21FbGVtZW50cywgZWwgPT4ge1xuICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcnVuL2Zvcm1seUN1c3RvbVRhZ3MuanNcbiAqKi8iLCIvLyBzb21lIHZlcnNpb25zIG9mIGFuZ3VsYXIgZG9uJ3QgZXhwb3J0IHRoZSBhbmd1bGFyIG1vZHVsZSBwcm9wZXJseSxcbi8vIHNvIHdlIGdldCBpdCBmcm9tIHdpbmRvdyBpbiB0aGlzIGNhc2UuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmlmICghYW5ndWxhci52ZXJzaW9uKSB7XG4gIGFuZ3VsYXIgPSB3aW5kb3cuYW5ndWxhcjtcbn1cbmV4cG9ydCBkZWZhdWx0IGFuZ3VsYXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9hbmd1bGFyLWZpeC9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xNl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiYXBpQ2hlY2tcIixcImFtZFwiOlwiYXBpLWNoZWNrXCIsXCJjb21tb25qczJcIjpcImFwaS1jaGVja1wiLFwiY29tbW9uanNcIjpcImFwaS1jaGVja1wifVxuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTdfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYW5ndWxhclwiXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXItZml4JztcblxuZXhwb3J0IGRlZmF1bHQge2Zvcm1seUV2YWwsIGdldEZpZWxkSWQsIHJldmVyc2VEZWVwTWVyZ2UsIGZpbmRCeU5vZGVOYW1lLCBhcnJheWlmeSwgZXh0ZW5kRnVuY3Rpb259O1xuXG5mdW5jdGlvbiBmb3JtbHlFdmFsKHNjb3BlLCBleHByZXNzaW9uLCAkbW9kZWxWYWx1ZSwgJHZpZXdWYWx1ZSwgZXh0cmFMb2NhbHMpIHtcbiAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihleHByZXNzaW9uKSkge1xuICAgIHJldHVybiBleHByZXNzaW9uKCR2aWV3VmFsdWUsICRtb2RlbFZhbHVlLCBzY29wZSwgZXh0cmFMb2NhbHMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzY29wZS4kZXZhbChleHByZXNzaW9uLCBhbmd1bGFyLmV4dGVuZCh7JHZpZXdWYWx1ZSwgJG1vZGVsVmFsdWV9LCBleHRyYUxvY2FscykpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEZpZWxkSWQoZm9ybUlkLCBvcHRpb25zLCBpbmRleCkge1xuICB2YXIgdHlwZSA9IG9wdGlvbnMudHlwZTtcbiAgaWYgKCF0eXBlICYmIG9wdGlvbnMudGVtcGxhdGUpIHtcbiAgICB0eXBlID0gJ3RlbXBsYXRlJztcbiAgfSBlbHNlIGlmICghdHlwZSAmJiBvcHRpb25zLnRlbXBsYXRlVXJsKSB7XG4gICAgdHlwZSA9ICd0ZW1wbGF0ZVVybCc7XG4gIH1cblxuICByZXR1cm4gW2Zvcm1JZCwgdHlwZSwgb3B0aW9ucy5rZXksIGluZGV4XS5qb2luKCdfJyk7XG59XG5cblxuZnVuY3Rpb24gcmV2ZXJzZURlZXBNZXJnZShkZXN0KSB7XG4gIGFuZ3VsYXIuZm9yRWFjaChhcmd1bWVudHMsIChzcmMsIGluZGV4KSA9PiB7XG4gICAgaWYgKCFpbmRleCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBhbmd1bGFyLmZvckVhY2goc3JjLCAodmFsLCBwcm9wKSA9PiB7XG4gICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGRlc3RbcHJvcF0pKSB7XG4gICAgICAgIGRlc3RbcHJvcF0gPSBhbmd1bGFyLmNvcHkodmFsKTtcbiAgICAgIH0gZWxzZSBpZiAob2JqQW5kU2FtZVR5cGUoZGVzdFtwcm9wXSwgdmFsKSkge1xuICAgICAgICByZXZlcnNlRGVlcE1lcmdlKGRlc3RbcHJvcF0sIHZhbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvYmpBbmRTYW1lVHlwZShvYmoxLCBvYmoyKSB7XG4gIHJldHVybiBhbmd1bGFyLmlzT2JqZWN0KG9iajEpICYmIGFuZ3VsYXIuaXNPYmplY3Qob2JqMikgJiZcbiAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqMSkgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmoyKTtcbn1cblxuLy9yZWN1cnNlIGRvd24gYSBub2RlIHRyZWUgdG8gZmluZCBhIG5vZGUgd2l0aCBtYXRjaGluZyBub2RlTmFtZSwgZm9yIGN1c3RvbSB0YWdzIGpRdWVyeS5maW5kIGRvZXNuJ3Qgd29yayBpbiBJRThcbmZ1bmN0aW9uIGZpbmRCeU5vZGVOYW1lKGVsLCBub2RlTmFtZSkge1xuICBpZiAoIWVsLnByb3ApIHsgLy8gbm90IGEgalF1ZXJ5IG9yIGpxTGl0ZSBvYmplY3QgLT4gd3JhcCBpdFxuICAgIGVsID0gYW5ndWxhci5lbGVtZW50KGVsKTtcbiAgfVxuXG4gIGlmIChlbC5wcm9wKCdub2RlTmFtZScpID09PSBub2RlTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgcmV0dXJuIGVsO1xuICB9XG5cbiAgdmFyIGMgPSBlbC5jaGlsZHJlbigpO1xuICBmb3IodmFyIGkgPSAwOyBjICYmIGkgPCBjLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIG5vZGUgPSBmaW5kQnlOb2RlTmFtZShjW2ldLCBub2RlTmFtZSk7XG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGFycmF5aWZ5KG9iaikge1xuICBpZiAob2JqICYmICFhbmd1bGFyLmlzQXJyYXkob2JqKSkge1xuICAgIG9iaiA9IFtvYmpdO1xuICB9IGVsc2UgaWYgKCFvYmopIHtcbiAgICBvYmogPSBbXTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG5cbmZ1bmN0aW9uIGV4dGVuZEZ1bmN0aW9uKC4uLmZucykge1xuICByZXR1cm4gZnVuY3Rpb24gZXh0ZW5kZWRGdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICBmbnMuZm9yRWFjaChmbiA9PiBmbi5hcHBseShudWxsLCBhcmdzKSk7XG4gIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9vdGhlci91dGlscy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=